/**
 * インドネシアのクイズ(48問)。
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
 * 都市カード(43件)が扱う具体的な事実(コモドドラゴンの毒腺・トバ湖の
 * 超噴火・ボロブドゥールの発見史・ウォーレス線と信仰の分布など)はここでは
 * 問わない。代わりに、都市カードが触れていない主題(国の一般知識・歴史・
 * 固有種・言語・食文化)を選んである。ウォーレス線とオランウータンは
 * 都市カードにも登場するが、ここでは「誰が線を引いたか」「どこで見られる
 * 生き物か」という別の角度から問う。
 *
 * **バリは別盤面として作られる予定のため、ここではバリ固有の話題を
 * 増やしすぎない**(ヒンドゥー教徒多数派という一般知識にとどめる)。
 *
 * 選択肢は3つ。正解の位置(`a`)は0/1/2がほぼ同数になるよう散らしてある。
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

export const INDONESIA_QUIZ = [
  q(
    1,
    "What is the capital of Indonesia?|¿Cuál es la capital de Indonesia?|Quelle est la capitale de l'Indonésie ?|インドネシアの首都はどこか?",
    ["Jakarta|Yakarta|Jakarta|ジャカルタ", "Bali|Bali|Bali|バリ", "Surabaya|Surabaya|Surabaya|スラバヤ"],
    0,
    "Jakarta has been the capital since independence, though Indonesia began moving its seat of government to a newly built city, Nusantara, on Borneo starting in the 2020s.|Yakarta ha sido la capital desde la independencia, aunque Indonesia empezó a trasladar su sede de gobierno a una ciudad de nueva construcción, Nusantara, en Borneo, a partir de la década de 2020.|Jakarta est la capitale depuis l'indépendance, bien que l'Indonésie ait commencé à transférer son siège de gouvernement vers une ville toute nouvelle, Nusantara, à Bornéo, à partir des années 2020.|ジャカルタは独立以来首都だったが、インドネシアは2020年代からボルネオ島に新しく建設した都市ヌサンタラへ政府機能の移転を始めている。",
  ),
  q(
    1,
    "What currency is used in Indonesia?|¿Qué moneda se usa en Indonesia?|Quelle monnaie utilise-t-on en Indonésie ?|インドネシアで使われている通貨は?",
    ["The Thai baht|El baht tailandés|Le baht thaïlandais|タイ・バーツ", "The rupiah|La rupia|La roupie|ルピア", "The ringgit|El ringgit|Le ringgit|リンギット"],
    1,
    "The rupiah's name comes from the rupee, and its notes carry so many zeros that prices are routinely quoted in the hundreds of thousands or millions.|El nombre de la rupia viene de la rupia india, y sus billetes llevan tantos ceros que los precios suelen darse en cientos de miles o millones.|Le nom de la roupie vient de la roupie indienne, et ses billets portent tant de zéros que les prix se donnent couramment en centaines de milliers ou en millions.|ルピアという名はインドのルピーに由来し、紙幣にあまりに多くのゼロが並ぶため、値段は日常的に数十万から数百万単位で語られる。",
  ),
  q(
    1,
    "Indonesia is best described geographically as what kind of country?|Geográficamente, ¿cómo se describe mejor a Indonesia?|Géographiquement, comment décrit-on le mieux l'Indonésie ?|地理的にインドネシアを最もよく表す国の形は?",
    ["A landlocked country|Un país sin salida al mar|Un pays enclavé|内陸国", "A single large island|Una sola isla grande|Une seule grande île|一つの大きな島", "An archipelago|Un archipiélago|Un archipel|列島(群島)"],
    2,
    "Indonesia is the world's largest archipelagic state, made up of roughly 17,000 islands strung along the equator, of which about 6,000 are inhabited.|Indonesia es el mayor estado archipelágico del mundo, formado por unas 17.000 islas repartidas a lo largo del ecuador, de las cuales unas 6.000 están habitadas.|L'Indonésie est le plus grand État archipel du monde, composé d'environ 17 000 îles égrenées le long de l'équateur, dont environ 6 000 sont habitées.|インドネシアは世界最大の島嶼国家であり、赤道に沿って連なるおよそ1万7千の島々からなり、そのうち約6千島に人が住んでいる。",
  ),
  q(
    2,
    "Which continent is Indonesia part of?|¿A qué continente pertenece Indonesia?|De quel continent l'Indonésie fait-elle partie ?|インドネシアが属する大陸は?",
    ["Asia|Asia|Asie|アジア", "Africa|África|Afrique|アフリカ", "South America|Sudamérica|Amérique du Sud|南アメリカ"],
    0,
    "Indonesia sits in Southeast Asia, though its easternmost region, Papua, shares a landmass with Oceania and its wildlife shifts noticeably as you travel that far east.|Indonesia está en el sudeste asiático, aunque su región más oriental, Papúa, comparte masa terrestre con Oceanía y su fauna cambia notablemente cuanto más al este se viaja.|L'Indonésie se trouve en Asie du Sud-Est, bien que sa région la plus orientale, la Papouasie, partage une masse continentale avec l'Océanie et que sa faune change nettement à mesure qu'on va vers l'est.|インドネシアは東南アジアに位置するが、最東部のパプアはオセアニアと陸続きの一部をなし、東へ行くほど生息する動物相が目に見えて変わっていく。",
  ),
  q(
    2,
    "What is the official language of Indonesia?|¿Cuál es el idioma oficial de Indonesia?|Quelle est la langue officielle de l'Indonésie ?|インドネシアの公用語は?",
    ["Javanese|Javanés|Javanais|ジャワ語", "Indonesian (Bahasa Indonesia)|Indonesio (Bahasa Indonesia)|L'indonésien (Bahasa Indonesia)|インドネシア語(バハサ・インドネシア)", "Dutch|Neerlandés|Néerlandais|オランダ語"],
    1,
    "Indonesian, based on Malay, was deliberately chosen over Javanese, the most widely spoken native tongue, when nationalist youth pledged in 1928 to unite around one language, one nation, and one homeland.|El indonesio, basado en el malayo, se eligió deliberadamente por delante del javanés, la lengua nativa más hablada, cuando la juventud nacionalista se comprometió en 1928 a unirse en torno a un idioma, una nación y una patria.|L'indonésien, fondé sur le malais, fut délibérément choisi plutôt que le javanais, la langue maternelle la plus parlée, quand la jeunesse nationaliste s'engagea en 1928 à s'unir autour d'une seule langue, une seule nation et une seule patrie.|マレー語を基にしたインドネシア語は、1928年の青年たちの誓いで「一つの言語・一つの国民・一つの祖国」のもとに団結すると宣言された際、最も話者の多い母語であるジャワ語をあえて退けて選ばれた。",
  ),
  q(
    2,
    "Indonesia's national motto, \"Bhinneka Tunggal Ika,\" translates roughly to what?|El lema nacional de Indonesia, «Bhinneka Tunggal Ika», se traduce aproximadamente como:|La devise nationale indonésienne, « Bhinneka Tunggal Ika », se traduit à peu près par :|インドネシアの国是「ビネカ・トゥンガル・イカ」の意味に近いものは?",
    ["Long live the king|Viva el rey|Vive le roi|王万歳", "Land of a thousand temples|Tierra de mil templos|Terre de mille temples|千の寺院の国", "Unity in Diversity|Unidad en la diversidad|L'unité dans la diversité|多様性の中の統一"],
    2,
    "The phrase comes from an Old Javanese poem and is meant to hold together a country with hundreds of ethnic groups and languages under a single national identity.|La frase viene de un poema en javanés antiguo y pretende mantener unido a un país con cientos de etnias e idiomas bajo una sola identidad nacional.|La phrase vient d'un poème en vieux javanais et vise à maintenir uni un pays comptant des centaines d'ethnies et de langues sous une seule identité nationale.|この言葉は古ジャワ語の詩に由来し、何百もの民族と言語を抱える国を一つの国民としてのまとまりのもとにつなぎとめることを意図している。",
  ),
  q(
    3,
    "Indonesia's national symbol, stamped on its coat of arms, is a mythical creature called what?|El símbolo nacional de Indonesia, estampado en su escudo, es una criatura mítica llamada:|Le symbole national indonésien, gravé sur ses armoiries, est une créature mythique appelée :|インドネシアの国章に描かれる神話上の生き物は?",
    ["Garuda|Garuda|Garuda|ガルーダ", "The Phoenix|El fénix|Le phénix|不死鳥", "The Simurgh|El simurgh|Le simurgh|シームルグ"],
    0,
    "Garuda, a giant bird-man from Hindu and Buddhist mythology, appears on Indonesia's national emblem and lends its name to the flag carrier airline, Garuda Indonesia.|Garuda, un ave-hombre gigante de la mitología hindú y budista, aparece en el emblema nacional de Indonesia y da nombre a la aerolínea de bandera, Garuda Indonesia.|Garuda, un homme-oiseau géant de la mythologie hindoue et bouddhiste, figure sur l'emblème national indonésien et donne son nom à la compagnie aérienne nationale, Garuda Indonesia.|ヒンドゥー教・仏教神話に登場する巨大な鳥人ガルーダは、インドネシアの国章に描かれ、フラッグキャリアであるガルーダ・インドネシア航空にもその名を与えている。",
  ),
  q(
    3,
    "Indonesia sits on the Pacific \"Ring of Fire\" and has more of what than almost any other country?|Indonesia está en el «Cinturón de Fuego» del Pacífico y tiene más de esto que casi cualquier otro país:|L'Indonésie se trouve sur la « Ceinture de feu » du Pacifique et compte plus de ceci que presque tout autre pays :|インドネシアは太平洋の「環太平洋火山帯」に位置し、ほぼどの国よりも多くの何を抱えているか?",
    ["Glaciers|Glaciares|Glaciers|氷河", "Active volcanoes|Volcanes activos|Volcans actifs|活火山", "Deserts|Desiertos|Déserts|砂漠"],
    1,
    "Indonesia has around 130 active volcanoes, more than any other country, a direct result of sitting where several of the Earth's tectonic plates grind against each other.|Indonesia tiene unos 130 volcanes activos, más que cualquier otro país, resultado directo de situarse donde varias placas tectónicas de la Tierra rozan entre sí.|L'Indonésie compte environ 130 volcans actifs, plus qu'aucun autre pays, conséquence directe de sa position là où plusieurs plaques tectoniques terrestres se frottent l'une contre l'autre.|インドネシアには約130の活火山があり、これはどの国よりも多い。地球のいくつものプレートがぶつかり合う場所に位置していることの直接の結果である。",
  ),
  q(
    2,
    "Indonesia is the world's how many-th most populous country?|¿Indonesia ocupa qué puesto en población mundial?|L'Indonésie occupe quel rang mondial en population ?|人口で見るとインドネシアは世界第何位の国か?",
    ["2nd|2.º|2e|第2位", "8th|8.º|8e|第8位", "4th|4.º|4e|第4位"],
    2,
    "With over 270 million people, Indonesia trails only China, India, and the United States, and more than half of that population lives on the single island of Java.|Con más de 270 millones de personas, Indonesia solo está por detrás de China, India y Estados Unidos, y más de la mitad de esa población vive en la sola isla de Java.|Avec plus de 270 millions d'habitants, l'Indonésie ne se classe qu'après la Chine, l'Inde et les États-Unis, et plus de la moitié de cette population vit sur la seule île de Java.|人口2億7千万人を超えるインドネシアは、中国・インド・アメリカに次ぐ規模で、その人口の半分以上がジャワ島一つに住んでいる。",
  ),
  q(
    3,
    "Which is the most populous island in Indonesia, and in the world?|¿Cuál es la isla más poblada de Indonesia, y del mundo?|Quelle est l'île la plus peuplée d'Indonésie, et du monde ?|インドネシアで、そして世界で最も人口の多い島は?",
    ["Java|Java|Java|ジャワ島", "Sumatra|Sumatra|Sumatra|スマトラ島", "Borneo|Borneo|Bornéo|ボルネオ島"],
    0,
    "Java is home to well over 150 million people, making it the most populous island on Earth despite covering only about 7% of Indonesia's total land area.|Java alberga a más de 150 millones de personas, lo que la convierte en la isla más poblada del planeta pese a cubrir solo un 7% de la superficie total de Indonesia.|Java abrite plus de 150 millions d'habitants, ce qui en fait l'île la plus peuplée de la planète bien qu'elle ne couvre qu'environ 7 % de la superficie totale de l'Indonésie.|ジャワ島には1億5千万人を超える人が暮らしており、インドネシアの国土面積のわずか7%ほどしか占めないにもかかわらず、地球上で最も人口の多い島となっている。",
  ),
  q(
    3,
    "Sukarno, Indonesia's first president, proclaimed independence in which year?|Sukarno, primer presidente de Indonesia, proclamó la independencia en qué año?|Sukarno, premier président de l'Indonésie, proclama l'indépendance en quelle année ?|インドネシア初代大統領スカルノが独立を宣言したのは何年か?",
    ["1949|1949|1949|1949年", "1945|1945|1945|1945年", "1957|1957|1957|1957年"],
    1,
    "Sukarno declared independence on August 17, 1945, just days after Japan's surrender, though the Netherlands did not formally recognize it until four years of conflict and diplomacy later, in 1949.|Sukarno declaró la independencia el 17 de agosto de 1945, apenas días después de la rendición de Japón, aunque los Países Bajos no la reconocieron formalmente hasta cuatro años de conflicto y diplomacia después, en 1949.|Sukarno déclara l'indépendance le 17 août 1945, quelques jours seulement après la capitulation du Japon, bien que les Pays-Bas ne la reconnaissent formellement que quatre ans de conflit et de diplomatie plus tard, en 1949.|スカルノは日本の降伏からわずか数日後の1945年8月17日に独立を宣言したが、オランダが正式に承認したのは、それから4年に及ぶ紛争と外交を経た1949年のことだった。",
  ),
  q(
    5,
    "Indonesia's authoritarian government from 1967 to 1998, led by President Suharto, is commonly known as what?|El gobierno autoritario de Indonesia entre 1967 y 1998, liderado por el presidente Suharto, se conoce comúnmente como:|Le gouvernement autoritaire indonésien de 1967 à 1998, dirigé par le président Suharto, est communément appelé :|1967年から1998年までのスハルト大統領による権威主義体制は一般に何と呼ばれるか?",
    ["The Golden Era|La Era Dorada|L'Ère dorée|黄金時代", "The Great Leap|El Gran Salto|Le Grand Bond|大躍進", "The New Order|El Nuevo Orden|Le Nouvel Ordre|新秩序(オルデ・バル)"],
    2,
    "Suharto's New Order (Orde Baru) ended in 1998 amid an economic crisis and mass protests known as Reformasi, opening the way to Indonesia's current democratic system.|El Nuevo Orden (Orde Baru) de Suharto terminó en 1998 en medio de una crisis económica y protestas masivas conocidas como Reformasi, abriendo paso al actual sistema democrático de Indonesia.|Le Nouvel Ordre (Orde Baru) de Suharto prit fin en 1998 au milieu d'une crise économique et de manifestations massives connues sous le nom de Reformasi, ouvrant la voie au système démocratique actuel de l'Indonésie.|スハルトの「新秩序(オルデ・バル)」体制は1998年、経済危機と「レフォルマシ」と呼ばれる大規模な抗議運動のさなかに終わり、現在の民主体制への道を開いた。",
  ),
  q(
    3,
    "What is gamelan?|¿Qué es el gamelan?|Qu'est-ce que le gamelan ?|ガムランとは何か?",
    ["A traditional percussion orchestra|Una orquesta tradicional de percusión|Un orchestre traditionnel de percussions|伝統的な打楽器合奏", "A style of batik dyeing|Un estilo de teñido batik|Un style de teinture batik|バティック染めの様式", "A form of shadow puppetry|Una forma de teatro de sombras|Une forme de théâtre d'ombres|影絵芝居の一種"],
    0,
    "Gamelan ensembles, built mostly of bronze gongs, metallophones, and drums, accompany much of Javanese and Balinese ceremony, dance, and shadow puppet theatre.|Los conjuntos de gamelan, formados sobre todo por gongs de bronce, metalófonos y tambores, acompañan buena parte de las ceremonias, danzas y teatro de sombras de Java y Bali.|Les ensembles de gamelan, composés surtout de gongs de bronze, de métallophones et de tambours, accompagnent une bonne part des cérémonies, danses et théâtres d'ombres javanais et balinais.|主に青銅製のゴングや鉄琴、太鼓からなるガムラン合奏団は、ジャワやバリの儀礼・舞踊・影絵芝居の多くに伴奏をつける。",
  ),
  q(
    4,
    "Which bamboo musical instrument, native to West Java, is recognized by UNESCO as intangible cultural heritage?|¿Qué instrumento musical de bambú, originario de Java Occidental, reconoce la UNESCO como patrimonio cultural inmaterial?|Quel instrument de musique en bambou, originaire de Java occidentale, est reconnu par l'UNESCO comme patrimoine culturel immatériel ?|西ジャワ発祥で、ユネスコの無形文化遺産に登録されている竹の楽器は?",
    ["The sasando|El sasando|Le sasando|ササンド", "The angklung|El angklung|L'angklung|アンクルン", "The kulintang|El kulintang|Le kulintang|クリンタン"],
    1,
    "An angklung is a set of tuned bamboo tubes that rattle to produce a note when shaken, usually played in large ensembles where each performer holds just one or two notes.|El angklung es un conjunto de tubos de bambú afinados que suenan al agitarlos para producir una nota, tocado normalmente en grandes conjuntos donde cada intérprete lleva solo una o dos notas.|L'angklung est un ensemble de tubes de bambou accordés qui produisent une note en étant secoués, joué généralement en grands ensembles où chaque interprète ne tient qu'une ou deux notes.|アンクルンは音階に調律された竹筒を振って音を出す楽器で、通常は大人数の合奏で演奏され、一人ひとりが一つか二つの音だけを受け持つ。",
  ),
  q(
    4,
    "Which Indonesian art form, in which flat leather figures cast shadows onto a screen, was recognized by UNESCO in 2003?|¿Qué arte indonesio, en el que figuras planas de cuero proyectan sombras sobre una pantalla, reconoció la UNESCO en 2003?|Quel art indonésien, où des figures plates en cuir projettent des ombres sur un écran, fut reconnu par l'UNESCO en 2003 ?|平たい皮の人形を使い、幕にその影を映すインドネシアの芸能で、2003年にユネスコが認定したものは?",
    ["Reog Ponorogo (mask dance)|El reog ponorogo (danza de máscaras)|Le reog ponorogo (danse masquée)|レオグ・ポノロゴ(仮面舞踊)", "Kecak (fire dance)|El kecak (danza del fuego)|Le kecak (danse du feu)|ケチャ(火の舞)", "Wayang kulit (shadow puppetry)|El wayang kulit (teatro de sombras)|Le wayang kulit (théâtre d'ombres)|ワヤン・クリ(影絵人形芝居)"],
    2,
    "A wayang kulit puppeteer, the dalang, works alone behind the screen, voicing every character and cueing the gamelan orchestra through performances that traditionally run all night.|El titiritero del wayang kulit, el dalang, trabaja solo detrás de la pantalla, dando voz a todos los personajes y marcando la entrada de la orquesta de gamelan en funciones que tradicionalmente duran toda la noche.|Le marionnettiste du wayang kulit, le dalang, travaille seul derrière l'écran, prêtant sa voix à chaque personnage et donnant le signal à l'orchestre de gamelan lors de représentations qui durent traditionnellement toute la nuit.|ワヤン・クリの人形遣い「ダラン」は幕の裏で一人で演じ、すべての登場人物の声を担い、伝統的に一晩じゅう続く上演の中でガムラン合奏団に合図を送る。",
  ),
  q(
    6,
    "Sundanese puppetry from West Java uses solid wooden rod puppets instead of flat leather ones. What is this form called?|El teatro de títeres sundanés de Java Occidental usa marionetas de varilla de madera maciza en vez de figuras planas de cuero. ¿Cómo se llama esta forma?|Le théâtre de marionnettes soundanais de Java occidentale utilise des marionnettes à tige en bois massif plutôt que des figures plates en cuir. Comment appelle-t-on cette forme ?|西ジャワのスンダ人形芝居では、平たい革人形ではなく木彫りの棒人形が使われる。この様式の名は?",
    ["Wayang golek|Wayang golek|Wayang golek|ワヤン・ゴレ", "Wayang beber|Wayang beber|Wayang beber|ワヤン・ベベル", "Wayang orang|Wayang orang|Wayang orang|ワヤン・オラン"],
    0,
    "Because wayang golek puppets are three-dimensional and fully carved, audiences watch the puppets directly rather than their shadows, and performances are held in daylight as often as at night.|Como las marionetas del wayang golek son tridimensionales y están talladas por completo, el público las mira directamente, no sus sombras, y las funciones se hacen tanto de día como de noche.|Comme les marionnettes du wayang golek sont tridimensionnelles et entièrement sculptées, le public regarde les marionnettes elles-mêmes plutôt que leurs ombres, et les représentations ont lieu en plein jour aussi souvent que la nuit.|ワヤン・ゴレの人形は立体で丸ごと彫られているため、観客は影ではなく人形そのものを直接見る。上演は夜だけでなく昼間にも行われることが多い。",
  ),
  q(
    5,
    "A mask dance from East Java features a huge, heavy mask combining a tiger's head with peacock feathers. What is it called?|Una danza de máscaras de Java Oriental luce una máscara enorme y pesada que combina una cabeza de tigre con plumas de pavo real. ¿Cómo se llama?|Une danse masquée de Java orientale arbore un masque énorme et lourd combinant une tête de tigre et des plumes de paon. Comment s'appelle-t-elle ?|東ジャワの仮面舞踊には、虎の頭と孔雀の羽根を組み合わせた巨大で重い仮面が登場する。その名は?",
    ["Barong|Barong|Barong|バロン", "Reog Ponorogo|Reog Ponorogo|Reog Ponorogo|レオグ・ポノロゴ", "Topeng Cirebon|Topeng Cirebon|Topeng Cirebon|トペン・チルボン"],
    1,
    "The reog mask can weigh over 50 kilograms and is traditionally supported entirely by the dancer's clenched teeth and neck muscles rather than any strap or harness.|La máscara del reog puede pesar más de 50 kilos y tradicionalmente se sostiene por completo con los dientes apretados y los músculos del cuello del bailarín, sin ninguna correa ni arnés.|Le masque du reog peut peser plus de 50 kilos et est traditionnellement soutenu entièrement par les dents serrées et les muscles du cou du danseur, sans sangle ni harnais.|レオグの仮面は50キログラムを超えることもあり、伝統的にはベルトや装具を使わず、踊り手が固く噛みしめた歯と首の筋肉だけで支えられる。",
  ),
  q(
    2,
    "A 2003 discovery on which Indonesian island revealed the fossils of a tiny extinct human species nicknamed the \"hobbit\"?|¿En qué isla indonesia un descubrimiento de 2003 reveló los fósiles de una diminuta especie humana extinta apodada el «hobbit»?|Sur quelle île indonésienne une découverte de 2003 a-t-elle révélé les fossiles d'une minuscule espèce humaine éteinte surnommée le « hobbit » ?|2003年、「ホビット」の愛称で呼ばれる小柄な絶滅ヒト種の化石が発見されたインドネシアの島は?",
    ["Java|Java|Java|ジャワ島", "Sumatra|Sumatra|Sumatra|スマトラ島", "Flores|Flores|Florès|フローレス島"],
    2,
    "Homo floresiensis stood only about a meter tall and lived on Flores until surprisingly recently in evolutionary terms, sharing the island with dwarf elephants and giant storks.|El Homo floresiensis medía solo alrededor de un metro y vivió en Flores hasta una época sorprendentemente reciente en términos evolutivos, compartiendo la isla con elefantes enanos y cigüeñas gigantes.|Homo floresiensis ne mesurait qu'environ un mètre et vécut à Florès jusqu'à une époque étonnamment récente en termes évolutifs, partageant l'île avec des éléphants nains et des cigognes géantes.|ホモ・フロレシエンシスは身長わずか1メートルほどで、進化史的には驚くほど最近までフローレス島に生息しており、矮小化したゾウや巨大なコウノトリと島を分かち合っていた。",
  ),
  q(
    3,
    "Which endemic Sulawesi animal is a wild pig with long, curved tusks that grow up through its own snout?|¿Qué animal endémico de Sulawesi es un cerdo salvaje con colmillos largos y curvos que le crecen a través del propio hocico?|Quel animal endémique de Sulawesi est un cochon sauvage aux longues défenses courbes qui lui poussent à travers le groin ?|自分の鼻先を突き抜けて伸びる長く曲がった牙を持つ、スラウェシ固有の野生の豚は?",
    ["Babirusa|Babirusa|Babirousa|バビルサ", "Anoa|Anoa|Anoa|アノア", "Tarsier|Tarsero|Tarsier|メガネザル"],
    0,
    "The babirusa's upper tusks curve backward and can, in rare cases, grow so far that they pierce the animal's own skull if they are never worn down.|Los colmillos superiores del babirusa se curvan hacia atrás y, en raras ocasiones, pueden crecer tanto que llegan a perforar el propio cráneo del animal si nunca se desgastan.|Les défenses supérieures du babirousa s'incurvent vers l'arrière et peuvent, dans de rares cas, pousser au point de transpercer le propre crâne de l'animal si elles ne s'usent jamais.|バビルサの上の牙は後ろへ向かって湾曲しており、まれにすり減ることなく伸び続けると、自分自身の頭蓋骨を貫いてしまうこともある。",
  ),
  q(
    5,
    "Which small, endemic Sulawesi mammal looks like a miniature buffalo, standing barely 90 centimeters at the shoulder?|¿Qué pequeño mamífero endémico de Sulawesi parece un búfalo en miniatura, de apenas 90 centímetros a la cruz?|Quel petit mammifère endémique de Sulawesi ressemble à un buffle miniature, culminant à peine à 90 centimètres au garrot ?|肩までわずか90センチほどしかない、水牛を小さくしたような姿のスラウェシ固有の哺乳類は?",
    ["The babirusa|El babirusa|Le babirousa|バビルサ", "The anoa|El anoa|L'anoa|アノア", "The tarsier|El tarsero|Le tarsier|メガネザル"],
    1,
    "The anoa is the world's smallest wild bovine and lives alone or in pairs deep in Sulawesi's forests rather than in the large herds typical of its buffalo relatives.|El anoa es el bóvido salvaje más pequeño del mundo y vive solo o en parejas en lo profundo de los bosques de Sulawesi, no en grandes manadas como sus parientes búfalos.|L'anoa est le plus petit bovin sauvage au monde et vit seul ou en couple au cœur des forêts de Sulawesi, plutôt qu'en grands troupeaux comme ses cousins buffles.|アノアは世界最小の野生ウシ科動物で、水牛の仲間に典型的な大きな群れではなく、スラウェシの森の奥で単独か番いで暮らす。",
  ),
  q(
    3,
    "Which monkey, endemic to Borneo, is known for the male's large, drooping nose?|¿Qué mono, endémico de Borneo, es conocido por la gran nariz colgante del macho?|Quel singe, endémique de Bornéo, est connu pour le grand nez tombant du mâle ?|オスの大きく垂れ下がった鼻で知られる、ボルネオ固有のサルは?",
    ["The orangutan|El orangután|L'orang-outan|オランウータン", "The tarsier|El tarsero|Le tarsier|メガネザル", "The proboscis monkey|El mono narigudo|Le nasique|テングザル"],
    2,
    "A male proboscis monkey's nose can grow so large it hangs over his mouth, and researchers believe it amplifies his calls and signals dominance to rival males.|La nariz de un mono narigudo macho puede crecer tanto que le cuelga sobre la boca, y los investigadores creen que amplifica sus llamadas y señala su dominancia ante machos rivales.|Le nez d'un nasique mâle peut grossir au point de pendre au-dessus de sa bouche, et les chercheurs pensent qu'il amplifie ses cris et signale sa dominance aux mâles rivaux.|オスのテングザルの鼻は口元まで垂れ下がるほど大きく育つことがあり、研究者はこれが鳴き声を増幅させ、他のオスへの優位性を示す役割を果たすと考えている。",
  ),
  q(
    2,
    "Orangutans, found in the wild only in Sumatra and Borneo, belong to which group of animals?|Los orangutanes, que solo existen en libertad en Sumatra y Borneo, ¿a qué grupo de animales pertenecen?|Les orangs-outans, que l'on ne trouve à l'état sauvage qu'à Sumatra et à Bornéo, appartiennent à quel groupe d'animaux ?|野生では現在スマトラとボルネオにしか生息しないオランウータンは、どの動物の仲間に属するか?",
    ["Great apes|Grandes simios|Grands singes|大型類人猿", "Big cats|Grandes felinos|Grands félins|大型ネコ科", "Marsupials|Marsupiales|Marsupiaux|有袋類"],
    0,
    "Orangutans are the only great ape found outside Africa, and both the Sumatran and Bornean species are critically endangered due to deforestation, much of it driven by palm oil plantations.|Los orangutanes son el único gran simio fuera de África, y tanto la especie de Sumatra como la de Borneo están en peligro crítico por la deforestación, gran parte impulsada por las plantaciones de aceite de palma.|Les orangs-outans sont le seul grand singe présent hors d'Afrique, et les espèces de Sumatra comme de Bornéo sont en danger critique d'extinction à cause de la déforestation, largement due aux plantations de palmiers à huile.|オランウータンはアフリカ以外に生息する唯一の大型類人猿であり、スマトラ種・ボルネオ種のいずれも、その多くがパーム油農園の拡大によって進む森林伐採のため、深刻な絶滅の危機にある。",
  ),
  q(
    6,
    "Indonesia's highest mountain, in Papua, is one of the few equatorial peaks to carry glaciers. What is it called?|La montaña más alta de Indonesia, en Papúa, es una de las pocas cumbres ecuatoriales con glaciares. ¿Cómo se llama?|La plus haute montagne d'Indonésie, en Papouasie, est l'un des rares sommets équatoriaux à porter des glaciers. Comment s'appelle-t-elle ?|パプアにあるインドネシア最高峰は、赤道直下でありながら氷河をいただく数少ない山の一つである。その名は?",
    ["Mount Kerinci|Monte Kerinci|Mont Kerinci|クリンチ山", "Puncak Jaya|Puncak Jaya|Puncak Jaya|プンチャック・ジャヤ", "Mount Rinjani|Monte Rinjani|Mont Rinjani|リンジャニ山"],
    1,
    "Puncak Jaya, also called Carstensz Pyramid, once carried a permanent equatorial ice cap, but its glaciers have shrunk so fast under climate change that scientists expect them to disappear entirely within years.|Puncak Jaya, también llamado Pirámide de Carstensz, tuvo antes un casquete de hielo ecuatorial permanente, pero sus glaciares han menguado tan rápido con el cambio climático que los científicos esperan que desaparezcan del todo en pocos años.|Puncak Jaya, aussi appelé pyramide de Carstensz, portait autrefois une calotte glaciaire équatoriale permanente, mais ses glaciers ont fondu si vite sous l'effet du changement climatique que les scientifiques s'attendent à leur disparition totale d'ici quelques années.|プンチャック・ジャヤ(カルステンツ・ピラミッドとも呼ばれる)はかつて赤道直下に恒久的な氷冠を戴いていたが、気候変動によりその氷河はあまりに速く縮小しており、科学者は数年のうちに完全に消えると見込んでいる。",
  ),
  q(
    7,
    "Papua is home to one of the world's largest gold and copper mines. What is it called?|Papúa alberga una de las mayores minas de oro y cobre del mundo. ¿Cómo se llama?|La Papouasie abrite l'une des plus grandes mines d'or et de cuivre au monde. Comment s'appelle-t-elle ?|パプアには世界最大級の金・銅鉱山がある。その名は?",
    ["Ok Tedi mine|Mina de Ok Tedi|Mine d'Ok Tedi|オクテディ鉱山", "Witwatersrand mine|Mina de Witwatersrand|Mine du Witwatersrand|ヴィットヴァータースラント鉱山", "Grasberg mine|Mina de Grasberg|Mine de Grasberg|グラスベルグ鉱山"],
    2,
    "Grasberg, operated by a joint venture involving the American company Freeport-McMoRan, sits over 4,000 meters above sea level and is one of the largest sources of government revenue from Papua, alongside long-running disputes over its environmental and social impact.|Grasberg, gestionada por una empresa conjunta con la estadounidense Freeport-McMoRan, se encuentra a más de 4.000 metros de altitud y es una de las mayores fuentes de ingresos del gobierno procedentes de Papúa, junto a disputas de larga data sobre su impacto ambiental y social.|Grasberg, exploitée par une coentreprise impliquant l'entreprise américaine Freeport-McMoRan, se trouve à plus de 4 000 mètres d'altitude et constitue l'une des plus grandes sources de revenus publics tirés de la Papouasie, aux côtés de différends de longue date sur son impact environnemental et social.|アメリカ企業フリーポート・マクモランが関わる合弁事業が操業するグラスベルグ鉱山は標高4000メートルを超える場所にあり、パプアから政府にもたらされる歳入の最大級の源泉である一方、環境や社会への影響をめぐる論争も長く続いている。",
  ),
  q(
    5,
    "Who is the British naturalist credited with proposing the biogeographic boundary now called the Wallace Line?|¿Qué naturalista británico propuso la frontera biogeográfica hoy llamada Línea de Wallace?|Quel naturaliste britannique est crédité d'avoir proposé la frontière biogéographique aujourd'hui appelée ligne de Wallace ?|現在ウォーレス線と呼ばれる生物地理学上の境界線を提唱したとされるイギリスの博物学者は?",
    ["Alfred Russel Wallace|Alfred Russel Wallace|Alfred Russel Wallace|アルフレッド・ラッセル・ウォーレス", "Charles Darwin|Charles Darwin|Charles Darwin|チャールズ・ダーウィン", "James Cook|James Cook|James Cook|ジェームズ・クック"],
    0,
    "Wallace spent years collecting specimens across the Malay Archipelago and independently arrived at a theory of evolution by natural selection around the same time as Darwin, prompting them to publish jointly in 1858.|Wallace pasó años recogiendo especímenes por todo el archipiélago malayo y llegó de forma independiente a una teoría de la evolución por selección natural casi al mismo tiempo que Darwin, lo que les llevó a publicar conjuntamente en 1858.|Wallace passa des années à récolter des spécimens dans tout l'archipel malais et parvint indépendamment à une théorie de l'évolution par sélection naturelle presque au même moment que Darwin, ce qui les poussa à publier conjointement en 1858.|ウォーレスはマレー諸島各地で何年もかけて標本を集め、ダーウィンとほぼ同じ時期に独自に自然選択による進化の理論にたどり着き、二人は1858年に共同で発表することになった。",
  ),
  q(
    4,
    "Which Indonesian dish, originally from West Sumatra, has repeatedly topped international polls ranking the world's best foods?|¿Qué plato indonesio, originario de Sumatra Occidental, ha encabezado repetidamente encuestas internacionales sobre la mejor comida del mundo?|Quel plat indonésien, originaire de Sumatra occidentale, a plusieurs fois été classé en tête de sondages internationaux sur les meilleurs plats du monde ?|西スマトラ発祥で、世界一おいしい料理を選ぶ国際的な人気投票で繰り返し首位になったインドネシア料理は?",
    ["Nasi goreng|Nasi goreng|Nasi goreng|ナシゴレン", "Rendang|Rendang|Rendang|ルンダン", "Satay|Satay|Satay|サテ"],
    1,
    "Rendang, a slow-cooked beef dish simmered for hours in coconut milk and spices until nearly dry, comes from the Minangkabau people of West Sumatra and was traditionally cooked to preserve meat for long journeys.|El rendang, un guiso de ternera cocido a fuego lento durante horas en leche de coco y especias hasta quedar casi seco, viene del pueblo minangkabau de Sumatra Occidental y tradicionalmente se cocinaba para conservar la carne en viajes largos.|Le rendang, un plat de bœuf mijoté des heures dans du lait de coco et des épices jusqu'à devenir presque sec, vient du peuple minangkabau de Sumatra occidentale et était traditionnellement cuisiné pour conserver la viande lors de longs voyages.|ココナッツミルクと香辛料でほとんど水分が飛ぶまで何時間も煮込む牛肉料理ルンダンは、西スマトラのミナンカバウ族に由来し、伝統的には長旅のあいだ肉を保存するために作られた。",
  ),
  q(
    3,
    "Indonesia has achieved some of its greatest international sporting success in which sport?|¿En qué deporte ha logrado Indonesia algunos de sus mayores éxitos internacionales?|Dans quel sport l'Indonésie a-t-elle remporté certains de ses plus grands succès internationaux ?|インドネシアが国際的に最も大きな成功を収めてきたスポーツは?",
    ["Ice hockey|Hockey sobre hielo|Hockey sur glace|アイスホッケー", "Rugby|Rugby|Rugby|ラグビー", "Badminton|Bádminton|Badminton|バドミントン"],
    2,
    "Indonesian badminton players have won Olympic gold medals in nearly every Games since the sport's 1992 debut, and matches against fellow badminton powerhouses draw some of the country's largest television audiences.|Los jugadores indonesios de bádminton han ganado medallas de oro olímpicas en casi todos los Juegos desde el debut del deporte en 1992, y los partidos contra otras potencias del bádminton reúnen algunas de las mayores audiencias televisivas del país.|Les joueurs de badminton indonésiens ont remporté des médailles d'or olympiques à presque tous les Jeux depuis les débuts du sport en 1992, et les matchs contre d'autres grandes puissances du badminton rassemblent certaines des plus grandes audiences télévisées du pays.|インドネシアのバドミントン選手は、この競技が1992年に五輪種目となって以来ほぼすべての大会で金メダルを獲得しており、他のバドミントン強豪国との対戦は国内でも屈指の視聴率を集める。",
  ),
  q(
    4,
    "Indonesia's flag carrier airline shares its name with the country's mythical bird symbol. What is the airline called?|La aerolínea de bandera de Indonesia comparte nombre con el ave mítica símbolo del país. ¿Cómo se llama la aerolínea?|La compagnie aérienne nationale indonésienne partage son nom avec l'oiseau mythique symbole du pays. Comment s'appelle cette compagnie ?|インドネシアのフラッグキャリアは、国の神話上の鳥のシンボルと同じ名前を持つ。その航空会社の名は?",
    ["Garuda Indonesia|Garuda Indonesia|Garuda Indonesia|ガルーダ・インドネシア航空", "Lion Air|Lion Air|Lion Air|ライオン・エア", "Batik Air|Batik Air|Batik Air|バティック・エア"],
    0,
    "Garuda Indonesia was founded in 1949, the same year the Netherlands finally recognized Indonesian independence, and named itself after the mythical bird on the national coat of arms.|Garuda Indonesia se fundó en 1949, el mismo año en que los Países Bajos reconocieron por fin la independencia indonesia, y tomó su nombre del ave mítica del escudo nacional.|Garuda Indonesia fut fondée en 1949, la même année où les Pays-Bas reconnurent enfin l'indépendance indonésienne, et tira son nom de l'oiseau mythique figurant sur les armoiries nationales.|ガルーダ・インドネシア航空は、オランダがついにインドネシアの独立を承認した1949年と同じ年に設立され、国章に描かれる神話の鳥にちなんで名付けられた。",
  ),
  q(
    6,
    "A 9th-century Hindu temple complex near Yogyakarta, dedicated to Brahma, Vishnu, and Shiva, is the tallest Hindu temple in Indonesia. What is it called?|Un complejo de templos hindúes del siglo IX cerca de Yogyakarta, dedicado a Brahma, Vishnu y Shiva, es el templo hindú más alto de Indonesia. ¿Cómo se llama?|Un complexe de temples hindous du IXe siècle près de Yogyakarta, dédié à Brahma, Vishnou et Shiva, est le plus haut temple hindou d'Indonésie. Comment s'appelle-t-il ?|ジョグジャカルタ近郊にある9世紀のヒンドゥー教寺院群で、ブラフマー・ヴィシュヌ・シヴァに捧げられ、インドネシアで最も高いヒンドゥー教寺院はどこか?",
    ["Borobudur|Borobudur|Borobudur|ボロブドゥール", "Prambanan|Prambanan|Prambanan|プランバナン", "Penataran|Penataran|Penataran|プナタラン"],
    1,
    "Prambanan was likely built by the Hindu Sanjaya dynasty partly to rival the nearby Buddhist Borobudur, built a few decades earlier by the competing Sailendra dynasty, and its central spire reaches 47 meters.|Prambanan probablemente fue construido por la dinastía hindú Sanjaya en parte para rivalizar con la cercana Borobudur budista, erigida unas décadas antes por la dinastía rival Sailendra, y su aguja central alcanza los 47 metros.|Prambanan fut sans doute bâti par la dynastie hindoue Sanjaya en partie pour rivaliser avec le Borobudur bouddhiste voisin, érigé quelques décennies plus tôt par la dynastie rivale des Sailendra, et sa flèche centrale atteint 47 mètres.|プランバナンはおそらく、数十年前に対抗するサイレーンドラ王朝が建てた近隣の仏教寺院ボロブドゥールに対抗する意図もあって、ヒンドゥー教のサンジャヤ王朝によって築かれたとされ、その中央の尖塔は高さ47メートルに達する。",
  ),
  q(
    3,
    "About how many islands make up Indonesia?|¿Aproximadamente cuántas islas forman Indonesia?|L'Indonésie compte environ combien d'îles ?|インドネシアはおよそいくつの島からなるか?",
    ["About 5,000|Unas 5.000|Environ 5 000|およそ5千", "About 50,000|Unas 50.000|Environ 50 000|およそ5万", "About 17,000|Unas 17.000|Environ 17 000|およそ1万7千"],
    2,
    "Surveys put the figure anywhere from about 13,000 to 17,000 depending on methodology and tide levels, but only around 6,000 of them are inhabited.|Los estudios sitúan la cifra entre unas 13.000 y 17.000, según la metodología y el nivel de las mareas, pero solo unas 6.000 están habitadas.|Les relevés donnent un chiffre allant d'environ 13 000 à 17 000 selon la méthode et le niveau des marées, mais seules environ 6 000 d'entre elles sont habitées.|調査方法や潮位によって数字は1万3千から1万7千のあいだで変わるが、実際に人が住んでいるのはそのうちおよそ6千島に過ぎない。",
  ),
  q(
    4,
    "Roughly how many distinct languages are spoken across Indonesia?|¿Aproximadamente cuántas lenguas distintas se hablan en Indonesia?|Environ combien de langues distinctes sont parlées en Indonésie ?|インドネシアではおよそいくつの異なる言語が話されているか?",
    ["Over 700|Más de 700|Plus de 700|700以上", "About 50|Unas 50|Environ 50|およそ50", "About 5|Unas 5|Environ 5|およそ5"],
    0,
    "Indonesia is the world's second most linguistically diverse country after Papua New Guinea, with well over 700 living languages recorded, most spoken only in small pockets of Papua and eastern Indonesia.|Indonesia es el segundo país con más diversidad lingüística del mundo, tras Papúa Nueva Guinea, con bien más de 700 lenguas vivas registradas, la mayoría habladas solo en pequeños bolsones de Papúa e Indonesia oriental.|L'Indonésie est le deuxième pays le plus riche en diversité linguistique au monde après la Papouasie-Nouvelle-Guinée, avec bien plus de 700 langues vivantes recensées, la plupart parlées seulement dans de petites poches de Papouasie et d'Indonésie orientale.|インドネシアはパプアニューギニアに次いで世界で二番目に言語多様性の高い国で、700を優に超える現存言語が記録されており、その大半はパプアやインドネシア東部のごく限られた地域でしか話されていない。",
  ),
  q(
    5,
    "What is the native ethnic group of the Jakarta area called?|¿Cómo se llama el grupo étnico nativo del área de Yakarta?|Comment s'appelle le groupe ethnique natif de la région de Jakarta ?|ジャカルタ地域の先住民族は何と呼ばれるか?",
    ["The Sundanese|Los sundaneses|Les Soundanais|スンダ族", "The Betawi|Los betawi|Les Betawi|ブタウィ族", "The Minangkabau|Los minangkabau|Les Minangkabau|ミナンカバウ族"],
    1,
    "The Betawi trace their identity to a mix of ethnic groups, including Malay, Chinese, Arab, and various island populations, who mingled in colonial-era Batavia, and today make up only a small minority within their own home city.|Los betawi remontan su identidad a una mezcla de grupos étnicos, entre ellos malayos, chinos, árabes y varias poblaciones insulares, que se mezclaron en la Batavia colonial, y hoy son solo una pequeña minoría en su propia ciudad natal.|Les Betawi font remonter leur identité à un mélange de groupes ethniques, dont malais, chinois, arabes et diverses populations insulaires, qui se mêlèrent dans la Batavia coloniale, et ne forment aujourd'hui qu'une petite minorité dans leur propre ville natale.|ブタウィ族は、マレー系・中国系・アラブ系やさまざまな島の出身者が植民地時代のバタヴィアで混ざり合ったことに自らの出自をたどっており、いまでは自分たちの故郷であるはずのこの都市の中でごく小さな少数派になっている。",
  ),
  q(
    4,
    "The Minangkabau people of West Sumatra are notable for practicing what kind of inheritance and kinship system?|El pueblo minangkabau de Sumatra Occidental destaca por practicar qué tipo de sistema de herencia y parentesco?|Le peuple minangkabau de Sumatra occidentale se distingue par la pratique de quel type de système d'héritage et de parenté ?|西スマトラのミナンカバウ族が実践していることで知られる、相続と血統の制度は?",
    ["A strictly patrilineal system|Un sistema estrictamente patrilineal|Un système strictement patrilinéaire|厳格な父系制度", "No inheritance of property at all|Ninguna herencia de propiedad en absoluto|Aucun héritage de biens du tout|財産の相続をまったく行わない制度", "A matrilineal system, passed down through women|Un sistema matrilineal, transmitido por línea femenina|Un système matrilinéaire, transmis par les femmes|女系を通じて受け継がれる母系制度"],
    2,
    "The Minangkabau are believed to be the largest matrilineal society in the world, with property, family names, and land traditionally passed down from mother to daughter rather than father to son.|Se cree que los minangkabau son la mayor sociedad matrilineal del mundo, con propiedades, apellidos y tierras transmitidos tradicionalmente de madre a hija en vez de de padre a hijo.|Les Minangkabau seraient la plus grande société matrilinéaire au monde, biens, noms de famille et terres se transmettant traditionnellement de mère en fille plutôt que de père en fils.|ミナンカバウ族は世界最大の母系社会とされ、財産も姓も土地も、伝統的には父から息子ではなく母から娘へと受け継がれる。",
  ),
  q(
    3,
    "What is the dominant religion on the island of Bali, setting it apart from most of Muslim-majority Indonesia?|¿Cuál es la religión predominante en la isla de Bali, que la distingue de la Indonesia de mayoría musulmana?|Quelle est la religion dominante sur l'île de Bali, ce qui la distingue du reste de l'Indonésie à majorité musulmane ?|バリ島で多数派を占め、ムスリム多数派のインドネシアの中でこの島を際立たせている宗教は?",
    ["Hinduism|Hinduismo|Hindouisme|ヒンドゥー教", "Buddhism|Budismo|Bouddhisme|仏教", "Christianity|Cristianismo|Christianisme|キリスト教"],
    0,
    "Balinese Hinduism blends Indian-derived Hindu philosophy with local animist and ancestor-worship traditions, expressed through daily offerings, temple festivals, and a distinctive calendar of ritual observances.|El hinduismo balinés mezcla la filosofía hindú de origen indio con tradiciones locales animistas y de culto a los antepasados, expresadas en ofrendas diarias, fiestas de templo y un calendario propio de observancias rituales.|L'hindouisme balinais mêle la philosophie hindoue d'origine indienne à des traditions locales animistes et de culte des ancêtres, exprimées par des offrandes quotidiennes, des fêtes de temple et un calendrier propre d'observances rituelles.|バリのヒンドゥー教は、インド由来のヒンドゥー哲学と、現地のアニミズムや祖先崇拝の伝統を融合させたもので、日々の供物や寺院の祭り、独自の儀礼暦を通じて表される。",
  ),
  q(
    2,
    "What is the most widely practiced religion in Indonesia as a whole?|¿Cuál es la religión más practicada en Indonesia en su conjunto?|Quelle est la religion la plus pratiquée en Indonésie dans son ensemble ?|インドネシア全体で最も広く信仰されている宗教は?",
    ["Hinduism|El hinduismo|L'hindouisme|ヒンドゥー教", "Islam|El islam|L'islam|イスラム教", "Buddhism|El budismo|Le bouddhisme|仏教"],
    1,
    "Indonesia has the largest Muslim population of any country in the world, though the constitution formally recognizes six religions and requires every citizen to declare a faith on their identity card.|Indonesia tiene la mayor población musulmana de cualquier país del mundo, aunque la constitución reconoce formalmente seis religiones y exige a cada ciudadano declarar una fe en su carné de identidad.|L'Indonésie compte la plus grande population musulmane de tous les pays du monde, bien que la constitution reconnaisse formellement six religions et exige que chaque citoyen déclare une confession sur sa carte d'identité.|インドネシアは世界のどの国よりも多いムスリム人口を抱えているが、憲法は正式に六つの宗教を認めており、すべての国民は身分証明書に信仰する宗教を記載することが求められる。",
  ),
  q(
    5,
    "Off the west coast of Sumatra, the island of Nias is famous for a traditional rite of passage in which young men do what?|Frente a la costa oeste de Sumatra, la isla de Nias es famosa por un rito de paso tradicional en el que los jóvenes hacen qué:|Au large de la côte ouest de Sumatra, l'île de Nias est réputée pour un rite de passage traditionnel où les jeunes hommes font quoi ?|スマトラ島西岸沖のニアス島が伝統的な通過儀礼で有名なのは、若い男たちが何をすることか?",
    ["Swim across a crater lake at night|Nadan de noche cruzando un lago de cráter|Nagent de nuit à travers un lac de cratère|夜に火口湖を泳いで渡る", "Carry a burning torch up a volcano|Suben un volcán con una antorcha encendida|Gravissent un volcan avec une torche enflammée|松明を掲げて火山を登る", "Jump over a stone pillar nearly two meters tall|Saltan sobre un pilar de piedra de casi dos metros|Sautent par-dessus un pilier de pierre de près de deux mètres|高さ2メートル近い石柱を飛び越える"],
    2,
    "Fahombo, or stone jumping, once marked a young Nias man's readiness for war and adulthood, and the tradition survives today mainly as a demonstration of skill for ceremonies and visitors.|El fahombo, o salto de piedra, marcaba antaño la preparación de un joven de Nias para la guerra y la edad adulta, y la tradición sobrevive hoy sobre todo como demostración de habilidad para ceremonias y visitantes.|Le fahombo, ou saut de pierre, marquait autrefois qu'un jeune homme de Nias était prêt pour la guerre et l'âge adulte, et la tradition survit aujourd'hui surtout comme démonstration d'habileté pour les cérémonies et les visiteurs.|「ファホンボ(石飛び)」はかつて、ニアスの若者が戦と成人への準備が整ったことを示す儀礼だったが、この伝統は今日では主に儀式や訪問客への技の披露として残っている。",
  ),
  q(
    6,
    "Indonesia's new capital under construction on Borneo, meant to replace Jakarta, is called what?|La nueva capital de Indonesia, en construcción en Borneo para reemplazar a Yakarta, se llama:|La nouvelle capitale indonésienne en construction à Bornéo, censée remplacer Jakarta, s'appelle :|ジャカルタに代わるものとしてボルネオ島に建設中のインドネシアの新首都の名は?",
    ["Nusantara|Nusantara|Nusantara|ヌサンタラ", "Palangka Baru|Palangka Baru|Palangka Baru|パランカ・バル", "Kalimantan City|Ciudad Kalimantan|Kalimantan City|カリマンタン・シティ"],
    0,
    "Nusantara is an old Javanese term roughly meaning \"outer islands\" or \"archipelago,\" chosen specifically because it does not favor any single ethnic group's homeland the way \"Jakarta\" carries Betawi and Javanese associations.|Nusantara es un término javanés antiguo que significa aproximadamente «islas exteriores» o «archipiélago», elegido precisamente porque no favorece la tierra natal de ningún grupo étnico concreto, a diferencia de «Yakarta».|Nusantara est un vieux terme javanais signifiant à peu près « îles extérieures » ou « archipel », choisi précisément parce qu'il ne favorise la patrie d'aucun groupe ethnique en particulier, contrairement à « Jakarta ».|「ヌサンタラ」は古いジャワ語で「外の島々」あるいは「群島」を意味する言葉で、「ジャカルタ」という名がブタウィ族やジャワ族と結びついているのとは違い、特定の民族の故地を優遇しない名として選ばれた。",
  ),
  q(
    7,
    "Because it spans so much longitude, how many official time zones does Indonesia observe?|Como abarca tanta longitud, ¿cuántos husos horarios oficiales tiene Indonesia?|Comme elle s'étend sur une telle longitude, combien de fuseaux horaires officiels compte l'Indonésie ?|東西に広がるインドネシアが定めている公式な標準時の数は?",
    ["One|Uno|Un seul|1", "Three|Tres|Trois|3", "Five|Cinco|Cinq|5"],
    1,
    "Western, Central, and Eastern Indonesia Time span roughly 46 degrees of longitude between them, meaning the sun sets in western Sumatra a full two hours after it has already set in Papua.|Las horas de Indonesia Occidental, Central y Oriental abarcan entre ellas unos 46 grados de longitud, así que el sol se pone en el oeste de Sumatra dos horas enteras después de haberse puesto ya en Papúa.|Les heures d'Indonésie occidentale, centrale et orientale couvrent entre elles environ 46 degrés de longitude, si bien que le soleil se couche dans l'ouest de Sumatra deux bonnes heures après s'être déjà couché en Papouasie.|西部・中部・東部インドネシア時間はあわせて経度にしておよそ46度に及び、スマトラ島西部で日が沈むのは、パプアですでに日が沈んでからまるまる2時間後になる。",
  ),
  q(
    4,
    "Tempeh, a firm cake of fermented soybeans bound together by fungal threads, originated on which Indonesian island?|El tempeh, una torta firme de soja fermentada unida por hilos de hongo, ¿en qué isla indonesia se originó?|Le tempeh, un pâté ferme de soja fermenté lié par des filaments fongiques, est originaire de quelle île indonésienne ?|菌糸で固められた発酵大豆の食品テンペは、インドネシアのどの島が発祥か?",
    ["Java|Java|Java|ジャワ島", "Bali|Bali|Bali|バリ島", "Sulawesi|Célebes|Célèbes|スラウェシ島"],
    0,
    "Cooked soybeans are inoculated with a mould culture and left to bind into a firm white cake within about a day, a technique that spread worldwide as a meat substitute while remaining an everyday staple across Java.|Se inoculan semillas de soja cocidas con un cultivo de moho y se dejan unir en una torta blanca y firme en cerca de un día, una técnica que se difundió por el mundo como sustituto de la carne mientras sigue siendo un alimento cotidiano en Java.|Des graines de soja cuites sont inoculées d'une culture de moisissure et laissées à lier en un pâté blanc et ferme en environ un jour, une technique qui s'est répandue dans le monde comme substitut de viande tout en restant un aliment quotidien à Java.|煮た大豆に麹菌を植え付け、一日ほどで白く固い塊にまとめる製法で、肉の代替品として世界中に広まった一方、ジャワでは今もありふれた日常の食品であり続けている。",
  ),
  q(
    4,
    "Indonesia is the world's largest producer of which vegetable oil, used in everything from cooking to cosmetics?|Indonesia es el mayor productor mundial de qué aceite vegetal, usado desde la cocina hasta la cosmética?|L'Indonésie est le plus grand producteur mondial de quelle huile végétale, utilisée aussi bien en cuisine qu'en cosmétique ?|料理から化粧品まで幅広く使われる、インドネシアが世界最大の生産国である植物油は?",
    ["Olive oil|El aceite de oliva|L'huile d'olive|オリーブ油", "Palm oil|El aceite de palma|L'huile de palme|パーム油", "Sunflower oil|El aceite de girasol|L'huile de tournesol|ひまわり油"],
    1,
    "Vast plantations across Sumatra and Kalimantan supply well over half the world's palm oil, an industry that funds much of Indonesia's export earnings while also driving some of its fastest rainforest loss.|Vastas plantaciones en Sumatra y Kalimantan suministran bien más de la mitad del aceite de palma mundial, una industria que financia buena parte de las exportaciones de Indonesia y también impulsa parte de su pérdida más rápida de selva.|De vastes plantations à Sumatra et à Kalimantan fournissent bien plus de la moitié de l'huile de palme mondiale, une industrie qui finance une bonne part des exportations indonésiennes tout en alimentant certaines des pertes de forêt tropicale les plus rapides du pays.|スマトラ島とカリマンタン島に広がる広大な農園が世界のパーム油の半分をゆうに超える量を供給しており、この産業はインドネシアの輸出収入の多くを支える一方、同国で最も速いペースの熱帯雨林の消失も引き起こしている。",
  ),
  q(
    5,
    "Pencak silat, an Indonesian martial art combining strikes, joint locks, and weapons, was added to which UNESCO list in 2019?|El pencak silat, arte marcial indonesio que combina golpes, luxaciones y armas, ¿a qué lista de la UNESCO se incorporó en 2019?|Le pencak silat, art martial indonésien combinant frappes, clés articulaires et armes, a été ajouté en 2019 à quelle liste de l'UNESCO ?|打撃・関節技・武器術を組み合わせたインドネシアの武術ペンチャック・シラットが2019年に登録されたユネスコの一覧は?",
    ["The World Heritage Site list|La lista de sitios del patrimonio mundial|La liste du patrimoine mondial|世界遺産一覧", "The Memory of the World register|El registro Memoria del Mundo|Le registre Mémoire du monde|世界の記憶", "The Intangible Cultural Heritage list|La lista del patrimonio cultural inmaterial|La liste du patrimoine culturel immatériel|無形文化遺産一覧"],
    2,
    "Silat styles vary widely by region and often stay within a single teacher's lineage, taught alongside music and, in some schools, elements of traditional medicine.|Los estilos de silat varían mucho según la región y suelen mantenerse dentro del linaje de un solo maestro, enseñados junto con música y, en algunas escuelas, elementos de medicina tradicional.|Les styles de silat varient beaucoup selon la région et restent souvent dans la lignée d'un seul maître, enseignés avec de la musique et, dans certaines écoles, des éléments de médecine traditionnelle.|シラットの流派は地域ごとに大きく異なり、多くは一人の師の系統の中だけで伝えられ、音楽や、流派によっては伝統医療の要素とともに教えられる。",
  ),
  q(
    5,
    "Indonesia was one of five founding members of which regional organisation, established by the 1967 Bangkok Declaration?|Indonesia fue uno de los cinco miembros fundadores de qué organización regional, creada por la Declaración de Bangkok de 1967?|L'Indonésie fut l'un des cinq membres fondateurs de quelle organisation régionale, créée par la déclaration de Bangkok de 1967 ?|1967年のバンコク宣言で設立された、インドネシアが5つの創設国の一つとなった地域組織は?",
    ["ASEAN|La ASEAN|L'ASEAN|ASEAN(東南アジア諸国連合)", "APEC|El APEC|L'APEC|APEC(アジア太平洋経済協力)", "SAARC|La SAARC|La SAARC|SAARC(南アジア地域協力連合)"],
    0,
    "Indonesia, the largest country among the five founders, has hosted ASEAN's permanent secretariat in Jakarta since the organisation set one up in 1976.|Indonesia, el mayor país entre los cinco fundadores, alberga la secretaría permanente de la ASEAN en Yakarta desde que la organización estableció una en 1976.|L'Indonésie, le plus grand pays parmi les cinq fondateurs, héberge le secrétariat permanent de l'ASEAN à Jakarta depuis que l'organisation en a créé un en 1976.|5つの創設国の中で最大の国であるインドネシアは、1976年にASEANが常設事務局を設けて以来、それをジャカルタに置き続けている。",
  ),
  q(
    5,
    "The 1928 Youth Pledge (Sumpah Pemuda), in which nationalist youth vowed one homeland and one language, also declared what?|El Juramento de la Juventud de 1928 (Sumpah Pemuda), en el que jóvenes nacionalistas juraron una patria y un idioma, ¿qué más declaró?|Le Serment de la jeunesse de 1928 (Sumpah Pemuda), où de jeunes nationalistes jurèrent une patrie et une langue, déclara aussi quoi ?|若き民族主義者たちが「一つの祖国」「一つの言語」を誓った1928年の「青年の誓い」がもう一つ宣言したことは?",
    ["One king for all islands|Un solo rey para todas las islas|Un seul roi pour toutes les îles|全島の王を一人に", "One nation, Indonesia|Una nación, Indonesia|Une nation, l'Indonésie|一つの国民、インドネシア", "One official religion|Una sola religión oficial|Une seule religion officielle|国教を一つに"],
    1,
    "The pledge was made by delegates from dozens of youth organisations representing different islands and ethnic backgrounds, years before independence was even a realistic prospect.|El juramento lo hicieron delegados de decenas de organizaciones juveniles que representaban distintas islas y orígenes étnicos, años antes de que la independencia fuera siquiera una perspectiva realista.|Le serment fut prononcé par des délégués de dizaines d'organisations de jeunesse représentant différentes îles et origines ethniques, des années avant que l'indépendance ne soit même une perspective réaliste.|この誓いは、独立が現実的な見通しにすらなっていなかった時期に、異なる島や民族的背景を代表する何十もの青年団体の代表たちによって立てられた。",
  ),
  q(
    5,
    "R.A. Kartini, whose birthday is now a national holiday, is remembered as a pioneer of what?|R.A. Kartini, cuyo cumpleaños es hoy fiesta nacional, es recordada como pionera de qué?|R.A. Kartini, dont l'anniversaire est aujourd'hui un jour férié national, est célébrée comme pionnière de quoi ?|誕生日が現在国民の祝日になっているR・A・カルティニは、何の先駆者として記憶されているか?",
    ["Deep-sea navigation|La navegación de altura|La navigation hauturière|遠洋航海", "Rice terrace irrigation|El riego de arrozales en terraza|L'irrigation des rizières en terrasses|棚田の灌漑", "Education for Indonesian women and girls|La educación de mujeres y niñas indonesias|L'éducation des femmes et des filles indonésiennes|インドネシアの女性と少女の教育"],
    2,
    "Kartini, a Javanese noblewoman confined by custom to her family's home after childhood, wrote letters advocating for girls' schooling that were published after her early death in 1904 and later helped inspire the founding of girls' schools bearing her name.|Kartini, una noble javanesa recluida por costumbre en casa de su familia tras la infancia, escribió cartas defendiendo la escolarización de las niñas, publicadas tras su temprana muerte en 1904, que más tarde ayudaron a inspirar escuelas para niñas con su nombre.|Kartini, une noble javanaise confinée par la coutume au foyer familial après l'enfance, écrivit des lettres défendant la scolarisation des filles, publiées après sa mort précoce en 1904, qui contribuèrent plus tard à inspirer des écoles de filles portant son nom.|幼少期を過ぎると慣習により実家に留め置かれたジャワの貴族の娘カルティニは、少女への教育を訴える手紙を書き残した。それは1904年の早すぎる死ののちに出版され、のちに彼女の名を冠した女子校の設立を後押しした。",
  ),
  q(
    5,
    "Gojek, founded in 2010 and now used by millions daily for rides, food delivery, and payments, began as a call centre booking what kind of transport?|Gojek, fundada en 2010 y hoy usada por millones a diario para viajes, reparto de comida y pagos, empezó como un centro de llamadas que reservaba qué tipo de transporte?|Gojek, fondée en 2010 et aujourd'hui utilisée quotidiennement par des millions de personnes pour les trajets, la livraison et les paiements, a débuté comme un centre d'appels réservant quel type de transport ?|2010年創業で、いまや配車・出前・決済に何百万人もが日々利用するゴジェックは、もともと何の予約を受け付ける電話窓口として始まったか?",
    ["Motorbike taxis (ojek)|Mototaxis (ojek)|Les mototaxis (ojek)|バイクタクシー(オジェック)", "River ferries|Los ferris fluviales|Les ferries fluviaux|川船", "Long-distance buses|Los autobuses de larga distancia|Les autocars longue distance|長距離バス"],
    0,
    "Ojek riders had long weaved motorbike taxis through Jakarta's traffic jams; Gojek's app simply made booking one, and later ordering food or sending a package through the same driver network, far easier.|Los conductores de ojek llevaban tiempo abriéndose paso en mototaxi por los atascos de Yakarta; la app de Gojek solo hizo mucho más fácil reservar uno, y luego pedir comida o enviar un paquete por la misma red de conductores.|Les chauffeurs d'ojek se faufilaient depuis longtemps en mototaxi dans les embouteillages de Jakarta ; l'application Gojek n'a fait que rendre bien plus simple d'en réserver un, puis de commander à manger ou d'envoyer un colis via le même réseau de chauffeurs.|オジェックの運転手たちは長らくバイクタクシーでジャカルタの渋滞をすり抜けてきたが、ゴジェックのアプリはその予約を、そして同じ運転手網を使った出前や荷物の配達までをも、ずっと簡単にしただけのことだった。",
  ),
  q(
    5,
    "The Dutch East India Company (VOC), which came to dominate trade across the archipelago, was founded in what year?|La Compañía Neerlandesa de las Indias Orientales (VOC), que llegó a dominar el comercio en el archipiélago, ¿en qué año se fundó?|La Compagnie néerlandaise des Indes orientales (VOC), qui en vint à dominer le commerce dans l'archipel, fut fondée en quelle année ?|やがて群島全域の交易を支配することになるオランダ東インド会社(VOC)が設立されたのは何年か?",
    ["1799|1799|1799|1799年", "1602|1602|1602|1602年", "1750|1750|1750|1750年"],
    1,
    "The VOC, often cited as the first modern multinational corporation and the first to issue tradable shares, ran its own army and navy and governed much of the archipelago from its headquarters in Batavia until the company went bankrupt and was dissolved in 1799.|La VOC, citada a menudo como la primera corporación multinacional moderna y la primera en emitir acciones negociables, tenía su propio ejército y armada y gobernó buena parte del archipiélago desde su sede en Batavia hasta que la compañía quebró y se disolvió en 1799.|La VOC, souvent citée comme la première entreprise multinationale moderne et la première à émettre des actions négociables, disposait de sa propre armée et marine et gouverna une bonne partie de l'archipel depuis son siège de Batavia jusqu'à la faillite et la dissolution de la compagnie en 1799.|しばしば「最初の近代的多国籍企業」であり「最初に譲渡可能な株式を発行した企業」とされるVOCは、独自の陸海軍を持ち、バタヴィアの本拠地から群島の大部分を統治したが、1799年に破産して解散した。",
  ),
  q(
    6,
    "\"Kalimantan\" refers to the Indonesian portion of which island, which it shares with Malaysia and Brunei?|«Kalimantan» se refiere a la parte indonesia de qué isla, que comparte con Malasia y Brunéi?|« Kalimantan » désigne la partie indonésienne de quelle île, partagée avec la Malaisie et le Brunei ?|「カリマンタン」は、マレーシアとブルネイとも分け合うどの島のインドネシア領部分を指す名か?",
    ["New Guinea|Nueva Guinea|Nouvelle-Guinée|ニューギニア島", "Sulawesi|Célebes|Célèbes|スラウェシ島", "Borneo|Borneo|Bornéo|ボルネオ島"],
    2,
    "Indonesia holds roughly three-quarters of Borneo by area, split into five provinces, while Malaysia's two states and tiny Brunei share the rest of the island along its northern coast.|Indonesia posee cerca de tres cuartas partes de Borneo por superficie, dividida en cinco provincias, mientras dos estados malasios y el pequeño Brunéi se reparten el resto de la isla en su costa norte.|L'Indonésie détient environ les trois quarts de Bornéo en superficie, répartis en cinq provinces, tandis que deux États malaisiens et le minuscule Brunei se partagent le reste de l'île le long de sa côte nord.|インドネシアは面積にしてボルネオ島のおよそ4分の3を占め、5つの州に分かれている。残りは島の北岸沿いに、マレーシアの2つの州と小さなブルネイが分け合っている。",
  ),
  q(
    6,
    "\"Dayak\" is a collective term for what?|«Dayak» es un término colectivo para qué?|« Dayak » est un terme collectif désignant quoi ?|「ダヤク」とは何の総称か?",
    ["The indigenous, non-Malay peoples of Borneo|Los pueblos indígenas no malayos de Borneo|Les peuples autochtones non malais de Bornéo|ボルネオ島の非マレー系先住民族", "A style of Javanese royal dance|Un estilo de danza cortesana javanesa|Un style de danse de cour javanaise|ジャワの宮廷舞踊の様式", "A single ethnic group from Sulawesi|Un único grupo étnico de Célebes|Un unique groupe ethnique de Célèbes|スラウェシの単一の民族集団"],
    0,
    "The term covers well over a hundred distinct groups with their own languages and customs, historically living inland along Borneo's rivers, as opposed to the coastal Malay sultanates that later controlled trade.|El término abarca más de un centenar de grupos distintos con lenguas y costumbres propias, que vivían históricamente tierra adentro junto a los ríos de Borneo, frente a los sultanatos malayos costeros que después controlaron el comercio.|Le terme recouvre plus d'une centaine de groupes distincts, avec leurs propres langues et coutumes, vivant historiquement à l'intérieur des terres le long des fleuves de Bornéo, par opposition aux sultanats malais côtiers qui contrôlèrent ensuite le commerce.|この語は百を超える、それぞれ独自の言語と慣習を持つ集団の総称で、歴史的にはボルネオ島の川沿いの内陸に暮らしてきた。のちに交易を支配することになる沿岸のマレー系スルタン国とは対照的な存在である。",
  ),
  q(
    6,
    "After Javanese, which is the second most widely spoken native language in Indonesia, centred on West Java?|Después del javanés, ¿cuál es la segunda lengua materna más hablada en Indonesia, centrada en Java Occidental?|Après le javanais, quelle est la deuxième langue maternelle la plus parlée en Indonésie, centrée sur Java occidentale ?|ジャワ語に次いでインドネシアで話者が多い母語で、西ジャワを中心とするのはどれか?",
    ["Madurese|El madurés|Le madourais|マドゥラ語", "Sundanese|El sundanés|Le soundanais|スンダ語", "Balinese|El balinés|Le balinais|バリ語"],
    1,
    "Sundanese has tens of millions of speakers concentrated around Bandung and the surrounding highlands, yet remains far less represented in national media than Indonesian or Javanese.|El sundanés tiene decenas de millones de hablantes concentrados en torno a Bandung y las tierras altas circundantes, aunque sigue muy poco representado en los medios nacionales frente al indonesio o el javanés.|Le soundanais compte des dizaines de millions de locuteurs concentrés autour de Bandung et des hautes terres environnantes, mais reste bien moins représenté dans les médias nationaux que l'indonésien ou le javanais.|スンダ語はバンドンとその周辺高地を中心に数千万人の話者を持つが、インドネシア語やジャワ語に比べると全国メディアでの扱いはずっと少ない。",
  ),
  q(
    6,
    "Most wayang shadow-puppet plays draw their stories from which source, despite being performed largely for Muslim audiences?|La mayoría de las obras de wayang de sombras toman sus historias de qué fuente, pese a representarse sobre todo ante público musulmán?|La plupart des pièces de wayang d'ombres puisent leurs histoires dans quelle source, bien qu'elles soient jouées surtout pour un public musulman ?|ワヤンの影絵芝居の多くは、主にムスリムの観客に向けて上演されるにもかかわらず、どこから物語を得ているか?",
    ["The Quran|El Corán|Le Coran|コーラン", "Dutch colonial folk tales|Cuentos populares coloniales holandeses|Des contes populaires coloniaux hollandais|オランダ植民地時代の民話", "The Hindu epics Ramayana and Mahabharata|Los poemas épicos hindúes Ramayana y Mahabharata|Les épopées hindoues Ramayana et Mahabharata|ヒンドゥー教の叙事詩『ラーマーヤナ』と『マハーバーラタ』"],
    2,
    "The epics arrived from India centuries before Islam spread across Java and were absorbed so thoroughly into local storytelling that characters like Arjuna and Bima are still household names today.|Las epopeyas llegaron de India siglos antes de que el islam se extendiera por Java y se absorbieron tan a fondo en la narrativa local que personajes como Arjuna y Bima siguen siendo nombres muy conocidos hoy.|Les épopées arrivèrent d'Inde des siècles avant que l'islam ne se répande à Java et furent si profondément absorbées dans la tradition narrative locale que des personnages comme Arjuna et Bima restent aujourd'hui des noms familiers.|この叙事詩はイスラムがジャワに広まるより何世紀も前にインドから伝わり、現地の物語の中にすっかり取り込まれた結果、アルジュナやビマといった登場人物はいまも誰もが知る名前であり続けている。",
  ),
  q(
    6,
    "The English word \"joe\", old slang for coffee, and the phrase \"a cup of joe\" are sometimes traced back to which Indonesian island's name?|La palabra inglesa «joe», jerga antigua para café, y la frase «a cup of joe» a veces se remontan al nombre de qué isla indonesia?|Le mot anglais « joe », argot ancien pour le café, et l'expression « a cup of joe » remonteraient parfois au nom de quelle île indonésienne ?|コーヒーを指す古い俗語「joe」や「a cup of joe」という言い回しは、インドネシアのどの島の名前に由来するとも言われるか?",
    ["Java|Java|Java|ジャワ島", "Bali|Bali|Bali|バリ島", "Sumatra|Sumatra|Sumatra|スマトラ島"],
    0,
    "Java's coffee plantations, first planted by the Dutch in the 17th century, made the island's name so synonymous with coffee in English that \"java\" itself became a generic word for the drink, alongside the more disputed \"joe\" theory.|Las plantaciones de café de Java, sembradas por primera vez por los holandeses en el siglo XVII, hicieron que el nombre de la isla fuera tan sinónimo de café en inglés que «java» se convirtió en palabra genérica para la bebida.|Les plantations de café de Java, plantées pour la première fois par les Hollandais au XVIIe siècle, rendirent le nom de l'île si synonyme de café en anglais que « java » lui-même devint un mot générique pour la boisson.|17世紀にオランダ人が初めて植えたジャワ島のコーヒー農園は、島の名を英語でコーヒーそのものと結びつけるほどになり、「ジャワ」という語自体がこの飲み物を指す一般名詞にもなった。",
  ),
  q(
    6,
    "Indonesia is consistently ranked among the world's top countries for consumption per person of what packaged food, led by the domestic brand Indomie?|Indonesia se sitúa siempre entre los países del mundo con mayor consumo per cápita de qué alimento envasado, liderado por la marca local Indomie?|L'Indonésie figure constamment parmi les premiers pays au monde pour la consommation par habitant de quel aliment emballé, dominé par la marque locale Indomie ?|国内ブランド「インドミー」が代表する、インドネシアが一人当たり消費量で常に世界上位に入る包装食品は?",
    ["Canned tuna|El atún en lata|Le thon en boîte|ツナ缶", "Instant noodles|Los fideos instantáneos|Les nouilles instantanées|即席麺", "Breakfast cereal|Los cereales de desayuno|Les céréales du petit-déjeuner|朝食シリアル"],
    1,
    "Indomie is exported to dozens of countries and has become popular enough abroad, particularly in West Africa, that in some markets it now competes directly with long-established local instant noodle brands.|Indomie se exporta a decenas de países y se ha hecho tan popular fuera, sobre todo en África Occidental, que en algunos mercados compite ya directamente con marcas locales de fideos instantáneos ya asentadas.|Indomie est exporté vers des dizaines de pays et est devenu si populaire à l'étranger, notamment en Afrique de l'Ouest, qu'il y concurrence désormais directement des marques locales de nouilles instantanées bien établies.|インドミーは数十か国に輸出されており、海外、特に西アフリカで人気が高まった結果、一部の市場では現地の老舗即席麺ブランドと真っ向から競うまでになっている。",
  ),
];
