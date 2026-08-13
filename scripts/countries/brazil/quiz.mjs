/**
 * ブラジルのクイズ(38問)。
 *
 * 難易度は1〜10、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 文化・歴史に踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(50件)が扱った具体的な事実(マナウスの二つの川・サルバドールの
 * 奴隷貿易の数字・リオの遷都とサンバ発祥・サンパウロの日系社会と奴隷制廃止の年
 * (1888)・ウバトゥーバの大西洋岸森林の残存率など)はここでは問わない。
 * 代わりに、国全体の地理・歴史・言語・食・音楽・現代文化など、
 * **都市カードが個別の町に紐づけて扱っていない主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs brazil
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が概ね均等になるよう散らしてある
 * (0:12 / 1:12 / 2:14)。
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

export const BRAZIL_QUIZ = [
  q(
    1,
    "What language do Brazilians speak?|¿Qué idioma hablan los brasileños?|Quelle langue parlent les Brésiliens ?|ブラジルの人々が話す言語は?",
    [
      "Portuguese|Portugués|Portugais|ポルトガル語",
      "Spanish|Español|Espagnol|スペイン語",
      "French|Francés|Français|フランス語",
    ],
    0,
    "Brazil is the only Portuguese-speaking country in the Americas and by far the largest, with more native Portuguese speakers than Portugal itself.|Brasil es el único país de habla portuguesa en América y, con diferencia, el más grande, con más hablantes nativos de portugués que el propio Portugal.|Le Brésil est le seul pays lusophone des Amériques et de loin le plus grand, comptant plus de locuteurs natifs du portugais que le Portugal lui-même.|ブラジルはアメリカ大陸で唯一のポルトガル語圏の国であり、はるかに規模が大きく、母語話者数はポルトガル本国を上回る。",
  ),
  q(
    1,
    "What is Brazil's most popular sport?|¿Cuál es el deporte más popular de Brasil?|Quel est le sport le plus populaire au Brésil ?|ブラジルで最も人気のあるスポーツは?",
    [
      "Football (soccer)|Fútbol|Football (soccer)|サッカー",
      "Cricket|Críquet|Cricket|クリケット",
      "Baseball|Béisbol|Baseball|野球",
    ],
    0,
    "Football arrived with British railway workers and textile managers in the 1890s and took over as the national obsession within a generation.|El fútbol llegó con trabajadores ferroviarios y gerentes textiles británicos en la década de 1890 y se convirtió en la obsesión nacional en una generación.|Le football arriva avec des cheminots et cadres textiles britanniques dans les années 1890 et devint l'obsession nationale en une génération.|サッカーは1890年代、イギリス人の鉄道労働者や紡績工場の管理職とともに伝わり、一世代のうちに国民的な熱狂の対象となった。",
  ),
  q(
    2,
    "How many times has Brazil's men's team won the FIFA World Cup — more than any other country?|¿Cuántas veces ha ganado la selección masculina de Brasil el Mundial de la FIFA, más que ningún otro país?|Combien de fois l'équipe masculine du Brésil a-t-elle remporté la Coupe du monde de la FIFA, plus que tout autre pays ?|ブラジルの男子代表は、どの国よりも多くFIFAワールドカップで優勝しているが、その回数は?",
    [
      "Three times|Tres veces|Trois fois|3回",
      "Seven times|Siete veces|Sept fois|7回",
      "Five times|Cinco veces|Cinq fois|5回",
    ],
    2,
    "Brazil is the only team to have played in every World Cup since the tournament began in 1930, and its five titles (1958, 1962, 1970, 1994, 2002) remain unmatched.|Brasil es el único equipo que ha jugado todos los Mundiales desde que comenzó el torneo en 1930, y sus cinco títulos (1958, 1962, 1970, 1994, 2002) siguen sin igual.|Le Brésil est la seule équipe à avoir disputé chaque Coupe du monde depuis la création du tournoi en 1930, et ses cinq titres (1958, 1962, 1970, 1994, 2002) restent inégalés.|ブラジルは1930年の第1回大会以来、すべてのワールドカップに出場している唯一のチームで、5度の優勝(1958・1962・1970・1994・2002年)はいまも他国の追随を許さない。",
  ),
  q(
    2,
    "What is the dominant background colour of the Brazilian flag?|¿Cuál es el color de fondo dominante de la bandera brasileña?|Quelle est la couleur de fond dominante du drapeau brésilien ?|ブラジル国旗の背景の主な色は?",
    [
      "Blue|Azul|Bleu|青",
      "Red|Rojo|Rouge|赤",
      "Green|Verde|Vert|緑",
    ],
    2,
    "The green field and yellow rhombus are said to echo the House of Braganza and House of Habsburg colours of the imperial family, while the blue globe carries the night sky over Rio on 15 November 1889.|Se dice que el campo verde y el rombo amarillo evocan los colores de las casas de Braganza y Habsburgo de la familia imperial, mientras que el globo azul lleva el cielo nocturno de Río del 15 de noviembre de 1889.|Le champ vert et le losange jaune évoqueraient les couleurs des maisons de Bragance et de Habsbourg de la famille impériale, tandis que le globe bleu porte le ciel nocturne de Rio du 15 novembre 1889.|緑の地と黄色の菱形は、皇室のブラガンサ家とハプスブルク家の色にちなむとされ、中央の青い天球には1889年11月15日夜のリオの空が描かれている。",
  ),
  q(
    2,
    "What river system covers much of northern Brazil?|¿Qué sistema fluvial cubre buena parte del norte de Brasil?|Quel système fluvial couvre une grande partie du nord du Brésil ?|ブラジル北部の大半を覆う河川系は?",
    [
      "The Nile|El Nilo|Le Nil|ナイル川",
      "The Mississippi|El Misisipi|Le Mississippi|ミシシッピ川",
      "The Amazon|El Amazonas|L'Amazone|アマゾン川",
    ],
    2,
    "The Amazon carries more water than the next seven largest rivers in the world combined, and roughly 60% of the river basin lies within Brazil.|El Amazonas transporta más agua que los siete ríos siguientes más caudalosos del mundo juntos, y cerca del 60% de la cuenca se encuentra en Brasil.|L'Amazone transporte plus d'eau que les sept fleuves suivants les plus importants du monde réunis, et environ 60 % du bassin se trouve au Brésil.|アマゾン川は、それに次ぐ世界の大河7本を合わせたよりも多くの水を運び、流域のおよそ60%がブラジル国内にある。",
  ),
  q(
    2,
    "Which world-famous beach is in Rio de Janeiro?|¿Qué playa mundialmente famosa está en Río de Janeiro?|Quelle plage mondialement célèbre se trouve à Rio de Janeiro ?|リオデジャネイロにある世界的に有名な浜辺は?",
    [
      "Copacabana|Copacabana|Copacabana|コパカバーナ",
      "Waikiki|Waikiki|Waikiki|ワイキキ",
      "Bondi|Bondi|Bondi|ボンダイ",
    ],
    0,
    "Copacabana's black-and-white wave-patterned pavement, laid in the 1970s, was itself modelled on a much older mosaic promenade in Lisbon.|El pavimento de Copacabana con su patrón de olas en blanco y negro, colocado en los años setenta, se inspiró a su vez en un paseo de mosaico mucho más antiguo de Lisboa.|Le pavage à motif de vagues noir et blanc de Copacabana, posé dans les années 1970, s'inspira lui-même d'une promenade en mosaïque bien plus ancienne à Lisbonne.|1970年代に敷かれたコパカバーナの白黒の波模様の石畳は、リスボンにあるさらに古いモザイクの遊歩道を手本にしたものである。",
  ),
  q(
    3,
    "What is Brazil's currency called?|¿Cómo se llama la moneda de Brasil?|Comment s'appelle la monnaie du Brésil ?|ブラジルの通貨の名前は?",
    [
      "Peso|Peso|Peso|ペソ",
      "Bolívar|Bolívar|Bolivar|ボリバル",
      "Real|Real|Real|レアル",
    ],
    2,
    "The real was introduced in 1994 as the final step of a stabilisation plan that ended a stretch of hyperinflation so severe that prices had sometimes been repriced daily.|El real se introdujo en 1994 como paso final de un plan de estabilización que puso fin a un período de hiperinflación tan severa que a veces los precios se reajustaban a diario.|Le real fut introduit en 1994 comme étape finale d'un plan de stabilisation qui mit fin à une période d'hyperinflation si sévère que les prix étaient parfois réajustés quotidiennement.|レアルは1994年、日によっては毎日値段が付け替えられるほど深刻だったハイパーインフレを終わらせる安定化計画の最終段階として導入された。",
  ),
  q(
    3,
    "Feijoada, Brazil's national stew, is traditionally built around black beans and which meat?|La feijoada, el guiso nacional de Brasil, se hace tradicionalmente con frijoles negros y qué carne?|La feijoada, le ragoût national du Brésil, se prépare traditionnellement avec des haricots noirs et quelle viande ?|ブラジルの国民的な煮込み料理フェイジョアーダは、黒インゲン豆と何の肉を組み合わせて作られるか?",
    [
      "Chicken|Pollo|Poulet|鶏肉",
      "Tofu|Tofu|Tofu|豆腐",
      "Pork|Cerdo|Porc|豚肉",
    ],
    2,
    "Various cuts and cured parts of pork simmer for hours with the beans, and the dish is traditionally served on Wednesdays and Saturdays with rice, collard greens and orange slices.|Diversos cortes y partes curadas del cerdo se cuecen durante horas con las alubias, y el plato se sirve tradicionalmente los miércoles y sábados con arroz, col rizada y naranja.|Diverses pièces et morceaux salés de porc mijotent des heures avec les haricots, et le plat se sert traditionnellement le mercredi et le samedi avec du riz, du chou vert et des tranches d'orange.|豚肉のさまざまな部位や塩漬け肉が豆と何時間も煮込まれ、伝統的には水曜と土曜に、米・青菜・オレンジの薄切りを添えて出される。",
  ),
  q(
    3,
    "What is Rio de Janeiro's purpose-built stadium-like avenue where samba schools compete each Carnival?|¿Cómo se llama la avenida con gradas de Río donde compiten las escuelas de samba cada Carnaval?|Comment s'appelle l'avenue en forme de stade de Rio où s'affrontent les écoles de samba à chaque Carnaval ?|カーニバルのたびにサンバ学校が競うために作られた、リオの競技場のような大通りは?",
    [
      "Maracanã|Maracaná|Maracanã|マラカナン",
      "Copacabana|Copacabana|Copacabana|コパカバーナ",
      "Sambadrome|Sambódromo|Sambódromo|サンボードロモ",
    ],
    2,
    "Designed by Oscar Niemeyer and opened in 1984, the Sambadrome seats around 70,000 spectators along a 700-metre parade strip that samba schools spend all year preparing floats for.|Diseñado por Oscar Niemeyer e inaugurado en 1984, el Sambódromo tiene capacidad para unos 70.000 espectadores a lo largo de una franja de desfile de 700 metros, para la que las escuelas de samba preparan carrozas todo el año.|Conçu par Oscar Niemeyer et inauguré en 1984, le Sambódromo peut accueillir environ 70 000 spectateurs le long d'une bande de défilé de 700 mètres, pour laquelle les écoles de samba préparent des chars toute l'année.|オスカー・ニーマイヤーが設計し1984年に開場したサンボードロモは、約7万人を収容でき、全長700mのパレード用の帯に沿って作られている。サンバ学校はここでの行進のため一年をかけて山車を準備する。",
  ),
  q(
    3,
    "A tree once prized in Europe for its red dye gave Brazil its name. What is it called?|Un árbol antaño apreciado en Europa por su tinte rojo dio su nombre a Brasil. ¿Cómo se llama?|Un arbre jadis prisé en Europe pour sa teinture rouge donna son nom au Brésil. Comment s'appelle-t-il ?|かつてヨーロッパで赤い染料として珍重された木がブラジルの国名の由来になった。その木の名は?",
    [
      "Pau-brasil (brazilwood)|Pau-brasil (palo brasil)|Pau-brasil (bois-brésil)|パウ・ブラジル(ブラジルボク)",
      "Mahogany|Caoba|Acajou|マホガニー",
      "Teak|Teca|Teck|チーク",
    ],
    0,
    "Portuguese traders exported so much pau-brasil, valued for the red dye extracted from its heartwood, that the colony came to be called simply Brazil instead of the name colonisers first gave it, Terra de Santa Cruz. So much was cut that the tree is now endangered, though its wood remains the traditional choice for violin and cello bows.|Los comerciantes portugueses exportaron tanto pau-brasil, valorado por el tinte rojo extraído de su duramen, que la colonia pasó a llamarse simplemente Brasil en vez del nombre que le dieron primero los colonizadores, Terra de Santa Cruz. Se taló tanto que el árbol está hoy en peligro, aunque su madera sigue siendo la elección tradicional para arcos de violín y violonchelo.|Les marchands portugais exportèrent tant de pau-brasil, apprécié pour la teinture rouge extraite de son bois de cœur, que la colonie finit par être simplement appelée Brésil plutôt que le nom que les colonisateurs lui avaient d'abord donné, Terra de Santa Cruz. Il fut si abondamment coupé que l'arbre est aujourd'hui menacé, bien que son bois reste le choix traditionnel pour les archets de violon et de violoncelle.|ポルトガル商人は、心材から採れる赤い染料が珍重されたパウ・ブラジルをあまりに大量に輸出したため、この植民地は入植者が最初につけた「聖十字架の地」という名ではなく、単に「ブラジル」と呼ばれるようになった。伐採されすぎたいまでは絶滅危惧種だが、その木材はいまもバイオリンやチェロの弓の伝統的な材料であり続けている。",
  ),
  q(
    3,
    "Which Brazilian driver, a three-time Formula 1 world champion, died in a crash at Imola in 1994?|¿Qué piloto brasileño, tricampeón mundial de Fórmula 1, murió en un accidente en Imola en 1994?|Quel pilote brésilien, triple champion du monde de Formule 1, mourut dans un accident à Imola en 1994 ?|1994年にイモラでの事故で亡くなった、F1三冠のブラジル人ドライバーは?",
    [
      "Pelé|Pelé|Pelé|ペレ",
      "Nelson Piquet|Nelson Piquet|Nelson Piquet|ネルソン・ピケ",
      "Ayrton Senna|Ayrton Senna|Ayrton Senna|アイルトン・セナ",
    ],
    2,
    "Senna's death was declared a day of national mourning in Brazil, and the São Paulo circuit where he first raced, Interlagos, still hosts the Brazilian Grand Prix.|La muerte de Senna se declaró día de luto nacional en Brasil, y el circuito de São Paulo donde corrió por primera vez, Interlagos, aún acoge el Gran Premio de Brasil.|La mort de Senna fut déclarée jour de deuil national au Brésil, et le circuit de São Paulo où il courut pour la première fois, Interlagos, accueille toujours le Grand Prix du Brésil.|セナの死はブラジルで国の喪の日とされ、彼が最初にレースをしたサンパウロのインテルラゴス・サーキットは、いまもブラジルグランプリの開催地となっている。",
  ),
  q(
    4,
    "What is the famous Art Deco statue overlooking Rio de Janeiro from Corcovado mountain?|¿Cuál es la famosa estatua Art Déco que domina Río de Janeiro desde el monte Corcovado?|Quelle est la célèbre statue Art déco qui domine Rio de Janeiro depuis le mont Corcovado ?|コルコバードの丘からリオデジャネイロを見下ろす、有名なアール・デコ様式の像は?",
    [
      "Christ the Redeemer|El Cristo Redentor|Le Christ Rédempteur|コルコバードのキリスト像",
      "The Statue of Liberty|La Estatua de la Libertad|La Statue de la Liberté|自由の女神像",
      "The Angel of Independence|El Ángel de la Independencia|L'Ange de l'Indépendance|独立の天使像",
    ],
    0,
    "Completed in 1931 with reinforced concrete and a soapstone covering, the statue's open arms span 28 metres and it was voted one of the New Seven Wonders of the World in 2007.|Terminada en 1931 con hormigón armado y revestimiento de esteatita, sus brazos abiertos miden 28 metros y en 2007 fue votada una de las nuevas siete maravillas del mundo.|Achevée en 1931 en béton armé recouvert de stéatite, la statue déploie ses bras sur 28 mètres et fut élue en 2007 l'une des nouvelles sept merveilles du monde.|1931年に鉄筋コンクリートに石鹸石を張って完成したこの像は、広げた両腕の幅が28mに及び、2007年には新・世界七不思議の一つに選ばれた。",
  ),
  q(
    4,
    "Brazil was a colony of which European country until 1822?|¿De qué país europeo fue colonia Brasil hasta 1822?|Le Brésil fut la colonie de quel pays européen jusqu'en 1822 ?|1822年までブラジルはどのヨーロッパの国の植民地だったか?",
    [
      "Spain|España|Espagne|スペイン",
      "Portugal|Portugal|Portugal|ポルトガル",
      "France|Francia|France|フランス",
    ],
    1,
    "Portuguese colonisation began in earnest in the 1530s with hereditary land grants along the coast, and Portuguese remains the clearest inheritance of that three-century rule.|La colonización portuguesa comenzó en serio en la década de 1530 con concesiones de tierras hereditarias a lo largo de la costa, y el portugués sigue siendo la herencia más clara de esos tres siglos de dominio.|La colonisation portugaise commença sérieusement dans les années 1530 avec des concessions de terres héréditaires le long de la côte, et le portugais demeure l'héritage le plus net de ces trois siècles de domination.|ポルトガルによる本格的な植民地化は1530年代、沿岸に世襲の領地を与える形で始まり、ポルトガル語はその三世紀に及ぶ支配の中で最も明確に残った遺産である。",
  ),
  q(
    4,
    "Açaí, the dark purple berry eaten frozen in bowls worldwide, is native to which part of Brazil?|El açaí, la baya morada que se come helada en bowls por todo el mundo, es originario de qué parte de Brasil?|L'açaí, cette baie violet foncé consommée glacée en bols dans le monde entier, est originaire de quelle partie du Brésil ?|世界各地でボウルに入れ凍らせて食べられる濃い紫色の実、アサイーの原産地はブラジルのどこか?",
    [
      "The Amazon|La Amazonía|L'Amazonie|アマゾン",
      "The southern pampas|Las pampas del sur|Les pampas du sud|南部のパンパ",
      "The northeastern coast|La costa nordeste|La côte du Nordeste|北東部の海岸",
    ],
    0,
    "The berry grows on a palm tree native to the Amazon floodplain, and until the 1990s it was mostly a regional staple in Pará before international demand turned it into a global export.|La baya crece en una palmera propia de la llanura inundable amazónica, y hasta los años noventa era sobre todo un alimento básico regional en Pará antes de que la demanda internacional la convirtiera en exportación global.|La baie pousse sur un palmier propre à la plaine inondable amazonienne, et jusque dans les années 1990, elle restait surtout un aliment de base régional au Pará avant que la demande internationale n'en fasse une exportation mondiale.|この実はアマゾンの氾濫原に自生するヤシの木になり、1990年代までは主にパラー州の地域の主食だったが、その後の国際的な需要の高まりで世界的な輸出品となった。",
  ),
  q(
    4,
    "What is capoeira, developed by enslaved Africans in Brazil and now practised worldwide?|¿Qué es la capoeira, desarrollada por africanos esclavizados en Brasil y practicada hoy en todo el mundo?|Qu'est-ce que la capoeira, développée par des Africains réduits en esclavage au Brésil et aujourd'hui pratiquée dans le monde entier ?|ブラジルで奴隷にされたアフリカ人によって生み出され、いまや世界中で実践されているカポエイラとは何か?",
    [
      "A form of judo|Una forma de judo|Une forme de judo|柔道の一種",
      "A martial art disguised as dance, with music and acrobatics|Un arte marcial disfrazado de danza, con música y acrobacias|Un art martial déguisé en danse, avec musique et acrobaties|音楽とアクロバットを伴う、踊りに見せかけた武術",
      "A form of Muay Thai|Una forma de muay thai|Une forme de muay-thaï|ムエタイの一種",
    ],
    1,
    "Played inside a circle called a roda to the sound of the berimbau, a single-string bow instrument, capoeira blends kicks, sweeps and near-constant movement with singers calling out its rhythm.|Practicada dentro de un círculo llamado roda al son del berimbau, un instrumento de arco de una sola cuerda, la capoeira combina patadas, barridas y un movimiento casi constante con cantantes que marcan su ritmo.|Pratiquée dans un cercle appelé roda au son du berimbau, un instrument à arc à une seule corde, la capoeira mêle coups de pied, balayages et mouvement quasi constant, avec des chanteurs qui en scandent le rythme.|「ホーダ」と呼ばれる輪の中で、一本弦の弓型楽器ベリンバウの音に合わせて行われるカポエイラは、蹴りや足払い、ほぼ絶え間ない動きを組み合わせ、歌い手がその律動を導く。",
  ),
  q(
    4,
    "What is the world's largest rodent, commonly seen grazing near Brazil's rivers and wetlands?|¿Cuál es el roedor más grande del mundo, habitual junto a los ríos y humedales de Brasil?|Quel est le plus grand rongeur du monde, fréquemment observé près des rivières et zones humides du Brésil ?|ブラジルの川や湿地帯の近くでよく見られる、世界最大のげっ歯類は?",
    [
      "The beaver|El castor|Le castor|ビーバー",
      "The groundhog|La marmota|La marmotte|グラウンドホッグ",
      "The capybara|El carpincho|Le cabiaï|カピバラ",
    ],
    2,
    "An adult capybara can weigh over 60 kilograms, and the animals live in social groups that graze on riverbank grasses and are famously calm around other species, including humans.|Un carpincho adulto puede pesar más de 60 kilos, y estos animales viven en grupos sociales que pastan en las orillas de los ríos y son famosos por su calma frente a otras especies, incluidos los humanos.|Un cabiaï adulte peut peser plus de 60 kilos, et ces animaux vivent en groupes sociaux broutant l'herbe des berges, réputés pour leur calme face aux autres espèces, y compris les humains.|成体のカピバラは体重60kgを超えることもあり、川岸の草を食む社会的な群れで暮らし、人間を含む他の種に対しても穏やかなことで知られる。",
  ),
  q(
    4,
    "What is Brazil's official long-form name?|¿Cuál es el nombre oficial completo de Brasil?|Quel est le nom officiel complet du Brésil ?|ブラジルの正式な国名は?",
    [
      "The United States of Brazil|Los Estados Unidos de Brasil|Les États-Unis du Brésil|ブラジル合衆国",
      "The Federative Republic of Brazil|República Federativa de Brasil|République fédérative du Brésil|ブラジル連邦共和国",
      "The Kingdom of Brazil|El Reino de Brasil|Le Royaume du Brésil|ブラジル王国",
    ],
    1,
    "The current name dates to the 1967 constitution; before that, from 1889, the country was formally called the United States of Brazil, echoing its federal structure of states.|El nombre actual data de la constitución de 1967; antes, desde 1889, el país se llamaba formalmente Estados Unidos de Brasil, en eco de su estructura federal de estados.|Le nom actuel date de la constitution de 1967 ; avant cela, dès 1889, le pays s'appelait officiellement les États-Unis du Brésil, en écho à sa structure fédérale d'États.|現在の国名は1967年憲法に由来する。それ以前、1889年からは連邦制の州構成にちなみ「ブラジル合衆国」を正式名としていた。",
  ),
  q(
    4,
    "What is Brazil's largest religion by number of adherents?|¿Cuál es la religión con más fieles en Brasil?|Quelle est la religion la plus pratiquée au Brésil ?|ブラジルで信者数が最も多い宗教は?",
    [
      "Islam|Islam|Islam|イスラム教",
      "Roman Catholicism|Catolicismo romano|Catholicisme romain|ローマ・カトリック",
      "Buddhism|Budismo|Bouddhisme|仏教",
    ],
    1,
    "Brazil has historically had the largest Catholic population of any country on Earth, though evangelical Protestant churches have grown rapidly enough in recent decades to reshape the country's religious map.|Brasil ha tenido históricamente la mayor población católica del planeta, aunque las iglesias evangélicas protestantes han crecido lo bastante rápido en las últimas décadas como para remodelar el mapa religioso del país.|Le Brésil a historiquement compté la plus grande population catholique de la planète, bien que les églises évangéliques protestantes aient connu une croissance assez rapide ces dernières décennies pour redessiner la carte religieuse du pays.|ブラジルは歴史的に世界最大のカトリック人口を抱えてきたが、近年は福音派プロテスタント教会が急速に伸び、国の宗教地図を塗り替えつつある。",
  ),
  q(
    5,
    "What is Brazil's national cocktail, made from cachaça, lime and sugar?|¿Cuál es el cóctel nacional de Brasil, hecho con cachaça, lima y azúcar?|Quel est le cocktail national du Brésil, à base de cachaça, citron vert et sucre ?|カシャーサとライム、砂糖で作るブラジルの国民的カクテルは?",
    [
      "Mojito|Mojito|Mojito|モヒート",
      "Caipirinha|Caipirinha|Caipirinha|カイピリーニャ",
      "Piña colada|Piña colada|Piña colada|ピニャコラーダ",
    ],
    1,
    "Cachaça, the sugarcane spirit at its base, predates rum as a distilled drink in the Americas and was originally distilled by enslaved workers on colonial sugar plantations.|La cachaça, el aguardiente de caña de azúcar que le da base, es anterior al ron como bebida destilada en América y fue destilada originalmente por trabajadores esclavizados en las plantaciones coloniales de azúcar.|La cachaça, l'eau-de-vie de canne à sucre qui en constitue la base, précède le rhum comme boisson distillée dans les Amériques et fut d'abord distillée par des travailleurs réduits en esclavage sur les plantations sucrières coloniales.|土台となる蒸留酒カシャーサは、アメリカ大陸のラム酒より古い蒸留酒とされ、もともとは植民地時代のサトウキビ農園で奴隷にされた労働者によって蒸留されていた。",
  ),
  q(
    5,
    "Guaraná, the flavour behind one of Brazil's most popular soft drinks, comes from what?|El guaraná, el sabor de uno de los refrescos más populares de Brasil, procede de qué?|Le guarana, l'arôme de l'une des boissons gazeuses les plus populaires du Brésil, provient de quoi ?|ブラジルで人気の高い清涼飲料水の風味のもとになっているガラナは、何に由来するか?",
    [
      "A citrus fruit|Un cítrico|Un agrume|柑橘類",
      "A berry native to the Amazon|Una baya nativa de la Amazonía|Une baie native d'Amazonie|アマゾン原産の木の実",
      "A type of coffee bean|Un tipo de grano de café|Un type de grain de café|コーヒー豆の一種",
    ],
    1,
    "Indigenous Amazonian peoples used guaraná seeds, which contain roughly twice the caffeine of coffee beans by weight, long before the plant was bottled into a national soft drink brand.|Los pueblos indígenas de la Amazonía usaban las semillas de guaraná, que contienen aproximadamente el doble de cafeína que el café en peso, mucho antes de que la planta se embotellara como marca nacional de refresco.|Les peuples autochtones d'Amazonie utilisaient les graines de guarana, qui contiennent environ deux fois plus de caféine que le café à poids égal, bien avant que la plante ne soit mise en bouteille comme marque nationale de soda.|アマゾンの先住民は、重量あたりコーヒー豆のおよそ2倍のカフェインを含むガラナの種を、この植物が瓶詰めの国民的清涼飲料水になるはるか以前から使っていた。",
  ),
  q(
    5,
    "Which Brazilian footballer, who played for Santos, is widely considered among the greatest ever and won three World Cups?|¿Qué futbolista brasileño, que jugó en el Santos, está considerado entre los mejores de la historia y ganó tres Mundiales?|Quel footballeur brésilien, qui a joué pour Santos, est considéré parmi les plus grands de tous les temps et a remporté trois Coupes du monde ?|サントスでプレーし、史上最高の選手の一人とされ、ワールドカップを三度制した選手は?",
    [
      "Neymar|Neymar|Neymar|ネイマール",
      "Ronaldinho|Ronaldinho|Ronaldinho|ロナウジーニョ",
      "Pelé|Pelé|Pelé|ペレ",
    ],
    2,
    "Pelé signed with Santos at 15 and won World Cups in 1958, 1962 and 1970, and remains the only player to have won the tournament three times.|Pelé firmó con el Santos a los 15 años y ganó Mundiales en 1958, 1962 y 1970, y sigue siendo el único jugador que ha ganado el torneo tres veces.|Pelé signa avec Santos à 15 ans et remporta la Coupe du monde en 1958, 1962 et 1970, restant le seul joueur à avoir gagné le tournoi à trois reprises.|ペレは15歳でサントスと契約し、1958年・1962年・1970年にワールドカップで優勝した。三度優勝を果たした選手はいまも彼一人だけである。",
  ),
  q(
    5,
    "In what year did Brazil declare independence from Portugal?|¿En qué año declaró Brasil su independencia de Portugal?|En quelle année le Brésil déclara-t-il son indépendance du Portugal ?|ブラジルがポルトガルから独立を宣言したのは何年か?",
    [
      "1822|1822|1822|1822年",
      "1889|1889|1889|1889年",
      "1500|1500|1500|1500年",
    ],
    0,
    "Prince regent Pedro is said to have proclaimed independence beside the Ipiranga stream near São Paulo with the cry \"Independência ou morte!\" — independence or death.|Se dice que el príncipe regente Pedro proclamó la independencia junto al arroyo Ipiranga, cerca de São Paulo, con el grito «¡Independência ou morte!»: independencia o muerte.|Le prince régent Pierre aurait proclamé l'indépendance au bord du ruisseau Ipiranga, près de São Paulo, avec le cri « Independência ou morte ! » — l'indépendance ou la mort.|摂政皇太子ペドロは、サンパウロ近郊のイピランガ川のほとりで「独立か死か!」と叫び独立を宣言したと伝えられる。",
  ),
  q(
    5,
    "What shape holds the stars on the Brazilian flag?|¿Qué forma contiene las estrellas de la bandera brasileña?|Quelle forme porte les étoiles du drapeau brésilien ?|ブラジル国旗の星が描かれているのはどんな形か?",
    [
      "A circle|Un círculo|Un cercle|円",
      "A rhombus (diamond)|Un rombo|Un losange|菱形(ダイヤ形)",
      "A triangle|Un triángulo|Un triangle|三角形",
    ],
    1,
    "The 27 stars inside the blue globe represent the states plus the Federal District, arranged to mirror the sky over Rio on the night the republic was proclaimed.|Las 27 estrellas dentro del globo azul representan los estados más el Distrito Federal, dispuestas para reflejar el cielo sobre Río la noche en que se proclamó la república.|Les 27 étoiles à l'intérieur du globe bleu représentent les États plus le District fédéral, disposées pour refléter le ciel au-dessus de Rio la nuit où la république fut proclamée.|青い天球の中の27個の星は、各州と連邦区を表しており、共和制が宣言された夜のリオの空を再現するように配置されている。",
  ),
  q(
    6,
    "Which Brazilian author wrote \"Dom Casmurro\" and is considered one of the greatest writers in the Portuguese language?|¿Qué escritor brasileño escribió «Dom Casmurro» y está considerado uno de los mayores autores en lengua portuguesa?|Quel écrivain brésilien a écrit « Dom Casmurro » et est considéré comme l'un des plus grands auteurs de langue portugaise ?|『ドン・カズムッホ』を書き、ポルトガル語文学屈指の作家とされるブラジルの作家は?",
    [
      "Jorge Amado|Jorge Amado|Jorge Amado|ジョルジ・アマード",
      "Machado de Assis|Machado de Assis|Machado de Assis|マシャード・ジ・アシス",
      "Paulo Coelho|Paulo Coelho|Paulo Coelho|パウロ・コエーリョ",
    ],
    1,
    "Born in Rio in 1839 to a mixed-race father and a washerwoman, Machado de Assis rose from poverty to found and preside over the Brazilian Academy of Letters.|Nacido en Río en 1839, hijo de un padre mestizo y una lavandera, Machado de Assis salió de la pobreza para fundar y presidir la Academia Brasileña de Letras.|Né à Rio en 1839 d'un père métis et d'une blanchisseuse, Machado de Assis sortit de la pauvreté pour fonder et présider l'Académie brésilienne des lettres.|1839年、混血の父と洗濯婦の母のもとリオに生まれたマシャード・ジ・アシスは、貧困から身を起こし、ブラジル文学アカデミーを創設してその初代総裁を務めた。",
  ),
  q(
    6,
    "Which Portuguese navigator is credited with reaching Brazil's coast in 1500?|¿Qué navegante portugués llegó a la costa de Brasil en 1500?|Quel navigateur portugais est crédité d'avoir atteint la côte brésilienne en 1500 ?|1500年にブラジルの海岸に到達したポルトガル人航海者は?",
    [
      "Vasco da Gama|Vasco da Gama|Vasco de Gama|ヴァスコ・ダ・ガマ",
      "Ferdinand Magellan|Fernando de Magallanes|Fernand de Magellan|フェルディナンド・マゼラン",
      "Pedro Álvares Cabral|Pedro Álvares Cabral|Pedro Álvares Cabral|ペドロ・アルヴァレス・カブラル",
    ],
    2,
    "Cabral's fleet was sailing for India by a wide Atlantic route when it sighted land near what is now southern Bahia, and he claimed the territory for the Portuguese crown.|La flota de Cabral navegaba hacia la India por una ruta atlántica muy amplia cuando avistó tierra cerca de lo que hoy es el sur de Bahía, y reclamó el territorio para la corona portuguesa.|La flotte de Cabral faisait route vers l'Inde par une large route atlantique lorsqu'elle aperçut la terre près de l'actuel sud de Bahia, et il revendiqua le territoire pour la couronne portugaise.|カブラルの船団は大西洋を大きく迂回してインドを目指す途中、現在のバイーア州南部付近に陸地を発見し、この地をポルトガル王室の領有として宣言した。",
  ),
  q(
    6,
    "In what year was Brazil's monarchy abolished and the republic proclaimed?|¿En qué año se abolió la monarquía brasileña y se proclamó la república?|En quelle année la monarchie brésilienne fut-elle abolie et la république proclamée ?|ブラジルで王制が廃止され共和制が宣言されたのは何年か?",
    [
      "1822|1822|1822|1822年",
      "1985|1985|1985|1985年",
      "1889|1889|1889|1889年",
    ],
    2,
    "Emperor Pedro II was deposed in a bloodless military coup on 15 November 1889 and sailed into exile in Europe, dying in Paris less than two years later.|El emperador Pedro II fue depuesto en un golpe militar incruento el 15 de noviembre de 1889 y partió al exilio en Europa, donde murió en París menos de dos años después.|L'empereur Pierre II fut déposé lors d'un coup d'État militaire sans effusion de sang le 15 novembre 1889 et partit en exil en Europe, où il mourut à Paris moins de deux ans plus tard.|皇帝ペドロ2世は1889年11月15日、流血のない軍事クーデターで退位させられヨーロッパへ亡命し、その2年足らず後にパリで没した。",
  ),
  q(
    6,
    "Brazil shares a land border with every South American country except which two?|¿Con qué dos países sudamericanos no comparte Brasil frontera terrestre?|Le Brésil partage une frontière terrestre avec tous les pays d'Amérique du Sud sauf lesquels ?|ブラジルが陸の国境を接していない南米の国は、次のうちどれとどれか?",
    [
      "Chile and Ecuador|Chile y Ecuador|Le Chili et l'Équateur|チリとエクアドル",
      "Bolivia and Peru|Bolivia y Perú|La Bolivie et le Pérou|ボリビアとペルー",
      "Paraguay and Uruguay|Paraguay y Uruguay|Le Paraguay et l'Uruguay|パラグアイとウルグアイ",
    ],
    0,
    "Brazil borders ten countries in all, more than any nation on Earth except Russia and China, but the Andes and the Pacific coast keep Chile and Ecuador just out of reach.|Brasil limita con diez países en total, más que cualquier nación del planeta salvo Rusia y China, pero los Andes y la costa del Pacífico dejan a Chile y Ecuador fuera de su alcance.|Le Brésil est frontalier de dix pays au total, plus que toute autre nation sur Terre à part la Russie et la Chine, mais les Andes et la côte Pacifique laissent le Chili et l'Équateur hors de portée.|ブラジルは合計10か国と国境を接しており、これはロシアと中国を除けば世界最多だが、アンデス山脈と太平洋岸がチリとエクアドルとの境を隔てている。",
  ),
  q(
    6,
    "The state of Minas Gerais, meaning \"General Mines\", was named for a colonial-era rush for what?|El estado de Minas Gerais, que significa «minas generales», debe su nombre a la fiebre colonial de qué?|L'État du Minas Gerais, qui signifie « mines générales », doit son nom à une ruée coloniale vers quoi ?|「一般鉱山」を意味するミナス・ジェライス州の名は、植民地時代のどんな熱狂に由来するか?",
    [
      "Coal|Carbón|Charbon|石炭",
      "Gold|Oro|Or|金",
      "Salt|Sal|Sel|塩",
    ],
    1,
    "The gold rush that began in the 1690s pulled in so many prospectors from the coast and from Portugal itself that the crown had to found entirely new inland towns just to administer and tax the boom.|La fiebre del oro, iniciada en la década de 1690, atrajo a tantos buscadores desde la costa y desde la propia Portugal que la corona tuvo que fundar pueblos enteramente nuevos en el interior solo para administrar y gravar el auge.|La ruée vers l'or, débutée dans les années 1690, attira tant de chercheurs venus de la côte et du Portugal lui-même que la couronne dut fonder des villes entièrement nouvelles à l'intérieur des terres rien que pour administrer et taxer cet essor.|1690年代に始まった金鉱ブームは、沿岸部やポルトガル本国から非常に多くの探鉱者を引き寄せたため、王室はこの好況を管理し課税するためだけに内陸に新たな町をいくつも興さねばならなかった。",
  ),
  q(
    7,
    "Bossa nova, the softer, jazz-influenced offshoot of samba, emerged mainly in which decades?|La bossa nova, la rama más suave del samba influida por el jazz, surgió sobre todo en qué décadas?|La bossa nova, ce rejeton plus doux et influencé par le jazz de la samba, émergea surtout dans quelles décennies ?|サンバから派生した、より柔らかくジャズの影響を受けたボサノヴァが生まれたのは主にいつ頃か?",
    [
      "The 1930s|Los años treinta|Les années 1930|1930年代",
      "The 1990s|Los años noventa|Les années 1990|1990年代",
      "The 1950s and 1960s|Los años cincuenta y sesenta|Les années 1950 et 1960|1950〜60年代",
    ],
    2,
    "The style is usually traced to João Gilberto's hushed guitar and vocal style on a string of Rio recordings starting around 1958, quickly picked up by American jazz musicians.|El estilo suele remontarse a la guitarra y voz susurradas de João Gilberto en una serie de grabaciones cariocas a partir de 1958, adoptado rápidamente por músicos de jazz estadounidenses.|Le style remonte généralement à la guitare et au chant feutrés de João Gilberto sur une série d'enregistrements cariocas à partir de 1958, vite repris par des musiciens de jazz américains.|この様式は通常、1958年頃から始まったリオでの一連の録音における、ジョアン・ジルベルトのささやくようなギターと歌唱に起源をたどられ、まもなくアメリカのジャズ奏者たちにも取り入れられた。",
  ),
  q(
    7,
    "\"The Girl from Ipanema\", one of the most recorded songs in history, belongs to which Brazilian genre?|«Garota de Ipanema», una de las canciones más grabadas de la historia, pertenece a qué género brasileño?|« La Fille d'Ipanema », l'une des chansons les plus enregistrées de l'histoire, appartient à quel genre brésilien ?|史上最も多くカバーされた曲の一つ「イパネマの娘」が属するブラジルの音楽ジャンルは?",
    [
      "Bossa nova|Bossa nova|Bossa nova|ボサノヴァ",
      "Reggaeton|Reguetón|Reggaeton|レゲトン",
      "Tango|Tango|Tango|タンゴ",
    ],
    0,
    "Written by Antônio Carlos Jobim and Vinícius de Moraes in 1962, the song was inspired by a teenager the two songwriters watched walk past a bar near Ipanema beach each day.|Escrita por Antônio Carlos Jobim y Vinícius de Moraes en 1962, la canción se inspiró en una adolescente que los dos autores veían pasar cada día frente a un bar cerca de la playa de Ipanema.|Écrite par Antônio Carlos Jobim et Vinícius de Moraes en 1962, la chanson s'inspira d'une adolescente que les deux auteurs voyaient passer chaque jour devant un bar près de la plage d'Ipanema.|1962年にアントニオ・カルロス・ジョビンとヴィニシウス・ジ・モライスによって書かれたこの曲は、二人が毎日イパネマ海岸近くのバーの前を通り過ぎるのを眺めていた一人の少女に着想を得ている。",
  ),
  q(
    7,
    "What is the Pantanal, a vast lowland in west-central Brazil famous for jaguars and caimans?|¿Qué es el Pantanal, una vasta llanura del centro-oeste de Brasil famosa por sus jaguares y yacarés?|Qu'est-ce que le Pantanal, une vaste plaine du centre-ouest du Brésil réputée pour ses jaguars et ses caïmans ?|ジャガーやカイマンで知られる、ブラジル中西部の広大な低地パンタナールとは何か?",
    [
      "The Everglades|Los Everglades|Les Everglades|エバーグレーズ",
      "The world's largest tropical wetland|El humedal tropical más grande del mundo|La plus grande zone humide tropicale du monde|世界最大の熱帯湿地",
      "The Okavango Delta|El delta del Okavango|Le delta de l'Okavango|オカバンゴ・デルタ",
    ],
    1,
    "Roughly the size of the state of Washington and flooding to many times its dry-season area each year, the Pantanal is thought to hold the densest jaguar population left on Earth.|Con un tamaño similar al del estado de Washington y que se inunda cada año hasta varias veces su superficie de estación seca, se cree que el Pantanal alberga la mayor densidad de jaguares que queda en el planeta.|D'une taille comparable à l'État de Washington et s'inondant chaque année jusqu'à plusieurs fois sa superficie de saison sèche, le Pantanal abriterait la plus forte densité de jaguars restant sur Terre.|アメリカのワシントン州とほぼ同じ広さを持ち、毎年乾季の何倍もの面積まで冠水するパンタナールには、地球上に残るジャガーの個体群のうち最も密度が高いものが生息すると考えられている。",
  ),
  q(
    7,
    "What English word for an informal hillside settlement, common in Brazilian cities, comes from Brazilian Portuguese?|¿Qué palabra inglesa para un asentamiento informal en una ladera, común en las ciudades brasileñas, viene del portugués de Brasil?|Quel mot anglais désignant un habitat informel de flanc de colline, courant dans les villes brésiliennes, vient du portugais brésilien ?|ブラジルの都市でよく見られる、丘の斜面に広がる非公式の住宅地を指す、ブラジル・ポルトガル語由来の英単語は?",
    [
      "Favela|Favela|Favela|ファヴェーラ",
      "Sertão|Sertão|Sertão|セルタン",
      "Quilombo|Quilombo|Quilombo|キロンボ",
    ],
    0,
    "The word originally named a thorny shrub, and soldiers who had camped on a hill called Morro da Favela during an 1897 civil war later settled Rio's hillsides, carrying the name with them.|La palabra originalmente nombraba un arbusto espinoso, y unos soldados que habían acampado en una colina llamada Morro da Favela durante una guerra civil de 1897 se asentaron después en las laderas de Río, llevándose el nombre consigo.|Le mot désignait à l'origine un arbuste épineux, et des soldats ayant campé sur une colline appelée Morro da Favela pendant une guerre civile de 1897 s'installèrent plus tard sur les collines de Rio, emportant le nom avec eux.|この語はもともと棘のある低木を指したが、1897年の内戦中に「ファヴェーラの丘」と呼ばれる丘に野営した兵士たちが、のちにリオの丘陵地に住み着き、その名を持ち込んだ。",
  ),
  q(
    8,
    "What is a \"sertão\", a term central to much of Brazilian Northeastern literature and song?|¿Qué es el «sertão», un término central en buena parte de la literatura y la música del Nordeste brasileño?|Qu'est-ce qu'un « sertão », terme central dans une grande partie de la littérature et de la chanson du Nordeste brésilien ?|ブラジル北東部の文学や音楽で中心的に扱われる「セルタン」とは何か?",
    [
      "A semi-arid backlands region|Una región de interior semiárida|Une région d'arrière-pays semi-aride|半乾燥地帯の奥地",
      "A type of samba drum|Un tipo de tambor de samba|Un type de tambour de samba|サンバの太鼓の一種",
      "A coastal fishing village|Un pueblo pesquero costero|Un village de pêcheurs côtier|沿岸の漁村",
    ],
    0,
    "Recurring droughts have historically driven waves of migration out of the sertão toward the coast and the south, a hardship that runs through classics like Euclides da Cunha's \"Os Sertões\".|Las sequías recurrentes han provocado históricamente oleadas de migración desde el sertão hacia la costa y el sur, una penuria que recorre clásicos como «Os Sertões» de Euclides da Cunha.|Des sécheresses récurrentes ont historiquement provoqué des vagues de migration hors du sertão vers la côte et le sud, une épreuve qui traverse des classiques comme « Os Sertões » d'Euclides da Cunha.|繰り返される干ばつは歴史的にセルタンから海岸部や南部への移住の波を生んできた。この苦難は、エウクリデス・ダ・クーニャの『セルタンの反乱』のような古典作品にも通底している。",
  ),
  q(
    8,
    "Chico Buarque, Caetano Veloso and Gilberto Gil are major figures in which Brazilian art form?|Chico Buarque, Caetano Veloso y Gilberto Gil son figuras clave de qué forma artística brasileña?|Chico Buarque, Caetano Veloso et Gilberto Gil sont des figures majeures de quelle forme d'art brésilienne ?|シコ・ブアルキ、カエターノ・ヴェローゾ、ジルベルト・ジルはブラジルのどの芸術分野の重要人物か?",
    [
      "Popular music (MPB)|Música popular (MPB)|Musique populaire (MPB)|大衆音楽(MPB)",
      "Cinema|Cine|Cinéma|映画",
      "Architecture|Arquitectura|Architecture|建築",
    ],
    0,
    "MPB, short for Música Popular Brasileira, brought samba, bossa nova and regional folk styles together with lyrics that often carried coded protest during the 1964–1985 military dictatorship.|La MPB, abreviatura de Música Popular Brasileira, fusionó samba, bossa nova y estilos folclóricos regionales con letras que a menudo llevaban protesta cifrada durante la dictadura militar de 1964-1985.|La MPB, abréviation de Música Popular Brasileira, réunit samba, bossa nova et styles folkloriques régionaux avec des paroles portant souvent une protestation codée durant la dictature militaire de 1964-1985.|「MPB(ブラジル大衆音楽)」は、サンバやボサノヴァ、地方の民俗音楽を融合させたジャンルで、1964〜1985年の軍事独裁政権下では、歌詞にしばしば暗号めいた抵抗のメッセージが込められた。",
  ),
  q(
    8,
    "Tropicália, a late-1960s Brazilian cultural movement, blended traditional Brazilian styles with what?|La Tropicália, un movimiento cultural brasileño de finales de los sesenta, mezcló estilos tradicionales brasileños con qué?|La Tropicália, mouvement culturel brésilien de la fin des années 1960, mêla les styles traditionnels brésiliens à quoi ?|1960年代末のブラジルの文化運動トロピカリズモが、伝統的なブラジルの様式と融合させたものは?",
    [
      "International rock and avant-garde influences|Influencias del rock internacional y la vanguardia|Des influences du rock international et de l'avant-garde|海外のロックと前衛芸術の影響",
      "Classical opera|La ópera clásica|L'opéra classique|クラシックオペラ",
      "Silent film techniques|Técnicas del cine mudo|Les techniques du cinéma muet|サイレント映画の技法",
    ],
    0,
    "Led by Caetano Veloso, Gilberto Gil and the band Os Mutantes, the movement mixed electric guitars and psychedelic production with samba and regional rhythms, and it drew enough official suspicion that Veloso and Gil were briefly exiled.|Liderado por Caetano Veloso, Gilberto Gil y la banda Os Mutantes, el movimiento mezcló guitarras eléctricas y producción psicodélica con samba y ritmos regionales, y despertó tal recelo oficial que Veloso y Gil fueron exiliados brevemente.|Menée par Caetano Veloso, Gilberto Gil et le groupe Os Mutantes, le mouvement mêla guitares électriques et production psychédélique à la samba et aux rythmes régionaux, suscitant une telle suspicion officielle que Veloso et Gil furent brièvement exilés.|カエターノ・ヴェローゾ、ジルベルト・ジル、バンド「オス・ムタンチス」が率いたこの運動は、エレキギターとサイケデリックな音作りをサンバや地方の律動と混ぜ合わせ、当局ににらまれてヴェローゾとジルが一時亡命に追い込まれるほどの動きとなった。",
  ),
  q(
    9,
    "In Brazilian Portuguese, what does the word \"saudade\", often called untranslatable, describe?|En portugués brasileño, ¿qué describe la palabra «saudade», a menudo llamada intraducible?|En portugais brésilien, que décrit le mot « saudade », souvent qualifié d'intraduisible ?|しばしば「翻訳不能」とされるブラジル・ポルトガル語の「サウダージ」が表すものは?",
    [
      "A formal greeting|Un saludo formal|Une salutation formelle|正式な挨拶",
      "A type of toast|Un tipo de brindis|Un type de toast|乾杯の一種",
      "A nostalgic longing for someone or something absent|Una añoranza nostálgica por alguien o algo ausente|Une nostalgie mélancolique pour quelqu'un ou quelque chose d'absent|不在の人や物事への郷愁を帯びた思慕",
    ],
    2,
    "The feeling runs through fado-adjacent Brazilian song lyrics and everyday speech alike, describing something closer to bittersweet longing than simple sadness or homesickness.|El sentimiento recorre por igual las letras de canciones brasileñas emparentadas con el fado y el habla cotidiana, y describe algo más cercano a un anhelo agridulce que a la simple tristeza o nostalgia del hogar.|Ce sentiment traverse aussi bien les paroles de chansons brésiliennes proches du fado que le langage courant, décrivant quelque chose de plus proche d'un désir doux-amer que d'une simple tristesse ou du mal du pays.|この感覚は、ファドに通じるブラジルの歌詞にも日常会話にも通底しており、単なる悲しみやホームシックというより、ほろ苦い思慕に近いものを表す。",
  ),
  q(
    9,
    "What kind of event began in Brazil in 1964, ushering in over two decades of military rule?|¿Qué tipo de suceso comenzó en Brasil en 1964, dando paso a más de dos décadas de gobierno militar?|Quel type d'événement débuta au Brésil en 1964, ouvrant plus de deux décennies de régime militaire ?|1964年にブラジルで起こり、20年以上に及ぶ軍政の始まりとなった出来事の種類は?",
    [
      "A coup d'état|Un golpe de Estado|Un coup d'État|クーデター",
      "A foreign invasion|Una invasión extranjera|Une invasion étrangère|外国からの侵攻",
      "A currency collapse|Un colapso monetario|Un effondrement monétaire|通貨の崩壊",
    ],
    0,
    "The military removed elected president João Goulart on 31 March–1 April 1964, and direct elections for president did not return until 1989, a quarter-century later.|Los militares depusieron al presidente electo João Goulart el 31 de marzo y 1 de abril de 1964, y las elecciones presidenciales directas no volvieron hasta 1989, un cuarto de siglo después.|Les militaires destituèrent le président élu João Goulart les 31 mars et 1er avril 1964, et les élections présidentielles directes ne revinrent qu'en 1989, un quart de siècle plus tard.|軍は1964年3月31日から4月1日にかけて、選挙で選ばれたジョアン・ゴラール大統領を退陣させた。大統領の直接選挙が復活したのは四半世紀後の1989年になってからだった。",
  ),
  q(
    10,
    "Which Indigenous language family is the most widely spoken among Brazil's roughly 270 remaining native languages?|¿Qué familia lingüística indígena es la más hablada entre las cerca de 270 lenguas nativas que quedan en Brasil?|Quelle famille de langues autochtones est la plus parlée parmi les quelque 270 langues natives restantes au Brésil ?|ブラジルに残る約270の先住民言語のうち、最も広く話されている言語族は?",
    [
      "Quechua|Quechua|Quechua|ケチュア語族",
      "Bantu|Bantú|Bantoue|バントゥー語族",
      "Tupi–Guarani|Tupí-guaraní|Tupi-guarani|トゥピ・グアラニー語族",
    ],
    2,
    "Tupi–Guarani languages were so widespread along the coast at the time of colonisation that a Tupi-based lingua franca, called Nheengatu, was used by Portuguese settlers and missionaries themselves well into the 18th century.|Las lenguas tupí-guaraníes estaban tan extendidas por la costa en la época de la colonización que una lengua franca basada en el tupí, llamada nheengatu, fue usada por los propios colonos y misioneros portugueses hasta bien entrado el siglo XVIII.|Les langues tupi-guarani étaient si répandues sur la côte au moment de la colonisation qu'une langue véhiculaire fondée sur le tupi, appelée nheengatu, fut utilisée par les colons et missionnaires portugais eux-mêmes jusque bien avant dans le XVIIIe siècle.|トゥピ・グアラニー語族は植民地化当時、沿岸部にあまりに広く分布していたため、トゥピ語をもとにした共通語ニェエンガトゥが、ポルトガル人の入植者や宣教師自身によって18世紀に入ってからも使われ続けた。",
  ),
];
