/**
 * ベネズエラのクイズ(30問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カード・アイテム・季節との重なりについて
 *
 * 都市カード(28件)・アイテム(9件)・季節(12件)が扱う具体的な事実
 * (エル・システマ、アンゴストゥーラ会議、900種のアイスクリーム、
 * アニマリートス富くじ、チモ、カピバラの群れ、ワラオ族の高床式の家など)
 * はここでは問わない。地理・歴史・スポーツ・食・言語など、
 * **他のファイルが触れていない主題**を選んである。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が10/10/10で均等になるよう
 * 意図的に並べ替えてある。
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

export const VENEZUELA_QUIZ = [
  q(
    1,
    "What is the capital of Venezuela?|¿Cuál es la capital de Venezuela?|Quelle est la capitale du Venezuela ?|ベネズエラの首都はどこか?",
    [
      "Caracas|Caracas|Caracas|カラカス",
      "Bogotá|Bogotá|Bogotá|ボゴタ",
      "Lima|Lima|Lima|リマ",
    ],
    0,
    "Caracas has been the capital since Spanish colonial times and sits in a narrow valley near the Caribbean coast, home to roughly a fifth of the country's population.|Caracas es la capital desde la época colonial española y se asienta en un valle estrecho cerca de la costa caribeña, hogar de aproximadamente una quinta parte de la población del país.|Caracas est la capitale depuis l'époque coloniale espagnole et se niche dans une vallée étroite près de la côte caraïbe, abritant environ un cinquième de la population du pays.|カラカスはスペイン植民地時代から首都であり、カリブ海岸近くの細い谷に位置する。国の人口のおよそ5分の1がここに暮らす。",
  ),
  q(
    1,
    "Which continent is Venezuela part of?|¿A qué continente pertenece Venezuela?|De quel continent le Venezuela fait-il partie ?|ベネズエラが属する大陸は?",
    [
      "Africa|África|Afrique|アフリカ",
      "South America|Sudamérica|Amérique du Sud|南アメリカ",
      "Central America|Centroamérica|Amérique centrale|中央アメリカ",
    ],
    1,
    "Venezuela occupies the northern coast of South America, between Colombia and Guyana.|Venezuela ocupa la costa norte de Sudamérica, entre Colombia y Guyana.|Le Venezuela occupe la côte nord de l'Amérique du Sud, entre la Colombie et le Guyana.|ベネズエラは南米大陸の北岸、コロンビアとガイアナのあいだに位置する。",
  ),
  q(
    1,
    "In which country was Simón Bolívar, a key leader of South America's independence, born?|¿En qué país nació Simón Bolívar, líder clave de la independencia sudamericana?|Dans quel pays est né Simón Bolívar, figure clé de l'indépendance sud-américaine ?|南米独立の中心人物シモン・ボリバルが生まれた国は?",
    [
      "Venezuela|Venezuela|Venezuela|ベネズエラ",
      "Peru|Perú|Pérou|ペルー",
      "Argentina|Argentina|Argentine|アルゼンチン",
    ],
    0,
    "Bolívar was born in Caracas in 1783 into a wealthy Creole family and later led independence campaigns across much of northern and western South America.|Bolívar nació en Caracas en 1783 en el seno de una acaudalada familia criolla, y más tarde lideró campañas de independencia por buena parte del norte y el oeste de Sudamérica.|Bolívar naquit à Caracas en 1783 dans une riche famille créole, et mena plus tard des campagnes d'indépendance dans une bonne partie du nord et de l'ouest de l'Amérique du Sud.|ボリバルは1783年、裕福なクリオージョの家系にカラカスで生まれ、のちに南米北部・西部の広い地域で独立運動を率いた。",
  ),
  q(
    2,
    "What is the official language of Venezuela?|¿Cuál es el idioma oficial de Venezuela?|Quelle est la langue officielle du Venezuela ?|ベネズエラの公用語は?",
    [
      "Portuguese|Portugués|Portugais|ポルトガル語",
      "Spanish|Español|Espagnol|スペイン語",
      "French|Francés|Français|フランス語",
    ],
    1,
    "Spanish is spoken nationwide, though a number of Indigenous languages, including Warao and Pemón, are also officially recognised.|El español se habla en todo el país, aunque varias lenguas indígenas, como el warao y el pemón, también gozan de reconocimiento oficial.|L'espagnol est parlé dans tout le pays, bien que plusieurs langues indigènes, dont le warao et le pemón, soient elles aussi officiellement reconnues.|スペイン語は全国で話されるが、ワラオ語やペモン語など複数の先住民言語も公式に認められている。",
  ),
  q(
    2,
    "Which sea lies along Venezuela's northern coast?|¿Qué mar bordea la costa norte de Venezuela?|Quelle mer borde la côte nord du Venezuela ?|ベネズエラの北の海岸に面する海は?",
    [
      "The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海",
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The Red Sea|El mar Rojo|La mer Rouge|紅海",
    ],
    0,
    "Venezuela has one of the longest Caribbean coastlines of any country, stretching over 2,800 kilometres.|Venezuela tiene una de las costas caribeñas más largas de cualquier país, con más de 2.800 kilómetros.|Le Venezuela possède l'un des plus longs littoraux caraïbes de tous les pays, s'étirant sur plus de 2 800 kilomètres.|ベネズエラはどの国よりも長いカリブ海沿岸線の一つを持ち、その長さは2,800キロメートルを超える。",
  ),
  q(
    3,
    "Which country lies immediately to the west of Venezuela?|¿Qué país limita con Venezuela por el oeste?|Quel pays se trouve immédiatement à l'ouest du Venezuela ?|ベネズエラの西に隣接する国は?",
    [
      "Brazil|Brasil|Brésil|ブラジル",
      "Colombia|Colombia|Colombie|コロンビア",
      "Ecuador|Ecuador|Équateur|エクアドル",
    ],
    1,
    "The Venezuela–Colombia border runs from the Caribbean coast down through the Andes and into the Amazon basin.|La frontera entre Venezuela y Colombia va desde la costa caribeña, atraviesa los Andes y llega hasta la cuenca amazónica.|La frontière entre le Venezuela et la Colombie va de la côte caraïbe, traverse les Andes et rejoint le bassin amazonien.|ベネズエラとコロンビアの国境はカリブ海岸からアンデス山脈を経てアマゾン盆地まで続く。",
  ),
  q(
    3,
    "What is Venezuela's national dish, built around rice, black beans, shredded beef and fried plantain?|¿Cuál es el plato nacional de Venezuela, a base de arroz, caraotas negras, carne mechada y plátano frito?|Quel est le plat national du Venezuela, à base de riz, de haricots noirs, de bœuf effiloché et de banane plantain frite ?|米・黒豆・裂いた牛肉・揚げプランテンからなるベネズエラの国民食は?",
    [
      "Pabellón criollo|Pabellón criollo|Pabellón criollo|パベジョン・クリオージョ",
      "Paella|Paella|Paella|パエリア",
      "Feijoada|Feijoada|Feijoada|フェイジョアーダ",
    ],
    0,
    "Pabellón criollo is eaten so often across the country that Venezuelans sometimes joke it should count as a food group of its own.|El pabellón criollo se come tan a menudo en todo el país que los venezolanos a veces bromean con que debería contar como su propio grupo alimenticio.|Le pabellón criollo est mangé si souvent dans tout le pays que les Vénézuéliens plaisantent parfois en disant qu'il devrait former son propre groupe alimentaire.|パベジョン・クリオージョは国じゅうであまりに頻繁に食べられるため、ベネズエラ人は冗談でこれ自体が一つの食品群だと言うことがある。",
  ),
  q(
    3,
    "What is the corn-based dough used to make an arepa?|¿Con qué masa de maíz se hace una arepa?|Avec quelle pâte de maïs prépare-t-on une arepa ?|アレパを作るトウモロコシの生地は何からできているか?",
    [
      "Wheat flour|Harina de trigo|Farine de blé|小麦粉",
      "Cassava starch|Almidón de yuca|Fécule de manioc|キャッサバでんぷん",
      "Ground corn (maize)|Maíz molido|Maïs moulu|挽いたトウモロコシ",
    ],
    2,
    "Arepas are split open and stuffed with almost anything, from cheese to shredded beef, and are eaten at any meal of the day.|Las arepas se abren y se rellenan de casi cualquier cosa, de queso a carne mechada, y se comen a cualquier hora del día.|Les arepas s'ouvrent et se farcissent de presque n'importe quoi, du fromage au bœuf effiloché, et se mangent à tout moment de la journée.|アレパは切り開いてチーズから裂いた牛肉まで何でも詰められ、一日のどの食事でも食べられる。",
  ),
  q(
    4,
    "According to a popular explanation of its name, why did early Spanish explorers call the region \"Venezuela\", meaning \"Little Venice\"?|Según una explicación popular de su nombre, ¿por qué los primeros exploradores españoles llamaron a la región \"Venezuela\", es decir, \"pequeña Venecia\"?|Selon une explication populaire de son nom, pourquoi les premiers explorateurs espagnols appelèrent-ils la région « Venezuela », c'est-à-dire « petite Venise » ?|「ベネズエラ(小さなヴェネツィア)」という名の由来としてよく語られる理由は?",
    [
      "Its canals reminded them of Venetian streets|Sus canales les recordaban a las calles venecianas|Ses canaux leur rappelaient les rues vénitiennes|運河がヴェネツィアの通りを思わせたから",
      "Stilt houses on Lake Maracaibo reminded them of Venice|Las casas sobre pilotes del lago de Maracaibo les recordaban a Venecia|Des maisons sur pilotis du lac de Maracaibo leur rappelaient Venise|マラカイボ湖の高床式の家がヴェネツィアを思わせたから",
      "A Venetian mapmaker drew the first chart|Un cartógrafo veneciano dibujó el primer mapa|Un cartographe vénitien dessina la première carte|ヴェネツィア出身の地図製作者が最初の海図を描いたから",
    ],
    1,
    "The story is usually credited to the 1499 expedition of Alonso de Ojeda and Amerigo Vespucci, who reported seeing Indigenous houses built on stilts over the water.|La historia suele atribuirse a la expedición de 1499 de Alonso de Ojeda y Américo Vespucio, quienes relataron haber visto casas indígenas construidas sobre pilotes en el agua.|L'histoire est généralement attribuée à l'expédition de 1499 d'Alonso de Ojeda et d'Amerigo Vespucci, qui rapportèrent avoir vu des maisons indigènes bâties sur pilotis au-dessus de l'eau.|この由来は通常、1499年のアロンソ・デ・オヘダとアメリゴ・ヴェスプッチの探検に帰せられる。二人は水上の杭の上に建つ先住民の家を見たと記している。",
  ),
  q(
    4,
    "What is Venezuela's national bird?|¿Cuál es el ave nacional de Venezuela?|Quel est l'oiseau national du Venezuela ?|ベネズエラの国鳥は?",
    [
      "The turpial|El turpial|Le troupiale|トゥルピアル",
      "The condor|El cóndor|Le condor|コンドル",
      "The toucan|El tucán|Le toucan|オオハシ",
    ],
    0,
    "The turpial is a black-and-orange songbird found across much of the country's lowlands, and it is protected by law from being kept as a pet.|El turpial es un ave cantora negra y naranja que se encuentra en buena parte de las tierras bajas del país, y está protegida por ley de ser mantenida como mascota.|Le troupiale est un oiseau chanteur noir et orange que l'on trouve dans une bonne partie des basses terres du pays, et il est protégé par la loi contre la captivité comme animal de compagnie.|トゥルピアルは国内の低地の多くに生息する黒とオレンジ色の鳴鳥で、法律でペットとして飼うことが禁じられている。",
  ),
  q(
    4,
    "What is Venezuela's national tree?|¿Cuál es el árbol nacional de Venezuela?|Quel est l'arbre national du Venezuela ?|ベネズエラの国の木は?",
    [
      "The araguaney|El araguaney|L'araguaney|アラグアネイ",
      "The ceiba|La ceiba|Le fromager|セイバ(パンヤ)",
      "The mahogany|La caoba|L'acajou|マホガニー",
    ],
    0,
    "The araguaney bursts into a canopy of bright yellow flowers for just a few weeks each year, usually right as the dry season ends.|El araguaney estalla en una copa de flores amarillas brillantes durante solo unas semanas cada año, por lo general justo cuando termina la temporada seca.|L'araguaney se couvre d'une canopée de fleurs jaune vif pendant seulement quelques semaines chaque année, généralement juste à la fin de la saison sèche.|アラグアネイは一年のうちわずか数週間だけ、たいてい乾季の終わりごろに鮮やかな黄色い花で樹冠を覆う。",
  ),
  q(
    4,
    "Because of hyperinflation and repeated currency devaluations, what currency do many Venezuelans use for everyday prices such as rent or groceries?|Debido a la hiperinflación y las repetidas devaluaciones, ¿qué moneda usan muchos venezolanos para precios cotidianos como el alquiler o el mercado?|En raison de l'hyperinflation et des dévaluations répétées, quelle monnaie de nombreux Vénézuéliens utilisent-ils pour les prix courants comme le loyer ou les courses ?|ハイパーインフレと度重なる通貨切り下げのため、多くのベネズエラ人が家賃や食料品など日々の値段に使う通貨は?",
    [
      "The Colombian peso|El peso colombiano|Le peso colombien|コロンビア・ペソ",
      "The euro|El euro|L'euro|ユーロ",
      "The US dollar|El dólar estadounidense|Le dollar américain|米ドル",
    ],
    2,
    "The practice is widely called dolarización, and it developed because the bolívar itself stopped functioning reliably as a store of value.|La práctica se conoce ampliamente como dolarización, y surgió porque el propio bolívar dejó de funcionar de forma fiable como reserva de valor.|Cette pratique est largement appelée dolarización, et elle s'est développée parce que le bolívar lui-même a cessé de fonctionner de façon fiable comme réserve de valeur.|この慣行は広く「ドル化(ドラリサシオン)」と呼ばれ、ボリバル自体が価値の保存手段として当てにならなくなったために広まった。",
  ),
  q(
    5,
    "Besides Venezuela, which of these countries was part of Simón Bolívar's short-lived republic of Gran Colombia?|Además de Venezuela, ¿cuál de estos países formó parte de la efímera república de la Gran Colombia de Bolívar?|Outre le Venezuela, lequel de ces pays fit partie de la brève république de Grande Colombie de Bolívar ?|ベネズエラのほかに、シモン・ボリバルの短命なグラン・コロンビア共和国に属していた国は?",
    [
      "Peru|Perú|Pérou|ペルー",
      "Brazil|Brasil|Brésil|ブラジル",
      "Colombia|Colombia|Colombie|コロンビア",
    ],
    2,
    "Gran Colombia also included what are now Ecuador and Panama before splitting into separate countries by 1831.|La Gran Colombia también incluía lo que hoy son Ecuador y Panamá, antes de dividirse en países separados hacia 1831.|La Grande Colombie incluait aussi ce qui est aujourd'hui l'Équateur et le Panama, avant de se scinder en pays distincts vers 1831.|グラン・コロンビアには現在のエクアドルとパナマも含まれていたが、1831年までに別々の国に分裂した。",
  ),
  q(
    5,
    "Unlike most South American countries, which sport is most popular in Venezuela?|A diferencia de la mayoría de los países sudamericanos, ¿qué deporte es el más popular en Venezuela?|Contrairement à la plupart des pays d'Amérique du Sud, quel sport est le plus populaire au Venezuela ?|南米のほとんどの国と違い、ベネズエラでいちばん人気のあるスポーツは?",
    [
      "Baseball|Béisbol|Baseball|野球",
      "Rugby|Rugby|Rugby|ラグビー",
      "Cricket|Críquet|Cricket|クリケット",
    ],
    0,
    "Venezuela has sent a long line of players to Major League Baseball in the United States, and children often learn to swing a bat before they learn to kick a football.|Venezuela ha enviado una larga lista de jugadores a las Grandes Ligas de béisbol de Estados Unidos, y los niños suelen aprender a batear antes de aprender a patear un balón.|Le Venezuela a envoyé une longue lignée de joueurs vers la Ligue majeure de baseball aux États-Unis, et les enfants apprennent souvent à manier une batte avant d'apprendre à taper dans un ballon.|ベネズエラはアメリカのメジャーリーグに次々と選手を送り出しており、子どもたちはサッカーボールを蹴るより先にバットの振り方を覚えることが多い。",
  ),
  q(
    5,
    "What is a cuatro, a common sight at Venezuelan folk music gatherings?|¿Qué es un cuatro, algo habitual en las reuniones de música folclórica venezolana?|Qu'est-ce qu'un cuatro, un instrument courant lors des rassemblements de musique folklorique vénézuélienne ?|ベネズエラの民族音楽の集まりでよく見かける「クアトロ」とは何か?",
    [
      "A small four-stringed guitar|Una pequeña guitarra de cuatro cuerdas|Une petite guitare à quatre cordes|小さな四弦のギター",
      "A hand drum|Un tambor de mano|Un tambour à main|手で叩く太鼓",
      "A type of flute|Un tipo de flauta|Un type de flûte|笛の一種",
    ],
    0,
    "The cuatro takes its name from its four strings and provides the rhythmic backbone of styles like joropo and gaita alike.|El cuatro toma su nombre de sus cuatro cuerdas y aporta la base rítmica de estilos como el joropo y la gaita por igual.|Le cuatro tire son nom de ses quatre cordes et fournit l'ossature rythmique de styles comme le joropo et la gaita.|クアトロはその四本の弦にちなんで名付けられ、ホローポやガイタなどの様式でリズムの土台を担う。",
  ),
  q(
    6,
    "Besides Venezuela, which other country shares the vast grassland plains known as Los Llanos?|Además de Venezuela, ¿qué otro país comparte la vasta llanura conocida como Los Llanos?|Outre le Venezuela, quel autre pays partage la vaste plaine herbeuse appelée Los Llanos ?|ベネズエラのほかに、「ロス・ジャノス」と呼ばれる広大な平原を分け合う国は?",
    [
      "Peru|Perú|Pérou|ペルー",
      "Guyana|Guyana|Guyana|ガイアナ",
      "Colombia|Colombia|Colombie|コロンビア",
    ],
    2,
    "Los Llanos stretches across both countries and is best known for cattle ranching and a rich variety of wetland wildlife.|Los Llanos se extiende por ambos países y es conocido sobre todo por la ganadería y una rica variedad de fauna de humedales.|Los Llanos s'étend sur les deux pays et est surtout connu pour l'élevage bovin et une riche variété de faune des zones humides.|ロス・ジャノスは両国にまたがって広がり、牧畜と豊かな湿地の野生動物で知られる。",
  ),
  q(
    6,
    "Which country has won the Miss Universe pageant the most times?|¿Qué país ha ganado más veces el concurso Miss Universo?|Quel pays a remporté le plus de fois le concours Miss Univers ?|ミス・ユニバースで最多優勝回数を誇る国は?",
    [
      "The Philippines|Filipinas|Les Philippines|フィリピン",
      "Venezuela|Venezuela|Venezuela|ベネズエラ",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
    ],
    1,
    "Venezuela had won the title seven times as of the mid-2020s, and preparation for the pageant is treated as a serious, closely followed pursuit nationally.|Venezuela había ganado el título siete veces hacia mediados de la década de 2020, y la preparación para el certamen se trata como una actividad seria y muy seguida a nivel nacional.|Le Venezuela avait remporté le titre sept fois au milieu des années 2020, et la préparation du concours y est traitée comme une entreprise sérieuse et suivie de près à l'échelle nationale.|2020年代半ば時点でベネズエラは7回優勝しており、大会への準備は国内で真剣に、そして熱心に追いかけられる一大事とされている。",
  ),
  q(
    // Bolívar/コロンビア絡みの設問がQ13と重なり、しかも同じシウダー・ボリバルの
    // 都市カードに載る「コロンビア」を答えにしていたため、team-leadの指摘で
    // 別の題材に差し替えた(check-quiz.mjsの偏り検出: ボリバル×5・コロンビア×5)。
    6,
    "How many stars appear on the flag of Venezuela?|¿Cuántas estrellas aparecen en la bandera de Venezuela?|Combien d'étoiles figurent sur le drapeau du Venezuela ?|ベネズエラの国旗に描かれた星の数は?",
    [
      "Seven|Siete|Sept|七つ",
      "Eight|Ocho|Huit|八つ",
      "Nine|Nueve|Neuf|九つ",
    ],
    1,
    "The eight stars represent the provinces that signed Venezuela's 1811 declaration of independence, with an eighth star added in 2006 to honour Guayana province, whose delegates arrived too late to sign the original document.|Las ocho estrellas representan a las provincias que firmaron la declaración de independencia de Venezuela de 1811, con una octava estrella añadida en 2006 en honor a la provincia de Guayana, cuyos delegados llegaron demasiado tarde para firmar el documento original.|Les huit étoiles représentent les provinces ayant signé la déclaration d'indépendance du Venezuela de 1811, une huitième étoile ayant été ajoutée en 2006 en l'honneur de la province de Guayana, dont les délégués arrivèrent trop tard pour signer le document original.|八つの星は1811年のベネズエラ独立宣言に署名した州を表す。2006年には、原本への署名に間に合わなかったグアヤナ州を称えて八つ目の星が加えられた。",
  ),
  q(
    6,
    "What does the Spanish word llanero, as in the cowboys of the Llanos, mean?|¿Qué significa la palabra llanero, como en los vaqueros de Los Llanos?|Que signifie le mot espagnol llanero, comme dans les cow-boys des Llanos ?|ロス・ジャノスの牧童を指す「リャネロ」という言葉の意味は?",
    [
      "Fisherman|Pescador|Pêcheur|漁師",
      "Plainsman or rancher|Hombre de los llanos o ganadero|Homme des plaines ou éleveur|平原の人、牧場主",
      "Mountain guide|Guía de montaña|Guide de montagne|山案内人",
    ],
    1,
    "Llaneros herd cattle on horseback across the open plains and are closely associated with the joropo music and dance style.|Los llaneros arrean el ganado a caballo por las llanuras abiertas y están estrechamente asociados con el estilo musical y de baile del joropo.|Les llaneros mènent le bétail à cheval à travers les plaines ouvertes et sont étroitement associés au style musical et dansé du joropo.|リャネロは開けた平原を馬に乗って牛を追う牧童で、ホローポという音楽・舞踊様式と深く結びついている。",
  ),
  q(
    6,
    "Venezuela was a founding member, in 1960, of which international organisation?|Venezuela fue miembro fundador, en 1960, de qué organización internacional?|Le Venezuela fut membre fondateur, en 1960, de quelle organisation internationale ?|1960年、ベネズエラが創設に加わった国際組織は?",
    [
      "NATO|La OTAN|L'OTAN|NATO(北大西洋条約機構)",
      "The World Trade Organization|La Organización Mundial del Comercio|L'Organisation mondiale du commerce|世界貿易機関",
      "OPEC|La OPEP|L'OPEP|OPEC(石油輸出国機構)",
    ],
    2,
    "OPEC was founded by Venezuela alongside Iran, Iraq, Kuwait and Saudi Arabia to coordinate oil production and pricing among major exporters.|La OPEP fue fundada por Venezuela junto con Irán, Irak, Kuwait y Arabia Saudita para coordinar la producción y el precio del petróleo entre los grandes exportadores.|L'OPEP fut fondée par le Venezuela aux côtés de l'Iran, de l'Irak, du Koweït et de l'Arabie saoudite pour coordonner la production et les prix du pétrole entre grands exportateurs.|OPECはベネズエラがイラン・イラク・クウェート・サウジアラビアとともに、主要な産油輸出国間で生産量と価格を調整するために設立した。",
  ),
  q(
    7,
    "What is the name of Venezuela's state-owned oil company?|¿Cómo se llama la petrolera estatal de Venezuela?|Quel est le nom de la compagnie pétrolière publique du Venezuela ?|ベネズエラの国営石油会社の名は?",
    [
      "PDVSA|PDVSA|PDVSA|PDVSA",
      "Pemex|Pemex|Pemex|ペメックス",
      "Petrobras|Petrobras|Petrobras|ペトロブラス",
    ],
    0,
    "PDVSA, short for Petróleos de Venezuela, was formed in 1976 when the country's oil industry was nationalised.|PDVSA, siglas de Petróleos de Venezuela, se creó en 1976 cuando se nacionalizó la industria petrolera del país.|La PDVSA, sigle de Petróleos de Venezuela, fut créée en 1976 lors de la nationalisation de l'industrie pétrolière du pays.|PDVSA(ペトロレオス・デ・ベネズエラ)は1976年、国の石油産業が国有化された際に設立された。",
  ),
  q(
    7,
    "What is the name of the coastal mountain range that separates Caracas from the Caribbean Sea?|¿Cómo se llama la cordillera costera que separa a Caracas del mar Caribe?|Quel est le nom de la chaîne côtière qui sépare Caracas de la mer des Caraïbes ?|カラカスをカリブ海から隔てる沿岸山脈の名は?",
    [
      "The Sierra Madre|La Sierra Madre|La Sierra Madre|シエラ・マドレ",
      "The Andes|Los Andes|Les Andes|アンデス山脈",
      "The Cordillera de la Costa|La Cordillera de la Costa|La Cordillera de la Costa|コルディジェラ・デ・ラ・コスタ(沿岸山脈)",
    ],
    2,
    "This range is a separate chain from the Andes further west and rises abruptly enough along parts of the coast that few roads cross it directly.|Esta cordillera es una cadena separada de los Andes, que quedan más al oeste, y se alza tan abruptamente en tramos de la costa que pocas carreteras la cruzan directamente.|Cette chaîne est distincte des Andes, plus à l'ouest, et s'élève assez abruptement le long de certaines portions de la côte pour que peu de routes la traversent directement.|この山脈はさらに西にあるアンデス山脈とは別の連なりで、海岸の一部ではあまりに急峻に立ち上がるため、直接横断する道はほとんどない。",
  ),
  q(
    7,
    "Luis Aparicio, the first Venezuelan inducted into Major League Baseball's Hall of Fame, played primarily which position?|Luis Aparicio, el primer venezolano en el Salón de la Fama del béisbol de Grandes Ligas, jugaba principalmente en qué posición?|Luis Aparicio, premier Vénézuélien intronisé au Temple de la renommée du baseball majeur, jouait principalement à quel poste ?|メジャーリーグ野球殿堂入りした最初のベネズエラ人ルイス・アパリシオの主なポジションは?",
    [
      "Pitcher|Lanzador|Lanceur|投手",
      "Shortstop|Campocorto|Arrêt-court|遊撃手",
      "Catcher|Receptor|Receveur|捕手",
    ],
    1,
    "Aparicio played nearly two decades in the major leagues from the 1950s to the 1970s and was known for his speed on the basepaths as much as his fielding.|Aparicio jugó casi dos décadas en las Grandes Ligas, desde los años cincuenta hasta los setenta, y era conocido tanto por su velocidad en las bases como por su defensa.|Aparicio joua près de deux décennies en ligue majeure, des années 1950 aux années 1970, et était connu autant pour sa vitesse sur les bases que pour son jeu défensif.|アパリシオは1950年代から70年代にかけてほぼ20年間メジャーでプレーし、守備だけでなく塁上での速さでも知られた。",
  ),
  q(
    7,
    "The northernmost point of the entire South American mainland is located on a peninsula in which country?|El punto más al norte de todo el continente sudamericano se encuentra en una península de qué país?|Le point le plus septentrional de tout le continent sud-américain se trouve sur une péninsule de quel pays ?|南米大陸全体の最北端は、どの国の半島にあるか?",
    [
      "Colombia|Colombia|Colombie|コロンビア",
      "Venezuela|Venezuela|Venezuela|ベネズエラ",
      "Guyana|Guyana|Guyana|ガイアナ",
    ],
    1,
    "The point sits on the tip of the Paraguaná Peninsula in Falcón state, further north than any other spot on the continent's mainland.|El punto está en la punta de la península de Paraguaná, en el estado Falcón, más al norte que cualquier otro lugar del continente.|Le point se trouve à la pointe de la péninsule de Paraguaná, dans l'État de Falcón, plus au nord que tout autre endroit du continent.|その地点はファルコン州パラグアナ半島の先端にあり、大陸のほかのどこよりも北にある。",
  ),
  q(
    8,
    "Simón Rodríguez, remembered as \"the Teacher of the Liberator\", held which role in young Simón Bolívar's life?|Simón Rodríguez, recordado como \"el Maestro del Libertador\", ¿qué papel tuvo en la vida del joven Simón Bolívar?|Simón Rodríguez, surnommé « le Maître du Libérateur », a joué quel rôle dans la jeunesse de Simón Bolívar ?|「解放者の師」として知られるシモン・ロドリゲスが、若きシモン・ボリバルの人生で果たした役割は?",
    [
      "His personal physician|Su médico personal|Son médecin personnel|専属の医師",
      "His childhood tutor|Su preceptor de infancia|Son précepteur d'enfance|幼少期の家庭教師",
      "His commanding officer|Su oficial al mando|Son officier commandant|指揮官",
    ],
    1,
    "Rodríguez introduced Bolívar to Enlightenment philosophy and later reunited with him in Europe, reportedly administering the oath that set Bolívar on his independence campaign.|Rodríguez introdujo a Bolívar en la filosofía de la Ilustración y más tarde se reencontró con él en Europa, donde según se cuenta le tomó el juramento que lo lanzó a su campaña de independencia.|Rodríguez initia Bolívar à la philosophie des Lumières et le retrouva plus tard en Europe, où il aurait fait prêter à Bolívar le serment qui le lança dans sa campagne d'indépendance.|ロドリゲスはボリバルに啓蒙思想を教え、のちにヨーロッパで再会した際、独立運動へ踏み出させたとされる誓いを立てさせたと伝わる。",
  ),
  q(
    8,
    "Venezuela shares its longest land border with which country?|¿Con qué país comparte Venezuela su frontera terrestre más larga?|Avec quel pays le Venezuela partage-t-il sa plus longue frontière terrestre ?|ベネズエラが最も長い陸上国境を接する国は?",
    [
      "Guyana|Guyana|Guyana|ガイアナ",
      "Brazil|Brasil|Brésil|ブラジル",
      "Colombia|Colombia|Colombie|コロンビア",
    ],
    2,
    "The border with Colombia runs for roughly 2,200 kilometres, from the Caribbean coast down through the Andes and into the Amazon basin, well longer than the borders with Brazil or Guyana.|La frontera con Colombia se extiende unos 2.200 kilómetros, desde la costa caribeña, a través de los Andes, hasta la cuenca amazónica, bastante más larga que las fronteras con Brasil o Guyana.|La frontière avec la Colombie s'étend sur environ 2 200 kilomètres, de la côte caraïbe à travers les Andes jusqu'au bassin amazonien, bien plus longue que les frontières avec le Brésil ou le Guyana.|コロンビアとの国境はカリブ海岸からアンデスを経てアマゾン盆地まで約2,200キロメートル続き、ブラジルやガイアナとの国境よりずっと長い。",
  ),
  q(
    8,
    "What is the official name of Venezuela's highest mountain, located in the Andes near Mérida?|¿Cuál es el nombre oficial de la montaña más alta de Venezuela, en los Andes cerca de Mérida?|Quel est le nom officiel du plus haut sommet du Venezuela, situé dans les Andes près de Mérida ?|メリダ近郊のアンデスにある、ベネズエラ最高峰の正式名称は?",
    [
      "Pico Espejo|Pico Espejo|Pico Espejo|ピコ・エスペホ",
      "Monte Roraima|Monte Roraima|Mont Roraima|ロライマ山",
      "Pico Bolívar|Pico Bolívar|Pico Bolívar|ピコ・ボリバル",
    ],
    2,
    "Pico Bolívar rises to about 4,978 metres and is topped by a bust of Simón Bolívar, placed there by an expedition in 1951.|El Pico Bolívar alcanza unos 4.978 metros y está coronado por un busto de Simón Bolívar, colocado allí por una expedición en 1951.|Le Pico Bolívar culmine à environ 4 978 mètres et est surmonté d'un buste de Simón Bolívar, installé par une expédition en 1951.|ピコ・ボリバルは標高約4,978メートルで、頂上には1951年の遠征隊が設置したシモン・ボリバルの胸像がある。",
  ),
  q(
    8,
    "In 2005, the national park behind Caracas, long known as El Ávila, officially restored which Indigenous name?|En 2005, ¿qué nombre indígena se restableció oficialmente para el parque nacional tras Caracas, conocido durante mucho tiempo como El Ávila?|En 2005, quel nom indigène le parc national derrière Caracas, longtemps appelé El Ávila, a-t-il officiellement retrouvé ?|2005年、長らく「エル・アビラ」と呼ばれてきたカラカス背後の国立公園が正式に復活させた先住民の呼び名は?",
    [
      "Waraira Repano|Waraira Repano|Waraira Repano|ワライラ・レパノ",
      "Kerepakupai Vená|Kerepakupai Vená|Kerepakupai Vená|ケレパクパイ・ベナ",
      "Auyantepui|Auyantepui|Auyantepui|アウヤン・テプイ",
    ],
    0,
    "Waraira Repano is the name used by the Indigenous people who lived on the mountain before Spanish colonisation, and the government restored it to official use alongside the Spanish name.|Waraira Repano es el nombre que usaba el pueblo indígena que vivía en la montaña antes de la colonización española, y el gobierno lo restableció para uso oficial junto al nombre en español.|Waraira Repano est le nom utilisé par le peuple indigène qui vivait sur la montagne avant la colonisation espagnole, et le gouvernement l'a rétabli à l'usage officiel aux côtés du nom espagnol.|ワライラ・レパノは、スペイン植民地化以前にこの山に暮らしていた先住民が使っていた名で、政府はスペイン語名と並ぶ公式名としてこれを復活させた。",
  ),
  q(
    9,
    "Maracaibo's lake bridge is officially named after which independence-era general?|El puente sobre el lago de Maracaibo lleva oficialmente el nombre de qué general de la época de la independencia?|Le pont sur le lac de Maracaibo porte officiellement le nom de quel général de l'époque de l'indépendance ?|マラカイボ湖の橋が正式に名を冠する独立時代の将軍は?",
    [
      "Antonio José de Sucre|Antonio José de Sucre|Antonio José de Sucre|アントニオ・ホセ・デ・スクレ",
      "Rafael Urdaneta|Rafael Urdaneta|Rafael Urdaneta|ラファエル・ウルダネタ",
      "José Antonio Páez|José Antonio Páez|José Antonio Páez|ホセ・アントニオ・パエス",
    ],
    1,
    "Rafael Urdaneta was a Maracaibo-born general in Bolívar's independence campaigns, and the bridge that finally linked the city to the oil fields across the lake in 1962 was named in his honour.|Rafael Urdaneta fue un general nacido en Maracaibo que combatió en las campañas de independencia de Bolívar, y el puente que por fin unió la ciudad con los campos petroleros al otro lado del lago en 1962 se nombró en su honor.|Rafael Urdaneta était un général né à Maracaibo, engagé dans les campagnes d'indépendance de Bolívar, et le pont qui relia enfin la ville aux champs pétroliers de l'autre côté du lac en 1962 fut nommé en son honneur.|ラファエル・ウルダネタはマラカイボ生まれの将軍で、ボリバルの独立戦争を戦った。1962年についに湖の対岸の油田地帯と町を結んだ橋は、彼の名にちなんで名付けられた。",
  ),
  q(
    9,
    "The 1859–1863 Venezuelan civil war fought largely between centralist and federalist factions is known by what name?|La guerra civil venezolana de 1859-1863, librada sobre todo entre facciones centralistas y federalistas, se conoce con qué nombre?|La guerre civile vénézuélienne de 1859-1863, opposant largement factions centralistes et fédéralistes, est connue sous quel nom ?|主に中央集権派と連邦派のあいだで争われた1859〜1863年のベネズエラ内戦は何と呼ばれるか?",
    [
      "The War of a Thousand Days|La Guerra de los Mil Días|La guerre des Mille Jours|千日戦争",
      "The Chaco War|La Guerra del Chaco|La guerre du Chaco|チャコ戦争",
      "The Federal War|La Guerra Federal|La guerre fédérale|連邦戦争",
    ],
    2,
    "The Federal War lasted roughly five years and killed a large share of the population relative to the country's size at the time, and its slogan \"tierra y hombres libres\" (land and free men) still appears in regional folklore.|La Guerra Federal duró unos cinco años y mató a una gran parte de la población en proporción al tamaño del país en la época, y su lema \"tierra y hombres libres\" todavía aparece en el folclore regional.|La guerre fédérale dura environ cinq ans et tua une large part de la population par rapport à la taille du pays à l'époque, et son slogan « tierra y hombres libres » (terre et hommes libres) figure encore dans le folklore régional.|連邦戦争はおよそ5年続き、当時の人口に対して大きな割合の犠牲者を出した。「土地と自由な人々」という標語はいまも地方の民間伝承に残る。",
  ),
];
