/**
 * 北海道のクイズ(先行3問・試作)。
 *
 * 難易度は他の盤面と同じ1〜10。都市カード(`cities.mjs`)が扱った具体的な
 * 事実(夕張の財政破綻・岩見沢の幌内鉄道・留萌本線の廃止・根室と東根室・
 * 白老のウポポイ)はここでは問わない。
 *
 * 本番(100〜120問)を書く際に確かめること:
 * `node scripts/check-quiz.mjs hokkaido`
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const HOKKAIDO_QUIZ = [
  q(
    2,
    "Which city is Hokkaidō's capital and largest city?|¿Cuál es la capital y ciudad más grande de Hokkaidō?|Quelle est la capitale et la plus grande ville de Hokkaidō ?|北海道の道庁所在地であり最大の都市はどこか?",
    [
      "Sapporo|Sapporo|Sapporo|札幌",
      "Hakodate|Hakodate|Hakodate|函館",
      "Kushiro|Kushiro|Kushiro|釧路",
    ],
    0,
    "In 1972 the city hosted the first Winter Olympics ever held in Asia, and the ski jump built for those games on Mount Ōkura still hosts World Cup events today.|En 1972 la ciudad acogió los primeros Juegos Olímpicos de Invierno celebrados en Asia, y el trampolín de salto de esquí construido para esos juegos en el monte Ōkura todavía acoge hoy pruebas de la Copa del Mundo.|En 1972, la ville accueillit les premiers Jeux olympiques d'hiver jamais organisés en Asie, et le tremplin de saut à ski construit pour ces jeux sur le mont Ōkura accueille encore aujourd'hui des épreuves de Coupe du monde.|1972年、この町はアジア初の冬季オリンピックを開いた。そのとき大倉山に建てられたジャンプ台は、いまもワールドカップの舞台として使われ続けている。",
  ),
  q(
    2,
    "What was Hokkaidō called before the Meiji government renamed it in 1869?|¿Cómo se llamaba Hokkaidō antes de que el gobierno Meiji lo renombrara en 1869?|Comment s'appelait Hokkaidō avant que le gouvernement Meiji ne la renomme en 1869 ?|1869年に明治政府が改称する前、北海道は何と呼ばれていたか?",
    [
      "Ezo|Ezo|Ezo|蝦夷地",
      "Ryūkyū|Ryūkyū|Ryūkyū|琉球",
      "Tsugaru|Tsugaru|Tsugaru|津軽",
    ],
    0,
    "Ezo (or Ezochi) was the name used for the island for centuries while the Matsumae domain held the only licence to trade there; the new name Hokkaidō, \"the road to the northern sea\", was coined in 1869 alongside a new colonisation office.|Ezo (o Ezochi) fue el nombre usado para la isla durante siglos, mientras el dominio de Matsumae poseía la única licencia para comerciar allí; el nuevo nombre Hokkaidō, «el camino hacia el mar del norte», se acuñó en 1869 junto con una nueva oficina de colonización.|Ezo (ou Ezochi) fut le nom utilisé pour l'île pendant des siècles, tandis que le domaine de Matsumae détenait la seule licence d'y commercer ; le nouveau nom Hokkaidō, « la route vers la mer du Nord », fut inventé en 1869 avec la création d'un nouvel office de colonisation.|蝦夷地(えぞち)は、松前藩がここでの交易を独占していた数百年のあいだ使われた呼び名である。「北の海への道」を意味する北海道という新しい名は、1869年に開拓使の設置とともに定められた。",
  ),
  q(
    9,
    "In November 2016, JR Hokkaidō publicly listed a group of lines it said it could not keep operating without outside support. Roughly how many kilometres of track did that list cover?|En noviembre de 2016, JR Hokkaidō hizo pública una lista de líneas que, según dijo, no podía seguir operando sin ayuda externa. ¿Cuántos kilómetros de vía cubría, aproximadamente, esa lista?|En novembre 2016, JR Hokkaidō rendit publique une liste de lignes qu'elle disait ne pouvoir continuer d'exploiter sans aide extérieure. Cette liste couvrait environ combien de kilomètres de voie ?|2016年11月、JR北海道は「単独では維持が困難」と発表した路線の一覧を公表した。その総延長はおよそ何kmだったか?",
    [
      "About 400 km|Unos 400 km|Environ 400 km|約400km",
      "About 1,200 km|Unos 1.200 km|Environ 1 200 km|約1200km",
      "About 2,000 km|Unos 2.000 km|Environ 2 000 km|約2000km",
    ],
    1,
    "The list totalled roughly 1,237 km, about half of JR Hokkaidō's entire network at the time. Several of the sections on it have since closed outright, and the network keeps shrinking year by year.|La lista sumaba unos 1.237 km, casi la mitad de toda la red de JR Hokkaidō en aquel momento. Varios de esos tramos han cerrado desde entonces por completo, y la red sigue reduciéndose año tras año.|La liste totalisait environ 1 237 km, soit près de la moitié du réseau de JR Hokkaidō à l'époque. Plusieurs de ces tronçons ont depuis fermé définitivement, et le réseau continue de rétrécir chaque année.|一覧の総延長はおよそ1237kmで、これは当時のJR北海道の路線網のほぼ半分にあたる。この一覧に挙がった区間のうち複数はその後実際に廃止され、路線網はいまも年ごとに縮み続けている。",
  ),

  // ----------------------------------------------------------------------
  // 難易度1〜3(常識・推測で解ける)
  // ----------------------------------------------------------------------
  q(
    3,
    "Traditional Ainu communities across Hokkaidō, Sakhalin and the Kuril Islands lived mainly by which means, rather than by paddy farming?|Las comunidades ainu tradicionales de Hokkaidō, Sajalín y las islas Kuriles vivían principalmente de qué medios, en vez del cultivo de arroz en regadío?|Les communautés aïnoues traditionnelles à Hokkaidō, Sakhaline et les îles Kouriles vivaient principalement de quels moyens, plutôt que de la riziculture inondée ?|北海道・樺太・千島列島の伝統的なアイヌの人々の暮らしを支えていたのは、水田稲作ではなく主に何だったか?",
    [
      "Hunting, fishing and gathering|Caza, pesca y recolección|Chasse, pêche et cueillette|狩猟・漁労・採集",
      "Large-scale wheat farming|Cultivo de trigo a gran escala|Grande culture du blé|大規模な小麦栽培",
      "Long-distance camel caravans|Caravanas de camellos de larga distancia|Caravanes de chameaux longue distance|長距離のラクダ隊商",
    ],
    0,
    "Salmon runs, deer, and wild plants gathered by season formed the backbone of the traditional Ainu economy, with trade goods such as furs and dried fish exchanged for rice, metal tools and other items from Japanese and mainland traders.|Las corridas de salmón, los ciervos y las plantas silvestres recolectadas según la estación formaban la base de la economía ainu tradicional, con productos como pieles y pescado seco intercambiados por arroz, herramientas de metal y otros artículos de comerciantes japoneses y continentales.|Les remontées de saumon, le cerf et les plantes sauvages cueillies selon la saison formaient la base de l'économie aïnoue traditionnelle, des biens comme les fourrures et le poisson séché étant échangés contre du riz, des outils métalliques et d'autres articles auprès de commerçants japonais et continentaux.|鮭の遡上、鹿、季節ごとに集める山野草が伝統的なアイヌの暮らしの基盤だった。毛皮や干し魚などを、日本人や大陸の商人から得る米や金属製の道具などと交換していた。",
  ),
  q(
    1,
    "\"Jingisukan\", a Hokkaidō speciality cooked on a domed grill at the table, is made from which meat?|«Jingisukan», especialidad de Hokkaidō cocinada en una parrilla abombada en la mesa, ¿de qué carne se hace?|Le « jingisukan », spécialité de Hokkaidō cuite sur un gril bombé à table, est fait de quelle viande ?|卓上の兜型の鉄板で焼く北海道名物「ジンギスカン」は何の肉を使うか?",
    [
      "Mutton or lamb|Cordero u oveja|Mouton ou agneau|羊肉(マトンまたはラム)",
      "Beef|Vaca|Bœuf|牛肉",
      "Pork|Cerdo|Porc|豚肉",
    ],
    0,
    "The dish takes its name from the Mongol conqueror, though its exact Hokkaidō origin is unclear; sheep farming was encouraged here in the early twentieth century to supply wool for military uniforms, and the meat that came with it needed a use.|El plato toma su nombre del conquistador mongol, aunque su origen exacto en Hokkaidō no está claro; la cría de ovejas se fomentó aquí a principios del siglo XX para dar lana a los uniformes militares, y la carne resultante necesitaba un destino.|Le plat tire son nom du conquérant mongol, bien que son origine exacte à Hokkaidō reste incertaine ; l'élevage ovin y fut encouragé au début du XXe siècle pour fournir la laine des uniformes militaires, et la viande qui en résultait devait bien servir à quelque chose.|チンギス・ハンにちなむ名だが、北海道での正確な発祥は分かっていない。20世紀初頭、軍服用の羊毛を得るためにここで羊の飼育が奨励され、そこで出た肉の使い道として広まったとされる。",
  ),
  q(
    2,
    "Which crop does Hokkaidō grow more of than any other prefecture in Japan?|¿Qué cultivo produce Hokkaidō más que cualquier otra prefectura de Japón?|Quelle culture Hokkaidō produit-elle plus qu'aucune autre préfecture du Japon ?|北海道が日本の他のどの都道府県よりも多く生産している作物は?",
    [
      "Potatoes|Patatas|Pommes de terre|じゃがいも",
      "Rice|Arroz|Riz|米",
      "Tea|Té|Thé|茶",
    ],
    0,
    "Hokkaidō's cool climate and open plains suit potatoes far better than the paddy rice that dominates most of Japan, and the island grows well over half the country's total crop.|El clima fresco y las llanuras abiertas de Hokkaidō se prestan mucho mejor a la patata que al arroz de regadío que domina el resto de Japón, y la isla produce más de la mitad de la cosecha nacional.|Le climat frais et les plaines ouvertes de Hokkaidō conviennent bien mieux à la pomme de terre qu'à la riziculture inondée qui domine le reste du Japon, et l'île produit plus de la moitié de la récolte nationale.|北海道の冷涼な気候と広い平野は、日本の他地域を占める水田稲作よりもじゃがいも栽培に向いており、全国収穫量の半分以上をこの島だけで産する。",
  ),
  q(
    2,
    "Which strait separates Hokkaidō from Sakhalin, the Russian-held island to its north?|¿Qué estrecho separa Hokkaidō de Sajalín, la isla bajo control ruso al norte?|Quel détroit sépare Hokkaidō de Sakhaline, l'île russe au nord ?|北海道と、その北にあるロシア領サハリン(樺太)を隔てる海峡は?",
    [
      "The Sōya Strait|El estrecho de Sōya|Le détroit de Sōya|宗谷海峡",
      "The Tsugaru Strait|El estrecho de Tsugaru|Le détroit de Tsugaru|津軽海峡",
      "The Nemuro Strait|El estrecho de Nemuro|Le détroit de Nemuro|根室海峡",
    ],
    0,
    "At its narrowest the strait is only about 43 km wide, and on a clear day Sakhalin is visible from Hokkaidō's northern cape.|En su punto más estrecho, el estrecho mide solo unos 43 km, y en un día despejado se puede ver Sajalín desde el cabo norte de Hokkaidō.|À son point le plus étroit, le détroit ne mesure qu'environ 43 km, et par temps clair, Sakhaline est visible depuis le cap nord de Hokkaidō.|海峡はもっとも狭い場所でおよそ43kmしかなく、晴れた日には北海道の北端の岬からサハリンが見える。",
  ),
  q(
    2,
    "What large wild carnivore, Japan's biggest land mammal, lives across Hokkaidō but not on the other main islands?|¿Qué gran carnívoro salvaje, el mayor mamífero terrestre de Japón, vive en Hokkaidō pero no en las demás islas principales?|Quel grand carnivore sauvage, le plus grand mammifère terrestre du Japon, vit à Hokkaidō mais pas sur les autres îles principales ?|北海道にはいるが本州以南の主要な島にはいない、日本最大の陸生哺乳類である大型肉食獣は?",
    [
      "The brown bear|El oso pardo|L'ours brun|ヒグマ",
      "The Asian black bear|El oso negro asiático|L'ours noir d'Asie|ツキノワグマ",
      "The grey wolf|El lobo gris|Le loup gris|オオカミ",
    ],
    0,
    "Hokkaidō's brown bear is a separate population from the smaller Asian black bear found on Honshu, and hiking trails across the island post warnings about encounters.|El oso pardo de Hokkaidō forma una población distinta del oso negro asiático, más pequeño, que se encuentra en Honshu, y las rutas de senderismo de la isla llevan avisos sobre posibles encuentros.|L'ours brun de Hokkaidō forme une population distincte du plus petit ours noir d'Asie que l'on trouve à Honshu, et les sentiers de randonnée de l'île affichent des avertissements en cas de rencontre.|北海道のヒグマは、本州にいるより小型のツキノワグマとは別の個体群であり、島内の登山道にはクマとの遭遇を注意する看板が立つ。",
  ),
  q(
    3,
    "Roughly what share of Japan's total land area does Hokkaidō occupy?|¿Qué proporción aproximada de la superficie total de Japón ocupa Hokkaidō?|Environ quelle part de la superficie totale du Japon Hokkaidō occupe-t-elle ?|北海道は日本の総面積のおよそどれくらいを占めるか?",
    [
      "About a fifth|Aproximadamente un quinto|Environ un cinquième|およそ5分の1",
      "About a half|Aproximadamente la mitad|Environ la moitié|およそ2分の1",
      "About a tenth|Aproximadamente un décimo|Environ un dixième|およそ10分の1",
    ],
    0,
    "Hokkaidō covers roughly 22% of Japan's land, yet holds only around 4% of its population, giving it by far the lowest population density of any main island.|Hokkaidō cubre aproximadamente el 22% del territorio de Japón, pero alberga solo alrededor del 4% de su población, lo que le da con diferencia la menor densidad de población de las islas principales.|Hokkaidō couvre environ 22 % du territoire du Japon, mais n'abrite qu'environ 4 % de sa population, ce qui lui donne de loin la plus faible densité de population parmi les îles principales.|北海道は日本の国土のおよそ22%を占めるが、人口は全体のわずか4%ほどしかなく、主要な島の中では際立って人口密度が低い。",
  ),
  q(
    1,
    "For what does Hokkaidō account for a large share of Japan's total output, alongside potatoes?|Además de la patata, ¿de qué producto abastece Hokkaidō una gran parte del total de Japón?|En plus de la pomme de terre, à quoi Hokkaidō fournit-elle une grande part de la production totale du Japon ?|じゃがいもと並んで、北海道が日本全体の生産の多くを占めるものは?",
    [
      "Milk|Leche|Lait|牛乳",
      "Green tea|Té verde|Thé vert|緑茶",
      "Citrus fruit|Cítricos|Agrumes|柑橘類",
    ],
    0,
    "Hokkaidō's cool summers and wide pastures make it Japan's leading dairy region, supplying roughly half the nation's raw milk from herds that outnumber the island's rural human population in many towns.|Los veranos frescos y los amplios pastos de Hokkaidō la convierten en la principal región lechera de Japón, con cerca de la mitad de la leche cruda del país producida por rebaños que en muchos pueblos superan en número a la población rural.|Les étés frais et les vastes pâturages de Hokkaidō en font la principale région laitière du Japon, fournissant environ la moitié du lait cru national, avec des troupeaux qui, dans de nombreuses villes, dépassent en nombre la population rurale.|冷涼な夏と広い牧草地のおかげで、北海道は日本一の酪農地帯であり、全国の生乳のおよそ半分を産する。多くの町では、牛の数が農村部の人口を上回る。",
  ),
  q(
    3,
    "Which sea lies off Hokkaidō's northeast coast, known for pack ice drifting down from the Amur River each winter?|¿Qué mar bordea la costa noreste de Hokkaidō, conocido por el hielo a la deriva que baja del río Amur cada invierno?|Quelle mer borde la côte nord-est de Hokkaidō, connue pour la banquise dérivant du fleuve Amour chaque hiver ?|毎年冬、アムール川から流氷が押し寄せることで知られる、北海道北東の海は?",
    [
      "The Sea of Okhotsk|El mar de Ojotsk|La mer d'Okhotsk|オホーツク海",
      "The Sea of Japan|El mar de Japón|La mer du Japon|日本海",
      "The Philippine Sea|El mar de Filipinas|La mer des Philippines|フィリピン海",
    ],
    0,
    "The Sea of Okhotsk is one of the lowest-latitude seas in the world to freeze over regularly, thanks to the huge volume of comparatively fresh water the Amur River pours into it.|El mar de Ojotsk es uno de los mares de menor latitud del mundo que se congela con regularidad, gracias al enorme volumen de agua relativamente dulce que vierte en él el río Amur.|La mer d'Okhotsk est l'une des mers de plus basse latitude au monde à geler régulièrement, grâce à l'énorme volume d'eau relativement douce que le fleuve Amour y déverse.|オホーツク海は、アムール川が注ぎ込む比較的塩分の薄い大量の水のおかげで、世界でも有数の低緯度で毎年規則的に結氷する海である。",
  ),
  q(
    2,
    "Which noodle style, often finished with a knob of butter and corn, is especially associated with Sapporo?|¿Qué estilo de fideos, a menudo rematado con mantequilla y maíz, se asocia especialmente con Sapporo?|Quel style de nouilles, souvent garni de beurre et de maïs, est particulièrement associé à Sapporo ?|バターとコーンを添えることが多い、札幌と特に結びつけられるラーメンの種類は?",
    [
      "Miso ramen|Ramen de miso|Ramen au miso|味噌ラーメン",
      "Tonkotsu ramen|Ramen tonkotsu|Ramen tonkotsu|とんこつラーメン",
      "Shoyu ramen|Ramen shoyu|Ramen shoyu|醤油ラーメン",
    ],
    0,
    "Miso-flavoured ramen was developed in Sapporo in the 1950s to hold its heat through Hokkaidō's cold winters, and butter and corn were added as toppings drawn from the island's own dairy and farm produce.|El ramen de miso se desarrolló en Sapporo en los años 50 para conservar el calor durante los fríos inviernos de Hokkaidō, y se añadieron mantequilla y maíz como ingredientes propios de los productos lácteos y agrícolas de la isla.|Le ramen au miso fut mis au point à Sapporo dans les années 1950 pour garder sa chaleur pendant les hivers froids de Hokkaidō, le beurre et le maïs y ayant été ajoutés à partir des produits laitiers et agricoles propres à l'île.|味噌ラーメンは1950年代、北海道の寒い冬でも冷めにくいよう札幌で考案された。バターとコーンは、この島自慢の乳製品と農産物からのせられるようになった具材である。",
  ),
  q(
    3,
    "Which Hokkaidō city, birthplace of Nikka Whisky's first distillery in 1934, is known for its coastal climate suited to whisky ageing?|¿Qué ciudad de Hokkaidō, cuna de la primera destilería de Nikka Whisky en 1934, es conocida por su clima costero apto para el envejecimiento del whisky?|Quelle ville de Hokkaidō, berceau de la première distillerie de Nikka Whisky en 1934, est connue pour son climat côtier propice au vieillissement du whisky ?|1934年にニッカウヰスキー最初の蒸留所ができた、ウイスキー熟成に適した海沿いの気候で知られる北海道の町は?",
    [
      "Yoichi|Yoichi|Yoichi|余市",
      "Kutchan|Kutchan|Kutchan|倶知安",
      "Wakkanai|Wakkanai|Wakkanai|稚内",
    ],
    0,
    "Masataka Taketsuru, who had studied whisky-making in Scotland, chose this small fishing town for its foggy, cool coastal air, which he judged close enough to the Scottish Highlands.|Masataka Taketsuru, que había estudiado la elaboración de whisky en Escocia, eligió este pequeño pueblo pesquero por su aire costero fresco y brumoso, que consideró suficientemente parecido al de las Tierras Altas escocesas.|Masataka Taketsuru, qui avait étudié la fabrication du whisky en Écosse, choisit cette petite ville de pêcheurs pour son air côtier frais et brumeux, qu'il jugeait suffisamment proche de celui des Highlands écossais.|スコットランドでウイスキー造りを学んだ竹鶴政孝は、霧深く冷涼なこの漁師町の海沿いの空気を、スコットランド高地に近いと見込んで選んだ。",
  ),
  q(
    2,
    "Which small, nocturnal mammal native to Hokkaidō's forests glides between trees using a flap of skin stretched between its limbs?|¿Qué pequeño mamífero nocturno nativo de los bosques de Hokkaidō planea entre árboles usando un pliegue de piel entre sus extremidades?|Quel petit mammifère nocturne originaire des forêts d'Hokkaidō plane entre les arbres grâce à un repli de peau tendu entre ses membres ?|前脚と後脚のあいだの皮膜を広げて木々のあいだを滑空する、北海道の森にすむ夜行性の小さな哺乳類は?",
    [
      "The Siberian flying squirrel|La ardilla voladora siberiana|L'écureuil volant de Sibérie|エゾモモンガ",
      "The Ezo red fox|El zorro rojo de Ezo|Le renard roux d'Ezo|キタキツネ",
      "The sable|La marta cibelina|La zibeline|クロテン",
    ],
    0,
    "Hokkaidō's flying squirrel is a separate, smaller subspecies from the one found on Honshu, weighing well under 200 grams, and its large dark eyes are adapted for gliding between trees at night rather than during the day.|La ardilla voladora de Hokkaidō es una subespecie distinta y más pequeña que la de Honshu, con menos de 200 gramos de peso, y sus grandes ojos oscuros están adaptados para planear entre árboles de noche, no de día.|L'écureuil volant d'Hokkaidō est une sous-espèce distincte et plus petite que celle de Honshu, pesant bien moins de 200 grammes, et ses grands yeux sombres sont adaptés au vol plané nocturne entre les arbres plutôt que diurne.|北海道のエゾモモンガは本州のものより小さな別亜種で、体重は200gを大きく下回る。大きな黒い目は、昼ではなく夜に木々のあいだを滑空するために適応したものである。",
  ),
  q(
    5,
    "In September 2018 an earthquake near Atsuma, in southwestern Hokkaidō, caused what event that had never before happened to an entire Japanese prefecture at once?|En septiembre de 2018, un terremoto cerca de Atsuma, en el suroeste de Hokkaidō, causó un hecho que nunca antes había ocurrido en toda una prefectura japonesa a la vez. ¿Cuál?|En septembre 2018, un séisme près d'Atsuma, dans le sud-ouest de Hokkaidō, provoqua un événement jamais arrivé auparavant à une préfecture japonaise entière. Lequel ?|2018年9月、道南の厚真町付近を震源とした地震が、日本の一つの都道府県全体では前例のなかった何を引き起こしたか?",
    [
      "A total, island-wide power blackout|Un apagón eléctrico total en toda la isla|Une panne d'électricité totale sur toute l'île|島内全域の同時停電",
      "A complete halt of all mobile networks nationwide|Un colapso total de las redes móviles a nivel nacional|Un arrêt complet des réseaux mobiles à l'échelle nationale|全国の携帯網の完全停止",
      "The closure of every airport in Japan|El cierre de todos los aeropuertos de Japón|La fermeture de tous les aéroports du Japon|日本全空港の閉鎖",
    ],
    0,
    "The quake knocked out a single large power plant that the island's grid depended on too heavily, triggering a cascading \"blackout\" that left nearly all of Hokkaidō's roughly 2.95 million households without electricity, some for days.|El terremoto dejó fuera de servicio una única gran central eléctrica de la que dependía en exceso la red de la isla, provocando un apagón en cadena que dejó sin electricidad a casi todos los aproximadamente 2,95 millones de hogares de Hokkaidō, algunos durante días.|Le séisme mit hors service une seule grande centrale électrique dont dépendait trop lourdement le réseau de l'île, déclenchant un « blackout » en cascade qui priva d'électricité près des 2,95 millions de foyers de Hokkaidō, certains pendant plusieurs jours.|地震は北海道の電力網が過度に依存していた1か所の大規模発電所を停止させ、連鎖的な「ブラックアウト」を引き起こした。およそ295万戸のほぼ全世帯が停電し、数日間続いた地域もあった。",
  ),
  q(
    4,
    "The 1869 Meiji-era office set up in Sapporo to plan and oversee Hokkaidō's colonisation was called the:|La oficina de la era Meiji creada en Sapporo en 1869 para planificar y supervisar la colonización de Hokkaidō se llamaba:|Le bureau de l'ère Meiji créé à Sapporo en 1869 pour planifier et superviser la colonisation de Hokkaidō s'appelait :|1869年、北海道の開拓を計画・監督するために札幌に置かれた明治政府の役所は?",
    [
      "The Kaitakushi (Development Commission)|El Kaitakushi (Comisión de Desarrollo)|Le Kaitakushi (Commission de développement)|開拓使",
      "The Bakufu|El Bakufu|Le Bakufu|幕府",
      "The Gaimushō|El Gaimushō|Le Gaimushō|外務省",
    ],
    0,
    "The Kaitakushi ran Hokkaidō's colonisation for a decade, hiring foreign advisers, laying out Sapporo's grid and organising the settler-soldier militias sent to farm and guard the frontier.|El Kaitakushi dirigió la colonización de Hokkaidō durante una década, contratando asesores extranjeros, trazando la cuadrícula de Sapporo y organizando las milicias de colonos-soldados enviadas a cultivar y vigilar la frontera.|Le Kaitakushi dirigea la colonisation de Hokkaidō pendant une décennie, engageant des conseillers étrangers, traçant le quadrillage de Sapporo et organisant les milices de colons-soldats envoyées cultiver et garder la frontière.|開拓使は10年にわたり北海道の開拓を担い、外国人顧問を雇い、札幌の碁盤目を設計し、開拓と国境警備を兼ねる屯田兵の組織化も行った。",
  ),
  q(
    5,
    "The Kaitakushi's settler-soldiers, who farmed the land while also serving as a defence militia, were known as:|Los colonos-soldados del Kaitakushi, que cultivaban la tierra mientras servían también como milicia de defensa, eran conocidos como:|Les colons-soldats du Kaitakushi, qui cultivaient la terre tout en servant de milice de défense, étaient appelés :|開拓使のもとで農業と警備を兼ねた入植兵の制度は何と呼ばれたか?",
    [
      "Tondenhei|Tondenhei|Tondenhei|屯田兵",
      "Samurai|Samuráis|Samouraïs|侍",
      "Ronin|Ronin|Rōnin|浪人",
    ],
    0,
    "Many tondenhei were former samurai left without income after the shogunate's fall, given land in Hokkaidō in exchange for farming it and standing ready to defend the northern border.|Muchos tondenhei eran antiguos samuráis que se habían quedado sin ingresos tras la caída del shogunato, a quienes se dio tierra en Hokkaidō a cambio de cultivarla y estar listos para defender la frontera norte.|Beaucoup de tondenhei étaient d'anciens samouraïs privés de revenus après la chute du shogunat, à qui l'on donna des terres à Hokkaidō en échange de leur culture et d'une disponibilité pour défendre la frontière nord.|屯田兵の多くは、幕府崩壊で収入を失った旧士族だった。北海道の土地を与えられる代わりに開墾し、北の国境を守る備えも担った。",
  ),
  q(
    5,
    "Hokkaidō University traces its roots to an agricultural college founded in Sapporo in 1876 with the help of an American educator. Who was he?|La Universidad de Hokkaidō remonta sus orígenes a un colegio de agricultura fundado en Sapporo en 1876 con la ayuda de un educador estadounidense. ¿Quién era?|L'université de Hokkaidō remonte à un collège d'agriculture fondé à Sapporo en 1876 avec l'aide d'un éducateur américain. Qui était-il ?|北海道大学は1876年、あるアメリカ人教育者の助力で札幌に開かれた農学校を起源とする。その人物は?",
    [
      "William S. Clark|William S. Clark|William S. Clark|ウィリアム・スミス・クラーク",
      "Horace Capron|Horace Capron|Horace Capron|ホーレス・ケプロン",
      "Matthew Perry|Matthew Perry|Matthew Perry|マシュー・ペリー",
    ],
    0,
    "Clark spent only about eight months in Hokkaidō, but his parting words to his students, \"Boys, be ambitious\", are still quoted across Japan and stand on a monument near the campus.|Clark pasó solo unos ocho meses en Hokkaidō, pero sus palabras de despedida a sus alumnos, «Boys, be ambitious», todavía se citan en todo Japón y figuran en un monumento cerca del campus.|Clark ne passa qu'environ huit mois à Hokkaidō, mais ses derniers mots à ses élèves, « Boys, be ambitious », sont encore cités dans tout le Japon et figurent sur un monument près du campus.|クラークが北海道に滞在したのはわずか8か月ほどだったが、学生に残した「少年よ、大志を抱け」という言葉は今も日本中で引用され、キャンパス近くの記念碑にも刻まれている。",
  ),
  q(
    6,
    "Before Clark, which American agricultural adviser was hired by the Meiji government to help plan Hokkaidō's colonisation?|Antes de Clark, ¿qué asesor agrícola estadounidense fue contratado por el gobierno Meiji para ayudar a planificar la colonización de Hokkaidō?|Avant Clark, quel conseiller agricole américain fut engagé par le gouvernement Meiji pour aider à planifier la colonisation de Hokkaidō ?|クラークより前、明治政府が北海道開拓の計画に招いたアメリカ人農業顧問は?",
    [
      "Horace Capron|Horace Capron|Horace Capron|ホーレス・ケプロン",
      "Townsend Harris|Townsend Harris|Townsend Harris|タウンゼント・ハリス",
      "Ulysses S. Grant|Ulysses S. Grant|Ulysses S. Grant|ユリシーズ・グラント",
    ],
    0,
    "A former U.S. commissioner of agriculture, Capron advised the Kaitakushi on everything from crop choice to road-building, and Sapporo's grid-planned streets and wide avenues owe much to his recommendations.|Antiguo comisionado de agricultura de EE. UU., Capron asesoró al Kaitakushi en todo, desde la elección de cultivos hasta la construcción de carreteras, y las calles en cuadrícula y las amplias avenidas de Sapporo deben mucho a sus recomendaciones.|Ancien commissaire à l'agriculture des États-Unis, Capron conseilla le Kaitakushi sur tout, du choix des cultures à la construction des routes, et les rues en damier et larges avenues de Sapporo doivent beaucoup à ses recommandations.|かつて米国農務局長を務めたケプロンは、作物の選定から道路整備まで開拓使に助言を与え、札幌の碁盤目状の街路と広い大通りは彼の提言によるところが大きい。",
  ),
  q(
    5,
    "UNESCO's Atlas of the World's Languages in Danger classifies the Ainu language as:|El Atlas de las Lenguas del Mundo en Peligro de la UNESCO clasifica la lengua ainu como:|L'Atlas des langues en danger dans le monde de l'UNESCO classe la langue aïnoue comme :|ユネスコの「危機に瀕する言語のアトラス」はアイヌ語をどう分類しているか?",
    [
      "Critically endangered|En peligro crítico|Gravement en danger|極めて深刻な危機に瀕した言語",
      "Vulnerable|Vulnerable|Vulnérable|脆弱な言語",
      "Not endangered|No amenazada|Non menacée|危機に瀕していない言語",
    ],
    0,
    "It is UNESCO's most severe category, one step from extinction, reflecting how few people today learned Ainu as a first language at home.|Es la categoría más severa de la UNESCO, a un paso de la extinción, y refleja lo pocas que son las personas que hoy aprendieron el ainu como primera lengua en casa.|C'est la catégorie la plus sévère de l'UNESCO, à un pas de l'extinction, reflétant le très petit nombre de personnes ayant aujourd'hui appris l'aïnou comme langue maternelle.|これはユネスコの分類でもっとも深刻な区分で、消滅の一歩手前を意味する。家庭で第一言語としてアイヌ語を身につけた人が今日いかに少ないかを反映している。",
  ),
  q(
    4,
    "The volcano beside Lake Tōya, which erupted in 2000 with no deaths thanks to early evacuation, sits within which national park?|El volcán junto al lago Tōya, que entró en erupción en 2000 sin víctimas mortales gracias a la evacuación temprana, ¿en qué parque nacional se encuentra?|Le volcan près du lac Tōya, entré en éruption en 2000 sans faire de victimes grâce à une évacuation précoce, se trouve dans quel parc national ?|2000年に噴火したが早期避難で死者を出さなかった洞爺湖畔の火山があるのはどの国立公園か?",
    [
      "Shikotsu-Tōya National Park|Parque Nacional Shikotsu-Tōya|Parc national de Shikotsu-Tōya|支笏洞爺国立公園",
      "Daisetsuzan National Park|Parque Nacional Daisetsuzan|Parc national de Daisetsuzan|大雪山国立公園",
      "Akan-Mashū National Park|Parque Nacional Akan-Mashū|Parc national d'Akan-Mashū|阿寒摩周国立公園",
    ],
    0,
    "The park takes its name from two of Hokkaidō's caldera lakes, Shikotsu and Tōya, both formed by volcanic collapse and both still ringed by active or dormant peaks.|El parque toma su nombre de dos de los lagos de caldera de Hokkaidō, Shikotsu y Tōya, ambos formados por colapso volcánico y todavía rodeados de picos activos o inactivos.|Le parc tire son nom de deux des lacs de caldeira d'Hokkaidō, Shikotsu et Tōya, tous deux formés par un effondrement volcanique et encore entourés de sommets actifs ou endormis.|この公園は北海道の2つのカルデラ湖、支笏湖と洞爺湖の名にちなむ。どちらも火山の陥没でできた湖で、いまも活火山・休火山に囲まれている。",
  ),
  q(
    4,
    "Which mountain, an almost symmetrical cone visible from the Niseko ski area, is nicknamed \"Ezo Fuji\" for its resemblance to Mount Fuji?|¿Qué montaña, un cono casi simétrico visible desde la zona de esquí de Niseko, se apoda «Ezo Fuji» por su parecido con el monte Fuji?|Quelle montagne, un cône presque symétrique visible depuis la station de ski de Niseko, est surnommée « Ezo Fuji » pour sa ressemblance avec le mont Fuji ?|ニセコのスキー場から見える、ほぼ左右対称の円錐形で富士山に似ていることから「蝦夷富士」と呼ばれる山は?",
    [
      "Mount Yōtei|Monte Yōtei|Mont Yōtei|羊蹄山",
      "Mount Tokachi|Monte Tokachi|Mont Tokachi|十勝岳",
      "Mount Rausu|Monte Rausu|Mont Rausu|羅臼岳",
    ],
    0,
    "The active stratovolcano rises alone from farmland southeast of Niseko with almost no foothills to interrupt its cone, which is why the comparison to Fuji stuck.|El estratovolcán activo se alza solitario entre campos de cultivo al sureste de Niseko, casi sin estribaciones que interrumpan su cono, razón por la que se popularizó la comparación con el Fuji.|Le stratovolcan actif s'élève seul au milieu des terres agricoles au sud-est de Niseko, presque sans contreforts pour interrompre son cône, ce qui explique la comparaison avec le Fuji.|活火山であるこの成層火山は、ニセコの南東の農地からほぼ独立峰のようにそびえ、裾野に遮るものがないため富士山になぞらえられる。",
  ),
  q(
    5,
    "The Ainu ceremony that sends a captive bear's spirit back to the world of the gods, seen as the most important Ainu ritual by early ethnographers, is called:|La ceremonia ainu que envía el espíritu de un oso cautivo de vuelta al mundo de los dioses, considerada el ritual ainu más importante por los primeros etnógrafos, se llama:|La cérémonie aïnoue qui renvoie l'esprit d'un ours captif dans le monde des dieux, considérée par les premiers ethnographes comme le rituel aïnou le plus important, s'appelle :|捕らえた熊の霊を神々の世界へ送り返す儀式で、初期の民族誌学者たちがアイヌ最大の儀礼とみなしたものは?",
    [
      "Iyomante|Iyomante|Iyomante|イヨマンテ",
      "Ikupasuy|Ikupasuy|Ikupasuy|イクパスイ",
      "Kamuy-nomi|Kamuy-nomi|Kamuy-nomi|カムイノミ",
    ],
    0,
    "In Ainu belief the bear was a kamuy, a god, temporarily wearing animal form to bring meat and fur as a gift; the ceremony was understood as sending that god home with thanks, not simply as a hunt.|En la creencia ainu, el oso era un kamuy, un dios, que vestía temporalmente forma animal para traer carne y piel como regalo; la ceremonia se entendía como el envío de ese dios a casa con agradecimiento, no como una simple cacería.|Dans la croyance aïnoue, l'ours était un kamuy, un dieu, revêtant temporairement une forme animale pour apporter viande et fourrure en cadeau ; la cérémonie était comprise comme un renvoi de ce dieu chez lui avec des remerciements, non comme une simple chasse.|アイヌの信仰では、熊はカムイ(神)が一時的に動物の姿を借り、肉と毛皮を土産に訪れたものとされた。この儀式は単なる狩りではなく、感謝とともにその神を送り返す行為として理解されていた。",
  ),
  q(
    6,
    "Traditional Ainu robes, woven from the inner bark of elm trees and decorated with bold appliqué and embroidery, are called:|Las túnicas tradicionales ainu, tejidas con la corteza interior de olmo y decoradas con vistosas aplicaciones y bordados, se llaman:|Les robes traditionnelles aïnoues, tissées à partir de l'écorce interne de l'orme et ornées d'appliqués et de broderies audacieux, s'appellent :|ニレの木の内皮から織り、大胆な切伏せと刺繍で飾られたアイヌの伝統衣装は?",
    [
      "Attus|Attus|Attus|アットゥシ",
      "Kimono|Kimono|Kimono|着物",
      "Hanbok|Hanbok|Hanbok|韓服",
    ],
    0,
    "Making the fibre alone took weeks of stripping, boiling and splitting elm bark before it could even be spun into thread, and the swirling patterns sewn onto the finished robe were believed to ward off illness.|Solo obtener la fibra llevaba semanas de pelar, hervir y separar la corteza de olmo antes de poder hilarla; los motivos en espiral cosidos en la túnica terminada se creía que protegían de las enfermedades.|Rien que pour obtenir la fibre, il fallait des semaines à peler, bouillir et fendre l'écorce d'orme avant même de pouvoir la filer ; les motifs en volutes cousus sur la robe terminée étaient censés protéger de la maladie.|繊維を得るだけでもニレの皮を剥ぎ、煮て、裂く作業に何週間もかかり、糸に紡いでようやく織れる。仕上がった衣に縫い付けられた渦巻き文様は、病を防ぐと信じられていた。",
  ),
  q(
    7,
    "In what year did Japan's Diet pass the Ainu Policy Promotion Act, the first Japanese law to use the words \"indigenous people\" (senjū minzoku) to describe the Ainu?|¿En qué año aprobó la Dieta de Japón la Ley de Promoción de Políticas Ainu, la primera ley japonesa en usar las palabras «pueblo indígena» (senjū minzoku) para describir a los ainu?|En quelle année la Diète japonaise adopta-t-elle la loi de promotion de la politique aïnoue, première loi japonaise à employer les mots « peuple autochtone » (senjū minzoku) pour désigner les Aïnous ?|アイヌを「先住民族」と明記した日本初の法律、アイヌ施策推進法が国会で成立したのは何年か?",
    [
      "2019|2019|2019|2019年",
      "1997|1997|1997|1997年",
      "2008|2008|2008|2008年",
    ],
    0,
    "The 2019 law replaced the 1997 Ainu Culture Promotion Act, which had funded language and culture programmes but stopped short of naming the Ainu as indigenous in law.|La ley de 2019 sustituyó a la Ley de Promoción de la Cultura Ainu de 1997, que había financiado programas de lengua y cultura pero no llegaba a reconocer legalmente a los ainu como indígenas.|La loi de 2019 remplaça la loi de 1997 sur la promotion de la culture aïnoue, qui avait financé des programmes de langue et de culture sans toutefois désigner légalement les Aïnous comme peuple autochtone.|2019年の法律は、言語や文化への助成は行いながらも法律上「先住民族」とは明記していなかった1997年のアイヌ文化振興法に代わるものだった。",
  ),
  q(
    9,
    "In 1997, a Sapporo District Court ruling on a dam built on Ainu land at Nibutani became Japan's first court decision to do what?|En 1997, una sentencia del Tribunal de Distrito de Sapporo sobre una presa construida en tierra ainu en Nibutani se convirtió en la primera resolución judicial de Japón en hacer, ¿qué?|En 1997, un jugement du tribunal de district de Sapporo sur un barrage construit en terre aïnoue à Nibutani devint la première décision de justice japonaise à faire quoi ?|1997年、アイヌの土地であった二風谷に建設されたダムをめぐる札幌地裁判決は、日本の裁判所として初めて何をしたか?",
    [
      "Recognise the Ainu in law as an indigenous people|Reconocer legalmente a los ainu como pueblo indígena|Reconnaître juridiquement les Aïnous comme peuple autochtone|アイヌを法的に先住民族と認めた",
      "Order the return of all Ainu land seized since 1869|Ordenar la devolución de todas las tierras ainu confiscadas desde 1869|Ordonner la restitution de toutes les terres aïnoues confisquées depuis 1869|1869年以降に奪われたアイヌの土地すべての返還を命じた",
      "Grant the Ainu language official status nationwide|Conceder a la lengua ainu estatus oficial en todo el país|Accorder à la langue aïnoue un statut officiel national|アイヌ語に全国的な公用語の地位を与えた",
    ],
    0,
    "The court found the dam's construction had violated Ainu cultural rights and, while stopping short of halting the already-finished dam, it was the first time a Japanese court had described the Ainu as indigenous — 22 years before the word entered national law.|El tribunal determinó que la construcción de la presa había violado los derechos culturales ainu y, aunque no llegó a detener la presa ya terminada, fue la primera vez que un tribunal japonés describió a los ainu como indígenas, 22 años antes de que la palabra entrara en la ley nacional.|Le tribunal jugea que la construction du barrage avait violé les droits culturels aïnous et, sans aller jusqu'à arrêter le barrage déjà achevé, ce fut la première fois qu'un tribunal japonais qualifiait les Aïnous d'autochtones — 22 ans avant que le mot n'entre dans la loi nationale.|裁判所はダム建設がアイヌの文化的権利を侵害したと認定した。すでに完成していたダムの差し止めまでは踏み込まなかったが、日本の裁判所がアイヌを先住民族と表現したのはこれが初めてで、その語が国の法律に入るのは22年後のことだった。",
  ),
  q(
    9,
    "Who, in 1994, became the first person of Ainu descent to be elected to Japan's National Diet?|¿Quién, en 1994, se convirtió en la primera persona de ascendencia ainu elegida para la Dieta Nacional de Japón?|Qui devint, en 1994, la première personne d'ascendance aïnoue élue à la Diète nationale du Japon ?|1994年、アイヌ民族出身者として初めて日本の国会議員に選ばれたのは誰か?",
    [
      "Kayano Shigeru|Kayano Shigeru|Kayano Shigeru|萱野茂",
      "Chiri Yukie|Chiri Yukie|Chiri Yukie|知里幸恵",
      "Nibutani Koichi|Nibutani Koichi|Nibutani Kōichi|二風谷幸一",
    ],
    0,
    "Kayano, from Nibutani, had already spent decades collecting Ainu oral epics and building the language school and museum that fed into the Nibutani court case, before serving briefly in the House of Councillors.|Kayano, de Nibutani, ya llevaba décadas recopilando epopeyas orales ainu y construyendo la escuela de lengua y el museo que alimentaron el caso judicial de Nibutani, antes de servir brevemente en la Cámara de Consejeros.|Kayano, originaire de Nibutani, avait déjà passé des décennies à recueillir des épopées orales aïnoues et à bâtir l'école de langue et le musée qui alimentèrent l'affaire judiciaire de Nibutani, avant de siéger brièvement à la Chambre des conseillers.|二風谷出身の萱野茂は、参議院議員を短期間務める前から、何十年もかけてアイヌの口承叙事詩を収集し、二風谷の裁判にもつながる語学教室と博物館を築いていた。",
  ),
  q(
    7,
    "In September 1954 a typhoon sank the railway ferry Tōya Maru just off Hakodate, in what is still counted among Japan's worst peacetime maritime disasters. Roughly how many people died?|En septiembre de 1954, un tifón hundió el ferry ferroviario Tōya Maru frente a Hakodate, en lo que aún se cuenta entre los peores desastres marítimos del Japón en tiempo de paz. ¿Aproximadamente cuántas personas murieron?|En septembre 1954, un typhon coula le ferry ferroviaire Tōya Maru au large de Hakodate, l'une des pires catastrophes maritimes du Japon en temps de paix. Combien de personnes moururent, environ ?|1954年9月、台風によって連絡船・洞爺丸が函館沖で沈没し、日本の平時としては最悪級の海難事故となった。犠牲者はおよそ何人か?",
    [
      "About 1,150|Unas 1.150|Environ 1 150|およそ1150人",
      "About 150|Unas 150|Environ 150|およそ150人",
      "About 4,500|Unas 4.500|Environ 4 500|およそ4500人",
    ],
    0,
    "The Tōya Maru was one of five ferries lost that night on the Aomori–Hakodate route as the same typhoon caught them at sea; the disaster is one of the reasons the Seikan Tunnel was later built to move the crossing underground.|El Tōya Maru fue uno de los cinco ferris perdidos esa noche en la ruta Aomori–Hakodate cuando el mismo tifón los sorprendió en el mar; el desastre es una de las razones por las que después se construyó el túnel de Seikan para llevar el cruce bajo tierra.|Le Tōya Maru fut l'un des cinq ferries perdus cette nuit-là sur la liaison Aomori–Hakodate, surpris en mer par le même typhon ; ce désastre est l'une des raisons pour lesquelles le tunnel de Seikan fut plus tard construit pour faire passer la traversée sous terre.|洞爺丸は、同じ台風に襲われたその夜、青森―函館航路で失われた5隻の連絡船のひとつだった。この事故は、のちに青函トンネルで海底に経路を移す動機のひとつになった。",
  ),
  q(
    9,
    "Roughly how long is the undersea Seikan Tunnel linking Honshu and Hokkaidō, which held the record as the world's longest rail tunnel for decades?|¿Cuánto mide aproximadamente el túnel submarino de Seikan, que une Honshu y Hokkaidō y ostentó durante décadas el récord de túnel ferroviario más largo del mundo?|Quelle est la longueur approximative du tunnel sous-marin de Seikan reliant Honshu et Hokkaidō, qui détint pendant des décennies le record du plus long tunnel ferroviaire du monde ?|本州と北海道を結び、数十年にわたり世界最長の鉄道トンネルだった青函トンネルの長さは、およそ何kmか?",
    [
      "About 54 km|Unos 54 km|Environ 54 km|約54km",
      "About 24 km|Unos 24 km|Environ 24 km|約24km",
      "About 84 km|Unos 84 km|Environ 84 km|約84km",
    ],
    0,
    "Roughly 23 km of the tunnel's length lies under the seabed itself, and it took a workforce battling flooding and rockfalls about 24 years from initial survey to opening in 1988.|Unos 23 km de la longitud del túnel discurren bajo el propio lecho marino, y a una fuerza de trabajo que combatió inundaciones y desprendimientos le llevó unos 24 años, desde el estudio inicial hasta la apertura en 1988.|Environ 23 km de la longueur du tunnel passent sous le fond marin lui-même, et il fallut environ 24 ans, entre l'étude initiale et l'ouverture en 1988, à une main-d'œuvre luttant contre les inondations et les éboulements.|トンネルの全長のうちおよそ23kmは海底そのものの下を通る。浸水や落盤と闘いながら、最初の調査から1988年の開通まで およそ24年を要した。",
  ),
  q(
    9,
    "In 1987, Japanese National Railways was broken up and privatised into several regional companies. Which one took over rail service across Hokkaidō?|En 1987, los Ferrocarriles Nacionales de Japón se dividieron y privatizaron en varias empresas regionales. ¿Cuál se hizo cargo del servicio ferroviario en Hokkaidō?|En 1987, les Chemins de fer nationaux japonais furent scindés et privatisés en plusieurs compagnies régionales. Laquelle reprit le service ferroviaire à Hokkaidō ?|1987年、国鉄が分割民営化されて複数の地域会社になった。北海道の鉄道を引き継いだのは?",
    [
      "JR Hokkaidō|JR Hokkaidō|JR Hokkaidō|JR北海道",
      "JR East|JR East|JR East|JR東日本",
      "JR Central|JR Central|JR Central|JR東海",
    ],
    0,
    "JR Hokkaidō inherited a network built for a much larger population and heavier freight traffic, and it has struggled financially almost from the start, which is part of why so many of its lines have since closed.|JR Hokkaidō heredó una red construida para una población mucho mayor y un tráfico de carga más pesado, y ha tenido dificultades financieras casi desde el principio, lo que en parte explica por qué han cerrado tantas de sus líneas desde entonces.|JR Hokkaidō hérita d'un réseau construit pour une population bien plus nombreuse et un trafic de fret plus lourd, et connaît des difficultés financières presque dès le départ, ce qui explique en partie pourquoi tant de ses lignes ont fermé depuis.|JR北海道は、いまよりずっと多い人口と重い貨物輸送を前提に敷かれた路線網を引き継いだが、発足当初からほぼ一貫して経営に苦しんでおり、これが多くの路線がその後廃止された理由の一端になっている。",
  ),
  q(
    9,
    "In what year did Asahikawa record what was then the lowest officially measured temperature in Japanese history?|¿En qué año registró Asahikawa la que fue entonces la temperatura más baja medida oficialmente en la historia de Japón?|En quelle année Asahikawa enregistra-t-elle ce qui fut alors la température la plus basse jamais mesurée officiellement au Japon ?|旭川がかつての日本の観測史上最低気温を記録したのは何年か?",
    [
      "1902|1902|1902|1902年",
      "1954|1954|1954|1954年",
      "1977|1977|1977|1977年",
    ],
    0,
    "The reading, −41°C, was taken in January 1902 and stood as Japan's coldest official temperature for over a century before a 2020s station elsewhere edged past it.|La lectura, −41 °C, se tomó en enero de 1902 y fue la temperatura oficial más fría de Japón durante más de un siglo, antes de que otra estación la superara en la década de 2020.|Le relevé, −41 °C, fut pris en janvier 1902 et resta la température officielle la plus froide du Japon pendant plus d'un siècle, avant qu'une autre station ne la dépasse dans les années 2020.|1902年1月、氷点下41度が観測され、これは1世紀以上にわたり日本の観測史上最低気温であり続けた(2020年代に他の観測点がこれをわずかに下回るまで)。",
  ),
  q(
    7,
    "The 1968 Tokachi-oki earthquake, magnitude 8.2, struck off which part of Hokkaidō's coast?|El terremoto de Tokachi-oki de 1968, de magnitud 8,2, sacudió frente a qué parte de la costa de Hokkaidō?|Le séisme de Tokachi-oki de 1968, de magnitude 8,2, frappa au large de quelle partie de la côte de Hokkaidō ?|1968年、マグニチュード8.2を記録した十勝沖地震が起きたのは北海道のどの海域か?",
    [
      "The Pacific coast, off Tokachi|La costa del Pacífico, frente a Tokachi|La côte pacifique, au large de Tokachi|十勝沖の太平洋",
      "The Sea of Japan, off Rumoi|El mar de Japón, frente a Rumoi|La mer du Japon, au large de Rumoi|留萌沖の日本海",
      "The Sea of Okhotsk, off Abashiri|El mar de Ojotsk, frente a Abashiri|La mer d'Okhotsk, au large d'Abashiri|網走沖のオホーツク海",
    ],
    0,
    "The quake and its tsunami killed dozens of people across Hokkaidō and Aomori and prompted major revisions to Japan's building codes for reinforced-concrete structures.|El terremoto y su tsunami mataron a decenas de personas en Hokkaidō y Aomori, y motivaron importantes revisiones del código de construcción japonés para estructuras de hormigón armado.|Le séisme et son tsunami tuèrent des dizaines de personnes à Hokkaidō et Aomori, et entraînèrent d'importantes révisions du code de la construction japonais pour les structures en béton armé.|この地震と津波は北海道と青森で数十人の命を奪い、日本の鉄筋コンクリート構造物の建築基準の大幅な見直しにつながった。",
  ),
  q(
    8,
    "Roughly what magnitude was the 1993 earthquake whose tsunami reached the island of Okushiri within minutes?|¿De qué magnitud fue aproximadamente el terremoto de 1993 cuyo tsunami llegó a la isla de Okushiri en cuestión de minutos?|Quelle magnitude avait environ le séisme de 1993 dont le tsunami atteignit l'île d'Okushiri en quelques minutes ?|1993年、津波がわずか数分で奥尻島に達した地震の規模は、マグニチュードにしておよそいくつだったか?",
    [
      "About 7.8|Unos 7,8|Environ 7,8|およそ7.8",
      "About 5.5|Unos 5,5|Environ 5,5|およそ5.5",
      "About 9.0|Unos 9,0|Environ 9,0|およそ9.0",
    ],
    0,
    "The quake's effects reached well beyond Hokkaidō, causing damage as far as the coast of the Korean Peninsula, and it remains one of the strongest to have struck Japan's coastal waters in the postwar period.|Los efectos del terremoto se sintieron mucho más allá de Hokkaidō, causando daños hasta la costa de la península de Corea, y sigue siendo uno de los más fuertes que han azotado las aguas costeras de Japón en la posguerra.|Les effets du séisme se firent sentir bien au-delà d'Hokkaidō, causant des dégâts jusqu'à la côte de la péninsule coréenne, et il reste l'un des plus forts à avoir frappé les eaux côtières du Japon depuis l'après-guerre.|この地震の影響は北海道の外にまで及び、朝鮮半島の沿岸にも被害をもたらした。戦後に日本近海を襲った地震としては屈指の規模である。",
  ),

  // ----------------------------------------------------------------------
  // 食・野生生物・地理(難易度1〜6)
  // ----------------------------------------------------------------------
  q(
    1,
    "Which shellfish, farmed extensively along Hokkaidō's Okhotsk coast, is a major seafood export of the island?|¿Qué molusco, criado extensamente en la costa de Ojotsk de Hokkaidō, es una importante exportación marisquera de la isla?|Quel coquillage, élevé abondamment le long de la côte d'Okhotsk de Hokkaidō, est une exportation majeure de fruits de mer de l'île ?|オホーツク海沿岸で盛んに養殖され、島の主要な水産輸出品となっている貝は?",
    [
      "The scallop|La vieira|La coquille Saint-Jacques|ホタテ",
      "The oyster|La ostra|L'huître|カキ",
      "The abalone|El abulón|L'ormeau|アワビ",
    ],
    0,
    "Scallop spat is scattered on the seabed and left to grow for two or three years before dredging, a method that lets Hokkaidō farm the shellfish over huge stretches of open coastline rather than in enclosed pens.|Las larvas de vieira se esparcen en el fondo marino y se dejan crecer durante dos o tres años antes de dragarlas, un método que permite a Hokkaidō criar el molusco en grandes extensiones de costa abierta en vez de en corrales cerrados.|Le naissain de coquilles Saint-Jacques est dispersé sur le fond marin et laissé à grandir deux ou trois ans avant le dragage, une méthode qui permet à Hokkaidō d'élever ce coquillage sur de vastes étendues de côte ouverte plutôt qu'en enclos.|稚貝を海底にまいて2〜3年育ててから桁網で獲る「地まき式」により、囲いを使わず広大な海岸線でホタテを育てられる。",
  ),
  q(
    2,
    "Which sea urchin product, prized as a summer delicacy, is a major Hokkaidō specialty served raw over rice or on its own?|¿Qué producto del erizo de mar, apreciado como delicia de verano, es una especialidad importante de Hokkaidō, servido crudo sobre arroz o solo?|Quel produit d'oursin, prisé comme mets d'été, est une spécialité importante de Hokkaidō, servi cru sur du riz ou seul ?|夏の珍味として珍重され、生のままご飯にのせたりそのまま食べたりする北海道名物の食材は?",
    [
      "Uni (sea urchin roe)|Uni (hueva de erizo de mar)|Uni (gonades d'oursin)|うに",
      "Ikura (salmon roe)|Ikura (hueva de salmón)|Ikura (œufs de saumon)|いくら",
      "Shirasu (whitebait)|Shirasu (chanquete)|Shirasu (blanchaille)|しらす",
    ],
    0,
    "What is eaten is not eggs but the urchin's gonads, harvested by hand from cold, kelp-rich waters along Hokkaidō's coasts, which is part of why fresh uni commands such a high price.|Lo que se come no son huevas sino las gónadas del erizo, recolectadas a mano en las aguas frías y ricas en algas de las costas de Hokkaidō, lo que en parte explica el alto precio del uni fresco.|Ce que l'on mange n'est pas des œufs mais les gonades de l'oursin, récoltées à la main dans les eaux froides et riches en algues des côtes d'Hokkaidō, ce qui explique en partie le prix élevé de l'uni frais.|食べているのは卵ではなく生殖巣で、北海道沿岸の冷たい昆布豊かな海で手作業で獲られる。これが新鮮なうにの値が高い理由の一つでもある。",
  ),
  q(
    3,
    "What overwhelming share of Japan's raw kombu (kelp) does Hokkaidō supply?|¿Qué proporción abrumadora del kombu (alga) crudo de Japón suministra Hokkaidō?|Quelle part écrasante du kombu (algue) brut du Japon Hokkaidō fournit-elle ?|日本の生の昆布のうち、北海道が占める割合はどれくらいか?",
    [
      "Well over 90%|Más del 90%|Bien plus de 90 %|9割を大きく超える",
      "About a third|Alrededor de un tercio|Environ un tiers|およそ3分の1",
      "About 10%|Alrededor del 10%|Environ 10 %|およそ1割",
    ],
    0,
    "Cold, nutrient-rich currents along Hokkaidō's coasts suit kelp so well that the plant barely grows commercially anywhere else in Japan, and different stretches of coast are prized for different grades and flavours.|Las corrientes frías y ricas en nutrientes de las costas de Hokkaidō son tan propicias para el alga que apenas crece comercialmente en ningún otro lugar de Japón, y distintos tramos de costa se aprecian por diferentes calidades y sabores.|Les courants froids et riches en nutriments le long des côtes d'Hokkaidō conviennent si bien au kombu qu'il ne pousse guère commercialement ailleurs au Japon, et différents tronçons de côte sont prisés pour leurs qualités et saveurs propres.|冷たく栄養豊かな海流が昆布の生育に適しているため、商業栽培は日本の他地域ではほとんど行われていない。海岸ごとに等級や風味の異なる昆布が珍重される。",
  ),
  q(
    5,
    "Which large bird of prey, one of the world's heaviest eagles and a vulnerable species, winters in large numbers along Hokkaidō's northeastern coast?|¿Qué gran ave rapaz, una de las águilas más pesadas del mundo y especie vulnerable, inverna en gran número en la costa noreste de Hokkaidō?|Quel grand rapace, l'un des aigles les plus lourds au monde et une espèce vulnérable, hiverne en grand nombre sur la côte nord-est de Hokkaidō ?|世界最大級の重さを持つ絶滅危惧種のワシで、北海道北東部の海岸に多数飛来して越冬するのは?",
    [
      "The Steller's sea eagle|El pigargo de Steller|Le pygargue de Steller|オオワシ",
      "The golden eagle|El águila real|L'aigle royal|イヌワシ",
      "The bald eagle|El águila calva|Le pygargue à tête blanche|ハクトウワシ",
    ],
    0,
    "Most of the world's Steller's sea eagles breed in far eastern Russia and fly south each winter to feed on fish and sea-ice-stranded prey along the Sea of Okhotsk and Nemuro Strait coasts.|La mayoría de los pigargos de Steller del mundo se reproducen en el extremo oriente de Rusia y vuelan al sur cada invierno para alimentarse de peces y presas varadas en el hielo marino a lo largo de las costas del mar de Ojotsk y el estrecho de Nemuro.|La plupart des pygargues de Steller au monde se reproduisent en Extrême-Orient russe et migrent vers le sud chaque hiver pour se nourrir de poissons et de proies échouées sur la banquise le long des côtes de la mer d'Okhotsk et du détroit de Nemuro.|世界のオオワシの大半はロシア極東で繁殖し、毎冬南下してオホーツク海や根室海峡沿岸の流氷や魚を頼りに越冬する。",
  ),
  q(
    4,
    "Compared with the rest of Japan, Hokkaidō's climate is generally classified as:|En comparación con el resto de Japón, ¿cómo se clasifica en general el clima de Hokkaidō?|Comparé au reste du Japon, le climat de Hokkaidō est généralement classé comme :|日本の他地域と比べて、北海道の気候は一般にどう分類されるか?",
    [
      "Humid continental, with cold, snowy winters|Continental húmedo, con inviernos fríos y nevados|Continental humide, avec des hivers froids et neigeux|冷涼で雪の多い、湿潤大陸性気候",
      "Subtropical, with hot, humid summers|Subtropical, con veranos calurosos y húmedos|Subtropical, avec des étés chauds et humides|高温多湿な亜熱帯気候",
      "Arid, with very little precipitation year-round|Árido, con muy poca precipitación durante todo el año|Aride, avec très peu de précipitations toute l'année|年間を通じて降水量の少ない乾燥気候",
    ],
    0,
    "Most of Japan lies in a humid subtropical zone, but Hokkaidō's latitude and the cold currents around it give it a humid continental climate closer to that of parts of northern Europe or Russia's Far East, with heavy snowfall rather than the summer humidity found further south.|La mayor parte de Japón se encuentra en una zona subtropical húmeda, pero la latitud de Hokkaidō y las corrientes frías que la rodean le dan un clima continental húmedo más cercano al de partes del norte de Europa o el Lejano Oriente ruso, con nevadas intensas en vez de la humedad estival de más al sur.|La majeure partie du Japon se trouve dans une zone subtropicale humide, mais la latitude de Hokkaidō et les courants froids qui l'entourent lui donnent un climat continental humide plus proche de celui de certaines régions d'Europe du Nord ou d'Extrême-Orient russe, avec de fortes chutes de neige plutôt que l'humidité estivale du reste du pays.|日本の大部分は湿潤亜熱帯気候だが、北海道は緯度と周囲の寒流の影響で、北欧やロシア極東の一部に近い湿潤大陸性気候になる。南のような夏の蒸し暑さの代わりに、大量の降雪が特徴である。",
  ),
  q(
    6,
    "Hokkaidō's Cape Erimo, at the tip of the Hidaka coast, is notorious among sailors and residents for near-constant:|El cabo Erimo, en la punta de la costa de Hidaka en Hokkaidō, es conocido entre marineros y residentes por su casi constante:|Le cap Erimo, à la pointe de la côte de Hidaka à Hokkaidō, est réputé chez les marins et les habitants pour être presque constamment :|北海道・日高海岸の先端にある襟裳岬が、船乗りや住民のあいだで年間を通じてほぼ絶えないことで知られているものは?",
    [
      "Strong wind|Viento fuerte|Vent fort|強風",
      "Volcanic ash fall|Caída de ceniza volcánica|Chute de cendres volcaniques|降灰",
      "Thunderstorms|Tormentas eléctricas|Orages|雷雨",
    ],
    0,
    "Two ocean currents collide off the cape and funnel wind around its exposed headland, giving it one of the highest average wind speeds of any inhabited point in Japan; a local song even declares \"there is nothing at Cape Erimo\", meaning nothing to block the gales.|Dos corrientes oceánicas chocan frente al cabo y canalizan el viento en torno a su promontorio expuesto, dándole una de las velocidades medias de viento más altas de cualquier punto habitado de Japón; una canción local llega a decir que «en el cabo Erimo no hay nada», es decir, nada que frene las ráfagas.|Deux courants océaniques se heurtent au large du cap et canalisent le vent autour de son promontoire exposé, lui donnant l'une des vitesses de vent moyennes les plus élevées de tout point habité du Japon ; une chanson locale va jusqu'à dire qu'« il n'y a rien au cap Erimo », c'est-à-dire rien pour arrêter les bourrasques.|岬の沖で二つの海流がぶつかり、突き出た岬の地形が風を集めるため、日本の有人地点でも屈指の平均風速を記録する。地元の歌に「襟裳の春は何もない」とあるのは、突風を遮るものが何もないという意味でもある。",
  ),
  q(
    2,
    "Which of the following is Hokkaidō's official prefectural flower, a wild rose that grows along sandy beaches?|¿Cuál de las siguientes es la flor oficial de la prefectura de Hokkaidō, una rosa silvestre que crece en playas arenosas?|Laquelle des suivantes est la fleur officielle de la préfecture de Hokkaidō, une rose sauvage qui pousse sur les plages de sable ?|北海道の道花に指定されている、砂浜に自生する野バラは?",
    [
      "Hamanasu (Japanese rose)|Hamanasu (rosa japonesa)|Hamanasu (rose du Japon)|ハマナス",
      "Sakura (cherry blossom)|Sakura (flor de cerezo)|Sakura (fleur de cerisier)|サクラ",
      "Ajisai (hydrangea)|Ajisai (hortensia)|Ajisai (hortensia)|アジサイ",
    ],
    0,
    "Its bright pink flowers bloom along dunes and coastal grassland through the short Hokkaidō summer, and its round red hips are sometimes made into jam or tea.|Sus flores de un rosa intenso brotan en dunas y pastizales costeros durante el corto verano de Hokkaidō, y sus frutos rojos y redondos a veces se usan para mermelada o té.|Ses fleurs d'un rose vif s'épanouissent sur les dunes et les prairies côtières pendant le court été d'Hokkaidō, et ses fruits rouges et ronds sont parfois transformés en confiture ou en tisane.|鮮やかな桃色の花は、短い北海道の夏のあいだ砂丘や海岸の草地に咲く。丸い赤い実はジャムや茶に加工されることもある。",
  ),
  q(
    4,
    "Which Hokkaidō dairy product, alongside milk and cheese, does the island produce a large share of for the rest of Japan?|Además de la leche y el queso, ¿de qué producto lácteo de Hokkaidō abastece la isla a gran parte del resto de Japón?|En plus du lait et du fromage, de quel produit laitier d'Hokkaidō l'île fournit-elle une grande part au reste du Japon ?|牛乳やチーズと並んで、北海道が日本の他地域向けに多くを生産している乳製品は?",
    [
      "Butter|Mantequilla|Beurre|バター",
      "Yogurt only for local sale|Yogur solo para venta local|Yaourt uniquement pour la vente locale|地元専用のヨーグルト",
      "Condensed milk exclusively for export|Leche condensada exclusivamente para exportación|Lait concentré exclusivement pour l'exportation|輸出専用の練乳",
    ],
    0,
    "Because fresh milk is costly to ship long distances, a large share of Hokkaidō's output is processed locally into butter and other shelf-stable dairy goods before being sent to the rest of the country.|Como el transporte de leche fresca a largas distancias es costoso, buena parte de la producción de Hokkaidō se procesa localmente en mantequilla y otros productos lácteos de larga conservación antes de enviarse al resto del país.|Le lait frais étant coûteux à transporter sur de longues distances, une grande part de la production d'Hokkaidō est transformée localement en beurre et autres produits laitiers de longue conservation avant d'être expédiée dans le reste du pays.|生乳は遠距離輸送のコストが高いため、北海道で生産される乳の多くは現地でバターなど保存の利く乳製品に加工されてから全国へ送られる。",
  ),

  // ----------------------------------------------------------------------
  // 祭り・火山・鉄道史・都市(難易度2〜8)
  // ----------------------------------------------------------------------
  q(
    3,
    "Sapporo's snow festival each February began as a small event organised by whom in 1950?|El festival de la nieve de Sapporo, cada febrero, comenzó en 1950 como un pequeño evento organizado por, ¿quién?|Le festival de la neige de Sapporo, chaque février, débuta en 1950 comme un petit événement organisé par qui ?|毎年2月に開かれる札幌雪まつりは、1950年、誰が企画した小さな催しとして始まったか?",
    [
      "Local high school students|Estudiantes de secundaria locales|Des lycéens locaux|地元の高校生たち",
      "The Self-Defense Forces|Las Fuerzas de Autodefensa|Les Forces d'autodéfense|自衛隊",
      "A department store chain|Una cadena de grandes almacenes|Une chaîne de grands magasins|百貨店チェーン",
    ],
    0,
    "Students built six snow statues in Ōdōri Park that first year; today the festival draws over two million visitors and includes massive sculptures the Self-Defense Forces have helped build since the 1950s.|Los estudiantes construyeron seis estatuas de nieve en el parque Ōdōri ese primer año; hoy el festival atrae a más de dos millones de visitantes e incluye enormes esculturas que las Fuerzas de Autodefensa ayudan a construir desde los años 50.|Les élèves construisirent six statues de neige dans le parc Ōdōri cette première année ; aujourd'hui le festival attire plus de deux millions de visiteurs et comprend d'immenses sculptures que les Forces d'autodéfense aident à bâtir depuis les années 1950.|最初の年、学生たちは大通公園に6体の雪像を作った。今では来場者200万人を超える祭りとなり、1950年代から自衛隊も巨大な雪像づくりに協力している。",
  ),
  q(
    5,
    "Which annual June festival in Sapporo combines a Kōchi Prefecture dance tradition with the sound of naruko wooden clappers, and has since spread to cities across Japan?|¿Qué festival anual de junio en Sapporo combina una tradición de danza de la prefectura de Kōchi con el sonido de las castañuelas de madera naruko, y desde entonces se ha extendido a ciudades de todo Japón?|Quel festival annuel de juin à Sapporo combine une tradition de danse de la préfecture de Kōchi avec le son des claquettes en bois naruko, et s'est depuis répandu dans des villes à travers le Japon ?|高知県の踊りの伝統と鳴子の音を組み合わせ、その後日本各地の都市に広まった、毎年6月に札幌で開かれる祭りは?",
    [
      "The YOSAKOI Sōran Festival|El festival YOSAKOI Sōran|Le festival YOSAKOI Sōran|YOSAKOIソーラン祭り",
      "The Nebuta Festival|El festival Nebuta|Le festival Nebuta|ねぶた祭り",
      "The Gion Festival|El festival Gion|Le festival Gion|祇園祭",
    ],
    0,
    "A Hokkaidō university student started the festival in 1992 after seeing Kōchi's Yosakoi dancers, grafting the choreography onto the tune of a Hokkaidō fishing work song, Sōran Bushi.|Un estudiante universitario de Hokkaidō fundó el festival en 1992 tras ver a los bailarines yosakoi de Kōchi, injertando la coreografía sobre la melodía de una canción de trabajo pesquero de Hokkaidō, el Sōran Bushi.|Un étudiant universitaire d'Hokkaidō créa le festival en 1992 après avoir vu les danseurs yosakoi de Kōchi, greffant la chorégraphie sur l'air d'un chant de travail des pêcheurs d'Hokkaidō, le Sōran Bushi.|北海道の大学生が1992年、高知のよさこい踊りに感銘を受けて始めた祭りで、振り付けを北海道の漁師の労働歌「ソーラン節」の曲に重ねている。",
  ),
  q(
    6,
    "The volcanic dome Shōwa-shinzan, which rose suddenly from a wheat field near Lake Tōya during 1943–45, was documented day by day by a local:|La cúpula volcánica Shōwa-shinzan, que surgió de repente de un campo de trigo cerca del lago Tōya entre 1943 y 1945, fue documentada día a día por un(a):|Le dôme volcanique Shōwa-shinzan, qui surgit soudainement d'un champ de blé près du lac Tōya entre 1943 et 1945, fut documenté jour après jour par un(e) :|1943〜45年、洞爺湖近くの麦畑から突如隆起した昭和新山を、日々記録し続けたのは地元の何をしていた人物か?",
    [
      "Postmaster|Jefe de correos|Maître de poste|郵便局長",
      "Schoolteacher|Maestro de escuela|Instituteur|小学校教員",
      "Fishing boat captain|Capitán de barco pesquero|Capitaine de bateau de pêche|漁船の船長",
    ],
    0,
    "Mimatsu Masao sketched the dome's growth from his post office window nearly every day for two years, producing what volcanologists now call the Mimatsu diagram, still cited internationally as a model of amateur scientific observation.|Mimatsu Masao dibujó el crecimiento de la cúpula desde la ventana de su oficina de correos casi a diario durante dos años, produciendo lo que los vulcanólogos llaman hoy el diagrama de Mimatsu, todavía citado internacionalmente como modelo de observación científica amateur.|Mimatsu Masao dessina la croissance du dôme depuis la fenêtre de son bureau de poste presque chaque jour pendant deux ans, produisant ce que les volcanologues appellent aujourd'hui le diagramme de Mimatsu, encore cité internationalement comme modèle d'observation scientifique amateur.|松前(三松)正夫は郵便局の窓から、2年近くほぼ毎日この隆起の様子を描き続けた。その記録は「ミマツダイヤグラム」として今も国際的にアマチュア観測の模範例として引用されている。",
  ),
  q(
    2,
    "Which Hokkaidō city's night view, seen from a mountain overlooking the narrow neck of land between its two harbours, is regularly ranked alongside Nagasaki and Kobe among Japan's best?|¿La vista nocturna de qué ciudad de Hokkaidō, contemplada desde una montaña que domina el estrecho istmo entre sus dos puertos, se cuenta habitualmente junto a Nagasaki y Kobe entre las mejores de Japón?|La vue nocturne de quelle ville d'Hokkaidō, contemplée depuis une montagne dominant l'étroite langue de terre entre ses deux ports, figure régulièrement aux côtés de Nagasaki et Kobe parmi les plus belles du Japon ?|二つの港に挟まれた細い陸地を見下ろす山からの夜景が、長崎・神戸と並んで日本屈指とされることの多い北海道の都市は?",
    [
      "Hakodate|Hakodate|Hakodate|函館",
      "Nemuro|Nemuro|Nemuro|根室",
      "Rumoi|Rumoi|Rumoi|留萌",
    ],
    0,
    "The view from Mount Hakodate looks down on a narrow strip of reclaimed and natural land linking the Tsugaru Strait side of the city to Hakodate Bay, with lights tracing the hourglass shape below; a ropeway carries most visitors to the summit in under ten minutes.|La vista desde el monte Hakodate contempla una estrecha franja de tierra ganada y natural que une el lado del estrecho de Tsugaru de la ciudad con la bahía de Hakodate, con las luces trazando la forma de reloj de arena abajo; un teleférico lleva a la mayoría de los visitantes a la cima en menos de diez minutos.|La vue depuis le mont Hakodate surplombe une étroite bande de terre, gagnée sur la mer et naturelle, reliant le côté détroit de Tsugaru de la ville à la baie de Hakodate, les lumières dessinant la forme de sablier en contrebas ; un téléphérique mène la plupart des visiteurs au sommet en moins de dix minutes.|函館山からの夜景は、津軽海峡側と函館湾側を結ぶ細い陸地(埋立地と自然の地形からなる)を見下ろす。灯りが砂時計のような形を描き出す。ロープウェイでほとんどの来訪者が10分足らずで山頂まで登る。",
  ),
  q(
    3,
    "Besides its canal and old warehouses, Otaru became known nationally for producing which two handcrafted goods?|Además de su canal y sus antiguos almacenes, ¿por qué dos productos artesanales se hizo conocida Otaru a nivel nacional?|Outre son canal et ses anciens entrepôts, pour quels deux produits artisanaux Otaru devint-elle connue à l'échelle nationale ?|運河と旧倉庫群のほかに、小樽が全国的に知られるようになった二つの手工芸品は?",
    [
      "Glassware and music boxes|Cristalería y cajas de música|Verrerie et boîtes à musique|ガラス工芸とオルゴール",
      "Lacquerware and folding fans|Laca y abanicos plegables|Laque et éventails|漆器と扇子",
      "Pottery and paper lanterns|Cerámica y faroles de papel|Poterie et lanternes en papier|陶器と提灯",
    ],
    0,
    "Glass blowing took root here originally to make floats for herring nets and oil lamps for fishing boats, and workshops later turned the same skills toward tableware and ornaments sold to visitors.|El soplado de vidrio arraigó aquí originalmente para hacer flotadores de redes de arenque y lámparas de aceite para barcos de pesca, y más tarde los talleres orientaron las mismas técnicas hacia vajillas y adornos vendidos a los visitantes.|Le soufflage du verre s'enracina ici à l'origine pour fabriquer des flotteurs de filets à hareng et des lampes à huile pour bateaux de pêche, et les ateliers tournèrent plus tard le même savoir-faire vers la vaisselle et les objets vendus aux visiteurs.|ガラス吹きは元々、鰊網の浮き玉や漁船用のランプを作るためにこの地に根付いた。のちに工房は同じ技術を、旅行者向けの食器や装飾品づくりへと向けた。",
  ),
  q(
    7,
    "Which mountain range, running down Hokkaidō's centre, contains the island's highest peak and Japan's largest national park?|¿Qué cordillera, que recorre el centro de Hokkaidō, contiene el pico más alto de la isla y el mayor parque nacional de Japón?|Quelle chaîne de montagnes, traversant le centre de Hokkaidō, contient le point culminant de l'île et le plus grand parc national du Japon ?|北海道中央部を貫き、島の最高峰と日本最大の国立公園を含む山地は?",
    [
      "The Daisetsuzan range|La cordillera de Daisetsuzan|La chaîne du Daisetsuzan|大雪山系",
      "The Hidaka range|La cordillera de Hidaka|La chaîne de Hidaka|日高山脈",
      "The Kitami range|La cordillera de Kitami|La chaîne de Kitami|北見山地",
    ],
    0,
    "Mount Asahi, the range's highest point at 2,291 metres, is also Hokkaidō's tallest mountain, and the surrounding national park is large enough that some of its interior is a two-day hike from the nearest road.|El monte Asahi, el punto más alto de la cordillera con 2.291 metros, es también la montaña más alta de Hokkaidō, y el parque nacional circundante es tan extenso que parte de su interior está a dos días de caminata de la carretera más cercana.|Le mont Asahi, point culminant de la chaîne à 2 291 mètres, est aussi la plus haute montagne d'Hokkaidō, et le parc national environnant est si vaste que certaines de ses parties intérieures sont à deux jours de marche de la route la plus proche.|大雪山系の最高点である旭岳(標高2291m)は北海道の最高峰でもある。周囲の国立公園はきわめて広く、内部の一部は最寄りの道路から徒歩2日かかる場所もある。",
  ),
  q(
    8,
    "In what year was Shiretoko, the peninsula in eastern Hokkaidō, registered as a UNESCO World Heritage Site for its unbroken food chain from sea to land?|¿En qué año se inscribió Shiretoko, la península del este de Hokkaidō, como Patrimonio de la Humanidad de la UNESCO por su cadena alimentaria ininterrumpida del mar a la tierra?|En quelle année Shiretoko, la péninsule de l'est de Hokkaidō, fut-elle inscrite au patrimoine mondial de l'UNESCO pour sa chaîne alimentaire ininterrompue de la mer à la terre ?|海から陸まで途切れない食物連鎖を理由に、道東の知床半島がユネスコ世界遺産に登録されたのは何年か?",
    [
      "2005|2005|2005|2005年",
      "1993|1993|1993|1993年",
      "2014|2014|2014|2014年",
    ],
    0,
    "The listing specifically credited the interaction between the marine ecosystem, built on seasonal sea ice, and the land animals that depend on the fish and other life the ice supports.|La inscripción reconoció específicamente la interacción entre el ecosistema marino, sustentado en el hielo marino estacional, y los animales terrestres que dependen de los peces y demás vida que ese hielo sostiene.|L'inscription reconnut spécifiquement l'interaction entre l'écosystème marin, fondé sur la banquise saisonnière, et les animaux terrestres qui dépendent des poissons et autres formes de vie que cette glace soutient.|登録の理由として特に評価されたのは、季節ごとの海氷を基盤とする海の生態系と、その氷が支える魚などの生き物に依存する陸の動物との結びつきだった。",
  ),

  // ----------------------------------------------------------------------
  // スポーツ・現代の産業・鉄道の歴史(難易度2〜9)
  // ----------------------------------------------------------------------
  q(
    3,
    "Which winter sport, involving sliding stones across ice toward a target, has a Hokkaidō city, Kitami, as one of Japan's strongest training bases?|¿Qué deporte de invierno, que consiste en deslizar piedras sobre el hielo hacia un objetivo, tiene en una ciudad de Hokkaidō, Kitami, una de las bases de entrenamiento más fuertes de Japón?|Quel sport d'hiver, consistant à faire glisser des pierres sur la glace vers une cible, a dans une ville de Hokkaidō, Kitami, l'une des plus solides bases d'entraînement du Japon ?|氷の上で石を的に向かって滑らせる冬季競技で、北海道の北見市が日本有数の強豪拠点になっているものは?",
    [
      "Curling|Curling|Le curling|カーリング",
      "Luge|Luge|La luge|リュージュ",
      "Ice hockey|Hockey sobre hielo|Le hockey sur glace|アイスホッケー",
    ],
    0,
    "Teams based in Kitami have repeatedly represented Japan at the Winter Olympics, and the city's dedicated curling hall trains athletes on ice built to the exact specifications used in international competition.|Los equipos con sede en Kitami han representado repetidamente a Japón en los Juegos Olímpicos de Invierno, y la sala de curling dedicada de la ciudad entrena a atletas en hielo construido según las especificaciones exactas usadas en competición internacional.|Des équipes basées à Kitami ont représenté à plusieurs reprises le Japon aux Jeux olympiques d'hiver, et la salle de curling dédiée de la ville entraîne des athlètes sur une glace construite selon les spécifications exactes utilisées en compétition internationale.|北見市を拠点とするチームは何度も冬季オリンピックで日本代表を務めてきた。市の専用カーリングホールは、国際大会と同じ規格で作られた氷で選手を鍛えている。",
  ),
  q(
    4,
    "Which professional baseball team relocated its home stadium from Sapporo to a new domed ballpark in the neighbouring city of Kitahiroshima in 2023?|¿Qué equipo profesional de béisbol trasladó su estadio de Sapporo a un nuevo estadio con cúpula en la vecina ciudad de Kitahiroshima en 2023?|Quelle équipe professionnelle de baseball a déplacé son stade de Sapporo vers un nouveau stade à dôme dans la ville voisine de Kitahiroshima en 2023 ?|2023年、本拠地を札幌から隣接する北広島市の新しいドーム球場へ移した野球のプロ球団は?",
    [
      "The Hokkaidō Nippon-Ham Fighters|Los Hokkaidō Nippon-Ham Fighters|Les Hokkaidō Nippon-Ham Fighters|北海道日本ハムファイターズ",
      "The Hokkaidō Consadole|El Hokkaidō Consadole|Le Hokkaidō Consadole|北海道コンサドーレ",
      "The Levanga Hokkaidō|Los Levanga Hokkaidō|Les Levanga Hokkaidō|レバンガ北海道",
    ],
    0,
    "The new stadium, Es Con Field Hokkaidō, has a retractable roof and a natural grass field, and it anchors a wider development that includes hot springs and farmland open to visitors.|El nuevo estadio, Es Con Field Hokkaidō, tiene techo retráctil y césped natural, y ancla un desarrollo más amplio que incluye aguas termales y terrenos agrícolas abiertos a los visitantes.|Le nouveau stade, Es Con Field Hokkaidō, possède un toit rétractable et une pelouse naturelle, et ancre un développement plus vaste incluant des sources chaudes et des terres agricoles ouvertes aux visiteurs.|新球場のエスコンフィールドHOKKAIDOは開閉式屋根と天然芝を備え、温泉や観光客に開かれた農地も含む広い複合開発の中核となっている。",
  ),
  q(
    6,
    "Hokkaidō's dairy herds are so large that the island is estimated to hold roughly what share of all dairy cattle in Japan?|Los rebaños lecheros de Hokkaidō son tan grandes que se estima que la isla alberga aproximadamente, ¿qué proporción de todo el ganado lechero de Japón?|Les troupeaux laitiers de Hokkaidō sont si nombreux que l'île est estimée détenir environ quelle part de tout le bétail laitier du Japon ?|北海道の酪農牛はきわめて多く、日本全体の乳牛のおよそどれくらいを占めると推計されているか?",
    [
      "About half|Aproximadamente la mitad|Environ la moitié|およそ半分",
      "About a tenth|Aproximadamente un décimo|Environ un dixième|およそ10分の1",
      "Nearly all|Casi la totalidad|Presque la totalité|ほぼすべて",
    ],
    0,
    "Milk production is far more concentrated in Hokkaidō than most other Japanese agriculture, since the island's cool climate and open land suit large-scale dairy farming better than the rest of the country.|La producción de leche está mucho más concentrada en Hokkaidō que la mayoría de la agricultura japonesa, ya que el clima fresco y las tierras abiertas de la isla se prestan mejor a la ganadería lechera a gran escala que el resto del país.|La production laitière est bien plus concentrée à Hokkaidō que la majeure partie de l'agriculture japonaise, le climat frais et les terres ouvertes de l'île se prêtant mieux à l'élevage laitier à grande échelle que le reste du pays.|北海道の冷涼な気候と広い土地が大規模酪農に適しているため、乳製品の生産は日本の他の農業分野に比べてこの島に強く集中している。",
  ),
  q(
    6,
    "Which whitefish, heavily fished off Hokkaidō and processed into surimi and spicy cod roe (mentaiko), is one of Japan's most commercially important species?|¿Qué pez blanco, muy pescado frente a Hokkaidō y procesado en surimi y hueva de bacalao picante (mentaiko), es una de las especies comercialmente más importantes de Japón?|Quel poisson blanc, très pêché au large d'Hokkaidō et transformé en surimi et en œufs de morue épicés (mentaiko), est l'une des espèces les plus importantes commercialement au Japon ?|北海道沖で盛んに獲られ、すり身や辛子明太子に加工される、日本の水産業でも屈指の重要魚種である白身魚は?",
    [
      "Walleye pollock|Abadejo de Alaska|Colin d'Alaska|スケトウダラ",
      "Bluefin tuna|Atún rojo|Thon rouge|クロマグロ",
      "Japanese eel|Anguila japonesa|Anguille du Japon|ウナギ",
    ],
    0,
    "Almost nothing of the fish goes unused: the flesh becomes surimi for fish cakes and imitation crab, and the roe, cured with chilli, becomes mentaiko, a breakfast staple across Japan that originated with Korean-style seasoning brought to Kyushu rather than to Hokkaidō itself.|Casi nada del pez se desperdicia: la carne se convierte en surimi para pasteles de pescado y cangrejo imitación, y la hueva, curada con chile, se convierte en mentaiko, un básico del desayuno en todo Japón que se originó con un aliño de estilo coreano llevado a Kyushu, no a Hokkaidō.|Presque rien du poisson n'est perdu : la chair devient du surimi pour les gâteaux de poisson et le crabe imitation, et les œufs, salés au piment, deviennent le mentaiko, un aliment courant au petit-déjeuner dans tout le Japon, né d'un assaisonnement à la coréenne apporté à Kyūshū, et non à Hokkaidō.|この魚はほとんど余さず使われる。身はすり身になってかまぼこやカニかまに、卵は唐辛子で漬けて明太子になる。明太子は日本各地の朝食の定番だが、その味付けの起源は北海道ではなく九州に伝わった朝鮮式の調味にある。",
  ),
  q(
    9,
    "Horonai Railway's pioneer 1880 steam locomotive, still preserved today as one of Japan's oldest, was named Benkei after a famous:|La locomotora de vapor pionera del ferrocarril de Horonai en 1880, aún conservada hoy como una de las más antiguas de Japón, se llamó Benkei en honor a un famoso:|La locomotive à vapeur pionnière du chemin de fer de Horonai en 1880, encore conservée aujourd'hui comme l'une des plus anciennes du Japon, fut nommée Benkei d'après un célèbre :|1880年に走った幌内鉄道の先駆けの蒸気機関車は「弁慶」と名づけられ、今も日本最古級として保存されている。この名の由来は?",
    [
      "A legendary warrior-monk|Un legendario monje guerrero|Un légendaire moine guerrier|伝説の武蔵坊弁慶(僧兵)",
      "A local mountain god|Un dios de montaña local|Une divinité locale de la montagne|地元の山の神",
      "The railway's chief engineer|El ingeniero jefe del ferrocarril|L'ingénieur en chef du chemin de fer|鉄道の主任技師",
    ],
    0,
    "Benkei is preserved today at the Railway Museum in Saitama, one of Japan's oldest surviving steam locomotives; its sister engine was named Yoshitsune, after the historical general Benkei served.|Benkei se conserva hoy en el Museo Ferroviario de Saitama, una de las locomotoras de vapor más antiguas conservadas de Japón; su locomotora gemela se llamó Yoshitsune, en honor al general histórico al que sirvió Benkei.|Benkei est aujourd'hui conservée au musée ferroviaire de Saitama, l'une des plus anciennes locomotives à vapeur conservées du Japon ; sa locomotive sœur fut nommée Yoshitsune, d'après le général historique que Benkei servait.|弁慶号は現在、さいたま市の鉄道博物館に保存されている、日本に現存する最古級の蒸気機関車の一つである。姉妹機は「義経」と名づけられた。弁慶が仕えたとされる武将の名にちなむ。",
  ),

  // ----------------------------------------------------------------------
  // 戊辰戦争・野生生物・現代産業(難易度3〜9)
  // ----------------------------------------------------------------------
  q(
    7,
    "In 1868–69, former shogunate loyalists fleeing the new Meiji government briefly declared an independent state on Hokkaidō, centred on Hakodate. What did they call it?|En 1868–69, antiguos leales al shogunato que huían del nuevo gobierno Meiji declararon brevemente un estado independiente en Hokkaidō, centrado en Hakodate. ¿Cómo lo llamaron?|En 1868–69, d'anciens loyalistes du shogunat fuyant le nouveau gouvernement Meiji proclamèrent brièvement un État indépendant à Hokkaidō, centré sur Hakodate. Comment l'appelèrent-ils ?|1868〜69年、明治新政府から逃れた旧幕府方が函館を中心に一時的に独立国家を宣言した。その名は?",
    [
      "The Ezo Republic|La República de Ezo|La République d'Ezo|蝦夷共和国",
      "The Northern Alliance|La Alianza del Norte|L'Alliance du Nord|北方同盟",
      "The Matsumae Shogunate|El Shogunato de Matsumae|Le Shogunat de Matsumae|松前幕府",
    ],
    0,
    "Led by former navy commander Enomoto Takeyaki, the breakaway state held out through the winter of 1868–69 before Meiji forces retook Hakodate's star-shaped fort, Goryōkaku, ending the Boshin War.|Liderado por el antiguo comandante naval Enomoto Takeaki, el estado escindido resistió durante el invierno de 1868-69 antes de que las fuerzas Meiji retomaran el fuerte en forma de estrella de Hakodate, Goryōkaku, poniendo fin a la guerra Boshin.|Dirigé par l'ancien commandant naval Enomoto Takeaki, cet État sécessionniste tint bon durant l'hiver 1868-1869 avant que les forces Meiji ne reprennent le fort en étoile de Hakodate, Goryōkaku, mettant fin à la guerre de Boshin.|旧幕府海軍の榎本武揚らに率いられたこの政権は1868〜69年の冬を持ちこたえたが、明治政府軍が函館の五稜郭を奪還し、戊辰戦争は終結した。",
  ),
  q(
    5,
    "Which large deer species, whose population has grown so large it now damages farmland and forests across Hokkaidō, is native to the island?|¿Qué especie de gran ciervo, cuya población ha crecido tanto que ahora daña tierras de cultivo y bosques en toda Hokkaidō, es originaria de la isla?|Quelle grande espèce de cerf, dont la population a tant augmenté qu'elle endommage désormais terres agricoles et forêts à travers Hokkaidō, est originaire de l'île ?|個体数が増えすぎて北海道各地の農地や森林に被害を与えている、島に固有の大型シカは?",
    [
      "The Ezo sika deer|El ciervo sika de Ezo|Le cerf sika d'Ezo|エゾシカ",
      "The reindeer|El reno|Le renne|トナカイ",
      "The moose|El alce|L'élan|ヘラジカ",
    ],
    0,
    "With wolves extinct on Hokkaidō since the early twentieth century and winters milder than they used to be, the Ezo sika population has surged into the hundreds of thousands, prompting culling programmes and a push to sell the meat commercially.|Con los lobos extintos en Hokkaidō desde principios del siglo XX y los inviernos más suaves que antes, la población del ciervo sika de Ezo se ha disparado a cientos de miles, lo que ha impulsado programas de control y esfuerzos por vender la carne comercialmente.|Les loups ayant disparu d'Hokkaidō depuis le début du XXe siècle et les hivers étant plus doux qu'autrefois, la population de cerfs sika d'Ezo a grimpé à plusieurs centaines de milliers d'individus, motivant des programmes d'abattage et des efforts pour vendre la viande commercialement.|20世紀初頭に北海道でオオカミが絶滅し、冬も以前より穏やかになったことで、エゾシカの個体数は数十万頭にまで急増した。これを受けて駆除事業が進められ、食肉としての商業利用も後押しされている。",
  ),
  q(
    7,
    "The wolf subspecies once native to Hokkaidō, hunted to extinction by the early twentieth century partly to protect ranch horses and livestock, was called the:|La subespecie de lobo antaño nativa de Hokkaidō, cazada hasta la extinción a principios del siglo XX en parte para proteger a los caballos y el ganado de las granjas, se llamaba:|La sous-espèce de loup autrefois native d'Hokkaidō, chassée jusqu'à l'extinction au début du XXe siècle en partie pour protéger les chevaux et le bétail des ranchs, s'appelait le :|20世紀初頭までに、牧場の馬や家畜を守る目的もあって狩り尽くされ絶滅した、かつて北海道にいたオオカミの亜種は?",
    [
      "The Ezo wolf|El lobo de Ezo|Le loup d'Ezo|エゾオオカミ",
      "The Honshu wolf|El lobo de Honshu|Le loup de Honshu|ニホンオオカミ",
      "The Sakhalin wolf|El lobo de Sajalín|Le loup de Sakhaline|サハリンオオカミ",
    ],
    0,
    "The Meiji-era government paid bounties for wolf carcasses and used strychnine-laced bait to protect the horse ranches it was establishing, and the Ezo wolf was essentially gone from the island by around 1900.|El gobierno de la era Meiji pagaba recompensas por cadáveres de lobo y usaba cebos con estricnina para proteger los ranchos de caballos que estaba estableciendo, y el lobo de Ezo había desaparecido esencialmente de la isla hacia 1900.|Le gouvernement de l'ère Meiji versait des primes pour les carcasses de loups et utilisait des appâts empoisonnés à la strychnine pour protéger les ranchs de chevaux qu'il établissait, si bien que le loup d'Ezo avait pratiquement disparu de l'île vers 1900.|明治政府は馬牧場を守るためオオカミの死体に懸賞金をかけ、ストリキニーネを仕込んだ毒餌をまいた。エゾオオカミは1900年ごろまでにこの島からほぼ姿を消した。",
  ),
  q(
    6,
    "One of the world's largest owl species, a fish-hunting bird now endangered and found in Hokkaidō's old-growth forests, is named after a nineteenth-century British naturalist. What is it called?|Una de las mayores especies de búho del mundo, un ave que caza peces, hoy en peligro y presente en los bosques primarios de Hokkaidō, lleva el nombre de un naturalista británico del siglo XIX. ¿Cómo se llama?|L'une des plus grandes espèces de hibou au monde, un oiseau pêcheur aujourd'hui menacé présent dans les forêts anciennes d'Hokkaidō, porte le nom d'un naturaliste britannique du XIXe siècle. Comment s'appelle-t-il ?|世界最大級のフクロウの一種で、魚を捕らえて暮らし、北海道の原生林にすみ絶滅が心配されている、19世紀の英国人博物学者にちなむ名を持つ鳥は?",
    [
      "Blakiston's fish owl|El búho pescador de Blakiston|Le pêcheur hibou de Blakiston|シマフクロウ",
      "Ural owl|Cárabo uralense|Chouette de l'Oural|フクロウ(ウラルフクロウ)",
      "Snowy owl|Búho nival|Harfang des neiges|シロフクロウ",
    ],
    0,
    "Named for Thomas Blakiston, a naturalist who studied Japan's wildlife in the 1880s, the owl can have a wingspan of nearly two metres and hunts salmon and trout from riverside perches, mostly at night.|Nombrado en honor a Thomas Blakiston, naturalista que estudió la fauna de Japón en la década de 1880, el búho puede tener una envergadura de casi dos metros y caza salmones y truchas desde posaderos junto al río, sobre todo de noche.|Nommé d'après Thomas Blakiston, naturaliste ayant étudié la faune du Japon dans les années 1880, ce hibou peut avoir une envergure de près de deux mètres et chasse saumons et truites depuis des perchoirs au bord des rivières, surtout la nuit.|1880年代に日本の生物相を研究した博物学者トーマス・ブラキストンにちなむ名を持つこのフクロウは、翼開長がほぼ2mに達し、川辺にとまって主に夜間、鮭や鱒を捕らえる。",
  ),
  q(
    8,
    "In 2023, a new company backed by the Japanese government and major domestic firms announced plans to mass-produce advanced semiconductors at a plant in which Hokkaidō city?|En 2023, una nueva empresa respaldada por el gobierno japonés y grandes firmas nacionales anunció planes para fabricar en serie semiconductores avanzados en una planta de qué ciudad de Hokkaidō?|En 2023, une nouvelle entreprise soutenue par le gouvernement japonais et de grandes firmes nationales annonça son intention de produire en série des semi-conducteurs avancés dans une usine de quelle ville de Hokkaidō ?|2023年、日本政府と国内主要企業の支援を受けた新会社が、北海道のどの都市の工場で先端半導体の量産計画を発表したか?",
    [
      "Chitose|Chitose|Chitose|千歳",
      "Obihiro|Obihiro|Obihiro|帯広",
      "Wakkanai|Wakkanai|Wakkanai|稚内",
    ],
    0,
    "The company, Rapidus, chose the city partly for its abundant water and land near New Chitose Airport, betting on cheap renewable power and available space to build a leading-edge chip plant from scratch in a country that had fallen behind in the industry.|La empresa, Rapidus, eligió la ciudad en parte por su abundante agua y terreno cerca del Nuevo Aeropuerto de Chitose, apostando por energía renovable barata y espacio disponible para construir desde cero una planta de chips de vanguardia en un país que se había quedado atrás en la industria.|L'entreprise, Rapidus, choisit la ville en partie pour son eau et ses terrains abondants près du nouvel aéroport de Chitose, misant sur une énergie renouvelable bon marché et l'espace disponible pour bâtir de toutes pièces une usine de puces de pointe dans un pays qui avait pris du retard dans le secteur.|新会社ラピダスは、新千歳空港近くの豊富な水と土地を理由の一つにこの都市を選んだ。再生可能エネルギーの安さと確保できる用地を頼みに、この分野で出遅れていた日本で最先端の半導体工場をゼロから築こうとしている。",
  ),

  // ----------------------------------------------------------------------
  // 地理・アイヌの言語と文学(難易度2〜9)
  // ----------------------------------------------------------------------
  q(
    2,
    "Cape Sōya, Hokkaidō's northernmost point and the northernmost accessible point on Japan's main islands, looks out toward which body of water?|El cabo Sōya, el punto más septentrional de Hokkaidō y el punto accesible más al norte de las islas principales de Japón, mira hacia qué masa de agua?|Le cap Sōya, point le plus septentrional d'Hokkaidō et point accessible le plus au nord des îles principales du Japon, donne sur quelle étendue d'eau ?|北海道最北端であり、日本の主要な島の中でも最北の到達可能地点である宗谷岬が面する海は?",
    [
      "The Sōya Strait, toward Sakhalin|El estrecho de Sōya, hacia Sajalín|Le détroit de Sōya, vers Sakhaline|サハリンへ向かう宗谷海峡",
      "The Tsugaru Strait, toward Honshu|El estrecho de Tsugaru, hacia Honshu|Le détroit de Tsugaru, vers Honshu|本州へ向かう津軽海峡",
      "Tokyo Bay|La bahía de Tokio|La baie de Tokyo|東京湾",
    ],
    0,
    "A monument shaped like a triangle stands at the cape marking the spot, and on especially clear days the mountains of Sakhalin are visible across the strait.|Un monumento con forma de triángulo se alza en el cabo marcando el punto, y en días especialmente despejados se pueden ver las montañas de Sajalín al otro lado del estrecho.|Un monument en forme de triangle se dresse au cap pour marquer l'endroit, et par temps particulièrement clair, les montagnes de Sakhaline sont visibles de l'autre côté du détroit.|岬には地点を示す三角形の記念碑が立ち、特に晴れた日には海峡の向こうにサハリンの山並みが見える。",
  ),
  q(
    5,
    "Which of Hokkaidō's lakes, formed in a volcanic caldera near Chitose, is one of the deepest lakes in Japan and rarely freezes even in the coldest winters?|¿Cuál de los lagos de Hokkaidō, formado en una caldera volcánica cerca de Chitose, es uno de los más profundos de Japón y rara vez se congela incluso en los inviernos más fríos?|Lequel des lacs d'Hokkaidō, formé dans une caldeira volcanique près de Chitose, est l'un des plus profonds du Japon et gèle rarement même lors des hivers les plus froids ?|千歳近くの火山カルデラにでき、日本でも屈指の水深を誇り、厳冬でもほとんど結氷しない北海道の湖は?",
    [
      "Lake Shikotsu|Lago Shikotsu|Lac Shikotsu|支笏湖",
      "Lake Saroma|Lago Saroma|Lac Saroma|サロマ湖",
      "Lake Akan|Lago Akan|Lac Akan|阿寒湖",
    ],
    0,
    "Its great depth means the water retains summer warmth long into winter, and the lake has recorded some of the highest average water clarity of any lake in Japan.|Su gran profundidad hace que el agua retenga el calor del verano hasta bien entrado el invierno, y el lago ha registrado algunos de los promedios de transparencia del agua más altos de cualquier lago de Japón.|Sa grande profondeur fait que l'eau conserve la chaleur estivale jusque tard dans l'hiver, et le lac a enregistré parmi les plus hautes moyennes de transparence de l'eau de tous les lacs du Japon.|水深が深いため夏の暖かさが冬まで残り、日本の湖の中でも屈指の透明度を記録したことがある。",
  ),
  q(
    6,
    "Which brackish lagoon on Hokkaidō's Okhotsk coast is the largest lake in Hokkaidō and the third largest in all of Japan?|¿Qué laguna salobre en la costa de Ojotsk de Hokkaidō es el lago más grande de Hokkaidō y el tercero más grande de todo Japón?|Quelle lagune saumâtre sur la côte d'Okhotsk d'Hokkaidō est le plus grand lac d'Hokkaidō et le troisième plus grand de tout le Japon ?|北海道最大、日本全体でも3番目に大きい、オホーツク海沿岸の汽水湖は?",
    [
      "Lake Saroma|Lago Saroma|Lac Saroma|サロマ湖",
      "Lake Kussharo|Lago Kussharo|Lac Kussharo|屈斜路湖",
      "Lake Tōya|Lago Tōya|Lac Tōya|洞爺湖",
    ],
    0,
    "Separated from the open sea by a long sandbar with narrow channels cut through it, Lake Saroma is also one of Japan's leading oyster and scallop farming grounds, its brackish water suiting both.|Separado del mar abierto por una larga barra de arena con estrechos canales abiertos en ella, el lago Saroma es también una de las principales zonas de cultivo de ostras y vieiras de Japón, ya que su agua salobre conviene a ambas.|Séparé de la mer ouverte par un long cordon de sable percé de chenaux étroits, le lac Saroma est aussi l'un des principaux sites d'élevage d'huîtres et de coquilles Saint-Jacques du Japon, ses eaux saumâtres convenant aux deux.|外海とは長い砂州で隔てられ、そこに切られた狭い水路でつながるサロマ湖は、汽水がどちらにも適することから日本有数の牡蠣とホタテの養殖地でもある。",
  ),
  q(
    8,
    "Chiri Yukie, an Ainu woman who died in 1922 at just nineteen, is remembered for completing what shortly before her death?|Chiri Yukie, una mujer ainu que murió en 1922 con solo diecinueve años, es recordada por completar, ¿qué poco antes de morir?|Chiri Yukie, une femme aïnoue morte en 1922 à seulement dix-neuf ans, est connue pour avoir achevé quoi peu avant sa mort ?|1922年、わずか19歳で亡くなったアイヌの女性、知里幸恵が死の直前に成し遂げたことは?",
    [
      "A transcription and translation of Ainu oral epics (yukar)|Una transcripción y traducción de epopeyas orales ainu (yukar)|Une transcription et traduction d'épopées orales aïnoues (yukar)|アイヌの口承叙事詩(ユーカラ)の文字化と翻訳",
      "The first Ainu-language newspaper|El primer periódico en lengua ainu|Le premier journal en langue aïnoue|アイヌ語で書かれた最初の新聞",
      "A treaty securing Ainu fishing rights|Un tratado que aseguraba los derechos de pesca ainu|Un traité garantissant les droits de pêche aïnous|アイヌの漁業権を認めさせた条約",
    ],
    0,
    "Her book, the Ainu Shin'yōshū (\"Collection of Ainu Legends\"), set down yukar epics in the Ainu language using Roman letters alongside a Japanese translation; she finished correcting the proofs and died of heart failure the same night, and it was published the following year.|Su libro, el Ainu Shin'yōshū («Colección de leyendas ainu»), registró epopeyas yukar en lengua ainu con letras romanas junto a una traducción japonesa; terminó de corregir las pruebas y murió de un fallo cardíaco esa misma noche, y se publicó al año siguiente.|Son livre, l'Ainu Shin'yōshū (« Recueil de légendes aïnoues »), consigna des épopées yukar en langue aïnoue en lettres romaines accompagnées d'une traduction japonaise ; elle finit de corriger les épreuves et mourut d'une défaillance cardiaque cette même nuit, l'ouvrage étant publié l'année suivante.|彼女の著書『アイヌ神謡集』は、アイヌ語のユーカラをローマ字で書き取り、日本語訳を添えたものだった。校正を終えたその夜に心臓発作で亡くなり、本は翌年出版された。",
  ),
  q(
    7,
    "A small mouth harp traditionally played by Ainu women, held between the lips and plucked to produce a buzzing drone, is called:|Un pequeño arpa de boca tocada tradicionalmente por mujeres ainu, sostenida entre los labios y pulsada para producir un zumbido, se llama:|Une petite guimbarde traditionnellement jouée par les femmes aïnoues, tenue entre les lèvres et pincée pour produire un bourdonnement, s'appelle :|唇にあて、弾いて低いうなりのような音を出す、アイヌの女性が伝統的に奏でてきた小さな口琴は?",
    [
      "Mukkuri|Mukkuri|Mukkuri|ムックリ",
      "Tonkori|Tonkori|Tonkori|トンコリ",
      "Shamisen|Shamisen|Shamisen|三味線",
    ],
    0,
    "Carved from a single sliver of bamboo with a thin tongue cut down its centre, the mukkuri is played by pulling a string to set the tongue vibrating while the player shapes the resulting sound with their mouth.|Tallado de una sola tira de bambú con una lengüeta fina cortada en su centro, el mukkuri se toca tirando de una cuerda para hacer vibrar la lengüeta, mientras quien lo toca da forma al sonido resultante con la boca.|Taillé dans un seul éclat de bambou avec une languette fine découpée en son centre, le mukkuri se joue en tirant sur une cordelette pour faire vibrer la languette, le joueur façonnant le son obtenu avec sa bouche.|一片の竹に細い舌を彫り出して作るムックリは、紐を引いて舌を振動させ、口の中で音を響かせて奏でる。",
  ),
  q(
    6,
    "The stringed Ainu instrument tonkori, plucked like a zither and traditionally strung with animal sinew, has how many strings in its classic form?|El instrumento de cuerda ainu tonkori, pulsado como una cítara y tradicionalmente encordado con tendón animal, ¿cuántas cuerdas tiene en su forma clásica?|L'instrument à cordes aïnou tonkori, pincé comme une cithare et traditionnellement cordé de tendon animal, comporte combien de cordes dans sa forme classique ?|動物の腱を弦に張り、琴のように弾いて鳴らすアイヌの弦楽器トンコリは、伝統的な形で弦を何本持つか?",
    [
      "Five|Cinco|Cinq|5本",
      "Two|Dos|Deux|2本",
      "Twelve|Doce|Douze|12本",
    ],
    0,
    "The instrument's long, narrow wooden body has no frets or finger-stopping technique; instead, each of the five strings is tuned to a fixed pitch and players build melodies by plucking different open strings.|El cuerpo largo y estrecho de madera del instrumento no tiene trastes ni técnica de pisado con los dedos; en cambio, cada una de las cinco cuerdas se afina a un tono fijo, y los intérpretes construyen melodías pulsando distintas cuerdas al aire.|Le long corps étroit en bois de l'instrument n'a ni frettes ni technique de pression des doigts ; chacune des cinq cordes est plutôt accordée à une hauteur fixe, et les musiciens construisent des mélodies en pinçant différentes cordes à vide.|細長い木の胴にはフレットも指で音程を変える技法もなく、5本それぞれの弦を固定した音高に調弦し、開放弦を弾き分けて旋律を作る。",
  ),

  // ----------------------------------------------------------------------
  // 食の歴史・行政区分(難易度1〜7)
  // ----------------------------------------------------------------------
  q(
    1,
    "Which crustacean, sold whole with a spiky shell and prized in winter, is a well-known Hokkaidō delicacy alongside crab?|¿Qué crustáceo, vendido entero con un caparazón espinoso y apreciado en invierno, es una conocida delicia de Hokkaidō junto al cangrejo?|Quel crustacé, vendu entier avec une carapace épineuse et apprécié en hiver, est une spécialité bien connue d'Hokkaidō aux côtés du crabe ?|殻にとげがあり、冬に珍重される、カニと並ぶ北海道名物の甲殻類は?",
    [
      "Hairy crab (kegani)|Cangrejo peludo (kegani)|Crabe poilu (kegani)|毛ガニ",
      "Lobster|Langosta|Homard|ロブスター",
      "Crayfish|Cangrejo de río|Écrevisse|ザリガニ",
    ],
    0,
    "Despite the name \"hairy crab\", it is a true crab covered in short, stiff bristles rather than fur, and its rich, orange-tinted innards (kani-miso) are eaten as a delicacy in their own right.|A pesar del nombre «cangrejo peludo», es un cangrejo de verdad cubierto de cerdas cortas y rígidas, no de pelo, y sus vísceras de tono anaranjado (kani-miso) se comen como manjar en sí mismas.|Malgré son nom de « crabe poilu », il s'agit d'un vrai crabe couvert de soies courtes et raides plutôt que de poils, et ses entrailles d'un ton orangé (kani-miso) se dégustent comme un mets à part entière.|「毛ガニ」という名だが実際は毛皮ではなく短く硬い剛毛に覆われた本物のカニで、橙色を帯びた内臓(カニ味噌)もそれ自体がごちそうとして食べられる。",
  ),
  q(
    6,
    "The \"Danshaku\" (Baron) potato, one of Hokkaidō's most widely grown varieties, is named for the Japanese baron who first imported its seed stock from which country around 1908?|La patata «Danshaku» (barón), una de las variedades más cultivadas de Hokkaidō, debe su nombre al barón japonés que importó por primera vez sus semillas de qué país hacia 1908?|La pomme de terre « Danshaku » (baron), l'une des variétés les plus cultivées d'Hokkaidō, doit son nom au baron japonais qui en importa les semences pour la première fois de quel pays vers 1908 ?|北海道で広く栽培されるじゃがいもの品種「男爵薯」は、1908年ごろどの国から種芋を輸入した日本人男爵にちなむ名か?",
    [
      "The United Kingdom (Irish Cobbler stock)|El Reino Unido (variedad Irish Cobbler)|Le Royaume-Uni (souche Irish Cobbler)|イギリス(アイリッシュ・コブラー系統)",
      "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
    ],
    0,
    "Kawada Ryūkichi, who held the title of baron, brought the seed potatoes back and had them planted near Hakodate; the variety, related to the British \"Irish Cobbler\", proved so well suited to Hokkaidō's soil that it still dominates the island's potato fields.|Kawada Ryūkichi, que ostentaba el título de barón, trajo las semillas de patata y las hizo plantar cerca de Hakodate; la variedad, emparentada con la británica «Irish Cobbler», resultó tan adecuada al suelo de Hokkaidō que aún domina los campos de patata de la isla.|Kawada Ryūkichi, qui portait le titre de baron, rapporta les semences de pomme de terre et les fit planter près de Hakodate ; la variété, apparentée à la britannique « Irish Cobbler », se révéla si bien adaptée au sol d'Hokkaidō qu'elle domine encore les champs de pommes de terre de l'île.|男爵の称号を持っていた川田龍吉が種芋を持ち帰り、函館近郊で栽培させた。英国の「アイリッシュ・コブラー」に連なるこの品種は北海道の土に驚くほど合い、いまも島のじゃがいも畑の主力であり続けている。",
  ),
  q(
    5,
    "Unlike the rest of Japan, Hokkaidō is divided into second-tier administrative units with no direct equivalent elsewhere in the country, called:|A diferencia del resto de Japón, Hokkaidō se divide en unidades administrativas de segundo nivel sin equivalente directo en otras partes del país, llamadas:|Contrairement au reste du Japon, Hokkaidō est divisée en unités administratives de second niveau sans équivalent direct ailleurs dans le pays, appelées :|日本の他地域と異なり、北海道は他に例のない独自の第二層の行政区分を持つ。それは何と呼ばれるか?",
    [
      "Shichō (subprefectures) / sōgō shinkō-kyoku|Shichō (subprefecturas) / sōgō shinkō-kyoku|Shichō (sous-préfectures) / sōgō shinkō-kyoku|支庁(総合振興局・振興局)",
      "Han (feudal domains)|Han (dominios feudales)|Han (fiefs)|藩",
      "Gun (rural districts), as used nationwide|Gun (distritos rurales), como en todo el país|Gun (districts ruraux), comme dans tout le pays|全国共通の郡",
    ],
    0,
    "Hokkaidō is split into 14 of these regional offices, a legacy of governing an island too large to administer directly from Sapporo alone; other prefectures instead group municipalities into gun districts with far less administrative power.|Hokkaidō se divide en 14 de estas oficinas regionales, herencia de gobernar una isla demasiado grande para administrarla directamente solo desde Sapporo; otras prefecturas, en cambio, agrupan a los municipios en distritos gun con mucho menos poder administrativo.|Hokkaidō est divisée en 14 de ces bureaux régionaux, héritage de la gestion d'une île trop vaste pour être administrée directement depuis Sapporo seule ; les autres préfectures regroupent plutôt leurs communes en districts gun, dotés de bien moins de pouvoir administratif.|北海道は14のこうした地方機関に分かれている。札幌だけで直接統治するには広すぎる島を治めてきた名残である。他の都府県では、行政権のずっと弱い「郡」に市町村をまとめるにとどまる。",
  ),
  q(
    3,
    "Which two islands, both visible from Wakkanai and reachable by ferry, are together promoted as a national park famous for wildflowers and coastal cliffs?|¿Qué dos islas, ambas visibles desde Wakkanai y accesibles en ferry, se promocionan juntas como un parque nacional famoso por sus flores silvestres y acantilados costeros?|Quelles deux îles, toutes deux visibles depuis Wakkanai et accessibles en ferry, sont promues ensemble comme un parc national réputé pour ses fleurs sauvages et ses falaises côtières ?|稚内から望むことができ、フェリーで渡れる、高山植物と海岸の断崖で知られる国立公園を構成する二つの島は?",
    [
      "Rebun and Rishiri|Rebun y Rishiri|Rebun et Rishiri|礼文島と利尻島",
      "Okushiri and Teuri|Okushiri y Teuri|Okushiri et Teuri|奥尻島と天売島",
      "Shikotan and Kunashiri|Shikotan y Kunashiri|Shikotan et Kunashiri|色丹島と国後島",
    ],
    0,
    "Rishiri is dominated by a single volcanic cone rising straight from the sea, while flatter Rebun is known as the \"island of flowers\" for the alpine plants that grow at sea level thanks to the cool climate.|Rishiri está dominada por un único cono volcánico que se alza directamente del mar, mientras que la más llana Rebun es conocida como la «isla de las flores» por las plantas alpinas que crecen a nivel del mar gracias al clima fresco.|Rishiri est dominée par un unique cône volcanique s'élevant directement de la mer, tandis que Rebun, plus plate, est connue comme l'« île aux fleurs » pour ses plantes alpines qui poussent au niveau de la mer grâce au climat frais.|利尻島は海からそびえ立つ一つの火山円錐に占められ、より平坦な礼文島は、冷涼な気候のおかげで海抜ゼロm近くで高山植物が育つことから「花の島」と呼ばれる。",
  ),

  // ----------------------------------------------------------------------
  // 探検史・災害・精密な事実(難易度6〜10)
  // ----------------------------------------------------------------------
  q(
    8,
    "In 1808–09, a low-ranking Edo-period surveyor named Mamiya Rinzō explored the strait between Sakhalin and the Asian mainland, proving what that had been in doubt?|En 1808-09, un topógrafo de bajo rango de la era Edo llamado Mamiya Rinzō exploró el estrecho entre Sajalín y el continente asiático, demostrando algo que estaba en duda. ¿Qué?|En 1808-1809, un arpenteur de rang modeste de l'ère Edo nommé Mamiya Rinzō explora le détroit entre Sakhaline et le continent asiatique, prouvant quoi, alors mis en doute ?|1808〜09年、江戸時代の下級の測量役人、間宮林蔵が樺太と大陸のあいだの海峡を探査し、それまで疑問視されていた何を証明したか?",
    [
      "That Sakhalin is an island, not a peninsula|Que Sajalín es una isla, no una península|Que Sakhaline est une île, non une péninsule|樺太が半島ではなく島であること",
      "That Hokkaidō and Honshu were once joined by a land bridge|Que Hokkaidō y Honshu estuvieron unidas por un puente de tierra|Qu'Hokkaidō et Honshu étaient jadis reliées par un pont terrestre|北海道と本州がかつて陸続きだったこと",
      "That the Kuril Islands were uninhabited|Que las islas Kuriles estaban deshabitadas|Que les îles Kouriles étaient inhabitées|千島列島が無人島であること",
    ],
    0,
    "European maps of the time showed Sakhalin as a peninsula attached to the Asian mainland; Mamiya traced the narrow strait later named after him and confirmed a sea passage existed, a finding significant enough that even European geographers eventually adopted his name for it.|Los mapas europeos de la época mostraban Sajalín como una península unida al continente asiático; Mamiya trazó el estrecho angosto que luego llevaría su nombre y confirmó que existía un paso marítimo, un hallazgo tan relevante que hasta los geógrafos europeos acabaron adoptando su nombre para él.|Les cartes européennes de l'époque montraient Sakhaline comme une péninsule rattachée au continent asiatique ; Mamiya releva l'étroit détroit qui porterait plus tard son nom et confirma l'existence d'un passage maritime, une découverte assez importante pour que les géographes européens en viennent à en adopter le nom.|当時のヨーロッパの地図では樺太は大陸と地続きの半島として描かれていた。間宮はのちに彼の名がつく狭い海峡を測量し、海路が実在することを確かめた。この発見はヨーロッパの地理学者たちもやがてその名を採用するほど重要だった。",
  ),
  q(
    6,
    "Hokkaidō's population is estimated to have peaked around which decade before beginning a long decline that continues today?|¿En torno a qué década se estima que alcanzó su punto máximo la población de Hokkaidō, antes de iniciar un largo declive que continúa hoy?|Autour de quelle décennie la population d'Hokkaidō a-t-elle atteint son pic estimé, avant d'entamer un long déclin qui se poursuit aujourd'hui ?|北海道の人口がピークを迎え、その後今日まで続く長い減少に転じたのはおよそいつごろとされるか?",
    [
      "The late 1990s|Finales de la década de 1990|La fin des années 1990|1990年代後半",
      "The late 1960s|Finales de la década de 1960|La fin des années 1960|1960年代後半",
      "The early 2010s|Principios de la década de 2010|Le début des années 2010|2010年代前半",
    ],
    0,
    "Hokkaidō's population peaked at roughly 5.7 million around 1997 and has fallen by close to a million since, a decline steeper than Japan's national average and heavily concentrated in small towns rather than Sapporo.|La población de Hokkaidō alcanzó un máximo de unos 5,7 millones hacia 1997 y ha caído en casi un millón desde entonces, un declive más pronunciado que la media nacional de Japón y muy concentrado en pueblos pequeños más que en Sapporo.|La population d'Hokkaidō a culminé à environ 5,7 millions vers 1997 et a chuté de près d'un million depuis, un déclin plus marqué que la moyenne nationale japonaise et fortement concentré dans les petites villes plutôt qu'à Sapporo.|北海道の人口は1997年ごろにおよそ570万人でピークを迎え、以後100万人近く減少した。この減少は日本全体の平均より急で、札幌よりも小さな町に強く集中している。",
  ),
  q(
    9,
    "The 1954 Tōya Maru disaster prompted renewed calls for a tunnel under the Tsugaru Strait. In what year did full-scale excavation of the Seikan Tunnel finally begin?|El desastre del Tōya Maru en 1954 impulsó nuevos llamados a construir un túnel bajo el estrecho de Tsugaru. ¿En qué año comenzó por fin la excavación a gran escala del túnel de Seikan?|Le désastre du Tōya Maru en 1954 relança les appels à creuser un tunnel sous le détroit de Tsugaru. En quelle année l'excavation à grande échelle du tunnel de Seikan débuta-t-elle enfin ?|1954年の洞爺丸事故はトンネル建設の機運を高めた。青函トンネルの本格的な掘削がついに始まったのは何年か?",
    [
      "1971|1971|1971|1971年",
      "1956|1956|1956|1956年",
      "1980|1980|1980|1980年",
    ],
    0,
    "Geological surveys began in 1964, but full-scale excavation only started in 1971, meaning 17 years passed between the disaster and construction proper, and a further 17 years before the tunnel finally opened in 1988.|Los estudios geológicos comenzaron en 1964, pero la excavación a gran escala solo empezó en 1971, es decir, pasaron 17 años entre el desastre y el inicio real de la obra, y otros 17 años más antes de que el túnel abriera por fin en 1988.|Les études géologiques débutèrent en 1964, mais l'excavation à grande échelle ne commença qu'en 1971, soit 17 ans après le désastre, et il fallut encore 17 ans avant que le tunnel n'ouvre enfin en 1988.|地質調査は1964年に始まったが、本格的な掘削が始まったのは1971年だった。事故から着工までに17年、そこから1988年の開通までにさらに17年を要した。",
  ),
  q(
    7,
    "Hokkaidō's salmon fisheries are sustained largely not by wild spawning but by a nationwide programme of what kind of facility, releasing hundreds of millions of young salmon each year?|Las pesquerías de salmón de Hokkaidō se sostienen en gran parte no por el desove silvestre sino por un programa nacional de qué tipo de instalación, que libera cientos de millones de salmones jóvenes cada año?|Les pêcheries de saumon d'Hokkaidō sont soutenues en grande partie non par le frai sauvage mais par un programme national de quel type d'installation, relâchant chaque année des centaines de millions de jeunes saumons ?|北海道の鮭漁は野生の産卵よりも、毎年数億尾の稚魚を放流するある種の施設による全国的な事業に大きく支えられている。それは何か?",
    [
      "Salmon hatcheries|Criaderos de salmón|Écloseries de saumon|鮭のふ化場",
      "Offshore fish farms|Granjas piscícolas marinas|Fermes piscicoles en mer|海面養殖場",
      "River dredging stations|Estaciones de dragado fluvial|Stations de dragage fluvial|河川浚渫施設",
    ],
    0,
    "Hatchery workers strip eggs and milt from adult salmon returning to rivers, raise the fertilised eggs in controlled tanks, and release the young fish to migrate to sea, a system that has run continuously since the Meiji era.|Los trabajadores del criadero extraen huevas y esperma de los salmones adultos que regresan a los ríos, crían los huevos fecundados en tanques controlados y liberan a los peces jóvenes para que migren al mar, un sistema que funciona sin interrupción desde la era Meiji.|Les employés des écloseries prélèvent œufs et laitance des saumons adultes remontant les rivières, élèvent les œufs fécondés dans des bassins contrôlés, puis relâchent les jeunes poissons pour qu'ils migrent vers la mer, un système fonctionnant sans interruption depuis l'ère Meiji.|ふ化場の職員は川を遡ってきた成魚から卵と精子を採り、受精卵を管理された水槽で育て、稚魚を放流して海へ送り出す。この仕組みは明治期から絶えることなく続いている。",
  ),
  q(
    9,
    "The Notsuke Peninsula, a narrow sandspit curling into the Nemuro Strait, is famous for skeletal dead trees left standing after seawater intrusion killed a forest of what?|La península de Notsuke, una estrecha lengua de arena que se curva hacia el estrecho de Nemuro, es famosa por los árboles muertos y esqueléticos que quedaron en pie tras la intrusión de agua salada, que mató un bosque de qué especie?|La péninsule de Notsuke, une étroite flèche de sable s'incurvant dans le détroit de Nemuro, est réputée pour ses arbres morts et squelettiques restés debout après qu'une intrusion d'eau salée a tué une forêt de quoi ?|根室海峡へ弧を描く細い砂嘴、野付半島が知られているのは、海水の浸入で枯れた立ち枯れの木々の姿である。何の木の森だったか?",
    [
      "Sakhalin fir (todomatsu)|Abeto de Sajalín (todomatsu)|Sapin de Sakhaline (todomatsu)|トドマツ",
      "Cherry trees|Cerezos|Cerisiers|サクラ",
      "Bamboo groves|Bosquecillos de bambú|Bosquets de bambou|竹林",
    ],
    0,
    "As the sandspit slowly subsided and eroded, seawater seeped into the fir forest's freshwater soil, killing the trees while leaving their bare grey trunks standing in what is now called Todowara, a stark landscape unlike anywhere else on the peninsula.|A medida que el banco de arena se hundía y erosionaba lentamente, el agua de mar se filtró en el suelo de agua dulce del bosque de abetos, matando los árboles y dejando en pie sus troncos grises y desnudos en lo que hoy se llama Todowara, un paisaje singular en toda la península.|Alors que la flèche de sable s'affaissait et s'érodait lentement, l'eau de mer s'infiltra dans le sol d'eau douce de la sapinière, tuant les arbres et laissant leurs troncs gris et dénudés debout dans ce qu'on appelle aujourd'hui Todowara, un paysage unique sur toute la péninsule.|砂嘴がゆっくりと沈降・浸食するにつれ、海水がトドマツ林の淡水の土壌にしみ込み、木々を枯らした。灰色の裸の幹が立ち並ぶこの場所は「トドワラ」と呼ばれ、半島の中でも異様な景観をなしている。",
  ),

  // ----------------------------------------------------------------------
  // 続・鉄道と開拓の歴史(難易度3〜10)
  // ----------------------------------------------------------------------
  q(
    3,
    "Which fish, caught heavily off Hokkaidō's coasts in autumn and often grilled whole with just salt, is one of Japan's most common seasonal foods?|¿Qué pez, capturado abundantemente en las costas de Hokkaidō en otoño y a menudo asado entero solo con sal, es uno de los alimentos de temporada más comunes de Japón?|Quel poisson, pêché abondamment au large des côtes d'Hokkaidō en automne et souvent grillé entier avec juste du sel, est l'un des aliments de saison les plus courants du Japon ?|秋に北海道近海で多く獲れ、塩だけで丸ごと焼かれることが多い、日本でもっとも身近な季節の魚のひとつは?",
    [
      "Pacific saury (sanma)|Sanma (paparda del Pacífico)|Balaou du Pacifique (sanma)|サンマ",
      "Bluefin tuna|Atún rojo|Thon rouge|クロマグロ",
      "Yellowtail|Seriola|Sériole|ブリ",
    ],
    0,
    "Sanma migrate south along Hokkaidō's Pacific coast each autumn, and the smell of it grilling on charcoal is closely associated with the season across Japan, though catches have fallen sharply in recent years as the fish's range has shifted.|El sanma migra hacia el sur por la costa del Pacífico de Hokkaidō cada otoño, y el olor a su asado sobre carbón se asocia estrechamente con la estación en todo Japón, aunque las capturas han caído bruscamente en los últimos años al desplazarse el área de distribución del pez.|Le sanma migre vers le sud le long de la côte pacifique d'Hokkaidō chaque automne, et l'odeur de sa grillade au charbon de bois est étroitement associée à cette saison dans tout le Japon, bien que les prises aient nettement chuté ces dernières années avec le déplacement de l'aire de répartition du poisson.|サンマは毎秋、北海道の太平洋沿岸を南下しながら回遊し、炭火で焼く匂いは日本中で秋の風物詩とされる。ただし近年は魚の分布域の変化で漁獲量が大きく落ち込んでいる。",
  ),
  q(
    7,
    "Which JNR line, connecting Fukagawa and Nayoro through some of Hokkaidō's most sparsely populated terrain, was once informally nicknamed Japan's least profitable line before its 1995 closure?|¿Qué línea de JNR, que conectaba Fukagawa y Nayoro a través de uno de los terrenos más despoblados de Hokkaidō, fue apodada informalmente la línea menos rentable de Japón antes de su cierre en 1995?|Quelle ligne JNR, reliant Fukagawa et Nayoro à travers l'un des terrains les moins peuplés d'Hokkaidō, fut jadis surnommée informellement la ligne la moins rentable du Japon avant sa fermeture en 1995 ?|深川と名寄を、北海道でも屈指の過疎地を通って結び、1995年の廃止前には非公式に「日本一の赤字路線」とも呼ばれた国鉄の路線は?",
    [
      "The Fukami Line|La línea Fukami|La ligne Fukami|深名線",
      "The Shibetsu Line|La línea Shibetsu|La ligne Shibetsu|標津線",
      "The Esashi Line|La línea Esashi|La ligne Esashi|江差線",
    ],
    0,
    "Parts of the line ran so far from any road that a section near Lake Chimikeppu stayed in service years after buses could have replaced it, simply because no road existed yet to run the bus on.|Partes de la línea discurrían tan lejos de cualquier carretera que un tramo cerca del lago Chimikeppu siguió en servicio años después de que un autobús pudiera haberlo sustituido, simplemente porque aún no existía carretera por donde hacerlo circular.|Certaines parties de la ligne couraient si loin de toute route qu'un tronçon près du lac Chimikeppu resta en service des années après qu'un bus aurait pu le remplacer, faute tout simplement de route sur laquelle le faire circuler.|路線の一部は道路からあまりに離れていたため、朱鞠内湖付近の区間はバスに置き換えられるはずの時期を過ぎても運行が続いた。単に、バスを走らせる道路そのものがまだ無かったからである。",
  ),
  q(
    5,
    "Which overnight sleeper train once connected Sapporo directly to Ueno in Tokyo, running until its discontinuation in 2015 as air travel and the Shinkansen made it obsolete?|¿Qué tren nocturno con literas conectaba antaño Sapporo directamente con Ueno en Tokio, circulando hasta su fin en 2015, cuando el avión y el Shinkansen lo volvieron obsoleto?|Quel train de nuit à couchettes reliait autrefois Sapporo directement à Ueno à Tokyo, circulant jusqu'à son arrêt en 2015 lorsque l'avion et le Shinkansen le rendirent obsolète ?|かつて札幌と東京の上野を直接結び、航空機や新幹線に押されて2015年に廃止された寝台特急は?",
    [
      "The Hokutosei|El Hokutosei|Le Hokutosei|北斗星",
      "The Nozomi|El Nozomi|Le Nozomi|のぞみ",
      "The Tsubame|El Tsubame|Le Tsubame|つばめ",
    ],
    0,
    "The Hokutosei ran through the Seikan Tunnel on its roughly 16-hour overnight journey, and its blue carriages with private compartments made it one of Japan's most fondly remembered sleeper services before overnight trains largely disappeared.|El Hokutosei atravesaba el túnel de Seikan en su viaje nocturno de unas 16 horas, y sus vagones azules con compartimentos privados lo convirtieron en uno de los servicios de tren nocturno más recordados con cariño de Japón, antes de que los trenes nocturnos desaparecieran en gran medida.|Le Hokutosei traversait le tunnel de Seikan lors de son trajet nocturne d'environ 16 heures, et ses voitures bleues à compartiments privés en firent l'un des services de train de nuit les plus appréciés du Japon, avant que les trains de nuit ne disparaissent presque totalement.|北斗星は青函トンネルを抜けておよそ16時間かけて夜を走った。個室を備えた青い車両は、夜行列車がほぼ姿を消す前の日本でもっとも愛された寝台列車の一つだった。",
  ),
  q(
    10,
    "Roughly how many people identified themselves as Ainu in Hokkaidō's most recent periodic survey of Ainu residents, a figure widely considered an undercount since the survey relies on self-identification?|¿Aproximadamente cuántas personas se identificaron como ainu en la encuesta periódica más reciente de Hokkaidō sobre residentes ainu, una cifra ampliamente considerada subestimada porque la encuesta depende de la autoidentificación?|Environ combien de personnes se sont identifiées comme aïnoues lors de la dernière enquête périodique d'Hokkaidō sur les résidents aïnous, un chiffre largement considéré comme sous-estimé puisque l'enquête repose sur l'auto-identification ?|北海道が定期的に行うアイヌの人々に関する調査で、直近の調査で自らアイヌと申告した人はおよそ何人か。この数字は自己申告に頼るため過小評価とされることが多い。",
    [
      "Roughly 13,000|Unas 13.000|Environ 13 000|およそ1万3000人",
      "Roughly 300,000|Unas 300.000|Environ 300 000|およそ30万人",
      "Roughly 1,000|Unas 1.000|Environ 1 000|およそ1000人",
    ],
    1,
    "Hokkaidō's prefectural survey counted roughly 13,000 self-identified Ainu residents, a number that has declined across successive surveys; many researchers and Ainu organisations argue the true figure is considerably higher, since intermarriage, historical stigma and unclear ancestry records lead many people of Ainu descent not to identify as such on a government form.|La encuesta prefectural de Hokkaidō contabilizó unas 13.000 personas ainu autoidentificadas, una cifra que ha ido disminuyendo en encuestas sucesivas; muchos investigadores y organizaciones ainu sostienen que la cifra real es considerablemente mayor, ya que los matrimonios mixtos, el estigma histórico y los registros de ascendencia poco claros hacen que muchas personas de origen ainu no se identifiquen como tales en un formulario gubernamental.|L'enquête préfectorale d'Hokkaidō a recensé environ 13 000 résidents aïnous auto-identifiés, un chiffre en baisse au fil des enquêtes successives ; de nombreux chercheurs et organisations aïnoues estiment que le chiffre réel est nettement plus élevé, les mariages mixtes, la stigmatisation historique et des registres d'ascendance flous conduisant de nombreuses personnes d'origine aïnoue à ne pas se déclarer comme telles sur un formulaire gouvernemental.|北海道の道の調査では、自らアイヌと申告した住民はおよそ1万3000人とされ、調査を重ねるごとに数は減っている。通婚や歴史的な差別、はっきりしない系譜の記録により、アイヌの血を引きながら行政の書類ではそう申告しない人も多いとして、実際の数はもっと多いはずだと研究者やアイヌ団体は指摘している。",
  ),

  // ----------------------------------------------------------------------
  // 補足(難易度1〜8)
  // ----------------------------------------------------------------------
  q(
    1,
    "Which season is Hokkaidō internationally best known for, drawing skiers and snowboarders from around the world?|¿Qué estación es la más conocida internacionalmente de Hokkaidō, atrayendo a esquiadores y practicantes de snowboard de todo el mundo?|Quelle saison Hokkaidō est-elle la plus connue à l'international, attirant skieurs et snowboardeurs du monde entier ?|世界中からスキーヤーやスノーボーダーを引き寄せる、北海道が国際的にもっともよく知られる季節は?",
    [
      "Winter|Invierno|L'hiver|冬",
      "Autumn|Otoño|L'automne|秋",
      "Rainy season|Estación de lluvias|La saison des pluies|梅雨",
    ],
    0,
    "Dry, powdery snow blown in from Siberia across the Sea of Japan gives many Hokkaidō resorts unusually light, fluffy conditions rarely found at this latitude anywhere else in the world.|La nieve seca y polvorienta que llega desde Siberia a través del mar de Japón da a muchos centros de esquí de Hokkaidō unas condiciones inusualmente ligeras y esponjosas, poco frecuentes en esta latitud en cualquier otro lugar del mundo.|La neige sèche et poudreuse soufflée depuis la Sibérie à travers la mer du Japon donne à de nombreuses stations d'Hokkaidō des conditions inhabituellement légères et duveteuses, rarement trouvées à cette latitude ailleurs dans le monde.|日本海を越えてシベリアから吹き込む乾いた粉雪のおかげで、北海道の多くのスキー場はこの緯度としては世界でも珍しいほど軽くふわふわの雪質になる。",
  ),
  q(
    2,
    "Which grain, used to make Hokkaidō's distinctive dark-flecked noodles, grows well in the island's cooler, shorter growing season?|¿Qué grano, usado para hacer los fideos de vetas oscuras característicos de Hokkaidō, crece bien en la temporada de cultivo más fresca y corta de la isla?|Quelle céréale, utilisée pour fabriquer les nouilles caractéristiques tachetées de sombre d'Hokkaidō, pousse bien pendant la saison de culture plus fraîche et plus courte de l'île?|北海道特有の黒い斑点のある麺の材料となり、島の冷涼で短い生育期間でもよく育つ穀物は?",
    [
      "Buckwheat|Trigo sarraceno|Sarrasin|そば(蕎麦)",
      "Barley|Cebada|Orge|大麦",
      "Millet|Mijo|Millet|キビ",
    ],
    0,
    "Buckwheat matures quickly enough to fit within Hokkaidō's short frost-free season, and the island now grows a large share of Japan's domestic crop, much of it in the interior around the Sea of Japan side of the island.|El trigo sarraceno madura lo bastante rápido para encajar en la corta temporada libre de heladas de Hokkaidō, y la isla produce hoy una gran parte de la cosecha nacional de Japón, buena parte en el interior, hacia el lado del mar de Japón.|Le sarrasin mûrit assez vite pour s'inscrire dans la courte saison sans gel d'Hokkaidō, et l'île produit aujourd'hui une grande part de la récolte nationale du Japon, en grande partie dans l'intérieur, du côté de la mer du Japon.|蕎麦は北海道の短い無霜期間でも十分に実り、いまや島は日本国内収穫量の多くを占める。多くは内陸の日本海側で栽培される。",
  ),
  q(
    4,
    "Hokkaidō's shape on a map is sometimes compared to which everyday object because of its rounded body and narrow southwestern peninsula?|¿Con qué objeto cotidiano se compara a veces la forma de Hokkaidō en un mapa, por su cuerpo redondeado y su estrecha península suroeste?|À quel objet du quotidien la forme d'Hokkaidō sur une carte est-elle parfois comparée, en raison de son corps arrondi et de sa péninsule étroite au sud-ouest ?|地図上の北海道の形は、丸みを帯びた本体と細く伸びる南西の半島のせいで、しばしば何にたとえられるか?",
    [
      "A stingray or manta ray|Una raya o manta|Une raie ou une raie manta|エイ(マンタ)",
      "A teapot|Una tetera|Une théière|急須",
      "A crescent moon|Una luna creciente|Un croissant de lune|三日月",
    ],
    0,
    "Guidebooks and school textbooks in Japan often note the resemblance, with the Oshima Peninsula reaching south-west like a ray's tail toward Honshu.|Las guías y los libros de texto escolares en Japón suelen señalar el parecido, con la península de Oshima extendiéndose hacia el suroeste, como la cola de una raya, en dirección a Honshu.|Les guides et manuels scolaires japonais relèvent souvent la ressemblance, la péninsule d'Oshima s'étirant vers le sud-ouest comme la queue d'une raie en direction de Honshu.|日本の観光案内や教科書ではこの形がよく話題になり、渡島半島はエイの尾のように本州へ向かって南西へ伸びている。",
  ),
  q(
    6,
    "Hokkaidō's wind and solar potential has made it a focus of Japan's renewable energy push, but the island's biggest obstacle to using that power has generally been:|El potencial eólico y solar de Hokkaidō la ha convertido en un foco del impulso japonés a las renovables, pero el mayor obstáculo de la isla para aprovechar esa energía ha sido en general:|Le potentiel éolien et solaire d'Hokkaidō en a fait un axe majeur de l'essor des énergies renouvelables au Japon, mais le plus grand obstacle de l'île à l'utilisation de cette énergie a généralement été :|北海道の風力・太陽光の潜在力は日本の再生可能エネルギー推進の焦点となってきたが、その電力を活かすうえで島最大の障害とされてきたのは?",
    [
      "Limited transmission capacity to send power to Honshu|La capacidad limitada de transmisión para enviar energía a Honshu|Une capacité de transport limitée pour envoyer l'électricité vers Honshu|本州へ送るための送電容量の不足",
      "A complete lack of suitable land|Una falta total de terreno adecuado|Une absence totale de terrain adapté|適した土地がまったく無いこと",
      "A ban on wind turbines near the coast|Una prohibición de turbinas eólicas cerca de la costa|Une interdiction des éoliennes près de la côte|沿岸での風車設置の禁止",
    ],
    0,
    "Much of the electricity Hokkaidō could generate from wind and solar would need to reach the much larger consumer base on Honshu, but the undersea cable linking the two islands' grids has limited capacity, so new transmission lines have become a major infrastructure project in their own right.|Buena parte de la electricidad que Hokkaidō podría generar con energía eólica y solar tendría que llegar a la base de consumidores mucho mayor de Honshu, pero el cable submarino que une las redes de ambas islas tiene capacidad limitada, por lo que las nuevas líneas de transmisión se han convertido en un proyecto de infraestructura importante por derecho propio.|Une grande partie de l'électricité qu'Hokkaidō pourrait produire grâce à l'éolien et au solaire devrait atteindre la base de consommateurs bien plus importante de Honshu, mais le câble sous-marin reliant les réseaux des deux îles a une capacité limitée, si bien que de nouvelles lignes de transport sont devenues un projet d'infrastructure majeur en soi.|北海道が風力や太陽光で発電できる電力の多くは、はるかに消費者の多い本州へ送る必要があるが、両島の系統をつなぐ海底ケーブルの容量には限りがある。そのため新たな送電線の整備自体が大きなインフラ事業になっている。",
  ),
  q(
    3,
    "What is the collective Japanese term for the herring-boom mansions built by wealthy fishing bosses along Hokkaidō's coast in the nineteenth and early twentieth centuries?|¿Cuál es el término japonés colectivo para las mansiones del auge del arenque, construidas por adinerados patrones de pesca en la costa de Hokkaidō en los siglos XIX y principios del XX?|Quel est le terme japonais collectif pour les demeures de l'âge d'or du hareng, bâties par de riches patrons pêcheurs le long de la côte d'Hokkaidō aux XIXe et début du XXe siècles?|19世紀から20世紀初頭、北海道沿岸の裕福な漁業経営者が建てた鰊漁全盛期の豪邸群は、日本語でまとめて何と呼ばれるか?",
    [
      "Nishin goten (herring mansions)|Nishin goten (mansiones del arenque)|Nishin goten (demeures du hareng)|鰊御殿",
      "Kura-yashiki (storehouse residences)|Kura-yashiki (residencias de almacén)|Kura-yashiki (résidences-entrepôts)|蔵屋敷",
      "Shoin-zukuri (study-style halls)|Shoin-zukuri (salones de estilo estudio)|Shoin-zukuri (salles de style bureau)|書院造",
    ],
    0,
    "Combining a family residence with dormitories for the seasonal fishing crews who worked the herring nets, these buildings could house over a hundred workers at once during the spring catch, and several survive today as museums along the coast.|Combinando la residencia familiar con dormitorios para las cuadrillas de pesca estacionales que trabajaban las redes de arenque, estos edificios podían albergar a más de cien trabajadores a la vez durante la temporada de pesca de primavera, y varios se conservan hoy como museos en la costa.|Combinant résidence familiale et dortoirs pour les équipes de pêche saisonnières travaillant les filets à hareng, ces bâtiments pouvaient héberger plus d'une centaine de travailleurs à la fois pendant la saison de pêche printanière, et plusieurs subsistent aujourd'hui en musées le long de la côte.|家族の住まいと、鰊の網を扱う季節労働者の宿舎を兼ねたこの建物は、春の漁の最盛期には百人を超える働き手を一度に住まわせることもあった。いくつかは今も沿岸に博物館として残っている。",
  ),
  q(
    7,
    "Which of the following JR Hokkaidō lines remains fully open today, still carrying passengers along its entire original route between Higashi-Kushiro and Abashiri via the Shiretoko area?|¿Cuál de las siguientes líneas de JR Hokkaidō sigue totalmente abierta hoy, transportando aún pasajeros por toda su ruta original entre Higashi-Kushiro y Abashiri, vía la zona de Shiretoko?|Laquelle des lignes JR Hokkaidō suivantes reste entièrement ouverte aujourd'hui, transportant encore des passagers sur tout son tracé d'origine entre Higashi-Kushiro et Abashiri, via la région de Shiretoko ?|東釧路―網走間を知床方面経由で結ぶ、いまも全区間が旅客営業を続けているJR北海道の路線は?",
    [
      "The Senmō Main Line|La línea principal Senmō|La ligne principale Senmō|釧網本線",
      "The Shibetsu Line|La línea Shibetsu|La ligne Shibetsu|標津線",
      "The Rumoi Main Line|La línea principal Rumoi|La ligne principale Rumoi|留萌本線",
    ],
    0,
    "Running along the edge of the Kushiro wetlands and past Lake Mashu before reaching the Okhotsk coast, the Senmō Main Line has so far avoided the fate of many of JR Hokkaidō's other rural branches.|Recorriendo el borde de los humedales de Kushiro y pasando por el lago Mashu antes de llegar a la costa de Ojotsk, la línea principal Senmō ha evitado hasta ahora el destino de muchos otros ramales rurales de JR Hokkaidō.|Longeant la lisière des zones humides de Kushiro et passant près du lac Mashu avant d'atteindre la côte d'Okhotsk, la ligne principale Senmō a jusqu'ici évité le sort de nombreuses autres lignes rurales de JR Hokkaidō.|釧路湿原の縁をたどり、摩周湖のそばを通ってオホーツク海岸に至る釧網本線は、JR北海道の他の多くの地方路線がたどった運命をいまのところ免れている。",
  ),
  q(
    8,
    "The Hidaka Main Line, which once ran along Hokkaidō's Pacific coast toward Cape Erimo, permanently closed its southern section (Urakawa–Samani) in 2021, years after service there was first suspended in what year by storm damage?|La línea principal Hidaka, que antes recorría la costa del Pacífico de Hokkaidō hacia el cabo Erimo, cerró permanentemente su tramo sur (Urakawa–Samani) en 2021, años después de que el servicio se suspendiera por primera vez por daños de una tormenta. ¿En qué año?|La ligne principale Hidaka, qui longeait autrefois la côte pacifique d'Hokkaidō vers le cap Erimo, ferma définitivement sa section sud (Urakawa–Samani) en 2021, des années après que le service y eut été suspendu pour la première fois à cause de dégâts causés par une tempête. En quelle année ?|かつて北海道の太平洋岸を襟裳岬方面へ走っていた日高本線は、2021年に南側の区間(浦河―様似間)を正式に廃止した。この区間の運行が暴風被害で最初に止まったのは何年か?",
    [
      "2015|2015|2015|2015年",
      "2005|2005|2005|2005年",
      "1995|1995|1995|1995年",
    ],
    0,
    "A powerful storm in January 2015 washed out sections of track along the exposed coastline, and JR Hokkaidō ran replacement buses for six years while deciding whether to rebuild before finally opting for permanent closure.|Una fuerte tormenta en enero de 2015 arrasó tramos de vía a lo largo de la costa expuesta, y JR Hokkaidō operó autobuses sustitutos durante seis años mientras decidía si reconstruir, antes de optar finalmente por el cierre permanente.|Une violente tempête de janvier 2015 emporta des tronçons de voie le long de cette côte exposée, et JR Hokkaidō fit circuler des bus de remplacement pendant six ans en réfléchissant à une reconstruction, avant d'opter finalement pour la fermeture définitive.|2015年1月の暴風で、外洋に面したこの区間の線路が各所で流失した。JR北海道は復旧するかどうかを検討しながら6年間代行バスを走らせたが、最終的に正式な廃止を選んだ。",
  ),

  // ----------------------------------------------------------------------
  // 補足2(難易度2〜7)
  // ----------------------------------------------------------------------
  q(
    2,
    "Which grazing animal, alongside dairy cattle, is also raised in parts of Hokkaidō for wool and meat, tying back to the island's early twentieth-century sheep-farming push?|¿Qué animal de pastoreo, además del ganado lechero, también se cría en partes de Hokkaidō para lana y carne, en relación con el impulso a la cría de ovejas de la isla a principios del siglo XX?|Quel animal d'élevage, en plus du bétail laitier, est aussi élevé dans certaines régions d'Hokkaidō pour la laine et la viande, en lien avec l'essor de l'élevage ovin de l'île au début du XXe siècle ?|酪農牛と並んで、20世紀初頭の羊毛政策の名残として北海道の一部で羊毛や食肉のために飼われている家畜は?",
    [
      "Sheep|Ovejas|Moutons|羊",
      "Goats|Cabras|Chèvres|ヤギ",
      "Alpacas|Alpacas|Alpagas|アルパカ",
    ],
    0,
    "Government-run sheep farms were established across Hokkaidō from the 1900s to supply wool for military uniforms, and though the industry shrank after synthetic fibres took over, some flocks and their pastures remain today as tourist farms.|Se establecieron granjas ovinas gestionadas por el gobierno en toda Hokkaidō desde la década de 1900 para abastecer de lana a los uniformes militares, y aunque la industria se redujo tras la llegada de las fibras sintéticas, algunos rebaños y sus pastos se conservan hoy como granjas turísticas.|Des fermes ovines publiques furent créées à travers Hokkaidō à partir des années 1900 pour fournir la laine des uniformes militaires, et bien que l'industrie ait décliné après l'avènement des fibres synthétiques, certains troupeaux et leurs pâturages subsistent aujourd'hui comme fermes touristiques.|1900年代以降、軍服用の羊毛を供給するため北海道各地に官営の牧羊場が設けられた。合成繊維の普及で産業は縮小したが、いまも一部の羊群と牧場は観光牧場として残っている。",
  ),
  q(
    3,
    "Which Hokkaidō vegetable, a large white radish-like root, is also a common winter hot-pot ingredient across Japan?|¿Qué verdura de Hokkaidō, una gran raíz blanca parecida a un rábano, es también un ingrediente habitual de las ollas calientes de invierno en todo Japón?|Quel légume d'Hokkaidō, une grande racine blanche ressemblant à un radis, est aussi un ingrédient courant des marmites d'hiver dans tout le Japon ?|大きな白い根で、日本各地の冬の鍋料理にもよく使われる、北海道でも栽培される野菜は?",
    [
      "Daikon|Daikon|Daikon|大根",
      "Taro|Taro|Taro|里芋",
      "Lotus root|Raíz de loto|Racine de lotus|蓮根",
    ],
    0,
    "Hokkaidō's cool climate and long daylight hours in summer suit daikon well, and the island is one of Japan's largest producers, much of it destined for pickling as well as fresh use.|El clima fresco de Hokkaidō y las largas horas de luz solar en verano favorecen bien al daikon, y la isla es una de las mayores productoras de Japón, buena parte destinada a encurtidos además de al consumo fresco.|Le climat frais d'Hokkaidō et les longues heures d'ensoleillement estival conviennent bien au daikon, et l'île est l'une des plus grandes productrices du Japon, une grande partie étant destinée au marinage autant qu'à la consommation fraîche.|北海道の冷涼な気候と夏の長い日照時間は大根の栽培に適しており、島は日本有数の産地で、生食のほか漬物用にも多く出荷される。",
  ),
  q(
    5,
    "Hokkaidō's fishing fleets historically pursued which large marine mammal off the Sea of Okhotsk coast before international agreements sharply curtailed the practice?|¿Qué gran mamífero marino perseguían históricamente las flotas pesqueras de Hokkaidō frente a la costa del mar de Ojotsk, antes de que acuerdos internacionales restringieran fuertemente esa práctica?|Quel grand mammifère marin les flottes de pêche d'Hokkaidō poursuivaient-elles historiquement au large de la côte de la mer d'Okhotsk, avant que des accords internationaux ne restreignent fortement cette pratique ?|国際的な取り決めで大きく制限される以前、北海道の漁船団がオホーツク海沖で歴史的に追ってきた大型の海洋哺乳類は?",
    [
      "Whales|Ballenas|Baleines|クジラ",
      "Manatees|Manatíes|Lamantins|マナティー",
      "Walruses|Morsas|Morses|セイウチ",
    ],
    0,
    "Coastal whaling stations operated at several Hokkaidō ports through the twentieth century, and though commercial whaling shrank dramatically after the 1980s moratorium, Japan resumed limited commercial whaling within its own waters in 2019.|Estaciones balleneras costeras operaron en varios puertos de Hokkaidō a lo largo del siglo XX, y aunque la caza comercial de ballenas se redujo drásticamente tras la moratoria de los años 80, Japón reanudó una caza comercial limitada en sus propias aguas en 2019.|Des stations baleinières côtières fonctionnèrent dans plusieurs ports d'Hokkaidō tout au long du XXe siècle, et bien que la chasse commerciale à la baleine ait fortement décliné après le moratoire des années 1980, le Japon a repris une chasse commerciale limitée dans ses propres eaux en 2019.|20世紀を通じて北海道の複数の港で沿岸捕鯨基地が操業していた。1980年代のモラトリアムで商業捕鯨は大きく縮小したが、日本は2019年に自国の水域内で限定的な商業捕鯨を再開した。",
  ),
  q(
    4,
    "Which Hokkaidō industry, centred on processing timber floated down from interior forests, made Tomakomai one of Japan's leading manufacturing centres for a single product?|¿Qué industria de Hokkaidō, centrada en procesar la madera transportada desde los bosques del interior, convirtió a Tomakomai en uno de los principales centros de fabricación de Japón para un solo producto?|Quelle industrie d'Hokkaidō, centrée sur la transformation du bois flotté depuis les forêts de l'intérieur, fit de Tomakomai l'un des principaux centres de fabrication du Japon pour un seul produit ?|内陸の森から流送される木材の加工を中心に、苫小牧を単一製品では日本有数の生産拠点にした産業は?",
    [
      "Paper and pulp|Papel y pasta de papel|Papier et pâte à papier|製紙・パルプ",
      "Furniture making|Fabricación de muebles|Fabrication de meubles|家具製造",
      "Shipbuilding|Construcción naval|Construction navale|造船",
    ],
    0,
    "A pulp mill built in 1910 anchored an industry that still supplies a large share of Japan's newsprint and packaging paper, drawing on the forests of the surrounding Tokachi and Hidaka regions.|Una fábrica de pasta de papel construida en 1910 ancló una industria que aún abastece buena parte del papel de periódico y de embalaje de Japón, aprovechando los bosques de las regiones circundantes de Tokachi e Hidaka.|Une usine de pâte à papier construite en 1910 ancra une industrie qui fournit encore une grande part du papier journal et d'emballage du Japon, puisant dans les forêts des régions environnantes de Tokachi et Hidaka.|1910年に建てられた製紙工場が礎となり、いまも日本の新聞用紙や包装紙の多くを供給する産業がここに根付いた。原料は周辺の十勝・日高地方の森林から得ている。",
  ),
  q(
    6,
    "The 1986 Asian Winter Games, a major multi-sport event, were hosted for the first time by which Hokkaidō city, fourteen years after its Winter Olympics?|Los Juegos Asiáticos de Invierno de 1986, un gran evento multideportivo, se celebraron por primera vez en qué ciudad de Hokkaidō, catorce años después de sus Juegos Olímpicos de Invierno?|Les Jeux asiatiques d'hiver de 1986, un grand événement multisports, furent accueillis pour la première fois par quelle ville d'Hokkaidō, quatorze ans après ses Jeux olympiques d'hiver ?|1972年の冬季オリンピックから14年後、初めての冬季アジア大会という大規模な総合競技大会を開いた北海道の都市は?",
    [
      "Sapporo|Sapporo|Sapporo|札幌",
      "Asahikawa|Asahikawa|Asahikawa|旭川",
      "Kushiro|Kushiro|Kushiro|釧路",
    ],
    0,
    "Sapporo reused much of the venue infrastructure built for the 1972 Olympics, and it went on to host the Asian Winter Games again in 1990 and 2017, making it one of the event's most frequent hosts.|Sapporo reutilizó buena parte de la infraestructura construida para los Juegos Olímpicos de 1972, y volvió a acoger los Juegos Asiáticos de Invierno en 1990 y 2017, convirtiéndose en una de las sedes más frecuentes del evento.|Sapporo réutilisa une grande partie des infrastructures bâties pour les Jeux olympiques de 1972, et accueillit à nouveau les Jeux asiatiques d'hiver en 1990 et 2017, devenant l'un des hôtes les plus fréquents de l'événement.|札幌は1972年の五輪で建てた施設の多くを再利用し、その後も1990年・2017年と冬季アジア大会を重ねて開き、この大会をもっとも多く主催した都市の一つになった。",
  ),
  q(
    7,
    "Which JR Hokkaidō line still links Wakkanai to the rest of the network today, running the length of the island's interior from Asahikawa?|¿Qué línea de JR Hokkaidō sigue uniendo hoy Wakkanai con el resto de la red, recorriendo el interior de la isla desde Asahikawa?|Quelle ligne JR Hokkaidō relie encore aujourd'hui Wakkanai au reste du réseau, traversant l'intérieur de l'île depuis Asahikawa ?|今も稚内と鉄道網の他の部分を結び、旭川から島の内陸を縦断するJR北海道の路線は?",
    [
      "The Sōya Main Line|La línea principal Sōya|La ligne principale Sōya|宗谷本線",
      "The Rumoi Main Line|La línea principal Rumoi|La ligne principale Rumoi|留萌本線",
      "The Nemuro Main Line|La línea principal Nemuro|La ligne principale Nemuro|根室本線",
    ],
    0,
    "At just over 259 km, the Sōya Main Line is one of Japan's longest single rail lines still fully in service, though ridership on its northern stretches is thin enough that some stations see only a handful of passengers a day.|Con poco más de 259 km, la línea principal Sōya es una de las líneas ferroviarias individuales más largas de Japón que aún están en pleno servicio, aunque el número de pasajeros en sus tramos del norte es tan escaso que algunas estaciones ven solo un puñado de viajeros al día.|Avec un peu plus de 259 km, la ligne principale Sōya est l'une des plus longues lignes ferroviaires uniques du Japon encore pleinement en service, bien que la fréquentation sur ses tronçons nord soit si faible que certaines gares ne voient qu'une poignée de voyageurs par jour.|全長259kmあまりの宗谷本線は、いまも全区間で営業を続ける日本有数の長さの単独路線だが、北部区間の利用は少なく、1日の乗降がわずか数人という駅もある。",
  ),

  // ----------------------------------------------------------------------
  // 補足3(難易度1〜9)
  // ----------------------------------------------------------------------
  q(
    1,
    "Which of these is a real Hokkaidō prefectural symbol placed on official vehicles and signage, alongside the crane and the fox?|¿Cuál de estos es un símbolo oficial de la prefectura de Hokkaidō, colocado en vehículos y señalización oficiales, junto a la grulla y el zorro?|Lequel de ces éléments est un véritable symbole officiel de la préfecture d'Hokkaidō, apposé sur les véhicules et la signalétique officiels, aux côtés de la grue et du renard ?|グルーやキツネと並んで、公用の乗り物や標識に使われる北海道の実在の象徴は?",
    [
      "A stylised snow crystal|Un copo de nieve estilizado|Un flocon de neige stylisé|雪の結晶をデザインしたもの",
      "A cherry blossom|Una flor de cerezo|Une fleur de cerisier|桜の花",
      "A dragon|Un dragón|Un dragon|龍",
    ],
    0,
    "Hokkaidō's emblem, adopted in 1968 to mark a century since the island's renaming, is a stylised seven-pointed snow crystal in a circle, referencing the island's long, snowy winters.|El emblema de Hokkaidō, adoptado en 1968 para conmemorar un siglo desde el cambio de nombre de la isla, es un cristal de nieve estilizado de siete puntas dentro de un círculo, en referencia a los largos e nevados inviernos de la isla.|L'emblème d'Hokkaidō, adopté en 1968 pour marquer un siècle depuis le changement de nom de l'île, est un cristal de neige stylisé à sept branches inscrit dans un cercle, évoquant les longs hivers neigeux de l'île.|北海道のシンボルマークは、島の改称から100年を記念して1968年に制定された、円の中に描かれた七つの角を持つ雪の結晶の意匠で、長く雪深い冬にちなむ。",
  ),
  q(
    3,
    "Which small, round-faced mammal, a relative of the rabbit that does not hibernate and instead stores dried plants for winter, lives on Hokkaidō's high mountain rockslides?|¿Qué pequeño mamífero de cara redonda, pariente del conejo que no hiberna y en su lugar almacena plantas secas para el invierno, vive en los pedregales de alta montaña de Hokkaidō?|Quel petit mammifère au visage rond, apparenté au lapin, qui n'hiberne pas mais stocke des plantes séchées pour l'hiver, vit dans les éboulis de haute montagne d'Hokkaidō ?|冬眠せず、代わりに干した植物を蓄えて冬を越す、北海道の高山の岩場にすむウサギの仲間の小さな丸顔の哺乳類は?",
    [
      "The Northern pika|La pika del norte|Le pika du Nord|エゾナキウサギ",
      "The Arctic hare|La liebre ártica|Le lièvre arctique|ホッキョクウサギ",
      "The chinchilla|La chinchilla|Le chinchilla|チンチラ",
    ],
    0,
    "A relic of the last ice age, this pika survives only in cool, rocky habitats at altitude, since it cannot tolerate warm temperatures for long, making it a closely watched indicator species for climate change on the island.|Reliquia de la última glaciación, esta pika sobrevive solo en hábitats rocosos y frescos de altitud, ya que no tolera bien las temperaturas cálidas durante mucho tiempo, lo que la convierte en una especie indicadora del cambio climático muy vigilada en la isla.|Vestige de la dernière glaciation, ce pika ne survit que dans des habitats rocheux frais en altitude, car il ne supporte pas longtemps les températures chaudes, ce qui en fait une espèce indicatrice du changement climatique étroitement surveillée sur l'île.|最終氷期の生き残りとされるこのナキウサギは、高温に長く耐えられないため、標高の高い冷涼な岩場にしか生息できない。そのため島では気候変動の指標種として注視されている。",
  ),
  q(
    5,
    "Hokkaidō's wide farm fields, unlike the small paddies typical of most of Japan, are a direct legacy of colonisation-era land planning modelled loosely on farms in which country?|Los amplios campos de cultivo de Hokkaidō, a diferencia de los pequeños arrozales típicos de la mayor parte de Japón, son un legado directo de la planificación de tierras de la era de colonización, inspirada libremente en las granjas de qué país?|Les vastes champs cultivés d'Hokkaidō, contrairement aux petites rizières typiques du reste du Japon, sont un héritage direct de la planification foncière de l'ère de la colonisation, vaguement inspirée des fermes de quel pays ?|日本の他地域に多い小さな水田とは異なる北海道の広大な畑は、植民地時代の土地計画の直接の名残であり、ゆるやかにどの国の農場を手本にしたものか?",
    [
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ",
      "France|Francia|La France|フランス",
    ],
    0,
    "American advisers hired by the Kaitakushi, including Horace Capron, pushed for large, rectangular fields worked with horse-drawn machinery rather than the small, hand-tended rice paddies found further south, and that grid of farmland is still visible from the air today.|Los asesores estadounidenses contratados por el Kaitakushi, incluido Horace Capron, impulsaron campos grandes y rectangulares trabajados con maquinaria tirada por caballos, en vez de los pequeños arrozales cultivados a mano de más al sur, y esa cuadrícula de tierras de cultivo sigue siendo visible desde el aire hoy.|Les conseillers américains engagés par le Kaitakushi, dont Horace Capron, poussèrent à créer de grands champs rectangulaires travaillés à la machine tractée par des chevaux plutôt que les petites rizières cultivées à la main plus au sud, et ce quadrillage de terres agricoles reste visible depuis les airs aujourd'hui.|開拓使が雇ったホーレス・ケプロンらアメリカ人顧問は、南方に見られる手作業の小さな水田ではなく、馬耕の機械で耕す大きな長方形の畑を推し進めた。その碁盤目状の農地は、いまも空から見て分かる。",
  ),
  q(
    6,
    "Which Hokkaidō company, founded in Sapporo in 1876 as a government-run brewery under the Kaitakushi, is one of Japan's oldest beer brands still in production?|¿Qué empresa de Hokkaidō, fundada en Sapporo en 1876 como cervecería estatal bajo el Kaitakushi, es una de las marcas de cerveza más antiguas de Japón que aún se produce?|Quelle entreprise d'Hokkaidō, fondée à Sapporo en 1876 comme brasserie publique sous le Kaitakushi, est l'une des plus anciennes marques de bière du Japon encore en production ?|1876年、開拓使の官営醸造所として札幌で創業し、いまも生産が続く日本最古級のビール銘柄を持つ企業は?",
    [
      "Sapporo Breweries|Sapporo Breweries|Sapporo Breweries|サッポロビール",
      "Asahi Breweries|Asahi Breweries|Asahi Breweries|アサヒビール",
      "Kirin Brewery|Kirin Brewery|Kirin Brewery|キリンビール",
    ],
    0,
    "The Kaitakushi brewery used German brewing methods and Hokkaidō-grown hops, and its red star emblem, taken from the flag once used to mark Kaitakushi property, still appears on the label today.|La cervecería del Kaitakushi usaba métodos de elaboración alemanes y lúpulo cultivado en Hokkaidō, y su emblema de estrella roja, tomado de la bandera que antes marcaba las propiedades del Kaitakushi, todavía aparece en la etiqueta hoy.|La brasserie du Kaitakushi utilisait des méthodes de brassage allemandes et du houblon cultivé à Hokkaidō, et son emblème à étoile rouge, repris du drapeau utilisé autrefois pour marquer les biens du Kaitakushi, figure encore sur l'étiquette aujourd'hui.|開拓使の醸造所はドイツ式の製法と北海道産のホップを用いた。かつて開拓使の所有物の目印だった旗から取られた赤い星の意匠は、今もラベルに使われている。",
  ),
  q(
    8,
    "Matsumae domain's monopoly on Ainu trade operated through a system of assigned coastal territories, each leased to a merchant contractor, known as:|El monopolio del dominio de Matsumae sobre el comercio con los ainu funcionaba mediante un sistema de territorios costeros asignados, cada uno arrendado a un comerciante contratista, conocido como:|Le monopole du domaine de Matsumae sur le commerce aïnou fonctionnait via un système de territoires côtiers assignés, chacun loué à un marchand contractant, connu sous le nom de :|松前藩によるアイヌ交易の独占は、それぞれ商人請負人に貸し与えられた沿岸の区域を割り当てる仕組みで運営された。この仕組みは何と呼ばれるか?",
    [
      "The basho ukeoi (contract-place) system|El sistema basho ukeoi (lugar de contrato)|Le système basho ukeoi (lieu sous contrat)|場所請負制",
      "The han-fuko (domain tribute) system|El sistema han-fuko (tributo del dominio)|Le système han-fuko (tribut du domaine)|藩賦課制",
      "The goningumi (five-household group) system|El sistema goningumi (grupo de cinco hogares)|Le système goningumi (groupe de cinq foyers)|五人組制",
    ],
    0,
    "Under this system, merchants paid the domain for the right to trade at a given coastal \"place\" (basho), and over time many merchants pressed Ainu labourers into fishing and processing work under conditions historians describe as close to forced labour.|Bajo este sistema, los comerciantes pagaban al dominio por el derecho a comerciar en un «lugar» (basho) costero determinado, y con el tiempo muchos comerciantes obligaron a trabajadores ainu a pescar y procesar bajo condiciones que los historiadores describen como cercanas al trabajo forzado.|Sous ce système, les marchands payaient au domaine le droit de commercer en un « lieu » (basho) côtier donné, et avec le temps, de nombreux marchands contraignirent des travailleurs aïnous à la pêche et à la transformation dans des conditions que les historiens qualifient de proches du travail forcé.|この制度のもとで商人は沿岸の特定の「場所」で交易する権利を藩に対価を払って得た。時代が下ると、多くの商人はアイヌの人々を漁労や加工の労働に従事させ、歴史家はその実態を強制労働に近いものだったと説明している。",
  ),
  q(
    9,
    "The 1789 uprising in which Ainu communities on Hokkaidō's eastern coast killed dozens of Japanese merchants and officials, in response to harsh treatment under the basho system, is known as the:|El levantamiento de 1789, en el que comunidades ainu de la costa este de Hokkaidō mataron a decenas de comerciantes y funcionarios japoneses en respuesta al duro trato bajo el sistema basho, se conoce como:|Le soulèvement de 1789, au cours duquel des communautés aïnoues de la côte est d'Hokkaidō tuèrent des dizaines de marchands et fonctionnaires japonais en réponse aux mauvais traitements subis sous le système basho, est connu sous le nom de :|1789年、場所請負制のもとでの過酷な扱いに対し、道東のアイヌの人々が日本人商人や役人数十人を殺害した蜂起は何と呼ばれるか?",
    [
      "The Menashi–Kunashiri Battle|La Batalla de Menashi–Kunashiri|La bataille de Menashi–Kunashiri|クナシリ・メナシの戦い",
      "The Shakushain War|La guerra de Shakushain|La guerre de Shakushain|シャクシャインの戦い",
      "The Kaitakushi Rebellion|La Rebelión del Kaitakushi|La rébellion du Kaitakushi|開拓使の乱",
    ],
    0,
    "Centred on the Nemuro area and Kunashiri island, the uprising was put down within weeks by Matsumae forces, and dozens of Ainu leaders were executed; it came over a century after an earlier, larger revolt led by the Ainu chief Shakushain in 1669.|Centrado en la zona de Nemuro y la isla de Kunashiri, el levantamiento fue sofocado en semanas por las fuerzas de Matsumae, y decenas de líderes ainu fueron ejecutados; ocurrió más de un siglo después de una revuelta anterior y mayor liderada por el jefe ainu Shakushain en 1669.|Centré sur la région de Nemuro et l'île de Kunashiri, le soulèvement fut réprimé en quelques semaines par les forces de Matsumae, et des dizaines de chefs aïnous furent exécutés ; il survint plus d'un siècle après une révolte antérieure et plus vaste menée par le chef aïnou Shakushain en 1669.|根室方面と国後島を中心としたこの蜂起は、松前藩の軍勢によって数週間で鎮圧され、数十人のアイヌの首長が処刑された。これは1669年、アイヌの首長シャクシャインが率いたより大規模な蜂起から1世紀以上のちのことである。",
  ),

  // ----------------------------------------------------------------------
  // 補足4(難易度2〜8)
  // ----------------------------------------------------------------------
  q(
    2,
    "Which hot beverage, made from roasted grain rather than beans, became a wartime substitute in Japan and remains a minor Hokkaidō specialty today?|¿Qué bebida caliente, hecha de grano tostado en vez de granos de café, se convirtió en un sustituto de guerra en Japón y sigue siendo hoy una pequeña especialidad de Hokkaidō?|Quelle boisson chaude, faite de céréales grillées plutôt que de grains, devint un substitut de guerre au Japon et reste aujourd'hui une petite spécialité d'Hokkaidō ?|コーヒー豆ではなく穀物を焙煎して作り、戦時の代用品として広まり、いまも北海道の小さな名物として残る温かい飲み物は?",
    [
      "Barley \"coffee\" (mugi-cha style roasted grain drink)|«Café» de cebada (bebida de grano tostado tipo mugi-cha)|« Café » d'orge (boisson de céréale grillée type mugi-cha)|大麦を使った「コーヒー」(麦こがし系の穀物飲料)",
      "Matcha|Matcha|Matcha|抹茶",
      "Amazake|Amazake|Amazake|甘酒",
    ],
    0,
    "With imported coffee scarce during and after the Second World War, roasted barley and other grains grown on Hokkaidō's farms were ground and brewed as a substitute, a habit some rural cafes still keep alive as a novelty.|Con el café importado escaso durante y después de la Segunda Guerra Mundial, la cebada tostada y otros granos cultivados en las granjas de Hokkaidō se molían y preparaban como sustituto, una costumbre que algunos cafés rurales aún mantienen como curiosidad.|Le café importé étant rare pendant et après la Seconde Guerre mondiale, l'orge grillée et d'autres céréales cultivées dans les fermes d'Hokkaidō étaient moulues et infusées en guise de substitut, une habitude que certains cafés ruraux perpétuent encore par curiosité.|第二次大戦中から戦後にかけて輸入コーヒーが乏しかったため、北海道の畑で穫れた大麦などの穀物を焙煎して挽き、代用品として飲まれた。いまも一部の田舎の喫茶店ではこれを珍しいメニューとして出している。",
  ),
  q(
    4,
    "Which Hokkaidō city, home to a major air base and airport, straddles land that was largely reclaimed marshland before Meiji-era drainage projects?|¿Qué ciudad de Hokkaidō, sede de una importante base aérea y aeropuerto, ocupa terreno que era en gran parte un pantano recuperado antes de los proyectos de drenaje de la era Meiji?|Quelle ville d'Hokkaidō, abritant une importante base aérienne et un aéroport, s'étend sur des terres qui étaient en grande partie des marécages asséchés avant les projets de drainage de l'ère Meiji?|大規模な空港と基地を抱える北海道の都市で、明治期の排水事業以前は大部分が湿地だった土地に広がっているのは?",
    [
      "Chitose|Chitose|Chitose|千歳",
      "Kutchan|Kutchan|Kutchan|倶知安",
      "Esashi|Esashi|Esashi|江差",
    ],
    0,
    "The flat, low-lying land around Chitose that made it attractive for a long modern runway was originally wetland drained and settled only in the late nineteenth century, much like large parts of the Ishikari plain further north.|El terreno plano y bajo alrededor de Chitose, que lo hizo atractivo para una larga pista moderna, era originalmente un humedal drenado y colonizado solo a finales del siglo XIX, como buena parte de la llanura de Ishikari más al norte.|Le terrain plat et bas autour de Chitose, qui le rendit propice à une longue piste moderne, était à l'origine une zone humide drainée et colonisée seulement à la fin du XIXe siècle, comme une grande partie de la plaine d'Ishikari plus au nord.|長い滑走路を敷くのに適した千歳周辺の平坦な低地は、もとは湿地で、19世紀後半になってようやく排水され入植が進んだ土地である。より北の石狩平野の広い部分も同様だった。",
  ),
  q(
    6,
    "Which of these describes Hokkaidō's relationship to Japan's rice self-sufficiency effort during the Cold War, when the national government paid farmers to convert rice paddies to other crops?|¿Cuál de estas describe la relación de Hokkaidō con el esfuerzo de autosuficiencia arrocera de Japón durante la Guerra Fría, cuando el gobierno nacional pagaba a los agricultores para convertir arrozales en otros cultivos?|Laquelle de ces propositions décrit le rapport d'Hokkaidō à l'effort japonais d'ajustement de la production de riz pendant la Guerre froide, lorsque le gouvernement national payait les agriculteurs pour convertir les rizières en d'autres cultures ?|冷戦期、国が農家に水田を他の作物へ転換させる補助金を出して米の生産調整を進めたとき、北海道はどう関わっていたか?",
    [
      "Hokkaidō, a relatively new rice-growing region, was hit hard by the policy despite having only recently bred rice varieties suited to its cold climate|Hokkaidō, una región arrocera relativamente nueva, se vio muy afectada por la política, a pesar de haber desarrollado hace poco variedades de arroz aptas para su clima frío|Hokkaidō, région rizicole relativement récente, fut durement touchée par cette politique, alors qu'elle venait tout juste de développer des variétés de riz adaptées à son climat froid|冷涼な気候向けの品種をようやく生み出したばかりの新しい稲作地帯だった北海道は、この政策で大きな打撃を受けた",
      "Hokkaidō was entirely exempt from the policy because it grew no rice at all|Hokkaidō estaba totalmente exenta de la política porque no cultivaba arroz en absoluto|Hokkaidō fut totalement exemptée de la politique car elle ne cultivait aucun riz|北海道はそもそも米を作っていなかったため、この政策の対象外だった",
      "The policy applied only to Honshu and never affected Hokkaidō's farms|La política se aplicó solo a Honshu y nunca afectó a las granjas de Hokkaidō|La politique ne s'appliqua qu'à Honshu et n'affecta jamais les fermes d'Hokkaidō|この政策は本州のみが対象で、北海道の農家には及ばなかった",
    ],
    0,
    "Breeders had spent decades developing cold-hardy rice strains to let Hokkaidō grow rice at all, and the 1970s policy of paying farmers to switch out of rice (gentan) hit those same farms just as the effort was finally paying off.|Los mejoradores habían pasado décadas desarrollando variedades de arroz resistentes al frío para que Hokkaidō pudiera cultivarlo, y la política de los años 70 de pagar a los agricultores para dejar el arroz (gentan) golpeó esas mismas granjas justo cuando el esfuerzo empezaba a dar fruto.|Les sélectionneurs avaient passé des décennies à développer des variétés de riz résistantes au froid pour permettre à Hokkaidō d'en cultiver, et la politique des années 1970 consistant à payer les agriculteurs pour abandonner le riz (gentan) frappa ces mêmes fermes juste au moment où l'effort commençait à porter ses fruits.|品種改良者たちは何十年もかけて北海道でも育つ耐寒性の稲を作り出したが、1970年代に米から他作物への転換に補助金を出す減反政策が始まると、その努力がようやく実を結び始めた矢先にこれらの農家が直撃を受けた。",
  ),
  q(
    3,
    "Asahikawa, one of Japan's coldest major cities, holds its own winter festival each February separate from Sapporo's, built around what feature besides snow statues?|Asahikawa, una de las ciudades importantes más frías de Japón, celebra su propio festival de invierno cada febrero, aparte del de Sapporo, centrado en qué elemento además de las estatuas de nieve?|Asahikawa, l'une des grandes villes les plus froides du Japon, organise son propre festival d'hiver chaque février, distinct de celui de Sapporo, construit autour de quel élément en plus des statues de neige ?|日本有数の寒さで知られる旭川は、札幌とは別に毎年2月に独自の冬まつりを開く。雪像のほかに何を目玉としているか?",
    [
      "A giant ice slide for children|Un gran tobogán de hielo para niños|Un grand toboggan de glace pour enfants|子ども向けの巨大な氷の滑り台",
      "A midsummer fireworks display|Un espectáculo de fuegos artificiales de pleno verano|Un feu d'artifice en plein été|真夏の花火大会",
      "A camel parade|Un desfile de camellos|Un défilé de chameaux|ラクダのパレード",
    ],
    0,
    "The Asahikawa Winter Festival builds a large snow slide each year in the dry riverbed of the Ishikari River, drawing on the city's especially cold, dry climate to keep the ice slide fast and firm through the event.|El Festival de Invierno de Asahikawa construye cada año un gran tobogán de nieve en el lecho seco del río Ishikari, aprovechando el clima especialmente frío y seco de la ciudad para mantener el tobogán de hielo rápido y firme durante el evento.|Le Festival d'hiver d'Asahikawa construit chaque année un grand toboggan de neige dans le lit asséché de la rivière Ishikari, tirant parti du climat particulièrement froid et sec de la ville pour garder le toboggan de glace rapide et solide durant l'événement.|旭川冬まつりは毎年、石狩川の乾いた河川敷に大きな雪の滑り台を作る。旭川特有の寒く乾いた気候のおかげで、期間中も滑り台は速く固いまま保たれる。",
  ),
];
