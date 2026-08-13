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
];
