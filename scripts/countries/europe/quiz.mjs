/**
 * ヨーロッパのクイズ(111問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その大陸の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 最初は50問で、難易度7以上が0問だった(「くわしい」を選ぶ人ほど同じ問いが
 * 繰り返し出る状態)。あとから61問を難易度の厚い層(7以上が33問、うち9〜10が
 * 12問)を中心に足して111問にした。足した分も、既存の50問と同じ書式・同じ
 * 都市カード非重複の方針で書いてある。
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(51件)が扱う具体的な事実(イルンの1668mm軌間・ウィーンの
 * ドナウ川の名前・ブレストの台車履き替えなど)はここでは問わない。
 * 代わりに、大陸ぜんぶの地理・歴史・言語・文化・科学など、
 * **都市カードが触れていない主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs europe
 * ```
 * まだ焼いていないので走らせていない。`check-quiz.mjs` と同じ判定式(答えの
 * 漏れ・言語の混入)を自前で再現して111問すべてに掛け、0件になるまで直した。
 * 焼いたあとの本物の確認をお願いしたい。
 *
 * 唯一の既知の例外: アイスランドのクローナ(króna)をスウェーデンのクローナ
 * (krona)・デンマークのクローネ(krone)と綴りで見分けさせる問い(元は
 * Q73)は、選択肢に原語綴りをそのまま残してある。語の綴りそのものが問いの
 * 中身なので、`ACCEPTED` に足す価値があると思う。
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
q(
    10,
    "In what year was the Compagnie Internationale des Wagons-Lits, the company behind the original Orient Express, founded?|¿En qué año se fundó la Compagnie Internationale des Wagons-Lits, la empresa detrás del Orient Express original?|En quelle année la Compagnie Internationale des Wagons-Lits, la société à l'origine de l'Orient-Express original, a-t-elle été fondée ?|オリエント急行を運営した会社、国際寝台車会社(ワゴン・リ社)が設立されたのは何年?",
    [
      "1872|1872|1872|1872年",
      "1883|1883|1883|1883年",
      "1889|1889|1889|1889年",
    ],
    0,
    "Belgian engineer Georges Nagelmackers founded the company after touring the United States and admiring George Pullman's sleeping cars; it took more than a decade of building up smaller routes before the company launched the flagship Orient Express service in 1883.|El ingeniero belga Georges Nagelmackers fundó la empresa tras recorrer Estados Unidos y admirar los coches cama de George Pullman; pasó más de una década construyendo rutas menores antes de que la empresa lanzara el servicio insignia, el Orient Express, en 1883.|L'ingénieur belge Georges Nagelmackers fonda la société après avoir parcouru les États-Unis et admiré les voitures-lits de George Pullman ; il fallut plus d'une décennie de constitution de lignes plus modestes avant que la compagnie ne lance son service phare, l'Orient-Express, en 1883.|ベルギー人技師ジョルジュ・ナゲルマケルスは、アメリカを旅してジョージ・プルマンの寝台車に感銘を受けたのちにこの会社を設立した。旗艦路線であるオリエント急行の運行開始は、それから10年以上のち、1883年のことである。",
  ),
  q(
    10,
    "By how many millimetres is Russian broad gauge (1,520mm) wider than the standard gauge (1,435mm) used across most of Western Europe?|¿En cuántos milímetros es más ancha la vía ancha rusa (1.520mm) que la vía estándar (1.435mm) usada en la mayor parte de Europa occidental?|De combien de millimètres l'écartement large russe (1 520mm) est-il plus large que l'écartement standard (1 435mm) utilisé dans la majeure partie de l'Europe occidentale ?|ロシアの広軌(1520mm)は、西ヨーロッパの大半で使われる標準軌(1435mm)より何ミリ広い?",
    [
      "65mm|65mm|65mm|65mm",
      "85mm|85mm|85mm|85mm",
      "105mm|105mm|105mm|105mm",
    ],
    1,
    "The gap is small enough to look trivial on paper, but it is exactly why every wheelset on a train has to be swapped, or the whole train lifted onto different bogies, at the handful of border stations where the two systems meet.|La diferencia parece insignificante sobre el papel, pero es justo la razón por la que hay que cambiar cada juego de ruedas, o levantar todo el tren sobre otros bogies, en el puñado de estaciones fronterizas donde se encuentran ambos sistemas.|L'écart paraît anodin sur le papier, mais c'est précisément pour cela qu'il faut changer chaque essieu, ou soulever tout le train sur d'autres bogies, dans la poignée de gares frontalières où les deux systèmes se rencontrent.|数字だけ見るとわずかな差だが、この違いがあるせいで、両方の軌間が接する数少ない国境駅では、車輪一式の交換か、列車ごと別の台車に載せ替える作業が必要になる。",
  ),
  q(
    10,
    "Which Alpine tunnel was the longest railway tunnel in the world for most of the 20th century, from its opening in 1906 until the 1980s?|¿Qué túnel alpino fue el túnel ferroviario más largo del mundo durante la mayor parte del siglo XX, desde su apertura en 1906 hasta la década de 1980?|Quel tunnel alpin fut le plus long tunnel ferroviaire du monde pendant la majeure partie du XXe siècle, de son ouverture en 1906 jusqu'aux années 1980 ?|1906年の開通から1980年代まで、20世紀の大半のあいだ世界最長の鉄道トンネルだったアルプスのトンネルは?",
    [
      "The Mont Cenis Tunnel|El túnel de Mont Cenis|Le tunnel du Mont-Cenis|モンスニトンネル",
      "The Arlberg Tunnel|El túnel del Arlberg|Le tunnel de l'Arlberg|アールベルクトンネル",
      "The Simplon Tunnel|El túnel del Simplón|Le tunnel du Simplon|シンプロントンネル",
    ],
    2,
    "Boring the Simplon Tunnel between Switzerland and Italy took workers through rock so hot that water had to be piped in just to keep the tunnel face cool enough to work, and the record it set stood until Japan's Seikan Tunnel finally overtook it decades later.|Perforar el túnel del Simplón entre Suiza e Italia llevó a los obreros a través de roca tan caliente que hubo que canalizar agua solo para mantener el frente de excavación a una temperatura soportable; el récord que estableció se mantuvo hasta que el túnel japonés de Seikan lo superó décadas después.|Le percement du tunnel du Simplon entre la Suisse et l'Italie a mené les ouvriers à travers une roche si chaude qu'il fallut y acheminer de l'eau rien que pour maintenir le front de taille à une température supportable ; le record qu'il établit tint jusqu'à ce que le tunnel japonais de Seikan le dépasse des décennies plus tard.|スイスとイタリアを結ぶシンプロントンネルの掘削では、岩盤があまりに高温で、作業できる温度に保つためだけに水を送り込む必要があった。この記録は、数十年後に日本の青函トンネルに抜かれるまで破られなかった。",
  ),
  q(
    10,
    "Along with Uzbekistan, which tiny European country is one of only two \"doubly landlocked\" nations on Earth, meaning every neighbour it has is itself landlocked?|Junto con Uzbekistán, ¿qué diminuto país europeo es una de las dos únicas naciones \"doblemente sin salida al mar\" del mundo, es decir, todos sus vecinos también carecen de salida al mar?|Avec l'Ouzbékistan, quel minuscule pays européen est l'une des deux seules nations \"doublement enclavées\" au monde, c'est-à-dire dont tous les voisins sont eux-mêmes enclavés ?|ウズベキスタンとともに、世界に2つしかない「二重内陸国」(隣接するすべての国がそれ自体も内陸国であるような国)の一つである、ヨーロッパの小さな国は?",
    [
      "Liechtenstein|Liechtenstein|Le Liechtenstein|リヒテンシュタイン",
      "Luxembourg|Luxemburgo|Le Luxembourg|ルクセンブルク",
      "Andorra|Andorra|Andorre|アンドラ",
    ],
    0,
    "Liechtenstein is wedged entirely between Switzerland and Austria, and since neither of those countries touches the sea either, a shipment leaving Liechtenstein has to cross at least two borders before it can reach open water.|Liechtenstein está encajado enteramente entre Suiza y Austria, y como ninguno de esos dos países toca el mar, un envío que sale de Liechtenstein tiene que cruzar al menos dos fronteras antes de llegar a aguas abiertas.|Le Liechtenstein est entièrement coincé entre la Suisse et l'Autriche, et comme aucun de ces deux pays ne touche la mer non plus, un envoi quittant le Liechtenstein doit franchir au moins deux frontières avant d'atteindre les eaux libres.|リヒテンシュタインはスイスとオーストリアに完全に挟まれており、その両国もまた海に面していないため、リヒテンシュタインを出た荷物が外洋にたどり着くには少なくとも2つの国境を越えなければならない。",
  ),
  q(
    10,
    "Ladin, a language with official recognition in parts of Italy's Trentino-Alto Adige region, is spoken mainly by a small population in which mountain range?|El ladino, una lengua con reconocimiento oficial en partes de la región italiana de Trentino-Alto Adigio, ¿lo habla principalmente una pequeña población en qué cordillera?|Le ladin, une langue officiellement reconnue dans certaines parties de la région italienne du Trentin-Haut-Adige, est parlé principalement par une petite population de quelle chaîne de montagnes ?|イタリアのトレンティーノ=アルト・アディジェ州の一部で公用語として認められている言語、ラディン語は、主にどの山脈の少数の人々によって話されているか?",
    [
      "The Pyrenees|Los Pirineos|Les Pyrénées|ピレネー山脈",
      "The Dolomites|Los Dolomitas|Les Dolomites|ドロミーティ山塊",
      "The Apennines|Los Apeninos|Les Apennins|アペニン山脈",
    ],
    1,
    "Ladin belongs to the same small Rhaeto-Romance family as Switzerland's Romansh, and its speakers are spread across five valleys of the Dolomites that were split between different Italian provinces when the borders were drawn, so the language has no single administrative home.|El ladino pertenece a la misma pequeña familia retorrománica que el romanche suizo, y sus hablantes se reparten por cinco valles de los Dolomitas que quedaron divididos entre distintas provincias italianas al trazarse las fronteras, por lo que la lengua no tiene una sede administrativa única.|Le ladin appartient à la même petite famille rhéto-romane que le romanche suisse, et ses locuteurs sont répartis sur cinq vallées des Dolomites qui furent scindées entre différentes provinces italiennes lors du tracé des frontières, si bien que la langue n'a pas de foyer administratif unique.|ラディン語はスイスのロマンシュ語と同じレト・ロマンス語群に属する小さな言語で、話者はドロミーティ山塊の5つの谷に分散している。これらの谷は国境画定の際に異なるイタリアの県に分割されたため、この言語には単一の行政上の拠点がない。",
  ),
  q(
    9,
    "The Treaty of Trianon, signed in 1920, forced Hungary to cede roughly two-thirds of its pre-war territory. Which war's end did the treaty formally settle?|El Tratado de Trianón, firmado en 1920, obligó a Hungría a ceder aproximadamente dos tercios de su territorio de preguerra. ¿El final de qué guerra formalizó el tratado?|Le traité de Trianon, signé en 1920, contraignit la Hongrie à céder environ les deux tiers de son territoire d'avant-guerre. La fin de quelle guerre ce traité a-t-il officiellement réglée ?|1920年に締結されたトリアノン条約は、ハンガリーに戦前の領土のおよそ3分の2の割譲を強いた。この条約が正式に締結したのは何戦争の終結か?",
    [
      "The Second World War|La Segunda Guerra Mundial|La Seconde Guerre mondiale|第二次世界大戦",
      "The Austro-Prussian War|La guerra austro-prusiana|La guerre austro-prussienne|普墺戦争",
      "The First World War|La Primera Guerra Mundial|La Première Guerre mondiale|第一次世界大戦",
    ],
    2,
    "The treaty is still commemorated with genuine grief in Hungary today, since it left millions of ethnic Hungarians living outside the country's new borders, mainly in what became Romania, Czechoslovakia and Yugoslavia.|El tratado todavía se conmemora con auténtico pesar en Hungría hoy en día, ya que dejó a millones de húngaros étnicos viviendo fuera de las nuevas fronteras del país, principalmente en lo que pasó a ser Rumanía, Checoslovaquia y Yugoslavia.|Le traité est encore commémoré aujourd'hui en Hongrie avec un chagrin sincère, car il laissa des millions de Hongrois de souche vivre hors des nouvelles frontières du pays, principalement dans ce qui devint la Roumanie, la Tchécoslovaquie et la Yougoslavie.|この条約は今もハンガリーで本物の悲哀とともに記念されている。数百万人のハンガリー系住民が、新しい国境の外、主に後のルーマニア・チェコスロバキア・ユーゴスラビアとなる地域に取り残されることになったためである。",
  ),
  q(
    9,
    "The Maastricht Treaty, which formally created today's European Union and laid the groundwork for the euro, was signed in 1992 in a city in which country?|El Tratado de Maastricht, que creó formalmente la actual Unión Europea y sentó las bases del euro, se firmó en 1992 en una ciudad de qué país?|Le traité de Maastricht, qui créa formellement l'actuelle Union européenne et posa les bases de l'euro, fut signé en 1992 dans une ville de quel pays ?|今日の欧州連合を正式に生み出し、ユーロの土台を築いたマーストリヒト条約が1992年に署名されたのは、どの国の都市でのことか?",
    [
      "The Netherlands|Países Bajos|Les Pays-Bas|オランダ",
      "Belgium|Bélgica|La Belgique|ベルギー",
      "Luxembourg|Luxemburgo|Le Luxembourg|ルクセンブルク",
    ],
    0,
    "Maastricht was chosen partly because the Netherlands held the rotating presidency of the European Community that year, and the treaty's ambitious timetable for a shared currency struck many observers at the time as wildly optimistic, yet the euro arrived on schedule less than a decade later.|Maastricht se eligió en parte porque los Países Bajos ocupaban ese año la presidencia rotatoria de la Comunidad Europea, y el ambicioso calendario del tratado para una moneda compartida les pareció a muchos observadores de la época descabelladamente optimista, aunque el euro llegó puntual menos de una década después.|Maastricht fut choisie en partie parce que les Pays-Bas assuraient cette année-là la présidence tournante de la Communauté européenne, et le calendrier ambitieux du traité pour une monnaie commune parut à beaucoup d'observateurs de l'époque follement optimiste, bien que l'euro soit arrivé à l'heure moins d'une décennie plus tard.|マーストリヒトが選ばれた理由の一つは、その年オランダが欧州共同体の輪番議長国を務めていたことだった。共通通貨についての条約の野心的な工程表は当時多くの識者に楽観的すぎると見られたが、ユーロは10年足らずのちに予定どおり登場した。",
  ),
  q(
    9,
    "Switzerland's Rhaetian Railway, including the Albula and Bernina lines, was named a UNESCO World Heritage Site largely for its use of which technique to climb steep Alpine terrain without excessively steep grades?|El Ferrocarril Rético de Suiza, que incluye las líneas del Albula y del Bernina, fue declarado Patrimonio de la Humanidad por la UNESCO en gran parte por su uso de qué técnica para ascender terreno alpino empinado sin pendientes excesivas?|Le chemin de fer rhétique suisse, qui comprend les lignes de l'Albula et de la Bernina, a été inscrit au patrimoine mondial de l'UNESCO en grande partie pour son usage de quelle technique afin de gravir un terrain alpin escarpé sans pentes excessives ?|アルブラ線とベルニナ線を含むスイスのレーティッシュ鉄道が、ユネスコの世界遺産に登録された大きな理由の一つとなっている、急峻なアルプスの地形を過度な急勾配なしに登るための技法は?",
    [
      "Rack-and-pinion cogwheels on every locomotive|Cremalleras dentadas en cada locomotora|Des crémaillères sur chaque locomotive|すべての機関車に取り付けたラック式歯車",
      "Spiral loops that let the line climb over or under itself|Bucles en espiral que permiten que la línea suba sobre o bajo sí misma|Des boucles en spirale permettant à la ligne de grimper au-dessus ou en dessous d'elle-même|線路が自分自身の上や下を回り込むように登るループ線",
      "Funicular cables hauling the whole train uphill|Cables funiculares que arrastran todo el tren cuesta arriba|Des câbles funiculaires halant tout le train vers le haut|列車全体をケーブルで引き上げる仕組み",
    ],
    1,
    "At the Brusio spiral viaduct on the Bernina line, passengers can watch the same train loop back over the bridge they just crossed, gaining height in a tight circle instead of a straight climb that would be too steep for ordinary wheels to grip.|En el viaducto en espiral de Brusio, en la línea del Bernina, los pasajeros pueden ver cómo el mismo tren vuelve a pasar por encima del puente que acaban de cruzar, ganando altura en un círculo cerrado en vez de una subida recta que sería demasiado empinada para que las ruedas normales se agarren.|Au viaduc en spirale de Brusio, sur la ligne de la Bernina, les passagers peuvent voir le même train repasser au-dessus du pont qu'ils viennent de franchir, gagnant de l'altitude en boucle serrée plutôt que par une montée droite trop raide pour l'adhérence de roues ordinaires.|ベルニナ線のブルージオ螺旋高架橋では、乗客はたった今渡った橋の上をもう一度同じ列車が通過するのを目にすることができる。通常の車輪では登れないほどの急勾配を避け、きつい円を描きながら高度を稼ぐ仕組みである。",
  ),
  q(
    9,
    "On what date in August 1961 did East German authorities begin sealing the border between East and West Berlin, the first step toward building the Berlin Wall?|¿En qué fecha de agosto de 1961 comenzaron las autoridades de Alemania Oriental a sellar la frontera entre Berlín Este y Berlín Oeste, el primer paso hacia la construcción del Muro de Berlín?|À quelle date d'août 1961 les autorités est-allemandes ont-elles commencé à sceller la frontière entre Berlin-Est et Berlin-Ouest, premier pas vers la construction du mur de Berlin ?|1961年8月の何日に、東ドイツ当局は東西ベルリンの境界を封鎖しはじめ、ベルリンの壁建設の第一歩を踏み出したか?",
    [
      "1 August|1 de agosto|Le 1er août|8月1日",
      "23 August|23 de agosto|Le 23 août|8月23日",
      "13 August|13 de agosto|Le 13 août|8月13日",
    ],
    2,
    "Work began in the middle of the night with soldiers rolling out barbed wire while most Berliners were asleep, and many woke that Sunday morning to find they could no longer reach relatives, jobs or homes on the other side of their own city.|Los trabajos comenzaron en plena noche, con soldados desplegando alambre de púas mientras la mayoría de los berlineses dormían, y muchos se despertaron aquel domingo por la mañana y descubrieron que ya no podían llegar a sus familiares, trabajos o casas al otro lado de su propia ciudad.|Les travaux commencèrent en pleine nuit, des soldats déroulant des barbelés pendant que la plupart des Berlinois dormaient, et beaucoup se réveillèrent ce dimanche matin pour découvrir qu'ils ne pouvaient plus atteindre leur famille, leur travail ou leur domicile de l'autre côté de leur propre ville.|作業はほとんどのベルリン市民が眠っている真夜中に始まり、兵士たちが有刺鉄線を敷設した。その日曜の朝、多くの市民は目覚めて、自分の街の反対側にある親族や職場、自宅にもう行けなくなっていることに気づいた。",
  ),
  q(
    9,
    "Vatican City, the world's smallest sovereign state, is connected to the Italian rail network by a short line of its own. In what year did this Vatican Railway open?|La Ciudad del Vaticano, el estado soberano más pequeño del mundo, está conectada a la red ferroviaria italiana por una breve línea propia. ¿En qué año se inauguró este Ferrocarril Vaticano?|La Cité du Vatican, le plus petit État souverain du monde, est reliée au réseau ferroviaire italien par une courte ligne qui lui est propre. En quelle année ce chemin de fer vatican a-t-il ouvert ?|世界最小の主権国家であるバチカン市国は、独自の短い路線でイタリアの鉄道網とつながっている。このバチカン鉄道が開通したのは何年か?",
    [
      "1934|1934|1934|1934年",
      "1950|1950|1950|1950年",
      "1929|1929|1929|1929年",
    ],
    0,
    "The line is barely 300 metres long and today carries almost no scheduled passenger trains, but popes have occasionally used it for ceremonial arrivals, and it still exists mainly so the Vatican can receive freight without going through Italian customs on the street.|La línea mide apenas 300 metros y hoy en día casi no lleva trenes de pasajeros programados, pero los papas la han usado en ocasiones para llegadas ceremoniales, y sigue existiendo sobre todo para que el Vaticano pueda recibir mercancías sin pasar por la aduana italiana en la calle.|La ligne mesure à peine 300 mètres et n'accueille aujourd'hui presque aucun train de voyageurs régulier, mais des papes l'ont parfois empruntée pour des arrivées cérémonielles, et elle existe encore surtout pour que le Vatican puisse recevoir du fret sans passer par la douane italienne en surface.|この路線はわずか300mほどしかなく、現在では定期旅客列車はほとんど走っていないが、歴代の教皇が儀礼的な到着に使ったこともある。今も存在し続けている主な理由は、バチカンが路上でイタリアの税関を通さずに貨物を受け取れるようにするためである。",
  ),
  q(
    9,
    "San Marino, which claims to be the world's oldest surviving republic, traditionally dates its founding to which century AD?|San Marino, que afirma ser la república soberana más antigua del mundo, ¿data tradicionalmente su fundación en qué siglo d.C.?|Saint-Marin, qui revendique le titre de plus ancienne république souveraine encore existante au monde, situe traditionnellement sa fondation à quel siècle apr. J.-C. ?|世界最古の現存する共和国を自称するサンマリノが、伝統的に建国の時期としているのは西暦何世紀か?",
    [
      "The 8th century|El siglo VIII|Le VIIIe siècle|8世紀",
      "The 4th century|El siglo IV|Le IVe siècle|4世紀",
      "The 11th century|El siglo XI|Le XIe siècle|11世紀",
    ],
    1,
    "Tradition holds that a Christian stonemason named Marinus fled persecution and founded a small community on Monte Titano in the year 301, and San Marino's government still marks that legendary date as its official founding, even though it cannot be verified historically.|La tradición sostiene que un cantero cristiano llamado Marino huyó de la persecución y fundó una pequeña comunidad en el monte Titano en el año 301, y el gobierno de San Marino todavía señala esa fecha legendaria como su fundación oficial, aunque no se pueda verificar históricamente.|La tradition veut qu'un tailleur de pierre chrétien nommé Marin ait fui les persécutions et fondé une petite communauté sur le mont Titano en l'an 301, et le gouvernement saint-marinais retient encore cette date légendaire comme sa fondation officielle, bien qu'elle ne puisse être vérifiée historiquement.|伝承によれば、キリスト教徒の石工マリヌスが迫害を逃れ、301年にティターノ山に小さな共同体を築いたとされる。歴史的に確認はできないものの、サンマリノ政府は今もこの伝説上の日付を公式の建国年としている。",
  ),
  q(
    9,
    "Andorra is unusual in having two heads of state simultaneously, known as co-princes. One is the Bishop of Urgell in Spain — who is the other?|Andorra tiene la particularidad de contar con dos jefes de Estado a la vez, llamados copríncipes. Uno es el obispo de Urgel, en España, ¿quién es el otro?|L'Andorre a la particularité d'avoir deux chefs d'État simultanément, appelés coprinces. L'un est l'évêque d'Urgell, en Espagne — qui est l'autre ?|アンドラには「共同大公」と呼ばれる2人の元首が同時に存在するという珍しい制度がある。1人はスペインのウルヘル司教だが、もう1人は誰か?",
    [
      "The King of Spain|El rey de España|Le roi d'Espagne|スペイン国王",
      "The Pope|El papa|Le pape|ローマ教皇",
      "The President of France|El presidente de Francia|Le président de la République française|フランス大統領",
    ],
    2,
    "The arrangement traces back to a medieval settlement between a French count and a Spanish bishop over control of the valley, and it survived essentially unchanged into the present, so France's head of state, whoever currently holds the office, is automatically also a co-prince of Andorra.|El arreglo se remonta a un acuerdo medieval entre un conde francés y un obispo español por el control del valle, y sobrevivió casi sin cambios hasta hoy, así que el jefe de Estado de Francia, sea quien sea que ocupe el cargo, es automáticamente también copríncipe de Andorra.|Cet arrangement remonte à un accord médiéval entre un comte français et un évêque espagnol pour le contrôle de la vallée, et il a survécu quasiment inchangé jusqu'à aujourd'hui, si bien que le chef de l'État français, quel qu'il soit, est automatiquement aussi coprince d'Andorre.|この制度は、谷の支配権をめぐるフランスの伯爵とスペインの司教のあいだの中世の取り決めに由来し、ほぼそのままの形で現在まで続いている。そのためフランスの元首は、誰が就任していようと、自動的にアンドラの共同大公も兼ねることになる。",
  ),
  q(
    8,
    "The Kiel Canal cuts across the base of the Jutland peninsula in Germany, letting ships avoid sailing all the way around Denmark. Which two seas does it connect?|El canal de Kiel atraviesa la base de la península de Jutlandia en Alemania, permitiendo a los barcos evitar rodear toda Dinamarca. ¿Qué dos mares conecta?|Le canal de Kiel traverse la base de la péninsule du Jutland en Allemagne, permettant aux navires d'éviter de contourner entièrement le Danemark. Quelles deux mers relie-t-il ?|キール運河はドイツのユトランド半島の付け根を横切っており、船がデンマークをぐるりと回らずに済むようにしている。この運河がつないでいる2つの海は?",
    [
      "The North Sea and the Baltic Sea|El mar del Norte y el mar Báltico|La mer du Nord et la mer Baltique|北海とバルト海",
      "The North Sea and the Norwegian Sea|El mar del Norte y el mar de Noruega|La mer du Nord et la mer de Norvège|北海とノルウェー海",
      "The Baltic Sea and the White Sea|El mar Báltico y el mar Blanco|La mer Baltique et la mer Blanche|バルト海と白海",
    ],
    0,
    "Opened in 1895, the canal is still one of the busiest artificial waterways in the world, carrying more ship traffic each year than the Panama and Suez canals combined, mostly because it saves a detour of several hundred kilometres around Denmark's northern tip.|Inaugurado en 1895, el canal sigue siendo una de las vías navegables artificiales más transitadas del mundo, con más tráfico de barcos al año que los canales de Panamá y Suez juntos, sobre todo porque ahorra un rodeo de varios cientos de kilómetros por la punta norte de Dinamarca.|Ouvert en 1895, le canal reste l'une des voies navigables artificielles les plus fréquentées au monde, avec un trafic maritime annuel supérieur à celui des canaux de Panama et de Suez réunis, principalement parce qu'il évite un détour de plusieurs centaines de kilomètres par la pointe nord du Danemark.|1895年に開通したこの運河は今も世界有数の交通量を誇る人工水路で、年間の船舶通航量はパナマ運河とスエズ運河を合わせたよりも多い。デンマーク北端を回る数百キロの迂回を省けることが大きな理由である。",
  ),
  q(
    8,
    "The Czech composer Bedřich Smetana wrote a set of symphonic poems called \"Má vlast\" (My Homeland), whose most famous movement depicts which river flowing through Prague?|El compositor checo Bedřich Smetana escribió un conjunto de poemas sinfónicos llamado \"Má vlast\" (Mi patria), cuyo movimiento más famoso representa qué río que atraviesa Praga?|Le compositeur tchèque Bedřich Smetana a écrit un cycle de poèmes symphoniques intitulé \"Má vlast\" (Ma patrie), dont le mouvement le plus célèbre dépeint quel fleuve traversant Prague ?|チェコの作曲家スメタナが書いた交響詩集『わが祖国』の中でもとりわけ有名な楽章が描いている、プラハを流れる川は?",
    [
      "The Elbe|El Elba|L'Elbe|エルベ川",
      "The Vltava|El Moldava|La Vltava|ヴルタヴァ川",
      "The Danube|El Danubio|Le Danube|ドナウ川",
    ],
    1,
    "Known in German as the Moldau, the piece traces the river from two small springs through forests and a peasant wedding to the rapids at Saint John and finally past the castles of Prague, and it remains one of the most performed orchestral works of the entire Czech repertoire.|Conocida en alemán como Moldau, la pieza sigue el río desde dos pequeños manantiales, a través de bosques y una boda campesina, hasta los rápidos de San Juan y finalmente ante los castillos de Praga, y sigue siendo una de las obras orquestales más interpretadas de todo el repertorio checo.|Connue en allemand sous le nom de Moldau, l'œuvre suit le fleuve depuis deux petites sources, à travers des forêts et une noce paysanne, jusqu'aux rapides de Saint-Jean puis devant les châteaux de Prague, et elle demeure l'une des œuvres orchestrales les plus jouées de tout le répertoire tchèque.|ドイツ語では「モルダウ」とも呼ばれるこの曲は、2つの小さな泉から始まり、森や農民の結婚式、聖ヤン急流を経て、最後にプラハの城のそばを流れていく川の姿をたどる。今もチェコの管弦楽レパートリーの中で最も演奏される作品の一つである。",
  ),
  q(
    8,
    "Which Nordic country maintains no standing army at all, relying instead only on a coast guard for its defence?|¿Qué país nórdico no mantiene ningún ejército permanente, y depende únicamente de una guardia costera para su defensa?|Quel pays nordique ne dispose d'aucune armée permanente, ne comptant que sur une garde côtière pour sa défense ?|常備軍をまったく持たず、防衛を沿岸警備隊だけに頼っている北欧の国は?",
    [
      "Norway|Noruega|La Norvège|ノルウェー",
      "Finland|Finlandia|La Finlande|フィンランド",
      "Iceland|Islandia|L'Islande|アイスランド",
    ],
    2,
    "Iceland is a founding member of NATO despite having no army, navy or air force of its own; the country's defence has historically depended on allied forces, and its own coast guard is mainly equipped to handle fisheries disputes and search and rescue rather than combat.|Islandia es miembro fundador de la OTAN a pesar de no tener ejército, marina ni fuerza aérea propios; la defensa del país ha dependido históricamente de fuerzas aliadas, y su propia guardia costera está equipada sobre todo para gestionar disputas pesqueras y labores de rescate, no para el combate.|L'Islande est un membre fondateur de l'OTAN bien qu'elle n'ait ni armée de terre, ni marine, ni armée de l'air propres ; la défense du pays a historiquement dépendu de forces alliées, et sa propre garde côtière est surtout équipée pour gérer les différends de pêche et les opérations de sauvetage plutôt que le combat.|アイスランドは自国の陸軍・海軍・空軍を持たないにもかかわらずNATOの原加盟国である。同国の防衛は歴史的に同盟国の部隊に依存してきており、自前の沿岸警備隊は戦闘用というより漁業紛争や捜索救助のための装備が中心である。",
  ),
  q(
    8,
    "The Dutch province of Flevoland, the country's newest, was created almost entirely by draining part of a former inland sea. What was the 20th-century engineering project called?|La provincia neerlandesa de Flevoland, la más nueva del país, se creó casi por completo drenando parte de un antiguo mar interior. ¿Cómo se llamó el proyecto de ingeniería del siglo XX?|La province néerlandaise de Flevoland, la plus récente du pays, a été créée presque entièrement en asséchant une partie d'une ancienne mer intérieure. Comment s'appelait ce projet d'ingénierie du XXe siècle ?|オランダで最も新しい州であるフレヴォラント州は、かつての内海の一部を干拓してほぼゼロから作られた。この20世紀の土木事業は何と呼ばれるか?",
    [
      "The Zuiderzee Works|Las Obras del Zuiderzee|Les Travaux du Zuiderzee|ゾイデル海開発事業",
      "The Delta Works|Las Obras del Delta|Les Travaux du Delta|デルタ計画",
      "The Randstad Plan|El Plan Randstad|Le Plan Randstad|ランドスタッド計画",
    ],
    0,
    "A separate later project, the Delta Works, was built to protect the southwestern coast after a catastrophic 1953 flood, but Flevoland's land itself came earlier, from a dam that sealed off the Zuiderzee bay and turned it into the freshwater lake now called the IJsselmeer.|Un proyecto posterior distinto, las Obras del Delta, se construyó para proteger la costa suroeste tras una inundación catastrófica en 1953, pero la propia tierra de Flevoland surgió antes, de una presa que cerró la bahía del Zuiderzee y la convirtió en el lago de agua dulce hoy llamado IJsselmeer.|Un projet ultérieur distinct, les Travaux du Delta, fut construit pour protéger la côte sud-ouest après une inondation catastrophique en 1953, mais les terres de Flevoland elles-mêmes datent d'avant, issues d'un barrage qui ferma la baie du Zuiderzee et la transforma en lac d'eau douce aujourd'hui appelé l'IJsselmeer.|後年の別の事業「デルタ計画」は1953年の壊滅的な洪水のあとに南西部の海岸を守るために作られたものだが、フレヴォラント州の土地自体はそれより早く、ゾイデル海の湾口をせき止めるダムによって生まれた。このダムがこの海を、現在アイセル湖と呼ばれる淡水湖に変えた。",
  ),
  q(
    8,
    "The Frisian Islands, a chain of low sandy islands, stretch along the North Sea coast of which three countries?|Las islas Frisias, una cadena de islas bajas y arenosas, se extienden a lo largo de la costa del mar del Norte de qué tres países?|Les îles Frisonnes, un chapelet d'îles basses et sablonneuses, s'étendent le long de la côte de la mer du Nord de quels trois pays ?|低くて砂地の島々が連なるフリースラント諸島は、北海沿岸のどの3か国にまたがって広がっているか?",
    [
      "The Netherlands, Belgium and France|Países Bajos, Bélgica y Francia|Les Pays-Bas, la Belgique et la France|オランダ・ベルギー・フランス",
      "The Netherlands, Germany and Denmark|Países Bajos, Alemania y Dinamarca|Les Pays-Bas, l'Allemagne et le Danemark|オランダ・ドイツ・デンマーク",
      "Germany, Poland and Sweden|Alemania, Polonia y Suecia|L'Allemagne, la Pologne et la Suède|ドイツ・ポーランド・スウェーデン",
    ],
    1,
    "The chain is conventionally split into West Frisian, East Frisian and North Frisian groups, and the shallow, tidal Wadden Sea sheltered behind the islands is itself a UNESCO World Heritage Site, prized as one of the largest unbroken stretches of tidal flats on Earth.|La cadena se divide convencionalmente en los grupos frisón occidental, frisón oriental y frisón septentrional, y el mar de Frisia, poco profundo y mareal, resguardado tras las islas, es en sí mismo Patrimonio de la Humanidad de la UNESCO, valorado como uno de los tramos ininterrumpidos de llanuras mareales más grandes del planeta.|Le chapelet se divise traditionnellement en groupes frison occidental, frison oriental et frison septentrional, et la mer des Wadden, peu profonde et soumise aux marées, abritée derrière les îles, est elle-même inscrite au patrimoine mondial de l'UNESCO, prisée comme l'une des plus grandes étendues ininterrompues de vasières au monde.|この島々は慣例的に西フリースラント諸島・東フリースラント諸島・北フリースラント諸島に分けられる。島々の内側に広がる遠浅の干潟「ワッデン海」自体もユネスコ世界遺産で、地球上でも有数の連続した干潟として評価されている。",
  ),
  q(
    8,
    "The Polish city of Wrocław, now home to a major university and rebuilt historic square, was known by what German name before its post-1945 border changes?|La ciudad polaca de Wrocław, hoy sede de una importante universidad y de una plaza histórica reconstruida, ¿cómo se llamaba en alemán antes de los cambios fronterizos posteriores a 1945?|La ville polonaise de Wrocław, aujourd'hui siège d'une grande université et d'une place historique reconstruite, portait quel nom allemand avant les changements de frontières survenus après 1945 ?|現在は大きな大学と再建された歴史的広場を擁するポーランドの都市ヴロツワフは、1945年以降の国境変更以前はドイツ語で何と呼ばれていたか?",
    [
      "Danzig|Danzig|Dantzig|ダンツィヒ",
      "Königsberg|Königsberg|Königsberg|ケーニヒスベルク",
      "Breslau|Breslau|Breslau|ブレスラウ",
    ],
    2,
    "Almost the entire pre-war German population of the city was expelled after 1945 and replaced by Polish settlers, many of them themselves displaced from territory further east that had been ceded to the Soviet Union, so the city's population changed almost completely within just a few years.|Casi toda la población alemana de preguerra de la ciudad fue expulsada después de 1945 y sustituida por colonos polacos, muchos de ellos a su vez desplazados de territorios más al este cedidos a la Unión Soviética, de modo que la población de la ciudad cambió casi por completo en solo unos pocos años.|La quasi-totalité de la population allemande d'avant-guerre de la ville fut expulsée après 1945 et remplacée par des colons polonais, dont beaucoup avaient eux-mêmes été déplacés de territoires plus à l'est cédés à l'Union soviétique, si bien que la population de la ville changea presque entièrement en l'espace de quelques années.|この街の戦前のドイツ人住民はほぼ全員が1945年以降に追放され、代わってポーランド人の入植者が移り住んだ。その多くは、ソ連に割譲されたさらに東の地域から自身も追われてきた人々であり、街の住民構成はわずか数年でほぼ完全に入れ替わった。",
  ),
  q(
    8,
    "Besides the Öresund, which other strait carries a major fixed rail and road link across Denmark, joining the islands of Zealand and Funen?|Además del Öresund, ¿qué otro estrecho lleva un importante enlace fijo de ferrocarril y carretera a través de Dinamarca, uniendo las islas de Selandia y Fionia?|Outre l'Öresund, quel autre détroit porte une importante liaison fixe ferroviaire et routière à travers le Danemark, reliant les îles de Sjælland et de Fionie ?|エーレスンド海峡のほかに、デンマーク国内でシェラン島とフュン島を結ぶ大きな鉄道・道路の固定リンクが通っている海峡は?",
    [
      "The Great Belt|El Gran Belt|Le Grand Belt|大ベルト海峡",
      "The Little Belt|El Pequeño Belt|Le Petit Belt|小ベルト海峡",
      "The Kattegat|El Kattegat|Le Kattegat|カテガット海峡",
    ],
    0,
    "The Great Belt Fixed Link opened in stages in 1997 and 1998, combining a suspension bridge for road traffic with a separate undersea rail tunnel, and it was, for a time, the second-longest suspension bridge span in the world.|El enlace fijo del Gran Belt se inauguró por etapas en 1997 y 1998, combinando un puente colgante para el tráfico rodado con un túnel ferroviario submarino independiente, y durante un tiempo fue el segundo vano de puente colgante más largo del mundo.|La liaison fixe du Grand Belt ouvrit par étapes en 1997 et 1998, associant un pont suspendu pour la circulation routière à un tunnel ferroviaire sous-marin distinct, et elle fut, pendant un temps, la deuxième plus longue travée de pont suspendu au monde.|大ベルト海峡の固定リンクは1997年と1998年に段階的に開通した。道路用の吊り橋と、別に設けられた海底鉄道トンネルを組み合わせたもので、開通当時は世界で2番目に長い吊り橋の主径間だった。",
  ),
  q(
    8,
    "Lake Bled in Slovenia is famous for its small island church, traditionally reached by a distinctive flat-bottomed wooden gondola boat. What is this boat called?|El lago Bled, en Eslovenia, es famoso por su pequeña iglesia en una isla, a la que tradicionalmente se llega en una característica barca de madera de fondo plano. ¿Cómo se llama esta barca?|Le lac de Bled, en Slovénie, est réputé pour sa petite église insulaire, traditionnellement rejointe par une embarcation en bois à fond plat caractéristique. Comment s'appelle ce bateau ?|スロベニアのブレッド湖は小さな島に建つ教会で知られ、伝統的にはある特徴的な平底の木造ゴンドラ舟でそこへ渡る。この舟は何と呼ばれるか?",
    [
      "The gondola|La góndola|La gondole|ゴンドラ",
      "The pletna|La pletna|La pletna|プレトナ",
      "The caïque|El caique|Le caïque|カイキ",
    ],
    1,
    "Only members of a small number of licensed families, whose right to row passengers to the island has been passed down for generations, are permitted to operate the pletna boats, a tradition that reportedly dates back to a 17th-century privilege granted by local authorities.|Solo a los miembros de un pequeño número de familias con licencia, cuyo derecho a remar a los pasajeros hasta la isla se ha transmitido durante generaciones, se les permite operar las barcas pletna, una tradición que según se dice se remonta a un privilegio concedido por las autoridades locales en el siglo XVII.|Seuls les membres d'un petit nombre de familles agréées, dont le droit de conduire les passagers jusqu'à l'île se transmet depuis des générations, sont autorisés à faire naviguer les pletna, une tradition qui remonterait à un privilège accordé par les autorités locales au XVIIe siècle.|プレトナ舟を漕げるのは、島まで乗客を運ぶ権利を代々受け継いできたごく少数の免許を持つ家系の者だけである。この伝統は17世紀に地元当局が与えた特権に由来すると伝えられている。",
  ),
  q(
    8,
    "Albania's Adriatic coastline faces the \"heel\" of Italy across a relatively narrow strait. What is that strait called?|La costa adriática de Albania da a la \"punta del tacón\" de Italia a través de un estrecho relativamente angosto. ¿Cómo se llama ese estrecho?|La côte adriatique de l'Albanie fait face au \"talon\" de l'Italie à travers un détroit relativement étroit. Comment s'appelle ce détroit ?|アルバニアのアドリア海沿岸は、比較的狭い海峡を挟んでイタリアの「かかと」部分と向き合っている。この海峡の名前は?",
    [
      "The Strait of Messina|El estrecho de Mesina|Le détroit de Messine|メッシーナ海峡",
      "The Strait of Bonifacio|El estrecho de Bonifacio|Le détroit de Bonifacio|ボニファシオ海峡",
      "The Strait of Otranto|El estrecho de Otranto|Le détroit d'Otrante|オトラント海峡",
    ],
    2,
    "At its narrowest the strait is only about 72 kilometres wide, and it marks the boundary between the Adriatic Sea to the north and the Ionian Sea to the south, a stretch of water that has also seen waves of migration and smuggling traffic between the two coasts.|En su punto más estrecho, el estrecho mide solo unos 72 kilómetros de ancho, y marca el límite entre el mar Adriático al norte y el mar Jónico al sur, un tramo de agua que también ha visto oleadas de migración y tráfico de contrabando entre ambas costas.|À son point le plus étroit, le détroit ne mesure qu'environ 72 kilomètres de large, et il marque la limite entre la mer Adriatique au nord et la mer Ionienne au sud, une étendue d'eau qui a aussi connu des vagues de migration et de contrebande entre les deux rives.|最も狭い場所でおよそ72kmしかないこの海峡は、北のアドリア海と南のイオニア海の境界にもなっている。両岸のあいだでは移民や密輸の往来の波もたびたび見られてきた海域である。",
  ),
  q(
    8,
    "Luxembourgish, the national language of Luxembourg, developed from which broader group of German dialects?|El luxemburgués, la lengua nacional de Luxemburgo, ¿se desarrolló a partir de qué grupo más amplio de dialectos alemanes?|Le luxembourgeois, la langue nationale du Luxembourg, s'est développé à partir de quel groupe plus large de dialectes allemands ?|ルクセンブルクの国語であるルクセンブルク語は、より大きなドイツ語方言のどの系統から発展したか?",
    [
      "Moselle Franconian|El franconio del Mosela|Le francique mosellan|モーゼル・フランケン方言",
      "Bavarian|El bávaro|Le bavarois|バイエルン方言",
      "Low Saxon|El bajo sajón|Le bas-saxon|低ザクセン方言",
    ],
    0,
    "Luxembourgish only gained status as a full national language in 1984, separate from German; before that it was widely treated as a regional dialect, even though nearly the whole population speaks it daily alongside French and standard German in schools and government.|El luxemburgués solo obtuvo el estatus de lengua nacional plena en 1984, separado del alemán; antes de eso se le trataba ampliamente como un dialecto regional, aunque casi toda la población lo habla a diario junto con el francés y el alemán estándar en las escuelas y la administración.|Le luxembourgeois n'a obtenu le statut de langue nationale à part entière qu'en 1984, distinct de l'allemand ; avant cela, il était largement considéré comme un dialecte régional, bien que la quasi-totalité de la population le parle quotidiennement aux côtés du français et de l'allemand standard à l'école et dans l'administration.|ルクセンブルク語がドイツ語とは別の完全な国語としての地位を得たのは1984年のことで、それ以前は広く地域方言として扱われていた。それでも住民のほぼ全員が、学校や行政で使うフランス語や標準ドイツ語と並んで、日常的にこの言葉を話している。",
  ),
  q(
    7,
    "Iceland, Sweden, Norway and Denmark each have a currency with a similar name, but Iceland's is spelled differently from the others. What is Iceland's currency called?|Islandia, Suecia, Noruega y Dinamarca tienen cada una una moneda de nombre parecido, pero la de Islandia se escribe de forma distinta a las demás. ¿Cómo se llama la moneda de Islandia?|L'Islande, la Suède, la Norvège et le Danemark ont chacune une monnaie au nom similaire, mais celle de l'Islande s'écrit différemment des autres. Comment s'appelle la monnaie islandaise ?|アイスランド・スウェーデン・ノルウェー・デンマークにはそれぞれ似た名前の通貨があるが、アイスランドの綴りだけ他と少し異なる。アイスランドの通貨の名前は?",
    [
      "The krona|La krona sueca|La krona|クローナ(krona)",
      "The króna|La krona islandesa (króna)|La króna|クローナ(króna)",
      "The krone|La krone|La krone|クローネ",
    ],
    1,
    "All four names ultimately come from the same old word for \"crown,\" but each country's currency floats independently and has its own exchange rate; they are not interchangeable despite sounding almost identical.|Los cuatro nombres provienen en última instancia de la misma palabra antigua para \"corona\", pero la moneda de cada país flota de forma independiente y tiene su propio tipo de cambio; no son intercambiables pese a sonar casi idénticas.|Les quatre noms proviennent en fin de compte du même mot ancien signifiant \"couronne\", mais la monnaie de chaque pays flotte indépendamment et a son propre taux de change ; elles ne sont pas interchangeables malgré une sonorité presque identique.|4つの名前はすべて「王冠」を意味する同じ古い言葉に由来するが、それぞれの国の通貨は独立して変動し、為替レートも別々である。響きはほぼ同じでも、互いに交換できるわけではない。",
  ),
  q(
    7,
    "Portugal's 1974 Carnation Revolution, which peacefully ended decades of dictatorship, is named for the flowers that came to symbolise the uprising. How did carnations become linked to the event?|La Revolución de los Claveles de 1974 en Portugal, que puso fin pacíficamente a décadas de dictadura, debe su nombre a las flores que llegaron a simbolizar el levantamiento. ¿Cómo se vincularon los claveles a este suceso?|La révolution des Œillets de 1974 au Portugal, qui mit fin pacifiquement à des décennies de dictature, doit son nom aux fleurs devenues le symbole du soulèvement. Comment les œillets se sont-ils liés à cet événement ?|数十年にわたる独裁体制を平和的に終わらせた1974年ポルトガルの「カーネーション革命」は、蜂起の象徴となった花にちなんで名づけられている。カーネーションはどのようにしてこの出来事と結びついたか?",
    [
      "The coup began on a public holiday honouring the flower|El golpe comenzó en un día festivo dedicado a esa flor|Le coup d'État débuta un jour férié dédié à cette fleur|クーデターがその花を祝う祝日に始まった",
      "Soldiers wore carnations as a secret uniform code|Los soldados llevaban claveles como código secreto en el uniforme|Les soldats portaient des œillets comme code secret sur leur uniforme|兵士たちが合図としてカーネーションを制服に付けていた",
      "Civilians placed carnations in soldiers' rifle barrels|Los civiles colocaron claveles en los cañones de los fusiles de los soldados|Des civils placèrent des œillets dans les canons de fusils des soldats|市民が兵士の銃口にカーネーションを差し込んだ",
    ],
    2,
    "A restaurant worker reportedly handed out carnations from a market stall to soldiers and bystanders that day, and people began slipping the flowers into gun barrels and onto uniforms as the coup unfolded almost without bloodshed.|Se dice que una trabajadora de un restaurante repartió claveles de un puesto de mercado a soldados y transeúntes ese día, y la gente empezó a meter las flores en los cañones de los fusiles y en los uniformes mientras el golpe se desarrollaba casi sin derramamiento de sangre.|Une employée de restaurant aurait distribué des œillets pris à un étal de marché aux soldats et aux passants ce jour-là, et les gens se mirent à glisser les fleurs dans les canons de fusils et sur les uniformes tandis que le coup d'État se déroulait presque sans effusion de sang.|その日、ある食堂の従業員が市場の屋台のカーネーションを兵士や通行人に配ったと伝えられ、人々はクーデターがほとんど流血なしに進むなかで、その花を銃口や制服に差し込んでいった。",
  ),
  q(
    7,
    "The Sami, an indigenous people traditionally associated with reindeer herding, live across the far north of which four present-day countries?|Los sami, un pueblo indígena tradicionalmente asociado con el pastoreo de renos, ¿viven en el extremo norte de qué cuatro países actuales?|Les Samis, un peuple autochtone traditionnellement associé à l'élevage de rennes, vivent dans l'extrême nord de quels quatre pays actuels ?|伝統的にトナカイの遊牧と結びつけられる先住民サーミの人々が暮らしているのは、現在の4か国の最北部にまたがってのことだが、その4か国とは?",
    [
      "Norway, Sweden, Finland and Russia|Noruega, Suecia, Finlandia y Rusia|La Norvège, la Suède, la Finlande et la Russie|ノルウェー・スウェーデン・フィンランド・ロシア",
      "Norway, Sweden, Denmark and Iceland|Noruega, Suecia, Dinamarca e Islandia|La Norvège, la Suède, le Danemark et l'Islande|ノルウェー・スウェーデン・デンマーク・アイスランド",
      "Sweden, Finland, Estonia and Latvia|Suecia, Finlandia, Estonia y Letonia|La Suède, la Finlande, l'Estonie et la Lettonie|スウェーデン・フィンランド・エストニア・ラトビア",
    ],
    0,
    "The Sami homeland, often called Sápmi, has no fixed borders of its own and stretches across national frontiers that were drawn without much regard for it, so Sami political bodies today coordinate across all four countries rather than within just one.|La tierra sami, a menudo llamada Sápmi, no tiene fronteras propias fijas y se extiende a través de fronteras nacionales trazadas sin tenerla demasiado en cuenta, así que los órganos políticos samis de hoy coordinan a través de los cuatro países en lugar de dentro de uno solo.|La patrie same, souvent appelée Sápmi, n'a pas de frontières propres fixes et s'étend à travers des frontières nationales tracées sans trop tenir compte d'elle, si bien que les instances politiques samies coordonnent aujourd'hui leur action à travers les quatre pays plutôt qu'au sein d'un seul.|しばしば「サプミ」と呼ばれるサーミの故地には独自の固定した境界がなく、それをあまり考慮せずに引かれた国境をまたいで広がっている。そのため現在のサーミの政治組織は、一国内ではなく4か国にまたがって活動を調整している。",
  ),
  q(
    7,
    "Switzerland has four national languages: German, French, Italian and a fourth spoken by a small minority in the southeast. What is it?|Suiza tiene cuatro lenguas nacionales: alemán, francés, italiano y una cuarta que habla una pequeña minoría en el sureste. ¿Cuál es?|La Suisse compte quatre langues nationales : l'allemand, le français, l'italien et une quatrième parlée par une petite minorité dans le sud-est du pays. Laquelle ?|スイスには4つの国語がある。ドイツ語・フランス語・イタリア語、そして南東部の少数の人々が話す4つ目の言語は?",
    [
      "Ladin|El ladino|Le ladin|ラディン語",
      "Romansh|El romanche|Le romanche|ロマンシュ語",
      "Occitan|El occitano|L'occitan|オック語",
    ],
    1,
    "Fewer than one percent of the Swiss population speaks Romansh as a first language today, concentrated mainly in the canton of Graubünden, and the language itself splits into several distinct written varieties that a unified standard form has only partly managed to bridge.|Menos del uno por ciento de la población suiza habla romanche como primera lengua hoy en día, concentrada sobre todo en el cantón de los Grisones, y el idioma en sí se divide en varias variedades escritas distintas que una forma estándar unificada solo ha logrado unir en parte.|Moins d'un pour cent de la population suisse parle aujourd'hui le romanche comme langue première, concentrée surtout dans le canton des Grisons, et la langue elle-même se divise en plusieurs variétés écrites distinctes qu'une forme standard unifiée n'est parvenue à rapprocher que partiellement.|現在スイスでロマンシュ語を第一言語とする人口は全体の1%に満たず、主にグラウビュンデン州に集中している。この言語自体もいくつかの異なる書き言葉の変種に分かれており、統一書式が作られてもそれを完全には橋渡しできていない。",
  ),
  q(
    7,
    "The United Kingdom joined the European Economic Community sixteen years after its founding by six other countries. In what year did the UK join?|El Reino Unido se unió a la Comunidad Económica Europea dieciséis años después de su fundación por otros seis países. ¿En qué año se unió el Reino Unido?|Le Royaume-Uni a rejoint la Communauté économique européenne seize ans après sa fondation par six autres pays. En quelle année le Royaume-Uni a-t-il adhéré ?|イギリスが、ほかの6か国によるヨーロッパ経済共同体(EEC)設立から16年遅れて加盟したのは何年か?",
    [
      "1979|1979|1979|1979年",
      "1963|1963|1963|1963年",
      "1973|1973|1973|1973年",
    ],
    2,
    "France's president Charles de Gaulle had vetoed UK membership twice in the 1960s, suspicious that Britain's close ties to the United States would make it an American proxy inside the bloc; only after de Gaulle left office did British entry finally go ahead.|El presidente francés Charles de Gaulle había vetado dos veces en la década de 1960 la adhesión del Reino Unido, receloso de que los estrechos lazos británicos con Estados Unidos lo convirtieran en un peón estadounidense dentro del bloque; solo después de que de Gaulle dejara el cargo se pudo por fin concretar la entrada británica.|Le président français Charles de Gaulle avait opposé son veto à deux reprises dans les années 1960 à l'adhésion du Royaume-Uni, soupçonnant que ses liens étroits avec les États-Unis en feraient un relais américain au sein du bloc ; ce n'est qu'après le départ de de Gaulle que l'entrée britannique put enfin aboutir.|フランスのシャルル・ド・ゴール大統領は1960年代に2度、イギリスの加盟に拒否権を行使していた。アメリカとの緊密な関係により、イギリスが域内でアメリカの代理人になることを警戒したためである。ド・ゴールが退任したあとになってようやくイギリスの加盟が実現した。",
  ),
  q(
    7,
    "Romania's currency is called the leu. What does the word \"leu\" literally mean in Romanian?|La moneda de Rumanía se llama leu. ¿Qué significa literalmente la palabra \"leu\" en rumano?|La monnaie de la Roumanie s'appelle le leu. Que signifie littéralement le mot \"leu\" en roumain ?|ルーマニアの通貨は「レウ」と呼ばれる。ルーマニア語で「レウ」とは文字どおり何を意味するか?",
    [
      "Lion|León|Lion|ライオン",
      "Eagle|Águila|Aigle|鷲",
      "Wolf|Lobo|Loup|狼",
    ],
    0,
    "The name harks back to Dutch \"lion dollar\" coins, stamped with a rampant lion, that once circulated widely in the region, and Romanians borrowed the term for their own currency even after those old coins had long fallen out of use.|El nombre remite a las monedas neerlandesas de \"dólar de león\", acuñadas con un león rampante, que en su día circularon ampliamente por la región, y los rumanos tomaron prestado el término para su propia moneda incluso mucho después de que esas viejas monedas dejaran de usarse.|Le nom renvoie aux pièces néerlandaises dites \"dollars au lion\", frappées d'un lion rampant, qui circulèrent autrefois largement dans la région, et les Roumains reprirent le terme pour leur propre monnaie bien après que ces vieilles pièces eurent cessé de circuler.|この名前は、かつてこの地域で広く流通していた、跳ね上がるライオンが刻まれたオランダの「ライオン・ダラー」銀貨に由来する。ルーマニア人は、その古い硬貨がとうに使われなくなったあとも、自国通貨の呼び名としてこの言葉を借り続けた。",
  ),
  q(
    7,
    "For over two centuries until the late 1700s, Poland and Lithuania were united as a single dual state. What was it called?|Durante más de dos siglos, hasta finales del siglo XVIII, Polonia y Lituania estuvieron unidas como un único estado dual. ¿Cómo se llamaba?|Pendant plus de deux siècles, jusqu'à la fin du XVIIIe siècle, la Pologne et la Lituanie furent unies en un seul État double. Comment s'appelait-il ?|18世紀後半まで2世紀以上にわたり、ポーランドとリトアニアはひとつの二重国家として統合されていた。この国家は何と呼ばれたか?",
    [
      "The Kingdom of Galicia|El Reino de Galitzia|Le royaume de Galicie|ガリツィア王国",
      "The Polish-Lithuanian Commonwealth|La Mancomunidad de Polonia y Lituania|La République des Deux Nations|ポーランド・リトアニア共和国",
      "The Duchy of Warsaw|El Ducado de Varsovia|Le duché de Varsovie|ワルシャワ公国",
    ],
    1,
    "At its height it was one of the largest and most populous states in Europe, with an unusually powerful nobility that elected the king and could legally block royal decisions, an arrangement that eventually left the state too weak to resist being carved up by its neighbours.|En su apogeo fue uno de los estados más grandes y poblados de Europa, con una nobleza inusualmente poderosa que elegía al rey y podía bloquear legalmente sus decisiones, un sistema que acabó dejando al estado demasiado débil para resistir su reparto entre los países vecinos.|À son apogée, ce fut l'un des États les plus vastes et les plus peuplés d'Europe, doté d'une noblesse inhabituellement puissante qui élisait le roi et pouvait légalement bloquer ses décisions, un système qui finit par laisser l'État trop faible pour résister à son démembrement par ses voisins.|最盛期にはヨーロッパでも屈指の広さと人口を誇る国家で、国王を選挙で選び、その決定を合法的に阻止できるという異例に強い権限を持つ貴族層があった。この仕組みはやがて国家を弱体化させ、近隣諸国による分割を防げなくなっていった。",
  ),
  q(
    7,
    "Bulgaria's flag has three horizontal bands of white, green and red. Which neighbouring country's flag uses the same three colours in reverse order — red, white and green?|La bandera de Bulgaria tiene tres franjas horizontales blancas, verdes y rojas. ¿Qué país vecino usa los mismos tres colores en orden inverso: rojo, blanco y verde?|Le drapeau bulgare comporte trois bandes horizontales blanche, verte et rouge. Quel pays voisin arbore les mêmes trois couleurs dans l'ordre inverse — rouge, blanc et vert ?|ブルガリアの国旗は白・緑・赤の横三色旗である。同じ3色を逆の順、赤・白・緑で使っている近隣国は?",
    [
      "Serbia|Serbia|La Serbie|セルビア",
      "Austria|Austria|L'Autriche|オーストリア",
      "Hungary|Hungría|La Hongrie|ハンガリー",
    ],
    2,
    "The two flags share nothing historically, since the colours arose from entirely separate national traditions, but the coincidence is close enough that flag reference books routinely warn readers not to confuse the two at a glance.|Las dos banderas no comparten nada históricamente, ya que los colores surgieron de tradiciones nacionales totalmente distintas, pero la coincidencia es lo bastante llamativa como para que los libros de referencia sobre banderas adviertan sistemáticamente que no se confundan a simple vista.|Les deux drapeaux ne partagent rien sur le plan historique, les couleurs étant issues de traditions nationales totalement distinctes, mais la coïncidence est suffisamment frappante pour que les ouvrages de référence sur les drapeaux mettent régulièrement en garde contre toute confusion au premier coup d'œil.|この2つの国旗は色の由来となった国の伝統がまったく別であり、歴史的なつながりは何もないが、あまりによく似ているため、旗の解説書ではひと目で見間違えないよう注意を促されることが多い。",
  ),
  q(
    7,
    "The Vistula and the Oder are the two longest rivers lying almost entirely within a single country. Which country?|El Vístula y el Óder son los dos ríos más largos que discurren casi enteramente dentro de un único país. ¿Cuál?|La Vistule et l'Oder sont les deux plus longs fleuves coulant presque entièrement à l'intérieur d'un seul pays. Lequel ?|ヴィスワ川とオーデル川は、そのほとんどを一国内だけで流れる川としてはヨーロッパで最も長い2本である。どこの国か?",
    [
      "Poland|Polonia|La Pologne|ポーランド",
      "Germany|Alemania|L'Allemagne|ドイツ",
      "Czechia|Chequia|La Tchéquie|チェコ",
    ],
    0,
    "The Oder does form part of the border with Germany for its lower stretch, but both rivers rise, and spend most of their length, inside Poland, draining nearly the entire country north into the Baltic Sea.|El Óder sí forma parte de la frontera con Alemania en su tramo inferior, pero ambos ríos nacen, y recorren la mayor parte de su curso, dentro de Polonia, drenando casi todo el país hacia el norte, hasta el mar Báltico.|L'Oder forme certes une partie de la frontière avec l'Allemagne sur son cours inférieur, mais les deux fleuves prennent leur source, et parcourent l'essentiel de leur cours, à l'intérieur de la Pologne, drainant vers le nord la quasi-totalité du pays jusqu'à la mer Baltique.|オーデル川は下流域でドイツとの国境の一部をなしているが、両河川とも水源はポーランド国内にあり、流路の大部分もポーランド国内を通って、国土のほぼ全体をバルト海へと北向きに排水している。",
  ),
  q(
    7,
    "Switzerland's official Latin name, still used in abbreviated form on its coins, stamps and internet domain (\".ch\"), is what?|El nombre oficial en latín de Suiza, aún usado de forma abreviada en sus monedas, sellos y dominio de internet (\".ch\"), ¿cuál es?|Le nom officiel latin de la Suisse, encore utilisé sous forme abrégée sur ses pièces, ses timbres et son domaine internet (\".ch\"), est quel ?|スイスの公式なラテン語名で、硬貨や切手、インターネットのドメイン(「.ch」)に略称のまま今も使われているのは?",
    [
      "Res Publica Helvetiae|Res Publica Helvetiae|Res Publica Helvetiae|レス・プブリカ・ヘルヴェティアエ",
      "Confoederatio Helvetica|Confoederatio Helvetica|Confoederatio Helvetica|コンフェデラティオ・ヘルヴェティカ",
      "Foederatio Alpina|Foederatio Alpina|Foederatio Alpina|フェデラティオ・アルピナ",
    ],
    1,
    "Because Switzerland has four official languages, using a neutral Latin name and abbreviation avoids favouring German, French, Italian or Romansh on national symbols, which is why the country's cars carry \"CH\" stickers instead of an abbreviation of any single language's name for it.|Como Suiza tiene cuatro lenguas oficiales, usar un nombre y una abreviatura neutrales en latín evita favorecer al alemán, al francés, al italiano o al romanche en los símbolos nacionales, razón por la cual los coches del país llevan la pegatina \"CH\" en vez de una abreviatura del nombre en cualquier lengua concreta.|La Suisse ayant quatre langues officielles, l'usage d'un nom et d'une abréviation latins neutres évite de favoriser l'allemand, le français, l'italien ou le romanche sur les symboles nationaux, raison pour laquelle les voitures du pays arborent l'autocollant \"CH\" plutôt qu'une abréviation du nom dans l'une des langues.|スイスには4つの公用語があるため、中立なラテン語名とその略称を使うことで、国の象徴においてドイツ語・フランス語・イタリア語・ロマンシュ語のいずれか一つを優遇することを避けている。これが、スイスの車に特定の言語での国名の略称ではなく「CH」のステッカーが貼られている理由である。",
  ),
  q(
    7,
    "Which Balkan country adopted the euro as its official currency in 2002, unilaterally and without being an EU member or having a formal monetary agreement?|¿Qué país balcánico adoptó el euro como moneda oficial en 2002, de forma unilateral y sin ser miembro de la UE ni tener un acuerdo monetario formal?|Quel pays des Balkans a adopté l'euro comme monnaie officielle en 2002, unilatéralement et sans être membre de l'UE ni disposer d'un accord monétaire formel ?|2002年に、EU非加盟かつ正式な通貨協定もないまま、一方的にユーロを法定通貨として採用したバルカン諸国はどこか?",
    [
      "Serbia|Serbia|La Serbie|セルビア",
      "North Macedonia|Macedonia del Norte|La Macédoine du Nord|北マケドニア",
      "Montenegro|Montenegro|Le Monténégro|モンテネグロ",
    ],
    2,
    "Montenegro had used the German mark before adopting the euro outright when the mark itself was phased out, a decision the European Central Bank has never formally endorsed but has also never forced the country to reverse.|Montenegro había usado el marco alemán antes de adoptar directamente el euro cuando el propio marco se retiró de la circulación, una decisión que el Banco Central Europeo nunca ha respaldado formalmente pero que tampoco ha obligado nunca a revertir.|Le Monténégro utilisait le mark allemand avant d'adopter purement et simplement l'euro lorsque le mark lui-même fut retiré de la circulation, une décision que la Banque centrale européenne n'a jamais formellement entérinée mais qu'elle n'a jamais non plus contraint le pays à annuler.|モンテネグロはそれ以前、ドイツマルクを使用していたが、マルク自体が廃止されるのに伴ってそのままユーロを採用した。この決定を欧州中央銀行が正式に承認したことは一度もないが、撤回を強制したこともない。",
  ),
  q(
    6,
    "\"Benelux,\" a term for a close economic union, is an acronym combining the names of which three countries?|\"Benelux\", un término para una estrecha unión económica, ¿es un acrónimo que combina los nombres de qué tres países?|\"Benelux\", terme désignant une union économique étroite, est un acronyme combinant les noms de quels trois pays ?|緊密な経済同盟を指す「ベネルクス」という言葉は、どの3か国の名前を組み合わせた頭字語か?",
    [
      "Belgium, the Netherlands and Luxembourg|Bélgica, los Países Bajos y Luxemburgo|La Belgique, les Pays-Bas et le Luxembourg|ベルギー・オランダ・ルクセンブルク",
      "Belgium, Norway and Luxembourg|Bélgica, Noruega y Luxemburgo|La Belgique, la Norvège et le Luxembourg|ベルギー・ノルウェー・ルクセンブルク",
      "Bulgaria, the Netherlands and Luxembourg|Bulgaria, los Países Bajos y Luxemburgo|La Bulgarie, les Pays-Bas et le Luxembourg|ブルガリア・オランダ・ルクセンブルク",
    ],
    0,
    "The three countries began coordinating customs policy even before the Second World War had fully ended, and their partnership is often cited as an early blueprint for the wider economic cooperation that eventually grew into the European Union.|Los tres países comenzaron a coordinar su política aduanera incluso antes de que terminara del todo la Segunda Guerra Mundial, y su asociación se cita a menudo como un modelo temprano de la cooperación económica más amplia que acabó convirtiéndose en la Unión Europea.|Les trois pays commencèrent à coordonner leur politique douanière avant même la fin complète de la Seconde Guerre mondiale, et leur association est souvent citée comme un modèle précoce de la coopération économique plus large qui finit par donner naissance à l'Union européenne.|3か国は第二次世界大戦が完全に終わる前から関税政策の調整を始めており、その協力関係は、のちに欧州連合へと発展する、より広い経済協力の早い時期の手本としてしばしば引き合いに出される。",
  ),
  q(
    6,
    "Spain and Portugal together occupy which large peninsula in southwestern Europe?|España y Portugal ocupan juntos qué gran península del suroeste de Europa?|L'Espagne et le Portugal occupent ensemble quelle grande péninsule du sud-ouest de l'Europe ?|スペインとポルトガルが合わせて占めている、ヨーロッパ南西部の大きな半島は?",
    [
      "The Balkan Peninsula|La península balcánica|La péninsule balkanique|バルカン半島",
      "The Iberian Peninsula|La península ibérica|La péninsule ibérique|イベリア半島",
      "The Apennine Peninsula|La península itálica|La péninsule italienne|アペニン半島",
    ],
    1,
    "The peninsula is sealed off from the rest of the continent almost entirely by the Pyrenees mountains, a barrier tall and continuous enough that it shaped centuries of relatively separate political and linguistic development on the Iberian side.|La península queda casi completamente separada del resto del continente por los montes Pirineos, una barrera lo bastante alta y continua como para moldear siglos de desarrollo político y lingüístico relativamente independiente en el lado ibérico.|La péninsule est presque entièrement coupée du reste du continent par les Pyrénées, une barrière assez haute et continue pour avoir façonné des siècles de développement politique et linguistique relativement séparé du côté ibérique.|この半島は、ピレネー山脈によって大陸の他の部分からほぼ完全に隔てられている。この山脈は高く連続した障壁で、イベリア側では何世紀にもわたり比較的独自の政治的・言語的発展を形づくってきた。",
  ),
  q(
    6,
    "The Pyrenees mountains form a natural border between which two countries?|Los montes Pirineos forman una frontera natural entre qué dos países?|Les Pyrénées forment une frontière naturelle entre quels deux pays ?|ピレネー山脈が自然の国境をなしている2か国は?",
    [
      "France and Italy|Francia e Italia|La France et l'Italie|フランスとイタリア",
      "Spain and Portugal|España y Portugal|L'Espagne et le Portugal|スペインとポルトガル",
      "France and Spain|Francia y España|La France et l'Espagne|フランスとスペイン",
    ],
    2,
    "The tiny country of Andorra sits tucked entirely within the range itself, wedged between the two larger neighbours, and for centuries the high passes through the mountains were used as smuggling routes as much as travel routes.|El diminuto país de Andorra se encuentra encajado por completo dentro de la propia cordillera, entre los dos vecinos más grandes, y durante siglos los altos pasos de montaña se usaron tanto como rutas de contrabando como de viaje.|Le minuscule pays d'Andorre se trouve niché entièrement au sein même de la chaîne, coincé entre les deux voisins plus grands, et pendant des siècles les cols élevés ont servi autant de routes de contrebande que de voies de passage.|小さな国アンドラは、この山脈そのものの中に完全に収まる形で2つの大国に挟まれて存在している。何世紀ものあいだ、山脈を越える高い峠道は、旅の道であると同時に密輸の道としても使われてきた。",
  ),
  q(
    6,
    "Which country is by far the world's largest producer and exporter of tulip bulbs?|¿Qué país es, con diferencia, el mayor productor y exportador mundial de bulbos de tulipán?|Quel pays est de loin le plus grand producteur et exportateur mondial de bulbes de tulipes ?|チューリップの球根の生産・輸出量が世界で圧倒的に多い国は?",
    [
      "The Netherlands|Países Bajos|Les Pays-Bas|オランダ",
      "Turkey|Turquía|La Turquie|トルコ",
      "Belgium|Bélgica|La Belgique|ベルギー",
    ],
    0,
    "Tulips themselves actually originated in Central Asia and were introduced to Europe by way of the Ottoman Empire, but Dutch growers so thoroughly industrialised bulb production that the flower is now inseparable from the Netherlands in most people's minds.|Los tulipanes en realidad se originaron en Asia Central y llegaron a Europa a través del Imperio otomano, pero los cultivadores neerlandeses industrializaron tan a fondo la producción de bulbos que hoy la flor resulta inseparable de los Países Bajos en la mente de la mayoría.|Les tulipes sont en réalité originaires d'Asie centrale et furent introduites en Europe par l'intermédiaire de l'Empire ottoman, mais les producteurs néerlandais ont si bien industrialisé la production de bulbes que la fleur est aujourd'hui indissociable des Pays-Bas dans l'esprit de la plupart des gens.|チューリップ自体はもともと中央アジア原産で、オスマン帝国を経てヨーロッパに伝わったものだが、オランダの生産者が球根生産をあまりに徹底して工業化したため、今ではこの花はほとんどの人の頭の中でオランダと切り離せないものになっている。",
  ),
  q(
    6,
    "Luxembourg is one of the last countries in the world still headed by a monarch with which title, unique among today's sovereign states?|Luxemburgo es uno de los últimos países del mundo encabezados todavía por un monarca con qué título, único entre los estados soberanos actuales?|Le Luxembourg est l'un des derniers pays au monde encore dirigés par un monarque portant quel titre, unique parmi les États souverains actuels ?|ルクセンブルクは、現在の主権国家の中で唯一となる、どんな称号の君主を今も戴いている国か?",
    [
      "Archduke|Archiduque|Archiduc|大公(オーストリア系)",
      "Grand Duke|Gran Duque|Grand-duc|大公",
      "Prince-Elector|Príncipe elector|Prince-électeur|選帝侯",
    ],
    1,
    "Several European territories carried the grand-ducal title in past centuries, from Tuscany to Finland under the Russian tsar, but by the 21st century Luxembourg is the only state left where a reigning grand duke is still the actual head of state rather than a historical curiosity.|Varios territorios europeos llevaron el título de gran ducado en siglos pasados, desde la Toscana hasta Finlandia bajo el zar ruso, pero en el siglo XXI Luxemburgo es el único estado que queda donde un gran duque reinante sigue siendo el verdadero jefe de Estado y no una curiosidad histórica.|Plusieurs territoires européens portèrent le titre de grand-duché par le passé, de la Toscane à la Finlande sous le tsar russe, mais au XXIe siècle le Luxembourg est le seul État restant où un grand-duc régnant demeure véritablement chef de l'État plutôt qu'une curiosité historique.|かつてはトスカーナからロシア皇帝支配下のフィンランドまで、いくつものヨーロッパの領邦が大公の称号を名乗っていたが、21世紀に入り、在位する大公が単なる歴史上の呼び名ではなく実際の元首であり続けているのはルクセンブルクだけとなっている。",
  ),
  q(
    6,
    "Bucharest, the capital of Romania, was nicknamed \"Little Paris\" in the early 20th century mainly because of what?|A Bucarest, la capital de Rumanía, se la apodó \"la pequeña París\" a principios del siglo XX principalmente por qué?|Bucarest, la capitale de la Roumanie, fut surnommée \"le petit Paris\" au début du XXe siècle principalement pour quelle raison ?|ルーマニアの首都ブカレストが20世紀初頭に「小さなパリ」と呼ばれたのは、主に何が理由だったか?",
    [
      "A large population of French immigrants living there|Una gran población de inmigrantes franceses que vivía allí|Une importante population d'immigrants français y vivant|そこに暮らすフランス人移民の人口の多さ",
      "A full-size replica of the Eiffel Tower built downtown|Una réplica a tamaño real de la Torre Eiffel construida en el centro|Une réplique grandeur nature de la tour Eiffel construite en centre-ville|市中心部に建てられたエッフェル塔の実物大レプリカ",
      "Its grand boulevards and Belle Époque architecture|Sus grandes bulevares y su arquitectura de la Belle Époque|Ses grands boulevards et son architecture Belle Époque|壮大な大通りとベル・エポック様式の建築",
    ],
    2,
    "Romanian elites of the era studied heavily in Paris and brought French fashions, architecture and even city planning home with them, giving central Bucharest wide tree-lined avenues and ornate buildings that still draw the comparison today, even though much of that fabric was later damaged by earthquakes, war and Communist-era demolition.|Las élites rumanas de la época estudiaban intensamente en París y trajeron a su país la moda, la arquitectura e incluso el urbanismo franceses, lo que le dio al centro de Bucarest amplias avenidas arboladas y edificios ornamentados que todavía hoy suscitan la comparación, aunque buena parte de ese tejido urbano se dañó después por terremotos, la guerra y las demoliciones de la era comunista.|Les élites roumaines de l'époque étudiaient beaucoup à Paris et en rapportèrent la mode, l'architecture et jusqu'à l'urbanisme français, dotant le centre de Bucarest de larges avenues bordées d'arbres et de bâtiments ornés qui suscitent encore la comparaison aujourd'hui, même si une grande partie de ce tissu urbain fut ensuite endommagée par les tremblements de terre, la guerre et les démolitions de l'ère communiste.|当時のルーマニアの上流層はこぞってパリに留学し、フランス風の流行や建築、さらには都市計画までも自国に持ち帰った。そのおかげでブカレスト中心部には並木の大通りと装飾豊かな建物が生まれ、今もこの呼び名で語られる。ただしその街並みの多くは、その後の地震や戦争、共産主義時代の取り壊しで失われている。",
  ),
  q(
    6,
    "The word \"Balkan,\" giving its name to the whole Balkan Peninsula, comes from a Turkish word roughly meaning what?|La palabra \"Balcanes\", que da nombre a toda la península balcánica, ¿proviene de una palabra turca que significa aproximadamente qué?|Le mot \"Balkans\", qui donne son nom à toute la péninsule balkanique, vient d'un mot turc signifiant à peu près quoi ?|バルカン半島全体の名の由来となった「バルカン」という語は、おおよそ何を意味するトルコ語に由来するか?",
    [
      "Mountain|Montaña|Montagne|山",
      "River|Río|Rivière|川",
      "Forest|Bosque|Forêt|森",
    ],
    0,
    "The name was originally applied specifically to the Balkan Mountains running through modern Bulgaria, and only later expanded by geographers to cover the entire southeastern European peninsula, a usage many people living there today find imposed from outside rather than chosen.|El nombre se aplicó originalmente de forma específica a los montes Balcanes que atraviesan la actual Bulgaria, y solo más tarde los geógrafos lo ampliaron para abarcar toda la península del sureste de Europa, un uso que muchas personas que viven allí hoy consideran impuesto desde fuera más que elegido.|Le nom s'appliquait à l'origine spécifiquement aux monts Balkans traversant la Bulgarie actuelle, et ce n'est que plus tard que les géographes l'étendirent pour couvrir toute la péninsule du sud-est de l'Europe, un usage que beaucoup de ses habitants actuels jugent imposé de l'extérieur plutôt que choisi.|この名前はもともと、現在のブルガリアを貫くバルカン山脈だけを指す言葉だったが、のちに地理学者によって南東ヨーロッパ半島全体を指す名称に拡張された。今もそこに暮らす多くの人々は、この呼び方を自分たちで選んだというより外から押し付けられたものと感じている。",
  ),
  q(
    6,
    "Which European country's territory includes over a thousand islands along its Adriatic coast, though only a few dozen are permanently inhabited?|El territorio de qué país europeo incluye más de mil islas a lo largo de su costa adriática, ¿aunque solo unas pocas docenas están habitadas de forma permanente?|Le territoire de quel pays européen comprend plus d'un millier d'îles le long de sa côte adriatique, bien que seule une poignée de dizaines soient habitées en permanence ?|アドリア海沿岸に千を超える島々を領有しながら、常時人が住むのはそのうち数十にすぎない、そんなヨーロッパの国はどこか?",
    [
      "Greece|Grecia|La Grèce|ギリシャ",
      "Croatia|Croacia|La Croatie|クロアチア",
      "Italy|Italia|L'Italie|イタリア",
    ],
    1,
    "Most of the islands are small, rocky and uninhabited outcrops used mainly for grazing sheep or left entirely wild, while nearly all of the country's tourism and population concentrate on a much smaller number of larger islands closer to the mainland.|La mayoría de las islas son pequeños afloramientos rocosos y deshabitados, usados sobre todo para pastar ovejas o dejados totalmente silvestres, mientras que casi todo el turismo y la población del país se concentran en un número mucho menor de islas más grandes cercanas al continente.|La plupart des îles sont de petits affleurements rocheux et inhabités, utilisés surtout pour faire paître des moutons ou laissés entièrement à l'état sauvage, tandis que la quasi-totalité du tourisme et de la population du pays se concentrent sur un nombre bien plus restreint de grandes îles proches du continent.|島々の大半は小さく岩がちで無人の岩礁であり、羊の放牧に使われるか、まったくの手つかずのまま残されている。一方、国内の観光と人口のほとんどは、本土に近いはるかに少数の大きな島々に集中している。",
  ),
  q(
    5,
    "Vatican City, the world's smallest independent state, is entirely surrounded by which country?|La Ciudad del Vaticano, el estado independiente más pequeño del mundo, está rodeada por completo por qué país?|La Cité du Vatican, le plus petit État indépendant du monde, est entièrement entourée par quel pays ?|世界最小の独立国であるバチカン市国を、四方すべて取り囲んでいる国はどこか?",
    [
      "France|Francia|La France|フランス",
      "Switzerland|Suiza|La Suisse|スイス",
      "Italy|Italia|L'Italie|イタリア",
    ],
    2,
    "The entire state covers only about 44 hectares, small enough to walk across in well under an hour, and it relies on Italy for basics like water and much of its food supply.|Todo el estado ocupa solo unas 44 hectáreas, lo bastante pequeño como para cruzarlo a pie en bastante menos de una hora, y depende de Italia para necesidades básicas como el agua y buena parte de su suministro de alimentos.|L'État tout entier ne couvre qu'environ 44 hectares, assez petit pour être traversé à pied en bien moins d'une heure, et il dépend de l'Italie pour des besoins de base comme l'eau et une grande partie de son approvisionnement alimentaire.|国土全体の面積はわずか44haほどしかなく、歩いて1時間もかからずに横切れるほどの広さである。水道をはじめ食料の多くもイタリアに頼っている。",
  ),
  q(
    5,
    "Which narrow strait separates the island of Sicily from mainland Italy?|¿Qué estrecho angosto separa la isla de Sicilia de la Italia continental?|Quel détroit étroit sépare l'île de Sicile de l'Italie continentale ?|シチリア島とイタリア本土を隔てる狭い海峡は?",
    [
      "The Strait of Messina|El estrecho de Mesina|Le détroit de Messine|メッシーナ海峡",
      "The Strait of Gibraltar|El estrecho de Gibraltar|Le détroit de Gibraltar|ジブラルタル海峡",
      "The Strait of Bonifacio|El estrecho de Bonifacio|Le détroit de Bonifacio|ボニファシオ海峡",
    ],
    0,
    "At its narrowest the strait is only about 3 kilometres wide, close enough that a bridge across it has been proposed and shelved repeatedly over the decades, most recently still under discussion without ever breaking ground.|En su punto más estrecho, el estrecho mide solo unos 3 kilómetros de ancho, lo bastante cerca como para que se haya propuesto y aplazado repetidamente un puente a lo largo de las décadas, todavía en discusión en la actualidad sin que las obras hayan llegado a comenzar.|À son point le plus étroit, le détroit ne mesure qu'environ 3 kilomètres de large, assez proche pour qu'un pont ait été proposé et abandonné à plusieurs reprises au fil des décennies, encore en discussion aujourd'hui sans que les travaux aient jamais commencé.|最も狭い場所ではわずか3kmほどしかなく、数十年にわたって橋の建設が繰り返し提案されては棚上げにされてきた。現在も議論は続いているが、いまだ着工には至っていない。",
  ),
  q(
    5,
    "Prague's Old Town Square is famous for a medieval astronomical clock that still performs an hourly show. What is this clock generally known as?|La Plaza de la Ciudad Vieja de Praga es famosa por un reloj astronómico medieval que todavía ofrece un espectáculo cada hora. ¿Cómo se conoce generalmente a este reloj?|La place de la Vieille-Ville de Prague est célèbre pour une horloge astronomique médiévale qui offre encore un spectacle chaque heure. Comment cette horloge est-elle généralement connue ?|プラハの旧市街広場は、今も毎時ショーを見せる中世の天文時計で有名である。この時計は一般に何と呼ばれているか?",
    [
      "The Prague Zeitwerk|El Zeitwerk de Praga|Le Zeitwerk de Prague|プラハのツァイトヴェルク",
      "The Prague Orloj|El Orloj de Praga|L'Horloge astronomique de Prague (Orloj)|プラハの天文時計(オルロイ)",
      "The Golden Gate Clock|El Reloj de la Puerta Dorada|L'Horloge de la Porte dorée|黄金の門の時計",
    ],
    1,
    "First installed in 1410, it is the oldest astronomical clock in the world still working, and every hour a small parade of carved wooden figures, including a skeleton representing death, appears above the clock face to mark the time.|Instalado por primera vez en 1410, es el reloj astronómico más antiguo del mundo que todavía funciona, y cada hora un pequeño desfile de figuras de madera talladas, entre ellas un esqueleto que representa a la muerte, aparece sobre la esfera del reloj para marcar la hora.|Installée pour la première fois en 1410, c'est la plus ancienne horloge astronomique du monde encore en fonctionnement, et chaque heure, un petit défilé de figures de bois sculptées, dont un squelette représentant la mort, apparaît au-dessus du cadran pour marquer l'heure.|1410年に設置されたこの時計は、今も動いている世界最古の天文時計である。毎正時、死を表す骸骨を含む木彫りの人形の小さな行列が文字盤の上に現れて時を告げる。",
  ),
  q(
    5,
    "The Apulia region of southern Italy is famous for whitewashed, cone-roofed traditional houses found especially around the town of Alberobello. What are these houses called?|La región de Apulia, en el sur de Italia, es famosa por las casas tradicionales encaladas y de tejado cónico que se encuentran sobre todo cerca de la localidad de Alberobello. ¿Cómo se llaman estas casas?|La région des Pouilles, dans le sud de l'Italie, est réputée pour ses maisons traditionnelles blanchies à la chaux et à toit conique, que l'on trouve surtout autour de la ville d'Alberobello. Comment appelle-t-on ces maisons ?|イタリア南部プーリア州は、特にアルベロベッロの町周辺に見られる白壁と円錐屋根の伝統家屋で有名である。この家屋は何と呼ばれるか?",
    [
      "Bastides|Bastides|Bastides|バスティード",
      "Palafittes|Palafitos|Palafittes|パラフィット",
      "Trulli|Trulli|Trulli|トゥルッリ",
    ],
    2,
    "The distinctive dry-stone construction, built without mortar, made the roofs quick to dismantle, and legend holds that this let farmers demolish their homes on short notice to dodge a tax that was assessed on completed, permanent buildings.|La característica construcción de piedra en seco, hecha sin mortero, permitía desmontar los tejados con rapidez, y la leyenda dice que esto dejaba a los campesinos derribar sus casas con poco aviso para eludir un impuesto que se aplicaba a las edificaciones permanentes ya terminadas.|La construction caractéristique en pierre sèche, sans mortier, permettait de démonter rapidement les toits, et la légende veut que cela ait permis aux paysans de démolir leur maison à bref délai pour échapper à une taxe appliquée aux constructions permanentes achevées.|モルタルを使わない特徴的な空積み工法のため、屋根はすぐに取り壊せた。伝説によれば、これにより農民は完成した恒久建築に課される税を逃れるため、短時間で家を取り壊すことができたという。",
  ),
  q(
    5,
    "Which country's parliament, dating in unbroken form to the 13th century, is called the Storting?|El parlamento de qué país, con una existencia ininterrumpida que se remonta al siglo XIII, se llama Storting?|Le parlement de quel pays, dont l'existence ininterrompue remonte au XIIIe siècle, s'appelle le Storting ?|13世紀にまでさかのぼる連続した歴史を持つ議会が「ストーティング」と呼ばれているのはどこの国か?",
    [
      "Norway|Noruega|La Norvège|ノルウェー",
      "Sweden|Suecia|La Suède|スウェーデン",
      "Denmark|Dinamarca|Le Danemark|デンマーク",
    ],
    0,
    "The name simply means \"great assembly\" in Norwegian, and although the modern constitutional parliament dates only to 1814, Norwegian tradition traces the idea of a representative assembly back to regional Viking-age thing gatherings held centuries earlier.|El nombre significa simplemente \"gran asamblea\" en noruego, y aunque el parlamento constitucional moderno data solo de 1814, la tradición noruega remonta la idea de una asamblea representativa a las reuniones regionales de la era vikinga, celebradas siglos antes.|Le nom signifie simplement \"grande assemblée\" en norvégien, et bien que le parlement constitutionnel moderne ne date que de 1814, la tradition norvégienne fait remonter l'idée d'une assemblée représentative aux réunions régionales de l'ère viking, tenues des siècles plus tôt.|この名前はノルウェー語で単に「大きな集会」を意味する。近代の立憲議会自体は1814年に成立したものにすぎないが、ノルウェーの伝統では代表による集会という発想を、何世紀も前のヴァイキング時代の地域集会「ティング」にまでさかのぼらせている。",
  ),
  q(
    5,
    "Budapest, split by the Danube, was formed in 1873 by merging Buda, Óbuda and which town on the opposite bank?|Budapest, dividida por el Danubio, se formó en 1873 al fusionarse Buda, Óbuda y qué localidad en la orilla opuesta?|Budapest, séparée par le Danube, fut formée en 1873 par la fusion de Buda, d'Óbuda et de quelle ville sur la rive opposée ?|ドナウ川によって隔てられたブダペストは、1873年にブダ・オーブダと、対岸のどの町が合併して形づくられたか?",
    [
      "Győr|Győr|Győr|ジェール",
      "Pest|Pest|Pest|ペシュト",
      "Szeged|Szeged|Szeged|セゲド",
    ],
    1,
    "Before the merger, the two banks had grown into rivals of a kind, with the flat eastern side becoming a commercial and administrative hub while the hilly western side kept more of the older royal and castle district.|Antes de la fusión, las dos orillas se habían convertido en una especie de rivales, con el lado oriental llano convirtiéndose en un centro comercial y administrativo, mientras que el lado occidental, montañoso, conservaba más el antiguo barrio real y del castillo.|Avant la fusion, les deux rives étaient devenues en quelque sorte rivales, le côté oriental plat se transformant en pôle commercial et administratif tandis que le côté occidental, vallonné, conservait davantage l'ancien quartier royal et du château.|合併以前、この2つの岸はある種のライバル関係にあり、平坦な東岸は商業と行政の中心地となっていく一方、丘の多い西岸はより古い王宮・城の地区の面影を残していた。",
  ),
  q(
    4,
    "Which mountain range runs the length of the Italian peninsula, forming its geographic spine?|¿Qué cordillera recorre toda la longitud de la península italiana, formando su columna vertebral geográfica?|Quelle chaîne de montagnes parcourt toute la longueur de la péninsule italienne, formant son épine dorsale géographique ?|イタリア半島を縦断し、その地理的な背骨をなしている山脈は?",
    [
      "The Dolomites|Los Dolomitas|Les Dolomites|ドロミーティ山塊",
      "The Alps|Los Alpes|Les Alpes|アルプス山脈",
      "The Apennines|Los Apeninos|Les Apennins|アペニン山脈",
    ],
    2,
    "Unlike the Alps, which form a wall along Italy's northern border, the Apennines run down the centre of the peninsula almost from top to bottom, which is why so many Italian towns sit on hilltops rather than in flat river valleys.|A diferencia de los Alpes, que forman una muralla a lo largo de la frontera norte de Italia, los Apeninos recorren el centro de la península de arriba abajo casi por completo, razón por la cual tantos pueblos italianos se asientan en cimas de colinas en vez de en valles fluviales llanos.|Contrairement aux Alpes, qui forment un mur le long de la frontière nord de l'Italie, les Apennins parcourent le centre de la péninsule de haut en bas presque intégralement, ce qui explique pourquoi tant de villes italiennes se dressent au sommet de collines plutôt que dans des vallées fluviales plates.|イタリア北部の国境沿いに壁のようにそびえるアルプス山脈とは違い、アペニン山脈は半島の中央をほぼ端から端まで縦断している。これが、多くのイタリアの町が平坦な川の谷ではなく丘の上に立地している理由の一つである。",
  ),
  q(
    4,
    "Which of these countries does the Rhine river NOT flow through?|¿Por cuál de estos países NO pasa el río Rin?|Lequel de ces pays le Rhin ne traverse-t-il PAS ?|ライン川が流れていない国は次のうちどれか?",
    [
      "Spain|España|L'Espagne|スペイン",
      "France|Francia|La France|フランス",
      "The Netherlands|Países Bajos|Les Pays-Bas|オランダ",
    ],
    0,
    "The Rhine rises in Switzerland and passes through or along the border of Austria, Liechtenstein, Germany, France and the Netherlands before reaching the North Sea, a route that touches six countries without ever coming near the Iberian Peninsula.|El Rin nace en Suiza y pasa por Austria, Liechtenstein, Alemania, Francia y los Países Bajos, o bordea sus fronteras, antes de llegar al mar del Norte, una ruta que toca seis países sin acercarse nunca a la península ibérica.|Le Rhin prend sa source en Suisse et traverse ou longe la frontière de l'Autriche, du Liechtenstein, de l'Allemagne, de la France et des Pays-Bas avant d'atteindre la mer du Nord, un parcours qui touche six pays sans jamais s'approcher de la péninsule ibérique.|ライン川はスイスに源を発し、オーストリア・リヒテンシュタイン・ドイツ・フランス・オランダを通るか国境沿いを流れて北海に至る。この流路は6か国に接するが、イベリア半島には一度も近づかない。",
  ),
  q(
    4,
    "The euro currency symbol (€) was designed with reference to which letter of the Greek alphabet?|El símbolo de la moneda euro (€) se diseñó tomando como referencia qué letra del alfabeto griego?|Le symbole de la monnaie euro (€) a été conçu en référence à quelle lettre de l'alphabet grec ?|ユーロ通貨記号(€)のデザインの元になったギリシャ文字は?",
    [
      "Omega|Omega|Oméga|オメガ",
      "Epsilon|Épsilon|Epsilon|イプシロン",
      "Sigma|Sigma|Sigma|シグマ",
    ],
    1,
    "The symbol's designers wanted a letter that nodded to Greece as the cradle of European civilisation, and they added two parallel horizontal lines across it to represent stability, a detail deliberately echoing the crossbars on the dollar and yen signs.|Los diseñadores del símbolo querían una letra que rindiera homenaje a Grecia como cuna de la civilización europea, y le añadieron dos líneas horizontales paralelas para representar la estabilidad, un detalle que deliberadamente hacía eco de las barras transversales de los símbolos del dólar y el yen.|Les concepteurs du symbole voulaient une lettre rendant hommage à la Grèce comme berceau de la civilisation européenne, et ils y ajoutèrent deux lignes horizontales parallèles pour représenter la stabilité, un détail faisant délibérément écho aux barres transversales des symboles du dollar et du yen.|この記号のデザイナーは、ヨーロッパ文明の揺りかごであるギリシャにちなんだ文字を求め、安定性を表す2本の平行な横線を加えた。これはドル記号や円記号の横線を意識的に踏まえた工夫である。",
  ),
  q(
    4,
    "Which EU institution holds the sole right to formally propose new EU-wide legislation, a power no other EU body has?|¿Qué institución de la UE tiene el derecho exclusivo de proponer formalmente nueva legislación a escala de toda la UE, un poder que ningún otro órgano de la UE posee?|Quelle institution de l'UE détient le droit exclusif de proposer formellement une nouvelle législation à l'échelle de l'UE, un pouvoir qu'aucun autre organe de l'UE ne possède ?|EU全域の新しい法案を正式に提案できる権限を独占的に持つ、他のどのEU機関も持たない権限を有する機関は?",
    [
      "The European Parliament|El Parlamento Europeo|Le Parlement européen|欧州議会",
      "The Council of the European Union|El Consejo de la Unión Europea|Le Conseil de l'Union européenne|欧州連合理事会",
      "The European Commission|La Comisión Europea|La Commission européenne|欧州委員会",
    ],
    2,
    "This arrangement, often called the Commission's \"right of initiative,\" means the directly elected Parliament can amend or reject proposed laws but generally cannot introduce brand-new ones on its own, a design meant to keep proposals coming from a body seen as representing the collective EU interest rather than any single national government.|Este mecanismo, a menudo llamado el \"derecho de iniciativa\" de la Comisión, significa que el Parlamento, elegido directamente, puede modificar o rechazar las leyes propuestas, pero por lo general no puede presentar otras completamente nuevas por su cuenta, un diseño pensado para que las propuestas partan de un órgano visto como representante del interés colectivo de la UE y no de un solo gobierno nacional.|Ce mécanisme, souvent appelé le \"droit d'initiative\" de la Commission, signifie que le Parlement, élu au suffrage direct, peut amender ou rejeter les lois proposées mais ne peut généralement pas en introduire de toutes nouvelles de sa propre initiative, une conception destinée à faire venir les propositions d'un organe perçu comme représentant l'intérêt collectif de l'UE plutôt qu'un seul gouvernement national.|この仕組みはしばしば欧州委員会の「発議権」と呼ばれ、直接選挙で選ばれる欧州議会は提案された法案を修正・否決できても、原則として自ら新しい法案を一から提出することはできない。これは、提案の出どころを、特定の一国の政府ではなくEU全体の利益を代表するとみなされる機関に絞るための設計である。",
  ),
  q(
    4,
    "What is the capital of Greece?|¿Cuál es la capital de Grecia?|Quelle est la capitale de la Grèce ?|ギリシャの首都は?",
    [
      "Athens|Atenas|Athènes|アテネ",
      "Thessaloniki|Salónica|Thessalonique|テッサロニキ",
      "Patras|Patras|Patras|パトラ",
    ],
    0,
    "Athens gave its name to a whole political idea, direct democracy, from assemblies held there roughly 2,500 years ago, though only a small fraction of the city's residents at the time, adult male citizens, were actually allowed to take part in the voting.|Atenas dio nombre a toda una idea política, la democracia directa, gracias a las asambleas celebradas allí hace unos 2.500 años, aunque solo una pequeña fracción de los residentes de la ciudad de aquel entonces, los ciudadanos varones adultos, podía realmente participar en las votaciones.|Athènes a donné son nom à toute une idée politique, la démocratie directe, grâce aux assemblées qui s'y tenaient il y a environ 2 500 ans, bien que seule une petite fraction des habitants de la ville à l'époque, les citoyens de sexe masculin adultes, ait réellement pu participer aux votes.|アテネは、およそ2500年前にそこで開かれた民会にちなんで、直接民主政という政治思想そのものに名を与えた都市である。もっとも、当時の住民のうち実際に投票へ参加できたのは成人男性市民というごく一部にすぎなかった。",
  ),
  q(
    4,
    "Which country uses the Swiss franc as its legal tender despite not being part of Switzerland?|¿Qué país usa el franco suizo como moneda de curso legal a pesar de no formar parte de Suiza?|Quel pays utilise le franc suisse comme monnaie ayant cours légal bien qu'il ne fasse pas partie de la Suisse ?|スイスの一部ではないにもかかわらず、スイスフランを法定通貨として使っている国は?",
    [
      "Austria|Austria|L'Autriche|オーストリア",
      "Liechtenstein|Liechtenstein|Le Liechtenstein|リヒテンシュタイン",
      "Monaco|Mónaco|Monaco|モナコ",
    ],
    1,
    "Liechtenstein has never issued its own currency in modern times, joining a currency union with Switzerland in 1924, and the two countries also share a customs union, so goods move between them without any border checks at all.|Liechtenstein nunca ha emitido su propia moneda en la época moderna, y se unió a una unión monetaria con Suiza en 1924; los dos países también comparten una unión aduanera, así que las mercancías se mueven entre ellos sin ningún control fronterizo.|Le Liechtenstein n'a jamais émis sa propre monnaie à l'époque moderne, ayant rejoint une union monétaire avec la Suisse en 1924, et les deux pays partagent aussi une union douanière, si bien que les marchandises circulent entre eux sans aucun contrôle frontalier.|リヒテンシュタインは近代に入ってから独自の通貨を発行したことがなく、1924年にスイスとの通貨同盟に加わった。両国は関税同盟も結んでおり、両国間の物品移動には国境検査がまったくない。",
  ),
  q(
    3,
    "Which is the largest country in the European Union by land area?|¿Cuál es el país más grande de la Unión Europea por superficie terrestre?|Quel est le plus grand pays de l'Union européenne par superficie ?|面積が最も大きいEU加盟国はどこか?",
    [
      "Germany|Alemania|L'Allemagne|ドイツ",
      "Poland|Polonia|La Pologne|ポーランド",
      "France|Francia|La France|フランス",
    ],
    2,
    "France's overseas territories, from Caribbean islands to French Guiana in South America, are not counted here, since this is about the size of its metropolitan territory within Europe alongside the other EU member states.|Los territorios de ultramar de Francia, desde islas del Caribe hasta la Guayana Francesa en Sudamérica, no se cuentan aquí, ya que se trata del tamaño de su territorio metropolitano dentro de Europa junto a los demás estados miembros de la UE.|Les territoires d'outre-mer de la France, des îles des Caraïbes à la Guyane en Amérique du Sud, ne sont pas comptés ici, puisqu'il s'agit de la taille de son territoire métropolitain en Europe aux côtés des autres États membres de l'UE.|カリブ海の島々から南米のフランス領ギアナまで、フランスの海外領土はここには含まれていない。あくまでヨーロッパ内の本土部分の広さを、他のEU加盟国と比べた場合の話である。",
  ),
  q(
    3,
    "The Faroe Islands, between Iceland and Norway, lie in which ocean?|Las islas Feroe, entre Islandia y Noruega, ¿en qué océano se encuentran?|Les îles Féroé, entre l'Islande et la Norvège, se trouvent dans quel océan ?|アイスランドとノルウェーのあいだにあるフェロー諸島は、どの海に位置するか?",
    [
      "The North Atlantic Ocean|El océano Atlántico Norte|L'océan Atlantique Nord|北大西洋",
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海",
    ],
    0,
    "Constant winds and ocean currents sweeping in off the open Atlantic keep the islands' weather famously changeable, with locals often joking that all four seasons can pass through in a single afternoon.|Los vientos constantes y las corrientes oceánicas que llegan desde el Atlántico abierto mantienen el tiempo de las islas famoso por su carácter cambiante, y los lugareños suelen bromear diciendo que las cuatro estaciones pueden pasar en una sola tarde.|Les vents constants et les courants océaniques venus de l'Atlantique ouvert rendent le temps des îles réputé pour son caractère changeant, les habitants plaisantant souvent en disant que les quatre saisons peuvent se succéder en une seule après-midi.|外洋の大西洋から吹きつける絶え間ない風と海流のせいで、この島々の天気は変わりやすいことで知られている。地元の人々は「たった一日の午後に四季が巡る」とよく冗談を言う。",
  ),
  q(
    3,
    "Which of these countries is NOT a member of the European Union?|¿Cuál de estos países NO es miembro de la Unión Europea?|Lequel de ces pays n'est PAS membre de l'Union européenne ?|次のうちEUに加盟していない国はどれか?",
    [
      "France|Francia|La France|フランス",
      "Norway|Noruega|La Norvège|ノルウェー",
      "Germany|Alemania|L'Allemagne|ドイツ",
    ],
    1,
    "Norwegian voters have rejected EU membership twice in referendums, in 1972 and again in 1994, and the country instead participates in the EU's single market through a separate agreement covering most of the European Economic Area.|Los votantes noruegos han rechazado la adhesión a la UE dos veces en referéndums, en 1972 y de nuevo en 1994, y el país participa en cambio en el mercado único de la UE a través de un acuerdo aparte que cubre la mayor parte del Espacio Económico Europeo.|Les électeurs norvégiens ont rejeté l'adhésion à l'UE à deux reprises lors de référendums, en 1972 puis en 1994, et le pays participe à la place au marché unique de l'UE via un accord distinct couvrant l'essentiel de l'Espace économique européen.|ノルウェーの有権者は1972年と1994年の2度、国民投票でEU加盟を否決した。同国は代わりに、欧州経済領域の大部分を対象とする別の協定を通じてEUの単一市場に参加している。",
  ),
  q(
    2,
    "What is the official language of France?|¿Cuál es el idioma oficial de Francia?|Quelle est la langue officielle de la France ?|フランスの公用語は?",
    [
      "Spanish|Español|L'espagnol|スペイン語",
      "Italian|Italiano|L'italien|イタリア語",
      "French|Francés|Le français|フランス語",
    ],
    2,
    "French is also an official language in dozens of other countries around the world, a legacy of French colonial history, and it remains one of the two working languages, alongside English, of most major international organisations.|El francés también es idioma oficial en decenas de otros países del mundo, un legado de la historia colonial francesa, y sigue siendo una de las dos lenguas de trabajo, junto al inglés, de la mayoría de las grandes organizaciones internacionales.|Le français est aussi langue officielle dans des dizaines d'autres pays à travers le monde, un héritage de l'histoire coloniale française, et il reste l'une des deux langues de travail, aux côtés de l'anglais, de la plupart des grandes organisations internationales.|フランス語は、フランスの植民地時代の名残として、世界中の数十か国でも公用語となっている。今も英語と並んで、主要な国際機関の大半で公式作業言語の一つとされている。",
  ),
  q(
    2,
    "Which of these is a country located in Europe?|¿Cuál de estos es un país ubicado en Europa?|Lequel de ces pays est situé en Europe ?|次のうちヨーロッパにある国はどれか?",
    [
      "Poland|Polonia|La Pologne|ポーランド",
      "Brazil|Brasil|Le Brésil|ブラジル",
      "Egypt|Egipto|L'Égypte|エジプト",
    ],
    0,
    "Poland sits at the heart of the North European Plain, a flat stretch of land with no major mountain barriers on its eastern or western sides, which is part of why armies have crossed it so many times throughout history.|Polonia se encuentra en el corazón de la llanura del norte de Europa, una franja de tierra llana sin grandes barreras montañosas en sus flancos oriental y occidental, lo que en parte explica por qué los ejércitos la han cruzado tantas veces a lo largo de la historia.|La Pologne se trouve au cœur de la plaine d'Europe du Nord, une étendue de terre plate sans grandes barrières montagneuses sur ses flancs est et ouest, ce qui explique en partie pourquoi des armées l'ont traversée si souvent au fil de l'histoire.|ポーランドは北ヨーロッパ平原の中心に位置し、東西いずれの側にも大きな山の障壁がない平坦な土地が広がる。これも、歴史を通じて幾度も軍隊がこの地を通り抜けてきた理由の一つである。",
  ),
  q(
    2,
    "What is the name of the iron tower built in Paris for the 1889 World's Fair?|¿Cómo se llama la torre de hierro construida en París para la Exposición Universal de 1889?|Comment s'appelle la tour de fer construite à Paris pour l'Exposition universelle de 1889 ?|1889年の万国博覧会のためにパリに建てられた鉄塔の名前は?",
    [
      "The Tower of London|La Torre de Londres|La tour de Londres|ロンドン塔",
      "The Eiffel Tower|La Torre Eiffel|La tour Eiffel|エッフェル塔",
      "The Leaning Tower|La Torre Inclinada|La tour penchée|斜塔",
    ],
    1,
    "Many Parisians disliked the tower's design at first and expected it to be torn down after twenty years, but it was kept standing because it proved useful for early radio transmission experiments, which ended up saving it from demolition.|Muchos parisinos rechazaron al principio el diseño de la torre y esperaban que se derribara pasados veinte años, pero se mantuvo en pie porque resultó útil para los primeros experimentos de transmisión de radio, lo que acabó salvándola de la demolición.|Beaucoup de Parisiens détestèrent d'abord le design de la tour et s'attendaient à ce qu'elle soit démolie au bout de vingt ans, mais elle fut maintenue debout parce qu'elle se révéla utile pour les premières expériences de transmission radio, ce qui finit par la sauver de la démolition.|多くのパリ市民は当初この塔のデザインを嫌い、20年後には取り壊されると思っていたが、初期の無線通信実験に役立つことがわかったため取り壊しを免れ、そのまま残ることになった。",
  ),
  q(
    1,
    "Which city is the capital of Germany?|¿Qué ciudad es la capital de Alemania?|Quelle ville est la capitale de l'Allemagne ?|ドイツの首都はどこか?",
    [
      "Munich|Múnich|Munich|ミュンヘン",
      "Hamburg|Hamburgo|Hambourg|ハンブルク",
      "Berlin|Berlín|Berlin|ベルリン",
    ],
    2,
    "Berlin only regained its status as the seat of a united German government in 1990, after decades as a divided city split between East and West during the Cold War.|Berlín solo recuperó su estatus como sede de un gobierno alemán unificado en 1990, tras décadas como ciudad dividida entre el Este y el Oeste durante la Guerra Fría.|Berlin ne retrouva son statut de siège d'un gouvernement allemand unifié qu'en 1990, après des décennies en tant que ville divisée entre l'Est et l'Ouest durant la guerre froide.|ベルリンが統一ドイツ政府の所在地としての地位を取り戻したのは1990年のことで、それまで冷戦期の数十年間、東西に分断された都市だった。",
  ),
  q(
    1,
    "Which ocean lies along the western edge of Europe?|¿Qué océano se encuentra en el borde occidental de Europa?|Quel océan borde le côté ouest de l'Europe ?|ヨーロッパの西の縁に広がっている海は?",
    [
      "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋",
      "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋",
      "The Indian Ocean|El océano Índico|L'océan Indien|インド洋",
    ],
    0,
    "Countries facing this ocean, from Portugal and Spain to Ireland and Norway, historically became launching points for transatlantic exploration and trade, since the ocean offered the most direct sea route toward the Americas.|Los países que dan a este océano, desde Portugal y España hasta Irlanda y Noruega, se convirtieron históricamente en puntos de partida para la exploración y el comercio transatlántico, ya que el océano ofrecía la ruta marítima más directa hacia América.|Les pays donnant sur cet océan, du Portugal et de l'Espagne à l'Irlande et à la Norvège, sont historiquement devenus des points de départ pour l'exploration et le commerce transatlantiques, cet océan offrant la route maritime la plus directe vers les Amériques.|ポルトガルやスペインからアイルランド、ノルウェーまで、この海に面する国々は、アメリカ大陸への最も直接的な航路を提供したことから、歴史的に大西洋横断の探検や交易の出発点となってきた。",
  ),
];
