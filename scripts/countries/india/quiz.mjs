/**
 * インドのクイズ(42問)。
 *
 * 難易度は1〜10で、基準は他国と同じく「インドの外にいる一般的な人が
 * どれくらい答えられそうか」(scripts/content-overrides/quiz-difficulty.mjs 参照)。
 *   1〜3 … 知らなくても常識や推測で当たる
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 文化・歴史に踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 選択肢は3つ。正解の位置(`a`)は偏らないよう散らしてある。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const INDIA_QUIZ = [
  q(
    1,
    "Which river is considered most sacred in India?|¿Qué río se considera el más sagrado de la India?|Quel fleuve est tenu pour le plus sacré en Inde ?|インドで最も聖なるとされる川は?",
    [
      "The Ganges|El Ganges|Le Gange|ガンジス川",
      "The Mekong|El Mekong|Le Mékong|メコン川",
      "The Euphrates|El Éufrates|L'Euphrate|ユーフラテス川",
    ],
    0,
    "The Ganges runs 2,500 km from the Himalaya to the Bay of Bengal and supports around 400 million people.|El Ganges recorre 2.500 km desde el Himalaya al golfo de Bengala y sostiene a unos 400 millones de personas.|Le Gange parcourt 2 500 km de l'Himalaya au golfe du Bengale et fait vivre quelque 400 millions de personnes.|ガンジス川はヒマラヤからベンガル湾まで2500km流れ、約4億人の暮らしを支えています。",
  ),
  q(
    1,
    "What is the Taj Mahal?|¿Qué es el Taj Mahal?|Qu'est-ce que le Taj Mahal ?|タージ・マハルとは何?",
    [
      "A palace for a king|Un palacio para un rey|Un palais pour un roi|王のための宮殿",
      "A tomb for an emperor's wife|Una tumba para la esposa de un emperador|Un tombeau pour l'épouse d'un empereur|皇帝の妃の墓廟",
      "A fortress on the border|Una fortaleza fronteriza|Une forteresse frontalière|国境の要塞",
    ],
    1,
    "Shah Jahan built it for Mumtaz Mahal, who died in 1631; he was later buried beside her.|Shah Jahan lo construyó para Mumtaz Mahal, muerta en 1631; después fue enterrado a su lado.|Shah Jahan le fit bâtir pour Mumtaz Mahal, morte en 1631 ; il y fut ensuite inhumé auprès d'elle.|シャー・ジャハーンが1631年に亡くなった妃ムムターズ・マハルのために建て、後に自身も隣に葬られました。",
  ),
  q(
    2,
    "What is the capital of India?|¿Cuál es la capital de la India?|Quelle est la capitale de l'Inde ?|インドの首都は?",
    [
      "Mumbai|Bombay|Bombay|ムンバイ",
      "Kolkata|Calcuta|Calcutta|コルカタ",
      "New Delhi|Nueva Delhi|New Delhi|ニューデリー",
    ],
    2,
    "The capital moved from Kolkata to a newly built New Delhi, formally inaugurated in 1931.|La capital pasó de Calcuta a la recién construida Nueva Delhi, inaugurada en 1931.|La capitale passa de Calcutta à New Delhi, nouvellement bâtie et inaugurée en 1931.|首都はコルカタから、新しく建設されたニューデリーへ移り、1931年に正式に開府しました。",
  ),
  q(
    2,
    "Which spice-rich cuisine is India best known for abroad?|¿Por qué cocina rica en especias se conoce a la India fuera?|Pour quelle cuisine riche en épices l'Inde est-elle connue à l'étranger ?|インドが国外で知られている、香辛料を多用する料理は?",
    [
      "Curry dishes|Los currys|Les currys|カレー料理",
      "Smoked fish|Pescado ahumado|Poisson fumé|燻製魚",
      "Cheese fondue|Fondue de queso|Fondue au fromage|チーズフォンデュ",
    ],
    0,
    "\"Curry\" is a European catch-all; Indian cooking uses dozens of distinct regional spice blends instead.|«Curry» es un término europeo genérico; la cocina india usa decenas de mezclas regionales distintas.|« Curry » est un mot fourre-tout européen ; la cuisine indienne emploie des dizaines de mélanges régionaux distincts.|「カレー」はヨーロッパ側の総称で、インド料理では地方ごとに何十種もの異なる配合が使われます。",
  ),
  q(
    2,
    "Which of these is a major religion that began in India?|¿Cuál de estas grandes religiones nació en la India?|Laquelle de ces grandes religions est née en Inde ?|次のうち、インドで生まれた宗教は?",
    [
      "Islam|El islam|L'islam|イスラム教",
      "Buddhism|El budismo|Le bouddhisme|仏教",
      "Christianity|El cristianismo|Le christianisme|キリスト教",
    ],
    1,
    "Hinduism, Buddhism, Jainism and Sikhism all originated in the Indian subcontinent.|El hinduismo, el budismo, el jainismo y el sijismo nacieron en el subcontinente indio.|Hindouisme, bouddhisme, jaïnisme et sikhisme sont tous nés dans le sous-continent indien.|ヒンドゥー教・仏教・ジャイナ教・シク教はいずれもインド亜大陸で生まれました。",
  ),
  q(
    3,
    "Who led the non-violent campaign for Indian independence?|¿Quién lideró la campaña no violenta por la independencia?|Qui mena la campagne non violente pour l'indépendance ?|非暴力で独立運動を導いた人物は?",
    [
      "Mahatma Gandhi|Mahatma Gandhi|Mahatma Gandhi|マハトマ・ガンディー",
      "Simón Bolívar|Simón Bolívar|Simón Bolívar|シモン・ボリバル",
      "Sun Yat-sen|Sun Yat-sen|Sun Yat-sen|孫文",
    ],
    0,
    "Gandhi's methods of civil disobedience later influenced movements in the United States and South Africa.|Los métodos de desobediencia civil de Gandhi influyeron después en movimientos de EE. UU. y Sudáfrica.|Les méthodes de désobéissance civile de Gandhi influencèrent ensuite des mouvements aux États-Unis et en Afrique du Sud.|ガンディーの市民的不服従の手法は、のちに米国や南アフリカの運動にも影響を与えました。",
  ),
  q(
    3,
    "What is the monsoon?|¿Qué es el monzón?|Qu'est-ce que la mousson ?|モンスーンとは?",
    [
      "A seasonal wind that brings months of rain|Un viento estacional que trae meses de lluvia|Un vent saisonnier qui apporte des mois de pluie|数ヶ月の雨をもたらす季節風",
      "A kind of desert storm|Una tormenta del desierto|Une tempête du désert|砂漠の嵐の一種",
      "A harvest festival|Una fiesta de la cosecha|Une fête des moissons|収穫祭",
    ],
    0,
    "About 70% of India's yearly rainfall arrives between June and September; a weak monsoon still moves the national economy.|Cerca del 70% de la lluvia anual cae entre junio y septiembre; un monzón débil aún mueve la economía nacional.|Environ 70 % des pluies annuelles tombent de juin à septembre ; une mousson faible pèse encore sur l'économie du pays.|年間降水量の約7割が6〜9月に降ります。モンスーンが弱い年は今も国全体の経済を左右します。",
  ),
  q(
    3,
    "Which animal is most associated with Indian religious processions?|¿Qué animal se asocia más a las procesiones religiosas indias?|Quel animal est le plus associé aux processions religieuses indiennes ?|インドの宗教行列と最も結びつく動物は?",
    [
      "The reindeer|El reno|Le renne|トナカイ",
      "The camel|El camello|Le chameau|らくだ",
      "The elephant|El elefante|L'éléphant|象",
    ],
    2,
    "Decorated elephants lead temple festivals in Kerala and Karnataka, though their use is now tightly regulated.|Elefantes engalanados encabezan fiestas de templo en Kerala y Karnataka, aunque su uso está muy regulado.|Des éléphants parés ouvrent les fêtes de temple au Kerala et au Karnataka, un usage aujourd'hui très encadré.|ケーララやカルナータカの寺院祭では飾られた象が先頭を歩きますが、その扱いは現在厳しく規制されています。",
  ),
  q(
    4,
    "How many official languages are listed in India's constitution?|¿Cuántas lenguas oficiales recoge la constitución india?|Combien de langues officielles la constitution indienne reconnaît-elle ?|インド憲法が定める公用語の数は?",
    ["2|2|2|2", "22|22|22|22", "70|70|70|70"],
    1,
    "The Eighth Schedule lists 22 scheduled languages; the 2011 census recorded 121 languages spoken by 10,000 people or more.|El Octavo Anexo enumera 22 lenguas; el censo de 2011 registró 121 idiomas hablados por 10.000 personas o más.|La huitième annexe en énumère 22 ; le recensement de 2011 a compté 121 langues parlées par 10 000 personnes ou plus.|憲法第8付則に22言語が挙げられています。2011年の国勢調査では、話者1万人以上の言語が121ありました。",
  ),
  q(
    4,
    "What does the wheel in the centre of India's flag represent?|¿Qué representa la rueda del centro de la bandera india?|Que représente la roue au centre du drapeau indien ?|インド国旗の中央の輪は何を表す?",
    [
      "A spinning wheel for cloth|Una rueca para hilar|Un rouet à filer|糸を紡ぐ車",
      "The wheel of law, from Ashoka's pillar|La rueda de la ley, del pilar de Ashoka|La roue de la loi, du pilier d'Ashoka|アショーカ王柱の法輪",
      "A ship's wheel|El timón de un barco|La barre d'un navire|船の舵輪",
    ],
    1,
    "The Ashoka Chakra has 24 spokes and is taken from a 3rd-century BCE pillar at Sarnath.|El Ashoka Chakra tiene 24 radios y procede de un pilar del siglo III a.C. en Sarnath.|Le chakra d'Ashoka a 24 rayons et provient d'un pilier du IIIe siècle av. J.-C. à Sarnath.|アショーカ・チャクラは24本の輻を持ち、紀元前3世紀のサールナートの石柱に由来します。",
  ),
  q(
    4,
    "Which sport draws the biggest crowds in India?|¿Qué deporte reúne más público en la India?|Quel sport attire le plus de public en Inde ?|インドで最も観客を集めるスポーツは?",
    [
      "Cricket|El críquet|Le cricket|クリケット",
      "Ice hockey|El hockey sobre hielo|Le hockey sur glace|アイスホッケー",
      "Rugby|El rugby|Le rugby|ラグビー",
    ],
    0,
    "India's national field hockey team won six straight Olympic golds, but cricket has been the popular game since the 1980s.|La selección de hockey hierba ganó seis oros olímpicos seguidos, pero el críquet es el deporte popular desde los 80.|L'équipe de hockey sur gazon remporta six titres olympiques d'affilée, mais le cricket domine la ferveur populaire depuis les années 1980.|ホッケー代表は五輪6連覇を果たしましたが、1980年代以降の国民的競技はクリケットです。",
  ),
  q(
    4,
    "What is a sari?|¿Qué es un sari?|Qu'est-ce qu'un sari ?|サリーとは?",
    [
      "A stringed instrument|Un instrumento de cuerda|Un instrument à cordes|弦楽器",
      "A length of unstitched cloth worn draped|Una tela sin coser que se drapea|Une étoffe non cousue que l'on drape|縫わずに巻きつける一枚の布",
      "A flatbread|Un pan plano|Un pain plat|平たいパン",
    ],
    1,
    "A sari is a single piece of cloth five to nine metres long, draped in over a hundred regional styles.|El sari es una sola tela de cinco a nueve metros, drapeada en más de cien estilos regionales.|Le sari est une seule étoffe de cinq à neuf mètres, drapée selon plus de cent styles régionaux.|サリーは5〜9mの一枚布で、地方ごとに100を超える巻き方があります。",
  ),
  q(
    5,
    "Which empire built the Taj Mahal and the Red Fort?|¿Qué imperio construyó el Taj Mahal y el Fuerte Rojo?|Quel empire bâtit le Taj Mahal et le Fort Rouge ?|タージ・マハルとレッド・フォートを築いた王朝は?",
    [
      "The Maurya empire|El imperio Maurya|L'empire Maurya|マウリヤ朝",
      "The Chola empire|El imperio Chola|L'empire Chola|チョーラ朝",
      "The Mughal empire|El imperio mogol|L'empire moghol|ムガル帝国",
    ],
    2,
    "The Mughals ruled much of the subcontinent from 1526 to the 1750s and left its most recognisable monuments.|Los mogoles gobernaron buena parte del subcontinente de 1526 a 1750 y dejaron sus monumentos más reconocibles.|Les Moghols régnèrent sur une grande part du sous-continent de 1526 aux années 1750 et laissèrent ses monuments les plus connus.|ムガル帝国は1526年から1750年代まで亜大陸の大部分を治め、最も知られた建造物群を残しました。",
  ),
  q(
    5,
    "What happened in 1947?|¿Qué ocurrió en 1947?|Que s'est-il passé en 1947 ?|1947年に起きたことは?",
    [
      "India gained independence and was partitioned|La India se independizó y fue dividida|L'Inde devint indépendante et fut partagée|インドが独立し、分離した",
      "India was first colonised|La India fue colonizada por primera vez|L'Inde fut colonisée pour la première fois|インドが初めて植民地化された",
      "The Mughal empire was founded|Se fundó el imperio mogol|L'empire moghol fut fondé|ムガル帝国が成立した",
    ],
    0,
    "Independence came with Partition into India and Pakistan; some 15 million people were displaced within months.|La independencia llegó con la Partición en India y Pakistán; unos 15 millones de personas fueron desplazadas en meses.|L'indépendance s'accompagna de la Partition entre Inde et Pakistan ; quelque 15 millions de personnes furent déplacées en quelques mois.|独立はインドとパキスタンへの分離を伴い、数ヶ月で約1500万人が移動を強いられました。",
  ),
  q(
    5,
    "Which Indian city is the centre of the Hindi film industry?|¿Qué ciudad india es el centro del cine en hindi?|Quelle ville indienne est le cœur du cinéma hindi ?|ヒンディー語映画産業の中心地は?",
    [
      "Chennai|Chennai|Chennai|チェンナイ",
      "Mumbai|Bombay|Bombay|ムンバイ",
      "Jaipur|Jaipur|Jaipur|ジャイプル",
    ],
    1,
    "India makes more feature films than any other country, in more than twenty languages — Hindi cinema is only one part.|La India produce más largometrajes que ningún país, en más de veinte lenguas; el cine hindi es sólo una parte.|L'Inde produit plus de longs métrages que tout autre pays, en plus de vingt langues ; le cinéma hindi n'en est qu'une part.|インドは世界で最も多くの長編映画を、20を超える言語で作ります。ヒンディー語映画はその一部にすぎません。",
  ),
  q(
    5,
    "What is chai as drunk across India?|¿Qué es el chai que se bebe en toda la India?|Qu'est-ce que le chai bu partout en Inde ?|インド中で飲まれるチャイとは?",
    [
      "Tea boiled with milk, sugar and spices|Té hervido con leche, azúcar y especias|Du thé bouilli avec lait, sucre et épices|牛乳と砂糖と香辛料で煮出した茶",
      "A cold yoghurt drink|Una bebida fría de yogur|Une boisson froide au yaourt|冷たいヨーグルト飲料",
      "Fermented rice water|Agua de arroz fermentada|De l'eau de riz fermentée|米の発酵飲料",
    ],
    0,
    "India grows and drinks more tea than almost anywhere, but the leaf itself was only planted commercially from the 1830s.|La India cultiva y bebe té como pocos países, aunque su cultivo comercial sólo empezó en los años 1830.|L'Inde cultive et boit le thé comme peu de pays, mais sa culture commerciale ne débuta que vers 1830.|インドは世界有数の茶の生産・消費国ですが、商業栽培が始まったのは1830年代からです。",
  ),
  q(
    5,
    "Which city is known as India's technology capital?|¿Qué ciudad es la capital tecnológica de la India?|Quelle ville est la capitale technologique de l'Inde ?|インドの技術産業の中心とされる都市は?",
    [
      "Bengaluru|Bengaluru|Bengaluru|ベンガルール",
      "Varanasi|Varanasi|Varanasi|ワーラーナシー",
      "Amritsar|Amritsar|Amritsar|アムリトサル",
    ],
    0,
    "Its cool highland climate first attracted research institutes and the aerospace industry, and software followed them.|Su clima templado de altiplano atrajo primero institutos de investigación y la industria aeroespacial; el software vino después.|Son climat doux d'altitude attira d'abord les instituts de recherche et l'aérospatiale ; le logiciel a suivi.|高原の涼しい気候がまず研究機関と航空宇宙産業を呼び、その後にソフトウェア産業が続きました。",
  ),
  q(
    6,
    "What is the Kumbh Mela?|¿Qué es el Kumbh Mela?|Qu'est-ce que la Kumbh Mela ?|クンブ・メーラとは?",
    [
      "A classical dance style|Un estilo de danza clásica|Un style de danse classique|古典舞踊の様式",
      "The largest human gathering on earth|La mayor reunión humana del planeta|Le plus grand rassemblement humain au monde|地上で最大の人の集まり",
      "A mountain pass|Un puerto de montaña|Un col de montagne|山の峠",
    ],
    1,
    "Held in rotation at four river cities, the 2019 gathering at Prayagraj drew an estimated 50 million people on its busiest day.|Se celebra por turnos en cuatro ciudades fluviales; en 2019 Prayagraj reunió unos 50 millones en su día más concurrido.|Tenue à tour de rôle dans quatre villes fluviales, l'édition 2019 de Prayagraj rassembla environ 50 millions de personnes en un jour.|4つの川の町で順に開かれ、2019年のプラヤーグラージでは最も多い日に推定5000万人が集まりました。",
  ),
  q(
    6,
    "Which mountain range forms India's northern border?|¿Qué cordillera forma la frontera norte de la India?|Quelle chaîne forme la frontière nord de l'Inde ?|インドの北の境をなす山脈は?",
    [
      "The Andes|Los Andes|Les Andes|アンデス山脈",
      "The Urals|Los Urales|L'Oural|ウラル山脈",
      "The Himalaya|El Himalaya|L'Himalaya|ヒマラヤ山脈",
    ],
    2,
    "The range is still rising a few millimetres a year as the Indian plate pushes north into Asia.|La cordillera sigue elevándose unos milímetros al año, empujada por la placa india contra Asia.|La chaîne s'élève encore de quelques millimètres par an, la plaque indienne poussant vers l'Asie.|インド・プレートがアジアへ押し込み続けているため、山脈は今も年に数ミリずつ高くなっています。",
  ),
  q(
    6,
    "What is a stepwell?|¿Qué es un pozo escalonado?|Qu'est-ce qu'un puits à degrés ?|階段井戸とは?",
    [
      "A well reached by descending flights of stairs|Un pozo al que se baja por escaleras|Un puits auquel on accède par des volées de marches|階段を下りて水に達する井戸",
      "A well drilled by machine|Un pozo perforado a máquina|Un puits foré à la machine|機械で掘った井戸",
      "A well used only for washing|Un pozo sólo para lavar|Un puits servant seulement au lavage|洗濯専用の井戸",
    ],
    0,
    "Western India built thousands of them from the 7th century, some seven storeys deep and carved like temples.|El oeste de la India construyó miles desde el siglo VII, algunos de siete pisos y tallados como templos.|L'ouest de l'Inde en bâtit des milliers dès le VIIe siècle, certains de sept étages, sculptés comme des temples.|西インドでは7世紀以降に何千も造られ、寺院のように彫刻された7層の深さのものもあります。",
  ),
  q(
    6,
    "Which of these is a classical Indian dance form?|¿Cuál de estas es una danza clásica india?|Laquelle est une danse classique indienne ?|次のうちインド古典舞踊は?",
    [
      "Flamenco|El flamenco|Le flamenco|フラメンコ",
      "Bharatanatyam|El bharatanatyam|Le bharatanatyam|バラタナーティヤム",
      "Tango|El tango|Le tango|タンゴ",
    ],
    1,
    "India recognises eight classical dance forms, each from a different region and each with its own repertoire of hand gestures.|La India reconoce ocho danzas clásicas, cada una de una región y con su propio repertorio de gestos.|L'Inde reconnaît huit danses classiques, chacune d'une région et dotée de son répertoire de gestes.|インドでは8つの古典舞踊が認められており、それぞれ地方が異なり、独自の手の型を持ちます。",
  ),
  q(
    6,
    "Which animal is India's national animal?|¿Cuál es el animal nacional de la India?|Quel est l'animal national de l'Inde ?|インドの国獣は?",
    [
      "The Asian elephant|El elefante asiático|L'éléphant d'Asie|アジアゾウ",
      "The Bengal tiger|El tigre de Bengala|Le tigre du Bengale|ベンガルトラ",
      "The Indian leopard|El leopardo indio|Le léopard de l'Inde|インドヒョウ",
    ],
    1,
    "It replaced the lion in 1973, when a programme of tiger reserves began; India now holds roughly three quarters of the world's wild tigers. The elephant is the national heritage animal, a separate title given in 2010.|Sustituyó al león en 1973, al crearse las reservas de tigres; la India alberga hoy unas tres cuartas partes de los tigres salvajes del mundo. El elefante es el animal del patrimonio nacional, título aparte dado en 2010.|Il remplaça le lion en 1973, à la création des réserves de tigres ; l'Inde abrite aujourd'hui environ les trois quarts des tigres sauvages du monde. L'éléphant est l'animal du patrimoine national, titre distinct accordé en 2010.|1973年、トラの保護区を設ける計画が始まったときにライオンから代わった。いま世界の野生のトラのおよそ四分の三がインドにいる。ゾウには2010年、これとは別に「国の遺産の動物」という称号が与えられている。",
  ),
  q(
    7,
    "Which numeral did Indian mathematicians give the world?|¿Qué cifra dieron al mundo los matemáticos indios?|Quel chiffre les mathématiciens indiens ont-ils donné au monde ?|インドの数学者が世界に与えた数字は?",
    [
      "The number one|El uno|Le un|1",
      "Zero as a number in its own right|El cero como número propio|Le zéro comme nombre à part entière|独立した数としてのゼロ",
      "The decimal point|La coma decimal|La virgule décimale|小数点",
    ],
    1,
    "Brahmagupta set out rules for calculating with zero and negative numbers in 628 CE.|Brahmagupta formuló en 628 las reglas para operar con el cero y los números negativos.|Brahmagupta énonça en 628 les règles de calcul avec le zéro et les nombres négatifs.|ブラフマグプタは628年に、ゼロと負の数を使った計算の規則を書き記しました。",
  ),
  q(
    7,
    "What is Indian Railways notable for?|¿Por qué destacan los ferrocarriles indios?|Pourquoi les chemins de fer indiens se distinguent-ils ?|インド国鉄が際立っている点は?",
    [
      "Being among the world's largest employers|Ser de los mayores empleadores del mundo|Être parmi les plus grands employeurs au monde|世界有数の従業員数を抱えること",
      "Running only at night|Circular sólo de noche|Ne rouler que la nuit|夜間しか走らないこと",
      "Having no passenger service|No tener servicio de pasajeros|N'avoir aucun service voyageurs|旅客営業がないこと",
    ],
    0,
    "It employs well over a million people and carries around 8 billion passenger journeys a year.|Emplea a más de un millón de personas y realiza unos 8.000 millones de viajes de pasajeros al año.|Il emploie plus d'un million de personnes et assure quelque 8 milliards de voyages par an.|100万人を超える職員を抱え、年間およそ80億人の旅客輸送を担っています。",
  ),
  q(
    7,
    "Where did the Buddha attain enlightenment?|¿Dónde alcanzó la iluminación el Buda?|Où le Bouddha atteignit-il l'éveil ?|ブッダが悟りを開いた場所は?",
    [
      "Varanasi|Varanasi|Varanasi|ワーラーナシー",
      "Bodh Gaya|Bodh Gaya|Bodh Gaya|ブッダガヤ",
      "Ujjain|Ujjain|Ujjain|ウッジャイン",
    ],
    1,
    "He gave his first teaching afterwards at Sarnath, near Varanasi, about 250 km away.|Después dio su primera enseñanza en Sarnath, cerca de Varanasi, a unos 250 km.|Il donna ensuite son premier enseignement à Sarnath, près de Varanasi, à quelque 250 km.|その後、約250km離れたワーラーナシー近郊のサールナートで初めて教えを説きました。",
  ),
  q(
    7,
    "What is a thali?|¿Qué es un thali?|Qu'est-ce qu'un thali ?|ターリーとは?",
    [
      "A wedding ceremony|Una ceremonia nupcial|Une cérémonie de mariage|婚礼の儀式",
      "A round platter of many small dishes|Una bandeja redonda con muchos platillos|Un plateau rond garni de nombreux petits plats|小皿を並べた丸い盆の食事",
      "A monsoon wind|Un viento monzónico|Un vent de mousson|モンスーンの風",
    ],
    1,
    "A thali is designed so that sweet, sour, salty, bitter, pungent and astringent tastes all appear in one meal.|El thali se compone para que dulce, ácido, salado, amargo, picante y astringente aparezcan en una sola comida.|Le thali est conçu pour que sucré, acide, salé, amer, piquant et astringent figurent dans un même repas.|ターリーは、甘・酸・塩・苦・辛・渋の六味が一食に揃うよう組み立てられています。",
  ),
  q(
    7,
    "Which state is famous for its backwaters and houseboats?|¿Qué estado es famoso por sus canales y casas flotantes?|Quel État est connu pour ses backwaters et ses péniches ?|水路と屋形船で知られる州は?",
    [
      "Kerala|Kerala|Le Kerala|ケーララ",
      "Haryana|Haryana|L'Haryana|ハリヤーナー",
      "Jharkhand|Jharkhand|Le Jharkhand|ジャールカンド",
    ],
    0,
    "Kerala's backwaters are a 900 km network of lagoons and canals running parallel to the coast.|Los backwaters de Kerala son una red de 900 km de lagunas y canales paralelos a la costa.|Les backwaters du Kerala forment un réseau de 900 km de lagunes et de canaux parallèles à la côte.|ケーララの「バックウォーター」は、海岸に並行して伸びる全長900kmの潟と水路の網です。",
  ),
  q(
    8,
    "What did the Salt March of 1930 protest against?|¿Contra qué protestó la Marcha de la Sal de 1930?|Contre quoi protestait la Marche du sel de 1930 ?|1930年の「塩の行進」が抗議したのは?",
    [
      "A tax on tea|Un impuesto sobre el té|Une taxe sur le thé|茶への課税",
      "A British monopoly on salt|El monopolio británico de la sal|Le monopole britannique du sel|塩の英国専売",
      "Compulsory military service|El servicio militar obligatorio|Le service militaire obligatoire|徴兵制",
    ],
    1,
    "Gandhi walked 385 km to the sea and picked up a lump of natural salt, an act that was illegal for Indians.|Gandhi caminó 385 km hasta el mar y recogió un puñado de sal natural, acto ilegal para los indios.|Gandhi marcha 385 km jusqu'à la mer et ramassa du sel naturel, geste alors illégal pour les Indiens.|ガンディーは385kmを歩いて海に至り、天然の塩を手に取りました。それはインド人には違法な行為でした。",
  ),
  q(
    8,
    "What are the Ajanta and Ellora caves?|¿Qué son las cuevas de Ajanta y Ellora?|Que sont les grottes d'Ajanta et d'Ellora ?|アジャンタ・エローラの石窟とは?",
    [
      "Natural limestone caverns|Cavernas calizas naturales|Des cavernes calcaires naturelles|自然にできた石灰洞",
      "Temples cut into solid rock|Templos excavados en roca maciza|Des temples taillés dans la roche massive|岩盤を掘り抜いた寺院",
      "Prehistoric burial mounds|Túmulos prehistóricos|Des tumulus préhistoriques|先史時代の墳墓",
    ],
    1,
    "The Kailasa temple at Ellora was carved downward from a single cliff, removing about 200,000 tonnes of rock.|El templo Kailasa de Ellora se talló hacia abajo desde un solo acantilado, retirando unas 200.000 toneladas de roca.|Le temple de Kailasa à Ellora fut taillé de haut en bas dans une seule falaise, quelque 200 000 tonnes de roche ôtées.|エローラのカイラーサ寺院は一枚の岩山を上から掘り下げて造られ、約20万トンの岩が取り除かれました。",
  ),
  q(
    8,
    "Why is Chandigarh unusual among Indian cities?|¿Por qué es inusual Chandigarh entre las ciudades indias?|Pourquoi Chandigarh est-elle atypique en Inde ?|チャンディーガルがインドの都市として特異な理由は?",
    [
      "It was planned from scratch by Le Corbusier|Fue planificada desde cero por Le Corbusier|Elle fut entièrement planifiée par Le Corbusier|ル・コルビュジエが白紙から設計した",
      "It has no roads|No tiene carreteras|Elle n'a pas de routes|道路が無い",
      "It is built underground|Está construida bajo tierra|Elle est bâtie sous terre|地下に築かれている",
    ],
    0,
    "It was built after Partition left Punjab without a capital, and is laid out in numbered sectors.|Se construyó tras dejar la Partición al Panyab sin capital, y se organiza en sectores numerados.|Elle fut bâtie après que la Partition eut privé le Pendjab de capitale, et s'organise en secteurs numérotés.|分離独立でパンジャーブが州都を失ったのちに建設され、番号で呼ばれる区画に整理されています。",
  ),
  q(
    8,
    "What is Ayurveda?|¿Qué es el Ayurveda?|Qu'est-ce que l'Ayurveda ?|アーユルヴェーダとは?",
    [
      "A form of temple architecture|Un estilo de arquitectura de templos|Un style d'architecture de temple|寺院建築の様式",
      "An ancient system of medicine|Un antiguo sistema de medicina|Un ancien système médical|古代からの医学体系",
      "A code of law|Un código de leyes|Un code de lois|法典",
    ],
    1,
    "Its texts date back over 2,000 years and describe surgery, diet and pharmacology in considerable detail.|Sus textos tienen más de 2.000 años y describen con detalle cirugía, dieta y farmacología.|Ses textes remontent à plus de 2 000 ans et décrivent en détail chirurgie, régime et pharmacologie.|その文献は2000年以上前にさかのぼり、外科・食事・薬物についてかなり詳しく記しています。",
  ),
  q(
    8,
    "Which Indian spacecraft reached Mars orbit on its first attempt?|¿Qué nave india llegó a Marte al primer intento?|Quelle sonde indienne atteignit Mars du premier coup ?|一度目の挑戦で火星周回に入ったインドの探査機は?",
    [
      "Mangalyaan|Mangalyaan|Mangalyaan|マンガルヤーン",
      "Aryabhata|Aryabhata|Aryabhata|アリヤバータ",
      "Rohini|Rohini|Rohini|ロヒニ",
    ],
    0,
    "The 2014 mission cost about $74 million, less than many films made about space travel.|La misión de 2014 costó unos 74 millones de dólares, menos que muchas películas sobre viajes espaciales.|La mission de 2014 coûta environ 74 millions de dollars, moins que bien des films sur l'espace.|2014年のこの計画の費用は約7400万ドルで、宇宙旅行を描いた映画の多くより安いものでした。",
  ),
  q(
    9,
    "What is the Rann of Kutch?|¿Qué es el Rann de Kutch?|Qu'est-ce que le Rann de Kutch ?|カッチ大湿地とは?",
    [
      "A mountain monastery|Un monasterio de montaña|Un monastère de montagne|山中の僧院",
      "A salt marsh that floods and dries each year|Una marisma salada que se inunda y seca cada año|Un marais salant qui s'inonde et sèche chaque année|毎年冠水しては乾く塩の湿地",
      "A stretch of rainforest|Una franja de selva|Une bande de forêt tropicale|熱帯雨林の一帯",
    ],
    1,
    "It is among the largest salt flats in the world and is the only regular breeding ground of the greater flamingo in South Asia.|Es de los mayores salares del mundo y el único criadero regular del flamenco común en el sur de Asia.|C'est l'un des plus vastes marais salants au monde et le seul lieu de reproduction régulier du flamant rose en Asie du Sud.|世界最大級の塩原で、南アジアで唯一オオフラミンゴが定期的に繁殖する場所です。",
  ),
  q(
    9,
    "Who were the four Begums of Bhopal?|¿Quiénes fueron las cuatro begums de Bhopal?|Qui furent les quatre bégums de Bhopal ?|ボーパールの四人のベーグムとは?",
    [
      "Court poets|Poetisas de la corte|Des poétesses de cour|宮廷の詩人",
      "Women who ruled the state for over a century|Mujeres que gobernaron el estado más de un siglo|Des femmes qui gouvernèrent l'État plus d'un siècle|一世紀以上にわたり藩国を統治した女性たち",
      "Textile merchants|Comerciantes textiles|Des marchandes de tissus|織物商人",
    ],
    1,
    "They ruled in succession from 1819 to 1926, building waterworks, schools and one of India's largest mosques.|Gobernaron sucesivamente de 1819 a 1926, construyendo obras hidráulicas, escuelas y una de las mayores mezquitas de la India.|Elles régnèrent successivement de 1819 à 1926, bâtissant adductions d'eau, écoles et l'une des plus grandes mosquées d'Inde.|1819年から1926年まで四代続けて統治し、水道・学校・インド有数の大モスクを築きました。",
  ),
  q(
    9,
    "What are the living root bridges of Meghalaya made from?|¿De qué están hechos los puentes de raíces vivas de Meghalaya?|En quoi sont faits les ponts de racines vivantes du Meghalaya ?|メーガーラヤの「生きた根の橋」は何でできている?",
    [
      "Bamboo lashed with rope|Bambú atado con cuerda|Du bambou lié par des cordes|縄で結んだ竹",
      "Fig tree roots trained across streams|Raíces de higuera guiadas sobre arroyos|Des racines de figuier guidées au-dessus des ruisseaux|谷にわたらせたイチジクの根",
      "Carved stone slabs|Losas de piedra talladas|Des dalles de pierre taillées|彫った石板",
    ],
    1,
    "Villagers guide the roots for 15 to 30 years before a bridge can bear weight; the oldest are said to be over a century old.|Los aldeanos guían las raíces de 15 a 30 años antes de que el puente aguante peso; los más viejos superarían el siglo.|Les villageois guident les racines 15 à 30 ans avant que le pont porte ; les plus anciens dépasseraient le siècle.|村人は15〜30年かけて根を導き、ようやく人を支える橋になります。最古のものは一世紀を超えるといわれます。",
  ),
  q(
    9,
    "India spans over 2,900 km from east to west. How many time zones does it keep?|La India abarca más de 2.900 km de este a oeste. ¿Cuántos husos horarios mantiene?|L'Inde s'étend sur plus de 2 900 km d'est en ouest. Combien de fuseaux horaires garde-t-elle ?|東西に2,900km以上あるインドが、国内に置いている標準時はいくつ?",
    [
      "One|Uno|Un|1つ",
      "Two|Dos|Deux|2つ",
      "Four|Cuatro|Quatre|4つ",
    ],
    0,
    "The single clock is set half an hour off the hour, at UTC+5:30, so that one line down the middle of the country serves both ends. In the far north-east the sun can be up before five in summer and down by four in winter, and tea gardens there long kept their own working time, an hour ahead, to match the daylight.|El reloj único va a media hora del huso, UTC+5:30, para servir a ambos extremos con una sola línea. En el nordeste el sol sale antes de las cinco en verano, y los jardines de té llevaban su propia hora, una más.|L'horloge unique est calée sur une demi-heure, UTC+5:30, afin qu'une seule ligne médiane serve les deux extrémités. Au nord-est, le soleil se lève avant cinq heures l'été, et les jardins de thé gardaient leur propre heure, une de plus.|唯一の時計は正時から30分ずれた UTC+5:30 に置かれている。国の真ん中を通る一本の線で両端をまかなうためである。北東の端では夏に五時前に日が昇り、冬は四時には暮れる。そこの茶園は長いあいだ、一時間進めた独自の作業時間を使ってきた。",
  ),
  q(
    9,
    "Who wrote India's national anthem and was the first Asian to win the Nobel Prize in Literature?|¿Quién escribió el himno nacional de la India y fue el primer asiático con el Nobel de Literatura?|Qui écrivit l'hymne national indien et fut le premier Asiatique Nobel de littérature ?|インドの国歌を書き、アジアで初めてノーベル文学賞を受けたのは?",
    [
      "Sarojini Naidu|Sarojini Naidu|Sarojini Naidu|サロージニー・ナーイドゥ",
      "Rabindranath Tagore|Rabindranath Tagore|Rabindranath Tagore|ラビンドラナート・タゴール",
      "Premchand|Premchand|Premchand|プレームチャンド",
    ],
    1,
    "He won in 1913 for poems he had translated into English himself, and he also wrote the song Bangladesh later took as its anthem — the only person to have written two national anthems. He gave up the knighthood the British had granted him after the killings at Amritsar in 1919.|Ganó en 1913 por poemas que él mismo tradujo al inglés, y escribió además la canción que Bangladés tomó como himno: el único autor de dos himnos nacionales. Renunció al título británico tras la matanza de Amritsar en 1919.|Il obtint le prix en 1913 pour des poèmes qu'il avait lui-même traduits en anglais, et écrivit aussi le chant que le Bangladesh prit pour hymne : seul auteur de deux hymnes nationaux. Il renonça au titre britannique après le massacre d'Amritsar en 1919.|1913年、自ら英語に訳した詩によって受賞した。のちにバングラデシュが国歌とした歌も彼の作で、二つの国歌を書いた唯一の人物である。1919年のアムリトサルの虐殺のあと、英国から与えられていた爵位を返上した。",
  ),
  q(
    10,
    "What does the dabbawala network of Mumbai do?|¿Qué hace la red de dabbawalas de Bombay?|Que fait le réseau des dabbawalas de Bombay ?|ムンバイのダッバーワーラーは何をする?",
    [
      "Deliver home-cooked lunches across the city|Reparte comidas caseras por toda la ciudad|Livre des repas maison dans toute la ville|市内へ家庭の弁当を配達する",
      "Operate the harbour ferries|Opera los transbordadores del puerto|Exploite les bacs du port|港の連絡船を運航する",
      "Collect and sort the city's post|Recoge y clasifica el correo|Collecte et trie le courrier|郵便を集めて仕分けする",
    ],
    0,
    "Around 5,000 carriers move 200,000 lunch tins a day using colour codes rather than written addresses.|Unos 5.000 porteadores mueven 200.000 fiambreras al día con códigos de color en vez de direcciones escritas.|Quelque 5 000 porteurs déplacent 200 000 gamelles par jour à l'aide de codes couleur plutôt que d'adresses écrites.|約5000人の運び手が、文字の住所ではなく色の記号を使って1日20万個の弁当箱を動かします。",
  ),
  q(
    10,
    "Why is Jaisalmer's fort unusual?|¿Por qué es inusual el fuerte de Jaisalmer?|Pourquoi le fort de Jaisalmer est-il atypique ?|ジャイサルメールの城砦が珍しい理由は?",
    [
      "It is made entirely of wood|Está hecho todo de madera|Il est entièrement en bois|全て木で造られている",
      "Thousands of people still live inside it|Miles de personas aún viven dentro|Des milliers de gens y vivent encore|今も数千人が城内に暮らしている",
      "It has never been finished|Nunca se terminó|Il n'a jamais été achevé|完成していない",
    ],
    1,
    "About a quarter of the old town's population lives within the walls, which makes drainage a constant threat to the foundations.|Cerca de un cuarto de la población del casco vive intramuros, lo que hace del drenaje una amenaza constante para los cimientos.|Environ un quart de la population de la vieille ville vit intra-muros, ce qui fait du drainage une menace constante pour les fondations.|旧市街の人口の約4分の1が城壁の内側で暮らしており、排水が常に基礎を脅かしています。",
  ),
  q(
    10,
    "What is neelakurinji known for?|¿Por qué se conoce el neelakurinji?|Pourquoi le neelakurinji est-il connu ?|ニーラクリンジは何で知られる?",
    [
      "Flowering once every twelve years|Florecer una vez cada doce años|Fleurir une fois tous les douze ans|12年に一度だけ咲くこと",
      "Growing only underwater|Crecer sólo bajo el agua|Ne pousser que sous l'eau|水中でしか育たないこと",
      "Being India's only carnivorous plant|Ser la única planta carnívora de la India|Être la seule plante carnivore d'Inde|インド唯一の食虫植物であること",
    ],
    0,
    "When it blooms, whole hillsides of the Western Ghats turn blue; the last flowering was in 2018.|Cuando florece, laderas enteras de los Ghats occidentales se vuelven azules; la última fue en 2018.|Quand il fleurit, des versants entiers des Ghats occidentaux virent au bleu ; la dernière floraison date de 2018.|咲くと西ガーツ山脈の斜面が丸ごと青くなります。前回の開花は2018年でした。",
  ),
  q(
    10,
    "What is unusual about the shadow of the Brihadisvara temple tower?|¿Qué tiene de raro la sombra de la torre del templo Brihadisvara?|Qu'a de particulier l'ombre de la tour du temple de Brihadisvara ?|ブリハディーシュヴァラ寺院の塔の影について言われることは?",
    [
      "It points north all year|Apunta al norte todo el año|Elle pointe au nord toute l'année|一年中北を指す",
      "Local lore says it never falls on the ground at noon|Se dice que nunca toca el suelo al mediodía|On dit qu'elle ne touche jamais le sol à midi|正午に地面に落ちないと言い伝えられる",
      "It is visible from 20 km away|Se ve desde 20 km|Elle est visible à 20 km|20km先から見える",
    ],
    1,
    "The 11th-century tower is 66 m tall and capped with a stone said to weigh about 80 tonnes.|La torre del siglo XI mide 66 m y está coronada por una piedra de unas 80 toneladas.|La tour du XIe siècle culmine à 66 m et est coiffée d'une pierre d'environ 80 tonnes.|11世紀のこの塔は高さ66m、頂には約80トンとされる石が載っています。",
  ),
  q(
    10,
    "Which Indian territory requires a permit even for Indian citizens to visit?|¿Qué territorio indio exige permiso incluso a los ciudadanos indios?|Quel territoire indien exige un permis même pour les citoyens indiens ?|インド国民でも許可が要るインドの領域は?",
    [
      "Goa|Goa|Goa|ゴア",
      "Lakshadweep|Lakshadweep|Lakshadweep|ラクシャドウィープ",
      "Puducherry|Puducherry|Pondichéry|プドゥチェリー",
    ],
    1,
    "Permits protect the fragile coral atolls and the islands' small resident population; parts of the Andamans are restricted too.|Los permisos protegen los frágiles atolones y su pequeña población; también hay zonas restringidas en las Andamán.|Les permis protègent les fragiles atolls et leur faible population ; certaines zones des Andaman sont aussi réglementées.|許可制は脆い珊瑚環礁と少ない住民を守るためのものです。アンダマン諸島にも立入制限区域があります。",
  ),
];
