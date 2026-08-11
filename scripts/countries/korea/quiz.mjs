/**
 * 韓国のクイズ(37問)。
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
 * 都市カード(40件)が扱う具体的な事実(景福宮・華城・板門店の休戦協定・
 * ソウルの潮汐差・安東の焼酎・ヨス亀甲船など)はここでは問わない。
 * 代わりに、地理・歴史・言語・食・現代文化など、**都市カードが触れていない
 * 主題**を選んである。
 *
 * ```
 * node scripts/check-quiz.mjs korea
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
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

export const KOREA_QUIZ = [
  q(
    1,
    "What is the capital of South Korea?|¿Cuál es la capital de Corea del Sur?|Quelle est la capitale de la Corée du Sud ?|韓国の首都はどこか?",
    [
      "Seoul|Seúl|Séoul|ソウル",
      "Busan|Busan|Busan|釜山",
      "Incheon|Incheon|Incheon|仁川",
    ],
    0,
    "Seoul has been the seat of government since the Joseon dynasty founded it as its capital in 1394, and the wider metropolitan area now holds roughly half the country's entire population.|Seúl es sede de gobierno desde que la dinastía Joseon la fundó como capital en 1394, y su área metropolitana alberga hoy a casi la mitad de la población del país.|Séoul est le siège du gouvernement depuis que la dynastie Joseon en fit sa capitale en 1394, et son aire métropolitaine abrite aujourd'hui près de la moitié de la population du pays.|ソウルは、朝鮮王朝が1394年に都と定めて以来、政治の中心であり続けている。首都圏には今や全国の人口のおよそ半分が暮らす。",
  ),
  q(
    1,
    "What is the fermented cabbage dish eaten with almost every Korean meal?|¿Cuál es el plato de col fermentada que acompaña casi toda comida coreana?|Quel est le plat de chou fermenté qui accompagne presque tous les repas coréens ?|ほぼすべての食事に添えられる、白菜を発酵させた料理は?",
    [
      "Miso|Miso|Miso|味噌",
      "Kimchi|Kimchi|Kimchi|キムチ",
      "Tofu|Tofu|Tofu|豆腐",
    ],
    1,
    "Households traditionally made a year's supply in a single communal effort each November, burying the jars underground so the cold soil kept the fermentation slow and steady through winter.|Tradicionalmente las casas hacían la reserva de todo un año en un esfuerzo comunitario cada noviembre, enterrando las tinajas para que el frío del suelo mantuviera la fermentación lenta y constante.|Traditionnellement, les foyers préparaient la réserve d'une année entière lors d'un effort collectif chaque novembre, enterrant les jarres pour que le froid du sol maintienne une fermentation lente et régulière.|かつて各家庭は毎年11月、近所総出の作業で一年分をまとめて漬け、甕を地中に埋めて土の冷たさで発酵をゆっくり保った。",
  ),
  q(
    2,
    "Which continent is Korea part of?|¿A qué continente pertenece Corea?|De quel continent la Corée fait-elle partie ?|韓国が属する大陸は?",
    [
      "Europe|Europa|Europe|ヨーロッパ",
      "Oceania|Oceanía|Océanie|オセアニア",
      "Asia|Asia|Asie|アジア",
    ],
    2,
    "The Korean peninsula juts south from the Asian mainland between China and Japan, with mountains covering close to seventy percent of its land.|La península coreana se adentra hacia el sur desde el continente asiático entre China y Japón, con montañas que cubren cerca del setenta por ciento de su territorio.|La péninsule coréenne s'avance vers le sud depuis le continent asiatique, entre la Chine et le Japon, avec des montagnes couvrant près de soixante-dix pour cent de son territoire.|朝鮮半島は中国と日本のあいだでアジア大陸から南へ突き出しており、国土のおよそ7割を山地が占める。",
  ),
  q(
    2,
    "What is the traditional Korean garment with a wrapped bodice and a high-waisted, full skirt or wide trousers?|¿Cuál es la prenda tradicional coreana de corpiño cruzado y falda de talle alto o pantalón ancho?|Quel est le vêtement traditionnel coréen au corsage croisé et à la jupe taille haute ou au pantalon large ?|前身頃を打ち合わせ、腰の高い位置で結ぶ韓国の伝統衣装は?",
    [
      "Hanbok|Hanbok|Hanbok|韓服",
      "Kimono|Kimono|Kimono|着物",
      "Ao dai|Ao dai|Ao dai|アオザイ",
    ],
    0,
    "Everyday hanbok fell out of daily use over the twentieth century, but it is still worn for weddings, the first birthday celebration and the lunar new year, now often in brighter, simplified rental versions.|El hanbok cotidiano cayó en desuso a lo largo del siglo XX, pero aún se lleva en bodas, en el primer cumpleaños y en el año nuevo lunar, hoy a menudo en versiones de alquiler más simples y coloridas.|Le hanbok du quotidien est tombé en désuétude au cours du XXe siècle, mais il se porte encore aux mariages, au premier anniversaire de l'enfant et au nouvel an lunaire, souvent aujourd'hui dans des versions de location plus simples et colorées.|日常着としての韓服は20世紀のうちに廃れたが、結婚式や満一歳の誕生祝い、旧正月にはいまも着られる。近ごろは明るく簡略化されたレンタル用が主流になっている。",
  ),
  q(
    2,
    "Which country lies just across the water to Korea's east?|¿Qué país queda justo al otro lado del mar, al este de Corea?|Quel pays se trouve juste de l'autre côté de la mer, à l'est de la Corée ?|海を挟んで韓国の東にある国は?",
    [
      "The Philippines|Filipinas|Les Philippines|フィリピン",
      "Japan|Japón|Japon|日本",
      "Vietnam|Vietnam|Vietnam|ベトナム",
    ],
    1,
    "A hydrofoil ferry crosses the strait between Busan and the Japanese city of Fukuoka in about three hours, closer in travel time than many domestic train trips.|Un ferry de aerodeslizamiento cruza el estrecho entre Busan y la ciudad japonesa de Fukuoka en unas tres horas, un trayecto más corto que muchos viajes en tren dentro del país.|Un ferry à hydroptère traverse le détroit entre Busan et la ville japonaise de Fukuoka en environ trois heures, un trajet plus court que bien des voyages en train à l'intérieur du pays.|釜山と日本の福岡を結ぶ高速船は海峡をおよそ3時間で渡り、国内の列車移動より短く済むこともある。",
  ),
  q(
    3,
    "What is South Korea's highest mountain, a dormant volcano on Jeju Island?|¿Cuál es la montaña más alta de Corea del Sur, un volcán inactivo en la isla de Jeju?|Quelle est la plus haute montagne de Corée du Sud, un volcan endormi sur l'île de Jeju ?|済州島にある、韓国最高峰の休火山は?",
    [
      "Mount Jiri|Monte Jiri|Mont Jiri|智異山",
      "Mount Seorak|Monte Seorak|Mont Seorak|雪岳山",
      "Mount Halla|Monte Halla|Mont Halla|漢拏山",
    ],
    2,
    "At 1,947 metres it is tall enough to hold four distinct climate zones on its slopes, from subtropical forest at the base to alpine scrub near the crater lake at the summit.|Con 1.947 metros, es lo bastante alta para reunir en sus laderas cuatro zonas climáticas distintas, desde bosque subtropical en la base hasta matorral alpino cerca del lago del cráter en la cima.|Avec ses 1 947 mètres, elle est assez haute pour réunir sur ses flancs quatre zones climatiques distinctes, de la forêt subtropicale à la base au maquis alpin près du lac de cratère au sommet.|標高1947mのこの山は、裾野の亜熱帯林から山頂火口湖近くの高山性の低木帯まで、四つの異なる気候帯を斜面に抱えるほどの高さがある。",
  ),
  q(
    3,
    "What is the name of the Korean writing system, created rather than borrowed from another script?|¿Cómo se llama el sistema de escritura coreano, creado en vez de tomado de otra escritura?|Comment s'appelle le système d'écriture coréen, créé plutôt qu'emprunté à une autre écriture ?|他の文字を借りず独自に作られた、韓国の文字体系の名は?",
    [
      "Hangul|Hangul|Hangeul|ハングル",
      "Kanji|Kanji|Kanji|漢字",
      "Pinyin|Pinyin|Pinyin|ピンイン",
    ],
    0,
    "Each block-shaped syllable is built from a small set of letters shaped to mimic the position of the mouth and tongue used to say them, a design linguists still cite as unusually deliberate for a writing system.|Cada sílaba en forma de bloque se construye con un pequeño juego de letras cuya forma imita la posición de la boca y la lengua al pronunciarlas, un diseño que los lingüistas siguen citando como inusualmente deliberado.|Chaque syllabe en forme de bloc est bâtie à partir d'un petit jeu de lettres dont la forme imite la position de la bouche et de la langue pour les prononcer, une conception que les linguistes citent encore comme inhabituellement réfléchie.|一音節ごとにまとめて書くこの文字は、発音するときの口や舌の形を写した少数の字母から組み立てられている。言語学者はいまも、文字体系としては珍しいほど意図的な設計だと評する。",
  ),
  q(
    3,
    "How many clearly distinct seasons does mainland Korea's climate have?|¿Cuántas estaciones claramente distintas tiene el clima de la Corea continental?|Combien de saisons nettement distinctes compte le climat de la Corée continentale ?|韓国本土の気候にはっきりと分かれる季節はいくつか?",
    [
      "Two|Dos|Deux|二つ",
      "Four|Cuatro|Quatre|四つ",
      "Six|Seis|Six|六つ",
    ],
    1,
    "A cold, dry winter and a hot, humid summer bracket a short spring and a short autumn, and the shift between each is sharp enough that the same week is used every year to mark the change on the calendar.|Un invierno frío y seco y un verano cálido y húmedo enmarcan una primavera y un otoño breves, y el cambio entre cada uno es tan brusco que la misma semana marca cada año el cambio en el calendario.|Un hiver froid et sec et un été chaud et humide encadrent un printemps et un automne brefs, et le passage de l'un à l'autre est assez net pour que la même semaine, chaque année, marque le changement sur le calendrier.|寒く乾いた冬と暑く湿った夏のあいだに、短い春と短い秋が挟まる。季節の変わり目は毎年ほぼ同じ週に来るほどはっきりしている。",
  ),
  q(
    4,
    "Which dynasty ruled Korea for roughly five centuries, from 1392 until 1897?|¿Qué dinastía gobernó Corea durante unos cinco siglos, de 1392 a 1897?|Quelle dynastie régna sur la Corée pendant environ cinq siècles, de 1392 à 1897 ?|1392年から1897年まで、およそ500年間続いた王朝は?",
    [
      "Goryeo|Goryeo|Goryeo|高麗",
      "Silla|Silla|Silla|新羅",
      "Joseon|Joseon|Joseon|朝鮮",
    ],
    2,
    "The dynasty's name lives on in the English word for the country's language and people, and its founding king moved the capital to what is now Seoul within two years of taking the throne.|El nombre de la dinastía perdura en la palabra que designa la lengua y el pueblo del país, y su rey fundador trasladó la capital a lo que hoy es Seúl en menos de dos años tras subir al trono.|Le nom de la dynastie perdure dans le mot désignant la langue et le peuple du pays, et son roi fondateur transféra la capitale vers l'actuelle Séoul en moins de deux ans après son accession au trône.|この王朝の名は、いまの英語で国の言葉や民族を指す語にもそのまま残っている。建国の王は即位から2年と経たずに都をいまのソウルへ移した。",
  ),
  q(
    4,
    "What do South Koreans call their own country in Korean?|¿Cómo llaman los surcoreanos a su propio país en coreano?|Comment les Sud-Coréens appellent-ils leur propre pays en coréen ?|韓国の人が自分の国を韓国語でどう呼ぶか?",
    [
      "Hanguk|Hanguk|Hanguk|ハングク(韓国)",
      "Nippon|Nippon|Nippon|日本",
      "Zhongguo|Zhongguo|Zhongguo|中国",
    ],
    0,
    "North Korea, by contrast, calls the peninsula Joseon after the last dynasty, so the two Koreas do not even agree on a shared name for the land both claim.|Corea del Norte, en cambio, llama a la península Joseon, por la última dinastía, así que las dos Coreas ni siquiera coinciden en un nombre común para la tierra que ambas reclaman.|La Corée du Nord, elle, appelle la péninsule Joseon, du nom de la dernière dynastie, si bien que les deux Corées ne s'accordent même pas sur un nom commun pour la terre qu'elles revendiquent toutes deux.|一方の北朝鮮は最後の王朝にちなみ半島を「朝鮮(チョソン)」と呼ぶ。両国は互いが領有を主張する土地の呼び名すら一致していない。",
  ),
  q(
    4,
    "Which sport did South Korea co-host the FIFA World Cup for in 2002, together with Japan?|¿En qué deporte Corea del Sur coorganizó la Copa Mundial de la FIFA en 2002, junto con Japón?|Dans quel sport la Corée du Sud a-t-elle coorganisé la Coupe du monde de la FIFA en 2002, avec le Japon ?|2002年、日本と共同で開催したワールドカップの競技は?",
    [
      "Baseball|Béisbol|Baseball|野球",
      "Football (soccer)|Fútbol|Football|サッカー",
      "Volleyball|Voleibol|Volleyball|バレーボール",
    ],
    1,
    "It was the first World Cup held in Asia and the first ever co-hosted by two nations, and the South Korean team's run to the semi-finals remains its best finish in the tournament's history.|Fue el primer Mundial celebrado en Asia y el primero coorganizado por dos naciones, y la carrera del equipo surcoreano hasta las semifinales sigue siendo su mejor resultado en la historia del torneo.|Ce fut la première Coupe du monde organisée en Asie et la première jamais coorganisée par deux nations, et le parcours de l'équipe sud-coréenne jusqu'en demi-finale reste sa meilleure performance dans l'histoire du tournoi.|アジア初開催、そして史上初の二か国共催のワールドカップだった。韓国代表が挙げた準決勝進出は、いまも同国のこの大会最高成績である。",
  ),
  q(
    4,
    "What is the traditional Korean underfloor heating system found in older homes?|¿Cuál es el sistema tradicional coreano de calefacción bajo el suelo de las casas antiguas?|Quel est le système traditionnel coréen de chauffage par le sol des maisons anciennes ?|昔ながらの韓国家屋にある、床下から暖める暖房方式の名は?",
    [
      "Kang|Kang|Kang|カン(炕)",
      "Kotatsu|Kotatsu|Kotatsu|こたつ",
      "Ondol|Ondol|Ondol|オンドル",
    ],
    2,
    "Smoke from a wood fire at one end of the house was channelled under flat stones beneath the floor before venting out a chimney at the other end, warming the whole room from below rather than the air above it.|El humo de un fuego de leña en un extremo de la casa se canalizaba bajo losas planas del suelo antes de salir por una chimenea en el otro extremo, calentando toda la sala desde abajo.|La fumée d'un feu de bois à une extrémité de la maison était canalisée sous des dalles plates du sol avant de s'échapper par une cheminée à l'autre bout, chauffant toute la pièce par le dessous.|家の片端で焚いた薪の煙を床下の平石の下に通し、反対端の煙突から抜くことで、頭上の空気ではなく部屋全体を下から温めた。",
  ),
  q(
    4,
    "What are the small side dishes—pickles, seasoned vegetables, and more—served together with a Korean meal called?|¿Cómo se llaman los pequeños platillos —encurtidos, verduras aliñadas y más— que acompañan una comida coreana?|Comment appelle-t-on les petits plats d'accompagnement — pickles, légumes assaisonnés et plus — servis avec un repas coréen ?|漬物や和え物などを取り合わせて食卓に並べる小皿料理の総称は?",
    [
      "Banchan|Banchan|Banchan|パンチャン(飯饌)",
      "Tapas|Tapas|Tapas|タパス",
      "Mezze|Meze|Mezze|メゼ",
    ],
    0,
    "A modest home meal might set out four or five kinds, while a formal restaurant table can carry a dozen or more, and refills of most of them are free and expected rather than an added charge.|Una comida casera modesta puede sacar cuatro o cinco tipos, mientras que una mesa de restaurante formal puede llevar una docena o más, y rellenar la mayoría es gratis y se da por hecho, no un cargo extra.|Un repas familial modeste peut en présenter quatre ou cinq sortes, tandis qu'une table de restaurant plus formelle peut en compter une douzaine ou plus, et les resservir est le plus souvent gratuit et attendu, non facturé en sus.|質素な家庭の食卓でも四、五種は並び、格式ある食堂では十種を超えることもある。たいていはおかわり自由で、追加料金を取られることはまずない。",
  ),
  q(
    5,
    "What is the name of South Korea's national flag, which shows a red-and-blue circle above four black trigrams?|¿Cómo se llama la bandera de Corea del Sur, con un círculo rojo y azul sobre cuatro trigramas negros?|Comment s'appelle le drapeau de la Corée du Sud, montrant un cercle rouge et bleu au-dessus de quatre trigrammes noirs ?|赤と青の円と、四隅の黒い卦を持つ韓国の国旗の名は?",
    [
      "The Stars and Stripes|Las Barras y Estrellas|La bannière étoilée|星条旗",
      "Taegukgi|Taegukgi|Taegukgi|太極旗",
      "The Five-Starred Red Flag|La Bandera Roja de las Cinco Estrellas|Le Drapeau rouge aux cinq étoiles|五星紅旗",
    ],
    1,
    "The four trigrams stand for heaven, earth, fire and water, and the central circle's swirl represents the balance of yin and yang; the design was formally adopted in 1883, though the cosmology behind it is far older.|Los cuatro trigramas representan cielo, tierra, fuego y agua, y el remolino del círculo central representa el equilibrio del yin y el yang; el diseño se adoptó formalmente en 1883, aunque la cosmología detrás es mucho más antigua.|Les quatre trigrammes représentent le ciel, la terre, le feu et l'eau, et le tourbillon du cercle central figure l'équilibre du yin et du yang ; le motif fut officiellement adopté en 1883, bien que la cosmologie qui le sous-tend soit bien plus ancienne.|四隅の卦は天・地・火・水を表し、中央の円の渦は陰陽の均衡を表す。この意匠が正式に定められたのは1883年だが、その背景にある宇宙観ははるかに古い。",
  ),
  q(
    5,
    "Which sea lies between Korea and China, to Korea's west?|¿Qué mar se encuentra entre Corea y China, al oeste de Corea?|Quelle mer se trouve entre la Corée et la Chine, à l'ouest de la Corée ?|韓国の西、中国とのあいだにある海は?",
    [
      "The Coral Sea|El mar del Coral|La mer de Corail|珊瑚海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
      "The Yellow Sea|El mar Amarillo|La mer Jaune|黄海",
    ],
    2,
    "It takes its name from pale silt carried down by Chinese rivers, which colours the shallow water enough to be visible even in satellite photographs.|Debe su nombre al limo pálido arrastrado por los ríos chinos, que tiñe el agua poco profunda lo bastante como para verse incluso en fotografías de satélite.|Elle doit son nom au limon pâle charrié par les fleuves chinois, qui teinte l'eau peu profonde au point d'être visible même sur des photographies satellite.|中国の川が運ぶ淡い色の泥が浅瀬を染めており、その色が衛星写真からも見て取れるほどであることから、この名がついた。",
  ),
  q(
    5,
    "What is South Korea's currency called?|¿Cómo se llama la moneda de Corea del Sur?|Comment s'appelle la monnaie de la Corée du Sud ?|韓国の通貨単位は?",
    [
      "Won|Won|Won|ウォン",
      "Yuan|Yuan|Yuan|元",
      "Baht|Baht|Baht|バーツ",
    ],
    0,
    "The word originally meant simply \"round\", describing the shape of the coin when it replaced older, differently shaped cash in the late nineteenth century.|La palabra significaba originalmente solo «redondo», por la forma de la moneda cuando sustituyó al dinero antiguo, de otra forma, a finales del siglo XIX.|Le mot signifiait à l'origine simplement « rond », décrivant la forme de la pièce lorsqu'elle remplaça l'ancienne monnaie, de forme différente, à la fin du XIXe siècle.|この語はもとは単に「丸い」という意味で、19世紀末に形の違う古い貨幣に取って代わったときの硬貨の形を表していた。",
  ),
  q(
    5,
    "What is the milky, lightly fizzy traditional Korean rice wine called?|¿Cómo se llama el vino de arroz tradicional coreano, lechoso y ligeramente burbujeante?|Comment s'appelle le vin de riz traditionnel coréen, laiteux et légèrement pétillant ?|白く濁り、軽い発泡性のある韓国の伝統的な米酒は?",
    [
      "Sake|Sake|Saké|日本酒",
      "Makgeolli|Makgeolli|Makgeolli|マッコリ",
      "Baijiu|Baijiu|Baijiu|白酒",
    ],
    1,
    "It was traditionally the drink of farmers, brewed unfiltered and cheap enough to share around a field at the end of a day's work, and it is still sold in the same plastic kettle-shaped bottle as decades ago.|Tradicionalmente era la bebida de los campesinos, elaborada sin filtrar y barata como para compartirla en el campo al final de la jornada, y aún se vende en la misma botella de plástico con forma de tetera que hace décadas.|C'était traditionnellement la boisson des paysans, brassée non filtrée et assez bon marché pour être partagée aux champs en fin de journée, et elle se vend encore dans la même bouteille en plastique en forme de bouilloire qu'il y a des décennies.|もとは農民の飲み物で、濾さずに造られ、一日の仕事の終わりに畑で回し飲みできるほど安かった。いまも数十年前と同じ、やかんの形をしたプラスチック容器で売られている。",
  ),
  q(
    5,
    "Which 2019 Korean film won the Academy Award for Best Picture, the first non-English-language film to do so?|¿Qué película coreana de 2019 ganó el Óscar a Mejor Película, la primera en idioma no inglés en lograrlo?|Quel film coréen de 2019 a remporté l'Oscar du meilleur film, le premier en langue non anglaise à le faire ?|2019年公開で、非英語作品として初めてアカデミー作品賞を受賞した韓国映画は?",
    [
      "Oldboy|Oldboy|Oldboy|オールドボーイ",
      "Train to Busan|Estación Zombie|Dernier train pour Busan|新感染 ファイナル・エクスプレス",
      "Parasite|Parásitos|Parasite|パラサイト 半地下の家族",
    ],
    2,
    "It won four Academy Awards at the 2020 ceremony, including best director and original screenplay, and the film's now-famous \"jjapaguri\" instant noodle dish saw a sales spike afterward.|Ganó cuatro Óscars en la ceremonia de 2020, incluidos mejor director y guion original, y el plato de fideos instantáneos «jjapaguri» que hizo famoso vio un repunte de ventas después.|Il remporta quatre Oscars lors de la cérémonie de 2020, dont ceux du meilleur réalisateur et du meilleur scénario original, et le plat de nouilles instantanées « jjapaguri » qu'il a rendu célèbre a vu ses ventes grimper ensuite.|2020年の授賞式で監督賞・脚本賞など四部門を受賞した。作中で有名になったインスタント麺料理「チャパグリ」は、公開後に売り上げが跳ね上がった。",
  ),
  q(
    6,
    "Roughly how wide is the Korean Demilitarized Zone separating North and South Korea?|¿Cuánto mide aproximadamente de ancho la Zona Desmilitarizada que separa las dos Coreas?|Quelle est la largeur approximative de la zone démilitarisée séparant les deux Corées ?|南北を隔てる非武装地帯のおよその幅は?",
    [
      "About 4 kilometres|Unos 4 kilómetros|Environ 4 kilomètres|約4キロメートル",
      "About 400 metres|Unos 400 metros|Environ 400 mètres|約400メートル",
      "About 40 kilometres|Unos 40 kilómetros|Environ 40 kilomètres|約40キロメートル",
    ],
    0,
    "It runs 2 km back from the military demarcation line on each side, and because almost nobody has been able to farm or build there since 1953, ecologists now treat it as an accidental wildlife reserve.|Se extiende 2 km hacia atrás desde la línea de demarcación militar en cada lado, y como casi nadie ha podido cultivar ni construir allí desde 1953, los ecólogos la tratan hoy como una reserva de fauna accidental.|Elle s'étend sur 2 km de part et d'autre de la ligne de démarcation militaire, et comme presque personne n'a pu y cultiver ni y construire depuis 1953, les écologistes la considèrent aujourd'hui comme une réserve naturelle accidentelle.|軍事境界線の両側へそれぞれ2kmずつ延びている。1953年以来ほとんど誰も耕作も建築もできなかったため、生態学者はいまここを思いがけずできた野生生物の楽園として扱っている。",
  ),
  q(
    6,
    "Which South Korean company is the world's largest manufacturer of smartphones and memory chips?|¿Qué empresa surcoreana es la mayor fabricante mundial de teléfonos inteligentes y chips de memoria?|Quelle entreprise sud-coréenne est le plus grand fabricant mondial de smartphones et de puces mémoire ?|世界最大のスマートフォンとメモリーチップの製造企業である韓国の会社は?",
    [
      "Sony|Sony|Sony|ソニー",
      "Samsung|Samsung|Samsung|サムスン",
      "Foxconn|Foxconn|Foxconn|フォックスコン",
    ],
    1,
    "The company began in 1938 as a small trading firm exporting dried fish, noodles and produce, decades before it made anything electronic.|La empresa comenzó en 1938 como una pequeña comercializadora que exportaba pescado seco, fideos y productos agrícolas, décadas antes de fabricar nada electrónico.|L'entreprise a débuté en 1938 comme une petite maison de négoce exportant poisson séché, nouilles et produits agricoles, des décennies avant de fabriquer quoi que ce soit d'électronique.|この会社は1938年、干物や麺、農産物を扱う小さな貿易商として始まった。電子機器を作るようになるのは、それから何十年も後のことである。",
  ),
  q(
    6,
    "What is the global spread of Korean pop culture — music, dramas, film — commonly called?|¿Cómo se llama comúnmente la expansión mundial de la cultura pop coreana —música, doramas, cine—?|Comment appelle-t-on communément l'expansion mondiale de la culture pop coréenne — musique, séries, cinéma ?|音楽・ドラマ・映画など、韓国の大衆文化が世界に広がる現象を指す語は?",
    [
      "K-Rising|K-Rising|K-Rising|Kライジング",
      "The Seoul Boom|El Boom de Seúl|Le Boom de Séoul|ソウルブーム",
      "The Korean Wave (Hallyu)|La Ola Coreana (Hallyu)|La vague coréenne (Hallyu)|韓流(ハルリュ)",
    ],
    2,
    "The term was reportedly coined by Chinese journalists in the late 1990s to describe the sudden popularity of Korean television dramas abroad, before it grew to cover music, film, food and beauty products as well.|El término fue acuñado, según se dice, por periodistas chinos a fines de los noventa para describir la súbita popularidad de los doramas coreanos en el extranjero, antes de ampliarse a música, cine, comida y cosmética.|Le terme aurait été forgé par des journalistes chinois à la fin des années 1990 pour décrire la popularité soudaine des séries télévisées coréennes à l'étranger, avant de s'étendre à la musique, au cinéma, à la cuisine et aux cosmétiques.|この語は1990年代末、韓国のテレビドラマが海外で急に人気を得たことを表すため中国の記者が作ったとされる。のちに音楽・映画・食・美容にまで意味が広がった。",
  ),
  q(
    6,
    "What is the traditional Korean strategy board game, played with black and white stones, called?|¿Cómo se llama el juego de mesa de estrategia tradicional coreano, jugado con piedras blancas y negras?|Comment s'appelle le jeu de stratégie traditionnel coréen, joué avec des pierres noires et blanches ?|白と黒の石を使う、韓国の伝統的な陣取りの盤上遊戯は?",
    [
      "Baduk|Baduk|Baduk|バドゥク(囲碁)",
      "Yut nori|Yut nori|Yunnori|ユンノリ",
      "Janggi|Janggi|Janggi|チャンギ(将棋)",
    ],
    0,
    "Known internationally by its Japanese name, go, the game is old enough that its rules have barely changed in over a thousand years, and Korea has produced some of the game's strongest modern professional players.|Conocido internacionalmente por su nombre japonés, go, el juego es tan antiguo que sus reglas apenas han cambiado en más de mil años, y Corea ha dado a algunos de los jugadores profesionales modernos más fuertes.|Connu à l'international sous son nom japonais, le go, ce jeu est si ancien que ses règles ont à peine changé en plus de mille ans, et la Corée a produit certains des plus forts joueurs professionnels modernes.|国際的には日本語名の「碁」で知られるこの遊びは、千年以上ルールがほとんど変わっていないほど古い。韓国は現代の最強のプロ棋士を何人も輩出している。",
  ),
  q(
    6,
    "About how many named islands does South Korea have?|¿Cuántas islas con nombre tiene aproximadamente Corea del Sur?|Combien d'îles nommées compte approximativement la Corée du Sud ?|韓国にはおよそいくつの名前の付いた島があるか?",
    [
      "About 30|Unas 30|Environ 30|約30",
      "More than 3,000|Más de 3.000|Plus de 3 000|3000以上",
      "About 300|Unas 300|Environ 300|約300",
    ],
    1,
    "The great majority are unpeopled rocks and islets scattered off the south and west coasts, and together they give South Korea one of the highest island counts of any country its size.|La gran mayoría son rocas e islotes deshabitados dispersos frente a las costas sur y oeste, y juntos dan a Corea del Sur uno de los mayores números de islas de cualquier país de su tamaño.|La grande majorité sont des rochers et des îlots inhabités dispersés au large des côtes sud et ouest, et ensemble ils confèrent à la Corée du Sud l'un des plus forts décomptes d'îles pour un pays de cette taille.|そのほとんどは南岸・西岸に散らばる無人の岩礁や小島である。合わせると、韓国はその国土の大きさの割に世界でも屈指の島の数を持つ国になる。",
  ),
  q(
    6,
    "Which royal palace in Seoul, distinct from Gyeongbokgung, is a UNESCO World Heritage Site famous for its \"Secret Garden\"?|¿Qué palacio real de Seúl, distinto de Gyeongbokgung, es Patrimonio de la Humanidad de la UNESCO, famoso por su «Jardín Secreto»?|Quel palais royal de Séoul, distinct de Gyeongbokgung, est site du patrimoine mondial de l'UNESCO, célèbre pour son « Jardin secret » ?|景福宮とは別に、「秘苑」で知られる世界遺産のソウルの王宮は?",
    [
      "Gyeonghuigung|Gyeonghuigung|Gyeonghuigung|慶熙宮",
      "Deoksugung|Deoksugung|Deoksugung|徳寿宮",
      "Changdeokgung|Changdeokgung|Changdeokgung|昌徳宮",
    ],
    2,
    "It was added to the World Heritage list in 1997 partly because, unlike the more formally symmetrical Gyeongbokgung, its buildings and rear garden were laid out to follow the natural contours of the hillside rather than override them.|Se incorporó a la lista de Patrimonio Mundial en 1997 en parte porque, a diferencia del más simétrico Gyeongbokgung, sus edificios y el jardín trasero se trazaron siguiendo el relieve natural de la colina en vez de imponerse a él.|Il fut inscrit au patrimoine mondial en 1997 en partie parce que, contrairement au plus symétrique Gyeongbokgung, ses bâtiments et son jardin arrière furent tracés en suivant le relief naturel de la colline plutôt qu'en s'y imposant.|1997年に世界遺産に登録された。左右対称の造りが際立つ景福宮と違い、建物や裏の庭園が丘の地形にさからわず、その起伏に沿って配置されていることも理由の一つである。",
  ),
  q(
    7,
    "What is the cold noodle dish, served in a chilled tangy broth, especially associated with the north and eaten most in summer?|¿Cómo se llama el plato de fideos fríos, servido en un caldo helado y ácido, asociado sobre todo con el norte y comido más en verano?|Comment s'appelle le plat de nouilles froides, servi dans un bouillon glacé et acidulé, surtout associé au nord et consommé davantage en été ?|冷たく酸味のあるスープで供され、北の地方と結びつき、夏によく食べられる麺料理は?",
    [
      "Naengmyeon|Naengmyeon|Naengmyeon|冷麺",
      "Pho|Pho|Pho|フォー",
      "Laksa|Laksa|Laksa|ラクサ",
    ],
    0,
    "The dish travelled south with refugees during the Korean War, and its classic broth is a mix of beef stock and the tangy brine from radish water-kimchi, a combination that gives it a sourness other noodle soups don't have.|El plato viajó al sur con los refugiados durante la guerra de Corea, y su caldo clásico mezcla consomé de ternera con la salmuera ácida del kimchi de agua de rábano, una mezcla que le da una acidez que otras sopas de fideos no tienen.|Le plat voyagea vers le sud avec les réfugiés pendant la guerre de Corée, et son bouillon classique mêle fond de bœuf et saumure acidulée du kimchi d'eau au radis, un mélange qui lui donne une acidité propre, absente des autres soupes de nouilles.|この料理は朝鮮戦争のとき難民とともに南へ伝わった。伝統的なスープは牛の出汁と大根の水キムチの酸味のある漬け汁を合わせたもので、ほかの麺スープにはない酸味を生む。",
  ),
  q(
    7,
    "What is the name of the mountain range that runs the length of Korea's eastern coast, often called the peninsula's \"backbone\"?|¿Cómo se llama la cordillera que recorre toda la costa oriental de Corea, a menudo llamada la «columna vertebral» de la península?|Comment s'appelle la chaîne de montagnes qui longe toute la côte est de la Corée, souvent appelée la « colonne vertébrale » de la péninsule ?|朝鮮半島の「背骨」とも呼ばれる、東海岸沿いに連なる山脈の名は?",
    [
      "The Ural Mountains|Los montes Urales|Les monts Oural|ウラル山脈",
      "The Taebaek Mountains|Los montes Taebaek|Les monts Taebaek|太白山脈",
      "The Atlas Mountains|El Atlas|L'Atlas|アトラス山脈",
    ],
    1,
    "Because the range sits so close to the east coast, rivers on that side are short and steep while those flowing west across the peninsula run long and slow, shaping where farmland and rice paddies could ever be laid out.|Como la cordillera está tan cerca de la costa este, los ríos de ese lado son cortos y empinados, mientras que los que fluyen al oeste cruzando la península son largos y lentos.|La chaîne étant si proche de la côte est, les rivières de ce côté sont courtes et abruptes, tandis que celles qui coulent vers l'ouest à travers la péninsule sont longues et lentes.|山脈が東海岸のすぐ近くを走るため、東側の川は短く急で、逆に半島を横切って西へ流れる川は長くゆるやかになる。この違いが、どこに田畑を開けるかを長く左右してきた。",
  ),
  q(
    7,
    "What is the Korean bathhouse, often open around the clock and used for socialising as much as bathing, called?|¿Cómo se llama la casa de baños coreana, a menudo abierta las 24 horas y usada tanto para socializar como para bañarse?|Comment appelle-t-on l'établissement de bains coréen, souvent ouvert jour et nuit et utilisé autant pour socialiser que pour se laver ?|入浴だけでなく交流の場としても使われる、しばしば24時間営業の韓国の公衆浴場は?",
    [
      "Onsen|Onsen|Onsen|温泉",
      "Hammam|Hamam|Hammam|ハンマーム",
      "Jjimjilbang|Jjimjilbang|Jjimjilbang|チムジルバン",
    ],
    2,
    "Beyond the segregated hot-tub floor, most have a shared common area with heated stone rooms, television and cheap snacks, and families or friends sometimes stay overnight cheaply instead of booking a hotel.|Más allá del piso de bañeras separado por sexos, la mayoría tiene una zona común compartida con salas de piedra calefactadas, televisión y aperitivos baratos, y a veces familias o amigos pasan la noche allí en vez de reservar hotel.|Au-delà de l'étage des bains chauds séparé par sexe, la plupart possèdent un espace commun partagé avec des salles de pierre chauffées, la télévision et des collations bon marché, et familles ou amis y passent parfois la nuit à moindres frais plutôt que de réserver un hôtel.|男女別の浴場の階のほかに、たいてい温めた石の部屋やテレビ、安いおやつのある共有スペースがある。家族や友人がホテルの代わりに安く一晩過ごすこともある。",
  ),
  q(
    7,
    "What is the name of the traditional Korean twelve-string plucked zither?|¿Cómo se llama el cítara tradicional coreana de doce cuerdas pulsadas?|Comment s'appelle la cithare traditionnelle coréenne à douze cordes pincées ?|十二本の弦を指で弾いて鳴らす、韓国の伝統的な箏の名は?",
    [
      "Gayageum|Gayageum|Gayageum|伽倻琴(カヤグム)",
      "Sitar|Sitar|Sitar|シタール",
      "Koto|Koto|Koto|琴",
    ],
    0,
    "Legend credits its invention to a sixth-century king of the Gaya confederacy, and players today still pluck the silk or nylon strings with bare fingers while the instrument rests across the lap on the floor.|La leyenda atribuye su invención a un rey del siglo VI de la confederación de Gaya, y los intérpretes actuales aún pulsan las cuerdas de seda o nailon con los dedos desnudos mientras el instrumento descansa sobre el regazo, en el suelo.|La légende en attribue l'invention à un roi du VIe siècle de la confédération de Gaya, et les interprètes d'aujourd'hui pincent encore les cordes de soie ou de nylon à mains nues, l'instrument posé sur les genoux, assis au sol.|伝説では6世紀の伽倻の王が考案したとされる。奏者はいまも素手で絹やナイロンの弦を弾き、床に座って楽器を膝の上に横たえて演奏する。",
  ),
  q(
    7,
    "What is Korea's traditional farmers' music, combining drumming, dance and often a spinning ribbon-hat, called?|¿Cómo se llama la música tradicional campesina coreana, que combina percusión, danza y a menudo un sombrero con cinta giratoria?|Comment appelle-t-on la musique traditionnelle paysanne coréenne, alliant percussions, danse et souvent un chapeau à ruban tournoyant ?|太鼓と踊り、しばしば回転する帯飾りの付いた帽子を伴う、韓国の伝統的な農民の音楽は?",
    [
      "Gamelan|Gamelán|Gamelan|ガムラン",
      "Nongak|Nongak|Nongak|農楽(ノンアク)",
      "Mariachi|Mariachi|Mariachi|マリアッチ",
    ],
    1,
    "It grew out of music played in the rice fields to keep pace with communal planting and harvesting, and the dancer's hat trails a long ribbon that traces circles in the air as the head snaps in time with the drums.|Nació de la música tocada en los arrozales para marcar el ritmo de la siembra y la cosecha comunitarias, y el sombrero del bailarín arrastra una larga cinta que traza círculos en el aire al compás de los tambores.|Elle est née de la musique jouée dans les rizières pour rythmer les semis et moissons collectifs, et le chapeau du danseur porte un long ruban qui trace des cercles dans l'air au rythme des tambours.|田植えや稲刈りを大勢でそろえるために田で奏でられた音楽に由来する。踊り手の帽子からは長い帯が伸び、太鼓に合わせて頭を振るたびに空中に円を描く。",
  ),
  q(
    8,
    "What is the inlaid celadon pottery technique, in which patterns are carved and filled with contrasting clay, most associated with which earlier Korean dynasty?|¿A qué dinastía coreana anterior se asocia sobre todo la técnica de celadón con incrustaciones, en la que se tallan motivos y se rellenan con arcilla de otro color?|À quelle dynastie coréenne antérieure la technique du céladon incrusté, où les motifs sont gravés puis comblés d'argile contrastante, est-elle surtout associée ?|文様を彫り、色の違う土を象嵌して埋める青磁の技法と最も結びつく王朝は?",
    [
      "Balhae|Balhae|Balhae|渤海",
      "Joseon|Joseon|Joseon|朝鮮",
      "Goryeo|Goryeo|Goryeo|高麗",
    ],
    2,
    "The inlay method, called sanggam, was developed in the twelfth century and produced a soft jade-green glaze so admired that a Chinese envoy of the time ranked it among the finest ware under heaven.|El método de incrustación, llamado sanggam, se desarrolló en el siglo XII y producía un vidriado verde jade tan admirado que un enviado chino de la época lo situó entre las mejores lozas bajo el cielo.|La technique d'incrustation, appelée sanggam, fut mise au point au XIIe siècle et produisait un émail vert jade si admiré qu'un envoyé chinois de l'époque le classa parmi les plus belles céramiques sous le ciel.|象嵌(サンガム)と呼ばれるこの技法は12世紀に発展し、当時の中国の使節が「天下の名品」の一つに数えたほど愛でられた翡翠色の釉薬を生んだ。",
  ),
  q(
    8,
    "What is South Korea's famously demanding, once-a-year university entrance exam colloquially called?|¿Cómo se llama coloquialmente el exigente examen de ingreso a la universidad de Corea del Sur, celebrado una vez al año?|Comment appelle-t-on familièrement l'examen d'entrée à l'université, redoutable et annuel, de la Corée du Sud ?|年に一度行われる、韓国の厳しい大学入学試験の通称は?",
    [
      "Suneung|Suneung|Suneung|修能(スヌン)",
      "Gaokao|Gaokao|Gaokao|高考",
      "Bagrut|Bagrut|Bagrout|バグルート",
    ],
    0,
    "Flights are rescheduled and stock market opening hours pushed back on test day so the noise of takeoffs does not disturb the listening section, and younger students often gather outside test centres in the cold to cheer candidates on.|El día del examen se reprograman vuelos y se retrasa la apertura de la bolsa para que el ruido de los despegues no interrumpa la parte de comprensión oral, y estudiantes más jóvenes suelen reunirse fuera de los centros para animar a los candidatos.|Le jour de l'examen, des vols sont reprogrammés et l'ouverture de la Bourse retardée pour que le bruit des décollages ne perturbe pas l'épreuve d'écoute, et de plus jeunes élèves se rassemblent souvent dans le froid devant les centres pour encourager les candidats.|試験当日は飛行機の発着が調整され、株式市場の開場も遅らされる。離陸音がリスニング試験を妨げないようにするためである。下級生が寒空の下、試験会場の外に集まって受験生を応援する光景もよく見られる。",
  ),
  q(
    8,
    "What is the formal New Year's bow performed by children to their elders, traditionally answered with money, called?|¿Cómo se llama la reverencia formal de año nuevo que hacen los niños a los mayores, respondida tradicionalmente con dinero?|Comment appelle-t-on la révérence formelle du nouvel an que les enfants font à leurs aînés, traditionnellement récompensée par de l'argent ?|正月に子どもが目上の人へ行う正式なお辞儀で、伝統的にお年玉で返される作法の名は?",
    [
      "Kowtow|Kowtow|Kowtow|叩頭",
      "Sebae|Sebae|Sebae|歳拝(セベ)",
      "Namaste|Namasté|Namasté|ナマステ",
    ],
    1,
    "The bow is a full prostration touching the forehead to the floor, performed once for the new year rather than the more casual nod used the rest of the year, and it is usually done in one's best hanbok.|La reverencia es una postración completa que toca el suelo con la frente, hecha una vez por el año nuevo en vez del saludo casual del resto del año, y suele hacerse con el mejor hanbok.|La révérence est une prosternation complète, le front touchant le sol, exécutée une fois pour le nouvel an plutôt que le simple signe de tête du reste de l'année, et se fait généralement dans son plus beau hanbok.|このお辞儀は額を床につける本式の拝礼で、ふだんの軽い会釈とは違い正月に一度だけ行う。たいてい一張羅の韓服を着て行う。",
  ),
  q(
    8,
    "What is the traditional handmade Korean paper, produced from mulberry bark and used for windows, books and art, called?|¿Cómo se llama el papel tradicional coreano hecho a mano con corteza de morera, usado en ventanas, libros y arte?|Comment appelle-t-on le papier traditionnel coréen fait main à partir d'écorce de mûrier, utilisé pour les fenêtres, les livres et l'art ?|楮(こうぞ)の樹皮から手すきで作られ、窓や書物、美術に使われる韓国の伝統的な紙は?",
    [
      "Vellum|Vitela|Vélin|ヴェラム",
      "Papyrus|Papiro|Papyrus|パピルス",
      "Hanji|Hanji|Hanji|韓紙(ハンジ)",
    ],
    2,
    "Traditional houses pasted it directly onto wooden window lattices instead of using glass, and because the fibres let light through while blocking a direct view, a lit room glowed evenly from outside after dark.|Las casas tradicionales lo pegaban directamente en las celosías de madera de las ventanas en vez de usar vidrio, y como las fibras dejan pasar la luz sin permitir ver directamente, una habitación iluminada brillaba uniforme desde fuera al anochecer.|Les maisons traditionnelles le collaient directement sur les treillis de bois des fenêtres au lieu du verre, et comme les fibres laissent passer la lumière sans permettre une vue directe, une pièce éclairée rayonnait uniformément vue de l'extérieur après la tombée de la nuit.|伝統家屋では窓ガラスの代わりに木の格子へこの紙を直に貼った。繊維が光は通しても中は見えないため、日が暮れると明かりのついた部屋が外から均一に淡く光って見えた。",
  ),
  q(
    9,
    "In 2023, South Korea legally standardised on which system for counting a person's age, ending the traditional practice of adding a year at birth and again at every new year?|En 2023, ¿a qué sistema de cálculo de la edad se pasó legalmente Corea del Sur, poniendo fin a la práctica tradicional de sumar un año al nacer y de nuevo en cada año nuevo?|En 2023, sur quel système de calcul de l'âge la Corée du Sud s'est-elle légalement alignée, mettant fin à la pratique traditionnelle d'ajouter un an à la naissance puis à chaque nouvel an ?|2023年、韓国が法的に統一した年齢の数え方は? 生まれた時点で1歳とし正月ごとに歳を重ねる従来の数え方はこれで終わった。",
    [
      "International age (counting from zero at birth, adding a year on each birthday)|Edad internacional (contando desde cero al nacer, sumando un año en cada cumpleaños)|L'âge international (comptant depuis zéro à la naissance, un an de plus à chaque anniversaire)|満年齢(生まれた時を0歳とし、誕生日ごとに歳を重ねる数え方)",
      "Lunar age (counting only from the lunar new year)|Edad lunar (contando solo desde el año nuevo lunar)|L'âge lunaire (comptant uniquement depuis le nouvel an lunaire)|旧暦年齢(旧正月からのみ数える方式)",
      "Reign-year age (counting from the current monarch's coronation)|Edad de reinado (contando desde la coronación del monarca actual)|L'âge de règne (comptant depuis le couronnement du monarque actuel)|治世紀年(在位中の君主の即位から数える方式)",
    ],
    0,
    "The change took effect in June 2023 after lawmakers argued the old dual system caused genuine confusion in legal and medical contexts, though the traditional count is still used casually in everyday conversation.|El cambio entró en vigor en junio de 2023 después de que los legisladores argumentaran que el viejo sistema dual causaba verdadera confusión en contextos legales y médicos, aunque el cómputo tradicional se sigue usando de forma casual en la conversación diaria.|Le changement prit effet en juin 2023 après que les législateurs eurent fait valoir que l'ancien double système causait une réelle confusion en matière juridique et médicale, bien que le décompte traditionnel reste utilisé de façon informelle dans la conversation quotidienne.|この変更は2023年6月に施行された。旧来の二重の数え方が法律や医療の場面で実際に混乱を招いていたという議員たちの主張がきっかけだったが、日常会話ではいまも従来の数え方が気軽に使われている。",
  ),
  q(
    9,
    "In the traditional Korean five-colour (obangsaek) scheme used in court dress and temple painting, which colour represents the centre and the earth?|En el esquema tradicional coreano de cinco colores (obangsaek), usado en trajes de corte y pintura de templos, ¿qué color representa el centro y la tierra?|Dans le schéma traditionnel coréen des cinq couleurs (obangsaek), utilisé dans les habits de cour et la peinture des temples, quelle couleur représente le centre et la terre ?|宮廷の衣装や寺院の彩色に使われる韓国の伝統的な五方色で、中央と土を表す色は?",
    [
      "Black|Negro|Noir|黒",
      "Yellow|Amarillo|Jaune|黄",
      "White|Blanco|Blanc|白",
    ],
    1,
    "The full scheme assigns blue-green to the east, white to the west, red to the south and black to the north, with yellow held at the centre as the colour reserved historically for the king alone.|El esquema completo asigna verde azulado al este, blanco al oeste, rojo al sur y negro al norte, con el amarillo reservado en el centro, históricamente solo para el rey.|Le schéma complet attribue le bleu-vert à l'est, le blanc à l'ouest, le rouge au sud et le noir au nord, le jaune étant réservé au centre, historiquement au roi seul.|この五方色は東に青(緑)、西に白、南に赤、北に黒を配し、中央には黄を置く。黄は歴史的に王だけに許された色とされた。",
  ),
  q(
    9,
    "Which family of languages do most contemporary linguists place Korean in, given the lack of proven historical ties to any neighbouring language group?|Dado que no hay vínculos históricos probados con ningún grupo lingüístico vecino, ¿en qué familia sitúan hoy la mayoría de lingüistas al coreano?|Faute de liens historiques prouvés avec un groupe linguistique voisin, dans quelle famille la plupart des linguistes contemporains classent-ils le coréen ?|近隣のどの語族とも証明された歴史的つながりが無いため、現代の言語学者の多くが韓国語をどう分類しているか?",
    [
      "A dialect of Japanese|Un dialecto del japonés|Un dialecte du japonais|日本語の一方言として",
      "Part of the Sino-Tibetan family|Parte de la familia sinotibetana|Faisant partie de la famille sino-tibétaine|シナ・チベット語族の一部として",
      "A language isolate|Una lengua aislada|Une langue isolée|孤立した言語(語族不明)として",
    ],
    2,
    "Proposals linking it to Japanese or to the old Altaic grouping with Turkic and Mongolic languages remain seriously debated, but none commands the consensus needed to move Korean out of the isolate category.|Las propuestas que lo vinculan al japonés o al antiguo grupo altaico con las lenguas turcas y mongólicas siguen debatiéndose en serio, pero ninguna reúne el consenso necesario para sacar al coreano de la categoría de lengua aislada.|Les hypothèses le rattachant au japonais ou à l'ancien groupe altaïque avec les langues turciques et mongoliques restent sérieusement débattues, mais aucune ne réunit le consensus nécessaire pour sortir le coréen de la catégorie des langues isolées.|日本語との関係や、テュルク語・モンゴル語と並べた旧来の「アルタイ語族」説はいまも真剣に議論されているが、韓国語を孤立言語の分類から動かすほどの合意には至っていない。",
  ),
  q(
    10,
    "What is the name of the nineteenth-century Korean religious and philosophical movement, blending Confucian, Buddhist, Taoist and some Catholic ideas, whose name means \"Eastern Learning\"?|¿Cómo se llama el movimiento religioso y filosófico coreano del siglo XIX, que mezcló ideas confucianas, budistas, taoístas y algunas católicas, y cuyo nombre significa «Enseñanza Oriental»?|Comment s'appelle le mouvement religieux et philosophique coréen du XIXe siècle, mêlant idées confucéennes, bouddhistes, taoïstes et quelques éléments catholiques, dont le nom signifie « Étude de l'Est » ?|儒教・仏教・道教にカトリックの要素も交えた19世紀朝鮮の宗教・思想運動で、「東の学び」を意味する名を持つものは?",
    [
      "Donghak|Donghak|Donghak|東学(トンハク)",
      "Silhak|Silhak|Silhak|実学",
      "Seohak|Seohak|Seohak|西学",
    ],
    0,
    "Founded in 1860 partly in reaction against the spread of Western \"foreign learning\", the movement's followers rose in a major peasant revolt in 1894 that was ultimately crushed, but its egalitarian teachings influenced reform movements for decades afterward.|Fundado en 1860, en parte como reacción a la difusión del «saber occidental», sus seguidores protagonizaron una gran revuelta campesina en 1894 que acabó siendo aplastada, pero sus enseñanzas igualitarias influyeron en movimientos reformistas durante décadas.|Fondé en 1860, en partie en réaction à la diffusion du « savoir occidental », ses adeptes menèrent une importante révolte paysanne en 1894, finalement écrasée, mais ses enseignements égalitaires influencèrent des mouvements réformistes durant des décennies.|1860年、西洋の「洋学」の広まりへの反発もあって興ったこの運動の信徒は、1894年に大規模な農民蜂起を起こしたが、最終的に鎮圧された。その平等主義的な教えは、その後何十年も改革運動に影響を与え続けた。",
  ),
];
