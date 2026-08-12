/**
 * モロッコのクイズ(42問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 都市カード(38件)が扱う具体的な事実(タンジェの国際ゾーン・フェズの大学・
 * マラケシュのクトゥビア・エッサウィラの紫の染料など)はここでは問わない。
 * 代わりに、国全体の地理・歴史・食文化・現代の暮らし・スポーツなど、
 * 都市カードが触れていない主題を選んである。
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

export const MOROCCO_QUIZ = [
  q(
    1,
    "What is the capital of Morocco?|¿Cuál es la capital de Marruecos?|Quelle est la capitale du Maroc ?|モロッコの首都はどこか?",
    ["Casablanca|Casablanca|Casablanca|カサブランカ", "Marrakesh|Marrakech|Marrakech|マラケシュ", "Rabat|Rabat|Rabat|ラバト"],
    2,
    "Rabat, together with Salé just across the Bou Regreg river, forms a metropolitan area distinctly smaller than Casablanca's — a common surprise for visitors who assume the political capital must also be the country's biggest city.|Rabat, junto con Salé al otro lado del río Bu Regreg, forma un área metropolitana claramente más pequeña que la de Casablanca, una sorpresa habitual para quien supone que la capital política debe ser también la ciudad más grande.|Rabat, avec Salé de l'autre côté du fleuve Bou Regreg, forme une agglomération nettement plus petite que celle de Casablanca, une surprise fréquente pour qui suppose que la capitale politique doit aussi être la plus grande ville.|ラバトはブー・レグレグ川の対岸のサレとともに一つの都市圏をなすが、その規模はカサブランカよりはっきり小さい。政治的首都は国いちばんの大都市でもあるはずだと思い込んでいる旅行者を驚かせることが多い。",
  ),
  q(
    1,
    "What currency is used in Morocco?|¿Qué moneda se usa en Marruecos?|Quelle monnaie utilise-t-on au Maroc ?|モロッコで使われている通貨は?",
    ["The euro|El euro|L'euro|ユーロ", "The Algerian dinar|El dinar argelino|Le dinar algérien|アルジェリア・ディナール", "The Moroccan dirham|El dirham marroquí|Le dirham marocain|モロッコ・ディルハム"],
    2,
    "The dirham has been Morocco's currency since 1960, and unlike some neighbouring currencies it is not freely convertible outside a narrow band set by the central bank.|El dirham es la moneda de Marruecos desde 1960, y a diferencia de algunas monedas vecinas, no es de libre convertibilidad fuera de una banda estrecha fijada por el banco central.|Le dirham est la monnaie du Maroc depuis 1960, et contrairement à certaines monnaies voisines, il n'est pas librement convertible en dehors d'une bande étroite fixée par la banque centrale.|ディルハムは1960年以来モロッコの通貨で、近隣の一部の通貨と違い、中央銀行が定める狭い変動幅の外では自由に交換できない。",
  ),
  q(
    1,
    "Which continent is Morocco part of?|¿A qué continente pertenece Marruecos?|De quel continent le Maroc fait-il partie ?|モロッコが属する大陸は?",
    ["Europe|Europa|Europe|ヨーロッパ", "Asia|Asia|Asie|アジア", "Africa|África|Afrique|アフリカ"],
    2,
    "Morocco occupies the northwestern corner of Africa, close enough to Europe that the Strait of Gibraltar separating the two continents is only about 14 kilometres wide at its narrowest.|Marruecos ocupa la esquina noroeste de África, tan cerca de Europa que el estrecho de Gibraltar que separa ambos continentes mide apenas unos 14 km en su punto más estrecho.|Le Maroc occupe le coin nord-ouest de l'Afrique, assez proche de l'Europe pour que le détroit de Gibraltar séparant les deux continents ne mesure qu'environ 14 km à son point le plus étroit.|モロッコはアフリカ大陸の北西の角に位置し、二つの大陸を隔てるジブラルタル海峡は最も狭い場所でわずか約14キロメートルしかない。",
  ),
  q(
    1,
    "What is the name of the desert that covers much of southern Morocco?|¿Cómo se llama el desierto que cubre buena parte del sur de Marruecos?|Comment s'appelle le désert qui couvre une bonne partie du sud du Maroc ?|モロッコ南部の多くを覆う砂漠の名は?",
    ["The Gobi Desert|El desierto de Gobi|Le désert de Gobi|ゴビ砂漠", "The Kalahari Desert|El desierto del Kalahari|Le désert du Kalahari|カラハリ砂漠", "The Sahara Desert|El desierto del Sáhara|Le désert du Sahara|サハラ砂漠"],
    2,
    "The Sahara, the world's largest hot desert, stretches across most of North Africa, and its northwestern edge reaches into southeastern Morocco.|El Sáhara, el desierto cálido más grande del mundo, se extiende por la mayor parte del norte de África, y su borde noroeste llega al sureste de Marruecos.|Le Sahara, le plus grand désert chaud du monde, s'étend sur la majeure partie de l'Afrique du Nord, et sa bordure nord-ouest atteint le sud-est du Maroc.|世界最大の熱い砂漠であるサハラは北アフリカの大部分に広がり、その北西の縁がモロッコ南東部にまで達している。",
  ),
  q(
    2,
    "What is Morocco's traditional Friday meal, eaten by families after prayers?|¿Cuál es la comida tradicional del viernes en Marruecos, tras la oración?|Quel est le repas traditionnel du vendredi au Maroc, pris après la prière ?|礼拝のあと家族で食べる、モロッコの伝統的な金曜日の食事は?",
    ["Paella|Paella|Paella|パエリア", "Sushi|Sushi|Sushi|寿司", "Couscous|Cuscús|Couscous|クスクス"],
    2,
    "Steamed semolina couscous, topped with vegetables and meat or fish, is eaten as the main family meal after Friday prayers in households across the country, a weekly rhythm that holds even where daily cooking has otherwise changed.|El cuscús de sémola al vapor, con verduras y carne o pescado, se come como plato principal familiar tras la oración del viernes en hogares de todo el país.|La semoule de couscous cuite à la vapeur, garnie de légumes et de viande ou de poisson, est le plat familial principal pris après la prière du vendredi dans les foyers du pays.|蒸したセモリナ粉のクスクスに野菜と肉または魚を添えたものは、国じゅうの家庭で金曜礼拝のあとの家族の主な食事として食べられる、日々の料理が変わっても続く週の習わしである。",
  ),
  q(
    2,
    "What sits at the center of Morocco's flag?|¿Qué hay en el centro de la bandera de Marruecos?|Qu'y a-t-il au centre du drapeau du Maroc ?|モロッコの国旗の中央にあるものは?",
    ["A crescent moon|Una luna creciente|Un croissant de lune|三日月", "A golden lion|Un león dorado|Un lion doré|金の獅子", "A green five-pointed star|Una estrella verde de cinco puntas|Une étoile verte à cinq branches|緑の五芒星"],
    2,
    "The green pentagram, known as the Seal of Solomon, was added to the plain red flag in 1915 to distinguish Moroccan ships from other vessels flying a similar red banner.|El pentagrama verde, conocido como el Sello de Salomón, se añadió a la bandera roja lisa en 1915 para distinguir los barcos marroquíes de otros que enarbolaban un estandarte rojo similar.|Le pentagramme vert, appelé sceau de Salomon, fut ajouté au drapeau rouge uni en 1915 pour distinguer les navires marocains d'autres bâtiments arborant un pavillon rouge semblable.|「ソロモンの印」と呼ばれる緑の五芒星は1915年、似た赤い旗を掲げる他の船とモロッコ船を区別するために、無地の赤い旗に加えられた。",
  ),
  q(
    2,
    "What body of water separates Morocco from Spain at its narrowest point?|¿Qué masa de agua separa Marruecos de España en su punto más estrecho?|Quelle étendue d'eau sépare le Maroc de l'Espagne à son point le plus étroit ?|最も狭い地点でモロッコとスペインを隔てる海は?",
    ["The English Channel|El canal de la Mancha|La Manche|イギリス海峡", "The Bosphorus|El Bósforo|Le Bosphore|ボスポラス海峡", "The Strait of Gibraltar|El estrecho de Gibraltar|Le détroit de Gibraltar|ジブラルタル海峡"],
    2,
    "On a clear day, the coast of Spain is visible with the naked eye from several points along Morocco's northern shore, and ferries cross the strait in well under an hour.|En un día despejado, la costa de España es visible a simple vista desde varios puntos de la costa norte de Marruecos, y los ferris cruzan el estrecho en bastante menos de una hora.|Par temps clair, la côte espagnole est visible à l'œil nu depuis plusieurs points de la côte nord du Maroc, et les ferries traversent le détroit en bien moins d'une heure.|晴れた日には、モロッコ北岸のいくつもの地点からスペインの海岸を肉眼で見ることができ、フェリーは1時間もかからずに海峡を渡る。",
  ),
  q(
    2,
    "What mountain range runs diagonally across the middle of Morocco?|¿Qué cordillera cruza diagonalmente el centro de Marruecos?|Quelle chaîne de montagnes traverse le Maroc en diagonale ?|モロッコの中央を斜めに貫く山脈の名は?",
    ["The Andes|Los Andes|Les Andes|アンデス山脈", "The Carpathians|Los Cárpatos|Les Carpates|カルパティア山脈", "The Atlas Mountains|El Atlas|L'Atlas|アトラス山脈"],
    2,
    "The Atlas range takes its name from the Titan of Greek mythology said to hold up the sky, a name ancient Greek geographers gave the mountains because they seemed to do exactly that on the western edge of the known world.|La cordillera del Atlas toma su nombre del titán de la mitología griega que sostenía el cielo, nombre que le dieron los antiguos geógrafos griegos porque las montañas parecían hacer justo eso en el extremo occidental del mundo conocido.|La chaîne de l'Atlas tire son nom du Titan de la mythologie grecque censé soutenir le ciel, nom donné par les géographes grecs antiques car ces montagnes semblaient faire exactement cela à l'extrémité occidentale du monde connu.|アトラス山脈の名は、天を支えたとされるギリシャ神話の巨神(ティターン)アトラスに由来する。古代ギリシャの地理学者たちが、知られた世界の西の果てでまさにそれを行っているように見えるとしてこの名を与えた。",
  ),
  q(
    3,
    "The classic 1942 film Casablanca, named after the city, was mostly filmed where?|La clásica película de 1942 Casablanca, que lleva el nombre de la ciudad, ¿se rodó sobre todo dónde?|Le film classique de 1942 Casablanca, du nom de la ville, fut tourné pour l'essentiel où ?|都市の名を冠した1942年の名画『カサブランカ』は主にどこで撮影されたか?",
    ["On location in Casablanca|En localizaciones de Casablanca|En décors naturels à Casablanca|カサブランカの現地ロケ", "In Cairo, Egypt|En El Cairo, Egipto|Au Caire, en Égypte|エジプトのカイロ", "On a studio backlot in Hollywood|En un plató de Hollywood|Dans un studio de Hollywood|ハリウッドのスタジオ"],
    2,
    "Despite the title, almost the entire film was shot on Warner Bros. soundstages and its studio backlot in California; the production never travelled to Morocco at all.|A pesar del título, casi toda la película se rodó en los platós de la Warner Bros. y en su backlot en California; la producción nunca viajó a Marruecos.|Malgré le titre, la quasi-totalité du film fut tournée dans les studios de la Warner Bros. et son terrain de tournage en Californie ; la production ne se rendit jamais au Maroc.|タイトルにもかかわらず、映画のほぼ全編はワーナー・ブラザースの撮影スタジオとカリフォルニアの野外セットで撮られ、撮影隊がモロッコを訪れることは一度もなかった。",
  ),
  q(
    3,
    "What is the traditional hooded robe worn by many Moroccan men and women called?|¿Cómo se llama la túnica tradicional con capucha que llevan muchos marroquíes?|Comment s'appelle la robe traditionnelle à capuche portée par de nombreux Marocains ?|多くのモロッコの男女が着る、伝統的なフード付きの長衣の名は?",
    ["The kimono|El kimono|Le kimono|着物", "The sari|El sari|Le sari|サリー", "The djellaba|La chilaba|La djellaba|ジェラバ"],
    2,
    "The djellaba, a loose-fitting robe with a pointed hood, is worn year-round by both men and women, in heavy wool for winter and light cotton for summer, and remains common everyday wear even alongside Western clothing.|La chilaba, una túnica holgada con capucha puntiaguda, la llevan hombres y mujeres todo el año, en lana gruesa en invierno y algodón ligero en verano, y sigue siendo ropa cotidiana habitual junto a la occidental.|La djellaba, robe ample à capuche pointue, est portée toute l'année par les hommes et les femmes, en laine épaisse l'hiver et en coton léger l'été, et reste une tenue quotidienne courante aux côtés des vêtements occidentaux.|とがったフードのついたゆったりとした長衣ジェラバは男女とも一年じゅう着られ、冬は厚手の毛織物、夏は薄い綿で作られ、洋服と並んでいまも日常着として一般的である。",
  ),
  q(
    3,
    "Besides Arabic, what is Morocco's other official language, spoken by North Africa's indigenous people?|Además del árabe, ¿cuál es la otra lengua oficial de Marruecos, hablada por los pueblos indígenas del norte de África?|Outre l'arabe, quelle est l'autre langue officielle du Maroc, parlée par les peuples autochtones d'Afrique du Nord ?|アラビア語のほかにモロッコで公用語とされ、北アフリカの先住民が話す言語は?",
    ["Amazigh (Berber)|Amazige (bereber)|Amazighe (berbère)|アマジグ語(ベルベル語)", "Swahili|Suajili|Swahili|スワヒリ語", "Hausa|Hausa|Haoussa|ハウサ語"],
    0,
    "Amazigh, often called Berber, became Morocco's second official language alongside Arabic only in 2011, following a long campaign by activists for recognition of a language family spoken across North Africa long before Arabic arrived.|El amazige, a menudo llamado bereber, se convirtió en la segunda lengua oficial de Marruecos junto al árabe solo en 2011, tras una larga campaña de activistas por el reconocimiento de una familia lingüística hablada en el norte de África mucho antes de la llegada del árabe.|L'amazighe, souvent appelé berbère, n'est devenu la seconde langue officielle du Maroc aux côtés de l'arabe qu'en 2011, après une longue campagne de militants pour la reconnaissance d'une famille de langues parlées en Afrique du Nord bien avant l'arrivée de l'arabe.|しばしばベルベル語とも呼ばれるアマジグ語がアラビア語と並ぶモロッコの第二公用語になったのは2011年のことにすぎず、アラビア語が到来するはるか前から北アフリカで話されてきた言語族の承認を求める活動家たちの長い運動の末だった。",
  ),
  q(
    3,
    "In what year did Morocco gain independence from French and Spanish colonial rule?|¿En qué año obtuvo Marruecos la independencia del dominio colonial francés y español?|En quelle année le Maroc obtint-il son indépendance de la domination coloniale française et espagnole ?|モロッコがフランスとスペインの植民地支配から独立したのは何年か?",
    ["1930|1930|1930|1930年", "1956|1956|1956|1956年", "1975|1975|1975|1975年"],
    1,
    "Morocco regained its independence in 1956 after 44 years under a French protectorate in most of the country and a smaller Spanish protectorate in the north, with Sultan Mohammed V returning from exile to become king.|Marruecos recuperó su independencia en 1956 tras 44 años bajo un protectorado francés en la mayor parte del país y un protectorado español más pequeño en el norte, con el sultán Mohamed V regresando del exilio para ser rey.|Le Maroc retrouva son indépendance en 1956 après 44 ans sous un protectorat français dans la majeure partie du pays et un plus petit protectorat espagnol au nord, le sultan Mohammed V revenant d'exil pour devenir roi.|モロッコは44年間、国土の大半をフランス保護領、北部の一部をスペイン保護領として過ごしたのち、1956年に独立を回復し、亡命先から帰還したスルタン、ムハンマド5世が国王となった。",
  ),
  q(
    4,
    "What tree, whose oil is a Moroccan specialty, is famous for goats climbing into its branches to eat the fruit?|¿Qué árbol, cuyo aceite es una especialidad marroquí, es famoso porque las cabras trepan a sus ramas para comer el fruto?|Quel arbre, dont l'huile est une spécialité marocaine, est réputé pour les chèvres qui grimpent dans ses branches pour en manger le fruit?|山羊が実を食べるために枝によじ登ることで有名な、モロッコ特産のオイルが採れる木は?",
    ["The olive tree|El olivo|L'olivier|オリーブの木", "The argan tree|El argán|L'arganier|アルガンの木", "The baobab tree|El baobab|Le baobab|バオバブの木"],
    1,
    "The argan tree grows almost nowhere else on Earth outside a strip of southwestern Morocco, and while the goat-climbing photos are genuine, most commercial argan oil is now pressed from fruit gathered off the ground rather than what the goats leave behind.|El argán casi no crece en ningún otro lugar del planeta fuera de una franja del suroeste de Marruecos, y aunque las fotos de las cabras trepando son reales, la mayor parte del aceite de argán comercial se prensa hoy con fruto recogido del suelo.|L'arganier ne pousse presque nulle part ailleurs sur Terre en dehors d'une bande du sud-ouest du Maroc, et si les photos de chèvres grimpantes sont authentiques, la plupart de l'huile d'argan commerciale est aujourd'hui pressée à partir de fruits ramassés au sol.|アルガンの木は地球上でモロッコ南西部の一帯を除いてほとんど育たない。山羊が登る写真は本物だが、市販されるアルガンオイルの大半は、いまでは山羊が食べ残したものではなく地面に落ちた実から搾られている。",
  ),
  q(
    4,
    "What is the name of the intricate geometric mosaic tilework seen on Moroccan walls and fountains?|¿Cómo se llama el intrincado mosaico geométrico de azulejos visto en muros y fuentes marroquíes?|Comment s'appelle le mosaïque géométrique complexe de carreaux vue sur les murs et fontaines marocains ?|モロッコの壁や噴水に見られる、精緻な幾何学模様のモザイクタイルの名は?",
    ["Terrazzo|Terrazo|Terrazzo|テラゾー", "Mah-jong tiles|Fichas de mahjong|Tuiles de mah-jong|麻雀牌", "Zellige|Zellige|Zellige|ゼリージュ"],
    2,
    "Zellige tiles are individually chiseled by hand from single-colour glazed squares into small geometric shapes, then assembled face-down as a mosaic before being set in plaster — a craft passed down through guilds centred in Fez for centuries.|Los azulejos zellige se cincelan a mano, uno a uno, a partir de cuadrados esmaltados de un solo color, para darles pequeñas formas geométricas, que luego se ensamblan boca abajo como un mosaico antes de fijarlos en yeso.|Les carreaux zellige sont ciselés un à un à la main à partir de carrés émaillés unis, découpés en petites formes géométriques, puis assemblés à l'envers en mosaïque avant d'être scellés dans le plâtre.|ゼリージュのタイルは単色の釉薬をかけた正方形から一枚ずつ手作業で小さな幾何学模様に削り出され、裏返しにモザイクとして組み立てられたのち漆喰にはめ込まれる。何世紀もフェズを中心とするギルドが受け継いできた技である。",
  ),
  q(
    4,
    "What soup, thick with lentils, chickpeas and tomato, is traditionally eaten to break the Ramadan fast?|¿Qué sopa espesa con lentejas, garbanzos y tomate se toma tradicionalmente para romper el ayuno del Ramadán?|Quelle soupe épaisse aux lentilles, pois chiches et tomate est traditionnellement prise pour rompre le jeûne du Ramadan ?|レンズ豆・ヒヨコ豆・トマトを煮込んだ、ラマダンの断食明けに食べる伝統的なスープは?",
    ["Minestrone|Minestrone|Minestrone|ミネストローネ", "Borscht|Borsch|Bortsch|ボルシチ", "Harira|Harira|Harira|ハリラ"],
    2,
    "Harira is eaten across Morocco throughout the year, but during Ramadan it becomes the near-universal first thing families eat at sunset, often alongside dates and sweet pastries, to ease the stomach back into eating after a full day without food.|La harira se come en todo Marruecos durante todo el año, pero en Ramadán se convierte en lo primero que casi todas las familias comen al atardecer, a menudo junto a dátiles y dulces.|La harira se consomme dans tout le Maroc toute l'année, mais pendant le Ramadan, elle devient presque partout le premier plat mangé par les familles au coucher du soleil, souvent avec des dattes et des pâtisseries.|ハリラは一年を通じてモロッコ全土で食べられているが、ラマダンの間はほぼどの家庭でも日没時に最初に口にするものとなり、しばしばナツメヤシや甘い菓子とともに、丸一日何も食べずにいた胃を食事へゆっくり戻す役目を果たす。",
  ),
  q(
    4,
    "What is Morocco's national airline called?|¿Cómo se llama la aerolínea nacional de Marruecos?|Comment s'appelle la compagnie aérienne nationale du Maroc ?|モロッコの国営航空会社の名は?",
    ["Royal Air Maroc|Royal Air Maroc|Royal Air Maroc|ロイヤル・エア・モロッコ", "EgyptAir|EgyptAir|EgyptAir|エジプト航空", "Emirates|Emirates|Emirates|エミレーツ航空"],
    0,
    "Royal Air Maroc, founded in 1957 shortly after independence, operates its main hub at Casablanca's Mohammed V International Airport and is the largest airline anywhere in the Maghreb region.|Royal Air Maroc, fundada en 1957 poco después de la independencia, opera su centro principal en el aeropuerto internacional Mohamed V de Casablanca y es la mayor aerolínea del Magreb.|Royal Air Maroc, fondée en 1957 peu après l'indépendance, exploite son principal hub à l'aéroport international Mohammed V de Casablanca et est la plus grande compagnie aérienne du Maghreb.|1957年、独立から間もなく設立されたロイヤル・エア・モロッコは、カサブランカのムハンマド5世国際空港を拠点とし、マグレブ地域最大の航空会社である。",
  ),
  q(
    4,
    "How far did the Moroccan men's football team advance at the 2022 World Cup, a first for Africa and the Arab world?|¿Hasta dónde llegó la selección masculina de fútbol de Marruecos en el Mundial de 2022, una primicia para África y el mundo árabe?|Jusqu'où l'équipe masculine de football du Maroc est-elle allée à la Coupe du monde 2022, une première pour l'Afrique et le monde arabe ?|2022年ワールドカップでモロッコ男子代表が到達し、アフリカとアラブ世界にとって史上初となった段階は?",
    ["The round of 16|Octavos de final|Les huitièmes de finale|ベスト16", "The semifinals|Las semifinales|Les demi-finales|ベスト4(準決勝)", "They won the tournament|Ganaron el torneo|Ils ont remporté le tournoi|優勝"],
    1,
    "Morocco's run to the semifinals in Qatar, beating Spain and Portugal along the way, made it the first African or Arab nation ever to reach that stage of a men's World Cup, and the team was celebrated at home as a shared national achievement.|La carrera de Marruecos hasta las semifinales en Catar, tras vencer a España y Portugal, la convirtió en la primera nación africana o árabe en llegar a esa fase de un Mundial masculino.|La marche du Maroc jusqu'aux demi-finales au Qatar, après avoir battu l'Espagne et le Portugal, en fit la première nation africaine ou arabe à atteindre ce stade d'une Coupe du monde masculine.|カタール大会でスペインとポルトガルを破って準決勝まで進んだモロッコは、男子ワールドカップでその段階に到達した史上初のアフリカ・アラブ諸国となり、自国で国を挙げての快挙として祝われた。",
  ),
  q(
    5,
    "What is a traditional Moroccan house built around a central courtyard, often converted into a guesthouse, called?|¿Cómo se llama la casa marroquí tradicional construida alrededor de un patio central, a menudo convertida en alojamiento para huéspedes?|Comment s'appelle la maison marocaine traditionnelle bâtie autour d'une cour centrale, souvent transformée en maison d'hôtes ?|中庭を囲んで建てられ、しばしば宿に改装される伝統的なモロッコの家屋の名は?",
    ["A riad|Un riad|Un riad|リヤド", "A yurt|Una yurta|Une yourte|ゲル(パオ)", "A hacienda|Una hacienda|Une hacienda|アシエンダ"],
    0,
    "A riad is built inward around a courtyard garden or fountain, presenting a windowless wall to the street, and hundreds of them in cities like Marrakech and Fez have been restored as small guesthouses since the 1990s.|Un riad se construye hacia adentro, alrededor de un jardín o fuente en el patio, presentando un muro sin ventanas hacia la calle, y cientos de ellos en ciudades como Marrakech y Fez se han restaurado como pequeños alojamientos desde los años noventa.|Un riad est construit vers l'intérieur autour d'un jardin ou d'une fontaine de cour, présentant un mur aveugle sur la rue, et des centaines d'entre eux dans des villes comme Marrakech et Fès ont été restaurés en petites maisons d'hôtes depuis les années 1990.|リヤドは中庭の庭園や噴水を囲んで内向きに建てられ、通りに面した側には窓のない壁を見せる。マラケシュやフェズなどの町では1990年代以降、何百軒もが小さな宿として修復されてきた。",
  ),
  q(
    5,
    "What is the nickname of Morocco's national football team?|¿Cuál es el apodo de la selección nacional de fútbol de Marruecos?|Quel est le surnom de l'équipe nationale de football du Maroc ?|モロッコ代表サッカーチームの愛称は?",
    ["The Desert Foxes|Los Zorros del Desierto|Les Renards du désert|砂漠の狐", "The Atlas Lions|Los Leones del Atlas|Les Lions de l'Atlas|アトラスの獅子", "The Red Eagles|Las Águilas Rojas|Les Aigles rouges|赤い鷲"],
    1,
    "The team is nicknamed the Atlas Lions after the Barbary lion, a subspecies once native to the Atlas Mountains and North Africa that was hunted to extinction in the wild by the mid-20th century.|El equipo se apoda los Leones del Atlas por el león de Berbería, una subespecie antaño nativa de las montañas del Atlas y el norte de África que fue cazada hasta su extinción en estado salvaje a mediados del siglo XX.|L'équipe est surnommée les Lions de l'Atlas d'après le lion de l'Atlas, une sous-espèce jadis native des montagnes de l'Atlas et d'Afrique du Nord, chassée jusqu'à l'extinction à l'état sauvage au milieu du XXe siècle.|チームの愛称「アトラスの獅子」は、かつてアトラス山脈と北アフリカに生息していたが20世紀半ばまでに野生では狩り尽くされて絶滅したバーバリライオンという亜種にちなむ。",
  ),
  q(
    5,
    "What multi-day footrace crosses the Moroccan Sahara, requiring competitors to carry their own food?|¿Qué carrera de varios días cruza el Sáhara marroquí, obligando a los corredores a llevar su propia comida?|Quelle course pédestre de plusieurs jours traverse le Sahara marocain, obligeant les concurrents à porter leur propre nourriture ?|参加者が自分の食料を背負って走る、モロッコのサハラを横断する複数日にわたる徒競走は?",
    ["The Boston Marathon|El Maratón de Boston|Le marathon de Boston|ボストンマラソン", "The Marathon des Sables|El Maratón des Sables|Le Marathon des Sables|マラソン・デ・サブル(サハラマラソン)", "The Dakar Rally|El Rally Dakar|Le Rallye Dakar|ダカール・ラリー"],
    1,
    "The Marathon des Sables covers roughly 250 kilometres over six days through the Sahara near Merzouga and Ouarzazate, and every runner must carry all their own food and gear, with only water and tents supplied by organisers.|El Maratón des Sables recorre unos 250 km en seis días por el Sáhara cerca de Merzouga y Uarzazate, y cada corredor debe llevar toda su comida y equipo, con solo agua y tiendas suministradas por la organización.|Le Marathon des Sables parcourt environ 250 km en six jours à travers le Sahara près de Merzouga et Ouarzazate, chaque coureur devant porter toute sa nourriture et son équipement, seuls l'eau et les tentes étant fournies par les organisateurs.|マラソン・デ・サブルはメルズーガとワルザザート付近のサハラを6日間でおよそ250キロメートル走る競技で、参加者は水とテント以外の食料と装備すべてを自分で背負わなければならない。",
  ),
  q(
    5,
    "Morocco is one of the world's leading exporters of which small, oily fish?|¿De qué pequeño pescado azul es Marruecos uno de los principales exportadores del mundo?|Le Maroc est l'un des premiers exportateurs mondiaux de quel petit poisson gras ?|モロッコが世界有数の輸出国となっている、小さな脂の多い魚は?",
    ["Salmon|Salmón|Saumon|サケ", "Sardines|Sardinas|Sardines|イワシ", "Tuna|Atún|Thon|マグロ"],
    1,
    "Morocco's Atlantic waters, especially off the southern coast, hold some of the richest sardine stocks anywhere, and the country is consistently ranked among the world's top exporters of canned sardines.|Las aguas atlánticas de Marruecos, especialmente frente a la costa sur, albergan algunas de las poblaciones de sardina más ricas del mundo, y el país figura sistemáticamente entre los principales exportadores mundiales de sardinas enlatadas.|Les eaux atlantiques du Maroc, surtout au large de la côte sud, abritent certains des stocks de sardines les plus riches au monde, et le pays figure systématiquement parmi les premiers exportateurs mondiaux de sardines en boîte.|モロッコの大西洋岸、とりわけ南部沖には世界有数の豊かなイワシ資源があり、同国は缶詰イワシの世界有数の輸出国に常に数えられている。",
  ),
  q(
    5,
    "What is the name of Morocco's main stock exchange, one of Africa's largest?|¿Cómo se llama la principal bolsa de valores de Marruecos, una de las mayores de África?|Comment s'appelle la principale bourse du Maroc, l'une des plus grandes d'Afrique ?|アフリカ有数の規模を誇る、モロッコの主要証券取引所の名は?",
    ["The Casablanca Stock Exchange|La Bolsa de Casablanca|La Bourse de Casablanca|カサブランカ証券取引所", "The Cairo Exchange|La Bolsa de El Cairo|La Bourse du Caire|カイロ証券取引所", "The Lagos Exchange|La Bolsa de Lagos|La Bourse de Lagos|ラゴス証券取引所"],
    0,
    "The Casablanca Stock Exchange, founded in 1929, ranks among Africa's largest by market capitalisation and anchors Casablanca's status as the country's undisputed financial and business capital.|La Bolsa de Casablanca, fundada en 1929, figura entre las mayores de África por capitalización bursátil y sostiene el estatus de Casablanca como indiscutible capital financiera y empresarial del país.|La Bourse de Casablanca, fondée en 1929, compte parmi les plus grandes d'Afrique par capitalisation boursière et ancre le statut de Casablanca comme capitale financière et économique incontestée du pays.|1929年設立のカサブランカ証券取引所は時価総額でアフリカ有数の規模を誇り、カサブランカを同国の紛れもない経済・金融の中心地たらしめている。",
  ),
  q(
    5,
    "How many humps does a dromedary, the type of camel found in Morocco, have?|¿Cuántas jorobas tiene el dromedario, el tipo de camello que hay en Marruecos?|Combien de bosses possède le dromadaire, le type de chameau présent au Maroc ?|モロッコにいるラクダ、ヒトコブラクダのこぶの数は?",
    ["One|Una|Une|1つ", "Two|Dos|Deux|2つ", "None|Ninguna|Aucune|0(こぶなし)"],
    0,
    "The dromedary, or one-humped camel, is the only camel species found across North Africa and the Middle East; the two-humped Bactrian camel instead lives in the cold deserts of Central Asia.|El dromedario, o camello de una joroba, es la única especie de camello presente en el norte de África y Oriente Medio; el camello bactriano, de dos jorobas, vive en cambio en los desiertos fríos de Asia Central.|Le dromadaire, chameau à une bosse, est la seule espèce de chameau présente en Afrique du Nord et au Moyen-Orient ; le chameau de Bactriane à deux bosses vit lui dans les déserts froids d'Asie centrale.|ヒトコブラクダは北アフリカと中東で見られる唯一のラクダの種で、二つのこぶを持つフタコブラクダは代わりに中央アジアの寒冷な砂漠に生息する。",
  ),
  q(
    6,
    "Morocco holds the largest share of the world's known reserves of which mineral, used mainly in fertiliser?|¿De qué mineral, usado sobre todo en fertilizantes, posee Marruecos la mayor parte de las reservas mundiales conocidas?|Le Maroc détient la plus grande part des réserves mondiales connues de quel minéral, utilisé surtout dans les engrais ?|主に肥料に使われる、モロッコが世界の既知埋蔵量の最大の割合を占める鉱物は?",
    ["Phosphate|Fosfato|Phosphate|リン鉱石", "Copper|Cobre|Cuivre|銅", "Lithium|Litio|Lithium|リチウム"],
    0,
    "Morocco is estimated to hold somewhere around seventy percent of the world's known phosphate reserves, mined largely around the inland town of Khouribga and processed for export as fertiliser through the state company OCP.|Se estima que Marruecos posee alrededor del setenta por ciento de las reservas mundiales conocidas de fosfato, extraído sobre todo en torno a la ciudad interior de Khouribga y procesado para exportación como fertilizante por la empresa estatal OCP.|On estime que le Maroc détient environ soixante-dix pour cent des réserves mondiales connues de phosphate, extrait principalement autour de la ville intérieure de Khouribga et transformé pour l'exportation en engrais par l'entreprise publique OCP.|モロッコは世界の既知のリン鉱石埋蔵量のおよそ7割を占めるとされ、内陸の町ホウリブガ周辺を中心に採掘され、国営企業OCPを通じて肥料として輸出される。",
  ),
  q(
    6,
    "Near Ouarzazate, Morocco built one of the world's largest facilities of what kind, using mirrors to concentrate sunlight?|Cerca de Uarzazate, Marruecos construyó una de las mayores instalaciones del mundo de qué tipo, que usa espejos para concentrar la luz solar?|Près d'Ouarzazate, le Maroc a construit l'une des plus grandes installations au monde de quel type, utilisant des miroirs pour concentrer la lumière du soleil ?|ワルザザート近郊にモロッコが建設した、鏡で太陽光を集める世界最大級の施設とは?",
    ["A nuclear power plant|Una central nuclear|Une centrale nucléaire|原子力発電所", "A concentrated solar power plant|Una planta de energía solar concentrada|Une centrale solaire à concentration|集光型太陽熱発電所", "A wind farm|Un parque eólico|Un parc éolien|風力発電所"],
    1,
    "The Noor Ouarzazate complex, completed in stages through the 2010s, uses fields of curved mirrors to focus sunlight and heat a fluid that keeps generating electricity for hours after the sun sets, unlike ordinary solar panels.|El complejo Noor Uarzazate, completado por fases durante la década de 2010, usa campos de espejos curvos para concentrar la luz solar y calentar un fluido que sigue generando electricidad horas después de la puesta de sol.|Le complexe Noor Ouarzazate, achevé par étapes durant les années 2010, utilise des champs de miroirs incurvés pour concentrer la lumière solaire et chauffer un fluide qui continue de produire de l'électricité des heures après le coucher du soleil.|2010年代に段階的に完成したヌール・ワルザザート発電所群は、曲面鏡の群れで太陽光を集めて流体を加熱する方式を採り、通常の太陽光パネルと違って日没後も何時間も発電を続けられる。",
  ),
  q(
    6,
    "Which European country held a colonial protectorate over Morocco's northern Rif region, separate from the French zone?|¿Qué país europeo mantuvo un protectorado colonial sobre la región norteña del Rif marroquí, aparte de la zona francesa?|Quel pays européen exerça un protectorat colonial sur la région nord du Rif marocain, distinct de la zone française ?|フランス領とは別に、モロッコ北部リーフ地方に植民地保護領を置いていたヨーロッパの国は?",
    ["Portugal|Portugal|Portugal|ポルトガル", "Spain|España|Espagne|スペイン", "Italy|Italia|Italie|イタリア"],
    1,
    "Spain administered a separate northern protectorate from 1912 to 1956, distinct from the much larger French protectorate covering the rest of the country, which is why Spanish influence remains stronger in cities like Tetouan and Larache than elsewhere in Morocco.|España administró un protectorado septentrional separado de 1912 a 1956, distinto del mucho mayor protectorado francés que cubría el resto del país, por lo que la influencia española sigue siendo más fuerte en ciudades como Tetuán y Larache.|L'Espagne administra un protectorat nordique séparé de 1912 à 1956, distinct du protectorat français bien plus vaste couvrant le reste du pays, ce qui explique que l'influence espagnole reste plus forte dans des villes comme Tétouan et Larache.|スペインは1912年から1956年まで、国の残りを覆うはるかに広いフランス保護領とは別の北部保護領を統治しており、それがテトゥアンやラルシュといった町でいまもスペインの影響がほかより色濃く残る理由である。",
  ),
  q(
    6,
    "In Casablanca, the small city taxis known as \"petits taxis\" are traditionally painted which color?|En Casablanca, los pequeños taxis urbanos llamados «petits taxis» se pintan tradicionalmente de qué color?|À Casablanca, les petits taxis urbains sont traditionnellement peints de quelle couleur ?|カサブランカで「プティ・タクシー」と呼ばれる市内用の小型タクシーは、伝統的に何色に塗られているか?",
    ["Yellow|Amarillo|Jaune|黄色", "Red|Rojo|Rouge|赤", "Green|Verde|Vert|緑"],
    1,
    "Petit taxi colours are set city by city rather than nationally — red in Casablanca, blue in Rabat, beige in Marrakech — so the colour alone tells a returning traveller which city they've landed in.|Los colores de los petits taxis se fijan ciudad por ciudad y no a nivel nacional —rojo en Casablanca, azul en Rabat, beige en Marrakech—, así que el color por sí solo indica a un viajero en qué ciudad ha aterrizado.|Les couleurs des petits taxis sont fixées ville par ville plutôt qu'au niveau national — rouge à Casablanca, bleu à Rabat, beige à Marrakech — si bien que la couleur seule indique à un voyageur dans quelle ville il vient d'atterrir.|プティ・タクシーの色は全国一律ではなく町ごとに決まっており、カサブランカは赤、ラバトは青、マラケシュはベージュというように、色を見るだけでどの町に降り立ったか分かる。",
  ),
  q(
    6,
    "What is the Arabic name for Morocco, meaning roughly \"the place where the sun sets\"?|¿Cuál es el nombre árabe de Marruecos, que significa aproximadamente «el lugar donde se pone el sol»?|Quel est le nom arabe du Maroc, signifiant à peu près « le lieu où se couche le soleil » ?|「日の沈む場所」を意味する、モロッコのアラビア語での呼び名は?",
    ["Al-Maghrib|Al-Magrib|Al-Maghrib|アル=マグリブ", "Al-Sham|Al-Sham|Al-Cham|アッ=シャーム", "Al-Jazira|Al-Jazira|Al-Jazira|アル=ジャズィーラ"],
    0,
    "Al-Maghrib, meaning \"the west\" or \"where the sun sets,\" reflects Morocco's position as the westernmost point of the historic Arab world, and the term also gives its name to the wider Maghreb region of North Africa.|Al-Magrib, que significa «el oeste» o «donde se pone el sol», refleja la posición de Marruecos como el punto más occidental del mundo árabe histórico, y el término también da nombre a la región más amplia del Magreb.|Al-Maghrib, signifiant « l'ouest » ou « là où se couche le soleil », reflète la position du Maroc comme le point le plus occidental du monde arabe historique, et le terme donne aussi son nom à la région plus large du Maghreb.|「西」または「日の沈む場所」を意味するアル=マグリブは、歴史的なアラブ世界の最西端に位置するモロッコの立場を映しており、この語は北アフリカのより広いマグレブ地方の名の由来でもある。",
  ),
  q(
    6,
    "What style of plain cream-and-black Amazigh rug from the Middle Atlas became a favourite of modern interior design worldwide?|¿Qué estilo de alfombra amazigh sencilla, en crema y negro, del Atlas Medio se volvió favorita del diseño de interiores moderno en todo el mundo?|Quel style de tapis amazigh sobre, crème et noir, du Moyen Atlas est devenu un favori de la décoration intérieure moderne dans le monde ?|世界の現代インテリアデザインで人気となった、中部アトラス発祥のクリーム色と黒のシンプルなアマジグ絨毯の様式は?",
    ["Beni Ourain|Beni Ourain|Beni Ourain|ベニ・ウーラン", "Persian silk|Seda persa|Soie persane|ペルシャ絹絨毯", "Turkish kilim|Kilim turco|Kilim turc|トルコ・キリム"],
    0,
    "Beni Ourain rugs, hand-knotted from undyed sheep's wool by women of the Beni Ourain Amazigh confederation in the Middle Atlas, were originally made for warmth against mountain winters, long before design magazines discovered their minimalist look.|Las alfombras Beni Ourain, anudadas a mano con lana de oveja sin teñir por mujeres de la confederación amazigh Beni Ourain en el Atlas Medio, se hacían originalmente para dar calor frente a los inviernos de montaña, mucho antes de que las revistas de diseño descubrieran su aspecto minimalista.|Les tapis Beni Ourain, noués à la main dans de la laine de mouton non teinte par les femmes de la confédération amazighe Beni Ourain dans le Moyen Atlas, étaient à l'origine faits pour tenir chaud contre les hivers de montagne, bien avant que les magazines de décoration ne découvrent leur look minimaliste.|ベニ・ウーラン絨毯は中部アトラスのアマジグ人連合ベニ・ウーランの女性たちが染めていない羊毛を手で結んで作るもので、もとは山の冬の寒さをしのぐために作られていた。デザイン誌がその簡素な意匠を「発見」するはるか前からである。",
  ),
  q(
    7,
    "What formal title does the King of Morocco hold as the country's supreme religious authority?|¿Qué título formal ostenta el rey de Marruecos como máxima autoridad religiosa del país?|Quel titre formel porte le roi du Maroc en tant qu'autorité religieuse suprême du pays ?|モロッコ国王が最高宗教権威として持つ正式な称号は?",
    ["Grand Vizier|Gran Visir|Grand Vizir|大宰相", "Commander of the Faithful|Comendador de los Creyentes|Commandeur des croyants|信徒の司令官(アミール・アル=ムーミニーン)", "Caliph of the West|Califa de Occidente|Calife de l'Occident|西方のカリフ"],
    1,
    "Amir al-Muminin, or Commander of the Faithful, is a title the Moroccan monarchy has used since the 18th century to assert religious authority over the country independent of any outside caliphate, and it remains written into the constitution today.|Amir al-Muminin, o Comendador de los Creyentes, es un título que la monarquía marroquí usa desde el siglo XVIII para afirmar autoridad religiosa sobre el país, independiente de cualquier califato externo, y sigue recogido en la constitución.|Amir al-Muminin, ou Commandeur des croyants, est un titre que la monarchie marocaine utilise depuis le XVIIIe siècle pour affirmer une autorité religieuse sur le pays, indépendante de tout califat extérieur, et il reste inscrit dans la constitution aujourd'hui.|「信徒の司令官」を意味するアミール・アル=ムーミニーンは、モロッコ王家が18世紀から用いてきた称号で、外部のいかなるカリフ制からも独立した宗教的権威を国内に主張するものであり、いまも憲法に明記されている。",
  ),
  q(
    7,
    "What does the word \"Amazigh,\" the name North Africa's indigenous people use for themselves, translate to roughly?|¿A qué se traduce aproximadamente la palabra «amazige», el nombre que se dan a sí mismos los pueblos indígenas del norte de África?|Que signifie approximativement le mot « amazighe », le nom que se donnent les peuples autochtones d'Afrique du Nord ?|北アフリカの先住民が自らを呼ぶ「アマジグ」という語は、おおよそ何を意味するか?",
    ["Free people|Pueblo libre|Peuple libre|自由な人々", "People of the mountains|Pueblo de las montañas|Peuple des montagnes|山の民", "People of the sun|Pueblo del sol|Peuple du soleil|太陽の民"],
    0,
    "\"Amazigh\" is generally translated as \"free people\" or \"noble people,\" a self-designation that predates the term \"Berber,\" which derives from a Greek and Latin word for foreigner and is now considered by many Amazigh activists to be an outsider's label.|«Amazige» se traduce generalmente como «pueblo libre» o «pueblo noble», una autodenominación anterior al término «bereber», que deriva de una palabra griega y latina para extranjero.|« Amazighe » se traduit généralement par « peuple libre » ou « peuple noble », une auto-désignation antérieure au terme « berbère », qui dérive d'un mot grec et latin désignant l'étranger.|「アマジグ」は一般に「自由な人々」または「高貴な人々」と訳され、これはギリシャ語・ラテン語で「異邦人」を意味する語に由来する「ベルベル」という呼び名より古くからある自称である。",
  ),
  q(
    7,
    "Which Moroccan city's medina was the first site in the country to be added to the UNESCO World Heritage list, in 1981?|¿La medina de qué ciudad marroquí fue el primer sitio del país incluido en la lista de Patrimonio Mundial de la UNESCO, en 1981?|La médina de quelle ville marocaine fut le premier site du pays inscrit sur la liste du patrimoine mondial de l'UNESCO, en 1981 ?|1981年、モロッコで最初にユネスコ世界遺産に登録された都市の旧市街は?",
    ["Marrakesh|Marrakech|Marrakech|マラケシュ", "Fez|Fez|Fès|フェズ", "Tangier|Tánger|Tanger|タンジェ"],
    1,
    "The Medina of Fez, often described as one of the largest car-free urban areas anywhere in the world, was inscribed in 1981, the same year UNESCO began recognising it as an exceptional example of a medieval Islamic city.|La medina de Fez, a menudo descrita como una de las mayores zonas urbanas libres de coches del mundo, fue inscrita en 1981, año en que la UNESCO empezó a reconocerla como un ejemplo excepcional de ciudad islámica medieval.|La médina de Fès, souvent décrite comme l'une des plus grandes zones urbaines sans voitures au monde, fut inscrite en 1981, année où l'UNESCO commença à la reconnaître comme un exemple exceptionnel de ville islamique médiévale.|しばしば世界最大級の車の入れない市街地の一つと評されるフェズの旧市街は1981年に登録され、ユネスコが中世イスラム都市の傑出した例として認めた最初の年だった。",
  ),
  q(
    7,
    "What is the name of the traditional Moroccan equestrian display in which riders in formation gallop and fire rifles into the air together?|¿Cómo se llama la exhibición ecuestre tradicional marroquí en la que jinetes en formación galopan y disparan rifles al aire a la vez?|Comment s'appelle la démonstration équestre traditionnelle marocaine où des cavaliers en formation galopent et tirent des fusils en l'air ensemble ?|騎手たちが隊列を組んで疾走し、一斉に銃を空へ撃つモロッコの伝統的な馬術演武の名は?",
    ["Tbourida (Fantasia)|Tburida (Fantasía)|Tbourida (Fantasia)|トブーリダ(ファンタジア)", "Flamenco|Flamenco|Flamenco|フラメンコ", "Capoeira|Capoeira|Capoeira|カポエイラ"],
    0,
    "Tbourida, also known by the French colonial-era name fantasia, has teams of horsemen charge in a tight line and fire antique rifles, called moukahla, into the air in unison at the exact same instant, judged as much on the precision of that single shared bang as on the riding.|La tburida, también conocida por el nombre colonial francés de fantasía, tiene equipos de jinetes que cargan en línea cerrada y disparan al aire al unísono rifles antiguos llamados mukahla, juzgados tanto por la precisión de ese único disparo conjunto como por la monta.|La tbourida, aussi connue sous le nom colonial français de fantasia, voit des équipes de cavaliers charger en ligne serrée et tirer à l'unisson des fusils anciens, les moukahla, jugés autant sur la précision de ce tir commun unique que sur l'équitation.|フランス植民地時代の呼び名「ファンタジア」でも知られるトブーリダは、隊列を組んだ騎手たちが一斉に突撃し、ムーカハラと呼ばれる古式銃を寸分違わぬ瞬間に空へ撃つ演武で、乗馬の技量と同じくらい、その一斉射撃の揃い方が審査される。",
  ),
  q(
    8,
    "In many European languages, the country's name — Morocco, Marruecos, Maroc — derives from the name of which Moroccan city?|En muchos idiomas europeos, el nombre del país —Morocco, Marruecos, Maroc— deriva del nombre de qué ciudad marroquí?|Dans de nombreuses langues européennes, le nom du pays — Morocco, Marruecos, Maroc — dérive du nom de quelle ville marocaine ?|多くのヨーロッパの言語での国名(Morocco、Marruecos、Marocなど)は、モロッコのどの都市名に由来するか?",
    ["Marrakesh|Marrakech|Marrakech|マラケシュ", "Fez|Fez|Fès|フェズ", "Rabat|Rabat|Rabat|ラバト"],
    0,
    "European traders and geographers came to refer to the whole kingdom by the name of Marrakesh, its influential capital for long stretches of Almoravid and Almohad rule, and the shortened form stuck in language after language even once the political capital moved elsewhere.|Comerciantes y geógrafos europeos empezaron a referirse a todo el reino con el nombre de Marrakech, su influyente capital durante largos periodos del dominio almorávide y almohade, y la forma abreviada se quedó en un idioma tras otro.|Marchands et géographes européens en vinrent à désigner tout le royaume par le nom de Marrakech, sa capitale influente durant de longues périodes de domination almoravide et almohade, et la forme abrégée s'est fixée langue après langue.|ヨーロッパの商人や地理学者は、ムラービト朝・ムワッヒド朝の時代に長く有力な首都だったマラケシュの名で王国全体を呼ぶようになり、その短縮形が政治的な首都が別の場所へ移ったあとも言語から言語へと定着した。",
  ),
  q(
    8,
    "What is the name of the roughly 100-metre waterfall near Azilal in the Middle Atlas, one of the tallest in North Africa?|¿Cómo se llama la cascada de unos 100 metros cerca de Azilal, en el Atlas Medio, una de las más altas del norte de África?|Comment s'appelle la cascade d'environ 100 mètres près d'Azilal, dans le Moyen Atlas, l'une des plus hautes d'Afrique du Nord ?|中部アトラス、アジラル近郊にある高さ約100メートルの滝で、北アフリカ屈指の高さを誇るものの名は?",
    ["Victoria Falls|Cataratas Victoria|Chutes Victoria|ヴィクトリアの滝", "Ouzoud Falls|Cascadas de Ouzoud|Cascades d'Ouzoud|ウズーの滝", "Angel Falls|Salto Ángel|Chute Angel|エンジェルフォール"],
    1,
    "The Ouzoud Falls drop in tiers down red sandstone cliffs into a river gorge, and a permanent mist at the base has created a microclimate lush enough to support olive groves right at the falls' edge, an unusual sight this close to the Atlas plateau.|Las cascadas de Ouzoud caen en escalones por acantilados de arenisca roja hacia un cañón fluvial, y una neblina permanente en la base ha creado un microclima lo bastante exuberante para sostener olivares justo al borde de la cascada.|Les chutes d'Ouzoud tombent en paliers le long de falaises de grès rouge dans les gorges d'une rivière, et une brume permanente à leur pied a créé un microclimat assez luxuriant pour abriter des oliveraies au bord même des chutes.|ウズーの滝は赤い砂岩の崖を段状に流れ落ちて渓谷の川に注ぎ、滝壺に絶えず立つ霧が生んだ湿潤な微気候のおかげで、滝のすぐ縁にまでオリーブ畑が育つという、アトラス高原に近いにしては珍しい光景が見られる。",
  ),
  q(
    8,
    "Why is red traditionally described as Morocco's royal colour, reflected in the flag's background?|¿Por qué se describe tradicionalmente el rojo como el color real de Marruecos, reflejado en el fondo de la bandera?|Pourquoi le rouge est-il traditionnellement décrit comme la couleur royale du Maroc, reflétée dans le fond du drapeau ?|モロッコで赤が伝統的に王家の色とされ、国旗の地色に反映されている理由は?",
    ["It was the colour used by the ruling Alaouite dynasty's banners|Era el color usado en los estandartes de la dinastía alauita gobernante|C'était la couleur utilisée sur les bannières de la dynastie alaouite régnante|統治するアラウィー朝の旗印に使われていた色だから", "It represents the desert sand at sunset|Representa la arena del desierto al atardecer|Elle représente le sable du désert au coucher du soleil|夕暮れの砂漠の砂を表すから", "It was chosen by the French protectorate in 1912|Lo eligió el protectorado francés en 1912|Elle fut choisie par le protectorat français en 1912|1912年にフランス保護領が選んだから"],
    0,
    "Plain red had marked Moroccan sovereignty since at least the 17th century under the Alaouite dynasty, well before the green star was added in 1915, so the flag's field is older than the emblem sitting on top of it.|El rojo liso marcaba la soberanía marroquí desde al menos el siglo XVII bajo la dinastía alauita, mucho antes de que se añadiera la estrella verde en 1915, así que el campo de la bandera es más antiguo que el emblema que lleva encima.|Le rouge uni marquait la souveraineté marocaine depuis au moins le XVIIe siècle sous la dynastie alaouite, bien avant l'ajout de l'étoile verte en 1915, si bien que le fond du drapeau est plus ancien que l'emblème qui y figure.|無地の赤は少なくとも17世紀のアラウィー朝の時代からモロッコの主権を示す色であり、1915年に緑の星が加えられるよりずっと前からのもので、旗の地色はその上に置かれた紋章よりも古い。",
  ),
];
