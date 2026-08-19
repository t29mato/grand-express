/**
 * エジプトのクイズ(102問)。
 *
 * 難易度は他の盤面と同じ基準(「その国の外にいる一般的な人がどれくらい
 * 答えられそうか」)。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 難易度分布: 1〜3=23問・4〜6=47問・7〜8=20問・9〜10=12問。
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(41件)が扱う具体的な事実(ラムセス駅・アレクサンドリアの
 * 路面電車と地盤沈下・ヌビア人の移住・スエズ危機・イスマイリアの賦役労働・
 * カムシーンや聖者祭など money-events/flavour の題材)はここでは問わない。
 * 特に注意した重複回避:
 *   - スエズ危機を「誰が国有化したか/どの国が侵攻したか」で問わない
 *     (Suezカードが大統領名と3か国名を明記済み)
 *   - ハイダムの貯水池の名前(ナセル湖)を問わない
 *     (コムオンボカードが名指し済み)。代わりにスーダン側の呼び名を問うている
 *   - イスマイリアの賦役労働者数を問わない(カードが「100万人超」を明記済み)
 *
 * ピラミッド・ファラオへの言及は全体の約5%(5問程度)に抑え、
 * 古代そのものではなく「現代の出来事・現代の展示・現代の外交」の側面
 * (黄金のパレード、大エジプト博物館の開館、スフィンクスの形など)から問う。
 *
 * ```
 * node scripts/check-quiz.mjs egypt
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
 *
 * 選択肢は3つ。正解の位置(`a`)は散らしていない(出題時にシャッフルされるため)。
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

export const EGYPT_QUIZ = [
  // ==================== 難易度1〜3(23問) ====================
  q(
    2,
    "What is the capital of Egypt?|¿Cuál es la capital de Egipto?|Quelle est la capitale de l'Égypte ?|エジプトの首都はどこか?",
    [
      "Cairo|El Cairo|Le Caire|カイロ",
      "Alexandria|Alejandría|Alexandrie|アレクサンドリア",
      "Luxor|Luxor|Louxor|ルクソール",
    ],
    0,
    "Cairo has served as Egypt's capital continuously since it was founded in 969 CE, its name al-Qahira meaning \"the victorious\".|El Cairo ha sido la capital de Egipto de forma continua desde su fundación en el año 969, y su nombre, al-Qahira, significa «la victoriosa».|Le Caire est la capitale continue de l'Égypte depuis sa fondation en 969, son nom, al-Qahira, signifiant « la victorieuse ».|カイロは969年に建設されて以来、途切れることなくエジプトの首都であり続けている。その名アル・カーヒラは「勝利の都」を意味する。",
  ),
  q(
    1,
    "What language do most Egyptians speak?|¿Qué idioma habla la mayoría de los egipcios?|Quelle langue parle la majorité des Égyptiens ?|エジプトで最も話されている言語は?",
    [
      "Arabic|Árabe|Arabe|アラビア語",
      "Turkish|Turco|Turc|トルコ語",
      "Persian|Persa|Persan|ペルシア語",
    ],
    0,
    "Egyptian Arabic, a distinct dialect from the standard written form, is understood across the Arab world thanks to decades of Egyptian film and television exports.|El árabe egipcio, un dialecto distinto de la forma escrita estándar, se entiende en todo el mundo árabe gracias a décadas de exportación de cine y televisión egipcios.|L'arabe égyptien, un dialecte distinct de la forme écrite standard, est compris dans tout le monde arabe grâce à des décennies d'exportation de films et de télévision égyptiens.|標準的な書き言葉のアラビア語とは異なるエジプト方言は、何十年ものエジプト映画・テレビの輸出のおかげでアラブ世界全体で通じる。",
  ),
  q(
    2,
    "Which sea lies along Egypt's northern coast?|¿Qué mar bordea la costa norte de Egipto?|Quelle mer borde la côte nord de l'Égypte ?|エジプトの北岸に接する海は?",
    [
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The Arabian Sea|El mar Arábigo|La mer d'Arabie|アラビア海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
    ],
    0,
    "Cities such as Alexandria and Port Said sit directly on this coast, which has shaped Egypt's trade with Europe since antiquity.|Ciudades como Alejandría y Port Said se asientan directamente en esta costa, que ha marcado el comercio de Egipto con Europa desde la Antigüedad.|Des villes comme Alexandrie et Port-Saïd se trouvent directement sur cette côte, qui façonne le commerce de l'Égypte avec l'Europe depuis l'Antiquité.|アレクサンドリアやポートサイドといった都市はこの海岸に直接面しており、古代からエジプトとヨーロッパの交易を形づくってきた。",
  ),
  q(
    2,
    "Which sea lies along the Sinai Peninsula's eastern and southern coasts?|¿Qué mar bordea las costas este y sur de la península del Sinaí?|Quelle mer borde les côtes est et sud de la péninsule du Sinaï ?|シナイ半島の東岸・南岸に接する海は?",
    [
      "The Red Sea|El mar Rojo|La mer Rouge|紅海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
      "The North Sea|El mar del Norte|La mer du Nord|北海",
    ],
    0,
    "The Suez Canal links this sea to the Mediterranean, cutting out the long sail around the southern tip of Africa.|El canal de Suez conecta este mar con el Mediterráneo, evitando el largo rodeo por el extremo sur de África.|Le canal de Suez relie cette mer à la Méditerranée, évitant le long détour par la pointe sud de l'Afrique.|スエズ運河はこの海を地中海と結び、アフリカ南端を回る長い航路を省いている。",
  ),
  q(
    2,
    "What is the majority religion in Egypt?|¿Cuál es la religión mayoritaria en Egipto?|Quelle est la religion majoritaire en Égypte ?|エジプトで最も多い宗教は?",
    [
      "Islam|El islam|L'islam|イスラム教",
      "Buddhism|El budismo|Le bouddhisme|仏教",
      "Hinduism|El hinduismo|L'hindouisme|ヒンドゥー教",
    ],
    0,
    "A significant Coptic Christian minority has lived alongside the Muslim majority for centuries, concentrated especially in parts of Middle and Upper Egypt.|Una importante minoría cristiana copta ha convivido con la mayoría musulmana durante siglos, concentrada sobre todo en partes del Egipto Medio y del Alto Egipto.|Une importante minorité chrétienne copte vit aux côtés de la majorité musulmane depuis des siècles, concentrée surtout dans certaines régions de Moyenne et de Haute-Égypte.|コプト・キリスト教徒という大きな少数派が、何世紀にもわたりムスリムの多数派と共に暮らしてきた。とくに中部・上エジプトの一部に集中している。",
  ),
  q(
    2,
    "What is the name of the vast desert that covers most of Egypt?|¿Cómo se llama el vasto desierto que cubre la mayor parte de Egipto?|Comment s'appelle le vaste désert qui couvre la majeure partie de l'Égypte ?|エジプトの国土の大半を占める広大な砂漠の名は?",
    [
      "The Sahara|El Sáhara|Le Sahara|サハラ砂漠",
      "The Gobi|El Gobi|Le Gobi|ゴビ砂漠",
      "The Kalahari|El Kalahari|Le Kalahari|カラハリ砂漠",
    ],
    0,
    "Egypt's share of the Sahara is usually split into the Western Desert and the Eastern Desert, on either side of the Nile valley.|La parte del Sáhara que corresponde a Egipto suele dividirse en el desierto Occidental y el desierto Oriental, a cada lado del valle del Nilo.|La part égyptienne du Sahara se divise généralement en désert occidental et désert oriental, de part et d'autre de la vallée du Nil.|エジプトが占めるサハラ砂漠の部分は、ナイル渓谷を挟んで西方砂漠と東方砂漠に分けて呼ばれることが多い。",
  ),
  q(
    2,
    "What is Egypt's national currency called?|¿Cómo se llama la moneda nacional de Egipto?|Comment s'appelle la monnaie nationale de l'Égypte ?|エジプトの通貨の名は?",
    [
      "The Egyptian pound|La libra egipcia|La livre égyptienne|エジプト・ポンド",
      "The Egyptian dinar|El dinar egipcio|Le dinar égyptien|エジプト・ディナール",
      "The Egyptian rupee|La rupia egipcia|La roupie égyptienne|エジプト・ルピー",
    ],
    0,
    "The pound is divided into 100 piastres, a subunit whose coins have become so devalued by inflation that they are now rarely seen in everyday change.|La libra se divide en 100 piastras, una subunidad cuyas monedas se han devaluado tanto por la inflación que hoy rara vez se ven en el cambio cotidiano.|La livre se divise en 100 piastres, une sous-unité dont les pièces se sont tant dévaluées avec l'inflation qu'on les voit désormais rarement dans la monnaie du quotidien.|ポンドは100分の1のピアストルに分かれるが、この小単位の硬貨はインフレで価値が下がりすぎ、いまや日常のお釣りではめったに見かけない。",
  ),
  q(
    1,
    "What is the most popular sport in Egypt?|¿Cuál es el deporte más popular en Egipto?|Quel est le sport le plus populaire en Égypte ?|エジプトで最も人気のあるスポーツは?",
    [
      "Football (soccer)|El fútbol|Le football|サッカー",
      "Ice hockey|El hockey sobre hielo|Le hockey sur glace|アイスホッケー",
      "Baseball|El béisbol|Le baseball|野球",
    ],
    0,
    "Matches between Cairo's two biggest clubs, Al Ahly and Zamalek, are among the most watched sporting events anywhere in Africa.|Los partidos entre los dos mayores clubes de El Cairo, Al Ahly y Zamalek, están entre los eventos deportivos más vistos de toda África.|Les matchs entre les deux plus grands clubs du Caire, Al Ahly et Zamalek, comptent parmi les événements sportifs les plus suivis de toute l'Afrique.|カイロの二大クラブ、アル・アハリとザマレクの対戦は、アフリカ全体でも指折り視聴されるスポーツの一戦である。",
  ),
  q(
    3,
    "Which country borders Egypt to the west?|¿Qué país limita con Egipto por el oeste?|Quel pays borde l'Égypte à l'ouest ?|エジプトの西に接する国は?",
    [
      "Libya|Libia|Libye|リビア",
      "Algeria|Argelia|Algérie|アルジェリア",
      "Chad|Chad|Tchad|チャド",
    ],
    0,
    "The Egypt–Libya border runs almost entirely through open desert, with the coastal town of Sallum near its northern end.|La frontera entre Egipto y Libia discurre casi por completo por desierto abierto, con la localidad costera de Sallum cerca de su extremo norte.|La frontière Égypte-Libye traverse presque entièrement le désert ouvert, avec la ville côtière de Sallum près de son extrémité nord.|エジプトとリビアの国境はほぼ全域が開けた砂漠を通り、その北端近くに海沿いの町サルームがある。",
  ),
  q(
    2,
    "Which country borders Egypt to the south?|¿Qué país limita con Egipto por el sur?|Quel pays borde l'Égypte au sud ?|エジプトの南に接する国は?",
    [
      "Sudan|Sudán|Soudan|スーダン",
      "Kenya|Kenia|Kenya|ケニア",
      "Chad|Chad|Tchad|チャド",
    ],
    0,
    "The border follows the 22nd parallel almost in a straight line, except for a disputed coastal wedge on the Red Sea claimed by both countries.|La frontera sigue casi en línea recta el paralelo 22, salvo por una franja costera en disputa en el mar Rojo reclamada por ambos países.|La frontière suit presque en ligne droite le 22e parallèle, à l'exception d'une bande côtière contestée sur la mer Rouge revendiquée par les deux pays.|国境はほぼ北緯22度線に沿って直線に引かれているが、紅海沿岸の一角だけは両国が領有権を主張する係争地になっている。",
  ),
  q(
    3,
    "Which country or territory lies across the Egyptian border to the northeast, beyond the Sinai Peninsula?|¿Qué país o territorio se halla al otro lado de la frontera egipcia al noreste, más allá de la península del Sinaí?|Quel pays ou territoire se trouve de l'autre côté de la frontière égyptienne au nord-est, au-delà de la péninsule du Sinaï ?|シナイ半島の先、エジプトの北東の国境の向こうにある国・地域は?",
    [
      "Israel|Israel|Israël|イスラエル",
      "Iraq|Irak|Irak|イラク",
      "Turkey|Turquía|Turquie|トルコ",
    ],
    0,
    "The modern border was fixed by the 1979 peace treaty, which also set out the phased return of the whole Sinai Peninsula to Egyptian control.|La frontera moderna se fijó con el tratado de paz de 1979, que también estableció la devolución por etapas de toda la península del Sinaí al control egipcio.|La frontière moderne fut fixée par le traité de paix de 1979, qui organisa aussi la restitution par étapes de toute la péninsule du Sinaï au contrôle égyptien.|現在の国境は1979年の和平条約で定められた。同条約はシナイ半島全体を段階的にエジプトの統治下へ戻すことも定めていた。",
  ),
  q(
    2,
    "What large reptile, found in parts of the Nile and Lake Nasser, can grow to over 5 metres long?|¿Qué gran reptil, presente en partes del Nilo y el lago Nasser, puede superar los 5 metros de largo?|Quel grand reptile, présent dans certaines parties du Nil et du lac Nasser, peut dépasser 5 mètres de long ?|ナイルやナセル湖の一部に生息し、体長5メートルを超えることもある大きな爬虫類は?",
    [
      "The Nile crocodile|El cocodrilo del Nilo|Le crocodile du Nil|ナイルワニ",
      "The Komodo dragon|El dragón de Komodo|Le dragon de Komodo|コモドオオトカゲ",
      "The green iguana|La iguana verde|L'iguane vert|グリーンイグアナ",
    ],
    0,
    "Nile crocodiles were largely pushed out of the river's lower stretches by dams and hunting last century, but a substantial population survives in Lake Nasser.|Los cocodrilos del Nilo fueron en gran parte expulsados de los tramos bajos del río por presas y caza el siglo pasado, pero una población considerable sobrevive en el lago Nasser.|Les crocodiles du Nil furent largement chassés des tronçons inférieurs du fleuve par les barrages et la chasse au siècle dernier, mais une population importante subsiste dans le lac Nasser.|ナイルワニは前世紀、ダムと狩猟によって川の下流域からほぼ追いやられたが、ナセル湖にはかなりの数がいまも生息している。",
  ),
  q(
    2,
    "What food is eaten alongside almost every Egyptian meal?|¿Qué alimento se come junto a casi toda comida egipcia?|Quel aliment accompagne presque tous les repas égyptiens ?|エジプトのほぼすべての食事に添えられる食べ物は?",
    [
      "Flatbread|Pan de pita|Le pain plat|平たいパン",
      "Rice noodles|Fideos de arroz|Les nouilles de riz|ビーフン",
      "Corn tortillas|Tortillas de maíz|Les tortillas de maïs|トウモロコシのトルティーヤ",
    ],
    0,
    "Egyptian flatbread, aish baladi, is subsidised by the government and sold at a fixed low price, making it a politically sensitive staple.|El pan plano egipcio, aish baladi, está subvencionado por el gobierno y se vende a un precio fijo bajo, lo que lo convierte en un alimento básico políticamente delicado.|Le pain plat égyptien, aish baladi, est subventionné par l'État et vendu à un prix fixe bas, ce qui en fait un aliment de base politiquement sensible.|エジプトの平たいパン、アイシュ・バラディーは政府の補助を受け、安い固定価格で売られており、政治的にも敏感な主食になっている。",
  ),
  q(
    3,
    "What is the name of the popular Egyptian street food made of lentils, rice, pasta and a spiced tomato sauce?|¿Cómo se llama la popular comida callejera egipcia hecha de lentejas, arroz, pasta y una salsa de tomate especiada?|Comment s'appelle la célèbre street food égyptienne à base de lentilles, de riz, de pâtes et d'une sauce tomate épicée ?|レンズ豆、米、パスタ、スパイスの効いたトマトソースからなる人気のエジプトの屋台料理は?",
    [
      "Koshari|Koshari|Koshari|コシャリ",
      "Falafel|Falafel|Falafel|ファラフェル",
      "Hummus|Hummus|Houmous|フムス",
    ],
    0,
    "Koshari is often called Egypt's national dish, sold from carts and simple diners nationwide, layered and topped with crispy fried onions.|Al koshari se le suele llamar el plato nacional de Egipto, se vende en carritos y restaurantes sencillos por todo el país, en capas y coronado con cebolla frita crujiente.|Le koshari est souvent appelé le plat national de l'Égypte, vendu sur des charrettes et dans de simples gargotes dans tout le pays, en couches et garni d'oignons frits croustillants.|コシャリはしばしばエジプトの国民食と呼ばれ、国じゅうの屋台や簡素な食堂で層に盛られ、カリカリの揚げ玉ねぎをのせて売られている。",
  ),
  q(
    2,
    "Besides Cairo, what is Egypt's largest Mediterranean port city?|Además de El Cairo, ¿cuál es la mayor ciudad portuaria mediterránea de Egipto?|Outre Le Caire, quelle est la plus grande ville portuaire méditerranéenne d'Égypte ?|カイロを除くと、エジプト最大の地中海港湾都市は?",
    [
      "Alexandria|Alejandría|Alexandrie|アレクサンドリア",
      "Ismailia|Ismailía|Ismaïlia|イスマイリア",
      "Aswan|Asuán|Assouan|アスワン",
    ],
    0,
    "Alexandria was Egypt's capital for nearly a thousand years under Greek and Roman rule, long before Cairo was founded.|Alejandría fue capital de Egipto durante casi mil años bajo el dominio griego y romano, mucho antes de que se fundara El Cairo.|Alexandrie fut la capitale de l'Égypte pendant près de mille ans sous la domination grecque puis romaine, bien avant la fondation du Caire.|アレクサンドリアは、カイロが建設されるずっと前、ギリシャ・ローマ支配下の約千年にわたりエジプトの首都だった。",
  ),
  q(
    3,
    "Geographically, which continent is the Sinai Peninsula considered part of, unlike the rest of Egypt?|Geográficamente, ¿de qué continente se considera parte la península del Sinaí, a diferencia del resto de Egipto?|Géographiquement, de quel continent la péninsule du Sinaï est-elle considérée comme faisant partie, contrairement au reste de l'Égypte ?|地理的に、エジプトの他の部分とは違い、シナイ半島が属するとされる大陸は?",
    [
      "Asia|Asia|Asie|アジア",
      "Europe|Europa|Europe|ヨーロッパ",
      "Antarctica|Antártida|Antarctique|南極大陸",
    ],
    0,
    "This makes Egypt one of a handful of countries that straddle two continents, joined at the narrow isthmus where the Suez Canal now runs.|Esto convierte a Egipto en uno de los pocos países que se extienden por dos continentes, unidos en el estrecho istmo por donde hoy discurre el canal de Suez.|Cela fait de l'Égypte l'un des rares pays à cheval sur deux continents, reliés par l'étroit isthme où passe aujourd'hui le canal de Suez.|これによりエジプトは、いまスエズ運河が通る細い地峡でつながった、二つの大陸にまたがる数少ない国の一つになっている。",
  ),
  q(
    3,
    "What is the nickname of Egypt's men's national football team?|¿Cuál es el apodo de la selección masculina de fútbol de Egipto?|Quel est le surnom de l'équipe nationale masculine de football d'Égypte ?|エジプト男子サッカー代表チームの愛称は?",
    [
      "The Pharaohs|Los Faraones|Les Pharaons|ファラオズ",
      "The Lions|Los Leones|Les Lions|ライオンズ",
      "The Eagles|Las Águilas|Les Aigles|イーグルス",
    ],
    0,
    "The team holds the record for the most Africa Cup of Nations titles of any country.|El equipo posee el récord de más títulos de la Copa Africana de Naciones de cualquier país.|L'équipe détient le record du plus grand nombre de titres à la Coupe d'Afrique des nations, toutes équipes confondues.|このチームは、アフリカネイションズカップの優勝回数で他のどの国よりも多い記録を持つ。",
  ),
  q(
    2,
    "In which general direction does the Nile flow through Egypt, unlike many of the world's other famous rivers?|¿En qué dirección general fluye el Nilo por Egipto, a diferencia de muchos otros ríos famosos del mundo?|Dans quelle direction générale le Nil coule-t-il en Égypte, contrairement à beaucoup d'autres grands fleuves du monde ?|世界の他の多くの有名な川と違い、エジプトを流れるナイル川のおおまかな向きは?",
    [
      "South to north|De sur a norte|Du sud vers le nord|南から北",
      "North to south|De norte a sur|Du nord vers le sud|北から南",
      "East to west|De este a oeste|D'est en ouest|東から西",
    ],
    0,
    "Because the river flows north, \"Upper Egypt\" refers to the southern, higher-elevation stretch of the valley and \"Lower Egypt\" to the northern Delta.|Como el río fluye hacia el norte, «Alto Egipto» se refiere al tramo sur, de mayor altitud, del valle, y «Bajo Egipto» al delta del norte.|Comme le fleuve coule vers le nord, la « Haute-Égypte » désigne le tronçon sud, plus élevé, de la vallée, et la « Basse-Égypte » le delta du nord.|川が北へ流れるため、「上エジプト」は標高の高い南側の渓谷を、「下エジプト」は北のデルタを指す。",
  ),
  q(
    2,
    "What hot drink, usually served very sweet, is offered almost everywhere in Egypt as a gesture of hospitality?|¿Qué bebida caliente, servida normalmente muy dulce, se ofrece casi en todas partes de Egipto como gesto de hospitalidad?|Quelle boisson chaude, généralement servie très sucrée, est offerte presque partout en Égypte en signe d'hospitalité?|エジプトでほとんどどこでも、もてなしの印として出される、たいてい甘めの温かい飲み物は?",
    [
      "Tea|Té|Thé|紅茶",
      "Cocoa|Cacao|Cacao|ココア",
      "Kombucha|Kombucha|Kombucha|コンブチャ",
    ],
    0,
    "Turning down a glass of tea in a shop or a home can be read as a small social slight, so most visitors learn to accept at least a sip.|Rechazar un vaso de té en una tienda o una casa puede interpretarse como un pequeño desaire social, así que la mayoría de los visitantes aprende a aceptar al menos un sorbo.|Refuser un verre de thé dans une boutique ou chez quelqu'un peut être perçu comme un petit affront social, si bien que la plupart des visiteurs apprennent à en accepter au moins une gorgée.|店や家で出された紅茶を断ると、ちょっとした社交上の失礼と受け取られかねないので、たいていの訪問者はひと口だけでも飲むことを覚える。",
  ),
  q(
    1,
    "What desert-adapted animal has long been used to carry goods and people across Egypt's deserts?|¿Qué animal adaptado al desierto se ha usado durante mucho tiempo para transportar mercancías y personas por los desiertos de Egipto?|Quel animal adapté au désert a longtemps servi à transporter marchandises et personnes à travers les déserts d'Égypte ?|エジプトの砂漠で人や荷物を運ぶために長く使われてきた、砂漠に適応した動物は?",
    [
      "The camel|El camello|Le chameau|ラクダ",
      "The reindeer|El reno|Le renne|トナカイ",
      "The llama|La llama|Le lama|リャマ",
    ],
    0,
    "A camel can travel roughly a week without drinking water, which made overland desert trade routes possible long before motor vehicles existed.|Un camello puede viajar cerca de una semana sin beber agua, lo que hizo posibles las rutas comerciales terrestres del desierto mucho antes de que existieran los vehículos a motor.|Un chameau peut voyager environ une semaine sans boire, ce qui a rendu possibles les routes commerciales terrestres du désert bien avant l'existence des véhicules à moteur.|ラクダは水を飲まずにおよそ一週間旅を続けられる。これが、自動車が現れるよりずっと前から陸路の砂漠交易を可能にしていた。",
  ),
  q(
    2,
    "What kind of climate does most of Egypt have?|¿Qué tipo de clima tiene la mayor parte de Egipto?|Quel type de climat caractérise la majeure partie de l'Égypte ?|エジプトの大半を占める気候の種類は?",
    [
      "Hot desert climate|Clima desértico cálido|Climat désertique chaud|高温砂漠気候",
      "Tropical rainforest climate|Clima de selva tropical|Climat de forêt tropicale|熱帯雨林気候",
      "Subarctic climate|Clima subártico|Climat subarctique|亜寒帯気候",
    ],
    0,
    "Most of the country receives only a few millimetres of rain a year, and some interior desert stations can go years without measurable rainfall at all.|La mayor parte del país recibe solo unos pocos milímetros de lluvia al año, y algunas estaciones del desierto interior pueden pasar años sin lluvia medible.|La majeure partie du pays ne reçoit que quelques millimètres de pluie par an, et certaines stations du désert intérieur peuvent rester des années sans précipitation mesurable.|国の大半は年間わずか数ミリの雨しか降らず、内陸の砂漠にある観測地点の中には、計測できるほどの雨が何年も降らないところもある。",
  ),
  q(
    1,
    "Near which modern city do the famous Pyramids of Giza and the Great Sphinx stand?|¿Cerca de qué ciudad moderna se encuentran las famosas pirámides de Guiza y la Gran Esfinge?|Près de quelle ville moderne se dressent les célèbres pyramides de Gizeh et le Grand Sphinx ?|有名なギザのピラミッド群と大スフィンクスが立つ、近くの現代都市は?",
    [
      "Giza, across the Nile from central Cairo|Guiza, al otro lado del Nilo frente al centro de El Cairo|Gizeh, de l'autre côté du Nil par rapport au centre du Caire|カイロ中心部からナイル川を挟んだ対岸のギザ",
      "Luxor, far to the south|Luxor, muy al sur|Louxor, loin au sud|はるか南のルクソール",
      "Alexandria, on the coast|Alejandría, en la costa|Alexandrie, sur la côte|沿岸のアレクサンドリア",
    ],
    0,
    "The pyramid complex sits close enough to Giza's modern sprawl that some photographs manage to frame the monuments alongside apartment blocks in the same shot.|El complejo de las pirámides está lo bastante cerca de la expansión urbana moderna de Guiza como para que algunas fotos logren encuadrar los monumentos junto a bloques de apartamentos en la misma toma.|Le complexe pyramidal est assez proche de l'étalement urbain moderne de Gizeh pour que certaines photos parviennent à cadrer les monuments aux côtés d'immeubles résidentiels dans la même image.|ピラミッド群はギザの現代の市街地の広がりにかなり近く、写真によっては同じ一枚に記念碑と集合住宅が一緒に写り込む。",
  ),
  q(
    3,
    "Beyond simply linking two seas, what was the main practical benefit of building the Suez Canal for global shipping?|Más allá de unir dos mares, ¿cuál fue el principal beneficio práctico de construir el canal de Suez para el transporte marítimo mundial?|Au-delà de simplement relier deux mers, quel fut le principal avantage pratique de la construction du canal de Suez pour le transport maritime mondial?|二つの海を結ぶこと以外に、スエズ運河の建設が世界の海運にもたらした主な実用上の利点は?",
    [
      "It let ships skip the long voyage around the southern tip of Africa|Permitió a los barcos evitar el largo viaje bordeando el extremo sur de África|Il a permis aux navires d'éviter le long voyage autour de la pointe sud de l'Afrique|アフリカ南端を回る長い航海を省けるようになった",
      "It made ships immune to storms|Hizo a los barcos inmunes a las tormentas|Il a rendu les navires immunisés contre les tempêtes|船が嵐の影響を受けなくなった",
      "It eliminated the need for ship engines|Eliminó la necesidad de motores en los barcos|Il a supprimé le besoin de moteurs pour les navires|船にエンジンが要らなくなった",
    ],
    0,
    "A voyage from Europe to India that once took months around Africa could be cut down dramatically by cutting straight through the isthmus instead.|Un viaje de Europa a la India que antes tomaba meses rodeando África podía acortarse drásticamente al cruzar directamente el istmo.|Un voyage de l'Europe vers l'Inde qui prenait autrefois des mois en contournant l'Afrique pouvait être considérablement raccourci en traversant directement l'isthme.|かつてアフリカを回ってヨーロッパからインドへ行くのに何か月もかかっていた航海は、地峡を直接横切ることで劇的に短縮できるようになった。",
  ),

  // ==================== 難易度4〜6(47問) ====================
  q(
    5,
    "Who led the widespread 1919 revolution against British rule in Egypt, later becoming a national symbol of the independence movement?|¿Quién lideró la extendida revolución de 1919 contra el dominio británico en Egipto, y se convirtió después en símbolo nacional del movimiento independentista?|Qui dirigea la vaste révolution de 1919 contre la domination britannique en Égypte, devenant plus tard un symbole national du mouvement indépendantiste?|1919年、イギリス支配に対する広範な革命を率い、のちに独立運動の国民的象徴となった人物は?",
    [
      "Saad Zaghloul|Saad Zaghlul|Saad Zaghloul|サアド・ザグルール",
      "Anwar Sadat|Anuar el Sadat|Anouar el-Sadate|アンワル・サダト",
      "Muhammad Ali|Muhammad Ali|Muhammad Ali|ムハンマド・アリー",
    ],
    0,
    "Zaghloul's exile by British authorities in 1919 was the spark that set off nationwide protests, strikes and unrest across the country.|El exilio de Zaghloul por las autoridades británicas en 1919 fue la chispa que desató protestas, huelgas y disturbios en todo el país.|L'exil de Zaghloul par les autorités britanniques en 1919 fut l'étincelle qui déclencha manifestations, grèves et troubles dans tout le pays.|1919年、ザグルールがイギリス当局によって追放されたことが、国じゅうでの抗議・ストライキ・騒乱の引き金になった。",
  ),
  q(
    5,
    "In what year did Egypt gain nominal independence from Britain, though British troops and influence remained for decades after?|¿En qué año obtuvo Egipto la independencia nominal de Gran Bretaña, aunque las tropas y la influencia británicas siguieron presentes durante décadas después?|En quelle année l'Égypte a-t-elle obtenu son indépendance nominale de la Grande-Bretagne, bien que troupes et influence britanniques y soient restées des décennies durant?|イギリスの軍隊と影響力がその後も何十年も残ったものの、エジプトが名目上イギリスから独立したのは何年か?",
    [
      "1922|1922|1922|1922年",
      "1945|1945|1945|1945年",
      "1960|1960|1960|1960年",
    ],
    0,
    "Britain retained control over defence, foreign affairs and the Suez Canal Zone under the 1922 declaration, so full sovereignty came only gradually over the following decades.|Gran Bretaña conservó el control de la defensa, los asuntos exteriores y la zona del canal de Suez bajo la declaración de 1922, así que la soberanía plena llegó solo de forma gradual en las décadas siguientes.|La Grande-Bretagne conserva le contrôle de la défense, des affaires étrangères et de la zone du canal de Suez sous la déclaration de 1922, si bien que la pleine souveraineté ne vint que graduellement au fil des décennies suivantes.|1922年の宣言のもとでも、イギリスは国防・外交・スエズ運河地帯の統制を保持し続けたため、完全な主権はその後何十年もかけて段階的にしか得られなかった。",
  ),
  q(
    5,
    "Which king was overthrown in the 1952 revolution that ended Egypt's monarchy?|¿Qué rey fue derrocado en la revolución de 1952 que puso fin a la monarquía egipcia?|Quel roi fut renversé lors de la révolution de 1952 qui mit fin à la monarchie égyptienne?|1952年の革命でエジプトの王政を終わらせ、退位させられた王は?",
    [
      "King Farouk|El rey Faruk|Le roi Farouk|ファールーク国王",
      "King Fuad II|El rey Fuad II|Le roi Fouad II|フアード2世",
      "King Hussein|El rey Hussein|Le roi Hussein|フセイン国王",
    ],
    0,
    "Farouk left the country by royal yacht from Alexandria within days of the coup, and the monarchy was formally abolished the following year.|Faruk abandonó el país en el yate real desde Alejandría a los pocos días del golpe, y la monarquía fue abolida formalmente al año siguiente.|Farouk quitta le pays sur le yacht royal depuis Alexandrie quelques jours après le coup d'État, et la monarchie fut officiellement abolie l'année suivante.|ファールークはクーデターからわずか数日でアレクサンドリアから王室のヨットで国を離れ、翌年には王政が正式に廃止された。",
  ),
  q(
    6,
    "The 1952 coup that ended Egypt's monarchy was carried out by a secret group of army officers generally known by what name?|El golpe de 1952 que puso fin a la monarquía egipcia fue llevado a cabo por un grupo secreto de oficiales del ejército conocido generalmente con qué nombre?|Le coup d'État de 1952 qui mit fin à la monarchie égyptienne fut mené par un groupe secret d'officiers de l'armée généralement connu sous quel nom?|エジプトの王政を終わらせた1952年のクーデターを実行した秘密の陸軍将校集団は、一般に何と呼ばれるか?",
    [
      "The Free Officers|Los Oficiales Libres|Les Officiers libres|自由将校団",
      "The Iron Guard|La Guardia de Hierro|La Garde de fer|鉄衛団",
      "The Young Turks|Los Jóvenes Turcos|Les Jeunes-Turcs|青年トルコ人",
    ],
    0,
    "The group had organised secretly within the army for years beforehand, frustrated by the 1948 war's outcome and by what they saw as corruption in the monarchy.|El grupo se había organizado en secreto dentro del ejército durante años, frustrado por el resultado de la guerra de 1948 y por lo que veían como corrupción en la monarquía.|Le groupe s'était organisé secrètement au sein de l'armée pendant des années, frustré par l'issue de la guerre de 1948 et par ce qu'il percevait comme la corruption de la monarchie.|この集団は、1948年の戦争の結果と、王政の腐敗と見なしたものに不満を募らせ、何年も前から軍内部で秘密裏に組織されていた。",
  ),
  q(
    6,
    "Which country provided the main financial and technical backing for building the Aswan High Dam, after Western funding fell through?|¿Qué país aportó el principal respaldo financiero y técnico para construir la Presa Alta de Asuán, después de que la financiación occidental fracasara?|Quel pays a fourni le principal soutien financier et technique pour construire le haut barrage d'Assouan, après l'échec du financement occidental?|西側からの資金提供が実現しなかったあと、アスワン・ハイダムの建設に主要な資金・技術支援を行った国は?",
    [
      "The Soviet Union|La Unión Soviética|L'Union soviétique|ソビエト連邦",
      "Japan|Japón|Le Japon|日本",
      "Brazil|Brasil|Le Brésil|ブラジル",
    ],
    0,
    "Soviet engineers and financing arrived after the United States and Britain withdrew their offer in 1956, partly in response to Egypt's arms deals with the Eastern Bloc.|Los ingenieros y la financiación soviéticos llegaron después de que Estados Unidos y Gran Bretaña retiraran su oferta en 1956, en parte por los acuerdos armamentísticos de Egipto con el bloque del Este.|Ingénieurs et financement soviétiques arrivèrent après que les États-Unis et la Grande-Bretagne eurent retiré leur offre en 1956, en partie en réaction aux accords d'armement de l'Égypte avec le bloc de l'Est.|1956年、アメリカとイギリスが申し出を撤回したあと、ソ連の技師と資金がやってきた。一因は、エジプトが東側陣営と結んだ武器取引への反応だった。",
  ),
  q(
    6,
    "In what year was the Aswan High Dam officially completed?|¿En qué año se completó oficialmente la Presa Alta de Asuán?|En quelle année le haut barrage d'Assouan fut-il officiellement achevé?|アスワン・ハイダムが正式に完成したのは何年か?",
    [
      "1970|1970|1970|1970年",
      "1952|1952|1952|1952年",
      "1990|1990|1990|1990年",
    ],
    0,
    "Construction had begun a decade earlier, in 1960, and the reservoir behind it took several more years after completion to fill fully.|La construcción había comenzado una década antes, en 1960, y el embalse tardó varios años más tras la finalización en llenarse por completo.|La construction avait débuté une décennie plus tôt, en 1960, et le réservoir mit plusieurs années de plus après l'achèvement pour se remplir complètement.|建設はその10年前の1960年に始まっており、完成後も貯水池が満水になるまでにはさらに数年を要した。",
  ),
  q(
    6,
    "Egypt signed a landmark peace treaty in 1979 with which country, ending decades of war between them?|Egipto firmó en 1979 un histórico tratado de paz con qué país, poniendo fin a décadas de guerra entre ambos?|L'Égypte a signé en 1979 un traité de paix historique avec quel pays, mettant fin à des décennies de guerre entre eux?|エジプトが1979年、何十年もの戦争状態を終わらせる画期的な和平条約を結んだ相手国は?",
    [
      "Israel|Israel|Israël|イスラエル",
      "Ethiopia|Etiopía|L'Éthiopie|エチオピア",
      "Greece|Grecia|La Grèce|ギリシャ",
    ],
    0,
    "The treaty made Egypt the first Arab country to formally recognise Israel, a decision that led to Egypt's temporary suspension from the Arab League.|El tratado convirtió a Egipto en el primer país árabe en reconocer formalmente a Israel, una decisión que llevó a la suspensión temporal de Egipto de la Liga Árabe.|Le traité fit de l'Égypte le premier pays arabe à reconnaître officiellement Israël, une décision qui entraîna la suspension temporaire de l'Égypte de la Ligue arabe.|この条約により、エジプトはイスラエルを正式に承認した最初のアラブ諸国となった。この決定は、エジプトのアラブ連盟からの一時的な資格停止につながった。",
  ),
  q(
    5,
    "The mass protests of 2011 forced the resignation of which long-serving Egyptian president?|Las protestas masivas de 2011 forzaron la dimisión de qué presidente egipcio de larga permanencia en el cargo?|Les manifestations de masse de 2011 forcèrent la démission de quel président égyptien resté longtemps au pouvoir?|2011年の大規模な抗議運動が退陣に追い込んだ、長期在任していたエジプトの大統領は?",
    [
      "Hosni Mubarak|Hosni Mubarak|Hosni Moubarak|ホスニー・ムバーラク",
      "Anwar Sadat|Anuar el Sadat|Anouar el-Sadate|アンワル・サダト",
      "Gamal Abdel Nasser|Gamal Abdel Nasser|Gamal Abdel Nasser|ガマール・アブドゥル=ナーセル",
    ],
    0,
    "Mubarak had governed since 1981, and the 18-day uprising centred on Cairo's Tahrir Square became one of the defining images of that year's wider regional unrest.|Mubarak había gobernado desde 1981, y el levantamiento de 18 días centrado en la plaza Tahrir de El Cairo se convirtió en una de las imágenes definitorias del malestar regional más amplio de ese año.|Mubarak gouvernait depuis 1981, et le soulèvement de 18 jours centré sur la place Tahrir du Caire devint l'une des images marquantes des troubles régionaux plus larges de cette année-là.|ムバーラクは1981年から統治を続けており、カイロのタハリール広場を中心にした18日間の蜂起は、その年の地域全体の動乱を象徴する光景の一つになった。",
  ),
  q(
    6,
    "Which Egyptian author became the first writer in Arabic to win the Nobel Prize in Literature, in 1988?|¿Qué autor egipcio se convirtió en el primer escritor en lengua árabe en ganar el Premio Nobel de Literatura, en 1988?|Quel auteur égyptien devint le premier écrivain de langue arabe à remporter le prix Nobel de littérature, en 1988?|1988年、アラビア語で書く作家として初めてノーベル文学賞を受賞したエジプトの作家は?",
    [
      "Naguib Mahfouz|Naguib Mahfuz|Naguib Mahfouz|ナギーブ・マフフーズ",
      "Taha Hussein|Taha Husein|Taha Hussein|ターハー・フセイン",
      "Tawfiq al-Hakim|Tawfiq al-Hakim|Tawfiq al-Hakim|タウフィーク・アル=ハキーム",
    ],
    0,
    "Mahfouz's novels, many set among the alleys and coffeehouses of old Cairo, chronicled the city's social change across most of the 20th century.|Las novelas de Mahfuz, muchas ambientadas en los callejones y cafés del viejo El Cairo, narraron el cambio social de la ciudad a lo largo de la mayor parte del siglo XX.|Les romans de Mahfouz, beaucoup situés dans les ruelles et les cafés du vieux Caire, ont chroniqué le changement social de la ville sur presque tout le XXe siècle.|マフフーズの小説の多くは旧市街の路地やカフェを舞台にしており、20世紀のほとんどを通じたカイロの社会の変化を描き続けた。",
  ),
  q(
    5,
    "Which 20th-century Egyptian singer, active for decades and known for extraordinarily long live performances, is often called the greatest voice in modern Arabic music?|¿Qué cantante egipcia del siglo XX, activa durante décadas y conocida por actuaciones en directo extraordinariamente largas, suele considerarse la mayor voz de la música árabe moderna?|Quelle chanteuse égyptienne du XXe siècle, active pendant des décennies et connue pour des concerts extraordinairement longs, est souvent considérée comme la plus grande voix de la musique arabe moderne?|数十年にわたり活躍し、驚くほど長いライブ公演で知られる、しばしば近代アラビア語音楽最高の歌声と呼ばれる20世紀エジプトの歌手は?",
    [
      "Umm Kulthum|Umm Kulzum|Oum Kalthoum|ウンム・クルスーム",
      "Fairuz|Fairuz|Fairouz|フェイルーズ",
      "Dalida|Dalida|Dalida|ダリダ",
    ],
    0,
    "Her monthly radio concerts reportedly emptied the streets of Cairo, and a single song could stretch past an hour as she reworked its verses live.|Se dice que sus conciertos radiofónicos mensuales vaciaban las calles de El Cairo, y una sola canción podía superar la hora de duración mientras reelaboraba sus versos en directo.|Ses concerts radiophoniques mensuels auraient vidé les rues du Caire, et une seule chanson pouvait dépasser l'heure tandis qu'elle retravaillait ses couplets en direct.|毎月のラジオ演奏会はカイロの通りを空にしたと言われ、一曲がライブでの節回しの作り直しによって1時間を超えることもあった。",
  ),
  q(
    6,
    "Egyptian cinema's mid-20th-century dominance across the Arab world earned it a nickname referencing which American film industry?|El dominio del cine egipcio en el mundo árabe a mediados del siglo XX le valió un apodo en referencia a qué industria cinematográfica estadounidense?|La domination du cinéma égyptien dans le monde arabe au milieu du XXe siècle lui valut un surnom faisant référence à quelle industrie cinématographique américaine?|20世紀半ば、アラブ世界を席巻したエジプト映画は、アメリカのどの映画産業にちなむ愛称で呼ばれたか?",
    [
      "Hollywood, as in \"Hollywood of the Arab world\"|Hollywood, como en «el Hollywood del mundo árabe»|Hollywood, comme dans « le Hollywood du monde arabe »|ハリウッド(「アラブ世界のハリウッド」として)",
      "Broadway, as in \"Broadway of the Arab world\"|Broadway, como en «el Broadway del mundo árabe»|Broadway, comme dans « le Broadway du monde arabe »|ブロードウェイ(「アラブ世界のブロードウェイ」として)",
      "Nashville, as in \"Nashville of the Arab world\"|Nashville, como en «el Nashville del mundo árabe»|Nashville, comme dans « le Nashville du monde arabe »|ナッシュビル(「アラブ世界のナッシュビル」として)",
    ],
    0,
    "Cairo's film studios produced hundreds of Arabic-language films a year through the mid-20th century, exported and watched across the whole region.|Los estudios de cine de El Cairo produjeron cientos de películas en árabe al año hasta mediados del siglo XX, exportadas y vistas en toda la región.|Les studios de cinéma du Caire produisirent des centaines de films en arabe par an jusqu'au milieu du XXe siècle, exportés et vus dans toute la région.|カイロの映画スタジオは20世紀半ばまで、年に何百本ものアラビア語映画を作り、地域全体へ輸出されて見られていた。",
  ),
  q(
    4,
    "In which sport has Egypt produced numerous world number-one ranked players, more than in almost any other sport at elite level?|¿En qué deporte ha producido Egipto numerosos jugadores clasificados número uno del mundo, más que en casi cualquier otro deporte de élite?|Dans quel sport l'Égypte a-t-elle produit de nombreux joueurs classés numéro un mondial, plus que dans presque tout autre sport de haut niveau?|エジプトが、他のほとんどの競技のトップレベルより多く世界ランキング1位の選手を輩出してきたスポーツは?",
    [
      "Squash|El squash|Le squash|スカッシュ",
      "Ice hockey|El hockey sobre hielo|Le hockey sur glace|アイスホッケー",
      "Cricket|El críquet|Le cricket|クリケット",
    ],
    0,
    "Egyptian men's and women's squash players have held the top world ranking for a combined total of many years across the 21st century so far.|Los jugadores y jugadoras egipcios de squash han ocupado el primer puesto del ranking mundial durante un total combinado de muchos años en lo que va del siglo XXI.|Les joueurs et joueuses égyptiens de squash ont occupé la première place mondiale pendant un total combiné de nombreuses années au cours du XXIe siècle.|エジプトの男女のスカッシュ選手は、21世紀に入ってから合わせて長年にわたり世界ランキング1位の座を占めてきた。",
  ),
  q(
    5,
    "Egypt's men's national handball team is generally considered among the strongest on which continent?|La selección masculina de balonmano de Egipto se considera generalmente entre las más fuertes de qué continente?|L'équipe nationale masculine de handball d'Égypte est généralement considérée parmi les plus fortes de quel continent?|エジプトの男子ハンドボール代表チームが、屈指の強豪と一般に見なされている大陸は?",
    [
      "Africa|África|L'Afrique|アフリカ",
      "South America|Sudamérica|L'Amérique du Sud|南アメリカ",
      "Oceania|Oceanía|L'Océanie|オセアニア",
    ],
    0,
    "The team has repeatedly won the African championship and has reached the knockout rounds of the Olympic and World Championship tournaments in recent decades.|El equipo ha ganado repetidamente el campeonato africano y ha llegado a las rondas eliminatorias de los torneos olímpicos y del Campeonato Mundial en las últimas décadas.|L'équipe a remporté à plusieurs reprises le championnat d'Afrique et a atteint les phases à élimination directe des tournois olympiques et du Championnat du monde ces dernières décennies.|このチームはアフリカ選手権を何度も制しており、近年ではオリンピックや世界選手権のノックアウトステージにも進出している。",
  ),
  q(
    5,
    "What is the main ingredient of ful medames, a very common Egyptian breakfast dish?|¿Cuál es el ingrediente principal del ful medames, un desayuno egipcio muy común?|Quel est l'ingrédient principal du ful medames, un plat de petit-déjeuner très courant en Égypte?|エジプトでごく一般的な朝食料理、フール・メダメスの主な材料は?",
    [
      "Fava beans|Habas|Fèves|そら豆",
      "Chickpeas|Garbanzos|Pois chiches|ひよこ豆",
      "Lentils|Lentejas|Lentilles|レンズ豆",
    ],
    0,
    "The beans are slow-cooked, often overnight, then mashed and dressed with olive oil, lemon and cumin, and eaten scooped up with bread.|Las habas se cuecen a fuego lento, a menudo toda la noche, y luego se machacan y se aliñan con aceite de oliva, limón y comino, y se comen con pan.|Les fèves cuisent lentement, souvent toute la nuit, puis sont écrasées et assaisonnées d'huile d'olive, de citron et de cumin, et mangées avec du pain.|そら豆はしばしば一晩かけてじっくり煮込まれ、つぶしてオリーブ油・レモン・クミンで味付けし、パンですくって食べる。",
  ),
  q(
    5,
    "Karkade, a popular deep-red Egyptian drink served hot or cold, is made from which flower?|El karkade, una popular bebida egipcia de color rojo intenso servida fría o caliente, se elabora con qué flor?|Le karkadé, une boisson égyptienne populaire d'un rouge profond, servie chaude ou froide, est préparée à partir de quelle fleur?|温冷どちらでも飲まれる、鮮やかな赤色の人気のエジプトの飲み物カルカデーは、何の花から作られるか?",
    [
      "Hibiscus|Hibisco|Hibiscus|ハイビスカス",
      "Jasmine|Jazmín|Jasmin|ジャスミン",
      "Lavender|Lavanda|Lavande|ラベンダー",
    ],
    0,
    "Dried hibiscus calyxes are steeped like tea, and the drink is traditionally offered to wedding guests in Upper Egypt as a gesture of welcome.|Los cálices secos de hibisco se infusionan como el té, y la bebida se ofrece tradicionalmente a los invitados de boda en el Alto Egipto como gesto de bienvenida.|Les calices séchés d'hibiscus infusent comme du thé, et la boisson est traditionnellement offerte aux invités de mariage en Haute-Égypte en signe de bienvenue.|乾燥させたハイビスカスの萼を紅茶のように煮出す。上エジプトでは伝統的に、結婚式の客をもてなす飲み物として出される。",
  ),
  q(
    6,
    "Molokhia, a popular green soup-like dish, is made from the leaves of which plant?|El molokhia, un popular plato verde con textura de sopa, se elabora con las hojas de qué planta?|Le molokhia, un plat vert populaire à la texture de soupe, est préparé à partir des feuilles de quelle plante?|人気のとろみのある緑のスープ料理モロヘイヤは、何の植物の葉から作られるか?",
    [
      "Jute mallow, commonly called molokhia leaves in English|La malva de yute, comúnmente llamada hojas de molokhia|La corète potagère, communément appelée feuilles de molokhia|シマツナソ(モロヘイヤ)",
      "Spinach|Espinaca|Épinard|ホウレンソウ",
      "Kale|Col rizada|Chou frisé|ケール",
    ],
    0,
    "The chopped leaves release a natural thickener when cooked, giving the soup a distinctive slick texture that some newcomers need time to get used to.|Las hojas picadas liberan un espesante natural al cocinarse, dando a la sopa una textura resbaladiza característica a la que algunos recién llegados tardan en acostumbrarse.|Les feuilles hachées libèrent un épaississant naturel à la cuisson, donnant à la soupe une texture glissante caractéristique à laquelle certains nouveaux venus mettent du temps à s'habituer.|刻んだ葉は加熱すると自然なとろみを出し、スープに独特のぬめりのある食感を与える。初めて食べる人が慣れるまで少し時間がかかることもある。",
  ),
  q(
    6,
    "Roughly what share of Egypt's population is most commonly estimated to be Coptic Christian?|¿Qué proporción de la población de Egipto se estima con más frecuencia que es cristiana copta?|Quelle part de la population égyptienne est le plus souvent estimée être chrétienne copte?|エジプトの人口のうち、コプト・キリスト教徒の割合として最も一般的に見積もられているのは?",
    [
      "Roughly one in ten|Aproximadamente uno de cada diez|Environ un sur dix|およそ10人に1人",
      "Roughly one in two|Aproximadamente uno de cada dos|Environ un sur deux|およそ2人に1人",
      "Fewer than one in a hundred|Menos de uno de cada cien|Moins d'un sur cent|100人に1人未満",
    ],
    0,
    "Exact figures are politically sensitive and disputed, since Egypt's census does not ask about religion, but most independent estimates land somewhere around ten percent.|Las cifras exactas son políticamente sensibles y se discuten, ya que el censo egipcio no pregunta por la religión, pero la mayoría de las estimaciones independientes rondan el diez por ciento.|Les chiffres exacts sont politiquement sensibles et contestés, le recensement égyptien ne posant pas de question sur la religion, mais la plupart des estimations indépendantes tournent autour de dix pour cent.|正確な数字は政治的に敏感で議論があり、エジプトの国勢調査は宗教を尋ねないが、独立した推計の多くはおよそ10%前後に落ち着いている。",
  ),
  q(
    6,
    "Nubian communities in southern Egypt still speak languages entirely unrelated to Arabic. Which of these is one of the two main Nubian languages spoken today?|Las comunidades nubias del sur de Egipto todavía hablan lenguas completamente ajenas al árabe. ¿Cuál de estas es una de las dos principales lenguas nubias que se hablan hoy?|Les communautés nubiennes du sud de l'Égypte parlent encore des langues sans aucun lien avec l'arabe. Laquelle de celles-ci est l'une des deux principales langues nubiennes parlées aujourd'hui?|エジプト南部のヌビア人共同体は、いまもアラビア語とはまったく系統の異なる言語を話している。現在話されている二大ヌビア諸語の一つはどれか?",
    [
      "Nobiin|Nobiin|Le nobiin|ノビーン語",
      "Tigrinya|Tigriña|Le tigrigna|ティグリニャ語",
      "Wolof|Wólof|Le wolof|ウォロフ語",
    ],
    0,
    "Nobiin and the related Kenuzi-Dongola variety are passed down mainly by speaking rather than writing, and most younger Nubians today are also fluent in Arabic for school and work.|El nobiin y la variedad emparentada kenuzi-dongola se transmiten sobre todo de forma oral y no escrita, y la mayoría de los nubios jóvenes de hoy también dominan el árabe para la escuela y el trabajo.|Le nobiin et la variété apparentée kenuzi-dongola se transmettent surtout à l'oral plutôt qu'à l'écrit, et la plupart des jeunes Nubiens d'aujourd'hui maîtrisent aussi l'arabe pour l'école et le travail.|ノビーン語と、それに近いケヌーズィ・ドンゴラ語は、おもに書き言葉ではなく話し言葉として受け継がれてきた。今日の若いヌビア人の多くは、学校や仕事のためにアラビア語も流暢に話す。",
  ),
  q(
    6,
    "The White Desert, known for wind-carved white chalk rock formations, lies within which broader desert region of Egypt?|El desierto Blanco, conocido por sus formaciones de roca caliza blanca esculpidas por el viento, se encuentra dentro de qué región desértica más amplia de Egipto?|Le désert Blanc, connu pour ses formations rocheuses de craie blanche sculptées par le vent, se trouve dans quelle région désertique plus vaste d'Égypte?|風に削られた白い石灰岩の造形で知られる白砂漠は、エジプトのどの広域の砂漠地帯に含まれるか?",
    [
      "The Western Desert|El desierto Occidental|Le désert occidental|西方砂漠",
      "The Eastern Desert|El desierto Oriental|Le désert oriental|東方砂漠",
      "The Sinai Desert|El desierto del Sinaí|Le désert du Sinaï|シナイ砂漠",
    ],
    0,
    "The formations sit near Farafra, one of a chain of oases strung across the Western Desert that historically depended on underground water rather than the Nile.|Las formaciones se hallan cerca de Farafra, uno de una cadena de oasis repartidos por el desierto Occidental que históricamente dependían del agua subterránea y no del Nilo.|Les formations se trouvent près de Farafra, l'une d'une chaîne d'oasis disséminées dans le désert occidental qui dépendaient historiquement des eaux souterraines plutôt que du Nil.|この造形はファラフラの近くにある。ファラフラは西方砂漠に連なるオアシスの一つで、歴史的にナイルではなく地下水に頼ってきた。",
  ),
  q(
    6,
    "The traditional language of Siwa Oasis, near the Libyan border, belongs to which broader language family, unrelated to Arabic?|La lengua tradicional del oasis de Siwa, cerca de la frontera libia, pertenece a qué familia lingüística más amplia, no emparentada con el árabe?|La langue traditionnelle de l'oasis de Siwa, près de la frontière libyenne, appartient à quelle famille linguistique plus large, sans lien avec l'arabe?|リビア国境近くのシワ・オアシスの伝統的な言語が属する、アラビア語とは系統の異なる広い語族は?",
    [
      "Berber (Amazigh)|Bereber (amazigh)|Berbère (amazighe)|ベルベル語族(アマジグ語族)",
      "Bantu|Bantú|Bantoue|バントゥー語族",
      "Turkic|Turco|Turcique|チュルク語族",
    ],
    0,
    "Siwi is the easternmost living Berber language, spoken by a community that stayed relatively isolated from the rest of Egypt until a paved road reached the oasis in the 1980s.|El siwi es la lengua bereber viva más oriental, hablada por una comunidad que permaneció relativamente aislada del resto de Egipto hasta que una carretera pavimentada llegó al oasis en los años ochenta.|Le siwi est la langue berbère vivante la plus orientale, parlée par une communauté restée relativement isolée du reste de l'Égypte jusqu'à ce qu'une route goudronnée atteigne l'oasis dans les années 1980.|シワ語は現存するベルベル語族の中で最も東にある言語で、1980年代に舗装道路がオアシスに届くまで、比較的エジプトの他の地域から隔絶されていた共同体で話されてきた。",
  ),
  q(
    5,
    "What term describes the money that Egyptians working abroad, especially in Gulf states, send back to their families?|¿Qué término describe el dinero que los egipcios que trabajan en el extranjero, especialmente en los estados del Golfo, envían a sus familias?|Quel terme désigne l'argent que les Égyptiens travaillant à l'étranger, notamment dans les États du Golfe, renvoient à leurs familles?|とくに湾岸諸国で働くエジプト人が家族に送る金を指す言葉は?",
    [
      "Remittances|Remesas|Envois de fonds|海外送金(仕送り)",
      "Reparations|Reparaciones|Réparations|賠償金",
      "Royalties|Regalías|Redevances|ロイヤルティ",
    ],
    0,
    "These transfers rank among the country's largest sources of foreign currency, alongside tourism and Suez Canal fees.|Estas transferencias figuran entre las mayores fuentes de divisas del país, junto con el turismo y las tarifas del canal de Suez.|Ces transferts comptent parmi les plus grandes sources de devises du pays, aux côtés du tourisme et des redevances du canal de Suez.|こうした送金は、観光やスエズ運河の通航料と並んで、この国最大級の外貨収入源の一つになっている。",
  ),
  q(
    6,
    "In 2015, a huge natural gas field was discovered off Egypt's Mediterranean coast, one of the largest ever found in the sea. What was it named?|En 2015 se descubrió un enorme yacimiento de gas natural frente a la costa mediterránea de Egipto, uno de los mayores hallados nunca en el mar. ¿Cómo se llamó?|En 2015, un immense gisement de gaz naturel fut découvert au large de la côte méditerranéenne de l'Égypte, l'un des plus grands jamais trouvés en mer. Comment a-t-il été nommé?|2015年、エジプトの地中海沿岸沖で発見された、海で見つかった中でも指折りの規模の巨大天然ガス田の名は?",
    [
      "Zohr|Zohr|Zohr|ゾール",
      "Sphinx|Esfinge|Sphinx|スフィンクス",
      "Nefertiti|Nefertiti|Néfertiti|ネフェルティティ",
    ],
    0,
    "The find, made by an Italian energy company, allowed Egypt to move from being a net gas importer back to a net exporter within a few years.|El hallazgo, realizado por una empresa energética italiana, permitió a Egipto pasar de ser importador neto de gas a exportador neto en pocos años.|La découverte, réalisée par une compagnie énergétique italienne, permit à l'Égypte de repasser d'importateur net de gaz à exportateur net en quelques années.|イタリアのエネルギー企業によるこの発見により、エジプトは数年のうちにガスの純輸入国から純輸出国へと戻ることができた。",
  ),
  q(
    6,
    "Roughly how many lines has the Cairo Metro run on for most of the 2020s, before newer extensions began opening?|¿Aproximadamente cuántas líneas ha tenido el metro de El Cairo durante la mayor parte de la década de 2020, antes de que empezaran a abrirse nuevas ampliaciones?|Combien de lignes le métro du Caire a-t-il compté environ pendant la majeure partie des années 2020, avant l'ouverture des nouvelles extensions?|新しい延伸区間が開通し始める前、2020年代の大半を通じてカイロの地下鉄が持っていた路線の数はおよそいくつか?",
    [
      "Three|Tres|Trois|3本",
      "Eight|Ocho|Huit|8本",
      "One|Una|Une|1本",
    ],
    0,
    "A fourth line has been under construction to extend service further, and a monorail system separate from the metro also opened in the 2020s to reach new desert suburbs.|Se ha estado construyendo una cuarta línea para ampliar el servicio, y un sistema de monorraíl independiente del metro también se inauguró en la década de 2020 para llegar a nuevos suburbios del desierto.|Une quatrième ligne a été en construction pour étendre le service, et un système de monorail distinct du métro a également ouvert dans les années 2020 pour desservir de nouvelles banlieues désertiques.|さらなる延伸のため4本目の路線が建設中であり、地下鉄とは別のモノレールも2020年代に開通し、新しい砂漠の郊外へ路線を伸ばしている。",
  ),
  q(
    5,
    "St Catherine's Monastery, one of the world's oldest continuously operating Christian monasteries, sits on which peninsula?|El monasterio de Santa Catalina, uno de los monasterios cristianos en funcionamiento continuo más antiguos del mundo, se encuentra en qué península?|Le monastère Sainte-Catherine, l'un des plus anciens monastères chrétiens du monde en activité continue, se trouve sur quelle péninsule?|世界最古級の、途切れず存続してきたキリスト教修道院の一つ、聖カタリナ修道院がある半島は?",
    [
      "The Sinai Peninsula|La península del Sinaí|La péninsule du Sinaï|シナイ半島",
      "The Iberian Peninsula|La península ibérica|La péninsule Ibérique|イベリア半島",
      "The Yucatan Peninsula|La península de Yucatán|La péninsule du Yucatán|ユカタン半島",
    ],
    0,
    "The monastery was built in the 6th century at the foot of a mountain that both Christian and Jewish tradition associate with the giving of the Ten Commandments.|El monasterio se construyó en el siglo VI al pie de una montaña que tanto la tradición cristiana como la judía asocian con la entrega de los Diez Mandamientos.|Le monastère fut bâti au VIe siècle au pied d'une montagne que les traditions chrétienne et juive associent toutes deux à la remise des Dix Commandements.|この修道院は6世紀、キリスト教とユダヤ教の両方の伝承で十戒が授けられた場所とされる山の麓に建てられた。",
  ),
  q(
    6,
    "In which decade did the modern Bibliotheca Alexandrina, a large library built to evoke the ancient Library of Alexandria, open to the public?|¿En qué década se abrió al público la moderna Biblioteca de Alejandría, una gran biblioteca construida para evocar la antigua Biblioteca de Alejandría?|Dans quelle décennie la Bibliotheca Alexandrina moderne, une grande bibliothèque construite pour évoquer l'ancienne Bibliothèque d'Alexandrie, a-t-elle ouvert au public?|古代のアレクサンドリア図書館を思わせるために建てられた現代の大図書館ビブリオテカ・アレクサンドリナが一般公開されたのは何年代か?",
    [
      "The 2000s|Los años 2000|Les années 2000|2000年代",
      "The 1960s|Los años sesenta|Les années 1960|1960年代",
      "The 1920s|Los años veinte|Les années 1920|1920年代",
    ],
    0,
    "The building, opened in 2002 after years of international fundraising, includes a vast reading room lit by an angled glass roof.|El edificio, inaugurado en 2002 tras años de recaudación internacional, incluye una vasta sala de lectura iluminada por un tejado de cristal inclinado.|Le bâtiment, ouvert en 2002 après des années de collecte de fonds internationale, comprend une vaste salle de lecture éclairée par un toit de verre incliné.|この建物は、何年もの国際的な資金集めを経て2002年に開館し、斜めのガラス屋根から光が差し込む広大な閲覧室を備えている。",
  ),
  q(
    4,
    "Along with tourism and worker remittances, fees from which waterway form one of Egypt's top three sources of foreign currency?|Junto con el turismo y las remesas de trabajadores, las tarifas de qué vía navegable forman una de las tres mayores fuentes de divisas de Egipto?|Avec le tourisme et les envois de fonds des travailleurs, les redevances de quelle voie d'eau forment l'une des trois plus grandes sources de devises de l'Égypte?|観光や海外送金と並んで、エジプトの三大外貨収入源の一つを成す水路の通航料とは?",
    [
      "The Suez Canal|El canal de Suez|Le canal de Suez|スエズ運河",
      "The Amazon River|El río Amazonas|Le fleuve Amazone|アマゾン川",
      "The Panama Canal|El canal de Panamá|Le canal de Panama|パナマ運河",
    ],
    0,
    "Canal revenue can swing sharply from year to year depending on global shipping conditions and events that disrupt traffic.|Los ingresos del canal pueden variar bruscamente de un año a otro según las condiciones del transporte marítimo mundial y los sucesos que interrumpen el tráfico.|Les revenus du canal peuvent varier fortement d'une année à l'autre selon les conditions du transport maritime mondial et les événements perturbant le trafic.|運河の収入は、世界の海運の状況や通航を乱す出来事によって、年ごとに大きく変動することがある。",
  ),
  q(
    5,
    "In roughly which decade did Egypt's population pass 100 million people?|¿En qué década aproximada superó la población de Egipto los 100 millones de personas?|Dans quelle décennie environ la population de l'Égypte a-t-elle dépassé les 100 millions d'habitants?|エジプトの人口が1億人を超えたのはおよそ何年代か?",
    [
      "The 2020s|Los años 2020|Les années 2020|2020年代",
      "The 1980s|Los años ochenta|Les années 1980|1980年代",
      "The 2100s (not yet reached)|Los años 2100 (aún no alcanzado)|Les années 2100 (pas encore atteint)|2100年代(まだ到達していない)",
    ],
    0,
    "Population growth remains a major planning concern given that almost all of it is squeezed onto the same narrow strip of habitable land along the Nile.|El crecimiento demográfico sigue siendo una gran preocupación de planificación, dado que casi toda la población se apiña en la misma franja estrecha de tierra habitable a lo largo del Nilo.|La croissance démographique reste une préoccupation majeure de planification, étant donné que la quasi-totalité se concentre sur la même étroite bande de terre habitable le long du Nil.|人口増加はいまも大きな政策課題であり続けている。その人口のほとんどが、ナイル沿いの同じ狭い居住可能地に押し込められているからである。",
  ),
  q(
    5,
    "Which ancient Greek conqueror is traditionally credited with founding the city of Alexandria in the 4th century BCE?|¿A qué conquistador griego de la Antigüedad se le atribuye tradicionalmente la fundación de la ciudad de Alejandría en el siglo IV a. C.?|Quel conquérant grec de l'Antiquité est traditionnellement crédité de la fondation de la ville d'Alexandrie au IVe siècle avant notre ère?|紀元前4世紀、アレクサンドリアの都市を築いたとされる古代ギリシャの征服者は?",
    [
      "Alexander the Great|Alejandro Magno|Alexandre le Grand|アレクサンドロス大王",
      "Julius Caesar|Julio César|Jules César|ユリウス・カエサル",
      "Pericles|Pericles|Périclès|ペリクレス",
    ],
    0,
    "The city he founded went on to become one of the largest and most important centres of learning and trade in the ancient Mediterranean world.|La ciudad que fundó llegó a convertirse en uno de los mayores y más importantes centros de saber y comercio del mundo mediterráneo antiguo.|La ville qu'il fonda devint l'un des plus grands et plus importants centres de savoir et de commerce du monde méditerranéen antique.|彼が築いたこの都市は、やがて古代地中海世界でも指折り大きく重要な学問と交易の中心地になった。",
  ),
  q(
    6,
    "Which Egyptian diplomat served as Secretary-General of the United Nations in the 1990s?|¿Qué diplomático egipcio ejerció como secretario general de las Naciones Unidas en la década de 1990?|Quel diplomate égyptien exerça la fonction de secrétaire général des Nations unies dans les années 1990?|1990年代に国連事務総長を務めたエジプトの外交官は?",
    [
      "Boutros Boutros-Ghali|Boutros Boutros-Ghali|Boutros Boutros-Ghali|ブトロス・ブトロス=ガーリ",
      "Amr Moussa|Amr Musa|Amr Moussa|アムル・ムーサ",
      "Mohamed ElBaradei|Mohamed el Baradei|Mohamed ElBaradei|モハメド・エルバラダイ",
    ],
    0,
    "He was the first Arab and first African to hold the post, serving a single term from 1992 to 1996.|Fue el primer árabe y el primer africano en ocupar el cargo, y ejerció un único mandato de 1992 a 1996.|Il fut le premier Arabe et le premier Africain à occuper ce poste, exerçant un unique mandat de 1992 à 1996.|彼はこの職に就いた初のアラブ人・初のアフリカ人で、1992年から1996年まで一期を務めた。",
  ),
  q(
    5,
    "The Great Bitter Lakes, used as a natural widening point for ships to pass each other, lie along which waterway?|Los Grandes Lagos Amargos, usados como ensanche natural para que los barcos se crucen, se hallan a lo largo de qué vía navegable?|Les Grands Lacs Amers, utilisés comme élargissement naturel permettant aux navires de se croiser, se trouvent le long de quelle voie navigable?|船どうしがすれ違うための自然の広がりとして使われる大苦湖群があるのは、どの水路沿いか?",
    [
      "The Suez Canal|El canal de Suez|Le canal de Suez|スエズ運河",
      "The Panama Canal|El canal de Panamá|Le canal de Panama|パナマ運河",
      "The Kiel Canal|El canal de Kiel|Le canal de Kiel|キール運河",
    ],
    0,
    "The lakes were dry, salt-crusted depressions before the canal was cut through them in the 1860s, flooding them with seawater for the first time in millennia.|Los lagos eran depresiones secas con costra de sal antes de que el canal se abriera a través de ellos en la década de 1860, inundándolos de agua de mar por primera vez en milenios.|Les lacs étaient des dépressions sèches, croûtées de sel, avant que le canal ne les traverse dans les années 1860, les inondant d'eau de mer pour la première fois depuis des millénaires.|この湖は、1860年代に運河が貫通するまで、乾いた塩の殻に覆われた窪地だった。運河開通によって、何千年ぶりかに海水で満たされた。",
  ),
  q(
    6,
    "Which Egyptian-born actor became an internationally famous Hollywood star, known for his role in \"Lawrence of Arabia\"?|¿Qué actor nacido en Egipto se convirtió en una estrella de Hollywood de fama internacional, conocido por su papel en «Lawrence de Arabia»?|Quel acteur né en Égypte devint une star hollywoodienne de renommée internationale, connu pour son rôle dans « Lawrence d'Arabie »?|エジプト生まれで国際的に有名なハリウッドスターとなり、『アラビアのロレンス』での役で知られる俳優は?",
    [
      "Omar Sharif|Omar Sharif|Omar Sharif|オマー・シャリフ",
      "Yul Brynner|Yul Brynner|Yul Brynner|ユル・ブリンナー",
      "Anthony Quinn|Anthony Quinn|Anthony Quinn|アンソニー・クイン",
    ],
    0,
    "Sharif had already built a career as a leading man in Egyptian cinema for a decade before his international breakthrough in 1962.|Sharif ya había construido una carrera como galán del cine egipcio durante una década antes de su gran éxito internacional en 1962.|Sharif avait déjà bâti une carrière de jeune premier dans le cinéma égyptien pendant une décennie avant sa percée internationale en 1962.|シャリフは1962年の国際的な躍進の前から、すでに10年ほどエジプト映画の主演俳優としてのキャリアを築いていた。",
  ),
  q(
    6,
    "Al-Azhar, an institution founded in Cairo in the 10th century, is considered one of the world's oldest continuously operating what?|Al-Azhar, una institución fundada en El Cairo en el siglo X, se considera una de las más antiguas del mundo en funcionamiento continuo de qué tipo?|Al-Azhar, une institution fondée au Caire au Xe siècle, est considérée comme l'une des plus anciennes au monde à fonctionner sans interruption dans quel domaine?|10世紀にカイロで創設され、世界最古級の途切れなく存続してきた機関とされるアズハルは何の機関か?",
    [
      "Degree-granting universities|Universidades que otorgan títulos|Universités délivrant des diplômes|学位を授与する大学",
      "Stock exchanges|Bolsas de valores|Bourses de valeurs|証券取引所",
      "National postal services|Servicios postales nacionales|Services postaux nationaux|郵便事業",
    ],
    0,
    "It remains a leading centre of Sunni Islamic scholarship, and its Grand Imam is regarded by many Muslims as one of the most senior religious authorities in the world.|Sigue siendo un centro puntero de estudios islámicos sunitas, y su gran imán es considerado por muchos musulmanes una de las autoridades religiosas más altas del mundo.|Elle reste un centre de premier plan de l'érudition islamique sunnite, et son grand imam est considéré par de nombreux musulmans comme l'une des plus hautes autorités religieuses au monde.|アズハルはいまもスンニ派イスラム学の一大中心地であり続けており、その大イマームは多くのムスリムから世界でも屈指の宗教的権威と見なされている。",
  ),
  q(
    4,
    "Besides wheat, which grain is also widely grown as a staple across the Nile Valley?|Además del trigo, ¿qué otro cereal se cultiva ampliamente como alimento básico en el valle del Nilo?|Outre le blé, quelle autre céréale est largement cultivée comme aliment de base dans la vallée du Nil?|小麦のほかに、ナイル渓谷で主食として広く栽培されている穀物は?",
    [
      "Maize (corn)|Maíz|Le maïs|トウモロコシ",
      "Oats|Avena|L'avoine|オート麦",
      "Quinoa|Quinoa|Quinoa|キヌア",
    ],
    0,
    "Maize is grown mainly for animal feed and a coarse bread eaten in rural areas, rather than for the export market that wheat and cotton serve.|El maíz se cultiva sobre todo para pienso animal y un pan tosco que se come en zonas rurales, más que para el mercado de exportación al que sirven el trigo y el algodón.|Le maïs est cultivé surtout pour l'alimentation animale et un pain grossier consommé en zone rurale, plutôt que pour le marché d'exportation que servent le blé et le coton.|トウモロコシは主に家畜の飼料や、農村部で食べられる粗いパンのために栽培されており、小麦や綿花が担う輸出市場向けではない。",
  ),
  q(
    5,
    "The Arab League, a regional organisation founded in 1945, is headquartered in which city?|La Liga Árabe, una organización regional fundada en 1945, tiene su sede en qué ciudad?|La Ligue arabe, une organisation régionale fondée en 1945, a son siège dans quelle ville?|1945年に設立された地域機構アラブ連盟の本部があるのは?",
    [
      "Cairo|El Cairo|Le Caire|カイロ",
      "Riyadh|Riad|Riyad|リヤド",
      "Beirut|Beirut|Beyrouth|ベイルート",
    ],
    0,
    "Egypt's membership was suspended for a decade after the 1979 peace treaty with Israel, and the headquarters briefly moved to Tunis before returning to Cairo in 1989.|La membresía de Egipto se suspendió durante una década tras el tratado de paz de 1979 con Israel, y la sede se trasladó brevemente a Túnez antes de volver a El Cairo en 1989.|L'adhésion de l'Égypte fut suspendue pendant une décennie après le traité de paix de 1979 avec Israël, et le siège déménagea brièvement à Tunis avant de revenir au Caire en 1989.|エジプトの加盟資格は1979年のイスラエルとの和平条約後、10年間停止され、本部は一時チュニスへ移ったのち、1989年にカイロへ戻った。",
  ),
  q(
    5,
    "What is the name of Egypt's national airline, founded in 1932?|¿Cómo se llama la aerolínea nacional de Egipto, fundada en 1932?|Comment s'appelle la compagnie aérienne nationale de l'Égypte, fondée en 1932?|1932年に設立された、エジプトの国営航空会社の名は?",
    [
      "EgyptAir|EgyptAir|EgyptAir|エジプト航空",
      "Emirates|Emirates|Emirates|エミレーツ航空",
      "Royal Jordanian|Royal Jordanian|Royal Jordanian|ロイヤル・ヨルダン航空",
    ],
    0,
    "It was one of the first airlines in the Middle East and Africa, and Cairo International Airport remains one of the busiest hubs on the continent.|Fue una de las primeras aerolíneas de Oriente Medio y África, y el aeropuerto internacional de El Cairo sigue siendo uno de los centros de conexión más activos del continente.|Ce fut l'une des premières compagnies aériennes du Moyen-Orient et d'Afrique, et l'aéroport international du Caire reste l'une des plaques tournantes les plus actives du continent.|中東・アフリカで最初期の航空会社の一つであり、カイロ国際空港はいまもアフリカ大陸有数の忙しいハブ空港であり続けている。",
  ),
  q(
    6,
    "In which decade did Egyptian women gain the right to vote?|¿En qué década obtuvieron las mujeres egipcias el derecho al voto?|Dans quelle décennie les femmes égyptiennes ont-elles obtenu le droit de vote?|エジプトの女性が参政権を得たのは何年代か?",
    [
      "The 1950s|Los años cincuenta|Les années 1950|1950年代",
      "The 1920s|Los años veinte|Les années 1920|1920年代",
      "The 1990s|Los años noventa|Les années 1990|1990年代",
    ],
    0,
    "The right came in the 1956 constitution, the same decade in which women first stood for and won seats in parliament.|El derecho llegó con la constitución de 1956, la misma década en que las mujeres se presentaron por primera vez a escaños parlamentarios y los ganaron.|Ce droit vint avec la constitution de 1956, la même décennie où des femmes se présentèrent pour la première fois à des sièges parlementaires et les remportèrent.|この権利は1956年の憲法で認められた。同じ10年のうちに、女性が初めて国会議席に立候補し、当選も果たした。",
  ),
  q(
    6,
    "Which Egyptian writer and physician became internationally known for feminist advocacy and campaigning against female genital mutilation from the mid-20th century onward?|¿Qué escritora y médica egipcia se hizo internacionalmente conocida por su activismo feminista y su campaña contra la mutilación genital femenina desde mediados del siglo XX en adelante?|Quelle écrivaine et médecin égyptienne devint internationalement connue pour son militantisme féministe et sa campagne contre les mutilations génitales féminines à partir du milieu du XXe siècle?|20世紀半ば以降、フェミニズムの主張と女性性器切除への反対運動で国際的に知られるようになったエジプトの作家・医師は?",
    [
      "Nawal El Saadawi|Nawal El Saadawi|Nawal El Saadawi|ナワル・エル=サアダーウィー",
      "Huda Sha'arawi|Huda Sha'arawi|Huda Chaaraoui|フダー・シャアラーウィー",
      "Doria Shafik|Doria Shafik|Doria Chafik|ドリーヤ・シャフィク",
    ],
    0,
    "Her outspoken writing led to her dismissal from a government health post, imprisonment, and years spent teaching abroad before she returned to Egypt.|Sus escritos, de tono muy directo, le costaron su destitución de un puesto sanitario gubernamental, la cárcel y años enseñando en el extranjero antes de regresar a Egipto.|Ses écrits sans détour lui valurent d'être renvoyée d'un poste gouvernemental dans la santé, emprisonnée, et de passer des années à enseigner à l'étranger avant de revenir en Égypte.|彼女の歯に衣着せぬ著作は、政府の保健職からの解任、投獄、そしてエジプトに戻る前の何年もの海外での教職という結果を招いた。",
  ),
  q(
    4,
    "Which Islamic holiday, marking the end of the month of fasting, is widely celebrated across Egypt?|¿Qué fiesta islámica, que marca el fin del mes de ayuno, se celebra ampliamente en todo Egipto?|Quelle fête musulmane, marquant la fin du mois de jeûne, est largement célébrée dans toute l'Égypte?|断食月の終わりを祝う、エジプトで広く祝われるイスラムの祝日は?",
    [
      "Eid al-Fitr|Eid al-Fitr|L'Aïd el-Fitr|イード・アル=フィトル",
      "Diwali|Diwali|Divali|ディワリ",
      "Vesak|Vesak|Vesak|ウェーサク",
    ],
    0,
    "Families mark the holiday with new clothes, sweets and visits, and streets that were quiet through Ramadan evenings fill again with celebration.|Las familias celebran la fiesta con ropa nueva, dulces y visitas, y las calles que estaban tranquilas en las noches del Ramadán vuelven a llenarse de festejo.|Les familles marquent la fête par des vêtements neufs, des sucreries et des visites, et les rues restées calmes pendant les soirées du ramadan se remplissent à nouveau de festivités.|家族は新しい服や菓子、親戚回りでこの祝日を祝い、ラマダーンの夜には静かだった通りが再び祝祭でにぎわう。",
  ),
  q(
    4,
    "Which Islamic holiday, involving the ritual sacrifice of an animal and sharing the meat with those in need, is also widely observed in Egypt?|¿Qué fiesta islámica, que implica el sacrificio ritual de un animal y compartir la carne con los necesitados, también se celebra ampliamente en Egipto?|Quelle fête musulmane, impliquant le sacrifice rituel d'un animal et le partage de la viande avec les nécessiteux, est également largement observée en Égypte?|動物を犠牲として捧げ、その肉を困窮者と分かち合う、エジプトでも広く祝われるイスラムの祝日は?",
    [
      "Eid al-Adha|Eid al-Adha|L'Aïd el-Kébir|イード・アル=アドハー",
      "Hanukkah|Janucá|Hanoucca|ハヌカー",
      "Nowruz|Nowruz|Norouz|ノウルーズ",
    ],
    0,
    "Streets near livestock markets grow busy in the days before the holiday, and it is common to see a portion of the meat set aside for neighbours and charity.|Las calles cerca de los mercados de ganado se animan en los días previos a la fiesta, y es habitual ver que se aparta una parte de la carne para vecinos y obras de caridad.|Les rues proches des marchés au bétail s'animent dans les jours précédant la fête, et il est courant de voir une part de la viande mise de côté pour les voisins et la charité.|祝日の数日前になると家畜市場の近くの通りは活気づき、肉の一部を近所や慈善に取り分けるのがよく見られる。",
  ),
  q(
    6,
    "The Great Sphinx at Giza is generally depicted with the body of a lion and the head of what?|La Gran Esfinge de Guiza se representa generalmente con cuerpo de león y cabeza de qué?|Le Grand Sphinx de Gizeh est généralement représenté avec un corps de lion et une tête de quoi?|ギザの大スフィンクスは一般に、ライオンの体と何の頭を組み合わせた姿で表されるか?",
    [
      "A human|Un humano|Un humain|人間",
      "A falcon|Un halcón|Un faucon|ハヤブサ",
      "A crocodile|Un cocodrilo|Un crocodile|ワニ",
    ],
    0,
    "It is carved from a single piece of limestone bedrock and is among the largest monolithic statues in the world.|Está tallada en un único bloque de roca caliza y es una de las estatuas monolíticas más grandes del mundo.|Il est taillé dans un seul bloc de roche calcaire et compte parmi les plus grandes statues monolithiques du monde.|石灰岩の岩盤を一枚のまま彫り出したもので、世界でも指折り大きな一枚岩の彫像の一つである。",
  ),
  q(
    7,
    "The reservoir behind the Aswan High Dam is called Lake Nasser on the Egyptian side. What is its Sudanese portion, further south, officially called instead?|El embalse tras la Presa Alta de Asuán se llama lago Nasser en el lado egipcio. ¿Cómo se llama oficialmente, en cambio, su parte sudanesa, más al sur?|Le réservoir derrière le haut barrage d'Assouan s'appelle lac Nasser côté égyptien. Comment sa partie soudanaise, plus au sud, est-elle officiellement appelée à la place?|アスワン・ハイダムの背後の貯水池は、エジプト側ではナセル湖と呼ばれる。より南にあるスーダン側の部分は、公式には代わりに何と呼ばれるか?",
    [
      "Lake Nubia|Lago Nubia|Lac Nubia|ヌビア湖",
      "Lake Tana|Lago Tana|Lac Tana|タナ湖",
      "Lake Victoria|Lago Victoria|Lac Victoria|ヴィクトリア湖",
    ],
    0,
    "The two names mark the same body of water on either side of a border that itself became a source of dispute once the lake submerged the old boundary markers.|Los dos nombres marcan la misma masa de agua a ambos lados de una frontera que se convirtió en motivo de disputa una vez que el lago sumergió los antiguos hitos fronterizos.|Les deux noms désignent la même étendue d'eau de part et d'autre d'une frontière devenue elle-même source de litige une fois que le lac eut submergé les anciennes bornes frontières.|この二つの名は同じ一つの水域を指すが、湖が古い境界標を水没させたことで、その国境線そのものが係争の種にもなった。",
  ),
  q(
    5,
    "Which city is home to Cairo's main rival football club Zamalek, the team's own stadium and fan base being centred there?|¿En qué ciudad tiene su base el club rival del Cairo, el Zamalek, con su propio estadio y afición centrados allí?|Dans quelle ville le club rival du Caire, le Zamalek, avec son propre stade et sa base de supporters, est-il enraciné?|カイロのライバルクラブ、ザマレクの本拠地であり、そのスタジアムとサポーターの中心があるのは?",
    [
      "Cairo (the Zamalek district)|El Cairo (el distrito de Zamalek)|Le Caire (le quartier de Zamalek)|カイロ(ザマレク地区)",
      "Alexandria|Alejandría|Alexandrie|アレクサンドリア",
      "Luxor|Luxor|Louxor|ルクソール",
    ],
    0,
    "Zamalek and Al Ahly, both based in Cairo, have one of the fiercest club rivalries in African football, dating back almost a century.|El Zamalek y el Al Ahly, ambos con base en El Cairo, protagonizan una de las rivalidades de clubes más intensas del fútbol africano, con casi un siglo de historia.|Le Zamalek et l'Al Ahly, tous deux basés au Caire, entretiennent l'une des rivalités de clubs les plus intenses du football africain, vieille de près d'un siècle.|ザマレクとアル・アハリはともにカイロを本拠とし、アフリカサッカーでも屈指の激しいクラブライバル関係を1世紀近くにわたって築いてきた。",
  ),
  q(
    5,
    "Which popular fried patty, made mainly from mashed fava beans and herbs, is considered an Egyptian original of a dish now eaten across the Middle East?|¿Qué popular buñuelo frito, hecho principalmente de habas machacadas y hierbas, se considera el original egipcio de un plato que hoy se come en todo Oriente Medio?|Quelle célèbre galette frite, faite principalement de fèves écrasées et d'herbes, est considérée comme l'originale égyptienne d'un plat aujourd'hui mangé dans tout le Moyen-Orient?|主にすりつぶしたそら豆とハーブから作られる人気の揚げ団子で、いまや中東各地で食べられている料理のエジプト版とされるものは?",
    [
      "Ta'meya (Egyptian falafel)|Ta'meya (falafel egipcio)|Ta'meya (falafel égyptien)|ターメイヤ(エジプト風ファラフェル)",
      "Shawarma|Shawarma|Chawarma|シャワルマ",
      "Kibbeh|Kibbeh|Kebbé|キッベ",
    ],
    0,
    "Elsewhere in the region falafel is usually made from chickpeas, but the Egyptian original uses fava beans, giving it a greener colour inside.|En otras partes de la región, el falafel suele hacerse con garbanzos, pero el original egipcio usa habas, lo que le da un color más verde por dentro.|Ailleurs dans la région, le falafel est généralement fait de pois chiches, mais l'original égyptien utilise des fèves, ce qui lui donne une couleur plus verte à l'intérieur.|この地域の他の場所ではファラフェルは通常ひよこ豆で作られるが、エジプトの元祖はそら豆を使うため、中身がより緑がかった色になる。",
  ),
  q(
    6,
    "Which 19th-century ruler of Egypt is credited with beginning a major modernisation drive and founding Cairo's European-style downtown district?|¿Qué gobernante egipcio del siglo XIX se atribuye el inicio de un gran impulso modernizador y la fundación del centro de El Cairo de estilo europeo?|Quel dirigeant égyptien du XIXe siècle est crédité d'avoir lancé un grand mouvement de modernisation et fondé le centre-ville du Caire de style européen?|大規模な近代化を始め、カイロのヨーロッパ風の中心市街地を築いたとされる19世紀のエジプトの統治者は?",
    [
      "Khedive Ismail|El jedive Ismail|Le khédive Ismaïl|ヘディーヴ・イスマーイール",
      "Muhammad Ali|Muhammad Ali|Muhammad Ali|ムハンマド・アリー",
      "Farouk|Faruk|Farouk|ファールーク",
    ],
    0,
    "Ismail famously wanted to make Cairo \"a piece of Europe\", commissioning wide boulevards and grand buildings inspired by his visits to Paris.|Ismail quería, según su famosa frase, hacer de El Cairo «un pedazo de Europa», encargando amplios bulevares y grandes edificios inspirados en sus visitas a París.|Ismaïl voulait, selon sa formule célèbre, faire du Caire « un morceau d'Europe », commandant de larges boulevards et de grands bâtiments inspirés de ses visites à Paris.|イスマーイールは有名な言葉で「カイロをヨーロッパの一部にしたい」と語り、パリ訪問に着想を得た広い大通りと壮麗な建物を作らせた。",
  ),
  q(
    5,
    "What is the traditional lantern, lit and carried by children especially during Ramadan evenings, called in Egypt?|¿Cómo se llama en Egipto el farolillo tradicional que encienden y llevan los niños, especialmente durante las noches de Ramadán?|Comment s'appelle en Égypte la lanterne traditionnelle, allumée et portée par les enfants, en particulier pendant les soirées du ramadan?|とくにラマダーンの夜、子どもたちが灯して持ち歩く伝統的な提灯を、エジプトでは何と呼ぶか?",
    [
      "Fanous|Fanús|Fanous|ファヌース",
      "Lampion|Farolillo|Lampion|ランピオン",
      "Menorah|Menorá|Menorah|メノーラー",
    ],
    0,
    "Modern fanous are often battery-powered and play tinny electronic tunes, a change from the candle-lit tin lanterns of earlier generations.|Los fanous modernos suelen funcionar con pilas y reproducen melodías electrónicas metálicas, un cambio respecto a los farolillos de hojalata iluminados con vela de generaciones anteriores.|Les fanous modernes fonctionnent souvent à piles et jouent des mélodies électroniques grêles, un changement par rapport aux lanternes en fer-blanc éclairées à la bougie des générations précédentes.|現代のファヌースは電池式で、金属質な電子音のメロディーを鳴らすものが多く、以前の世代のろうそくを灯すブリキの提灯とは様変わりしている。",
  ),
  q(
    5,
    "Which Egyptian actress and singer, active from the 1950s onward, was known as much for her glamorous screen presence as for her voice, and was nicknamed \"Cinderella\" of Egyptian cinema?|¿Qué actriz y cantante egipcia, activa desde los años cincuenta, fue conocida tanto por su glamurosa presencia en pantalla como por su voz, apodada la «Cenicienta» del cine egipcio?|Quelle actrice et chanteuse égyptienne, active à partir des années 1950, fut connue autant pour sa présence glamour à l'écran que pour sa voix, surnommée la « Cendrillon » du cinéma égyptien?|1950年代から活躍し、その声だけでなく華やかなスクリーンでの存在感でも知られ、エジプト映画の「シンデレラ」と呼ばれた女優・歌手は?",
    [
      "Soad Hosny|Soad Hosny|Souad Hosni|スアード・ホスニー",
      "Umm Kulthum|Umm Kulzum|Oum Kalthoum|ウンム・クルスーム",
      "Shadia|Shadia|Shadia|シャーディア",
    ],
    0,
    "She starred in dozens of films across three decades and remains a defining icon of Egyptian cinema's mid-century golden age.|Protagonizó decenas de películas a lo largo de tres décadas y sigue siendo un icono definitorio de la edad de oro del cine egipcio de mediados de siglo.|Elle joua dans des dizaines de films sur trois décennies et reste une icône majeure de l'âge d'or du cinéma égyptien du milieu du siècle.|彼女は三十年にわたり何十本もの映画に主演し、いまもエジプト映画の20世紀半ばの黄金時代を象徴する存在であり続けている。",
  ),
  q(
    6,
    "Which two Nile Delta cities does the Cairo–Alexandria desert road, a major modern highway distinct from the older agricultural road, mainly connect?|¿Qué dos ciudades conecta principalmente la carretera del desierto Cairo-Alejandría, una importante autopista moderna distinta de la antigua carretera agrícola?|Quelles deux villes la route du désert Le Caire-Alexandrie, une grande autoroute moderne distincte de l'ancienne route agricole, relie-t-elle principalement?|旧来の農業地帯を通る道路とは別の、現代の主要な幹線道路であるカイロ―アレクサンドリア砂漠道路が主に結ぶ二つの都市は?",
    [
      "Cairo and Alexandria|El Cairo y Alejandría|Le Caire et Alexandrie|カイロとアレクサンドリア",
      "Luxor and Aswan|Luxor y Asuán|Louxor et Assouan|ルクソールとアスワン",
      "Suez and Ismailia|Suez e Ismailía|Suez et Ismaïlia|スエズとイスマイリア",
    ],
    0,
    "Built through open desert rather than following the Delta's farmland, the road cut travel time between Egypt's two largest cities significantly when it opened.|Construida a través de desierto abierto en lugar de seguir las tierras de cultivo del delta, la carretera redujo notablemente el tiempo de viaje entre las dos mayores ciudades de Egipto cuando se inauguró.|Construite à travers le désert ouvert plutôt qu'en suivant les terres agricoles du delta, la route réduisit nettement le temps de trajet entre les deux plus grandes villes d'Égypte à son ouverture.|デルタの農地をたどるのではなく開けた砂漠を貫いて建設されたこの道路は、開通時、エジプトの二大都市間の所要時間を大きく縮めた。",
  ),
  q(
    5,
    "Which sport, involving choreographed routines to music, has Egypt's national team won multiple world and Olympic medals in, especially in the men's and mixed events?|¿En qué deporte, con rutinas coreografiadas al ritmo de la música, ha ganado la selección nacional de Egipto varias medallas mundiales y olímpicas, especialmente en las pruebas masculinas y mixtas?|Dans quel sport, impliquant des chorégraphies en musique, l'équipe nationale égyptienne a-t-elle remporté plusieurs médailles mondiales et olympiques, notamment en épreuves masculines et mixtes?|音楽に合わせた振り付けの演技を伴い、エジプト代表が男子・混合種目を中心に複数の世界・オリンピックメダルを獲得している競技は?",
    [
      "Modern pentathlon|Pentatlón moderno|Le pentathlon moderne|近代五種",
      "Figure skating|Patinaje artístico|Le patinage artistique|フィギュアスケート",
      "Synchronized swimming|Natación artística|La natation artistique|アーティスティックスイミング",
    ],
    0,
    "Egypt has a long modern pentathlon tradition, and the sport's fencing, swimming, riding, shooting and running combination has produced Olympic medallists across several generations.|Egipto tiene una larga tradición en pentatlón moderno, y la combinación de esgrima, natación, equitación, tiro y carrera del deporte ha producido medallistas olímpicos a lo largo de varias generaciones.|L'Égypte a une longue tradition de pentathlon moderne, et la combinaison escrime, natation, équitation, tir et course de ce sport a produit des médaillés olympiques sur plusieurs générations.|エジプトには近代五種の長い伝統があり、フェンシング・水泳・馬術・射撃・走を組み合わせたこの競技は、何世代にもわたりオリンピックメダリストを輩出してきた。",
  ),
  q(
    6,
    "What is the name of the annual, mostly land-based migratory bird spectacle over the Suez region, where huge numbers of storks and raptors funnel between Europe, Asia and Africa?|¿Cómo se llama el espectáculo anual de aves migratorias, sobre todo terrestres, en la región de Suez, donde enormes cantidades de cigüeñas y rapaces se concentran entre Europa, Asia y África?|Comment appelle-t-on le spectacle annuel de migration d'oiseaux, surtout terrestres, au-dessus de la région de Suez, où d'énormes quantités de cigognes et de rapaces se concentrent entre l'Europe, l'Asie et l'Afrique?|ヨーロッパ・アジア・アフリカのあいだで、コウノトリや猛禽類が大量に集まって渡っていく、スエズ地域上空の年に一度の渡り鳥の壮観を何と呼ぶか?",
    [
      "The Suez migration bottleneck (a major flyway)|El cuello de botella migratorio de Suez (una importante ruta de vuelo)|Le goulet migratoire de Suez (une voie de migration majeure)|スエズの渡りの隘路(主要な渡りルート)",
      "The Nile jubilee|El jubileo del Nilo|Le jubilé du Nil|ナイルの祝祭",
      "The desert regatta|La regata del desierto|La régate du désert|砂漠のレガッタ",
    ],
    0,
    "Because these soaring birds avoid long stretches of open water, the narrow land bridge at Suez funnels an enormous share of the Europe–Africa migratory traffic each spring and autumn.|Como estas aves planeadoras evitan largos tramos de mar abierto, el estrecho puente de tierra de Suez concentra cada primavera y otoño una enorme proporción del tráfico migratorio entre Europa y África.|Comme ces oiseaux planeurs évitent les longues étendues d'eau libre, l'étroit pont terrestre de Suez concentre chaque printemps et automne une énorme part du trafic migratoire entre l'Europe et l'Afrique.|滑翔性の鳥は長い海上を避けるため、スエズの細い陸橋は毎年春と秋、ヨーロッパとアフリカを行き来する渡りの膨大な部分を集中させることになる。",
  ),

  // ==================== 難易度7〜8(20問) ====================
  q(
    7,
    "In 1981, President Anwar Sadat was assassinated in Cairo while attending what kind of public event?|En 1981, el presidente Anuar el Sadat fue asesinado en El Cairo mientras asistía a qué tipo de acto público?|En 1981, le président Anouar el-Sadate fut assassiné au Caire alors qu'il assistait à quel type d'événement public?|1981年、アンワル・サダト大統領がカイロで暗殺されたのは、どのような公の行事に出席していたときか?",
    [
      "A military parade|Un desfile militar|Un défilé militaire|軍事パレード",
      "A football match|Un partido de fútbol|Un match de football|サッカーの試合",
      "A university graduation|Una graduación universitaria|Une remise de diplômes universitaire|大学の卒業式",
    ],
    0,
    "The attack came during the annual parade marking the 1973 war, carried out by soldiers who broke ranks and opened fire on the reviewing stand.|El ataque ocurrió durante el desfile anual que conmemora la guerra de 1973, perpetrado por soldados que rompieron filas y abrieron fuego contra la tribuna de autoridades.|L'attaque eut lieu pendant le défilé annuel commémorant la guerre de 1973, menée par des soldats qui rompirent les rangs et ouvrirent le feu sur la tribune officielle.|この襲撃は、1973年の戦争を記念する毎年恒例のパレードの最中に起きた。隊列を離れた兵士たちが観閲台に向けて発砲した。",
  ),
  q(
    7,
    "Which narrow strait, at the southern tip of the Sinai Peninsula, connects the Gulf of Aqaba to the rest of the Red Sea?|¿Qué estrecho angosto, en la punta sur de la península del Sinaí, conecta el golfo de Áqaba con el resto del mar Rojo?|Quel détroit étroit, à la pointe sud de la péninsule du Sinaï, relie le golfe d'Aqaba au reste de la mer Rouge?|シナイ半島南端にあり、アカバ湾を紅海の他の部分とつなぐ狭い海峡は?",
    [
      "The Strait of Tiran|El estrecho de Tirán|Le détroit de Tiran|チラン海峡",
      "The Strait of Hormuz|El estrecho de Ormuz|Le détroit d'Ormuz|ホルムズ海峡",
      "The Bosphorus|El Bósforo|Le Bosphore|ボスポラス海峡",
    ],
    0,
    "Control of this strait was central to several 20th-century crises, since blocking it could cut off Israel's only Red Sea port at Eilat.|El control de este estrecho fue clave en varias crisis del siglo XX, ya que bloquearlo podía aislar el único puerto israelí en el mar Rojo, Eilat.|Le contrôle de ce détroit fut central dans plusieurs crises du XXe siècle, le bloquer pouvant couper le seul port israélien de la mer Rouge, à Eilat.|この海峡の支配権は20世紀の複数の危機で中心的な争点となった。封鎖すれば、イスラエルの紅海側で唯一の港エイラトを孤立させられたからである。",
  ),
  q(
    8,
    "Egypt's system of government is most precisely classified as what kind of republic, combining an elected president with a prime minister and cabinet?|El sistema de gobierno de Egipto se clasifica con mayor precisión como qué tipo de república, que combina un presidente electo con un primer ministro y un gabinete?|Le système de gouvernement égyptien est-il classé le plus précisément comme quel type de république, combinant un président élu avec un Premier ministre et un cabinet?|選挙で選ばれる大統領と首相・内閣を組み合わせたエジプトの統治制度は、最も正確にはどの種類の共和制に分類されるか?",
    [
      "A semi-presidential republic|Una república semipresidencial|Une république semi-présidentielle|半大統領制共和国",
      "A constitutional monarchy|Una monarquía constitucional|Une monarchie constitutionnelle|立憲君主国",
      "A parliamentary confederation|Una confederación parlamentaria|Une confédération parlementaire|議院内閣制の連合国家",
    ],
    0,
    "In practice, the presidency has held the dominant share of executive power for most of the period since the 1952 revolution, regardless of the formal constitutional label.|En la práctica, la presidencia ha concentrado la mayor parte del poder ejecutivo durante la mayor parte del periodo desde la revolución de 1952, más allá de la etiqueta constitucional formal.|Dans la pratique, la présidence a concentré l'essentiel du pouvoir exécutif pendant la majeure partie de la période depuis la révolution de 1952, indépendamment de l'étiquette constitutionnelle formelle.|実際には、憲法上の正式な分類にかかわらず、1952年革命以降の大半の期間、行政権の大部分は大統領職に集中してきた。",
  ),
  q(
    7,
    "Founded in Cairo in 1875, which Arabic-language newspaper is one of the oldest still published today and long served as Egypt's paper of record?|Fundado en El Cairo en 1875, ¿qué periódico en árabe es uno de los más antiguos que aún se publican y ha sido durante mucho tiempo el diario de referencia de Egipto?|Fondé au Caire en 1875, quel journal de langue arabe est l'un des plus anciens encore publiés aujourd'hui et a longtemps servi de journal de référence de l'Égypte?|1875年にカイロで創刊され、いまも発行が続く最古級のアラビア語新聞で、長らくエジプトの記録紙とされてきたのは?",
    [
      "Al-Ahram|Al-Ahram|Al-Ahram|アル=アハラム",
      "Al-Jazeera|Al Jazeera|Al Jazeera|アルジャジーラ",
      "Asharq Al-Awsat|Asharq Al-Awsat|Asharq Al-Awsat|アッシャルク・アル=アウサト",
    ],
    0,
    "Its name means \"The Pyramids\", and for much of the 20th century it was effectively the state's official mouthpiece on major policy matters.|Su nombre significa «Las Pirámides», y durante gran parte del siglo XX fue en la práctica el portavoz oficial del Estado en asuntos de política importantes.|Son nom signifie « Les Pyramides », et pendant une bonne partie du XXe siècle, il fut en pratique le porte-voix officiel de l'État sur les grandes questions politiques.|その名は「ピラミッド群」を意味し、20世紀の大半を通じて、実質的に国家の主要政策の公式な発言の場となっていた。",
  ),
  q(
    8,
    "Egypt was a founding participant in which movement of countries that declared themselves aligned with neither side of the Cold War, associated with the 1955 Bandung Conference?|Egipto fue participante fundador de qué movimiento de países que se declararon no alineados con ningún bando de la Guerra Fría, asociado con la Conferencia de Bandung de 1955?|L'Égypte fut un participant fondateur de quel mouvement de pays se déclarant non alignés sur aucun camp de la guerre froide, associé à la conférence de Bandung de 1955?|冷戦のどちらの陣営にも与しないと宣言した国々による、1955年のバンドン会議に連なる運動にエジプトは創設時から参加していたが、その運動の名は?",
    [
      "The Non-Aligned Movement|El Movimiento de Países No Alineados|Le Mouvement des non-alignés|非同盟運動",
      "The Warsaw Pact|El Pacto de Varsovia|Le Pacte de Varsovie|ワルシャワ条約機構",
      "The Commonwealth of Nations|La Mancomunidad de Naciones|Le Commonwealth des nations|英連邦",
    ],
    0,
    "Nasser, alongside leaders such as Nehru of India and Tito of Yugoslavia, helped formalise the movement at a 1961 conference in Belgrade.|Nasser, junto a líderes como Nehru de India y Tito de Yugoslavia, ayudó a formalizar el movimiento en una conferencia de 1961 en Belgrado.|Nasser, aux côtés de dirigeants comme Nehru en Inde et Tito en Yougoslavie, contribua à formaliser le mouvement lors d'une conférence tenue à Belgrade en 1961.|ナーセルは、インドのネルーやユーゴスラビアのティトーといった指導者とともに、1961年のベオグラード会議でこの運動を正式に形づくる一助となった。",
  ),
  q(
    7,
    "Egypt has hosted the Africa Cup of Nations football tournament more times than any other country. How many times, as of the mid-2020s?|Egipto ha sido anfitrión de la Copa Africana de Naciones de fútbol más veces que cualquier otro país. ¿Cuántas veces, hasta mediados de la década de 2020?|L'Égypte a accueilli la Coupe d'Afrique des nations de football plus de fois que tout autre pays. Combien de fois, à la moitié des années 2020?|エジプトはアフリカネイションズカップを他のどの国よりも多く開催してきた。2020年代半ば時点で何回か?",
    [
      "Five times|Cinco veces|Cinq fois|5回",
      "Two times|Dos veces|Deux fois|2回",
      "Nine times|Nueve veces|Neuf fois|9回",
    ],
    0,
    "Egypt hosted the tournament in 1959, 1974, 1986, 2006 and 2019, and has also won it a record number of times as a competing team.|Egipto fue anfitrión del torneo en 1959, 1974, 1986, 2006 y 2019, y también lo ha ganado un número récord de veces como equipo participante.|L'Égypte a accueilli le tournoi en 1959, 1974, 1986, 2006 et 2019, et l'a aussi remporté un nombre record de fois en tant qu'équipe participante.|エジプトは1959年・1974年・1986年・2006年・2019年にこの大会を開催しており、出場国としても記録的な優勝回数を誇る。",
  ),
  q(
    6,
    "In November 2022, Egypt hosted a major United Nations climate change conference in which Red Sea resort town?|En noviembre de 2022, Egipto acogió una importante conferencia de la ONU sobre el cambio climático en qué localidad turística del mar Rojo?|En novembre 2022, l'Égypte a accueilli une grande conférence de l'ONU sur le changement climatique dans quelle station balnéaire de la mer Rouge?|2022年11月、エジプトが国連気候変動会議を開催した紅海のリゾート地は?",
    [
      "Sharm el-Sheikh|Sharm el-Sheij|Charm el-Cheikh|シャルム・エル・シェイク",
      "Hurghada|Hurgada|Hurghada|フルガダ",
      "Dahab|Dahab|Dahab|ダハブ",
    ],
    0,
    "COP27 drew tens of thousands of delegates and produced a landmark agreement on a fund to help vulnerable countries cope with climate-related losses and damage.|La COP27 atrajo a decenas de miles de delegados y produjo un acuerdo histórico sobre un fondo para ayudar a los países vulnerables a hacer frente a las pérdidas y daños relacionados con el clima.|La COP27 attira des dizaines de milliers de délégués et déboucha sur un accord historique sur un fonds destiné à aider les pays vulnérables à faire face aux pertes et dommages liés au climat.|COP27には数万人の代表団が集まり、気候変動による損失と被害への対応を支援する基金についての画期的な合意が生まれた。",
  ),
  q(
    8,
    "What is the common name for the subsidised, fixed-price flatbread programme that keeps a basic loaf affordable for most Egyptian households, a policy considered politically untouchable for decades?|¿Cuál es el nombre común del programa de pan plano subvencionado y de precio fijo que mantiene una hogaza básica asequible para la mayoría de los hogares egipcios, una política considerada intocable políticamente durante décadas?|Quel est le nom courant du programme de pain plat subventionné à prix fixe qui rend une miche de base abordable pour la plupart des foyers égyptiens, une politique considérée intouchable politiquement depuis des décennies?|大半のエジプトの家庭に基本的な一斤を手ごろな価格で保ち、何十年も政治的に手をつけられない政策とされてきた、補助金つきの固定価格の平たいパンの制度は一般に何と呼ばれるか?",
    [
      "The baladi bread subsidy|El subsidio del pan baladi|La subvention du pain baladi|バラディー・パン補助金制度",
      "The green revolution|La revolución verde|La révolution verte|緑の革命",
      "The ration book system, unrelated to bread specifically|El sistema de cartilla de racionamiento, sin relación específica con el pan|Le système de carnet de rationnement, sans lien spécifique avec le pain|パンとは無関係の配給手帳制度",
    ],
    0,
    "Attempts to cut or reform the subsidy have repeatedly triggered unrest, most notably bread riots in 1977 that forced the government to reverse a planned price rise within days.|Los intentos de recortar o reformar el subsidio han provocado repetidos disturbios, sobre todo los motines del pan de 1977, que obligaron al gobierno a revertir en cuestión de días una subida de precio prevista.|Les tentatives de réduire ou réformer la subvention ont provoqué à plusieurs reprises des troubles, notamment les émeutes du pain de 1977, qui contraignirent le gouvernement à annuler en quelques jours une hausse de prix prévue.|この補助金を削減・改革しようとする試みは繰り返し騒乱を招いてきた。とりわけ1977年の「パン暴動」では、予定されていた値上げを政府が数日のうちに撤回せざるを得なくなった。",
  ),
  q(
    6,
    "Which famous temple complex was cut into large blocks and reassembled on higher ground in a UNESCO-led rescue operation from 1964 to 1968, ahead of the Aswan High Dam's floodwaters?|¿Qué famoso complejo de templos fue cortado en grandes bloques y reconstruido en terreno más alto en una operación de rescate liderada por la UNESCO entre 1964 y 1968, antes de las aguas de la Presa Alta de Asuán?|Quel célèbre complexe de temples fut découpé en gros blocs et reconstruit sur un terrain plus élevé lors d'une opération de sauvetage menée par l'UNESCO de 1964 à 1968, avant les eaux du haut barrage d'Assouan?|1964年から1968年にかけ、アスワン・ハイダムの水に沈む前にユネスコ主導の救済作業で大きなブロックに切り分けられ、より高い場所に組み直された有名な神殿群は?",
    [
      "Abu Simbel|Abu Simbel|Abou Simbel|アブ・シンベル",
      "Karnak|Karnak|Karnak|カルナック",
      "Philae, which was not relocated for this project|Philae, que no fue reubicado para este proyecto|Philæ, qui ne fut pas déplacé pour ce projet|フィラエ(この事業では移設されていない)",
    ],
    0,
    "The temples were sliced into more than a thousand numbered blocks, each weighing up to 30 tonnes, and reassembled 65 metres higher and 200 metres back from the original site.|Los templos se cortaron en más de mil bloques numerados, cada uno de hasta 30 toneladas, y se reconstruyeron 65 metros más arriba y 200 metros más atrás del emplazamiento original.|Les temples furent découpés en plus de mille blocs numérotés, chacun pesant jusqu'à 30 tonnes, et remontés 65 mètres plus haut et 200 mètres en retrait du site d'origine.|神殿群は1000個を超える番号付きのブロックに切り分けられ、それぞれ最大30トンの重さがあった。もとの場所から65メートル高く、200メートル後退した位置に組み直された。",
  ),
  q(
    7,
    "Roughly what share of global maritime trade, by volume, is commonly estimated to pass through the Suez Canal each year?|¿Qué proporción aproximada del comercio marítimo mundial, en volumen, se estima habitualmente que pasa por el canal de Suez cada año?|Quelle part environ du commerce maritime mondial, en volume, est-elle généralement estimée transiter par le canal de Suez chaque année?|世界の海上貿易のうち、量にしておよそどれくらいの割合が毎年スエズ運河を通ると一般に見積もられているか?",
    [
      "Roughly one in ten|Aproximadamente uno de cada diez|Environ un dixième|およそ10分の1",
      "Roughly one in a thousand|Aproximadamente uno de cada mil|Environ un millième|およそ1000分の1",
      "Roughly nine in ten|Aproximadamente nueve de cada diez|Environ neuf dixièmes|およそ10分の9",
    ],
    0,
    "Estimates vary by year and by whether trade is measured in tonnage, value or number of vessels, but figures around ten percent are the most commonly cited.|Las estimaciones varían según el año y según si el comercio se mide en tonelaje, valor o número de buques, pero las cifras en torno al diez por ciento son las más citadas.|Les estimations varient selon l'année et selon que le commerce est mesuré en tonnage, en valeur ou en nombre de navires, mais des chiffres autour de dix pour cent sont les plus couramment cités.|推計は年によって、また貿易量をトン数・金額・船の隻数のどれで測るかによって変わるが、およそ10%前後という数字が最もよく引用される。",
  ),
  q(
    8,
    "Which mass protest movement forced the removal of President Mohamed Morsi in July 2013, after just one year in office?|¿Qué movimiento de protesta masiva forzó la destitución del presidente Mohamed Morsi en julio de 2013, tras solo un año en el cargo?|Quel mouvement de protestation de masse força le départ du président Mohamed Morsi en juillet 2013, après seulement un an au pouvoir?|就任からわずか1年後の2013年7月、モハメド・モルシ大統領の退陣を強いた大規模な抗議運動は何と呼ばれるか?",
    [
      "The Tamarod (\"Rebellion\") movement, backed by a military intervention|El movimiento Tamarod («Rebelión»), respaldado por una intervención militar|Le mouvement Tamarod (« Rébellion »), soutenu par une intervention militaire|軍の介入に支えられたタマッルド(「反逆」)運動",
      "The Green Movement|El Movimiento Verde|Le Mouvement vert|グリーン運動",
      "The Cedar Revolution|La Revolución de los Cedros|La révolution du Cèdre|杉の革命",
    ],
    0,
    "The military, led by then-defence minister Abdel Fattah el-Sisi, removed Morsi after days of mass demonstrations against his government; el-Sisi was elected president the following year.|El ejército, encabezado por el entonces ministro de Defensa Abdelfatah al Sisi, destituyó a Morsi tras días de manifestaciones masivas contra su gobierno; al Sisi fue elegido presidente al año siguiente.|L'armée, dirigée par le ministre de la Défense de l'époque Abdel Fattah al-Sissi, destitua Morsi après des jours de manifestations de masse contre son gouvernement; al-Sissi fut élu président l'année suivante.|当時の国防相アブドルファッターフ・エル=シーシーが率いる軍は、政権に対する大規模なデモが続いた末にモルシを退陣させた。エル=シーシーは翌年、大統領に選出された。",
  ),
  q(
    7,
    "The Coptic Orthodox Church's leader in Egypt holds the historic title \"Pope of Alexandria and Patriarch of All\" which continent?|El líder de la Iglesia ortodoxa copta en Egipto ostenta el título histórico de «papa de Alejandría y patriarca de toda» qué continente?|Le chef de l'Église orthodoxe copte en Égypte porte le titre historique de « pape d'Alexandrie et patriarche de toute » quel continent?|エジプトのコプト正教会の首長が持つ歴史的な称号「アレクサンドリアの教皇にして全○○の総主教」の○○にあたる大陸は?",
    [
      "Africa|África|L'Afrique|アフリカ",
      "Asia|Asia|L'Asie|アジア",
      "Europe|Europa|L'Europe|ヨーロッパ",
    ],
    0,
    "The title traces its claim of apostolic succession back to Saint Mark the Evangelist, traditionally said to have founded the church in Alexandria in the 1st century.|El título remonta su reivindicación de sucesión apostólica hasta san Marcos evangelista, quien según la tradición fundó la iglesia en Alejandría en el siglo I.|Ce titre fait remonter sa revendication de succession apostolique à saint Marc l'Évangéliste, traditionnellement dit avoir fondé l'Église à Alexandrie au Ier siècle.|この称号は、1世紀にアレクサンドリアで教会を開いたと伝えられる福音記者聖マルコにまで遡る、使徒継承の主張に基づいている。",
  ),
  q(
    8,
    "The 1888 Convention of Constantinople established which principle regarding the Suez Canal, one still cited in disputes over the waterway today?|¿Qué principio relativo al canal de Suez estableció la Convención de Constantinopla de 1888, aún citado hoy en disputas sobre la vía navegable?|Quel principe concernant le canal de Suez la convention de Constantinople de 1888 a-t-elle établi, encore invoqué aujourd'hui dans les différends sur cette voie d'eau?|1888年のコンスタンティノープル条約がスエズ運河について定め、いまも運河をめぐる紛争で引用される原則とは?",
    [
      "Free passage for ships of all nations, even in wartime|El paso libre para buques de todas las naciones, incluso en tiempos de guerra|Le libre passage pour les navires de toutes les nations, même en temps de guerre|戦時であってもすべての国の船に自由な通航を認める",
      "Exclusive use of the canal by Egyptian-flagged vessels only|El uso exclusivo del canal solo por buques de bandera egipcia|L'usage exclusif du canal aux seuls navires battant pavillon égyptien|運河をエジプト船籍の船に限って使用させる",
      "A permanent ban on oil tankers passing through the canal|Una prohibición permanente del paso de petroleros por el canal|Une interdiction permanente pour les pétroliers de traverser le canal|石油タンカーの運河通航を恒久的に禁じる",
    ],
    0,
    "The principle was tested and reaffirmed after the 1956 crisis, and it remains the legal basis for the canal's neutral, open status today.|El principio se puso a prueba y se reafirmó tras la crisis de 1956, y sigue siendo la base legal del estatus neutral y abierto del canal hoy en día.|Ce principe fut mis à l'épreuve et réaffirmé après la crise de 1956, et il reste aujourd'hui le fondement juridique du statut neutre et ouvert du canal.|この原則は1956年の危機のあと試され、改めて確認された。今日にいたるまで、運河の中立的で開かれた地位の法的根拠であり続けている。",
  ),
  q(
    7,
    "Which early-20th-century Egyptian feminist leader famously removed her face veil in public at a Cairo train station in 1923, an act that became a symbol of the movement she founded?|¿Qué líder feminista egipcia de principios del siglo XX se quitó públicamente el velo del rostro en una estación de tren de El Cairo en 1923, un acto que se convirtió en símbolo del movimiento que fundó?|Quelle dirigeante féministe égyptienne du début du XXe siècle retira publiquement son voile de visage dans une gare du Caire en 1923, un geste devenu symbole du mouvement qu'elle fonda?|1923年、カイロの鉄道駅で公然と顔の覆いを外し、その行為が自ら創設した運動の象徴となった、20世紀初頭のエジプトのフェミニズム指導者は?",
    [
      "Huda Sha'arawi|Huda Sha'arawi|Huda Chaaraoui|フダー・シャアラーウィー",
      "Nawal El Saadawi|Nawal El Saadawi|Nawal El Saadawi|ナワル・エル=サアダーウィー",
      "Zaynab al-Ghazali|Zaynab al-Ghazali|Zaynab al-Ghazali|ザイナブ・アル=ガザーリー",
    ],
    0,
    "She had just returned from an international women's conference and founded the Egyptian Feminist Union that same year, campaigning for education access and voting rights.|Acababa de regresar de una conferencia internacional de mujeres y fundó la Unión Feminista Egipcia ese mismo año, con campañas por el acceso a la educación y el derecho al voto.|Elle revenait tout juste d'une conférence internationale de femmes et fonda cette même année l'Union féministe égyptienne, militant pour l'accès à l'éducation et le droit de vote.|彼女は国際女性会議から帰国したばかりで、その同じ年にエジプト・フェミニスト連合を設立し、教育の機会と参政権を求める運動を進めた。",
  ),
  q(
    7,
    "Egypt's diplomatic relations with Israel, following the 1979 peace treaty, were formally established and embassies exchanged in which year?|Las relaciones diplomáticas de Egipto con Israel, tras el tratado de paz de 1979, se establecieron formalmente e intercambiaron embajadas en qué año?|Les relations diplomatiques de l'Égypte avec Israël, à la suite du traité de paix de 1979, furent formellement établies et les ambassades échangées en quelle année?|1979年の和平条約後、エジプトとイスラエルが正式に外交関係を樹立し大使館を交換したのは何年か?",
    [
      "1980|1980|1980|1980年",
      "1979|1979|1979|1979年",
      "1995|1995|1995|1995年",
    ],
    0,
    "The treaty was signed in March 1979, but the formal exchange of ambassadors followed the next year once the initial phase of Israel's withdrawal from Sinai was under way.|El tratado se firmó en marzo de 1979, pero el intercambio formal de embajadores llegó al año siguiente, una vez en marcha la fase inicial de la retirada israelí del Sinaí.|Le traité fut signé en mars 1979, mais l'échange formel d'ambassadeurs suivit l'année suivante, une fois engagée la phase initiale du retrait israélien du Sinaï.|条約は1979年3月に調印されたが、大使の正式な交換は、イスラエルのシナイ撤退の第一段階が始まった翌年になってからのことだった。",
  ),
  q(
    8,
    "Which late-19th/early-20th-century Egyptian Islamic scholar, a key figure of the Islamic Modernism movement, served as the country's Grand Mufti and argued for reconciling Islamic law with modern institutions?|¿Qué erudito islámico egipcio de finales del siglo XIX y principios del XX, figura clave del movimiento del modernismo islámico, ejerció como gran muftí del país y defendió conciliar la ley islámica con las instituciones modernas?|Quel érudit islamique égyptien de la fin du XIXe et du début du XXe siècle, figure clé du mouvement du modernisme islamique, exerça comme grand mufti du pays et plaida pour concilier le droit islamique avec les institutions modernes?|19世紀末から20世紀初頭にかけてのイスラム近代主義運動の中心人物で、エジプトの大ムフティーを務め、イスラム法と近代的な諸制度の調和を説いたエジプトのイスラム学者は?",
    [
      "Muhammad Abduh|Muhammad Abduh|Muhammad Abduh|ムハンマド・アブドゥフ",
      "Sayyid Qutb|Sayyid Qutb|Sayyid Qutb|サイイド・クトゥブ",
      "Hassan al-Banna|Hasan al-Banna|Hassan el-Banna|ハサン・アル=バンナー",
    ],
    0,
    "Abduh, a student of the pan-Islamic thinker Jamal al-Din al-Afghani, pushed for reforms to Al-Azhar's curriculum and is still cited across the political spectrum today.|Abduh, discípulo del pensador panislámico Jamal al-Din al-Afgani, impulsó reformas en el plan de estudios de Al-Azhar y todavía hoy se le cita en todo el espectro político.|Abduh, disciple du penseur panislamique Jamal al-Din al-Afghani, poussa à des réformes du cursus d'Al-Azhar et reste cité aujourd'hui dans tout l'éventail politique.|汎イスラム主義の思想家ジャマールッディーン・アフガーニーの弟子だったアブドゥフは、アズハルの教育課程の改革を推し進め、いまも政治的立場を問わず引用され続けている。",
  ),
  q(
    7,
    "Egypt and Sudan both claim sovereignty over which triangular strip of land on their shared Red Sea border, administered in practice by Egypt?|¿Qué franja triangular de tierra en su frontera compartida del mar Rojo reclaman como propia tanto Egipto como Sudán, administrada en la práctica por Egipto?|Quelle bande triangulaire de terre, sur leur frontière commune de la mer Rouge, l'Égypte et le Soudan revendiquent-ils tous deux, administrée en pratique par l'Égypte?|エジプトとスーダンがともに領有権を主張し、実際にはエジプトが統治している、両国の紅海沿いの国境にある三角形の土地は?",
    [
      "The Hala'ib Triangle|El triángulo de Halaib|Le triangle de Halaib|ハラーイブ三角地帯",
      "The Bakassi Peninsula|La península de Bakassi|La péninsule de Bakassi|バカシ半島",
      "The Ilemi Triangle|El triángulo de Ilemi|Le triangle d'Ilemi|イレミ三角地帯",
    ],
    0,
    "The dispute stems from two different colonial-era boundary lines drawn by Britain, one administrative and one political, that never fully agreed with each other.|La disputa se origina en dos líneas fronterizas distintas de la era colonial trazadas por Gran Bretaña, una administrativa y otra política, que nunca coincidieron del todo entre sí.|Le différend trouve son origine dans deux tracés frontaliers différents de l'époque coloniale britannique, l'un administratif et l'autre politique, qui ne concordèrent jamais tout à fait.|この係争は、イギリスが植民地時代に引いた行政上の境界線と政治上の境界線という、互いに一致しない二本の国境線に由来する。",
  ),
  q(
    7,
    "In which century did the Coptic Church formally split from the mainstream of Chalcedonian Christianity, following a dispute over the nature of Christ at a major church council?|¿En qué siglo se separó formalmente la Iglesia copta de la corriente principal del cristianismo calcedonio, tras una disputa sobre la naturaleza de Cristo en un gran concilio eclesiástico?|À quel siècle l'Église copte s'est-elle formellement séparée du courant dominant du christianisme chalcédonien, à la suite d'un différend sur la nature du Christ lors d'un grand concile?|キリストの本性をめぐる大公会議での論争の末、コプト教会がカルケドン派キリスト教の主流から正式に分かれたのは何世紀か?",
    [
      "The 5th century|El siglo V|Le Ve siècle|5世紀",
      "The 11th century|El siglo XI|Le XIe siècle|11世紀",
      "The 18th century|El siglo XVIII|Le XVIIIe siècle|18世紀",
    ],
    0,
    "The split followed the Council of Chalcedon in 451, and Coptic Christians are part of the wider Oriental Orthodox family of churches that also rejected that council's ruling.|La separación siguió al Concilio de Calcedonia de 451, y los cristianos coptos forman parte de la familia más amplia de iglesias ortodoxas orientales que también rechazaron el dictamen de ese concilio.|La scission suivit le concile de Chalcédoine en 451, et les chrétiens coptes font partie de la famille plus large des Églises orthodoxes orientales qui rejetèrent elles aussi la décision de ce concile.|この分裂は451年のカルケドン公会議のあとに起き、コプト・キリスト教徒は、同じくこの公会議の決定を退けた東方正教会という、より広い教会群の一員となっている。",
  ),
  q(
    7,
    "Which cluster of oases, strung across the Western Desert and once linked by a proposed railway that was never fully completed for passengers, includes Kharga, Dakhla, Farafra and Bahariya?|¿Qué grupo de oasis, repartidos por el desierto Occidental y en su día unidos por un ferrocarril proyectado que nunca se completó del todo para pasajeros, incluye Kharga, Dajla, Farafra y Bahariya?|Quel ensemble d'oasis, disséminées dans le désert occidental et autrefois censées être reliées par un chemin de fer projeté jamais pleinement achevé pour les passagers, comprend Kharga, Dakhla, Farafra et Bahariya?|西方砂漠に点在し、旅客用には完全には実現しなかった鉄道計画でかつて結ばれるはずだった、カルガ・ダーヒラ・ファラフラ・バハレイヤを含むオアシスの連なりは何と呼ばれるか?",
    [
      "The New Valley oases|Los oasis del Nuevo Valle|Les oasis de la Nouvelle Vallée|新渓谷(ニューバレー)のオアシス群",
      "The Seven Sisters oases|Los oasis de las Siete Hermanas|Les oasis des Sept Sœurs|七姉妹オアシス群",
      "The Emerald Chain oases|Los oasis de la Cadena Esmeralda|Les oasis de la Chaîne d'émeraude|エメラルド・チェーン・オアシス群",
    ],
    0,
    "The New Valley Governorate, created in the 1950s, was meant to open this chain of oases to large-scale resettlement from the crowded Nile Valley, a goal only partly realised.|La provincia del Nuevo Valle, creada en los años cincuenta, pretendía abrir esta cadena de oasis a un reasentamiento a gran escala desde el abarrotado valle del Nilo, un objetivo solo parcialmente logrado.|La province de la Nouvelle Vallée, créée dans les années 1950, devait ouvrir cette chaîne d'oasis à un réinstallement à grande échelle depuis la vallée du Nil surpeuplée, un objectif seulement partiellement atteint.|1950年代に作られた新渓谷県は、このオアシスの連なりを、混み合うナイル渓谷からの大規模な移住先として開くことを狙っていたが、この目標は一部しか実現しなかった。",
  ),

  // ==================== 難易度9〜10(12問) ====================
  q(
    9,
    "On 3 November 2016, Egypt's central bank let the pound float freely for the first time, as a condition of a loan from the IMF. Roughly what did the official rate move from and to against the US dollar that day?|El 3 de noviembre de 2016, el banco central de Egipto dejó flotar libremente la libra por primera vez, como condición de un préstamo del FMI. ¿Entre qué cifras se movió aproximadamente ese día el tipo de cambio oficial frente al dólar estadounidense?|Le 3 novembre 2016, la banque centrale d'Égypte a laissé flotter librement la livre pour la première fois, condition d'un prêt du FMI. Entre quels chiffres environ le taux officiel face au dollar américain a-t-il évolué ce jour-là?|2016年11月3日、エジプト中央銀行はIMF融資の条件として、ポンドを初めて完全変動相場に移行させた。この日、対米ドルの公定レートはおよそいくらからいくらへ動いたか?",
    [
      "From about 8.8 to about 13 pounds per dollar|De unas 8,8 a unas 13 libras por dólar|D'environ 8,8 à environ 13 livres pour un dollar|1ドル=約8.8ポンドから約13ポンドへ",
      "From about 3.5 to about 6 pounds per dollar|De unas 3,5 a unas 6 libras por dólar|D'environ 3,5 à environ 6 livres pour un dollar|1ドル=約3.5ポンドから約6ポンドへ",
      "From about 13 to about 30 pounds per dollar|De unas 13 a unas 30 libras por dólar|D'environ 13 à environ 30 livres pour un dollar|1ドル=約13ポンドから約30ポンドへ",
    ],
    0,
    "The move was a roughly 32% devaluation in a single day; the pound weakened further in the following weeks, and on 11 November the IMF board approved a three-year, about $12 billion loan tied to the float and to cuts in long-standing fuel and food subsidies.|El movimiento supuso una devaluación de cerca del 32% en un solo día; la libra se debilitó aún más en las semanas siguientes, y el 11 de noviembre el directorio del FMI aprobó un préstamo a tres años de unos 12.000 millones de dólares, ligado a la flotación y a recortes de subsidios de combustible y alimentos de larga data.|Ce mouvement représenta une dévaluation d'environ 32% en une seule journée; la livre s'affaiblit encore dans les semaines suivantes, et le 11 novembre le conseil du FMI approuva un prêt de trois ans d'environ 12 milliards de dollars, lié à cette flottaison et à des coupes dans des subventions de longue date sur le carburant et l'alimentation.|この変更は1日でおよそ32%の切り下げに相当した。ポンドはその後の数週間でさらに弱含み、11月11日にはIMF理事会が、この変動相場移行と長年続いた燃料・食料補助金の削減を条件とする、3年・およそ120億ドルの融資を承認した。",
  ),
  q(
    9,
    "On 23 February 2024, Egypt announced a huge foreign investment deal for a stretch of Mediterranean coast — and just under two weeks later, on 6 March, its central bank let the pound float freely again under a new IMF-backed programme. What was that investment deal called?|El 23 de febrero de 2024, Egipto anunció un enorme acuerdo de inversión extranjera para un tramo de costa mediterránea, y apenas dos semanas después, el 6 de marzo, su banco central volvió a dejar flotar libremente la libra bajo un nuevo programa respaldado por el FMI. ¿Cómo se llamó ese acuerdo de inversión?|Le 23 février 2024, l'Égypte annonça un immense accord d'investissement étranger pour un tronçon de côte méditerranéenne — et à peine deux semaines plus tard, le 6 mars, sa banque centrale laissa de nouveau flotter librement la livre dans le cadre d'un nouveau programme soutenu par le FMI. Comment s'appelait cet accord d'investissement?|2024年2月23日、エジプトは地中海沿岸の一角をめぐる巨額の海外投資契約を発表した。その2週間足らずあと、3月6日には中央銀行が新たなIMF支援計画のもとでポンドを再び完全変動相場に移行させた。この投資契約は何と呼ばれるか?",
    [
      "The Ras El-Hekma deal|El acuerdo de Ras El-Hekma|L'accord de Ras el-Hekma|ラス・エル=ヘクマ合意",
      "The New Valley Compact|El Pacto del Nuevo Valle|Le Pacte de la Nouvelle Vallée|新渓谷協定",
      "The Sinai Peace Dividend|El Dividendo de Paz del Sinaí|Le Dividende de paix du Sinaï|シナイ和平配当",
    ],
    0,
    "Led by Abu Dhabi's ADQ, the roughly $35 billion deal — about $24 billion for development rights plus $11 billion converted from existing Emirati deposits — left the Egyptian government holding a 35% stake; the currency float followed two weeks later, once the foreign-currency inflow was secured.|Liderado por ADQ de Abu Dabi, el acuerdo de unos 35.000 millones de dólares —cerca de 24.000 millones por derechos de desarrollo más 11.000 millones convertidos de depósitos emiratíes ya existentes— dejó al gobierno egipcio con una participación del 35%; la flotación de la moneda llegó dos semanas después, una vez asegurada la entrada de divisas.|Mené par l'ADQ d'Abou Dabi, l'accord d'environ 35 milliards de dollars — quelque 24 milliards pour des droits de développement plus 11 milliards convertis de dépôts émiratis existants — a laissé au gouvernement égyptien une participation de 35 % ; la flottaison de la monnaie suivit deux semaines plus tard, une fois l'afflux de devises assuré.|アブダビのADQが主導したこのおよそ350億ドルの契約(開発権に約240億ドル、既存のUAE預金からの転換に110億ドル)により、エジプト政府は35%の権益を保持することになった。通貨の変動相場移行は、この外貨流入の目処が立った2週間後に続いた。",
  ),
  q(
    9,
    "In a deal signed in 2016 and finalised (after legal challenges) in 2017, Egypt transferred sovereignty over which two small Red Sea islands to Saudi Arabia, prompting significant domestic protest?|En un acuerdo firmado en 2016 y finalizado (tras impugnaciones legales) en 2017, ¿sobre qué dos pequeñas islas del mar Rojo transfirió Egipto la soberanía a Arabia Saudí, lo que provocó importantes protestas internas?|Dans un accord signé en 2016 et finalisé (après des recours judiciaires) en 2017, l'Égypte a transféré la souveraineté sur quelles deux petites îles de la mer Rouge à l'Arabie saoudite, suscitant d'importantes protestations internes?|2016年に調印され(法廷闘争を経て)2017年に確定した合意で、エジプトが主権をサウジアラビアへ譲渡し、国内で大きな抗議を招いた紅海の二つの小さな島は?",
    [
      "Tiran and Sanafir|Tirán y Sanafir|Tiran et Sanafir|チラン島とサナフィル島",
      "Shadwan and Gubal|Shadwan y Gubal|Chadwan et Gubal|シャドワン島とグバル島",
      "Zabargad and Rocky Island|Zabargad e Isla Rocosa|Zabargad et Rocky Island|ザバルガド島とロッキー島",
    ],
    0,
    "Egyptian courts initially blocked the transfer on the grounds the islands were part of Egypt's territory, before a later ruling allowed the government to proceed.|Los tribunales egipcios bloquearon inicialmente la transferencia alegando que las islas formaban parte del territorio egipcio, antes de que un fallo posterior permitiera al gobierno seguir adelante.|Les tribunaux égyptiens bloquèrent d'abord le transfert au motif que les îles faisaient partie du territoire égyptien, avant qu'une décision ultérieure ne permette au gouvernement d'aller de l'avant.|エジプトの裁判所は当初、これらの島がエジプト領の一部であるとしてこの譲渡を差し止めていたが、のちの判決で政府が手続きを進めることが認められた。",
  ),
  q(
    9,
    "Which Egyptian chemist won the 1999 Nobel Prize in Chemistry for pioneering work in femtochemistry, observing chemical reactions on extremely short timescales?|¿Qué químico egipcio ganó el Premio Nobel de Química de 1999 por su trabajo pionero en femtoquímica, observando reacciones químicas en escalas de tiempo extremadamente breves?|Quel chimiste égyptien remporta le prix Nobel de chimie 1999 pour ses travaux pionniers en femtochimie, observant des réactions chimiques sur des échelles de temps extrêmement courtes?|化学反応をきわめて短い時間スケールで観測する「フェムト化学」の先駆的研究により、1999年のノーベル化学賞を受賞したエジプトの化学者は?",
    [
      "Ahmed Zewail|Ahmed Zewail|Ahmed Zewail|アハメド・ズウェイル",
      "Mohamed ElBaradei|Mohamed el Baradei|Mohamed ElBaradei|モハメド・エルバラダイ",
      "Farouk El-Baz|Farouk El-Baz|Farouk El-Baz|ファールーク・エル=バズ",
    ],
    0,
    "Zewail carried out most of his award-winning research at Caltech in the United States, and he was the first scientist of Egyptian or Arab origin to win a Nobel Prize in a science category.|Zewail realizó la mayor parte de su investigación premiada en Caltech, en Estados Unidos, y fue el primer científico de origen egipcio o árabe en ganar un Nobel en una categoría científica.|Zewail mena l'essentiel de ses recherches primées au Caltech, aux États-Unis, et il fut le premier scientifique d'origine égyptienne ou arabe à remporter un prix Nobel dans une catégorie scientifique.|ズウェイルは受賞対象となった研究の大半をアメリカのカリフォルニア工科大学で行い、科学部門でノーベル賞を受賞した初のエジプト系・アラブ系の科学者となった。",
  ),
  q(
    9,
    "Egypt's Grand Ethiopian Renaissance Dam dispute, over a dam Ethiopia is building upstream on the Blue Nile, escalated sharply when Ethiopia began the first stage of filling the dam's reservoir. In which year did that first filling stage begin?|La disputa de Egipto por la Gran Presa del Renacimiento Etíope, construida por Etiopía río arriba en el Nilo Azul, se agravó notablemente cuando Etiopía inició la primera fase de llenado del embalse. ¿En qué año comenzó esa primera fase de llenado?|Le différend de l'Égypte autour du Grand barrage de la Renaissance éthiopienne, construit par l'Éthiopie en amont sur le Nil Bleu, s'est nettement envenimé lorsque l'Éthiopie a entamé la première phase de remplissage du réservoir. En quelle année cette première phase de remplissage a-t-elle commencé?|エチオピアが青ナイル上流に建設する大エチオピア・ルネサンスダムをめぐるエジプトとの対立は、エチオピアが貯水池の最初の貯水段階を始めたことで急激に悪化した。この最初の貯水段階が始まったのは何年か?",
    [
      "2020|2020|2020|2020年",
      "2011|2011|2011|2011年",
      "2015|2015|2015|2015年",
    ],
    0,
    "Construction had begun back in 2011, but it was the first filling in the summer of 2020, undertaken without a final agreement with Egypt and Sudan, that sharply raised diplomatic tensions.|La construcción había comenzado ya en 2011, pero fue el primer llenado, en el verano de 2020, realizado sin un acuerdo final con Egipto y Sudán, lo que elevó bruscamente la tensión diplomática.|La construction avait débuté dès 2011, mais c'est le premier remplissage, à l'été 2020, mené sans accord final avec l'Égypte et le Soudan, qui fit brusquement monter les tensions diplomatiques.|建設自体は2011年にさかのぼって始まっていたが、エジプト・スーダンとの最終合意のないまま行われた2020年夏の最初の貯水が、外交的緊張を急激に高めることになった。",
  ),
  q(
    9,
    "Construction of the Grand Ethiopian Renaissance Dam itself, the source of Egypt's ongoing water-security dispute with Ethiopia, formally began in which year?|La construcción de la propia Gran Presa del Renacimiento Etíope, origen de la disputa continua de Egipto con Etiopía por la seguridad hídrica, comenzó formalmente en qué año?|La construction du Grand barrage de la Renaissance éthiopienne lui-même, à l'origine du différend persistant de l'Égypte avec l'Éthiopie sur la sécurité hydrique, a formellement débuté en quelle année?|エジプトとエチオピアのあいだで続く水の安全保障をめぐる対立の発端となった、大エチオピア・ルネサンスダムそのものの建設が正式に始まったのは何年か?",
    [
      "2011|2011|2011|2011年",
      "1998|1998|1998|1998年",
      "2019|2019|2019|2019年",
    ],
    0,
    "Mubarak resigned on 11 February 2011, and Ethiopian prime minister Meles Zenawi laid the foundation stone for the dam just under two months later, on 2 April — timing that Egyptian commentators have long noted was unlikely to be coincidental.|Mubarak dimitió el 11 de febrero de 2011, y el primer ministro etíope Meles Zenawi colocó la primera piedra de la presa apenas dos meses después, el 2 de abril, una coincidencia temporal que comentaristas egipcios llevan tiempo señalando como poco casual.|Moubarak démissionna le 11 février 2011, et le premier ministre éthiopien Meles Zenawi posa la première pierre du barrage à peine deux mois plus tard, le 2 avril — un timing que des commentateurs égyptiens jugent depuis longtemps peu fortuit.|ムバーラクは2011年2月11日に辞任し、エチオピアのメレス・ゼナウィ首相はその2か月足らずあと、4月2日にこのダムの起工式で礎石を据えた。この時期の一致は偶然ではないだろうと、エジプトの論者は長く指摘してきた。",
  ),
  q(
    9,
    "In April 2021, Egypt held a widely televised procession moving royal mummies from the old Egyptian Museum to a new museum in Fustat. How many mummies were moved in this event, often nicknamed the \"Pharaohs' Golden Parade\"?|En abril de 2021, Egipto celebró un desfile televisado a gran escala que trasladó momias reales del antiguo Museo Egipcio a un nuevo museo en Fustat. ¿Cuántas momias se trasladaron en este evento, apodado a menudo el «Desfile Dorado de los Faraones»?|En avril 2021, l'Égypte organisa un défilé largement télévisé transférant des momies royales de l'ancien Musée égyptien vers un nouveau musée à Fustat. Combien de momies furent déplacées lors de cet événement, souvent surnommé la « Parade dorée des pharaons »?|2021年4月、エジプトは王家のミイラを旧エジプト博物館からフスタートの新しい博物館へ移す、広くテレビ中継された行列を行った。「ファラオの黄金のパレード」とも呼ばれるこの行事で移されたミイラの数は?",
    [
      "22|22|22|22体",
      "6|6|6|6体",
      "70|70|70|70体",
    ],
    0,
    "Each mummy travelled in a specially built, shock-absorbing vehicle named after the pharaoh or queen inside, escorted through central Cairo in a procession with a full orchestral score composed for the occasion.|Cada momia viajó en un vehículo especialmente construido y con amortiguación, bautizado con el nombre del faraón o la reina que transportaba, escoltada por el centro de El Cairo en un desfile con una partitura orquestal compuesta para la ocasión.|Chaque momie voyagea dans un véhicule spécialement conçu et amorti, baptisé du nom du pharaon ou de la reine à l'intérieur, escortée à travers le centre du Caire dans un cortège accompagné d'une partition orchestrale composée pour l'occasion.|それぞれのミイラは、中に納められたファラオや王妃の名を冠した、衝撃吸収機構を備えた特製車両で運ばれ、この機会のために作曲された管弦楽とともにカイロ中心部を行列で護送された。",
  ),
  q(
    8,
    "Egypt's population is generally estimated to be the third-largest in Africa, behind which two countries?|La población de Egipto se estima generalmente como la tercera más grande de África, por detrás de qué dos países?|La population de l'Égypte est généralement estimée comme la troisième plus importante d'Afrique, derrière quels deux pays?|エジプトの人口は一般に、アフリカでどの二か国に次いで3番目に多いと見積もられているか?",
    [
      "Nigeria and Ethiopia|Nigeria y Etiopía|Le Nigeria et l'Éthiopie|ナイジェリアとエチオピア",
      "South Africa and Kenya|Sudáfrica y Kenia|L'Afrique du Sud et le Kenya|南アフリカとケニア",
      "Algeria and Morocco|Argelia y Marruecos|L'Algérie et le Maroc|アルジェリアとモロッコ",
    ],
    0,
    "The exact rankings shift slightly over time as growth rates diverge, but Nigeria and Ethiopia have consistently held the top two spots on the continent in recent decades.|El orden exacto varía ligeramente con el tiempo a medida que divergen las tasas de crecimiento, pero Nigeria y Etiopía han ocupado sistemáticamente los dos primeros puestos del continente en las últimas décadas.|Le classement exact varie légèrement dans le temps à mesure que les taux de croissance divergent, mais le Nigeria et l'Éthiopie ont constamment occupé les deux premières places du continent ces dernières décennies.|正確な順位は成長率の違いによって時とともに少し変わるが、ナイジェリアとエチオピアは近年、一貫してアフリカ大陸の上位2位を占め続けている。",
  ),
  q(
    9,
    "The New Suez Canal expansion project, adding a new parallel channel to allow two-way traffic along part of the route, was inaugurated with great fanfare in which year?|El proyecto de ampliación del Nuevo Canal de Suez, que añadió un nuevo cauce paralelo para permitir tráfico en ambos sentidos en parte del trayecto, se inauguró con gran fanfarria en qué año?|Le projet d'extension du Nouveau canal de Suez, ajoutant un nouveau chenal parallèle permettant un trafic à double sens sur une partie du parcours, fut inauguré en grande pompe en quelle année?|一部区間で双方向の通航を可能にする新しい並行水路を加えた「新スエズ運河」拡張事業が、盛大な式典とともに開通したのは何年か?",
    [
      "2015|2015|2015|2015年",
      "2002|2002|2002|2002年",
      "2011|2011|2011|2011年",
    ],
    0,
    "The roughly $8 billion project was built in about a year, well ahead of the original schedule, and was framed by the government as a symbol of national renewal after the upheaval of 2011–13.|El proyecto, de unos 8.000 millones de dólares, se construyó en cerca de un año, muy por delante del calendario original, y el gobierno lo presentó como símbolo de renovación nacional tras la agitación de 2011-13.|Le projet, d'environ 8 milliards de dollars, fut construit en environ un an, bien avant le calendrier initial, et présenté par le gouvernement comme un symbole de renouveau national après les bouleversements de 2011-2013.|およそ80億ドル規模のこの事業は当初の予定を大きく前倒しし、およそ1年で完成した。政府はこれを、2011〜13年の激動を経た国家再生の象徴として打ち出した。",
  ),
  q(
    9,
    "Completed with its main galleries opening in stages through the early-to-mid 2020s after years of delay, which enormous museum near the Giza pyramids is billed as one of the largest archaeological museums in the world?|Completado con sus salas principales abriéndose por etapas entre principios y mediados de la década de 2020 tras años de retraso, ¿qué enorme museo cercano a las pirámides de Guiza se presenta como uno de los mayores museos arqueológicos del mundo?|Achevé, ses galeries principales ouvrant par étapes du début au milieu des années 2020 après des années de retard, quel immense musée près des pyramides de Gizeh est présenté comme l'un des plus grands musées archéologiques du monde?|何年もの遅延を経て2020年代前半から半ばにかけて主要展示室が段階的に開館した、ギザのピラミッド近くにある、世界最大級の考古学博物館とうたわれる巨大な博物館は?",
    [
      "The Grand Egyptian Museum|El Gran Museo Egipcio|Le Grand Musée égyptien|大エジプト博物館",
      "The Nubia Museum|El Museo de Nubia|Le Musée de Nubie|ヌビア博物館",
      "The Coptic Museum|El Museo Copto|Le Musée copte|コプト博物館",
    ],
    0,
    "Its construction stretched across roughly two decades and was repeatedly delayed by funding gaps, political upheaval and the COVID-19 pandemic before galleries finally began welcoming visitors.|Su construcción se extendió a lo largo de casi dos décadas y sufrió retrasos repetidos por falta de financiación, agitación política y la pandemia de COVID-19, antes de que las salas empezaran por fin a recibir visitantes.|Sa construction s'étala sur près de deux décennies et fut retardée à plusieurs reprises par des manques de financement, des bouleversements politiques et la pandémie de COVID-19, avant que les galeries n'accueillent enfin des visiteurs.|建設はおよそ20年にわたり、資金不足・政情不安・新型コロナウイルスの流行によって度々遅れたが、展示室はついに来館者を迎え始めた。",
  ),
  q(
    9,
    "The Iconic Tower in Egypt's New Administrative Capital, completed in 2023, became Africa's tallest building. Approximately how tall is it?|La Torre Icónica, en la Nueva Capital Administrativa de Egipto, completada en 2023, se convirtió en el edificio más alto de África. ¿Aproximadamente cuánto mide?|La Tour Iconic, dans la Nouvelle capitale administrative de l'Égypte, achevée en 2023, est devenue le plus haut bâtiment d'Afrique. Quelle est sa hauteur approximative?|2023年に完成し、アフリカ最高層の建物になったエジプト新行政首都の「アイコニック・タワー」の高さはおよそどれくらいか?",
    [
      "About 390 metres|Unos 390 metros|Environ 390 mètres|約390メートル",
      "About 150 metres|Unos 150 metros|Environ 150 mètres|約150メートル",
      "About 700 metres|Unos 700 metros|Environ 700 mètres|約700メートル",
    ],
    0,
    "The tower was built by a Chinese state construction firm and houses offices and a observation deck, part of a wider skyline of new towers rising from what was empty desert only a few years earlier.|La torre fue construida por una empresa constructora estatal china y alberga oficinas y un mirador, parte de un horizonte más amplio de nuevas torres que se alzan donde solo unos años antes había desierto vacío.|La tour fut construite par une entreprise de construction publique chinoise et abrite des bureaux et un belvédère, faisant partie d'un ensemble plus large de nouvelles tours s'élevant là où il n'y avait que du désert vide quelques années plus tôt.|このタワーは中国の国有建設会社によって建てられ、オフィスと展望台を備える。ほんの数年前まで何もない砂漠だった場所に立ち並ぶ新しい高層ビル群の一部である。",
  ),
  q(
    7,
    "Egypt marks 25 April as a public holiday commemorating what event, completed in 1982 under the terms of the 1979 peace treaty?|Egipto conmemora el 25 de abril como fiesta nacional por qué acontecimiento, completado en 1982 en virtud del tratado de paz de 1979?|L'Égypte célèbre le 25 avril comme jour férié en commémoration de quel événement, achevé en 1982 selon les termes du traité de paix de 1979?|エジプトが1979年の和平条約の条件のもと1982年に完了した、4月25日の祝日として記念する出来事は?",
    [
      "The final withdrawal of Israeli forces from the Sinai Peninsula|La retirada final de las fuerzas israelíes de la península del Sinaí|Le retrait final des forces israéliennes de la péninsule du Sinaï|イスラエル軍のシナイ半島からの最終撤退",
      "The reopening of the Suez Canal after the 1967 war|La reapertura del canal de Suez tras la guerra de 1967|La réouverture du canal de Suez après la guerre de 1967|1967年戦争後のスエズ運河再開通",
      "The completion of the Cairo Metro's first line|La finalización de la primera línea del metro de El Cairo|L'achèvement de la première ligne du métro du Caire|カイロ地下鉄1号線の完成",
    ],
    0,
    "Known as Sinai Liberation Day, the holiday marks the last stage of a phased withdrawal that had begun soon after the treaty was signed three years earlier.|Conocido como el Día de la Liberación del Sinaí, el festivo marca la última etapa de una retirada por fases que había comenzado poco después de firmarse el tratado tres años antes.|Connu sous le nom de jour de la Libération du Sinaï, ce jour férié marque la dernière étape d'un retrait par étapes entamé peu après la signature du traité trois ans plus tôt.|「シナイ解放の日」として知られるこの祝日は、条約調印の3年後、それより前に始まっていた段階的な撤退の最終段階を記念するものである。",
  ),
];
