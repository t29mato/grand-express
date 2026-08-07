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
 * **都市カードと題材が重ならないようにしてある。**同じ話を二度読ませないため、
 * 偕楽園・笠間焼・神磯の鳥居・日立製作所・五浦の六角堂・花貫渓谷・西山荘・
 * 西塩子の回り舞台・袋田の滝・鹿島の要石・潮来の嫁入り舟・神栖のピーマン・
 * 行方のさつまいも・鉾田のメロン・つくばの研究学園都市・土浦の花火・石岡の国府・
 * かすみがうらの帆引き船・牛久大仏・龍ケ崎の撞舞・取手宿・阿見の予科練・
 * 稲敷の大杉神社・つくばみらいの板橋不動尊は、いずれも都市カードが扱うので避けている。
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
    "Which of these does Ibaraki grow more of than any other prefecture?|¿De cuál de estos produce Ibaraki más que ninguna otra prefectura?|De quoi Ibaraki produit-elle plus que toute autre préfecture ?|茨城県が全国一の産出量をもつのは?",
    [
      "Coffee|Café|Le café|コーヒー",
      "Lotus root|Raíz de loto|La racine de lotus|れんこん",
      "Olives|Aceitunas|Les olives|オリーブ",
    ],
    1,
    "Almost half of Japan's lotus root comes out of the wet flats around Kasumigaura, where the soil is too soft and waterlogged for rice to do well. It is dug by hand in winter, the grower standing in the mud and washing each root free with a jet of water.|Casi la mitad del loto japonés sale de los llanos húmedos de Kasumigaura, donde el suelo es demasiado blando para el arroz. Se arranca a mano en invierno, con chorro de agua.|Près de la moitié du lotus japonais vient des bas-fonds humides de Kasumigaura, trop mous et gorgés d'eau pour le riz. On l'arrache à la main en hiver, au jet d'eau.|日本のれんこんのおよそ半分が、霞ヶ浦周辺の低湿地から穫れる。土が柔らかく水を含みすぎて稲には向かない土地である。冬、泥の中に立って水を噴きつけながら一本ずつ手で掘り上げる。",
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
    "Ibaraki Airport shares its runway with what?|El aeropuerto de Ibaraki comparte pista con ¿qué?|L'aéroport d'Ibaraki partage sa piste avec quoi ?|茨城空港が滑走路を共用している相手は?",
    [
      "A motor-racing circuit|Un circuito de carreras|Un circuit automobile|自動車のレース場",
      "A university|Una universidad|Une université|大学",
      "An air force base|Una base aérea|Une base aérienne|航空自衛隊の基地",
    ],
    2,
    "The passenger terminal was added to Hyakuri air base in 2010 and has just a handful of gates, reached on foot across the apron. Because the military already owned the runway, the prefecture built one of the cheapest airports in the country.|La terminal se añadió a la base aérea de Hyakuri en 2010 y tiene apenas unas puertas, a las que se llega a pie por la pista. Al ser militar el asfalto, salió de los aeropuertos más baratos del país.|Le terminal fut greffé sur la base aérienne de Hyakuri en 2010 : quelques portes seulement, rejointes à pied sur le tarmac. La piste étant militaire, ce fut l'un des aéroports les moins chers du pays.|旅客ターミナルは2010年に百里飛行場へ後から足されたもので、搭乗口はごくわずか、駐機場を歩いて渡る。滑走路が既に自衛隊のものだったため、全国でも建設費のきわめて安い空港になった。",
  ),
  q(
    6,
    "Ōarai's ferries sail overnight to which island?|Los ferris de Ōarai navegan de noche hacia ¿qué isla?|Les ferries d'Ōarai gagnent de nuit quelle île ?|大洗から夜行のフェリーが渡る島は?",
    [
      "Hokkaidō|Hokkaidō|Hokkaidō|北海道",
      "Shikoku|Shikoku|Shikoku|四国",
      "Okinawa|Okinawa|Okinawa|沖縄",
    ],
    0,
    "The crossing to Tomakomai takes about nineteen hours and carries as many lorries as passengers, because it saves a long haul up the length of Honshū. Much of the milk and produce that leaves Hokkaidō for the Tokyo region comes ashore here.|La travesía a Tomakomai dura unas diecinueve horas y lleva tantos camiones como pasajeros, pues ahorra recorrer todo Honshū.|La traversée vers Tomakomai dure environ dix-neuf heures et transporte autant de camions que de passagers : elle épargne toute la longueur de Honshū.|苫小牧までは19時間ほどで、乗客と同じくらい貨物車を運ぶ。本州を縦断する長い陸送を省けるからである。北海道から首都圏へ向かう牛乳や農産物の多くが、この港に揚がる。",
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
  q(
    7,
    "Ushiku holds what is called Japan's first proper winery, opened in which decade?|Ushiku alberga la que se llama primera bodega moderna de Japón, abierta ¿en qué década?|Ushiku abrite ce qu'on dit la première vraie cave du Japon, ouverte en quelle décennie ?|日本初の本格的なワイン醸造場とされる牛久のそれが開かれたのは?",
    [
      "The 1900s|Los años 1900|Les années 1900|1900年代",
      "The 1950s|Los años 1950|Les années 1950|1950年代",
      "The 1980s|Los años 1980|Les années 1980|1980年代",
    ],
    0,
    "Kamiya Denbei planted vines on the sandy plateau and finished his château in 1903, doing everything from growing to bottling on one site — the first in Japan to do so. He had already made his money selling a cheap sweetened brandy in Asakusa, and put it all into the vineyard.|Kamiya Denbei plantó viñas en la meseta arenosa y terminó su château en 1903, cultivando y embotellando en un mismo sitio, el primero de Japón.|Kamiya Denbei planta des vignes sur le plateau sableux et acheva son château en 1903, cultivant et embouteillant sur un même site, une première au Japon.|神谷伝兵衛は砂質の台地に葡萄を植え、1903年に醸造場を完成させた。栽培から瓶詰めまでを一か所で行う日本最初の施設である。浅草で安価な甘味葡萄酒を売って得た財を、すべてこの葡萄畑に注ぎ込んだ。",
  ),
  q(
    7,
    "A lord of Mito is credited with being among the first in Japan to eat which dish?|A un señor de Mito se le atribuye ser de los primeros de Japón en comer ¿qué plato?|Un seigneur de Mito passe pour l'un des premiers Japonais à avoir mangé quel plat ?|水戸の藩主が日本で最初期に口にしたとされる料理は?",
    [
      "Curry|Curry|Le curry|カレー",
      "Chinese noodles in soup|Fideos chinos en caldo|Des nouilles chinoises en bouillon|中国風の汁そば(ラーメン)",
      "Bread|Pan|Le pain|パン",
    ],
    1,
    "A Ming scholar living in exile at Mito showed the lord how to make wheat noodles served in a broth, and a record of 1697 describes him eating them. The same scholar brought the lotus root and the pickled ginger that went with them.|Un erudito Ming exiliado en Mito le enseñó a hacer fideos de trigo en caldo, y un registro de 1697 lo describe comiéndolos.|Un lettré Ming exilé à Mito lui montra comment faire des nouilles de blé en bouillon ; un document de 1697 le décrit en train d'en manger.|水戸に亡命していた明の儒学者が、小麦の麺を汁に入れて食べる作り方を藩主に教えた。1697年の記録に、それを食した様子が残る。同じ学者は、添える蓮根や生姜の漬物も伝えている。",
  ),
  q(
    7,
    "Why is the shore at Ōarai and Hitachi a well-known place to watch the first sunrise of the year?|¿Por qué la costa de Ōarai e Hitachi es famosa para ver el primer amanecer del año?|Pourquoi la côte d'Ōarai et d'Hitachi est-elle réputée pour le premier lever de soleil de l'année ?|大洗や日立の海岸が初日の出の名所とされる理由は?",
    [
      "It is the highest cliff in Japan|Es el acantilado más alto de Japón|C'est la plus haute falaise du Japon|日本一高い崖だから",
      "The sun rises there before anywhere else in Japan|Allí sale antes que en ningún otro sitio de Japón|Le soleil s'y lève avant partout ailleurs au Japon|日本で最も早く日が昇るから",
      "It faces due east over open ocean with nothing in the way|Mira al este sobre mar abierto, sin nada delante|Elle regarde plein est sur la pleine mer, sans rien devant|遮るもののない東向きの外洋に面しているから",
    ],
    2,
    "The coast runs almost north–south and faces open Pacific, so the sun comes straight up out of the water rather than over a headland or an island. Hitachi's station was rebuilt in glass over the platforms so that passengers see the same sunrise from inside it.|La costa corre casi de norte a sur frente al Pacífico abierto: el sol sale del agua y no tras un cabo. La estación de Hitachi se rehízo en vidrio para verlo desde dentro.|La côte court presque nord-sud face au Pacifique ouvert : le soleil sort de l'eau, non derrière un cap. La gare d'Hitachi fut refaite en verre pour qu'on le voie de l'intérieur.|海岸線がほぼ南北に走り、外洋の太平洋に正面から向いているので、岬や島の陰からではなく水平線から日が直接昇る。日立の駅はホームの上まで硝子で建て直され、乗客が構内から同じ日の出を見られるようになっている。",
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
  q(
    8,
    "Why does Ibaraki dry so much of Japan's sweet potato rather than another prefecture?|¿Por qué seca Ibaraki tanto boniato y no otra prefectura?|Pourquoi Ibaraki sèche-t-elle tant de patates douces plutôt qu'une autre préfecture ?|干し芋を作るのが他県ではなく茨城に集中している理由は?",
    [
      "Its winters are cold, dry and windy with little snow|Sus inviernos son fríos, secos y ventosos, con poca nieve|Ses hivers sont froids, secs, venteux et peu neigeux|冬が寒く乾いて風があり、雪が少ないから",
      "It has the warmest winters in Japan|Tiene los inviernos más cálidos de Japón|Elle a les hivers les plus doux du Japon|冬が日本でいちばん暖かいから",
      "It is the only place the crop will grow|Es el único sitio donde crece|C'est le seul endroit où la culture pousse|そこでしか作物が育たないから",
    ],
    0,
    "The slices are laid on open racks and must dry before they spoil, so the weather does the work: cold enough to keep them, dry enough to draw the water out, windy enough to move it along, and clear enough not to soak them. Sweet potatoes grow in many places, but few have all four at once.|Las lonchas se tienden al aire libre y deben secarse antes de estropearse: el clima hace el trabajo. El boniato crece en muchos sitios; pocos reúnen las cuatro condiciones.|Les tranches sèchent à l'air libre avant de s'abîmer : c'est le climat qui travaille. La patate douce pousse partout, mais peu de lieux réunissent les quatre conditions.|薄く切った芋は野天の棚に並べられ、傷む前に乾かねばならない。仕事をするのは天候である。保つだけの寒さ、水を抜く乾き、それを運ぶ風、濡らさない晴天。さつまいも自体は各地で穫れるが、この四つが揃う土地は少ない。",
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
  q(
    9,
    "Mito's name is usually explained as referring to what?|El nombre de Mito suele explicarse como referido a ¿qué?|Le nom de Mito s'explique d'ordinaire par quoi ?|「水戸」という地名の由来として、ふつう説かれるのは?",
    [
      "A gate on the water|Una puerta sobre el agua|Une porte sur l'eau|水の門(river gateway)",
      "Three doorways|Tres puertas|Trois portes|三つの門",
      "A well that never dries|Un pozo que nunca se seca|Un puits qui ne tarit pas|涸れない井戸",
    ],
    0,
    "The characters read \"water gate\", and the town grew where the Naka River could be crossed and boats could be turned round — the gateway between the coast and the inland valleys. Goods came up by river to here and went on by road, which is why the castle was placed above the bend.|Los caracteres significan \"puerta del agua\": la ciudad creció donde el río Naka podía cruzarse y las barcas virar, entre la costa y los valles interiores.|Les caractères disent « porte de l'eau » : la ville naquit là où le fleuve Naka se franchissait et où les barques viraient, entre la côte et les vallées.|字は「水の門」と読む。那珂川を渡れ、舟を回せるところ、つまり海と内陸の谷とを結ぶ門口に町が育った。荷は川をここまで遡り、陸路へ移された。城が川の曲がりの上に置かれたのはそのためである。",
  ),
  q(
    9,
    "Mount Tsukuba is made largely of gabbro and granite, which gives it what?|El monte Tsukuba es sobre todo gabro y granito, lo que le da ¿qué?|Le mont Tsukuba est surtout fait de gabbro et de granite, ce qui lui donne quoi ?|筑波山は主に斑れい岩と花崗岩からなる。そこから生じている特徴は?",
    [
      "Hot springs at the summit|Aguas termales en la cima|Des sources chaudes au sommet|山頂の温泉",
      "A permanent snow cap|Nieves perpetuas|Des neiges éternelles|万年雪",
      "Rounded boulders that split into slabs|Bloques redondeados que se parten en losas|Des blocs arrondis qui se fendent en dalles|板状に割れる丸い巨岩",
    ],
    2,
    "Unlike almost every other famous Japanese mountain, Tsukuba is not a volcano: it is a body of deep-cooled rock that the surrounding land wore away from around, leaving it standing. The stone splits along flat joints, and the boulders it sheds have been quarried for grave markers and bridge piers for centuries.|A diferencia de casi todo monte célebre de Japón, el Tsukuba no es un volcán: es roca enfriada en profundidad que quedó en pie al erosionarse lo demás.|Contrairement à presque tous les monts célèbres du Japon, le Tsukuba n'est pas un volcan : c'est une roche refroidie en profondeur, restée debout quand le reste s'est usé.|日本の名だたる山のほとんどと違い、筑波山は火山ではない。地下深くで冷え固まった岩体が、周りの土地が削られたあとに残ったものである。石は平らな節理に沿って割れ、崩れ落ちた巨岩は何世紀も墓石や橋脚に切り出されてきた。",
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
    "A poem in the classic Hundred Poets anthology compares deepening love to what on Mount Tsukuba?|Un poema de la antología de los Cien Poetas compara el amor que crece con ¿qué del monte Tsukuba?|Un poème des Cent Poètes compare l'amour qui s'accroît à quoi, au mont Tsukuba ?|百人一首の歌が、募る恋にたとえた筑波山のものは?",
    [
      "The wind through the pines|El viento entre los pinos|Le vent dans les pins|松を渡る風",
      "The shadow of the twin peaks|La sombra de las dos cumbres|L'ombre des deux cimes|二つの峰の影",
      "A stream that gathers into a deep pool|Un arroyo que se remansa en una poza|Un ruisseau qui se creuse en gouffre|流れ落ちて淵となる川",
    ],
    2,
    "The retired emperor Yōzei wrote that the Minano River falls from the peak and piles up until it becomes a deep pool, as his longing had. The stream is small enough to step across near the top, which is the point of the image — it is the piling up, not the size, that makes the depth.|El emperador retirado Yōzei escribió que el río Minano cae de la cumbre y se acumula hasta hacerse un remanso, como su anhelo. Arriba se cruza de un paso.|L'empereur retiré Yōzei écrivit que la Minano tombe du sommet et s'amasse jusqu'à devenir un gouffre, comme son désir. En haut, on l'enjambe d'un pas.|陽成院は「筑波嶺の峰より落つるみなの川 恋ぞ積もりて淵となりぬる」と詠んだ。男女川は山頂近くでは一跨ぎで越えられるほど細い。そこがこの歌の眼目で、深さを作るのは水量ではなく積み重なりだという。",
  ),
  q(
    10,
    "Why do the sweet-potato fields of Namegata and the lotus beds of Kasumigaura sit so close together?|¿Por qué están tan cerca los boniatales de Namegata y los lotales de Kasumigaura?|Pourquoi les champs de patates de Namegata et les lotus de Kasumigaura se touchent-ils ?|行方のさつまいも畑と霞ヶ浦のれんこん田が、すぐ隣り合っている理由は?",
    [
      "The same crop is rotated between them|Se rota el mismo cultivo entre ambos|On y fait tourner la même culture|同じ作物を交互に作っているから",
      "Both need the same amount of water|Ambos necesitan la misma agua|Tous deux exigent autant d'eau|必要な水の量が同じだから",
      "One sits on the dry plateau, the other in the wet hollow below it|Uno está en la meseta seca; el otro, en la hondonada húmeda|L'un est sur le plateau sec, l'autre dans le creux humide|一方は乾いた台地、もう一方はその下の湿った窪地にあるから",
    ],
    2,
    "The land here is a staircase of sandy tables cut by shallow flooded valleys, and the two crops want exactly opposite ground: sweet potatoes rot in wet soil, lotus will not grow without standing water. A farmer can walk from one to the other in ten minutes and be in a different agriculture.|La tierra es una escalera de mesetas arenosas cortada por valles anegados, y los dos cultivos quieren suelos opuestos.|Le sol est un escalier de plateaux sableux entaillés de vallées noyées, et les deux cultures veulent des terres opposées.|この一帯は、浅く水を湛えた谷に刻まれた砂質の台地が階段状に連なる地形で、二つの作物は正反対の土を求める。さつまいもは湿った土では腐り、れんこんは水を張らねば育たない。農家は十分歩けば、まったく別の農業の中に立っている。",
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
    "Hitachi-aki-soba, a buckwheat prized by soba makers, owes its flavour to what?|El hitachi-aki-soba, trigo sarraceno muy apreciado, debe su sabor a ¿qué?|Le hitachi-aki-soba, sarrasin prisé, doit sa saveur à quoi ?|そば職人に好まれる「常陸秋そば」の味を生んでいるのは?",
    [
      "Being grown in seawater|Cultivarse en agua de mar|Une culture en eau de mer|海水で育てること",
      "Being harvested before it flowers|Cosecharse antes de florecer|Une récolte avant la floraison|花が咲く前に穫ること",
      "Cold nights and morning fog on the northern hills|Noches frías y niebla matinal en los cerros del norte|Nuits froides et brouillard matinal sur les collines du nord|県北の丘の冷えた夜と朝霧",
    ],
    2,
    "The strain was selected in the valleys of Kuji in the 1970s, where the day-to-night temperature swing is wide and river fog sits in the hollows each autumn morning. That gap is what thickens the grain, and buyers pay by the district rather than by the sack.|La variedad se seleccionó en los valles de Kuji en los años setenta, donde el salto térmico es amplio y la niebla del río llena las hondonadas en otoño.|La variété fut sélectionnée dans les vallées de Kuji vers 1970, où l'amplitude thermique est forte et où le brouillard de rivière emplit les creux à l'automne.|この品種は1970年代、久慈の谷で選び抜かれた。昼と夜の寒暖の差が大きく、秋の朝には川霧が窪地に溜まる土地である。その差が実を太らせる。買い手は袋ではなく産地の字(あざ)を指定して買う。",
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
