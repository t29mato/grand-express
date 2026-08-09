/**
 * 茨城県のクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その土地の外にいる一般的な人が
 * どれくらい答えられそうか」(scripts/content-overrides/quiz-difficulty.mjs 参照)。
 *   1〜3 … 来たことがなくても常識で解ける(位置・大きさ・有名なもの)
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて(**確かめかたを必ず読むこと**)
 *
 * 同じ話を二度読ませないため、都市カードが扱う題材は避ける。
 * 偕楽園・笠間焼・神磯の鳥居・日立製作所・五浦の六角堂・袋田の滝・鹿島の要石・
 * 潮来の嫁入り舟・神栖のピーマン・鉾田のメロン・つくばの研究学園都市・土浦の花火・
 * 石岡の国府・かすみがうらの帆引き船・牛久大仏・龍ケ崎の撞舞・阿見の予科練などは、
 * いずれもカードが扱うので出さない。
 *
 * **ただし、ここにそう書いてあることと、守られていることは別である。**
 * 2026-08-09 に全40問 × 全36カードを総当たりしたところ、**4問で破られていた。**
 *
 *   Q6  全国一の産出量は? → れんこん      … 土浦カード「れんこんの産出が日本一である」
 *   Q18 空港が滑走路を共用する相手は? → 自衛隊 … 小美玉カード「航空自衛隊の基地の端に開いた」
 *   Q19 大洗のフェリーが渡る島は? → 北海道   … 大洗カード「北海道へ夜行のフェリーが出て」
 *   Q21 牛久の醸造場が開かれたのは? → 1900年代 … 牛久カード「1903年に……日本初の国産ワイン」
 *
 * **どれも問いの語がそのまま答えごとカードに載っていた。**
 * 1問ずつ読んでも出ない(気づけたのは1件だけ)。**必ず機械で確かめること。**
 *
 * **直したのは問いのほうで、カードは触っていない。**
 * つまり「れんこん」は**いまも土浦のカードに載っている**し、
 * 「北海道へ夜行のフェリー」も大洗のカードに載っている。
 * この表は「昔ぶつかった組み合わせ」であって、「もう空いている題材」の一覧ではない。
 *
 * 2026-08-09、ここで踏みかけた。水戸の問いを減らす差し替え先にれんこんを選びかけ、
 * **この表を自分で書いたことを根拠に**「カードはもう直っただろう」と当てにした。
 * 数えたら載っていた。**入れる前に必ず数えること。**
 *
 * ```
 * node scripts/check-quiz.mjs ibaraki
 * ```
 *
 * 答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りをまとめて見る。
 * **短い答え(「湖」「城」など)は誤検知する**ので、出たものは人が判断する。
 *
 * ## 問いの作り
 *
 * - **「なぜ」を問わない。**理由は複数あって答えが1つに定まらない。
 *   「何が」「どこが」「いくつ」にする
 * - **前提を問いの中に置かない。**「九割を占めるが、その理由は?」ではなく
 *   「九割を占める県は?」
 * - **誤答は他県の実在するものにする。**明らかに嘘の選択肢を並べると消去法で解けてしまう
 * - **同じ題材を重ねない。**さつまいもが3問、筑波山が5問、水戸が5問あった。
 *   いまは さつまいも1・筑波山3(ほかに1問は誤答としてのみ登場)・**水戸3**。
 *   水戸から移した2問は、常磐沖の海流と日立風流物にしてある。
 *   数え直すときは `node scripts/check-quiz.mjs ibaraki` の「3問以上に出る語」を見る
 *   (**問いと正解だけを数える。**外れの選択肢まで数えると、囮が偏りに見える)
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数になるよう散らしてある。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const IBARAKI_QUIZ = [
  // ---------------- 1〜3: 来たことがなくても解ける ----------------
  q(
    1,
    "Which ocean does Ibaraki face?|¿A qué océano da Ibaraki?|Quel océan borde Ibaraki ?|茨城県が面している海は?",
    [
      "The Sea of Japan|El mar del Japón|La mer du Japon|日本海",
      "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋",
      "The Inland Sea|El mar Interior|La mer Intérieure|瀬戸内海",
    ],
    1,
    "About 190 km of Pacific coast runs along the prefecture's eastern edge, almost all of it low and straight. Because the shore faces east with nothing in the way, the sunrise comes out of the open sea, and the first sunrise of the year draws crowds to it.|Unos 190 km de costa del Pacífico recorren su borde oriental, casi toda baja y recta. Como la orilla mira al este sin nada delante, el sol sale del mar abierto.|Quelque 190 km de côte pacifique bordent l'est de la préfecture, presque partout basse et rectiligne. La rive donnant plein est, le soleil se lève de la pleine mer.|県の東の縁を約190kmの太平洋岸が走る。ほとんどが低くまっすぐな浜である。何も遮るもののない東向きの海岸なので、日は外洋から直接昇る。初日の出に人が集まるのはそのためである。",
  ),
  q(
    1,
    "Ibaraki is part of which region of Japan?|¿A qué región de Japón pertenece Ibaraki?|Ibaraki appartient à quelle région du Japon ?|茨城県が属する地方は?",
    [
      "Kantō, around Tokyo|Kantō, en torno a Tokio|Le Kantō, autour de Tokyo|関東地方(東京の周辺)",
      "Kyūshū, in the south-west|Kyūshū, al suroeste|Kyūshū, au sud-ouest|九州地方(南西部)",
      "Hokkaidō, in the north|Hokkaidō, al norte|Hokkaidō, au nord|北海道地方(北部)",
    ],
    0,
    "Ibaraki is the north-eastern corner of the Kantō region, and its southern edge is barely 40 km from central Tokyo. That closeness is why a whole new railway was built to it in 2005 and why so many of its towns empty out towards the capital each morning.|Ibaraki es el ángulo nororiental del Kantō y su borde sur queda a apenas 40 km del centro de Tokio. Esa cercanía explica que en 2005 se le construyera una línea nueva entera.|Ibaraki forme l'angle nord-est du Kantō et sa limite sud n'est qu'à 40 km du centre de Tokyo. C'est cette proximité qui lui a valu une ligne nouvelle entière en 2005.|茨城県は関東地方の北東の角にあたり、南の端は東京の中心から40kmほどしか離れていない。2005年に新しい鉄道が一本まるごと引かれたのも、朝ごとに多くの町が首都へ人を送り出すのも、この近さゆえである。",
  ),
  q(
    2,
    "What is Kasumigaura?|¿Qué es Kasumigaura?|Qu'est-ce que Kasumigaura ?|霞ヶ浦とは何か?",
    [
      "A mountain range|Una cordillera|Une chaîne de montagnes|山脈",
      "A castle|Un castillo|Un château|城",
      "A lake|Un lago|Un lac|湖",
    ],
    2,
    "It is the second-largest lake in Japan, about 220 km² of water — but it averages only four metres deep, so it is huge and shallow at the same time. Until 1963 the sea ran into it on the tide and the water was brackish; a floodgate downstream closed it off and made it fresh.|Es el segundo lago de Japón, unos 220 km², pero con solo cuatro metros de profundidad media. Hasta 1963 la marea metía agua de mar y era salobre; una compuerta lo cerró y lo volvió dulce.|C'est le deuxième lac du Japon, environ 220 km², mais quatre mètres de fond en moyenne. Jusqu'en 1963, la marée y poussait la mer et l'eau était saumâtre ; une écluse l'a fermé et adouci.|日本で二番目に大きい湖で、水面は約220平方キロメートル。ただし平均の深さは4メートルしかなく、広くて浅い。1963年までは潮とともに海水が入る汽水湖だったが、下流に水門が造られて淡水になった。",
  ),
  q(
    2,
    "The plain that covers most of Ibaraki is remarkable for being what?|La llanura que cubre casi toda Ibaraki destaca por ser ¿qué?|La plaine qui couvre presque toute Ibaraki se distingue par quoi ?|茨城県の大半を占める平野の特徴は?",
    [
      "The largest plain in Japan|La llanura más grande de Japón|La plus grande plaine du Japon|日本でいちばん広い",
      "The highest plain in Japan|La llanura más alta de Japón|La plaine la plus haute du Japon|日本でいちばん標高が高い",
      "The coldest plain in Japan|La llanura más fría de Japón|La plaine la plus froide du Japon|日本でいちばん寒い",
    ],
    0,
    "The Kantō Plain is by far the largest flat area in a country that is three-quarters mountain, and Ibaraki holds its north-eastern quarter. Flat land is why the prefecture farms more land than almost any other, and why a single hill like Tsukuba can be seen from 60 km away.|La llanura de Kantō es con mucho la mayor superficie llana de un país que es montaña en tres cuartas partes, e Ibaraki ocupa su cuarto nororiental.|La plaine du Kantō est de loin la plus vaste étendue plate d'un pays montagneux aux trois quarts, et Ibaraki en occupe le quart nord-est.|関東平野は、国土の四分の三が山であるこの国で群を抜いて広い平地であり、茨城県はその北東の四分の一を占める。耕地面積が全国有数なのも、筑波山のような一つの山が60km先から見えるのも、この平らさによる。",
  ),
  q(
    3,
    "Mito is famous for a sticky food made by fermenting which bean?|Mito es famosa por un alimento pegajoso hecho fermentando ¿qué legumbre?|Mito est célèbre pour un aliment collant obtenu en fermentant quel haricot ?|水戸で名高い、発酵させて作る糸を引く食べ物の原料は?",
    [
      "The red bean|La judía roja|Le haricot rouge|小豆",
      "The soybean|La soja|Le soja|大豆",
      "The broad bean|El haba|La fève|そら豆",
    ],
    1,
    "Mito's nattō is made from small soybeans, which ferment through more evenly than large ones. A merchant began selling it to travellers in straw bundles at the station in 1889, and the prefecture has been the country's best-known source ever since.|El nattō de Mito se hace con soja pequeña, que fermenta de forma más pareja que la grande. Un comerciante empezó a venderlo en la estación, envuelto en paja, en 1889.|Le nattō de Mito se fait avec de petits sojas, qui fermentent plus régulièrement que les gros. Un marchand se mit à le vendre en bottes de paille à la gare en 1889.|水戸の納豆は小粒の大豆で作る。大粒より芯まで均一に発酵するためである。1889年に商人が駅で藁づとに包んで旅人に売り始め、以来この県が全国に知られる産地になった。",
  ),
  q(
    3,
    "Roughly how many people live in Ibaraki?|¿Cuánta gente vive aproximadamente en Ibaraki?|Combien de personnes vivent à peu près à Ibaraki ?|茨城県の人口は、およそどれくらいか?",
    [
      "About 280,000|Unas 280.000|Environ 280 000|およそ28万人",
      "About 2.8 million|Unos 2,8 millones|Environ 2,8 millions|およそ280万人",
      "About 28 million|Unos 28 millones|Environ 28 millions|およそ2800万人",
    ],
    1,
    "That puts it around eleventh among the forty-seven prefectures — more people than Kyoto, fewer than Hiroshima. Most of them live in the southern third, within commuting distance of Tokyo, while the northern hills have been losing people for decades. Twenty-eight million would be more than Tokyo and Osaka together.|Es el undécimo de las cuarenta y siete prefecturas: más que Kioto, menos que Hiroshima. La mayoría vive en el tercio sur, a distancia de viaje diario de Tokio.|Cela le place onzième des quarante-sept préfectures : plus que Kyoto, moins que Hiroshima. La plupart vivent dans le tiers sud, à distance pendulaire de Tokyo.|四十七の都道府県のうち十一番目あたりで、京都より多く、広島より少ない。その大半は東京へ通える南の三分の一に住み、北の丘陵地帯は何十年も人が減り続けている。2800万人なら、東京と大阪を合わせたより多いことになる。",
  ),
  q(
    3,
    "Roughly how far is southern Ibaraki from central Tokyo?|¿A qué distancia está el sur de Ibaraki del centro de Tokio?|À quelle distance le sud d'Ibaraki est-il du centre de Tokyo ?|茨城県の南端から東京都心までは、およそどれくらいか?",
    [
      "About 40 km|Unos 40 km|Environ 40 km|およそ40km",
      "About 400 km|Unos 400 km|Environ 400 km|およそ400km",
      "About 1,400 km|Unos 1.400 km|Environ 1 400 km|およそ1400km",
    ],
    0,
    "The Tone River, which forms most of the southern boundary, is only about 40 km from the middle of Tokyo. A train opened in 2005 covers the distance from Akihabara to Tsukuba in 45 minutes, which turned farm villages into commuter towns within a decade.|El río Tone, que forma casi todo el límite sur, está a unos 40 km del centro de Tokio. Un tren abierto en 2005 va de Akihabara a Tsukuba en 45 minutos.|Le fleuve Tone, qui forme presque toute la limite sud, n'est qu'à 40 km du centre de Tokyo. Un train ouvert en 2005 relie Akihabara à Tsukuba en 45 minutes.|南の境の大半をなす利根川は、東京の中心から40kmほどしか離れていない。2005年に開通した鉄道は秋葉原からつくばまでを45分で結び、十年のうちに農村を通勤の町に変えた。",
  ),

  // ---------------- 4〜6: 旅行したり調べたことがあれば ----------------
  q(
    4,
    "What is unusual about the summit of Mount Tsukuba?|¿Qué tiene de raro la cima del monte Tsukuba?|Qu'y a-t-il d'inhabituel au sommet du mont Tsukuba ?|筑波山の頂上の珍しいところは?",
    [
      "It is always in cloud|Siempre está entre nubes|Il est toujours dans les nuages|いつも雲の中にある",
      "It is below sea level|Está bajo el nivel del mar|Il est sous le niveau de la mer|海面より低い",
      "There are two of them|Son dos|Il y en a deux|二つある",
    ],
    2,
    "Tsukuba has twin peaks, Nyotai at 877 m and Nantai at 871 m, and is one of the very few mountains under 1,000 m on Japan's classic list of a hundred. Rising alone out of a wide plain, it is visible from Tokyo on clear days.|Tsukuba tiene dos cumbres, Nyotai de 877 m y Nantai de 871 m, y es de las poquísimas por debajo de 1.000 m en la lista clásica de las cien montañas.|Tsukuba a deux sommets, Nyotai à 877 m et Nantai à 871 m, et figure parmi les très rares monts de moins de 1 000 m de la liste des cent.|筑波山は女体山877m・男体山871mの二峰からなる。日本百名山のうち1000mに満たない数少ない山である。広い平野からひとりで立ち上がるので、晴れた日には東京からも見える。",
  ),
  q(
    4,
    "The Tone River, on Ibaraki's southern edge, holds which record in Japan?|El río Tone, en el borde sur de Ibaraki, ostenta ¿qué récord en Japón?|Le fleuve Tone, à la limite sud d'Ibaraki, détient quel record au Japon ?|茨城県の南を限る利根川が日本一なのは?",
    [
      "The largest drainage basin|La mayor cuenca|Le plus grand bassin versant|流域面積",
      "The coldest water|El agua más fría|L'eau la plus froide|水の冷たさ",
      "The most waterfalls|El mayor número de cascadas|Le plus de chutes|滝の数",
    ],
    0,
    "The Tone drains about 16,800 km², more than any other Japanese river, and it did not always run this way. In 1654 engineers finished turning it east so that it emptied into the Pacific instead of into Edo Bay, to keep floods off the shogun's new city.|El Tone drena unos 16.800 km², más que ningún otro río japonés, y no siempre corrió así: en 1654 se terminó de desviarlo al este para que desembocara en el Pacífico y no en la bahía de Edo.|Le Tone draine quelque 16 800 km², plus que tout autre fleuve japonais. En 1654, on acheva de le détourner vers l'est pour qu'il se jette dans le Pacifique et non dans la baie d'Edo.|利根川の流域面積は約16800平方キロメートルで、日本の川で最も広い。もとからこう流れていたわけではない。1654年、江戸を洪水から守るため、東へ付け替えて江戸湾ではなく太平洋へ注ぐようにする工事が完成した。",
  ),
  q(
    4,
    "Which fruit is Ibaraki the country's top producer of?|¿De qué fruta es Ibaraki la principal productora del país?|De quel fruit Ibaraki est-elle la première productrice du pays ?|茨城県が生産量日本一の果物は?",
    [
      "The mandarin|La mandarina|La mandarine|みかん",
      "The apple|La manzana|La pomme|りんご",
      "The chestnut|La castaña|La châtaigne|栗",
    ],
    2,
    "Ibaraki has grown more chestnuts than any other prefecture for decades, on the sandy uplands where the trees like the drainage. Chestnut wood is also what the old kilns burned, because it holds a long steady flame rather than flaring.|Ibaraki produce más castañas que ninguna otra prefectura desde hace décadas, en las mesetas arenosas que drenan bien. Su madera alimentaba además los hornos antiguos.|Ibaraki produit plus de châtaignes que toute autre préfecture depuis des décennies, sur les plateaux sableux bien drainés. Son bois nourrissait aussi les anciens fours.|茨城県は何十年も栗の生産量が全国一である。水はけのよい砂質の台地が木に合う。栗の材は古い窯の焚き木でもあった。燃え上がらず、長く一定の火を保つからである。",
  ),
  q(
    4,
    "A railway opened in 2005 links Tsukuba to which Tokyo terminus?|Un ferrocarril abierto en 2005 une Tsukuba con ¿qué terminal de Tokio?|Une ligne ouverte en 2005 relie Tsukuba à quelle gare de Tokyo ?|2005年に開通した鉄道が、つくばと結んでいる東京の終点は?",
    [
      "Shinjuku|Shinjuku|Shinjuku|新宿",
      "Akihabara|Akihabara|Akihabara|秋葉原",
      "Shinagawa|Shinagawa|Shinagawa|品川",
    ],
    1,
    "The Tsukuba Express runs from Akihabara in 45 minutes, and it was built with no level crossings at all so that nothing could slow it down. The line was planned as much to spread housing along its route as to serve the science city at the end of it.|El Tsukuba Express sale de Akihabara en 45 minutos y se construyó sin un solo paso a nivel para que nada lo frenara.|Le Tsukuba Express part d'Akihabara en 45 minutes ; il fut construit sans le moindre passage à niveau pour que rien ne le ralentisse.|つくばエクスプレスは秋葉原から45分で走る。速度を落とす要素をなくすため、踏切が一つもない構造で建設された。終点の研究学園都市のためだけでなく、沿線に住宅を広げる目的も併せもった路線である。",
  ),
  q(
    5,
    "Which J-League football club plays in Ibaraki and has won the most titles in Japan?|¿Qué club de fútbol de la J-League juega en Ibaraki y es el más laureado de Japón?|Quel club de J-League joue à Ibaraki et compte le plus de titres du Japon ?|茨城県を本拠地とし、日本で最も多くのタイトルを獲ったサッカークラブは?",
    [
      "Kashima Antlers|Kashima Antlers|Kashima Antlers|鹿島アントラーズ",
      "Urawa Red Diamonds|Urawa Red Diamonds|Urawa Red Diamonds|浦和レッズ",
      "Yokohama F. Marinos|Yokohama F. Marinos|Yokohama F. Marinos|横浜F・マリノス",
    ],
    0,
    "The club took its name from the deer of Kashima Shrine — kashima can be read as \"deer island\", and antlers followed from that. It was founded in a town of fewer than fifty thousand people, and the league only accepted it after the town promised to build the stadium.|El club tomó su nombre de los ciervos del santuario de Kashima; kashima puede leerse \"isla de los ciervos\". Nació en un pueblo de menos de cincuenta mil habitantes.|Le club tient son nom des cerfs du sanctuaire de Kashima, dont le nom peut se lire « île aux cerfs ». Il naquit dans une ville de moins de cinquante mille habitants.|クラブ名は鹿島神宮の鹿に由来する。「鹿島」は鹿の島とも読めるところから角(アントラー)が採られた。人口五万に満たない町で生まれ、町が競技場の建設を約束してようやくリーグに認められた。",
  ),
  q(
    5,
    "Ibaraki produces about nine tenths of Japan's supply of what?|Ibaraki produce cerca de nueve décimas partes del suministro japonés de ¿qué?|Ibaraki fournit près des neuf dixièmes de la production japonaise de quoi ?|茨城県が全国のおよそ九割を作っているものは?",
    [
      "Green tea|Té verde|Le thé vert|緑茶",
      "Dried sweet potato|Boniato seco|La patate douce séchée|干し芋",
      "Dried seaweed|Alga seca|Les algues séchées|海苔",
    ],
    1,
    "Hoshi-imo is steamed sweet potato, sliced and dried outdoors, and it needs exactly the winter Ibaraki has: cold, dry and windy, with little snow. The racks stand in the open fields facing the sea, and a wet December ruins the batch.|El hoshi-imo es boniato cocido al vapor, cortado y secado al aire; necesita justo el invierno de Ibaraki: frío, seco y ventoso, con poca nieve.|Le hoshi-imo est une patate douce cuite à la vapeur, tranchée et séchée dehors ; il lui faut l'hiver d'Ibaraki : froid, sec, venteux et peu neigeux.|干し芋は蒸したさつまいもを薄く切って屋外で干したもので、茨城の冬がそのまま条件になる。寒く、乾き、風があり、雪が少ないこと。干し台は海に向いた野天に並び、十二月が雨がちだとその年のぶんが台無しになる。",
  ),
  q(
    5,
    "Ibaraki has one of Japan's highest rates of what per household?|Ibaraki tiene una de las tasas más altas de Japón de ¿qué por hogar?|Ibaraki affiche l'un des taux japonais les plus élevés de quoi par ménage ?|茨城県が一世帯あたり全国有数の多さなのは?",
    [
      "Bicycles|Bicicletas|Vélos|自転車",
      "Boats|Barcas|Bateaux|船",
      "Cars|Coches|Voitures|自動車",
    ],
    2,
    "Outside the few rail corridors the buses are thin and the distances are flat and long, so most households keep a car for each working adult. The same flatness makes the prefecture one of the easiest places in Japan to lay a road, and it has more kilometres of them than almost anywhere.|Fuera de los pocos corredores ferroviarios los autobuses escasean y las distancias son llanas y largas, así que casi cada adulto activo tiene coche.|Hors des rares couloirs ferroviaires, les bus sont rares et les distances plates et longues : chaque adulte actif a sa voiture.|数少ない鉄道沿線を外れるとバスは細く、平らな道がどこまでも続くため、多くの家が働く大人の数だけ車を持つ。同じ平らさゆえに道路を通しやすく、道路の総延長も全国有数である。",
  ),
  q(
    5,
    "What is Yūki, in western Ibaraki, known for weaving?|¿Qué se teje en Yūki, al oeste de Ibaraki?|Que tisse-t-on à Yūki, dans l'ouest d'Ibaraki ?|県西の結城で織られてきたものは?",
    [
      "Silk cloth|Tela de seda|De la soie|絹の織物",
      "Straw mats|Esteras de paja|Des nattes de paille|藁の敷物",
      "Fishing nets|Redes de pesca|Des filets de pêche|漁の網",
    ],
    0,
    "Yūki-tsumugi is spun by hand from floss silk without twisting the thread, then woven on a backstrap loom with the weaver's body holding the tension. It was listed by UNESCO in 2010, and a single bolt can take a year, which is why families speak of wearing one down over three generations.|El yūki-tsumugi se hila a mano de seda floja sin torcer el hilo y se teje en telar de cintura. La UNESCO lo inscribió en 2010; una pieza puede llevar un año.|Le yūki-tsumugi se file à la main à partir de bourre de soie, sans torsion, puis se tisse sur un métier à sangle dorsale. Inscrit à l'UNESCO en 2010, un rouleau demande parfois un an.|結城紬は真綿から撚りをかけずに手で糸を紡ぎ、腰で張りを取る地機で織る。2010年にユネスコの無形文化遺産に登録された。一反に一年かかることもあり、親子三代で着ると言われるのはそのためである。",
  ),
  q(
    6,
    "Which is the highest mountain in Ibaraki?|¿Cuál es la montaña más alta de Ibaraki?|Quelle est la plus haute montagne d'Ibaraki ?|茨城県で最も高い山は?",
    [
      "Mount Tsukuba|El monte Tsukuba|Le mont Tsukuba|筑波山",
      "Mount Yamizo|El monte Yamizo|Le mont Yamizo|八溝山",
      "Mount Kaba|El monte Kaba|Le mont Kaba|加波山",
    ],
    1,
    "Yamizo reaches 1,022 m on the northern border and is the only peak in the prefecture over a thousand, yet almost nobody names it first. Tsukuba is 145 m lower but stands alone above the plain where everyone can see it, while Yamizo sits among other hills at the far edge.|El Yamizo alcanza 1.022 m en la frontera norte y es la única cima que pasa de mil, pero casi nadie lo nombra primero: el Tsukuba es más bajo y se ve desde toda la llanura.|Le Yamizo culmine à 1 022 m à la frontière nord, seul sommet dépassant mille mètres ; pourtant on cite d'abord le Tsukuba, plus bas mais visible de toute la plaine.|八溝山は北の県境で1022mに達し、県内で唯一1000mを超える。それでも真っ先に名が挙がることはまずない。筑波山は145m低いが平野の上に独り立って誰の目にも入るのに対し、八溝山は県の端で他の山に紛れているからである。",
  ),
  q(
    6,
    "Kasama holds a festival every autumn for which flower?|Kasama celebra cada otoño una fiesta de ¿qué flor?|Kasama organise chaque automne une fête de quelle fleur ?|笠間で毎年秋に開かれる花の祭りは?",
    [
      "The cherry|El cerezo|Le cerisier|桜",
      "The chrysanthemum|El crisantemo|Le chrysanthème|菊",
      "The peony|La peonía|La pivoine|牡丹",
    ],
    1,
    "The chrysanthemum festival there has run since 1908 and is the oldest in the country. Growers train single plants into thousand-bloom domes and into life-size figures dressed in living flowers, which must be replanted every few days as the blooms go over.|Su fiesta del crisantemo se celebra desde 1908 y es la más antigua del país. Se forman plantas únicas en cúpulas de mil flores y figuras de tamaño natural vestidas de flores vivas.|Sa fête du chrysanthème existe depuis 1908, la plus ancienne du pays. On y forme des plants uniques en dômes de mille fleurs et des figures grandeur nature habillées de fleurs vivantes.|笠間の菊まつりは1908年から続く日本最古の菊まつりである。一株を千輪咲きの丸い山に仕立てたり、等身大の人形に生きた花を着せたりする。花が傷むので、数日ごとに植え替えねばならない。",
  ),
  q(
    6,
    "Kasumigaura ranks where among the lakes of Japan by area?|¿Qué puesto ocupa Kasumigaura entre los lagos de Japón por superficie?|Quel rang Kasumigaura occupe-t-il parmi les lacs du Japon par la surface ?|霞ヶ浦は日本の湖のなかで、広さが何番目か?",
    [
      "First|El primero|Le premier|1番目",
      "Second|El segundo|Le deuxième|2番目",
      "Tenth|El décimo|Le dixième|10番目",
    ],
    1,
    "It covers about 220 square kilometres, behind Lake Biwa and ahead of every other lake in the country. It is also very shallow — four metres at the average — so the whole of it warms and cools quickly, and a strong wind can stir the bottom across the entire lake.|Ocupa unos 220 km², por detrás del lago Biwa y por delante de cualquier otro del país. Es además muy somero, cuatro metros de media, así que se calienta y enfría deprisa.|Il couvre environ 220 km², derrière le lac Biwa et devant tous les autres du pays. Il est aussi très peu profond, quatre mètres en moyenne, et se réchauffe donc vite.|面積はおよそ220平方キロメートルで、琵琶湖に次ぎ、ほかのどの湖よりも広い。同時にきわめて浅く、平均で4mほどしかないため、全体が早く温まり早く冷める。強い風が吹けば、湖じゅうの底がかき混ぜられる。",
  ),
  q(
    6,
    "Which railway line runs the length of Ibaraki's Pacific side?|¿Qué línea de tren recorre todo el lado pacífico de Ibaraki?|Quelle ligne de chemin de fer parcourt la façade pacifique d'Ibaraki ?|茨城県の太平洋側を南北に貫く鉄道の路線は?",
    [
      "The Tōhoku Main Line|La línea principal Tōhoku|La ligne principale Tōhoku|東北本線",
      "The Takasaki Line|La línea Takasaki|La ligne Takasaki|高崎線",
      "The Jōban Line|La línea Jōban|La ligne Jōban|常磐線",
    ],
    2,
    "Its name joins the old provinces it links, Hitachi and Iwaki, and it carries most of the traffic between Tokyo and the coastal towns of the north-east. The two other lines named here leave Tokyo as well, but strike inland through Tochigi and Gunma instead.|Su nombre une las antiguas provincias que enlaza, Hitachi e Iwaki, y lleva casi todo el tráfico entre Tokio y las costas del noreste. Las otras dos líneas salen también de Tokio, pero tierra adentro.|Son nom réunit les anciennes provinces qu'elle relie, Hitachi et Iwaki, et elle porte l'essentiel du trafic entre Tokyo et les côtes du nord-est. Les deux autres lignes partent aussi de Tokyo, mais vers l'intérieur.|路線名は、結んでいる旧国名の常陸と磐城から一字ずつ取ったものである。東京と東北の海沿いの町を行き来する人と荷の多くがここを通る。ほかの二つも東京から北へ向かう幹線だが、栃木や群馬を抜けて内陸を走る。",
  ),

  // ---------------- 7〜8: 理由が土地に結びついている ----------------
  q(
    7,
    "Kashima's port was dug into the land in an unusual shape. Which?|El puerto de Kashima se excavó en tierra con una forma insólita. ¿Cuál?|Le port de Kashima fut creusé dans les terres selon quelle forme ?|鹿島港が陸を掘り込んで造られた、その珍しい形は?",
    [
      "A ring|Un anillo|Un anneau|環状",
      "A letter Y|Una letra Y|Un Y|Y字形",
      "A spiral|Una espiral|Une spirale|渦巻き",
    ],
    1,
    "The coast here is a straight sandy beach with no bay at all, so from 1963 the harbour was cut inland instead — a Y-shaped trench with two arms, one for steel and one for chemicals. Fishing villages on poor sand were turned into one of Japan's largest industrial zones in about a decade.|La costa es una playa recta sin bahía, así que desde 1963 se excavó el puerto tierra adentro: una zanja en Y con dos brazos, uno para el acero y otro para la química.|La côte est une plage rectiligne sans baie : dès 1963 on creusa le port dans les terres, une tranchée en Y à deux bras, l'un pour l'acier, l'autre pour la chimie.|この海岸は湾のないまっすぐな砂浜なので、1963年から港のほうを内陸へ掘り込んだ。二本の腕をもつY字形の掘割で、一方が鉄、もう一方が化学のためである。痩せた砂地の漁村が十年ほどで国内有数の工業地帯に変わった。",
  ),
  // 元は「牛久のワイン醸造場が開かれた年代」だったが、**牛久の都市カードに
  // 「1903年に……日本初の国産ワインを造った醸造所」と答えがそのまま書いてあった。**
  // 冒頭の「都市カードと題材が重ならないようにしてある」に反していたので差し替えた。
  q(
    7,
    "Which chicken is raised in the northern hills of Ibaraki and prized for its firm meat?|¿Qué pollo se cría en las colinas del norte de Ibaraki y se aprecia por su carne firme?|Quel poulet élève-t-on sur les collines du nord d'Ibaraki, prisé pour sa chair ferme ?|県北の山あいで育てられ、身の締まった肉で知られる地鶏は?",
    [
      "Hinai jidori|El jidori de Hinai|Le jidori de Hinai|比内地鶏",
      "Nagoya cochin|El cochin de Nagoya|La cochin de Nagoya|名古屋コーチン",
      "Okukuji shamo|El shamo de Okukuji|Le shamo d'Okukuji|奥久慈しゃも",
    ],
    2,
    "Shamo were bred as fighting birds, so they grow slowly and put on hard, lean muscle. Around Daigo they are kept for about five months — roughly twice as long as an ordinary table bird — and the meat is firm enough that it is usually simmered rather than fried. Hinai jidori comes from Akita and the Nagoya cochin from Aichi.|El shamo se crió como ave de pelea: crece despacio y forma músculo magro y duro. Cerca de Daigo se cría unos cinco meses, el doble que un pollo común. El hinai jidori es de Akita y el cochin de Nagoya, de Aichi.|Le shamo fut élevé pour le combat : il grandit lentement et prend un muscle maigre et ferme. Vers Daigo on l'élève cinq mois environ, deux fois plus qu'un poulet ordinaire. Le hinai jidori vient d'Akita, la cochin de Nagoya d'Aichi.|しゃもはもともと闘鶏として育てられた鶏で、ゆっくり育ち、締まった赤身がつく。大子のあたりでは五か月ほどかけて飼う。ふつうの肉用鶏のおよそ倍で、肉が硬いため揚げるより煮て食べることが多い。比内地鶏は秋田、名古屋コーチンは愛知のものである。",
  ),
  // もとは「水戸の藩主が最初期に口にした料理は? → ラーメン」だった。
  // 水戸を扱う問いが40問中5問あったので、海の話へ移した(→ 3問)。
  q(
    7,
    "Which two ocean currents meet off the coast of Ibaraki?|¿Qué dos corrientes marinas se encuentran frente a la costa de Ibaraki?|Quels deux courants marins se rencontrent au large d'Ibaraki ?|茨城県の沖でぶつかり合う、二つの海の流れは?",
    [
      "The Kuroshio and the Oyashio|La Kuroshio y la Oyashio|Le Kuroshio et l'Oyashio|黒潮と親潮",
      "The Tsushima and the Liman|La de Tsushima y la de Liman|Celui de Tsushima et celui du Liman|対馬海流とリマン海流",
      "The Kuroshio and the Tsushima|La Kuroshio y la de Tsushima|Le Kuroshio et celui de Tsushima|黒潮と対馬海流",
    ],
    0,
    "The warm Kuroshio running up from the south meets the cold Oyashio coming down from the north at about this latitude. Nutrients well up along the seam, small fish gather, and larger fish follow them, which is why the catch landed here is sold under a name of its own.|La cálida Kuroshio que sube del sur se encuentra con la fría Oyashio que baja del norte a esta altura. En la juntura afloran nutrientes, se juntan los peces pequeños y tras ellos llegan los grandes, y por eso la pesca de aquí se vende con nombre propio.|Le Kuroshio chaud, qui monte du sud, rencontre l'Oyashio froid, qui descend du nord, à peu près à cette latitude. Des nutriments remontent le long de la couture, les petits poissons s'y rassemblent et les grands les suivent : c'est pourquoi les prises d'ici se vendent sous un nom à part.|南から上がる暖かい黒潮と、北から下りる冷たい親潮が、この県の沖あたりで出会う。ぶつかる帯には栄養が湧いて小魚が群れ、それを追う魚が寄る。ここで揚がる魚が高く買われるのはそのためで、市場では別の名で呼び分けられる。",
  ),
  q(
    7,
    "Which explorer, born in Ibaraki, proved Sakhalin was an island and left his name on the strait?|¿Qué explorador nacido en Ibaraki probó que Sajalín era una isla y dio su nombre al estrecho?|Quel explorateur né à Ibaraki prouva que Sakhaline était une île et laissa son nom au détroit ?|樺太が島であることを確かめ、海峡に名を残した茨城生まれの探検家は?",
    [
      "Inō Tadataka|Inō Tadataka|Inō Tadataka|伊能忠敬",
      "Mogami Tokunai|Mogami Tokunai|Mogami Tokunai|最上徳内",
      "Mamiya Rinzō|Mamiya Rinzō|Mamiya Rinzō|間宮林蔵",
    ],
    2,
    "He was a farmer's son from the flat country near the Tone, went north as a surveyor, and in 1809 crossed to the mainland coast and followed the water round — settling a question European maps had got wrong. The strait is still called Mamiya on Japanese charts. Inō Tadataka, who taught him, was from Chiba; Mogami Tokunai from Yamagata.|Hijo de campesinos de la llanura del Tone, fue al norte como agrimensor y en 1809 rodeó el agua, resolviendo lo que los mapas europeos erraban. Inō Tadataka, su maestro, era de Chiba; Mogami Tokunai, de Yamagata.|Fils de paysans de la plaine de la Tone, il partit au nord comme arpenteur et, en 1809, contourna le détroit, tranchant ce que les cartes européennes ignoraient. Inō Tadataka, son maître, venait de Chiba ; Mogami Tokunai, de Yamagata.|利根川べりの平地に生まれた農民の子で、測量方として北へ渡り、1809年に対岸まで越えて水路を回り込み、ヨーロッパの地図が誤っていた問いに決着をつけた。日本の海図では今もその名で呼ばれる。師の伊能忠敬は千葉、最上徳内は山形の生まれである。",
  ),
  q(
    8,
    "Ibaraki's name is written with characters meaning what?|El nombre de Ibaraki se escribe con caracteres que significan ¿qué?|Le nom d'Ibaraki s'écrit avec des caractères signifiant quoi ?|「茨城」という地名の字が表しているのは?",
    [
      "A castle of thorns|Un castillo de espinas|Un château d'épines|茨(いばら)の城",
      "A field of reeds|Un campo de juncos|Un champ de roseaux|葦の野",
      "A hill of stones|Una colina de piedras|Une colline de pierres|石の丘",
    ],
    0,
    "The eighth-century Hitachi chronicle explains the name with a tale of driving out a band of earth-dwellers by walling their pits with thorny briar. The same chronicle is one of only five regional gazetteers of that age to survive in any substantial form.|La crónica de Hitachi, del siglo VIII, explica el nombre con una historia de expulsar a unos habitantes de fosas tapiándolas con zarzas espinosas.|La chronique du Hitachi, au VIIIe siècle, explique le nom par le récit d'habitants des fosses chassés en murant celles-ci de ronces.|八世紀の『常陸国風土記』は、穴に住む一族を茨の垣で塞いで追い払った話としてこの地名を説く。この風土記は、当時のものでまとまった形で残る五つのうちの一つである。",
  ),
  q(
    8,
    "Tea grown at Sashima in western Ibaraki has what claim to fame?|El té de Sashima, al oeste de Ibaraki, ¿por qué es célebre?|Le thé de Sashima, dans l'ouest d'Ibaraki, est célèbre pourquoi ?|県西の猿島で作られる茶が知られているのは?",
    [
      "It was the first Japanese tea exported to America|Fue el primer té japonés exportado a América|Ce fut le premier thé japonais exporté en Amérique|日本茶として最初にアメリカへ輸出された",
      "It is the only tea grown underwater|Es el único té cultivado bajo el agua|C'est le seul thé cultivé sous l'eau|水中で育てる唯一の茶",
      "It is picked only at night|Se recoge solo de noche|Il n'est cueilli que la nuit|夜にしか摘まない",
    ],
    0,
    "A local grower shipped Sashima tea to New York in 1859, the year the treaty ports opened, making it the first Japanese tea sold abroad. It is a strongly steamed tea, and it grows this far north because the plateau drains fast and frost drains off it into the valleys.|Un cultivador envió té de Sashima a Nueva York en 1859, el año en que abrieron los puertos, el primer té japonés vendido fuera.|Un producteur expédia du thé de Sashima à New York en 1859, l'année de l'ouverture des ports : le premier thé japonais vendu à l'étranger.|地元の茶商が1859年、開港の年にニューヨークへ猿島茶を送った。海外へ売られた最初の日本茶である。よく蒸す製法で、これほど北で育つのは、台地の水はけがよく、霜が谷へ流れ落ちるからである。",
  ),
  q(
    8,
    "The pond at Ushiku is the setting for paintings by Ogawa Usen of which creature?|El estanque de Ushiku inspiró a Ogawa Usen pinturas de ¿qué criatura?|L'étang d'Ushiku inspira à Ogawa Usen des peintures de quelle créature ?|牛久沼を舞台に小川芋銭が描き続けた生きものは?",
    [
      "The dragon|El dragón|Le dragon|龍",
      "The fox|El zorro|Le renard|狐",
      "The kappa water-imp|El kappa, duende del agua|Le kappa, lutin des eaux|河童",
    ],
    2,
    "Usen lived by the pond for forty years and painted kappa so often that he signed himself \"the kappa's friend\"; his studio there is called the Kappa Hall. He drew them not as monsters but as idle, slightly embarrassed neighbours sitting about in the reeds.|Usen vivió cuarenta años junto al estanque y pintó tantos kappa que firmaba \"el amigo de los kappa\"; su taller se llama la Sala del Kappa.|Usen vécut quarante ans au bord de l'étang et peignit tant de kappa qu'il signait « l'ami des kappa » ; son atelier s'appelle la salle du Kappa.|小川芋銭は四十年をこの沼のほとりで過ごし、河童をあまりに多く描いたので「河童の友」と署名した。画室は「河童の碑」と呼ばれる。妖怪としてではなく、葦の間に所在なげに座る、少し気恥ずかしそうな隣人として描いた。",
  ),
  // 元は「干し芋が茨城に集中している理由は?」だったが、問題が2つあった。
  //   ・「なぜ」を問うので答えが1つに定まらない
  //   ・**問題文が Q13(全国の九割を作っているものは? → 干し芋)の答えを漏らしていた**
  // さつまいもの問題が3問あったのも多すぎるので、題材ごと差し替えた。
  q(
    8,
    "Which brand of black-haired wagyu beef is raised in Ibaraki?|¿Qué marca de wagyū negro se cría en Ibaraki?|Quelle marque de wagyū noir élève-t-on à Ibaraki ?|茨城県で育てられている黒毛和牛の銘柄は?",
    [
      "Tajima beef|Ternera de Tajima|Le bœuf de Tajima|但馬牛",
      "Yonezawa beef|Ternera de Yonezawa|Le bœuf de Yonezawa|米沢牛",
      "Hitachi beef|Ternera de Hitachi|Le bœuf de Hitachi|常陸牛",
    ],
    2,
    "The name is the old province, and only cattle fattened for the last stretch inside the prefecture and graded highly may carry it. The herds are small — a few dozen head to a farm — and much of the feed is rice straw from the surrounding paddies. Tajima cattle come from Hyōgo and Yonezawa beef from Yamagata.|El nombre es el de la antigua provincia, y solo lo llevan reses cebadas en la prefectura y bien calificadas. Los rebaños son pequeños y comen paja de los arrozales vecinos. El tajima es de Hyōgo; el yonezawa, de Yamagata.|Le nom est celui de l'ancienne province, et seules les bêtes engraissées dans la préfecture et bien notées peuvent le porter. Les troupeaux sont petits et mangent la paille des rizières voisines. Le tajima vient de Hyōgo, le yonezawa de Yamagata.|名は旧国名からとられており、仕上げの期間を県内で肥育し、格付けの高いものだけがこれを名乗れる。一戸あたり数十頭という小さな群れが多く、飼料には周りの田から出る稲藁がよく使われる。但馬牛は兵庫、米沢牛は山形のものである。",
  ),

  // ---------------- 9〜10: 現地の人か、関心の強い人でないと ----------------
  q(
    9,
    "The Hitachi chronicle records that men and women gathered on Mount Tsukuba each spring and autumn to do what?|La crónica de Hitachi cuenta que hombres y mujeres subían al monte Tsukuba cada primavera y otoño a ¿qué?|La chronique du Hitachi rapporte qu'hommes et femmes montaient au mont Tsukuba au printemps et à l'automne pour quoi ?|『常陸国風土記』が伝える、春と秋に筑波山へ男女が集まって行ったことは?",
    [
      "To hold a market|A celebrar un mercado|Tenir un marché|市を開いた",
      "To exchange sung verses and find a partner|A intercambiar versos cantados y buscar pareja|Échanger des vers chantés et se choisir|歌を掛け合い、相手を見つけた",
      "To race to the summit|A competir hasta la cima|Faire la course au sommet|山頂まで競走した",
    ],
    1,
    "The kagai was a gathering where verses were sung back and forth and couples paired off, and the chronicle notes it plainly as the custom of the mountain. It records that people came from the neighbouring provinces for it, which makes it one of the earliest descriptions of an organised social occasion in Japan.|El kagai era un encuentro de versos cantados en el que se formaban parejas, y la crónica lo anota sin rodeos como costumbre del monte.|Le kagai était une assemblée de vers chantés où l'on se choisissait, et la chronique la note sans détour comme la coutume de la montagne.|嬥歌(かがい)は歌を掛け合いながら男女が結ばれる集まりで、風土記はそれをこの山の習わしとして淡々と記す。近隣の国からも人が集まったとあり、日本で最も早い時期の「催しごと」の記録の一つになっている。",
  ),
  // もとは「『水戸』という地名の由来は? → 水の門」だった。上と同じ理由で移した。
  q(
    9,
    "What is performed on top of the fifteen-metre floats at Hitachi's festival?|¿Qué se representa sobre las carrozas de quince metros en la fiesta de Hitachi?|Que joue-t-on au sommet des chars de quinze mètres lors de la fête de Hitachi ?|日立の祭りで、高さ15mほどの山車の上で演じられるものは?",
    [
      "Sumo bouts|Combates de sumo|Des combats de sumo|相撲の取組",
      "A play acted by marionettes|Una obra de marionetas|Une pièce jouée par des marionnettes|操り人形の芝居",
      "An archery contest|Un concurso de tiro con arco|Un concours de tir à l'arc|弓の競射",
    ],
    1,
    "The float opens out into a stage of five tiers and handlers hidden behind it work the puppets on strings; when the scene ends the whole float is turned round to play a second one on its reverse. It was made an important intangible folk cultural property in 1977 and joined the UNESCO list of float festivals in 2016.|La carroza se abre en un escenario de cinco pisos y unos titiriteros ocultos mueven los muñecos con hilos; al acabar la escena se gira la carroza entera para representar otra por detrás. Fue declarada bien cultural folclórico inmaterial importante en 1977 y entró en la lista de la UNESCO en 2016.|Le char s'ouvre en une scène à cinq étages et des manipulateurs cachés derrière animent les marionnettes ; la scène finie, on retourne le char entier pour en jouer une seconde au revers. Classé bien culturel folklorique immatériel important en 1977, il est entré sur la liste de l'UNESCO en 2016.|山車は五段の舞台に開き、陰に隠れた者が糸で人形を操って芝居を演じる。一場が終わると山車ごと向きを変え、裏側でもう一場を出す。1977年に国の重要無形民俗文化財に指定され、2016年には各地の山・鉾・屋台の行事とともにユネスコの一覧に加わった。",
  ),
  q(
    9,
    "Which writer from western Ibaraki wrote the farming novel \"Soil\"?|¿Qué escritor del oeste de Ibaraki escribió la novela campesina \"Tierra\"?|Quel écrivain de l'ouest d'Ibaraki écrivit le roman paysan \"La Terre\" ?|農村の暮らしを描いた小説『土』を書いた、県西生まれの作家は?",
    [
      "Shimazaki Tōson|Shimazaki Tōson|Shimazaki Tōson|島崎藤村",
      "Ishikawa Takuboku|Ishikawa Takuboku|Ishikawa Takuboku|石川啄木",
      "Nagatsuka Takashi|Nagatsuka Takashi|Nagatsuka Takashi|長塚節",
    ],
    2,
    "He farmed the land he wrote about, near what is now Jōsō, and set the book among tenant families over a single year of work. It ran in a newspaper in 1910 and readers complained that nothing happened in it. He was first a poet, a pupil of Masaoka Shiki, and died at thirty-six. Tōson was from Nagano and Takuboku from Iwate.|Cultivó la tierra que describió, cerca de la actual Jōsō, y situó el libro entre familias arrendatarias a lo largo de un año. Se publicó por entregas en 1910. Tōson era de Nagano; Takuboku, de Iwate.|Il cultivait la terre qu'il décrivait, près de l'actuelle Jōsō, et situa le livre chez des métayers sur une année. Paru en feuilleton en 1910. Tōson venait de Nagano, Takuboku d'Iwate.|彼は書いた土地を自ら耕していた。いまの常総のあたりで、小作の家族の一年を追う形で書かれている。1910年に新聞へ連載され、読者からは「何も起こらない」と苦情が来た。もとは正岡子規に学んだ歌人で、三十六で没した。島崎藤村は長野、石川啄木は岩手の生まれである。",
  ),
  q(
    9,
    "Before 1654, where did the Tone River empty?|Antes de 1654, ¿dónde desembocaba el río Tone?|Avant 1654, où se jetait le fleuve Tone ?|1654年より前、利根川はどこへ注いでいたか?",
    [
      "Into the Sea of Japan|En el mar del Japón|Dans la mer du Japon|日本海",
      "Into Edo Bay, where Tokyo Bay is now|En la bahía de Edo, hoy bahía de Tokio|Dans la baie d'Edo, aujourd'hui baie de Tokyo|江戸湾(いまの東京湾)",
      "Into Lake Kasumigaura|En el lago Kasumigaura|Dans le lac Kasumigaura|霞ヶ浦",
    ],
    1,
    "Sixty years of digging turned the river east to the Pacific instead, to stop it flooding the shogun's new capital and to open a boat route inland. The work created the waterways that made Ibaraki's river towns rich, and it is why the prefecture's southern boundary is a river at all.|Sesenta años de obras lo desviaron al este hacia el Pacífico, para no anegar la nueva capital y abrir una ruta fluvial hacia el interior.|Soixante ans de travaux le détournèrent vers l'est et le Pacifique, pour épargner la nouvelle capitale et ouvrir une voie d'eau vers l'intérieur.|六十年に及ぶ普請が川を東へ振り替え、太平洋へ注がせた。将軍の新しい都を洪水から守り、内陸への舟の道を開くためである。この工事が茨城の川の町を潤す水路を生み、県の南の境がそもそも川であるのもこのためである。",
  ),
  q(
    10,
    "On cold mornings the Kuji River carries thin plates of ice downstream. What are they called?|En mañanas frías el río Kuji arrastra láminas finas de hielo. ¿Cómo se llaman?|Par les matins froids, la Kuji charrie de minces plaques de glace. Comment les nomme-t-on ?|冷えた朝、県北の久慈川を薄い氷の板が流れてゆく。これを何と呼ぶか?",
    [
      "Diamond dust|Polvo de diamante|Poudre de diamant|ダイヤモンドダスト",
      "Omiwatari|Omiwatari|Omiwatari|御神渡り",
      "Shiga|Shiga|Shiga|シガ",
    ],
    2,
    "Ice forms on the shallows overnight, breaks up as the day warms, and drifts down in sheets that grind against each other with a dry sound. It needs a cold night, clear sky and low water all at once, so it appears only a handful of mornings a year and people drive out before dawn to see it. Diamond dust is airborne ice crystals; omiwatari is a ridge that heaves up on frozen Lake Suwa.|El hielo se forma de noche en los bajíos, se rompe al calentar el día y baja en láminas que chirrían al rozarse. Hacen falta noche fría, cielo raso y poca agua a la vez. El polvo de diamante son cristales en el aire; el omiwatari, una cresta en el lago Suwa helado.|La glace se forme la nuit sur les hauts-fonds, se brise au réchauffement et descend en plaques qui crissent. Il faut à la fois nuit froide, ciel clair et basses eaux. La poudre de diamant est faite de cristaux en suspension ; l'omiwatari, une crête sur le lac Suwa gelé.|夜のうちに浅瀬で張った氷が、日が高くなるにつれ割れ、板になって流れ下る。擦れ合って乾いた音を立てる。冷えた夜と晴れた空と水の少なさが揃わないと現れないため、見られるのは年に数えるほどの朝しかなく、人は夜明け前から見に出る。ダイヤモンドダストは空中の氷の結晶、御神渡りは凍った諏訪湖に盛り上がる氷の筋で、どちらも別のものである。",
  ),
  // 元は「芋畑とれんこん田が隣り合う理由は?」だったが、Q27 と同じ「なぜ」型で、
  // しかも前提が2つ(行方に芋畑、霞ヶ浦にれんこん田)。さつまいもは3問目でもあった。
  q(
    10,
    "Kashima and Katori shrines make two of the \"three shrines of the east\". Which is the third?|Los santuarios de Kashima y Katori son dos de los \"tres del este\". ¿Cuál es el tercero?|Kashima et Katori forment deux des \"trois sanctuaires de l'est\". Quel est le troisième ?|鹿島神宮・香取神宮とともに「東国三社」に数えられる社は?",
    [
      "Ōarai Isosaki|Ōarai Isosaki|Ōarai Isosaki|大洗磯前神社",
      "Kasama Inari|El Inari de Kasama|L'Inari de Kasama|笠間稲荷神社",
      "Ikisu|Ikisu|Ikisu|息栖神社",
    ],
    2,
    "Ikisu stands at Kamisu, where the Tone River meets the sea, and the three shrines sit at the corners of a triangle across the river mouth. Edo pilgrims who had been to Ise would come on to all three by boat, and the round was common enough to have its own name. Ikisu is the smallest and the least visited of the three.|Ikisu está en Kamisu, donde el Tone llega al mar, y los tres santuarios forman un triángulo en la desembocadura. Los peregrinos de Edo que habían ido a Ise recorrían los tres en barca. Ikisu es el menor y el menos visitado.|Ikisu se dresse à Kamisu, là où la Tone rejoint la mer, et les trois sanctuaires forment un triangle sur l'estuaire. Les pèlerins d'Edo revenus d'Ise les visitaient tous trois en barque. Ikisu est le plus petit et le moins fréquenté.|息栖神社は利根川が海に出るあたりの神栖にあり、三社は河口をまたぐ三角形の頂点に並ぶ。伊勢に参った江戸の人々は、その足で舟を使って三社を回った。ひとまとまりの巡礼として名を持つほど一般的だったという。三社のうち息栖はもっとも小さく、訪れる人も少ない。",
  ),
  q(
    10,
    "The old province name Hitachi is explained in its own chronicle as meaning what?|El antiguo nombre provincial Hitachi se explica en su propia crónica como ¿qué?|L'ancien nom provincial Hitachi s'explique, dans sa propre chronique, par quoi ?|旧国名「常陸」の由来として、風土記自身が説いているのは?",
    [
      "That the roads run straight through without a ferry|Que los caminos siguen de largo sin transbordo|Que les routes vont tout droit, sans bac|渡し舟を使わず道が直に通じているから",
      "That the sun stands still over it|Que el sol se detiene sobre ella|Que le soleil s'y arrête|日が動かず留まるから",
      "That it never freezes in winter|Que nunca se hiela en invierno|Qu'elle ne gèle jamais l'hiver|冬に凍らないから",
    ],
    0,
    "The chronicle offers hitamichi, \"the road straight through\", because a traveller could cross the province without taking a boat — flat ground and fordable rivers all the way. It also offers a second reading, that an ancient prince dipped his sleeve in a spring here, and cheerfully leaves both standing.|La crónica propone hitamichi, \"el camino derecho\", pues se cruzaba la provincia sin barca. Ofrece además una segunda lectura, la del príncipe que mojó su manga en un manantial, y deja las dos.|La chronique propose hitamichi, « la route tout droit », car on traversait la province sans bac. Elle en donne une seconde, celle du prince trempant sa manche à une source, et laisse les deux.|風土記は「直通(ひたみち)」を挙げる。渡し舟を使わずに国を越えられたからで、平らな地と歩いて渡れる川がそれを可能にした。もう一つ、古の皇子が泉で袖を漬した「衣袖漬(ころもでひたち)」も併記し、どちらとも決めずに残している。",
  ),
  q(
    1,
    "Which city is the seat of Ibaraki's prefectural government?|¿Qué ciudad es la capital de la prefectura de Ibaraki?|Quelle ville est le chef-lieu de la préfecture d'Ibaraki ?|茨城県の県庁所在地は?",
    [
      "Tsukuba|Tsukuba|Tsukuba|つくば",
      "Mito|Mito|Mito|水戸",
      "Kashima|Kashima|Kashima|鹿島",
    ],
    1,
    "Mito has been the administrative centre since long before the prefecture existed, as the castle town of a branch of the ruling Tokugawa family. It is not the largest city by population any more — Tsukuba has been catching up for years — but the offices never moved.|Mito es el centro administrativo desde mucho antes de que existiera la prefectura, como ciudad-castillo de una rama de los Tokugawa. Ya no es la más poblada, pero las oficinas nunca se mudaron.|Mito est le centre administratif bien avant l'existence de la préfecture, ville-château d'une branche des Tokugawa. Ce n'est plus la plus peuplée, mais les bureaux n'ont pas bougé.|水戸は県が生まれるはるか前から行政の中心だった。徳川一門の城下町だったからである。人口ではもはや県内一ではなく、つくばが長く迫っているが、役所は動いていない。",
  ),
  q(
    2,
    "Which of these does Ibaraki NOT share a border with?|¿Con cuál de estos NO limita Ibaraki?|Avec lequel Ibaraki ne partage-t-elle PAS de frontière ?|茨城県が接していないのは?",
    [
      "Fukushima|Fukushima|Fukushima|福島県",
      "Chiba|Chiba|Chiba|千葉県",
      "Tokyo|Tokio|Tokyo|東京都",
    ],
    2,
    "Ibaraki touches Fukushima to the north, Tochigi to the west, Saitama at one corner and Chiba across the Tone River — but never Tokyo, which sits just beyond Chiba and Saitama. It comes within about 40 km of the capital without ever meeting it.|Ibaraki toca Fukushima al norte, Tochigi al oeste, Saitama en una esquina y Chiba al otro lado del Tone, pero nunca Tokio.|Ibaraki touche Fukushima au nord, Tochigi à l'ouest, Saitama par un angle et Chiba de l'autre côté du Tone, mais jamais Tokyo.|茨城県は北で福島、西で栃木、一角で埼玉、利根川をはさんで千葉と接するが、東京とは接しない。東京は千葉と埼玉の向こうにある。首都から40kmほどまで近づきながら、一度も隣り合わない。",
  ),
  q(
    3,
    "An old saying pairs Mount Fuji in the west with which mountain in the east?|Un dicho antiguo empareja el Fuji, al oeste, con ¿qué monte al este?|Un vieux dicton associe le Fuji, à l'ouest, à quelle montagne à l'est ?|「西の富士、東の○○」と並び称される山は?",
    [
      "Mount Tsukuba|El monte Tsukuba|Le mont Tsukuba|筑波山",
      "Mount Asama|El monte Asama|Le mont Asama|浅間山",
      "Mount Bandai|El monte Bandai|Le mont Bandai|磐梯山",
    ],
    0,
    "Tsukuba is barely a quarter of Fuji's height, so the pairing is not about size but about standing alone and being seen from far off across flat country. Its slopes change colour through the day, which earned it the nickname \"the purple mountain\".|El Tsukuba no llega ni a un cuarto de la altura del Fuji: la pareja no habla de tamaño, sino de alzarse solo y verse de lejos. Sus laderas cambian de color y le valieron el apodo de \"monte púrpura\".|Le Tsukuba n'atteint pas le quart du Fuji : l'appariement ne parle pas de taille mais d'isolement et de visibilité. Ses pentes changent de teinte, d'où son surnom de « mont pourpre ».|筑波山の高さは富士山の四分の一にも満たない。並び称されるのは大きさではなく、平野に独り立ち、遠くからよく見えるからである。日のうちに山肌の色が移ろうことから「紫峰」とも呼ばれる。",
  ),
  q(
    5,
    "The lords of Mito held what position among the Tokugawa?|Los señores de Mito ocupaban ¿qué lugar entre los Tokugawa?|Les seigneurs de Mito occupaient quelle place chez les Tokugawa ?|水戸の藩主が徳川家のなかで占めた位置は?",
    [
      "They were retainers from a rival clan|Eran vasallos de un clan rival|C'étaient des vassaux d'un clan rival|敵方から降った家臣",
      "They were one of the three senior branch houses|Eran una de las tres casas principales|C'était l'une des trois maisons principales|御三家の一つ",
      "They were merchants raised to samurai rank|Eran comerciantes ascendidos a samuráis|C'étaient des marchands anoblis|武士に取り立てられた商人",
    ],
    1,
    "Mito was one of the three branch families entitled to supply a shogun if the main line failed, along with Owari and Kii. Unusually, its lord was expected to stay in Edo rather than travel back and forth, which is why the domain's thinking carried so directly into the capital.|Mito era una de las tres casas que podían dar un shogun si fallaba la línea principal. Su señor debía residir en Edo en vez de ir y volver.|Mito était l'une des trois maisons pouvant fournir un shogun à défaut de la lignée principale. Son seigneur devait résider à Edo plutôt que faire la navette.|水戸は、本家が絶えたときに将軍を出しうる三家の一つで、尾張・紀伊と並ぶ。ただし参勤交代をせず江戸に定府するのが常で、この藩の考えが都へ直に及んだのはそのためである。",
  ),
  q(
    5,
    "Which variety of buckwheat was bred in Ibaraki and is sought out by soba makers?|¿Qué variedad de trigo sarraceno se crió en Ibaraki y buscan los maestros de soba?|Quelle variété de sarrasin, créée à Ibaraki, les maîtres de soba recherchent-ils ?|そば職人が指名して買う、茨城で育てられたそばの品種は?",
    [
      "Kitawase|Kitawase|Kitawase|キタワセソバ",
      "Hitachi-aki-soba|Hitachi-aki-soba|Hitachi-aki-soba|常陸秋そば",
      "Shinano-ichigō|Shinano-ichigō|Shinano-ichigō|信濃一号",
    ],
    1,
    "The strain was selected in the valleys of Kuji in the 1970s, where the day-to-night temperature swing is wide and river fog sits in the hollows each autumn morning. That gap is what thickens the grain, and buyers order by the district rather than by the sack. Kitawase is a Hokkaidō variety bred to ripen early, and Shinano-ichigō comes from Nagano.|La variedad se seleccionó en los valles de Kuji en los años setenta, donde el salto térmico es amplio y la niebla del río llena las hondonadas en otoño. Kitawase es de Hokkaidō y Shinano-ichigō, de Nagano.|La variété fut sélectionnée dans les vallées de Kuji vers 1970, où l'amplitude thermique est forte et où le brouillard de rivière emplit les creux à l'automne. Kitawase vient de Hokkaidō, Shinano-ichigō de Nagano.|この品種は1970年代、久慈の谷で選び抜かれた。昼と夜の寒暖の差が大きく、秋の朝には川霧が窪地に溜まる土地である。その差が実を太らせる。買い手は袋ではなく産地の字(あざ)を指定して注文する。キタワセソバは早く実るよう育てられた北海道の品種、信濃一号は長野のものである。",
  ),
  q(
    6,
    "Lake Hinuma, on the coast, is unusual among Japanese lakes for what?|El lago Hinuma, junto a la costa, es raro entre los lagos japoneses por ¿qué?|Le lac Hinuma, près de la côte, est rare parmi les lacs japonais par quoi ?|海に近い涸沼が、日本の湖として珍しいのは?",
    [
      "Salt and fresh water mix in it|Mezcla agua salada y dulce|L'eau salée et l'eau douce s'y mêlent|海水と淡水が混じり合っていること",
      "It freezes solid every winter|Se hiela por completo cada invierno|Il gèle entièrement chaque hiver|毎年完全に凍ること",
      "It has no fish at all|No tiene peces|Il n'abrite aucun poisson|魚がまったくいないこと",
    ],
    0,
    "The tide pushes up the Naka River twice a day and turns Hinuma brackish, which is exactly the water the yamato-shijimi clam wants. Kasumigaura next door used to be the same until a floodgate shut the sea out in 1963, leaving Hinuma as the one that stayed.|La marea remonta el río Naka dos veces al día y vuelve salobre el Hinuma, justo el agua que quiere la almeja yamato-shijimi.|La marée remonte le fleuve Naka deux fois par jour et rend le Hinuma saumâtre : exactement l'eau que veut la palourde yamato-shijimi.|潮が一日に二度、那珂川を遡って涸沼を汽水にする。ヤマトシジミが求めるのはまさにその水である。隣の霞ヶ浦もかつては同じだったが、1963年に水門で海を締め切られた。涸沼はそのまま残ったほうである。",
  ),
];
