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
];
