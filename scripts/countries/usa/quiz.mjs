/**
 * アメリカ合衆国のクイズ(42問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 都市カード(47件)が扱う具体的な事実(自由の鐘のひび・ホホカムの水路・
 * ハリウッドの看板の綴りなど)はここでは問わない。代わりに、国全体の
 * 地理・政治・歴史・食文化・現代の暮らしなど、**都市カードが触れていない
 * 主題**を選んである。
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

export const USA_QUIZ = [
  q(
    1,
    "What is the capital of the United States?|¿Cuál es la capital de Estados Unidos?|Quelle est la capitale des États-Unis ?|アメリカ合衆国の首都はどこか?",
    ["New York|Nueva York|New York|ニューヨーク", "Los Angeles|Los Ángeles|Los Angeles|ロサンゼルス", "Washington, D.C.|Washington, D.C.|Washington, D.C.|ワシントンD.C."],
    2,
    "Washington, D.C. has been the capital since 1800, chosen as a compromise location between the northern and southern states rather than being the country's largest city.|Washington D.C. es la capital desde 1800, elegida como ubicación de compromiso entre los estados del norte y del sur, y no por ser la ciudad más grande del país.|Washington fait office de capitale depuis 1800, choisie comme lieu de compromis entre les États du nord et du sud plutôt que pour être la plus grande ville du pays.|ワシントンD.C.は1800年以来首都であり、国内最大の都市だからではなく、北部と南部の州の妥協の産物として選ばれた場所である。",
  ),
  q(
    1,
    "What are the colours of the United States flag?|¿Cuáles son los colores de la bandera de Estados Unidos?|Quelles sont les couleurs du drapeau des États-Unis ?|アメリカ合衆国の国旗の色は?",
    ["Red, white and blue|Rojo, blanco y azul|Rouge, blanc et bleu|赤・白・青", "Red, white and green|Rojo, blanco y verde|Rouge, blanc et vert|赤・白・緑", "Blue, white and gold|Azul, blanco y oro|Bleu, blanc et or|青・白・金"],
    0,
    "The 50 stars represent the 50 states and the 13 stripes represent the 13 original colonies that declared independence in 1776.|Las 50 estrellas representan los 50 estados y las 13 franjas representan las 13 colonias originales que declararon la independencia en 1776.|Les 50 étoiles représentent les 50 États et les 13 rayures représentent les 13 colonies d'origine qui déclarèrent leur indépendance en 1776.|50個の星は50州を、13本の縞は1776年に独立を宣言した13の原初の植民地を表す。",
  ),
  q(
    2,
    "What continent is the United States mostly located on?|¿En qué continente se encuentra mayormente Estados Unidos?|Sur quel continent se trouve principalement les États-Unis ?|アメリカ合衆国は主にどの大陸にあるか?",
    ["South America|Sudamérica|Amérique du Sud|南アメリカ", "Europe|Europa|Europe|ヨーロッパ", "North America|Norteamérica|Amérique du Nord|北アメリカ"],
    2,
    "The 48 contiguous states plus Alaska sit on the North American continent, while Hawaii lies far out in the Pacific Ocean.|Los 48 estados contiguos más Alaska se sitúan en el continente norteamericano, mientras que Hawái está lejos, en el océano Pacífico.|Les 48 États contigus plus l'Alaska se trouvent sur le continent nord-américain, tandis qu'Hawaï se situe loin dans l'océan Pacifique.|本土48州とアラスカは北アメリカ大陸にあり、ハワイは太平洋のはるか沖合に位置する。",
    ),
  q(
    2,
    "What language do most people in the United States speak?|¿Qué idioma habla la mayoría de la gente en Estados Unidos?|Quelle langue parle la majorité des habitants des États-Unis ?|アメリカ合衆国で最も多くの人が話す言語は?",
    ["Spanish|Español|Espagnol|スペイン語", "French|Francés|Français|フランス語", "English|Inglés|Anglais|英語"],
    2,
    "English is the country's de facto majority language, though the federal government has no officially designated national language at all.|El inglés es el idioma mayoritario de facto, aunque el gobierno federal no tiene ningún idioma nacional designado oficialmente.|L'anglais est la langue majoritaire de fait, bien que le gouvernement fédéral n'ait officiellement désigné aucune langue nationale.|英語が事実上の多数派言語だが、連邦政府は公式な国語をまったく定めていない。",
  ),
  q(
    2,
    "How many states make up the United States?|¿Cuántos estados componen Estados Unidos?|Combien d'États comptent les États-Unis ?|アメリカ合衆国はいくつの州から成るか?",
    ["48|48|48|48", "52|52|52|52", "50|50|50|50"],
    2,
    "Hawaii became the 50th state in 1959, the most recent addition, joining Alaska which had become the 49th state earlier that same year.|Hawái se convirtió en el estado 50 en 1959, la incorporación más reciente, tras Alaska, que había pasado a ser el 49.º estado ese mismo año.|Hawaï devint le 50e État en 1959, le plus récent ajout, après l'Alaska, devenu le 49e État plus tôt cette même année.|ハワイは1959年に50番目の州となり、最も新しく加わった州である。同じ年の少し前に49番目の州となったアラスカに続いた。",
  ),
  q(
    3,
    "Which river forms much of the border between Texas and Mexico?|¿Qué río forma buena parte de la frontera entre Texas y México?|Quelle rivière forme une grande partie de la frontière entre le Texas et le Mexique ?|テキサスとメキシコの国境の多くを形づくる川は?",
    ["The Mississippi River|El río Misisipi|Le fleuve Mississippi|ミシシッピ川", "The Colorado River|El río Colorado|Le fleuve Colorado|コロラド川", "The Rio Grande|El Río Grande|Le Rio Grande|リオグランデ川"],
    2,
    "Known in Mexico as the Río Bravo, the river runs roughly 3,000 kilometres from Colorado to the Gulf of Mexico, forming the international boundary for about two-thirds of that length.|Conocido en México como el Río Bravo, el río recorre unos 3.000 kilómetros desde Colorado hasta el golfo de México, formando la frontera internacional en unas dos terceras partes de ese trayecto.|Connu au Mexique sous le nom de Río Bravo, le fleuve parcourt environ 3 000 kilomètres depuis le Colorado jusqu'au golfe du Mexique, formant la frontière internationale sur environ les deux tiers de ce trajet.|メキシコでは「リオ・ブラボー」と呼ばれるこの川は、コロラド州からメキシコ湾までおよそ3000キロメートルを流れ、その距離のおよそ3分の2で国境線を形づくっている。",
  ),
  q(
    3,
    "Which of these is the largest state in the U.S. by land area?|¿Cuál de estos es el estado más grande de EE. UU. por superficie?|Lequel de ces États est le plus vaste des États-Unis en superficie ?|次のうち面積で最大の州は?",
    ["Texas|Texas|Texas|テキサス州", "California|California|Californie|カリフォルニア州", "Alaska|Alaska|Alaska|アラスカ州"],
    2,
    "Alaska is more than twice the size of Texas, the second-largest state, and is large enough that it spans four time zones on its own.|Alaska es más del doble de grande que Texas, el segundo estado más grande, y es tan extenso que abarca por sí solo cuatro husos horarios.|L'Alaska fait plus du double de la superficie du Texas, deuxième plus grand État, et est assez vaste pour couvrir à lui seul quatre fuseaux horaires.|アラスカ州は2番目に大きいテキサス州の2倍以上の面積があり、単独で4つの標準時にまたがるほど広い。",
  ),
  q(
    3,
    "What is the currency used in the United States?|¿Qué moneda se usa en Estados Unidos?|Quelle monnaie utilise-t-on aux États-Unis ?|アメリカ合衆国で使われる通貨は?",
    ["The Canadian dollar|El dólar canadiense|Le dollar canadien|カナダドル", "The pound|La libra|La livre|ポンド", "The US dollar|El dólar estadounidense|Le dollar américain|米ドル"],
    2,
    "The dollar has been the country's currency since the Coinage Act of 1792, and its symbol, $, is thought to derive from an abbreviation of the Spanish peso used across colonial trade.|El dólar es la moneda del país desde la Ley de Acuñación de 1792, y su símbolo, $, se cree que deriva de una abreviatura del peso español usado en el comercio colonial.|Le dollar est la monnaie du pays depuis le Coinage Act de 1792, et son symbole, $, serait dérivé d'une abréviation du peso espagnol utilisé dans le commerce colonial.|ドルは1792年の貨幣法以来この国の通貨であり、その記号「$」は植民地時代の交易で使われたスペインのペソの略号に由来するとされる。",
  ),
  q(
    4,
    "Which mountain range runs down the western United States?|¿Qué cordillera recorre el oeste de Estados Unidos?|Quelle chaîne de montagnes traverse l'ouest des États-Unis ?|アメリカ西部を南北に走る山脈は?",
    ["The Appalachian Mountains|Los Apalaches|Les Appalaches|アパラチア山脈", "The Ozark Mountains|Los montes Ozark|Les monts Ozark|オザーク山地", "The Rocky Mountains|Las Montañas Rocosas|Les montagnes Rocheuses|ロッキー山脈"],
    2,
    "The Rockies stretch roughly 4,800 kilometres from British Columbia down into New Mexico and form the Continental Divide, the line that decides whether a raindrop eventually reaches the Pacific or the Atlantic.|Las Rocosas se extienden unos 4.800 kilómetros desde la Columbia Británica hasta Nuevo México y forman la Divisoria Continental.|Les Rocheuses s'étendent sur environ 4 800 kilomètres depuis la Colombie-Britannique jusqu'au Nouveau-Mexique et forment la ligne de partage continentale.|ロッキー山脈はブリティッシュコロンビア州からニューメキシコ州まで約4800キロメートルにわたって続き、雨粒が最終的に太平洋に流れるか大西洋に流れるかを決める大陸分水嶺を形づくっている。",
  ),
  q(
    4,
    "What is the tallest mountain in North America, located in Alaska?|¿Cuál es la montaña más alta de Norteamérica, situada en Alaska?|Quelle est la plus haute montagne d'Amérique du Nord, située en Alaska ?|北アメリカ最高峰でアラスカにある山は?",
    ["Denali|Denali|Denali|デナリ", "Mount Rainier|Monte Rainier|Mont Rainier|レーニア山", "Mount Whitney|Monte Whitney|Mont Whitney|ホイットニー山"],
    0,
    "Denali stands 6,190 metres tall and was known officially as Mount McKinley for over a century before the federal government restored its traditional Koyukon Athabaskan name in 2015.|Denali mide 6.190 metros y se conoció oficialmente como monte McKinley durante más de un siglo antes de que el gobierno federal restaurara su nombre tradicional koyukon athabascano en 2015.|Denali culmine à 6 190 mètres et fut officiellement appelé mont McKinley pendant plus d'un siècle avant que le gouvernement fédéral ne restaure son nom traditionnel koyukon athabascan en 2015.|デナリは標高6190メートルで、1世紀以上「マッキンリー山」として公式に呼ばれていたが、2015年に連邦政府が伝統的なコユコン・アサバスカ語の名前を復活させた。",
  ),
  q(
    4,
    "Roughly how many time zones does the United States, including Alaska and Hawaii, span?|¿Cuántas zonas horarias abarca aproximadamente Estados Unidos, incluyendo Alaska y Hawái?|Combien de fuseaux horaires couvrent environ les États-Unis, Alaska et Hawaï compris ?|アラスカとハワイを含めると、アメリカ合衆国はおよそいくつの標準時にまたがるか?",
    ["Two|Dos|Deux|2つ", "Four|Cuatro|Quatre|4つ", "Six|Seis|Six|6つ"],
    2,
    "The mainland alone spans four zones (Eastern, Central, Mountain, Pacific), and adding Alaska and Hawaii brings the total to six across the country, not counting its Pacific territories.|Solo el territorio continental abarca cuatro zonas (Este, Central, Montaña, Pacífico), y al sumar Alaska y Hawái el total sube a seis en todo el país.|Le territoire continental seul couvre quatre fuseaux (Est, Centre, Montagnes, Pacifique), et l'ajout de l'Alaska et d'Hawaï porte le total à six dans tout le pays.|本土だけでも東部・中部・山岳部・太平洋の4つの標準時にまたがり、アラスカとハワイを加えると全国で6つになる(太平洋の海外領土は含まない)。",
  ),
  q(
    5,
    "What event is celebrated on July 4th?|¿Qué acontecimiento se celebra el 4 de julio?|Quel événement est célébré le 4 juillet ?|7月4日に祝われる出来事は?",
    ["The end of the Civil War|El fin de la Guerra Civil|La fin de la guerre de Sécession|南北戦争の終結", "Thanksgiving|Acción de Gracias|Thanksgiving|感謝祭", "Independence from Great Britain|La independencia de Gran Bretaña|L'indépendance vis-à-vis de la Grande-Bretagne|イギリスからの独立"],
    2,
    "The Continental Congress adopted the Declaration of Independence on July 4, 1776, formally breaking with Great Britain, though fighting in the Revolutionary War continued for another seven years.|El Congreso Continental adoptó la Declaración de Independencia el 4 de julio de 1776, rompiendo formalmente con Gran Bretaña, aunque la guerra de la Independencia continuó siete años más.|Le Congrès continental adopta la déclaration d'Indépendance le 4 juillet 1776, rompant formellement avec la Grande-Bretagne, bien que la guerre d'Indépendance se poursuivît encore sept ans.|大陸会議は1776年7月4日に独立宣言を採択し、イギリスとの正式な決別を宣言したが、独立戦争そのものはその後さらに7年続いた。",
  ),
  q(
    5,
    "The Statue of Liberty was a gift to the United States from which country?|¿La Estatua de la Libertad fue un regalo a Estados Unidos de qué país?|La statue de la Liberté fut un cadeau des États-Unis offert par quel pays ?|自由の女神像はどの国からアメリカへの贈り物だったか?",
    ["Spain|España|Espagne|スペイン", "The Netherlands|Países Bajos|Pays-Bas|オランダ", "France|Francia|France|フランス"],
    2,
    "France gave the statue to mark the centennial of American independence, and it was dedicated in New York Harbor in 1886 after being shipped across the Atlantic in 350 individual pieces.|Francia regaló la estatua para conmemorar el centenario de la independencia estadounidense, y fue inaugurada en el puerto de Nueva York en 1886 tras ser enviada a través del Atlántico en 350 piezas.|La France offrit la statue pour marquer le centenaire de l'indépendance américaine, et elle fut inaugurée dans le port de New York en 1886 après avoir traversé l'Atlantique en 350 pièces détachées.|フランスはアメリカ独立100周年を記念してこの像を贈り、1886年にニューヨーク港で除幕された。大西洋を渡るため350個の部品に分解されて船で運ばれた。",
  ),
  q(
    5,
    "Which document, adopted in 1787, is the supreme law of the United States?|¿Qué documento, adoptado en 1787, es la ley suprema de Estados Unidos?|Quel document, adopté en 1787, constitue la loi suprême des États-Unis ?|1787年に採択され、アメリカ合衆国の最高法規となっている文書は?",
    ["The Declaration of Independence|La Declaración de Independencia|La déclaration d'Indépendance|独立宣言", "The Constitution|La Constitución|La Constitution|合衆国憲法", "The Bill of Rights|La Carta de Derechos|La Déclaration des droits|権利章典"],
    1,
    "The Constitution was drafted in Philadelphia in 1787 and remains the oldest still-functioning written national constitution in the world, though it has since been amended 27 times.|La Constitución se redactó en Filadelfia en 1787 y sigue siendo la constitución nacional escrita más antigua aún en vigor del mundo, aunque se ha enmendado 27 veces.|La Constitution fut rédigée à Philadelphie en 1787 et demeure la plus ancienne constitution nationale écrite encore en vigueur au monde, bien qu'elle ait depuis été amendée 27 fois.|合衆国憲法は1787年にフィラデルフィアで起草され、世界で今なお機能している成文の国家憲法としては最古のものだが、これまでに27回改正されている。",
  ),
  q(
    5,
    "What sport is generally considered the country's most popular spectator sport by television audience?|¿Qué deporte se considera generalmente el deporte espectáculo más popular del país según audiencia televisiva?|Quel sport est généralement considéré comme le sport spectacle le plus populaire du pays en audience télévisée ?|テレビ視聴者数で見て、この国で最も人気の観戦スポーツとされるのは?",
    ["Baseball|Béisbol|Baseball|野球", "American football|Fútbol americano|Football américain|アメリカンフットボール", "Basketball|Baloncesto|Basket-ball|バスケットボール"],
    1,
    "American football overtook baseball in television ratings decades ago, and the Super Bowl, its championship game, is consistently among the most-watched single broadcasts of the year.|El fútbol americano superó al béisbol en audiencia televisiva hace décadas, y la Super Bowl, su partido de campeonato, está sistemáticamente entre las retransmisiones más vistas del año.|Le football américain a dépassé le baseball en audience télévisée il y a des décennies, et le Super Bowl, son match de championnat, figure régulièrement parmi les diffusions les plus regardées de l'année.|アメリカンフットボールはテレビ視聴率で何十年も前に野球を上回っており、その優勝決定戦であるスーパーボウルは、その年で最も視聴される単発放送の一つになるのが常である。",
  ),
  q(
    6,
    "Which of these foods did NOT originate in the United States?|¿Cuál de estos alimentos NO se originó en Estados Unidos?|Lequel de ces plats n'est PAS originaire des États-Unis ?|次の食べ物のうち、アメリカ発祥ではないものは?",
    ["The hamburger bun sandwich as commonly served|La hamburguesa tal como se sirve habitualmente|Le hamburger tel qu'on le sert habituellement|一般的な形のハンバーガー", "Pizza|La pizza|La pizza|ピザ", "Buffalo wings|Las alitas Buffalo|Les ailes de Buffalo|バッファローウィング"],
    1,
    "Pizza originated in Naples, Italy, though the American style, especially New York's foldable slice and Chicago's deep dish, developed its own distinct identity after Italian immigrants brought it over in the early 20th century.|La pizza se originó en Nápoles, Italia, aunque el estilo estadounidense, especialmente la porción plegable de Nueva York y la deep dish de Chicago, desarrolló una identidad propia.|La pizza est originaire de Naples, en Italie, bien que le style américain, notamment la part pliable de New York et la deep dish de Chicago, ait développé sa propre identité.|ピザはイタリアのナポリが発祥だが、アメリカ式、特に折り曲げて食べるニューヨーク風や厚焼きのシカゴ風は、20世紀初頭にイタリア移民が持ち込んだのち独自の姿を発展させた。",
  ),
  q(
    6,
    "Which of these is a federal holiday in the United States?|¿Cuál de estos es un día festivo federal en Estados Unidos?|Lequel de ces jours est un jour férié fédéral aux États-Unis ?|次のうちアメリカの連邦祝日はどれか?",
    ["Halloween|Halloween|Halloween|ハロウィン", "Labor Day|El Día del Trabajo|La fête du Travail|レイバーデー(労働者の日)", "Valentine's Day|San Valentín|La Saint-Valentin|バレンタインデー"],
    1,
    "Labor Day falls on the first Monday of September and unofficially marks the end of summer, while Halloween and Valentine's Day, though widely celebrated, are not federal holidays with paid time off.|El Día del Trabajo cae el primer lunes de septiembre y marca extraoficialmente el fin del verano, mientras que Halloween y San Valentín, aunque ampliamente celebrados, no son festivos federales.|La fête du Travail tombe le premier lundi de septembre et marque officieusement la fin de l'été, tandis qu'Halloween et la Saint-Valentin, bien que largement célébrées, ne sont pas des jours fériés fédéraux.|レイバーデーは9月第1月曜日で、非公式に夏の終わりを告げる。ハロウィンとバレンタインデーは広く祝われてはいるが、有給の連邦祝日ではない。",
  ),
  q(
    6,
    "What is the name of the U.S. system of national protected wilderness areas, including Yellowstone and Yosemite?|¿Cómo se llama el sistema estadounidense de áreas silvestres protegidas, que incluye Yellowstone y Yosemite?|Comment s'appelle le système américain d'aires sauvages protégées, incluant Yellowstone et Yosemite ?|イエローストーンやヨセミテを含む、アメリカの自然保護区の制度の名称は?",
    ["The Wilderness Trust|El Fideicomiso de Áreas Silvestres|Le Wilderness Trust|ウィルダネス信託", "The Green Belt Authority|La Autoridad del Cinturón Verde|Le Green Belt Authority|グリーンベルト庁", "The National Park System|El Sistema de Parques Nacionales|Le National Park System|国立公園制度"],
    2,
    "Yellowstone, established in 1872, is generally considered the world's first national park, and the National Park Service that now manages the whole system wasn't created until 1916.|Yellowstone, establecido en 1872, se considera generalmente el primer parque nacional del mundo, y el Servicio de Parques Nacionales que hoy gestiona todo el sistema no se creó hasta 1916.|Yellowstone, créé en 1872, est généralement considéré comme le premier parc national du monde, et le National Park Service qui gère aujourd'hui l'ensemble du système ne fut créé qu'en 1916.|1872年に設立されたイエローストーンは、一般に世界初の国立公園とされる。現在この制度全体を管理する国立公園局が作られたのは1916年になってからだった。",
  ),
  q(
    6,
    "Which of these is a common measurement unit used daily in the United States, unlike most of the world?|¿Cuál de estas es una unidad de medida de uso diario en Estados Unidos, a diferencia de la mayor parte del mundo?|Laquelle de ces unités est couramment utilisée au quotidien aux États-Unis, contrairement à la majeure partie du monde ?|世界の大半と異なり、アメリカで日常的に使われる単位はどれか?",
    ["The kilometre|El kilómetro|Le kilomètre|キロメートル", "The mile|La milla|Le mille|マイル", "The litre|El litro|Le litre|リットル"],
    1,
    "The United States is one of only a handful of countries that has never fully adopted the metric system, so road signs, speed limits and body height are still measured in miles, miles per hour and feet.|Estados Unidos es uno de los pocos países que nunca adoptó plenamente el sistema métrico, así que las señales viales, los límites de velocidad y la estatura aún se miden en millas, millas por hora y pies.|Les États-Unis sont l'un des rares pays à n'avoir jamais pleinement adopté le système métrique, si bien que la signalisation routière, les limites de vitesse et la taille se mesurent encore en miles, miles par heure et pieds.|アメリカ合衆国はメートル法を完全には採用していない数少ない国の一つで、道路標識も制限速度も身長もいまだにマイル、マイル毎時、フィートで測られている。",
  ),
  q(
    7,
    "Which amendment to the Constitution abolished slavery?|¿Qué enmienda a la Constitución abolió la esclavitud?|Quel amendement à la Constitution abolit l'esclavage ?|奴隷制を廃止した憲法修正条項は?",
    ["The First Amendment|La Primera Enmienda|Le premier amendement|修正第1条", "The Thirteenth Amendment|La Decimotercera Enmienda|Le treizième amendement|修正第13条", "The Nineteenth Amendment|La Decimonovena Enmienda|Le dix-neuvième amendement|修正第19条"],
    1,
    "The Thirteenth Amendment was ratified in December 1865, months after the Civil War ended, formally abolishing slavery except as punishment for a crime, a carve-out still debated today.|La Decimotercera Enmienda se ratificó en diciembre de 1865, meses después de que terminara la Guerra Civil, aboliendo formalmente la esclavitud excepto como castigo por un delito.|Le treizième amendement fut ratifié en décembre 1865, des mois après la fin de la guerre de Sécession, abolissant formellement l'esclavage sauf comme punition d'un crime.|修正第13条は南北戦争終結の数か月後、1865年12月に批准され、犯罪に対する処罰としての場合を除き奴隷制を正式に廃止した。この例外規定はいまも議論の的である。",
  ),
  q(
    7,
    "What is the name of the U.S. space agency that ran the Apollo Moon landings?|¿Cómo se llama la agencia espacial de EE. UU. que dirigió los alunizajes del Apolo?|Comment s'appelle l'agence spatiale américaine qui dirigea les alunissages Apollo ?|アポロ計画の月面着陸を担ったアメリカの宇宙機関の名は?",
    ["SpaceX|SpaceX|SpaceX|スペースX", "DARPA|DARPA|DARPA|DARPA", "NASA|NASA|NASA|NASA"],
    2,
    "NASA, the National Aeronautics and Space Administration, was created in 1958 largely in response to the Soviet Union's launch of Sputnik the previous year, kicking off the Space Race.|La NASA, la Administración Nacional de Aeronáutica y del Espacio, se creó en 1958 en gran parte como respuesta al lanzamiento soviético del Sputnik el año anterior.|La NASA, la National Aeronautics and Space Administration, fut créée en 1958 en grande partie en réponse au lancement soviétique de Spoutnik l'année précédente.|NASA(航空宇宙局)は1958年、前年のソ連によるスプートニク打ち上げへの対応として創設され、宇宙開発競争の幕を開けた。",
  ),
  q(
    7,
    "How many members currently sit on the U.S. Supreme Court?|¿Cuántos miembros integran actualmente el Tribunal Supremo de EE. UU.?|Combien de membres siègent actuellement à la Cour suprême des États-Unis ?|現在アメリカ連邦最高裁判所の裁判官は何人か?",
    ["Seven|Siete|Sept|7人", "Nine|Nueve|Neuf|9人", "Eleven|Once|Onze|11人"],
    1,
    "The number has been fixed at nine since 1869, though nothing in the Constitution requires that specific figure, and Congress has changed it several times over the country's history.|El número está fijado en nueve desde 1869, aunque nada en la Constitución exige esa cifra concreta, y el Congreso lo ha cambiado varias veces a lo largo de la historia del país.|Le nombre est fixé à neuf depuis 1869, bien que rien dans la Constitution n'exige ce chiffre précis, et le Congrès l'a modifié plusieurs fois au cours de l'histoire du pays.|裁判官の数は1869年以来9人に固定されているが、憲法にこの数を定めた規定はなく、連邦議会は国の歴史の中で何度もこの数を変更してきた。",
  ),
  q(
    7,
    "Which war was fought between the Union and the Confederacy from 1861 to 1865?|¿Qué guerra se libró entre la Unión y la Confederación de 1861 a 1865?|Quelle guerre opposa l'Union et la Confédération de 1861 à 1865 ?|1861年から1865年にかけて北部連邦と南部連合のあいだで戦われた戦争は?",
    ["The Revolutionary War|La Guerra de Independencia|La guerre d'Indépendance|独立戦争", "The Civil War|La Guerra Civil|La guerre de Sécession|南北戦争", "The War of 1812|La Guerra de 1812|La guerre de 1812|1812年戦争"],
    1,
    "The Civil War remains the deadliest conflict in American history by a wide margin, with estimates of around 620,000 soldier deaths, more than every other American war combined until the 20th century.|La Guerra Civil sigue siendo, con diferencia, el conflicto más mortífero de la historia estadounidense, con unas 620.000 muertes de soldados.|La guerre de Sécession demeure de loin le conflit le plus meurtrier de l'histoire américaine, avec environ 620 000 morts parmi les soldats.|南北戦争はいまもアメリカ史上最も死者の多い戦争であり続けており、兵士の死者はおよそ62万人と推定される。20世紀に入るまでの他のすべてのアメリカの戦争の死者を合わせたより多い。",
  ),
  q(
    7,
    "Which of these mountain ranges is home to Mount Whitney, the tallest peak in the contiguous 48 states?|¿En cuál de estas cordilleras se encuentra el monte Whitney, el pico más alto de los 48 estados contiguos?|Dans laquelle de ces chaînes se trouve le mont Whitney, le plus haut sommet des 48 États contigus ?|本土48州の最高峰ホイットニー山があるのはどの山脈か?",
    ["The Cascade Range|La cordillera de las Cascadas|La chaîne des Cascades|カスケード山脈", "The Sierra Nevada|Sierra Nevada|La Sierra Nevada|シエラネバダ山脈", "The Ozark Mountains|Los montes Ozark|Les monts Ozark|オザーク山地"],
    1,
    "Mount Whitney rises 4,421 metres in eastern California's Sierra Nevada, and on a clear day it is possible to see it from Badwater Basin in Death Valley, the lowest point in North America, just 136 kilometres away.|El monte Whitney se eleva 4.421 metros en la Sierra Nevada del este de California, y en un día despejado se puede ver desde la Cuenca Badwater en el Valle de la Muerte, a solo 136 kilómetros.|Le mont Whitney culmine à 4 421 mètres dans la Sierra Nevada de l'est californien, et par temps clair, on peut l'apercevoir depuis le bassin de Badwater, dans la Vallée de la Mort, à seulement 136 kilomètres.|ホイットニー山は標高4421メートルで、カリフォルニア州東部のシエラネバダ山脈にある。晴れた日には、わずか136キロメートル先にある北米最低地点、デスバレーのバッドウォーター盆地からもその姿を見ることができる。",
  ),
  q(
    8,
    "In which year did women gain the constitutional right to vote nationwide?|¿En qué año obtuvieron las mujeres el derecho constitucional al voto en todo el país?|En quelle année les femmes obtinrent-elles le droit de vote constitutionnel dans tout le pays ?|女性が全国的に憲法上の投票権を得たのは何年か?",
    ["1848|1848|1848|1848年", "1920|1920|1920|1920年", "1965|1965|1965|1965年"],
    1,
    "The Nineteenth Amendment was ratified in 1920 after more than seven decades of organized suffrage campaigning, though in practice many women of colour, especially in the South, still faced barriers to voting for decades afterward.|La Decimonovena Enmienda se ratificó en 1920 tras más de siete décadas de campaña organizada por el sufragio, aunque en la práctica muchas mujeres de color siguieron enfrentando obstáculos para votar durante décadas.|Le dix-neuvième amendement fut ratifié en 1920 après plus de sept décennies de campagne organisée pour le suffrage, bien qu'en pratique de nombreuses femmes de couleur aient continué à se heurter à des obstacles pour voter pendant des décennies.|修正第19条は、70年以上にわたる組織的な参政権運動の末、1920年に批准された。だが実際には、特に南部の多くの有色人種の女性は、その後何十年も投票に対する障壁に直面し続けた。",
  ),
  q(
    8,
    "What was the name of the 1803 land deal in which the United States roughly doubled in size by buying territory from France?|¿Cómo se llamó el acuerdo territorial de 1803 en el que EE. UU. duplicó aproximadamente su tamaño comprando territorio a Francia?|Comment s'appelait l'accord territorial de 1803 par lequel les États-Unis doublèrent presque leur superficie en achetant un territoire à la France ?|1803年、フランスから領土を買い取ってアメリカ合衆国の面積がほぼ倍になった土地取引の名は?",
    ["The Alaska Purchase|La Compra de Alaska|L'achat de l'Alaska|アラスカ購入", "The Gadsden Purchase|La Compra de Gadsden|L'achat de Gadsden|ガズデン購入", "The Louisiana Purchase|La Compra de Luisiana|L'achat de la Louisiane|ルイジアナ購入"],
    2,
    "Napoleon sold roughly 2.1 million square kilometres of territory for about 15 million dollars, needing cash for wars in Europe and giving up on holding a colony he could no longer easily defend or supply.|Napoleón vendió unos 2,1 millones de kilómetros cuadrados de territorio por unos 15 millones de dólares, necesitando efectivo para guerras en Europa.|Napoléon vendit environ 2,1 millions de kilomètres carrés de territoire pour environ 15 millions de dollars, ayant besoin de liquidités pour ses guerres en Europe.|ナポレオンはヨーロッパでの戦費を必要としており、もはや容易に防衛も補給もできなくなっていた植民地を諦め、およそ210万平方キロメートルの領土を約1500万ドルで売却した。",
  ),
  q(
    8,
    "Which of these Native American nations' historical homeland spanned much of what is now the southeastern United States before forced removal along the Trail of Tears?|¿Cuál de estas naciones nativas americanas tenía su territorio histórico en buena parte del actual sureste de EE. UU. antes de ser desplazada por la fuerza en el Sendero de las Lágrimas?|Laquelle de ces nations amérindiennes avait pour patrie historique une grande partie du sud-est actuel des États-Unis avant d'être déplacée de force sur la piste des larmes ?|「涙の道」で強制移住させられる前、現在のアメリカ南東部の広い範囲を歴史的な故地としていた先住民族は?",
    ["The Iroquois Confederacy|La Confederación Iroquesa|La Confédération iroquoise|イロコイ連邦", "The Sioux Nation|La Nación Sioux|La nation sioux|スー・ネイション", "The Cherokee Nation|La Nación Cheroqui|La nation cherokee|チェロキー・ネイション"],
    2,
    "The Indian Removal Act of 1830 forced the Cherokee and several other southeastern nations onto a westward march to present-day Oklahoma; thousands died along the way from cold, disease and starvation.|La Ley de Traslado Indio de 1830 obligó a los cheroquis y a otras naciones del sureste a una marcha hacia el actual Oklahoma; miles murieron en el camino por frío, enfermedad y hambre.|L'Indian Removal Act de 1830 força les Cherokees et plusieurs autres nations du sud-est à une marche vers l'actuel Oklahoma ; des milliers moururent en chemin de froid, de maladie et de faim.|1830年のインディアン強制移住法は、チェロキー族をはじめ南東部の複数の民族を現在のオクラホマへの西方への行進に追いやった。道中、寒さや病気、飢えで何千人もが命を落とした。",
  ),
  q(
    8,
    "What is the name of the informal name for the U.S. presidential residence and workplace?|¿Cuál es el nombre informal de la residencia y lugar de trabajo del presidente de EE. UU.?|Quel est le nom informel de la résidence et du lieu de travail du président américain ?|アメリカ大統領の官邸兼執務の場を指す通称は?",
    ["Capitol Hill|Capitol Hill|Capitol Hill|キャピトルヒル", "The Pentagon|El Pentágono|Le Pentagone|ペンタゴン", "The White House|La Casa Blanca|La Maison-Blanche|ホワイトハウス"],
    2,
    "The White House has housed every president except George Washington since John Adams moved in, unfinished, in 1800, and it was reportedly painted white partly to cover fire-damaged stone after the British burned it in 1814.|La Casa Blanca ha albergado a todos los presidentes salvo George Washington desde que John Adams se mudó, inacabada, en 1800, y según se dice se pintó de blanco en parte para tapar la piedra dañada por el fuego tras el incendio británico de 1814.|La Maison-Blanche a abrité tous les présidents sauf George Washington depuis que John Adams s'y installa, inachevée, en 1800, et elle aurait été peinte en blanc en partie pour masquer la pierre endommagée par le feu après l'incendie britannique de 1814.|ホワイトハウスは1800年にジョン・アダムズが未完成のまま入居して以来、ジョージ・ワシントンを除くすべての大統領の官邸となってきた。1814年にイギリス軍に焼かれた際の焦げた石を隠すために白く塗られたという説もある。",
  ),
  q(
    9,
    "Which act of Congress, signed in 1956, created the Interstate Highway System?|¿Qué ley del Congreso, firmada en 1956, creó el Sistema de Autopistas Interestatales?|Quelle loi du Congrès, signée en 1956, créa le système d'autoroutes inter-États ?|1956年に署名され、州間高速道路網を作った連邦法は?",
    ["The Homestead Act|La Ley de Asentamientos Rurales|Le Homestead Act|ホームステッド法", "The National Defense Act|La Ley de Defensa Nacional|Le National Defense Act|国防法", "The Federal-Aid Highway Act|La Ley Federal de Ayuda para Autopistas|Le Federal-Aid Highway Act|連邦補助道路法"],
    2,
    "President Eisenhower, partly inspired by Germany's autobahns and a slow 1919 army convoy he had ridden across the country, signed the act creating over 66,000 kilometres of controlled-access highway, initially justified partly as Cold War evacuation infrastructure.|El presidente Eisenhower, inspirado en parte por las autobahns alemanas, firmó la ley que creó más de 66.000 kilómetros de autopistas de acceso controlado.|Le président Eisenhower, en partie inspiré par les autobahns allemandes, signa la loi créant plus de 66 000 kilomètres d'autoroutes à accès contrôlé.|アイゼンハワー大統領は、部分的にはドイツのアウトバーンや、かつて自ら参加した1919年の遅々とした大陸横断陸軍車列の経験に触発され、6万6000キロメートルを超える出入り制限付き高速道路網を作るこの法律に署名した。当初は冷戦下の避難インフラという名目も一因だった。",
  ),
  q(
    9,
    "What was the name of the 1929 stock market collapse that helped trigger the Great Depression?|¿Cómo se llamó el desplome bursátil de 1929 que ayudó a desencadenar la Gran Depresión?|Comment s'appela le krach boursier de 1929 qui contribua à déclencher la Grande Dépression ?|大恐慌の引き金の一つとなった1929年の株式市場の暴落は何と呼ばれるか?",
    ["Red Monday|El Lunes Rojo|Le lundi rouge|赤い月曜日", "White Friday|El Viernes Blanco|Le vendredi blanc|白い金曜日", "Black Tuesday|El Martes Negro|Le mardi noir|暗黒の火曜日"],
    2,
    "Black Tuesday, October 29, 1929, saw the New York Stock Exchange lose about 12 percent of its value in a single day, wiping out fortunes and helping spiral the country into a decade-long economic depression.|El Martes Negro, 29 de octubre de 1929, vio a la Bolsa de Nueva York perder cerca del 12% de su valor en un solo día, arruinando fortunas y ayudando a hundir al país en una depresión económica de una década.|Le mardi noir, le 29 octobre 1929, vit la Bourse de New York perdre environ 12 % de sa valeur en une seule journée, anéantissant des fortunes et précipitant le pays dans une dépression économique d'une décennie.|1929年10月29日の「暗黒の火曜日」には、ニューヨーク証券取引所がわずか一日で価値のおよそ12%を失い、財産が消え去るとともに、国は10年に及ぶ経済恐慌へと転がり落ちていった。",
  ),
  q(
    9,
    "What is the name of the U.S. federal agency responsible for issuing the country's currency, headquartered in Washington, D.C.?|¿Cómo se llama la agencia federal de EE. UU. encargada de emitir la moneda del país, con sede en Washington, D.C.?|Comment s'appelle l'agence fédérale chargée d'émettre la monnaie du pays, basée à Washington ?|通貨発行を担うワシントンD.C.拠点の連邦機関は?",
    ["The Federal Reserve|La Reserva Federal|La Réserve fédérale|連邦準備制度", "The Treasury Bank|El Banco del Tesoro|La Treasury Bank|財務省銀行", "The Federal Trade Commission|La Comisión Federal de Comercio|La Federal Trade Commission|連邦取引委員会"],
    0,
    "The Federal Reserve, created in 1913 after a series of banking panics, is technically a network of twelve regional banks rather than a single government department, giving it a degree of independence from Congress and the president.|La Reserva Federal, creada en 1913 tras una serie de pánicos bancarios, es técnicamente una red de doce bancos regionales y no un único departamento gubernamental.|La Réserve fédérale, créée en 1913 après une série de paniques bancaires, est techniquement un réseau de douze banques régionales plutôt qu'un unique département gouvernemental.|連邦準備制度は、相次ぐ銀行恐慌ののち1913年に創設された。実態は単一の政府省庁ではなく12の地区連邦準備銀行からなる仕組みで、連邦議会や大統領から一定の独立性を持つ。",
  ),
  q(
    3,
    "Which two countries share a land border with the contiguous United States?|¿Qué dos países comparten frontera terrestre con el territorio continental de EE. UU.?|Quels deux pays partagent une frontière terrestre avec les États-Unis continentaux ?|本土アメリカ合衆国と陸で国境を接する2つの国は?",
    ["Canada and Mexico|Canadá y México|Le Canada et le Mexique|カナダとメキシコ", "Canada and Cuba|Canadá y Cuba|Le Canada et Cuba|カナダとキューバ", "Mexico and Guatemala|México y Guatemala|Le Mexique et le Guatemala|メキシコとグアテマラ"],
    0,
    "The Canada–U.S. border, at roughly 8,900 kilometres including Alaska, is the longest international land border in the world; the border with Mexico runs about 3,150 kilometres.|La frontera entre Canadá y EE. UU., de unos 8.900 kilómetros incluyendo Alaska, es la frontera terrestre internacional más larga del mundo.|La frontière entre le Canada et les États-Unis, longue d'environ 8 900 kilomètres avec l'Alaska, est la plus longue frontière terrestre internationale au monde.|カナダとアメリカの国境は、アラスカを含めるとおよそ8900キロメートルにおよび、世界最長の国際陸上国境である。メキシコとの国境はおよそ3150キロメートルである。",
  ),
  q(
    4,
    "What is the name of the massive underground formation of freshwater beneath the Great Plains, crucial to American wheat farming?|¿Cómo se llama la enorme formación subterránea de agua dulce bajo las Grandes Llanuras, clave para el cultivo de trigo estadounidense?|Comment s'appelle l'immense nappe d'eau douce souterraine sous les Grandes Plaines, essentielle à la culture du blé américain ?|大平原の地下にある巨大な淡水層で、アメリカの小麦栽培に欠かせないものの名は?",
    ["The Ogallala Aquifer|El Acuífero de Ogallala|L'aquifère d'Ogallala|オガララ帯水層", "The Great Basin|La Gran Cuenca|Le Grand Bassin|グレートベースン", "Lake Bonneville|El Lago Bonneville|Le lac Bonneville|ボンネビル湖"],
    0,
    "The Ogallala Aquifer underlies parts of eight states and supplies roughly 30 percent of all groundwater used for irrigation in the country, but decades of pumping faster than it can recharge have drawn it down significantly.|El acuífero de Ogallala se extiende bajo partes de ocho estados y suministra cerca del 30% de toda el agua subterránea usada para riego en el país.|L'aquifère d'Ogallala s'étend sous des parties de huit États et fournit environ 30 % de toute l'eau souterraine utilisée pour l'irrigation dans le pays.|オガララ帯水層は8つの州の一部の地下に広がり、この国の灌漑用地下水のおよそ30%を供給している。だが涵養される速さを上回るペースで何十年もくみ上げられ続け、水位は大きく下がっている。",
  ),
  q(
    5,
    "Which of these animals is the national bird and a symbol of the United States?|¿Cuál de estos animales es el ave nacional y símbolo de Estados Unidos?|Lequel de ces animaux est l'oiseau national et symbole des États-Unis ?|アメリカ合衆国の国鳥であり象徴となっている動物は?",
    ["The bald eagle|El águila calva|Le pygargue à tête blanche|ハクトウワシ", "The wild turkey|El pavo salvaje|Le dindon sauvage|七面鳥", "The peregrine falcon|El halcón peregrino|Le faucon pèlerin|ハヤブサ"],
    0,
    "The bald eagle was formally adopted as the national emblem in 1782, though Benjamin Franklin is often (and somewhat inaccurately) said to have argued in a private letter that the wild turkey would have made a more respectable choice.|El águila calva se adoptó formalmente como emblema nacional en 1782, aunque a menudo se dice que Benjamin Franklin argumentó en una carta privada que el pavo salvaje habría sido una elección más digna.|Le pygargue à tête blanche fut officiellement adopté comme emblème national en 1782, bien qu'on prête souvent à Benjamin Franklin, dans une lettre privée, d'avoir jugé le dindon sauvage plus digne.|ハクトウワシは1782年に国章として正式に採用された。ベンジャミン・フランクリンが私信の中で七面鳥のほうがふさわしいと主張したという話がよく語られるが、これはやや不正確な逸話である。",
  ),
  q(
    6,
    "What is the name of the vast desert region that includes Death Valley and parts of Nevada, California, Arizona and Utah?|¿Cómo se llama la vasta región desértica que incluye el Valle de la Muerte y partes de Nevada, California, Arizona y Utah?|Comment s'appelle la vaste région désertique qui comprend la Vallée de la Mort et des parties du Nevada, de la Californie, de l'Arizona et de l'Utah ?|デスバレーやネバダ・カリフォルニア・アリゾナ・ユタの各州の一部を含む広大な砂漠地帯の名は?",
    ["The Mojave Desert|El desierto de Mojave|Le désert de Mojave|モハーヴェ砂漠", "The Sahara|El Sáhara|Le Sahara|サハラ砂漠", "The Gobi Desert|El desierto de Gobi|Le désert de Gobi|ゴビ砂漠"],
    0,
    "The Mojave covers about 124,000 square kilometres and holds both the hottest recorded air temperature on Earth, at Death Valley, and mountain peaks that see snow most winters.|El Mojave cubre unos 124.000 kilómetros cuadrados y alberga tanto la temperatura del aire más alta registrada en la Tierra, en el Valle de la Muerte, como picos montañosos que ven nieve casi todos los inviernos.|Le Mojave couvre environ 124 000 kilomètres carrés et abrite à la fois la température de l'air la plus élevée jamais enregistrée sur Terre, dans la Vallée de la Mort, et des sommets qui voient de la neige presque chaque hiver.|モハーヴェ砂漠はおよそ12万4000平方キロメートルに及び、地球上で記録された最高気温を記録したデスバレーと、ほぼ毎冬雪が積もる山頂の両方を抱えている。",
  ),
  q(
    3,
    "Which ocean lies along the eastern coast of the United States?|¿Qué océano bordea la costa este de Estados Unidos?|Quel océan borde la côte est des États-Unis ?|アメリカ合衆国の東海岸に接する大洋は?",
    ["The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋", "The Indian Ocean|El océano Índico|L'océan Indien|インド洋"],
    1,
    "The Atlantic coastline runs from Maine down to Florida, while the Pacific Ocean borders the country's west coast from Washington to California.|La costa atlántica va desde Maine hasta Florida, mientras que el océano Pacífico bordea la costa oeste del país, desde Washington hasta California.|Le littoral atlantique s'étend du Maine à la Floride, tandis que l'océan Pacifique borde la côte ouest du pays, de l'État de Washington à la Californie.|大西洋岸はメイン州からフロリダ州まで続き、太平洋はワシントン州からカリフォルニア州までの西海岸に接している。",
  ),
  q(
    4,
    "Approximately how many people live in the United States, making it the third most populous country in the world?|¿Aproximadamente cuánta gente vive en Estados Unidos, lo que lo convierte en el tercer país más poblado del mundo?|Environ combien de personnes vivent aux États-Unis, ce qui en fait le troisième pays le plus peuplé du monde ?|世界第3位の人口を持つアメリカ合衆国の人口はおよそ何人か?",
    ["About 90 million|Unos 90 millones|Environ 90 millions|約9000万人", "About 335 million|Unos 335 millones|Environ 335 millions|約3億3500万人", "About 900 million|Unos 900 millones|Environ 900 millions|約9億人"],
    1,
    "Only India and China have larger populations, and the U.S. Census Bureau conducts a full national count every ten years, a process required by the Constitution itself since 1790.|Solo India y China tienen poblaciones mayores, y la Oficina del Censo de EE. UU. realiza un recuento nacional completo cada diez años, un proceso exigido por la propia Constitución desde 1790.|Seules l'Inde et la Chine ont des populations plus nombreuses, et le Bureau du recensement américain effectue un dénombrement national complet tous les dix ans, un processus exigé par la Constitution elle-même depuis 1790.|人口で上回るのはインドと中国だけで、アメリカ国勢調査局は10年ごとに全国規模の完全な人口調査を行っている。これは1790年以来、憲法自体が定める手続きである。",
  ),
  q(
    7,
    "Which decade saw the civil rights movement achieve landmark legislation ending legal racial segregation?|¿En qué década el movimiento por los derechos civiles logró leyes históricas que pusieron fin a la segregación racial legal?|Dans quelle décennie le mouvement des droits civiques obtint-il une législation historique mettant fin à la ségrégation raciale légale ?|公民権運動が法的な人種隔離を終わらせる画期的な立法を勝ち取ったのはどの年代か?",
    ["The 1930s|Los años treinta|Les années 1930|1930年代", "The 1960s|Los años sesenta|Les années 1960|1960年代", "The 1980s|Los años ochenta|Les années 1980|1980年代"],
    1,
    "The Civil Rights Act of 1964 and the Voting Rights Act of 1965 followed decades of organizing and protest, including the 1963 March on Washington where Martin Luther King Jr. delivered his \"I Have a Dream\" speech.|La Ley de Derechos Civiles de 1964 y la Ley de Derecho al Voto de 1965 siguieron a décadas de organización y protesta, incluyendo la Marcha sobre Washington de 1963.|Le Civil Rights Act de 1964 et le Voting Rights Act de 1965 suivirent des décennies d'organisation et de protestation, dont la marche sur Washington de 1963.|1964年公民権法と1965年投票権法は、何十年にもわたる運動と抗議行動の末に成立した。その中には、マーティン・ルーサー・キング牧師が「私には夢がある」演説を行った1963年のワシントン大行進も含まれる。",
  ),
  q(
    6,
    "What is the name of the annual U.S. holiday, held on the fourth Thursday of November, centred on a large family meal?|¿Cómo se llama el festivo anual de EE. UU., celebrado el cuarto jueves de noviembre, centrado en una gran comida familiar?|Comment s'appelle la fête annuelle américaine, célébrée le quatrième jeudi de novembre, centrée sur un grand repas familial ?|11月の第4木曜日に祝われる、大人数の食事を中心とするアメリカの年中行事は?",
    ["Thanksgiving|Acción de Gracias|Thanksgiving|感謝祭", "Labor Day|El Día del Trabajo|La fête du Travail|レイバーデー", "Presidents' Day|El Día de los Presidentes|Le jour des Présidents|大統領の日"],
    0,
    "Thanksgiving became a fixed national holiday in 1863 under Abraham Lincoln, during the Civil War, in part as an attempt to foster a sense of shared national identity at a moment when the country was violently divided.|Acción de Gracias se convirtió en festivo nacional fijo en 1863 bajo Abraham Lincoln, durante la Guerra Civil, en parte como intento de fomentar una identidad nacional compartida.|Thanksgiving devint une fête nationale fixe en 1863 sous Abraham Lincoln, pendant la guerre de Sécession, en partie pour tenter de favoriser un sentiment d'identité nationale partagée.|感謝祭は1863年、南北戦争のさなかにエイブラハム・リンカーンのもとで固定日の国民の祝日となった。国が激しく分断されていた時期に、共通の国民意識を育もうとする狙いも一因だった。",
  ),
  q(
    8,
    "What is the name of the U.S. constitutional principle that divides power among the legislative, executive and judicial branches?|¿Cómo se llama el principio constitucional de EE. UU. que divide el poder entre los poderes legislativo, ejecutivo y judicial?|Comment s'appelle le principe constitutionnel américain qui répartit le pouvoir entre les branches législative, exécutive et judiciaire ?|立法・行政・司法の三権に権力を分ける、アメリカ憲法の原則の名は?",
    ["Federalism|El federalismo|Le fédéralisme|連邦主義", "Separation of powers|La separación de poderes|La séparation des pouvoirs|三権分立(権力分立)", "States' rights|Los derechos de los estados|Les droits des États|州権"],
    1,
    "The system of checks and balances built into the separation of powers means Congress writes laws, the president enforces them, and the courts can strike them down, each branch able to limit the others.|El sistema de contrapesos integrado en la separación de poderes hace que el Congreso escriba las leyes, el presidente las haga cumplir y los tribunales puedan anularlas.|Le système de freins et contrepoids intégré à la séparation des pouvoirs signifie que le Congrès écrit les lois, le président les fait appliquer, et les tribunaux peuvent les invalider.|三権分立に組み込まれた抑制と均衡の仕組みでは、連邦議会が法律を作り、大統領がそれを執行し、裁判所がそれを無効にできる。それぞれの部門が互いを制限し合う。",
  ),
  q(
    5,
    "Which of these is a major American fast-food chain that began as a single hamburger stand in San Bernardino, California in 1940?|¿Cuál de estas es una gran cadena de comida rápida estadounidense que empezó como un único puesto de hamburguesas en San Bernardino, California, en 1940?|Laquelle de ces grandes chaînes de restauration rapide a débuté comme un simple stand de hamburgers à San Bernardino, en Californie, en 1940 ?|1940年、カリフォルニア州サンバーナーディーノの1軒のハンバーガー屋台から始まった大手ファストフードチェーンは?",
    ["McDonald's|McDonald's|McDonald's|マクドナルド", "Subway|Subway|Subway|サブウェイ", "Chipotle|Chipotle|Chipotle|チポトレ"],
    0,
    "Brothers Richard and Maurice McDonald redesigned their restaurant's kitchen around a fast, assembly-line \"Speedee Service System\" in 1948, a model later franchised nationwide by salesman Ray Kroc.|Los hermanos Richard y Maurice McDonald rediseñaron la cocina de su restaurante en torno a un rápido «Speedee Service System» tipo cadena de montaje en 1948.|Les frères Richard et Maurice McDonald redessinèrent en 1948 la cuisine de leur restaurant autour d'un rapide « Speedee Service System » façon chaîne de montage.|リチャードとモーリスのマクドナルド兄弟は1948年、レストランの厨房を流れ作業のような迅速な「スピーディー・サービス・システム」に作り替えた。この方式はのちに営業マンのレイ・クロックによって全国にフランチャイズ展開された。",
  ),
  q(
    9,
    "What is the name of the 1969 music festival held on a dairy farm in upstate New York that became a symbol of the counterculture era?|¿Cómo se llamó el festival de música de 1969 celebrado en una granja lechera del norte del estado de Nueva York que se convirtió en símbolo de la contracultura?|Comment s'appela le festival de musique de 1969, tenu dans une ferme laitière du nord de l'État de New York, devenu symbole de la contre-culture ?|1969年、ニューヨーク州北部の酪農場で開かれ、カウンターカルチャー時代の象徴となった音楽祭の名は?",
    ["Coachella|Coachella|Coachella|コーチェラ", "Woodstock|Woodstock|Woodstock|ウッドストック", "Lollapalooza|Lollapalooza|Lollapalooza|ロラパルーザ"],
    1,
    "Woodstock drew roughly 400,000 people to a farm the organizers had only secured weeks beforehand, and torrential rain turned the field to mud, yet the event is remembered as remarkably peaceful given its scale.|Woodstock atrajo a unas 400.000 personas a una granja que los organizadores solo habían conseguido semanas antes, y la lluvia torrencial convirtió el campo en barro.|Woodstock attira environ 400 000 personnes dans une ferme que les organisateurs n'avaient sécurisée que quelques semaines auparavant, et une pluie torrentielle transforma le champ en boue.|ウッドストックには、主催者がわずか数週間前にようやく場所を確保しただけの農場に、およそ40万人が集まった。土砂降りの雨で会場は泥まみれになったが、その規模を考えれば驚くほど平穏だったと記憶されている。",
  ),
  q(
    4,
    "What is generally considered the birthplace of jazz music, in the early 20th century?|¿Qué ciudad se considera generalmente la cuna del jazz, a principios del siglo XX?|Quelle ville est généralement considérée comme le berceau du jazz au début du XXe siècle ?|20世紀初頭のジャズ発祥の地とされる都市は?",
    ["New Orleans|Nueva Orleans|La Nouvelle-Orléans|ニューオーリンズ", "Detroit|Detroit|Détroit|デトロイト", "Seattle|Seattle|Seattle|シアトル"],
    0,
    "New Orleans' mix of African, Caribbean, French and Spanish musical traditions produced a distinctly improvisational style in the early 1900s that spread up the Mississippi River to Chicago and beyond.|La mezcla de tradiciones musicales africanas, caribeñas, francesas y españolas de Nueva Orleans produjo a principios del siglo XX un estilo claramente improvisado.|Le mélange de traditions musicales africaines, caraïbes, françaises et espagnoles de La Nouvelle-Orléans produisit au début des années 1900 un style nettement improvisé.|ニューオーリンズのアフリカ・カリブ・フランス・スペインの音楽的伝統が混ざり合い、20世紀初頭に独特の即興性を持つ音楽様式を生み出し、それがミシシッピ川をさかのぼってシカゴなどへと広まった。",
  ),
  q(
    6,
    "What is the name for the traditional American music genre with roots in Appalachian folk music, banjo and fiddle?|¿Cómo se llama el género musical tradicional estadounidense con raíces en la música folclórica de los Apalaches, el banjo y el violín?|Comment s'appelle le genre musical traditionnel américain aux racines dans le folk des Appalaches, le banjo et le violon ?|アパラチアの民俗音楽、バンジョー、フィドルに根ざしたアメリカの伝統音楽ジャンルは?",
    ["Bluegrass|Bluegrass|Bluegrass|ブルーグラス", "Reggaeton|Reguetón|Reggaeton|レゲトン", "Flamenco|Flamenco|Flamenco|フラメンコ"],
    0,
    "Bluegrass takes its name from Bill Monroe's band, the Blue Grass Boys, formed in the 1930s and named after Monroe's home state of Kentucky, known as the Bluegrass State.|El bluegrass toma su nombre de la banda de Bill Monroe, los Blue Grass Boys, formada en los años treinta y bautizada en honor a Kentucky, el estado natal de Monroe.|Le bluegrass tire son nom du groupe de Bill Monroe, les Blue Grass Boys, formé dans les années 1930 et nommé d'après le Kentucky, l'État natal de Monroe.|ブルーグラスという名は、1930年代に結成されたビル・モンローのバンド「ブルーグラス・ボーイズ」に由来し、その名はモンローの故郷ケンタッキー州の異名「ブルーグラス・ステート」にちなむ。",
  ),
  q(
    5,
    "Which desert-dwelling reptile, protected by federal law, is a common sight in the deserts of Arizona and Utah?|¿Qué reptil del desierto, protegido por ley federal, es habitual ver en los desiertos de Arizona y Utah?|Quel reptile désertique, protégé par la loi fédérale, est courant dans les déserts de l'Arizona et de l'Utah ?|アリゾナ州やユタ州の砂漠でよく見られ、連邦法で保護されている爬虫類は?",
    ["The desert tortoise|La tortuga del desierto|La tortue du désert|砂漠ガメ", "The komodo dragon|El dragón de Komodo|Le dragon de Komodo|コモドドラゴン", "The green iguana|La iguana verde|L'iguane vert|グリーンイグアナ"],
    0,
    "The desert tortoise can live more than 50 years and spends up to 95 percent of its life underground in burrows, avoiding the extreme surface heat of the Mojave and Sonoran deserts.|La tortuga del desierto puede vivir más de 50 años y pasa hasta el 95% de su vida bajo tierra en madrigueras, evitando el calor extremo de la superficie.|La tortue du désert peut vivre plus de 50 ans et passe jusqu'à 95 % de sa vie sous terre dans des terriers, évitant la chaleur extrême de la surface.|砂漠ガメは50年以上生きることがあり、地上の猛烈な暑さを避けて、生涯の最大95%を巣穴の地下で過ごす。",
  ),
  q(
    3,
    "Which of these is a major American holiday tradition involving costumes and asking neighbors for candy?|¿Cuál de estas es una tradición festiva estadounidense que implica disfraces y pedir dulces a los vecinos?|Laquelle de ces traditions américaines implique des déguisements et le fait de demander des bonbons aux voisins ?|仮装して近所の人にお菓子をねだる、アメリカの祝祭の習わしは?",
    ["Halloween|Halloween|Halloween|ハロウィン", "Groundhog Day|El Día de la Marmota|Le jour de la marmotte|グラウンドホッグ・デー", "Flag Day|El Día de la Bandera|Le jour du Drapeau|国旗の日"],
    0,
    "\"Trick-or-treating\" on October 31st grew out of older European harvest and All Souls' traditions, becoming a distinctly American commercial custom by the mid-20th century.|El «trick-or-treating» del 31 de octubre surgió de antiguas tradiciones europeas de cosecha y de Todos los Santos, convirtiéndose en una costumbre comercial claramente estadounidense a mediados del siglo XX.|Le « trick-or-treating » du 31 octobre est né d'anciennes traditions européennes de récolte et de la Toussaint, devenant une coutume commerciale nettement américaine au milieu du XXe siècle.|10月31日の「トリック・オア・トリート」は、ヨーロッパの古い収穫祭や万聖節の習わしから発展し、20世紀半ばまでにアメリカ独特の商業的な行事となった。",
  ),
  q(
    9,
    "Which river is the longest in the United States, running roughly 3,700 kilometres from Montana to Missouri?|¿Qué río es el más largo de Estados Unidos, con un recorrido de unos 3.700 kilómetros desde Montana hasta Misuri?|Quel fleuve est le plus long des États-Unis, parcourant environ 3 700 kilomètres du Montana au Missouri ?|モンタナ州からミズーリ州まで約3700キロメートルを流れる、アメリカ合衆国最長の川は?",
    ["The Missouri River|El río Misuri|Le Missouri|ミズーリ川", "The Mississippi River|El río Misisipi|Le Mississippi|ミシシッピ川", "The Colorado River|El río Colorado|Le Colorado|コロラド川"],
    0,
    "The Missouri River is slightly longer than the Mississippi it eventually joins near St. Louis, a fact that surprises many people who assume the more famous Mississippi must also be the longest.|El río Misuri es ligeramente más largo que el Misisipi, con el que finalmente se une cerca de St. Louis, un dato que sorprende a mucha gente.|Le Missouri est légèrement plus long que le Mississippi qu'il rejoint finalement près de Saint-Louis, un fait qui surprend beaucoup de gens.|ミズーリ川は、やがてセントルイス付近で合流するミシシッピ川よりわずかに長い。より有名なミシシッピ川のほうが最長だと思い込んでいる人は多く、この事実に驚かれることが多い。",
  ),
  q(
    2,
    "What shape is commonly used to describe the outline of the mainland United States on a map, in a loose sense?|¿Qué forma se usa a menudo, en sentido amplio, para describir el contorno del territorio continental de EE. UU. en un mapa?|Quelle forme utilise-t-on souvent, au sens large, pour décrire le contour du territoire continental des États-Unis sur une carte ?|地図で見た本土アメリカ合衆国の輪郭を大まかに表すのに使われる形は?",
    ["A rough rectangle stretching coast to coast|Un rectángulo aproximado que va de costa a costa|Un rectangle approximatif d'une côte à l'autre|海岸から海岸まで広がる大まかな長方形", "A perfect circle|Un círculo perfecto|Un cercle parfait|完全な円", "A long thin peninsula|Una península larga y delgada|Une longue péninsule étroite|細長い半島"],
    0,
    "The mainland spans roughly 4,300 kilometres from the Atlantic to the Pacific, wide enough that a nonstop flight from New York to Los Angeles still takes around six hours.|El territorio continental se extiende unos 4.300 kilómetros del Atlántico al Pacífico, lo bastante ancho como para que un vuelo directo de Nueva York a Los Ángeles tarde unas seis horas.|Le territoire continental s'étend sur environ 4 300 kilomètres de l'Atlantique au Pacifique, assez large pour qu'un vol direct de New York à Los Angeles prenne encore environ six heures.|本土はおよそ4300キロメートルにわたって大西洋から太平洋まで広がっており、その広さゆえニューヨークからロサンゼルスへの直行便はいまも約6時間かかる。",
  ),
  q(
    8,
    "Which 1803 Supreme Court case first established the principle of judicial review, the power of courts to strike down unconstitutional laws?|¿Qué caso del Tribunal Supremo de 1803 estableció por primera vez el principio de revisión judicial, el poder de los tribunales para anular leyes inconstitucionales?|Quelle affaire de la Cour suprême de 1803 établit pour la première fois le principe du contrôle judiciaire, le pouvoir des tribunaux d'invalider des lois inconstitutionnelles ?|違憲な法律を裁判所が無効にできる「司法審査」の原則を初めて確立した1803年の最高裁判例は?",
    ["Marbury v. Madison|Marbury contra Madison|Marbury contre Madison|マーベリー対マディソン事件", "Roe v. Wade|Roe contra Wade|Roe contre Wade|ロウ対ウェイド事件", "Brown v. Board of Education|Brown contra el Consejo de Educación|Brown contre Board of Education|ブラウン対教育委員会事件"],
    0,
    "Marbury v. Madison is taught in nearly every American law school as the foundation of judicial review, even though the power isn't spelled out anywhere in the Constitution's actual text.|Marbury contra Madison se enseña en casi todas las facultades de derecho estadounidenses como el fundamento de la revisión judicial, aunque ese poder no aparece explícitamente en el texto de la Constitución.|Marbury contre Madison est enseignée dans presque toutes les facultés de droit américaines comme le fondement du contrôle judiciaire, bien que ce pouvoir ne soit inscrit nulle part dans le texte de la Constitution.|マーベリー対マディソン事件は、アメリカのほぼすべての法科大学院で司法審査の礎として教えられているが、この権限は憲法の条文そのものにはどこにも明記されていない。",
  ),
  q(
    5,
    "What is the tallest building in the United States, completed in 2013 in Manhattan?|¿Cuál es el edificio más alto de Estados Unidos, terminado en 2013 en Manhattan?|Quel est le plus haut bâtiment des États-Unis, achevé en 2013 à Manhattan ?|2013年にマンハッタンで完成した、アメリカ合衆国で最も高い建物は?",
    ["The Empire State Building|El Empire State Building|L'Empire State Building|エンパイア・ステート・ビルディング", "One World Trade Center|El One World Trade Center|Le One World Trade Center|ワン・ワールドトレードセンター", "The Willis Tower|La Willis Tower|La Willis Tower|ウィリス・タワー"],
    1,
    "One World Trade Center rises 541 metres, a height chosen to echo 1,776 feet in reference to the year of independence, and stands on the site of the original Twin Towers destroyed in 2001.|El One World Trade Center se eleva 541 metros, una altura elegida para evocar los 1.776 pies en referencia al año de la independencia, y se alza en el lugar de las Torres Gemelas originales destruidas en 2001.|Le One World Trade Center s'élève à 541 mètres, une hauteur choisie pour évoquer les 1 776 pieds en référence à l'année de l'indépendance, et se dresse sur le site des Tours jumelles d'origine détruites en 2001.|ワン・ワールドトレードセンターは高さ541メートルで、独立の年である1776にちなんで1776フィートを意識した高さに選ばれた。2001年に破壊された元のツインタワーの跡地に建っている。",
  ),
];
