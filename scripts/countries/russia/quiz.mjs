/**
 * ロシアのクイズ(36問)。
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
 * 都市カード(48件)が扱う具体的な事実(モスクワの聖ワシリイ聖堂の伝説・
 * サマラのソユーズ組立・オムスクのドストエフスキー幽閉・ヤクーツクの
 * マンモス牙など)はここでは問わない。代わりに地理・歴史・文化・現代の
 * 暮らしなど、**都市カードが触れていない主題**を選んである。
 * ヴォルガ川とカスピ海については複数の都市カードで触れているため、
 * 一般常識として問える設問(欧州最長の川・世界最大の湖)に絞ってある。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が12問ずつになるよう散らしてある。
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

export const RUSSIA_QUIZ = [
  q(
    1,
    "What is the capital of Russia?|¿Cuál es la capital de Rusia?|Quelle est la capitale de la Russie ?|ロシアの首都はどこか?",
    ["Moscow|Moscú|Moscou|モスクワ", "Saint Petersburg|San Petersburgo|Saint-Pétersbourg|サンクトペテルブルク", "Novosibirsk|Novosibirsk|Novossibirsk|ノヴォシビルスク"],
    0,
    "Moscow has been the political capital since the 15th century, with one notable break: Saint Petersburg held the title from 1712 until 1918, when the young Soviet government moved the seat of power back to Moscow.|Moscú ha sido la capital política desde el siglo XV, con una pausa notable: San Petersburgo ostentó el título de 1712 a 1918, cuando el joven gobierno soviético trasladó de vuelta la sede del poder a Moscú.|Moscou est la capitale politique depuis le XVe siècle, avec une pause notable : Saint-Pétersbourg porta ce titre de 1712 à 1918, quand le jeune gouvernement soviétique ramena le siège du pouvoir à Moscou.|モスクワは15世紀以来ずっと政治の首都だが、一度だけ例外があった。1712年から1918年まではサンクトペテルブルクが首都で、若きソビエト政権が権力の座をモスクワへ戻したことで元に戻った。",
  ),
  q(
    1,
    "What is Russia's national currency?|¿Cuál es la moneda nacional de Rusia?|Quelle est la monnaie nationale de la Russie ?|ロシアの通貨は何か?",
    ["The hryvnia|La grivna|La hryvnia|フリヴニャ", "The ruble|El rublo|Le rouble|ルーブル", "The zloty|El zloty|Le zloty|ズウォティ"],
    1,
    "The ruble is one of the oldest currency names still in use anywhere, first recorded in the 13th century, long before it became a coin in the modern sense.|El rublo es uno de los nombres de moneda más antiguos que aún se usan, registrado por primera vez en el siglo XIII, mucho antes de convertirse en una moneda acuñada en el sentido moderno.|Le rouble est l'un des noms de monnaie les plus anciens encore en usage, attesté dès le XIIIe siècle, bien avant de devenir une pièce frappée au sens moderne.|ルーブルという名は、現代的な意味での硬貨になるずっと前、13世紀にはすでに記録されている、いまも使われている中でも指折り古い通貨名の一つである。",
  ),
  q(
    2,
    "What alphabet is the Russian language written in?|¿En qué alfabeto se escribe el idioma ruso?|Dans quel alphabet la langue russe s'écrit-elle ?|ロシア語はどの文字で書かれるか?",
    ["The Latin alphabet|El alfabeto latino|L'alphabet latin|ラテン文字", "The Greek alphabet|El alfabeto griego|L'alphabet grec|ギリシャ文字", "The Cyrillic alphabet|El alfabeto cirílico|L'alphabet cyrillique|キリル文字"],
    2,
    "Cyrillic developed in the First Bulgarian Empire in the 9th or 10th century, building on the earlier Glagolitic script credited to the missionaries Cyril and Methodius, and it now serves as the writing system for dozens of languages beyond Russian.|El cirílico se desarrolló en el Primer Imperio búlgaro en el siglo IX o X, a partir del alfabeto glagolítico anterior, atribuido a los misioneros Cirilo y Metodio.|Le cyrillique se développa dans le Premier Empire bulgare au IXe ou Xe siècle, sur la base du glagolitique antérieur, attribué aux missionnaires Cyrille et Méthode.|キリル文字は9世紀か10世紀の第一次ブルガリア帝国で、宣教師キュリロスとメトディオスが考案したとされるそれ以前のグラゴル文字をもとに発達した。いまではロシア語以外にも数十の言語の表記に使われている。",
  ),
  q(
    2,
    "Russia is the world's largest country by what measure?|¿Rusia es el país más extenso del mundo según qué criterio?|La Russie est le plus vaste pays du monde selon quel critère ?|ロシアはどの基準で世界最大の国か?",
    ["Land area|Superficie terrestre|Superficie terrestre|国土面積", "Population|Población|Population|人口", "Coastline length|Longitud de costa|Longueur de côtes|海岸線の長さ"],
    0,
    "At over 17 million square kilometres, Russia covers roughly one-eighth of the Earth's inhabited land, nearly twice the area of the next-largest country, Canada.|Con más de 17 millones de kilómetros cuadrados, Rusia cubre aproximadamente una octava parte de la tierra habitada de la Tierra, casi el doble del área del siguiente país más extenso, Canadá.|Avec plus de 17 millions de kilomètres carrés, la Russie couvre environ un huitième des terres habitées de la planète, presque le double de la superficie du pays suivant, le Canada.|1700万平方キロメートルを超えるロシアの国土は地球の陸地のおよそ8分の1を占め、次に大きいカナダのほぼ2倍の面積がある。",
  ),
  q(
    2,
    "How many time zones does Russia span?|¿Cuántos husos horarios abarca Rusia?|Combien de fuseaux horaires la Russie couvre-t-elle ?|ロシアはいくつの時間帯にまたがるか?",
    ["8|8|8|8つ", "11|11|11|11", "5|5|5|5つ"],
    1,
    "From Kaliningrad on the Baltic to Chukotka across from Alaska, Russia's 11 time zones mean that when it is breakfast time in the west, workers in the Far East are already well into the evening.|Desde Kaliningrado en el Báltico hasta Chukotka frente a Alaska, los 11 husos horarios de Rusia significan que cuando es hora de desayunar en el oeste, en el Lejano Oriente ya es bien entrada la noche.|De Kaliningrad sur la Baltique jusqu'à la Tchoukotka face à l'Alaska, les 11 fuseaux horaires de la Russie font que lorsqu'il est l'heure du petit-déjeuner à l'ouest, la soirée est déjà bien avancée en Extrême-Orient.|バルト海に面したカリーニングラードからアラスカの向かいのチュクチまで、ロシアの11の時間帯のせいで、西部が朝食どきのとき、極東はもう夜がふけている。",
  ),
  q(
    3,
    "Russia has historically produced an unusually large number of world champions in which board game?|¿En qué juego de mesa Rusia ha producido históricamente un número inusualmente grande de campeones mundiales?|Dans quel jeu de société la Russie a-t-elle historiquement produit un nombre inhabituellement élevé de champions du monde ?|ロシアが歴代世界チャンピオンを異例なほど多く輩出してきたボードゲームは?",
    ["Cricket|Críquet|Cricket|クリケット", "Golf|Golf|Golf|ゴルフ", "Chess|Ajedrez|Les échecs|チェス"],
    2,
    "From 1948 to 2007, players from the Soviet Union or Russia held the world chess championship almost without interruption, a run built on state-supported chess schools that trained children from a very young age.|De 1948 a 2007, jugadores de la Unión Soviética o Rusia ostentaron el campeonato mundial de ajedrez casi sin interrupción, una racha basada en escuelas de ajedrez apoyadas por el estado.|De 1948 à 2007, des joueurs de l'Union soviétique ou de Russie détinrent le titre de champion du monde d'échecs presque sans interruption, une série bâtie sur des écoles d'échecs soutenues par l'État.|1948年から2007年まで、世界チェス選手権のタイトルはほぼ絶えることなくソ連またはロシアの選手が保持し続けた。これは国が支えるチェス教室が幼い頃から子供たちを鍛えてきた成果である。",
  ),
  q(
    3,
    "What is a banya?|¿Qué es una banya?|Qu'est-ce qu'une banya ?|バーニャとは何か?",
    ["A steam bathhouse where bathers switch themselves with birch branches|Una casa de baños de vapor donde los bañistas se azotan con ramas de abedul|Un bain de vapeur où les baigneurs se fouettent avec des branches de bouleau|白樺の枝で体を叩くスチーム式の蒸し風呂", "A type of dark rye bread|Un tipo de pan de centeno oscuro|Un type de pain de seigle noir|黒いライ麦パンの一種", "A traditional wedding dance|Un baile tradicional de boda|Une danse traditionnelle de mariage|伝統的な結婚式の踊り"],
    0,
    "A proper banya session alternates between a very hot steam room and a plunge into cold water or snow, and gently striking the skin with a bundle of birch or oak leaves, a venik, is said to improve circulation.|Una sesión de banya adecuada alterna entre una sala de vapor muy caliente y un chapuzón en agua fría o nieve, y golpear suavemente la piel con un manojo de hojas de abedul o roble, un venik, se dice que mejora la circulación.|Une séance de banya digne de ce nom alterne un sauna très chaud et un plongeon dans l'eau froide ou la neige, et frapper doucement la peau avec un fagot de feuilles de bouleau ou de chêne, un venik, est censé améliorer la circulation.|きちんとしたバーニャは、非常に熱い蒸し風呂と、冷水や雪への飛び込みを交互に行い、白樺や樫の葉束「ヴェニク」で肌を軽く叩くことで血行が良くなるとされる。",
  ),
  q(
    3,
    "What is a matryoshka?|¿Qué es una matrioshka?|Qu'est-ce qu'une matriochka ?|マトリョーシカとは何か?",
    ["A type of fur hat|Un tipo de gorro de piel|Un type de chapeau de fourrure|毛皮帽子の一種", "A set of wooden dolls that nest one inside another|Un juego de muñecas de madera que se anidan una dentro de otra|Un ensemble de poupées en bois s'emboîtant l'une dans l'autre|一回り小さい人形が中に入れ子になった木製の人形一式", "A brass tea urn used to brew a concentrate|Un samovar de latón usado para preparar un concentrado|Un samovar en laiton pour préparer un concentré|濃い茶を淹れる真鍮製の湯沸かし"],
    1,
    "The first matryoshka set is generally dated to the 1890s, made by a craftsman working from a design workshop near Moscow, and the largest doll traditionally depicts a peasant woman holding a black rooster.|El primer juego de matrioshkas se data generalmente en la década de 1890, hecho por un artesano de un taller de diseño cerca de Moscú, y la muñeca más grande representa tradicionalmente a una campesina con un gallo negro.|Le premier ensemble de matriochkas est généralement daté des années 1890, réalisé par un artisan d'un atelier de conception près de Moscou, et la plus grande poupée représente traditionnellement une paysanne tenant un coq noir.|最初のマトリョーシカ一式は一般に1890年代、モスクワ近郊の工房で働く職人の手によるものとされ、いちばん大きな人形は伝統的に黒い雄鶏を抱いた農婦を表す。",
  ),
  q(
    4,
    "Pyotr Ilyich Tchaikovsky composed which of these ballets?|¿Cuál de estos ballets compuso Piotr Ílich Chaikovski?|Piotr Ilitch Tchaïkovski a composé lequel de ces ballets ?|チャイコフスキーが作曲したバレエはどれか?",
    ["Romeo and Juliet|Romeo y Julieta|Roméo et Juliette|『ロメオとジュリエット』", "Giselle|Giselle|Giselle|『ジゼル』", "The Nutcracker|El Cascanueces|Casse-Noisette|『くるみ割り人形』"],
    2,
    "The Nutcracker had a lukewarm premiere in Saint Petersburg in 1892, but a later suite drawn from the score became so popular that the full ballet is now a Christmas-season fixture in theatres worldwide.|El Cascanueces tuvo un estreno tibio en San Petersburgo en 1892, pero una suite posterior extraída de la partitura se hizo tan popular que el ballet completo es hoy un clásico navideño en teatros de todo el mundo.|Casse-Noisette connut une création tiède à Saint-Pétersbourg en 1892, mais une suite tirée ultérieurement de la partition devint si populaire que le ballet complet est aujourd'hui un classique de Noël dans le monde entier.|『くるみ割り人形』は1892年のサンクトペテルブルク初演では反応が芳しくなかったが、後にその楽曲から編まれた組曲が大人気となり、いまでは全幕版が世界じゅうの劇場でクリスマスシーズンの定番になっている。",
  ),
  q(
    4,
    "The Bolshoi Theatre, one of the world's most famous ballet and opera companies, is based in which city?|¿En qué ciudad tiene su sede el Teatro Bolshói, una de las compañías de ballet y ópera más famosas del mundo?|Le théâtre Bolchoï, l'une des compagnies de ballet et d'opéra les plus célèbres au monde, est basé dans quelle ville ?|世界屈指のバレエ・オペラ劇団ボリショイ劇場があるのはどこか?",
    ["Moscow|Moscú|Moscou|モスクワ", "Saint Petersburg|San Petersburgo|Saint-Pétersbourg|サンクトペテルブルク", "Kazan|Kazán|Kazan|カザン"],
    0,
    "Bolshoi simply means \"big\" in Russian, and the company's main stage, rebuilt several times after fires, remains one of Moscow's most recognisable landmarks with its columned neoclassical facade.|Bolshói simplemente significa «grande» en ruso, y el escenario principal de la compañía, reconstruido varias veces tras incendios, sigue siendo uno de los edificios más reconocibles de Moscú.|Bolchoï signifie simplement « grand » en russe, et la scène principale de la compagnie, reconstruite plusieurs fois après des incendies, reste l'un des monuments les plus reconnaissables de Moscou.|「ボリショイ」はロシア語で単に「大きい」を意味し、火災のたびに何度も再建されてきたこの劇団の本拠地は、列柱を持つ新古典様式のファサードでいまもモスクワを代表する建物の一つであり続けている。",
  ),
  q(
    4,
    "Which of these rivers is the longest in Europe, flowing entirely within Russia?|¿Cuál de estos ríos es el más largo de Europa y discurre enteramente por Rusia?|Lequel de ces fleuves est le plus long d'Europe et coule entièrement en Russie ?|欧州最長で、その全流程がロシア国内にある川はどれか?",
    ["The Danube|El Danubio|Le Danube|ドナウ川", "The Volga|El Volga|La Volga|ヴォルガ川", "The Dnieper|El Dniéper|Le Dniepr|ドニエプル川"],
    1,
    "The Volga runs roughly 3,530 kilometres from hills northwest of Moscow down to the landlocked Caspian Sea, entirely inside Russia, unlike the Danube and Dnieper, which both cross several countries.|El Volga recorre unos 3530 kilómetros desde colinas al noroeste de Moscú hasta el mar Caspio, sin salida al océano, enteramente dentro de Rusia, a diferencia del Danubio y el Dniéper, que cruzan varios países.|La Volga parcourt environ 3 530 kilomètres depuis des collines au nord-ouest de Moscou jusqu'à la mer Caspienne, sans accès à l'océan, entièrement en Russie, contrairement au Danube et au Dniepr qui traversent plusieurs pays.|ヴォルガ川はモスクワ北西の丘陵からおよそ3530キロメートルを流れ、海に出口のないカスピ海へ注ぐ。ドナウ川やドニエプル川が複数の国を流れるのに対し、ヴォルガ川はその全流程がロシア国内にある。",
  ),
  q(
    4,
    "What was the name of the first artificial satellite, launched by the Soviet Union in 1957?|¿Cómo se llamó el primer satélite artificial, lanzado por la Unión Soviética en 1957?|Comment s'appelait le premier satellite artificiel, lancé par l'Union soviétique en 1957 ?|1957年にソ連が打ち上げた世界初の人工衛星の名前は?",
    ["Vostok 1|Vostok 1|Vostok 1|ヴォストーク1号", "Mir|Mir|Mir|ミール", "Sputnik 1|Sputnik 1|Spoutnik 1|スプートニク1号"],
    2,
    "Sputnik 1 was little more than a polished metal sphere with four antennas, but its simple radio beeps, audible to amateur radio operators worldwide, set off the Space Race almost overnight.|El Sputnik 1 era poco más que una esfera de metal pulido con cuatro antenas, pero sus simples pitidos de radio, audibles para radioaficionados de todo el mundo, desataron la carrera espacial casi de la noche a la mañana.|Spoutnik 1 n'était guère plus qu'une sphère de métal poli à quatre antennes, mais ses simples bips radio, audibles par les radioamateurs du monde entier, déclenchèrent la course à l'espace presque du jour au lendemain.|スプートニク1号は磨かれた金属球にアンテナが4本ついているだけの単純な物だったが、世界じゅうのアマチュア無線家にも聞こえたその単純な電波音が、ほとんど一夜にして宇宙開発競争の幕を開けた。",
  ),
  q(
    5,
    "Before the line around Lake Baikal was finished, how did the Trans-Siberian get trains across the lake in the winter of 1904?|Antes de terminarse la línea que rodea el lago Baikal, ¿cómo cruzaba el Transiberiano el lago en el invierno de 1904?|Avant l'achèvement de la ligne contournant le lac Baïkal, comment le Transsibérien faisait-il traverser le lac en hiver 1904 ?|バイカル湖を回る線が完成する前、1904年の冬、シベリア鉄道はどうやって列車を湖の向こうへ渡したか?",
    ["Rails were laid straight onto the frozen surface|Se tendieron rieles directamente sobre la superficie helada|On posa des rails à même la surface gelée|凍った湖面の上に直接レールを敷いた", "The lake was drained each winter|El lago se vaciaba cada invierno|On vidait le lac chaque hiver|毎冬、湖の水を抜いた", "Trains were flown across|Los trenes se transportaban por aire|Les trains étaient transportés par avion|列車を空輸した"],
    0,
    "An icebreaking ferry had carried the trains since 1900, but in the winter of 1904 the ice grew too thick for it, and the Russo-Japanese War made the gap a matter of national survival. Rails were laid on the ice itself and the wagons were pulled across by horses; some broke through and sank. The permanent line around the southern shore — thirty-nine tunnels in 84km — opened in September of that same year.|Un ferry rompehielos había transportado los trenes desde 1900, pero en el invierno de 1904 el hielo se volvió demasiado grueso para él, y la guerra ruso-japonesa convirtió ese hueco en un asunto de supervivencia nacional. Se tendieron rieles sobre el propio hielo y los vagones se arrastraron con caballos; algunos se hundieron. La línea permanente que bordea la orilla sur —treinta y nueve túneles en 84 km— se abrió en septiembre de ese mismo año.|Un ferry brise-glace transportait les trains depuis 1900, mais à l'hiver 1904 la glace devint trop épaisse pour lui, et la guerre russo-japonaise fit de cette rupture une question de survie nationale. On posa des rails sur la glace même et les wagons furent tirés par des chevaux ; certains passèrent au travers et coulèrent. La ligne permanente contournant la rive sud — trente-neuf tunnels en 84 km — ouvrit en septembre de la même année.|1900年からは砕氷フェリーが列車を運んでいたが、1904年の冬は氷が厚くなりすぎて船が通れなくなった。日露戦争のさなかで、この途切れは国の存亡に直結した。**氷の上に直接レールを敷き、貨車を馬で引いて渡した。**氷を破って沈んだものもある。南岸を回る恒久の線——84kmに39のトンネル——が開通したのは、同じ年の9月だった。",
  ),
  q(
    5,
    "Which imperial dynasty ruled Russia for over three centuries, until 1917?|¿Qué dinastía imperial gobernó Rusia durante más de tres siglos, hasta 1917?|Quelle dynastie impériale a régné sur la Russie pendant plus de trois siècles, jusqu'en 1917 ?|1917年まで三百年以上ロシアを治めた王朝はどれか?",
    ["The Rurikid dynasty|La dinastía rurikida|La dynastie riourikide|リューリク朝", "The Romanov dynasty|La dinastía Románov|La dynastie des Romanov|ロマノフ朝", "The Godunov dynasty|La dinastía Godunov|La dynastie des Godounov|ゴドゥノフ朝"],
    1,
    "The Romanovs came to power in 1613 after a chaotic period known as the Time of Troubles, and the dynasty's rule ended with the abdication of Nicholas II during the February Revolution of 1917.|Los Románov llegaron al poder en 1613 tras un caótico período conocido como el Tiempo de Problemas, y el gobierno de la dinastía terminó con la abdicación de Nicolás II durante la Revolución de Febrero de 1917.|Les Romanov arrivèrent au pouvoir en 1613 après une période chaotique connue sous le nom de Temps des troubles, et le règne de la dynastie s'acheva avec l'abdication de Nicolas II lors de la révolution de Février 1917.|ロマノフ朝は「動乱時代」と呼ばれる混乱期のあと1613年に権力を握り、その治世は1917年の二月革命でニコライ2世が退位したことで終わりを迎えた。",
  ),
  q(
    5,
    "Who wrote the novel War and Peace?|¿Quién escribió la novela Guerra y paz?|Qui a écrit le roman Guerre et Paix ?|『戦争と平和』の作者は誰か?",
    ["Anton Chekhov|Antón Chéjov|Anton Tchekhov|アントン・チェーホフ", "Ivan Turgenev|Iván Turguénev|Ivan Tourgueniev|イワン・トゥルゲーネフ", "Leo Tolstoy|León Tolstói|Léon Tolstoï|レフ・トルストイ"],
    2,
    "Tolstoy spent roughly six years writing War and Peace, publishing it in instalments through the 1860s, and the novel follows five aristocratic families through the Napoleonic Wars in a scope few novels before it had attempted.|Tolstói pasó unos seis años escribiendo Guerra y paz, publicándola por entregas durante la década de 1860, y la novela sigue a cinco familias aristocráticas a través de las guerras napoleónicas.|Tolstoï passa environ six ans à écrire Guerre et Paix, le publiant en feuilleton dans les années 1860, et le roman suit cinq familles aristocratiques à travers les guerres napoléoniennes.|トルストイは『戦争と平和』の執筆におよそ6年をかけ、1860年代を通じて分冊で発表した。この小説は5つの貴族の家系をナポレオン戦争の時代を通じて描き、それ以前の小説がめったに試みなかった規模を持つ。",
  ),
  q(
    5,
    "What is the name of Russia's flag carrier national airline?|¿Cómo se llama la aerolínea de bandera nacional de Rusia?|Comment s'appelle la compagnie aérienne nationale de la Russie ?|ロシアの国営フラッグキャリア航空会社の名前は?",
    ["Aeroflot|Aeroflot|Aeroflot|アエロフロート", "Lufthansa|Lufthansa|Lufthansa|ルフトハンザ", "S7 Airlines|S7 Airlines|S7 Airlines|S7航空"],
    0,
    "Founded in 1923, Aeroflot is one of the oldest continuously operating airlines in the world, and during the Soviet era it was, for decades, effectively the only airline the country had.|Fundada en 1923, Aeroflot es una de las aerolíneas en funcionamiento continuo más antiguas del mundo, y durante la era soviética fue, durante décadas, prácticamente la única aerolínea del país.|Fondée en 1923, Aeroflot est l'une des plus anciennes compagnies aériennes en exploitation continue au monde, et à l'époque soviétique, elle fut pendant des décennies pratiquement la seule compagnie du pays.|1923年設立のアエロフロートは、世界でも指折り長く運航を続けてきた航空会社の一つで、ソ連時代には何十年ものあいだ、事実上この国唯一の航空会社だった。",
  ),
  q(
    6,
    "Who wrote the novel Crime and Punishment?|¿Quién escribió la novela Crimen y castigo?|Qui a écrit le roman Crime et Châtiment ?|『罪と罰』の作者は誰か?",
    ["Nikolai Gogol|Nikolái Gógol|Nicolas Gogol|ニコライ・ゴーゴリ", "Fyodor Dostoevsky|Fiódor Dostoyevski|Fiodor Dostoïevski|フョードル・ドストエフスキー", "Maxim Gorky|Máximo Gorki|Maxime Gorki|マクシム・ゴーリキー"],
    1,
    "Published in 1866, the novel follows a former student who convinces himself that an extraordinary man is entitled to break moral law, and it remains one of the most widely translated works of Russian literature.|Publicada en 1866, la novela sigue a un antiguo estudiante que se convence de que un hombre extraordinario tiene derecho a romper la ley moral, y sigue siendo una de las obras más traducidas de la literatura rusa.|Publié en 1866, le roman suit un ancien étudiant qui se convainc qu'un homme extraordinaire a le droit d'enfreindre la loi morale, et il reste l'une des œuvres les plus traduites de la littérature russe.|1866年に発表されたこの小説は、非凡な人間には道徳律を破る資格があると自らに言い聞かせる元学生を描き、ロシア文学の中でも指折り多くの言語に翻訳されてきた作品であり続けている。",
  ),
  q(
    6,
    "What was the name of the dog that became the first animal to orbit the Earth, aboard Sputnik 2 in 1957?|¿Cómo se llamó la perra que se convirtió en el primer animal en orbitar la Tierra, a bordo del Sputnik 2 en 1957?|Comment s'appelait la chienne devenue le premier animal à orbiter la Terre, à bord de Spoutnik 2 en 1957 ?|1957年、スプートニク2号で地球周回軌道に乗った初の動物となった犬の名前は?",
    ["Belka|Belka|Belka|ベルカ", "Strelka|Strelka|Strelka|ストレルカ", "Laika|Laika|Laïka|ライカ"],
    2,
    "Laika was a stray picked up from the streets of Moscow, chosen partly because strays were assumed to already be hardy enough to survive extreme conditions, and the mission was never designed to bring her back alive.|Laika era una perra callejera recogida de las calles de Moscú, elegida en parte porque se suponía que las perras callejeras ya eran lo bastante resistentes para sobrevivir a condiciones extremas.|Laïka était une chienne errante ramassée dans les rues de Moscou, choisie en partie parce qu'on supposait les chiens errants déjà assez résistants pour survivre à des conditions extrêmes.|ライカはモスクワの街角で拾われた野良犬で、野良犬ならすでに過酷な環境に耐える丈夫さを持っているだろうという理由もあって選ばれた。この任務はもとより彼女を生きて連れ帰るようには設計されていなかった。",
  ),
  q(
    6,
    "Who composed the 1812 Overture?|¿Quién compuso la Obertura 1812?|Qui a composé l'Ouverture 1812 ?|序曲『1812年』の作曲者は誰か?",
    ["Tchaikovsky|Chaikovski|Tchaïkovski|チャイコフスキー", "Rimsky-Korsakov|Rimski-Kórsakov|Rimski-Korsakov|リムスキー=コルサコフ", "Mussorgsky|Músorgski|Moussorgski|ムソルグスキー"],
    0,
    "Written to commemorate Russia's defence against Napoleon's invasion, the piece is famous for calling for real cannon fire in its finale, a request modern orchestras usually meet with recorded blasts or synchronised fireworks instead.|Escrita para conmemorar la defensa de Rusia contra la invasión de Napoleón, la pieza es famosa por pedir disparos de cañón reales en su final, una petición que las orquestas modernas suelen satisfacer con explosiones grabadas.|Écrite pour commémorer la défense de la Russie contre l'invasion de Napoléon, l'œuvre est célèbre pour exiger de vrais coups de canon dans son finale, une demande que les orchestres modernes satisfont plutôt par des détonations enregistrées.|ナポレオンの侵攻に対するロシアの防衛を記念して書かれたこの曲は、フィナーレで本物の大砲の発射を求めることで知られ、現代のオーケストラはたいてい録音の轟音や花火の同期でそれに応じている。",
  ),
  q(
    6,
    "In Russian New Year tradition, who is Ded Moroz's granddaughter and helper?|En la tradición rusa de Año Nuevo, ¿quién es la nieta y ayudante de Ded Moroz?|Dans la tradition russe du Nouvel An, qui est la petite-fille et assistante de Ded Moroz ?|ロシアの新年の伝統で、ジェド・マロースの孫娘であり助手の名前は?",
    ["Vasilisa|Vasilisa|Vassilissa|ヴァシリーサ", "Snegurochka|Snegúrochka|Snegourotchka|スネグーロチカ", "Alyonushka|Aliónushka|Aliona|アリョーヌシカ"],
    1,
    "Snegurochka, whose name comes from the Russian word for snow, is unique among winter gift-bringer traditions worldwide for being a young woman rather than an elf or a reindeer, and she appears at New Year celebrations at Ded Moroz's side.|Snegúrochka, cuyo nombre viene de la palabra rusa para nieve, es única entre las tradiciones mundiales de portadores de regalos invernales por ser una joven en vez de un elfo o un reno.|Snegourotchka, dont le nom vient du mot russe pour la neige, est unique parmi les traditions mondiales de porteurs de cadeaux hivernaux en étant une jeune femme plutôt qu'un lutin ou un renne.|「雪」を意味するロシア語に由来する名を持つスネグーロチカは、世界の冬の贈り物配達人の伝承の中でも、妖精やトナカイではなく若い女性であるという点で珍しい存在で、新年の祝いにはジェド・マロースの傍らに現れる。",
  ),
  q(
    7,
    "About how long does a non-stop Trans-Siberian journey from Moscow to Vladivostok take?|¿Cuánto dura aproximadamente un viaje sin escalas en el Transiberiano de Moscú a Vladivostok?|Combien de temps dure environ un trajet sans arrêt en Transsibérien de Moscou à Vladivostok ?|モスクワ―ウラジオストク間をシベリア鉄道で直行するとおよそどのくらいかかるか?",
    ["About 2 days|Unos 2 días|Environ 2 jours|約2日", "About 3 weeks|Unas 3 semanas|Environ 3 semaines|約3週間", "About 6 to 7 days|Unos 6 a 7 días|Environ 6 à 7 jours|約6〜7日"],
    2,
    "Covering roughly 9,289 kilometres, the fastest through-service takes about 145 hours, crossing seven time zones along the way, though most travellers break the journey with stops at towns like Yekaterinburg or Irkutsk.|Con un recorrido de unos 9289 kilómetros, el servicio directo más rápido tarda unas 145 horas, cruzando siete husos horarios, aunque la mayoría de los viajeros interrumpen el trayecto con paradas.|Sur environ 9 289 kilomètres, le service direct le plus rapide prend environ 145 heures, traversant sept fuseaux horaires, bien que la plupart des voyageurs interrompent le trajet par des arrêts.|全長およそ9289キロメートルを走る最速の直行便でも約145時間かかり、その間に7つの時間帯を越える。もっとも、たいていの旅行者はエカテリンブルクやイルクーツクなどの町で途中下車して旅を分ける。",
  ),
  q(
    7,
    "What is Russia's national space agency called?|¿Cómo se llama la agencia espacial nacional de Rusia?|Comment s'appelle l'agence spatiale nationale de la Russie ?|ロシアの国営宇宙機関の名前は?",
    ["Roscosmos|Roscosmos|Roscosmos|ロスコスモス", "Energia|Energuía|Energuia|エネルギア", "Baikonur|Baikonur|Baïkonour|バイコヌール"],
    0,
    "Roscosmos was formed in 1992 out of the Soviet space programme's institutions, and it still launches crewed missions from the Baikonur Cosmodrome, which sits not on Russian soil but on leased land in Kazakhstan.|Roscosmos se formó en 1992 a partir de las instituciones del programa espacial soviético, y aún lanza misiones tripuladas desde el cosmódromo de Baikonur, que no está en suelo ruso sino en tierras arrendadas en Kazajistán.|Roscosmos fut formée en 1992 à partir des institutions du programme spatial soviétique, et elle lance encore des missions habitées depuis le cosmodrome de Baïkonour, situé non pas en sol russe mais sur un terrain loué au Kazakhstan.|ロスコスモスは1992年、ソ連時代の宇宙開発機関をもとに組織され、いまも有人ミッションはバイコヌール宇宙基地から打ち上げられている。同基地はロシアの国土ではなく、カザフスタンから借り受けた土地にある。",
  ),
  q(
    7,
    "Which Russian region lies closest to Alaska, across the narrow Bering Strait?|¿Qué región rusa está más cerca de Alaska, al otro lado del estrecho estrecho de Bering?|Quelle région russe est la plus proche de l'Alaska, de l'autre côté du détroit de Béring ?|狭いベーリング海峡を挟んでアラスカにいちばん近いロシアの地方はどこか?",
    ["Sakhalin|Sajalín|Sakhaline|サハリン", "Chukotka|Chukotka|Tchoukotka|チュクチ",  "Kamchatka|Kamchatka|Kamtchatka|カムチャツカ"],
    1,
    "At its narrowest, the Bering Strait separating Chukotka from Alaska is only about 82 kilometres wide, and on a clear day the Diomede Islands, one Russian and one American, are visible from each other across the water.|En su punto más estrecho, el estrecho de Bering que separa Chukotka de Alaska mide solo unos 82 kilómetros, y en un día despejado las islas Diómedes, una rusa y otra estadounidense, son visibles entre sí.|À son point le plus étroit, le détroit de Béring séparant la Tchoukotka de l'Alaska ne mesure qu'environ 82 kilomètres, et par temps clair, les îles Diomède, l'une russe et l'autre américaine, sont visibles l'une de l'autre.|チュクチとアラスカを隔てるベーリング海峡は、いちばん狭い場所でわずか82キロメートルほどしかなく、晴れた日にはロシア領とアメリカ領それぞれのダイオミード諸島が互いに見える。",
  ),
  q(
    7,
    "In Russian folklore, which figure is said to live in a hut that stands on chicken legs?|En el folclore ruso, ¿qué figura se dice que vive en una choza sobre patas de gallina?|Dans le folklore russe, quel personnage vivrait dans une isba sur pattes de poule ?|ロシアの民話で、鶏の足の上に建つ小屋に住むとされる登場人物は誰か?",
    ["Koschei the Deathless|Koschéi el Inmortal|Kochtcheï l'Immortel|コシチェイ(死なずの王)", "Baba Yaga|Babá Yagá|Baba Yaga|バーバ・ヤガー", "Zmey Gorynych|Zmei Gorýnich|Zmeï Gorynytch|ズメイ・ゴルィヌィチ"],
    1,
    "Baba Yaga is depicted as an old woman who flies in a mortar steering with a pestle, and though frequently a villain in the tales, she just as often helps the hero who approaches her hut with proper manners.|Babá Yagá se representa como una anciana que vuela en un mortero dirigiéndose con una mano de mortero, y aunque suele ser una villana en los cuentos, con la misma frecuencia ayuda al héroe que se acerca a su choza con buenos modales.|Baba Yaga est représentée comme une vieille femme volant dans un mortier qu'elle dirige avec un pilon, et bien que souvent la méchante des contes, elle aide tout aussi souvent le héros qui s'approche de son isba avec les bonnes manières.|バーバ・ヤガーは、乳鉢に乗って杵で操りながら空を飛ぶ老婆として描かれ、物語ではしばしば悪役だが、それと同じくらいの頻度で、礼儀正しく小屋を訪ねてきた主人公を助けもする。",
  ),
  q(
    8,
    "What is the name of the world's largest inland body of water, bordered in part by Russia?|¿Cómo se llama la mayor masa de agua interior del mundo, bordeada en parte por Rusia?|Comment s'appelle la plus grande étendue d'eau intérieure du monde, bordée en partie par la Russie ?|一部をロシアが囲む、世界最大の内陸水域の名前は?",
    ["The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海", "Lake Victoria|El lago Victoria|Le lac Victoria|ヴィクトリア湖", "The Aral Sea|El mar de Aral|La mer d'Aral|アラル海"],
    0,
    "Technically a landlocked lake despite its name, the Caspian Sea is larger in surface area than Germany, and its shoreline is shared among five countries: Russia, Kazakhstan, Turkmenistan, Iran and Azerbaijan.|Técnicamente un lago sin salida al mar pese a su nombre, el mar Caspio tiene mayor superficie que Alemania, y su litoral se reparte entre cinco países: Rusia, Kazajistán, Turkmenistán, Irán y Azerbaiyán.|Techniquement un lac sans accès à l'océan malgré son nom, la mer Caspienne dépasse l'Allemagne en superficie, et son littoral est partagé entre cinq pays : la Russie, le Kazakhstan, le Turkménistan, l'Iran et l'Azerbaïdjan.|名前に反して厳密には海に出口のない湖であるカスピ海は、面積ではドイツより広く、その岸辺はロシア・カザフスタン・トルクメニスタン・イラン・アゼルバイジャンの5か国で分け合われている。",
  ),
  q(
    8,
    "The Volga-Don Canal links the Volga River to which other river, connecting the Caspian and Black Seas?|¿El canal Volga-Don une el río Volga a qué otro río, conectando los mares Caspio y Negro?|Le canal Volga-Don relie la Volga à quelle autre rivière, connectant les mers Caspienne et Noire ?|ヴォルガ・ドン運河が、カスピ海と黒海をつなぐためにヴォルガ川と結んでいる川はどれか?",
    ["The Dnieper|El Dniéper|Le Dniepr|ドニエプル川", "The Don|El Don|Le Don|ドン川", "The Ural|El Ural|L'Oural|ウラル川"],
    1,
    "Completed in 1952 using a chain of locks to climb over the low watershed between the two river systems, the 101-kilometre canal finally gave Moscow a continuous water route to both the Caspian and Black Seas.|Terminado en 1952 mediante una cadena de esclusas para salvar la baja divisoria de aguas entre los dos sistemas fluviales, el canal de 101 kilómetros dio por fin a Moscú una ruta fluvial continua hacia ambos mares.|Achevé en 1952 grâce à une chaîne d'écluses franchissant la ligne de partage des eaux peu élevée entre les deux systèmes fluviaux, le canal de 101 kilomètres offrit enfin à Moscou une voie d'eau continue vers les deux mers.|1952年に完成したこの全長101キロメートルの運河は、二つの水系のあいだの低い分水嶺を閘門の連なりで越え、モスクワからカスピ海・黒海の両方へ切れ目なく水路で行けるようにした。",
  ),
  q(
    8,
    "In what year did the Soviet Union formally dissolve?|¿En qué año se disolvió formalmente la Unión Soviética?|En quelle année l'Union soviétique s'est-elle formellement dissoute ?|ソビエト連邦が正式に解体したのは何年か?",
    ["1985|1985|1985|1985年", "1999|1999|1999|1999年", "1991|1991|1991|1991年"],
    2,
    "The dissolution followed a failed coup attempt against Mikhail Gorbachev earlier that year, and it left fifteen newly independent countries, including Russia, in place of the former union.|La disolución siguió a un intento de golpe de estado fallido contra Mijaíl Gorbachov ese mismo año, y dejó quince países recién independientes, incluida Rusia, en lugar de la antigua unión.|La dissolution suivit une tentative de coup d'État manquée contre Mikhaïl Gorbatchev plus tôt cette année-là, et laissa quinze pays nouvellement indépendants, dont la Russie, à la place de l'ancienne union.|この解体は、同じ年の初めにミハイル・ゴルバチョフに対して起きたクーデター未遂のあとに続いたもので、旧連邦に代わって、ロシアを含む15の新しい独立国が生まれた。",
  ),
  q(
    8,
    "What is the 1861 reform that freed Russia's serfs commonly known as?|¿Cómo se conoce comúnmente la reforma de 1861 que liberó a los siervos de Rusia?|Comment appelle-t-on communément la réforme de 1861 qui libéra les serfs de Russie ?|1861年にロシアの農奴を解放した改革は一般に何と呼ばれるか?",
    ["The Emancipation Reform|La Reforma de Emancipación|La réforme de l'émancipation|農奴解放令", "The Great Reform|La Gran Reforma|La Grande Réforme|大改革", "The Liberation Edict|El Edicto de Liberación|L'édit de libération|解放勅令"],
    0,
    "Signed by Alexander II, the reform freed roughly 23 million serfs, though it required many of them to keep paying redemption instalments for their land for decades afterward, a burden that fed unrest well into the next century.|Firmada por Alejandro II, la reforma liberó a unos 23 millones de siervos, aunque exigió a muchos seguir pagando cuotas de redención por su tierra durante décadas.|Signée par Alexandre II, la réforme libéra environ 23 millions de serfs, bien qu'elle ait obligé nombre d'entre eux à continuer de payer des annuités de rachat pour leur terre pendant des décennies.|アレクサンドル2世が署名したこの改革はおよそ2300万人の農奴を解放したが、多くの者は土地の買い戻し金を何十年も払い続けねばならず、その重荷は次の世紀にまで及ぶ不満の種になった。",
  ),
  q(
    8,
    "At what unusually young age did Garry Kasparov become world chess champion in 1985?|¿A qué edad inusualmente joven se convirtió Garri Kaspárov en campeón mundial de ajedrez en 1985?|À quel âge inhabituellement jeune Garry Kasparov devint-il champion du monde d'échecs en 1985 ?|1985年にガルリ・カスパロフが世界チェス王座に就いたのは異例なほど若い何歳の時か?",
    ["19|19|19|19歳", "28|28|28|28歳", "22|22|22|22歳"],
    2,
    "Kasparov held the undisputed title for 15 years afterward, and remains widely regarded as one of the strongest players in the game's history, both before and after his celebrated matches against IBM's Deep Blue computer.|Kaspárov mantuvo el título indiscutido durante 15 años, y sigue considerado ampliamente uno de los jugadores más fuertes de la historia del juego, tanto antes como después de sus célebres partidas contra la computadora Deep Blue de IBM.|Kasparov conserva le titre incontesté pendant les 15 années suivantes, et reste largement considéré comme l'un des joueurs les plus forts de l'histoire du jeu, avant comme après ses célèbres matchs contre l'ordinateur Deep Blue d'IBM.|カスパロフはその後15年間タイトルを保持し続け、IBMのコンピューター、ディープ・ブルーとの有名な対局の前も後も、チェス史上指折りの強豪として広く評価され続けている。",
  ),
  q(
    8,
    "What is the traditional Russian multi-course dinner with many toasts called?|¿Cómo se llama la tradicional cena rusa de muchos platos y muchos brindis?|Comment appelle-t-on le repas traditionnel russe à plusieurs services et nombreux toasts ?|多くの乾杯を伴うロシア伝統の多品目の宴席は何と呼ばれるか?",
    ["Zastolye|Zastolie|Zastolié|ザスチョリエ", "Maslenitsa|Maslenitsa|Maslenitsa|マースレニツァ", "Subbotnik|Subbótnik|Subbotnik|スボートニク"],
    0,
    "A well-run zastolye traditionally has a designated toastmaster, a tamada, whose job is to keep the toasts flowing in order and stop any one guest from being singled out too many times in a row.|Un zastolié bien llevado tiene tradicionalmente un maestro de brindis designado, un tamada, cuyo trabajo es mantener los brindis en orden.|Un zastolié bien mené a traditionnellement un maître des toasts désigné, un tamada, dont le rôle est de faire s'enchaîner les toasts dans l'ordre.|きちんとしたザスチョリエには伝統的に専任の乾杯進行役「タマダ」がいて、乾杯が順序よく続き、特定の客ばかりが立て続けに指名されないよう取り仕切る役目を担う。",
  ),
  q(
    9,
    "Which Russian author won the Nobel Prize in Literature in 1958 but was pressured by the state to decline it?|¿Qué autor ruso ganó el Premio Nobel de Literatura en 1958 pero fue presionado por el estado para rechazarlo?|Quel auteur russe remporta le prix Nobel de littérature en 1958 mais fut contraint par l'État de le refuser ?|1958年にノーベル文学賞を受賞しながら、国家の圧力で受賞を辞退させられたロシアの作家は?",
    ["Mikhail Sholokhov|Mijaíl Shólojov|Mikhaïl Cholokhov|ミハイル・ショーロホフ", "Boris Pasternak|Borís Pasternak|Boris Pasternak|ボリス・パステルナーク", "Alexander Solzhenitsyn|Aleksandr Solzhenitsyn|Alexandre Soljenitsyne|アレクサンドル・ソルジェニーツィン"],
    1,
    "Pasternak was awarded the prize largely for his novel Doctor Zhivago, which had been banned in the Soviet Union, and the state's campaign against him was so intense that his son accepted the medal on his behalf only in 1989.|A Pasternak se le concedió el premio en gran parte por su novela El doctor Zhivago, que había sido prohibida en la Unión Soviética, y la campaña del estado en su contra fue tan intensa que su hijo aceptó la medalla en su nombre solo en 1989.|Pasternak reçut le prix en grande partie pour son roman Le Docteur Jivago, interdit en Union soviétique, et la campagne de l'État contre lui fut si intense que son fils n'accepta la médaille en son nom qu'en 1989.|パステルナークは、ソ連国内では発禁だった小説『ドクトル・ジバゴ』を主な理由に受賞したが、国家による攻撃はあまりに激しく、彼に代わって息子がメダルを受け取ったのは1989年になってからだった。",
  ),
  q(
    9,
    "What does the Soviet-era abbreviation \"Gulag\" refer to?|¿A qué se refiere la abreviatura soviética «Gulag»?|Que désigne l'abréviation soviétique « Goulag » ?|ソ連時代の略語「グラーグ」が指すものは何か?",
    ["The secret police that preceded the KGB|La policía secreta que precedió a la KGB|La police secrète qui précéda le KGB|KGBに先立つ秘密警察", "The state five-year economic plans|Los planes económicos estatales de cinco años|Les plans économiques d'État de cinq ans|国家の五カ年経済計画", "The system of forced-labour prison camps|El sistema de campos de trabajos forzados|Le système de camps de travail forcé|強制労働収容所の制度"],
    2,
    "The word is an acronym for the government agency that administered the camp system, and millions of people passed through its network over the decades, sent there for reasons ranging from serious crimes to nothing more than an unguarded remark.|La palabra es un acrónimo de la agencia gubernamental que administraba el sistema de campos, y millones de personas pasaron por su red a lo largo de las décadas.|Le mot est un acronyme désignant l'agence gouvernementale qui administrait le système de camps, et des millions de personnes passèrent par son réseau au fil des décennies.|この語は収容所網を統括した政府機関の頭字語で、何十年ものあいだ何百万人もの人がそこを通過した。送られた理由は重い犯罪から、うっかり漏らした一言にまで及んだ。",
  ),
  q(
    9,
    "How many kopeks make up one ruble?|¿Cuántos kopeks componen un rublo?|Combien de kopecks composent un rouble ?|1ルーブルは何コペイカに相当するか?",
    ["50|50|50|50", "10|10|10|10", "100|100|100|100"],
    2,
    "The kopek's value has shrunk so far through inflation over the decades that low-denomination coins are now often rounded away in everyday transactions, even though the subdivision still exists on paper.|El valor del kopek se ha reducido tanto por la inflación a lo largo de las décadas que las monedas de baja denominación suelen redondearse en las transacciones diarias, aunque la subdivisión sigue existiendo sobre el papel.|La valeur du kopeck s'est tant réduite par l'inflation au fil des décennies que les pièces de faible valeur sont désormais souvent arrondies dans les transactions quotidiennes, bien que la subdivision existe toujours sur le papier.|コペイカの価値は数十年のインフレで大きく目減りし、低額硬貨は日常の取引ではしばしば端数として丸められてしまうが、この補助単位はいまも制度上は存在している。",
  ),
  q(
    9,
    "The matryoshka nesting-doll design is often said to have been inspired by a folk figure from which country?|¿Se suele decir que el diseño de la muñeca matrioshka se inspiró en una figura popular de qué país?|Le design de la poupée gigogne matriochka aurait souvent été inspiré par une figure populaire de quel pays ?|マトリョーシカの入れ子人形の意匠は、どの国の民間信仰の人物から着想を得たとよく言われるか?",
    ["China|China|Chine|中国", "India|India|Inde|インド", "Japan|Japón|Japon|日本"],
    2,
    "One popular account holds that the design was inspired by a set of nesting figures depicting the Seven Lucky Gods, brought back from Japan and shown to the Moscow workshop that produced the first Russian matryoshka.|Una versión popular sostiene que el diseño se inspiró en un juego de figuras anidadas que representaban a los Siete Dioses de la Fortuna, traído de Japón y mostrado al taller moscovita.|Une version populaire veut que le design se soit inspiré d'un ensemble de figurines gigognes représentant les Sept Dieux du Bonheur, rapporté du Japon et montré à l'atelier moscovite.|よく語られる説によれば、この意匠は七福神を象った入れ子の人形一式にヒントを得たもので、日本から持ち帰られ、最初のマトリョーシカを作ったモスクワの工房に示されたのだという。",
  ),
  q(
    10,
    "Which Soviet leader introduced the reform policies of glasnost and perestroika in the 1980s?|¿Qué líder soviético introdujo las políticas de reforma glásnost y perestroika en los años ochenta?|Quel dirigeant soviétique introduisit les politiques de réforme de la glasnost et de la perestroïka dans les années 1980 ?|1980年代にグラスノスチとペレストロイカという改革政策を導入したソ連指導者は誰か?",
    ["Leonid Brezhnev|Leonid Brézhnev|Léonid Brejnev|レオニード・ブレジネフ", "Mikhail Gorbachev|Mijaíl Gorbachov|Mikhaïl Gorbatchev|ミハイル・ゴルバチョフ", "Yuri Andropov|Yuri Andrópov|Iouri Andropov|ユーリ・アンドロポフ"],
    1,
    "Glasnost, meaning \"openness,\" loosened censorship and encouraged public debate, while perestroika, \"restructuring,\" attempted to reform the centrally planned economy, and together the two policies helped set the stage for the union's dissolution.|Glásnost, que significa «apertura», relajó la censura y fomentó el debate público, mientras que la perestroika, «reestructuración», intentó reformar la economía de planificación centralizada.|La glasnost, signifiant « ouverture », assouplit la censure et encouragea le débat public, tandis que la perestroïka, « restructuration », tenta de réformer l'économie planifiée.|「公開性」を意味するグラスノスチは検閲を緩めて公の議論を促し、「再構築」を意味するペレストロイカは中央計画経済の改革を試みた。この二つの政策は、連邦解体への流れを整える一因ともなった。",
  ),
  q(
    10,
    "Catherine the Great, the empress who ruled Russia for over three decades, was originally born a princess in which region?|Catalina la Grande, la emperatriz que gobernó Rusia durante más de tres décadas, ¿nació originalmente princesa en qué región?|Catherine la Grande, l'impératrice qui régna sur la Russie pendant plus de trente ans, était à l'origine née princesse dans quelle région ?|三十年以上ロシアを治めた女帝エカチェリーナ2世は、もともとどの地域の公女として生まれたか?",
    ["A minor German principality|Un pequeño principado alemán|Une petite principauté allemande|小さなドイツの公国", "A region of France|Una región de Francia|Une région de France|フランスの一地方", "A province of Sweden|Una provincia de Suecia|Une province de Suède|スウェーデンの一州"],
    0,
    "Born Sophie of Anhalt-Zerbst in a minor German principality, she arrived in Russia at fourteen to marry the future Peter III, converted to Orthodoxy and took the name Catherine, and later took the throne herself after a coup that deposed her own husband.|Nacida Sofía de Anhalt-Zerbst en un pequeño principado alemán, llegó a Rusia a los catorce años para casarse con el futuro Pedro III, se convirtió a la ortodoxia y tomó el nombre de Catalina.|Née Sophie d'Anhalt-Zerbst dans une petite principauté allemande, elle arriva en Russie à quatorze ans pour épouser le futur Pierre III, se convertit à l'orthodoxie et prit le nom de Catherine.|小さなドイツの公国でゾフィー・フォン・アンハルト=ツェルプストとして生まれた彼女は、14歳でロシアへ渡り、のちのピョートル3世と結婚するため正教に改宗してエカチェリーナの名を得た。後に自らの夫を廃するクーデターを経て、彼女自身が帝位に就いた。",
  ),
];
