/**
 * イタリアのクイズ(53問)。
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
 * 都市カード(45件)が扱う具体的な事実(パンテオンのオクルス・ヴェネツィアの
 * 木の杭・ポンペイの石膏像・アルベロベッロの言い伝え・レッジョカラブリアの
 * ブロンズ像など)はここでは問わない。代わりに、地理・歴史・食文化・
 * 現代の暮らしなど、**都市カードが触れていない主題**を選んである。
 * エトナ山は2枚(カターニア・タオルミーナ)の都市カードで扱っているため、
 * それ自体を問う設問は避けた。都市カードを「1都市1話」に絞り込んだ際に
 * 外れた話(ダンテの墓・ボローニャのラグー・ヴェローナの円形闘技場・
 * ナポリの地下トンネル・ヌオーロのデレッダ・カリアリのエレベーターなど)は
 * 捨てずにここへ移してある。
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

export const ITALY_QUIZ = [
  q(
    1,
    "What is the capital of Italy?|¿Cuál es la capital de Italia?|Quelle est la capitale de l'Italie ?|イタリアの首都はどこか?",
    ["Milan|Milán|Milan|ミラノ", "Rome|Roma|Rome|ローマ", "Naples|Nápoles|Naples|ナポリ"],
    1,
    "Rome has been Italy's capital since 1871, when troops of the newly unified kingdom breached the walls of what was then the last piece of the Papal States.|Roma es la capital de Italia desde 1871, cuando tropas del reino recién unificado abrieron brecha en las murallas de lo que entonces era el último resto de los Estados Pontificios.|Rome est la capitale de l'Italie depuis 1871, quand les troupes du royaume tout juste unifié percèrent les murs de ce qui restait alors des États pontificaux.|ローマは1871年以来イタリアの首都である。統一されたばかりの王国の軍が、当時なお残っていた教皇領最後の一角の城壁を突破した年である。",
  ),
  q(
    1,
    "Italy's shape on a map is famously said to resemble what?|¿A qué se dice que se parece la forma de Italia en el mapa?|On dit souvent que la forme de l'Italie sur une carte ressemble à quoi ?|地図で見るイタリアの形は、何にたとえられることで有名か?",
    ["A boot|Una bota|Une botte|長靴", "An umbrella|Un paraguas|Un parapluie|傘", "A guitar|Una guitarra|Une guitare|ギター"],
    0,
    "The peninsula's silhouette, narrowing toward Calabria before Sicily sits just off the \"toe,\" is one of the most recognisable national outlines on any world map.|La silueta de la península, que se estrecha hacia Calabria justo antes de que Sicilia quede frente a la «puntera», es uno de los contornos nacionales más reconocibles de cualquier mapamundi.|La silhouette de la péninsule, qui se rétrécit vers la Calabre juste avant que la Sicile ne se trouve devant la « pointe », est l'un des contours nationaux les plus reconnaissables sur n'importe quelle carte du monde.|カラブリアへ向かって細くなり、その「つま先」の先にシチリア島が浮かぶこの半島の輪郭は、世界地図の中でも指折りに見分けやすい国の形である。",
  ),
  q(
    1,
    "What currency is used in Italy?|¿Qué moneda se usa en Italia?|Quelle monnaie utilise-t-on en Italie ?|イタリアで使われている通貨は?",
    ["The Italian lira|La lira italiana|La lire italienne|イタリア・リラ", "The Swiss franc|El franco suizo|Le franc suisse|スイスフラン", "The euro|El euro|L'euro|ユーロ"],
    2,
    "Italy switched from the lira to the euro in 2002, though the exchange rate had already been locked in place three years earlier, in 1999.|Italia pasó de la lira al euro en 2002, aunque el tipo de cambio ya se había fijado tres años antes, en 1999.|L'Italie est passée de la lire à l'euro en 2002, bien que le taux de change eût déjà été fixé trois ans plus tôt, en 1999.|イタリアは2002年にリラからユーロへ切り替えたが、交換レート自体はその3年前、1999年にはすでに固定されていた。",
  ),
  q(
    2,
    "Which continent is Italy part of?|¿A qué continente pertenece Italia?|De quel continent l'Italie fait-elle partie ?|イタリアが属する大陸は?",
    ["Africa|África|Afrique|アフリカ", "Europe|Europa|Europe|ヨーロッパ", "Asia|Asia|Asie|アジア"],
    1,
    "Italy sits in southern Europe, with the Alps forming a natural wall along its northern border and the rest of the peninsula reaching south into the Mediterranean Sea.|Italia se sitúa en el sur de Europa, con los Alpes formando un muro natural en su frontera norte y el resto de la península adentrándose hacia el sur en el Mediterráneo.|L'Italie se trouve en Europe du Sud, les Alpes formant un mur naturel le long de sa frontière nord tandis que le reste de la péninsule s'avance vers le sud dans la mer Méditerranée.|イタリアは南ヨーロッパに位置し、北の国境にはアルプス山脈が天然の壁をなし、半島の残りの部分は地中海へ向かって南に伸びている。",
  ),
  q(
    2,
    "What are the three colours of the Italian flag, from left to right?|¿Cuáles son los tres colores de la bandera italiana, de izquierda a derecha?|Quelles sont les trois couleurs du drapeau italien, de gauche à droite ?|イタリア国旗の左から右への三色は?",
    ["Red, white, green|Rojo, blanco, verde|Rouge, blanc, vert|赤・白・緑", "Blue, white, red|Azul, blanco, rojo|Bleu, blanc, rouge|青・白・赤", "Green, white, red|Verde, blanco, rojo|Vert, blanc, rouge|緑・白・赤"],
    2,
    "The tricolour is modelled on the flag carried by Napoleon's short-lived Cispadane Republic in 1797, itself inspired by the French flag but swapping blue for green.|El tricolor se inspira en la bandera de la efímera República Cispadana de Napoleón en 1797, a su vez inspirada en la bandera francesa pero cambiando el azul por el verde.|Le tricolore s'inspire du drapeau de l'éphémère République cispadane de Napoléon en 1797, elle-même inspirée du drapeau français mais remplaçant le bleu par le vert.|この三色旗は1797年、ナポレオンが作った短命のチザルピーナ共和国の旗をもとにしている。その旗自体はフランス国旗に着想を得ながら、青を緑に変えたものだった。",
  ),
  q(
    2,
    "What language do most people in Italy speak?|¿Qué idioma habla la mayoría de la gente en Italia?|Quelle langue parle la majorité des habitants d'Italie ?|イタリアで最も多くの人が話す言語は?",
    ["Spanish|Español|Espagnol|スペイン語", "Italian|Italiano|Italien|イタリア語", "Latin|Latín|Latin|ラテン語"],
    1,
    "Standard Italian only became the everyday language of most households in the 20th century, spread largely by school, military service and later television, after centuries in which most people spoke a regional dialect at home.|El italiano estándar solo se volvió la lengua cotidiana de la mayoría de los hogares en el siglo XX, difundido en gran parte por la escuela, el servicio militar y luego la televisión.|L'italien standard n'est devenu la langue quotidienne de la plupart des foyers qu'au XXe siècle, diffusé en grande partie par l'école, le service militaire puis la télévision.|標準イタリア語が大半の家庭で日常語になったのは20世紀に入ってからで、それまで何世紀も家庭では地方の方言が話されており、学校教育や兵役、のちにテレビが普及の主な担い手となった。",
  ),
  q(
    3,
    "Which independent country is a tiny enclave entirely surrounded by the city of Rome?|¿Qué país independiente es un pequeño enclave completamente rodeado por la ciudad de Roma?|Quel pays indépendant est une minuscule enclave entièrement entourée par la ville de Rome ?|ローマ市に完全に囲まれた小さな独立国は?",
    ["Monaco|Mónaco|Monaco|モナコ", "Liechtenstein|Liechtenstein|Liechtenstein|リヒテンシュタイン", "Vatican City|Ciudad del Vaticano|Cité du Vatican|バチカン市国"],
    2,
    "At about 0.49 square kilometres, Vatican City is the smallest internationally recognised country on Earth, small enough to walk across in under fifteen minutes.|Con unos 0,49 km², la Ciudad del Vaticano es el país reconocido internacionalmente más pequeño del planeta, tan pequeño que se cruza a pie en menos de quince minutos.|Avec environ 0,49 km², la Cité du Vatican est le plus petit pays reconnu internationalement au monde, assez petit pour le traverser à pied en moins d'un quart d'heure.|面積およそ0.49平方キロメートルのバチカン市国は、国際的に承認された国としては世界最小で、歩いて15分もかからずに横断できるほどの広さしかない。",
  ),
  q(
    3,
    "Which food is Italy most associated with around the world?|¿Con qué comida se asocia más a Italia en todo el mundo?|À quel plat associe-t-on le plus l'Italie dans le monde ?|世界でイタリアと最も結びつけられる食べ物は?",
    ["Sushi|Sushi|Sushi|寿司", "Pasta|Pasta|Pâtes|パスタ", "Tacos|Tacos|Tacos|タコス"],
    1,
    "Italians eat an estimated 23 kilograms of pasta per person a year on average, more than any other country, and there are officially over 300 recognised shapes.|Los italianos comen en promedio unos 23 kg de pasta por persona al año, más que en ningún otro país, y existen oficialmente más de 300 formas reconocidas.|Les Italiens mangent en moyenne environ 23 kg de pâtes par personne et par an, plus que tout autre pays, et il existe officiellement plus de 300 formes reconnues.|イタリア人は一人あたり年間およそ23kgのパスタを食べるとされ、これは世界で最も多い数字である。公式に認められた形だけでも300種を超える。",
  ),
  q(
    3,
    "Roughly how many time zones does mainland Italy use?|¿Cuántas zonas horarias usa aproximadamente la Italia continental?|Combien de fuseaux horaires utilise environ l'Italie continentale ?|イタリア本土が使う標準時はおよそいくつか?",
    ["Just one|Solo una|Un seul|1つだけ", "Two|Dos|Deux|2つ", "Three|Tres|Trois|3つ"],
    0,
    "Despite stretching over 1,200 km from the Alps to Sicily, all of Italy keeps a single clock, Central European Time, one hour ahead of London.|Pese a extenderse más de 1.200 km desde los Alpes hasta Sicilia, toda Italia mantiene un único horario, la hora centroeuropea, una hora por delante de Londres.|Bien qu'elle s'étende sur plus de 1 200 km des Alpes à la Sicile, toute l'Italie garde une seule heure, l'heure d'Europe centrale, en avance d'une heure sur Londres.|アルプスからシチリアまで1200kmを超えて広がるにもかかわらず、イタリア全土は中央ヨーロッパ時間という一つの時刻だけを使っており、ロンドンより1時間進んでいる。",
  ),
  q(
    4,
    "Which mural did Leonardo da Vinci paint on the wall of a Milan convent dining hall?|¿Qué mural pintó Leonardo da Vinci en la pared del refectorio de un convento de Milán?|Quelle fresque Léonard de Vinci peignit-il sur le mur du réfectoire d'un couvent de Milan ?|レオナルド・ダ・ヴィンチがミラノの修道院の食堂の壁に描いた壁画は?",
    ["The Creation of Adam|La creación de Adán|La Création d'Adam|アダムの創造", "The Last Supper|La Última Cena|La Cène|最後の晩餐", "The Birth of Venus|El nacimiento de Venus|La Naissance de Vénus|ヴィーナスの誕生"],
    1,
    "Da Vinci painted it in the 1490s using an experimental technique instead of true fresco, which let him work slowly but meant the paint began flaking within decades, and it has been restored many times since.|Da Vinci lo pintó en la década de 1490 con una técnica experimental en vez del fresco tradicional, lo que le permitió trabajar despacio pero hizo que la pintura empezara a desprenderse en pocas décadas.|Léonard de Vinci le peignit dans les années 1490 avec une technique expérimentale plutôt qu'à fresque véritable, ce qui lui permit de travailler lentement mais fit que la peinture commença à s'écailler en quelques décennies.|ダ・ヴィンチはこれを1490年代、本来のフレスコ技法ではなく実験的な技法で描いた。おかげでゆっくり描き進められたが、そのぶん数十年のうちに絵の具が剥落し始め、以来何度も修復されてきた。",
  ),
  q(
    4,
    "What is the traditional custom about ordering a cappuccino in Italy?|¿Cuál es la costumbre tradicional sobre pedir un capuchino en Italia?|Quelle est la coutume traditionnelle concernant la commande d'un cappuccino en Italie ?|イタリアでカプチーノを頼むときの伝統的な習わしは?",
    ["It is only drunk in the morning|Solo se toma por la mañana|Il ne se boit que le matin|朝しか飲まない", "It must be ordered with sugar|Debe pedirse con azúcar|Il doit être commandé avec du sucre|必ず砂糖を入れて頼む", "It is only served after dinner|Solo se sirve después de la cena|Il n'est servi qu'après le dîner|夕食後にしか出さない"],
    0,
    "Ordering a milky coffee after about eleven in the morning, and especially after a meal, is widely seen as odd, since Italians consider that much milk hard on digestion later in the day.|Pedir un café con leche después de las once de la mañana, y sobre todo tras una comida, se considera raro, ya que los italianos creen que tanta leche resulta pesada para la digestión más tarde.|Commander un café au lait après onze heures du matin, et surtout après un repas, est largement jugé étrange, les Italiens estimant qu'autant de lait pèse sur la digestion plus tard dans la journée.|午前11時を過ぎてから、とくに食後にミルク入りのコーヒーを頼むのは奇妙に思われることが多い。イタリア人はそれだけの量のミルクが夕方以降の消化に良くないと考えているためである。",
  ),
  q(
    4,
    "Which tiny country, one of the world's oldest republics, is completely surrounded by Italian territory near the Apennines?|¿Qué pequeño país, una de las repúblicas más antiguas del mundo, está totalmente rodeado por territorio italiano cerca de los Apeninos?|Quel minuscule pays, l'une des plus anciennes républiques du monde, est entièrement entouré de territoire italien près des Apennins ?|アペニン山脈の近くでイタリア領に完全に囲まれた、世界最古級の共和国とされる小国は?",
    ["Andorra|Andorra|Andorre|アンドラ", "Luxembourg|Luxemburgo|Luxembourg|ルクセンブルク", "San Marino|San Marino|Saint-Marin|サンマリノ"],
    2,
    "San Marino traces its founding to a stonemason in the year 301 and, at about 61 square kilometres, is still small enough that its whole population could fit inside a large football stadium.|San Marino remonta su fundación a un cantero del año 301 y, con unos 61 km², sigue siendo tan pequeño que toda su población cabría en un gran estadio de fútbol.|Saint-Marin fait remonter sa fondation à un tailleur de pierre de l'an 301 et, avec environ 61 km², reste assez petit pour que toute sa population tienne dans un grand stade de football.|サンマリノは西暦301年、一人の石工が興したとされる建国伝説を持つ。面積は約61平方キロメートルで、全人口がサッカーの大型競技場に収まってしまうほど小さい。",
  ),
  q(
    4,
    "Which Venetian merchant is famous for travelling overland to China in the 13th century and writing about it?|¿Qué mercader veneciano es famoso por viajar por tierra hasta China en el siglo XIII y escribir sobre ello?|Quel marchand vénitien est célèbre pour avoir voyagé par voie de terre jusqu'en Chine au XIIIe siècle et en avoir écrit le récit ?|13世紀に陸路で中国まで旅し、それを書き記したことで知られるヴェネツィアの商人は?",
    ["Amerigo Vespucci|Américo Vespucio|Amerigo Vespucci|アメリゴ・ヴェスプッチ", "Marco Polo|Marco Polo|Marco Polo|マルコ・ポーロ", "Giovanni Caboto|Giovanni Caboto|Giovanni Caboto|ジョヴァンニ・カボト"],
    1,
    "Marco Polo spent roughly 17 years travelling and working in Kublai Khan's China, and the account he later dictated in a Genoese prison, \"The Travels of Marco Polo,\" shaped European ideas of Asia for centuries.|Marco Polo pasó unos 17 años viajando y trabajando en la China de Kublai Khan, y el relato que más tarde dictó en una prisión genovesa, «Los viajes de Marco Polo», moldeó las ideas europeas sobre Asia durante siglos.|Marco Polo passa quelque 17 ans à voyager et travailler dans la Chine de Kubilai Khan, et le récit qu'il dicta plus tard dans une prison génoise, « Le Livre des merveilles », façonna pendant des siècles l'idée que l'Europe se faisait de l'Asie.|マルコ・ポーロはフビライ・ハン治下の中国でおよそ17年を旅と仕官に費やし、のちにジェノヴァの牢獄で口述筆記させた『東方見聞録』は、その後何世紀にもわたりヨーロッパのアジア観を形作った。",
  ),
  q(
    5,
    "What is the longest river in Italy?|¿Cuál es el río más largo de Italia?|Quel est le plus long fleuve d'Italie ?|イタリアで最も長い川は?",
    ["The Tiber|El Tíber|Le Tibre|テヴェレ川", "The Arno|El Arno|L'Arno|アルノ川", "The Po|El Po|Le Pô|ポー川"],
    2,
    "The Po runs about 652 km from the Cottian Alps near the French border across the entire north of the country to the Adriatic, and its valley produces roughly a third of Italy's food.|El Po recorre unos 652 km desde los Alpes Cocias, cerca de la frontera francesa, a través de todo el norte del país hasta el Adriático, y su valle produce aproximadamente un tercio de los alimentos de Italia.|Le Pô parcourt environ 652 km depuis les Alpes cottiennes, près de la frontière française, à travers tout le nord du pays jusqu'à l'Adriatique, et sa vallée produit environ un tiers de la nourriture de l'Italie.|ポー川はフランス国境近くのコッティアン・アルプスから国の北部を横断して約652km流れ、アドリア海に注ぐ。その流域はイタリアの食料のおよそ3分の1を生み出している。",
  ),
  q(
    5,
    "How many times has the Italian men's football team won the FIFA World Cup?|¿Cuántas veces ha ganado la selección masculina de fútbol de Italia la Copa Mundial de la FIFA?|Combien de fois l'équipe masculine de football d'Italie a-t-elle remporté la Coupe du monde de la FIFA ?|イタリアのサッカー男子代表がワールドカップで優勝した回数は?",
    ["Twice|Dos veces|Deux fois|2回", "Six times|Seis veces|Six fois|6回", "Four times|Cuatro veces|Quatre fois|4回"],
    2,
    "Italy has won the World Cup four times, in 1934, 1938, 1982 and 2006, second only to Brazil's five titles.|Italia ha ganado el Mundial cuatro veces, en 1934, 1938, 1982 y 2006, solo por detrás de los cinco títulos de Brasil.|L'Italie a remporté la Coupe du monde quatre fois, en 1934, 1938, 1982 et 2006, juste derrière les cinq titres du Brésil.|イタリアは1934年・1938年・1982年・2006年の4回ワールドカップで優勝しており、5回のブラジルに次ぐ記録である。",
  ),
  q(
    5,
    "Which composer, born in 1813, wrote the operas Rigoletto, La Traviata and Aida?|¿Qué compositor, nacido en 1813, escribió las óperas Rigoletto, La Traviata y Aida?|Quel compositeur, né en 1813, écrivit les opéras Rigoletto, La Traviata et Aïda ?|1813年生まれで、歌劇『リゴレット』『椿姫』『アイーダ』を作曲したのは?",
    ["Giuseppe Verdi|Giuseppe Verdi|Giuseppe Verdi|ジュゼッペ・ヴェルディ", "Antonio Vivaldi|Antonio Vivaldi|Antonio Vivaldi|アントニオ・ヴィヴァルディ", "Gioachino Rossini|Gioachino Rossini|Gioachino Rossini|ジョアキーノ・ロッシーニ"],
    0,
    "Verdi became such a symbol of Italian unification that crowds reportedly chanted his surname as a coded slogan for King Victor Emmanuel, since the letters also spelled out the king's royal title.|Verdi se convirtió en tal símbolo de la unificación italiana que, según se cuenta, las multitudes coreaban su apellido como consigna en clave por el rey Víctor Manuel, ya que las letras también formaban el título real del rey.|Verdi devint un tel symbole de l'unification italienne que les foules scandaient, dit-on, son nom comme un slogan codé pour le roi Victor-Emmanuel, les lettres épelant aussi le titre royal du souverain.|ヴェルディはイタリア統一の象徴的存在となり、群衆は彼の姓を暗号のスローガンとして唱えたと伝えられる。その綴りの頭文字が国王ヴィットーリオ・エマヌエーレの称号とも重なっていたためである。",
  ),
  q(
    5,
    "In what year was the Kingdom of Italy proclaimed, unifying most of the peninsula for the first time in centuries?|¿En qué año se proclamó el Reino de Italia, unificando la mayor parte de la península por primera vez en siglos?|En quelle année le royaume d'Italie fut-il proclamé, unifiant la majeure partie de la péninsule pour la première fois en des siècles ?|半島の大部分が何世紀ぶりかに統一され、イタリア王国が成立したのは何年か?",
    ["1815|1815|1815|1815年", "1861|1861|1861|1861年", "1914|1914|1914|1914年"],
    1,
    "The kingdom was declared in March 1861 after a decade of wars and political manoeuvring led largely by the Kingdom of Sardinia, though Rome itself did not join until 1870.|El reino se proclamó en marzo de 1861 tras una década de guerras y maniobras políticas encabezadas en gran parte por el Reino de Cerdeña, aunque la propia Roma no se sumó hasta 1870.|Le royaume fut proclamé en mars 1861 après une décennie de guerres et de manœuvres politiques menées en grande partie par le royaume de Sardaigne, bien que Rome elle-même ne le rejoignît qu'en 1870.|王国は1861年3月、主にサルデーニャ王国が主導した10年にわたる戦争と政治的駆け引きの末に宣言された。ただしローマ自体が加わったのは1870年になってからである。",
  ),
  q(
    6,
    "Into how many administrative regions is Italy divided?|¿En cuántas regiones administrativas se divide Italia?|En combien de régions administratives l'Italie est-elle divisée ?|イタリアはいくつの行政地方(州)に分かれているか?",
    ["12|12|12|12", "30|30|30|30", "20|20|20|20"],
    2,
    "Italy has 20 regions, five of which — including Sicily and Sardinia — hold special autonomous status with extra powers over matters like language and taxation.|Italia tiene 20 regiones, cinco de las cuales —entre ellas Sicilia y Cerdeña— gozan de estatuto especial de autonomía con competencias adicionales en materia de idioma y fiscalidad.|L'Italie compte 20 régions, dont cinq — dont la Sicile et la Sardaigne — jouissent d'un statut spécial d'autonomie avec des pouvoirs supplémentaires en matière de langue et de fiscalité.|イタリアは20の州に分かれており、そのうちシチリアやサルデーニャを含む5州は特別自治州として、言語や税制などについて追加の権限を持つ。",
  ),
  q(
    6,
    "Which country has the most UNESCO World Heritage Sites of any country on Earth?|¿Qué país tiene más lugares Patrimonio de la Humanidad de la UNESCO que ningún otro en el mundo?|Quel pays compte le plus de sites du patrimoine mondial de l'UNESCO au monde ?|世界でユネスコ世界遺産の登録数が最も多い国は?",
    ["China|China|Chine|中国", "Italy|Italia|Italie|イタリア", "France|Francia|France|フランス"],
    1,
    "Italy and China have traded the top spot for years, each holding close to 60 sites, a density that reflects how many separate cities and regions built at monumental scale across more than two thousand years.|Italia y China se han disputado el primer puesto durante años, cada una con cerca de 60 sitios, una densidad que refleja cuántas ciudades y regiones distintas construyeron a escala monumental a lo largo de más de dos mil años.|L'Italie et la Chine se disputent la première place depuis des années, chacune comptant près de 60 sites, une densité qui reflète le nombre de villes et régions distinctes ayant bâti à une échelle monumentale sur plus de deux mille ans.|イタリアと中国はここ何年も首位を争っており、それぞれおよそ60件の登録数を持つ。二千年以上にわたり、これほど多くの都市や地方が記念碑的な規模で建造を重ねてきたことの表れである。",
  ),
  q(
    6,
    "The \"Slow Food\" movement, promoting local ingredients over fast food, was founded in Italy in reaction to the opening of what?|¿En reacción a la apertura de qué se fundó en Italia el movimiento «Slow Food», que promueve ingredientes locales frente a la comida rápida?|Le mouvement « Slow Food », promouvant les ingrédients locaux face à la restauration rapide, fut fondé en Italie en réaction à l'ouverture de quoi ?|地元産の食材を大事にする「スローフード運動」は、イタリアで何の開店への反発として始まったか?",
    ["A McDonald's near the Spanish Steps|Un McDonald's cerca de la Escalinata de la Trinità dei Monti|Un McDonald's près de la place d'Espagne|スペイン広場近くのマクドナルド", "A shopping mall in Milan|Un centro comercial en Milán|Un centre commercial à Milan|ミラノのショッピングモール", "A theme park in Florence|Un parque temático en Florencia|Un parc à thème à Florence|フィレンツェのテーマパーク"],
    0,
    "The 1986 opening of a McDonald's near Rome's Spanish Steps prompted food writer Carlo Petrini to found the movement, which now has chapters in over 160 countries.|La apertura en 1986 de un McDonald's cerca de la Escalinata de Roma llevó al escritor gastronómico Carlo Petrini a fundar el movimiento, que hoy tiene sedes en más de 160 países.|L'ouverture en 1986 d'un McDonald's près de la place d'Espagne à Rome poussa l'écrivain gastronomique Carlo Petrini à fonder le mouvement, aujourd'hui présent dans plus de 160 pays.|1986年、ローマのスペイン広場近くにマクドナルドが開店したことをきっかけに、食評論家カルロ・ペトリーニがこの運動を立ち上げた。いまでは160を超える国に支部を持つ。",
  ),
  q(
    6,
    "Pizza Margherita, with its red tomato, white mozzarella and green basil, is traditionally said to have been named for whom?|¿En honor a quién se dice tradicionalmente que se nombró la pizza margarita, con su tomate rojo, mozzarella blanca y albahaca verde?|En l'honneur de qui la pizza margherita, avec sa tomate rouge, sa mozzarella blanche et son basilic vert, aurait-elle traditionnellement été nommée ?|赤いトマト・白いモッツァレラ・緑のバジルを使うピッツァ・マルゲリータは、伝統的に誰にちなんで名付けられたとされるか?",
    ["A famous chef|Un chef famoso|Un chef célèbre|有名な料理人", "A saint's feast day|La festividad de un santo|La fête d'un saint|ある聖人の祝日", "Queen Margherita of Savoy|La reina Margarita de Saboya|La reine Marguerite de Savoie|サヴォイア家のマルゲリータ王妃"],
    2,
    "According to the popular story, a Naples pizzaiolo created the topping combination in 1889 in honour of a royal visit, choosing colours that matched the Italian flag.|Según la historia popular, un pizzaiolo napolitano creó esta combinación de ingredientes en 1889 en honor a una visita real, eligiendo colores que coincidían con la bandera italiana.|Selon l'histoire populaire, un pizzaiolo napolitain aurait créé cette combinaison d'ingrédients en 1889 en l'honneur d'une visite royale, choisissant des couleurs assorties au drapeau italien.|よく語られる話では、1889年にナポリのピッツァ職人が王室の訪問を記念してこの組み合わせを考案し、イタリア国旗と同じ色を選んだとされる。",
  ),
  q(
    6,
    "Which 19th-century Tuscan writer created the wooden puppet Pinocchio?|¿Qué escritor toscano del siglo XIX creó la marioneta de madera Pinocho?|Quel écrivain toscan du XIXe siècle créa la marionnette de bois Pinocchio ?|木の操り人形ピノッキオを生み出した19世紀トスカーナの作家は?",
    ["Italo Calvino|Italo Calvino|Italo Calvino|イタロ・カルヴィーノ", "Carlo Collodi|Carlo Collodi|Carlo Collodi|カルロ・コッローディ", "Umberto Eco|Umberto Eco|Umberto Eco|ウンベルト・エーコ"],
    1,
    "Collodi, a pen name taken from his mother's Tuscan hometown, originally published the story in weekly instalments in a children's magazine starting in 1881 and killed Pinocchio off partway through before readers demanded he bring the puppet back.|Collodi, seudónimo tomado del pueblo toscano de su madre, publicó originalmente la historia en entregas semanales en una revista infantil desde 1881, y mató a Pinocho a mitad de la trama antes de que los lectores exigieran resucitarlo.|Collodi, pseudonyme emprunté à la ville toscane natale de sa mère, publia d'abord l'histoire en feuilleton hebdomadaire dans un magazine pour enfants à partir de 1881, et tua Pinocchio à mi-parcours avant que les lecteurs n'exigent sa résurrection.|コッローディは母の故郷であるトスカーナの町の名を借りたペンネームで、1881年から子ども向け雑誌に毎週連載する形でこの物語を発表した。途中でピノッキオを死なせてしまったが、読者の要求で復活させることになった。",
  ),
  q(
    7,
    "Which Renaissance artist spent about four years painting the ceiling of the Sistine Chapel while standing on scaffolding, not lying on his back as legend often says?|¿Qué artista renacentista pasó unos cuatro años pintando el techo de la Capilla Sixtina de pie sobre un andamio, y no tumbado boca arriba como suele decir la leyenda?|Quel artiste de la Renaissance passa environ quatre ans à peindre le plafond de la chapelle Sixtine debout sur un échafaudage, et non allongé sur le dos comme le veut souvent la légende ?|システィーナ礼拝堂の天井を、伝説でよく言われるような仰向けではなく足場の上に立って約4年かけて描いたルネサンスの芸術家は?",
    ["Raphael|Rafael|Raphaël|ラファエロ", "Michelangelo|Miguel Ángel|Michel-Ange|ミケランジェロ", "Donatello|Donatello|Donatello|ドナテッロ"],
    1,
    "Michelangelo designed a custom scaffold that let him stand and lean backward to reach the ceiling, a posture that reportedly left him with lasting neck and eye strain, according to a poem he wrote complaining about the work.|Miguel Ángel diseñó un andamio a medida que le permitía ponerse de pie e inclinarse hacia atrás para alcanzar el techo, una postura que, según un poema suyo quejándose del trabajo, le dejó secuelas duraderas en el cuello y la vista.|Michel-Ange conçut un échafaudage sur mesure lui permettant de se tenir debout et de se pencher en arrière pour atteindre le plafond, posture qui lui aurait laissé, selon un poème où il se plaint du travail, des séquelles durables au cou et aux yeux.|ミケランジェロは天井に届くよう、立ったまま体を後ろへ反らせられる特注の足場を設計した。この姿勢のせいで首や目に長く後遺症が残ったと、彼自身が仕事の苦しさを愚痴った詩に記している。",
  ),
  q(
    7,
    "Italy's national anthem is commonly known by the nickname \"Fratelli d'Italia,\" which translates to what?|El himno nacional de Italia se conoce comúnmente por el apodo «Fratelli d'Italia», que significa ¿qué?|L'hymne national italien est communément connu sous le surnom « Fratelli d'Italia », qui signifie quoi ?|イタリア国歌は通称「フラテッリ・ディタリア」と呼ばれるが、これはどういう意味か?",
    ["Brothers of Italy|Hermanos de Italia|Frères d'Italie|イタリアの兄弟たち", "Sons of the Sea|Hijos del mar|Fils de la mer|海の息子たち", "Land of the Free|Tierra de los libres|Terre des libres|自由の地"],
    0,
    "Written in 1847 by a 20-year-old poet, Goffredo Mameli, the anthem only became official in 1946 when Italy became a republic, and stayed \"provisional\" in law for over 70 years before Parliament finally confirmed it in 2017.|Escrito en 1847 por un poeta de 20 años, Goffredo Mameli, el himno solo se hizo oficial en 1946, cuando Italia se convirtió en república, y siguió siendo «provisional» por ley durante más de 70 años antes de que el Parlamento lo confirmara en 2017.|Écrit en 1847 par un poète de 20 ans, Goffredo Mameli, l'hymne ne devint officiel qu'en 1946, quand l'Italie devint une république, et resta « provisoire » en droit pendant plus de 70 ans avant que le Parlement ne le confirme enfin en 2017.|1847年、20歳の詩人ゴッフレード・マメーリが書いたこの国歌は、イタリアが共和国になった1946年に正式なものとなったが、法律上は70年以上「暫定」のままで、2017年になってようやく議会が正式に確定した。",
  ),
  q(
    7,
    "Which green sauce, traditionally made with basil, pine nuts, garlic and cheese, originates in the region around Genoa?|¿Qué salsa verde, tradicionalmente hecha con albahaca, piñones, ajo y queso, es originaria de la región de Génova?|Quelle sauce verte, traditionnellement à base de basilic, pignons, ail et fromage, est originaire de la région de Gênes ?|バジル・松の実・ニンニク・チーズで作る、ジェノヴァ周辺が発祥の緑色のソースは?",
    ["Pesto|Pesto|Pesto|ジェノヴァペースト(ペスト)", "Ragù|Ragú|Ragù|ラグー", "Salsa verde di Modena|Salsa verde de Módena|Sauce verte de Modène|モデナの緑ソース"],
    0,
    "The name comes from pestare, \"to pound,\" since it was traditionally made by crushing the ingredients with a mortar and pestle, a method some Ligurian cooks still insist gives a better texture than a blender.|El nombre viene de pestare, «machacar», ya que tradicionalmente se hacía triturando los ingredientes con mortero y mano, un método que algunos cocineros de Liguria aún insisten en que da mejor textura que la batidora.|Le nom vient de pestare, « piler », car on le préparait traditionnellement en écrasant les ingrédients au mortier et au pilon, méthode dont certains cuisiniers ligures affirment encore qu'elle donne une meilleure texture qu'un mixeur.|この名は「叩き潰す」を意味するペスターレに由来する。伝統的には乳鉢と乳棒で材料をすり潰して作られており、リグーリアの料理人の中にはいまもミキサーよりこの方法のほうが良い舌触りになると言い張る人がいる。",
  ),
  q(
    7,
    "Italy's wine-quality classification system, similar to France's AOC, uses which abbreviation for its top-tier wines?|El sistema italiano de clasificación de calidad del vino, similar al AOC francés, ¿qué sigla usa para sus vinos de más alto nivel?|Le système italien de classification de la qualité du vin, semblable à l'AOC française, utilise quel sigle pour ses vins de plus haut niveau ?|フランスのAOCに似た、イタリアの最上位のワイン品質分類の略称は?",
    ["DOCG|DOCG|DOCG|DOCG", "AOC|AOC|AOC|AOC", "PDO-X|PDO-X|PDO-X|PDO-X"],
    0,
    "DOCG stands for Denominazione di Origine Controllata e Garantita, and wines earning it are tasted and chemically tested by government inspectors before each bottle is sealed with a numbered government strip.|DOCG significa Denominazione di Origine Controllata e Garantita, y los vinos que la obtienen son catados y analizados químicamente por inspectores del gobierno antes de que cada botella se selle con una tira numerada oficial.|DOCG signifie Denominazione di Origine Controllata e Garantita, et les vins qui l'obtiennent sont dégustés et analysés chimiquement par des inspecteurs du gouvernement avant que chaque bouteille ne soit scellée d'une bande numérotée officielle.|DOCGは「統制保証原産地呼称」の略で、この認証を得たワインは政府の検査官によって試飲と化学分析を受けたのち、各瓶に番号付きの公的な封印帯が貼られる。",
  ),
  q(
    8,
    "Traditional balsamic vinegar, aged in a series of wooden barrels for years or decades, is a specialty of which city?|El vinagre balsámico tradicional, envejecido en una serie de barriles de madera durante años o décadas, es especialidad de qué ciudad?|Le vinaigre balsamique traditionnel, vieilli dans une série de fûts de bois pendant des années voire des décennies, est une spécialité de quelle ville ?|木樽を何種類も移し替えながら何年、時には何十年も熟成させる伝統的バルサミコ酢は、どの町の名産か?",
    ["Modena|Módena|Modène|モデナ", "Verona|Verona|Vérone|ヴェローナ", "Turin|Turín|Turin|トリノ"],
    0,
    "The finest traditional balsamic vinegar of Modena is aged at least 12 years in a shrinking series of barrels made from different woods, and a small 100 ml bottle of the oldest grades can cost well over 100 euros.|El mejor vinagre balsámico tradicional de Módena se añeja al menos 12 años en una serie decreciente de barriles de distintas maderas, y una botellita de 100 ml de los grados más añejos puede costar bastante más de 100 euros.|Le meilleur vinaigre balsamique traditionnel de Modène vieillit au moins 12 ans dans une série décroissante de fûts de bois différents, et une petite bouteille de 100 ml des qualités les plus vieilles peut coûter bien plus de 100 euros.|モデナの最上級の伝統的バルサミコ酢は、異なる木材で作られた大きさの違う樽を渡り歩きながら最低12年熟成される。最も古い等級では100mlの小瓶が100ユーロを優に超えることもある。",
  ),
  q(
    8,
    "About how many separate comuni (municipalities), from tiny alpine villages to Rome, does Italy have?|¿Cuántos comuni (municipios) distintos, desde pequeñas aldeas alpinas hasta Roma, tiene aproximadamente Italia?|Combien de comuni (communes) distincts, des petits villages alpins jusqu'à Rome, l'Italie compte-t-elle environ ?|小さな山あいの村からローマまで、イタリアにはおよそいくつのコムーネ(基礎自治体)があるか?",
    ["About 800|Unos 800|Environ 800|約800", "About 3,000|Unos 3.000|Environ 3 000|約3000", "About 7,900|Unos 7.900|Environ 7 900|約7900"],
    2,
    "Nearly 70% of Italy's roughly 7,900 comuni have fewer than 5,000 residents, and the country has run repeated incentive schemes to encourage people to move into the emptiest of them, sometimes selling old houses for a symbolic one euro.|Cerca del 70% de los aproximadamente 7.900 comuni de Italia tienen menos de 5.000 habitantes, y el país ha lanzado repetidos programas de incentivos para atraer gente a los más vacíos, a veces vendiendo casas viejas por un euro simbólico.|Près de 70 % des quelque 7 900 comuni d'Italie comptent moins de 5 000 habitants, et le pays a lancé à plusieurs reprises des programmes incitatifs pour attirer des habitants dans les plus désertés, vendant parfois de vieilles maisons pour un euro symbolique.|イタリアのおよそ7900あるコムーネのうち、およそ7割は人口5000人に満たない。国はこうした過疎の町へ人を呼び込むため、古い家を象徴的な1ユーロで売る施策など、繰り返し誘致策を打ち出してきた。",
  ),
  q(
    8,
    "The everyday Italian greeting \"ciao\" comes from a Venetian dialect phrase that literally meant what?|El saludo cotidiano italiano «ciao» proviene de una frase del dialecto veneciano que literalmente significaba ¿qué?|Le salut italien courant « ciao » vient d'une expression du dialecte vénitien qui signifiait littéralement quoi ?|イタリア語の日常的なあいさつ「チャオ」は、もとはヴェネツィア方言のどんな言葉に由来するか?",
    ["\"Good day to you\"|«Buen día para ti»|« Bonne journée à toi »|「良い一日を」", "\"Until we meet again\"|«Hasta que nos volvamos a ver»|« Jusqu'à ce qu'on se revoie »|「また会うまで」", "\"I am your slave\"|«Soy tu esclavo»|« Je suis ton esclave »|「私はあなたの奴隷です」"],
    2,
    "The word descends from the Venetian s-ciào (vostro), a courtly phrase meaning \"(I am) your slave,\" offered as a humble greeting between equals, and it only spread as informal Italian slang across the country in the 20th century.|La palabra desciende del veneciano s-ciào (vostro), una fórmula cortesana que significaba «(soy) su esclavo», ofrecida como saludo humilde entre iguales, y solo se extendió como argot informal italiano por todo el país en el siglo XX.|Le mot descend du vénitien s-ciào (vostro), formule de cour signifiant « (je suis) votre esclave », offerte en salut humble entre égaux, et ne s'est répandu comme argot informel italien dans tout le pays qu'au XXe siècle.|この語はヴェネツィア方言の「ス・チャーオ(ヴォストロ)」に由来し、対等な者どうしの謙った挨拶として「(私は)あなたの奴隷です」を意味する宮廷風の言い回しだった。イタリア全土で気軽な俗語として広まったのは20世紀になってからである。",
  ),
  q(
    9,
    "Before Rome rose to power, which earlier civilization dominated much of central Italy, including the area that became Tuscany, and strongly influenced early Roman customs?|Antes del auge de Roma, ¿qué civilización anterior dominaba buena parte de la Italia central, incluida la zona que sería Toscana, e influyó fuertemente en las costumbres romanas tempranas?|Avant l'essor de Rome, quelle civilisation antérieure dominait une grande partie de l'Italie centrale, dont la future Toscane, et influença fortement les coutumes romaines primitives ?|ローマが台頭する前、のちのトスカーナを含む中部イタリアの多くを支配し、初期ローマの習俗に強い影響を与えた文明は?",
    ["The Etruscans|Los etruscos|Les Étrusques|エトルリア人", "The Phoenicians|Los fenicios|Les Phéniciens|フェニキア人", "The Minoans|Los minoicos|Les Minoens|ミノア人"],
    0,
    "Much of what became recognisably \"Roman\" — including gladiatorial games, the toga, augury by reading animal entrails, and even the fasces symbol of power — was inherited or adapted from Etruscan practice, though their language remains only partly deciphered today.|Buena parte de lo que llegaría a ser reconociblemente «romano» —incluidos los juegos de gladiadores, la toga, la adivinación leyendo entrañas de animales e incluso el símbolo de poder de los fascios— se heredó o adaptó de la práctica etrusca.|Une grande part de ce qui deviendrait reconnaissablement « romain » — dont les jeux de gladiateurs, la toge, la divination par les entrailles d'animaux et même le symbole de pouvoir des faisceaux — fut hérité ou adapté des pratiques étrusques.|剣闘士競技やトーガ、動物の内臓を読む占い、権威の象徴である束桿(ファスケス)に至るまで、後に「ローマ的」と認識されるものの多くは、エトルリア人の習わしを受け継いだり手直ししたりしたものだった。ただ彼らの言語はいまも部分的にしか解読されていない。",
  ),
  q(
    9,
    "During the 1970s and early 1980s, Italy went through a period of political violence and terrorist bombings by far-left and far-right groups commonly known by what nickname?|Durante los años setenta y principios de los ochenta, Italia atravesó un período de violencia política y atentados terroristas de grupos de extrema izquierda y extrema derecha conocido comúnmente con qué apodo?|Durant les années 1970 et le début des années 1980, l'Italie traversa une période de violence politique et d'attentats terroristes de groupes d'extrême gauche et d'extrême droite communément désignée sous quel surnom ?|1970年代から80年代初めにかけて、極左・極右双方によるテロと政治暴力の時代をイタリアは経験したが、その通称は?",
    ["The Red Decade|La Década Roja|La Décennie rouge|赤の十年", "The Silent War|La Guerra Silenciosa|La Guerre silencieuse|沈黙の戦争", "The Years of Lead|Los Años de Plomo|Les Années de plomb|鉛の年代"],
    2,
    "\"Anni di piombo,\" the Years of Lead, refers to the sheer volume of bullets and bombs used, and the period's most infamous act was the 1978 kidnapping and murder of former prime minister Aldo Moro by the Red Brigades.|«Anni di piombo», los Años de Plomo, alude a la enorme cantidad de balas y bombas empleadas, y el acto más infame del período fue el secuestro y asesinato en 1978 del ex primer ministro Aldo Moro a manos de las Brigadas Rojas.|« Anni di piombo », les Années de plomb, désigne la masse de balles et de bombes employées, et l'acte le plus tristement célèbre de la période fut l'enlèvement et l'assassinat en 1978 de l'ancien Premier ministre Aldo Moro par les Brigades rouges.|「鉛の年代(アンニ・ディ・ピオンボ)」という名は、使われた弾丸と爆弾の量そのものに由来する。この時代で最も悪名高い事件は、1978年に赤い旅団が元首相アルド・モーロを誘拐し殺害した事件である。",
  ),
  q(
    10,
    "Which Italian physicist and Nobel laureate built the world's first nuclear reactor in 1942, working under a stadium in Chicago after fleeing Fascist Italy?|¿Qué físico italiano y premio Nobel construyó el primer reactor nuclear del mundo en 1942, trabajando bajo un estadio de Chicago tras huir de la Italia fascista?|Quel physicien italien et lauréat du prix Nobel construisit le premier réacteur nucléaire au monde en 1942, travaillant sous un stade de Chicago après avoir fui l'Italie fasciste ?|1942年、ファシスト政権下のイタリアを逃れたのち、シカゴのスタジアムの下で世界初の原子炉を作ったイタリア人物理学者・ノーベル賞受賞者は?",
    ["Guglielmo Marconi|Guglielmo Marconi|Guglielmo Marconi|グリエルモ・マルコーニ", "Enrico Fermi|Enrico Fermi|Enrico Fermi|エンリコ・フェルミ", "Alessandro Volta|Alessandro Volta|Alessandro Volta|アレッサンドロ・ヴォルタ"],
    1,
    "Fermi left Italy in 1938 partly to protect his Jewish wife from new racial laws, using his trip to Stockholm to collect his Nobel Prize as cover to keep going straight to the United States instead of returning home.|Fermi dejó Italia en 1938 en parte para proteger a su esposa judía de las nuevas leyes raciales, usando su viaje a Estocolmo a recoger el Nobel como excusa para seguir directo a Estados Unidos en vez de volver a casa.|Fermi quitta l'Italie en 1938, en partie pour protéger son épouse juive des nouvelles lois raciales, utilisant son voyage à Stockholm pour recevoir son prix Nobel comme prétexte pour continuer directement vers les États-Unis plutôt que de rentrer.|フェルミは1938年、ユダヤ人の妻を新たな人種法から守る目的もあってイタリアを離れた。ノーベル賞を受け取るためのストックホルム行きを口実にして、そのまま帰国せずアメリカへ渡ったのである。",
  ),
  q(
    2,
    "What is the name of the popular frozen dessert Italy is famous for, denser and less airy than typical ice cream?|¿Cómo se llama el famoso postre helado por el que es célebre Italia, más denso y menos aireado que el helado típico?|Comment s'appelle le fameux dessert glacé pour lequel l'Italie est célèbre, plus dense et moins aéré qu'une glace classique ?|一般的なアイスクリームより密度が高く空気が少ない、イタリア名物の冷たいデザートの名は?",
    ["Sorbet|Sorbete|Sorbet|シャーベット", "Gelato|Gelato|Gelato|ジェラート", "Frozen yogurt|Yogur helado|Yaourt glacé|フローズンヨーグルト"],
    1,
    "Gelato is churned at a slower speed than American-style ice cream, which incorporates less air and gives it a denser texture, and it is also typically served a few degrees warmer, which brings out more flavour.|El gelato se bate a menor velocidad que el helado de estilo estadounidense, lo que incorpora menos aire y le da una textura más densa, y además suele servirse unos grados más templado, lo que realza el sabor.|Le gelato est turbiné à une vitesse plus lente que la glace de style américain, ce qui incorpore moins d'air et lui donne une texture plus dense, et il est aussi généralement servi quelques degrés plus chaud, ce qui en ravive le goût.|ジェラートはアメリカ式アイスクリームより遅い速度で撹拌されるため空気の含有量が少なく、より密度の高い食感になる。供される温度も数度高めで、それが風味をいっそう引き立てる。",
  ),
  q(
    3,
    "Which Italian city is famous as a global centre of the fashion industry, home to a major fashion week?|¿Qué ciudad italiana es famosa como centro mundial de la industria de la moda, sede de una gran semana de la moda?|Quelle ville italienne est célèbre comme centre mondial de l'industrie de la mode, siège d'une grande semaine de la mode ?|世界的なファッション産業の中心地として知られ、大規模なファッションウィークが開かれるイタリアの都市は?",
    ["Naples|Nápoles|Naples|ナポリ", "Palermo|Palermo|Palerme|パレルモ", "Milan|Milán|Milan|ミラノ"],
    2,
    "Milan Fashion Week, held twice a year since the 1970s, is considered one of the \"big four\" alongside New York, London and Paris, and the city is headquarters to houses including Armani, Versace and Prada.|La Semana de la Moda de Milán, celebrada dos veces al año desde los setenta, se considera una de las «cuatro grandes» junto con Nueva York, Londres y París, y la ciudad es sede de casas como Armani, Versace y Prada.|La Fashion Week de Milan, tenue deux fois par an depuis les années 1970, est considérée comme l'une des « quatre grandes » aux côtés de New York, Londres et Paris, et la ville abrite les sièges de maisons comme Armani, Versace et Prada.|1970年代から年に二度開かれるミラノ・ファッションウィークは、ニューヨーク・ロンドン・パリと並ぶ「四大コレクション」の一つとされ、この町にはアルマーニ、ヴェルサーチ、プラダなどの本拠がある。",
  ),
  q(
    5,
    "What is the name of Italy's most famous long-distance cycling stage race, held every May?|¿Cómo se llama la carrera ciclista por etapas más famosa de Italia, celebrada cada mayo?|Comment s'appelle la plus célèbre course cycliste italienne par étapes, disputée chaque mois de mai ?|毎年5月に開催される、イタリアで最も有名な長距離のステージレース(自転車)は?",
    ["The Tour de France|El Tour de Francia|Le Tour de France|ツール・ド・フランス", "The Giro d'Italia|El Giro de Italia|Le Giro d'Italia|ジロ・デ・イタリア", "The Vuelta a España|La Vuelta a España|La Vuelta a España|ブエルタ・ア・エスパーニャ"],
    1,
    "First held in 1909 to boost newspaper sales, the Giro is considered one of cycling's three Grand Tours, alongside France and Spain's races, and its leader traditionally wears a pink jersey, maglia rosa, matching the paper that founded it.|Celebrado por primera vez en 1909 para impulsar las ventas de un periódico, el Giro se considera una de las tres Grandes Vueltas del ciclismo, junto con las de Francia y España, y su líder viste tradicionalmente una maglia rosa.|Disputé pour la première fois en 1909 pour doper les ventes d'un journal, le Giro est considéré comme l'un des trois Grands Tours du cyclisme, aux côtés des courses françaises et espagnoles, et son leader porte traditionnellement un maillot rose, la maglia rosa.|1909年に新聞の売り上げを伸ばすために始まったジロは、フランス・スペインのレースと並ぶ自転車競技の三大グランツールの一つとされる。首位の選手は伝統的にピンク色のジャージ「マリア・ローザ」を着るが、これは主催した新聞紙にちなむ。",
  ),
  q(
    6,
    "Which Italian sports car manufacturer, founded in Modena in 1939, is known for its black prancing-horse logo?|¿Qué fabricante italiano de automóviles deportivos, fundado en Módena en 1939, es conocido por su logo del caballo negro encabritado?|Quel constructeur automobile de sport italien, fondé à Modène en 1939, est connu pour son logo au cheval cabré noir ?|1939年にモデナで創業し、跳ね馬の黒いロゴで知られるイタリアのスポーツカーメーカーは?",
    ["Lamborghini|Lamborghini|Lamborghini|ランボルギーニ", "Maserati|Maserati|Maserati|マセラティ", "Ferrari|Ferrari|Ferrari|フェラーリ"],
    2,
    "Enzo Ferrari borrowed the prancing horse emblem from a World War I fighter pilot's family, who had painted it on his plane, after the pilot's mother suggested it would bring Ferrari good luck.|Enzo Ferrari tomó prestado el emblema del caballo encabritado de la familia de un piloto de caza de la Primera Guerra Mundial, quien lo había pintado en su avión, después de que la madre del piloto sugiriera que traería buena suerte a Ferrari.|Enzo Ferrari emprunta l'emblème du cheval cabré à la famille d'un pilote de chasse de la Première Guerre mondiale, qui l'avait peint sur son avion, après que la mère du pilote lui eut suggéré qu'il porterait chance à Ferrari.|エンツォ・フェラーリは、跳ね馬の紋章を第一次大戦の戦闘機パイロットの家族から譲り受けた。そのパイロットは自分の機体にこの馬を描いており、母親が「フェラーリに幸運をもたらすだろう」と勧めたのがきっかけだった。",
  ),
  q(
    4,
    "What is the traditional Italian pre-dinner drink and snack ritual, often involving a spritz or vermouth with small bites of food, called?|¿Cómo se llama el ritual tradicional italiano de bebida y picoteo antes de la cena, a menudo con un spritz o vermú y pequeños bocados de comida?|Comment appelle-t-on le rituel traditionnel italien de boisson et de grignotage avant le dîner, souvent avec un spritz ou du vermouth accompagné de petites bouchées ?|夕食前に軽い飲み物と小さなつまみを楽しむイタリアの伝統的な習わしは?",
    ["Aperitivo|Aperitivo|Apéritif|アペリティーヴォ", "Digestivo|Digestivo|Digestif|ディジェスティーヴォ", "Merenda|Merenda|Merenda|メレンダ"],
    0,
    "Aperitivo hour, typically between about 6 and 9 in the evening, grew especially popular in cities like Milan and Turin, where the price of one drink can sometimes include an entire buffet of small dishes.|La hora del aperitivo, típicamente entre las 6 y las 9 de la tarde, se popularizó especialmente en ciudades como Milán y Turín, donde el precio de una bebida a veces incluye todo un bufé de platillos pequeños.|L'heure de l'apéritif, généralement entre 18h et 21h, s'est particulièrement popularisée dans des villes comme Milan et Turin, où le prix d'une seule boisson peut parfois inclure tout un buffet de petits plats.|アペリティーヴォの時間帯はだいたい午後6時から9時ごろで、ミラノやトリノのような町でとくに広まった。飲み物一杯の値段に小皿料理のビュッフェが丸ごとついてくることさえある。",
  ),
  q(
    6,
    "In many smaller Italian towns, shops traditionally close for a few hours in the early afternoon for what custom?|En muchos pueblos pequeños de Italia, las tiendas cierran tradicionalmente unas horas a primera hora de la tarde por qué costumbre?|Dans de nombreuses petites villes italiennes, les commerces ferment traditionnellement quelques heures en début d'après-midi pour quelle coutume ?|イタリアの小さな町の多くで、午後の早い時間帯に店が数時間閉まる伝統的な習わしは?",
    ["Riposo, a midday rest|Riposo, un descanso de mediodía|Riposo, un repos de midi|リポーゾ(昼の休息)", "A weekly town meeting|Una reunión semanal del pueblo|Une réunion municipale hebdomadaire|週一度の町の集会", "Mandatory afternoon Mass|Misa vespertina obligatoria|Messe obligatoire de l'après-midi|義務の午後のミサ"],
    0,
    "The riposo, similar to Spain's siesta, is fading in big cities but still common in smaller towns, especially in the south, where the early-afternoon heat once made working through it impractical anyway.|El riposo, similar a la siesta española, va desapareciendo en las grandes ciudades pero sigue siendo común en pueblos pequeños, sobre todo en el sur, donde el calor de primera hora de la tarde ya hacía poco práctico trabajar de todos modos.|Le riposo, semblable à la sieste espagnole, s'estompe dans les grandes villes mais reste courant dans les petites, surtout dans le sud, où la chaleur du début d'après-midi rendait de toute façon le travail peu pratique.|スペインのシエスタに似たリポーゾは大都市では廃れつつあるが、小さな町、とくに南部ではいまも一般的である。もともと午後早くの暑さのせいで、その時間に働くこと自体が現実的でなかった土地柄である。",
  ),
  q(
    3,
    "Which sea lies to the west of the Italian peninsula, between it and Sardinia and Corsica?|¿Qué mar se encuentra al oeste de la península italiana, entre esta y Cerdeña y Córcega?|Quelle mer se trouve à l'ouest de la péninsule italienne, entre elle et la Sardaigne et la Corse ?|イタリア半島の西側、サルデーニャ島やコルシカ島とのあいだにある海は?",
    ["The Adriatic Sea|El mar Adriático|La mer Adriatique|アドリア海", "The Black Sea|El mar Negro|La mer Noire|黒海", "The Tyrrhenian Sea|El mar Tirreno|La mer Tyrrhénienne|ティレニア海"],
    2,
    "The Tyrrhenian Sea takes its name from the Tyrrhenians, an ancient Greek name for the Etruscans, and cities from Naples to Genoa all open onto it along the peninsula's western coast.|El mar Tirreno debe su nombre a los tirrenos, un antiguo nombre griego para los etruscos, y ciudades desde Nápoles hasta Génova se abren a él a lo largo de la costa occidental de la península.|La mer Tyrrhénienne tire son nom des Tyrrhéniens, ancien nom grec des Étrusques, et des villes de Naples à Gênes s'ouvrent toutes sur elle le long de la côte ouest de la péninsule.|ティレニア海の名は、古代ギリシャ人がエトルリア人を指して呼んだ「テュレニア人」に由来する。ナポリからジェノヴァまで、半島西岸の町々はみなこの海に面している。",
  ),
  q(
    7,
    "The Amalfi Coast town of Amalfi lent its name to which medieval maritime code, one of the earliest sets of sea trading laws in the Mediterranean?|El pueblo de Amalfi, en la Costa Amalfitana, dio nombre a qué código marítimo medieval, uno de los primeros conjuntos de leyes de comercio marítimo del Mediterráneo?|La ville d'Amalfi, sur la côte amalfitaine, a donné son nom à quel code maritime médiéval, l'un des premiers ensembles de lois du commerce maritime en Méditerranée ?|アマルフィ海岸の町アマルフィの名を冠した、地中海で最も早い時期の海上交易法の一つである中世の海事法典は?",
    ["The Tables of Amalfi|Las Tablas de Amalfi|Les Tables d'Amalfi|アマルフィ法典", "The Amalfi Compact|El Pacto de Amalfi|Le Pacte d'Amalfi|アマルフィ協定", "The Amalfi Ledger|El Libro Mayor de Amalfi|Le Registre d'Amalfi|アマルフィ台帳"],
    0,
    "Amalfi was one of Italy's four historic maritime republics, alongside Venice, Genoa and Pisa, and its book of maritime law was used as a reference by Mediterranean sailors for centuries after the city's own power had faded.|Amalfi fue una de las cuatro repúblicas marítimas históricas de Italia, junto con Venecia, Génova y Pisa, y su libro de derecho marítimo sirvió de referencia a los marineros mediterráneos durante siglos después de que el propio poder de la ciudad se hubiera desvanecido.|Amalfi fut l'une des quatre républiques maritimes historiques d'Italie, aux côtés de Venise, Gênes et Pise, et son recueil de droit maritime servit de référence aux marins méditerranéens des siècles après que le pouvoir de la ville lui-même se fut éteint.|アマルフィはヴェネツィア・ジェノヴァ・ピサと並ぶイタリアの四大海洋都市国家の一つだった。その海事法典は、都市自体の力が衰えたあとも何世紀にもわたり地中海の船乗りたちの拠りどころとして使われ続けた。",
  ),
  q(
    5,
    "What is the name for Italy's national police force that also acts as a military branch, recognisable by their black-and-red uniforms?|¿Cómo se llama el cuerpo de policía nacional de Italia que también actúa como rama militar, reconocible por sus uniformes negros y rojos?|Comment appelle-t-on la force de police nationale italienne qui agit aussi comme corps militaire, reconnaissable à ses uniformes noir et rouge ?|軍の一部門でもある、黒と赤の制服で見分けられるイタリアの国家警察組織の名は?",
    ["The Polizia di Stato|La Polizia di Stato|La Polizia di Stato|ポリツィア・ディ・スタート", "The Carabinieri|Los Carabinieri|Les Carabinieri|カラビニエリ", "The Guardia Costiera|La Guardia Costiera|La Guardia Costiera|沿岸警備隊"],
    1,
    "Founded in 1814, the Carabinieri report to the defence ministry rather than the interior ministry like Italy's other main police force, and they are so often the butt of gentle national jokes that entire joke books are devoted to them.|Fundados en 1814, los Carabinieri dependen del ministerio de Defensa y no del de Interior como la otra gran fuerza policial de Italia, y son objeto de bromas nacionales tan frecuentes que hay libros enteros de chistes dedicados a ellos.|Fondés en 1814, les Carabinieri dépendent du ministère de la Défense plutôt que de l'Intérieur comme l'autre grande force de police italienne, et ils font l'objet de plaisanteries nationales si fréquentes que des livres entiers de blagues leur sont consacrés.|1814年創設のカラビニエリは、イタリアのもう一つの主要な警察組織とは異なり内務省ではなく国防省の管轄にある。国民的な軽口の的にされることがあまりに多く、彼らをネタにしたジョーク集が一冊丸ごと存在するほどである。",
  ),
  q(
    4,
    "Which Italian region, famous for Chianti wine, lies between Rome and the country's northern industrial cities?|¿Qué región italiana, famosa por el vino Chianti, se encuentra entre Roma y las ciudades industriales del norte del país?|Quelle région italienne, célèbre pour le vin chianti, se trouve entre Rome et les villes industrielles du nord du pays ?|キャンティワインで有名な、ローマと北部の工業都市とのあいだにあるイタリアの地方は?",
    ["Tuscany|Toscana|Toscane|トスカーナ", "Calabria|Calabria|Calabre|カラブリア", "Molise|Molise|Molise|モリーゼ"],
    0,
    "Chianti, made mostly from the Sangiovese grape, was one of the first wine regions in the world to have its boundaries legally defined, by a 1716 decree from the Grand Duke of Tuscany, Cosimo III de' Medici.|El Chianti, elaborado principalmente con uva sangiovese, fue una de las primeras regiones vinícolas del mundo en tener sus límites definidos legalmente, por un decreto de 1716 del gran duque de Toscana, Cosme III de Médici.|Le chianti, élaboré principalement à partir du cépage sangiovese, fut l'une des premières régions viticoles au monde à avoir ses limites définies légalement, par un décret de 1716 du grand-duc de Toscane, Cosme III de Médicis.|主にサンジョヴェーゼ種のぶどうから造られるキャンティは、1716年にトスカーナ大公コジモ3世デ・メディチの布告によって境界が法的に定められた、世界でも最初期のワイン産地の一つである。",
  ),
  q(
    2,
    "Which small independent country, ruled by a pope, is home to St. Peter's Basilica?|¿Qué pequeño país independiente, gobernado por un papa, alberga la Basílica de San Pedro?|Quel petit pays indépendant, gouverné par un pape, abrite la basilique Saint-Pierre ?|教皇が治める小さな独立国で、サン・ピエトロ大聖堂があるのは?",
    ["Vatican City|Ciudad del Vaticano|Cité du Vatican|バチカン市国", "Monaco|Mónaco|Monaco|モナコ", "Malta|Malta|Malte|マルタ"],
    0,
    "The Pope has served as Vatican City's head of state since the country's creation in 1929, making it the world's only country with an elected monarch of sorts, chosen for life by fellow cardinals.|El papa ha sido jefe de Estado de la Ciudad del Vaticano desde la creación del país en 1929, lo que la convierte en el único país del mundo con una especie de monarca electo, elegido de por vida por sus compañeros cardenales.|Le pape est chef d'État de la Cité du Vatican depuis la création du pays en 1929, ce qui en fait le seul pays au monde doté d'une sorte de monarque élu, choisi à vie par ses pairs cardinaux.|教皇は1929年のバチカン市国建国以来、この国の元首を務めている。同僚である枢機卿たちによって終身で選ばれるという、いわば「選挙で選ばれる君主」を持つ世界で唯一の国である。",
  ),
  q(
    9,
    "Which Italian scientist is credited with inventing the first practical electrical battery, in 1800, and has the unit of electrical potential named after him?|¿Qué científico italiano se le atribuye la invención de la primera pila eléctrica práctica, en 1800, y da nombre a la unidad de potencial eléctrico?|Quel scientifique italien est crédité de l'invention de la première pile électrique pratique, en 1800, et donne son nom à l'unité de potentiel électrique ?|1800年に最初の実用的な電池を発明したとされ、電位の単位にその名が残るイタリアの科学者は?",
    ["Galileo Galilei|Galileo Galilei|Galilée|ガリレオ・ガリレイ", "Guglielmo Marconi|Guglielmo Marconi|Guglielmo Marconi|グリエルモ・マルコーニ", "Alessandro Volta|Alessandro Volta|Alessandro Volta|アレッサンドロ・ヴォルタ"],
    2,
    "Volta built his \"voltaic pile\" from alternating discs of zinc and copper separated by brine-soaked cloth, proving that electricity could be generated chemically rather than only by static or animal sources, as rivals of the time believed.|Volta construyó su «pila voltaica» con discos alternos de zinc y cobre separados por tela empapada en salmuera, demostrando que la electricidad podía generarse químicamente y no solo por fuentes estáticas o animales, como creían sus rivales de la época.|Volta construisit sa « pile voltaïque » à partir de disques alternés de zinc et de cuivre séparés par un tissu imbibé de saumure, prouvant que l'électricité pouvait être produite chimiquement et non seulement par des sources statiques ou animales.|ヴォルタは亜鉛と銅の円盤を塩水に浸した布で交互に挟んだ「ヴォルタ電堆」を作り、当時の対抗者たちが信じていた静電気や動物由来の電気だけでなく、化学反応によっても電気を生み出せることを示した。",
  ),
  q(
    8,
    "Which strait, notoriously blamed in Greek myth on the monsters Scylla and Charybdis, must ferries cross to reach Sicily from the mainland at its narrowest point?|¿Qué estrecho, atribuido tristemente en el mito griego a los monstruos Escila y Caribdis, deben cruzar los ferris para llegar a Sicilia desde el continente por su punto más angosto?|Quel détroit, imputé dans le mythe grec aux monstres Scylla et Charybde, les ferries doivent-ils franchir pour rejoindre la Sicile depuis le continent à son point le plus étroit ?|ギリシャ神話で怪物スキュラとカリュブディスの仕業とされた、本土からシチリアへ渡るフェリーが最も狭い所で越える海峡は?",
    ["The Strait of Bonifacio|El estrecho de Bonifacio|Le détroit de Bonifacio|ボニファシオ海峡", "The Strait of Messina|El estrecho de Mesina|Le détroit de Messine|メッシーナ海峡", "The Strait of Otranto|El estrecho de Otranto|Le détroit d'Otrante|オトラント海峡"],
    1,
    "Proposals to bridge the Strait of Messina have been debated on and off since the 1960s, and would, if ever built, create the longest single-span suspension bridge in the world, but as of the mid-2020s ferries and trains loaded onto ferries still make the crossing.|Las propuestas para tender un puente sobre el estrecho de Mesina se han debatido de forma intermitente desde los sesenta, y de construirse crearían el puente colgante de un solo vano más largo del mundo, pero a mediados de los 2020 aún se cruza en ferri.|Les projets de pont sur le détroit de Messine sont débattus par intermittence depuis les années 1960 et créeraient, s'ils voyaient le jour, le plus long pont suspendu à travée unique au monde, mais au milieu des années 2020, ferries et trains embarqués les traversent encore.|メッシーナ海峡に橋を架ける計画は1960年代から断続的に議論されてきており、実現すれば世界最長の単径間吊り橋になる。しかし2020年代半ばの時点でも、渡るのはいまもフェリーと、そのフェリーに積み込まれた列車である。",
  ),
  q(
    6,
    "What was the historic Italian city-state of Venice's main source of wealth and power for centuries, before its decline?|¿Cuál fue la principal fuente de riqueza y poder de la histórica ciudad-estado de Venecia durante siglos, antes de su declive?|Quelle fut, pendant des siècles, la principale source de richesse et de puissance de la cité-État historique de Venise, avant son déclin ?|歴史的都市国家ヴェネツィアが、衰退するまで何世紀にもわたり富と力の主な源としていたものは?",
    ["Silver mining|La minería de plata|L'extraction d'argent|銀の採掘", "Maritime trade with the East|El comercio marítimo con Oriente|Le commerce maritime avec l'Orient|東方との海上交易", "Wheat farming|El cultivo de trigo|La culture du blé|小麦の耕作"],
    1,
    "Venice built a trading empire stretching across the eastern Mediterranean, exchanging European goods for spices, silk and other luxuries from the Byzantine Empire and beyond, and its shipyard, the Arsenale, could reportedly assemble a warship in under a day at its peak.|Venecia construyó un imperio comercial que se extendía por el Mediterráneo oriental, intercambiando productos europeos por especias, seda y otros lujos del Imperio bizantino y más allá, y su astillero, el Arsenale, podía ensamblar un barco de guerra en menos de un día en su apogeo.|Venise bâtit un empire commercial s'étendant sur toute la Méditerranée orientale, échangeant des produits européens contre épices, soie et autres produits de luxe venus de l'Empire byzantin et au-delà, et son chantier naval, l'Arsenal, pouvait assembler un navire de guerre en moins d'une journée à son apogée.|ヴェネツィアは東地中海に広がる交易帝国を築き、ヨーロッパの品々を香辛料や絹、その他ビザンチン帝国以遠からの贅沢品と交換した。その造船所アルセナーレは最盛期、一日足らずで軍艦一隻を組み立てられたと伝えられる。",
  ),
  q(
    7,
    "What is the name of the system of 78 movable steel gates, completed in 2020, that can seal Venice's lagoon off from the sea during exceptionally high tides?|¿Cómo se llama el sistema de 78 compuertas de acero móviles, terminado en 2020, que puede aislar la laguna de Venecia del mar durante mareas excepcionalmente altas?|Comment s'appelle le système de 78 portes d'acier mobiles, achevé en 2020, capable d'isoler la lagune de Venise de la mer lors de marées exceptionnellement hautes ?|2020年に完成した、異常潮位のときヴェネツィアの干潟を海から締め出せる可動式の鋼鉄の水門78基からなるしくみの名は?",
    ["MOSE|MOSE|MOSE|モーゼ(MOSE)", "Nettuno|Nettuno|Nettuno|ネットゥーノ", "Argonauta|Argonauta|Argonaute|アルゴナウタ"],
    0,
    "MOSE (an acronym playing on the biblical Moses parting the sea) took more than 16 years and over €5 billion to build, and its gates lie flat and invisible on the seabed until rising water triggers compressed air to lift them upright.|El MOSE (un acrónimo que juega con Moisés separando el mar) tardó más de 16 años y más de 5.000 millones de euros en construirse, y sus compuertas yacen planas e invisibles en el fondo marino hasta que la subida del agua activa aire comprimido para alzarlas.|Le MOSE (acronyme jouant sur Moïse séparant la mer) a demandé plus de 16 ans et plus de 5 milliards d'euros, et ses portes reposent à plat, invisibles sur le fond marin, jusqu'à ce que la montée des eaux déclenche de l'air comprimé qui les redresse.|モーゼ(聖書のモーセが海を分けた逸話にかけた略称)は完成までに16年以上、50億ユーロを超える費用がかかった。水門はふだん海底に平らに寝て見えないが、水位が上がると圧縮空気で持ち上げられて立ち上がる。",
  ),
  q(
    6,
    "The poet Dante Alighieri, exiled from Florence, is buried in which Italian city, which has refused to hand his remains back for 700 years?|¿En qué ciudad italiana está enterrado el poeta Dante Alighieri, exiliado de Florencia, que se ha negado a devolver sus restos durante 700 años?|Le poète Dante Alighieri, exilé de Florence, est enterré dans quelle ville italienne, qui refuse de rendre sa dépouille depuis 700 ans ?|フィレンツェを追放された詩人ダンテ・アリギエーリが埋葬され、700年にわたって遺骸をフィレンツェへ返すことを拒み続けているイタリアの都市は?",
    ["Florence|Florencia|Florence|フィレンツェ", "Ravenna|Rávena|Ravenne|ラヴェンナ", "Verona|Verona|Vérone|ヴェローナ"],
    1,
    "Dante finished the Divine Comedy in exile in Ravenna and died there in 1321; Florence, the city that had banished him, has asked more than once since for his remains back, and Ravenna has said no every time.|Dante terminó la Divina Comedia en el exilio en Rávena y murió allí en 1321; Florencia, la ciudad que lo había desterrado, ha pedido más de una vez desde entonces que le devuelvan sus restos, y Rávena siempre se ha negado.|Dante acheva la Divine Comédie en exil à Ravenne et y mourut en 1321 ; Florence, la ville qui l'avait banni, a demandé plus d'une fois depuis qu'on lui rende sa dépouille, et Ravenne a toujours refusé.|ダンテはラヴェンナでの亡命生活のうちに『神曲』を書き上げ、1321年にこの地で没した。彼を追放したフィレンツェはその後何度も遺骸の返還を求めてきたが、ラヴェンナはそのたびに拒み続けている。",
  ),
  q(
    5,
    "The rich meat sauce known abroad as \"spaghetti bolognese\" goes by what name in Bologna itself, where it is traditionally spooned over flat tagliatelle rather than spaghetti?|La rica salsa de carne conocida fuera de Italia como «espaguetis a la boloñesa» recibe qué nombre en la propia Bolonia, donde tradicionalmente se sirve sobre tagliatelle anchas y no sobre espaguetis?|La riche sauce à la viande connue à l'étranger sous le nom de « spaghetti bolognaise » porte quel nom à Bologne même, où elle se sert traditionnellement sur de larges tagliatelles et non sur des spaghettis ?|海外で「スパゲッティ・ボロネーゼ」として知られる濃厚な肉ソースは、スパゲッティではなく平たいタリアテッレにかけて供されるボローニャの地元では何と呼ばれるか?",
    ["Ragù|Ragú|Ragù|ラグー", "Pesto|Pesto|Pesto|ペスト", "Carbonara|Carbonara|Carbonara|カルボナーラ"],
    0,
    "Bologna's ragù is simmered for hours from minced meat, wine and a little tomato, a far cry from the thin, tomato-heavy sauce often sold abroad under the city's name, and it is traditionally never served with spaghetti at all.|El ragù boloñés se cuece a fuego lento durante horas con carne picada, vino y algo de tomate, muy distinto de la salsa fina y muy tomatosa que a menudo se vende fuera con el nombre de la ciudad, y tradicionalmente nunca se sirve con espaguetis.|Le ragù bolonais mijote pendant des heures à base de viande hachée, de vin et d'un peu de tomate, bien loin de la sauce fine et très tomatée souvent vendue à l'étranger sous le nom de la ville, et il n'est traditionnellement jamais servi avec des spaghettis.|ボローニャのラグーは挽き肉とワイン、少量のトマトを何時間も煮込んで作られ、この町の名を冠して海外でよく売られている、薄くトマトの効いたソースとはまったくの別物である。伝統的にはスパゲッティに合わせることは一切ない。",
  ),
  q(
    4,
    "Verona's Roman-era amphitheatre, finished around 30 AD, is put to what use each summer today?|El anfiteatro romano de Verona, terminado hacia el año 30 d. C., ¿para qué se usa hoy cada verano?|L'amphithéâtre romain de Vérone, achevé vers 30 apr. J.-C., sert aujourd'hui chaque été à quoi ?|紀元30年ごろ完成したヴェローナのローマ円形闘技場は、いまも毎夏何のために使われているか?",
    ["An open-air opera house|Una ópera al aire libre|Un opéra en plein air|野外オペラの会場", "A weekly farmers' market|Un mercado semanal de productores|Un marché fermier hebdomadaire|毎週の朝市", "A motor-racing circuit|Un circuito de carreras|Un circuit de course automobile|自動車レース場"],
    0,
    "The arena's stone tiers, on which gladiators once fought, seat an audience of roughly 15,000 for opera each summer, making it one of the largest venues of its kind still in regular use anywhere in the world.|Las gradas de piedra de la arena, donde antaño combatían los gladiadores, acogen cada verano a un público de unas 15.000 personas para la ópera, lo que la convierte en uno de los mayores recintos de su tipo aún en uso regular en el mundo.|Les gradins de pierre de l'arène, où combattaient jadis les gladiateurs, accueillent chaque été un public d'environ 15 000 personnes pour l'opéra, ce qui en fait l'un des plus grands lieux de ce type encore régulièrement utilisés au monde.|かつて剣闘士が戦ったこの闘技場の石の観客席は、毎夏およそ1万5000人のオペラ客を収容する。今なお定期的に使われているこの種の会場としては世界でも最大級である。",
  ),
  q(
    5,
    "Naples is honeycombed underground with more than 400 kilometres of what, some of it cut by the Greeks 2,400 years ago and reused as shelters during World War Two air raids?|Nápoles está horadada bajo tierra por más de 400 km de qué, en parte excavado por los griegos hace 2.400 años y reutilizado como refugio durante los bombardeos de la Segunda Guerra Mundial?|Naples est creusée sous terre de plus de 400 km de quoi, en partie taillé par les Grecs il y a 2 400 ans et réutilisé comme abri lors des raids aériens de la Seconde Guerre mondiale ?|一部は2400年前にギリシャ人が掘り、第二次世界大戦の空襲時には防空壕として再利用された、ナポリの地下に張り巡らされた400kmを超えるものとは?",
    ["Wine cellars|Bodegas de vino|Des caves à vin|ワイン貯蔵庫", "Silver mines|Minas de plata|Des mines d'argent|銀山", "Tunnels and cisterns|Túneles y cisternas|Des tunnels et des citernes|トンネルと貯水槽"],
    2,
    "The tunnels were originally dug to quarry volcanic tuff for building stone and to carry water into the city, and guided tours today lead visitors past wartime graffiti, abandoned beds and even a vintage car left behind underground.|Los túneles se excavaron originalmente para extraer toba volcánica como piedra de construcción y para llevar agua a la ciudad, y las visitas guiadas de hoy llevan a los visitantes junto a pintadas de guerra, camas abandonadas e incluso un coche de época olvidado bajo tierra.|Les tunnels furent d'abord creusés pour extraire du tuf volcanique comme pierre de construction et pour amener l'eau dans la ville, et les visites guidées d'aujourd'hui mènent les visiteurs devant des graffitis de guerre, des lits abandonnés et même une voiture d'époque oubliée sous terre.|このトンネルはもともと建材用の火山凝灰岩を採掘し、町へ水を引くために掘られたものである。現在のガイドツアーでは、戦時中の落書きや放置されたベッド、地下に置き去りにされた旧い車まで見て回ることができる。",
  ),
  q(
    7,
    "Which Sardinian town produced the novelist Grazia Deledda, who won the 1926 Nobel Prize in Literature for stories set among the region's shepherds?|¿Qué pueblo de Cerdeña dio a la novelista Grazia Deledda, que ganó el Premio Nobel de Literatura en 1926 por relatos ambientados entre los pastores de la región?|Quelle ville de Sardaigne a donné naissance à la romancière Grazia Deledda, lauréate du prix Nobel de littérature 1926 pour des récits situés parmi les bergers de la région ?|この地方の羊飼いたちを描いた作品で1926年のノーベル文学賞を受賞した作家グラツィア・デレッダを輩出したサルデーニャの町は?",
    ["Cagliari|Cagliari|Cagliari|カリアリ", "Nuoro|Nuoro|Nuoro|ヌオーロ", "Alghero|Alghero|Alghero|アルゲーロ"],
    1,
    "Deledda grew up in Nuoro's isolated pastoral region, Barbagia, once notorious enough for banditry and blood feuds that the rest of Italy considered it half-lawless, and she remains the only Italian woman ever to win the literature prize.|Deledda creció en Barbagia, la región pastoril aislada de Nuoro, antaño tan tristemente famosa por el bandolerismo y las vendettas que el resto de Italia la consideraba casi sin ley, y sigue siendo la única mujer italiana en ganar el premio de literatura.|Deledda grandit dans la Barbagia, la région pastorale isolée de Nuoro, jadis assez réputée pour le banditisme et les vendettas pour que le reste de l'Italie la juge à moitié hors-la-loi, et elle demeure la seule femme italienne à avoir remporté le prix de littérature.|デレッダはヌオーロの隔絶した牧畜地方バルバジアで育った。この地はかつて匪賊や血の抗争で悪名高く、イタリアの他地域からは半ば無法地帯とみなされていた。デレッダはいまもノーベル文学賞を受賞した唯一のイタリア人女性である。",
  ),
  q(
    3,
    "Cagliari's old citadel quarter, Castello, sits on a limestone plateau ringed by Pisan-built ramparts, and is reached today, to save the climb, by what?|El antiguo barrio de la ciudadela de Cagliari, Castello, se asienta en una meseta caliza rodeada de murallas pisanas, y hoy se alcanza, para ahorrar la subida, mediante qué?|Le vieux quartier de la citadelle de Cagliari, Castello, repose sur un plateau calcaire ceint de remparts pisans, et s'atteint aujourd'hui, pour épargner la montée, par quoi ?|ピサ人が築いた城壁に囲まれた石灰岩の台地の上にあるカリアリの旧市街カステッロ地区へ、登る手間を省くためにいま使われているものは?",
    ["A cable car over the harbour|Un teleférico sobre el puerto|Un téléphérique au-dessus du port|港の上を渡るロープウェイ", "A spiral carriage ramp|Una rampa en espiral para carruajes|Une rampe en spirale pour calèches|馬車用の螺旋スロープ", "A lift built into the cliff|Un ascensor excavado en el acantilado|Un ascenseur creusé dans la falaise|崖に組み込まれたエレベーター"],
    2,
    "The panoramic lift was cut straight through the limestone bastion in the early 2000s, saving pedestrians the long stone stairway that had been the only way up to Castello's terraces for centuries.|El ascensor panorámico se abrió directamente a través del bastión calizo a principios de la década de 2000, ahorrando a los peatones la larga escalinata de piedra que había sido durante siglos el único acceso a las terrazas de Castello.|L'ascenseur panoramique fut percé directement dans le bastion calcaire au début des années 2000, épargnant aux piétons le long escalier de pierre qui avait été pendant des siècles le seul accès aux terrasses de Castello.|この展望エレベーターは2000年代初頭、石灰岩の稜堡を貫いて設置された。それまで何世紀ものあいだカステッロのテラスへ上る唯一の手段だった長い石段を、歩行者は上らずに済むようになった。",
  ),
];
