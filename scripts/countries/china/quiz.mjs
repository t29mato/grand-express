/**
 * 中国のクイズ(103問。当初42問 + 2026-08-14の増量分61問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 増量分61問の内訳: 難易度1〜3が16問、4〜6が19問、7〜8が16問、9〜10が10問。
 * 合計では 1〜3=29問・4〜6=39問・7=13問・8=13問・9=8問・10=6問(7以上36問・
 * 9以上14問)。asia盤面が扱うシルクロード・国境をまたぐ鉄道・季節風は避け、
 * 国内の地理(黄土高原・秦嶺淮河線・南嶺・三峡・南水北調)、暦と行事(二十四節気・
 * 春運)、鉄道(青蔵鉄道・京滬高速鉄道)、言語と文字(拼音・簡体字/繁体字・
 * 広東語/閩語・ウイグル文字・イ文字・康熙字典)、王朝と制度(科挙・秦の度量衡
 * 統一・宋代の火薬兵器)、単位(市斤・畝)を中心に足した。チベット・新疆に
 * 関わる問いは、鉄道の高度や文字の種類など事実として確かめられるものに限り、
 * 領有権に触れるものは作っていない。
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(48件)が扱う具体的な事実(紫禁城の造営・兵馬俑・パンダ基地・
 * 麗江のトンパ文字・敦煌の蔵書など)はここでは問わない。代わりに、
 * 国全体の地理・歴史・言語・食・現代文化など、**都市カードが触れていない
 * 主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs china
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること
 * (取りまとめ側で抽出したのち)。ここでは同じ検査を直接 china/ の
 * ソースに対して行う手作りの検査スクリプトで代用して確かめてある
 * (答えの漏れ0件・欠け0件を確認済み。増量分61問は日本語文に英字を混ぜて
 * いないため、`ACCEPTED` への追記は不要)。
 *
 * 選択肢は3つ。正解の位置(`a`)は当初の42問が0/1/2で各14問。増量分61問は
 * 書く順に0→1→2→…と割り当て、21/20/20問。合計は35/34/34問で均等に近い。
 *
 * ## 言語混入の判定除外について(要・REGISTER.md 転記、当初42問の分)
 *
 * 手作り検査で3件、日本語文に英字が混じると出るが、いずれも**原語そのものが
 * 問いの中身**であるため意図的(フランスの「TGVとは」「denim(デニム)」と同じ
 * 扱い)。取りまとめ時に `scripts/check-quiz.mjs` の `ACCEPTED` へ以下を追記すること。
 *
 *   - `{ c: "china", has: "\"tea\"", why: "英語とロシア語の語形そのものを比べる問題。原語が無いと問いが成立しない" }`
 *   - `{ c: "china", has: "\"China\"", why: "英語の国名そのものの語源を訊く問題" }`
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

export const CHINA_QUIZ = [
  q(
    1,
    "What is the capital of China?|¿Cuál es la capital de China?|Quelle est la capitale de la Chine ?|中国の首都はどこか?",
    [
      "Beijing|Pekín|Pékin|北京",
      "Shanghai|Shanghái|Shanghai|上海",
      "Guangzhou|Cantón|Canton|広州",
    ],
    0,
    "Beijing has served as the seat of power for most of the last eight centuries, though the dynasty in charge there has changed several times over. Its wider metropolitan area is now home to more than twenty million people.|Pekín ha sido la sede del poder durante la mayor parte de los últimos ocho siglos, aunque la dinastía al mando allí ha cambiado varias veces. Su área metropolitana alberga hoy a más de veinte millones de personas.|Pékin est le siège du pouvoir depuis la majeure partie des huit derniers siècles, même si la dynastie qui y régnait a changé plusieurs fois. Son agglomération compte aujourd'hui plus de vingt millions d'habitants.|北京はこの八百年ほどの大半、時の政権の座であり続けてきた。治める王朝は何度も入れ替わったが、都であることは変わらなかった。首都圏にはいま二千万人を超える人が暮らす。",
  ),
  q(
    1,
    "Which continent is China part of?|¿A qué continente pertenece China?|De quel continent la Chine fait-elle partie ?|中国が属する大陸は?",
    [
      "Europe|Europa|Europe|ヨーロッパ",
      "Asia|Asia|Asie|アジア",
      "Africa|África|Afrique|アフリカ",
    ],
    1,
    "China occupies a large share of East Asia, stretching from the Pacific coast in the east to mountain ranges bordering Central and South Asia in the west. Its land area ranks among the largest of any country on the continent.|China ocupa buena parte de Asia oriental, extendiéndose desde la costa del Pacífico en el este hasta cadenas montañosas que limitan con Asia central y del sur en el oeste. Su superficie está entre las mayores del continente.|La Chine occupe une large part de l'Asie de l'Est, s'étendant de la côte pacifique à l'est jusqu'aux chaînes montagneuses bordant l'Asie centrale et du Sud à l'ouest. Sa superficie compte parmi les plus vastes du continent.|中国は東アジアの大半を占め、東の太平洋岸から西は中央アジア・南アジアと接する山脈地帯にまで広がる。国土の面積は大陸の中でも屈指の広さである。",
  ),
  q(
    1,
    "In most of northern China, meals are traditionally built around wheat noodles and buns rather than which grain that dominates the south?|En la mayor parte del norte de China, las comidas se basan tradicionalmente en fideos y panecillos de trigo en vez de qué cereal, dominante en el sur?|Dans la majeure partie du nord de la Chine, les repas reposent traditionnellement sur les nouilles et petits pains de blé plutôt que sur quelle céréale, dominante dans le sud ?|中国北部の食事は伝統的に小麦の麺や饅頭が中心だが、南部で主流のその穀物は何か?",
    [
      "Millet|Mijo|Millet|キビ",
      "Barley|Cebada|Orge|オオムギ",
      "Rice|Arroz|Riz|コメ",
    ],
    2,
    "The rough dividing line follows the Qinling mountain range and the Huai River, splitting the country into a wheat-and-noodle north and a rice-growing south. The habit runs deep enough that a northern-style dumpling wrapper and a southern one are still made from different flours.|La línea divisoria aproximada sigue la cordillera Qinling y el río Huai, dividiendo el país entre un norte de trigo y fideos y un sur arrocero. La costumbre está tan arraigada que la masa de las empanadillas del norte y del sur aún se hace con harinas distintas.|La ligne de partage suit à peu près la chaîne des Qinling et le fleuve Huai, séparant le pays entre un nord du blé et des nouilles et un sud rizicole. L'habitude est si ancrée que la pâte des raviolis du nord et du sud se fait encore avec des farines différentes.|大まかな境界は秦嶺山脈と淮河に沿っており、国を小麦と麺の北と稲作の南とに分けている。この習慣は根強く、北の餃子の皮と南のそれとではいまも使う粉の種類が違う。",
  ),
  q(
    2,
    "How many stars appear on the flag of China?|¿Cuántas estrellas aparecen en la bandera de China?|Combien d'étoiles figurent sur le drapeau de la Chine ?|中国の国旗にある星の数は?",
    [
      "Five|Cinco|Cinq|五つ",
      "Three|Tres|Trois|三つ",
      "Seven|Siete|Sept|七つ",
    ],
    0,
    "One large star stands for the ruling party, and four smaller stars arranged in an arc around it are traditionally said to represent the unity of the people under its leadership. All five are gold against a red field.|Una estrella grande representa al partido gobernante, y cuatro estrellas más pequeñas dispuestas en arco a su alrededor representan tradicionalmente la unidad del pueblo bajo su liderazgo. Las cinco son doradas sobre un campo rojo.|Une grande étoile représente le parti au pouvoir, et quatre étoiles plus petites disposées en arc autour d'elle représentent traditionnellement l'unité du peuple sous sa direction. Les cinq étoiles sont dorées sur fond rouge.|大きな星一つは指導する政党を表し、それを囲む弧を描く四つの小さな星は、その指導のもとでの人々の団結を表すとされる。五つの星はいずれも赤地に金色で描かれる。",
  ),
  q(
    2,
    "What is the name of the fitted, high-collared traditional dress often worn at Chinese weddings and formal events?|¿Cómo se llama el vestido tradicional entallado y de cuello alto que se usa en bodas chinas y actos formales?|Comment s'appelle la robe traditionnelle ajustée à col montant souvent portée aux mariages chinois et lors d'événements formels ?|中国の結婚式や式典でよく着られる、体に沿った立ち襟の伝統衣装は?",
    [
      "Hanbok|Hanbok|Hanbok|韓服",
      "Qipao (cheongsam)|Qipao (cheongsam)|Qipao (cheongsam)|チャイナドレス(旗袍)",
      "Sari|Sari|Sari|サリー",
    ],
    1,
    "The style grew out of looser Manchu court robes into the close-fitting, side-slit shape most associated with 1920s and 1930s Shanghai fashion. Tailors still make it to order for brides today, often in red for the colour's association with good fortune.|El estilo surgió de las túnicas cortesanas manchúes, más holgadas, hasta la forma entallada con abertura lateral asociada sobre todo a la moda de Shanghái de los años veinte y treinta. Los sastres aún lo confeccionan a medida para novias, a menudo en rojo por su asociación con la buena suerte.|Le style est né des robes de cour mandchoues, plus amples, pour devenir la forme ajustée à fente latérale surtout associée à la mode shanghaïenne des années 1920 et 1930. Des tailleurs le confectionnent encore sur mesure pour les mariées, souvent en rouge pour son association avec la chance.|この衣装は、ゆったりした満州族の宮廷衣装から、1920〜30年代の上海の流行と結びつく、体に沿ってスリットの入った形へと変わっていった。いまも仕立て屋が花嫁向けに誂えており、幸運を連想させる赤地が好んで選ばれる。",
  ),
  q(
    2,
    "China shares land borders with more neighbouring countries than almost any other nation. About how many does it border?|China comparte fronteras terrestres con más países vecinos que casi cualquier otra nación. ¿Con cuántos limita, aproximadamente?|La Chine partage des frontières terrestres avec plus de pays voisins que presque toute autre nation. Avec combien de pays est-elle limitrophe, environ ?|中国は他のほとんどの国より多くの隣国と陸続きの国境を接している。およそいくつの国と接しているか?",
    [
      "Six|Seis|Six|六つ",
      "Ten|Diez|Dix|十",
      "Fourteen|Catorce|Quatorze|十四",
    ],
    2,
    "Only Russia borders as many countries. The list runs from Russia and Mongolia in the north to Vietnam, Laos and Myanmar in the south, with several small Himalayan states in between.|Solo Rusia limita con tantos países. La lista va de Rusia y Mongolia en el norte a Vietnam, Laos y Myanmar en el sur, con varios pequeños estados del Himalaya entre medias.|Seule la Russie est limitrophe d'autant de pays. La liste va de la Russie et de la Mongolie au nord au Vietnam, au Laos et au Myanmar au sud, avec plusieurs petits États himalayens entre les deux.|これほど多くの国と接するのはロシアだけである。北のロシア・モンゴルから南のベトナム・ラオス・ミャンマーまで、その間にはヒマラヤの小さな国々も挟まる。",
  ),
  q(
    2,
    "What is the name of China's currency?|¿Cómo se llama la moneda de China?|Comment s'appelle la monnaie de la Chine ?|中国の通貨の名前は?",
    [
      "Renminbi (yuan)|Renminbi (yuan)|Renminbi (yuan)|人民元",
      "Won|Won|Won|ウォン",
      "Ringgit|Ringgit|Ringgit|リンギット",
    ],
    0,
    "\"Renminbi,\" meaning \"the people's currency,\" is the formal name of the money itself, while \"yuan\" names its basic unit, much as \"sterling\" and \"pound\" work together in Britain.|«Renminbi», que significa «la moneda del pueblo», es el nombre formal de la divisa, mientras que «yuan» nombra su unidad básica, igual que «esterlina» y «libra» funcionan juntos en el Reino Unido.|« Renminbi », qui signifie « la monnaie du peuple », est le nom officiel de la devise, tandis que « yuan » désigne son unité de base, un peu comme « sterling » et « livre » fonctionnent ensemble au Royaume-Uni.|「人民元」は「人民の通貨」を意味する正式な貨幣の名称で、「元」はその基本単位の名前である。イギリスの「スターリング」と「ポンド」の関係に近い。",
  ),
  q(
    2,
    "Which ocean does China's entire eastern coastline face?|¿A qué océano da toda la costa oriental de China?|Sur quel océan donne l'ensemble du littoral oriental de la Chine ?|中国の東側の海岸線がすべて面している大洋は?",
    [
      "Indian Ocean|Océano Índico|Océan Indien|インド洋",
      "Pacific Ocean|Océano Pacífico|Océan Pacifique|太平洋",
      "Atlantic Ocean|Océano Atlántico|Océan Atlantique|大西洋",
    ],
    1,
    "The coastline runs roughly five thousand kilometres from the Bohai Sea in the north to the South China Sea in the south, and it includes some of the busiest container ports on Earth.|La costa se extiende unos cinco mil kilómetros desde el mar de Bohai en el norte hasta el mar de la China Meridional en el sur, e incluye algunos de los puertos de contenedores más activos del planeta.|Le littoral s'étend sur environ cinq mille kilomètres, de la mer de Bohai au nord à la mer de Chine méridionale au sud, et compte certains des ports à conteneurs les plus actifs de la planète.|海岸線は北の渤海から南の南シナ海までおよそ五千キロメートル続き、地球上でも屈指の取扱量を誇るコンテナ港がいくつも並ぶ。",
  ),
  q(
    2,
    "At a typical Chinese restaurant meal with a group, how are dishes usually served?|En una comida china típica en grupo, ¿cómo se sirven normalmente los platos?|Lors d'un repas chinois typique en groupe, comment les plats sont-ils généralement servis ?|中国の食堂でグループで食事をするとき、料理は普通どう出されるか?",
    [
      "Each diner orders and eats their own separate plate|Cada comensal pide y come su propio plato aparte|Chaque convive commande et mange son propre plat|各自が自分の皿を注文して食べる",
      "One course at a time, all sharing a single plate|Un plato a la vez, todos compartiendo una única fuente|Un plat à la fois, tout le monde partageant une seule assiette|一皿ずつ順番に全員で分け合う",
      "Several dishes are set in the centre for everyone to share|Varios platos se colocan en el centro para que todos compartan|Plusieurs plats sont posés au centre pour que tout le monde partage|複数の料理を卓の中央に置き、皆で取り分ける",
    ],
    2,
    "A bowl of rice sits by each place while the shared dishes usually rotate on a turntable in the middle of the table so everyone can reach them. A good host keeps refilling a guest's tea or bowl before it runs empty rather than waiting to be asked.|Un tazón de arroz se coloca junto a cada comensal mientras los platos compartidos suelen girar en una bandeja giratoria en el centro de la mesa para que todos alcancen. Un buen anfitrión rellena el té o el tazón del invitado antes de que se vacíe, sin esperar a que se lo pidan.|Un bol de riz est posé devant chaque convive tandis que les plats communs tournent souvent sur un plateau pivotant au centre de la table pour que chacun puisse se servir. Un bon hôte resert le thé ou le bol de l'invité avant qu'il ne soit vide, sans attendre qu'on le lui demande.|各自の前にご飯の碗が置かれ、取り分ける料理は卓の中央の回転台に載って回ることが多く、誰の手も届くようになっている。よい主人役は、頼まれる前に客の茶碗や湯呑みが空になる前から注ぎ足す。",
  ),
  q(
    3,
    "The world's highest mountain sits on China's border with which country?|La montaña más alta del mundo está en la frontera de China con qué país?|La plus haute montagne du monde se trouve à la frontière de la Chine avec quel pays ?|世界最高峰は中国とどの国との国境にあるか?",
    [
      "Nepal|Nepal|Népal|ネパール",
      "Bhutan|Bután|Bhoutan|ブータン",
      "Afghanistan|Afganistán|Afghanistan|アフガニスタン",
    ],
    0,
    "The peak's Chinese name, Zhumulangma, and Nepal's Sagarmatha both predate the English name \"Everest,\" which honours a 19th-century British surveyor who never actually saw the mountain himself.|El nombre chino del pico, Zhumulangma, y el nepalí, Sagarmatha, son anteriores al nombre inglés «Everest», en honor a un topógrafo británico del siglo XIX que nunca llegó a ver la montaña en persona.|Le nom chinois du sommet, Zhumulangma, et le nom népalais, Sagarmatha, sont tous deux antérieurs au nom anglais « Everest », qui honore un géomètre britannique du XIXe siècle n'ayant lui-même jamais vu la montagne.|この峰の中国名「珠穆朗玛(チョモランマ)」もネパール名「サガルマータ」も、英語名「エベレスト」より古くからある。エベレストの名は19世紀の英国人測量士にちなむが、当人はこの山を実際に目にしたことはなかった。",
  ),
  q(
    3,
    "What is the 12-year cycle of animals used in the traditional Chinese calendar called?|¿Cómo se llama el ciclo de 12 años de animales del calendario tradicional chino?|Comment appelle-t-on le cycle de 12 ans d'animaux du calendrier traditionnel chinois ?|中国の伝統暦に使われる、十二の動物からなる周期の名は?",
    [
      "The Chinese horoscope|El horóscopo chino|L'horoscope chinois|中国式占星術",
      "The Chinese zodiac|El zodiaco chino|Le zodiaque chinois|干支(十二支)",
      "The Chinese almanac|El almanaque chino|L'almanach chinois|中国式暦",
    ],
    1,
    "Each year is assigned one of twelve animals, from the rat to the pig, and the cycle is popularly believed to shape the personality of anyone born under it. Ask someone their birth year in China and they may answer with an animal rather than a number.|A cada año se le asigna uno de doce animales, de la rata al cerdo, y se cree popularmente que el ciclo moldea la personalidad de quien nace bajo él. Si preguntas a alguien en China el año de su nacimiento, puede que responda con un animal en vez de un número.|Chaque année se voit attribuer l'un des douze animaux, du rat au cochon, et le cycle est censé façonner la personnalité de quiconque naît sous son signe. Demandez à quelqu'un en Chine son année de naissance, et il pourra répondre par un animal plutôt qu'un chiffre.|子から亥まで、十二の動物のいずれかがそれぞれの年に割り当てられ、その年に生まれた人の性格を形づくると広く信じられている。中国で生まれ年を尋ねると、数字ではなく動物の名で返ってくることもある。",
  ),
  q(
    3,
    "Along with the compass, gunpowder and papermaking, which invention completes ancient China's traditional \"Four Great Inventions\"?|Junto con la brújula, la pólvora y el papel, ¿qué invento completa las tradicionales «Cuatro Grandes Invenciones» de la antigua China?|Avec la boussole, la poudre à canon et le papier, quelle invention complète les traditionnelles « Quatre Grandes Inventions » de la Chine antique ?|羅針盤・火薬・製紙法とともに、古代中国の「四大発明」を成すもう一つの発明は?",
    [
      "The abacus|El ábaco|Le boulier|そろばん",
      "The wheel|La rueda|La roue|車輪",
      "Printing|La imprenta|L'imprimerie|印刷術",
    ],
    2,
    "Woodblock printing appeared by the 9th century and movable type followed a few centuries later, well before either technique reached Europe. The oldest surviving complete printed book, a Buddhist scripture, is dated to the year 868.|La impresión con planchas de madera apareció hacia el siglo IX, y los tipos móviles llegaron unos siglos después, mucho antes de que ambas técnicas alcanzaran Europa. El libro impreso completo más antiguo conservado, una escritura budista, está fechado en el año 868.|L'impression à planches de bois apparaît dès le IXe siècle, suivie quelques siècles plus tard par les caractères mobiles, bien avant que ces deux techniques n'atteignent l'Europe. Le plus ancien livre imprimé complet conservé, un texte bouddhique, est daté de l'an 868.|木版印刷は9世紀までに現れ、活字はその数世紀後に続いた。どちらもヨーロッパに伝わるよりずっと早い。現存する最古の完全な印刷本は仏典で、868年の年紀を持つ。",
  ),
  q(
    3,
    "China has won more Olympic gold medals in which sport than in any other, by a wide margin?|¿En qué deporte ha ganado China más medallas de oro olímpicas que en cualquier otro, por amplio margen?|Dans quel sport la Chine a-t-elle remporté, de loin, le plus de médailles d'or olympiques ?|中国が他のどの種目よりも大差でオリンピック金メダルを獲得している競技は?",
    [
      "Table tennis|Tenis de mesa|Tennis de table|卓球",
      "Swimming|Natación|Natation|水泳",
      "Volleyball|Voleibol|Volley-ball|バレーボール",
    ],
    0,
    "The sport is often called the country's \"national ball game,\" and it is common enough as a pastime that concrete tables with a built-in net sit in ordinary neighbourhood parks and schoolyards.|El deporte se llama a menudo el «juego de pelota nacional» del país, y es tan común como pasatiempo que hay mesas de hormigón con red incorporada en parques y patios de escuela corrientes.|Ce sport est souvent qualifié de « jeu de balle national » du pays, et il est assez répandu comme loisir pour que des tables en béton avec filet intégré se trouvent dans des parcs et cours d'école ordinaires.|この競技はしばしば「国球」と呼ばれるほど普及しており、網まで作り付けたコンクリート台がふつうの街区の公園や校庭にまで置かれている。",
  ),
  q(
    3,
    "China has built the world's what, in terms of high-speed rail?|¿Qué es lo que China ha construido a nivel mundial en materia de tren de alta velocidad?|Qu'est-ce que la Chine a bâti à l'échelle mondiale en matière de train à grande vitesse ?|高速鉄道について、中国が築いたのは世界の何か?",
    [
      "The oldest network|La red más antigua|Le réseau le plus ancien|最も古い網",
      "The longest network|La red más larga|Le réseau le plus étendu|最も長い網",
      "The slowest network|La red más lenta|Le réseau le plus lent|最も遅い網",
    ],
    1,
    "The network barely existed before 2008 and now stretches far beyond the combined length of every other country's high-speed lines put together, linking most provincial capitals to Beijing within a single day's travel.|La red apenas existía antes de 2008 y hoy se extiende mucho más allá de la suma de las líneas de alta velocidad de todos los demás países juntos, uniendo la mayoría de las capitales provinciales con Pekín en un solo día de viaje.|Le réseau existait à peine avant 2008 et s'étend aujourd'hui bien au-delà de la somme des lignes à grande vitesse de tous les autres pays réunis, reliant la plupart des capitales provinciales à Pékin en une seule journée de trajet.|この網は2008年より前にはほとんど存在しなかったが、いまや他の国々の高速鉄道をすべて足し合わせた総延長をはるかに超え、ほとんどの省都を一日で北京と結んでいる。",
  ),
  q(
    3,
    "Roughly how many people live in China today?|¿Aproximadamente cuántas personas viven hoy en China?|Combien de personnes vivent aujourd'hui en Chine, environ ?|現在、中国にはおよそ何人が暮らしているか?",
    [
      "About 400 million|Unos 400 millones|Environ 400 millions|およそ4億人",
      "About 800 million|Unos 800 millones|Environ 800 millions|およそ8億人",
      "About 1.4 billion|Unos 1400 millones|Environ 1,4 milliard|およそ14億人",
    ],
    2,
    "China held the title of the world's most populous country for centuries until India overtook it in the early 2020s, and the two together still account for well over a third of all humanity.|China ostentó el título de país más poblado del mundo durante siglos, hasta que India lo superó a principios de la década de 2020, y entre ambos aún suman bastante más de un tercio de toda la humanidad.|La Chine a détenu le titre de pays le plus peuplé du monde pendant des siècles, jusqu'à ce que l'Inde la dépasse au début des années 2020, et les deux pays réunis représentent encore largement plus d'un tiers de l'humanité.|中国は何世紀ものあいだ世界一人口の多い国であり続けたが、2020年代前半にインドに抜かれた。それでも両国を合わせれば、いまも全人類の三分の一をゆうに超える。",
  ),
  q(
    3,
    "The mouth of the Yangtze River, near Shanghai, empties into which sea?|La desembocadura del río Yangtsé, cerca de Shanghái, vierte sus aguas en qué mar?|L'embouchure du Yangtsé, près de Shanghai, se jette dans quelle mer ?|上海近くの長江河口が注ぎ込む海は?",
    [
      "The East China Sea|El mar de la China Oriental|La mer de Chine orientale|東シナ海",
      "The Yellow Sea|El mar Amarillo|La mer Jaune|黄海",
      "The Sea of Japan|El mar de Japón|La mer du Japon|日本海",
    ],
    0,
    "The Yangtze is Asia's longest river, carrying enough sediment down from thousands of kilometres inland that the coastline near its mouth has visibly grown outward over recorded history.|El Yangtsé es el río más largo de Asia y arrastra suficiente sedimento desde miles de kilómetros tierra adentro como para que la línea de costa cerca de su desembocadura haya crecido visiblemente a lo largo de la historia registrada.|Le Yangtsé est le plus long fleuve d'Asie, charriant depuis des milliers de kilomètres à l'intérieur des terres assez de sédiments pour que le littoral près de son embouchure se soit visiblement étendu au fil de l'histoire.|長江はアジア最長の川で、内陸何千キロメートルもの彼方から運ばれてくる土砂の量は、記録に残る歴史のあいだに河口付近の海岸線を目に見えて前進させるほどである。",
  ),
  q(
    4,
    "Words for \"tea\" in many languages, from English \"tea\" to Russian \"chai,\" trace back to Chinese words for the drink carried along which kind of route?|Las palabras para «té» en muchos idiomas, del inglés «tea» al ruso «chai», se remontan a palabras chinas llevadas por qué tipo de ruta?|Les mots pour « thé » dans de nombreuses langues, de l'anglais « tea » au russe « chai », remontent à des mots chinois transportés par quel type de route ?|英語の「tea」からロシア語の「chai」まで、多くの言語の「茶」を意味する語は、どんな種類の道を通って運ばれた中国語に由来するか?",
    [
      "The spice routes to India|Las rutas de las especias hacia la India|Les routes des épices vers l'Inde|インドへの香辛料の道",
      "China's own trade and shipping routes|Las propias rutas comerciales y marítimas de China|Les routes commerciales et maritimes propres à la Chine|中国自身の交易路・海路",
      "The amber road to the Baltic|La ruta del ámbar hacia el Báltico|La route de l'ambre vers la Baltique|バルト海への琥珀の道",
    ],
    1,
    "Coastal dialects carried the word out by sea as something close to \"tea,\" while the northern Mandarin-derived \"cha\" travelled overland instead, which is why the same drink's name splits neatly along old trade-route lines from one language to the next.|Los dialectos costeros llevaron la palabra por mar como algo parecido a «tea», mientras que el «cha» derivado del mandarín del norte viajó por tierra, así que el nombre de la misma bebida se divide claramente según las antiguas rutas comerciales de un idioma a otro.|Les dialectes côtiers ont exporté le mot par voie maritime sous une forme proche de « tea », tandis que le « cha » dérivé du mandarin du nord voyageait par voie terrestre, ce qui explique pourquoi le nom de cette même boisson se répartit nettement selon les anciennes routes commerciales d'une langue à l'autre.|沿岸部の方言は海路を通じて「テー」に近い音を運び、北方の官話に由来する「チャ」は陸路を伝わった。同じ飲み物の呼び名が言語ごとにきれいに二分されているのは、この古い交易路の違いのためである。",
  ),
  q(
    4,
    "What material, produced by China alone for centuries before the secret spread elsewhere, gave the ancient trade network to the west its name?|¿Qué material, producido solo por China durante siglos antes de que el secreto se difundiera, dio nombre a la antigua red comercial hacia occidente?|Quel matériau, produit par la seule Chine pendant des siècles avant que le secret ne se répande ailleurs, a donné son nom à l'antique réseau commercial vers l'ouest ?|何世紀ものあいだ中国だけが作り、その秘密が他へ広まる前は独占していた、西方への古い交易網に名を与えた素材は?",
    [
      "Porcelain|Porcelana|Porcelaine|磁器",
      "Jade|Jade|Jade|翡翠",
      "Silk|Seda|Soie|絹",
    ],
    2,
    "Silkworm cultivation was reportedly guarded so closely that smuggling the eggs or larvae out of the country carried the death penalty, and the secret is said to have only reached the Byzantine Empire around the 6th century, hidden inside hollow walking canes.|Se dice que el cultivo del gusano de seda se guardaba con tanto celo que sacar de contrabando los huevos o las larvas se castigaba con la muerte, y el secreto solo habría llegado al Imperio bizantino hacia el siglo VI, escondido dentro de bastones huecos.|L'élevage du ver à soie était, dit-on, si jalousement gardé que faire sortir en fraude des œufs ou des larves était puni de mort, et le secret n'aurait atteint l'Empire byzantin que vers le VIe siècle, dissimulé dans des cannes creuses.|養蚕は国外へ卵や幼虫を持ち出せば死罪になるほど厳重に守られた秘密だったと伝わり、その技法がビザンツ帝国に伝わったのは6世紀ごろ、中空の杖に隠して持ち出されたときだったとされる。",
  ),
  q(
    4,
    "Which of these was first issued in China, centuries before it was adopted anywhere in Europe?|¿Cuál de estos se emitió primero en China, siglos antes de adoptarse en cualquier parte de Europa?|Lequel de ces éléments fut d'abord émis en Chine, des siècles avant d'être adopté où que ce soit en Europe ?|次のうち、ヨーロッパのどこかで採用されるより何世紀も前に中国で初めて発行されたものは?",
    [
      "Paper banknotes|Billetes de banco de papel|Les billets de banque en papier|紙幣",
      "Coin-operated vending|Máquinas expendedoras de monedas|Les distributeurs à pièces|硬貨式の自動販売機",
      "Postage stamps|Sellos postales|Les timbres-poste|郵便切手",
    ],
    0,
    "Merchants in the Tang and Song dynasties began using promissory notes and government-backed paper certificates as early as the 7th to 11th centuries, well before Sweden printed Europe's first banknotes in 1661.|Los comerciantes de las dinastías Tang y Song empezaron a usar pagarés y certificados de papel respaldados por el gobierno ya entre los siglos VII y XI, mucho antes de que Suecia imprimiera los primeros billetes de Europa en 1661.|Des marchands des dynasties Tang et Song commencèrent à utiliser des billets à ordre et des certificats de papier garantis par l'État dès les VIIe au XIe siècles, bien avant que la Suède n'imprime les premiers billets de banque d'Europe en 1661.|唐から宋にかけての商人たちは、早くも7世紀から11世紀のうちに約束手形や政府の裏付けを持つ紙の証券を使い始めていた。スウェーデンがヨーロッパ初の紙幣を刷った1661年よりずっと前のことである。",
  ),
  q(
    4,
    "The official pronunciation of Standard Mandarin is based on the dialect of which city?|¿En el dialecto de qué ciudad se basa la pronunciación oficial del mandarín estándar?|La prononciation officielle du mandarin standard se fonde sur le dialecte de quelle ville ?|標準中国語の公式な発音のもとになっている方言はどの都市のものか?",
    [
      "Nanjing|Nankín|Nankin|南京",
      "Beijing|Pekín|Pékin|北京",
      "Guangzhou|Cantón|Canton|広州",
    ],
    1,
    "Earlier dynasties actually used other cities' speech as the administrative standard at different times, and Beijing's pronunciation only became the fixed national reference in the 20th century, once radio and schooling needed one agreed model to teach.|En realidad, dinastías anteriores usaron el habla de otras ciudades como referencia administrativa en distintas épocas, y la pronunciación de Pekín solo se fijó como referencia nacional en el siglo XX, cuando la radio y la escolarización necesitaron un modelo único que enseñar.|D'anciennes dynasties utilisèrent en réalité le parler d'autres villes comme référence administrative à différentes époques, et la prononciation de Pékin n'est devenue la référence nationale fixe qu'au XXe siècle, lorsque la radio et l'école ont eu besoin d'un modèle unique à enseigner.|かつての王朝は時代によって別の都市の発音を行政上の基準としていたこともあり、北京の発音が国の定まった規範になったのは20世紀に入ってからである。ラジオや学校教育が、教えるべき一つの手本を必要としたことがきっかけだった。",
  ),
  q(
    4,
    "What is the name for the concept of two complementary, opposing forces—like dark and light, passive and active—shown as a circular black-and-white symbol in Chinese philosophy?|¿Cómo se llama el concepto de dos fuerzas opuestas y complementarias —como oscuridad y luz, pasivo y activo— representado con un símbolo circular en blanco y negro en la filosofía china?|Comment appelle-t-on le concept de deux forces opposées et complémentaires — comme l'obscurité et la lumière, le passif et l'actif — représenté par un symbole circulaire noir et blanc dans la philosophie chinoise ?|暗と明、受動と能動のような、互いに補い合う二つの対立する力を表す、白黒の丸い意匠で知られる中国哲学の概念は?",
    [
      "Feng shui|Feng shui|Feng shui|風水",
      "Qi|Qi|Qi|気",
      "Yin and yang|Yin y yang|Yin et yang|陰陽",
    ],
    2,
    "The two halves of the symbol curve into each other rather than sitting as a straight split, and each half carries a small dot of the opposite colour, meant to show that neither force is ever completely pure or fully separate from the other.|Las dos mitades del símbolo se curvan una dentro de la otra en vez de estar separadas por una línea recta, y cada mitad lleva un pequeño punto del color opuesto, para mostrar que ninguna de las dos fuerzas es nunca del todo pura ni está del todo separada de la otra.|Les deux moitiés du symbole s'incurvent l'une dans l'autre plutôt que de se séparer par une ligne droite, et chaque moitié porte un petit point de la couleur opposée, pour montrer qu'aucune des deux forces n'est jamais totalement pure ni totalement séparée de l'autre.|この意匠の左右は直線ではなく曲線で入り組み、それぞれの側に反対の色の小さな点が置かれる。どちらの力も完全に純粋でも、もう一方から完全に切り離されてもいないことを示すためである。",
  ),
  q(
    4,
    "What is the traditional practice of inserting thin needles into specific points of the body called?|¿Cómo se llama la práctica tradicional de insertar agujas finas en puntos específicos del cuerpo?|Comment appelle-t-on la pratique traditionnelle consistant à insérer de fines aiguilles en des points précis du corps ?|体の特定の点に細い針を刺す伝統的な施術の名は?",
    [
      "Acupuncture|Acupuntura|Acupuncture|鍼(はり)",
      "Reflexology|Reflexología|Réflexologie|リフレクソロジー",
      "Cryotherapy|Crioterapia|Cryothérapie|寒冷療法",
    ],
    0,
    "The practice is traced back at least two thousand years in Chinese medical texts and rests on the idea of channels of energy, or qi, running through the body, though modern clinical evidence for exactly how or whether it works remains debated.|La práctica se remonta al menos dos mil años en textos médicos chinos y se basa en la idea de canales de energía, o qi, que recorren el cuerpo, aunque la evidencia clínica moderna sobre cómo o si funciona sigue siendo objeto de debate.|Cette pratique remonte à au moins deux mille ans dans les textes médicaux chinois et repose sur l'idée de canaux d'énergie, le qi, parcourant le corps, bien que les preuves cliniques modernes de son efficacité et de son fonctionnement restent débattues.|この施術は中国の医学書に少なくとも二千年前までさかのぼり、体を巡るエネルギー(気)の通り道という考えに基づく。ただし実際にどう効くのか、そもそも効くのかについては、現代の臨床研究でもいまなお議論が続いている。",
  ),
  q(
    5,
    "Which ancient Chinese thinker's ideas on ethics, family duty and social order are known in the West by a Latinised form of his name?|¿Qué pensador chino antiguo, cuyas ideas sobre ética, deber familiar y orden social se conocen en Occidente por una forma latinizada de su nombre?|Quel penseur chinois antique, dont les idées sur l'éthique, le devoir familial et l'ordre social sont connues en Occident sous une forme latinisée de son nom ?|倫理・家族の務め・社会秩序についての思想が、西洋ではラテン語化された名で知られる古代中国の思想家は?",
    [
      "Laozi|Laozi|Laozi|老子",
      "Confucius|Confucio|Confucius|孔子",
      "Sun Tzu|Sun Tzu|Sun Tzu|孫子",
    ],
    1,
    "He lived around the 6th to 5th century BC and left no writings of his own; what survives are sayings recorded by students after his death, later compiled into a text still studied and quoted today.|Vivió hacia los siglos VI y V a. C. y no dejó escritos propios; lo que se conserva son dichos anotados por sus discípulos tras su muerte, recopilados después en un texto que aún se estudia y cita hoy.|Il vécut vers les VIe et Ve siècles av. J.-C. et ne laissa aucun écrit de sa main ; ce qui subsiste, ce sont des paroles consignées par ses disciples après sa mort, compilées plus tard dans un texte encore étudié et cité de nos jours.|紀元前6世紀から5世紀ごろの人物で、本人自身の著作は残していない。伝わっているのは死後に弟子たちが書き留めた語録で、のちに一冊の書にまとめられ、いまも読まれ引用され続けている。",
  ),
  q(
    5,
    "According to the most complete modern survey, including all its branches and sections built across different centuries, roughly how long is the Great Wall of China?|Según el estudio moderno más completo, incluidas todas sus ramificaciones y tramos construidos en distintos siglos, ¿cuánto mide aproximadamente la Gran Muralla China?|Selon l'étude moderne la plus complète, incluant toutes ses ramifications et tronçons bâtis au fil des siècles, quelle est la longueur approximative de la Grande Muraille de Chine ?|さまざまな世紀に築かれた支線や区間すべてを含む最も網羅的な現代の調査によれば、万里の長城のおよその全長は?",
    [
      "About 3,000 km|Unos 3000 km|Environ 3000 km|およそ3,000km",
      "About 8,000 km|Unos 8000 km|Environ 8000 km|およそ8,000km",
      "About 21,000 km|Unos 21 000 km|Environ 21 000 km|およそ21,000km",
    ],
    2,
    "The 2012 government survey that produced this figure counted every wall, trench and natural barrier ever incorporated into the defence system across more than two thousand years of construction, not just the best-preserved Ming-dynasty sections most visitors see.|El estudio gubernamental de 2012 que arrojó esta cifra contó cada muro, foso y barrera natural jamás incorporado al sistema defensivo a lo largo de más de dos mil años de construcción, no solo los tramos mejor conservados de la dinastía Ming que ven la mayoría de los visitantes.|L'étude gouvernementale de 2012 à l'origine de ce chiffre a recensé chaque mur, fossé et barrière naturelle jamais intégrés au système défensif au cours de plus de deux mille ans de construction, pas seulement les tronçons les mieux conservés de la dynastie Ming que voient la plupart des visiteurs.|この数字を出した2012年の政府調査は、二千年を超える築造の歴史のなかで防衛網に組み込まれたあらゆる城壁・濠・自然の障壁を数え上げたもので、多くの訪問者が目にする保存状態のよい明代の区間だけではない。",
  ),
  q(
    5,
    "Standard Mandarin distinguishes meaning using pitch patterns on syllables. How many basic tones does it have?|El mandarín estándar distingue el significado mediante patrones de tono en las sílabas. ¿Cuántos tonos básicos tiene?|Le mandarin standard distingue le sens grâce à des schémas de ton sur les syllabes. Combien de tons de base compte-t-il ?|標準中国語は音節の高低によって意味を区別する。基本の声調はいくつあるか?",
    [
      "Four|Cuatro|Quatre|四つ",
      "Two|Dos|Deux|二つ",
      "Seven|Siete|Sept|七つ",
    ],
    0,
    "The same syllable \"ma\" can mean \"mother,\" \"hemp,\" \"horse\" or \"scold\" depending entirely on whether the pitch stays flat, rises, dips and rises, or falls sharply, which is why learners often drill tones before they even build vocabulary.|La misma sílaba «ma» puede significar «madre», «cáñamo», «caballo» o «regañar» según el tono se mantenga plano, suba, baje y suba, o caiga en picado, por lo que los estudiantes suelen practicar los tonos antes incluso de aprender vocabulario.|La même syllabe « ma » peut signifier « mère », « chanvre », « cheval » ou « gronder » selon que le ton reste plat, monte, descend puis remonte, ou chute brusquement, raison pour laquelle les apprenants s'entraînent souvent aux tons avant même d'apprendre du vocabulaire.|同じ「マー」という音節でも、高さが平らか、上がるか、いったん下がってまた上がるか、鋭く下がるかによって「母」「麻」「馬」「叱る」と意味が変わる。学習者が語彙より先に声調の練習から始めることが多いのはこのためである。",
  ),
  q(
    5,
    "Which of these chopstick habits is considered bad manners at a Chinese table because it resembles a funeral offering?|¿Cuál de estos hábitos con los palillos se considera de mala educación en una mesa china por parecerse a una ofrenda fúnebre?|Laquelle de ces habitudes avec les baguettes est considérée comme impolie à une table chinoise car elle rappelle une offrande funéraire ?|中国の食卓で、葬儀の供え物を思わせるため無作法とされる箸の使い方は?",
    [
      "Resting chopsticks flat across the bowl|Dejar los palillos apoyados en horizontal sobre el tazón|Poser les baguettes à plat sur le bol|箸を茶碗の上に横に渡して置く",
      "Standing chopsticks upright in a bowl of rice|Clavar los palillos en vertical en un tazón de arroz|Planter les baguettes à la verticale dans un bol de riz|茶碗のご飯に箸を立てる",
      "Using chopsticks to serve from a shared dish|Usar los palillos para servir de una fuente compartida|Utiliser les baguettes pour se servir dans un plat commun|箸で取り分け皿から料理を取る",
    ],
    1,
    "Incense sticks are planted upright in ash at funerals and before altars, so leaving chopsticks standing the same way in a bowl of food is thought to invite bad luck; a chopstick rest, or simply the edge of the bowl, is used instead.|Los palitos de incienso se clavan en vertical en la ceniza en funerales y ante altares, así que dejar los palillos de pie del mismo modo en un tazón de comida se considera un mal augurio; en su lugar se usa un reposapalillos o simplemente el borde del tazón.|Les bâtons d'encens sont plantés à la verticale dans la cendre lors des funérailles et devant les autels, si bien que laisser des baguettes dressées de la même façon dans un bol est censé porter malheur ; on utilise plutôt un repose-baguettes ou simplement le bord du bol.|線香は葬儀や祭壇の前で灰に立てて供えるものなので、それと同じように箸を茶碗のご飯に立てて置くのは縁起が悪いとされる。代わりに箸置きか、単に茶碗の縁を使う。",
  ),
  q(
    5,
    "Which river, long considered the cradle of Chinese civilisation, is affectionately nicknamed the country's \"Mother River\"?|¿Qué río, considerado durante mucho tiempo la cuna de la civilización china, recibe el cariñoso apodo de «Río Madre» del país?|Quel fleuve, longtemps considéré comme le berceau de la civilisation chinoise, est affectueusement surnommé le « fleuve mère » du pays ?|長く中国文明のゆりかごとされ、国の「母なる川」と親しみを込めて呼ばれる川は?",
    [
      "The Pearl River|El río Perla|La rivière des Perles|珠江",
      "The Mekong|El Mekong|Le Mékong|メコン川",
      "The Yellow River|El río Amarillo|Le fleuve Jaune|黄河",
    ],
    2,
    "Early Chinese states first took shape along its middle and lower reaches thousands of years ago, but the same river's tendency to shift course and flood catastrophically also earned it the far less affectionate nickname \"China's Sorrow.\"|Los primeros estados chinos tomaron forma a lo largo de su curso medio y bajo hace miles de años, pero la tendencia del mismo río a cambiar de curso e inundar de forma catastrófica también le valió el apodo, mucho menos cariñoso, de «la Pena de China».|Les premiers États chinois ont pris forme le long de son cours moyen et inférieur il y a des milliers d'années, mais la tendance de ce même fleuve à changer de cours et à provoquer des crues catastrophiques lui a aussi valu le surnom, bien moins affectueux, de « chagrin de la Chine ».|古代の中国の国々は数千年前、この川の中流から下流にかけての流域で形をなした。だが同じ川はたびたび流路を変え壊滅的な氾濫を起こしてきたことから、「中国の悲しみ」というずっと親しみのないあだ名も持つ。",
  ),
  q(
    5,
    "In Chinese, the term \"gongfu\" (kung fu), now used abroad mainly for martial arts, more broadly refers to what?|En chino, el término «gongfu» (kung fu), usado en el extranjero sobre todo para las artes marciales, se refiere en sentido amplio a qué?|En chinois, le terme « gongfu » (kung-fu), aujourd'hui surtout employé à l'étranger pour les arts martiaux, désigne plus largement quoi ?|中国語の「功夫(クンフー)」は、海外では主に武術を指す言葉として使われるが、もともとはより広く何を意味するか?",
    [
      "Skill or mastery gained through long, hard practice at anything|Habilidad o maestría lograda mediante mucha práctica en cualquier cosa|L'habileté ou la maîtrise acquise par une longue pratique assidue, en tout domaine|何であれ長く鍛錬を積んで得た技量",
      "A specific weapon used in stage combat|Un arma concreta usada en combates escénicos|Une arme précise utilisée dans les combats scéniques|舞台の立ち回りで使う特定の武器",
      "A style of theatrical face-paint|Un estilo de maquillaje facial teatral|Un style de maquillage facial théâtral|舞台化粧の様式",
    ],
    0,
    "A tea master, a calligrapher or a chef can all be said to have good \"gongfu\" in Chinese without a single punch being thrown; the martial-arts sense became the dominant meaning abroad largely through 1970s Hong Kong films.|En chino se puede decir que un maestro del té, un calígrafo o un cocinero tienen buen «gongfu» sin lanzar un solo puñetazo; el sentido de arte marcial se convirtió en el significado dominante en el extranjero sobre todo por las películas de Hong Kong de los años setenta.|En chinois, on peut dire d'un maître du thé, d'un calligraphe ou d'un cuisinier qu'il a du bon « gongfu » sans qu'un seul coup de poing ne soit donné ; le sens d'art martial est devenu dominant à l'étranger surtout grâce aux films de Hong Kong des années 1970.|茶の匠も書家も料理人も、拳を一発も繰り出さないまま中国語で「功夫がある」と言われうる。海外で武術の意味が主流になったのは、主に1970年代の香港映画を通じてのことである。",
  ),
  q(
    6,
    "Which classical Chinese theatrical art form uses elaborate, stylised face-painting so an audience can identify a character's personality at a glance?|¿Qué forma clásica de teatro chino usa un maquillaje facial elaborado y estilizado para que el público identifique de un vistazo la personalidad de un personaje?|Quel art théâtral classique chinois utilise un maquillage facial élaboré et stylisé pour que le public identifie d'un coup d'œil la personnalité d'un personnage ?|観客が一目で人物の性格を見分けられるよう、凝った様式化された隈取りを用いる古典的な中国の演劇は?",
    [
      "Kunqu opera|Ópera kunqu|Opéra kunqu|崑曲",
      "Peking opera|Ópera de Pekín|Opéra de Pékin|京劇",
      "Shadow puppetry|Teatro de sombras|Théâtre d'ombres|影絵芝居",
    ],
    1,
    "A red face traditionally signals loyalty and courage, while white often marks a treacherous or cunning character, and the patterns are intricate enough that performers train for years just to learn how to apply them correctly before a show.|Un rostro rojo señala tradicionalmente lealtad y valentía, mientras que el blanco suele marcar a un personaje traicionero o astuto, y los patrones son tan intrincados que los intérpretes se entrenan años solo para aprender a aplicarlos correctamente antes de una función.|Un visage rouge signale traditionnellement loyauté et courage, tandis que le blanc marque souvent un personnage traître ou rusé, et les motifs sont assez complexes pour que les artistes s'entraînent des années rien que pour apprendre à les appliquer correctement avant une représentation.|赤い顔は伝統的に忠義と勇敢さを、白い顔はしばしば奸智に長けた人物を表す。その文様は込み入っており、演者は舞台の前に正しく描けるようになるだけで何年も稽古を積む。",
  ),
  q(
    6,
    "A standard mahjong set used for the four-player tile game has roughly how many tiles?|¿Cuántas fichas tiene aproximadamente un juego estándar de mahjong para cuatro jugadores?|Un jeu de mahjong standard pour quatre joueurs comporte environ combien de tuiles ?|四人で遊ぶ麻将の一そろいには、およそ何枚の牌があるか?",
    [
      "52|52|52|52枚",
      "78|78|78|78枚",
      "136|136|136|136枚",
    ],
    2,
    "The tiles are grouped into three main suits plus honour tiles for winds and dragons, and players build and discard from a hand of thirteen tiles, racing to complete a winning combination before an opponent does.|Las fichas se agrupan en tres palos principales más fichas de honor de vientos y dragones, y los jugadores forman y descartan a partir de una mano de trece fichas, compitiendo por completar una combinación ganadora antes que un rival.|Les tuiles se répartissent en trois familles principales plus des tuiles d'honneur pour les vents et les dragons, et les joueurs composent et défaussent à partir d'une main de treize tuiles, chacun cherchant à compléter une combinaison gagnante avant les autres.|牌は三種の主な柄に加えて風牌・三元牌などの字牌からなり、打ち手は十三枚の手牌をやり繰りしながら、他の誰かより先に上がりの形を揃えようと競う。",
  ),
  q(
    6,
    "Unlike English, Mandarin requires a special word between a number and almost any noun it counts, similar to \"a sheet of paper\" but applied to nearly every noun. What is this class of word called?|A diferencia del inglés, el mandarín exige una palabra especial entre un número y casi cualquier sustantivo que cuenta, algo así como «una hoja de papel» pero aplicado a casi todos los sustantivos. ¿Cómo se llama esta clase de palabra?|Contrairement à l'anglais, le mandarin exige un mot spécial entre un nombre et presque tout nom qu'il compte, comme dans « une feuille de papier » mais appliqué à presque tous les noms. Comment appelle-t-on cette catégorie de mot ?|中国語は英語と違い、数字とほとんどどんな名詞のあいだにも特別な語を挟む。「紙一枚」のような数え方が、ほぼすべての名詞に必要になる。この種の語は何と呼ばれるか?",
    [
      "A measure word (classifier)|Clasificador (palabra de medida)|Un classificateur (mot de mesure)|量詞",
      "A tone marker|Marcador de tono|Un marqueur de ton|声調記号",
      "A radical|Radical|Une clé (radical)|部首",
    ],
    0,
    "The choice of word can depend on shape or category — long thin things, flat things, animals and books each tend to pair with a different one — and getting it wrong is one of the most common giveaways of a non-native speaker.|La elección de la palabra puede depender de la forma o la categoría —los objetos largos y finos, los planos, los animales y los libros suelen emparejarse cada uno con una palabra distinta— y equivocarse es una de las señales más comunes de un hablante no nativo.|Le choix du mot peut dépendre de la forme ou de la catégorie — les objets longs et fins, les objets plats, les animaux et les livres s'associent chacun à un mot différent — et se tromper est l'un des signes les plus fréquents d'un locuteur non natif.|選ぶ語は形や種類によって決まり、細長い物、平たい物、動物、書物にはそれぞれ違う語が対応する。これを間違えることは、母語話者でない人を見分ける最もよくある手がかりの一つである。",
  ),
  q(
    6,
    "What is the name of the slow, flowing martial-art exercise, often translated as \"shadow boxing,\" practised by groups in parks across China each morning?|¿Cómo se llama el ejercicio marcial lento y fluido, a menudo traducido como «boxeo de sombra», que practican grupos en los parques de China cada mañana?|Comment s'appelle cet exercice martial lent et fluide, souvent traduit par « boxe dans le vide », que des groupes pratiquent chaque matin dans les parcs à travers la Chine ?|中国各地の公園で毎朝、集団でゆっくりと流れるように行われる、「型を打つ拳法」とも訳される武術由来の体操の名は?",
    [
      "Qigong|Qigong|Qigong|気功",
      "Tai chi (taijiquan)|Taichí (taijiquan)|Tai-chi (taijiquan)|太極拳",
      "Wing chun|Wing chun|Wing chun|詠春拳",
    ],
    1,
    "Though it descends from a genuine martial art capable of fast, hard strikes, the version practised publicly each morning is deliberately slowed down, valued more for balance, breathing and health than for combat.|Aunque desciende de un arte marcial genuino capaz de golpes rápidos y duros, la versión que se practica públicamente cada mañana se ralentiza a propósito, valorada más por el equilibrio, la respiración y la salud que por el combate.|Bien qu'il descende d'un art martial véritable capable de frappes rapides et puissantes, la version pratiquée publiquement chaque matin est délibérément ralentie, appréciée davantage pour l'équilibre, la respiration et la santé que pour le combat.|速く鋭い打撃も繰り出せる本来の武術に由来するが、毎朝人前で行われる型はわざと動きを落としたもので、実戦よりも体の均衡や呼吸、健康のために重んじられている。",
  ),
  q(
    6,
    "Which number is considered unlucky in Chinese-speaking regions because it sounds almost identical to the word for \"death\"?|¿Qué número se considera de mala suerte en las regiones de habla china porque suena casi igual que la palabra «muerte»?|Quel chiffre est considéré comme malchanceux dans les régions sinophones parce qu'il se prononce presque comme le mot « mort » ?|「死」という語とほぼ同じ音のため、中国語圏で縁起が悪いとされる数字は?",
    [
      "Nine|Nueve|Neuf|九",
      "Six|Seis|Six|六",
      "Four|Cuatro|Quatre|四",
    ],
    2,
    "Many hotels and hospital buildings skip the number entirely on floor buttons and room doors, the same way some Western buildings skip a thirteenth floor, and phone numbers or car plates loaded with the digit can sell for noticeably less.|Muchos hoteles y hospitales omiten por completo el número en los botones de los ascensores y las puertas de las habitaciones, igual que algunos edificios occidentales se saltan el piso trece, y los números de teléfono o matrículas cargados de esa cifra pueden venderse notablemente más baratos.|De nombreux hôtels et hôpitaux omettent carrément ce chiffre sur les boutons d'ascenseur et les portes de chambre, tout comme certains immeubles occidentaux sautent le treizième étage, et les numéros de téléphone ou plaques d'immatriculation qui en comportent plusieurs se vendent nettement moins cher.|多くのホテルや病院は、西洋の建物が十三階を飛ばすのと同じように、エレベーターの階数表示や病室の番号からこの数字をまるごと省く。この数字が並ぶ電話番号や車のナンバーは、目に見えて安く売られることもある。",
  ),
  q(
    6,
    "Which vast desert of gravel plains and rocky terrain, rather than sand dunes, stretches across northern China and into Mongolia?|¿Qué vasto desierto de llanuras de grava y terreno rocoso, más que de dunas de arena, se extiende por el norte de China hasta Mongolia?|Quel vaste désert de plaines de gravier et de terrain rocailleux, plutôt que de dunes de sable, s'étend à travers le nord de la Chine jusqu'en Mongolie ?|砂丘というより砂利平原と岩の地形からなる広大な砂漠で、中国北部からモンゴルにまで広がるのは?",
    [
      "The Gobi Desert|El desierto de Gobi|Le désert de Gobi|ゴビ砂漠",
      "The Sahara|El Sahara|Le Sahara|サハラ砂漠",
      "The Atacama Desert|El desierto de Atacama|Le désert d'Atacama|アタカマ砂漠",
    ],
    0,
    "Despite its rocky reputation, dust storms whipped up from its exposed surface each spring can travel thousands of kilometres, occasionally reaching as far as Beijing, the Korean peninsula and even across the Pacific.|A pesar de su fama de terreno rocoso, las tormentas de polvo que levanta su superficie expuesta cada primavera pueden recorrer miles de kilómetros, llegando a veces hasta Pekín, la península coreana e incluso al otro lado del Pacífico.|Malgré sa réputation de terrain rocailleux, les tempêtes de poussière soulevées chaque printemps par sa surface exposée peuvent parcourir des milliers de kilomètres, atteignant parfois Pékin, la péninsule coréenne et même l'autre rive du Pacifique.|岩がちな土地という印象に反して、毎春その剥き出しの地表から巻き上がる砂嵐は何千キロメートルも運ばれ、時には北京や朝鮮半島、太平洋の向こうにまで届くことがある。",
  ),
  q(
    6,
    "Traditional Chinese thought describes five fundamental elements: wood, fire, earth, metal, and which fifth?|El pensamiento tradicional chino describe cinco elementos fundamentales: madera, fuego, tierra, metal, ¿y cuál quinto?|La pensée traditionnelle chinoise décrit cinq éléments fondamentaux : le bois, le feu, la terre, le métal, et lequel en cinquième ?|中国の伝統思想は五つの基本要素を説く。木・火・土・金、そして五つ目は何か?",
    [
      "Air|Aire|Air|空気",
      "Water|Agua|Eau|水",
      "Wind|Viento|Vent|風",
    ],
    1,
    "The five are arranged in cycles said to generate or destroy one another in turn — wood feeds fire, fire creates ash-earth, and so on — and the same framework underlies everything from traditional medicine to naming conventions and feng shui.|Los cinco se ordenan en ciclos que, según se dice, se generan o se destruyen unos a otros por turnos —la madera alimenta el fuego, el fuego crea tierra-ceniza, y así sucesivamente— y el mismo marco sustenta desde la medicina tradicional hasta las convenciones de nombres y el feng shui.|Les cinq éléments s'organisent en cycles censés s'engendrer ou se détruire tour à tour — le bois nourrit le feu, le feu crée la terre-cendre, et ainsi de suite — et ce même cadre sous-tend tout, de la médecine traditionnelle aux conventions de prénoms en passant par le feng shui.|この五つは互いを生み、あるいは打ち消し合う循環をなすとされる。木は火を生み、火は灰となって土を生む、というように。この枠組みは伝統医学から命名の習わし、風水に至るまで、あらゆるものの土台になっている。",
  ),
  q(
    6,
    "What feature makes the board in Chinese chess (xiangqi) visually different from an international chess board?|¿Qué rasgo hace que el tablero del ajedrez chino (xiangqi) sea visualmente distinto de un tablero de ajedrez internacional?|Quelle caractéristique rend le plateau des échecs chinois (xiangqi) visuellement différent d'un plateau d'échecs international ?|中国将棋(象棋)の盤が、国際的なチェス盤と見た目で違う点は?",
    [
      "It has no black squares, only red and white|No tiene casillas negras, solo rojas y blancas|Il n'a pas de cases noires, seulement du rouge et du blanc|黒いマスがなく赤と白だけ",
      "It is round instead of square|Es redondo en vez de cuadrado|Il est rond au lieu d'être carré|四角ではなく丸い",
      "A blank gap, or \"river,\" splits the board across the middle|Un espacio en blanco, o «río», divide el tablero por la mitad|Un espace vide, ou « rivière », scinde le plateau en son milieu|盤の中央を空白の「河」が横切って分ける",
    ],
    2,
    "Pieces are moved on the intersections of the grid lines rather than inside the squares, and most of them cannot cross that river at all, or can only cross it once their side's general is in check, which shapes strategy very differently from Western chess.|Las piezas se mueven en las intersecciones de las líneas de la cuadrícula en vez de dentro de las casillas, y la mayoría no puede cruzar ese río en absoluto, o solo puede hacerlo cuando el general de su bando está en jaque, lo que da forma a una estrategia muy distinta a la del ajedrez occidental.|Les pièces se déplacent sur les intersections des lignes de la grille plutôt qu'à l'intérieur des cases, et la plupart d'entre elles ne peuvent absolument pas franchir cette rivière, ou seulement une fois que le général de leur camp est en échec, ce qui façonne une stratégie très différente des échecs occidentaux.|駒は枠の中ではなく格子線の交点の上を動き、その多くはこの河をまったく越えられないか、自陣の「将」が王手を受けたときだけ越えられる。これが西洋のチェスとはまるで違う戦略を生む。",
  ),
  q(
    7,
    "Which Ming-dynasty admiral led seven major naval expeditions in the early 15th century, sailing fleets as far as the coast of East Africa?|¿Qué almirante de la dinastía Ming dirigió siete grandes expediciones navales a principios del siglo XV, llevando flotas hasta la costa de África oriental?|Quel amiral de la dynastie Ming dirigea sept grandes expéditions navales au début du XVe siècle, menant des flottes jusqu'à la côte d'Afrique orientale ?|明代、15世紀初めに七度の大規模な海洋遠征を率い、艦隊を東アフリカの沿岸にまで進めた提督は?",
    [
      "Zheng He|Zheng He|Zheng He|鄭和",
      "Wu Zetian|Wu Zetian|Wu Zetian|則天武后",
      "Li Bai|Li Bai|Li Bai|李白",
    ],
    0,
    "His largest \"treasure ships\" are said to have dwarfed the vessels European explorers would sail decades later, though the expeditions were halted after his death and the fleet was largely dismantled rather than expanded.|Se dice que sus mayores «barcos del tesoro» empequeñecían a los buques que navegarían los exploradores europeos décadas después, aunque las expediciones se detuvieron tras su muerte y la flota fue en gran parte desmantelada en lugar de ampliada.|Ses plus grands « navires-trésors » auraient éclipsé les vaisseaux que navigueraient les explorateurs européens des décennies plus tard, bien que les expéditions aient cessé après sa mort et que la flotte ait été largement démantelée plutôt qu'agrandie.|最大の「宝船」は、その数十年後にヨーロッパの探検家たちが乗った船をしのぐ規模だったと伝わる。だが遠征は彼の死後に打ち切られ、艦隊は拡張されるどころか大方解体された。",
  ),
  q(
    7,
    "The English name \"China\" most likely reached Europe, via Persian and Sanskrit, as a reference to which dynasty?|¿A qué dinastía se refiere probablemente el nombre inglés «China», que llegó a Europa a través del persa y el sánscrito?|Le nom anglais « China » (Chine) est probablement parvenu en Europe, via le persan et le sanskrit, en référence à quelle dynastie ?|英語の国名「China」は、ペルシア語やサンスクリット語を経てヨーロッパに伝わったとされるが、もとはどの王朝を指す名だったか?",
    [
      "The Tang dynasty|La dinastía Tang|La dynastie Tang|唐",
      "The Qin dynasty|La dinastía Qin|La dynastie Qin|秦",
      "The Song dynasty|La dinastía Song|La dynastie Song|宋",
    ],
    1,
    "That dynasty lasted barely fifteen years in power but was the one that first unified the country's warring states under a single emperor, and its name is thought to have travelled west along trade routes long after the dynasty itself had fallen.|Esa dinastía duró apenas quince años en el poder, pero fue la que unificó por primera vez los estados en guerra del país bajo un solo emperador, y se cree que su nombre viajó hacia occidente por las rutas comerciales mucho después de que la propia dinastía hubiera caído.|Cette dynastie ne dura à peine que quinze ans au pouvoir, mais ce fut elle qui unifia pour la première fois les États en guerre du pays sous un seul empereur, et son nom aurait voyagé vers l'ouest par les routes commerciales bien après la chute de la dynastie elle-même.|この王朝はわずか十五年ほどしか続かなかったが、争い合う国々を初めて一人の皇帝のもとに統一した王朝である。その名は、王朝自体が滅んでからずっとのちになって、交易路を通じて西方へ伝わったと考えられている。",
  ),
  q(
    7,
    "Traditional Chinese roofs often curve sharply upward at the corners. Besides looking elegant and helping shed rain, folklore says this shape serves what purpose?|Los tejados tradicionales chinos suelen curvarse bruscamente hacia arriba en las esquinas. Además de resultar elegantes y ayudar a evacuar la lluvia, ¿qué propósito dice el folclore que cumple esta forma?|Les toits traditionnels chinois se recourbent souvent nettement vers le haut aux angles. Outre l'élégance et l'évacuation de la pluie, quel usage le folklore prête-t-il à cette forme ?|中国の伝統的な屋根は隅が鋭く反り上がっていることが多い。優美さと雨仕舞いのほかに、言い伝えではこの形にはどんな役目があるとされるか?",
    [
      "It marks the hour by the shadow it casts|Marca la hora con la sombra que proyecta|Il indique l'heure par l'ombre qu'il projette|落とす影で時刻を示す",
      "It collects rainwater for drinking|Recoge agua de lluvia para beber|Il recueille l'eau de pluie pour la boisson|飲み水として雨水を集める",
      "It keeps out evil spirits, said to travel only in straight lines|Aleja a los espíritus malignos, que se dice viajan solo en línea recta|Il repousse les mauvais esprits, censés ne se déplacer qu'en ligne droite|直線でしか進めないとされる悪霊を防ぐ",
    ],
    2,
    "The same belief is part of why traditional doorways are sometimes built with a screen wall just behind them, forcing anyone or anything entering to turn a corner rather than walk straight through.|Esta misma creencia explica en parte por qué las puertas tradicionales a veces se construyen con un muro pantalla justo detrás, obligando a quien o lo que entra a girar en vez de pasar en línea recta.|Cette même croyance explique en partie pourquoi les portes traditionnelles sont parfois dotées d'un mur-écran juste derrière elles, obligeant quiconque ou quoi que ce soit entrant à tourner plutôt qu'à passer tout droit.|同じ考え方から、伝統的な戸口のすぐ内側に目隠しの塀を建てることがある。入ってくる者も物も、まっすぐ通り抜けられず角を曲がらされる仕組みである。",
  ),
  q(
    7,
    "Mandarin and hundreds of other Chinese and related languages belong to which broad language family?|El mandarín y cientos de otras lenguas chinas y emparentadas pertenecen a qué gran familia lingüística?|Le mandarin et des centaines d'autres langues chinoises et apparentées appartiennent à quelle grande famille linguistique ?|標準中国語をはじめ何百もの中国語系・関連言語が属する大きな語族は?",
    [
      "Sino-Tibetan|Sino-tibetana|Sino-tibétaine|シナ・チベット語族",
      "Indo-European|Indoeuropea|Indo-européenne|インド・ヨーロッパ語族",
      "Austronesian|Austronesia|Austronésienne|オーストロネシア語族",
    ],
    0,
    "The family also includes Tibetan and Burmese among its major branches, and by number of native speakers it ranks as one of the largest language families on Earth, second only to Indo-European.|Esta familia incluye también el tibetano y el birmano entre sus ramas principales, y por número de hablantes nativos se sitúa entre las mayores familias lingüísticas del planeta, solo por detrás de la indoeuropea.|Cette famille comprend aussi le tibétain et le birman parmi ses branches majeures, et par le nombre de locuteurs natifs, elle compte parmi les plus grandes familles linguistiques au monde, juste derrière l'indo-européenne.|この語族にはチベット語やビルマ語も主要な一派として含まれ、母語話者の数で見れば、インド・ヨーロッパ語族に次いで世界で屈指の規模を持つ語族である。",
  ),
  q(
    8,
    "Which two-stringed bowed instrument, held upright on the knee with the bow hairs passing between its strings, is a mainstay of Chinese orchestras?|¿Qué instrumento de dos cuerdas y arco, sostenido en vertical sobre la rodilla con las cerdas del arco pasando entre sus cuerdas, es un pilar de las orquestas chinas?|Quel instrument à deux cordes et archet, tenu à la verticale sur le genou avec les crins de l'archet passant entre ses cordes, est un pilier des orchestres chinois ?|膝の上に立てて構え、弓の毛を二本の弦のあいだに通して弾く、中国の楽団に欠かせない擦弦楽器は?",
    [
      "Pipa|Pipa|Pipa|琵琶",
      "Erhu|Erhu|Erhu|二胡",
      "Suona|Suona|Suona|嗩吶(スオナ)",
    ],
    1,
    "Unlike a violin bow, which can be lifted away from the strings entirely, the erhu's bow hair is trapped between its two strings and can never fully leave them, which shapes both its playing technique and its famously voice-like, mournful tone.|A diferencia del arco de violín, que puede separarse por completo de las cuerdas, las cerdas del arco del erhu quedan atrapadas entre sus dos cuerdas y nunca pueden salir del todo, lo que determina tanto su técnica como su tono, famoso por parecerse a una voz humana y sonar melancólico.|Contrairement à l'archet de violon, qui peut se détacher entièrement des cordes, les crins de l'archet de l'erhu restent pris entre ses deux cordes et ne peuvent jamais s'en dégager totalement, ce qui façonne à la fois sa technique de jeu et sa sonorité, célèbre pour son timbre plaintif proche de la voix humaine.|バイオリンの弓は弦から完全に離せるが、二胡の弓の毛は二本の弦のあいだに挟まれたまま決して抜けない構造になっている。この仕組みが奏法を決めるとともに、人の声にも似たもの悲しい音色を生んでいる。",
  ),
  q(
    8,
    "What is the name of the traditional Chinese plucked zither, typically strung with 21 strings over movable bridges along a long wooden soundboard?|¿Cómo se llama la cítara china tradicional de cuerdas pulsadas, normalmente con 21 cuerdas sobre puentes móviles a lo largo de una larga caja de resonancia de madera?|Comment s'appelle la cithare chinoise traditionnelle à cordes pincées, généralement tendue de 21 cordes sur des chevalets mobiles le long d'une longue table d'harmonie en bois ?|長い木の共鳴板の上に可動式の駒を渡し、たいてい21本の弦を張って爪で弾く中国の伝統的な箏の名は?",
    [
      "Yangqin|Yangqin|Yangqin|揚琴",
      "Ruan|Ruan|Ruan|阮",
      "Guzheng|Guzheng|Guzheng|古筝",
    ],
    2,
    "Each string's pitch is set by sliding its individual bridge, and after plucking, a player can also press the string down on the far side of the bridge to bend the pitch upward mid-note, a technique central to the instrument's expressive sliding ornaments.|El tono de cada cuerda se fija deslizando su propio puente, y tras pulsarla, el intérprete también puede presionar la cuerda al otro lado del puente para elevar el tono a media nota, una técnica central en los adornos deslizantes tan expresivos del instrumento.|La hauteur de chaque corde se règle en faisant glisser son propre chevalet, et après avoir pincé la corde, l'interprète peut aussi la presser de l'autre côté du chevalet pour faire monter la hauteur en cours de note, une technique centrale dans les ornements glissés si expressifs de l'instrument.|それぞれの弦の音高は個別の駒を滑らせて決め、弾いたあとに駒の向こう側で弦を押さえれば音の高さを鳴らしながら上げることもできる。この楽器らしい、しなやかに音を滑らせる装飾奏法の要となる技法である。",
  ),

  // ── 追加分(2026-08-14、量産の指示に基づく)。既存42問はそのまま残し、
  // ここから下に61問を足した。難易度1〜3を12問、4〜6を19問、7〜8を16問、
  // 9〜10を14問、計61問。日本語文には英字を混ぜず(既存の3件のACCEPTED例外を
  // 使う必要のある文は書いていない)、固有名詞はすべて漢字かカタカナで表した。

  q(
    1,
    "What is the most widely spoken first language in the world, spoken as a native tongue by more people than English?|¿Cuál es el idioma nativo más hablado del mundo, con más hablantes nativos que el inglés?|Quelle est la langue maternelle la plus parlée au monde, avec plus de locuteurs natifs que l'anglais ?|世界で母語として話す人が最も多い言語で、母語話者数では英語を上回るのは?",
    [
      "Mandarin Chinese|El chino mandarín|Le mandarin|標準中国語(普通話)",
      "English|El inglés|L'anglais|英語",
      "Spanish|El español|L'espagnol|スペイン語",
    ],
    0,
    "Counting only people who grew up speaking it at home, Mandarin has more native speakers than any other language on Earth, thanks largely to China's sheer population. English still edges ahead once second-language speakers are counted in.|Contando solo a quienes crecieron hablándolo en casa, el mandarín tiene más hablantes nativos que cualquier otro idioma del planeta, sobre todo gracias al tamaño de la población china. El inglés aún le gana si se cuentan también los hablantes de segunda lengua.|En ne comptant que les personnes ayant grandi en le parlant à la maison, le mandarin compte plus de locuteurs natifs que toute autre langue sur Terre, en grande partie grâce à la simple taille de la population chinoise. L'anglais reprend l'avantage dès que l'on compte aussi les locuteurs de langue seconde.|家庭で育った言語として数えるなら、標準中国語は地球上のどの言語よりも母語話者数が多く、これは主に中国の人口の規模による。第二言語話者まで含めれば、英語がなお上回る。",
  ),
  q(
    1,
    "In Chinese culture, which colour is most strongly associated with luck, happiness and celebration, worn at weddings and used to decorate for the New Year?|En la cultura china, ¿qué color se asocia más con la suerte, la felicidad y la celebración, usado en bodas y en la decoración de Año Nuevo?|Dans la culture chinoise, quelle couleur est la plus associée à la chance, au bonheur et à la fête, portée aux mariages et utilisée pour décorer pour le Nouvel An ?|中国の文化で、幸運・幸福・祝いと最も結びつき、結婚式で身につけたり正月の飾りに使われたりする色は?",
    [
      "White|Blanco|Blanc|白",
      "Red|Rojo|Rouge|赤",
      "Black|Negro|Noir|黒",
    ],
    1,
    "Red lanterns, red envelopes and red banners cover streets and doorways at the New Year, while white is traditionally the colour of mourning and funerals, almost the opposite association from many Western cultures.|Los faroles rojos, los sobres rojos y las pancartas rojas cubren calles y puertas en Año Nuevo, mientras que el blanco es tradicionalmente el color del luto y los funerales, una asociación casi opuesta a la de muchas culturas occidentales.|Des lanternes rouges, des enveloppes rouges et des banderoles rouges couvrent rues et portes au Nouvel An, tandis que le blanc est traditionnellement la couleur du deuil et des funérailles, une association presque opposée à celle de nombreuses cultures occidentales.|正月には赤い提灯や紅包、紅い横断幕が通りや戸口を埋め尽くす一方、白は伝統的に喪や葬儀の色とされ、多くの西洋文化とはほぼ正反対の意味を持つ。",
  ),
  q(
    1,
    "On mainland Chinese roads, which side do cars drive on?|En las carreteras de la China continental, ¿por qué lado circulan los coches?|Sur les routes de la Chine continentale, de quel côté circulent les voitures ?|中国本土の道路で、車は道のどちら側を走るか?",
    [
      "The left|La izquierda|La gauche|左側",
      "It varies by province|Varía según la provincia|Cela varie selon la province|省によって違う",
      "The right|La derecha|La droite|右側",
    ],
    2,
    "Hong Kong and Macau, former European colonies now governed as special administrative regions, still drive on the left, a colonial-era rule kept in place even after they returned to Chinese sovereignty.|Hong Kong y Macao, antiguas colonias europeas gobernadas ahora como regiones administrativas especiales, todavía circulan por la izquierda, una norma de la época colonial que se mantuvo incluso tras volver a la soberanía china.|Hong Kong et Macao, anciennes colonies européennes aujourd'hui administrées comme régions administratives spéciales, roulent encore à gauche, une règle datant de l'époque coloniale maintenue même après leur retour sous souveraineté chinoise.|かつてヨーロッパの植民地で、いまは特別行政区として統治されている香港とマカオは、中国への返還後もなお左側通行を続けている。これは植民地時代の規則がそのまま残された例である。",
  ),
  q(
    1,
    "Giant pandas live in the wild only in which country?|¿En qué país viven en estado salvaje los pandas gigantes?|Les pandas géants vivent à l'état sauvage uniquement dans quel pays ?|ジャイアントパンダが野生で暮らしているのはどの国だけか?",
    [
      "China|China|La Chine|中国",
      "India|India|L'Inde|インド",
      "Vietnam|Vietnam|Le Vietnam|ベトナム",
    ],
    0,
    "Wild populations survive only in a handful of mountain ranges in central China, where bamboo forests still grow thick enough to support them. Zoos elsewhere keep pandas only on loan from China, under agreements that count any cubs born abroad as still belonging to it.|Las poblaciones silvestres sobreviven solo en un puñado de cordilleras del centro de China, donde aún crecen bosques de bambú lo bastante densos para sustentarlas. Los zoológicos de otros países solo tienen pandas en préstamo de China, bajo acuerdos que consideran que las crías nacidas en el extranjero le siguen perteneciendo.|Les populations sauvages ne subsistent que dans une poignée de chaînes montagneuses du centre de la Chine, où des forêts de bambous poussent encore assez denses pour les nourrir. Les zoos d'ailleurs n'ont des pandas qu'en prêt de la Chine, selon des accords qui considèrent que les petits nés à l'étranger lui appartiennent toujours.|野生の個体群は中国中部のわずかな山脈だけに残っており、そこにはいまも彼らを養えるほど密な竹林が広がっている。海外の動物園にいるパンダはすべて中国からの貸与で、海外で生まれた子どもも中国の所有とみなす取り決めのもとに置かれている。",
  ),
  q(
    2,
    "Dumplings called jiaozi, traditionally eaten at Chinese New Year, are shaped to resemble what, as a symbol of wealth?|Las empanadillas llamadas jiaozi, comidas tradicionalmente en Año Nuevo chino, tienen forma de qué, como símbolo de riqueza?|Les raviolis appelés jiaozi, traditionnellement mangés au Nouvel An chinois, sont façonnés pour ressembler à quoi, en symbole de richesse ?|中国の正月に伝統的に食べられる餃子は、富の象徴として何をかたどった形に作られるか?",
    [
      "Coins|Monedas|Des pièces de monnaie|硬貨",
      "Ancient ingots of gold or silver|Antiguos lingotes de oro o plata|D'anciens lingots d'or ou d'argent|古い金・銀の延べ棒",
      "Fish scales|Escamas de pez|Des écailles de poisson|魚のうろこ",
    ],
    1,
    "The curved, pinched shape is meant to echo yuanbao, the boat-shaped ingots used as currency in imperial China, and families in the north often gather the night before New Year's Day to fold hundreds of them together.|La forma curva y pellizcada evoca los yuanbao, los lingotes con forma de barco usados como moneda en la China imperial, y las familias del norte suelen reunirse la noche anterior a Año Nuevo para doblar cientos juntas.|La forme incurvée et pincée est censée évoquer les yuanbao, ces lingots en forme de bateau utilisés comme monnaie dans la Chine impériale, et les familles du nord se réunissent souvent la veille du jour de l'An pour en plier des centaines ensemble.|つまんで曲げたその形は、帝政期の中国で貨幣として使われた舟形の延べ棒「元宝」を思わせるよう作られている。北方の家庭では正月前夜に集まり、何百個もの餃子を一緒に包むことが多い。",
  ),
  q(
    2,
    "Round pastries filled with sweet lotus-seed or bean paste, often with a salted egg yolk at the centre, are eaten during which festival?|Los pasteles redondos rellenos de pasta dulce de semilla de loto o de frijol, a menudo con una yema de huevo salada en el centro, se comen durante qué festival?|Des pâtisseries rondes fourrées de pâte sucrée de graines de lotus ou de haricots, souvent avec un jaune d'œuf salé au centre, sont mangées lors de quelle fête ?|蓮の実や豆の甘い餡を詰め、中心に塩漬け卵黄を入れることも多い丸い菓子が食べられる祝祭は?",
    [
      "Chinese New Year|Año Nuevo chino|Le Nouvel An chinois|旧正月",
      "Dragon Boat Festival|El Festival del Barco del Dragón|La fête des Bateaux-Dragons|端午節",
      "Mid-Autumn Festival|El Festival del Medio Otoño|La fête de la Mi-Automne|中秋節",
    ],
    2,
    "These mooncakes are traditionally shared under the full moon closest to the autumn equinox, and their round shape is meant to symbolise the completeness of a family reunited for the occasion.|Estos pasteles de luna se comparten tradicionalmente bajo la luna llena más cercana al equinoccio de otoño, y su forma redonda simboliza la plenitud de una familia reunida para la ocasión.|Ces gâteaux de lune se partagent traditionnellement sous la pleine lune la plus proche de l'équinoxe d'automne, et leur forme ronde est censée symboliser la plénitude d'une famille réunie pour l'occasion.|この月餅は、秋分に最も近い満月の夜に分け合って食べるのが習わしで、その丸い形は、この機会に集った家族の団らんの完全さを表すとされる。",
  ),
  q(
    2,
    "Dragon boat races, with crews paddling in time to a drum, commemorate which ancient poet-statesman said to have drowned himself in protest?|Las regatas de barcos-dragón, con tripulaciones remando al ritmo de un tambor, conmemoran a qué antiguo poeta y estadista que, según se dice, se ahogó en protesta?|Les courses de bateaux-dragons, avec des équipages ramant au rythme d'un tambour, commémorent quel poète et homme d'État antique qui se serait noyé en signe de protestation ?|太鼓の音に合わせて漕ぐ竜舟(ドラゴンボート)競漕は、抗議のため入水したと伝わる古代の詩人・政治家をしのぶものだが、それは誰か?",
    [
      "Qu Yuan|Qu Yuan|Qu Yuan|屈原",
      "Li Bai|Li Bai|Li Bai|李白",
      "Confucius|Confucio|Confucius|孔子",
    ],
    0,
    "Legend holds that villagers paddled out to try to save him and threw rice into the river so fish would eat that instead of his body, a story often given as the origin of both the boat races and the sticky rice dumplings, zongzi, eaten at the same festival.|La leyenda dice que los aldeanos remaron para intentar salvarlo y arrojaron arroz al río para que los peces comieran eso en vez de su cuerpo, una historia que suele darse como origen tanto de las regatas como de las empanadillas de arroz glutinoso, zongzi, que se comen en el mismo festival.|La légende raconte que les villageois ramèrent pour tenter de le sauver et jetèrent du riz dans la rivière pour que les poissons le mangent plutôt que son corps, une histoire souvent donnée comme origine à la fois des courses de bateaux et des boulettes de riz gluant, les zongzi, mangées lors de la même fête.|村人たちが彼を助けようと舟を漕ぎ出し、魚が遺体でなく米を食べるよう川に米を投げ入れたという言い伝えがあり、これが竜舟競漕と、同じ祭りで食べられるもち米の粽(ちまき)の由来としてよく語られる。",
  ),
  q(
    2,
    "Which number is considered especially lucky in Chinese-speaking regions because it sounds similar to the word for \"prosper\" or \"wealth\"?|¿Qué número se considera especialmente afortunado en las regiones de habla china porque suena parecido a la palabra «prosperar» o «riqueza»?|Quel chiffre est considéré comme particulièrement porte-bonheur dans les régions sinophones car il ressemble au mot pour « prospérer » ou « richesse » ?|「発展する」「富」を意味する語に音が似ているため、中国語圏で特に縁起がよいとされる数字は?",
    [
      "Six|Seis|Six|六",
      "Eight|Ocho|Huit|八",
      "Two|Dos|Deux|二",
    ],
    1,
    "Buyers have paid enormous premiums for phone numbers, car plates and building floors loaded with the digit, and the 2008 Beijing Olympics were deliberately opened at 8 p.m. on the 8th day of the 8th month.|Los compradores han pagado enormes sobreprecios por números de teléfono, matrículas y pisos de edificios cargados con esa cifra, y los Juegos Olímpicos de Pekín de 2008 se inauguraron deliberadamente a las 8 de la tarde del día 8 del mes 8.|Des acheteurs ont payé des primes énormes pour des numéros de téléphone, plaques d'immatriculation et étages d'immeubles chargés de ce chiffre, et les Jeux olympiques de Pékin de 2008 ont délibérément ouvert à 20h le 8e jour du 8e mois.|この数字が並ぶ電話番号やナンバープレート、建物の階数には法外な高値がつくことがあり、2008年の北京オリンピックはわざと8月8日の午後8時に開会式を行った。",
  ),
  q(
    3,
    "What is the name of the ancient, still-navigable waterway that links Beijing and Hangzhou, ranked as the world's longest man-made canal?|¿Cómo se llama la antigua vía navegable, aún transitable, que une Pekín y Hangzhou, considerada el canal artificial más largo del mundo?|Comment s'appelle l'ancienne voie navigable, toujours praticable, qui relie Pékin et Hangzhou, considérée comme le plus long canal artificiel du monde ?|北京と杭州を結び、いまも通航できる、世界最長の人工運河とされる古い水路の名は?",
    [
      "The Yangtze Canal|El canal del Yangtsé|Le canal du Yangtsé|長江運河",
      "The Silk Canal|El canal de la Seda|Le canal de la Soie|絹の運河",
      "The Grand Canal|El Gran Canal|Le Grand Canal|京杭大運河",
    ],
    2,
    "At roughly 1,800 kilometres, it stretches well beyond the combined length of the Suez and Panama canals, and sections of it have carried grain, goods and passengers for well over a thousand years.|Con unos 1800 kilómetros, se extiende mucho más allá de la longitud combinada de los canales de Suez y Panamá, y algunos tramos han transportado grano, mercancías y pasajeros durante más de mil años.|Avec environ 1 800 kilomètres, il s'étend bien au-delà de la longueur cumulée des canaux de Suez et de Panama, et certains tronçons transportent grain, marchandises et passagers depuis plus de mille ans.|全長はおよそ1,800キロメートルに及び、スエズ運河とパナマ運河を合わせた長さをゆうに超える。区間によっては千年以上にわたって穀物や荷、旅人を運び続けてきた。",
  ),
  q(
    3,
    "Beginning in the 1950s, mainland China officially adopted simplified forms of many Chinese characters, mainly to achieve what goal?|A partir de la década de 1950, la China continental adoptó oficialmente formas simplificadas de muchos caracteres chinos, principalmente para lograr qué objetivo?|À partir des années 1950, la Chine continentale a officiellement adopté des formes simplifiées de nombreux caractères chinois, principalement pour atteindre quel objectif ?|1950年代以降、中国本土は多くの漢字の簡略化された字体を正式に採用したが、これは主に何を目的としたものか?",
    [
      "Raising literacy by making characters faster to learn and write|Aumentar la alfabetización, haciendo los caracteres más rápidos de aprender y escribir|Augmenter l'alphabétisation en rendant les caractères plus rapides à apprendre et à écrire|覚えて書くのを速くし、識字率を上げる",
      "Saving paper during a wartime shortage|Ahorrar papel durante una escasez de guerra|Économiser le papier pendant une pénurie de guerre|戦時の紙不足を補うため",
      "Making the language easier for foreigners to learn|Facilitar el aprendizaje del idioma a los extranjeros|Faciliter l'apprentissage de la langue pour les étrangers|外国人が学びやすくするため",
    ],
    0,
    "Hundreds of common characters had their stroke counts reduced, sometimes drastically, while Hong Kong, Macau and some overseas Chinese communities continued using the older, more complex traditional forms.|Cientos de caracteres comunes vieron reducido su número de trazos, a veces drásticamente, mientras que Hong Kong, Macao y algunas comunidades chinas de ultramar siguieron usando las formas tradicionales, más antiguas y complejas.|Des centaines de caractères courants ont vu leur nombre de traits réduit, parfois drastiquement, tandis que Hong Kong, Macao et certaines communautés chinoises d'outre-mer ont continué à utiliser les formes traditionnelles, plus anciennes et complexes.|数百の常用漢字の画数が、時には大幅に減らされた。一方で香港・マカオや一部の海外華人社会は、より古く複雑な繁体字を使い続けた。",
  ),
  q(
    3,
    "The Pearl River Delta, home to Guangzhou, Shenzhen and neighbouring Hong Kong, is best known worldwide as a centre for which activity?|El delta del río Perla, hogar de Cantón, Shenzhen y la vecina Hong Kong, es conocido mundialmente sobre todo como centro de qué actividad?|Le delta de la rivière des Perles, qui abrite Canton, Shenzhen et Hong Kong toute proche, est surtout connu dans le monde comme un centre pour quelle activité ?|広州・深圳と隣接する香港を擁する珠江デルタが、世界的に何の中心地としてよく知られているか?",
    [
      "Rice cultivation|El cultivo de arroz|La riziculture|稲作",
      "Factory manufacturing and export|La fabricación industrial y la exportación|La fabrication industrielle et l'exportation|工場製造と輸出",
      "Oil refining|El refino de petróleo|Le raffinage de pétrole|石油精製",
    ],
    1,
    "Since the 1980s the region has grown into one of the densest concentrations of factories on Earth, often nicknamed \"the world's workshop\" for churning out everything from toys to smartphones for export.|Desde los años ochenta, la región se ha convertido en una de las mayores concentraciones de fábricas del planeta, a menudo apodada «el taller del mundo» por producir de todo, desde juguetes hasta teléfonos inteligentes, para exportación.|Depuis les années 1980, la région est devenue l'une des plus fortes concentrations d'usines de la planète, souvent surnommée « l'atelier du monde » pour produire de tout, des jouets aux smartphones, destinés à l'exportation.|1980年代以降、この地域は地球上でも屈指の工場密集地に成長し、玩具からスマートフォンまでを輸出向けに作り出すことから「世界の工場」とあだ名されることも多い。",
  ),
  q(
    3,
    "Beijing hosted the Summer Olympic Games in which year?|¿En qué año fue Pekín sede de los Juegos Olímpicos de Verano?|En quelle année Pékin a-t-elle accueilli les Jeux olympiques d'été ?|北京が夏季オリンピックを開催したのは何年か?",
    [
      "1992|1992|1992|1992年",
      "2000|2000|2000|2000年",
      "2008|2008|2008|2008年",
    ],
    2,
    "Fourteen years later, in 2022, Beijing hosted the Winter Games as well, making it the first city ever to hold both the Summer and Winter Olympics.|Catorce años después, en 2022, Pekín también fue sede de los Juegos de Invierno, convirtiéndose en la primera ciudad en albergar tanto los Juegos de Verano como los de Invierno.|Quatorze ans plus tard, en 2022, Pékin a également accueilli les Jeux d'hiver, devenant ainsi la première ville à organiser à la fois les Jeux d'été et d'hiver.|その14年後の2022年、北京は冬季大会も開催し、夏季・冬季の両方のオリンピックを開いた史上初めての都市となった。",
  ),
  q(
    3,
    "What are the red paper envelopes containing money, traditionally given to children and unmarried younger relatives at New Year, called?|¿Cómo se llaman los sobres rojos de papel con dinero dentro, entregados tradicionalmente a niños y parientes jóvenes solteros en Año Nuevo?|Comment appelle-t-on les enveloppes rouges en papier contenant de l'argent, traditionnellement offertes aux enfants et aux jeunes parents célibataires au Nouvel An ?|正月に子どもや年少の未婚の親戚へ贈られる、お金を入れた赤い紙の封筒は何と呼ばれるか?",
    [
      "Hongbao (red envelopes)|Hongbao (sobres rojos)|Hongbao (enveloppes rouges)|紅包(お年玉袋)",
      "Fu characters|Caracteres fu|Caractères fu|福の字",
      "Spring couplets|Coplas de primavera|Couplets du printemps|春聯",
    ],
    0,
    "The amount given is chosen with care, since numbers linked to bad luck are avoided and the bills inside are usually crisp and new, sometimes withdrawn from banks specially for the occasion.|La cantidad que se da se elige con cuidado, ya que se evitan los números vinculados a la mala suerte, y los billetes dentro suelen ser nuevos y sin arrugar, a veces retirados del banco especialmente para la ocasión.|Le montant donné est choisi avec soin, les chiffres associés à la malchance étant évités, et les billets à l'intérieur sont généralement neufs et impeccables, parfois retirés en banque spécialement pour l'occasion.|包む金額は縁起の悪い数字を避けて注意深く選ばれ、中の紙幣は皺のない新札であることが多く、この日のためにわざわざ銀行で新札に両替することもある。",
  ),
  q(
    4,
    "The fermented condiment soy sauce, now used across East and Southeast Asian cooking, originated in which country?|La salsa de soja, condimento fermentado usado hoy en la cocina de Asia oriental y sudoriental, ¿en qué país se originó?|La sauce soja, condiment fermenté aujourd'hui utilisé dans la cuisine d'Asie de l'Est et du Sud-Est, est originaire de quel pays ?|東アジア・東南アジアの料理で広く使われる発酵調味料、醤油はどの国が起源か?",
    [
      "Japan|Japón|Le Japon|日本",
      "China|China|La Chine|中国",
      "Thailand|Tailandia|La Thaïlande|タイ",
    ],
    1,
    "Fermented soybean pastes and sauces date back well over two thousand years in China, and the technique later spread to Japan, Korea and beyond, where each region developed its own distinct styles and flavours.|Las pastas y salsas de soja fermentadas se remontan a más de dos mil años en China, y la técnica se extendió después a Japón, Corea y otros lugares, donde cada región desarrolló sus propios estilos y sabores.|Les pâtes et sauces de soja fermentées remontent à plus de deux mille ans en Chine, et la technique s'est ensuite répandue au Japon, en Corée et ailleurs, où chaque région a développé ses propres styles et saveurs.|大豆を発酵させたペーストや調味料は中国では二千年以上前にさかのぼり、この技法はのちに日本や朝鮮半島などへ広まった。それぞれの土地が独自の作り方や味わいを育てていった。",
  ),
  q(
    4,
    "The Yellow River gets its name and colour from fine, pale soil eroded from which region it flows through?|El río Amarillo debe su nombre y color a un suelo fino y pálido erosionado de qué región por la que fluye?|Le fleuve Jaune doit son nom et sa couleur à un sol fin et pâle érodé de quelle région qu'il traverse ?|黄河はその名と色を、流域のどの地方から削られてくる細かく淡い色の土に由来するか?",
    [
      "The Sichuan Basin|La cuenca de Sichuan|Le bassin du Sichuan|四川盆地",
      "The Tibetan Plateau|La meseta tibetana|Le plateau tibétain|チベット高原",
      "The Loess Plateau|La meseta de Loess|Le plateau de Loess|黄土高原",
    ],
    2,
    "The soil there is soft and easily carried away by wind and water, so the river sweeps up enormous amounts of it on its way east; the resulting sediment has also raised parts of the riverbed above the surrounding farmland over the centuries.|El suelo allí es blando y se lo lleva fácilmente el viento y el agua, así que el río arrastra cantidades enormes en su camino hacia el este; el sedimento resultante también ha elevado partes del lecho del río por encima de las tierras de cultivo circundantes a lo largo de los siglos.|Le sol y est meuble et facilement emporté par le vent et l'eau, si bien que le fleuve en charrie d'énormes quantités sur son trajet vers l'est ; les sédiments qui en résultent ont aussi, au fil des siècles, élevé certaines portions du lit du fleuve au-dessus des terres agricoles environnantes.|この土地の土はやわらかく、風や水で容易に運び去られるため、川は東へ向かう途中で膨大な量の土を巻き上げる。積もった土砂は何世紀もかけて河床の一部を周囲の農地より高く押し上げてもきた。",
  ),
  q(
    4,
    "What is the name for the narrow historic alleyways, lined with traditional courtyard homes, found in Beijing's old neighbourhoods?|¿Cómo se llaman los callejones históricos y estrechos, bordeados de casas tradicionales con patio, que hay en los barrios antiguos de Pekín?|Comment appelle-t-on les ruelles historiques et étroites, bordées de maisons traditionnelles à cour, présentes dans les vieux quartiers de Pékin ?|北京の旧市街にある、伝統的な四合院が並ぶ細い歴史ある路地は何と呼ばれるか?",
    [
      "Hutong|Hutong|Hutong|胡同",
      "Bazaar|Bazar|Bazar|バザール",
      "Souk|Zoco|Souk|スーク",
    ],
    0,
    "Many of these alleyways date back to the Yuan and Ming dynasties, and while large numbers were demolished during decades of redevelopment, some surviving districts are now protected and popular with tourists on foot or by rickshaw.|Muchos de estos callejones se remontan a las dinastías Yuan y Ming, y aunque se demolieron muchos durante décadas de reurbanización, algunos distritos que sobreviven están ahora protegidos y son populares entre los turistas a pie o en rickshaw.|Beaucoup de ces ruelles remontent aux dynasties Yuan et Ming, et si un grand nombre ont été démolies au cours de décennies de réaménagement urbain, certains quartiers survivants sont aujourd'hui protégés et prisés des touristes à pied ou en pousse-pousse.|これらの路地の多くは元代・明代にまでさかのぼる。何十年もの再開発で数多く取り壊されたが、いまも残る一部の地区は保護され、徒歩や人力車で歩く観光客に人気がある。",
  ),
  q(
    4,
    "The Han make up roughly what share of China's total population, making them by far its largest ethnic group?|¿Qué proporción aproximada de la población total de China representan los han, con lo que son, de lejos, su grupo étnico más numeroso?|Les Han représentent environ quelle part de la population totale de la Chine, ce qui en fait de loin son groupe ethnique le plus nombreux ?|漢族はおおよそ中国の総人口のどれくらいを占め、群を抜いて最大の民族となっているか?",
    [
      "About half|Cerca de la mitad|Environ la moitié|およそ半分",
      "More than 90 percent|Más del 90 por ciento|Plus de 90 pour cent|9割超",
      "About 70 percent|Cerca del 70 por ciento|Environ 70 pour cent|およそ7割",
    ],
    1,
    "The remaining population is spread across dozens of officially recognised ethnic minority groups, many concentrated in China's border regions, from Mongols and Koreans in the north to Zhuang, Yi and Uyghur communities in the south and west.|El resto de la población se reparte entre docenas de grupos étnicos minoritarios reconocidos oficialmente, muchos concentrados en las regiones fronterizas de China, desde mongoles y coreanos en el norte hasta comunidades zhuang, yi y uigures en el sur y el oeste.|Le reste de la population se répartit entre des dizaines de groupes ethniques minoritaires officiellement reconnus, dont beaucoup sont concentrés dans les régions frontalières de la Chine, des Mongols et Coréens au nord aux communautés zhuang, yi et ouïghoures au sud et à l'ouest.|残りの人口は公式に認定された数十の少数民族に分かれ、その多くは中国の国境地帯に集中している。北のモンゴル族・朝鮮族から、南部・西部のチワン族、イ族、ウイグル族まで多岐にわたる。",
  ),
  q(
    4,
    "The distinctive tingling, numbing sensation in Sichuan cuisine, alongside chilli heat, comes from which ingredient?|¿De qué ingrediente proviene la característica sensación de hormigueo y adormecimiento de la cocina de Sichuan, junto al picante del chile?|D'où vient la sensation caractéristique de picotement engourdissant de la cuisine du Sichuan, en plus du piquant du piment ?|四川料理に独特の、痺れるような感覚を唐辛子の辛さと合わせて生む食材は?",
    [
      "Ginger|Jengibre|Le gingembre|生姜",
      "Star anise|Anís estrellado|La badiane (anis étoilé)|八角",
      "Sichuan peppercorn|Pimienta de Sichuan|Le poivre du Sichuan|花椒",
    ],
    2,
    "Unlike chilli's burning heat, this small dried berry produces a tingling, almost buzzing numbness on the tongue, and the combination of the two sensations together is known in Chinese as \"mala.\"|A diferencia del ardor picante del chile, esta pequeña baya seca produce en la lengua un hormigueo casi vibrante y adormecedor, y la combinación de ambas sensaciones se conoce en chino como «mala».|Contrairement au piquant brûlant du piment, cette petite baie séchée produit sur la langue un picotement presque vibrant et engourdissant, et la combinaison des deux sensations est connue en chinois sous le nom de « mala ».|唐辛子の焼けるような辛さとは違い、この小さな乾燥した実は舌にじんじんと痺れるような感覚を生む。この二つの感覚が合わさった状態は中国語で「麻辣」と呼ばれる。",
  ),
  q(
    4,
    "The Cantonese tradition of drinking tea alongside small steamed or fried dishes like dumplings and buns, popular in Guangdong and Hong Kong, is called what?|¿Cómo se llama la tradición cantonesa de tomar té junto con pequeños platos al vapor o fritos, como empanadillas y bollos, popular en Cantón y Hong Kong?|Comment appelle-t-on la tradition cantonaise de boire du thé accompagné de petits plats cuits à la vapeur ou frits, comme des raviolis et des petits pains, populaire à Canton et à Hong Kong ?|広東や香港で親しまれる、蒸し物や揚げ物などの小皿料理を茶とともに楽しむ広東の習慣は何と呼ばれるか?",
    [
      "Yum cha (dim sum)|Yum cha (dim sum)|Yum cha (dim sum)|飲茶(ヤムチャ)",
      "Hot pot|Hot pot (olla caliente)|La fondue chinoise (hot pot)|火鍋",
      "Banquet cuisine|Cocina de banquete|La cuisine de banquet|満漢全席",
    ],
    0,
    "The Cantonese name literally means \"drink tea,\" and the small dishes, called dim sum, traditionally arrive on trolleys wheeled between tables so diners can simply point at whatever looks good as it passes.|El nombre cantonés significa literalmente «beber té», y los platitos, llamados dim sum, tradicionalmente llegan en carritos que se empujan entre las mesas para que los comensales solo tengan que señalar lo que les apetezca al pasar.|Le nom cantonais signifie littéralement « boire du thé », et les petits plats, appelés dim sum, arrivent traditionnellement sur des chariots poussés entre les tables, si bien que les convives n'ont qu'à désigner ce qui leur plaît au passage.|広東語のこの名は文字どおり「茶を飲む」を意味し、点心と呼ばれる小皿はワゴンに載せて卓のあいだを回るのが伝統で、客は通りかかったものの中から気に入ったものを指させばよい。",
  ),
  q(
    5,
    "What is the official system, adopted in the late 1950s, for writing Mandarin sounds using the Latin alphabet, now the international standard?|¿Cómo se llama el sistema oficial, adoptado a finales de los años cincuenta, para escribir los sonidos del mandarín con el alfabeto latino, hoy estándar internacional?|Comment appelle-t-on le système officiel, adopté à la fin des années 1950, pour transcrire les sons du mandarin avec l'alphabet latin, aujourd'hui norme internationale ?|1950年代末に採用され、標準中国語の音をラテン文字で書き表す、いまや国際標準となっている公式の方式は?",
    [
      "Wade-Giles|Wade-Giles|Wade-Giles|ウェード式",
      "Pinyin|Pinyin|Pinyin|拼音(ピンイン)",
      "Bopomofo|Bopomofo|Bopomofo|注音符号",
    ],
    1,
    "Schoolchildren across China learn it before they learn characters, using it to look words up in dictionaries and type Chinese on computer keyboards and phones by spelling out the sound and picking the right character from a list.|Los escolares de toda China lo aprenden antes que los caracteres, y lo usan para buscar palabras en diccionarios y escribir en chino en teclados de ordenador y teléfonos, deletreando el sonido y eligiendo el carácter correcto de una lista.|Les écoliers de toute la Chine l'apprennent avant les caractères, et s'en servent pour chercher des mots dans les dictionnaires et taper en chinois sur claviers d'ordinateur et téléphones, en épelant le son puis en choisissant le bon caractère dans une liste.|中国の子どもたちは漢字を学ぶ前にこれを習い、辞書で語を引いたり、パソコンやスマートフォンで音を綴って一覧から正しい漢字を選び中国語を入力したりするのに使う。",
  ),
  q(
    5,
    "For roughly thirteen centuries, official positions in China's imperial bureaucracy were largely filled through what merit-based process, rather than by birth alone?|Durante unos trece siglos, los puestos oficiales en la burocracia imperial china se cubrieron en gran medida mediante qué proceso basado en el mérito, en vez de solo por nacimiento?|Pendant environ treize siècles, les postes officiels de la bureaucratie impériale chinoise ont été majoritairement pourvus grâce à quel processus fondé sur le mérite, plutôt que sur la seule naissance ?|およそ十三世紀にわたり、中国の帝政期の官僚の職は、出自だけでなくどのような実力本位の仕組みで主に決められたか?",
    [
      "Selection by lottery|Selección por sorteo|Une sélection par tirage au sort|くじ引きによる選抜",
      "Appointment by local nobles|Nombramiento por nobles locales|Une nomination par les nobles locaux|地方の貴族による任命",
      "The imperial examination system|El sistema de exámenes imperiales|Le système des examens impériaux|科挙",
    ],
    2,
    "Candidates, in theory drawn from any social background, spent years memorising classical texts to sit gruelling written exams, some lasting several days inside individually locked cells; the whole system was only abolished in 1905.|Los candidatos, en teoría de cualquier extracción social, pasaban años memorizando textos clásicos para presentarse a agotadores exámenes escritos, algunos de varios días de duración en celdas individuales cerradas; todo el sistema se abolió recién en 1905.|Les candidats, en théorie issus de tout milieu social, passaient des années à mémoriser des textes classiques pour se présenter à d'épuisants examens écrits, certains durant plusieurs jours dans des cellules individuelles verrouillées ; le système entier ne fut aboli qu'en 1905.|受験者は建前上どんな身分の出であってもよく、何年もかけて古典を暗記し、時には数日にわたり個別の小部屋に閉じこもって行われる過酷な筆記試験に臨んだ。この制度全体が廃止されたのは1905年のことである。",
  ),
  q(
    5,
    "In Chinese calligraphy and painting, the brush, ink stick, paper and inkstone are traditionally grouped together under what name?|En la caligrafía y la pintura chinas, el pincel, la barra de tinta, el papel y la piedra de tinta se agrupan tradicionalmente bajo qué nombre?|Dans la calligraphie et la peinture chinoises, le pinceau, le bâton d'encre, le papier et la pierre à encre sont traditionnellement regroupés sous quel nom ?|中国の書画では、筆・墨・紙・硯がまとめて伝統的に何と呼ばれるか?",
    [
      "The Four Treasures of the Study|Los Cuatro Tesoros del Estudio|Les Quatre Trésors du lettré|文房四宝",
      "The Four Noble Truths|Las Cuatro Nobles Verdades|Les Quatre Nobles Vérités|四諦",
      "The Four Books|Los Cuatro Libros|Les Quatre Livres|四書",
    ],
    0,
    "A scholar was expected to own fine examples of each, and the solid ink stick has to be ground by hand against the inkstone with water to make liquid ink fresh before each writing session, a ritual said to help settle the mind before brush touches paper.|Se esperaba que un letrado poseyera buenos ejemplares de cada uno, y la barra de tinta sólida debe molerse a mano contra la piedra con agua para obtener tinta líquida fresca antes de cada sesión de escritura, un ritual que se dice ayuda a serenar la mente antes de que el pincel toque el papel.|On attendait d'un lettré qu'il possède de beaux exemplaires de chacun, et le bâton d'encre solide doit être broyé à la main contre la pierre avec de l'eau pour obtenir de l'encre liquide fraîche avant chaque séance d'écriture, un rituel censé aider à apaiser l'esprit avant que le pinceau ne touche le papier.|文人たるもの、それぞれの逸品を持つべしとされた。固形の墨は書く前のたびに硯の上で水とともに手で磨り、その儀式めいた所作は筆を紙に下ろす前に心を落ち着けるためとも言われる。",
  ),
  q(
    5,
    "What is the name for the mass wave of travel around Chinese New Year, when hundreds of millions head home to see family, often called the world's largest annual human migration?|¿Cómo se llama la enorme oleada de viajes en torno al Año Nuevo chino, cuando cientos de millones vuelven a casa para ver a la familia, a menudo llamada la mayor migración humana anual del mundo?|Comment appelle-t-on l'immense vague de déplacements autour du Nouvel An chinois, lorsque des centaines de millions de personnes rentrent chez elles voir leur famille, souvent qualifiée de plus grande migration humaine annuelle au monde ?|中国の正月前後に何億もの人が家族のもとへ帰る大規模な移動の波は何と呼ばれ、しばしば世界最大の年に一度の人の移動とされるか?",
    [
      "The Golden Week|La Semana Dorada|La Semaine dorée|黄金周",
      "Chunyun|Chunyun|Chunyun|春運",
      "The Long March|La Larga Marcha|La Longue Marche|長征",
    ],
    1,
    "Over the roughly forty-day travel period surrounding the holiday, the number of trips made by train, road and air has in recent years topped two billion, straining ticket booking systems the moment sales open.|Durante el periodo de viajes de unos cuarenta días en torno a la fiesta, el número de desplazamientos en tren, carretera y avión ha superado en años recientes los dos mil millones, saturando los sistemas de reserva de billetes en cuanto se abren las ventas.|Sur la période de voyage d'environ quarante jours entourant la fête, le nombre de trajets effectués en train, par la route et en avion a dépassé ces dernières années les deux milliards, saturant les systèmes de réservation de billets dès l'ouverture des ventes.|この祝日を挟むおよそ四十日間の移動期間中、鉄道・道路・航空を合わせた延べ移動回数は近年二十億回を超え、発売開始の瞬間からチケット予約システムに負荷がかかる。",
  ),
  q(
    5,
    "A Mandarin speaker and a Cantonese speaker from Guangzhou, though unable to easily understand each other's speech, can usually still read the same what?|Un hablante de mandarín y uno de cantonés de Cantón, aunque no se entiendan fácilmente al hablar, suelen poder leer igualmente el mismo qué?|Un locuteur de mandarin et un locuteur de cantonais de Canton, bien qu'incapables de facilement se comprendre à l'oral, peuvent généralement lire tout de même le même quoi ?|標準中国語話者と広州の広東語話者は、話し言葉では容易に通じ合えなくても、たいてい同じ何を読むことができるか?",
    [
      "Numbers only|Solo números|Seulement les nombres|数字だけ",
      "Nothing in common|Nada en común|Rien en commun|共通するものはない",
      "Written Chinese text|El texto escrito en chino|Le texte écrit en chinois|中国語の文章",
    ],
    2,
    "Mandarin and Cantonese differ enough in pronunciation and vocabulary to function almost like separate spoken languages, yet standard written Chinese, largely based on Mandarin grammar, is understood across regions, which is part of why Chinese has historically been described as one written language spread over many spoken ones.|El mandarín y el cantonés difieren lo suficiente en pronunciación y vocabulario como para funcionar casi como lenguas habladas distintas, pero el chino escrito estándar, basado en gran medida en la gramática mandarina, se entiende en todas las regiones, lo que explica en parte por qué se ha descrito históricamente al chino como una sola lengua escrita repartida entre muchas habladas.|Le mandarin et le cantonais diffèrent assez en prononciation et en vocabulaire pour fonctionner presque comme des langues parlées distinctes, mais le chinois écrit standard, largement fondé sur la grammaire mandarine, est compris dans toutes les régions, ce qui explique en partie pourquoi le chinois a longtemps été décrit comme une seule langue écrite répartie entre de nombreuses langues parlées.|標準中国語と広東語は発音や語彙がかなり異なり、話し言葉としてはほぼ別の言語のように機能する。それでも主に標準語の文法をもとにした書き言葉は各地で通じ、これが中国語がしばしば「一つの書き言葉が多くの話し言葉の上に広がっている」と言われる理由の一つでもある。",
  ),
  q(
    5,
    "The policy shift launched in the late 1970s under Deng Xiaoping, which opened China's economy to markets, foreign trade and investment, is known by what name?|¿Con qué nombre se conoce el giro político lanzado a finales de los años setenta bajo Deng Xiaoping, que abrió la economía china a los mercados, el comercio exterior y la inversión?|Le tournant politique lancé à la fin des années 1970 sous Deng Xiaoping, qui a ouvert l'économie chinoise aux marchés, au commerce extérieur et aux investissements, est connu sous quel nom ?|1970年代末、鄧小平のもとで始まり、中国経済を市場・貿易・投資に開いた政策転換は何と呼ばれるか?",
    [
      "Reform and Opening Up|Reforma y Apertura|Réforme et ouverture|改革開放",
      "The Great Leap Forward|El Gran Salto Adelante|Le Grand Bond en avant|大躍進",
      "The Hundred Flowers Campaign|La Campaña de las Cien Flores|La campagne des Cent Fleurs|百花斉放",
    ],
    0,
    "Coastal cities such as Shenzhen, then a small fishing town, were designated as special economic zones where market-style rules were tried out first, and Shenzhen has since grown into one of the country's largest and wealthiest cities.|Ciudades costeras como Shenzhen, entonces un pequeño pueblo pesquero, fueron designadas zonas económicas especiales donde se probaron primero reglas de tipo mercado, y Shenzhen se ha convertido desde entonces en una de las ciudades más grandes y ricas del país.|Des villes côtières comme Shenzhen, alors un petit village de pêcheurs, furent désignées zones économiques spéciales où des règles de type marché furent testées en premier, et Shenzhen est depuis devenue l'une des villes les plus grandes et les plus riches du pays.|当時は小さな漁村だった深圳のような沿岸都市が、市場型の仕組みをまず試す経済特区に指定された。深圳はその後、国内でも屈指の規模と豊かさを誇る都市に育った。",
  ),
  q(
    6,
    "The traditional Chinese calendar divides the year into 24 short periods tied to the sun's position, each marking things like the start of a season or the timing of frost. What is this system called?|El calendario tradicional chino divide el año en 24 periodos breves ligados a la posición del sol, cada uno marcando cosas como el inicio de una estación o la llegada de las heladas. ¿Cómo se llama este sistema?|Le calendrier traditionnel chinois divise l'année en 24 courtes périodes liées à la position du soleil, chacune marquant des événements comme le début d'une saison ou l'arrivée du gel. Comment appelle-t-on ce système ?|中国の伝統暦は一年を太陽の位置に結びついた24の短い期間に分け、それぞれが季節の始まりや霜の時期などを示す。この仕組みは何と呼ばれるか?",
    [
      "The lunar mansions|Las mansiones lunares|Les demeures lunaires|二十八宿",
      "The 24 solar terms|Los 24 términos solares|Les 24 termes solaires|二十四節気",
      "The heavenly stems|Los tallos celestiales|Les troncs célestes|十干",
    ],
    1,
    "Farmers once timed planting and harvest by these markers, and terms with names like \"Awakening of Insects\" and \"Grain in Ear\" are still printed on Chinese calendars today; UNESCO added the system to its list of intangible cultural heritage in 2016.|Los agricultores solían programar la siembra y la cosecha por estas señales, y términos con nombres como «Despertar de los insectos» y «Grano en espiga» aún se imprimen hoy en los calendarios chinos; la UNESCO añadió el sistema a su lista de patrimonio cultural inmaterial en 2016.|Les agriculteurs réglaient autrefois semailles et récoltes sur ces repères, et des termes portant des noms comme « Réveil des insectes » et « Épiaison des céréales » figurent encore aujourd'hui sur les calendriers chinois ; l'UNESCO a ajouté ce système à sa liste du patrimoine culturel immatériel en 2016.|かつて農民はこの節目に合わせて種まきや収穫の時期を計っており、「啓蟄」「芒種」といった名の節気はいまも中国の暦に刷り込まれている。ユネスコは2016年にこの仕組みを無形文化遺産の一覧に加えた。",
  ),
  q(
    6,
    "In hilly parts of southern China, such as Guangxi and Yunnan, farmers have carved which agricultural feature into mountainsides over hundreds of years to grow rice on steep terrain?|En zonas montañosas del sur de China, como Guangxi y Yunnan, los agricultores han tallado qué elemento agrícola en las laderas durante cientos de años para cultivar arroz en terreno escarpado?|Dans les régions vallonnées du sud de la Chine, comme le Guangxi et le Yunnan, les agriculteurs ont sculpté quel aménagement agricole à flanc de montagne pendant des centaines d'années pour cultiver du riz sur un terrain escarpé ?|広西や雲南など中国南部の丘陵地で、農民が急な地形で稲を育てるため何百年もかけて山肌に刻んできた農地の形は?",
    [
      "Windbreak hedgerows|Setos cortavientos|Des haies brise-vent|防風垣",
      "Irrigation canals|Canales de riego|Des canaux d'irrigation|灌漑水路",
      "Terraced paddies|Arrozales en terrazas|Des rizières en terrasses|棚田",
    ],
    2,
    "Seen from above, the flooded, curving tiers can look like giant contour lines etched into the hills, and some of the oldest such terraces have been farmed continuously by the same communities for well over six hundred years.|Vistas desde arriba, las escalonadas terrazas inundadas y sinuosas pueden parecer enormes curvas de nivel grabadas en las colinas, y algunas de las terrazas más antiguas han sido cultivadas de forma continua por las mismas comunidades durante más de seiscientos años.|Vues d'en haut, ces gradins inondés et sinueux peuvent ressembler à d'immenses courbes de niveau gravées dans les collines, et certaines des plus anciennes terrasses sont cultivées sans interruption par les mêmes communautés depuis plus de six cents ans.|上から見ると、水を張った曲線を描く階段状の田は、丘に刻まれた巨大な等高線のように見える。最も古いものの中には、同じ人々が六百年以上絶えず耕し続けてきたものもある。",
  ),
  q(
    6,
    "To ease severe water shortages in the north, China built a vast engineering project to carry water from the Yangtze basin up to which arid region?|Para aliviar la grave escasez de agua en el norte, China construyó un vasto proyecto de ingeniería para llevar agua de la cuenca del Yangtsé hasta qué región árida?|Pour atténuer la grave pénurie d'eau dans le nord, la Chine a construit un vaste projet d'ingénierie pour acheminer l'eau du bassin du Yangtsé jusqu'à quelle région aride ?|北部の深刻な水不足を和らげるため、中国は長江流域の水を運び上げる大規模な工事を行ったが、その水が届けられる乾燥した地域はどこか?",
    [
      "The Beijing-Tianjin area|La zona de Pekín-Tianjin|La région de Pékin-Tianjin|北京・天津地域",
      "The Tibetan Plateau|La meseta tibetana|Le plateau tibétain|チベット高原",
      "The Pearl River Delta|El delta del río Perla|Le delta de la rivière des Perles|珠江デルタ",
    ],
    0,
    "Known as the South-North Water Transfer Project, its central route runs over a thousand kilometres through a mix of canals, tunnels and an aqueduct that passes beneath the Yellow River itself, delivering water that tens of millions of people in the capital region now depend on.|Conocido como el Proyecto de Trasvase Sur-Norte, su ruta central recorre más de mil kilómetros por una mezcla de canales, túneles y un acueducto que pasa bajo el propio río Amarillo, entregando agua de la que hoy dependen decenas de millones de personas en la región capital.|Connu sous le nom de projet de transfert d'eau sud-nord, son itinéraire central parcourt plus de mille kilomètres à travers un mélange de canaux, de tunnels et d'un aqueduc qui passe sous le fleuve Jaune lui-même, acheminant une eau dont dépendent aujourd'hui des dizaines de millions d'habitants de la région capitale.|「南水北調」と呼ばれるこの事業の中央ルートは千キロメートル余りにわたり、運河やトンネル、黄河そのものの下をくぐる水路橋を組み合わせて水を運ぶ。首都圏に暮らす数千万人がいまやこの水に頼っている。",
  ),
  q(
    6,
    "Since the 1950s, most people in China have been assigned an official household registration tied to a specific place, historically making it harder to access schooling or healthcare benefits if they moved elsewhere. What is this system generally called?|Desde los años cincuenta, a la mayoría de la gente en China se le asigna un registro de hogar oficial ligado a un lugar concreto, lo que históricamente dificultaba el acceso a la escolarización o a prestaciones sanitarias si se mudaban a otro sitio. ¿Cómo se llama en general este sistema?|Depuis les années 1950, la plupart des habitants de Chine se voient attribuer un enregistrement officiel du foyer lié à un lieu précis, ce qui a historiquement compliqué l'accès à la scolarité ou aux prestations de santé en cas de déménagement ailleurs. Comment appelle-t-on généralement ce système ?|1950年代以降、中国のほとんどの人には特定の場所と結びついた公式の戸籍が割り当てられ、別の土地へ移ると就学や医療の給付を受けにくくなってきた。この仕組みは一般に何と呼ばれるか?",
    [
      "A passport system|Un sistema de pasaportes|Un système de passeports|旅券制度",
      "A household registration system|Un sistema de registro de hogares|Un système d'enregistrement des foyers|戸籍(戸口)制度",
      "A guild membership system|Un sistema de membresía gremial|Un système d'adhésion à une guilde|同業組合制度",
    ],
    1,
    "The registration also traditionally sorted people into rural or urban categories, and migrant workers who moved to cities for jobs often kept a rural registration for decades, a gap that recent reforms have tried gradually to narrow.|El registro también clasificaba tradicionalmente a la gente en categorías rural o urbana, y los trabajadores migrantes que se mudaban a las ciudades por trabajo a menudo conservaban un registro rural durante décadas, una brecha que reformas recientes han intentado reducir poco a poco.|L'enregistrement classait aussi traditionnellement les gens en catégories rurale ou urbaine, et les travailleurs migrants partis en ville pour le travail conservaient souvent un enregistrement rural pendant des décennies, un écart que des réformes récentes ont tenté de réduire progressivement.|この戸籍は伝統的に人々を農村部と都市部の区分にも分けており、仕事を求めて都市へ移った出稼ぎ労働者は何十年も農村戸籍のままであることが多かった。この差を縮めようと、近年は少しずつ改革が進められている。",
  ),
  q(
    6,
    "Despite ruling for less than 40 years, which short-lived dynasty is credited with digging and linking together the first version of the Grand Canal in the early 7th century?|A pesar de gobernar menos de 40 años, ¿a qué dinastía de corta duración se atribuye haber excavado y unido la primera versión del Gran Canal a principios del siglo VII?|Bien qu'ayant régné moins de 40 ans, quelle dynastie éphémère est créditée d'avoir creusé et relié la première version du Grand Canal au début du VIIe siècle ?|統治は40年に満たなかったが、7世紀初めに京杭大運河の最初の姿を掘り、つなぎ合わせたとされる短命な王朝はどれか?",
    [
      "The Han dynasty|La dinastía Han|La dynastie Han|漢",
      "The Ming dynasty|La dinastía Ming|La dynastie Ming|明",
      "The Sui dynasty|La dinastía Sui|La dynastie Sui|隋",
    ],
    2,
    "The project mobilised an enormous conscripted workforce in a very short span of time, and the huge cost in lives and money is often cited as one of the reasons the dynasty collapsed so quickly, even though the canal it built kept serving the country for the next thirteen centuries.|El proyecto movilizó a una enorme mano de obra reclutada en muy poco tiempo, y el altísimo coste en vidas y dinero suele citarse como una de las razones por las que la dinastía se derrumbó tan rápido, aunque el canal que construyó siguió sirviendo al país durante los siguientes trece siglos.|Le projet mobilisa une main-d'œuvre conscrite énorme en très peu de temps, et son coût considérable en vies et en argent est souvent cité comme l'une des raisons de l'effondrement si rapide de la dynastie, bien que le canal qu'elle bâtit ait continué à servir le pays pendant les treize siècles suivants.|この事業はごく短期間のうちに膨大な数の徴用民を動員し、その人命と費用の大きな犠牲は、この王朝がこれほど早く崩れ去った理由の一つとしてよく挙げられる。それでも築かれた運河自体は、その後十三世紀にわたって国に使われ続けた。",
  ),
  q(
    6,
    "Standard Mandarin's official Chinese name literally translates to what?|El nombre oficial en chino del mandarín estándar se traduce literalmente como qué?|Le nom officiel en chinois du mandarin standard se traduit littéralement par quoi ?|標準中国語の中国語での正式な呼び名は、直訳するとどういう意味か?",
    [
      "\"Common speech\"|«Habla común»|« Parler commun »|「普通の話し言葉」",
      "\"The emperor's tongue\"|«La lengua del emperador»|« La langue de l'empereur »|「皇帝の言葉」",
      "\"The correct sound\"|«El sonido correcto»|« Le son correct »|「正しい音」",
    ],
    0,
    "The term was formally adopted in 1955 to describe the standardised national language taught in schools and used in broadcasting, chosen partly because it avoided naming any one region's dialect as inherently superior to the others.|El término se adoptó formalmente en 1955 para describir la lengua nacional estandarizada enseñada en las escuelas y usada en la radiodifusión, elegido en parte porque evitaba nombrar el dialecto de una región como intrínsecamente superior a los demás.|Le terme fut officiellement adopté en 1955 pour désigner la langue nationale standardisée enseignée dans les écoles et utilisée à la radio et la télévision, choisi en partie parce qu'il évitait de désigner le dialecte d'une région comme intrinsèquement supérieur aux autres.|この呼び名は1955年に正式に採用され、学校で教えられ放送でも使われる標準化された国語を指す。特定の地方の言葉を他より優れたものとして名指ししないという配慮もあったとされる。",
  ),
  q(
    7,
    "Which railway line, completed in 2006, is the highest-altitude railway in the world, and carries oxygen-enriched air into passenger cabins to ease the effects of thin mountain air?|¿Qué línea ferroviaria, terminada en 2006, es la de mayor altitud del mundo y suministra aire enriquecido con oxígeno a los vagones de pasajeros para paliar los efectos del aire enrarecido de la montaña?|Quelle ligne ferroviaire, achevée en 2006, est la ligne de chemin de fer la plus haute en altitude au monde, et diffuse de l'air enrichi en oxygène dans les cabines des passagers pour atténuer les effets de l'air raréfié en montagne ?|2006年に開通し、世界で最も標高の高い場所を走る鉄道で、薄い山の空気の影響を和らげるため客車内に酸素を富化した空気を送り込む路線は?",
    [
      "The Trans-Siberian Railway|El Transiberiano|Le Transsibérien|シベリア鉄道",
      "The Qinghai–Tibet Railway|El ferrocarril Qinghai-Tíbet|Le chemin de fer Qinghai-Tibet|青蔵鉄道",
      "The Andean Central Railway|El Ferrocarril Central Andino|Le chemin de fer central des Andes|アンデス中央鉄道",
    ],
    1,
    "More than 960 kilometres of its track sit above 4,000 metres, and much of the route crosses ground that stays frozen year-round, forcing engineers to design a roadbed that would not buckle as the permafrost beneath it shifted with the seasons.|Más de 960 kilómetros de sus vías se sitúan por encima de los 4000 metros, y buena parte del trazado cruza terreno que permanece helado todo el año, obligando a los ingenieros a diseñar una plataforma que no se deformara con los cambios estacionales del permafrost subyacente.|Plus de 960 kilomètres de ses rails se situent au-dessus de 4 000 mètres, et une bonne partie du tracé traverse un terrain gelé toute l'année, obligeant les ingénieurs à concevoir une plateforme qui ne se déformerait pas avec les variations saisonnières du pergélisol sous-jacent.|線路の960キロメートル余りが標高4,000メートルを超え、多くの区間は一年中凍ったままの地面を横切る。技術者たちは、地下の永久凍土が季節ごとに動いても盛土が歪まないよう設計せざるを得なかった。",
  ),
  q(
    7,
    "Although its territory spans a width comparable to the continental United States, China officially observes how many time zones?|Aunque su territorio tiene una anchura comparable a la de Estados Unidos continental, ¿cuántas zonas horarias observa China oficialmente?|Bien que son territoire ait une largeur comparable à celle des États-Unis continentaux, combien de fuseaux horaires la Chine observe-t-elle officiellement ?|国土の東西の広さがアメリカ本土に匹敵するにもかかわらず、中国が公式に採用している標準時の数は?",
    [
      "Four|Cuatro|Quatre|四つ",
      "Two|Dos|Deux|二つ",
      "Just one|Solo una|Un seul|一つだけ",
    ],
    2,
    "The whole country runs on \"Beijing time,\" set eight hours ahead of Coordinated Universal Time, which means the sun can rise and set roughly two hours later by the clock in the far west than it does on the east coast, so some western areas informally shift their daily schedules to match local daylight.|Todo el país funciona con la «hora de Pekín», fijada ocho horas por delante del Tiempo Universal Coordinado, lo que significa que el sol puede salir y ponerse en el reloj hasta dos horas más tarde en el extremo occidental que en la costa este, así que algunas zonas del oeste desplazan informalmente sus horarios diarios para ajustarse a la luz local.|Tout le pays fonctionne à « l'heure de Pékin », fixée huit heures en avance sur le Temps universel coordonné, ce qui signifie que le soleil peut se lever et se coucher, selon l'horloge, jusqu'à deux heures plus tard à l'extrême ouest que sur la côte est, si bien que certaines zones occidentales décalent officieusement leurs horaires quotidiens pour suivre la lumière du jour locale.|国全体が協定世界時より8時間進んだ「北京時間」で動いており、これは時計の上では最西端の日の出・日の入りが東海岸よりおよそ2時間遅くなることを意味する。そのため西部の一部地域では、現地の日照に合わせて日々の予定を非公式にずらしている。",
  ),
  q(
    7,
    "Which city, known in antiquity as Chang'an, served as the capital for more Chinese dynasties over the centuries than any other city?|¿Qué ciudad, conocida en la antigüedad como Chang'an, fue capital de más dinastías chinas a lo largo de los siglos que ninguna otra ciudad?|Quelle ville, connue dans l'Antiquité sous le nom de Chang'an, a servi de capitale à plus de dynasties chinoises au fil des siècles que toute autre ville ?|古くは長安と呼ばれ、他のどの都市よりも多くの中国王朝の都となってきた都市は?",
    [
      "Xi'an|Xi'an|Xi'an|西安",
      "Chengdu|Chengdu|Chengdu|成都",
      "Kunming|Kunming|Kunming|昆明",
    ],
    0,
    "More than a dozen dynasties, including the Han and the Tang at the height of their power, ruled from the city, and at its peak under the Tang it may have been the largest and most cosmopolitan city on Earth, with communities of merchants and diplomats from across Asia.|Más de una docena de dinastías, entre ellas la Han y la Tang en la cúspide de su poder, gobernaron desde la ciudad, y en su apogeo bajo los Tang pudo haber sido la ciudad más grande y cosmopolita del planeta, con comunidades de comerciantes y diplomáticos de toda Asia.|Plus d'une douzaine de dynasties, dont les Han et les Tang à l'apogée de leur puissance, y ont régné, et à son sommet sous les Tang, elle fut peut-être la ville la plus grande et la plus cosmopolite de la planète, avec des communautés de marchands et de diplomates venus de toute l'Asie.|漢や、最盛期の唐を含む十以上の王朝がこの都市から国を治めた。唐代の最盛期には地球上で最大級かつ最も国際色豊かな都市だった可能性があり、アジア各地から来た商人や使節の集まりを抱えていた。",
  ),
  q(
    7,
    "Which mountain range, running roughly east to west, has historically separated the Cantonese-speaking Lingnan region (Guangdong and Guangxi) from the rest of central China?|¿Qué cordillera, que discurre aproximadamente de este a oeste, ha separado históricamente la región de Lingnan de habla cantonesa (Cantón y Guangxi) del resto de la China central?|Quelle chaîne de montagnes, orientée à peu près d'est en ouest, a historiquement séparé la région de Lingnan de langue cantonaise (Guangdong et Guangxi) du reste de la Chine centrale ?|おおむね東西に走り、広東語圏である嶺南地方(広東・広西)を中国中部の他の地域から歴史的に隔ててきた山脈は?",
    [
      "The Kunlun Mountains|Los montes Kunlun|Les monts Kunlun|崑崙山脈",
      "The Nanling Mountains|Los montes Nanling|Les monts Nanling|南嶺山脈",
      "The Greater Khingan Range|La cordillera del Gran Khingan|La chaîne du Grand Khingan|大興安嶺",
    ],
    1,
    "The range's name literally means \"southern ridges,\" and \"Lingnan\" itself means \"south of the ridges\"; the barrier was steep enough that the region developed its own distinct language, cuisine and customs relatively isolated from the north for much of its early history.|El nombre de la cordillera significa literalmente «crestas del sur», y «Lingnan» a su vez significa «al sur de las crestas»; la barrera era lo bastante escarpada como para que la región desarrollara su propia lengua, cocina y costumbres, relativamente aislada del norte durante buena parte de su historia temprana.|Le nom de la chaîne signifie littéralement « crêtes du sud », et « Lingnan » lui-même signifie « au sud des crêtes » ; la barrière était assez abrupte pour que la région développe sa propre langue, sa propre cuisine et ses propres coutumes, relativement isolée du nord pendant une bonne partie de son histoire ancienne.|この山脈の名は文字どおり「南の嶺」を意味し、「嶺南」自体も「嶺の南」を意味する。この険しい隔たりのため、この地域は歴史の初期を通じて北方から比較的切り離され、独自の言葉・食・習慣を育んでいった。",
  ),
  q(
    7,
    "The fall of which dynasty, around 220 AD, plunged China into the turmoil later romanticised as the Three Kingdoms period?|La caída de qué dinastía, hacia el año 220 d. C., sumió a China en la agitación luego idealizada como el periodo de los Tres Reinos?|La chute de quelle dynastie, vers 220 apr. J.-C., a plongé la Chine dans les troubles plus tard idéalisés sous le nom de période des Trois Royaumes ?|西暦220年ごろに滅んで、のちに「三国志」として語り継がれる動乱の時代に中国を突き落とした王朝は?",
    [
      "The Tang dynasty|La dinastía Tang|La dynastie Tang|唐",
      "The Song dynasty|La dinastía Song|La dynastie Song|宋",
      "The Han dynasty|La dinastía Han|La dynastie Han|漢",
    ],
    2,
    "The roughly sixty years of rival warlord states that followed have since become one of the most retold stories in Chinese culture, the basis for centuries of opera, a classic 14th-century novel, and modern video games and films.|Los aproximadamente sesenta años de estados rivales de señores de la guerra que siguieron se han convertido desde entonces en una de las historias más recontadas de la cultura china, base de siglos de ópera, una novela clásica del siglo XIV, y videojuegos y películas modernas.|Les quelque soixante années d'États rivaux dirigés par des seigneurs de guerre qui suivirent sont depuis devenues l'une des histoires les plus racontées de la culture chinoise, à la base de siècles d'opéra, d'un roman classique du XIVe siècle, et de jeux vidéo et films modernes.|その後およそ六十年続いた群雄割拠の時代は、いまや中国文化で最も繰り返し語られる物語の一つとなり、何世紀にもわたる京劇や14世紀の古典小説、現代の映画やゲームの題材にもなっている。",
  ),
  q(
    7,
    "For decades, government-subsidised central heating in winter was built into apartment buildings only north of a certain dividing line, following the same boundary used to split China's wheat-growing north from its rice-growing south. What is that line?|Durante décadas, la calefacción central subvencionada por el gobierno en invierno se instaló en los edificios de apartamentos solo al norte de cierta línea divisoria, siguiendo el mismo límite usado para separar el norte triguero de China de su sur arrocero. ¿Cuál es esa línea?|Pendant des décennies, le chauffage central subventionné par l'État en hiver n'a été installé dans les immeubles d'habitation qu'au nord d'une certaine ligne de démarcation, suivant la même frontière utilisée pour séparer le nord du blé de la Chine de son sud rizicole. Quelle est cette ligne ?|何十年ものあいだ、政府が補助する冬の集中暖房は、中国の小麦地帯の北部と稲作地帯の南部を分けるのと同じ境界より北のアパートにしか整備されなかった。その境界とは?",
    [
      "The Qinling–Huai River line|La línea Qinling-río Huai|La ligne Qinling-Huai|秦嶺・淮河線",
      "The Great Wall|La Gran Muralla|La Grande Muraille|万里の長城",
      "The Tropic of Cancer|El trópico de Cáncer|Le tropique du Cancer|北回帰線",
    ],
    0,
    "The policy, inherited from mid-20th-century central planning, meant cities just south of the line, though sometimes just as cold in winter, went without built-in heating for decades, leaving residents there to rely on space heaters and extra layers instead.|La política, heredada de la planificación central de mediados del siglo XX, hizo que ciudades justo al sur de la línea, aunque a veces igual de frías en invierno, se quedaran sin calefacción integrada durante décadas, dejando a sus habitantes depender de calefactores portátiles y capas de ropa extra.|Cette politique, héritée de la planification centrale du milieu du XXe siècle, a fait que des villes situées juste au sud de la ligne, bien que parfois tout aussi froides en hiver, se sont retrouvées sans chauffage intégré pendant des décennies, laissant leurs habitants dépendre de radiateurs d'appoint et de vêtements superposés.|20世紀半ばの中央計画から受け継がれたこの制度により、この境界のすぐ南にある都市は冬に同じくらい寒いこともあるのに、何十年も備え付けの暖房なしで過ごしてきた。住民はポータブルヒーターや重ね着で寒さをしのぐしかなかった。",
  ),
  q(
    7,
    "The Zhuang, China's largest officially recognised ethnic minority group by population, live mainly in which southern region?|Los zhuang, el grupo étnico minoritario oficialmente reconocido más numeroso de China, viven principalmente en qué región del sur?|Les Zhuang, le plus important groupe ethnique minoritaire officiellement reconnu de Chine par sa population, vivent principalement dans quelle région du sud ?|人口で中国最大の公式認定少数民族であるチワン族が主に暮らす南部の地域はどこか?",
    [
      "Yunnan|Yunnan|Le Yunnan|雲南",
      "Guangxi|Guangxi|Le Guangxi|広西",
      "Hainan|Hainan|Hainan|海南",
    ],
    1,
    "Numbering close to 20 million people, the Zhuang have their own Tai-Kadai language, related more closely to Thai and Lao than to Mandarin, and the region is officially designated the Guangxi Zhuang Autonomous Region in recognition of them.|Con una población cercana a los 20 millones, los zhuang tienen su propia lengua tai-kadai, más emparentada con el tailandés y el lao que con el mandarín, y la región está designada oficialmente como Región Autónoma Zhuang de Guangxi en su reconocimiento.|Comptant près de 20 millions de personnes, les Zhuang ont leur propre langue taï-kadaï, plus proche du thaï et du lao que du mandarin, et la région est officiellement désignée région autonome zhuang du Guangxi en leur reconnaissance.|チワン族はおよそ2,000万人に迫る人口を数え、標準中国語よりもタイ語やラオス語に近いタイ・カダイ語族の独自の言語を持つ。この地域は彼らを認めて公式に「広西チワン族自治区」と定められている。",
  ),
  q(
    7,
    "The traditional Chinese unit of weight still used by market vendors and shoppers today, roughly equal to half a kilogram, is called what?|La unidad tradicional china de peso que aún usan hoy vendedores y compradores en los mercados, equivalente aproximadamente a medio kilogramo, ¿cómo se llama?|L'unité de poids traditionnelle chinoise encore utilisée aujourd'hui par les vendeurs de marché et les acheteurs, équivalant à peu près à un demi-kilogramme, comment s'appelle-t-elle ?|今日でも市場の売り手や買い物客が使う、およそ0.5キログラムに当たる中国の伝統的な重さの単位は何と呼ばれるか?",
    [
      "The dan|Dan|Le dan|石(たん)",
      "The liang|Liang|Le liang|両",
      "The jin|Jin|Le jin|市斤",
    ],
    2,
    "Fruit, vegetables and meat are still commonly priced by this unit in Chinese markets rather than by the kilogram, and it is a different value from Japan's traditional \"kin,\" which is fixed at 600 grams instead.|Frutas, verduras y carne todavía se venden a menudo por esta unidad en los mercados chinos en vez de por kilogramo, y su valor es distinto del «kin» tradicional japonés, fijado en 600 gramos.|Fruits, légumes et viande sont encore souvent vendus selon cette unité sur les marchés chinois plutôt qu'au kilogramme, et sa valeur diffère du « kin » traditionnel japonais, fixé lui à 600 grammes.|中国の市場ではいまも果物や野菜、肉がキログラムではなくこの単位で値付けされることが多い。値は日本の伝統的な単位「斤」(600グラム)とは異なる。",
  ),
  q(
    7,
    "Historically, why was the number nine treated as especially auspicious in Chinese imperial ritual and design, appearing repeatedly in palace architecture and royal ceremony?|Históricamente, ¿por qué se trataba el número nueve como especialmente auspicioso en el ritual y el diseño imperial chino, apareciendo repetidamente en la arquitectura palaciega y la ceremonia real?|Historiquement, pourquoi le chiffre neuf était-il considéré comme particulièrement propice dans le rituel et le design impériaux chinois, apparaissant sans cesse dans l'architecture des palais et les cérémonies royales ?|中国の帝政期の儀礼や意匠で、宮殿建築や宮廷の儀式に繰り返し現れるほど、数字の九が特に縁起がよいとされてきたのはなぜか?",
    [
      "It sounds like the word for \"long-lasting\"|Suena como la palabra para «duradero»|Il ressemble au mot pour « durable »|「久しい」を意味する語と音が似ているから",
      "It was the emperor's birth-year animal|Era el animal del año de nacimiento del emperador|C'était l'animal de l'année de naissance de l'empereur|皇帝の生まれ年の動物だったから",
      "It matched the number of imperial provinces|Coincidía con el número de provincias imperiales|Il correspondait au nombre de provinces impériales|帝国の州の数と一致していたから",
    ],
    0,
    "As the largest single-digit odd number, nine was also considered the most purely \"yang,\" or masculine and powerful, of all numbers, which is why it turns up so often in counts of gates, dragon carvings and ceremonial steps around former imperial buildings.|Como el mayor número impar de una sola cifra, el nueve también se consideraba el más puramente «yang», es decir, masculino y poderoso, de todos los números, por lo que aparece tan a menudo en el número de puertas, tallas de dragones y escalones ceremoniales de antiguos edificios imperiales.|En tant que plus grand nombre impair à un chiffre, le neuf était aussi considéré comme le plus purement « yang », c'est-à-dire masculin et puissant, de tous les nombres, ce qui explique sa fréquente apparition dans le nombre de portes, de sculptures de dragons et de marches cérémonielles des anciens bâtiments impériaux.|一桁の奇数として最大であることから、九はあらゆる数の中で最も純粋な「陽」、すなわち男性的で力強い数ともされた。これが、かつての宮殿建築で門の数や龍の彫刻、儀式用の階段の段数にこの数字がたびたび現れる理由である。",
  ),
  q(
    8,
    "Chinese farmers still commonly measure land in a traditional unit called the mu, equal to roughly how much of a hectare?|Los agricultores chinos aún miden la tierra habitualmente en una unidad tradicional llamada mu, equivalente aproximadamente a qué fracción de una hectárea?|Les agriculteurs chinois mesurent encore couramment les terres en une unité traditionnelle appelée mu, équivalant à peu près à quelle fraction d'un hectare ?|中国の農民はいまも「畝(ムー)」という伝統的な単位で土地を測ることが多いが、これはおよそ1ヘクタールのどれくらいに当たるか?",
    [
      "A tenth|Una décima parte|Un dixième|10分の1",
      "A fifteenth|Una quinceava parte|Un quinzième|15分の1",
      "A third|Un tercio|Un tiers|3分の1",
    ],
    1,
    "A mu works out to about 667 square metres, and land contracts, agricultural statistics and even everyday conversation among farmers still often use it instead of the internationally standard hectare.|Un mu equivale a unos 667 metros cuadrados, y los contratos de tierras, las estadísticas agrícolas e incluso la conversación cotidiana entre agricultores todavía suelen usarlo en lugar de la hectárea, estándar internacional.|Un mu équivaut à environ 667 mètres carrés, et les contrats fonciers, les statistiques agricoles et même les conversations quotidiennes entre agriculteurs l'utilisent encore souvent à la place de l'hectare, la norme internationale.|一畝はおよそ667平方メートルに当たり、土地の契約や農業統計、農民同士の日常の会話でも、国際標準のヘクタールではなくこちらがいまも使われることが多い。",
  ),
  q(
    8,
    "Which major branch of the Chinese language family, spoken mainly in Fujian province and among overseas Chinese communities in Southeast Asia, is considered one of the most divergent from Mandarin, having split off unusually early?|¿Qué gran rama de la familia lingüística china, hablada principalmente en la provincia de Fujian y entre comunidades chinas de ultramar en el sudeste asiático, se considera una de las más divergentes del mandarín, tras separarse de forma inusualmente temprana?|Quelle grande branche de la famille linguistique chinoise, parlée principalement dans la province du Fujian et parmi les communautés chinoises d'outre-mer en Asie du Sud-Est, est considérée comme l'une des plus divergentes par rapport au mandarin, s'étant séparée particulièrement tôt ?|主に福建省と東南アジアの華人社会で話され、標準中国語から異例に早く分かれたため中国語系統の中でも隔たりが特に大きいとされる大きな一派は?",
    [
      "Wu|Wu|Le wu|呉語",
      "Hakka|Hakka|Le hakka|客家語",
      "Min|Min|Le min|閩語",
    ],
    2,
    "Linguists believe this branch split away before some sound changes that shaped most other varieties of Chinese, which is part of why its numerous local varieties, from Fujian's coast to communities as far as the Philippines and Malaysia, can sound strikingly different even from each other.|Los lingüistas creen que esta rama se separó antes de algunos cambios fonéticos que dieron forma a la mayoría de las demás variedades del chino, lo que explica en parte por qué sus numerosas variedades locales, desde la costa de Fujian hasta comunidades tan lejanas como Filipinas y Malasia, pueden sonar sorprendentemente distintas incluso entre sí.|Les linguistes pensent que cette branche s'est séparée avant certains changements phonétiques qui ont façonné la plupart des autres variétés de chinois, ce qui explique en partie pourquoi ses nombreuses variétés locales, de la côte du Fujian à des communautés aussi lointaines que les Philippines et la Malaisie, peuvent sonner étonnamment différentes même entre elles.|言語学者によれば、この一派は他の多くの中国語系統を形づくった音変化が起こる前に分かれたとされ、これが福建沿岸からフィリピンやマレーシアの華人社会に至るまで、数多いその地方変種が互いにさえ驚くほど違って聞こえることがある理由の一つである。",
  ),
  q(
    8,
    "Opened in 2011, which high-speed rail line directly connecting China's political and financial capitals became one of the busiest and most profitable in the world?|Inaugurada en 2011, ¿qué línea de alta velocidad que conecta directamente las capitales política y financiera de China se convirtió en una de las más transitadas y rentables del mundo?|Ouverte en 2011, quelle ligne à grande vitesse reliant directement les capitales politique et financière de la Chine est devenue l'une des plus fréquentées et rentables au monde ?|2011年に開通し、中国の政治の中心と経済の中心を直結する路線として、世界でも屈指の利用者数と収益を上げるようになった高速鉄道は?",
    [
      "The Beijing–Shanghai High-Speed Railway|El ferrocarril de alta velocidad Pekín-Shanghái|Le chemin de fer à grande vitesse Pékin-Shanghai|京滬高速鉄道",
      "The Beijing–Guangzhou High-Speed Railway|El ferrocarril de alta velocidad Pekín-Cantón|Le chemin de fer à grande vitesse Pékin-Canton|京広高速鉄道",
      "The Chengdu–Chongqing High-Speed Railway|El ferrocarril de alta velocidad Chengdu-Chongqing|Le chemin de fer à grande vitesse Chengdu-Chongqing|成渝高速鉄道",
    ],
    0,
    "Stretching about 1,318 kilometres and built for a design speed of 350 kilometres per hour, the line cut travel time between the two cities from over ten hours by conventional train to well under five, and it turned a profit within just a few years of opening, unusual for a rail megaproject.|Con unos 1318 kilómetros y construida para una velocidad de diseño de 350 kilómetros por hora, la línea redujo el tiempo de viaje entre ambas ciudades de más de diez horas en tren convencional a bastante menos de cinco, y dio beneficios a los pocos años de su apertura, algo inusual en un megaproyecto ferroviario.|S'étendant sur environ 1 318 kilomètres et conçue pour une vitesse de 350 kilomètres par heure, la ligne a réduit le temps de trajet entre les deux villes de plus de dix heures en train classique à bien moins de cinq heures, et elle est devenue rentable seulement quelques années après son ouverture, chose rare pour un mégaprojet ferroviaire.|全長およそ1,318キロメートル、設計最高速度時速350キロメートルのこの路線は、在来線で十時間以上かかっていた両都市間の所要時間を五時間足らずに縮めた。開通からわずか数年で黒字化したのも、鉄道の巨大事業としては珍しい。",
  ),
  q(
    8,
    "The Uyghur language, spoken by a Turkic-speaking minority mostly in China's northwest, is today mainly written using which type of script?|La lengua uigur, hablada por una minoría de habla turca principalmente en el noroeste de China, se escribe hoy principalmente con qué tipo de escritura?|La langue ouïghoure, parlée par une minorité turcophone principalement dans le nord-ouest de la Chine, s'écrit aujourd'hui principalement à l'aide de quel type d'écriture ?|中国北西部に多く暮らすテュルク系少数民族が話すウイグル語は、今日主にどの系統の文字で書かれているか?",
    [
      "A Cyrillic-based script|Una escritura basada en el cirílico|Une écriture d'origine cyrillique|キリル文字系",
      "A modified Arabic-based script|Una escritura árabe modificada|Une écriture arabe modifiée|アラビア文字系",
      "A Devanagari-based script|Una escritura basada en el devanagari|Une écriture d'origine devanagari|デーヴァナーガリー系",
    ],
    1,
    "The Turkic language itself is unrelated to Chinese and to Arabic, but its writing system reflects the spread of Islam into Central Asia centuries ago; over the 20th century the script used for it was also officially changed to Latin and back more than once before settling on its current form.|La lengua turca en sí no está emparentada con el chino ni con el árabe, pero su sistema de escritura refleja la expansión del islam en Asia central siglos atrás; a lo largo del siglo XX, la escritura usada para ella también cambió oficialmente al alfabeto latino y de vuelta más de una vez antes de fijarse en su forma actual.|Cette langue turcique n'a elle-même aucun lien avec le chinois ni avec l'arabe, mais son système d'écriture reflète la propagation de l'islam en Asie centrale il y a des siècles ; au cours du XXe siècle, l'écriture utilisée a aussi été officiellement changée pour le latin puis inversée plus d'une fois avant de se fixer sous sa forme actuelle.|この言語自体は中国語ともアラビア語とも系統が異なるが、その文字体系は何世紀も前にイスラームが中央アジアに広まったことを映している。20世紀を通じて、この言語の表記はラテン文字へと公式に変えられては戻されることが一度ならずあり、いまの形に落ち着いた。",
  ),
  q(
    8,
    "Which ethnic minority, concentrated across Sichuan, Yunnan and Guizhou, has historically used one of the few genuinely logographic scripts in the world outside Chinese characters themselves?|¿Qué minoría étnica, concentrada en Sichuan, Yunnan y Guizhou, ha usado históricamente una de las pocas escrituras genuinamente logográficas del mundo, además de los propios caracteres chinos?|Quelle minorité ethnique, concentrée dans le Sichuan, le Yunnan et le Guizhou, a historiquement utilisé l'une des rares écritures véritablement logographiques au monde, en dehors des caractères chinois eux-mêmes ?|四川・雲南・貴州にまたがって多く暮らし、漢字そのものを除けば世界でも数少ない真に表語的な文字体系を歴史的に用いてきた少数民族は?",
    [
      "The Miao|Los miao|Les Miao|ミャオ族",
      "The Bai|Los bai|Les Bai|ペー族",
      "The Yi|Los yi|Les Yi|イ族",
    ],
    2,
    "The classical script, refined over centuries by ritual priests, was standardised into a modern syllabary of over 800 characters in the 1970s for everyday use in schools and publishing, alongside Chinese.|La escritura clásica, refinada durante siglos por sacerdotes rituales, se estandarizó en un silabario moderno de más de 800 caracteres en los años setenta para su uso cotidiano en escuelas y publicaciones, junto al chino.|L'écriture classique, affinée pendant des siècles par des prêtres rituels, a été standardisée dans les années 1970 en un syllabaire moderne de plus de 800 caractères, destiné à un usage quotidien dans les écoles et l'édition, aux côtés du chinois.|儀礼を司る祭司たちが何世紀もかけて磨いてきた古典的な文字体系は、1970年代に800字を超える現代の音節文字として標準化され、中国語と並んで学校教育や出版で日常的に使われている。",
  ),
  q(
    8,
    "On the Yangtze River, which structure holds the record for the world's largest power station by installed generating capacity?|En el río Yangtsé, ¿qué estructura ostenta el récord de la mayor central eléctrica del mundo por capacidad instalada?|Sur le Yangtsé, quelle structure détient le record de la plus grande centrale électrique du monde par capacité installée ?|長江にあり、発電設備容量で世界最大の発電所という記録を持つ構造物は?",
    [
      "The Three Gorges Dam|La presa de las Tres Gargantas|Le barrage des Trois Gorges|三峡ダム",
      "The Hoover Dam|La presa Hoover|Le barrage Hoover|フーバーダム",
      "The Itaipu Dam|La presa de Itaipú|Le barrage d'Itaipu|イタイプダム",
    ],
    0,
    "Building it required relocating well over a million people and flooding towns, farmland and archaeological sites along the river valley, making it one of the largest resettlement projects ever carried out for a single piece of infrastructure.|Su construcción requirió reubicar a más de un millón de personas e inundar pueblos, tierras de cultivo y yacimientos arqueológicos a lo largo del valle fluvial, lo que la convierte en uno de los mayores proyectos de reasentamiento jamás realizados para una sola infraestructura.|Sa construction a nécessité de reloger plus d'un million de personnes et d'inonder des villes, des terres agricoles et des sites archéologiques le long de la vallée du fleuve, ce qui en fait l'un des plus vastes projets de relogement jamais menés pour une seule infrastructure.|建設には百万人を優に超える人々の移住が必要で、川の谷に沿った町や農地、遺跡が水没した。単一のインフラ事業としては史上最大級の移住計画の一つとなった。",
  ),
  q(
    8,
    "After unifying China's warring states in 221 BC, the short-lived Qin dynasty is credited with standardising which two things across the newly formed empire, alongside its currency?|Tras unificar los estados en guerra de China en el 221 a. C., ¿qué dos cosas se atribuyen a la efímera dinastía Qin haber estandarizado en todo el imperio recién formado, además de su moneda?|Après avoir unifié les États en guerre de la Chine en 221 av. J.-C., la dynastie Qin, de courte durée, est créditée d'avoir standardisé quels deux éléments à travers l'empire nouvellement formé, en plus de sa monnaie ?|紀元前221年に争い合う国々を統一したのち、短命だった秦王朝は通貨に加えて、新たに生まれた帝国全体で何と何を標準化したとされるか?",
    [
      "Religious calendars and burial rites|Los calendarios religiosos y los ritos funerarios|Les calendriers religieux et les rites funéraires|宗教暦と葬儀の作法",
      "The writing script and units of weights and measures|La escritura y las unidades de pesos y medidas|L'écriture et les unités de poids et mesures|文字と度量衡",
      "Military ranks and court dress codes|Los rangos militares y el código de vestimenta de la corte|Les grades militaires et le code vestimentaire de la cour|軍の階級と宮廷の服装規定",
    ],
    1,
    "Before unification, rival states had used different character forms and incompatible measures for length, volume and weight, which made trade and administration difficult across their borders; the new standards helped bind the vast new territory together even after the dynasty itself fell within about fifteen years.|Antes de la unificación, los estados rivales usaban formas de caracteres distintas y medidas de longitud, volumen y peso incompatibles entre sí, lo que dificultaba el comercio y la administración a través de sus fronteras; los nuevos estándares ayudaron a cohesionar el vasto nuevo territorio incluso después de que la propia dinastía cayera en apenas quince años.|Avant l'unification, les États rivaux utilisaient des formes de caractères différentes et des mesures de longueur, de volume et de poids incompatibles entre elles, ce qui compliquait le commerce et l'administration entre leurs frontières ; les nouvelles normes ont aidé à souder ce vaste nouveau territoire, même après la chute de la dynastie elle-même en une quinzaine d'années à peine.|統一前は争い合う国々がそれぞれ違う字体や、互いに換算できない長さ・体積・重さの単位を使っており、国境を越えた交易や統治の妨げになっていた。新しい基準は、王朝自体がわずか十五年ほどで滅んだあとも、広大な新領土を結びつける助けとなった。",
  ),
  q(
    9,
    "To stop the ground beneath long stretches of the Qinghai–Tibet Railway from thawing and refreezing unevenly and damaging the track, engineers buried thousands of what kind of device alongside the roadbed?|Para impedir que el terreno bajo largos tramos del ferrocarril Qinghai-Tíbet se descongelara y volviera a helar de forma desigual y dañara la vía, los ingenieros enterraron miles de qué tipo de dispositivo junto a la plataforma?|Pour empêcher que le sol sous de longs tronçons du chemin de fer Qinghai-Tibet ne dégèle et ne regèle de façon inégale, endommageant la voie, les ingénieurs ont enterré des milliers de quel type de dispositif le long de la plateforme ?|青蔵鉄道の長い区間で地面が不均一に融けたり凍ったりして線路を傷めるのを防ぐため、技術者たちは盛土の脇に何千個ものどんな装置を埋め込んだか?",
    [
      "Seismic dampers|Amortiguadores sísmicos|Des amortisseurs sismiques|免震装置",
      "Solar-powered fans|Ventiladores solares|Des ventilateurs solaires|太陽光ファン",
      "Passive cooling pipes|Tubos de enfriamiento pasivo|Des tuyaux de refroidissement passif|冷却パイプ",
    ],
    2,
    "These sealed pipes, filled with a liquid that evaporates and condenses with the seasons, draw heat out of the ground in winter without needing any electricity, keeping the permafrost frozen and stable even as air temperatures rise in summer above it.|Estos tubos sellados, llenos de un líquido que se evapora y condensa con las estaciones, extraen calor del suelo en invierno sin necesitar electricidad, manteniendo el permafrost helado y estable incluso cuando la temperatura del aire sube en verano por encima de él.|Ces tuyaux scellés, remplis d'un liquide qui s'évapore et se condense au fil des saisons, extraient la chaleur du sol en hiver sans avoir besoin d'électricité, maintenant le pergélisol gelé et stable même quand la température de l'air augmente en été au-dessus.|季節によって蒸発と凝縮を繰り返す液体を封じ込めたこの密閉パイプは、電力を使わずに冬のあいだ地中から熱を吸い出し、夏に地表の気温が上がっても永久凍土を凍ったまま安定させる。",
  ),
  q(
    9,
    "Saying the number 250 aloud in Chinese is widely understood, outside of any actual counting, as an insult roughly meaning what?|Decir en voz alta el número 250 en chino se entiende ampliamente, fuera de cualquier conteo real, como un insulto que significa aproximadamente qué?|Dire à voix haute le nombre 250 en chinois est largement compris, en dehors de tout comptage réel, comme une insulte signifiant à peu près quoi ?|中国語で実際に何かを数えているのでもないのに「250」と口にすると、広く通じる侮辱として受け取られるが、それはおおよそどんな意味か?",
    [
      "\"Idiot\" or \"fool\"|«Idiota» o «tonto»|« Idiot » ou « imbécile »|「間抜け」「馬鹿」",
      "\"Coward\"|«Cobarde»|« Lâche »|「臆病者」",
      "\"Liar\"|«Mentiroso»|« Menteur »|「嘘つき」",
    ],
    0,
    "Several folk explanations circulate for the insult's origin, including an old story about splitting a unit of copper coins unevenly in half, but whatever the true source, calling someone \"two-fifty\" to their face in Mandarin is still heard as a genuine jab today.|Circulan varias explicaciones populares sobre el origen del insulto, entre ellas una vieja historia sobre repartir de forma desigual una unidad de monedas de cobre, pero sea cual sea el verdadero origen, llamar a alguien «dos-cincuenta» a la cara en mandarín sigue oyéndose hoy como una pulla real.|Plusieurs explications populaires circulent sur l'origine de cette insulte, dont une vieille histoire à propos du partage inégal d'une unité de pièces de cuivre, mais quelle que soit la véritable origine, traiter quelqu'un de « deux cent cinquante » en face en mandarin reste aujourd'hui entendu comme une vraie pique.|この侮辱の由来については、銅銭のひとまとめを不揃いに分けたという古い話をはじめ、いくつもの俗説が語られている。真の由来がどうであれ、標準中国語で面と向かって「二百五」と呼ぶのは、いまも本物の皮肉として受け取られる。",
  ),
  q(
    9,
    "Despite mainland China's switch to simplified characters, traditional Chinese characters remain the official written standard in which two Chinese cities?|A pesar del cambio de la China continental a los caracteres simplificados, los caracteres chinos tradicionales siguen siendo el estándar escrito oficial en qué dos ciudades chinas?|Malgré le passage de la Chine continentale aux caractères simplifiés, les caractères chinois traditionnels restent la norme écrite officielle dans quelles deux villes chinoises ?|中国本土が簡体字に切り替えたにもかかわらず、繁体字がいまも公式の書き言葉の標準であり続けている二つの都市はどこか?",
    [
      "Chengdu and Chongqing|Chengdu y Chongqing|Chengdu et Chongqing|成都と重慶",
      "Hong Kong and Macau|Hong Kong y Macao|Hong Kong et Macao|香港とマカオ",
      "Tianjin and Dalian|Tianjin y Dalian|Tianjin et Dalian|天津と大連",
    ],
    1,
    "Both cities, governed as special administrative regions with their own legal and education systems, kept the older character forms they used before returning to Chinese sovereignty in the late 1990s, so street signs, newspapers and schoolbooks there still look noticeably different from those on the mainland.|Ambas ciudades, gobernadas como regiones administrativas especiales con sus propios sistemas legales y educativos, conservaron las formas de caracteres más antiguas que usaban antes de volver a la soberanía china a finales de los noventa, así que los letreros, los periódicos y los libros de texto allí todavía se ven notablemente distintos de los del continente.|Les deux villes, administrées comme régions administratives spéciales avec leurs propres systèmes juridique et éducatif, ont conservé les anciennes formes de caractères qu'elles utilisaient avant leur retour sous souveraineté chinoise à la fin des années 1990, si bien que panneaux de rue, journaux et manuels scolaires y ont encore une apparence nettement différente de ceux du continent.|両都市とも独自の法制度と教育制度を持つ特別行政区として統治されており、1990年代末に中国の主権下に復帰する前から使っていた古い字体をそのまま残している。そのため街の看板や新聞、教科書は、本土のものとは今でも目に見えて違う姿をしている。",
  ),
  q(
    9,
    "Although gunpowder itself was discovered earlier, its first widespread use in weapons such as fire lances and early rockets is credited mainly to which dynasty, centuries before firearms reached Europe?|Aunque la propia pólvora se descubrió antes, ¿a qué dinastía se atribuye principalmente su primer uso generalizado en armas como lanzas de fuego y cohetes primitivos, siglos antes de que las armas de fuego llegaran a Europa?|Bien que la poudre à canon elle-même ait été découverte plus tôt, son premier usage répandu dans des armes comme les lances à feu et les premières roquettes est attribué principalement à quelle dynastie, des siècles avant que les armes à feu n'atteignent l'Europe ?|火薬そのものの発見はさらに早いが、火槍や初期のロケットといった兵器への本格的な利用は主にどの王朝の功績とされ、それはヨーロッパに銃火器が伝わるより何世紀も前のことか?",
    [
      "The Yuan dynasty|La dinastía Yuan|La dynastie Yuan|元",
      "The Qing dynasty|La dinastía Qing|La dynastie Qing|清",
      "The Song dynasty|La dinastía Song|La dynastie Song|宋",
    ],
    2,
    "Alchemists searching for an elixir of immortality are said to have stumbled on the explosive mixture centuries earlier under the Tang, but it was Song-dynasty armies, fighting frequent wars on multiple fronts, that developed and deployed it on the battlefield at scale.|Se dice que unos alquimistas que buscaban un elixir de la inmortalidad dieron con la mezcla explosiva siglos antes, bajo los Tang, pero fueron los ejércitos de la dinastía Song, que libraban guerras frecuentes en varios frentes, quienes la desarrollaron y desplegaron en el campo de batalla a gran escala.|Des alchimistes en quête d'un élixir d'immortalité seraient tombés sur ce mélange explosif des siècles plus tôt, sous les Tang, mais ce sont les armées de la dynastie Song, menant de fréquentes guerres sur plusieurs fronts, qui l'ont développé et déployé sur le champ de bataille à grande échelle.|不老不死の霊薬を探していた錬金術師たちが、それより何世紀も前の唐代にこの爆発性の混合物に偶然行き当たったと伝わる。だがそれを実際に開発し、戦場で大規模に用いたのは、複数の戦線で頻繁に戦を交えていた宋代の軍勢だった。",
  ),
  q(
    9,
    "Because Xinjiang lies so far west of Beijing yet still follows official Beijing time, many residents there also informally keep to a local time roughly how many hours behind it?|Como Xinjiang está tan al oeste de Pekín pero sigue la hora oficial de Pekín, muchos residentes allí también mantienen extraoficialmente una hora local aproximadamente cuántas horas por detrás?|Le Xinjiang se trouvant si loin à l'ouest de Pékin tout en suivant l'heure officielle de Pékin, de nombreux habitants y observent aussi officieusement une heure locale à peu près combien d'heures en retard ?|新疆は北京から遠く西に離れているのに公式には北京時間に従っているが、多くの住民はそこから何時間ほど遅れた地方時も非公式に使っているか?",
    [
      "About two hours|Unas dos horas|Environ deux heures|およそ2時間",
      "About thirty minutes|Unos treinta minutos|Environ trente minutes|およそ30分",
      "About five hours|Unas cinco horas|Environ cinq heures|およそ5時間",
    ],
    0,
    "Government offices in the region generally still post official Beijing hours, but shops, schools and daily routines set by ordinary residents often run on this unofficial local time instead, so a business might list two different opening times depending on who you ask.|Las oficinas gubernamentales de la región suelen seguir publicando el horario oficial de Pekín, pero las tiendas, las escuelas y las rutinas diarias fijadas por los residentes corrientes a menudo funcionan con esta hora local extraoficial, así que un negocio puede tener dos horarios de apertura distintos según a quién se pregunte.|Les bureaux gouvernementaux de la région affichent généralement encore l'heure officielle de Pékin, mais les commerces, les écoles et le quotidien des habitants ordinaires suivent souvent cette heure locale officieuse à la place, si bien qu'un commerce peut afficher deux horaires d'ouverture différents selon la personne interrogée.|この地域の政府機関はおおむねいまも公式には北京時間を掲げているが、店や学校、住民の日々の暮らしはこの非公式な地方時に従うことが多く、同じ店でも尋ねる相手によって開店時刻が二通り答えられることもある。",
  ),
  q(
    9,
    "What is the name of the ancient Chinese mathematics text, compiled roughly 2,000 years ago, that contains early methods for solving systems of linear equations and working with negative numbers?|¿Cómo se llama el antiguo texto matemático chino, compilado hace unos 2000 años, que contiene métodos tempranos para resolver sistemas de ecuaciones lineales y trabajar con números negativos?|Comment s'appelle l'ancien texte mathématique chinois, compilé il y a environ 2 000 ans, qui contient des méthodes précoces pour résoudre des systèmes d'équations linéaires et manipuler des nombres négatifs ?|およそ2,000年前にまとめられ、連立一次方程式を解く方法や負の数の扱いを早くから記していた中国の古い数学書は何と呼ばれるか?",
    [
      "The Analects|Las Analectas|Les Entretiens|論語",
      "The Nine Chapters on the Mathematical Art|Los Nueve Capítulos sobre el Arte Matemático|Les Neuf Chapitres sur l'art mathématique|九章算術",
      "The Book of Documents|El Libro de los Documentos|Le Classique des documents|書経",
    ],
    1,
    "Compiled and expanded by multiple authors over several centuries, the text is organised as a series of practical problems, on subjects from land surveying to grain taxes, each followed by its solution method, a format closer to a modern workbook than to a theoretical treatise.|Compilado y ampliado por varios autores a lo largo de varios siglos, el texto se organiza como una serie de problemas prácticos, sobre temas que van de la agrimensura a los impuestos sobre el grano, cada uno seguido de su método de solución, un formato más cercano a un cuaderno de ejercicios moderno que a un tratado teórico.|Compilé et enrichi par plusieurs auteurs sur plusieurs siècles, le texte est organisé comme une série de problèmes pratiques, sur des sujets allant de l'arpentage aux taxes sur le grain, chacun suivi de sa méthode de résolution, un format plus proche d'un cahier d'exercices moderne que d'un traité théorique.|複数の著者によって数世紀をかけてまとめられ、増補されてきたこの書は、土地測量から穀物税まで幅広い主題の実用的な問題を並べ、それぞれに解き方を添える構成をとる。理論書というより現代の問題集に近い形である。",
  ),
  q(
    9,
    "Which of the Confucian \"Five Classics,\" used for both divination and philosophy, is thought to be the oldest of the group, with roots reaching back to the early Zhou dynasty?|¿Cuál de los «Cinco Clásicos» confucianos, usado tanto para la adivinación como para la filosofía, se considera el más antiguo del grupo, con raíces que llegan hasta principios de la dinastía Zhou?|Lequel des « Cinq Classiques » confucéens, utilisé à la fois pour la divination et la philosophie, est considéré comme le plus ancien du groupe, avec des racines remontant au début de la dynastie Zhou ?|占いと哲学の両方に用いられる儒教の「五経」のうち、周王朝の初期にまでさかのぼる、その中で最も古いとされる書物は?",
    [
      "The Book of Rites|El Libro de los Ritos|Le Livre des rites|礼記",
      "The Spring and Autumn Annals|Los Anales de Primavera y Otoño|Les Annales des Printemps et Automnes|春秋",
      "The I Ching (Book of Changes)|El I Ching (Libro de los Cambios)|Le Yi Jing (Livre des mutations)|易経",
    ],
    2,
    "At its core is a set of 64 six-line symbols called hexagrams, each paired with cryptic text once consulted for guidance by tossing coins or yarrow stalks; over the centuries it has also been read as a work of cosmology and philosophy well beyond its original divinatory use.|En su núcleo hay un conjunto de 64 símbolos de seis líneas llamados hexagramas, cada uno emparejado con un texto críptico antes consultado para pedir consejo lanzando monedas o tallos de milenrama; a lo largo de los siglos también se ha leído como obra de cosmología y filosofía, mucho más allá de su uso adivinatorio original.|En son cœur se trouve un ensemble de 64 symboles à six lignes appelés hexagrammes, chacun associé à un texte cryptique jadis consulté pour obtenir des conseils en lançant des pièces ou des tiges d'achillée ; au fil des siècles, il a aussi été lu comme une œuvre de cosmologie et de philosophie, bien au-delà de son usage divinatoire d'origine.|その核となるのは「卦」と呼ばれる六本の線からなる64通りの図形で、それぞれに謎めいた文が添えられ、かつては硬貨や蓍草の茎を使って占いのために読まれた。何世紀もの間に、本来の占いの用途をはるかに超え、宇宙観や哲学の書としても読まれてきた。",
  ),
  q(
    9,
    "Compiled in 1716 under Emperor Kangxi, an influential dictionary organised tens of thousands of Chinese characters by which classification system, still commonly referenced today?|Compilado en 1716 bajo el emperador Kangxi, un influyente diccionario organizó decenas de miles de caracteres chinos según qué sistema de clasificación, todavía consultado habitualmente hoy?|Compilé en 1716 sous l'empereur Kangxi, un dictionnaire influent a classé des dizaines de milliers de caractères chinois selon quel système de classification, encore couramment consulté aujourd'hui ?|1716年、康熙帝の代にまとめられた影響力の大きい辞書は、いまも一般に参照され続けているどんな分類法で何万もの漢字を整理したか?",
    [
      "214 radicals|214 radicales|214 clés (radicaux)|214の部首",
      "Stroke count alone, with no other grouping|Solo el número de trazos, sin otra agrupación|Le nombre de traits seul, sans autre regroupement|画数のみで、他の分類なし",
      "Alphabetical order by pronunciation|Orden alfabético por pronunciación|L'ordre alphabétique de la prononciation|発音のアルファベット順",
    ],
    0,
    "Each character is filed under one core component believed to hint at its meaning or sound, then sorted within that group by how many extra strokes it adds; the dictionary's system became so influential that paper dictionaries built on the same 214-radical scheme are still printed today.|Cada carácter se archiva bajo un componente central que se cree indica su significado o sonido, y luego se ordena dentro de ese grupo según cuántos trazos adicionales añade; el sistema del diccionario resultó tan influyente que aún hoy se imprimen diccionarios en papel basados en el mismo esquema de 214 radicales.|Chaque caractère est classé sous une composante centrale censée indiquer son sens ou son son, puis trié au sein de ce groupe selon le nombre de traits supplémentaires qu'il ajoute ; le système du dictionnaire est devenu si influent que des dictionnaires papier fondés sur ce même schéma à 214 clés sont encore imprimés aujourd'hui.|それぞれの漢字は、意味や音の手がかりとされる中心となる部分のもとに分類され、その中でさらに画数の多さで並べられる。この辞書の分類法は大きな影響力を持ち、いまも同じ214部首の枠組みに基づく紙の辞書が刷られ続けている。",
  ),
  q(
    10,
    "The Qinghai–Tibet Railway crosses Tanggula Pass, the highest point reached by any railway on Earth, at an elevation of roughly how many metres?|El ferrocarril Qinghai-Tíbet cruza el puerto de Tanggula, el punto más alto alcanzado por cualquier ferrocarril del planeta, a una altitud de aproximadamente cuántos metros?|Le chemin de fer Qinghai-Tibet traverse le col de Tanggula, le point le plus haut jamais atteint par un chemin de fer sur Terre, à une altitude d'environ combien de mètres ?|青蔵鉄道が越えるタングラ峠は、地球上のどの鉄道よりも標高の高い地点だが、その高さはおよそ何メートルか?",
    [
      "About 3,400 metres|Unos 3400 metros|Environ 3400 mètres|およそ3,400メートル",
      "About 5,070 metres|Unos 5070 metros|Environ 5070 mètres|およそ5,070メートル",
      "About 6,800 metres|Unos 6800 metros|Environ 6800 mètres|およそ6,800メートル",
    ],
    1,
    "At that height the air holds only around half the oxygen found at sea level, and construction crews building the pass had to work in shifts with portable oxygen tanks on hand to cope with the thin air during the years-long project.|A esa altura, el aire contiene solo cerca de la mitad del oxígeno que hay al nivel del mar, y las cuadrillas de construcción que trabajaron en el puerto tuvieron que hacerlo por turnos con tanques de oxígeno portátiles a mano para hacer frente al aire enrarecido durante el proyecto, de varios años de duración.|À cette altitude, l'air ne contient qu'environ la moitié de l'oxygène présent au niveau de la mer, et les équipes de construction qui ont bâti le col ont dû travailler par roulements avec des bouteilles d'oxygène portables à portée de main pour faire face à cet air raréfié pendant ce projet de plusieurs années.|この高さでは空気中の酸素は海抜ゼロ地点のおよそ半分しかなく、峠の建設に当たった作業員たちは、何年にも及んだこの事業のあいだ、薄い空気に対処するため携帯用の酸素ボンベを手元に置きながら交代制で働かねばならなかった。",
  ),
  q(
    10,
    "In addition to the Han majority, how many other ethnic groups does the Chinese government officially recognise?|Además de la mayoría han, ¿cuántos otros grupos étnicos reconoce oficialmente el gobierno chino?|Outre la majorité han, combien d'autres groupes ethniques le gouvernement chinois reconnaît-il officiellement ?|漢族の多数派に加えて、中国政府が公式に認定している他の民族の数はいくつか?",
    [
      "23|23|23|23",
      "38|38|38|38",
      "55|55|55|55",
    ],
    2,
    "The classification process, carried out mainly in the 1950s, sent researchers across the country to survey groups that had applied for recognition, and it grouped together some communities whose languages and customs varied considerably from one village to the next.|El proceso de clasificación, llevado a cabo principalmente en los años cincuenta, envió a investigadores por todo el país para estudiar a los grupos que habían solicitado reconocimiento, y agrupó a algunas comunidades cuyas lenguas y costumbres variaban considerablemente de un pueblo a otro.|Le processus de classification, mené principalement dans les années 1950, a envoyé des chercheurs à travers tout le pays pour étudier les groupes ayant demandé une reconnaissance, et il a regroupé certaines communautés dont les langues et les coutumes variaient considérablement d'un village à l'autre.|この分類作業は主に1950年代に行われ、認定を申請した集団を調べるために研究者たちが国中に派遣された。その結果、村ごとに言葉や習慣がかなり違う集団までが一つにまとめられることもあった。",
  ),
  q(
    10,
    "China's east-west span covers roughly how many standard 15-degree time zones' worth of longitude, even though the whole country keeps a single official clock?|La extensión de China de este a oeste cubre aproximadamente cuántos husos horarios estándar de 15 grados de longitud, aunque todo el país mantiene un único reloj oficial?|L'étendue est-ouest de la Chine couvre à peu près combien de fuseaux horaires standards de 15 degrés de longitude, alors que tout le pays garde une horloge officielle unique ?|中国の東西の広がりは、国全体が公式には一つの時計しか持たないにもかかわらず、標準的な経度15度幅の時間帯にしておよそいくつ分に相当するか?",
    [
      "About five|Unos cinco|Environ cinq|およそ5つ",
      "About two|Unos dos|Environ deux|およそ2つ",
      "About nine|Unos nueve|Environ neuf|およそ9つ",
    ],
    0,
    "Before 1949, China was officially divided into five time zones to match this longitude spread, but the government unified the whole country onto Beijing time to reinforce a sense of national unity, a decision still in force today.|Antes de 1949, China estaba oficialmente dividida en cinco husos horarios para adaptarse a esta extensión de longitud, pero el gobierno unificó todo el país con la hora de Pekín para reforzar un sentido de unidad nacional, una decisión que sigue vigente hoy.|Avant 1949, la Chine était officiellement divisée en cinq fuseaux horaires pour correspondre à cette étendue de longitude, mais le gouvernement a unifié tout le pays sur l'heure de Pékin pour renforcer un sentiment d'unité nationale, une décision toujours en vigueur aujourd'hui.|1949年より前、中国はこの経度の広がりに合わせて公式に五つの時間帯に分かれていたが、政府は国全体を北京時間に統一し、国としてのまとまりを強めようとした。この決定はいまも変わっていない。",
  ),
  q(
    10,
    "Compiled in 601 AD, which pioneering rime dictionary first systematically organised Chinese characters by their tone and rhyme, laying the groundwork for centuries of later phonological scholarship?|Compilado en el año 601 d. C., ¿qué pionero diccionario de rimas organizó por primera vez de forma sistemática los caracteres chinos por su tono y rima, sentando las bases de siglos de estudios fonológicos posteriores?|Compilé en 601 apr. J.-C., quel dictionnaire de rimes pionnier a d'abord organisé systématiquement les caractères chinois selon leur ton et leur rime, posant les bases de siècles d'études phonologiques ultérieures ?|西暦601年にまとめられ、漢字を声調と韻によって体系的に整理した先駆的な韻書として、その後何世紀にもわたる音韻研究の土台となったのは?",
    [
      "The Shuowen Jiezi|El Shuowen Jiezi|Le Shuowen Jiezi|説文解字",
      "The Qieyun|El Qieyun|Le Qieyun|切韻",
      "The Erya|El Erya|L'Erya|爾雅",
    ],
    1,
    "Its compiler drew on the pronunciations of several regional dialects current at the time rather than any single speech, which is one reason the tones and rhymes it records do not match exactly how any modern Chinese language sounds today; later dynasties built revised, expanded rhyme tables directly on top of its framework.|Su compilador se basó en las pronunciaciones de varios dialectos regionales vigentes en la época, en vez de en un solo habla, lo que explica en parte por qué los tonos y rimas que registra no coinciden exactamente con cómo suena hoy ninguna lengua china moderna; dinastías posteriores construyeron tablas de rimas revisadas y ampliadas directamente sobre su estructura.|Son compilateur s'est appuyé sur les prononciations de plusieurs dialectes régionaux courants à l'époque plutôt que sur un seul parler, ce qui explique en partie pourquoi les tons et rimes qu'il consigne ne correspondent exactement à la sonorité d'aucune langue chinoise moderne aujourd'hui ; des dynasties postérieures ont bâti des tables de rimes révisées et enrichies directement sur son cadre.|編者は一つの話し言葉ではなく、当時通用していたいくつもの地方の発音をもとにこの書をまとめた。そのため記された声調や韻は、いまのどの中国語の発音とも完全には一致しない。後代の王朝はこの枠組みの上に、改訂・拡張した韻書を次々と築いていった。",
  ),
  q(
    10,
    "Before the bead-and-rod abacus became the dominant calculating tool, Chinese mathematicians for centuries used which method, arranging short sticks in patterns to represent numbers, including negative values?|Antes de que el ábaco de cuentas y varillas se convirtiera en la herramienta de cálculo dominante, ¿qué método usaron durante siglos los matemáticos chinos, colocando palitos cortos en patrones para representar números, incluidos valores negativos?|Avant que le boulier à billes et tiges ne devienne l'outil de calcul dominant, quelle méthode les mathématiciens chinois ont-ils utilisée pendant des siècles, en disposant de courts bâtonnets selon des motifs pour représenter des nombres, y compris des valeurs négatives ?|珠と棒からなるそろばんが主流の計算道具になる前、中国の数学者たちは何世紀ものあいだ、短い棒を並べたパターンで負の数を含む数を表すどんな方法を使っていたか?",
    [
      "Knotted cords|Cuerdas anudadas|Des cordes à nœuds|結び縄",
      "Carved bone tallies|Marcas talladas en hueso|Des entailles gravées sur os|骨に刻んだ目盛り",
      "Counting rods|Varillas de cálculo|Des baguettes à calculer|算木",
    ],
    2,
    "Rods of one colour represented positive numbers and rods of another represented negative ones, and skilled users could lay out and manipulate multi-digit arithmetic, and even solve systems of equations, entirely on a flat surface using this method, centuries before it was gradually displaced by the faster bead abacus.|Las varillas de un color representaban números positivos y las de otro, negativos, y los usuarios expertos podían disponer y manipular aritmética de varias cifras, e incluso resolver sistemas de ecuaciones, enteramente sobre una superficie plana con este método, siglos antes de que el más rápido ábaco de cuentas lo fuera desplazando poco a poco.|Des baguettes d'une couleur représentaient les nombres positifs et celles d'une autre couleur les nombres négatifs, et des utilisateurs habiles pouvaient disposer et manipuler une arithmétique à plusieurs chiffres, voire résoudre des systèmes d'équations, entièrement sur une surface plane grâce à cette méthode, des siècles avant qu'elle ne soit peu à peu supplantée par le boulier à billes, plus rapide.|ある色の棒は正の数を、別の色の棒は負の数を表し、熟練者はこの方法だけで平らな面の上に複数桁の計算を並べて操り、連立方程式さえ解くことができた。これはやがてより速いそろばんに取って代わられるまで、何世紀も使われ続けた。",
  ),
  q(
    10,
    "During test runs before opening, a trainset on the Beijing–Shanghai High-Speed Railway set a world record for conventional wheeled trains, reaching a top speed of roughly how fast?|Durante las pruebas antes de su apertura, un tren del ferrocarril de alta velocidad Pekín-Shanghái batió un récord mundial para trenes convencionales sobre ruedas, alcanzando una velocidad máxima de aproximadamente cuánto?|Lors d'essais avant son ouverture, une rame du chemin de fer à grande vitesse Pékin-Shanghai a établi un record mondial pour les trains classiques sur roues, atteignant une vitesse de pointe d'environ combien ?|開通前の試験走行で、京滬高速鉄道の車両は在来型の車輪式列車として世界記録を打ち立てたが、その最高速度はおよそどれくらいだったか?",
    [
      "About 486 km/h|Unos 486 km/h|Environ 486 km/h|時速およそ486キロメートル",
      "About 320 km/h|Unos 320 km/h|Environ 320 km/h|時速およそ320キロメートル",
      "About 610 km/h|Unos 610 km/h|Environ 610 km/h|時速およそ610キロメートル",
    ],
    0,
    "That 2010 test run remains the fastest recorded speed for a conventional wheeled train anywhere in the world, faster than the line's normal commercial operating speed, which was set lower to balance energy use, wear on the track and passenger comfort.|Esa prueba de 2010 sigue siendo la velocidad registrada más rápida para un tren convencional sobre ruedas en cualquier parte del mundo, más rápida que la velocidad comercial normal de la línea, fijada más baja para equilibrar el consumo de energía, el desgaste de la vía y la comodidad de los pasajeros.|Cet essai de 2010 reste la vitesse la plus rapide jamais enregistrée pour un train classique sur roues dans le monde, plus rapide que la vitesse commerciale normale de la ligne, fixée plus bas pour équilibrer consommation d'énergie, usure de la voie et confort des passagers.|この2010年の試験走行の記録は、世界のどこであれ在来型の車輪式列車としてはいまも最速のまま残っている。実際の営業速度はこれより低く抑えられており、電力消費や線路の摩耗、乗客の快適さとの釣り合いを考えてのことである。",
  ),
];
