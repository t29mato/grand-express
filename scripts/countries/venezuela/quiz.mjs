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

  // =========================================================================
  // 増量分(2026-08-14〜)。難易度7以上を厚くする目標のため、易しい層は
  // 少なめ・難しい層を多めに足す。都市カード・アイテム・季節・出来事が
  // 触れていない主題を選び、legacy側の同一事実の言い回しは避けた。
  // =========================================================================

  q(
    2,
    "Venezuela's Amazonas state, its southernmost point, still lies in which hemisphere?|El estado Amazonas, el punto más al sur de Venezuela, ¿en qué hemisferio se encuentra todavía?|L'État d'Amazonas, le point le plus au sud du Venezuela, se trouve encore dans quel hémisphère ?|ベネズエラ最南端のアマソナス州は、それでもなお何半球にあるか?",
    [
      "The Southern Hemisphere|El hemisferio sur|L'hémisphère sud|南半球",
      "The Northern Hemisphere|El hemisferio norte|L'hémisphère nord|北半球",
      "It straddles the equator|Está a caballo del ecuador|Il chevauche l'équateur|赤道をまたいでいる",
    ],
    1,
    "Even Venezuela's southernmost tip sits just north of the equator, so the entire country lies in the Northern Hemisphere despite feeling equatorial almost everywhere.|Incluso la punta más austral de Venezuela queda justo al norte del ecuador, así que todo el país se ubica en el hemisferio norte pese a sentirse ecuatorial casi en todas partes.|Même la pointe la plus australe du Venezuela se trouve juste au nord de l'équateur, si bien que tout le pays se situe dans l'hémisphère nord, bien qu'il paraisse équatorial presque partout.|ベネズエラの最南端でさえ赤道のわずかに北にあり、国のほぼ全域が赤道直下のように感じられても、国全体は北半球に収まっている。",
  ),
  q(
    2,
    "Which country do the Andes mountains, which cover western Venezuela, continue into?|¿A qué país continúan los Andes que cubren el oeste de Venezuela?|Dans quel pays se prolongent les Andes qui couvrent l'ouest du Venezuela ?|ベネズエラ西部を覆うアンデス山脈が続いていく国は?",
    [
      "Colombia|Colombia|La Colombie|コロンビア",
      "Brazil|Brasil|Le Brésil|ブラジル",
      "Guyana|Guyana|Le Guyana|ガイアナ",
    ],
    0,
    "The Venezuelan Andes are the northeastern tail of the same mountain chain that runs the length of South America, and they peter out into lower hills not far past the Colombian border.|Los Andes venezolanos son la cola noreste de la misma cordillera que recorre toda Sudamérica, y se van apagando en colinas más bajas no muy lejos de la frontera con Colombia.|Les Andes vénézuéliennes sont la queue nord-est de la même chaîne qui parcourt toute l'Amérique du Sud, et elles s'amenuisent en collines plus basses peu après la frontière colombienne.|ベネズエラのアンデスは、南米大陸を貫く同じ山脈の北東の末端にあたり、コロンビア国境を過ぎてほど遠くないところで低い丘陵へと消えていく。",
  ),
  q(
    2,
    "\"Los Llanos\", the name of Venezuela's vast central grasslands, simply means what in Spanish?|\"Los Llanos\", el nombre de las vastas llanuras centrales de Venezuela, ¿qué significa sencillamente en español?|« Los Llanos », le nom des vastes plaines centrales du Venezuela, signifie simplement quoi en espagnol ?|ベネズエラ中央の広大な平原「ロス・ジャノス」は、スペイン語で単に何を意味するか?",
    [
      "The plains|Las llanuras|Les plaines|平原",
      "The forest|El bosque|La forêt|森",
      "The valley|El valle|La vallée|谷",
    ],
    0,
    "The name is about as plain as it sounds, and the region really is flat enough that a rider can see for kilometres in every direction without a single hill to break the view.|El nombre es tan sencillo como suena, y la región es de verdad tan plana que un jinete puede ver kilómetros en cualquier dirección sin una sola colina que corte la vista.|Le nom est aussi simple qu'il en a l'air, et la région est vraiment assez plate pour qu'un cavalier voie à des kilomètres dans toutes les directions sans la moindre colline pour rompre la vue.|その名のとおり単純な意味で、この地域は実際に平坦であり、乗り手はどの方角を見ても何キロも視界を遮る丘一つない。",
  ),
  q(
    3,
    "\"Tepui\", the word for Venezuela's flat-topped table mountains, comes from which people's language?|\"Tepui\", la palabra para las montañas de mesa de Venezuela, ¿de la lengua de qué pueblo proviene?|« Tepui », le mot désignant les montagnes-tables du Venezuela, vient de la langue de quel peuple ?|ベネズエラの卓状山を指す「テプイ」という語は、どの民族の言葉に由来するか?",
    [
      "The Pemón|Los pemón|Les Pemóns|ペモン族",
      "The Wayuu|Los wayuu|Les Wayuus|ワユー族",
      "The Yanomami|Los yanomami|Les Yanomamis|ヤノマミ族",
    ],
    0,
    "In the Pemón language of the Gran Sabana, tepui simply means \"house of the gods\" or \"mountain\", and dozens of these isolated plateaus rise out of the savanna in Venezuela's far south.|En la lengua pemón de la Gran Sabana, tepuy significa sencillamente \"casa de los dioses\" o \"montaña\", y decenas de estas mesetas aisladas se alzan sobre la sabana en el extremo sur de Venezuela.|Dans la langue pemón de la Gran Sabana, tepui signifie simplement « maison des dieux » ou « montagne », et des dizaines de ces plateaux isolés se dressent au-dessus de la savane, dans l'extrême sud du Venezuela.|グランサバナのペモン語で「テプイ」は単に「神々の家」あるいは「山」を意味し、こうした孤立した台地が数十とベネズエラ最南部のサバンナから立ち上がっている。",
  ),
  q(
    3,
    "Venezuela's national flower, declared by decree in 1951, is a variety of which plant?|La flor nacional de Venezuela, declarada por decreto en 1951, ¿es una variedad de qué planta?|La fleur nationale du Venezuela, déclarée par décret en 1951, est une variété de quelle plante ?|1951年の政令で定められたベネズエラの国花は、どの植物の品種か?",
    [
      "The rose|La rosa|La rose|バラ",
      "The orchid|La orquídea|L'orchidée|ラン",
      "The hibiscus|El hibisco|L'hibiscus|ハイビスカス",
    ],
    1,
    "The flor de mayo, a pale purple orchid known scientifically as Cattleya mossiae, blooms across the country's cooler highlands and gave its name to the honour.|La flor de mayo, una orquídea de color púrpura pálido conocida científicamente como Cattleya mossiae, florece en las tierras altas más frescas del país y dio su nombre a este honor.|La flor de mayo, une orchidée mauve pâle connue scientifiquement sous le nom de Cattleya mossiae, fleurit dans les hautes terres plus fraîches du pays et a donné son nom à cet honneur.|「五月の花」ことカトレア・モッシアエは薄紫の蘭で、国内の涼しい高地に咲き、その名がこの国花の呼び名にもなった。",
  ),
  q(
    3,
    "In which year did Venezuela sign its first declaration of independence from Spain?|¿En qué año firmó Venezuela su primera declaración de independencia de España?|En quelle année le Venezuela a-t-il signé sa première déclaration d'indépendance de l'Espagne ?|ベネズエラが最初のスペインからの独立宣言に署名したのは何年か?",
    [
      "1811|1811|1811|1811年",
      "1898|1898|1898|1898年",
      "1776|1776|1776|1776年",
    ],
    0,
    "The 1811 declaration created the short-lived First Republic, which collapsed within a year under royalist pressure and a devastating earthquake, so full independence took over a decade longer to secure.|La declaración de 1811 creó la efímera Primera República, que cayó en menos de un año por la presión realista y un terremoto devastador, así que la independencia plena tardó más de una década en asegurarse.|La déclaration de 1811 créa l'éphémère Première République, qui s'effondra en moins d'un an sous la pression royaliste et un séisme dévastateur, si bien que l'indépendance complète mit plus d'une décennie à s'établir.|1811年の宣言は短命な第一共和国を生んだが、王党派の圧力と大地震により一年足らずで崩れ去った。完全な独立の確保には、そこからさらに十年余りを要した。",
  ),
  q(
    3,
    "Besides Colombia and Brazil, which other country shares a land border with Venezuela?|Además de Colombia y Brasil, ¿qué otro país comparte frontera terrestre con Venezuela?|Outre la Colombie et le Brésil, quel autre pays partage une frontière terrestre avec le Venezuela ?|コロンビア・ブラジルのほかに、ベネズエラと陸上国境を接する国は?",
    [
      "Guyana|Guyana|Le Guyana|ガイアナ",
      "Suriname|Surinam|Le Suriname|スリナム",
      "Trinidad and Tobago|Trinidad y Tobago|Trinité-et-Tobago|トリニダード・トバゴ",
    ],
    0,
    "Venezuela's border with Guyana runs along the disputed Essequibo region to the east, while Trinidad lies just offshore across a narrow strait rather than sharing any land border at all.|La frontera de Venezuela con Guyana corre por la disputada región del Esequibo al este, mientras que Trinidad queda justo mar adentro, al otro lado de un estrecho angosto, sin compartir frontera terrestre alguna.|La frontière du Venezuela avec le Guyana longe la région disputée de l'Essequibo à l'est, tandis que Trinité se trouve juste au large, de l'autre côté d'un étroit détroit, sans partager la moindre frontière terrestre.|ベネズエラとガイアナの国境は、東側の係争地エセキボ地域に沿って延びる。一方トリニダードは狭い海峡を挟んだ沖合にあり、陸上国境はまったく持たない。",
  ),
  q(
    1,
    "How many colours appear as horizontal stripes on Venezuela's flag?|¿Cuántos colores aparecen como franjas horizontales en la bandera de Venezuela?|Combien de couleurs apparaissent en bandes horizontales sur le drapeau du Venezuela ?|ベネズエラの国旗に水平の帯として現れる色の数は?",
    [
      "Two|Dos|Deux|二色",
      "Three|Tres|Trois|三色",
      "Four|Cuatro|Quatre|四色",
    ],
    1,
    "Yellow, blue and red run in three equal horizontal bands, a tricolour Venezuela shares in origin with Colombia and Ecuador, all three once part of the same independence-era republic.|Amarillo, azul y rojo corren en tres franjas horizontales iguales, un tricolor que Venezuela comparte en origen con Colombia y Ecuador, los tres antiguamente parte de la misma república de la era independentista.|Jaune, bleu et rouge se déploient en trois bandes horizontales égales, un tricolore dont le Venezuela partage l'origine avec la Colombie et l'Équateur, les trois ayant jadis fait partie de la même république de l'ère indépendantiste.|黄・青・赤が等しい幅の三本の横帯として並ぶ。この三色旗はコロンビア・エクアドルとも起源を分け合い、三国はかつて独立期の同じ共和国の一部だった。",
  ),
  q(
    3,
    "Which large lake is often described as the largest lake in South America?|¿Qué gran lago se describe a menudo como el mayor lago de Sudamérica?|Quel grand lac est souvent décrit comme le plus grand lac d'Amérique du Sud ?|南米最大の湖とよく言われる大きな湖は?",
    [
      "Lake Maracaibo|El lago de Maracaibo|Le lac de Maracaibo|マラカイボ湖",
      "Lake Valencia|El lago de Valencia|Le lac de Valencia|バレンシア湖",
      "Lake Titicaca|El lago Titicaca|Le lac Titicaca|チチカカ湖",
    ],
    0,
    "Maracaibo is technically a brackish bay connected to the Caribbean rather than a fully closed freshwater lake, which is why some geographers argue over the title, but it is still routinely listed as South America's largest lake by area.|El de Maracaibo es técnicamente una bahía salobre conectada al Caribe y no un lago dulce totalmente cerrado, por lo que algunos geógrafos discuten el título, pero de todos modos suele figurar como el mayor lago de Sudamérica por superficie.|Celui de Maracaibo est techniquement une baie saumâtre reliée aux Caraïbes plutôt qu'un lac d'eau douce totalement fermé, ce qui fait débat chez certains géographes, mais il figure quand même couramment comme le plus grand lac d'Amérique du Sud par sa superficie.|マラカイボ湖は厳密にはカリブ海とつながる汽水の入り江であり、完全に閉じた淡水湖ではないため地理学者のあいだで呼び方に議論もあるが、それでも面積では南米最大の湖として挙げられることが多い。",
  ),
  q(
    3,
    "Which is the largest island belonging to Venezuela?|¿Cuál es la isla más grande que pertenece a Venezuela?|Quelle est la plus grande île appartenant au Venezuela ?|ベネズエラに属する最大の島は?",
    [
      "Isla de Margarita|Isla de Margarita|L'île de Margarita|マルガリータ島",
      "Isla La Tortuga|Isla La Tortuga|L'île La Tortuga|ラ・トルトゥガ島",
      "Isla de Coche|Isla de Coche|L'île de Coche|コチェ島",
    ],
    0,
    "Margarita anchors Nueva Esparta, the only Venezuelan state made up entirely of islands, and its beaches and duty-free shopping now draw far more visitors each year than its smaller neighbouring islets.|Margarita es el ancla de Nueva Esparta, el único estado venezolano formado enteramente por islas, y sus playas y comercio libre de impuestos atraen hoy a muchos más visitantes al año que sus islotes vecinos más pequeños.|Margarita ancre le Nueva Esparta, le seul État vénézuélien entièrement composé d'îles, et ses plages et son commerce hors taxes attirent aujourd'hui bien plus de visiteurs chaque année que ses petits îlots voisins.|マルガリータ島は、島だけで構成されるベネズエラ唯一の州ヌエバエスパルタの中心であり、そのビーチと免税店は近隣の小さな島々よりはるかに多くの観光客を毎年集めている。",
  ),
  q(
    3,
    "A cachapa, a popular Venezuelan street food, is a thick pancake made from what?|Una cachapa, comida callejera popular en Venezuela, ¿es una tortita gruesa hecha de qué?|Une cachapa, mets de rue populaire au Venezuela, est une épaisse crêpe faite à base de quoi ?|ベネズエラで人気の屋台料理カチャパは、何から作る厚いパンケーキか?",
    [
      "Sweet fresh corn|Maíz tierno dulce|Maïs tendre sucré|甘い生トウモロコシ",
      "Mashed plantain|Puré de plátano|Purée de plantain|プランテンのすりつぶし",
      "Wheat flour|Harina de trigo|Farine de blé|小麦粉",
    ],
    0,
    "Ground straight from the kernel rather than dried and reground like the corn in an arepa, cachapa batter is naturally sweet and is usually folded around a thick slab of soft white cheese while still hot off the griddle.|Molida directamente del grano y no seca y vuelta a moler como el maíz de la arepa, la masa de cachapa es naturalmente dulce y suele doblarse alrededor de una gruesa loncha de queso blanco blando mientras aún está caliente del budare.|Moulue directement à partir du grain plutôt que séchée puis remoulue comme le maïs de l'arepa, la pâte de cachapa est naturellement sucrée et se replie généralement autour d'une épaisse tranche de fromage blanc tendre encore chaude, sortie du budare.|アレパのように乾燥させてから挽き直すのではなく、生の実から直に挽くため、カチャパの生地は自然な甘みがある。熱々のまま白い柔らかいチーズの厚切りを挟んで食べるのが一般的である。",
  ),
  q(
    3,
    "Tequeños, a staple at Venezuelan parties, are sticks of dough fried around what filling?|Los tequeños, infaltables en las fiestas venezolanas, son palitos de masa fritos con qué relleno?|Les tequeños, incontournables des fêtes vénézuéliennes, sont des bâtonnets de pâte frits autour de quelle garniture ?|ベネズエラのパーティーに欠かせないテケーニョスは、何を詰めて揚げた生地の棒か?",
    [
      "White cheese|Queso blanco|Fromage blanc|白いチーズ",
      "Ground beef|Carne molida|Viande hachée|ひき肉",
      "Black beans|Caraotas negras|Haricots noirs|黒豆",
    ],
    0,
    "A stick of firm white cheese wrapped in dough and deep-fried until golden, tequeños are considered so essential to any gathering that a party without them is barely considered a party at all.|Un palito de queso blanco firme envuelto en masa y frito hasta dorar, el tequeño se considera tan esencial en cualquier reunión que una fiesta sin ellos apenas se considera una fiesta.|Un bâtonnet de fromage blanc ferme enveloppé de pâte et frit jusqu'à dorure, le tequeño est jugé si essentiel à toute réunion qu'une fête sans lui n'en est presque pas une.|しっかりした白チーズの棒を生地で包み、きつね色になるまで揚げたテケーニョスは、どんな集まりにも欠かせないと考えられており、これが無いパーティーはほとんどパーティーとは呼べないとされる。",
  ),
  q(
    3,
    "Chicha venezolana, a sweet drink sold from carts on hot afternoons, is traditionally made from which grain?|La chicha venezolana, bebida dulce vendida en carritos las tardes calurosas, se hace tradicionalmente de qué grano?|La chicha venezolana, boisson sucrée vendue sur des chariots les après-midis chauds, se prépare traditionnellement à base de quelle céréale ?|暑い午後に屋台で売られる甘い飲み物、チチャ・ベネソラーナは伝統的に何の穀物から作るか?",
    [
      "Rice|Arroz|Riz|米",
      "Barley|Cebada|Orge|大麦",
      "Oats|Avena|Avoine|オーツ麦",
    ],
    0,
    "Rice is boiled down, blended with milk, sugar and vanilla, and served ice-cold over a dusting of cinnamon, and the drink is common enough that a chicha cart is a fixture outside almost any school gate.|El arroz se cuece hasta ablandarse, se licúa con leche, azúcar y vainilla, y se sirve bien frío con un poco de canela por encima, y la bebida es tan común que un carrito de chicha es fijo casi frente a cualquier portón de escuela.|Le riz est cuit jusqu'à ramollir, mixé avec du lait, du sucre et de la vanille, puis servi bien frais saupoudré de cannelle, et la boisson est si courante qu'un chariot de chicha est presque un fixture devant n'importe quel portail d'école.|米を柔らかく煮てミルク・砂糖・バニラと混ぜ、シナモンを振ってよく冷やして出す。あまりに一般的な飲み物なので、どの学校の門前にもチチャの屋台がほぼ決まって出ている。",
  ),

  // ---- 4〜6(旅行や下調べで分かる水準) ----
  q(
    4,
    "The Gulf of Venezuela, at the entrance to Lake Maracaibo, opens onto which body of water?|El golfo de Venezuela, a la entrada del lago de Maracaibo, ¿se abre a qué cuerpo de agua?|Le golfe du Venezuela, à l'entrée du lac de Maracaibo, s'ouvre sur quelle étendue d'eau ?|マラカイボ湖の入口にあるベネズエラ湾は、どの海域に開けているか?",
    [
      "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋",
      "The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海",
      "The Atlantic Ocean, directly|El océano Atlántico, directamente|L'océan Atlantique, directement|大西洋(直接)",
    ],
    1,
    "Ships bound for the oil terminals of Lake Maracaibo cross the Gulf of Venezuela and then squeeze through the narrow Tablazo Strait before finally reaching open lake water.|Los barcos con destino a las terminales petroleras del lago de Maracaibo cruzan el golfo de Venezuela y luego se cuelan por el estrecho canal de Tablazo antes de llegar por fin a la lámina de agua abierta del lago.|Les navires en route vers les terminaux pétroliers du lac de Maracaibo traversent le golfe du Venezuela puis se faufilent par l'étroit détroit de Tablazo avant d'atteindre enfin les eaux libres du lac.|マラカイボ湖の石油ターミナルへ向かう船は、ベネズエラ湾を渡ったのち、狭いタブラソ海峡を抜けて、ようやく開けた湖面にたどり着く。",
  ),
  q(
    4,
    "What animal is depicted running across Venezuela's coat of arms?|¿Qué animal aparece corriendo en el escudo de armas de Venezuela?|Quel animal court sur les armoiries du Venezuela ?|ベネズエラの国章に描かれ、駆けている動物は?",
    [
      "A jaguar|Un jaguar|Un jaguar|ジャガー",
      "A horse|Un caballo|Un cheval|馬",
      "A capybara|Un chigüire|Un capybara|カピバラ",
    ],
    1,
    "A single white horse gallops freely across the coat of arms, a widely understood symbol of liberty and independence, alongside sheaves of wheat and a cornucopia of fruit representing abundance.|Un solo caballo blanco galopa libremente en el escudo de armas, símbolo ampliamente entendido de libertad e independencia, junto a espigas de trigo y un cuerno de la abundancia con frutas.|Un unique cheval blanc galope librement sur les armoiries, symbole largement compris de liberté et d'indépendance, aux côtés de gerbes de blé et d'une corne d'abondance chargée de fruits.|国章では一頭の白い馬が自由に駆けている。自由と独立を表す広く知られた象徴で、豊かさを表す小麦の束や果物の角笛とともに描かれる。",
  ),
  q(
    4,
    "Reading from top to bottom, in what order do the colours run on Venezuela's flag?|Leyendo de arriba abajo, ¿en qué orden van los colores en la bandera de Venezuela?|En lisant de haut en bas, dans quel ordre se succèdent les couleurs du drapeau du Venezuela ?|上から下へ読むと、ベネズエラの国旗の色はどの順で並ぶか?",
    [
      "Yellow, blue, red|Amarillo, azul, rojo|Jaune, bleu, rouge|黄・青・赤",
      "Red, yellow, blue|Rojo, amarillo, azul|Rouge, jaune, bleu|赤・黄・青",
      "Blue, red, yellow|Azul, rojo, amarillo|Bleu, rouge, jaune|青・赤・黄",
    ],
    0,
    "The yellow band traditionally stands for the land's wealth, blue for the ocean that separated the colony from Spain, and red for the blood shed in the independence wars.|La franja amarilla representa tradicionalmente la riqueza de la tierra, la azul el océano que separaba la colonia de España, y la roja la sangre derramada en las guerras de independencia.|La bande jaune symbolise traditionnellement la richesse de la terre, la bleue l'océan qui séparait la colonie de l'Espagne, et la rouge le sang versé lors des guerres d'indépendance.|黄の帯は伝統的に大地の富を、青は植民地とスペインを隔てた大洋を、赤は独立戦争で流された血を表すとされる。",
  ),
  q(
    4,
    "\"Vinotinto\", the affectionate nickname for Venezuela's national football team, refers to the colour of what?|\"Vinotinto\", el apodo cariñoso de la selección de fútbol de Venezuela, ¿se refiere al color de qué?|« Vinotinto », le surnom affectueux de l'équipe nationale de football du Venezuela, fait référence à la couleur de quoi ?|ベネズエラのサッカー代表チームの愛称「ビノティント」は、何の色を指すか?",
    [
      "Their jerseys|Sus camisetas|Leurs maillots|ユニフォーム",
      "The stadium seats|Los asientos del estadio|Les sièges du stade|スタジアムの座席",
      "The team bus|El autobús del equipo|Le bus de l'équipe|チームバス",
    ],
    0,
    "Vinotinto literally means \"wine-red\", the deep burgundy shade the team has worn since the 1930s, chosen at a time when baseball, not football, still commanded most of the country's sporting attention.|Vinotinto significa literalmente \"vino tinto\", el tono burdeos profundo que el equipo viste desde los años treinta, elegido en una época en que el béisbol, no el fútbol, todavía acaparaba la mayor parte de la atención deportiva del país.|Vinotinto signifie littéralement « vin rouge », la teinte bordeaux profonde que l'équipe porte depuis les années 1930, choisie à une époque où le baseball, et non le football, captait encore l'essentiel de l'attention sportive du pays.|「ビノティント」は文字どおり「赤ワイン色」を意味し、代表チームが1930年代から着る深いえんじ色を指す。当時はまだサッカーではなく野球が国のスポーツ関心の大半を占めていた時代に選ばれた色である。",
  ),
  q(
    4,
    "The green anaconda, found in Venezuela's wetlands, is generally considered the world's heaviest what?|La anaconda verde, presente en los humedales de Venezuela, se considera generalmente el más pesado del mundo entre los qué?|L'anaconda verte, présente dans les zones humides du Venezuela, est généralement considérée comme le plus lourd du monde parmi les quoi ?|ベネズエラの湿地に生息するオオアナコンダは、一般に世界で最も重い何とされているか?",
    [
      "Snake|Serpiente|Serpent|ヘビ",
      "Fish|Pez|Poisson|魚",
      "Amphibian|Anfibio|Amphibien|両生類",
    ],
    0,
    "A large female green anaconda can weigh well over 100 kilograms, and the species spends most of its life submerged in slow-moving rivers and flooded plains rather than on land.|Una anaconda verde hembra grande puede pesar bien más de 100 kilogramos, y la especie pasa la mayor parte de su vida sumergida en ríos de corriente lenta y llanuras inundadas en vez de en tierra.|Une grande femelle anaconda verte peut peser bien plus de 100 kilogrammes, et l'espèce passe l'essentiel de sa vie submergée dans des rivières lentes et des plaines inondées plutôt que sur la terre ferme.|大型の雌のオオアナコンダは体重が100キロを優に超えることがあり、この種は陸上より流れの緩やかな川や増水した平原に浸かって過ごす時間のほうがずっと長い。",
  ),
  q(
    5,
    "Papelón, a block of unrefined cane sugar used across Venezuelan cooking, is best described as a solid form of what?|El papelón, un bloque de azúcar de caña sin refinar usado en la cocina venezolana, se describe mejor como una forma sólida de qué?|Le papelón, un pain de sucre de canne non raffiné utilisé dans la cuisine vénézuélienne, se décrit le mieux comme une forme solide de quoi ?|ベネズエラ料理で使われる、精製していないサトウキビの塊「パペロン」は、何を固めたものと言うのが一番近いか?",
    [
      "Unrefined whole cane sugar|Azúcar de caña integral sin refinar|Sucre de canne complet non raffiné|精製していない粗糖",
      "Salted butter|Mantequilla salada|Beurre salé|有塩バター",
      "Dried cassava flour|Harina de yuca seca|Farine de manioc séchée|乾燥キャッサバ粉",
    ],
    0,
    "Boiled cane juice is poured into moulds and left to harden into a dense brown block, then grated or dissolved to sweeten everything from coffee to the popular chilled drink papelón con limón.|El jugo de caña hervido se vierte en moldes y se deja endurecer hasta formar un bloque marrón denso, que luego se ralla o disuelve para endulzar desde el café hasta la popular bebida fría papelón con limón.|Le jus de canne bouilli est versé dans des moules et laissé durcir en un bloc brun dense, puis râpé ou dissous pour sucrer aussi bien le café que la populaire boisson glacée papelón con limón.|煮詰めたサトウキビの汁を型に流し込んで固め、濃い茶色の塊にする。それをすりおろすか溶かして、コーヒーから人気の冷たい飲み物「パペロン・コン・リモン」まで甘みをつける。",
  ),
  q(
    5,
    "Guasacaca, a bright green sauce served alongside grilled meat in Venezuela, is based mainly on which fruit?|La guasacaca, salsa verde brillante que acompaña la carne asada en Venezuela, ¿se basa principalmente en qué fruta?|La guasacaca, sauce vert vif servie avec la viande grillée au Venezuela, est-elle principalement à base de quel fruit ?|ベネズエラで焼いた肉に添えられる鮮やかな緑色のソース、グアサカカの主な材料は?",
    [
      "Avocado|Aguacate|Avocat|アボカド",
      "Green mango|Mango verde|Mangue verte|青いマンゴー",
      "Kiwi|Kiwi|Kiwi|キウイ",
    ],
    0,
    "Mashed avocado blended with vinegar, onion, garlic and coriander gives guasacaca a tang that plain guacamole doesn't have, and no parrilla, or backyard barbecue, feels complete without a bowl of it on the table.|El aguacate machacado mezclado con vinagre, cebolla, ajo y cilantro le da a la guasacaca un toque ácido que el guacamole simple no tiene, y ninguna parrilla se siente completa sin un tazón de ella en la mesa.|L'avocat écrasé mélangé à du vinaigre, de l'oignon, de l'ail et de la coriandre donne à la guasacaca une pointe d'acidité que le guacamole simple n'a pas, et aucune parrilla, ce barbecue de jardin, ne semble complète sans un bol sur la table.|つぶしたアボカドに酢・玉ねぎ・にんにく・コリアンダーを混ぜたグアサカカは、普通のグアカモレにはない酸味がある。庭でのバーベキュー「パリージャ」に、これを盛った器がないと物足りないとされる。",
  ),
  q(
    5,
    "The Wayuu, an Indigenous people known for colourful woven bags, live mainly on a peninsula straddling Venezuela and which other country?|Los wayuu, pueblo indígena conocido por sus coloridos bolsos tejidos, viven sobre todo en una península a caballo entre Venezuela y qué otro país?|Les Wayuus, peuple autochtone réputé pour ses sacs tissés colorés, vivent surtout sur une péninsule à cheval entre le Venezuela et quel autre pays ?|色鮮やかな織り物のバッグで知られる先住民ワユー族は、ベネズエラとどの国にまたがる半島に主に暮らしているか?",
    [
      "Colombia|Colombia|La Colombie|コロンビア",
      "Guyana|Guyana|Le Guyana|ガイアナ",
      "Brazil|Brasil|Le Brésil|ブラジル",
    ],
    0,
    "The Guajira Peninsula, split between Zulia state and Colombia's own La Guajira department, is home to the largest Indigenous group in both countries, and the woven mochila bag has become one of Colombia and Venezuela's best-known crafts abroad.|La península de la Guajira, dividida entre el estado Zulia y el propio departamento de La Guajira en Colombia, alberga al mayor pueblo indígena de ambos países, y el bolso mochila tejido se ha vuelto una de las artesanías más conocidas de Colombia y Venezuela en el exterior.|La péninsule de la Guajira, partagée entre l'État de Zulia et le département colombien de La Guajira, abrite le plus grand groupe autochtone des deux pays, et le sac tissé mochila est devenu l'un des artisanats les plus connus de Colombie et du Venezuela à l'étranger.|グアヒラ半島はスリア州とコロンビア側のラ・グアヒラ県にまたがり、両国で最大の先住民集団の故郷である。織り物のバッグ「モチラ」は、いまや国外でも知られるコロンビア・ベネズエラ双方を代表する工芸品の一つになっている。",
  ),
  q(
    5,
    "Miguel Cabrera, a Venezuelan-born baseball star, won Major League Baseball's rare Triple Crown while playing for which team in 2012?|Miguel Cabrera, estrella del béisbol nacida en Venezuela, ¿con qué equipo ganó la infrecuente Triple Corona de las Grandes Ligas en 2012?|Miguel Cabrera, star du baseball né au Venezuela, a remporté la rare Triple Couronne de la Ligue majeure avec quelle équipe en 2012 ?|ベネズエラ生まれの野球スター、ミゲル・カブレラが2012年、メジャーリーグの数少ないトリプルクラウンを達成したのはどのチームでのことか?",
    [
      "The Detroit Tigers|Los Tigres de Detroit|Les Tigers de Détroit|デトロイト・タイガース",
      "The New York Yankees|Los Yanquis de Nueva York|Les Yankees de New York|ニューヨーク・ヤンキース",
      "The Los Angeles Dodgers|Los Dodgers de Los Ángeles|Les Dodgers de Los Angeles|ロサンゼルス・ドジャース",
    ],
    0,
    "Cabrera led the American League in batting average, home runs and runs batted in that season, the first player to achieve the feat since 1967, cementing his place among the greatest hitters the country has produced.|Cabrera lideró la Liga Americana en promedio de bateo, jonrones y carreras impulsadas esa temporada, el primer jugador en lograrlo desde 1967, lo que lo consolidó entre los mejores bateadores que ha dado el país.|Cabrera domina cette saison-là la Ligue américaine en moyenne au bâton, coups de circuit et points produits, le premier joueur à réussir cet exploit depuis 1967, ce qui le consacre parmi les plus grands frappeurs jamais produits par le pays.|カブレラはこのシーズン、アメリカン・リーグの打率・本塁打・打点の三部門でトップに立った。1967年以来この快挙を達成した初めての選手であり、この国が生んだ最高の打者の一人としての地位を固めた。",
  ),
  q(
    5,
    "Venezuela is currently divided into 23 states plus a Capital District. Which city sits inside that Capital District?|Venezuela se divide actualmente en 23 estados más un Distrito Capital. ¿Qué ciudad queda dentro de ese Distrito Capital?|Le Venezuela se divise actuellement en 23 États plus un District capital. Quelle ville se trouve dans ce District capital ?|ベネズエラはいま23の州と首都地区に分かれている。この首都地区に含まれる都市は?",
    [
      "Caracas|Caracas|Caracas|カラカス",
      "Maracaibo|Maracaibo|Maracaibo|マラカイボ",
      "Valencia|Valencia|Valencia|ヴァレンシア",
    ],
    0,
    "The Capital District covers only the historic core of Caracas, while the sprawling metropolitan area beyond it spills into neighbouring Miranda state, so the city's government is split across more than one administrative unit.|El Distrito Capital abarca solo el núcleo histórico de Caracas, mientras que el área metropolitana en expansión más allá se extiende hacia el vecino estado Miranda, así que el gobierno de la ciudad queda repartido entre más de una unidad administrativa.|Le District capital ne couvre que le noyau historique de Caracas, tandis que l'aire métropolitaine en expansion au-delà déborde sur l'État voisin de Miranda, si bien que l'administration de la ville se répartit sur plus d'une entité.|首都地区はカラカスの歴史的な中心部だけを含み、そこから広がる大都市圏は隣のミランダ州にまではみ出している。そのため市の行政は一つの単位に収まらず複数にまたがっている。",
  ),
  q(
    5,
    "The harpy eagle, one of the world's largest and most powerful birds of prey, hunts which animals in Venezuela's forests?|El águila harpía, una de las aves de presa más grandes y poderosas del mundo, ¿qué animales caza en los bosques de Venezuela?|Le harpie féroce, l'un des plus grands et plus puissants rapaces au monde, chasse quels animaux dans les forêts du Venezuela ?|世界最大級で最も力強い猛禽の一つハーピーイーグルは、ベネズエラの森で主に何を狩るか?",
    [
      "Monkeys and sloths|Monos y perezosos|Singes et paresseux|サルとナマケモノ",
      "Fish only|Solo peces|Uniquement des poissons|魚のみ",
      "Small rodents on the ground|Pequeños roedores en el suelo|De petits rongeurs au sol|地上の小さなげっ歯類",
    ],
    0,
    "With talons larger than a grizzly bear's claws, the harpy eagle snatches monkeys and sloths straight out of the rainforest canopy, and a female can weigh nearly twice as much as the male of the pair.|Con garras más grandes que las de un oso grizzly, el águila harpía arrebata monos y perezosos directamente del dosel de la selva, y una hembra puede pesar casi el doble que el macho de la pareja.|Avec des serres plus grandes que les griffes d'un grizzly, le harpie féroce arrache singes et paresseux directement à la canopée de la forêt tropicale, et une femelle peut peser presque le double du mâle du couple.|グリズリーの爪より大きな鉤爪を持つハーピーイーグルは、熱帯雨林の樹冠からサルやナマケモノを直接さらう。雌は同じつがいの雄のほぼ二倍の体重になることもある。",
  ),
  q(
    5,
    "The Médanos de Coro, a field of shifting sand dunes protected as a national park, lies in which Venezuelan state?|Los Médanos de Coro, un campo de dunas móviles protegido como parque nacional, ¿en qué estado venezolano se encuentra?|Les Médanos de Coro, un champ de dunes mouvantes protégé en tant que parc national, se trouve dans quel État vénézuélien ?|移動する砂丘の広がりで国立公園に指定されているメダノス・デ・コロがあるベネズエラの州は?",
    [
      "Falcón|Falcón|Le Falcón|ファルコン州",
      "Bolívar|Bolívar|Le Bolívar|ボリバル州",
      "Trujillo|Trujillo|Le Trujillo|トルヒージョ州",
    ],
    0,
    "Wind funnelling between the Paraguaná Peninsula and the mainland piles sand into dunes that can shift several metres a year, an unusual desert-like landscape squeezed right up against the Caribbean coast.|El viento que se canaliza entre la península de Paraguaná y tierra firme amontona arena en dunas que pueden moverse varios metros al año, un paisaje desértico insólito apretado justo contra la costa caribeña.|Le vent canalisé entre la péninsule de Paraguaná et le continent entasse le sable en dunes pouvant se déplacer de plusieurs mètres par an, un paysage désertique insolite serré contre la côte caraïbe.|パラグアナ半島と本土のあいだを吹き抜ける風が砂を積み上げ、年に数メートルも動く砂丘を作る。カリブ海岸のすぐ際に押し込まれた、珍しい砂漠のような景観である。",
  ),
  q(
    5,
    "\"Curiara\", the everyday Venezuelan word for the dugout canoes used on rivers and in the Orinoco Delta, refers to what kind of boat?|\"Curiara\", la palabra venezolana cotidiana para las canoas de un solo tronco usadas en los ríos y el Delta del Orinoco, ¿a qué tipo de embarcación se refiere?|« Curiara », le mot vénézuélien courant pour les pirogues monoxyles utilisées sur les fleuves et dans le delta de l'Orénoque, désigne quel type d'embarcation ?|河川やオリノコ・デルタで使われる丸木舟を指すベネズエラの日常語「クリアラ」は、どんな舟を指すか?",
    [
      "A canoe hollowed from a single tree trunk|Una canoa ahuecada de un solo tronco|Une pirogue creusée dans un tronc d'arbre unique|一本の丸太をくり抜いたカヌー",
      "A raft of tied bamboo poles|Una balsa de cañas de bambú atadas|Un radeau de tiges de bambou attachées|竹の棒を束ねた筏",
      "An inflatable rubber boat|Un bote inflable de goma|Un bateau gonflable en caoutchouc|ゴム製の空気ボート",
    ],
    0,
    "Carved and burned out of a single large trunk, a curiara can carry a family and a full day's catch through channels too shallow or too tangled with roots for any motorboat to manage.|Tallada y quemada de un solo tronco grande, una curiara puede llevar a una familia y la pesca de todo un día por canales demasiado someros o enredados de raíces para que cualquier lancha a motor los transite.|Sculptée et brûlée à partir d'un unique tronc massif, une curiara peut transporter une famille et la pêche d'une journée entière à travers des chenaux trop peu profonds ou trop enchevêtrés de racines pour qu'un bateau à moteur s'y aventure.|大きな一本の丸太を刳り貫き、焼いて仕上げるクリアラは、モーターボートでは通れないほど浅く根の絡んだ水路でも、一家族と一日分の漁獲物を運ぶことができる。",
  ),
  q(
    6,
    "A golfeado, a sweet spiral pastry associated with Aragua state, is glazed with which ingredient?|El golfeado, dulce en espiral asociado al estado Aragua, ¿se glasea con qué ingrediente?|Le golfeado, pâtisserie sucrée en spirale associée à l'État d'Aragua, est glacé avec quel ingrédient ?|アラグア州に結びつく渦巻き状の甘いパン、ゴルフェアドは何で照りをつけるか?",
    [
      "Papelón (unrefined cane sugar)|Papelón (azúcar de caña sin refinar)|Papelón (sucre de canne non raffiné)|パペロン(未精製のサトウキビ糖)",
      "Honey and cinnamon only|Solo miel y canela|Uniquement du miel et de la cannelle|蜂蜜とシナモンのみ",
      "Chocolate ganache|Ganache de chocolate|Ganache au chocolat|チョコレートガナッシュ",
    ],
    0,
    "The spiral of dough is baked with a mild white cheese folded inside and then soaked in a syrup made from melted papelón, so the finished bun turns a deep amber and sticks to the fingers.|La espiral de masa se hornea con un queso blanco suave doblado en su interior y luego se baña en un almíbar hecho de papelón derretido, así que el bollo terminado se vuelve de un ámbar profundo y se pega a los dedos.|La spirale de pâte est cuite avec un fromage blanc doux replié à l'intérieur, puis trempée dans un sirop de papelón fondu, si bien que la brioche finie prend une teinte ambrée profonde et colle aux doigts.|渦巻き状の生地に癖のない白チーズを折り込んで焼き、溶かしたパペロンで作ったシロップに浸す。仕上がったパンは濃い琥珀色になり、指にべたつくほど甘い。",
  ),
  q(
    6,
    "Venezuela's professional winter baseball league, still running today, was founded in which decade?|La liga profesional de béisbol de invierno de Venezuela, que todavía funciona hoy, se fundó en qué década?|La ligue professionnelle de baseball d'hiver du Venezuela, toujours active aujourd'hui, a été fondée dans quelle décennie ?|いまも続くベネズエラのプロ野球ウインターリーグが創設されたのはいつの年代か?",
    [
      "The 1940s|Los años 40|Les années 1940|1940年代",
      "The 1990s|Los años 90|Les années 1990|1990年代",
      "The 1920s|Los años 20|Les années 1920|1920年代",
    ],
    0,
    "The Liga Venezolana de Béisbol Profesional began play in 1945 and now runs every winter, giving Major League players from Venezuela and elsewhere a season to keep sharp before spring training starts.|La Liga Venezolana de Béisbol Profesional comenzó a jugar en 1945 y hoy se disputa cada invierno, dando a jugadores de Grandes Ligas de Venezuela y de otros países una temporada para mantenerse en forma antes del entrenamiento de primavera.|La Liga Venezolana de Béisbol Profesional a débuté en 1945 et se dispute aujourd'hui chaque hiver, offrant aux joueurs de ligue majeure venus du Venezuela et d'ailleurs une saison pour rester affûtés avant l'entraînement de printemps.|ベネズエラ・プロ野球リーグ(LVBP)は1945年に始まり、いまも毎冬開かれている。ベネズエラをはじめとするメジャーリーガーたちが、春季キャンプの前に調子を保つための場になっている。",
  ),
  q(
    6,
    "The Orinoco is often ranked as the world's third-largest river by which measure?|El Orinoco suele figurar como el tercer río más grande del mundo según qué medida?|L'Orénoque est souvent classé troisième fleuve du monde selon quel critère ?|オリノコ川は、どのような基準でしばしば世界第3位の川に数えられるか?",
    [
      "Volume of water discharged|Volumen de agua descargada|Volume d'eau déversé|流量(水量)",
      "Total length|Longitud total|Longueur totale|全長",
      "Number of countries it flows through|Número de países por los que pasa|Nombre de pays traversés|流域国の数",
    ],
    0,
    "Only the Amazon and the Congo pour more fresh water into the ocean each second, and the Orinoco alone accounts for roughly a fifth of all the freshwater discharge feeding the Caribbean Sea.|Solo el Amazonas y el Congo vierten más agua dulce al océano cada segundo, y el Orinoco por sí solo aporta aproximadamente una quinta parte de toda la descarga de agua dulce que recibe el mar Caribe.|Seuls l'Amazone et le Congo déversent plus d'eau douce dans l'océan chaque seconde, et l'Orénoque à lui seul fournit environ un cinquième de tout le débit d'eau douce alimentant la mer des Caraïbes.|毎秒より多くの淡水を海へ注ぐのはアマゾン川とコンゴ川だけで、オリノコ川一本だけでカリブ海に流れ込む淡水のおよそ5分の1を占める。",
  ),
  q(
    6,
    "In 1498, Christopher Columbus became the first European to sight the South American mainland near which Venezuelan peninsula, which he named \"Tierra de Gracia\"?|En 1498, Cristóbal Colón fue el primer europeo en avistar el continente sudamericano cerca de qué península venezolana, a la que llamó \"Tierra de Gracia\"?|En 1498, Christophe Colomb fut le premier Européen à apercevoir le continent sud-américain près de quelle péninsule vénézuélienne, qu'il baptisa « Tierra de Gracia » ?|1498年、コロンブスがヨーロッパ人として初めて南米大陸を目にしたのは、彼が「恵みの地」と名付けたベネズエラのどの半島の近くだったか?",
    [
      "The Paria Peninsula|La península de Paria|La péninsule de Paria|パリア半島",
      "The Paraguaná Peninsula|La península de Paraguaná|La péninsule de Paraguaná|パラグアナ半島",
      "The Araya Peninsula|La península de Araya|La péninsule d'Araya|アラヤ半島",
    ],
    0,
    "Columbus was on his third voyage and initially assumed he had found another island, but the sheer volume of fresh water pouring from the Orinoco convinced him he had reached a continent instead.|Colón iba en su tercer viaje y al principio supuso que había hallado otra isla, pero el enorme volumen de agua dulce que vertía el Orinoco lo convenció de que en realidad había llegado a un continente.|Colomb en était à son troisième voyage et supposa d'abord avoir trouvé une nouvelle île, mais l'énorme volume d'eau douce déversé par l'Orénoque le convainquit qu'il avait plutôt atteint un continent.|コロンブスは三度目の航海の途上で、当初はまた別の島を見つけたと思い込んでいたが、オリノコ川が注ぐ淡水のあまりの量に、これは大陸に行き着いたのだと確信するに至った。",
  ),
  q(
    6,
    "The Boca del Dragón, or \"Dragon's Mouth\", is the strait separating Venezuela's Paria Peninsula from which island?|La Boca del Dragón es el estrecho que separa la península de Paria de Venezuela de qué isla?|La Boca del Dragón, ou « bouche du Dragon », est le détroit séparant la péninsule de Paria du Venezuela de quelle île ?|「ドラゴンの口」ボカ・デル・ドラゴンは、ベネズエラのパリア半島をどの島から隔てる海峡か?",
    [
      "Trinidad|Trinidad|Trinité|トリニダード島",
      "Aruba|Aruba|Aruba|アルバ島",
      "Margarita|Margarita|Margarita|マルガリータ島",
    ],
    0,
    "Columbus gave the strait its dramatic name after his ships struggled against violent currents where the Orinoco's fresh water collides with the Atlantic tide, a passage still treated with caution by sailors today.|Colón le dio al estrecho su nombre dramático después de que sus barcos lucharan contra corrientes violentas donde el agua dulce del Orinoco choca con la marea atlántica, un paso que los marinos aún tratan con cautela hoy.|Colomb donna au détroit son nom dramatique après que ses navires eurent lutté contre des courants violents là où l'eau douce de l'Orénoque heurte la marée atlantique, un passage que les marins traitent encore aujourd'hui avec prudence.|コロンブスがこの海峡に劇的な名を与えたのは、オリノコ川の淡水が大西洋の潮とぶつかる場所で、彼の船団が激しい海流に翻弄されたためである。この水路はいまも船乗りたちに用心深く扱われている。",
  ),
  q(
    6,
    "In 1567, Spanish conquistador Diego de Losada founded the settlement that grew into which present-day city?|En 1567, el conquistador español Diego de Losada fundó el asentamiento que se convirtió en qué ciudad actual?|En 1567, le conquistador espagnol Diego de Losada fonda l'établissement qui devint quelle ville actuelle ?|1567年、スペインの征服者ディエゴ・デ・ロサダが築いた集落は、のちにどの現在の都市になったか?",
    [
      "Caracas|Caracas|Caracas|カラカス",
      "Maracaibo|Maracaibo|Maracaibo|マラカイボ",
      "Barquisimeto|Barquisimeto|Barquisimeto|バルキシメト",
    ],
    0,
    "Losada named the settlement Santiago de León de Caracas, choosing a valley the local Toromaima people had defended fiercely, and the shortened name Caracas is the only part of it still in everyday use.|Losada llamó al asentamiento Santiago de León de Caracas, y eligió un valle que el pueblo local toromaima había defendido con fiereza, y el nombre abreviado Caracas es la única parte que se sigue usando a diario.|Losada nomma l'établissement Santiago de León de Caracas, choisissant une vallée que le peuple toromaima local avait farouchement défendue, et le nom abrégé Caracas est la seule partie encore utilisée au quotidien.|ロサダはこの集落を「サンティアゴ・デ・レオン・デ・カラカス」と名付けた。地元のトロマイマ族が激しく守り抜いていた谷を選んでの建設だった。いま日常的に使われているのは短縮形の「カラカス」だけである。",
  ),
  q(
    6,
    "Venezuela's national anthem is known by which title, taken from its opening line?|El himno nacional de Venezuela se conoce por qué título, tomado de su primera línea?|L'hymne national du Venezuela est connu sous quel titre, tiré de sa première ligne ?|ベネズエラの国歌は、その冒頭の一節から取られたどの題名で知られるか?",
    [
      "Gloria al Bravo Pueblo|Gloria al Bravo Pueblo|Gloria al Bravo Pueblo|グロリア・アル・ブラボ・プエブロ",
      "Himno de Riego|Himno de Riego|Himno de Riego|イムノ・デ・リエゴ",
      "Salve, Oh Patria|Salve, Oh Patria|Salve, Oh Patria|サルベ・オ・パトリア",
    ],
    0,
    "\"Glory to the brave people\" was already being sung as a patriotic march during the independence wars decades before it was formally adopted, which is part of why Venezuelans tend to know every verse by heart.|\"Gloria al bravo pueblo\" ya se cantaba como marcha patriótica durante las guerras de independencia décadas antes de adoptarse formalmente, lo cual explica en parte por qué los venezolanos suelen saberse de memoria todas sus estrofas.|« Gloire au peuple brave » se chantait déjà comme marche patriotique pendant les guerres d'indépendance, des décennies avant son adoption formelle, ce qui explique en partie pourquoi les Vénézuéliens en connaissent généralement tous les couplets par cœur.|「勇敢な人民に栄光あれ」は、正式に採用されるずっと前、独立戦争のさなかからすでに愛国的な行進曲として歌われていた。ベネズエラ人がどの節もそらんじられることが多いのは、そのためでもある。",
  ),
];
