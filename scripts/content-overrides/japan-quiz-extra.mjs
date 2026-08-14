/**
 * 日本 のクイズを**足す**ぶん。
 *
 * この盤面の問題は凍結した `legacy/grand-express.html` の中にあり、既存の
 * `japan-quiz.mjs` は**添字で差し替える**ことしかできない。**増やす口はここだけ。**
 *
 * 足す理由: 遊ぶ人から「プレイするほどクイズが被る」と報せがあった。原因は
 * 問題数ではなく**難易度の偏り**で、「くわしい」を選ぶと難易度8前後しか
 * 引かれないのに、その層が数問しか無い盤面があった。**足すぶんは難しい層に寄せる。**
 *
 * 難易度は自分で持つ(`quiz-difficulty.mjs` は legacy のぶんとだけ件数を合わせる)。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 1問。`o` は選択肢3つ、`a` は正解の添字(0〜2)。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const JAPAN_QUIZ_EXTRA = [
  q(
    3,
    "How many of Japan's coin denominations have a hole through the middle?|¿Cuántas denominaciones de monedas japonesas tienen un agujero en el centro?|Combien de dénominations de pièces japonaises ont un trou au centre ?|日本の硬貨のうち、中央に穴が開いているものは何種類あるか?",
    [
      "Two|Dos|Deux|2種類",
      "One|Una|Une|1種類",
      "Three|Tres|Trois|3種類",
    ],
    0,
    "Only the 5-yen and 50-yen coins have a hole — the 5-yen is brass and the 50-yen is cupronickel. The 5-yen design carries a rice ear, water, and a gear, standing for agriculture, fishing, and industry.|Solo las monedas de 5 y 50 yenes tienen agujero: la de 5 yenes es de latón y la de 50 de cuproníquel. El diseño de la de 5 yenes lleva una espiga de arroz, agua y un engranaje, que representan agricultura, pesca e industria.|Seules les pièces de 5 et 50 yens ont un trou : celle de 5 yens est en laiton, celle de 50 yens en cupronickel. Le motif de la pièce de 5 yens montre un épi de riz, de l'eau et un engrenage, symbolisant l'agriculture, la pêche et l'industrie.|穴あきなのは5円硬貨と50円硬貨の2種類で、5円は黄銅(真鍮)、50円は白銅でできている。5円には稲穂・水・歯車が刻まれ、農業・水産業・工業の3つを表している。",
  ),

  q(
    5,
    "Japan's household electricity runs at two different frequencies, east and west. Roughly where does the boundary run?|La electricidad doméstica de Japón funciona a dos frecuencias distintas, este y oeste. ¿Por dónde pasa aproximadamente la frontera?|L'électricité domestique du Japon fonctionne à deux fréquences différentes, à l'est et à l'ouest. Où passe à peu près la frontière ?|日本の家庭用電源の周波数は東西で異なる。その境目はおよそどこを通るか?",
    [
      "Along the Tsugaru Strait|A lo largo del estrecho de Tsugaru|Le long du détroit de Tsugaru|津軽海峡沿い",
      "A line across Honshu, from Itoigawa (Niigata) to the Fuji River (Shizuoka)|Una línea que cruza Honshu, de Itoigawa (Niigata) al río Fuji (Shizuoka)|Une ligne traversant Honshu, d'Itoigawa (Niigata) à la rivière Fuji (Shizuoka)|本州を横断する、糸魚川(新潟県)から富士川(静岡県)にかけての線",
      "Along the Kanmon Strait|A lo largo del estrecho de Kanmon|Le long du détroit de Kanmon|関門海峡沿い",
    ],
    1,
    "Tokyo imported German 50Hz generators while Osaka bought American 60Hz ones in the Meiji era, and the split simply stuck along a line that cuts Honshu in two rather than at a single point. Frequency converter stations sit on that line, and after the 2011 tsunami their limited capacity kept enough western power from reaching the stricken east.|En la era Meiji, Tokio importó generadores alemanes de 50Hz y Osaka compró generadores estadounidenses de 60Hz, y la división simplemente se quedó así a lo largo de una línea que divide Honshu en dos, no en un solo punto. Hay subestaciones convertidoras en esa línea, y tras el tsunami de 2011 su capacidad limitada impidió enviar suficiente electricidad del oeste al este afectado.|À l'ère Meiji, Tokyo a importé des générateurs allemands à 50Hz tandis qu'Osaka achetait des générateurs américains à 60Hz, et la division est restée telle quelle le long d'une ligne qui coupe Honshu en deux plutôt qu'en un seul point. Des postes de conversion se trouvent sur cette ligne ; après le tsunami de 2011, leur capacité limitée a empêché d'envoyer assez d'électricité de l'ouest vers l'est sinistré.|明治期に東京がドイツ製50Hz、大阪がアメリカ製60Hzの発電機を別々に輸入したことがそのまま定着し、一点ではなく本州を横断する線として境目になった。この線上には周波数変換所があり、東日本大震災の際には変換能力が足りず、西の電力を東へ十分に送れなかった。",
  ),

  q(
    7,
    "Okinawa produces almost no kelp, yet its per-person consumption has historically ranked among Japan's highest. What is the trade route behind this known as?|Okinawa apenas produce algas kombu, pero su consumo per cápita ha sido históricamente de los más altos de Japón. ¿Cómo se conoce la ruta comercial detrás de esto?|Okinawa ne produit presque pas d'algues kombu, mais sa consommation par habitant a historiquement figuré parmi les plus élevées du Japon. Comment appelle-t-on la route commerciale à l'origine de cela ?|沖縄はほとんど昆布を産しないが、一人当たりの消費量は歴史的に全国有数とされる。その背景にある交易路の通称は何か?",
    [
      "The Kuroshio route|La ruta de Kuroshio|La route du Kuroshio|黒潮の道",
      "The Nanban trade route|La ruta comercial Nanban|La route commerciale Nanban|南蛮貿易路",
      "The Kelp Road|La Ruta del Kombu|La route du kombu|昆布ロード",
    ],
    2,
    "In the Edo period, kelp harvested in Ezo (Hokkaido) traveled through Satsuma domain to the Ryukyu Kingdom, and from there it was re-exported to Qing China. The taste took root on an island where kelp cannot grow, and it still shows up in the broth of Okinawa soba today.|En el periodo Edo, el kombu recolectado en Ezo (Hokkaido) viajaba a través del dominio de Satsuma hasta el Reino de Ryukyu, desde donde se reexportaba a la China Qing. El gusto arraigó en una isla donde el kombu no crece, y todavía aparece en el caldo del soba okinawense.|À l'époque d'Edo, le kombu récolté à Ezo (Hokkaido) transitait par le domaine de Satsuma jusqu'au royaume des Ryukyu, d'où il était réexporté vers la Chine des Qing. Le goût s'est enraciné sur une île où le kombu ne pousse pas, et on le retrouve encore dans le bouillon du soba d'Okinawa.|江戸時代、蝦夷地(北海道)で獲れた昆布は薩摩藩を経由して琉球へ運ばれ、そこから清(中国)への輸出品にもなった。昆布の育たない島に根付いたこの食文化は、いまも沖縄そばの出汁などに残っている。",
  ),

  q(
    5,
    "The Reiwa era name, set in 2019, was drawn not from a Chinese classic — the usual source — but from Japan's oldest surviving anthology of what kind?|El nombre de la era Reiwa, fijado en 2019, no se tomó de un clásico chino —la fuente habitual—, sino de la antología más antigua conservada de Japón, ¿de qué tipo?|Le nom d'ère Reiwa, fixé en 2019, n'a pas été tiré d'un classique chinois — la source habituelle —, mais de la plus ancienne anthologie conservée du Japon. De quel genre ?|2019年に定められた元号「令和」は、それまでの元号の多くが典拠とした中国の古典ではなく、日本に現存する最古の何の典拠からとられたか?",
    [
      "A collection of legal codes|Una colección de códigos legales|Un recueil de codes juridiques|法典集",
      "A collection of waka poetry|Una colección de poesía waka|Un recueil de poésie waka|和歌集",
      "A collection of Buddhist sutras|Una colección de sutras budistas|Un recueil de sutras bouddhistes|仏典集",
    ],
    1,
    "It was the first era name ever drawn from a Japanese text, taken from the words \"auspicious month\" and \"gentle wind\" in the preface to a set of plum-blossom poems in the Man'yoshu. All 247 era names before it had traced back to Chinese classics.|Fue el primer nombre de era tomado de un texto japonés, extraído de las palabras «mes propicio» y «viento suave» del prefacio de unos poemas sobre flores de ciruelo del Man'yoshu. Los 247 nombres de era anteriores se remontaban todos a clásicos chinos.|C'était le premier nom d'ère tiré d'un texte japonais, emprunté aux mots « mois propice » et « vent doux » dans la préface de poèmes sur les fleurs de prunier du Man'yoshu. Les 247 noms d'ère précédents remontaient tous à des classiques chinois.|元号が日本の書物を典拠としたのはこれが初めてで、万葉集の「梅花の歌」の序文にある「令月」「風和ぎ」の語から選ばれた。それ以前247の元号はすべて中国の古典に典拠を持っていた。",
  ),

  q(
    7,
    "What is the major fault system, running nearly the length of Japan from Kyushu to Kanto, that splits southwest Japan into an \"inner belt\" and an \"outer belt\"?|¿Cuál es el gran sistema de falla, que recorre casi toda la longitud de Japón desde Kyushu hasta Kanto, que divide el suroeste de Japón en un «cinturón interior» y un «cinturón exterior»?|Quel grand système de faille, qui court presque sur toute la longueur du Japon de Kyushu au Kanto, divise le sud-ouest du Japon en une « ceinture interne » et une « ceinture externe » ?|西南日本を「内帯」と「外帯」に分ける、九州から関東まで延びる日本最大級の断層帯は何か?",
    [
      "The Itoigawa–Shizuoka Tectonic Line|La Línea Tectónica Itoigawa-Shizuoka|La ligne tectonique Itoigawa-Shizuoka|糸魚川静岡構造線",
      "The Median Tectonic Line|La Línea Tectónica Mediana|La ligne tectonique médiane|中央構造線",
      "The Fossa Magna|La Fossa Magna|La Fossa Magna|フォッサマグナ",
    ],
    1,
    "It runs almost 1,000km from Kyushu through Shikoku and the Kii Peninsula to Kanto, stitching together two geological zones that formed in different ways. Stretches of it reach the surface, and hot springs and distinctive rock formations cluster along its length.|Recorre casi 1.000 km desde Kyushu, pasando por Shikoku y la península de Kii, hasta Kanto, uniendo dos zonas geológicas que se formaron de maneras distintas. Algunos tramos afloran a la superficie, y a lo largo de su recorrido se concentran aguas termales y formaciones rocosas características.|Elle s'étend sur près de 1000 km de Kyushu, en passant par Shikoku et la péninsule de Kii, jusqu'au Kanto, reliant deux zones géologiques formées de manières différentes. Certains tronçons affleurent en surface, et sources chaudes et formations rocheuses caractéristiques s'y concentrent.|九州から四国・紀伊半島を経て関東まで1000km近くにわたり延び、成り立ちの異なる2つの地質帯を接合している。断層に沿って地表に露出する区間もあり、周辺には温泉や特徴的な岩石が多く見られる。",
  ),

  q(
    1,
    "What is the custom on entering a Japanese home?|¿Cuál es la costumbre al entrar a una casa japonesa?|Quelle est la coutume en entrant dans une maison japonaise ?|日本の家に上がるときの習慣は?",
    [
      "Take off your shoes|Quitarse los zapatos|Enlever ses chaussures|靴を脱ぐ",
      "Take off your hat|Quitarse el sombrero|Enlever son chapeau|帽子を脱ぐ",
      "Ring a bell|Tocar una campana|Faire sonner une cloche|鈴を鳴らす",
    ],
    0,
    "Shoes come off at a small step called the genkan and are turned to face the door for the next person. Indoor slippers usually take over from there, and are themselves swapped for separate ones just to use the toilet.|Los zapatos se dejan en un pequeño escalón llamado genkan, girados hacia la puerta para la siguiente persona. Luego suelen usarse pantuflas de interior, que a su vez se cambian por otras solo para el baño.|Les chaussures se retirent sur une petite marche appelée genkan, tournées vers la porte pour la personne suivante. Des chaussons d'intérieur prennent ensuite le relais, eux-mêmes échangés contre une autre paire rien que pour les toilettes.|玄関という小さな段差で靴を脱ぎ、次の人のためにつま先を外に向けて揃える。そのあとは室内履きに履き替え、トイレに入るときだけさらに別のスリッパに替える。",
  ),

  q(
    1,
    "What do people say just before starting a meal?|¿Qué se dice justo antes de comenzar a comer?|Que dit-on juste avant de commencer à manger ?|食事を始める前に言う言葉は?",
    [
      "Otsukaresama|Otsukaresama|Otsukaresama|お疲れさま",
      "Itadakimasu|Itadakimasu|Itadakimasu|いただきます",
      "Gochisosama|Gochisosama|Gochisosama|ごちそうさま",
    ],
    1,
    "It literally means \"I humbly receive,\" thanking the food itself, the people who grew and cooked it. The matching phrase said afterward, gochisosama, thanks everyone for the feast that has just ended.|Significa literalmente «recibo humildemente», agradeciendo a la comida misma y a quienes la cultivaron y cocinaron. La frase que se dice después, gochisosama, agradece a todos por el festín que acaba de terminar.|Cela signifie littéralement « je reçois humblement », remerciant la nourriture elle-même ainsi que ceux qui l'ont cultivée et cuisinée. La phrase dite après, gochisosama, remercie tout le monde pour le repas qui vient de se terminer.|「謹んでいただきます」の意味で、食材そのものと、それを育て調理した人への感謝を表す。食後に言う「ごちそうさま」は、今しがた終えたごちそうへの感謝を表す対の言葉である。",
  ),

  q(
    1,
    "Which side of the road do cars drive on in Japan?|¿Por qué lado de la carretera circulan los autos en Japón?|De quel côté de la route roulent les voitures au Japon ?|日本で車が走るのは道のどちら側?",
    [
      "The right|La derecha|La droite|右側",
      "It depends on the region|Depende de la región|Cela dépend de la région|地方による",
      "The left|La izquierda|La gauche|左側",
    ],
    2,
    "The rule dates to the Edo period, when samurai walked on the left so a sword worn on the left hip would not clash with an oncomer's. British engineers who built Japan's first railway in the 1870s kept left-hand running, and cars later followed the same side.|La norma se remonta al periodo Edo, cuando los samuráis caminaban por la izquierda para que la espada, llevada en la cadera izquierda, no chocara con la de quien venía de frente. Los ingenieros británicos que construyeron el primer ferrocarril de Japón en la década de 1870 mantuvieron la circulación por la izquierda, y los autos después siguieron el mismo lado.|La règle remonte à l'époque d'Edo, où les samouraïs marchaient à gauche pour que le sabre, porté à la hanche gauche, ne heurte pas celui d'un passant venant en face. Les ingénieurs britanniques qui ont construit le premier chemin de fer du Japon dans les années 1870 ont conservé la circulation à gauche, et les voitures ont ensuite suivi le même côté.|江戸時代、武士が左腰に差した刀を人とすれ違う際にぶつけないよう左側を歩いた名残とされる。1870年代に日本初の鉄道を敷いたイギリス人技師が左側通行を採用し、のちの自動車もそれに倣った。",
  ),

  q(
    2,
    "In which month does Japan's school and business year usually begin?|¿En qué mes suele comenzar el año escolar y empresarial de Japón?|En quel mois commence habituellement l'année scolaire et professionnelle du Japon ?|日本の新年度・新学期が始まるのは何月か?",
    [
      "January|Enero|Janvier|1月",
      "September|Septiembre|Septembre|9月",
      "April|Abril|Avril|4月",
    ],
    2,
    "It lines up with the arrival of cherry blossoms, so graduation and entrance ceremonies are framed by pink petals. Most other countries start their school year around August or September, which occasionally trips up transferring students.|Coincide con la llegada de las flores de cerezo, así que las ceremonias de graduación e ingreso quedan enmarcadas por pétalos rosados. La mayoría de los demás países comienzan el año escolar hacia agosto o septiembre, lo que a veces complica a los estudiantes que se trasladan.|Cela coïncide avec l'arrivée des fleurs de cerisier, si bien que les cérémonies de remise de diplômes et de rentrée sont encadrées de pétales roses. La plupart des autres pays commencent l'année scolaire vers août ou septembre, ce qui complique parfois la vie des élèves transférés.|桜の開花と重なり、卒業式も入学式も花びらに彩られる。世界の多くの国は8〜9月に新学期が始まるため、転入生の時期がずれることがある。",
  ),

  q(
    2,
    "What is the bell rung 108 times at Buddhist temples on New Year's Eve called?|¿Cómo se llama la campana que se toca 108 veces en los templos budistas la víspera de Año Nuevo?|Comment s'appelle la cloche sonnée 108 fois dans les temples bouddhistes la veille du Nouvel An ?|大晦日の夜、寺で108回撞かれる鐘は?",
    [
      "Joya no kane|Joya no kane|Joya no kane|除夜の鐘",
      "Obon|Obon|Obon|お盆",
      "Hatsumode|Hatsumode|Hatsumode|初詣",
    ],
    0,
    "The number 108 is said to represent the worldly desires that Buddhism holds humans are burdened with, and each toll is meant to clear one away. Some temples let visitors line up to ring it themselves, with the final strike landing right around midnight.|Se dice que el número 108 representa los deseos mundanos de los que, según el budismo, está cargado el ser humano, y cada campanada busca eliminar uno. Algunos templos permiten que los visitantes hagan fila para tocarla ellos mismos, y el último toque cae justo alrededor de la medianoche.|Le nombre 108 est censé représenter les désirs terrestres dont le bouddhisme dit que les humains sont chargés, et chaque coup est censé en effacer un. Certains temples laissent les visiteurs faire la queue pour la sonner eux-mêmes, le dernier coup tombant juste autour de minuit.|108という数は仏教で人間が抱えるとされる煩悩の数を表し、一打ごとにひとつを払うとされる。参拝者が並んで自分の手で撞かせてくれる寺もあり、最後の一打が真夜中前後に鳴る。",
  ),

  q(
    2,
    "What are the carp-shaped streamers flown outdoors on May 5th called?|¿Cómo se llaman las banderolas en forma de carpa que se izan al aire libre el 5 de mayo?|Comment appelle-t-on les banderoles en forme de carpe hissées en plein air le 5 mai ?|5月5日、鯉をかたどって空に揚げる吹き流しは?",
    [
      "Kadomatsu|Kadomatsu|Kadomatsu|門松",
      "Koinobori|Koinobori|Koinobori|こいのぼり",
      "Shimenawa|Shimenawa|Shimenawa|しめ縄",
    ],
    1,
    "They are flown for Children's Day, one carp for each child in a household plus a larger pair for the parents, and they billow as if swimming when the wind catches them. The carp stands for perseverance, since a folk tale has it swimming upstream against a waterfall to become a dragon.|Se izan por el Día del Niño, una carpa por cada hijo del hogar más un par más grande para los padres, y ondean como si nadaran cuando el viento las agarra. La carpa simboliza la perseverancia, ya que un cuento popular la muestra nadando río arriba contra una cascada hasta convertirse en dragón.|Elles sont hissées pour la Journée des enfants, une carpe pour chaque enfant du foyer plus une paire plus grande pour les parents, et elles ondulent comme si elles nageaient quand le vent les prend. La carpe symbolise la persévérance, car un conte populaire la montre remontant une cascade à contre-courant pour devenir un dragon.|こどもの日に揚げられ、家の子どもの数だけ鯉を、その上に一回り大きな親の対を添える。風をはらむと泳ぐように見え、鯉が滝を登って龍になるという伝説から忍耐の象徴とされる。",
  ),

  q(
    2,
    "What is the soup with mochi eaten at New Year's called?|¿Cómo se llama la sopa con mochi que se come en Año Nuevo?|Comment s'appelle la soupe au mochi que l'on mange au Nouvel An ?|正月に食べる、餅の入った汁物は?",
    [
      "Miso shiru|Miso shiru|Miso shiru|味噌汁",
      "Chawanmushi|Chawanmushi|Chawanmushi|茶碗蒸し",
      "Zoni|Zoni|Zoni|雑煮",
    ],
    2,
    "The broth, the shape of the mochi, and the vegetables inside all differ by region — Kanto tends toward a clear soy-based broth with square mochi, Kansai toward a white miso broth with round mochi. Families often argue, only half joking, that their own version is the correct one.|El caldo, la forma del mochi y las verduras dentro varían según la región: Kanto tiende a un caldo claro a base de soja con mochi cuadrado, Kansai a un caldo de miso blanco con mochi redondo. Las familias a menudo discuten, medio en broma, sobre cuál versión es la correcta.|Le bouillon, la forme du mochi et les légumes qu'il contient varient selon la région : le Kanto penche vers un bouillon clair à base de soja avec du mochi carré, le Kansai vers un bouillon au miso blanc avec du mochi rond. Les familles se disputent souvent, à moitié pour rire, sur quelle version est la bonne.|出汁も餅の形も具材も地方でまちまちで、関東は角餅としょうゆ仕立ての澄まし汁、関西は丸餅と白味噌仕立てが多いとされる。どちらが本流かで、半ば冗談交じりに家族間で言い争いになることもある。",
  ),

  q(
    3,
    "What is obon, observed in mid-summer, a time for?|¿Para qué es el obon, celebrado a mediados del verano?|À quoi sert l'obon, célébré au milieu de l'été ?|夏に行われる「お盆」とは何をする時期か?",
    [
      "Celebrating the year's rice harvest|Celebrar la cosecha de arroz del año|Célébrer la récolte de riz de l'année|その年の稲の収穫を祝うこと",
      "Welcoming and honoring ancestors' spirits|Recibir y honrar a los espíritus de los antepasados|Accueillir et honorer les esprits des ancêtres|先祖の霊を迎え、供養すること",
      "Marking the emperor's birthday|Conmemorar el cumpleaños del emperador|Marquer l'anniversaire de l'empereur|天皇の誕生日を祝うこと",
    ],
    1,
    "Families light small fires or lanterns to guide ancestral spirits home, then send them off again a few days later, sometimes on tiny floating lanterns set adrift on a river. Many people travel back to their hometowns for it, making it one of the two heaviest travel seasons of the year alongside New Year's.|Las familias encienden pequeñas hogueras o farolillos para guiar a los espíritus ancestrales de vuelta a casa, y los despiden de nuevo unos días después, a veces con diminutos farolillos flotantes que sueltan en un río. Mucha gente vuelve a su ciudad natal por esta fecha, lo que la convierte en una de las dos temporadas de viaje más intensas del año junto con el Año Nuevo.|Les familles allument de petits feux ou des lanternes pour guider les esprits ancestraux jusqu'à la maison, puis les renvoient quelques jours plus tard, parfois sur de minuscules lanternes flottantes lâchées sur une rivière. Beaucoup de gens rentrent dans leur ville natale à cette occasion, ce qui en fait, avec le Nouvel An, l'une des deux périodes de déplacement les plus chargées de l'année.|小さな火や提灯を灯して先祖の霊を家へ迎え入れ、数日後にまた送り出す。川に小さな灯籠を流して見送る地域もある。帰省する人が多く、正月と並んで一年で最も移動が集中する時期のひとつになる。",
  ),

  q(
    3,
    "What is the common practice before soaking in a Japanese hot spring bath?|¿Cuál es la práctica habitual antes de sumergirse en un baño de aguas termales japonés?|Quelle est la pratique courante avant de s'immerger dans un bain thermal japonais ?|日本の温泉に入る前の一般的な習慣は?",
    [
      "Wear a swimsuit into the bath|Entrar al baño con traje de baño|Entrer dans le bain en maillot de bain|水着を着て入る",
      "Rinse the tub before leaving|Enjuagar la bañera antes de salir|Rincer la baignoire avant de partir|出るときに湯船をすすぐ",
      "Wash your body first|Lavarse el cuerpo primero|Se laver le corps d'abord|体を洗ってから湯に入る",
    ],
    2,
    "The bathing area and the tub are treated as separate things: people wash and rinse off completely at a row of low stools and faucets before ever stepping into the shared tub, which is for soaking, not scrubbing. Swimsuits are generally not worn, and towels are kept out of the water itself.|La zona de aseo y la bañera se tratan como cosas separadas: la gente se lava y se enjuaga por completo en una fila de taburetes bajos y grifos antes de entrar en la bañera compartida, que es para remojarse, no para frotarse. Por lo general no se usa traje de baño, y las toallas se mantienen fuera del agua.|La zone de lavage et le bassin sont traités comme deux choses distinctes : on se lave et se rince entièrement sur une rangée de petits tabourets et de robinets avant même d'entrer dans le bassin commun, destiné à se prélasser et non à se frotter. Le maillot de bain n'est généralement pas porté, et les serviettes restent hors de l'eau.|洗い場と湯船は別のものとして扱われ、低い椅子と蛇口が並ぶ洗い場で体をしっかり洗ってから、こすらず浸かるためだけの共同の湯船に入る。水着は基本的に着けず、タオルも湯の中には入れない。",
  ),

  q(
    3,
    "What is the polite, formal style of Japanese used toward superiors or guests called?|¿Cómo se llama el estilo de japonés formal y cortés usado con superiores o invitados?|Comment appelle-t-on le style de japonais formel et poli utilisé envers les supérieurs ou les invités ?|目上の人や客に対して使う丁寧な言葉遣いを何と呼ぶか?",
    [
      "Kanji|Kanji|Kanji|漢字",
      "Keigo|Keigo|Keigo|敬語",
      "Haiku|Haiku|Haïku|俳句",
    ],
    1,
    "It splits further into humble forms that lower the speaker and respectful forms that raise the listener, so the same verb can take several shapes depending on who is being talked about. Companies train new employees in it specifically, since getting it wrong in business settings is considered a real misstep.|Se subdivide en formas humildes que rebajan al hablante y formas respetuosas que elevan al oyente, de modo que un mismo verbo puede tomar varias formas según de quién se hable. Las empresas capacitan específicamente a los nuevos empleados en esto, ya que equivocarse en entornos de negocios se considera un verdadero desliz.|Il se subdivise en formes humbles qui abaissent le locuteur et en formes respectueuses qui élèvent l'interlocuteur, si bien qu'un même verbe peut prendre plusieurs formes selon la personne dont on parle. Les entreprises forment spécifiquement leurs nouveaux employés à cela, une erreur en contexte professionnel étant considérée comme un vrai faux pas.|話し手をへりくだらせる謙譲語と、相手を高める尊敬語に分かれ、同じ動詞でも誰について話すかで形が変わる。ビジネスの場で間違えると本当の失敗とみなされるため、企業は新入社員に専門の研修を行うほどである。",
  ),

  q(
    3,
    "What is the common practice when putting out household trash in Japan?|¿Cuál es la práctica habitual al sacar la basura doméstica en Japón?|Quelle est la pratique habituelle pour sortir les ordures ménagères au Japon ?|家庭ごみを出すときの一般的な習慣は?",
    [
      "Sort it by type and put it out on fixed collection days|Separarla por tipo y sacarla en días de recolección fijos|La trier par type et la sortir les jours de collecte fixés|種類ごとに分別し、決まった日に出す",
      "Leave it out any day, in any bag|Dejarla afuera cualquier día, en cualquier bolsa|La laisser dehors n'importe quel jour, dans n'importe quel sac|好きな日に、どんな袋で出してもよい",
      "Burn it in the yard|Quemarla en el patio|La brûler dans le jardin|庭で焼却する",
    ],
    0,
    "Categories such as burnable, non-burnable, plastics, cans, and bottles each have their own collection day, printed bag color, or labeled net to keep crows away. Rules vary enough from one municipality to the next that moving house often means relearning the whole system.|Categorías como combustible, no combustible, plásticos, latas y botellas tienen cada una su propio día de recolección, color de bolsa impreso o red etiquetada para mantener alejados a los cuervos. Las normas varían tanto de un municipio a otro que mudarse de casa a menudo significa reaprender todo el sistema.|Des catégories comme combustible, non combustible, plastiques, canettes et bouteilles ont chacune leur propre jour de collecte, couleur de sac imprimée ou filet étiqueté pour tenir les corbeaux à distance. Les règles varient assez d'une municipalité à l'autre pour qu'un déménagement oblige souvent à réapprendre tout le système.|「日本語で燃えるごみ」「燃えないごみ」「プラスチック」「缶」「びん」などに分かれ、それぞれ収集日や指定の袋の色、カラス除けの網などが決まっている。自治体ごとにルールが違うため、引っ越すと制度を覚え直す羽目になることも多い。",
  ),

  q(
    4,
    "On the Tokyo–Shin-Osaka Shinkansen, which side of the train gives the better chance of seeing Mt. Fuji?|En el Shinkansen entre Tokio y Shin-Osaka, ¿qué lado del tren ofrece más posibilidades de ver el monte Fuji?|Dans le Shinkansen entre Tokyo et Shin-Osaka, quel côté du train offre le plus de chances de voir le mont Fuji ?|東京から新大阪へ向かう新幹線で、富士山が見えやすいのは進行方向のどちら側?",
    [
      "The right side|El lado derecho|Le côté droit|進行方向右側",
      "Neither side|Ninguno de los dos lados|Aucun des deux côtés|どちらからも見えない",
      "The left side|El lado izquierdo|Le côté gauche|進行方向左側",
    ],
    0,
    "The mountain sits south of the line, so it appears on the right-hand seats heading toward Osaka (and the left heading toward Tokyo). The clearest view is usually in the few minutes around the crossing of the Fuji River.|La montaña está al sur de la línea, así que aparece en los asientos del lado derecho yendo hacia Osaka (y a la izquierda yendo hacia Tokio). La vista más clara suele darse en los pocos minutos alrededor del cruce del río Fuji.|La montagne se trouve au sud de la ligne, elle apparaît donc du côté droit en allant vers Osaka (et à gauche en allant vers Tokyo). La vue la plus dégagée se situe généralement dans les quelques minutes autour du franchissement de la rivière Fuji.|富士山は路線の南側にあるため、新大阪方面へ向かう際は進行方向右側の座席から見える(東京方面ではその逆になる)。富士川を渡る前後の数分間が最も見えやすいとされる。",
  ),

  q(
    4,
    "What is tsuyu, the season that runs roughly from June into July?|¿Qué es el tsuyu, la estación que va aproximadamente de junio a julio?|Qu'est-ce que le tsuyu, la saison qui va environ de juin à juillet ?|「梅雨(つゆ)」とは何の季節か?",
    [
      "The peak of cherry blossom season|El pico de la temporada de flores de cerezo|Le pic de la saison des fleurs de cerisier|桜が満開になる季節",
      "A run of consecutive typhoons|Una serie de tifones consecutivos|Une série de typhons consécutifs|台風が連続して来る季節",
      "A long spell of rain|Un largo periodo de lluvias|Une longue période de pluie|長雨が続く季節",
    ],
    2,
    "A stalled rain front pushes slowly north across the country over several weeks, so the wet spell lasts far longer than any single storm. Hokkaido, further north, is usually left out of it almost entirely.|Un frente lluvioso estancado avanza lentamente hacia el norte por todo el país durante varias semanas, así que el periodo húmedo dura mucho más que cualquier tormenta individual. Hokkaido, más al norte, suele quedar casi por completo fuera de él.|Un front pluvieux stationnaire remonte lentement le pays vers le nord sur plusieurs semaines, si bien que la période humide dure bien plus longtemps qu'un seul orage. Hokkaido, plus au nord, en est généralement presque entièrement épargné.|停滞前線が数週間かけてゆっくり北上するため、ひとつの嵐よりずっと長く雨がちな期間が続く。より北にある北海道は、この季節がほとんど無いとされる。",
  ),

  q(
    6,
    "What is the foehn effect, felt on the Pacific side when wind crosses Japan's mountains from the Sea of Japan side?|¿Qué es el efecto foehn, sentido en el lado del Pacífico cuando el viento cruza las montañas de Japón desde el lado del mar de Japón?|Qu'est-ce que l'effet foehn, ressenti côté Pacifique quand le vent traverse les montagnes du Japon depuis le côté mer du Japon ?|日本海側から山を越えた風が太平洋側などへ吹き下ろす「フェーン現象」とは何か?",
    [
      "Dry wind descending and pushing the temperature up|Viento seco que desciende y hace subir la temperatura|Un vent sec qui descend et fait monter la température|乾いた風が吹き下ろし、気温を押し上げる現象",
      "A sudden drop in air pressure before a typhoon|Una caída repentina de presión antes de un tifón|Une chute soudaine de pression avant un typhon|台風の前に気圧が急降下する現象",
      "Cold fog rolling in from the sea|Niebla fría que llega desde el mar|Un brouillard froid venant de la mer|海から冷たい霧が流れ込む現象",
    ],
    0,
    "Moist air drops its rain climbing the mountains from the Sea of Japan side, then descends dry and warming on the other side. Yamagata City hit 40.8°C this way in 1933, a national heat record that stood for more than 70 years.|El aire húmedo suelta su lluvia al subir las montañas desde el lado del mar de Japón, y luego desciende seco y calentándose por el otro lado. La ciudad de Yamagata alcanzó así 40,8 °C en 1933, un récord nacional de calor que se mantuvo durante más de 70 años.|L'air humide perd sa pluie en montant les montagnes depuis le côté mer du Japon, puis redescend sec en se réchauffant de l'autre côté. La ville de Yamagata a ainsi atteint 40,8 °C en 1933, un record national de chaleur resté en place plus de 70 ans.|日本海側から湿った空気が山を登る際に雨を降らせ、反対側では乾いたまま気温を上げながら吹き下りる。この仕組みで山形市は1933年に40.8℃を記録し、70年以上にわたり国内最高気温の記録として残った。",
  ),

  q(
    4,
    "Roughly how long is one shaku, the traditional unit still used by carpenters and kimono-makers?|¿Cuánto mide aproximadamente un shaku, la unidad tradicional que aún usan carpinteros y confeccionistas de kimonos?|Combien mesure environ un shaku, l'unité traditionnelle encore utilisée par les charpentiers et les couturiers de kimono ?|大工道具や着物の寸法に今も使われる伝統単位「尺」はおよそ何cmか?",
    [
      "About 10cm|Unos 10cm|Environ 10cm|約10cm",
      "About 30cm|Unos 30cm|Environ 30cm|約30cm",
      "About 100cm|Unos 100cm|Environ 100cm|約100cm",
    ],
    1,
    "The shakkanho system of units was officially retired in 1959 in favor of the metric system, but it lingers in trades where switching tools and habits was more trouble than it was worth. One shaku is about 30.3cm, thought to trace back to a rough hand-span measurement.|El sistema de unidades shakkanho se retiró oficialmente en 1959 a favor del sistema métrico, pero persiste en oficios donde cambiar herramientas y hábitos costaba más de lo que valía la pena. Un shaku mide unos 30,3 cm, y se cree que proviene de una medida aproximada con la mano.|Le système d'unités shakkanho a été officiellement abandonné en 1959 au profit du système métrique, mais il subsiste dans les métiers où changer d'outils et d'habitudes valait moins la peine que le statu quo. Un shaku mesure environ 30,3cm, une valeur qu'on fait remonter à une mesure approximative de la main.|尺貫法は1959年に公式にはメートル法へ切り替えられたが、道具や慣習を変える手間の方が大きい業種では今も残っている。一尺はおよそ30.3cmで、手を広げた長さなど身体尺に由来するとされる。",
  ),

  q(
    5,
    "The old provincial names seen in Japan, such as Musashi or Settsu, were set up chiefly during which era?|Los antiguos nombres de provincias de Japón, como Musashi o Settsu, se establecieron principalmente en qué época?|Les anciens noms de provinces du Japon, comme Musashi ou Settsu, ont été établis principalement à quelle époque ?|「武蔵」「摂津」のような日本の旧国名(令制国)が整えられたのは主に何時代?",
    [
      "The Edo period|El periodo Edo|La période Edo|江戸時代",
      "The Kamakura period|El periodo Kamakura|La période Kamakura|鎌倉時代",
      "The Nara period|El periodo Nara|La période Nara|奈良時代",
    ],
    2,
    "These roughly 68 provinces were laid out under the ritsuryo legal system around the 8th century, well before the feudal domains of the Edo period existed. Their names still surface today in place names, dish names, and the ring names taken by sumo wrestlers.|Estas aproximadamente 68 provincias se establecieron bajo el sistema legal ritsuryo hacia el siglo VIII, mucho antes de que existieran los dominios feudales del periodo Edo. Sus nombres todavía aparecen hoy en topónimos, nombres de platos y los nombres de ring que adoptan los luchadores de sumo.|Ces quelque 68 provinces ont été établies sous le système légal ritsuryo vers le 8e siècle, bien avant l'existence des domaines féodaux de l'époque d'Edo. Leurs noms apparaissent encore aujourd'hui dans des noms de lieux, des noms de plats et les noms de ring adoptés par les lutteurs de sumo.|律令制のもとで8世紀ごろに整えられた68ほどの地域区分で、江戸時代の藩よりずっと古い。今も地名や料理名、力士の四股名などにその名が残っている。",
  ),

  q(
    4,
    "What is the top rank in sumo's ranking system called?|¿Cómo se llama el rango más alto del sistema de clasificación del sumo?|Comment appelle-t-on le rang le plus élevé du système de classement du sumo ?|大相撲の番付で最高位を何と呼ぶか?",
    [
      "Ozeki|Ozeki|Ozeki|大関",
      "Sekiwake|Sekiwake|Sekiwake|関脇",
      "Yokozuna|Yokozuna|Yokozuna|横綱",
    ],
    2,
    "Unlike every rank below it, a yokozuna is never demoted for a bad tournament — by tradition, a wrestler who can no longer perform at that level is expected to retire instead. The rank traces its name to a ceremonial rope, also called yokozuna, worn at a ring-entering ritual.|A diferencia de todos los rangos inferiores, un yokozuna nunca es degradado por un mal torneo: por tradición, se espera que un luchador que ya no puede rendir a ese nivel se retire en su lugar. El rango debe su nombre a una cuerda ceremonial, también llamada yokozuna, que se lleva en un ritual de entrada al ring.|Contrairement à tous les rangs inférieurs, un yokozuna n'est jamais rétrogradé pour un mauvais tournoi : par tradition, un lutteur qui ne peut plus performer à ce niveau est censé prendre sa retraite. Le rang tient son nom d'une corde cérémonielle, elle aussi appelée yokozuna, portée lors d'un rituel d'entrée sur le ring.|下位の地位と違い、横綱は成績が悪くても番付が下がることはなく、その代わり力が衰えれば引退するのが慣例とされる。地位の名は、土俵入りの儀式で締める「横綱」と呼ばれる注連縄に由来する。",
  ),

  q(
    5,
    "Under Japan's lay judge system (saiban-in), citizens sit alongside professional judges to decide what kind of cases?|Bajo el sistema de jueces legos de Japón (saiban-in), los ciudadanos se sientan junto a jueces profesionales para decidir qué tipo de casos?|Sous le système de juges citoyens du Japon (saiban-in), des citoyens siègent aux côtés de juges professionnels pour trancher quel type d'affaires ?|裁判員制度で、一般市民が裁判官とともに判断するのは何の裁判か?",
    [
      "All civil lawsuits|Todas las demandas civiles|Tous les procès civils|すべての民事裁判",
      "Serious criminal cases|Casos penales graves|Les affaires pénales graves|重大な刑事事件",
      "Traffic violation cases|Casos de infracciones de tráfico|Les infractions routières|交通違反の裁判",
    ],
    1,
    "Introduced in 2009, the system randomly selects six citizens from the voting-age public to sit with professional judges on cases such as murder, and together they decide guilt and even the sentence. Almost any eligible voter can be called, much like jury duty elsewhere.|Introducido en 2009, el sistema selecciona al azar a seis ciudadanos con derecho a voto para sentarse junto a jueces profesionales en casos como el homicidio, y juntos deciden la culpabilidad e incluso la sentencia. Casi cualquier votante elegible puede ser convocado, de forma similar al servicio de jurado en otros países.|Introduit en 2009, le système sélectionne au hasard six citoyens en âge de voter pour siéger avec des juges professionnels dans des affaires comme le meurtre, et ensemble ils décident de la culpabilité et même de la peine. Presque tout électeur éligible peut être appelé, un peu comme un service de juré ailleurs.|2009年に始まった制度で、有権者の中からくじで選ばれた市民6人が、殺人などの重大事件で裁判官と共に有罪無罪だけでなく量刑まで判断する。有権者であれば基本的に誰でも選ばれる可能性がある。",
  ),

  q(
    6,
    "Where does the name of Golden Week, the run of holidays in late April and early May, come from?|¿De dónde viene el nombre de la Golden Week, la sucesión de festivos de finales de abril y principios de mayo?|D'où vient le nom de la Golden Week, la série de jours fériés de fin avril et début mai ?|4月末から5月上旬に集中する連休「ゴールデンウィーク」の名の由来は?",
    [
      "An imperial decree from the Meiji era|Un decreto imperial de la era Meiji|Un décret impérial de l'ère Meiji|明治時代の勅令",
      "A term borrowed from 1950s film industry marketing|Un término tomado del marketing de la industria del cine de los años 1950|Un terme emprunté au marketing de l'industrie cinématographique des années 1950|1950年代の映画業界の宣伝用語",
      "A postwar labor union slogan|Un eslogan sindical de posguerra|Un slogan syndical d'après-guerre|戦後の労働組合の標語",
    ],
    1,
    "A film studio noticed a hit movie sold especially well during this cluster of holidays and started billing the week as a 'golden' one to draw audiences, and the label stuck for the season itself. A similar run of holidays that sometimes falls in September has since picked up the nickname Silver Week.|Un estudio de cine notó que una película exitosa se vendía especialmente bien durante este grupo de festivos y empezó a promocionar la semana como «dorada» para atraer público, y la etiqueta se quedó para la temporada misma. Una racha similar de festivos que a veces cae en septiembre ha adoptado desde entonces el apodo de Silver Week.|Un studio de cinéma a remarqué qu'un film à succès se vendait particulièrement bien pendant cette série de jours fériés et a commencé à présenter la semaine comme « dorée » pour attirer le public, et l'étiquette est restée pour la saison elle-même. Une série similaire de jours fériés tombant parfois en septembre a depuis hérité du surnom de Silver Week.|映画会社がこの連休に大ヒット作の興行成績が特によかったことに気づき、「黄金の週間」と銘打って客を呼んだことが始まりとされ、それが季節そのものの呼び名として定着した。9月に祝日が重なる年には「シルバーウィーク」という愛称もつく。",
  ),

  q(
    4,
    "What is hatsumode, done in the first days of the new year?|¿Qué es el hatsumode, que se hace en los primeros días del nuevo año?|Qu'est-ce que le hatsumode, fait dans les premiers jours de la nouvelle année ?|「初詣」とは、年が明けて何をすることか?",
    [
      "The first meal shared with family|La primera comida compartida en familia|Le premier repas partagé en famille|年が明けて初めて家族で食事をすること",
      "The year's first visit to a shrine or temple|La primera visita del año a un santuario o templo|La première visite de l'année à un sanctuaire ou un temple|年が明けて初めて神社や寺に参拝すること",
      "The first day back at work|El primer día de vuelta al trabajo|Le premier jour de retour au travail|年明け最初の仕事始めの日",
    ],
    1,
    "Popular shrines can draw over a million visitors across the first three days of January alone, with lines stretching for hours just to toss a coin and pray. Many people also draw a paper fortune, omikuji, and tie the unlucky ones to a tree or rack rather than take them home.|Los santuarios populares pueden atraer a más de un millón de visitantes solo en los primeros tres días de enero, con filas que se extienden durante horas solo para lanzar una moneda y rezar. Mucha gente también saca una fortuna en papel, omikuji, y ata las de mala suerte a un árbol o soporte en lugar de llevárselas a casa.|Les sanctuaires populaires peuvent attirer plus d'un million de visiteurs rien que dans les trois premiers jours de janvier, avec des files d'attente s'étirant sur des heures juste pour jeter une pièce et prier. Beaucoup de gens tirent aussi une fortune en papier, omikuji, et attachent celles de mauvais augure à un arbre ou un support plutôt que de les rapporter chez eux.|人気の神社では1月の三が日だけで100万人を超える参拝者が訪れ、賽銭を投げて祈るだけのために何時間も列ができることがある。おみくじを引き、凶が出た場合は持ち帰らず木や棚に結んでいく人も多い。",
  ),

  q(
    5,
    "What is nijushi-sekki, a traditional calendar system dividing the solar year?|¿Qué es el nijushi-sekki, un sistema de calendario tradicional que divide el año solar?|Qu'est-ce que le nijushi-sekki, un système calendaire traditionnel divisant l'année solaire ?'|太陽の動きをもとに一年を24に分けた暦の区分「二十四節気」とは何か?",
    [
      "24 lucky and unlucky days in a month|24 días de suerte y mala suerte en un mes|24 jours fastes et néfastes dans un mois|一か月のうちの吉凶24日",
      "24 divisions of the solar year tied to the seasons|24 divisiones del año solar ligadas a las estaciones|24 divisions de l'année solaire liées aux saisons|季節に対応させて一年を24に分けた区分",
      "24 hours counted in the old time system|24 horas contadas en el antiguo sistema horario|24 heures comptées dans l'ancien système horaire|旧来の時刻制度で数えた24時間",
    ],
    1,
    "Terms such as risshun (the start of spring) and geshi (the summer solstice) still appear on Japanese calendars and in weather forecasts even though the country now uses the Gregorian calendar day to day. The system came from China but is still used to talk about the turning of Japan's seasons.|Términos como risshun (el inicio de la primavera) y geshi (el solsticio de verano) todavía aparecen en los calendarios japoneses y en los pronósticos del tiempo, aunque el país ahora usa el calendario gregoriano en el día a día. El sistema vino de China pero todavía se usa para hablar del cambio de estaciones en Japón.|Des termes comme risshun (le début du printemps) et geshi (le solstice d'été) apparaissent encore sur les calendriers japonais et dans les bulletins météo, même si le pays utilise désormais le calendrier grégorien au quotidien. Le système vient de Chine mais sert encore à parler du changement des saisons au Japon.|「立春」「夏至」といった語は今も日本のカレンダーや天気予報に登場する。日常はグレゴリオ暦を使っていても、季節の移り変わりを語るときにはこの中国由来の区分が今も使われている。",
  ),

  q(
    5,
    "What are ochugen and oseibo, given around midsummer and year-end?|¿Qué son el ochugen y el oseibo, que se entregan a mediados de verano y a fin de año?|Que sont l'ochugen et l'oseibo, offerts vers le milieu de l'été et en fin d'année ?|夏と年末に贈る「お中元」「お歳暮」とは何か?",
    [
      "Special stamps issued twice a year|Sellos especiales emitidos dos veces al año|Des timbres spéciaux émis deux fois par an|年に2回発行される特別な切手",
      "Taxes paid twice a year by merchants|Impuestos pagados dos veces al año por los comerciantes|Des impôts payés deux fois par an par les commerçants|商人が年に2回納める税",
      "Seasonal gifts to thank people for their kindness|Regalos de temporada para agradecer la amabilidad de la gente|Des cadeaux saisonniers pour remercier les gens de leur gentillesse|日頃の感謝を込めて贈る季節の贈答品",
    ],
    2,
    "They are typically sent to bosses, business contacts, and relatives one has been indebted to, often through a department store's gift-wrapping and delivery service rather than handed over in person. Popular choices include beer, cooking oil, and boxes of fruit or ham.|Suelen enviarse a jefes, contactos de negocios y familiares con quienes se tiene una deuda de gratitud, a menudo a través del servicio de envoltura y entrega de regalos de unos grandes almacenes en lugar de entregarse en persona. Las opciones populares incluyen cerveza, aceite de cocina y cajas de fruta o jamón.|Ils sont généralement envoyés à des supérieurs, des contacts professionnels et des proches envers qui l'on a une dette de gratitude, souvent via le service d'emballage-cadeau et de livraison d'un grand magasin plutôt que remis en personne. Les choix populaires incluent la bière, l'huile de cuisson et des boîtes de fruits ou de jambon.|世話になった上司や取引先、親戚などに贈られ、直接手渡すよりデパートの包装・配送サービスを使うことが多い。ビールや食用油、果物やハムの詰め合わせが定番とされる。",
  ),

  q(
    6,
    "What is a furoshiki used for?|¿Para qué se usa un furoshiki?|À quoi sert un furoshiki ?|「風呂敷」とは何に使う布か?",
    [
      "Wiping the floor of a bathhouse|Limpiar el suelo de una casa de baños|Essuyer le sol d'un établissement de bains|銭湯の床を拭くこと",
      "Wrapping and carrying objects|Envolver y transportar objetos|Envelopper et transporter des objets|物を包んで運ぶこと",
      "Covering a low table in winter|Cubrir una mesa baja en invierno|Recouvrir une table basse en hiver|冬に低い机を覆うこと",
    ],
    1,
    "The name literally means \"bath spread,\" from an old practice of wrapping clothes in a cloth at public bathhouses, and it later became an all-purpose wrapper for gifts, bento boxes, or anything awkward to carry. A single square of cloth can be tied into dozens of different shapes depending on what is being carried.|El nombre significa literalmente «tela de baño», por una antigua costumbre de envolver la ropa en una tela en los baños públicos, y más tarde se convirtió en un envoltorio de uso general para regalos, cajas de bento o cualquier cosa incómoda de llevar. Un solo cuadrado de tela se puede anudar en docenas de formas distintas según lo que se transporte.|Le nom signifie littéralement « tissu de bain », d'une ancienne pratique consistant à envelopper ses vêtements dans un tissu dans les bains publics, et il est devenu plus tard un emballage universel pour les cadeaux, les boîtes bento ou tout objet difficile à porter. Un simple carré de tissu peut être noué de dizaines de façons différentes selon ce qu'il transporte.|「風呂を広げる布」の意で、銭湯で衣服をまとめて包んだ習慣に由来する。のちに贈り物や弁当、持ちにくい物まで包む万能の布となり、包み方を変えれば同じ一枚布でも何十通りにも結べる。",
  ),

  q(
    5,
    "What is a kotatsu?|¿Qué es un kotatsu?|Qu'est-ce qu'un kotatsu ?|「こたつ」とは何か?",
    [
      "A traditional Japanese bathtub|Una bañera tradicional japonesa|Une baignoire traditionnelle japonaise|日本の伝統的な浴槽",
      "A low heated table with a quilt over it|Una mesa baja con calefacción y un edredón encima|Une table basse chauffée recouverte d'une couette|熱源と布団を備えた低い座卓",
      "A portable charcoal stove for outdoor use|Una estufa de carbón portátil para uso exterior|Un poêle à charbon portable pour usage extérieur|屋外用の持ち運べる炭火コンロ",
    ],
    1,
    "A heater sits under the tabletop, and a thick quilt is sandwiched between the table frame and a removable top so that legs stay warm while the rest of the room stays cool. Whole families are known to end up eating, napping, and watching television without ever leaving the table on a winter evening.|Un calentador se coloca bajo el tablero de la mesa, y un edredón grueso queda encajado entre el armazón de la mesa y una tapa extraíble para que las piernas se mantengan calientes mientras el resto de la habitación permanece fresco. Es bien sabido que familias enteras acaban comiendo, echándose la siesta y viendo la televisión sin salir jamás de la mesa en una noche de invierno.|Un chauffage se trouve sous le plateau de la table, et une épaisse couette est coincée entre le cadre de la table et un plateau amovible, si bien que les jambes restent au chaud tandis que le reste de la pièce reste frais. Des familles entières finissent réputées à manger, faire la sieste et regarder la télévision sans jamais quitter la table par une soirée d'hiver.|机の下に熱源を備え、机の枠と取り外し可能な天板の間に厚い布団を挟み込むことで、足元だけを暖めながら部屋全体は涼しいままにできる。冬の夜、家族がこたつから一歩も動かず食事も昼寝もテレビ鑑賞も済ませてしまうことがよくある。",
  ),

  q(
    6,
    "The word bonsai is written with characters meaning what?|¿La palabra bonsai se escribe con caracteres que significan qué?|Le mot bonsai s'écrit avec des caractères signifiant quoi ?|「盆栽」という語を漢字の意味からたどると何か?",
    [
      "A tree that never grows|Un árbol que nunca crece|Un arbre qui ne pousse jamais|決して育たない木",
      "A tree bent by the wind|Un árbol doblado por el viento|Un arbre courbé par le vent|風に曲げられた木",
      "A tree planted in a shallow tray|Un árbol plantado en una bandeja poco profunda|Un arbre planté dans un plateau peu profond|浅い鉢に植えた木",
    ],
    2,
    "The first character means a shallow tray or pot, and the second means to plant or cultivate, describing the practice quite literally rather than the tiny size people often assume it refers to. Some bonsai trees are kept alive and pruned across several human generations, passed down within a family.|El primer carácter significa una bandeja o maceta poco profunda, y el segundo significa plantar o cultivar, describiendo la práctica de manera bastante literal en lugar del tamaño diminuto que la gente suele suponer que indica. Algunos bonsáis se mantienen vivos y podados durante varias generaciones humanas, transmitidos dentro de una familia.|Le premier caractère signifie un plateau ou un pot peu profond, et le second signifie planter ou cultiver, décrivant la pratique de façon assez littérale plutôt que la taille minuscule que l'on suppose souvent. Certains bonsaïs sont maintenus en vie et taillés sur plusieurs générations humaines, transmis au sein d'une famille.|最初の字は浅い鉢や盆を、次の字は植え育てることを意味し、思われがちな「小さい木」という意味そのものではない。何世代にもわたって手入れを受け継ぎ、家族の中で代々受け継がれる盆栽もある。",
  ),

  q(
    6,
    "What kind of traditional performing art is bunraku?|¿Qué tipo de arte escénico tradicional es el bunraku?|Quel type d'art de la scène traditionnel est le bunraku ?|「文楽」とは何の伝統芸能か?",
    [
      "Puppet theater with narrated chanting|Teatro de marionetas con narración cantada|Un théâtre de marionnettes avec un chant narré|語りに合わせて演じる人形浄瑠璃",
      "A style of comic monologue|Un estilo de monólogo cómico|Un style de monologue comique|落語のような話芸",
      "A form of solo drum performance|Una forma de interpretación de tambor en solitario|Une forme de performance de tambour en solo|太鼓を独奏する芸能",
    ],
    0,
    "Each puppet, roughly the size of a small child, is worked by three visible operators moving as one, while a chanter voices every character and a shamisen player sets the mood. Getting the head-and-hands operator to a level where they can lead a scene can take decades of apprenticeship.|Cada marioneta, del tamaño aproximado de un niño pequeño, es manejada por tres operadores visibles que se mueven como uno solo, mientras un narrador da voz a todos los personajes y un intérprete de shamisen marca el ambiente. Llegar al nivel en que el operador de cabeza y manos puede liderar una escena puede llevar décadas de aprendizaje.|Chaque marionnette, de la taille approximative d'un petit enfant, est manipulée par trois opérateurs visibles se mouvant comme un seul, tandis qu'un chanteur donne voix à tous les personnages et qu'un joueur de shamisen installe l'ambiance. Atteindre le niveau où l'opérateur de la tête et des mains peut mener une scène peut prendre des décennies d'apprentissage.|子ども程度の大きさの人形を、姿を見せたまま3人の遣い手が息を合わせて操り、太夫がすべての登場人物のせりふを語り分け、三味線が場を彩る。頭と右手を担う遣い手が場を仕切れる域に達するには、何十年もの修行がいるとされる。",
  ),

  q(
    5,
    "In kabuki theater, what is an onnagata?|¿Qué es un onnagata en el teatro kabuki?|Qu'est-ce qu'un onnagata dans le théâtre kabuki ?|歌舞伎の「女形(おやま)」とは何か?",
    [
      "A stage assistant dressed in black|Un asistente de escena vestido de negro|Un assistant de scène habillé en noir|黒い衣装をまとった舞台の裏方",
      "A male actor who plays female roles|Un actor masculino que interpreta papeles femeninos|Un acteur masculin jouant des rôles féminins|女性の役を演じる男性役者",
      "A female narrator who chants the story|Una narradora femenina que canta la historia|Une narratrice qui chante l'histoire|物語を語る女性の語り手",
    ],
    1,
    "Women were barred from kabuki stages in the 1600s after disputes broke out over actresses moonlighting in prostitution, and the specialized art of playing women convincingly developed among male actors afterward. Some onnagata actors have trained in the role from childhood and are celebrated for it across an entire career.|A las mujeres se les prohibió actuar en los escenarios de kabuki en el siglo XVII tras estallar disputas por actrices que se dedicaban también a la prostitución, y el arte especializado de interpretar mujeres de forma convincente se desarrolló después entre actores masculinos. Algunos actores onnagata se han formado en el papel desde la infancia y son celebrados por ello durante toda una carrera.|Les femmes ont été bannies des scènes de kabuki au 17e siècle après des différends nés d'actrices se livrant aussi à la prostitution, et l'art spécialisé de jouer les femmes de façon convaincante s'est ensuite développé chez des acteurs masculins. Certains acteurs onnagata sont formés à ce rôle depuis l'enfance et sont célébrés pour cela toute leur carrière.|17世紀に女優が売春を兼ねる問題から女性の出演が禁じられ、以後は男性役者が女性らしさを演じ切る専門の芸として発達した。幼い頃から女形一筋に育ち、その芸だけで生涯にわたり称えられる役者もいる。",
  ),

  q(
    5,
    "Of Japan's 47 prefectures, only two use the character fu (府) instead of ken, do, or to. Which two are they?|De las 47 prefecturas de Japón, solo dos usan el carácter fu (府) en lugar de ken, do o to. ¿Cuáles son?|Parmi les 47 préfectures du Japon, seules deux utilisent le caractère fu (府) au lieu de ken, do ou to. Lesquelles ?|47都道府県のうち「府」がつくのは2つだけである。どこか?",
    [
      "Kyoto and Nara|Kioto y Nara|Kyoto et Nara|京都府と奈良県",
      "Osaka and Kyoto|Osaka y Kioto|Osaka et Kyoto|大阪府と京都府",
      "Tokyo and Osaka|Tokio y Osaka|Tokyo et Osaka|東京都と大阪府",
    ],
    1,
    "Tokyo alone uses to (都), Hokkaido alone uses do (道), and the remaining 43 use ken. The four different labels are a leftover of how the Meiji government folded together earlier domains and city administrations at different times rather than a sign of different status today.|Solo Tokio usa to (都), solo Hokkaido usa do (道), y las 43 restantes usan ken. Las cuatro etiquetas distintas son un resto de cómo el gobierno Meiji fusionó los antiguos dominios y las administraciones urbanas en momentos diferentes, más que una señal de distinto estatus hoy.|Seul Tokyo utilise to (都), seul Hokkaido utilise do (道), et les 43 restantes utilisent ken. Les quatre étiquettes différentes sont un vestige de la manière dont le gouvernement Meiji a fusionné d'anciens domaines et administrations urbaines à des moments différents, plutôt qu'un signe de statut différent aujourd'hui.|「都」は東京都だけ、「道」は北海道だけで、残る43はすべて「県」である。4種類の呼び方の違いは、明治政府が旧来の藩や都市の行政組織を別々の時期に統合していった名残であり、今の地位の違いを表すものではない。",
  ),

  q(
    6,
    "What was man'yogana, an early Japanese writing system?|¿Qué era el man'yogana, un sistema de escritura japonés temprano?|Qu'était le man'yogana, un ancien système d'écriture japonais ?|「万葉仮名」とは何を表すための書き方だったか?",
    [
      "A secret code used in wartime|Un código secreto usado en tiempos de guerra|Un code secret utilisé en temps de guerre|戦時に使われた暗号",
      "Japanese sounds written using the pronunciation of kanji|Sonidos japoneses escritos usando la pronunciación de los kanji|Des sons japonais écrits en utilisant la prononciation des kanji|漢字の音を借りて日本語の音を表した書き方",
      "A simplified script used only by children|Una escritura simplificada usada solo por niños|Une écriture simplifiée utilisée uniquement par les enfants|子どもだけが使った簡易な文字",
    ],
    1,
    "Before hiragana and katakana existed, Chinese characters were borrowed purely for their sound to spell out Japanese words, ignoring their original meaning — the system takes its name from the Man'yoshu poetry anthology, which used it heavily. Hiragana later evolved by simplifying the shapes of these same borrowed characters.|Antes de que existieran el hiragana y el katakana, se tomaban prestados caracteres chinos solo por su sonido para deletrear palabras japonesas, ignorando su significado original; el sistema toma su nombre de la antología poética Man'yoshu, que lo usó ampliamente. El hiragana evolucionó después simplificando las formas de estos mismos caracteres prestados.|Avant l'existence du hiragana et du katakana, des caractères chinois étaient empruntés uniquement pour leur son afin d'épeler des mots japonais, en ignorant leur sens d'origine — le système tire son nom de l'anthologie poétique Man'yoshu, qui l'utilisait abondamment. Le hiragana a ensuite évolué en simplifiant les formes de ces mêmes caractères empruntés.|ひらがな・カタカナが生まれる前、漢字を本来の意味とは切り離して音だけを借り、日本語の音を書き表した方法である。この書き方を多用した歌集「万葉集」にちなんで名がついた。ひらがなは、この借用した漢字の形を簡略化して生まれたとされる。",
  ),

  q(
    6,
    "What is oshizushi, a style of sushi distinct from hand-formed nigiri?|¿Qué es el oshizushi, un estilo de sushi distinto del nigiri formado a mano?|Qu'est-ce que l'oshizushi, un style de sushi différent du nigiri façonné à la main ?|握らずに型に押し詰めて作る寿司「押し寿司」とは何か?",
    [
      "Sushi pressed into a wooden mold|Sushi prensado en un molde de madera|Un sushi pressé dans un moule en bois|木型に押し詰めて作る寿司",
      "Sushi rolled by hand into a cone shape|Sushi enrollado a mano en forma de cono|Un sushi roulé à la main en forme de cône|手で巻いて円錐形にする寿司",
      "Sushi wrapped in bamboo leaves and steamed|Sushi envuelto en hojas de bambú y cocido al vapor|Un sushi enveloppé dans des feuilles de bambou et cuit à la vapeur|竹の葉に包んで蒸す寿司",
    ],
    0,
    "Layers of vinegared rice and toppings are packed into a wooden box or mold and pressed under weight, then sliced into neat rectangles once unmolded — a style long associated with the Kansai region, in contrast to the hand-shaped nigiri that developed in Edo-period Tokyo. It travels and keeps its shape far better than nigiri, which suited it to festivals and long journeys.|Capas de arroz avinagrado y coberturas se compactan en una caja o molde de madera y se prensan bajo peso, luego se cortan en rectángulos ordenados una vez desmoldadas: un estilo asociado desde hace tiempo a la región de Kansai, en contraste con el nigiri formado a mano que se desarrolló en el Tokio del periodo Edo. Viaja y mantiene su forma mucho mejor que el nigiri, lo que lo hacía ideal para festivales y viajes largos.|Des couches de riz vinaigré et de garnitures sont tassées dans une boîte ou un moule en bois et pressées sous un poids, puis découpées en rectangles nets une fois démoulées — un style longtemps associé à la région du Kansai, contrastant avec le nigiri façonné à la main né dans le Tokyo de l'époque d'Edo. Il voyage et garde sa forme bien mieux que le nigiri, ce qui le rendait adapté aux festivals et aux longs trajets.|酢飯と具材を木箱や型に何層も詰めて重しをかけ、型から出したあと四角く切り分けて作る。江戸で発達した握り寿司に対し、関西で古くから親しまれてきた形とされる。握り寿司より型崩れしにくく、祭りや長旅の携行食にも向いていた。",
  ),

  q(
    6,
    "What is traditionally eaten on the Day of the Ox in midsummer (doyo no ushi no hi)?|¿Qué se come tradicionalmente en el Día del Buey de pleno verano (doyo no ushi no hi)?|Que mange-t-on traditionnellement le jour du Bœuf en plein été (doyo no ushi no hi) ?|夏の「土用の丑の日」に食べる習慣があるものは?",
    [
      "Eel|Anguila|De l'anguille|うなぎ",
      "Cold soba noodles|Soba frío|Des nouilles soba froides|冷たいそば",
      "Beef|Carne de res|Du bœuf|牛肉",
    ],
    0,
    "The custom is often traced to an Edo-period scholar who, asked by a struggling eel shop how to bring in summer customers, suggested a sign reading \"Today is the Day of the Ox\" — playing on a folk belief that foods starting with \"u\" fight off summer fatigue. Eel happens to start with that sound in Japanese, and the marketing idea stuck for good.|La costumbre suele atribuirse a un erudito del periodo Edo que, al ser consultado por una anguilería en apuros sobre cómo atraer clientes en verano, sugirió un cartel que dijera «Hoy es el Día del Buey», jugando con la creencia popular de que los alimentos que empiezan por «u» combaten el cansancio veraniego. La anguila empieza precisamente por ese sonido en japonés, y la idea de marketing se quedó para siempre.|La coutume est souvent attribuée à un érudit de l'époque d'Edo qui, sollicité par une boutique d'anguilles en difficulté pour attirer les clients d'été, aurait suggéré une pancarte disant « Aujourd'hui, c'est le jour du Bœuf », jouant sur une croyance populaire selon laquelle les aliments commençant par « u » combattent la fatigue estivale. L'anguille commence justement par ce son en japonais, et l'idée marketing est restée pour de bon.|江戸時代、客の減った鰻屋に相談された学者が「本日丑の日」という看板を勧めたという逸話が由来とされる。「う」で始まる食べ物が夏バテを防ぐという言い伝えに乗せたもので、「うなぎ」がまさにそれに当たったことから宣伝文句がそのまま定着した。",
  ),

  q(
    5,
    "What was the original idea behind osechi, the food packed into stacked boxes for New Year's?|¿Cuál era la idea original detrás del osechi, la comida que se empaqueta en cajas apiladas para Año Nuevo?|Quelle était l'idée originelle derrière l'osechi, la nourriture empilée dans des boîtes pour le Nouvel An ?|正月に重箱へ詰める「おせち料理」の本来のねらいは何か?",
    [
      "Dishes that keep well, so cooking can be set aside for a few days|Platos que se conservan bien, para poder dejar de cocinar unos días|Des plats qui se conservent bien, pour pouvoir suspendre la cuisine quelques jours|保存が利く料理で、数日は台所仕事を休めるようにすること",
      "Dishes that must be eaten within one sitting|Platos que deben comerse en una sola sentada|Des plats devant être mangés en un seul repas|一度の食事で食べきる料理にすること",
      "Dishes shared exclusively with guests, never family|Platos compartidos exclusivamente con invitados, nunca con la familia|Des plats partagés exclusivement avec des invités, jamais la famille|家族ではなく客だけに出す料理にすること",
    ],
    0,
    "Many of the dishes are simmered, vinegared, or dried in ways that keep for days, a practical answer to an old belief that the kitchen fire and its noisy work should rest over the first days of the year. Each item also carries its own wish, such as sweet black beans for good health or kelp rolls for happiness, playing on words that sound alike.|Muchos de los platos se cuecen a fuego lento, se avinagran o se secan de formas que se conservan durante días, una respuesta práctica a una vieja creencia de que el fuego de la cocina y su trabajo ruidoso deben descansar durante los primeros días del año. Cada plato también lleva su propio deseo, como judías negras dulces para la salud o rollos de kombu para la felicidad, jugando con palabras que suenan parecido.|Beaucoup de plats sont mijotés, vinaigrés ou séchés de façon à se conserver plusieurs jours, une réponse pratique à une vieille croyance selon laquelle le feu de cuisine et son travail bruyant doivent se reposer pendant les premiers jours de l'année. Chaque plat porte aussi son propre vœu, comme des haricots noirs sucrés pour la santé ou des rouleaux de kombu pour le bonheur, jouant sur des mots qui se ressemblent.|多くの料理は煮しめや酢の物、乾物など日持ちする形で作られ、正月の数日はかまどの火を休めるべきという古い考えに応える工夫とされる。黒豆は健康、昆布巻きは「よろこぶ」に通じるなど、料理ひとつひとつに語呂合わせの願いが込められている。",
  ),

  q(
    6,
    "Kombu, a kelp used for dashi, is especially rich in which taste-producing compound?|El kombu, un alga usada para el dashi, es especialmente rico en qué compuesto que produce sabor?|Le kombu, une algue utilisée pour le dashi, est particulièrement riche en quel composé responsable d'une saveur ?|だしに使われる昆布に特に多く含まれ、うま味のもとになる成分は何か?",
    [
      "Citric acid|Ácido cítrico|L'acide citrique|クエン酸",
      "Glutamate|Glutamato|Le glutamate|グルタミン酸",
      "Fructose|Fructosa|Le fructose|果糖",
    ],
    1,
    "A Japanese chemist isolated glutamate from kombu broth in 1908 and named the taste it produces umami, proposing it as a fifth basic taste alongside sweet, sour, salty, and bitter. The idea was met with skepticism abroad for decades before taste receptors for glutamate were confirmed on the tongue.|Un químico japonés aisló el glutamato del caldo de kombu en 1908 y llamó umami al sabor que produce, proponiéndolo como un quinto sabor básico junto al dulce, ácido, salado y amargo. La idea fue recibida con escepticismo en el extranjero durante décadas antes de que se confirmaran receptores de glutamato en la lengua.|Un chimiste japonais a isolé le glutamate du bouillon de kombu en 1908 et a nommé umami la saveur qu'il produit, le proposant comme une cinquième saveur de base aux côtés du sucré, de l'acide, du salé et de l'amer. L'idée a été accueillie avec scepticisme à l'étranger pendant des décennies avant que des récepteurs du glutamate ne soient confirmés sur la langue.|1908年、日本の化学者が昆布の出汁からグルタミン酸を取り出し、それが生む味を「うま味」と名づけ、甘味・酸味・塩味・苦味に次ぐ第五の基本味だと唱えた。舌にグルタミン酸を感じる受容体があると確認されるまで、海外では長らく懐疑的に見られていたとされる。",
  ),

  q(
    6,
    "Broth for soba and udon is often said to taste different between Kanto and Kansai. What is the color difference usually put down to?|Se suele decir que el caldo del soba y el udon sabe distinto entre Kanto y Kansai. ¿A qué se suele atribuir la diferencia de color?|On dit souvent que le bouillon du soba et de l'udon a un goût différent entre le Kanto et le Kansai. À quoi attribue-t-on généralement la différence de couleur ?|そばやうどんのつゆの色が関東と関西で違うとよく言われる。その違いは主に何によるとされるか?",
    [
      "The width of the noodles used|El grosor de los fideos usados|La largeur des nouilles utilisées|使う麺の太さの違い",
      "Which type of soy sauce is mainly used|Qué tipo de salsa de soja se usa principalmente|Quel type de sauce soja est principalement utilisé|主に使う醤油の種類の違い",
      "Whether the broth is served hot or cold|Si el caldo se sirve caliente o frío|Si le bouillon est servi chaud ou froid|つゆを温かいか冷たいかで出すかの違い",
    ],
    1,
    "Kanto broths lean on dark, strongly flavored koikuchi soy sauce with a heavy katsuobushi dashi, while Kansai broths favor pale usukuchi soy sauce built on a kombu-forward dashi, which is saltier than it looks despite the lighter color. Visitors used to one style are sometimes caught off guard by how different the other tastes.|Los caldos de Kanto se apoyan en la salsa de soja koikuchi, oscura y de sabor fuerte, con un dashi cargado de katsuobushi, mientras que los de Kansai prefieren la salsa de soja usukuchi, más pálida, sobre un dashi con predominio de kombu, que es más salado de lo que parece pese a su color más claro. Los visitantes acostumbrados a un estilo a veces se sorprenden por lo distinto que sabe el otro.|Les bouillons du Kanto s'appuient sur la sauce soja koikuchi, sombre et au goût prononcé, avec un dashi chargé en katsuobushi, tandis que ceux du Kansai privilégient la sauce soja usukuchi, plus pâle, sur un dashi dominé par le kombu, plus salé qu'il n'y paraît malgré sa couleur claire. Les visiteurs habitués à un style sont parfois surpris par le goût très différent de l'autre.|関東は色が濃く風味の強い濃口醤油とかつお節主体の出汁を使い、関西は色の薄い薄口醤油と昆布主体の出汁を使う。薄口は見た目より塩分が高いとされ、片方に慣れた人がもう片方を口にすると驚くことがある。",
  ),

  q(
    5,
    "Which government-level office name, seen in terms like Keisatsu-cho (National Police Agency), sits under a ministry rather than being a ministry itself?|¿Qué nombre de organismo gubernamental, visto en términos como Keisatsu-cho (Agencia Nacional de Policía), depende de un ministerio en lugar de ser un ministerio en sí?|Quel type d'organisme gouvernemental, vu dans des termes comme Keisatsu-cho (Agence nationale de police), dépend d'un ministère plutôt que d'en être un lui-même ?|「気象庁」「金融庁」のように省の下に置かれる行政組織を指す語は何か?",
    [
      "Sho (省)|Sho (省)|Sho (省)|省",
      "Cho (庁)|Cho (庁)|Cho (庁)|庁",
      "Ken (県)|Ken (県)|Ken (県)|県",
    ],
    1,
    "A sho is a full ministry, such as the Ministry of Finance, while a cho is a subordinate agency handling a narrower job, such as weather forecasting or tax collection, and reports up through a parent ministry. The distinction mirrors, on paper, something like the difference between a government department and an agency under it in other countries.|Un sho es un ministerio pleno, como el Ministerio de Finanzas, mientras que un cho es una agencia subordinada que se ocupa de una tarea más específica, como la previsión meteorológica o la recaudación de impuestos, y depende de un ministerio superior. La distinción refleja, sobre el papel, algo parecido a la diferencia entre un departamento gubernamental y una agencia bajo él en otros países.|Un sho est un ministère à part entière, comme le ministère des Finances, tandis qu'un cho est une agence subordonnée s'occupant d'une tâche plus étroite, comme les prévisions météorologiques ou la collecte des impôts, et relève d'un ministère de tutelle. La distinction reflète, sur le papier, quelque chose comme la différence entre un département gouvernemental et une agence qui en dépend dans d'autres pays.|「省」は財務省のような独立した省庁だが、「庁」は気象予報や徴税のような限られた仕事を担う下部組織で、上位の省の管轄下にある。他国でいう省庁とその外局の関係に近い区分といえる。",
  ),

  q(
    6,
    "In 1873, the Meiji government replaced the old lunar calendar with which calendar?|En 1873, ¿con qué calendario reemplazó el gobierno Meiji el antiguo calendario lunar?|En 1873, par quel calendrier le gouvernement Meiji a-t-il remplacé l'ancien calendrier lunaire ?|1873年に明治政府が旧来の太陰太陽暦に代わって導入した暦は何か?",
    [
      "A ten-day week calendar|Un calendario de semanas de diez días|Un calendrier à semaines de dix jours|10日を一週間とする暦",
      "A calendar counted from the founding of Tokyo|Un calendario contado desde la fundación de Tokio|Un calendrier compté depuis la fondation de Tokyo|東京の建設年から数える暦",
      "The solar (Gregorian) calendar|El calendario solar (gregoriano)|Le calendrier solaire (grégorien)|太陽暦(グレゴリオ暦)",
    ],
    2,
    "The switch was announced with barely a month's notice at the end of 1872, and the third day of the twelfth lunar month simply became January 1st of the new calendar, wiping out the rest of that lunar year. One motive cited afterward was that the change let the government skip paying a thirteenth month of salaries that the old calendar's leap month would have required that year.|El cambio se anunció con apenas un mes de aviso a finales de 1872, y el tercer día del duodécimo mes lunar simplemente se convirtió en el 1 de enero del nuevo calendario, eliminando el resto de ese año lunar. Un motivo citado después fue que el cambio permitió al gobierno evitar pagar un decimotercer mes de sueldos que el mes intercalar del antiguo calendario habría exigido ese año.|Le changement a été annoncé avec à peine un mois de préavis fin 1872, et le troisième jour du douzième mois lunaire est simplement devenu le 1er janvier du nouveau calendrier, effaçant le reste de cette année lunaire. Une raison citée par la suite est que le changement a permis au gouvernement d'éviter de payer un treizième mois de salaires qu'un mois intercalaire de l'ancien calendrier aurait exigé cette année-là.|1872年末、わずか1か月ほどの告知で切り替えが発表され、旧暦12月3日がそのまま新暦の1月1日となり、その年の残りの旧暦の日付は消えた。旧暦のままだとその年は閏月が入り給与を13か月分払う必要があったため、それを避ける狙いがあったとも言われる。",
  ),

  q(
    4,
    "How many years does compulsory education last in Japan?|¿Cuántos años dura la educación obligatoria en Japón?|Combien d'années dure la scolarité obligatoire au Japon ?|日本の義務教育は何年間か?",
    [
      "12 years|12 años|12 ans|12年間",
      "9 years|9 años|9 ans|9年間",
      "6 years|6 años|6 ans|6年間",
    ],
    1,
    "It covers six years of elementary school followed by three years of junior high school; high school, though attended by the overwhelming majority of students, is technically optional. Textbooks for the compulsory years are provided free of charge, a policy in place since the 1960s.|Cubre seis años de escuela primaria seguidos de tres años de secundaria básica; la escuela secundaria superior, aunque a ella asiste la gran mayoría de los estudiantes, es técnicamente opcional. Los libros de texto de los años obligatorios se entregan gratis, una política vigente desde la década de 1960.|Elle couvre six ans d'école primaire suivis de trois ans de collège ; le lycée, bien que fréquenté par l'immense majorité des élèves, est techniquement facultatif. Les manuels des années obligatoires sont fournis gratuitement, une politique en vigueur depuis les années 1960.|小学校6年間と中学校3年間を合わせた9年間を指す。高校は大多数の生徒が進学するものの、制度上は義務ではない。義務教育の期間の教科書は1960年代から無償で配布されている。",
  ),

  q(
    8,
    "Why did Japan's railways adopt an internationally unusual 1067mm narrow gauge in the early Meiji era?|¿Por qué los ferrocarriles japoneses adoptaron una vía estrecha de 1067mm, poco común internacionalmente, a comienzos de la era Meiji?|Pourquoi les chemins de fer japonais ont-ils adopté un écartement étroit de 1067mm, rare à l'international, au début de l'ère Meiji ?|明治初期、日本の鉄道が国際的にも珍しい狭軌(1067mm)を採用した最大の理由は?",
    [
      "To match the standard used in Britain, home of the hired engineers|Para igualar el estándar usado en Gran Bretaña, país de los ingenieros contratados|Pour s'aligner sur la norme britannique, pays des ingénieurs engagés|招いた技師の母国イギリスの標準に合わせたため",
      "To keep construction costs and land purchases down|Para mantener bajos los costos de construcción y compra de terrenos|Pour limiter les coûts de construction et d'achat de terrain|建設費や用地取得を抑えるため",
      "Because domestically built steam locomotives were still weak|Porque las locomotoras de vapor fabricadas en el país aún eran débiles|Parce que les locomotives à vapeur fabriquées localement étaient encore faibles|国産の蒸気機関車の性能が低かったため",
    ],
    1,
    "Britain's own standard gauge is actually 1435mm; Japan's 1067mm is the narrower \"Cape gauge.\" With rugged terrain and a tight budget, the engineer Edmund Morel and others recommended the cheaper narrow gauge, a choice that later became a drag on how fast trains could safely run.|El propio estándar británico es en realidad 1435mm; los 1067mm de Japón son la vía más estrecha llamada «vía Cabo». Con un terreno accidentado y un presupuesto ajustado, el ingeniero Edmund Morel y otros recomendaron la vía estrecha más barata, una elección que más tarde frenó la velocidad a la que los trenes podían circular con seguridad.|L'écartement standard britannique est en réalité de 1435mm ; les 1067mm du Japon correspondent à l'écartement plus étroit dit « du Cap ». Avec un terrain accidenté et un budget serré, l'ingénieur Edmund Morel et d'autres ont recommandé la voie étroite moins chère, un choix qui a ensuite freiné la vitesse à laquelle les trains pouvaient circuler en toute sécurité.|イギリス本国の標準軌は実は1435mmで、日本の1067mmはケープゲージと呼ばれるより狭い規格である。険しい地形と乏しい資金の中、技師エドモンド・モレルらの助言で安価な狭軌が選ばれたが、これが後年、列車の高速化の足かせにもなった。",
  ),

  q(
    8,
    "The Shinkansen uses the international standard 1435mm gauge, unlike Japan's older lines. What made this possible?|El Shinkansen usa la vía internacional estándar de 1435mm, a diferencia de las líneas japonesas más antiguas. ¿Qué lo hizo posible?|Le Shinkansen utilise l'écartement international standard de 1435mm, contrairement aux anciennes lignes japonaises. Qu'est-ce qui a rendu cela possible ?|新幹線が在来線とは異なる国際標準の1435mm軌間を採用できた理由は?",
    [
      "Narrow gauge track was banned after the war|La vía estrecha fue prohibida después de la guerra|La voie étroite a été interdite après la guerre|戦後に狭軌の敷設が禁じられたため",
      "Foreign investors required the international standard|Los inversores extranjeros exigieron el estándar internacional|Des investisseurs étrangers ont exigé la norme internationale|海外投資家が国際標準を要求したため",
      "It was built as an entirely new dedicated line, not a converted old one|Se construyó como una línea completamente nueva y dedicada, no una antigua convertida|Elle a été construite comme une ligne entièrement nouvelle et dédiée, pas une ancienne convertie|在来線を改良するのではなく、新規の専用路線として建設したため",
    ],
    2,
    "Rather than widening the existing narrow-gauge network, engineers built the Shinkansen as a separate, purpose-made line with no legacy constraints, free to use whichever gauge suited high-speed running. That \"a railway apart\" approach later became the model many other countries followed when building their own high-speed lines.|En lugar de ensanchar la red de vía estrecha existente, los ingenieros construyeron el Shinkansen como una línea separada y hecha a propósito, sin restricciones heredadas, libre de usar el ancho que conviniera a la circulación de alta velocidad. Ese enfoque de «ferrocarril aparte» se convirtió después en el modelo que siguieron muchos otros países al construir sus propias líneas de alta velocidad.|Plutôt que d'élargir le réseau à voie étroite existant, les ingénieurs ont construit le Shinkansen comme une ligne séparée et dédiée, sans contraintes héritées, libre d'utiliser l'écartement qui convenait à la grande vitesse. Cette approche de « chemin de fer à part » est ensuite devenue le modèle suivi par de nombreux autres pays construisant leurs propres lignes à grande vitesse.|既存の狭軌網を改良するのではなく、しがらみのない新規の専用路線として建設したため、高速走行に有利な軌間を自由に選べた。この「別の鉄道」という発想は、のちに世界各地の高速鉄道網を作る際の手本になった。",
  ),

  q(
    7,
    "A switchback lays track in a zigzag up a slope. What problem was it built to solve?|Un switchback traza la vía en zigzag por una pendiente. ¿Qué problema buscaba resolver?|Un switchback trace la voie en zigzag sur une pente. Quel problème visait-il à résoudre ?|急な斜面にレールをジグザグに敷く「スイッチバック」は何のための仕組みか?",
    [
      "Letting two trains pass on a single track|Permitir que dos trenes se crucen en una sola vía|Permettre à deux trains de se croiser sur une seule voie|単線ですれ違いをするため",
      "Avoiding a river crossing|Evitar cruzar un río|Éviter de traverser une rivière|川を渡るのを避けるため",
      "Climbing and descending a steep grade in stages|Subir y bajar una pendiente pronunciada por etapas|Gravir et descendre une forte pente par étapes|急な勾配を折り返しながら登り降りするため",
    ],
    2,
    "In the steam era, a train climbing a steep grade in one straight run risked running short of pulling power or braking power, so it reversed direction at each stage, working back and forth to gain height gradually. Stronger modern engines have made many switchbacks unnecessary, and their zigzag tracks now often survive only as abandoned relics.|En la era del vapor, un tren que subía una pendiente pronunciada en un solo tramo recto corría el riesgo de quedarse sin fuerza de tracción o de frenado, así que invertía la dirección en cada etapa, avanzando y retrocediendo para ganar altura gradualmente. Las locomotoras modernas, más potentes, han hecho innecesarios muchos switchbacks, y sus vías en zigzag hoy a menudo solo sobreviven como reliquias abandonadas.|À l'époque de la vapeur, un train montant une forte pente d'un seul trait risquait de manquer de puissance de traction ou de freinage, il inversait donc de direction à chaque étape, avançant et reculant pour gagner de l'altitude progressivement. Des locomotives modernes plus puissantes ont rendu inutiles de nombreux switchbacks, et leurs voies en zigzag ne survivent souvent plus qu'à l'état de vestiges abandonnés.|蒸気機関車の時代、急勾配を一気に登ると牽引力や制動力が足りなくなるため、駅ごとに前後を切り替えながら折り返して高度を稼いだ。動力の強い現代では不要になった例が多く、ジグザグの線路跡は廃線遺構として残るのみのことが多い。",
  ),

  q(
    8,
    "In what year did the Seikan Tunnel, the undersea rail link between Honshu and Hokkaido, open?|¿En qué año se inauguró el túnel Seikan, el enlace ferroviario submarino entre Honshu y Hokkaido?|En quelle année le tunnel Seikan, la liaison ferroviaire sous-marine entre Honshu et Hokkaido, a-t-il été ouvert ?|本州と北海道を結ぶ海底鉄道トンネル、青函トンネルが開通したのは何年?",
    [
      "2016|2016|2016|2016年",
      "1988|1988|1988|1988年",
      "1964|1964|1964|1964年",
    ],
    1,
    "Of its 53.85km total length, about 23km runs under the seabed, making it the world's longest undersea tunnel at the time it opened. The Shinkansen began running through it in 2016, but speeds there are still limited because it shares track with conventional freight trains.|De sus 53,85km de longitud total, unos 23km discurren bajo el lecho marino, lo que lo convirtió en el túnel submarino más largo del mundo cuando se inauguró. El Shinkansen empezó a circular por él en 2016, pero las velocidades allí siguen limitadas porque comparte vía con los trenes de carga convencionales.|Sur ses 53,85km de longueur totale, environ 23km passent sous le fond marin, ce qui en faisait le plus long tunnel sous-marin du monde à son ouverture. Le Shinkansen a commencé à y circuler en 2016, mais les vitesses y restent limitées car il partage la voie avec des trains de marchandises classiques.|全長53.85kmのうち海底部は約23kmで、開通当時は世界最長の海底トンネルだった。2016年には新幹線が乗り入れたが、在来の貨物列車と線路を共用するため速度は今も抑えられている。",
  ),

  q(
    8,
    "Traces of abandoned railway lines remain all over Japan. What is most often cited as the main reason lines were closed?|Quedan huellas de líneas ferroviarias abandonadas por todo Japón. ¿Qué se cita más a menudo como el motivo principal del cierre de líneas?|Des traces de lignes ferroviaires abandonnées subsistent partout au Japon. Quelle est la raison le plus souvent citée pour la fermeture des lignes ?|日本各地に廃線跡が残っているが、路線が廃止された主な理由として最も多く挙げられるのは何か?",
    [
      "Destruction during the war|La destrucción durante la guerra|La destruction pendant la guerre|戦争による破壊",
      "A change in track gauge standards|Un cambio en los estándares de ancho de vía|Un changement de norme d'écartement des voies|軌間の規格変更",
      "Falling ridership as cars became widespread|La caída de pasajeros al popularizarse el automóvil|La baisse de fréquentation avec la généralisation de la voiture|自動車の普及による利用者減",
    ],
    2,
    "As roads improved and private cars spread during the postwar growth years, riders on quiet rural lines dwindled, and reforms such as the Japanese National Railways Reconstruction Act pushed many of them to close. The old rail beds are frequently reused today as walking paths or cycling roads.|A medida que las carreteras mejoraron y los autos privados se extendieron durante los años de crecimiento de posguerra, los pasajeros de las tranquilas líneas rurales disminuyeron, y reformas como la Ley de Reconstrucción de los Ferrocarriles Nacionales Japoneses empujaron el cierre de muchas de ellas. Los antiguos trazados ferroviarios se reutilizan hoy a menudo como senderos peatonales o ciclovías.|À mesure que les routes s'amélioraient et que les voitures privées se répandaient durant les années de croissance d'après-guerre, les usagers des lignes rurales tranquilles se sont raréfiés, et des réformes comme la loi de reconstruction des Chemins de fer nationaux japonais ont poussé beaucoup d'entre elles à fermer. Les anciennes emprises ferroviaires sont aujourd'hui souvent réutilisées en sentiers de promenade ou pistes cyclables.|戦後の高度成長期に道路整備と自家用車の普及が進み、閑散とした地方路線の利用者が減っていった。国鉄再建法などの制度改正もあり多くのローカル線が廃止され、線路跡は今も遊歩道やサイクリングロードに転用される例が多い。",
  ),

  q(
    7,
    "Place names believed to derive from the Ainu language are especially common in which part of Japan?|¿En qué parte de Japón son especialmente comunes los topónimos que se cree que derivan de la lengua ainu?|Dans quelle partie du Japon les noms de lieux censés dériver de la langue aïnoue sont-ils particulièrement fréquents ?|アイヌ語に由来するとされる地名が特に多いのはどの地方か?",
    [
      "Hokkaido|Hokkaido|Hokkaido|北海道",
      "Okinawa|Okinawa|Okinawa|沖縄",
      "Tohoku|Tohoku|Tohoku|東北",
    ],
    0,
    "Names such as Sapporo, said to come from words for a dry, wide river, had their sounds spelled out in kanji when settlers arrived, which is why many of Hokkaido's place names read oddly compared to the rest of Japan. The practice preserved a great deal of the Ainu language even as it declined as a spoken tongue.|Nombres como Sapporo, que se dice provienen de palabras que significan un río ancho y seco, tuvieron sus sonidos transcritos con kanji cuando llegaron los colonos, razón por la cual muchos topónimos de Hokkaido suenan extraños comparados con el resto de Japón. La práctica preservó buena parte de la lengua ainu incluso cuando esta declinó como lengua hablada.|Des noms comme Sapporo, dit venir de mots signifiant une large rivière sèche, ont vu leurs sons transcrits en kanji à l'arrivée des colons, ce qui explique pourquoi de nombreux noms de lieux de Hokkaido sonnent étrangement par rapport au reste du Japon. Cette pratique a préservé une grande partie de la langue aïnoue alors même qu'elle déclinait comme langue parlée.|「乾いた広い川」を意味するとされる札幌のように、和人が入植した際にアイヌ語の音へ漢字を当てたため、北海道の地名は他地域と読み方の趣が異なるものが多い。この慣行は、話し言葉としてのアイヌ語が衰える中でも、その音を色濃く今に伝えている。",
  ),

  q(
    8,
    "The languages spoken in Okinawa and Amami are sometimes classified as a separate group from Japanese, not just dialects of it. What is this group called?|Las lenguas habladas en Okinawa y Amami a veces se clasifican como un grupo aparte del japonés, no solo dialectos de este. ¿Cómo se llama ese grupo?|Les langues parlées à Okinawa et Amami sont parfois classées comme un groupe distinct du japonais, pas de simples dialectes. Comment appelle-t-on ce groupe ?|沖縄や奄美で話される言葉は、日本語とは別の独立した言語系統として扱われることがある。その総称は何か?",
    [
      "The Austronesian languages|Las lenguas austronesias|Les langues austronésiennes|オーストロネシア語族",
      "The Ryukyuan languages|Las lenguas ryukyuenses|Les langues ryûkyû|琉球諸語",
      "The Ainu language family|La familia lingüística ainu|La famille linguistique aïnoue|アイヌ語族",
    ],
    1,
    "They share a common ancestor with Japanese, placing them in the same broader Japonic family, but the differences run deep enough that speakers of one often cannot understand another, which is why some linguists treat them as separate languages rather than dialects. UNESCO lists several of them as endangered.|Comparten un ancestro común con el japonés, por lo que se sitúan en la misma familia japónica más amplia, pero las diferencias son lo bastante profundas como para que los hablantes de una a menudo no entiendan otra, razón por la que algunos lingüistas las tratan como lenguas separadas en lugar de dialectos. La UNESCO clasifica varias de ellas como en peligro.|Elles partagent un ancêtre commun avec le japonais, se plaçant dans la même famille japonique élargie, mais les différences sont assez profondes pour que les locuteurs de l'une ne comprennent souvent pas l'autre, raison pour laquelle certains linguistes les traitent comme des langues distinctes plutôt que des dialectes. L'UNESCO en classe plusieurs comme en danger.|日本語と同じ祖先を持つ「日本語族」に属するとされる一方、意思疎通が難しいほど分かれているため、方言ではなく独立した言語群として扱う立場もある。ユネスコは複数の琉球諸語を消滅危機言語に指定している。",
  ),

  q(
    7,
    "In heavy-snow regions, what do the covered walkways built along the ground floor of shops, called gangi, allow people to do?|En regiones de mucha nieve, ¿qué permiten hacer a la gente los pasajes cubiertos construidos junto a la planta baja de las tiendas, llamados gangi?|Dans les régions à fortes chutes de neige, que permettent de faire les passages couverts construits au rez-de-chaussée des boutiques, appelés gangi ?|豪雪地帯で商店の一階に沿って設けられる屋根付きの歩道「雁木」は、何ができるようにするための仕組みか?",
    [
      "Walk through town without an umbrella even in heavy snow|Caminar por la ciudad sin paraguas incluso con mucha nieve|Traverser la ville sans parapluie même sous de fortes chutes de neige|大雪でも傘なしで町を歩けるようにする",
      "Signal the depth of snowfall to travelers|Señalar a los viajeros la profundidad de la nevada|Signaler aux voyageurs la profondeur de la neige|旅人に積雪の深さを知らせる",
      "Store rice above the snow line|Almacenar arroz por encima de la línea de nieve|Stocker le riz au-dessus de la limite de neige|雪の高さより上に米を保管する",
    ],
    0,
    "Found in shopping streets across snowy regions such as Niigata and Toyama, the eaves of neighboring buildings are extended and joined to form a sheltered covered path at street level. The arrangement is said to have grown up informally over generations rather than being centrally planned.|Presentes en calles comerciales de regiones nevadas como Niigata y Toyama, los aleros de los edificios vecinos se extienden y unen para formar un pasaje cubierto y resguardado a nivel de calle. Se dice que el sistema surgió de manera informal a lo largo de generaciones, en lugar de ser planificado de forma centralizada.|Présents dans les rues commerçantes de régions enneigées comme Niigata et Toyama, les avant-toits des bâtiments voisins sont prolongés et réunis pour former un passage couvert et abrité au niveau de la rue. Le dispositif serait né spontanément au fil des générations plutôt que d'une planification centralisée.|新潟県や富山県などの豪雪地帯の商店街に見られ、隣り合う建物の軒を伸ばしてつなげ、通りの高さに屋根付きの歩道をつくる。江戸時代から代々自然に形づくられてきた仕組みとされる。",
  ),

  q(
    8,
    "Besides the Pacific and Philippine Sea plates, which two other tectonic plates meet beneath or near the Japanese archipelago?|Además de las placas del Pacífico y de Filipinas, ¿qué otras dos placas tectónicas se encuentran bajo o cerca del archipiélago japonés?|Outre les plaques Pacifique et des Philippines, quelles deux autres plaques tectoniques se rencontrent sous ou près de l'archipel japonais ?|日本列島の下や周辺で、太平洋プレート・フィリピン海プレートのほかに接するとされる2枚のプレートは何か?",
    [
      "The African Plate and the South American Plate|La placa Africana y la placa Sudamericana|La plaque africaine et la plaque sud-américaine|アフリカプレートと南米プレート",
      "The Eurasian Plate and the North American Plate|La placa Euroasiática y la placa Norteamericana|La plaque eurasiatique et la plaque nord-américaine|ユーラシアプレートと北米プレート",
      "The Indian Plate and the Antarctic Plate|La placa India y la placa Antártica|La plaque indienne et la plaque antarctique|インドプレートと南極プレート",
    ],
    1,
    "Japan sits in one of the few places on Earth where four plates converge, which is widely cited as the root cause of its frequent earthquakes and volcanoes. Exactly where the boundaries run is not settled science, and different studies draw the lines differently.|Japón se sitúa en uno de los pocos lugares de la Tierra donde convergen cuatro placas, lo que se cita ampliamente como la causa raíz de sus frecuentes terremotos y volcanes. La ubicación exacta de los límites no es una cuestión resuelta, y distintos estudios trazan las líneas de forma diferente.|Le Japon se trouve dans l'un des rares endroits de la Terre où quatre plaques convergent, ce qui est largement cité comme la cause profonde de ses fréquents séismes et volcans. L'emplacement exact des limites n'est pas définitivement établi, et différentes études les tracent différemment.|日本列島は世界でも珍しく4枚のプレートが集まる位置にあり、これが地震や火山の多さの根本的な理由とされる。境目の正確な位置は確定していない部分もあり、研究によって描かれ方が異なる。",
  ),

  q(
    7,
    "The Fossa Magna, a rift zone crossing central Honshu, takes its name from Latin. What does the name mean?|La Fossa Magna, una zona de fractura que cruza el centro de Honshu, toma su nombre del latín. ¿Qué significa el nombre?|La Fossa Magna, une zone de fracture traversant le centre de Honshu, tire son nom du latin. Que signifie ce nom ?|本州中部を横切る地溝帯「フォッサマグナ」という名はラテン語で何を意味するか?",
    [
      "Great rift|Gran fosa|Grande faille|大きな溝",
      "Eastern edge|Borde oriental|Bord oriental|東の果て",
      "Fire mountain|Montaña de fuego|Montagne de feu|火の山",
    ],
    0,
    "The German geologist Heinrich Edmund Naumann coined the name in 1885 after studying the region, whose western edge is generally identified with the Itoigawa–Shizuoka Tectonic Line. East and west of it, Japan is said to have formed through different geological processes.|El geólogo alemán Heinrich Edmund Naumann acuñó el nombre en 1885 tras estudiar la región, cuyo borde occidental se identifica generalmente con la línea tectónica de Itoigawa-Shizuoka. Al este y al oeste de esta, se dice que Japón se formó mediante procesos geológicos distintos.|Le géologue allemand Heinrich Edmund Naumann a forgé ce nom en 1885 après avoir étudié la région, dont le bord occidental est généralement identifié à la ligne tectonique d'Itoigawa-Shizuoka. À l'est et à l'ouest de celle-ci, le Japon se serait formé par des processus géologiques différents.|ドイツ人地質学者ナウマンがこの地域を調べたのち1885年に名づけたとされ、その西縁は一般に糸魚川静岡構造線と同一視される。この地帯を境に、東日本と西日本は異なる地質的な成り立ちをたどったとされる。",
  ),

  q(
    8,
    "In 1868, the new Meiji government ordered Shinto and Buddhism, long intertwined at shared sites, to be separated. What was this policy called?|En 1868, el nuevo gobierno Meiji ordenó separar el sintoísmo y el budismo, largamente entrelazados en sitios compartidos. ¿Cómo se llamó esta política?|En 1868, le nouveau gouvernement Meiji a ordonné de séparer le shintoïsme et le bouddhisme, longtemps entremêlés sur des sites communs. Comment s'appelait cette politique ?|1868年、明治新政府が神社と寺院を分離させた政策は何と呼ばれるか?",
    [
      "The Chiso Kaisei reform|La reforma chiso kaisei|La réforme chiso kaisei|地租改正",
      "The Shinbutsu Bunri edict|El edicto de shinbutsu bunri|L'édit de shinbutsu bunri|神仏分離令",
      "The Haihan Chiken edict|El edicto de haihan chiken|L'édit de haihan chiken|廃藩置県",
    ],
    1,
    "Shrines and temples had long shared grounds and staff under a blended practice called shinbutsu-shugo, but the edict triggered a wave of iconoclasm known as haibutsu kishaku, in which Buddhist statues and implements were destroyed at many sites. Shrines and temples still standing side by side today are often what survived that upheaval.|Santuarios y templos habían compartido durante mucho tiempo terrenos y personal bajo una práctica mixta llamada shinbutsu-shugo, pero el edicto desató una ola de iconoclasia conocida como haibutsu kishaku, en la que se destruyeron estatuas y objetos budistas en muchos lugares. Los santuarios y templos que aún hoy se ven uno junto al otro suelen ser lo que sobrevivió a esa convulsión.|Sanctuaires et temples avaient longtemps partagé terrains et personnel sous une pratique mêlée appelée shinbutsu-shugo, mais l'édit a déclenché une vague d'iconoclasme connue sous le nom de haibutsu kishaku, au cours de laquelle statues et objets bouddhistes ont été détruits en de nombreux endroits. Les sanctuaires et temples encore côte à côte aujourd'hui sont souvent ce qui a survécu à ce bouleversement.|それまで神社と寺院は「神仏習合」と呼ばれる形で境内や人材を共有していたが、この政策をきっかけに各地で仏像や仏具を壊す「廃仏毀釈」の動きが広がった。今も神社と寺が隣り合って残る例は、その混乱を生き延びたものであることが多い。",
  ),

  q(
    7,
    "Roughly how many kanji are listed in the joyo kanji table, the standard set used in newspapers and official documents?|¿Aproximadamente cuántos kanji figuran en la tabla joyo kanji, el conjunto estándar usado en periódicos y documentos oficiales?|Environ combien de kanji figurent dans la table des joyo kanji, l'ensemble standard utilisé dans les journaux et documents officiels ?|新聞や公文書の目安となる「常用漢字表」に定められている漢字はおよそ何字か?",
    [
      "A little over 2,000|Poco más de 2.000|Un peu plus de 2000|2,000字あまり",
      "A little over 500|Poco más de 500|Un peu plus de 500|500字あまり",
      "A little over 5,000|Poco más de 5.000|Un peu plus de 5000|5,000字あまり",
    ],
    0,
    "A 2010 revision set the list at 2,136 characters, and newspapers and public documents generally stay within it, spelling out rarer kanji in furigana or plain kana instead. Characters allowed specifically for personal names are governed by a separate, additional list.|Una revisión de 2010 fijó la lista en 2.136 caracteres, y los periódicos y documentos públicos generalmente se ciñen a ella, escribiendo los kanji más raros con furigana o kana simple. Los caracteres permitidos específicamente para nombres de personas se rigen por una lista adicional separada.|Une révision de 2010 a fixé la liste à 2136 caractères, et journaux et documents publics s'y tiennent généralement, écrivant les kanji plus rares en furigana ou en kana simple. Les caractères autorisés spécifiquement pour les noms de personnes relèvent d'une liste supplémentaire distincte.|2010年の改定で2,136字となり、新聞や公文書はおおむねこの範囲に収め、珍しい漢字はふりがなや仮名で表す。人名に使える漢字はこれとは別に「人名用漢字」として追加で定められている。",
  ),

  q(
    7,
    "Nishijin-ori, the luxury woven fabric associated with Kyoto, is named after a place. What did \"Nishijin\" originally refer to?|El nishijin-ori, la tela tejida de lujo asociada a Kioto, lleva el nombre de un lugar. ¿A qué se refería originalmente \"Nishijin\"?|Le nishijin-ori, le tissu tissé de luxe associé à Kyoto, tire son nom d'un lieu. À quoi \"Nishijin\" faisait-il référence à l'origine ?|京都の高級織物「西陣織」の名の由来となった「西陣」とは、もともと何を指す地名か?",
    [
      "The site of the western army's camp during the Onin War|El emplazamiento del campamento del ejército occidental durante la guerra Onin|Le site du camp de l'armée de l'Ouest pendant la guerre d'Onin|応仁の乱で西軍が陣を敷いた地",
      "A wholesale district where textile merchants gathered|Un distrito mayorista donde se reunían los comerciantes textiles|Un quartier de gros où se rassemblaient les marchands de textile|織物商が集まった問屋街",
      "A village of weavers descended from continental immigrants|Un pueblo de tejedores descendientes de inmigrantes continentales|Un village de tisserands descendants d'immigrants continentaux|渡来人の子孫が住んだ機織りの里",
    ],
    0,
    "After the Onin War of the 15th century scattered Kyoto's weavers, they regrouped on the site of the old western army camp and rebuilt the textile trade there, and the district kept the camp's name. The fabric is known for its heavy use of gold and silver thread in obi sashes and kimono cloth.|Tras la guerra de Onin del siglo XV, que dispersó a los tejedores de Kioto, estos se reagruparon en el emplazamiento del antiguo campamento del ejército occidental y reconstruyeron allí el comercio textil, y el distrito conservó el nombre del campamento. La tela es conocida por su intenso uso de hilo de oro y plata en fajas obi y telas de kimono.|Après la guerre d'Onin du 15e siècle qui a dispersé les tisserands de Kyoto, ceux-ci se sont regroupés sur le site de l'ancien camp de l'armée de l'Ouest et y ont reconstruit le commerce textile, le quartier conservant le nom du camp. Le tissu est réputé pour son usage intensif de fil d'or et d'argent dans les ceintures obi et les étoffes de kimono.|15世紀の応仁の乱で京都の織物職人が離散したのち、西軍の陣跡だった地に集まって織物業を再興し、地区はその陣の名をそのまま受け継いだ。金糸銀糸を多用した豪華な帯や着物地で知られる。",
  ),

  q(
    7,
    "The Japanese word nemawashi, describing the informal groundwork done before a business decision, originally referred to preparing what?|La palabra japonesa nemawashi, que describe el trabajo previo informal antes de una decisión empresarial, originalmente se refería a preparar qué?|Le mot japonais nemawashi, qui décrit le travail préparatoire informel avant une décision d'affaires, désignait à l'origine la préparation de quoi ?|会議の前に非公式に話を通す「根回し」という語は、本来は何をする作業を指したか?",
    [
      "Tea leaves before roasting them|Las hojas de té antes de tostarlas|Les feuilles de thé avant de les torréfier|茶葉を焙じる前に整えること",
      "A tree's roots before transplanting it|Las raíces de un árbol antes de trasplantarlo|Les racines d'un arbre avant de le transplanter|木を移植する前に根を整えること",
      "Rice paddies before draining them for harvest|Los arrozales antes de drenarlos para la cosecha|Les rizières avant de les drainer pour la récolte|稲刈り前に田の水を抜くこと",
    ],
    1,
    "In gardening and farming, it referred to carefully working the soil and roots around a tree in advance so it would not be weakened by a later transplant. The word later shifted to mean quietly building agreement with everyone concerned before a meeting, so that the meeting itself confirms a decision rather than debates one.|En jardinería y agricultura, se refería a trabajar con cuidado el suelo y las raíces alrededor de un árbol de antemano, para que no se debilitara con un trasplante posterior. La palabra pasó luego a significar construir en silencio el acuerdo de todos los implicados antes de una reunión, de modo que la reunión misma confirme una decisión en lugar de debatirla.|En jardinage et en agriculture, il désignait le travail minutieux du sol et des racines autour d'un arbre à l'avance, pour qu'il ne soit pas affaibli par une transplantation ultérieure. Le mot en est venu à désigner le fait de bâtir discrètement un accord avec toutes les personnes concernées avant une réunion, de sorte que la réunion elle-même entérine une décision plutôt qu'elle ne la débatte.|造園や農業で、木を植え替える前にあらかじめ根の周りの土を整え、弱らせないようにする作業を指した言葉だった。転じて、会議の前に関係者へ非公式に話を通し、会議そのものは議論ではなく確認の場にすることを意味するようになった。",
  ),

  q(
    7,
    "In Japan, only samurai were formally permitted to carry a surname and wear a sword in public during the Edo period. What was this privilege called?|En Japón, durante el periodo Edo, solo los samuráis tenían permiso formal para llevar apellido y portar espada en público. ¿Cómo se llamaba este privilegio?|Au Japon, seuls les samouraïs étaient formellement autorisés à porter un nom de famille et une épée en public durant l'époque d'Edo. Comment appelait-on ce privilège ?|江戸時代、名字を公に名乗り帯刀することを許された武士の特権を何と呼ぶか?",
    [
      "Bushido|Bushido|Bushido|武士道",
      "Sankin-kotai|Sankin-kotai|Sankin-kotai|参勤交代",
      "Myoji-taito|Myoji-taito|Myoji-taito|名字帯刀",
    ],
    2,
    "Commoners in most cases could not publicly use a surname or carry a blade, though village headmen and some merchants were occasionally granted the privilege as an exceptional honor. The rule was formally abolished in the early Meiji era, when surnames became compulsory for everyone.|En la mayoría de los casos, la gente común no podía usar apellido en público ni portar espada, aunque a algunos jefes de aldea y comerciantes a veces se les concedía el privilegio como honor excepcional. La norma fue abolida formalmente a comienzos de la era Meiji, cuando el apellido se hizo obligatorio para todos.|Dans la plupart des cas, les roturiers ne pouvaient ni porter publiquement un nom de famille ni une épée, bien que certains chefs de village et marchands se voyaient parfois accorder ce privilège comme honneur exceptionnel. La règle a été formellement abolie au début de l'ère Meiji, lorsque le nom de famille est devenu obligatoire pour tous.|多くの場合、庶民は公の場で名字を名乗ることも刀を差すこともできなかったが、村役人や一部の商人には例外的な栄誉として許されることもあった。この特権は明治初期に正式に廃止され、以後は誰もが名字を名乗ることが義務となった。",
  ),

  q(
    7,
    "On a sumo banzuke ranking chart, what does the size of a wrestler's name in the distinctive calligraphy indicate?|En una tabla de clasificación banzuke de sumo, ¿qué indica el tamaño del nombre de un luchador en la caligrafía característica?|Sur un tableau de classement banzuke de sumo, que indique la taille du nom d'un lutteur dans la calligraphie caractéristique ?|大相撲の番付表で、力士の名前が独特の書体で書かれる際、文字の大きさは何を表すか?",
    [
      "How many bouts the wrestler has won this career|Cuántos combates ha ganado el luchador en su carrera|Combien de combats le lutteur a gagnés dans sa carrière|力士がこれまでに勝った取組の数",
      "How high the wrestler's rank is|Qué tan alto es el rango del luchador|Le niveau du rang du lutteur|力士の番付の高さ",
      "The wrestler's weight class|La categoría de peso del luchador|La catégorie de poids du lutteur|力士の体重区分",
    ],
    1,
    "Higher-ranked wrestlers are written in larger characters, packed tightly together in a bold style called sumo-ji, and the chart's overall design is one of the main jobs of the referees, called gyoji, who train for years to master the brush technique. The names shrink toward the bottom of the sheet, where lower-ranked wrestlers are listed.|Los luchadores de rango más alto se escriben en caracteres más grandes, agrupados con fuerza en un estilo audaz llamado sumo-ji, y el diseño general de la tabla es una de las principales tareas de los árbitros, llamados gyoji, que se forman durante años para dominar la técnica del pincel. Los nombres se reducen hacia la parte inferior de la hoja, donde se listan los luchadores de rango más bajo.|Les lutteurs les mieux classés sont écrits en caractères plus grands, serrés dans un style audacieux appelé sumo-ji, et la conception globale du tableau est l'une des principales tâches des arbitres, appelés gyoji, qui s'entraînent des années pour maîtriser la technique du pinceau. Les noms rétrécissent vers le bas de la feuille, où figurent les lutteurs les moins bien classés.|上位の力士ほど大きな文字で、太く隙間なく詰めて書かれる独特の書体は「相撲字」と呼ばれ、番付表を仕上げるのは行司の重要な仕事のひとつで、筆づかいを身につけるには何年もの修行がいる。表の下方に行くほど文字は小さくなり、下位の力士が並ぶ。",
  ),

  q(
    8,
    "Which extreme point of Japan's territory lies the farthest east?|¿Qué punto extremo del territorio de Japón está más al este?|Quel point extrême du territoire japonais se trouve le plus à l'est ?|日本の領土のうち、最も東にある地点はどこか?",
    [
      "Okinotorishima|Okinotorishima|Okinotorishima|沖ノ鳥島",
      "Minamitorishima|Minamitorishima|Minamitorishima|南鳥島",
      "Etorofu Island|Isla Etorofu|L'île d'Etorofu|択捉島",
    ],
    1,
    "This isolated island sits about 1,800km from Tokyo and has no permanent residents, only a weather station and a Japan Maritime Self-Defense Force base. Japan's northernmost, southernmost, and westernmost points are, respectively, Etorofu Island, Okinotorishima, and Yonaguni Island.|Esta isla aislada se encuentra a unos 1.800km de Tokio y no tiene residentes permanentes, solo una estación meteorológica y una base de la Fuerza de Autodefensa Marítima de Japón. Los puntos más septentrional, meridional y occidental de Japón son, respectivamente, la isla Etorofu, Okinotorishima y la isla Yonaguni.|Cette île isolée se trouve à environ 1800km de Tokyo et n'a aucun résident permanent, seulement une station météo et une base des Forces d'autodéfense maritimes japonaises. Les points les plus septentrional, méridional et occidental du Japon sont respectivement l'île d'Etorofu, Okinotorishima et l'île de Yonaguni.|東京から約1800km離れた絶海の孤島で、常住する住民はおらず気象観測所と海上自衛隊の基地があるのみである。日本の最北端は択捉島、最南端は沖ノ鳥島、最西端は与那国島とされる。",
  ),

  q(
    8,
    "The three main schools of tea ceremony descended from Sen no Rikyu's family, together called the san-senke, are Omotesenke, Urasenke, and Mushakojisenke. Which well-known school of flower arranging is not among them?|Las tres principales escuelas de la ceremonia del té descendientes de la familia de Sen no Rikyu, llamadas en conjunto san-senke, son Omotesenke, Urasenke y Mushakojisenke. ¿Qué conocida escuela de arreglos florales no está entre ellas?|Les trois principales écoles de cérémonie du thé descendant de la famille de Sen no Rikyu, appelées ensemble san-senke, sont Omotesenke, Urasenke et Mushakojisenke. Quelle école bien connue d'art floral n'en fait pas partie ?|千利休の子孫が興した「三千家」は表千家・裏千家・武者小路千家を指す。この中に含まれない、よく知られた生け花の流派はどれか?",
    [
      "Urasenke|Urasenke|Urasenke|裏千家",
      "Ikenobo|Ikenobo|Ikenobo|池坊",
      "Omotesenke|Omotesenke|Omotesenke|表千家",
    ],
    1,
    "Ikenobo is Japan's oldest school of ikebana (flower arranging), not tea ceremony, and has nothing to do with the Sen family line. Because tea and flower arranging developed side by side and both use the honorific term \"family\" for their head schools, the two are sometimes mixed up.|Ikenobo es la escuela más antigua de ikebana (arreglo floral) de Japón, no de la ceremonia del té, y no tiene relación con el linaje de la familia Sen. Como el té y el arreglo floral se desarrollaron en paralelo y ambos usan el término honorífico «familia» para sus escuelas principales, a veces se confunden.|Ikenobo est la plus ancienne école d'ikebana (art floral) du Japon, et non de cérémonie du thé, et n'a aucun lien avec la lignée de la famille Sen. Comme le thé et l'art floral se sont développés côte à côte et utilisent tous deux le terme honorifique de « famille » pour leurs écoles principales, les deux sont parfois confondus.|池坊は日本最古の生け花(華道)の流派であり、茶道とは別物で千家の系譜とは関係がない。茶道と華道は並行して発展し、どちらも家元を「家」と呼ぶため、しばしば混同される。",
  ),

  q(
    8,
    "In rakugo, comic storytelling performed by a single seated narrator, what is the short punchline that closes a story called?|En el rakugo, narración cómica interpretada por un solo narrador sentado, ¿cómo se llama el breve remate que cierra una historia?|Dans le rakugo, un récit comique interprété par un seul conteur assis, comment appelle-t-on la courte chute qui clôt une histoire ?|一人の噺家が座って演じる話芸「落語」で、噺の最後につく気の利いた締めくくりを何と呼ぶか?",
    [
      "Makura|Makura|Makura|マクラ",
      "Sage (ochi)|Sage (ochi)|Sage (ochi)|サゲ(オチ)",
      "Nakairi|Nakairi|Nakairi|中入り",
    ],
    1,
    "The opening small talk that eases the audience in, unrelated to the plot, is called the makura, and its length and tone can differ noticeably between the Kamigata (Osaka-Kyoto) and Edo (Tokyo) traditions. The sage itself is often a pun or a sudden twist that recasts everything said before it.|La pequeña charla inicial que relaja al público, sin relación con la trama, se llama makura, y su duración y tono pueden diferir notablemente entre las tradiciones Kamigata (Osaka-Kioto) y Edo (Tokio). El sage en sí suele ser un juego de palabras o un giro repentino que resignifica todo lo dicho antes.|Le bavardage d'ouverture qui met le public à l'aise, sans lien avec l'intrigue, s'appelle le makura, et sa durée et son ton peuvent différer sensiblement entre les traditions Kamigata (Osaka-Kyoto) et Edo (Tokyo). Le sage lui-même est souvent un jeu de mots ou un rebondissement soudain qui redonne un sens à tout ce qui précède.|本題と関係のない導入の世間話は「マクラ」と呼ばれ、その長さや調子は上方(大阪・京都)と江戸(東京)の伝統で目立って異なるとされる。サゲそのものは語呂合わせや急な展開で、それまでの話を一気に意味づけ直すことが多い。",
  ),

  q(
    8,
    "The Meireki Fire of 1657 destroyed most of Edo. What did the city's rebuilding afterward emphasize?|El gran incendio de Meireki de 1657 destruyó la mayor parte de Edo. ¿Qué priorizó la reconstrucción de la ciudad después?|Le grand incendie de Meireki de 1657 a détruit la majeure partie d'Edo. Qu'est-ce que la reconstruction de la ville a privilégié par la suite ?|1657年の明暦の大火で江戸の大半が焼けたのち、都市の再建で重視されたことは何か?",
    [
      "Firebreaks and wide avenues to slow future fires|Cortafuegos y avenidas anchas para frenar futuros incendios|Des coupe-feux et de larges avenues pour ralentir de futurs incendies|延焼を防ぐ火除け地や広小路",
      "Canals to move troops quickly across the city|Canales para mover tropas rápidamente por la ciudad|Des canaux pour déplacer rapidement les troupes en ville|軍を素早く動かすための運河",
      "A second moat ringing the castle town|Un segundo foso rodeando la ciudad-castillo|Un second fossé entourant la ville-château|城下町を囲む二重の堀",
    ],
    0,
    "The fire, which killed tens of thousands, led planners to set aside deliberate open spaces called hiyoke-chi and to widen key streets into hirokoji so flames would have a harder time jumping across a district. Ryogoku Bridge is often said to have been built partly in response to the disaster, to give people fleeing fire more ways to cross the river.|El incendio, que mató a decenas de miles de personas, llevó a los planificadores a reservar deliberadamente espacios abiertos llamados hiyoke-chi y a ensanchar calles clave en hirokoji, para que las llamas tuvieran más dificultad en saltar de un barrio a otro. A menudo se dice que el puente Ryogoku se construyó en parte como respuesta al desastre, para dar a la gente que huía del fuego más formas de cruzar el río.|L'incendie, qui a tué des dizaines de milliers de personnes, a conduit les urbanistes à réserver délibérément des espaces ouverts appelés hiyoke-chi et à élargir des rues clés en hirokoji, afin que les flammes aient plus de mal à sauter d'un quartier à l'autre. Le pont Ryogoku aurait en partie été construit en réponse à cette catastrophe, pour donner aux gens fuyant le feu davantage de moyens de traverser la rivière.|数万人が亡くなったこの大火をきっかけに、延焼を防ぐための空き地「火除け地」を意図的に設け、主要な通りを「広小路」として広げるようになった。両国橋も、火から逃げる人々の渡り道を増やすためこの大火への対応として架けられたとよく言われる。",
  ),

  q(
    8,
    "Sankin-kotai, the Edo-period system imposed on feudal lords (daimyo), required them to do what?|El sankin-kotai, el sistema del periodo Edo impuesto a los señores feudales (daimyo), ¿qué les exigía hacer?|Le sankin-kotai, le système de l'époque d'Edo imposé aux seigneurs féodaux (daimyo), les obligeait à faire quoi ?|大名に義務づけられた江戸時代の制度「参勤交代」は、何をさせるものだったか?",
    [
      "Guard Edo Castle on a rotating schedule|Custodiar el castillo de Edo por turnos|Garder le château d'Edo selon un roulement|江戸城の警備を交代で担うこと",
      "Travel between Edo and their domain periodically and reside in Edo|Viajar periódicamente entre Edo y su dominio y residir en Edo|Voyager périodiquement entre Edo et leur fief, et résider à Edo|定期的に江戸と領地を往復し、江戸に滞在すること",
      "Hand over half of their domain's rice harvest to the shogunate|Entregar la mitad de la cosecha de arroz de su dominio al shogunato|Remettre la moitié de la récolte de riz de leur fief au shogunat|領地の米の収穫の半分を幕府に納めること",
    ],
    1,
    "A daimyo's wife and children lived permanently in Edo, effectively as hostages, while the lord himself alternated between Edo and his home domain, typically every other year. The huge cost of travel and maintaining a residence in the capital strained domain finances, which some historians think was also meant to keep the lords too poor to fund a rebellion.|La esposa e hijos de un daimyo vivían permanentemente en Edo, prácticamente como rehenes, mientras el señor mismo alternaba entre Edo y su dominio de origen, típicamente cada dos años. El enorme costo de viajar y mantener una residencia en la capital tensaba las finanzas del dominio, algo que algunos historiadores creen que también buscaba mantener a los señores demasiado pobres para financiar una rebelión.|L'épouse et les enfants d'un daimyo vivaient en permanence à Edo, en pratique comme otages, tandis que le seigneur lui-même alternait entre Edo et son fief d'origine, généralement tous les deux ans. Le coût énorme des déplacements et de l'entretien d'une résidence dans la capitale grevait les finances du fief, ce que certains historiens pensent avoir aussi visé à maintenir les seigneurs trop pauvres pour financer une rébellion.|大名の妻子は事実上の人質として江戸に住まわされ続け、大名自身は多くの場合1年おきに江戸と領国を往復した。江戸での滞在や旅の莫大な費用が藩の財政を圧迫し、これが反乱を起こす余力を削ぐ狙いも兼ねていたと見る歴史家もいる。",
  ),

  q(
    9,
    "The Median Tectonic Line, which divides southwest Japan, and the western edge of the Fossa Magna are both major fault lines running north to south. Roughly where do they meet?|La línea tectónica mediana, que divide el suroeste de Japón, y el borde occidental de la Fossa Magna son ambas fallas mayores que corren de norte a sur. ¿Dónde se encuentran aproximadamente?|La ligne tectonique médiane, qui divise le sud-ouest du Japon, et le bord occidental de la Fossa Magna sont deux failles majeures orientées nord-sud. Où se rejoignent-elles à peu près ?|西南日本を分ける中央構造線と、フォッサマグナの西縁をなす断層線は、およそどのあたりで交わるとされるか?",
    [
      "Near Lake Biwa, in Shiga|Cerca del lago Biwa, en Shiga|Près du lac Biwa, à Shiga|滋賀県の琵琶湖付近",
      "Near Lake Suwa, in Nagano|Cerca del lago Suwa, en Nagano|Près du lac Suwa, à Nagano|長野県の諏訪湖付近",
      "Near Lake Kasumigaura, in Ibaraki|Cerca del lago Kasumigaura, en Ibaraki|Près du lac Kasumigaura, à Ibaraki|茨城県の霞ヶ浦付近",
    ],
    1,
    "The Median Tectonic Line runs east–west across southwest Japan from Kyushu to the Kanto region, while the Fossa Magna's western edge, the Itoigawa–Shizuoka Tectonic Line, runs roughly north–south — the two nearly cross paths around Lake Suwa. The area is laced with hot springs and visible fault outcrops, a rare place where the join between Japan's two geological halves can actually be seen at the surface.|La línea tectónica mediana corre de este a oeste por el suroeste de Japón desde Kyushu hasta la región de Kanto, mientras que el borde occidental de la Fossa Magna, la línea tectónica de Itoigawa-Shizuoka, corre aproximadamente de norte a sur; ambas casi se cruzan cerca del lago Suwa. La zona está salpicada de aguas termales y afloramientos de falla visibles, un lugar poco común donde la unión entre las dos mitades geológicas de Japón puede verse realmente en la superficie.|La ligne tectonique médiane traverse le sud-ouest du Japon d'est en ouest, de Kyushu à la région du Kanto, tandis que le bord occidental de la Fossa Magna, la ligne tectonique d'Itoigawa-Shizuoka, court à peu près du nord au sud — les deux se croisent presque près du lac Suwa. La zone est parsemée de sources chaudes et d'affleurements de faille visibles, un endroit rare où la jonction entre les deux moitiés géologiques du Japon peut réellement s'observer en surface.|中央構造線は九州から関東まで西南日本をほぼ東西に走り、フォッサマグナの西縁をなす糸魚川静岡構造線はおよそ南北に走るため、諏訪湖付近でほぼ交差するとされる。この一帯は温泉や断層の露頭が多く、日本を2つに分ける境目が地表で実際に見える珍しい場所とされる。",
  ),

  q(
    10,
    "Right after the 1871 abolition of the domains (haihan-chiken), Japan was briefly divided into 3 fu and how many ken, before being consolidated to 3 fu and 72 ken within the same year?|Justo después de la abolición de los dominios de 1871 (haihan-chiken), Japón se dividió brevemente en 3 fu y cuántos ken, antes de consolidarse en 3 fu y 72 ken ese mismo año?|Juste après l'abolition des fiefs de 1871 (haihan-chiken), le Japon a été brièvement divisé en 3 fu et combien de ken, avant d'être ramené à 3 fu et 72 ken la même année ?|1871年の廃藩置県の直後、日本はいったん3府いくつの県に分けられ、同年中に3府72県へ整理されたか?",
    [
      "47|47|47|47県",
      "72|72|72|72県",
      "302|302|302|302県",
    ],
    2,
    "The domains were simply converted one-for-one into prefectures at first, leaving far too many small, unwieldy units, so officials merged them down to 72 by the end of 1871. The four different labels for Japan's prefectures — to, do, fu, and ken — were only completed in 1943, when Tokyo-fu and Tokyo City merged into Tokyo-to, and the number did not reach today's 47 until Okinawa's reversion in 1972.|Los dominios se convirtieron inicialmente uno a uno en prefecturas, dejando unidades demasiado pequeñas y difíciles de manejar, así que los funcionarios las fusionaron hasta 72 hacia fines de 1871. Las cuatro etiquetas distintas de las prefecturas de Japón —to, do, fu y ken— solo se completaron en 1943, cuando Tokyo-fu y la ciudad de Tokio se fusionaron en Tokyo-to, y el número no llegó a las 47 actuales hasta la reversión de Okinawa en 1972.|Les fiefs ont d'abord été convertis un à un en préfectures, laissant des unités bien trop petites et difficiles à gérer, si bien que les autorités les ont fusionnées à 72 dès la fin de 1871. Les quatre étiquettes distinctes des préfectures du Japon — to, do, fu et ken — n'ont été achevées qu'en 1943, quand Tokyo-fu et la ville de Tokyo ont fusionné en Tokyo-to, et le nombre n'a atteint les 47 actuels qu'avec la rétrocession d'Okinawa en 1972.|藩をそのまま県に置き換えたため小さすぎる県が乱立し、同年末までに72県へ統廃合された。「都・道・府・県」という4種の呼び方がそろったのは1943年に東京府と東京市が合併して東京都になったときで、今の47という数になったのは1972年の沖縄返還以降である。",
  ),

  q(
    9,
    "Tai-an, a surviving tea house attributed to the master Sen no Rikyu and designated a national treasure, is famous for its extreme smallness. How many tatami mats does it measure?|Tai-an, una casa de té conservada atribuida al maestro Sen no Rikyu y designada tesoro nacional, es famosa por su extrema pequeñez. ¿Cuántas esteras tatami mide?|Tai-an, une maison de thé conservée attribuée au maître Sen no Rikyu et classée trésor national, est célèbre pour son extrême petitesse. Combien de tatamis mesure-t-elle ?|千利休が作ったと伝わり国宝に指定されている現存の茶室「待庵(たいあん)」は、極端に小さいことで知られる。広さは何畳か?",
    [
      "Four and a half tatami mats|Cuatro esteras y media|Quatre tatamis et demi|四畳半",
      "Six tatami mats|Seis esteras tatami|Six tatamis|六畳",
      "Two tatami mats|Dos esteras tatami|Deux tatamis|二畳",
    ],
    2,
    "At just two tatami mats, barely enough space to seat host and guest, Tai-an is said to embody Rikyu's aesthetic of wabi: stripping a tea room down until rank and wealth are left outside the door, and only the two people and the act of making tea remain. It is one of only three tea houses in Japan designated a national treasure.|Con apenas dos esteras tatami, espacio justo para sentar al anfitrión y al invitado, se dice que Tai-an encarna la estética wabi de Rikyu: reducir la sala de té hasta dejar fuera de la puerta el rango y la riqueza, quedando solo las dos personas y el acto de hacer el té. Es una de las tres únicas casas de té de Japón designadas tesoro nacional.|Avec seulement deux tatamis, à peine assez d'espace pour asseoir l'hôte et l'invité, Tai-an incarnerait l'esthétique wabi de Rikyu : réduire la salle de thé jusqu'à laisser le rang et la richesse à la porte, ne laissant que les deux personnes et le geste de préparer le thé. C'est l'une des trois seules maisons de thé du Japon classées trésor national.|亭主と客がやっと座れるほどの二畳しかなく、利休が説いた「わび」の美意識を体現するとされる。身分や富を戸口の外に置き、残るのは二人と茶を点てる所作だけという思想である。日本で国宝に指定された茶室は3棟しかなく、待庵はそのひとつである。",
  ),

  q(
    9,
    "In Noh theater, what is the leading performer, who plays the central role such as a ghost or deity, called?|En el teatro Noh, ¿cómo se llama al intérprete principal, que representa el papel central, como un fantasma o una deidad?|Dans le théâtre nô, comment appelle-t-on l'interprète principal, qui joue le rôle central comme un fantôme ou une divinité ?|能楽で、幽霊や神仏など中心となる役を演じる主役の演者を何と呼ぶか?",
    [
      "Shite|Shite|Shite|シテ",
      "Ado|Ado|Ado|アド",
      "Waki|Waki|Waki|ワキ",
    ],
    0,
    "The shite usually wears the mask and often turns out to be a spirit or ghost revealed partway through the play, while the counterpart role, the waki, goes maskless and is typically a living, ordinary person such as a traveling priest who serves as the audience's way into the story. That contrast between a masked, otherworldly shite and an unmasked, worldly waki structures most Noh plays.|El shite suele llevar la máscara y a menudo resulta ser un espíritu o fantasma revelado a mitad de la obra, mientras que el papel contrario, el waki, no lleva máscara y suele ser una persona corriente y viva, como un monje viajero que sirve de puerta de entrada del público a la historia. Ese contraste entre un shite enmascarado y de otro mundo y un waki sin máscara y mundano estructura la mayoría de las obras de Noh.|Le shite porte généralement le masque et se révèle souvent être un esprit ou un fantôme dévoilé au fil de la pièce, tandis que le rôle qui lui fait face, le waki, ne porte pas de masque et est typiquement une personne vivante et ordinaire, comme un moine itinérant servant de porte d'entrée au public dans l'histoire. Ce contraste entre un shite masqué et surnaturel et un waki non masqué et terrestre structure la plupart des pièces de nô.|シテは多くの場合面をつけ、物語の途中で幽霊や神仏の正体を現すことが多い。対する「ワキ」は面をつけず、旅の僧のような現実の人物として観客を物語へ導く役を担うことが多い。面をつけ異界を体現するシテと、面をつけず現世に立つワキという対比が、多くの能楽の構成を支えている。",
  ),

  q(
    9,
    "In bunraku puppet theater, each puppet is worked by three visible operators. Which of the three, standing on raised sandals to reach higher, controls the head and right hand?|En el teatro de marionetas bunraku, cada marioneta es manejada por tres operadores visibles. ¿Cuál de los tres, de pie sobre sandalias elevadas para alcanzar más alto, controla la cabeza y la mano derecha?|Dans le théâtre de marionnettes bunraku, chaque marionnette est manipulée par trois opérateurs visibles. Lequel des trois, juché sur des sandales surélevées pour atteindre plus haut, contrôle la tête et la main droite ?|文楽(人形浄瑠璃)で、一体の人形を操る3人の遣い手のうち、高下駄で背を高くして頭と右手を操るのは誰か?",
    [
      "Hidarizukai, who works the left hand|Hidarizukai, quien maneja la mano izquierda|Le hidarizukai, qui manie la main gauche|左遣い(ひだりづかい)",
      "Ashizukai, who works the feet|Ashizukai, quien maneja los pies|L'ashizukai, qui manie les pieds|足遣い(あしづかい)",
      "Omozukai, the lead operator|Omozukai, el operador principal|L'omozukai, l'opérateur principal|主遣い(おもづかい)",
    ],
    2,
    "The omozukai leads the other two, who follow his movements to keep the puppet's whole body moving as one convincing figure, while a chanter voices every character's lines and a shamisen sets the emotional tone. Reaching the rank of omozukai typically takes decades of apprenticeship, starting out on the feet and working up.|El omozukai dirige a los otros dos, que siguen sus movimientos para mantener todo el cuerpo de la marioneta moviéndose como una figura convincente y unificada, mientras un narrador da voz a las líneas de todos los personajes y un intérprete de shamisen marca el tono emocional. Llegar al rango de omozukai suele llevar décadas de aprendizaje, empezando por los pies e ir ascendiendo.|L'omozukai dirige les deux autres, qui suivent ses mouvements pour que le corps entier de la marionnette bouge comme une figure convaincante et unifiée, tandis qu'un chanteur donne voix aux répliques de tous les personnages et qu'un joueur de shamisen installe le ton émotionnel. Atteindre le rang d'omozukai prend généralement des décennies d'apprentissage, en commençant par les pieds et en progressant.|主遣いが残る2人を率い、2人はその動きに合わせて人形全体をひとつの説得力ある体の動きにまとめる。太夫がすべての登場人物のせりふを語り分け、三味線が場の情感を彩る。主遣いの域に達するには、足遣いから始めて何十年もの修行を積むのが通例とされる。",
  ),

  q(
    9,
    "Under the 1979 Era Name Act, who officially has the authority to decide on a new Japanese era name (gengo)?|Según la Ley del Nombre de Era de 1979, ¿quién tiene oficialmente la autoridad para decidir un nuevo nombre de era japonés (gengo)?|Selon la loi sur les noms d'ère de 1979, qui a officiellement l'autorité de décider d'un nouveau nom d'ère japonais (gengo) ?|1979年制定の元号法によれば、新しい元号を定める権限は何にあるか?",
    [
      "The Imperial Household Agency|La Agencia de la Casa Imperial|L'Agence de la maison impériale|宮内庁",
      "The National Diet, by a majority vote|La Dieta Nacional, por mayoría de votos|La Diète nationale, à la majorité|国会の多数決",
      "The Cabinet, through a cabinet order|El Gabinete, mediante un decreto del gabinete|Le Cabinet, par décret gouvernemental|内閣による政令",
    ],
    2,
    "Before 1979, era names had no clear legal basis in postwar law, since the old Imperial House Law provision that governed them was scrapped after the war; the new act formally restored the practice and specified that the choice is made by cabinet order, following the emperor's accession. For Reiwa, candidate names were narrowed down by a panel of scholars before the cabinet made the final decision.|Antes de 1979, los nombres de era carecían de una base legal clara en el derecho de posguerra, ya que la antigua disposición de la Ley de la Casa Imperial que los regía fue derogada tras la guerra; la nueva ley restableció formalmente la práctica y especificó que la elección la hace el Gabinete mediante decreto, tras la sucesión del emperador. Para Reiwa, un panel de eruditos redujo los nombres candidatos antes de que el Gabinete tomara la decisión final.|Avant 1979, les noms d'ère n'avaient pas de base légale claire dans le droit d'après-guerre, l'ancienne disposition de la loi sur la maison impériale qui les régissait ayant été abrogée après la guerre ; la nouvelle loi a formellement rétabli la pratique et précisé que le choix revient au Cabinet par décret, à la suite de l'accession de l'empereur. Pour Reiwa, un panel d'universitaires a présélectionné les noms candidats avant que le Cabinet ne tranche.|1979年以前、元号は戦後の法律上の裏付けを失っていた。それを定めていた旧皇室典範の規定が戦後に失効していたためで、新法はこの慣行を正式に復活させ、天皇の即位に伴い内閣が政令で定めると明記した。令和の際は有識者による候補の絞り込みを経て、最終的に内閣が決定した。",
  ),

  q(
    9,
    "In sumo, an ozeki who loses more bouts than he wins in a tournament is not demoted immediately, but faces demotion if it happens again the following tournament. What is that following, do-or-die tournament called?|En el sumo, un ozeki que pierde más combates de los que gana en un torneo no es degradado de inmediato, pero se arriesga a la degradación si vuelve a ocurrir en el siguiente torneo. ¿Cómo se llama ese torneo decisivo?|Dans le sumo, un ozeki qui perd plus de combats qu'il n'en gagne lors d'un tournoi n'est pas rétrogradé immédiatement, mais risque la rétrogradation si cela se reproduit au tournoi suivant. Comment appelle-t-on ce tournoi décisif ?|大相撲で、大関が負け越しても即座に陥落しないが、次の場所でも負け越せば関脇へ落とされる。その崖っぷちの場所を何と呼ぶか?",
    [
      "Bansaki-tan|Bansaki-tan|Bansaki-tan|番狂わせ",
      "Senshuraku|Senshuraku|Senshuraku|千秋楽",
      "Kadoban|Kadoban|Kadoban|角番",
    ],
    2,
    "An ozeki entering a tournament under this cloud is said to be kadoban, and a winning record there clears the mark and keeps the rank safe, while another losing record sends him down to sekiwake. Unlike yokozuna, ozeki can be demoted this way, and a demoted wrestler can in rare cases fight back up to reclaim the rank.|Se dice que un ozeki que entra a un torneo bajo esta amenaza está en kadoban, y un balance ganador allí borra la marca y mantiene a salvo el rango, mientras que otro balance perdedor lo hace descender a sekiwake. A diferencia del yokozuna, el ozeki puede ser degradado así, y en raras ocasiones un luchador degradado puede volver a subir y recuperar el rango.|Un ozeki entrant dans un tournoi sous cette menace est dit en kadoban, et un bilan gagnant y efface la marque et préserve le rang, tandis qu'un nouveau bilan perdant le fait redescendre à sekiwake. Contrairement au yokozuna, l'ozeki peut ainsi être rétrogradé, et un lutteur rétrogradé peut, dans de rares cas, remonter jusqu'à reconquérir le rang.|この状態にある大関は「角番」と呼ばれ、そこで勝ち越せば角番は解消されて地位にとどまるが、再び負け越すと関脇に陥落する。横綱と違い大関はこうして陥落することがあり、まれに陥落後に成績を残して大関へ復帰する力士もいる。",
  ),

  q(
    9,
    "Japan's first era name, Taika, was established in 645 following what event?|El primer nombre de era de Japón, Taika, se estableció en 645 tras qué acontecimiento?|Le premier nom d'ère du Japon, Taika, a été établi en 645 à la suite de quel événement ?|日本最初の元号「大化」は645年、何をきっかけに定められたか?",
    [
      "The introduction of Buddhism to the imperial court|La introducción del budismo en la corte imperial|L'introduction du bouddhisme à la cour impériale|仏教が朝廷に伝来したこと",
      "A palace coup that overthrew the powerful Soga clan|Un golpe palaciego que derrocó al poderoso clan Soga|Un coup de palais qui renversa le puissant clan Soga|有力豪族の蘇我氏を倒した宮中でのクーデター",
      "The completion of the first imperial capital, Nara|La finalización de la primera capital imperial, Nara|L'achèvement de la première capitale impériale, Nara|最初の都・奈良の完成",
    ],
    1,
    "Prince Naka no Oe and his allies assassinated the powerful minister Soga no Iruka in front of the empress in what is called the Isshi Incident, clearing the way for the Taika Reforms that followed. Adopting an era name was itself treated as a mark of an independent sovereign power, an idea borrowed from China.|El príncipe Naka no Oe y sus aliados asesinaron al poderoso ministro Soga no Iruka ante la emperatriz, en lo que se conoce como el Incidente Isshi, allanando el camino para las Reformas Taika que siguieron. Adoptar un nombre de era se consideraba en sí mismo una marca de poder soberano independiente, idea tomada de China.|Le prince Naka no Oe et ses alliés ont assassiné le puissant ministre Soga no Iruka devant l'impératrice, lors de ce qu'on appelle l'incident d'Isshi, ouvrant la voie aux réformes Taika qui suivirent. Adopter un nom d'ère était en soi considéré comme la marque d'un pouvoir souverain indépendant, une idée empruntée à la Chine.|中大兄皇子らが有力豪族・蘇我入鹿を皇后の眼前で暗殺した「乙巳の変」を機に、その後の大化の改新へとつながった。元号を持つこと自体、中国にならって独立した王権の証とされた。",
  ),

  q(
    10,
    "Horyu-ji, in Nara Prefecture, is said to contain the oldest surviving wooden buildings in the world. Roughly which century were the current main hall and pagoda built in?|Se dice que Horyu-ji, en la prefectura de Nara, contiene los edificios de madera más antiguos que se conservan en el mundo. ¿En qué siglo se construyeron aproximadamente el salón principal y la pagoda actuales?|On dit que Horyu-ji, dans la préfecture de Nara, abrite les plus anciens bâtiments en bois conservés au monde. Vers quel siècle le hall principal et la pagode actuels ont-ils été construits ?|奈良県の法隆寺には現存する世界最古の木造建築があるとされる。今ある金堂や五重塔はおよそ何世紀に建てられたとされるか?",
    [
      "The 5th century|El siglo V|Le 5e siècle|5世紀",
      "The 7th century|El siglo VII|Le 7e siècle|7世紀",
      "The 9th century|El siglo IX|Le 9e siècle|9世紀",
    ],
    1,
    "The temple was founded in 607, and after a fire recorded in 670 the current buildings were rebuilt, with most scholars putting the work in the late 7th century. Tree-ring dating of the timber used broadly supports a 7th-century construction, backing up the temple's reputation as the world's oldest standing wooden structures.|El templo se fundó en 607, y tras un incendio registrado en 670 se reconstruyeron los edificios actuales; la mayoría de los estudiosos sitúan la obra a finales del siglo VII. La datación por anillos de los árboles de la madera usada respalda en general una construcción del siglo VII, confirmando la reputación del templo como las estructuras de madera en pie más antiguas del mundo.|Le temple fut fondé en 607, et après un incendie consigné en 670, les bâtiments actuels furent reconstruits, la plupart des chercheurs situant les travaux à la fin du 7e siècle. La datation par cernes du bois utilisé confirme globalement une construction au 7e siècle, appuyant la réputation du temple d'abriter les plus anciennes structures en bois debout au monde.|607年に創建され、670年の火災記録ののち今の建物が再建されたとされ、多くの研究者は7世紀末ごろの建立とみている。使われた木材の年輪年代調査もおおむね7世紀の建立を裏づけており、現存する世界最古の木造建築という評判を支えている。",
  ),

  q(
    9,
    "European Impressionist painters' fascination with Japanese woodblock prints came to be called Japonisme. What popular anecdote is often told about how the prints first reached Europe in numbers?|La fascinación de los pintores impresionistas europeos por los grabados japoneses en madera pasó a llamarse japonismo. ¿Qué anécdota popular se cuenta a menudo sobre cómo los grabados llegaron por primera vez a Europa en cantidad?|La fascination des peintres impressionnistes européens pour les estampes japonaises sur bois a été appelée japonisme. Quelle anecdote populaire raconte-t-on souvent sur la façon dont les estampes sont d'abord arrivées en nombre en Europe ?|ヨーロッパの印象派画家たちが浮世絵に魅せられた現象は「ジャポニスム」と呼ばれる。浮世絵が大量にヨーロッパへ渡った経緯としてよく語られる逸話は何か?",
    [
      "It was used as cushioning paper when exporting porcelain|Se usaba como papel de relleno al exportar porcelana|On l'utilisait comme papier de calage pour exporter la porcelaine|陶磁器を輸出する際の緩衝材(包み紙)として使われていた",
      "Japanese print shops opened branches in Paris|Tiendas de grabados japonesas abrieron sucursales en París|Des boutiques d'estampes japonaises ont ouvert des succursales à Paris|浮世絵の店がパリに支店を開いた",
      "They were sold as souvenirs at the 1853 opening of Japan|Se vendían como souvenirs en la apertura de Japón de 1853|Elles étaient vendues comme souvenirs lors de l'ouverture du Japon en 1853|1853年の日本開国の際に土産として売られた",
    ],
    0,
    "The oft-repeated story is that woodblock prints, including cheap or damaged ones, were used as wrapping and packing material for export ceramics, and that a dealer or artist who unwrapped a shipment took notice. The tale's exact accuracy is debated, but it is well documented that painters such as Monet and Van Gogh went on to actively collect ukiyo-e and borrow from its compositions.|La historia repetida es que las estampas en madera, incluidas las baratas o dañadas, se usaban como envoltorio y material de embalaje para cerámica de exportación, y que un comerciante o artista que desenvolvió un envío se fijó en ellas. La exactitud del relato es debatida, pero está bien documentado que pintores como Monet y Van Gogh llegaron a coleccionar activamente ukiyo-e e inspirarse en sus composiciones.|L'histoire souvent répétée veut que des estampes sur bois, y compris bon marché ou abîmées, aient servi de papier d'emballage pour la céramique exportée, et qu'un marchand ou un artiste déballant un envoi les ait remarquées. L'exactitude du récit est débattue, mais il est bien documenté que des peintres comme Monet et Van Gogh se sont mis à collectionner activement les ukiyo-e et à s'en inspirer.|安価だったり傷んだりした浮世絵が、輸出用の陶磁器を包む緩衝材として使われ、それを開けた画商や画家が目を留めたという逸話が広く語られる。真偽には諸説あるが、モネやゴッホらが実際に浮世絵を熱心に収集し、その構図を作品に取り入れたことはよく記録されている。",
  ),

  q(
    9,
    "The Tale of Genji is attributed to Murasaki Shikibu, a lady-in-waiting who served an empress at the Heian court. Whose daughter was that empress?|El cuento de Genji se atribuye a Murasaki Shikibu, una dama de compañía que sirvió a una emperatriz de la corte Heian. ¿De quién era hija esa emperatriz?|Le Dit du Genji est attribué à Murasaki Shikibu, une dame de compagnie au service d'une impératrice de la cour Heian. De qui cette impératrice était-elle la fille ?|「源氏物語」の作者・紫式部が仕えた中宮は、誰の娘だったか?",
    [
      "Fujiwara no Yoshifusa|Fujiwara no Yoshifusa|Fujiwara no Yoshifusa|藤原良房",
      "Fujiwara no Michinaga|Fujiwara no Michinaga|Fujiwara no Michinaga|藤原道長",
      "Fujiwara no Michitaka|Fujiwara no Michitaka|Fujiwara no Michitaka|藤原道隆",
    ],
    1,
    "Murasaki Shikibu served Empress Shoshi, daughter of the powerful regent Fujiwara no Michinaga, who prized her literary talent. At around the same time, a rival empress, Teishi, daughter of Michinaga's brother Michitaka, was served by another celebrated woman writer, Sei Shonagon, and the two courts' literary output is often compared.|Murasaki Shikibu sirvió a la emperatriz Shoshi, hija del poderoso regente Fujiwara no Michinaga, quien apreciaba su talento literario. Casi al mismo tiempo, una emperatriz rival, Teishi, hija del hermano de Michinaga, Michitaka, era servida por otra célebre escritora, Sei Shonagon, y a menudo se compara la producción literaria de ambas cortes.|Murasaki Shikibu servit l'impératrice Shoshi, fille du puissant régent Fujiwara no Michinaga, qui appréciait son talent littéraire. À peu près à la même époque, une impératrice rivale, Teishi, fille du frère de Michinaga, Michitaka, était servie par une autre écrivaine célèbre, Sei Shonagon, et la production littéraire des deux cours est souvent comparée.|紫式部は、権勢を誇った藤原道長の娘である中宮・彰子に仕え、その文才を重んじられた。ほぼ同時期、道長の兄・道隆の娘である皇后・定子には清少納言という別の名高い女性作家が仕えており、両者の文学はしばしば比較される。",
  ),

  q(
    10,
    "Japan Standard Time is based on the 135th meridian east, which passes through a city in Hyogo Prefecture. Which one?|La hora estándar de Japón se basa en el meridiano 135 este, que pasa por una ciudad de la prefectura de Hyogo. ¿Cuál?|L'heure standard du Japon est basée sur le 135e méridien est, qui traverse une ville de la préfecture de Hyogo. Laquelle ?|日本標準時の基準となる東経135度線が通る、兵庫県の都市はどこか?",
    [
      "Akashi|Akashi|Akashi|明石市",
      "Himeji|Himeji|Himeji|姫路市",
      "Kobe|Kobe|Kobe|神戸市",
    ],
    0,
    "The meridian was designated in 1886 as the basis for Japan Standard Time, and the city built a science museum whose tower straddles the line itself, letting visitors stand with one foot in each half of the meridian. The choice of longitude puts Japan nine hours ahead of Coordinated Universal Time (UTC+9).|El meridiano fue designado en 1886 como base de la hora estándar de Japón, y la ciudad construyó un museo de ciencia cuya torre se levanta justo sobre la línea, permitiendo a los visitantes pararse con un pie en cada mitad del meridiano. La elección de esta longitud pone a Japón nueve horas por delante del tiempo universal coordinado (UTC+9).|Le méridien a été désigné en 1886 comme base de l'heure standard du Japon, et la ville a construit un musée des sciences dont la tour chevauche la ligne elle-même, permettant aux visiteurs de se tenir un pied de chaque côté du méridien. Ce choix de longitude place le Japon neuf heures en avance sur le temps universel coordonné (UTC+9).|1886年にこの経線が日本標準時の基準に定められ、明石市には子午線をまたぐように建てられた天文科学館があり、経線の両側に片足ずつ立つことができる。この経度の選定により、日本は協定世界時(UTC+9)より9時間進んだ時刻となっている。",
  ),

  q(
    9,
    "The 24 solar terms (nijushi-sekki) were further subdivided into a Japanese calendar system with poetic five-day periods, such as \"the east wind melts the ice.\" What is this finer system called?|Los 24 términos solares (nijushi-sekki) se subdividieron más en un sistema calendárico japonés con periodos poéticos de cinco días, como «el viento del este derrite el hielo». ¿Cómo se llama este sistema más fino?|Les 24 termes solaires (nijushi-sekki) ont été subdivisés dans un système calendaire japonais en périodes poétiques de cinq jours, comme « le vent d'est fait fondre la glace ». Comment appelle-t-on ce système plus fin ?|二十四節気をさらに5日ごとに細分し、「東風凍を解く」のような詩的な名をつけた日本独自の暦の区分を何と呼ぶか?",
    [
      "The 72 micro-seasons (shichijuni-ko)|Las 72 microestaciones (shichijuni-ko)|Les 72 micro-saisons (shichijuni-ko)|七十二候",
      "The ten celestial stems and twelve branches|Los diez troncos celestiales y las doce ramas|Les dix troncs célestes et les douze branches|十干十二支",
      "The six-day rokuyo cycle|El ciclo rokuyo de seis días|Le cycle rokuyo de six jours|六曜",
    ],
    0,
    "The system originated in China but was revised during the Edo period by the astronomer Shibukawa Harumi to better match Japan's own climate, and its poetic names still turn up on calendars and in the seasonal names given to wagashi sweets. Each of the 24 solar terms is split into three of these roughly five-day periods, adding up to 72 across the year.|El sistema se originó en China, pero fue revisado durante el periodo Edo por el astrónomo Shibukawa Harumi para adaptarse mejor al clima propio de Japón, y sus nombres poéticos aún aparecen en calendarios y en los nombres estacionales de los dulces wagashi. Cada uno de los 24 términos solares se divide en tres de estos periodos de unos cinco días, sumando 72 a lo largo del año.|Le système est né en Chine mais fut révisé durant l'époque d'Edo par l'astronome Shibukawa Harumi pour mieux correspondre au climat propre du Japon, et ses noms poétiques figurent encore sur les calendriers et dans les noms saisonniers donnés aux douceurs wagashi. Chacun des 24 termes solaires se divise en trois de ces périodes d'environ cinq jours, totalisant 72 sur l'année.|中国由来の区分だが、江戸時代に天文学者・渋川春海が日本の気候に合わせて改訂したとされ、その詩的な名は今もカレンダーや和菓子の季節の名として使われる。二十四節気のひとつひとつがさらに約5日ずつ3つに分けられ、一年でちょうど七十二にのぼる。",
  ),

  q(
    10,
    "The three imperial regalia are traditionally held to be a mirror, a sword, and a jewel. Which one is enshrined not at the Imperial Palace but at Ise Grand Shrine, with only a stand-in kept at the palace?|Las tres joyas imperiales se consideran tradicionalmente un espejo, una espada y una joya. ¿Cuál de ellas se venera no en el Palacio Imperial sino en el Gran Santuario de Ise, con solo un sustituto guardado en el palacio?|Les trois trésors impériaux sont traditionnellement un miroir, une épée et un joyau. Lequel est vénéré non pas au Palais impérial mais au Grand Sanctuaire d'Ise, seul un substitut étant conservé au palais ?|三種の神器とされる鏡・剣・勾玉のうち、皇居ではなく伊勢神宮に祀られ、皇居には形代(分身)だけが置かれるとされるのはどれか?",
    [
      "The jewel, Yasakani no Magatama|La joya, Yasakani no Magatama|Le joyau, Yasakani no Magatama|勾玉(八尺瓊勾玉)",
      "The sword, Kusanagi no Tsurugi|La espada, Kusanagi no Tsurugi|L'épée, Kusanagi no Tsurugi|剣(草薙剣)",
      "The mirror, Yata no Kagami|El espejo, Yata no Kagami|Le miroir, Yata no Kagami|鏡(八咫鏡)",
    ],
    2,
    "The mirror, Yata no Kagami, is said to be enshrined at Ise's Inner Shrine, and the sword, Kusanagi, is likewise held at Atsuta Shrine rather than the palace, leaving only the jewel actually kept there. The regalia are treated as proof of imperial succession, but tradition holds that not even the emperor views them directly.|Se dice que el espejo, Yata no Kagami, está venerado en el santuario interior de Ise, y la espada, Kusanagi, se guarda igualmente en el santuario de Atsuta en lugar del palacio, dejando solo la joya realmente allí. Las joyas se consideran prueba de la sucesión imperial, pero la tradición sostiene que ni siquiera el emperador las contempla directamente.|On dit que le miroir, Yata no Kagami, est vénéré au sanctuaire intérieur d'Ise, et que l'épée, Kusanagi, est de même conservée au sanctuaire d'Atsuta plutôt qu'au palais, ne laissant que le joyau effectivement gardé sur place. Les trésors sont considérés comme la preuve de la succession impériale, mais la tradition veut que même l'empereur ne les contemple pas directement.|鏡である八咫鏡は伊勢神宮の内宮に祀られているとされ、剣の草薙剣も皇居ではなく熱田神宮に祀られており、実際に皇居に置かれているのは勾玉だけとされる。三種の神器は皇位継承の証とされるが、天皇本人でさえ直接見ることはないとの伝承がある。",
  ),
];
