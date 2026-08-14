/**
 * アジア大陸盤面のクイズ(30問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「アジアの外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(60件)が扱う具体的な事実(ボスポラス海峡・軌間の違い・
 * シルクロードの網・泰緬鉄道など)はここでは問わない。代わりに、
 * 都市カードが触れていない主題(地理の規模・言語と文字・食・自然)を選んだ。
 *
 * ```
 * node scripts/check-quiz.mjs asia
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
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

export const ASIA_QUIZ = [
  q(
    1,
    "What is the highest mountain on Earth, on the border of Nepal and China?|¿Cuál es la montaña más alta de la Tierra, en la frontera de Nepal y China?|Quelle est la plus haute montagne de la Terre, à la frontière du Népal et de la Chine ?|ネパールと中国の国境にある、地球でいちばん高い山は?",
    ["Mount Kilimanjaro|Monte Kilimanjaro|Mont Kilimandjaro|キリマンジャロ山", "Mount Everest|Monte Everest|Mont Everest|エベレスト山", "Mont Blanc|Mont Blanc|Mont Blanc|モンブラン"],
    1,
    "At 8,849m, Everest is known locally as Sagarmatha in Nepali and Chomolungma in Tibetan, both names older than the English one, which honours a 19th-century British surveyor who never saw the mountain himself.|Con 8.849 m, el Everest se conoce localmente como Sagarmatha en nepalí y Chomolungma en tibetano, ambos nombres más antiguos que el inglés, que honra a un topógrafo británico del siglo XIX que nunca vio la montaña en persona.|Culminant à 8 849 m, l'Everest est connu localement sous le nom de Sagarmatha en népalais et de Chomolungma en tibétain, deux noms plus anciens que le nom anglais, qui honore un géomètre britannique du XIXe siècle n'ayant jamais vu la montagne de ses propres yeux.|標高8,849m。現地ではネパール語でサガルマータ、チベット語でチョモランマと呼ばれ、どちらも英語名より古い。英語名は19世紀のイギリス人測量士にちなむが、当人はこの山を一度も自分の目で見ていない。",
  ),
  q(
    2,
    "Which sea does the Bosphorus strait connect to the Sea of Marmara?|¿Qué mar conecta el estrecho del Bósforo con el mar de Mármara?|Quelle mer le détroit du Bosphore relie-t-il à la mer de Marmara ?|ボスポラス海峡がマルマラ海と結んでいる海は?",
    ["The Black Sea|El mar Negro|La mer Noire|黒海", "The Red Sea|El mar Rojo|La mer Rouge|紅海", "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海"],
    0,
    "Water actually flows both ways through the strait at once: a surface current carries less salty Black Sea water south, while a denser, saltier undercurrent from the Mediterranean side flows north along the bottom.|El agua fluye en ambos sentidos por el estrecho a la vez: una corriente superficial lleva agua menos salada del mar Negro hacia el sur, mientras una corriente más densa y salada del lado mediterráneo fluye hacia el norte por el fondo.|L'eau y circule en réalité dans les deux sens à la fois : un courant de surface porte l'eau moins salée de la mer Noire vers le sud, tandis qu'un courant plus dense et plus salé venu du côté méditerranéen remonte vers le nord au fond.|海峡の中では実は水が両方向に同時に流れている。表層は塩分の薄い黒海の水が南へ、より塩分濃く重い地中海側の水は底を伝って北へ向かう。",
  ),
  q(
    2,
    "Which of these is the world's largest lake by surface area, bordered by several Central Asian and Caucasus countries?|¿Cuál de estos es el lago más grande del mundo por superficie, bordeado por varios países de Asia Central y el Cáucaso?|Lequel de ces éléments est le plus grand lac du monde par sa superficie, bordé par plusieurs pays d'Asie centrale et du Caucase ?|中央アジア・コーカサスの複数の国に囲まれた、面積で世界最大の湖はどれか?",
    ["Lake Baikal|El lago Baikal|Le lac Baïkal|バイカル湖", "The Aral Sea|El mar de Aral|La mer d'Aral|アラル海", "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海"],
    2,
    "The Caspian is technically a lake because it has no natural outlet to an ocean, though it is salty and large enough that it was called a sea for most of history; it alone holds more water than all five North American Great Lakes combined.|El Caspio es técnicamente un lago porque no tiene salida natural al océano, aunque es tan salado y grande que se le llamó mar durante casi toda la historia; contiene más agua que los cinco Grandes Lagos norteamericanos juntos.|La Caspienne est techniquement un lac car elle n'a aucun débouché naturel vers un océan, bien qu'elle soit assez salée et vaste pour avoir été appelée mer pendant presque toute l'histoire ; elle contient à elle seule plus d'eau que les cinq Grands Lacs nord-américains réunis.|カスピ海は海洋への自然な出口を持たないため厳密には湖だが、塩分濃度が高く広大なため歴史のほとんどで「海」と呼ばれてきた。その水量だけで北米の五大湖すべてを合わせたより多い。",
  ),
  q(
    3,
    "Roughly what share of the world's population lives in Asia?|¿Qué proporción de la población mundial vive aproximadamente en Asia?|Quelle part environ de la population mondiale vit en Asie ?|世界人口のおよそどれくらいがアジアに住んでいるか?",
    ["About a quarter|Aproximadamente una cuarta parte|Environ un quart|およそ4分の1", "About a third|Aproximadamente un tercio|Environ un tiers|およそ3分の1", "About three-fifths|Aproximadamente tres quintos|Environ trois cinquièmes|およそ5分の3"],
    2,
    "Asia holds close to 60% of humanity on under a third of the world's land area, a density driven above all by the river valleys of China, India and Southeast Asia that have supported farming for thousands of years.|Asia alberga cerca del 60% de la humanidad en menos de un tercio de la superficie terrestre mundial, una densidad impulsada sobre todo por los valles fluviales de China, India y el Sudeste Asiático.|L'Asie abrite près de 60 % de l'humanité sur moins d'un tiers des terres émergées du globe, une densité due surtout aux vallées fluviales de la Chine, de l'Inde et de l'Asie du Sud-Est, qui nourrissent l'agriculture depuis des millénaires.|アジアは世界の陸地面積の3分の1に満たない土地に、人類のおよそ6割が暮らす。この密度は何より、何千年も農耕を支えてきた中国・インド・東南アジアの河川流域によるところが大きい。",
  ),
  q(
    3,
    "Which of these scripts is written and read from right to left?|¿Cuál de estas escrituras se lee de derecha a izquierda?|Laquelle de ces écritures se lit de droite à gauche ?|次のうち、右から左へ書き読みする文字はどれか?",
    ["Thai script|La escritura tailandesa|L'écriture thaïe|タイ文字", "Arabic script|La escritura árabe|L'écriture arabe|アラビア文字", "Devanagari (used for Hindi)|El devanagari (usado para el hindi)|Le devanagari (utilisé pour le hindi)|デーヴァナーガリー(ヒンディー語などに使用)"],
    1,
    "Arabic script is used far beyond Arabic itself, adapted over centuries to write Persian, Urdu, Pashto and Ottoman Turkish among others, each adding its own extra letters for sounds Arabic does not have.|La escritura árabe se usa mucho más allá del propio árabe, adaptada durante siglos para escribir persa, urdu, pastún y turco otomano, entre otros, cada uno añadiendo sus propias letras extra.|L'écriture arabe est utilisée bien au-delà de l'arabe lui-même, adaptée au fil des siècles pour transcrire le persan, l'ourdou, le pachto ou le turc ottoman, chacun y ajoutant ses propres lettres supplémentaires.|アラビア文字はアラビア語だけでなく、何世紀もかけてペルシア語・ウルドゥー語・パシュトー語・オスマン語などにも取り入れられ、それぞれがアラビア語に無い音のための文字を独自に足している。",
  ),
  q(
    4,
    "Which river flows through six countries — China, Myanmar, Laos, Thailand, Cambodia and Vietnam?|¿Qué río atraviesa seis países: China, Myanmar, Laos, Tailandia, Camboya y Vietnam?|Quel fleuve traverse six pays : Chine, Birmanie, Laos, Thaïlande, Cambodge et Vietnam ?|中国・ミャンマー・ラオス・タイ・カンボジア・ベトナムの6か国を流れる川は?",
    ["The Yangtze|El Yangtsé|Le Yangtsé|長江", "The Ganges|El Ganges|Le Gange|ガンジス川", "The Mekong|El Mekong|Le Mékong|メコン川"],
    2,
    "Known as the Lancang in China before it crosses the border, the Mekong supports one of the world's largest inland fisheries, and its Cambodian tributary Tonle Sap reverses flow every year, swelling to five times its dry-season size.|Conocido como Lancang en China antes de cruzar la frontera, el Mekong sostiene una de las mayores pesquerías interiores del mundo, y su afluente camboyano Tonle Sap invierte su curso cada año.|Appelé Lancang en Chine avant de franchir la frontière, le Mékong soutient l'une des plus grandes pêcheries intérieures du monde, et son affluent cambodgien, le Tonlé Sap, inverse son cours chaque année.|中国国内では瀾滄江と呼ばれ、国境を越えてメコン川となる。世界有数の内陸漁業を支え、カンボジアの支流トンレサップ湖は毎年流れの向きが逆転し、乾季の5倍の大きさに膨らむ。",
  ),
  q(
    4,
    "Which of these currencies is used in Japan?|¿Cuál de estas monedas se usa en Japón?|Laquelle de ces monnaies est utilisée au Japon ?|次のうち日本で使われている通貨はどれか?",
    ["The won|El won|Le won|ウォン", "The yuan|El yuan|Le yuan|元", "The yen|El yen|Le yen|円"],
    2,
    "The yen, won and yuan all descend from the same Chinese character meaning \"round\", reflecting a shared history of round coins with square holes used across East Asia before each country modernised its currency separately in the 19th and 20th centuries.|El yen, el won y el yuan descienden todos del mismo carácter chino que significa «redondo», reflejo de una historia común de monedas redondas con agujero cuadrado usadas en el este de Asia.|Le yen, le won et le yuan descendent tous du même caractère chinois signifiant « rond », reflet d'une histoire commune de pièces rondes à trou carré utilisées en Asie de l'Est avant que chaque pays ne modernise sa monnaie séparément.|円・ウォン・元はいずれも「丸い」を意味する同じ漢字に由来する。東アジアで広く使われた、中央に四角い穴のあいた丸い銭という共通の歴史を反映しており、のちに各国が別々に通貨を近代化した。",
  ),
  q(
    5,
    "The Mongol Empire, at its greatest extent in the 13th century, was the largest contiguous land empire in history. Roughly how much of the world's land area did it cover?|El Imperio mongol, en su mayor extensión en el siglo XIII, fue el mayor imperio terrestre contiguo de la historia. ¿Qué proporción aproximada de la superficie terrestre mundial llegó a cubrir?|L'Empire mongol, à son apogée au XIIIe siècle, fut le plus vaste empire terrestre continu de l'histoire. Quelle part environ de la surface terrestre mondiale couvrait-il ?|13世紀に最大版図に達したモンゴル帝国は、史上最大の陸続きの帝国だった。世界の陸地面積のおよそどれくらいを占めたか?",
    ["About 1 in 25|Aproximadamente 1 de cada 25|Environ 1 sur 25|およそ25分の1", "About 1 in 10|Aproximadamente 1 de cada 10|Environ 1 sur 10|およそ10分の1", "About 1 in 5|Aproximadamente 1 de cada 5|Environ 1 sur 5|およそ5分の1"],
    2,
    "At its height the empire covered roughly 24 million square kilometres, close to a fifth of the planet's land, stretching from the Korean peninsula to the edge of Central Europe under a single line of Genghis Khan's descendants.|En su apogeo, el imperio cubría unos 24 millones de km², cerca de una quinta parte de la tierra emergida del planeta, extendiéndose desde la península de Corea hasta el borde de Europa Central.|À son apogée, l'empire couvrait environ 24 millions de km², près d'un cinquième des terres émergées de la planète, s'étendant de la péninsule coréenne jusqu'aux marges de l'Europe centrale.|最盛期の帝国はおよそ2,400万平方キロメートル、地球の陸地のほぼ5分の1を占め、朝鮮半島から中央ヨーロッパの縁までがチンギス・ハーンの子孫による一つの系統のもとにあった。",
  ),
  q(
    5,
    "Which of these is the most widely spoken native language in the world, by number of first-language speakers?|¿Cuál de estas es la lengua materna más hablada del mundo, por número de hablantes nativos?|Laquelle de ces langues est la langue maternelle la plus parlée au monde, en nombre de locuteurs natifs ?|母語話者の数で世界最多の言語は次のうちどれか?",
    ["Mandarin Chinese|El chino mandarín|Le chinois mandarin|中国語(標準語)", "English|El inglés|L'anglais|英語", "Hindi|El hindi|Le hindi|ヒンディー語"],
    0,
    "Mandarin has roughly twice as many native speakers as English, though English overtakes it by total speakers once second-language use is counted, since Mandarin's native speakers are concentrated almost entirely within China.|El mandarín tiene aproximadamente el doble de hablantes nativos que el inglés, aunque el inglés lo supera en total de hablantes al contar el uso como segunda lengua.|Le mandarin compte environ deux fois plus de locuteurs natifs que l'anglais, bien que l'anglais le dépasse en nombre total de locuteurs une fois comptabilisé l'usage en seconde langue.|中国語の母語話者数は英語のおよそ2倍にのぼるが、第二言語としての話者まで含めた総数では英語が上回る。中国語の母語話者はほぼ中国国内に集中しているためである。",
  ),
  q(
    6,
    "Which country is the world's largest archipelago, made up of more than 17,000 islands?|¿Qué país es el mayor archipiélago del mundo, formado por más de 17.000 islas?|Quel pays est le plus grand archipel du monde, composé de plus de 17 000 îles ?|17,000以上の島々からなる、世界最大の群島国家はどこか?",
    ["The Philippines|Filipinas|Les Philippines|フィリピン", "Indonesia|Indonesia|L'Indonésie|インドネシア", "Japan|Japón|Le Japon|日本"],
    1,
    "Indonesia stretches over roughly 5,100km from west to east, wider than the continental United States, and only a few thousand of its islands are permanently inhabited.|Indonesia se extiende unos 5.100 km de oeste a este, más ancho que el territorio continental de Estados Unidos, y solo unos pocos miles de sus islas están habitadas de forma permanente.|L'Indonésie s'étend sur environ 5 100 km d'ouest en est, plus large que les États-Unis continentaux, et seuls quelques milliers de ses îles sont habitées en permanence.|インドネシアは西から東までおよそ5,100kmに及び、アメリカ本土より広い。恒久的に人が住む島は、そのうちわずか数千にすぎない。",
  ),
  q(
    6,
    "Which mountain range forms much of the natural border between South Asia and the rest of the continent?|¿Qué cordillera forma buena parte de la frontera natural entre el sur de Asia y el resto del continente?|Quelle chaîne de montagnes forme une bonne part de la frontière naturelle entre l'Asie du Sud et le reste du continent ?|南アジアと大陸の他の部分を隔てる自然の国境の多くを成す山脈は?",
    ["The Ural Mountains|Los montes Urales|Les monts Oural|ウラル山脈", "The Himalayas|El Himalaya|L'Himalaya|ヒマラヤ山脈", "The Zagros Mountains|Los montes Zagros|Les monts Zagros|ザグロス山脈"],
    1,
    "The Himalayas are still rising by a few millimetres a year as the Indian tectonic plate continues to push into Asia, the same slow collision that first raised the range roughly 50 million years ago.|El Himalaya sigue elevándose unos pocos milímetros al año, ya que la placa tectónica india continúa empujando contra Asia, la misma colisión lenta que levantó la cordillera hace unos 50 millones de años.|L'Himalaya continue de s'élever de quelques millimètres par an, la plaque tectonique indienne poursuivant sa poussée contre l'Asie, la même lente collision qui souleva la chaîne il y a environ 50 millions d'années.|ヒマラヤ山脈は、インド・プレートがアジアへ押し込み続けているため、いまも年に数ミリずつ隆起している。およそ5,000万年前にこの山脈を初めて押し上げたのと同じ、ゆっくりとした衝突の続きである。",
  ),
  q(
    7,
    "Which of these animals is native to the forests of Sumatra and Borneo, and shares roughly 97% of its DNA with humans?|¿Cuál de estos animales es nativo de los bosques de Sumatra y Borneo, y comparte aproximadamente el 97% de su ADN con los humanos?|Lequel de ces animaux est originaire des forêts de Sumatra et de Bornéo, et partage environ 97 % de son ADN avec l'humain ?|スマトラ島とボルネオ島の森に生息し、人間とDNAのおよそ97%を共有する動物はどれか?",
    ["The Bengal tiger|El tigre de Bengala|Le tigre du Bengale|ベンガルトラ", "The Komodo dragon|El dragón de Komodo|Le dragon de Komodo|コモドオオトカゲ", "The orangutan|El orangután|L'orang-outan|オランウータン"],
    2,
    "The name orangutan comes from Malay words meaning \"person of the forest\", and the species spends nearly its entire life in the trees, rarely coming down to the ground even to drink, using leaves to scoop rainwater instead.|El nombre orangután viene de palabras malayas que significan «persona del bosque», y la especie pasa casi toda su vida en los árboles, bajando rara vez al suelo.|Le nom orang-outan vient de mots malais signifiant « homme de la forêt », et l'espèce passe presque toute sa vie dans les arbres, descendant rarement au sol.|オランウータンという名は「森の人」を意味するマレー語に由来する。ほぼ生涯を樹上で過ごし、水を飲むためにさえめったに地面へ下りず、葉を使って雨水をすくうこともある。",
  ),
  q(
    7,
    "Which of these bodies of water is the lowest point on Earth's land surface, at over 400m below sea level?|¿Cuál de estas masas de agua es el punto más bajo de la superficie terrestre, a más de 400 m bajo el nivel del mar?|Laquelle de ces étendues d'eau est le point le plus bas de la surface terrestre, à plus de 400 m sous le niveau de la mer ?|海抜マイナス400mを超える、地球の陸地でいちばん低い地点にある水域は次のうちどれか?",
    ["The Aral Sea|El mar de Aral|La mer d'Aral|アラル海", "The Dead Sea|El mar Muerto|La mer Morte|死海", "The Sea of Galilee|El mar de Galilea|Le lac de Tibériade|ガリラヤ湖"],
    1,
    "The Dead Sea's shoreline sits roughly 430m below sea level and drops a little further most years as upstream diversion of the Jordan River shrinks its inflow; its water is around ten times saltier than the ocean, dense enough that swimmers float with almost no effort.|La orilla del mar Muerto está a unos 430 m bajo el nivel del mar y baja un poco más casi cada año, ya que las desviaciones del río Jordán río arriba reducen su caudal de entrada; su agua es unas diez veces más salada que el océano.|Le rivage de la mer Morte se trouve à environ 430 m sous le niveau de la mer et s'abaisse encore chaque année, les prélèvements en amont sur le Jourdain réduisant son apport d'eau ; son eau est environ dix fois plus salée que l'océan.|死海の水位は海抜およそマイナス430mで、上流のヨルダン川からの取水が流入量を減らし続けているため、ほぼ毎年さらに下がっている。塩分濃度は海水のおよそ10倍あり、泳ぐ人はほとんど力を入れずに浮く。",
  ),
  q(
    8,
    "Which of these Asian metropolitan areas has the largest population, at over 37 million people by the broadest counts?|¿Cuál de estas áreas metropolitanas asiáticas tiene la mayor población, más de 37 millones según los recuentos más amplios?|Laquelle de ces aires métropolitaines asiatiques compte la plus grande population, plus de 37 millions selon les décomptes les plus larges ?|最も広い集計で3,700万人を超える、アジアで最大の人口を持つ大都市圏は次のうちどれか?",
    ["Jakarta|Yakarta|Jakarta|ジャカルタ", "Greater Tokyo|El área metropolitana de Tokio|Le Grand Tokyo|東京圏", "Manila|Manila|Manille|マニラ"],
    1,
    "Greater Tokyo's exact boundary is drawn differently depending on who is counting, but by the broadest definitions it remains the most populous metropolitan area on Earth, roughly equal to the entire population of Canada packed into one urban region.|El límite exacto del área metropolitana de Tokio se traza de forma distinta según quién cuente, pero según las definiciones más amplias sigue siendo el área metropolitana más poblada del planeta, casi como meter a toda la población de Canadá en una sola región urbana.|La limite exacte du Grand Tokyo est tracée différemment selon qui compte, mais selon les définitions les plus larges, il reste l'aire métropolitaine la plus peuplée de la planète, à peu près toute la population du Canada réunie dans une seule région urbaine.|東京圏の正確な境界は、誰が数えるかによって引き方が変わるが、最も広い定義では地球上で最も人口の多い大都市圏であり続けている。カナダの総人口にほぼ匹敵する人が一つの都市圏に集まっている計算になる。",
  ),
  q(
    8,
    "The word \"typhoon\" most likely entered English via a Chinese term meaning what?|La palabra «tifón» probablemente entró al inglés a través de un término chino que significa ¿qué?|Le mot « typhon » est probablement entré dans la langue anglaise via un terme chinois signifiant quoi ?|「タイフーン(typhoon)」という語は、次のどんな意味の中国語の言葉を経て英語に入ったとされるか?",
    ["Great wind|Gran viento|Grand vent|大風", "Sea dragon|Dragón marino|Dragon de mer|海の竜", "Water wall|Muro de agua|Mur d'eau|水の壁"],
    0,
    "Linguists trace \"typhoon\" through a tangle of routes including the Cantonese term daai6 fung1, literally \"great wind\", though a similar-sounding Greek word for whirlwind may also have shaped the English spelling along the way.|Los lingüistas rastrean «tifón» por una maraña de rutas, incluido el término cantonés daai6 fung1, literalmente «gran viento», aunque una palabra griega de sonido similar para torbellino también pudo influir en la grafía inglesa.|Les linguistes retracent « typhon » à travers un enchevêtrement de voies, dont le terme cantonais daai6 fung1, littéralement « grand vent », bien qu'un mot grec de sonorité proche pour tourbillon ait pu aussi influencer l'orthographe anglaise.|「タイフーン」という語の由来は諸説絡み合っているが、広東語で文字どおり「大風」を意味する「大風(daai6 fung1)」を経由したとする説が有力である。ただし旋風を意味する響きの似たギリシア語も、英語の綴りに影響したとされる。",
  ),
  q(
    9,
    "Which of these is the smallest country by land area located partly or entirely in Asia?|¿Cuál de estos es el país más pequeño por superficie situado parcial o totalmente en Asia?|Lequel de ces pays est le plus petit par sa superficie, situé en partie ou entièrement en Asie ?|次のうち、一部または全体がアジアに位置する国のうち、面積が最も小さいのはどれか?",
    ["Brunei|Brunéi|Brunei|ブルネイ", "Bahrain|Baréin|Bahreïn|バーレーン", "Maldives|Maldivas|Maldives|モルディブ"],
    2,
    "The Maldives, an archipelago of low coral islands in the Indian Ocean, has a total land area of only about 300 square kilometres spread across nearly 1,200 islands, and an average ground elevation of roughly 1.5m above sea level.|Maldivas, un archipiélago de islas de coral bajas en el océano Índico, tiene una superficie total de solo unos 300 km² repartidos en casi 1.200 islas, con una elevación media de apenas 1,5 m sobre el nivel del mar.|Les Maldives, archipel d'îles coralliennes basses de l'océan Indien, ont une superficie totale d'environ 300 km² répartis sur près de 1 200 îles, avec une altitude moyenne d'environ 1,5 m au-dessus du niveau de la mer.|インド洋に浮かぶ低いサンゴ礁の島々からなるモルディブは、およそ1,200の島に総面積わずか300平方キロメートルほどが散らばり、平均標高は海抜およそ1.5mしかない。",
  ),
  q(
    9,
    "Ulugh Beg, a 15th-century ruler of Samarkand, built one of the era's great scientific instruments there. What was it?|Ulugh Beg, gobernante de Samarcanda en el siglo XV, construyó allí uno de los grandes instrumentos científicos de la época. ¿Cuál era?|Ulugh Beg, souverain de Samarcande au XVe siècle, y fit construire l'un des grands instruments scientifiques de l'époque. Lequel ?|15世紀のサマルカンドの支配者ウルグ・ベクは、その地に当時屈指の科学装置を建てた。それは何か?",
    ["A giant sundial and astronomical observatory|Un gigantesco reloj de sol y observatorio astronómico|Un gigantesque cadran solaire et observatoire astronomique|巨大な日時計と天文観測所", "An underground library that never flooded|Una biblioteca subterránea que nunca se inundaba|Une bibliothèque souterraine jamais inondée|決して水没しない地下図書館", "A mechanical calendar clock powered by a waterwheel|Un calendario mecánico movido por una rueda hidráulica|Un calendrier mécanique actionné par une roue à eau|水車で動く機械式の暦時計"],
    0,
    "Ulugh Beg's observatory used a giant marble sextant, partly built underground for stability, to catalogue over a thousand stars with an accuracy that outdid every European catalogue for the next 150 years.|El observatorio de Ulugh Beg usaba un enorme sextante de mármol, en parte subterráneo para darle estabilidad, para catalogar más de mil estrellas con una precisión que superó a todo catálogo europeo durante los 150 años siguientes.|L'observatoire d'Ulugh Beg utilisait un gigantesque sextant de marbre, en partie enterré pour sa stabilité, pour cataloguer plus de mille étoiles avec une précision qui surpassa tout catalogue européen durant les 150 années suivantes.|ウルグ・ベクの天文台は、安定性のため一部を地下に据えた巨大な大理石の六分儀を使い、千個を超える星を、以後150年間どのヨーロッパの星表も及ばない精度で記録した。",
  ),
  q(
    2,
    "What is the world's most populous city proper, located in East Asia?|¿Cuál es la ciudad propiamente dicha más poblada del mundo, situada en el este de Asia?|Quelle est la ville la plus peuplée du monde au sens strict, en Asie de l'Est ?|東アジアにある、市域人口で世界最多の都市はどこか?",
    ["Tokyo|Tokio|Tokyo|東京", "Chongqing|Chongqing|Chongqing|重慶", "Shanghai|Shanghái|Shanghai|上海"],
    1,
    "Depending on which administrative boundary is counted, the sprawling municipality of Chongqing in inland China holds over 30 million people, though most of that area is still rural, which is why greater Tokyo is usually named the larger urban area instead.|Según qué límite administrativo se cuente, el vasto municipio de Chongqing, en el interior de China, tiene más de 30 millones de personas, aunque la mayor parte de esa área sigue siendo rural.|Selon la limite administrative retenue, la vaste municipalité de Chongqing, dans l'intérieur de la Chine, compte plus de 30 millions d'habitants, bien que la majeure partie de cette zone reste rurale.|どの行政境界を数えるかによるが、中国内陸部にまたがる広大な直轄市・重慶は3,000万人を超える人口を抱える。ただしその大半はいまも農村部であり、そのため都市圏としては東京圏のほうが大きいとされるのが普通である。",
  ),
  q(
    3,
    "Which spice, historically among the most valuable traded along Asian sea routes, comes from the dried stigma of a crocus flower?|¿Qué especia, históricamente una de las más valiosas comerciadas por las rutas marítimas asiáticas, proviene del estigma seco de una flor de azafrán?|Quelle épice, historiquement parmi les plus précieuses échangées sur les routes maritimes asiatiques, provient du stigmate séché d'une fleur de crocus ?|アジアの海上交易路で歴史的に最も高価だった香辛料の一つで、クロッカスの花のめしべを乾燥させて作るものは?",
    ["Turmeric|Cúrcuma|Curcuma|ターメリック", "Cardamom|Cardamomo|Cardamome|カルダモン", "Saffron|Azafrán|Safran|サフラン"],
    2,
    "It takes roughly 150,000 flowers, hand-picked and each stripped of just three tiny stigmas, to produce a single kilogram of saffron, which is why it remains one of the most expensive spices in the world by weight.|Se necesitan unas 150.000 flores, recogidas a mano y a cada una de las cuales se le extraen solo tres diminutos estigmas, para producir un solo kilogramo de azafrán.|Il faut environ 150 000 fleurs, cueillies à la main et dont on ne retire que trois minuscules stigmates chacune, pour produire un seul kilogramme de safran.|わずか1kgのサフランを作るのに、手摘みされた花およそ15万本が要る。一本からはたった3本の小さなめしべしか取れないため、いまも重さあたり世界屈指の高価な香辛料であり続けている。",
  ),
  q(
    4,
    "What is the traditional felt-and-lattice tent used by nomadic herders across the Mongolian and Central Asian steppe called?|¿Cómo se llama la tienda tradicional de fieltro y celosía usada por los pastores nómadas de la estepa mongola y centroasiática?|Comment s'appelle la tente traditionnelle de feutre et de treillis utilisée par les éleveurs nomades de la steppe mongole et centrasiatique ?|モンゴル・中央アジアの草原で遊牧民が使う、フェルトと格子組みの伝統的な住居は何と呼ばれるか?",
    ["A ger or yurt|Un ger o yurta|Un ger ou yourte|ゲル(ユルト)", "A hogan|Un hogan|Un hogan|ホーガン", "A wigwam|Un wigwam|Un wigwam|ウィグワム"],
    0,
    "A ger can be taken down and packed onto a couple of camels or a truck in under two hours, a design refined over centuries of seasonal moves between winter and summer pasture.|Un ger puede desmontarse y cargarse en un par de camellos o un camión en menos de dos horas, un diseño perfeccionado durante siglos de traslados estacionales entre pastos de invierno y verano.|Un ger peut être démonté et chargé sur quelques chameaux ou un camion en moins de deux heures, un modèle affiné au fil des siècles de déplacements saisonniers entre pâturages d'hiver et d'été.|ゲルはラクダ数頭かトラック一台に積めるまで、二時間足らずで解体できる。冬と夏の牧草地を季節ごとに移動する暮らしの中で、何世紀もかけて洗練された造りである。",
  ),
  q(
    5,
    "Which of these countries has never been colonised by a European power, though it did briefly cede territory under an 1855 treaty with Britain and France?|¿Cuál de estos países nunca fue colonizado por una potencia europea, aunque sí cedió brevemente territorio bajo un tratado de 1855 con Gran Bretaña y Francia?|Lequel de ces pays n'a jamais été colonisé par une puissance européenne, bien qu'il ait brièvement cédé du territoire selon un traité de 1855 avec la Grande-Bretagne et la France ?|ヨーロッパ列強に植民地化されたことが一度も無い国は次のうちどれか(ただし1855年の英仏との条約で一時的に領土を割譲した)?",
    ["Vietnam|Vietnam|Le Vietnam|ベトナム", "Thailand|Tailandia|La Thaïlande|タイ", "Indonesia|Indonesia|L'Indonésie|インドネシア"],
    1,
    "Thailand, then Siam, kept its independence throughout the colonial era partly by ceding outlying territory and playing British and French interests in the region off against each other, remaining a buffer state between their colonies.|Tailandia, entonces Siam, mantuvo su independencia durante toda la era colonial cediendo territorio periférico y enfrentando los intereses británicos y franceses en la región entre sí.|La Thaïlande, alors le Siam, conserva son indépendance tout au long de l'ère coloniale en cédant des territoires périphériques et en jouant les intérêts britanniques et français de la région l'un contre l'autre.|当時シャムと呼ばれたタイは、周辺の領土を割譲しつつ、この地域でのイギリスとフランスの利害を互いに競わせることで、植民地時代を通じて独立を保ち、両国の植民地の間の緩衝国であり続けた。",
  ),
  q(
    6,
    "Which of these deserts, one of the coldest and largest in Asia, spans much of Mongolia and northern China?|¿Cuál de estos desiertos, uno de los más fríos y extensos de Asia, se extiende por buena parte de Mongolia y el norte de China?|Lequel de ces déserts, l'un des plus froids et des plus vastes d'Asie, s'étend sur une bonne partie de la Mongolie et du nord de la Chine ?|モンゴルと中国北部の大半にまたがる、アジアでも屈指の広さと寒さを持つ砂漠はどれか?",
    ["The Thar Desert|El desierto de Thar|Le désert de Thar|タール砂漠", "The Gobi Desert|El desierto de Gobi|Le désert de Gobi|ゴビ砂漠", "The Rub' al Khali|El Rub al Jali|Le Rub al-Khali|ルブアルハリ砂漠"],
    1,
    "Unlike the sandy dunes many people picture, most of the Gobi is bare rock and gravel, and winter temperatures there can drop below minus 30°C, cold enough that some of its dinosaur fossil beds were preserved by freeze rather than sand burial.|A diferencia de las dunas de arena que muchos imaginan, la mayor parte del Gobi es roca desnuda y grava, y las temperaturas invernales pueden bajar de los -30°C.|Contrairement aux dunes de sable que beaucoup imaginent, l'essentiel du Gobi est fait de roche nue et de gravier, et les températures hivernales peuvent y descendre sous les -30°C.|多くの人が思い浮かべる砂丘とは違い、ゴビ砂漠の大半は岩と砂利の裸地で、冬の気温は氷点下30度を下回ることもある。恐竜の化石層の一部が、砂に埋もれたのではなく凍結によって保存されたほどの寒さである。",
  ),
  q(
    7,
    "Papermaking spread from China to the Islamic world after which 8th-century battle, according to a widely repeated historical account?|Según un relato histórico ampliamente repetido, ¿tras qué batalla del siglo VIII se difundió la fabricación de papel de China al mundo islámico?|Selon un récit historique largement répété, à la suite de quelle bataille du VIIIe siècle la fabrication du papier se répandit-elle de la Chine vers le monde islamique ?|広く語られる歴史の説によれば、製紙法が中国からイスラム世界へ広まる契機になったとされる8世紀の戦いはどれか?",
    ["The Battle of Talas|La batalla de Talas|La bataille de Talas|タラス河畔の戦い", "The Battle of Manzikert|La batalla de Manzikert|La bataille de Manzikert|マラーズギルドの戦い", "The Battle of Panipat|La batalla de Panipat|La bataille de Panipat|パーニーパットの戦い"],
    0,
    "The story holds that Chinese papermakers captured after the 751 CE battle brought the craft westward, though historians note paper may already have been spreading more gradually along trade routes before that single battle.|La historia sostiene que los fabricantes de papel chinos capturados tras la batalla del 751 llevaron el oficio hacia el oeste, aunque los historiadores señalan que el papel quizá ya se difundía más gradualmente por las rutas comerciales.|L'histoire veut que des papetiers chinois capturés après la bataille de 751 aient porté cet art vers l'ouest, bien que les historiens notent que le papier se répandait peut-être déjà plus graduellement le long des routes commerciales avant cette seule bataille.|751年のこの戦いのあと捕らえられた中国人の製紙職人たちが西へ製法を伝えたと語られるが、歴史家はこの一戦以前から交易路沿いにもっと緩やかに紙が広まっていた可能性も指摘している。",
  ),
  q(
    8,
    "The Silk Road was not a single road but a shifting network of routes. Roughly when did overland long-distance trade along these routes first flourish?|La Ruta de la Seda no fue un solo camino, sino una red cambiante de rutas. ¿Aproximadamente cuándo floreció por primera vez el comercio terrestre de larga distancia por estas rutas?|La route de la soie n'était pas une route unique, mais un réseau changeant d'itinéraires. À peu près quand le commerce terrestre longue distance y a-t-il d'abord prospéré ?|シルクロードは一本道ではなく、絶えず形を変える交易路の網だった。この道沿いの陸路の長距離交易がおおよそ初めて栄えたのはいつ頃か?",
    ["Around 2,000 years ago, under the Han dynasty and Roman Empire|Hace unos 2.000 años, bajo la dinastía Han y el Imperio romano|Il y a environ 2 000 ans, sous la dynastie Han et l'Empire romain|およそ2000年前、漢王朝とローマ帝国の時代", "Around 500 years ago, during the Age of Exploration|Hace unos 500 años, durante la era de los descubrimientos|Il y a environ 500 ans, à l'époque des grandes découvertes|およそ500年前、大航海時代", "Around 8,000 years ago, with the first farming villages|Hace unos 8.000 años, con las primeras aldeas agrícolas|Il y a environ 8 000 ans, avec les premiers villages agricoles|およそ8000年前、最初の農耕集落の時代"],
    0,
    "Organised long-distance trade is generally dated to around the 2nd century BCE, when Han dynasty China and territories further west, eventually reaching Roman markets, began exchanging silk, glass, spices and far more than either side had of the other.|El comercio organizado de larga distancia suele fecharse hacia el siglo II a.C., cuando la China de la dinastía Han y territorios más al oeste, hasta alcanzar los mercados romanos, empezaron a intercambiar seda, vidrio y especias.|Le commerce organisé longue distance est généralement daté d'environ le IIe siècle av. J.-C., quand la Chine des Han et des territoires plus à l'ouest, jusqu'aux marchés romains, commencèrent à échanger soie, verre et épices.|組織立った長距離交易はおおむね紀元前2世紀ごろに遡るとされ、漢王朝時代の中国とさらに西の諸地域が、やがてローマの市場にまで達しながら、絹やガラス、香辛料などを取り引きし始めた。",
  ),
  q(
    9,
    "Which of these is the deepest point in any of the world's oceans, located in the Pacific east of the Mariana Islands?|¿Cuál de estos es el punto más profundo de cualquier océano del mundo, situado en el Pacífico al este de las islas Marianas?|Lequel de ces éléments est le point le plus profond de tous les océans du monde, situé dans le Pacifique à l'est des îles Mariannes ?|マリアナ諸島の東の太平洋にある、世界のどの海洋よりも深い地点は次のうちどれか?",
    ["The Japan Trench|La fosa de Japón|La fosse du Japon|日本海溝", "The Sunda Trench|La fosa de la Sonda|La fosse de la Sonde|スンダ海溝", "The Mariana Trench|La fosa de las Marianas|La fosse des Mariannes|マリアナ海溝"],
    2,
    "The trench's deepest known point, the Challenger Deep, reaches nearly 11,000m down, deep enough that Mount Everest could be dropped into it with more than 2km of water still above the peak.|El punto más profundo conocido de la fosa, el Abismo Challenger, alcanza casi 11.000 m de profundidad, lo bastante como para que el Everest cupiera dentro con más de 2 km de agua todavía sobre la cima.|Le point le plus profond connu de la fosse, l'abysse Challenger, atteint près de 11 000 m de profondeur, assez pour que l'Everest y soit englouti avec plus de 2 km d'eau encore au-dessus du sommet.|海溝の中で確認されている最深点チャレンジャー海淵は水深およそ1万1000mに達し、エベレストを丸ごと沈めても山頂の上にまだ2km以上の水が残るほどの深さである。",
  ),
  q(
    3,
    "Chess is generally believed to have originated from a game played in which country before spreading along trade routes to Persia and beyond?|Se cree generalmente que el ajedrez se originó en un juego practicado en qué país antes de difundirse por las rutas comerciales hacia Persia y más allá?|On pense généralement que les échecs sont nés d'un jeu pratiqué dans quel pays, avant de se répandre le long des routes commerciales vers la Perse et au-delà ?|チェスは、交易路を通じてペルシアなどへ広まる前、どの国で遊ばれていたゲームに起源を持つとされているか?",
    ["India|India|L'Inde|インド", "Egypt|Egipto|L'Égypte|エジプト", "Greece|Grecia|La Grèce|ギリシャ"],
    0,
    "The game is thought to descend from chaturanga, played in India by around the 6th century CE and named for the four divisions of an ancient army — chariots, elephants, cavalry and infantry — that became the modern rook, bishop, knight and pawn.|Se cree que el juego desciende del chaturanga, jugado en India hacia el siglo VI, y llamado así por las cuatro divisiones de un ejército antiguo —carros, elefantes, caballería e infantería— que se convirtieron en la torre, el alfil, el caballo y el peón modernos.|Le jeu descendrait du chaturanga, pratiqué en Inde vers le VIe siècle, nommé d'après les quatre divisions d'une armée antique — chars, éléphants, cavalerie et infanterie — devenues la tour, le fou, le cavalier et le pion modernes.|チェスは、6世紀ごろのインドで遊ばれていたチャトランガに由来するとされる。この名は古代の軍隊の四つの兵科(戦車・象・騎兵・歩兵)にちなみ、それぞれ現代のルーク・ビショップ・ナイト・ポーンになった。",
  ),
  q(
    4,
    "Which of these is the world's longest river, flowing entirely within one country in East Asia?|¿Cuál de estos es el río más largo del mundo, que fluye enteramente dentro de un solo país del este de Asia?|Lequel de ces fleuves est le plus long du monde, coulant entièrement à l'intérieur d'un seul pays d'Asie de l'Est ?|東アジアの一国内だけを流れる、世界最長の川は次のうちどれか?",
    ["The Yellow River|El río Amarillo|Le fleuve Jaune|黄河", "The Yangtze|El Yangtsé|Le Yangtsé|長江", "The Amur|El Amur|L'Amour|アムール川"],
    1,
    "The Yangtze runs about 6,300km entirely within China, making it the longest river confined to a single country anywhere in the world, and it supports roughly a third of the country's population along its basin.|El Yangtsé recorre unos 6.300 km enteramente dentro de China, lo que lo convierte en el río más largo confinado a un solo país en cualquier parte del mundo.|Le Yangtsé parcourt environ 6 300 km entièrement à l'intérieur de la Chine, ce qui en fait le plus long fleuve confiné à un seul pays au monde.|長江は全長およそ6,300kmをすべて中国国内で流れ、一国内に収まる川としては世界最長である。その流域には中国の人口のおよそ3分の1が暮らす。",
  ),
  q(
    5,
    "Which of these is the primary religion of Bhutan, reflected in its many dzong fortress-monasteries?|¿Cuál de estas es la religión principal de Bután, reflejada en sus numerosos dzong, fortalezas-monasterio?|Laquelle de ces religions est la principale au Bhoutan, reflétée dans ses nombreux dzong, forteresses-monastères ?|ブータンの主要な宗教で、数多いゾン(城塞寺院)にも反映されているものは?",
    ["Vajrayana Buddhism|El budismo vajrayana|Le bouddhisme vajrayana|チベット仏教(金剛乗)", "Hinduism|El hinduismo|L'hindouisme|ヒンドゥー教", "Zoroastrianism|El zoroastrismo|Le zoroastrisme|ゾロアスター教"],
    0,
    "Bhutan is the world's only country with Vajrayana Buddhism as its official state religion, and government policy explicitly weighs \"Gross National Happiness\" — including cultural preservation — alongside economic growth in national planning.|Bután es el único país del mundo con el budismo vajrayana como religión oficial de estado, y la política gubernamental sopesa explícitamente la «Felicidad Nacional Bruta».|Le Bhoutan est le seul pays au monde à avoir le bouddhisme vajrayana comme religion d'État officielle, et la politique gouvernementale prend explicitement en compte le « bonheur national brut ».|ブータンは、チベット仏教(金剛乗)を国教とする世界で唯一の国であり、国の政策は経済成長と並んで「国民総幸福量」――文化の保全を含む――を明確に考慮に入れる。",
  ),
  q(
    6,
    "The Mongol Empire's protection of trade routes across its vast territory, giving merchants unusual safety in transit, became known by what name?|La protección que el Imperio mongol daba a las rutas comerciales en su vasto territorio, dando a los mercaderes una seguridad inusual, se conoció con qué nombre?|La protection accordée par l'Empire mongol aux routes commerciales sur son vaste territoire, offrant aux marchands une sécurité inhabituelle, fut connue sous quel nom ?|モンゴル帝国が広大な領土の交易路を保護し、商人たちに異例の安全な通行を許した状態は何と呼ばれたか?",
    ["The Silk Peace|La paz de la seda|La paix de la soie|絹の平和", "The Great Yassa|La Gran Yasa|Le Grand Yasa|大ヤサ", "The Pax Mongolica|La Pax Mongolica|La Pax Mongolica|パクス・モンゴリカ"],
    2,
    "Contemporary travellers, including Marco Polo, wrote that the security this brought to the roads was without precedent, though later historians note the peace was enforced by the same military conquest that had devastated many of the very cities the routes passed through.|Viajeros de la época, incluido Marco Polo, escribieron que la seguridad que esto trajo a los caminos no tenía precedentes, aunque historiadores posteriores señalan que esa paz se imponía con la misma conquista militar que había devastado muchas de las ciudades por las que pasaban esas rutas.|Des voyageurs de l'époque, dont Marco Polo, écrivirent que la sécurité apportée aux routes n'avait pas de précédent, bien que des historiens ultérieurs notent que cette paix était imposée par la même conquête militaire qui avait dévasté nombre des villes traversées par ces routes.|マルコ・ポーロを含む当時の旅行者は、これによって道にもたらされた安全は前例が無いと書き残しているが、後世の歴史家は、この「平和」が、まさにその交易路の通る多くの都市を荒廃させたのと同じ軍事征服によって維持されていたことを指摘している。",
  ),
  q(
    2,
    "Which of these martial arts, involving grappling and originating in Japan, gives its name to a major Olympic sport?|¿Cuál de estas artes marciales, que implica agarres y se originó en Japón, da nombre a un importante deporte olímpico?|Laquelle de ces arts martiaux, impliquant des prises et originaire du Japon, donne son nom à un sport olympique majeur ?|組み技を伴い日本発祥で、五輪の主要種目の名にもなっている武道はどれか?",
    ["Judo|El judo|Le judo|柔道", "Fencing|La esgrima|L'escrime|フェンシング", "Archery|El tiro con arco|Le tir à l'arc|アーチェリー"],
    0,
    "Judo was developed in the 1880s by Jigoro Kano, who drew on older jujutsu techniques but reworked them around safety and sport, deliberately removing the most dangerous strikes so practitioners could train at full effort without serious injury.|El judo fue desarrollado en la década de 1880 por Jigoro Kano, que se basó en técnicas más antiguas de jujutsu pero las reformuló en torno a la seguridad y el deporte.|Le judo fut mis au point dans les années 1880 par Jigoro Kano, qui s'appuya sur d'anciennes techniques de jujitsu tout en les repensant autour de la sécurité et du sport.|柔道は1880年代、嘉納治五郎が古い柔術の技を土台にしながら、安全性と競技性を重んじて編み直したものである。最も危険な当て身技をあえて外し、練習者が大きな怪我なく全力で稽古できるようにした。",
  ),
  q(
    10,
    "The Aral Sea, once the world's fourth-largest lake, has lost roughly what share of its original surface area since the 1960s due to Soviet-era irrigation?|El mar de Aral, antes el cuarto lago más grande del mundo, ¿qué proporción aproximada de su superficie original ha perdido desde los años sesenta por el riego de la era soviética?|La mer d'Aral, autrefois quatrième plus grand lac du monde, a perdu quelle part environ de sa superficie d'origine depuis les années 1960, à cause de l'irrigation de l'ère soviétique ?|かつて世界第4位の広さを誇った湖だったアラル海は、ソ連時代の灌漑によって1960年代からおおよそどれくらいの割合の面積を失ったか?",
    ["About a quarter|Aproximadamente una cuarta parte|Environ un quart|およそ4分の1", "About half|Aproximadamente la mitad|Environ la moitié|およそ半分", "More than 90%|Más del 90%|Plus de 90 %|9割以上"],
    2,
    "Rivers that once fed the Aral were diverted almost entirely to irrigate cotton fields across Soviet Central Asia, and the lake has since shrunk to a few scattered remnants, exposing a former seabed now known for salt storms that damage crops for hundreds of kilometres around.|Los ríos que antes alimentaban el Aral se desviaron casi por completo para regar los algodonales de Asia Central soviética, y el lago se ha reducido desde entonces a unos pocos restos dispersos.|Les rivières qui alimentaient jadis la mer d'Aral furent détournées presque entièrement pour irriguer les champs de coton d'Asie centrale soviétique, et le lac s'est depuis réduit à quelques vestiges épars.|かつてアラル海に注いでいた川は、ソ連時代の中央アジアの綿花畑を灌漑するためほぼ全量が転用され、湖はいまや点在するわずかな残存部にまで縮小した。露出した旧湖底は、周囲数百キロの作物を傷める塩嵐の発生源として知られている。",
  ),
  q(
    1,
    "Which of these countries is entirely within Asia and also the world's second-most populous?|¿Cuál de estos países está enteramente en Asia y es también el segundo más poblado del mundo?|Lequel de ces pays est entièrement situé en Asie et est aussi le deuxième plus peuplé du monde ?|次のうち、全域がアジアにあり、かつ世界第2位の人口を持つ国はどれか?",
    ["Indonesia|Indonesia|L'Indonésie|インドネシア", "India|India|L'Inde|インド", "Pakistan|Pakistán|Le Pakistan|パキスタン"],
    1,
    "India overtook China as the world's most populous country around 2023 according to UN estimates, though the two remain close enough that the ranking is watched closely and could shift again.|India superó a China como el país más poblado del mundo hacia 2023 según estimaciones de la ONU, aunque ambos siguen tan cerca que la clasificación se vigila de cerca.|L'Inde a dépassé la Chine comme pays le plus peuplé du monde vers 2023 selon les estimations de l'ONU, bien que les deux restent assez proches pour que le classement soit surveillé de près.|国連の推計によれば、インドは2023年頃に中国を抜いて世界最多の人口を持つ国になったとされるが、両国の差はいまも僅差で注視され続けている。",
  ),
  q(
    4,
    "Which of these describes the general wind pattern known as the monsoon that shapes life across much of South and Southeast Asia?|¿Cuál de estos describe el patrón general de viento conocido como monzón que da forma a la vida en buena parte del sur y sureste de Asia?|Laquelle de ces descriptions correspond au régime de vent général appelé mousson, qui façonne la vie dans une bonne partie du Sud et du Sud-Est asiatiques ?|南アジア・東南アジアの多くの暮らしを形作る「モンスーン」と呼ばれる風の型を正しく説明しているのはどれか?",
    ["Winds that reverse direction seasonally, bringing wet and dry halves of the year|Vientos que invierten su dirección estacionalmente, trayendo mitades húmedas y secas del año|Des vents qui s'inversent selon les saisons, apportant une moitié humide et une moitié sèche de l'année|季節ごとに向きが逆転し、一年を湿季と乾季に分ける風", "A single powerful storm that strikes once a decade|Una única tormenta poderosa que golpea una vez por década|Une tempête unique et puissante frappant une fois par décennie|10年に一度襲う一度きりの強力な嵐", "A cold wind that only blows at night|Un viento frío que solo sopla de noche|Un vent froid qui ne souffle que la nuit|夜にしか吹かない冷たい風"],
    0,
    "The word monsoon comes from the Arabic mawsim, meaning \"season\", and describes how winds reverse between summer and winter, carrying moist ocean air inland for months at a time before switching to dry offshore flow.|La palabra monzón viene del árabe mawsim, «estación», y describe cómo los vientos se invierten entre verano e invierno, llevando aire oceánico húmedo tierra adentro durante meses.|Le mot mousson vient de l'arabe mawsim, « saison », et décrit comment les vents s'inversent entre été et hiver, portant de l'air océanique humide vers l'intérieur des terres pendant des mois.|モンスーンという語は「季節」を意味するアラビア語マウシムに由来し、夏と冬で風向きが逆転する現象を指す。湿った海の空気を何か月も内陸へ運んだのち、乾いた陸から海への風に切り替わる。",
  ),
];
