/**
 * カナダのクイズ(36問)。
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
 * 都市カード(40件)が扱う具体的な事実(バンクーバーの人頭税・カムループスの
 * 寄宿学校・ハリファックス大爆発・ウィンザーの地下鉄道など)はここでは問わない。
 * 代わりに、国全体の制度・象徴・地理・現代文化・先住民に関わる歴史など、
 * **都市カードが触れていない主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs canada
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること
 * (このセッションでは走らせていない。焼いた後に確認する)。
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

export const CANADA_QUIZ = [
  q(
    1,
    "What is the capital of Canada?|¿Cuál es la capital de Canadá?|Quelle est la capitale du Canada ?|カナダの首都はどこか?",
    [
      "Ottawa|Ottawa|Ottawa|オタワ",
      "Toronto|Toronto|Toronto|トロント",
      "Vancouver|Vancouver|Vancouver|バンクーバー",
    ],
    0,
    "Ottawa has been the seat of the federal government since Queen Victoria selected it in 1857, even though Toronto and Montreal are both larger cities.|Ottawa es sede del gobierno federal desde que la reina Victoria la eligió en 1857, aunque Toronto y Montreal son ciudades más grandes.|Ottawa est le siège du gouvernement fédéral depuis que la reine Victoria l'a choisie en 1857, bien que Toronto et Montréal soient toutes deux plus grandes.|オタワは1857年にビクトリア女王が選んで以来、連邦政府の所在地であり続けている。トロントもモントリオールもそれより大きな都市であるにもかかわらずである。",
  ),
  q(
    1,
    "What is Canada's official currency?|¿Cuál es la moneda oficial de Canadá?|Quelle est la monnaie officielle du Canada ?|カナダの公式通貨は?",
    [
      "The US dollar|El dólar estadounidense|Le dollar américain|米ドル",
      "The Canadian dollar|El dólar canadiense|Le dollar canadien|カナダ・ドル",
      "The pound sterling|La libra esterlina|La livre sterling|英ポンド",
    ],
    1,
    "The Canadian dollar has been printed on durable polymer, rather than paper, since 2011, a change made to cut down on counterfeiting and wear.|El dólar canadiense se imprime en polímero duradero, en vez de papel, desde 2011, un cambio hecho para reducir la falsificación y el desgaste.|Le dollar canadien est imprimé sur un polymère durable plutôt que sur du papier depuis 2011, un changement fait pour réduire la contrefaçon et l'usure.|カナダ・ドルは2011年から紙ではなく丈夫なポリマー素材で印刷されている。偽造と摩耗を減らすための変更である。",
  ),
  q(
    2,
    "Which sport is Canada's official national winter sport?|¿Cuál es el deporte de invierno nacional oficial de Canadá?|Quel est le sport d'hiver national officiel du Canada ?|カナダの公式な冬季国技は?",
    [
      "Curling|Curling|Le curling|カーリング",
      "Figure skating|Patinaje artístico|Le patinage artistique|フィギュアスケート",
      "Ice hockey|Hockey sobre hielo|Le hockey sur glace|アイスホッケー",
    ],
    2,
    "A 1994 law named ice hockey the official winter sport and, in the same act, named lacrosse the official summer sport.|Una ley de 1994 nombró al hockey sobre hielo deporte oficial de invierno y, en la misma ley, al lacrosse deporte oficial de verano.|Une loi de 1994 a nommé le hockey sur glace sport d'hiver officiel et, dans la même loi, le lacrosse sport d'été officiel.|1994年の法律がアイスホッケーを公式な冬季国技に定め、同じ法律でラクロスを公式な夏季国技に定めた。",
  ),
  q(
    2,
    "What symbol sits at the centre of the Canadian flag, adopted in 1965?|¿Qué símbolo está en el centro de la bandera canadiense, adoptada en 1965?|Quel symbole figure au centre du drapeau canadien, adopté en 1965 ?|1965年に採用されたカナダ国旗の中央にある図案は?",
    [
      "A maple leaf|Una hoja de arce|Une feuille d'érable|カエデの葉",
      "A beaver|Un castor|Un castor|ビーバー",
      "A crown|Una corona|Une couronne|王冠",
    ],
    0,
    "The eleven-point stylized maple leaf was chosen after a design committee tested versions with different numbers of points for how they read at a distance and in the wind.|La hoja de arce estilizada de once puntas se eligió tras probar un comité de diseño versiones con distinto número de puntas, según cómo se leían a distancia y al viento.|La feuille d'érable stylisée à onze pointes fut choisie après qu'un comité de conception eut testé des versions à différents nombres de pointes, selon leur lisibilité à distance et au vent.|11個の先端を持つ様式化されたカエデの葉は、遠目や風になびいたときの見え方を比べたデザイン委員会の検討を経て選ばれた。",
  ),
  q(
    2,
    "On what date is Canada Day celebrated?|¿En qué fecha se celebra el Día de Canadá?|À quelle date célèbre-t-on la fête du Canada ?|カナダ・デーはいつ祝われるか?",
    [
      "July 4|4 de julio|Le 4 juillet|7月4日",
      "July 1|1 de julio|Le 1er juillet|7月1日",
      "November 11|11 de noviembre|Le 11 novembre|11月11日",
    ],
    1,
    "The date marks the 1867 act that joined three British colonies into the Dominion of Canada; the holiday was called Dominion Day until it was renamed in 1982.|La fecha marca la ley de 1867 que unió tres colonias británicas en el Dominio de Canadá; la festividad se llamó Día del Dominio hasta que se renombró en 1982.|La date marque la loi de 1867 qui unit trois colonies britanniques au sein du Dominion du Canada ; la fête s'appelait la fête du Dominion jusqu'à son changement de nom en 1982.|この日付は、1867年に三つの英領植民地を統合してカナダ自治領を作った法律を記念する。この祝日は1982年に改名されるまで「自治領の日」と呼ばれていた。",
  ),
  q(
    3,
    "Which two languages are Canada's official languages at the federal level?|¿Cuáles son las dos lenguas oficiales de Canadá a nivel federal?|Quelles sont les deux langues officielles du Canada au niveau fédéral ?|連邦レベルでのカナダの公用語二つは?",
    [
      "English and Spanish|Inglés y español|L'anglais et l'espagnol|英語とスペイン語",
      "French and Inuktitut|Francés e inuktitut|Le français et l'inuktitut|フランス語とイヌクティトゥット語",
      "English and French|Inglés y francés|L'anglais et le français|英語とフランス語",
    ],
    2,
    "The Official Languages Act of 1969 made English and French equal in all federal institutions, though several provinces and territories also give official status to Indigenous languages within their own borders.|La Ley de Lenguas Oficiales de 1969 igualó el inglés y el francés en todas las instituciones federales, aunque varias provincias y territorios también dan estatus oficial a lenguas indígenas dentro de sus fronteras.|La Loi sur les langues officielles de 1969 a mis l'anglais et le français sur un pied d'égalité dans toutes les institutions fédérales, bien que plusieurs provinces et territoires accordent aussi un statut officiel à des langues autochtones sur leur territoire.|1969年の公用語法は、すべての連邦機関で英語とフランス語を対等に扱うと定めた。もっともいくつかの州・準州は自らの領域内で先住民の言語にも公用語の地位を与えている。",
  ),
  q(
    3,
    "Which is Canada's smallest province by area?|¿Cuál es la provincia más pequeña de Canadá por superficie?|Quelle est la plus petite province du Canada par superficie ?|カナダで面積が最も小さい州はどこか?",
    [
      "Prince Edward Island|Isla del Príncipe Eduardo|L'Île-du-Prince-Édouard|プリンスエドワード島",
      "Nova Scotia|Nueva Escocia|La Nouvelle-Écosse|ノバスコシア",
      "New Brunswick|Nuevo Brunswick|Le Nouveau-Brunswick|ニューブランズウィック",
    ],
    0,
    "Prince Edward Island covers only about 5,700 square kilometres, small enough that its entire population is smaller than many single cities elsewhere in the country.|La Isla del Príncipe Eduardo cubre solo unos 5.700 km², lo bastante pequeña como para que toda su población sea menor que la de muchas ciudades del resto del país.|L'Île-du-Prince-Édouard couvre à peine 5 700 km², assez petite pour que sa population totale soit inférieure à celle de bien des villes ailleurs au pays.|プリンスエドワード島の面積はわずか約5,700平方キロメートルで、その全人口ですら国内の多くの単一都市より少ないほど小さい。",
  ),
  q(
    3,
    "What animal appears on the Canadian five-cent coin?|¿Qué animal aparece en la moneda canadiense de cinco centavos?|Quel animal figure sur la pièce canadienne de cinq cents ?|カナダの5セント硬貨に描かれている動物は?",
    [
      "A moose|Un alce|Un orignal|ヘラジカ",
      "A beaver|Un castor|Un castor|ビーバー",
      "A loon|Un colimbo|Un plongeon huard|アビ(潜り鳥)",
    ],
    1,
    "The beaver has appeared on the nickel since 1937, chosen partly because the fur trade that beaver pelts drove was central to the country's early colonial economy.|El castor aparece en la moneda de níquel desde 1937, elegido en parte porque el comercio de pieles que impulsaban las pieles de castor fue clave en la economía colonial temprana del país.|Le castor figure sur la pièce de cinq cents depuis 1937, choisi en partie parce que le commerce des fourrures qu'entraînaient les peaux de castor fut central dans l'économie coloniale naissante du pays.|ビーバーは1937年から5セント硬貨に描かれている。ビーバーの毛皮が牽引した毛皮交易が、この国の初期植民地経済の中心だったことも選ばれた理由の一つである。",
  ),
  q(
    4,
    "Which province is Canada's largest by area?|¿Cuál es la provincia más grande de Canadá por superficie?|Quelle est la plus grande province du Canada par superficie ?|カナダで面積が最も大きい州はどこか?",
    [
      "Ontario|Ontario|L'Ontario|オンタリオ",
      "British Columbia|Columbia Británica|La Colombie-Britannique|ブリティッシュコロンビア",
      "Quebec|Quebec|Le Québec|ケベック",
    ],
    2,
    "Quebec covers more than 1.5 million square kilometres, over three times the size of France, though only the territory of Nunavut is larger among all of Canada's provinces and territories combined.|Quebec cubre más de 1,5 millones de km², más de tres veces el tamaño de Francia, aunque solo el territorio de Nunavut es más grande entre todas las provincias y territorios de Canadá.|Le Québec couvre plus de 1,5 million de km², plus de trois fois la superficie de la France, bien que seul le territoire du Nunavut soit plus vaste parmi toutes les provinces et territoires du Canada réunis.|ケベック州の面積は150万平方キロメートルを超え、フランスの3倍以上に及ぶ。もっともカナダの全州・準州の中では準州のヌナブトだけがこれより広い。",
  ),
  q(
    4,
    "How many oceans does Canada's coastline touch?|¿A cuántos océanos toca la costa de Canadá?|La côte du Canada touche combien d'océans ?|カナダの海岸線が接する海はいくつか?",
    [
      "Three|Tres|Trois|3つ",
      "Two|Dos|Deux|2つ",
      "Four|Cuatro|Quatre|4つ",
    ],
    0,
    "Canada borders the Pacific, Atlantic and Arctic oceans, which together give it the longest coastline of any country in the world.|Canadá limita con los océanos Pacífico, Atlántico y Ártico, lo que en conjunto le da la costa más larga de cualquier país del mundo.|Le Canada borde les océans Pacifique, Atlantique et Arctique, ce qui lui donne au total le plus long littoral de tous les pays du monde.|カナダは太平洋・大西洋・北極海の三つの海に面しており、これらを合わせると世界のどの国よりも長い海岸線を持つ。",
  ),
  q(
    4,
    "Which province produces roughly seventy percent of the world's maple syrup?|¿Qué provincia produce cerca del setenta por ciento del jarabe de arce del mundo?|Quelle province produit environ soixante-dix pour cent du sirop d'érable mondial ?|世界のメープルシロップのおよそ7割を生産する州は?",
    [
      "Ontario|Ontario|L'Ontario|オンタリオ",
      "Quebec|Quebec|Le Québec|ケベック",
      "Nova Scotia|Nueva Escocia|La Nouvelle-Écosse|ノバスコシア",
    ],
    1,
    "Quebec's sugar maple forests and thousands of small sugar shacks give the province a dominant share of world production, kept partly stable through a strategic syrup reserve.|Los bosques de arce azucarero y los miles de pequeños cobertizos de Quebec le dan a la provincia una parte dominante de la producción mundial, mantenida en parte estable por una reserva estratégica de jarabe.|Les érablières et les milliers de petites cabanes à sucre du Québec donnent à la province une part dominante de la production mondiale, stabilisée en partie par une réserve stratégique de sirop.|ケベック州のサトウカエデの森と何千もの小さな「シュガーシャック」が、この州に世界生産の大半を占めさせている。生産量は戦略的なシロップ備蓄によってある程度安定している。",
  ),
  q(
    4,
    "Which sport is Canada's official national summer sport?|¿Cuál es el deporte de verano nacional oficial de Canadá?|Quel est le sport d'été national officiel du Canada ?|カナダの公式な夏季国技は?",
    [
      "Baseball|Béisbol|Le baseball|野球",
      "Soccer|Fútbol|Le football|サッカー",
      "Lacrosse|Lacrosse|La crosse|ラクロス",
    ],
    2,
    "Lacrosse developed from a stickball game played by several Indigenous nations long before European contact, and Parliament named it the official summer sport in the same 1994 act that named ice hockey the winter one.|El lacrosse se desarrolló a partir de un juego de bastón jugado por varias naciones indígenas mucho antes del contacto europeo, y el Parlamento lo nombró deporte oficial de verano en la misma ley de 1994 que nombró al hockey el de invierno.|La crosse est née d'un jeu de bâton pratiqué par plusieurs nations autochtones bien avant le contact européen, et le Parlement en fit le sport d'été officiel dans la même loi de 1994 qui nomma le hockey sport d'hiver.|ラクロスは、ヨーロッパ人との接触よりずっと前から複数の先住民の国々で行われていたスティック競技から発展した。議会は、アイスホッケーを冬季国技と定めたのと同じ1994年の法律で、ラクロスを夏季国技に定めた。",
  ),
  q(
    5,
    "Which three groups does the Canadian constitution recognize as Indigenous peoples?|¿Qué tres grupos reconoce la constitución canadiense como pueblos indígenas?|Quels trois groupes la constitution canadienne reconnaît-elle comme peuples autochtones ?|カナダ憲法が先住民として認める三つの集団は?",
    [
      "First Nations, Inuit and Métis|Primeras Naciones, inuit y métis|Premières Nations, Inuits et Métis|ファースト・ネーションズ、イヌイット、メティス",
      "Cree, Mohawk and Haida|Cree, mohawk y haida|Cris, Mohawks et Haïdas|クリー、モホーク、ハイダ",
      "Settlers, Loyalists and Voyageurs|Colonos, leales y voyageurs|Colons, loyalistes et voyageurs|入植者、ロイヤリスト、ヴォワイアジャー",
    ],
    0,
    "The Constitution Act, 1982 names these three groups as Aboriginal peoples of Canada, though each covers dozens of distinct nations, languages and communities.|La Ley Constitucional de 1982 nombra a estos tres grupos como pueblos aborígenes de Canadá, aunque cada uno abarca decenas de naciones, lenguas y comunidades distintas.|La Loi constitutionnelle de 1982 désigne ces trois groupes comme peuples autochtones du Canada, chacun regroupant pourtant des dizaines de nations, langues et communautés distinctes.|1982年憲法法はこの三つの集団をカナダの先住民として挙げているが、それぞれの内側には数十もの異なる国・言語・共同体が含まれる。",
  ),
  q(
    5,
    "In what year did Newfoundland join Canada as its tenth province?|¿En qué año se unió Terranova a Canadá como su décima provincia?|En quelle année Terre-Neuve a-t-elle rejoint le Canada comme dixième province ?|ニューファンドランドがカナダの10番目の州として加わったのは何年か?",
    [
      "1927|1927|1927|1927年",
      "1949|1949|1949|1949年",
      "1965|1965|1965|1965年",
    ],
    1,
    "Newfoundland voted by a narrow margin in a 1948 referendum to join Canada rather than remain a separate dominion or seek other arrangements, formally becoming a province the following year.|Terranova votó por un estrecho margen en un referéndum de 1948 a favor de unirse a Canadá en vez de seguir siendo un dominio aparte, y se convirtió formalmente en provincia al año siguiente.|Terre-Neuve vota de justesse lors d'un référendum de 1948 en faveur de rejoindre le Canada plutôt que de rester un dominion séparé, devenant officiellement une province l'année suivante.|ニューファンドランドは1948年の住民投票で、僅差ながら独立した自治領であり続けるのではなくカナダに加わることを選び、翌年正式に州となった。",
  ),
  q(
    5,
    "What is the informal name for the Constitution Act, 1867, which created Canada?|¿Cómo se conoce informalmente a la Ley Constitucional de 1867 que creó Canadá?|Quel est le nom informel de la Loi constitutionnelle de 1867 qui a créé le Canada ?|カナダを生んだ1867年憲法法の通称は?",
    [
      "The Magna Carta|La Carta Magna|La Grande Charte|マグナ・カルタ",
      "The Treaty of Westminster|El Tratado de Westminster|Le traité de Westminster|ウェストミンスター条約",
      "The British North America Act|La Ley de la América del Norte Británica|L'Acte de l'Amérique du Nord britannique|英領北アメリカ法",
    ],
    2,
    "Passed by the British Parliament, the act joined the colonies of Canada, Nova Scotia and New Brunswick into a single federal dominion, and kept its original name until it was formally renamed in 1982.|Aprobada por el Parlamento británico, la ley unió las colonias de Canadá, Nueva Escocia y Nuevo Brunswick en un solo dominio federal, y conservó su nombre original hasta que se renombró formalmente en 1982.|Adoptée par le Parlement britannique, la loi unit les colonies du Canada, de la Nouvelle-Écosse et du Nouveau-Brunswick en un seul dominion fédéral, et garda son nom d'origine jusqu'à son changement officiel en 1982.|英国議会で可決されたこの法律は、カナダ・ノバスコシア・ニューブランズウィックの各植民地を一つの連邦自治領に統合した。この名称は1982年に正式に改称されるまで使われていた。",
  ),
  q(
    5,
    "In what year was the Trans-Canada Highway declared complete?|¿En qué año se declaró terminada la Autopista Transcanadiense?|En quelle année la route Transcanadienne a-t-elle été déclarée achevée ?|トランスカナダ・ハイウェイが完成宣言されたのは何年か?",
    [
      "1962|1962|1962|1962年",
      "1985|1985|1985|1985年",
      "1999|1999|1999|1999年",
    ],
    0,
    "At about 8,000 km, it remains one of the longest national highways in the world, though some remote stretches were still being paved for years after the official opening ceremony.|Con unos 8.000 km, sigue siendo una de las autopistas nacionales más largas del mundo, aunque algunos tramos remotos siguieron pavimentándose años después de la ceremonia oficial de apertura.|Longue d'environ 8 000 km, elle reste l'une des plus longues routes nationales du monde, bien que certains tronçons isolés aient continué d'être pavés des années après la cérémonie officielle d'ouverture.|全長およそ8000kmのこの道路は、いまも世界屈指の長さを誇る国道である。もっとも一部の遠隔区間は、公式な開通式のあとも何年か舗装工事が続いていた。",
  ),
  q(
    6,
    "What animal is depicted on the Canadian two-dollar coin?|¿Qué animal aparece en la moneda canadiense de dos dólares?|Quel animal figure sur la pièce canadienne de deux dollars ?|カナダの2ドル硬貨に描かれている動物は?",
    [
      "A caribou|Un caribú|Un caribou|カリブー",
      "A polar bear|Un oso polar|Un ours polaire|ホッキョクグマ",
      "A wolf|Un lobo|Un loup|オオカミ",
    ],
    1,
    "Introduced in 1996 and nicknamed the 'toonie', the two-dollar coin has a bimetallic design with a polar bear on its outer ring, replacing the two-dollar bill.|Introducida en 1996 y apodada 'toonie', la moneda de dos dólares tiene un diseño bimetálico con un oso polar en el anillo exterior, y reemplazó al billete de dos dólares.|Introduite en 1996 et surnommée « toonie », la pièce de deux dollars a un design bimétallique avec un ours polaire sur l'anneau extérieur, remplaçant le billet de deux dollars.|1996年に導入され「トゥーニー」と呼ばれるこの2ドル硬貨は、外周にホッキョクグマを描いた二色構造で、2ドル紙幣に取って代わった。",
  ),
  q(
    6,
    "In what year was VIA Rail founded as Canada's national passenger rail operator?|¿En qué año se fundó VIA Rail como operador ferroviario nacional de pasajeros de Canadá?|En quelle année VIA Rail a-t-elle été fondée comme opérateur ferroviaire national de passagers du Canada ?|VIA鉄道がカナダの国営旅客鉄道会社として設立されたのは何年か?",
    [
      "1952|1952|1952|1952年",
      "2001|2001|2001|2001年",
      "1978|1978|1978|1978年",
    ],
    2,
    "VIA Rail was created to take over passenger service from the country's two freight-focused railways, Canadian National and Canadian Pacific, which had been running trains at a growing loss.|VIA Rail se creó para hacerse cargo del servicio de pasajeros de los dos ferrocarriles de carga del país, Canadian National y Canadian Pacific, que operaban trenes con pérdidas crecientes.|VIA Rail fut créée pour reprendre le service voyageurs des deux compagnies ferroviaires de fret du pays, le Canadien National et le Canadien Pacifique, qui exploitaient des trains à perte croissante.|VIA鉄道は、貨物輸送を主とする国内二大鉄道会社カナディアン・ナショナルとカナダ太平洋鉄道が、赤字を膨らませながら運行していた旅客サービスを引き継ぐために設立された。",
  ),
  q(
    6,
    "The 'Group of Seven' is best known in Canada as a group of what?|En Canadá, el 'Grupo de los Siete' es conocido sobre todo como un grupo de qué?|Au Canada, le « Groupe des Sept » est surtout connu comme un groupe de quoi ?|カナダで「グループ・オブ・セブン」といえば何の集団として知られるか?",
    [
      "Landscape painters|Pintores paisajistas|Peintres paysagistes|風景画家",
      "Prime ministers|Primeros ministros|Premiers ministres|歴代首相",
      "Folk musicians|Músicos folclóricos|Musiciens folk|フォーク音楽家",
    ],
    0,
    "Active mainly in the 1920s, these painters built a national style around bold, simplified depictions of the northern wilderness, though the name is more commonly linked internationally to a group of industrial nations.|Activos sobre todo en los años veinte, estos pintores forjaron un estilo nacional con representaciones audaces y simplificadas de la naturaleza salvaje del norte, aunque el nombre suele asociarse internacionalmente a un grupo de naciones industrializadas.|Actifs surtout dans les années 1920, ces peintres ont forgé un style national fait de représentations audacieuses et simplifiées de la nature sauvage du nord, bien que le nom soit plus souvent associé à l'international à un groupe de nations industrialisées.|主に1920年代に活動したこの画家たちは、北方の原野を大胆かつ単純化して描く国民的な様式を築いた。もっともこの名は国際的には工業国の集まりを指す言葉としてのほうがよく知られている。",
  ),
  q(
    6,
    "What is Canada's Latin motto, adopted in 1921?|¿Cuál es el lema latino de Canadá, adoptado en 1921?|Quelle est la devise latine du Canada, adoptée en 1921 ?|1921年に採用されたカナダのラテン語の標語は?",
    [
      "\"E Pluribus Unum\" (Out of Many, One)|«E Pluribus Unum» (De muchos, uno)|« E Pluribus Unum » (De plusieurs, un seul)|「多数から一つへ」(E Pluribus Unum)",
      "\"A Mari Usque Ad Mare\" (From Sea to Sea)|«A Mari Usque Ad Mare» (De mar a mar)|« A Mari Usque Ad Mare » (D'un océan à l'autre)|「海から海へ」(A Mari Usque Ad Mare)",
      "\"Dieu et Mon Droit\" (God and My Right)|«Dieu et Mon Droit» (Dios y mi derecho)|« Dieu et Mon Droit »|「神と我が権利」(Dieu et Mon Droit)",
    ],
    1,
    "Taken from a line in Psalm 72, the motto was chosen to reflect a country stretching between the Atlantic and Pacific — a third ocean, the Arctic, was added to the idea only later in popular use.|Tomado de un versículo del Salmo 72, el lema se eligió para reflejar un país que se extiende entre el Atlántico y el Pacífico; un tercer océano, el Ártico, se sumó a la idea solo después en el uso popular.|Tirée d'un verset du psaume 72, la devise fut choisie pour refléter un pays s'étendant de l'Atlantique au Pacifique ; un troisième océan, l'Arctique, ne s'est ajouté à l'idée que plus tard dans l'usage populaire.|詩篇72篇の一節から取られたこの標語は、大西洋と太平洋のあいだに広がる国を表すために選ばれた。三つ目の海である北極海は、後になって俗に付け加えられたものである。",
  ),
  q(
    7,
    "How many time zones does Canada span?|¿Cuántos husos horarios abarca Canadá?|Combien de fuseaux horaires le Canada couvre-t-il ?|カナダはいくつのタイムゾーンにまたがるか?",
    [
      "Four|Cuatro|Quatre|4つ",
      "Eight|Ocho|Huit|8つ",
      "Six|Seis|Six|6つ",
    ],
    2,
    "From Newfoundland's own half-hour-offset time zone in the east to the Pacific zone in the west, a phone call across the country can cross a gap of up to four and a half hours.|Desde el huso horario propio de Terranova, con media hora de diferencia en el este, hasta el huso del Pacífico en el oeste, una llamada a través del país puede cruzar una diferencia de hasta cuatro horas y media.|Du fuseau horaire propre à Terre-Neuve, décalé d'une demi-heure à l'est, au fuseau du Pacifique à l'ouest, un appel téléphonique à travers le pays peut franchir un écart allant jusqu'à quatre heures et demie.|東のニューファンドランド独自の30分ずれたタイムゾーンから西の太平洋タイムゾーンまで、国内での電話は最大4時間半の時差をまたぐことがある。",
  ),
  q(
    7,
    "In what year did most Canadian women win the right to vote in federal elections?|¿En qué año la mayoría de las mujeres canadienses obtuvo el derecho a votar en elecciones federales?|En quelle année la plupart des femmes canadiennes ont-elles obtenu le droit de vote aux élections fédérales ?|大半のカナダ人女性が連邦選挙の投票権を得たのは何年か?",
    [
      "1918|1918|1918|1918年",
      "1940|1940|1940|1940年",
      "1960|1960|1960|1960年",
    ],
    0,
    "The 1918 law still excluded most Indigenous women (and men), whose federal voting rights were not fully and unconditionally secured until 1960.|La ley de 1918 aún excluía a la mayoría de las mujeres (y hombres) indígenas, cuyo derecho al voto federal no quedó plena e incondicionalmente asegurado hasta 1960.|La loi de 1918 excluait encore la plupart des femmes (et des hommes) autochtones, dont le droit de vote fédéral ne fut pleinement et inconditionnellement garanti qu'en 1960.|1918年のこの法律は、先住民の女性(および男性)の大半をなお除外しており、彼らの連邦選挙権が完全かつ無条件に保障されたのは1960年になってからだった。",
  ),
  q(
    7,
    "The Underground Railroad before the American Civil War was a network aimed at reaching what?|Antes de la Guerra Civil estadounidense, ¿a qué apuntaba la red del Ferrocarril Subterráneo?|Avant la guerre de Sécession, le réseau du chemin de fer clandestin visait à atteindre quoi ?|米国南北戦争前の「地下鉄道」網が目指した先は?",
    [
      "A neutral trading port|Un puerto comercial neutral|Un port commercial neutre|中立の貿易港",
      "A country that had abolished slavery|Un país que había abolido la esclavitud|Un pays ayant aboli l'esclavage|奴隷制を廃止した国",
      "A gold-mining boomtown|Un pueblo minero del oro en auge|Une ville minière de l'or en plein essor|金鉱ブームの町",
    ],
    1,
    "Britain abolished slavery across its empire in 1834, and thousands of freedom seekers crossed the border into Canada in the decades that followed, forming communities that still exist today.|Gran Bretaña abolió la esclavitud en todo su imperio en 1834, y miles de personas que buscaban la libertad cruzaron la frontera hacia Canadá en las décadas siguientes, formando comunidades que aún existen hoy.|La Grande-Bretagne abolit l'esclavage dans tout son empire en 1834, et des milliers de personnes en quête de liberté traversèrent la frontière vers le Canada dans les décennies qui suivirent, formant des communautés qui existent encore aujourd'hui.|英国は1834年に帝国全域で奴隷制を廃止し、その後の数十年間で数千人の自由を求める人々が国境を越えてカナダへ渡った。彼らが築いた共同体は今日もなお存在している。",
  ),
  q(
    7,
    "Cape Breton's traditional fiddle music descends most directly from which tradition?|La música tradicional de violín de Cabo Bretón desciende sobre todo de qué tradición?|La musique traditionnelle de violon du Cap-Breton descend surtout de quelle tradition ?|ケープブレトンの伝統的なフィドル音楽が最も直接受け継ぐ伝統は?",
    [
      "Andalusian flamenco|Flamenco andaluz|Le flamenco andalou|アンダルシアのフラメンコ",
      "Cajun|Cajún|Cadien|ケイジャン",
      "Scottish Gaelic|Gaélico escocés|Le gaélique écossais|スコットランド・ゲール",
    ],
    2,
    "Highland Scots who settled Cape Breton Island in large numbers, especially after the Highland Clearances, kept a fiddle style and Gaelic song tradition that has survived here more strongly than in much of Scotland itself.|Los escoceses de las Highlands que se asentaron en gran número en la isla de Cabo Bretón, sobre todo tras los Highland Clearances, conservaron un estilo de violín y una tradición de canto gaélico que ha sobrevivido aquí con más fuerza que en buena parte de la propia Escocia.|Les Écossais des Highlands venus s'installer en grand nombre à l'île du Cap-Breton, surtout après les Highland Clearances, ont conservé un style de violon et une tradition de chant gaélique qui a mieux survécu ici que dans une bonne partie de l'Écosse elle-même.|ハイランド・クリアランス後を中心に大勢移住してきたスコットランド高地の人々は、ケープブレトン島にフィドルの様式とゲール語の歌の伝統を残した。それは本国スコットランドの多くの地域よりも、むしろこの島で強く生き続けている。",
  ),
  q(
    8,
    "What is the Inuit game of vocal, throat-based singing usually performed by two people facing each other called?|¿Cómo se llama el juego vocal y gutural inuit, interpretado normalmente por dos personas cara a cara?|Comment s'appelle le jeu vocal guttural inuit, exécuté généralement par deux personnes face à face ?|向き合った二人で行う、喉を使ったイヌイットの声の遊びの名は?",
    [
      "Katajjaq|Katajjaq|Le katajjaq|カタジャク",
      "Powwow|Powwow|Le powwow|パウワウ",
      "Reel|Reel|Le reel|リール",
    ],
    0,
    "Traditionally performed by two women standing close together, one leading and one echoing, the game continues until one singer runs out of breath or laughs; it was long dismissed by outsiders as entertainment for men returning from the hunt, though it is a competitive, skilled tradition in its own right.|Interpretado tradicionalmente por dos mujeres muy juntas, una guiando y otra haciendo eco, el juego continúa hasta que una cantante se queda sin aliento o se ríe; durante mucho tiempo los foráneos lo tomaron por simple entretenimiento para los hombres que volvían de cazar, aunque es una tradición competitiva y de gran destreza por derecho propio.|Traditionnellement exécuté par deux femmes debout tout près l'une de l'autre, l'une menant et l'autre faisant écho, le jeu continue jusqu'à ce que l'une des chanteuses manque de souffle ou rie ; longtemps pris par les étrangers pour un simple divertissement destiné aux hommes revenant de la chasse, c'est en réalité une tradition compétitive et exigeante en elle-même.|伝統的には二人の女性がぴったりと向き合って立ち、一人が導き一人がそれをこだまのように返す形で行われ、どちらかが息切れするか笑ってしまうまで続く。外部の者からは長らく、狩りから戻った男たちのための余興程度に見なされてきたが、実際には高度な技術を競う独自の伝統である。",
  ),
  q(
    8,
    "What is the gilded statue atop the Manitoba Legislative Building in Winnipeg commonly called?|¿Cómo se llama comúnmente la estatua dorada sobre el edificio de la Legislatura de Manitoba en Winnipeg?|Comment appelle-t-on communément la statue dorée au sommet de l'édifice législatif du Manitoba, à Winnipeg ?|ウィニペグのマニトバ州議事堂の頂上にある金色の像は通称何と呼ばれるか?",
    [
      "The Sky Watcher|El Vigía del Cielo|Le Veilleur du ciel|空の見張り",
      "The Golden Boy|El Chico Dorado|Le Golden Boy|ゴールデン・ボーイ",
      "The Prairie Angel|El Ángel de la Pradera|L'Ange des Prairies|プレーリーの天使",
    ],
    1,
    "Cast in France and installed in 1919, the bronze youth carries a sheaf of wheat under one arm and a torch in the other, meant to represent the province's enterprise and agricultural wealth.|Fundida en Francia e instalada en 1919, la figura de bronce de un joven lleva un manojo de trigo bajo un brazo y una antorcha en el otro, para representar la empresa y la riqueza agrícola de la provincia.|Coulée en France et installée en 1919, la statue de bronze représentant un jeune homme porte une gerbe de blé sous un bras et une torche dans l'autre, censée représenter l'esprit d'entreprise et la richesse agricole de la province.|フランスで鋳造され1919年に据えられたこの青年のブロンズ像は、片腕に麦の束を、もう片方に松明を掲げており、州の企業精神と農業の豊かさを表すとされる。",
  ),
  q(
    8,
    "What is the name of the robotic arm Canada contributed to the International Space Station programme?|¿Cómo se llama el brazo robótico que Canadá aportó al programa de la Estación Espacial Internacional?|Comment s'appelle le bras robotique que le Canada a fourni au programme de la Station spatiale internationale ?|カナダが国際宇宙ステーション計画に提供したロボットアームの名は?",
    [
      "Maple Reach|Maple Reach|Maple Reach|メープル・リーチ",
      "Northstar|Northstar|Northstar|ノーススター",
      "Canadarm2|Canadarm2|Canadarm2|カナダーム2",
    ],
    2,
    "Canadarm2 was installed in 2001 and can 'walk' end over end across the station's exterior, an evolution of the original Canadarm that flew on the Space Shuttle from 1981.|El Canadarm2 se instaló en 2001 y puede 'caminar' de extremo a extremo por el exterior de la estación, una evolución del Canadarm original que voló en el Transbordador Espacial desde 1981.|Le Canadarm2 fut installé en 2001 et peut « marcher » d'un bout à l'autre de l'extérieur de la station, une évolution du Canadarm original qui vola à bord de la navette spatiale à partir de 1981.|カナダーム2は2001年に設置され、ステーションの外壁を端から端へ「歩く」ように移動できる。1981年からスペースシャトルに搭載されていた初代カナダームの発展形である。",
  ),
  q(
    9,
    "Who led the Red River Resistance and the North-West Rebellion against the Canadian government?|¿Quién lideró la Resistencia del Río Rojo y la Rebelión del Noroeste contra el gobierno canadiense?|Qui a dirigé la résistance de la rivière Rouge et la rébellion du Nord-Ouest contre le gouvernement canadien ?|レッド川の抵抗運動と北西反乱を主導した人物は?",
    [
      "Louis Riel|Louis Riel|Louis Riel|ルイ・リエル",
      "William Lyon Mackenzie|William Lyon Mackenzie|William Lyon Mackenzie|ウィリアム・ライアン・マッケンジー",
      "Joseph Brant|Joseph Brant|Joseph Brant|ジョセフ・ブラント",
    ],
    0,
    "A Métis political leader, Riel helped found the province of Manitoba in 1870 but was executed for treason in 1885 after the second uprising failed, and he remains one of the most debated figures in Canadian history.|Líder político métis, Riel ayudó a fundar la provincia de Manitoba en 1870, pero fue ejecutado por traición en 1885 tras el fracaso del segundo levantamiento, y sigue siendo una de las figuras más debatidas de la historia canadiense.|Chef politique métis, Riel contribua à fonder la province du Manitoba en 1870, mais fut exécuté pour trahison en 1885 après l'échec du second soulèvement, et demeure l'une des figures les plus débattues de l'histoire canadienne.|メティスの政治指導者リエルは1870年にマニトバ州の成立に貢献したが、1885年、二度目の蜂起の失敗後に反逆罪で処刑された。彼はいまもカナダ史上最も議論を呼ぶ人物の一人である。",
  ),
  q(
    9,
    "What is the name given to the October 1970 crisis in which the federal government invoked the War Measures Act?|¿Cómo se llama la crisis de octubre de 1970 en la que el gobierno federal invocó la Ley de Medidas de Guerra?|Comment appelle-t-on la crise d'octobre 1970 durant laquelle le gouvernement fédéral a invoqué la Loi sur les mesures de guerre ?|連邦政府が戦時措置法を発動した1970年10月の危機は何と呼ばれるか?",
    [
      "The Winter War|La Guerra de Invierno|La guerre d'Hiver|冬戦争",
      "The October Crisis|La Crisis de Octubre|La crise d'Octobre|十月危機",
      "The Quiet Revolution|La Revolución Tranquila|La Révolution tranquille|静かな革命",
    ],
    1,
    "The crisis followed the kidnapping of a British diplomat and a Quebec cabinet minister by a militant separatist cell, and remains the only time the act's peacetime powers have been used in Canadian history.|La crisis siguió al secuestro de un diplomático británico y un ministro del gabinete de Quebec por una célula separatista militante, y sigue siendo la única vez que se han usado en tiempo de paz los poderes de esa ley en la historia de Canadá.|La crise suivit l'enlèvement d'un diplomate britannique et d'un ministre du cabinet québécois par une cellule séparatiste militante, et reste la seule fois où les pouvoirs de cette loi ont été utilisés en temps de paix dans l'histoire du Canada.|この危機は、過激な分離主義組織による英国外交官とケベック州閣僚の誘拐に端を発した。カナダ史上、この法律の平時における権限が発動されたのはこの一度きりである。",
  ),
  q(
    9,
    "In what year was Canada's constitution formally 'patriated' from the United Kingdom?|¿En qué año se 'repatrió' formalmente la constitución de Canadá desde el Reino Unido?|En quelle année la constitution du Canada a-t-elle été formellement « rapatriée » du Royaume-Uni ?|カナダ憲法が英国から正式に「本国送還」されたのは何年か?",
    [
      "1931|1931|1931|1931年",
      "1867|1867|1867|1867年",
      "1982|1982|1982|1982年",
    ],
    2,
    "Patriation gave Canada full authority to amend its own constitution without requiring an act of the British Parliament, and was accompanied by the new Canadian Charter of Rights and Freedoms.|La repatriación dio a Canadá plena autoridad para enmendar su propia constitución sin necesitar una ley del Parlamento británico, y fue acompañada de la nueva Carta Canadiense de Derechos y Libertades.|Le rapatriement donna au Canada pleine autorité pour modifier sa propre constitution sans nécessiter une loi du Parlement britannique, et s'accompagna de la nouvelle Charte canadienne des droits et libertés.|この「本国送還」により、カナダは英国議会の法律を必要とせず自国の憲法を改正する完全な権限を得た。同時に新たなカナダ権利自由憲章も制定された。",
  ),
  q(
    9,
    "Lucy Maud Montgomery, the author of Anne of Green Gables, set her novel on which island?|¿En qué isla ambientó Lucy Maud Montgomery, autora de Ana de las Tejas Verdes, su novela?|Sur quelle île Lucy Maud Montgomery, autrice d'Anne... la maison aux pignons verts, a-t-elle situé son roman ?|『赤毛のアン』の作者ルーシー・モード・モンゴメリが物語の舞台にした島は?",
    [
      "Prince Edward Island|Isla del Príncipe Eduardo|L'Île-du-Prince-Édouard|プリンスエドワード島",
      "Vancouver Island|Isla de Vancouver|L'île de Vancouver|バンクーバー島",
      "Cape Breton Island|Isla de Cabo Bretón|L'île du Cap-Breton|ケープブレトン島",
    ],
    0,
    "Published in 1908 and drawing on Montgomery's own childhood on the island, the novel has been translated into dozens of languages and remains especially popular in Japan, where it has long been part of the school curriculum.|Publicada en 1908 y basada en la propia infancia de Montgomery en la isla, la novela se ha traducido a decenas de idiomas y sigue siendo especialmente popular en Japón, donde ha formado parte del currículo escolar durante mucho tiempo.|Publié en 1908 et inspiré de l'enfance de Montgomery sur l'île, le roman a été traduit en des dizaines de langues et reste particulièrement populaire au Japon, où il fait partie du programme scolaire depuis longtemps.|1908年に出版されたこの小説は、モンゴメリ自身の島での幼少期に着想を得ており、数十の言語に翻訳されている。とりわけ日本では長らく学校教材にも使われるほどの人気を保っている。",
  ),
  q(
    10,
    "In what year was Nunavut created as Canada's newest territory?|¿En qué año se creó Nunavut como el territorio más nuevo de Canadá?|En quelle année le Nunavut a-t-il été créé comme plus récent territoire du Canada ?|カナダ最新の準州ヌナブトが作られたのは何年か?",
    [
      "1971|1971|1971|1971年",
      "1999|1999|1999|1999年",
      "2008|2008|2008|2008年",
    ],
    1,
    "Carved out of the eastern part of the Northwest Territories after decades of negotiation with Inuit organizations, Nunavut's name means 'our land' in Inuktitut, and Inuit make up the large majority of its population.|Formado a partir de la parte oriental de los Territorios del Noroeste tras décadas de negociación con organizaciones inuit, el nombre de Nunavut significa 'nuestra tierra' en inuktitut, y los inuit constituyen la gran mayoría de su población.|Détaché de la partie orientale des Territoires du Nord-Ouest après des décennies de négociations avec des organisations inuites, le nom Nunavut signifie « notre terre » en inuktitut, et les Inuits forment la grande majorité de sa population.|数十年にわたるイヌイット諸団体との交渉を経て、ノースウエスト準州の東部から分離して作られたヌナブトの名は、イヌクティトゥット語で「我らの土地」を意味する。人口の大半をイヌイットが占める。",
  ),
  q(
    10,
    "Between 1871 and 1921, how many 'Numbered Treaties' did the Canadian government sign with First Nations across the Prairies and the North?|Entre 1871 y 1921, ¿cuántos 'Tratados Numerados' firmó el gobierno canadiense con las Primeras Naciones de las praderas y el norte?|Entre 1871 et 1921, combien de « traités numérotés » le gouvernement canadien a-t-il signés avec les Premières Nations des Prairies et du Nord ?|1871年から1921年にかけて、カナダ政府がプレーリーと北方の先住民と結んだ「番号付き条約」はいくつか?",
    [
      "Five|Cinco|Cinq|5",
      "Twenty|Veinte|Vingt|20",
      "Eleven|Once|Onze|11",
    ],
    2,
    "Treaties 1 through 11 covered vast stretches of land in exchange for reserves, annual payments and promised rights, but their interpretation — especially over land and resource rights — remains contested and the subject of ongoing court cases.|Los Tratados 1 a 11 abarcaron enormes extensiones de tierra a cambio de reservas, pagos anuales y derechos prometidos, pero su interpretación —sobre todo en materia de tierras y recursos— sigue siendo disputada y objeto de litigios en curso.|Les traités 1 à 11 couvraient de vastes étendues de terre en échange de réserves, de versements annuels et de droits promis, mais leur interprétation — notamment sur les droits fonciers et les ressources — reste contestée et fait l'objet de litiges en cours.|条約1号から11号は、居留地・年次支払い・約束された諸権利と引き換えに広大な土地を対象とした。しかしその解釈――とりわけ土地と資源の権利をめぐって――はいまも争われ、訴訟が続いている。",
  ),
];
