/**
 * トルコのクイズ(38問)。
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
 * 都市カード(43件)が扱う具体的な事実(アヤソフィア・トロイ/ガリポリ・
 * エフェソスの図書館・カッパドキアの地下都市・ルーミーと旋回舞踊・
 * ネムルトの石頭・ヴァン猫・アタテュルクのサムスン上陸など)はここでは
 * 問わない。代わりに、国全体の地理・言語・食・現代文化・民俗など、
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

export const TURKEY_QUIZ = [
  q(
    1,
    "What is the capital of Turkey?|¿Cuál es la capital de Turquía?|Quelle est la capitale de la Turquie ?|トルコの首都はどこか?",
    [
      "Istanbul|Estambul|Istanbul|イスタンブール",
      "Ankara|Ankara|Ankara|アンカラ",
      "Izmir|Esmirna|Izmir|イズミル",
    ],
    1,
    "Ankara has been the capital since 1923, chosen by the republic's founders over the much larger, more famous Istanbul partly for its distance from the coast and any foreign fleet.|Ankara es la capital desde 1923, elegida por los fundadores de la república en vez de la mucho más grande y famosa Estambul, en parte por su distancia de la costa.|Ankara est la capitale depuis 1923, choisie par les fondateurs de la République plutôt qu'Istanbul, bien plus grande et célèbre, en partie pour son éloignement de la côte.|アンカラは1923年から首都であり続けている。共和国の建国者たちは、はるかに大きく有名なイスタンブールではなくこの街を選んだ。海岸や外国艦隊から離れていることも理由の一つだった。",
  ),
  q(
    1,
    "What is the currency of Turkey?|¿Cuál es la moneda de Turquía?|Quelle est la monnaie de la Turquie ?|トルコの通貨は?",
    [
      "Euro|Euro|Euro|ユーロ",
      "Dinar|Dinar|Dinar|ディナール",
      "Turkish Lira|Lira turca|Livre turque|トルコリラ",
    ],
    2,
    "The lira has circulated under that name since Ottoman times, though the government dropped six zeros from the currency in 2005 after years of steep inflation had made everyday prices run into the millions.|La lira circula con ese nombre desde época otomana, aunque el gobierno le quitó seis ceros en 2005 tras años de fuerte inflación que habían disparado los precios cotidianos a los millones.|La livre circule sous ce nom depuis l'époque ottomane, bien que le gouvernement lui ait retiré six zéros en 2005 après des années de forte inflation ayant fait grimper les prix courants à des millions.|リラという名の通貨はオスマン時代から流通しているが、政府は2005年、長年の激しいインフレで日常の値段が何百万にも達していたのを受けて、通貨から0を6つ落とした。",
  ),
  q(
    1,
    "Which continents does Turkey have territory on?|¿En qué continentes tiene territorio Turquía?|Sur quels continents la Turquie a-t-elle un territoire ?|トルコはどの大陸にまたがっているか?",
    [
      "Only Europe|Solo Europa|Seulement l'Europe|ヨーロッパのみ",
      "Only Asia|Solo Asia|Seulement l'Asie|アジアのみ",
      "Both Europe and Asia|Europa y Asia|L'Europe et l'Asie|ヨーロッパとアジアの両方",
    ],
    2,
    "A small share of the country's land, the region of Thrace, lies west of the straits in Europe, while the much larger remainder, Anatolia, lies in Asia.|Una pequeña parte del país, la región de Tracia, queda al oeste de los estrechos, en Europa, mientras que el resto, mucho mayor, Anatolia, está en Asia.|Une petite part du pays, la région de Thrace, se trouve à l'ouest des détroits, en Europe, tandis que le reste, bien plus vaste, l'Anatolie, est en Asie.|国土のごく一部、トラキア地方は海峡の西側、ヨーロッパにある。それよりはるかに広い残りの部分、アナトリアはアジアにある。",
  ),
  q(
    2,
    "Which is Turkey's most populous city?|¿Cuál es la ciudad más poblada de Turquía?|Quelle est la ville la plus peuplée de Turquie ?|トルコで人口が最も多い都市は?",
    [
      "Ankara|Ankara|Ankara|アンカラ",
      "Izmir|Esmirna|Izmir|イズミル",
      "Istanbul|Estambul|Istanbul|イスタンブール",
    ],
    2,
    "Istanbul is not the capital but is by far the largest city, with a metropolitan population well above 15 million, more than the capital and third city combined.|Estambul no es la capital pero es, con diferencia, la ciudad más grande, con una población metropolitana muy por encima de 15 millones, más que la capital y la tercera ciudad juntas.|Istanbul n'est pas la capitale mais en est de loin la plus grande ville, avec une population métropolitaine largement supérieure à 15 millions, davantage que la capitale et la troisième ville réunies.|イスタンブールは首都ではないが、圧倒的に人口の多い都市で、都市圏人口は1500万人を優に超え、首都と第三の都市を合わせたより多い。",
  ),
  q(
    2,
    "Which sea lies along Turkey's northern coast?|¿Qué mar bordea la costa norte de Turquía?|Quelle mer borde la côte nord de la Turquie ?|トルコの北の海岸に面する海は?",
    [
      "The Red Sea|El mar Rojo|La mer Rouge|紅海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
    ],
    1,
    "The Black Sea coast is Turkey's rainiest region, with dense green hills that support tea and hazelnut farming rather than the dry scrub typical further south.|La costa del mar Negro es la región más lluviosa de Turquía, con colinas verdes y densas que sostienen el cultivo de té y avellanas en vez del matorral seco típico del sur.|La côte de la mer Noire est la région la plus pluvieuse de Turquie, aux collines vertes et denses propices au thé et à la noisette plutôt qu'au maquis sec typique du sud.|黒海沿岸はトルコでいちばん雨の多い地方で、南のほうに多い乾いた低木地帯とは違い、緑濃い丘陵が茶とヘーゼルナッツの栽培を支えている。",
  ),
  q(
    2,
    "Which of these does NOT border Turkey?|¿Cuál de estos NO limita con Turquía?|Lequel de ces éléments ne borde PAS la Turquie ?|トルコに接していないものは?",
    [
      "The Aegean Sea|El mar Egeo|La mer Égée|エーゲ海",
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋",
    ],
    2,
    "Turkey is bordered by the Black Sea, the Aegean and the Mediterranean, plus the inland Sea of Marmara between the straits, but its coastline never reaches the open Atlantic.|Turquía limita con el mar Negro, el Egeo y el Mediterráneo, además del mar de Mármara entre los estrechos, pero su litoral nunca llega al Atlántico abierto.|La Turquie est bordée par la mer Noire, la mer Égée et la Méditerranée, ainsi que par la mer de Marmara entre les détroits, mais son littoral n'atteint jamais l'Atlantique ouvert.|トルコは黒海・エーゲ海・地中海、そして海峡のあいだのマルマラ海に接しているが、海岸線が外洋の大西洋に届くことはない。",
  ),
  q(
    1,
    "What is the majority religion in Turkey?|¿Cuál es la religión mayoritaria en Turquía?|Quelle est la religion majoritaire en Turquie ?|トルコの多数派の宗教は?",
    [
      "Christianity|Cristianismo|Christianisme|キリスト教",
      "Islam|Islam|Islam|イスラム教",
      "Hinduism|Hinduismo|Hindouisme|ヒンドゥー教",
    ],
    1,
    "The country is officially secular, with religion and state affairs kept legally separate since the 1920s, even though the great majority of the population identifies as Muslim.|El país es oficialmente laico, con los asuntos religiosos y estatales legalmente separados desde los años veinte, aunque la gran mayoría de la población se identifica como musulmana.|Le pays est officiellement laïc, les affaires religieuses et étatiques étant légalement séparées depuis les années 1920, bien que la grande majorité de la population se dise musulmane.|この国は法律上、宗教と国政が1920年代から分けられた世俗国家だが、人口の大多数はムスリムを名乗っている。",
  ),
  q(
    2,
    "What symbol appears on the Turkish flag?|¿Qué símbolo aparece en la bandera turca?|Quel symbole figure sur le drapeau turc ?|トルコの国旗にある図柄は?",
    [
      "A sun and an eagle|Un sol y un águila|Un soleil et un aigle|太陽と鷲",
      "A star and a crescent moon|Una estrella y una luna creciente|Une étoile et un croissant de lune|星と三日月",
      "A lion and a sword|Un león y una espada|Un lion et une épée|獅子と剣",
    ],
    1,
    "The white star and crescent on a red field has roots in Ottoman military banners, and near-identical star-and-crescent flags are flown by several other historically Ottoman-influenced nations.|La estrella y la luna creciente blancas sobre fondo rojo tienen raíces en los estandartes militares otomanos, y banderas casi idénticas de estrella y creciente ondean en varias otras naciones de influencia otomana histórica.|L'étoile et le croissant blancs sur fond rouge trouvent leurs racines dans les étendards militaires ottomans, et des drapeaux presque identiques flottent dans plusieurs autres nations d'influence ottomane historique.|赤地に白い星と三日月を配したこの図柄は、オスマン帝国の軍旗に起源を持つ。ほぼ同じ星と三日月の旗は、かつてオスマン帝国の影響を受けた他のいくつかの国でも掲げられている。",
  ),
  q(
    1,
    "What is the most popular sport in Turkey?|¿Cuál es el deporte más popular en Turquía?|Quel est le sport le plus populaire en Turquie ?|トルコで最も人気のあるスポーツは?",
    [
      "Cricket|Críquet|Cricket|クリケット",
      "Baseball|Béisbol|Baseball|野球",
      "Football|Fútbol|Football|サッカー",
    ],
    2,
    "Football dominates sports coverage and conversation nationwide, with Istanbul's oldest clubs drawing rivalries passionate enough to shut down whole neighbourhoods on derby days.|El fútbol domina la cobertura deportiva y la conversación en todo el país, y los clubes más antiguos de Estambul despiertan rivalidades lo bastante apasionadas como para paralizar barrios enteros en día de derbi.|Le football domine la couverture sportive et les conversations dans tout le pays, les plus vieux clubs d'Istanbul suscitant des rivalités assez passionnées pour paralyser des quartiers entiers les jours de derby.|サッカーはスポーツ報道でも日常の話題でも国じゅうを席巻しており、イスタンブールの老舗クラブどうしの対抗戦の日には、街区がまるごと静まり返るほどの熱狂を呼ぶ。",
  ),
  q(
    3,
    "What is the name of the sweet made from starch and sugar, dusted with powdered sugar or nuts, often called \"Turkish delight\" in English?|¿Cómo se llama el dulce de almidón y azúcar, espolvoreado con azúcar glas o frutos secos, a menudo llamado en inglés «delicia turca»?|Comment s'appelle la confiserie à base d'amidon et de sucre, saupoudrée de sucre glace ou de fruits secs, souvent appelée « loukoum » ?|でんぷんと砂糖で作り、粉砂糖やナッツをまぶした、英語で「ターキッシュ・ディライト」とも呼ばれる菓子の名は?",
    [
      "Baklava|Baklava|Baklava|バクラヴァ",
      "Lokum|Lokum|Loukoum|ロクム",
      "Helva|Halva|Helva|ヘルヴァ",
    ],
    1,
    "Lokum has been made since at least the eighteenth century, and its texture depends on cooking the starch-and-sugar paste slowly enough to avoid crystallising before it sets.|El lokum se elabora desde al menos el siglo XVIII, y su textura depende de cocer la pasta de almidón y azúcar con la lentitud suficiente para que no cristalice antes de cuajar.|Le loukoum se fabrique depuis au moins le XVIIIe siècle, et sa texture dépend d'une cuisson assez lente de la pâte d'amidon et de sucre pour éviter qu'elle ne cristallise avant de prendre.|ロクムは少なくとも18世紀から作られており、その食感は、固まる前に結晶化しないようでんぷんと砂糖のペーストをゆっくり煮る加減にかかっている。",
  ),
  q(
    3,
    "What is the name of the ring-shaped, sesame-crusted bread sold by street vendors and often eaten for breakfast?|¿Cómo se llama el pan en forma de anillo cubierto de sésamo que venden los vendedores callejeros y suele comerse en el desayuno?|Comment s'appelle le pain en forme d'anneau couvert de sésame, vendu par les marchands ambulants et souvent mangé au petit-déjeuner ?|路上の売り子が売る、胡麻をまぶした輪の形のパンで、朝食によく食べられるものの名は?",
    [
      "Simit|Simit|Simit|シミット",
      "Poğaça|Poğaça|Poğaça|ポアチャ",
      "Pide|Pide|Pide|ピデ",
    ],
    0,
    "Vendors carry towers of simit stacked on a tray balanced on their heads or on a glass-fronted cart, and the bread's crisp, dense crust comes from a dip in grape molasses syrup before baking.|Los vendedores llevan torres de simit apiladas en una bandeja sobre la cabeza o en un carrito acristalado, y la corteza crujiente y densa del pan viene de un baño en almíbar de melaza de uva antes de hornearlo.|Les vendeurs portent des tours de simit empilés sur un plateau en équilibre sur la tête ou sur une charrette vitrée, et la croûte croustillante et dense du pain vient d'un trempage dans du sirop de mélasse de raisin avant cuisson.|売り子は頭に載せた盆やガラス張りの屋台にシミットを積み上げて売り歩く。焼く前に葡萄糖蜜のシロップにくぐらせることで、あのパリッとした密な皮ができる。",
  ),
  q(
    3,
    "What is the Turkish word for \"hello\"?|¿Cómo se dice «hola» en turco?|Comment dit-on « bonjour » en turc ?|トルコ語で「こんにちは」は?",
    [
      "Merhaba|Merhaba|Merhaba|メルハバ",
      "Konnichiwa|Konnichiwa|Konnichiwa|こんにちは",
      "Namaste|Namasté|Namaste|ナマステ",
    ],
    0,
    "Merhaba is thought to come from an Arabic root meaning something close to \"welcome\" or \"expansiveness\", and it works as a greeting at any hour rather than being tied to morning or evening.|Se cree que merhaba viene de una raíz árabe que significa algo cercano a «bienvenida» o «amplitud», y sirve como saludo a cualquier hora, sin estar ligado a la mañana o la tarde.|Merhaba viendrait d'une racine arabe signifiant quelque chose comme « bienvenue » ou « ampleur », et sert de salutation à toute heure, sans être lié au matin ou au soir.|メルハバはアラビア語の語根に由来するとされ、「歓迎」や「広がり」に近い意味を持つ。朝や夕方に限らず、いつでも使える挨拶である。",
  ),
  q(
    3,
    "Turkish tea is traditionally served in glasses shaped like which flower?|¿El té turco se sirve tradicionalmente en vasos con forma de qué flor?|Le thé turc est traditionnellement servi dans des verres en forme de quelle fleur ?|トルコの紅茶は伝統的に、どんな花の形をしたグラスで出されるか?",
    [
      "A rose|Una rosa|Une rose|バラ",
      "A tulip|Un tulipán|Une tulipe|チューリップ",
      "A sunflower|Un girasol|Un tournesol|ヒマワリ",
    ],
    1,
    "The narrow-waisted glass keeps the tea's colour visible and its top hot to the lips while the base stays cool enough to hold, and two sugar cubes on the saucer are standard rather than milk.|El vaso de cintura estrecha mantiene visible el color del té y caliente el borde para los labios, mientras la base se mantiene fresca para poder sujetarla, y lo habitual son dos terrones de azúcar en el platillo, no leche.|Le verre à taille étroite laisse voir la couleur du thé et garde le bord chaud aux lèvres, tandis que la base reste assez fraîche à tenir ; deux morceaux de sucre sur la soucoupe sont la norme, pas de lait.|くびれた形のグラスは紅茶の色を見せつつ、口に触れる上部は熱いまま、持つ底部は熱すぎないようにしてある。受け皿には牛乳ではなく角砂糖二個が添えられるのが定番である。",
  ),
  q(
    4,
    "Which writing system does modern Turkish use?|¿Qué sistema de escritura usa el turco moderno?|Quel système d'écriture utilise le turc moderne ?|現代トルコ語が使う文字体系は?",
    [
      "Cyrillic script|Alfabeto cirílico|Alphabet cyrillique|キリル文字",
      "Arabic script|Alfabeto árabe|Alphabet arabe|アラビア文字",
      "Latin script|Alfabeto latino|Alphabet latin|ラテン文字",
    ],
    2,
    "A 1928 reform replaced the Arabic-based script used under the Ottomans with a Latin alphabet adapted with extra letters for sounds Turkish needed, and the whole country was expected to learn it within months.|Una reforma de 1928 sustituyó el alfabeto de base árabe usado bajo los otomanos por un alfabeto latino adaptado con letras extra para sonidos que el turco necesitaba, y se esperaba que todo el país lo aprendiera en meses.|Une réforme de 1928 remplaça l'alphabet d'origine arabe utilisé sous les Ottomans par un alphabet latin adapté de lettres supplémentaires pour des sons propres au turc, et tout le pays fut censé l'apprendre en quelques mois.|1928年の改革により、オスマン時代に使われていたアラビア文字を基にした文字は、トルコ語に必要な音のための追加の文字を備えたラテン文字に置き換えられた。国じゅうが数か月のうちに覚えることを求められた。",
  ),
  q(
    4,
    "Which language family does Turkish belong to?|¿A qué familia lingüística pertenece el turco?|À quelle famille de langues appartient le turc ?|トルコ語が属する語族は?",
    [
      "Turkic|Túrquica|Turcique|テュルク語族",
      "Slavic|Eslava|Slave|スラブ語族",
      "Semitic|Semítica|Sémitique|セム語族",
    ],
    0,
    "Turkish is related not to Arabic or Persian, its historical neighbours, but to languages spoken from the Balkans through Central Asia to Siberia, sharing features like vowel harmony across the family.|El turco no está emparentado con el árabe o el persa, sus vecinos históricos, sino con lenguas habladas desde los Balcanes hasta Siberia pasando por Asia Central, y comparte rasgos como la armonía vocálica.|Le turc n'est pas apparenté à l'arabe ou au persan, ses voisins historiques, mais à des langues parlées des Balkans à la Sibérie en passant par l'Asie centrale, partageant des traits comme l'harmonie vocalique.|トルコ語は歴史的な隣人であるアラビア語やペルシャ語とは系統が異なり、バルカン半島から中央アジアを経てシベリアまで話される言語群と同族で、母音調和などの特徴を語族全体で共有している。",
  ),
  q(
    5,
    "Linguists trace the roots of the Turkic language family to which region?|¿A qué región remontan los lingüistas las raíces de la familia lingüística túrquica?|Les linguistes font remonter les racines de la famille des langues turciques à quelle région ?|言語学者はテュルク語族の起源をどの地域に求めているか?",
    [
      "Scandinavia|Escandinavia|La Scandinavie|スカンディナビア",
      "West Africa|África Occidental|L'Afrique de l'Ouest|西アフリカ",
      "Central Asia|Asia Central|L'Asie centrale|中央アジア",
    ],
    2,
    "Turkic-speaking peoples migrated west from Central Asia over many centuries, reaching Anatolia in force from the eleventh century on and eventually founding the states that became the Ottoman Empire.|Los pueblos túrquicos migraron hacia el oeste desde Asia Central durante muchos siglos, llegando a Anatolia con fuerza a partir del siglo XI y fundando finalmente los estados que se convertirían en el Imperio otomano.|Les peuples turcophones migrèrent vers l'ouest depuis l'Asie centrale au fil des siècles, atteignant l'Anatolie en force à partir du XIe siècle et fondant finalement les États devenus l'Empire ottoman.|テュルク語を話す人々は何世紀もかけて中央アジアから西へ移動し、11世紀以降本格的にアナトリアへ到達して、のちにオスマン帝国となる国家を築いた。",
  ),
  q(
    6,
    "How many provinces is Turkey divided into?|¿En cuántas provincias se divide Turquía?|En combien de provinces la Turquie est-elle divisée ?|トルコはいくつの県に分かれているか?",
    [
      "51|51|51|51",
      "81|81|81|81",
      "101|101|101|101",
    ],
    1,
    "Each province is headed by a governor appointed from the capital, a centralised system inherited largely from late Ottoman administrative reforms.|Cada provincia está encabezada por un gobernador nombrado desde la capital, un sistema centralizado heredado en gran medida de las reformas administrativas otomanas tardías.|Chaque province est dirigée par un gouverneur nommé depuis la capitale, un système centralisé largement hérité des réformes administratives ottomanes tardives.|各県は首都から任命された知事が率いており、この中央集権的な仕組みは、おおむねオスマン帝国末期の行政改革から受け継がれている。",
  ),
  q(
    5,
    "Turkey is the world's leading producer of which nut?|¿Turquía es el mayor productor mundial de qué fruto seco?|La Turquie est le premier producteur mondial de quel fruit à coque ?|トルコが世界一の生産量を誇る木の実は?",
    [
      "Cashews|Anacardos|Noix de cajou|カシューナッツ",
      "Hazelnuts|Avellanas|Noisettes|ヘーゼルナッツ",
      "Macadamias|Macadamias|Noix de macadamia|マカダミアナッツ",
    ],
    1,
    "The Black Sea coast's hills produce roughly two-thirds of the world's hazelnuts, most of which end up in chocolate spreads and confectionery shipped abroad rather than eaten whole.|Las colinas de la costa del mar Negro producen cerca de dos tercios de las avellanas del mundo, la mayoría de las cuales acaban en cremas de chocolate y repostería enviadas al extranjero.|Les collines de la côte de la mer Noire produisent environ les deux tiers des noisettes mondiales, la plupart finissant dans des pâtes à tartiner au chocolat et de la confiserie exportées.|黒海沿岸の丘陵地帯は世界のヘーゼルナッツのおよそ3分の2を産する。その大半は丸のまま食べられるのではなく、チョコレートスプレッドや菓子となって海外へ送られる。",
  ),
  q(
    6,
    "Turkey is also the world's leading producer of which dried fruit, much of it grown around Malatya?|¿Turquía es también el mayor productor mundial de qué fruta seca, cultivada en gran parte alrededor de Malatya?|La Turquie est aussi le premier producteur mondial de quel fruit sec, cultivé en grande partie autour de Malatya ?|マラティヤ周辺を中心に、トルコが世界一の生産量を誇る乾燥果物は?",
    [
      "Dried apricots|Orejones (albaricoque seco)|Abricots secs|干しあんず",
      "Dried figs|Higos secos|Figues sèches|干しいちじく",
      "Raisins|Pasas|Raisins secs|干しぶどう",
    ],
    0,
    "Apricots grown around Malatya in the country's east are laid out on rooftops and open ground to dry in the sun, and the region alone accounts for a large share of the world's supply.|Los albaricoques cultivados en torno a Malatya, en el este del país, se extienden en tejados y al aire libre para secarse al sol, y esa región por sí sola aporta una gran parte del suministro mundial.|Les abricots cultivés autour de Malatya, dans l'est du pays, sont étalés sur les toits et en plein air pour sécher au soleil, et cette seule région fournit une bonne part de l'offre mondiale.|国の東部、マラティヤ周辺で育つあんずは屋根や野外に広げられ天日で干される。この地方だけで世界の供給量の大きな割合を占める。",
  ),
  q(
    4,
    "What are Turkey's famous hand-knotted rugs, woven in flat and pile varieties across the country, generally called?|¿Cómo se llaman en general las famosas alfombras turcas anudadas a mano, tejidas en variedades planas y de pelo por todo el país?|Comment appelle-t-on généralement les célèbres tapis turcs noués à la main, tissés en versions plates et à poils dans tout le pays ?|国じゅうで織られる、平織りと毛足のある種類がある、トルコの有名な手織り絨毯の総称は?",
    [
      "Kilim|Kilim|Kilim|キリム",
      "Tatami|Tatami|Tatami|畳",
      "Sari|Sari|Sari|サリー",
    ],
    0,
    "Kilim technically refers to the flat-woven, pileless kind, distinct from the thicker knotted-pile carpets, but regional patterns and colours are often distinctive enough that experts can name the weaving village on sight.|Kilim se refiere técnicamente al tipo tejido plano, sin pelo, distinto de las alfombras más gruesas de nudo, pero los patrones y colores regionales suelen ser tan característicos que los expertos pueden nombrar el pueblo tejedor a simple vista.|Kilim désigne techniquement le type tissé à plat, sans poils, distinct des tapis noués plus épais, mais les motifs et couleurs régionaux sont souvent si caractéristiques que les experts peuvent nommer le village tisserand d'un coup d'œil.|厳密にはキリムは毛足のない平織りの種類を指し、より厚みのある結び目式の絨毯とは区別されるが、地方ごとの文様や色使いは特徴的で、専門家は一目で織られた村を言い当てられることも多い。",
  ),
  q(
    7,
    "In Turkic mythology, which animal is said to have led an ancient people out of a mountain valley to found their nation, later becoming a nationalist symbol?|En la mitología túrquica, ¿qué animal se dice que guio a un pueblo antiguo fuera de un valle montañoso para fundar su nación, y luego se volvió símbolo nacionalista?|Dans la mythologie turcique, quel animal aurait guidé un peuple ancien hors d'une vallée montagneuse pour fonder sa nation, devenant plus tard un symbole nationaliste ?|テュルク神話で、山あいの谷から古代の民を導き出して建国させたとされ、のちにナショナリズムの象徴にもなった動物は?",
    [
      "An eagle|Un águila|Un aigle|鷲",
      "A grey wolf|Un lobo gris|Un loup gris|灰色オオカミ",
      "A red deer|Un ciervo rojo|Un cerf rouge|赤鹿",
    ],
    1,
    "The she-wolf Asena is said in legend to have guided the Göktürks out of a hidden valley, and the grey wolf, or bozkurt, is still used today as a hand gesture and emblem by Turkish nationalist movements.|Según la leyenda, la loba Asena guio a los göktürks fuera de un valle oculto, y el lobo gris, o bozkurt, se sigue usando hoy como gesto y emblema de movimientos nacionalistas turcos.|Selon la légende, la louve Asena aurait guidé les Göktürks hors d'une vallée cachée, et le loup gris, ou bozkurt, sert encore aujourd'hui de geste et d'emblème à des mouvements nationalistes turcs.|伝説では、雌狼アセナが突厥(ゲクテュルク)を隠れた谷から導き出したとされる。灰色オオカミ「ボズクルト」はいまもトルコのナショナリスト運動の手のジェスチャーや紋章として使われている。",
  ),
  q(
    7,
    "Which giant livestock-guarding dog breed, prized for fending off wolves, takes its name from a district in Sivas province?|¿Qué raza de perro guardián de ganado gigante, apreciada por ahuyentar lobos, toma su nombre de un distrito de la provincia de Sivas?|Quelle race de chien de garde géant, prisée pour repousser les loups, tire son nom d'un district de la province de Sivas ?|オオカミを追い払う力で重宝される、シワス県の一地区にちなんで名付けられた大型牧羊犬の犬種は?",
    [
      "Akita|Akita|Akita|秋田犬",
      "Newfoundland|Terranova|Terre-Neuve|ニューファンドランド",
      "Kangal|Kangal|Kangal|カンガル",
    ],
    2,
    "Kangal dogs traditionally wear spiked iron collars while working, protection for their throats in the event a wolf actually attacks, and they are bred more for guarding a flock at a distance than for close companionship.|Los perros kangal llevan tradicionalmente collares de hierro con púas mientras trabajan, protección para el cuello en caso de que un lobo ataque de verdad, y se crían más para vigilar un rebaño a distancia que para la compañía cercana.|Les chiens kangal portent traditionnellement un collier de fer à pointes au travail, une protection pour la gorge en cas d'attaque réelle d'un loup, et sont élevés davantage pour surveiller un troupeau à distance que pour la compagnie rapprochée.|カンガル犬は働くあいだ伝統的に鉄のとげ付き首輪をつける。オオカミに実際に襲われたとき喉を守るためである。人に寄り添う伴侶としてよりも、離れた場所から群れを守るために育てられる。",
  ),
  q(
    5,
    "What kind of instrument is the bağlama (also called saz), central to Turkish folk music?|¿Qué tipo de instrumento es el bağlama (también llamado saz), central en la música folclórica turca?|Quel type d'instrument est le bağlama (aussi appelé saz), central dans la musique folklorique turque ?|トルコの民俗音楽の中心となるバーラマ(サズ)とはどんな楽器か?",
    [
      "A long-necked lute|Un laúd de mástil largo|Un luth à long manche|長い棹を持つリュート",
      "A double-reed horn|Una chirimía de doble lengüeta|Un cor à anche double|ダブルリードの管楽器",
      "A hand drum|Un tambor de mano|Un tambour à main|手で叩く太鼓",
    ],
    0,
    "The bağlama's frets are movable and spaced for microtones between the standard notes of a piano, letting players bend into the specific intervals folk melodies and Sufi music both call for.|Los trastes del bağlama son móviles y se espacian para microtonos entre las notas estándar de un piano, permitiendo a los músicos deslizarse hacia los intervalos concretos que piden tanto las melodías folclóricas como la música sufí.|Les frettes du bağlama sont mobiles et espacées pour des microtons entre les notes standard d'un piano, permettant aux musiciens de glisser vers les intervalles précis qu'appellent aussi bien les mélodies folkloriques que la musique soufie.|バーラマのフレットは可動式で、ピアノの標準的な音の間にある微分音の位置に配置されている。奏者は民謡やスーフィー音楽の両方が求める独特の音程へ弦を押し曲げて合わせられる。",
  ),
  q(
    4,
    "What colours is the traditional \"nazar\" amulet, believed to ward off the evil eye, usually made in?|¿De qué colores suele hacerse el amuleto tradicional «nazar», que se cree que ahuyenta el mal de ojo?|De quelles couleurs l'amulette traditionnelle « nazar », censée repousser le mauvais œil, est-elle généralement faite ?|邪視を防ぐと信じられている伝統的な魔除け「ナザル」は、通常どんな色で作られるか?",
    [
      "Red and gold|Rojo y dorado|Rouge et or|赤と金",
      "Blue and white|Azul y blanco|Bleu et blanc|青と白",
      "Green and black|Verde y negro|Vert et noir|緑と黒",
    ],
    1,
    "The concentric blue-and-white glass disc is hung in homes, cars, offices and even airports, on the belief that its own painted eye absorbs an envious glance before it can cause harm.|El disco de vidrio concéntrico azul y blanco se cuelga en casas, coches, oficinas e incluso aeropuertos, en la creencia de que su propio ojo pintado absorbe una mirada envidiosa antes de que pueda hacer daño.|Le disque de verre concentrique bleu et blanc se suspend dans les maisons, les voitures, les bureaux et même les aéroports, dans la croyance que son œil peint absorbe un regard envieux avant qu'il ne cause du tort.|同心円状の青と白のガラス製の円盤は、家や車、オフィス、さらには空港にまで吊るされる。描かれたその目自体が、害をなす前に妬みの視線を吸い取ると信じられているためである。",
  ),
  q(
    7,
    "Roughly what share of Turkey's land area lies within Asia rather than Europe?|¿Aproximadamente qué proporción del territorio de Turquía está en Asia y no en Europa?|Quelle part du territoire de la Turquie se trouve environ en Asie plutôt qu'en Europe ?|トルコの国土のうち、ヨーロッパではなくアジアにある割合はおよそどれくらいか?",
    [
      "About 60 percent|Cerca del 60 por ciento|Environ 60 pour cent|およそ60%",
      "About 80 percent|Cerca del 80 por ciento|Environ 80 pour cent|およそ80%",
      "About 97 percent|Cerca del 97 por ciento|Environ 97 pour cent|およそ97%",
    ],
    2,
    "Only the region of Thrace, a sliver west of the Bosphorus and Dardanelles holding a few percent of the country's territory, lies in Europe; the vast bulk of the land, Anatolia, is entirely in Asia.|Solo la región de Tracia, una franja al oeste del Bósforo y los Dardanelos que ocupa unos pocos puntos porcentuales del territorio del país, queda en Europa; el grueso del territorio, Anatolia, está por entero en Asia.|Seule la région de Thrace, une étroite bande à l'ouest du Bosphore et des Dardanelles ne représentant que quelques points de pourcentage du territoire du pays, se trouve en Europe ; l'essentiel du territoire, l'Anatolie, est entièrement en Asie.|ヨーロッパにあるのはトラキア地方だけで、国土のわずか数パーセントを占めるにすぎない。残る大部分、アナトリアはすべてアジアにある。",
  ),
  q(
    7,
    "Turkey's only Nobel Prize winner in literature so far sets most of his novels in which city?|¿En qué ciudad ambienta la mayoría de sus novelas el único premio Nobel de Literatura turco hasta ahora?|Le seul prix Nobel de littérature turc à ce jour situe la plupart de ses romans dans quelle ville ?|これまでトルコ唯一のノーベル文学賞受賞者が、多くの小説の舞台にしている都市は?",
    [
      "Ankara|Ankara|Ankara|アンカラ",
      "Izmir|Esmirna|Izmir|イズミル",
      "Istanbul|Estambul|Istanbul|イスタンブール",
    ],
    2,
    "Orhan Pamuk won the prize in 2006, and his novels return again and again to Istanbul's melancholy sense of a city caught between what it was and what it is becoming, a mood he calls hüzün.|Orhan Pamuk ganó el premio en 2006, y sus novelas vuelven una y otra vez a la melancolía de Estambul, una ciudad atrapada entre lo que fue y lo que está llegando a ser, un ánimo que él llama hüzün.|Orhan Pamuk remporta le prix en 2006, et ses romans reviennent sans cesse à la mélancolie d'Istanbul, ville prise entre ce qu'elle fut et ce qu'elle devient, une humeur qu'il nomme hüzün.|オルハン・パムクは2006年にこの賞を受けた。その小説は繰り返し、かつての姿といまの姿のはざまに漂うイスタンブールの物憂さへ立ち返る。彼はこの気分を「フュズン」と呼ぶ。",
  ),
  q(
    5,
    "Which hot drink do people in Turkey consume the most of per capita, more than in almost any other country?|¿De qué bebida caliente se consume más per cápita en Turquía, más que en casi cualquier otro país?|Quelle boisson chaude les habitants de Turquie consomment-ils le plus par habitant, plus que dans presque tout autre pays ?|トルコで一人当たりの消費量が、他のほとんどの国より多い温かい飲み物は?",
    [
      "Coffee|Café|Café|コーヒー",
      "Tea|Té|Thé|紅茶",
      "Ayran (a yoghurt drink)|Ayran (bebida de yogur)|Ayran (boisson au yaourt)|アイラン(ヨーグルト飲料)",
    ],
    1,
    "Despite Turkish coffee's fame abroad, black tea grown on the Black Sea coast is the everyday drink, poured constantly from a stacked double kettle called a çaydanlık in homes, offices and shops alike.|Pese a la fama del café turco en el extranjero, el té negro cultivado en la costa del mar Negro es la bebida cotidiana, servido sin parar desde una tetera doble apilada llamada çaydanlık, tanto en casas como en oficinas y tiendas.|Malgré la renommée du café turc à l'étranger, le thé noir cultivé sur la côte de la mer Noire est la boisson du quotidien, versé sans cesse depuis une double bouilloire empilée appelée çaydanlık, dans les foyers, bureaux et boutiques.|海外ではトルココーヒーが有名だが、黒海沿岸で育つ紅茶こそが日常の飲み物で、家庭でもオフィスでも店でも、チャイダンルックと呼ばれる二段重ねのポットから絶えず注がれ続ける。",
  ),
  q(
    4,
    "What is the name of Turkey's flag carrier airline, which flies to more countries than almost any other in the world?|¿Cómo se llama la aerolínea de bandera de Turquía, que vuela a más países que casi cualquier otra del mundo?|Comment s'appelle la compagnie aérienne nationale de la Turquie, qui dessert plus de pays que presque toute autre au monde ?|世界でも指折り多くの国へ就航する、トルコのフラッグキャリア航空会社の名は?",
    [
      "Pegasus Airlines|Pegasus Airlines|Pegasus Airlines|ペガサス航空",
      "Turkish Airlines|Turkish Airlines|Turkish Airlines|ターキッシュ エアラインズ",
      "Emirates|Emirates|Emirates|エミレーツ航空",
    ],
    1,
    "Turkish Airlines uses Istanbul's position at the crossroads of Europe, Asia and Africa to route passengers through one of the world's busiest hub airports, built on the city's northern outskirts and opened in 2018.|Turkish Airlines aprovecha la posición de Estambul en la encrucijada de Europa, Asia y África para encaminar pasajeros por uno de los aeropuertos núcleo más concurridos del mundo, construido en las afueras norte de la ciudad y abierto en 2018.|Turkish Airlines exploite la position d'Istanbul au carrefour de l'Europe, de l'Asie et de l'Afrique pour acheminer les passagers par l'un des aéroports plaques tournantes les plus fréquentés au monde, bâti à la périphérie nord de la ville et ouvert en 2018.|ターキッシュ エアラインズは、ヨーロッパ・アジア・アフリカの交差点に位置するイスタンブールの立地を生かし、世界屈指の乗降客数を誇るハブ空港へ乗客を集めている。この空港は市の北の郊外に建設され、2018年に開港した。",
  ),
  q(
    6,
    "Turkish coffee culture and its style of preparation are recognised by UNESCO as an example of which kind of heritage?|¿La cultura y forma de preparación del café turco están reconocidas por la UNESCO como ejemplo de qué tipo de patrimonio?|La culture du café turc et sa méthode de préparation sont reconnues par l'UNESCO comme un exemple de quel type de patrimoine ?|トルココーヒーの文化とその淹れ方は、ユネスコによってどんな遺産の例として認定されているか?",
    [
      "A World Heritage Site|Un sitio de Patrimonio Mundial|Un site du patrimoine mondial|世界遺産(建造物・自然遺産)",
      "Intangible Cultural Heritage|Patrimonio Cultural Inmaterial|Patrimoine culturel immatériel|無形文化遺産",
      "A Geographical Indication|Una indicación geográfica|Une indication géographique|地理的表示",
    ],
    1,
    "The listing covers the whole custom, not just the drink: the slow preparation in a small long-handled pot, the foam skimmed carefully onto each cup, and the fortune sometimes read afterward from the grounds.|El reconocimiento cubre toda la costumbre, no solo la bebida: la preparación lenta en una cacerola pequeña de mango largo, la espuma repartida con cuidado en cada taza y la lectura de la fortuna en los posos.|La reconnaissance couvre toute la coutume, pas seulement la boisson : la préparation lente dans une petite casserole à long manche, la mousse répartie avec soin dans chaque tasse, et la lecture de fortune parfois faite ensuite dans le marc.|この登録は飲み物そのものだけでなく習わし全体を対象としており、柄の長い小鍋でゆっくり淹れる工程、各カップへ丁寧にすくい分ける泡、そのあと時おり行われる粉占いまでを含む。",
  ),
  q(
    7,
    "Which unusual winter sport, held in the Aegean region, pits two muzzled male camels against each other in a shoving match?|¿Qué inusual deporte de invierno, celebrado en la región del Egeo, enfrenta a dos camellos machos bozalados en un empujón?|Quel sport d'hiver insolite, organisé dans la région égéenne, oppose deux chameaux mâles muselés dans une joute de poussée ?|エーゲ地方で行われる、口輪をつけた雄ラクダ2頭が押し合う珍しい冬のスポーツは?",
    [
      "Camel wrestling|Lucha de camellos|Lutte de chameaux|ラクダ相撲",
      "Bull running|Encierro de toros|Course de taureaux|牛追い",
      "Ram fighting|Pelea de carneros|Combat de béliers|牡羊の突き合い",
    ],
    0,
    "The camels are muzzled so neither can bite, and a match ends when one animal either flees, falls, or simply refuses to push any further, with the loudest cheers reserved for a dramatic retreat.|Los camellos van bozalados para que ninguno pueda morder, y el combate termina cuando un animal huye, cae o simplemente se niega a seguir empujando; los mayores vítores se reservan para una retirada dramática.|Les chameaux sont muselés pour qu'aucun ne morde, et le combat se termine quand l'un des deux fuit, tombe, ou refuse simplement de pousser davantage, les plus grandes acclamations allant à une retraite spectaculaire.|どちらも噛みつけないよう口輪をつけられ、片方が逃げるか倒れるか、それ以上押すのを拒んだところで勝負がつく。劇的な敗走にはひときわ大きな歓声が上がる。",
  ),
  q(
    2,
    "Which of these is NOT one of Istanbul's traditional \"big three\" football clubs?|¿Cuál de estos NO es uno de los tres grandes clubes de fútbol tradicionales de Estambul?|Lequel de ceux-ci n'est PAS l'un des trois grands clubs de football traditionnels d'Istanbul ?|イスタンブールの伝統的な「三大」サッカークラブに含まれないものは?",
    [
      "Galatasaray|Galatasaray|Galatasaray|ガラタサライ",
      "Beşiktaş|Beşiktaş|Beşiktaş|ベシクタシュ",
      "Barcelona|Barcelona|Barcelone|バルセロナ",
    ],
    2,
    "Galatasaray, Fenerbahçe and Beşiktaş make up Istanbul's historic big three, each rooted in a different district of the city and each with a passionately loyal, city-wide following.|Galatasaray, Fenerbahçe y Beşiktaş forman los tres grandes históricos de Estambul, cada uno arraigado en un barrio distinto de la ciudad y con una afición fiel y apasionada por toda la ciudad.|Galatasaray, Fenerbahçe et Beşiktaş forment le grand trio historique d'Istanbul, chacun ancré dans un quartier différent de la ville et doté d'un public fidèle et passionné dans toute la métropole.|ガラタサライ・フェネルバフチェ・ベシクタシュの三強がイスタンブールの伝統的な三大クラブを成し、それぞれ街の異なる地区に根を張り、街じゅうに熱狂的な支持者を持つ。",
  ),
  q(
    6,
    "The English word \"turquoise\" comes from an old French phrase meaning what?|¿De qué frase francesa antigua proviene la palabra inglesa «turquoise» (turquesa)?|Le mot français « turquoise » vient d'une ancienne expression signifiant quoi ?|英語のturquoise(トルコ石)という語は、もともと何を意味する古いフランス語に由来するか?",
    [
      "\"Turkish (stone)\"|«(Piedra) turca»|« (Pierre) turque »|「トルコの(石)」",
      "\"Persian (stone)\"|«(Piedra) persa»|« (Pierre) persane »|「ペルシャの(石)」",
      "\"Egyptian (stone)\"|«(Piedra) egipcia»|« (Pierre) égyptienne »|「エジプトの(石)」",
    ],
    0,
    "The blue-green mineral itself was mostly mined elsewhere, but it reached medieval Europe through Turkish trade routes and markets, and the name stuck to the stone rather than to its actual source.|El mineral azul verdoso en sí se extraía sobre todo en otros lugares, pero llegó a la Europa medieval a través de rutas comerciales y mercados turcos, y el nombre se quedó pegado a la piedra y no a su verdadero origen.|Le minéral bleu-vert lui-même était surtout extrait ailleurs, mais il parvint à l'Europe médiévale par les routes commerciales et les marchés turcs, et le nom resta attaché à la pierre plutôt qu'à sa véritable origine.|この青緑の鉱石そのものは主に別の土地で採れたが、トルコの交易路と市場を経て中世ヨーロッパに届いたため、実際の産地ではなくこの通り道の名がそのまま石の名前になった。",
  ),
  q(
    9,
    "Which Iron Age kingdom, centred on Lake Van and a rival of Assyria, left behind the cliffside fortress that still overlooks the modern city?|¿Qué reino de la Edad del Hierro, centrado en el lago Van y rival de Asiria, dejó la fortaleza en el acantilado que aún domina la ciudad moderna?|Quel royaume de l'âge du fer, centré sur le lac Van et rival de l'Assyrie, a laissé la forteresse à flanc de falaise qui domine encore la ville moderne ?|ヴァン湖を中心にアッシリアと覇を競った鉄器時代の王国で、いまも現代の街を見下ろす崖の要塞を残したのは?",
    [
      "Phrygia|Frigia|Phrygie|フリギア",
      "Lydia|Lidia|Lydie|リディア",
      "Urartu|Urartu|Urartu|ウラルトゥ",
    ],
    2,
    "Urartu flourished roughly from the ninth to sixth centuries BC, and its rock-cut inscriptions and irrigation canals, some engineering still functioning in modified form, are counted among the more advanced of the ancient Near East.|Urartu floreció aproximadamente entre los siglos IX y VI a.C., y sus inscripciones rupestres y canales de riego, algunos de cuya ingeniería aún funciona de forma modificada, se cuentan entre los más avanzados del Cercano Oriente antiguo.|Urartu prospéra environ du IXe au VIe siècle av. J.-C., et ses inscriptions rupestres et canaux d'irrigation, dont certains fonctionnent encore sous forme modifiée, comptent parmi les plus avancés du Proche-Orient antique.|ウラルトゥはおよそ紀元前9世紀から6世紀にかけて栄えた。岩に刻まれた碑文や灌漑水路は、いまも形を変えて使われているものもあり、古代オリエントでも屈指の高度な技術とされる。",
  ),
  q(
    8,
    "Turkish, like many other Turkic and some other languages, typically places the verb in which part of a sentence?|El turco, como muchas otras lenguas túrquicas y algunas otras, suele colocar el verbo en qué parte de la oración?|Le turc, comme de nombreuses autres langues turciques et certaines autres, place typiquement le verbe où dans la phrase ?|トルコ語は、他の多くのテュルク語族や一部の言語と同じく、動詞を文のどこに置くか?",
    [
      "At the start|Al principio|Au début|文頭",
      "In the middle, right after the subject|En medio, justo tras el sujeto|Au milieu, juste après le sujet|文中、主語の直後",
      "At the end|Al final|À la fin|文末",
    ],
    2,
    "Turkish is a subject-object-verb language, so a sentence builds up its full context, subject and object both, before finally landing on the action, the reverse of the order English speakers expect.|El turco es una lengua sujeto-objeto-verbo, así que una oración construye todo su contexto, sujeto y objeto, antes de llegar por fin a la acción, el orden inverso al que esperan los hablantes de inglés.|Le turc est une langue sujet-objet-verbe : la phrase construit tout son contexte, sujet et objet, avant d'arriver enfin à l'action, l'inverse de l'ordre attendu en français.|トルコ語は主語・目的語・動詞の語順を取る言語で、文はまず主語と目的語の両方で文脈を組み立ててから、最後にようやく動作にたどり着く。日本語の語順に近く、英語の語順とは逆になる。",
  ),
  q(
    5,
    "Which small dumpling dish, traditionally associated with Kayseri and usually served with garlicky yoghurt, is sometimes nicknamed \"Turkish ravioli\"?|¿Qué plato de pequeños dumplings, asociado tradicionalmente con Kayseri y servido normalmente con yogur ajado, se apoda a veces «ravioles turcos»?|Quel plat de petits raviolis, traditionnellement associé à Kayseri et généralement servi avec du yaourt à l'ail, est parfois surnommé « raviolis turcs » ?|カイセリと結びつき、にんにく風味のヨーグルトを添えて出されることが多く、「トルコ風ラビオリ」とも呼ばれる小さな水餃子料理は?",
    [
      "Mantı|Mantı|Mantı|マントゥ",
      "Pide|Pide|Pide|ピデ",
      "Lahmacun|Lahmacun|Lahmacun|ラフマジュン",
    ],
    0,
    "Each dumpling is folded tiny enough that cooks are sometimes judged by how many fit on a single spoon, and the dish is thought to have travelled west along the same routes as other Central Asian noodle and dumpling traditions.|Cada dumpling se dobla tan pequeño que a veces se juzga a los cocineros por cuántos caben en una sola cuchara, y se cree que el plato viajó hacia el oeste por las mismas rutas que otras tradiciones centroasiáticas de fideos y dumplings.|Chaque raviole est pliée si petite que l'on juge parfois les cuisiniers au nombre en tenant sur une seule cuillère, et le plat aurait voyagé vers l'ouest par les mêmes routes que d'autres traditions centrasiatiques de nouilles et de raviolis.|一つ一つの水餃子はスプーン一杯にいくつ乗るかで料理人の腕が測られるほど小さく畳まれる。この料理は、他の中央アジアの麺や水餃子の伝統と同じ道筋を通って西へ伝わったと考えられている。",
  ),
  q(
    6,
    "What is the name of the traditional Turkish shadow-puppet theatre, performed with flat leather figures and named for its central character?|¿Cómo se llama el teatro tradicional turco de sombras, representado con figuras planas de cuero y llamado así por su personaje central?|Comment s'appelle le théâtre d'ombres traditionnel turc, joué avec des figurines plates en cuir et nommé d'après son personnage principal ?|平たい革の人形を使い、中心となる登場人物にちなんで名付けられたトルコの伝統的な影絵芝居の名は?",
    [
      "Karagöz|Karagöz|Karagöz|カラギョズ",
      "Bunraku|Bunraku|Bunraku|文楽",
      "Wayang|Wayang|Wayang|ワヤン",
    ],
    0,
    "Karagöz and his foil Hacivat trade wordplay and social satire from behind a backlit cloth screen, a form performed especially during Ramadan evenings and still taught to a new generation of puppeteers today.|Karagöz y su contrapunto Hacivat intercambian juegos de palabras y sátira social tras una pantalla de tela retroiluminada, una forma representada sobre todo en las noches de Ramadán y aún enseñada hoy a una nueva generación de titiriteros.|Karagöz et son faire-valoir Hacivat échangent jeux de mots et satire sociale derrière un écran de tissu rétroéclairé, une forme jouée surtout les soirs de ramadan et encore enseignée aujourd'hui à une nouvelle génération de marionnettistes.|カラギョズと相棒のハジワトは、後ろから光を当てた布のスクリーンの陰で言葉遊びと社会風刺を交わす。特にラマダンの夜に演じられる芸で、いまも新しい世代の人形遣いに受け継がれている。",
  ),
  q(
    6,
    "What are the small metal finger cymbals used to accompany traditional Turkish belly dance called?|¿Cómo se llaman los pequeños platillos metálicos de dedo usados para acompañar la danza del vientre turca tradicional?|Comment appelle-t-on les petites cymbales digitales en métal accompagnant la danse du ventre turque traditionnelle ?|トルコの伝統的なベリーダンスの伴奏に使われる、指にはめる小さな金属製のシンバルの名は?",
    [
      "Zil|Zil|Zil|ジル",
      "Darbuka|Darbuka|Darbouka|ダルブッカ",
      "Ney|Ney|Ney|ネイ",
    ],
    0,
    "A dancer wears one pair on each hand and strikes them in rhythms that layer over the goblet-shaped darbuka drum, a combination that turns the dancer herself into part of the percussion section.|La bailarina lleva un par en cada mano y los golpea en ritmos que se superponen al tambor darbuka en forma de cáliz, una combinación que convierte a la propia bailarina en parte de la sección de percusión.|La danseuse en porte une paire à chaque main et les frappe selon des rythmes se superposant au tambour darbuka en forme de gobelet, une combinaison qui fait d'elle-même une partie de la section rythmique.|踊り手は両手に一対ずつ着け、ゴブレット形の太鼓ダルブッカの音に重なるリズムで打ち鳴らす。この組み合わせによって、踊り手自身が打楽器隊の一部になる。",
  ),
  q(
    8,
    "The English word \"kiosk\", for a small open-sided stall or booth, comes from a Turkish word for what?|La palabra inglesa «kiosk» (quiosco) viene de una palabra turca que significa qué?|Le mot français « kiosque » vient d'un mot turc désignant quoi ?|小さな開放的な売店や案内所を指す英語kioskの語源となったトルコ語が本来意味していたものは?",
    [
      "A garden pavilion|Un pabellón de jardín|Un pavillon de jardin|庭園のあずまや",
      "A ship's cabin|Un camarote de barco|Une cabine de bateau|船室",
      "A marketplace stall|Un puesto de mercado|Un étal de marché|市場の露店",
    ],
    0,
    "The Turkish köşk described an open, light garden pavilion built for relaxing outdoors, often within palace grounds, and the word travelled into French and then English, gradually shrinking in scale from a small building to a mere booth.|El köşk turco describía un pabellón de jardín abierto y ligero para relajarse al aire libre, a menudo en los terrenos de un palacio, y la palabra pasó al francés y luego al inglés, encogiéndose poco a poco de un pequeño edificio a un simple puesto.|Le köşk turc désignait un pavillon de jardin ouvert et léger, bâti pour se détendre en plein air, souvent dans l'enceinte d'un palais, et le mot passa en français puis en anglais, rétrécissant peu à peu d'un petit bâtiment à un simple étal.|トルコ語のキョシュクは、しばしば宮殿の敷地内に建てられた、屋外でくつろぐための開放的な軽い庭園あずまやを指した。この語はフランス語を経て英語に入り、小さな建物からただの売店へと少しずつ規模を縮めていった。",
  ),
];
