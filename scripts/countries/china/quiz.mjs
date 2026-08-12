/**
 * 中国のクイズ(42問)。
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
 * (答えの漏れ0件・欠け0件を確認済み)。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が均等になるよう、書く際に
 * 順番に割り当てた(42問÷3=各14問)。
 *
 * ## 言語混入の判定除外について(要・REGISTER.md 転記)
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
];
