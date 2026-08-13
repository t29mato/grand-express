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
];
