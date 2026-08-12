/**
 * マレーシアのクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 都市カード(42件)が扱う具体的な事実(KLの地名由来とペトロナスタワー、
 * ジョージタウンの開港とクラン・ジェティ、マラッカの3列強支配、クチンの
 * 「猫」、コタキナバルのアキ・ナバルなど)はここでは問わない。国全体の
 * 地理・歴史・食文化・自然・現代の暮らしなど、都市カードが触れていない
 * 主題を選んである。
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

export const MALAYSIA_QUIZ = [
  q(
    1,
    "What is the official currency of Malaysia?|¿Cuál es la moneda oficial de Malasia?|Quelle est la monnaie officielle de la Malaisie ?|マレーシアの公式通貨は?",
    ["The rupiah|La rupia|La roupie|ルピア", "The baht|El baht|Le baht|バーツ", "The ringgit|El ringgit|Le ringgit|リンギット"],
    2,
    "The ringgit's name comes from the Malay word for 'jagged,' originally describing the serrated edges of old Spanish silver dollars that once circulated widely in the region.|El nombre del ringgit viene de la palabra malaya para «dentado», que originalmente describía los bordes serrados de los antiguos dólares de plata españoles que circulaban por la región.|Le nom du ringgit vient du mot malais pour « dentelé », décrivant à l'origine les bords crénelés des anciens dollars d'argent espagnols qui circulaient jadis dans la région.|「リンギット」の名は「ギザギザの」を意味するマレー語に由来し、もともとはこの地域で広く流通していた古いスペイン銀貨の鋸歯状の縁を指す言葉だった。",
  ),
  q(
    1,
    "Malaysia is made up of Peninsular Malaysia and part of which large island?|Malasia está formada por la Malasia peninsular y parte de qué isla grande?|La Malaisie est composée de la Malaisie péninsulaire et d'une partie de quelle grande île ?|マレーシアは半島部と、ある大きな島の一部からなる。その島とは?",
    ["Sumatra|Sumatra|Sumatra|スマトラ島", "New Guinea|Nueva Guinea|Nouvelle-Guinée|ニューギニア島", "Borneo|Borneo|Bornéo|ボルネオ島"],
    2,
    "Malaysia occupies the states of Sabah and Sarawak on Borneo, sharing the island with Indonesian Kalimantan and the small sultanate of Brunei.|Malasia ocupa los estados de Sabah y Sarawak en Borneo, compartiendo la isla con el Kalimantan indonesio y el pequeño sultanato de Brunéi.|La Malaisie occupe les États de Sabah et Sarawak à Bornéo, partageant l'île avec le Kalimantan indonésien et le petit sultanat de Brunei.|マレーシアはボルネオ島のサバ州とサラワク州を占めており、インドネシア領カリマンタンと小さなブルネイ王国とこの島を分け合っている。",
  ),
  q(
    2,
    "What is Malaysia's national flower?|¿Cuál es la flor nacional de Malasia?|Quelle est la fleur nationale de la Malaisie ?|マレーシアの国花は?",
    ["The lotus|El loto|Le lotus|ハス", "The hibiscus|El hibisco|L'hibiscus|ハイビスカス", "The tulip|El tulipán|La tulipe|チューリップ"],
    1,
    "The red hibiscus, bunga raya, was declared the national flower in 1960, its five petals said to represent the five principles of the national ideology, Rukun Negara.|El hibisco rojo, bunga raya, fue declarado flor nacional en 1960, y se dice que sus cinco pétalos representan los cinco principios de la ideología nacional, Rukun Negara.|L'hibiscus rouge, bunga raya, fut déclaré fleur nationale en 1960, ses cinq pétales étant censés représenter les cinq principes de l'idéologie nationale, le Rukun Negara.|赤いハイビスカス「ブンガ・ラヤ」は1960年に国花として定められ、その5枚の花びらは国是「ルクヌガラ」の5原則を表すとされる。",
  ),
  q(
    2,
    "What is a traditional stilt-raised Malay village house called?|¿Cómo se llama la tradicional casa malaya de pueblo sobre pilotes?|Comment appelle-t-on la traditionnelle maison de village malaise sur pilotis ?|マレーの伝統的な高床式の村家屋を何と呼ぶか?",
    ["An igloo|Un iglú|Un igloo|イグルー", "A rumah kampung|Una rumah kampung|Une rumah kampung|ルマ・カンポン", "A yurt|Una yurta|Une yourte|ゲル(移動式住居)"],
    1,
    "Raising the house on wooden or bamboo stilts keeps it above floodwater and lets air circulate underneath in the tropical heat, and the space below is often used for storage or as shaded daytime living space.|Elevar la casa sobre pilotes de madera o bambú la mantiene por encima del agua de las inundaciones y deja circular el aire por debajo en el calor tropical, y el espacio inferior suele usarse como almacén o zona de estar sombreada.|Surélever la maison sur des pilotis de bois ou de bambou la maintient au-dessus des eaux de crue et laisse l'air circuler en dessous dans la chaleur tropicale, l'espace inférieur servant souvent de rangement ou d'espace de vie ombragé.|木や竹の杭で家を高く上げることで洪水の水面より上に保ち、熱帯の暑さの中で床下に風を通す。床下の空間は物置や日陰の憩いの場として使われることも多い。",
  ),
  q(
    3,
    "How many states make up Malaysia, not counting its federal territories?|¿Cuántos estados componen Malasia, sin contar sus territorios federales?|Combien d'États composent la Malaisie, sans compter ses territoires fédéraux ?|連邦直轄領を除くと、マレーシアはいくつの州からなるか?",
    ["9|9|9|9", "13|13|13|13", "20|20|20|20"],
    1,
    "Malaysia has 13 states, 11 on the peninsula and Sabah and Sarawak on Borneo, plus three federal territories (Kuala Lumpur, Putrajaya, and Labuan) that belong to none of them.|Malasia tiene 13 estados, 11 en la península y Sabah y Sarawak en Borneo, además de tres territorios federales (Kuala Lumpur, Putrajaya y Labuán) que no pertenecen a ninguno de ellos.|La Malaisie compte 13 États, 11 sur la péninsule et Sabah et Sarawak à Bornéo, plus trois territoires fédéraux (Kuala Lumpur, Putrajaya et Labuan) qui n'appartiennent à aucun d'eux.|マレーシアは13州からなり、半島に11州、ボルネオにサバ州とサラワク州がある。これに加え、いずれの州にも属さない3つの連邦直轄領(クアラルンプール・プトラジャヤ・ラブアン)がある。",
  ),
  q(
    3,
    "Which rice dish cooked in coconut milk and pandan leaf, served with sambal and anchovies, is considered Malaysia's national breakfast?|¿Qué plato de arroz cocido en leche de coco y hoja de pandán, servido con sambal y anchoas, se considera el desayuno nacional de Malasia?|Quel plat de riz cuit dans du lait de coco et de la feuille de pandan, servi avec sambal et anchois, est considéré comme le petit-déjeuner national de la Malaisie ?|ココナッツミルクとパンダンリーフで炊いた米にサンバルとイワシを添える、マレーシアの国民的朝食とされる料理は?",
    ["Pad thai|Pad thai|Pad thai|パッタイ", "Nasi lemak|Nasi lemak|Nasi lemak|ナシレマ", "Pho|Pho|Pho|フォー"],
    1,
    "Nasi lemak was originally a farmer's breakfast eaten by hand wrapped in banana leaf, and is now sold around the clock from street stalls to fine-dining restaurants across the country.|El nasi lemak fue originalmente un desayuno campesino que se comía con la mano envuelto en hoja de plátano, y ahora se vende a todas horas desde puestos callejeros hasta restaurantes de alta cocina.|Le nasi lemak était à l'origine un petit-déjeuner de paysan mangé à la main enveloppé dans une feuille de bananier, et se vend aujourd'hui à toute heure, des étals de rue aux restaurants gastronomiques.|ナシレマはもともと、バナナの葉に包んで手で食べる農民の朝食だったが、いまでは屋台から高級レストランまで一日じゅう売られている。",
  ),
  q(
    3,
    "Grab, the ride-hailing and delivery app used across Southeast Asia, was originally founded in which country in 2012?|¿En qué país se fundó originalmente en 2012 Grab, la app de transporte y reparto usada en todo el sudeste asiático?|Dans quel pays Grab, l'application de VTC et de livraison utilisée dans toute l'Asie du Sud-Est, fut-elle fondée en 2012 ?|東南アジア各地で使われる配車・配達アプリ「Grab」は、2012年にどの国で創業したか?",
    ["Malaysia|Malasia|Malaisie|マレーシア", "Singapore|Singapur|Singapour|シンガポール", "Indonesia|Indonesia|Indonésie|インドネシア"],
    0,
    "Grab began in 2012 as MyTeksi, a taxi-booking app started in Kuala Lumpur by two Harvard Business School classmates, before relocating its headquarters to Singapore in 2014 as it expanded regionally.|Grab comenzó en 2012 como MyTeksi, una app de reserva de taxis creada en Kuala Lumpur por dos compañeros de la Harvard Business School, antes de trasladar su sede a Singapur en 2014 al expandirse por la región.|Grab débuta en 2012 sous le nom de MyTeksi, une appli de réservation de taxis lancée à Kuala Lumpur par deux camarades de la Harvard Business School, avant de transférer son siège à Singapour en 2014 en s'étendant dans la région.|Grabは2012年、ハーバード・ビジネス・スクールの同級生2人がクアラルンプールで立ち上げたタクシー配車アプリ「MyTeksi」として始まり、地域展開に伴い2014年に本社をシンガポールへ移した。",
  ),
  q(
    4,
    "Which sport, played with a shuttlecock, is Malaysia's most successful at the Olympic and international level?|¿En qué deporte, jugado con un volante, ha tenido Malasia más éxito a nivel olímpico e internacional?|Dans quel sport, joué avec un volant, la Malaisie a-t-elle le plus de succès aux niveaux olympique et international ?|マレーシアがオリンピック・国際大会で最も成功を収めてきた、シャトルを使う競技は?",
    ["Table tennis|Tenis de mesa|Tennis de table|卓球", "Badminton|Bádminton|Badminton|バドミントン", "Squash|Squash|Squash|スカッシュ"],
    1,
    "Malaysia has won Olympic silver in badminton five times without yet taking gold, and former world number one Lee Chong Wei, who came agonizingly close on three occasions, remains one of the country's most recognized athletes.|Malasia ha ganado plata olímpica en bádminton cinco veces sin conseguir aún el oro, y el excampeón mundial Lee Chong Wei, que estuvo angustiosamente cerca en tres ocasiones, sigue siendo uno de los atletas más reconocidos del país.|La Malaisie a remporté cinq fois l'argent olympique en badminton sans encore décrocher l'or, et l'ancien numéro un mondial Lee Chong Wei, passé tout près à trois reprises, reste l'un des athlètes les plus reconnus du pays.|マレーシアはバドミントンでオリンピック銀メダルを5回獲得しているが、まだ金メダルには届いていない。3度にわたり惜しくも金を逃した元世界ランキング1位のリー・チョンウェイは、いまも国内屈指の知名度を誇るアスリートである。",
  ),
  q(
    4,
    "Malaysia's head of state, elected on a rotating basis among nine hereditary state rulers, holds what title?|¿Qué título tiene el jefe de Estado de Malasia, elegido de forma rotatoria entre nueve gobernantes hereditarios estatales?|Quel titre porte le chef de l'État malaisien, élu de façon tournante parmi neuf souverains héréditaires d'État ?|9人の世襲の州君主のあいだで持ち回りで選ばれる、マレーシアの国家元首の称号は?",
    ["The Yang di-Pertuan Agong|El Yang di-Pertuan Agong|Le Yang di-Pertuan Agong|ヤン・ディプルトゥアン・アゴン", "The Shah|El sah|Le chah|シャー", "The Emir|El emir|L'émir|首長(エミール)"],
    0,
    "The nine hereditary rulers of Malaysia's Malay states elect one of their own to serve a five-year term as Agong, a unique rotating constitutional monarchy found nowhere else in the world.|Los nueve gobernantes hereditarios de los estados malayos de Malasia eligen a uno de los suyos para un mandato de cinco años como Agong, una monarquía constitucional rotatoria única en el mundo.|Les neuf souverains héréditaires des États malais de Malaisie élisent l'un des leurs pour un mandat de cinq ans en tant qu'Agong, une monarchie constitutionnelle tournante unique au monde.|マレーシアの9つのマレー系州の世襲君主たちは、その中の一人を5年任期のアゴンとして選出する。世界に類を見ない持ち回り式の立憲君主制である。",
  ),
  q(
    4,
    "Which crop makes Malaysia one of the world's two largest producers, used in everything from cooking oil to cosmetics?|¿Qué cultivo convierte a Malasia en uno de los dos mayores productores del mundo, usado en de todo, desde aceite de cocina hasta cosméticos?|Quelle culture fait de la Malaisie l'un des deux plus grands producteurs mondiaux, utilisée aussi bien dans l'huile de cuisine que les cosmétiques ?|食用油から化粧品まであらゆるものに使われ、マレーシアを世界2大生産国の一つにしている作物は?",
    ["Palm oil|Aceite de palma|Huile de palme|パーム油", "Coffee|Café|Café|コーヒー", "Cotton|Algodón|Coton|綿花"],
    0,
    "Malaysia and neighboring Indonesia together produce the vast majority of the world's palm oil, and vast plantations now cover land that a century ago was mostly rubber estates and rainforest.|Malasia y la vecina Indonesia producen juntas la inmensa mayoría del aceite de palma mundial, y vastas plantaciones cubren hoy tierras que hace un siglo eran mayormente cauchales y selva.|La Malaisie et l'Indonésie voisine produisent ensemble l'immense majorité de l'huile de palme mondiale, et de vastes plantations couvrent aujourd'hui des terres qui, il y a un siècle, étaient surtout des hévéraies et de la forêt tropicale.|マレーシアと隣国インドネシアは合わせて世界のパーム油の大半を生産しており、いまや広大なプランテーションが、一世紀前はゴム農園と雨林だった土地を覆っている。",
  ),
  q(
    4,
    "The world's largest single flower, found in Borneo's rainforests and smelling of rotting meat to attract flies, is called what?|¿Cómo se llama la flor individual más grande del mundo, hallada en las selvas de Borneo y que huele a carne podrida para atraer moscas?|Comment s'appelle la plus grande fleur unique au monde, trouvée dans les forêts tropicales de Bornéo et sentant la viande pourrie pour attirer les mouches ?|ボルネオの雨林に生え、ハエを引き寄せるため腐肉のような匂いを放つ、世界最大の一輪花の名は?",
    ["The rafflesia|La rafflesia|Le rafflesia|ラフレシア", "The orchid|La orquídea|L'orchidée|ラン", "The lotus|El loto|Le lotus|ハス"],
    0,
    "A rafflesia flower can grow to over a metre across and takes up to nine months to bloom, but the bloom itself lasts only about a week before rotting away, making a sighting a matter of luck and timing.|Una flor de rafflesia puede superar el metro de diámetro y tarda hasta nueve meses en florecer, pero la flor en sí dura solo cerca de una semana antes de pudrirse, así que verla es cuestión de suerte y momento.|Une fleur de rafflesia peut dépasser un mètre de diamètre et met jusqu'à neuf mois à fleurir, mais la floraison elle-même ne dure qu'une semaine environ avant de pourrir, ce qui fait d'une observation une question de chance et de timing.|ラフレシアの花は直径1メートルを超えることもあり、開花までに9か月もかかるが、花自体は腐って萎れるまでわずか1週間ほどしかもたないため、見られるかどうかは運とタイミング次第である。",
  ),
  q(
    5,
    "In what year did Malaya gain independence from Britain?|¿En qué año Malaya obtuvo la independencia de Gran Bretaña?|En quelle année la Malaisie (Malaya) obtint-elle son indépendance de la Grande-Bretagne ?|マラヤがイギリスから独立したのは何年か?",
    ["1945|1945|1945|1945年", "1957|1957|1957|1957年", "1970|1970|1970|1970年"],
    1,
    "Independence, Merdeka, was declared on 31 August 1957, six years before Sabah, Sarawak, and Singapore joined to form the wider federation of Malaysia in 1963.|La independencia, Merdeka, se declaró el 31 de agosto de 1957, seis años antes de que Sabah, Sarawak y Singapur se unieran para formar la federación más amplia de Malasia en 1963.|L'indépendance, Merdeka, fut déclarée le 31 août 1957, six ans avant que le Sabah, le Sarawak et Singapour ne se joignent pour former la fédération plus large de la Malaisie en 1963.|独立(ムルデカ)は1957年8月31日に宣言された。サバ・サラワク・シンガポールが加わってより広いマレーシア連邦が成立する1963年の6年前である。",
  ),
  q(
    5,
    "What tea drink, poured back and forth between two vessels to build a thick froth, is a coffee-shop staple across Malaysia?|¿Qué bebida de té, vertida de un lado a otro entre dos recipientes para crear espuma espesa, es un básico de las cafeterías malasias?|Quelle boisson à base de thé, versée d'un récipient à l'autre pour créer une mousse épaisse, est un classique des cafés malaisiens ?|2つの容器のあいだで注ぎ移して濃い泡を作る、マレーシアの喫茶店の定番の紅茶飲料は?",
    ["Teh tarik|Teh tarik|Teh tarik|テタレ(引っぱり茶)", "Bubble tea|Té de burbujas|Thé aux perles|タピオカミルクティー", "Matcha latte|Latte de matcha|Latte au matcha|抹茶ラテ"],
    0,
    "Teh tarik, literally 'pulled tea,' is made by pouring strong black tea and condensed milk between two cups held at arm's length apart, a technique that cools the drink and builds a foamy head, often performed as a small showmanship act.|El teh tarik, «té tirado», se prepara vertiendo té negro fuerte y leche condensada entre dos tazas sostenidas a la distancia de un brazo, técnica que enfría la bebida y crea espuma, a menudo como pequeño espectáculo.|Le teh tarik, littéralement « thé tiré », se prépare en versant du thé noir fort et du lait concentré entre deux tasses tenues à bout de bras, une technique qui refroidit la boisson et crée une mousse, souvent en petit numéro de démonstration.|「テ・タリッ(引っぱり茶)」は、濃い紅茶とコンデンスミルクを腕を伸ばした距離の2つのカップのあいだで注ぎ移して作られる。この技法で飲み物が冷め、濃い泡が立つ。ちょっとした見世物として披露されることも多い。",
  ),
  q(
    5,
    "Which of these is NOT one of Malaysia's three largest ethnic communities?|¿Cuál de estas NO es una de las tres mayores comunidades étnicas de Malasia?|Laquelle de ces communautés N'EST PAS l'une des trois plus grandes de Malaisie ?|次のうち、マレーシアの三大民族集団に含まれないのはどれか?",
    ["Korean|Coreana|Coréenne|韓国系", "Chinese|China|Chinoise|中国系", "Indian|India|Indienne|インド系"],
    0,
    "Malays and other indigenous groups (bumiputera) make up roughly two-thirds of the population, followed by Malaysians of Chinese and then Indian descent, communities whose ancestors mostly arrived over the 19th and early 20th centuries.|Los malayos y otros grupos indígenas (bumiputera) forman en torno a dos tercios de la población, seguidos de malasios de ascendencia china y luego india, comunidades cuyos antepasados llegaron sobre todo en los siglos XIX y principios del XX.|Les Malais et autres groupes autochtones (bumiputera) forment environ les deux tiers de la population, suivis des Malaisiens d'ascendance chinoise puis indienne, communautés dont les ancêtres arrivèrent surtout aux XIXe et début du XXe siècles.|マレー系とその他の先住民族(ブミプトラ)が人口のおよそ3分の2を占め、次いで中国系、インド系のマレーシア人が続く。これらの人々の祖先は主に19世紀から20世紀初頭にかけて渡ってきた。",
  ),
  q(
    6,
    "Which primate, found only on Borneo, is known for its long, drooping nose?|¿Qué primate, hallado solo en Borneo, es conocido por su nariz larga y colgante?|Quel primate, que l'on ne trouve qu'à Bornéo, est connu pour son long nez pendant ?|ボルネオ島にしか生息せず、長く垂れ下がった鼻で知られる霊長類は?",
    ["The proboscis monkey|El mono narigudo|Le nasique|テングザル", "The orangutan|El orangután|L'orang-outan|オランウータン", "The gibbon|El gibón|Le gibbon|テナガザル"],
    0,
    "Male proboscis monkeys grow the largest noses, thought to amplify their calls and signal dominance to rivals, and the species spends much of its life in mangrove and riverine forest, often swimming between feeding grounds.|Los machos de mono narigudo desarrollan las narices más grandes, que se cree amplifican sus llamadas y señalan dominancia ante rivales, y la especie pasa buena parte de su vida en manglares y bosques ribereños, a menudo nadando entre zonas de alimentación.|Les mâles nasiques développent les plus gros nez, censés amplifier leurs cris et signaler leur dominance aux rivaux, et l'espèce passe une grande partie de sa vie en mangrove et forêt riveraine, nageant souvent entre zones de nourrissage.|テングザルはオスほど鼻が大きく発達し、これが鳴き声を増幅させライバルへの優位の誇示になると考えられている。この種はマングローブや河畔林で多くの時間を過ごし、餌場のあいだを泳いで移動することも多い。",
  ),
  q(
    6,
    "What script, based on Arabic letters, was historically used to write the Malay language before Roman script became standard?|¿Qué escritura, basada en letras árabes, se usaba históricamente para escribir malayo antes de que el alfabeto latino se hiciera estándar?|Quelle écriture, fondée sur les lettres arabes, servait historiquement à transcrire le malais avant que l'alphabet latin ne devienne la norme ?|ローマ字が標準になる前、マレー語を書くのに歴史的に使われていたアラビア文字ベースの文字は?",
    ["Jawi|Yawi|Jawi|ジャウィ文字", "Cyrillic|Cirílico|Cyrillique|キリル文字", "Devanagari|Devanagari|Devanagari|デーヴァナーガリー文字"],
    0,
    "Jawi arrived with Islam from around the 14th century and remained the main way of writing Malay for centuries, and it is still taught in religious schools and appears alongside Roman script on some road signs, especially in Kelantan and Terengganu.|El jawi llegó con el islam hacia el siglo XIV y siguió siendo la principal forma de escribir malayo durante siglos, y aún se enseña en escuelas religiosas y aparece junto al alfabeto latino en algunas señales, sobre todo en Kelantan y Terengganu.|Le jawi arriva avec l'islam vers le XIVe siècle et resta la principale façon d'écrire le malais pendant des siècles, encore enseigné dans les écoles religieuses et présent aux côtés de l'alphabet latin sur certains panneaux, surtout au Kelantan et au Terengganu.|ジャウィ文字は14世紀頃イスラムとともに伝わり、その後何世紀にもわたりマレー語を書く主な手段であり続けた。いまも宗教学校で教えられ、特にクランタン州やトレンガヌ州の一部の道路標識ではローマ字と並んで使われている。",
  ),
  q(
    6,
    "Malaysia's parliament and government buildings are located in a purpose-built administrative city just south of Kuala Lumpur, called what?|¿Cómo se llama la ciudad administrativa construida específicamente al sur de Kuala Lumpur donde están el parlamento y el gobierno de Malasia?|Comment s'appelle la ville administrative construite spécialement au sud de Kuala Lumpur où siègent le Parlement et le gouvernement malaisiens ?|クアラルンプールの南に一から建設された、マレーシアの議会・政府機能が置かれた行政都市の名は?",
    ["Putrajaya|Putrajaya|Putrajaya|プトラジャヤ", "Brasília|Brasilia|Brasília|ブラジリア", "Canberra|Canberra|Canberra|キャンベラ"],
    0,
    "Construction of Putrajaya began in 1995 on former oil-palm land, and while parliament itself remains in Kuala Lumpur, most federal ministries and the prime minister's office moved to Putrajaya from 1999 onward.|La construcción de Putrajaya comenzó en 1995 sobre antiguas tierras de palma aceitera, y aunque el parlamento sigue en Kuala Lumpur, la mayoría de los ministerios federales y la oficina del primer ministro se trasladaron a Putrajaya desde 1999.|La construction de Putrajaya débuta en 1995 sur d'anciennes terres de palmiers à huile, et si le Parlement lui-même reste à Kuala Lumpur, la plupart des ministères fédéraux et le bureau du Premier ministre déménagèrent à Putrajaya à partir de 1999.|プトラジャヤの建設は1995年、旧アブラヤシ農園の跡地で始まった。議会自体はクアラルンプールに残っているが、連邦政府の各省庁と首相府の多くは1999年以降プトラジャヤへ移転した。",
  ),
  q(
    6,
    "Despite spanning roughly 20 degrees of longitude between the peninsula and Borneo, how many time zones does Malaysia officially use?|¿Cuántas zonas horarias usa oficialmente Malasia, pese a abarcar unos 20 grados de longitud entre la península y Borneo?|Bien qu'elle s'étende sur environ 20 degrés de longitude entre la péninsule et Bornéo, combien de fuseaux horaires la Malaisie utilise-t-elle officiellement ?|半島とボルネオのあいだで経度にしておよそ20度も広がっているにもかかわらず、マレーシアが公式に使う標準時はいくつか?",
    ["Just one|Solo una|Un seul|1つだけ", "Two|Dos|Deux|2つ", "Three|Tres|Trois|3つ"],
    0,
    "Malaysia unified Peninsular and East Malaysia onto a single time zone, UTC+8, in 1982, which means the sun rises and sets roughly half an hour later by the clock in Sabah and Sarawak than the solar time would suggest.|Malasia unificó la Malasia peninsular y la oriental en una sola zona horaria, UTC+8, en 1982, lo que hace que el sol salga y se ponga en el reloj media hora más tarde de lo que sugeriría la hora solar en Sabah y Sarawak.|La Malaisie unifia la Malaisie péninsulaire et orientale sur un seul fuseau horaire, UTC+8, en 1982, ce qui fait que le soleil se lève et se couche à l'horloge environ une demi-heure plus tard que ne le suggérerait l'heure solaire au Sabah et au Sarawak.|マレーシアは1982年、半島部と東マレーシアを単一の標準時UTC+8に統一した。このため、サバ州やサラワク州では時計上の日の出・日の入りが、太陽の位置が示す時刻よりおよそ30分遅くなる。",
  ),
  q(
    7,
    "Traditional Malay fabric woven with gold or silver threads, worn for weddings and formal royal occasions, is called what?|¿Cómo se llama el tejido malayo tradicional entretejido con hilos de oro o plata, usado en bodas y ocasiones reales formales?|Comment appelle-t-on le tissu malais traditionnel tissé de fils d'or ou d'argent, porté pour les mariages et les occasions royales officielles?|婚礼や公式の王室行事で身につける、金糸や銀糸を織り込んだマレーの伝統織物の名は?",
    ["Batik|Batik|Batik|バティック", "Songket|Songket|Songket|ソンケット", "Ikat|Ikat|Ikat|イカット"],
    1,
    "Songket weaving, historically centred in Terengganu and Kelantan, uses a supplementary weft technique to work metallic thread directly into the base cloth, and a single formal piece can take a skilled weaver weeks to finish by hand.|El tejido songket, centrado históricamente en Terengganu y Kelantan, usa una técnica de trama suplementaria para tejer hilo metálico directamente en la tela base, y una pieza formal puede tardar semanas en terminarse a mano.|Le tissage songket, historiquement centré au Terengganu et au Kelantan, utilise une technique de trame supplémentaire pour tisser du fil métallique directement dans le tissu de base, et une pièce formelle peut demander des semaines de travail manuel.|ソンケット織りは歴史的にトレンガヌ州とクランタン州を中心に発達し、地の布に金属糸を直接織り込む「補緯」技法を使う。正装用の一枚を仕上げるのに、熟練の織り手でも何週間もかかることがある。",
  ),
  q(
    7,
    "The Petronas Twin Towers were, for several years after 1998, the tallest buildings in the world, before being surpassed by which structure in 2004?|¿Las Torres Petronas fueron, durante varios años tras 1998, los edificios más altos del mundo, hasta ser superadas en 2004 por cuál estructura?|Les tours Petronas furent, pendant plusieurs années après 1998, les plus hauts bâtiments du monde, avant d'être dépassées en 2004 par quelle structure ?|ペトロナスツインタワーは1998年以降しばらく世界一の高さを誇ったが、2004年にどの建造物に抜かれたか?",
    ["The Shanghai Tower|La Torre de Shanghái|La tour de Shanghai|上海タワー", "Taipei 101|Taipei 101|Taipei 101|台北101", "One World Trade Center|Una World Trade Center|One World Trade Center|ワン・ワールド・トレード・センター"],
    1,
    "The Petronas Towers held the title by a measurement quirk, counting their decorative spires as part of the structure, and remain the tallest twin towers in the world even though several single towers have since grown taller.|Las Torres Petronas mantuvieron el título gracias a una peculiaridad de medición, al contar sus agujas decorativas como parte de la estructura, y siguen siendo las torres gemelas más altas del mundo aunque varias torres individuales las hayan superado desde entonces.|Les tours Petronas conservèrent ce titre grâce à une particularité de mesure, comptant leurs flèches décoratives dans la hauteur totale, et restent les plus hautes tours jumelles du monde même si plusieurs tours uniques les ont depuis dépassées.|ペトロナスタワーは、装飾用の尖塔部分も建物の高さに含めるという測定上の特例によってこの称号を保持した。単独の塔ではその後さらに高いものが現れたが、ツインタワーとしてはいまも世界一の高さである。",
  ),
  q(
    7,
    "Which sea separates Peninsular Malaysia from Sumatra, Indonesia, and has been a major trade route for over a thousand years?|¿Qué mar separa la Malasia peninsular de Sumatra, Indonesia, y ha sido una ruta comercial importante durante más de mil años?|Quelle mer sépare la Malaisie péninsulaire de Sumatra, en Indonésie, et constitue une route commerciale majeure depuis plus de mille ans ?|半島マレーシアとインドネシアのスマトラ島を隔て、千年以上にわたり主要な交易路であり続けてきた海は?",
    ["The Strait of Malacca|El estrecho de Malaca|Le détroit de Malacca|マラッカ海峡", "The Sunda Strait|El estrecho de la Sonda|Le détroit de la Sonde|スンダ海峡", "The Gulf of Thailand|El golfo de Tailandia|Le golfe de Thaïlande|タイ湾"],
    0,
    "The Strait of Malacca remains one of the busiest shipping lanes on Earth, carrying roughly a quarter of the world's traded goods by sea, including most of the oil shipped from the Middle East to East Asia.|El estrecho de Malaca sigue siendo una de las rutas marítimas más transitadas del mundo, transportando cerca de una cuarta parte de las mercancías comerciadas por mar, incluida la mayor parte del petróleo enviado de Oriente Medio a Asia Oriental.|Le détroit de Malacca reste l'une des voies maritimes les plus fréquentées au monde, transportant environ un quart des marchandises échangées par mer, dont la majeure partie du pétrole expédié du Moyen-Orient vers l'Asie de l'Est.|マラッカ海峡はいまも世界屈指の海運の要衝であり、世界の海上貿易のおよそ4分の1、中東から東アジアへ運ばれる石油の大半もここを通る。",
  ),
  q(
    8,
    "Mount Kinabalu, a UNESCO World Heritage Site, is the highest peak in Southeast Asia between which two landmasses?|El Monte Kinabalu, Patrimonio de la Humanidad, es el pico más alto del sudeste asiático entre qué dos masas de tierra?|Le mont Kinabalu, site du patrimoine mondial de l'UNESCO, est le plus haut sommet d'Asie du Sud-Est entre quelles deux masses continentales ?|世界遺産キナバル山は、どの二つの陸塊のあいだで東南アジア最高峰なのか?",
    ["The Himalayas and New Guinea|El Himalaya y Nueva Guinea|L'Himalaya et la Nouvelle-Guinée|ヒマラヤ山脈とニューギニア島", "The Alps and Japan|Los Alpes y Japón|Les Alpes et le Japon|アルプス山脈と日本", "The Andes and Australia|Los Andes y Australia|Les Andes et l'Australie|アンデス山脈とオーストラリア"],
    0,
    "At 4,095 metres, Kinabalu is taller than any peak in a vast stretch of Southeast Asia and is still slowly growing, rising by roughly 5 millimetres a year as tectonic forces push it upward.|Con 4.095 metros, el Kinabalu supera a cualquier pico en una vasta franja del sudeste asiático y aún crece lentamente, unos 5 milímetros al año por fuerzas tectónicas que lo empujan hacia arriba.|Avec 4 095 mètres, le Kinabalu dépasse tout sommet sur une vaste étendue d'Asie du Sud-Est et continue de croître lentement, d'environ 5 millimètres par an sous l'effet des forces tectoniques.|標高4095メートルのキナバル山は、東南アジアの広大な範囲でこれより高い山がないほど高く、いまも地殻の力に押し上げられて年に約5ミリずつ、ゆっくりと成長し続けている。",
  ),
  q(
    8,
    "Which spicy noodle soup, claimed in different styles by several regions, is considered one of Malaysia's national dishes?|¿Qué sopa de fideos picante, reclamada en distintos estilos por varias regiones, se considera uno de los platos nacionales de Malasia?|Quelle soupe de nouilles épicée, revendiquée sous différents styles par plusieurs régions, est considérée comme l'un des plats nationaux de la Malaisie ?|地域ごとに異なる流儀で「自分たちのものだ」と主張される、マレーシアの国民食の一つとされる辛い麺料理は?",
    ["Ramen|Ramen|Ramen|ラーメン", "Pho|Pho|Pho|フォー", "Laksa|Laksa|Laksa|ラクサ"],
    2,
    "CNN once named laksa one of the world's most delicious foods, and it exists in wildly different forms, from Penang's tangy, fish-based asam laksa to the coconut-milk-rich curry laksa found further south.|CNN nombró una vez al laksa uno de los platos más deliciosos del mundo, y existe en formas muy distintas, desde el ácido asam laksa a base de pescado de Penang hasta el curry laksa con leche de coco más al sur.|CNN a un jour nommé le laksa l'un des plats les plus délicieux au monde, et il existe sous des formes très différentes, du asam laksa acidulé à base de poisson de Penang au curry laksa riche en lait de coco plus au sud.|CNNはかつてラクサを世界で最も美味しい料理の一つに挙げた。ペナンの魚だしの酸味が効いたアッサムラクサから、もっと南のココナッツミルクたっぷりのカレーラクサまで、地域によって驚くほど違う形で存在する。",
  ),
  q(
    8,
    "Sarawak's rainforests hold some of the world's tallest tropical trees, one species of which can exceed 100 metres. What is it called?|Las selvas de Sarawak albergan algunos de los árboles tropicales más altos del mundo, una especie de los cuales puede superar los 100 metros. ¿Cómo se llama?|Les forêts tropicales du Sarawak abritent certains des plus grands arbres tropicaux au monde, une espèce pouvant dépasser 100 mètres. Comment s'appelle-t-elle ?|サラワクの雨林には世界屈指の高さを誇る熱帯樹があり、ある樹種は100メートルを超えることもある。その名は?",
    ["Yellow meranti|Meranti amarillo|Méranti jaune|イエローメランティ", "Giant sequoia|Secuoya gigante|Séquoia géant|セコイアメスギ", "Baobab|Baobab|Baobab|バオバブ"],
    0,
    "A yellow meranti in Sabah's Danum Valley, nicknamed Menara ('tower'), was measured at over 100 metres in 2019, making it the tallest known tropical tree on Earth at the time.|Un meranti amarillo en el valle de Danum, en Sabah, apodado Menara («torre»), fue medido en más de 100 metros en 2019, lo que lo convirtió en el árbol tropical conocido más alto del mundo en ese momento.|Un méranti jaune de la vallée de Danum, au Sabah, surnommé Menara (« tour »), fut mesuré à plus de 100 mètres en 2019, en faisant alors le plus grand arbre tropical connu au monde.|サバ州のダナムバレーにある「メナラ(塔)」と呼ばれるイエローメランティの木は、2019年に100メートルを超える高さで測定され、当時知られていた中で世界最高の熱帯樹となった。",
  ),
  q(
    9,
    "Which Bornean ethnic group is traditionally known for its longhouses and, historically, headhunting practices that ended under British rule?|¿Qué grupo étnico de Borneo es tradicionalmente conocido por sus casas largas y, históricamente, por prácticas de caza de cabezas que terminaron bajo el dominio británico?|Quel groupe ethnique de Bornéo est traditionnellement connu pour ses maisons longues et, historiquement, pour des pratiques de chasse aux têtes qui prirent fin sous domination britannique ?|ボルネオの民族集団で、伝統的に長屋(ロングハウス)と、イギリス統治下で終わった歴史的な首狩りの慣習で知られるのは?",
    ["The Iban|Los iban|Les Iban|イバン族", "The Peranakan|Los peranakan|Les Peranakan|プラナカン", "The Rungus|Los rungus|Les Rungus|ルングス族"],
    0,
    "The Iban are Sarawak's largest indigenous group, and while headhunting ended generations ago, longhouse life, with dozens of family units sharing one long communal building along a river, continues in many Iban communities today.|Los iban son el mayor grupo indígena de Sarawak, y aunque la caza de cabezas terminó hace generaciones, la vida en casas largas, con docenas de unidades familiares compartiendo un único edificio comunal junto a un río, continúa hoy en muchas comunidades iban.|Les Iban sont le plus grand groupe indigène du Sarawak, et si la chasse aux têtes a cessé depuis des générations, la vie en maison longue, avec des dizaines de foyers partageant un même bâtiment communautaire au bord d'une rivière, se poursuit dans de nombreuses communautés iban.|イバン族はサラワク州最大の先住民族で、首狩りは何世代も前に終わったが、川沿いに建つ一棟の共同家屋に何十もの家族単位が暮らすロングハウスでの生活は、いまも多くのイバンの共同体で続いている。",
  ),
  q(
    9,
    "Malaysia's national anthem, Negaraku, was adapted from a melody historically associated with which state?|¿El himno nacional de Malasia, Negaraku, se adaptó de una melodía asociada históricamente con qué estado?|L'hymne national de la Malaisie, Negaraku, fut adapté d'une mélodie historiquement associée à quel État ?|マレーシア国歌「ヌガラク」は、どの州にゆかりのある旋律から編曲されたものか?",
    ["Perak|Perak|Perak|ペラ州", "Johor|Johor|Johor|ジョホール州", "Sabah|Sabah|Sabah|サバ州"],
    0,
    "The tune traces back to Perak's state anthem, itself said to derive from a popular French or Indonesian-influenced melody called 'Terang Bulan,' and it was chosen for the new national anthem shortly before independence in 1957.|La melodía se remonta al himno estatal de Perak, a su vez derivado de una popular canción de influencia francesa o indonesia llamada «Terang Bulan», y se eligió como nuevo himno nacional poco antes de la independencia en 1957.|La mélodie remonte à l'hymne d'État du Perak, lui-même dérivé d'un air populaire d'influence française ou indonésienne appelé « Terang Bulan », et fut choisie comme nouvel hymne national peu avant l'indépendance en 1957.|この旋律はペラ州の州歌に由来し、その州歌自体はフランスまたはインドネシアの影響を受けた「トゥラン・ブラン」という流行歌から取られたとされる。1957年の独立直前、新しい国歌として選ばれた。",
  ),
  q(
    9,
    "Sarawak is nicknamed the 'Land of the Hornbills' after a bird that serves as its state symbol. Which family of birds is a hornbill?|Sarawak recibe el apodo de «Tierra de los Cálaos» por un ave que es su símbolo estatal. ¿A qué familia de aves pertenece el cálao?|Le Sarawak est surnommé « Terre des Calaos » d'après un oiseau qui est son symbole d'État. À quelle famille d'oiseaux appartient le calao ?|サラワク州は州の象徴である鳥にちなみ「サイチョウの国」と呼ばれる。サイチョウはどのような鳥のなかまか?",
    ["Large birds with oversized, often colourful beaks and a casque on top|Aves grandes con picos enormes, a menudo coloridos, y un casco encima|De grands oiseaux au bec surdimensionné, souvent coloré, surmonté d'un casque|大きく色鮮やかなくちばしと、その上に「カスク」と呼ばれる突起を持つ大型の鳥", "Small songbirds related to sparrows|Pequeñas aves cantoras emparentadas con los gorriones|De petits oiseaux chanteurs apparentés aux moineaux|スズメに近い小さな鳴禽類", "Flightless birds related to the ostrich|Aves no voladoras emparentadas con el avestruz|Des oiseaux incapables de voler, apparentés à l'autruche|ダチョウに近い飛べない鳥"],
    0,
    "The rhinoceros hornbill, Sarawak's specific state symbol, features in Iban and other Dayak ceremonial carvings and headdresses, and its large casque, a hollow structure atop the bill, is believed to amplify its call.|El cálao rinoceronte, símbolo estatal específico de Sarawak, aparece en tallas ceremoniales y tocados iban y de otros dayak, y se cree que su gran casco, una estructura hueca sobre el pico, amplifica su llamada.|Le calao rhinocéros, symbole d'État spécifique du Sarawak, figure dans les sculptures cérémonielles et coiffes iban et d'autres Dayak, et son grand casque, une structure creuse au sommet du bec, est censé amplifier son cri.|サラワク州の象徴であるサイチョウ(オナガサイチョウ)は、イバン族など多くのダヤク系の儀礼用の彫刻や頭飾りに登場する。くちばしの上にある中空の「カスク」と呼ばれる突起は、鳴き声を増幅させると考えられている。",
  ),
  q(
    10,
    "Malaysia's east coast state of Kelantan sits closest to which neighboring country's border?|El estado de Kelantan, en la costa este de Malasia, está más cerca de la frontera de qué país vecino?|L'État de Kelantan, sur la côte est de la Malaisie, est le plus proche de la frontière de quel pays voisin ?|マレーシア東海岸のクランタン州が最も近く接している隣国の国境は?",
    ["Thailand|Tailandia|Thaïlande|タイ", "Myanmar|Birmania|Birmanie|ミャンマー", "Cambodia|Camboya|Cambodge|カンボジア"],
    0,
    "Kelantan shares a land border with Thailand's Narathiwat province, and the frontier town of Rantau Panjang is known as a bustling cross-border market where Thai and Malaysian goods change hands daily.|Kelantan comparte frontera terrestre con la provincia tailandesa de Narathiwat, y la localidad fronteriza de Rantau Panjang es conocida como un bullicioso mercado transfronterizo donde a diario cambian de manos mercancías tailandesas y malasias.|Le Kelantan partage une frontière terrestre avec la province thaïlandaise de Narathiwat, et la ville-frontière de Rantau Panjang est connue comme un marché transfrontalier animé où marchandises thaïlandaises et malaisiennes changent de mains chaque jour.|クランタン州はタイのナラーティワート県と陸地の国境を接しており、国境の町ランタウパンジャンはタイとマレーシアの商品が日々やり取りされる活気ある越境市場として知られている。",
  ),
  q(
    2,
    "What is the name of Malaysia's national car brand, founded in 1983?|¿Cómo se llama la marca nacional de coches de Malasia, fundada en 1983?|Comment s'appelle la marque automobile nationale de la Malaisie, fondée en 1983 ?|1983年に設立されたマレーシアの国産自動車ブランドの名は?",
    ["Toyota|Toyota|Toyota|トヨタ", "BYD|BYD|BYD|BYD", "Proton|Proton|Proton|プロトン"],
    2,
    "Proton was set up as a state-led industrial project under Prime Minister Mahathir Mohamad, with early technical help from Mitsubishi, and its first car, the Proton Saga, went on sale in 1985 to become a common sight on Malaysian roads within a few years.|Proton se creó como proyecto industrial liderado por el Estado bajo el primer ministro Mahathir Mohamad, con ayuda técnica inicial de Mitsubishi, y su primer coche, el Proton Saga, salió a la venta en 1985.|Proton fut créée comme projet industriel dirigé par l'État sous le Premier ministre Mahathir Mohamad, avec l'aide technique initiale de Mitsubishi, et sa première voiture, la Proton Saga, fut mise en vente en 1985.|プロトンは首相マハティール・モハマドのもとで国家主導の産業事業として設立され、当初は三菱自動車の技術協力を受けた。最初の車種プロトン・サガは1985年に発売され、数年のうちにマレーシアの道路でよく見かける車になった。",
  ),
  q(
    3,
    "Malaysia was a founding member in 1967 of which regional organization, now headquartered in Jakarta?|¿Malasia fue miembro fundador en 1967 de qué organización regional, hoy con sede en Yakarta?|La Malaisie fut membre fondateur en 1967 de quelle organisation régionale, aujourd'hui basée à Jakarta ?|マレーシアが1967年に創設メンバーとなった、現在ジャカルタに本部を置く地域機構は?",
    ["The OPEC oil cartel|El cártel petrolero OPEP|Le cartel pétrolier de l'OPEP|OPEC(石油輸出国機構)", "ASEAN|la ASEAN|l'ASEAN|ASEAN(東南アジア諸国連合)", "The European Union|La Unión Europea|L'Union européenne|欧州連合"],
    1,
    "ASEAN was founded in Bangkok in 1967 by five countries, including Malaysia, aiming to promote regional stability during the Cold War, and has since grown to ten member states across Southeast Asia.|La ASEAN se fundó en Bangkok en 1967 con cinco países, entre ellos Malasia, con el objetivo de promover la estabilidad regional durante la Guerra Fría, y desde entonces ha crecido a diez estados miembros.|L'ASEAN fut fondée à Bangkok en 1967 par cinq pays, dont la Malaisie, visant à promouvoir la stabilité régionale pendant la guerre froide, et compte depuis dix États membres en Asie du Sud-Est.|ASEANは1967年、冷戦下の地域の安定を目的にマレーシアを含む5か国によってバンコクで設立され、その後東南アジア10か国が加盟する組織に成長した。",
  ),
  q(
    4,
    "What is the name of Malaysia's flag carrier airline, founded in 1947?|¿Cómo se llama la aerolínea de bandera de Malasia, fundada en 1947?|Comment s'appelle la compagnie aérienne nationale de la Malaisie, fondée en 1947 ?|1947年に設立された、マレーシアのフラッグキャリア航空会社の名は?",
    ["Cathay Pacific|Cathay Pacific|Cathay Pacific|キャセイパシフィック航空", "Garuda Indonesia|Garuda Indonesia|Garuda Indonesia|ガルーダ・インドネシア航空", "Malaysia Airlines|Malaysia Airlines|Malaysia Airlines|マレーシア航空"],
    2,
    "Malaysia Airlines began in 1947 as Malayan Airways, jointly owned at first by Singapore and Malaysian interests, and split into separate Malaysian and Singaporean carriers only in 1972 after the two countries' 1965 separation.|Malaysia Airlines comenzó en 1947 como Malayan Airways, de propiedad conjunta al principio de intereses de Singapur y Malasia, y se dividió en aerolíneas malasia y singapurense separadas solo en 1972.|Malaysia Airlines débuta en 1947 sous le nom de Malayan Airways, détenue conjointement au départ par des intérêts singapouriens et malaisiens, et ne se scinda en compagnies malaisienne et singapourienne distinctes qu'en 1972.|マレーシア航空は1947年、当初シンガポールとマレーシア双方の資本による共同所有の「マラヤン航空」として始まり、1972年になってようやくマレーシアとシンガポールそれぞれの航空会社に分かれた。",
  ),
  q(
    5,
    "What is the name for the traditional Malay shadow puppet theatre, performed with buffalo-hide puppets and an oil lamp?|¿Cómo se llama el teatro tradicional malayo de sombras, representado con marionetas de cuero de búfalo y una lámpara de aceite?|Comment appelle-t-on le théâtre d'ombres traditionnel malais, joué avec des marionnettes en peau de buffle et une lampe à huile ?|水牛の皮で作った人形と油灯を使って演じる、マレーの伝統的な影絵芝居の名は?",
    ["Kabuki|Kabuki|Kabuki|歌舞伎", "Wayang kulit|Wayang kulit|Wayang kulit|ワヤン・クリ", "Bunraku|Bunraku|Bunraku|文楽"],
    1,
    "Wayang kulit performances, most associated with Kelantan, can run all night, with a single puppeteer, the dalang, voicing every character while manipulating dozens of flat leather puppets against a backlit screen.|Las representaciones de wayang kulit, asociadas sobre todo a Kelantan, pueden durar toda la noche, con un único titiritero, el dalang, dando voz a todos los personajes mientras manipula docenas de marionetas planas de cuero contra una pantalla retroiluminada.|Les représentations de wayang kulit, surtout associées au Kelantan, peuvent durer toute la nuit, un seul marionnettiste, le dalang, donnant voix à tous les personnages tout en manipulant des dizaines de marionnettes plates en cuir devant un écran rétroéclairé.|クランタン州と特に結びつきの深いワヤン・クリの上演は一晩じゅう続くこともあり、たった一人の人形遣い「ダラン」がすべての登場人物の声を演じながら、背後から光を当てた幕に何十体もの平たい革人形を操る。",
  ),
  q(
    6,
    "Which metal, mined heavily in colonial-era Perak and Selangor, built much of Malaysia's early modern economy before rubber and palm oil took over?|¿Qué metal, extraído intensamente en la era colonial en Perak y Selangor, construyó buena parte de la economía moderna temprana de Malasia antes de que el caucho y el aceite de palma tomaran el relevo?|Quel métal, intensément extrait à l'époque coloniale au Perak et au Selangor, bâtit une grande partie de l'économie moderne naissante de la Malaisie avant que le caoutchouc et l'huile de palme ne prennent le relais ?|植民地時代のペラ州やスランゴール州で盛んに採掘され、ゴムとパーム油に取って代わられる前のマレーシア初期近代経済の多くを築いた金属は?",
    ["Gold|Oro|Or|金", "Tin|Estaño|Étain|錫", "Copper|Cobre|Cuivre|銅"],
    1,
    "Chinese and later European-run tin mines drew waves of immigrant labour to the peninsula's west coast from the mid-1800s, and towns like Ipoh, Taiping, and Kuala Lumpur itself all began life as tin-mining settlements.|Las minas de estaño, dirigidas primero por chinos y luego por europeos, atrajeron oleadas de mano de obra inmigrante a la costa oeste de la península desde mediados del siglo XIX, y ciudades como Ipoh, Taiping y la propia Kuala Lumpur nacieron como asentamientos mineros de estaño.|Les mines d'étain, d'abord dirigées par des Chinois puis par des Européens, attirèrent des vagues de main-d'œuvre immigrée sur la côte ouest de la péninsule dès le milieu du XIXe siècle, et des villes comme Ipoh, Taiping et Kuala Lumpur elle-même naquirent comme des implantations minières d'étain.|中国系、のちにヨーロッパ人が経営する錫鉱山は19世紀半ばから半島西海岸へ移民労働者の波を引き寄せ、イポーやタイピン、そしてクアラルンプール自体も錫採掘の集落として始まった。",
  ),
  q(
    2,
    "The Genting Highlands resort is reached from the valley below by which kind of transport, one of the fastest of its type in Southeast Asia?|¿Con qué medio de transporte, uno de los más rápidos de su tipo en el sudeste asiático, se llega al resort de Genting Highlands desde el valle?|Par quel moyen de transport, l'un des plus rapides de son genre en Asie du Sud-Est, atteint-on le complexe de Genting Highlands depuis la vallée ?|東南アジア屈指の速さを誇る、ゲンティンハイランドのリゾートへ谷底から登る交通手段は?",
    ["A ski lift|Un telesilla|Un télésiège|スキーリフト", "A funicular railway|Un funicular|Un funiculaire|ケーブルカー(鋼索鉄道)", "A cable car|Un teleférico|Un téléphérique|ロープウェイ(索道)"],
    2,
    "The Genting Skyway cable car covers a 3.4-kilometre route up the mountain at roughly 6 metres per second, replacing what was once a winding and often congested road as the main way most visitors reach the resort.|El teleférico Genting Skyway cubre una ruta de 3,4 kilómetros montaña arriba a unos 6 metros por segundo, sustituyendo a lo que antes era una carretera sinuosa y a menudo congestionada.|Le téléphérique Genting Skyway parcourt un trajet de 3,4 kilomètres jusqu'en haut de la montagne à environ 6 mètres par seconde, remplaçant ce qui était autrefois une route sinueuse et souvent encombrée.|ゲンティン・スカイウェイのロープウェイは山を登る3.4キロの区間を秒速約6メートルで結び、かつては曲がりくねって渋滞しがちだった道路に代わって、いまでは訪問者の大半が利用する主な交通手段となっている。",
  ),
  q(
    3,
    "Which of these islands, now part of Malaysia, was ceded by the Sultan of Brunei to Britain in 1846 for use as a coaling station?|¿Cuál de estas islas, hoy parte de Malasia, fue cedida por el sultán de Brunéi a Gran Bretaña en 1846 para usarla como estación de carbón?|Laquelle de ces îles, aujourd'hui malaisienne, fut cédée par le sultan de Brunei à la Grande-Bretagne en 1846 pour servir de station charbonnière ?|1846年、石炭補給基地として使うためブルネイのスルタンからイギリスへ割譲された、現在マレーシア領の島は?",
    ["Penang|Penang|Penang|ペナン島", "Langkawi|Langkawi|Langkawi|ランカウイ島", "Labuan|Labuán|Labuan|ラブアン島"],
    2,
    "Labuan's deep harbour made it valuable to Britain's steamship fleet in the mid-19th century, and it later became a Federal Territory of Malaysia in 1984, separate from the state of Sabah that surrounds it.|El profundo puerto de Labuán la hizo valiosa para la flota de vapores británica a mediados del siglo XIX, y más tarde, en 1984, se convirtió en Territorio Federal de Malasia, separado del estado de Sabah que la rodea.|Le port en eau profonde de Labuan la rendit précieuse pour la flotte de bateaux à vapeur britannique au milieu du XIXe siècle, et elle devint plus tard, en 1984, un Territoire fédéral de Malaisie, distinct de l'État du Sabah qui l'entoure.|ラブアン島の深い港は19世紀半ば、イギリスの蒸気船艦隊にとって価値ある拠点となり、のちの1984年、周囲を取り囲むサバ州とは別の連邦直轄領となった。",
  ),
  q(
    7,
    "The Sepang International Circuit hosted Malaysia's Formula 1 Grand Prix every year from 1999 until it left the calendar in which year?|¿El Circuito Internacional de Sepang albergó cada año el Gran Premio de Fórmula 1 de Malasia desde 1999 hasta que salió del calendario en qué año?|Le circuit international de Sepang a accueilli chaque année le Grand Prix de Formule 1 de Malaisie de 1999 jusqu'à sa sortie du calendrier en quelle année ?|スパン・インターナショナル・サーキットは1999年から何年までマレーシアF1グランプリを毎年開催し、その後カレンダーから外れたか?",
    ["2005|2005|2005|2005年", "2022|2022|2022|2022年", "2017|2017|2017|2017年"],
    2,
    "Falling ticket sales and rising costs led organizers to end Malaysia's Formula 1 race after the 2017 season, though the circuit continues to host MotoGP and other motorsport events.|La caída de ventas de entradas y el aumento de costes llevaron a los organizadores a poner fin a la carrera malasia de Fórmula 1 tras la temporada de 2017, aunque el circuito sigue acogiendo MotoGP y otros eventos.|La baisse des ventes de billets et la hausse des coûts poussèrent les organisateurs à mettre fin à la course malaisienne de Formule 1 après la saison 2017, bien que le circuit continue d'accueillir le MotoGP et d'autres épreuves.|チケット販売の落ち込みと費用の増大により、主催者は2017年シーズンを最後にマレーシアF1レースを終了させたが、サーキット自体はいまもMotoGPなど他のモータースポーツ大会を開催し続けている。",
  ),
  q(
    9,
    "Which British colonial officer's 1900 study, Malay Magic, systematically documented Malay folk beliefs including bomoh and jampi practices?|¿Qué funcionario colonial británico documentó de forma sistemática en su estudio de 1900, Malay Magic, las creencias populares malayas, incluidas las prácticas de bomoh y jampi?|Quel officier colonial britannique documenta systématiquement, dans son étude de 1900 Malay Magic, les croyances populaires malaises, dont les pratiques de bomoh et de jampi ?|1900年の研究書『マレーの魔術』で、ボモやジャンピの慣習を含むマレーの民間信仰を体系的に記録したイギリス植民地官吏は?",
    ["Stamford Raffles|Stamford Raffles|Stamford Raffles|スタンフォード・ラッフルズ", "James Brooke|James Brooke|James Brooke|ジェームズ・ブルック", "Walter Skeat|Walter Skeat|Walter Skeat|ウォルター・スキート"],
    2,
    "Walter William Skeat served as a colonial civil servant in Selangor before publishing Malay Magic in 1900, and although later scholars have criticized parts of his method, it remains a widely cited early record of the beliefs it describes.|Walter William Skeat sirvió como funcionario colonial en Selangor antes de publicar Malay Magic en 1900, y aunque estudiosos posteriores han criticado partes de su método, sigue siendo un registro temprano ampliamente citado.|Walter William Skeat servit comme fonctionnaire colonial au Selangor avant de publier Malay Magic en 1900, et bien que des chercheurs ultérieurs aient critiqué certains aspects de sa méthode, l'ouvrage reste une source ancienne largement citée.|ウォルター・ウィリアム・スキートはスランゴール州で植民地官吏を務めたのち、1900年に『マレーの魔術』を出版した。後の研究者から手法の一部を批判されてはいるものの、いまも広く引用される初期の記録であり続けている。",
  ),
  q(
    8,
    "Malaysia's response to the 1997–98 Asian Financial Crisis was unusual among affected countries: it did what with its currency?|La respuesta de Malasia a la crisis financiera asiática de 1997-98 fue inusual entre los países afectados: ¿qué hizo con su moneda?|La réponse de la Malaisie à la crise financière asiatique de 1997-98 fut inhabituelle parmi les pays touchés : qu'a-t-elle fait de sa monnaie ?|1997〜98年のアジア通貨危機に際し、マレーシアが他の被災国とは異なる形で通貨に対して取った措置は?",
    ["Let it float completely freely|Dejarla flotar completamente libre|La laisser flotter totalement librement|完全な変動相場制に移行させた", "Adopted the US dollar outright|Adoptar el dólar estadounidense directamente|Adopter directement le dollar américain|米ドルをそのまま採用した", "Pegged it to the US dollar and imposed capital controls|Fijarla al dólar estadounidense e imponer controles de capital|La rattacher au dollar américain et imposer des contrôles des capitaux|米ドルに固定し、資本規制を課した"],
    2,
    "Against the advice of the IMF, Malaysia fixed the ringgit at 3.80 to the US dollar in September 1998 and restricted the movement of capital, a gamble that was controversial at the time but is now more often cited as having shortened the country's recession.|Contra el consejo del FMI, Malasia fijó el ringgit en 3,80 por dólar estadounidense en septiembre de 1998 y restringió el movimiento de capitales, una apuesta controvertida en su momento pero hoy más citada por haber acortado la recesión.|Contre l'avis du FMI, la Malaisie fixa le ringgit à 3,80 pour un dollar américain en septembre 1998 et restreignit les mouvements de capitaux, un pari controversé à l'époque mais aujourd'hui plus souvent cité comme ayant raccourci la récession du pays.|IMFの助言に反し、マレーシアは1998年9月、リンギットを1米ドル=3.80リンギットに固定し、資本移動を制限した。当時は物議を醸した賭けだったが、いまではむしろ景気後退を短縮させたと評価されることが多い。",
  ),
  q(
    9,
    "Sarawak alone is home to roughly how many distinct indigenous languages, reflecting Borneo's exceptional linguistic diversity?|¿Aproximadamente cuántas lenguas indígenas distintas alberga solo Sarawak, reflejo de la excepcional diversidad lingüística de Borneo?|Le Sarawak abrite à lui seul environ combien de langues indigènes distinctes, reflet de l'exceptionnelle diversité linguistique de Bornéo ?|ボルネオの並外れた言語多様性を映し、サラワク州だけでおよそいくつの先住民言語があるとされるか?",
    ["About 5|Unas 5|Environ 5|約5", "Exactly 10|Exactamente 10|Exactement 10|ちょうど10", "Over 40|Más de 40|Plus de 40|40以上"],
    2,
    "Linguists count more than 40 living indigenous languages in Sarawak alone, among them Iban, Bidayuh, and a range of smaller Orang Ulu languages spoken by just a few thousand people each in the state's interior highlands.|Los lingüistas cuentan más de 40 lenguas indígenas vivas solo en Sarawak, entre ellas el iban, el bidayuh y varias lenguas orang ulu más pequeñas, habladas por apenas unos miles de personas cada una en las tierras altas del interior.|Les linguistes recensent plus de 40 langues indigènes vivantes rien qu'au Sarawak, dont l'iban, le bidayuh et une série de langues orang ulu plus petites, parlées par seulement quelques milliers de personnes chacune dans les hautes terres intérieures.|言語学者はサラワク州だけで40を超える現存の先住民言語を確認しており、イバン語やビダユ語のほか、州内陸の高地でそれぞれわずか数千人にしか話されていない小規模な「オラン・ウル」系の諸言語も含まれる。",
  ),
];
