/**
 * ブラジルのクイズ(106問。2026-08-14、難易度7以上と9〜10の層を厚くする
 * 目的で38問から拡張した)。
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
 * 2026-08-14 に足した66問は、南アメリカ大陸をまたぐ話題(トルデシリャス条約・
 * 三国同盟戦争・オペレーション・コンドールなど)を意図的に避けている。
 * それらは `scripts/countries/southamerica/quiz.mjs` の担当。
 *
 * ```
 * node scripts/check-quiz.mjs brazil
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
 * ただし都市名そのものが答えになる問い(「首都は?」など)は、その都市自身の
 * カードに都市名が載っているのは当然なので誤検知になる。中身が同じ事実かどうかは
 * 人が読んで判断すること。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が概ね均等になるよう散らしてある。
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
    4,
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
    4,
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

  // --- 2026-08-14 拡張: 難易度7以上と9〜10の層を厚くする追加分(67問) ---
  q(
    1,
    "What is the capital of Brazil?|¿Cuál es la capital de Brasil?|Quelle est la capitale du Brésil ?|ブラジルの首都は?",
    [
      "Brasília|Brasilia|Brasília|ブラジリア",
      "Rio de Janeiro|Río de Janeiro|Rio de Janeiro|リオデジャネイロ",
      "São Paulo|São Paulo|São Paulo|サンパウロ",
    ],
    0,
    "Brasília has been the capital since 1960, but Rio de Janeiro held that role for nearly two centuries before that, and Salvador was Brazil's very first colonial capital, from 1549.|Brasilia es la capital desde 1960, pero Río de Janeiro ocupó ese papel durante casi dos siglos antes, y Salvador fue la primerísima capital colonial de Brasil, desde 1549.|Brasília est la capitale depuis 1960, mais Rio de Janeiro a occupé ce rôle pendant près de deux siècles auparavant, et Salvador fut la toute première capitale coloniale du Brésil, dès 1549.|ブラジリアが首都になったのは1960年だが、それ以前の二百年近くはリオデジャネイロが首都であり、さらにさかのぼれば1549年からのサルバドールがブラジル最初の植民地首都だった。",
  ),
  q(
    1,
    "On which continent is Brazil located?|¿En qué continente se encuentra Brasil?|Sur quel continent se trouve le Brésil ?|ブラジルがある大陸は?",
    [
      "Africa|África|L'Afrique|アフリカ",
      "South America|Sudamérica|L'Amérique du Sud|南アメリカ",
      "Asia|Asia|L'Asie|アジア",
    ],
    1,
    "Brazil covers nearly half of South America's land area and is home to roughly half its people, more than every other country on the continent combined.|Brasil cubre casi la mitad de la superficie de Sudamérica y alberga a cerca de la mitad de su población, más que todos los demás países del continente juntos.|Le Brésil couvre près de la moitié de la superficie de l'Amérique du Sud et abrite environ la moitié de sa population, davantage que tous les autres pays du continent réunis.|ブラジルは南アメリカの陸地面積のほぼ半分を占め、人口もおよそ半分を抱えている。これは大陸内の他のすべての国を合わせたのに匹敵する規模である。",
  ),
  q(
    1,
    "Which ocean does Brazil's long coastline face?|¿Qué océano bordea la larga costa de Brasil?|Quel océan borde la longue côte du Brésil ?|ブラジルの長い海岸線が面する海は?",
    [
      "The Atlantic|El Atlántico|L'Atlantique|大西洋",
      "The Indian Ocean|El océano Índico|L'océan Indien|インド洋",
      "The Pacific|El Pacífico|Le Pacifique|太平洋",
    ],
    0,
    "Brazil's coastline runs for roughly 7,500 kilometres along the Atlantic, one of the longest of any country, even though the country never touches the Pacific despite covering nearly half of South America.|La costa brasileña se extiende unos 7.500 kilómetros a lo largo del Atlántico, una de las más largas de cualquier país, aunque el país nunca toca el Pacífico pese a cubrir casi la mitad de Sudamérica.|La côte brésilienne s'étend sur environ 7 500 kilomètres le long de l'Atlantique, l'une des plus longues au monde, alors même que le pays ne touche jamais le Pacifique malgré sa superficie couvrant près de la moitié de l'Amérique du Sud.|ブラジルの海岸線は大西洋沿いにおよそ7,500キロも続き、世界でも屈指の長さを誇るが、南米のほぼ半分を占める国でありながら太平洋には一切面していない。",
  ),
  q(
    2,
    "What is Brazil's largest city by population?|¿Cuál es la ciudad más poblada de Brasil?|Quelle est la ville la plus peuplée du Brésil ?|ブラジルで人口最大の都市は?",
    [
      "São Paulo|São Paulo|São Paulo|サンパウロ",
      "Rio de Janeiro|Río de Janeiro|Rio de Janeiro|リオデジャネイロ",
      "Brasília|Brasilia|Brasília|ブラジリア",
    ],
    0,
    "Greater São Paulo is one of the most populous urban areas in the Southern Hemisphere, with a metropolitan population larger than the entire country of Portugal, whose language it speaks.|El área metropolitana de São Paulo es una de las más pobladas del hemisferio sur, con más habitantes que todo Portugal, cuyo idioma habla.|Le Grand São Paulo est l'une des zones urbaines les plus peuplées de l'hémisphère Sud, avec une population supérieure à celle du Portugal tout entier, dont elle parle la langue.|大サンパウロ圏は南半球でも屈指の人口を抱える都市圏で、その人口はポルトガル語の本家であるポルトガル一国の人口を上回る。",
  ),
  q(
    2,
    "What is the main music and dance style of Brazilian Carnival?|¿Cuál es el estilo musical y de baile principal del Carnaval brasileño?|Quel est le style musical et de danse principal du Carnaval brésilien ?|ブラジルのカーニバルを彩る中心的な音楽・舞踊様式は?",
    [
      "Tango|Tango|Tango|タンゴ",
      "Samba|Samba|Samba|サンバ",
      "Salsa|Salsa|Salsa|サルサ",
    ],
    1,
    "Carnival falls in the weeks before Ash Wednesday and Lent, and beyond Rio's ticketed parades, samba is danced for free in street parties called blocos that fill entire neighbourhoods across the country.|El Carnaval cae en las semanas previas al Miércoles de Ceniza y la Cuaresma, y más allá de los desfiles con entrada de Río, la samba se baila gratis en fiestas callejeras llamadas blocos que llenan barrios enteros por todo el país.|Le Carnaval tombe dans les semaines précédant le mercredi des Cendres et le Carême, et au-delà des défilés payants de Rio, la samba se danse gratuitement dans des fêtes de rue appelées blocos qui envahissent des quartiers entiers à travers le pays.|カーニバルは灰の水曜日と四旬節の直前の数週間に行われ、リオの有料パレードのほかにも、「ブロコ」と呼ばれる無料の路上パーティーで国じゅうの街区がサンバに沸く。",
  ),
  q(
    2,
    "Iguaçu Falls, one of South America's most famous waterfalls, straddles the border between Brazil and which country?|Las cataratas de Iguazú, una de las más famosas de Sudamérica, se encuentran en la frontera entre Brasil y qué país?|Les chutes d'Iguaçu, l'une des plus célèbres d'Amérique du Sud, se trouvent à la frontière entre le Brésil et quel pays ?|南米屈指の名瀑イグアスの滝が、ブラジルとの国境をまたいで位置する国は?",
    [
      "Argentina|Argentina|L'Argentine|アルゼンチン",
      "Peru|Perú|Le Pérou|ペルー",
      "Colombia|Colombia|La Colombie|コロンビア",
    ],
    0,
    "Locals half-joke that the Argentine side offers the more dramatic close-up views, drenched in spray, while the Brazilian side offers the wider panoramic sweep of all roughly 275 individual falls at once.|Los locales bromean a medias con que el lado argentino ofrece las vistas más dramáticas de cerca, empapadas en rocío, mientras que el lado brasileño ofrece la panorámica más amplia de las cerca de 275 cataratas a la vez.|Les habitants plaisantent à moitié en disant que le côté argentin offre les vues rapprochées les plus spectaculaires, trempées d'embruns, tandis que le côté brésilien offre le panorama le plus large sur les quelque 275 chutes à la fois.|地元では半分冗談で、アルゼンチン側は水しぶきを浴びる間近の迫力ある眺めを、ブラジル側はおよそ275ある滝すべてを一望できる広いパノラマを持つと言われる。",
  ),
  q(
    2,
    "Rio de Janeiro's massive New Year's Eve fireworks display is held over which beach?|¿Sobre qué playa se celebra el enorme espectáculo de fuegos artificiales de fin de año en Río de Janeiro?|Au-dessus de quelle plage se tient le gigantesque feu d'artifice du Nouvel An de Rio de Janeiro ?|リオデジャネイロの大晦日の大規模な花火大会が行われるビーチは?",
    [
      "Copacabana|Copacabana|Copacabana|コパカバーナ",
      "Leblon|Leblon|Leblon|レブロン",
      "Ipanema|Ipanema|Ipanema|イパネマ",
    ],
    0,
    "On New Year's Eve, Cariocas traditionally dress in white for luck and wade into the surf at midnight, a custom tied to offerings for Iemanjá, the Afro-Brazilian deity of the sea.|En Nochevieja, los cariocas visten tradicionalmente de blanco por suerte y entran al mar a medianoche, una costumbre ligada a las ofrendas a Iemanjá, la deidad afrobrasileña del mar.|Le soir du Nouvel An, les Cariocas s'habillent traditionnellement en blanc pour porter chance et entrent dans les vagues à minuit, une coutume liée aux offrandes à Iemanjá, la divinité afro-brésilienne de la mer.|大晦日、リオっ子たちは伝統的に幸運を願って白い服をまとい、真夜中に波打ち際へ入っていく。これはアフロ・ブラジル系の海の女神イエマンジャーへの供物にちなむ習わしである。",
  ),
  q(
    3,
    "On what date does Brazil celebrate its Independence Day?|¿En qué fecha celebra Brasil su Día de la Independencia?|À quelle date le Brésil célèbre-t-il son Jour de l'Indépendance ?|ブラジルの独立記念日はいつか?",
    [
      "7 September|7 de septiembre|7 septembre|9月7日",
      "4 July|4 de julio|4 juillet|7月4日",
      "1 May|1 de mayo|1er mai|5月1日",
    ],
    0,
    "Independence Day festivities culminate each year with a large military parade broadcast nationally from Brasília, a far more formal affair than the beach parties and street blocos that mark Brazil's other big holidays.|Cada año, las celebraciones del Día de la Independencia culminan con un gran desfile militar transmitido a nivel nacional desde Brasilia, un acto mucho más formal que las fiestas de playa y los blocos callejeros de otras grandes fechas brasileñas.|Chaque année, les célébrations du Jour de l'Indépendance culminent avec un grand défilé militaire retransmis à l'échelle nationale depuis Brasília, un événement bien plus formel que les fêtes de plage et les blocos de rue des autres grandes fêtes brésiliennes.|独立記念日の祝いは毎年、ブラジリアから全国中継される大規模な軍事パレードで締めくくられる。これは、ブラジルの他の大きな祝日を彩るビーチパーティーや路上の「ブロコ」よりもずっと格式ばった行事である。",
  ),
  q(
    3,
    "What is the name of the coin unit that makes up one hundredth of Brazil's real?|¿Cómo se llama la moneda que equivale a la centésima parte del real brasileño?|Comment s'appelle la pièce qui vaut un centième du real brésilien ?|ブラジルのレアルの100分の1にあたる硬貨の単位の名は?",
    [
      "Centavo|Centavo|Centavo|センターボ",
      "Öre|Öre|Öre|エーレ",
      "Kopek|Kopek|Kopeck|コペイカ",
    ],
    0,
    "Coins worth less than 5 centavos have all but disappeared from everyday circulation as inflation eroded their purchasing power, so cash registers usually round small totals to the nearest 5 or 10 centavos.|Las monedas de menos de 5 centavos casi han desaparecido de la circulación cotidiana, ya que la inflación erosionó su poder adquisitivo, así que las cajas suelen redondear al múltiplo de 5 o 10 centavos más cercano.|Les pièces de moins de 5 centavos ont pratiquement disparu de la circulation quotidienne, l'inflation ayant érodé leur pouvoir d'achat, si bien que les caisses arrondissent généralement au multiple de 5 ou 10 centavos le plus proche.|5センターボ未満の硬貨は、インフレで購買力が失われ日常の流通からほぼ姿を消しており、レジでは小さな端数を5か10センターボ単位に丸めるのが普通になっている。",
  ),
  q(
    3,
    "What are the traditional home colours of the Brazilian men's national football team's kit?|¿Cuáles son los colores tradicionales de la camiseta local de la selección masculina de fútbol de Brasil?|Quelles sont les couleurs traditionnelles du maillot domicile de l'équipe masculine de football du Brésil ?|ブラジル男子サッカー代表の伝統的なホームユニフォームの色は?",
    [
      "Yellow shirt, blue shorts|Camiseta amarilla, pantalón azul|Maillot jaune, short bleu|黄色いシャツに青いショートパンツ",
      "Green shirt, yellow shorts|Camiseta verde, pantalón amarillo|Maillot vert, short jaune|緑のシャツに黄色いショートパンツ",
      "Blue shirt, white shorts|Camiseta azul, pantalón blanco|Maillot bleu, short blanc|青いシャツに白いショートパンツ",
    ],
    0,
    "The now-iconic yellow shirt was only adopted in 1954, after the all-white kit worn in the crushing 1950 World Cup final loss to Uruguay was blamed for the defeat and dropped entirely.|La ahora icónica camiseta amarilla se adoptó recién en 1954, después de que el uniforme totalmente blanco usado en la aplastante derrota de la final del Mundial de 1950 ante Uruguay fuera culpado de la derrota y descartado por completo.|Le maillot jaune aujourd'hui emblématique ne fut adopté qu'en 1954, après que la tenue entièrement blanche portée lors de la cuisante défaite en finale de la Coupe du monde 1950 face à l'Uruguay eut été jugée responsable et totalement abandonnée.|いまでは象徴的な黄色いシャツが採用されたのは1954年になってからで、それは1950年ワールドカップ決勝でウルグアイに喫した痛恨の敗戦の際に着ていた総白のユニフォームが敗因とされ、完全に廃止されたあとのことだった。",
  ),
  q(
    3,
    "Brazilian Carnival always falls in which two months of the year?|¿En qué dos meses del año cae siempre el Carnaval brasileño?|En quels deux mois de l'année tombe toujours le Carnaval brésilien ?|ブラジルのカーニバルは毎年必ずどの二つの月に行われるか?",
    [
      "February and March|Febrero y marzo|Février et mars|2月と3月",
      "June and July|Junio y julio|Juin et juillet|6月と7月",
      "November and December|Noviembre y diciembre|Novembre et décembre|11月と12月",
    ],
    0,
    "The date shifts each year because it is set relative to Ash Wednesday and Easter, unlike Brazil's other big street festivals such as the June \"Festas Juninas\", which fall on fixed dates every year.|La fecha cambia cada año porque se fija en relación con el Miércoles de Ceniza y la Pascua, a diferencia de otras grandes fiestas callejeras brasileñas como las \"Festas Juninas\" de junio, que caen en fechas fijas cada año.|La date change chaque année car elle est fixée par rapport au mercredi des Cendres et à Pâques, contrairement à d'autres grandes fêtes de rue brésiliennes comme les \"Festas Juninas\" de juin, qui tombent à date fixe chaque année.|カーニバルの日付は灰の水曜日と復活祭を基準に決まるため毎年動く。これに対し、6月の「フェスタス・ジュニーナス」など他のブラジルの大きな祭りは、毎年決まった日付で行われる。",
  ),
  q(
    3,
    "Brazil is the world's fifth-largest country by land area. Which four countries are larger?|Brasil es el quinto país más grande del mundo por superficie. ¿Qué cuatro países son más grandes?|Le Brésil est le cinquième plus grand pays du monde par sa superficie. Quels quatre pays sont plus vastes ?|ブラジルは面積で世界第5位の国である。ブラジルより広い4か国は?",
    [
      "Russia, Canada, China and the United States|Rusia, Canadá, China y Estados Unidos|La Russie, le Canada, la Chine et les États-Unis|ロシア・カナダ・中国・アメリカ",
      "Russia, India, Australia and Argentina|Rusia, India, Australia y Argentina|La Russie, l'Inde, l'Australie et l'Argentine|ロシア・インド・オーストラリア・アルゼンチン",
      "Canada, Mexico, Australia and China|Canadá, México, Australia y China|Le Canada, le Mexique, l'Australie et la Chine|カナダ・メキシコ・オーストラリア・中国",
    ],
    0,
    "Brazil alone is larger than the 48 contiguous United States combined, and it is bigger than every country in Europe put together, including European Russia.|Brasil por sí solo es más grande que los 48 estados contiguos de Estados Unidos juntos, y es más grande que todos los países de Europa combinados, incluida la Rusia europea.|Le Brésil, à lui seul, est plus vaste que les 48 États contigus des États-Unis réunis, et il est plus grand que tous les pays d'Europe combinés, Russie européenne comprise.|ブラジルはそれだけで、アメリカ本土48州を合わせたよりも広く、ヨーロッパのロシア部分を含めたヨーロッパ全土を合わせたよりも広い。",
  ),
  q(
    4,
    "Brazil is officially divided into how many major geographic regions?|¿En cuántas grandes regiones geográficas se divide oficialmente Brasil?|En combien de grandes régions géographiques le Brésil est-il officiellement divisé ?|ブラジルは公式にいくつの主要な地方に区分されているか?",
    [
      "Five|Cinco|Cinq|5つ",
      "Nine|Nueve|Neuf|9つ",
      "Three|Tres|Trois|3つ",
    ],
    0,
    "The five regions — North, Northeast, Centre-West, Southeast and South — group states together for statistics and planning purposes and don't correspond to any layer of elected government.|Las cinco regiones —Norte, Nordeste, Centro-Oeste, Sudeste y Sur— agrupan estados con fines estadísticos y de planificación, y no corresponden a ningún nivel de gobierno electo.|Les cinq régions — Nord, Nordeste, Centre-Ouest, Sud-Est et Sud — regroupent des États à des fins statistiques et de planification, et ne correspondent à aucun niveau de gouvernement élu.|北部・北東部・中西部・南東部・南部の5地方は、統計や計画のために州をまとめた区分であり、選挙で選ばれる政府の階層とは対応していない。",
  ),
  q(
    4,
    "Brazil is a founding member of which grouping of major emerging economies, alongside Russia, India and China?|Junto con Rusia, India y China, ¿de qué agrupación de grandes economías emergentes es Brasil miembro fundador?|Aux côtés de la Russie, de l'Inde et de la Chine, le Brésil est membre fondateur de quel groupement de grandes économies émergentes ?|ロシア・インド・中国とともに、ブラジルが創設メンバーである新興大国のまとまりは?",
    [
      "OPEC|OPEP|L'OPEP|OPEC(石油輸出国機構)",
      "BRICS|BRICS|Les BRICS|BRICS",
      "The G7|El G7|Le G7|G7",
    ],
    1,
    "The acronym began as \"BRIC\", coined in 2001 by an economist who grouped the countries purely as an investment forecast; the four governments did not hold their first joint summit, in Russia, until 2009.|La sigla nació como «BRIC», acuñada en 2001 por un economista que agrupó a los países solo como pronóstico de inversión; los cuatro gobiernos no celebraron su primera cumbre conjunta, en Rusia, hasta 2009.|Le sigle est né sous la forme « BRIC », inventé en 2001 par un économiste qui avait regroupé ces pays uniquement à des fins de prévision d'investissement ; les quatre gouvernements n'ont tenu leur premier sommet conjoint, en Russie, qu'en 2009.|この略称はもともと「BRIC」として、2001年にある経済学者が投資予測のために4か国をまとめただけの分類として作った言葉で、4か国政府が実際に初めて首脳会議を開いたのは2009年、ロシアでのことだった。",
  ),
  q(
    4,
    "Brazil has hosted the men's FIFA World Cup in which two years?|¿En qué dos años ha sido Brasil sede del Mundial masculino de la FIFA?|En quelles deux années le Brésil a-t-il accueilli la Coupe du monde masculine de la FIFA ?|ブラジルが男子FIFAワールドカップを開催したのは、どの2つの年か?",
    [
      "1950 and 2014|1950 y 2014|1950 et 2014|1950年と2014年",
      "1978 and 1994|1978 y 1994|1978 et 1994|1978年と1994年",
      "1930 and 1966|1930 y 1966|1930 et 1966|1930年と1966年",
    ],
    0,
    "The 1950 final, played before a world-record crowd of roughly 200,000 at the Maracanã, ended in a shock 2–1 loss to Uruguay that Brazilians still count among the most painful moments in the country's sporting history.|La final de 1950, jugada ante una multitud récord de unas 200.000 personas en el Maracaná, terminó en una sorpresiva derrota 2-1 ante Uruguay que los brasileños aún cuentan entre los momentos más dolorosos de la historia deportiva del país.|La finale de 1950, disputée devant une foule record d'environ 200 000 personnes au Maracanã, se solda par une défaite surprise 2-1 face à l'Uruguay, encore comptée aujourd'hui parmi les moments les plus douloureux de l'histoire sportive du pays.|1950年の決勝は、マラカナンスタジアムに記録的な約20万人を集めながら、ウルグアイに2対1という衝撃の敗戦を喫した。ブラジルの人々はいまもこれを、自国のスポーツ史上もっとも痛切な出来事の一つに数える。",
  ),
  q(
    4,
    "Brazil was the last country in the Americas to do what, in 1888?|¿Qué hizo Brasil en 1888, siendo el último país de América en hacerlo?|Qu'a fait le Brésil en 1888, étant le dernier pays des Amériques à le faire ?|1888年、ブラジルはアメリカ大陸で最後に何をした国となったか?",
    [
      "Abolish slavery|Abolir la esclavitud|Abolir l'esclavage|奴隷制を廃止した",
      "Grant women the vote|Conceder el voto a las mujeres|Accorder le droit de vote aux femmes|女性に参政権を与えた",
      "End its monarchy|Poner fin a su monarquía|Mettre fin à sa monarchie|王制を終わらせた",
    ],
    0,
    "Nearly five million enslaved Africans had been forcibly brought to Brazil by then, far more than to any other single country in the Americas, which is part of why abolition came so late and remained so bitterly contested.|Para entonces habían sido llevados por la fuerza a Brasil casi cinco millones de africanos esclavizados, muchos más que a cualquier otro país de América, lo que en parte explica por qué la abolición llegó tan tarde y siguió siendo tan disputada.|Près de cinq millions d'Africains réduits en esclavage avaient alors été amenés de force au Brésil, bien plus que dans tout autre pays des Amériques, ce qui explique en partie pourquoi l'abolition intervint si tard et resta si vivement contestée.|それまでにブラジルへ強制的に連れてこられた奴隷にされたアフリカ人はおよそ500万人にのぼり、アメリカ大陸のどの一国よりも多かった。それが、廃止がこれほど遅れ、これほど激しく争われた理由の一つでもある。",
  ),
  q(
    4,
    "How many emperors did the Empire of Brazil have across its history, from 1822 to 1889?|¿Cuántos emperadores tuvo el Imperio de Brasil a lo largo de su historia, de 1822 a 1889?|Combien d'empereurs l'Empire du Brésil a-t-il eus au cours de son histoire, de 1822 à 1889 ?|1822年から1889年までの帝政ブラジルの歴史で、皇帝は何人いたか?",
    [
      "Four|Cuatro|Quatre|4人",
      "Two|Dos|Deux|2人",
      "None, it was ruled by a regency council throughout|Ninguno, lo gobernó siempre un consejo de regencia|Aucun, il fut toujours gouverné par un conseil de régence|一人もいない、常に摂政会議が統治した",
    ],
    1,
    "Pedro I abdicated in 1831 in favour of his five-year-old son, who could not formally take the throne until he was declared \"of age\" nine years later, in 1840, in a ceremony known as the Golpe da Maioridade.|Pedro I abdicó en 1831 en favor de su hijo de cinco años, que no pudo asumir formalmente el trono hasta ser declarado «mayor de edad» nueve años después, en 1840, en una ceremonia llamada Golpe da Maioridade.|Pierre Ier abdiqua en 1831 en faveur de son fils de cinq ans, qui ne put monter officiellement sur le trône qu'après avoir été déclaré « majeur » neuf ans plus tard, en 1840, lors d'une cérémonie appelée Golpe da Maioridade.|ペドロ1世は1831年、当時5歳だった息子に譲位して退位したが、その息子が正式に即位できたのは9年後の1840年、「成年の一撃(ゴルペ・ダ・マイオリダーヂ)」と呼ばれる儀式で成年と宣言されてからだった。",
  ),
  q(
    4,
    "What is the highest mountain in Brazil?|¿Cuál es la montaña más alta de Brasil?|Quelle est la plus haute montagne du Brésil ?|ブラジル最高峰の山は?",
    [
      "Pico da Neblina|Pico da Neblina|Le Pico da Neblina|ピコ・ダ・ネブリナ",
      "Sugarloaf Mountain|Pan de Azúcar|Le Pain de Sucre|シュガーローフ山",
      "Mount Roraima|Monte Roraima|Le mont Roraima|ロライマ山",
    ],
    0,
    "Hidden deep in the Amazon near the Venezuelan border, Pico da Neblina (\"Peak of the Mist\") remained largely unmeasured until a Brazilian-American expedition reached its summit in 1965, and cloud cover so often hides it that satellite images rarely catch it clearly.|Escondido en lo profundo de la Amazonía cerca de la frontera con Venezuela, el Pico da Neblina permaneció en gran parte sin medir hasta que una expedición brasileño-estadounidense alcanzó su cima en 1965, y las nubes lo cubren tan a menudo que las imágenes satelitales rara vez lo captan con claridad.|Caché au cœur de l'Amazonie près de la frontière vénézuélienne, le Pico da Neblina (« pic de la brume ») resta largement non mesuré jusqu'à ce qu'une expédition brésilo-américaine atteigne son sommet en 1965, et les nuages le voilent si souvent que les images satellite le captent rarement nettement.|ベネズエラ国境近くのアマゾン深部に隠れたピコ・ダ・ネブリナ(「霧の峰」の意)は、1965年にブラジル・アメリカ合同の探検隊が登頂するまでほとんど測量されていなかった。あまりに頻繁に雲に覆われるため、衛星画像にもくっきり写ることは稀である。",
  ),
  q(
    4,
    "How many official time zones does Brazil use today?|¿Cuántos husos horarios oficiales usa Brasil hoy en día?|Combien de fuseaux horaires officiels le Brésil utilise-t-il aujourd'hui ?|現在ブラジルが用いている公式の標準時は、いくつあるか?",
    [
      "Three|Tres|Trois|3つ",
      "Five|Cinco|Cinq|5つ",
      "One|Uno|Un seul|1つ",
    ],
    0,
    "Brazil dropped daylight saving time nationwide in 2019 after energy officials found it no longer saved meaningful electricity. Today mainland Brazil and its islands still span three separate zones, from UTC−2 on Fernando de Noronha to UTC−5 in Acre and western Amazonas.|Brasil eliminó el horario de verano en todo el país en 2019, después de que las autoridades energéticas concluyeran que ya no ahorraba electricidad de forma significativa. Hoy el Brasil continental y sus islas siguen abarcando tres husos distintos, de UTC−2 en Fernando de Noronha a UTC−5 en Acre y el oeste de Amazonas.|Le Brésil a supprimé l'heure d'été à l'échelle nationale en 2019, les autorités énergétiques ayant jugé qu'elle ne faisait plus d'économies d'électricité significatives. Aujourd'hui, le Brésil continental et ses îles couvrent encore trois fuseaux distincts, de UTC−2 à Fernando de Noronha à UTC−5 en Acre et dans l'ouest de l'Amazonas.|ブラジルは2019年、電力当局が「もはや目立った節電効果がない」と判断し、全国でサマータイムを廃止した。現在も本土と島嶼部合わせて標準時は3つに分かれており、フェルナンド・ジ・ノローニャ島のUTC−2から、アクレ州とアマゾナス州西部のUTC−5まで幅がある。",
  ),
  q(
    4,
    "Brazil is the world's largest exporter of concentrate for which fruit drink?|¿De qué zumo de fruta es Brasil el mayor exportador mundial de concentrado?|Le Brésil est le premier exportateur mondial de concentré pour quel jus de fruit ?|ブラジルが世界最大の濃縮果汁輸出国であるのは、何のジュースか?",
    [
      "Orange juice|Zumo de naranja|Jus d'orange|オレンジジュース",
      "Grape juice|Zumo de uva|Jus de raisin|ブドウジュース",
      "Apple juice|Zumo de manzana|Jus de pomme|リンゴジュース",
    ],
    0,
    "Most of the crop is grown in São Paulo state, and roughly seven out of every ten glasses of orange juice traded across borders worldwide are estimated to have started out as Brazilian fruit.|La mayor parte del cultivo se produce en el estado de São Paulo, y se estima que unos siete de cada diez vasos de zumo de naranja que se comercializan a nivel mundial provienen de fruta brasileña.|La majeure partie de la récolte est cultivée dans l'État de São Paulo, et on estime qu'environ sept verres de jus d'orange sur dix échangés à l'échelle mondiale proviennent à l'origine de fruits brésiliens.|栽培の大半はサンパウロ州で行われており、世界で国境を越えて取引されるオレンジジュースのおよそ10杯に7杯は、もとをたどればブラジル産の果実だと推定されている。",
  ),
  q(
    5,
    "Who signed the Golden Law (Lei Áurea) that abolished slavery in Brazil in 1888?|¿Quién firmó la Ley Áurea que abolió la esclavitud en Brasil en 1888?|Qui signa la Loi d'Or (Lei Áurea) qui abolit l'esclavage au Brésil en 1888 ?|1888年にブラジルで奴隷制を廃止した黄金法に署名したのは誰か?",
    [
      "President Deodoro da Fonseca|El presidente Deodoro da Fonseca|Le président Deodoro da Fonseca|大統領デオドーロ・ダ・フォンセカ",
      "Princess Isabel|La princesa Isabel|La princesse Isabelle|イザベル王女",
      "Emperor Pedro II|El emperador Pedro II|L'empereur Pierre II|皇帝ペドロ2世",
    ],
    1,
    "She signed the law as princess regent while her father, Emperor Pedro II, was travelling in Europe, and it offered no compensation to former slaveholders — a grievance that helped fuel the coup that toppled the monarchy the very next year.|Firmó la ley como princesa regente mientras su padre, el emperador Pedro II, viajaba por Europa, y no ofrecía compensación a los antiguos esclavistas, un agravio que ayudó a alimentar el golpe que derrocó a la monarquía al año siguiente.|Elle signa la loi en tant que princesse régente pendant que son père, l'empereur Pierre II, voyageait en Europe, et celle-ci n'offrait aucune compensation aux anciens propriétaires d'esclaves — un grief qui alimenta le coup d'État renversant la monarchie l'année suivante.|彼女は父帝ペドロ2世がヨーロッパを旅行中に、摂政王女としてこの法律に署名した。旧奴隷所有者への補償は一切なく、これが翌年に王制を倒すクーデターの一因となる不満を招いた。",
  ),
  q(
    5,
    "Which Brazilian city hosts a street Carnival that Guinness World Records has at times recognised as the largest in the world by attendance?|¿Qué ciudad brasileña celebra un Carnaval callejero que Guinness World Records ha reconocido en ocasiones como el más grande del mundo por asistencia?|Quelle ville brésilienne accueille un Carnaval de rue que le Guinness World Records a parfois reconnu comme le plus grand au monde par affluence ?|路上カーニバルが動員数で世界最大とギネス世界記録に認定されたこともある、ブラジルの都市は?",
    [
      "Salvador|Salvador|Salvador|サルバドール",
      "Fortaleza|Fortaleza|Fortaleza|フォルタレーザ",
      "Recife|Recife|Recife|ヘシフィ",
    ],
    0,
    "Unlike Rio's ticketed Sambadrome parade, Salvador's Carnival happens mostly for free in the streets, following massive sound-truck stages called trios elétricos that can each draw crowds of well over a hundred thousand people behind them.|A diferencia del desfile con entrada del Sambódromo de Río, el Carnaval de Salvador se celebra sobre todo gratis en las calles, siguiendo enormes escenarios rodantes llamados trios elétricos que pueden arrastrar multitudes de bastante más de cien mil personas.|Contrairement au défilé payant du Sambódromo de Rio, le Carnaval de Salvador se déroule surtout gratuitement dans les rues, à la suite d'immenses scènes mobiles appelées trios elétricos qui peuvent chacune entraîner des foules de bien plus de cent mille personnes.|リオの有料パレード、サンボードロモとは異なり、サルバドールのカーニバルは主に無料の街頭で行われ、「トリオ・エレトリコ」と呼ばれる巨大な移動式ステージのトラックの後ろに、時に十数万人を超える群衆が連なって歩く。",
  ),
  q(
    5,
    "The golden lion tamarin, a small monkey with an orange mane, survives in only a shrinking sliver of which Brazilian biome?|El tamarino león dorado, un pequeño mono de melena anaranjada, sobrevive solo en una franja cada vez más pequeña de qué bioma brasileño?|Le tamarin lion doré, un petit singe à la crinière orange, ne survit que dans une frange en constant rétrécissement de quel biome brésilien ?|オレンジ色のたてがみを持つ小型のサル、コモンリスザル……ではなくキンライオンタマリンが、縮小し続けるわずかな一角でのみ生き延びている、ブラジルの生態系は?",
    [
      "The Atlantic Forest (Mata Atlântica)|La Mata Atlántica|La forêt atlantique (Mata Atlântica)|大西洋岸森林(マタ・アトランチカ)",
      "The Pantanal wetlands|Los humedales del Pantanal|Les zones humides du Pantanal|パンタナール湿地",
      "The Amazon rainforest|La selva amazónica|La forêt amazonienne|アマゾンの熱帯雨林",
    ],
    0,
    "Habitat loss and the pet trade pushed the wild population down to a few hundred animals by the 1970s; captive breeding and reintroduction programmes have since brought numbers back up into the thousands.|La pérdida de hábitat y el comercio de mascotas redujeron la población silvestre a unos pocos cientos de ejemplares en los años setenta; los programas de cría en cautiverio y reintroducción han elevado la cifra desde entonces a varios miles.|La perte d'habitat et le commerce d'animaux de compagnie ont fait chuter la population sauvage à quelques centaines d'individus dans les années 1970 ; des programmes d'élevage en captivité et de réintroduction ont depuis fait remonter ce nombre à plusieurs milliers.|生息地の破壊とペット取引により、1970年代には野生の個体数がわずか数百頭まで落ち込んだが、その後の飼育下繁殖と野生復帰事業によって、いまでは数千頭まで回復している。",
  ),
  q(
    5,
    "What is the traditional bitter herbal tea, sipped through a metal straw from a shared gourd, especially popular in southern Brazil?|¿Cuál es la infusión de hierba amarga tradicional, que se bebe con una bombilla metálica de una calabaza compartida, especialmente popular en el sur de Brasil?|Quelle est l'infusion amère traditionnelle, sirotée à la paille métallique dans une calebasse partagée, particulièrement populaire dans le sud du Brésil ?|金属製のストローで、みなで一つの器から回し飲みする、ブラジル南部で特に人気の伝統的な苦い薬草茶は?",
    [
      "Chimarrão (mate tea)|Chimarrão (mate)|Chimarrão (maté)|シマロン(マテ茶)",
      "Genmaicha|Té genmaicha|Genmaicha|玄米茶",
      "Chai|Chai|Chaï|チャイ",
    ],
    0,
    "The custom of passing a single gourd from person to person around a circle draws on Indigenous Guaraní practice from before European contact, and it remains such a fixture of daily life in Rio Grande do Sul that thermos flasks of hot water are sold at petrol stations and even football stadiums.|La costumbre de pasar una sola calabaza de mano en mano en círculo se remonta a la práctica indígena guaraní anterior al contacto europeo, y sigue tan arraigada en la vida cotidiana de Rio Grande do Sul que se venden termos de agua caliente en gasolineras e incluso en estadios de fútbol.|La coutume de faire circuler une seule calebasse de main en main en cercle remonte à une pratique autochtone guaranie antérieure au contact européen, et elle demeure si ancrée dans le quotidien du Rio Grande do Sul que des thermos d'eau chaude se vendent dans les stations-service et même dans les stades de football.|一つの器を輪になって順に回し飲みするこの習わしは、ヨーロッパ人との接触以前からの先住民グアラニーの慣習に由来し、いまもヒオグランデ・ド・スル州の日常に深く根付いている。ガソリンスタンドやサッカースタジアムでさえ、お湯の入った魔法瓶が売られているほどである。",
  ),
  q(
    5,
    "Pão de queijo, a chewy cheese bread eaten across Brazil, gets its stretchy texture from flour made of which root?|El pão de queijo, un pan de queso elástico que se come en todo Brasil, obtiene su textura de una harina hecha de qué raíz?|Le pão de queijo, ce pain au fromage moelleux consommé dans tout le Brésil, doit sa texture élastique à une farine faite à partir de quelle racine ?|ブラジル各地で食べられるもちもちのチーズパン、パン・ジ・ケイジョの伸びる食感のもとになっている、根菜から作られる粉は?",
    [
      "Cassava (manioc)|Yuca (mandioca)|Manioc|キャッサバ(マニオク)",
      "Wheat|Trigo|Blé|小麦",
      "Potato|Papa|Pomme de terre|じゃがいも",
    ],
    0,
    "The starch, called polvilho, is naturally gluten-free, and the recipe traces back to Minas Gerais plantation kitchens, where enslaved cooks are said to have first baked it using scraps too coarse for their masters' table.|El almidón, llamado polvilho, no tiene gluten de forma natural, y la receta se remonta a las cocinas de las haciendas de Minas Gerais, donde se dice que cocineras esclavizadas lo horneaban por primera vez con sobras demasiado bastas para la mesa de sus amos.|Cet amidon, appelé polvilho, est naturellement sans gluten, et la recette remonterait aux cuisines des plantations du Minas Gerais, où des cuisinières réduites en esclavage l'auraient préparé les premières avec des restes trop grossiers pour la table de leurs maîtres.|「ポルヴィーリョ」と呼ばれるこのでんぷんはもともとグルテンを含まず、そのレシピはミナス・ジェライス州の農園の台所にさかのぼる。奴隷にされた料理人たちが、主人の食卓には粗すぎる屑を使って最初に焼いたと伝えられている。",
  ),
  q(
    5,
    "What is the name for the pass-by-your-table, all-you-can-eat style of serving grilled meats at a Brazilian steakhouse?|¿Cómo se llama el estilo de servicio de carnes a la parrilla en una churrascaría brasileña, donde los camareros pasan mesa por mesa sin límite?|Comment s'appelle le style de service des viandes grillées dans une churrascaria brésilienne, où les serveurs passent de table en table à volonté ?|ブラジルのシュラスカリアで、給仕人が各テーブルを回って肉を切り分ける食べ放題方式の名は?",
    [
      "Rodízio|Rodízio|Rodízio|ホジージオ",
      "Tapas|Tapas|Tapas|タパス",
      "Mezze|Mezze|Mezzé|メゼ",
    ],
    0,
    "Waiters carry skewers table to table and carve portions to order, and diners signal when they've had enough by flipping a small disc from green to red — a system that spread from southern Brazil's churrascarias to steakhouses worldwide.|Los camareros llevan las brochetas mesa por mesa y cortan las porciones al gusto, y los comensales indican cuándo han comido suficiente girando un disco pequeño de verde a rojo, un sistema que se extendió de las churrascarías del sur de Brasil a las parrillas de todo el mundo.|Les serveurs apportent les brochettes de table en table et découpent les portions à la demande, et les convives signalent qu'ils en ont assez en retournant un petit disque du vert au rouge — un système qui s'est répandu des churrascarias du sud du Brésil aux grillades du monde entier.|給仕人は串を手にテーブルを回り、その場で肉を切り分けていく。客は小さな円盤を緑から赤にひっくり返してもう十分だと合図する。この仕組みはブラジル南部のシュラスカリアから世界中のステーキハウスへと広まった。",
  ),
  q(
    5,
    "Beach volleyball, later an Olympic sport, is widely credited as having been popularised in the 1940s on the beaches of which Brazilian city?|El voleibol de playa, más tarde deporte olímpico, se atribuye ampliamente a haberse popularizado en los años cuarenta en las playas de qué ciudad brasileña?|Le beach-volley, plus tard sport olympique, est largement crédité d'avoir été popularisé dans les années 1940 sur les plages de quelle ville brésilienne ?|のちにオリンピック種目となるビーチバレーが、1940年代にどのブラジルの都市の浜辺で広まったとされているか?",
    [
      "Rio de Janeiro|Río de Janeiro|Rio de Janeiro|リオデジャネイロ",
      "Salvador|Salvador|Salvador|サルバドール",
      "Recife|Recife|Recife|ヘシフィ",
    ],
    0,
    "Players first adapted the indoor game to the sand at Copacabana and Ipanema simply because there wasn't always room for a full court, and Brazil has since won more Olympic beach volleyball medals than any other country.|Los jugadores adaptaron por primera vez el juego de pista cubierta a la arena de Copacabana e Ipanema simplemente porque no siempre había sitio para una cancha completa, y Brasil ha ganado desde entonces más medallas olímpicas de vóley playa que cualquier otro país.|Les joueurs adaptèrent d'abord le jeu en salle au sable de Copacabana et d'Ipanema, faute de place pour un terrain complet, et le Brésil a depuis remporté plus de médailles olympiques de beach-volley que tout autre pays.|プレーヤーたちが室内競技をコパカバーナやイパネマの砂浜に適応させたのは、単にフルコートを確保できる場所が常にあるわけではなかったからで、ブラジルはそれ以来オリンピックのビーチバレーでどの国よりも多くのメダルを獲得している。",
  ),
  q(
    5,
    "In Amazonian folklore, the boto, a pink river dolphin, is said to transform at night into what, to seduce people at riverside parties?|Según el folclore amazónico, ¿en qué se dice que se transforma de noche el boto, un delfín rosado de río, para seducir a la gente en las fiestas ribereñas?|Selon le folklore amazonien, en quoi le boto, un dauphin rose de rivière, se transformerait-il la nuit pour séduire les gens lors de fêtes au bord de l'eau ?|アマゾンの伝承では、ピンク色の川イルカ「ボト」は夜になると何に姿を変え、川辺の宴で人を誘惑すると言われるか?",
    [
      "A silver-haired old woman|Una anciana de cabello plateado|Une vieille femme aux cheveux argentés|銀髪の老婆",
      "A handsome man in a white suit|Un hombre apuesto vestido de blanco|Un bel homme en costume blanc|白い服を着た美男子",
      "A singing mermaid|Una sirena cantora|Une sirène chanteuse|歌うマーメイド",
    ],
    1,
    "The legend is often invoked, half-jokingly, to explain unaccounted-for pregnancies in riverside communities, and the real animal is one of the few freshwater dolphin species left on Earth, with a flexible neck that lets it turn its head to hunt among flooded tree roots.|La leyenda se invoca a menudo, medio en broma, para explicar embarazos sin padre conocido en las comunidades ribereñas, y el animal real es una de las pocas especies de delfín de agua dulce que quedan en el planeta, con un cuello flexible que le permite girar la cabeza para cazar entre raíces inundadas.|La légende est souvent invoquée, à moitié pour plaisanter, pour expliquer des grossesses inexpliquées dans les communautés riveraines, et l'animal réel est l'une des rares espèces de dauphins d'eau douce restant sur Terre, doté d'un cou flexible lui permettant de tourner la tête pour chasser parmi les racines inondées.|この伝説は、川辺の共同体で説明のつかない妊娠を半ば冗談めかして説明するのに使われることが多い。実在のボトは地球上に残る数少ない淡水イルカの一種で、首が柔軟に動くため、水没した木の根の間で獲物を狩る際に頭を回すことができる。",
  ),
  q(
    6,
    "Brazilian jiu-jitsu, now practised worldwide, was developed in the early 20th century primarily by which family, adapting techniques learned from a travelling Japanese judoka?|El jiu-jitsu brasileño, hoy practicado en todo el mundo, fue desarrollado a comienzos del siglo XX principalmente por qué familia, adaptando técnicas aprendidas de un judoka japonés itinerante?|Le jiu-jitsu brésilien, aujourd'hui pratiqué dans le monde entier, fut développé au début du XXe siècle principalement par quelle famille, en adaptant des techniques apprises d'un judoka japonais itinérant ?|いまや世界中で行われているブラジリアン柔術を、20世紀初頭に主に生み出した一族は?各地を巡っていた日本人柔道家から学んだ技を土台にしている。",
    [
      "The Santos family|La familia Santos|La famille Santos|サントス家",
      "The Gracie family|La familia Gracie|La famille Gracie|グレイシー家",
      "The Silva family|La familia Silva|La famille Silva|シウバ家",
    ],
    1,
    "Judo champion Mitsuyo Maeda, on tour in Brazil, is said to have taught the techniques to Carlos Gracie around 1917, and the family then reworked them to emphasise ground fighting and leverage, letting smaller practitioners overcome bigger, stronger opponents.|Se dice que el campeón de judo Mitsuyo Maeda, de gira por Brasil, enseñó las técnicas a Carlos Gracie hacia 1917, y la familia las reelaboró para enfatizar el combate en el suelo y la palanca, permitiendo que practicantes más pequeños vencieran a rivales más grandes y fuertes.|Le champion de judo Mitsuyo Maeda, alors en tournée au Brésil, aurait enseigné ces techniques à Carlos Gracie vers 1917, et la famille les retravailla ensuite pour privilégier le combat au sol et le levier, permettant à des pratiquants plus petits de vaincre des adversaires plus grands et plus forts.|各地を巡業していた柔道の王者、前田光世が1917年頃カルロス・グレイシーにその技を教えたとされる。一族はそれを寝技と関節技を重視する形に作り替え、体の小さな者でも大きく強い相手を制せるようにした。",
  ),
  q(
    6,
    "Brazil was a pioneer of cars able to run on any blend of petrol and which alternative fuel, refined from sugarcane?|Brasil fue pionero en autos capaces de funcionar con cualquier mezcla de gasolina y qué combustible alternativo, refinado a partir de la caña de azúcar?|Le Brésil fut pionnier des voitures capables de rouler avec n'importe quel mélange d'essence et de quel carburant alternatif, raffiné à partir de la canne à sucre ?|ブラジルは、ガソリンとサトウキビから精製されるどんな代替燃料を、どんな配合でも使える自動車の先駆けとなったか?",
    [
      "Biodiesel|Biodiésel|Biodiesel|バイオディーゼル",
      "Ethanol|Etanol|Éthanol|エタノール",
      "Hydrogen|Hidrógeno|Hydrogène|水素",
    ],
    1,
    "Brazil began mass-producing ethanol-only cars after the 1970s oil shocks, and the first mainstream \"flex-fuel\" cars able to run on either fuel in any proportion arrived on Brazilian roads in 2003, reshaping the market within a few years.|Brasil comenzó a producir en masa autos exclusivamente de etanol tras las crisis del petróleo de los años setenta, y los primeros autos «flex-fuel» convencionales, capaces de usar cualquiera de los dos combustibles en cualquier proporción, llegaron a las carreteras brasileñas en 2003, transformando el mercado en pocos años.|Le Brésil commença à produire en masse des voitures fonctionnant uniquement à l'éthanol après les chocs pétroliers des années 1970, et les premières voitures « flex-fuel » grand public, capables de fonctionner avec l'un ou l'autre carburant dans n'importe quelle proportion, arrivèrent sur les routes brésiliennes en 2003, transformant le marché en quelques années.|ブラジルは1970年代のオイルショックのあと、エタノールのみで走る車の量産を始めた。ガソリンとエタノールをどんな比率でも使える主流の「フレックス燃料車」がブラジルの道路に登場したのは2003年で、数年のうちに市場のあり方を変えた。",
  ),
  q(
    6,
    "Forró, an accordion-driven dance music from Brazil's Northeast, is traditionally most associated with which June festival season?|El forró, música de baile con acordeón del nordeste de Brasil, se asocia tradicionalmente sobre todo con qué temporada de fiestas de junio?|Le forró, musique de danse à l'accordéon du Nordeste brésilien, est traditionnellement le plus associé à quelle saison de fêtes de juin ?|アコーディオンを主役にしたブラジル北東部の舞踊音楽フォホーが、伝統的に強く結びついている6月の祭りの季節は?",
    [
      "Réveillon (New Year)|Réveillon (Año Nuevo)|Le Réveillon (Nouvel An)|レヴェイヨン(年越し)",
      "Festas Juninas|Festas Juninas|Les Festas Juninas|フェスタス・ジュニーナス",
      "Carnival|Carnaval|Le Carnaval|カーニバル",
    ],
    1,
    "The festivals honour Saints Anthony, John and Peter with bonfires, square dancing and corn-based dishes, and some etymologists trace the word \"forró\" to English-speaking railway workers' phrase \"for all\", inviting everyone to the dance — though the theory is disputed and unproven.|Las fiestas honran a los santos Antonio, Juan y Pedro con hogueras, baile en cuadrillas y platos a base de maíz, y algunos etimólogos remontan la palabra «forró» a la frase inglesa «for all» de trabajadores ferroviarios angloparlantes, invitando a todos al baile, aunque la teoría es discutida y no está probada.|Les fêtes honorent les saints Antoine, Jean et Pierre par des feux de joie, des danses en carré et des plats à base de maïs, et certains étymologistes font remonter le mot « forró » à l'expression anglaise « for all » de cheminots anglophones invitant tout le monde à danser — bien que la théorie soit contestée et non prouvée.|この祭りは聖アントニオ・聖ヨハネ・聖ペトロを、たき火や四角形に組む踊り、トウモロコシ料理でたたえる。一部の語源研究者は「フォホー」という語を、英語話者の鉄道労働者が誰もを踊りに誘った「for all(みんなのために)」という言い回しに求めるが、これは異論も多く証明されてはいない。",
  ),
  q(
    6,
    "Axé, an upbeat pop genre blending Afro-Brazilian rhythms with Caribbean and electronic sounds, emerged in the 1980s primarily from which city?|El axé, un género pop animado que mezcla ritmos afrobrasileños con sonidos caribeños y electrónicos, surgió en los años ochenta principalmente en qué ciudad?|L'axé, genre pop entraînant mêlant rythmes afro-brésiliens et sonorités caribéennes et électroniques, est né dans les années 1980 principalement dans quelle ville ?|アフロ・ブラジル系のリズムにカリブと電子音楽の要素を混ぜた陽気なポップジャンル、アシェーが1980年代に主に生まれた都市は?",
    [
      "Curitiba|Curitiba|Curitiba|クリチバ",
      "Salvador|Salvador|Salvador|サルバドール",
      "Porto Alegre|Porto Alegre|Porto Alegre|ポルトアレグレ",
    ],
    1,
    "The genre grew directly out of Salvador's street Carnival sound-truck circuit, and its name comes from the Candomblé concept of axé, a vital force or spiritual energy believed to flow through people, objects and rituals.|El género surgió directamente del circuito de camiones-escenario del Carnaval callejero de Salvador, y su nombre proviene del concepto del candomblé de axé, una fuerza vital o energía espiritual que se cree fluye por las personas, los objetos y los rituales.|Le genre est né directement du circuit des chars-scènes du Carnaval de rue de Salvador, et son nom vient du concept candomblé d'axé, une force vitale ou énergie spirituelle censée traverser les personnes, les objets et les rituels.|このジャンルはサルバドールの路上カーニバルにおける移動式ステージの文化から直接生まれた。名前はカンドンブレの概念「アシェー」に由来し、人・物・儀礼を流れると信じられる生命力・霊的エネルギーを意味する。",
  ),
  q(
    6,
    "Heitor Villa-Lobos, Brazil's most celebrated classical composer, wrote a famous series of works blending Bach's counterpoint with Brazilian folk elements, titled what?|Heitor Villa-Lobos, el compositor clásico brasileño más célebre, escribió una famosa serie de obras que mezclan el contrapunto de Bach con elementos folclóricos brasileños, titulada cómo?|Heitor Villa-Lobos, le compositeur classique brésilien le plus célèbre, écrivit une célèbre série d'œuvres mêlant le contrepoint de Bach à des éléments du folklore brésilien, intitulée comment ?|ブラジルでもっとも名高いクラシック作曲家エイトル・ヴィラ=ロボスが、バッハの対位法とブラジルの民俗音楽の要素を融合させて書いた有名な作品群の名は?",
    [
      "Sinfonia Tropical|Sinfonia Tropical|Sinfonia Tropical|シンフォニア・トロピカル",
      "Bachianas Brasileiras|Bachianas Brasileiras|Bachianas Brasileiras|バキアーナス・ブラジレイラス",
      "Cantigas Populares|Cantigas Populares|Cantigas Populares|カンチガス・ポプラーレス",
    ],
    1,
    "Villa-Lobos composed prolifically — by some counts over a thousand works — and also served as Brazil's director of music education in the 1930s, organising mass choral events where thousands of schoolchildren sang together at once.|Villa-Lobos compuso prolíficamente —según algunos cálculos, más de mil obras— y también fue director de educación musical de Brasil en los años treinta, organizando eventos corales masivos en los que miles de escolares cantaban juntos.|Villa-Lobos composa de manière prolifique — plus d'un millier d'œuvres selon certains décomptes — et fut également directeur de l'éducation musicale du Brésil dans les années 1930, organisant des événements choraux de masse où des milliers d'écoliers chantaient ensemble.|ヴィラ=ロボスは驚くほど多作で、一説には千曲を超える作品を残したとされる。1930年代にはブラジルの音楽教育局長も務め、何千人もの生徒がいっせいに歌う大規模な合唱行事を組織した。",
  ),
  q(
    6,
    "Getúlio Vargas, who ruled Brazil on and off for nearly twenty years, named his 1937–1945 dictatorship using a term meaning \"New State\". What was it called?|Getúlio Vargas, que gobernó Brasil de forma intermitente durante casi veinte años, dio a su dictadura de 1937-1945 un nombre que significa «Estado Nuevo». ¿Cómo se llamaba?|Getúlio Vargas, qui gouverna le Brésil par intermittence pendant près de vingt ans, donna à sa dictature de 1937-1945 un nom signifiant « État nouveau ». Comment s'appelait-elle ?|20年近くにわたり断続的にブラジルを統治したジェトゥリオ・ヴァルガスが、1937〜1945年の独裁体制に付けた「新国家」を意味する名は?",
    [
      "Nova República|Nova República|Nova República|ノヴァ・レプブリカ",
      "Estado Novo|Estado Novo|Estado Novo|エスタード・ノヴォ",
      "Novo Mundo|Novo Mundo|Novo Mundo|ノヴォ・ムンド",
    ],
    1,
    "Vargas later returned to power as an elected president in 1951, but as a corruption scandal closed in on his government in 1954 he shot himself, leaving behind a letter blaming domestic and foreign enemies for his fall.|Vargas volvió al poder más tarde como presidente electo en 1951, pero cuando un escándalo de corrupción acorraló a su gobierno en 1954 se disparó, dejando una carta que culpaba a enemigos internos y externos de su caída.|Vargas revint plus tard au pouvoir en tant que président élu en 1951, mais alors qu'un scandale de corruption cernait son gouvernement en 1954, il se donna la mort, laissant une lettre imputant sa chute à des ennemis intérieurs et extérieurs.|ヴァルガスはのちの1951年、選挙で選ばれた大統領として政権に復帰したが、1954年に汚職疑惑が政権に迫るなか自ら命を絶ち、内外の敵に自分の失脚の責任を負わせる遺書を残した。",
  ),
  q(
    6,
    "Brazil was the only South American country to send ground troops to fight in Europe during the Second World War. To which country did it deploy its Expeditionary Force?|Brasil fue el único país sudamericano en enviar tropas terrestres a combatir en Europa durante la Segunda Guerra Mundial. ¿A qué país desplegó su Fuerza Expedicionaria?|Le Brésil fut le seul pays sud-américain à envoyer des troupes terrestres combattre en Europe pendant la Seconde Guerre mondiale. Dans quel pays déploya-t-il son corps expéditionnaire ?|第二次世界大戦中、南米で唯一ヨーロッパへ地上部隊を送り込んだブラジルが、遠征軍を派遣した国は?",
    [
      "France|Francia|La France|フランス",
      "Italy|Italia|L'Italie|イタリア",
      "Germany|Alemania|L'Allemagne|ドイツ",
    ],
    1,
    "The roughly 25,000-strong force fought alongside Allied troops in the Italian campaign from 1944, and its soldiers' nickname, \"Cobras Fumantes\" (\"Smoking Snakes\"), mocked a sceptic who had said Brazil would send troops \"when snakes smoke\".|La fuerza, de unos 25.000 efectivos, luchó junto a las tropas aliadas en la campaña de Italia desde 1944, y el apodo de sus soldados, «Cobras Fumantes» («Serpientes Fumantes»), se burlaba de un escéptico que había dicho que Brasil enviaría tropas «cuando las serpientes fumen».|Cette force d'environ 25 000 hommes combattit aux côtés des troupes alliées lors de la campagne d'Italie à partir de 1944, et le surnom de ses soldats, « Cobras Fumantes » (« Serpents fumeurs »), se moquait d'un sceptique qui avait dit que le Brésil enverrait des troupes « quand les serpents fumeraient ».|およそ2万5千人からなるこの部隊は1944年からイタリア戦線で連合軍とともに戦った。兵士たちの愛称「コブラス・フマンチス(煙を吐く蛇)」は、ブラジルが派兵するのは「蛇が煙草を吸う日だ」と皮肉った懐疑派をあざ笑うものだった。",
  ),
  q(
    6,
    "The Cerrado, a vast tropical savanna covering roughly a fifth of Brazil, is considered the most biologically diverse example on Earth of what kind of biome?|El Cerrado, una vasta sabana tropical que cubre aproximadamente una quinta parte de Brasil, se considera el ejemplo con mayor diversidad biológica del planeta de qué tipo de bioma?|Le Cerrado, une vaste savane tropicale couvrant environ un cinquième du Brésil, est considéré comme l'exemple le plus riche en biodiversité au monde de quel type de biome ?|ブラジルの国土のおよそ5分の1を覆う広大な熱帯サバンナ、セラードが、地球上でその種の生態系として最も生物多様性に富むとされているのは、何の一種としてか?",
    [
      "Desert|Desierto|Désert|砂漠",
      "Savanna|Sabana|Savane|サバンナ",
      "Tundra|Tundra|Toundra|ツンドラ",
    ],
    1,
    "Less protected and less internationally famous than the Amazon, the Cerrado has lost roughly half its native vegetation to soy and cattle farming, even though it also feeds the headwaters of several of the country's major river basins, earning it the nickname \"Brazil's water tank\".|Menos protegido y menos famoso internacionalmente que la Amazonía, el Cerrado ha perdido cerca de la mitad de su vegetación nativa por la soja y la ganadería, aunque también alimenta las cabeceras de varias de las principales cuencas fluviales del país, lo que le vale el apodo de «caja de agua de Brasil».|Moins protégé et moins célèbre à l'international que l'Amazonie, le Cerrado a perdu environ la moitié de sa végétation native au profit du soja et de l'élevage bovin, bien qu'il alimente aussi les sources de plusieurs des principaux bassins fluviaux du pays, ce qui lui vaut le surnom de « château d'eau du Brésil ».|アマゾンほど保護も国際的な知名度もないセラードは、大豆栽培と牧畜によって原生植生のおよそ半分を失ってきたが、同時に国内の主要な河川流域のいくつかの水源も担っており、「ブラジルの給水塔」の異名を持つ。",
  ),
  q(
    7,
    "In the 1530s, Portugal divided the coast of Brazil into strips of land granted to nobles to develop at their own expense and risk. What were these grants called?|En la década de 1530, Portugal dividió la costa de Brasil en franjas de tierra concedidas a nobles para que las desarrollaran por su cuenta y riesgo. ¿Cómo se llamaban estas concesiones?|Dans les années 1530, le Portugal divisa la côte du Brésil en bandes de terre concédées à des nobles, à charge pour eux de les développer à leurs frais et à leurs risques. Comment appelait-on ces concessions ?|1530年代、ポルトガルはブラジルの海岸を、貴族に自己資金と自己責任で開発させるための細長い区画に分けて与えた。この制度は何と呼ばれたか?",
    [
      "Royal fiefdoms|Feudos reales|Fiefs royaux|王室封土",
      "Hereditary captaincies|Capitanías hereditarias|Capitaineries héréditaires|世襲カピタニア(領地)",
      "Trading concessions|Concesiones comerciales|Concessions commerciales|通商特許権",
    ],
    1,
    "Most of the fifteen original captaincies failed within a generation, undone by Indigenous resistance, poor administration or plain neglect by grantees who never left Portugal, and the crown eventually took direct control, appointing a governor-general based in Salvador in 1549.|La mayoría de las quince capitanías originales fracasaron en una generación, hundidas por la resistencia indígena, la mala administración o el simple abandono de titulares que nunca salieron de Portugal, y la corona acabó tomando el control directo, nombrando a un gobernador general con sede en Salvador en 1549.|La plupart des quinze capitaineries d'origine échouèrent en une génération, minées par la résistance autochtone, une mauvaise administration ou la simple négligence de titulaires qui ne quittèrent jamais le Portugal, et la couronne finit par en prendre le contrôle direct, nommant un gouverneur général basé à Salvador en 1549.|最初に設けられた15のカピタニアの大半は、先住民の抵抗や行政の不手際、あるいは一度もポルトガルを離れなかった領主たちの放置によって、一世代のうちに立ち行かなくなった。王室は最終的に直接統治に乗り出し、1549年にサルバドールを拠点とする総督を任命した。",
  ),
  q(
    7,
    "In Brazil, voting in national elections is compulsory for citizens aged 18 to 70. For which two age groups is voting instead optional?|En Brasil, votar en las elecciones nacionales es obligatorio para los ciudadanos de 18 a 70 años. ¿Para qué dos grupos de edad es opcional?|Au Brésil, le vote aux élections nationales est obligatoire pour les citoyens âgés de 18 à 70 ans. Pour quels deux groupes d'âge le vote est-il facultatif ?|ブラジルでは18歳から70歳までの国民に国政選挙での投票が義務づけられている。任意とされているのはどの二つの年齢層か?",
    [
      "16–17 and over 60|16-17 y mayores de 60|16-17 ans et plus de 60 ans|16〜17歳と60歳超",
      "16–17 and over 70|16-17 y mayores de 70|16-17 ans et plus de 70 ans|16〜17歳と70歳超",
      "21–25 and over 65|21-25 y mayores de 65|21-25 ans et plus de 65 ans|21〜25歳と65歳超",
    ],
    1,
    "Brazil is one of the few democracies where 16-year-olds can vote at all, and turnout for those it is compulsory for is enforced with small fines for anyone who fails to vote or file a formal excuse — modest enough to work more as a nudge than a real deterrent.|Brasil es una de las pocas democracias donde los jóvenes de 16 años ya pueden votar, y la participación de quienes tienen la obligación se hace cumplir con pequeñas multas para quien no vota ni presenta una excusa formal, lo bastante modestas como para funcionar más como un empujón que como una disuasión real.|Le Brésil est l'une des rares démocraties où les jeunes de 16 ans peuvent déjà voter, et la participation de ceux pour qui elle est obligatoire est assurée par de petites amendes pour quiconque ne vote pas ni ne dépose d'excuse officielle — assez modestes pour agir davantage comme une incitation que comme une réelle dissuasion.|ブラジルは16歳から投票できる数少ない民主主義国の一つである。義務投票の対象者には、投票せず正式な欠席届も出さない場合に少額の罰金が科されるが、その額は実質的な抑止力というより軽い後押し程度にとどまる。",
  ),
  q(
    7,
    "Brazil's highest court, the Supremo Tribunal Federal, is made up of how many justices?|¿Cuántos jueces integran el Supremo Tribunal Federal, el tribunal más alto de Brasil?|Combien de juges composent le Supremo Tribunal Federal, la plus haute cour du Brésil ?|ブラジルの最高裁判所、連邦最高裁判所(STF)を構成する判事は何人か?",
    [
      "Seven|Siete|Sept|7人",
      "Eleven|Once|Onze|11人",
      "Fifteen|Quince|Quinze|15人",
    ],
    1,
    "Justices are nominated by the president and confirmed by the Senate, and mandatory retirement at age 75 means that a single two-term president can, over eight years, end up naming a majority of the court.|Los jueces son nominados por el presidente y confirmados por el Senado, y la jubilación obligatoria a los 75 años significa que un solo presidente con dos mandatos puede, en ocho años, terminar nombrando a la mayoría del tribunal.|Les juges sont nommés par le président et confirmés par le Sénat, et le départ obligatoire à la retraite à 75 ans signifie qu'un seul président réélu peut, en huit ans, finir par nommer la majorité de la cour.|判事は大統領が指名し上院が承認する。75歳での定年制のため、二期8年務める大統領一人だけで、裁判所の過半数を任命し終えてしまうこともありうる。",
  ),
  q(
    7,
    "The Brazilian Congress building in Brasília is famous for two dome-like structures side by side — one bowl facing up, one facing down. Which chamber does the upward-facing bowl represent?|El edificio del Congreso brasileño en Brasilia es famoso por dos estructuras en forma de cúpula, una junto a la otra: un cuenco hacia arriba y otro hacia abajo. ¿Qué cámara representa el cuenco hacia arriba?|Le bâtiment du Congrès brésilien à Brasília est célèbre pour ses deux structures en forme de dôme côte à côte — l'une en forme de bol tourné vers le haut, l'autre vers le bas. Quelle chambre représente le bol tourné vers le haut ?|ブラジリアの国会議事堂は、上向きの椀形と下向きの椀形が並ぶ二つのドームで知られる。上向きの椀が表すのはどちらの議院か?",
    [
      "The Supreme Court|La Corte Suprema|La Cour suprême|最高裁判所",
      "The Chamber of Deputies|La Cámara de Diputados|La Chambre des députés|下院(代議院)",
      "The Senate|El Senado|Le Sénat|上院(元老院)",
    ],
    1,
    "Architect Oscar Niemeyer designed the upturned bowl, open to the sky, to symbolise the lower house's openness to the people, while the inverted dome housing the Senate is popularly said to represent a more closed, deliberative chamber.|El arquitecto Oscar Niemeyer diseñó el cuenco hacia arriba, abierto al cielo, para simbolizar la apertura de la cámara baja al pueblo, mientras que la cúpula invertida que alberga el Senado se dice popularmente que representa una cámara más cerrada y deliberativa.|L'architecte Oscar Niemeyer conçut le bol tourné vers le haut, ouvert sur le ciel, pour symboliser l'ouverture de la chambre basse au peuple, tandis que le dôme inversé abritant le Sénat représenterait, dit-on, une chambre plus fermée et délibérative.|建築家オスカー・ニーマイヤーは、空に向かって開いた上向きの椀で下院が民衆に開かれていることを表現したとされ、上院を収める逆さのドームは、より閉じた審議の場を表すとよく語られる。",
  ),
  q(
    7,
    "Harvesting Brazil nuts, gathered from the wild rather than farmed, is protected by a Brazilian law that forbids what regarding the towering trees that produce them?|La recolección de la nuez de Brasil, obtenida silvestre y no cultivada, está protegida por una ley brasileña que prohíbe qué respecto a los enormes árboles que la producen?|La récolte des noix du Brésil, cueillies à l'état sauvage plutôt que cultivées, est protégée par une loi brésilienne qui interdit quoi concernant les arbres imposants qui les produisent ?|栽培ではなく野生から採取されるブラジルナッツの採集は、ある法律によって守られている。それを実らせる高木について禁じられているのは何か?",
    [
      "Exporting the nuts unshelled|Exportar las nueces sin cáscara|Exporter les noix non décortiquées|殻付きのままの輸出",
      "Cutting them down, even on private land|Talarlos, incluso en tierras privadas|Les abattre, même sur un terrain privé|私有地であっても伐採すること",
      "Harvesting them before October|Cosecharlas antes de octubre|Les récolter avant octobre|10月前の採集",
    ],
    1,
    "The trees can live for over 500 years and only bear fruit reliably in undisturbed old-growth forest, which makes Brazil nuts an unusual case of a rainforest product whose economic value gives local communities a direct incentive to keep the forest standing rather than clear it.|Los árboles pueden vivir más de 500 años y solo dan fruto de forma fiable en bosque primario sin perturbar, lo que convierte a la nuez de Brasil en un caso poco común de un producto de la selva cuyo valor económico da a las comunidades locales un incentivo directo para mantener el bosque en pie en vez de talarlo.|Les arbres peuvent vivre plus de 500 ans et ne fructifient de façon fiable que dans une forêt primaire non perturbée, ce qui fait de la noix du Brésil un cas rare de produit forestier dont la valeur économique incite directement les communautés locales à préserver la forêt plutôt qu'à la défricher.|この木は500年を超えて生きることもあり、手つかずの原生林でなければ確実に実をつけない。そのためブラジルナッツは、森林を伐採するより残しておくほうが地元の共同体にとって経済的に得になる、熱帯雨林の産物として珍しい例となっている。",
  ),
  q(
    7,
    "In everyday Brazilian speech, the pronoun \"você\" has largely replaced which more formal, verb-conjugating pronoun still standard in European Portuguese?|En el habla cotidiana brasileña, el pronombre «você» ha reemplazado en gran medida a qué pronombre más formal, que exige conjugación verbal y sigue siendo estándar en el portugués europeo?|Dans le parler quotidien brésilien, le pronom « você » a largement remplacé quel pronom plus formel, exigeant une conjugaison verbale propre, resté standard en portugais européen ?|日常のブラジル・ポルトガル語で、「ヴォセー」がほとんど置き換えてしまった、ヨーロッパのポルトガル語ではいまも標準的な、独自の動詞活用を持つより丁寧な人称代名詞は?",
    [
      "Vós|Vós|Vós|ヴォス",
      "Tu|Tu|Tu|トゥ",
      "Ele|Ele|Ele|エレ",
    ],
    1,
    "A handful of Brazilian regions, notably parts of the South and the Northeast, kept using \"tu\" all along, though most speakers there pair it with the simpler \"você\" verb forms rather than the fuller conjugations still used in Portugal.|Un puñado de regiones brasileñas, sobre todo partes del Sur y del Nordeste, siguieron usando «tu» todo el tiempo, aunque la mayoría de sus hablantes lo combinan con las formas verbales más simples de «você» en vez de las conjugaciones completas que aún se usan en Portugal.|Une poignée de régions brésiliennes, notamment certaines parties du Sud et du Nordeste, ont continué d'utiliser « tu » sans interruption, bien que la plupart des locuteurs l'associent aux formes verbales simplifiées de « você » plutôt qu'aux conjugaisons complètes encore utilisées au Portugal.|ブラジルの一部地域、特に南部や北東部の一部では「トゥ」が使われ続けてきたが、そこでも多くの話者は、ポルトガルでいまも使われる完全な活用形ではなく、より簡略化された「ヴォセー」の動詞形と組み合わせて使っている。",
  ),
  q(
    7,
    "The 1984 mass protest movement demanding an immediate return to direct presidential elections, drawing crowds in the millions, was known by what slogan?|El movimiento de protesta masiva de 1984 que exigía el retorno inmediato a elecciones presidenciales directas, con multitudes de millones, se conocía con qué consigna?|Le mouvement de protestation de masse de 1984 réclamant un retour immédiat aux élections présidentielles directes, rassemblant des millions de personnes, était connu sous quel slogan ?|1984年、直接大統領選挙の即時実施を求め数百万人を動員した大衆抗議運動が掲げたスローガンは?",
    [
      "Fora Collor (\"Collor out\")|Fora Collor («Collor fuera»)|Fora Collor (« Collor dehors »)|「フォーラ・コロール(コロールは出て行け)」",
      "Diretas Já (\"Direct elections now\")|Diretas Já («Elecciones directas ya»)|Diretas Já (« Élections directes maintenant »)|「ジレータス・ジャー(いますぐ直接選挙を)」",
      "Passe Livre (\"Free fare\")|Passe Livre («Pasaje libre»)|Passe Livre (« Passe gratuit »)|「パッセ・リヴリ(無料乗車券を)」",
    ],
    1,
    "Congress narrowly rejected the constitutional amendment the movement was pushing for, and the military regime handed power instead to an indirectly elected civilian president in 1985 — direct presidential elections did not actually return to Brazil until 1989.|El Congreso rechazó por poco la enmienda constitucional que impulsaba el movimiento, y el régimen militar entregó el poder en su lugar a un presidente civil elegido indirectamente en 1985; las elecciones presidenciales directas no volvieron a Brasil hasta 1989.|Le Congrès rejeta de justesse l'amendement constitutionnel réclamé par le mouvement, et le régime militaire transmit plutôt le pouvoir à un président civil élu indirectement en 1985 — les élections présidentielles directes ne revinrent au Brésil qu'en 1989.|議会はこの運動が求めた憲法修正案をわずかの差で否決し、軍事政権は1985年、間接選挙で選ばれた文民大統領へと権力を譲った。直接大統領選挙がブラジルに実際に戻ったのは1989年になってからだった。",
  ),
  q(
    8,
    "Libras, Brazil's officially recognised sign language since a 2002 law, is linguistically closest to which country's sign language, rather than to spoken Portuguese?|Libras, la lengua de señas oficialmente reconocida en Brasil desde una ley de 2002, es lingüísticamente más cercana a la lengua de señas de qué país, en lugar del portugués hablado?|La Libras, langue des signes officiellement reconnue au Brésil depuis une loi de 2002, est linguistiquement la plus proche de la langue des signes de quel pays, plutôt que du portugais parlé ?|2002年の法律でブラジルの公用手話として認められたリブラスが、話し言葉のポルトガル語よりもむしろ言語的に近いとされる、他国の手話は?",
    [
      "American Sign Language|La lengua de señas estadounidense|La langue des signes américaine|アメリカ手話",
      "French Sign Language|La lengua de señas francesa|La langue des signes française|フランス手話",
      "Portuguese Sign Language|La lengua de señas portuguesa|La langue des signes portugaise|ポルトガル手話",
    ],
    1,
    "Like most sign languages, Libras developed independently of the spoken language around it, and its roots trace largely to French Sign Language, brought to Brazil by a deaf French teacher who founded the country's first school for deaf students in Rio in 1857.|Como la mayoría de las lenguas de señas, Libras se desarrolló de forma independiente de la lengua hablada a su alrededor, y sus raíces se remontan en gran parte a la lengua de señas francesa, traída a Brasil por un profesor sordo francés que fundó en Río, en 1857, la primera escuela del país para estudiantes sordos.|Comme la plupart des langues des signes, la Libras s'est développée indépendamment de la langue parlée environnante, et ses racines remontent en grande partie à la langue des signes française, apportée au Brésil par un enseignant sourd français qui fonda à Rio, en 1857, la première école du pays pour élèves sourds.|多くの手話がそうであるように、リブラスも周囲の話し言葉とは独立して発展した。その源流の多くはフランス手話にさかのぼり、1857年にリオで国内初の聾学校を開いたフランス人の聾者教師によってブラジルにもたらされた。",
  ),
  q(
    8,
    "A 2009 spelling reform, the Acordo Ortográfico, aimed to unify written Portuguese across Brazil, Portugal and other Lusophone countries. What did it mainly remove from Brazilian spelling?|Una reforma ortográfica de 2009, el Acordo Ortográfico, buscaba unificar el portugués escrito entre Brasil, Portugal y otros países lusófonos. ¿Qué eliminó principalmente de la ortografía brasileña?|Une réforme orthographique de 2009, l'Acordo Ortográfico, visait à unifier le portugais écrit entre le Brésil, le Portugal et d'autres pays lusophones. Qu'a-t-elle principalement supprimé de l'orthographe brésilienne ?|2009年の正書法協定は、ブラジル・ポルトガル・その他のポルトガル語圏諸国にまたがる表記を統一しようとするものだった。ブラジル側の表記から主に取り除かれたものは?",
    [
      "All accent marks|Todos los acentos|Tous les accents|すべてのアクセント記号",
      "The letter \"ç\"|La letra «ç»|La lettre « ç »|文字「ç」",
      "The diaeresis mark (trema) over certain letters|La diéresis (trema) sobre ciertas letras|Le tréma sur certaines lettres|一部の文字の上に付くトレマ(分音記号)",
    ],
    2,
    "The reform proved unpopular and was resisted for years, especially in Portugal, since it mostly asked Portugal to drop silent consonants that Brazilian spelling had already lacked — effectively bringing European spelling closer to the Brazilian standard rather than the other way around.|La reforma resultó impopular y se resistió durante años, sobre todo en Portugal, ya que sobre todo pedía a Portugal eliminar consonantes mudas que la ortografía brasileña ya no tenía, acercando de hecho la ortografía europea al estándar brasileño y no al revés.|La réforme s'avéra impopulaire et fut contestée pendant des années, surtout au Portugal, car elle demandait surtout au Portugal de supprimer des consonnes muettes que l'orthographe brésilienne avait déjà abandonnées — rapprochant en réalité l'orthographe européenne du standard brésilien plutôt que l'inverse.|この改革は不人気で、特にポルトガルで何年も抵抗にあった。というのも、主にポルトガル側に、ブラジル表記ではすでに使われていなかった黙字の子音を落とすよう求めるもので、実質的にはヨーロッパ側の表記をブラジル側の基準に近づける改革だったからである。",
  ),
  q(
    8,
    "In the mid-2000s, Petrobras confirmed a major offshore oil discovery trapped beneath a thick layer of what, far out in the Atlantic?|A mediados de la década de 2000, Petrobras confirmó un importante descubrimiento de petróleo mar adentro, atrapado bajo una gruesa capa de qué, muy lejos en el Atlántico?|Au milieu des années 2000, Petrobras confirma une importante découverte de pétrole offshore, piégé sous une épaisse couche de quoi, loin au large dans l'Atlantique ?|2000年代半ば、ペトロブラスは大西洋沖はるか沖合で、何の分厚い層の下に閉じ込められた大規模な石油の発見を確認したか?",
    [
      "Basalt|Basalto|Basalte|玄武岩",
      "Ice|Hielo|Glace|氷",
      "Salt|Sal|Sel|塩",
    ],
    2,
    "The so-called \"pre-salt\" reserves lie several kilometres under the seabed, below a salt layer long assumed to make drilling too difficult to be worthwhile, and their development turned Brazil from a marginal oil importer into a major crude exporter within about a decade.|Las llamadas reservas «presal» se encuentran varios kilómetros bajo el lecho marino, debajo de una capa de sal que durante mucho tiempo se supuso haría la perforación demasiado difícil como para valer la pena, y su desarrollo convirtió a Brasil, en cosa de una década, de importador marginal de petróleo en gran exportador de crudo.|Les réserves dites « pré-sel » se trouvent à plusieurs kilomètres sous le fond marin, sous une couche de sel longtemps jugée trop difficile à forer pour en valoir la peine, et leur exploitation a transformé le Brésil, en une décennie environ, d'importateur marginal de pétrole en grand exportateur de brut.|「プレサル(塩下層)」と呼ばれるこの油田は、掘削は割に合わないほど困難だと長らく考えられてきた塩の層の下、海底からさらに数キロの深さにある。その開発により、ブラジルはおよそ10年ほどで、わずかな石油輸入国から主要な原油輸出国へと変貌した。",
  ),
  q(
    8,
    "What was the name of Brazil's currency immediately before the real, introduced in 1993 and swiftly replaced within about a year?|¿Cómo se llamaba la moneda de Brasil justo antes del real, introducida en 1993 y sustituida rápidamente al cabo de un año?|Comment s'appelait la monnaie du Brésil juste avant le real, introduite en 1993 et rapidement remplacée en l'espace d'environ un an ?|1993年に導入され、わずか1年ほどで置き換えられた、レアルの直前のブラジルの通貨の名は?",
    [
      "Cruzado Novo|Cruzado Novo|Cruzado Novo|クルザード・ノーヴォ",
      "Cruzeiro Novo|Cruzeiro Novo|Cruzeiro Novo|クルゼイロ・ノーヴォ",
      "Cruzeiro Real|Cruzeiro Real|Cruzeiro Real|クルゼイロ・レアル",
    ],
    2,
    "It was the shortest-lived of all Brazil's 20th-century currencies, lasting barely a year before being replaced by the real as the final step of a broader stabilisation plan aimed at ending chronic hyperinflation.|Fue la moneda de vida más corta de todas las del Brasil del siglo XX, apenas un año, antes de ser reemplazada por el real como paso final de un plan de estabilización más amplio destinado a acabar con la hiperinflación crónica.|Ce fut la monnaie brésilienne du XXe siècle la plus éphémère, à peine un an, avant d'être remplacée par le real comme étape finale d'un plan de stabilisation plus large visant à mettre fin à l'hyperinflation chronique.|これはブラジルの20世紀の通貨の中でもっとも短命で、わずか1年ほどでレアルに置き換えられた。これは慢性的なハイパーインフレを終わらせるための、より大きな安定化計画の最終段階だった。",
  ),
  q(
    8,
    "During the military dictatorship, a 1968 decree known as Institutional Act Number Five (AI-5) did what?|Durante la dictadura militar, ¿qué hizo un decreto de 1968 conocido como Acta Institucional Número Cinco (AI-5)?|Sous la dictature militaire, qu'a fait un décret de 1968 connu sous le nom d'Acte Institutionnel Numéro Cinq (AI-5) ?|軍事政権下、1968年に出された「制度法5号(AI-5)」と呼ばれる布告が行ったことは?",
    [
      "Abolished the death penalty nationwide|Abolió la pena de muerte en todo el país|Abolit la peine de mort dans tout le pays|全国で死刑を廃止した",
      "Restored direct presidential elections early|Restauró anticipadamente las elecciones presidenciales directas|Rétablit par anticipation les élections présidentielles directes|直接大統領選挙を前倒しで復活させた",
      "Suspended constitutional rights and closed Congress|Suspendió los derechos constitucionales y cerró el Congreso|Suspendit les droits constitutionnels et ferma le Congrès|憲法上の権利を停止し議会を閉鎖した",
    ],
    2,
    "Issued after a congressman's speech angered the military leadership, AI-5 gave the president power to rule by decree, suspend habeas corpus and shut down Congress, and it remained in force for a decade, marking the dictatorship's most severe period of censorship and repression.|Emitida tras un discurso de un diputado que enfureció al mando militar, AI-5 dio al presidente poder para gobernar por decreto, suspender el habeas corpus y cerrar el Congreso, y permaneció vigente durante una década, marcando el período de censura y represión más severo de la dictadura.|Émis après qu'un discours d'un député eut irrité le commandement militaire, l'AI-5 donna au président le pouvoir de gouverner par décret, de suspendre l'habeas corpus et de fermer le Congrès, et resta en vigueur pendant une décennie, marquant la période de censure et de répression la plus sévère de la dictature.|ある国会議員の演説が軍指導部を激怒させたことを受けて出されたAI-5は、大統領に布告による統治権、人身保護令状の停止権、議会閉鎖権を与えた。この布告は10年にわたり効力を持ち続け、独裁政権下でもっとも厳しい検閲と弾圧の時期を画すこととなった。",
  ),
  q(
    8,
    "The Caatinga, a semi-arid scrubland biome covering much of Brazil's Northeastern interior, is unusual among Brazil's biomes because of what?|La Caatinga, un bioma de matorral semiárido que cubre buena parte del interior del nordeste de Brasil, es inusual entre los biomas brasileños por qué motivo?|La Caatinga, un biome de savane arbustive semi-aride couvrant une grande partie de l'intérieur du Nordeste brésilien, est inhabituel parmi les biomes du Brésil pour quelle raison ?|ブラジル北東部の内陸の大半を覆う半乾燥の低木地帯カアチンガが、ブラジルの生態系の中で異例とされる理由は?",
    [
      "It was created artificially by centuries of farming|Fue creada artificialmente por siglos de agricultura|Il a été créé artificiellement par des siècles d'agriculture|何世紀もの農耕によって人為的に作られたから",
      "It lies almost entirely underwater during the wet season|Queda casi totalmente bajo el agua en la temporada de lluvias|Il est presque entièrement submergé pendant la saison des pluies|雨季にはほぼ全体が水没するから",
      "It exists nowhere else on Earth outside Brazil|No existe en ningún otro lugar del planeta fuera de Brasil|Il n'existe nulle part ailleurs sur Terre en dehors du Brésil|ブラジル以外の地球上どこにも存在しないから",
    ],
    2,
    "The name comes from a Tupi phrase meaning \"white forest\", describing how the scrub's drought-adapted trees look leafless and bone-white for much of the dry season before flushing green within days of the first rain.|El nombre viene de una frase tupí que significa «bosque blanco», que describe cómo los árboles del matorral, adaptados a la sequía, se ven sin hojas y blanquecinos gran parte de la estación seca, antes de reverdecer a los pocos días de la primera lluvia.|Le nom vient d'une expression tupi signifiant « forêt blanche », décrivant comment les arbres du maquis, adaptés à la sécheresse, paraissent sans feuilles et blanchâtres une grande partie de la saison sèche, avant de reverdir en quelques jours après la première pluie.|「カアチンガ」という名はトゥピ語で「白い森」を意味する言葉に由来し、乾燥に適応したこの低木林が乾季の大半は葉を落として骨のように白く見え、最初の雨が降ってから数日のうちに緑を取り戻す様子を表している。",
  ),
  q(
    8,
    "The cuíca, a small friction drum central to samba percussion, produces its distinctive high-pitched squeal, likened to laughing or talking, by rubbing what against the inside of its drumhead?|El cuíca, un pequeño tambor de fricción central en la percusión de samba, produce su característico chillido agudo, comparado con una risa o un habla, al frotar qué contra el interior de su parche?|Le cuíca, petit tambour à friction essentiel de la percussion samba, produit son cri aigu caractéristique, comparé à un rire ou à une voix, en frottant quoi contre l'intérieur de sa peau ?|サンバの打楽器隊の要である小型の摩擦太鼓クイーカは、笑い声や話し声にたとえられる特徴的な甲高い音を、革の内側に取り付けた何をこすることで出すか?",
    [
      "A bow made of horsehair|Un arco de crin de caballo|Un archet en crin de cheval|馬の毛でできた弓",
      "A metal coin|Una moneda de metal|Une pièce de monnaie|金属製のコイン",
      "A wet stick fixed to the drumhead's underside|Un palito húmedo fijado al interior del parche|Un bâtonnet humide fixé sous la peau|革の裏に固定された濡れた棒",
    ],
    2,
    "The player's other hand presses on the drumhead's outer surface to bend the pitch while the stick is rubbed, and the instrument is thought to descend from similar friction drums used in Central African ritual, adapted in Brazil for Carnival's percussion sections.|La otra mano del intérprete presiona la superficie exterior del parche para modular el tono mientras se frota el palito, y se cree que el instrumento desciende de tambores de fricción similares usados en rituales centroafricanos, adaptados en Brasil para las secciones de percusión del Carnaval.|L'autre main du musicien presse la surface extérieure de la peau pour moduler la hauteur pendant que le bâtonnet est frotté, et l'instrument descendrait de tambours à friction similaires utilisés dans les rituels d'Afrique centrale, adaptés au Brésil pour les sections de percussion du Carnaval.|奏者はもう片方の手で革の外側を押さえて音程を変えながら棒をこする。この楽器は中央アフリカの儀礼で使われていた似た構造の摩擦太鼓に由来するとされ、ブラジルではカーニバルの打楽器隊向けに作り替えられた。",
  ),
  q(
    8,
    "Rio's top samba schools compete each year in the elite \"Grupo Especial\". What happens to the school that finishes last in that group?|Las mejores escuelas de samba de Río compiten cada año en el «Grupo Especial» de élite. ¿Qué le ocurre a la escuela que queda última en ese grupo?|Les meilleures écoles de samba de Rio s'affrontent chaque année dans le « Grupo Especial » d'élite. Que se passe-t-il pour l'école arrivée dernière de ce groupe ?|リオの一流サンバ学校が毎年競う最上位グループ「グルーポ・エスペシアル」で最下位になった学校に起こることは?",
    [
      "It automatically wins the next year's theme selection|Gana automáticamente la selección del tema del año siguiente|Elle remporte automatiquement le choix du thème de l'année suivante|翌年のテーマ選定を自動的に獲得する",
      "It is banned from Carnival for five years|Queda vetada del Carnaval durante cinco años|Elle est bannie du Carnaval pendant cinq ans|5年間カーニバルへの出場を禁じられる",
      "It is relegated to a lower division for the following year|Desciende a una división inferior para el año siguiente|Elle est reléguée dans une division inférieure l'année suivante|翌年、下位のディビジョンに降格される",
    ],
    2,
    "The system mirrors football league relegation, and a single misstep during the parade — a float breaking down, a flag-bearer stumbling — can cost a school enough points to be dropped, which is why judges' scoring criteria are argued over as fiercely as any championship result.|El sistema es similar al descenso de las ligas de fútbol, y un solo tropiezo durante el desfile —una carroza que se avería, un portaestandarte que tropieza— puede costarle a una escuela los puntos suficientes para descender, por lo que los criterios de puntuación de los jueces se discuten con tanta pasión como cualquier resultado de campeonato.|Le système ressemble à la relégation des ligues de football, et un seul faux pas pendant le défilé — un char en panne, un porte-drapeau qui trébuche — peut coûter à une école assez de points pour être reléguée, ce qui explique pourquoi les critères de notation des juges sont autant contestés que n'importe quel résultat de championnat.|この仕組みはサッカーリーグの降格制度に似ており、パレード中のたった一つの失敗——山車の故障や旗持ちのつまずき——だけでも降格に足る減点となりかねない。そのため審査員の採点基準は、どんな選手権の結果にも劣らぬ激しさで議論の的になる。",
  ),
  q(
    8,
    "Everyday Brazilian Portuguese words like \"moleque\" (kid), \"caçula\" (youngest child) and \"cafuné\" (affectionate head-stroking) entered the language from which African language family, brought by enslaved people?|Palabras cotidianas del portugués brasileño como «moleque» (niño), «caçula» (hijo menor) y «cafuné» (caricia cariñosa en la cabeza) entraron en el idioma desde qué familia lingüística africana, traída por personas esclavizadas?|Des mots courants du portugais brésilien comme « moleque » (gamin), « caçula » (benjamin) et « cafuné » (caresse affectueuse sur la tête) sont entrés dans la langue depuis quelle famille de langues africaines, apportée par des personnes réduites en esclavage ?|「モレッキ(子ども)」「カスラ(末っ子)」「カフネー(愛情を込めて頭をなでること)」といった日常のブラジル・ポルトガル語の単語は、奴隷にされた人々が持ち込んだどのアフリカの言語族から取り入れられたか?",
    [
      "Mandarin|Mandarín|Le mandarin|北京語(官話)",
      "Arabic|Árabe|L'arabe|アラビア語",
      "Bantu languages|Lenguas bantúes|Les langues bantoues|バントゥー諸語",
    ],
    2,
    "Linguists count several hundred Bantu-derived words in everyday Brazilian Portuguese, far more than survive in European Portuguese, a legacy of the millions of enslaved Bantu-speaking Central Africans forcibly brought to Brazil over three centuries.|Los lingüistas cuentan varios cientos de palabras de origen bantú en el portugués brasileño cotidiano, muchas más de las que sobreviven en el portugués europeo, un legado de los millones de africanos centrales de habla bantú traídos por la fuerza a Brasil durante tres siglos.|Les linguistes recensent plusieurs centaines de mots d'origine bantoue dans le portugais brésilien courant, bien plus que ce qui subsiste en portugais européen, un héritage des millions d'Africains centraux bantouphones amenés de force au Brésil sur trois siècles.|言語学者によれば、日常のブラジル・ポルトガル語にはバントゥー語由来の単語が数百語も残っており、ヨーロッパのポルトガル語に残る数をはるかに上回る。これは三世紀にわたり何百万人ものバントゥー語系中央アフリカ人が強制的にブラジルへ連れてこられた歴史の遺産である。",
  ),
  q(
    9,
    "Cangaceiro bandits of Brazil's Northeastern backlands in the early 20th century were known for wearing broad leather hats decorated with what?|Los bandidos cangaceiros del sertón nordestino brasileño de principios del siglo XX eran conocidos por llevar sombreros de cuero de ala ancha decorados con qué?|Les bandits cangaceiros de l'arrière-pays nordestin brésilien du début du XXe siècle étaient connus pour porter de larges chapeaux de cuir ornés de quoi ?|20世紀初頭、ブラジル北東部の奥地で活動した盗賊カンガセイロたちが、幅広の革帽子を飾り立てていたことで知られる装飾品は?",
    [
      "Painted family crests|Escudos familiares pintados|Des blasons familiaux peints|彩色された家紋",
      "Peacock feathers|Plumas de pavo real|Des plumes de paon|クジャクの羽根",
      "Metal stars, medals and coins|Estrellas, medallas y monedas de metal|Des étoiles, médailles et pièces en métal|金属製の星や勲章、硬貨",
    ],
    2,
    "The hats, worn with tightly tailored leather clothing meant to protect against thorny scrub, became so iconic that the style is now sold as folk-craft souvenirs across the Northeast — a strange afterlife for what began as bandit gear meant to intimidate.|Los sombreros, usados con ropa de cuero muy ajustada pensada para proteger contra la maleza espinosa, se volvieron tan icónicos que el estilo hoy se vende como recuerdo artesanal por todo el Nordeste, un extraño destino final para lo que comenzó como equipo de bandidos pensado para intimidar.|Ces chapeaux, portés avec des vêtements de cuir ajustés destinés à protéger des broussailles épineuses, devinrent si emblématiques que ce style est aujourd'hui vendu comme souvenir artisanal dans tout le Nordeste — un étrange destin pour ce qui commença comme un équipement de bandits destiné à intimider.|棘だらけの藪から身を守るための体に密着した革の衣装とともに身につけられたこの帽子は、あまりに象徴的になり、いまでは北東部各地で民芸品の土産として売られている。もとは相手を威圧するための盗賊の装束だったものの、奇妙な後日談である。",
  ),
  q(
    9,
    "The Portuguese words \"abacaxi\" (pineapple), \"mandioca\" (cassava) and \"piranha\" all entered the language from which Indigenous Brazilian language family?|Las palabras portuguesas «abacaxi» (piña), «mandioca» y «piranha» entraron todas en el idioma desde qué familia lingüística indígena brasileña?|Les mots portugais « abacaxi » (ananas), « mandioca » (manioc) et « piranha » sont tous entrés dans la langue depuis quelle famille de langues autochtones brésiliennes ?|ポルトガル語の「アバカシ(パイナップル)」「マンジオカ(キャッサバ)」「ピラニア」は、いずれもどの先住民言語族からブラジル・ポルトガル語に取り入れられたか?",
    [
      "Aymara|Aimara|L'aymara|アイマラ語族",
      "Quechua|Quechua|Le quechua|ケチュア語族",
      "Tupi|Tupí|Le tupi|トゥピ語族",
    ],
    2,
    "Tupi speakers had named plants and animals unfamiliar to the Portuguese so precisely that colonists simply borrowed the words wholesale rather than inventing new ones, and hundreds of such Tupi loanwords remain everyday vocabulary in Brazilian Portuguese today.|Los hablantes de tupí habían nombrado plantas y animales desconocidos para los portugueses con tal precisión que los colonos simplemente tomaron prestadas las palabras en vez de inventar otras nuevas, y cientos de esos préstamos tupíes siguen siendo vocabulario cotidiano en el portugués brasileño de hoy.|Les locuteurs tupi avaient nommé des plantes et animaux inconnus des Portugais avec une telle précision que les colons empruntèrent simplement les mots plutôt que d'en inventer de nouveaux, et des centaines de ces emprunts tupis restent aujourd'hui du vocabulaire courant en portugais brésilien.|トゥピ語の話者たちは、ポルトガル人にとって未知の動植物にあまりに的確な名を付けていたため、入植者たちは新語を作るのではなく、そのままその言葉を借用した。こうしたトゥピ語由来の借用語は何百語も、いまも日常のブラジル・ポルトガル語の語彙として残っている。",
  ),
  q(
    9,
    "Marechal Cândido Rondon, who charted vast stretches of the Amazon while laying telegraph lines in the early 1900s, founded a pioneering government agency for what purpose?|El mariscal Cândido Rondon, que cartografió vastas extensiones de la Amazonía mientras tendía líneas telegráficas a comienzos del siglo XX, fundó una pionera agencia gubernamental con qué propósito?|Le maréchal Cândido Rondon, qui cartographia de vastes étendues de l'Amazonie tout en posant des lignes télégraphiques au début des années 1900, fonda une agence gouvernementale pionnière dans quel but ?|20世紀初頭、電信線の敷設と並行してアマゾンの広大な地域を測量した陸軍元帥カンジド・ロンドンが、先駆的な政府機関を創設した目的は?",
    [
      "Mapping ocean currents|Cartografiar las corrientes oceánicas|Cartographier les courants océaniques|海流の測量",
      "Regulating the rubber trade|Regular el comercio del caucho|Réguler le commerce du caoutchouc|ゴム貿易の規制",
      "Protecting Indigenous peoples' rights and lands|Proteger los derechos y las tierras de los pueblos indígenas|Protéger les droits et les terres des peuples autochtones|先住民の権利と土地の保護",
    ],
    2,
    "Rondon adopted the motto \"Die if necessary, but never kill\" for his expeditions' dealings with Indigenous groups, an unusually restrained policy for its era, and the state of Rondônia, carved out of the western Amazon in 1981, was later named in his honour.|Rondon adoptó el lema «Morir si es necesario, pero nunca matar» para el trato de sus expediciones con los pueblos indígenas, una política inusualmente moderada para su época, y el estado de Rondônia, creado en la Amazonía occidental en 1981, fue nombrado más tarde en su honor.|Rondon adopta la devise « Mourir si nécessaire, mais ne jamais tuer » pour les relations de ses expéditions avec les peuples autochtones, une politique inhabituellement mesurée pour son époque, et l'État de Rondônia, créé dans l'Amazonie occidentale en 1981, fut plus tard nommé en son honneur.|ロンドンは自らの探検隊が先住民と接する際の指針として「必要なら死ね、しかし決して殺すな」という標語を掲げた。これは当時としては異例なほど抑制の効いた方針だった。1981年に西アマゾンから分離して生まれたロンドニア州は、のちに彼の名にちなんで名付けられた。",
  ),
  q(
    9,
    "Frevo, a fast, athletic Carnival dance from Pernambuco recognised by UNESCO, is traditionally performed while holding what small prop?|El frevo, un baile de Carnaval rápido y atlético de Pernambuco reconocido por la UNESCO, se baila tradicionalmente sosteniendo qué pequeño objeto?|Le frevo, danse de Carnaval rapide et athlétique de Pernambuco reconnue par l'UNESCO, se danse traditionnellement en tenant quel petit accessoire ?|ユネスコに認定されたペルナンブコ州の速く運動量の多いカーニバルの舞踊フレーヴォで、伝統的に手に持ちながら踊る小道具は?",
    [
      "A pair of wooden clappers|Un par de castañuelas de madera|Une paire de claquettes en bois|木製の拍子木",
      "A long silk ribbon|Una larga cinta de seda|Un long ruban de soie|長い絹のリボン",
      "A colourful folding umbrella|Una colorida sombrilla plegable|Un parapluie pliant coloré|色鮮やかな折りたたみ傘",
    ],
    2,
    "Dancers use the umbrella's spring-loaded ribs both for balance during frevo's near-acrobatic low kicks and splits and for a flourish at sudden musical stops, and the dance's name comes from \"ferver\" (to boil), describing how the fast brass-band music seems to make crowds bubble over with movement.|Los bailarines usan las varillas elásticas de la sombrilla tanto para equilibrarse durante las patadas bajas y aperturas casi acrobáticas del frevo como para un floreo en las paradas musicales repentinas, y el nombre del baile viene de «ferver» (hervir), que describe cómo la rápida música de banda de metales parece hacer que las multitudes hierva en movimiento.|Les danseurs utilisent les baleines élastiques du parapluie à la fois pour l'équilibre lors des coups de pied bas et écarts quasi acrobatiques du frevo et pour une fioriture lors des arrêts musicaux soudains, et le nom de la danse vient de « ferver » (bouillir), décrivant comment la musique rapide de fanfare semble faire bouillonner les foules de mouvement.|踊り手は傘のばね仕掛けの骨を、フレーヴォ特有のほぼアクロバティックな低い蹴りや開脚での体のバランス取りにも、音楽が突然止まる瞬間の見せ場にも使う。この踊りの名は「沸く」を意味する「フェルヴェル」に由来し、速いブラスバンドの音楽が群衆を沸き立たせるさまを表している。",
  ),
  q(
    9,
    "The words \"Ordem e Progresso\" (\"Order and Progress\") on Brazil's flag were inspired by the motto of which 19th-century philosophical movement?|Las palabras «Ordem e Progresso» («Orden y Progreso») en la bandera de Brasil se inspiraron en el lema de qué movimiento filosófico del siglo XIX?|Les mots « Ordem e Progresso » (« Ordre et Progrès ») sur le drapeau du Brésil s'inspirèrent de la devise de quel mouvement philosophique du XIXe siècle ?|ブラジル国旗に記された「オルデン・イ・プログレッソ(秩序と進歩)」の言葉が着想を得た、19世紀の哲学運動の標語は?",
    [
      "Existentialism|Existencialismo|L'existentialisme|実存主義",
      "Utilitarianism|Utilitarismo|L'utilitarisme|功利主義",
      "Positivism|Positivismo|Le positivisme|実証主義",
    ],
    2,
    "The phrase paraphrases positivist philosopher Auguste Comte's fuller motto, \"Love as a principle, order as a basis, progress as a goal\", and positivist military officers were influential among the young republicans who deposed the emperor in 1889 and designed the new flag within days.|La frase parafrasea el lema más completo del filósofo positivista Auguste Comte, «El amor por principio, el orden por base, el progreso por meta», y oficiales militares positivistas fueron influyentes entre los jóvenes republicanos que depusieron al emperador en 1889 y diseñaron la nueva bandera en cuestión de días.|La phrase paraphrase la devise plus complète du philosophe positiviste Auguste Comte, « L'amour pour principe, l'ordre pour base, le progrès pour but », et des officiers militaires positivistes furent influents parmi les jeunes républicains qui déposèrent l'empereur en 1889 et conçurent le nouveau drapeau en quelques jours à peine.|この標語は、実証主義の哲学者オーギュスト・コントによる、より長い標語「愛を原理とし、秩序を基礎とし、進歩を目的とする」を言い換えたものである。実証主義に傾倒した軍人たちは、1889年に皇帝を退位させ、わずか数日で新しい国旗を作り上げた若き共和派の中で大きな影響力を持っていた。",
  ),
  q(
    9,
    "To describe an action in progress (\"I am doing\"), Brazilian Portuguese typically uses a gerund (\"estou fazendo\"). Which construction does European Portuguese favour instead?|Para describir una acción en curso («estoy haciendo»), el portugués brasileño usa típicamente un gerundio («estou fazendo»). ¿Qué construcción prefiere en cambio el portugués europeo?|Pour décrire une action en cours (« je suis en train de faire »), le portugais brésilien utilise généralement un gérondif (« estou fazendo »). Quelle construction le portugais européen privilégie-t-il à la place ?|進行中の動作(「〜している」)を表すのに、ブラジル・ポルトガル語は動名詞形(「エストウ・ファゼンド」)を使うのが普通である。ヨーロッパのポルトガル語がその代わりに好む構文は?",
    [
      "The subjunctive mood throughout|El modo subjuntivo en todo momento|Le mode subjonctif systématiquement|一貫した接続法",
      "A doubled verb (\"faço-faço\")|Un verbo duplicado («faço-faço»)|Un verbe redoublé (« faço-faço »)|動詞の重複(「ファソー・ファソー」)",
      "\"Estar a\" plus the infinitive (\"estou a fazer\")|«Estar a» más el infinitivo («estou a fazer»)|« Estar a » suivi de l'infinitif (« estou a fazer »)|「エスタール・ア」に不定詞を続ける形(「エストウ・ア・ファゼル」)",
    ],
    2,
    "The difference is one of the quickest ways Portuguese speakers place each other's accents, alongside vocabulary splits like Brazilian \"trem\" versus Portuguese \"comboio\" for \"train\", and Brazilian \"ônibus\" versus Portuguese \"autocarro\" for \"bus\".|La diferencia es una de las formas más rápidas en que los hablantes de portugués reconocen el acento del otro, junto con divisiones de vocabulario como «trem» brasileño frente a «comboio» portugués para «tren», y «ônibus» brasileño frente a «autocarro» portugués para «autobús».|Cette différence est l'un des moyens les plus rapides pour les lusophones de repérer l'accent de l'autre, aux côtés de divergences de vocabulaire comme « trem » brésilien contre « comboio » portugais pour « train », et « ônibus » brésilien contre « autocarro » portugais pour « bus ».|この違いは、ポルトガル語話者どうしが互いの訛りをすぐに聞き分ける手がかりの一つで、「電車」を意味するブラジルの「トレン」とポルトガルの「コンボイオ」、「バス」を意味するブラジルの「オニブス」とポルトガルの「アウトカーホ」といった語彙の違いとも並ぶ。",
  ),
  q(
    9,
    "The Kuarup, an elaborate multi-day funerary ceremony honouring the recently dead of several different peoples together, is practised by Indigenous communities of which Brazilian region?|El kuarup, una elaborada ceremonia fúnebre de varios días que honra en conjunto a los fallecidos recientes de varios pueblos distintos, la practican comunidades indígenas de qué región de Brasil?|Le Kuarup, cérémonie funéraire élaborée de plusieurs jours honorant ensemble les morts récents de plusieurs peuples différents, est pratiqué par des communautés autochtones de quelle région du Brésil ?|複数の異なる民族の死者を合同で追悼する、数日がかりの精緻な葬送儀礼クアルップが、ブラジルのどの地域の先住民共同体によって行われているか?",
    [
      "Coastal Bahia|La costa de Bahía|La côte de Bahia|バイーア州沿岸部",
      "The Pantanal wetlands|Los humedales del Pantanal|Les zones humides du Pantanal|パンタナール湿地",
      "The Xingu River basin|La cuenca del río Xingu|Le bassin du fleuve Xingu|シングー川流域",
    ],
    2,
    "The ceremony, which can draw together more than a dozen different Xingu peoples who otherwise rarely gather, involves carving tree trunks to represent the honoured dead, and anthropologist brothers Orlando and Cláudio Villas-Bôas helped bring the Xingu peoples together into a shared protected territory in 1961.|La ceremonia, que puede reunir a más de una docena de pueblos distintos del Xingu que de otro modo rara vez se juntan, incluye tallar troncos de árbol para representar a los difuntos honrados, y los hermanos antropólogos Orlando y Cláudio Villas-Bôas ayudaron a reunir a los pueblos del Xingu en un territorio protegido compartido en 1961.|Cette cérémonie, qui peut réunir plus d'une douzaine de peuples xinguanos différents se rassemblant rarement autrement, consiste à sculpter des troncs d'arbres pour représenter les défunts honorés, et les frères anthropologues Orlando et Cláudio Villas-Bôas contribuèrent à rassembler les peuples du Xingu au sein d'un territoire protégé commun en 1961.|この儀礼は、普段はめったに一堂に会さないシングー地域の十を超える民族が集うこともあり、敬われる死者を表す木の幹を彫ることを伴う。人類学者の兄弟オルランド・ヴィラス=ボアスとクラウジオ・ヴィラス=ボアスは1961年、シングーの諸民族をまとめて共有の保護区にする働きかけに携わった。",
  ),
  q(
    9,
    "Brazil's environmental agencies officially recognise how many major terrestrial biomes within the country?|¿Cuántos grandes biomas terrestres reconocen oficialmente las agencias ambientales de Brasil dentro del país?|Combien de grands biomes terrestres les agences environnementales du Brésil reconnaissent-elles officiellement dans le pays ?|ブラジルの環境当局が国内で公式に認定している主要な陸上生態系(バイオーム)はいくつあるか?",
    [
      "Nine|Nueve|Neuf|9つ",
      "Four|Cuatro|Quatre|4つ",
      "Six|Seis|Six|6つ",
    ],
    2,
    "The six — Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa and Pantanal — span everything from dense rainforest to temperate grassland near the Uruguayan border, and while the Amazon and Cerrado are by far the largest by area, the Pampa, confined to a sliver of Rio Grande do Sul, is the smallest and least protected of the six.|Los seis —Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa y Pantanal— abarcan desde la densa selva tropical hasta la pradera templada cerca de la frontera uruguaya, y aunque la Amazônia y el Cerrado son con diferencia los más grandes en superficie, el Pampa, confinado a una franja de Rio Grande do Sul, es el más pequeño y menos protegido de los seis.|Les six — Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa et Pantanal — vont de la forêt tropicale dense à la prairie tempérée près de la frontière uruguayenne, et si l'Amazonie et le Cerrado sont de loin les plus vastes en superficie, le Pampa, confiné à une frange du Rio Grande do Sul, est le plus petit et le moins protégé des six.|アマゾニア・セラード・マタ・アトランチカ・カアチンガ・パンパ・パンタナールの6つは、密林からウルグアイ国境近くの温帯草原まで多岐にわたる。アマゾンとセラードが面積では圧倒的に大きい一方、ヒオグランデ・ド・スル州のごく一部に限られるパンパは、6つの中でもっとも小さく保護も手薄である。",
  ),
  q(
    10,
    "The 1835 Malê Revolt in Salvador, one of the largest urban slave rebellions in the Americas, was organised largely by enslaved and freed Africans practising which faith, many of them literate in Arabic script?|La Revuelta de los Malês de 1835 en Salvador, una de las mayores rebeliones urbanas de esclavos en América, fue organizada en gran parte por africanos esclavizados y libertos que practicaban qué fe, muchos alfabetizados en escritura árabe?|La révolte malê de 1835 à Salvador, l'une des plus grandes révoltes urbaines d'esclaves des Amériques, fut organisée en grande partie par des Africains réduits en esclavage et affranchis pratiquant quelle foi, beaucoup lettrés en écriture arabe ?|アメリカ大陸最大級の都市部での奴隷反乱の一つ、1835年サルバドールのマレー蜂起を主に組織したのは、多くがアラビア文字の読み書きができた、どの信仰を実践する奴隷にされた人々と解放された人々だったか?",
    [
      "Anglican Christianity|El cristianismo anglicano|Le christianisme anglican|英国国教会",
      "Judaism|El judaísmo|Le judaïsme|ユダヤ教",
      "Islam|El islam|L'islam|イスラム教",
    ],
    2,
    "\"Malê\", a term likely derived from a Yoruba word for Muslim, denoted the mostly Hausa and Yoruba rebels who used Arabic-script amulets and messages to coordinate the uprising, and the resulting crackdown included some of the harshest anti-literacy and anti-assembly measures imposed on Black residents anywhere in 19th-century Brazil.|«Malê», término probablemente derivado de una palabra yoruba para musulmán, designaba a los rebeldes, en su mayoría hausa y yoruba, que usaron amuletos y mensajes en escritura árabe para coordinar el levantamiento, y la represión resultante incluyó algunas de las medidas antialfabetización y antirreunión más duras impuestas a residentes negros en cualquier parte del Brasil del siglo XIX.|« Malê », terme probablement dérivé d'un mot yoruba désignant les musulmans, désignait les rebelles, majoritairement haoussas et yorubas, qui utilisaient amulettes et messages en écriture arabe pour coordonner le soulèvement, et la répression qui suivit compta parmi les mesures anti-alphabétisation et anti-rassemblement les plus dures imposées à des résidents noirs dans tout le Brésil du XIXe siècle.|「マレー」という語はヨルバ語でムスリムを指す言葉に由来するとされ、多くがハウサ人とヨルバ人からなる反乱者たちを指した。彼らはアラビア文字で書かれたお守りや連絡文を使って蜂起を調整した。この蜂起後の弾圧は、19世紀ブラジルで黒人住民に課された識字禁止や集会禁止の措置の中でも最も厳しいものの一つとなった。",
  ),
  q(
    10,
    "The same 2009 spelling reform that dropped the trema also formally added which three letters back into the official Portuguese alphabet, after they had long been used informally in loanwords and abbreviations?|La misma reforma ortográfica de 2009 que eliminó la trema también añadió formalmente qué tres letras de nuevo al alfabeto portugués oficial, tras haber sido usadas informalmente durante mucho tiempo en préstamos y abreviaturas?|La même réforme orthographique de 2009 qui a supprimé le tréma a également réintégré formellement quelles trois lettres dans l'alphabet portugais officiel, après qu'elles eurent longtemps été utilisées de façon informelle dans les emprunts et abréviations ?|トレマを廃止したのと同じ2009年の正書法改革が、借用語や略語で長らく非公式に使われてきたのち、ポルトガル語の公式アルファベットに正式に復活させた3つの文字は?",
    [
      "Q, X and Z|Q, X y Z|Q, X et Z|Q・X・Z",
      "Ç, Ñ and Ü|Ç, Ñ y Ü|Ç, Ñ et Ü|Ç・Ñ・Ü",
      "K, W and Y|K, W e Y|K, W et Y|K・W・Y",
    ],
    2,
    "Brazilian schoolchildren before the reform were technically taught a 23-letter alphabet, even though \"k\", \"w\" and \"y\" already appeared constantly in brand names, foreign words and abbreviations like \"km\" and \"watt\", so the change mostly formalised a practice that had existed in daily life for decades.|Antes de la reforma, a los escolares brasileños se les enseñaba técnicamente un alfabeto de 23 letras, aunque «k», «w» e «y» ya aparecían constantemente en marcas, palabras extranjeras y abreviaturas como «km» y «watt», así que el cambio en gran parte formalizó una práctica que existía en la vida diaria desde hacía décadas.|Avant la réforme, les écoliers brésiliens apprenaient techniquement un alphabet de 23 lettres, alors même que « k », « w » et « y » apparaissaient déjà constamment dans les marques, mots étrangers et abréviations comme « km » et « watt » ; le changement a donc surtout formalisé une pratique existant dans la vie quotidienne depuis des décennies.|改革以前、ブラジルの児童は形式上23文字のアルファベットを習っていたが、実際には「k」「w」「y」はブランド名や外来語、「km」や「watt」のような略語にすでに絶えず登場していた。この変更は、何十年も日常生活に存在していた慣行を、単に公式に認めたに過ぎない。",
  ),
  q(
    10,
    "The 1922 Semana de Arte Moderna (Modern Art Week), a landmark exhibition and performance series that launched Brazilian artistic Modernism, was held in which city, to mark the centennial of independence?|La Semana de Arte Moderna de 1922, una serie de exposiciones y actuaciones histórica que lanzó el modernismo artístico brasileño, se celebró en qué ciudad, para conmemorar el centenario de la independencia?|La Semana de Arte Moderna de 1922, série d'expositions et de représentations marquante ayant lancé le modernisme artistique brésilien, s'est tenue dans quelle ville, pour marquer le centenaire de l'indépendance ?|ブラジルの芸術的モダニズムの幕開けとなった画期的な展示・上演のシリーズ、1922年の「近代芸術週間」が、独立百周年を記念して開催された都市は?",
    [
      "Rio de Janeiro|Río de Janeiro|Rio de Janeiro|リオデジャネイロ",
      "Salvador|Salvador|Salvador|サルバドール",
      "São Paulo|São Paulo|São Paulo|サンパウロ",
    ],
    2,
    "Held at the Municipal Theatre, the week's avant-garde poetry readings and paintings — including early work by Tarsila do Amaral — scandalised much of the conservative press at the time, and the movement's central idea was later distilled in Oswald de Andrade's 1928 \"Manifesto Antropófago\", which proposed that Brazilian culture should \"devour\" foreign influences and remake them into something new.|Celebrada en el Teatro Municipal, las lecturas de poesía y las pinturas de vanguardia de esa semana —incluida obra temprana de Tarsila do Amaral— escandalizaron a buena parte de la prensa conservadora de la época, y la idea central del movimiento se destiló más tarde en el «Manifiesto Antropófago» de Oswald de Andrade, de 1928, que proponía que la cultura brasileña «devorara» las influencias extranjeras y las rehiciera en algo nuevo.|Tenue au Théâtre municipal, les lectures de poésie et les tableaux avant-gardistes de la semaine — dont des œuvres de jeunesse de Tarsila do Amaral — scandalisèrent une grande partie de la presse conservatrice de l'époque, et l'idée centrale du mouvement fut résumée plus tard dans le « Manifeste anthropophage » d'Oswald de Andrade, en 1928, qui proposait que la culture brésilienne « dévore » les influences étrangères pour les refaçonner en quelque chose de nouveau.|市立劇場で開かれたこの週の前衛的な詩の朗読や絵画——タルシラ・ド・アマラルの初期作品も含む——は、当時の保守的な報道界の多くを騒然とさせた。この運動の核心にある発想は、のちの1928年、オズワルド・ジ・アンドラーヂの『食人宣言』において、ブラジル文化は外国の影響を「食らい」新しい何かへ作り替えるべきだという形に凝縮された。",
  ),
  q(
    10,
    "Rio de Janeiro's 1904 \"Revolta da Vacina\" (Vaccine Revolt) was a violent public uprising against what public health measure?|La «Revolta da Vacina» (Revuelta de la Vacuna) de 1904 en Río de Janeiro fue un violento levantamiento popular contra qué medida de salud pública?|La « Revolta da Vacina » (Révolte du vaccin) de 1904 à Rio de Janeiro fut un soulèvement populaire violent contre quelle mesure de santé publique ?|1904年のリオデジャネイロの「ワクチン反乱」は、どんな公衆衛生上の措置に対する暴力的な民衆蜂起だったか?",
    [
      "Compulsory quarantine camps|Campos de cuarentena obligatoria|Des camps de quarantaine obligatoire|強制隔離キャンプ",
      "A ban on street vendors|Una prohibición de vendedores callejeros|Une interdiction des vendeurs de rue|露天商の禁止",
      "Mandatory smallpox vaccination|La vacunación obligatoria contra la viruela|La vaccination antivariolique obligatoire|天然痘の強制予防接種",
    ],
    2,
    "The revolt broke out days after mandatory vaccination was decreed as part of sanitation reformer Oswaldo Cruz's aggressive campaign against epidemic disease, and it fed on wider resentment over the same reforms' slum demolitions in central Rio, though the vaccination law was suspended within days.|La revuelta estalló días después de que se decretara la vacunación obligatoria como parte de la agresiva campaña del reformista sanitario Oswaldo Cruz contra las enfermedades epidémicas, y se alimentó de un resentimiento más amplio por las demoliciones de barrios pobres en el centro de Río que traían las mismas reformas, aunque la ley de vacunación se suspendió a los pocos días.|La révolte éclata quelques jours après que la vaccination obligatoire eut été décrétée dans le cadre de la campagne agressive du réformateur sanitaire Oswaldo Cruz contre les maladies épidémiques, et elle se nourrit d'un ressentiment plus large face aux démolitions de bidonvilles au centre de Rio menées par ces mêmes réformes, bien que la loi sur la vaccination fût suspendue au bout de quelques jours.|この反乱は、衛生改革者オズワルド・クルスによる伝染病対策の積極的な政策の一環として強制予防接種が布告された数日後に勃発した。同じ改革が進めていたリオ中心部のスラム取り壊しへの広範な不満もこれをあおったが、予防接種法は数日のうちに停止された。",
  ),
  q(
    10,
    "Cinema Novo, the 1960s Brazilian film movement associated with director Glauber Rocha, was summed up by the slogan \"a camera in the hand and an idea in the...\" what?|El Cinema Novo, el movimiento cinematográfico brasileño de los años sesenta asociado al director Glauber Rocha, se resumía con el eslogan «una cámara en la mano y una idea en la...» qué?|Le Cinema Novo, mouvement cinématographique brésilien des années 1960 associé au réalisateur Glauber Rocha, se résumait par le slogan « une caméra à la main et une idée dans la... » quoi ?|映画監督グラウベル・ローシャに結びつくブラジルの1960年代の映画運動シネマ・ノーヴォを要約した標語、「手にカメラを、そして頭に……」に続く言葉は?",
    [
      "Heart|Corazón|Cœur|心",
      "Pocket|Bolsillo|Poche|懐",
      "Head|Cabeza|Tête|考え",
    ],
    2,
    "The movement prized low-budget, socially critical filmmaking over the polished style of mainstream cinema, drawing partly on Italian neorealism, and Rocha's 1964 film \"Black God, White Devil\", shot largely in the drought-stricken sertão, is often cited as one of its defining works.|El movimiento privilegiaba el cine de bajo presupuesto y crítica social frente al estilo pulido del cine convencional, inspirándose en parte en el neorrealismo italiano, y la película de Rocha de 1964 «Dios negro, diablo blanco», rodada en gran parte en el sertón azotado por la sequía, suele citarse como una de sus obras definitorias.|Le mouvement privilégiait un cinéma à petit budget et socialement critique plutôt que le style léché du cinéma dominant, s'inspirant en partie du néoréalisme italien, et le film de Rocha de 1964 « Dieu noir, diable blanc », tourné en grande partie dans le sertão frappé par la sécheresse, est souvent cité comme l'une de ses œuvres phares.|この運動は、主流映画の洗練された作風よりも低予算で社会批評性の強い映画作りを重んじ、イタリアのネオレアリズモにも一部影響を受けた。ローシャが1964年に発表し、干ばつに苦しむセルタンで大部分が撮影された『黒い神と白い悪魔』は、この運動を代表する作品としてしばしば挙げられる。",
  ),
  q(
    10,
    "Rubber tapper and environmental activist Chico Mendes, assassinated in Acre in 1988, is credited with pioneering which conservation model that lets local communities sustainably harvest forest products instead of clearing the land?|Al recolector de caucho y activista ambiental Chico Mendes, asesinado en Acre en 1988, se le atribuye ser pionero de qué modelo de conservación que permite a las comunidades locales aprovechar de forma sostenible los productos del bosque en vez de talarlo?|Le saigneur d'hévéas et militant écologiste Chico Mendes, assassiné en Acre en 1988, est crédité d'avoir été le pionnier de quel modèle de conservation permettant aux communautés locales d'exploiter durablement les produits forestiers au lieu de défricher les terres ?|1988年にアクレ州で暗殺されたゴム採取者・環境活動家シコ・メンデスが先駆けとなったとされる、地元の共同体が土地を伐採する代わりに森林資源を持続的に採取できるようにする保全のしくみは?",
    [
      "Eco-lodges|Ecoalojamientos|Des éco-lodges|エコロッジ",
      "Carbon offset farms|Granjas de compensación de carbono|Des fermes de compensation carbone|カーボンオフセット農場",
      "Extractive reserves|Reservas extractivistas|Des réserves extractivistes|エクストラティビスト保護区",
    ],
    2,
    "Mendes organised non-violent human blockades, called \"empates\", to stop cattle ranchers from clearing forest where rubber tappers worked, and his murder by a rancher's son drew international attention that helped push Brazil to create its first extractive reserves within about a year of his death.|Mendes organizó bloqueos humanos no violentos, llamados «empates», para impedir que los ganaderos talaran el bosque donde trabajaban los recolectores de caucho, y su asesinato a manos del hijo de un ganadero atrajo la atención internacional que ayudó a impulsar a Brasil a crear sus primeras reservas extractivistas al cabo de aproximadamente un año de su muerte.|Mendes organisa des blocages humains non violents, appelés « empates », pour empêcher les éleveurs de bétail de défricher la forêt où travaillaient les saigneurs d'hévéas, et son meurtre par le fils d'un éleveur attira une attention internationale qui contribua à pousser le Brésil à créer ses premières réserves extractivistes environ un an après sa mort.|メンデスは、ゴム採取者が働く森を牧場主たちが伐採するのを阻むため、「エンパーチ」と呼ばれる非暴力の人間の鎖による封鎖を組織した。牧場主の息子による彼の殺害は国際的な注目を集め、その死からおよそ1年のうちに、ブラジルが最初のエクストラティビスト保護区を創設する後押しとなった。",
  ),

  // --- 2026-08-14 追記: 難易度9〜10の層で易しすぎた2問(サウダージ・1964年の
  // 出来事の種類)を4に下げた埋め合わせ ---
  q(
    9,
    "Among the languages of the Iberian Peninsula, saudade's closest linguistic relative — both words are usually traced to the same Latin root for \"solitude\" — is found in which other language?|Entre las lenguas de la península ibérica, el pariente lingüístico más cercano de saudade —ambas palabras suelen remontarse a la misma raíz latina de «soledad»— se encuentra en qué otro idioma?|Parmi les langues de la péninsule Ibérique, le plus proche parent linguistique de saudade — les deux mots remontent généralement à la même racine latine signifiant « solitude » — se trouve dans quelle autre langue ?|イベリア半島の諸言語の中で、サウダージにもっとも近い縁を持つとされる語——両方ともラテン語で「孤独」を意味する同じ語根にさかのぼるとされる——が見られるのは、他のどの言語か?",
    [
      "Basque|Euskera|Le basque|バスク語",
      "Catalan|Catalán|Le catalan|カタルーニャ語",
      "Galician (\"morriña\")|Gallego («morriña»)|Le galicien (« morriña »)|ガリシア語(「モリーニャ」)",
    ],
    2,
    "Morriña leans more narrowly toward homesickness for a place, while saudade covers a fuller range from grief to the almost pleasurable anticipation of a reunion, which is part of why Brazilian songwriters and poets have leaned on saudade as a near-technical term rather than a plain synonym for sadness.|La morriña se inclina de forma más estrecha hacia la nostalgia por un lugar, mientras que saudade cubre un rango más amplio, desde el duelo hasta la anticipación casi placentera de un reencuentro, lo que explica en parte por qué compositores y poetas brasileños han recurrido a saudade como un término casi técnico y no como un simple sinónimo de tristeza.|La morriña penche plus étroitement vers la nostalgie d'un lieu, tandis que saudade couvre un éventail plus large, du deuil à l'anticipation presque agréable d'des retrouvailles, ce qui explique en partie pourquoi les auteurs-compositeurs et poètes brésiliens se sont appuyés sur saudade comme un terme quasi technique plutôt qu'un simple synonyme de tristesse.|モリーニャはある土地への郷愁により狭く傾いた語であるのに対し、サウダージは悲嘆から再会をほとんど楽しみに待つような感覚まで、より幅広い範囲を覆う。これが、ブラジルの作詞家や詩人たちが「サウダージ」を単なる悲しみの同義語としてではなく、ほぼ専門用語のように用いてきた理由の一端でもある。",
  ),
  q(
    9,
    "During Brazil's 1964–1985 military dictatorship, presidents were not chosen by ordinary voters. By what mechanism were they instead selected?|Durante la dictadura militar brasileña de 1964-1985, los presidentes no eran elegidos por los votantes comunes. ¿Por qué mecanismo se los elegía en cambio?|Pendant la dictature militaire brésilienne de 1964-1985, les présidents n'étaient pas choisis par les électeurs ordinaires. Par quel mécanisme étaient-ils désignés à la place ?|1964〜1985年の軍政期のブラジルでは、大統領は一般有権者の投票では選ばれなかった。代わりに用いられた選出のしくみは?",
    [
      "A lottery drawn among senior generals|Un sorteo entre generales de alto rango|Un tirage au sort parmi les généraux de haut rang|上級将軍の中からのくじ引き",
      "An indirect vote by an Electoral College of Congress members and appointed delegates|Un voto indirecto de un Colegio Electoral de congresistas y delegados designados|Un vote indirect d'un Collège électoral de parlementaires et de délégués nommés|議会議員と任命された代議員からなる選挙人団による間接投票",
      "A referendum held once every ten years|Un referéndum celebrado cada diez años|Un référendum organisé tous les dix ans|10年に一度の国民投票",
    ],
    1,
    "Even this indirect system was largely a formality, since the military's chosen candidate typically ran unopposed, which is part of why the 1984 Diretas Já movement demanded direct elections instead — and why the 1985 handover to a civilian president still had to go through the same Electoral College one final time.|Incluso este sistema indirecto era en gran medida una formalidad, ya que el candidato elegido por los militares solía presentarse sin oposición, lo que explica en parte por qué el movimiento Diretas Já de 1984 exigía elecciones directas en su lugar, y por qué el traspaso de 1985 a un presidente civil tuvo que pasar aún una última vez por el mismo Colegio Electoral.|Même ce système indirect n'était guère qu'une formalité, le candidat choisi par les militaires se présentant généralement sans opposition, ce qui explique en partie pourquoi le mouvement Diretas Já de 1984 réclamait des élections directes à la place — et pourquoi la passation de 1985 à un président civil dut encore passer une dernière fois par ce même Collège électoral.|この間接的な仕組みでさえほぼ形式にすぎず、軍が選んだ候補者はたいてい対立候補なしで当選した。これが1984年の「ジレータス・ジャー」運動が直接選挙を求めた理由の一端であり、1985年に文民大統領へ政権が移った際もなお、同じ選挙人団による選出を最後にもう一度経なければならなかった理由でもある。",
  ),
];
