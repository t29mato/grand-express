/**
 * メキシコのクイズ(110問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける(24問)
 *   4〜6 … 旅行したり少し調べたことがあれば分かる(46問)
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る(25問)
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい(15問)
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(45件)が扱う具体的な事実(テオティワカンの人口・チチェン・
 * イッツァの分点・タスコの銀細工・アグアスカリエンテスの鉄道民営化など)は
 * ここでは問わない。代わりに、アステカ帝国・独立戦争・革命・現代の科学者・
 * ノーベル賞受賞者・映画・スポーツ・自然史など、**都市カードが触れていない
 * 主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs mexico
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数になるよう散らしてある。
 *
 * ## 確度について
 *
 * 難易度9〜10は1問ずつ裏を取った。確度がやや低いもの(グリセルダ・
 * アルバレスの就任年、ユカテコ語が「2番目に話者が多い」という順位)は
 * コメントに残す。麻薬組織に関する題材は入れていない。
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

export const MEXICO_QUIZ = [
  // ==================== 1〜3(24問) ====================
  q(
    1,
    "What is the capital of Mexico?|¿Cuál es la capital de México?|Quelle est la capitale du Mexique ?|メキシコの首都はどこか?",
    ["Guadalajara|Guadalajara|Guadalajara|グアダラハラ", "Mexico City|Ciudad de México|Mexico|メキシコシティ", "Monterrey|Monterrey|Monterrey|モンテレイ"],
    1,
    "Mexico City is one of the largest metropolitan areas in the Americas, with a metro population well above 20 million.|La Ciudad de México es una de las mayores áreas metropolitanas de América, con una población de más de 20 millones.|Mexico est l'une des plus grandes aires métropolitaines des Amériques, avec une population de plus de 20 millions.|メキシコシティは南北アメリカ有数の大都市圏で、都市圏人口は2000万人を大きく超える。",
  ),
  q(
    1,
    "What language do most people in Mexico speak?|¿Qué idioma habla la mayoría de la gente en México?|Quelle langue parle la plupart des gens au Mexique ?|メキシコで最も多くの人が話す言語は?",
    ["Portuguese|Portugués|Portugais|ポルトガル語", "Spanish|Español|Espagnol|スペイン語", "Italian|Italiano|Italien|イタリア語"],
    1,
    "Spanish arrived with Spanish colonization from the 1500s, though dozens of Indigenous languages are also spoken and officially recognized today.|El español llegó con la colonización española desde el siglo XVI, aunque hoy también se hablan y reconocen oficialmente decenas de lenguas indígenas.|L'espagnol arriva avec la colonisation espagnole dès le XVIe siècle, bien que des dizaines de langues autochtones soient aussi parlées et officiellement reconnues aujourd'hui.|スペイン語は16世紀のスペインによる植民地化とともに広まったが、今日でも数十の先住民言語が話され、公式に認められている。",
  ),
  q(
    1,
    "Which continent is Mexico part of?|¿A qué continente pertenece México?|De quel continent le Mexique fait-il partie ?|メキシコが属する大陸は?",
    ["South America|América del Sur|Amérique du Sud|南アメリカ", "North America|América del Norte|Amérique du Nord|北アメリカ", "Oceania|Oceanía|Océanie|オセアニア"],
    1,
    "Mexico sits at the southern end of the North American continent, joined to Central America by a narrowing strip of land.|México se sitúa en el extremo sur del continente norteamericano, unido a Centroamérica por una franja de tierra que se estrecha.|Le Mexique se situe à l'extrémité sud du continent nord-américain, relié à l'Amérique centrale par une bande de terre qui se rétrécit.|メキシコは北アメリカ大陸の南端に位置し、次第に細くなる陸地で中央アメリカとつながっている。",
  ),
  q(
    1,
    "Which ocean lies along Mexico's western coast?|¿Qué océano bordea la costa occidental de México?|Quel océan borde la côte occidentale du Mexique ?|メキシコの西海岸に面する大洋は?",
    ["The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋", "The Indian Ocean|El océano Índico|L'océan Indien|インド洋", "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋"],
    2,
    "Mexico is one of the few countries with coastlines on two different oceans, the Pacific to the west and the Gulf of Mexico and Caribbean to the east.|México es uno de los pocos países con costas en dos océanos distintos, el Pacífico al oeste y el golfo de México y el Caribe al este.|Le Mexique est l'un des rares pays à avoir des côtes sur deux océans différents, le Pacifique à l'ouest et le golfe du Mexique et les Caraïbes à l'est.|メキシコは、西の太平洋と東のメキシコ湾・カリブ海という二つの異なる大洋に面する数少ない国の一つである。",
  ),
  q(
    1,
    "What is a tamale, a classic Mexican dish?|¿Qué es un tamal, un plato clásico mexicano?|Qu'est-ce qu'un tamal, un plat mexicain classique ?|メキシコの伝統料理タマルとは?",
    ["Corn dough steamed in a husk|Masa de maíz cocida al vapor en una hoja|De la pâte de maïs cuite à la vapeur dans une feuille|トウモロコシの葉で包んで蒸した生地", "A grilled fish fillet|Un filete de pescado a la parrilla|Un filet de poisson grillé|焼いた魚の切り身", "A cold fruit soup|Una sopa fría de fruta|Une soupe froide de fruits|冷たい果物のスープ"],
    0,
    "The corn dough, called masa, is spread inside a corn husk or banana leaf, filled, folded and steamed, a technique with roots going back to pre-Hispanic Mesoamerica.|La masa de maíz se extiende dentro de una hoja de maíz o de plátano, se rellena, se envuelve y se cuece al vapor, una técnica con raíces en la Mesoamérica prehispánica.|La pâte de maïs, appelée masa, est étalée dans une feuille de maïs ou de bananier, garnie, repliée et cuite à la vapeur, une technique dont les racines remontent à la Méso-Amérique préhispanique.|トウモロコシの生地マサをトウモロコシの葉やバナナの葉に広げ、具を包んで蒸す。プレ・イスパニック期のメソアメリカにまで遡る技法である。",
  ),
  q(
    2,
    "What is Mexico's official currency?|¿Cuál es la moneda oficial de México?|Quelle est la monnaie officielle du Mexique ?|メキシコの公式通貨は?",
    ["The peso|El peso|Le peso|ペソ", "The real|El real|Le real|レアル", "The sol|El sol|Le sol|ソル"],
    0,
    "The Mexican peso, symbol $, was among the first currencies in the world to use that dollar-sign-like symbol, centuries before the US adopted it.|El peso mexicano, símbolo $, fue una de las primeras monedas del mundo en usar ese símbolo parecido al del dólar, siglos antes de que lo adoptara Estados Unidos.|Le peso mexicain, symbole $, fut l'une des premières monnaies au monde à utiliser ce symbole ressemblant à celui du dollar, des siècles avant que les États-Unis ne l'adoptent.|メキシコ・ペソの記号「$」は、アメリカがこの記号を採用するより何世紀も前から使われていた、世界でも早期の例の一つである。",
  ),
  q(
    2,
    "Which country lies directly north of Mexico?|¿Qué país queda justo al norte de México?|Quel pays se trouve juste au nord du Mexique ?|メキシコの真北にある国は?",
    ["Canada|Canadá|Canada|カナダ", "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国", "Guatemala|Guatemala|Guatemala|グアテマラ"],
    1,
    "The US–Mexico border runs for roughly 3,200 kilometers, one of the longest borders in the world between two countries.|La frontera entre EE. UU. y México se extiende unos 3.200 kilómetros, una de las más largas del mundo entre dos países.|La frontière entre les États-Unis et le Mexique s'étend sur environ 3 200 kilomètres, l'une des plus longues au monde entre deux pays.|米墨国境は全長およそ3200kmにおよび、二国間の国境としては世界でも指折りの長さである。",
  ),
  q(
    2,
    "What is the wide-brimmed hat traditionally associated with Mexico called?|¿Cómo se llama el sombrero de ala ancha asociado tradicionalmente con México?|Comment s'appelle le chapeau à large bord traditionnellement associé au Mexique ?|メキシコと結びつけられる、つばの広い帽子の名は?",
    ["A beret|Una boina|Un béret|ベレー帽", "A sombrero|Un sombrero|Un sombrero|ソンブレロ", "A fedora|Un fedora|Un feutre|フェドーラ帽"],
    1,
    "Its wide brim was designed to shade the face and neck from the sun, and elaborately embroidered versions are still worn with charro riding costumes.|Su ala ancha se diseñó para dar sombra a la cara y el cuello, y versiones muy bordadas se siguen llevando con el traje de charro.|Son large bord fut conçu pour protéger le visage et le cou du soleil, et des versions richement brodées se portent encore avec le costume de charro.|その広いつばは顔と首を日差しから守るために作られ、精緻な刺繍を施したものはいまもチャロ(騎馬牧夫)の衣装とともに着られる。",
  ),
  q(
    2,
    "Which of these big cats is native to Mexico's jungles and deserts?|¿Cuál de estos grandes felinos es nativo de las selvas y desiertos de México?|Lequel de ces grands félins est natif des jungles et déserts du Mexique ?|メキシコのジャングルや砂漠に生息する大型ネコ科動物は?",
    ["Tiger|Tigre|Tigre|トラ", "Lion|León|Lion|ライオン", "Jaguar|Jaguar|Jaguar|ジャガー"],
    2,
    "The jaguar was revered by Mesoamerican civilizations as a symbol of power and the night, and it remains the largest cat species in the Americas.|El jaguar fue venerado por las civilizaciones mesoamericanas como símbolo de poder y de la noche, y sigue siendo el felino más grande de América.|Le jaguar était vénéré par les civilisations mésoaméricaines comme symbole de pouvoir et de la nuit, et reste le plus grand félin des Amériques.|ジャガーはメソアメリカの文明で力と夜の象徴として崇められ、いまも南北アメリカ最大のネコ科動物である。",
  ),
  q(
    2,
    "Which grain forms the base of tortillas and most everyday Mexican cooking?|¿Qué grano forma la base de las tortillas y la mayoría de la cocina cotidiana mexicana?|Quelle céréale forme la base des tortillas et de la majeure partie de la cuisine mexicaine quotidienne?|トルティーヤをはじめ、日々のメキシコ料理の大半の土台となる穀物は?",
    ["Wheat|Trigo|Blé|小麦", "Rice|Arroz|Riz|米", "Corn|Maíz|Maïs|トウモロコシ"],
    2,
    "Corn underlies tortillas, tamales and countless other everyday dishes, and Mexico still grows dozens of native corn varieties in different colors.|El maíz está en la base de las tortillas, los tamales y muchísimos platos cotidianos, y México sigue cultivando docenas de variedades nativas de maíz de distintos colores.|Le maïs est à la base des tortillas, des tamales et d'innombrables plats du quotidien, et le Mexique cultive encore des dizaines de variétés natives de maïs aux couleurs différentes.|トウモロコシはトルティーヤやタマル、その他数え切れない日常の料理の土台であり、メキシコはいまも色とりどりの在来種のトウモロコシを何十種も栽培している。",
  ),
  q(
    3,
    "Which two countries border Mexico to the south?|¿Qué dos países limitan con México al sur?|Quels deux pays bordent le Mexique au sud ?|メキシコの南に隣接する二つの国は?",
    ["Guatemala and Belize|Guatemala y Belice|Guatemala et Belize|グアテマラとベリーズ", "Honduras and Panama|Honduras y Panamá|Honduras et Panama|ホンジュラスとパナマ", "Costa Rica and Panama|Costa Rica y Panamá|Costa Rica et Panama|コスタリカとパナマ"],
    0,
    "The southern border runs largely along rivers and jungle through the states of Chiapas, Tabasco, Campeche and Quintana Roo.|La frontera sur discurre en gran parte por ríos y selva a través de los estados de Chiapas, Tabasco, Campeche y Quintana Roo.|La frontière sud suit en grande partie des rivières et la jungle à travers les États du Chiapas, du Tabasco, du Campeche et du Quintana Roo.|南の国境は、チアパス・タバスコ・カンペチェ・キンタナロー各州を通り、その大半が川とジャングルに沿って走る。",
  ),
  q(
    3,
    "What bird, shown on the Mexican flag perched on a cactus, is Mexico's national symbol?|¿Qué ave, representada en la bandera mexicana posada en un nopal, es el símbolo nacional?|Quel oiseau, représenté sur le drapeau mexicain perché sur un cactus, est le symbole national ?|メキシコ国旗でサボテンにとまる姿で描かれる、国の象徴となる鳥は?",
    ["A condor|Un cóndor|Un condor|コンドル", "A golden eagle|Un águila real|Un aigle royal|イヌワシ", "A quetzal|Un quetzal|Un quetzal|ケツァール"],
    1,
    "The image comes from an Aztec founding legend in which priests were told to build their city where they saw an eagle devouring a serpent on a cactus.|La imagen viene de una leyenda fundacional azteca en la que los sacerdotes debían fundar su ciudad donde vieran un águila devorando una serpiente sobre un nopal.|L'image vient d'une légende fondatrice aztèque selon laquelle les prêtres devaient bâtir leur cité là où ils verraient un aigle dévorant un serpent sur un cactus.|この図は、神官たちがサボテンの上で蛇を食らう鷲を見た場所に都を築けと告げられたという、アステカの建国神話に由来する。",
  ),
  q(
    3,
    "What ingredient is Mexican cuisine especially known for using in many varieties?|¿Qué ingrediente es especialmente conocido por usarse en muchas variedades en la cocina mexicana?|Quel ingrédient la cuisine mexicaine est-elle particulièrement connue pour utiliser en de nombreuses variétés ?|メキシコ料理が多くの種類を使うことで特によく知られる食材は?",
    ["Chili peppers|Chiles|Piments|唐辛子", "Black pepper|Pimienta negra|Poivre noir|黒コショウ", "Wasabi|Wasabi|Wasabi|わさび"],
    0,
    "Mexico is home to dozens of native chili varieties, from mild to blisteringly hot, each suited to particular dishes and sauces.|México es hogar de docenas de variedades nativas de chile, desde suaves hasta abrasadoras, cada una apta para platos y salsas concretos.|Le Mexique abrite des dizaines de variétés natives de piments, du doux au brûlant, chacune adaptée à des plats et des sauces particuliers.|メキシコには数十種の在来の唐辛子があり、ごく穏やかなものから激辛のものまで、それぞれが特定の料理やソースに使われる。",
  ),
  q(
    3,
    "Which sea lies to the east of the Yucatán Peninsula?|¿Qué mar queda al este de la península de Yucatán?|Quelle mer se trouve à l'est de la péninsule du Yucatán ?|ユカタン半島の東にある海は?",
    ["The Red Sea|El mar Rojo|La mer Rouge|紅海", "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海", "The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海"],
    2,
    "The peninsula's east coast faces the Caribbean's warm, clear water, while its north coast faces the Gulf of Mexico.|La costa este de la península da al agua cálida y transparente del Caribe, mientras que su costa norte da al golfo de México.|La côte est de la péninsule donne sur les eaux chaudes et limpides des Caraïbes, tandis que sa côte nord donne sur le golfe du Mexique.|半島の東岸は暖かく澄んだカリブ海に面し、北岸はメキシコ湾に面している。",
  ),
  q(
    1,
    "What sport is most popular in Mexico?|¿Qué deporte es el más popular en México?|Quel sport est le plus populaire au Mexique ?|メキシコで最も人気のあるスポーツは?",
    ["Cricket|Críquet|Cricket|クリケット", "Football (soccer)|Fútbol|Football|サッカー", "Rugby|Rugby|Rugby|ラグビー"],
    1,
    "Mexico has one of the world's largest football fan bases, and its top league draws crowds that rival many in Europe.|México tiene una de las mayores aficiones futbolísticas del mundo, y su máxima liga atrae multitudes comparables a las de muchas ligas europeas.|Le Mexique compte l'une des plus grandes bases de supporters de football au monde, et sa ligue principale attire des foules comparables à celles de nombreuses ligues européennes.|メキシコは世界有数のサッカー人気を誇る国で、国内トップリーグはヨーロッパの多くのリーグに匹敵する観客を集める。",
  ),
  q(
    3,
    "Which desert stretches across much of northern Mexico?|¿Qué desierto se extiende por buena parte del norte de México?|Quel désert s'étend sur une grande partie du nord du Mexique ?|メキシコ北部の広い範囲に広がる砂漠は?",
    ["The Sahara|El Sahara|Le Sahara|サハラ砂漠", "The Gobi|El Gobi|Le Gobi|ゴビ砂漠", "The Chihuahuan Desert|El desierto de Chihuahua|Le désert de Chihuahua|チワワ砂漠"],
    2,
    "The Chihuahuan Desert is one of the largest deserts in North America, spanning parts of several northern Mexican states and the southwestern United States.|El desierto de Chihuahua es uno de los mayores de Norteamérica, y se extiende por varios estados del norte de México y el suroeste de Estados Unidos.|Le désert de Chihuahua est l'un des plus grands d'Amérique du Nord, s'étendant sur plusieurs États du nord du Mexique et le sud-ouest des États-Unis.|チワワ砂漠は北アメリカ有数の広さを持つ砂漠で、メキシコ北部の複数の州とアメリカ南西部にまたがる。",
  ),
  q(
    2,
    "What is Mexico's official long-form country name?|¿Cuál es el nombre oficial largo de México?|Quel est le nom officiel long du Mexique ?|メキシコの正式な国名は?",
    ["The United Mexican States|Los Estados Unidos Mexicanos|Les États-Unis mexicains|メキシコ合衆国", "The Republic of Mexico|La República de México|La République du Mexique|メキシコ共和国", "The Federal Republic of Mexico|La República Federal de México|La République fédérale du Mexique|メキシコ連邦共和国"],
    0,
    "The name, adopted in the 19th century, reflects Mexico's structure as a federation of states, echoing the model of its northern neighbor.|El nombre, adoptado en el siglo XIX, refleja la estructura de México como federación de estados, en eco al modelo de su vecino del norte.|Le nom, adopté au XIXe siècle, reflète la structure du Mexique en tant que fédération d'États, faisant écho au modèle de son voisin du nord.|19世紀に採られたこの国名は、メキシコが州の連邦であるという構造を反映しており、北の隣国の制度に呼応している。",
  ),
  q(
    3,
    "What body of water separates the Baja California peninsula from mainland Mexico?|¿Qué cuerpo de agua separa la península de Baja California del resto de México?|Quelle étendue d'eau sépare la péninsule de Basse-Californie du reste du Mexique ?|バハカリフォルニア半島をメキシコ本土から隔てる海は?",
    ["The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海", "The Gulf of California|El golfo de California|Le golfe de Californie|カリフォルニア湾", "The Gulf of Mexico|El golfo de México|Le golfe du Mexique|メキシコ湾"],
    1,
    "Also called the Sea of Cortez, this narrow gulf separates the peninsula from the mainland states of Sonora and Sinaloa.|También llamado mar de Cortés, este golfo angosto separa la península de los estados continentales de Sonora y Sinaloa.|Aussi appelé mer de Cortés, ce golfe étroit sépare la péninsule des États continentaux de Sonora et de Sinaloa.|コルテス海とも呼ばれるこの細長い湾は、半島を本土のソノラ州・シナロア州から隔てている。",
  ),
  q(
    3,
    "What is a calaca, a common figure in Mexican folk art around Día de Muertos?|¿Qué es una calaca, una figura común del arte popular mexicano en torno al Día de Muertos?|Qu'est-ce qu'une calaca, une figure courante de l'art populaire mexicain autour du Día de Muertos ?|死者の日にまつわるメキシコ民芸によく登場する「カラカ」とは?",
    ["A skeleton figure|Una figura de esqueleto|Une figure de squelette|骸骨の姿をした像", "A tiny fairy|Un hada diminuta|Une petite fée|小さな妖精", "A masked wrestler|Un luchador enmascarado|Un catcheur masqué|覆面レスラー"],
    0,
    "Calacas are often dressed in fine clothes and shown dancing or playing music, a playful rather than frightening take on death.|Las calacas suelen vestirse con ropas elegantes y se muestran bailando o tocando música, una imagen juguetona y no aterradora de la muerte.|Les calacas sont souvent vêtues de beaux habits et représentées en train de danser ou de jouer de la musique, une image ludique plutôt qu'effrayante de la mort.|カラカはしばしば上品な装いをし、踊ったり楽器を奏でたりする姿で描かれる。死を怖いものとしてではなく、遊び心をもって捉えた表現である。",
  ),
  q(
    3,
    "Along with an eagle and a cactus, what animal appears on the Mexican flag's emblem?|Junto con un águila y un nopal, ¿qué animal aparece en el emblema de la bandera mexicana?|Avec un aigle et un cactus, quel animal apparaît sur l'emblème du drapeau mexicain ?|鷲とサボテンとともに、メキシコ国旗の紋章に描かれる動物は?",
    ["A scorpion|Un alacrán|Un scorpion|サソリ", "A serpent|Una serpiente|Un serpent|蛇", "A spider|Una araña|Une araignée|クモ"],
    1,
    "The serpent is shown gripped in the eagle's beak and talon, completing the scene from the Aztec founding legend.|La serpiente aparece sujeta en el pico y la garra del águila, completando la escena de la leyenda fundacional azteca.|Le serpent est représenté saisi dans le bec et la serre de l'aigle, complétant la scène de la légende fondatrice aztèque.|蛇は鷲のくちばしと爪に捕らえられた姿で描かれ、アステカの建国神話の場面を完成させている。",
  ),
  q(
    1,
    "What is the most widely practiced religion in Mexico?|¿Cuál es la religión más practicada en México?|Quelle est la religion la plus pratiquée au Mexique ?|メキシコで最も広く信仰されている宗教は?",
    ["Buddhism|Budismo|Bouddhisme|仏教", "Roman Catholicism|El catolicismo romano|Le catholicisme romain|カトリック", "Hinduism|Hinduismo|Hindouisme|ヒンドゥー教"],
    1,
    "Catholicism arrived with Spanish colonization and remains the majority religion today, though it is often blended with older Indigenous practices.|El catolicismo llegó con la colonización española y sigue siendo la religión mayoritaria hoy, aunque a menudo se mezcla con prácticas indígenas más antiguas.|Le catholicisme arriva avec la colonisation espagnole et reste la religion majoritaire aujourd'hui, bien qu'il soit souvent mêlé à des pratiques autochtones plus anciennes.|カトリックはスペインによる植民地化とともに伝わり、いまも多数派の宗教であり続けているが、しばしばより古い先住民の慣習と混ざり合っている。",
  ),
  q(
    2,
    "Along with the Aztec, which ancient Mesoamerican civilization is Mexico especially known for, famous for pyramids and a sophisticated calendar?|Junto con los aztecas, ¿qué civilización mesoamericana antigua es especialmente conocida en México, célebre por sus pirámides y un calendario sofisticado?|Avec les Aztèques, quelle ancienne civilisation mésoaméricaine le Mexique est-il particulièrement connu pour, célèbre pour ses pyramides et un calendrier sophistiqué ?|アステカとともに、ピラミッドと精緻な暦で知られるメキシコの代表的な古代メソアメリカ文明は?",
    ["The Inca|Los incas|Les Incas|インカ", "The Celts|Los celtas|Les Celtes|ケルト", "The Maya|Los mayas|Les Mayas|マヤ"],
    2,
    "Maya civilization flourished across southern Mexico, Guatemala, Belize and Honduras for over a thousand years, long before the Aztec Empire rose in central Mexico.|La civilización maya floreció por el sur de México, Guatemala, Belice y Honduras durante más de mil años, mucho antes de que surgiera el Imperio azteca en el centro de México.|La civilisation maya prospéra dans le sud du Mexique, au Guatemala, au Belize et au Honduras durant plus de mille ans, bien avant l'essor de l'Empire aztèque au centre du Mexique.|マヤ文明は、中央メキシコにアステカ帝国が興るよりずっと前から、メキシコ南部・グアテマラ・ベリーズ・ホンジュラスにまたがって千年以上にわたり栄えた。",
  ),
  q(
    2,
    "What is a taco, at its most basic?|En su forma más básica, ¿qué es un taco?|Qu'est-ce qu'un taco, dans sa forme la plus simple ?|最も基本的な形でいうと、タコスとは?",
    ["A filled, folded tortilla|Una tortilla rellena y doblada|Une tortilla garnie et repliée|具を包んで折りたたんだトルティーヤ", "A stuffed pastry dough pocket|Una masa de hojaldre rellena|Une pâte feuilletée fourrée|詰め物をしたパイ生地", "A cold clear soup|Una sopa fría y clara|Une soupe froide et claire|冷たく澄んだスープ"],
    0,
    "Fillings and toppings vary enormously by region, from simple grilled meat and onion to elaborate combinations found nowhere else.|Los rellenos y aderezos varían enormemente según la región, desde carne y cebolla a la parrilla hasta combinaciones elaboradas que no se encuentran en ningún otro lugar.|Les garnitures varient énormément selon la région, de la simple viande grillée et de l'oignon à des combinaisons élaborées introuvables ailleurs.|具や薬味は地方によって大きく異なり、シンプルな炙り肉と玉ねぎから、他では見られない凝った組み合わせまで幅広い。",
  ),

  // ==================== 4〜6(46問) ====================
  q(
    4,
    "What is Mexico's highest mountain?|¿Cuál es la montaña más alta de México?|Quelle est la plus haute montagne du Mexique ?|メキシコ最高峰の山は?",
    ["Popocatépetl|Popocatépetl|Popocatépetl|ポポカテペトル", "Pico de Orizaba|Pico de Orizaba|Pico de Orizaba|オリサバ山", "Iztaccíhuatl|Iztaccíhuatl|Iztaccíhuatl|イスタクシワトル"],
    1,
    "At 5,636 meters, Pico de Orizaba is also the third-highest peak in North America, after Denali and Mount Logan.|Con 5.636 metros, el Pico de Orizaba es también el tercer pico más alto de Norteamérica, tras el Denali y el Monte Logan.|Avec ses 5 636 mètres, le Pico de Orizaba est aussi le troisième plus haut sommet d'Amérique du Nord, après le Denali et le mont Logan.|標高5636mのオリサバ山は、デナリ・ローガン山に次いで北アメリカ第3位の高さでもある。",
  ),
  q(
    4,
    "Including its capital, into how many federal entities is Mexico divided?|Incluida su capital, ¿en cuántas entidades federativas se divide México?|Capitale comprise, en combien d'entités fédérales le Mexique est-il divisé ?|首都を含め、メキシコはいくつの連邦の単位に分かれているか?",
    ["20|20|20|20", "32|32|32|32", "50|50|50|50"],
    1,
    "Mexico has 31 states plus Mexico City, which functions as its own federal entity, for a total of 32.|México tiene 31 estados más la Ciudad de México, que funciona como su propia entidad federativa, para un total de 32.|Le Mexique compte 31 États plus Mexico, qui fonctionne comme sa propre entité fédérale, pour un total de 32.|メキシコには31の州に加え、それ自体が一つの連邦単位として機能するメキシコシティがあり、合計32になる。",
  ),
  q(
    4,
    "Tenochtitlan, built on an island in a lake, was the capital of which empire?|Tenochtitlan, construida en una isla de un lago, fue capital de qué imperio?|Tenochtitlan, bâtie sur une île d'un lac, fut la capitale de quel empire ?|湖の島の上に築かれたテノチティトランは、どの帝国の都だったか?",
    ["The Inca Empire|El Imperio inca|L'Empire inca|インカ帝国", "The Aztec Empire|El Imperio azteca|L'Empire aztèque|アステカ帝国", "The Maya civilization|La civilización maya|La civilisation maya|マヤ文明"],
    1,
    "Tenochtitlan grew into one of the largest cities in the world by the early 1500s, with causeways, canals and floating gardens called chinampas.|Tenochtitlan se convirtió en una de las mayores ciudades del mundo a principios del siglo XVI, con calzadas, canales y jardines flotantes llamados chinampas.|Tenochtitlan devint l'une des plus grandes villes du monde au début du XVIe siècle, avec des chaussées, des canaux et des jardins flottants appelés chinampas.|テノチティトランは16世紀初頭までに世界有数の大都市に育ち、土手道や運河、「チナンパ」と呼ばれる浮き庭園を備えていた。",
  ),
  q(
    4,
    "In what year did Hernán Cortés's forces bring down the Aztec capital?|¿En qué año las fuerzas de Hernán Cortés derrocaron la capital azteca?|En quelle année les forces d'Hernán Cortés firent-elles tomber la capitale aztèque ?|エルナン・コルテスの軍勢がアステカの都を陥落させたのは何年か?",
    ["1492|1492|1492|1492年", "1521|1521|1521|1521年", "1607|1607|1607|1607年"],
    1,
    "The siege of Tenochtitlan ended a two-year campaign that combined Spanish forces with tens of thousands of allied Indigenous warriors from rival states.|El sitio de Tenochtitlan puso fin a una campaña de dos años que combinó fuerzas españolas con decenas de miles de guerreros indígenas aliados de estados rivales.|Le siège de Tenochtitlan mit fin à une campagne de deux ans combinant les forces espagnoles à des dizaines de milliers de guerriers autochtones alliés d'États rivaux.|テノチティトラン包囲戦は、スペイン軍と敵対勢力から加わった数万の先住民の同盟軍を合わせた2年に及ぶ遠征の末に終わった。",
  ),
  q(
    5,
    "The 1846–48 Mexican-American War ended with Mexico ceding roughly how much of its territory to the United States?|La guerra entre México y EE. UU. de 1846-48 terminó con México cediendo aproximadamente qué parte de su territorio a Estados Unidos?|La guerre américano-mexicaine de 1846-1848 s'acheva avec la cession par le Mexique d'environ quelle part de son territoire aux États-Unis ?|1846〜48年の米墨戦争は、メキシコが領土のおよそどれくらいをアメリカに割譲して終わったか?",
    ["Nearly all of it|Casi todo|Presque tout|ほぼ全土", "About a tenth|Cerca de una décima parte|Environ un dixième|およそ十分の一", "Roughly half|Aproximadamente la mitad|Environ la moitié|およそ半分"],
    2,
    "The 1848 Treaty of Guadalupe Hidalgo transferred land that today makes up California, Nevada, Utah and parts of several other US states.|El Tratado de Guadalupe Hidalgo de 1848 transfirió tierras que hoy forman California, Nevada, Utah y partes de varios otros estados de EE. UU.|Le traité de Guadalupe Hidalgo de 1848 transféra des terres qui forment aujourd'hui la Californie, le Nevada, l'Utah et des parties de plusieurs autres États américains.|1848年のグアダルーペ・イダルゴ条約により、いまのカリフォルニア州・ネバダ州・ユタ州や他の複数の州の一部にあたる土地がアメリカへ渡った。",
  ),
  q(
    5,
    // **もとは「独立戦争が始まったのは何年か」だった。**グアナフアトのカードが
    // 「1810年、独立戦争の緒戦で反乱軍は穀物倉庫を制圧した」と書いており、
    // カードを読んだ人は考えずに答えられた(`check-quiz.mjs` が検出、難易度5)。
    // 始まりではなく**終わりの年**を問う形に変えた。1821年はどのカードにも出てこない。
    "Mexico's War of Independence began in 1810. In what year did it finally end?|La guerra de independencia de México comenzó en 1810. ¿En qué año terminó finalmente?|La guerre d'indépendance du Mexique débuta en 1810. En quelle année s'acheva-t-elle enfin ?|メキシコの独立戦争は1810年に始まった。では、終わったのは何年か?",
    ["1815|1815|1815|1815年", "1821|1821|1821|1821年", "1836|1836|1836|1836年"],
    1,
    "Eleven years. The Grito de Dolores of September 1810 opened a war that outlasted almost everyone who started it — Hidalgo was shot in 1811, Morelos in 1815. It ended in 1821 not with the rebels winning outright but with Agustín de Iturbide, a royalist commander sent to crush them, changing sides and negotiating the Treaty of Córdoba. He crowned himself emperor the following year and was deposed within two.|Once años. El Grito de Dolores de septiembre de 1810 abrió una guerra que sobrevivió a casi todos los que la iniciaron: Hidalgo fue fusilado en 1811, Morelos en 1815. Terminó en 1821 no con una victoria rebelde, sino con Agustín de Iturbide, comandante realista enviado a aplastarlos, cambiando de bando y negociando el Tratado de Córdoba. Se coronó emperador al año siguiente y fue depuesto en menos de dos.|Onze ans. Le Grito de Dolores de septembre 1810 ouvrit une guerre qui survécut à presque tous ceux qui l'avaient déclenchée : Hidalgo fut fusillé en 1811, Morelos en 1815. Elle s'acheva en 1821 non par une victoire des insurgés, mais parce qu'Agustín de Iturbide, commandant royaliste envoyé pour les écraser, changea de camp et négocia le traité de Córdoba. Il se couronna empereur l'année suivante et fut déposé en moins de deux ans.|11年かかった。1810年9月の「ドロレスの叫び」で始まった戦争は、始めた者のほとんどより長く続いた。イダルゴは1811年に、モレーロスは1815年に銃殺されている。1821年に終わったのは反乱軍が勝ち切ったからではなく、**彼らを鎮圧するために送られた王党派の指揮官アグスティン・デ・イトゥルビデが寝返り**、コルドバ条約をまとめたからである。彼は翌年みずから皇帝を名乗り、2年ももたずに退けられた。",
  ),
  q(
    5,
    "Who is often remembered as Mexico's first Indigenous president, serving in the mid-1800s?|¿A quién se recuerda a menudo como el primer presidente indígena de México, que gobernó a mediados del siglo XIX?|Qui est souvent considéré comme le premier président autochtone du Mexique, en fonction au milieu du XIXe siècle ?|19世紀半ばに在任した、メキシコ初の先住民出身大統領としてしばしば記憶される人物は?",
    ["Porfirio Díaz|Porfirio Díaz|Porfirio Díaz|ポルフィリオ・ディアス", "Benito Juárez|Benito Juárez|Benito Juárez|ベニート・フアレス", "Francisco Madero|Francisco Madero|Francisco Madero|フランシスコ・マデロ"],
    1,
    "Juárez, of Zapotec descent, led liberal reforms separating church and state and is honored today on Mexican banknotes and a national holiday.|Juárez, de origen zapoteco, encabezó reformas liberales que separaron Iglesia y Estado, y hoy se le honra en billetes mexicanos y con un día festivo nacional.|Juárez, d'ascendance zapotèque, mena des réformes libérales séparant l'Église et l'État, et est aujourd'hui honoré sur les billets mexicains et par un jour férié national.|サポテカ族の血を引くフアレスは、教会と国家を分離する自由主義改革を主導し、いまもメキシコの紙幣や国民の祝日で称えられている。",
  ),
  q(
    5,
    "What is the roughly 35-year period of rule under Porfirio Díaz, ending in 1911, commonly called?|¿Cómo se llama comúnmente el periodo de gobierno de unos 35 años de Porfirio Díaz, que terminó en 1911?|Comment appelle-t-on communément la période de gouvernement d'environ 35 ans de Porfirio Díaz, qui prit fin en 1911 ?|1911年に終わった、ポルフィリオ・ディアスによるおよそ35年の統治期間は何と呼ばれるか?",
    ["The Reconquista|La Reconquista|La Reconquista|レコンキスタ", "The Porfiriato|El Porfiriato|Le Porfiriat|ポルフィリアート", "The Directorate|El Directorio|Le Directoire|ディレクトワール"],
    1,
    "The Porfiriato brought railways and foreign investment but also deep inequality, grievances that helped spark the Mexican Revolution in 1910.|El Porfiriato trajo ferrocarriles e inversión extranjera, pero también una profunda desigualdad, agravios que ayudaron a encender la Revolución mexicana en 1910.|Le Porfiriat apporta chemins de fer et investissements étrangers, mais aussi de profondes inégalités, des griefs qui contribuèrent à déclencher la révolution mexicaine en 1910.|ポルフィリアートは鉄道と外国資本をもたらした一方で深刻な格差も生み、その不満が1910年のメキシコ革命の火種の一つになった。",
  ),
  q(
    5,
    "Which political party governed Mexico continuously for 71 years, until losing the presidency in 2000?|¿Qué partido político gobernó México de forma continua durante 71 años, hasta perder la presidencia en 2000?|Quel parti politique gouverna le Mexique sans interruption pendant 71 ans, jusqu'à perdre la présidence en 2000 ?|2000年に大統領職を失うまで71年間、途切れることなくメキシコを統治した政党は?",
    ["PAN|PAN|PAN|国民行動党(PAN)", "Morena|Morena|Morena|モレナ", "PRI|PRI|PRI|制度的革命党(PRI)"],
    2,
    "The Institutional Revolutionary Party, PRI, held power from 1929 until Vicente Fox of the PAN won the presidency in the 2000 election.|El Partido Revolucionario Institucional, PRI, gobernó desde 1929 hasta que Vicente Fox, del PAN, ganó la presidencia en las elecciones de 2000.|Le Parti révolutionnaire institutionnel, PRI, gouverna à partir de 1929 jusqu'à ce que Vicente Fox, du PAN, remporte la présidence lors de l'élection de 2000.|制度的革命党(PRI)は1929年から政権を握り続け、2000年の選挙で国民行動党(PAN)のビセンテ・フォックスが勝つまで続いた。",
  ),
  q(
    6,
    "In 1994, an armed Indigenous uprising began in which southern Mexican state, partly in protest of a new free-trade agreement?|En 1994, ¿en qué estado del sur de México comenzó un alzamiento armado indígena, en parte como protesta contra un nuevo tratado de libre comercio?|En 1994, dans quel État du sud du Mexique débuta un soulèvement autochtone armé, en partie pour protester contre un nouvel accord de libre-échange ?|1994年、新しい自由貿易協定への抗議も動機の一つとして武装先住民蜂起が始まったメキシコ南部の州は?",
    ["Yucatán|Yucatán|Yucatán|ユカタン州", "Oaxaca|Oaxaca|Oaxaca|オアハカ州", "Chiapas|Chiapas|Chiapas|チアパス州"],
    2,
    "The Zapatista Army of National Liberation rose up in Chiapas on the very day NAFTA took effect, January 1, 1994.|El Ejército Zapatista de Liberación Nacional se alzó en Chiapas el mismo día en que entró en vigor el TLCAN, el 1 de enero de 1994.|L'Armée zapatiste de libération nationale se souleva au Chiapas le jour même où l'ALENA entra en vigueur, le 1er janvier 1994.|サパティスタ民族解放軍は、NAFTA(北米自由貿易協定)が発効したまさにその日、1994年1月1日にチアパスで蜂起した。",
  ),
  q(
    5,
    "What free-trade agreement between Mexico, the United States and Canada took effect in 1994?|¿Qué tratado de libre comercio entre México, Estados Unidos y Canadá entró en vigor en 1994?|Quel accord de libre-échange entre le Mexique, les États-Unis et le Canada entra en vigueur en 1994 ?|1994年に発効した、メキシコ・アメリカ・カナダの自由貿易協定は?",
    ["OPEC|OPEP|OPEP|OPEC(石油輸出国機構)", "NAFTA|TLCAN|ALENA|NAFTA(北米自由貿易協定)", "Mercosur|Mercosur|Mercosur|メルコスール"],
    1,
    "NAFTA was replaced in 2020 by an updated agreement known as the USMCA, or T-MEC in Mexico.|El TLCAN fue reemplazado en 2020 por un acuerdo actualizado conocido como T-MEC, o USMCA en inglés.|L'ALENA fut remplacé en 2020 par un accord actualisé connu sous le nom d'USMCA, ou T-MEC au Mexique.|NAFTAは2020年、メキシコでT-MEC、英語圏でUSMCAと呼ばれる更新版の協定に置き換えられた。",
  ),
  q(
    4,
    "What is the name of Mexico's state-owned oil company, nationalized in 1938?|¿Cómo se llama la petrolera estatal de México, nacionalizada en 1938?|Comment s'appelle la compagnie pétrolière d'État du Mexique, nationalisée en 1938 ?|1938年に国有化された、メキシコの国営石油会社の名は?",
    ["Aramco|Aramco|Aramco|アラムコ", "Pemex|Pemex|Pemex|ペメックス", "Petrobras|Petrobras|Petrobras|ペトロブラス"],
    1,
    "Pemex, short for Petróleos Mexicanos, has long been one of the country's largest employers and a central pillar of the national economy.|Pemex, abreviatura de Petróleos Mexicanos, ha sido durante mucho tiempo uno de los mayores empleadores del país y un pilar central de la economía nacional.|Pemex, abréviation de Petróleos Mexicanos, est depuis longtemps l'un des plus grands employeurs du pays et un pilier central de l'économie nationale.|「ペメックス」ことペトロレオス・メヒカノス社は、長らく国内最大級の雇用主であり、国民経済の中心的な柱の一つであり続けている。",
  ),
  q(
    5,
    "The 1968 Summer Olympics, held in Mexico City, were the first Olympics held in which part of the world?|Los Juegos Olímpicos de verano de 1968, celebrados en la Ciudad de México, fueron los primeros celebrados en qué parte del mundo?|Les Jeux olympiques d'été de 1968, tenus à Mexico, furent les premiers organisés dans quelle partie du monde ?|メキシコシティで開催された1968年夏季オリンピックは、世界のどの地域で初めて開かれた大会だったか?",
    ["Africa|África|Afrique|アフリカ", "Latin America|América Latina|L'Amérique latine|ラテンアメリカ", "An Arabic-speaking country|Un país de habla árabe|Un pays arabophone|アラビア語圏の国"],
    1,
    "Mexico City remains, to date, the only Latin American city to have hosted a Summer Olympics.|La Ciudad de México sigue siendo, hasta ahora, la única ciudad latinoamericana que ha albergado unos Juegos Olímpicos de verano.|Mexico reste, à ce jour, la seule ville d'Amérique latine à avoir accueilli des Jeux olympiques d'été.|メキシコシティは、いまのところ夏季オリンピックを開催した唯一のラテンアメリカの都市である。",
  ),
  q(
    5,
    "Because of its high altitude, the 1968 Mexico City Olympics saw unusually strong performances in which kind of event?|Debido a su gran altitud, los Juegos Olímpicos de Ciudad de México de 1968 vieron marcas inusualmente buenas en qué tipo de prueba?|En raison de son altitude élevée, les Jeux olympiques de Mexico de 1968 virent des performances exceptionnelles dans quel type d'épreuve ?|標高の高さゆえに、1968年のメキシコシティ五輪で特に好記録が出たのはどの種目か?",
    ["Marathon and endurance events|Pruebas de maratón y resistencia|Épreuves de marathon et d'endurance|マラソンなど持久系種目", "Short sprints and jumps|Carreras cortas y saltos|Sprints et sauts|短距離走と跳躍種目", "Swimming|Natación|Natation|水泳"],
    1,
    "Thinner air at altitude offers less resistance over short, explosive efforts, and Bob Beamon's long jump record set there stood for 23 years.|El aire más enrarecido de la altitud ofrece menos resistencia en esfuerzos cortos y explosivos, y el récord de salto de longitud de Bob Beamon, fijado allí, se mantuvo 23 años.|L'air plus rare en altitude offre moins de résistance lors d'efforts courts et explosifs, et le record de saut en longueur de Bob Beamon, établi là-bas, tint 23 ans.|標高の高さゆえ空気が薄く、短く瞬発的な動きへの抵抗が減る。ここで樹立されたボブ・ビーモンの走幅跳の世界記録は23年間破られなかった。",
  ),
  q(
    6,
    "About what magnitude was the devastating earthquake that struck Mexico City in 1985?|¿De qué magnitud aproximada fue el devastador terremoto que sacudió la Ciudad de México en 1985?|De quelle magnitude approximative fut le séisme dévastateur qui frappa Mexico en 1985 ?|1985年にメキシコシティを襲った壊滅的な地震のおよそのマグニチュードは?",
    ["5.5|5,5|5,5|5.5", "8.0|8,0|8,0|8.0", "9.5|9,5|9,5|9.5"],
    1,
    "The quake originated off the Pacific coast but caused catastrophic damage in the capital because the old lakebed soil it sits on amplified the shaking.|El terremoto se originó frente a la costa del Pacífico, pero causó daños catastróficos en la capital porque el suelo del antiguo lecho lacustre sobre el que se asienta amplificó el temblor.|Le séisme prit naissance au large de la côte Pacifique, mais causa des dégâts catastrophiques dans la capitale car le sol de l'ancien lit du lac sur lequel elle repose amplifia les secousses.|地震は太平洋沖で発生したが、首都が建つ旧湖底の地盤が揺れを増幅させたため、市内では壊滅的な被害が出た。",
  ),
  q(
    5,
    "Which Mexican painter, married to Diego Rivera, is known for surrealist self-portraits?|¿Qué pintora mexicana, casada con Diego Rivera, es conocida por sus autorretratos surrealistas?|Quelle peintre mexicaine, mariée à Diego Rivera, est connue pour ses autoportraits surréalistes ?|ディエゴ・リベラの妻で、シュルレアリスム風の自画像で知られるメキシコの画家は?",
    ["Remedios Varo|Remedios Varo|Remedios Varo|レメディオス・バロ", "Leonora Carrington|Leonora Carrington|Leonora Carrington|レオノーラ・キャリントン", "Frida Kahlo|Frida Kahlo|Frida Kahlo|フリーダ・カーロ"],
    2,
    "Kahlo's paintings often drew on her own physical pain and Mexican folk imagery, and she remains one of the most widely recognized Latin American artists.|Los cuadros de Kahlo a menudo se inspiraban en su propio dolor físico y en la imaginería popular mexicana, y sigue siendo una de las artistas latinoamericanas más reconocidas.|Les tableaux de Kahlo s'inspiraient souvent de sa propre douleur physique et de l'imagerie populaire mexicaine, et elle reste l'une des artistes latino-américaines les plus reconnues.|カーロの絵はしばしば自身の身体の痛みとメキシコの民衆的な図像から着想を得ており、いまもラテンアメリカを代表する画家の一人であり続けている。",
  ),
  q(
    4,
    "Diego Rivera is best known for large-scale works in which medium?|¿En qué disciplina es más conocido Diego Rivera por sus obras a gran escala?|Diego Rivera est-il surtout connu pour ses œuvres à grande échelle dans quel médium ?|ディエゴ・リベラが大規模な作品で最もよく知られる技法は?",
    ["Stained glass|Vitrales|Vitraux|ステンドグラス", "Murals|Murales|Fresques murales|壁画", "Tapestry|Tapices|Tapisserie|タペストリー"],
    1,
    "Rivera's murals on public buildings often depicted Mexican history and workers' struggles, part of a movement meant to bring art out of galleries and into daily life.|Los murales de Rivera en edificios públicos solían representar la historia de México y las luchas obreras, parte de un movimiento que buscaba sacar el arte de las galerías y llevarlo a la vida cotidiana.|Les fresques de Rivera sur des bâtiments publics dépeignaient souvent l'histoire du Mexique et les luttes ouvrières, dans le cadre d'un mouvement visant à faire sortir l'art des galeries pour l'ancrer dans la vie quotidienne.|リベラが公共建築に描いた壁画は、しばしばメキシコの歴史や労働者の闘いを題材にした。美術を画廊の外へ、日常の暮らしの中へ持ち出そうとする運動の一環だった。",
  ),
  q(
    6,
    "Which Mexican writer won the Nobel Prize in Literature in 1990?|¿Qué escritor mexicano ganó el Premio Nobel de Literatura en 1990?|Quel écrivain mexicain remporta le prix Nobel de littérature en 1990 ?|1990年にノーベル文学賞を受賞したメキシコの作家は?",
    ["Gabriel García Márquez|Gabriel García Márquez|Gabriel García Márquez|ガブリエル・ガルシア・マルケス", "Octavio Paz|Octavio Paz|Octavio Paz|オクタビオ・パス", "Carlos Fuentes|Carlos Fuentes|Carlos Fuentes|カルロス・フエンテス"],
    1,
    "Paz remains, to date, the only Mexican-born writer to win the Nobel Prize in Literature; García Márquez, a common source of confusion, was Colombian.|Paz sigue siendo, hasta hoy, el único escritor nacido en México en ganar el Nobel de Literatura; García Márquez, fuente común de confusión, era colombiano.|Paz reste, à ce jour, le seul écrivain né au Mexique à avoir remporté le prix Nobel de littérature ; García Márquez, source fréquente de confusion, était colombien.|パスはいまのところ、ノーベル文学賞を受賞した唯一のメキシコ生まれの作家である。しばしば混同されるガルシア・マルケスはコロンビア人である。",
  ),
  q(
    4,
    "What is a lucha libre wrestler traditionally known for wearing?|¿Por qué suele ser conocido tradicionalmente un luchador de lucha libre?|Qu'est-ce qu'un lutteur de lucha libre est traditionnellement connu pour porter ?|ルチャ・リブレのレスラーが伝統的に身に着けることで知られるものは?",
    ["A top hat|Un sombrero de copa|Un haut-de-forme|シルクハット", "A mask|Una máscara|Un masque|覆面マスク", "A cape only, no mask|Solo una capa, sin máscara|Seulement une cape, sans masque|マスクなしのマントのみ"],
    1,
    "Removing a wrestler's mask in a lost match, called a mask-versus-mask bout, is treated as one of the sport's most dramatic possible stakes.|Quitarle la máscara a un luchador tras perder un combate, llamado lucha de máscara contra máscara, se considera una de las apuestas más dramáticas del deporte.|Retirer le masque d'un lutteur après une défaite, un combat dit « masque contre masque », est considéré comme l'un des enjeux les plus dramatiques du sport.|敗れた選手のマスクを剥ぐ「マスカラ・コントラ・マスカラ(覆面対決)」は、この競技で最も劇的な賭け金の一つとされる。",
  ),
  q(
    5,
    "Which fermented agave spirit, made in various regions of Mexico from many agave species, is the broader category that tequila belongs to?|¿Qué destilado de agave fermentado, elaborado en varias regiones de México con muchas especies de agave, es la categoría más amplia a la que pertenece el tequila?|Quel spiritueux d'agave fermenté, produit dans diverses régions du Mexique à partir de nombreuses espèces d'agave, est la catégorie plus large à laquelle appartient la tequila ?|メキシコの様々な地方で多種のアガベから造られる、テキーラが属するより広い蒸留酒の分類は?",
    ["Rum|Ron|Rhum|ラム", "Pisco|Pisco|Pisco|ピスコ", "Mezcal|Mezcal|Mezcal|メスカル"],
    2,
    "Tequila is legally a type of mezcal made specifically from blue agave in a defined region, while mezcal as a category can use dozens of agave species.|El tequila es legalmente un tipo de mezcal hecho específicamente con agave azul en una región definida, mientras que el mezcal como categoría puede usar docenas de especies de agave.|La tequila est légalement un type de mezcal fait spécifiquement à partir d'agave bleu dans une région définie, tandis que le mezcal en tant que catégorie peut utiliser des dizaines d'espèces d'agave.|テキーラは法律上、決められた地域でブルーアガベだけから造られるメスカルの一種であり、メスカルという分類全体では何十種ものアガベが使われうる。",
  ),
  q(
    4,
    "Which Nahuatl word gave English the word for a bitter drink made from cacao?|¿Qué palabra náhuatl dio origen a la palabra española/inglesa para una bebida amarga hecha de cacao?|Quel mot nahuatl a donné en français/anglais le mot pour une boisson amère faite de cacao ?|カカオから作る飲み物を指す語の由来となったナワトル語は?",
    ["Xocolatl|Xocolatl|Xocolatl|ショコラトル", "Tepache|Tepache|Tepache|テパチェ", "Atole|Atole|Atole|アトレ"],
    0,
    "The Aztecs drank a bitter, unsweetened version of the beverage, often spiced with chili, long before sugar turned it into modern chocolate.|Los aztecas bebían una versión amarga y sin azúcar de la bebida, a menudo condimentada con chile, mucho antes de que el azúcar la convirtiera en el chocolate moderno.|Les Aztèques buvaient une version amère et non sucrée de cette boisson, souvent épicée au piment, bien avant que le sucre n'en fasse le chocolat moderne.|アステカの人々は、砂糖が加わって今日のチョコレートになるずっと前から、しばしば唐辛子で風味づけした甘くない苦い飲み物としてこれを飲んでいた。",
  ),
  q(
    4,
    "Which Nahuatl word is the direct root of the English and Spanish word for 'tomato'?|¿Qué palabra náhuatl es la raíz directa de la palabra 'tomate' en español e inglés?|Quel mot nahuatl est la racine directe du mot « tomate » en français et en espagnol ?|英語やスペイン語の「トマト」の直接の語源となったナワトル語は?",
    ["Tamatl|Tamatl|Tamatl|タマトル", "Tomatl|Tomatl|Tomatl|トマトル", "Tumati|Tumati|Tumati|トゥマティ"],
    1,
    "The Nahuatl word tomatl referred to the fruit long before Spanish colonizers carried it to Europe, where it eventually spread worldwide.|La palabra náhuatl tomatl designaba la fruta mucho antes de que los colonizadores españoles la llevaran a Europa, desde donde acabó extendiéndose por el mundo.|Le mot nahuatl tomatl désignait le fruit bien avant que les colonisateurs espagnols ne l'apportent en Europe, d'où il finit par se répandre dans le monde entier.|ナワトル語のトマトルという語は、スペインの植民者がヨーロッパへ持ち帰り、やがて世界中に広まるずっと前から、この果実を指していた。",
  ),
  q(
    4,
    "The English word 'coyote' comes from the Nahuatl word 'coyōtl', which refers to what animal?|La palabra inglesa 'coyote' viene de la palabra náhuatl 'coyōtl', que se refiere a qué animal?|Le mot « coyote » vient du mot nahuatl « coyōtl », qui désigne quel animal ?|「コヨーテ」という語の由来であるナワトル語「コヨートル」が指す動物は?",
    ["The same wild dog|El mismo cánido salvaje|Le même chien sauvage|同じ野生のイヌ科動物", "A type of eagle|Un tipo de águila|Une sorte d'aigle|ある種の鷲", "A wild boar|Un jabalí|Un sanglier|イノシシ"],
    0,
    "Coyotes range across most of North America today, and the Nahuatl name for them passed into Spanish and then English largely unchanged.|Los coyotes se distribuyen hoy por la mayor parte de Norteamérica, y su nombre náhuatl pasó al español y luego al inglés casi sin cambios.|Les coyotes se répartissent aujourd'hui sur la majeure partie de l'Amérique du Nord, et leur nom nahuatl passa en espagnol puis en anglais presque inchangé.|コヨーテは今日、北アメリカの大半に生息しており、そのナワトル語の名はほとんど形を変えずにスペイン語、そして英語へと伝わった。",
  ),
  q(
    5,
    "How many Indigenous languages are officially recognized as national languages in Mexico, alongside Spanish?|¿Cuántas lenguas indígenas están oficialmente reconocidas como lenguas nacionales en México, junto al español?|Combien de langues autochtones sont officiellement reconnues comme langues nationales au Mexique, aux côtés de l'espagnol ?|メキシコでスペイン語とともに公式に国語として認められている先住民言語はいくつか?",
    ["12|12|12|12", "68|68|68|68", "200|200|200|200"],
    1,
    "Mexico's national languages law, passed in 2003, recognizes 68 Indigenous linguistic groupings, which together include hundreds of distinct variants.|La ley de lenguas nacionales de México, aprobada en 2003, reconoce 68 agrupaciones lingüísticas indígenas, que en conjunto incluyen cientos de variantes distintas.|La loi mexicaine sur les langues nationales, adoptée en 2003, reconnaît 68 regroupements linguistiques autochtones, comprenant ensemble des centaines de variantes distinctes.|2003年に成立したメキシコの国語法は、68の先住民言語グループを認めており、それらを合わせると何百もの異なる変種が含まれる。",
  ),
  q(
    5,
    "The whale shark, the largest fish species in the world, gathers seasonally off which Mexican coast?|El tiburón ballena, la especie de pez más grande del mundo, se reúne de forma estacional frente a qué costa mexicana?|Le requin-baleine, la plus grande espèce de poisson au monde, se rassemble de façon saisonnière au large de quelle côte mexicaine ?|世界最大の魚類であるジンベエザメが季節ごとに集まるメキシコの海岸は?",
    ["The Yucatán coast, near Isla Holbox|La costa de Yucatán, cerca de Isla Holbox|La côte du Yucatán, près d'Isla Holbox|イスラ・オルボス沖のユカタン沿岸", "The Baja California desert interior|El interior desértico de Baja California|L'intérieur désertique de la Basse-Californie|バハカリフォルニアの砂漠内陸部", "The high plateau lakes near Mexico City|Los lagos del altiplano cerca de la Ciudad de México|Les lacs du haut plateau près de Mexico|メキシコシティ近郊の高原の湖"],
    0,
    "Despite their enormous size, whale sharks are filter feeders that pose no danger to swimmers, and boat tours run seasonally to see the aggregation.|Pese a su enorme tamaño, los tiburones ballena se alimentan filtrando y no suponen peligro para los bañistas, y hay excursiones en barco de temporada para verlos.|Malgré leur taille énorme, les requins-baleines se nourrissent par filtration et ne présentent aucun danger pour les baigneurs, et des excursions en bateau saisonnières permettent de les observer.|その巨体にもかかわらず、ジンベエザメは濾過摂食者で遊泳者に危険はなく、この時期には群れを見るための季節限定のボートツアーが出る。",
  ),
  q(
    5,
    "The axolotl, a salamander famous for keeping its larval gills into adulthood, is native to canals near which city?|El ajolote, una salamandra famosa por conservar sus branquias larvarias en la edad adulta, es nativo de los canales cercanos a qué ciudad?|L'axolotl, une salamandre célèbre pour conserver ses branchies larvaires à l'âge adulte, est natif des canaux près de quelle ville ?|幼生のえらを成体になっても保ち続けることで知られるサンショウウオ「アホロートル」の原産地である運河があるのは、どの町の近くか?",
    ["Guadalajara|Guadalajara|Guadalajara|グアダラハラ", "Mexico City|Ciudad de México|Mexico|メキシコシティ", "Monterrey|Monterrey|Monterrey|モンテレイ"],
    1,
    "The axolotl survives today mainly in the shrinking canals of Xochimilco and is critically endangered in the wild due to pollution and invasive fish.|El ajolote sobrevive hoy sobre todo en los menguantes canales de Xochimilco y está en peligro crítico en estado silvestre por la contaminación y los peces invasores.|L'axolotl survit aujourd'hui surtout dans les canaux rétrécissants de Xochimilco et est en danger critique à l'état sauvage à cause de la pollution et des poissons invasifs.|アホロートルは現在、縮小を続けるソチミルコの運河に主に生き残っており、汚染と外来魚の影響で野生個体は絶滅寸前とされている。",
  ),
  q(
    6,
    "What is the modern name for the record-holding longest known underwater cave system on Earth, located beneath the Yucatán Peninsula?|¿Cuál es el nombre del sistema de cuevas sumergidas más largo conocido del mundo, situado bajo la península de Yucatán?|Quel est le nom du plus long système de grottes sous-marines connu au monde, situé sous la péninsule du Yucatán ?|ユカタン半島の地下にある、世界最長として記録されている水没洞窟網の名は?",
    ["Mammoth Cave|Cueva Mammoth|Grotte du Mammouth|マンモス・ケイブ", "Postojna Cave|Cueva de Postojna|Grotte de Postojna|ポストイナ鍾乳洞", "Sistema Sac Actún|Sistema Sac Actún|Système Sac Actún|サック・アクトゥン洞窟系"],
    2,
    "After being connected to a neighboring system in 2018, Sistema Sac Actún was confirmed to run for more than 300 kilometers underground.|Tras conectarse con un sistema vecino en 2018, se confirmó que el Sistema Sac Actún se extiende por más de 300 kilómetros bajo tierra.|Après avoir été relié à un système voisin en 2018, le Système Sac Actún fut confirmé comme s'étendant sur plus de 300 kilomètres sous terre.|2018年に隣接する洞窟系とつながっていることが確認され、サック・アクトゥン洞窟系は地下300kmを超える長さがあると分かった。",
  ),
  q(
    5,
    "Which Mexican boxer, nicknamed the 'Great Mexican Champion,' is often ranked among the greatest boxers in history?|¿Qué boxeador mexicano, apodado el 'Gran Campeón Mexicano,' suele figurar entre los más grandes de la historia?|Quel boxeur mexicain, surnommé le « Gran Campeón Mexicano », est souvent classé parmi les plus grands de l'histoire ?|「グラン・カンペオン・メヒカーノ(偉大なるメキシコの王者)」と呼ばれ、歴史上屈指の名ボクサーとされることが多いメキシコ人選手は?",
    ["Julio César Chávez|Julio César Chávez|Julio César Chávez|フリオ・セサール・チャベス", "Muhammad Ali|Muhammad Ali|Muhammad Ali|モハメド・アリ", "Manny Pacquiao|Manny Pacquiao|Manny Pacquiao|マニー・パッキャオ"],
    0,
    "Chávez once went undefeated for over a decade, a professional record of 87 wins that remains among the most storied in boxing.|Chávez estuvo una vez más de una década invicto, un récord profesional de 87 victorias que sigue siendo uno de los más legendarios del boxeo.|Chávez resta invaincu pendant plus d'une décennie, un palmarès professionnel de 87 victoires qui demeure l'un des plus légendaires de la boxe.|チャベスは一時期十年以上にわたって無敗を続け、87連勝というボクシング界でも屈指の伝説的な記録を打ち立てた。",
  ),
  q(
    4,
    "Before 2026, how many times had Mexico hosted the men's FIFA World Cup?|Antes de 2026, ¿cuántas veces había sido México sede de la Copa Mundial de fútbol masculino de la FIFA?|Avant 2026, combien de fois le Mexique avait-il accueilli la Coupe du monde de football masculin de la FIFA ?|2026年より前、メキシコは男子FIFAワールドカップを何回開催していたか?",
    ["Once|Una vez|Une fois|1回", "Twice|Dos veces|Deux fois|2回", "Three times|Tres veces|Trois fois|3回"],
    1,
    "Mexico hosted the tournament in 1970 and again in 1986, making it, for decades, the only country to have hosted the men's World Cup twice.|México fue sede del torneo en 1970 y de nuevo en 1986, lo que lo convirtió, durante décadas, en el único país en albergar dos veces el Mundial masculino.|Le Mexique accueillit le tournoi en 1970 puis en 1986, en faisant, pendant des décennies, le seul pays à avoir accueilli deux fois la Coupe du monde masculine.|メキシコは1970年と1986年の二度にわたって大会を開催し、何十年ものあいだ男子ワールドカップを二度開催した唯一の国だった。",
  ),
  q(
    4,
    "Which stadium in Mexico City has hosted two FIFA World Cup finals?|¿Qué estadio de la Ciudad de México ha sido sede de dos finales de la Copa Mundial de la FIFA?|Quel stade de Mexico a accueilli deux finales de la Coupe du monde de la FIFA ?|メキシコシティにあり、FIFAワールドカップの決勝を二度開催したスタジアムは?",
    ["Estadio Azteca|Estadio Azteca|Estadio Azteca|アステカ・スタジアム", "Wembley Stadium|Estadio Wembley|Stade de Wembley|ウェンブリー・スタジアム", "Maracanã|Maracaná|Maracanã|マラカナン・スタジアム"],
    0,
    "Estadio Azteca hosted the 1970 and 1986 finals, including Diego Maradona's famous 'Hand of God' match earlier in the 1986 tournament.|El Estadio Azteca albergó las finales de 1970 y 1986, incluido el célebre partido de la 'mano de Dios' de Diego Maradona, jugado antes en el torneo de 1986.|Le stade Azteca accueillit les finales de 1970 et 1986, dont le célèbre match de la « main de Dieu » de Diego Maradona, disputé plus tôt lors du tournoi de 1986.|アステカ・スタジアムは1970年と1986年の決勝を開催し、1986年大会の別の試合ではディエゴ・マラドーナの有名な「神の手」ゴールの舞台にもなった。",
  ),
  q(
    5,
    "Mexico is the world's largest producer and exporter of which fruit, widely shipped to the United States?|México es el mayor productor y exportador mundial de qué fruta, muy exportada a Estados Unidos?|Le Mexique est le plus grand producteur et exportateur mondial de quel fruit, largement expédié aux États-Unis ?|メキシコが世界最大の生産国かつ輸出国で、アメリカへ大量に出荷される果物は?",
    ["Banana|Plátano|Banane|バナナ", "Avocado|Aguacate|Avocat|アボカド", "Mango|Mango|Mangue|マンゴー"],
    1,
    "The state of Michoacán alone supplies a large share of the world's avocado exports, and demand has grown enormously alongside guacamole's global popularity.|Solo el estado de Michoacán suministra una gran parte de las exportaciones mundiales de aguacate, y la demanda ha crecido enormemente junto con la popularidad global del guacamole.|Le seul État du Michoacán fournit une large part des exportations mondiales d'avocat, et la demande a énormément crû avec la popularité mondiale du guacamole.|ミチョアカン州だけで世界のアボカド輸出の大きな割合を供給しており、需要はワカモレの世界的な人気とともに大きく伸びてきた。",
  ),
  q(
    5,
    "Mexico has been the world's leading producer of which metal for over a century?|México ha sido el principal productor mundial de qué metal durante más de un siglo?|Le Mexique est le premier producteur mondial de quel métal depuis plus d'un siècle ?|メキシコが一世紀以上にわたって世界最大の産出国であり続けている金属は?",
    ["Gold|Oro|Or|金", "Platinum|Platino|Platine|プラチナ", "Silver|Plata|Argent|銀"],
    2,
    "Silver mining shaped much of colonial Mexico's economy and still underpins entire towns in the central highlands today.|La minería de la plata marcó buena parte de la economía del México colonial y todavía sostiene ciudades enteras del altiplano central.|L'exploitation de l'argent façonna une grande partie de l'économie du Mexique colonial et soutient encore des villes entières des hauts plateaux centraux.|銀の採掘は植民地時代のメキシコ経済の大きな部分を形作り、いまも中央高原のいくつもの町を丸ごと支えている。",
  ),
  q(
    4,
    "What is the Spanish name for the orange marigold flower used to decorate Día de Muertos altars?|¿Cómo se llama en español la flor anaranjada usada para decorar los altares del Día de Muertos?|Quel est le nom espagnol de la fleur orange utilisée pour décorer les autels du Día de Muertos?|死者の日の祭壇を飾るオレンジ色のマリーゴールドをスペイン語で何と呼ぶか?",
    ["Girasol|Girasol|Girasol|ヒラソル(ひまわり)", "Cempasúchil|Cempasúchil|Cempasúchil|センパスチル", "Buganvilia|Buganvilia|Bougainvillée|ブーゲンビリア"],
    1,
    "The flower's strong scent and bright color are traditionally believed to help guide spirits back along the path to their family's altar.|Se cree tradicionalmente que el aroma intenso y el color vivo de la flor ayudan a guiar a los espíritus por el camino de vuelta al altar de su familia.|On croit traditionnellement que le parfum intense et la couleur vive de la fleur aident à guider les esprits sur le chemin du retour vers l'autel familial.|この花の強い香りと鮮やかな色は、伝統的に霊が家族の祭壇までの道を戻る手助けをすると信じられている。",
  ),
  q(
    5,
    "The ancient Maya combined a 260-day cycle and a 365-day cycle into a repeating unit known as the calendar round, lasting how many years?|Los antiguos mayas combinaron un ciclo de 260 días y uno de 365 días en una unidad repetitiva llamada rueda calendárica, que dura cuántos años?|Les anciens Mayas combinèrent un cycle de 260 jours et un cycle de 365 jours en une unité répétitive appelée roue calendaire, d'une durée de combien d'années ?|古代マヤは260日周期と365日周期を組み合わせ、何年で一巡する「暦の輪」を作ったか?",
    ["18 years|18 años|18 ans|18年", "52 years|52 años|52 ans|52年", "100 years|100 años|100 ans|100年", ],
    1,
    "The two cycles only realign on the same date once every 52 years, a span many Mesoamerican cultures treated as a significant unit for renewal ceremonies.|Los dos ciclos solo vuelven a coincidir en la misma fecha una vez cada 52 años, un lapso que muchas culturas mesoamericanas trataban como una unidad relevante para ceremonias de renovación.|Les deux cycles ne se réalignent sur la même date qu'une fois tous les 52 ans, une durée que de nombreuses cultures mésoaméricaines considéraient comme une unité importante pour des cérémonies de renouveau.|二つの周期が同じ日付に重なるのは52年に一度だけで、多くのメソアメリカの文化はこの期間を、更新の儀式にとって意味のある単位として扱った。",
  ),
  q(
    5,
    "The narrow strip of land in southern Mexico historically considered as an alternative canal route before Panama's was built is the Isthmus of what?|La franja estrecha de tierra en el sur de México, considerada históricamente como ruta alternativa de canal antes de construirse la de Panamá, es el istmo de qué?|La bande de terre étroite du sud du Mexique jadis envisagée comme route alternative de canal avant celle du Panama est l'isthme de quoi ?|パナマ運河が造られる前、代替の運河ルートとして歴史的に検討されたメキシコ南部の細い陸地は「〜地峡」と呼ばれるか?",
    ["Tehuantepec|Tehuantepec|Tehuantepec|テワンテペック", "Suez|Suez|Suez|スエズ", "Kra|Kra|Kra|クラ"],
    0,
    "Railway lines were eventually built across the isthmus instead of a canal, and the route is still used to move freight between the Pacific and the Gulf.|En vez de un canal, finalmente se construyeron líneas ferroviarias a través del istmo, y la ruta todavía se usa para mover carga entre el Pacífico y el Golfo.|Des lignes de chemin de fer furent finalement construites à travers l'isthme au lieu d'un canal, et l'itinéraire sert encore à acheminer du fret entre le Pacifique et le Golfe.|結局この地峡には運河ではなく鉄道が敷かれ、いまも太平洋とメキシコ湾のあいだで貨物を運ぶのに使われている。",
  ),
  q(
    6,
    "The Chicxulub crater, evidence of the asteroid impact linked to the dinosaurs' extinction, lies off the coast of which peninsula?|El cráter de Chicxulub, evidencia del impacto de asteroide vinculado a la extinción de los dinosaurios, se encuentra frente a la costa de qué península?|Le cratère de Chicxulub, preuve de l'impact d'astéroïde lié à l'extinction des dinosaures, se trouve au large de quelle péninsule ?|恐竜絶滅と結びつけられる小惑星衝突の痕跡であるチクシュルーブ・クレーターがあるのは、どの半島の沖合か?",
    ["Florida|Florida|Floride|フロリダ半島", "Baja California|Baja California|Basse-Californie|バハカリフォルニア半島", "Yucatán|Yucatán|Yucatán|ユカタン半島"],
    2,
    "The impact, some 66 million years ago, is now widely accepted by scientists as the trigger for the mass extinction that ended the age of dinosaurs.|El impacto, ocurrido hace unos 66 millones de años, es hoy ampliamente aceptado por los científicos como el desencadenante de la extinción masiva que puso fin a la era de los dinosaurios.|L'impact, survenu il y a environ 66 millions d'années, est aujourd'hui largement admis par les scientifiques comme le déclencheur de l'extinction massive qui mit fin à l'ère des dinosaures.|およそ6600万年前のこの衝突は、恐竜の時代を終わらせた大量絶滅の引き金として、いまや科学者のあいだで広く受け入れられている。",
  ),
  q(
    5,
    "Which active volcano, visible from Mexico City on clear days, remains one of the country's most closely watched?|¿Qué volcán activo, visible desde la Ciudad de México en días despejados, sigue siendo uno de los más vigilados del país?|Quel volcan actif, visible depuis Mexico les jours clairs, reste l'un des plus étroitement surveillés du pays ?|晴れた日にはメキシコシティから見え、国内で最も注視され続けている活火山は?",
    ["Iztaccíhuatl|Iztaccíhuatl|Iztaccíhuatl|イスタクシワトル", "Popocatépetl|Popocatépetl|Popocatépetl|ポポカテペトル", "Cerro de la Silla|Cerro de la Silla|Cerro de la Silla|セロ・デ・ラ・シージャ"],
    1,
    "Popocatépetl regularly emits ash plumes and has occasionally forced nearby airports to briefly close.|El Popocatépetl emite regularmente columnas de ceniza y en ocasiones ha obligado a cerrar brevemente aeropuertos cercanos.|Le Popocatépetl émet régulièrement des panaches de cendres et a parfois contraint des aéroports voisins à fermer brièvement.|ポポカテペトルは定期的に噴煙を上げ、近隣の空港を一時的に閉鎖させることもある。",
  ),
  q(
    4,
    "The Sierra Madre Oriental and Sierra Madre Occidental are two of Mexico's major what?|La Sierra Madre Oriental y la Sierra Madre Occidental son dos de los principales qué de México?|La Sierra Madre orientale et la Sierra Madre occidentale sont deux des principaux quoi du Mexique ?|シエラマドレ・オリエンタルとシエラマドレ・オクシデンタルは、メキシコを代表する何の一種か?",
    ["River systems|Sistemas fluviales|Systèmes fluviaux|河川系", "Mountain ranges|Cordilleras|Chaînes de montagnes|山脈", "Deserts|Desiertos|Déserts|砂漠"],
    1,
    "These two ranges flank the central plateau on the east and west, meeting the transversal volcanic belt near the country's midsection.|Estas dos cordilleras flanquean el altiplano central por el este y el oeste, y se encuentran con el eje volcánico transversal cerca del centro del país.|Ces deux chaînes flanquent le haut plateau central à l'est et à l'ouest, rejoignant l'axe volcanique transversal près du centre du pays.|この二つの山脈は中央高原を東西から挟み、国のほぼ中央付近で横断火山軸と出会う。",
  ),
  q(
    5,
    "What is the nickname, meaning 'The Beast,' for the freight trains that Central American migrants have long ridden atop while crossing Mexico toward the US border?|¿Cuál es el apodo, que significa 'La Bestia,' de los trenes de carga que los migrantes centroamericanos han montado durante mucho tiempo, encaramados en el techo, al cruzar México hacia la frontera con EE. UU.?|Quel est le surnom, signifiant « La Bête », des trains de marchandises que les migrants d'Amérique centrale empruntent depuis longtemps, juchés sur le toit, en traversant le Mexique vers la frontière américaine ?|中米からの移民が屋根に乗ってメキシコを北上し米国境を目指す際に長く使ってきた貨物列車の、「野獣」を意味する通称は?",
    ["La Bestia|La Bestia|La Bestia|ラ・ベスティア", "El Rápido|El Rápido|El Rápido|エル・ラピド", "El Fantasma|El Fantasma|Le Fantasma|エル・ファンタスマ"],
    0,
    "Riding atop a moving freight train is extremely dangerous, and the route has become one of the starkest symbols of Mexico's shift toward a cargo-only rail network.|Viajar sobre un tren de carga en movimiento es sumamente peligroso, y la ruta se ha convertido en uno de los símbolos más crudos del giro de México hacia una red ferroviaria solo de carga.|Voyager sur le toit d'un train de marchandises en mouvement est extrêmement dangereux, et cette route est devenue l'un des symboles les plus crus du basculement du Mexique vers un réseau ferroviaire réservé au fret.|走行中の貨物列車の屋根に乗るのはきわめて危険であり、この経路は、メキシコの鉄道が貨物専用へと移り変わったことを最も生々しく物語る象徴の一つになっている。",
  ),
  q(
    5,
    "Which 2017 animated film, set around Día de Muertos, is widely credited with popularizing the holiday internationally?|¿Qué película animada de 2017, ambientada en torno al Día de Muertos, se considera clave para popularizar la festividad a nivel internacional?|Quel film d'animation de 2017, se déroulant autour du Día de Muertos, est largement crédité d'avoir popularisé la fête à l'international ?|2017年公開の、死者の日を題材にしたアニメ映画で、この祝祭を世界的に広めたと評されるのは?",
    ["Frozen|Frozen|La Reine des neiges|アナと雪の女王", "Coco|Coco|Coco|リメンバー・ミー", "Encanto|Encanto|Encanto|ミラベルと魔法だらけの家"],
    1,
    "Coco, produced by Pixar with extensive consultation from Mexican cultural advisors, became one of the highest-grossing films ever released in Mexico itself.|Coco, producida por Pixar con amplia consulta de asesores culturales mexicanos, se convirtió en una de las películas más taquilleras jamás estrenadas en el propio México.|Coco, produit par Pixar avec une large consultation de conseillers culturels mexicains, devint l'un des films les plus rentables jamais sortis au Mexique lui-même.|ピクサー製作のこの映画は、メキシコの文化顧問陣の広範な監修を受けて作られ、メキシコ本国でも歴代屈指の興行成績を収めた。",
  ),
  q(
    4,
    "What is guacamole, whose name comes from a Nahuatl word meaning 'avocado sauce'?|¿Qué es el guacamole, cuyo nombre viene de una palabra náhuatl que significa 'salsa de aguacate'?|Qu'est-ce que le guacamole, dont le nom vient d'un mot nahuatl signifiant « sauce d'avocat » ?|「アボカドのソース」を意味するナワトル語に由来する名を持つワカモレとは?",
    ["A mashed avocado dip|Un dip de aguacate machacado|Une trempette d'avocat écrasé|アボカドをつぶしたディップ", "A grilled corn dish|Un plato de maíz asado|Un plat de maïs grillé|焼きトウモロコシの料理", "A rice pudding|Un arroz con leche|Un riz au lait|ライスプディング"],
    0,
    "Traditional recipes are typically kept simple, built around mashed avocado, lime, chopped onion, chili and cilantro rather than heavy additions.|Las recetas tradicionales suelen ser sencillas, a base de aguacate machacado, lima, cebolla picada, chile y cilantro, sin añadidos pesados.|Les recettes traditionnelles restent généralement simples, construites autour d'avocat écrasé, de citron vert, d'oignon haché, de piment et de coriandre plutôt que d'ajouts lourds.|伝統的なレシピは概して簡素で、つぶしたアボカドにライム、刻んだ玉ねぎ、唐辛子、コリアンダーを合わせるだけで、重い具材を加えることは少ない。",
  ),
  q(
    5,
    "The Sonoran Desert, which spans parts of Mexico and the United States, is unusual among deserts for having how many rainy seasons a year?|El desierto de Sonora, que se extiende por partes de México y Estados Unidos, es inusual entre los desiertos por tener cuántas estaciones lluviosas al año?|Le désert de Sonora, qui s'étend sur des parties du Mexique et des États-Unis, est inhabituel parmi les déserts pour compter combien de saisons des pluies par an ?|メキシコとアメリカにまたがるソノラ砂漠は、一年に何回の雨季があるという点で、他の砂漠と比べて珍しいか?",
    ["None|Ninguna|Aucune|無い", "One|Una|Une|1回", "Two|Dos|Deux|2回"],
    2,
    "A gentler winter rain and a more intense summer monsoon together support unusually rich desert plant and animal life, including towering saguaro cacti.|Una lluvia invernal más suave y un monzón veraniego más intenso sustentan juntos una vida vegetal y animal desértica inusualmente rica, incluidos los imponentes cactus saguaro.|Une pluie hivernale plus douce et une mousson estivale plus intense soutiennent ensemble une vie végétale et animale désertique inhabituellement riche, dont les imposants cactus saguaro.|穏やかな冬の雨と、より激しい夏のモンスーンという二つの雨季が、そびえ立つサワロサボテンを含む、砂漠にしては珍しく豊かな動植物相を支えている。",
  ),
  q(
    6,
    "Which of these Mexican states shares a land border with the United States?|¿Cuál de estos estados mexicanos comparte frontera terrestre con Estados Unidos?|Lequel de ces États mexicains partage une frontière terrestre avec les États-Unis ?|次のうち、アメリカと陸の国境を接するメキシコの州は?",
    ["Jalisco|Jalisco|Jalisco|ハリスコ州", "Nuevo León|Nuevo León|Nuevo León|ヌエボレオン州", "Oaxaca|Oaxaca|Oaxaca|オアハカ州"],
    1,
    "Six Mexican states touch the US border: Baja California, Sonora, Chihuahua, Coahuila, Nuevo León and Tamaulipas.|Seis estados mexicanos tocan la frontera con EE. UU.: Baja California, Sonora, Chihuahua, Coahuila, Nuevo León y Tamaulipas.|Six États mexicains touchent la frontière américaine : Basse-Californie, Sonora, Chihuahua, Coahuila, Nuevo León et Tamaulipas.|米国境に接するメキシコの州は、バハカリフォルニア・ソノラ・チワワ・コアウイラ・ヌエボレオン・タマウリパスの6州である。",
  ),
  q(
    4,
    "Which Nahuatl word, covering the whole range of Capsicum peppers, is the root of the word 'chili'?|¿Qué palabra náhuatl, que abarcaba toda la gama de pimientos Capsicum, es la raíz de la palabra 'chile'?|Quel mot nahuatl, couvrant toute la gamme des piments Capsicum, est la racine du mot « chili » ?|カプシクム属の唐辛子全般を指し、「チリ」という語の語源になったナワトル語は?",
    ["Chīlli|Chīlli|Chīlli|チーリ", "Chīlpan|Chīlpan|Chīlpan|チールパン", "Chīlcōatl|Chīlcōatl|Chīlcōatl|チールコアトル"],
    0,
    "The Nahuatl word chīlli covered the whole range of Capsicum peppers long before they spread to the rest of the world after 1492.|La palabra náhuatl chīlli abarcaba toda la gama de pimientos Capsicum mucho antes de que se extendieran al resto del mundo tras 1492.|Le mot nahuatl chīlli couvrait toute la gamme des piments Capsicum bien avant qu'ils ne se répandent dans le reste du monde après 1492.|ナワトル語のチーリという語は、1492年以降に世界の他の地域へ広まるずっと前から、カプシクム属の唐辛子全般を指していた。",
  ),
  q(
    5,
    "What is Mexico's largest natural lake, located in the state of Jalisco?|¿Cuál es el mayor lago natural de México, ubicado en el estado de Jalisco?|Quel est le plus grand lac naturel du Mexique, situé dans l'État de Jalisco ?|ハリスコ州にある、メキシコ最大の天然湖は?",
    ["Lake Pátzcuaro|Lago de Pátzcuaro|Lac de Pátzcuaro|パツクアロ湖", "Lake Texcoco|Lago de Texcoco|Lac de Texcoco|テスココ湖", "Lake Chapala|Lago de Chapala|Lac de Chapala|チャパラ湖"],
    2,
    "Lake Chapala has shrunk significantly over the past century due to upstream water use, a decline that remains a subject of ongoing environmental concern.|El lago de Chapala se ha reducido notablemente en el último siglo por el uso de agua aguas arriba, un declive que sigue siendo motivo de preocupación ambiental.|Le lac de Chapala a considérablement rétréci au cours du dernier siècle en raison de l'utilisation de l'eau en amont, un déclin qui reste un sujet de préoccupation environnementale.|チャパラ湖はこの一世紀で、上流域の水利用によって大きく縮小しており、その減少はいまも環境上の懸念として注視され続けている。",
  ),
  q(
    4,
    "What do the green, white and red colors of the Mexican flag officially represent, respectively?|¿Qué representan oficialmente, respectivamente, los colores verde, blanco y rojo de la bandera mexicana?|Que représentent officiellement, respectivement, les couleurs verte, blanche et rouge du drapeau mexicain ?|メキシコ国旗の緑・白・赤の三色は、それぞれ公式に何を表すとされるか?",
    ["Hope, unity, and the blood of national heroes|Esperanza, unidad y la sangre de los héroes nacionales|Espoir, unité et le sang des héros nationaux|希望・統一・国の英雄たちの血", "Sky, snow, and desert sand|Cielo, nieve y arena del desierto|Ciel, neige et sable du désert|空・雪・砂漠の砂", "Forests, clouds, and volcanoes|Bosques, nubes y volcanes|Forêts, nuages et volcans|森・雲・火山"],
    0,
    "This symbolism was formalized by law, though the colors themselves were first adopted from the army that fought for independence in the early 1820s.|Este simbolismo se formalizó por ley, aunque los colores mismos se adoptaron primero del ejército que luchó por la independencia a principios de la década de 1820.|Ce symbolisme fut formalisé par la loi, bien que les couleurs elles-mêmes aient d'abord été adoptées par l'armée qui lutta pour l'indépendance au début des années 1820.|この象徴的な意味は法律で定められているが、色そのものは1820年代初頭に独立のために戦った軍隊が最初に採用したものである。",
  ),

  // ==================== 7〜8(25問) ====================
  q(
    7,
    "The Mexican Constitution of 1917, still in force with amendments, is historically notable as one of the world's first to enshrine what?|La Constitución mexicana de 1917, aún vigente con reformas, es históricamente notable por ser una de las primeras del mundo en consagrar qué?|La Constitution mexicaine de 1917, toujours en vigueur avec des amendements, est historiquement notable pour avoir été l'une des premières au monde à consacrer quoi ?|いまも改正を経て効力を持つ1917年のメキシコ憲法は、世界で最も早く何を明文化した憲法の一つとして知られるか?",
    ["Social rights such as land reform and labor protections|Derechos sociales como la reforma agraria y protecciones laborales|Des droits sociaux comme la réforme agraire et les protections du travail|土地改革や労働保護などの社会権", "The right to a jury trial|El derecho a un juicio por jurado|Le droit à un procès devant jury|陪審裁判を受ける権利", "Universal suffrage for women|El sufragio universal femenino|Le suffrage universel féminin|女性の普通選挙権"],
    0,
    "Drafted amid the ongoing Revolution and signed in Querétaro, the constitution's Article 123 on labor rights and Article 27 on land and subsoil rights were considered radical for their time.|Redactada en plena Revolución y firmada en Querétaro, el artículo 123 sobre derechos laborales y el 27 sobre tierras y subsuelo se consideraron radicales para su época.|Rédigée en pleine révolution et signée à Querétaro, l'article 123 sur les droits du travail et l'article 27 sur les terres et le sous-sol furent jugés radicaux pour leur époque.|革命のさなかに起草されケレタロで署名されたこの憲法は、労働権を定めた第123条と土地・地下資源の権利を定めた第27条が、当時としては急進的とされた。",
  ),
  q(
    7,
    "Emiliano Zapata's rebel movement during the Mexican Revolution is remembered for the slogan 'Tierra y Libertad,' meaning what?|El movimiento rebelde de Emiliano Zapata durante la Revolución mexicana se recuerda por el lema 'Tierra y Libertad,' que significa qué?|Le mouvement rebelle d'Emiliano Zapata pendant la révolution mexicaine est associé au slogan « Tierra y Libertad », signifiant quoi ?|メキシコ革命でエミリアーノ・サパタの反乱軍が掲げたことで知られるスローガン「ティエラ・イ・リベルタ」の意味は?",
    ["Land and Liberty|Tierra y Libertad|Terre et Liberté|土地と自由", "Country or Death|Patria o Muerte|Patrie ou Mort|祖国か死か", "Long Live the People|Viva el Pueblo|Vive le Peuple|人民万歳"],
    0,
    "Zapata fought primarily for the return of land to peasant communities, a demand later reflected in the agrarian reform article of the 1917 constitution.|Zapata luchó sobre todo por la devolución de tierras a las comunidades campesinas, una demanda reflejada después en el artículo de reforma agraria de la Constitución de 1917.|Zapata combattit avant tout pour la restitution des terres aux communautés paysannes, une revendication reflétée plus tard dans l'article de réforme agraire de la Constitution de 1917.|サパタは主に農民共同体への土地の返還を求めて戦い、その要求はのちに1917年憲法の農地改革条項に反映された。",
  ),
  q(
    7,
    "After breaking with Francisco Madero over the pace of land reform, Emiliano Zapata issued his own 1911 manifesto known as the Plan of what?|Tras romper con Francisco Madero por el ritmo de la reforma agraria, Emiliano Zapata emitió su propio manifiesto de 1911 conocido como el Plan de qué?|Après avoir rompu avec Francisco Madero au sujet du rythme de la réforme agraire, Emiliano Zapata publia en 1911 son propre manifeste connu comme le Plan de quoi ?|土地改革の進め方をめぐってフランシスコ・マデロと決別したのち、エミリアーノ・サパタが1911年に発した独自の綱領は「〜綱領」と呼ばれるか?",
    ["Plan de Ayutla|Plan de Ayutla|Plan de Ayutla|アユトラ綱領", "Plan de Ayala|Plan de Ayala|Plan d'Ayala|アヤラ綱領", "Plan de Iguala|Plan de Iguala|Plan d'Iguala|イグアラ綱領"],
    1,
    "The Plan de Ayala demanded the immediate return of lands seized from villages, a far more radical stance than Madero's, and became the founding text of Zapatismo.|El Plan de Ayala exigía la devolución inmediata de las tierras arrebatadas a los pueblos, una postura mucho más radical que la de Madero, y se convirtió en el texto fundacional del zapatismo.|Le Plan de Ayala exigeait la restitution immédiate des terres arrachées aux villages, une position bien plus radicale que celle de Madero, et devint le texte fondateur du zapatisme.|アヤラ綱領は村々から奪われた土地の即時返還を求める、マデロよりはるかに急進的な立場を示し、サパティスモ(サパタ主義)の基礎となる文書になった。",
  ),
  q(
    7,
    "Which 1821 document set out the 'Three Guarantees' (independence, religion, union) that paved the way for Mexican independence from Spain?|¿Qué documento de 1821 estableció las 'Tres Garantías' (independencia, religión, unión) que allanaron el camino a la independencia de México frente a España?|Quel document de 1821 énonça les « Trois Garanties » (indépendance, religion, union) qui ouvrirent la voie à l'indépendance du Mexique vis-à-vis de l'Espagne ?|1821年、「三つの保証(独立・宗教・統一)」を掲げ、メキシコの対スペイン独立への道を開いた文書は?",
    ["The Treaty of Córdoba|El Tratado de Córdoba|Le traité de Córdoba|コルドバ条約", "The Plan de Iguala|El Plan de Iguala|Le Plan d'Iguala|イグアラ綱領", "The Plan de Ayutla|El Plan de Ayutla|Le Plan d'Ayutla|アユトラ綱領"],
    1,
    "Issued in February 1821 by Agustín de Iturbide, the plan united former royalist and insurgent forces months before Spain formally recognized independence at Córdoba.|Emitido en febrero de 1821 por Agustín de Iturbide, el plan unió a antiguas fuerzas realistas e insurgentes meses antes de que España reconociera formalmente la independencia en Córdoba.|Émis en février 1821 par Agustín de Iturbide, le plan unit d'anciennes forces royalistes et insurgées des mois avant que l'Espagne ne reconnaisse formellement l'indépendance à Córdoba.|1821年2月にアグスティン・デ・イトゥルビデが発したこの綱領は、スペインがコルドバで正式に独立を承認する数か月前に、旧王党派と反乱軍を一つにまとめた。",
  ),
  q(
    7,
    "The 'Niños Héroes,' commemorated every September, were young military cadets who died in 1847 defending Mexico City against an invading army from which country?|Los 'Niños Héroes,' conmemorados cada septiembre, fueron jóvenes cadetes militares que murieron en 1847 defendiendo la Ciudad de México frente a un ejército invasor de qué país?|Les « Niños Héroes », commémorés chaque septembre, étaient de jeunes cadets militaires morts en 1847 en défendant Mexico contre une armée envahissante venue de quel pays ?|毎年9月に追悼される「ニーニョス・エロエス(少年英雄)」は、1847年、どの国からの侵攻軍からメキシコシティを守って命を落とした若き士官候補生たちか?",
    ["Spain|España|Espagne|スペイン", "France|Francia|France|フランス", "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国"],
    2,
    "They died defending Chapultepec Castle, then a military academy, during the final battles of the Mexican-American War.|Murieron defendiendo el castillo de Chapultepec, entonces una academia militar, durante las batallas finales de la guerra entre México y EE. UU.|Ils moururent en défendant le château de Chapultepec, alors une académie militaire, lors des dernières batailles de la guerre américano-mexicaine.|彼らは、当時陸軍士官学校だったチャプルテペック城を、米墨戦争最後の戦闘で守り抜こうとして命を落とした。",
  ),
  q(
    7,
    "France's brief 1860s military intervention in Mexico installed which European royal as 'Emperor of Mexico' before his 1867 execution?|La breve intervención militar francesa de la década de 1860 en México instaló a qué noble europeo como 'emperador de México' antes de su ejecución en 1867?|La brève intervention militaire française des années 1860 au Mexique installa quel noble européen comme « empereur du Mexique » avant son exécution en 1867 ?|1860年代、フランスの短い軍事介入によって「メキシコ皇帝」に据えられ、1867年に処刑されたヨーロッパの王族は?",
    ["Napoleon III|Napoleón III|Napoléon III|ナポレオン3世", "Maximilian I of Habsburg|Maximiliano I de Habsburgo|Maximilien Ier de Habsbourg|ハプスブルク家のマクシミリアン1世", "Charles V|Carlos V|Charles Quint|カール5世"],
    1,
    "Maximilian, an Austrian archduke, was executed by firing squad near Querétaro after Mexican republican forces, led by Benito Juárez, retook the country.|Maximiliano, archiduque austríaco, fue fusilado cerca de Querétaro después de que las fuerzas republicanas mexicanas, encabezadas por Benito Juárez, recuperaran el país.|Maximilien, archiduc autrichien, fut fusillé près de Querétaro après que les forces républicaines mexicaines, menées par Benito Juárez, eurent repris le pays.|オーストリア大公マクシミリアンは、ベニート・フアレス率いるメキシコ共和派勢力が国を奪還したのち、ケレタロ近郊で銃殺刑に処された。",
  ),
  q(
    7,
    "What is the modern name still used for a surviving version of the ancient Mesoamerican rubber ballgame, played in a handful of Mexican communities today?|¿Qué nombre moderno se sigue usando para una versión superviviente del antiguo juego de pelota de hule mesoamericano, practicado hoy en un puñado de comunidades mexicanas?|Quel nom moderne est encore utilisé pour une version survivante de l'ancien jeu de balle en caoutchouc mésoaméricain, pratiqué aujourd'hui dans une poignée de communautés mexicaines ?|古代メソアメリカのゴムボールを使う球技のうち、いまも一部の共同体で受け継がれている現代の呼び名は?",
    ["Ulama|Ulama|Ulama|ウラマ", "Jai alai|Jai alai|Jaï alaï|ハイアライ", "Pelota vasca|Pelota vasca|Pelote basque|バスク・ペロタ"],
    0,
    "Played today mostly in a few communities in Sinaloa, ulama is considered among the oldest continuously played team sports in the world.|Jugado hoy sobre todo en algunas comunidades de Sinaloa, el ulama se considera uno de los deportes de equipo jugados de forma continua más antiguos del mundo.|Joué aujourd'hui surtout dans quelques communautés du Sinaloa, l'ulama est considéré comme l'un des sports d'équipe pratiqués en continu les plus anciens au monde.|いまも主にシナロア州のいくつかの共同体で行われているウラマは、世界でも最も古くから途切れず続く団体競技の一つとされる。",
  ),
  q(
    8,
    "Which ancient Mesoamerican civilization is credited with likely inventing the mathematical concept of zero independently, for use in its calendar system?|¿A qué antigua civilización mesoamericana se le atribuye haber inventado de forma independiente el concepto matemático del cero, para usarlo en su sistema calendárico?|Quelle ancienne civilisation mésoaméricaine est créditée d'avoir probablement inventé indépendamment le concept mathématique du zéro, pour son système calendaire ?|独自に数学的な「ゼロ」の概念を発明し、暦法に用いたとされる古代メソアメリカの文明は?",
    ["The Aztec|Los aztecas|Les Aztèques|アステカ", "The Olmec|Los olmecas|Les Olmèques|オルメカ", "The Maya|Los mayas|Les Mayas|マヤ"],
    2,
    "Maya scribes used a shell-shaped glyph for zero as a placeholder in their vigesimal (base-20) number system centuries before the concept reached Europe.|Los escribas mayas usaban un glifo en forma de concha para el cero como marcador de posición en su sistema numérico vigesimal (base 20), siglos antes de que el concepto llegara a Europa.|Les scribes mayas utilisaient un glyphe en forme de coquillage pour le zéro comme symbole de position dans leur système numérique vigésimal (base 20), des siècles avant que le concept n'atteigne l'Europe.|マヤの書記たちは、20進法の数体系の位取りとして貝殻の形をしたゼロの記号を用いており、これはこの概念がヨーロッパに伝わるより何世紀も前のことである。",
  ),
  q(
    7,
    "The Olmec civilization, often called Mesoamerica's 'mother culture,' is best known for carving colossal stone what?|A la civilización olmeca, a menudo llamada la 'cultura madre' de Mesoamérica, se la conoce sobre todo por tallar colosales qué de piedra?|La civilisation olmèque, souvent appelée la « culture mère » de la Méso-Amérique, est surtout connue pour avoir sculpté d'énormes quoi en pierre ?|しばしばメソアメリカの「母なる文化」と呼ばれるオルメカ文明が、巨大な石の何を彫ったことで最もよく知られているか?",
    ["Obelisks|Obeliscos|Obélisques|オベリスク", "Heads|Cabezas|Têtes|頭部像", "Bridges|Puentes|Ponts|橋"],
    1,
    "The Olmec carved at least seventeen colossal heads, each weighing several tons, thought to represent individual rulers with distinct facial features.|Los olmecas tallaron al menos diecisiete cabezas colosales, cada una de varias toneladas, que se cree representan a gobernantes concretos con rasgos faciales propios.|Les Olmèques sculptèrent au moins dix-sept têtes colossales, chacune pesant plusieurs tonnes, censées représenter des dirigeants individuels aux traits distincts.|オルメカは少なくとも17体の巨石頭部像を刻んだ。それぞれ数トンの重さがあり、個々の支配者を独自の顔立ちで表したものと考えられている。",
  ),
  q(
    7,
    "Which Mexican poet-diplomat wrote 'The Labyrinth of Solitude,' a landmark essay on Mexican identity?|¿Qué poeta y diplomático mexicano escribió 'El laberinto de la soledad,' un ensayo clave sobre la identidad mexicana?|Quel poète-diplomate mexicain écrivit « Le Labyrinthe de la solitude », un essai marquant sur l'identité mexicaine ?|メキシコ人のアイデンティティを論じた画期的な評論『孤独の迷宮』を著した詩人・外交官は?",
    ["Carlos Fuentes|Carlos Fuentes|Carlos Fuentes|カルロス・フエンテス", "Juan Rulfo|Juan Rulfo|Juan Rulfo|フアン・ルルフォ", "Octavio Paz|Octavio Paz|Octavio Paz|オクタビオ・パス"],
    2,
    "Published in 1950, the essay explores Mexican history and character partly through the lens of the conquest and its lasting psychological legacy.|Publicado en 1950, el ensayo explora la historia y el carácter mexicanos en parte a través de la conquista y su legado psicológico duradero.|Publié en 1950, l'essai explore l'histoire et le caractère mexicains en partie à travers le prisme de la conquête et de son héritage psychologique durable.|1950年に発表されたこの評論は、メキシコの歴史と気質を、征服とその心理的な遺産という視点も交えて論じている。",
  ),
  q(
    7,
    "Juan Rulfo's 1955 novel 'Pedro Páramo,' which blends the living and the dead in a single narrative, is considered a major precursor to which literary movement?|La novela de Juan Rulfo de 1955 'Pedro Páramo,' que mezcla a vivos y muertos en una sola narrativa, se considera un precursor importante de qué movimiento literario?|Le roman de Juan Rulfo de 1955, « Pedro Páramo », qui mêle vivants et morts dans un même récit, est considéré comme un précurseur majeur de quel mouvement littéraire ?|生者と死者を一つの物語に溶け込ませたフアン・ルルフォの1955年の小説『ペドロ・パラモ』は、どの文学運動の重要な先駆けとされるか?",
    ["Naturalism|Naturalismo|Naturalisme|自然主義", "Dadaism|Dadaísmo|Dadaïsme|ダダイスム", "Magical realism|Realismo mágico|Réalisme magique|マジックリアリズム"],
    2,
    "Gabriel García Márquez later said reading Pedro Páramo was what freed him to write One Hundred Years of Solitude in the style he did.|Gabriel García Márquez dijo después que leer Pedro Páramo fue lo que lo liberó para escribir Cien años de soledad en el estilo en que lo hizo.|Gabriel García Márquez dira plus tard que la lecture de Pedro Páramo fut ce qui le libéra pour écrire Cent ans de solitude dans le style qu'il adopta.|ガブリエル・ガルシア・マルケスはのちに、『ペドロ・パラモ』を読んだことが、あの文体で『百年の孤独』を書く自由を与えてくれたと語っている。",
  ),
  q(
    8,
    "The 1848 Treaty of Guadalupe Hidalgo, ending the Mexican-American War, confirmed Mexico's cession of territory that today makes up roughly what share of the modern United States' land area?|El Tratado de Guadalupe Hidalgo de 1848, que puso fin a la guerra entre México y EE. UU., confirmó la cesión de territorio mexicano que hoy forma aproximadamente qué parte de la superficie actual de Estados Unidos?|Le traité de Guadalupe Hidalgo de 1848, mettant fin à la guerre américano-mexicaine, confirma la cession d'un territoire mexicain formant aujourd'hui environ quelle part de la superficie actuelle des États-Unis ?|米墨戦争を終結させた1848年のグアダルーペ・イダルゴ条約で確認されたメキシコの割譲地は、今日のアメリカ本土の面積のおよそどれくらいにあたるか?",
    ["About one-thirtieth|Cerca de un treintavo|Environ un trentième|およそ30分の1", "About one-tenth|Cerca de una décima parte|Environ un dixième|およそ10分の1", "About one-fifth|Cerca de una quinta parte|Environ un cinquième|およそ5分の1"],
    2,
    "The Mexican Cession covered roughly 525,000 square miles, close to a fifth of the continental United States' present-day land area.|La Cesión Mexicana abarcó unas 525.000 millas cuadradas, cerca de una quinta parte de la superficie continental actual de Estados Unidos.|La cession mexicaine couvrit environ 525 000 miles carrés, près d'un cinquième de la superficie continentale actuelle des États-Unis.|「メキシコ割譲地」はおよそ52万5000平方マイルにおよび、今日のアメリカ本土の面積のおよそ5分の1に相当する。",
  ),
  q(
    7,
    "Benito Juárez's 1857 liberal constitution, predating the Revolution by over fifty years, is remembered for establishing what?|La constitución liberal de Benito Juárez de 1857, más de cincuenta años anterior a la Revolución, se recuerda por establecer qué?|La constitution libérale de Benito Juárez de 1857, antérieure de plus de cinquante ans à la révolution, est connue pour avoir établi quoi ?|革命に先立つこと50年余り、ベニート・フアレスのもとで成立した1857年の自由主義憲法が確立したことで知られるものは?",
    ["The separation of church and state|La separación de Iglesia y Estado|La séparation de l'Église et de l'État|政教分離", "Universal free public transit|El transporte público universal y gratuito|Les transports publics universels et gratuits|無償の公共交通の普遍化", "A national lottery system|Un sistema de lotería nacional|Un système de loterie nationale|国営宝くじ制度"],
    0,
    "The reforms stripped the Catholic Church of much of its land and political power, triggering a civil war known as the War of the Reform.|Las reformas despojaron a la Iglesia católica de buena parte de sus tierras y poder político, lo que desató una guerra civil conocida como la Guerra de Reforma.|Les réformes dépouillèrent l'Église catholique d'une grande partie de ses terres et de son pouvoir politique, déclenchant une guerre civile connue sous le nom de guerre de la Réforme.|この改革はカトリック教会から広大な土地と政治的権力の多くを剥ぎ取り、「改革戦争」と呼ばれる内戦を引き起こした。",
  ),
  q(
    7,
    "General Antonio López de Santa Anna, president on multiple occasions, is remembered for holding an elaborate state funeral for which of his own body parts?|Al general Antonio López de Santa Anna, presidente en varias ocasiones, se le recuerda por celebrar un elaborado funeral de Estado para cuál de sus propias partes del cuerpo?|Le général Antonio López de Santa Anna, président à plusieurs reprises, est connu pour avoir organisé des funérailles d'État élaborées pour laquelle de ses propres parties du corps ?|複数回大統領を務めたアントニオ・ロペス・デ・サンタ・アナ将軍が、盛大な国葬を行ったことで知られる自らの体の一部は?",
    ["His right hand|Su mano derecha|Sa main droite|右手", "His amputated leg|Su pierna amputada|Sa jambe amputée|切断された脚", "His heart|Su corazón|Son cœur|心臓"],
    1,
    "Santa Anna lost the leg to cannon fire in 1838 and had it buried with full military honors in Mexico City, later dug up and dragged through the streets by an angry mob.|Santa Anna perdió la pierna por un cañonazo en 1838 y la hizo enterrar con honores militares en la Ciudad de México; más tarde una turba enfurecida la desenterró y la arrastró por las calles.|Santa Anna perdit la jambe sous un tir de canon en 1838 et la fit enterrer avec les honneurs militaires à Mexico ; une foule en colère la déterra plus tard et la traîna dans les rues.|サンタ・アナは1838年に砲撃で脚を失い、メキシコシティで軍の栄誉をもって埋葬させたが、のちに怒った群衆に掘り起こされ、通りを引きずり回された。",
  ),
  q(
    8,
    "The 1968 Tlatelolco massacre, in which security forces killed student protesters days before the Olympics opened, took place in which Mexico City square?|La masacre de Tlatelolco de 1968, en la que fuerzas de seguridad mataron a estudiantes manifestantes días antes de que se inauguraran los Juegos Olímpicos, tuvo lugar en qué plaza de la Ciudad de México?|Le massacre de Tlatelolco de 1968, où les forces de sécurité tuèrent des étudiants manifestants quelques jours avant l'ouverture des Jeux olympiques, eut lieu sur quelle place de Mexico ?|オリンピック開幕の数日前、治安部隊が学生デモ隊を殺害した1968年のトラテロルコ虐殺が起きたメキシコシティの広場は?",
    ["Plaza Garibaldi|Plaza Garibaldi|Place Garibaldi|ガリバルディ広場", "The Zócalo|El Zócalo|Le Zócalo|ソカロ", "Plaza de las Tres Culturas|Plaza de las Tres Culturas|Place des Trois Cultures|三文化広場"],
    2,
    "The square's name, meaning Square of the Three Cultures, refers to the Aztec ruins, colonial church and modern buildings that stand together there.|El nombre de la plaza, que significa Plaza de las Tres Culturas, se refiere a las ruinas aztecas, la iglesia colonial y los edificios modernos que se alzan juntos allí.|Le nom de la place, signifiant place des Trois Cultures, renvoie aux ruines aztèques, à l'église coloniale et aux bâtiments modernes qui s'y dressent ensemble.|「三文化広場」という名は、そこに並び立つアステカの遺跡、植民地期の教会、現代の建物を指している。",
  ),
  q(
    8,
    "Alongside Diego Rivera and José Clemente Orozco, which artist completed the 'Big Three' of 20th-century Mexican muralism, known for dynamic, politically charged compositions?|Junto con Diego Rivera y José Clemente Orozco, ¿qué artista completó 'los tres grandes' del muralismo mexicano del siglo XX, conocido por composiciones dinámicas y de fuerte carga política?|Aux côtés de Diego Rivera et José Clemente Orozco, quel artiste complétait le « Big Three » du muralisme mexicain du XXe siècle, connu pour des compositions dynamiques et engagées ?|ディエゴ・リベラ、ホセ・クレメンテ・オロスコとともに、20世紀メキシコ壁画運動の「三大巨匠」を成し、力強く政治色の濃い構図で知られる画家は?",
    ["Rufino Tamayo|Rufino Tamayo|Rufino Tamayo|ルフィーノ・タマヨ", "David Alfaro Siqueiros|David Alfaro Siqueiros|David Alfaro Siqueiros|ダビド・アルファロ・シケイロス", "Frida Kahlo|Frida Kahlo|Frida Kahlo|フリーダ・カーロ"],
    1,
    "Siqueiros experimented with industrial paints and unconventional perspectives, and was also a political militant who was jailed multiple times over his activism.|Siqueiros experimentó con pinturas industriales y perspectivas poco convencionales, y fue también un militante político encarcelado varias veces por su activismo.|Siqueiros expérimenta avec des peintures industrielles et des perspectives non conventionnelles, et fut aussi un militant politique emprisonné à plusieurs reprises pour son activisme.|シケイロスは工業用塗料や型破りな遠近法を試みた画家であると同時に、政治活動で幾度も投獄された活動家でもあった。",
  ),
  q(
    7,
    "Which Nahuatl-derived word, describing a supernatural being able to transform into an animal, remains part of Mexican folklore today?|¿Qué palabra de origen náhuatl, que describe a un ser sobrenatural capaz de transformarse en animal, sigue formando parte del folclore mexicano actual?|Quel mot d'origine nahuatl, désignant un être surnaturel capable de se transformer en animal, fait toujours partie du folklore mexicain aujourd'hui ?|動物に変身できる超自然の存在を指す、ナワトル語由来でいまもメキシコの民話に残る語は?",
    ["Alebrije|Alebrije|Alebrije|アレブリヘ", "Nahual|Nahual|Nahual|ナワル", "Chaneque|Chaneque|Chaneque|チャネケ"],
    1,
    "Belief in nahuales, humans said to share a spiritual bond with an animal counterpart and sometimes able to shift into it, is documented across many Indigenous Mexican traditions.|La creencia en los nahuales, personas que comparten un vínculo espiritual con un animal y a veces pueden transformarse en él, está documentada en muchas tradiciones indígenas mexicanas.|La croyance aux nahuales, des humains partageant un lien spirituel avec un animal et parfois capables de se transformer en lui, est documentée dans de nombreuses traditions autochtones mexicaines.|人が動物の分身と霊的な絆を持ち、時にそれへと変身できるとされる「ナワル」への信仰は、メキシコの多くの先住民の伝統に記録されている。",
  ),
  q(
    7,
    "The brightly painted fantastical creature sculptures called 'alebrijes,' now sold across Mexico, were invented in the 20th century by which Mexico City artisan?|Las esculturas de criaturas fantásticas y muy coloridas llamadas 'alebrijes,' hoy vendidas por todo México, fueron inventadas en el siglo XX por qué artesano de la Ciudad de México?|Les sculptures de créatures fantastiques aux couleurs vives appelées « alebrijes », aujourd'hui vendues dans tout le Mexique, furent inventées au XXe siècle par quel artisan de Mexico ?|いまやメキシコ各地で売られる、色鮮やかな空想上の生き物の彫像「アレブリヘ」を20世紀に生み出したメキシコシティの職人は?",
    ["Diego Rivera|Diego Rivera|Diego Rivera|ディエゴ・リベラ", "Rufino Tamayo|Rufino Tamayo|Rufino Tamayo|ルフィーノ・タマヨ", "Pedro Linares|Pedro Linares|Pedro Linares|ペドロ・リナレス"],
    2,
    "Linares said the strange hybrid creatures first appeared to him in a fever dream during a serious illness in the 1930s, and he began making them out of papier-mâché soon after.|Linares dijo que las extrañas criaturas híbridas se le aparecieron por primera vez en un sueño febril durante una grave enfermedad en los años treinta, y poco después empezó a hacerlas de cartón.|Linares raconta que ces étranges créatures hybrides lui apparurent d'abord dans un rêve fiévreux lors d'une grave maladie dans les années 1930, et il commença peu après à les fabriquer en papier mâché.|リナレスは、1930年代に重い病を患った際の熱にうかされた夢の中でこの奇妙な合成獣たちが初めて現れたと語り、そのすぐあとから張り子でそれらを作り始めた。",
  ),
  q(
    7,
    "Which Aztec ruler first received the Spanish expedition led by Hernán Cortés in Tenochtitlan in 1519?|¿Qué gobernante azteca recibió por primera vez a la expedición española encabezada por Hernán Cortés en Tenochtitlan en 1519?|Quel dirigeant aztèque reçut d'abord l'expédition espagnole menée par Hernán Cortés à Tenochtitlan en 1519 ?|1519年、テノチティトランでエルナン・コルテス率いるスペイン遠征隊を最初に迎え入れたアステカの支配者は?",
    ["Cuauhtémoc|Cuauhtémoc|Cuauhtémoc|クアウテモック", "Itzcóatl|Itzcóatl|Itzcóatl|イツコアトル", "Moctezuma II|Moctezuma II|Moctezuma II|モクテスマ2世"],
    2,
    "Moctezuma II died during the initial Spanish occupation of the city in 1520, under disputed circumstances, before the final siege the following year.|Moctezuma II murió durante la ocupación española inicial de la ciudad en 1520, en circunstancias disputadas, antes del asedio final del año siguiente.|Moctezuma II mourut pendant l'occupation espagnole initiale de la ville en 1520, dans des circonstances contestées, avant le siège final l'année suivante.|モクテスマ2世は1520年、スペイン軍による最初の都市占拠の最中、いまも議論のある状況下で命を落とした。翌年の最終的な包囲戦より前のことである。",
  ),
  q(
    8,
    "Cuauhtémoc, tortured by the Spanish for information about hidden treasure, was the last ruler of which empire before its final fall in 1521?|Cuauhtémoc, torturado por los españoles para que revelara la ubicación de un tesoro oculto, fue el último gobernante de qué imperio antes de su caída final en 1521?|Cuauhtémoc, torturé par les Espagnols pour obtenir des informations sur un trésor caché, fut le dernier souverain de quel empire avant sa chute finale en 1521 ?|隠された財宝の情報を求めるスペイン人に拷問されたクアウテモックは、1521年の最終的な滅亡の前、どの帝国最後の支配者だったか?",
    ["The Toltec Empire|El imperio tolteca|L'empire toltèque|トルテカ帝国", "The Aztec Empire|El imperio azteca|L'empire aztèque|アステカ帝国", "The Maya Empire|El imperio maya|L'empire maya|マヤ帝国"],
    1,
    "Cuauhtémoc was eventually executed by the Spanish in 1525 during an expedition into what is now Honduras, on suspicion of plotting rebellion.|Cuauhtémoc fue finalmente ejecutado por los españoles en 1525 durante una expedición a lo que hoy es Honduras, sospechoso de tramar una rebelión.|Cuauhtémoc fut finalement exécuté par les Espagnols en 1525 lors d'une expédition dans ce qui est aujourd'hui le Honduras, soupçonné de comploter une rébellion.|クアウテモックは最終的に1525年、いまのホンジュラスへの遠征中に、反乱を企てた疑いをかけられてスペイン側に処刑された。",
  ),
  q(
    7,
    "Which 20th-century Mexican president redistributed more farmland to peasant communities than any other in the country's history, during his 1934–1940 term?|¿Qué presidente mexicano del siglo XX repartió más tierras de cultivo entre comunidades campesinas que ningún otro en la historia del país, durante su mandato de 1934-1940?|Quel président mexicain du XXe siècle redistribua plus de terres agricoles aux communautés paysannes qu'aucun autre dans l'histoire du pays, durant son mandat de 1934-1940 ?|1934〜1940年の任期中、国の歴史上どの大統領よりも多くの農地を農民共同体に再分配した20世紀のメキシコ大統領は?",
    ["Álvaro Obregón|Álvaro Obregón|Álvaro Obregón|アルバロ・オブレゴン", "Adolfo López Mateos|Adolfo López Mateos|Adolfo López Mateos|アドルフォ・ロペス・マテオス", "Lázaro Cárdenas|Lázaro Cárdenas|Lázaro Cárdenas|ラサロ・カルデナス"],
    2,
    "Cárdenas redistributed more farmland to peasant communities than any Mexican president before or since, reshaping the countryside's landholding patterns.|Cárdenas repartió más tierras de cultivo entre comunidades campesinas que cualquier otro presidente mexicano, antes o después, transformando el patrón de tenencia de la tierra en el campo.|Cárdenas redistribua plus de terres agricoles aux communautés paysannes qu'aucun autre président mexicain, avant ou après, transformant la structure foncière des campagnes.|カルデナスは、それ以前もそれ以後も含めどの大統領よりも多くの農地を農民共同体に再分配し、農村の土地保有のあり方を作り変えた。",
  ),
  q(
    8,
    "The 1521 siege that finally toppled Tenochtitlan relied heavily on tens of thousands of allied warriors from which rival Indigenous state, longtime enemies of the Aztecs?|El asedio de 1521 que finalmente derribó Tenochtitlan dependió en gran medida de decenas de miles de guerreros aliados de qué estado indígena rival, enemigo histórico de los aztecas?|Le siège de 1521 qui fit finalement tomber Tenochtitlan reposa largement sur des dizaines de milliers de guerriers alliés venus de quel État autochtone rival, ennemi de longue date des Aztèques ?|1521年、テノチティトランを最終的に陥落させた包囲戦を大きく支えた、アステカと長く敵対してきた同盟先の先住民国家は?",
    ["Texcoco|Texcoco|Texcoco|テスココ", "Tlaxcala|Tlaxcala|Tlaxcala|トラスカラ", "The Purépecha (Tarascan) state|El estado purépecha (tarasco)|L'État purépecha (tarasque)|プレペチャ(タラスコ)王国"],
    1,
    "Tlaxcala had successfully resisted Aztec conquest for generations and saw an alliance with the Spanish as a chance to finally defeat its longtime rival.|Tlaxcala había resistido con éxito la conquista azteca durante generaciones y vio en la alianza con los españoles la oportunidad de derrotar por fin a su rival histórico.|Tlaxcala avait résisté avec succès à la conquête aztèque pendant des générations et vit dans l'alliance avec les Espagnols une chance de vaincre enfin son rival de longue date.|トラスカラは何世代にもわたってアステカの征服に抵抗し続けてきた勢力で、スペインとの同盟を、長年の宿敵をついに打ち破る機会と見た。",
  ),
  q(
    7,
    "The 2001 Mexican film 'Y Tu Mamá También' is often credited with launching the international career of which director, later known for 'Gravity' and 'Roma'?|A la película mexicana de 2001 'Y Tu Mamá También' se le suele atribuir el lanzamiento de la carrera internacional de qué director, conocido después por 'Gravity' y 'Roma'?|Le film mexicain de 2001 « Y Tu Mamá También » est souvent crédité d'avoir lancé la carrière internationale de quel réalisateur, connu plus tard pour « Gravity » et « Roma » ?|2001年のメキシコ映画『天国の口、終りの楽園。』が国際的な名声への足がかりを開いたとされる監督で、のちに『ゼロ・グラビティ』や『ROMA/ローマ』で知られるのは?",
    ["Guillermo del Toro|Guillermo del Toro|Guillermo del Toro|ギレルモ・デル・トロ", "Alejandro González Iñárritu|Alejandro González Iñárritu|Alejandro González Iñárritu|アレハンドロ・ゴンサレス・イニャリトゥ", "Alfonso Cuarón|Alfonso Cuarón|Alfonso Cuarón|アルフォンソ・キュアロン"],
    2,
    "Cuarón went on to direct Harry Potter and the Prisoner of Azkaban and Children of Men before winning the Academy Award for Best Director for both Gravity and Roma.|Cuarón dirigió después Harry Potter y el prisionero de Azkaban e Hijos de los hombres antes de ganar el Óscar a mejor director tanto por Gravity como por Roma.|Cuarón réalisa ensuite Harry Potter et le Prisonnier d'Azkaban et Les Fils de l'homme avant de remporter l'Oscar du meilleur réalisateur pour Gravity puis pour Roma.|キュアロンはその後『ハリー・ポッターとアズカバンの囚人』や『トゥモロー・ワールド』を手がけ、のちに『ゼロ・グラビティ』と『ROMA/ローマ』の両方でアカデミー監督賞を受賞した。",
  ),
  q(
    7,
    "Before the Spanish conquest, the Purépecha (Tarascan) state in what is now Michoacán stood out as one of the few major Mesoamerican powers never conquered by which empire?|Antes de la conquista española, el estado purépecha (tarasco) en lo que hoy es Michoacán destacaba como una de las pocas grandes potencias mesoamericanas nunca conquistadas por qué imperio?|Avant la conquête espagnole, l'État purépecha (tarasque), dans l'actuel Michoacán, se distinguait comme l'une des rares grandes puissances mésoaméricaines jamais conquises par quel empire ?|スペインの征服以前、いまのミチョアカンにあったプレペチャ(タラスコ)王国は、どの帝国に一度も征服されなかった数少ない大国として際立っていたか?",
    ["The Toltec Empire|El imperio tolteca|L'empire toltèque|トルテカ帝国", "The Aztec Empire|El imperio azteca|L'empire aztèque|アステカ帝国", "The Maya civilization|La civilización maya|La civilisation maya|マヤ文明"],
    1,
    "The Purépecha fielded a formidable army equipped with copper weapons, and repeated Aztec campaigns against them ended in defeat.|Los purépechas contaban con un ejército formidable equipado con armas de cobre, y las repetidas campañas aztecas contra ellos terminaron en derrota.|Les Purépechas disposaient d'une armée redoutable équipée d'armes en cuivre, et les campagnes aztèques répétées contre eux se soldèrent par des défaites.|プレペチャは銅製の武器を備えた強力な軍を有しており、アステカが繰り返し仕掛けた遠征はいずれも敗北に終わった。",
  ),
  q(
    8,
    "Mexican diplomat Alfonso García Robles won the 1982 Nobel Peace Prize largely for his work on which kind of international agreement?|El diplomático mexicano Alfonso García Robles ganó el Premio Nobel de la Paz en 1982, en gran parte por su trabajo en qué tipo de acuerdo internacional?|Le diplomate mexicain Alfonso García Robles remporta le prix Nobel de la paix en 1982, en grande partie pour son travail sur quel type d'accord international ?|メキシコの外交官アルフォンソ・ガルシア・ロブレスが1982年のノーベル平和賞を受賞したのは、主にどんな種類の国際協定への貢献によるものか?",
    ["Nuclear non-proliferation and disarmament treaties|Tratados de no proliferación y desarme nuclear|Traités de non-prolifération et de désarmement nucléaire|核不拡散・軍縮条約", "International postal agreements|Acuerdos postales internacionales|Accords postaux internationaux|国際郵便協定", "Maritime fishing rights|Derechos de pesca marítima|Droits de pêche maritime|海洋漁業権"],
    0,
    "García Robles helped negotiate the 1967 Treaty of Tlatelolco, the first treaty to establish a nuclear-weapon-free zone across an entire populated region.|García Robles ayudó a negociar el Tratado de Tlatelolco de 1967, el primero en establecer una zona libre de armas nucleares en toda una región habitada.|García Robles contribua à négocier le traité de Tlatelolco de 1967, le premier à établir une zone exempte d'armes nucléaires sur toute une région peuplée.|ガルシア・ロブレスは1967年のトラテロルコ条約の交渉に貢献した。これは、人が暮らす地域全体を対象に非核兵器地帯を設けた初めての条約である。",
  ),

  // ==================== 9〜10(15問。1問ずつ裏を取った) ====================
  q(
    9,
    "In what year did Mexico formally abolish slavery nationwide, decades before the United States did?|¿En qué año abolió México formalmente la esclavitud a nivel nacional, décadas antes de que lo hiciera Estados Unidos?|En quelle année le Mexique abolit-il formellement l'esclavage à l'échelle nationale, des décennies avant les États-Unis ?|メキシコが国全体で正式に奴隷制を廃止したのは何年で、これはアメリカより何十年も早かったか?",
    ["1810|1810|1810|1810年", "1829|1829|1829|1829年", "1863|1863|1863|1863年"],
    1,
    "President Vicente Guerrero issued the abolition decree on September 15, 1829, though enforcement in some northern territories remained inconsistent for years afterward.|El presidente Vicente Guerrero emitió el decreto de abolición el 15 de septiembre de 1829, aunque su cumplimiento en algunos territorios del norte siguió siendo irregular durante años.|Le président Vicente Guerrero émit le décret d'abolition le 15 septembre 1829, bien que son application dans certains territoires du nord soit restée inégale pendant des années.|ビセンテ・ゲレーロ大統領は1829年9月15日に廃止令を発したが、北部の一部地域ではその後も何年か施行が徹底されなかった。",
  ),
  q(
    9,
    "Vicente Guerrero, who issued Mexico's 1829 decree abolishing slavery, is remembered as an early president of what background, unusual for the era's heads of state?|A Vicente Guerrero, que emitió el decreto mexicano de 1829 que abolió la esclavitud, se le recuerda como un presidente temprano de qué origen, inusual entre los jefes de Estado de la época?|Vicente Guerrero, qui émit en 1829 le décret mexicain abolissant l'esclavage, est resté dans les mémoires comme un président précoce d'une origine inhabituelle pour les chefs d'État de l'époque : laquelle ?|1829年にメキシコの奴隷制廃止令を発したビセンテ・ゲレーロは、当時の国家元首としては珍しい、どんな出自の初期の大統領として記憶されているか?",
    ["Mixed African and Indigenous descent|Ascendencia afro e indígena mixta|D'ascendance mixte africaine et autochtone|アフリカ系と先住民の混血", "European nobility|Nobleza europea|Noblesse européenne|ヨーロッパの貴族の出", "A former Spanish viceroy|Un antiguo virrey español|Un ancien vice-roi espagnol|元スペイン副王"],
    0,
    "Guerrero, from the Costa Chica region, rose from an independence insurgent to the presidency in 1829 before being deposed and executed in 1831.|Guerrero, originario de la Costa Chica, pasó de insurgente independentista a la presidencia en 1829, antes de ser depuesto y ejecutado en 1831.|Guerrero, originaire de la Costa Chica, passa d'insurgé indépendantiste à la présidence en 1829, avant d'être destitué et exécuté en 1831.|コスタ・チカ地方出身のゲレーロは、独立運動の反乱指導者から1829年に大統領へと昇り詰めたが、1831年に失脚し処刑された。",
  ),
  q(
    9,
    "Which exiled Soviet revolutionary, granted asylum by President Lázaro Cárdenas, was assassinated near Mexico City in 1940?|¿Qué revolucionario soviético exiliado, al que el presidente Lázaro Cárdenas concedió asilo, fue asesinado cerca de la Ciudad de México en 1940?|Quel révolutionnaire soviétique exilé, à qui le président Lázaro Cárdenas accorda l'asile, fut assassiné près de Mexico en 1940 ?|ラサロ・カルデナス大統領から亡命を認められ、1940年にメキシコシティ近郊で暗殺されたソビエトの亡命革命家は?",
    ["Vladimir Lenin|Vladimir Lenin|Vladimir Lénine|ウラジーミル・レーニン", "Leon Trotsky|León Trotski|Léon Trotski|レフ・トロツキー", "Joseph Stalin|Joseph Stalin|Joseph Staline|ヨシフ・スターリン"],
    1,
    "Trotsky was killed in Coyoacán with an ice axe by an agent later confirmed to be working for the Soviet secret police, on Stalin's orders.|Trotski fue asesinado en Coyoacán con un piolet por un agente que después se confirmó trabajaba para la policía secreta soviética, por orden de Stalin.|Trotski fut tué à Coyoacán d'un coup de piolet par un agent dont on confirma plus tard qu'il travaillait pour la police secrète soviétique, sur ordre de Staline.|トロツキーはコヨアカンで氷斧により殺害された。実行犯はのちに、スターリンの命によりソ連の秘密警察のために動いていたと確認されている。",
  ),
  q(
    9,
    "Mexican chemist Luis Miramontes, working in Mexico City in 1951, helped synthesize a hormone that became the basis for which medical breakthrough?|El químico mexicano Luis Miramontes, trabajando en la Ciudad de México en 1951, ayudó a sintetizar una hormona que se convirtió en la base de qué avance médico?|Le chimiste mexicain Luis Miramontes, travaillant à Mexico en 1951, contribua à synthétiser une hormone devenue la base de quelle avancée médicale ?|1951年、メキシコシティで研究していたメキシコ人化学者ルイス・ミラモンテスが合成に貢献したホルモンは、どの医学的な画期の基礎になったか?",
    ["The oral contraceptive pill|La píldora anticonceptiva oral|La pilule contraceptive orale|経口避妊薬(ピル)", "The polio vaccine|La vacuna contra la polio|Le vaccin contre la polio|ポリオワクチン", "Penicillin|La penicilina|La pénicilline|ペニシリン"],
    0,
    "Working at the Syntex company using a wild Mexican yam as a starting material, Miramontes and colleagues synthesized norethisterone, a key steroid behind the first birth control pill.|Trabajando en la empresa Syntex a partir de un ñame silvestre mexicano, Miramontes y sus colegas sintetizaron la noretisterona, un esteroide clave tras la primera píldora anticonceptiva.|Travaillant chez Syntex à partir d'un igname sauvage mexicain, Miramontes et ses collègues synthétisèrent la noréthistérone, un stéroïde clé à l'origine de la première pilule contraceptive.|メキシコ原産の野生の山芋を出発物質として、シンテックス社で働いていたミラモンテスと同僚たちはノルエチステロンを合成した。これは最初の経口避妊薬の鍵となったステロイドである。",
  ),
  q(
    9,
    "Mario Molina, born in Mexico City, shared the 1995 Nobel Prize in Chemistry for research into what environmental problem?|Mario Molina, nacido en la Ciudad de México, compartió el Premio Nobel de Química de 1995 por su investigación sobre qué problema ambiental?|Mario Molina, né à Mexico, partagea le prix Nobel de chimie 1995 pour ses recherches sur quel problème environnemental ?|メキシコシティ生まれのマリオ・モリーナが、どの環境問題の研究で1995年のノーベル化学賞を共同受賞したか?",
    ["Acid rain|La lluvia ácida|Les pluies acides|酸性雨", "Depletion of the ozone layer by CFCs|El agotamiento de la capa de ozono por los CFC|L'appauvrissement de la couche d'ozone par les CFC|フロンガスによるオゾン層破壊", "Ocean plastic pollution|La contaminación oceánica por plástico|La pollution plastique des océans|海洋のプラスチック汚染"],
    1,
    "Molina was the first Mexican-born scientist to win a Nobel Prize, recognized for identifying how chlorofluorocarbons break down atmospheric ozone.|Molina fue el primer científico nacido en México en ganar un Nobel, reconocido por identificar cómo los clorofluorocarbonos degradan el ozono atmosférico.|Molina fut le premier scientifique né au Mexique à remporter un Nobel, reconnu pour avoir identifié comment les chlorofluorocarbures dégradent l'ozone atmosphérique.|モリーナは、フロンガスが大気中のオゾンを分解する仕組みを解明した功績により、メキシコ生まれとして初めてノーベル賞を受賞した科学者である。",
  ),
  q(
    10,
    "The Mexican Constitution of 1917 was drafted and signed in which city?|¿En qué ciudad se redactó y firmó la Constitución mexicana de 1917?|La Constitution mexicaine de 1917 fut rédigée et signée dans quelle ville ?|1917年のメキシコ憲法が起草され署名された都市は?",
    ["Guadalajara|Guadalajara|Guadalajara|グアダラハラ", "Mexico City|Ciudad de México|Mexico|メキシコシティ", "Querétaro|Querétaro|Querétaro|ケレタロ"],
    2,
    "The constitutional convention met in Querétaro from late 1916, and the finished document was signed there on February 5, 1917.|El congreso constituyente se reunió en Querétaro desde finales de 1916, y el documento terminado se firmó allí el 5 de febrero de 1917.|Le congrès constituant se réunit à Querétaro dès la fin de 1916, et le document achevé y fut signé le 5 février 1917.|制憲議会は1916年末からケレタロで開かれ、完成した憲法は1917年2月5日、その地で署名された。",
  ),
  q(
    10,
    "American scientist Norman Borlaug conducted much of the wheat-breeding research that sparked the 'Green Revolution,' and later won the Nobel Peace Prize, largely in which country starting in the 1940s?|El científico estadounidense Norman Borlaug realizó buena parte de la investigación en mejora del trigo que impulsó la 'Revolución Verde,' y ganó después el Nobel de la Paz, sobre todo en qué país a partir de la década de 1940?|Le scientifique américain Norman Borlaug mena l'essentiel de ses recherches en amélioration du blé, à l'origine de la « révolution verte », et remporta plus tard le prix Nobel de la paix, principalement dans quel pays à partir des années 1940 ?|「緑の革命」を引き起こした小麦の品種改良研究の多くを行い、のちにノーベル平和賞を受けたアメリカ人科学者ノーマン・ボーローグは、1940年代から主にどの国でその研究を行ったか?",
    ["India|India|Inde|インド", "Mexico|México|Mexique|メキシコ", "Egypt|Egipto|Égypte|エジプト"],
    1,
    "Borlaug worked from 1944 at a Rockefeller Foundation-backed research station near Ciudad Obregón, Sonora, developing high-yield, disease-resistant wheat varieties later spread worldwide.|Borlaug trabajó desde 1944 en una estación de investigación respaldada por la Fundación Rockefeller cerca de Ciudad Obregón, Sonora, desarrollando variedades de trigo de alto rendimiento y resistentes a enfermedades.|Borlaug travailla dès 1944 dans une station de recherche soutenue par la Fondation Rockefeller près de Ciudad Obregón, en Sonora, développant des variétés de blé à haut rendement et résistantes aux maladies.|ボーローグは1944年から、ソノラ州シウダー・オブレゴン近郊のロックフェラー財団支援の研究拠点で、のちに世界中に広まる高収量で病気に強い小麦の品種改良に取り組んだ。",
  ),
  q(
    9,
    "According to Mexican census data, Yucatec Maya ranks as roughly which position among Indigenous languages by number of speakers nationwide?|Según los datos censales mexicanos, ¿en qué posición aproximada se ubica el maya yucateco entre las lenguas indígenas por número de hablantes a nivel nacional?|Selon les données du recensement mexicain, le maya yucatèque occupe environ quelle position parmi les langues autochtones par nombre de locuteurs à l'échelle nationale ?|メキシコの国勢調査によれば、ユカテコ・マヤ語は全国の話者数で先住民言語のうちおよそ何番目に位置するか?",
    ["First, ahead of Nahuatl|Primero, por delante del náhuatl|Première, devant le nahuatl|1位(ナワトル語を上回る)", "Second, after Nahuatl|Segundo, después del náhuatl|Deuxième, après le nahuatl|2位(ナワトル語に次ぐ)", "Around tenth|Alrededor del décimo lugar|Autour de la dixième place|10位前後"],
    1,
    "Nahuatl remains the most widely spoken Indigenous language nationally, but Yucatec Maya, concentrated in the Yucatán Peninsula, is generally counted as the second most spoken.|El náhuatl sigue siendo la lengua indígena más hablada a nivel nacional, pero el maya yucateco, concentrado en la península de Yucatán, suele contarse como la segunda más hablada.|Le nahuatl reste la langue autochtone la plus parlée à l'échelle nationale, mais le maya yucatèque, concentré dans la péninsule du Yucatán, est généralement compté comme la deuxième plus parlée.|全国的にはナワトル語がいまも最も話者数の多い先住民言語だが、ユカタン半島に集中するユカテコ・マヤ語は、一般に2番目に話者数の多い言語とされる。",
  ),
  q(
    10,
    "The Aztec Sun Stone, a massive carved basalt monolith often mistakenly called a calendar, was rediscovered in 1790 buried beneath which Mexico City square?|La Piedra del Sol azteca, un enorme monolito de basalto tallado a menudo confundido con un calendario, fue redescubierta en 1790 enterrada bajo qué plaza de la Ciudad de México?|La Pierre du Soleil aztèque, un immense monolithe de basalte sculpté souvent confondu avec un calendrier, fut redécouverte en 1790 enfouie sous quelle place de Mexico ?|しばしば暦盤と誤解される巨大な彫刻入り玄武岩の一枚岩、アステカの「太陽の石」が1790年に埋まっているのが再発見された、メキシコシティの広場は?",
    ["Plaza Garibaldi|Plaza Garibaldi|Place Garibaldi|ガリバルディ広場", "The Zócalo|El Zócalo|Le Zócalo|ソカロ", "Plaza de las Tres Culturas|Plaza de las Tres Culturas|Place des Trois Cultures|三文化広場"],
    1,
    "The stone was unearthed during repairs to the main square and cathedral area and was later mounted on an exterior cathedral wall for public view for decades.|La piedra se desenterró durante obras de reparación en la plaza principal y la zona de la catedral, y luego se montó durante décadas en un muro exterior de la catedral para exhibición pública.|La pierre fut mise au jour lors de travaux de réparation sur la place principale et la zone de la cathédrale, puis montée pendant des décennies sur un mur extérieur de la cathédrale pour être exposée au public.|この石は主広場と大聖堂周辺の修復工事の最中に掘り出され、その後何十年ものあいだ、大聖堂の外壁に取り付けられて一般に公開されていた。",
  ),
  q(
    9,
    "The 1943 eruption of which volcano in Michoacán, which grew from a cornfield into a 336-meter cinder cone within a year, became a landmark case study in volcanology?|La erupción de 1943 de qué volcán en Michoacán, que creció de un maizal a un cono de escoria de 336 metros en un año, se convirtió en un caso de estudio clave de la vulcanología?|L'éruption de 1943 de quel volcan du Michoacán, qui grandit d'un champ de maïs à un cône de scories de 336 mètres en un an, devint une étude de cas majeure en volcanologie ?|1943年、ミチョアカン州でトウモロコシ畑から一年のうちに標高336mの砕屑丘に育ち、火山学の代表的な研究事例となった噴火は?",
    ["Colima|Colima|Colima|コリマ火山", "Popocatépetl|Popocatépetl|Popocatépetl|ポポカテペトル", "Paricutín|Paricutín|Paricutín|パリクティン火山"],
    2,
    "Paricutín erupted on February 20, 1943, in a farmer's field, and its entire birth-to-dormancy life cycle through 1952 was documented in unusual detail by scientists.|El Paricutín entró en erupción el 20 de febrero de 1943 en el campo de un agricultor, y todo su ciclo de vida, desde el nacimiento hasta quedar inactivo en 1952, fue documentado con inusual detalle por científicos.|Le Paricutín entra en éruption le 20 février 1943 dans le champ d'un fermier, et tout son cycle de vie, de sa naissance à son inactivité en 1952, fut documenté avec un luxe de détails inhabituel par les scientifiques.|パリクティン火山は1943年2月20日、ある農民の畑で噴火し、1952年に活動を終えるまでの誕生から静穏化に至る全過程が、科学者たちによって異例なほど詳しく記録された。",
  ),
  q(
    10,
    "Griselda Álvarez became Mexico's first female state governor in 1979, taking office in which state?|Griselda Álvarez se convirtió en la primera gobernadora estatal de México en 1979, al asumir el cargo en qué estado?|Griselda Álvarez devint la première femme gouverneure d'un État mexicain en 1979, en prenant ses fonctions dans quel État ?|1979年、メキシコで初めて州知事に就任した女性グリセルダ・アルバレスが着任したのはどの州か?",
    ["Yucatán|Yucatán|Yucatán|ユカタン州", "Colima|Colima|Colima|コリマ州", "Chiapas|Chiapas|Chiapas|チアパス州"],
    1,
    "Álvarez, also a published poet, governed Colima until 1985, opening the way for more women to hold Mexican state governorships in the decades that followed.|Álvarez, también poeta publicada, gobernó Colima hasta 1985, abriendo camino para que más mujeres ocuparan gubernaturas estatales mexicanas en las décadas siguientes.|Álvarez, également poétesse publiée, gouverna le Colima jusqu'en 1985, ouvrant la voie à davantage de femmes gouverneures d'État mexicaines dans les décennies suivantes.|詩人としても作品を発表していたアルバレスは1985年までコリマ州を統治し、以後の数十年でより多くの女性がメキシコの州知事を務める道を開いた。",
  ),
  q(
    9,
    "Which Mexican architect, known for vividly colored walls and serene courtyards, became the first Latin American to win the Pritzker Architecture Prize, in 1980?|¿Qué arquitecto mexicano, conocido por sus muros de colores vivos y patios serenos, se convirtió en el primer latinoamericano en ganar el Premio Pritzker de Arquitectura, en 1980?|Quel architecte mexicain, connu pour ses murs aux couleurs vives et ses cours sereines, devint le premier Latino-Américain à remporter le prix Pritzker d'architecture, en 1980 ?|鮮やかな色の壁と静謐な中庭で知られ、1980年にラテンアメリカ人として初めてプリツカー建築賞を受賞した建築家は?",
    ["Félix Candela|Félix Candela|Félix Candela|フェリックス・カンデラ", "Ricardo Legorreta|Ricardo Legorreta|Ricardo Legorreta|リカルド・レゴレータ", "Luis Barragán|Luis Barragán|Luis Barragán|ルイス・バラガン"],
    2,
    "Barragán's spare, light-filled style, developed largely in Mexico City, went on to influence architects worldwide long after his 1988 death.|El estilo austero y luminoso de Barragán, desarrollado en gran parte en la Ciudad de México, influyó en arquitectos de todo el mundo mucho después de su muerte en 1988.|Le style épuré et lumineux de Barragán, développé en grande partie à Mexico, influença des architectes du monde entier bien après sa mort en 1988.|主にメキシコシティで培われたバラガンの、簡素で光に満ちた様式は、1988年に彼が没したのちも長く世界中の建築家に影響を与え続けた。",
  ),
  q(
    9,
    "In February 1978, electrical company workers digging in central Mexico City accidentally unearthed a massive carved stone disc depicting which dismembered Aztec goddess, leading to the Templo Mayor excavation?|En febrero de 1978, trabajadores de una compañía eléctrica que excavaban en el centro de la Ciudad de México desenterraron por accidente un enorme disco de piedra tallado que representa a qué diosa azteca desmembrada, lo que llevó a la excavación del Templo Mayor?|En février 1978, des ouvriers de la compagnie d'électricité creusant dans le centre de Mexico mirent accidentellement au jour un immense disque de pierre sculpté représentant quelle déesse aztèque démembrée, menant à la fouille du Templo Mayor ?|1978年2月、メキシコシティ中心部で電力会社の作業員が掘削中に偶然掘り出した、ある解体されたアステカの女神を描いた巨大な石の円盤は誰の像で、それがきっかけでテンプロ・マヨールの発掘につながったか?",
    ["Coatlicue|Coatlicue|Coatlicue|コアトリクエ", "Coyolxauhqui|Coyolxauhqui|Coyolxauhqui|コヨルシャウキ", "Xochiquetzal|Xochiquetzal|Xochiquetzal|ショチケツァル"],
    1,
    "The disc depicts the goddess Coyolxauhqui dismembered, matching an Aztec myth in which she was defeated and cut apart by her brother, the war god Huitzilopochtli.|El disco muestra a la diosa Coyolxauhqui desmembrada, en consonancia con un mito azteca en que fue derrotada y descuartizada por su hermano, el dios de la guerra Huitzilopochtli.|Le disque montre la déesse Coyolxauhqui démembrée, en accord avec un mythe aztèque où elle fut vaincue et découpée par son frère, le dieu de la guerre Huitzilopochtli.|この円盤は解体されたコヨルシャウキ女神を描いており、戦争の神ウィツィロポチトリである弟に敗れ切り刻まれたというアステカの神話と符合する。",
  ),
  q(
    10,
    "The masked Zapatista spokesperson known internationally by the nom de guerre 'Subcomandante Marcos' first drew global attention during the 1994 Chiapas uprising. What is this figure best known for wearing over his face?|El vocero zapatista enmascarado, conocido internacionalmente por el nombre de guerra 'Subcomandante Marcos,' atrajo atención mundial durante el alzamiento de Chiapas de 1994. ¿Qué llevaba puesto sobre el rostro, su rasgo más reconocible?|Le porte-parole zapatiste masqué, connu internationalement sous le nom de guerre « Subcomandante Marcos », attira l'attention mondiale lors du soulèvement du Chiapas en 1994. Que portait-il sur le visage, son trait le plus reconnaissable ?|1994年のチアパス蜂起で世界的な注目を集めた、「サパティスタ副司令官マルコス」という戦名で知られる覆面の指導者が、顔に着けていたことで最もよく知られるものは?",
    ["A black ski mask|Un pasamontañas negro|Une cagoule noire|黒いスキーマスク(目出し帽)", "A jaguar-pattern bandana|Un pañuelo con estampado de jaguar|Un bandana à motif de jaguar|ジャガー柄のバンダナ", "A traditional wooden dance mask|Una máscara de danza tradicional de madera|Un masque de danse traditionnel en bois|伝統的な木彫りの踊りの面"],
    0,
    "Marcos, often photographed with a pipe alongside the mask, used the anonymity partly to argue that the Zapatista cause mattered more than any one individual's identity.|Marcos, a menudo fotografiado con una pipa junto al pasamontañas, usaba el anonimato en parte para argumentar que la causa zapatista importaba más que la identidad de cualquier individuo.|Marcos, souvent photographié avec une pipe aux côtés de la cagoule, utilisait cet anonymat en partie pour soutenir que la cause zapatiste comptait plus que l'identité d'un seul individu.|しばしばパイプをくわえた姿で覆面とともに撮影されたマルコスは、この匿名性を、サパティスタの大義が個人の素性よりも重いのだという主張の一部として用いた。",
  ),
  q(
    9,
    "Mexico's national anthem, first performed in 1854, was set to music by which Spanish-born composer, who won a public competition for the honor?|El himno nacional mexicano, interpretado por primera vez en 1854, fue musicalizado por qué compositor de origen español, que ganó un concurso público para el honor?|L'hymne national mexicain, joué pour la première fois en 1854, fut mis en musique par quel compositeur d'origine espagnole, vainqueur d'un concours public pour cet honneur ?|1854年に初めて演奏されたメキシコ国歌の作曲を手がけ、その栄誉をかけた公募コンテストに勝ったスペイン生まれの作曲家は?",
    ["Manuel M. Ponce|Manuel M. Ponce|Manuel M. Ponce|マヌエル・M・ポンセ", "Jaime Nunó|Jaime Nunó|Jaime Nunó|ハイメ・ヌノー", "Agustín Lara|Agustín Lara|Agustín Lara|アグスティン・ララ"],
    1,
    "Nunó, a Catalan-born bandmaster, won the 1853 music competition; the lyrics, by poet Francisco González Bocanegra, are said in popular legend to have been finished only after his fiancée locked him in a room until he wrote them.|Nunó, director de banda nacido en Cataluña, ganó el concurso musical de 1853; se dice, según una leyenda popular, que la letra, del poeta Francisco González Bocanegra, se terminó solo después de que su prometida lo encerrara en un cuarto hasta que la escribiera.|Nunó, chef de fanfare né en Catalogne, remporta le concours musical de 1853 ; les paroles, du poète Francisco González Bocanegra, n'auraient été achevées, selon la légende populaire, qu'après que sa fiancée l'eut enfermé dans une pièce jusqu'à ce qu'il les écrive.|カタルーニャ生まれの楽団指揮者ヌノーは1853年の作曲コンテストで優勝した。歌詞を書いた詩人フランシスコ・ゴンサレス・ボカネグラについては、婚約者に部屋へ閉じ込められ、書き終えるまで出してもらえなかったという逸話が語り継がれているが、これは伝承であり史実として確認されたものではない。",
  ),
];
