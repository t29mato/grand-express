/**
 * ガーナのクイズ(38問)。
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
 * 37都市のカードが扱う具体的な事実(エルミナ・ケープコーストの「帰らざる扉」の
 * 物語、クマシの黄金の腰掛けの伝承、ボンウィレ・ントンソの職人技、
 * アコソンボ・ダムの住民移住など)はここでは繰り返さない。代わりに、
 * 国全体の地理・独立史・通貨・スポーツ・食文化・音楽など、
 * **都市カードが個別には触れていない主題**を選んである。
 * クマシ・ケープコーストなど同じ町が再び出てくる設問もあるが、
 * カードとは別の事実(1874年の英・アシャンティ戦争、PANAFESTなど)を問うている。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数(13/13/12)になるよう
 * 機械的に散らしてある。
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

export const GHANA_QUIZ = [
  q(
    1,
    "What is the capital of Ghana?|¿Cuál es la capital de Ghana?|Quelle est la capitale du Ghana ?|ガーナの首都はどこか?",
    ["Accra|Acra|Accra|アクラ", "Kumasi|Kumasi|Kumasi|クマシ", "Tamale|Tamale|Tamale|タマレ"],
    0,
    "Accra has been Ghana's capital since 1877, when the British moved the seat of colonial government there from Cape Coast.|Acra es la capital de Ghana desde 1877, cuando los británicos trasladaron allí la sede del gobierno colonial desde Cape Coast.|Accra est la capitale du Ghana depuis 1877, date à laquelle les Britanniques y transférèrent le siège du gouvernement colonial depuis Cape Coast.|アクラは1877年以来ガーナの首都であり、イギリスがケープコーストから植民地政庁をここへ移した年である。",
  ),
  q(
    1,
    "What was Ghana called before independence?|¿Cómo se llamaba Ghana antes de la independencia?|Comment s'appelait le Ghana avant l'indépendance ?|独立前、ガーナは何と呼ばれていたか?",
    ["The Ivory Coast|La Costa de Marfil|La Côte d'Ivoire|アイボリーコースト(象牙海岸)", "The Gold Coast|La Costa de Oro|La Côte de l'Or|ゴールドコースト(黄金海岸)", "The Slave Coast|La Costa de los Esclavos|La Côte des Esclaves|スレイブコースト(奴隷海岸)"],
    1,
    "The name Gold Coast referred to the region's role as a major source of gold for European traders from the late fifteenth century onward, and it stuck until independence in 1957.|El nombre Costa de Oro aludía al papel de la región como gran fuente de oro para los comerciantes europeos desde finales del siglo XV, y se mantuvo hasta la independencia en 1957.|Le nom de Côte de l'Or renvoyait au rôle de la région comme importante source d'or pour les marchands européens à partir de la fin du XVe siècle, et il resta en usage jusqu'à l'indépendance en 1957.|「ゴールドコースト」の名は、15世紀末以降この地域がヨーロッパの商人にとって主要な金の産地だったことに由来し、1957年の独立まで使われ続けた。",
  ),
  q(
    1,
    "Which ocean lies along Ghana's southern coast?|¿Qué océano bordea la costa sur de Ghana?|Quel océan borde la côte sud du Ghana ?|ガーナの南岸に接する海はどれか?",
    ["The Indian Ocean|El océano Índico|L'océan Indien|インド洋", "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋"],
    2,
    "The Gulf of Guinea, an arm of the Atlantic Ocean, runs along Ghana's entire southern coastline.|El golfo de Guinea, un brazo del océano Atlántico, recorre toda la costa sur de Ghana.|Le golfe de Guinée, un bras de l'océan Atlantique, longe toute la côte sud du Ghana.|大西洋の一部であるギニア湾は、ガーナの南岸全体に沿って広がっている。",
  ),
  q(
    1,
    "What is Ghana's official language?|¿Cuál es el idioma oficial de Ghana?|Quelle est la langue officielle du Ghana ?|ガーナの公用語は?",
    ["English|Inglés|Anglais|英語", "French|Francés|Français|フランス語", "Portuguese|Portugués|Portugais|ポルトガル語"],
    0,
    "English became Ghana's official language under British colonial rule and remains the language of government, schooling and most media, alongside dozens of local languages spoken at home.|El inglés se convirtió en idioma oficial de Ghana bajo el dominio colonial británico y sigue siendo la lengua del gobierno, la educación y la mayoría de los medios, junto a docenas de lenguas locales habladas en casa.|L'anglais est devenu la langue officielle du Ghana sous la domination coloniale britannique et reste la langue du gouvernement, de l'école et de la plupart des médias, aux côtés de dizaines de langues locales parlées à la maison.|英語はイギリス植民地統治下でガーナの公用語となり、いまも政府・学校・大半のメディアの言語であり続けている。家庭では何十もの現地語も話されている。",
  ),
  q(
    2,
    "Besides the black star, what colours are on Ghana's flag?|Además de la estrella negra, ¿qué colores tiene la bandera de Ghana?|Hormis l'étoile noire, quelles couleurs porte le drapeau du Ghana ?|黒い星のほか、ガーナ国旗にある色は?",
    ["Blue, white and red|Azul, blanco y rojo|Bleu, blanc et rouge|青・白・赤", "Red, gold and green|Rojo, dorado y verde|Rouge, or et vert|赤・金・緑", "Green, white and orange|Verde, blanco y naranja|Vert, blanc et orange|緑・白・オレンジ"],
    1,
    "Ghana's flag was adopted in 1957, and its red, gold and green bands were later copied by several other African countries that gained independence in the years that followed.|La bandera de Ghana se adoptó en 1957, y sus franjas roja, dorada y verde fueron copiadas después por otros países africanos que lograron la independencia en los años siguientes.|Le drapeau du Ghana fut adopté en 1957, et ses bandes rouge, or et vert furent ensuite reprises par plusieurs autres pays africains devenus indépendants dans les années qui suivirent.|ガーナ国旗は1957年に制定され、その赤・金・緑の帯は、その後の年に独立した他のいくつものアフリカ諸国にも取り入れられた。",
  ),
  q(
    2,
    "What is Ghana's currency called?|¿Cómo se llama la moneda de Ghana?|Comment s'appelle la monnaie du Ghana ?|ガーナの通貨の名前は?",
    ["The naira|El naira|Le naira|ナイラ", "The franc|El franco|Le franc|フラン", "The cedi|El cedi|Le cedi|セディ"],
    2,
    "The cedi takes its name from the Akan word for cowrie shell, an older form of currency once used across the region.|El cedi toma su nombre de la palabra akan para el cauri, una forma de moneda más antigua usada antaño en la región.|Le cedi tire son nom du mot akan désignant le cauri, une forme de monnaie plus ancienne autrefois utilisée dans la région.|セディという名は、かつてこの地域で通貨として使われていた子安貝を意味するアカン語に由来する。",
  ),
  q(
    2,
    "Which continent is Ghana part of?|¿A qué continente pertenece Ghana?|De quel continent le Ghana fait-il partie ?|ガーナが属する大陸は?",
    ["Africa|África|Afrique|アフリカ", "Asia|Asia|Asie|アジア", "South America|Sudamérica|Amérique du Sud|南アメリカ"],
    0,
    "Ghana sits on the Gulf of Guinea in West Africa, almost exactly where the prime meridian meets the equator, although that intersection point itself lies out at sea.|Ghana se sitúa en el golfo de Guinea, en África Occidental, casi exactamente donde el meridiano de Greenwich se cruza con el ecuador, aunque ese punto de intersección en sí está en el mar.|Le Ghana se trouve sur le golfe de Guinée, en Afrique de l'Ouest, presque exactement là où le méridien de Greenwich croise l'équateur, bien que ce point d'intersection se trouve lui-même en mer.|ガーナは西アフリカのギニア湾岸に位置し、本初子午線と赤道が交わる地点のほぼ真上にあるが、その交点自体は海上にある。",
  ),
  q(
    2,
    "Ghana usually ranks among the world's largest producers of which crop?|¿De qué cultivo suele ser Ghana uno de los mayores productores del mundo?|De quelle culture le Ghana est-il généralement l'un des plus grands producteurs mondiaux ?|ガーナが世界有数の生産国とされる作物は?",
    ["Coffee|Café|Café|コーヒー", "Cocoa|Cacao|Cacao|カカオ", "Tea|Té|Thé|茶"],
    1,
    "Ghana usually ranks as the world's second-largest cocoa producer, after neighbouring Ivory Coast.|Ghana suele ocupar el segundo puesto mundial como productor de cacao, tras la vecina Costa de Marfil.|Le Ghana se classe généralement deuxième producteur mondial de cacao, derrière la Côte d'Ivoire voisine.|ガーナは例年、隣国コートジボワールに次いで世界第2位のカカオ生産国となっている。",
  ),
  q(
    3,
    "In what year did Ghana become independent?|¿En qué año se independizó Ghana?|En quelle année le Ghana est-il devenu indépendant ?|ガーナが独立した年は?",
    ["1947|1947|1947|1947年", "1967|1967|1967|1967年", "1957|1957|1957|1957年"],
    2,
    "Ghana's independence was declared on 6 March 1957, ending British colonial rule over the Gold Coast.|La independencia de Ghana se declaró el 6 de marzo de 1957, poniendo fin al dominio colonial británico sobre la Costa de Oro.|L'indépendance du Ghana fut proclamée le 6 mars 1957, mettant fin à la domination coloniale britannique sur la Côte de l'Or.|ガーナの独立は1957年3月6日に宣言され、イギリスによるゴールドコースト植民地統治が終わった。",
  ),
  q(
    3,
    "What made Ghana's 1957 independence a milestone for the whole continent?|¿Por qué la independencia de Ghana en 1957 fue un hito para todo el continente?|Pourquoi l'indépendance du Ghana en 1957 fut-elle une étape majeure pour tout le continent ?|1957年のガーナ独立が大陸全体にとって画期的だった理由は?",
    ["It was the first sub-Saharan colony to gain independence from colonial rule|Fue la primera colonia subsahariana en lograr la independencia del dominio colonial|Ce fut la première colonie subsaharienne à obtenir son indépendance de la tutelle coloniale|サハラ以南で最初に植民地支配から独立した国だった", "It was the first African country to host the Olympic Games|Fue el primer país africano en albergar los Juegos Olímpicos|Ce fut le premier pays africain à accueillir les Jeux olympiques|アフリカで初めてオリンピックを開催した国だった", "It was the first African country to launch a satellite|Fue el primer país africano en lanzar un satélite|Ce fut le premier pays africain à lancer un satellite|アフリカで初めて人工衛星を打ち上げた国だった"],
    0,
    "No other sub-Saharan African colony had yet won independence from European rule when Ghana did in 1957, making it a model closely watched by independence movements elsewhere on the continent.|Ninguna otra colonia africana subsahariana se había independizado aún del dominio europeo cuando Ghana lo hizo en 1957, lo que la convirtió en un modelo seguido de cerca por los movimientos independentistas del resto del continente.|Aucune autre colonie subsaharienne n'avait encore obtenu son indépendance du pouvoir européen quand le Ghana le fit en 1957, faisant de lui un modèle suivi de près par les mouvements indépendantistes ailleurs sur le continent.|1957年にガーナが独立した時点で、サハラ以南のほかのどの植民地もヨーロッパの支配から独立していなかった。そのためガーナは、大陸各地の独立運動が注視する手本となった。",
  ),
  q(
    3,
    "What is Ghana's national football team nicknamed?|¿Cómo se apoda la selección nacional de fútbol de Ghana?|Quel est le surnom de l'équipe nationale de football du Ghana ?|ガーナのサッカー代表チームの愛称は?",
    ["The Eagles|Las Águilas|Les Aigles|イーグルス", "The Black Stars|Las Estrellas Negras|Les Étoiles Noires|ブラックスターズ", "The Lions|Los Leones|Les Lions|ライオンズ"],
    1,
    "The Black Stars take their name from the black star on Ghana's flag, itself inspired by Marcus Garvey's Black Star Line shipping company.|Las Estrellas Negras toman su nombre de la estrella negra de la bandera de Ghana, inspirada a su vez en la naviera Black Star Line de Marcus Garvey.|Les Étoiles Noires tirent leur nom de l'étoile noire du drapeau ghanéen, elle-même inspirée de la compagnie maritime Black Star Line de Marcus Garvey.|「ブラックスターズ」の名は、マーカス・ガーヴィーの海運会社ブラック・スター・ラインに着想を得たガーナ国旗の黒い星に由来する。",
  ),
  q(
    3,
    "Which sport draws by far the largest following in Ghana?|¿Qué deporte tiene, con diferencia, más seguidores en Ghana?|Quel sport rassemble de loin le plus grand nombre de supporters au Ghana ?|ガーナで群を抜いて人気の高いスポーツは?",
    ["Cricket|Críquet|Cricket|クリケット", "Rugby|Rugby|Rugby|ラグビー", "Football|Fútbol|Football|サッカー"],
    2,
    "Football draws by far the largest crowds and media attention of any sport in Ghana, with the Black Stars among the most successful national teams in African tournament history.|El fútbol atrae, con diferencia, al mayor público y atención mediática de cualquier deporte en Ghana, y las Estrellas Negras figuran entre las selecciones más exitosas de la historia de los torneos africanos.|Le football attire de loin le plus grand public et la plus grande attention médiatique de tous les sports au Ghana, les Étoiles Noires comptant parmi les équipes nationales les plus titrées de l'histoire des tournois africains.|サッカーはガーナのどのスポーツよりも群を抜いて観客とメディアの注目を集め、ブラックスターズはアフリカの大会史上でも屈指の成功を収めた代表チームの一つである。",
  ),
  q(
    4,
    "Who was Ghana's first president?|¿Quién fue el primer presidente de Ghana?|Qui fut le premier président du Ghana ?|ガーナの初代大統領は誰か?",
    ["Kwame Nkrumah|Kwame Nkrumah|Kwame Nkrumah|クワメ・ンクルマ", "Jerry Rawlings|Jerry Rawlings|Jerry Rawlings|ジェリー・ローリングス", "Kofi Annan|Kofi Annan|Kofi Annan|コフィ・アナン"],
    0,
    "Kwame Nkrumah led Ghana from independence in 1957 until a military coup removed him from power in 1966.|Kwame Nkrumah gobernó Ghana desde la independencia en 1957 hasta que un golpe militar lo depuso en 1966.|Kwame Nkrumah dirigea le Ghana de l'indépendance en 1957 jusqu'à ce qu'un coup d'État militaire le renverse en 1966.|クワメ・ンクルマは1957年の独立から1966年に軍事クーデターで失脚するまでガーナを率いた。",
  ),
  q(
    4,
    "Which country borders Ghana to the east?|¿Qué país limita con Ghana por el este?|Quel pays borde le Ghana à l'est ?|ガーナの東に隣接する国は?",
    ["Benin|Benín|Bénin|ベナン", "Togo|Togo|Togo|トーゴ", "Nigeria|Nigeria|Nigeria|ナイジェリア"],
    1,
    "Togo, a former German and later French colony, borders Ghana along its entire eastern edge.|Togo, antigua colonia alemana y luego francesa, limita con Ghana a lo largo de todo su flanco oriental.|Le Togo, ancienne colonie allemande puis française, borde le Ghana sur toute sa frontière orientale.|かつてドイツ、のちにフランスの植民地だったトーゴは、ガーナの東縁全体に接している。",
  ),
  q(
    4,
    "Which country borders Ghana to the west?|¿Qué país limita con Ghana por el oeste?|Quel pays borde le Ghana à l'ouest ?|ガーナの西に隣接する国は?",
    ["Senegal|Senegal|Sénégal|セネガル", "Guinea|Guinea|Guinée|ギニア", "Ivory Coast|Costa de Marfil|Côte d'Ivoire|コートジボワール"],
    2,
    "Ivory Coast, a former French colony, borders Ghana along its western edge and is, like Ghana, one of the world's two largest cocoa producers.|Costa de Marfil, antigua colonia francesa, limita con Ghana por el oeste y es, como Ghana, uno de los dos mayores productores de cacao del mundo.|La Côte d'Ivoire, ancienne colonie française, borde le Ghana à l'ouest et compte, comme lui, parmi les deux plus grands producteurs mondiaux de cacao.|かつてフランスの植民地だったコートジボワールはガーナの西に接しており、ガーナと並んで世界二大カカオ生産国の一つである。",
  ),
  q(
    4,
    "The Akosombo Dam mainly generates electricity from what?|¿De qué genera electricidad principalmente la presa de Akosombo?|De quoi le barrage d'Akosombo tire-t-il principalement son électricité ?|アコソンボ・ダムが主に発電に使うものは?",
    ["Falling water|Agua en caída|L'eau qui tombe|落下する水", "Coal|Carbón|Le charbon|石炭", "Wind|Viento|Le vent|風"],
    0,
    "The Akosombo Dam generates electricity by releasing water from Lake Volta through turbines, supplying power not only to Ghana but, at times, to neighbouring countries too.|La presa de Akosombo genera electricidad liberando agua del lago Volta a través de turbinas, suministrando energía no solo a Ghana sino, a veces, también a países vecinos.|Le barrage d'Akosombo produit de l'électricité en libérant l'eau du lac Volta à travers des turbines, alimentant non seulement le Ghana mais, parfois, aussi des pays voisins.|アコソンボ・ダムはボルタ湖の水をタービンに通して発電しており、ガーナだけでなく時には近隣諸国にも電力を供給している。",
  ),
  q(
    5,
    "Which forest kingdom historically dominated much of central Ghana?|¿Qué reino forestal dominó históricamente buena parte del centro de Ghana?|Quel royaume forestier a historiquement dominé une grande partie du centre du Ghana ?|かつてガーナ中部の広い範囲を支配した森林の王国は?",
    ["The Mali Empire|El Imperio de Malí|L'Empire du Mali|マリ帝国", "The Ashanti Empire|El Imperio Ashanti|L'Empire ashanti|アシャンティ帝国", "The Songhai Empire|El Imperio Songhai|L'Empire songhaï|ソンガイ帝国"],
    1,
    "The Ashanti Empire, centred on Kumasi, grew wealthy on the gold and kola nut trade and by the eighteenth century controlled much of what is now central and southern Ghana.|El Imperio Ashanti, centrado en Kumasi, se enriqueció con el comercio del oro y la nuez de cola, y en el siglo XVIII controlaba buena parte de lo que hoy es el centro y sur de Ghana.|L'Empire ashanti, centré sur Kumasi, s'enrichit grâce au commerce de l'or et de la noix de cola et contrôlait, dès le XVIIIe siècle, une grande partie de ce qui est aujourd'hui le centre et le sud du Ghana.|クマシを中心としたアシャンティ帝国は金とコーラナッツの交易で栄え、18世紀までには現在のガーナ中部・南部の広範囲を支配していた。",
  ),
  q(
    5,
    "Kente cloth is woven in narrow strips, which are then what?|El kente se teje en tiras estrechas que luego se hace, ¿qué?|Le kente est tissé en bandes étroites qui sont ensuite quoi ?|ケンテは幅の狭い帯に織られたあと、どうされるか?",
    ["Dyed after weaving|Teñidas después de tejerlas|Teintes après le tissage|織ったあとで染められる", "Cut into small squares|Cortadas en pequeños cuadrados|Découpées en petits carrés|小さな四角に裁断される", "Sewn together into a larger cloth|Cosidas para formar una tela más grande|Cousues ensemble pour former une plus grande étoffe|縫い合わされて大きな布になる"],
    2,
    "Kente cloth is woven on narrow looms in strips only a few centimetres wide, which are later sewn edge to edge into a single large cloth.|El kente se teje en telares estrechos, en tiras de apenas unos centímetros de ancho, que luego se cosen borde con borde para formar una sola tela grande.|Le kente se tisse sur des métiers étroits en bandes larges de quelques centimètres seulement, cousues ensuite bord à bord pour former une seule grande étoffe.|ケンテはわずか数センチ幅の細い織機で帯状に織られ、あとで端どうしを縫い合わせて一枚の大きな布になる。",
  ),
  q(
    5,
    "The Volta River's watershed draws rain from as far away as which northern neighbour?|¿La cuenca del río Volta recibe lluvia incluso desde qué país vecino del norte?|Le bassin versant de la Volta reçoit des pluies venues de quel pays voisin du nord ?|ボルタ川の流域は、北のどの隣国からの雨まで集めているか?",
    ["Burkina Faso|Burkina Faso|Le Burkina Faso|ブルキナファソ", "Niger|Níger|Le Niger|ニジェール", "Chad|Chad|Le Tchad|チャド"],
    0,
    "The Volta River's watershed extends well beyond Ghana's borders, drawing rainfall from as far as Burkina Faso and Mali before it reaches Lake Volta.|La cuenca del río Volta se extiende mucho más allá de las fronteras de Ghana, recogiendo lluvia de lugares tan lejanos como Burkina Faso y Malí antes de llegar al lago Volta.|Le bassin versant de la Volta s'étend bien au-delà des frontières du Ghana, recueillant des pluies venues d'aussi loin que le Burkina Faso et le Mali avant d'atteindre le lac Volta.|ボルタ川の流域はガーナの国境をはるかに越えて広がり、ボルタ湖に達する前にブルキナファソやマリの雨まで集めている。",
  ),
  q(
    5,
    "What is a tro-tro?|¿Qué es un tro-tro?|Qu'est-ce qu'un tro-tro ?|「トロトロ」とは何か?",
    ["A traditional drum|Un tambor tradicional|Un tambour traditionnel|伝統的な太鼓", "A privately owned shared minibus|Un minibús compartido de propiedad privada|Un minibus partagé privé|個人所有の乗合ミニバス", "A ceremonial staff carried by chiefs|Un bastón ceremonial que portan los jefes|Un bâton cérémoniel porté par les chefs|首長が持つ儀礼用の杖"],
    1,
    "Tro-tros, privately owned shared minibuses, are the most common way most Ghanaians travel between towns, running informal routes rather than fixed timetables.|Los tro-tros, minibuses compartidos de propiedad privada, son la forma más común en que la mayoría de los ghaneses viajan entre pueblos, con rutas informales en vez de horarios fijos.|Les tro-tros, minibus partagés privés, sont le moyen le plus courant pour la plupart des Ghanéens de voyager entre les villes, suivant des itinéraires informels plutôt que des horaires fixes.|個人所有の乗合ミニバス「トロトロ」は、決まった時刻表ではなく非公式なルートで走り、多くのガーナ人が町から町へ移動する最も一般的な手段である。",
  ),
  q(
    6,
    "Kumasi is the traditional seat of which royal title?|¿Kumasi es la sede tradicional de qué título real?|Kumasi est le siège traditionnel de quel titre royal ?|クマシが伝統的な座所となっている王の称号は?",
    ["The Ya-Na|El Ya-Na|Le Ya-Na|ヤーナ", "The Wa Naa|El Wa Naa|Le Wa Naa|ワ・ナー", "The Asantehene|El Asantehene|L'Asantehene|アサンテヘネ"],
    2,
    "The Asantehene, seated in Kumasi, is the paramount chief of the Ashanti people and remains one of the most influential traditional rulers in Ghana today.|El Asantehene, con sede en Kumasi, es el jefe supremo del pueblo ashanti y sigue siendo uno de los gobernantes tradicionales más influyentes de Ghana hoy en día.|L'Asantehene, dont le siège est à Kumasi, est le chef suprême du peuple ashanti et reste aujourd'hui l'un des souverains traditionnels les plus influents du Ghana.|クマシに座するアサンテヘネはアシャンティ人の最高首長であり、いまもガーナで最も影響力のある伝統的支配者の一人である。",
  ),
  q(
    6,
    "In what year were Ghana's coastal forts and castles inscribed as a UNESCO World Heritage Site?|¿En qué año se inscribieron los fuertes y castillos costeros de Ghana como Patrimonio de la Humanidad de la UNESCO?|En quelle année les forts et châteaux côtiers du Ghana furent-ils inscrits au patrimoine mondial de l'UNESCO ?|ガーナの海岸の砦・城がユネスコ世界遺産に登録された年は?",
    ["1979|1979|1979|1979年", "1975|1975|1975|1975年", "1985|1985|1985|1985年"],
    0,
    "Ghana's chain of coastal forts and castles, more than thirty in total, was inscribed as a UNESCO World Heritage Site in 1979.|La cadena de fuertes y castillos costeros de Ghana, más de treinta en total, se inscribió como Patrimonio de la Humanidad de la UNESCO en 1979.|La chaîne de forts et châteaux côtiers du Ghana, plus de trente au total, fut inscrite au patrimoine mondial de l'UNESCO en 1979.|30を超えるガーナ海岸の砦・城の連なりは、1979年にユネスコ世界遺産として登録された。",
  ),
  q(
    6,
    "Besides cocoa, which butter-producing crop is a major Ghanaian export?|Además del cacao, ¿qué cultivo productor de manteca es una gran exportación de Ghana?|Outre le cacao, quelle culture productrice de beurre est une exportation majeure du Ghana ?|カカオのほかに、ガーナの主要な輸出作物であるバターの原料は?",
    ["Palm oil|Aceite de palma|L'huile de palme|パーム油", "Shea|Karité|Le karité|シア(シアバター)", "Olive|Aceituna|L'olive|オリーブ"],
    1,
    "Shea butter, pressed from the nuts of trees native to Ghana's northern savanna, is a major export used worldwide in cosmetics as well as cooking.|La manteca de karité, prensada de las nueces de árboles autóctonos de la sabana del norte de Ghana, es una gran exportación usada en todo el mundo tanto en cosmética como en cocina.|Le beurre de karité, pressé à partir des noix d'arbres originaires de la savane du nord du Ghana, est une exportation majeure utilisée dans le monde entier en cosmétique comme en cuisine.|ガーナ北部のサバンナに自生する木の実から搾られるシアバターは、世界中で化粧品にも料理にも使われる主要な輸出品である。",
  ),
  q(
    7,
    "Ghana's black star flag symbol drew its name from a shipping line founded by whom?|El símbolo de la estrella negra de la bandera de Ghana toma su nombre de una naviera fundada por quién?|Le symbole de l'étoile noire du drapeau ghanéen tire son nom d'une compagnie maritime fondée par qui ?|ガーナ国旗の黒い星の由来となった海運会社を興したのは誰か?",
    ["W. E. B. Du Bois|W. E. B. Du Bois|W. E. B. Du Bois|W・E・B・デュボイス", "Frederick Douglass|Frederick Douglass|Frederick Douglass|フレデリック・ダグラス", "Marcus Garvey|Marcus Garvey|Marcus Garvey|マーカス・ガーヴィー"],
    2,
    "Marcus Garvey's Black Star Line, founded in 1919 to link the African diaspora by sea, never became commercially successful but left its name behind on Ghana's flag decades later.|La Black Star Line de Marcus Garvey, fundada en 1919 para unir por mar a la diáspora africana, nunca tuvo éxito comercial, pero dejó su nombre en la bandera de Ghana décadas después.|La Black Star Line de Marcus Garvey, fondée en 1919 pour relier par mer la diaspora africaine, ne connut jamais de succès commercial, mais laissa son nom sur le drapeau du Ghana des décennies plus tard.|マーカス・ガーヴィーが1919年、アフリカ系離散民を海路で結ぶために創設したブラック・スター・ラインは商業的には成功しなかったが、その名は何十年も後にガーナ国旗に残ることになった。",
  ),
  q(
    7,
    "Which Ghanaian, born in Kumasi, served as UN Secretary-General and won the Nobel Peace Prize?|¿Qué ghanés, nacido en Kumasi, fue secretario general de la ONU y ganó el Premio Nobel de la Paz?|Quel Ghanéen, né à Kumasi, fut secrétaire général de l'ONU et reçut le prix Nobel de la paix ?|クマシ生まれで国連事務総長を務め、ノーベル平和賞を受賞したガーナ人は誰か?",
    ["Kofi Annan|Kofi Annan|Kofi Annan|コフィ・アナン", "John Kufuor|John Kufuor|John Kufuor|ジョン・クフォー", "Jerry Rawlings|Jerry Rawlings|Jerry Rawlings|ジェリー・ローリングス"],
    0,
    "Kofi Annan, born in Kumasi, served as United Nations Secretary-General from 1997 to 2006 and shared the Nobel Peace Prize with the UN in 2001.|Kofi Annan, nacido en Kumasi, fue secretario general de las Naciones Unidas de 1997 a 2006 y compartió el Premio Nobel de la Paz con la ONU en 2001.|Kofi Annan, né à Kumasi, fut secrétaire général des Nations unies de 1997 à 2006 et partagea le prix Nobel de la paix avec l'ONU en 2001.|クマシ生まれのコフィ・アナンは1997年から2006年まで国連事務総長を務め、2001年に国連とともにノーベル平和賞を受賞した。",
  ),
  q(
    7,
    "The 'Door of No Return' in Ghana's coastal forts opened directly onto what?|La «Puerta sin Retorno» de los fuertes costeros de Ghana se abría directamente hacia qué?|La « Porte du Non-Retour » des forts côtiers du Ghana s'ouvrait directement sur quoi ?|ガーナの海岸の砦にある「帰らざる扉」は、何へ直接開いていたか?",
    ["A market square|Una plaza de mercado|Une place de marché|市場の広場", "The beach where ships waited to carry captives away|La playa donde esperaban los barcos para llevarse a los cautivos|La plage où les navires attendaient pour emporter les captifs|捕われた人々を運ぶ船が待つ浜辺", "A royal courtroom|Una sala de justicia real|Une salle de justice royale|王の法廷"],
    1,
    "The Door of No Return, found in several of Ghana's coastal forts, opened directly onto the beach where captives were loaded onto ships bound for the Americas.|La Puerta sin Retorno, presente en varios fuertes costeros de Ghana, se abría directamente a la playa donde se embarcaba a los cautivos en barcos rumbo a América.|La Porte du Non-Retour, présente dans plusieurs forts côtiers du Ghana, s'ouvrait directement sur la plage où les captifs étaient chargés à bord de navires en partance pour les Amériques.|ガーナの複数の海岸の砦にある「帰らざる扉」は、アメリカ大陸行きの船に捕われた人々が積み込まれる浜辺へ直接開いていた。",
  ),
  q(
    7,
    "What is Ghana's highest peak, near the border with Togo?|¿Cuál es el pico más alto de Ghana, cerca de la frontera con Togo?|Quel est le plus haut sommet du Ghana, près de la frontière avec le Togo ?|トーゴ国境に近いガーナの最高峰は?",
    ["Mount Gemi|Monte Gemi|Le mont Gemi|ゲミ山", "Mount Kwahu|Monte Kwahu|Le mont Kwahu|クワフェ山", "Mount Afadjato|Monte Afadjato|Le mont Afadjato|アファジャト山"],
    2,
    "Mount Afadjato, in the Volta Region near the Togo border, rises to roughly 885 metres and is generally cited as Ghana's highest point.|El monte Afadjato, en la región del Volta cerca de la frontera con Togo, se alza unos 885 metros y se suele citar como el punto más alto de Ghana.|Le mont Afadjato, dans la région de la Volta près de la frontière togolaise, culmine à environ 885 mètres et est généralement cité comme le point culminant du Ghana.|トーゴ国境近くのヴォルタ州にあるアファジャト山は標高およそ885メートルで、一般にガーナの最高地点とされる。",
  ),
  q(
    8,
    "In 1874, British troops burned and looted which Ashanti capital?|En 1874, ¿qué capital ashanti incendiaron y saquearon las tropas británicas?|En 1874, quelle capitale ashanti les troupes britanniques incendièrent-elles et pillèrent-elles ?|1874年、イギリス軍が焼き払い略奪したアシャンティの都はどこか?",
    ["Kumasi|Kumasi|Kumasi|クマシ", "Tamale|Tamale|Tamale|タマレ", "Cape Coast|Cape Coast|Cape Coast|ケープコースト"],
    0,
    "British troops under Garnet Wolseley captured and burned Kumasi in 1874, during one of several nineteenth-century wars between Britain and the Ashanti Empire.|Las tropas británicas al mando de Garnet Wolseley tomaron e incendiaron Kumasi en 1874, durante una de las varias guerras del siglo XIX entre Gran Bretaña y el Imperio Ashanti.|Les troupes britanniques sous les ordres de Garnet Wolseley prirent et incendièrent Kumasi en 1874, lors de l'une des nombreuses guerres du XIXe siècle entre la Grande-Bretagne et l'Empire ashanti.|1874年、ガーネット・ウォルズリー麾下のイギリス軍がクマシを攻略して焼き払った。19世紀にイギリスとアシャンティ帝国のあいだで何度も起きた戦争の一つである。",
  ),
  q(
    8,
    "Kwame Nkrumah helped found which continental body in 1963?|¿Qué organismo continental ayudó a fundar Kwame Nkrumah en 1963?|Quel organisme continental Kwame Nkrumah contribua-t-il à fonder en 1963 ?|クワメ・ンクルマが1963年の創設に貢献した大陸規模の組織は?",
    ["The African Union|La Unión Africana|L'Union africaine|アフリカ連合", "The Organisation of African Unity|La Organización para la Unidad Africana|L'Organisation de l'unité africaine|アフリカ統一機構", "ECOWAS|La CEDEAO|La CEDEAO|西アフリカ諸国経済共同体"],
    1,
    "The Organisation of African Unity, founded in Addis Ababa in 1963 with Kwame Nkrumah among its leading advocates, was the forerunner of today's African Union.|La Organización para la Unidad Africana, fundada en Adís Abeba en 1963 con Kwame Nkrumah entre sus principales impulsores, fue la precursora de la actual Unión Africana.|L'Organisation de l'unité africaine, fondée à Addis-Abeba en 1963 avec Kwame Nkrumah parmi ses principaux artisans, fut l'ancêtre de l'actuelle Union africaine.|1963年にアディスアベバで設立されたアフリカ統一機構は、クワメ・ンクルマも主要な推進者の一人であり、今日のアフリカ連合の前身にあたる。",
  ),
  q(
    8,
    "Ghana's 2007 currency reform replaced how many old cedis with a single new cedi?|La reforma monetaria de Ghana de 2007 sustituyó cuántos cedis antiguos por un solo cedi nuevo?|La réforme monétaire du Ghana de 2007 a remplacé combien d'anciens cedis par un seul nouveau cedi ?|2007年のガーナの通貨改革で、旧セディの何単位が新セディ1単位に置き換えられたか?",
    ["1,000|1000|1000|1,000", "10,000|10 000|10 000|10,000", "100,000|100 000|100 000|100,000"],
    1,
    "Ghana's currency reform in 2007 replaced 10,000 old cedis with a single new cedi, cutting several zeros off everyday prices overnight.|La reforma monetaria de Ghana en 2007 sustituyó 10.000 cedis antiguos por un solo cedi nuevo, recortando de la noche a la mañana varios ceros de los precios cotidianos.|La réforme monétaire du Ghana en 2007 remplaça 10 000 anciens cedis par un seul nouveau cedi, effaçant du jour au lendemain plusieurs zéros sur les prix courants.|2007年のガーナの通貨改革は、旧セディ1万単位を新セディ1単位に置き換え、日用品の価格から一夜にして何桁もの零をそぎ落とした。",
  ),
  q(
    9,
    "Which is Ghana's largest wildlife reserve, home to elephants in the north?|¿Cuál es la mayor reserva de fauna de Ghana, hogar de elefantes en el norte?|Quelle est la plus grande réserve faunique du Ghana, où vivent des éléphants dans le nord ?|北部にゾウが生息する、ガーナ最大の野生動物保護区は?",
    ["Mole National Park|Parque Nacional Mole|Le parc national de Mole|モレ国立公園", "Kakum National Park|Parque Nacional Kakum|Le parc national de Kakum|カクム国立公園", "Digya National Park|Parque Nacional Digya|Le parc national de Digya|ディギャ国立公園"],
    0,
    "Mole National Park, in northern Ghana, is the country's largest protected area and one of the few places in West Africa where wild elephants can still be reliably seen.|El Parque Nacional Mole, en el norte de Ghana, es la mayor área protegida del país y uno de los pocos lugares de África Occidental donde aún se pueden ver elefantes salvajes con regularidad.|Le parc national de Mole, dans le nord du Ghana, est la plus grande aire protégée du pays et l'un des rares endroits d'Afrique de l'Ouest où l'on peut encore observer régulièrement des éléphants sauvages.|北部ガーナのモレ国立公園はこの国最大の保護区であり、西アフリカで野生のゾウを確実に見られる数少ない場所の一つである。",
  ),
  q(
    9,
    "What is Ghana's senior traditional body representing the country's chiefs called?|¿Cómo se llama el máximo organismo tradicional que representa a los jefes de Ghana?|Comment s'appelle le plus haut organe traditionnel représentant les chefs du Ghana ?|ガーナの首長たちを代表する最上位の伝統的機関の名前は?",
    ["The Council of Elders|El Consejo de Ancianos|Le Conseil des anciens|長老評議会", "The National House of Chiefs|La Casa Nacional de Jefes|La Chambre nationale des chefs|国家首長院", "The Asanteman Council|El Consejo Asanteman|Le Conseil Asanteman|アサンテマン評議会"],
    1,
    "Ghana's National House of Chiefs, established after independence, gives the country's traditional rulers a formal, constitutionally recognised role alongside elected government.|La Casa Nacional de Jefes de Ghana, creada tras la independencia, otorga a los gobernantes tradicionales del país un papel formal y reconocido constitucionalmente junto al gobierno electo.|La Chambre nationale des chefs du Ghana, créée après l'indépendance, confère aux souverains traditionnels du pays un rôle officiel, reconnu par la Constitution, aux côtés du gouvernement élu.|独立後に設けられたガーナの国家首長院は、この国の伝統的支配者たちに、選挙で選ばれた政府と並ぶ憲法上正式な役割を与えている。",
  ),
  q(
    9,
    "Fufu is traditionally made by pounding boiled cassava together with what?|El fufu se hace tradicionalmente machacando yuca hervida junto con qué?|Le fufu est traditionnellement préparé en pilant du manioc bouilli avec quoi ?|フフは伝統的に茹でたキャッサバと何を一緒に搗いて作るか?",
    ["Rice|Arroz|Du riz|米", "Wheat|Trigo|Du blé|小麦", "Green plantain|Plátano verde|De la banane plantain verte|青いプランテン(料理用バナナ)"],
    2,
    "Fufu is traditionally made by pounding boiled cassava and green plantain together in a large wooden mortar until smooth, then served in a ball alongside soup.|El fufu se hace tradicionalmente machacando yuca hervida y plátano verde juntos en un mortero de madera grande hasta obtener una masa lisa, que se sirve en bola junto con sopa.|Le fufu se prépare traditionnellement en pilant ensemble du manioc bouilli et de la banane plantain verte dans un grand mortier en bois jusqu'à obtenir une pâte lisse, servie en boule accompagnée de soupe.|フフは伝統的に、茹でたキャッサバと青いプランテンを大きな木の臼でなめらかになるまで一緒に搗いて作られ、団子状にしてスープと共に供される。",
  ),
  q(
    9,
    "Which biennial Pan-African arts festival, reconnecting the diaspora, is held in Cape Coast and Elmina?|¿Qué festival panafricano de artes, bienal, que reconecta con la diáspora, se celebra en Cape Coast y Elmina?|Quel festival panafricain des arts, biennal, qui renoue avec la diaspora, se tient à Cape Coast et Elmina ?|離散した人々をつなぎ直す2年ごとのパンアフリカ芸術祭で、ケープコーストとエルミナで開かれるものは?",
    ["PANAFEST|PANAFEST|PANAFEST|パンアフェスト", "Homowo|Homowo|Homowo|ホモウォ", "Odwira|Odwira|Odwira|オドウィラ"],
    0,
    "PANAFEST, held every two years in Cape Coast and Elmina, brings together artists and visitors from across Africa and its diaspora around themes of reconnection and heritage.|PANAFEST, celebrado cada dos años en Cape Coast y Elmina, reúne a artistas y visitantes de toda África y su diáspora en torno a temas de reconexión y patrimonio.|Le PANAFEST, organisé tous les deux ans à Cape Coast et Elmina, rassemble artistes et visiteurs de toute l'Afrique et de sa diaspora autour de thèmes de reconnexion et de patrimoine.|2年ごとにケープコーストとエルミナで開かれるパンアフェストは、アフリカとその離散民各地から芸術家や来訪者を集め、再会と遺産をめぐるテーマのもとに催される。",
  ),
  q(
    10,
    "In what year did Ghana adopt its current national anthem, 'God Bless Our Homeland Ghana'?|¿En qué año adoptó Ghana su himno nacional actual, «Dios bendiga nuestra patria Ghana»?|En quelle année le Ghana a-t-il adopté son hymne national actuel, « Dieu bénisse notre patrie le Ghana » ?|ガーナが現在の国歌「神よガーナを祝福したまえ」を採用した年は?",
    ["1957|1957|1957|1957年", "1966|1966|1966|1966年", "1979|1979|1979|1979年"],
    1,
    "Ghana adopted 'God Bless Our Homeland Ghana' as its national anthem in 1966, after the government that had used the previous, independence-era anthem was removed in a coup.|Ghana adoptó «Dios bendiga nuestra patria Ghana» como himno nacional en 1966, después de que un golpe de Estado derrocara al gobierno que había usado el himno anterior, de la era de la independencia.|Le Ghana adopta « Dieu bénisse notre patrie le Ghana » comme hymne national en 1966, après qu'un coup d'État eut renversé le gouvernement qui utilisait l'hymne précédent, datant de l'indépendance.|ガーナは1966年、「神よガーナを祝福したまえ」を国歌に採用した。独立当時の旧国歌を使っていた政権がクーデターで倒れたあとのことである。",
  ),
  q(
    10,
    "The historic Ghana Empire, from which the modern country borrowed its name, was centred in what is now which countries?|El histórico Imperio de Ghana, del que el país moderno tomó su nombre, tenía su centro en lo que hoy son qué países?|L'ancien empire du Ghana, dont le pays moderne a emprunté le nom, était centré sur ce qui est aujourd'hui quels pays ?|現代の国名の由来となった歴史上のガーナ帝国は、現在のどの国にあたる地域を中心としていたか?",
    ["Egypt and Sudan|Egipto y Sudán|L'Égypte et le Soudan|エジプトとスーダン", "Nigeria and Cameroon|Nigeria y Camerún|Le Nigeria et le Cameroun|ナイジェリアとカメルーン", "Mali and Mauritania|Malí y Mauritania|Le Mali et la Mauritanie|マリとモーリタニア"],
    2,
    "The historic Ghana Empire, from which the modern country borrowed its name at independence, was centred hundreds of kilometres to the northwest in what is now Mali and Mauritania, with no territorial overlap with modern Ghana.|El histórico Imperio de Ghana, del que el país moderno tomó su nombre al independizarse, tenía su centro cientos de kilómetros al noroeste, en lo que hoy son Malí y Mauritania, sin solaparse territorialmente con la Ghana actual.|L'ancien empire du Ghana, dont le pays moderne a emprunté le nom à l'indépendance, était centré des centaines de kilomètres au nord-ouest, dans ce qui est aujourd'hui le Mali et la Mauritanie, sans aucun recoupement territorial avec le Ghana actuel.|独立に際して現代の国名の由来となった歴史上のガーナ帝国は、現在のガーナとは領土が重ならない、何百キロも北西にある現在のマリとモーリタニアの地域を中心としていた。",
  ),
  q(
    10,
    "Which dance-band genre, blending Akan melodies with Western brass and guitar, developed in coastal Ghana?|¿Qué género de banda de baile, que mezcla melodías akan con metales y guitarra occidentales, se desarrolló en la costa de Ghana?|Quel genre de musique de danse, mêlant mélodies akan et cuivres et guitare occidentaux, s'est développé sur la côte du Ghana ?|アカンの旋律に西洋の金管楽器やギターを融合させ、ガーナの海岸部で生まれたダンスバンドの音楽ジャンルは?",
    ["Highlife|Highlife|Le highlife|ハイライフ", "Afrobeats|Afrobeats|L'afrobeats|アフロビーツ", "Soukous|Soukous|Le soukous|スークース"],
    0,
    "Highlife, blending Akan melodies and rhythms with Western brass-band and guitar instrumentation, developed in coastal Ghana in the early twentieth century and later spread across West Africa.|El highlife, que mezcla melodías y ritmos akan con instrumentación occidental de banda de metales y guitarra, se desarrolló en la costa de Ghana a principios del siglo XX y luego se extendió por África Occidental.|Le highlife, mêlant mélodies et rythmes akan à une instrumentation occidentale de fanfare et de guitare, s'est développé sur la côte du Ghana au début du XXe siècle avant de se répandre dans toute l'Afrique de l'Ouest.|アカンの旋律とリズムに西洋のブラスバンドとギターの編成を融合させたハイライフは、20世紀初頭にガーナ沿岸部で生まれ、のちに西アフリカ各地へ広まった。",
  ),
  q(
    10,
    "Akan goldweights, small brass castings once used to measure gold dust, are known as what?|Las pesas de oro akan, pequeñas piezas de latón fundido usadas antaño para medir el polvo de oro, se conocen como qué?|Les poids à peser l'or akan, petites pièces en laiton coulé jadis utilisées pour mesurer la poudre d'or, sont connus sous quel nom ?|かつて砂金を量るのに使われたアカンの小さな真鍮鋳物の分銅は、何と呼ばれるか?",
    ["Kente|Kente|Le kente|ケンテ", "Abrammuo|Abrammuo|Abrammuo|アブランムオ", "Adinkra|Adinkra|L'adinkra|アディンクラ"],
    1,
    "Akan goldweights, known as abrammuo, were small brass castings used for centuries to measure gold dust by weight, each shaped as a miniature scene, animal or symbol.|Las pesas de oro akan, conocidas como abrammuo, fueron pequeñas piezas de latón fundido usadas durante siglos para medir el polvo de oro por peso, cada una con forma de escena, animal o símbolo en miniatura.|Les poids à peser l'or akan, appelés abrammuo, étaient de petites pièces en laiton coulé utilisées pendant des siècles pour mesurer la poudre d'or, chacune façonnée en une scène, un animal ou un symbole miniature.|「アブランムオ」と呼ばれるアカンの金の分銅は、何世紀にもわたって砂金を目方で量るのに使われた小さな真鍮鋳物で、それぞれが情景や動物、記号をかたどっていた。",
  ),
];
