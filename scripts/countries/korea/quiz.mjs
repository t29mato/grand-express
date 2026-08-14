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

  // =======================================================================
  // 拡充ぶん(2026-08-14)。難易度7以上を厚くする目的で追加。
  // =======================================================================

  // --- 難易度1〜3(初めての人向け) ---
  q(
    1,
    "What is South Korea's national flower, said to bloom continuously through the summer?|¿Cuál es la flor nacional de Corea del Sur, que se dice florece sin parar durante el verano?|Quelle est la fleur nationale de la Corée du Sud, censée fleurir sans relâche tout l'été ?|夏じゅう咲き続けるとされる、韓国の国花は?",
    ["Cherry blossom|Flor de cerezo|Fleur de cerisier|桜", "Lotus|Loto|Lotus|蓮", "Rose of Sharon (mugunghwa)|Rosa de Sarón (mugunghwa)|Rose de Sharon (mugunghwa)|むくげ(無窮花)"],
    2,
    "The name mugunghwa literally means \"the flower that never withers\", and it appears in the country's national anthem as well as on official government emblems.|El nombre mugunghwa significa literalmente «la flor que nunca se marchita», y aparece en el himno nacional además de en los emblemas oficiales del gobierno.|Le nom mugunghwa signifie littéralement « la fleur qui ne fane jamais », et il figure dans l'hymne national ainsi que sur les emblèmes officiels du gouvernement.|「無窮花(むくげ)」という名は文字どおり「決して枯れない花」を意味し、国歌の歌詞にも登場し、政府の公式紋章にも使われている。",
  ),
  q(
    1,
    "What is South Korea's second-largest city, a major port on the southeast coast?|¿Cuál es la segunda ciudad más grande de Corea del Sur, un importante puerto en la costa sureste?|Quelle est la deuxième plus grande ville de Corée du Sud, un port majeur sur la côte sud-est ?|韓国第2の都市で、南東岸の大きな港町はどこか?",
    ["Incheon|Incheon|Incheon|仁川", "Daegu|Daegu|Daegu|大邱", "Busan|Busan|Busan|釜山"],
    2,
    "Busan holds the country's busiest container port and is the finishing point of the Gyeongbu rail and expressway lines that begin in Seoul, some 325km to the north.|Busan alberga el puerto de contenedores más activo del país y es el punto final de las líneas ferroviaria y de autopista Gyeongbu que comienzan en Seúl, a unos 325 km al norte.|Busan abrite le port à conteneurs le plus actif du pays et marque le terminus de la ligne ferroviaire et de l'autoroute Gyeongbu qui partent de Séoul, à quelque 325 km au nord.|釜山は国内最大のコンテナ港を持ち、北へおよそ325kmのソウルから始まる京釜線(鉄道・高速道路)の終着点でもある。",
  ),
  q(
    1,
    "Which martial art, involving high kicks and now an Olympic sport, originated in Korea?|¿Qué arte marcial, con patadas altas y hoy deporte olímpico, se originó en Corea?|Quel art martial, aux coups de pied hauts et aujourd'hui sport olympique, est originaire de Corée ?|高い蹴り技を特徴とし、いまはオリンピック種目にもなっている、韓国発祥の武道は?",
    ["Judo|Judo|Judo|柔道", "Kung fu|Kung fu|Kung-fu|カンフー", "Taekwondo|Taekwondo|Taekwondo|テコンドー"],
    2,
    "Taekwondo became a full medal sport at the Sydney 2000 Olympics, and its name combines tae (kick), kwon (fist) and do (the way), reflecting techniques developed and standardised in Korea after the Second World War.|El taekwondo se convirtió en deporte olímpico con medallas en Sídney 2000, y su nombre combina tae (patada), kwon (puño) y do (el camino).|Le taekwondo devint un sport olympique à médailles à Sydney en 2000, et son nom combine tae (coup de pied), kwon (poing) et do (la voie).|テコンドーはシドニー2000大会で正式な金メダル種目になった。名前は跆(蹴り)・拳(拳)・道(道)を組み合わせたもので、第二次大戦後の韓国で体系化された技を反映している。",
  ),
  q(
    2,
    "What is the staple grain eaten at nearly every Korean meal?|¿Cuál es el cereal básico que se come en casi toda comida coreana?|Quelle est la céréale de base consommée à presque chaque repas coréen ?|ほぼすべての食事に添えられる主食の穀物は?",
    ["Wheat|Trigo|Blé|小麦", "Barley|Cebada|Orge|大麦", "Rice|Arroz|Riz|米"],
    2,
    "A bowl of steamed short-grain rice is set at nearly every meal alongside soup and side dishes, and rice paddies still cover much of the country's flatter farmland.|Un cuenco de arroz de grano corto al vapor se sirve en casi toda comida junto con sopa y guarniciones, y los arrozales aún cubren buena parte de las tierras de cultivo llanas del país.|Un bol de riz à grain court cuit à la vapeur accompagne presque chaque repas, avec une soupe et des accompagnements, et les rizières couvrent encore une bonne part des terres agricoles plates du pays.|蒸した短粒米の茶碗が、スープやおかずと並んでほぼすべての食事に添えられる。水田はいまも国内の平坦な農地の多くを占めている。",
  ),
  q(
    2,
    "On how many sides is the Korean Peninsula bordered by water?|¿Por cuántos lados está bordeada la península coreana por el agua?|Sur combien de côtés la péninsule coréenne est-elle bordée par l'eau ?|朝鮮半島は何方向を海に囲まれているか?",
    ["Two|Dos|Deux|2方向", "All four|Los cuatro|Les quatre|4方向すべて", "Three|Tres|Trois|3方向"],
    2,
    "The peninsula is bounded by the Yellow Sea to the west, the East Sea (Sea of Japan) to the east, and the Korea Strait to the south, with only its northern edge attached to the Asian mainland.|La península limita con el mar Amarillo al oeste, el mar del Este (mar de Japón) al este y el estrecho de Corea al sur, y solo su borde norte está unido al continente asiático.|La péninsule est bordée par la mer Jaune à l'ouest, la mer de l'Est (mer du Japon) à l'est et le détroit de Corée au sud, seul son bord nord restant rattaché au continent asiatique.|半島は西を黄海、東を東海(日本海)、南を朝鮮海峡に囲まれ、北の縁だけがアジア大陸と地続きになっている。",
  ),
  q(
    2,
    "What is the traditional Korean rice cake soup eaten to mark the new year, one bowl per year of age gained?|¿Cuál es la sopa tradicional coreana de pastel de arroz que se toma para celebrar el año nuevo, un cuenco por cada año de edad ganado?|Quelle est la soupe traditionnelle coréenne de gâteau de riz consommée pour marquer le nouvel an, un bol par année d'âge gagnée ?|正月に食べる伝統の餅入りスープで、一杯食べるごとに歳をひとつ重ねるとされるものは?",
    ["Bibimbap|Bibimbap|Bibimbap|ビビンバ", "Japchae|Japchae|Japchae|チャプチェ", "Tteokguk|Tteokguk|Tteokguk|トック(お雑煮)"],
    2,
    "The soup's thin oval rice-cake slices are said to resemble old coins, symbolising wealth, and their white colour was traditionally read as a wish for a clean start to the year.|Se dice que las finas rodajas ovaladas de pastel de arroz de la sopa recuerdan a monedas antiguas, símbolo de riqueza, y su color blanco se leía tradicionalmente como un deseo de empezar el año limpio.|Les fines tranches ovales de gâteau de riz de la soupe rappelleraient d'anciennes pièces de monnaie, symbole de richesse, et leur couleur blanche exprimait traditionnellement le vœu d'un départ pur pour l'année.|薄い楕円形の餅切りは古銭に似せて富を願うものとされ、その白さは新しい年を清らかに始める願いを込めているとも言われる。",
  ),
  q(
    2,
    "What is the spicy, fermented red chilli paste central to much of Korean cooking?|¿Cuál es la pasta roja de chile fermentada y picante, esencial en buena parte de la cocina coreana?|Quelle est la pâte de piment rouge fermentée et pimentée, essentielle à une bonne part de la cuisine coréenne ?|韓国料理の多くに使われる、発酵させた辛い赤唐辛子ペーストは?",
    ["Doenjang|Doenjang|Doenjang|テンジャン(味噌)", "Gochujang|Gochujang|Gochujang|コチュジャン", "Ssamjang|Ssamjang|Ssamjang|サムジャン"],
    1,
    "Traditionally fermented for months or years in earthenware jars set out in the sun, gochujang is made from chilli powder, glutinous rice, fermented soybeans and salt.|Fermentado tradicionalmente durante meses o años en tinajas de barro puestas al sol, el gochujang se hace con chile en polvo, arroz glutinoso, soja fermentada y sal.|Traditionnellement fermenté pendant des mois ou des années dans des jarres en terre cuite exposées au soleil, le gochujang est fait de piment en poudre, de riz gluant, de soja fermenté et de sel.|素焼きの甕を日なたに並べて何か月、何年も発酵させて作る。唐辛子粉ともち米、発酵大豆、塩が原料である。",
  ),
  q(
    3,
    "What is the double-headed hourglass-shaped drum central to Korean traditional and folk music?|¿Cuál es el tambor de doble parche y forma de reloj de arena, central en la música tradicional y folclórica coreana?|Quel est le tambour à deux peaux en forme de sablier, central dans la musique traditionnelle et folklorique coréenne ?|韓国の伝統音楽・民俗音楽で中心的な、両面を持つ砂時計形の太鼓は?",
    ["Gayageum|Gayageum|Gayageum|伽耶琴", "Piri|Piri|Piri|篳篥(ピリ)", "Janggu|Janggu|Janggu|チャンゴ"],
    2,
    "Its two heads are struck with different implements — a stick on one side, a bare hand or thin switch on the other — so a single drummer can produce two distinct tones at once.|Sus dos parches se golpean con implementos distintos: un palo por un lado, la mano desnuda o una vara fina por el otro, así que un solo tamborilero puede producir dos tonos distintos a la vez.|Ses deux peaux se frappent avec des instruments différents — une baguette d'un côté, la main nue ou une fine baguette souple de l'autre — si bien qu'un seul joueur peut produire deux tons distincts à la fois.|両面をそれぞれ違う道具で打つ楽器で、片面はばち、もう片面は素手か細い鞭状の棒を使う。一人の奏者が同時に二つの異なる音色を出せる。",
  ),
  q(
    3,
    "What is the communal autumn event in which households traditionally make a whole winter's supply of kimchi together?|¿Cuál es el evento comunitario de otoño en que los hogares preparan tradicionalmente juntos la provisión de kimchi de todo un invierno?|Quel est l'événement communautaire d'automne où les foyers préparent traditionnellement ensemble toute la provision de kimchi de l'hiver ?|各家庭が冬じゅう分のキムチをまとめて漬ける、秋の共同作業の行事は?",
    ["Chuseok|Chuseok|Chuseok|秋夕(チュソク)", "Kimjang|Kimjang|Kimjang|キムジャン", "Daeboreum|Daeboreum|Daeboreum|大保름(テボルム)"],
    1,
    "Neighbours traditionally trade labour, each household's turn coming in exchange for helping others, and the custom was added to UNESCO's Intangible Cultural Heritage list in 2013.|Los vecinos tradicionalmente intercambian mano de obra, y la costumbre se sumó a la lista de Patrimonio Cultural Inmaterial de la UNESCO en 2013.|Les voisins échangent traditionnellement de la main-d'œuvre, et la coutume fut ajoutée à la liste du patrimoine culturel immatériel de l'UNESCO en 2013.|近所どうし労力を貸し借りするのが習わしで、この慣習は2013年にユネスコ無形文化遺産に登録された。",
  ),
  q(
    3,
    "Which large citrus fruit is a specialty grown mainly on Jeju Island?|¿Qué cítrico grande es una especialidad cultivada sobre todo en la isla de Jeju?|Quel grand agrume est une spécialité cultivée surtout sur l'île de Jeju ?|主に済州島で栽培される特産の柑橘類は?",
    ["Grapefruit|Toronja|Pamplemousse|グレープフルーツ", "Tangerine (gyul)|Mandarina (gyul)|Mandarine (gyul)|みかん(橘・귤)", "Pomelo|Pomelo|Pomelo|文旦"],
    1,
    "Jeju's volcanic soil and mild winters make it one of the only parts of Korea where citrus ripens outdoors, and the fruit became such a symbol of the island that a giant sculpture of one stands at its main airport.|El suelo volcánico y los inviernos suaves de Jeju la convierten en una de las pocas zonas de Corea donde los cítricos maduran al aire libre.|Le sol volcanique et les hivers doux de Jeju en font l'une des seules régions de Corée où les agrumes mûrissent en extérieur.|済州の火山質の土壌と温暖な冬のおかげで、韓国の中でも柑橘が屋外で実る数少ない土地になっている。島の象徴となり、主要空港には巨大なみかんの像まで立つ。",
  ),
  q(
    3,
    "Which 16th-century Korean admiral is remembered for repeatedly defeating a numerically superior Japanese fleet without losing a single ship?|¿Qué almirante coreano del siglo XVI es recordado por derrotar repetidamente a una flota japonesa numéricamente superior sin perder un solo barco?|Quel amiral coréen du XVIe siècle est resté célèbre pour avoir vaincu à plusieurs reprises une flotte japonaise numériquement supérieure sans perdre un seul navire ?|数で勝る日本の艦隊を繰り返し破りながら、自軍の船を一隻も失わなかったとされる16世紀の朝鮮の将軍は?",
    ["Gang Gam-chan|Gang Gam-chan|Gang Gam-chan|姜邯賛(カン・ガムチャン)", "Kim Yu-sin|Kim Yu-sin|Kim Yu-sin|金庾信(キム・ユシン)", "Yi Sun-sin|Yi Sun-sin|Yi Sun-sin|李舜臣(イ・スンシン)"],
    2,
    "Admiral Yi commanded during the Japanese invasions of 1592–98 and is credited with pioneering the use of armoured \"turtle ships\", though no complete original blueprint survives and modern replicas are based on later written accounts.|El almirante Yi comandó durante las invasiones japonesas de 1592-98 y se le atribuye el uso pionero de los blindados «barcos tortuga», aunque no sobrevive ningún plano original completo.|L'amiral Yi commanda durant les invasions japonaises de 1592-1598 et est crédité de l'usage pionnier des « bateaux tortues » blindés, bien qu'aucun plan original complet n'ait survécu.|李舜臣は1592〜98年の日本による侵攻の際に指揮を執り、装甲を施した「亀甲船」を先駆けて用いたとされる。ただし完全な原設計図は現存せず、現存する復元船は後世の文献記録をもとにしている。",
  ),
  q(
    3,
    "What is the clear, distilled Korean spirit traditionally made from rice, now often from other starches like wheat or sweet potato?|¿Cuál es el destilado coreano transparente, hecho tradicionalmente de arroz y hoy a menudo de otros almidones como trigo o batata?|Quel est le spiritueux coréen transparent, fait traditionnellement de riz et aujourd'hui souvent d'autres féculents comme le blé ou la patate douce ?|米から造られ、いまでは小麦やさつまいもなど他の原料も使われる、透明な韓国の蒸留酒は?",
    ["Makgeolli|Makgeolli|Makgeolli|マッコリ", "Soju|Soju|Soju|焼酎(ソジュ)", "Sikhye|Sikhye|Sikhye|シッケ"],
    1,
    "Modern mass-market soju is typically diluted to around 16–20% alcohol, far weaker than the traditionally distilled version, and it has for years topped global rankings of best-selling liquor brands by volume, almost entirely on domestic sales.|El soju moderno de gran consumo suele diluirse a entre un 16% y un 20% de alcohol, mucho más débil que la versión tradicionalmente destilada.|Le soju moderne de grande consommation est généralement dilué autour de 16 à 20 % d'alcool, bien plus faible que la version traditionnellement distillée.|現代の量産焼酎はアルコール度数16〜20%程度に薄められており、本来の蒸留酒よりずっと弱い。それでもほぼ国内消費だけで、世界の蒸留酒販売量ランキングの上位を長年占め続けている。",
  ),

  // --- 難易度4〜6(少し調べたことがあれば分かる) ---
  q(
    4,
    "In which direction does Korea's cherry blossom bloom travel each spring?|¿En qué dirección avanza cada primavera la floración de los cerezos en Corea?|Dans quelle direction progresse chaque printemps la floraison des cerisiers en Corée ?|韓国の桜前線は毎年どちらの方角へ進むか?",
    ["East to west|De este a oeste|D'est en ouest|東から西", "South to north|De sur a norte|Du sud au nord|南から北", "North to south|De norte a sur|Du nord au sud|北から南"],
    1,
    "The blossom opens first on the southern island of Jeju and the south coast, then climbs the peninsula over a couple of weeks as spring warmth spreads northward.|La flor se abre primero en la isla sureña de Jeju y la costa sur, y luego sube por la península a lo largo de un par de semanas.|La floraison s'ouvre d'abord sur l'île méridionale de Jeju et la côte sud, puis remonte la péninsule sur une quinzaine de jours.|花はまず南の済州島と南岸で開き、その後およそ2週間かけて春の暖かさとともに半島を北上する。",
  ),
  q(
    4,
    "What is the Korean style of grilling meat, often pork belly, at the diner's own table?|¿Cuál es el estilo coreano de asar carne, a menudo panceta de cerdo, en la propia mesa del comensal?|Quel est le style coréen de grillade de viande, souvent de la poitrine de porc, à la table même du convive ?|客が自分の卓上で肉(よく豚バラ)を焼くスタイルの韓国料理は?",
    ["Bulgogi only|Solo bulgogi|Seulement le bulgogi|プルゴギのみ", "Tabletop gogigui (e.g. samgyeopsal)|Gogigui de mesa (p. ej. samgyeopsal)|Le gogigui de table (ex. samgyeopsal)|卓上焼肉(サムギョプサルなど)", "Jeongol only|Solo jeongol|Seulement le jeongol|チョンゴルのみ"],
    1,
    "Samgyeopsal, thick-cut unmarinated pork belly, is grilled at the table and wrapped in lettuce with garlic and ssamjang paste, a format so associated with after-work socialising that its name alone can imply an invitation to drink.|El samgyeopsal, panceta de cerdo cortada gruesa y sin marinar, se asa en la mesa y se envuelve en lechuga con ajo y pasta ssamjang.|Le samgyeopsal, poitrine de porc épaisse et non marinée, est grillé à table et enveloppé dans de la laitue avec de l'ail et de la pâte ssamjang.|サムギョプサルは厚切りで下味を付けない豚バラ肉を卓上で焼き、ニンニクやサムジャンと一緒にサンチュで包んで食べる。仕事帰りの付き合いの定番で、その名前だけで「飲みに行こう」の誘いを意味することもある。",
  ),
  q(
    4,
    "What administrative status does Seoul hold, distinct from South Korea's ordinary provinces?|¿Qué estatus administrativo tiene Seúl, distinto de las provincias ordinarias de Corea del Sur?|Quel statut administratif détient Séoul, distinct des provinces ordinaires de la Corée du Sud ?|韓国の普通の道とは違う、ソウルが持つ行政上の地位は?",
    ["Autonomous region|Región autónoma|Région autonome|自治区", "Special city|Ciudad especial|Ville spéciale|特別市", "Free trade zone|Zona franca|Zone franche|自由貿易区"],
    1,
    "Seoul is South Korea's only \"special city\" (teukbyeolsi), a category above the six \"metropolitan cities\" that include Busan and Incheon, reporting directly to the central government rather than through a province.|Seúl es la única «ciudad especial» (teukbyeolsi) de Corea del Sur, una categoría por encima de las seis «ciudades metropolitanas».|Séoul est la seule « ville spéciale » (teukbyeolsi) de Corée du Sud, une catégorie au-dessus des six « villes métropolitaines ».|ソウルは韓国で唯一の「特別市」で、釜山や仁川を含む6つの「広域市」よりさらに上の区分にあたり、道を介さず中央政府に直属する。",
  ),
  q(
    4,
    "What are the traditional Korean ancestral memorial rites, held on death anniversaries and major holidays?|¿Cuáles son los ritos tradicionales coreanos de memoria a los antepasados, celebrados en los aniversarios de defunción y grandes fiestas?|Quels sont les rites traditionnels coréens de mémoire des ancêtres, célébrés aux anniversaires de décès et aux grandes fêtes ?|命日や大きな祝日に行われる、先祖を祀る伝統儀礼は?",
    ["Pansori|Pansori|Pansori|パンソリ", "Jesa|Jesa|Jesa|祭祀(チェサ)", "Gut|Gut|Gut|クッ"],
    1,
    "A table is laid with set dishes in a prescribed arrangement, and the eldest son's household has traditionally borne responsibility for hosting the rite, a duty that has become a recurring source of domestic debate as families grow smaller.|Se prepara una mesa con platos fijos en una disposición prescrita, y el hogar del hijo mayor ha llevado tradicionalmente la responsabilidad de organizar el rito.|Une table est dressée avec des plats fixes selon une disposition prescrite, et le foyer du fils aîné a traditionnellement porté la responsabilité d'organiser le rite.|決まった配置で決まった料理を供える台を用意し、長男の家がその儀式を執り行う務めを伝統的に負ってきた。家族が小さくなるにつれ、この務めをめぐる家庭内の議論も繰り返し起きている。",
  ),
  q(
    4,
    "What are the Korean playing cards, decorated with flower-and-month designs, used in the popular game go-stop?|¿Cuáles son las cartas de juego coreanas, decoradas con motivos de flores y meses, usadas en el popular juego go-stop?|Quelles sont les cartes à jouer coréennes, ornées de motifs de fleurs et de mois, utilisées dans le jeu populaire go-stop?|花と月の模様が描かれ、人気のゴーストップ(花札遊び)に使われる韓国のカードは?",
    ["Janggi pieces|Fichas de janggi|Pièces de janggi|将棋(チャンギ)の駒", "Yutnori sticks|Palos de yutnori|Bâtonnets de yunnori|尹櫂(ユンノリ)の棒", "Hwatu|Hwatu|Hwatu|花闘(ファトゥ)"],
    2,
    "Adapted from a Japanese card set in the late nineteenth century, the 48-card deck is divided into twelve suits of four cards each, one suit per month, and is played everywhere from holiday family gatherings to long train journeys.|Adaptado de una baraja japonesa a finales del siglo XIX, el mazo de 48 cartas se divide en doce palos de cuatro cartas cada uno, uno por mes.|Adapté d'un jeu de cartes japonais à la fin du XIXe siècle, le jeu de 48 cartes se divise en douze familles de quatre cartes chacune, une par mois.|19世紀末に日本のカード札を土台に取り入れられたもので、48枚を月ごとに4枚ずつ12組に分ける。祝いの席の家族団らんから長距離列車の中まで、至る所で遊ばれている。",
  ),
  q(
    5,
    "In Korean drinking etiquette, which way should a younger person turn their head when drinking in front of an elder?|En la etiqueta coreana para beber, ¿hacia dónde debe girar la cabeza una persona más joven al beber delante de un mayor?|Dans l'étiquette coréenne de la boisson, de quel côté un plus jeune doit-il tourner la tête en buvant devant un aîné ?|韓国の飲酒の作法で、目上の人の前で飲むとき、年下の人はどちらを向くとされるか?",
    ["Face the elder directly|De frente al mayor|Face à l'aîné|目上の人に正面を向ける", "Turn away, to the side|Girarse hacia un lado|Se détourner, sur le côté|顔と体を横へそらす", "Look down at the table|Mirar hacia la mesa|Regarder la table|卓のほうを見下ろす"],
    1,
    "Turning the head and body slightly away, cup held out of the elder's sight, is a small gesture of deference that visitors are often coached through the first time they drink with Korean colleagues or in-laws.|Girar ligeramente la cabeza y el cuerpo, con la copa fuera de la vista del mayor, es un pequeño gesto de deferencia.|Tourner légèrement la tête et le corps, verre hors de la vue de l'aîné, est un petit geste de déférence.|少し顔と体を横へそらし、杯を目上の人の視界の外に置くのは、敬意を示すささやかな作法で、韓国の同僚や義理の家族と初めて酒を飲む外国人はよくこの作法を教わる。",
  ),
  q(
    5,
    "What is the traditional Korean wrestling sport in which two competitors grip a fabric belt (satba) around the waist and thigh?|¿Cuál es el deporte tradicional coreano de lucha en que dos competidores se agarran a un cinturón de tela (satba) en la cintura y el muslo?|Quel est le sport de lutte traditionnel coréen où deux adversaires s'agrippent à une ceinture de tissu (satba) à la taille et à la cuisse ?|二人の力士が腰と太ももに巻いた帯(サッパ)を掴み合う、伝統的な韓国の相撲は?",
    ["Taekkyeon|Taekkyeon|Taekkyeon|テッキョン", "Gakjeo|Gakjeo|Gakjeo|角觝(カクジョ)", "Ssireum|Ssireum|Ssireum|シルム"],
    2,
    "Bouts are traditionally held in a circular sand pit, and the winner of the top regional tournament once received a live ox, a prize dating back to the sport's roots as a farm-village harvest contest.|Los combates se celebran tradicionalmente en un foso circular de arena, y el ganador del torneo regional más importante recibía antaño un buey vivo.|Les combats se tiennent traditionnellement dans une fosse de sable circulaire, et le vainqueur du principal tournoi régional recevait autrefois un bœuf vivant.|試合は伝統的に円形の砂の土俵で行われ、かつて地方の頂点を決める大会の優勝者には生きた牛が贈られた。農村の収穫祝いの余興だった名残の賞品である。",
  ),
  q(
    5,
    "What is the Korean dessert of finely shaved ice topped with sweet red beans, fruit and condensed milk?|¿Cuál es el postre coreano de hielo finamente raspado cubierto con judías rojas dulces, fruta y leche condensada?|Quel est le dessert coréen de glace pilée finement, garnie de haricots rouges sucrés, de fruits et de lait concentré ?|甘く煮た小豆と果物、練乳をかけたかき氷の韓国のデザートは?",
    ["Hotteok|Hotteok|Hotteok|ホットク", "Patbingsu|Patbingsu|Patbingsu|パッピンス", "Yakgwa|Yakgwa|Yakgwa|薬菓(ヤックァ)"],
    1,
    "Modern versions can be topped with almost anything from mango to cheesecake pieces, but the name literally combines pat (red bean) and bingsu (shaved ice), pointing back to the dish's simpler origins.|Las versiones modernas pueden llevar casi cualquier cobertura, desde mango hasta trozos de tarta de queso, pero el nombre combina literalmente pat (judía roja) y bingsu (hielo raspado).|Les versions modernes peuvent être garnies de presque tout, de la mangue à des morceaux de cheesecake, mais le nom combine littéralement pat (haricot rouge) et bingsu (glace pilée).|現代版はマンゴーからチーズケーキまで何でも載せるが、名前自体は「パッ(小豆)」と「ピンス(かき氷)」を組み合わせただけで、もとはずっと簡素な菓子だった。",
  ),
  q(
    5,
    "What is the ceremony held on a Korean baby's first birthday, in which the child is set before objects said to predict their future?|¿Cuál es la ceremonia del primer cumpleaños de un bebé coreano, en la que se coloca al niño ante objetos que se dice predicen su futuro?|Quelle est la cérémonie du premier anniversaire d'un bébé coréen, où l'enfant est placé devant des objets censés prédire son avenir ?|赤子の前に将来を占うとされる品々を並べる、韓国の一歳の誕生祝いは?",
    ["Baek-il|Baek-il|Baek-il|百日(ペギル)", "Doljanchi|Doljanchi|Doljanchi|돌잔치(トルジャンチ)", "Hwangap|Hwangap|Hwangap|還甲(ファンガプ)"],
    1,
    "In the object-grabbing ritual called doljabi, a thread might predict long life, money a rich future, and a microphone or stethoscope a career in entertainment or medicine — categories updated over the generations.|En el ritual de agarrar objetos llamado doljabi, un hilo podría predecir larga vida, dinero un futuro próspero, y un micrófono o estetoscopio una carrera en el espectáculo o la medicina.|Dans le rituel d'objets à saisir appelé doljabi, un fil pourrait prédire une longue vie, de l'argent un avenir prospère, et un micro ou un stéthoscope une carrière dans le divertissement ou la médecine.|「トルジャビ」と呼ばれる品選びの儀式では、糸を取れば長寿、お金を取れば裕福な将来、マイクや聴診器を取れば芸能や医療の道、というように、世代とともに品目も更新されている。",
  ),
  q(
    5,
    "What is the general term for a traditional Korean house, with wooden framing and a tiled or thatched roof?|¿Cuál es el término general para una casa tradicional coreana, con estructura de madera y techo de teja o paja?|Quel est le terme général pour une maison traditionnelle coréenne, à charpente de bois et toit de tuiles ou de chaume ?|木造の骨組みに瓦や茅葺きの屋根を持つ、伝統的な韓国家屋を指す言葉は?",
    ["Hanbok|Hanbok|Hanbok|韓服(ハンボク)", "Hangeul|Hangeul|Hangeul|ハングル", "Hanok|Hanok|Hanok|韓屋(ハノク)"],
    2,
    "Preserved neighbourhoods like Seoul's Bukchon and the village at Jeonju cluster hundreds of hanok together, many now converted into guesthouses, cafés and craft workshops for visitors.|Barrios conservados como Bukchon en Seúl y el pueblo de Jeonju agrupan cientos de hanok, muchos hoy convertidos en pensiones, cafés y talleres artesanales.|Des quartiers préservés comme Bukchon à Séoul et le village de Jeonju regroupent des centaines de hanok, beaucoup aujourd'hui transformés en pensions, cafés et ateliers d'artisanat.|ソウルの北村や全州の韓屋村のような保存地区には数百軒の韓屋が集まり、その多くはいまでは宿や喫茶店、工房に姿を変えて観光客を迎えている。",
  ),
  q(
    6,
    "What is the traditional Korean bowed string instrument, played upright with two strings, sometimes called Korea's answer to the fiddle?|¿Cuál es el instrumento tradicional coreano de cuerda frotada, tocado en vertical con dos cuerdas, a veces llamado el equivalente coreano del violín?|Quel est l'instrument traditionnel coréen à cordes frottées, joué à la verticale avec deux cordes, parfois appelé l'équivalent coréen du violon ?|直立に構え2本の弦を弓でこする、韓国のヴァイオリンとも言われる伝統楽器は?",
    ["Daegeum|Daegeum|Daegeum|大笒(テグム)", "Ajaeng|Ajaeng|Ajaeng|牙箏(アジェン)", "Haegeum|Haegeum|Haegeum|奚琴(ヘグム)"],
    2,
    "Unlike a violin, the haegeum has no fingerboard to press strings against, so the player's left hand controls pitch purely by adjusting string tension in mid-air, producing its characteristically bendy, vocal-like tone.|A diferencia de un violín, el haegeum no tiene diapasón contra el que presionar las cuerdas, así que la mano izquierda del intérprete controla el tono ajustando la tensión de la cuerda en el aire.|Contrairement à un violon, le haegeum n'a pas de touche contre laquelle presser les cordes, si bien que la main gauche de l'interprète règle la hauteur en ajustant la tension de la corde en l'air.|ヴァイオリンと違い奚琴には指板が無く、弦を押さえつける場所が無い。奏者の左手は空中で弦の張りを変えるだけで音程を作り、そのため独特の、声のようにしなる音色になる。",
  ),
  q(
    6,
    "What were the Confucian academies of the Joseon era, where scholars studied and held rites honouring past sages?|¿Cuáles eran las academias confucianas de la era Joseon, donde los eruditos estudiaban y celebraban ritos en honor a sabios pasados?|Quelles étaient les académies confucéennes de l'ère Joseon, où les lettrés étudiaient et célébraient des rites en l'honneur des sages passés ?|朝鮮時代、学者が学び先賢を祀る祭祀も行った民間の儒学の学舎は?",
    ["Seowon|Seowon|Seowon|書院(ソウォン)", "Hyanggyo|Hyanggyo|Hyanggyo|郷校(ヒャンギョ)", "Gukjagam|Gukjagam|Gukjagam|国子監(グッチャガム)"],
    0,
    "Nine seowon spread across the country were jointly inscribed as a UNESCO World Heritage site in 2019, chosen to represent how the private academy system spread and adapted over four centuries.|Nueve seowon repartidos por el país fueron inscritos conjuntamente como Patrimonio Mundial de la UNESCO en 2019.|Neuf seowon répartis dans le pays furent inscrits conjointement au patrimoine mondial de l'UNESCO en 2019.|全国に散らばる九つの書院が2019年、まとめてユネスコ世界遺産に登録された。私設の学舎という仕組みが四世紀にわたってどう広がり形を変えたかを代表する選定である。",
  ),
  q(
    6,
    "What is the fermented soybean paste, milder and less spicy than gochujang, used as the base of stews like doenjang-jjigae?|¿Cuál es la pasta de soja fermentada, más suave y menos picante que el gochujang, usada como base de guisos como el doenjang-jjigae?|Quelle est la pâte de soja fermentée, plus douce et moins pimentée que le gochujang, utilisée comme base de ragoûts comme le doenjang-jjigae ?|コチュジャンより穏やかで辛くない、テンジャンチゲなどの鍋料理の基本になる発酵大豆ペーストは?",
    ["Cheonggukjang|Cheonggukjang|Cheonggukjang|清麹醤(チョングッチャン)", "Doenjang|Doenjang|Doenjang|テンジャン(味噌)", "Yeonguhoe|Yeonguhoe|Yeonguhoe|軟魚膾(ヨヌェフェ)"],
    1,
    "Doenjang is traditionally the solid residue left over after brewing ganjang (soy sauce) from fermented soybean blocks called meju, meaning the two condiments have historically come from the very same batch.|Tradicionalmente, el doenjang es el residuo sólido que queda tras elaborar ganjang (salsa de soja) a partir de bloques de soja fermentada llamados meju.|Traditionnellement, le doenjang est le résidu solide laissé après la préparation du ganjang (sauce soja) à partir de blocs de soja fermenté appelés meju.|テンジャンは伝統的に、発酵させた大豆の塊「メジュ」からカンジャン(醤油)を仕込んだあとに残る固形分で、この二つの調味料はもともと同じ仕込みから生まれる。",
  ),
  q(
    6,
    "What is Korea's traditional archery style, using a short reflex bow and known for its thumb-release technique?|¿Cuál es el estilo tradicional coreano de tiro con arco, con un arco corto reflejo y conocido por su técnica de liberación con el pulgar?|Quel est le style traditionnel coréen de tir à l'arc, à l'arc court réflexe, connu pour sa technique de lâcher au pouce ?|短い複合弓を使い、親指で弦を放す技法で知られる韓国の伝統弓術は?",
    ["Gungdo|Gungdo|Gungdo|弓道(グンド)", "Kendo|Kendo|Kendo|剣道", "Hapkido|Hapkido|Hapkido|合気道"],
    0,
    "The short, sharply recurved bow can send an arrow well over 100m, and modern Korean archers, trained partly in this tradition, have dominated Olympic archery medal tables for decades.|El arco corto, muy recurvado, puede lanzar una flecha bastante más allá de 100 m, y los arqueros coreanos modernos, entrenados en parte en esta tradición, han dominado los medalleros olímpicos de tiro con arco durante décadas.|L'arc court, très recourbé, peut envoyer une flèche bien au-delà de 100 m, et les archers coréens modernes, formés en partie dans cette tradition, dominent les tableaux de médailles olympiques de tir à l'arc depuis des décennies.|強く反り返った短い弓は矢を100mを優に超えて飛ばせる。この伝統に部分的に鍛えられた現代韓国の射手たちは、何十年もオリンピックのアーチェリーでメダルを独占し続けている。",
  ),
  q(
    6,
    "What special administrative status does Jeju Island hold, distinct from South Korea's mainland provinces?|¿Qué estatus administrativo especial tiene la isla de Jeju, distinto de las provincias continentales de Corea del Sur?|Quel statut administratif spécial détient l'île de Jeju, distinct des provinces continentales de la Corée du Sud ?|韓国本土の道とは違う、済州島が持つ特別な行政上の地位は?",
    ["Special Self-Governing Province|Provincia Autónoma Especial|Province autonome spéciale|特別自治道", "Federal territory|Territorio federal|Territoire fédéral|連邦直轄地", "Free economic city|Ciudad económica libre|Ville économique libre|自由経済都市"],
    0,
    "Granted in 2006, the status gives Jeju's provincial government more autonomy than ordinary provinces over matters like tourism policy and, since 2002, visa-free entry rules for many foreign visitors.|Concedido en 2006, este estatus da al gobierno provincial de Jeju más autonomía que las provincias ordinarias en asuntos como la política turística.|Accordé en 2006, ce statut donne au gouvernement provincial de Jeju plus d'autonomie que les provinces ordinaires sur des questions comme la politique touristique.|2006年に与えられたこの地位により、済州の道庁は観光政策などの面で普通の道より大きな自治権を持ち、2002年以来、多くの外国人訪問者向けの査証免除の運用も担っている。",
  ),

  // --- 難易度7〜8(地元の人に「詳しいね」と言われる水準) ---
  q(
    7,
    "What is the fermented skate dish, notorious for its strong ammonia smell, associated above all with Jeolla-region cooking?|¿Cuál es el plato de raya fermentada, famoso por su fuerte olor a amoníaco, asociado sobre todo a la cocina de la región de Jeolla?|Quel est le plat de raie fermentée, réputé pour sa forte odeur d'ammoniac, associé avant tout à la cuisine de la région du Jeolla ?|強いアンモニア臭で知られ、何より全羅道の料理と結びつけられる発酵させたエイの料理は?",
    ["Hongeo|Hongeo|Hongeo|洪魚(ホンオ)", "Godeungeo-jorim|Godeungeo-jorim|Godeungeo-jorim|고등어조림(サバの煮付け)", "Agujjim|Agujjim|Agujjim|アンコウチム"],
    0,
    "The skate is left to ferment without refrigeration, sometimes for weeks, and the process breaks down urea in its flesh into ammonia, producing a smell strong enough that first-timers are often warned before trying it at a wedding or funeral feast, where it is a traditional dish.|La raya se deja fermentar sin refrigeración, a veces durante semanas, y el proceso descompone la urea de su carne en amoníaco.|La raie est laissée à fermenter sans réfrigération, parfois pendant des semaines, et le processus décompose l'urée de sa chair en ammoniac.|冷蔵せずに時に数週間かけて発酵させ、その過程で肉中の尿素がアンモニアに分解される。初めて食べる人にはあらかじめ覚悟を促されるほどの匂いだが、婚礼や法事の膳に伝統的に出される一皿でもある。",
  ),
  q(
    7,
    "What was the late-Joseon intellectual movement that pushed for practical, evidence-based reforms in agriculture, economics and administration?|¿Cuál fue el movimiento intelectual de finales de Joseon que impulsó reformas prácticas y basadas en evidencia en agricultura, economía y administración?|Quel fut le mouvement intellectuel de la fin de Joseon prônant des réformes pratiques et fondées sur des faits en agriculture, économie et administration ?|農業・経済・行政での実証的で実用重視の改革を唱えた、朝鮮後期の知識人の思潮は?",
    ["Seohak|Seohak|Seohak|西学(ソハク)", "Silhak|Silhak|Silhak|実学(シルハク)", "Yugyo|Yugyo|Yugyo|儒教(ユギョ)"],
    1,
    "Silhak scholars questioned the rigid, text-focused Confucian orthodoxy of their day and pushed instead for land reform and technical study, ideas that had little direct impact on Joseon policy at the time but were rediscovered as a symbol of homegrown modernisation later.|Los eruditos silhak cuestionaron la rígida ortodoxia confuciana centrada en textos de su época y en su lugar impulsaron la reforma agraria y el estudio técnico.|Les lettrés silhak remirent en question l'orthodoxie confucéenne rigide et centrée sur les textes de leur époque et prônèrent plutôt la réforme agraire et l'étude technique.|実学の学者たちは、当時の書物偏重の硬直した儒教正統派に疑問を投げかけ、代わりに土地改革や実用の学問を説いた。当時の朝鮮の政策への直接の影響は乏しかったが、後年、自前の近代化の象徴として再評価された。",
  ),
  q(
    7,
    "What were the Joseon-era diplomatic missions sent periodically to the Tokugawa shogunate in Japan, roughly a dozen times between 1607 and 1811?|¿Cuáles fueron las misiones diplomáticas de la era Joseon enviadas periódicamente al sogunato Tokugawa en Japón, una docena de veces entre 1607 y 1811?|Quelles furent les missions diplomatiques de l'ère Joseon envoyées périodiquement au shogunat Tokugawa au Japon, une douzaine de fois entre 1607 et 1811 ?|1607年から1811年まで、およそ12回にわたり徳川幕府へ送られた朝鮮時代の使節団は?",
    ["Joseon tongsinsa|Joseon tongsinsa|Joseon tongsinsa|朝鮮通信使", "Yeonhaengsa|Yeonhaengsa|Yeonhaengsa|燕行使", "Gyeonhusa|Gyeonhusa|Gyeonhusa|遣後使"],
    0,
    "Processions of several hundred people could take months to travel from Seoul to Edo and back, and the missions doubled as a channel for scholarly, artistic and technical exchange between the two countries during a long period without formal embassies.|Los cortejos de varios cientos de personas podían tardar meses en viajar de Seúl a Edo y volver, y las misiones servían también de canal de intercambio académico, artístico y técnico entre ambos países.|Des cortèges de plusieurs centaines de personnes pouvaient mettre des mois pour aller de Séoul à Edo et en revenir, et les missions servaient aussi de canal d'échanges savants, artistiques et techniques entre les deux pays.|数百人からなる行列がソウルから江戸への往復に何か月もかけることもあった。正式な常駐大使館の無かった長い期間、この使節団は両国間の学問・芸術・技術交流の窓口も兼ねていた。",
  ),
  q(
    7,
    "What is the traditional Korean lacquerware craft in which cut pieces of iridescent mother-of-pearl are inlaid into a lacquered wooden surface?|¿Cuál es la técnica tradicional coreana de laca en que se incrustan piezas cortadas de nácar iridiscente en una superficie de madera lacada?|Quelle est la technique traditionnelle coréenne de laque où des pièces découpées de nacre irisée sont incrustées dans une surface de bois laqué ?|光沢のある貝殻の欠片を漆塗りの木地に埋め込む、韓国の伝統的な工芸は?",
    ["Sanggam cheongja|Sanggam cheongja|Sanggam cheongja|象嵌青磁(サンガムチョンジャ)", "Najeon chilgi|Najeon chilgi|Najeon chilgi|螺鈿漆器(ナジョンチルギ)", "Dancheong|Dancheong|Dancheong|丹青(タンチョン)"],
    1,
    "The mother-of-pearl is typically cut from abalone or turban shells, and its lustre shifts colour as light and viewing angle change, a technique traced back at least to the Goryeo dynasty on lacquered Buddhist sutra boxes.|El nácar suele cortarse de conchas de abulón o turbante, y su brillo cambia de color según la luz y el ángulo de visión.|La nacre est généralement découpée dans des coquilles d'ormeau ou de turbo, et son lustre change de couleur selon la lumière et l'angle de vue.|貝殻は主にアワビやサザエから切り出し、光の当たり方や見る角度で輝きの色が変わる。この技法は少なくとも高麗時代、仏教の経箱の漆工にまでさかのぼる。",
  ),
  q(
    7,
    "What are the 24 evenly spaced points in the traditional East Asian solar calendar, marking seasonal turning points such as the first frost or the longest day?|¿Cuáles son los 24 puntos igualmente espaciados del calendario solar tradicional de Asia oriental, que marcan momentos estacionales como la primera helada o el día más largo?|Quels sont les 24 points également espacés du calendrier solaire traditionnel est-asiatique, marquant des tournants saisonniers comme la première gelée ou le jour le plus long ?|初霜や夏至など季節の節目を示す、東アジアの伝統暦にある24の等間隔の区切りは?",
    ["Ganji|Ganji|Ganji|干支(カンジ)", "24 solar terms (jeolgi)|24 términos solares (jeolgi)|24 termes solaires (jeolgi)|二十四節気(チョルギ)", "Sasi|Sasi|Sasi|四時(サシ)"],
    1,
    "Farmers historically timed planting and harvest around these markers rather than the lunar calendar's shifting dates, and several still appear on modern Korean calendars and even inspire seasonal menu items at cafés.|Los agricultores históricamente cronometraban la siembra y la cosecha en torno a estos marcadores en lugar de las fechas cambiantes del calendario lunar.|Les agriculteurs calaient historiquement semis et récoltes sur ces repères plutôt que sur les dates changeantes du calendrier lunaire.|農家は歴史的に、日付の動く旧暦ではなくこの節気を目安に種まきや収穫を行ってきた。いくつかはいまも現代の韓国のカレンダーに載り、カフェの季節限定メニューの由来にすらなっている。",
  ),
  q(
    7,
    "Korean uses two parallel systems of numbers for counting. Alongside native Korean numerals, which other set, borrowed long ago, is used for things like phone numbers and dates?|El coreano usa dos sistemas paralelos de números para contar. Junto a los numerales coreanos nativos, ¿qué otro conjunto, tomado prestado hace mucho, se usa para cosas como números de teléfono y fechas?|Le coréen utilise deux systèmes de nombres parallèles pour compter. Aux côtés des chiffres coréens natifs, quel autre ensemble, emprunté depuis longtemps, sert pour les numéros de téléphone et les dates ?|韓国語には二つの並行する数詞の体系がある。固有語の数詞のほかに、電話番号や日付などに使われる、古くに取り入れられたもう一方の体系は?",
    ["Sino-Korean numerals|Numerales sino-coreanos|Chiffres sino-coréens|漢数詞(漢字語の数詞)", "Jamo numerals|Numerales jamo|Chiffres jamo|字母数詞", "Idu numerals|Numerales idu|Chiffres idu|吏読数詞"],
    0,
    "Which system to use depends on what is being counted: native numbers count hours and objects up to 99, while Sino-Korean numbers are used for minutes, dates, money and numbers above 100, a split that trips up even fluent learners.|Qué sistema usar depende de lo que se cuente: los números nativos cuentan horas y objetos hasta 99, mientras que los sino-coreanos se usan para minutos, fechas, dinero y números por encima de 100.|Le système à utiliser dépend de ce qui est compté : les nombres natifs comptent les heures et les objets jusqu'à 99, tandis que les nombres sino-coréens servent pour les minutes, les dates, l'argent et les nombres au-delà de 100.|どちらを使うかは何を数えるかで決まる。固有語の数詞は時刻や99までの物の数に、漢数詞は分・日付・金額・100を超える数に使われる。この使い分けは流暢な学習者でもつまずく点である。",
  ),
  q(
    7,
    "What is the custom of eating a hot ginseng-and-chicken soup on the three hottest days of summer, following the logic of \"fighting heat with heat\"?|¿Cuál es la costumbre de comer una sopa caliente de pollo con ginseng en los tres días más calurosos del verano, siguiendo la lógica de «combatir el calor con calor»?|Quelle est la coutume de manger une soupe chaude au poulet et au ginseng lors des trois jours les plus chauds de l'été, selon la logique de « combattre la chaleur par la chaleur » ?|「熱をもって熱を制す」の考えで、夏いちばん暑い三日にサムゲタンなど熱いスープを食べる習わしは?",
    ["Boknal (sambok)|Boknal (sambok)|Boknal (sambok)|伏日(ポンナル、三伏)", "Chuseok|Chuseok|Chuseok|秋夕(チュソク)", "Daeboreum|Daeboreum|Daeboreum|大保름(テボルム)"],
    0,
    "The three days — chobok, jungbok and malbok — fall roughly ten days apart according to the traditional calendar, and samgyetang stalls and restaurants see some of their longest queues of the year on exactly those dates.|Los tres días —chobok, jungbok y malbok— caen con unos diez días de diferencia según el calendario tradicional.|Les trois jours — chobok, jungbok et malbok — tombent à environ dix jours d'intervalle selon le calendrier traditionnel.|初伏・中伏・末伏の三日は伝統暦でおよそ10日おきに巡ってくる。参鶏湯の店はまさにその日に一年でも指折りの行列ができる。",
  ),
  q(
    7,
    "What was the elaborate royal court table setting, prepared for the king and inspected by a food taster before each meal for signs of poisoning?|¿Cuál era el elaborado servicio de mesa de la corte real, preparado para el rey e inspeccionado por un catador antes de cada comida en busca de signos de envenenamiento?|Quel était l'élaboré service de table de la cour royale, préparé pour le roi et inspecté par un goûteur avant chaque repas pour détecter tout signe d'empoisonnement ?|王のために用意され、毒見役が毒の兆候を毎食前に確かめた、手の込んだ宮中の食卓は?",
    ["Surasang|Surasang|Surasang|水刺床(スラサン)", "Bapsang|Bapsang|Bapsang|飯床(パプサン)", "Gyoja-sang|Gyoja-sang|Gyoja-sang|交子床(キョジャサン)"],
    0,
    "A full surasang could include a dozen side dishes representing regions and seasons across the kingdom, and the ritual of tasting each dish first, silver chopsticks included, was meant to detect poison by the metal's tarnish as much as by taste.|Un surasang completo podía incluir una docena de guarniciones que representaban regiones y estaciones del reino, y el ritual de probar antes cada plato pretendía detectar veneno.|Un surasang complet pouvait comprendre une douzaine d'accompagnements représentant régions et saisons du royaume, et le rituel de goûter chaque plat visait à détecter le poison.|完全な水刺床には、王国の各地方と季節を表す十数種の副菜が並ぶこともあった。銀の箸も含め毎皿を先に味見する儀礼は、味だけでなく銀の変色でも毒を見抜く狙いがあった。",
  ),
  q(
    8,
    "What is the term for the vivid, multicoloured decorative paintwork found on the wooden eaves and beams of Korean palaces and temples?|¿Cómo se llama la pintura decorativa multicolor y vívida que se encuentra en los aleros y vigas de madera de los palacios y templos coreanos?|Comment appelle-t-on la peinture décorative multicolore et vive que l'on trouve sur les avant-toits et poutres en bois des palais et temples coréens ?|韓国の宮殿や寺院の木造の軒や梁に見られる、鮮やかな多色の装飾彩色を何と呼ぶか?",
    ["Minhwa|Minhwa|Minhwa|民画(ミンファ)", "Dancheong|Dancheong|Dancheong|丹青(タンチョン)", "Bunjang|Bunjang|Bunjang|粉粧(プンジャン)"],
    1,
    "Beyond decoration, the paint's mineral pigments were traditionally believed to help protect the timber from insects and weathering, and specific colour combinations were reserved for buildings of different rank, from royal palaces down to village shrines.|Más allá de la decoración, se creía tradicionalmente que los pigmentos minerales de la pintura ayudaban a proteger la madera de insectos y meteorización.|Au-delà de la décoration, les pigments minéraux de la peinture étaient traditionnellement censés protéger le bois des insectes et des intempéries.|装飾以上に、この鉱物顔料は伝統的に木材を虫や風化から守るとも信じられていた。色の組み合わせは建物の格によって決められ、王宮から村の祠堂まで使い分けられた。",
  ),
  q(
    7,
    "What is the collection of over 81,000 wooden printing blocks carved in the 13th century to reproduce the entire Buddhist canon, preserved at Haeinsa temple?|¿Cuál es la colección de más de 81.000 bloques de impresión de madera tallados en el siglo XIII para reproducir todo el canon budista, conservada en el templo de Haeinsa?|Quelle est la collection de plus de 81 000 blocs d'impression en bois gravés au XIIIe siècle pour reproduire l'intégralité du canon bouddhique, conservée au temple de Haeinsa ?|13世紀に仏教経典全体を刻んだ8万枚を超える木版で、海印寺に保管されているものは?",
    ["Tripitaka Koreana|Tripitaka Koreana|Tripitaka Koreana|高麗大蔵経(八万大蔵経)", "Jikji|Jikji|Jikji|直指(チクチ)", "Hunminjeongeum Haerye|Hunminjeongeum Haerye|Hunminjeongeum Haerye|訓民正音解例"],
    0,
    "The blocks were carved as an act of Buddhist devotion during a Mongol invasion, in the belief that the effort would help protect the country, and the set is prized for having almost no errors across its roughly 52 million characters.|Los bloques se tallaron como acto de devoción budista durante una invasión mongola, con la creencia de que el esfuerzo ayudaría a proteger al país.|Les blocs furent gravés en acte de dévotion bouddhiste lors d'une invasion mongole, dans la croyance que cet effort aiderait à protéger le pays.|モンゴルの侵攻の最中、この労苦が国を守ると信じて仏教への帰依のしるしとして彫られた。およそ5,200万字にのぼりながら誤字がほとんど無いことでも評価が高い。",
  ),
  q(
    8,
    "According to Hunminjeongeum, the 15th-century document explaining Hangul, on what were the shapes of its basic consonant letters based?|Según el Hunminjeongeum, el documento del siglo XV que explica el hangul, ¿en qué se basaron las formas de sus letras consonánticas básicas?|Selon le Hunminjeongeum, le document du XVe siècle expliquant le hangeul, sur quoi les formes de ses lettres consonantiques de base étaient-elles fondées ?|ハングルを解説した15世紀の文献『訓民正音』によれば、基本子音の字形は何をもとにしたか?",
    ["The shapes of Chinese zodiac animals|Las formas de los animales del zodiaco chino|Les formes des animaux du zodiaque chinois|中国の十二支の動物の形", "The shapes of the mouth, tongue and throat when pronouncing each sound|Las formas de la boca, la lengua y la garganta al pronunciar cada sonido|Les formes de la bouche, de la langue et de la gorge en prononçant chaque son|各音を発音する際の口・舌・のどの形", "The positions of stars in the night sky|Las posiciones de las estrellas en el cielo nocturno|Les positions des étoiles dans le ciel nocturne|夜空の星の位置"],
    1,
    "This makes Hangul what linguists call a \"featural\" writing system, one of very few in the world where a letter's shape is designed to visually represent the physical act of making its sound, rather than descending from pictographs or an older alphabet.|Esto convierte al hangul en lo que los lingüistas llaman un sistema de escritura «rasgo a rasgo», uno de los pocos del mundo donde la forma de una letra representa visualmente el acto físico de producir su sonido.|Cela fait du hangeul ce que les linguistes appellent une écriture « featurale », l'une des rares au monde où la forme d'une lettre représente visuellement l'acte physique de produire son son.|これによりハングルは言語学者が「発音特徴文字」と呼ぶ体系になった。文字の形が、絵文字や古い文字体系の子孫としてではなく、その音を発する際の身体の動きを視覚的に写し取るよう設計された、世界でも数少ない例である。",
  ),
  q(
    8,
    "What is the name of the world's oldest surviving book printed with movable metal type, produced in Korea in 1377, more than 70 years before Gutenberg's press?|¿Cuál es el nombre del libro impreso con tipos móviles metálicos más antiguo que se conserva en el mundo, hecho en Corea en 1377, más de 70 años antes de la imprenta de Gutenberg?|Quel est le nom du plus ancien livre imprimé avec des caractères métalliques mobiles encore conservé au monde, produit en Corée en 1377, plus de 70 ans avant la presse de Gutenberg ?|1377年に朝鮮半島で作られ、グーテンベルクの印刷機より70年以上早い、現存する世界最古の金属活字印刷本は?",
    ["Jikji|Jikji|Jikji|直指(チクチ)", "Samguk Yusa|Samguk Yusa|Samguk Yusa|三国遺事", "Joseon Wangjo Sillok|Joseon Wangjo Sillok|Joseon Wangjo Sillok|朝鮮王朝実録"],
    0,
    "Only the second of its original two volumes survives, held today in the French National Library after being taken from Korea in the late 19th century, and it was added to UNESCO's Memory of the World register in 2001.|Solo sobrevive el segundo de sus dos volúmenes originales, conservado hoy en la Biblioteca Nacional de Francia tras ser sacado de Corea a finales del siglo XIX.|Seul le second de ses deux volumes originaux subsiste, conservé aujourd'hui à la Bibliothèque nationale de France après avoir été emporté de Corée à la fin du XIXe siècle.|もとの2巻のうち下巻だけが現存し、19世紀末に朝鮮から持ち出されたのち、いまはフランス国立図書館に収められている。2001年にユネスコ「世界の記憶」に登録された。",
  ),
  q(
    8,
    "What is the ancestral ritual music still performed at Seoul's Jongmyo shrine, believed to be one of the world's oldest continuously performed court rituals?|¿Cuál es la música ritual ancestral que aún se interpreta en el santuario de Jongmyo en Seúl, considerada uno de los rituales cortesanos en curso más antiguos del mundo?|Quelle est la musique rituelle ancestrale encore jouée au sanctuaire de Jongmyo à Séoul, considérée comme l'un des plus anciens rituels de cour encore pratiqués au monde ?|世界最古級の宮廷儀礼とされ、ソウルの宗廟でいまも演じられる祖先祭祀の音楽は?",
    ["Jongmyo Jeryeak|Jongmyo Jeryeak|Jongmyo Jeryeak|宗廟祭礼楽", "Sanjo|Sanjo|Sanjo|散調(サンジョ)", "Pungmul|Pungmul|Pungmul|風物(プンムル)"],
    0,
    "Composed in the 15th century and performed with dance, chant and a full court orchestra, the ritual and its music were jointly inscribed by UNESCO in 2001, one of the first Korean traditions to receive that recognition.|Compuesta en el siglo XV e interpretada con danza, canto y una orquesta cortesana completa, el ritual y su música fueron inscritos conjuntamente por la UNESCO en 2001.|Composée au XVe siècle et interprétée avec danse, chant et un orchestre de cour complet, le rituel et sa musique furent inscrits conjointement par l'UNESCO en 2001.|15世紀に作られ、舞と詠唱、宮廷楽団の演奏を伴うこの祭礼と音楽は、2001年にユネスコに登録された、この種の認定を受けた最初期の韓国の伝統の一つである。",
  ),
  q(
    8,
    "What is the traditional name for the prized jade-green glaze colour of Goryeo-dynasty celadon, said by a 12th-century Chinese visitor to be \"first under heaven\"?|¿Cuál es el nombre tradicional del preciado color esmalte verde jade de la cerámica celadón de la dinastía Goryeo, calificado por un visitante chino del siglo XII como «el primero bajo el cielo»?|Quel est le nom traditionnel de la précieuse couleur de glaçure vert jade du céladon de la dynastie Goryeo, qualifiée par un visiteur chinois du XIIe siècle de « premier sous le ciel » ?|12世紀の中国人来訪者が「天下第一」と評したと伝わる、高麗青磁の珍重された翡翠色の釉薬の名は?",
    ["Baekja|Baekja|Baekja|白磁(ペクチャ)", "Bisaek|Bisaek|Bisaek|翡色(ビセク)", "Buncheong|Buncheong|Buncheong|粉青(プンチョン)"],
    1,
    "Bisaek, literally \"kingfisher colour\", was achieved through a closely guarded firing process, and the technique for reproducing the exact original shade was largely lost after the Goryeo dynasty fell, only partially reconstructed by modern potters through trial and error.|Bisaek, literalmente «color martín pescador», se lograba con un proceso de cocción celosamente guardado, y la técnica para reproducir el tono original exacto se perdió en gran parte tras la caída de la dinastía Goryeo.|Bisaek, littéralement « couleur martin-pêcheur », s'obtenait par un procédé de cuisson jalousement gardé, et la technique pour reproduire la teinte originale exacte fut en grande partie perdue après la chute de la dynastie Goryeo.|文字どおり「カワセミ色」を意味する翡色は、厳重に秘された焼成法によって生まれた。高麗の滅亡後この技法はほぼ失われ、現代の陶工が試行錯誤で部分的に再現しているにすぎない。",
  ),
  q(
    8,
    "What was the royal research institute founded by King Sejong, where scholars developed Hangul among other scientific and scholarly projects?|¿Cuál fue el instituto real de investigación fundado por el rey Sejong, donde los eruditos desarrollaron el hangul entre otros proyectos científicos y académicos?|Quel fut l'institut royal de recherche fondé par le roi Sejong, où des lettrés développèrent le hangeul parmi d'autres projets scientifiques et savants ?|世宗大王が設けた王立の研究機関で、学者たちがハングルなどの学術・科学の事業を進めた場所は?",
    ["Jiphyeonjeon (Hall of Worthies)|Jiphyeonjeon (Salón de los Sabios)|Jiphyeonjeon (Pavillon des sages)|集賢殿(チッピョンジョン)", "Seonggyungwan|Seonggyungwan|Seonggyungwan|成均館(ソンギュングァン)", "Hongmungwan|Hongmungwan|Hongmungwan|弘文館(ホンムングァン)"],
    0,
    "Scholars appointed to the Jiphyeonjeon were given generous leave to study and were even, according to court records, sometimes found asleep at their desks by the king himself, who reportedly covered them with his own coat rather than wake them.|A los eruditos designados al Jiphyeonjeon se les concedían generosas licencias para estudiar, y según los registros de la corte, el propio rey los encontró alguna vez dormidos en su escritorio.|Les lettrés nommés au Jiphyeonjeon se voyaient accorder de généreux congés d'étude, et selon les archives de la cour, le roi les aurait parfois trouvés endormis à leur bureau.|集賢殿に任じられた学者たちには学問のための手厚い休暇が与えられ、宮廷の記録によれば、王自身が机で眠り込んだ学者を見つけ、起こさずに自分の上着を掛けてやったこともあったという。",
  ),
  q(
    8,
    "What are Korea's extensive tidal mudflats on the west and south coasts, inscribed as a UNESCO World Heritage site in 2021 for their exceptional biodiversity?|¿Cuáles son los extensos llanos de marea de Corea en las costas oeste y sur, inscritos como Patrimonio Mundial de la UNESCO en 2021 por su excepcional biodiversidad?|Quels sont les vastes vasières intertidales de Corée sur les côtes ouest et sud, inscrites au patrimoine mondial de l'UNESCO en 2021 pour leur biodiversité exceptionnelle ?|2021年、卓越した生物多様性を理由にユネスコ世界遺産に登録された、韓国西岸・南岸の広大な干潟は?",
    ["Getbol|Getbol|Getbol|갯벌(ケッポル)", "Sanjiwon|Sanjiwon|Sanjiwon|山地園(サンジウォン)", "Nakdong-ho|Nakdong-ho|Nakdong-ho|낙동호(ナクトンホ)"],
    0,
    "The inscribed sites cover four separate areas, chosen to represent different mudflat types, and serve as a critical stopover for millions of migratory shorebirds travelling the East Asian-Australasian flyway each year.|Los lugares inscritos abarcan cuatro áreas distintas, elegidas para representar diferentes tipos de marisma, y sirven de escala crucial para millones de aves playeras migratorias.|Les sites inscrits couvrent quatre zones distinctes, choisies pour représenter différents types de vasières, et servent d'escale cruciale pour des millions d'oiseaux limicoles migrateurs.|登録地は異なる干潟の型を代表する4か所からなり、東アジア・オーストラリア地域の渡り経路を毎年たどる何百万羽ものシギ・チドリ類にとって欠かせない中継地になっている。",
  ),
  q(
    8,
    "Traditional Korean bronze bells are noted for a unique acoustic feature not found on Chinese or Japanese temple bells: a short hollow tube built into the top. What is it believed to do?|Las campanas de bronce coreanas tradicionales destacan por una característica acústica única, ausente en las campanas chinas o japonesas: un tubo hueco corto en la parte superior. ¿Qué se cree que hace?|Les cloches de bronze coréennes traditionnelles se distinguent par une particularité acoustique absente des cloches chinoises ou japonaises : un court tube creux au sommet. Que serait censé faire ce tube ?|中国や日本の梵鐘には無い、韓国の伝統的な釣鐘だけの音響上の特徴として、頂部に短い中空の筒が付いている。これは何をすると考えられているか?",
    ["Release trapped, unwanted overtones to purify the tone|Liberar armónicos sobrantes atrapados para purificar el tono|Libérer les harmoniques indésirables piégées pour purifier le son|余分な倍音を逃がして音を澄ませるため", "Let rainwater drain out of the bell|Dejar que salga el agua de lluvia de la campana|Laisser l'eau de pluie s'écouler de la cloche|鐘にたまった雨水を排出するため", "Allow the bell to be hung from a single point|Permitir colgar la campana de un solo punto|Permettre d'accrocher la cloche à un seul point|一点から鐘を吊るせるようにするため"],
    0,
    "Known as a yongtong, the tube's exact acoustic function is still debated by researchers, but the leading theory is that it vents certain resonant frequencies to produce the long, layered, wavering hum for which Korean bells such as the Divine Bell of King Seongdeok are famous.|Conocido como yongtong, la función acústica exacta del tubo todavía se debate entre investigadores, pero la teoría principal es que libera ciertas frecuencias resonantes.|Connu sous le nom de yongtong, la fonction acoustique exacte du tube fait encore débat parmi les chercheurs, mais la théorie dominante est qu'il évacue certaines fréquences résonantes.|「甬筒(ヨントン)」と呼ばれるこの筒の正確な音響的な働きはいまも研究者の間で論争があるが、有力な説では、ある種の共鳴周波数を逃がすことで、聖徳大王神鐘に代表される韓国の鐘特有の長く尾を引くうねる残響を生み出しているとされる。",
  ),
  q(
    8,
    "Before adopting the Gregorian calendar in 1896, Korea followed a lunisolar calendar system shared with much of East Asia. What did it combine to track time?|Antes de adoptar el calendario gregoriano en 1896, Corea seguía un sistema de calendario lunisolar compartido con buena parte de Asia oriental. ¿Qué combinaba para seguir el tiempo?|Avant d'adopter le calendrier grégorien en 1896, la Corée suivait un système de calendrier luni-solaire partagé avec une grande partie de l'Asie de l'Est. Que combinait-il pour suivre le temps ?|1896年にグレゴリオ暦を採用する前、韓国は東アジアの多くと共通する太陰太陽暦に従っていた。この暦は時をどう数えていたか?",
    ["Lunar months adjusted with leap months to stay aligned with the solar year|Meses lunares ajustados con meses bisiestos para mantenerse alineados con el año solar|Des mois lunaires ajustés par des mois intercalaires pour rester alignés sur l'année solaire|太陽年に合わせてうるう月を挟む太陰暦", "A purely solar count with no reference to the moon|Un cómputo puramente solar sin referencia a la luna|Un décompte purement solaire, sans référence à la lune|月を一切参照しない太陽暦のみ", "A 10-day week repeated year-round|Una semana de 10 días repetida todo el año|Une semaine de 10 jours répétée toute l'année|一年を通じて繰り返す10日間の週"],
    0,
    "Because twelve lunar months fall about eleven days short of a solar year, an extra leap month was inserted roughly every three years to keep the calendar from drifting out of step with the seasons — the same basic method still used to fix the date of Lunar New Year today.|Como doce meses lunares se quedan unos once días cortos de un año solar, se insertaba un mes bisiesto extra cada tres años aproximadamente.|Comme douze mois lunaires sont environ onze jours plus courts qu'une année solaire, un mois intercalaire supplémentaire était inséré environ tous les trois ans.|太陰暦の12か月は太陽年よりおよそ11日短くなるため、およそ3年に一度うるう月を挟んで季節とのずれを防いだ。この基本の仕組みは、いまも旧正月の日付を決める際に使われている。",
  ),

  // --- 難易度9〜10(専門に近い水準) ---
  q(
    9,
    "Pansori, Korea's epic solo narrative singing form, developed distinct regional performance schools. What is the general term for these schools, distinguished by vocal style and home region?|El pansori, la forma épica coreana de canto narrativo en solitario, desarrolló escuelas regionales de interpretación diferenciadas. ¿Cuál es el término general para estas escuelas, distinguidas por estilo vocal y región de origen?|Le pansori, forme épique coréenne de chant narratif en solo, développa des écoles d'interprétation régionales distinctes. Quel est le terme général pour ces écoles, distinguées par le style vocal et la région d'origine ?|独唱の語り物であるパンソリには、地域ごとに異なる歌唱の流派が発達した。声の出し方や出身地方で区別されるこの流派を指す一般的な語は?",
    ["Je|Je|Je|제(制)", "Pa|Pa|Pa|파(派)", "Ryu|Ryu|Ryu|류(流)"],
    0,
    "The two best-known schools, Dongpyeonje (\"eastern style\") and Seopyeonje (\"western style\"), are traditionally described as differing in the east's more forceful, angular delivery against the west's more delicate, flowing ornamentation, named for their regions relative to the Seomjin River in Jeolla.|Las dos escuelas más conocidas, Dongpyeonje («estilo oriental») y Seopyeonje («estilo occidental»), se describen tradicionalmente como distintas en su interpretación.|Les deux écoles les plus connues, Dongpyeonje (« style oriental ») et Seopyeonje (« style occidental »), se décrivent traditionnellement comme distinctes dans leur interprétation.|最もよく知られる二つの流派、東便制(東の様式)と西便制(西の様式)は、東が力強く角張った歌い回し、西が繊細で流れるような装飾を持つとされ、全羅道の蟾津江を挟んだ東西の出身地にちなんで名付けられている。",
  ),
  q(
    9,
    "Hangul was invented by 1443 but not made public until 1446, when it was formally promulgated alongside an explanatory document. What is this gap usually explained by?|El hangul se inventó hacia 1443 pero no se hizo público hasta 1446, cuando se promulgó formalmente junto a un documento explicativo. ¿Cómo se suele explicar esta diferencia?|Le hangeul fut inventé vers 1443 mais ne fut rendu public qu'en 1446, date de sa promulgation officielle accompagnée d'un document explicatif. Comment explique-t-on généralement cet écart ?|ハングルは1443年ごろに完成したが、公布は解説書とともに1446年になってからだった。この間の年月は一般にどう説明されるか?",
    ["The years needed to write and test the explanatory commentary, Hunminjeongeum Haerye|Los años necesarios para escribir y probar el comentario explicativo, Hunminjeongeum Haerye|Les années nécessaires pour rédiger et tester le commentaire explicatif, le Hunminjeongeum Haerye|解説書『訓民正音解例』を著し検証するのに要した年月", "A ban on the script during those years by conservative officials|Una prohibición de la escritura durante esos años por funcionarios conservadores|Une interdiction de l'écriture durant ces années par des fonctionnaires conservateurs|保守的な官吏によるこの間の使用禁止", "A delay caused by a shortage of printing paper|Un retraso causado por escasez de papel de imprenta|Un retard dû à une pénurie de papier d'imprimerie|印刷用紙の不足による遅れ"],
    0,
    "The explanatory volume, written by Sejong's scholars to justify and teach the new script, is what today lets linguists say with confidence exactly how and why each letter was designed the way it was.|El volumen explicativo, escrito por los eruditos de Sejong para justificar y enseñar la nueva escritura, es lo que hoy permite a los lingüistas afirmar con seguridad exactamente cómo y por qué se diseñó cada letra.|Le volume explicatif, rédigé par les lettrés de Sejong pour justifier et enseigner la nouvelle écriture, est ce qui permet aujourd'hui aux linguistes d'affirmer avec certitude comment et pourquoi chaque lettre fut conçue ainsi.|世宗の学者たちが新しい文字を正当化し教えるために著したこの解説書のおかげで、いまの言語学者は各文字がどのように、なぜそう設計されたかを確信を持って語ることができる。",
  ),
  q(
    9,
    "Hangul originally had more letters than the 24 in common use today. How many letters did the 1446 Hunminjeongeum document originally set out?|El hangul tenía originalmente más letras que las 24 de uso común hoy. ¿Cuántas letras estableció originalmente el documento Hunminjeongeum de 1446?|Le hangeul comptait à l'origine plus de lettres que les 24 d'usage courant aujourd'hui. Combien de lettres le document Hunminjeongeum de 1446 en établissait-il à l'origine ?|ハングルは、いま常用される24字より本来多くの文字を持っていた。1446年の『訓民正音』が定めた本来の文字数はいくつか?",
    ["28|28|28|28字", "32|32|32|32字", "40|40|40|40字"],
    0,
    "Four of the original letters, including one representing a glottal sound and one used mainly for foreign loanwords, fell out of everyday use over the following centuries and are now considered obsolete outside of historical and linguistic study.|Cuatro de las letras originales, incluida una que representaba un sonido glotal y otra usada sobre todo en préstamos extranjeros, cayeron en desuso.|Quatre des lettres originales, dont une représentant un son glottal et une autre utilisée surtout pour les emprunts étrangers, tombèrent en désuétude.|声門音を表す文字や、主に外来語に使われた文字を含む4字は、その後の数世紀で日常使いから外れ、いまでは歴史・言語学研究以外では使われない古字とされている。",
  ),
  q(
    9,
    "In traditional Korean folk paintings (minhwa), a tiger is frequently shown alongside which other animal, in a pairing meant to convey New Year good wishes and ward off evil?|En las pinturas folclóricas tradicionales coreanas (minhwa), un tigre aparece a menudo junto a qué otro animal, en un emparejamiento pensado para transmitir buenos deseos de año nuevo y ahuyentar el mal?|Dans les peintures folkloriques traditionnelles coréennes (minhwa), un tigre apparaît fréquemment aux côtés de quel autre animal, association censée transmettre des vœux de bonne année et repousser le mal ?|韓国の伝統的な民画では、新年の願いを込め邪気を払うとされる組み合わせとして、虎はどの動物としばしば一緒に描かれるか?",
    ["A crane|Una grulla|Une grue|鶴", "A magpie|Una urraca|Une pie|カササギ", "A carp|Una carpa|Une carpe|鯉"],
    1,
    "In these paintings the tiger is often drawn with an exaggeratedly comic, almost bumbling expression rather than a fearsome one, while the magpie perched above is read as the bearer of good news, a pairing scholars connect to satirising the powerful (the tiger) from the perspective of the common people (the magpie).|En estas pinturas, el tigre suele dibujarse con una expresión exageradamente cómica, casi torpe, en lugar de temible, mientras que la urraca posada arriba se interpreta como portadora de buenas noticias.|Dans ces peintures, le tigre est souvent dessiné avec une expression exagérément comique, presque maladroite, plutôt que redoutable, tandis que la pie perchée au-dessus est lue comme porteuse de bonnes nouvelles.|これらの絵で虎はしばしば、恐ろしげというよりむしろ大げさに間の抜けた滑稽な表情で描かれ、上にとまるカササギは吉報を運ぶ存在とされる。研究者はこれを、庶民(カササギ)の視点から権力者(虎)を風刺したものと結びつけている。",
  ),
  q(
    9,
    "The traditional East Asian sexagenary cycle, combining ten \"heavenly stems\" with twelve \"earthly branches\", produces a repeating cycle of how many years — the basis for the hwangap, or 60th-birthday celebration?|El ciclo sexagenario tradicional de Asia oriental, que combina diez «troncos celestes» con doce «ramas terrestres», produce un ciclo repetido de cuántos años, base de la celebración hwangap del sexagésimo cumpleaños?|Le cycle sexagénaire traditionnel est-asiatique, combinant dix « troncs célestes » et douze « rameaux terrestres », produit un cycle répété de combien d'années, base de la célébration hwangap du 60e anniversaire ?|10の「天干」と12の「地支」を組み合わせる東アジアの伝統的な干支の周期は、還暦(60歳の祝い)の由来となる何年周期を生むか?",
    ["50|50|50|50年", "60|60|60|60年", "72|72|72|72年"],
    1,
    "Ten and twelve share a lowest common multiple of sixty, so it takes sixty years for a given stem-branch pairing to recur, meaning a person reaching their 60th birthday returns to the same named year they were born in — historically a significant milestone when fewer people lived that long.|Diez y doce comparten un mínimo común múltiplo de sesenta, así que se tardan sesenta años en que se repita un mismo par de tronco y rama.|Dix et douze partagent un plus petit commun multiple de soixante, si bien qu'il faut soixante ans pour qu'une même paire tronc-rameau se répète.|10と12の最小公倍数は60なので、同じ干支の組み合わせが巡ってくるまでに60年かかる。60歳の誕生日を迎えた人は生まれた年と同じ干支の年に戻ることになり、多くの人がそこまで長生きしなかった時代には重要な節目とされた。",
  ),
  q(
    9,
    "In 1441, a device credited to Korean scientists became the world's first standardised instrument for measuring rainfall, predating similar European instruments by about two centuries. What was it called?|En 1441, un dispositivo atribuido a científicos coreanos se convirtió en el primer instrumento estandarizado del mundo para medir la lluvia, dos siglos antes que instrumentos europeos similares. ¿Cómo se llamaba?|En 1441, un dispositif attribué à des scientifiques coréens devint le premier instrument normalisé au monde pour mesurer les précipitations, deux siècles avant des instruments européens similaires. Comment s'appelait-il ?|1441年、朝鮮の科学者たちの功績とされ、ヨーロッパの同様の器具よりおよそ2世紀早い、世界初の規格化された雨量計となった装置は何と呼ばれたか?",
    ["Honcheonui|Honcheonui|Honcheonui|渾天儀(ホンチョヌィ)", "Cheugugi|Cheugugi|Cheugugi|測雨器(チュグギ)", "Angbu-ilgu|Angbu-ilgu|Angbu-ilgu|仰釜日晷(アンブイルグ)"],
    1,
    "Standardised bronze cheugugi were distributed to towns across the country to collect consistent local rainfall data, part of a broader push under King Sejong to improve agricultural planning through more accurate observation.|Se distribuyeron cheugugi de bronce estandarizados por pueblos de todo el país para recoger datos de lluvia locales consistentes.|Des cheugugi de bronze normalisés furent distribués dans les villes du pays pour recueillir des données pluviométriques locales cohérentes.|規格化された青銅製の測雨器は全国の町々に配られ、各地で一貫した降雨データを集めた。より正確な観測で農業計画を改善しようとした世宗大王期の広い取り組みの一環である。",
  ),
  q(
    9,
    "Which Joseon-era medical text, compiled under King Sejong, deliberately favoured locally available Korean herbs and remedies over imported Chinese prescriptions?|¿Qué texto médico de la era Joseon, compilado bajo el rey Sejong, favoreció deliberadamente las hierbas y remedios coreanos disponibles localmente frente a las recetas chinas importadas?|Quel texte médical de l'ère Joseon, compilé sous le roi Sejong, privilégia délibérément les herbes et remèdes coréens disponibles localement plutôt que les prescriptions chinoises importées ?|世宗大王の代に編まれ、輸入の中国処方より現地で入手できる朝鮮の薬草・処方をあえて重んじた医学書は?",
    ["Dongui Bogam|Dongui Bogam|Dongui Bogam|東医宝鑑(トンイボガム)", "Hyangyak Jipseongbang|Hyangyak Jipseongbang|Hyangyak Jipseongbang|郷薬集成方(ヒャンヤクチプソンバン)", "Uibang Yuchwi|Uibang Yuchwi|Uibang Yuchwi|医方類聚(ウィバンユチュィ)"],
    1,
    "Compiled in 1433, the text reflected a broader early-Joseon push toward self-reliance, gathering remedies using ingredients that grew locally so that treatment did not depend on expensive imported Chinese materials.|Compilado en 1433, el texto reflejaba un impulso más amplio de la temprana Joseon hacia la autosuficiencia, reuniendo remedios con ingredientes que crecían localmente.|Compilé en 1433, ce texte reflétait un élan plus large du début de la dynastie Joseon vers l'autosuffisance, rassemblant des remèdes à base d'ingrédients poussant localement.|1433年に編まれたこの書は、朝鮮初期に広くみられた自立志向を反映し、現地で育つ材料を使う処方を集めた。輸入の高価な中国産の材料に頼らずに治療できるようにする狙いだった。",
  ),
  q(
    9,
    "The Annals of the Joseon Dynasty record the daily affairs of the court across the entire dynasty, compiled reign by reign and never altered afterward. Roughly how many years of continuous rule do they cover?|Los Anales de la dinastía Joseon registran los asuntos diarios de la corte a lo largo de toda la dinastía, compilados reinado por reinado y nunca alterados después. ¿Aproximadamente cuántos años de gobierno continuo cubren?|Les Annales de la dynastie Joseon consignent les affaires quotidiennes de la cour tout au long de la dynastie, compilées règne par règne et jamais modifiées ensuite. Combien d'années de règne continu couvrent-elles environ ?|朝鮮王朝実録は、王朝を通じて代替わりごとに編まれ、その後決して手を加えられなかった宮廷の日々の記録である。およそ何年にわたる治世を記しているか?",
    ["About 130 years|Unos 130 años|Environ 130 ans|約130年", "About 250 years|Unos 250 años|Environ 250 ans|約250年", "About 470 years|Unos 470 años|Environ 470 ans|約470年"],
    2,
    "Covering 25 kings from the dynasty's founding in 1392 to the late 19th century, the Annals run to well over a thousand volumes and were inscribed on UNESCO's Memory of the World register in 1997, prized for the strict rule that not even the reigning king was allowed to read the record of his own reign.|Cubriendo a 25 reyes desde la fundación de la dinastía en 1392 hasta finales del siglo XIX, los Anales superan los mil volúmenes.|Couvrant 25 rois depuis la fondation de la dynastie en 1392 jusqu'à la fin du XIXe siècle, les Annales dépassent le millier de volumes.|1392年の王朝創建から19世紀末まで25代の王を記し、実録は千巻をゆうに超える。1997年にユネスコ「世界の記憶」に登録された。在位中の王でさえ自らの治世の記録を読むことを許されなかった、という厳格な規則でも知られる。",
  ),
  q(
    10,
    "Which figure is traditionally credited as the scientist who built Korea's 1441 standardised rain gauge, despite having been born into the lowest, government-slave class?|¿A qué figura se atribuye tradicionalmente la construcción del pluviómetro estandarizado coreano de 1441, pese a haber nacido en la clase más baja, la de esclavos del gobierno?|Quelle figure est traditionnellement créditée d'avoir construit le pluviomètre normalisé coréen de 1441, bien que né dans la classe la plus basse, celle des esclaves du gouvernement ?|1441年の規格化された雨量計を作ったとされる人物は、最下層である官奴婢の身分に生まれながらその功績を残したとされるが、それは誰か?",
    ["Jang Yeong-sil|Jang Yeong-sil|Jang Yeong-sil|蔣英実(チャン・ヨンシル)", "Heo Jun|Heo Jun|Heo Jun|許浚(ホ・ジュン)", "Yi Hwang|Yi Hwang|Yi Hwang|李滉(イ・ファン)"],
    0,
    "Recognising his talent, King Sejong had Jang freed from slave status and appointed him to court, where he went on to design astronomical instruments and a self-striking water clock — an unusually steep rise for the rigid class system of the time.|Al reconocer su talento, el rey Sejong hizo liberar a Jang de su condición de esclavo y lo nombró en la corte, donde llegó a diseñar instrumentos astronómicos y un reloj de agua autopercutor.|Reconnaissant son talent, le roi Sejong fit libérer Jang de son statut d'esclave et le nomma à la cour, où il conçut ensuite des instruments astronomiques et une horloge à eau à sonnerie automatique.|その才を見出した世宗大王は蔣英実を奴婢の身分から解き放ち宮廷に迎えた。彼はのちに天文観測の器具や自動で時を告げる水時計まで設計するに至った。当時の厳格な身分制度の中では異例の出世だった。",
  ),
  q(
    10,
    "Which ancient Korean kingdom is traditionally said to have unified most of the peninsula for the first time in 676 CE, with the help of Tang China, before later falling out with its former ally?|¿Qué antiguo reino coreano se dice tradicionalmente que unificó la mayor parte de la península por primera vez en el año 676, con ayuda de la China Tang, antes de enemistarse después con su antiguo aliado?|Quel ancien royaume coréen est traditionnellement dit avoir unifié la majeure partie de la péninsule pour la première fois en 676 apr. J.-C., avec l'aide de la Chine des Tang, avant de se brouiller ensuite avec son ancien allié ?|唐の助けを借りて676年に初めて半島の大部分を統一したとされ、のちにその同盟相手と対立するに至った古代朝鮮の王国は?",
    ["Baekje|Baekje|Baekje|百済(ペクチェ)", "Goguryeo|Goguryeo|Goguryeo|高句麗(コグリョ)", "Silla|Silla|Silla|新羅(シルラ)"],
    2,
    "Silla's alliance with Tang China defeated the rival kingdoms of Baekje and Goguryeo in the 660s, but Silla then fought its former ally to push Tang forces off the peninsula entirely, completing what historians call the Silla unification.|La alianza de Silla con la China Tang derrotó a los reinos rivales de Baekje y Goguryeo en la década de 660, pero Silla luego combatió contra su antiguo aliado.|L'alliance de Silla avec la Chine des Tang vainquit les royaumes rivaux de Baekje et de Goguryeo dans les années 660, mais Silla combattit ensuite son ancien allié.|新羅と唐の同盟は660年代にライバルの百済と高句麗を破ったが、その後新羅はかつての同盟相手である唐と戦い、半島から唐の勢力を完全に押し出した。歴史家が「新羅の統一」と呼ぶ経緯である。",
  ),
  q(
    10,
    "After Goguryeo fell, a successor state rose in the north, ruled by a former Goguryeo general and made up of both Goguryeo refugees and Mohe peoples, controlling territory stretching well into present-day Manchuria and Russia's Far East. What was it called?|Tras la caída de Goguryeo, en el norte surgió un estado sucesor, gobernado por un antiguo general de Goguryeo y formado por refugiados de Goguryeo y pueblos Mohe, con territorio que se extendía hasta la actual Manchuria y el Lejano Oriente ruso. ¿Cómo se llamaba?|Après la chute de Goguryeo, un État successeur se leva au nord, dirigé par un ancien général de Goguryeo et composé de réfugiés de Goguryeo et de peuples Mohe, avec un territoire s'étendant jusqu'en Mandchourie actuelle et dans l'Extrême-Orient russe. Comment s'appelait-il ?|高句麗の滅亡後、北方に興った後継国家は、元高句麗の将軍が治め、高句麗の遺民と靺鞨の人々からなり、現在の満洲やロシア極東にまで及ぶ領域を支配した。その国名は?",
    ["Balhae|Balhae|Balhae|渤海(パルヘ)", "Buyeo|Buyeo|Buyeo|夫余(プヨ)", "Gaya|Gaya|Gaya|伽耶(カヤ)"],
    0,
    "Founded around 698 CE, Balhae lasted over two centuries and is claimed as part of national history by both Korea and China today, a disputed legacy that reflects how much of its territory now lies outside the modern Korean peninsula.|Fundado hacia el año 698, Balhae duró más de dos siglos y hoy tanto Corea como China lo reclaman como parte de su historia nacional.|Fondé vers 698, Balhae dura plus de deux siècles et est aujourd'hui revendiqué comme partie de l'histoire nationale par la Corée et la Chine.|698年ごろに建てられた渤海は2世紀以上続き、いまも韓国と中国の双方が自国史の一部として位置づけている。その領域の多くが現在の朝鮮半島の外にあることを映した係争である。",
  ),
  q(
    10,
    "Korea's earliest kingdom, Gojoseon, has a founding date that appears in later chronicles but is treated by historians as legend rather than verified fact. What year is traditionally given for its founding?|El reino más antiguo de Corea, Gojoseon, tiene una fecha de fundación que aparece en crónicas posteriores pero que los historiadores tratan como leyenda y no como hecho verificado. ¿Qué año se da tradicionalmente para su fundación?|Le plus ancien royaume de Corée, Gojoseon, a une date de fondation qui figure dans des chroniques ultérieures mais que les historiens traitent comme une légende plutôt qu'un fait vérifié. Quelle année est traditionnellement donnée pour sa fondation ?|韓国最古の王国とされる古朝鮮には、後世の史書に記されているものの歴史家が史実ではなく伝承として扱う建国年がある。伝承上、その建国年とされるのはいつか?",
    ["2333 BCE|2333 a.C.|2333 av. J.-C.|紀元前2333年", "1122 BCE|1122 a.C.|1122 av. J.-C.|紀元前1122年", "108 BCE|108 a.C.|108 av. J.-C.|紀元前108年"],
    0,
    "The date comes from the Dangun foundation myth, first recorded centuries later in a 13th-century Buddhist history text, and while its precise year is not treated as verified history, October 3rd is still marked today as National Foundation Day in reference to it.|La fecha procede del mito fundacional de Dangun, registrado por primera vez siglos después en un texto histórico budista del siglo XIII.|La date provient du mythe fondateur de Dangun, consigné pour la première fois des siècles plus tard dans un texte historique bouddhiste du XIIIe siècle.|この年代は、何世紀も後の13世紀の仏教史書に初めて記された檀君神話に由来する。史実として確かめられた年代ではないが、いまも10月3日は開天節としてこれにちなんで祝われている。",
  ),

  // --- 難易度4〜7 補い(2026-08-14 追加分) ---
  q(
    6,
    "Traditional Korean geomancy treats the peninsula's mountains as a single unbroken ridge running from Baekdusan on the northern border down to Jirisan in the south, rather than as separate ranges. What is this continuous mountain spine called?|La geomancia tradicional coreana trata las montañas de la península como una única cresta ininterrumpida que va desde el Baekdusan, en la frontera norte, hasta el Jirisan, en el sur, en lugar de tratarlas como cordilleras separadas. ¿Cómo se llama esta columna montañosa continua?|La géomancie traditionnelle coréenne considère les montagnes de la péninsule comme une seule crête ininterrompue allant du Baekdusan, à la frontière nord, jusqu'au Jirisan, au sud, plutôt que comme des chaînes séparées. Comment appelle-t-on cette colonne montagneuse continue?|韓国の伝統的な風水では、半島の山々を別々の山脈としてではなく、北の国境にある白頭山から南の智異山まで途切れず続く一本の稜線として捉える。この連なりは何と呼ばれるか?",
    ["Taebaek Range|Cordillera Taebaek|Chaîne du Taebaek|太白山脈", "Sobaek Range|Cordillera Sobaek|Chaîne du Sobaek|小白山脈", "Baekdudaegan|Baekdudaegan|Baekdudaegan|白頭大幹"],
    2,
    "This traditional concept, mapped in detail in an 18th-century Joseon document, differs from the Western-derived geological range names introduced during the early 20th century, which split the same terrain into separate named ranges based on rock structure rather than an unbroken ridge.|Este concepto tradicional, cartografiado en detalle en un documento de la Joseon del siglo XVIII, difiere de los nombres de cordilleras de origen occidental introducidos a comienzos del siglo XX.|Ce concept traditionnel, cartographié en détail dans un document Joseon du XVIIIe siècle, diffère des noms de chaînes d'origine occidentale introduits au début du XXe siècle.|18世紀の朝鮮の文書に詳しく描かれたこの伝統的な捉え方は、20世紀初頭に持ち込まれた、地質構造をもとに同じ地形を別々の山脈名に分ける西洋由来の呼び方とは異なるものである。",
  ),
  q(
    5,
    "What is the name of Korea's traditional underfloor heating system, in which smoke and heat from a fire are channelled through passages beneath the floor to warm a room from below?|¿Cómo se llama el sistema tradicional coreano de calefacción por suelo radiante, en el que el humo y el calor de un fuego se canalizan por conductos bajo el suelo para calentar una habitación desde abajo?|Comment s'appelle le système traditionnel coréen de chauffage par le sol, où la fumée et la chaleur d'un feu sont canalisées par des conduits sous le plancher pour chauffer une pièce par le dessous?|火の煙と熱を床下の通路に通し、部屋を下から温める韓国の伝統的な床暖房の仕組みは何と呼ばれるか?",
    ["Kotatsu|Kotatsu|Kotatsu|こたつ", "Kang|Kang|Kang|カン(炕)", "Ondol|Ondol|Ondol|オンドル"],
    2,
    "The structural principle behind ondol traces back over two thousand years, and while most modern homes now circulate hot water through pipes instead of channelling smoke directly, the habit of sitting and sleeping on a warm floor rather than in raised beds still shapes Korean furniture and house layout today.|El principio estructural del ondol se remonta a más de dos mil años, y aunque la mayoría de los hogares modernos hoy hacen circular agua caliente por tuberías en lugar de canalizar humo directamente.|Le principe structurel de l'ondol remonte à plus de deux mille ans, et bien que la plupart des foyers modernes fassent aujourd'hui circuler de l'eau chaude par des tuyaux plutôt que de canaliser directement la fumée.|オンドルの構造的な原理は2000年以上前にさかのぼる。いまの住宅の多くは煙を直接通す代わりに温水を配管で循環させているが、寝台ではなく温かい床の上に座り眠る習慣は、いまも韓国の家具や住まいの間取りを形づくっている。",
  ),
  q(
    6,
    "What is the traditional Korean three-line poetic form, each line built around a fixed rhythmic pattern of syllable groups and often ending with a twist or reversal in its final line?|¿Cuál es la forma poética tradicional coreana de tres versos, cada uno construido con un patrón rítmico fijo de grupos silábicos y que a menudo termina con un giro o inversión en el último verso?|Quelle est la forme poétique traditionnelle coréenne en trois vers, chacun construit sur un schéma rythmique fixe de groupes de syllabes, se terminant souvent par un retournement dans le dernier vers?|一定の音節のまとまりの律動で組み立てられた3行から成り、最後の行でしばしば転換や反転を見せる、韓国の伝統的な詩形は?",
    ["Haiku|Haiku|Haïku|俳句", "Tanka|Tanka|Tanka|短歌", "Sijo|Sijo|Sijo|時調(シジョ)"],
    2,
    "Sijo predates the invention of Hangul and was originally composed and transmitted orally or written in Chinese characters, later flourishing in Hangul; among its best-known authors is the 16th-century gisaeng poet Hwang Jini.|El sijo es anterior a la invención del hangul y originalmente se componía y transmitía oralmente o se escribía en caracteres chinos, floreciendo después en hangul.|Le sijo est antérieur à l'invention du hangeul et fut d'abord composé et transmis oralement ou écrit en caractères chinois, avant de s'épanouir en hangeul.|時調はハングルの創製より古く、当初は口伝か漢字で記されて広まり、のちにハングルで書かれるようになって栄えた。よく知られた作者の一人に16世紀の妓生(ギセン)詩人ファン・ジニがいる。",
  ),
  q(
    6,
    "What is the traditional Korean wrapping cloth, historically pieced together by ordinary households from scraps of leftover fabric into geometric patchwork and used to wrap gifts, food or ceremonial items?|¿Cuál es la tela envolvente tradicional coreana, históricamente confeccionada por los hogares comunes a partir de retazos de tela sobrante en un patchwork geométrico, y usada para envolver regalos, comida u objetos ceremoniales?|Quel est le tissu d'emballage traditionnel coréen, historiquement assemblé par les foyers ordinaires à partir de chutes de tissu en patchwork géométrique, et utilisé pour envelopper cadeaux, nourriture ou objets cérémoniels?|一般の家庭が余った布の切れ端を幾何学模様に接ぎ合わせて作り、贈り物や食べ物、儀礼の品を包むのに使われてきた、韓国の伝統的な包み布は?",
    ["Furoshiki|Furoshiki|Furoshiki|風呂敷", "Tenugui|Tenugui|Tenugui|手ぬぐい", "Bojagi|Bojagi|Bojagi|褓子(ポジャギ)"],
    2,
    "The patchwork style, known as jogakbo, grew out of thrift among commoners who could not waste fabric, in contrast to the plain, often silk bojagi used for formal court and wedding gifts; today jogakbo is also exhibited abroad as an abstract textile art form in its own right.|El estilo de patchwork, conocido como jogakbo, surgió de la economía de los plebeyos que no podían desperdiciar tela, a diferencia del bojagi liso, a menudo de seda, usado para regalos formales de corte y boda.|Le style patchwork, appelé jogakbo, est né de l'économie des roturiers qui ne pouvaient gaspiller de tissu, contrairement au bojagi uni, souvent en soie, utilisé pour les cadeaux de cour et de mariage formels.|接ぎ合わせの様式である「チョガッポ」は、布を無駄にできなかった庶民の倹約から生まれたもので、宮中や婚礼の正式な贈り物に使われる無地の絹のポジャギとは対照的である。いまではチョガッポ自体が独立した抽象的な染織芸術として海外でも展示されている。",
  ),
  q(
    6,
    "Jeju Island's volcanic cone Geomunoreum feeds a system of lava tubes recognised as a UNESCO World Heritage Site. What is the name of the dormant shield volcano at Jeju's center, South Korea's highest peak at nearly 1,950 metres?|El cono volcánico Geomunoreum de la isla de Jeju alimenta un sistema de tubos de lava reconocido como Patrimonio Mundial de la UNESCO. ¿Cómo se llama el volcán en escudo inactivo en el centro de Jeju, el pico más alto de Corea del Sur con casi 1.950 metros?|Le cône volcanique Geomunoreum de l'île de Jeju alimente un système de tunnels de lave classé au patrimoine mondial de l'UNESCO. Comment s'appelle le volcan-bouclier endormi au centre de Jeju, le plus haut sommet de Corée du Sud à près de 1950 mètres?|済州島の火山丘、拒文岳(コムンオルム)は、ユネスコ世界遺産に登録された溶岩洞窟群を生んだ。済州島の中心にある、韓国最高峰でおよそ標高1950mに達する休火山の名は?",
    ["Seoraksan|Seoraksan|Seoraksan|雪岳山(ソラクサン)", "Jirisan|Jirisan|Jirisan|智異山(チリサン)", "Hallasan|Hallasan|Hallasan|漢拏山(ハルラサン)"],
    2,
    "A crater lake called Baengnokdam sits at Hallasan's summit, and the wider Geomunoreum lava tube system, which includes the show cave Manjanggul, was inscribed by UNESCO in 2007 alongside Hallasan itself and the coastal Seongsan Ilchulbong tuff cone.|Un lago de cráter llamado Baengnokdam se encuentra en la cima del Hallasan, y el sistema más amplio de tubos de lava de Geomunoreum, que incluye la cueva Manjanggul.|Un lac de cratère appelé Baengnokdam se trouve au sommet du Hallasan, et le système plus large de tunnels de lave de Geomunoreum, qui comprend la grotte de Manjanggul.|漢拏山の頂には白鹿潭(ペンノクタム)という火口湖があり、観光洞窟である万丈窟を含む拒文岳の溶岩洞窟群は、漢拏山や海沿いの城山日出峰とともに2007年にユネスコ世界遺産に登録された。",
  ),
  q(
    7,
    "Round copper coins had circulated in Korea since the Goryeo period, and an earlier Joseon coin minted from 1423 failed to gain lasting public trust. Which coin, first minted in 1678, became the first to see truly widespread and sustained everyday circulation?|Ya circulaban monedas de cobre redondas en Corea desde la época Goryeo, y una moneda Joseon anterior, acuñada desde 1423, no logró ganarse la confianza duradera del público. ¿Qué moneda, acuñada por primera vez en 1678, fue la primera en circular de forma verdaderamente generalizada y sostenida?|Des pièces de cuivre rondes circulaient en Corée depuis l'époque Goryeo, et une pièce Joseon antérieure, frappée à partir de 1423, n'obtint pas la confiance durable du public. Quelle pièce, frappée pour la première fois en 1678, fut la première à circuler de façon vraiment généralisée et durable au quotidien?|高麗の時代から円形の銅銭は流通していたが、1423年から鋳造された朝鮮の先行貨幣は民の信頼を長く得られなかった。1678年に初めて鋳造され、日常的に広く長く使われるようになった最初の貨幣はどれか?",
    ["Joseon Tongbo|Joseon Tongbo|Joseon Tongbo|朝鮮通宝(チョソントンボ)", "Haedong Tongbo|Haedong Tongbo|Haedong Tongbo|海東通宝(ヘドントンボ)", "Sangpyeong Tongbo|Sangpyeong Tongbo|Sangpyeong Tongbo|常平通宝(サンピョントンボ)"],
    2,
    "Earlier coin issues struggled against a deep-rooted habit of using cloth, grain and barter for everyday transactions; Sangpyeong Tongbo succeeded partly through sustained government backing over generations, and it remained in circulation into the early 20th century.|Las emisiones de monedas anteriores lucharon contra el arraigado hábito de usar tela, grano y trueque para las transacciones cotidianas; el Sangpyeong Tongbo tuvo éxito en parte gracias al respaldo sostenido del gobierno durante generaciones.|Les émissions de pièces antérieures se heurtèrent à l'habitude profondément ancrée d'utiliser tissu, grain et troc pour les transactions quotidiennes; le Sangpyeong Tongbo réussit en partie grâce au soutien gouvernemental soutenu sur des générations.|それ以前の貨幣は、日々の取引に布や穀物、物々交換を用いる根強い習慣に阻まれ定着しなかった。常平通宝は世代を超えた政府の後ろ盾もあって普及し、20世紀初頭まで使われ続けた。",
  ),
  q(
    6,
    "Korea holds one of the world's densest concentrations of prehistoric megalithic tombs built from massive stone slabs. Three clusters of these, at Gochang, Hwasun and Ganghwa, were jointly inscribed as a UNESCO World Heritage Site in 2000. What are these structures called?|Corea alberga una de las concentraciones más densas del mundo de tumbas megalíticas prehistóricas construidas con enormes losas de piedra. Tres agrupaciones de estas, en Gochang, Hwasun y Ganghwa, fueron inscritas conjuntamente como Patrimonio Mundial de la UNESCO en el año 2000. ¿Cómo se llaman estas estructuras?|La Corée abrite l'une des plus fortes concentrations mondiales de tombes mégalithiques préhistoriques construites à partir d'énormes dalles de pierre. Trois groupes de celles-ci, à Gochang, Hwasun et Ganghwa, furent inscrits conjointement au patrimoine mondial de l'UNESCO en 2000. Comment appelle-t-on ces structures?|巨大な石板で築かれた先史時代の巨石墓が世界でも有数の密度で残る韓国。高敞・和順・江華の3か所の群れは2000年に合わせてユネスコ世界遺産に登録された。この構造物は何と呼ばれるか?",
    ["Menhirs|Menhires|Menhirs|メンヒル", "Cairns|Cairns|Cairns|ケルン(積石塚)", "Dolmens (goindol)|Dólmenes (goindol)|Dolmens (goindol)|支石墓(コインドル)"],
    2,
    "These dolmen sites are said to include roughly 40% of all dolmens known worldwide, most dating to the Bronze Age in the first millennium BCE, and their scale is thought to reflect the organised labour of communities able to move and raise capstones weighing many tonnes.|Se dice que estos yacimientos de dólmenes incluyen aproximadamente el 40% de todos los dólmenes conocidos en el mundo, la mayoría datados en la Edad del Bronce.|On estime que ces sites de dolmens comptent environ 40% de tous les dolmens connus dans le monde, datant pour la plupart de l'âge du bronze.|これらの支石墓群は世界で知られる支石墓のおよそ4割を占めるとされ、その多くは紀元前1千年紀の青銅器時代のものである。何トンもの上石を動かし据えるには、組織立った共同体の労力が要ったと考えられている。",
  ),
  q(
    5,
    "Kimchi varies noticeably by region within Korea. In the era before refrigeration, which factor most consistently distinguished the saltier, more heavily fermented kimchi traditionally made in Korea's warmer south from the milder kimchi of the colder north?|El kimchi varía notablemente según la región en Corea. En la era anterior a la refrigeración, ¿qué factor distinguía de forma más constante el kimchi más salado y fermentado del sur más cálido de Corea del kimchi más suave del norte más frío?|Le kimchi varie sensiblement selon la région en Corée. À l'époque précédant la réfrigération, quel facteur distinguait le plus systématiquement le kimchi plus salé et davantage fermenté du sud plus chaud de la Corée du kimchi plus doux du nord plus froid?|韓国国内でもキムチは地域によってかなり異なる。冷蔵庫が無かった時代、より温暖な南の塩辛くよく発酵させたキムチと、より寒い北の控えめなキムチとを最も一貫して分けていた要因は何か?",
    ["The type of chilli pepper grown in each region|El tipo de chile cultivado en cada región|Le type de piment cultivé dans chaque région|地域ごとに栽培される唐辛子の品種", "Whether the kimchi is made with cabbage or radish|Si el kimchi se hace con col o con rábano|Si le kimchi est préparé avec du chou ou du radis|白菜と大根のどちらで作るか", "Colder northern winters needing less salt to slow fermentation, warmer southern summers needing more|Los inviernos más fríos del norte necesitaban menos sal para ralentizar la fermentación, los veranos más cálidos del sur necesitaban más|Les hivers plus froids du nord nécessitaient moins de sel pour ralentir la fermentation, les étés plus chauds du sud en nécessitaient davantage|北の寒い冬は発酵を抑えるのに塩が少なくて済み、南の暑い夏はより多くの塩を要した"],
    2,
    "Because kimchi needed to keep for months in storage jars buried in the ground, cooks adjusted salt and fermented seafood sauce (jeotgal) to match local temperatures, producing a rough north-to-south gradient from milder to saltier that persists in home recipes today even with modern refrigeration.|Como el kimchi debía conservarse durante meses en tinajas de almacenamiento enterradas, las cocineras ajustaban la sal y la salsa de pescado fermentado (jeotgal) según las temperaturas locales.|Comme le kimchi devait se conserver pendant des mois dans des jarres enterrées, les cuisinières ajustaient le sel et la sauce de fruits de mer fermentée (jeotgal) selon les températures locales.|キムチは地中に埋めた甕で何か月も保存する必要があったため、作り手は土地の気温に合わせて塩と塩辛(ジョッカル)の量を調整した。北は控えめ、南は塩辛いというおおまかな勾配は、冷蔵庫が普及したいまも家庭の味に残っている。",
  ),
];
