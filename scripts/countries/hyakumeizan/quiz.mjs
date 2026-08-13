/**
 * 日本百名山のクイズ(30問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じ「日本の山に詳しくない一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 山の文化・歴史に踏み込んだ知識が要る
 *   9〜10 … 現地の登山者か、強い関心のある人でないと難しい
 *
 * 都市カード(100件)が扱う具体的な事実(個々の山の標高・伝説・災害史など)
 * はここでは繰り返さない。代わりに、百名山という括りそのものの成り立ち、
 * 登山の文化・歴史・道具・気象など、都市カードが触れていない主題を選んだ。
 *
 * ```
 * node scripts/check-quiz.mjs hyakumeizan
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること
 * (まだ自分では実行していない。取りまとめ側で焼いたあとに回してほしい)。
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

export const HYAKUMEIZAN_QUIZ = [
  q(
    1,
    "As the name says, how many peaks make up the Hyakumeizan?|Como dice el nombre, ¿cuántos picos componen el Hyakumeizan?|Comme le nom l'indique, combien de sommets compte le Hyakumeizan ?|その名のとおり、百名山はいくつの山からなるか?",
    ["Fifty|Cincuenta|Cinquante|50座", "Two hundred|Doscientos|Deux cents|200座", "One hundred|Cien|Cent|100座"],
    2,
    "Hyaku simply means \"hundred\" and meizan means \"famous mountain,\" a title the mountaineer and writer Kyuya Fukada gave to his own personal selection rather than to any official government ranking.|Hyaku significa simplemente «cien» y meizan «montaña famosa», un título que el alpinista y escritor Kyuya Fukada dio a su propia selección personal, no a ninguna clasificación oficial del gobierno.|Hyaku signifie simplement « cent » et meizan « montagne célèbre », un titre que l'alpiniste et écrivain Kyūya Fukada donna à sa propre sélection personnelle, et non à un classement officiel du gouvernement.|「百」は数の百、「名山」は名高い山を意味し、これは登山家で作家の深田久弥が自らの私選に付けた題であって、政府による公式な格付けではない。",
  ),
  q(
    1,
    "Mount Fuji sits on the border of Shizuoka and which other prefecture?|El monte Fuji está en la frontera de Shizuoka y qué otra prefectura?|Le mont Fuji se trouve à la frontière de Shizuoka et de quelle autre préfecture ?|富士山は静岡県と、もう一つどの県の境にあるか?",
    ["Yamanashi|Yamanashi|Yamanashi|山梨県", "Nagano|Nagano|Nagano|長野県", "Saitama|Saitama|Saitama|埼玉県"],
    0,
    "The mountain's two main climbing sides, often shortened to the Yoshida and Fujinomiya trails, start on opposite prefectures, which is part of why its official opening dates can differ slightly depending on which side a climber starts from.|Los dos lados principales de ascenso de la montaña, a menudo llamados por las sendas de Yoshida y Fujinomiya, empiezan en prefecturas opuestas, lo que en parte explica que sus fechas oficiales de apertura puedan diferir ligeramente según el lado por el que se empiece.|Les deux principaux versants d'ascension de la montagne, souvent désignés par les sentiers de Yoshida et de Fujinomiya, démarrent dans des préfectures opposées, ce qui explique en partie que ses dates d'ouverture officielles puissent légèrement différer selon le côté emprunté.|山の主な登山道である吉田口・富士宮口は、それぞれ異なる県から始まる。開山期間の日付が登る側によって少しずれることがあるのは、そのためでもある。",
  ),
  q(
    2,
    "The Kita, Chuo and Minami mountain ranges of central Japan share a well-known English nickname. What is it?|Las cordilleras Kita, Chuo y Minami del centro de Japón comparten un conocido apodo en inglés. ¿Cuál es?|Les chaînes Kita, Chuo et Minami du centre du Japon partagent un surnom anglais bien connu. Lequel ?|日本中部の北・中央・南の3つの山脈は、ある有名な英語の愛称で呼ばれる。それは何か?",
    ["The Japan Rockies|Las Rocosas de Japón|Les Rocheuses du Japon|日本のロッキー山脈", "The Japan Highlands|Las Tierras Altas de Japón|Les Hautes Terres du Japon|日本高地", "The Japan Alps|Los Alpes de Japón|Les Alpes du Japon|日本アルプス"],
    2,
    "The name was popularised abroad in the late 19th century by the British missionary and mountaineer Walter Weston, whose writings on the region are still honoured every June with a festival held in his memory at Kamikochi.|El nombre se popularizó en el extranjero a finales del siglo XIX gracias al misionero y alpinista británico Walter Weston, cuyos escritos sobre la región aún se honran cada junio con un festival celebrado en su memoria en Kamikochi.|Le nom fut popularisé à l'étranger à la fin du XIXe siècle par le missionnaire et alpiniste britannique Walter Weston, dont les écrits sur la région sont encore honorés chaque juin par un festival organisé en sa mémoire à Kamikochi.|この呼び名は19世紀末、英国人宣教師で登山家のウォルター・ウェストンによって海外に広められた。彼のこの山域についての著作は今も、毎年6月に上高地で開かれる彼を偲ぶ祭りで称えられている。",
  ),
  q(
    3,
    "In roughly what decade did Kyuya Fukada's book \"Nihon Hyakumeizan\" first appear?|¿En qué década apareció por primera vez el libro de Kyuya Fukada «Nihon Hyakumeizan»?|Dans quelle décennie environ le livre de Kyūya Fukada « Nihon Hyakumeizan » est-il paru pour la première fois ?|深田久弥の著書『日本百名山』が最初に世に出たのはおよそ何年代か?",
    ["The 1930s|Los años 30|Les années 1930|1930年代", "The 1960s|Los años 60|Les années 1960|1960年代", "The 1980s|Los años 80|Les années 1980|1980年代"],
    1,
    "The book was published in 1964, collecting essays Fukada had written over the previous decades, and it did not become a nationwide climbing checklist until a television adaptation decades later sent a new generation up the same hundred peaks.|El libro se publicó en 1964, recopilando ensayos que Fukada había escrito en las décadas anteriores, y no se convirtió en una lista de ascensos nacional hasta que una adaptación televisiva, décadas después, llevó a una nueva generación a los mismos cien picos.|Le livre parut en 1964, rassemblant des essais que Fukada avait écrits au cours des décennies précédentes, et il ne devint une liste d'ascension nationale qu'après qu'une adaptation télévisée, des décennies plus tard, eut envoyé une nouvelle génération vers les mêmes cent sommets.|この本は1964年に刊行され、深田がそれ以前の数十年にわたって書きためた随筆をまとめたものだった。全国的な登山の目標リストとなったのは、何十年もあとにテレビの番組化が新しい世代を同じ百座へと送り出してからのことである。",
  ),
  q(
    5,
    "Fukada judged mountains by dignity, history and individuality of form. Which of these was explicitly NOT one of his three stated criteria?|Fukada juzgaba las montañas por su dignidad, historia e individualidad de forma. ¿Cuál de estas NO era explícitamente uno de sus tres criterios declarados?|Fukada jugeait les montagnes selon leur dignité, leur histoire et l'individualité de leur forme. Lequel n'était explicitement PAS l'un de ses trois critères énoncés ?|深田は品格・歴史・個性という基準で山を選んだ。次のうち、彼が明言した3つの基準に含まれていなかったものはどれか?",
    ["How easy the mountain is to reach|Lo fácil que es llegar a la montaña|La facilité d'accès à la montagne|山への行きやすさ", "The mountain's individuality of shape|La individualidad de la forma de la montaña|L'individualité de la forme de la montagne|山の姿の個性", "The mountain's history|La historia de la montaña|L'histoire de la montagne|山の歴史"],
    0,
    "Fukada was explicit that ease of access played no part in his choices, which is why the list includes peaks like Poroshiri-dake and Sukai-san that demand a genuinely difficult approach with no shortcut available.|Fukada fue explícito en que la facilidad de acceso no influía en sus elecciones, por lo que la lista incluye picos como el Poroshiri-dake y el Sukai-san, que exigen una aproximación realmente difícil sin atajo posible.|Fukada précisa clairement que la facilité d'accès n'entrait pour rien dans ses choix, ce qui explique que la liste comprenne des sommets comme le Poroshiri-dake et le Sukai-san, exigeant une approche vraiment difficile sans raccourci possible.|深田は、行きやすさは選定に一切関係しないと明言していた。幌尻岳や皇海山のように、近道の無い本当に困難なアプローチを要する山がリストに入っているのはそのためである。",
  ),
  q(
    2,
    "What is the common Japanese word for a staffed mountain lodge where hikers can eat and sleep?|¿Cuál es la palabra japonesa habitual para un refugio de montaña con personal donde los excursionistas pueden comer y dormir?|Quel est le mot japonais courant pour un refuge de montagne gardé où les randonneurs peuvent manger et dormir ?|登山者が食事と宿泊をできる、係員のいる山小屋を指す一般的な日本語は?",
    ["Ryokan|Ryokan|Ryokan|旅館", "Minshuku|Minshuku|Minshuku|民宿", "Yamagoya|Yamagoya|Yamagoya|山小屋"],
    2,
    "A yamagoya ranges from a simple unstaffed shelter to a full lodge serving hot meals, and almost everything inside one above the treeline arrived on someone's back, by helicopter, or occasionally by an aerial cargo line.|Un yamagoya va desde un refugio sencillo sin personal hasta un albergue completo que sirve comidas calientes, y casi todo lo que hay dentro de uno por encima del límite del bosque llegó a espaldas de alguien, en helicóptero o, a veces, por una línea de carga aérea.|Un yamagoya va d'un simple abri non gardé à un véritable refuge servant des repas chauds, et presque tout ce qui s'y trouve au-dessus de la limite forestière est arrivé sur le dos de quelqu'un, par hélicoptère, ou parfois par un câble de transport aérien.|山小屋は無人の簡易な避難小屋から、温かい食事を出す本格的な宿までさまざまだが、樹林限界より上にある小屋の中身はほとんどが誰かの背かヘリコプター、時には索道で運び上げられたものである。",
  ),
  q(
    3,
    "Which government body is responsible for officially monitoring Japan's active volcanoes and issuing eruption alert levels?|¿Qué organismo gubernamental se encarga de vigilar oficialmente los volcanes activos de Japón y emitir los niveles de alerta de erupción?|Quel organisme gouvernemental est chargé de surveiller officiellement les volcans actifs du Japon et d'émettre les niveaux d'alerte d'éruption ?|日本の活火山を公式に監視し、噴火警戒レベルを発表する政府機関はどこか?",
    ["The Japan Meteorological Agency|La Agencia Meteorológica de Japón|L'Agence météorologique du Japon|気象庁", "The Ministry of Environment|El Ministerio de Medio Ambiente|Le ministère de l'Environnement|環境省", "The Self-Defense Forces|Las Fuerzas de Autodefensa|Les Forces d'autodéfense|自衛隊"],
    0,
    "The agency runs seismometers and cameras on volcanoes across the country and sets a five-level alert scale that can close a summit trail long before any eruption actually happens, purely on the strength of measured tremors.|La agencia opera sismómetros y cámaras en volcanes de todo el país y fija una escala de alerta de cinco niveles que puede cerrar un sendero cumbre mucho antes de que ocurra realmente una erupción, solo por la fuerza de los temblores medidos.|L'agence exploite des sismomètres et des caméras sur les volcans du pays entier et fixe une échelle d'alerte à cinq niveaux qui peut fermer un sentier sommital bien avant qu'une éruption ne survienne réellement, sur la seule foi des secousses mesurées.|気象庁は全国の火山に地震計とカメラを配置し、5段階の警戒レベルを設けている。実際の噴火が起きるずっと前でも、観測された震動の強さだけで山頂への登山道が閉鎖されることがある。",
  ),
  q(
    5,
    "In what year was the Japanese Alpine Club, one of Asia's oldest mountaineering associations, founded?|¿En qué año se fundó el Club Alpino Japonés, una de las asociaciones de montañismo más antiguas de Asia?|En quelle année le Club alpin japonais, l'une des plus anciennes associations d'alpinisme d'Asie, fut-il fondé ?|アジアでも最古級の山岳会である日本山岳会が創立されたのは何年か?",
    ["1905|1905|1905|1905年", "1925|1925|1925|1925年", "1945|1945|1945|1945年"],
    0,
    "Founded in 1905, the club later played a leading role in Japan's early Himalayan expeditions, and it still runs the mountain hut network and rescue coordination that much of the modern Hyakumeizan hiking boom depends on.|Fundado en 1905, el club desempeñó más tarde un papel destacado en las primeras expediciones japonesas al Himalaya, y aún gestiona la red de refugios de montaña y la coordinación de rescates de la que depende buena parte del auge moderno del senderismo del Hyakumeizan.|Fondé en 1905, le club joua plus tard un rôle de premier plan dans les premières expéditions japonaises dans l'Himalaya, et il gère encore le réseau de refuges de montagne et la coordination des secours dont dépend une grande partie du boom moderne de la randonnée du Hyakumeizan.|1905年に創立されたこの会は、のちに日本初期のヒマラヤ遠征で中心的な役割を果たし、今も山小屋のネットワークや遭難救助の調整を担っており、現代の百名山登山ブームの多くはそれに支えられている。",
  ),
  q(
    6,
    "The small pink alpine flower nicknamed the \"queen of alpine flowers,\" found on bare volcanic gravel slopes, is called what in Japanese?|La pequeña flor alpina rosa apodada la «reina de las flores alpinas», que crece en laderas de grava volcánica desnuda, ¿cómo se llama en japonés?|La petite fleur alpine rose surnommée la « reine des fleurs alpines », que l'on trouve sur les pentes de gravier volcanique nu, comment s'appelle-t-elle en japonais ?|裸の火山礫の斜面に咲く、「高山植物の女王」と呼ばれる小さなピンクの花を日本語で何というか?",
    ["Sakura|Sakura|Sakura|桜", "Komakusa|Komakusa|Komakusa|コマクサ", "Ajisai|Ajisai|Ajisai|紫陽花"],
    1,
    "Komakusa roots itself in loose volcanic scree where almost nothing else can grow, and its name, meaning \"horse grass,\" comes from a fancied resemblance between its curved petals and a horse's face.|La komakusa arraiga en pedregales volcánicos sueltos donde casi nada más puede crecer, y su nombre, que significa «hierba de caballo», viene de un supuesto parecido entre sus pétalos curvados y el rostro de un caballo.|La komakusa s'enracine dans des éboulis volcaniques meubles où presque rien d'autre ne pousse, et son nom, signifiant « herbe de cheval », vient d'une ressemblance imaginée entre ses pétales incurvés et le visage d'un cheval.|コマクサは他のほとんどの植物が育たない崩れやすい火山礫の斜面に根を張る。「駒草」という名は、反り返った花びらが馬の顔に似ているとされたことに由来する。",
  ),
  q(
    4,
    "What is the general Japanese term for the rite marking the opening of a mountain's climbing season each year?|¿Cuál es el término japonés general para el rito que marca la apertura de la temporada de ascenso de una montaña cada año?|Quel est le terme japonais général pour le rite marquant l'ouverture de la saison d'ascension d'une montagne chaque année ?|毎年、山の登山シーズンの始まりを告げる神事を指す一般的な日本語は?",
    ["Hatsumode|Hatsumode|Hatsumode|初詣", "Obon|Obon|Obon|お盆", "Yamabiraki|Yamabiraki|Yamabiraki|山開き"],
    2,
    "A yamabiraki, literally \"opening the mountain,\" is usually performed by priests at the trailhead shrine, and on many peaks the staffed huts do not open in full until this rite has taken place.|Un yamabiraki, literalmente «abrir la montaña», suele realizarlo el clero en el santuario del inicio del sendero, y en muchas cumbres los refugios con personal no abren del todo hasta que se celebra este rito.|Un yamabiraki, littéralement « ouvrir la montagne », est généralement accompli par des prêtres au sanctuaire du départ de sentier, et sur de nombreux sommets, les refuges gardés n'ouvrent pleinement qu'une fois ce rite célébré.|「山開き」とは文字どおり山を開く神事で、たいてい登山口の神社で神職によって執り行われる。多くの山では、この神事が済むまで有人の山小屋は本格的には開かない。",
  ),
  q(
    2,
    "What weather event, tracked closely from roughly July through October, most often forces sudden closures of trailhead buses and mountain huts?|¿Qué fenómeno meteorológico, seguido de cerca aproximadamente de julio a octubre, obliga con más frecuencia a cierres repentinos de autobuses de inicio de sendero y refugios de montaña?|Quel phénomène météorologique, suivi de près environ de juillet à octobre, force le plus souvent la fermeture soudaine des bus de départ de sentier et des refuges de montagne ?|だいたい7月から10月にかけて注意深く追跡され、登山口行きバスや山小屋の急な閉鎖を最もよく引き起こす気象現象は?",
    ["Typhoons|Tifones|Typhons|台風", "Sandstorms|Tormentas de arena|Tempêtes de sable|砂嵐", "Heatwaves|Olas de calor|Canicules|熱波"],
    0,
    "A typhoon's path is tracked for days before landfall, and huts and bus operators often cancel service well ahead of the worst weather rather than risk being caught mid-route when it arrives.|La trayectoria de un tifón se sigue durante días antes de tocar tierra, y los refugios y las compañías de autobús a menudo cancelan el servicio con mucha antelación al peor tiempo, en vez de arriesgarse a quedar atrapados en plena ruta.|La trajectoire d'un typhon est suivie pendant des jours avant qu'il ne touche terre, et les refuges et les compagnies de bus annulent souvent le service bien avant le plus fort de la tempête plutôt que de risquer d'être surpris en cours de route.|台風の進路は上陸の何日も前から追跡され、山小屋やバス会社は最悪の天候が来る前から、途中で立ち往生する危険を避けて早めに運行を取りやめることが多い。",
  ),
  q(
    5,
    "What is the Japanese term for a traditional porter who carries supplies to mountain huts on their own back, often paid by weight?|¿Cuál es el término japonés para un porteador tradicional que carga suministros a los refugios de montaña a la espalda, a menudo pagado por peso?|Quel est le terme japonais pour un porteur traditionnel qui monte des provisions aux refuges de montagne sur son propre dos, souvent payé au poids ?|しばしば重さに応じて報酬を得ながら、自分の背で山小屋へ荷を担ぎ上げる伝統的な運び手を指す日本語は?",
    ["Bokka|Bokka|Bokka|歩荷", "Sherpa|Sherpa|Sherpa|シェルパ", "Yamabushi|Yamabushi|Yamabushi|山伏"],
    0,
    "Professional bokka porters on some routes still carry loads well over sixty kilograms, and their trade predates any road or ropeway reaching the huts they still supply today.|Los porteadores bokka profesionales aún cargan en algunas rutas más de sesenta kilos, y su oficio es anterior a cualquier carretera o teleférico que llegara a los refugios que todavía abastecen hoy.|Les porteurs bokka professionnels transportent encore, sur certains itinéraires, des charges de plus de soixante kilos, et leur métier est antérieur à toute route ou téléphérique menant aux refuges qu'ils ravitaillent encore aujourd'hui.|プロの歩荷は、ルートによっては今も60kgを超える荷を担ぐ。その仕事は、彼らが今も物資を届ける山小屋に道路やロープウェイが通うより、ずっと前から続いている。",
  ),
  q(
    3,
    "Nagano prefecture, home to much of the Northern and Central Alps, hosted the Winter Olympics in which year?|La prefectura de Nagano, hogar de buena parte de los Alpes Septentrionales y Centrales, acogió los Juegos Olímpicos de Invierno en qué año?|La préfecture de Nagano, qui abrite une grande partie des Alpes du Nord et Centrales, a accueilli les Jeux olympiques d'hiver en quelle année ?|北アルプス・中央アルプスの多くを擁する長野県が冬季オリンピックを開催したのは何年か?",
    ["1988|1988|1988|1988年", "1998|1998|1998|1998年", "2008|2008|2008|2008年"],
    1,
    "The 1998 Nagano Games left behind a network of new expressways and shinkansen links that also shortened travel times to trailheads across the prefecture, from Hakuba's ski slopes to peaks deep in the Central Alps.|Los Juegos de Nagano de 1998 dejaron una red de nuevas autovías y enlaces de shinkansen que también acortaron los tiempos de viaje a los inicios de sendero de toda la prefectura, desde las pistas de Hakuba hasta picos en el corazón de los Alpes Centrales.|Les Jeux de Nagano de 1998 laissèrent un réseau de nouvelles autoroutes et de liaisons shinkansen qui raccourcit aussi les temps de trajet vers les départs de sentiers de toute la préfecture, des pistes de Hakuba jusqu'aux sommets au cœur des Alpes centrales.|1998年の長野五輪は、新しい高速道路網と新幹線の接続を残し、それが白馬のゲレンデから中央アルプス奥の山々まで、県内各地の登山口への所要時間も縮めることになった。",
  ),
  q(
    2,
    "What lightweight, water-rehydrated food is a common staple carried in Japanese hikers' backpacks?|¿Qué comida ligera, rehidratada con agua, es un alimento habitual en las mochilas de los excursionistas japoneses?|Quel aliment léger, réhydraté à l'eau, est un incontournable des sacs à dos des randonneurs japonais ?|軽量で、水を加えて戻す食品として、日本の登山者のザックによく入っているものは?",
    ["Fresh sushi|Sushi fresco|Sushi frais|生の寿司", "Canned soda|Refresco enlatado|Soda en canette|缶入りの炭酸飲料", "Freeze-dried meals|Comidas liofilizadas|Repas lyophilisés|フリーズドライ食品"],
    2,
    "Freeze-dried rice, curry and miso soup weigh a fraction of their fresh equivalent and keep for years unrefrigerated, which is why Japanese outdoor shops stock entire aisles of them for exactly this kind of trip.|El arroz, el curry y la sopa de miso liofilizados pesan una fracción de su equivalente fresco y se conservan años sin refrigeración, por lo que las tiendas de aire libre japonesas dedican pasillos enteros a ellos, justamente para este tipo de viaje.|Le riz, le curry et la soupe miso lyophilisés pèsent une fraction de leur équivalent frais et se conservent des années sans réfrigération, ce qui explique que les magasins de plein air japonais leur consacrent des rayons entiers, justement pour ce genre de sortie.|フリーズドライのご飯やカレー、味噌汁は生のものよりずっと軽く、冷蔵しなくても何年ももつ。日本のアウトドア用品店がこうした商品の棚を何列も設けているのは、まさにこの種の登山のためである。",
  ),
  q(
    3,
    "A torii gate, a common sight at the base or summit of many of the hundred, traditionally marks the boundary of what?|Un torii, algo común en la base o la cima de muchas de las cien, marca tradicionalmente el límite de qué?|Un torii, élément courant à la base ou au sommet de nombreux sommets parmi les cent, marque traditionnellement la limite de quoi ?|百名山の多くで麓や山頂に見られる鳥居は、伝統的に何の境界を示すものか?",
    ["A national park|Un parque nacional|Un parc national|国立公園", "Sacred shrine ground|Terreno sagrado de un santuario|Un terrain sacré de sanctuaire|神社の聖域", "A ski resort boundary|El límite de una estación de esquí|La limite d'une station de ski|スキー場の境界"],
    1,
    "Passing under a torii is traditionally understood as crossing from ordinary ground into space set aside for a kami, or deity, which is why many summit torii sit at the exact point a mountain's own shrine considers its threshold.|Pasar bajo un torii se entiende tradicionalmente como cruzar de un terreno ordinario a un espacio reservado para un kami, o deidad, por lo que muchos torii de cumbre se sitúan justo en el punto que el propio santuario de la montaña considera su umbral.|Passer sous un torii est traditionnellement compris comme le passage d'un terrain ordinaire à un espace réservé à un kami, une divinité, ce qui explique que de nombreux torii sommitaux se trouvent exactement au point que le sanctuaire de la montagne considère comme son seuil.|鳥居をくぐることは、伝統的にはただの土地から神が宿るとされる領域へ踏み入ることを意味するとされる。多くの山頂の鳥居が、その山自身の社が結界の入口とみなす、まさにその地点に立っているのはそのためである。",
  ),
  q(
    2,
    "What do climbers traditionally ring to give bears advance warning of their approach on forested trails?|¿Qué hacen sonar tradicionalmente los alpinistas para avisar con antelación a los osos de su llegada en senderos boscosos?|Que font traditionnellement sonner les alpinistes pour avertir les ours de leur approche sur les sentiers boisés ?|森の登山道で、クマに接近を前もって知らせるために登山者が伝統的に鳴らすものは?",
    ["Bells|Cascabeles|Des clochettes|鈴", "Whistles|Silbatos|Des sifflets|笛", "Drums|Tambores|Des tambours|太鼓"],
    0,
    "The idea is that a bear which hears a person coming from a distance will usually move off before any encounter takes place, so small bells clipped to a pack or belt are sold at trailhead shops across bear country.|La idea es que un oso que oye acercarse a una persona desde lejos suele apartarse antes de que se produzca ningún encuentro, así que se venden pequeños cascabeles para engancharlos a la mochila o el cinturón en las tiendas de los inicios de sendero de toda la zona de osos.|L'idée est qu'un ours entendant approcher une personne de loin s'écarte généralement avant toute rencontre, si bien que de petites clochettes à accrocher au sac ou à la ceinture se vendent dans les boutiques de départ de sentier en territoire d'ours.|人が近づく音を遠くから聞いた熊は、たいてい出くわす前に離れていくという考え方に基づく。ザックやベルトに付ける小さな鈴が、クマの生息地の登山口の売店で売られている。",
  ),
  q(
    5,
    "What is the standard map scale used for the detailed topographic maps most Japanese hikers carry?|¿Cuál es la escala estándar de los mapas topográficos detallados que llevan la mayoría de los excursionistas japoneses?|Quelle est l'échelle standard des cartes topographiques détaillées que portent la plupart des randonneurs japonais ?|多くの日本の登山者が携行する詳細な地形図の標準的な縮尺は?",
    ["1:5,000|1:5.000|1:5 000|5千分の1", "1:25,000|1:25.000|1:25 000|2万5千分の1", "1:250,000|1:250.000|1:250 000|25万分の1"],
    1,
    "The Geospatial Information Authority of Japan has surveyed the entire country at this scale since 1910, with contour lines drawn every 10 metres, close enough together to warn of a cliff long before the trail itself does.|El Instituto Geoespacial de Japón ha cartografiado todo el país a esta escala desde 1910, con curvas de nivel cada 10 metros, lo bastante juntas para avisar de un precipicio mucho antes que el propio sendero.|L'Institut géospatial du Japon cartographie tout le pays à cette échelle depuis 1910, avec des courbes de niveau tous les 10 mètres, assez rapprochées pour signaler une falaise bien avant que le sentier ne le fasse.|国土地理院はこの縮尺で1910年から全国を測量しており、等高線は10m間隔で引かれる。その詰まり具合は、登山道自体よりも先に崖の存在を告げてくれるほど細かい。",
  ),
  q(
    2,
    "What are the traditional straw sandals once worn by pilgrims and travelers on mountain paths called?|¿Cómo se llaman las tradicionales sandalias de paja que antes usaban peregrinos y viajeros en los caminos de montaña?|Comment appelle-t-on les traditionnelles sandales de paille jadis portées par les pèlerins et voyageurs sur les chemins de montagne ?|かつて巡礼者や旅人が山道で履いた伝統的な藁の履物は?",
    ["Geta|Geta|Geta|下駄", "Tabi|Tabi|Tabi|足袋", "Waraji|Waraji|Waraji|草鞋"],
    2,
    "Woven from rice straw and tied with long cords wrapped up the ankle, waraji wore out quickly and were cheap enough to be replaced every day or two on a long pilgrimage, which is why old trail villages once sold them by the roadside.|Tejidas con paja de arroz y atadas con largos cordones enrollados hasta el tobillo, las waraji se desgastaban rápido y eran lo bastante baratas como para reemplazarlas cada día o dos en una larga peregrinación.|Tissées en paille de riz et attachées avec de longs cordons enroulés jusqu'à la cheville, les waraji s'usaient vite et étaient assez bon marché pour être remplacées tous les jours ou deux lors d'un long pèlerinage.|稲藁で編み、長い紐を足首まで巻いて結ぶ草鞋は、すぐに擦り切れる代わりに安価で、長い巡礼の道中では一日か二日ごとに履き替えられた。古い宿場町が道端でこれを売っていたのはそのためである。",
  ),
  q(
    4,
    "The alpine bird considered a mountain guardian in Japanese folklore, found only above the treeline and now a protected species, is the ___.|El ave alpina considerada guardiana de la montaña en el folclore japonés, que solo se encuentra por encima del límite del bosque y hoy es especie protegida, es el ___.|L'oiseau alpin considéré comme le gardien de la montagne dans le folklore japonais, présent uniquement au-dessus de la limite forestière et aujourd'hui espèce protégée, est le ___.|日本の民話で山の守り神とされ、樹林限界より上でしか見られず、今は保護species種になっている高山の鳥は?",
    ["Crane|Grulla|Grue|鶴", "Ptarmigan|Lagópodo|Lagopède|雷鳥", "Sparrow|Gorrión|Moineau|雀"],
    1,
    "The Japanese rock ptarmigan's population in the Alps is the southernmost of the species in the world, a relict stranded above the treeline when the ice age climate that once suited it retreated to the highest ridges.|La población de lagópodo alpino japonés en los Alpes es la más meridional de la especie en el mundo, un vestigio varado por encima del límite del bosque cuando el clima de la edad de hielo que antes le convenía se retiró a las crestas más altas.|La population de lagopède alpin japonais dans les Alpes est la plus méridionale de l'espèce au monde, un vestige resté isolé au-dessus de la limite forestière quand le climat glaciaire qui lui convenait jadis s'est retiré sur les plus hautes crêtes.|北アルプスのニホンライチョウの個体群は世界最南限とされ、かつて適した気候だった氷期が高所の稜線へと後退したあとに取り残された生き残りである。",
  ),
  q(
    3,
    "Which of the following is not counted among Japan's traditional \"three sacred mountains\" alongside Mount Fuji?|¿Cuál de los siguientes no se cuenta entre las tradicionales «tres montañas sagradas» de Japón junto al monte Fuji?|Lequel des éléments suivants ne compte pas parmi les traditionnelles « trois montagnes sacrées » du Japon aux côtés du mont Fuji ?|富士山とともに日本の伝統的な「三霊山」に数えられないものは次のうちどれか?",
    ["Tate-yama|Tate-yama|Tate-yama|立山", "Haku-san|Haku-san|Haku-san|白山", "Kirishima-yama|Kirishima-yama|Kirishima-yama|霧島山"],
    2,
    "The three sacred mountains named together since the Edo period are Fuji-san, Tate-yama and Haku-san; Kirishima-yama has its own deep mythological significance in Kyushu but is not part of this particular trio.|Las tres montañas sagradas nombradas juntas desde el periodo Edo son el Fuji-san, el Tate-yama y el Haku-san; el Kirishima-yama tiene su propio profundo significado mitológico en Kyushu, pero no forma parte de este trío en concreto.|Les trois montagnes sacrées nommées ensemble depuis l'époque d'Edo sont le Fuji-san, le Tate-yama et le Haku-san ; le Kirishima-yama possède sa propre profonde signification mythologique à Kyushu, mais ne fait pas partie de ce trio précis.|江戸時代から並び称されてきた三霊山は富士山・立山・白山である。霧島山は九州で独自の深い神話的意味を持つ山だが、この三山には含まれない。",
  ),
  q(
    2,
    "\"Juhyo,\" the frost-coated fir trees nicknamed \"snow monsters\" seen at a few named Japanese ranges, are trees coated in what?|Los «juhyo», los abetos escarchados apodados «monstruos de nieve» que se ven en unas pocas cordilleras japonesas concretas, son árboles cubiertos de qué?|Les « juhyo », sapins givrés surnommés « monstres de neige » que l'on observe dans quelques massifs japonais nommés, sont des arbres recouverts de quoi ?|いくつかの名の知れた山域だけで見られる、樹氷「スノーモンスター」に覆われたモミの木は、何をまとった姿か?",
    ["Volcanic ash|Ceniza volcánica|Cendres volcaniques|火山灰", "Sea salt spray|Rocío de sal marina|Embruns d'eau salée|海の潮の飛沫", "Wind-driven ice|Hielo llevado por el viento|Glace poussée par le vent|風が運んだ氷"],
    2,
    "Juhyo form only where supercooled fog meets a strong, steady prevailing wind, a combination reliable at just a handful of named ranges like Zao and Hakkoda rather than everywhere winter cloud meets a forest.|El juhyo se forma solo donde la niebla sobreenfriada se encuentra con un viento fuerte y constante, una combinación fiable solo en un puñado de cordilleras concretas como Zao y Hakkoda, no en cualquier sitio donde la nube invernal encuentre un bosque.|Le juhyo ne se forme que là où un brouillard surfondu rencontre un vent dominant fort et régulier, une combinaison fiable seulement dans une poignée de massifs nommés comme le Zao et le Hakkoda, et non partout où un nuage hivernal rencontre une forêt.|樹氷は過冷却霧と強く安定した卓越風が重なる場所でしか形成されず、蔵王や八甲田のようなごく一部の名の知れた山域だけで安定して見られる、冬雲が森に触れればどこでも起きる現象ではない。",
  ),
  q(
    6,
    "Which haiku poet, famous for travel writing, is known to have journeyed through parts of the mountainous interior and written of Mount Fuji?|¿Qué poeta de haiku, famoso por sus escritos de viaje, se sabe que recorrió parte del interior montañoso y escribió sobre el monte Fuji?|Quel poète de haïku, célèbre pour ses récits de voyage, est connu pour avoir parcouru une partie de l'intérieur montagneux et avoir écrit sur le mont Fuji ?|紀行文で知られ、山がちな内陸部の一部を旅し富士山についても詠んだ俳人は誰か?",
    ["Matsuo Basho|Matsuo Basho|Matsuo Bashō|松尾芭蕉", "Murasaki Shikibu|Murasaki Shikibu|Murasaki Shikibu|紫式部", "Sen no Rikyu|Sen no Rikyu|Sen no Rikyū|千利休"],
    0,
    "Basho's 17th-century travel diaries, written as he walked much of Japan's interior, remain foundational texts of Japanese literature and are still quoted on trail signs near routes he is recorded to have taken.|Los diarios de viaje de Basho, del siglo XVII, escritos mientras recorría gran parte del interior de Japón, siguen siendo textos fundacionales de la literatura japonesa y aún se citan en carteles de senderos cerca de rutas que se sabe que tomó.|Les carnets de voyage de Bashō, écrits au XVIIe siècle alors qu'il parcourait une grande partie de l'intérieur du Japon, restent des textes fondateurs de la littérature japonaise et sont encore cités sur des panneaux de sentier près des itinéraires qu'il est connu avoir empruntés.|17世紀に日本の内陸部の多くを歩きながら記した芭蕉の紀行文は、今も日本文学の礎となる作品であり、彼が通ったと記録される道の近くの標識にはいまも引用されている。",
  ),
  q(
    7,
    "What Japanese term describes a hiker who has successfully climbed all one hundred of the Hyakumeizan?|¿Qué término japonés describe a un excursionista que ha escalado con éxito los cien picos del Hyakumeizan?|Quel terme japonais désigne un randonneur ayant gravi avec succès les cent sommets du Hyakumeizan ?|百名山をすべて登り終えた登山者を表す日本語は?",
    ["Kanto (complete ascent)|Kanto (ascenso completo)|Kanto (ascension complète)|完登", "Ronin|Ronin|Rōnin|浪人", "Zazen|Zazen|Zazen|座禅"],
    0,
    "Achieving kanto of the hundred has become enough of a recognised milestone that some climbers save a particularly meaningful peak, often Fuji-san or a remote one like Poroshiri-dake, for the final ascent on purpose.|Lograr el kanto de las cien se ha convertido en un hito lo bastante reconocido como para que algunos alpinistas guarden un pico especialmente significativo, a menudo el Fuji-san o uno remoto como el Poroshiri-dake, para la ascensión final a propósito.|Réaliser le kanto des cent est devenu un jalon assez reconnu pour que certains alpinistes réservent volontairement un sommet particulièrement significatif, souvent le Fuji-san ou un sommet reculé comme le Poroshiri-dake, pour l'ascension finale.|百座の「完登」は登山者のあいだで広く認められた節目になっており、あえて富士山や幌尻岳のような山を最後の一座として取っておく登山者もいる。",
  ),
  q(
    4,
    "What is the general elevation Fukada mostly aimed for when choosing peaks, with a small number of lower exceptions like Tsukuba-san?|¿A qué altitud general aspiraba Fukada al elegir picos, con un pequeño número de excepciones más bajas como el Tsukuba-san?|Quelle altitude générale visait Fukada dans le choix des sommets, avec un petit nombre d'exceptions plus basses comme le Tsukuba-san ?|筑波山のような少数の低い例外を除き、深田が山を選ぶ際におおむね目安にした標高は?",
    ["About 500 metres|Unos 500 metros|Environ 500 mètres|およそ500m", "About 3,500 metres|Unos 3.500 metros|Environ 3 500 mètres|およそ3500m", "About 1,500 metres|Unos 1.500 metros|Environ 1 500 mètres|およそ1500m"],
    2,
    "Fukada treated the figure as a guideline rather than a hard rule, which is exactly why a handful of shorter but culturally significant peaks made the final list anyway.|Fukada trató la cifra como orientación y no como una regla estricta, y precisamente por eso un puñado de picos más bajos pero culturalmente significativos entraron igualmente en la lista final.|Fukada traitait ce chiffre comme une ligne directrice plutôt qu'une règle stricte, ce qui explique justement qu'une poignée de sommets plus bas mais culturellement significatifs aient tout de même figuré sur la liste finale.|深田はこの数字を厳密な規則ではなく目安として扱った。だからこそ、標高は低くても文化的に重みのある一握りの山が、それでも最終的なリストに残ったのである。",
  ),
  q(
    3,
    "What is the sacred sunrise seen from a mountain summit, especially prized at Mount Fuji, called in Japanese?|¿Cómo se llama en japonés el amanecer sagrado visto desde una cumbre, especialmente apreciado en el monte Fuji?|Comment appelle-t-on en japonais le lever de soleil sacré vu depuis un sommet, particulièrement prisé au mont Fuji ?|山頂から見る、特に富士山で尊ばれる神聖な日の出を日本語で何というか?",
    ["Goraiko|Goraiko|Goraikō|御来光", "Hatsumode|Hatsumode|Hatsumōde|初詣", "Setsubun|Setsubun|Setsubun|節分"],
    0,
    "The word plays on a near-homophone for the arrival of Buddhist light, and climbers have long treated goraiko as reason enough in itself to start a summit push in the dark hours before dawn.|La palabra juega con un casi homófono de la llegada de la luz búdica, y desde hace mucho los alpinistas tratan el goraiko como motivo suficiente en sí mismo para emprender de noche el último tramo hacia la cima.|Le mot joue sur un quasi-homophone de l'arrivée de la lumière bouddhique, et les alpinistes traitent depuis longtemps le goraiko comme une raison suffisante en soi pour entamer l'ascension finale dans les heures sombres avant l'aube.|この語は「御来迎」、仏の光の到来を意味する語とほぼ同音であることに由来する。登山者は昔から御来光そのものを、夜明け前の暗いうちに山頂を目指す理由として十分なものと扱ってきた。",
  ),
  q(
    1,
    "Which is taller: Mount Fuji or Mount Everest?|¿Cuál es más alta: el monte Fuji o el monte Everest?|Lequel est le plus haut : le mont Fuji ou le mont Everest ?|富士山とエベレスト、高いのはどちらか?",
    ["Mount Fuji|El monte Fuji|Le mont Fuji|富士山", "Mount Everest|El monte Everest|Le mont Everest|エベレスト", "They are the same height|Tienen la misma altura|Ils ont la même hauteur|同じ高さ"],
    1,
    "Fuji-san stands 3,776 metres tall, the highest point in Japan, but that is still well under half the height of Everest's 8,849 metres, the highest point on Earth.|El Fuji-san mide 3.776 metros, el punto más alto de Japón, pero eso sigue siendo bien menos de la mitad de los 8.849 metros del Everest, el punto más alto de la Tierra.|Le Fuji-san culmine à 3 776 mètres, point culminant du Japon, ce qui reste toutefois bien moins de la moitié des 8 849 mètres de l'Everest, point culminant de la Terre.|富士山は標高3776mで日本最高峰だが、それでも地球最高地点であるエベレストの8849mの半分にも届かない。",
  ),
  q(
    6,
    "What is the traditional Japanese white climbing attire worn by pilgrims on sacred peaks such as Fuji, Ontake or Ishizuchi called?|¿Cómo se llama la tradicional vestimenta blanca de ascensión que llevan los peregrinos en cumbres sagradas como el Fuji, el Ontake o el Ishizuchi?|Comment appelle-t-on la traditionnelle tenue blanche d'ascension portée par les pèlerins sur des sommets sacrés comme le Fuji, l'Ontake ou l'Ishizuchi ?|富士山・御嶽山・石鎚山のような霊山で参詣者が身につける、伝統的な白い登拝装束を何というか?",
    ["Hakama|Hakama|Hakama|袴", "Kimono|Kimono|Kimono|着物", "Byakue|Byakue|Byakue|白衣"],
    2,
    "Byakue, meaning simply \"white robe,\" is worn by members of pilgrim confraternities as a mark of ritual purity for the climb, and the same white cloth is often stamped with red temple seals collected at stops along the route.|El byakue, que significa simplemente «túnica blanca», lo llevan los miembros de las cofradías de peregrinos como marca de pureza ritual para la ascensión, y a menudo la misma tela blanca se estampa con sellos rojos de templo recogidos en las paradas de la ruta.|Le byakue, signifiant simplement « robe blanche », est porté par les membres des confréries de pèlerins comme marque de pureté rituelle pour l'ascension, et le même tissu blanc est souvent tamponné de sceaux rouges de temple récoltés aux étapes du parcours.|「白衣」は文字どおり白い衣という意味で、登拝講の一員が登山の際の儀礼的な清らかさの印として身につける。同じ白布には、道中の立ち寄り所で集めた朱の判が押されることも多い。",
  ),
  q(
    3,
    "NHK has aired a long-running documentary series following the ascent of all one hundred peaks. In roughly what decade did it first air?|NHK ha emitido una larga serie documental que sigue la ascensión de los cien picos. ¿En qué década se emitió por primera vez, aproximadamente?|La NHK diffuse depuis longtemps une série documentaire suivant l'ascension des cent sommets. Dans quelle décennie environ a-t-elle été diffusée pour la première fois ?|NHKは百座すべての登頂を追う長寿ドキュメンタリー番組を放送してきた。初放送はおよそ何年代か?",
    ["The 1980s|Los años 80|Les années 1980|1980年代", "The 2000s|Los años 2000|Les années 2000|2000年代", "The 2020s|Los años 2020|Les années 2020|2020年代"],
    1,
    "NHK's 'Nihon Hyakumeizan' documentary series began airing in 2003, roughly forty years after Fukada's book, and its footage of peaks most viewers would never otherwise see is widely credited with turning a literary favourite into a mass hiking checklist.|La serie documental 'Nihon Hyakumeizan' de NHK empezó a emitirse en 2003, unos cuarenta años después del libro de Fukada, y sus imágenes de picos que la mayoría de espectadores nunca verían de otro modo se consideran responsables de convertir un favorito literario en una lista de senderismo de masas.|La série documentaire « Nihon Hyakumeizan » de la NHK a commencé à être diffusée en 2003, environ quarante ans après le livre de Fukada, et ses images de sommets que la plupart des téléspectateurs ne verraient sinon jamais sont largement créditées d'avoir transformé un livre culte en liste de randonnée de masse.|NHKのドキュメンタリー番組『日本百名山』は2003年に放送を開始した。深田の著書からおよそ40年後のことである。多くの視聴者が他では目にすることのない山々の映像が、文学作品としての人気を大衆的な登山目標リストへと押し上げたとされる。",
  ),
  q(
    2,
    "Place names like Rishiri, Rausu and Shari, borne by several Hokkaido peaks in the hundred, are largely derived from which language?|Nombres como Rishiri, Rausu y Shari, que llevan varios picos de Hokkaido entre las cien, derivan sobre todo de qué idioma?|Des noms comme Rishiri, Rausu et Shari, portés par plusieurs sommets de Hokkaido parmi les cent, dérivent en grande partie de quelle langue ?|利尻・羅臼・斜里など、百名山のうち北海道の山々の名の多くは、どの言語に由来するとされるか?",
    ["Ainu|Ainu|Aïnou|アイヌ語", "Portuguese|Portugués|Portugais|ポルトガル語", "Ryukyuan|Ryukyuense|Ryūkyūen|琉球語"],
    0,
    "Hokkaido was home to the Ainu long before Japanese settlement expanded there in the Meiji era, and many of the island's place names, mountains included, were adapted from Ainu words into Japanese script, though the exact original meanings are often debated by scholars today.|Hokkaido fue tierra ainu mucho antes de que la colonización japonesa se expandiera allí en la era Meiji, y muchos topónimos de la isla, montañas incluidas, se adaptaron de palabras ainu a la escritura japonesa, aunque los significados originales exactos suelen ser hoy objeto de debate académico.|Hokkaido était le pays des Aïnous bien avant que la colonisation japonaise ne s'y étende à l'ère Meiji, et de nombreux toponymes de l'île, montagnes comprises, furent adaptés de mots aïnous à l'écriture japonaise, bien que leur sens original exact soit souvent débattu par les chercheurs aujourd'hui.|北海道は明治期に日本からの入植が広がるはるか前からアイヌの土地であり、山を含む島内の多くの地名はアイヌ語の語を日本語の表記に当てはめたものである。ただし元の正確な意味については、今も研究者のあいだで異説が唱えられることが多い。",
  ),
  q(
    5,
    "What is the Japanese term for the low, dense pine that carpets the ground just below the summit on most of the hundred's higher peaks?|¿Cuál es el término japonés para el pino bajo y denso que cubre el suelo justo debajo de la cima en la mayoría de las cien cumbres más altas?|Quel est le terme japonais pour le pin bas et dense qui tapisse le sol juste sous le sommet de la plupart des cent plus hauts sommets ?|百名山のうち標高の高い山の多くで、山頂のすぐ下を覆う低く密生した松を日本語で何というか?",
    ["Sakura|Sakura|Sakura|桜", "Sugi|Sugi|Sugi|杉", "Haimatsu|Haimatsu|Haimatsu|ハイマツ"],
    2,
    "Haimatsu, or Japanese stone pine, grows so low and dense that hikers sometimes crawl through it rather than over it, and its presence roughly marks the line above which trees can no longer stand upright against the wind and snow.|El haimatsu, o pino rastrero japonés, crece tan bajo y denso que a veces los excursionistas se arrastran por él en vez de pasar por encima, y su presencia marca aproximadamente la línea por encima de la cual los árboles ya no pueden mantenerse erguidos contra el viento y la nieve.|Le haimatsu, ou pin rampant japonais, pousse si bas et si dense que les randonneurs le traversent parfois en rampant plutôt qu'en marchant dessus, et sa présence marque à peu près la limite au-delà de laquelle les arbres ne peuvent plus rester droits face au vent et à la neige.|ハイマツは低く密生して育つため、登山者はその上を歩くよりくぐり抜けることもある。その生育域はおおよそ、風雪に逆らって木がまっすぐ立てなくなる限界の目安になる。",
  ),
  q(
    4,
    "What is the name for the low, bamboo-like grass that forms dense undergrowth across many of Japan's mountain forests?|¿Cómo se llama la hierba baja parecida al bambú que forma un sotobosque denso en muchos bosques de montaña de Japón?|Comment appelle-t-on l'herbe basse en forme de bambou qui forme un sous-bois dense dans de nombreuses forêts de montagne du Japon ?|日本の山の森の多くで密な下草をつくる、竹に似た低い草を何というか?",
    ["Wasabi|Wasabi|Wasabi|わさび", "Kumazasa|Kumazasa|Kumazasa|クマザサ", "Susuki|Susuki|Susuki|すすき"],
    1,
    "Kumazasa, a hardy dwarf bamboo grass, covers so much of the forest floor on many peaks that it can outpace tree seedlings for light and space, and its name, meaning roughly 'bear bamboo grass,' reflects how thoroughly it dominates the undergrowth bears also move through.|El kumazasa, un resistente bambú enano, cubre tanto suelo forestal en muchas cumbres que puede ganarle luz y espacio a los brotes de árboles, y su nombre, que significa aproximadamente 'bambú de oso', refleja lo mucho que domina el sotobosque por el que también se mueven los osos.|Le kumazasa, un robuste bambou nain, couvre tant de sol forestier sur de nombreux sommets qu'il peut l'emporter sur les jeunes arbres pour la lumière et l'espace, et son nom, signifiant à peu près « bambou d'ours », reflète à quel point il domine le sous-bois que les ours traversent aussi.|クマザサは丈夫な小型の笹で、多くの山の森の地面を広く覆い、光と場所をめぐって木の苗にも負けないほど繁茂する。「熊笹」という名は、熊も通り抜けるその下草をどれほど覆い尽くしているかを表している。",
  ),
  q(
    5,
    "What is the Japanese term for a permanent or long-lasting snow gully on a mountainside, like the one on Shirouma-dake that lets hikers climb on snow into summer?|¿Cuál es el término japonés para un barranco de nieve permanente o duradero en una ladera, como el del Shirouma-dake, que permite subir sobre nieve hasta el verano?|Quel est le terme japonais pour un couloir de neige permanent ou durable sur un flanc de montagne, comme celui du Shirouma-dake, qui permet de grimper sur la neige jusqu'en été ?|白馬岳のように、夏まで雪の上を登れる山腹の恒常的な雪の谷を日本語で何というか?",
    ["Sekkei|Sekkei|Sekkei|雪渓", "Kaimon|Kaimon|Kaimon|開聞", "Tanada|Tanada|Tanada|棚田"],
    0,
    "A sekkei forms where snow accumulates in a steep gully faster each winter than it can melt away the following summer, and the largest examples on peaks like Shirouma-dake and Tsurugi-dake are counted among Japan's three largest permanent snowfields.|Un sekkei se forma donde la nieve se acumula en un barranco empinado más deprisa cada invierno de lo que puede derretirse el verano siguiente, y los mayores ejemplos en picos como el Shirouma-dake y el Tsurugi-dake se cuentan entre los tres mayores neveros permanentes de Japón.|Un sekkei se forme là où la neige s'accumule dans un couloir escarpé plus vite chaque hiver qu'elle ne peut fondre l'été suivant, et les plus grands exemples sur des sommets comme le Shirouma-dake et le Tsurugi-dake comptent parmi les trois plus grands névés permanents du Japon.|雪渓は、急な谷に積もる雪が翌夏に融ける量を毎冬上回る場所にできる。白馬岳や剱岳のような山の大きな雪渓は、日本三大雪渓に数えられる。",
  ),
  q(
    5,
    "What is the Japanese term for a mountain hut's live-in manager, who often spends the entire climbing season at the same lodge?|¿Cuál es el término japonés para el encargado residente de un refugio de montaña, que a menudo pasa toda la temporada de ascensión en el mismo alojamiento?|Quel est le terme japonais pour le gérant résident d'un refuge de montagne, qui passe souvent toute la saison d'ascension dans le même établissement ?|同じ山小屋で登山シーズンをまるごと過ごすことも多い、住み込みの山小屋の管理人を日本語で何というか?",
    ["Sensei|Sensei|Sensei|先生", "Shomin|Shomin|Shomin|庶民", "Koyaban|Koyaban|Koyaban|小屋番"],
    2,
    "A koyaban does far more than check guests in, hauling supplies, forecasting weather from the sky and the radio alike, and sometimes keeping a hut running single-handedly through a summer with only occasional help flown or carried up from the valley.|Un koyaban hace mucho más que registrar huéspedes: acarrea suministros, pronostica el tiempo a partir del cielo y de la radio, y a veces mantiene un refugio en marcha él solo durante un verano con ayuda ocasional llevada desde el valle.|Un koyaban fait bien plus qu'accueillir les hôtes : il monte les provisions, prévoit le temps aussi bien à l'œil qu'à la radio, et parfois fait tourner un refuge à lui seul tout un été, avec une aide occasionnelle montée depuis la vallée.|小屋番は宿泊客の受け入れだけでなく、荷揚げをこなし、空模様とラジオの両方から天気を読み、時にはたまに谷から運ばれる助けだけを頼りに、夏のあいだ小屋をほとんど一人で切り盛りする。",
  ),
  q(
    6,
    "Before devoting himself to mountain writing, Kyuya Fukada was primarily known in literary circles as a writer of what?|Antes de dedicarse a la escritura de montaña, ¿por qué se le conocía principalmente a Kyuya Fukada en los círculos literarios?|Avant de se consacrer à l'écriture de montagne, pour quoi Kyūya Fukada était-il surtout connu dans les cercles littéraires ?|山岳文学に専念する前、深田久弥は文壇でおもに何の書き手として知られていたか?",
    ["Novels|Novelas|Romans|小説", "Newspaper comics|Tiras cómicas de periódico|Bandes dessinées de journal|新聞漫画", "Stage plays|Obras de teatro|Pièces de théâtre|戯曲"],
    0,
    "Fukada began his career as a novelist and was nominated for the Akutagawa Prize, one of Japan's most prestigious literary awards, before the mountain essays that became 'Nihon Hyakumeizan' came to define his later reputation.|Fukada empezó su carrera como novelista y fue candidato al Premio Akutagawa, uno de los galardones literarios más prestigiosos de Japón, antes de que los ensayos de montaña que se convirtieron en 'Nihon Hyakumeizan' definieran su reputación posterior.|Fukada débuta sa carrière comme romancier et fut nommé pour le prix Akutagawa, l'une des récompenses littéraires les plus prestigieuses du Japon, avant que les essais de montagne devenus 'Nihon Hyakumeizan' ne définissent sa réputation ultérieure.|深田は小説家として文筆を始め、日本でも屈指の権威ある文学賞である芥川賞の候補にもなった。のちに『日本百名山』となる山岳随筆が、その後の彼の評価を決定づける前のことである。",
  ),
  q(
    1,
    "Which sea lies along the western coast of Honshu, facing many of the hundred's Jōshin'etsu and San'in peaks?|¿Qué mar bordea la costa occidental de Honshu, frente a muchos de los picos de Jōshin'etsu y San'in de las cien?|Quelle mer borde la côte ouest de Honshu, face à de nombreux sommets du Jōshin'etsu et du San'in parmi les cent ?|本州の西岸に広がり、百名山のうち上信越や山陰の山々に面する海はどれか?",
    ["The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Sea of Japan|El mar de Japón|La mer du Japon|日本海", "The East China Sea|El mar de la China Oriental|La mer de Chine orientale|東シナ海"],
    1,
    "Cold, moisture-laden air crossing the Sea of Japan from Siberia is what buries the western slopes of peaks like Myoko-san and Haku-san under some of the heaviest snowfall in the world each winter, the same weather engine that powers the region's ski industry.|El aire frío y cargado de humedad que cruza el mar de Japón desde Siberia es lo que sepulta las laderas occidentales de picos como el Myoko-san y el Haku-san bajo algunas de las nevadas más intensas del mundo cada invierno.|L'air froid et chargé d'humidité traversant la mer du Japon depuis la Sibérie est ce qui ensevelit les versants ouest de sommets comme le Myoko-san et le Haku-san sous certaines des chutes de neige les plus abondantes au monde chaque hiver.|シベリアから日本海を渡ってくる冷たく湿った空気が、妙高山や白山のような山の西側斜面を毎冬、世界でも屈指の豪雪で埋める。同じ気象の仕組みが、この地域のスキー産業も支えている。",
  ),
];
