/**
 * 南アメリカ大陸のクイズ(39問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その大陸の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(45件)がすでに扱った具体的な事実(ヤバリ号・カシキアレ運河・
 * カパック・ニャン・ブエノスアイレスの移民ホテル・ボリビアの海の喪失の
 * 詳しい経緯など)はここでは問わない。代わりに、大陸全体の地理・歴史・
 * 言語・スポーツ・自然など、**都市カードが直接は触れていない主題**を
 * 選んである。
 *
 * ```
 * node scripts/check-quiz.mjs southamerica
 * ```
 * は、まだこの盤面が焼かれていないため実行できていない(team-leadが
 * 焼いたあとに回してもらう想定)。選択肢は3つ。正解の位置(`a`)は
 * 0/1/2が13/12/14とほぼ同数になるよう機械的に数えながら散らした
 * (importして集計するスクリプトで確認済み)。
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

export const SOUTHAMERICA_QUIZ = [
  q(
    1,
    "What is the name of the world's largest rainforest and second-longest river, which crosses South America?|¿Cómo se llama la mayor selva tropical del mundo y el segundo río más largo, que cruza Sudamérica?|Comment s'appelle la plus grande forêt tropicale du monde et le deuxième plus long fleuve, qui traverse l'Amérique du Sud ?|南アメリカを横断する、世界最大の熱帯雨林であり世界第2位の長さの川の名は?",
    ["The Amazon|El Amazonas|L'Amazone|アマゾン", "The Nile|El Nilo|Le Nil|ナイル", "The Mississippi|El Misisipi|Le Mississippi|ミシシッピ"],
    0,
    "The Amazon basin covers roughly 40% of the South American continent and spans nine countries.|La cuenca del Amazonas cubre aproximadamente el 40% del continente sudamericano y se extiende por nueve países.|Le bassin amazonien couvre environ 40 % du continent sud-américain et s'étend sur neuf pays.|アマゾン盆地は南米大陸のおよそ40%を占め、9か国にまたがっている。",
  ),
  q(
    1,
    "What is the name of the mountain range that runs almost the entire length of South America's west coast?|¿Cómo se llama la cordillera que recorre casi toda la costa oeste de Sudamérica?|Comment s'appelle la chaîne de montagnes qui longe presque toute la côte ouest de l'Amérique du Sud ?|南アメリカ西海岸のほぼ全長にわたって連なる山脈の名は?",
    ["The Rocky Mountains|Las Montañas Rocosas|Les Rocheuses|ロッキー山脈", "The Andes|Los Andes|Les Andes|アンデス山脈", "The Alps|Los Alpes|Les Alpes|アルプス山脈"],
    1,
    "At roughly 7,000 kilometres long, the Andes are the longest continental mountain range on Earth.|Con unos 7.000 kilómetros de longitud, los Andes son la cordillera continental más larga del planeta.|Longues d'environ 7 000 kilomètres, les Andes sont la plus longue chaîne de montagnes continentale au monde.|全長およそ7,000キロのアンデス山脈は、地球上でもっとも長い大陸の山脈である。",
  ),
  q(
    1,
    "Which South American country has Portuguese, not Spanish, as its official language?|¿Qué país sudamericano tiene el portugués, no el español, como idioma oficial?|Quel pays sud-américain a le portugais, et non l'espagnol, pour langue officielle ?|南米でスペイン語ではなくポルトガル語を公用語とする国は?",
    ["Argentina|Argentina|Argentine|アルゼンチン", "Peru|Perú|Pérou|ペルー", "Brazil|Brasil|Brésil|ブラジル"],
    2,
    "Brazil was a Portuguese colony for over three centuries, making it the only Portuguese-speaking country in the Americas.|Brasil fue colonia portuguesa durante más de tres siglos, lo que lo convierte en el único país de lengua portuguesa en América.|Le Brésil fut une colonie portugaise pendant plus de trois siècles, ce qui en fait le seul pays lusophone des Amériques.|ブラジルは300年以上ポルトガルの植民地だったため、南北アメリカ大陸で唯一ポルトガル語を話す国になっている。",
  ),
  q(
    2,
    "Which long, narrow South American country hugs the Pacific coast for over 4,000 kilometres?|¿Qué país sudamericano, largo y angosto, bordea la costa del Pacífico a lo largo de más de 4.000 kilómetros?|Quel pays sud-américain long et étroit longe la côte pacifique sur plus de 4 000 kilomètres ?|太平洋岸に沿って4,000キロ以上も細長く延びる南米の国は?",
    ["Chile|Chile|Le Chili|チリ", "Ecuador|Ecuador|L'Équateur|エクアドル", "Uruguay|Uruguay|L'Uruguay|ウルグアイ"],
    0,
    "Chile averages only about 180 kilometres in width, making it one of the most elongated countries on Earth.|Chile mide en promedio solo unos 180 kilómetros de ancho, lo que lo convierte en uno de los países más alargados del planeta.|Le Chili ne mesure en moyenne qu'environ 180 kilomètres de large, ce qui en fait l'un des pays les plus allongés au monde.|チリの幅は平均してわずか180キロほどしかなく、地球上でもっとも細長い国の一つである。",
  ),
  q(
    2,
    "What is the name of the Inca citadel high in the Peruvian Andes that became known to the outside world in 1911?|¿Cómo se llama la ciudadela inca en lo alto de los Andes peruanos que se dio a conocer al mundo exterior en 1911?|Comment s'appelle la citadelle inca perchée dans les Andes péruviennes, révélée au monde extérieur en 1911 ?|1911年に外部の世界に知られるようになった、ペルーのアンデス高地にあるインカの城塞の名は?",
    ["Sacsayhuamán|Sacsayhuamán|Sacsayhuamán|サクサイワマン", "Machu Picchu|Machu Picchu|Machu Picchu|マチュピチュ", "Ollantaytambo|Ollantaytambo|Ollantaytambo|オリャンタイタンボ"],
    1,
    "American explorer Hiram Bingham was guided to the site by local farmers who already knew of it, and it was declared a UNESCO World Heritage Site in 1983.|El explorador estadounidense Hiram Bingham fue guiado hasta el sitio por agricultores locales que ya lo conocían, y fue declarado Patrimonio de la Humanidad por la UNESCO en 1983.|L'explorateur américain Hiram Bingham fut guidé jusqu'au site par des agriculteurs locaux qui le connaissaient déjà, et il fut classé au patrimoine mondial de l'UNESCO en 1983.|アメリカ人探検家ハイラム・ビンガムは、すでにこの場所を知っていた地元の農民の案内で辿り着いた。1983年にユネスコの世界遺産に登録された。",
  ),
  q(
    3,
    "Tango, the dance and music style recognised by UNESCO, developed in the working-class neighbourhoods around which river?|El tango, el estilo de baile y música reconocido por la UNESCO, se desarrolló en los barrios populares de las orillas de qué río?|Le tango, ce style de danse et de musique reconnu par l'UNESCO, s'est développé dans les quartiers populaires autour de quel fleuve ?|ユネスコに認定された舞踊・音楽様式タンゴが生まれたのは、どの川の周辺の下町か?",
    ["The Amazon|El Amazonas|L'Amazone|アマゾン川", "The Orinoco|El Orinoco|L'Orénoque|オリノコ川", "The Río de la Plata|El Río de la Plata|Le Río de la Plata|ラプラタ川"],
    2,
    "Tango grew up in the port neighbourhoods of Buenos Aires and Montevideo, on opposite banks of the same wide river mouth, in the late 19th century.|El tango nació en los barrios portuarios de Buenos Aires y Montevideo, en orillas opuestas de la misma amplia desembocadura, a finales del siglo XIX.|Le tango est né dans les quartiers portuaires de Buenos Aires et de Montevideo, sur les rives opposées de la même large embouchure, à la fin du XIXe siècle.|タンゴは19世紀末、同じ広い河口を挟んだ対岸の港町、ブエノスアイレスとモンテビデオの下町で育った。",
  ),
  q(
    2,
    "Which South American country is the world's largest exporter of coffee?|¿Qué país sudamericano es el mayor exportador de café del mundo?|Quel pays sud-américain est le plus grand exportateur de café au monde ?|世界最大のコーヒー輸出国である南米の国は?",
    ["Colombia|Colombia|La Colombie|コロンビア", "Peru|Perú|Le Pérou|ペルー", "Chile|Chile|Le Chili|チリ"],
    0,
    "Colombia's mountainous terrain and equatorial climate give it two harvest seasons a year in many growing regions, unlike most coffee-producing countries.|El relieve montañoso y el clima ecuatorial de Colombia le dan dos cosechas al año en muchas regiones cafeteras, a diferencia de la mayoría de los países productores.|Le relief montagneux et le climat équatorial de la Colombie lui offrent deux récoltes par an dans de nombreuses régions productrices, contrairement à la plupart des pays producteurs de café.|コロンビアの山がちな地形と赤道直下の気候は、多くの産地で年に二度の収穫をもたらす。多くのコーヒー生産国とは異なる特徴である。",
  ),
  q(
    3,
    "The world's tallest waterfall, Angel Falls, is found in which country?|¿En qué país se encuentra el Salto Ángel, la catarata más alta del mundo?|Dans quel pays se trouve le Salto Angel, la plus haute chute d'eau du monde ?|世界一の落差を誇る滝、エンジェル・フォールがあるのはどの国か?",
    ["Brazil|Brasil|Le Brésil|ブラジル", "Venezuela|Venezuela|Le Venezuela|ベネズエラ", "Guyana|Guyana|Le Guyana|ガイアナ"],
    1,
    "The falls drop 979 metres from the flat top of a tepui, a table-top mountain, in Venezuela's Canaima National Park.|La catarata cae 979 metros desde la cima plana de un tepuy, una montaña de mesa, en el Parque Nacional Canaima de Venezuela.|La chute tombe de 979 mètres depuis le sommet plat d'un tepui, une montagne-table, dans le parc national de Canaima au Venezuela.|この滝はベネズエラのカナイマ国立公園にある、頂が平らなテプイ(卓状台地)から979メートル落下する。",
  ),
  q(
    3,
    "The Atacama, one of the driest places on Earth, lies mostly within which country?|El Atacama, uno de los lugares más secos del planeta, se extiende sobre todo por qué país?|L'Atacama, l'un des endroits les plus secs de la planète, s'étend surtout sur quel pays ?|地球上でも屈指の乾燥地帯アタカマ砂漠の大半が広がるのはどの国か?",
    ["Peru|Perú|Le Pérou|ペルー", "Bolivia|Bolivia|La Bolivie|ボリビア", "Chile|Chile|Le Chili|チリ"],
    2,
    "Parts of the Atacama have gone decades without recorded rainfall, and NASA has used it to test equipment meant for Mars.|Algunas zonas del Atacama han pasado décadas sin lluvia registrada, y la NASA lo ha usado para probar equipos destinados a Marte.|Certaines zones de l'Atacama sont restées des décennies sans pluie enregistrée, et la NASA s'en est servie pour tester du matériel destiné à Mars.|アタカマ砂漠の一部は何十年も降水の記録が無いこともあり、NASAは火星探査用の機材の試験にこの地を利用してきた。",
  ),
  q(
    4,
    "Which is the smallest sovereign country in South America by land area?|¿Cuál es el país soberano más pequeño de Sudamérica por superficie?|Quel est le plus petit pays souverain d'Amérique du Sud par sa superficie ?|面積でみて南米最小の主権国家はどこか?",
    ["Suriname|Surinam|Le Suriname|スリナム", "Uruguay|Uruguay|L'Uruguay|ウルグアイ", "Guyana|Guyana|Le Guyana|ガイアナ"],
    0,
    "Suriname, a former Dutch colony, covers about 164,000 square kilometres, smaller than Uruguay or Guyana.|Surinam, antigua colonia neerlandesa, cubre unos 164.000 kilómetros cuadrados, menos que Uruguay o Guyana.|Le Suriname, ancienne colonie néerlandaise, couvre environ 164 000 kilomètres carrés, moins que l'Uruguay ou le Guyana.|旧オランダ植民地のスリナムは面積およそ16万4千平方キロで、ウルグアイやガイアナより小さい。",
  ),
  q(
    3,
    "The gaucho, a skilled horseman and cattle-herder, is most closely associated with which grassland region?|El gaucho, jinete y arriero experto, está más asociado con qué región de pastizales?|Le gaucho, cavalier et gardien de bétail expérimenté, est surtout associé à quelle région de prairies ?|馬術に長けた牧童ガウチョと最も結びつきの深い草原地帯は?",
    ["The Amazon|La Amazonía|L'Amazonie|アマゾン", "The Pampas|La Pampa|La Pampa|パンパ", "The Andes|Los Andes|Les Andes|アンデス"],
    1,
    "The Pampas, the flat grassland covering much of central Argentina and Uruguay, has been cattle country since Spanish settlers first brought livestock in the 1500s.|La Pampa, la llanura herbácea que cubre buena parte del centro de Argentina y Uruguay, es tierra ganadera desde que los colonos españoles llevaron el ganado en el siglo XVI.|La Pampa, la plaine herbeuse couvrant une grande partie du centre de l'Argentine et de l'Uruguay, est un pays d'élevage depuis que les colons espagnols y ont amené le bétail au XVIe siècle.|アルゼンチン中部からウルグアイにかけて広がる平坦な草原パンパは、16世紀にスペイン人入植者が家畜を持ち込んで以来、牧畜の土地であり続けている。",
  ),
  q(
    3,
    "Which country was named directly after independence leader Simón Bolívar?|¿Qué país recibió su nombre directamente del líder independentista Simón Bolívar?|Quel pays doit directement son nom au chef indépendantiste Simón Bolívar ?|独立指導者シモン・ボリバルにちなんでそのまま国名がつけられた国は?",
    ["Colombia|Colombia|La Colombie|コロンビア", "Venezuela|Venezuela|Le Venezuela|ベネズエラ", "Bolivia|Bolivia|La Bolivie|ボリビア"],
    2,
    "Bolivia adopted the name in 1825 shortly after declaring independence, in honour of the general who helped liberate much of the continent from Spanish rule.|Bolivia adoptó el nombre en 1825, poco después de declarar la independencia, en honor al general que ayudó a liberar buena parte del continente del dominio español.|La Bolivie adopta ce nom en 1825, peu après avoir déclaré son indépendance, en l'honneur du général qui contribua à libérer une grande partie du continent de la domination espagnole.|ボリビアは1825年、独立宣言の直後にこの国名を採用した。大陸の多くをスペインの支配から解放する助けとなった将軍にちなんでいる。",
  ),
  q(
    4,
    "Besides Spanish, which language is a co-official national language of Paraguay, spoken by most of the population?|Además del español, qué lengua es cooficial en Paraguay y la habla la mayoría de la población?|Outre l'espagnol, quelle langue est coofficielle au Paraguay et parlée par la majorité de la population ?|パラグアイでスペイン語と並ぶ公用語で、人口の大半が話す言語は?",
    ["Guaraní|Guaraní|Le guarani|グアラニー語", "Quechua|Quechua|Le quechua|ケチュア語", "Aymara|Aimara|L'aymara|アイマラ語"],
    0,
    "Paraguay is unusual in Latin America for having an Indigenous language spoken by a majority of the population, including many with no Guaraní ancestry.|Paraguay es un caso poco común en Latinoamérica por tener una lengua indígena hablada por la mayoría de la población, incluidos muchos sin ascendencia guaraní.|Le Paraguay est un cas rare en Amérique latine, avec une langue autochtone parlée par la majorité de la population, y compris de nombreuses personnes sans ascendance guarani.|パラグアイはラテンアメリカでは珍しく、グアラニーの血筋を持たない人も含め、人口の大半が先住民の言語を話す国である。",
  ),
  q(
    3,
    "Which South American country has won the most FIFA World Cup titles?|¿Qué país sudamericano ha ganado más títulos de la Copa Mundial de la FIFA?|Quel pays sud-américain a remporté le plus de titres de Coupe du monde de la FIFA ?|FIFAワールドカップの優勝回数が最も多い南米の国は?",
    ["Argentina|Argentina|L'Argentine|アルゼンチン", "Brazil|Brasil|Le Brésil|ブラジル", "Uruguay|Uruguay|L'Uruguay|ウルグアイ"],
    1,
    "Brazil has won five titles, ahead of Argentina's three and Uruguay's two, and is the only country to have played in every World Cup tournament.|Brasil ha ganado cinco títulos, por delante de los tres de Argentina y los dos de Uruguay, y es el único país que ha jugado todos los mundiales.|Le Brésil a remporté cinq titres, devant les trois de l'Argentine et les deux de l'Uruguay, et c'est le seul pays à avoir disputé toutes les Coupes du monde.|ブラジルは5回優勝しており、アルゼンチンの3回、ウルグアイの2回を上回る。歴代すべてのワールドカップに出場した唯一の国でもある。",
  ),
  q(
    4,
    "Quechua, the language of the Inca Empire, remains an official language today in which country?|El quechua, la lengua del Imperio inca, sigue siendo lengua oficial hoy en qué país?|Le quechua, la langue de l'Empire inca, reste aujourd'hui langue officielle dans quel pays ?|インカ帝国の言語ケチュア語が、いまも公用語であり続けている国は?",
    ["Chile|Chile|Le Chili|チリ", "Venezuela|Venezuela|Le Venezuela|ベネズエラ", "Peru|Perú|Le Pérou|ペルー"],
    2,
    "Peru's constitution recognises Quechua as an official language alongside Spanish, and it is also spoken by millions across Bolivia, Ecuador and neighbouring countries.|La constitución de Perú reconoce el quechua como lengua oficial junto al español, y también lo hablan millones de personas en Bolivia, Ecuador y países vecinos.|La constitution du Pérou reconnaît le quechua comme langue officielle aux côtés de l'espagnol, et il est aussi parlé par des millions de personnes en Bolivie, en Équateur et dans les pays voisins.|ペルーの憲法はケチュア語をスペイン語と並ぶ公用語と定めており、ボリビアやエクアドルなど近隣諸国でも何百万人もが話している。",
  ),
  q(
    5,
    "Which South American country officially adopted the US dollar as its currency in 2000?|¿Qué país sudamericano adoptó oficialmente el dólar estadounidense como moneda en el año 2000?|Quel pays sud-américain a officiellement adopté le dollar américain comme monnaie en 2000 ?|2000年に自国通貨を廃止して米ドルを公式通貨とした南米の国は?",
    ["Ecuador|Ecuador|L'Équateur|エクアドル", "Colombia|Colombia|La Colombie|コロンビア", "Peru|Perú|Le Pérou|ペルー"],
    0,
    "Ecuador dollarised after a banking crisis and hyperinflation wiped out much of the value of its former currency, the sucre.|Ecuador se dolarizó tras una crisis bancaria y una hiperinflación que borró buena parte del valor de su antigua moneda, el sucre.|L'Équateur s'est dollarisé après une crise bancaire et une hyperinflation qui a effacé une grande part de la valeur de son ancienne monnaie, le sucre.|エクアドルは、銀行危機とハイパーインフレでかつての自国通貨スクレの価値の多くが失われたのち、ドル化に踏み切った。",
  ),
  q(
    5,
    "Bolivia has two capital cities. Which one is the seat of the executive government, while Sucre remains the constitutional capital?|Bolivia tiene dos capitales. ¿Cuál es la sede del gobierno ejecutivo, mientras Sucre sigue siendo la capital constitucional?|La Bolivie a deux capitales. Laquelle abrite le siège du gouvernement exécutif, tandis que Sucre reste la capitale constitutionnelle ?|ボリビアには二つの首都がある。スクレが憲法上の首都であるのに対し、行政府が置かれているのはどこか?",
    ["Sucre|Sucre|Sucre|スクレ", "La Paz|La Paz|La Paz|ラパス", "Santa Cruz|Santa Cruz|Santa Cruz|サンタクルス"],
    1,
    "The arrangement dates to a 1899 civil war, after which the government moved to La Paz while the supreme court and the constitutional title stayed in Sucre.|El arreglo se remonta a una guerra civil de 1899, tras la cual el gobierno se trasladó a La Paz mientras la corte suprema y el título constitucional quedaron en Sucre.|Cet arrangement remonte à une guerre civile de 1899, après laquelle le gouvernement s'installa à La Paz tandis que la cour suprême et le titre constitutionnel restèrent à Sucre.|この体制は1899年の内戦にさかのぼる。この内戦のあと政府はラパスへ移り、最高裁判所と憲法上の首都の地位はスクレに残った。",
  ),
  q(
    4,
    "The world's largest salt flat, which turns into a giant mirror after rain, is found in which country?|El mayor salar del mundo, que se convierte en un espejo gigante tras la lluvia, se encuentra en qué país?|Le plus grand désert de sel du monde, qui se transforme en miroir géant après la pluie, se trouve dans quel pays ?|雨のあと巨大な鏡になる、世界最大の塩の平原があるのはどの国か?",
    ["Chile|Chile|Le Chili|チリ", "Argentina|Argentina|L'Argentine|アルゼンチン", "Bolivia|Bolivia|La Bolivie|ボリビア"],
    2,
    "The Salar de Uyuni covers more than 10,000 square kilometres of the Bolivian Altiplano and also holds a large share of the world's known lithium reserves.|El Salar de Uyuni cubre más de 10.000 kilómetros cuadrados del Altiplano boliviano y también alberga una gran parte de las reservas mundiales conocidas de litio.|Le Salar de Uyuni couvre plus de 10 000 kilomètres carrés de l'Altiplano bolivien et recèle aussi une large part des réserves mondiales connues de lithium.|ウユニ塩湖はボリビアのアルティプラーノに1万平方キロメートル以上広がり、世界の既知のリチウム埋蔵量のかなりの部分も抱えている。",
  ),
  q(
    5,
    "Which South American country is the world's largest exporter of copper?|¿Qué país sudamericano es el mayor exportador de cobre del mundo?|Quel pays sud-américain est le plus grand exportateur de cuivre au monde ?|世界最大の銅の輸出国である南米の国は?",
    ["Chile|Chile|Le Chili|チリ", "Peru|Perú|Le Pérou|ペルー", "Brazil|Brasil|Le Brésil|ブラジル"],
    0,
    "Chile alone produces roughly a quarter of the world's mined copper, much of it from vast open-pit mines high in the Andes.|Chile produce por sí solo alrededor de una cuarta parte del cobre extraído en el mundo, gran parte de vastas minas a cielo abierto en los Andes.|Le Chili produit à lui seul environ un quart du cuivre extrait dans le monde, en grande partie dans de vastes mines à ciel ouvert perchées dans les Andes.|チリ一国だけで、世界で採掘される銅のおよそ4分の1を産出しており、その多くはアンデス高地の広大な露天掘り鉱山から採れる。",
  ),
  q(
    2,
    "The giant Art Deco statue of Christ overlooking Rio de Janeiro stands atop which mountain?|La gigantesca estatua Art Déco de Cristo que domina Río de Janeiro se alza sobre qué monte?|La gigantesque statue Art déco du Christ qui domine Rio de Janeiro se dresse au sommet de quelle montagne ?|リオデジャネイロを見下ろすアール・デコ様式の巨大なキリスト像が立つ山は?",
    ["Sugarloaf Mountain|Pan de Azúcar|Le Pain de Sucre|シュガーローフ山", "Corcovado|Corcovado|Le Corcovado|コルコバードの丘", "Tijuca Peak|Pico da Tijuca|Le pic de Tijuca|チジュカ山"],
    1,
    "Christ the Redeemer was completed in 1931 and stands about 38 metres tall including its pedestal, one of the New Seven Wonders of the World.|El Cristo Redentor se terminó en 1931 y mide unos 38 metros con su pedestal, una de las Nuevas Siete Maravillas del Mundo.|Le Christ Rédempteur fut achevé en 1931 et mesure environ 38 mètres avec son piédestal, l'une des nouvelles sept merveilles du monde.|コルコバードのキリスト像は1931年に完成し、台座を含め高さおよそ38メートルで、新・世界七不思議の一つに数えられる。",
  ),
  q(
    4,
    "The Galápagos Islands, which inspired Charles Darwin's theory of evolution, belong to which country?|Las Islas Galápagos, que inspiraron la teoría de la evolución de Charles Darwin, pertenecen a qué país?|Les îles Galápagos, qui inspirèrent la théorie de l'évolution de Charles Darwin, appartiennent à quel pays ?|チャールズ・ダーウィンの進化論のきっかけとなったガラパゴス諸島が属する国は?",
    ["Chile|Chile|Le Chili|チリ", "Peru|Perú|Le Pérou|ペルー", "Ecuador|Ecuador|L'Équateur|エクアドル"],
    2,
    "Darwin visited the islands in 1835 aboard HMS Beagle, and Ecuador later made most of the archipelago a national park and, in 1978, a UNESCO World Heritage Site.|Darwin visitó las islas en 1835 a bordo del HMS Beagle, y Ecuador convirtió después la mayor parte del archipiélago en parque nacional y, en 1978, en Patrimonio de la Humanidad.|Darwin visita les îles en 1835 à bord du HMS Beagle, et l'Équateur fit ensuite de la majeure partie de l'archipel un parc national puis, en 1978, un site du patrimoine mondial de l'UNESCO.|ダーウィンは1835年、ビーグル号でこの島々を訪れた。エクアドルはのちに諸島の大半を国立公園とし、1978年にはユネスコの世界遺産にも登録した。",
  ),
  q(
    5,
    "Paraguay's currency shares its name with the country's other official language. What is it called?|La moneda de Paraguay comparte nombre con la otra lengua oficial del país. ¿Cómo se llama?|La monnaie du Paraguay porte le même nom que l'autre langue officielle du pays. Comment s'appelle-t-elle ?|パラグアイの通貨は、もう一つの公用語と同じ名を持つ。その名は?",
    ["The Paraguayan Sol|El sol paraguayo|Le sol paraguayen|パラグアイ・ソル", "The Paraguayan Peso|El peso paraguayo|Le peso paraguayen|パラグアイ・ペソ", "The Guaraní|El guaraní|Le guarani|グアラニー"],
    2,
    "Paraguay's currency, the guaraní, takes its name from the same Indigenous people and language that give the country its second official tongue.|La moneda paraguaya, el guaraní, toma su nombre del mismo pueblo y lengua indígenas que dan al país su segundo idioma oficial.|La monnaie paraguayenne, le guarani, tire son nom du même peuple et de la même langue autochtones qui donnent au pays sa seconde langue officielle.|パラグアイの通貨グアラニーは、この国のもう一つの公用語である先住民の言語・民族と同じ名を持つ。",
  ),
  q(
    4,
    "The Nazca Lines, ancient geoglyphs only fully visible from the air, are found in which country?|Las Líneas de Nazca, antiguos geoglifos solo visibles por completo desde el aire, se encuentran en qué país?|Les lignes de Nazca, d'anciens géoglyphes pleinement visibles seulement depuis les airs, se trouvent dans quel pays ?|上空からしか全体を見渡せない古代の地上絵、ナスカの地上絵があるのはどの国か?",
    ["Chile|Chile|Le Chili|チリ", "Peru|Perú|Le Pérou|ペルー", "Bolivia|Bolivia|La Bolivie|ボリビア"],
    1,
    "The lines, etched into the desert floor between roughly 500 BCE and 500 CE, depict animals, plants and geometric shapes up to hundreds of metres across.|Las líneas, trazadas en el suelo desértico aproximadamente entre el 500 a.C. y el 500 d.C., representan animales, plantas y formas geométricas de hasta cientos de metros de ancho.|Ces lignes, tracées dans le sol désertique entre environ 500 av. J.-C. et 500 apr. J.-C., représentent des animaux, des plantes et des formes géométriques atteignant plusieurs centaines de mètres de large.|紀元前500年頃から紀元後500年頃にかけて砂漠の地面に刻まれたこの地上絵は、幅数百メートルにも及ぶ動物や植物、幾何学模様を描いている。",
  ),
  q(
    5,
    "South America's tallest mountain, and the tallest outside Asia, is located in which country?|La montaña más alta de Sudamérica, y la más alta fuera de Asia, se encuentra en qué país?|La plus haute montagne d'Amérique du Sud, et la plus haute hors d'Asie, se trouve dans quel pays ?|南米最高峰であり、アジア以外では世界最高峰の山があるのはどの国か?",
    ["Chile|Chile|Le Chili|チリ", "Ecuador|Ecuador|L'Équateur|エクアドル", "Argentina|Argentina|L'Argentine|アルゼンチン"],
    2,
    "Aconcagua rises to 6,961 metres in the Argentine Andes, close to the Chilean border, and is one of the Seven Summits climbers aim to complete.|El Aconcagua se eleva a 6.961 metros en los Andes argentinos, cerca de la frontera chilena, y es una de las Siete Cumbres que buscan completar los alpinistas.|L'Aconcagua culmine à 6 961 mètres dans les Andes argentines, près de la frontière chilienne, et fait partie des Sept Sommets que les alpinistes cherchent à gravir.|アコンカグアはチリ国境に近いアルゼンチンのアンデスにそびえ、標高6,961メートル。登山家が踏破を目指す「セブンサミッツ」の一つである。",
  ),
  q(
    7,
    "Because of the Earth's equatorial bulge, the point on the planet's surface farthest from its centre is a volcano's summit in which country?|Por el abultamiento ecuatorial de la Tierra, el punto de la superficie terrestre más alejado de su centro es la cumbre de un volcán en qué país?|En raison du renflement équatorial de la Terre, le point de la surface terrestre le plus éloigné de son centre est le sommet d'un volcan situé dans quel pays ?|地球の赤道方向のふくらみのため、地球の中心から最も遠い地表の地点は、どの国にある火山の頂上か?",
    ["Ecuador|Ecuador|L'Équateur|エクアドル", "Argentina|Argentina|L'Argentine|アルゼンチン", "Peru|Perú|Le Pérou|ペルー"],
    0,
    "Mount Chimborazo is not Earth's tallest peak measured from sea level, but its summit sits farther from the planet's centre than Everest's because it is so close to the equatorial bulge.|El Chimborazo no es el pico más alto medido desde el nivel del mar, pero su cumbre está más lejos del centro del planeta que la del Everest por estar tan cerca del abultamiento ecuatorial.|Le Chimborazo n'est pas le plus haut sommet mesuré depuis le niveau de la mer, mais son sommet se trouve plus loin du centre de la planète que celui de l'Everest, du fait de sa proximité avec le renflement équatorial.|チンボラソ山は海抜で測れば世界最高峰ではないが、赤道のふくらみのすぐ近くにあるため、その頂上はエベレストの頂上より地球の中心から遠い。",
  ),
  q(
    6,
    "The coordinated campaign of political repression across several South American military dictatorships in the 1970s–80s is generally known by what name?|La campaña coordinada de represión política entre varias dictaduras militares sudamericanas en los años 70 y 80 se conoce generalmente con qué nombre?|La campagne coordonnée de répression politique menée par plusieurs dictatures militaires sud-américaines dans les années 1970-1980 est généralement connue sous quel nom ?|1970〜80年代、複数の南米軍事政権にまたがって行われた協調的な政治弾圧の作戦は、一般に何と呼ばれるか?",
    ["Operation Andes|Operación Andes|Opération Andes|オペレーション・アンデス", "Operation Condor|Operación Cóndor|Opération Condor|オペレーション・コンドル", "Operation South|Operación Sur|Opération Sud|オペレーション・スール"],
    1,
    "Operation Condor involved intelligence-sharing and cross-border action among several military governments, and its full extent only became widely documented decades later.|La Operación Cóndor implicó el intercambio de inteligencia y acciones transfronterizas entre varios gobiernos militares, y su alcance total solo se documentó ampliamente décadas después.|L'opération Condor impliqua un partage de renseignements et des actions transfrontalières entre plusieurs gouvernements militaires, et son ampleur réelle ne fut largement documentée que des décennies plus tard.|オペレーション・コンドルは複数の軍事政権のあいだでの情報共有と国境を越えた作戦行動を伴い、その全容が広く記録として明らかになったのは何十年もあとのことだった。",
  ),
  q(
    3,
    "Ecuador takes its name from which geographic feature that passes almost directly through its capital, Quito?|Ecuador toma su nombre de qué accidente geográfico que pasa casi directamente por su capital, Quito?|L'Équateur tire son nom de quel élément géographique qui passe presque directement par sa capitale, Quito ?|エクアドルの国名の由来となり、首都キトのほぼ真上を通る地理的な線は?",
    ["The Tropic of Capricorn|El Trópico de Capricornio|Le tropique du Capricorne|南回帰線", "The Prime Meridian|El meridiano de Greenwich|Le méridien de Greenwich|本初子午線", "The Equator|El ecuador|L'équateur|赤道"],
    2,
    "\"Ecuador\" is simply Spanish for \"equator,\" and a monument just outside Quito marks the line, though GPS surveys later found the true equator runs a short distance away.|«Ecuador» significa simplemente eso en español, y un monumento a las afueras de Quito marca la línea, aunque relevamientos GPS hallaron después que el ecuador real pasa un poco más allá.|« Ecuador » signifie simplement « équateur » en espagnol, et un monument juste à la sortie de Quito marque la ligne, bien que des relevés GPS aient plus tard montré que l'équateur réel passe un peu plus loin.|「エクアドル」はスペイン語で単に「赤道」を意味し、キト郊外にはその線を示す記念碑がある。もっとも、のちのGPS測量で、実際の赤道はそこから少し離れた場所を通ることが分かった。",
  ),
  q(
    7,
    "The Treaty of Tordesillas (1494) divided future claims to South America between Spain and which other country?|El Tratado de Tordesillas (1494) repartió los futuros reclamos sobre Sudamérica entre España y qué otro país?|Le traité de Tordesillas (1494) répartit les futures revendications sur l'Amérique du Sud entre l'Espagne et quel autre pays ?|トルデシリャス条約(1494年)は、南米に対する将来の領有権をスペインとどの国のあいだで分けたか?",
    ["Portugal|Portugal|Le Portugal|ポルトガル", "France|Francia|La France|フランス", "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ"],
    0,
    "The treaty drew a line roughly 370 leagues west of Cape Verde, granting Portugal the lands to its east — which is why Brazil, jutting eastward, ended up Portuguese rather than Spanish.|El tratado trazó una línea a unas 370 leguas al oeste de Cabo Verde, concediendo a Portugal las tierras al este de esa línea, razón por la que Brasil, que sobresale hacia el este, acabó siendo portugués y no español.|Le traité traça une ligne à environ 370 lieues à l'ouest du Cap-Vert, accordant au Portugal les terres à l'est de celle-ci — c'est pourquoi le Brésil, qui s'avance vers l'est, finit par être portugais plutôt qu'espagnol.|この条約はカーボベルデ諸島の西およそ370レグアに線を引き、その東側の土地をポルトガルに与えた。東へ張り出したブラジルがスペインではなくポルトガル領になったのはこのためである。",
  ),
  q(
    6,
    "Paraguay's War of the Triple Alliance (1864–1870) was fought against Argentina, Brazil, and which other country?|La Guerra de la Triple Alianza de Paraguay (1864-1870) se libró contra Argentina, Brasil y qué otro país?|La guerre de la Triple-Alliance du Paraguay (1864-1870) fut menée contre l'Argentine, le Brésil et quel autre pays ?|パラグアイの三国同盟戦争(1864〜1870年)は、アルゼンチン・ブラジルとどの国を相手に戦われたか?",
    ["Bolivia|Bolivia|La Bolivie|ボリビア", "Chile|Chile|Le Chili|チリ", "Uruguay|Uruguay|L'Uruguay|ウルグアイ"],
    2,
    "The war devastated Paraguay, which by most estimates lost a large majority of its adult male population.|La guerra devastó Paraguay, que según la mayoría de las estimaciones perdió a gran parte de su población masculina adulta.|La guerre dévasta le Paraguay, qui perdit, selon la plupart des estimations, une large majorité de sa population masculine adulte.|この戦争はパラグアイを荒廃させ、多くの推計によれば成人男性人口の大半を失わせた。",
  ),
  q(
    4,
    "What is the official name of Venezuela's national currency?|¿Cuál es el nombre oficial de la moneda nacional de Venezuela?|Quel est le nom officiel de la monnaie nationale du Venezuela ?|ベネズエラの自国通貨の正式名称は?",
    ["The Bolívar|El bolívar|Le bolívar|ボリバル", "The Sol|El sol|Le sol|ソル", "The Peso|El peso|Le peso|ペソ"],
    0,
    "Named for Simón Bolívar, Venezuela's currency has been redenominated more than once as the country worked through periods of severe inflation.|Bautizada en honor a Simón Bolívar, la moneda venezolana se ha redenominado más de una vez a medida que el país atravesaba periodos de fuerte inflación.|Baptisée en l'honneur de Simón Bolívar, la monnaie vénézuélienne a été redénommée plus d'une fois à mesure que le pays traversait des périodes de forte inflation.|シモン・ボリバルにちなんで名付けられたベネズエラの通貨は、深刻なインフレの時期を経るたびに、一度ならず呼称と単位を改められてきた。",
  ),
  q(
    7,
    "The Yanomami, one of the largest relatively isolated Indigenous groups in South America, live in the Amazon rainforest spanning Brazil and which other country?|Los yanomami, uno de los pueblos indígenas relativamente aislados más numerosos de Sudamérica, viven en la selva amazónica entre Brasil y qué otro país?|Les Yanomami, l'un des plus grands groupes autochtones relativement isolés d'Amérique du Sud, vivent dans la forêt amazonienne à cheval sur le Brésil et quel autre pays ?|南米でも屈指の規模を持つ比較的孤立した先住民族ヤノマミが暮らすのは、ブラジルとどの国にまたがるアマゾンの熱帯雨林か?",
    ["Colombia|Colombia|La Colombie|コロンビア", "Venezuela|Venezuela|Le Venezuela|ベネズエラ", "Guyana|Guyana|Le Guyana|ガイアナ"],
    1,
    "An estimated 35,000 or more Yanomami live across the border region between Brazil and Venezuela, one of the largest forest-dwelling Indigenous populations still relatively isolated from outside society.|Se calcula que 35.000 o más yanomami viven en la región fronteriza entre Brasil y Venezuela, una de las mayores poblaciones indígenas de la selva aún relativamente aisladas de la sociedad exterior.|On estime à 35 000 ou plus le nombre de Yanomami vivant dans la région frontalière entre le Brésil et le Venezuela, l'une des plus grandes populations autochtones forestières encore relativement isolées de la société extérieure.|推定3万5千人を超えるヤノマミの人々が、ブラジルとベネズエラの国境地帯にまたがって暮らしている。外部社会からいまも比較的孤立した、森に暮らす先住民としては最大級の集団の一つである。",
  ),
  q(
    6,
    "Suriname, on the Atlantic coast, was a colony of which European country before its 1975 independence?|Surinam, en la costa atlántica, fue colonia de qué país europeo antes de su independencia en 1975?|Le Suriname, sur la côte atlantique, fut une colonie de quel pays européen avant son indépendance en 1975 ?|大西洋岸のスリナムは、1975年の独立以前、どのヨーロッパの国の植民地だったか?",
    ["Britain|Gran Bretaña|La Grande-Bretagne|イギリス", "France|Francia|La France|フランス", "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ"],
    2,
    "The Dutch traded Suriname to the British in 1667 in exchange for New Amsterdam, the settlement that later became New York, and kept it as a colony until 1975.|Los neerlandeses cambiaron Surinam a los británicos en 1667 a cambio de Nueva Ámsterdam, el asentamiento que luego sería Nueva York, y la conservaron como colonia hasta 1975.|Les Hollandais échangèrent le Suriname contre New Amsterdam en 1667 avec les Britanniques, cet établissement devenu plus tard New York, et le gardèrent comme colonie jusqu'en 1975.|オランダは1667年、のちのニューヨークとなる入植地ニューアムステルダムと引き換えにスリナムをイギリスから得て、1975年までこれを植民地として保持した。",
  ),
  q(
    5,
    "Which is the only South American country with English as an official language?|¿Cuál es el único país sudamericano con el inglés como lengua oficial?|Quel est le seul pays sud-américain ayant l'anglais pour langue officielle ?|英語を公用語とする唯一の南米の国は?",
    ["Guyana|Guyana|Le Guyana|ガイアナ", "Suriname|Surinam|Le Suriname|スリナム", "French Guiana|Guayana Francesa|La Guyane|フランス領ギアナ"],
    0,
    "Guyana was a British colony until 1966, while Suriname's official language is Dutch and French Guiana, an overseas department of France, is not an independent country.|Guyana fue colonia británica hasta 1966, mientras que la lengua oficial de Surinam es el neerlandés, y la Guayana Francesa, departamento de ultramar de Francia, no es un país independiente.|Le Guyana fut une colonie britannique jusqu'en 1966, tandis que la langue officielle du Suriname est le néerlandais et que la Guyane, département français d'outre-mer, n'est pas un pays indépendant.|ガイアナは1966年までイギリスの植民地だった。一方スリナムの公用語はオランダ語で、フランス領ギアナはフランスの海外県であり独立国ではない。",
  ),
  q(
    7,
    "Bolivia's Chaco War (1932–1935), fought over a region mistakenly believed to hold oil, was against which country?|La Guerra del Chaco de Bolivia (1932-1935), librada por una región que se creía erróneamente rica en petróleo, fue contra qué país?|La guerre du Chaco menée par la Bolivie (1932-1935), pour une région que l'on croyait à tort riche en pétrole, opposa la Bolivie à quel pays ?|石油が眠ると誤って信じられた地域をめぐって戦われたボリビアのチャコ戦争(1932〜1935年)の相手国は?",
    ["Argentina|Argentina|L'Argentine|アルゼンチン", "Paraguay|Paraguay|Le Paraguay|パラグアイ", "Brazil|Brasil|Le Brésil|ブラジル"],
    1,
    "The war, one of the bloodiest in 20th-century South America, ended with Paraguay controlling most of the disputed Gran Chaco region.|La guerra, una de las más sangrientas de la Sudamérica del siglo XX, terminó con Paraguay controlando la mayor parte del disputado Gran Chaco.|Cette guerre, l'une des plus sanglantes de l'Amérique du Sud du XXe siècle, s'acheva avec le Paraguay contrôlant l'essentiel du Gran Chaco disputé.|20世紀の南米でも屈指の犠牲を出したこの戦争は、係争地だったグランチャコの大半をパラグアイが手にする形で終わった。",
  ),
  q(
    6,
    "Which South American country has coastlines on both the Caribbean Sea and the Pacific Ocean?|¿Qué país sudamericano tiene costas tanto en el mar Caribe como en el océano Pacífico?|Quel pays sud-américain possède des côtes à la fois sur la mer des Caraïbes et sur l'océan Pacifique ?|カリブ海と太平洋の両方に海岸線を持つ南米の国は?",
    ["Venezuela|Venezuela|Le Venezuela|ベネズエラ", "Peru|Perú|Le Pérou|ペルー", "Colombia|Colombia|La Colombie|コロンビア"],
    2,
    "Colombia is unusual among South American countries in touching two different oceans, giving it major ports on both its northern and western coasts.|Colombia es un caso poco frecuente entre los países sudamericanos por tocar dos océanos distintos, lo que le da grandes puertos en su costa norte y en la occidental.|La Colombie est un cas rare parmi les pays sud-américains à toucher deux océans différents, ce qui lui donne de grands ports sur sa côte nord comme sur sa côte ouest.|コロンビアは南米の国としては珍しく二つの異なる海に面しており、北の海岸と西の海岸の両方に主要な港を持つ。",
  ),
  q(
    8,
    "The ceremonial site of Tiwanaku, near Lake Titicaca, was built by a civilisation that predated the Inca Empire by centuries. What was that civilisation called?|El sitio ceremonial de Tiwanaku, cerca del lago Titicaca, lo construyó una civilización anterior en siglos al Imperio inca. ¿Cómo se llamaba esa civilización?|Le site cérémoniel de Tiwanaku, près du lac Titicaca, fut bâti par une civilisation antérieure de plusieurs siècles à l'Empire inca. Comment s'appelait cette civilisation ?|チチカカ湖近くの祭祀遺跡ティワナクを築いたのは、インカ帝国より何世紀も前の文明である。その文明の名は?",
    ["The Tiwanaku civilisation|La civilización de Tiwanaku|La civilisation de Tiwanaku|ティワナク文明", "The Wari|Los huari|Les Wari|ワリ文明", "The Moche|Los moche|Les Moches|モチェ文明"],
    0,
    "Tiwanaku flourished from roughly 300 to 1000 CE and is thought to have influenced Inca architecture and religion long after the city itself declined.|Tiwanaku floreció aproximadamente entre los años 300 y 1000 d.C., y se cree que influyó en la arquitectura y religión inca mucho después de que la propia ciudad decayera.|Tiwanaku prospéra environ de l'an 300 à l'an 1000 apr. J.-C., et l'on pense qu'elle influença l'architecture et la religion incas longtemps après le déclin de la cité elle-même.|ティワナクはおよそ紀元300年から1000年にかけて栄え、その都市自体が衰退したのちも、長くインカの建築や宗教に影響を与えたと考えられている。",
  ),
  q(
    8,
    "The Moche civilisation, known for elaborate pottery and the pyramid complexes called Huaca del Sol and Huaca de la Luna, flourished in which present-day country?|La civilización moche, conocida por su cerámica elaborada y los complejos piramidales Huaca del Sol y Huaca de la Luna, floreció en qué país actual?|La civilisation Moche, connue pour sa poterie élaborée et les complexes pyramidaux Huaca del Sol et Huaca de la Luna, prospéra dans quel pays actuel ?|精巧な土器と、太陽のワカ・月のワカと呼ばれるピラミッド群で知られるモチェ文明が栄えたのは、現在のどの国か?",
    ["Ecuador|Ecuador|L'Équateur|エクアドル", "Peru|Perú|Le Pérou|ペルー", "Colombia|Colombia|La Colombie|コロンビア"],
    1,
    "The Moche flourished on Peru's northern coast from roughly 100 to 700 CE, well before the Inca Empire existed.|Los moche florecieron en la costa norte de Perú aproximadamente entre los años 100 y 700 d.C., mucho antes de que existiera el Imperio inca.|Les Moches prospérèrent sur la côte nord du Pérou d'environ l'an 100 à l'an 700 apr. J.-C., bien avant l'existence de l'Empire inca.|モチェ文明はインカ帝国が存在するよりずっと前、およそ紀元100年から700年にかけてペルー北部の海岸で栄えた。",
  ),
  q(
    5,
    "Along with beef, which export product has historically been central to Uruguay's economy?|Junto con la carne vacuna, ¿qué producto de exportación ha sido históricamente clave en la economía de Uruguay?|Avec le bœuf, quel produit d'exportation a historiquement été central pour l'économie de l'Uruguay ?|牛肉とともに、ウルグアイ経済を長らく支えてきた輸出品は?",
    ["Coffee|Café|Le café|コーヒー", "Bananas|Plátanos|Les bananes|バナナ", "Wool|Lana|La laine|羊毛"],
    2,
    "Uruguay has one of the highest ratios of sheep to people in the world, and wool remains a major export alongside beef.|Uruguay tiene una de las proporciones de ovejas por habitante más altas del mundo, y la lana sigue siendo una exportación importante junto con la carne.|L'Uruguay affiche l'un des plus forts ratios de moutons par habitant au monde, et la laine reste une exportation majeure aux côtés du bœuf.|ウルグアイは世界でも屈指の一人当たり羊の頭数を誇り、羊毛はいまも牛肉と並ぶ主要な輸出品である。",
  ),
  q(
    4,
    "Which two South American countries are landlocked, with no coastline on any ocean?|¿Qué dos países sudamericanos no tienen salida al mar, sin costa en ningún océano?|Quels sont les deux pays sud-américains enclavés, sans littoral sur aucun océan ?|どの海にも面していない、内陸国である南米の二つの国は?",
    ["Bolivia and Paraguay|Bolivia y Paraguay|La Bolivie et le Paraguay|ボリビアとパラグアイ", "Peru and Ecuador|Perú y Ecuador|Le Pérou et l'Équateur|ペルーとエクアドル", "Uruguay and Chile|Uruguay y Chile|L'Uruguay et le Chili|ウルグアイとチリ"],
    0,
    "Bolivia lost its own Pacific coastline to Chile in the War of the Pacific (1879–1884), while Paraguay has been landlocked throughout its history.|Bolivia perdió su litoral pacífico ante Chile en la Guerra del Pacífico (1879-1884), mientras que Paraguay ha sido mediterráneo a lo largo de toda su historia.|La Bolivie perdit son littoral pacifique face au Chili lors de la guerre du Pacifique (1879-1884), tandis que le Paraguay est enclavé depuis toujours.|ボリビアは太平洋戦争(1879〜1884年)でチリに太平洋岸を奪われた。一方パラグアイは、その歴史を通じてずっと内陸国である。",
  ),

  // =========================================================================
  // 2026-08-14追加(62問)。難易度7以上を6問→68問、うち9〜10を0問→16問に
  // 厚くした。都市カード46件の主題(ヤバリ号・カシキアレ運河・カパック・
  // ニャン・ブエノスアイレスの移民ホテル・ボリビアの海の喪失の詳しい経緯・
  // タバチンガ/エンカルナシオンの国境の話など)とは重ならない主題を選び、
  // カードに載っている46都市名そのものは問い・答えのどちらにも使っていない。
  // 正解の位置(a)は既存39問(0:13/1:12/2:14)と合わせて0:34/1:33/2:34。
  // =========================================================================

  // --- 難易度1(+2) ---
  q(
    1,
    "Which ocean lies along South America's eastern coastline?|¿Qué océano bordea la costa este de Sudamérica?|Quel océan borde la côte est de l'Amérique du Sud ?|南アメリカの東の海岸に沿って広がる海は?",
    ["The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋", "The Indian Ocean|El océano Índico|L'océan Indien|インド洋"],
    1,
    "Brazil, Argentina and most of the continent's Atlantic-facing countries ship the bulk of their trade across this ocean toward Europe and Africa.|Brasil, Argentina y la mayoría de los países del continente que dan al Atlántico envían la mayor parte de su comercio a través de este océano hacia Europa y África.|Le Brésil, l'Argentine et la plupart des pays du continent tournés vers l'Atlantique expédient l'essentiel de leur commerce à travers cet océan vers l'Europe et l'Afrique.|ブラジルやアルゼンチンをはじめ大西洋に面した大陸の国々の多くは、貿易の大部分をこの海を通ってヨーロッパやアフリカへ送り出している。",
  ),
  q(
    1,
    "Which two oceans are considered to meet at South America's southern tip, near Cape Horn?|¿Qué dos océanos se considera que se encuentran en la punta sur de Sudamérica, cerca del cabo de Hornos?|Quels deux océans sont considérés se rejoindre à la pointe sud de l'Amérique du Sud, près du cap Horn ?|南米の南端、ホーン岬付近で出会うとされる二つの海は?",
    ["The Pacific and Indian Oceans|Los océanos Pacífico e Índico|Les océans Pacifique et Indien|太平洋とインド洋", "The Pacific and Atlantic Oceans|Los océanos Pacífico y Atlántico|Les océans Pacifique et Atlantique|太平洋と大西洋", "The Atlantic and Arctic Oceans|Los océanos Atlántico y Ártico|Les océans Atlantique et Arctique|大西洋と北極海"],
    1,
    "Exactly where the two oceans \"meet\" is more a matter of convention than a sharp physical line, but Cape Horn is commonly used as the marker between them.|El punto exacto donde los dos océanos «se encuentran» es más una convención que una línea física nítida, pero el cabo de Hornos se usa comúnmente como el marcador entre ellos.|L'endroit exact où les deux océans « se rencontrent » relève davantage d'une convention que d'une ligne physique nette, mais le cap Horn sert couramment de repère entre eux.|二つの海が「出会う」正確な地点は、はっきりした物理的な境界というよりも慣習によるものだが、ホーン岬はその目印として一般に使われている。",
  ),

  // --- 難易度2(+2) ---
  q(
    2,
    "The piranha, a fish famous for its sharp teeth, is native to river basins across which part of South America?|La piraña, un pez famoso por sus dientes afilados, es originaria de las cuencas fluviales de qué parte de Sudamérica?|Le piranha, poisson célèbre pour ses dents acérées, est originaire des bassins fluviaux de quelle partie de l'Amérique du Sud ?|鋭い歯で知られる魚ピラニアが生息するのは、南米のどの流域か?",
    ["The Mississippi basin|La cuenca del Misisipi|Le bassin du Mississippi|ミシシッピ川流域", "The Nile basin|La cuenca del Nilo|Le bassin du Nil|ナイル川流域", "The Amazon basin|La cuenca del Amazonas|Le bassin amazonien|アマゾン川流域"],
    2,
    "Most piranha species are actually scavengers and omnivores rather than the ravenous pack hunters of popular legend, though a feeding frenzy can strip a carcass quickly.|La mayoría de las especies de piraña son en realidad carroñeras y omnívoras, no los cazadores voraces en manada de la leyenda popular, aunque un frenesí alimenticio puede desnudar un cadáver con rapidez.|La plupart des espèces de piranhas sont en réalité charognardes et omnivores, plutôt que les chasseurs voraces en meute de la légende populaire, même si une frénésie alimentaire peut dépouiller une carcasse rapidement.|ピラニアの多くの種は、俗説にある獰猛な群れの狩人というより、実際には腐肉食性の雑食魚である。もっとも、群がって食いつくときは死骸をまたたく間に食い尽くす。",
  ),
  q(
    2,
    "The toucan, a bird known for its oversized, colourful bill, is native to which South American habitat?|¿En qué hábitat sudamericano es originario el tucán, ave conocida por su pico enorme y colorido?|Dans quel habitat sud-américain le toucan, oiseau connu pour son bec démesuré et coloré, est-il originaire ?|巨大で色鮮やかなくちばしで知られる鳥トゥーカンが生息するのは、南米のどの環境か?",
    ["High-altitude desert|El desierto de altura|Le désert d'altitude|高地の砂漠", "Tropical rainforest|La selva tropical|La forêt tropicale humide|熱帯雨林", "Open grassland|La pradera abierta|La prairie ouverte|開けた草原"],
    1,
    "Despite its size, a toucan's bill is mostly hollow and lightweight, made of keratin over a network of bony fibres, and helps the bird regulate its body heat.|A pesar de su tamaño, el pico del tucán es en su mayor parte hueco y liviano, hecho de queratina sobre una red de fibras óseas, y ayuda al ave a regular su temperatura corporal.|Malgré sa taille, le bec du toucan est en grande partie creux et léger, fait de kératine sur un réseau de fibres osseuses, et aide l'oiseau à réguler sa température corporelle.|大きさに反して、トゥーカンのくちばしはほぼ中空で軽く、骨の繊維の網の上にケラチンをまとった構造で、体温の調節を助けている。",
  ),

  // --- 難易度3(+3) ---
  q(
    3,
    "Carnival, one of South America's biggest annual festivals, is traditionally celebrated in the weeks leading up to which Christian observance?|El Carnaval, una de las mayores fiestas anuales de Sudamérica, se celebra tradicionalmente en las semanas previas a qué observancia cristiana?|Le Carnaval, l'une des plus grandes fêtes annuelles d'Amérique du Sud, est traditionnellement célébré dans les semaines précédant quelle observance chrétienne ?|南米最大級の年中行事の一つカーニバルが伝統的に祝われるのは、どのキリスト教の行事の前の数週間か?",
    ["Christmas|La Navidad|Noël|クリスマス", "Lent|La Cuaresma|Le Carême|四旬節(レント)", "All Saints' Day|El Día de Todos los Santos|La Toussaint|諸聖人の日"],
    1,
    "Carnival ends on the eve of Ash Wednesday, the day Lent begins, and its date shifts each year along with Easter, which the Christian calendar fixes by the phases of the moon.|El Carnaval termina la víspera del Miércoles de Ceniza, el día en que empieza la Cuaresma, y su fecha cambia cada año junto con la de la Pascua, que el calendario cristiano fija según las fases de la luna.|Le Carnaval se termine la veille du mercredi des Cendres, jour où commence le Carême, et sa date change chaque année avec celle de Pâques, que le calendrier chrétien fixe selon les phases de la lune.|カーニバルは四旬節が始まる「灰の水曜日」の前夜に終わる。その日付は復活祭と同じく毎年動き、キリスト教暦では月の満ち欠けによって定められている。",
  ),
  q(
    3,
    "Which enormous bird of the high Andes, a national symbol in several countries, has one of the largest wingspans of any flying bird on Earth?|¿Qué ave enorme de los altos Andes, símbolo nacional en varios países, tiene una de las mayores envergaduras de cualquier ave voladora del planeta?|Quel oiseau immense des hautes Andes, symbole national dans plusieurs pays, possède l'une des plus grandes envergures de tous les oiseaux volants au monde ?|いくつもの国の国章にも描かれる、地球上でも屈指の翼開長を持つアンデス高地の巨大な鳥は?",
    ["The harpy eagle|El águila harpía|L'aigle harpie|オウギワシ", "The rhea|El ñandú|Le nandou|レア(南米ダチョウ)", "The Andean condor|El cóndor andino|Le condor des Andes|アンデスコンドル"],
    2,
    "An Andean condor's wingspan can reach roughly 3.3 metres, and the bird relies on rising air currents to soar for hours while barely flapping its wings.|La envergadura de un cóndor andino puede alcanzar unos 3,3 metros, y el ave se apoya en las corrientes de aire ascendentes para planear durante horas batiendo apenas las alas.|L'envergure d'un condor des Andes peut atteindre environ 3,3 mètres, et l'oiseau s'appuie sur les courants d'air ascendants pour planer des heures durant en battant à peine des ailes.|アンデスコンドルの翼開長はおよそ3.3メートルに達することがあり、上昇気流に乗ることでほとんど羽ばたかずに何時間も滑空できる。",
  ),
  q(
    3,
    "Which South American animal, a relative of the guinea pig, is the largest living rodent on Earth?|¿Qué animal sudamericano, pariente del conejillo de Indias, es el roedor vivo más grande del planeta?|Quel animal sud-américain, apparenté au cochon d'Inde, est le plus grand rongeur vivant au monde ?|モルモットの親戚にあたる、地球上で現存する最大のげっ歯類である南米の動物は?",
    ["The capybara|El capibara|Le capybara|カピバラ", "The chinchilla|La chinchilla|Le chinchilla|チンチラ", "The guinea pig|El cobayo|Le cochon d'Inde|モルモット"],
    0,
    "Capybaras are semi-aquatic, spend much of their time in water to stay cool and avoid predators, and often live in groups of ten or more around rivers and marshes.|Los capibaras son semiacuáticos, pasan buena parte del tiempo en el agua para refrescarse y evitar depredadores, y suelen vivir en grupos de diez o más junto a ríos y pantanos.|Les capybaras sont semi-aquatiques, passent une bonne partie de leur temps dans l'eau pour se rafraîchir et échapper aux prédateurs, et vivent souvent en groupes d'une dizaine d'individus ou plus près des rivières et des marais.|カピバラは半水生で、涼を取り天敵を避けるために多くの時間を水中で過ごし、川や湿地のまわりで10頭以上の群れで暮らすことも多い。",
  ),

  // --- 難易度4(+5) ---
  q(
    4,
    "Which South American country is the world's largest exporter of soybeans?|¿Qué país sudamericano es el mayor exportador de soja del mundo?|Quel pays sud-américain est le plus grand exportateur de soja au monde ?|世界最大の大豆輸出国である南米の国は?",
    ["Brazil|Brasil|Le Brésil|ブラジル", "Argentina|Argentina|L'Argentine|アルゼンチン", "Paraguay|Paraguay|Le Paraguay|パラグアイ"],
    0,
    "Soybean cultivation has expanded rapidly across Brazil's interior since the 1970s, turning the country into the world's top producer and exporter and reshaping vast stretches of savanna and, more controversially, forest.|El cultivo de soja se expandió con rapidez por el interior de Brasil desde la década de 1970, convirtiendo al país en el mayor productor y exportador del mundo y transformando amplias extensiones de sabana y, de forma más controvertida, de selva.|La culture du soja s'est rapidement étendue à l'intérieur du Brésil depuis les années 1970, faisant du pays le premier producteur et exportateur mondial, et transformant de vastes étendues de savane et, plus controversé, de forêt.|大豆栽培は1970年代以降ブラジル内陸部で急速に広がり、同国を世界一の生産・輸出国に押し上げると同時に、広大なサバンナ、そしてより物議を醸す形で森林を作り変えてきた。",
  ),
  q(
    4,
    "Vicuña wool, prized as one of the finest and most expensive natural fibres in the world, comes from a wild relative of which domesticated Andean animal?|La lana de vicuña, valorada como una de las fibras naturales más finas y caras del mundo, proviene de un pariente silvestre de qué animal andino domesticado?|La laine de vigogne, considérée comme l'une des fibres naturelles les plus fines et les plus chères au monde, provient d'un parent sauvage de quel animal andin domestiqué ?|世界でも屈指の高級で高価な天然繊維とされるビクーニャの毛は、家畜化されたどのアンデスの動物の野生の親戚から採れるか?",
    ["The horse|El caballo|Le cheval|ウマ", "The sheep|La oveja|Le mouton|ヒツジ", "The llama|La llama|Le lama|リャマ"],
    2,
    "Vicuñas were never fully domesticated and can only be shorn once every few years without harming the animal, which is part of why their wool commands such a high price.|Las vicuñas nunca llegaron a domesticarse del todo y solo pueden esquilarse una vez cada varios años sin dañar al animal, lo que en parte explica el precio tan alto de su lana.|Les vigognes n'ont jamais été vraiment domestiquées et ne peuvent être tondues qu'une fois tous les quelques années sans nuire à l'animal, ce qui explique en partie le prix si élevé de leur laine.|ビクーニャは完全には家畜化されておらず、動物を傷めずに毛を刈れるのは数年に一度だけである。これもその毛がこれほど高値になる理由の一つである。",
  ),
  q(
    4,
    "At roughly 3,640 metres above sea level, which South American city is the world's highest seat of national government?|A unos 3.640 metros sobre el nivel del mar, ¿qué ciudad sudamericana es la sede de gobierno nacional más alta del mundo?|À environ 3 640 mètres d'altitude, quelle ville sud-américaine abrite le siège de gouvernement national le plus élevé au monde ?|標高およそ3,640メートルにあり、世界でもっとも標高の高い国の行政府所在地である南米の都市は?",
    ["La Paz, Bolivia|La Paz, Bolivia|La Paz, en Bolivie|ボリビアのラパス", "Quito, Ecuador|Quito, Ecuador|Quito, en Équateur|エクアドルのキト", "Sucre, Bolivia|Sucre, Bolivia|Sucre, en Bolivie|ボリビアのスクレ"],
    0,
    "La Paz sits in a canyon carved by the Choqueyapu River, with wealthier neighbourhoods at the lower, warmer elevations and poorer ones climbing the colder rim above.|La Paz se asienta en un cañón excavado por el río Choqueyapu, con los barrios más acomodados en las cotas más bajas y templadas, y los más humildes trepando por el borde más frío.|La Paz se niche dans un canyon creusé par la rivière Choqueyapu, les quartiers les plus aisés occupant les altitudes basses et plus tempérées, tandis que les plus modestes grimpent sur le rebord plus froid.|ラパスはチョケヤプ川が刻んだ峡谷にある。裕福な地区は標高が低く暖かい底のほうにあり、貧しい地区ほど寒い縁の高みへと登っていく。",
  ),
  q(
    4,
    "Pelé, widely regarded as one of the greatest footballers in history, won three FIFA World Cups playing for which country?|Pelé, considerado por muchos uno de los mejores futbolistas de la historia, ganó tres Copas Mundiales de la FIFA jugando para qué país?|Pelé, considéré par beaucoup comme l'un des plus grands footballeurs de l'histoire, a remporté trois Coupes du monde de la FIFA sous les couleurs de quel pays ?|史上最高のサッカー選手の一人とされるペレが、3度のFIFAワールドカップ優勝を果たしたのはどの国の代表としてか?",
    ["Argentina|Argentina|L'Argentine|アルゼンチン", "Brazil|Brasil|Le Brésil|ブラジル", "Uruguay|Uruguay|L'Uruguay|ウルグアイ"],
    1,
    "Pelé made his debut for Brazil's national team at 16 and won his first World Cup in 1958 at age 17, still the youngest player ever to win the tournament.|Pelé debutó con la selección brasileña a los 16 años y ganó su primer Mundial en 1958 a los 17, hasta hoy el jugador más joven en ganar el torneo.|Pelé fit ses débuts avec l'équipe nationale brésilienne à 16 ans et remporta sa première Coupe du monde en 1958 à 17 ans, toujours le plus jeune joueur à avoir remporté le tournoi.|ペレはブラジル代表として16歳でデビューし、1958年、17歳で最初のワールドカップ優勝を果たした。これはいまも大会最年少優勝記録である。",
  ),
  q(
    4,
    "Which slow-moving Amazon rainforest mammal often has a greenish tinge to its fur caused by algae growing in it?|¿Qué mamífero de movimientos lentos de la selva amazónica suele tener un tinte verdoso en el pelaje debido a algas que crecen en él?|Quel mammifère lent de la forêt amazonienne présente souvent une teinte verdâtre dans son pelage due à des algues qui y poussent ?|動きの遅いアマゾン熱帯雨林の哺乳類で、毛に藻が生えて緑がかって見えることが多いのは?",
    ["The anteater|El oso hormiguero|Le tamanoir|アリクイ", "The armadillo|El armadillo|Le tatou|アルマジロ", "The sloth|El perezoso|Le paresseux|ナマケモノ"],
    2,
    "A three-toed sloth's metabolism is so slow that it may only defecate about once a week, climbing all the way down to the forest floor to do so.|El metabolismo de un perezoso de tres dedos es tan lento que puede defecar solo una vez por semana, bajando hasta el suelo del bosque para hacerlo.|Le métabolisme d'un paresseux à trois doigts est si lent qu'il ne défèque parfois qu'une fois par semaine, en descendant jusqu'au sol de la forêt pour le faire.|ミユビナマケモノの代謝はきわめて遅く、排泄はおよそ週に一度ほどしかせず、そのたびにわざわざ地面まで降りてくる。",
  ),

  // --- 難易度5(+5) ---
  q(
    5,
    "Which South American country's currency, the boliviano, shares its name with the country itself?|¿La moneda de qué país sudamericano, el boliviano, comparte nombre con el propio país?|La monnaie de quel pays sud-américain, le boliviano, porte le même nom que le pays lui-même ?|自国通貨「ボリビアーノ」が国名そのものと同じ名を持つ南米の国は?",
    ["Bolivia|Bolivia|La Bolivie|ボリビア", "Peru|Perú|Le Pérou|ペルー", "Chile|Chile|Le Chili|チリ"],
    0,
    "The boliviano replaced an earlier currency, the peso, in 1987 after hyperinflation in the mid-1980s wiped out much of its value.|El boliviano sustituyó a una moneda anterior, el peso, en 1987, después de que la hiperinflación de mediados de los años ochenta destruyera buena parte de su valor.|Le boliviano remplaça une monnaie antérieure, le peso, en 1987, après que l'hyperinflation du milieu des années 1980 eut détruit une bonne part de sa valeur.|ボリビアーノは1987年、1980年代半ばのハイパーインフレでその価値の多くが失われたのち、それまでの通貨ペソに代わって導入された。",
  ),
  q(
    5,
    "The boto, a freshwater dolphin found in the Amazon and Orinoco river systems, is unusual for its distinctive colour. What is it?|El bufeo o boto, un delfín de agua dulce de los sistemas del Amazonas y el Orinoco, es inusual por su color característico. ¿Cuál es?|Le boto, un dauphin d'eau douce des systèmes de l'Amazone et de l'Orénoque, se distingue par une couleur inhabituelle. Laquelle ?|アマゾン川とオリノコ川の水系にすむ淡水イルカ、ボトを特徴づける珍しい体色は?",
    ["Bright blue|Azul brillante|Bleu vif|鮮やかな青", "Pink|Rosado|Rose|ピンク", "Bright orange|Naranja brillante|Orange vif|鮮やかなオレンジ"],
    1,
    "Older male botos tend to be pinker than females and young dolphins, possibly because scar tissue from fighting turns pink over time.|Los machos adultos de boto suelen ser más rosados que las hembras y los delfines jóvenes, posiblemente porque el tejido cicatricial de las peleas se vuelve rosado con el tiempo.|Les mâles âgés de boto ont tendance à être plus roses que les femelles et les jeunes dauphins, peut-être parce que le tissu cicatriciel des combats rosit avec le temps.|年老いた雄のボトは雌や若い個体より一段とピンク色が濃くなる傾向があり、これは争いでできた傷跡の組織が時間とともにピンク色に変わるためとも考えられている。",
  ),
  q(
    5,
    "Which wild Andean camelid roams the open plains of Patagonia, unlike its domesticated relatives the llama and alpaca?|¿Qué camélido andino salvaje recorre las llanuras abiertas de la Patagonia, a diferencia de sus parientes domesticados, la llama y la alpaca?|Quel camélidé andin sauvage parcourt les plaines ouvertes de Patagonie, contrairement à ses parents domestiqués, le lama et l'alpaga ?|家畜化されたリャマやアルパカと違い、パタゴニアの開けた平原を歩き回る野生のアンデスラクダ科の動物は?",
    ["The llama|La llama|Le lama|リャマ", "The alpaca|La alpaca|L'alpaga|アルパカ", "The guanaco|El guanaco|Le guanaco|グアナコ"],
    2,
    "Guanacos are believed to be the wild ancestor of the domesticated llama, and large herds still range freely across Patagonia's steppe.|Se cree que el guanaco es el antepasado silvestre de la llama domesticada, y todavía hoy grandes manadas recorren libremente la estepa patagónica.|On pense que le guanaco est l'ancêtre sauvage du lama domestiqué, et de grands troupeaux parcourent encore librement la steppe patagonienne.|グアナコは家畜化されたリャマの野生の祖先と考えられており、いまも大きな群れがパタゴニアのステップを自由に歩き回っている。",
  ),
  q(
    5,
    "The word \"pampas,\" used for the flat grasslands of Argentina and Uruguay, comes from which Indigenous language, where it simply means \"plain\"?|La palabra «pampa», usada para las llanuras herbáceas de Argentina y Uruguay, proviene de qué lengua indígena, en la que simplemente significa «llanura»?|Le mot « pampa », utilisé pour les plaines herbeuses d'Argentine et d'Uruguay, vient de quelle langue autochtone, où il signifie simplement « plaine » ?|アルゼンチンとウルグアイの平坦な草原を指す「パンパ」という語は、単に「平原」を意味するどの先住民言語に由来するか?",
    ["Quechua|El quechua|Le quechua|ケチュア語", "Guaraní|El guaraní|Le guarani|グアラニー語", "Mapudungun|El mapudungún|Le mapudungun|マプチェ語"],
    0,
    "The word travelled far beyond its Andean origin, spreading through Spanish into English and other languages to describe grassland regions worldwide.|La palabra viajó mucho más allá de su origen andino, y a través del español pasó al inglés y otras lenguas para describir regiones de pastizales en todo el mundo.|Le mot voyagea bien au-delà de son origine andine, se répandant via l'espagnol jusqu'en anglais et dans d'autres langues pour décrire des régions de prairies à travers le monde.|この語はアンデス起源の地を遠く離れて広まり、スペイン語を経て英語など他の言語にも入り、世界各地の草原地帯を指す言葉として使われるようになった。",
  ),
  q(
    5,
    "The green anaconda, found in South American wetlands, is often cited as which record-holder among snakes?|La anaconda verde, presente en los humedales sudamericanos, suele citarse como poseedora de qué récord entre las serpientes?|L'anaconda vert, présent dans les zones humides sud-américaines, est souvent cité comme détenteur de quel record parmi les serpents ?|南米の湿地にすむミドリアナコンダは、ヘビの中でどんな記録を持つとよく言われるか?",
    ["The longest snake species|La especie de serpiente más larga|L'espèce de serpent la plus longue|もっとも長いヘビの種", "The most venomous snake species|La especie de serpiente más venenosa|L'espèce de serpent la plus venimeuse|もっとも毒性の強いヘビの種", "The heaviest snake species|La especie de serpiente más pesada|L'espèce de serpent la plus lourde|もっとも重いヘビの種"],
    2,
    "A large female green anaconda can weigh well over 100 kilograms, though the reticulated python of Southeast Asia typically grows longer.|Una anaconda verde hembra grande puede pesar bastante más de 100 kilogramos, aunque la pitón reticulada del sudeste asiático suele alcanzar mayor longitud.|Une grande femelle anaconda verte peut peser bien plus de 100 kilogrammes, bien que le python réticulé d'Asie du Sud-Est atteigne généralement une plus grande longueur.|大型の雌のミドリアナコンダは体重が100キログラムを大きく超えることもあるが、体長では東南アジアのアミメニシキヘビのほうが通常長くなる。",
  ),

  // --- 難易度6(+9) ---
  q(
    6,
    "Which independence leader led an army across the Andes from Argentina in 1817 in a surprise crossing that helped liberate Chile and later Peru?|¿Qué líder independentista cruzó los Andes al frente de un ejército desde Argentina en 1817, en una travesía sorpresa que ayudó a liberar Chile y después Perú?|Quel chef indépendantiste conduisit une armée à travers les Andes depuis l'Argentine en 1817, lors d'une traversée surprise qui contribua à libérer le Chili puis le Pérou ?|1817年、アルゼンチンから奇襲的にアンデスを越えて軍を率い、チリ、続いてペルーの解放を助けた独立指導者は?",
    ["Simón Bolívar|Simón Bolívar|Simón Bolívar|シモン・ボリバル", "Bernardo O'Higgins|Bernardo O'Higgins|Bernardo O'Higgins|ベルナルド・オイギンス", "José de San Martín|José de San Martín|José de San Martín|ホセ・デ・サンマルティン"],
    2,
    "San Martín's Army of the Andes crossed at altitudes over 3,000 metres, losing many mules to cold and altitude before winning a surprise victory at Chacabuco.|El Ejército de los Andes de San Martín cruzó a altitudes de más de 3.000 metros, perdiendo muchas mulas por el frío y la altura, antes de ganar una victoria sorpresiva en Chacabuco.|L'Armée des Andes de San Martín traversa à des altitudes dépassant 3 000 mètres, perdant de nombreuses mules à cause du froid et de l'altitude, avant de remporter une victoire surprise à Chacabuco.|サンマルティンの「アンデス軍」は標高3,000メートルを超える地点を越え、寒さと高度で多くのラバを失いながらも、チャカブコで奇襲による勝利を収めた。",
  ),
  q(
    6,
    "The Battle of Ayacucho in 1824, which effectively ended Spanish colonial rule across South America, was fought in which country?|La batalla de Ayacucho de 1824, que puso fin de hecho al dominio colonial español en Sudamérica, se libró en qué país?|La bataille d'Ayacucho, en 1824, qui mit pratiquement fin à la domination coloniale espagnole en Amérique du Sud, se déroula dans quel pays ?|南米におけるスペイン植民地支配を事実上終わらせた1824年のアヤクーチョの戦いが戦われた国は?",
    ["Peru|Perú|Le Pérou|ペルー", "Bolivia|Bolivia|La Bolivie|ボリビア", "Ecuador|Ecuador|L'Équateur|エクアドル"],
    0,
    "The battle was commanded on the independence side by Antonio José de Sucre, who went on to become the first president of the newly created country later named Bolivia.|La batalla la comandó, del lado independentista, Antonio José de Sucre, quien luego se convirtió en el primer presidente del país recién creado que más tarde se llamó Bolivia.|La bataille fut menée du côté indépendantiste par Antonio José de Sucre, qui devint ensuite le premier président du pays nouvellement créé, appelé plus tard Bolivie.|この戦いを独立側で指揮したのはアントニオ・ホセ・デ・スクレで、彼はのちに新しく生まれた国、のちのボリビアの初代大統領となった。",
  ),
  q(
    6,
    "The Carnival of Barranquilla, Colombia, one of the world's largest carnival celebrations, was recognised by UNESCO as intangible cultural heritage in which year?|El Carnaval de Barranquilla, Colombia, una de las mayores celebraciones de carnaval del mundo, fue reconocido por la UNESCO como patrimonio cultural inmaterial en qué año?|Le Carnaval de Barranquilla, en Colombie, l'une des plus grandes célébrations de carnaval au monde, a été reconnu par l'UNESCO comme patrimoine culturel immatériel en quelle année ?|世界最大級のカーニバルの一つ、コロンビアのバランキージャ・カーニバルがユネスコの無形文化遺産に認定されたのは何年か?",
    ["1994|1994|1994|1994年", "2003|2003|2003|2003年", "2010|2010|2010|2010年"],
    1,
    "The Barranquilla Carnival blends African, Indigenous and European traditions and typically draws well over a million visitors each year to the Caribbean coastal city.|El Carnaval de Barranquilla mezcla tradiciones africanas, indígenas y europeas, y suele atraer cada año a bastante más de un millón de visitantes a esta ciudad costera del Caribe.|Le Carnaval de Barranquilla mêle traditions africaines, autochtones et européennes, et attire chaque année bien plus d'un million de visiteurs dans cette ville côtière des Caraïbes.|バランキージャ・カーニバルはアフリカ・先住民・ヨーロッパの伝統が入り混じり、このカリブ海岸の町には毎年100万人をゆうに超える人出がある。",
  ),
  q(
    6,
    "The English word \"condor\" entered the language via Spanish from which Indigenous Andean language's word \"kuntur\"?|La palabra «cóndor» pasó al español desde qué lengua indígena andina, en la que se decía «kuntur»?|Le mot « condor » est passé en français via l'espagnol depuis quelle langue autochtone andine, où l'on disait « kuntur » ?|「コンドル」という語は、アンデスの先住民言語で「クントゥル」と呼ばれていた語がスペイン語を経て広まったものである。その言語とは?",
    ["Quechua|El quechua|Le quechua|ケチュア語", "Aymara|El aimara|L'aymara|アイマラ語", "Guaraní|El guaraní|Le guarani|グアラニー語"],
    0,
    "Many everyday Spanish and English words for Andean plants, animals and foods, including \"puma\" and \"llama,\" trace back to Quechua, the language of the Inca Empire.|Muchas palabras cotidianas del español y del inglés para plantas, animales y alimentos andinos, incluidas «puma» y «llama», se remontan al quechua, la lengua del Imperio inca.|De nombreux mots courants en espagnol et en anglais désignant des plantes, animaux et aliments andins, dont « puma » et « lama », remontent au quechua, la langue de l'Empire inca.|「プーマ」や「リャマ」を含め、アンデスの動植物や食べ物を指すスペイン語・英語の日常語の多くは、インカ帝国の言語ケチュア語にさかのぼる。",
  ),
  q(
    6,
    "Since the Inca Empire had no written script, officials kept records using a system of knotted, coloured cords. What was this system called?|Como el Imperio inca no tenía escritura, los funcionarios llevaban los registros mediante un sistema de cuerdas anudadas y de colores. ¿Cómo se llamaba ese sistema?|L'Empire inca ne possédant pas d'écriture, les fonctionnaires tenaient leurs registres au moyen d'un système de cordes nouées et colorées. Comment s'appelait ce système ?|文字を持たなかったインカ帝国で、役人が記録を残すために使った、色付きの紐を結んだ仕組みは何と呼ばれたか?",
    ["Quipu|Quipu|Le quipu|キープ(結縄)", "Chasqui|Chasqui|Chasqui|チャスキ", "Mit'a|Mit'a|Mit'a|ミタ"],
    0,
    "A quipu recorded numbers through the position and type of knots, and researchers still debate whether some quipus also encoded narrative information beyond simple accounting.|Un quipu registraba números mediante la posición y el tipo de nudos, y los investigadores aún debaten si algunos quipus también codificaban información narrativa más allá de la mera contabilidad.|Un quipu enregistrait des nombres par la position et le type des nœuds, et les chercheurs débattent encore de savoir si certains quipus codaient aussi des informations narratives au-delà de la simple comptabilité.|キープは結び目の位置と種類によって数を記録した。単なる帳簿を超えて物語的な情報まで符号化していたキープもあるのではないかと、研究者のあいだでいまも議論が続いている。",
  ),
  q(
    6,
    "The brilliant blue colour of the Amazonian blue morpho butterfly's wings comes not from pigment but from what?|El brillante color azul de las alas de la mariposa morfo azul amazónica no proviene de un pigmento, sino de qué?|L'éclatante couleur bleue des ailes du morpho bleu amazonien ne provient pas d'un pigment, mais de quoi ?|アマゾンにすむモルフォチョウの、鮮やかな青い翅の色は、色素ではなく何によって生まれるのか?",
    ["A layer of blue dust on the wings|Una capa de polvo azul en las alas|Une couche de poussière bleue sur les ailes|翅の上の青い粉の層", "The microscopic structure of its wing scales|La estructura microscópica de las escamas de sus alas|La structure microscopique des écailles de ses ailes|翅の鱗粉の微細な構造", "Reflected light from water droplets on the wings|La luz reflejada por gotas de agua en las alas|La lumière réfléchie par des gouttes d'eau sur les ailes|翅についた水滴の反射光"],
    1,
    "This kind of colour, called structural colour, is the same basic principle behind the shimmer of peacock feathers and certain beetle shells.|Este tipo de color, llamado color estructural, es el mismo principio básico detrás del brillo de las plumas del pavo real y de ciertos caparazones de escarabajo.|Ce type de couleur, appelé couleur structurale, repose sur le même principe de base que l'éclat des plumes de paon et de certaines carapaces de scarabées.|この種の発色は「構造色」と呼ばれ、孔雀の羽やある種の甲虫の殻の輝きも同じ原理によるものである。",
  ),
  q(
    6,
    "The electric eel, found in the Amazon and Orinoco basins and capable of delivering powerful shocks, is not actually a true eel but a type of what?|La anguila eléctrica, presente en las cuencas del Amazonas y el Orinoco y capaz de dar descargas potentes, en realidad no es una anguila verdadera sino un tipo de qué?|L'anguille électrique, présente dans les bassins de l'Amazone et de l'Orénoque et capable d'infliger de puissantes décharges, n'est en réalité pas une véritable anguille mais un type de quoi ?|アマゾン川・オリノコ川流域にすみ強力な電気ショックを放つデンキウナギは、実は本物のウナギではなく何の一種か?",
    ["A catfish|Un bagre|Un poisson-chat|ナマズの仲間", "A lamprey|Una lamprea|Une lamproie|ヤツメウナギの仲間", "A knifefish|Un pez cuchillo|Un poisson-couteau|ナイフフィッシュの仲間"],
    2,
    "Despite its long, eel-like body, the electric eel belongs to a separate order of fish and is more closely related to catfish and carp than to true eels.|A pesar de su cuerpo largo y parecido al de una anguila, la anguila eléctrica pertenece a un orden distinto de peces y está más emparentada con los bagres y las carpas que con las anguilas verdaderas.|Malgré son corps long et semblable à celui d'une anguille, l'anguille électrique appartient à un ordre de poissons distinct et est plus proche des poissons-chats et des carpes que des véritables anguilles.|細長いウナギに似た体つきをしているが、デンキウナギは分類上まったく別の目に属する魚で、本物のウナギよりもナマズやコイに近い。",
  ),
  q(
    6,
    "Diego Maradona's infamous \"Hand of God\" goal, punched into the net rather than headed, came during a 1986 World Cup match against which country?|El célebre gol de «la mano de Dios» de Diego Maradona, metido de puño en vez de cabeza, se marcó en un partido del Mundial de 1986 contra qué país?|Le tristement célèbre but de « la main de Dieu » de Diego Maradona, marqué du poing plutôt que de la tête, fut inscrit lors d'un match de la Coupe du monde 1986 contre quel pays ?|頭ではなく拳でボールをたたき込んだディエゴ・マラドーナの悪名高い「神の手」ゴールが決まったのは、1986年ワールドカップのどの国との試合か?",
    ["England|Inglaterra|L'Angleterre|イングランド", "Germany|Alemania|L'Allemagne|ドイツ", "Italy|Italia|L'Italie|イタリア"],
    0,
    "Minutes after the disputed goal, Maradona scored what is often called the \"Goal of the Century,\" dribbling past five England players before scoring.|Minutos después del polémico gol, Maradona anotó lo que muchos llaman el «Gol del Siglo», tras driblar a cinco jugadores ingleses antes de marcar.|Quelques minutes après ce but controversé, Maradona inscrivit ce que beaucoup appellent le « but du siècle », après avoir dribblé cinq joueurs anglais.|この物議を醸したゴールのわずか数分後、マラドーナはイングランドの選手5人をかわしてゴールを決め、しばしば「世紀のゴール」と呼ばれる一点を記録した。",
  ),
  q(
    6,
    "The word \"puma,\" used in English and Spanish for the big cat also called the cougar or mountain lion, comes from which Andean language?|La palabra «puma», usada en español y en inglés para el felino también llamado cuguar o león de montaña, proviene de qué lengua andina?|Le mot « puma », utilisé en français et en anglais pour le félin aussi appelé couguar, provient de quelle langue andine ?|クーガーやマウンテンライオンとも呼ばれる大型ネコ科動物を指す語「プーマ」は、どのアンデスの言語に由来するか?",
    ["Aymara|El aimara|L'aymara|アイマラ語", "Quechua|El quechua|Le quechua|ケチュア語", "Mapudungun|El mapudungún|Le mapudungun|マプチェ語"],
    1,
    "The puma has one of the widest ranges of any large land mammal in the Americas, found from the Canadian Yukon down to the southern tip of Patagonia.|El puma tiene uno de los territorios más amplios de cualquier gran mamífero terrestre de América, y se encuentra desde el Yukón canadiense hasta el extremo sur de la Patagonia.|Le puma possède l'une des plus vastes aires de répartition de tous les grands mammifères terrestres des Amériques, présent du Yukon canadien jusqu'à l'extrémité sud de la Patagonie.|プーマはアメリカ大陸の大型哺乳類の中でも屈指の広い生息域を持ち、カナダのユーコンからパタゴニアの南端まで見られる。",
  ),

  // --- 難易度7(+9) ---
  q(
    7,
    "Atahualpa, the last Inca emperor to rule a unified empire, was captured and later executed by Spanish forces under which conquistador, in 1533?|Atahualpa, el último emperador inca en gobernar un imperio unificado, fue capturado y luego ejecutado por las fuerzas españolas bajo el mando de qué conquistador, en 1533?|Atahualpa, le dernier empereur inca à régner sur un empire unifié, fut capturé puis exécuté par les forces espagnoles sous les ordres de quel conquistador, en 1533 ?|統一されたインカ帝国を治めた最後の皇帝アタワルパを捕らえ、1533年に処刑したスペイン軍の指揮官は?",
    ["Hernán Cortés|Hernán Cortés|Hernán Cortés|エルナン・コルテス", "Diego de Almagro|Diego de Almagro|Diego de Almagro|ディエゴ・デ・アルマグロ", "Francisco Pizarro|Francisco Pizarro|Francisco Pizarro|フランシスコ・ピサロ"],
    2,
    "Atahualpa offered to fill a room with gold and silver in exchange for his freedom, and the ransom was paid, but Pizarro had him executed anyway on charges including plotting rebellion.|Atahualpa ofreció llenar una habitación de oro y plata a cambio de su libertad, y el rescate se pagó, pero Pizarro lo ejecutó de todos modos bajo cargos que incluían conspirar una rebelión.|Atahualpa proposa de remplir une pièce d'or et d'argent en échange de sa liberté, et la rançon fut payée, mais Pizarro le fit néanmoins exécuter, notamment sous prétexte de complot rebelle.|アタワルパは自由と引き換えに部屋いっぱいの金銀を差し出すと申し出て、身代金は実際に支払われたが、ピサロは反乱を企てた疑いなどを理由に彼を処刑した。",
  ),
  q(
    7,
    "Which Spanish explorer was the first European known to navigate the entire length of the Amazon River, in an expedition of 1541–1542?|¿Qué explorador español fue el primer europeo conocido en navegar todo el curso del río Amazonas, en una expedición de 1541-1542?|Quel explorateur espagnol fut le premier Européen connu à naviguer sur toute la longueur du fleuve Amazone, lors d'une expédition de 1541-1542 ?|1541〜1542年の遠征で、アマゾン川の全長を初めて航行したヨーロッパ人として知られるスペイン人探検家は?",
    ["Francisco de Orellana|Francisco de Orellana|Francisco de Orellana|フランシスコ・デ・オレリャーナ", "Francisco Pizarro|Francisco Pizarro|Francisco Pizarro|フランシスコ・ピサロ", "Pedro de Valdivia|Pedro de Valdivia|Pedro de Valdivia|ペドロ・デ・バルディビア"],
    0,
    "Orellana became separated from a larger expedition searching for cinnamon and gold, and was swept downriver with no way to return upstream against the current.|Orellana se separó de una expedición mayor que buscaba canela y oro, y fue arrastrado río abajo sin manera de remontar la corriente para regresar.|Orellana se retrouva séparé d'une expédition plus vaste partie chercher cannelle et or, et fut emporté en aval sans moyen de remonter le courant.|オレリャーナは、シナモンと黄金を求める大規模な遠征隊から離ればなれになり、流れに逆らって引き返す手立てもないまま川を下ることになった。",
  ),
  q(
    7,
    "The word \"jaguar\" comes from a Tupi-Guarani word roughly meaning what?|La palabra «jaguar» proviene de un vocablo tupí-guaraní que significa aproximadamente qué?|Le mot « jaguar » vient d'un mot tupi-guarani signifiant approximativement quoi ?|「ジャガー」という語は、おおよそどんな意味を持つトゥピ・グアラニー語の言葉に由来するか?",
    ["\"Spotted river cat\"|«Gato moteado del río»|« Chat tacheté de la rivière »|「斑点のある川の猫」", "\"He who kills with one leap\"|«El que mata de un salto»|« Celui qui tue d'un bond »|「一飛びで仕留める者」", "\"Lord of the forest\"|«Señor del bosque»|« Seigneur de la forêt »|「森の王」"],
    1,
    "The jaguar is the only big cat native to the Americas, and its range once stretched from the southwestern United States down to Argentina.|El jaguar es el único felino grande originario de las Américas, y su territorio se extendía en otro tiempo desde el suroeste de Estados Unidos hasta Argentina.|Le jaguar est le seul grand félin originaire des Amériques, et son aire de répartition s'étendait autrefois du sud-ouest des États-Unis jusqu'en Argentine.|ジャガーはアメリカ大陸原産の唯一の大型ネコ科動物で、かつての生息域はアメリカ合衆国南西部からアルゼンチンにまで及んでいた。",
  ),
  q(
    7,
    "Which Andean grain, older than the potato and deeply tied to Inca religious ritual, had its cultivation discouraged by Spanish colonial authorities?|¿Qué grano andino, más antiguo que la papa y profundamente ligado al ritual religioso inca, vio desalentado su cultivo por las autoridades coloniales españolas?|Quelle céréale andine, plus ancienne que la pomme de terre et profondément liée au rituel religieux inca, vit sa culture découragée par les autorités coloniales espagnoles ?|ジャガイモより古く、インカの宗教儀礼と深く結びついていたため、スペイン植民地当局によって栽培を抑えられたアンデスの穀物は?",
    ["Maize|El maíz|Le maïs|トウモロコシ", "Cacao|El cacao|Le cacao|カカオ", "Quinoa|La quinoa|Le quinoa|キヌア"],
    2,
    "Quinoa's association with Andean sun worship led some colonial officials to actively suppress it, yet farmers kept growing it in remote fields, and it has since become a global health-food export.|La asociación de la quinoa con el culto andino al sol llevó a algunos funcionarios coloniales a reprimirla activamente, pero los agricultores siguieron cultivándola en campos remotos, y desde entonces se ha convertido en una exportación mundial como alimento saludable.|L'association du quinoa avec le culte andin du soleil poussa certains fonctionnaires coloniaux à en réprimer activement la culture, mais les agriculteurs continuèrent à le cultiver dans des champs isolés, et il est depuis devenu une exportation mondiale prisée comme aliment santé.|キヌアがアンデスの太陽信仰と結びついていたため、一部の植民地当局はその栽培を積極的に抑えようとしたが、農民たちは辺境の畑でひそかに作り続け、いまでは世界的な健康食品として輸出されるようになっている。",
  ),
  q(
    7,
    "The Aymara people, concentrated around Lake Titicaca and the Altiplano, speak a language unrelated to which other major language of the Andes, the tongue of the former Inca Empire?|El pueblo aimara, concentrado en torno al lago Titicaca y el Altiplano, habla una lengua sin relación con qué otra gran lengua de los Andes, la lengua del antiguo Imperio inca?|Le peuple aymara, concentré autour du lac Titicaca et de l'Altiplano, parle une langue sans lien avec quelle autre grande langue des Andes, la langue de l'ancien Empire inca ?|チチカカ湖周辺とアルティプラーノに集中して暮らすアイマラの人々の言語は、かつてのインカ帝国の言語である、アンデスのもう一つの大きな言語とは系統的に無関係である。それは何語か?",
    ["Quechua|El quechua|Le quechua|ケチュア語", "Guaraní|El guaraní|Le guarani|グアラニー語", "Mapudungun|El mapudungún|Le mapudungun|マプチェ語"],
    0,
    "Aymara and Quechua speakers have lived side by side in the central Andes for centuries, and many people in the region speak both languages along with Spanish.|Los hablantes de aimara y quechua han convivido durante siglos en los Andes centrales, y muchas personas de la región hablan ambas lenguas además del español.|Les locuteurs aymara et quechua cohabitent depuis des siècles dans les Andes centrales, et de nombreux habitants de la région parlent les deux langues en plus de l'espagnol.|アイマラ語話者とケチュア語話者は中央アンデスで何世紀も隣り合って暮らしており、この地域の多くの人々はスペイン語に加えて両方の言語を話す。",
  ),
  q(
    7,
    "Which unusual Amazon and Orinoco basin bird has chicks born with claws on their wings, and digests leaves through fermentation like a cow?|¿Qué ave singular de las cuencas del Amazonas y el Orinoco tiene crías que nacen con garras en las alas y digiere hojas por fermentación, como una vaca?|Quel oiseau singulier des bassins de l'Amazone et de l'Orénoque a des poussins nés avec des griffes sur les ailes, et digère les feuilles par fermentation, comme une vache ?|アマゾン川・オリノコ川流域にすみ、雛が翼に爪を持って生まれ、牛のように発酵によって葉を消化する変わった鳥は?",
    ["The toucan|El tucán|Le toucan|トゥーカン", "The hoatzin|El hoacín|Le hoazin|ホアツィン", "The macaw|El guacamayo|L'ara|コンゴウインコ"],
    1,
    "The fermentation process that lets the hoatzin digest leaves also gives it a strong manure-like smell, earning it the nickname \"stinkbird.\"|El proceso de fermentación que le permite al hoacín digerir hojas también le da un fuerte olor a estiércol, lo que le ha valido el apodo de «ave hedionda».|Le processus de fermentation qui permet au hoazin de digérer les feuilles lui donne aussi une forte odeur de fumier, ce qui lui vaut le surnom d'« oiseau puant ».|ホアツィンが葉を消化するための発酵の過程は、家畜の糞のような強い臭いも生み出すため、「臭い鳥」とあだ名されている。",
  ),
  q(
    7,
    "The Amazon's rubber boom collapsed in the early 20th century after an Englishman smuggled thousands of rubber tree seeds out of Brazil in 1876, later grown as plantations in which British colonies?|El auge del caucho amazónico se derrumbó a principios del siglo XX después de que un inglés sacara de contrabando de Brasil miles de semillas de árbol del caucho en 1876, luego cultivadas como plantaciones en qué colonias británicas?|Le boom du caoutchouc amazonien s'effondra au début du XXe siècle après qu'un Anglais eut fait sortir clandestinement du Brésil des milliers de graines d'hévéa en 1876, plus tard cultivées en plantations dans quelles colonies britanniques ?|1876年にあるイギリス人がブラジルから密かにゴムノキの種を数千個持ち出し、のちに英領のどこかでプランテーション栽培された。これがきっかけとなり、20世紀初頭にアマゾンのゴムブームは崩壊した。その栽培地とは?",
    ["Australia and New Zealand|Australia y Nueva Zelanda|L'Australie et la Nouvelle-Zélande|オーストラリアとニュージーランド", "South Africa and Kenya|Sudáfrica y Kenia|L'Afrique du Sud et le Kenya|南アフリカとケニア", "Malaya and Ceylon|Malaca y Ceilán|La Malaisie et Ceylan|マラヤとセイロン"],
    2,
    "The smuggler, Henry Wickham, shipped roughly 70,000 seeds to Kew Gardens in London, and the resulting Asian plantations soon out-produced the wild-harvested rubber of the Amazon.|El contrabandista, Henry Wickham, envió unas 70.000 semillas a los jardines de Kew, en Londres, y las plantaciones asiáticas resultantes pronto superaron en producción al caucho silvestre recolectado en el Amazonas.|Le contrebandier, Henry Wickham, expédia environ 70 000 graines aux jardins de Kew, à Londres, et les plantations asiatiques qui en résultèrent surpassèrent bientôt en production le caoutchouc sauvage récolté en Amazonie.|この密輸を行ったヘンリー・ウィッカムは、およそ7万個の種をロンドンのキュー植物園へ送った。そこから育ったアジアのプランテーションは、まもなくアマゾンの野生採取のゴムの生産量を上回るようになった。",
  ),
  q(
    7,
    "Which system, imposed by Spanish colonial authorities, granted colonists the right to demand forced labour and tribute from Indigenous communities in exchange for supposed protection and religious instruction?|¿Qué sistema, impuesto por las autoridades coloniales españolas, otorgaba a los colonos el derecho a exigir trabajo forzado y tributo de las comunidades indígenas a cambio de una supuesta protección e instrucción religiosa?|Quel système, imposé par les autorités coloniales espagnoles, accordait aux colons le droit d'exiger travail forcé et tribut des communautés autochtones en échange d'une prétendue protection et instruction religieuse ?|スペイン植民地当局が課した制度で、保護と布教を名目に、入植者が先住民の共同体に強制労働と貢納を求める権利を与えたものは何か?",
    ["The encomienda|La encomienda|L'encomienda|エンコミエンダ", "The viceroyalty|El virreinato|La vice-royauté|副王領", "The cabildo|El cabildo|Le cabildo|カビルド(市参事会)"],
    0,
    "In practice, the encomienda system led to widespread abuse and forced labour, and it was gradually phased out over the colonial period, though similar labour obligations persisted in other forms.|En la práctica, el sistema de encomiendas provocó abusos generalizados y trabajo forzado, y fue eliminándose de manera gradual a lo largo del periodo colonial, aunque obligaciones laborales similares persistieron bajo otras formas.|Dans la pratique, le système de l'encomienda entraîna des abus généralisés et du travail forcé, et fut progressivement aboli au cours de la période coloniale, bien que des obligations de travail similaires aient persisté sous d'autres formes.|実際には、エンコミエンダ制は広範な虐待と強制労働につながり、植民地時代を通じて徐々に廃止されていったが、似たような労役の義務は形を変えて残り続けた。",
  ),
  q(
    7,
    "The golden poison frog, native to Colombia's Pacific rainforest and considered one of the most toxic animals on Earth, was traditionally used by Indigenous peoples to coat what?|La rana dorada venenosa, originaria de la selva pacífica de Colombia y considerada uno de los animales más tóxicos del planeta, se usaba tradicionalmente entre pueblos indígenas para recubrir qué?|La grenouille dorée, originaire de la forêt pacifique de Colombie et considérée comme l'un des animaux les plus toxiques au monde, était traditionnellement utilisée par des peuples autochtones pour enduire quoi ?|コロンビア太平洋岸の熱帯雨林にすみ、地球上でも屈指の毒性を持つとされるモウドクフキヤガエルは、伝統的に先住民が何に毒を塗るために使ってきたか?",
    ["Fishing nets|Redes de pesca|Des filets de pêche|漁網", "The tips of blowgun darts|Las puntas de dardos de cerbatana|Les pointes de fléchettes de sarbacane|吹き矢の矢先", "Cooking pots|Ollas de cocina|Des marmites de cuisine|調理用の鍋"],
    1,
    "A single golden poison frog carries enough toxin, called batrachotoxin, to potentially kill several adult humans, and it appears to obtain the poison from its diet of small insects in the wild.|Una sola rana dorada venenosa lleva suficiente toxina, llamada batracotoxina, como para matar potencialmente a varios adultos humanos, y parece obtener el veneno de su dieta de pequeños insectos en estado salvaje.|Une seule grenouille dorée porte assez de toxine, appelée batrachotoxine, pour tuer potentiellement plusieurs adultes humains, et elle semble tirer ce poison de son régime d'insectes en milieu sauvage.|モウドクフキヤガエルはバトラコトキシンと呼ばれる毒を、成人数人を死に至らしめかねないほど体内に持つ。野生では小さな昆虫を食べることでこの毒を得ているとみられている。",
  ),

  // --- 難易度8(+11) ---
  q(
    8,
    "Simón Bolívar, weakened by illness and political setbacks, died in 1830 not in a capital he had founded but in which Colombian coastal city?|Simón Bolívar, debilitado por la enfermedad y los reveses políticos, murió en 1830 no en una capital que él hubiera fundado, sino en qué ciudad costera colombiana?|Simón Bolívar, affaibli par la maladie et les revers politiques, mourut en 1830 non pas dans une capitale qu'il avait fondée, mais dans quelle ville côtière colombienne ?|病と政治的な挫折で衰弱したシモン・ボリバルが1830年に世を去ったのは、彼が築いた首都ではなく、コロンビアのどの海岸の町でだったか?",
    ["Cartagena|Cartagena|Carthagène|カルタヘナ", "Barranquilla|Barranquilla|Barranquilla|バランキージャ", "Santa Marta|Santa Marta|Santa Marta|サンタマルタ"],
    2,
    "Bolívar died at a hacienda called Quinta de San Pedro Alejandrino, having resigned the presidency of Gran Colombia just weeks earlier, disillusioned as the union he had built began to fracture.|Bolívar murió en una hacienda llamada Quinta de San Pedro Alejandrino, apenas semanas después de renunciar a la presidencia de la Gran Colombia, desilusionado al ver que la unión que había construido empezaba a fracturarse.|Bolívar mourut dans une hacienda appelée Quinta de San Pedro Alejandrino, à peine quelques semaines après avoir démissionné de la présidence de la Grande Colombie, désabusé alors que l'union qu'il avait bâtie commençait à se fissurer.|ボリバルはキンタ・デ・サンペドロ・アレハンドリーノという農園で世を去った。彼が築いた大コロンビアの連合が崩れ始めるのを目にし、幻滅のうちに大統領職を辞したわずか数週間後のことだった。",
  ),
  q(
    8,
    "The Chincha Islands War (1864–1866), fought over control of guano-rich islands off Peru, pitted Spain against Peru and which allied country?|La Guerra de las Islas Chinchas (1864-1866), librada por el control de islas ricas en guano frente a Perú, enfrentó a España contra Perú y qué país aliado?|La guerre des îles Chincha (1864-1866), menée pour le contrôle d'îles riches en guano au large du Pérou, opposa l'Espagne au Pérou et à quel pays allié ?|ペルー沖の、グアノに富む島々の支配をめぐって戦われたチンチャ諸島戦争(1864〜1866年)で、スペインと戦ったペルーの同盟国は?",
    ["Chile|Chile|Le Chili|チリ", "Brazil|Brasil|Le Brésil|ブラジル", "Argentina|Argentina|L'Argentine|アルゼンチン"],
    0,
    "The war was one of the last attempts by a European power to reassert colonial control in South America, and it ended with Spain withdrawing without regaining any territory.|La guerra fue uno de los últimos intentos de una potencia europea por reafirmar el control colonial en Sudamérica, y terminó con España retirándose sin recuperar territorio alguno.|Cette guerre fut l'une des dernières tentatives d'une puissance européenne pour réaffirmer un contrôle colonial en Amérique du Sud, et elle s'acheva par le retrait de l'Espagne sans qu'elle ne regagne le moindre territoire.|この戦争は、ヨーロッパの列強が南米で植民地支配を再び主張しようとした最後の試みの一つであり、スペインは領土を一切取り戻せないまま撤退して終わった。",
  ),
  q(
    8,
    "The word \"piranha\" comes from the Tupi language, combining words for \"fish\" and roughly which other body part?|La palabra «piraña» viene del tupí, combinando las palabras para «pez» y, aproximadamente, qué otra parte del cuerpo?|Le mot « piranha » vient du tupi, combinant les mots pour « poisson » et, à peu près, quelle autre partie du corps ?|「ピラニア」という語はトゥピ語に由来し、「魚」を意味する語と、おおよそ体のどの部分を意味する語を組み合わせたものか?",
    ["Eye|Ojo|Œil|目", "Tooth|Diente|Dent|歯", "Tail|Cola|Queue|尾"],
    1,
    "The Tupi word \"pira\" for fish appears in several other South American place and animal names, reflecting how widely the language once spread along the coast and river systems.|La palabra tupí «pira», que significa pez, aparece en varios otros nombres de lugares y animales sudamericanos, lo que refleja lo mucho que llegó a extenderse esta lengua por la costa y los sistemas fluviales.|Le mot tupi « pira », signifiant poisson, apparaît dans plusieurs autres noms de lieux et d'animaux sud-américains, reflétant l'étendue de cette langue le long de la côte et des systèmes fluviaux.|「魚」を意味するトゥピ語の「ピラ」は、南米の他の地名や動物名にもいくつも見られ、この言語がかつて沿岸や川筋にどれほど広く行き渡っていたかを物語っている。",
  ),
  q(
    8,
    "The word \"guano,\" used internationally for seabird droppings harvested as fertiliser, comes from a Quechua word meaning what?|La palabra «guano», usada internacionalmente para los excrementos de aves marinas cosechados como fertilizante, proviene de una palabra quechua que significa qué?|Le mot « guano », utilisé dans le monde entier pour les excréments d'oiseaux marins récoltés comme engrais, vient d'un mot quechua signifiant quoi ?|肥料として採取される海鳥の糞を指し世界的に使われる「グアノ」という語は、どんな意味のケチュア語に由来するか?",
    ["Mountain|Montaña|Montagne|山", "Wealth|Riqueza|Richesse|富", "Dung|Estiércol|Fumier|糞"],
    2,
    "Guano was so valuable in the mid-1800s that it was sometimes called \"white gold,\" and its export briefly made Peru one of the wealthiest countries in South America.|El guano tenía tanto valor a mediados del siglo XIX que a veces se lo llamaba «oro blanco», y su exportación convirtió brevemente a Perú en uno de los países más ricos de Sudamérica.|Le guano avait une telle valeur au milieu du XIXe siècle qu'on le surnommait parfois « l'or blanc », et son exportation fit brièvement du Pérou l'un des pays les plus riches d'Amérique du Sud.|グアノは19世紀半ば、「白い黄金」と呼ばれるほど価値が高く、その輸出によってペルーは一時、南米でも屈指の富める国となった。",
  ),
  q(
    8,
    "The Wayuu, the largest Indigenous group in Colombia and Venezuela, known for a distinctly matrilineal social structure and colourful woven bags, live mainly on which peninsula?|Los wayuu, el mayor pueblo indígena de Colombia y Venezuela, conocidos por una estructura social claramente matrilineal y bolsos tejidos de colores, viven sobre todo en qué península?|Les Wayuu, le plus grand groupe autochtone de Colombie et du Venezuela, connus pour une structure sociale nettement matrilinéaire et des sacs tissés colorés, vivent principalement sur quelle péninsule ?|コロンビアとベネズエラで最大の先住民集団であり、母系制の社会構造と色鮮やかな織物のバッグで知られるワユー族が主に暮らすのはどの半島か?",
    ["The Guajira Peninsula|La península de la Guajira|La péninsule de la Guajira|グアヒラ半島", "The Paraguaná Peninsula|La península de Paraguaná|La péninsule de Paraguaná|パラグアナ半島", "The Yucatán Peninsula|La península de Yucatán|La péninsule du Yucatán|ユカタン半島"],
    0,
    "The Wayuu never fully submitted to Spanish colonial rule, in part because their arid homeland offered little that colonisers wanted and their skill with horses and firearms made conquest costly.|Los wayuu nunca se sometieron del todo al dominio colonial español, en parte porque su árida tierra natal ofrecía poco que interesara a los colonizadores y su destreza con caballos y armas de fuego encarecía cualquier intento de conquista.|Les Wayuu ne se soumirent jamais totalement à la domination coloniale espagnole, en partie parce que leur terre aride n'offrait guère de quoi intéresser les colonisateurs et que leur maîtrise des chevaux et des armes à feu rendait la conquête coûteuse.|ワユー族はスペインの植民地支配に完全には服さなかった。乾いた郷土に植民者が欲しがるものがほとんど無かったことに加え、馬と銃器を操る技量が征服の代償を高くしたためでもある。",
  ),
  q(
    8,
    "Gran Colombia, the short-lived republic founded by Simón Bolívar that later split into several separate nations, existed from 1819 to which year?|La Gran Colombia, la república de corta vida fundada por Simón Bolívar que después se dividió en varias naciones, existió desde 1819 hasta qué año?|La Grande Colombie, la république éphémère fondée par Simón Bolívar qui se scinda plus tard en plusieurs nations, exista de 1819 à quelle année ?|シモン・ボリバルが建てた短命の共和国「大コロンビア」は、のちにいくつかの国へ分裂した。存続していたのは1819年から何年までか?",
    ["1824|1824|1824|1824年", "1831|1831|1831|1831年", "1845|1845|1845|1845年"],
    1,
    "Gran Colombia included the territory of today's Colombia, Venezuela, Ecuador and Panama, and its collapse came amid regional rivalries and disputes over how centralised the new government should be.|La Gran Colombia incluía el territorio de las actuales Colombia, Venezuela, Ecuador y Panamá, y su colapso llegó en medio de rivalidades regionales y disputas sobre cuán centralizado debía ser el nuevo gobierno.|La Grande Colombie englobait le territoire des actuels Colombie, Venezuela, Équateur et Panama, et son effondrement survint au milieu de rivalités régionales et de désaccords sur le degré de centralisation du nouveau gouvernement.|大コロンビアは現在のコロンビア・ベネズエラ・エクアドル・パナマにあたる領域を含んでいたが、地域間の対立と新政府をどれだけ中央集権化すべきかをめぐる争いのなかで崩壊した。",
  ),
  q(
    8,
    "According to a well-known Amazonian legend, the pink river dolphin can transform at night into what, to lure people away from riverside festivals?|Según una conocida leyenda amazónica, el delfín rosado del río puede transformarse de noche en qué, para atraer a la gente lejos de las fiestas ribereñas?|Selon une célèbre légende amazonienne, le dauphin rose du fleuve peut se transformer la nuit en quoi, pour attirer les gens loin des fêtes riveraines ?|よく知られたアマゾンの言い伝えによれば、ピンク色のカワイルカは夜になると何に姿を変え、川辺の祭りから人を連れ去ろうとするとされているか?",
    ["A giant fish|Un pez gigante|Un poisson géant|巨大な魚", "An old woman|Una anciana|Une vieille femme|老いた女", "A handsome stranger|Un forastero apuesto|Un bel inconnu|見目のいい見知らぬ男"],
    2,
    "This figure, called the \"encantado,\" is said to always wear a hat to hide the blowhole on top of his head, the one detail that supposedly gives him away.|Esta figura, llamada «encantado», siempre lleva sombrero para ocultar el espiráculo en la parte superior de la cabeza, el único detalle que, según se dice, lo delataría.|Cette figure, appelée « encantado », porte toujours, dit-on, un chapeau pour cacher l'évent au sommet de sa tête, le seul détail censé le trahir.|「エンカンタード」と呼ばれるこの姿は、頭の上にある噴気孔を隠すためにいつも帽子をかぶっているとされ、それだけが正体を見破る唯一の手がかりだと語られている。",
  ),
  q(
    8,
    "The word \"toucan\" reached English and French through Portuguese and Spanish from a Tupi word describing the bird by which distinctive feature?|La palabra «tucán» llegó al francés y al inglés a través del portugués y el español desde una palabra tupí que describía al ave por qué rasgo distintivo?|Le mot « toucan » est parvenu à l'anglais et au français via le portugais et l'espagnol depuis un mot tupi décrivant l'oiseau par quel trait distinctif ?|「トゥーカン」という語は、ポルトガル語・スペイン語を経て英語やフランス語に入った。もとのトゥピ語は、この鳥の際立った何を表す言葉だったか?",
    ["Its call|Su canto|Son cri|鳴き声", "Its bill|Su pico|Son bec|くちばし", "Its tail|Su cola|Sa queue|尾"],
    0,
    "The Tupi word \"tukana\" is thought to imitate the sound of the bird's own call, a common way many Indigenous South American names for animals came about.|Se cree que la palabra tupí «tukana» imita el sonido del propio canto del ave, una forma común en que surgieron muchos nombres indígenas sudamericanos de animales.|On pense que le mot tupi « tukana » imite le son du cri même de l'oiseau, une manière courante dont sont nés de nombreux noms autochtones sud-américains d'animaux.|トゥピ語の「トゥカナ」はこの鳥自身の鳴き声を真似た語だと考えられており、南米の先住民の言語で動物の名がこうして生まれるのはよくあることである。",
  ),
  q(
    8,
    "An electric eel can generate a shock of several hundred volts to stun prey or deter predators. What organ does it use to store and discharge this electricity?|Una anguila eléctrica puede generar una descarga de varios cientos de voltios para aturdir a sus presas o disuadir a los depredadores. ¿Qué órgano usa para almacenar y descargar esa electricidad?|Une anguille électrique peut générer une décharge de plusieurs centaines de volts pour étourdir ses proies ou dissuader les prédateurs. Quel organe utilise-t-elle pour stocker et libérer cette électricité ?|デンキウナギは獲物を気絶させたり天敵を追い払ったりするために数百ボルトもの電気を発生させることがある。この電気を蓄え放出するために使う器官は?",
    ["Its heart|Su corazón|Son cœur|心臓", "Specialised electric organs made from modified muscle cells|Órganos eléctricos especializados formados por células musculares modificadas|Des organes électriques spécialisés issus de cellules musculaires modifiées|変化した筋細胞からなる特殊な発電器官", "Its swim bladder|Su vejiga natatoria|Sa vessie natatoire|浮き袋"],
    1,
    "These electric organs take up most of an electric eel's long body, leaving only a small portion near the head for its other internal organs.|Estos órganos eléctricos ocupan la mayor parte del cuerpo alargado de la anguila eléctrica, dejando solo una pequeña porción cerca de la cabeza para sus demás órganos internos.|Ces organes électriques occupent la majeure partie du long corps de l'anguille électrique, ne laissant qu'une petite portion près de la tête pour ses autres organes internes.|この発電器官はデンキウナギの長い体のほとんどを占め、頭に近いごく一部だけがその他の内臓のために残されている。",
  ),
  q(
    8,
    "Colombia's national tree, found in the Cocora Valley and considered among the tallest palm species on Earth, can grow to over how many metres?|El árbol nacional de Colombia, presente en el valle de Cocora y considerado una de las especies de palmera más altas del planeta, puede crecer más de cuántos metros?|L'arbre national de la Colombie, que l'on trouve dans la vallée de Cocora et considéré comme l'une des plus hautes espèces de palmiers au monde, peut dépasser combien de mètres de hauteur ?|コロラ渓谷に生え、地球上でも屈指の高さを誇るヤシの一種とされるコロンビアの国樹は、何メートルを超える高さに育つことがあるか?",
    ["20 metres|20 metros|20 mètres|20メートル", "100 metres|100 metros|100 mètres|100メートル", "50 metres|50 metros|50 mètres|50メートル"],
    2,
    "The wax palm is named for the layer of wax that coats its trunk, once harvested for candles before the practice was banned to protect the now-endangered species.|La palma de cera debe su nombre a la capa de cera que recubre su tronco, antes recolectada para hacer velas hasta que la práctica se prohibió para proteger a esta especie hoy en peligro.|Le palmier à cire doit son nom à la couche de cire qui recouvre son tronc, autrefois récoltée pour fabriquer des bougies avant que la pratique ne soit interdite pour protéger cette espèce aujourd'hui menacée.|ワックスヤシは幹を覆う蝋の層にちなんで名付けられた。かつてはロウソクの材料として採取されていたが、いまや絶滅が危惧されるこの種を守るため、その慣行は禁じられている。",
  ),
  q(
    8,
    "The rhea, South America's largest bird, resembles an ostrich or emu but belongs to a completely separate bird family found only on which continent?|El ñandú, el ave más grande de Sudamérica, se parece a un avestruz o a un emú, pero pertenece a una familia de aves completamente distinta, presente solo en qué continente?|Le nandou, le plus grand oiseau d'Amérique du Sud, ressemble à une autruche ou à un émeu mais appartient à une famille d'oiseaux totalement distincte, présente uniquement sur quel continent ?|南米最大の鳥レアは、ダチョウやエミューに似ているが、まったく別の鳥類の科に属し、その科はどの大陸だけに見られるか?",
    ["South America|Sudamérica|L'Amérique du Sud|南アメリカ", "Africa|África|L'Afrique|アフリカ", "Australia|Australia|L'Australie|オーストラリア"],
    0,
    "The resemblance between rheas, ostriches and emus is a case of convergent evolution: unrelated flightless birds independently evolving similar body shapes for life on open ground.|El parecido entre ñandúes, avestruces y emúes es un caso de evolución convergente: aves no emparentadas e incapaces de volar que desarrollaron de forma independiente formas corporales similares para vivir en terreno abierto.|La ressemblance entre nandous, autruches et émeus est un cas d'évolution convergente : des oiseaux incapables de voler et sans lien de parenté ayant développé indépendamment des formes corporelles similaires pour vivre en terrain découvert.|レア・ダチョウ・エミューの姿が似ているのは収斂進化の一例である。互いに血縁のない飛べない鳥たちが、開けた土地で暮らすために独立して似た体形を進化させた結果である。",
  ),

  // --- 難易度9(+9) ---
  q(
    9,
    "The Nazca Lines, the ancient geoglyphs of Peru, were inscribed as a UNESCO World Heritage Site in which year?|Las Líneas de Nazca, los antiguos geoglifos del Perú, fueron inscritas como Patrimonio de la Humanidad de la UNESCO en qué año?|Les lignes de Nazca, les anciens géoglyphes du Pérou, ont été inscrites au patrimoine mondial de l'UNESCO en quelle année ?|ペルーの古代の地上絵、ナスカの地上絵がユネスコの世界遺産に登録されたのは何年か?",
    ["1983|1983|1983|1983年", "1994|1994|1994|1994年", "2003|2003|2003|2003年"],
    1,
    "The listing also covers the nearby lines of Palpa, an area with its own extensive network of geoglyphs discovered and studied somewhat later than the more famous Nazca figures.|La declaratoria también abarca las cercanas líneas de Palpa, una zona con su propia extensa red de geoglifos descubierta y estudiada algo más tarde que las más famosas figuras de Nazca.|Le classement couvre aussi les lignes voisines de Palpa, une zone dotée de son propre vaste réseau de géoglyphes, découverte et étudiée un peu plus tard que les figures plus célèbres de Nazca.|この登録には近隣のパルパの地上絵も含まれる。ナスカのより有名な図形よりやや遅れて発見・研究された、独自の広大な地上絵網を持つ地域である。",
  ),
  q(
    9,
    "Unlike lions or tigers, which typically kill by suffocating prey at the throat, jaguars often kill by biting directly through what?|A diferencia de los leones o tigres, que suelen matar asfixiando a la presa por el cuello, los jaguares suelen matar mordiendo directamente qué?|Contrairement aux lions ou aux tigres, qui tuent généralement en étouffant leur proie à la gorge, les jaguars tuent souvent en mordant directement quoi ?|喉を締め上げて獲物を窒息させることが多いライオンやトラと違い、ジャガーはしばしば何を直接噛み砕いて仕留めるか?",
    ["The tail|La cola|La queue|尾", "The ears|Las orejas|Les oreilles|耳", "The skull|El cráneo|Le crâne|頭蓋骨"],
    2,
    "This unusually strong, direct bite also lets jaguars pierce the armoured shells of turtles and caimans, prey that most other big cats could not easily eat.|Esta mordida directa y excepcionalmente fuerte también permite a los jaguares perforar los caparazones blindados de tortugas y caimanes, presas que la mayoría de los demás grandes felinos no podrían comer con facilidad.|Cette morsure directe et exceptionnellement puissante permet aussi aux jaguars de percer les carapaces blindées des tortues et des caïmans, des proies que la plupart des autres grands félins ne pourraient pas manger facilement.|この異例に強く直接的な噛みつきによって、ジャガーはカメやカイマンの硬い甲羅まで貫くことができる。これはほかの多くの大型ネコ科動物には容易に食べられない獲物である。",
  ),
  q(
    9,
    "During Peru's mid-19th-century guano boom, so lucrative the material was nicknamed \"white gold,\" what group is estimated to have supplied much of the harvesting labour, working in brutal conditions on the islands?|Durante el auge guanero del Perú a mediados del siglo XIX, tan lucrativo que el material fue apodado «oro blanco», ¿qué grupo se calcula que aportó buena parte de la mano de obra de extracción, trabajando en condiciones brutales en las islas?|Pendant le boom du guano péruvien au milieu du XIXe siècle, si lucratif que le matériau fut surnommé « l'or blanc », quel groupe aurait fourni une grande partie de la main-d'œuvre d'extraction, travaillant dans des conditions brutales sur les îles ?|「白い黄金」と呼ばれるほど利益の大きかった19世紀半ばのペルーのグアノ採掘ブームで、島での過酷な労働の多くを担ったとされる人々は?",
    ["Indentured Chinese labourers|Trabajadores chinos contratados en condición semiesclava|Des travailleurs chinois sous contrat de servitude|年季契約の中国人労働者", "Enslaved Africans|Africanos esclavizados|Des Africains réduits en esclavage|奴隷にされたアフリカ人", "European convict labourers|Presidiarios europeos|Des bagnards européens|ヨーロッパ人の囚人労働者"],
    0,
    "Tens of thousands of Chinese labourers were brought to Peru under contracts that in practice differed little from slavery, and many died from the harsh conditions on the guano islands.|Decenas de miles de trabajadores chinos fueron llevados a Perú bajo contratos que en la práctica se diferenciaban poco de la esclavitud, y muchos murieron por las duras condiciones en las islas guaneras.|Des dizaines de milliers de travailleurs chinois furent amenés au Pérou sous des contrats qui, dans la pratique, différaient peu de l'esclavage, et beaucoup moururent des conditions rudes sur les îles à guano.|数万人の中国人労働者が、実質的には奴隷制とほとんど変わらない契約のもとでペルーへ連れてこられ、グアノの島々の過酷な条件で多くが命を落とした。",
  ),
  q(
    9,
    "Túpac Amaru II, who led one of the largest Andean uprisings against Spanish colonial rule in 1780–1781, went by what birth name before adopting his Inca ancestor's name?|Túpac Amaru II, que encabezó uno de los mayores levantamientos andinos contra el dominio colonial español en 1780-1781, ¿qué nombre de nacimiento usaba antes de adoptar el de su antepasado inca?|Túpac Amaru II, qui mena l'un des plus grands soulèvements andins contre la domination coloniale espagnole en 1780-1781, portait quel nom de naissance avant d'adopter celui de son ancêtre inca ?|1780〜1781年、スペイン植民地支配に対するアンデス最大級の蜂起の一つを率いたトゥパク・アマル二世は、インカの祖先の名を名乗る前、生まれたときの名を何といったか?",
    ["Diego Cristóbal Túpac Amaru|Diego Cristóbal Túpac Amaru|Diego Cristóbal Túpac Amaru|ディエゴ・クリストバル・トゥパク・アマル", "José Gabriel Condorcanqui|José Gabriel Condorcanqui|José Gabriel Condorcanqui|ホセ・ガブリエル・コンドルカンキ", "Mateo Pumacahua|Mateo Pumacahua|Mateo Pumacahua|マテオ・プマカワ"],
    1,
    "The rebellion, though ultimately crushed, is remembered as one of the largest anti-colonial uprisings in the Americas before the independence wars of the early 19th century, and it drew support from Indigenous, mestizo and some criollo communities alike.|La rebelión, aunque finalmente aplastada, se recuerda como uno de los mayores levantamientos anticoloniales de América antes de las guerras de independencia de principios del siglo XIX, y atrajo el apoyo tanto de comunidades indígenas y mestizas como de algunos criollos.|La rébellion, bien que finalement écrasée, est retenue comme l'un des plus grands soulèvements anticoloniaux des Amériques avant les guerres d'indépendance du début du XIXe siècle, et rallia le soutien de communautés autochtones, métisses et de certains créoles.|この蜂起は最終的には鎮圧されたが、19世紀初頭の独立戦争以前では南北アメリカ大陸でも屈指の規模の反植民地蜂起として記憶されており、先住民・メスティーソ・一部のクリオージョの支持を集めた。",
  ),
  q(
    9,
    "In February 1819, Simón Bolívar delivered a famous address at the Congress of Angostura proposing the political union that soon became known as what?|En febrero de 1819, Simón Bolívar pronunció un célebre discurso ante el Congreso de Angostura proponiendo la unión política que pronto se conoció como qué?|En février 1819, Simón Bolívar prononça un célèbre discours devant le Congrès d'Angostura, proposant l'union politique bientôt connue sous quel nom ?|1819年2月、シモン・ボリバルはアンゴストゥーラ議会で有名な演説を行い、まもなく何と呼ばれるようになる政治的統合を提案した?",
    ["The Andean Pact|El Pacto Andino|Le Pacte andin|アンデス協定", "The Southern Confederation|La Confederación del Sur|La Confédération du Sud|南方連邦", "Gran Colombia|La Gran Colombia|La Grande Colombie|大コロンビア"],
    2,
    "Angostura, the city where the congress met, was later renamed Ciudad Bolívar in the liberator's honour and still sits on the banks of the Orinoco River.|Angostura, la ciudad donde se reunió el congreso, fue rebautizada más tarde como Ciudad Bolívar en honor al Libertador, y todavía se encuentra a orillas del río Orinoco.|Angostura, la ville où se réunit le congrès, fut plus tard rebaptisée Ciudad Bolívar en l'honneur du Libérateur, et se trouve toujours sur les rives de l'Orénoque.|議会が開かれた町アンゴストゥーラは、のちに解放者にちなんでシウダー・ボリバルと改名され、いまもオリノコ川のほとりにある。",
  ),
  q(
    9,
    "Which economic activity is generally identified as the single largest driver of forest loss in the Brazilian Amazon?|¿Qué actividad económica se identifica en general como el principal factor individual de la pérdida de bosque en la Amazonía brasileña?|Quelle activité économique est généralement considérée comme le principal facteur de perte forestière en Amazonie brésilienne ?|ブラジルのアマゾンで森林が失われる最大の単独の要因とされている経済活動は?",
    ["Cattle ranching|La ganadería|L'élevage bovin|牧牛", "Small-scale subsistence farming|La agricultura de subsistencia a pequeña escala|L'agriculture de subsistance à petite échelle|小規模な自給農業", "Logging for furniture wood|La tala para madera de muebles|L'exploitation forestière pour le bois d'ameublement|家具用材の伐採"],
    0,
    "Much of this cleared land is used for pasture only briefly before being abandoned or converted to cropland such as soybeans, a pattern researchers have tracked using satellite imagery for decades.|Buena parte de esta tierra despejada se usa como pastizal solo por poco tiempo antes de abandonarse o convertirse en tierra de cultivo, como soja, un patrón que los investigadores han seguido con imágenes satelitales durante décadas.|Une grande partie de ces terres défrichées ne sert de pâturage que brièvement avant d'être abandonnée ou convertie en terres cultivées, notamment pour le soja, un schéma que les chercheurs suivent par imagerie satellite depuis des décennies.|こうして切り開かれた土地の多くは短期間だけ牧草地として使われたのち放置されるか、大豆などの農地に転用される。この傾向は研究者たちが何十年にもわたり衛星画像で追跡してきたものである。",
  ),
  q(
    9,
    "Curare, a paralysing poison traditionally applied to blowgun darts by Indigenous Amazonian hunters, was later adapted for what modern medical use?|El curare, un veneno paralizante que los cazadores indígenas amazónicos aplicaban tradicionalmente a los dardos de cerbatana, se adaptó después para qué uso médico moderno?|Le curare, un poison paralysant traditionnellement appliqué sur les fléchettes de sarbacane par les chasseurs autochtones amazoniens, fut plus tard adapté pour quel usage médical moderne ?|アマゾンの先住民の狩人が伝統的に吹き矢の先に塗った麻痺性の毒クラーレは、のちにどんな現代医療の用途に応用されたか?",
    ["As a local anaesthetic for dental work|Como anestésico local para tratamientos dentales|Comme anesthésique local pour les soins dentaires|歯科治療の局所麻酔として", "As a muscle relaxant during surgery|Como relajante muscular durante cirugías|Comme relaxant musculaire pendant les opérations chirurgicales|外科手術中の筋弛緩剤として", "As an antiseptic for wounds|Como antiséptico para heridas|Comme antiseptique pour les plaies|傷の消毒薬として"],
    1,
    "Curare works by blocking signals between nerves and muscles, and purified derivatives of it are still used by anaesthesiologists today to keep patients still during operations.|El curare actúa bloqueando las señales entre nervios y músculos, y derivados purificados del mismo todavía los usan hoy los anestesiólogos para mantener quietos a los pacientes durante las operaciones.|Le curare agit en bloquant les signaux entre nerfs et muscles, et des dérivés purifiés en sont encore utilisés aujourd'hui par les anesthésistes pour maintenir les patients immobiles pendant les opérations.|クラーレは神経と筋肉のあいだの信号を遮断することで作用し、その精製された誘導体はいまも麻酔科医が手術中に患者を動かないようにするために使っている。",
  ),
  q(
    9,
    "According to the leading historical theory, Machu Picchu was built as a royal estate for which 15th-century Inca ruler?|Según la teoría histórica predominante, Machu Picchu se construyó como finca real para qué gobernante inca del siglo XV?|Selon la théorie historique dominante, le Machu Picchu fut construit comme domaine royal pour quel souverain inca du XVe siècle ?|有力な歴史学説によれば、マチュピチュは15世紀のどのインカの支配者の離宮として築かれたとされるか?",
    ["Huayna Cápac|Huayna Cápac|Huayna Cápac|ワイナ・カパック", "Manco Cápac|Manco Cápac|Manco Cápac|マンコ・カパック", "Pachacuti|Pachacútec|Pachacútec|パチャクテク"],
    2,
    "Pachacuti is credited with transforming the Inca state from a small regional kingdom into a vast empire through conquest and alliance-building in the mid-1400s.|A Pachacútec se le atribuye haber transformado el Estado inca de un pequeño reino regional en un vasto imperio mediante la conquista y la construcción de alianzas a mediados del siglo XV.|Pachacútec est crédité d'avoir transformé l'État inca d'un petit royaume régional en un vaste empire par la conquête et la construction d'alliances au milieu du XVe siècle.|パチャクテクは15世紀半ば、征服と同盟づくりを通じて、インカの国家を小さな地方王国から広大な帝国へと変えた人物とされている。",
  ),
  q(
    9,
    "Chile's Atacama nitrate-mining boom, which had powered entire towns since the 19th century, collapsed largely because German chemists developed an industrial process to synthesise what, using nitrogen from the air?|El auge de la minería del salitre en el Atacama chileno, que había sostenido pueblos enteros desde el siglo XIX, se derrumbó en gran parte porque químicos alemanes desarrollaron un proceso industrial para sintetizar qué, usando nitrógeno del aire?|Le boom minier du nitrate dans l'Atacama chilien, qui avait fait vivre des villes entières depuis le XIXe siècle, s'effondra en grande partie parce que des chimistes allemands mirent au point un procédé industriel pour synthétiser quoi, à partir de l'azote de l'air ?|19世紀以来いくつもの町を支えてきたチリ・アタカマの硝石採掘ブームは、ドイツの化学者たちが空気中の窒素から何を合成する工業的方法を開発したことで大きく衰退した。それは何か?",
    ["Ammonia, for synthetic fertiliser|Amoníaco, para fertilizante sintético|De l'ammoniac, pour un engrais de synthèse|化学肥料用のアンモニア", "Synthetic rubber|Caucho sintético|Du caoutchouc synthétique|合成ゴム", "Gunpowder|Pólvora|De la poudre à canon|火薬"],
    0,
    "The Haber-Bosch process, developed in the early 1910s, made nitrogen fertiliser cheaply and locally producible almost anywhere, and dozens of once-booming nitrate towns in the Atacama were abandoned within a few decades.|El proceso Haber-Bosch, desarrollado a principios de la década de 1910, permitió producir fertilizante nitrogenado de forma barata y local en casi cualquier lugar, y docenas de pueblos salitreros antes prósperos del Atacama quedaron abandonados en pocas décadas.|Le procédé Haber-Bosch, mis au point au début des années 1910, permit de produire un engrais azoté à bas coût et localement presque partout, et des dizaines de villes du salpêtre autrefois florissantes de l'Atacama furent abandonnées en quelques décennies.|1910年代初頭に開発されたハーバー・ボッシュ法は、窒素肥料をほぼどこでも安く現地生産できるようにし、かつて栄えたアタカマの硝石の町の数十か所が、数十年のうちに見捨てられることになった。",
  ),

  // --- 難易度10(+7) ---
  q(
    10,
    "Peru's Ferrocarril Central held the record as the world's highest standard-gauge railway for most of the 20th century. Which railway, opened in 2006, finally surpassed it?|El Ferrocarril Central del Perú tuvo el récord de ferrocarril de trocha ancha más alto del mundo durante la mayor parte del siglo XX. ¿Qué ferrocarril, inaugurado en 2006, lo superó por fin?|Le chemin de fer central du Pérou détint le record du chemin de fer à voie normale le plus élevé du monde pendant la majeure partie du XXe siècle. Quel chemin de fer, ouvert en 2006, finit par le surpasser ?|ペルーの中央鉄道は20世紀の大半、標高で世界一高い標準軌鉄道の記録を保持していた。2006年に開通し、ついにこの記録を上回った鉄道は?",
    ["The Trans-Siberian Railway|El ferrocarril Transiberiano|Le Transsibérien|シベリア鉄道", "The Qinghai–Tibet Railway|El ferrocarril Qinghai-Tíbet|Le chemin de fer Qinghai-Tibet|青蔵鉄道", "The Ghan Railway|El ferrocarril Ghan|Le chemin de fer Ghan|ガン鉄道"],
    1,
    "The Qinghai–Tibet Railway's Tanggula Pass station, at over 5,000 metres, now holds the title of the world's highest railway station of any gauge.|La estación del paso de Tanggula, en el ferrocarril Qinghai-Tíbet, a más de 5.000 metros, ostenta hoy el título de la estación ferroviaria más alta del mundo, de cualquier ancho de vía.|La gare du col de Tanggula, sur le chemin de fer Qinghai-Tibet, à plus de 5 000 mètres, détient aujourd'hui le titre de gare ferroviaire la plus haute au monde, tous écartements confondus.|青蔵鉄道のタングラ峠駅は標高5,000メートルを超え、いまや軌間を問わず世界でもっとも標高の高い鉄道駅の座にある。",
  ),
  q(
    10,
    "The Chinchorro culture of the Atacama coast practised deliberate mummification of their dead starting around 5000 BCE, making it older than which other famous mummification tradition?|La cultura chinchorro de la costa de Atacama practicó la momificación deliberada de sus muertos desde alrededor del año 5000 a.C., lo que la hace más antigua que qué otra célebre tradición de momificación?|La culture Chinchorro de la côte de l'Atacama pratiquait la momification délibérée de ses morts dès environ 5000 av. J.-C., ce qui en fait une tradition plus ancienne que quelle autre célèbre pratique de momification ?|アタカマ海岸のチンチョーロ文化は紀元前5000年頃から遺体の意図的なミイラ化を行っていた。これはどの著名なミイラ化の伝統よりも古いとされるか?",
    ["Ancient Chinese mummification|La momificación de la antigua China|La momification de la Chine antique|古代中国のミイラ化", "European bog-body preservation|La conservación en turberas europeas|La conservation dans les tourbières européennes|ヨーロッパの泥炭湿地でのミイラ化", "Ancient Egyptian mummification|La momificación del antiguo Egipto|La momification de l'Égypte antique|古代エジプトのミイラ化"],
    2,
    "Unlike the elaborate, resource-intensive mummification later practised for Egyptian royalty, Chinchorro mummification was applied broadly across the community, including infants and the elderly alike.|A diferencia de la elaborada y costosa momificación practicada más tarde para la realeza egipcia, la momificación chinchorro se aplicaba ampliamente en toda la comunidad, incluidos por igual bebés y ancianos.|Contrairement à la momification élaborée et coûteuse pratiquée plus tard pour la royauté égyptienne, la momification chinchorro s'appliquait largement à toute la communauté, y compris aux nourrissons comme aux personnes âgées.|のちにエジプトの王族に対して行われた手の込んだ、資源を要するミイラ化とは異なり、チンチョーロのミイラ化は乳児から高齢者まで、共同体全体に広く行われていた。",
  ),
  q(
    10,
    "The frozen Inca child sacrifice known as \"Juanita,\" or the \"Ice Maiden,\" was discovered in 1995 near the summit of a volcano in Peru by explorer Johan Reinhard. What was the mountain called?|El sacrificio infantil inca congelado conocido como «Juanita», o la «Dama de Hielo», fue descubierto en 1995 cerca de la cumbre de un volcán en Perú por el explorador Johan Reinhard. ¿Cómo se llamaba la montaña?|Le sacrifice d'enfant inca congelé connu sous le nom de « Juanita », ou la « Dame des glaces », fut découvert en 1995 près du sommet d'un volcan péruvien par l'explorateur Johan Reinhard. Comment s'appelait cette montagne ?|「フアニータ」あるいは「氷の乙女」として知られる、凍結したインカの生贄の少女は、1995年、探検家ヨハン・ラインハルトによってペルーのある火山の頂上付近で発見された。その山の名は?",
    ["Mount Ampato|El monte Ampato|Le mont Ampato|アンパト山", "Mount Chimborazo|El monte Chimborazo|Le mont Chimborazo|チンボラソ山", "Mount Aconcagua|El monte Aconcagua|Le mont Aconcagua|アコンカグア山"],
    0,
    "Juanita's remains were so well preserved by the cold that scientists could examine her stomach contents and determine what she had eaten in the hours before the ritual that killed her.|Los restos de Juanita se conservaron tan bien por el frío que los científicos pudieron examinar el contenido de su estómago y determinar qué había comido en las horas previas al ritual que acabó con su vida.|Les restes de Juanita furent si bien préservés par le froid que les scientifiques purent examiner le contenu de son estomac et déterminer ce qu'elle avait mangé dans les heures précédant le rituel qui la tua.|フアニータの遺体は寒さによってきわめて良好に保存されていたため、科学者たちは胃の内容物を調べ、彼女の命を奪った儀式の直前の数時間に何を食べていたかまで突き止めることができた。",
  ),
  q(
    10,
    "A controversial 1826 constitution promoted by Simón Bolívar for Bolivia and Gran Colombia included which provision that alarmed many of his former allies?|Una controvertida constitución de 1826 impulsada por Simón Bolívar para Bolivia y la Gran Colombia incluía qué disposición que alarmó a muchos de sus antiguos aliados?|Une constitution controversée de 1826, promue par Simón Bolívar pour la Bolivie et la Grande Colombie, comportait quelle disposition qui alarma nombre de ses anciens alliés ?|1826年、シモン・ボリバルがボリビアと大コロンビアのために推し進めた物議を醸す憲法には、かつての盟友の多くを不安にさせたどんな規定が含まれていたか?",
    ["The complete abolition of all elections|La abolición total de todas las elecciones|L'abolition totale de toutes les élections|あらゆる選挙の全廃", "A president holding office for life, with the power to name a successor|Un presidente vitalicio, con poder para nombrar a su sucesor|Un président à vie, avec le pouvoir de nommer son successeur|終身制で後継者を指名できる大統領", "A monarchy under a European prince|Una monarquía bajo un príncipe europeo|Une monarchie sous un prince européen|ヨーロッパの王子を戴く君主制"],
    1,
    "The lifetime-presidency proposal, sometimes called the \"Bolivian Code,\" struck many contemporaries as dangerously close to monarchy and fed growing suspicion of Bolívar's intentions in his final years.|La propuesta de presidencia vitalicia, a veces llamada el «Código Boliviano», les pareció a muchos contemporáneos peligrosamente cercana a una monarquía, y alimentó una sospecha creciente sobre las intenciones de Bolívar en sus últimos años.|La proposition de présidence à vie, parfois appelée le « Code bolivien », parut à beaucoup de contemporains dangereusement proche d'une monarchie, et nourrit une suspicion croissante envers les intentions de Bolívar dans ses dernières années.|「ボリビア法典」とも呼ばれるこの終身大統領制の提案は、多くの同時代人の目には君主制に危険なほど近く映り、晩年のボリバルの意図に対する疑念を強めることになった。",
  ),
  q(
    10,
    "Chan Chan, on Peru's northern coast, was the capital of the Chimú Kingdom and is considered the largest what in the pre-Columbian Americas?|Chan Chan, en la costa norte de Perú, fue la capital del reino chimú y se considera la mayor qué de la América precolombina?|Chan Chan, sur la côte nord du Pérou, fut la capitale du royaume chimú et est considérée comme la plus grande quoi de l'Amérique précolombienne ?|ペルー北部海岸にあったチャンチャンはチムー王国の都であり、コロンブス以前のアメリカ大陸で最大の何とされているか?",
    ["Stone-built fortress|Fortaleza de piedra|Forteresse en pierre|石造りの要塞", "Floating city|Ciudad flotante|Ville flottante|浮かぶ都市", "Adobe, or mud-brick, city|Ciudad de adobe|Ville en adobe (briques de terre crue)|日干しレンガの都市"],
    2,
    "The Chimú Kingdom, conquered by the Inca in the late 15th century not long before the Spanish arrived, was itself a major regional power known for skilled metalwork and an extensive irrigation system.|El reino chimú, conquistado por los incas a finales del siglo XV, poco antes de la llegada de los españoles, fue en sí mismo una gran potencia regional conocida por su hábil orfebrería y un extenso sistema de riego.|Le royaume chimú, conquis par les Incas à la fin du XVe siècle, peu avant l'arrivée des Espagnols, fut lui-même une puissance régionale majeure, réputée pour son orfèvrerie habile et un vaste système d'irrigation.|チムー王国は15世紀末、スペイン人が到来する少し前にインカに征服されたが、それ自体、巧みな金属細工と広大な灌漑網で知られる地域の大国だった。",
  ),
  q(
    10,
    "Tiwanaku's most famous monument, a gateway carved from a single block of stone and decorated with a central deity figure, is known by what name?|El monumento más famoso de Tiwanaku, una puerta tallada en un único bloque de piedra y decorada con una figura divina central, se conoce con qué nombre?|Le monument le plus célèbre de Tiwanaku, une porte taillée dans un seul bloc de pierre et ornée d'une figure divine centrale, est connu sous quel nom ?|一枚岩から彫られ、中央に神像が刻まれたティワナクでもっとも有名な建造物は、何と呼ばれているか?",
    ["The Gateway of the Sun|La Puerta del Sol|La Porte du Soleil|太陽の門", "The Gate of Serpents|La Puerta de las Serpientes|La Porte des Serpents|蛇の門", "The Portal of the Moon|El Portal de la Luna|Le Portail de la Lune|月の門"],
    0,
    "The gateway's central figure, sometimes identified as a staff-bearing deity, is surrounded by rows of smaller winged figures, and scholars still debate exactly what the full carving represented.|La figura central de la puerta, a veces identificada como una deidad portadora de bastones, está rodeada de filas de figuras aladas más pequeñas, y los estudiosos aún debaten qué representaba exactamente la talla completa.|La figure centrale de la porte, parfois identifiée comme une divinité tenant des bâtons, est entourée de rangées de plus petites figures ailées, et les chercheurs débattent encore de ce que représentait exactement la sculpture complète.|門の中央の像は、杖を持つ神格とも言われ、その周りには翼を持つ小さな像が並ぶ。この彫刻全体が正確に何を表していたのかは、いまも研究者のあいだで議論が続いている。",
  ),
  q(
    10,
    "The Atacama Desert, historically home to the Diaguita and Atacameño peoples, is prized today by scientists for hosting major astronomical observatories mainly because of what?|El desierto de Atacama, hogar histórico de los pueblos diaguita y atacameño, es hoy muy valorado por los científicos por albergar grandes observatorios astronómicos, sobre todo debido a qué?|Le désert d'Atacama, terre historique des peuples diaguita et atacameño, est aujourd'hui prisé des scientifiques pour abriter de grands observatoires astronomiques, principalement en raison de quoi ?|歴史的にディアギータ族やアタカメーニョ族が暮らしてきたアタカマ砂漠が、今日大規模な天文台の建設地として科学者に重宝されている主な理由は?",
    ["Unusually strong magnetic field readings|Lecturas de campo magnético inusualmente fuertes|Des relevés de champ magnétique inhabituellement forts|異例に強い磁場の観測値", "Its extremely dry air and clear, dark skies|Su aire extremadamente seco y sus cielos despejados y oscuros|Son air extrêmement sec et ses ciels dégagés et sombres|きわめて乾燥した空気と澄んだ暗い夜空", "Its close proximity to the equator|Su cercanía al ecuador|Sa proximité avec l'équateur|赤道への近さ"],
    1,
    "Facilities such as the ALMA array, built at over 5,000 metres on the Chajnantor plateau, take advantage of air so dry that water vapour barely interferes with observations of the universe.|Instalaciones como el conjunto ALMA, construido a más de 5.000 metros en la meseta de Chajnantor, aprovechan un aire tan seco que el vapor de agua apenas interfiere con las observaciones del universo.|Des installations comme le réseau ALMA, construit à plus de 5 000 mètres sur le plateau de Chajnantor, profitent d'un air si sec que la vapeur d'eau interfère à peine avec les observations de l'univers.|チャフナントール高原の標高5,000メートル超に建設されたALMA望遠鏡群のような施設は、水蒸気がほとんど観測の妨げにならないほど乾いた大気を活かしている。",
  ),
];
