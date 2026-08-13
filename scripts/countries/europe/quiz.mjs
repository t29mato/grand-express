/**
 * ヨーロッパのクイズ(50問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その大陸の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(50件)が扱う具体的な事実(イルンの1668mm軌間・ウィーンの
 * ドナウ川の名前・ブレストの台車履き替えなど)はここでは問わない。
 * 代わりに、大陸ぜんぶの地理・歴史・言語・文化・科学など、
 * **都市カードが触れていない主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs europe
 * ```
 * まだ焼いていないので走らせていない。焼いたあとの確認をお願いしたい。
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

export const EUROPE_QUIZ = [
  q(
    1,
    "What is the longest river in Europe?|¿Cuál es el río más largo de Europa?|Quel est le plus long fleuve d'Europe ?|ヨーロッパでいちばん長い川は?",
    [
      "The Volga|El Volga|La Volga|ヴォルガ川",
      "The Danube|El Danubio|Le Danube|ドナウ川",
      "The Rhine|El Rin|Le Rhin|ライン川",
    ],
    0,
    "The Volga flows entirely within Russia for about 3,530 kilometres before reaching the Caspian Sea, more than twice the length of the Danube.|El Volga fluye enteramente por Rusia a lo largo de unos 3.530 kilómetros antes de llegar al mar Caspio, más del doble que el Danubio.|La Volga coule entièrement en Russie sur environ 3 530 kilomètres avant d'atteindre la mer Caspienne, plus du double du Danube.|ヴォルガ川はロシア国内だけを約3530km流れてカスピ海に至る。ドナウ川の2倍以上の長さである。",
  ),
  q(
    1,
    "Which strait separates Europe from Africa at its narrowest point?|¿Qué estrecho separa Europa de África en su punto más estrecho?|Quel détroit sépare l'Europe de l'Afrique à son point le plus étroit ?|ヨーロッパとアフリカを最も狭い場所で隔てる海峡は?",
    [
      "The Bosphorus|El Bósforo|Le Bosphore|ボスポラス海峡",
      "The Strait of Gibraltar|El Estrecho de Gibraltar|Le détroit de Gibraltar|ジブラルタル海峡",
      "The English Channel|El Canal de la Mancha|La Manche|イギリス海峡",
    ],
    1,
    "At its narrowest, the Strait of Gibraltar is only about 14 kilometres wide, close enough that Morocco is visible from southern Spain on a clear day.|En su punto más estrecho, el Estrecho de Gibraltar mide solo unos 14 kilómetros, lo bastante cerca como para ver Marruecos desde el sur de España en un día despejado.|À son point le plus étroit, le détroit de Gibraltar ne fait qu'environ 14 kilomètres de large, assez proche pour que le Maroc soit visible depuis le sud de l'Espagne par temps clair.|ジブラルタル海峡は最も狭い場所でわずか14kmほどしかなく、晴れた日にはスペイン南部からモロッコが見える。",
  ),
  q(
    1,
    "What currency is shared by most European Union countries?|¿Qué moneda comparten la mayoría de los países de la Unión Europea?|Quelle monnaie partagent la plupart des pays de l'Union européenne ?|EU加盟国の多くが共有する通貨は?",
    [
      "The franc|El franco|Le franc|フラン",
      "The pound|La libra|La livre|ポンド",
      "The euro|El euro|L'euro|ユーロ",
    ],
    2,
    "The euro entered circulation as coins and banknotes in 2002, though it had already been used for electronic payments and bank accounts since 1999.|El euro entró en circulación como monedas y billetes en 2002, aunque ya se usaba para pagos electrónicos y cuentas bancarias desde 1999.|L'euro est entré en circulation sous forme de pièces et de billets en 2002, bien qu'il ait déjà servi aux paiements électroniques et aux comptes bancaires depuis 1999.|ユーロが硬貨と紙幣として流通し始めたのは2002年だが、電子決済や銀行口座ではすでに1999年から使われていた。",
  ),
  q(
    2,
    "Which sea lies between the Italian Peninsula and Croatia?|¿Qué mar se encuentra entre la península italiana y Croacia?|Quelle mer se trouve entre la péninsule italienne et la Croatie ?|イタリア半島とクロアチアのあいだにある海は?",
    [
      "The Adriatic Sea|El mar Adriático|La mer Adriatique|アドリア海",
      "The Tyrrhenian Sea|El mar Tirreno|La mer Tyrrhénienne|ティレニア海",
      "The Ionian Sea|El mar Jónico|La mer Ionienne|イオニア海",
    ],
    0,
    "The Adriatic runs roughly 800 kilometres from the Alps down to the heel of Italy's boot, with a smooth Italian coast on one side and a deeply indented coast on the other.|El Adriático se extiende unos 800 kilómetros desde los Alpes hasta el talón de la bota italiana, con una costa italiana lisa a un lado y una costa muy recortada al otro.|L'Adriatique s'étend sur environ 800 kilomètres depuis les Alpes jusqu'au talon de la botte italienne, avec une côte italienne lisse d'un côté et une côte très découpée de l'autre.|アドリア海はアルプスからイタリア半島の「かかと」まで約800km続く。片側はなだらかなイタリアの海岸、もう片側は入り組んだ海岸である。",
  ),
  q(
    2,
    "What natural phenomenon lights up the winter night sky across Scandinavia?|¿Qué fenómeno natural ilumina el cielo nocturno de invierno en Escandinavia?|Quel phénomène naturel illumine le ciel nocturne hivernal en Scandinavie ?|スカンディナヴィアの冬の夜空を照らす自然現象は?",
    [
      "Zodiacal light|La luz zodiacal|La lumière zodiacale|黄道光",
      "The aurora borealis|La aurora boreal|L'aurore boréale|オーロラ(北極光)",
      "Bioluminescent plankton|Plancton bioluminiscente|Le plancton bioluminescent|生物発光プランクトン",
    ],
    1,
    "The lights are caused by charged particles from the sun colliding with gases in the upper atmosphere, and they are visible most nights of the winter above the Arctic Circle if the sky is clear.|Las luces las causan partículas cargadas del sol que chocan con los gases de la atmósfera superior, y son visibles casi todas las noches de invierno por encima del Círculo Polar Ártico si el cielo está despejado.|Ces lumières sont causées par des particules chargées venues du soleil qui entrent en collision avec les gaz de la haute atmosphère, et elles sont visibles presque toutes les nuits d'hiver au-dessus du cercle polaire arctique par temps clair.|オーロラは、太陽からの荷電粒子が上空の大気中の気体とぶつかって起こる現象で、北極圏より北では空さえ晴れていれば冬のほとんどの夜に見られる。",
  ),
  q(
    3,
    "Which mountain range do geographers traditionally treat as the boundary between Europe and Asia?|¿Qué cordillera consideran tradicionalmente los geógrafos como la frontera entre Europa y Asia?|Quelle chaîne de montagnes les géographes considèrent-ils traditionnellement comme la frontière entre l'Europe et l'Asie ?|地理学者が伝統的にヨーロッパとアジアの境とみなす山脈は?",
    [
      "The Caucasus Mountains|Las montañas del Cáucaso|Les monts du Caucase|カフカス山脈",
      "The Carpathian Mountains|Los Cárpatos|Les Carpates|カルパティア山脈",
      "The Ural Mountains|Los montes Urales|Les monts Oural|ウラル山脈",
    ],
    2,
    "The convention dates to an 18th-century Russian geographer, and it places most of Russia in Asia even though the country's political capital, Moscow, sits well within the European side.|La convención se remonta a un geógrafo ruso del siglo XVIII, y sitúa la mayor parte de Rusia en Asia, aunque la capital política del país, Moscú, se encuentra bien dentro del lado europeo.|Cette convention remonte à un géographe russe du XVIIIe siècle, et elle place l'essentiel de la Russie en Asie, même si la capitale politique du pays, Moscou, se trouve bien du côté européen.|この慣例は18世紀のロシア人地理学者にさかのぼり、ロシアの大半をアジア側に置くが、政治の首都モスクワはヨーロッパ側にしっかり収まっている。",
  ),
  q(
    2,
    "What is the capital of Poland?|¿Cuál es la capital de Polonia?|Quelle est la capitale de la Pologne ?|ポーランドの首都は?",
    [
      "Warsaw|Varsovia|Varsovie|ワルシャワ",
      "Kraków|Cracovia|Cracovie|クラクフ",
      "Gdańsk|Gdansk|Gdańsk|グダニスク",
    ],
    0,
    "Warsaw was almost entirely destroyed in the Second World War and rebuilt afterward from old paintings and architectural drawings, brick by brick, to look as it had before.|Varsovia quedó casi completamente destruida en la Segunda Guerra Mundial y se reconstruyó después a partir de viejos cuadros y planos arquitectónicos, ladrillo a ladrillo, para que se pareciera a como era antes.|Varsovie fut presque entièrement détruite pendant la Seconde Guerre mondiale et reconstruite ensuite à partir de vieux tableaux et de plans d'architecte, brique par brique, pour ressembler à ce qu'elle était avant.|ワルシャワは第二次世界大戦でほぼ完全に破壊されたが、戦後、古い絵画や建築図面をもとに、以前と同じ姿になるよう一つ一つ煉瓦を積み直して再建された。",
  ),
  q(
    3,
    "Which composer wrote the waltz known as \"The Blue Danube\"?|¿Qué compositor escribió el vals conocido como «El Danubio azul»?|Quel compositeur a écrit la valse connue sous le nom du « Beau Danube bleu » ?|「美しく青きドナウ」というワルツを作曲したのは?",
    [
      "Wolfgang Amadeus Mozart|Wolfgang Amadeus Mozart|Wolfgang Amadeus Mozart|ヴォルフガング・アマデウス・モーツァルト",
      "Johann Strauss II|Johann Strauss II|Johann Strauss II|ヨハン・シュトラウス2世",
      "Ludwig van Beethoven|Ludwig van Beethoven|Ludwig van Beethoven|ルートヴィヒ・ヴァン・ベートーヴェン",
    ],
    1,
    "Strauss wrote it in 1866 for a men's choir, and it flopped at its first performance in Vienna; only after he rearranged it as an orchestral piece for a Paris exhibition did it become one of the most recognisable tunes in the world.|Strauss lo compuso en 1866 para un coro masculino, y fracasó en su primer estreno en Viena; solo al reordenarlo como pieza orquestal para una exposición en París se convirtió en una de las melodías más reconocibles del mundo.|Strauss l'écrivit en 1866 pour un chœur d'hommes, et la première à Vienne fut un échec ; ce n'est qu'après l'avoir réarrangé en pièce orchestrale pour une exposition à Paris qu'il devint l'un des airs les plus reconnaissables au monde.|シュトラウスは1866年、男声合唱のためにこの曲を書いたが、ウィーンでの初演は不評だった。パリの博覧会向けに管弦楽曲へ編曲し直して初めて、世界でも指折りの誰もが知る旋律になった。",
  ),
  q(
    3,
    "Which 1957 treaty founded the European Economic Community, a forerunner of today's EU?|¿Qué tratado de 1957 fundó la Comunidad Económica Europea, precursora de la actual UE?|Quel traité de 1957 fonda la Communauté économique européenne, ancêtre de l'UE actuelle ?|今のEUの前身、欧州経済共同体を作った1957年の条約は?",
    [
      "The Treaty of Paris|El Tratado de París|Le traité de Paris|パリ条約",
      "The Treaty of Maastricht|El Tratado de Maastricht|Le traité de Maastricht|マーストリヒト条約",
      "The Treaty of Rome|El Tratado de Roma|Le traité de Rome|ローマ条約",
    ],
    2,
    "Signed by six founding countries, the treaty aimed above all to make a future war between them practically impossible by tying their coal, steel and wider economies together.|Firmado por seis países fundadores, el tratado buscaba sobre todo hacer prácticamente imposible una guerra futura entre ellos, entrelazando su carbón, su acero y sus economías en general.|Signé par six pays fondateurs, le traité visait avant tout à rendre une future guerre entre eux pratiquement impossible en liant leur charbon, leur acier et leurs économies plus largement.|六つの原加盟国が署名したこの条約は、何より石炭・鉄鋼から経済全般までを結びつけることで、加盟国どうしの将来の戦争を事実上不可能にすることを目指した。",
  ),
  q(
    3,
    "Which country is generally credited with codifying the modern rules of association football in 1863?|¿A qué país se atribuye generalmente la codificación de las reglas modernas del fútbol en 1863?|Quel pays est généralement crédité d'avoir codifié les règles modernes du football en 1863 ?|1863年に近代サッカーの規則を初めて定めたとされる国は?",
    [
      "England|Inglaterra|L'Angleterre|イングランド",
      "Scotland|Escocia|L'Écosse|スコットランド",
      "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ",
    ],
    0,
    "Representatives of several English football clubs met in a London tavern to agree on a single set of rules, splitting off from a rugby-like game that allowed carrying the ball with the hands.|Representantes de varios clubes de fútbol ingleses se reunieron en una taberna de Londres para acordar un único reglamento, separándose de un juego parecido al rugby que permitía llevar el balón con las manos.|Des représentants de plusieurs clubs de football anglais se réunirent dans une taverne londonienne pour s'accorder sur un règlement unique, se séparant d'un jeu proche du rugby qui autorisait à porter le ballon à la main.|複数のイングランドのサッカークラブの代表がロンドンの酒場に集まり、単一の規則に合意した。これによって、手でボールを持てるラグビーに似た競技から分かれた。",
  ),
  q(
    4,
    "Which European country generates the largest share of its electricity from nuclear power stations?|¿Qué país europeo genera la mayor parte de su electricidad en centrales nucleares?|Quel pays européen produit la plus grande part de son électricité dans des centrales nucléaires ?|原子力発電所で発電量のいちばん大きな割合をまかなっているヨーロッパの国は?",
    [
      "Germany|Alemania|L'Allemagne|ドイツ",
      "France|Francia|La France|フランス",
      "Poland|Polonia|La Pologne|ポーランド",
    ],
    1,
    "France has drawn more than two-thirds of its electricity from nuclear reactors for decades, a far larger share than any other country, a policy launched after the 1970s oil shocks left the country wanting to import less energy.|Francia lleva décadas obteniendo más de dos tercios de su electricidad de reactores nucleares, una proporción muy superior a la de cualquier otro país, una política lanzada tras las crisis del petróleo de los años setenta.|La France tire depuis des décennies plus des deux tiers de son électricité de réacteurs nucléaires, une part bien plus élevée que dans tout autre pays, une politique lancée après les chocs pétroliers des années 1970.|フランスは何十年ものあいだ、発電量の3分の2以上を原子力でまかなってきた。これは他のどの国よりも際立って高い割合で、1970年代の石油危機を受けてエネルギー輸入を減らそうと始まった政策である。",
  ),
  q(
    4,
    "Which alphabet is used to write Bulgarian, Serbian and Russian?|¿Qué alfabeto se usa para escribir búlgaro, serbio y ruso?|Quel alphabet sert à écrire le bulgare, le serbe et le russe ?|ブルガリア語・セルビア語・ロシア語を書くのに使われる文字は?",
    [
      "The Glagolitic alphabet|El alfabeto glagolítico|L'alphabet glagolitique|グラゴル文字",
      "The Greek alphabet|El alfabeto griego|L'alphabet grec|ギリシャ文字",
      "The Cyrillic alphabet|El alfabeto cirílico|L'alphabet cyrillique|キリル文字",
    ],
    2,
    "Cyrillic developed in the 9th or 10th century, credited to followers of the missionaries Cyril and Methodius, and today more than a dozen Slavic and non-Slavic languages across Eastern Europe and Central Asia are written in it.|El cirílico se desarrolló en el siglo IX o X, atribuido a seguidores de los misioneros Cirilo y Metodio, y hoy más de una decena de lenguas eslavas y no eslavas de Europa del Este y Asia Central se escriben con él.|Le cyrillique s'est développé au IXe ou Xe siècle, attribué à des disciples des missionnaires Cyrille et Méthode, et plus d'une dizaine de langues slaves et non slaves d'Europe de l'Est et d'Asie centrale s'écrivent aujourd'hui avec lui.|キリル文字は9世紀か10世紀に成立したとされ、宣教師キュリロスとメトディオスの弟子たちの手によるものとされる。いまでは東欧から中央アジアにかけて、スラブ系・非スラブ系合わせて十以上の言語がこの文字で書かれる。",
  ),
  q(
    4,
    "Europe's highest active volcano sits on which island?|¿En qué isla se encuentra el volcán activo más alto de Europa?|Sur quelle île se trouve le volcan actif le plus haut d'Europe ?|ヨーロッパでいちばん標高の高い活火山があるのはどの島か?",
    [
      "Sicily|Sicilia|La Sicile|シチリア島",
      "Crete|Creta|La Crète|クレタ島",
      "Iceland (the mainland, not an island in this sense)|Islandia|L'Islande|アイスランド本島",
    ],
    0,
    "Mount Etna rises to about 3,350 metres and has been erupting on and off for thousands of years, with vineyards and towns still built on its fertile lower slopes despite the risk.|El Etna se eleva unos 3.350 metros y lleva miles de años entrando en erupción de forma intermitente, con viñedos y pueblos que aun así se construyen en sus fértiles laderas bajas.|L'Etna culmine à environ 3 350 mètres et entre en éruption par intermittence depuis des milliers d'années, avec des vignobles et des villages toujours bâtis sur ses versants inférieurs fertiles malgré le risque.|エトナ山は標高およそ3350mで、何千年ものあいだ断続的に噴火を繰り返してきた。危険にもかかわらず、肥沃な裾野にはいまもぶどう畑や町が築かれている。",
  ),
  q(
    4,
    "Which country is generally credited with the ancestor of the croissant, a curved pastry called the kipferl?|¿A qué país se atribuye generalmente el antepasado del cruasán, un hojaldre curvo llamado kipferl?|Quel pays est généralement crédité de l'ancêtre du croissant, une pâtisserie recourbée appelée kipferl ?|クロワッサンの原型とされる三日月形の菓子パン、キプフェルはどこの国が発祥とされるか?",
    [
      "France|Francia|La France|フランス",
      "Austria|Austria|L'Autriche|オーストリア",
      "Belgium|Bélgica|La Belgique|ベルギー",
    ],
    1,
    "Vienna's bakers were making the crescent-shaped kipferl centuries before the modern, flakier croissant took shape in France, though the exact link between the two is more folklore than documented fact.|Los panaderos de Viena hacían el kipferl con forma de media luna siglos antes de que el cruasán moderno y hojaldrado tomara forma en Francia, aunque el vínculo exacto entre ambos es más leyenda que hecho documentado.|Les boulangers viennois confectionnaient le kipferl en croissant de lune des siècles avant que le croissant moderne et feuilleté ne prenne forme en France, bien que le lien exact entre les deux relève plus de la légende que du fait documenté.|ウィーンのパン職人は、フランスで現代の層状のクロワッサンが生まれるずっと前から、三日月形のキプフェルを焼いていた。ただし両者を結ぶ確かな史実は、伝承の域を出ていない。",
  ),
  q(
    5,
    "Which university, founded in 1088, is often cited as the oldest continuously operating university in the world?|¿Qué universidad, fundada en 1088, se cita a menudo como la más antigua del mundo en funcionamiento continuo?|Quelle université, fondée en 1088, est souvent citée comme la plus ancienne université du monde en activité continue ?|1088年創立で、世界最古の継続して運営される大学とされることが多いのは?",
    [
      "The University of Paris|La Universidad de París|L'université de Paris|パリ大学",
      "The University of Oxford|La Universidad de Oxford|L'université d'Oxford|オックスフォード大学",
      "The University of Bologna|La Universidad de Bolonia|L'université de Bologne|ボローニャ大学",
    ],
    2,
    "Bologna's university began as a school of law, and students there historically held enough collective power to hire and fire their own professors, an arrangement almost unheard of elsewhere.|La universidad de Bolonia empezó como una escuela de derecho, y sus estudiantes tuvieron históricamente poder colectivo suficiente para contratar y despedir a sus propios profesores, algo casi inaudito en otros lugares.|L'université de Bologne débuta comme une école de droit, et ses étudiants disposèrent historiquement d'un pouvoir collectif suffisant pour embaucher et renvoyer leurs propres professeurs, une situation presque inouïe ailleurs.|ボローニャ大学は法学校として始まり、そこの学生はかつて、自分たちの教授を雇ったり解雇したりできるほどの集団としての権限を持っていた。他の土地ではほとんど例のない仕組みである。",
  ),
  q(
    5,
    "The philosopher Immanuel Kant, who wrote the \"Critique of Pure Reason,\" spent his entire life in which East Prussian city?|¿En qué ciudad de Prusia Oriental pasó toda su vida el filósofo Immanuel Kant, autor de la «Crítica de la razón pura»?|Dans quelle ville de Prusse-Orientale le philosophe Emmanuel Kant, auteur de la « Critique de la raison pure », passa-t-il toute sa vie ?|『純粋理性批判』を著した哲学者イマヌエル・カントが生涯を過ごした東プロイセンの町は?",
    [
      "Königsberg|Königsberg|Königsberg|ケーニヒスベルク",
      "Danzig|Danzig|Dantzig|ダンツィヒ",
      "Riga|Riga|Riga|リガ",
    ],
    0,
    "Kant famously never travelled more than about 150 kilometres from his birthplace in his entire life, and townspeople were said to set their clocks by his daily walk.|Se cuenta que Kant nunca viajó más de unos 150 kilómetros de su ciudad natal en toda su vida, y que los vecinos ponían el reloj en hora con su paseo diario.|Kant, dit-on, ne voyagea jamais à plus de 150 kilomètres de sa ville natale de toute sa vie, et les habitants réglaient, raconte-t-on, leur horloge sur sa promenade quotidienne.|カントは生涯、生まれた町から150kmほどより遠くへ旅したことがなかったとされ、町の人々は彼の日課の散歩に合わせて時計を合わせたと言われる。",
  ),
  q(
    5,
    "Finnish, Estonian and Hungarian belong to which language family, setting them apart from most of their neighbours?|¿A qué familia lingüística pertenecen el finés, el estonio y el húngaro, distinguiéndolos de la mayoría de sus vecinos?|À quelle famille de langues appartiennent le finnois, l'estonien et le hongrois, les distinguant de la plupart de leurs voisins ?|フィンランド語・エストニア語・ハンガリー語が属し、近隣の言語の多くと一線を画す語族は?",
    [
      "Balto-Slavic|Baltoeslava|Balto-slave|バルト・スラブ語派",
      "Uralic|Urálica|Ouralienne|ウラル語族",
      "Romance|Romance|Romane|ロマンス語派",
    ],
    1,
    "Because most of Europe speaks Indo-European languages, Uralic speakers are surrounded by tongues that share almost no basic vocabulary with their own, which is part of why Hungarian in particular has a reputation for being difficult to learn.|Como la mayor parte de Europa habla lenguas indoeuropeas, los hablantes urálicos están rodeados de idiomas que no comparten casi nada de vocabulario básico con el suyo, lo cual explica en parte la fama del húngaro de ser difícil de aprender.|Comme la majeure partie de l'Europe parle des langues indo-européennes, les locuteurs ouraliens sont entourés de langues qui ne partagent presque aucun vocabulaire de base avec la leur, ce qui explique en partie la réputation du hongrois d'être difficile à apprendre.|ヨーロッパの大半はインド・ヨーロッパ語族の言語を話すため、ウラル語族の話者は基礎語彙すらほとんど共有しない言語に囲まれている。ハンガリー語がとりわけ習得しにくいと言われる理由の一つでもある。",
  ),
  q(
    5,
    "The 1815 congress that redrew the map of Europe after the Napoleonic Wars was held in which city?|¿En qué ciudad se celebró el congreso de 1815 que rediseñó el mapa de Europa tras las guerras napoleónicas?|Dans quelle ville se tint le congrès de 1815 qui redessina la carte de l'Europe après les guerres napoléoniennes ?|ナポレオン戦争後にヨーロッパの地図を引き直した1815年の会議が開かれた都市は?",
    [
      "Paris|París|Paris|パリ",
      "Berlin|Berlín|Berlin|ベルリン",
      "Vienna|Viena|Vienne|ウィーン",
    ],
    2,
    "The Congress of Vienna ran on and off for about eight months and was famous for its lavish parties as much as its formal sessions, giving rise to the saying that \"the congress dances, but does not move forward.\"|El Congreso de Viena se prolongó, con interrupciones, unos ocho meses, tan famoso por sus fiestas fastuosas como por sus sesiones formales, lo que dio pie al dicho de que «el congreso baila, pero no avanza».|Le congrès de Vienne s'étira, par intermittence, sur environ huit mois, aussi célèbre pour ses fêtes fastueuses que pour ses séances officielles, d'où le mot selon lequel « le congrès danse, mais n'avance pas ».|ウィーン会議は断続的に8か月ほど続き、正式な会議と同じくらい豪奢な舞踏会でも知られた。そこから「会議は踊る、されど進まず」という言葉が生まれた。",
  ),
  q(
    6,
    "Which country's flag, a white cross on a red field, is often cited as the oldest continuously used national flag design still in use?|¿La bandera de qué país, una cruz blanca sobre fondo rojo, se cita a menudo como el diseño de bandera nacional más antiguo aún en uso?|Le drapeau de quel pays, une croix blanche sur fond rouge, est souvent cité comme le plus ancien dessin de drapeau national encore en usage ?|白十字を赤地に配した、いまも使われる国旗デザインとして最も古いとされることが多い国は?",
    [
      "Denmark|Dinamarca|Le Danemark|デンマーク",
      "Switzerland|Suiza|La Suisse|スイス",
      "Norway|Noruega|La Norvège|ノルウェー",
    ],
    0,
    "Legend traces the Danish flag, the Dannebrog, to a red banner said to have fallen from the sky during a 13th-century battle, though the earliest confirmed historical record of it is from the following century.|La leyenda remonta la bandera danesa, el Dannebrog, a un estandarte rojo que se dice cayó del cielo durante una batalla del siglo XIII, aunque el primer registro histórico confirmado data del siglo siguiente.|La légende fait remonter le drapeau danois, le Dannebrog, à une bannière rouge tombée du ciel, dit-on, lors d'une bataille du XIIIe siècle, bien que la première mention historique confirmée date du siècle suivant.|デンマークの国旗ダネブロは、13世紀のある戦いで空から降ってきたという伝説を持つ赤い旗にさかのぼるとされるが、確かな史料での最初の記録は次の世紀まで下る。",
  ),
  q(
    2,
    "In 2019, after a decades-long dispute with Greece, this Balkan country added a geographic qualifier to its name — becoming what?|En 2019, tras una disputa de décadas con Grecia, este país balcánico añadió un calificativo geográfico a su nombre: ¿en qué pasó a llamarse?|En 2019, après un différend vieux de décennies avec la Grèce, ce pays balkanique a ajouté un qualificatif géographique à son nom — devenant quoi ?|2019年、ギリシャとの数十年に及ぶ対立の末、地理的な限定語を国名に加えたこのバルカンの国は、何という国名になったか?",
    [
      "Western Macedonia|Macedonia Occidental|Macédoine occidentale|西マケドニア",
      "North Macedonia|Macedonia del Norte|Macédoine du Nord|北マケドニア",
      "Upper Macedonia|Alta Macedonia|Haute-Macédoine|上マケドニア",
    ],
    1,
    "Greece had objected for years that the name 'Macedonia' alone implied a claim on its own northern region of the same name, and the 2018 Prespa Agreement finally settled the dispute in exchange for the new name.|Grecia llevaba años objetando que el nombre «Macedonia» a secas insinuaba una reivindicación sobre su propia región septentrional del mismo nombre, y el Acuerdo de Prespa de 2018 zanjó por fin la disputa a cambio del nuevo nombre.|La Grèce objectait depuis des années que le nom « Macédoine » seul laissait entendre une revendication sur sa propre région du nord du même nom, et l'accord de Prespa de 2018 régla enfin le différend en échange de ce nouveau nom.|ギリシャは長年、「マケドニア」という国名だけでは自国北部の同名の地域への領有権主張を含意すると異議を唱えていた。2018年のプレスパ合意が、この新しい国名と引き換えについに争いに決着をつけた。",
  ),
  q(
    2,
    "Which country is famous for its windmills, canals and land partly reclaimed below sea level?|¿Qué país es famoso por sus molinos de viento, canales y tierras ganadas al mar por debajo del nivel del mar?|Quel pays est réputé pour ses moulins à vent, ses canaux et ses terres gagnées sous le niveau de la mer ?|風車と運河、そして海面下まで干拓した土地で知られる国は?",
    [
      "Belgium|Bélgica|La Belgique|ベルギー",
      "Denmark|Dinamarca|Le Danemark|デンマーク",
      "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ",
    ],
    2,
    "About a quarter of the country's land lies below sea level, kept dry by a system of dykes and pumps that windmills, and later steam and electric pumps, have maintained for centuries.|Cerca de una cuarta parte del territorio del país está bajo el nivel del mar, mantenido seco por un sistema de diques y bombas que los molinos, y después las bombas de vapor y eléctricas, han sostenido durante siglos.|Environ un quart du territoire du pays se trouve sous le niveau de la mer, maintenu au sec par un système de digues et de pompes qu'entretiennent depuis des siècles les moulins, puis les pompes à vapeur et électriques.|国土のおよそ4分の1は海面より低く、堤防とポンプの仕組みによって乾いた状態を保っている。かつては風車が、のちには蒸気式・電動式のポンプが、その役目を何世紀も担ってきた。",
  ),
  q(
    2,
    "Which country is generally regarded as the birthplace of the Renaissance?|¿Qué país se considera generalmente la cuna del Renacimiento?|Quel pays est généralement considéré comme le berceau de la Renaissance ?|ルネサンス発祥の地とされる国は?",
    [
      "Italy|Italia|L'Italie|イタリア",
      "Greece|Grecia|La Grèce|ギリシャ",
      "France|Francia|La France|フランス",
    ],
    0,
    "The movement is usually traced to 14th-century Florence, where wealthy merchant families funded artists and scholars who revived interest in classical Greek and Roman learning.|El movimiento suele remontarse a la Florencia del siglo XIV, donde ricas familias de mercaderes financiaron a artistas y estudiosos que revivieron el interés por el saber clásico griego y romano.|Le mouvement remonte généralement à la Florence du XIVe siècle, où de riches familles de marchands financèrent artistes et savants qui ranimèrent l'intérêt pour le savoir classique grec et romain.|この運動は通常、14世紀のフィレンツェにさかのぼる。裕福な商人の一族が、古代ギリシャ・ローマの学問への関心を復興させた芸術家や学者を援助した。",
  ),
  q(
    3,
    "The Schengen Area, covering most of the EU, mainly abolished what between its member countries?|El espacio Schengen, que abarca la mayor parte de la UE, ¿qué eliminó principalmente entre sus países miembros?|L'espace Schengen, qui couvre la majeure partie de l'UE, a principalement aboli quoi entre ses pays membres ?|EUの大半をカバーするシェンゲン圏が加盟国間で主に廃止したものは?",
    [
      "Customs duties on goods|Los aranceles sobre las mercancías|Les droits de douane sur les marchandises|物品にかかる関税",
      "Passport and border checks|Los controles de pasaportes y fronteras|Les contrôles de passeport et de frontière|パスポートと国境検査",
      "The requirement to use a shared currency|La obligación de usar una moneda común|L'obligation d'utiliser une monnaie commune|共通通貨を使う義務",
    ],
    1,
    "Named after a small town where the founding agreement was signed in 1985, on a boat on the river that marks the border between Luxembourg, France and Germany, the area now covers most of the EU plus a few non-EU countries.|Llamado así por un pequeño pueblo donde se firmó el acuerdo fundacional en 1985, en un barco sobre el río que marca la frontera entre Luxemburgo, Francia y Alemania, el espacio cubre hoy la mayor parte de la UE más algunos países no miembros.|Nommé d'après une petite ville où l'accord fondateur fut signé en 1985, sur un bateau amarré sur le fleuve marquant la frontière entre le Luxembourg, la France et l'Allemagne, l'espace couvre aujourd'hui la majeure partie de l'UE, plus quelques pays non membres.|1985年、ルクセンブルク・フランス・ドイツの国境をなす川に浮かべた船の上で創設協定が結ばれた小さな町にちなんで名付けられ、いまではEUの大半に加え、非EU国もいくつか含む。",
  ),
  q(
    3,
    "Which sea is entirely landlocked and shared by Russia, Kazakhstan, Iran and other countries?|¿Qué mar está completamente rodeado de tierra y es compartido por Rusia, Kazajistán, Irán y otros países?|Quelle mer est entièrement enclavée et partagée par la Russie, le Kazakhstan, l'Iran et d'autres pays ?|ロシア・カザフスタン・イランなどに囲まれた、完全に陸に囲まれた海は?",
    [
      "The Aral Sea|El mar de Aral|La mer d'Aral|アラル海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
    ],
    2,
    "It is the largest inland body of water on Earth, so large that whether to call it a sea or a lake has real legal consequences for who can drill for the oil and gas beneath it.|Es la mayor masa de agua interior del planeta, tan grande que llamarla mar o lago tiene consecuencias legales reales sobre quién puede perforar en busca del petróleo y el gas que hay bajo ella.|C'est la plus grande étendue d'eau intérieure de la planète, si vaste que la question de savoir s'il s'agit d'une mer ou d'un lac a de réelles conséquences juridiques sur qui peut y forer le pétrole et le gaz.|カスピ海は地球上最大の内陸水域で、あまりに大きいため、これを「海」と呼ぶか「湖」と呼ぶかが、その下に眠る石油・天然ガスを誰が採掘できるかという法的な問題に直結する。",
  ),
  q(
    4,
    "The Hanseatic League, which shaped trade around the Baltic and North Sea for centuries, was mainly a network of what?|La Liga Hanseática, que dio forma al comercio del Báltico y el mar del Norte durante siglos, ¿era sobre todo una red de qué?|La Ligue hanséatique, qui façonna le commerce autour de la Baltique et de la mer du Nord pendant des siècles, était surtout un réseau de quoi ?|何世紀にもわたりバルト海・北海の交易を形作ったハンザ同盟は、主に何のネットワークだったか?",
    [
      "Trading towns and merchant guilds|Ciudades comerciales y gremios de mercaderes|Villes marchandes et guildes de commerçants|交易都市と商人ギルド",
      "Monasteries and pilgrimage routes|Monasterios y rutas de peregrinación|Monastères et itinéraires de pèlerinage|修道院と巡礼路",
      "Royal courts and dynastic marriages|Cortes reales y matrimonios dinásticos|Cours royales et mariages dynastiques|王宮と王朝間の婚姻",
    ],
    0,
    "At its height the league linked well over a hundred towns from London to Novgorod, and member cities could threaten to cut off trade with a town that broke the group's rules, a powerful weapon in an age before national armies dominated commerce.|En su apogeo, la liga unía a bien más de un centenar de ciudades desde Londres hasta Nóvgorod, y las ciudades miembro podían amenazar con cortar el comercio con una ciudad que rompiera las reglas del grupo, un arma poderosa en una época sin ejércitos nacionales que dominaran el comercio.|À son apogée, la ligue reliait bien plus d'une centaine de villes de Londres à Novgorod, et les villes membres pouvaient menacer de couper le commerce avec une ville enfreignant les règles du groupe, une arme puissante à une époque où les armées nationales ne dominaient pas encore le commerce.|最盛期、ハンザ同盟はロンドンからノヴゴロドまで百を優に超える都市を結んでいた。加盟都市は、同盟の規則を破った都市との交易を断つと脅すことができ、国家の軍隊が商業を左右する前の時代には強力な武器だった。",
  ),
  q(
    4,
    "Basque, spoken in parts of Spain and France, is unusual because it is not related to what?|El euskera, hablado en partes de España y Francia, es inusual porque no está emparentado con ¿qué?|Le basque, parlé dans certaines régions d'Espagne et de France, est particulier car il n'est apparenté à quoi ?|スペインとフランスの一部で話されるバスク語が異例なのは、何と関係が無いからか?",
    [
      "The Latin alphabet|El alfabeto latino|L'alphabet latin|ラテン文字",
      "Any other known language family|Ninguna otra familia lingüística conocida|Aucune autre famille de langues connue|他のどの既知の語族とも",
      "Any language spoken outside Europe|Ninguna lengua hablada fuera de Europa|Aucune langue parlée hors d'Europe|ヨーロッパ外で話されるどの言語とも",
    ],
    1,
    "Basque is what linguists call a language isolate, predating the arrival of Indo-European languages in Western Europe, and despite generations of study nobody has convincingly linked it to any other language on Earth.|El euskera es lo que los lingüistas llaman una lengua aislada, anterior a la llegada de las lenguas indoeuropeas a Europa occidental, y pese a generaciones de estudio nadie lo ha vinculado de forma convincente a ninguna otra lengua del planeta.|Le basque est ce que les linguistes appellent une langue isolée, antérieure à l'arrivée des langues indo-européennes en Europe occidentale, et malgré des générations d'étude, personne ne l'a relié de façon convaincante à une autre langue sur Terre.|バスク語は言語学者が「孤立した言語」と呼ぶもので、インド・ヨーロッパ語族が西ヨーロッパに到来する以前から存在する。何世代にもわたる研究にもかかわらず、地球上の他のどの言語とも説得力のある形ではつながっていない。",
  ),
  q(
    4,
    "Which composer, deaf by the end of his life, wrote the \"Ode to Joy\" melody used as the anthem of the EU?|¿Qué compositor, sordo al final de su vida, escribió la melodía del «Himno a la alegría» usada como himno de la UE?|Quel compositeur, devenu sourd à la fin de sa vie, écrivit la mélodie de l'« Ode à la joie » utilisée comme hymne de l'UE?|晩年に聴力を失いながら、EUの歌として使われる「歓喜の歌」の旋律を書いた作曲家は?",
    [
      "Johann Sebastian Bach|Johann Sebastian Bach|Johann Sebastian Bach|ヨハン・セバスティアン・バッハ",
      "Franz Schubert|Franz Schubert|Franz Schubert|フランツ・シューベルト",
      "Ludwig van Beethoven|Ludwig van Beethoven|Ludwig van Beethoven|ルートヴィヒ・ヴァン・ベートーヴェン",
    ],
    2,
    "Beethoven set the melody, from his Ninth Symphony, to a poem by Friedrich Schiller celebrating universal brotherhood, and the EU adopted the tune alone, without any words, so that it would not favour any one of the bloc's many languages.|Beethoven puso la melodía, de su Novena Sinfonía, a un poema de Friedrich Schiller que celebra la hermandad universal, y la UE adoptó solo la melodía, sin letra, para no favorecer a ninguna de las muchas lenguas del bloque.|Beethoven mit cette mélodie, tirée de sa Neuvième Symphonie, sur un poème de Friedrich Schiller célébrant la fraternité universelle, et l'UE n'en a adopté que la musique, sans paroles, afin de ne favoriser aucune des nombreuses langues du bloc.|ベートーヴェンは交響曲第九番の中で、この旋律にフリードリヒ・シラーの詩「普遍的な同胞愛」を寄せた。EUはこの旋律だけを、歌詞無しで採用した。加盟国の多くの言語のどれか一つを特別扱いしないためである。",
  ),
  q(
    5,
    "The Reformation is usually dated to 1517, when a monk nailed his 95 theses to a church door in which town?|La Reforma suele fecharse en 1517, cuando un monje clavó sus 95 tesis en la puerta de una iglesia de ¿qué localidad?|La Réforme est généralement datée de 1517, quand un moine cloua ses 95 thèses sur la porte d'une église dans quelle ville ?|1517年、ある修道士が「95か条の論題」を教会の扉に打ちつけたとされる町は?",
    [
      "Wittenberg|Wittenberg|Wittenberg|ヴィッテンベルク",
      "Geneva|Ginebra|Genève|ジュネーヴ",
      "Worms|Worms|Worms|ヴォルムス",
    ],
    0,
    "Martin Luther's theses criticised the sale of indulgences by the Church, and the invention of the printing press decades earlier meant copies spread across Europe within weeks rather than years.|Las tesis de Martín Lutero criticaban la venta de indulgencias por la Iglesia, y la invención de la imprenta décadas antes hizo que las copias se difundieran por Europa en semanas y no en años.|Les thèses de Martin Luther critiquaient la vente d'indulgences par l'Église, et l'invention de l'imprimerie des décennies plus tôt fit que les copies se répandirent en Europe en quelques semaines plutôt qu'en années.|マルティン・ルターの論題は教会による免罪符の販売を批判するもので、数十年前に発明された印刷機のおかげで、その写しは何年もかけてではなく数週間でヨーロッパじゅうに広まった。",
  ),
  q(
    5,
    "Which epic poem, written in Old English, tells of a hero who fights the monster Grendel?|¿Qué poema épico, escrito en inglés antiguo, narra la historia de un héroe que lucha contra el monstruo Grendel?|Quel poème épique, écrit en vieil anglais, raconte l'histoire d'un héros qui combat le monstre Grendel ?|古英語で書かれ、怪物グレンデルと戦う英雄を描く叙事詩は?",
    [
      "The Song of Roland|La Canción de Roldán|La Chanson de Roland|『ローランの歌』",
      "Beowulf|Beowulf|Beowulf|『ベーオウルフ』",
      "El Cid|El Cid|Le Cid|『わがシッドの歌』",
    ],
    1,
    "The poem survives in a single medieval manuscript that nearly burned in a fire in 1731, and its story is actually set in Scandinavia rather than England, even though it was written in Old English.|El poema sobrevive en un único manuscrito medieval que casi se quema en un incendio de 1731, y su historia se ambienta en realidad en Escandinavia y no en Inglaterra, aunque se escribiera en inglés antiguo.|Le poème survit dans un unique manuscrit médiéval qui faillit brûler dans un incendie en 1731, et son histoire se déroule en réalité en Scandinavie plutôt qu'en Angleterre, bien qu'il ait été écrit en vieil anglais.|この詩は1731年の火事で焼失しかけた、たった一冊の中世写本によって伝わっている。古英語で書かれているにもかかわらず、物語の舞台は実はイングランドではなくスカンディナヴィアである。",
  ),
  q(
    6,
    "The Peace of Westphalia in 1648 brought an end to which major European war?|¿Qué gran guerra europea puso fin la Paz de Westfalia en 1648?|La paix de Westphalie, en 1648, mit fin à quelle grande guerre européenne ?|1648年のウェストファリア条約が終わらせた大戦争は?",
    [
      "The Hundred Years' War|La Guerra de los Cien Años|La guerre de Cent Ans|百年戦争",
      "The Seven Years' War|La Guerra de los Siete Años|La guerre de Sept Ans|七年戦争",
      "The Thirty Years' War|La Guerra de los Treinta Años|La guerre de Trente Ans|三十年戦争",
    ],
    2,
    "Fought largely across the German states and starting as a religious conflict, the war killed a large share of the population in some regions, and the peace that ended it is often cited as the origin of the modern idea of sovereign nation-states.|Librada en gran parte por los estados alemanes y comenzada como conflicto religioso, la guerra mató a una gran parte de la población en algunas regiones, y la paz que la terminó se cita a menudo como el origen de la idea moderna de estado-nación soberano.|Menée en grande partie à travers les États allemands et débutée comme un conflit religieux, la guerre tua une large part de la population dans certaines régions, et la paix qui y mit fin est souvent citée comme l'origine de l'idée moderne d'État-nation souverain.|主にドイツ諸邦を舞台に宗教対立として始まったこの戦争は、地域によっては人口の大きな割合を失わせた。この戦争を終わらせた講和は、しばしば近代的な主権国家という考え方の起源とされる。",
  ),
  q(
    6,
    "Which 1923 treaty formally ended the Ottoman Empire and set the borders of the new Republic of Turkey?|¿Qué tratado de 1923 puso fin formalmente al Imperio otomano y fijó las fronteras de la nueva República de Turquía?|Quel traité de 1923 mit formellement fin à l'Empire ottoman et fixa les frontières de la nouvelle République de Turquie ?|1923年、オスマン帝国を正式に終わらせ、新しいトルコ共和国の国境を定めた条約は?",
    [
      "The Treaty of Sèvres|El Tratado de Sèvres|Le traité de Sèvres|セーヴル条約",
      "The Treaty of Lausanne|El Tratado de Lausana|Le traité de Lausanne|ローザンヌ条約",
      "The Treaty of Versailles|El Tratado de Versalles|Le traité de Versailles|ヴェルサイユ条約",
    ],
    1,
    "The earlier Treaty of Sèvres of 1920 had carved up Ottoman territory so harshly that it helped trigger the Turkish War of Independence, and Lausanne replaced it with terms the new Turkish republic actually accepted.|El anterior Tratado de Sèvres, de 1920, había repartido el territorio otomano con tal dureza que ayudó a desencadenar la Guerra de Independencia turca, y Lausana lo sustituyó con condiciones que la nueva república turca sí aceptó.|Le traité de Sèvres, plus ancien, de 1920, avait démembré le territoire ottoman avec une telle dureté qu'il contribua à déclencher la guerre d'indépendance turque, et celui de Lausanne le remplaça par des conditions que la nouvelle république turque accepta réellement.|1920年の先立つセーヴル条約はオスマン領をあまりに過酷に分割したため、トルコ独立戦争を引き起こす一因となった。ローザンヌ条約はこれに代わり、新生トルコ共和国が実際に受け入れられる条件を定めた。",
  ),
  q(
    2,
    "In which year did the Chernobyl nuclear disaster send radioactive fallout across much of Europe?|¿En qué año el desastre nuclear de Chernóbil esparció lluvia radiactiva por buena parte de Europa?|En quelle année la catastrophe nucléaire de Tchernobyl a-t-elle répandu des retombées radioactives sur une grande partie de l'Europe ?|チョルノービリ原発事故が放射性降下物をヨーロッパの広い範囲にまき散らしたのは何年か?",
    [
      "1991|1991|1991|1991年",
      "1986|1986|1986|1986年",
      "1979|1979|1979|1979年",
    ],
    1,
    "A reactor test that went wrong released a cloud that Swedish monitoring stations detected within days, well before Soviet authorities publicly admitted anything had happened at all.|Una prueba de reactor que salió mal liberó una nube que las estaciones de vigilancia suecas detectaron en cuestión de días, mucho antes de que las autoridades soviéticas admitieran públicamente que había ocurrido algo.|Un essai de réacteur qui tourna mal libéra un nuage que des stations de surveillance suédoises détectèrent en quelques jours, bien avant que les autorités soviétiques n'admettent publiquement qu'il s'était passé quoi que ce soit.|失敗した原子炉の試験が放出した雲は、ソ連当局が何か起きたことを公に認めるよりずっと前に、スウェーデンの観測所が数日のうちに検知していた。",
  ),
  q(
    3,
    "Which mountain, the highest peak in the Alps, sits on the French-Italian border?|¿Qué montaña, la cima más alta de los Alpes, se encuentra en la frontera franco-italiana?|Quelle montagne, sommet le plus haut des Alpes, se trouve à la frontière franco-italienne ?|フランスとイタリアの国境にある、アルプス最高峰は?",
    [
      "The Matterhorn|El Cervino|Le Cervin|マッターホルン",
      "The Eiger|El Eiger|L'Eiger|アイガー",
      "Mont Blanc|El Mont Blanc|Le mont Blanc|モンブラン",
    ],
    2,
    "At 4,809 metres, its summit is technically claimed by both France and Italy, and the exact border across it has never been fully settled to everyone's satisfaction.|Con 4.809 metros, su cima la reclaman técnicamente tanto Francia como Italia, y la frontera exacta a través de ella nunca se ha resuelto del todo a satisfacción de todos.|Culminant à 4 809 mètres, son sommet est techniquement revendiqué à la fois par la France et l'Italie, et la frontière exacte qui le traverse n'a jamais été pleinement réglée à la satisfaction de tous.|標高4809m、山頂の帰属をめぐってはフランスとイタリアの双方が形式上権利を主張しており、正確な国境線はいまも双方が完全に納得する形では定まっていない。",
  ),
  q(
    2,
    "Which country, home to thousands of lakes, calls itself \"the land of a thousand lakes\"?|¿Qué país, con miles de lagos, se llama a sí mismo «la tierra de los mil lagos»?|Quel pays, riche de milliers de lacs, se surnomme « le pays aux mille lacs » ?|数千の湖を抱え、自ら「千の湖の国」と名乗る国は?",
    [
      "Finland|Finlandia|La Finlande|フィンランド",
      "Sweden|Suecia|La Suède|スウェーデン",
      "Norway|Noruega|La Norvège|ノルウェー",
    ],
    0,
    "The real count is far higher than the nickname suggests, closer to 180,000 lakes once every pond above a certain size is included, a legacy of glaciers that scraped out hollows across the whole country during the last ice age.|El recuento real es mucho mayor de lo que sugiere el apodo, cerca de 180.000 lagos si se cuentan todos los estanques por encima de cierto tamaño, herencia de los glaciares que excavaron huecos por todo el país en la última glaciación.|Le décompte réel est bien plus élevé que ne le suggère le surnom, proche de 180 000 lacs une fois inclus tous les étangs au-delà d'une certaine taille, héritage des glaciers qui ont creusé des creux à travers tout le pays lors de la dernière glaciation.|実際の数は愛称が示すよりずっと多く、一定の大きさ以上の池まで含めるとおよそ18万にのぼる。最後の氷期に氷河が国じゅうを削ってできたくぼ地の名残である。",
  ),
  q(
    3,
    "The Trans-Siberian Railway, the longest railway line in the world, begins in which European city?|El Transiberiano, la línea ferroviaria más larga del mundo, ¿en qué ciudad europea empieza?|Le Transsibérien, la plus longue ligne ferroviaire du monde, débute dans quelle ville européenne ?|世界最長の鉄道路線、シベリア鉄道の起点となるヨーロッパの都市は?",
    [
      "Saint Petersburg|San Petersburgo|Saint-Pétersbourg|サンクトペテルブルク",
      "Moscow|Moscú|Moscou|モスクワ",
      "Yekaterinburg|Ekaterimburgo|Iekaterinbourg|エカテリンブルク",
    ],
    1,
    "The line runs roughly 9,289 kilometres to Vladivostok on the Pacific coast, crossing seven time zones and taking about a week to travel end to end without stopping.|La línea recorre unos 9.289 kilómetros hasta Vladivostok, en la costa del Pacífico, cruzando siete husos horarios y tardando cerca de una semana en hacerse de punta a punta sin parar.|La ligne parcourt environ 9 289 kilomètres jusqu'à Vladivostok, sur la côte pacifique, traversant sept fuseaux horaires et prenant environ une semaine pour être parcourue d'un bout à l'autre sans arrêt.|この路線は太平洋岸のウラジオストクまでおよそ9289kmを走り、7つの時間帯を横切る。止まらずに端から端まで乗ると、およそ一週間かかる。",
  ),
  q(
    4,
    "Which strait, flanked by ancient fortifications, links the Sea of Marmara to the Black Sea and separates European from Asian Turkey?|¿Qué estrecho, flanqueado por fortificaciones antiguas, une el mar de Mármara con el mar Negro y separa la Turquía europea de la asiática?|Quel détroit, bordé de fortifications anciennes, relie la mer de Marmara à la mer Noire et sépare la Turquie européenne de la Turquie asiatique ?|古い要塞に挟まれ、マルマラ海と黒海を結び、トルコのヨーロッパ側とアジア側を隔てる海峡は?",
    [
      "The Dardanelles|Los Dardanelos|Les Dardanelles|ダーダネルス海峡",
      "The Strait of Otranto|El Estrecho de Otranto|Le détroit d'Otrante|オトラント海峡",
      "The Bosphorus|El Bósforo|Le Bosphore|ボスポラス海峡",
    ],
    2,
    "Two suspension bridges and an undersea rail tunnel now cross it, and a ship must queue for a slot to pass through what is one of the busiest and narrowest shipping channels on Earth.|Dos puentes colgantes y un túnel ferroviario submarino lo cruzan hoy, y un barco debe esperar turno para atravesar uno de los canales navegables más transitados y estrechos del planeta.|Deux ponts suspendus et un tunnel ferroviaire sous-marin le traversent aujourd'hui, et un navire doit attendre son tour pour franchir l'un des chenaux de navigation les plus fréquentés et les plus étroits de la planète.|いまでは2本の吊り橋と海底鉄道トンネルがこの海峡を渡っている。船は、地球上でも屈指の混雑と狭さを誇るこの水路を通るため、順番待ちをしなければならない。",
  ),
  q(
    4,
    "In which year did the euro first become usable for electronic payments and bank accounts, three years before coins and notes appeared?|¿En qué año empezó a usarse el euro para pagos electrónicos y cuentas bancarias, tres años antes de que aparecieran monedas y billetes?|En quelle année l'euro devint-il utilisable pour les paiements électroniques et les comptes bancaires, trois ans avant l'apparition des pièces et des billets ?|ユーロが硬貨と紙幣の登場より3年早く、電子決済と銀行口座で使えるようになった年は?",
    [
      "1999|1999|1999|1999年",
      "1993|1993|1993|1993年",
      "2002|2002|2002|2002年",
    ],
    0,
    "For those three years, national currencies like the franc and the mark still circulated as cash, but their exchange rates to the euro were already fixed and unchangeable.|Durante esos tres años, monedas nacionales como el franco y el marco seguían circulando en efectivo, pero su tipo de cambio con el euro ya estaba fijado y era inamovible.|Durant ces trois années, des monnaies nationales comme le franc et le mark circulaient encore en espèces, mais leur taux de change avec l'euro était déjà fixé et immuable.|この3年間、フランやマルクといった各国通貨は現金としてなお流通していたが、ユーロとの交換レートはすでに固定され、動かせないものになっていた。",
  ),
  q(
    5,
    "Finland's national epic, compiled from oral folk poetry in the 19th century, is called what?|El poema épico nacional de Finlandia, recopilado a partir de poesía popular oral en el siglo XIX, ¿cómo se llama?|L'épopée nationale finlandaise, compilée à partir de poésie populaire orale au XIXe siècle, s'appelle comment ?|19世紀に口承の民間詩を集めて編まれた、フィンランドの国民的叙事詩の名は?",
    [
      "The Poetic Edda|La Edda poética|L'Edda poétique|『古エッダ』",
      "The Kalevala|El Kalevala|Le Kalevala|『カレワラ』",
      "The Nibelungenlied|El Cantar de los Nibelungos|La Chanson des Nibelungen|『ニーベルンゲンの歌』",
    ],
    1,
    "A country doctor named Elias Lönnrot travelled the countryside recording folk singers and stitched their songs into a single continuous epic, first published in 1835, which later helped fuel a sense of Finnish national identity under Russian and Swedish rule.|Un médico rural llamado Elias Lönnrot recorrió el campo grabando a cantores populares y cosió sus canciones en una única epopeya continua, publicada por primera vez en 1835, que más tarde ayudó a alimentar un sentido de identidad nacional finesa bajo dominio ruso y sueco.|Un médecin de campagne nommé Elias Lönnrot parcourut les campagnes en enregistrant des chanteurs populaires et assembla leurs chants en une seule épopée continue, publiée pour la première fois en 1835, qui contribua plus tard à nourrir un sentiment d'identité nationale finlandaise sous domination russe et suédoise.|エリアス・リョンロートという田舎医者が各地を回って民謡の歌い手を記録し、その歌をつなぎ合わせて一つの叙事詩に仕立てた。1835年に初めて出版されたこの作品は、のちにロシアとスウェーデンの支配下でフィンランド人としての意識を育む一助となった。",
  ),
  q(
    3,
    "The term \"Iron Curtain\" was popularised by which British wartime leader in a 1946 speech?|¿Qué líder británico de la guerra popularizó el término «Telón de Acero» en un discurso de 1946?|Le terme « rideau de fer » fut popularisé par quel dirigeant britannique de guerre lors d'un discours de 1946 ?|1946年の演説で「鉄のカーテン」という語を広めたイギリスの戦時指導者は?",
    [
      "Clement Attlee|Clement Attlee|Clement Attlee|クレメント・アトリー",
      "Neville Chamberlain|Neville Chamberlain|Neville Chamberlain|ネヴィル・チェンバレン",
      "Winston Churchill|Winston Churchill|Winston Churchill|ウィンストン・チャーチル",
    ],
    2,
    "Churchill was no longer prime minister when he gave the speech in Missouri, in the United States, warning that an 'iron curtain' had descended across the continent, dividing Europe for the rest of the Cold War.|Churchill ya no era primer ministro cuando dio el discurso en Misuri, en Estados Unidos, advirtiendo que un «telón de acero» había caído sobre el continente, dividiendo Europa durante el resto de la Guerra Fría.|Churchill n'était plus Premier ministre quand il prononça ce discours dans le Missouri, aux États-Unis, avertissant qu'un « rideau de fer » était descendu sur le continent, divisant l'Europe pour le reste de la guerre froide.|この演説をアメリカのミズーリ州で行ったとき、チャーチルはすでに首相の座を退いていた。彼は「鉄のカーテン」が大陸に降りたと警告し、それは冷戦の残りの期間、ヨーロッパを分け続けた。",
  ),
  q(
    3,
    "Which European capital city sits partly in Europe and partly in Asia, divided by a strait?|¿Qué capital europea se encuentra en parte en Europa y en parte en Asia, dividida por un estrecho?|Quelle capitale européenne se trouve en partie en Europe et en partie en Asie, divisée par un détroit ?|海峡によって隔てられ、一部がヨーロッパに、一部がアジアにあるヨーロッパの首都は?",
    [
      "Istanbul|Estambul|Istanbul|イスタンブール",
      "Athens|Atenas|Athènes|アテネ",
      "Moscow|Moscú|Moscou|モスクワ",
    ],
    0,
    "Istanbul is not actually Turkey's capital — that is Ankara — but it is the country's largest city, and commuters cross the Bosphorus between its European and Asian sides by ferry, bridge and metro every day.|En realidad, Estambul no es la capital de Turquía —esa es Ankara—, pero sí su ciudad más grande, y cada día miles de personas cruzan el Bósforo entre su lado europeo y su lado asiático en ferri, puente y metro.|Istanbul n'est en fait pas la capitale de la Turquie — c'est Ankara — mais c'est la plus grande ville du pays, et chaque jour des habitants traversent le Bosphore entre ses rives européenne et asiatique en ferry, en empruntant un pont ou le métro.|イスタンブールは実はトルコの首都ではない(首都はアンカラ)が、同国最大の都市であり、通勤客は毎日フェリーや橋、地下鉄でボスポラス海峡を渡ってヨーロッパ側とアジア側を行き来する。",
  ),
  q(
    2,
    "The Balkan spirit rakija is traditionally distilled mainly from which fruit?|El aguardiente balcánico rakija se destila tradicionalmente sobre todo a partir de qué fruta?|L'eau-de-vie balkanique rakija est traditionnellement distillée principalement à partir de quel fruit ?|バルカン半島の蒸留酒ラキヤは、伝統的に主にどの果物から作られるか?",
    [
      "Grapes|Uvas|Raisins|ぶどう",
      "Plums|Ciruelas|Prunes|プラム",
      "Apples|Manzanas|Pommes|りんご",
    ],
    1,
    "Plum brandy, often called šljivovica in the region, is homemade in enough households that many families consider a good batch a point of quiet pride, and it is traditionally offered to guests before a meal rather than after.|El aguardiente de ciruela, a menudo llamado šljivovica en la región, se elabora en tantos hogares que muchas familias consideran un buen lote motivo de orgullo discreto, y tradicionalmente se ofrece a los invitados antes de la comida, no después.|L'eau-de-vie de prune, souvent appelée šljivovica dans la région, est faite maison dans suffisamment de foyers pour que beaucoup de familles considèrent une bonne cuvée comme une fierté discrète, et elle est traditionnellement offerte aux invités avant le repas, plutôt qu'après.|地域ではシュリヴォヴィツァとも呼ばれるプラム酒は、多くの家庭で自家醸造され、出来の良い一樽は静かな誇りとされることも多い。伝統的には食事の後ではなく前に、客にふるまわれる。",
  ),
  q(
    3,
    "Which landlocked, mountainous country is the source of the Rhine, the Rhône and the Inn rivers?|¿Qué país sin salida al mar y montañoso es la fuente de los ríos Rin, Ródano e Inn?|Quel pays montagneux et enclavé est la source du Rhin, du Rhône et de l'Inn ?|ライン川・ローヌ川・イン川の水源となる、内陸の山国は?",
    [
      "Austria|Austria|L'Autriche|オーストリア",
      "France|Francia|La France|フランス",
      "Switzerland|Suiza|La Suisse|スイス",
    ],
    2,
    "All three rivers rise from Alpine glaciers and snowfields within Swiss territory before flowing off in completely different directions, toward the North Sea, the Mediterranean and, via the Danube, the Black Sea.|Los tres ríos nacen de glaciares y neveros alpinos en territorio suizo antes de fluir en direcciones completamente distintas, hacia el mar del Norte, el Mediterráneo y, a través del Danubio, el mar Negro.|Les trois fleuves naissent de glaciers et de champs de neige alpins en territoire suisse avant de s'écouler dans des directions totalement différentes, vers la mer du Nord, la Méditerranée et, via le Danube, la mer Noire.|この3つの川はいずれもスイス領内のアルプスの氷河や雪原から発し、そこからまったく別々の方角――北海、地中海、そしてドナウ川を経て黒海――へと流れていく。",
  ),
  q(
    4,
    "Besides Spanish, which language is co-official in the Catalonia region of Spain?|Además del español, ¿qué lengua es cooficial en la región de Cataluña, en España?|Outre l'espagnol, quelle langue est coofficielle dans la région de Catalogne, en Espagne ?|スペインのカタルーニャ州で、スペイン語のほかに公用語となっている言語は?",
    [
      "Catalan|Catalán|Le catalan|カタルーニャ語",
      "Occitan|Occitano|L'occitan|オック語",
      "Provençal|Provenzal|Le provençal|プロヴァンス語",
    ],
    0,
    "Catalan is spoken by millions and is also official in Andorra, making it the only language in the world that is the sole official language of an entire country while also being a regional co-official language elsewhere.|El catalán lo hablan millones de personas y también es oficial en Andorra, lo que lo convierte en la única lengua del mundo que es la única oficial de un país entero y a la vez cooficial regional en otro lugar.|Le catalan est parlé par des millions de personnes et est également officiel en Andorre, ce qui en fait la seule langue au monde à la fois unique langue officielle d'un pays entier et langue coofficielle régionale ailleurs.|カタルーニャ語は数百万人に話され、アンドラでも公用語である。一国まるごとの唯一の公用語であると同時に、他の土地では地域の共同公用語でもある、世界でも珍しい言語である。",
  ),
  q(
    3,
    "Which sport, played with a small ball and clubs across a course, originated in Scotland?|¿Qué deporte, jugado con una pelota pequeña y palos a lo largo de un recorrido, se originó en Escocia?|Quel sport, joué avec une petite balle et des clubs sur un parcours, est originaire d'Écosse ?|小さなボールとクラブを使い、コースを回る競技で、スコットランド発祥のものは?",
    [
      "Cricket|Críquet|Le cricket|クリケット",
      "Golf|Golf|Le golf|ゴルフ",
      "Field hockey|Hockey sobre hierba|Le hockey sur gazon|フィールドホッケー",
    ],
    1,
    "The game is documented in Scotland from at least the 15th century, well enough established by then that a Scottish king twice tried to ban it because it was distracting men from archery practice.|El juego está documentado en Escocia desde al menos el siglo XV, ya lo bastante arraigado como para que un rey escocés intentara prohibirlo dos veces, porque distraía a los hombres de la práctica del tiro con arco.|Le jeu est attesté en Écosse dès le XVe siècle au moins, déjà assez établi pour qu'un roi écossais tente à deux reprises de l'interdire, car il détournait les hommes de l'entraînement au tir à l'arc.|この競技は少なくとも15世紀のスコットランドですでに記録されており、当時すでに広く根づいていたため、スコットランド王が二度にわたって禁止を試みたほどだった。男たちが弓の訓練をおろそかにするという理由である。",
  ),
  q(
    2,
    "Which country, surrounded by EU members, is famous for chocolate, watches and is not itself an EU member?|¿Qué país, rodeado de miembros de la UE, es famoso por su chocolate, sus relojes y no pertenece él mismo a la UE?|Quel pays, entouré de membres de l'UE, réputé pour son chocolat et ses montres, n'est lui-même pas membre de l'UE ?|EU加盟国に囲まれながら、チョコレートと時計で知られ、自身はEUに加盟していない国は?",
    [
      "Austria|Austria|L'Autriche|オーストリア",
      "Liechtenstein|Liechtenstein|Le Liechtenstein|リヒテンシュタイン",
      "Switzerland|Suiza|La Suisse|スイス",
    ],
    2,
    "Swiss voters have rejected EU membership in referendums, and the country instead links itself to the bloc through a dense web of separate bilateral treaties, an arrangement sometimes called \"integration without membership.\"|Los votantes suizos han rechazado la adhesión a la UE en referéndums, y el país se vincula al bloque en cambio mediante una densa red de tratados bilaterales independientes, un arreglo a veces llamado «integración sin adhesión».|Les électeurs suisses ont rejeté l'adhésion à l'UE lors de référendums, et le pays se lie plutôt au bloc via un dense réseau de traités bilatéraux distincts, un arrangement parfois appelé « intégration sans adhésion ».|スイスの有権者は国民投票でEU加盟を退けており、代わりに数多くの個別の二国間条約を密に結ぶことでEUとつながっている。「加盟無き統合」と呼ばれることもある形である。",
  ),
  q(
    4,
    "The Great Depression, which caused mass unemployment across Europe in the 1930s, originated in which country?|La Gran Depresión, que provocó desempleo masivo en Europa en los años treinta, ¿en qué país se originó?|La Grande Dépression, qui provoqua un chômage de masse en Europe dans les années 1930, trouva son origine dans quel pays ?|1930年代にヨーロッパじゅうで大量失業を招いた世界恐慌が始まった国は?",
    [
      "The United States|Los Estados Unidos|Les États-Unis|アメリカ合衆国",
      "The United Kingdom|El Reino Unido|Le Royaume-Uni|イギリス",
      "Germany|Alemania|L'Allemagne|ドイツ",
    ],
    0,
    "The Wall Street stock market crash of October 1929 triggered a collapse in international lending that hit Germany's fragile, loan-dependent economy especially hard, feeding the political instability of the following decade.|El desplome bursátil de Wall Street de octubre de 1929 desencadenó un colapso del crédito internacional que golpeó con especial dureza a la frágil economía alemana, dependiente de préstamos, alimentando la inestabilidad política de la década siguiente.|Le krach boursier de Wall Street d'octobre 1929 déclencha un effondrement du crédit international qui frappa particulièrement durement l'économie allemande, fragile et dépendante des prêts, alimentant l'instabilité politique de la décennie suivante.|1929年10月のウォール街株価暴落は国際的な融資の崩壊を引き起こし、借入に依存していた脆弱なドイツ経済をとりわけ強く直撃した。これが翌十年間の政治的不安定さを助長した。",
  ),
  q(
    3,
    "Which country operated the world's first public steam railway, the Stockton and Darlington, in 1825?|¿Qué país puso en marcha el primer ferrocarril público de vapor del mundo, el Stockton and Darlington, en 1825?|Quel pays exploita le premier chemin de fer public à vapeur du monde, le Stockton and Darlington, en 1825 ?|1825年、世界初の公共蒸気鉄道、ストックトン・アンド・ダーリントン鉄道を走らせた国は?",
    [
      "France|Francia|La France|フランス",
      "The United Kingdom|El Reino Unido|Le Royaume-Uni|イギリス",
      "Belgium|Bélgica|La Belgique|ベルギー",
    ],
    1,
    "The line was built mainly to haul coal, and its designer, George Stephenson, went on to build the even more influential Liverpool and Manchester Railway a few years later, often considered the first true modern railway.|La línea se construyó sobre todo para transportar carbón, y su diseñador, George Stephenson, construyó pocos años después el aún más influyente ferrocarril de Liverpool y Mánchester, considerado a menudo el primer ferrocarril moderno propiamente dicho.|La ligne fut construite principalement pour transporter du charbon, et son concepteur, George Stephenson, construisit quelques années plus tard le chemin de fer de Liverpool à Manchester, encore plus influent, souvent considéré comme le premier vrai chemin de fer moderne.|この路線は主に石炭輸送のために建設された。設計者のジョージ・スティーヴンソンは、数年後にさらに影響力の大きいリヴァプール・アンド・マンチェスター鉄道を建設し、これはしばしば最初の本当の意味での近代鉄道とされる。",
  ),
  q(
    4,
    "Which mountain range forms a long arc through Romania, Slovakia, Poland and Ukraine?|¿Qué cordillera forma un largo arco a través de Rumanía, Eslovaquia, Polonia y Ucrania?|Quelle chaîne de montagnes forme un long arc à travers la Roumanie, la Slovaquie, la Pologne et l'Ukraine ?|ルーマニア・スロバキア・ポーランド・ウクライナを長く弧を描いて貫く山脈は?",
    [
      "The Dinaric Alps|Los Alpes Dináricos|Les Alpes dinariques|ディナル・アルプス",
      "The Balkan Mountains|Los montes Balcanes|Les monts Balkans|バルカン山脈",
      "The Carpathian Mountains|Los Cárpatos|Les Carpates|カルパティア山脈",
    ],
    2,
    "The range curves for about 1,500 kilometres and is home to some of Europe's largest remaining populations of brown bears, wolves and lynx, thanks to forests that were never as thoroughly cleared as those farther west.|La cordillera se curva a lo largo de unos 1.500 kilómetros y alberga algunas de las mayores poblaciones de osos pardos, lobos y linces que quedan en Europa, gracias a bosques que nunca se talaron tan a fondo como los del oeste.|La chaîne s'incurve sur environ 1 500 kilomètres et abrite certaines des plus grandes populations restantes d'ours bruns, de loups et de lynx d'Europe, grâce à des forêts jamais défrichées aussi intégralement que celles plus à l'ouest.|この山脈はおよそ1500kmにわたって弧を描き、ヨーロッパでも指折り多くのヒグマ・オオカミ・オオヤマネコが残る土地でもある。西側の森ほど徹底的には切り開かれなかったためである。",
  ),
  q(
    3,
    "The distinctive off-centre cross found on the flags of Denmark, Sweden, Norway, Finland and Iceland is known as what?|¿Cómo se conoce la característica cruz descentrada de las banderas de Dinamarca, Suecia, Noruega, Finlandia e Islandia?|Comment appelle-t-on la croix décentrée caractéristique des drapeaux du Danemark, de la Suède, de la Norvège, de la Finlande et de l'Islande ?|デンマーク・スウェーデン・ノルウェー・フィンランド・アイスランドの国旗に見られる、中心からずれた十字の名は?",
    [
      "The Nordic cross|La cruz nórdica|La croix scandinave|北欧十字",
      "Saint George's cross|La cruz de San Jorge|La croix de Saint-Georges|聖ジョージ十字",
      "The Maltese cross|La cruz de Malta|La croix de Malte|マルタ十字",
    ],
    0,
    "The design is thought to derive from the Danish flag, said to be the oldest still in use, and every other Nordic country later adapted the same cross-and-field pattern in its own colours as a mark of shared regional identity.|Se cree que el diseño deriva de la bandera danesa, considerada la más antigua aún en uso, y cada uno de los demás países nórdicos adaptó después el mismo patrón de cruz sobre campo con sus propios colores, como marca de una identidad regional compartida.|Le motif serait dérivé du drapeau danois, réputé le plus ancien encore en usage, et chaque autre pays nordique adapta ensuite le même schéma croix-et-champ dans ses propres couleurs, comme marque d'une identité régionale partagée.|このデザインは、いまも使われる国旗の中で最古とされるデンマーク国旗に由来するとされ、他の北欧諸国はのちに、地域としての共通の一体感の印として、同じ十字と地の配色を自国の色で取り入れた。",
  ),
  q(
    5,
    "The Rosetta Stone, key to decoding Egyptian hieroglyphs, is written in Egyptian and which other ancient language also used in parts of Europe?|La piedra de Rosetta, clave para descifrar los jeroglíficos egipcios, está escrita en egipcio y en qué otra lengua antigua, también usada en partes de Europa?|La pierre de Rosette, clé du déchiffrement des hiéroglyphes égyptiens, est écrite en égyptien et dans quelle autre langue ancienne, également utilisée en Europe ?|エジプトのヒエログリフ解読の鍵となったロゼッタストーンは、エジプト語と、ヨーロッパの一部でも使われたもう一つの古代語で書かれている。それは何語か?",
    [
      "Latin|Latín|Le latin|ラテン語",
      "Ancient Greek|Griego antiguo|Le grec ancien|古代ギリシャ語",
      "Phoenician|Fenicio|Le phénicien|フェニキア語",
    ],
    1,
    "The stone carries the same decree in three scripts, and it was Greek, still readable by scholars, that gave the first foothold for cracking the hieroglyphic and demotic Egyptian texts above it.|La piedra lleva el mismo decreto en tres escrituras, y fue el griego, aún legible para los eruditos, el que dio el primer punto de apoyo para descifrar los textos jeroglíficos y demóticos egipcios que hay encima.|La pierre porte le même décret en trois écritures, et c'est le grec, encore lisible par les savants, qui offrit le premier point d'appui pour percer les textes hiéroglyphique et démotique égyptiens qui le surmontent.|この石には同じ布告が三種の文字で刻まれており、当時の学者にもまだ読めたギリシャ語が、その上にあるヒエログリフとデモティックのエジプト文を解読する最初の手がかりになった。",
  ),
];
