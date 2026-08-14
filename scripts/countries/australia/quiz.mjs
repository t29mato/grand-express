/**
 * オーストラリアのクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 都市カード(42件)が扱った固有の事実(ハーバーブリッジのリベット数、
 * パースの黒鳥、ウルルの登山禁止など)はここでは問わない。地理・自然・
 * 歴史・言語・スポーツ・食といった、都市カードが触れていない主題を選んだ。
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

export const AUSTRALIA_QUIZ = [
  q(
    1,
    "What large flightless bird is native to Australia and appears on its coat of arms?|¿Qué ave grande no voladora es nativa de Australia y aparece en su escudo de armas?|Quel grand oiseau incapable de voler est natif d'Australie et figure sur ses armoiries ?|オーストラリア原産で国章にも描かれている、飛べない大型の鳥は?",
    [
      "Emu|Emú|Émeu|エミュー",
      "Ostrich|Avestruz|Autruche|ダチョウ",
      "Peacock|Pavo real|Paon|クジャク",
    ],
    0,
    "The emu stands beside the kangaroo on the Australian coat of arms, reportedly chosen in part because neither animal is said to be able to walk backwards easily.|El emú aparece junto al canguro en el escudo de armas australiano, elegido en parte porque se dice que ninguno de los dos animales puede caminar fácilmente hacia atrás.|L'émeu figure aux côtés du kangourou sur les armoiries australiennes, choisi en partie parce qu'aucun des deux animaux ne pourrait, dit-on, marcher facilement en arrière.|エミューはオーストラリアの国章でカンガルーと並んで描かれている。どちらの動物も後ろ向きに歩くのが苦手だとされることが、選ばれた理由の一つと言われている。",
  ),
  q(
    1,
    "What is the capital city of Australia?|¿Cuál es la capital de Australia?|Quelle est la capitale de l'Australie ?|オーストラリアの首都はどこか?",
    [
      "Sydney|Sídney|Sydney|シドニー",
      "Canberra|Canberra|Canberra|キャンベラ",
      "Melbourne|Melbourne|Melbourne|メルボルン",
    ],
    1,
    "Canberra was purpose-built as a compromise capital between Sydney and Melbourne, and many first-time visitors are surprised it is not Australia's largest city.|Canberra se construyó como capital de compromiso entre Sídney y Melbourne, y muchos visitantes primerizos se sorprenden de que no sea la ciudad más grande de Australia.|Canberra fut bâtie exprès comme capitale de compromis entre Sydney et Melbourne, et bien des visiteurs sont surpris qu'elle ne soit pas la plus grande ville d'Australie.|キャンベラはシドニーとメルボルンの妥協案として建設された首都で、オーストラリア最大の都市ではないことに初めて訪れる人はよく驚く。",
  ),
  q(
    2,
    "Which ocean lies along Australia's west coast?|¿Qué océano bordea la costa oeste de Australia?|Quel océan borde la côte ouest de l'Australie ?|オーストラリアの西海岸に面する海は?",
    [
      "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋",
      "The Indian Ocean|El océano Índico|L'océan Indien|インド洋",
      "The Arctic Ocean|El océano Ártico|L'océan Arctique|北極海",
    ],
    1,
    "The Indian Ocean laps the whole western coastline, from the Kimberley in the north down to Cape Leeuwin in the southwest.|El océano Índico baña toda la costa occidental, desde el Kimberley al norte hasta el cabo Leeuwin al suroeste.|L'océan Indien baigne toute la côte occidentale, du Kimberley au nord jusqu'au cap Leeuwin au sud-ouest.|インド洋は北のキンバリーから南西のルーウィン岬まで、西海岸全体を洗っている。",
  ),
  q(
    2,
    "How many states make up Australia (not counting the territories)?|¿Cuántos estados forman Australia (sin contar los territorios)?|Combien d'États compose l'Australie (sans compter les territoires) ?|オーストラリアを構成する州はいくつか(準州は除く)?",
    [
      "Four|Cuatro|Quatre|4",
      "Six|Seis|Six|6",
      "Eight|Ocho|Huit|8",
    ],
    1,
    "The six states — New South Wales, Victoria, Queensland, South Australia, Western Australia and Tasmania — federated in 1901, alongside two mainland territories that are governed a little differently.|Los seis estados —Nueva Gales del Sur, Victoria, Queensland, Australia Meridional, Australia Occidental y Tasmania— se federaron en 1901, junto a dos territorios continentales.|Les six États — Nouvelle-Galles du Sud, Victoria, Queensland, Australie-Méridionale, Australie-Occidentale et Tasmanie — se fédérèrent en 1901, aux côtés de deux territoires continentaux.|ニューサウスウェールズ・ヴィクトリア・クイーンズランド・南オーストラリア・西オーストラリア・タスマニアの6州が1901年に連邦を結成した。ほかに統治の仕組みが少し異なる2つの準州がある。",
  ),
  q(
    2,
    "What is Australia's most populous city?|¿Cuál es la ciudad más poblada de Australia?|Quelle est la ville la plus peuplée d'Australie ?|オーストラリアで人口が最も多い都市は?",
    [
      "Perth|Perth|Perth|パース",
      "Brisbane|Brisbane|Brisbane|ブリスベン",
      "Sydney|Sídney|Sydney|シドニー",
    ],
    2,
    "Sydney has held the title of Australia's largest city since the earliest days of British settlement, though Melbourne has closed the gap enough in recent decades that the two cities keep a running rivalry over projected population figures.|Sídney ha sido la ciudad más grande de Australia desde los primeros días del asentamiento británico, aunque Melbourne ha reducido la distancia en las últimas décadas.|Sydney détient le titre de plus grande ville d'Australie depuis les débuts de la colonisation britannique, bien que Melbourne ait réduit l'écart ces dernières décennies.|シドニーは英国の入植初期からオーストラリア最大の都市であり続けているが、近年はメルボルンが差を詰めており、将来の人口予測をめぐる両都市の張り合いが続いている。",
  ),
  q(
    2,
    "What is a common Australian slang word for \"afternoon\"?|¿Cuál es una palabra coloquial australiana común para «tarde»?|Quel est un mot d'argot australien courant pour « après-midi » ?|「午後」を意味するオーストラリアの口語表現は?",
    [
      "Arvo|Arvo|Arvo|アーヴォ",
      "Avo|Avo|Avo|アヴォ",
      "Aftie|Aftie|Aftie|アフティー",
    ],
    0,
    "Shortening words and adding an \"-o\" or \"-ie\" ending is a common pattern in Australian English, the same habit that turns \"service station\" into \"servo\" and \"mosquito\" into \"mozzie\".|Acortar palabras y añadir una terminación en «-o» o «-ie» es un patrón común del inglés australiano, el mismo hábito que convierte «service station» en «servo».|Raccourcir les mots et ajouter une terminaison en « -o » ou « -ie » est un schéma courant de l'anglais australien, la même habitude qui transforme « service station » en « servo ».|語を短くして「-o」や「-ie」を付け足すのはオーストラリア英語によくある癖で、同じ習慣が「サービスステーション」を「サーヴォ」に変えている。",
  ),
  q(
    3,
    "What does the Australian slang word \"servo\" refer to?|¿A qué se refiere la palabra coloquial australiana «servo»?|À quoi renvoie le mot d'argot australien « servo » ?|オーストラリアの俗語「サーヴォ」が指すものは?",
    [
      "A restaurant server|Un camarero|Un serveur de restaurant|レストランの給仕",
      "A petrol station|Una gasolinera|Une station-service|ガソリンスタンド",
      "A type of surfboard|Un tipo de tabla de surf|Un type de planche de surf|サーフボードの一種",
    ],
    1,
    "A servo is where drivers stop for fuel, and in many small outback towns it may double as the only shop, café and mechanic for a long stretch of road.|Un servo es donde los conductores paran a repostar, y en muchos pueblos pequeños del outback también puede hacer de única tienda, cafetería y taller mecánico en un largo tramo de carretera.|Un servo est l'endroit où les automobilistes s'arrêtent pour faire le plein, et dans bien des petites villes de l'outback, il fait aussi office d'unique boutique, café et garage sur un long tronçon de route.|サーヴォは運転手が給油に立ち寄る場所で、アウトバックの小さな町では、長い道のりで唯一の店・カフェ・修理工場を兼ねていることもある。",
  ),
  q(
    3,
    "What is a \"billabong\"?|¿Qué es un «billabong»?|Qu'est-ce qu'un « billabong » ?|「ビラボン」とは何か?",
    [
      "A dry desert wind|Un viento seco del desierto|Un vent sec du désert|乾いた砂漠の風",
      "A type of kangaroo|Un tipo de canguro|Un type de kangourou|カンガルーの一種",
      "A pool of water cut off from a river after a flood|Una charca separada de un río tras una inundación|Une mare coupée d'une rivière après une crue|洪水のあと川から切り離された水たまり",
    ],
    2,
    "A billabong forms when a river changes course and leaves an oxbow-shaped pool behind, and the word itself comes from the Wiradjuri language of southeastern Australia.|Un billabong se forma cuando un río cambia de curso y deja atrás una charca con forma de meandro, y la palabra proviene de la lengua wiradjuri del sureste de Australia.|Un billabong se forme quand une rivière change de cours et laisse derrière elle une mare en forme de méandre, et le mot vient de la langue wiradjuri du sud-est de l'Australie.|ビラボンは川が流路を変え、三日月形の水たまりを残すことで生まれる。この語自体はオーストラリア南東部のウィラジュリ語に由来する。",
  ),
  q(
    3,
    "What was Australia's currency before it switched to dollars and cents in 1966?|¿Qué moneda usaba Australia antes de pasar a dólares y centavos en 1966?|Quelle était la monnaie de l'Australie avant son passage aux dollars et cents en 1966?|1966年にドルとセントに切り替える前、オーストラリアの通貨は何だったか?",
    [
      "Pounds, shillings and pence|Libras, chelines y peniques|Livres, shillings et pence|ポンド・シリング・ペンス",
      "Deutsche Marks|Marcos alemanes|Marks allemands|ドイツマルク",
      "French francs|Francos franceses|Francs français|フランス・フラン",
    ],
    0,
    "The changeover to decimal currency in 1966 was one of the largest logistical operations the country had undertaken, requiring every till, vending machine and price tag in Australia to switch over on the same day.|El cambio a moneda decimal en 1966 fue una de las mayores operaciones logísticas del país, pues cada caja, máquina expendedora y etiqueta de precio de Australia debía cambiar el mismo día.|Le passage à la monnaie décimale en 1966 fut l'une des plus vastes opérations logistiques jamais menées dans le pays, chaque caisse, distributeur et étiquette de prix devant changer le même jour.|1966年の十進法通貨への切り替えは、この国が手がけた中でも最大級の物流作戦の一つで、全国のレジも自動販売機も値札も同じ日に一斉に切り替える必要があった。",
  ),
  q(
    3,
    "On the Australian flag, which star pattern is shown alongside the Union Jack and the Commonwealth Star?|En la bandera australiana, ¿qué grupo de estrellas aparece junto a la Union Jack y la Estrella de la Mancomunidad?|Sur le drapeau australien, quel groupe d'étoiles figure aux côtés de l'Union Jack et de l'étoile du Commonwealth ?|オーストラリア国旗で、ユニオンジャックと連邦星のほかに描かれている星の並びは?",
    [
      "Orion|Orión|Orion|オリオン座",
      "The Southern Cross|La Cruz del Sur|La Croix du Sud|南十字星",
      "The Big Dipper|La Osa Mayor|La Grande Ourse|北斗七星",
    ],
    1,
    "The Southern Cross is visible only from the southern hemisphere and appears on several nearby countries' flags too, including New Zealand's and Papua New Guinea's.|La Cruz del Sur solo es visible desde el hemisferio sur y también aparece en las banderas de varios países vecinos, como Nueva Zelanda y Papúa Nueva Guinea.|La Croix du Sud n'est visible que depuis l'hémisphère sud et figure aussi sur les drapeaux de plusieurs pays voisins, dont la Nouvelle-Zélande et la Papouasie-Nouvelle-Guinée.|南十字星は南半球からしか見えず、ニュージーランドやパプアニューギニアなど近隣の国々の国旗にも描かれている。",
  ),
  q(
    3,
    "Approximately what share of Australia's population lives within 50 km of the coast?|¿Aproximadamente qué proporción de la población australiana vive a menos de 50 km de la costa?|Environ quelle part de la population australienne vit à moins de 50 km de la côte ?|オーストラリアの人口のうち、海岸から50km以内に住む割合はおよそどれくらいか?",
    [
      "About 15 percent|Alrededor del 15 por ciento|Environ 15 pour cent|およそ15%",
      "About 40 percent|Alrededor del 40 por ciento|Environ 40 pour cent|およそ40%",
      "About 85 percent|Alrededor del 85 por ciento|Environ 85 pour cent|およそ85%",
    ],
    2,
    "The dry interior holds only a small fraction of the country's people, so almost all of Australia's major cities and most of its population cling to a narrow coastal fringe.|El interior seco alberga solo una pequeña fracción de la población del país, así que casi todas las grandes ciudades australianas y la mayoría de sus habitantes se aferran a una estrecha franja costera.|L'intérieur aride n'abrite qu'une infime fraction de la population du pays, si bien que presque toutes les grandes villes australiennes et l'essentiel de ses habitants s'accrochent à une étroite frange côtière.|乾いた内陸部に住む人はごくわずかで、オーストラリアの主要都市のほぼすべてと人口の大半が、細い海岸沿いの帯に集まっている。",
  ),
  q(
    4,
    "What is the highest peak on the Australian mainland?|¿Cuál es el pico más alto de la Australia continental?|Quel est le plus haut sommet de l'Australie continentale ?|オーストラリア本土でいちばん高い山は?",
    [
      "Mount Kosciuszko|Monte Kosciuszko|Le mont Kosciuszko|コジオスコ山",
      "Uluru|Uluru|Uluru|ウルル",
      "Mount Isa|Monte Isa|Mount Isa|マウント・アイザ",
    ],
    0,
    "At 2,228 metres, Kosciuszko is modest by world standards, and its summit can be reached by a well-formed walking track rather than technical climbing. It was named in 1840 by Polish explorer Paweł Strzelecki after a Polish national hero.|Con 2.228 metros, el Kosciuszko es modesto para los estándares mundiales, y se llega a su cima por un sendero bien trazado sin escalada técnica. Lo bautizó en 1840 el explorador polaco Paweł Strzelecki en honor a un héroe nacional polaco.|Avec 2 228 mètres, le Kosciuszko est modeste selon les standards mondiaux, et son sommet s'atteint par un sentier bien aménagé sans escalade technique. Il fut nommé en 1840 par l'explorateur polonais Paweł Strzelecki en l'honneur d'un héros national polonais.|標高2,228mのコジオスコ山は世界的に見ればさほど高くなく、登攀技術なしでも整備された歩道で山頂に立てる。1840年、ポーランド人探検家パヴェウ・ストシェレツキが、ポーランドの国民的英雄にちなんで名付けた。",
  ),
  q(
    4,
    "What is the term for a remote, often enormous cattle or sheep property in Australia?|¿Cómo se llama una propiedad ganadera remota y a menudo enorme en Australia?|Comment appelle-t-on une propriété d'élevage isolée et souvent immense en Australie ?|オーストラリアの、しばしば広大な牧場を指す言葉は?",
    [
      "A ranch|Un rancho|Un ranch|牧場(ランチ)",
      "A station|Una estancia (station)|Une station|ステーション",
      "A homestead only|Solo un caserío|Seulement une ferme|農家のみ",
    ],
    1,
    "Some outback stations cover an area larger than small European countries, run with only a handful of staff and mustered partly by helicopter or motorbike rather than solely on horseback.|Algunas estancias del outback cubren un área mayor que pequeños países europeos, gestionadas con solo un puñado de empleados y arreadas en parte en helicóptero o moto en vez de solo a caballo.|Certaines stations de l'outback couvrent une superficie plus vaste que de petits pays européens, gérées par une poignée d'employés seulement et rassemblées en partie à l'hélicoptère ou à moto plutôt qu'uniquement à cheval.|アウトバックの牧場の中にはヨーロッパの小国より広い面積を持つものもあり、わずかな人手で運営され、家畜の追い込みも馬だけでなくヘリコプターやバイクで行われることがある。",
  ),
  q(
    4,
    "What is a \"snag\" in Australian slang?|¿Qué es un «snag» en el argot australiano?|Qu'est-ce qu'un « snag » dans l'argot australien ?|オーストラリアの俗語「スナッグ」とは何か?",
    [
      "A small dog|Un perro pequeño|Un petit chien|小型犬",
      "A type of hat|Un tipo de sombrero|Un type de chapeau|帽子の一種",
      "A sausage|Una salchicha|Une saucisse|ソーセージ",
    ],
    2,
    "A \"sausage sizzle\" — snags grilled and served on a slice of bread — is a fixture outside supermarkets and, famously, at polling places on election day.|Un «sausage sizzle» —snags a la parrilla servidos en una rebanada de pan— es habitual frente a los supermercados y, célebremente, en los colegios electorales el día de las elecciones.|Un « sausage sizzle » — des snags grillés servis sur une tranche de pain — est un classique devant les supermarchés et, fait bien connu, aux bureaux de vote le jour des élections.|「ソーセージ・シズル」――焼いたスナッグを一枚のパンにはさんだもの――はスーパーの前の定番で、選挙の投票所でも名物として売られる。",
  ),
  q(
    5,
    "What is generally regarded as the largest living structure on Earth, found off Australia's northeast coast?|¿Qué se considera generalmente la mayor estructura viva de la Tierra, hallada frente a la costa noreste de Australia?|Qu'est-ce qui est généralement considéré comme la plus grande structure vivante sur Terre, au large de la côte nord-est de l'Australie ?|オーストラリア北東岸沖にある、地球最大の生物構造物とされるものは?",
    [
      "The Great Barrier Reef|La Gran Barrera de Coral|La Grande Barrière de corail|グレートバリアリーフ",
      "The Great Ocean Road|La Great Ocean Road|La Great Ocean Road|グレート・オーシャン・ロード",
      "Fraser Island|La isla Fraser|L'île Fraser|フレーザー島",
    ],
    0,
    "Built by billions of tiny coral polyps over thousands of years, the reef stretches for more than 2,000 km, roughly the distance from London to Athens.|Construida por miles de millones de diminutos pólipos de coral a lo largo de miles de años, la barrera se extiende más de 2.000 km, aproximadamente la distancia de Londres a Atenas.|Bâtie par des milliards de minuscules polypes coralliens sur des milliers d'années, la barrière s'étend sur plus de 2 000 km, à peu près la distance de Londres à Athènes.|何十億もの小さなサンゴのポリプが何千年もかけて築き上げたこの礁は、2,000kmを超えて広がっており、ロンドンからアテネまでの距離にほぼ匹敵する。",
  ),
  q(
    5,
    "The Simpson Desert lies mostly in which part of Australia?|¿En qué parte de Australia se encuentra principalmente el desierto de Simpson?|Où se trouve principalement le désert de Simpson en Australie ?|シンプソン砂漠は主にオーストラリアのどの辺りにあるか?",
    [
      "The Tasmanian coast|La costa de Tasmania|La côte tasmanienne|タスマニアの海岸",
      "Central Australia|Australia central|L'Australie centrale|オーストラリア中央部",
      "The tropical north coast|La costa tropical del norte|La côte tropicale du nord|北部の熱帯海岸",
    ],
    1,
    "The desert is famous for its parallel red sand dunes, some running unbroken for over 200 km, formed by wind blowing consistently from one direction over an immense stretch of time.|El desierto es famoso por sus dunas de arena roja paralelas, algunas de más de 200 km sin interrupción, formadas por un viento constante desde una misma dirección durante un tiempo inmenso.|Le désert est réputé pour ses dunes de sable rouge parallèles, certaines ininterrompues sur plus de 200 km, formées par un vent soufflant constamment dans une même direction sur une durée immense.|この砂漠は、200kmを超えて途切れず続くものもある赤い平行砂丘で知られ、長い年月にわたり一定方向から吹き続けた風によって形作られた。",
  ),
  q(
    5,
    "Which sport is widely regarded as Australia's own invention and its most attended winter spectator sport?|¿Qué deporte se considera invención propia de Australia y su deporte de espectadores de invierno más concurrido?|Quel sport est largement considéré comme une invention propre à l'Australie et son sport d'hiver le plus suivi ?|オーストラリア独自の発祥とされ、冬季でいちばん観客を集めるスポーツは?",
    [
      "Ice hockey|Hockey sobre hielo|Hockey sur glace|アイスホッケー",
      "American football|Fútbol americano|Football américain|アメリカンフットボール",
      "Australian rules football|El fútbol australiano|Le football australien|オーストラリアン・フットボール",
    ],
    2,
    "Played on an oval field with an oval ball and almost no protective padding, the sport developed in Melbourne in the 1850s and has no direct overseas equivalent.|Jugado en un campo ovalado con un balón ovalado y casi sin protecciones, el deporte se desarrolló en Melbourne en la década de 1850 y no tiene un equivalente directo en el extranjero.|Joué sur un terrain ovale avec un ballon ovale et presque sans protections, ce sport s'est développé à Melbourne dans les années 1850 et n'a pas d'équivalent direct à l'étranger.|楕円形の球場で楕円形のボールを使い、防具もほとんど着けずに行われるこの競技は、1850年代のメルボルンで生まれ、海外に直接の対応物を持たない。",
  ),
  q(
    5,
    "The Ashes is a famous sporting rivalry between Australia and which country, contested in cricket?|¿La Ashes es una famosa rivalidad deportiva entre Australia y qué país, disputada en cricket?|Les Ashes sont une célèbre rivalité sportive entre l'Australie et quel pays, disputée au cricket ?|「アッシュズ」は、オーストラリアとどこの国とのあいだの有名なクリケットの対抗戦か?",
    [
      "England|Inglaterra|L'Angleterre|イングランド",
      "New Zealand|Nueva Zelanda|La Nouvelle-Zélande|ニュージーランド",
      "South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ",
    ],
    0,
    "The name comes from a mock obituary printed in 1882 joking that English cricket had died, with the \"ashes\" supposedly sent to Australia; the tiny urn awarded to the winner has stayed in an English museum ever since, regardless of who actually wins each series.|El nombre viene de una necrológica de broma publicada en 1882 bromeando con que el cricket inglés había muerto; la diminuta urna con las «cenizas» ha permanecido en un museo inglés desde entonces.|Le nom vient d'une nécrologie humoristique publiée en 1882 plaisantant sur la mort du cricket anglais ; la minuscule urne des « cendres » est restée dans un musée anglais depuis, quel que soit le vainqueur de chaque série.|この名は1882年、イングランドのクリケットが「死んだ」とふざけた追悼記事から来ている。優勝チームに贈られる小さな壺は、実際にどちらが勝とうと、以来ずっとイングランドの博物館に置かれたままである。",
  ),
  q(
    5,
    "About how many living Aboriginal languages were spoken across Australia before European colonisation?|¿Aproximadamente cuántas lenguas aborígenes vivas se hablaban en Australia antes de la colonización europea?|Environ combien de langues aborigènes vivantes étaient parlées en Australie avant la colonisation européenne ?|ヨーロッパによる植民地化以前、オーストラリアで話されていた生きたアボリジナル諸語はおよそいくつか?",
    [
      "Around 20|Alrededor de 20|Environ 20|およそ20",
      "Around 250|Alrededor de 250|Environ 250|およそ250",
      "Around 2|Alrededor de 2|Environ 2|およそ2",
    ],
    1,
    "Each of those languages was tied closely to a particular Country, or ancestral homeland, and many have far fewer fluent speakers today, which is why language revival programs are active in numerous communities.|Cada una de esas lenguas estaba estrechamente ligada a un País ancestral concreto, y muchas tienen hoy muchos menos hablantes fluidos, por lo que hay programas activos de revitalización lingüística en numerosas comunidades.|Chacune de ces langues était étroitement liée à un Pays ancestral particulier, et beaucoup comptent aujourd'hui bien moins de locuteurs courants, d'où des programmes actifs de revitalisation linguistique dans de nombreuses communautés.|それぞれの言語は特定の祖先の土地と深く結びついており、いまでは流暢な話者がずっと少ない言語も多いため、多くの地域社会で言語復興の取り組みが続けられている。",
  ),
  q(
    6,
    "Which Australian prime minister disappeared while swimming off a beach in 1967 and was never found?|¿Qué primer ministro australiano desapareció mientras nadaba en una playa en 1967 y nunca fue hallado?|Quel Premier ministre australien a disparu en nageant sur une plage en 1967 et n'a jamais été retrouvé ?|1967年、海で泳いでいる最中に姿を消し、その後も見つからなかったオーストラリアの首相は?",
    [
      "Robert Menzies|Robert Menzies|Robert Menzies|ロバート・メンジーズ",
      "Bob Hawke|Bob Hawke|Bob Hawke|ボブ・ホーク",
      "Harold Holt|Harold Holt|Harold Holt|ハロルド・ホルト",
    ],
    2,
    "A large public swimming centre in Melbourne was later named after Holt, a choice many Australians still find quietly funny given how he disappeared.|Un gran centro público de natación de Melbourne se bautizó después con el nombre de Holt, una elección que muchos australianos aún encuentran cómica dado cómo desapareció.|Un grand centre aquatique public de Melbourne fut plus tard baptisé en l'honneur de Holt, un choix que beaucoup d'Australiens trouvent encore discrètement drôle vu les circonstances de sa disparition.|後にメルボルンの大きな公共プールがホルトにちなんで名付けられたが、その消え方を考えると、いまも多くのオーストラリア人がひそかに皮肉だと感じている。",
  ),
  q(
    6,
    "Which of these was the fleet of ships that first brought British convicts to Australia in 1788?|¿Cuál de estos fue el conjunto de barcos que llevó por primera vez a convictos británicos a Australia en 1788?|Laquelle de ces flottes a transporté les premiers bagnards britanniques en Australie en 1788 ?|1788年に英国の流刑者を初めてオーストラリアへ運んだ船団の名は?",
    [
      "The First Fleet|La Primera Flota|La Première Flotte|ファースト・フリート",
      "The Mayflower|El Mayflower|Le Mayflower|メイフラワー号",
      "The Spanish Armada|La Armada Española|L'Armada espagnole|スペイン無敵艦隊",
    ],
    0,
    "Eleven ships carrying roughly 1,400 people, more than half of them convicts, sailed from England in 1787 and landed at Sydney Cove after an eight-month voyage.|Once barcos con unas 1.400 personas, más de la mitad convictos, zarparon de Inglaterra en 1787 y llegaron a Sydney Cove tras un viaje de ocho meses.|Onze navires transportant environ 1 400 personnes, dont plus de la moitié de bagnards, quittèrent l'Angleterre en 1787 et accostèrent à Sydney Cove après un voyage de huit mois.|11隻の船に約1,400人が乗り込み、その半数以上が流刑者だった。1787年にイングランドを出航し、8か月の航海の末シドニー・コーブに到着した。",
  ),
  q(
    6,
    "The Eureka Flag, linked to an 1854 miners' uprising, is now also used as a symbol by which group?|La bandera Eureka, ligada a un levantamiento minero de 1854, se usa hoy también como símbolo de qué grupo?|Le drapeau Eureka, lié à un soulèvement de mineurs en 1854, est aujourd'hui aussi utilisé comme symbole par quel groupe ?|1854年の鉱夫の蜂起にちなむユリーカ旗は、いまではどのような団体の象徴としても使われているか?",
    [
      "The national cricket team|El equipo nacional de cricket|L'équipe nationale de cricket|クリケット代表チーム",
      "Australian trade unions|Los sindicatos australianos|Les syndicats australiens|オーストラリアの労働組合",
      "The Royal Australian Navy|La Armada Real Australiana|La marine royale australienne|オーストラリア海軍",
    ],
    1,
    "The blue flag with a white cross and five stars flew over the Eureka Stockade at Ballarat and has since been adopted by union and labour movements as a symbol of standing up to authority.|La bandera azul con cruz blanca y cinco estrellas ondeó sobre la empalizada de Eureka en Ballarat y desde entonces la han adoptado los sindicatos y movimientos obreros como símbolo de plantar cara a la autoridad.|Le drapeau bleu à croix blanche et cinq étoiles flotta sur la palissade d'Eureka à Ballarat et a depuis été adopté par les syndicats et mouvements ouvriers comme symbole de résistance à l'autorité.|白い十字と五つの星を配した青い旗は、バララットのユリーカの柵に翻っていたもので、以来、権威に立ち向かう象徴として労働組合や労働運動に採り入れられている。",
  ),
  q(
    6,
    "The platypus and echidna belong to a small group of mammals known by what name?|El ornitorrinco y el equidna pertenecen a un pequeño grupo de mamíferos conocido con qué nombre?|L'ornithorynque et l'échidné appartiennent à un petit groupe de mammifères connu sous quel nom ?|カモノハシとハリモグラが属する少数派の哺乳類のグループの名は?",
    [
      "Marsupials|Marsupiales|Marsupiaux|有袋類",
      "Rodents|Roedores|Rongeurs|齧歯類",
      "Monotremes, the only egg-laying mammals|Monotremas, los únicos mamíferos que ponen huevos|Monotrèmes, les seuls mammifères pondant des œufs|単孔類(卵を産む唯一の哺乳類)",
    ],
    2,
    "Only five monotreme species survive today — the platypus and four kinds of echidna — all found in Australia and New Guinea and nowhere else in the world.|Solo sobreviven hoy cinco especies de monotremas —el ornitorrinco y cuatro tipos de equidna—, todas presentes en Australia y Nueva Guinea y en ningún otro lugar del mundo.|Seules cinq espèces de monotrèmes subsistent aujourd'hui — l'ornithorynque et quatre types d'échidnés —, toutes présentes en Australie et en Nouvelle-Guinée et nulle part ailleurs.|現存する単孔類は、カモノハシと4種のハリモグラを合わせて5種だけで、いずれもオーストラリアとニューギニアにしか生息していない。",
  ),
  q(
    6,
    "Which Australian mammal is unusual for having a venomous spur on its hind legs?|¿Qué mamífero australiano es inusual por tener un espolón venenoso en las patas traseras?|Quel mammifère australien est inhabituel pour posséder un éperon venimeux sur ses pattes arrière ?|後ろ足に毒のあるけづめを持つという珍しい特徴を持つオーストラリアの哺乳類は?",
    [
      "The platypus|El ornitorrinco|L'ornithorynque|カモノハシ",
      "The koala|El koala|Le koala|コアラ",
      "The wombat|El wombat|Le wombat|ウォンバット",
    ],
    0,
    "Only the male platypus carries the venomous spur, delivering a sting said to be excruciating to humans but rarely fatal, most likely used in competition with other males during breeding season.|Solo el ornitorrinco macho lleva el espolón venenoso, que produce una picadura dicha ser insoportable para los humanos pero rara vez mortal, probablemente usada al competir con otros machos.|Seul l'ornithorynque mâle porte l'éperon venimeux, infligeant une piqûre dite atroce pour l'humain mais rarement mortelle, probablement utilisée pour rivaliser avec d'autres mâles.|毒のあるけづめを持つのはオスのカモノハシだけで、その毒針は人にとって耐えがたいほど痛いが命に関わることはめったにないとされ、繁殖期に他のオスと張り合うために使われるとみられている。",
  ),
  q(
    7,
    "In many Aboriginal cultures, what does \"the Dreaming\" broadly refer to?|En muchas culturas aborígenes, ¿a qué se refiere en términos generales «el Sueño» (Dreaming)?|Dans de nombreuses cultures aborigènes, à quoi renvoie globalement « le Temps du Rêve » ?|多くのアボリジナル文化で「ドリーミング」が広く指すものは?",
    [
      "A single annual festival|Un único festival anual|Un festival annuel unique|年に一度の単一の祭り",
      "The stories and beliefs explaining creation, law and connection to land|Los relatos y creencias que explican la creación, la ley y el vínculo con la tierra|Les récits et croyances expliquant la création, la loi et le lien à la terre|創造・掟・土地とのつながりを説明する物語と信仰",
      "A genre of bush poetry|Un género de poesía rural|Un genre de poésie rustique|奥地の詩の一形式",
    ],
    1,
    "The Dreaming varies from community to community and language group to language group, and is understood as an ongoing spiritual reality rather than a closed chapter set only in the past.|El Sueño (Dreaming) varía de una comunidad y grupo lingüístico a otro, y se entiende como una realidad espiritual continua, no un capítulo cerrado situado solo en el pasado.|Le Temps du Rêve varie d'une communauté et d'un groupe linguistique à l'autre, et se comprend comme une réalité spirituelle continue plutôt qu'un chapitre clos situé seulement dans le passé.|ドリーミングは地域や言語集団によって異なり、過去だけに属する閉じた出来事ではなく、いまも続く精神的な現実として理解されている。",
  ),
  q(
    7,
    "Dot painting is a well-known art style especially associated with which communities?|La pintura de puntos es un estilo artístico conocido asociado especialmente a qué comunidades?|La peinture par points est un style artistique bien connu associé en particulier à quelles communautés ?|「点描画」として知られる絵画様式は、特にどの地域社会と結びついているか?",
    [
      "Early British colonial settlers|Los primeros colonos británicos|Les premiers colons britanniques|初期の英国人入植者",
      "Torres Strait Islander communities only|Solo comunidades de las islas del Estrecho de Torres|Uniquement les communautés des îles du détroit de Torres|トレス海峡諸島民の地域社会のみ",
      "Aboriginal communities, especially in central Australia|Comunidades aborígenes, especialmente en Australia central|Les communautés aborigènes, notamment en Australie centrale|アボリジナルの地域社会、特にオーストラリア中央部",
    ],
    2,
    "The style as widely known today largely dates to the early 1970s, when artists at Papunya in central Australia began translating sand and body designs onto boards and canvas for the first time.|El estilo tal como se conoce hoy data en gran parte de principios de los años setenta, cuando artistas de Papunya, en Australia central, empezaron a trasladar diseños de arena y corporales a tableros y lienzos.|Ce style tel qu'on le connaît aujourd'hui remonte en grande partie au début des années 1970, quand des artistes de Papunya, en Australie centrale, commencèrent à transposer des motifs de sable et corporels sur des panneaux et toiles.|いまよく知られるこの様式の多くは1970年代初め、オーストラリア中央部のパプニャの画家たちが、砂絵や身体装飾の図案を初めて板やキャンバスに描き移したことに由来する。",
  ),
  q(
    7,
    "About how many of the world's ten most venomous snakes are found in Australia?|¿Aproximadamente cuántas de las diez serpientes más venenosas del mundo se encuentran en Australia?|Environ combien des dix serpents les plus venimeux du monde se trouvent en Australie ?|世界で最も毒性の強い10種の蛇のうち、オーストラリアに生息するのはおよそ何種か?",
    [
      "Most of them, around nine|La mayoría, unas nueve|La plupart, environ neuf|大半、およそ9種",
      "None of them|Ninguna|Aucun|1種もいない",
      "Just one|Solo una|Un seul|1種だけ",
    ],
    0,
    "Despite this, snake bite deaths in Australia are rare, generally only a handful each year, thanks to widely available antivenom and a national protocol for pressure-immobilisation first aid.|A pesar de esto, las muertes por mordedura de serpiente en Australia son raras, apenas un puñado cada año, gracias al antiveneno ampliamente disponible y a un protocolo nacional de inmovilización con presión.|Malgré cela, les décès par morsure de serpent en Australie sont rares, à peine une poignée chaque année, grâce à un antivenin largement disponible et à un protocole national de premiers secours par immobilisation-compression.|それでもオーストラリアでの蛇咬傷による死者は年に数人程度とまれで、広く行き渡った抗毒素と、圧迫固定法という全国共通の応急処置手順のおかげである。",
  ),
  q(
    7,
    "Which Australian sport rivalry, contested between rugby league and Australian rules football regions, splits loyalty roughly along the Victoria–New South Wales border?|¿Qué rivalidad deportiva australiana, entre regiones de liga de rugby y fútbol australiano, divide la lealtad aproximadamente por la frontera Victoria–Nueva Gales del Sur?|Quelle rivalité sportive australienne, entre régions de la ligue de rugby et du football australien, divise la fidélité à peu près selon la frontière Victoria–Nouvelle-Galles du Sud ?|ラグビーリーグとオーストラリアン・フットボールの地域対立で、忠誠心がおおよそヴィクトリア州とニューサウスウェールズ州の境界で分かれるのは何と呼ばれるか?",
    [
      "The Ashes|La Ashes|Les Ashes|アッシュズ",
      "The footy code divide|La división de los códigos de «footy»|La division des codes de « footy »|フッティー・コードの分裂",
      "The America's Cup|La Copa América|La Coupe de l'America|アメリカズカップ",
    ],
    1,
    "Rugby league dominates in Queensland and New South Wales while Australian rules football is the default code almost everywhere else, a split that traces back to how each sport spread from different colonies before federation.|La liga de rugby domina en Queensland y Nueva Gales del Sur, mientras que el fútbol australiano es el código por defecto en casi todo el resto, una división que se remonta a cómo se extendió cada deporte desde distintas colonias.|La ligue de rugby domine au Queensland et en Nouvelle-Galles du Sud, tandis que le football australien est le code par défaut presque partout ailleurs, une division qui remonte à la façon dont chaque sport s'est répandu depuis des colonies différentes.|ラグビーリーグはクイーンズランドとニューサウスウェールズで強く、オーストラリアン・フットボールはそれ以外のほぼ全域で主流という分かれ方をしており、これは連邦結成以前、それぞれの競技が異なる植民地から広まった経緯に遡る。",
  ),
  q(
    8,
    "The dessert pavlova is claimed by both Australia and which other country?|El postre pavlova lo reclaman tanto Australia como qué otro país?|Le dessert pavlova est revendiqué à la fois par l'Australie et par quel autre pays ?|パブロバというデザートは、オーストラリアとどこの国が発祥を争っているか?",
    [
      "South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ",
      "Canada|Canadá|Le Canada|カナダ",
      "New Zealand|Nueva Zelanda|La Nouvelle-Zélande|ニュージーランド",
    ],
    2,
    "Named after the Russian ballerina Anna Pavlova after her 1920s tour of the region, the meringue-based dessert's true country of origin has never been settled and both nations claim the earliest known recipe.|Bautizado en honor a la bailarina rusa Anna Pávlova tras su gira por la región en los años veinte, el verdadero país de origen de este postre de merengue nunca se ha zanjado, y ambas naciones reclaman la primera receta conocida.|Nommé d'après la ballerine russe Anna Pavlova après sa tournée dans la région dans les années 1920, le véritable pays d'origine de ce dessert à base de meringue n'a jamais été tranché, les deux nations revendiquant la plus ancienne recette connue.|1920年代にロシアのバレリーナ、アンナ・パブロワがこの地域を巡業したことにちなんで名付けられたこのメレンゲ菓子の発祥国は決着しておらず、両国とも最古とされるレシピの存在を主張している。",
  ),
  q(
    8,
    "What are lamingtons traditionally coated in?|¿Con qué se recubren tradicionalmente los lamingtons?|De quoi les lamingtons sont-ils traditionnellement enrobés ?|ラミントンは伝統的に何をまぶして仕上げるか?",
    [
      "Chocolate icing and desiccated coconut|Glaseado de chocolate y coco rallado deshidratado|Un glaçage au chocolat et de la noix de coco séchée|チョコレートの衣とデシケートココナッツ",
      "Powdered sugar only|Solo azúcar glas|Uniquement du sucre glace|粉砂糖のみ",
      "Crushed nuts only|Solo frutos secos triturados|Uniquement des noix concassées|砕いたナッツのみ",
    ],
    0,
    "The small squares of sponge cake are said to be named after a state governor, Lord Lamington, though the exact story behind the name — and even whether he liked the cake — is disputed.|Los pequeños cuadrados de bizcocho se dicen bautizados en honor a un gobernador estatal, Lord Lamington, aunque la historia exacta tras el nombre —e incluso si a él le gustaba el pastel— se discute.|Les petits cubes de génoise seraient nommés d'après un gouverneur d'État, Lord Lamington, bien que l'histoire exacte derrière ce nom — et même s'il aimait le gâteau — soit débattue.|この小さなスポンジケーキの四角い菓子は、ある州総督ラミントン卿にちなんで名付けられたとされるが、その名の由来の詳しい経緯――彼自身がこの菓子を好んだかどうかも含めて――ははっきりしない。",
  ),
  q(
    8,
    "Kangaroos move primarily by which method, unusually efficient at their body size?|¿Los canguros se desplazan principalmente con qué método, inusualmente eficiente para su tamaño?|Les kangourous se déplacent principalement selon quelle méthode, inhabituellement efficace pour leur taille ?|カンガルーは主にどのような移動方法を使うか。その体格にしては珍しく効率が良いとされる?",
    [
      "Running on all fours at speed|Corriendo a gran velocidad a cuatro patas|En courant rapidement à quatre pattes|4本足での高速走行",
      "Hopping, storing elastic energy in their tendons|Saltando, almacenando energía elástica en los tendones|En bondissant, en stockant de l'énergie élastique dans leurs tendons|腱に弾性エネルギーを蓄えるホッピング(跳躍)",
      "Slithering close to the ground|Reptando cerca del suelo|En rampant près du sol|地面を這うような姿勢",
    ],
    1,
    "The tendons in a kangaroo's hind legs act almost like springs, storing and releasing energy with each hop, which is why hopping actually becomes more efficient, not less, as a kangaroo speeds up.|Los tendones de las patas traseras del canguro actúan casi como resortes, almacenando y liberando energía en cada salto, por lo que saltar se vuelve más eficiente, no menos, al acelerar.|Les tendons des pattes arrière du kangourou agissent presque comme des ressorts, stockant et libérant de l'énergie à chaque bond, si bien que bondir devient plus efficace, et non moins, quand le kangourou accélère.|カンガルーの後ろ足の腱はほぼバネのように働き、跳ぶたびにエネルギーを蓄えては放つ。そのため跳躍は速度が上がるほど非効率になるどころか、むしろ効率が良くなる。",
  ),
  q(
    9,
    "The \"Dingo Fence\", built to keep dingoes from sheep-grazing land, is notable for what?|La «valla del dingo», construida para alejar a los dingos de las tierras de pastoreo, es célebre por qué?|La « clôture à dingos », bâtie pour éloigner les dingos des terres de pâturage, est réputée pour quoi ?|羊の放牧地からディンゴを遠ざけるために作られた「ディンゴ・フェンス」が知られている理由は?",
    [
      "It is the shortest fence ever recorded|Es la valla más corta jamás registrada|C'est la plus courte clôture jamais recensée|史上最も短いフェンスとして記録されている",
      "It exists only underground|Solo existe bajo tierra|Elle n'existe que sous terre|地下にしか存在しない",
      "It runs over 5,600 km, one of the longest structures on Earth|Se extiende más de 5.600 km, una de las estructuras más largas de la Tierra|Elle s'étend sur plus de 5 600 km, l'une des plus longues structures sur Terre|全長5,600kmを超え、地球上でも指折りの長さの構造物である",
    ],
    2,
    "Completed in stages from the 1880s onward, it is regularly patrolled and repaired, and studies suggest it has measurably changed the ecology on either side by keeping dingo predation almost entirely on one side.|Completada por etapas desde la década de 1880, se patrulla y repara regularmente, y estudios sugieren que ha cambiado de forma medible la ecología a cada lado al mantener la depredación del dingo casi por completo en un solo lado.|Achevée par étapes depuis les années 1880, elle est régulièrement patrouillée et réparée, et des études suggèrent qu'elle a mesurablement modifié l'écologie de chaque côté en maintenant la prédation des dingos presque entièrement d'un seul côté.|1880年代から段階的に完成したこの柵はいまも定期的に見回りと補修が行われ、研究によれば、ディンゴによる捕食をほぼ片側だけに抑え込むことで、柵の両側の生態系に測定できるほどの違いを生んでいるという。",
  ),
  q(
    9,
    "Waltzing Matilda, often mistaken abroad for Australia's national anthem, describes what in its lyrics?|Waltzing Matilda, a menudo confundida en el extranjero con el himno nacional de Australia, ¿qué describe en su letra?|Waltzing Matilda, souvent prise à l'étranger pour l'hymne national australien, décrit quoi dans ses paroles ?|海外ではしばしばオーストラリア国歌と誤解されるワルツィング・マチルダの歌詞が描く出来事は?",
    [
      "A swagman who steals a sheep and drowns rather than be caught|Un swagman que roba una oveja y se ahoga antes que ser atrapado|Un swagman qui vole un mouton et se noie plutôt que d'être capturé|羊を盗んだスワッグマンが、捕まるくらいならと身を投げて溺れ死ぬ",
      "A soldier marching off to war|Un soldado que marcha a la guerra|Un soldat partant en guerre|戦争へ行進する兵士",
      "A miner striking a rich gold seam|Un minero que da con una veta rica de oro|Un mineur découvrant un riche filon d'or|豊かな金脈を掘り当てる鉱夫",
    ],
    0,
    "The song is often sung with gusto at sporting events despite its actual story — a swagman drowns himself in a billabong rather than be arrested for sheep theft — being considerably darker than most singers seem to notice.|La canción se suele cantar con entusiasmo en eventos deportivos a pesar de que su historia real —un swagman se ahoga en un billabong antes que ser arrestado por robar una oveja— es bastante más oscura de lo que la mayoría de quienes la cantan parecen notar.|La chanson est souvent entonnée avec entrain lors d'événements sportifs malgré une histoire réelle — un swagman se noie dans un billabong plutôt que d'être arrêté pour vol de mouton — bien plus sombre que ce que la plupart des chanteurs semblent remarquer.|この歌はスポーツの試合などで元気よく歌われることが多いが、実際の物語――羊泥棒として捕まるくらいならとビラボンに身を投げるスワッグマン――は、歌う人の多くが気づいている以上にずっと暗い。",
  ),
  q(
    10,
    "In 2023, Australia held a national referendum on which proposal, which voters ultimately rejected?|En 2023, Australia celebró un referéndum nacional sobre qué propuesta, que los votantes finalmente rechazaron?|En 2023, l'Australie a tenu un référendum national sur quelle proposition, que les électeurs ont finalement rejetée ?|2023年にオーストラリアが実施し、有権者が最終的に否決した国民投票の議題は?",
    [
      "Switching to a fully decimal calendar|Pasar a un calendario totalmente decimal|Passer à un calendrier entièrement décimal|完全な十進法の暦への移行",
      "An Indigenous Voice to Parliament advisory body|Un órgano consultivo, la «Voz» indígena al Parlamento|Un organe consultatif, la « Voix » autochtone au Parlement|先住民の「議会への声」諮問機関の新設",
      "Renaming the country|Cambiar el nombre del país|Changer le nom du pays|国名の変更",
    ],
    1,
    "The proposal would have enshrined an advisory body of Aboriginal and Torres Strait Islander representatives in the constitution to advise Parliament on matters affecting Indigenous communities; it was defeated nationally, though it carried majority support in some individual electorates.|La propuesta habría consagrado en la constitución un órgano consultivo de representantes aborígenes e isleños del Estrecho de Torres para asesorar al Parlamento; fue rechazada a nivel nacional, aunque obtuvo mayoría en algunos distritos concretos.|La proposition aurait inscrit dans la constitution un organe consultatif de représentants aborigènes et insulaires du détroit de Torres pour conseiller le Parlement ; elle fut rejetée à l'échelle nationale, bien qu'elle ait obtenu la majorité dans certaines circonscriptions.|この提案は、アボリジナルとトレス海峡諸島民の代表による諮問機関を憲法に新設し、先住民に関わる事柄について議会に助言させるものだった。全国では否決されたが、一部の選挙区では賛成が上回った。",
  ),
  q(
    4,
    "Which of these is NOT one of Australia's states or territories?|¿Cuál de estos NO es un estado o territorio de Australia?|Lequel n'est PAS un État ou territoire d'Australie ?|次のうち、オーストラリアの州・準州ではないものは?",
    [
      "Tasmania|Tasmania|Tasmanie|タスマニア",
      "Victoria|Victoria|Victoria|ヴィクトリア",
      "Auckland|Auckland|Auckland|オークランド",
    ],
    2,
    "Auckland is New Zealand's largest city, a common mix-up for people who lump Australia and New Zealand together despite the roughly 2,000 km of ocean between them.|Auckland es la mayor ciudad de Nueva Zelanda, una confusión habitual para quienes mezclan Australia y Nueva Zelanda pese a los cerca de 2.000 km de océano entre ambas.|Auckland est la plus grande ville de Nouvelle-Zélande, une confusion fréquente chez qui mélange Australie et Nouvelle-Zélande malgré les quelque 2 000 km d'océan qui les séparent.|オークランドはニュージーランド最大の都市である。両国のあいだにはおよそ2,000kmの海が隔てているにもかかわらず、オーストラリアとニュージーランドを混同してしまう人はよくいる。",
  ),
  q(
    5,
    "The Daintree in far north Queensland is often cited as one of the world's oldest surviving what?|El Daintree, en el extremo norte de Queensland, se cita a menudo como uno de los ejemplos más antiguos del mundo de qué?|Le Daintree, dans l'extrême nord du Queensland, est souvent cité comme l'un des plus anciens exemples au monde de quoi ?|クイーンズランド最北部のデインツリーは、世界最古級の何として挙げられることが多いか?",
    [
      "Coral reefs|Arrecifes de coral|Récifs coralliens|サンゴ礁",
      "Deserts|Desiertos|Déserts|砂漠",
      "Tropical rainforests|Selvas tropicales|Forêts tropicales humides|熱帯雨林",
    ],
    2,
    "Estimated by some botanists to be over 180 million years old in parts, older than flowering plants themselves, the Daintree holds plant lineages found almost nowhere else on the planet.|Algunos botánicos calculan que partes de él tienen más de 180 millones de años, más antiguo que las propias plantas con flores, y el Daintree alberga linajes vegetales que casi no se hallan en ningún otro lugar del planeta.|Estimé par certains botanistes à plus de 180 millions d'années par endroits, plus ancien que les plantes à fleurs elles-mêmes, le Daintree abrite des lignées végétales que l'on ne trouve presque nulle part ailleurs sur la planète.|一部の植物学者によれば、その一部は1億8千万年以上前――被子植物そのものより古い――にまでさかのぼるとされ、デインツリーには地球上のほとんど他に類を見ない植物系統が生き残っている。",
  ),
  q(
    9,
    "What did Harold Holt's disappearance eventually lead to being named after him in Melbourne, a choice many now find ironic?|¿Qué acabó bautizándose con el nombre de Harold Holt en Melbourne tras su desaparición, una elección que muchos hoy encuentran irónica?|Qu'est-ce qui finit par être nommé en l'honneur de Harold Holt à Melbourne après sa disparition, un choix que beaucoup trouvent aujourd'hui ironique ?|ハロルド・ホルトの失踪後、メルボルンで彼にちなんで名付けられ、いまでは皮肉と受け止められることの多いものは何か?",
    [
      "A public swimming centre|Un centro público de natación|Un centre aquatique public|公共の水泳施設",
      "An airport|Un aeropuerto|Un aéroport|空港",
      "A university|Una universidad|Une université|大学",
    ],
    0,
    "The Harold Holt Swim Centre in the Melbourne suburb of Glen Iris opened not long after his disappearance and has kept the name ever since, dark joke and all.|El Harold Holt Swim Centre, en el suburbio de Glen Iris en Melbourne, abrió poco después de su desaparición y ha conservado el nombre desde entonces, con chiste negro incluido.|Le Harold Holt Swim Centre, dans la banlieue de Glen Iris à Melbourne, ouvrit peu après sa disparition et a gardé ce nom depuis, plaisanterie noire comprise.|メルボルン郊外グレン・アイリスにあるハロルド・ホルト・スイム・センターは、彼の失踪から間もなく開業し、以来そのブラックジョークめいた名をそのまま使い続けている。",
  ),
  q(
    2,
    "What is a baby kangaroo called?|¿Cómo se llama una cría de canguro?|Comment appelle-t-on un bébé kangourou ?|カンガルーの赤ちゃんは何と呼ばれるか?",
    [
      "A cub|Un cachorro|Un petit|カブ",
      "A joey|Un joey|Un joey|ジョーイ",
      "A kid|Un cabrito|Un chevreau|キッド",
    ],
    1,
    "A newborn joey is barely the size of a jellybean and crawls unaided into its mother's pouch, where it will stay attached to a teat for weeks before its eyes even open.|Un joey recién nacido apenas mide lo que una gominola y trepa sin ayuda hasta la bolsa de su madre, donde permanecerá pegado a una teta semanas antes de que se le abran los ojos.|Un joey nouveau-né a à peine la taille d'un jelly bean et grimpe sans aide jusque dans la poche de sa mère, où il reste attaché à une mamelle des semaines avant même que ses yeux ne s'ouvrent.|生まれたばかりのジョーイはグミ菓子ほどの大きさしかなく、誰の助けも借りずに母親の袋へよじ登り、目が開くまでの何週間も乳首にくっついたまま過ごす。",
  ),
  q(
    3,
    "What is Australia's national anthem called?|¿Cómo se llama el himno nacional de Australia?|Comment s'appelle l'hymne national de l'Australie ?|オーストラリアの国歌の名前は?",
    [
      "God Save the King|God Save the King|God Save the King|ゴッド・セイヴ・ザ・キング",
      "Waltzing Matilda|Waltzing Matilda|Waltzing Matilda|ワルツィング・マチルダ",
      "Advance Australia Fair|Advance Australia Fair|Advance Australia Fair|アドヴァンス・オーストラリア・フェア",
    ],
    2,
    "Waltzing Matilda is so widely sung and beloved that it is often assumed to be the anthem, but it has only ever been an unofficial second anthem, most closely tied to sport and to Australians serving overseas.|Waltzing Matilda se canta tanto y con tanto cariño que a menudo se supone que es el himno, pero solo ha sido un segundo himno no oficial, ligado sobre todo al deporte y a los australianos en el extranjero.|Waltzing Matilda est si largement chantée et appréciée qu'on la croit souvent être l'hymne, mais elle n'a jamais été qu'un second hymne officieux, surtout lié au sport et aux Australiens à l'étranger.|ワルツィング・マチルダはあまりに広く歌われ親しまれているため国歌だと思われがちだが、これはあくまで非公式の「もう一つの国歌」であり、スポーツや海外にいるオーストラリア人と結びつくことが多い。",
  ),
  q(
    6,
    "What does \"Country\" mean when Aboriginal people use the capitalised word in English?|¿Qué significa «Country» cuando la gente aborigen usa esta palabra en mayúscula en inglés?|Que signifie « Country » (avec majuscule) quand les Aborigènes emploient ce mot en anglais ?|アボリジナルの人々が英語で大文字の「Country」という言葉を使うとき、それは何を意味するか?",
    [
      "A specific ancestral homeland with deep spiritual and cultural ties|Una tierra ancestral concreta con profundos vínculos espirituales y culturales|Un pays ancestral précis, avec de profonds liens spirituels et culturels|深い精神的・文化的つながりを持つ、特定の祖先の土地",
      "The nation of Australia as a whole|La nación de Australia en su conjunto|La nation australienne dans son ensemble|オーストラリアという国家全体",
      "Any rural, non-city area|Cualquier zona rural, no urbana|Toute zone rurale, non urbaine|都市部以外のあらゆる田舎",
    ],
    0,
    "Country in this sense refers to a specific, named area tied to a particular group's law, language and ancestral responsibility, which is why \"Welcome to Country\" ceremonies name the local group rather than speaking generically.|Country en este sentido se refiere a un área concreta y nombrada, ligada a la ley, la lengua y la responsabilidad ancestral de un grupo determinado, por lo que las ceremonias de «Bienvenida al País» nombran al grupo local en vez de hablar de forma genérica.|Country en ce sens désigne une zone précise et nommée, liée à la loi, à la langue et à la responsabilité ancestrale d'un groupe donné, d'où le fait que les cérémonies de « Welcome to Country » nomment le groupe local plutôt que de parler en termes génériques.|この意味でのカントリーは、特定の集団の掟・言語・祖先からの責務と結びついた、名を持つ特定の土地を指す。「ウェルカム・トゥ・カントリー」の式典で地元の集団の名を挙げて語られるのはそのためである。",
  ),
  q(
    4,
    "What is the name for a communal drink round in an Australian pub, where each person in a group buys everyone a drink in turn?|¿Cómo se llama a la ronda comunal de bebidas en un pub australiano, donde cada persona del grupo invita a todos por turnos?|Comment appelle-t-on la tournée collective dans un pub australien, où chacun paie à boire à tour de rôle ?|オーストラリアのパブで、グループの一人ひとりが順番に全員へおごる習わしは何と呼ばれるか?",
    [
      "A round-up|Un «round-up»|Un « round-up »|ラウンドアップ",
      "A shout|Un «shout»|Un « shout »|シャウト",
      "A tally|Un «tally»|Un « tally »|タリー",
    ],
    1,
    "Refusing to take your turn in the shout is considered poor form, and the custom is old enough that some pubs historically closed their doors briefly at closing time specifically to let the current shout finish.|Negarse a tomar el turno en el shout se considera de mala educación, y la costumbre es tan antigua que algunos pubs históricamente cerraban brevemente sus puertas a la hora de cierre solo para dejar terminar el shout en curso.|Refuser son tour dans le shout est considéré comme malpoli, et la coutume est assez ancienne pour que certains pubs aient historiquement fermé brièvement leurs portes à l'heure de fermeture, le temps de laisser le shout en cours se terminer.|自分の番でシャウトをしないのは無作法とされ、この習慣はかなり古くからあり、閉店時刻になっても進行中のシャウトを終わらせるために一時的に扉を閉めていたパブが歴史上あったほどである。",
  ),
  q(
    7,
    "The Torres Strait Islands, a distinct Indigenous culture from mainland Aboriginal groups, lie between Australia and which country?|Las islas del Estrecho de Torres, con una cultura indígena propia distinta de los grupos aborígenes continentales, se sitúan entre Australia y qué país?|Les îles du détroit de Torres, culture indigène distincte des groupes aborigènes continentaux, se trouvent entre l'Australie et quel pays ?|本土のアボリジナルの人々とは異なる独自の先住民文化を持つトレス海峡諸島は、オーストラリアとどこの国のあいだにあるか?",
    [
      "Indonesia|Indonesia|L'Indonésie|インドネシア",
      "East Timor|Timor Oriental|Le Timor oriental|東ティモール",
      "Papua New Guinea|Papúa Nueva Guinea|La Papouasie-Nouvelle-Guinée|パプアニューギニア",
    ],
    2,
    "The Torres Strait Islander flag, distinct from the Aboriginal flag, is flown alongside it at many official Australian events, reflecting that the two are recognised as separate Indigenous peoples of the country.|La bandera de las islas del Estrecho de Torres, distinta de la bandera aborigen, ondea junto a ella en muchos actos oficiales australianos, reflejando que se reconoce a ambos como pueblos indígenas separados del país.|Le drapeau des insulaires du détroit de Torres, distinct du drapeau aborigène, est hissé à ses côtés lors de nombreux événements officiels australiens, reflétant leur reconnaissance comme deux peuples autochtones distincts du pays.|トレス海峡諸島民の旗はアボリジナル旗とは別のもので、多くの公式行事で並べて掲げられる。両者がこの国の別々の先住民として認められていることを表している。",
  ),

  // --- 追加分(第1弾・5問の試作)。難易度7以上の層を厚くする方向性の確認用。 ---
  q(
    3,
    "What is unusual about wombat droppings?|¿Qué tiene de inusual el excremento del wombat?|Qu'est-ce qui est inhabituel dans les excréments du wombat ?|ウォンバットの糞について珍しい点は?",
    [
      "They are shaped like cubes|Tienen forma de cubo|Ils ont la forme de cubes|立方体の形をしている",
      "They glow faintly in the dark|Brillan tenuemente en la oscuridad|Ils luisent faiblement dans le noir|暗闇でかすかに光る",
      "They are the size of a grain of rice|Tienen el tamaño de un grano de arroz|Ils ont la taille d'un grain de riz|米粒ほどの大きさしかない",
    ],
    0,
    "Wombats stack their cube-shaped droppings on top of rocks and logs to mark territory, and researchers found in 2018 that the cube shape comes from uneven elasticity along different stretches of the wombat's very long intestine.|Los wombats apilan su excremento cúbico sobre rocas y troncos para marcar territorio, y en 2018 los investigadores descubrieron que la forma cúbica se debe a la elasticidad desigual a lo largo del intestino, muy largo, del wombat.|Les wombats empilent leurs excréments cubiques sur des rochers et des troncs pour marquer leur territoire, et des chercheurs ont découvert en 2018 que la forme cubique vient d'une élasticité inégale le long du très long intestin du wombat.|ウォンバットは立方体をした糞を岩や倒木の上に積んで縄張りを示す。2018年の研究によれば、この立方体という形は、ウォンバットの非常に長い腸のなかで場所ごとに弾力性が異なることから生まれるという。",
  ),
  q(
    7,
    "Before Australian train travellers could ride a single track all the way from Perth to Brisbane, what routinely forced them to change trains at some colonial (later state) borders?|Antes de que los viajeros australianos pudieran recorrer una sola vía de Perth a Brisbane, ¿qué les obligaba habitualmente a cambiar de tren en algunas fronteras coloniales (luego estatales)?|Avant que les voyageurs australiens ne puissent parcourir une seule voie de Perth à Brisbane, qu'est-ce qui les obligeait couramment à changer de train à certaines frontières coloniales (puis d'État) ?|パースからブリスベンまで一本の線路で行けるようになる前、植民地(後の州)の境界で乗り換えを強いられた原因は?",
    [
      "Each colony had built its railways to a different track gauge|Cada colonia había construido sus ferrocarriles con un ancho de vía distinto|Chaque colonie avait construit ses chemins de fer selon un écartement de voie différent|各植民地が異なる軌間で鉄道を建設していたこと",
      "Steam locomotives were legally barred from crossing colonial borders|A las locomotoras de vapor se les prohibía legalmente cruzar fronteras coloniales|Les locomotives à vapeur étaient légalement interdites de franchir les frontières coloniales|蒸気機関車が法律で植民地の境界を越えられなかったこと",
      "Passengers needed a separate ticket stamped in each colony's capital|Los pasajeros necesitaban un billete aparte sellado en la capital de cada colonia|Les passagers avaient besoin d'un billet distinct tamponné dans la capitale de chaque colonie|各植民地の州都で別の切符に印を押してもらう必要があったこと",
    ],
    0,
    "New South Wales built to standard gauge, Victoria and South Australia to broad gauge, and Queensland and Western Australia to narrow gauge, each colony choosing largely without regard for its neighbours; the border town of Albury became notorious for the resulting middle-of-the-night carriage change, a problem not fully solved until standard-gauge links were finished decades after federation.|Nueva Gales del Sur construyó con trocha estándar, Victoria y Australia Meridional con trocha ancha, y Queensland y Australia Occidental con trocha angosta, cada colonia eligiendo en gran medida sin tener en cuenta a sus vecinas; el pueblo fronterizo de Albury se hizo tristemente célebre por el consiguiente cambio de vagón en plena noche, un problema no resuelto del todo hasta que se terminaron los enlaces de trocha estándar décadas después de la federación.|La Nouvelle-Galles du Sud construisit à écartement standard, Victoria et l'Australie-Méridionale à voie large, et le Queensland et l'Australie-Occidentale à voie étroite, chaque colonie choisissant en grande partie sans égard pour ses voisines ; la ville frontière d'Albury devint tristement célèbre pour le changement de wagon en pleine nuit qui en résultait, un problème pas vraiment résolu avant l'achèvement de liaisons à écartement standard des décennies après la fédération.|ニューサウスウェールズは標準軌、ヴィクトリアと南オーストラリアは広軌、クイーンズランドと西オーストラリアは狭軌で鉄道を敷いており、各植民地はおおむね隣接地のことなど気にせず軌間を選んでいた。その結果、国境の町オールベリーでは真夜中の車両乗り換えが名物となり、連邦結成から数十年後に標準軌の連絡線が完成するまで、この問題は根本的には解決しなかった。",
  ),
  q(
    8,
    "The Indian Pacific railway crosses the Nullarbor Plain on a section of track famous for what?|El ferrocarril Indian Pacific cruza la llanura de Nullarbor por un tramo de vía célebre por qué?|Le chemin de fer Indian Pacific traverse la plaine du Nullarbor sur un tronçon de voie célèbre pour quoi ?|インディアン・パシフィック号はヌラボー平原を横切る際、ある区間の線路で知られている。それは何か?",
    [
      "The steepest gradient on any Australian railway|La pendiente más pronunciada de cualquier ferrocarril australiano|La pente la plus raide de tout chemin de fer australien|オーストラリアの鉄道で最も急な勾配",
      "478 km without a single curve, the longest dead-straight stretch of track on Earth|478 km sin una sola curva, el tramo de vía completamente recto más largo del planeta|478 km sans une seule courbe, le plus long tronçon de voie parfaitement rectiligne au monde|カーブが一つもない478km、地球上で最も長い直線区間",
      "A tunnel that runs entirely below sea level|Un túnel que discurre enteramente bajo el nivel del mar|Un tunnel entièrement situé sous le niveau de la mer|全区間が海面下を通るトンネル",
    ],
    1,
    "The Nullarbor's near-total flatness and lack of obstacles let engineers lay the line straight for 478 km between Ooldea and Loongana, a stretch so featureless that early telegraph workers along it reportedly went stir-crazy from the monotony.|La llanura del Nullarbor es tan plana y carece tanto de obstáculos que los ingenieros pudieron tender la vía recta durante 478 km entre Ooldea y Loongana, un tramo tan monótono que, según se cuenta, los primeros telegrafistas destinados allí perdían la cabeza de aburrimiento.|Le Nullarbor est si plat et dépourvu d'obstacles que les ingénieurs purent tracer la voie en ligne droite sur 478 km entre Ooldea et Loongana, un tronçon si monotone que les premiers télégraphistes qui y étaient postés en seraient, dit-on, devenus à moitié fous d'ennui.|ヌラボー平原はほとんど起伏も障害物もないため、技術者たちはウールディアからルーンガナまでの478kmを直線で敷設できた。あまりに単調な区間で、かつてここに配置された電信技師たちは退屈のあまり気がおかしくなりかけたと伝えられる。",
  ),
  q(
    6,
    "The Ghan, the long-distance train linking Adelaide and Darwin, takes its name in honour of whom?|El Ghan, el tren de larga distancia que une Adelaida y Darwin, toma su nombre en honor a quiénes?|Le Ghan, le train longue distance reliant Adélaïde et Darwin, tire son nom en l'honneur de qui ?|アデレードとダーウィンを結ぶ長距離列車「ザ・ガン」は、誰にちなんで名付けられたか?",
    [
      "Afghan cameleers who supplied the outback by camel train in the 19th century|Los camelleros afganos que abastecían el outback con caravanas de camellos en el siglo XIX|Les chameliers afghans qui ravitaillaient l'outback par caravanes de chameaux au XIXe siècle|19世紀、ラクダの隊商でアウトバックへ物資を運んだアフガン人のラクダ使いたち",
      "A British colonial railway engineer named Ghan|Un ingeniero ferroviario colonial británico llamado Ghan|Un ingénieur ferroviaire colonial britannique nommé Ghan|ガンという名の英国人植民地鉄道技師",
      "The Ghan River, which the original line ran alongside|El río Ghan, junto al que discurría la línea original|La rivière Ghan, que la ligne d'origine longeait|かつて線路が沿っていたガン川",
    ],
    0,
    "Camel trains driven by cameleers recruited chiefly from Afghanistan and British India supplied remote settlements and telegraph stations from the 1860s until trucks and railways took over the work; a small mosque some of them built survives in the outback town of Marree.|Las caravanas de camellos, guiadas por camelleros reclutados sobre todo en Afganistán y la India británica, abastecían asentamientos remotos y estaciones telegráficas desde la década de 1860 hasta que camiones y ferrocarriles asumieron esa labor; una pequeña mezquita que algunos de ellos construyeron sobrevive en el pueblo del outback de Marree.|Des caravanes de chameaux, menées par des chameliers recrutés surtout en Afghanistan et en Inde britannique, ravitaillaient des localités isolées et des stations télégraphiques depuis les années 1860 jusqu'à ce que camions et chemins de fer prennent le relais ; une petite mosquée que certains d'entre eux bâtirent subsiste dans la ville de l'outback de Marree.|1860年代から、主にアフガニスタンと英領インドから来たラクダ使いたちがラクダの隊商を率い、トラックと鉄道がその役目を引き継ぐまで、辺境の集落や電信局へ物資を運んでいた。彼らの一部が建てた小さなモスクは、いまもアウトバックの町マリーに残っている。",
  ),
  q(
    6,
    "What is the key difference between a \"Welcome to Country\" and an \"Acknowledgement of Country\" at an Australian event?|¿Cuál es la diferencia clave entre un «Welcome to Country» y un «Acknowledgement of Country» en un evento australiano?|Quelle est la différence essentielle entre un « Welcome to Country » et un « Acknowledgement of Country » lors d'un événement australien ?|オーストラリアの式典における「ウェルカム・トゥ・カントリー」と「アクノレッジメント・オブ・カントリー」の決定的な違いは?",
    [
      "A Welcome to Country can only be delivered by a Traditional Owner or Custodian of that Country, while an Acknowledgement can be spoken by anyone|Un Welcome to Country solo puede darlo un propietario o custodio tradicional de ese País, mientras que un Acknowledgement puede decirlo cualquiera|Un Welcome to Country ne peut être prononcé que par un propriétaire ou gardien traditionnel de ce Pays, tandis qu'un Acknowledgement peut l'être par n'importe qui|ウェルカム・トゥ・カントリーはその土地の伝統的な所有者・管理者だけが行えるが、アクノレッジメントは誰でも述べられる",
      "They are simply two names for the exact same short speech|Son simplemente dos nombres para el mismo breve discurso|Ce sont simplement deux noms pour le même bref discours|どちらも同じ短い挨拶を指す、単なる呼び方の違いにすぎない",
      "An Acknowledgement of Country is only used at events held outside Australia|Un Acknowledgement of Country solo se usa en eventos celebrados fuera de Australia|Un Acknowledgement of Country n'est utilisé que lors d'événements organisés hors d'Australie|アクノレッジメントはオーストラリア国外で開かれる式典でのみ使われる",
    ],
    0,
    "A Welcome to Country is a formal, invited role performed only by a Traditional Owner or Custodian of the specific Country where the event is held, while an Acknowledgement of Country is a shorter statement of respect that any speaker, Indigenous or not, can offer when no Traditional Owner is present to welcome.|Un Welcome to Country es un rol formal, por invitación, que solo desempeña un propietario o custodio tradicional del País concreto donde se celebra el evento, mientras que un Acknowledgement of Country es una declaración de respeto más breve que cualquier orador, indígena o no, puede ofrecer cuando no hay presente ningún propietario tradicional para dar la bienvenida.|Un Welcome to Country est un rôle formel, sur invitation, assuré uniquement par un propriétaire ou gardien traditionnel du Pays précis où se tient l'événement, tandis qu'un Acknowledgement of Country est une déclaration de respect plus brève que tout intervenant, autochtone ou non, peut prononcer en l'absence de propriétaire traditionnel pour accueillir.|ウェルカム・トゥ・カントリーは、その式典が開かれる特定の土地の伝統的な所有者・管理者だけが招かれて務める正式な役目である。一方アクノレッジメント・オブ・カントリーはより短い敬意の表明で、歓迎を述べる伝統的所有者がその場にいない場合に、先住民かどうかを問わず誰でも述べることができる。",
  ),

  // --- 追加分(第2弾)。難易度1〜3を厚くする。 ---
  q(
    1,
    "Besides being a country, what is Australia also, uniquely among the world's nations?|Además de ser un país, ¿qué es también Australia, algo único entre las naciones del mundo?|En plus d'être un pays, qu'est aussi l'Australie, fait unique parmi les nations du monde ?|オーストラリアは一つの国であると同時に、世界の国々の中でも珍しくもう一つ何でもあるか?",
    [
      "A whole continent|Un continente entero|Un continent entier|大陸まるごと",
      "An archipelago made of a thousand islands|Un archipiélago de mil islas|Un archipel de mille îles|千の島からなる群島",
      "A peninsula attached to Asia|Una península unida a Asia|Une péninsule rattachée à l'Asie|アジアに陸続きの半島",
    ],
    0,
    "Australia is both a nation and, depending on how the count is made, the world's smallest continent or its largest island, a double identity no other country holds on its own.|Australia es a la vez una nación y, según cómo se cuente, el continente más pequeño del mundo o su isla más grande, una doble identidad que ningún otro país tiene en solitario.|L'Australie est à la fois une nation et, selon la façon de compter, le plus petit continent du monde ou sa plus grande île, une double identité qu'aucun autre pays ne détient à lui seul.|オーストラリアは一つの国家であると同時に、数え方によっては世界最小の大陸、あるいは世界最大の島でもある。この二重の立場を単独で持つ国は他にない。",
  ),
  q(
    1,
    "Each winter, large numbers of which marine mammal migrate along Australia's coastline to breed in warmer northern waters?|Cada invierno, grandes cantidades de qué mamífero marino migran por la costa australiana para reproducirse en aguas más cálidas del norte?|Chaque hiver, un grand nombre de quel mammifère marin migre le long des côtes australiennes pour se reproduire dans des eaux plus chaudes au nord ?|毎年冬、北のより暖かい海域で繁殖するために豪州の海岸沿いを大移動する海洋哺乳類は?",
    [
      "Walruses|Morsas|Morses|セイウチ",
      "Whales|Ballenas|Baleines|クジラ",
      "Manatees|Manatíes|Lamantins|マナティー",
    ],
    1,
    "Humpback whales travel thousands of kilometres each year from Antarctic feeding grounds to warmer breeding waters off Queensland, passing close enough to shore that whale watching has become a major seasonal industry in cities like Sydney.|Las ballenas jorobadas recorren miles de kilómetros cada año desde las zonas de alimentación antárticas hasta aguas de cría más cálidas frente a Queensland, pasando lo bastante cerca de la costa como para que la observación de ballenas se haya convertido en una industria estacional importante en ciudades como Sídney.|Les baleines à bosse parcourent des milliers de kilomètres chaque année depuis leurs zones d'alimentation antarctiques jusqu'à des eaux de reproduction plus chaudes au large du Queensland, passant assez près des côtes pour que l'observation des baleines soit devenue une importante activité saisonnière dans des villes comme Sydney.|ザトウクジラは毎年、南極の索餌海域からクイーンズランド沖のより暖かい繁殖海域まで数千kmを移動する。その経路は海岸のすぐ近くを通るため、シドニーなどの都市では季節ごとのホエールウォッチングが一大産業になっている。",
  ),
  q(
    1,
    "Australia lies almost entirely within which hemisphere?|Australia se encuentra casi por completo en qué hemisferio?|L'Australie se trouve presque entièrement dans quel hémisphère ?|オーストラリアはほぼ全土がどちらの半球にあるか?",
    [
      "The Northern Hemisphere|El hemisferio norte|L'hémisphère nord|北半球",
      "It sits exactly on the equator|Está exactamente sobre el ecuador|Elle se trouve exactement sur l'équateur|赤道の真上",
      "The Southern Hemisphere|El hemisferio sur|L'hémisphère sud|南半球",
    ],
    2,
    "Being in the Southern Hemisphere means Australia's seasons run opposite to those in Europe or North America, so Christmas falls in the middle of summer and the coldest months are June to August.|Estar en el hemisferio sur significa que las estaciones de Australia son opuestas a las de Europa o Norteamérica, así que la Navidad cae en pleno verano y los meses más fríos son de junio a agosto.|Se trouver dans l'hémisphère sud signifie que les saisons de l'Australie sont inversées par rapport à celles de l'Europe ou de l'Amérique du Nord, si bien que Noël tombe en plein été et que les mois les plus froids vont de juin à août.|南半球にあるため、オーストラリアの季節はヨーロッパや北米と正反対になる。クリスマスは真夏に訪れ、いちばん寒いのは6月から8月にかけてである。",
  ),
  q(
    1,
    "Which ocean lies along Australia's east coast?|¿Qué océano bordea la costa este de Australia?|Quel océan borde la côte est de l'Australie ?|オーストラリアの東海岸に面する海は?",
    [
      "The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋",
      "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋",
      "The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海",
    ],
    0,
    "The Pacific washes the entire eastern seaboard, from the Great Barrier Reef in the tropical north down past Sydney and Melbourne to Tasmania in the south.|El Pacífico baña todo el litoral oriental, desde la Gran Barrera de Coral en el trópico norte hasta Tasmania en el sur, pasando por Sídney y Melbourne.|Le Pacifique baigne tout le littoral oriental, de la Grande Barrière de corail dans le nord tropical jusqu'à la Tasmanie au sud, en passant par Sydney et Melbourne.|太平洋は東海岸沿いをすべて洗っており、北の熱帯にあるグレートバリアリーフから、シドニーやメルボルンを経て、南のタスマニアまで続いている。",
  ),
  q(
    2,
    "What is the main language spoken across Australia?|¿Cuál es el idioma principal que se habla en toda Australia?|Quelle est la principale langue parlée dans toute l'Australie ?|オーストラリア全土で主に話されている言語は?",
    [
      "Dutch|Neerlandés|Le néerlandais|オランダ語",
      "English|Inglés|L'anglais|英語",
      "Portuguese|Portugués|Le portugais|ポルトガル語",
    ],
    1,
    "English has no official status written into the constitution, but it is the de facto national language, alongside more than 150 Aboriginal and Torres Strait Islander languages and a great many migrant community languages spoken at home.|El inglés no tiene estatus oficial escrito en la constitución, pero es el idioma nacional de facto, junto a más de 150 lenguas aborígenes y de isleños del Estrecho de Torres y muchísimas lenguas de comunidades migrantes que se hablan en casa.|L'anglais n'a aucun statut officiel inscrit dans la constitution, mais c'est la langue nationale de fait, aux côtés de plus de 150 langues aborigènes et des îles du détroit de Torres, ainsi que de nombreuses langues de communautés migrantes parlées à la maison.|英語は憲法上の公用語ではないが、事実上の国語になっている。ほかにも150を超えるアボリジナルとトレス海峡諸島民の言語、そして家庭で話される移民コミュニティの言語が数多く存在する。",
  ),
  q(
    2,
    "On which side of the road do people drive in Australia?|¿Por qué lado de la carretera se conduce en Australia?|De quel côté de la route conduit-on en Australie ?|オーストラリアでは道路のどちら側を走行するか?",
    [
      "The right|La derecha|La droite|右側",
      "It depends on the state|Depende del estado|Cela dépend de l'État|州によって異なる",
      "The left|La izquierda|La gauche|左側",
    ],
    2,
    "Driving on the left is a legacy of British colonial rule, the same convention used in the United Kingdom and Japan, and Australian cars are built with the steering wheel on the right-hand side to match.|Conducir por la izquierda es herencia del dominio colonial británico, la misma convención que se usa en el Reino Unido y Japón, y los coches australianos se fabrican con el volante a la derecha para encajar.|Conduire à gauche est un héritage de la domination coloniale britannique, la même convention qu'au Royaume-Uni et au Japon, et les voitures australiennes sont construites avec le volant à droite en conséquence.|左側通行は英国の植民地支配の名残で、イギリスや日本と同じ慣習である。それに合わせて、オーストラリアの自動車はハンドルが右側に付いている。",
  ),
  q(
    2,
    "What is the name of Australia's national currency?|¿Cómo se llama la moneda nacional de Australia?|Comment s'appelle la monnaie nationale de l'Australie ?|オーストラリアの通貨の名前は?",
    [
      "The Australian dollar|El dólar australiano|Le dollar australien|オーストラリア・ドル",
      "The Australian pound|La libra australiana|La livre australienne|オーストラリア・ポンド",
      "The Australian rand|El rand australiano|Le rand australien|オーストラリア・ランド",
    ],
    0,
    "Australian banknotes have been printed on plastic polymer rather than paper since 1988, a world first developed partly to defeat counterfeiters and partly because paper notes wore out fast in the country's climate; more than 30 other countries have since adopted polymer notes of their own.|Los billetes australianos se imprimen en polímero plástico en vez de papel desde 1988, una primicia mundial creada en parte para vencer a los falsificadores y en parte porque el papel se desgastaba rápido con el clima del país; desde entonces, más de 30 países han adoptado billetes de polímero propios.|Les billets australiens sont imprimés sur polymère plastique plutôt que sur papier depuis 1988, une première mondiale conçue en partie pour déjouer les faussaires et en partie parce que le papier s'usait vite sous ce climat ; plus de 30 autres pays ont depuis adopté leurs propres billets en polymère.|オーストラリアの紙幣は1988年から紙ではなくプラスチックのポリマー製になっている。これは偽造防止と、この国の気候では紙幣がすぐに傷むという理由から生まれた世界初の試みで、以来30以上の国が自国のポリマー紙幣を採用した。",
  ),
  q(
    2,
    "What do koalas eat almost exclusively?|¿Qué comen los koalas casi exclusivamente?|Que mangent presque exclusivement les koalas ?|コアラがほぼ主食としているものは?",
    [
      "Bamboo shoots|Brotes de bambú|Des pousses de bambou|タケノコ",
      "Eucalyptus leaves|Hojas de eucalipto|Des feuilles d'eucalyptus|ユーカリの葉",
      "Native grass seeds|Semillas de pastos nativos|Des graines de graminées indigènes|在来の草の種",
    ],
    1,
    "Eucalyptus leaves are low in nutrients and mildly toxic, so koalas sleep up to 20 hours a day to conserve energy while gut bacteria slowly break down the leaves' natural poisons.|Las hojas de eucalipto tienen pocos nutrientes y son levemente tóxicas, así que los koalas duermen hasta 20 horas al día para ahorrar energía mientras las bacterias de su intestino descomponen despacio los venenos naturales de las hojas.|Les feuilles d'eucalyptus sont pauvres en nutriments et légèrement toxiques, si bien que les koalas dorment jusqu'à 20 heures par jour pour économiser leur énergie pendant que les bactéries de leur intestin décomposent lentement les poisons naturels des feuilles.|ユーカリの葉は栄養が乏しく軽い毒性もあるため、コアラは1日最大20時間眠ってエネルギーを節約し、その間に腸内細菌が葉の天然毒素をゆっくり分解している。",
  ),
  q(
    3,
    "Why is much of the soil across Australia's interior a deep red colour?|¿Por qué gran parte del suelo del interior de Australia es de un color rojo intenso?|Pourquoi une grande partie du sol de l'intérieur de l'Australie est-elle d'un rouge profond ?|オーストラリア内陸部の土の多くが深い赤色をしているのはなぜか?",
    [
      "Volcanic ash has coated the ground|La ceniza volcánica ha cubierto el suelo|De la cendre volcanique a recouvert le sol|火山灰が地表を覆っているため",
      "Red algae grows across the topsoil|Crece un alga roja sobre la capa superior del suelo|Une algue rouge pousse sur la couche superficielle du sol|表土に赤い藻類が繁殖しているため",
      "Iron minerals in the soil have oxidised, or rusted|Los minerales de hierro del suelo se han oxidado, es decir, oxidado como el óxido|Des minéraux de fer présents dans le sol se sont oxydés, comme de la rouille|土に含まれる鉄分が酸化し、いわば錆びているため",
    ],
    2,
    "Much of the interior's ancient, deeply weathered soil is rich in iron minerals that have slowly oxidised over millions of years, essentially rusting the ground; the effect is especially vivid around the Red Centre near Uluru and Kata Tjuta.|Gran parte del suelo antiguo y muy meteorizado del interior es rico en minerales de hierro que se han oxidado lentamente durante millones de años, oxidando en esencia el terreno; el efecto es especialmente vívido en el Centro Rojo, cerca de Uluru y Kata Tjuta.|Une grande partie du sol ancien et fortement altéré de l'intérieur est riche en minéraux de fer qui se sont lentement oxydés au fil de millions d'années, rouillant en somme le terrain ; l'effet est particulièrement frappant dans le Red Centre, près d'Uluru et de Kata Tjuta.|内陸部の古く風化しきった土壌の多くは鉄分に富み、それが何百万年もかけてゆっくり酸化してきた。いわば大地そのものが錆びついている状態で、ウルルとカタ・ジュタ周辺の「レッド・センター」ではその赤さがとりわけ鮮やかである。",
  ),
  q(
    3,
    "What does the very common Australian phrase \"no worries\" typically mean?|¿Qué significa normalmente la frase australiana muy común «no worries»?|Que signifie généralement l'expression australienne très courante « no worries » ?|オーストラリアでよく使われる「ノー・ウォリーズ」という言葉が普段意味するものは?",
    [
      "That's fine, or you're welcome|Está bien, o de nada|C'est d'accord, ou de rien|大丈夫、あるいは「どういたしまして」",
      "I am currently worried about something|Estoy preocupado por algo ahora mismo|Je suis actuellement inquiet à propos de quelque chose|いま何かを心配している",
      "Please hurry up|Por favor, date prisa|Dépêchez-vous, s'il vous plaît|急いでください",
    ],
    0,
    "\"No worries\" can substitute for \"you're welcome,\" \"okay,\" or \"don't mention it\" depending on context, and the phrase has spread well beyond Australia into everyday English in other countries over the past few decades.|«No worries» puede sustituir a «de nada», «vale» o «no es nada» según el contexto, y la expresión se ha extendido mucho más allá de Australia al inglés cotidiano de otros países en las últimas décadas.|« No worries » peut remplacer « de rien », « d'accord » ou « ce n'est rien » selon le contexte, et l'expression s'est répandue bien au-delà de l'Australie dans l'anglais courant d'autres pays ces dernières décennies.|「ノー・ウォリーズ」は文脈によって「どういたしまして」「わかった」「気にしないで」のどれにもなり得る。この数十年でオーストラリアの外にも広がり、他国の日常英語にも入り込んでいる。",
  ),
  q(
    3,
    "What does the Australian expression \"fair dinkum\" mean?|¿Qué significa la expresión australiana «fair dinkum»?|Que signifie l'expression australienne « fair dinkum » ?|オーストラリアの表現「フェア・ディンカム」の意味は?",
    [
      "Extremely expensive|Extremadamente caro|Extrêmement cher|とても高価である",
      "Genuine or true|Genuino o verdadero|Authentique ou vrai|本物である、本当である",
      "A type of meat pie|Un tipo de pastel de carne|Un type de tourte à la viande|ミートパイの一種",
    ],
    1,
    "The word \"dinkum\" was already common slang by the 1890s gold rush era, though its exact origin is debated, and calling something \"fair dinkum\" is a way of vouching that it is the real deal.|La palabra «dinkum» ya era jerga común en la época de la fiebre del oro de la década de 1890, aunque se debate su origen exacto, y llamar a algo «fair dinkum» es una forma de dar fe de que es auténtico.|Le mot « dinkum » était déjà une expression courante à l'époque de la ruée vers l'or des années 1890, bien que son origine exacte soit débattue, et qualifier quelque chose de « fair dinkum » est une façon de garantir que c'est authentique.|「ディンカム」という語は1890年代のゴールドラッシュの頃にはすでによく使われる俗語だったが、正確な由来は定まっていない。何かを「フェア・ディンカム」と呼ぶのは、それが本物だと請け合う言い方である。",
  ),
  q(
    3,
    "In Australian English, what does the everyday word \"thongs\" refer to?|En el inglés australiano, ¿a qué se refiere la palabra cotidiana «thongs»?|Dans l'anglais australien, à quoi renvoie le mot courant « thongs » ?|オーストラリア英語で日常語「サングズ」が指すものは?",
    [
      "A type of wide-brimmed hat|Un tipo de sombrero de ala ancha|Un type de chapeau à large bord|つばの広い帽子の一種",
      "A style of underwear|Un tipo de ropa interior|Un type de sous-vêtement|下着の一種",
      "Flip-flop sandals|Sandalias de dedo, chanclas|Des tongs, sandales de plage|ビーチサンダル",
    ],
    2,
    "The mismatch with American English is a reliable source of confusion for visitors, since in Australia thongs are simply beach or shower footwear, sold cheaply at almost every supermarket and servo.|El desajuste con el inglés estadounidense confunde de forma fiable a los visitantes, ya que en Australia los thongs son simplemente calzado de playa o de ducha, vendido barato en casi todos los supermercados y servos.|Le décalage avec l'anglais américain déconcerte régulièrement les visiteurs, car en Australie, les thongs sont tout simplement des chaussures de plage ou de douche, vendues à bas prix dans presque tous les supermarchés et servos.|アメリカ英語との食い違いは訪問者を戸惑わせる定番の種になっている。オーストラリアではサングズは単なるビーチ用・シャワー用の履物で、ほとんどのスーパーやサーヴォで安く売られている。",
  ),
  q(
    3,
    "Who designed the Sydney Opera House?|¿Quién diseñó la Ópera de Sídney?|Qui a conçu l'Opéra de Sydney ?|シドニー・オペラハウスを設計したのは誰か?",
    [
      "Jørn Utzon, a Danish architect|Jørn Utzon, un arquitecto danés|Jørn Utzon, un architecte danois|デンマーク人建築家ヨーン・ウツソン",
      "Frank Lloyd Wright, an American architect|Frank Lloyd Wright, un arquitecto estadounidense|Frank Lloyd Wright, un architecte américain|アメリカ人建築家フランク・ロイド・ライト",
      "Walter Burley Griffin, an American architect|Walter Burley Griffin, un arquitecto estadounidense|Walter Burley Griffin, un architecte américain|アメリカ人建築家ウォルター・バーリー・グリフィン",
    ],
    0,
    "Utzon won an international design competition in 1957 but resigned from the project in 1966 amid disputes over cost and control, and he never saw the finished building in person before his death in 2008; it was formally completed in 1973.|Utzon ganó un concurso internacional de diseño en 1957, pero dimitió del proyecto en 1966 en medio de disputas por el coste y el control, y nunca vio en persona el edificio terminado antes de morir en 2008; se completó formalmente en 1973.|Utzon remporta un concours de conception international en 1957 mais démissionna du projet en 1966 au milieu de conflits sur le coût et le contrôle, et ne vit jamais le bâtiment achevé de ses propres yeux avant sa mort en 2008 ; il fut officiellement achevé en 1973.|ウツソンは1957年の国際設計競技で選ばれたが、費用と主導権をめぐる対立から1966年に計画を降り、2008年に亡くなるまで完成した建物を実際に見ることはなかった。建物自体は1973年に正式に完成した。",
  ),

  // --- 追加分(第3弾)。難易度4〜6を厚くする。 ---
  q(
    4,
    "Who is Australia's head of state?|¿Quién es el jefe de Estado de Australia?|Qui est le chef de l'État australien ?|オーストラリアの元首は誰か?",
    [
      "The Prime Minister|El primer ministro|Le Premier ministre|首相",
      "The reigning British monarch, represented locally by a Governor-General|El monarca británico reinante, representado localmente por un gobernador general|Le monarque britannique régnant, représenté localement par un gouverneur général|在位中の英国君主で、国内ではオーストラリア総督が代理を務める",
      "An elected President|Un presidente elegido|Un président élu|選挙で選ばれた大統領",
    ],
    1,
    "Australia is a constitutional monarchy and a member of the Commonwealth, so the King is formally head of state while day-to-day governing power sits with an elected Prime Minister and Parliament; a 1999 referendum on becoming a republic was narrowly defeated.|Australia es una monarquía constitucional y miembro de la Mancomunidad, así que el rey es formalmente el jefe de Estado, mientras que el poder de gobierno cotidiano recae en un primer ministro y un parlamento elegidos; un referéndum de 1999 sobre convertirse en república fue rechazado por poco.|L'Australie est une monarchie constitutionnelle et un membre du Commonwealth, si bien que le roi est formellement chef de l'État tandis que le pouvoir de gouverner au quotidien revient à un Premier ministre et un Parlement élus ; un référendum de 1999 sur le passage à la république fut rejeté de justesse.|オーストラリアは立憲君主制の国で英連邦の一員であり、国王が形式上の元首を務める一方、日々の統治権は選挙で選ばれた首相と議会が握っている。1999年に共和制移行を問う国民投票が行われたが、僅差で否決された。",
  ),
  q(
    4,
    "On what date did Australia's six colonies federate into a single nation?|¿En qué fecha se federaron las seis colonias australianas en una sola nación?|À quelle date les six colonies australiennes se sont-elles fédérées en une seule nation ?|オーストラリアの6つの植民地が一つの国家として連邦を結成したのはいつか?",
    [
      "4 July 1876|4 de julio de 1876|Le 4 juillet 1876|1876年7月4日",
      "25 April 1915|25 de abril de 1915|Le 25 avril 1915|1915年4月25日",
      "1 January 1901|1 de enero de 1901|Le 1er janvier 1901|1901年1月1日",
    ],
    2,
    "The Commonwealth of Australia came into existence at a ceremony in Sydney's Centennial Park, and Edmund Barton was sworn in as the country's first Prime Minister that same day, though full legislative independence from Britain took decades longer to complete.|La Mancomunidad de Australia nació en una ceremonia en el Centennial Park de Sídney, y Edmund Barton juró ese mismo día como primer ministro del país, aunque la plena independencia legislativa de Gran Bretaña tardó décadas más en completarse.|Le Commonwealth d'Australie vit le jour lors d'une cérémonie au Centennial Park de Sydney, et Edmund Barton fut assermenté ce jour-là comme premier Premier ministre du pays, bien que la pleine indépendance législative vis-à-vis de la Grande-Bretagne ait mis des décennies de plus à se concrétiser.|オーストラリア連邦は、シドニーのセンテニアル・パークでの式典によって誕生し、同じ日にエドマンド・バートンが初代首相として宣誓した。もっとも、英国からの立法上の完全な独立が実現するまでには、その後さらに数十年を要した。",
  ),
  q(
    4,
    "Held every November, which horse race is nicknamed \"the race that stops a nation\" and is a public holiday in Victoria?|Celebrada cada noviembre, ¿qué carrera de caballos se apoda «la carrera que paraliza a una nación» y es festivo en Victoria?|Disputée chaque novembre, quelle course hippique est surnommée « la course qui arrête une nation » et constitue un jour férié à Victoria ?|毎年11月に行われ、「国を止める競馬」の異名を持ち、ヴィクトリア州の祝日にもなっている競走は?",
    [
      "The Melbourne Cup|La Melbourne Cup|La Melbourne Cup|メルボルン・カップ",
      "The Sydney Gold Cup|La Sydney Gold Cup|La Sydney Gold Cup|シドニー・ゴールド・カップ",
      "The Brisbane Derby|El Derby de Brisbane|Le Derby de Brisbane|ブリスベン・ダービー",
    ],
    0,
    "First run in 1861, the Melbourne Cup draws such wide attention that many workplaces around the country pause for the race, even outside Victoria, and it is famous for occasional shock wins by long-odds outsiders.|Disputada por primera vez en 1861, la Melbourne Cup atrae tanta atención que muchos lugares de trabajo del país se detienen para verla, incluso fuera de Victoria, y es célebre por las sorpresas ocasionales de caballos con pocas opciones.|Disputée pour la première fois en 1861, la Melbourne Cup suscite une telle attention que de nombreux lieux de travail du pays s'arrêtent pour la course, même hors de Victoria, et elle est réputée pour ses victoires surprises occasionnelles de chevaux outsiders.|1861年に第1回が開催されたメルボルン・カップは注目度が非常に高く、ヴィクトリア州以外でもこのレースの間だけ仕事の手を止める職場が多い。大穴の馬による番狂わせの勝利で話題になることでも知られる。",
  ),
  q(
    4,
    "The Australian Open, one of tennis's four Grand Slam tournaments, is held each January in which city?|El Abierto de Australia, uno de los cuatro torneos de Grand Slam del tenis, se celebra cada enero en qué ciudad?|L'Open d'Australie, l'un des quatre tournois du Grand Chelem de tennis, se dispute chaque janvier dans quelle ville ?|テニスの四大大会の一つ、全豪オープンが毎年1月に開催される都市は?",
    [
      "Sydney|Sídney|Sydney|シドニー",
      "Melbourne|Melbourne|Melbourne|メルボルン",
      "Brisbane|Brisbane|Brisbane|ブリスベン",
    ],
    1,
    "Held in the middle of the Australian summer, the tournament is played on hard courts and is known for extreme heat-policy stoppages, unlike the other three Grand Slams which take place in the northern hemisphere's spring, early summer and late summer.|Celebrado en pleno verano australiano, el torneo se juega en pistas duras y es conocido por las pausas por calor extremo, a diferencia de los otros tres Grand Slam, que se disputan en la primavera, principios y finales del verano del hemisferio norte.|Disputé en plein été australien, le tournoi se joue sur surface dure et est connu pour ses interruptions liées à la chaleur extrême, contrairement aux trois autres tournois du Grand Chelem, qui se déroulent au printemps, au début et à la fin de l'été de l'hémisphère nord.|真夏のオーストラリアで開催されるこの大会はハードコートで行われ、猛暑による中断がたびたび話題になる。北半球の春・初夏・晩夏に行われる他の三大会とはこの点で対照的である。",
  ),
  q(
    4,
    "The Aboriginal flag, designed by Harold Thomas in 1971, uses which three colours?|La bandera aborigen, diseñada por Harold Thomas en 1971, usa qué tres colores?|Le drapeau aborigène, conçu par Harold Thomas en 1971, utilise quelles trois couleurs ?|1971年にハロルド・トーマスが手がけたアボリジナル旗が使う3色は?",
    [
      "Green, white and blue|Verde, blanco y azul|Vert, blanc et bleu|緑・白・青",
      "Orange, purple and grey|Naranja, morado y gris|Orange, violet et gris|オレンジ・紫・灰色",
      "Black, red and yellow|Negro, rojo y amarillo|Noir, rouge et jaune|黒・赤・黄",
    ],
    2,
    "Black represents Aboriginal people, red the earth and ochre used in ceremony, and yellow the sun, the giver of life; the flag was first flown at a land rights march in Adelaide in 1971 and became legally recognised as an official flag of Australia in 1995.|El negro representa a la gente aborigen, el rojo la tierra y el ocre usado en ceremonias, y el amarillo el sol, dador de vida; la bandera ondeó por primera vez en una marcha por los derechos a la tierra en Adelaida en 1971 y se reconoció legalmente como bandera oficial de Australia en 1995.|Le noir représente le peuple aborigène, le rouge la terre et l'ocre utilisé lors des cérémonies, et le jaune le soleil, source de vie ; le drapeau flotta pour la première fois lors d'une marche pour les droits fonciers à Adélaïde en 1971 et fut légalement reconnu comme drapeau officiel de l'Australie en 1995.|黒はアボリジナルの人々を、赤は大地と儀式で使われるオーカーを、黄は生命の源である太陽を表す。この旗は1971年、アデレードでの土地権利を求める行進で初めて掲げられ、1995年にオーストラリアの公式な旗の一つとして法的に認められた。",
  ),
  q(
    4,
    "Which Australian chocolate biscuit inspired the party trick called the \"Tim Tam Slam,\" where the biscuit is used as a straw for a hot drink?|¿Qué galleta de chocolate australiana inspiró el truco de fiesta llamado «Tim Tam Slam», en el que se usa la galleta como pajita para una bebida caliente?|Quel biscuit au chocolat australien a inspiré le tour de fête appelé « Tim Tam Slam », où le biscuit sert de paille pour une boisson chaude ?|お菓子を熱い飲み物のストロー代わりに使う「ティムタム・スラム」という遊びの元になったオーストラリアのチョコレートビスケットは?",
    [
      "The Tim Tam|El Tim Tam|Le Tim Tam|ティムタム",
      "The Anzac biscuit|La galleta Anzac|Le biscuit Anzac|アンザック・ビスケット",
      "The lamington|El lamington|Le lamington|ラミントン",
    ],
    0,
    "Biting off opposite corners of a Tim Tam and sucking a hot drink through it like a straw softens the biscuit until it collapses, and the manufacturer Arnott's has leaned into the trick in its own advertising for decades.|Morder las esquinas opuestas de un Tim Tam y sorber una bebida caliente a través de él como si fuera una pajita ablanda la galleta hasta que se desmorona, y el fabricante Arnott's ha explotado el truco en su propia publicidad durante décadas.|Mordre les coins opposés d'un Tim Tam et aspirer une boisson chaude au travers comme avec une paille ramollit le biscuit jusqu'à ce qu'il s'effondre, et le fabricant Arnott's exploite cette astuce dans sa propre publicité depuis des décennies.|ティムタムの対角の角をかじり、それをストロー代わりにして熱い飲み物を吸うと、ビスケットが柔らかくなって崩れ落ちる。製造元のアーノッツ社は何十年もこの遊び方を自社広告に取り入れてきた。",
  ),
  q(
    5,
    "The thylacine, or Tasmanian tiger, is believed to have gone extinct after the last known individual died where in 1936?|Se cree que el tilacino, o tigre de Tasmania, se extinguió tras la muerte del último ejemplar conocido en 1936, ¿dónde?|On pense que le thylacine, ou tigre de Tasmanie, s'est éteint après la mort du dernier individu connu en 1936, où ?|タスマニアタイガー(フクロオオカミ)は1936年、最後に確認された個体がどこで死んだことをもって絶滅したとされているか?",
    [
      "In the wild in the Simpson Desert|En estado salvaje en el desierto de Simpson|À l'état sauvage dans le désert de Simpson|野生でシンプソン砂漠にて",
      "In captivity at Hobart Zoo|En cautiverio en el zoo de Hobart|En captivité au zoo de Hobart|ホバート動物園で飼育下にて",
      "On a fishing boat off Tasmania|En un barco de pesca frente a Tasmania|Sur un bateau de pêche au large de la Tasmanie|タスマニア沖の漁船上で",
    ],
    1,
    "Despite the official 1936 date, unconfirmed sightings have been reported for decades afterward, and none has ever been verified with a body, photograph or DNA sample, so the animal remains listed as extinct rather than merely rare.|Pese a la fecha oficial de 1936, se han reportado avistamientos no confirmados durante décadas después, y ninguno se ha verificado nunca con un cuerpo, fotografía o muestra de ADN, por lo que el animal sigue catalogado como extinto y no simplemente raro.|Malgré la date officielle de 1936, des observations non confirmées ont été signalées pendant des décennies par la suite, et aucune n'a jamais été vérifiée par un corps, une photographie ou un échantillon d'ADN, si bien que l'animal reste classé comme éteint plutôt que simplement rare.|公式には1936年とされているが、それ以降も未確認の目撃情報が何十年も報告され続けている。しかし死骸や写真、DNA試料による裏付けは一度もなく、この動物は単に希少なのではなく絶滅種として扱われ続けている。",
  ),
  q(
    5,
    "Which small, notoriously venomous marine creature prompts \"stinger season\" swimming warnings in tropical northern Australia?|¿Qué pequeña criatura marina, célebre por su veneno, provoca los avisos de «temporada de picaduras» al nadar en el norte tropical de Australia?|Quelle petite créature marine, réputée pour son venin, déclenche les avertissements de « saison des piqûres » pour la baignade dans le nord tropical de l'Australie ?|熱帯の北部オーストラリアで遊泳時に「毒針シーズン」の注意を呼びかける原因となる、猛毒で知られる小さな海洋生物は?",
    [
      "The clownfish|El pez payaso|Le poisson-clown|クマノミ",
      "The sea cucumber|El pepino de mar|Le concombre de mer|ナマコ",
      "The box jellyfish|La medusa de caja|La méduse-boîte|ハコクラゲ",
    ],
    2,
    "Box jellyfish and the much smaller Irukandji jellyfish are both found in northern Australian waters during the warmer months, and many beaches there close or require full-body stinger suits from roughly November to May as a result.|Las medusas de caja y las medusas de Irukandji, mucho más pequeñas, se encuentran ambas en aguas del norte de Australia durante los meses más cálidos, y por eso muchas playas de la zona cierran o exigen trajes de neopreno completos contra picaduras de noviembre a mayo aproximadamente.|Les méduses-boîtes et les méduses d'Irukandji, bien plus petites, se trouvent toutes deux dans les eaux du nord de l'Australie pendant les mois les plus chauds, et de nombreuses plages y ferment ou exigent des combinaisons intégrales anti-piqûres de novembre à mai environ.|ハコクラゲと、それよりずっと小さいイルカンジクラゲは、いずれも暖かい時期の北部オーストラリアの海に現れる。そのため多くのビーチはおよそ11月から5月にかけて閉鎖されるか、全身を覆う防護スーツの着用が求められる。",
  ),
  q(
    5,
    "Dingoes are not native marsupials but are thought to have arrived in Australia roughly how long ago, brought by seafarers from Asia?|Los dingos no son marsupiales nativos, sino que se cree que llegaron a Australia hace aproximadamente cuánto tiempo, traídos por navegantes de Asia?|Les dingos ne sont pas des marsupiaux natifs, mais on pense qu'ils sont arrivés en Australie il y a environ combien de temps, amenés par des navigateurs venus d'Asie ?|ディンゴは在来の有袋類ではなく、アジアからの航海者によっておよそどれくらい前にオーストラリアへもたらされたと考えられているか?",
    [
      "About 4,000 years ago|Hace unos 4.000 años|Il y a environ 4 000 ans|およそ4,000年前",
      "About 400 years ago|Hace unos 400 años|Il y a environ 400 ans|およそ400年前",
      "About 40,000 years ago|Hace unos 40.000 años|Il y a environ 40 000 ans|およそ4万年前",
    ],
    0,
    "Genetic studies place the dingo's arrival at somewhere around three to five thousand years ago, long after the first human settlement of the continent, which is why dingoes are classed as an introduced species rather than one of Australia's ancient native mammals.|Los estudios genéticos sitúan la llegada del dingo hace entre tres y cinco mil años aproximadamente, mucho después del primer asentamiento humano en el continente, por lo que los dingos se clasifican como especie introducida y no como uno de los antiguos mamíferos nativos de Australia.|Des études génétiques situent l'arrivée du dingo il y a environ trois à cinq mille ans, bien après le premier peuplement humain du continent, ce qui explique que les dingos soient classés comme espèce introduite plutôt que comme l'un des anciens mammifères natifs d'Australie.|遺伝学的研究によれば、ディンゴが渡来したのはおよそ3千年から5千年前とされ、この大陸に人が最初に住み着いてからかなり後のことになる。そのためディンゴは、オーストラリア古来の在来哺乳類ではなく、外来種として分類されている。",
  ),
  q(
    5,
    "The Great Dividing Range, one of the longest land-based mountain ranges in the world, runs roughly parallel to which coast?|La Gran Cordillera Divisoria, una de las cordilleras terrestres más largas del mundo, discurre casi paralela a qué costa?|La Cordillère australienne, l'une des plus longues chaînes de montagnes terrestres du monde, longe à peu près quelle côte ?|世界でも屈指の長さを誇る陸上山脈、グレートディヴァイディング山脈がほぼ並行して走っているのはどちらの海岸か?",
    [
      "The west coast|La costa oeste|La côte ouest|西海岸",
      "The east coast|La costa este|La côte est|東海岸",
      "The south coast only, near Adelaide|Solo la costa sur, cerca de Adelaida|Uniquement la côte sud, près d'Adélaïde|アデレード付近の南海岸のみ",
    ],
    1,
    "Stretching roughly 3,500 km from Cape York in the tropical north down into Victoria, the range separates coastal rivers that flow to the Pacific from those that flow inland toward the arid centre, and it is rarely dramatically tall, with most peaks under 2,000 metres.|Con unos 3.500 km de extensión desde el cabo York, en el trópico norte, hasta Victoria, la cordillera separa los ríos costeros que fluyen hacia el Pacífico de los que fluyen tierra adentro hacia el árido centro, y rara vez es espectacularmente alta, con la mayoría de sus picos por debajo de los 2.000 metros.|S'étendant sur environ 3 500 km depuis le cap York, dans le nord tropical, jusqu'à Victoria, la chaîne sépare les rivières côtières qui se jettent dans le Pacifique de celles qui s'écoulent vers l'intérieur aride, et elle est rarement très haute, la plupart des sommets culminant à moins de 2 000 mètres.|北の熱帯ケープヨークからヴィクトリア州まで約3,500kmにわたって延びるこの山脈は、太平洋へ注ぐ沿岸河川と、乾燥した内陸部へ流れる河川とを分けている。標高はさほど高くなく、大半の峰は2,000m未満である。",
  ),
  q(
    5,
    "Which continent is generally considered the driest inhabited continent on Earth?|¿Qué continente se considera generalmente el continente habitado más seco de la Tierra?|Quel continent est généralement considéré comme le continent habité le plus sec de la Terre ?|地球上で最も乾燥した「人が住む」大陸とされているのはどこか?",
    [
      "Africa|África|L'Afrique|アフリカ",
      "South America|América del Sur|L'Amérique du Sud|南米",
      "Australia|Australia|L'Australie|オーストラリア",
    ],
    2,
    "Only Antarctica receives less precipitation overall, but it is essentially uninhabited, which leaves Australia with the title among continents people actually live on; roughly a third of the country receives less rainfall than a true desert threshold in an average year.|Solo la Antártida recibe menos precipitación en total, pero está prácticamente deshabitada, lo que deja a Australia con el título entre los continentes en los que realmente vive gente; alrededor de un tercio del país recibe menos lluvia que el umbral de un desierto real en un año promedio.|Seule l'Antarctique reçoit moins de précipitations au total, mais elle est essentiellement inhabitée, ce qui laisse à l'Australie ce titre parmi les continents réellement habités ; environ un tiers du pays reçoit, en année moyenne, moins de pluie que le seuil d'un véritable désert.|降水量全体で見ればさらに少ないのは南極大陸だけだが、そこはほぼ無人であるため、実際に人が暮らす大陸の中ではオーストラリアがこの称号を持つことになる。国土のおよそ3分の1は、平年でも真の砂漠とされる基準を下回る降水量しかない。",
  ),
  q(
    6,
    "The Sydney funnel-web, regarded as one of the world's most dangerous spiders, has caused very few deaths in recent decades mainly because of what?|La araña de tela de embudo de Sídney, considerada una de las arañas más peligrosas del mundo, ha causado muy pocas muertes en las últimas décadas sobre todo por qué?|L'araignée à toile d'entonnoir de Sydney, considérée comme l'une des araignées les plus dangereuses au monde, n'a causé que très peu de morts ces dernières décennies, surtout grâce à quoi ?|世界でも屈指の危険なクモとされるシドニーファネルウェブが、近年の死者数を極めて少なく抑えられている主な理由は?",
    [
      "An effective antivenom developed in 1981|Un antiveneno eficaz desarrollado en 1981|Un antivenin efficace mis au point en 1981|1981年に開発された有効な抗毒素",
      "The spider became extinct in most cities|La araña se extinguió en la mayoría de las ciudades|L'araignée a disparu de la plupart des villes|ほとんどの都市でこのクモが絶滅したため",
      "A law banning the spider from gardens|Una ley que prohíbe la araña en los jardines|Une loi interdisant l'araignée dans les jardins|庭でこのクモを飼うことを禁じる法律",
    ],
    0,
    "Before the antivenom, funnel-web bites were genuinely fatal within hours in some cases, but there has not been a confirmed death from one since it entered use, and Australian hospitals still keep supplies on hand across the spider's range around Sydney.|Antes del antiveneno, las mordeduras de esta araña eran realmente mortales en cuestión de horas en algunos casos, pero no se ha confirmado ninguna muerte por su causa desde que entró en uso, y los hospitales australianos siguen teniendo reservas en toda la zona de distribución de la araña alrededor de Sídney.|Avant l'antivenin, les morsures de cette araignée pouvaient réellement être mortelles en quelques heures dans certains cas, mais aucun décès confirmé n'a été recensé depuis sa mise en service, et les hôpitaux australiens conservent encore des stocks dans toute l'aire de répartition de l'araignée autour de Sydney.|抗毒素が登場する前、このクモに咬まれると数時間で命に関わることもあったが、抗毒素の使用開始以来、確認された死亡例は出ていない。オーストラリアの病院はいまもシドニー周辺のこのクモの生息域全体で抗毒素を常備している。",
  ),
  q(
    6,
    "The numbat, a small termite-eating marsupial and the faunal emblem of Western Australia, is unusual among marsupials for what habit?|El numbat, un pequeño marsupial que come termitas y emblema faunístico de Australia Occidental, es inusual entre los marsupiales por qué costumbre?|Le numbat, petit marsupial mangeur de termites et emblème faunique d'Australie-Occidentale, est inhabituel parmi les marsupiaux pour quelle habitude ?|シロアリを食べる小さな有袋類で、西オーストラリア州の動物の象徴でもあるナンバットが、有袋類の中でも珍しい点は?",
    [
      "It lives its whole life underwater|Vive toda su vida bajo el agua|Il passe toute sa vie sous l'eau|一生を水中で過ごすこと",
      "It is active during the day rather than at night|Está activo de día en lugar de por la noche|Il est actif le jour plutôt que la nuit|夜ではなく昼間に活動すること",
      "It has no pouch at any life stage|No tiene bolsa en ninguna etapa de su vida|Il n'a de poche à aucun stade de sa vie|生涯を通じて袋を持たないこと",
    ],
    1,
    "Most Australian marsupials are nocturnal, but the numbat forages by day for termites, which it laps up with a long sticky tongue, and it is now endangered, surviving mainly in a handful of protected reserves in the southwest.|La mayoría de los marsupiales australianos son nocturnos, pero el numbat busca termitas de día, que lame con una lengua larga y pegajosa, y hoy está en peligro de extinción, sobreviviendo sobre todo en un puñado de reservas protegidas del suroeste.|La plupart des marsupiaux australiens sont nocturnes, mais le numbat cherche des termites le jour, qu'il lape avec une longue langue collante, et il est aujourd'hui en danger, ne survivant guère que dans une poignée de réserves protégées du sud-ouest.|オーストラリアの有袋類の多くは夜行性だが、ナンバットは昼間にシロアリを探し、長く粘着質の舌でなめとって食べる。現在は絶滅危惧種となっており、南西部のわずかな保護区でしか生き残っていない。",
  ),
  q(
    6,
    "The extinct thylacine looking wolf-like despite being unrelated to wolves is a classic example of which biological phenomenon?|El tilacino extinto, que se parecía a un lobo pese a no estar emparentado con ellos, es un ejemplo clásico de qué fenómeno biológico?|Le thylacine éteint, qui ressemblait à un loup sans lui être apparenté, est un exemple classique de quel phénomène biologique ?|オオカミと近縁ではないのにオオカミに似た姿をしていた絶滅動物フクロオオカミは、どのような生物学的現象の典型例か?",
    [
      "Domestication|Domesticación|La domestication|家畜化",
      "Hibernation|Hibernación|L'hibernation|冬眠",
      "Convergent evolution|Evolución convergente|L'évolution convergente|収斂進化",
    ],
    2,
    "Australia's long isolation let marsupials evolve to fill many of the same ecological roles that placental mammals fill elsewhere, so unrelated species independently converged on similar shapes: the thylacine resembled a wolf, the marsupial mole resembles a mole, and the numbat fills an anteater-like niche.|El largo aislamiento de Australia permitió que los marsupiales evolucionaran para ocupar muchos de los mismos roles ecológicos que los mamíferos placentarios cumplen en otros lugares, así que especies no emparentadas convergieron de forma independiente en formas similares: el tilacino se parecía a un lobo, el topo marsupial se parece a un topo, y el numbat ocupa un nicho similar al de un oso hormiguero.|Le long isolement de l'Australie a permis aux marsupiaux d'évoluer pour occuper nombre des mêmes rôles écologiques que les mammifères placentaires ailleurs, si bien que des espèces sans lien de parenté ont convergé indépendamment vers des formes similaires : le thylacine ressemblait à un loup, la taupe marsupiale ressemble à une taupe, et le numbat occupe une niche proche de celle d'un fourmilier.|オーストラリアが長く孤立していたため、有袋類は他の大陸で有胎盤類が担っているのと同じような生態的役割を埋めるように進化した。その結果、系統的には無関係な種同士が独立して似た姿にたどり着いた。フクロオオカミはオオカミに、フクロモグラはモグラに似ており、ナンバットはアリクイに近い生態的地位を占めている。",
  ),
  q(
    6,
    "The 1992 High Court decision in Mabo v Queensland overturned which legal doctrine, which had held that Australia belonged to no one before British settlement?|La sentencia del Tribunal Superior de 1992 en el caso Mabo contra Queensland anuló qué doctrina legal, que sostenía que Australia no pertenecía a nadie antes del asentamiento británico?|La décision de 1992 de la Haute Cour dans l'affaire Mabo contre Queensland a annulé quelle doctrine juridique, selon laquelle l'Australie n'appartenait à personne avant la colonisation britannique ?|1992年の「マボ対クイーンズランド州」訴訟における高等裁判所判決が覆した、英国入植以前のオーストラリアは誰のものでもなかったとする法理は?",
    [
      "Terra nullius|Terra nullius|Terra nullius|テラ・ヌリウス(無主の地)",
      "Habeas corpus|Habeas corpus|Habeas corpus|人身保護令状",
      "Trial by jury|Juicio con jurado|Le procès par jury|陪審裁判",
    ],
    0,
    "The case was brought by Eddie Koiki Mabo and other Meriam people of the Torres Strait, and the ruling led directly to the Native Title Act 1993, which created a legal framework for Indigenous groups to claim rights over land based on continuing traditional connection.|El caso lo presentaron Eddie Koiki Mabo y otras personas meriam del Estrecho de Torres, y el fallo dio lugar directamente a la Ley de Título Nativo de 1993, que creó un marco legal para que los grupos indígenas reclamaran derechos sobre la tierra basados en una conexión tradicional continuada.|L'affaire fut portée par Eddie Koiki Mabo et d'autres membres du peuple meriam du détroit de Torres, et le jugement conduisit directement au Native Title Act de 1993, qui créa un cadre juridique permettant aux groupes autochtones de revendiquer des droits sur des terres fondés sur un lien traditionnel continu.|この訴訟はトレス海峡のメリアム族に属するエディ・コイキ・マボらが起こしたもので、この判決を受けて1993年に先住権原法(ネイティブ・タイトル法)が制定された。同法は、先住民集団が伝統的なつながりの継続を根拠に土地への権利を主張できる法的枠組みを作った。",
  ),
  q(
    6,
    "The southern cassowary of far north Queensland's rainforests has a reputation, in Guinness World Records, for being what?|El casuario meridional de las selvas del extremo norte de Queensland tiene fama, según el Libro Guinness de los Récords, de ser qué?|Le casoar à casque, des forêts tropicales de l'extrême nord du Queensland, a la réputation, selon le Livre Guinness des records, d'être quoi ?|クイーンズランド最北部の熱帯雨林にすむヒクイドリは、ギネス世界記録において何と評されているか?",
    [
      "The world's fastest-flying bird|El ave voladora más rápida del mundo|L'oiseau volant le plus rapide du monde|世界で最も速く飛ぶ鳥",
      "The world's most dangerous bird|El ave más peligrosa del mundo|L'oiseau le plus dangereux du monde|世界で最も危険な鳥",
      "The world's smallest flightless bird|El ave no voladora más pequeña del mundo|Le plus petit oiseau incapable de voler du monde|世界最小の飛べない鳥",
    ],
    1,
    "Cassowaries are large, flightless and armed with a dagger-like claw on each foot, and while attacks on people are rare, wildlife authorities still advise never approaching or feeding one in the wild, especially near a nest.|Los casuarios son grandes, no vuelan y tienen una garra afilada como una daga en cada pata, y aunque los ataques a personas son raros, las autoridades de vida silvestre aconsejan no acercarse ni alimentar a uno en libertad, sobre todo cerca de un nido.|Les casoars sont grands, incapables de voler et armés d'une griffe en forme de dague à chaque patte, et bien que les attaques sur des personnes soient rares, les autorités de la faune conseillent toujours de ne jamais s'approcher d'un individu sauvage ni de le nourrir, surtout près d'un nid.|ヒクイドリは大型の飛べない鳥で、それぞれの足に短剣のような鋭い爪を持つ。人への攻撃はまれだが、野生生物当局はいまも、特に巣の近くでは野生の個体に近づいたり餌を与えたりしないよう呼びかけている。",
  ),
  q(
    6,
    "Which nut, now grown commercially mostly in Hawaii, is actually native to the rainforests of eastern Australia?|¿Qué fruto seco, cultivado hoy comercialmente sobre todo en Hawái, es en realidad nativo de las selvas tropicales del este de Australia?|Quel fruit à coque, aujourd'hui cultivé commercialement surtout à Hawaï, est en réalité originaire des forêts tropicales de l'est de l'Australie ?|いまでは主にハワイで商業栽培されているが、実はオーストラリア東部の熱帯雨林原産であるナッツは?",
    [
      "The cashew|El anacardo|La noix de cajou|カシューナッツ",
      "The pistachio|El pistacho|La pistache|ピスタチオ",
      "The macadamia|La macadamia|La noix de macadamia|マカダミアナッツ",
    ],
    2,
    "Seeds were taken to Hawaii in the late 19th century, where large-scale plantations eventually outgrew production back home, so much of the macadamia sold worldwide today, including some sold under Hawaiian branding, actually traces its origin to a handful of Queensland and New South Wales rainforest trees.|Las semillas se llevaron a Hawái a finales del siglo XIX, donde las grandes plantaciones acabaron superando la producción de origen, así que gran parte de la macadamia que se vende hoy en el mundo, incluida la comercializada con marca hawaiana, se remonta en realidad a un puñado de árboles de la selva de Queensland y Nueva Gales del Sur.|Des graines furent emportées à Hawaï à la fin du XIXe siècle, où de vastes plantations finirent par dépasser la production d'origine, si bien qu'une grande partie de la macadamia vendue aujourd'hui dans le monde, y compris sous des marques hawaïennes, remonte en réalité à une poignée d'arbres des forêts tropicales du Queensland et de Nouvelle-Galles du Sud.|19世紀末に種子がハワイへ持ち出され、そこでの大規模な農園がやがて発祥地の生産量を上回るようになった。そのため、ハワイ産として売られているものも含め、いま世界で売られているマカダミアナッツの多くは、もとをたどればクイーンズランドとニューサウスウェールズのわずかな熱帯雨林の木々に行き着く。",
  ),
  q(
    6,
    "Unlike most countries, which use first-past-the-post voting, Australia's House of Representatives elections use what kind of system?|A diferencia de la mayoría de los países, que usan el sistema de mayoría simple, ¿qué tipo de sistema usan las elecciones a la Cámara de Representantes de Australia?|Contrairement à la plupart des pays, qui utilisent le scrutin majoritaire à un tour, quel type de système utilisent les élections à la Chambre des représentants d'Australie ?|多くの国が採用する単純小選挙区制とは異なり、オーストラリア下院選挙で使われている制度は?",
    [
      "Preferential (ranked-choice) voting, where voters number every candidate|Voto preferencial (voto clasificado), en el que los votantes numeran a todos los candidatos|Le vote préférentiel (par classement), où les électeurs numérotent chaque candidat|有権者が候補者全員に順位を付ける優先順位付投票(選好投票)",
      "Voting by a show of hands at public meetings|Votación a mano alzada en asambleas públicas|Le vote à main levée lors de réunions publiques|公開集会での挙手による投票",
      "Selection by lottery among registered candidates|Selección por sorteo entre los candidatos registrados|La sélection par tirage au sort parmi les candidats inscrits|登録候補者からの抽選による選出",
    ],
    0,
    "Voters rank candidates in order of preference, and if no one wins a majority of first preferences, the lowest-scoring candidate is eliminated and their votes redistributed according to the next preference marked, repeating until someone has more than half.|Los votantes clasifican a los candidatos por orden de preferencia, y si nadie obtiene la mayoría de las primeras preferencias, se elimina al candidato con menos votos y sus votos se redistribuyen según la siguiente preferencia marcada, repitiendo el proceso hasta que alguien supere la mitad.|Les électeurs classent les candidats par ordre de préférence, et si personne n'obtient la majorité des premières préférences, le candidat ayant obtenu le moins de voix est éliminé et ses voix redistribuées selon la préférence suivante indiquée, et ainsi de suite jusqu'à ce qu'un candidat dépasse la moitié des voix.|有権者は候補者全員に希望順位を付けて投票し、第1希望の得票だけで過半数を得た候補がいなければ、最下位の候補を落として、その票を次点希望に従って振り分け直す。これを、誰かが過半数を得るまで繰り返す仕組みである。",
  ),

  // --- 追加分(第4弾)。難易度7〜8を厚くする(ここが本命)。 ---
  q(
    5,
    "Kati Thanda–Lake Eyre, Australia's lowest point at about 15 metres below sea level, is normally what?|Kati Thanda–Lake Eyre, el punto más bajo de Australia a unos 15 metros bajo el nivel del mar, suele estar cómo normalmente?|Kati Thanda–Lake Eyre, le point le plus bas d'Australie à environ 15 mètres sous le niveau de la mer, se trouve normalement dans quel état ?|海抜およそマイナス15mでオーストラリア最低地点にあたるカティ・タンダ(エア湖)は、ふだんどのような状態にあるか?",
    [
      "A deep permanent lake|Un lago profundo y permanente|Un lac profond et permanent|深く恒常的な湖",
      "A dry salt pan|Una salina seca|Un lac salé asséché|乾いた塩の平原",
      "A dense mangrove forest|Un denso bosque de manglares|Une dense mangrove|密生したマングローブ林",
    ],
    1,
    "The lake fills completely only a handful of times each century, usually after major rains far upstream in Queensland feed its enormous, mostly dry inland drainage basin, and when it does fill it briefly becomes a breeding haven for huge numbers of waterbirds.|El lago se llena por completo solo un puñado de veces cada siglo, normalmente tras grandes lluvias en las cabeceras de Queensland que alimentan su enorme cuenca interior, casi siempre seca, y cuando se llena se convierte brevemente en un refugio de cría para enormes cantidades de aves acuáticas.|Le lac ne se remplit complètement que quelques fois par siècle, généralement après de fortes pluies loin en amont au Queensland qui alimentent son immense bassin de drainage intérieur, la plupart du temps asséché, et quand il se remplit, il devient brièvement un refuge de reproduction pour un très grand nombre d'oiseaux aquatiques.|この湖が完全に満水になるのは一世紀にほんの数回程度で、通常はクイーンズランド側の遠い上流での大雨が、ふだんはほぼ干上がっているこの広大な内陸流域を満たすことで起こる。満水になると、一時的に大量の水鳥が集まる繁殖の楽園になる。",
  ),
  q(
    7,
    "Every spring, huge numbers of migrating bogong moths historically drew Aboriginal groups from several nations to gather in which region for a shared feast?|Cada primavera, grandes cantidades de polillas bogong migratorias atraían históricamente a grupos aborígenes de varias naciones a reunirse en qué región para un banquete compartido?|Chaque printemps, de grandes quantités de papillons de nuit bogong migrateurs attiraient historiquement des groupes aborigènes de plusieurs nations à se rassembler dans quelle région pour un festin commun ?|毎年春、大量に渡ってくるボゴンガという蛾が、歴史的に複数の民族のアボリジナルの人々をある地方に集めて共同の宴を開かせていた。その地方は?",
    [
      "The Kimberley coast|La costa de Kimberley|La côte du Kimberley|キンバリー沿岸",
      "The Nullarbor Plain|La llanura de Nullarbor|La plaine du Nullarbor|ヌラボー平原",
      "The Australian Alps|Los Alpes australianos|Les Alpes australiennes|オーストラリア・アルプス",
    ],
    2,
    "The moths, which spend summer aestivating by the billions in cool alpine caves and rock crevices, were traditionally harvested and roasted in hot ash or sand, a rich, fatty food source substantial enough to draw people together from a wide area for weeks of ceremony and trade.|Las polillas, que pasan el verano en estivación por miles de millones en frescas cuevas y grietas rocosas alpinas, se recolectaban y asaban tradicionalmente en ceniza o arena caliente, una fuente de alimento rica y grasa suficiente para reunir a gente de una amplia zona durante semanas de ceremonias e intercambio.|Les papillons, qui passent l'été en estivation par milliards dans des grottes et fissures rocheuses alpines fraîches, étaient traditionnellement récoltés et grillés dans de la cendre ou du sable chaud, une source de nourriture riche et grasse suffisante pour rassembler des gens venus de loin pendant des semaines de cérémonies et d'échanges.|この蛾は夏のあいだ、涼しい高山の洞窟や岩の割れ目に何十億匹も集まって夏眠する。伝統的にこれを採って熱い灰や砂で炒って食べていた。脂肪分に富んだ豊かな食料源で、遠方からも人々を引き寄せ、何週間にも及ぶ儀式や交易の場となるほどだった。",
  ),
  q(
    7,
    "Since what year has voting in Australian federal elections been compulsory for enrolled adults?|Desde qué año es obligatorio votar en las elecciones federales australianas para los adultos inscritos?|Depuis quelle année le vote est-il obligatoire aux élections fédérales australiennes pour les adultes inscrits ?|オーストラリアの連邦選挙で、登録済みの成人の投票が義務化されたのは何年からか?",
    [
      "1924|1924|1924|1924年",
      "1788|1788|1788|1788年",
      "1975|1975|1975|1975年",
    ],
    0,
    "Voter turnout jumped from around 60 percent to over 90 percent almost immediately after the law passed, and the fine for not voting without a valid reason remains modest, since the requirement is only to show up and have a ballot marked off, not to fill it in validly.|La participación electoral saltó de alrededor del 60 % a más del 90 % casi de inmediato tras aprobarse la ley, y la multa por no votar sin una razón válida sigue siendo modesta, ya que la exigencia es solo presentarse y que marquen la papeleta, no rellenarla de forma válida.|Le taux de participation est passé d'environ 60 % à plus de 90 % presque immédiatement après l'adoption de la loi, et l'amende pour ne pas avoir voté sans motif valable reste modeste, car l'obligation consiste seulement à se présenter et à faire cocher son nom, pas à remplir validement le bulletin.|この法律が成立すると投票率はほぼ即座に60%前後から90%超へ跳ね上がった。正当な理由なく投票しなかった場合の罰金は今もわずかで、義務とされるのは投票所に行って名前を消してもらうことだけであり、有効票を投じることそのものは義務ではない。",
  ),
  q(
    7,
    "Tasmanian devils in the wild have suffered a severe population decline since the 1990s mainly because of what?|Los demonios de Tasmania en libertad han sufrido un fuerte declive de población desde los años noventa sobre todo por qué?|Les diables de Tasmanie sauvages ont subi un grave déclin de population depuis les années 1990, principalement à cause de quoi ?|野生のフクロオオカミ改めタスマニアデビルが1990年代以降、大きく数を減らしている主な原因は?",
    [
      "Overhunting for their fur|La caza excesiva por su piel|La chasse excessive pour leur fourrure|毛皮のための乱獲",
      "A contagious facial tumour disease|Una enfermedad tumoral facial contagiosa|Une maladie tumorale faciale contagieuse|感染性の顔面腫瘍の病気",
      "Competition from imported devils from New Guinea|La competencia de demonios importados de Nueva Guinea|La concurrence de diables importés de Nouvelle-Guinée|ニューギニアから持ち込まれた個体との競合",
    ],
    1,
    "Devil facial tumour disease spreads between animals through biting during fighting and mating, and has wiped out most of the population in parts of Tasmania since it was first observed in 1996, prompting insurance populations to be established on offshore islands and the mainland.|La enfermedad tumoral facial del demonio se transmite entre animales por mordeduras durante peleas y apareamiento, y ha diezmado la mayor parte de la población en zonas de Tasmania desde que se observó por primera vez en 1996, lo que ha llevado a establecer poblaciones de reserva en islas cercanas y en el continente.|La maladie tumorale faciale du diable se transmet entre animaux par morsure lors des combats et de l'accouplement, et a décimé la majeure partie de la population dans certaines régions de Tasmanie depuis sa première observation en 1996, ce qui a conduit à établir des populations de secours sur des îles voisines et sur le continent.|この顔面腫瘍の病気は、争いや交尾の際の咬み傷を通じて個体間に広がり、1996年に初めて確認されて以来、タスマニアの一部地域では個体数の大半を失わせてきた。そのため、沖合の島々や本土に保険的な個体群を確保する取り組みが進められている。",
  ),
  q(
    7,
    "The world's first surf lifesaving club was founded in 1907 on which famous Sydney beach?|El primer club de socorrismo de surf del mundo se fundó en 1907 en qué famosa playa de Sídney?|Le premier club de sauvetage sur les vagues au monde fut fondé en 1907 sur quelle célèbre plage de Sydney ?|世界初のサーフライフセービング・クラブが1907年に創設された、シドニーの有名なビーチは?",
    [
      "Manly Beach only, decades later|Solo Manly Beach, décadas después|Uniquement Manly Beach, des décennies plus tard|数十年後のマンリー・ビーチのみ",
      "St Kilda Beach in Melbourne|St Kilda Beach en Melbourne|St Kilda Beach à Melbourne|メルボルンのセント・キルダ・ビーチ",
      "Bondi Beach|Playa de Bondi|Bondi Beach|ボンダイ・ビーチ",
    ],
    2,
    "Volunteer lifesavers in their distinctive red-and-yellow caps patrol beaches across the country every summer, and the reel-and-line rescue apparatus pioneered in Australia's early surf clubs was later adopted by lifesaving organisations overseas.|Los socorristas voluntarios, con sus característicos gorros rojos y amarillos, patrullan las playas de todo el país cada verano, y el aparato de rescate de carrete y cuerda desarrollado en los primeros clubes de surf australianos fue adoptado después por organizaciones de salvamento en el extranjero.|Des sauveteurs bénévoles portant leur bonnet rouge et jaune caractéristique patrouillent les plages du pays chaque été, et le dispositif de sauvetage à bobine et corde mis au point dans les premiers clubs de surf australiens fut par la suite adopté par des organisations de sauvetage à l'étranger.|赤と黄色の特徴的な帽子をかぶったボランティアのライフセーバーは、毎年夏になると全国のビーチを見回る。オーストラリア初期のサーフクラブで考案されたリールとロープを使った救助器具は、後に海外の救助組織にも取り入れられた。",
  ),
  q(
    7,
    "The Trans-Australian Railway, completed in 1917, achieved what first for Western Australia?|El Ferrocarril Transaustraliano, terminado en 1917, logró qué primicia para Australia Occidental?|Le chemin de fer transaustralien, achevé en 1917, a permis quelle première pour l'Australie-Occidentale ?|1917年に完成した大陸横断鉄道(トランス・オーストラリア鉄道)は、西オーストラリア州にとってどのような初の出来事をもたらしたか?",
    [
      "It linked the state to the rest of the country's rail network for the first time|Conectó por primera vez el estado con el resto de la red ferroviaria del país|Il relia pour la première fois l'État au reste du réseau ferroviaire du pays|州を初めて国内の他の鉄道網とつないだ",
      "It carried the state's first electric trains|Llevó los primeros trenes eléctricos del estado|Il fit circuler les premiers trains électriques de l'État|州で初めての電車を走らせた",
      "It gave the state its first passenger airport link|Dio al estado su primer enlace con un aeropuerto de pasajeros|Il donna à l'État sa première liaison avec un aéroport pour passagers|州初の旅客空港への連絡路を作った",
    ],
    0,
    "Running roughly 1,700 km between Kalgoorlie and Port Augusta across the Nullarbor Plain, the line was built through country so remote that construction camps had to freight in their own water, and through-passenger travel became possible only decades later once the differing colonial rail gauges were resolved.|Con unos 1.700 km entre Kalgoorlie y Port Augusta a través de la llanura de Nullarbor, la línea se construyó por un territorio tan remoto que los campamentos de obra tenían que transportar su propia agua, y el viaje directo de pasajeros solo fue posible décadas después, una vez resueltos los distintos anchos de vía coloniales.|Longue d'environ 1 700 km entre Kalgoorlie et Port Augusta à travers la plaine du Nullarbor, la ligne fut construite en territoire si isolé que les campements de chantier devaient acheminer leur propre eau, et le voyage direct des passagers ne devint possible que des décennies plus tard, une fois résolue la question des différents écartements de voie coloniaux.|ヌラボー平原を横切ってカルグーリーとポート・オーガスタを結ぶ約1,700kmのこの路線は、あまりに辺鄙な土地を通っていたため、建設キャンプは飲み水すら運び込む必要があった。乗客が乗り換えなしで通しで移動できるようになったのは、植民地ごとに異なっていた軌間の問題が解決した数十年後のことだった。",
  ),
  q(
    7,
    "The Overland Telegraph Line, completed in 1872, first connected Australia to the rest of the world via what?|La Línea Telegráfica Transcontinental, terminada en 1872, conectó por primera vez a Australia con el resto del mundo mediante qué?|La ligne télégraphique transcontinentale, achevée en 1872, relia pour la première fois l'Australie au reste du monde grâce à quoi ?|1872年に完成した大陸横断電信線は、何によってオーストラリアを初めて世界の他地域と結んだか?",
    [
      "A direct radio broadcast to London|Una emisión de radio directa a Londres|Une émission radio directe vers Londres|ロンドンへの直接無線放送",
      "An undersea cable linking Darwin to Java|Un cable submarino que unía Darwin con Java|Un câble sous-marin reliant Darwin à Java|ダーウィンとジャワ島を結ぶ海底ケーブル",
      "A fleet of relay ships crossing the Indian Ocean|Una flota de barcos de relevo que cruzaba el océano Índico|Une flotte de navires relais traversant l'océan Indien|インド洋を横断する中継船団",
    ],
    1,
    "Small teams working from both ends strung roughly 3,200 km of wire and built repeater stations across some of the harshest country on the continent in under two years, cutting message times between Australia and Britain from months by ship to mere hours.|Pequeños equipos que trabajaban desde ambos extremos tendieron unos 3.200 km de cable y construyeron estaciones repetidoras a través de algunas de las zonas más duras del continente en menos de dos años, reduciendo el tiempo de los mensajes entre Australia y Gran Bretaña de meses en barco a apenas horas.|De petites équipes travaillant depuis les deux extrémités tendirent environ 3 200 km de fil et construisirent des stations relais à travers certaines des régions les plus rudes du continent en moins de deux ans, réduisant le temps d'acheminement des messages entre l'Australie et la Grande-Bretagne de plusieurs mois en bateau à quelques heures seulement.|両端から作業する小さな班が、大陸でも指折りの過酷な土地を通して約3,200kmの電線を張り、中継局を築き上げた。これを2年足らずで成し遂げ、オーストラリアと英国のあいだの通信時間を、船便での数か月からわずか数時間へと縮めた。",
  ),
  q(
    7,
    "In rugby league's State of Origin series between Queensland and New South Wales, which state a player represents is decided by what?|En la serie State of Origin de liga de rugby entre Queensland y Nueva Gales del Sur, ¿qué determina a qué estado representa un jugador?|Dans la série de State of Origin de la ligue de rugby entre le Queensland et la Nouvelle-Galles du Sud, qu'est-ce qui détermine l'État que représente un joueur ?|クイーンズランドとニューサウスウェールズのあいだで争われるラグビーリーグの「ステート・オブ・オリジン」で、選手がどちらの州の代表になるかを決めるものは?",
    [
      "A random draw held before each series|Un sorteo aleatorio antes de cada serie|Un tirage au sort effectué avant chaque série|各シリーズ開幕前のくじ引き",
      "Which state's team offers the higher salary|El estado cuyo equipo ofrece un salario más alto|L'État dont l'équipe offre le salaire le plus élevé|より高い報酬を提示した州のチーム",
      "Where they first played senior football, not where they were born|Dónde jugaron su primer partido sénior, no dónde nacieron|Où ils ont joué leur premier match senior, et non leur lieu de naissance|生まれた場所ではなく、最初にシニアの試合に出場した場所",
    ],
    2,
    "The eligibility rule, based on where a player's senior playing career began rather than their birthplace, is what gives the series its name and occasionally produces the odd situation of a player born in one state, or even overseas, representing the other.|La regla de elegibilidad, basada en dónde comenzó la carrera sénior de un jugador y no en su lugar de nacimiento, es lo que da nombre a la serie y a veces produce la curiosa situación de un jugador nacido en un estado, o incluso en el extranjero, representando al otro.|La règle d'éligibilité, fondée sur le lieu où a débuté la carrière senior d'un joueur plutôt que sur son lieu de naissance, donne son nom à la série et produit parfois la situation curieuse d'un joueur né dans un État, voire à l'étranger, représentant l'autre État.|出身地ではなく、選手としてのシニアキャリアをどこで始めたかで代表資格が決まるこの規則が、シリーズの名前(オリジン=出身)の由来になっている。そのため、ある州で生まれた選手、あるいは海外生まれの選手が、別の州の代表になるという珍しい事態も時おり起こる。",
  ),
  q(
    7,
    "The Kakadu plum, a small native bush fruit, is notable among foods worldwide for what?|La ciruela de Kakadu, un pequeño fruto nativo, destaca entre los alimentos del mundo por qué?|La prune de Kakadu, un petit fruit sauvage indigène, se distingue parmi les aliments du monde par quoi ?|オーストラリア原産の小さな野生の果実、カカドゥ・プラムが世界の食品の中でも際立っている点は?",
    [
      "It has an unusually high vitamin C content|Tiene un contenido de vitamina C inusualmente alto|Il a une teneur en vitamine C inhabituellement élevée|きわめて高いビタミンC含有量",
      "It is the world's heaviest single fruit|Es la fruta individual más pesada del mundo|C'est le fruit individuel le plus lourd du monde|世界一重い単体の果実",
      "It never ripens, even after harvest|Nunca madura, ni siquiera tras la cosecha|Il ne mûrit jamais, même après la récolte|収穫後も決して熟さない",
    ],
    0,
    "Aboriginal peoples in the Top End have used the fruit as both food and traditional medicine for a very long time, and its vitamin C levels, among the highest recorded in any fruit, have more recently drawn interest from skincare and food companies.|Los pueblos aborígenes del Top End han usado el fruto como alimento y medicina tradicional desde hace mucho tiempo, y sus niveles de vitamina C, entre los más altos registrados en cualquier fruta, han despertado más recientemente el interés de empresas de cosmética y alimentación.|Les peuples aborigènes du Top End utilisent ce fruit comme aliment et comme remède traditionnel depuis très longtemps, et sa teneur en vitamine C, parmi les plus élevées jamais enregistrées pour un fruit, a plus récemment attiré l'intérêt d'entreprises de cosmétique et d'agroalimentaire.|トップエンド地方のアボリジナルの人々は、この果実を食料としても伝統薬としても長く利用してきた。果実の中でも記録上とりわけ高いとされるビタミンC含有量は、近年になってスキンケアや食品関連の企業からも注目を集めている。",
  ),
  q(
    7,
    "Bushranger Ned Kelly, captured after a final shootout at Glenrowan in 1880, is famous for wearing armour made from what?|El forajido Ned Kelly, capturado tras un tiroteo final en Glenrowan en 1880, es famoso por llevar una armadura hecha de qué?|Le bandit Ned Kelly, capturé après une dernière fusillade à Glenrowan en 1880, est célèbre pour avoir porté une armure fabriquée à partir de quoi ?|1880年、グレンロワンでの最後の銃撃戦の末に捕らえられた無法者ネッド・ケリーは、何で作った鎧をまとっていたことで知られているか?",
    [
      "Salvaged railway rails welded together|Raíles de ferrocarril recuperados y soldados entre sí|Des rails de chemin de fer récupérés et soudés ensemble|回収した鉄道レールを溶接したもの",
      "Iron plough mouldboards, hammered into plates|Vertederas de arado de hierro, forjadas en placas|Des socs de charrue en fer, martelés en plaques|鉄製の犂の刃を打って作った板",
      "Thick leather reinforced with wood|Cuero grueso reforzado con madera|Du cuir épais renforcé de bois|木で補強した厚い革",
    ],
    1,
    "Kelly and his gang made crude suits of armour, weighing around 40 kg each, from stolen plough parts to protect themselves in the shootout, but the armour left their legs exposed, and Kelly was brought down by police fire below the helmet.|Kelly y su banda fabricaron toscas armaduras, de unos 40 kg cada una, con piezas de arado robadas para protegerse en el tiroteo, pero la armadura dejaba las piernas expuestas, y Kelly cayó por los disparos de la policía por debajo del casco.|Kelly et sa bande fabriquèrent de grossières armures, pesant environ 40 kg chacune, à partir de pièces de charrue volées pour se protéger lors de la fusillade, mais l'armure laissait leurs jambes exposées, et Kelly fut abattu par des tirs de la police en dessous du casque.|ケリーとその一味は、盗んだ犂の部品から重さ約40kgにもなる粗雑な鎧を作り、銃撃戦での身を守りに使った。しかし鎧は脚部を覆っておらず、ケリーは兜より下を警察の銃弾で撃たれて倒れた。",
  ),
  q(
    8,
    "In January 2022, the Australian government paid roughly A$20 million to do what with the Aboriginal flag?|En enero de 2022, el gobierno australiano pagó unos 20 millones de dólares australianos para hacer qué con la bandera aborigen?|En janvier 2022, le gouvernement australien a payé environ 20 millions de dollars australiens pour faire quoi avec le drapeau aborigène ?|2022年1月、オーストラリア政府はアボリジナル旗に関して約2,000万豪ドルを支払い、何をしたか?",
    [
      "Redesign the flag with new colours|Rediseñar la bandera con nuevos colores|Redessiner le drapeau avec de nouvelles couleurs|旗を新しい配色でデザインし直した",
      "Move the flag's copyright to the United Nations|Trasladar los derechos de autor de la bandera a las Naciones Unidas|Transférer les droits d'auteur du drapeau aux Nations unies|旗の著作権を国連へ移した",
      "Acquire the flag's copyright so it could be used freely by everyone|Adquirir los derechos de autor de la bandera para que todos pudieran usarla libremente|Acquérir les droits d'auteur du drapeau afin qu'il puisse être utilisé librement par tous|旗の著作権を買い取り、誰もが自由に使えるようにした",
    ],
    2,
    "Designer Harold Thomas had licensed commercial use of his 1971 design to a private company, which led sporting codes and even some Indigenous organisations to face licensing fees or restrictions on using the flag, prompting a long \"Free the Flag\" campaign that ended with the government buying out the licences.|El diseñador Harold Thomas había licenciado el uso comercial de su diseño de 1971 a una empresa privada, lo que llevó a que federaciones deportivas e incluso algunas organizaciones indígenas se enfrentaran a tarifas de licencia o restricciones para usar la bandera, lo que provocó una larga campaña «Free the Flag» que terminó con el gobierno comprando las licencias.|Le créateur Harold Thomas avait concédé l'usage commercial de son dessin de 1971 à une entreprise privée, ce qui amena des fédérations sportives et même certaines organisations autochtones à devoir payer des droits de licence ou subir des restrictions pour utiliser le drapeau, ce qui déclencha une longue campagne « Free the Flag » qui s'est achevée par le rachat des licences par le gouvernement.|1971年にこの旗をデザインしたハロルド・トーマスは、商業利用のライセンスを一民間企業に与えていた。そのためスポーツ団体や一部の先住民団体までもが旗の使用にライセンス料や制限を課されるようになり、長く続いた「フリー・ザ・フラッグ」運動を経て、最終的に政府がライセンスを買い取る形で決着した。",
  ),
  q(
    8,
    "The Great Artesian Basin, one of the largest groundwater basins in the world, underlies roughly how much of the Australian continent?|La Gran Cuenca Artesiana, una de las mayores cuencas de agua subterránea del mundo, se extiende bajo aproximadamente qué proporción del continente australiano?|Le Grand Bassin artésien, l'un des plus vastes bassins d'eaux souterraines au monde, s'étend sous environ quelle proportion du continent australien ?|世界有数の規模を誇る地下水盆、グレート・アーテジアン盆地はオーストラリア大陸のおよそどれくらいの面積の下に広がっているか?",
    [
      "About a fifth of the continent|Alrededor de una quinta parte del continente|Environ un cinquième du continent|大陸のおよそ5分の1",
      "About a fiftieth of the continent|Alrededor de una cincuentava parte del continente|Environ un cinquantième du continent|大陸のおよそ50分の1",
      "Almost the entire continent|Casi todo el continente|Presque tout le continent|大陸のほぼ全域",
    ],
    0,
    "The basin underlies much of inland Queensland, New South Wales, South Australia and the Northern Territory, and pressure in parts of it is strong enough that some bores flow to the surface without any pumping at all, a feature that made pastoral settlement of the dry interior possible.|La cuenca se extiende bajo gran parte del interior de Queensland, Nueva Gales del Sur, Australia Meridional y el Territorio del Norte, y la presión en algunas zonas es tan fuerte que ciertos pozos brotan a la superficie sin necesidad de bombeo, una característica que hizo posible el asentamiento ganadero del árido interior.|Le bassin s'étend sous une grande partie de l'intérieur du Queensland, de la Nouvelle-Galles du Sud, de l'Australie-Méridionale et du Territoire du Nord, et la pression y est par endroits assez forte pour que certains forages jaillissent à la surface sans aucun pompage, une caractéristique qui a rendu possible la colonisation pastorale de l'intérieur aride.|この盆地はクイーンズランド・ニューサウスウェールズ・南オーストラリア・ノーザンテリトリーの内陸部の広い範囲の地下に広がっている。場所によっては圧力が強く、ポンプなしでも自然に水が地表へ湧き出るボアもあり、この特徴が乾燥した内陸部での牧畜による定住を可能にした。",
  ),
  q(
    8,
    "Of the four living species of echidna, how many are found in Australia?|De las cuatro especies vivas de equidna, ¿cuántas se encuentran en Australia?|Sur les quatre espèces vivantes d'échidnés, combien se trouvent en Australie ?|現存する4種のハリモグラのうち、オーストラリアに生息しているのは何種か?",
    [
      "All four species live in Australia|Las cuatro especies viven en Australia|Les quatre espèces vivent en Australie|4種すべてがオーストラリアに生息する",
      "One, the short-beaked echidna; the other three long-beaked species live only in New Guinea|Una, el equidna de hocico corto; las otras tres especies de hocico largo viven solo en Nueva Guinea|Une, l'échidné à bec court ; les trois autres espèces à long bec ne vivent qu'en Nouvelle-Guinée|1種(ミユビハリモグラ)。残り3種の長吻種はニューギニアにのみ生息する",
      "None; all four echidna species live only in New Guinea|Ninguna; las cuatro especies de equidna viven solo en Nueva Guinea|Aucune ; les quatre espèces d'échidnés ne vivent qu'en Nouvelle-Guinée|1種もいない。4種すべてニューギニアのみに生息する",
    ],
    1,
    "The short-beaked echidna is widespread across Australia in almost every habitat from desert to snow country, while the three long-beaked echidna species are all found only in the highlands of New Guinea and are considerably rarer and less studied.|El equidna de hocico corto está muy extendido por Australia en casi todos los hábitats, desde el desierto hasta las zonas de nieve, mientras que las tres especies de hocico largo se encuentran solo en las tierras altas de Nueva Guinea y son bastante más raras y menos estudiadas.|L'échidné à bec court est très répandu en Australie, dans presque tous les habitats, du désert aux régions enneigées, tandis que les trois espèces à long bec ne se trouvent que dans les hautes terres de Nouvelle-Guinée et sont nettement plus rares et moins étudiées.|ミユビハリモグラはオーストラリアの砂漠から雪の積もる地域まで、ほぼあらゆる環境に広く分布している。一方、長吻種3種はいずれもニューギニアの高地にのみ生息し、はるかに希少で研究も進んでいない。",
  ),
  q(
    8,
    "The 1975 constitutional crisis, known as \"the Dismissal,\" saw the Governor-General remove which Prime Minister from office?|La crisis constitucional de 1975, conocida como «el Despido» («the Dismissal»), vio al gobernador general destituir a qué primer ministro?|La crise constitutionnelle de 1975, connue sous le nom de « the Dismissal », a vu le gouverneur général destituer quel Premier ministre ?|「解任(ザ・ディスミサル)」として知られる1975年の憲政危機で、オーストラリア総督が罷免した首相は誰か?",
    [
      "Robert Menzies|Robert Menzies|Robert Menzies|ロバート・メンジーズ",
      "Bob Hawke|Bob Hawke|Bob Hawke|ボブ・ホーク",
      "Gough Whitlam|Gough Whitlam|Gough Whitlam|ゴフ・ウィットラム",
    ],
    2,
    "Governor-General Sir John Kerr dismissed Whitlam after the opposition-controlled Senate blocked the government's budget, using a reserve power that had rarely been exercised, and the move remains one of the most debated events in Australian political history.|El gobernador general Sir John Kerr destituyó a Whitlam después de que el Senado, controlado por la oposición, bloqueara el presupuesto del gobierno, usando un poder de reserva que rara vez se había ejercido, y el episodio sigue siendo uno de los más debatidos de la historia política australiana.|Le gouverneur général Sir John Kerr destitua Whitlam après que le Sénat, contrôlé par l'opposition, eut bloqué le budget du gouvernement, en exerçant un pouvoir de réserve rarement utilisé, et cet épisode reste l'un des plus débattus de l'histoire politique australienne.|野党が多数を握る上院が予算案を阻止したことを受け、総督サー・ジョン・カーはめったに行使されない留保権限を用いてウィットラムを解任した。この一件は、オーストラリア政治史上で今なお最も議論を呼ぶ出来事の一つである。",
  ),
  q(
    8,
    "In the 1999 referendum on becoming a republic, the proposal was defeated largely because of disagreement over what?|En el referéndum de 1999 sobre convertirse en república, la propuesta se rechazó en gran parte por el desacuerdo sobre qué?|Lors du référendum de 1999 sur le passage à la république, la proposition fut rejetée en grande partie à cause d'un désaccord sur quoi ?|1999年に行われた共和制移行を問う国民投票で、提案が否決された主な理由は何をめぐる意見対立だったか?",
    [
      "How the president would be chosen, not support for the monarchy itself|Cómo se elegiría al presidente, no el apoyo a la monarquía en sí|La méthode de choix du président, et non le soutien à la monarchie elle-même|大統領の選び方をめぐる対立で、君主制そのものへの支持ではなかった",
      "Whether Australia should leave the Commonwealth entirely|Si Australia debía abandonar por completo la Mancomunidad|La question de savoir si l'Australie devait quitter entièrement le Commonwealth|オーストラリアが英連邦を完全に脱退すべきかどうか",
      "Whether the change would cost too much to print new banknotes|Si el cambio costaría demasiado por la impresión de nuevos billetes|La question de savoir si le changement coûterait trop cher pour imprimer de nouveaux billets|新紙幣の印刷費用がかかりすぎるかどうか",
    ],
    0,
    "Many republicans themselves campaigned against the specific model on offer, in which Parliament rather than the public would choose the president, and the referendum was defeated nationally with about 55 percent voting no, without carrying a majority in a single state.|Muchos republicanos hicieron campaña contra el modelo concreto propuesto, en el que el Parlamento, y no el público, elegiría al presidente, y el referéndum se rechazó a nivel nacional con cerca del 55 % de votos en contra, sin obtener mayoría en un solo estado.|De nombreux républicains firent eux-mêmes campagne contre le modèle précis proposé, dans lequel le Parlement, et non le public, choisirait le président, et le référendum fut rejeté à l'échelle nationale avec environ 55 % de non, sans obtenir la majorité dans un seul État.|多くの共和制支持者自身が、大統領を国民ではなく議会が選ぶという具体案に反対して運動した。国民投票は全国でおよそ55%の反対を得て否決され、賛成が過半数を占めた州は一つもなかった。",
  ),
  q(
    8,
    "A widely cited university and WWF study estimated that Australia's 2019–2020 \"Black Summer\" bushfires killed or displaced roughly how many animals?|Un estudio ampliamente citado de una universidad y WWF calculó que los incendios del «Black Summer» de 2019-2020 en Australia mataron o desplazaron a aproximadamente cuántos animales?|Une étude largement citée d'une université et du WWF a estimé que les feux de brousse du « Black Summer » 2019-2020 en Australie avaient tué ou déplacé environ combien d'animaux ?|大学とWWFによる、広く引用されている研究によれば、2019〜2020年の「ブラック・サマー」森林火災で死んだか移動を強いられた動物はおよそ何匹と推計されているか?",
    [
      "About 3 million|Unos 3 millones|Environ 3 millions|およそ300万匹",
      "About 3 billion|Unos 3.000 millones|Environ 3 milliards|およそ30億匹",
      "About 3 trillion|Unos 3 billones|Environ 3 000 milliards|およそ3兆匹",
    ],
    1,
    "The fires burned an area estimated at somewhere around 18 to 24 million hectares across the country, and the huge figure for affected wildlife, while an estimate rather than an exact count, drew international attention to how severe that fire season had been.|Los incendios quemaron una superficie estimada entre unos 18 y 24 millones de hectáreas en todo el país, y la enorme cifra de fauna afectada, aunque es una estimación y no un recuento exacto, atrajo la atención internacional sobre la gravedad de esa temporada de incendios.|Les incendies ont brûlé une superficie estimée entre environ 18 et 24 millions d'hectares dans tout le pays, et ce chiffre énorme d'animaux touchés, bien qu'il s'agisse d'une estimation plutôt que d'un décompte exact, a attiré l'attention internationale sur la gravité de cette saison des feux.|この火災は全国でおよそ1,800万から2,400万ヘクタールを焼いたと推計されている。影響を受けた野生動物のこの膨大な数字は正確な集計ではなく推計値ではあるが、その火災シーズンがいかに深刻だったかを世界に印象づけた。",
  ),
  q(
    8,
    "Uluru's official dual name once listed \"Ayers Rock\" first; in what year was the order swapped to put the Aboriginal name first, as \"Uluru / Ayers Rock\"?|El nombre dual oficial de Uluru ponía antes «Ayers Rock»; ¿en qué año se invirtió el orden para anteponer el nombre aborigen, como «Uluru / Ayers Rock»?|Le nom double officiel d'Uluru plaçait autrefois « Ayers Rock » en premier ; en quelle année l'ordre fut-il inversé pour placer le nom aborigène en premier, sous la forme « Uluru / Ayers Rock » ?|ウルルの正式な二重名称は、かつて「エアーズロック」が先に来ていた。アボリジナルの名を先に置いた「ウルル/エアーズロック」の順に入れ替わったのは何年か?",
    [
      "1985|1985|1985|1985年",
      "2019|2019|2019|2019年",
      "2002|2002|2002|2002年",
    ],
    2,
    "The dual name was first granted in 1993 as \"Ayers Rock / Uluru,\" and it was not until 2002, following a request from the Regional Tourism Association, that the Australian government reversed the order to \"Uluru / Ayers Rock,\" the form still used officially today.|El nombre dual se concedió por primera vez en 1993 como «Ayers Rock / Uluru», y no fue hasta 2002, tras una solicitud de la Asociación Regional de Turismo, cuando el gobierno australiano invirtió el orden a «Uluru / Ayers Rock», la forma que todavía se usa oficialmente hoy.|Le nom double fut accordé pour la première fois en 1993 sous la forme « Ayers Rock / Uluru », et ce n'est qu'en 2002, à la demande de l'association régionale du tourisme, que le gouvernement australien inversa l'ordre en « Uluru / Ayers Rock », la forme encore utilisée officiellement aujourd'hui.|この二重名称は1993年に「エアーズロック/ウルル」として初めて認められ、その後2002年、地域観光協会の要請を受けてオーストラリア政府が順序を「ウルル/エアーズロック」に入れ替えた。この形が今も公式に使われている。",
  ),
  q(
    8,
    "The finger lime, a native Australian citrus fruit sometimes called \"citrus caviar\" by chefs, is prized for what?|La lima del dedo, un cítrico nativo australiano al que los chefs a veces llaman «caviar cítrico», se aprecia por qué?|Le citron caviar, un agrume natif d'Australie que les chefs surnomment parfois « caviar d'agrumes », est apprécié pour quoi ?|シェフから「シトラス・キャビア」とも呼ばれるオーストラリア原産の柑橘、フィンガーライムが珍重される理由は?",
    [
      "Its flesh bursts into small caviar-like pearls of juice|Su pulpa se deshace en pequeñas perlas de jugo parecidas al caviar|Sa chair éclate en petites perles de jus ressemblant à du caviar|果肉がキャビアに似た小さな粒状の果汁の玉になっているから",
      "It is the largest citrus fruit ever recorded|Es el cítrico más grande jamás registrado|C'est le plus gros agrume jamais recensé|記録上最大の柑橘だから",
      "It grows only underground, like a truffle|Crece solo bajo tierra, como una trufa|Il pousse uniquement sous terre, comme une truffe|トリュフのように地中でしか育たないから",
    ],
    0,
    "Native to the rainforests of northern New South Wales and southern Queensland, finger limes were historically eaten by Aboriginal peoples and have more recently become a fashionable garnish in high-end restaurants worldwide, commanding prices well above ordinary citrus.|Nativa de las selvas del norte de Nueva Gales del Sur y el sur de Queensland, la lima del dedo era comida tradicionalmente por pueblos aborígenes y más recientemente se ha convertido en una guarnición de moda en restaurantes de alta cocina de todo el mundo, con precios muy por encima de los cítricos comunes.|Originaire des forêts tropicales du nord de la Nouvelle-Galles du Sud et du sud du Queensland, le citron caviar était traditionnellement consommé par les peuples aborigènes et est plus récemment devenu une garniture à la mode dans les restaurants haut de gamme du monde entier, se vendant bien plus cher que les agrumes ordinaires.|ニューサウスウェールズ北部からクイーンズランド南部の熱帯雨林原産のフィンガーライムは、伝統的にアボリジナルの人々が食してきた果物である。近年では世界各地の高級レストランで流行の付け合わせとなり、ふつうの柑橘よりもはるかに高値で取引されている。",
  ),

  // --- 追加分(第5弾)。難易度9〜10、専門に近い層。1問ずつ裏を取ってから書く。 ---
  q(
    9,
    "What did the 1967 referendum actually change in Australia's constitution?|¿Qué cambió realmente el referéndum de 1967 en la constitución de Australia?|Qu'a réellement changé le référendum de 1967 dans la constitution australienne ?|1967年の国民投票は、オーストラリアの憲法において実際には何を変えたか?",
    [
      "It gave Aboriginal people the right to vote in federal elections for the first time|Concedió por primera vez a la población aborigen el derecho a votar en elecciones federales|Il a accordé pour la première fois aux Aborigènes le droit de vote aux élections fédérales|アボリジナルの人々に連邦選挙での投票権を初めて与えた",
      "It let Aboriginal people be counted in the census and let federal Parliament make laws for them|Permitió contar a la población aborigen en el censo y que el Parlamento federal legislara para ella|Il a permis de compter les Aborigènes dans le recensement et au Parlement fédéral de légiférer pour eux|アボリジナルの人々を国勢調査に数えられるようにし、連邦議会が彼らに関する法律を作れるようにした",
      "It created the Torres Strait Islander flag|Creó la bandera de las islas del Estrecho de Torres|Il a créé le drapeau des insulaires du détroit de Torres|トレス海峡諸島民の旗を作った",
    ],
    1,
    "The referendum removed a clause excluding Aboriginal people from the national census and struck out wording that had stopped federal Parliament legislating for them, and it passed with over 90 percent support in every state; the right to vote federally had already been secured in law five years earlier, in 1962.|El referéndum eliminó una cláusula que excluía a la población aborigen del censo nacional y suprimió el texto que impedía al Parlamento federal legislar para ella, y se aprobó con más del 90 % de apoyo en todos los estados; el derecho a votar a nivel federal ya se había asegurado por ley cinco años antes, en 1962.|Le référendum supprima une clause excluant les Aborigènes du recensement national et retira le texte empêchant le Parlement fédéral de légiférer pour eux, et il fut adopté avec plus de 90 % de soutien dans chaque État ; le droit de vote fédéral avait déjà été garanti par la loi cinq ans plus tôt, en 1962.|この国民投票は、アボリジナルの人々を国勢調査から除外していた条項を削除し、連邦議会が彼らのために法律を作ることを妨げていた文言を撤廃した。全州で90%を超える賛成を得て可決されたが、連邦選挙での投票権自体は、これより5年早い1962年にすでに法律で確保されていた。",
  ),
  q(
    9,
    "In many Aboriginal kinship systems, society is divided into two halves used to regulate marriage and ceremonial roles, known by what term?|En muchos sistemas de parentesco aborígenes, la sociedad se divide en dos mitades usadas para regular el matrimonio y los roles ceremoniales, conocidas con qué término?|Dans de nombreux systèmes de parenté aborigènes, la société est divisée en deux moitiés servant à réguler le mariage et les rôles cérémoniels, connues sous quel terme ?|多くのアボリジナルの親族制度では、社会が結婚や儀礼上の役割を規定する二つの半分に分けられている。この仕組みは何と呼ばれるか?",
    [
      "Guilds|Gremios|Guildes|ギルド",
      "Precincts|Distritos|Circonscriptions|行政区",
      "Moieties|Mitades («moieties»)|Moitiés (« moieties »)|モイエティ(半族)",
    ],
    2,
    "In a moiety system, such as the Dhuwa and Yirritja division used by Yolŋu people in Arnhem Land, every person, ceremony, plant, animal and tract of Country belongs to one half or the other, and marriage rules typically require a person to marry into the opposite moiety.|En un sistema de mitades, como la división dhuwa y yirritja usada por el pueblo yolŋu en Arnhem Land, cada persona, ceremonia, planta, animal y extensión de Country pertenece a una mitad o a la otra, y las normas matrimoniales suelen exigir que una persona se case con alguien de la mitad opuesta.|Dans un système de moitiés, comme la division Dhuwa et Yirritja utilisée par le peuple yolŋu en Terre d'Arnhem, chaque personne, cérémonie, plante, animal et étendue de Country appartient à l'une ou l'autre moitié, et les règles matrimoniales exigent généralement qu'une personne épouse quelqu'un de la moitié opposée.|アーネムランドのヨルング族が用いるドゥワとイリチャの区分のようなモイエティ制度では、あらゆる人・儀礼・植物・動物・カントリー(土地)の一部が、どちらか一方の半族に属する。結婚の規則は通常、相手の半族が自分とは反対側であることを求める。",
  ),
  q(
    9,
    "Besides land, what other domain does the concept of \"Country\" also extend to for many Aboriginal and Torres Strait Islander groups?|Además de la tierra, ¿a qué otro ámbito se extiende también el concepto de «Country» para muchos grupos aborígenes e isleños del Estrecho de Torres?|Au-delà de la terre, à quel autre domaine s'étend aussi le concept de « Country » pour de nombreux groupes aborigènes et insulaires du détroit de Torres ?|多くのアボリジナルとトレス海峡諸島民の集団にとって、「カントリー」という概念は土地のほかに何にも及んでいるか?",
    [
      "The sea and waterways, sometimes called \"Sea Country\"|El mar y las vías navegables, a veces llamado «Sea Country»|La mer et les voies navigables, parfois appelées « Sea Country »|海や水路。「シー・カントリー」と呼ばれることもある",
      "Only the airspace directly above a settlement|Solo el espacio aéreo justo sobre un asentamiento|Uniquement l'espace aérien juste au-dessus d'une localité|集落の真上の空域のみ",
      "Only land that has been formally surveyed|Solo la tierra que se ha inspeccionado formalmente|Uniquement les terres officiellement arpentées|正式に測量された土地のみ",
    ],
    0,
    "Sea Country carries the same web of law, knowledge and responsibility as land Country, extending to reefs, estuaries and open water, which is why some native title claims and land and sea management agreements now explicitly cover marine areas as well as land.|El Sea Country lleva la misma red de ley, conocimiento y responsabilidad que el Country de tierra, y se extiende a arrecifes, estuarios y mar abierto, por lo que algunas reclamaciones de título nativo y acuerdos de gestión de tierra y mar ya cubren de forma explícita zonas marinas además de la tierra.|Le Sea Country porte le même réseau de lois, de savoirs et de responsabilités que le Country terrestre, s'étendant aux récifs, aux estuaires et à la haute mer, ce qui explique que certaines revendications de titre autochtone et accords de gestion terre-mer couvrent désormais explicitement les zones marines en plus des terres.|シー・カントリーには、陸のカントリーと同じ掟・知識・責務の網の目が及んでおり、リーフや河口、外洋にまで広がっている。そのため、一部の先住権原の主張や陸海管理協定は、いまでは陸地だけでなく海域も明示的に対象としている。",
  ),
  q(
    9,
    "The male platypus has a venomous spur on its hind leg. Do male echidnas, the platypus's only monotreme relatives, have the same ability?|El ornitorrinco macho tiene un espolón venenoso en la pata trasera. ¿Tienen los equidnas macho, sus únicos parientes monotremas, la misma capacidad?|Le platypus mâle possède un éperon venimeux sur la patte arrière. Les échidnés mâles, ses seuls parents monotrèmes, ont-ils la même capacité ?|オスのカモノハシは後ろ足に毒のあるけづめを持つ。カモノハシの唯一の近縁である単孔類、ハリモグラのオスも同じ能力を持つか?",
    [
      "Yes — echidna venom is even more potent than the platypus's|Sí: el veneno del equidna es incluso más potente que el del ornitorrinco|Oui — le venin de l'échidné est encore plus puissant que celui du platypus|はい。ハリモグラの毒はカモノハシよりもさらに強力である",
      "No — male echidnas have a similar spur, but it is not known to be venomous|No: los machos de equidna tienen un espolón parecido, pero no se sabe que sea venenoso|Non — les échidnés mâles ont un éperon similaire, mais il n'est pas connu pour être venimeux|いいえ。オスのハリモグラも似たけづめを持つが、毒があるとは確認されていない",
      "No — male echidnas have no spur of any kind|No: los machos de equidna no tienen ningún tipo de espolón|Non — les échidnés mâles n'ont aucun éperon|いいえ。オスのハリモグラにはけづめ自体がまったくない",
    ],
    1,
    "Male echidnas retain a spur on each hind leg that appears to be a vestigial leftover from a shared ancestor with the platypus, since it is not connected to a functioning venom gland and has no confirmed role in defence or competition.|Los machos de equidna conservan un espolón en cada pata trasera que parece ser un vestigio de un ancestro común con el ornitorrinco, ya que no está conectado a una glándula de veneno funcional y no tiene un papel confirmado en la defensa o la competencia.|Les échidnés mâles conservent un éperon sur chaque patte arrière qui semble être un vestige hérité d'un ancêtre commun avec le platypus, car il n'est relié à aucune glande à venin fonctionnelle et son rôle dans la défense ou la compétition n'est pas confirmé.|オスのハリモグラは両方の後ろ足にけづめを持っているが、これはカモノハシとの共通祖先から受け継がれた痕跡的な器官らしい。機能する毒腺にはつながっておらず、防御や競争における役割も確認されていない。",
  ),
  q(
    9,
    "The Torres Strait Islander flag design, by Bernard Namok, won a competition in 1992. In which later year was it formally proclaimed an official flag of Australia, alongside the Aboriginal flag?|El diseño de la bandera de las islas del Estrecho de Torres, obra de Bernard Namok, ganó un concurso en 1992. ¿En qué año posterior se proclamó formalmente como bandera oficial de Australia, junto a la bandera aborigen?|Le dessin du drapeau des insulaires du détroit de Torres, œuvre de Bernard Namok, remporta un concours en 1992. En quelle année ultérieure fut-il officiellement proclamé drapeau officiel de l'Australie, aux côtés du drapeau aborigène ?|トレス海峡諸島民の旗のデザインは、バーナード・ナモクの案が1992年のコンペで選ばれた。それより後のいつ、アボリジナル旗とともにオーストラリアの公式な旗として正式に布告されたか?",
    [
      "1901, at the moment of federation|1901, en el momento de la federación|1901, au moment de la fédération|1901年、連邦結成の瞬間",
      "2020|2020|2020|2020年",
      "1995, three years after the winning design was chosen|1995, tres años después de elegirse el diseño ganador|1995, trois ans après le choix du dessin gagnant|1992年の3年後、1995年",
    ],
    2,
    "The flag, with its green, black and blue bands, a white dhari headdress and a five-pointed star, was formally proclaimed under the Flags Act alongside the Aboriginal flag in 1995, three years after Namok's design had already won the 1992 competition, giving Australia's two Indigenous peoples separately recognised official flags.|La bandera, con sus bandas verde, negra y azul, un tocado dhari blanco y una estrella de cinco puntas, se proclamó formalmente en virtud de la Flags Act junto a la bandera aborigen en 1995, tres años después de que el diseño de Namok ganara el concurso de 1992, dando a los dos pueblos indígenas de Australia banderas oficiales reconocidas por separado.|Le drapeau, avec ses bandes vertes, noires et bleues, une coiffe dhari blanche et une étoile à cinq branches, fut officiellement proclamé en vertu du Flags Act aux côtés du drapeau aborigène en 1995, trois ans après que le dessin de Namok eut remporté le concours de 1992, donnant aux deux peuples autochtones d'Australie des drapeaux officiels reconnus séparément.|緑・黒・青の帯に白いダリ(頭飾り)と五芒星を配したこの旗は、ナモクの案が1992年のコンペで選ばれてから3年後の1995年、旗章法にもとづきアボリジナル旗とともに正式に布告された。これにより、オーストラリアの二つの先住民族はそれぞれ別に公認された公式の旗を持つことになった。",
  ),
  q(
    9,
    "The Indian Pacific train made its first-ever Sydney-to-Perth journey on a single, unbroken track gauge in which year?|El tren Indian Pacific hizo su primer viaje de Sídney a Perth por una vía de un solo ancho, sin cambios, en qué año?|Le train Indian Pacific effectua son tout premier trajet de Sydney à Perth sur une voie à écartement unique et ininterrompu en quelle année ?|インディアン・パシフィック号が、途切れない単一の軌間だけを使ってシドニーからパースまで初めて走ったのは何年か?",
    [
      "1970|1970|1970|1970年",
      "1901|1901|1901|1901年",
      "1956|1956|1956|1956年",
    ],
    0,
    "The train's inaugural coast-to-coast run became possible only once standard-gauge track finally linked the last mismatched sections between New South Wales and Western Australia, ending nearly a century of forced gauge changes for cross-country travellers.|El viaje inaugural de costa a costa del tren solo fue posible una vez que la vía de ancho estándar por fin conectó los últimos tramos desiguales entre Nueva Gales del Sur y Australia Occidental, poniendo fin a casi un siglo de cambios de vía forzados para los viajeros que cruzaban el país.|Le trajet inaugural du train d'une côte à l'autre ne devint possible qu'une fois la voie à écartement standard reliant enfin les derniers tronçons discordants entre la Nouvelle-Galles du Sud et l'Australie-Occidentale, mettant fin à près d'un siècle de changements de voie forcés pour les voyageurs traversant le pays.|この列車が海岸から海岸まで初めて走れるようになったのは、ニューサウスウェールズと西オーストラリアのあいだに残っていた最後の軌間の食い違いが標準軌でついにつながったからだった。これにより、大陸を横断する旅行者を苦しめてきた約1世紀にわたる軌間の乗り換えがようやく終わった。",
  ),
  q(
    9,
    "Australia's constitution includes a rare mechanism called \"double dissolution,\" allowing what to happen?|La constitución de Australia incluye un mecanismo poco común llamado «doble disolución», que permite qué?|La constitution australienne comporte un mécanisme rare appelé « double dissolution », qui permet quoi ?|オーストラリア憲法には「ダブル・ディゾリューション(両院解散)」と呼ばれる珍しい仕組みがある。これは何を可能にするものか?",
    [
      "A state can leave the federation with a two-thirds vote|Un estado puede abandonar la federación con dos tercios de los votos|Un État peut quitter la fédération avec un vote aux deux tiers|3分の2の賛成で州が連邦から離脱できる",
      "Both houses of Parliament can be dissolved together to break a legislative deadlock|Ambas cámaras del Parlamento pueden disolverse juntas para resolver un bloqueo legislativo|Les deux chambres du Parlement peuvent être dissoutes ensemble pour résoudre un blocage législatif|上下両院を同時に解散し、立法上の行き詰まりを打開できる",
      "The Governor-General can serve two terms at once|El gobernador general puede ejercer dos mandatos a la vez|Le gouverneur général peut exercer deux mandats à la fois|総督が同時に2期を務められる",
    ],
    1,
    "Set out in section 57 of the constitution, a double dissolution lets the government call an election for the entire House of Representatives and the full Senate at once if the Senate has twice rejected the same piece of legislation, a step used only a handful of times, including in 1975 and 2016.|Establecido en el artículo 57 de la constitución, una doble disolución permite al gobierno convocar elecciones para toda la Cámara de Representantes y todo el Senado a la vez si el Senado ha rechazado dos veces el mismo proyecto de ley, un paso usado solo en un puñado de ocasiones, incluidas 1975 y 2016.|Prévue à l'article 57 de la constitution, une double dissolution permet au gouvernement de convoquer des élections pour l'ensemble de la Chambre des représentants et du Sénat en même temps si le Sénat a rejeté deux fois le même projet de loi, une mesure utilisée seulement à quelques reprises, notamment en 1975 et en 2016.|憲法第57条に定められたこの仕組みでは、上院が同一の法案を2度否決した場合に、政府が下院全体と上院全体を同時に解散して総選挙を行うことができる。この手段が実際に使われたのはごくわずかで、1975年と2016年もその一例である。",
  ),

  q(
    10,
    "Water drawn from the deepest parts of the Great Artesian Basin can be how old, according to isotope dating?|Según la datación por isótopos, ¿cuán antigua puede ser el agua extraída de las partes más profundas de la Gran Cuenca Artesiana?|Selon la datation isotopique, quel âge peut avoir l'eau puisée dans les parties les plus profondes du Grand Bassin artésien ?|同位体年代測定によれば、グレート・アーテジアン盆地の最も深い部分から汲み上げられる水はどれほど古い可能性があるか?",
    [
      "Never more than about a decade old|Nunca más de una década|Jamais plus d'une dizaine d'années|どれほど古くても10年程度",
      "Exactly as old as the surrounding rock, around 4 billion years|Exactamente tan antigua como la roca circundante, unos 4.000 millones de años|Exactement de l'âge de la roche environnante, environ 4 milliards d'années|周囲の岩石と同じ、およそ40億年",
      "Over a million years old in places|En algunos lugares, más de un millón de años|Plus d'un million d'années par endroits|場所によっては100万年を超える",
    ],
    2,
    "The water fell as rain long before it slowly percolated down and travelled sideways through porous rock layers over immense spans of time, which is why hydrologists treat the basin's oldest reserves as a largely non-renewable resource on any human timescale.|El agua cayó como lluvia mucho antes de percolar lentamente hacia abajo y desplazarse lateralmente por capas de roca porosa durante inmensos periodos de tiempo, por lo que los hidrólogos tratan las reservas más antiguas de la cuenca como un recurso en gran medida no renovable en cualquier escala de tiempo humana.|Cette eau est tombée sous forme de pluie bien avant de s'infiltrer lentement puis de se déplacer latéralement à travers des couches de roche poreuse sur d'immenses périodes de temps, ce qui explique pourquoi les hydrologues considèrent les réserves les plus anciennes du bassin comme une ressource largement non renouvelable à l'échelle humaine.|この水は、多孔質の岩盤層をゆっくりと浸透し、長大な年月をかけて横方向に移動するよりもずっと前に雨として降ったものである。そのため水文学者は、この盆地の最も古い水を、人間の時間感覚ではほぼ再生不可能な資源として扱っている。",
  ),
  q(
    10,
    "Where did the First Fleet actually make its first landing in January 1788, before relocating a few days later to found the settlement at Sydney Cove?|¿Dónde hizo realmente la Primera Flota su primer desembarco en enero de 1788, antes de trasladarse unos días después para fundar el asentamiento de Sydney Cove?|Où la Première Flotte fit-elle réellement son premier débarquement en janvier 1788, avant de se déplacer quelques jours plus tard pour fonder l'établissement de Sydney Cove ?|1788年1月、ファースト・フリートが実際に最初に上陸したのはどこか。その数日後にシドニー・コーブへ移って入植地を築くことになる前の話である。",
    [
      "Botany Bay|Bahía Botany|Botany Bay|ボタニー湾",
      "Port Phillip Bay|Bahía de Port Phillip|La baie de Port Phillip|ポート・フィリップ湾",
      "Moreton Bay|Bahía de Moreton|La baie de Moreton|モートン湾",
    ],
    0,
    "Botany Bay's shallow, exposed anchorage and poor fresh water supply quickly proved unsuitable, so within days Governor Arthur Phillip moved the fleet a short distance north to Port Jackson, whose harbour at Sydney Cove had deep water and a reliable stream, a decision made so fast that it is often left out of popular retellings that jump straight to Sydney.|El fondeadero de la bahía Botany, poco profundo y expuesto, y su escaso suministro de agua dulce, pronto resultaron inadecuados, así que en cuestión de días el gobernador Arthur Phillip trasladó la flota una corta distancia al norte, a Port Jackson, cuyo puerto en Sydney Cove tenía aguas profundas y un arroyo fiable, una decisión tomada tan rápido que a menudo se omite en los relatos populares que van directos a Sídney.|Le mouillage peu profond et exposé de Botany Bay, ainsi que sa faible réserve d'eau douce, se révélèrent vite inadaptés, si bien qu'en quelques jours le gouverneur Arthur Phillip déplaça la flotte un peu plus au nord, à Port Jackson, dont le port de Sydney Cove offrait des eaux profondes et un cours d'eau fiable, une décision prise si vite qu'elle est souvent omise dans les récits populaires qui vont directement à Sydney.|ボタニー湾は浅く外洋にさらされた泊地で、真水の確保も乏しく、すぐに不向きと判明した。そのため総督アーサー・フィリップは数日のうちに艦隊を少し北のポート・ジャクソンへ移した。そこにあるシドニー・コーブは水深があり、安定した水源もあった。この判断があまりに早かったため、シドニーへ直行したかのように語られる通俗的な説明では省かれがちである。",
  ),
  q(
    10,
    "Devil facial tumour disease, which has devastated wild Tasmanian devil numbers, is scientifically remarkable for being one of very few known examples of what?|La enfermedad tumoral facial del demonio, que ha diezmado a los demonios de Tasmania salvajes, es científicamente notable por ser uno de los pocos ejemplos conocidos de qué?|La maladie tumorale faciale du diable, qui a décimé les diables de Tasmanie sauvages, est scientifiquement remarquable pour être l'un des très rares exemples connus de quoi ?|野生のタスマニアデビルの数を激減させてきた顔面腫瘍の病気は、科学的にはある現象のきわめて数少ない既知の例として注目されている。それは何か?",
    [
      "A disease that only affects animals in captivity|Una enfermedad que solo afecta a animales en cautividad|Une maladie qui n'affecte que les animaux en captivité|飼育下の動物にしか影響しない病気",
      "A transmissible cancer, spread directly between individuals as living cells|Un cáncer transmisible, que se contagia directamente entre individuos como células vivas|Un cancer transmissible, qui se propage directement entre individus sous forme de cellules vivantes|生きた細胞のまま個体間で直接うつる、伝染性のがん",
      "A disease spread only through contaminated water|Una enfermedad que se propaga solo por agua contaminada|Une maladie qui ne se propage que par l'eau contaminée|汚染された水を通じてしか広まらない病気",
    ],
    1,
    "Rather than being caused by a virus, the tumour itself is a clonal line of cancer cells passed from devil to devil through bites, one of only a handful of naturally occurring transmissible cancers documented in any species, alongside a similar cancer in dogs and several in shellfish.|En lugar de estar causado por un virus, el propio tumor es una línea clonal de células cancerosas que pasa de un demonio a otro a través de mordeduras, uno de los pocos cánceres transmisibles de origen natural documentados en cualquier especie, junto a un cáncer similar en perros y varios en moluscos.|Plutôt que d'être causée par un virus, la tumeur elle-même est une lignée clonale de cellules cancéreuses transmise de diable à diable par les morsures, l'un des rares cancers transmissibles d'origine naturelle documentés chez une espèce, aux côtés d'un cancer similaire chez le chien et de plusieurs autres chez des mollusques.|この腫瘍はウイルスによるものではなく、咬み傷を通じてデビルからデビルへと直接受け継がれる、クローン化したがん細胞そのものである。これは自然界で確認されている伝染性のがんとしてはごくわずかな例の一つで、イヌに見られる類似のがんや、貝類に見られるいくつかの例と並ぶものである。",
  ),
  q(
    10,
    "The 1996 Wik Peoples v Queensland High Court decision established that native title could do what?|La sentencia del Tribunal Superior de 1996 en el caso Wik Peoples contra Queensland estableció que el título nativo podía hacer qué?|La décision de 1996 de la Haute Cour dans l'affaire Wik Peoples contre Queensland a établi que le titre autochtone pouvait faire quoi ?|1996年の「ウィク族対クイーンズランド州」高等裁判所判決が確立したのは、先住権原について何ができるということか?",
    [
      "Be bought and sold on the open property market|Poder comprarse y venderse en el mercado inmobiliario abierto|Être acheté et vendu sur le marché immobilier libre|一般の不動産市場で自由に売買できる",
      "Only apply to land already owned by the federal government|Aplicarse solo a tierras que ya pertenecían al gobierno federal|Ne s'appliquer qu'aux terres déjà détenues par le gouvernement fédéral|連邦政府がすでに所有している土地にのみ適用される",
      "Coexist with pastoral leases in some circumstances, rather than being automatically extinguished by them|Coexistir con arrendamientos ganaderos en algunas circunstancias, en vez de ser extinguido automáticamente por ellos|Coexister avec des baux pastoraux dans certaines circonstances, plutôt que d'être automatiquement éteint par eux|一定の条件下で牧畜借地権と共存でき、それによって自動的に消滅するわけではない",
    ],
    2,
    "Before Wik, many assumed that granting a pastoral lease over land automatically wiped out any native title on it; the decision found the two interests could coexist, with the pastoral lease taking precedence wherever the two conflicted, and it prompted the government to pass amending legislation in 1998 to clarify how claims would be handled.|Antes de Wik, muchos suponían que conceder un arrendamiento ganadero sobre un terreno anulaba automáticamente cualquier título nativo sobre él; la sentencia determinó que ambos intereses podían coexistir, con el arrendamiento ganadero teniendo prioridad allí donde entraran en conflicto, y llevó al gobierno a aprobar en 1998 una legislación modificatoria para aclarar cómo se tramitarían las reclamaciones.|Avant Wik, beaucoup supposaient que l'octroi d'un bail pastoral sur un terrain effaçait automatiquement tout titre autochtone existant ; la décision établit que les deux intérêts pouvaient coexister, le bail pastoral l'emportant en cas de conflit entre les deux, ce qui poussa le gouvernement à adopter en 1998 une législation modificative pour préciser le traitement des revendications.|ウィク判決以前は、牧畜借地権が設定されると、その土地の先住権原は自動的に消滅すると多くの人が考えていた。しかしこの判決は、両者は共存しうるものであり、対立した場合には牧畜借地権が優先されるとした。この判決を受けて政府は1998年に補足立法を成立させ、権原の主張がどう扱われるかを明確にした。",
  ),
  q(
    10,
    "To pass, an Australian constitutional referendum must clear a \"double majority\" requirement, meaning what?|Para aprobarse, un referéndum constitucional australiano debe superar el requisito de la «doble mayoría», que significa qué?|Pour être adopté, un référendum constitutionnel australien doit franchir l'exigence de « double majorité », c'est-à-dire quoi ?|オーストラリアの憲法改正国民投票が成立するには「二重多数」という要件を満たす必要がある。これはどういう意味か?",
    [
      "A national majority of voters, plus a majority of voters in a majority of states|Una mayoría nacional de votantes, más una mayoría de votantes en la mayoría de los estados|Une majorité nationale des électeurs, plus une majorité des électeurs dans la majorité des États|全国での過半数の賛成に加え、過半数の州でも過半数の賛成が必要",
      "Every state must vote yes unanimously|Todos los estados deben votar sí por unanimidad|Chaque État doit voter oui à l'unanimité|すべての州が満場一致で賛成しなければならない",
      "The proposal must pass in two separate referendums held a year apart|La propuesta debe aprobarse en dos referéndums distintos celebrados con un año de diferencia|La proposition doit être adoptée lors de deux référendums distincts tenus à un an d'intervalle|1年の間隔を置いて行われる2回の国民投票の両方で可決される必要がある",
    ],
    0,
    "Set out in section 128 of the constitution, this double majority is why referendums can fail even after winning most votes overall, as happened in 1999 and 2023, while the 1967 referendum succeeded so comfortably that it cleared both thresholds in every single state.|Establecido en el artículo 128 de la constitución, esta doble mayoría explica por qué los referéndums pueden fracasar incluso tras ganar la mayoría de los votos en total, como ocurrió en 1999 y 2023, mientras que el referéndum de 1967 tuvo tanto éxito que superó ambos umbrales en todos y cada uno de los estados.|Prévue à l'article 128 de la constitution, cette double majorité explique pourquoi un référendum peut échouer même après avoir recueilli la majorité des voix au total, comme en 1999 et en 2023, tandis que le référendum de 1967 réussit si largement qu'il franchit les deux seuils dans chaque État.|憲法第128条に定められたこの二重多数の要件があるため、1999年や2023年のように、全国の得票では過半数を得ても国民投票が否決されることがある。一方1967年の国民投票はあまりに大差で成立したため、すべての州でこの二つの基準を余裕をもってクリアした。",
  ),
];
