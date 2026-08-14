/**
 * ウクライナのクイズ(35問)。
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
 * 都市カード(35件)が扱う具体的な事実(聖ソフィアの「壊れない壁」・
 * ポチョムキン階段の遠近法・トリピッリャ文化・ザポロージャ・シーチなど)は
 * ここでは問わない。代わりに、言語・食・国民的な象徴・音楽・スポーツなど、
 * **都市カードが触れていない主題**を選んである。書いている途中で
 * ピサンカ(コロミヤのカード)とコサック(ザポリッジャ・チェルカースィの
 * カード)が答えと重なっているのに気づき、それぞれ「結婚式のパン」と
 * 「サッカークラブ」の問いに差し替えた。
 *
 * `node scripts/check-quiz.mjs ukraine` はまだ走らせていない(焼き込み前
 * のため)。取りまとめ側で焼いたあとに実行して確かめてほしい。
 *
 * 選択肢は3つ。正解の位置(`a`)は0/1/2がほぼ同数になるよう散らしてある
 * (12/12/11)。
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

export const UKRAINE_QUIZ = [
  q(
    1,
    "What is the capital of Ukraine?|¿Cuál es la capital de Ucrania?|Quelle est la capitale de l'Ukraine ?|ウクライナの首都はどこか?",
    [
      "Kyiv|Kýiv|Kyiv|キーウ",
      "Lviv|Lviv|Lviv|リヴィウ",
      "Odesa|Odesa|Odesa|オデーサ",
    ],
    0,
    "Kyiv has been the country's political centre since the medieval state of Kyivan Rus, and its metropolitan area is now home to roughly a tenth of Ukraine's population.|Kýiv es el centro político del país desde el estado medieval de la Rus de Kýiv, y su área metropolitana alberga hoy a cerca de una décima parte de la población de Ucrania.|Kyiv est le centre politique du pays depuis l'État médiéval de la Rus' de Kyiv, et son aire métropolitaine abrite aujourd'hui près d'un dixième de la population ukrainienne.|キーウは中世のキーウ・ルーシ以来、この国の政治の中心であり続けており、首都圏にはいま国民のおよそ10分の1が暮らす。",
  ),
  q(
    1,
    "Which sea does Ukraine's southern coast mostly border?|¿Qué mar bordea principalmente la costa sur de Ucrania?|Quelle mer borde principalement la côte sud de l'Ukraine ?|ウクライナ南岸が主に面する海はどこか?",
    [
      "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
    ],
    1,
    "The Black Sea coast holds Ukraine's main commercial ports and, together with the smaller Sea of Azov to the east, gives the country its only sea access.|La costa del mar Negro alberga los principales puertos comerciales de Ucrania y, junto con el más pequeño mar de Azov al este, le da al país su único acceso marítimo.|La côte de la mer Noire abrite les principaux ports commerciaux d'Ukraine et, avec la mer d'Azov plus petite à l'est, donne au pays son seul accès à la mer.|黒海沿岸にはウクライナの主要な商業港があり、東側のより小さなアゾフ海とあわせて、この国の唯一の海への出口となっている。",
  ),
  q(
    2,
    "Which continent is Ukraine part of?|¿A qué continente pertenece Ucrania?|De quel continent l'Ukraine fait-elle partie ?|ウクライナが属する大陸は?",
    [
      "Asia|Asia|Asie|アジア",
      "Africa|África|Afrique|アフリカ",
      "Europe|Europa|Europe|ヨーロッパ",
    ],
    2,
    "Ukraine is the largest country lying entirely within Europe, bordered by seven other states from Poland in the west to Russia in the east.|Ucrania es el mayor país situado enteramente en Europa, limítrofe con otros siete estados, desde Polonia al oeste hasta Rusia al este.|L'Ukraine est le plus grand pays situé entièrement en Europe, bordé par sept autres États, de la Pologne à l'ouest jusqu'à la Russie à l'est.|ウクライナは完全にヨーロッパ内に収まる国としては最大で、西のポーランドから東のロシアまで、他の七つの国と国境を接している。",
  ),
  q(
    2,
    "What are the two colours of Ukraine's flag, from top to bottom?|¿Cuáles son los dos colores de la bandera de Ucrania, de arriba abajo?|Quelles sont les deux couleurs du drapeau ukrainien, de haut en bas ?|ウクライナの国旗の色は上から順にどう並ぶか?",
    [
      "Blue over yellow|Azul sobre amarillo|Bleu sur jaune|上が青、下が黄",
      "Yellow over blue|Amarillo sobre azul|Jaune sur bleu|上が黄、下が青",
      "Red over white|Rojo sobre blanco|Rouge sur blanc|上が赤、下が白",
    ],
    0,
    "The two bands are usually read as blue sky over a yellow wheat field, an image tied to the country's role as one of the world's largest grain exporters.|Las dos franjas suelen leerse como cielo azul sobre un campo de trigo amarillo, una imagen ligada al papel del país como uno de los mayores exportadores de grano del mundo.|Les deux bandes se lisent généralement comme un ciel bleu au-dessus d'un champ de blé jaune, une image liée au rôle du pays comme l'un des plus grands exportateurs de céréales au monde.|二つの帯は一般に、青い空の下に広がる黄色い麦畑と解釈されており、世界有数の穀物輸出国というこの国の性格と結びついた図柄である。",
  ),
  q(
    3,
    "What is the name of Ukraine's currency?|¿Cómo se llama la moneda de Ucrania?|Quel est le nom de la monnaie ukrainienne ?|ウクライナの通貨の名前は?",
    [
      "Zloty|Zloty|Zloty|ズウォティ",
      "Hryvnia|Grivna|Hryvnia|フリヴニャ",
      "Lev|Lev|Lev|レフ",
    ],
    1,
    "The hryvnia was reintroduced in 1996 after independence, replacing a transitional currency called the karbovanets that had suffered severe inflation.|La grivna se reintrodujo en 1996 tras la independencia, sustituyendo a una moneda transitoria llamada karbovanets que había sufrido una inflación severa.|La hryvnia fut réintroduite en 1996 après l'indépendance, remplaçant une monnaie transitoire appelée karbovanets qui avait subi une inflation sévère.|フリヴニャは独立後の1996年に再導入された通貨で、それ以前に激しいインフレに見舞われていた過渡的な通貨カルボヴァネツィに取って代わった。",
  ),
  q(
    2,
    "Which beetroot soup, strongly associated with Ukraine, was added to UNESCO's list of intangible heritage in need of urgent safeguarding in 2022?|¿Qué sopa de remolacha, muy asociada a Ucrania, se añadió en 2022 a la lista de patrimonio inmaterial que necesita salvaguardia urgente de la UNESCO?|Quelle soupe à la betterave, fortement associée à l'Ukraine, fut ajoutée en 2022 à la liste du patrimoine immatériel nécessitant une sauvegarde urgente de l'UNESCO ?|ウクライナと強く結びつくビーツのスープで、2022年にユネスコの緊急保護が必要な無形文化遺産リストに加えられたものは?",
    [
      "Goulash|Gulash|Goulasch|グヤーシュ",
      "Minestrone|Minestrone|Minestrone|ミネストローネ",
      "Borscht|Borsch|Bortsch|ボルシチ",
    ],
    2,
    "The listing was requested specifically to protect the tradition of Ukrainian borscht culture during the full-scale invasion, and it is prepared with dozens of regional variations across the country.|La inscripción se solicitó específicamente para proteger la tradición de la cultura del borsch ucraniano durante la invasión a gran escala, y se prepara con docenas de variantes regionales por todo el país.|Cette inscription fut demandée spécifiquement pour protéger la tradition de la culture du bortsch ukrainien durant l'invasion à grande échelle, et il se prépare selon des dizaines de variantes régionales à travers le pays.|この登録は、大規模侵攻のさなかにウクライナのボルシチ文化という伝統を守るために特に申請されたもので、国内には数十種類もの地方ごとの作り方がある。",
  ),
  q(
    3,
    "What is the name of the traditional embroidered shirt worn on festive occasions in Ukraine?|¿Cómo se llama la camisa bordada tradicional que se usa en las fiestas en Ucrania?|Comment s'appelle la chemise brodée traditionnelle portée lors des fêtes en Ukraine ?|ウクライナで祝いの席に着る、伝統的な刺繍シャツの名前は?",
    [
      "Vyshyvanka|Vyshyvanka|Vychyvanka|ヴィシヴァンカ",
      "Sarafan|Sarafán|Sarafane|サラファン",
      "Dirndl|Dirndl|Dirndl|ディアンドル",
    ],
    0,
    "Patterns and colours of the cross-stitched embroidery traditionally varied by region, so that a trained eye could once tell roughly where the wearer's family was from.|Los patrones y colores del bordado en punto de cruz variaban tradicionalmente según la región, de modo que un ojo experto podía antaño saber más o menos de dónde era la familia de quien la llevaba.|Les motifs et les couleurs de la broderie au point de croix variaient traditionnellement selon la région, si bien qu'un œil averti pouvait autrefois deviner d'où venait la famille de la personne qui la portait.|クロスステッチの刺繍の文様や色は伝統的に地方ごとに異なり、目の肥えた人ならかつては着ている人の一家がだいたいどこの出身か見分けられたという。",
  ),
  q(
    4,
    "What is the name of the elaborately decorated ceremonial bread used in traditional Ukrainian wedding rituals?|¿Cómo se llama el pan ceremonial muy decorado que se usa en los rituales de boda tradicionales ucranianos?|Comment s'appelle le pain cérémoniel richement décoré utilisé dans les rituels de mariage traditionnels ukrainiens ?|ウクライナの伝統的な結婚式の儀式で使われる、飾り立てられたパンの名前は?",
    [
      "Panettone|Panettone|Panettone|パネトーネ",
      "Korovai|Korovai|Korovaï|コロヴァイ",
      "Baguette|Baguette|Baguette|バゲット",
    ],
    1,
    "The round loaf is decorated with dough shaped into birds, flowers and rings, each carrying its own meaning, and is traditionally baked by married women believed to bring good fortune to the couple.|El pan redondo se decora con masa moldeada en forma de pájaros, flores y anillos, cada uno con su propio significado, y tradicionalmente lo hornean mujeres casadas que se cree que traen buena fortuna a la pareja.|Le pain rond est décoré de pâte façonnée en oiseaux, fleurs et anneaux, chacun ayant sa propre signification, et il est traditionnellement cuit par des femmes mariées censées porter chance au couple.|丸いパンは鳥や花、指輪をかたどった生地で飾られ、それぞれに意味が込められている。伝統的に、夫婦円満をもたらすと信じられている既婚女性の手で焼かれる。",
  ),
  q(
    3,
    "What is the name of the plucked, multi-stringed instrument long associated with Cossack folk music?|¿Cómo se llama el instrumento de cuerda pulsada asociado desde hace tiempo con la música folclórica cosaca?|Comment s'appelle l'instrument à cordes pincées longtemps associé à la musique folklorique cosaque ?|コサックの民俗音楽と長く結びついてきた、爪弾く多弦楽器の名前は?",
    [
      "Balalaika|Balalaica|Balalaïka|バラライカ",
      "Sitar|Sitar|Sitar|シタール",
      "Bandura|Bandura|Bandoura|バンドゥーラ",
    ],
    2,
    "A modern concert bandura can carry over 60 strings, far more than its historic ancestors, and blind itinerant minstrels called kobzari once used simpler versions to perform epic songs called dumy.|Una bandura de concierto moderna puede tener más de 60 cuerdas, muchas más que sus antepasados históricos, y los juglares ciegos itinerantes llamados kobzari usaban antaño versiones más sencillas para interpretar cantos épicos llamados dumy.|Une bandoura de concert moderne peut compter plus de 60 cordes, bien plus que ses ancêtres historiques, et des ménestrels itinérants aveugles appelés kobzari utilisaient jadis des versions plus simples pour interpréter des chants épiques appelés dumy.|現代の演奏会用バンドゥーラは60本を超える弦を持つこともあり、歴史上の原型よりはるかに多い。かつて盲目の遍歴楽師コブザーリは、もっと単純な形のこの楽器で「ドゥーマ」と呼ばれる叙事詩を歌った。",
  ),
  q(
    3,
    "Which mountain range crosses the far west of Ukraine?|¿Qué cordillera atraviesa el extremo oeste de Ucrania?|Quelle chaîne de montagnes traverse l'extrême ouest de l'Ukraine ?|ウクライナ最西部を横切る山脈は?",
    [
      "The Carpathian Mountains|Los montes Cárpatos|Les Carpates|カルパチア山脈",
      "The Alps|Los Alpes|Les Alpes|アルプス山脈",
      "The Ural Mountains|Los montes Urales|Les monts Oural|ウラル山脈",
    ],
    0,
    "The Ukrainian Carpathians are lower and more rounded than the Alps, and their forested slopes are home to the Hutsul highlanders, known for wood carving, sheep herding and distinctive folk dress.|Los Cárpatos ucranianos son más bajos y redondeados que los Alpes, y sus laderas boscosas albergan a los montañeses hutsules, conocidos por la talla en madera, el pastoreo de ovejas y su traje popular distintivo.|Les Carpates ukrainiennes sont plus basses et plus arrondies que les Alpes, et leurs versants boisés abritent les montagnards houtsoules, connus pour la sculpture sur bois, l'élevage ovin et un costume populaire distinctif.|ウクライナのカルパチア山脈はアルプスより低くなだらかで、森に覆われた斜面には木彫りや羊飼い、独特の民族衣装で知られる山岳民フツル人が暮らす。",
  ),
  q(
    5,
    "What is the name of Ukraine's highest peak, located in the Carpathians?|¿Cómo se llama el pico más alto de Ucrania, situado en los Cárpatos?|Comment s'appelle le plus haut sommet d'Ukraine, situé dans les Carpates ?|カルパチア山脈にある、ウクライナ最高峰の名前は?",
    [
      "Mount Elbrus|Monte Elbrús|Mont Elbrouz|エルブルス山",
      "Hoverla|Hoverla|Hoverla|ホヴェールラ山",
      "Triglav|Triglav|Triglav|トリグラウ山",
    ],
    1,
    "Hoverla stands 2,061 metres tall and draws thousands of hikers each summer, many timing their climb to the country's Independence Day in August.|El Hoverla se alza 2.061 metros y atrae a miles de excursionistas cada verano, muchos de los cuales sincronizan su ascenso con el Día de la Independencia del país en agosto.|Le Hoverla culmine à 2 061 mètres et attire des milliers de randonneurs chaque été, beaucoup calant leur ascension sur le jour de l'Indépendance du pays en août.|ホヴェールラ山は標高2061メートルで、毎夏数千人の登山者を集める。多くは8月の独立記念日に合わせて登頂の時期を選ぶ。",
  ),
  q(
    3,
    "What large white bird, a symbol of home and good fortune, commonly nests on rooftops and utility poles across Ukrainian villages?|¿Qué gran ave blanca, símbolo de hogar y buena fortuna, anida a menudo en tejados y postes eléctricos por los pueblos de Ucrania?|Quel grand oiseau blanc, symbole de foyer et de bonne fortune, niche couramment sur les toits et les poteaux électriques des villages ukrainiens ?|家と幸運の象徴とされ、ウクライナの村々の屋根や電柱によく巣を作る大きな白い鳥は?",
    [
      "Peacock|Pavo real|Paon|クジャク",
      "Flamingo|Flamenco|Flamant|フラミンゴ",
      "White stork|Cigüeña blanca|Cigogne blanche|コウノトリ",
    ],
    2,
    "A family will sometimes build a small platform on a pole specifically to invite a stork to stay, and the bird is said to return to the very same nest every spring after wintering as far away as southern Africa.|A veces una familia construye una pequeña plataforma en un poste solo para invitar a una cigüeña a quedarse, y se dice que el ave vuelve al mismo nido cada primavera tras invernar tan lejos como el sur de África.|Une famille construit parfois une petite plateforme sur un poteau juste pour inviter une cigogne à s'installer, et l'oiseau reviendrait, dit-on, au même nid chaque printemps après avoir hiverné aussi loin qu'en Afrique australe.|わざわざ電柱の上に小さな台を作ってまでコウノトリの巣作りを誘う家もある。この鳥は、遠く南アフリカあたりで冬を越したのち、毎春同じ巣に戻ってくると言われている。",
  ),
  q(
    6,
    "What is the name of the exceptionally fertile black soil found across much of Ukraine's farmland?|¿Cómo se llama el suelo negro excepcionalmente fértil que cubre buena parte de las tierras de cultivo de Ucrania?|Comment s'appelle le sol noir exceptionnellement fertile que l'on trouve sur une grande partie des terres agricoles d'Ukraine ?|ウクライナの農地の多くを覆う、非常に肥沃な黒い土の名前は?",
    [
      "Chornozem|Chernozem|Tchernoziom|チェルノーゼム",
      "Loess|Loess|Loess|レス",
      "Terra rossa|Terra rossa|Terra rossa|テラロッサ",
    ],
    0,
    "Chornozem can run several metres deep in places and is often called some of the richest farmland soil on the planet, which is a large part of why the country ranks among the world's top grain exporters.|El chernozem puede alcanzar varios metros de profundidad en algunos lugares y a menudo se le llama uno de los suelos agrícolas más ricos del planeta, lo que explica en buena parte por qué el país figura entre los mayores exportadores de grano del mundo.|Le tchernoziom peut atteindre plusieurs mètres de profondeur par endroits et est souvent qualifié de l'un des sols agricoles les plus riches de la planète, ce qui explique en grande partie pourquoi le pays figure parmi les plus grands exportateurs de céréales au monde.|チェルノーゼムは場所によって厚さ数メートルにも達し、地球上でも屈指の豊かな農地の土とよく言われる。この国が世界有数の穀物輸出国である理由の大きな部分を占めている。",
  ),
  q(
    5,
    "How many countries share a land border with Ukraine?|¿Con cuántos países comparte Ucrania frontera terrestre?|Avec combien de pays l'Ukraine partage-t-elle une frontière terrestre ?|ウクライナと陸続きの国境を接する国はいくつあるか?",
    [
      "4|4|4|4か国",
      "7|7|7|7か国",
      "10|10|10|10か国",
    ],
    1,
    "Going clockwise from the north, they are Belarus, Russia, Moldova, Romania, Hungary, Slovakia and Poland.|Yendo en sentido horario desde el norte, son Bielorrusia, Rusia, Moldavia, Rumanía, Hungría, Eslovaquia y Polonia.|En allant dans le sens horaire depuis le nord, ce sont la Biélorussie, la Russie, la Moldavie, la Roumanie, la Hongrie, la Slovaquie et la Pologne.|北から時計回りに、ベラルーシ・ロシア・モルドヴァ・ルーマニア・ハンガリー・スロヴァキア・ポーランドの7か国である。",
  ),
  q(
    4,
    "What is the name of Ukraine's national railway company?|¿Cómo se llama la compañía ferroviaria nacional de Ucrania?|Comment s'appelle la compagnie ferroviaire nationale d'Ukraine ?|ウクライナの国営鉄道会社の名前は?",
    [
      "Deutsche Bahn|Deutsche Bahn|Deutsche Bahn|ドイツ鉄道",
      "SNCF|SNCF|SNCF|SNCF",
      "Ukrzaliznytsia|Ukrzaliznytsia|Ukrzaliznytsia|ウクルザリズニツャ",
    ],
    2,
    "Ukrzaliznytsia runs one of the largest rail networks in Europe by track length, and it is also one of the country's largest single employers.|Ukrzaliznytsia gestiona una de las redes ferroviarias más extensas de Europa por longitud de vía, y es además uno de los mayores empleadores individuales del país.|Ukrzaliznytsia exploite l'un des plus grands réseaux ferroviaires d'Europe par la longueur des voies, et c'est aussi l'un des plus grands employeurs uniques du pays.|ウクルザリズニツャは、線路の総延長でヨーロッパでも屈指の規模を誇る鉄道網を運営しており、国内最大級の単一の雇用主でもある。",
  ),
  q(
    6,
    "The athlete Serhiy Bubka, often cited as setting 35 world records over his career, competed in which track and field event?|El atleta Serhiy Bubka, del que a menudo se dice que batió 35 récords mundiales en su carrera, competía ¿en qué prueba de atletismo?|L'athlète Serhiy Bubka, à qui l'on attribue souvent 35 records du monde au cours de sa carrière, concourait dans quelle épreuve d'athlétisme ?|キャリアを通じて35回世界記録を更新したとよく言われる陸上選手セルヒイ・ブブカの種目は?",
    [
      "Pole vault|Salto con pértiga|Saut à la perche|棒高跳び",
      "High jump|Salto de altura|Saut en hauteur|走り高跳び",
      "Long jump|Salto de longitud|Saut en longueur|走り幅跳び",
    ],
    0,
    "Bubka won Olympic gold in the pole vault at the 1988 Seoul Games, and his outdoor world record, set in 1994, stood unbroken for 21 years.|Bubka ganó el oro olímpico en salto con pértiga en los Juegos de Seúl de 1988, y su récord mundial al aire libre, fijado en 1994, permaneció imbatido durante 21 años.|Bubka remporta l'or olympique au saut à la perche aux Jeux de Séoul en 1988, et son record du monde en plein air, établi en 1994, resta invaincu pendant 21 ans.|ブブカは1988年のソウル五輪で棒高跳びの金メダルを獲得し、1994年に樹立した屋外世界記録は21年間破られなかった。",
  ),
  q(
    7,
    "In which year was the medieval state of Kyivan Rus formally baptised into Christianity under Prince Volodymyr?|¿En qué año se bautizó formalmente al cristianismo el estado medieval de la Rus de Kýiv bajo el príncipe Volodímir?|En quelle année l'État médiéval de la Rus' de Kyiv fut-il formellement baptisé dans le christianisme sous le prince Volodymyr ?|中世のキーウ・ルーシがヴォロディームィル公のもとで正式にキリスト教を受け入れたのは何年か?",
    [
      "1054|1054|1054|1054年",
      "988|988|988|988年",
      "1240|1240|1240|1240年",
    ],
    1,
    "Tradition holds that Volodymyr had the population of Kyiv baptised in the Dnipro river, an event still marked every year with a public holiday.|Según la tradición, Volodímir hizo bautizar a la población de Kýiv en el río Dniéper, un episodio que aún se conmemora cada año con un día festivo.|La tradition veut que Volodymyr fît baptiser la population de Kyiv dans le fleuve Dniepr, un épisode encore commémoré chaque année par un jour férié.|伝承によれば、ヴォロディームィルはキーウの住民をドニプロ川で洗礼させたとされ、この出来事はいまも毎年、祝日として記念されている。",
  ),
  q(
    5,
    "Which Ukrainian singer won the Eurovision Song Contest in 2004 with \"Wild Dances\"?|¿Qué cantante ucraniana ganó el Festival de Eurovisión en 2004 con \"Wild Dances\"?|Quelle chanteuse ukrainienne remporta l'Eurovision en 2004 avec « Wild Dances » ?|2004年に「ワイルド・ダンシズ」でユーロビジョン・ソング・コンテストを制したウクライナの歌手は?",
    [
      "Jamala|Jamala|Jamala|ジャマラ",
      "Tina Karol|Tina Karol|Tina Karol|ティナ・カロル",
      "Ruslana|Ruslana|Ruslana|ルスラーナ",
    ],
    2,
    "Ruslana built the song and stage show around Hutsul mountain folklore and instruments, including the long alpine horn called the trembita.|Ruslana construyó la canción y el espectáculo en torno al folclore y los instrumentos montañeses hutsules, incluido el largo cuerno alpino llamado trembita.|Ruslana construisit la chanson et le spectacle autour du folklore et des instruments montagnards houtsoules, dont le long cor alpin appelé trembita.|ルスラーナはこの曲と舞台演出を、フツル地方の山岳民俗と、その長いアルプホルン風の楽器トレンビタを中心に組み立てた。",
  ),
  q(
    6,
    "Which Ukrainian singer won Eurovision 2016 with a song referencing the 1944 deportation of Crimean Tatars?|¿Qué cantante ucraniana ganó Eurovisión 2016 con una canción sobre la deportación de los tártaros de Crimea en 1944?|Quelle chanteuse ukrainienne remporta l'Eurovision 2016 avec une chanson évoquant la déportation des Tatars de Crimée en 1944 ?|1944年のクリミア・タタール人強制移住を題材にした曲で2016年のユーロビジョンを制したウクライナの歌手は?",
    [
      "Jamala|Jamala|Jamala|ジャマラ",
      "Ruslana|Ruslana|Ruslana|ルスラーナ",
      "Verka Serduchka|Verka Serduchka|Verka Serdioutchka|ヴェールカ・セルドゥーチカ",
    ],
    0,
    "Jamala, who is herself of Crimean Tatar descent, based the song \"1944\" on the story of her own great-grandmother's deportation under Stalin.|Jamala, de ascendencia tártara de Crimea ella misma, basó la canción \"1944\" en la historia de la deportación de su propia bisabuela bajo Stalin.|Jamala, elle-même d'ascendance tatare de Crimée, fonda la chanson « 1944 » sur l'histoire de la déportation de sa propre arrière-grand-mère sous Staline.|クリミア・タタールの血を引くジャマラ自身の曾祖母が、スターリン時代に強制移住させられた体験をもとに、この楽曲「1944」は作られた。",
  ),
  q(
    5,
    "What sport are the brothers Vitali and Wladimir Klitschko best known for internationally?|¿En qué deporte son más conocidos internacionalmente los hermanos Vitali y Wladimir Klitschko?|Dans quel sport les frères Vitali et Wladimir Klitschko sont-ils le plus connus à l'international ?|ヴィタリー・クリチコとヴォロディームィル・クリチコの兄弟が国際的に知られているスポーツは?",
    [
      "Football|Fútbol|Football|サッカー",
      "Boxing|Boxeo|Boxe|ボクシング",
      "Tennis|Tenis|Tennis|テニス",
    ],
    1,
    "Both brothers held world heavyweight titles for long stretches through the 2000s and 2010s, and Vitali later became mayor of Kyiv.|Ambos hermanos ostentaron títulos mundiales de peso pesado durante largos periodos entre los años 2000 y 2010, y Vitali llegó después a ser alcalde de Kýiv.|Les deux frères détinrent des titres mondiaux des poids lourds durant de longues périodes dans les années 2000 et 2010, et Vitali devint plus tard maire de Kyiv.|兄弟そろって2000年代から2010年代にかけて長期にわたりヘビー級の世界王座を保持し、兄ヴィタリーはのちにキーウ市長にもなった。",
  ),
  q(
    3,
    "What crop, grown widely across Ukraine's plains, is represented by the yellow band of the national flag?|¿Qué cultivo, extendido por las llanuras de Ucrania, representa la franja amarilla de la bandera nacional?|Quelle culture, largement répandue dans les plaines d'Ukraine, est représentée par la bande jaune du drapeau national ?|ウクライナの平原に広く育つ、国旗の黄色い帯が表す作物は?",
    [
      "Rice paddies|Arrozales|Rizières|水田",
      "Coffee plantations|Plantaciones de café|Plantations de café|コーヒー農園",
      "Wheat fields|Campos de trigo|Champs de blé|小麦畑",
    ],
    2,
    "Wheat and other grains grown on the country's black soil have made Ukraine one of the world's largest cereal exporters for well over a century.|El trigo y otros cereales cultivados en el suelo negro del país han convertido a Ucrania en uno de los mayores exportadores de cereales del mundo desde hace más de un siglo.|Le blé et d'autres céréales cultivés sur le sol noir du pays ont fait de l'Ukraine l'un des plus grands exportateurs de céréales au monde depuis plus d'un siècle.|肥沃な黒土で育つ小麦をはじめとする穀物のおかげで、ウクライナは一世紀以上にわたり世界有数の穀物輸出国であり続けている。",
  ),
  q(
    4,
    "What dumpling, typically filled with potato, cheese or fruit and boiled, is a staple of Ukrainian home cooking?|¿Qué empanadilla hervida, típicamente rellena de patata, queso o fruta, es un pilar de la cocina casera ucraniana?|Quel raviole, typiquement fourré de pomme de terre, de fromage ou de fruits et bouilli, est un pilier de la cuisine familiale ukrainienne ?|ジャガイモ・チーズ・果物などを詰めて茹でる、ウクライナの家庭料理の定番である料理は?",
    [
      "Varenyky|Vareniki|Varenyky|ヴァレーヌィキ",
      "Ravioli|Ravioli|Ravioli|ラビオリ",
      "Gyoza|Gyoza|Gyoza|餃子",
    ],
    0,
    "Making a big batch of varenyky by hand is often a group task shared among family members, with each person taking a different step in filling and pinching the dough.|Preparar una gran tanda de varenyky a mano suele ser una tarea compartida en familia, en la que cada persona se encarga de una etapa distinta del relleno y el pellizcado de la masa.|Préparer un grand lot de varenyky à la main est souvent une tâche familiale partagée, chacun se chargeant d'une étape différente pour garnir et pincer la pâte.|大量のヴァレーヌィキを手作りするのは、たいてい家族総出の作業で、生地に具を詰めて縁をつまむ作業をそれぞれが分担して行う。",
  ),
  q(
    6,
    "What cured, salted pork fat, often eaten thinly sliced with garlic and dark bread, is a Ukrainian food closely tied to national identity?|¿Qué grasa de cerdo curada y salada, a menudo comida en lonchas finas con ajo y pan negro, es un alimento ucraniano muy ligado a la identidad nacional?|Quelle graisse de porc salée et affinée, souvent mangée en fines tranches avec de l'ail et du pain noir, est un aliment ukrainien fortement lié à l'identité nationale ?|ニンニクと黒パンを添えて薄く切って食べることが多い、国民性と強く結びついたウクライナの塩漬け豚脂は?",
    [
      "Prosciutto|Prosciutto|Prosciutto|プロシュット",
      "Salo|Salo|Salo|サーロ",
      "Lardo|Lardo|Lardo|ラルド",
    ],
    1,
    "Salo is sometimes served on its own, sometimes smoked or rubbed with garlic and spices, and jokes about a near-mythical love of it are common enough to have become a mild national stereotype.|El salo a veces se sirve solo, a veces ahumado o frotado con ajo y especias, y las bromas sobre un amor casi mítico por él son tan comunes que se han convertido en un estereotipo nacional suave.|Le salo se sert parfois seul, parfois fumé ou frotté à l'ail et aux épices, et les blagues sur un amour quasi mythique pour lui sont assez courantes pour être devenues un léger stéréotype national.|サーロはそのまま出されることもあれば、燻製にしたりニンニクや香辛料をすり込んだりすることもある。これへのほとんど神話的なまでの愛を茶化す冗談は多く、ゆるやかな国民的ステレオタイプにさえなっている。",
  ),
  q(
    5,
    "What sweet dried-fruit compote, often served chilled around the winter holidays, is a traditional Ukrainian drink?|¿Qué compota dulce de fruta seca, servida a menudo fría en las fiestas de invierno, es una bebida tradicional ucraniana?|Quelle compote sucrée de fruits secs, souvent servie fraîche autour des fêtes d'hiver, est une boisson traditionnelle ukrainienne ?|冬の祝いの席で冷やして出されることの多い、ドライフルーツの甘いコンポートの名前は?",
    [
      "Eggnog|Ponche de huevo|Lait de poule|エッグノッグ",
      "Mulled wine|Vino caliente|Vin chaud|ホットワイン",
      "Uzvar|Uzvar|Ouzvar|ウズヴァル",
    ],
    2,
    "Uzvar is simmered from dried apples, pears and other fruit without added sugar in many traditional versions, and it is one of twelve dishes said to belong on the Christmas Eve table.|El uzvar se cuece a fuego lento con manzanas, peras y otras frutas secas, sin azúcar añadido en muchas versiones tradicionales, y es uno de los doce platos que se dice deben estar en la mesa de Nochebuena.|L'ouzvar mijote à partir de pommes, poires et autres fruits secs, sans sucre ajouté dans de nombreuses versions traditionnelles, et c'est l'un des douze plats censés figurer sur la table du réveillon de Noël.|ウズヴァルは干したリンゴや洋梨などの果物をことこと煮出したもので、伝統的な作り方の多くは砂糖を加えない。クリスマスイブの食卓に並ぶべきとされる12品のひとつでもある。",
  ),
  q(
    7,
    "What did the term \"hryvnia\", now the name of Ukraine's currency, originally refer to in medieval Kyivan Rus?|¿A qué se refería originalmente el término «grivna», hoy el nombre de la moneda de Ucrania, en la Rus de Kýiv medieval?|Que désignait à l'origine le terme « hryvnia », aujourd'hui le nom de la monnaie ukrainienne, dans la Rus' de Kyiv médiévale ?|いまはウクライナの通貨名である「フリヴニャ」は、中世のキーウ・ルーシでは元々何を指していたか?",
    [
      "A weight of silver used as a unit of value|Un peso de plata usado como unidad de valor|Un poids d'argent utilisé comme unité de valeur|価値の単位として使われた銀の重さ",
      "A type of embroidered scarf|Un tipo de pañuelo bordado|Un type de foulard brodé|刺繍入りのスカーフの一種",
      "A royal title|Un título real|Un titre royal|王の称号",
    ],
    0,
    "The word originally described a neck ornament and, by extension, a standard weight of silver used in trade long before paper money existed.|La palabra describía originalmente un adorno para el cuello y, por extensión, un peso estándar de plata usado en el comercio mucho antes de que existiera el papel moneda.|Le mot désignait à l'origine un ornement de cou puis, par extension, un poids standard d'argent utilisé dans le commerce bien avant l'existence du papier-monnaie.|この言葉はもともと首飾りを指し、そこから転じて、紙幣が存在するよりずっと前、交易で使われた銀の標準的な重さの単位を指すようになった。",
  ),
  q(
    8,
    "Who composed the 1916 choral work \"Shchedryk,\" whose melody later became world-famous as \"Carol of the Bells\"?|¿Quién compuso la obra coral de 1916 «Shchedryk», cuya melodía se hizo mundialmente famosa después como «Carol of the Bells»?|Qui composa l'œuvre chorale de 1916 « Chtchedryk », dont la mélodie devint plus tard mondialement célèbre sous le nom de « Carol of the Bells » ?|のちに「キャロル・オブ・ザ・ベルズ」として世界的に有名になった旋律を持つ、1916年の合唱曲「シチェドリク」を作曲したのは誰か?",
    [
      "Pyotr Tchaikovsky|Piotr Chaikovski|Piotr Tchaïkovski|ピョートル・チャイコフスキー",
      "Mykola Leontovych|Mykola Leontóvich|Mykola Leontovytch|ムィコラ・レオントーヴィチ",
      "Modest Mussorgsky|Modest Músorgski|Modeste Moussorgski|モデスト・ムソルグスキー",
    ],
    1,
    "Leontovych based the piece on an old Ukrainian folk chant traditionally sung on New Year's Eve by the Julian calendar, wishing a household a swallow's welcome and a rich harvest.|Leontóvich basó la pieza en un antiguo canto folclórico ucraniano cantado tradicionalmente en Nochevieja según el calendario juliano, deseando a un hogar la bienvenida de una golondrina y una cosecha rica.|Leontovytch fonda la pièce sur un vieux chant folklorique ukrainien traditionnellement entonné la veille du Nouvel An selon le calendrier julien, souhaitant à un foyer l'arrivée d'une hirondelle et une riche récolte.|レオントーヴィチはこの曲を、ユリウス暦の大晦日に歌われてきた古いウクライナの民謡をもとに作った。原曲はツバメの訪れと豊作をその家に願う内容である。",
  ),
  q(
    2,
    "What alphabet is the Ukrainian language written in?|¿En qué alfabeto se escribe la lengua ucraniana?|Dans quel alphabet la langue ukrainienne est-elle écrite ?|ウクライナ語を書き表すのに使われる文字は?",
    [
      "The Latin alphabet|El alfabeto latino|L'alphabet latin|ラテン文字",
      "The Greek alphabet|El alfabeto griego|L'alphabet grec|ギリシャ文字",
      "A Cyrillic alphabet|Un alfabeto cirílico|Un alphabet cyrillique|キリル文字",
    ],
    2,
    "Ukrainian's Cyrillic alphabet includes several letters not used in Russian, and its spelling generally follows pronunciation more closely than Russian's does.|El alfabeto cirílico del ucraniano incluye varias letras que no se usan en ruso, y su ortografía en general sigue la pronunciación más de cerca que la del ruso.|L'alphabet cyrillique de l'ukrainien comprend plusieurs lettres absentes du russe, et son orthographe suit généralement la prononciation de plus près que celle du russe.|ウクライナ語のキリル文字には、ロシア語には無い字がいくつか含まれており、綴りは全体としてロシア語よりも発音に近い形になっている。",
  ),
  q(
    6,
    "Which of these is a Cyrillic letter used in Ukrainian but not in Russian?|¿Cuál de estas es una letra cirílica que se usa en ucraniano pero no en ruso?|Laquelle de ces lettres cyrilliques est utilisée en ukrainien mais pas en russe ?|ウクライナ語では使われるがロシア語には無いキリル文字はどれか?",
    [
      "Ї|Ї|Ї|Ї",
      "Ы|Ы|Ы|Ы",
      "Ъ|Ъ|Ъ|Ъ",
    ],
    0,
    "The letter ї, pronounced roughly like \"yi\", appears in common words such as Ukraine's own name, Україна, and is one of a handful of letters that instantly mark a text as Ukrainian rather than Russian.|La letra ї, que se pronuncia aproximadamente como «yi», aparece en palabras comunes como el propio nombre de Ucrania, Україна, y es una de las pocas letras que marcan al instante un texto como ucraniano y no ruso.|La lettre ї, prononcée à peu près comme « yi », apparaît dans des mots courants tels que le nom même de l'Ukraine, Україна, et c'est l'une des rares lettres qui signalent instantanément un texte comme ukrainien plutôt que russe.|「イィ」に近い音で読む文字їは、ウクライナ自身の国名ウクライーナ(Україна)をはじめ日常語に現れ、一目でロシア語ではなくウクライナ語の文章だと分かる数少ない文字のひとつである。",
  ),
  q(
    4,
    "What is the traditional Ukrainian Christmas Eve dish of boiled wheat berries mixed with honey, poppy seed and nuts?|¿Cuál es el plato tradicional de Nochebuena ucraniano hecho de trigo hervido mezclado con miel, semillas de amapola y frutos secos?|Quel est le plat traditionnel du réveillon de Noël ukrainien à base de grains de blé bouillis mélangés à du miel, du pavot et des noix ?|茹でた小麦の実を蜂蜜・ケシの実・木の実と混ぜる、ウクライナのクリスマスイブの伝統料理は?",
    [
      "Panettone|Panettone|Panettone|パネトーネ",
      "Kutia|Kutiá|Koutia|クーチャ",
      "Stollen|Stollen|Stollen|シュトレン",
    ],
    1,
    "Kutia is traditionally the first of twelve meat-free dishes eaten on Christmas Eve, and in some households a spoonful is thrown at the ceiling for luck, with a stickier splatter said to promise a better year.|La kutiá es tradicionalmente el primero de los doce platos sin carne que se comen en Nochebuena, y en algunas casas se lanza una cucharada al techo por suerte: cuanto más se pega, mejor se dice que será el año.|La koutia est traditionnellement le premier des douze plats sans viande consommés au réveillon de Noël, et dans certains foyers on en jette une cuillerée au plafond pour la chance, une éclaboussure plus collante étant censée promettre une meilleure année.|クーチャは伝統的に、クリスマスイブに食べる肉なしの12品のうち最初の一品とされる。一部の家庭では縁起を担いでひとさじを天井に投げつけ、よりべったりと貼りつくほど良い年になると言われる。",
  ),
  q(
    9,
    "In the Hutsul highland culture of the Carpathians, what is the name of the long alpine horn used to signal across valleys?|En la cultura montañesa hutsul de los Cárpatos, ¿cómo se llama el largo cuerno alpino usado para enviar señales de un valle a otro?|Dans la culture montagnarde houtsoule des Carpates, comment s'appelle le long cor alpin utilisé pour envoyer des signaux d'une vallée à l'autre ?|カルパチアのフツル高地文化で、谷を越えて合図を送るために使われる長いアルプホルン風の楽器の名前は?",
    [
      "Alphorn|Cuerno alpino|Cor des Alpes|アルプホルン",
      "Didgeridoo|Didyeridú|Didgeridoo|ディジュリドゥ",
      "Trembita|Trembitá|Trembita|トレンビタ",
    ],
    2,
    "A trembita can measure up to four metres long and was traditionally used to announce deaths, weddings and other news across the mountains, its low tone said to carry for several kilometres.|Una trembita puede medir hasta cuatro metros de largo y se usaba tradicionalmente para anunciar muertes, bodas y otras noticias por las montañas; se dice que su tono grave se oía a varios kilómetros.|Une trembita peut mesurer jusqu'à quatre mètres de long et servait traditionnellement à annoncer décès, mariages et autres nouvelles à travers les montagnes, son grave étant réputé porter sur plusieurs kilomètres.|トレンビタは長さ4メートルにも達することがあり、伝統的に死や結婚などの知らせを山越しに伝えるのに使われた。その低い音は数キロメートル先まで届くと言われる。",
  ),
  q(
    7,
    "What is the name of the trident-shaped emblem on Ukraine's coat of arms, tracing back to the Rurikid princes of Kyivan Rus?|¿Cómo se llama el emblema en forma de tridente del escudo de armas de Ucrania, que se remonta a los príncipes rurikidas de la Rus de Kýiv?|Comment s'appelle l'emblème en forme de trident des armoiries de l'Ukraine, remontant aux princes riourikides de la Rus' de Kyiv ?|キーウ・ルーシのリューリク朝諸公にまでさかのぼる、ウクライナの国章の三又の紋章の名前は?",
    [
      "Tryzub|Trizub|Trizoub|トリズブ",
      "Vazha|Vaja|Vaja|ヴァジャ",
      "Berkut|Berkut|Berkout|ベルクート",
    ],
    0,
    "The tryzub appeared on coins minted under Prince Volodymyr around the year 1000 and was formally readopted as the national emblem after independence in 1991.|El tryzub apareció en monedas acuñadas bajo el príncipe Volodímir hacia el año 1000 y se readoptó formalmente como emblema nacional tras la independencia en 1991.|Le tryzoub figurait sur des pièces frappées sous le prince Volodymyr vers l'an 1000 et fut officiellement réadopté comme emblème national après l'indépendance en 1991.|トリズブは西暦1000年頃、ヴォロディームィル公の治世に鋳造された貨幣にすでに現れており、1991年の独立後に正式に国章として再び採用された。",
  ),
  q(
    8,
    "What was the name of the medieval trade route, linking Scandinavia to the Byzantine Empire, that passed through Kyivan Rus along the Dnipro?|¿Cómo se llamaba la ruta comercial medieval, que unía Escandinavia con el Imperio bizantino, que pasaba por la Rus de Kýiv siguiendo el Dniéper?|Comment s'appelait la route commerciale médiévale, reliant la Scandinavie à l'Empire byzantin, qui traversait la Rus' de Kyiv le long du Dniepr ?|スカンディナヴィアとビザンツ帝国を結び、ドニプロ川に沿ってキーウ・ルーシを通った中世の交易路の名前は?",
    [
      "The Silk Road|La Ruta de la Seda|La Route de la soie|シルクロード",
      "The trade route from the Varangians to the Greeks|La ruta comercial de los varegos a los griegos|La route commerciale des Varègues aux Grecs|ヴァリャーグからギリシャ人への道",
      "The Amber Road|La Ruta del Ámbar|La Route de l'ambre|琥珀の道",
    ],
    1,
    "Norse traders and warriors known as Varangians used the route to reach Constantinople, and some historians credit them with helping found the earliest Kyivan Rus state structures.|Comerciantes y guerreros nórdicos conocidos como varegos usaban la ruta para llegar a Constantinopla, y algunos historiadores les atribuyen haber ayudado a fundar las primeras estructuras estatales de la Rus de Kýiv.|Des marchands et guerriers nordiques appelés Varègues empruntaient cette route pour atteindre Constantinople, et certains historiens leur attribuent un rôle dans la fondation des premières structures étatiques de la Rus' de Kyiv.|ヴァリャーグと呼ばれた北欧の商人・戦士たちはこの道を使ってコンスタンティノープルに至り、一部の歴史家は彼らが最初期のキーウ・ルーシの国家組織の形成に関わったとする。",
  ),
  q(
    3,
    "Which football club, based in the capital, is Ukraine's most decorated?|¿Qué club de fútbol, con sede en la capital, es el más laureado de Ucrania?|Quel club de football, basé dans la capitale, est le plus titré d'Ukraine ?|首都を本拠地とし、ウクライナで最も多くのタイトルを獲得しているサッカークラブは?",
    [
      "Shakhtar Donetsk|Shajtar Donetsk|Chakhtar Donetsk|シャフタール・ドネツク",
      "Real Madrid|Real Madrid|Real Madrid|レアル・マドリード",
      "Dynamo Kyiv|Dinamo de Kýiv|Dynamo Kyiv|ディナモ・キーウ",
    ],
    2,
    "Dynamo Kyiv won 13 Soviet championships and has added more than a dozen Ukrainian league titles since independence, along with two European Cup Winners' Cups in the 1970s and 1980s.|El Dinamo de Kýiv ganó 13 campeonatos soviéticos y ha sumado más de una decena de títulos de la liga ucraniana desde la independencia, además de dos Recopas de Europa en los años setenta y ochenta.|Le Dynamo Kyiv remporta 13 championnats soviétiques et a ajouté plus d'une douzaine de titres de la ligue ukrainienne depuis l'indépendance, ainsi que deux Coupes des vainqueurs de coupe européennes dans les années 1970 et 1980.|ディナモ・キーウはソ連時代に13回の選手権を制し、独立後もウクライナ・リーグの優勝を10回以上重ねている。1970年代と1980年代には欧州カップウィナーズカップも2度獲得した。",
  ),
  q(
    6,
    "Which 19th-century poet and painter, born into serfdom, is considered the father of modern Ukrainian literature?|¿Qué poeta y pintor del siglo XIX, nacido en la servidumbre, se considera el padre de la literatura ucraniana moderna?|Quel poète et peintre du XIXe siècle, né serf, est considéré comme le père de la littérature ukrainienne moderne ?|農奴として生まれた19世紀の詩人・画家で、近代ウクライナ文学の父とされる人物は?",
    [
      "Taras Shevchenko|Tarás Shevchenko|Taras Chevtchenko|タラス・シェウチェンコ",
      "Ivan Franko|Iván Franko|Ivan Franko|イヴァン・フランコ",
      "Lesya Ukrainka|Lesia Ukrainka|Lessia Oukraïnka|レーシャ・ウクライーンカ",
    ],
    0,
    "Shevchenko was born a serf in 1814 and had his freedom purchased by friends and admirers in 1838; he later wrote much of his best-known poetry, including \"Kobzar\", partly in exile.|Shevchenko nació siervo en 1814 y su libertad fue comprada por amigos y admiradores en 1838; más tarde escribió buena parte de su poesía más conocida, incluido «Kobzar», en parte en el exilio.|Chevtchenko naquit serf en 1814 et sa liberté fut rachetée par des amis et admirateurs en 1838 ; il écrivit plus tard une grande partie de sa poésie la plus connue, dont « Kobzar », en partie en exil.|シェウチェンコは1814年に農奴として生まれ、1838年に友人や支持者たちが金を出して自由の身にした。代表作「コブザール」を含む名高い詩の多くは、のちに流刑生活の中で書かれた。",
  ),
  q(
    9,
    "What is the Ukrainian word for a communal work-sharing gathering, such as neighbours coming together to help with a big seasonal task?|¿Cuál es la palabra ucraniana para una reunión comunal de ayuda mutua, como vecinos que se juntan para una gran tarea de temporada?|Quel est le mot ukrainien désignant une entraide collective, comme des voisins se réunissant pour une grande tâche saisonnière ?|近隣総出で大きな季節仕事を助け合う、共同作業の集まりを指すウクライナ語は?",
    [
      "Subbotnik|Subbótnik|Soubbotnik|スボートニク",
      "Toloka|Tolokà|Toloka|トロカ",
      "Kolkhoz|Koljós|Kolkhoze|コルホーズ",
    ],
    1,
    "A toloka might gather a village to bring in a harvest, raise a barn or salt a season's worth of cabbage, with the household being helped expected to provide food and drink rather than wages.|Una toloka podía reunir a un pueblo entero para recoger una cosecha, levantar un granero o salar la col de toda la temporada, y se esperaba que la familia ayudada ofreciera comida y bebida en vez de un salario.|Une toloka pouvait réunir tout un village pour rentrer une récolte, monter une grange ou saler le chou de toute la saison, le foyer aidé étant censé fournir nourriture et boisson plutôt qu'un salaire.|トロカは、収穫を取り込んだり納屋を建てたり、一冬分のキャベツを漬けたりするために村じゅうが集まる助け合いで、手伝ってもらった家は賃金ではなく食事と酒でもてなすのが習わしだった。",
  ),

  // ── 以下、35問から100問超への増補分。地理・言語・歴史・文化・食・スポーツ・
  // 宗教建築・鉄道・自然・科学者を新たに扱い、難易度7以上と9〜10を厚くしてある。
  // クリミア・ドンバスの占領地域や現在の戦況には立ち入らない(既存の方針を踏襲)。

  q(
    2,
    "Which river is the longest in Ukraine?|¿Qué río es el más largo de Ucrania?|Quel est le plus long fleuve d'Ukraine ?|ウクライナでいちばん長い川はどれか?",
    [
      "The Dniester|El Dniéster|Le Dniestr|ドニステル川",
      "The Dnipro|El Dniéper|Le Dniepr|ドニプロ川",
      "The Southern Bug|El Bug Meridional|Le Boug méridional|南ブーフ川",
    ],
    1,
    "The Dnipro runs about 2,200 kilometres from Russia through Belarus and Ukraine to the Black Sea, and roughly two-thirds of that length lies inside Ukraine, splitting the country into a right bank and a left bank that are still used as everyday geographic shorthand.|El Dniéper recorre unos 2.200 kilómetros desde Rusia, pasando por Bielorrusia y Ucrania, hasta el mar Negro, y cerca de dos tercios de ese trayecto están dentro de Ucrania, dividiendo al país en una margen derecha y una izquierda que aún se usan como referencia geográfica cotidiana.|Le Dniepr parcourt environ 2 200 kilomètres depuis la Russie, à travers la Biélorussie et l'Ukraine, jusqu'à la mer Noire, et près des deux tiers de ce trajet se trouvent en Ukraine, divisant le pays en une rive droite et une rive gauche encore utilisées comme repère géographique courant.|ドニプロ川はロシアからベラルーシ、ウクライナを経て黒海に注ぐまで約2200キロメートルにおよび、その3分の2ほどがウクライナ国内を流れる。この川は国土を「右岸」と「左岸」に分ける、いまも日常的に使われる地理区分の基準にもなっている。",
  ),
  q(
    3,
    "Which of these is Ukraine's second-largest city by population?|¿Cuál de estas es la segunda ciudad más poblada de Ucrania?|Laquelle de ces villes est la deuxième plus peuplée d'Ukraine ?|人口でウクライナ第2の都市はどれか?",
    [
      "Odesa|Odesa|Odesa|オデーサ",
      "Lviv|Lviv|Lviv|リヴィウ",
      "Kharkiv|Kharkiv|Kharkiv|ハルキウ",
    ],
    2,
    "Kharkiv served as the Ukrainian Soviet Socialist Republic's capital from 1919 until 1934, when the seat of government moved back to Kyiv, and its many universities still give it one of the country's youngest average populations.|Kharkiv fue la capital de la República Socialista Soviética de Ucrania desde 1919 hasta 1934, cuando la sede del gobierno volvió a Kýiv, y sus numerosas universidades le dan hoy una de las poblaciones medias más jóvenes del país.|Kharkiv fut la capitale de la République socialiste soviétique d'Ukraine de 1919 à 1934, quand le siège du gouvernement retourna à Kyiv, et ses nombreuses universités lui donnent aujourd'hui l'une des populations moyennes les plus jeunes du pays.|ハルキウは1919年から1934年まで、政府がキーウに戻るまでウクライナ・ソビエト社会主義共和国の首都だった。数多くの大学を抱えるこの町はいまも、国内でも平均年齢が若い都市のひとつであり続けている。",
  ),
  q(
    3,
    "Which of these is Ukraine's third-largest city, a major Black Sea port known for its opera house?|¿Cuál de estas es la tercera ciudad de Ucrania, un gran puerto del mar Negro conocido por su teatro de la ópera?|Laquelle de ces villes est la troisième d'Ukraine, un grand port de la mer Noire connu pour son opéra ?|黒海有数の港町で、歌劇場でも知られるウクライナ第3の都市はどれか?",
    [
      "Odesa|Odesa|Odesa|オデーサ",
      "Zaporizhzhia|Zaporizhzhia|Zaporijjia|ザポリッジャ",
      "Mykolaiv|Mykolaiv|Mykolaïv|ミコライウ",
    ],
    0,
    "Odesa was founded in 1794 on the site of an Ottoman fortress and grew into the Russian Empire's main southern trading port, drawing settlers from across Europe whose mixed heritage still shapes the city's food, humour and dialect.|Odesa se fundó en 1794 sobre el emplazamiento de una fortaleza otomana y creció hasta convertirse en el principal puerto comercial del sur del Imperio ruso, atrayendo colonos de toda Europa cuya herencia mixta aún da forma a la comida, el humor y el habla de la ciudad.|Odesa fut fondée en 1794 sur le site d'une forteresse ottomane et devint le principal port commercial du sud de l'Empire russe, attirant des colons de toute l'Europe dont l'héritage mêlé façonne encore la cuisine, l'humour et le parler de la ville.|オデーサは1794年、オスマン帝国の要塞跡に建設され、ロシア帝国南部を代表する交易港へと成長した。ヨーロッパ各地から移り住んだ人々の混ざり合った文化はいまも、この町の料理やユーモア、話し言葉に色濃く残っている。",
  ),
  q(
    6,
    "What is notable about the Sea of Azov, off Ukraine's eastern coast?|¿Qué tiene de notable el mar de Azov, frente a la costa oriental de Ucrania?|Qu'a de particulier la mer d'Azov, au large de la côte orientale de l'Ukraine ?|ウクライナ東岸に面するアゾフ海の特徴は?",
    [
      "It is one of the shallowest seas in the world|Es uno de los mares menos profundos del mundo|C'est l'une des mers les moins profondes du monde|世界でも屈指の浅い海である",
      "It never freezes, even in winter|Nunca se congela, ni en invierno|Elle ne gèle jamais, même en hiver|冬でも決して凍らない",
      "It has no rivers flowing into it|No desemboca en él ningún río|Aucune rivière ne s'y jette|流れ込む川が一本もない",
    ],
    0,
    "The Sea of Azov averages only around seven metres deep, shallow enough that parts of it can freeze over in a hard winter, and it receives the Don and Kuban rivers along with several smaller Ukrainian ones.|El mar de Azov tiene una profundidad media de solo unos siete metros, tan poco profundo que partes de él pueden helarse en un invierno duro, y recibe los ríos Don y Kubán junto con varios más pequeños ucranianos.|La mer d'Azov n'a qu'une profondeur moyenne d'environ sept mètres, assez faible pour que certaines de ses parties gèlent lors d'un hiver rigoureux, et elle reçoit le Don et le Kouban ainsi que plusieurs rivières ukrainiennes plus modestes.|アゾフ海の平均水深はわずか7メートルほどしかなく、厳しい冬には一部が結氷するほど浅い。ドン川やクバン川のほか、ウクライナ側のいくつかの小さな川もここに注いでいる。",
  ),
  q(
    5,
    "The Dniester river rises in the Ukrainian Carpathians and reaches the Black Sea after flowing through which neighbouring country?|El río Dniéster nace en los Cárpatos ucranianos y llega al mar Negro tras atravesar ¿qué país vecino?|Le fleuve Dniestr prend sa source dans les Carpates ukrainiennes et atteint la mer Noire après avoir traversé quel pays voisin ?|カルパチア山中に源を発するドニステル川が、黒海に至るまでに流れる隣国はどこか?",
    [
      "Moldova|Moldavia|Moldavie|モルドヴァ",
      "Romania|Rumanía|Roumanie|ルーマニア",
      "Slovakia|Eslovaquia|Slovaquie|スロヴァキア",
    ],
    0,
    "The Dniester forms much of the border between Ukraine and Moldova and cuts directly through Moldova's breakaway Transnistria region before reaching the sea, making it one of the few rivers in the region shared so closely between just two states.|El Dniéster forma buena parte de la frontera entre Ucrania y Moldavia y atraviesa directamente la región separatista moldava de Transnistria antes de llegar al mar, lo que lo convierte en uno de los pocos ríos de la zona compartidos tan de cerca entre solo dos estados.|Le Dniestr forme une bonne partie de la frontière entre l'Ukraine et la Moldavie et traverse directement la région séparatiste moldave de Transnistrie avant d'atteindre la mer, ce qui en fait l'un des rares fleuves de la région partagés d'aussi près entre seulement deux États.|ドニステル川はウクライナとモルドヴァの国境の多くを形づくり、海に至る前にモルドヴァの分離地域トランスニストリアを直接貫いて流れる。この地域では珍しく、たった二つの国だけでこれほど密接に分け合う川である。",
  ),
  q(
    7,
    "Unlike the Dnipro or Dniester, which major Ukrainian river flows entirely within the country's own borders, from source to sea?|A diferencia del Dniéper o el Dniéster, ¿qué gran río ucraniano fluye enteramente dentro de las fronteras del país, de la fuente al mar?|Contrairement au Dniepr ou au Dniestr, quel grand fleuve ukrainien coule entièrement à l'intérieur des frontières du pays, de la source à la mer ?|ドニプロ川やドニステル川と違い、水源から河口までウクライナの国境の内側だけを流れる大河はどれか?",
    [
      "The Southern Bug|El Bug Meridional|Le Boug méridional|南ブーフ川",
      "The Desna|El Desná|La Desna|デスナ川",
      "The Prypiat|El Prípiat|La Pripiat|プリピャチ川",
    ],
    0,
    "The Southern Bug rises in Khmelnytskyi region and empties into the Black Sea near Mykolaiv without ever crossing an international border, unlike the Dnipro, which starts in Russia, or the Dniester, which runs through Moldova.|El Bug Meridional nace en la región de Jmelnitski y desemboca en el mar Negro cerca de Mykolaiv sin cruzar nunca una frontera internacional, a diferencia del Dniéper, que nace en Rusia, o el Dniéster, que atraviesa Moldavia.|Le Boug méridional prend sa source dans la région de Khmelnytskyï et se jette dans la mer Noire près de Mykolaïv sans jamais franchir de frontière internationale, contrairement au Dniepr, qui naît en Russie, ou au Dniestr, qui traverse la Moldavie.|南ブーフ川はフメリニツィクィイ州に源を発し、国際国境を一度もまたぐことなくミコライウ近郊で黒海に注ぐ。ロシアに水源を持つドニプロ川や、モルドヴァを貫くドニステル川とはこの点で異なる。",
  ),
  q(
    7,
    "A stone monument near the Carpathian village of Dilove marks one of several rival claims in Europe to be what?|Un monumento de piedra cerca del pueblo carpático de Dilove reclama ser, junto con otros lugares rivales de Europa, ¿qué?|Un monument de pierre près du village carpatique de Dilove revendique, avec d'autres lieux rivaux d'Europe, quel titre ?|カルパチアの村ジロヴェ近くの石碑は、ヨーロッパ内で複数の候補地が名乗り合う何の一つとされているか?",
    [
      "The geographic centre of Europe|El centro geográfico de Europa|Le centre géographique de l'Europe|ヨーロッパの地理的中心地",
      "The highest inhabited village in Europe|El pueblo habitado más alto de Europa|Le village habité le plus haut d'Europe|ヨーロッパで最も標高の高い定住集落",
      "The source of the Danube|El nacimiento del Danubio|La source du Danube|ドナウ川の水源",
    ],
    0,
    "The marker was placed in 1887 by Austro-Hungarian surveyors using the calculation methods of the day, and at least half a dozen other towns across Europe make the same claim using different methods, so none is treated as definitive.|El mojón lo colocaron en 1887 topógrafos austrohúngaros con los métodos de cálculo de la época, y al menos media docena de otras localidades europeas hacen la misma reivindicación con métodos distintos, así que ninguna se considera definitiva.|La borne fut posée en 1887 par des géomètres austro-hongrois selon les méthodes de calcul de l'époque, et au moins une demi-douzaine d'autres localités d'Europe revendiquent le même titre par des méthodes différentes, si bien qu'aucune n'est tenue pour définitive.|この標石は1887年、当時の測量法を用いたオーストリア=ハンガリーの測量士たちによって設置されたが、ヨーロッパには少なくとも他に半ダースほどの町が別の計算方法で同じ主張をしており、どれも決定的なものとはされていない。",
  ),
  q(
    7,
    "The iron ore mined around Kryvyi Rih comes from a geological formation known as what?|El mineral de hierro extraído en torno a Kryvyi Rih procede de una formación geológica conocida como ¿qué?|Le minerai de fer extrait autour de Kryvyi Rih provient d'une formation géologique appelée comment ?|クルィヴィイ・リーフ周辺で採掘される鉄鉱石を生む地質構造の名前は?",
    [
      "The Ukrainian Shield|El Escudo Ucraniano|Le Bouclier ukrainien|ウクライナ楯状地",
      "The Carpathian Flysch|El flysch de los Cárpatos|Le flysch carpatique|カルパチア・フリッシュ",
      "The Pontic Platform|La Plataforma Póntica|La Plate-forme pontique|ポントス台地",
    ],
    0,
    "The Ukrainian Shield is a slab of ancient crystalline rock exposed across the country's centre, and the iron-rich bands within it around Kryvyi Rih make the area one of the largest iron ore basins on the planet.|El Escudo Ucraniano es una losa de roca cristalina antigua que aflora en el centro del país, y las franjas ricas en hierro que contiene en torno a Kryvyi Rih convierten la zona en una de las mayores cuencas de mineral de hierro del planeta.|Le Bouclier ukrainien est une dalle de roche cristalline ancienne affleurant au centre du pays, et les bandes riches en fer qu'il renferme autour de Kryvyi Rih font de la région l'un des plus grands bassins de minerai de fer de la planète.|ウクライナ楯状地は国の中央部に露出する古い結晶質岩の地層で、クルィヴィイ・リーフ周辺に含まれる鉄分の豊富な層のおかげで、この一帯は地球でも屈指の鉄鉱石埋蔵地となっている。",
  ),
  q(
    8,
    "The Podilski Tovtry, a ridge running over 200 kilometres through the Podillia region, formed from what?|Los Tovtry de Podolia, una cresta de más de 200 kilómetros en la región de Podolia, ¿de qué se formaron?|Les Tovtry de Podolie, une crête de plus de 200 kilomètres traversant la région de Podolie, se sont formées à partir de quoi ?|ポジーリャ地方を200キロメートル以上にわたって走る尾根、ポジーリシキー・トヴトルィは何から形成されたか?",
    [
      "An ancient coral reef|Un antiguo arrecife de coral|Un ancien récif corallien|太古のサンゴ礁",
      "Volcanic lava flows|Coladas de lava volcánica|Des coulées de lave volcanique|火山の溶岩流",
      "A glacial moraine|Una morrena glaciar|Une moraine glaciaire|氷河のモレーン",
    ],
    0,
    "Around ten million years ago this stretch of Podillia sat under a shallow sea, and the ridge is the fossilised remains of the reef that grew there, now protected as one of Ukraine's national nature parks.|Hace unos diez millones de años, este tramo de Podolia estaba bajo un mar poco profundo, y la cresta es el resto fosilizado del arrecife que creció allí, hoy protegido como uno de los parques nacionales naturales de Ucrania.|Il y a environ dix millions d'années, cette partie de la Podolie se trouvait sous une mer peu profonde, et la crête est le vestige fossilisé du récif qui s'y est développé, aujourd'hui protégé comme l'un des parcs naturels nationaux d'Ukraine.|およそ1000万年前、ポジーリャのこの一帯は浅い海の底にあり、この尾根はそこで育ったサンゴ礁の化石化した名残である。いまはウクライナの国立自然公園のひとつとして保護されている。",
  ),
  q(
    6,
    "What is the name of the largest natural lake in the Ukrainian Carpathians, popularly called the mountains' \"eye\"?|¿Cómo se llama el mayor lago natural de los Cárpatos ucranianos, popularmente llamado el «ojo» de las montañas?|Comment s'appelle le plus grand lac naturel des Carpates ukrainiennes, surnommé l'« œil » des montagnes ?|カルパチア山脈の「瞳」とも呼ばれる、ウクライナ側カルパチアで最大の天然湖の名前は?",
    [
      "Lake Synevyr|El lago Synevyr|Le lac Synevyr|シネヴィル湖",
      "Lake Svityaz|El lago Svitiaz|Le lac Svitiaz|スヴィティャズ湖",
      "Lake Yalpuh|El lago Yalpuh|Le lac Yalpouh|ヤルプフ湖",
    ],
    0,
    "Synevyr sits at nearly 1,000 metres above sea level in Zakarpattia and gave its name to the national park around it, its clear water reflecting the surrounding spruce forest closely enough to justify the nickname.|Synevyr se encuentra a casi 1.000 metros sobre el nivel del mar en Zakarpattia y dio nombre al parque nacional que lo rodea; su agua clara refleja el bosque de abetos circundante lo bastante bien como para justificar el apodo.|Synevyr se trouve à près de 1 000 mètres d'altitude en Transcarpatie et a donné son nom au parc national qui l'entoure ; son eau limpide reflète la forêt d'épicéas environnante d'assez près pour justifier ce surnom.|シネヴィル湖はザカルパッチャ州の標高ほぼ1000メートルに位置し、周囲の国立公園にその名を与えている。透き通った水面は周りのトウヒの森を鏡のように映し、その渾名にふさわしい姿を見せる。",
  ),
  q(
    3,
    "Despite stretching wide from east to west, Ukraine officially observes how many time zones?|Pese a extenderse mucho de este a oeste, ¿cuántas zonas horarias observa oficialmente Ucrania?|Bien qu'elle s'étende largement d'est en ouest, combien de fuseaux horaires l'Ukraine observe-t-elle officiellement ?|東西に幅広く広がるものの、ウクライナが公式に採用している標準時は何個か?",
    [
      "One|Una|Un|1個",
      "Two|Dos|Deux|2個",
      "Three|Tres|Trois|3個",
    ],
    0,
    "The whole country keeps a single time, Eastern European Time, even though the sun reaches its highest point in Lviv in the far west roughly half an hour later than it does in Luhansk region in the east.|Todo el país mantiene una sola hora, el horario de Europa Oriental, aunque el sol alcanza su punto más alto en Lviv, en el extremo oeste, casi media hora más tarde que en la región de Luhansk, en el este.|Tout le pays observe une seule heure, l'heure d'Europe de l'Est, bien que le soleil atteigne son point le plus haut à Lviv, à l'extrême ouest, près d'une demi-heure plus tard qu'en région de Louhansk, à l'est.|国土全体が単一の東ヨーロッパ時間を採用しており、太陽が南中する時刻は、西端のリヴィウのほうが東部のルハンシク州よりおよそ30分遅い。",
  ),
  q(
    3,
    "The Ukrainian language belongs to which branch of the Slavic language family, along with Russian and Belarusian?|¿A qué rama de la familia de lenguas eslavas pertenece el ucraniano, junto con el ruso y el bielorruso?|À quelle branche de la famille des langues slaves l'ukrainien appartient-il, aux côtés du russe et du biélorusse ?|ウクライナ語はロシア語・ベラルーシ語とともに、スラヴ語族のどの分派に属するか?",
    [
      "East Slavic|Eslavo oriental|Slave oriental|東スラヴ語派",
      "South Slavic|Eslavo meridional|Slave méridional|南スラヴ語派",
      "West Slavic|Eslavo occidental|Slave occidental|西スラヴ語派",
    ],
    0,
    "The East Slavic branch also includes Rusyn, considered by some linguists a separate language and by others a Ukrainian dialect, spoken in parts of the Carpathian region and neighbouring countries.|La rama eslava oriental incluye también el rusino, considerado por algunos lingüistas una lengua aparte y por otros un dialecto ucraniano, hablado en zonas de los Cárpatos y países vecinos.|La branche slave orientale comprend aussi le ruthène, considéré par certains linguistes comme une langue à part et par d'autres comme un dialecte ukrainien, parlé dans certaines zones des Carpates et des pays voisins.|東スラヴ語派にはルシン語も含まれる。これは一部の言語学者からは独立した言語、別の学者からはウクライナ語の方言とみなされており、カルパチア地方の一部や周辺国で話されている。",
  ),
  q(
    9,
    "Ukrainian grammar still uses a distinct vocative case for directly addressing someone by name, a case that has largely dropped out of modern Russian. What does that mean in practice?|La gramática ucraniana todavía usa un caso vocativo propio para dirigirse a alguien por su nombre, un caso que ha desaparecido en gran medida del ruso moderno. ¿Qué significa esto en la práctica?|La grammaire ukrainienne emploie encore un cas vocatif distinct pour s'adresser directement à quelqu'un par son nom, un cas largement disparu du russe moderne. Qu'est-ce que cela signifie en pratique?|ウクライナ語の文法にはいまも、名前で誰かに直接呼びかけるための独立した「呼格」がある。ロシア語の現代語ではほぼ失われたこの格は、実際には何を意味するか?",
    [
      "A name can change its ending only when it is being called out to|Un nombre puede cambiar su terminación solo cuando se lo está llamando|Un nom ne peut changer sa terminaison que lorsqu'on l'interpelle|名前は呼びかけるときだけ語尾が変わりうる",
      "A name is always written with a capital letter|Un nombre siempre se escribe con mayúscula|Un nom s'écrit toujours avec une majuscule|名前は常に大文字で書き始める",
      "A name must be shortened into a nickname|Un nombre debe acortarse en un apodo|Un nom doit être raccourci en diminutif|名前は必ず愛称に短縮しなければならない",
    ],
    0,
    "So the country's own name, \"Ukraina\", shifts to \"Ukraino\" when a poem addresses it directly, and an everyday name like Maria shifts to Mario when called across a room, a shift with no equivalent in standard modern Russian.|Así, el propio nombre del país, «Ucraína», pasa a «Ucraíno» cuando un poema se dirige a él directamente, y un nombre corriente como María pasa a María (vocativo) al llamarla de un lado a otro de una sala, un cambio sin equivalente en el ruso moderno estándar.|Ainsi, le nom même du pays, « Ukraïna », devient « Ukraïno » quand un poème s'adresse directement à lui, et un prénom courant comme Maria devient Maria (vocatif) quand on l'appelle à travers une pièce, un glissement sans équivalent en russe moderne standard.|そのため国名の「ウクライーナ」自身も、詩の中で直接呼びかけられるときには「ウクライーノ」に変わり、ふだんの名前のマリヤも部屋の向こうから呼ぶときには語尾が変化する。これは標準的な現代ロシア語には対応する仕組みがない。",
  ),
  q(
    7,
    "In 2019, the United States Board on Geographic Names formally switched its official spelling of Ukraine's capital from the Russian-based \"Kiev\" to a transliteration of the Ukrainian form. What is that spelling?|En 2019, la Junta de Nombres Geográficos de Estados Unidos cambió formalmente su ortografía oficial de la capital de Ucrania, de la forma basada en el ruso «Kiev» a una transliteración de la forma ucraniana. ¿Cuál es esa grafía?|En 2019, le Conseil américain des noms géographiques a officiellement changé l'orthographe officielle de la capitale ukrainienne, passant de la forme d'origine russe « Kiev » à une translittération de la forme ukrainienne. Quelle est cette graphie ?|2019年、アメリカ地名委員会はウクライナの首都の公式な綴りを、ロシア語形に基づく「Kiev」から、ウクライナ語形の転写に正式に切り替えた。その綴りは何か?",
    [
      "Kyiv|Kyiv|Kyiv|Kyiv",
      "Kyyiv|Kyyiv|Kyyiv|Kyyiv",
      "Kyjiv|Kyjiv|Kyjiv|Kyjiv",
    ],
    0,
    "The change followed a campaign that news organisations and airlines gradually adopted over the following years, arguing that \"Kiev\" transliterated the city's name from Russian rather than from Ukrainian itself.|El cambio siguió a una campaña que medios de comunicación y aerolíneas fueron adoptando en los años siguientes, argumentando que «Kiev» transliteraba el nombre de la ciudad desde el ruso y no desde el propio ucraniano.|Le changement fit suite à une campagne que médias et compagnies aériennes adoptèrent progressivement les années suivantes, arguant que « Kiev » translittérait le nom de la ville depuis le russe plutôt que depuis l'ukrainien lui-même.|この変更は、「Kiev」がウクライナ語ではなくロシア語から都市名を転写したものだと主張するキャンペーンを受けたもので、その後数年をかけて報道機関や航空会社にも徐々に定着していった。",
  ),
  q(
    7,
    "What is the Ukrainian term for informal speech that freely mixes Ukrainian and Russian vocabulary and grammar, common in everyday conversation in parts of the country?|¿Cómo se llama en ucraniano el habla informal que mezcla libremente vocabulario y gramática ucranianos y rusos, común en la conversación cotidiana de algunas zonas del país?|Comment appelle-t-on en ukrainien le parler informel qui mélange librement vocabulaire et grammaire ukrainiens et russes, courant dans la conversation quotidienne de certaines régions du pays?|ウクライナ語とロシア語の語彙・文法を自由に混ぜた話し言葉で、国内の一部で日常会話によく見られるものを何と呼ぶか?",
    [
      "Surzhyk|Surzhyk|Sourjyk|スールジク",
      "Trasianka|Trasianka|Trassianka|トラシャンカ",
      "Pidgin|Pidgin|Pidgin|ピジン語",
    ],
    0,
    "Surzhyk takes its name from a word for mixed-grain flour, made by grinding wheat together with rye or other grains rather than milling a single crop, and linguists treat it as a spectrum of speech rather than one fixed set of rules.|Surzhyk toma su nombre de una palabra para la harina de grano mixto, hecha moliendo trigo junto con centeno u otros cereales en vez de un solo cultivo, y los lingüistas lo tratan como un espectro de habla más que como un conjunto fijo de reglas.|Le sourjyk tire son nom d'un mot désignant une farine de céréales mélangées, obtenue en moulant du blé avec du seigle ou d'autres céréales plutôt qu'une seule culture, et les linguistes le considèrent comme un spectre de parlers plutôt qu'un ensemble figé de règles.|スールジクという名は、小麦を単独で挽くのではなくライ麦などと混ぜて挽いた「混合穀物の粉」を指す語に由来する。言語学者はこれを一つの固定した規則の体系というより、話し方の幅としてとらえている。",
  ),
  q(
    9,
    "Ukrainian spelling uses an apostrophe before certain vowels, such as in \"п'ять\" (five), a mark Russian orthography does not use the same way. What does it signal?|La ortografía ucraniana usa un apóstrofo ante ciertas vocales, como en «п'ять» (cinco), una marca que la ortografía rusa no usa del mismo modo. ¿Qué indica?|L'orthographe ukrainienne emploie une apostrophe devant certaines voyelles, comme dans « п'ять » (cinq), une marque que l'orthographe russe n'utilise pas de la même façon. Qu'indique-t-elle ?|ウクライナ語の綴りでは「п'ять」(5)のように、ある種の母音の前にアポストロフィを置く。ロシア語の正書法には同じ使い方が無いこの記号は何を示すか?",
    [
      "That the preceding consonant stays hard, not softened|Que la consonante anterior se mantiene dura, no se suaviza|Que la consonne précédente reste dure, non adoucie|直前の子音が軟音化せず硬いままであること",
      "That the word is a recent foreign borrowing|Que la palabra es un préstamo extranjero reciente|Que le mot est un emprunt étranger récent|その語が最近の外来語であること",
      "That the stress falls on the first syllable|Que el acento recae en la primera sílaba|Que l'accent tombe sur la première syllabe|アクセントが最初の音節に来ること",
    ],
    0,
    "Without the apostrophe, a consonant followed by one of these vowels would normally be read as softened, so the mark keeps a hard \"p\" sound in front of the vowel rather than letting it blend into a palatalised one.|Sin el apóstrofo, una consonante seguida de una de estas vocales se leería normalmente suavizada, así que la marca mantiene un sonido «p» duro delante de la vocal en vez de dejar que se funda en uno palatalizado.|Sans l'apostrophe, une consonne suivie de l'une de ces voyelles se lirait normalement adoucie, si bien que la marque maintient un son « p » dur devant la voyelle plutôt que de le laisser se fondre en un son palatalisé.|アポストロフィが無ければ、これらの母音の前の子音はふつう軟音として読まれる。この記号は、その子音が軟音化した音に溶け込むのを防ぎ、硬い「プ」の音のまま保つ働きをしている。",
  ),
  q(
    6,
    "The poet Lesya Ukrainka wrote under a pen name rather than her birth name, Larysa Kosach. What does that pen name literally mean?|La poeta Lesia Ukrainka escribía bajo un seudónimo y no con su nombre de nacimiento, Larysa Kosach. ¿Qué significa literalmente ese seudónimo?|La poétesse Lessia Oukraïnka écrivait sous un pseudonyme plutôt que sous son nom de naissance, Larissa Kossatch. Que signifie littéralement ce pseudonyme ?|詩人レーシャ・ウクライーンカは、本名のラリーサ・コサチではなくペンネームで作品を発表した。このペンネームの文字どおりの意味は何か?",
    [
      "Ukrainian woman|Mujer ucraniana|Femme ukrainienne|ウクライナの女",
      "Daughter of the Dnipro|Hija del Dniéper|Fille du Dniepr|ドニプロの娘",
      "Voice of the steppe|Voz de la estepa|Voix de la steppe|草原の声",
    ],
    0,
    "She began publishing under the name as a teenager in the 1880s, when using Ukrainian for serious literature was politically fraught under Russian imperial rule, and the plainness of the name doubled as a quiet statement of identity.|Empezó a publicar con ese nombre siendo adolescente en la década de 1880, cuando usar el ucraniano en literatura seria era políticamente delicado bajo el dominio imperial ruso, y la sencillez del nombre servía a la vez de discreta declaración de identidad.|Elle commença à publier sous ce nom à l'adolescence, dans les années 1880, quand employer l'ukrainien pour la littérature sérieuse était politiquement délicat sous la domination impériale russe, et la simplicité du nom valait aussi discrète affirmation d'identité.|彼女は1880年代、10代のころからこの名で作品を発表し始めた。当時、ロシア帝国の支配下で本格的な文学にウクライナ語を用いることは政治的に微妙な行為であり、この飾らない名前自体が静かなアイデンティティの表明でもあった。",
  ),
  q(
    8,
    "The law code compiled under Yaroslav the Wise in 11th-century Kyivan Rus, one of the earliest written legal codes in the East Slavic world, is known by what name?|El código legal compilado bajo Yaroslav el Sabio en la Rus de Kýiv del siglo XI, uno de los primeros códigos legales escritos del mundo eslavo oriental, ¿cómo se llama?|Le code de lois compilé sous Iaroslav le Sage dans la Rus' de Kyiv du XIe siècle, l'un des premiers codes juridiques écrits du monde slave oriental, est connu sous quel nom ?|11世紀のキーウ・ルーシで賢公ヤロスラフのもとに編まれ、東スラヴ世界で最も早い成文法典のひとつとされるものは何と呼ばれるか?",
    [
      "Ruska Pravda|Rúskaia Pravda|Rouskaïa Pravda|ルースカ・プラウダ",
      "Zakon Bozhyi|Zakón Bózhi|Zakon Bojii|ザコン・ボージイ",
      "Sudebnik|Sudébnik|Soudebnik|スデブニク",
    ],
    0,
    "Ruska Pravda set out fines and compensation for crimes such as theft and assault rather than relying only on custom, and later princes kept adding to it over the following two centuries.|La Rúskaia Pravda establecía multas y compensaciones para delitos como el robo y la agresión, en vez de depender solo de la costumbre, y los príncipes posteriores siguieron ampliándola durante los dos siglos siguientes.|La Rouskaïa Pravda fixait amendes et compensations pour des délits comme le vol et les coups, plutôt que de s'en remettre à la seule coutume, et les princes suivants continuèrent à l'enrichir pendant les deux siècles suivants.|ルースカ・プラウダは、盗みや暴行といった罪について、慣習だけに頼るのではなく罰金や賠償を定めた法典で、その後2世紀にわたり歴代の公たちによって書き足されていった。",
  ),
  q(
    7,
    "In what year did Cossack hetman Bohdan Khmelnytsky launch the uprising against Polish-Lithuanian Commonwealth rule that made him a central figure in Ukrainian history?|¿En qué año lanzó el hetman cosaco Bohdán Jmelnitski el levantamiento contra el dominio de la Mancomunidad polaco-lituana que lo convirtió en una figura central de la historia ucraniana?|En quelle année l'hetman cosaque Bohdan Khmelnytsky lança-t-il le soulèvement contre la domination de la République des Deux Nations qui fit de lui une figure centrale de l'histoire ukrainienne ?|コサックのヘーチマン、ボフダン・フメリニツィクィイが、ポーランド・リトアニア共和国の支配に対する蜂起を起こし、ウクライナ史上の中心人物となったのは何年か?",
    [
      "1648|1648|1648|1648年",
      "1709|1709|1709|1709年",
      "1793|1793|1793|1793年",
    ],
    0,
    "The uprising began with victories at Zhovti Vody and Korsun and grew into a broader war that reshaped the region's borders for decades, six years before the 1654 Pereiaslav Council that later sealed his alliance with the Russian tsar.|El levantamiento comenzó con victorias en Zhovti Vody y Korsún y se convirtió en una guerra más amplia que redibujó las fronteras de la región durante décadas, seis años antes del Consejo de Pereyáslav de 1654 que después selló su alianza con el zar ruso.|Le soulèvement commença par des victoires à Jovti Vody et Korsun et se mua en une guerre plus vaste qui redessina les frontières de la région pendant des décennies, six ans avant le Conseil de Pereïaslav de 1654 qui scella plus tard son alliance avec le tsar russe.|この蜂起はジョウティ・ヴォディとコルスンでの勝利から始まり、その後数十年にわたり地域の国境を塗り替える大きな戦争へと広がった。のちにロシア皇帝との同盟を決定づけた1654年のペレヤスラウ会議より6年前のことである。",
  ),
  q(
    7,
    "The Kyiv-Mohyla Academy, one of the oldest institutions of higher learning in Eastern Europe, was founded in 1632 under whose patronage?|La Academia Mohyla de Kýiv, una de las instituciones de enseñanza superior más antiguas de Europa del Este, se fundó en 1632 bajo el patrocinio de ¿quién?|L'Académie Moguila de Kyiv, l'une des plus anciennes institutions d'enseignement supérieur d'Europe de l'Est, fut fondée en 1632 sous le patronage de qui ?|東ヨーロッパでも最古級の高等教育機関のひとつであるキーウ・モヒーラ・アカデミーは、1632年に誰の後援で設立されたか?",
    [
      "Petro Mohyla, Orthodox metropolitan of Kyiv|Petró Mohyla, metropolita ortodoxo de Kýiv|Petro Moguila, métropolite orthodoxe de Kyiv|正教会の府主教ペトロ・モヒーラ",
      "Tsar Peter I of Russia|El zar Pedro I de Rusia|Le tsar Pierre Ier de Russie|ロシア皇帝ピョートル1世",
      "Emperor Franz Joseph I of Austria|El emperador Francisco José I de Austria|L'empereur François-Joseph Ier d'Autriche|オーストリア皇帝フランツ・ヨーゼフ1世",
    ],
    0,
    "Mohyla merged an existing Kyiv brotherhood school with one run by the Kyiv Pechersk monastery, modelling the curriculum partly on Jesuit colleges of the time so Orthodox students would no longer need to study abroad to get a comparable education.|Mohyla fusionó una escuela de hermandad de Kýiv ya existente con otra dirigida por el monasterio de las Cuevas de Kýiv, inspirando el plan de estudios en parte en los colegios jesuitas de la época, para que los estudiantes ortodoxos ya no tuvieran que estudiar en el extranjero para obtener una educación comparable.|Moguila fusionna une école de confrérie de Kyiv déjà existante avec une autre tenue par le monastère des Grottes de Kyiv, calquant en partie le programme sur les collèges jésuites de l'époque, afin que les étudiants orthodoxes n'aient plus à étudier à l'étranger pour recevoir une éducation comparable.|モヒーラは既存のキーウの兄弟団学校と、ペチェールシク修道院が運営していた学校を統合し、カリキュラムの一部を当時のイエズス会系の学校を手本に組み立てた。これにより正教徒の学生は、同等の教育を受けるために外国へ留学する必要がなくなった。",
  ),
  q(
    8,
    "Historian Mykhailo Hrushevsky was elected head of the Central Rada in 1917 and went on to hold what role in the short-lived Ukrainian People's Republic?|El historiador Mykhailo Hrushevsky fue elegido jefe de la Rada Central en 1917 y pasó a ocupar ¿qué cargo en la efímera República Popular Ucraniana?|L'historien Mykhaïlo Hrouchevsky fut élu chef de la Rada centrale en 1917 et occupa ensuite quel rôle dans l'éphémère République populaire ukrainienne ?|歴史家ムィハイロ・フルシェウシキーは1917年に中央ラーダの議長に選ばれ、短命に終わったウクライナ人民共和国で何の地位に就いたか?",
    [
      "Its president|Su presidente|Son président|大統領",
      "Its foreign minister|Su ministro de Exteriores|Son ministre des Affaires étrangères|外務大臣",
      "Commander of its army|Comandante de su ejército|Commandant de son armée|軍の司令官",
    ],
    0,
    "Before turning to politics, Hrushevsky had already made his name as a historian with a multi-volume history of Ukraine-Rus that argued for a continuous Ukrainian historical identity distinct from Russia's, a scholarly project that shaped how the country's history is taught today.|Antes de dedicarse a la política, Hrushevsky ya se había hecho un nombre como historiador con una historia de Ucrania-Rus en varios volúmenes que defendía una identidad histórica ucraniana continua y distinta de la rusa, un proyecto académico que moldeó cómo se enseña hoy la historia del país.|Avant de se tourner vers la politique, Hrouchevsky s'était déjà fait un nom comme historien avec une histoire d'Ukraine-Rus' en plusieurs volumes défendant une identité historique ukrainienne continue et distincte de celle de la Russie, un projet savant qui a façonné la manière dont l'histoire du pays est enseignée aujourd'hui.|政治に転じる前、フルシェウシキーはすでに『ウクライナ・ルーシ史』という多巻本の歴史書で名を上げた歴史家だった。この本はロシアとは異なる連続したウクライナの歴史的アイデンティティを論じ、今日の同国の歴史教育のあり方を形づくった学術的な仕事でもあった。",
  ),
  q(
    9,
    "On 22 January 1918, the Ukrainian Central Rada issued its Fourth Universal. What did that document declare?|El 22 de enero de 1918, la Rada Central ucraniana emitió su Cuarto Universal. ¿Qué declaraba ese documento?|Le 22 janvier 1918, la Rada centrale ukrainienne publia son Quatrième Universel. Que déclarait ce document ?|1918年1月22日、ウクライナ中央ラーダは「第四ウニヴェルサール」を発した。この文書は何を宣言したか?",
    [
      "The full independence of the Ukrainian People's Republic|La plena independencia de la República Popular Ucraniana|La pleine indépendance de la République populaire ukrainienne|ウクライナ人民共和国の完全な独立",
      "A customs union with the Russian Empire|Una unión aduanera con el Imperio ruso|Une union douanière avec l'Empire russe|ロシア帝国との関税同盟",
      "The adoption of the Julian calendar|La adopción del calendario juliano|L'adoption du calendrier julien|ユリウス暦の採用",
    ],
    0,
    "The date is still marked every year as Unity Day, since 22 January was later also chosen in 1919 for the short-lived unification of the Ukrainian People's Republic with the West Ukrainian People's Republic centred on Lviv.|La fecha aún se conmemora cada año como el Día de la Unidad, ya que el 22 de enero se eligió también después, en 1919, para la efímera unificación de la República Popular Ucraniana con la República Popular Ucraniana Occidental, centrada en Lviv.|La date est encore commémorée chaque année comme le Jour de l'unité, car le 22 janvier fut aussi choisi plus tard, en 1919, pour l'éphémère unification de la République populaire ukrainienne avec la République populaire ukrainienne occidentale, centrée sur Lviv.|この日はいまも毎年「統一の日」として祝われている。1919年、リヴィウを中心とする西ウクライナ人民共和国とウクライナ人民共和国が短期間ながら統合された際にも、同じ1月22日が選ばれたためである。",
  ),
  q(
    5,
    "On what date in 1991 did Ukraine's parliament vote to declare independence from the Soviet Union, a date now marked as Independence Day?|¿En qué fecha de 1991 votó el parlamento de Ucrania para declarar la independencia de la Unión Soviética, fecha que hoy se conmemora como el Día de la Independencia?|À quelle date de 1991 le parlement ukrainien vota-t-il pour déclarer l'indépendance vis-à-vis de l'Union soviétique, date désormais marquée comme jour de l'Indépendance ?|1991年のどの日、ウクライナ議会はソ連からの独立を宣言する採決を行い、それがいまの独立記念日となっているか?",
    [
      "24 August|24 de agosto|Le 24 août|8月24日",
      "1 December|1 de diciembre|Le 1er décembre|12月1日",
      "7 November|7 de noviembre|Le 7 novembre|11月7日",
    ],
    0,
    "The vote came just days after a failed coup attempt against Mikhail Gorbachev in Moscow, and it was then put to the public in the referendum held that December.|La votación llegó apenas días después de un intento fallido de golpe de Estado contra Mijaíl Gorbachov en Moscú, y luego se sometió a consulta pública en el referéndum celebrado ese diciembre.|Le vote intervint quelques jours à peine après une tentative de coup d'État manquée contre Mikhaïl Gorbatchev à Moscou, et fut ensuite soumis à consultation publique lors du référendum tenu ce décembre-là.|この採決はモスクワでのミハイル・ゴルバチョフに対するクーデター未遂事件のわずか数日後に行われ、その後、同年12月の国民投票にかけられた。",
  ),
  q(
    6,
    "Roughly what share of voters supported independence in Ukraine's referendum of 1 December 1991?|¿Qué proporción aproximada de votantes apoyó la independencia en el referéndum de Ucrania del 1 de diciembre de 1991?|Quelle proportion approximative des électeurs soutint l'indépendance lors du référendum ukrainien du 1er décembre 1991 ?|1991年12月1日のウクライナの国民投票で、独立を支持した票の割合はおよそどれくらいだったか?",
    [
      "More than 90 percent|Más del 90 por ciento|Plus de 90 pour cent|90パーセント超",
      "Around 60 percent|Alrededor del 60 por ciento|Environ 60 pour cent|60パーセント前後",
      "Just over 50 percent|Poco más del 50 por ciento|Un peu plus de 50 pour cent|50パーセントをわずかに超える程度",
    ],
    0,
    "Support crossed the 90 percent mark in every region that took part, including areas where opinion had been expected to be more divided, and turnout itself was also unusually high.|El apoyo superó el 90 por ciento en todas las regiones que participaron, incluidas zonas donde se esperaba una opinión más dividida, y la participación también fue inusualmente alta.|Le soutien dépassa les 90 pour cent dans toutes les régions participantes, y compris dans des zones où l'on attendait une opinion plus partagée, et la participation elle-même fut aussi exceptionnellement forte.|独立への支持は参加したすべての地域で90パーセントを超えた。世論がより割れると見られていた地域でも同様で、投票率自体も異例に高かった。",
  ),
  q(
    9,
    "Scientist Volodymyr Vernadsky, who founded the Ukrainian Academy of Sciences in 1918, is best remembered internationally for pioneering the study of what?|El científico Volodímir Vernadski, que fundó la Academia de Ciencias de Ucrania en 1918, es recordado internacionalmente sobre todo por ser pionero en el estudio de ¿qué?|Le scientifique Volodymyr Vernadsky, qui fonda l'Académie des sciences d'Ukraine en 1918, est surtout connu à l'international pour avoir été pionnier dans l'étude de quoi ?|1918年にウクライナ科学アカデミーを創設した科学者ヴォロディームィル・ヴェルナツィクィイは、国際的には主に何の研究の先駆者として記憶されているか?",
    [
      "How living matter shapes the Earth's chemistry, and the concept of the \"noosphere\"|Cómo la materia viva moldea la química de la Tierra, y el concepto de la «noosfera»|Comment la matière vivante façonne la chimie terrestre, et le concept de « noosphère »|生物が地球の化学組成を形づくる仕組みと「ノウアスフィア(理性圏)」の概念",
      "The structure of the periodic table of elements|La estructura de la tabla periódica de los elementos|La structure du tableau périodique des éléments|元素周期表の構造",
      "The mechanics of powered flight|La mecánica del vuelo propulsado|La mécanique du vol motorisé|動力飛行の力学",
    ],
    0,
    "Vernadsky's work on biogeochemistry treated the living world as a geological force in its own right, and his idea of a \"noosphere\", a sphere of human thought reshaping the planet, later influenced thinkers well beyond his own field.|El trabajo de Vernadski sobre biogeoquímica trataba al mundo vivo como una fuerza geológica por derecho propio, y su idea de una «noosfera», una esfera del pensamiento humano que remodela el planeta, influyó después en pensadores mucho más allá de su propio campo.|Les travaux de Vernadsky sur la biogéochimie traitaient le monde vivant comme une force géologique à part entière, et son idée de « noosphère », une sphère de la pensée humaine remodelant la planète, influença plus tard des penseurs bien au-delà de son propre domaine.|ヴェルナツィクィイの生物地球化学の研究は、生物界そのものを一つの地質学的な力として扱った。彼が唱えた「ノウアスフィア」――人間の思考が惑星を作り変えていく圏――という概念は、のちに彼の専門分野をはるかに超えた思想家たちにも影響を与えた。",
  ),
  q(
    8,
    "What name is given to the man-made famine of 1932–33 in Soviet Ukraine, caused by Stalinist grain requisition policies and recognised by many countries as genocide?|¿Qué nombre recibe la hambruna provocada de 1932-33 en la Ucrania soviética, causada por las políticas estalinistas de requisición de grano y reconocida por muchos países como genocidio?|Quel nom porte la famine provoquée de 1932-1933 en Ukraine soviétique, causée par les politiques staliniennes de réquisition du grain et reconnue par de nombreux pays comme un génocide ?|スターリン体制下の穀物徴発政策によって引き起こされ、多くの国が集団殺害(ジェノサイド)と認定している、1932〜33年のソヴィエト・ウクライナでの人為的飢饉は何と呼ばれるか?",
    [
      "The Holodomor|El Holodomor|L'Holodomor|ホロドモール",
      "The Great Purge|La Gran Purga|La Grande Purge|大粛清",
      "The Time of Troubles|El Período Tumultuoso|Le Temps des troubles|動乱時代",
    ],
    0,
    "The word combines the Ukrainian for \"hunger\" and \"to kill\", and the famine's death toll, estimated by historians in the millions, was for decades suppressed from official Soviet record and public discussion.|La palabra combina el ucraniano para «hambre» y «matar», y el número de muertos de la hambruna, que los historiadores estiman en millones, fue durante décadas suprimido del registro oficial soviético y del debate público.|Le mot combine l'ukrainien pour « faim » et « tuer », et le bilan humain de la famine, estimé par les historiens en plusieurs millions de morts, fut pendant des décennies supprimé des archives officielles soviétiques et du débat public.|この語はウクライナ語で「飢え」と「殺す」を意味する語を組み合わせたものである。歴史家によって数百万人規模と推定されるこの飢饉の犠牲者数は、何十年ものあいだソ連の公式記録や公の議論から伏せられていた。",
  ),
  q(
    9,
    "Ukraine's National Day of Remembrance for Holodomor victims is observed each year on which day?|¿Qué día se conmemora cada año en Ucrania el Día Nacional de Recuerdo de las víctimas del Holodomor?|Quel jour est observée chaque année en Ukraine la Journée nationale du souvenir des victimes de l'Holodomor ?|ウクライナのホロドモール犠牲者追悼の日は、毎年いつ行われるか?",
    [
      "The fourth Saturday of November|El cuarto sábado de noviembre|Le quatrième samedi de novembre|11月の第4土曜日",
      "The first Monday of October|El primer lunes de octubre|Le premier lundi d'octobre|10月の第1月曜日",
      "The last Sunday of January|El último domingo de enero|Le dernier dimanche de janvier|1月の最終日曜日",
    ],
    0,
    "Observances typically include a moment of silence in the evening and the lighting of a candle placed in a window, a gesture meant to echo the loss felt in nearly every family across the affected regions.|Los actos suelen incluir un minuto de silencio por la tarde y el encendido de una vela colocada en una ventana, un gesto que busca hacer eco de la pérdida sentida en casi todas las familias de las regiones afectadas.|Les commémorations comprennent généralement une minute de silence en soirée et l'allumage d'une bougie placée à une fenêtre, un geste censé faire écho à la perte ressentie dans presque chaque famille des régions touchées.|この日には夕方に黙祷が捧げられ、窓辺に蝋燭を灯すのが通例となっている。これは被害を受けた地域のほぼすべての家庭が味わった喪失を偲ぶ身振りである。",
  ),
  q(
    9,
    "Soprano Solomiya Krushelnytska is credited with reviving which Puccini opera in Brescia in 1904, three months after its disastrous premiere at La Scala?|A la soprano Solomiya Krushelnytska se le atribuye haber revivido en Brescia en 1904, tres meses después de su desastrosa premier en La Scala, ¿qué ópera de Puccini?|La soprano Solomiya Krouchelnytska est créditée d'avoir relancé à Brescia en 1904, trois mois après sa création désastreuse à la Scala, quel opéra de Puccini ?|ソプラノ歌手ソロミヤ・クルシェーリニツィカは、ラ・スカラ座での惨憺たる初演からわずか3か月後、1904年にブレーシャでプッチーニのどの歌劇を蘇らせたとされているか?",
    [
      "Madama Butterfly|Madama Butterfly|Madame Butterfly|蝶々夫人",
      "Tosca|Tosca|Tosca|トスカ",
      "Turandot|Turandot|Turandot|トゥーランドット",
    ],
    0,
    "Puccini revised the opera after its failure and personally asked for Krushelnytska by name for the reworked version, which succeeded well enough at Brescia to save the piece's reputation and secure its place in the repertoire.|Puccini revisó la ópera tras el fracaso y pidió personalmente a Krushelnytska por su nombre para la versión reelaborada, que triunfó lo bastante en Brescia como para salvar la reputación de la obra y asegurar su lugar en el repertorio.|Puccini révisa l'opéra après cet échec et demanda personnellement Krouchelnytska par son nom pour la version remaniée, qui triompha suffisamment à Brescia pour sauver la réputation de l'œuvre et assurer sa place au répertoire.|プッチーニは失敗後にこの歌劇を改訂し、練り直した版のために名指しでクルシェーリニツィカの出演を求めた。ブレーシャでの上演は十分な成功を収め、作品の評判を救って今日のレパートリーに残す結果となった。",
  ),
  q(
    7,
    "Painter Kazimir Malevich, born in Kyiv in 1879, founded which avant-garde art movement, best known through his 1915 painting \"Black Square\"?|El pintor Kazimir Malévich, nacido en Kýiv en 1879, fundó ¿qué movimiento artístico de vanguardia, conocido sobre todo por su cuadro de 1915 «Cuadrado negro»?|Le peintre Kazimir Malevitch, né à Kyiv en 1879, fonda quel mouvement artistique d'avant-garde, connu surtout par son tableau de 1915 « Carré noir » ?|1879年にキーウで生まれた画家カジミール・マレーヴィチが創始し、1915年の作品「黒の正方形」でよく知られる前衛芸術運動は何か?",
    [
      "Suprematism|Suprematismo|Suprématisme|シュプレマティスム",
      "Cubism|Cubismo|Cubisme|キュビスム",
      "Futurism|Futurismo|Futurisme|未来派",
    ],
    0,
    "Malevich argued that reducing painting to flat geometric shapes and a handful of colours freed art from having to represent the visible world at all, a radical position at the time that shaped abstract art for decades afterward.|Malévich sostenía que reducir la pintura a formas geométricas planas y un puñado de colores liberaba al arte de tener que representar el mundo visible, una postura radical para su época que dio forma al arte abstracto durante décadas después.|Malevitch soutenait que réduire la peinture à des formes géométriques plates et à une poignée de couleurs libérait l'art de toute obligation de représenter le monde visible, une position radicale pour l'époque qui façonna l'art abstrait pendant des décennies.|マレーヴィチは、絵画を平面的な幾何学図形とわずかな色数に還元することで、可視世界を再現する義務から芸術を解き放てると論じた。当時としては急進的なこの立場は、その後何十年にもわたり抽象芸術のあり方を方向づけた。",
  ),
  q(
    8,
    "Ilya Mechnikov, born near Kharkiv in 1845, shared the 1908 Nobel Prize in Physiology or Medicine for discovering what process?|Ilyá Méchnikov, nacido cerca de Járkov en 1845, compartió el Premio Nobel de Fisiología o Medicina de 1908 por descubrir ¿qué proceso?|Ilya Metchnikov, né près de Kharkiv en 1845, partagea le prix Nobel de physiologie ou médecine de 1908 pour avoir découvert quel processus ?|1845年にハルキウ近郊で生まれたイリヤ・メーチニコウは、何という現象を発見して1908年のノーベル生理学・医学賞を分け合ったか?",
    [
      "Phagocytosis, cells engulfing and destroying invaders|La fagocitosis, células que engullen y destruyen invasores|La phagocytose, des cellules engloutissant et détruisant des envahisseurs|食細胞作用(貪食作用)――細胞が侵入者を取り込んで破壊する仕組み",
      "The circulation of the blood|La circulación de la sangre|La circulation du sang|血液の循環",
      "Blood group compatibility|La compatibilidad de los grupos sanguíneos|La compatibilité des groupes sanguins|血液型の適合性",
    ],
    0,
    "Mechnikov noticed the process while studying starfish larvae, watching mobile cells swarm around a splinter he had inserted, and he shared the prize with Paul Ehrlich for their combined work on immunity.|Méchnikov observó el proceso estudiando larvas de estrella de mar, al ver células móviles agruparse en torno a una astilla que había insertado, y compartió el premio con Paul Ehrlich por su trabajo conjunto sobre la inmunidad.|Metchnikov remarqua ce processus en étudiant des larves d'étoile de mer, observant des cellules mobiles s'agglutiner autour d'une écharde qu'il avait insérée, et il partagea le prix avec Paul Ehrlich pour leurs travaux conjoints sur l'immunité.|メーチニコウはヒトデの幼生を研究していたときにこの現象に気づいた。刺しておいた棘の周りに動く細胞が群がる様子を観察したのである。この賞は免疫についての業績を合わせ、パウル・エールリヒと分け合った。",
  ),
  q(
    5,
    "Writer Nikolai Gogol, author of \"Sorochyntsi Fair\" and \"Evenings on a Farm Near Dikanka\", was born in 1809 in which Ukrainian region?|El escritor Nikolái Gógol, autor de «La feria de Sorochyntsi» y «Veladas en un caserío cerca de Dikanka», nació en 1809 ¿en qué región ucraniana?|L'écrivain Nicolas Gogol, auteur de « La Foire de Sorotchintsy » et des « Veillées du hameau », naquit en 1809 dans quelle région ukrainienne ?|「ソロチンツィの定期市」や「ディカーニカ近郷夜話」の作者ニコライ・ゴーゴリは、1809年にウクライナのどの地方で生まれたか?",
    [
      "Poltava region|La región de Poltava|La région de Poltava|ポルタヴァ地方",
      "Volyn region|La región de Volinia|La région de Volhynie|ヴォルィーニ地方",
      "Zakarpattia region|La región de Transcarpatia|La région de Transcarpatie|ザカルパッチャ地方",
    ],
    0,
    "Gogol grew up on his family's estate near the village of Sorochyntsi and drew heavily on the folk tales, superstitions and market fairs of the Poltava countryside for his earliest and still best-loved short stories.|Gógol se crio en la hacienda familiar cerca del pueblo de Sorochyntsi y se inspiró en gran medida en los cuentos populares, supersticiones y ferias del campo de Poltava para sus primeros relatos, aún hoy los más queridos.|Gogol grandit sur le domaine familial près du village de Sorotchintsy et puisa largement dans les contes populaires, superstitions et foires de la campagne de Poltava pour ses tout premiers récits, restés ses plus appréciés.|ゴーゴリはソロチンツィ村近くの一家の領地で育ち、初期の代表作となる短編の題材を、ポルタヴァの田舎に伝わる民話や迷信、定期市から数多く汲み取った。",
  ),
  q(
    9,
    "The term \"Executed Renaissance\" refers to which chapter of Ukrainian cultural history?|El término «Renacimiento fusilado» se refiere a ¿qué capítulo de la historia cultural ucraniana?|Le terme « Renaissance fusillée » désigne quel chapitre de l'histoire culturelle ukrainienne ?|「銃殺されたルネサンス」という語は、ウクライナ文化史のどの一章を指すか?",
    [
      "The generation of Ukrainian writers and artists of the 1920s–30s largely killed in Stalinist repression|La generación de escritores y artistas ucranianos de los años 1920-30, en su mayoría asesinados en la represión estalinista|La génération d'écrivains et d'artistes ukrainiens des années 1920-1930, en grande partie tués dans la répression stalinienne|1920〜30年代の世代のウクライナの作家・芸術家たちが、スターリン体制下の弾圧で大半を失ったこと",
      "The destruction of Kyiv's churches during the Mongol invasion|La destrucción de las iglesias de Kýiv durante la invasión mongola|La destruction des églises de Kyiv lors de l'invasion mongole|モンゴル侵攻でキーウの教会が破壊されたこと",
      "The banning of Ukrainian-language theatre under Austrian rule|La prohibición del teatro en ucraniano bajo el dominio austríaco|L'interdiction du théâtre en langue ukrainienne sous domination autrichienne|オーストリア統治下でウクライナ語演劇が禁じられたこと",
    ],
    0,
    "The label covers a wave of poets, playwrights and painters who had flourished briefly under a more tolerant early Soviet cultural policy before most were arrested, exiled or shot in the 1930s, work that in many cases went unpublished for decades afterward.|La etiqueta abarca una oleada de poetas, dramaturgos y pintores que habían florecido brevemente bajo una política cultural soviética temprana más tolerante, antes de que la mayoría fuera detenida, exiliada o fusilada en los años treinta, una obra que en muchos casos quedó sin publicar durante décadas.|L'expression désigne une vague de poètes, dramaturges et peintres qui avaient brièvement fleuri sous une politique culturelle soviétique précoce plus tolérante, avant que la plupart ne soient arrêtés, exilés ou fusillés dans les années 1930, une œuvre restée dans bien des cas inédite pendant des décennies.|この呼び名は、初期ソ連の比較的寛容だった文化政策のもとで一時花開いた詩人・劇作家・画家たちの世代を指す。その多くは1930年代に逮捕・流刑・銃殺され、残された作品は何十年も未発表のままとなった例も少なくない。",
  ),
  q(
    7,
    "The first railway line built on the territory of present-day Ukraine, opened in 1861 under Austrian rule, connected Lviv to which city?|La primera línea ferroviaria construida en el territorio de la actual Ucrania, inaugurada en 1861 bajo dominio austríaco, conectaba Lviv con ¿qué ciudad?|La première ligne de chemin de fer construite sur le territoire de l'Ukraine actuelle, ouverte en 1861 sous domination autrichienne, reliait Lviv à quelle ville ?|現在のウクライナ領内で最初に開通した鉄道路線は、1861年にオーストリア統治下でリヴィウとどの町を結んだか?",
    [
      "Przemyśl|Przemyśl|Przemyśl|プシェミシル",
      "Warsaw|Varsovia|Varsovie|ワルシャワ",
      "Bratislava|Bratislava|Bratislava|ブラチスラヴァ",
    ],
    0,
    "The line was part of the Habsburg Empire's Carl Ludwig Railway network and linked Lviv onward to Vienna, cutting a journey that had taken days by road down to a single day by train.|La línea formaba parte de la red del Ferrocarril Carlos Luis del Imperio de los Habsburgo y enlazaba Lviv con Viena, reduciendo a un solo día en tren un trayecto que por carretera llevaba días.|La ligne faisait partie du réseau du chemin de fer Charles-Louis de l'Empire des Habsbourg et reliait Lviv à Vienne, ramenant à une seule journée en train un trajet qui prenait des jours par la route.|この路線はハプスブルク帝国のカール・ルートヴィヒ鉄道網の一部で、リヴィウをさらにウィーンへとつないだ。それまで道路で何日もかかった行程が、鉄道でわずか1日に短縮された。",
  ),
  q(
    6,
    "Petrykivka, a decorative folk painting style named for a village in Dnipropetrovsk region, was added to which UNESCO list in 2013?|Petrykivka, un estilo de pintura popular decorativa que toma su nombre de un pueblo de la región de Dnipropetrovsk, ¿a qué lista de la UNESCO se incorporó en 2013?|Le petrykivka, un style de peinture populaire décorative tirant son nom d'un village de la région de Dnipropetrovsk, fut ajouté en 2013 à quelle liste de l'UNESCO ?|ドニプロペトロウシク州の村の名にちなむ装飾的な民俗絵画様式ペトルィキウカは、2013年にユネスコのどのリストに加えられたか?",
    [
      "The Representative List of the Intangible Cultural Heritage of Humanity|La Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad|La Liste représentative du patrimoine culturel immatériel de l'humanité|人類の無形文化遺産の代表的なリスト",
      "The World Heritage List|La Lista del Patrimonio Mundial|La Liste du patrimoine mondial|世界遺産リスト",
      "The Memory of the World Register|El Registro Memoria del Mundo|Le Registre Mémoire du monde|世界の記憶(記憶遺産)",
    ],
    0,
    "The style uses bold flowers, birds and fantastical foliage painted freehand in bright colours, traditionally applied straight onto the whitewashed walls of village houses before it moved onto paper, ceramics and canvas.|El estilo usa flores, pájaros y follaje fantástico pintados a mano alzada en colores vivos, tradicionalmente aplicados directamente sobre las paredes encaladas de las casas de pueblo, antes de pasar al papel, la cerámica y el lienzo.|Le style emploie fleurs, oiseaux et feuillages fantastiques peints à main levée en couleurs vives, traditionnellement appliqués directement sur les murs chaulés des maisons de village avant de passer sur papier, céramique et toile.|この様式は、大胆な花や鳥、空想的な葉飾りを鮮やかな色で手描きするもので、もともとは村の家々の白漆喰の壁に直接描かれ、のちに紙や陶器、キャンバスにも広がっていった。",
  ),
  q(
    3,
    "What are deruny, a staple of Ukrainian home cooking?|¿Qué son los deruny, un pilar de la cocina casera ucraniana?|Que sont les deruny, un pilier de la cuisine familiale ukrainienne ?|ウクライナの家庭料理の定番であるデルヌィとは何か?",
    [
      "Grated potato pancakes, fried until crisp|Tortitas de patata rallada, fritas hasta quedar crujientes|Des galettes de pomme de terre râpée, frites jusqu'à devenir croustillantes|すりおろしたジャガイモを揚げ焼きしてカリッとさせたパンケーキ",
      "Small dumplings stuffed with cherries|Pequeñas empanadillas rellenas de cerezas|Petits raviolis fourrés aux cerises|さくらんぼを詰めた小さな餃子状の菓子",
      "Skewers of grilled pork|Pinchos de cerdo a la parrilla|Brochettes de porc grillé|豚肉の串焼き",
    ],
    0,
    "Deruny are usually served with sour cream and sometimes with fried onions, mushrooms or a dollop of applesauce on the side, and the batter is often flavoured with a little grated onion mixed into the potato.|Los deruny suelen servirse con crema agria y a veces con cebolla frita, champiñones o una cucharada de compota de manzana al lado, y la masa suele llevar un poco de cebolla rallada mezclada con la patata.|Les deruny se servent généralement avec de la crème aigre et parfois avec des oignons frits, des champignons ou une cuillerée de compote de pommes en accompagnement, et la pâte est souvent relevée d'un peu d'oignon râpé mêlé à la pomme de terre.|デルヌィはふつうサワークリームを添えて出され、炒め玉ねぎやきのこ、りんごのコンポートを添えることもある。生地にはすりおろした玉ねぎを少し混ぜて風味を付けることが多い。",
  ),
  q(
    3,
    "What is paska, traditionally baked in Ukrainian households ahead of Easter?|¿Qué es la paska, tradicionalmente horneada en los hogares ucranianos antes de Pascua?|Qu'est-ce que la paska, traditionnellement cuite dans les foyers ukrainiens avant Pâques ?|ウクライナの家庭で復活祭の前に伝統的に焼かれるパスカとは何か?",
    [
      "A tall, sweet yeast bread, often topped with icing|Un pan dulce alto de levadura, a menudo cubierto con glaseado|Un grand pain briochimmons sucré, souvent nappé de glaçage|しばしば糖衣をかけた、背の高い甘いイースト菓子パン",
      "A savoury baked fish pie|Un pastel salado de pescado al horno|Une tourte salée au poisson|塩味の魚のパイ",
      "A type of smoked cheese|Un tipo de queso ahumado|Un type de fromage fumé|燻製チーズの一種",
    ],
    0,
    "Families traditionally bring their paska to church in a basket along with painted eggs and other foods to be blessed on Easter morning, after which the meal is shared once the Lenten fast has ended.|Las familias suelen llevar su paska a la iglesia en una cesta junto con huevos pintados y otros alimentos para que se bendigan la mañana de Pascua, tras lo cual la comida se comparte una vez terminado el ayuno de Cuaresma.|Les familles apportent traditionnellement leur paska à l'église dans un panier avec des œufs peints et d'autres aliments à faire bénir le matin de Pâques, après quoi le repas est partagé une fois le jeûne du Carême terminé.|各家庭は伝統的に、復活祭の朝に教会へパスカを持参し、彩色卵などとともにかごに入れて祝福を受ける。四旬節の断食が明けたあと、この食事を分かち合う。",
  ),
  q(
    6,
    "The dish known internationally as \"chicken Kyiv\" is a breaded chicken breast fried around what filling?|El plato conocido internacionalmente como «pollo a la Kýiv» es una pechuga de pollo empanada frita en torno a ¿qué relleno?|Le plat connu à l'international sous le nom de « poulet à la Kiev » est un blanc de poulet pané frit autour de quelle garniture?|国際的に「チキン・キーウ」として知られる料理は、何を詰めて衣をつけて揚げた鶏胸肉料理か?",
    [
      "A pat of seasoned butter, often with herbs|Una porción de mantequilla condimentada, a menudo con hierbas|Un morceau de beurre assaisonné, souvent aux herbes|ハーブなどで風味付けしたバターのかたまり",
      "A whole hard-boiled egg|Un huevo duro entero|Un œuf dur entier|丸ごとのゆで卵",
      "Mashed potato and bacon|Puré de patata y beicon|De la purée de pomme de terre et du bacon|マッシュポテトとベーコン",
    ],
    0,
    "Cutting into the finished cutlet is meant to release a small rush of melted butter, and its exact origin is still debated between competing Ukrainian, Russian and French culinary claims from the nineteenth and early twentieth centuries.|Al cortar la croqueta terminada debe salir un pequeño chorro de mantequilla derretida, y su origen exacto sigue debatido entre reivindicaciones culinarias ucranianas, rusas y francesas rivales de los siglos XIX y principios del XX.|Couper la côtelette terminée est censé libérer un petit jet de beurre fondu, et son origine exacte reste débattue entre des revendications culinaires ukrainiennes, russes et françaises rivales des XIXe et début du XXe siècles.|完成したカツレツに切れ込みを入れると、溶けたバターがあふれ出す仕組みになっている。その正確な起源は、19世紀から20世紀初頭にかけてのウクライナ・ロシア・フランスそれぞれの料理史上の主張が競合し、いまも決着していない。",
  ),
  q(
    4,
    "The red berry of the viburnum shrub, called kalyna, appears constantly in Ukrainian embroidery patterns and folk songs as a symbol of what?|La baya roja del arbusto de la viburnum, llamada kalyna, aparece constantemente en los motivos de bordado y las canciones populares ucranianas como símbolo de ¿qué?|La baie rouge de la viorne, appelée kalyna, apparaît sans cesse dans les motifs de broderie et les chansons populaires ukrainiennes comme symbole de quoi ?|ガマズミ(ビブルヌム)の赤い実カルィナは、ウクライナの刺繍文様や民謡に絶えず登場する。何の象徴とされているか?",
    [
      "Home and the Ukrainian homeland|El hogar y la patria ucraniana|Le foyer et la patrie ukrainienne|家庭と故郷ウクライナ",
      "Wealth and good business|La riqueza y los buenos negocios|La richesse et les bonnes affaires|富と商売繁盛",
      "Victory in battle|La victoria en la batalla|La victoire au combat|戦いにおける勝利",
    ],
    0,
    "The shrub's clusters of bright red berries stay on the branch well into winter, and its association with home and family runs deep enough that a sprig of kalyna is a common motif stitched onto vyshyvanky and painted onto pysanky alike.|Los racimos de bayas rojo brillante del arbusto permanecen en la rama hasta bien entrado el invierno, y su asociación con el hogar y la familia es tan profunda que una ramita de kalyna es un motivo habitual bordado en las vyshyvanky y pintado en las pysanky.|Les grappes de baies rouge vif de l'arbuste restent sur la branche jusqu'en plein hiver, et son association avec le foyer et la famille est si profonde qu'un brin de kalyna est un motif courant brodé sur les vychyvanky et peint sur les pysanky.|この低木の鮮やかな赤い実の房は、冬に入っても長く枝に残る。家庭や家族との結びつきは深く、カルィナの小枝はヴィシヴァンカの刺繍にもピサンカの絵付けにもよく使われる図柄である。",
  ),
  q(
    4,
    "Offering bread and salt on a decorated cloth to greet an honoured guest, a custom called khlib-sil, traditionally signals what?|Ofrecer pan y sal sobre un paño decorado para recibir a un huésped de honor, costumbre llamada khlib-sil, señala tradicionalmente ¿qué?|Offrir du pain et du sel sur un linge décoré pour accueillir un invité d'honneur, coutume appelée khlib-sil, signale traditionnellement quoi ?|飾り布の上に載せたパンと塩を、大切な客を迎える際に差し出す「フリーブ・シーリ」という習わしが伝統的に示すのは何か?",
    [
      "Warm hospitality and welcome|Cálida hospitalidad y bienvenida|Une chaleureuse hospitalité et bienvenue|温かいもてなしと歓迎",
      "A formal declaration of war|Una declaración formal de guerra|Une déclaration formelle de guerre|正式な宣戦布告",
      "A request for payment of a debt|Una solicitud de pago de una deuda|Une demande de remboursement d'une dette|借金の返済要求",
    ],
    0,
    "The guest traditionally breaks off a piece of the loaf, dips it in the salt and eats it, and the same gesture is still used today to welcome dignitaries and newlyweds alike at weddings.|El huésped tradicionalmente arranca un trozo del pan, lo moja en la sal y lo come, y el mismo gesto se sigue usando hoy para recibir tanto a dignatarios como a los recién casados en las bodas.|L'invité rompt traditionnellement un morceau du pain, le trempe dans le sel et le mange, et le même geste sert encore aujourd'hui à accueillir aussi bien des dignitaires que de jeunes mariés lors des noces.|客は伝統的に、そのパンをちぎって塩に浸し、口にする。同じ仕草はいまも、要人を迎える場でも結婚式で新郎新婦を迎える場でも変わらず用いられている。",
  ),
  q(
    6,
    "What is a vertep, traditionally performed around Christmas in Ukraine?|¿Qué es un vertep, representado tradicionalmente en Ucrania alrededor de la Navidad?|Qu'est-ce qu'un vertep, traditionnellement joué autour de Noël en Ukraine ?|ウクライナでクリスマスの時期に伝統的に上演されるヴェルテプとは何か?",
    [
      "A portable puppet theatre acting out the Nativity story|Un teatro de marionetas portátil que representa la historia de la Natividad|Un théâtre de marionnettes portatif jouant l'histoire de la Nativité|降誕の物語を演じる持ち運び式の人形劇",
      "A choir that sings only in Latin|Un coro que canta solo en latín|Une chorale qui ne chante qu'en latin|ラテン語だけで歌う聖歌隊",
      "A dish of spiced baked apples|Un plato de manzanas asadas especiadas|Un plat de pommes rôties épicées|香辛料入りの焼きりんご",
    ],
    0,
    "Performers traditionally carried a two-tiered wooden box from house to house, with Biblical figures acting out the Nativity on the upper level while comic folk characters, sometimes including a Cossack or a devil, played out satirical scenes below.|Los intérpretes tradicionalmente llevaban de casa en casa una caja de madera de dos niveles, con figuras bíblicas representando la Natividad en el piso superior mientras personajes populares cómicos, a veces un cosaco o un diablo, protagonizaban escenas satíricas abajo.|Les interprètes transportaient traditionnellement de maison en maison une boîte de bois à deux niveaux, des figures bibliques jouant la Nativité à l'étage supérieur tandis que des personnages populaires comiques, parfois un cosaque ou un diable, jouaient des scènes satiriques en dessous.|演者たちは伝統的に、二段構造の木箱を家々へ持ち運んだ。上段では聖書の登場人物が降誕の場面を演じ、下段ではコサックや悪魔なども交えた滑稽な民衆劇の登場人物が風刺的な寸劇を繰り広げた。",
  ),
  q(
    3,
    "What are nalysnyky, a common item on Ukrainian breakfast and dessert tables?|¿Qué son los nalysnyky, algo habitual en las mesas ucranianas de desayuno y postre?|Que sont les nalysnyky, courants sur les tables ukrainiennes au petit-déjeuner et au dessert ?|ウクライナの朝食やデザートの食卓によく並ぶナルィスヌィキとは何か?",
    [
      "Thin crepes rolled around a sweet or savoury filling|Crepas finas enrolladas con un relleno dulce o salado|Des crêpes fines roulées autour d'une garniture sucrée ou salée|甘い、または塩気のある具を包んで巻いた薄いクレープ",
      "Deep-fried rings of dough dusted with sugar|Anillos de masa fritos y espolvoreados con azúcar|Des anneaux de pâte frits saupoudrés de sucre|砂糖をまぶした揚げドーナツ状の輪",
      "Small dumplings boiled in broth|Pequeñas empanadillas hervidas en caldo|De petits raviolis bouillis dans un bouillon|だしで茹でた小さな餃子状の料理",
    ],
    0,
    "The most common filling is sweetened cottage cheese, sometimes with raisins, though savoury versions stuffed with mushrooms or liver are also common, and the crepe itself is thinner and more delicate than the potato-based deruny.|El relleno más común es queso fresco endulzado, a veces con pasas, aunque también son comunes las versiones saladas rellenas de champiñones o hígado, y la crepe en sí es más fina y delicada que los deruny a base de patata.|La garniture la plus courante est du fromage frais sucré, parfois avec des raisins secs, bien que des versions salées farcies aux champignons ou au foie soient aussi courantes, et la crêpe elle-même est plus fine et délicate que les deruny à base de pomme de terre.|最もよくある具は甘くしたカッテージチーズで、レーズンを加えることもあるが、きのこやレバーを詰めた塩味の版も一般的である。生地そのものはジャガイモを使うデルヌィよりも薄く繊細に仕上げる。",
  ),
  q(
    4,
    "What is kvass, a drink commonly sold from street tanks in Ukraine during summer?|¿Qué es el kvas, una bebida que se vende comúnmente en tanques callejeros en Ucrania durante el verano?|Qu'est-ce que le kvas, une boisson couramment vendue depuis des citernes de rue en Ukraine en été ?|夏にウクライナの街頭でタンク売りされることも多いクワスとは何か?",
    [
      "A mildly fermented drink usually made from rye bread|Una bebida ligeramente fermentada, generalmente hecha de pan de centeno|Une boisson légèrement fermentée, généralement à base de pain de seigle|ライ麦パンから作られることが多い、軽く発酵させた飲み物",
      "A strong distilled grain spirit|Un fuerte licor destilado de grano|Un alcool fort distillé à base de céréales|穀物から作る度数の高い蒸留酒",
      "A carbonated fruit soda invented in the 1990s|Un refresco de fruta carbonatado inventado en los años 1990|Un soda gazeux aux fruits inventé dans les années 1990|1990年代に生まれた炭酸フルーツソーダ",
    ],
    0,
    "Traditional kvass is made by fermenting soaked rye bread with yeast and a little sugar for a day or two, giving it a tangy, faintly sour taste and only a trace of alcohol, closer to a soft drink than to beer.|El kvas tradicional se hace fermentando pan de centeno remojado con levadura y un poco de azúcar durante uno o dos días, lo que le da un sabor ácido, ligeramente agrio, y solo un rastro de alcohol, más cercano a un refresco que a una cerveza.|Le kvas traditionnel se fait en faisant fermenter du pain de seigle trempé avec de la levure et un peu de sucre pendant un jour ou deux, ce qui lui donne un goût piquant, légèrement acide, et seulement une trace d'alcool, plus proche d'une boisson gazeuse que d'une bière.|伝統的なクワスは、水に浸したライ麦パンを酵母と少量の砂糖で1〜2日発酵させて作る。爽やかでかすかに酸っぱい味わいになり、アルコール分はごくわずかで、ビールというよりは清涼飲料に近い。",
  ),
  q(
    3,
    "What is the hopak, often described as Ukraine's national dance?|¿Qué es el hopak, a menudo descrito como la danza nacional de Ucrania?|Qu'est-ce que le hopak, souvent décrit comme la danse nationale de l'Ukraine ?|しばしばウクライナの国民的舞踊とされるホパークとは何か?",
    [
      "An energetic folk dance with high leaps and squatting kicks|Una danza folclórica enérgica con saltos altos y patadas en cuclillas|Une danse folklorique énergique avec des sauts hauts et des coups de pied accroupis|高く跳躍したりしゃがんで蹴りを繰り出したりする、活発な民族舞踊",
      "A slow, seated ceremonial dance for weddings only|Una danza ceremonial lenta y sentada, solo para bodas|Une danse cérémonielle lente et assise, réservée aux mariages|結婚式限定の、座ったまま行うゆったりとした儀礼舞踊",
      "A dance performed exclusively with lit candles|Una danza que se ejecuta exclusivamente con velas encendidas|Une danse exécutée exclusivement avec des bougies allumées|灯した蝋燭を持ってのみ踊る舞踊",
    ],
    0,
    "The dance grew out of Cossack traditions, where its athletic jumps and squatting kicks are said to have doubled as displays of the fitness and agility expected of a warrior, and it remains a staple of Ukrainian folk ensembles worldwide.|La danza surgió de las tradiciones cosacas, donde sus saltos atléticos y patadas en cuclillas se dice que también servían para mostrar la forma física y agilidad esperadas de un guerrero, y sigue siendo un pilar de los conjuntos folclóricos ucranianos en todo el mundo.|La danse est née des traditions cosaques, où ses sauts athlétiques et coups de pied accroupis auraient aussi servi à démontrer la forme physique et l'agilité attendues d'un guerrier, et elle reste un pilier des ensembles folkloriques ukrainiens dans le monde entier.|この舞踊はコサックの伝統から生まれたとされ、跳躍やしゃがみ蹴りの躍動的な動きは、戦士に求められる体力と敏捷さを示す意味も兼ねていたと言われる。いまも世界各地のウクライナ民族舞踊団の定番演目であり続けている。",
  ),
  q(
    6,
    "Fronted by singer Sviatoslav Vakarchuk, which band became one of the most commercially successful Ukrainian rock acts from the 1990s onward?|Liderada por el cantante Sviatoslav Vakarchuk, ¿qué banda se convirtió en uno de los grupos de rock ucranianos comercialmente más exitosos desde los años noventa?|Menée par le chanteur Sviatoslav Vakarchuk, quel groupe devint l'un des groupes de rock ukrainiens les plus populaires commercialement à partir des années 1990 ?|歌手スヴャトスラウ・ヴァカルチュークを中心に、1990年代以降で商業的に最も成功したウクライナのロックバンドのひとつとなったのはどれか?",
    [
      "Okean Elzy|Okean Elzy|Okean Elzy|オケアン・エリズィ",
      "DakhaBrakha|DakhaBrakha|DakhaBrakha|ダハブラハ",
      "Boombox|Boombox|Boombox|ブームボックス",
    ],
    0,
    "The band's name translates roughly as \"Elza's Ocean\", after a friend of the singer's, and its ballads and stadium-filling anthems have made it a fixture of Ukrainian radio for decades.|El nombre de la banda se traduce aproximadamente como «el océano de Elza», en honor a una amiga del cantante, y sus baladas e himnos que llenan estadios la han convertido en un fijo de la radio ucraniana durante décadas.|Le nom du groupe se traduit à peu près par « l'océan d'Elza », d'après une amie du chanteur, et ses ballades et hymnes qui remplissent les stades en ont fait un incontournable de la radio ukrainienne pendant des décennies.|バンド名はおおよそ「エリザの海」という意味で、歌手の友人の名にちなむ。スタジアムを埋めるアンセムやバラードの数々により、何十年にもわたりウクライナのラジオの定番であり続けている。",
  ),
  q(
    4,
    "Opened on 6 November 1960, Kyiv's metro was only the third underground rail system built in the Soviet Union, after which two cities?|Inaugurado el 6 de noviembre de 1960, el metro de Kýiv fue solo el tercer sistema ferroviario subterráneo construido en la Unión Soviética, ¿después de qué dos ciudades?|Ouvert le 6 novembre 1960, le métro de Kyiv ne fut que le troisième réseau ferroviaire souterrain construit en Union soviétique, après quelles deux villes ?|1960年11月6日に開業したキーウの地下鉄は、ソ連で三番目に作られた地下鉄網だった。どの二つの都市に次ぐものだったか?",
    [
      "Moscow and Leningrad|Moscú y Leningrado|Moscou et Léningrad|モスクワとレニングラード",
      "Tashkent and Baku|Taskent y Bakú|Tachkent et Bakou|タシケントとバクー",
      "Warsaw and Prague|Varsovia y Praga|Varsovie et Prague|ワルシャワとプラハ",
    ],
    0,
    "Moscow's system had opened in 1935 and Leningrad's in 1955, and Kyiv's early stations were built in the same heavily decorated style, with marble columns and elaborate chandeliers standard even on ordinary commuter lines.|El sistema de Moscú se había inaugurado en 1935 y el de Leningrado en 1955, y las primeras estaciones de Kýiv se construyeron en el mismo estilo profusamente decorado, con columnas de mármol y arañas de luces elaboradas incluso en líneas de cercanías corrientes.|Le réseau moscovite avait ouvert en 1935 et celui de Léningrad en 1955, et les premières stations de Kyiv furent bâties dans le même style richement décoré, colonnes de marbre et lustres élaborés étant la norme même sur des lignes de banlieue ordinaires.|モスクワの地下鉄は1935年に、レニングラードのそれは1955年に開業しており、キーウの初期の駅も同じ豪華な装飾様式で建てられた。ごく普通の通勤路線であっても大理石の柱や凝ったシャンデリアが標準的に用いられている。",
  ),
  q(
    3,
    "What are syrnyky, a popular breakfast dish across Ukraine?|¿Qué son los syrnyky, un plato de desayuno popular en toda Ucrania?|Que sont les syrnyky, un plat de petit-déjeuner populaire dans toute l'Ukraine ?|ウクライナ各地で人気の朝食料理シルヌィキとは何か?",
    [
      "Fried fritters made from farmer's cheese|Buñuelos fritos hechos de requesón|Des beignets frits à base de fromage blanc|カッテージチーズを使った揚げ焼きのフリッター",
      "Cold cucumber and yoghurt soup|Sopa fría de pepino y yogur|Une soupe froide au concombre et au yaourt|きゅうりとヨーグルトの冷製スープ",
      "Rye bread topped with pickled herring|Pan de centeno con arenque encurtido|Du pain de seigle garni de hareng mariné|ライ麦パンに酢漬けニシンをのせたもの",
    ],
    0,
    "The batter is a simple mix of farmer's cheese, egg and a little flour, pan-fried until golden and usually served with sour cream, honey or jam rather than as a savoury dish.|La masa es una mezcla sencilla de requesón, huevo y un poco de harina, frita en sartén hasta dorarse y servida normalmente con crema agria, miel o mermelada, en vez de como plato salado.|La pâte est un simple mélange de fromage blanc, d'œuf et d'un peu de farine, poêlée jusqu'à dorer et généralement servie avec de la crème aigre, du miel ou de la confiture plutôt qu'en plat salé.|生地はカッテージチーズと卵、少量の小麦粉を混ぜた単純なもので、フライパンで焼き色がつくまで焼く。塩味の料理としてではなく、サワークリームや蜂蜜、ジャムを添えて出されるのが普通である。",
  ),
  q(
    5,
    "What is makivnyk, a traditional Ukrainian sweet often served around Christmas?|¿Qué es el makivnyk, un dulce tradicional ucraniano que se sirve a menudo en Navidad?|Qu'est-ce que le makivnyk, une douceur traditionnelle ukrainienne souvent servie à Noël ?|クリスマスの時期によく供されるウクライナの伝統菓子マキウヌィクとは何か?",
    [
      "A rolled yeast bread filled with sweetened poppy seed paste|Un pan de levadura enrollado relleno de pasta de amapola endulzada|Un pain briochim roulé fourré de pâte de pavot sucrée|甘くしたケシの実のペーストを巻き込んだイースト菓子パン",
      "A clear beet and cabbage broth|Un caldo claro de remolacha y col|Un bouillon clair de betterave et de chou|透き通ったビーツとキャベツのスープ",
      "A hard candy flavoured with pine needles|Un caramelo duro con sabor a agujas de pino|Un bonbon dur aromatisé aux aiguilles de pin|松葉風味の飴",
    ],
    0,
    "The poppy seeds are ground and cooked down with sugar and sometimes honey or dried fruit into a thick, almost black paste before being rolled into the dough in a tight spiral, similar in construction to a cinnamon roll.|Las semillas de amapola se muelen y se cuecen con azúcar y a veces miel o fruta seca hasta formar una pasta espesa, casi negra, antes de enrollarla en la masa en una espiral apretada, con una construcción similar a la de un rollo de canela.|Les graines de pavot sont moulues et cuites avec du sucre et parfois du miel ou des fruits secs en une pâte épaisse, presque noire, avant d'être roulées dans la pâte en spirale serrée, une construction proche de celle d'un roulé à la cannelle.|ケシの実を挽いて砂糖、時には蜂蜜や乾燥果実と一緒に煮詰め、黒に近い濃厚なペーストにしたものを生地できつく渦巻き状に巻き込む。作り方はシナモンロールに近い。",
  ),
  q(
    5,
    "What is kholodets, a savoury dish traditionally served at Ukrainian New Year's Eve tables?|¿Qué es el kholodets, un plato salado que se sirve tradicionalmente en las mesas ucranianas de Nochevieja?|Qu'est-ce que le kholodets, un plat salé traditionnellement servi aux tables ukrainiennes du réveillon du Nouvel An ?|ウクライナの大晦日の食卓に伝統的に並ぶ塩気のある料理コロデツィとは何か?",
    [
      "Meat set in its own jellied broth|Carne cuajada en su propio caldo gelatinizado|De la viande figée dans son propre bouillon gélifié|自身の煮汁がゼリー状に固まった中に肉を閉じ込めた料理",
      "A layered honey and sour-cream cake|Un pastel de capas de miel y crema agria|Un gâteau en couches au miel et à la crème aigre|蜂蜜とサワークリームの層状ケーキ",
      "A spiced mulled fruit punch|Un ponche de fruta especiada caliente|Un punch de fruits épicés chaud|香辛料入りのホットフルーツポンチ",
    ],
    0,
    "The dish is made by simmering meat and bones for hours until the broth is rich enough in natural gelatin to set solid once chilled, and it is traditionally sliced and served cold with mustard or grated horseradish.|El plato se prepara cocinando a fuego lento carne y huesos durante horas hasta que el caldo tiene suficiente gelatina natural para cuajar al enfriarse, y tradicionalmente se corta en lonchas y se sirve frío con mostaza o rábano picante rallado.|Le plat se prépare en faisant mijoter viande et os pendant des heures jusqu'à ce que le bouillon soit assez riche en gélatine naturelle pour se figer une fois refroidi, et il est traditionnellement tranché et servi froid avec de la moutarde ou du raifort râpé.|この料理は肉と骨を何時間も煮込み、冷えると固まるほど天然のゼラチン分が濃くなったところで型に入れて作る。伝統的には薄く切り、マスタードやすりおろした西洋わさびを添えて冷たいまま食べる。",
  ),
  q(
    4,
    "Striker Andriy Shevchenko won the Ballon d'Or in 2004 while playing for which Italian club?|El delantero Andriy Shevchenko ganó el Balón de Oro en 2004 mientras jugaba en ¿qué club italiano?|L'attaquant Andriy Chevtchenko remporta le Ballon d'or en 2004 alors qu'il jouait pour quel club italien ?|フォワードのアンドリー・シェウチェンコが2004年にバロンドールを獲得した当時に所属していたイタリアのクラブは?",
    [
      "Juventus|Juventus|Juventus|ユヴェントス",
      "AC Milan|AC Milan|AC Milan|ACミラン",
      "Inter Milan|Inter de Milán|Inter Milan|インテル・ミラノ",
    ],
    1,
    "Shevchenko later returned to Ukraine to coach the national team, leading it to the quarter-finals of Euro 2020, its best finish at a men's European Championship.|Shevchenko volvió después a Ucrania para dirigir la selección nacional, llevándola a los cuartos de final de la Eurocopa 2020, su mejor resultado en un Campeonato de Europa masculino.|Chevtchenko revint plus tard en Ukraine pour entraîner l'équipe nationale, la menant en quarts de finale de l'Euro 2020, son meilleur résultat dans un championnat d'Europe masculin.|シェウチェンコはのちにウクライナに戻り、代表チームの監督としてEURO2020を準々決勝まで導いた。これは男子欧州選手権における同国最高の成績である。",
  ),
  q(
    7,
    "Gymnast Larysa Latynina, born in Kherson, held the record for the most Olympic medals won by any athlete for nearly half a century, until it was surpassed in 2012 by whom?|La gimnasta Larisa Latýnina, nacida en Jersón, mantuvo el récord de más medallas olímpicas ganadas por un atleta durante casi medio siglo, hasta que en 2012 lo superó ¿quién?|La gymnaste Larissa Latynina, née à Kherson, détint le record du plus grand nombre de médailles olympiques remportées par un athlète pendant près d'un demi-siècle, jusqu'à ce qu'il soit dépassé en 2012 par qui ?|ヘルソン生まれの体操選手ラリーサ・ラティーニナは、あらゆる選手の中で最多となるオリンピックメダル獲得数の記録をおよそ半世紀にわたり保持していた。2012年にこれを更新したのは誰か?",
    [
      "Usain Bolt|Usain Bolt|Usain Bolt|ウサイン・ボルト",
      "Michael Phelps|Michael Phelps|Michael Phelps|マイケル・フェルプス",
      "Simone Biles|Simone Biles|Simone Biles|シモーン・バイルズ",
    ],
    1,
    "Latynina won 18 medals competing for the Soviet Union across the 1956, 1960 and 1964 Games, nine of them gold, a haul that stood as the all-time record until swimmer Michael Phelps overtook it at the London Olympics.|Latýnina ganó 18 medallas compitiendo por la Unión Soviética en los Juegos de 1956, 1960 y 1964, nueve de ellas de oro, un botín que se mantuvo como récord histórico hasta que el nadador Michael Phelps lo superó en los Juegos Olímpicos de Londres.|Latynina remporta 18 médailles en concourant pour l'Union soviétique aux Jeux de 1956, 1960 et 1964, dont neuf en or, un total qui resta le record absolu jusqu'à ce que le nageur Michael Phelps le dépasse aux Jeux olympiques de Londres.|ラティーニナはソ連代表として1956年・1960年・1964年の大会に出場し、うち金9個を含む18個のメダルを獲得した。この記録は、ロンドン五輪で競泳選手マイケル・フェルプスに抜かれるまで史上最多として残り続けた。",
  ),
  q(
    4,
    "Ukraine co-hosted the UEFA European Championship in 2012 alongside which other country?|Ucrania coorganizó la Eurocopa de la UEFA en 2012 junto a ¿qué otro país?|L'Ukraine coorganisa le Championnat d'Europe de football de l'UEFA en 2012 aux côtés de quel autre pays ?|ウクライナが2012年のUEFA欧州選手権を共催した相手国はどこか?",
    [
      "Poland|Polonia|Pologne|ポーランド",
      "Hungary|Hungría|Hongrie|ハンガリー",
      "Slovakia|Eslovaquia|Slovaquie|スロヴァキア",
    ],
    0,
    "It was the first time either country had hosted a major football tournament, and Kyiv's Olympic Stadium was rebuilt for the occasion to host the final, won that year by Spain.|Fue la primera vez que cualquiera de los dos países organizaba un gran torneo de fútbol, y el Estadio Olímpico de Kýiv se reconstruyó para la ocasión y albergó la final, ganada ese año por España.|Ce fut la première fois que l'un ou l'autre de ces pays accueillait un grand tournoi de football, et le stade olympique de Kyiv fut reconstruit pour l'occasion afin d'accueillir la finale, remportée cette année-là par l'Espagne.|両国にとって、大規模なサッカー大会を開催するのはこれが初めてだった。キーウのオリンピック・スタジアムはこの大会に合わせて改築され、決勝戦の会場となり、その年はスペインが優勝を飾った。",
  ),
  q(
    8,
    "Chess grandmaster Ruslan Ponomariov became FIDE World Chess Champion in 2002 at what was then a record-young age. About how old was he?|El gran maestro de ajedrez Ruslan Ponomariov se convirtió en Campeón Mundial de Ajedrez de la FIDE en 2002 a una edad que en su momento fue récord de juventud. ¿Aproximadamente qué edad tenía?|Le grand maître d'échecs Ruslan Ponomariov devint champion du monde d'échecs de la FIDE en 2002 à un âge alors record de précocité. Quel âge avait-il environ ?|チェスのグランドマスター、ルスラーン・ポノマリョウは2002年、当時の最年少記録でFIDE世界チェス選手権を制した。そのときの年齢はおよそ何歳だったか?",
    [
      "18|18|18|18歳",
      "25|25|25|25歳",
      "32|32|32|32歳",
    ],
    0,
    "Ponomariov beat compatriot Vasyl Ivanchuk in the final of the FIDE knockout championship, at a time when the chess world championship was split between two competing title lines that were not reunified until 2006.|Ponomariov venció a su compatriota Vasyl Ivanchuk en la final del campeonato eliminatorio de la FIDE, en un momento en que el título mundial de ajedrez estaba dividido entre dos líneas de campeonato rivales que no se reunificaron hasta 2006.|Ponomariov battit son compatriote Vasyl Ivanchuk en finale du championnat à élimination directe de la FIDE, à une époque où le titre mondial d'échecs était scindé entre deux lignées de championnat rivales, non réunifiées avant 2006.|ポノマリョウは同郷のヴァスィーリ・イヴァンチュークをFIDEのノックアウト方式選手権の決勝で破った。当時、世界チェス選手権の称号は二つの系統に分裂しており、統一されたのは2006年になってからだった。",
  ),
  q(
    4,
    "Elina Svitolina reached a career-high world ranking of number 3 in which sport?|Elina Svitolina alcanzó un ranking mundial máximo de número 3 en su carrera, ¿en qué deporte?|Elina Svitolina atteignit un classement mondial record de numéro 3 dans sa carrière dans quel sport ?|エリナ・スヴィトリーナがキャリア自己最高の世界ランキング3位に到達したスポーツは?",
    [
      "Tennis|Tenis|Tennis|テニス",
      "Golf|Golf|Golf|ゴルフ",
      "Badminton|Bádminton|Badminton|バドミントン",
    ],
    0,
    "Svitolina reached that ranking in 2017 and went on to win the season-ending WTA Finals that year, becoming the first Ukrainian woman to do so.|Svitolina alcanzó ese ranking en 2017 y ese mismo año ganó las Finales de la WTA de fin de temporada, siendo la primera mujer ucraniana en lograrlo.|Svitolina atteignit ce classement en 2017 et remporta cette année-là le Masters de fin de saison de la WTA, devenant la première Ukrainienne à y parvenir.|スヴィトリーナは2017年にこの順位に到達し、同年のシーズン最終戦WTAファイナルズを制した。ウクライナ人女性としてこれを達成したのは彼女が初めてだった。",
  ),
  q(
    5,
    "In which track and field event has Yaroslava Mahuchikh set a world record?|¿En qué prueba de atletismo ha batido un récord mundial Yaroslava Mahuchikh?|Dans quelle épreuve d'athlétisme Yaroslava Mahuchikh a-t-elle établi un record du monde ?|ヤロスラヴァ・マフチークが世界記録を樹立した陸上競技の種目は?",
    [
      "High jump|Salto de altura|Saut en hauteur|走り高跳び",
      "100 metres|100 metros|100 mètres|100メートル走",
      "Javelin throw|Lanzamiento de jabalina|Lancer du javelot|やり投げ",
    ],
    0,
    "Mahuchikh set the world indoor record by clearing 2.10 metres in 2024, a height that also matched the outdoor world record standing since 1987, and she had already won the outdoor world title in 2023.|Mahuchikh estableció el récord mundial en pista cubierta al superar 2,10 metros en 2024, una altura que también igualaba el récord mundial al aire libre vigente desde 1987, y ya había ganado el título mundial al aire libre en 2023.|Mahuchikh établit le record du monde en salle en franchissant 2,10 mètres en 2024, une hauteur qui égalait aussi le record du monde en plein air en vigueur depuis 1987, et elle avait déjà remporté le titre mondial en plein air en 2023.|マフチークは2024年に2メートル10センチを跳んで室内世界記録を樹立した。この高さは1987年から続く屋外世界記録にも並ぶもので、彼女はすでに2023年の屋外世界選手権も制していた。",
  ),
  q(
    6,
    "At which Winter Olympics did Ukraine first compete as an independent nation, three years after the Soviet Union's dissolution?|¿En qué Juegos Olímpicos de Invierno compitió Ucrania por primera vez como nación independiente, tres años después de la disolución de la Unión Soviética?|À quels Jeux olympiques d'hiver l'Ukraine concourut-elle pour la première fois en tant que nation indépendante, trois ans après la dissolution de l'Union soviétique ?|ソ連解体から3年後、ウクライナが独立国として初めて出場した冬季オリンピックはどれか?",
    [
      "Albertville 1992|Albertville 1992|Albertville 1992|1992年アルベールビル大会",
      "Lillehammer 1994|Lillehammer 1994|Lillehammer 1994|1994年リレハンメル大会",
      "Nagano 1998|Nagano 1998|Nagano 1998|1998年長野大会",
    ],
    1,
    "At the 1992 Games, athletes from the former Soviet republics still competed together as a Unified Team, so Lillehammer in 1994 marked Ukraine's first appearance under its own flag at any Olympics.|En los Juegos de 1992, los atletas de las antiguas repúblicas soviéticas aún competían juntos como Equipo Unificado, así que Lillehammer en 1994 marcó la primera aparición de Ucrania bajo su propia bandera en unos Juegos Olímpicos.|Aux Jeux de 1992, les athlètes des anciennes républiques soviétiques concouraient encore ensemble sous la bannière de l'Équipe unifiée, si bien que Lillehammer en 1994 marqua la première apparition de l'Ukraine sous son propre drapeau à des Jeux olympiques.|1992年大会では、旧ソ連構成国の選手たちはまだ「統一チーム」として一緒に出場していた。そのため1994年のリレハンメル大会が、ウクライナが自国の旗のもとで初めて臨んだオリンピックとなった。",
  ),
  q(
    6,
    "Boxer Vasyl Lomachenko won two Olympic gold medals before turning professional and going on to become a world champion in how many different weight classes?|El boxeador Vasyl Lomachenko ganó dos medallas de oro olímpicas antes de pasar al profesionalismo y llegar a ser campeón del mundo en ¿cuántas categorías de peso distintas?|Le boxeur Vasyl Lomatchenko remporta deux médailles d'or olympiques avant de passer professionnel et de devenir champion du monde dans combien de catégories de poids différentes ?|ボクサーのヴァスィーリ・ロマチェンコは、プロ転向前にオリンピック金メダルを2個獲得し、プロでは何階級で世界王座を手にしたか?",
    [
      "Two|Dos|Deux|2階級",
      "Three|Tres|Trois|3階級",
      "Five|Cinco|Cinq|5階級",
    ],
    1,
    "Lomachenko won world titles at featherweight, lightweight and light welterweight, and needed only a handful of professional fights to capture his first belt, an unusually fast climb credited to his extensive amateur experience.|Lomachenko ganó títulos mundiales en peso pluma, peso ligero y superligero, y solo necesitó un puñado de combates profesionales para conseguir su primer cinturón, un ascenso inusualmente rápido atribuido a su extensa experiencia amateur.|Lomatchenko remporta des titres mondiaux en poids plume, poids léger et super-léger, et n'eut besoin que d'une poignée de combats professionnels pour décrocher sa première ceinture, une ascension inhabituellement rapide attribuée à sa vaste expérience amateur.|ロマチェンコはフェザー級、ライト級、ライトウェルター級で世界王座を獲得した。プロでの試合数はごくわずかで最初のベルトを手にしており、その異例の速さは豊富なアマチュア経験によるものとされる。",
  ),
  q(
    6,
    "The Pochaiv Lavra, one of the largest and most important Eastern Orthodox monasteries in Ukraine, is located in which region?|La Laura de Pochaiv, uno de los monasterios ortodoxos orientales más grandes e importantes de Ucrania, ¿en qué región se encuentra?|La laure de Potchaïv, l'un des plus grands et importants monastères orthodoxes orientaux d'Ukraine, se trouve dans quelle région ?|ウクライナで最大級かつ最重要とされる東方正教会の修道院、ポチャーイウ大修道院はどの地方にあるか?",
    [
      "Ternopil region|La región de Ternópil|La région de Ternopil|テルノーピリ地方",
      "Kherson region|La región de Jersón|La région de Kherson|ヘルソン地方",
      "Chernihiv region|La región de Chernígov|La région de Tchernihiv|チェルニーヒウ地方",
    ],
    0,
    "The monastery's Dormition Cathedral, built in the 1780s, sits atop a hill visible from far across the surrounding countryside, and pilgrims still come to see a stone bearing what is said to be an imprint of the Virgin Mary's footprint.|La catedral de la Dormición del monasterio, construida en la década de 1780, se alza en lo alto de una colina visible desde muy lejos por el campo circundante, y los peregrinos siguen acudiendo a ver una piedra que, se dice, lleva la huella del pie de la Virgen María.|La cathédrale de la Dormition du monastère, bâtie dans les années 1780, se dresse au sommet d'une colline visible de loin dans la campagne environnante, et les pèlerins viennent encore voir une pierre censée porter l'empreinte du pied de la Vierge Marie.|1780年代に建てられた修道院の生神女就寝大聖堂は丘の上に立ち、周囲の田園地帯から遠くまで見渡せる。巡礼者たちはいまも、聖母マリアの足跡が刻まれているとされる石を見にここを訪れる。",
  ),
  q(
    7,
    "Historically strongest in Galicia around Lviv, the Ukrainian Greek Catholic Church follows Byzantine rite traditions while remaining in communion with whom?|Con mayor arraigo histórico en Galitzia, en torno a Lviv, la Iglesia Grecocatólica Ucraniana sigue las tradiciones del rito bizantino mientras permanece en comunión con ¿quién?|Historiquement la plus forte en Galicie, autour de Lviv, l'Église gréco-catholique ukrainienne suit les traditions du rite byzantin tout en restant en communion avec qui ?|リヴィウを中心とするハーリチナ地方で歴史的に強い基盤を持つウクライナ東方カトリック教会は、ビザンツ典礼の伝統に従いながら、誰との交わりを保っているか?",
    [
      "The Pope in Rome|El papa en Roma|Le pape à Rome|ローマ教皇",
      "The Ecumenical Patriarch in Constantinople|El patriarca ecuménico de Constantinopla|Le patriarche œcuménique de Constantinople|コンスタンティノープル総主教",
      "The Patriarch of Moscow|El patriarca de Moscú|Le patriarche de Moscou|モスクワ総主教",
    ],
    0,
    "The church traces its distinct status to the 1596 Union of Brest, when part of the Orthodox hierarchy in the region agreed to recognise papal authority while keeping its own married clergy, calendar customs and Byzantine liturgy.|La iglesia remonta su estatus particular a la Unión de Brest de 1596, cuando parte de la jerarquía ortodoxa de la región aceptó reconocer la autoridad papal manteniendo su propio clero casado, costumbres de calendario y liturgia bizantina.|L'Église fait remonter son statut particulier à l'Union de Brest de 1596, quand une partie de la hiérarchie orthodoxe de la région accepta de reconnaître l'autorité papale tout en conservant son propre clergé marié, ses coutumes calendaires et sa liturgie byzantine.|この教会の独特な立場は1596年のブレスト合同にさかのぼる。この地域の正教会聖職者の一部が、既婚聖職者制度や暦の慣習、ビザンツ式典礼を保ったまま、教皇の権威を認めることに同意したのが始まりである。",
  ),
  q(
    7,
    "Ukraine's rail network uses a track gauge of 1,520 millimetres, a standard inherited from the Russian Empire and Soviet era. How does this compare with the gauge used across most of the rest of Europe?|La red ferroviaria de Ucrania usa un ancho de vía de 1.520 milímetros, un estándar heredado del Imperio ruso y la era soviética. ¿Cómo se compara con el ancho usado en la mayor parte del resto de Europa?|Le réseau ferroviaire ukrainien utilise un écartement de voie de 1 520 millimètres, une norme héritée de l'Empire russe et de l'ère soviétique. Comment cela se compare-t-il à l'écartement utilisé dans le reste de l'Europe ?|ウクライナの鉄道網は、ロシア帝国・ソ連時代から受け継いだ1520ミリメートルの軌間を使っている。これはヨーロッパの他の大半の地域で使われる軌間と比べてどうか?",
    [
      "It is wider|Es más ancho|Il est plus large|より広い",
      "It is narrower|Es más estrecho|Il est plus étroit|より狭い",
      "It is exactly the same|Es exactamente el mismo|Il est exactement le même|まったく同じ",
    ],
    0,
    "Most of continental Europe uses standard gauge at 1,435 millimetres, a gap of nearly nine centimetres that has practical consequences at Ukraine's western borders, where trains and freight must be adapted before continuing onward.|La mayor parte de la Europa continental usa el ancho estándar de 1.435 milímetros, una diferencia de casi nueve centímetros que tiene consecuencias prácticas en las fronteras occidentales de Ucrania, donde trenes y mercancías deben adaptarse antes de continuar.|La majeure partie de l'Europe continentale utilise l'écartement standard de 1 435 millimètres, un écart de près de neuf centimètres qui a des conséquences pratiques aux frontières occidentales de l'Ukraine, où trains et fret doivent être adaptés avant de poursuivre leur route.|ヨーロッパ大陸の大半は1435ミリメートルの標準軌を使っており、その差はおよそ9センチメートルにおよぶ。この差はウクライナ西部の国境で実務上の影響を及ぼしており、列車や貨物はそのまま先へ進む前に対応が必要になる。",
  ),
  q(
    8,
    "Because Ukraine's railway gauge differs from that of neighbours like Poland, Slovakia and Hungary, what typically has to happen to a passenger train crossing that border?|Como el ancho de vía de Ucrania difiere del de vecinos como Polonia, Eslovaquia y Hungría, ¿qué suele tener que pasarle a un tren de pasajeros que cruza esa frontera?|Comme l'écartement des voies ukrainiennes diffère de celui de voisins comme la Pologne, la Slovaquie et la Hongrie, que doit généralement subir un train de voyageurs franchissant cette frontière ?|ウクライナの軌間がポーランド・スロヴァキア・ハンガリーなど隣国と異なるため、その国境を越える旅客列車には通常どのような処置が必要になるか?",
    [
      "Its wheel sets (bogies) are swapped for a different gauge|Se le cambian los juegos de ruedas (boyeurs) por otros de distinto ancho|Ses essieux (bogies) sont échangés pour un autre écartement|台車(車輪の組)を別の軌間用に交換する",
      "It is weighed and repainted|Se lo pesa y se lo repinta|Il est pesé et repeint|重量を計測し、塗装し直す",
      "Its locomotive is replaced with a horse-drawn carriage|Se le cambia la locomotora por un vagón tirado por caballos|Sa locomotive est remplacée par une voiture tirée par des chevaux|機関車を馬車に交換する",
    ],
    0,
    "At border stations equipped for it, whole carriages are lifted on jacks while workers roll the old bogies out and new ones in underneath, a process that can take an hour or more but avoids passengers having to change trains entirely.|En las estaciones fronterizas equipadas para ello, se levantan los vagones enteros con gatos mientras los trabajadores retiran los boyeurs viejos y colocan otros nuevos debajo, un proceso que puede tardar una hora o más pero evita que los pasajeros tengan que cambiar de tren por completo.|Dans les gares frontalières équipées pour cela, des voitures entières sont soulevées sur des vérins pendant que des ouvriers retirent les anciens bogies pour en glisser de nouveaux dessous, un processus pouvant prendre une heure ou plus mais évitant aux voyageurs de devoir changer complètement de train.|対応設備のある国境駅では、車両ごとジャッキで持ち上げ、作業員が旧い台車を抜いて新しい軌間用の台車を差し込む。この作業には1時間以上かかることもあるが、乗客が完全に乗り換える手間は省ける。",
  ),
  q(
    7,
    "The Ukrainian Carpathians include part of a transnational UNESCO World Heritage Site protecting what kind of forest?|Los Cárpatos ucranianos incluyen parte de un sitio del Patrimonio Mundial de la UNESCO transnacional que protege ¿qué tipo de bosque?|Les Carpates ukrainiennes comprennent une partie d'un site du patrimoine mondial de l'UNESCO transnational protégeant quel type de forêt ?|ウクライナ側カルパチアは、ある種の森を保護する国境をまたぐユネスコ世界遺産の一部を含んでいる。それはどんな森か?",
    [
      "Primeval beech forest|Bosque primigenio de hayas|Forêt primaire de hêtres|原生ブナ林",
      "Cork oak woodland|Bosque de alcornoques|Forêt de chênes-lièges|コルクガシの森",
      "Mangrove swamp forest|Bosque de manglares|Forêt de mangrove|マングローブ林",
    ],
    0,
    "The site stretches across a dozen countries from the Alps to the Carpathians, and its Ukrainian sections include stands where beech trees have been left largely untouched for centuries, valued by scientists for showing what European forests looked like before large-scale logging.|El sitio se extiende por una docena de países desde los Alpes hasta los Cárpatos, y sus secciones ucranianas incluyen rodales donde las hayas han quedado prácticamente intactas durante siglos, valorados por los científicos porque muestran cómo eran los bosques europeos antes de la tala a gran escala.|Le site s'étend sur une douzaine de pays des Alpes aux Carpates, et ses sections ukrainiennes comprennent des peuplements où les hêtres sont restés largement intacts depuis des siècles, appréciés des scientifiques car ils montrent à quoi ressemblaient les forêts européennes avant l'exploitation forestière à grande échelle.|この遺産は十数か国にまたがりアルプスからカルパチアまで広がっており、ウクライナ側の区画には何世紀ものあいだほぼ手つかずのまま残されたブナの林が含まれる。大規模な伐採が始まる前のヨーロッパの森の姿を伝えるものとして科学者に重視されている。",
  ),
  q(
    6,
    "European bison, once locally extinct, have been reintroduced to forested areas of which northern Ukrainian region?|El bisonte europeo, extinguido localmente en su día, se ha reintroducido en zonas boscosas de ¿qué región del norte de Ucrania?|Le bison d'Europe, jadis disparu localement, a été réintroduit dans des zones boisées de quelle région du nord de l'Ukraine ?|かつて地域的に絶滅したヨーロッパバイソンが再導入されている、ウクライナ北部の森林地帯はどの地方か?",
    [
      "Polissia|Polesia|Polésie|ポリッシャ",
      "Podillia|Podolia|Podolie|ポジーリャ",
      "Taurida|Táurida|Tauride|タヴリーダ",
    ],
    0,
    "Small free-ranging herds now live in Polissia's forests and marshes, part of a wider European effort that has slowly rebuilt the species from a population that had dropped to a few dozen animals in zoos and reserves by the 1920s.|Pequeñas manadas en libertad viven ahora en los bosques y pantanos de Polesia, parte de un esfuerzo europeo más amplio que ha reconstruido lentamente la especie a partir de una población que había caído a unas pocas docenas de animales en zoológicos y reservas hacia los años veinte.|De petits troupeaux en liberté vivent désormais dans les forêts et marais de Polésie, dans le cadre d'un effort européen plus large qui a lentement reconstitué l'espèce à partir d'une population tombée à quelques dizaines d'animaux dans des zoos et réserves dans les années 1920.|いまはポリッシャの森や湿地に、放し飼いの小さな群れが暮らしている。これは1920年代までに動物園や保護区にわずか数十頭まで減っていた個体数を、じわじわと回復させてきたヨーロッパ規模の取り組みの一環である。",
  ),
  q(
    7,
    "A scenic canyon carved by which river along the western Ukraine–Moldova borderlands is sometimes nicknamed a \"Ukrainian Grand Canyon\"?|Un cañón escénico excavado por ¿qué río en las tierras fronterizas del oeste de Ucrania y Moldavia se apoda a veces «Gran Cañón ucraniano»?|Un canyon pittoresque creusé par quel fleuve, le long des confins occidentaux entre l'Ukraine et la Moldavie, est parfois surnommé « Grand Canyon ukrainien » ?|ウクライナ西部とモルドヴァの国境地帯を流れ、「ウクライナのグランドキャニオン」と呼ばれることもある峡谷を刻んだ川はどれか?",
    [
      "The Dniester|El Dniéster|Le Dniestr|ドニステル川",
      "The Prut|El Prut|Le Prout|プルト川",
      "The Teteriv|El Tetériv|La Teteriv|テテリウ川",
    ],
    0,
    "Cliffs along the Dniester Canyon rise up to 150 metres above the river in places, exposing layers of rock that record hundreds of millions of years of geological history, and the winding gorge is a popular route for kayaking.|Los acantilados a lo largo del cañón del Dniéster se elevan hasta 150 metros sobre el río en algunos tramos, dejando al descubierto capas de roca que registran cientos de millones de años de historia geológica, y el sinuoso desfiladero es una ruta popular para el kayak.|Les falaises le long du canyon du Dniestr s'élèvent par endroits jusqu'à 150 mètres au-dessus du fleuve, exposant des couches de roche qui témoignent de centaines de millions d'années d'histoire géologique, et les gorges sinueuses sont un parcours de kayak apprécié.|ドニステル峡谷沿いの崖は場所によって川面から150メートルの高さにまで達し、何億年もの地質学的な歴史を刻んだ岩の層が露出している。この曲がりくねった峡谷はカヤックの人気コースにもなっている。",
  ),
  q(
    9,
    "Engineer Yuri Kondratyuk, born Oleksandr Shargei in Poltava, worked out a spaceflight trajectory concept in 1919 that NASA later used for which mission?|El ingeniero Yuri Kondratiuk, nacido Oleksandr Shargei en Poltava, ideó en 1919 un concepto de trayectoria de vuelo espacial que la NASA usó después para ¿qué misión?|L'ingénieur Youri Kondratiouk, né Oleksandr Chargheï à Poltava, élabora en 1919 un concept de trajectoire de vol spatial que la NASA utilisa plus tard pour quelle mission ?|ポルタヴァでオレクサンドル・シャルゲイとして生まれた技師ユーリイ・コンドラチュークが1919年に考案した宇宙飛行の軌道理論は、のちにNASAのどの計画に用いられたか?",
    [
      "The Apollo Moon landings|Los alunizajes del Apolo|Les alunissages du programme Apollo|アポロ計画の月面着陸",
      "The Space Shuttle programme|El programa del transbordador espacial|Le programme de la navette spatiale|スペースシャトル計画",
      "The Voyager probes|Las sondas Voyager|Les sondes Voyager|ボイジャー探査機",
    ],
    0,
    "His \"lunar orbit rendezvous\" idea, worked out decades before spaceflight was possible, proposed sending only a small landing craft down to the Moon's surface while the main ship stayed in orbit, the method Apollo ultimately flew; a lunar crater now bears his name.|Su idea de «encuentro en órbita lunar», concebida décadas antes de que el vuelo espacial fuera posible, proponía enviar solo una pequeña nave de descenso a la superficie lunar mientras la nave principal permanecía en órbita, el método que finalmente usó el Apolo; un cráter lunar lleva ahora su nombre.|Son idée de « rendez-vous en orbite lunaire », élaborée des décennies avant que le vol spatial ne soit possible, proposait d'envoyer seulement un petit engin d'alunissage à la surface de la Lune tandis que le vaisseau principal restait en orbite, la méthode finalement employée par Apollo ; un cratère lunaire porte aujourd'hui son nom.|宇宙飛行がまだ実現していなかった時代に考え出された彼の「月周回ランデブー」構想は、小型の着陸船だけを月面へ降ろし、母船は軌道上にとどめるという方式を提案した。これはのちにアポロ計画が実際に採用した方法であり、月のクレーターにはいま彼の名がつけられている。",
  ),
  q(
    9,
    "Physicist and engineer Ivan Puluj, a pioneer of X-ray research in the 1880s, is also remembered for a very different achievement involving the Ukrainian language. What was it?|El físico e ingeniero Ivan Puliui, pionero de la investigación de rayos X en la década de 1880, también es recordado por un logro muy distinto relacionado con la lengua ucraniana. ¿Cuál fue?|Le physicien et ingénieur Ivan Puliouï, pionnier de la recherche sur les rayons X dans les années 1880, est aussi connu pour une réalisation très différente liée à la langue ukrainienne. Laquelle ?|1880年代にX線研究の先駆者となった物理学者・技術者イヴァン・プリューイは、ウクライナ語に関わるまったく別の業績でも知られている。それは何か?",
    [
      "Co-translating the Bible into Ukrainian|Cotraducir la Biblia al ucraniano|Avoir cotraduit la Bible en ukrainien|聖書のウクライナ語への共訳",
      "Writing the first Ukrainian dictionary|Escribir el primer diccionario ucraniano|Avoir écrit le premier dictionnaire ukrainien|最初のウクライナ語辞典の執筆",
      "Composing the national anthem|Componer el himno nacional|Avoir composé l'hymne national|国歌の作曲",
    ],
    0,
    "Puluj worked with writer Panteleimon Kulish over some two decades to produce a complete Ukrainian translation of the Bible, published in 1903, at a time when printing religious texts in Ukrainian faced restrictions within the Russian Empire.|Puliui trabajó con el escritor Panteleimón Kulish durante unas dos décadas para producir una traducción completa de la Biblia al ucraniano, publicada en 1903, en un momento en que imprimir textos religiosos en ucraniano enfrentaba restricciones dentro del Imperio ruso.|Puliouï travailla avec l'écrivain Panteleïmon Koulich pendant une vingtaine d'années pour produire une traduction complète de la Bible en ukrainien, publiée en 1903, à une époque où l'impression de textes religieux en ukrainien se heurtait à des restrictions dans l'Empire russe.|プリューイは作家パンテレイモン・クリーシュとおよそ20年をかけてウクライナ語による聖書全訳に取り組み、1903年に出版した。当時、ロシア帝国内ではウクライナ語による宗教文書の印刷には制約が課されていた。",
  ),
  q(
    9,
    "Mathematician Stepan Banach, a leading figure of interwar Lviv's mathematical circle, is said to have discussed problems for hours in an informal meeting place known as what?|El matemático Stefan Banach, figura destacada del círculo matemático de Lviv de entreguerras, dicen que discutía problemas durante horas en un lugar de reunión informal conocido como ¿qué?|Le mathématicien Stefan Banach, figure de proue du cercle mathématique de Lviv de l'entre-deux-guerres, aurait discuté de problèmes pendant des heures dans un lieu de rencontre informel appelé comment ?|両大戦間期のリヴィウの数学者集団の中心人物だった数学者ステファン・バナフは、何と呼ばれる非公式な集いの場で何時間も議論を交わしたと言われるか?",
    [
      "The Scottish Café|El Café Escocés|Le Café écossais|「スコティッシュ・カフェ」",
      "The Golden Rose|La Rosa Dorada|La Rose d'or|「金の薔薇」",
      "The Iron Gate|La Puerta de Hierro|La Porte de fer|「鉄の門」",
    ],
    0,
    "Mathematicians there jotted problems and proofs directly onto the café's marble tabletops in pencil, and to keep the results from being wiped away with the next cleaning, a dedicated notebook, later published as the Scottish Book, was kept behind the counter for them to use instead.|Los matemáticos allí anotaban problemas y demostraciones directamente sobre las mesas de mármol del café con lápiz, y para evitar que los resultados se borraran con la siguiente limpieza, se guardaba tras el mostrador un cuaderno dedicado, publicado después como el Libro Escocés, para que lo usaran en su lugar.|Les mathématiciens y notaient problèmes et démonstrations directement au crayon sur les tables de marbre du café, et pour éviter que les résultats ne soient effacés au prochain nettoyage, un cahier dédié, publié plus tard sous le nom de Cahier écossais, était gardé derrière le comptoir pour qu'ils l'utilisent à la place.|そこに集う数学者たちは、問題や証明を鉛筆でカフェの大理石のテーブルに直接書きつけた。次の清掃で消えてしまわないよう、代わりに使うための専用ノートがカウンターの奥に置かれるようになり、これはのちに「スコティッシュ・ブック」として出版された。",
  ),
  q(
    6,
    "On St Andrew's Day, 13 December, young Ukrainian women traditionally performed fortune-telling rituals to divine what?|En el día de San Andrés, el 13 de diciembre, las jóvenes ucranianas realizaban tradicionalmente rituales adivinatorios para saber ¿qué?|Le jour de la Saint-André, le 13 décembre, les jeunes Ukrainiennes accomplissaient traditionnellement des rituels de divination pour découvrir quoi ?|聖アンドリイの日である12月13日、ウクライナの若い女性たちが伝統的に占いの儀式を行って知ろうとしたのは何か?",
    [
      "Who their future husband would be|Quién sería su futuro marido|Qui serait leur futur mari|将来の夫が誰になるか",
      "How large the coming harvest would be|Cuán grande sería la próxima cosecha|Quelle serait l'ampleur de la prochaine récolte|来る収穫がどれほど豊かになるか",
      "How long the winter would last|Cuánto duraría el invierno|Combien de temps durerait l'hiver|冬がどれほど長く続くか",
    ],
    0,
    "Methods included feeding a rooster a ring of grains laid out with each grain representing a suitor, watching which pile it pecked first, or dripping melted wax into cold water and reading a husband's initial or trade from the shape it hardened into.|Los métodos incluían dar de comer a un gallo un círculo de granos, cada uno representando a un pretendiente, y ver cuál picoteaba primero, o dejar caer cera derretida en agua fría y leer la inicial o el oficio del marido en la forma en que se solidificaba.|Les méthodes incluaient nourrir un coq avec un cercle de grains, chacun représentant un prétendant, et observer lequel il picorait en premier, ou verser de la cire fondue dans de l'eau froide et lire l'initiale ou le métier du futur mari dans la forme qu'elle prenait en durcissant.|雄鶏に、それぞれ求婚者に見立てた穀粒の輪を与え、どの山から先についばむかを見る方法や、溶かした蝋を冷水に垂らして固まった形から夫となる人の頭文字や職業を読み取る方法などがあった。",
  ),
  q(
    5,
    "Ukraine's name for Palm Sunday, Verbna Nedilya, translates to \"Willow Sunday\" because worshippers traditionally bring which plant to church instead of palm fronds?|El nombre ucraniano del Domingo de Ramos, Verbna Nedilia, se traduce como «Domingo del sauce» porque los fieles tradicionalmente llevan a la iglesia ¿qué planta en vez de hojas de palma?|Le nom ukrainien du dimanche des Rameaux, Verbna Nedilia, se traduit par « dimanche du saule » car les fidèles apportent traditionnellement à l'église quelle plante à la place de palmes ?|ウクライナ語で「柳の日曜日」を意味する棕櫚の主日(パーム・サンデー)の呼び名ヴェルブナ・ネジーリャは、信者たちが棕櫚の葉の代わりに教会へ何を持っていく伝統に由来するか?",
    [
      "Pussy willow branches|Ramas de sauce con amentos|Des branches de saule marsault|ネコヤナギの枝",
      "Sunflower stalks|Tallos de girasol|Des tiges de tournesol|ひまわりの茎",
      "Wheat sheaves|Gavillas de trigo|Des gerbes de blé|麦の束",
    ],
    0,
    "Palm trees do not grow in Ukraine's climate, so early spring willow branches with their soft, furry catkins became the regional stand-in, blessed at church and then kept in the home, sometimes used to give family members a light, affectionate tap for good health.|Las palmeras no crecen en el clima de Ucrania, así que las ramas de sauce de principios de primavera, con sus suaves amentos peludos, se convirtieron en el sustituto regional, bendecidas en la iglesia y luego guardadas en casa, a veces usadas para dar a los familiares un golpecito leve y cariñoso por la salud.|Les palmiers ne poussent pas sous le climat ukrainien, si bien que les branches de saule du début du printemps, avec leurs chatons doux et duveteux, sont devenues le substitut régional, bénies à l'église puis conservées à la maison, parfois utilisées pour donner aux proches une petite tape affectueuse porte-bonheur.|ウクライナの気候ではナツメヤシは育たないため、早春に芽吹く柔らかくふわふわした穂をつける柳の枝が地域の代用品となった。教会で祝福を受けたのち家に持ち帰り、時には家族に健康を願って軽く優しく叩く仕草にも使われる。",
  ),
  q(
    6,
    "The annual Sorochyntsi Fair, held in a Poltava region village of the same name, is famous partly for being the setting of an early story by which writer?|La feria anual de Sorochyntsi, celebrada en un pueblo de la región de Poltava del mismo nombre, es famosa en parte por ser el escenario de un relato temprano de ¿qué escritor?|La foire annuelle de Sorotchintsy, tenue dans un village de la région de Poltava du même nom, est célèbre en partie pour avoir servi de cadre à un récit de jeunesse de quel écrivain ?|同名のポルタヴァ地方の村で毎年開かれるソロチンツィの定期市は、ある作家の初期作品の舞台となったことでも知られている。その作家は誰か?",
    [
      "Nikolai Gogol|Nikolái Gógol|Nicolas Gogol|ニコライ・ゴーゴリ",
      "Taras Shevchenko|Tarás Shevchenko|Taras Chevtchenko|タラス・シェウチェンコ",
      "Ivan Franko|Iván Franko|Ivan Franko|イヴァン・フランコ",
    ],
    0,
    "The fair traces its roots back centuries as a major regional trading event, and Gogol's story of the same name, full of gossip, matchmaking and a supposedly cursed red jacket, helped fix the fair's boisterous reputation in the wider popular imagination.|La feria hunde sus raíces siglos atrás como un importante evento comercial regional, y el relato homónimo de Gógol, lleno de chismes, arreglos matrimoniales y una supuesta chaqueta roja maldita, ayudó a fijar la reputación bulliciosa de la feria en el imaginario popular más amplio.|La foire plonge ses racines des siècles en arrière comme un grand événement commercial régional, et le récit homonyme de Gogol, plein de commérages, d'arrangements de mariage et d'une veste rouge censément maudite, contribua à fixer la réputation tapageuse de la foire dans l'imaginaire populaire plus large.|この定期市は地域有数の交易の場として何世紀も前にさかのぼる歴史を持つ。同名のゴーゴリの短編は、噂話や縁談、呪われた赤い上着をめぐる騒動に満ちており、この市のにぎやかな評判を広く世に知らしめる一助となった。",
  ),
  q(
    2,
    "The hryvnia, Ukraine's currency, is divided into 100 of which smaller unit?|La grivna, la moneda de Ucrania, se divide en 100 de ¿qué unidad menor?|La hryvnia, la monnaie de l'Ukraine, se divise en 100 de quelle unité plus petite ?|ウクライナの通貨フリヴニャは、何という小単位100個に分けられるか?",
    [
      "Kopiyka|Kopiyka|Kopiyka|コピイカ",
      "Groszy|Grosz|Grosz|グロシュ",
      "Stotinka|Stotinka|Stotinka|ストティンカ",
    ],
    0,
    "Coins for small kopiyka denominations were withdrawn from circulation in the 2010s as their value fell too low to be practical, and cash prices are now commonly rounded to the nearest ten kopiyky.|Las monedas de las denominaciones pequeñas de kopiyka se retiraron de circulación en la década de 2010 al caer su valor demasiado bajo para ser prácticas, y los precios en efectivo ahora suelen redondearse a los diez kopiyky más cercanos.|Les pièces des petites dénominations de kopiyky furent retirées de la circulation dans les années 2010, leur valeur étant devenue trop faible pour être pratique, et les prix en espèces sont désormais généralement arrondis à la dizaine de kopiyky la plus proche.|少額のコピイカ硬貨は2010年代、実用に耐えないほど価値が下がったため流通から回収された。いまでは現金価格は10コピイカ単位に丸められるのが一般的である。",
  ),
];
