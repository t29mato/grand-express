/**
 * アフリカ大陸盤面のクイズ(103問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「アフリカの外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(61件)が扱う具体的な事実(TAZARAの軌間政治・ジブチの新旧鉄道・
 * カタンガの競合3路線・ダカール〜ニジェール線・ツァボのライオン・ウガンダ鉄道・
 * SGRの担保論争・ルワンダに鉄道が無いこと・コンゴ―オセアン鉄道の犠牲者数・
 * ベンゲラ/ロビト回廊・ワルビスベイの飛び地・モザンビークの3回廊・
 * ヴィクトリアフォールズ橋・SNIM鉄道・ガフサのリン鉱石・コンスタンティーヌの
 * 峡谷・アルジェリア―モロッコ国境の閉鎖・ハマーショルド機墜落・
 * エリトリア鉄道の手作業復元・アディスアベバのLRT・ユーカリの木・
 * コルウェジのコバルトブーム・キンシャサ―ブラザヴィルに橋が無いこと など)は
 * ここでは問わない。代わりに、都市カードが触れていない主題
 * (大陸規模の地理・言語と民族・鉄道以外の植民地史/独立史・野生動物・
 * 文化と音楽・現代の政治経済・自然科学の記録)を選んだ。
 *
 * ```
 * node scripts/check-quiz.mjs africa
 * ```
 * を自分で回して確認済み(使い捨てcontent.json({id,cities,quiz})を組んで検査後に削除、
 * 手順書の「焼く前でも回せる」と同じ手法)。
 *
 * 選択肢は3つ。**正解の位置(`a`)は散らしていない**(0が多い)。指示書に
 * 「出題時にシャッフルされる」とあるため、位置の偏りは直す必要が無い。
 *
 * ## 難易度分布(103問。実測)
 *
 * 1:5 / 2:9 / 3:8 / 4:14 / 5:19 / 6:14 / 7:17 / 8:6 / 9:10 / 10:1。
 * 1〜3=22(目安20以上)・7以上=34(目安25以上)・9〜10=11(目安10以上)、
 * いずれも満たしている。
 *
 * ## `check-quiz.mjs` で見つけて直したもの
 *
 * - 答えの漏れ1件(Q103「ジンバブエは内陸国」→ `beira` カードが
 *   「内陸国ジンバブエ」と明記していたため、別の設問(カバの生態)に差し替えた)
 * - 日本語の欄への英字混入2件(「ンguni」→「ングニ」、合成語の説明で
 *   `TANganyika`/`ZANzibar` とローマ字を埋め込んでいたのを言い換え)
 * - 残り10件の「漏れ?」は国名の偶然の一致(短い答えの誤検知。手順書の
 *   注記どおり)と判断した。都市カードとクイズの答えが同じ国を指していても、
 *   都市カード側は鉄道・回廊の話、クイズ側は別の具体的事実(通貨・音楽・
 *   歴史上の出来事など)で、答えを導く固有の事実は重なっていない
 * - `M-Pesa`(Q71)は日本語欄にもラテン文字のまま残している。固有名詞そのもの
 *   (原語を出さないと問いが成立しない)で、`TGV`と同種の例外だと判断した。
 *   `check-quiz.mjs` の `ACCEPTED` への追加は登録側にお願いしたい
 *   (`africa:M-Pesa`、Q71 M-Pesaの発足国を問う設問)
 *
 * ## 難易度9〜10(11問)の裏取りについて
 *
 * 1問ずつ確認した。確度がやや低いと自分で判断したものが1件ある
 * (登録前に報告に書く): マシアス・ンゲマ政権下で死亡・亡命した
 * 赤道ギニアの人口の割合「およそ3分の1」(複数の資料で繰り返し見る数字だが、
 * 厳密な統計調査ではなく概算)。残り10問(南アフリカ国歌の5言語・
 * ランブル・イン・ザ・ジャングルの開催国・ンクルマ失脚時の訪問国・
 * アドワの戦いの指導者・英ザンジバル戦争の長さ・アウズー地帯のICJ裁定・
 * ソマリア・シリングの発行主体・チャド湖の縮小率・レソト型の飛び地国の数・
 * エスワティニの統治形態)は、年号・数値とも複数の情報源で一致しており
 * 確度が高いと判断した。
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

export const AFRICA_QUIZ = [
  q(
    1,
    "What is the largest hot desert in the world?|¿Cuál es el desierto cálido más grande del mundo?|Quel est le plus grand désert chaud du monde ?|世界最大の(高温の)砂漠は?",
    ["The Sahara|El Sahara|Le Sahara|サハラ砂漠", "The Gobi Desert|El desierto de Gobi|Le désert de Gobi|ゴビ砂漠", "The Arabian Desert|El desierto de Arabia|Le désert d'Arabie|アラビア砂漠"],
    0,
    "At roughly 9.2 million km², the Sahara is close to the size of the entire United States, and it is still slowly expanding at its southern edge into the Sahel.|Con unos 9,2 millones de km², el Sahara es casi del tamaño de todo Estados Unidos, y todavía se expande lentamente en su borde sur hacia el Sahel.|Avec environ 9,2 millions de km², le Sahara est presque de la taille des États-Unis tout entiers, et il continue de s'étendre lentement à sa lisière sud, vers le Sahel.|面積はおよそ920万平方キロメートルで、アメリカ合衆国全土に匹敵する広さがある。いまも南の縁でサヘルへとゆっくり広がり続けている。",
  ),
  q(
    1,
    "Which African river is traditionally counted as the longest river on Earth?|¿Qué río africano se considera tradicionalmente el más largo de la Tierra?|Quel fleuve africain est traditionnellement considéré comme le plus long du monde ?|伝統的に地球でいちばん長い川とされてきたアフリカの川は?",
    ["The Congo|El Congo|Le Congo|コンゴ川", "The Nile|El Nilo|Le Nil|ナイル川", "The Niger|El Níger|Le Niger|ニジェール川"],
    1,
    "The Nile runs about 6,650km from its sources in the African Great Lakes region north to the Mediterranean, though some researchers argue the Amazon is actually slightly longer depending on how its mouth is measured.|El Nilo recorre unos 6.650 km desde sus fuentes en la región de los Grandes Lagos africanos hasta el Mediterráneo, aunque algunos investigadores sostienen que el Amazonas es en realidad algo más largo según cómo se mida su desembocadura.|Le Nil parcourt environ 6 650 km depuis ses sources dans la région des Grands Lacs africains jusqu'à la Méditerranée, bien que certains chercheurs estiment que l'Amazone est en réalité légèrement plus long selon la façon dont on mesure son embouchure.|ナイル川はアフリカ大湖地方の水源から地中海まで約6,650kmを流れる。ただし河口の測り方によってはアマゾン川のほうがわずかに長いとする研究者もいる。",
  ),
  q(
    1,
    "About how many countries make up the African continent?|¿Aproximadamente cuántos países forman el continente africano?|Environ combien de pays composent le continent africain ?|アフリカ大陸はおよそいくつの国から成るか?",
    ["About 30|Unos 30|Environ 30|およそ30か国", "About 54|Unos 54|Environ 54|およそ54か国", "About 80|Unos 80|Environ 80|およそ80か国"],
    1,
    "Africa has 54 widely recognised sovereign states, more than any other continent — nearly double the number of countries in Europe.|África tiene 54 estados soberanos ampliamente reconocidos, más que cualquier otro continente, casi el doble de países que Europa.|L'Afrique compte 54 États souverains largement reconnus, plus qu'aucun autre continent — presque le double du nombre de pays en Europe.|アフリカには広く承認された主権国家が54か国あり、大陸の中で最も多い。ヨーロッパの国の数のほぼ2倍にあたる。",
  ),
  q(
    1,
    "The Pyramids of Giza, among the most famous structures of the ancient world, are found in which country?|Las pirámides de Guiza, entre las estructuras más famosas del mundo antiguo, ¿en qué país se encuentran?|Les pyramides de Gizeh, parmi les structures les plus célèbres du monde antique, se trouvent dans quel pays ?|古代世界でも屈指の有名な建造物、ギザのピラミッドがあるのはどこの国か?",
    ["Egypt|Egipto|L'Égypte|エジプト", "Sudan|Sudán|Le Soudan|スーダン", "Libya|Libia|La Libye|リビア"],
    0,
    "Built as royal tombs roughly 4,500 years ago, the Great Pyramid of Giza was the tallest human-made structure on Earth for almost 3,800 years, until England's Lincoln Cathedral surpassed it around 1300.|Construida como tumba real hace unos 4.500 años, la Gran Pirámide de Guiza fue la estructura hecha por el hombre más alta de la Tierra durante casi 3.800 años, hasta que la catedral de Lincoln, en Inglaterra, la superó hacia 1300.|Bâtie comme tombeau royal il y a environ 4 500 ans, la grande pyramide de Gizeh fut la plus haute structure humaine sur Terre pendant près de 3 800 ans, jusqu'à ce que la cathédrale de Lincoln, en Angleterre, la dépasse vers 1300.|およそ4,500年前に王の墓として建てられたギザの大ピラミッドは、1300年頃にイングランドのリンカン大聖堂に抜かれるまで、実に3,800年近くにわたって地球上で最も高い人工建造物であり続けた。",
  ),
  q(
    2,
    "What is the highest mountain in Africa?|¿Cuál es la montaña más alta de África?|Quelle est la plus haute montagne d'Afrique ?|アフリカでいちばん高い山は?",
    ["Mount Kenya|El monte Kenia|Le mont Kenya|ケニア山", "Mount Kilimanjaro|El Kilimanjaro|Le Kilimandjaro|キリマンジャロ山", "The Atlas Mountains' Toubkal peak|El Toubkal, en el Atlas|Le Toubkal, dans l'Atlas|アトラス山脈のトゥブカル峰"],
    1,
    "Kilimanjaro in Tanzania rises 5,895m as a free-standing volcanic massif rather than part of a mountain range, making it the tallest free-standing mountain anywhere in the world.|El Kilimanjaro, en Tanzania, se alza 5.895 m como un macizo volcánico aislado en vez de formar parte de una cordillera, lo que lo convierte en la montaña independiente más alta del mundo.|Le Kilimandjaro, en Tanzanie, s'élève à 5 895 m en tant que massif volcanique isolé plutôt que partie d'une chaîne de montagnes, ce qui en fait la plus haute montagne indépendante au monde.|タンザニアのキリマンジャロは標高5,895mで、山脈の一部ではなく単独で立つ火山塊としては世界でいちばん高い山である。",
  ),
  q(
    2,
    "Which is Africa's largest lake by surface area?|¿Cuál es el lago más grande de África por superficie?|Quel est le plus grand lac d'Afrique par sa superficie ?|面積で見たアフリカ最大の湖は?",
    ["Lake Victoria|El lago Victoria|Le lac Victoria|ヴィクトリア湖", "Lake Tanganyika|El lago Tanganica|Le lac Tanganyika|タンガニーカ湖", "Lake Chad|El lago Chad|Le lac Tchad|チャド湖"],
    0,
    "Lake Victoria, shared by Tanzania, Uganda and Kenya, is the world's second-largest freshwater lake by surface area after Lake Superior, though it is comparatively shallow.|El lago Victoria, compartido por Tanzania, Uganda y Kenia, es el segundo lago de agua dulce más grande del mundo por superficie, después del lago Superior, aunque es comparativamente poco profundo.|Le lac Victoria, partagé par la Tanzanie, l'Ouganda et le Kenya, est le deuxième lac d'eau douce du monde par sa superficie après le lac Supérieur, bien qu'il soit relativement peu profond.|タンザニア・ウガンダ・ケニアにまたがるヴィクトリア湖は、面積では五大湖のスペリオル湖に次いで世界第2位の淡水湖だが、水深は比較的浅い。",
  ),
  q(
    2,
    "Zulu, Swahili, Xhosa and hundreds of other sub-Saharan languages belong to which large language family?|El zulú, el suajili, el xhosa y otras cientas de lenguas subsaharianas, ¿a qué gran familia lingüística pertenecen?|Le zoulou, le swahili, le xhosa et des centaines d'autres langues subsahariennes appartiennent à quelle grande famille linguistique ?|ズールー語・スワヒリ語・コーサ語など何百ものサハラ以南の言語が属する大きな語族は?",
    ["The Bantu languages|Las lenguas bantúes|Les langues bantoues|バントゥー諸語", "The Semitic languages|Las lenguas semíticas|Les langues sémitiques|セム語派", "The Nilotic languages|Las lenguas nilóticas|Les langues nilotiques|ナイル諸語"],
    0,
    "There are several hundred Bantu languages spoken by more than 350 million people across most of sub-Saharan Africa, all thought to descend from a single language spoken in West-Central Africa a few thousand years ago.|Existen varios cientos de lenguas bantúes habladas por más de 350 millones de personas en la mayor parte del África subsahariana, y se cree que todas descienden de una sola lengua hablada en África centrooccidental hace unos pocos miles de años.|Il existe plusieurs centaines de langues bantoues parlées par plus de 350 millions de personnes dans la majeure partie de l'Afrique subsaharienne, toutes considérées comme descendant d'une langue unique parlée en Afrique centre-occidentale il y a quelques milliers d'années.|バントゥー諸語は数百の言語からなり、サハラ以南アフリカの大半で3億5000万人以上が話す。すべてが数千年前に中西部アフリカで話されていた一つの言語から分かれたと考えられている。",
  ),
  q(
    2,
    "What is the name of the vast north-south fracture in the Earth's crust running through East Africa, linked to early human fossil sites?|¿Cómo se llama la vasta fractura norte-sur de la corteza terrestre que atraviesa África Oriental, vinculada a yacimientos de fósiles humanos primitivos?|Comment s'appelle la vaste fracture nord-sud de la croûte terrestre traversant l'Afrique de l'Est, liée à des sites de fossiles humains primitifs ?|東アフリカを南北に走る地殻の巨大な裂け目で、初期人類の化石が見つかる場所として知られるのは?",
    ["The Great Rift Valley|El Gran Valle del Rift|Le grand rift est-africain|グレート・リフト・バレー(大地溝帯)", "The Great Escarpment|La Gran Escarpa|Le Grand Escarpement|グレート・エスカープメント", "The Central African Trench|La Fosa de África Central|La fosse d'Afrique centrale|中央アフリカ海溝"],
    0,
    "The Rift Valley marks where the African tectonic plate is slowly splitting in two; millions of years from now, the eastern sliver is expected to break away entirely and become its own landmass surrounded by ocean.|El Valle del Rift marca el lugar donde la placa tectónica africana se está dividiendo lentamente en dos; dentro de millones de años, se espera que la franja oriental se separe por completo y se convierta en su propia masa de tierra rodeada de océano.|Le grand rift marque l'endroit où la plaque tectonique africaine se scinde lentement en deux ; dans des millions d'années, la lanière orientale devrait se détacher entièrement et devenir sa propre masse continentale entourée d'océan.|大地溝帯は、アフリカのプレートがゆっくりと二つに裂けつつある場所を示している。何百万年か先には、東側の細長い部分が完全に切り離され、海に囲まれた独自の陸塊になると見られている。",
  ),
  q(
    2,
    "What is the name of the semi-arid belt of scrubland separating the Sahara Desert from the wetter savannas to the south?|¿Cómo se llama la franja semiárida de matorral que separa el desierto del Sahara de las sabanas más húmedas al sur?|Comment s'appelle la bande semi-aride de broussailles séparant le désert du Sahara des savanes plus humides au sud ?|サハラ砂漠とその南の湿ったサバンナを隔てる、半乾燥の低木地帯は?",
    ["The Sahel|El Sahel|Le Sahel|サヘル", "The Veld|El veld|Le veld|ヴェルト", "The Maghreb|El Magreb|Le Maghreb|マグレブ"],
    0,
    "'Sahel' comes from an Arabic word for 'shore' or 'coast,' picturing the Sahara as a sea and this transitional band of scrubland as its coastline.|'Sahel' viene de una palabra árabe que significa 'orilla' o 'costa', que imagina el Sahara como un mar y esta franja de transición de matorral como su litoral.|« Sahel » vient d'un mot arabe signifiant « rive » ou « côte », qui imagine le Sahara comme une mer et cette bande de transition broussailleuse comme son littoral.|「サヘル」はアラビア語で「岸」「海岸」を意味する語に由来する。サハラを海に、この移行帯の低木地を海岸に見立てた名である。",
  ),
  q(
    3,
    "Which African country was never colonised by a European power, apart from a brief occupation in the 1930s?|¿Qué país africano nunca fue colonizado por una potencia europea, aparte de una breve ocupación en los años treinta?|Quel pays africain n'a jamais été colonisé par une puissance européenne, hormis une brève occupation dans les années 1930 ?|1930年代の短い占領を除けば、ヨーロッパ列強の植民地になったことが一度も無いアフリカの国は?",
    ["Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Ghana|Ghana|Le Ghana|ガーナ", "Senegal|Senegal|Le Sénégal|セネガル"],
    0,
    "Ethiopia defeated an invading Italian army at the Battle of Adwa in 1896 and stayed independent except for a five-year Italian occupation from 1936, making it, along with Liberia, one of only two African countries never formally colonised.|Etiopía derrotó a un ejército italiano invasor en la batalla de Adua en 1896 y siguió siendo independiente salvo por una ocupación italiana de cinco años desde 1936, lo que la convierte, junto con Liberia, en uno de los dos únicos países africanos nunca colonizados formalmente.|L'Éthiopie vainquit une armée italienne envahissante à la bataille d'Adoua en 1896 et resta indépendante hormis une occupation italienne de cinq ans à partir de 1936, ce qui en fait, avec le Liberia, l'un des deux seuls pays africains jamais formellement colonisés.|エチオピアは1896年のアドワの戦いで侵攻してきたイタリア軍を破り、1936年からの5年間のイタリア占領を除いて独立を保った。リベリアと並んで、正式に植民地化されたことのない数少ないアフリカの国の一つである。",
  ),
  q(
    3,
    "Which desert runs along Namibia's Atlantic coast and is considered one of the oldest deserts on Earth?|¿Qué desierto se extiende por la costa atlántica de Namibia y se considera uno de los más antiguos de la Tierra?|Quel désert longe la côte atlantique de la Namibie et est considéré comme l'un des plus anciens de la planète ?|ナミビアの大西洋岸に広がり、地球で最も古い砂漠の一つとされるのは?",
    ["The Kalahari Desert|El desierto del Kalahari|Le désert du Kalahari|カラハリ砂漠", "The Namib Desert|El desierto del Namib|Le désert du Namib|ナミブ砂漠", "The Danakil Desert|El desierto de Danakil|Le désert du Danakil|ダナキル砂漠"],
    1,
    "The Namib is thought to have been arid for at least 55 million years, and its towering red dunes at Sossusvlei, coloured by iron oxide, are among the tallest in the world.|Se cree que el Namib ha sido árido durante al menos 55 millones de años, y sus imponentes dunas rojas de Sossusvlei, coloreadas por óxido de hierro, están entre las más altas del mundo.|On pense que le Namib est aride depuis au moins 55 millions d'années, et ses hautes dunes rouges de Sossusvlei, colorées par l'oxyde de fer, comptent parmi les plus hautes du monde.|ナミブ砂漠は少なくとも5500万年前から乾燥していたと考えられており、酸化鉄で赤く染まったソスフレイの高い砂丘は世界でも屈指の高さを誇る。",
  ),
  q(
    3,
    "Where is the headquarters of the African Union located?|¿Dónde se encuentra la sede de la Unión Africana?|Où se trouve le siège de l'Union africaine ?|アフリカ連合(AU)の本部があるのは?",
    ["Addis Ababa, Ethiopia|Adís Abeba, Etiopía|Addis-Abeba, en Éthiopie|エチオピアのアディスアベバ", "Nairobi, Kenya|Nairobi, Kenia|Nairobi, au Kenya|ケニアのナイロビ", "Cairo, Egypt|El Cairo, Egipto|Le Caire, en Égypte|エジプトのカイロ"],
    0,
    "The African Union, formed in 2002 as successor to the Organisation of African Unity, is headquartered in a 20-storey tower in Addis Ababa that was largely designed, built and paid for by China, completed in 2012.|La Unión Africana, formada en 2002 como sucesora de la Organización para la Unidad Africana, tiene su sede en una torre de 20 plantas en Adís Abeba diseñada, construida y pagada en gran parte por China, terminada en 2012.|L'Union africaine, formée en 2002 en tant que successeur de l'Organisation de l'unité africaine, a son siège dans une tour de 20 étages à Addis-Abeba, en grande partie conçue, construite et financée par la Chine, achevée en 2012.|2002年にアフリカ統一機構の後継として発足したアフリカ連合の本部は、アディスアベバにある20階建てのタワーに置かれている。この建物は主に中国が設計・建設・資金提供し、2012年に完成した。",
  ),
  q(
    3,
    "What is the name of South Africa's currency?|¿Cómo se llama la moneda de Sudáfrica?|Comment s'appelle la monnaie de l'Afrique du Sud ?|南アフリカの通貨の名前は?",
    ["The rand|El rand|Le rand|ランド", "The peso|El peso|Le peso|ペソ", "The franc|El franco|Le franc|フラン"],
    0,
    "The rand, introduced in 1961, is named after the Witwatersrand, the ridge of gold-bearing rock around Johannesburg whose 1886 gold rush built the city and much of South Africa's modern economy.|El rand, introducido en 1961, debe su nombre al Witwatersrand, la cresta de roca aurífera en torno a Johannesburgo cuya fiebre del oro de 1886 construyó la ciudad y buena parte de la economía moderna sudafricana.|Le rand, introduit en 1961, doit son nom au Witwatersrand, la crête de roche aurifère autour de Johannesburg dont la ruée vers l'or de 1886 bâtit la ville et une grande partie de l'économie moderne sud-africaine.|1961年に導入されたランドという名前は、ヨハネスブルグを取り囲む金を含む岩の尾根、ウィットウォーターズランドに由来する。1886年のゴールドラッシュがこの街と南アフリカの近代経済の多くを築いた。",
  ),
  q(
    3,
    "Africa is the ____ most populous continent in the world.|África es el continente ____ más poblado del mundo.|L'Afrique est le ____ continent le plus peuplé du monde.|アフリカは世界で人口が____に多い大陸である。",
    ["second|segundo|deuxième|2番目", "third|tercero|troisième|3番目", "fourth|cuarto|quatrième|4番目"],
    0,
    "With well over 1.4 billion people, Africa overtook the Americas and Europe in total population sometime in the late 20th century and now trails only Asia.|Con más de 1.400 millones de personas, África superó a América y Europa en población total en algún momento de finales del siglo XX y hoy solo queda por detrás de Asia.|Avec bien plus de 1,4 milliard d'habitants, l'Afrique a dépassé les Amériques et l'Europe en population totale vers la fin du XXe siècle et ne se classe plus qu'après l'Asie.|14億人を優に超える人口を持つアフリカは、20世紀後半のある時期に南北アメリカとヨーロッパの人口を追い越し、いまやアジアに次ぐ規模になっている。",
  ),
  q(
    4,
    "What is the actual southernmost point of the African continent, often mistaken for the more famous Cape of Good Hope nearby?|¿Cuál es el verdadero punto más meridional del continente africano, a menudo confundido con el más famoso cabo de Buena Esperanza cercano?|Quel est le véritable point le plus au sud du continent africain, souvent confondu avec le plus célèbre cap de Bonne-Espérance tout proche ?|近くにあるより有名な喜望峰とよく混同される、アフリカ大陸の本当の最南端は?",
    ["Cape Agulhas|El cabo de las Agujas|Le cap des Aiguilles|アガラス岬", "Cape Point|Cape Point|Cape Point|ケープポイント", "Cape Frio|Cabo Frío|Cap Frio|カボ・フリオ"],
    0,
    "Cape Agulhas, about 150km southeast of the Cape of Good Hope, is the official dividing line between the Atlantic and Indian Oceans, even though the Cape of Good Hope gets most of the fame as Africa's 'southern tip.'|El cabo de las Agujas, unos 150 km al sureste del cabo de Buena Esperanza, es la línea divisoria oficial entre los océanos Atlántico e Índico, aunque el cabo de Buena Esperanza se lleva casi toda la fama como 'la punta sur' de África.|Le cap des Aiguilles, à environ 150 km au sud-est du cap de Bonne-Espérance, est la ligne de démarcation officielle entre les océans Atlantique et Indien, même si le cap de Bonne-Espérance récolte l'essentiel de la célébrité en tant que « pointe sud » de l'Afrique.|喜望峰の南東約150kmにあるアガラス岬が、大西洋とインド洋を分ける公式の境界線である。「アフリカの南端」としての名声のほとんどは喜望峰が持っていくが、実際の最南端はこちらである。",
  ),
  q(
    4,
    "The 'Big Five' safari animals traditionally include the lion, leopard, elephant and rhinoceros. Which animal completes the list?|Los animales del 'Big Five' de safari incluyen tradicionalmente al león, el leopardo, el elefante y el rinoceronte. ¿Qué animal completa la lista?|Les animaux du « Big Five » du safari incluent traditionnellement le lion, le léopard, l'éléphant et le rhinocéros. Quel animal complète la liste ?|サファリの「ビッグファイブ」にはライオン・ヒョウ・ゾウ・サイが含まれる。残りの一つは?",
    ["The cheetah|El guepardo|Le guépard|チーター", "The Cape buffalo|El búfalo del Cabo|Le buffle du Cap|ケープバッファロー", "The giraffe|La jirafa|La girafe|キリン"],
    1,
    "The term 'Big Five' was coined by big-game hunters, not photographers, to name the five African animals considered most dangerous to hunt on foot; the cheetah and giraffe, despite being popular safari sightings, were never part of the original list.|El término 'Big Five' lo acuñaron cazadores de caza mayor, no fotógrafos, para nombrar a los cinco animales africanos considerados más peligrosos de cazar a pie; el guepardo y la jirafa, pese a ser avistamientos populares de safari, nunca formaron parte de la lista original.|L'expression « Big Five » fut inventée par des chasseurs de gros gibier, non par des photographes, pour désigner les cinq animaux africains jugés les plus dangereux à chasser à pied ; le guépard et la girafe, bien que très recherchés en safari, n'ont jamais fait partie de la liste d'origine.|「ビッグファイブ」という言葉は写真家ではなく大物猟師が作った言葉で、徒歩での狩猟で最も危険とされた5種を指す。チーターやキリンはサファリで人気があるが、もともとのリストには入っていない。",
  ),
  q(
    4,
    "Roughly how many wildebeest take part in the annual Great Migration between Tanzania's Serengeti and Kenya's Maasai Mara?|¿Aproximadamente cuántos ñus participan en la Gran Migración anual entre el Serengeti de Tanzania y el Masái Mara de Kenia?|Environ combien de gnous participent à la Grande Migration annuelle entre le Serengeti tanzanien et le Maasai Mara kényan?|タンザニアのセレンゲティとケニアのマサイマラを結ぶ毎年恒例の「グレート・マイグレーション」に参加するヌーの数はおよそどれくらいか?",
    ["About 200,000|Unos 200.000|Environ 200 000|およそ20万頭", "About 1.5 million|Unos 1,5 millones|Environ 1,5 million|およそ150万頭", "About 6 million|Unos 6 millones|Environ 6 millions|およそ600万頭"],
    1,
    "Around 1.5 million wildebeest, along with hundreds of thousands of zebra and gazelle, follow the rains in a roughly circular route each year, crossing crocodile-filled rivers along the way.|Alrededor de 1,5 millones de ñus, junto con cientos de miles de cebras y gacelas, siguen las lluvias en una ruta más o menos circular cada año, cruzando ríos llenos de cocodrilos en el camino.|Environ 1,5 million de gnous, accompagnés de centaines de milliers de zèbres et de gazelles, suivent les pluies chaque année selon un itinéraire à peu près circulaire, traversant au passage des rivières infestées de crocodiles.|およそ150万頭のヌーが、数十万頭のシマウマやガゼルとともに、毎年ほぼ環状のルートで雨を追いかけて移動する。途中、ワニのひしめく川も渡る。",
  ),
  q(
    4,
    "Swahili, widely spoken as a second language across East Africa, is an official language of which of these countries alongside English?|El suajili, muy hablado como segunda lengua en toda África Oriental, ¿en cuál de estos países es lengua oficial junto al inglés?|Le swahili, largement parlé comme seconde langue dans toute l'Afrique de l'Est, est langue officielle de quel pays suivant, aux côtés de l'anglais ?|東アフリカ全域で第二言語として広く話されるスワヒリ語が、英語と並んで公用語となっている国は?",
    ["Kenya|Kenia|Le Kenya|ケニア", "Egypt|Egipto|L'Égypte|エジプト", "Ghana|Ghana|Le Ghana|ガーナ"],
    0,
    "Swahili is Bantu at its core but has absorbed a large amount of Arabic vocabulary from centuries of Indian Ocean trade; Tanzania in particular promoted it after independence as a unifying national language that belongs to no single ethnic group as a mother tongue.|El suajili es bantú en su núcleo, pero ha absorbido mucho vocabulario árabe por siglos de comercio en el océano Índico; Tanzania en particular lo promovió tras la independencia como lengua nacional unificadora que no pertenece como lengua materna a ningún grupo étnico concreto.|Le swahili est bantou dans son fond, mais a absorbé un vocabulaire arabe considérable au fil des siècles de commerce dans l'océan Indien ; la Tanzanie en particulier l'a promu après l'indépendance comme langue nationale unificatrice n'appartenant, en tant que langue maternelle, à aucun groupe ethnique en particulier.|スワヒリ語は根はバントゥー系だが、何世紀ものインド洋交易を通じて多くのアラビア語の語彙を取り込んでいる。とりわけタンザニアは独立後、特定の民族の母語ではない統一国語としてこの言語を推進した。",
  ),
  q(
    5,
    "The 1884–85 conference at which European powers agreed on rules for dividing up Africa among themselves, without any African representatives present, was held in which city?|La conferencia de 1884-85 en la que las potencias europeas acordaron las reglas para repartirse África entre ellas, sin ningún representante africano presente, ¿en qué ciudad se celebró?|La conférence de 1884-1885, où les puissances européennes s'accordèrent sur les règles du partage de l'Afrique entre elles, sans qu'aucun représentant africain soit présent, s'est tenue dans quelle ville ?|ヨーロッパ列強がアフリカ分割の取り決めを行った1884〜85年の会議は、アフリカ側の代表者を一人も交えないまま、どの都市で開かれたか?",
    ["Berlin|Berlín|Berlin|ベルリン", "Brussels|Bruselas|Bruxelles|ブリュッセル", "Paris|París|Paris|パリ"],
    0,
    "The 'Scramble for Africa' that followed the Berlin Conference carved colonial borders often straight across existing ethnic and linguistic groups, boundaries that most African countries inherited unchanged at independence.|El 'reparto de África' que siguió a la Conferencia de Berlín trazó fronteras coloniales que a menudo cruzaban de lleno grupos étnicos y lingüísticos existentes, fronteras que la mayoría de los países africanos heredaron sin cambios al independizarse.|La « ruée vers l'Afrique » qui suivit la conférence de Berlin traça des frontières coloniales qui coupaient souvent en plein milieu des groupes ethniques et linguistiques existants, des frontières que la plupart des pays africains ont héritées inchangées à l'indépendance.|ベルリン会議のあとに起きた「アフリカ分割」は、既存の民族・言語集団をしばしば真っ二つに切り裂く形で植民地の国境線を引いた。その多くは独立後もそのまま引き継がれている。",
  ),
  q(
    5,
    "1960 is sometimes called the 'Year of Africa' because how many African countries gained independence that year?|A 1960 a veces se le llama el 'Año de África' porque ¿cuántos países africanos lograron la independencia ese año?|1960 est parfois surnommée « l'Année de l'Afrique » car combien de pays africains ont accédé à l'indépendance cette année-là ?|1960年は「アフリカの年」と呼ばれることがあるが、その年に独立した国はいくつあったか?",
    ["5|5|5|5か国", "17|17|17|17か国", "30|30|30|30か国"],
    1,
    "Seventeen countries became independent in 1960 alone, most of them former French colonies in West and Equatorial Africa, a pace that transformed the world map within a single year.|Diecisiete países se independizaron solo en 1960, la mayoría antiguas colonias francesas de África Occidental y Ecuatorial, un ritmo que transformó el mapa mundial en un solo año.|Dix-sept pays devinrent indépendants rien qu'en 1960, la plupart d'anciennes colonies françaises d'Afrique de l'Ouest et équatoriale, un rythme qui transforma la carte du monde en une seule année.|1960年だけで17か国が独立した。その多くは西・赤道アフリカにあった旧フランス植民地で、この年一年で世界地図の姿が大きく塗り変わった。",
  ),
  q(
    4,
    "How many years did Nelson Mandela spend in prison before his release in 1990?|¿Cuántos años pasó Nelson Mandela en prisión antes de su liberación en 1990?|Combien d'années Nelson Mandela a-t-il passées en prison avant sa libération en 1990 ?|ネルソン・マンデラは1990年に釈放されるまで、何年間投獄されていたか?",
    ["10 years|10 años|10 ans|10年間", "18 years|18 años|18 ans|18年間", "27 years|27 años|27 ans|27年間"],
    2,
    "Mandela served 27 years, most of them on Robben Island off Cape Town, before his release in February 1990 and South Africa's first fully democratic election four years later, which he won.|Mandela cumplió 27 años, la mayoría en la isla Robben, frente a Ciudad del Cabo, antes de su liberación en febrero de 1990 y de las primeras elecciones plenamente democráticas de Sudáfrica cuatro años después, que él ganó.|Mandela purgea 27 ans, pour l'essentiel sur l'île de Robben au large du Cap, avant sa libération en février 1990 et la première élection pleinement démocratique d'Afrique du Sud quatre ans plus tard, qu'il remporta.|マンデラは27年間、その大半をケープタウン沖のロベン島で過ごしたのち、1990年2月に釈放された。その4年後、南アフリカ初の完全な民主選挙が行われ、彼はそこで勝利した。",
  ),
  q(
    5,
    "In which year did South Africa hold its first fully democratic, multiracial election, won by the ANC's Nelson Mandela?|¿En qué año celebró Sudáfrica sus primeras elecciones plenamente democráticas y multirraciales, ganadas por Nelson Mandela del CNA?|En quelle année l'Afrique du Sud a-t-elle tenu sa première élection pleinement démocratique et multiraciale, remportée par Nelson Mandela de l'ANC ?|南アフリカで、ANCのネルソン・マンデラが勝利した初の完全な民主的・多人種選挙が行われたのは何年か?",
    ["1990|1990|1990|1990年", "1994|1994|1994|1994年", "1999|1999|1999|1999年"],
    1,
    "The April 1994 election, in which Black South Africans could vote for the first time, drew queues that stretched for kilometres and days, formally ending decades of apartheid rule.|Las elecciones de abril de 1994, en las que los sudafricanos negros pudieron votar por primera vez, generaron colas que se extendían por kilómetros y días, poniendo fin formalmente a décadas de gobierno del apartheid.|L'élection d'avril 1994, où les Sud-Africains noirs purent voter pour la première fois, provoqua des files d'attente s'étirant sur des kilomètres et des jours entiers, mettant formellement fin à des décennies de régime d'apartheid.|1994年4月の選挙では、黒人の南アフリカ人が初めて投票できるようになり、数キロにも数日にも及ぶ行列ができた。これにより数十年続いたアパルトヘイト体制が正式に終わった。",
  ),
  q(
    5,
    "By the combined measure of width and height, creating the largest sheet of falling water on Earth, which African waterfall is often cited as the largest of its kind in the world?|Por la combinación de anchura y altura, que crea la mayor cortina de agua que cae en el mundo, ¿qué catarata africana suele citarse como la mayor de su tipo en el mundo?|Selon la combinaison de la largeur et de la hauteur, créant le plus grand rideau d'eau tombante au monde, quelle chute d'eau africaine est souvent citée comme la plus grande de son genre au monde ?|幅と高さを組み合わせた指標で見ると地球上最大の「落下する水の幕」を作るとされる、世界最大級とよく言われるアフリカの滝は?",
    ["Victoria Falls|Las cataratas Victoria|Les chutes Victoria|ヴィクトリアフォールズ", "Angel Falls|El Salto Ángel|Les chutes Angel|エンジェルフォール", "Niagara Falls|Las cataratas del Niágara|Les chutes du Niagara|ナイアガラの滝"],
    0,
    "Victoria Falls is neither the tallest (Angel Falls in Venezuela) nor the widest single waterfall on Earth, but at over 100m tall and nearly 1.7km wide, the sheet of falling water it creates is the largest of its kind on the planet.|Las cataratas Victoria no son ni las más altas (el Salto Ángel, en Venezuela) ni la catarata individual más ancha del mundo, pero con más de 100 m de altura y casi 1,7 km de ancho, la cortina de agua que crean es la mayor de su tipo del planeta.|Les chutes Victoria ne sont ni les plus hautes (les chutes Angel, au Venezuela) ni la plus large chute unique au monde, mais avec plus de 100 m de hauteur et près de 1,7 km de large, le rideau d'eau qu'elles créent est le plus grand de son genre sur la planète.|ヴィクトリアフォールズは、最も高い滝(ベネズエラのエンジェルフォール)でも、幅が最大の単独の滝でもないが、高さ100m超・幅1.7km近くという規模から、それが作る「落下する水の幕」としては地球上最大とされる。",
  ),
  q(
    4,
    "Which Nigerian musician pioneered the genre known as Afrobeat in the 1970s, blending jazz, funk and Yoruba rhythms with sharp political lyrics?|¿Qué músico nigeriano fue pionero del género conocido como afrobeat en los años setenta, mezclando jazz, funk y ritmos yoruba con letras políticas incisivas?|Quel musicien nigérian fut le pionnier du genre connu sous le nom d'afrobeat dans les années 1970, mêlant jazz, funk et rythmes yoruba à des paroles politiques incisives ?|1970年代、ジャズ・ファンクとヨルバの律動を鋭い政治的な歌詞と融合させて「アフロビート」というジャンルを切り開いたナイジェリアの音楽家は?",
    ["Fela Kuti|Fela Kuti|Fela Kuti|フェラ・クティ", "Youssou N'Dour|Youssou N'Dour|Youssou N'Dour|ユッスー・ンドゥール", "Toto Cutugno|Toto Cutugno|Toto Cutugno|トト・クトゥーニョ"],
    0,
    "Fela Kuti turned his Lagos compound, which he declared an independent 'republic,' into a base for both his music and open defiance of Nigeria's military governments, who raided it repeatedly and once threw his mother from a window during an assault that contributed to her death.|Fela Kuti convirtió su recinto en Lagos, que declaró una 'república' independiente, en base tanto de su música como de su desafío abierto a los gobiernos militares de Nigeria, que lo asaltaron repetidamente y en un ataque llegaron a arrojar a su madre por una ventana, contribuyendo a su muerte.|Fela Kuti transforma son enclos de Lagos, qu'il déclara « république » indépendante, en base à la fois pour sa musique et pour son défi ouvert aux gouvernements militaires nigérians, qui le prirent d'assaut à plusieurs reprises et, lors d'un raid, jetèrent sa mère par une fenêtre, contribuant à sa mort.|フェラ・クティはラゴスの自宅一帯を独立「共和国」と宣言し、音楽の拠点であると同時にナイジェリアの軍事政権への公然たる抵抗の拠点にした。政権側は繰り返し襲撃を行い、ある襲撃では母親を窓から投げ落とし、それが一因となって彼女は亡くなった。",
  ),
  q(
    4,
    "Which South African singer's 1967 hit 'Pata Pata' helped bring African pop music to international audiences, despite her being exiled from her own country for decades over her anti-apartheid activism?|La canción de 1967 'Pata Pata', de qué cantante sudafricana ayudó a llevar la música pop africana a públicos internacionales, pese a que ella misma estuvo exiliada de su país durante décadas por su activismo contra el apartheid?|La chanson de 1967 « Pata Pata », de quelle chanteuse sud-africaine, contribua à faire connaître la pop africaine à un public international, bien qu'elle-même ait été exilée de son pays pendant des décennies pour son militantisme anti-apartheid ?|1967年のヒット曲「パタ・パタ」でアフリカのポップスを世界に広めた、反アパルトヘイト活動のために何十年も母国から追放されていた南アフリカの歌手は?",
    ["Miriam Makeba|Miriam Makeba|Miriam Makeba|ミリアム・マケバ", "Angelique Kidjo|Angelique Kidjo|Angélique Kidjo|アンジェリーク・キジョー", "Cesaria Evora|Cesaria Evora|Cesária Évora|セザリア・エヴォラ"],
    0,
    "Nicknamed 'Mama Africa,' Makeba had her South African passport revoked after testifying about apartheid before the United Nations in 1963 and could not return home for 30 years, until Nelson Mandela personally invited her back after his release.|Apodada 'Mamá África', a Makeba le revocaron el pasaporte sudafricano tras testificar sobre el apartheid ante la ONU en 1963 y no pudo volver a casa durante 30 años, hasta que Nelson Mandela la invitó personalmente a regresar tras su liberación.|Surnommée « Mama Africa », Makeba se vit retirer son passeport sud-africain après avoir témoigné sur l'apartheid devant l'ONU en 1963 et ne put rentrer chez elle pendant 30 ans, jusqu'à ce que Nelson Mandela l'invite personnellement à revenir après sa libération.|「ママ・アフリカ」と呼ばれたマケバは、1963年に国連でアパルトヘイトについて証言したことで南アフリカのパスポートを剥奪され、30年間帰国できなかった。釈放後のネルソン・マンデラが自ら彼女を呼び戻すまで、その状態は続いた。",
  ),
  q(
    5,
    "The stone ruins of Great Zimbabwe, the largest ancient stone structure in sub-Saharan Africa, gave their name to which modern country?|Las ruinas de piedra del Gran Zimbabue, la mayor estructura de piedra antigua del África subsahariana, dieron nombre a ¿qué país moderno?|Les ruines de pierre du Grand Zimbabwe, la plus vaste structure de pierre ancienne d'Afrique subsaharienne, ont donné leur nom à quel pays moderne ?|サハラ以南アフリカ最大の古代石造建築、グレート・ジンバブエの遺跡が名を与えた現代の国は?",
    ["Zambia|Zambia|La Zambie|ザンビア", "Zimbabwe|Zimbabue|Le Zimbabwe|ジンバブエ", "Malawi|Malaui|Le Malawi|マラウイ"],
    1,
    "Built without any mortar between the 11th and 15th centuries, the walls of Great Zimbabwe stand as evidence of a powerful trading kingdom; the name means roughly 'stone houses' in the Shona language, and the country adopted it at independence in 1980 to replace the colonial name Rhodesia.|Construidas sin ningún mortero entre los siglos XI y XV, las murallas del Gran Zimbabue son prueba de un poderoso reino comercial; el nombre significa aproximadamente 'casas de piedra' en shona, y el país lo adoptó al independizarse en 1980 para reemplazar el nombre colonial de Rodesia.|Bâties sans le moindre mortier entre les XIe et XVe siècles, les murailles du Grand Zimbabwe témoignent d'un puissant royaume marchand ; le nom signifie à peu près « maisons de pierre » en shona, et le pays l'adopta à son indépendance en 1980 pour remplacer le nom colonial de Rhodésie.|11世紀から15世紀にかけて、モルタルを一切使わずに積み上げられたグレート・ジンバブエの城壁は、有力な交易王国の存在を物語る。この名はショナ語でおおよそ「石の家々」を意味し、1980年の独立時に植民地時代の国名ローデシアに代えて採用された。",
  ),
  q(
    5,
    "The 14th-century ruler Mansa Musa, often cited as one of the wealthiest individuals in recorded history, ruled which West African empire?|El gobernante del siglo XIV Mansa Musa, citado a menudo como una de las personas más ricas de la historia registrada, ¿qué imperio de África Occidental gobernó?|Le souverain du XIVe siècle Mansa Moussa, souvent cité comme l'une des personnes les plus riches de l'histoire connue, régnait sur quel empire d'Afrique de l'Ouest ?|14世紀の統治者マンサ・ムーサは、記録に残る中でも屈指の富豪とされることが多いが、西アフリカのどの帝国を治めていたか?",
    ["The Mali Empire|El Imperio de Malí|L'Empire du Mali|マリ帝国", "The Songhai Empire|El Imperio songhai|L'Empire songhaï|ソンガイ帝国", "The Ashanti Empire|El Imperio asante|L'Empire ashanti|アシャンティ帝国"],
    0,
    "Mansa Musa's 1324 pilgrimage to Mecca reportedly involved so much gold, given away and spent along the way, that it depressed gold prices in Cairo for years afterward.|Se dice que la peregrinación de Mansa Musa a La Meca en 1324 implicó tanto oro, regalado y gastado por el camino, que deprimió los precios del oro en El Cairo durante años.|Le pèlerinage de Mansa Moussa à La Mecque en 1324 aurait impliqué tant d'or, distribué et dépensé en chemin, qu'il fit chuter le prix de l'or au Caire pendant des années par la suite.|1324年にマンサ・ムーサが行ったメッカ巡礼では、道中で気前よく配り使った金があまりに大量だったため、その後何年もカイロの金相場を押し下げたと伝えられる。",
  ),
  q(
    4,
    "The city of Timbuktu, famed as a centre of Islamic scholarship with a vast collection of medieval manuscripts, is located in which modern country?|La ciudad de Tombuctú, famosa como centro de erudición islámica con una vasta colección de manuscritos medievales, ¿en qué país moderno se encuentra?|La ville de Tombouctou, réputée comme centre du savoir islamique et abritant une vaste collection de manuscrits médiévaux, se trouve dans quel pays moderne ?|中世の写本の膨大な蔵書で知られるイスラム学問の中心地、ティンブクトゥがあるのは現代のどの国か?",
    ["Mali|Malí|Le Mali|マリ", "Niger|Níger|Le Niger|ニジェール", "Chad|Chad|Le Tchad|チャド"],
    0,
    "From the 14th century Timbuktu grew into a hub of Quranic learning where scholars produced and copied hundreds of thousands of manuscripts on subjects from astronomy to law, tens of thousands of which survive in libraries and private family collections today.|Desde el siglo XIV, Tombuctú creció hasta convertirse en un centro de estudios coránicos donde los eruditos produjeron y copiaron cientos de miles de manuscritos sobre temas que iban de la astronomía al derecho, decenas de miles de los cuales sobreviven hoy en bibliotecas y colecciones familiares privadas.|Dès le XIVe siècle, Tombouctou devint un centre d'études coraniques où des lettrés produisirent et copièrent des centaines de milliers de manuscrits sur des sujets allant de l'astronomie au droit, dont des dizaines de milliers subsistent aujourd'hui dans des bibliothèques et des collections familiales privées.|14世紀以降、ティンブクトゥはコーラン学問の一大拠点となり、学者たちは天文学から法学まで幅広い主題の写本を何十万点も作成・書写した。そのうち数万点はいまも図書館や個人の家族の蔵書として現存している。",
  ),
  q(
    5,
    "In what year did the Suez Canal open, connecting the Mediterranean and Red Seas?|¿En qué año se inauguró el canal de Suez, que conecta el Mediterráneo y el mar Rojo?|En quelle année le canal de Suez, reliant la Méditerranée et la mer Rouge, a-t-il ouvert ?|地中海と紅海を結ぶスエズ運河が開通したのは何年か?",
    ["1859|1859|1859|1859年", "1869|1869|1869|1869年", "1889|1889|1889|1889年"],
    1,
    "The canal, built largely with forced Egyptian labour under French engineering direction, opened in 1869; the debts Egypt ran up paying for it later helped give Britain a pretext to occupy the country in 1882.|El canal, construido en gran parte con trabajo forzado egipcio bajo dirección técnica francesa, se inauguró en 1869; las deudas que Egipto contrajo para pagarlo más tarde dieron a Gran Bretaña un pretexto para ocupar el país en 1882.|Le canal, construit en grande partie avec du travail forcé égyptien sous la direction technique française, ouvrit en 1869 ; les dettes contractées par l'Égypte pour le financer donnèrent plus tard à la Grande-Bretagne un prétexte pour occuper le pays en 1882.|フランス人技師の指揮のもと、多くはエジプト人の強制労働によって建設されたこの運河は1869年に開通した。その建設費用でエジプトが抱えた借金は、のちに1882年のイギリスによる占領の口実の一つになった。",
  ),
  q(
    4,
    "Which currency, pegged to the euro and guaranteed by the French treasury, is still used today by 14 African countries, mostly former French colonies?|¿Qué moneda, vinculada al euro y garantizada por el Tesoro francés, siguen usando hoy 14 países africanos, la mayoría antiguas colonias francesas?|Quelle monnaie, arrimée à l'euro et garantie par le Trésor français, est encore utilisée aujourd'hui par 14 pays africains, pour la plupart d'anciennes colonies françaises ?|ユーロに固定され、フランス財務省が保証する通貨で、いまも14のアフリカの国(多くは旧フランス植民地)で使われているのは?",
    ["The CFA franc|El franco CFA|Le franc CFA|CFAフラン", "The rand|El rand|Le rand|ランド", "The birr|El birr|Le birr|ブル"],
    0,
    "The CFA franc, created in two versions (West and Central African) in 1945, is a lingering colonial-era monetary arrangement that remains controversial, with critics arguing it limits the monetary independence of the countries that use it.|El franco CFA, creado en dos versiones (de África Occidental y Central) en 1945, es un arreglo monetario de la época colonial que persiste y sigue siendo polémico, y sus críticos sostienen que limita la independencia monetaria de los países que lo usan.|Le franc CFA, créé en deux versions (Afrique de l'Ouest et Afrique centrale) en 1945, est un arrangement monétaire hérité de l'époque coloniale qui perdure et reste controversé, ses détracteurs estimant qu'il limite l'indépendance monétaire des pays qui l'utilisent.|1945年に西アフリカ版と中部アフリカ版の2種類として作られたCFAフランは、いまも続く植民地時代の通貨の仕組みで、いまだに論争の的である。批判する側は、これを使う国々の金融面での自立を制約していると主張する。",
  ),
  q(
    4,
    "By volume of films produced per year, Nigeria's film industry, nicknamed 'Nollywood,' is often ranked among the world's largest, alongside Hollywood and which other industry?|Por volumen de películas producidas al año, la industria cinematográfica de Nigeria, apodada 'Nollywood', suele situarse entre las más grandes del mundo, junto a Hollywood y ¿cuál otra?|En volume de films produits par an, l'industrie cinématographique du Nigeria, surnommée « Nollywood », est souvent classée parmi les plus importantes au monde, aux côtés d'Hollywood et de laquelle autre ?|年間製作本数で見ると、「ノリウッド」と呼ばれるナイジェリアの映画産業は、ハリウッドと、もう一つどこと並んで世界最大級とされることが多いか?",
    ["Bollywood (India)|Bollywood (India)|Bollywood (Inde)|ボリウッド(インド)", "Cinecittà (Italy)|Cinecittà (Italia)|Cinecittà (Italie)|チネチッタ(イタリア)", "Shaw Brothers Studio (Hong Kong)|Shaw Brothers Studio (Hong Kong)|Shaw Brothers Studio (Hong Kong)|ショウ・ブラザーズ(香港)"],
    0,
    "Nollywood films are typically made on tiny budgets and tight schedules, often shot in under two weeks, and are distributed directly to video and streaming rather than through cinemas, which let the industry grow explosively without the infrastructure of a Hollywood.|Las películas de Nollywood suelen hacerse con presupuestos ínfimos y calendarios ajustados, a menudo rodadas en menos de dos semanas, y se distribuyen directamente en vídeo y streaming en vez de por cines, lo que permitió a la industria crecer de forma explosiva sin la infraestructura de un Hollywood.|Les films de Nollywood sont généralement tournés avec des budgets minuscules et des délais serrés, souvent en moins de deux semaines, et distribués directement en vidéo et en streaming plutôt qu'en salles, ce qui a permis à l'industrie de croître de façon explosive sans l'infrastructure d'un Hollywood.|ノリウッド映画はたいてい極めて少ない予算と短い日程(しばしば2週間足らず)で撮られ、映画館ではなく直接ビデオや配信で流通する。この仕組みのおかげで、ハリウッドのような設備が無くても産業は爆発的に成長した。",
  ),
  q(
    5,
    "In 2021 the IUCN formally recognised how many distinct species of African elephant, having previously often treated them as one?|En 2021, la UICN reconoció formalmente ¿cuántas especies distintas de elefante africano, que antes a menudo se trataban como una sola?|En 2021, l'UICN a formellement reconnu combien d'espèces distinctes d'éléphant d'Afrique, auparavant souvent traitées comme une seule ?|2021年にIUCNが正式に認定した、それまで一種として扱われることが多かったアフリカゾウの種数は?",
    ["2|2|2|2種", "3|3|3|3種", "4|4|4|4種"],
    0,
    "The savanna elephant and the smaller forest elephant, found in Central African rainforest, are now classed as separate species; the forest elephant was assessed as critically endangered, having lost an estimated 86% of its population over three decades.|El elefante de sabana y el elefante de bosque, más pequeño y propio de la selva de África Central, ahora se clasifican como especies distintas; el elefante de bosque fue evaluado como en peligro crítico, tras perder un 86% estimado de su población en tres décadas.|L'éléphant de savane et le plus petit éléphant de forêt, présent dans la forêt tropicale d'Afrique centrale, sont désormais classés comme des espèces distinctes ; l'éléphant de forêt a été évalué comme en danger critique d'extinction, ayant perdu environ 86 % de sa population en trois décennies.|サバンナゾウと、中央アフリカの熱帯雨林にすむより小型のマルミミゾウが、いまでは別種として分類されている。マルミミゾウは絶滅寸前種と評価され、この30年で個体数の推定86%を失った。",
  ),
  q(
    5,
    "The okapi, a forest-dwelling relative of the giraffe with zebra-like stripes on its legs, is native to which country?|El okapi, un pariente de la jirafa que habita en el bosque y tiene rayas como de cebra en las patas, ¿de qué país es originario?|L'okapi, parent forestier de la girafe aux rayures zébrées sur les pattes, est originaire de quel pays ?|脚にシマウマのような縞模様を持つ、キリンの森林性の近縁種オカピの原産国は?",
    ["DR Congo|La RD Congo|La RD Congo|コンゴ民主共和国", "Kenya|Kenia|Le Kenya|ケニア", "Madagascar|Madagascar|Madagascar|マダガスカル"],
    0,
    "The okapi was not scientifically described until 1901, making it one of the last large mammals discovered by Western science; it lives only in the dense Ituri rainforest and is so elusive that few Congolese outside that region had ever seen one before its discovery.|El okapi no se describió científicamente hasta 1901, lo que lo convierte en uno de los últimos grandes mamíferos descubiertos por la ciencia occidental; vive solo en la densa selva de Ituri y es tan esquivo que pocos congoleños fuera de esa región lo habían visto antes de su descubrimiento.|L'okapi ne fut décrit scientifiquement qu'en 1901, ce qui en fait l'un des derniers grands mammifères découverts par la science occidentale ; il ne vit que dans l'épaisse forêt tropicale de l'Ituri et est si insaisissable que peu de Congolais hors de cette région en avaient vu un avant sa découverte.|オカピが科学的に記載されたのは1901年になってからで、西洋科学が発見した大型哺乳類としては最後期の一つである。生息地は密林のイトゥリ熱帯雨林に限られ、あまりに人目につきにくいため、発見以前はその地域以外のコンゴの人々でも見たことがある者はほとんどいなかった。",
  ),
  q(
    4,
    "Lemurs, a group of primates found nowhere else in the wild, are native only to which island?|Los lémures, un grupo de primates que no se encuentra en estado salvaje en ningún otro lugar, ¿de qué isla son originarios exclusivamente?|Les lémuriens, un groupe de primates qu'on ne trouve nulle part ailleurs à l'état sauvage, sont originaires exclusivement de quelle île ?|野生では他のどこにも見られない霊長類の一群、キツネザルが唯一生息する島は?",
    ["Madagascar|Madagascar|Madagascar|マダガスカル島", "Zanzibar|Zanzíbar|Zanzibar|ザンジバル島", "Socotra|Socotra|Socotra|ソコトラ島"],
    0,
    "Madagascar split from mainland Africa around 160 million years ago and from India around 90 million years ago, letting lemurs evolve in isolation into more than 100 species found nowhere else on Earth.|Madagascar se separó del continente africano hace unos 160 millones de años y de la India hace unos 90 millones de años, lo que permitió a los lémures evolucionar en aislamiento hasta más de 100 especies que no existen en ningún otro lugar de la Tierra.|Madagascar s'est détachée du continent africain il y a environ 160 millions d'années et de l'Inde il y a environ 90 millions d'années, laissant les lémuriens évoluer isolément en plus de 100 espèces qu'on ne trouve nulle part ailleurs sur Terre.|マダガスカル島はおよそ1億6000万年前にアフリカ大陸から、およそ9000万年前にはインドから分離した。この孤立のおかげでキツネザルは独自に進化し、地球上のほかのどこにもいない100種以上に分かれていった。",
  ),
  q(
    6,
    "Which African country recognises the most official languages in its constitution?|¿Qué país africano reconoce la mayor cantidad de lenguas oficiales en su constitución?|Quel pays africain reconnaît le plus de langues officielles dans sa constitution ?|憲法で最も多くの公用語を定めているアフリカの国は?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Nigeria|Nigeria|Le Nigeria|ナイジェリア", "DR Congo|La RD Congo|La RD Congo|コンゴ民主共和国"],
    0,
    "South Africa's 1996 constitution recognises 11 official languages, including Afrikaans, English and nine Bantu languages such as Zulu and Xhosa, an attempt to formally value languages that apartheid-era policy had ranked far below Afrikaans and English.|La constitución sudafricana de 1996 reconoce 11 lenguas oficiales, incluidos el afrikáans, el inglés y nueve lenguas bantúes como el zulú y el xhosa, un intento de valorar formalmente lenguas que la política de la era del apartheid había situado muy por debajo del afrikáans y el inglés.|La Constitution sud-africaine de 1996 reconnaît 11 langues officielles, dont l'afrikaans, l'anglais et neuf langues bantoues comme le zoulou et le xhosa, une tentative de valoriser formellement des langues que la politique de l'ère de l'apartheid classait bien en dessous de l'afrikaans et de l'anglais.|1996年制定の南アフリカ憲法は、アフリカーンス語・英語とズールー語やコーサ語など9つのバントゥー諸語を含む11の公用語を認めている。これは、アパルトヘイト時代の政策がアフリカーンス語と英語よりはるかに低く扱っていた言語を、正式に位置づけ直そうとする試みだった。",
  ),
  q(
    6,
    "In 2019–2020, East Africa experienced its worst outbreak in decades of which insect, whose swarms can cover hundreds of square kilometres and strip fields of crops?|En 2019-2020, África Oriental sufrió su peor brote en décadas de ¿qué insecto, cuyos enjambres pueden cubrir cientos de kilómetros cuadrados y arrasar los cultivos?|En 2019-2020, l'Afrique de l'Est a connu sa pire invasion depuis des décennies de quel insecte, dont les essaims peuvent couvrir des centaines de kilomètres carrés et dévaster les cultures ?|2019〜2020年、東アフリカは数十年で最悪の大発生に見舞われたが、その群れが数百平方キロメートルを覆い畑を食い尽くすこともある昆虫は?",
    ["The desert locust|La langosta del desierto|Le criquet pèlerin|サバクトビバッタ", "The army worm|El gusano cogollero|La légionnaire d'automne|ヨトウムシ", "The tsetse fly|La mosca tsetsé|La mouche tsé-tsé|ツェツェバエ"],
    0,
    "A single large swarm can contain tens of billions of locusts and eat as much food in a day as tens of thousands of people, and the 2019–2020 outbreak, the worst in Kenya in 70 years, was linked by scientists to unusually heavy cyclone rains that created ideal breeding conditions.|Un solo enjambre grande puede contener decenas de miles de millones de langostas y comer en un día tanto alimento como decenas de miles de personas, y el brote de 2019-2020, el peor en Kenia en 70 años, los científicos lo relacionaron con lluvias ciclónicas inusualmente intensas que crearon condiciones de cría ideales.|Un seul grand essaim peut compter des dizaines de milliards de criquets et consommer en une journée autant de nourriture que des dizaines de milliers de personnes, et l'invasion de 2019-2020, la pire au Kenya depuis 70 ans, fut associée par les scientifiques à des pluies cycloniques inhabituellement abondantes ayant créé des conditions de reproduction idéales.|一つの大きな群れには数百億匹のバッタが含まれることもあり、一日で数万人分に相当する食料を食い尽くす。ケニアでは70年ぶりの規模となった2019〜2020年の大発生は、繁殖に理想的な条件を生んだ異例の豪雨(サイクロンによる)と科学者たちによって関連づけられている。",
  ),
  q(
    6,
    "Botswana's economy has been transformed since independence by the discovery and mining of which resource, making it one of Africa's wealthiest countries per capita?|La economía de Botsuana se transformó tras la independencia gracias al descubrimiento y la explotación de ¿qué recurso, que la convirtió en uno de los países más ricos de África per cápita?|L'économie du Botswana a été transformée depuis l'indépendance par la découverte et l'exploitation de quelle ressource, en faisant l'un des pays les plus riches d'Afrique par habitant ?|独立後、ある資源の発見と採掘によって経済が一変し、一人当たりで見ればアフリカ屈指の豊かな国になったボツワナ、その資源とは?",
    ["Diamonds|Diamantes|Les diamants|ダイヤモンド", "Oil|Petróleo|Le pétrole|石油", "Gold|Oro|L'or|金"],
    0,
    "Diamonds were discovered in 1967, a year after independence, and Botswana became one of the few resource-rich African countries to largely avoid the 'resource curse,' thanks partly to a revenue-sharing arrangement with the mining company De Beers negotiated early and renegotiated in the country's favour over time.|Los diamantes se descubrieron en 1967, un año después de la independencia, y Botsuana se convirtió en uno de los pocos países africanos ricos en recursos que en gran medida evitó la 'maldición de los recursos', gracias en parte a un acuerdo de reparto de ingresos con la minera De Beers negociado pronto y renegociado con el tiempo a favor del país.|Les diamants furent découverts en 1967, un an après l'indépendance, et le Botswana devint l'un des rares pays africains riches en ressources à largement échapper à la « malédiction des ressources », en partie grâce à un accord de partage des revenus avec la société minière De Beers négocié tôt et renégocié au fil du temps en faveur du pays.|独立の翌年にあたる1967年にダイヤモンドが発見され、ボツワナは資源に恵まれたアフリカの国の中でも珍しく「資源の呪い」を大きく免れた国になった。これは、鉱山会社デビアスとの収益分配の取り決めを早い段階で結び、その後も自国に有利な形で改定し続けたことも一因である。",
  ),
  q(
    6,
    "Niger is one of the world's largest producers of which radioactive element, mined primarily around the northern town of Arlit?|Níger es uno de los mayores productores mundiales de ¿qué elemento radiactivo, extraído sobre todo en torno a la localidad septentrional de Arlit?|Le Niger est l'un des plus grands producteurs mondiaux de quel élément radioactif, extrait principalement autour de la ville septentrionale d'Arlit ?|北部の町アルリット周辺を中心に採掘される、世界有数の産出国であるニジェールの放射性元素は?",
    ["Uranium|Uranio|L'uranium|ウラン", "Plutonium|Plutonio|Le plutonium|プルトニウム", "Thorium|Torio|Le thorium|トリウム"],
    0,
    "French nuclear power plants have long depended significantly on Nigerien uranium, a relationship that has drawn criticism in Niger over how little of the resulting revenue historically reached the country, one of the world's poorest by income per person despite the mineral wealth beneath it.|Las centrales nucleares francesas dependieron durante mucho tiempo en buena medida del uranio nigerino, una relación que ha generado críticas en Níger por lo poco de los ingresos resultantes que históricamente llegaba al país, uno de los más pobres del mundo por ingreso per cápita pese a la riqueza mineral bajo su suelo.|Les centrales nucléaires françaises ont longtemps dépendu de manière significative de l'uranium nigérien, une relation qui a suscité des critiques au Niger quant à la faible part des revenus qui, historiquement, revenait au pays, l'un des plus pauvres du monde en revenu par habitant malgré la richesse minérale de son sous-sol.|フランスの原子力発電所は長らくニジェール産ウランに大きく依存してきたが、この関係はニジェール国内で批判を招いてきた。地下に眠る鉱物資源の豊かさにもかかわらず、その収益のうち実際にこの国へ渡ってきた分は歴史的にごくわずかだったからである。ニジェールは一人当たり所得で見て世界でも屈指の貧しい国の一つである。",
  ),
  q(
    6,
    "Which African country has the largest population, with over 220 million people?|¿Qué país africano tiene la mayor población, con más de 220 millones de personas?|Quel pays africain a la population la plus nombreuse, avec plus de 220 millions d'habitants ?|人口2億2000万人を超える、アフリカで最も人口の多い国は?",
    ["Nigeria|Nigeria|Le Nigeria|ナイジェリア", "Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Egypt|Egipto|L'Égypte|エジプト"],
    0,
    "The United Nations projects Nigeria's population could surpass that of the United States by around 2050, potentially making it the world's third most populous country behind only India and China.|Naciones Unidas proyecta que la población de Nigeria podría superar a la de Estados Unidos hacia 2050, lo que podría convertirlo en el tercer país más poblado del mundo, solo por detrás de India y China.|L'ONU projette que la population du Nigeria pourrait dépasser celle des États-Unis vers 2050, ce qui en ferait potentiellement le troisième pays le plus peuplé du monde, derrière seulement l'Inde et la Chine.|国連の推計によれば、ナイジェリアの人口は2050年頃までにアメリカ合衆国を上回る可能性があり、そうなればインド・中国に次ぐ世界第3位の人口大国になる見込みである。",
  ),
  q(
    5,
    "How many African countries does the Equator pass through?|¿Por cuántos países africanos pasa el ecuador?|Combien de pays africains l'équateur traverse-t-il ?|赤道が通過するアフリカの国はいくつあるか?",
    ["4|4|4|4か国", "7|7|7|7か国", "13|13|13|13か国"],
    1,
    "The Equator crosses seven African countries — São Tomé and Príncipe, Gabon, the Republic of the Congo, DR Congo, Uganda, Kenya and Somalia — passing close enough to Kenya's capital that Nairobi markets a roadside 'equator' photo stop for visitors.|El ecuador atraviesa siete países africanos: Santo Tomé y Príncipe, Gabón, la República del Congo, la RD Congo, Uganda, Kenia y Somalia, pasando lo bastante cerca de la capital keniana como para que Nairobi promocione una parada fotográfica del 'ecuador' junto a la carretera.|L'équateur traverse sept pays africains — Sao Tomé-et-Principe, le Gabon, la République du Congo, la RD Congo, l'Ouganda, le Kenya et la Somalie — passant assez près de la capitale kényane pour que Nairobi propose aux visiteurs un arrêt photo au bord de la route marqué « équateur ».|赤道はサントメ・プリンシペ・ガボン・コンゴ共和国・コンゴ民主共和国・ウガンダ・ケニア・ソマリアの7か国を通る。ケニアの首都ナイロビの近くも通っており、道端には観光客向けの「赤道」記念撮影スポットがある。",
  ),
  q(
    5,
    "Which two West African countries together produce roughly 60% of the world's cocoa?|¿Qué dos países de África Occidental producen juntos aproximadamente el 60% del cacao mundial?|Quels deux pays d'Afrique de l'Ouest produisent ensemble environ 60 % du cacao mondial ?|合わせて世界のカカオのおよそ6割を産出する、西アフリカの2か国は?",
    ["Côte d'Ivoire and Ghana|Costa de Marfil y Ghana|La Côte d'Ivoire et le Ghana|コートジボワールとガーナ", "Nigeria and Cameroon|Nigeria y Camerún|Le Nigeria et le Cameroun|ナイジェリアとカメルーン", "Senegal and Mali|Senegal y Malí|Le Sénégal et le Mali|セネガルとマリ"],
    0,
    "Côte d'Ivoire alone grows around 40% of the world's cocoa, and persistent child labour in the cocoa supply chains of both countries remains a major point of scrutiny for the international chocolate industry.|Solo Costa de Marfil cultiva alrededor del 40% del cacao mundial, y el persistente trabajo infantil en las cadenas de suministro de cacao de ambos países sigue siendo un punto importante de escrutinio para la industria chocolatera internacional.|La seule Côte d'Ivoire cultive environ 40 % du cacao mondial, et le travail des enfants persistant dans les chaînes d'approvisionnement en cacao des deux pays reste un point majeur de vigilance pour l'industrie chocolatière internationale.|コートジボワール一国だけで世界のカカオのおよそ4割を栽培している。両国のカカオ供給網に根強く残る児童労働は、国際的なチョコレート産業にとっていまも大きな監視の的である。",
  ),
  q(
    6,
    "Over roughly 100 days in 1994, an estimated how many people were killed in Rwanda in a genocide targeting the Tutsi minority?|A lo largo de unos 100 días en 1994, ¿cuántas personas se calcula que murieron en Ruanda en un genocidio dirigido contra la minoría tutsi?|En l'espace d'environ 100 jours en 1994, combien de personnes furent tuées au Rwanda, selon les estimations, dans un génocide visant la minorité tutsie ?|1994年、およそ100日間でルワンダにおいてツチ族を標的とした虐殺で殺害されたと推定される人数は?",
    ["About 80,000|Unas 80.000|Environ 80 000|およそ8万人", "About 800,000|Unas 800.000|Environ 800 000|およそ80万人", "About 8,000,000|Unos 8.000.000|Environ 8 000 000|およそ800万人"],
    1,
    "An estimated 800,000 people, mostly Tutsi but also moderate Hutu, were killed between April and July 1994, largely by Hutu extremist militias, in one of the fastest-paced mass killings of the 20th century.|Se calcula que 800.000 personas, en su mayoría tutsis pero también hutus moderados, murieron entre abril y julio de 1994, sobre todo a manos de milicias extremistas hutus, en una de las matanzas masivas más rápidas del siglo XX.|On estime à 800 000 le nombre de personnes, majoritairement tutsies mais aussi des Hutus modérés, tuées entre avril et juillet 1994, en grande partie par des milices extrémistes hutues, dans l'un des massacres de masse les plus rapides du XXe siècle.|1994年4月から7月にかけて、主にツチ族と穏健派フツ族を合わせて推定80万人が殺害された。主にフツ族の過激派民兵によるもので、20世紀でも屈指の速さで進んだ大量虐殺だった。",
  ),
  q(
    6,
    "Rwanda has the highest proportion of women in its national parliament of any country in the world. Roughly what share of seats do women hold?|Ruanda tiene la mayor proporción de mujeres en su parlamento nacional de cualquier país del mundo. ¿Qué proporción aproximada de escaños ocupan las mujeres?|Le Rwanda affiche la plus forte proportion de femmes dans son parlement national de tous les pays du monde. Quelle part des sièges les femmes occupent-elles environ ?|世界のどの国よりも国会議員に占める女性の割合が高いルワンダで、その割合はおよそどれくらいか?",
    ["About 25%|Aproximadamente el 25%|Environ 25 %|およそ25%", "About 45%|Aproximadamente el 45%|Environ 45 %|およそ45%", "About 60%|Aproximadamente el 60%|Environ 60 %|およそ60%"],
    2,
    "Rwanda's 2003 post-genocide constitution set a minimum quota of 30% of parliamentary seats for women, but actual representation has run far higher than that floor for years, regularly making Rwanda's lower house the most female of any national parliament on Earth.|La constitución ruandesa de 2003, posterior al genocidio, fijó una cuota mínima del 30% de los escaños parlamentarios para mujeres, pero la representación real ha sido durante años muy superior a ese mínimo, lo que convierte con regularidad a la cámara baja de Ruanda en la más femenina de cualquier parlamento nacional del mundo.|La Constitution rwandaise de 2003, adoptée après le génocide, fixa un quota minimal de 30 % des sièges parlementaires pour les femmes, mais la représentation réelle est restée pendant des années bien supérieure à ce plancher, faisant régulièrement de la chambre basse rwandaise la plus féminine de tous les parlements nationaux au monde.|ジェノサイド後の2003年に制定されたルワンダ憲法は、国会議席の少なくとも30%を女性に割り当てる最低枠を定めたが、実際の女性議員の割合は長年その最低枠をはるかに上回っており、ルワンダの下院はしばしば世界のどの国会よりも女性比率が高い議会になっている。",
  ),
  q(
    5,
    "The Southern African philosophy of 'ubuntu,' popularised internationally by Desmond Tutu and Nelson Mandela, is often summed up by which idea?|La filosofía sudafricana del 'ubuntu', popularizada internacionalmente por Desmond Tutu y Nelson Mandela, ¿con qué idea suele resumirse?|La philosophie sud-africaine de l'« ubuntu », popularisée à l'international par Desmond Tutu et Nelson Mandela, se résume souvent par quelle idée ?|デズモンド・ツツやネルソン・マンデラによって世界に広められた南部アフリカの哲学「ウブントゥ」は、しばしばどんな考えに要約されるか?",
    ["'I am because we are'|'Soy porque somos'|« Je suis parce que nous sommes »|「我々があるから、我がある」", "'The early bird catches the worm'|'Al que madruga, Dios lo ayuda'|« L'avenir appartient à ceux qui se lèvent tôt »|「早起きは三文の徳」", "'Knowledge is power'|'El saber es poder'|« Le savoir, c'est le pouvoir »|「知は力なり」"],
    0,
    "Drawn from Nguni Bantu tradition, ubuntu holds that a person's humanity is bound up in their relationships with others; Tutu and Mandela invoked it as a foundation for South Africa's post-apartheid reconciliation process.|Extraída de la tradición bantú nguni, el ubuntu sostiene que la humanidad de una persona está ligada a sus relaciones con los demás; Tutu y Mandela la invocaron como base del proceso de reconciliación sudafricano tras el apartheid.|Issu de la tradition bantoue nguni, l'ubuntu soutient que l'humanité d'une personne est indissociable de ses relations avec autrui ; Tutu et Mandela l'invoquèrent comme fondement du processus de réconciliation sud-africain de l'après-apartheid.|ングニ系バントゥーの伝統に由来するウブントゥは、人の人間性は他者との関係の中にこそあるという考え方である。ツツとマンデラは、アパルトヘイト後の南アフリカの和解プロセスの土台としてこの言葉を掲げた。",
  ),
  q(
    5,
    "Archbishop Desmond Tutu won the Nobel Peace Prize in which year for his non-violent campaign against apartheid?|El arzobispo Desmond Tutu ganó el Premio Nobel de la Paz en ¿qué año por su campaña no violenta contra el apartheid?|L'archevêque Desmond Tutu a reçu le prix Nobel de la paix en quelle année pour sa campagne non violente contre l'apartheid ?|デズモンド・ツツ大主教が、非暴力によるアパルトヘイト反対運動でノーベル平和賞を受賞したのは何年か?",
    ["1974|1974|1974|1974年", "1984|1984|1984|1984年", "1994|1994|1994|1994年"],
    1,
    "Tutu won the prize in 1984, a decade before apartheid formally ended, and used the international platform it gave him to keep pressing for sanctions and divestment against the South African government.|Tutu ganó el premio en 1984, una década antes de que el apartheid terminara formalmente, y usó la plataforma internacional que le dio para seguir presionando por sanciones y desinversión contra el gobierno sudafricano.|Tutu remporta le prix en 1984, une décennie avant la fin officielle de l'apartheid, et se servit de la tribune internationale qu'il lui offrait pour continuer à réclamer sanctions et désinvestissement contre le gouvernement sud-africain.|ツツがこの賞を受賞したのは1984年、アパルトヘイトが正式に終わる10年前のことだった。彼はこれによって得た国際的な発言力を使い、南アフリカ政府への制裁と投資引き揚げを求め続けた。",
  ),
  q(
    6,
    "Uniquely among African countries, which nation splits its seat of government across three different cities — one administrative, one legislative and one judicial?|De forma única entre los países africanos, ¿qué nación reparte su sede de gobierno entre tres ciudades distintas: una administrativa, una legislativa y una judicial?|Fait unique parmi les pays africains, quelle nation répartit son siège de gouvernement entre trois villes différentes — une administrative, une législative et une judiciaire ?|アフリカの国の中でも珍しく、行政・立法・司法の首都を3つの異なる都市に分けているのは?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Tanzania|Tanzania|La Tanzanie|タンザニア", "Nigeria|Nigeria|Le Nigeria|ナイジェリア"],
    0,
    "Pretoria hosts the executive branch, Cape Town the parliament, and Bloemfontein the supreme court of appeal, a three-way split dating to a compromise struck when British and Boer territories were unified into one country in 1910.|Pretoria alberga el poder ejecutivo, Ciudad del Cabo el parlamento y Bloemfontein el tribunal supremo de apelación, una división tripartita que se remonta a un acuerdo alcanzado cuando los territorios británico y bóer se unificaron en un solo país en 1910.|Pretoria héberge l'exécutif, Le Cap le parlement, et Bloemfontein la cour suprême d'appel, un partage tripartite remontant à un compromis conclu lorsque les territoires britanniques et boers furent unifiés en un seul pays en 1910.|プレトリアには行政府、ケープタウンには議会、ブルームフォンテーンには最高控訴裁判所が置かれている。この三分割は、1910年にイギリス領とボーア人の領域が一つの国に統合された際の妥協に由来する。",
  ),
  q(
    6,
    "The lowest point in Africa, a salt lake more than 150m below sea level, is found in which country?|El punto más bajo de África, un lago salado a más de 150 m bajo el nivel del mar, ¿en qué país se encuentra?|Le point le plus bas d'Afrique, un lac salé à plus de 150 m sous le niveau de la mer, se trouve dans quel pays ?|海抜マイナス150m以上にある塩湖、アフリカ大陸の最低地点があるのはどこの国か?",
    ["Djibouti|Yibuti|Djibouti|ジブチ", "Egypt|Egipto|L'Égypte|エジプト", "Ethiopia|Etiopía|L'Éthiopie|エチオピア"],
    0,
    "Lake Assal sits about 155m below sea level and is nearly ten times saltier than the open ocean, dense enough that a person floats in it almost effortlessly, similar to the Dead Sea.|El lago Assal se encuentra a unos 155 m bajo el nivel del mar y es casi diez veces más salado que el océano abierto, lo bastante denso como para que una persona flote en él casi sin esfuerzo, de forma similar al mar Muerto.|Le lac Assal se trouve à environ 155 m sous le niveau de la mer et est près de dix fois plus salé que l'océan ouvert, assez dense pour qu'une personne y flotte presque sans effort, à la manière de la mer Morte.|アッサル湖は海抜マイナス約155mにあり、外洋の10倍近い塩分濃度を持つ。その密度の高さから、死海と同じようにほとんど力を入れずに浮かぶことができる。",
  ),
  q(
    6,
    "The Danakil Depression, one of the hottest and lowest places on Earth with active volcanoes and colourful mineral pools, lies mostly in which country?|La depresión de Danakil, uno de los lugares más calurosos y bajos de la Tierra, con volcanes activos y pozas minerales de colores, se encuentra sobre todo en ¿qué país?|La dépression de Danakil, l'un des endroits les plus chauds et les plus bas de la planète, avec des volcans actifs et des bassins minéraux colorés, se trouve principalement dans quel pays ?|活火山と色鮮やかな鉱物の池を持つ、地球でも屈指の暑さと低さで知られるダナキル低地の大部分があるのはどこの国か?",
    ["Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Sudan|Sudán|Le Soudan|スーダン", "Somalia|Somalia|La Somalie|ソマリア"],
    0,
    "Average temperatures in the Danakil make it one of the most inhospitable inhabited places on the planet, yet Afar salt miners have worked its salt flats for generations, cutting slabs by hand and hauling them out by camel caravan.|Las temperaturas medias en Danakil la convierten en uno de los lugares habitados más inhóspitos del planeta, y aun así los mineros de sal afar han trabajado sus salares durante generaciones, cortando losas a mano y transportándolas en caravanas de camellos.|Les températures moyennes dans le Danakil en font l'un des lieux habités les plus inhospitaliers de la planète, et pourtant des mineurs de sel afars y travaillent ses salines depuis des générations, taillant des plaques à la main et les acheminant à dos de chameau.|平均気温の高さから、ダナキルは地球上でも人が暮らす場所としては屈指の過酷さを持つ。それでもアファル人の塩採掘者たちは何世代にもわたってこの塩原で働き、手作業で塩の板を切り出し、ラクダの隊商で運び出してきた。",
  ),
  q(
    7,
    "Which African country, a former Portuguese colony, fought a civil war from 1975 to 2002 heavily shaped by Cold War proxy involvement from the US, Soviet Union, Cuba and apartheid South Africa?|¿Qué país africano, antigua colonia portuguesa, vivió una guerra civil de 1975 a 2002 fuertemente marcada por la implicación de la Guerra Fría de EE. UU., la Unión Soviética, Cuba y la Sudáfrica del apartheid?|Quel pays africain, ancienne colonie portugaise, connut une guerre civile de 1975 à 2002 fortement marquée par l'implication par procuration de la guerre froide des États-Unis, de l'Union soviétique, de Cuba et de l'Afrique du Sud de l'apartheid ?|旧ポルトガル植民地で、アメリカ・ソ連・キューバ・アパルトヘイト下の南アフリカによる冷戦の代理介入に大きく左右された1975年から2002年までの内戦を経験したアフリカの国は?",
    ["Angola|Angola|L'Angola|アンゴラ", "Mozambique|Mozambique|Le Mozambique|モザンビーク", "Guinea-Bissau|Guinea-Bisáu|La Guinée-Bissau|ギニアビサウ"],
    0,
    "Cuba deployed tens of thousands of troops to support the governing MPLA against UNITA rebels backed by the United States and apartheid South Africa, making it one of the Cold War's largest proxy conflicts fought on African soil.|Cuba desplegó decenas de miles de soldados para apoyar al gobierno del MPLA frente a los rebeldes de UNITA, respaldados por Estados Unidos y la Sudáfrica del apartheid, lo que la convirtió en uno de los mayores conflictos por delegación de la Guerra Fría librados en suelo africano.|Cuba déploya des dizaines de milliers de soldats pour soutenir le gouvernement du MPLA contre les rebelles de l'UNITA, soutenus par les États-Unis et l'Afrique du Sud de l'apartheid, en faisant l'un des plus grands conflits par procuration de la guerre froide menés sur le sol africain.|キューバは数万人規模の兵を派遣し、アメリカとアパルトヘイト下の南アフリカに支援されたUNITA反乱軍に対抗する与党MPLA政権を支えた。これはアフリカの地で戦われた冷戦の代理戦争としては最大級のものだった。",
  ),
  q(
    7,
    "In January 1964 a revolution overthrew the Sultan of Zanzibar; within months the islands merged with mainland Tanganyika to form which country?|En enero de 1964 una revolución derrocó al sultán de Zanzíbar; en pocos meses las islas se unieron a Tanganica continental para formar ¿qué país?|En janvier 1964, une révolution renversa le sultan de Zanzibar ; en quelques mois, les îles fusionnèrent avec le Tanganyika continental pour former quel pays ?|1964年1月の革命でザンジバルのスルタンが打倒され、数か月のうちに島々は大陸側のタンガニーカと合併してある国になった。その国は?",
    ["Tanzania|Tanzania|La Tanzanie|タンザニア", "Kenya|Kenia|Le Kenya|ケニア", "Uganda|Uganda|L'Ouganda|ウガンダ"],
    0,
    "The new country's name, Tanzania, is a portmanteau combining TANganyika and ZANzibar, formed when the merger was finalised in April 1964.|El nombre del nuevo país, Tanzania, es una mezcla que combina TANganica y ZANzíbar, formada cuando la unión se formalizó en abril de 1964.|Le nom du nouveau pays, la Tanzanie, est un mot-valise combinant TANganyika et ZANzibar, formé lorsque la fusion fut finalisée en avril 1964.|新しい国の名前タンザニアは、タンガニーカの頭部分とザンジバルの頭部分を組み合わせた合成語で、1964年4月に合併が正式に成立した際に生まれた。",
  ),
  q(
    7,
    "The Congo Crisis of the early 1960s saw the country's first elected prime minister assassinated within months of independence. Who was he?|La crisis del Congo de principios de los años sesenta vio asesinado al primer primer ministro electo del país a los pocos meses de la independencia. ¿Quién era?|La crise du Congo du début des années 1960 vit le premier Premier ministre élu du pays assassiné quelques mois seulement après l'indépendance. Qui était-il ?|1960年代初めのコンゴ動乱では、独立からわずか数か月で初代の民選首相が暗殺された。その人物は?",
    ["Patrice Lumumba|Patrice Lumumba|Patrice Lumumba|パトリス・ルムンバ", "Mobutu Sese Seko|Mobutu Sese Seko|Mobutu Sese Seko|モブツ・セセ・セコ", "Moise Tshombe|Moise Tshombe|Moïse Tshombe|モイーズ・チョンベ"],
    0,
    "Lumumba was ousted in a coup and killed in January 1961 with the involvement of Belgian officials and covert US backing; Belgium formally apologised for its role in his death in 2002.|Lumumba fue derrocado en un golpe y asesinado en enero de 1961 con la implicación de funcionarios belgas y el respaldo encubierto de EE. UU.; Bélgica se disculpó formalmente por su papel en su muerte en 2002.|Lumumba fut renversé lors d'un coup d'État et tué en janvier 1961 avec l'implication de fonctionnaires belges et un soutien secret des États-Unis ; la Belgique présenta des excuses officielles pour son rôle dans sa mort en 2002.|ルムンバはクーデターで失脚し、ベルギー当局の関与とアメリカの秘密裏の後押しを受けて1961年1月に殺害された。ベルギーは2002年、その死への関与について正式に謝罪した。",
  ),
  q(
    7,
    "Idi Amin, whose brutal rule from 1971 to 1979 is estimated to have killed anywhere from 100,000 to 500,000 people, was the dictator of which country?|Idi Amín, cuyo brutal gobierno de 1971 a 1979 se estima que mató entre 100.000 y 500.000 personas, fue dictador de ¿qué país?|Idi Amin, dont le régime brutal de 1971 à 1979 aurait tué entre 100 000 et 500 000 personnes selon les estimations, fut le dictateur de quel pays ?|1971年から1979年までの残虐な統治で推定10万人から50万人を死に至らしめたイディ・アミンが独裁者だった国は?",
    ["Uganda|Uganda|L'Ouganda|ウガンダ", "Central African Republic|República Centroafricana|La République centrafricaine|中央アフリカ共和国", "Equatorial Guinea|Guinea Ecuatorial|La Guinée équatoriale|赤道ギニア"],
    0,
    "Amin seized power in a 1971 military coup and was eventually driven from Uganda in 1979 after invading neighbouring Tanzania, whose army responded by backing Ugandan exiles in a counter-invasion that toppled him.|Amín tomó el poder en un golpe militar en 1971 y finalmente fue expulsado de Uganda en 1979 tras invadir la vecina Tanzania, cuyo ejército respondió apoyando a exiliados ugandeses en una contrainvasión que lo derrocó.|Amin s'empara du pouvoir lors d'un coup d'État militaire en 1971 et fut finalement chassé de l'Ouganda en 1979 après avoir envahi la Tanzanie voisine, dont l'armée riposta en soutenant des exilés ougandais dans une contre-invasion qui le renversa.|アミンは1971年の軍事クーデターで権力を握り、隣国タンザニアに侵攻した末、1979年についにウガンダを追われた。タンザニア軍はウガンダ人亡命者たちを支援する反攻に出て、アミン政権を打倒した。",
  ),
  q(
    7,
    "Which country's ruler, Jean-Bédel Bokassa, crowned himself 'Emperor' in an extravagant 1977 ceremony modelled on Napoleon's coronation?|El gobernante de ¿qué país, Jean-Bédel Bokassa, se coronó 'Emperador' en una extravagante ceremonia de 1977 inspirada en la coronación de Napoleón?|Le dirigeant de quel pays, Jean-Bédel Bokassa, se couronna « Empereur » lors d'une cérémonie extravagante en 1977, calquée sur le sacre de Napoléon ?|1977年、ナポレオンの戴冠式を模した豪華絢爛な式典で自ら「皇帝」を名乗った統治者ジャン=ベデル・ボカサがいたのはどこの国か?",
    ["The Central African Republic|La República Centroafricana|La République centrafricaine|中央アフリカ共和国", "Gabon|Gabón|Le Gabon|ガボン", "Chad|Chad|Le Tchad|チャド"],
    0,
    "The coronation, complete with a jewel-encrusted crown and a golden throne shaped like an eagle, reportedly cost around a third of the country's annual budget in one of the poorest nations on Earth.|La coronación, con corona incrustada de joyas y trono dorado en forma de águila, costó supuestamente cerca de un tercio del presupuesto anual del país, uno de los más pobres del mundo.|Le sacre, avec couronne incrustée de joyaux et trône doré en forme d'aigle, aurait coûté environ un tiers du budget annuel du pays, l'un des plus pauvres de la planète.|宝石をちりばめた王冠と鷲の形をした黄金の玉座を用いたこの戴冠式には、世界でも屈指の貧しい国であるこの国の年間予算のおよそ3分の1が費やされたと伝えられる。",
  ),
  q(
    7,
    "The Suez Crisis of 1956 was triggered when Egyptian President Gamal Abdel Nasser did what?|La crisis de Suez de 1956 se desencadenó cuando el presidente egipcio Gamal Abdel Nasser hizo ¿qué?|La crise de Suez de 1956 fut déclenchée lorsque le président égyptien Gamal Abdel Nasser fit quoi ?|1956年のスエズ危機のきっかけとなった、エジプト大統領ガマール・アブドゥル=ナーセルの行動は?",
    ["He nationalised the Suez Canal|Nacionalizó el canal de Suez|Il nationalisa le canal de Suez|スエズ運河を国有化した", "He declared war on Israel|Declaró la guerra a Israel|Il déclara la guerre à Israël|イスラエルに宣戦布告した", "He expelled all British troops from Egypt|Expulsó a todas las tropas británicas de Egipto|Il expulsa toutes les troupes britanniques d'Égypte|エジプトからイギリス軍をすべて追放した"],
    0,
    "Britain, France and Israel invaded in response but were forced into a humiliating withdrawal under US and Soviet pressure, an episode widely seen as marking the effective end of Britain and France as first-rank global powers.|En respuesta, Gran Bretaña, Francia e Israel invadieron, pero se vieron forzados a una retirada humillante bajo presión de EE. UU. y la URSS, un episodio ampliamente visto como el fin efectivo de Gran Bretaña y Francia como potencias mundiales de primer nivel.|En réponse, la Grande-Bretagne, la France et Israël envahirent, mais furent contraints à un retrait humiliant sous la pression américaine et soviétique, un épisode largement considéré comme marquant la fin effective de la Grande-Bretagne et de la France en tant que puissances mondiales de premier rang.|これに応じてイギリス・フランス・イスラエルが侵攻したが、アメリカとソ連の圧力を受けて屈辱的な撤退を強いられた。この出来事は、イギリスとフランスが世界一級の大国であった時代の実質的な終わりを告げるものと広く見なされている。",
  ),
  q(
    7,
    "Which former British colony renamed itself after an ancient West African empire upon independence in 1957?|¿Qué antigua colonia británica se renombró en honor a un antiguo imperio de África Occidental al independizarse en 1957?|Quelle ancienne colonie britannique s'est renommée d'après un ancien empire d'Afrique de l'Ouest lors de son indépendance en 1957 ?|1957年の独立に際し、古代西アフリカの帝国の名にちなんで改名した旧イギリス植民地は?",
    ["Ghana|Ghana|Le Ghana|ガーナ", "Benin|Benín|Le Bénin|ベナン", "Mali|Malí|Le Mali|マリ"],
    0,
    "The colony, previously called the Gold Coast, took the name of the medieval Ghana Empire even though that empire's actual territory lay several hundred kilometres further north and west, not overlapping with the modern country's borders.|La colonia, antes llamada Costa de Oro, tomó el nombre del imperio medieval de Ghana, aunque el territorio real de ese imperio se hallaba varios cientos de kilómetros más al norte y al oeste, sin solaparse con las fronteras del país moderno.|La colonie, auparavant appelée Côte-de-l'Or, prit le nom de l'empire médiéval du Ghana, bien que le territoire réel de cet empire se trouvât plusieurs centaines de kilomètres plus au nord et à l'ouest, sans chevaucher les frontières du pays moderne.|かつて「黄金海岸」と呼ばれたこの植民地は、中世のガーナ帝国の名を取ったが、実際のガーナ帝国の版図は現在の国境から数百キロメートル北西に離れた場所にあり、重なってはいない。",
  ),
  q(
    7,
    "Which African country changed its name from 'Upper Volta' in 1984 to a new name meaning roughly 'Land of Honest People'?|¿Qué país africano cambió su nombre de 'Alto Volta' en 1984 a uno nuevo que significa aproximadamente 'Tierra de gente honesta'?|Quel pays africain a changé son nom de « Haute-Volta » en 1984 pour un nouveau nom signifiant à peu près « Pays des hommes intègres » ?|1984年、「オートボルタ」からおよそ「正直な人々の国」を意味する新しい国名に変えたアフリカの国は?",
    ["Burkina Faso|Burkina Faso|Le Burkina Faso|ブルキナファソ", "Benin|Benín|Le Bénin|ベナン", "Mali|Malí|Le Mali|マリ"],
    0,
    "The name was chosen by revolutionary leader Thomas Sankara, combining a Mòoré word ('burkina', upright or honest) with a Dioula word ('faso', homeland), deliberately drawing on two of the country's major languages rather than favouring one.|El nombre lo eligió el líder revolucionario Thomas Sankara, combinando una palabra mòoré ('burkina', recto u honesto) con una palabra dioula ('faso', patria), en un intento deliberado de recurrir a dos de las principales lenguas del país en vez de favorecer solo una.|Le nom fut choisi par le dirigeant révolutionnaire Thomas Sankara, combinant un mot mooré (« burkina », droit ou honnête) et un mot dioula (« faso », patrie), afin de puiser délibérément dans deux des principales langues du pays plutôt que d'en favoriser une seule.|この名はモシ語で「実直な、正直な」を意味する「ブルキナ」と、ジュラ語で「祖国」を意味する「ファソ」を組み合わせたもので、革命指導者トマ・サンカラが、一つの言語だけを特別扱いせず国内の主要な二つの言語を意図的に取り入れて選んだ。",
  ),
  q(
    7,
    "Zimbabwe's hyperinflation crisis in the late 2000s, one of the worst in recorded history, at one point led the government to issue a banknote of what denomination?|La crisis de hiperinflación de Zimbabue a finales de los años 2000, una de las peores de la historia registrada, en un momento llevó al gobierno a emitir un billete de ¿qué denominación?|La crise d'hyperinflation du Zimbabwe à la fin des années 2000, l'une des pires de l'histoire connue, poussa un temps le gouvernement à émettre un billet de quelle valeur ?|記録上でも最悪級とされる2000年代後半のジンバブエのハイパーインフレでは、政府が一時どの額面の紙幣を発行するに至ったか?",
    ["1,000 dollars|1.000 dólares|1 000 dollars|1000ドル", "1 million dollars|1 millón de dólares|1 million de dollars|100万ドル", "100 trillion dollars|100 billones de dólares|100 000 milliards de dollars|100兆ドル"],
    2,
    "The Z$100 trillion note, issued in January 2009, was worth only a few US dollars by the time it reached circulation; Zimbabwe abandoned its own currency entirely later that year in favour of foreign currencies.|El billete de 100 billones de dólares zimbabuenses, emitido en enero de 2009, valía solo unos pocos dólares estadounidenses cuando entró en circulación; Zimbabue abandonó por completo su propia moneda ese mismo año en favor de divisas extranjeras.|Le billet de 100 000 milliards de dollars zimbabwéens, émis en janvier 2009, ne valait plus que quelques dollars américains au moment de sa mise en circulation ; le Zimbabwe abandonna complètement sa propre monnaie plus tard cette année-là au profit de devises étrangères.|2009年1月に発行された100兆ジンバブエドル紙幣は、流通に出回る頃にはわずか数米ドルの価値しかなかった。ジンバブエは同年のうちに自国通貨を完全に放棄し、外国通貨に切り替えた。",
  ),
  q(
    6,
    "Which West African stringed instrument, a 21-string harp-lute traditionally played by hereditary musician-storytellers called griots, is especially associated with Mali and Guinea?|¿Qué instrumento de cuerda de África Occidental, un arpa-laúd de 21 cuerdas tocado tradicionalmente por narradores-músicos hereditarios llamados griots, se asocia especialmente con Malí y Guinea?|Quel instrument à cordes ouest-africain, une harpe-luth à 21 cordes traditionnellement jouée par des musiciens-conteurs héréditaires appelés griots, est particulièrement associé au Mali et à la Guinée ?|世襲の音楽家・語り部であるグリオが伝統的に奏でる、21弦のハープ・リュートで、マリとギニアに特に結びつく西アフリカの弦楽器は?",
    ["The kora|La kora|La kora|コラ", "The oud|El laúd árabe (oud)|Le luth oud|ウード", "The sitar|El sitar|Le sitar|シタール"],
    0,
    "A kora is built from a large calabash gourd cut in half and covered with cowhide, and griot families have passed down the instrument's repertoire, along with their role as oral historians, across many generations.|Una kora se construye con una gran calabaza cortada por la mitad y cubierta de piel de vaca, y las familias griot han transmitido el repertorio del instrumento, junto con su papel de historiadores orales, durante muchas generaciones.|Une kora est fabriquée à partir d'une grande calebasse coupée en deux et recouverte de peau de vache, et les familles de griots se sont transmis le répertoire de l'instrument, ainsi que leur rôle d'historiens oraux, sur de nombreuses générations.|コラは大きなヒョウタンを半分に割り牛革を張って作られる。グリオの一族は口承歴史家としての役割とともに、この楽器の演目を何世代にもわたって受け継いできた。",
  ),
  q(
    7,
    "The Rosetta Stone, key to deciphering Egyptian hieroglyphs, carries the same decree written in hieroglyphic, Demotic, and which other script?|La piedra de Rosetta, clave para descifrar los jeroglíficos egipcios, lleva el mismo decreto escrito en jeroglífico, demótico y ¿qué otra escritura?|La pierre de Rosette, clé du déchiffrement des hiéroglyphes égyptiens, porte le même décret écrit en hiéroglyphes, en démotique et dans quelle autre écriture ?|エジプトのヒエログリフ解読の鍵となったロゼッタストーンには、同じ布告がヒエログリフ・民衆文字と、もう一つ何の文字で刻まれているか?",
    ["Ancient Greek|Griego antiguo|Le grec ancien|古代ギリシア文字", "Latin|Latín|Le latin|ラテン文字", "Phoenician|Fenicio|Le phénicien|フェニキア文字"],
    0,
    "Because scholars could already read Ancient Greek, the parallel Greek text let Jean-François Champollion work out the hieroglyphic writing system in the 1820s, more than a millennium after the knowledge of how to read it had died out.|Como los eruditos ya sabían leer griego antiguo, el texto griego paralelo permitió a Jean-François Champollion descifrar el sistema jeroglífico en la década de 1820, más de un milenio después de que se hubiera perdido el conocimiento de cómo leerlo.|Comme les érudits savaient déjà lire le grec ancien, le texte grec parallèle permit à Jean-François Champollion de percer le système hiéroglyphique dans les années 1820, plus d'un millénaire après que la connaissance de sa lecture se fut éteinte.|学者たちはすでに古代ギリシア語を読むことができたため、並記されたギリシア語文がジャン=フランソワ・シャンポリオンによる1820年代のヒエログリフ解読の手がかりとなった。読み方の知識が失われてから千年以上を経てのことだった。",
  ),
  q(
    7,
    "Which African country is the only one to have built nuclear weapons and then voluntarily dismantled its entire arsenal?|¿Qué país africano es el único que ha construido armas nucleares y luego ha desmantelado voluntariamente todo su arsenal?|Quel pays africain est le seul à avoir construit des armes nucléaires puis démantelé volontairement tout son arsenal ?|核兵器を製造し、その後自らの意思で保有兵器をすべて解体した唯一のアフリカの国は?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Libya|Libia|La Libye|リビア", "Egypt|Egipto|L'Égypte|エジプト"],
    0,
    "South Africa's apartheid government secretly built six nuclear devices from the late 1970s and dismantled every one of them before the transition to democratic rule in the early 1990s, the only country in the world known to have built weapons and then given them up entirely.|El gobierno del apartheid en Sudáfrica construyó en secreto seis artefactos nucleares desde finales de los setenta y desmanteló todos y cada uno antes de la transición al gobierno democrático a principios de los noventa, el único país del mundo del que se sabe que construyó armas y luego renunció a ellas por completo.|Le gouvernement de l'apartheid en Afrique du Sud construisit secrètement six engins nucléaires à partir de la fin des années 1970 et les démantela tous avant la transition vers un régime démocratique au début des années 1990, seul pays au monde connu pour avoir construit des armes puis y avoir entièrement renoncé.|アパルトヘイト政権下の南アフリカは1970年代後半から核爆発装置を6基秘密裏に製造し、1990年代初めの民主政権移行前にそのすべてを解体した。核兵器を製造したのち完全に放棄した、世界で唯一知られている国である。",
  ),
  q(
    8,
    "The ancient Kingdom of Aksum, centred in modern Ethiopia and Eritrea, was one of only a handful of states in the ancient world — alongside Rome, Persia and China — known for doing what?|El antiguo Reino de Aksum, centrado en la actual Etiopía y Eritrea, fue uno de los pocos estados del mundo antiguo (junto a Roma, Persia y China) conocido por ¿qué?|L'ancien royaume d'Aksoum, centré sur l'actuelle Éthiopie et l'Érythrée, fut l'un des rares États du monde antique — aux côtés de Rome, de la Perse et de la Chine — connu pour quoi ?|現在のエチオピアとエリトリアを中心とした古代アクスム王国は、ローマ・ペルシア・中国と並んで古代世界でごく少数の国家しか行っていなかった、ある行為で知られている。それは?",
    ["Minting its own gold coinage|Acuñar su propia moneda de oro|Frapper sa propre monnaie d'or|独自の金貨を鋳造していたこと", "Building pyramid tombs|Construir tumbas piramidales|Construire des tombeaux pyramidaux|ピラミッド型の墓を築いていたこと", "Inventing a system of paper money|Inventar un sistema de papel moneda|Inventer un système de monnaie papier|紙幣の仕組みを発明していたこと"],
    0,
    "Aksumite gold coins, minted from the 3rd century AD, have turned up as far away as India and Sri Lanka, evidence of the kingdom's reach in Indian Ocean trade; Aksum later also became one of the earliest states in the world to adopt Christianity as an official religion, around 330 AD.|Las monedas de oro aksumitas, acuñadas desde el siglo III d. C., han aparecido tan lejos como India y Sri Lanka, prueba del alcance del reino en el comercio del océano Índico; Aksum se convirtió después también en uno de los primeros estados del mundo en adoptar el cristianismo como religión oficial, hacia el año 330.|Les pièces d'or aksoumites, frappées dès le IIIe siècle apr. J.-C., ont été retrouvées jusqu'en Inde et au Sri Lanka, preuve du rayonnement du royaume dans le commerce de l'océan Indien ; Aksoum devint aussi plus tard l'un des tout premiers États au monde à adopter le christianisme comme religion officielle, vers 330 apr. J.-C.|3世紀から鋳造されたアクスムの金貨は、遠くインドやスリランカでも発見されており、インド洋交易におけるこの王国の広がりを物語っている。アクスムはのちに、紀元330年頃、キリスト教を国教として採用した世界でも最も早い国家の一つにもなった。",
  ),
  q(
    7,
    "The extinct hominin species whose famous fossil skeleton, nicknamed 'Lucy,' was discovered in Ethiopia in 1974 and lived roughly 3.2 million years ago, is called what?|La especie extinta de homínido cuyo famoso esqueleto fósil, apodado 'Lucy', se descubrió en Etiopía en 1974 y vivió hace unos 3,2 millones de años, ¿cómo se llama?|L'espèce éteinte d'hominidé dont le célèbre squelette fossile, surnommé « Lucy », fut découvert en Éthiopie en 1974 et qui vécut il y a environ 3,2 millions d'années, s'appelle comment ?|1974年にエチオピアで発見された「ルーシー」の愛称で知られる有名な化石人骨、およそ320万年前に生きていた絶滅ヒト族の種は?",
    ["Australopithecus afarensis|Australopithecus afarensis|Australopithecus afarensis|アウストラロピテクス・アファレンシス", "Homo erectus|Homo erectus|Homo erectus|ホモ・エレクトス", "Homo habilis|Homo habilis|Homo habilis|ホモ・ハビリス"],
    0,
    "Lucy's skeleton was about 40% complete, unusually so for a fossil this old, and her species walked upright on two legs despite still having a brain roughly the size of a chimpanzee's.|El esqueleto de Lucy estaba completo en torno a un 40%, algo inusual para un fósil tan antiguo, y su especie caminaba erguida sobre dos piernas pese a tener aún un cerebro del tamaño aproximado del de un chimpancé.|Le squelette de Lucy était complet à environ 40 %, ce qui est inhabituel pour un fossile aussi ancien, et son espèce marchait debout sur deux jambes tout en ayant encore un cerveau de la taille approximative de celui d'un chimpanzé.|ルーシーの骨格はおよそ4割が残っており、これほど古い化石としては異例の保存状態だった。この種はチンパンジー程度の大きさの脳しか持たなかったにもかかわらず、二足で直立して歩いていた。",
  ),
  q(
    6,
    "The 'Cradle of Humankind,' a UNESCO World Heritage site with some of the richest deposits of early human fossils on Earth, lies near which city?|La 'Cuna de la Humanidad', un sitio Patrimonio de la Humanidad de la UNESCO con algunos de los yacimientos más ricos de fósiles humanos primitivos de la Tierra, se encuentra cerca de ¿qué ciudad?|Le « berceau de l'humanité », site du patrimoine mondial de l'UNESCO abritant certains des gisements de fossiles humains primitifs les plus riches de la planète, se trouve près de quelle ville ?|地球でも屈指の豊かな初期人類化石の産地であるユネスコ世界遺産「人類のゆりかご」があるのは、どの都市の近くか?",
    ["Johannesburg|Johannesburgo|Johannesbourg|ヨハネスブルグ", "Nairobi|Nairobi|Nairobi|ナイロビ", "Addis Ababa|Adís Abeba|Addis-Abeba|アディスアベバ"],
    0,
    "The site's limestone cave system, in South Africa's Gauteng province, has yielded fossils including 'Little Foot,' a nearly complete Australopithecus skeleton over 3 million years old found deep underground in the Sterkfontein caves.|El sistema de cuevas calizas del lugar, en la provincia sudafricana de Gauteng, ha dado fósiles como 'Little Foot', un esqueleto de Australopithecus casi completo de más de 3 millones de años hallado en las profundidades de las cuevas de Sterkfontein.|Le système de grottes calcaires du site, dans la province sud-africaine du Gauteng, a livré des fossiles dont « Little Foot », un squelette d'Australopithèque presque complet vieux de plus de 3 millions d'années, trouvé au fond des grottes de Sterkfontein.|南アフリカのハウテン州にあるこの石灰岩洞窟群からは、スタークフォンテイン洞窟の地下深くで見つかった320万年以上前のほぼ完全なアウストラロピテクスの骨格「リトルフット」をはじめとする化石が出土している。",
  ),
  q(
    8,
    "Click consonants, a distinctive feature of languages like Zulu and Xhosa, entered Bantu languages mainly through centuries of contact with which older southern African language family?|Las consonantes chasqueadas, un rasgo distintivo de lenguas como el zulú y el xhosa, entraron en las lenguas bantúes sobre todo por siglos de contacto con ¿qué familia lingüística sudafricana más antigua?|Les consonnes clics, trait distinctif de langues comme le zoulou et le xhosa, sont entrées dans les langues bantoues principalement par des siècles de contact avec quelle famille linguistique plus ancienne d'Afrique australe ?|ズールー語やコーサ語に特徴的なクリック音(吸着音)は、何世紀にもわたる接触を通じて、南部アフリカのより古いどの語族からバントゥー諸語に取り入れられたか?",
    ["The Khoisan languages|Las lenguas khoisan|Les langues khoisan|コイサン諸語", "The Cushitic languages|Las lenguas cusitas|Les langues couchitiques|クシ諸語", "The Berber languages|Las lenguas bereberes|Les langues berbères|ベルベル諸語"],
    0,
    "Khoisan-speaking peoples, including the San and Khoikhoi, are believed to be among the oldest continuous populations in southern Africa, and their languages' distinctive clicks spread into neighbouring Bantu languages through long-standing contact.|Se cree que los pueblos de habla khoisan, incluidos los san y los khoikhoi, están entre las poblaciones continuas más antiguas del sur de África, y los chasquidos distintivos de sus lenguas se extendieron a las lenguas bantúes vecinas por un contacto prolongado.|On pense que les peuples de langue khoisan, dont les San et les Khoikhoi, comptent parmi les populations les plus anciennes et continues d'Afrique australe, et les clics distinctifs de leurs langues se sont propagés aux langues bantoues voisines par un contact prolongé.|サン人やコイコイ人を含むコイサン語話者たちは、南部アフリカで最も古くから続く集団の一つと考えられている。彼らの言語に特徴的なクリック音は、長期にわたる接触を通じて近隣のバントゥー諸語にも広がった。",
  ),
  q(
    8,
    "About what share of Madagascar's native plant and animal species are found nowhere else on Earth?|¿Aproximadamente qué proporción de las especies de plantas y animales nativas de Madagascar no se encuentra en ningún otro lugar de la Tierra?|Environ quelle part des espèces végétales et animales indigènes de Madagascar ne se trouve nulle part ailleurs sur Terre ?|マダガスカル固有の動植物種のうち、地球上のほかのどこにも見られない種の割合はおよそどれくらいか?",
    ["About 20%|Aproximadamente el 20%|Environ 20 %|およそ20%", "About 50%|Aproximadamente el 50%|Environ 50 %|およそ50%", "About 90%|Aproximadamente el 90%|Environ 90 %|およそ90%"],
    2,
    "Conservationists commonly cite a figure around 90% endemism across many groups of Madagascar's wildlife, the result of the island having evolved in near-total isolation for tens of millions of years.|Los conservacionistas suelen citar una cifra cercana al 90% de endemismo en muchos grupos de la fauna de Madagascar, resultado de que la isla evolucionó en un aislamiento casi total durante decenas de millones de años.|Les défenseurs de l'environnement citent couramment un taux d'endémisme d'environ 90 % pour de nombreux groupes de la faune malgache, résultat d'une évolution de l'île dans un isolement quasi total pendant des dizaines de millions d'années.|保全に携わる専門家は、マダガスカルの野生生物の多くの分類群でおよそ9割が固有種だとしばしば挙げる。これは、この島が数千万年にわたってほぼ完全に隔離された状態で進化してきた結果である。",
  ),
  q(
    7,
    "The Rwenzori Mountains, nicknamed the 'Mountains of the Moon' by ancient geographers who speculated they were the source of the Nile, straddle the border between Uganda and which country?|Los montes Rwenzori, apodados 'Montañas de la Luna' por geógrafos antiguos que especulaban que eran la fuente del Nilo, se extienden por la frontera entre Uganda y ¿qué país?|Les monts Rwenzori, surnommés « Montagnes de la Lune » par des géographes antiques qui pensaient qu'ils étaient la source du Nil, chevauchent la frontière entre l'Ouganda et quel pays ?|古代の地理学者たちがナイル川の水源だと推測し「月の山」と呼んだルウェンゾリ山地が、ウガンダとの国境にまたがるのはどの国との間か?",
    ["DR Congo|La RD Congo|La RD Congo|コンゴ民主共和国", "Kenya|Kenia|Le Kenya|ケニア", "Tanzania|Tanzania|La Tanzanie|タンザニア"],
    0,
    "The 2nd-century geographer Ptolemy marked the range as the Nile's source based on secondhand travellers' reports, a guess that turned out to be roughly right in spirit, since Rwenzori meltwater does eventually feed the Nile system via Lake Albert.|El geógrafo del siglo II Tolomeo marcó la cordillera como fuente del Nilo basándose en relatos de segunda mano de viajeros, una conjetura que resultó ser aproximadamente acertada en esencia, ya que el agua de deshielo del Rwenzori sí acaba alimentando el sistema del Nilo a través del lago Alberto.|Le géographe du IIe siècle Ptolémée désigna la chaîne comme source du Nil sur la foi de récits de voyageurs de seconde main, une supposition qui s'est révélée globalement juste dans l'esprit, puisque les eaux de fonte du Rwenzori alimentent bien, à terme, le système du Nil via le lac Albert.|2世紀の地理学者プトレマイオスは、旅行者からの又聞きの情報をもとにこの山地をナイル川の水源として記した。この推測は、ルウェンゾリの雪解け水が実際にアルバート湖を経てナイル水系へ流れ込むという意味では、おおむね的を射ていたことになる。",
  ),
  q(
    6,
    "Which explorer is usually credited with being the first European to identify Lake Victoria as a source of the Nile, in 1858, a claim disputed for years by a rival explorer?|¿A qué explorador se suele atribuir haber sido el primer europeo en identificar el lago Victoria como fuente del Nilo, en 1858, afirmación disputada durante años por un explorador rival?|Quel explorateur est généralement crédité d'avoir été le premier Européen à identifier le lac Victoria comme source du Nil, en 1858, une affirmation contestée pendant des années par un explorateur rival ?|1858年、ヴィクトリア湖をナイル川の水源だと初めて見抜いたヨーロッパ人とされる探検家(その主張は長年ライバルの探検家に異議を唱えられた)は?",
    ["John Hanning Speke|John Hanning Speke|John Hanning Speke|ジョン・ハニング・スピーク", "David Livingstone|David Livingstone|David Livingstone|デイヴィッド・リヴィングストン", "Henry Morton Stanley|Henry Morton Stanley|Henry Morton Stanley|ヘンリー・モートン・スタンリー"],
    0,
    "Speke's claim was challenged for years by fellow explorer Richard Burton; the dispute was only settled after Speke died in a shooting accident, possibly a suicide, on the very day the two men were due to publicly debate it.|La afirmación de Speke fue cuestionada durante años por su colega explorador Richard Burton; la disputa solo se resolvió después de que Speke muriera en un accidente de tiro, posiblemente un suicidio, el mismo día en que ambos debían debatirlo públicamente.|L'affirmation de Speke fut contestée pendant des années par son collègue explorateur Richard Burton ; le différend ne fut réglé qu'après la mort de Speke dans un accident de tir, peut-être un suicide, le jour même où les deux hommes devaient en débattre publiquement.|スピークの主張は、同じ探検家仲間のリチャード・バートンによって長年異議を唱えられていた。この論争が決着したのは、二人が公開討論を行うはずだったまさにその日、スピークが発砲事故(自殺の可能性もある)で死亡したあとのことだった。",
  ),
  q(
    5,
    "Henry Morton Stanley became famous for finding a supposedly lost missionary-explorer near Lake Tanganyika in 1871, reportedly greeting him with which now-famous phrase?|Henry Morton Stanley se hizo famoso por encontrar a un misionero-explorador supuestamente perdido cerca del lago Tanganica en 1871, al que según se dice saludó con ¿qué frase hoy famosa?|Henry Morton Stanley devint célèbre pour avoir retrouvé un missionnaire-explorateur que l'on croyait perdu, près du lac Tanganyika en 1871, en le saluant, dit-on, par quelle phrase aujourd'hui célèbre ?|1871年、タンガニーカ湖付近で行方不明とされていた宣教師兼探検家を発見し有名になったヘンリー・モートン・スタンリーが、その人物にかけたと伝えられる、いまや有名な言葉は?",
    ["'Dr. Livingstone, I presume?'|'¿El doctor Livingstone, supongo?'|« Docteur Livingstone, je présume ? »|「リヴィングストン博士でいらっしゃいますか?」", "'At last, we meet.'|'Por fin nos encontramos.'|« Enfin, nous nous rencontrons. »|「ついにお会いできましたね」", "'The doctor, I take it?'|'¿El doctor, supongo?'|« Le docteur, si je ne m'abuse ? »|「先生でいらっしゃいますね?」"],
    0,
    "The line's authenticity is disputed, since it does not appear in Livingstone's own diary of the meeting, and some historians believe Stanley invented or embellished it later for his book.|La autenticidad de la frase se cuestiona, ya que no aparece en el propio diario de Livingstone sobre el encuentro, y algunos historiadores creen que Stanley la inventó o la adornó después para su libro.|L'authenticité de la phrase est contestée, car elle n'apparaît pas dans le propre journal de Livingstone relatant la rencontre, et certains historiens pensent que Stanley l'a inventée ou enjolivée plus tard pour son livre.|この言葉の真偽には疑いが持たれている。リヴィングストン自身がこの会見について記した日記にはこの一言が見当たらず、スタンリーが後年、著書のために創作あるいは脚色したのではないかと見る歴史家もいる。",
  ),
  q(
    7,
    "Zimbabwe's controversial land reform programme, beginning in 2000, saw the forced seizure of thousands of white-owned commercial farms. What was its officially stated aim?|El controvertido programa de reforma agraria de Zimbabue, iniciado en 2000, vio la confiscación forzosa de miles de granjas comerciales de propietarios blancos. ¿Cuál era su objetivo declarado oficialmente?|Le programme controversé de réforme agraire du Zimbabwe, débuté en 2000, vit la saisie forcée de milliers de fermes commerciales appartenant à des Blancs. Quel en était l'objectif officiellement déclaré ?|2000年に始まったジンバブエの物議を醸す土地改革は、白人所有の商業農場数千か所の強制接収を伴った。その公式に掲げられた目的は?",
    ["Redistributing land to Black Zimbabweans|Redistribuir la tierra entre los zimbabuenses negros|Redistribuer les terres aux Zimbabwéens noirs|土地を黒人ジンバブエ人に再分配すること", "Expanding national parks|Ampliar los parques nacionales|Étendre les parcs nationaux|国立公園を拡張すること", "Relocating overcrowded cities|Trasladar ciudades superpobladas|Déplacer des villes surpeuplées|過密な都市を移転させること"],
    0,
    "Economists widely blame the programme's chaotic execution for a collapse in agricultural output and the hyperinflation crisis that followed, though its supporters frame it as a necessary correction of colonial-era land seizures dating back to the 1890s.|Los economistas suelen culpar a la ejecución caótica del programa del colapso de la producción agrícola y de la crisis de hiperinflación que siguió, aunque sus defensores lo presentan como una corrección necesaria de las confiscaciones de tierras de la época colonial, que se remontan a la década de 1890.|Les économistes imputent largement l'exécution chaotique du programme à l'effondrement de la production agricole et à la crise d'hyperinflation qui suivit, bien que ses partisans le présentent comme une correction nécessaire des saisies de terres de l'époque coloniale, remontant aux années 1890.|経済学者の多くは、この計画の混乱した実施が農業生産の崩壊とその後のハイパーインフレ危機を招いたと指摘する。一方、支持者たちはこれを1890年代にまでさかのぼる植民地時代の土地収奪を正すために必要な措置だったと位置づけている。",
  ),
  q(
    5,
    "Which country hosted the first FIFA World Cup ever held on African soil, in 2010?|¿Qué país acogió la primera Copa Mundial de la FIFA celebrada en suelo africano, en 2010?|Quel pays a accueilli la toute première Coupe du monde de la FIFA organisée sur le sol africain, en 2010 ?|2010年、アフリカの地で初めて開催されたFIFAワールドカップの開催国は?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Egypt|Egipto|L'Égypte|エジプト", "Morocco|Marruecos|Le Maroc|モロッコ"],
    0,
    "South Africa built or extensively renovated ten stadiums for the tournament, including Soccer City in Johannesburg, whose exterior was designed to evoke a traditional African calabash pot.|Sudáfrica construyó o renovó ampliamente diez estadios para el torneo, incluido el Soccer City de Johannesburgo, cuyo exterior se diseñó para evocar una calabaza tradicional africana.|L'Afrique du Sud construisit ou rénova en profondeur dix stades pour le tournoi, dont le Soccer City de Johannesburg, dont l'extérieur fut conçu pour évoquer une calebasse africaine traditionnelle.|南アフリカはこの大会のために10のスタジアムを新設または大規模改修した。その一つ、ヨハネスブルグのサッカー・シティは、伝統的なアフリカのヒョウタン容器を思わせる外観にデザインされている。",
  ),
  q(
    7,
    "Which country was the launch site in 2007 for M-Pesa, a mobile-money system that let people transfer cash by basic phone text message without needing a bank account?|¿Qué país fue el lugar de lanzamiento en 2007 de M-Pesa, un sistema de dinero móvil que permitía transferir efectivo por SMS de teléfono básico sin necesitar cuenta bancaria?|Quel pays fut le lieu de lancement en 2007 de M-Pesa, un système d'argent mobile permettant de transférer de l'argent par simple SMS sans avoir besoin de compte bancaire ?|銀行口座を持たなくても基本的な携帯電話のショートメッセージで送金できるモバイルマネー、M-Pesaが2007年に発足した国は?",
    ["Kenya|Kenia|Le Kenya|ケニア", "Nigeria|Nigeria|Le Nigeria|ナイジェリア", "South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ"],
    0,
    "Launched by the mobile network operator Safaricom, M-Pesa grew so widely used that mobile-money transactions came to be worth a share of Kenya's economy far beyond what mobile money achieved almost anywhere else at the time, and the model has since been copied in dozens of other countries.|Lanzado por el operador móvil Safaricom, M-Pesa se volvió tan usado que las transacciones de dinero móvil llegaron a valer una parte de la economía keniana muy superior a lo logrado por el dinero móvil en casi cualquier otro lugar de la época, y el modelo se ha copiado desde entonces en decenas de países.|Lancé par l'opérateur mobile Safaricom, M-Pesa devint si largement utilisé que les transactions d'argent mobile en vinrent à représenter une part de l'économie kényane bien supérieure à ce que l'argent mobile atteignait presque partout ailleurs à l'époque, et le modèle a depuis été copié dans des dizaines d'autres pays.|携帯通信会社サファリコムが立ち上げたM-Pesaはあまりに広く使われるようになり、モバイルマネーによる取引額はケニア経済に占める割合として当時世界のほぼどこよりも突出した規模になった。この仕組みはその後、何十もの国で模倣されている。",
  ),
  q(
    6,
    "'Apartheid,' the name for South Africa's system of institutionalised racial segregation, is a word from which language, meaning roughly 'apartness'?|El 'apartheid', nombre del sistema de segregación racial institucionalizada de Sudáfrica, es una palabra de ¿qué lengua, que significa aproximadamente 'separación'?|« L'apartheid », nom du système de ségrégation raciale institutionnalisée en Afrique du Sud, est un mot issu de quelle langue, signifiant à peu près « séparation » ?|南アフリカの制度化された人種隔離政策を指す「アパルトヘイト」は、どの言語に由来し、「離れていること」を意味するか?",
    ["Afrikaans|El afrikáans|L'afrikaans|アフリカーンス語", "Zulu|El zulú|Le zoulou|ズールー語", "Portuguese|El portugués|Le portugais|ポルトガル語"],
    0,
    "Afrikaans developed mainly from 17th-century Dutch brought by settlers, and 'apartheid' became the formal name of the policy after the National Party, which coined and championed the term, came to power in 1948.|El afrikáans se desarrolló principalmente a partir del neerlandés del siglo XVII traído por los colonos, y 'apartheid' se convirtió en el nombre formal de la política después de que el Partido Nacional, que acuñó y promovió el término, llegara al poder en 1948.|L'afrikaans s'est développé principalement à partir du néerlandais du XVIIe siècle apporté par les colons, et « apartheid » devint le nom officiel de la politique après l'arrivée au pouvoir en 1948 du Parti national, qui avait forgé et défendu ce terme.|アフリカーンス語は主に17世紀に入植者たちが持ち込んだオランダ語から発展した言語である。「アパルトヘイト」は、この語を作り推し進めた国民党が1948年に政権を握ったのち、この政策の正式名称になった。",
  ),
  q(
    8,
    "The Herero and Nama genocide, only formally recognised and apologised for by Germany in 2021, took place in the early 1900s in what is now which country?|El genocidio herero y nama, solo reconocido y disculpado formalmente por Alemania en 2021, tuvo lugar a principios del siglo XX en lo que hoy es ¿qué país?|Le génocide des Hereros et des Namas, formellement reconnu et pour lequel l'Allemagne ne s'est excusée qu'en 2021, eut lieu au début des années 1900 dans ce qui est aujourd'hui quel pays ?|ドイツが正式に認め謝罪したのが2021年になってからだったヘレロ人・ナマ人の虐殺は、1900年代初め、現在のどの国で起きたか?",
    ["Namibia|Namibia|La Namibie|ナミビア", "Tanzania|Tanzania|La Tanzanie|タンザニア", "Cameroon|Camerún|Le Cameroun|カメルーン"],
    0,
    "German colonial forces killed tens of thousands of Herero and Nama people in German South West Africa between 1904 and 1908, driving many into the Omaheke desert to die of thirst, in what historians increasingly describe as the 20th century's first genocide.|Las fuerzas coloniales alemanas mataron a decenas de miles de hereros y namas en el África Sudoccidental Alemana entre 1904 y 1908, empujando a muchos al desierto de Omaheke a morir de sed, en lo que los historiadores describen cada vez más como el primer genocidio del siglo XX.|Les forces coloniales allemandes tuèrent des dizaines de milliers de Hereros et de Namas dans le Sud-Ouest africain allemand entre 1904 et 1908, en poussant beaucoup vers le désert de l'Omaheke pour y mourir de soif, dans ce que les historiens décrivent de plus en plus comme le premier génocide du XXe siècle.|1904年から1908年にかけて、ドイツ植民地当局はドイツ領南西アフリカでヘレロ人とナマ人数万人を殺害し、多くをオマヘケ砂漠へ追いやって渇きで死なせた。歴史家たちはこれを「20世紀最初のジェノサイド」と評することが増えている。",
  ),
  q(
    8,
    "Which Ethiopian language, spoken by tens of millions of people, is written in its own unique script called Ge'ez, one of the few African writing systems developed independently rather than adapted from Arabic or Latin?|¿Qué lengua etíope, hablada por decenas de millones de personas, se escribe en su propia escritura única llamada ge'ez, uno de los pocos sistemas de escritura africanos desarrollados de forma independiente en vez de adaptados del árabe o el latín?|Quelle langue éthiopienne, parlée par des dizaines de millions de personnes, s'écrit dans sa propre écriture unique appelée guèze, l'un des rares systèmes d'écriture africains développés indépendamment plutôt qu'adaptés de l'arabe ou du latin ?|数千万人が話す、アラビア文字やラテン文字を借用せず独自に発展した数少ないアフリカの文字体系の一つ、ゲエズ文字で書かれるエチオピアの言語は?",
    ["Amharic|El amárico|L'amharique|アムハラ語", "Oromo|El oromo|L'oromo|オロモ語", "Somali|El somalí|Le somali|ソマリ語"],
    0,
    "The Ge'ez script, also called Ethiopic, is one of the oldest alphabets still in continuous use anywhere in the world, and it is written left to right, unlike the Semitic scripts of Arabic and Hebrew to which it is historically related.|La escritura ge'ez, también llamada etiópica, es uno de los alfabetos más antiguos aún en uso continuo en el mundo, y se escribe de izquierda a derecha, a diferencia de las escrituras semíticas del árabe y el hebreo con las que está históricamente emparentada.|L'écriture guèze, aussi appelée éthiopienne, est l'un des plus anciens alphabets encore en usage continu au monde, et elle s'écrit de gauche à droite, contrairement aux écritures sémitiques de l'arabe et de l'hébreu auxquelles elle est historiquement apparentée.|ゲエズ文字(エチオピア文字とも呼ばれる)は、世界でいまも使われ続けている文字の中でも最古級のものである。歴史的に近縁であるアラビア文字やヘブライ文字とは異なり、左から右へ書く。",
  ),
  q(
    7,
    "Which mineral, refined into tantalum and essential for capacitors in nearly every smartphone and laptop, is mined heavily in DR Congo and sometimes called a 'conflict mineral' for its role funding armed groups?|¿Qué mineral, que se refina en tantalio y es esencial para los condensadores de casi todos los smartphones y portátiles, se extrae mucho en la RD Congo y a veces se llama 'mineral de conflicto' por su papel en financiar grupos armados?|Quel minerai, raffiné en tantale et essentiel aux condensateurs de presque tous les smartphones et ordinateurs portables, est massivement extrait en RD Congo et parfois appelé « minerai de conflit » pour son rôle dans le financement de groupes armés?|タンタルに精製され、ほぼすべてのスマートフォンやノートパソコンのコンデンサーに欠かせない、コンゴ民主共和国で盛んに採掘され、武装勢力の資金源になることから「紛争鉱物」と呼ばれることもある鉱物は?",
    ["Coltan|El coltán|Le coltan|コルタン", "Bauxite|La bauxita|La bauxite|ボーキサイト", "Nickel|El níquel|Le nickel|ニッケル"],
    0,
    "International efforts to trace 'conflict-free' coltan supply chains, including US legislation passed in 2010, have had mixed success, and small-scale artisanal miners in eastern DR Congo's conflict-affected provinces still supply much of the world's coltan.|Los esfuerzos internacionales por rastrear cadenas de suministro de coltán 'libres de conflicto', incluida una ley estadounidense aprobada en 2010, han tenido un éxito desigual, y pequeños mineros artesanales en las provincias afectadas por conflictos del este de la RD Congo siguen suministrando buena parte del coltán mundial.|Les efforts internationaux pour tracer des chaînes d'approvisionnement en coltan « sans conflit », dont une loi américaine adoptée en 2010, ont eu un succès mitigé, et de petits mineurs artisanaux dans les provinces de l'est de la RD Congo touchées par les conflits fournissent encore une grande partie du coltan mondial.|2010年に成立したアメリカの法律を含め、「紛争と無縁な」コルタン供給網を追跡する国際的な取り組みは効果が入り混じっており、コンゴ民主共和国東部の紛争の影響を受ける州の零細な採掘者たちが、いまも世界のコルタンの多くを供給し続けている。",
  ),
  q(
    7,
    "The 1955 Bandung Conference and the subsequent founding of the Non-Aligned Movement were championed partly by which Egyptian president, alongside leaders like India's Nehru and Indonesia's Sukarno?|La Conferencia de Bandung de 1955 y la posterior fundación del Movimiento de Países No Alineados fueron impulsadas en parte por ¿qué presidente egipcio, junto a líderes como Nehru de India y Sukarno de Indonesia?|La conférence de Bandung de 1955 et la fondation ultérieure du Mouvement des non-alignés furent en partie portées par quel président égyptien, aux côtés de dirigeants comme Nehru en Inde et Sukarno en Indonésie ?|1955年のバンドン会議と、それに続く非同盟運動の設立を、インドのネルーやインドネシアのスカルノとともに推し進めたエジプト大統領は?",
    ["Gamal Abdel Nasser|Gamal Abdel Nasser|Gamal Abdel Nasser|ガマール・アブドゥル=ナーセル", "Anwar Sadat|Anwar Sadat|Anouar el-Sadate|アンワル・サダト", "Hosni Mubarak|Hosni Mubarak|Hosni Moubarak|ホスニー・ムバーラク"],
    0,
    "Nasser positioned Egypt as a leader of newly independent, formerly colonised nations trying to avoid taking sides in the Cold War, a stance that also fed into his growing rivalry with Western powers over the Suez Canal the following year.|Nasser posicionó a Egipto como líder de las naciones recién independizadas y antes colonizadas que trataban de no tomar partido en la Guerra Fría, una postura que también alimentó su creciente rivalidad con las potencias occidentales por el canal de Suez al año siguiente.|Nasser positionna l'Égypte comme chef de file des nations nouvellement indépendantes et anciennement colonisées cherchant à ne pas prendre parti dans la guerre froide, une posture qui alimenta aussi sa rivalité croissante avec les puissances occidentales au sujet du canal de Suez l'année suivante.|ナーセルは、冷戦でどちらの陣営にも与しようとしない新独立の旧植民地諸国の先頭にエジプトを位置づけた。この姿勢は、翌年に激化するスエズ運河をめぐる西側諸国との対立にもつながっていった。",
  ),
  q(
    8,
    "Which African country's flag colours — red, yellow and green — predate the 20th century and later inspired dozens of other African flags after independence, becoming known as the 'Pan-African colours'?|¿Los colores de la bandera de qué país africano —rojo, amarillo y verde— son anteriores al siglo XX y más tarde inspiraron decenas de otras banderas africanas tras la independencia, llegando a conocerse como los 'colores panafricanos'?|Les couleurs du drapeau de quel pays africain — rouge, jaune et vert — sont antérieures au XXe siècle et ont plus tard inspiré des dizaines d'autres drapeaux africains après l'indépendance, devenant les « couleurs panafricaines » ?|20世紀より前から使われていた赤・黄・緑の国旗の色が、独立後に他の何十ものアフリカの国旗に影響を与え「パン・アフリカ・カラー」と呼ばれるようになった国は?",
    ["Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Ghana|Ghana|Le Ghana|ガーナ", "Liberia|Liberia|Le Liberia|リベリア"],
    0,
    "Because Ethiopia was one of the only African nations never colonised, its flag colours carried special prestige after the Battle of Adwa; Ghana became the first sub-Saharan country to adopt similar colours on gaining independence in 1957, and many others followed.|Como Etiopía fue una de las pocas naciones africanas nunca colonizadas, los colores de su bandera cobraron un prestigio especial tras la batalla de Adua; Ghana se convirtió en el primer país subsahariano en adoptar colores similares al independizarse en 1957, y muchos otros lo siguieron.|Comme l'Éthiopie fut l'une des seules nations africaines jamais colonisées, les couleurs de son drapeau acquirent un prestige particulier après la bataille d'Adoua ; le Ghana devint le premier pays subsaharien à adopter des couleurs similaires lors de son indépendance en 1957, suivi par beaucoup d'autres.|エチオピアはヨーロッパに植民地化されたことのない数少ないアフリカの国の一つだったため、アドワの戦い以降その国旗の色は特別な威信を帯びるようになった。1957年の独立に際して同じ系統の色を採用した最初のサハラ以南の国がガーナで、その後多くの国が続いた。",
  ),
  q(
    9,
    "South Africa's national anthem, finalised in 1997, is unusual worldwide for combining verses in how many different languages within a single song?|El himno nacional de Sudáfrica, finalizado en 1997, es inusual en el mundo por combinar versos en ¿cuántas lenguas distintas dentro de una sola canción?|L'hymne national de l'Afrique du Sud, finalisé en 1997, est inhabituel dans le monde car il combine des couplets dans combien de langues différentes au sein d'une seule chanson?|1997年に完成した南アフリカの国歌は、一つの曲の中にいくつの異なる言語の歌詞を組み込んでいる点で世界的にも珍しいか?",
    ["Three|Tres|Trois|3つ", "Five|Cinco|Cinq|5つ", "Seven|Siete|Sept|7つ"],
    1,
    "The anthem stitches together the Xhosa/Zulu/Sesotho hymn 'Nkosi Sikelel' iAfrika' with a reworked Afrikaans and English section drawn from the former apartheid-era anthem 'Die Stem,' a deliberate act of musical reconciliation between the country's old and new eras.|El himno entrelaza el cántico xhosa/zulú/sesoto 'Nkosi Sikelel' iAfrika' con una sección reelaborada en afrikáans e inglés tomada del antiguo himno de la era del apartheid 'Die Stem', un acto deliberado de reconciliación musical entre la vieja y la nueva era del país.|L'hymne entrelace le cantique xhosa/zoulou/sesotho « Nkosi Sikelel' iAfrika » avec une section remaniée en afrikaans et en anglais tirée de l'ancien hymne de l'ère de l'apartheid « Die Stem », un acte délibéré de réconciliation musicale entre l'ancienne et la nouvelle ère du pays.|この国歌は、コーサ語・ズールー語・セソト語による賛歌「ンコシ・シケレリ・アフリカ」と、アパルトヘイト時代の旧国歌「ディ・ステム」から取られ書き直されたアフリカーンス語・英語の部分を縫い合わせている。これは、この国の旧時代と新時代を音楽で和解させようとする意図的な試みだった。",
  ),
  q(
    9,
    "The 1974 'Rumble in the Jungle' boxing match between Muhammad Ali and George Foreman was held in the capital of which country, financed substantially by its ruler as a prestige project?|El combate de boxeo de 1974 'Rumble in the Jungle' entre Muhammad Ali y George Foreman se celebró en la capital de ¿qué país, financiado en gran parte por su gobernante como proyecto de prestigio?|Le combat de boxe de 1974 « Rumble in the Jungle » entre Mohamed Ali et George Foreman se tint dans la capitale de quel pays, financé en grande partie par son dirigeant comme projet de prestige ?|1974年、モハメド・アリとジョージ・フォアマンによるボクシングの一戦「ランブル・イン・ザ・ジャングル」が、統治者が威信をかけて多額の資金を投じたある国の首都で開催された。その国は?",
    ["Zaire (now DR Congo)|Zaire (hoy RD Congo)|Le Zaïre (aujourd'hui RD Congo)|ザイール(現コンゴ民主共和国)", "Zambia|Zambia|La Zambie|ザンビア", "Senegal|Senegal|Le Sénégal|セネガル"],
    0,
    "Promoted by Don King and held in Kinshasa, the fight drew a reported 60,000 spectators to the Stade du 20 Mai, part of dictator Mobutu Sese Seko's effort to showcase Zaire on the world stage.|Promovido por Don King y celebrado en Kinshasa, el combate atrajo a unos 60.000 espectadores reportados al Stade du 20 Mai, parte del esfuerzo del dictador Mobutu Sese Seko por mostrar a Zaire en el escenario mundial.|Promu par Don King et tenu à Kinshasa, le combat attira quelque 60 000 spectateurs rapportés au Stade du 20 Mai, dans le cadre des efforts du dictateur Mobutu Sese Seko pour mettre le Zaïre en vitrine sur la scène mondiale.|ドン・キングが興行し、キンシャサで行われたこの試合には、報じられたところでは2万メートル競技場に約6万人の観客が詰めかけた。独裁者モブツ・セセ・セコがザイールを世界の舞台に見せつけようとした取り組みの一環だった。",
  ),
  q(
    9,
    "Ghana's independence hero and first president, Kwame Nkrumah, was overthrown in a 1966 coup while on a state visit to which two countries?|El héroe de la independencia de Ghana y primer presidente, Kwame Nkrumah, fue derrocado en un golpe de 1966 mientras estaba de visita de Estado en ¿qué dos países?|Le héros de l'indépendance du Ghana et premier président, Kwame Nkrumah, fut renversé lors d'un coup d'État en 1966 alors qu'il effectuait une visite d'État dans quels deux pays ?|ガーナ独立の英雄で初代大統領クワメ・ンクルマは、1966年のクーデターで失脚したが、そのときどの二国を公式訪問中だったか?",
    ["China and North Vietnam|China y Vietnam del Norte|La Chine et le Nord-Vietnam|中国と北ベトナム", "France and Algeria|Francia y Argelia|La France et l'Algérie|フランスとアルジェリア", "The Soviet Union and Cuba|La Unión Soviética y Cuba|L'Union soviétique et Cuba|ソ連とキューバ"],
    0,
    "The coup, which historians widely describe as covertly encouraged by the CIA amid Cold War anxiety over Nkrumah's socialist leanings and pan-Africanist ambitions, ended his rule for good; exiled in Guinea, he died in 1972 in Bucharest, Romania, where he had been sent for cancer treatment unavailable at home.|El golpe, que los historiadores describen ampliamente como alentado en secreto por la CIA en medio de la inquietud de la Guerra Fría por las inclinaciones socialistas y las ambiciones panafricanistas de Nkrumah, puso fin definitivo a su gobierno; exiliado en Guinea, murió en 1972 en Bucarest, Rumanía, adonde lo habían enviado para un tratamiento contra el cáncer que no podía recibir en su país de acogida.|Le coup d'État, que les historiens décrivent largement comme secrètement encouragé par la CIA dans un contexte d'inquiétude de la guerre froide face aux penchants socialistes et aux ambitions panafricanistes de Nkrumah, mit fin pour de bon à son règne ; exilé en Guinée, il mourut en 1972 à Bucarest, en Roumanie, où il avait été envoyé pour un traitement contre le cancer indisponible sur place.|このクーデターは、ンクルマの社会主義的傾向と汎アフリカ主義的な野心に対する冷戦下の懸念からCIAが密かに後押ししたと歴史家の多くが見ており、彼の統治に終止符を打った。ギニアへ亡命した彼は、亡命先では受けられなかったがんの治療のために送られたルーマニアのブカレストで、1972年に世を去った。",
  ),
  q(
    9,
    "The Battle of Adwa in 1896, one of the only clear victories by an African army over a European colonial power during the Scramble for Africa, forced Italy to recognise Ethiopian independence. Who led the victorious Ethiopian forces?|La batalla de Adua de 1896, una de las pocas victorias claras de un ejército africano sobre una potencia colonial europea durante el reparto de África, obligó a Italia a reconocer la independencia etíope. ¿Quién lideró a las fuerzas etíopes victoriosas?|La bataille d'Adoua en 1896, l'une des seules victoires nettes d'une armée africaine sur une puissance coloniale européenne pendant la ruée vers l'Afrique, contraignit l'Italie à reconnaître l'indépendance éthiopienne. Qui dirigeait les forces éthiopiennes victorieuses ?|アフリカ分割の時代、アフリカの軍隊がヨーロッパの植民地勢力に対して収めた数少ない明確な勝利の一つ、1896年のアドワの戦いはイタリアにエチオピアの独立を認めさせた。この勝利を導いたエチオピア軍の指導者は?",
    ["Emperor Menelik II|El emperador Menelik II|L'empereur Ménélik II|メネリク2世皇帝", "Emperor Haile Selassie|El emperador Haile Selassie|L'empereur Hailé Sélassié|ハイレ・セラシエ皇帝", "Emperor Tewodros II|El emperador Tewodros II|L'empereur Tewodros II|テオドロス2世皇帝"],
    0,
    "Menelik's forces significantly outnumbered the Italians and were partly equipped with modern rifles obtained through arms deals with European powers including France and Russia, inflicting a defeat that led to the Treaty of Addis Ababa later that year.|Las fuerzas de Menelik superaban ampliamente en número a las italianas y estaban parcialmente equipadas con fusiles modernos obtenidos mediante acuerdos armamentísticos con potencias europeas como Francia y Rusia, infligiendo una derrota que llevó al Tratado de Adís Abeba ese mismo año.|Les forces de Ménélik surpassaient largement en nombre les Italiens et étaient en partie équipées de fusils modernes obtenus par des accords d'armement avec des puissances européennes dont la France et la Russie, infligeant une défaite qui mena au traité d'Addis-Abeba plus tard cette année-là.|メネリクの軍勢はイタリア側を大きく上回る人数を擁し、フランスやロシアなどヨーロッパ列強との武器取引で得た近代的なライフルの一部も装備していた。この敗北を受けて、同年のうちにアディスアベバ条約が結ばれた。",
  ),
  q(
    9,
    "In 1896, Britain and the Sultanate of Zanzibar fought what is recorded as the shortest war in history. Roughly how long did it last?|En 1896, Gran Bretaña y el sultanato de Zanzíbar libraron lo que se registra como la guerra más corta de la historia. ¿Aproximadamente cuánto duró?|En 1896, la Grande-Bretagne et le sultanat de Zanzibar se livrèrent ce qui est enregistré comme la plus courte guerre de l'histoire. Elle a duré environ combien de temps ?|1896年、イギリスとザンジバル・スルタン国は、記録に残る中で史上最短とされる戦争を戦った。その長さはおよそどれくらいだったか?",
    ["About 38 minutes|Unos 38 minutos|Environ 38 minutes|およそ38分間", "About 2 hours|Unas 2 horas|Environ 2 heures|およそ2時間", "About 1 day|Aproximadamente 1 día|Environ 1 jour|およそ1日間"],
    0,
    "The war broke out after a rival claimant seized the palace following the pro-British sultan's death without British approval; the Royal Navy bombarded the palace until the new sultan surrendered, in a conflict Guinness World Records lists as lasting just 38 minutes.|La guerra estalló cuando un aspirante rival tomó el palacio tras la muerte del sultán projobritánico sin la aprobación británica; la Marina Real bombardeó el palacio hasta que el nuevo sultán se rindió, en un conflicto que el Guinness World Records registra como de solo 38 minutos.|La guerre éclata lorsqu'un prétendant rival s'empara du palais après la mort du sultan pro-britannique, sans l'aval britannique ; la Royal Navy bombarda le palais jusqu'à la reddition du nouveau sultan, dans un conflit que le Guinness World Records recense comme n'ayant duré que 38 minutes.|親英派のスルタンが死去したあと、イギリスの承認を得ないまま対立候補が宮殿を占拠したことでこの戦争は始まった。イギリス海軍は新しいスルタンが降伏するまで宮殿を砲撃し続けた。ギネス世界記録はこの戦争をわずか38分間と記録している。",
  ),
  q(
    9,
    "The Aouzou Strip, a resource-rich border area fought over by Libya and Chad for decades, including the 1987 conflict nicknamed the 'Toyota War' for Chadian forces' use of pickup trucks against Libyan armour, was awarded to which country by the International Court of Justice in 1994?|La franja de Aouzou, una zona fronteriza rica en recursos disputada durante décadas entre Libia y Chad, incluido el conflicto de 1987 apodado 'guerra de los Toyota' por el uso de camionetas por las fuerzas chadianas contra los blindados libios, ¿a qué país se la adjudicó la Corte Internacional de Justicia en 1994?|La bande d'Aouzou, zone frontalière riche en ressources disputée pendant des décennies entre la Libye et le Tchad, y compris le conflit de 1987 surnommé « guerre des Toyota » pour l'usage par les forces tchadiennes de pick-up contre les blindés libyens, fut attribuée en 1994 par la Cour internationale de justice à quel pays ?|数十年にわたりリビアとチャドが争った資源豊かな国境地帯アウズー地帯(1987年の紛争は、チャド軍がリビアの装甲部隊に対しピックアップトラックを使ったことから「トヨタ戦争」と呼ばれた)は、1994年に国際司法裁判所によってどちらの国のものと裁定されたか?",
    ["Chad|Chad|Le Tchad|チャド", "Libya|Libia|La Libye|リビア", "Niger|Níger|Le Niger|ニジェール"],
    0,
    "The ICJ based its ruling largely on a 1955 treaty between France and Libya that had defined the border, and Libya, after decades of occupying the strip, withdrew its forces in compliance with the judgment.|La CIJ basó su fallo en gran medida en un tratado de 1955 entre Francia y Libia que había definido la frontera, y Libia, tras décadas ocupando la franja, retiró sus fuerzas en cumplimiento del fallo.|La CIJ fonda largement son jugement sur un traité de 1955 entre la France et la Libye ayant défini la frontière, et la Libye, après des décennies d'occupation de la bande, retira ses forces en application du jugement.|国際司法裁判所は主に、国境を定めた1955年のフランス・リビア間の条約を根拠に裁定を下した。数十年にわたりこの地帯を占領していたリビアは、判決に従って軍を撤退させた。",
  ),
  q(
    9,
    "For roughly two decades after Somalia's central government collapsed in 1991, the country's currency, the Somali shilling, kept circulating and holding value even without a functioning central bank. How was this possible?|Durante unas dos décadas después del colapso del gobierno central de Somalia en 1991, la moneda del país, el chelín somalí, siguió circulando y manteniendo su valor incluso sin un banco central en funcionamiento. ¿Cómo fue posible esto?|Pendant environ deux décennies après l'effondrement du gouvernement central somalien en 1991, la monnaie du pays, le shilling somalien, continua de circuler et de conserver sa valeur même sans banque centrale en état de fonctionner. Comment était-ce possible ?|1991年にソマリアの中央政府が崩壊してからおよそ20年間、中央銀行が機能しないままでも同国通貨ソマリア・シリングは流通し価値を保ち続けた。それはどのようにして可能だったのか?",
    ["Private dealers commissioned new notes from foreign printers|Comerciantes privados encargaron nuevos billetes a imprentas extranjeras|Des négociants privés commandèrent de nouveaux billets à des imprimeurs étrangers|民間業者が外国の印刷業者に新しい紙幣の発行を委託した", "The United Nations printed and distributed the currency|Naciones Unidas imprimió y distribuyó la moneda|L'ONU imprima et distribua la monnaie|国連が通貨を印刷し配布した", "Somalia switched entirely to gold coins|Somalia pasó por completo a monedas de oro|La Somalie passa entièrement aux pièces d'or|ソマリアは完全に金貨に切り替えた"],
    0,
    "With no central bank able to issue currency, private dealers stepped in to commission new banknotes from foreign printers to replace worn-out bills in circulation, an unusual case of a fiat currency persisting largely through public trust and habit rather than government backing.|Al no haber un banco central capaz de emitir moneda, comerciantes privados encargaron nuevos billetes a imprentas extranjeras para reemplazar los billetes desgastados en circulación, un caso inusual de moneda fiduciaria que persistió sobre todo por la confianza y el hábito del público más que por el respaldo del gobierno.|Faute de banque centrale capable d'émettre de la monnaie, des négociants privés commandèrent de nouveaux billets à des imprimeurs étrangers pour remplacer les billets usés en circulation, un cas inhabituel de monnaie fiduciaire perdurant surtout par la confiance et l'habitude du public plutôt que par un soutien gouvernemental.|通貨を発行できる中央銀行が存在しないなか、流通する使い古した紙幣を置き換えるため、民間の業者が外国の印刷業者に新しい紙幣の発行を委託した。政府の裏付けではなく、もっぱら人々の信頼と慣習によって不換紙幣が流通し続けた異例の事例である。",
  ),
  q(
    9,
    "Lake Chad, once one of Africa's largest lakes, has shrunk by more than 90% of its surface area since the 1960s due to climate change, irrigation demands and drought, a collapse widely linked to which armed group's recruitment among communities that lost their livelihoods?|El lago Chad, antes uno de los más grandes de África, ha encogido más del 90% de su superficie desde los años sesenta por el cambio climático, la demanda de riego y la sequía, un colapso vinculado ampliamente al reclutamiento de ¿qué grupo armado entre comunidades que perdieron su sustento?|Le lac Tchad, autrefois l'un des plus grands lacs d'Afrique, a perdu plus de 90 % de sa superficie depuis les années 1960 en raison du changement climatique, des besoins en irrigation et de la sécheresse, un effondrement largement associé au recrutement par quel groupe armé parmi les communautés ayant perdu leurs moyens de subsistance ?|かつてアフリカ有数の大きさを誇ったチャド湖は、気候変動・灌漑需要・干ばつにより1960年代以降、面積の9割以上を失った。この崩壊は、生計を失った地域社会からの勧誘に関連づけて広く語られる武装組織がある。それは?",
    ["Boko Haram|Boko Haram|Boko Haram|ボコ・ハラム", "Al-Shabaab|Al Shabab|Al-Shabaab|アル・シャバブ", "The Lord's Resistance Army|El Ejército de Resistencia del Señor|L'Armée de résistance du Seigneur|神の抵抗軍"],
    0,
    "Millions of people around the Lake Chad basin, spanning Chad, Nigeria, Niger and Cameroon, have been displaced as fishing and farming livelihoods collapsed, conditions researchers say the militant group Boko Haram has exploited for recruitment in the region.|Millones de personas en la cuenca del lago Chad, que abarca Chad, Nigeria, Níger y Camerún, se han desplazado al colapsar los medios de vida de la pesca y la agricultura, condiciones que, según los investigadores, el grupo militante Boko Haram ha explotado para reclutar en la región.|Des millions de personnes autour du bassin du lac Tchad, qui s'étend sur le Tchad, le Nigeria, le Niger et le Cameroun, ont été déplacées à mesure que les moyens de subsistance liés à la pêche et à l'agriculture s'effondraient, des conditions que les chercheurs disent avoir été exploitées par le groupe militant Boko Haram pour recruter dans la région.|チャド・ナイジェリア・ニジェール・カメルーンにまたがるチャド湖流域では、漁業や農業による生計が崩壊し、数百万人が住む場所を追われた。研究者たちは、こうした状況を武装組織ボコ・ハラムがこの地域での勧誘に利用してきたと指摘している。",
  ),
  q(
    10,
    "Francisco Macías Nguema, the first president of newly independent Equatorial Guinea, ruled from 1968 until being overthrown in 1979 by his own nephew. Roughly what share of the small country's population is estimated to have been killed or fled into exile during his rule?|Francisco Macías Nguema, primer presidente de la recién independizada Guinea Ecuatorial, gobernó desde 1968 hasta ser derrocado en 1979 por su propio sobrino. ¿Qué proporción aproximada de la pequeña población del país se calcula que murió o huyó al exilio durante su gobierno?|Francisco Macías Nguema, premier président de la Guinée équatoriale nouvellement indépendante, gouverna de 1968 jusqu'à son renversement en 1979 par son propre neveu. Quelle part environ de la petite population du pays aurait été tuée ou aurait fui en exil sous son règne ?|新独立の赤道ギニア初代大統領フランシスコ・マシアス・ンゲマは1968年から統治し、1979年に自分の甥によるクーデターで失脚した。彼の統治下で、この小さな国の人口のおよそどれくらいが殺害されるか国外へ逃れたと推定されているか?",
    ["About 5%|Aproximadamente el 5%|Environ 5 %|およそ5%", "About a third|Aproximadamente un tercio|Environ un tiers|およそ3分の1", "About half|Aproximadamente la mitad|Environ la moitié|およそ半分"],
    1,
    "His nephew and successor, Teodoro Obiang Nguema Mbasogo, who led the coup that ousted and executed him, has himself ruled continuously since 1979, making him one of the longest-serving heads of state anywhere in the world.|Su sobrino y sucesor, Teodoro Obiang Nguema Mbasogo, que lideró el golpe que lo derrocó y lo ejecutó, ha gobernado él mismo de forma ininterrumpida desde 1979, lo que lo convierte en uno de los jefes de Estado con más años en el poder del mundo.|Son neveu et successeur, Teodoro Obiang Nguema Mbasogo, qui dirigea le coup d'État l'ayant renversé et exécuté, gouverne lui-même sans interruption depuis 1979, ce qui fait de lui l'un des chefs d'État en exercice depuis le plus longtemps au monde.|彼を失脚させ処刑したクーデターを主導した甥で後継者のテオドロ・オビアン・ンゲマ・ンバソゴは、1979年から自身も途切れることなく統治を続けており、世界でも屈指の長期在任の国家元首となっている。",
  ),
  q(
    9,
    "Lesotho, an independent kingdom completely surrounded by South African territory, is one of only three countries in the world entirely enclosed within a single other country. Which of these is one of the other two?|Lesoto, un reino independiente completamente rodeado por territorio sudafricano, es uno de solo tres países del mundo totalmente rodeados por otro único país. ¿Cuál de estos es uno de los otros dos?|Le Lesotho, royaume indépendant entièrement entouré de territoire sud-africain, est l'un des trois seuls pays au monde complètement enclavés dans un autre pays. Lequel des éléments suivants est l'un des deux autres ?|完全に南アフリカ領に囲まれた独立王国レソトは、世界でただ3か国しかない「一つの国に完全に囲まれた国」の一つである。残り二つのうちの一つは?",
    ["San Marino|San Marino|Saint-Marin|サンマリノ", "Luxembourg|Luxemburgo|Le Luxembourg|ルクセンブルク", "Andorra|Andorra|Andorre|アンドラ"],
    0,
    "San Marino and Vatican City, both entirely surrounded by Italy, are the only other two; Luxembourg and Andorra, though small, each border more than one country.|San Marino y el Vaticano, ambos rodeados enteramente por Italia, son los otros dos únicos; Luxemburgo y Andorra, aunque pequeños, limitan cada uno con más de un país.|Saint-Marin et la Cité du Vatican, tous deux entièrement entourés par l'Italie, sont les deux seuls autres ; le Luxembourg et Andorre, bien que petits, ont chacun plus d'un pays voisin.|イタリアに完全に囲まれたサンマリノとバチカン市国が残る二つである。ルクセンブルクとアンドラは小さいながらも、それぞれ複数の国と国境を接している。",
  ),
  q(
    9,
    "Eswatini, formerly known as Swaziland, is one of the world's last remaining examples of which system of government, under which King Mswati III has held near-total executive power since 1986?|Esuatini, antes conocida como Suazilandia, es uno de los últimos ejemplos que quedan en el mundo de ¿qué sistema de gobierno, bajo el cual el rey Mswati III ha ostentado un poder ejecutivo casi total desde 1986?|L'Eswatini, autrefois appelé Swaziland, est l'un des derniers exemples au monde de quel système de gouvernement, sous lequel le roi Mswati III détient un pouvoir exécutif quasi total depuis 1986 ?|かつてスワジランドと呼ばれたエスワティニは、ムスワティ3世国王が1986年以来ほぼ全面的な行政権を握り続けている、世界でも数少ないある統治形態の生き残りである。それは何か?",
    ["An absolute monarchy|Una monarquía absoluta|Une monarchie absolue|絶対君主制", "A one-party communist state|Un estado comunista de partido único|Un État communiste à parti unique|一党共産主義国家", "A military junta|Una junta militar|Une junte militaire|軍事政権"],
    0,
    "Political parties remain banned from contesting elections for the national assembly, and pro-democracy protests in recent years have been met with harsh crackdowns, even as the king retains ceremonial popularity tied to traditions like the annual Umhlanga reed dance.|Los partidos políticos siguen prohibidos de competir en las elecciones a la asamblea nacional, y las protestas prodemocráticas de los últimos años se han encontrado con duras represiones, aunque el rey conserva una popularidad ceremonial ligada a tradiciones como la danza anual de los juncos Umhlanga.|Les partis politiques restent interdits de se présenter aux élections de l'assemblée nationale, et les manifestations prodémocratie de ces dernières années ont été réprimées durement, même si le roi conserve une popularité cérémonielle liée à des traditions comme la danse annuelle des roseaux Umhlanga.|国民議会選挙への政党の参加はいまも禁じられており、近年の民主化を求める抗議運動は厳しい弾圧を受けている。それでも国王は、毎年恒例の葦の踊り「ウムランガ」のような伝統に結びついた儀礼的な人気を保っている。",
  ),
  q(
    1,
    "Which two oceans meet at Africa's southern tip?|¿Qué dos océanos se encuentran en la punta sur de África?|Quels deux océans se rencontrent à la pointe sud de l'Afrique ?|アフリカ大陸の南端で出会う二つの海洋は?",
    ["The Atlantic and Indian Oceans|El Atlántico y el Índico|L'Atlantique et l'Indien|大西洋とインド洋", "The Pacific and Indian Oceans|El Pacífico y el Índico|Le Pacifique et l'Indien|太平洋とインド洋", "The Atlantic and Pacific Oceans|El Atlántico y el Pacífico|L'Atlantique et le Pacifique|大西洋と太平洋"],
    0,
    "The official meeting point is Cape Agulhas, Africa's true southernmost point, though the more famous Cape of Good Hope nearby is popularly, if inaccurately, treated as the dividing line between the two oceans.|El punto de encuentro oficial es el cabo de las Agujas, el verdadero punto más meridional de África, aunque el más famoso cabo de Buena Esperanza cercano se trata popularmente, aunque de forma inexacta, como la línea divisoria entre los dos océanos.|Le point de rencontre officiel est le cap des Aiguilles, véritable point le plus méridional de l'Afrique, bien que le plus célèbre cap de Bonne-Espérance, tout proche, soit populairement, quoique à tort, considéré comme la ligne de démarcation entre les deux océans.|公式な出会いの地点はアフリカ本当の最南端であるアガラス岬だが、近くにあるより有名な喜望峰のほうが、正確ではないものの、通俗的に二つの海洋を分ける境界として扱われることが多い。",
  ),
  q(
    2,
    "Which of these countries is not located in Africa?|¿Cuál de estos países no se encuentra en África?|Lequel de ces pays ne se trouve pas en Afrique ?|次のうち、アフリカに位置しない国はどれか?",
    ["Chad|Chad|Le Tchad|チャド", "Zambia|Zambia|La Zambie|ザンビア", "Bolivia|Bolivia|La Bolivie|ボリビア"],
    2,
    "Bolivia is a landlocked country in South America; Chad and Zambia are both landlocked African countries, which can make the three easy to mix up by name alone.|Bolivia es un país sin salida al mar en Sudamérica; Chad y Zambia son ambos países africanos sin salida al mar, lo que puede hacer fácil confundir a los tres solo por el nombre.|La Bolivie est un pays enclavé d'Amérique du Sud ; le Tchad et la Zambie sont tous deux des pays africains enclavés, ce qui peut faire confondre les trois rien qu'au nom.|ボリビアは南アメリカの内陸国である。チャドとザンビアはどちらもアフリカの内陸国で、名前だけでは三つを混同しやすい。",
  ),
  q(
    3,
    "The African penguin, the only penguin species native to the African continent, breeds along the coasts of South Africa and which other country?|El pingüino africano, la única especie de pingüino nativa del continente africano, cría en las costas de Sudáfrica y ¿qué otro país?|Le manchot du Cap, seule espèce de manchot native du continent africain, se reproduit sur les côtes de l'Afrique du Sud et de quel autre pays ?|アフリカ大陸原産の唯一のペンギンであるケープペンギンが、南アフリカともう一つどこの国の海岸で繁殖するか?",
    ["Namibia|Namibia|La Namibie|ナミビア", "Kenya|Kenia|Le Kenya|ケニア", "Egypt|Egipto|L'Égypte|エジプト"],
    0,
    "Cold, nutrient-rich currents off the coasts of South Africa and Namibia support the fish stocks the penguins depend on, but the population has crashed by over 90% in the past century, driven by overfishing, oil spills and habitat loss.|Las corrientes frías y ricas en nutrientes frente a las costas de Sudáfrica y Namibia sostienen las poblaciones de peces de las que dependen los pingüinos, pero la población se ha desplomado más del 90% en el último siglo por sobrepesca, vertidos de petróleo y pérdida de hábitat.|Des courants froids et riches en nutriments au large de l'Afrique du Sud et de la Namibie soutiennent les stocks de poissons dont dépendent les manchots, mais la population s'est effondrée de plus de 90 % au cours du siècle dernier, sous l'effet de la surpêche, des marées noires et de la perte d'habitat.|南アフリカとナミビアの沖合を流れる冷たく栄養豊かな海流が、ペンギンの生存を支える魚の資源を支えている。しかしこの100年で個体数は乱獲・原油流出・生息地の喪失により9割以上も激減した。",
  ),
  q(
    2,
    "Which of these big cats, native to Africa's open savannas, is the fastest land animal on Earth?|¿Cuál de estos grandes felinos, nativo de las sabanas abiertas de África, es el animal terrestre más rápido de la Tierra?|Lequel de ces grands félins, originaire des savanes ouvertes d'Afrique, est l'animal terrestre le plus rapide de la planète ?|アフリカの開けたサバンナに生息するこれらの大型ネコ科動物のうち、地球上最速の陸上動物はどれか?",
    ["The cheetah|El guepardo|Le guépard|チーター", "The leopard|El leopardo|Le léopard|ヒョウ", "The lion|El león|Le lion|ライオン"],
    0,
    "Cheetahs can reach speeds over 100km/h in short bursts, using an unusually flexible spine and non-retractable claws for grip, but they can sustain that speed for only around 20-30 seconds before overheating.|Los guepardos pueden alcanzar velocidades superiores a 100 km/h en ráfagas cortas, gracias a una columna vertebral inusualmente flexible y garras no retráctiles para agarre, pero solo pueden mantener esa velocidad durante unos 20-30 segundos antes de sobrecalentarse.|Les guépards peuvent atteindre des vitesses supérieures à 100 km/h sur de courtes distances, grâce à une colonne vertébrale exceptionnellement souple et des griffes non rétractiles pour l'adhérence, mais ils ne peuvent maintenir cette vitesse que 20 à 30 secondes avant de surchauffer.|チーターは短距離なら時速100kmを超える速度を出せる。異例に柔軟な背骨と、地面をつかむための引っ込まない爪がその力を支えるが、体温上昇のためこの速度を維持できるのはわずか20〜30秒ほどである。",
  ),
  q(
    2,
    "The ostrich, native to Africa, cannot fly but is the largest living species of what kind of animal?|El avestruz, nativo de África, no puede volar, pero es la especie viva más grande de ¿qué tipo de animal?|L'autruche, originaire d'Afrique, ne peut pas voler mais est la plus grande espèce vivante de quel type d'animal ?|アフリカ原産のダチョウは飛べないが、現生する何という種類の動物としては最大か?",
    ["Bird|Ave|Oiseau|鳥", "Reptile|Reptil|Reptile|爬虫類", "Rodent|Roedor|Rongeur|げっ歯類"],
    0,
    "Ostriches are the fastest-running birds on Earth, capable of over 70km/h, and they lay the largest eggs of any living bird, each weighing as much as two dozen chicken eggs combined.|Los avestruces son las aves más veloces corriendo de la Tierra, capaces de superar los 70 km/h, y ponen los huevos más grandes de cualquier ave viva, cada uno con un peso equivalente al de dos docenas de huevos de gallina juntos.|Les autruches sont les oiseaux les plus rapides à la course sur Terre, capables de dépasser 70 km/h, et elles pondent les plus gros œufs de tous les oiseaux vivants, chacun pesant l'équivalent d'environ deux douzaines d'œufs de poule réunis.|ダチョウは地球上で最も速く走れる鳥で、時速70kmを超える速さを出せる。現生するどの鳥よりも大きな卵を産み、その一個はニワトリの卵およそ2ダース分の重さに相当する。",
  ),
  q(
    3,
    "Which African country's flag features a black star at its centre, a symbol of African emancipation later echoed on other newly independent nations' flags?|¿La bandera de qué país africano lleva una estrella negra en el centro, símbolo de la emancipación africana luego reflejado en las banderas de otras naciones recién independizadas?|Le drapeau de quel pays africain arbore une étoile noire en son centre, symbole de l'émancipation africaine repris plus tard sur les drapeaux d'autres nations nouvellement indépendantes ?|中央に黒い星をあしらい、のちに他の新独立国の国旗にも受け継がれたアフリカ解放の象徴を掲げる国旗を持つのは?",
    ["Ghana|Ghana|Le Ghana|ガーナ", "Kenya|Kenia|Le Kenya|ケニア", "Nigeria|Nigeria|Le Nigeria|ナイジェリア"],
    0,
    "The black star was drawn from the Black Star Line, a shipping company founded by the Jamaican pan-Africanist Marcus Garvey in 1919, and Ghana's national football team is nicknamed the Black Stars in its honour.|La estrella negra se inspiró en la Black Star Line, una naviera fundada por el panafricanista jamaicano Marcus Garvey en 1919, y la selección nacional de fútbol de Ghana se apoda las Estrellas Negras en su honor.|L'étoile noire s'inspire de la Black Star Line, une compagnie maritime fondée par le panafricaniste jamaïcain Marcus Garvey en 1919, et l'équipe nationale de football du Ghana est surnommée les Black Stars en son honneur.|この黒い星は、ジャマイカの汎アフリカ主義者マーカス・ガーヴィーが1919年に興した海運会社「ブラック・スター・ライン」に由来する。ガーナのサッカー代表チームも、これにちなんで「ブラックスターズ」の愛称で呼ばれている。",
  ),
  q(
    2,
    "Which of the world's oceans does not touch the African continent at any point?|¿Cuál de los océanos del mundo no toca el continente africano en ningún punto?|Lequel des océans du monde ne touche le continent africain en aucun point ?|世界の海洋のうち、アフリカ大陸のどこにも接していないのはどれか?",
    ["The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Atlantic Ocean|El océano Atlántico|L'océan Atlantique|大西洋", "The Indian Ocean|El océano Índico|L'océan Indien|インド洋"],
    0,
    "Africa is bordered by the Atlantic Ocean to the west, the Indian Ocean to the east and south-east, and the Mediterranean and Red Seas to the north, but the Pacific Ocean lies entirely on the far side of the globe from it.|África limita con el océano Atlántico al oeste, el océano Índico al este y sureste, y los mares Mediterráneo y Rojo al norte, pero el océano Pacífico queda enteramente al otro lado del globo.|L'Afrique est bordée par l'océan Atlantique à l'ouest, l'océan Indien à l'est et au sud-est, et les mers Méditerranée et Rouge au nord, mais l'océan Pacifique se trouve entièrement à l'autre bout du globe.|アフリカは西を大西洋、東と南東をインド洋、北を地中海と紅海に囲まれているが、太平洋は地球の反対側にあり、まったく接していない。",
  ),
  q(
    4,
    "Which African country is the world's largest producer of natural vanilla?|¿Qué país africano es el mayor productor mundial de vainilla natural?|Quel pays africain est le plus grand producteur mondial de vanille naturelle ?|天然バニラの世界最大の産出国であるアフリカの国は?",
    ["Madagascar|Madagascar|Madagascar|マダガスカル", "Kenya|Kenia|Le Kenya|ケニア", "Ethiopia|Etiopía|L'Éthiopie|エチオピア"],
    0,
    "Madagascar produces roughly 80% of the world's natural vanilla, grown mainly by smallholder farmers in the northeastern SAVA region, and prices spiked dramatically in the mid-2010s after cyclone damage and speculative buying.|Madagascar produce aproximadamente el 80% de la vainilla natural del mundo, cultivada sobre todo por pequeños agricultores en la región noreste de SAVA, y los precios se dispararon a mediados de la década de 2010 tras daños por ciclones y compras especulativas.|Madagascar produit environ 80 % de la vanille naturelle mondiale, cultivée surtout par de petits exploitants dans la région nord-est de la SAVA, et les prix ont fortement grimpé au milieu des années 2010 après des dégâts cycloniques et des achats spéculatifs.|マダガスカルは世界の天然バニラのおよそ8割を産出する。おもに北東部SAVA地方の小規模農家によって栽培されており、2010年代半ばにはサイクロン被害と投機的な買い占めが重なって価格が急騰した。",
  ),
  q(
    4,
    "Rooibos, a naturally caffeine-free herbal tea, is grown almost exclusively in a small mountainous region of which country?|El rooibos, una infusión de hierbas naturalmente sin cafeína, se cultiva casi exclusivamente en una pequeña región montañosa de ¿qué país?|Le rooibos, une tisane naturellement sans caféine, est cultivé presque exclusivement dans une petite région montagneuse de quel pays ?|自然にカフェインを含まないハーブティー、ルイボスがほぼ唯一栽培されている小さな山岳地帯を持つ国は?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Kenya|Kenia|Le Kenya|ケニア", "Tanzania|Tanzania|La Tanzanie|タンザニア"],
    0,
    "Rooibos grows almost exclusively in the Cederberg region north of Cape Town, one of the few places on Earth with the specific sandy, acidic soil and climate the plant needs, making attempts to cultivate it elsewhere largely unsuccessful.|El rooibos crece casi exclusivamente en la región de Cederberg, al norte de Ciudad del Cabo, uno de los pocos lugares de la Tierra con el suelo arenoso y ácido y el clima específicos que necesita la planta, por lo que los intentos de cultivarlo en otros lugares han fracasado en gran medida.|Le rooibos pousse presque exclusivement dans la région du Cederberg, au nord du Cap, l'un des rares endroits sur Terre dotés du sol sablonneux et acide et du climat spécifiques dont la plante a besoin, ce qui rend les tentatives de la cultiver ailleurs largement infructueuses.|ルイボスはケープタウンの北、セダーバーグ地方でほぼ独占的に栽培されている。この植物が必要とする特有の砂質・酸性の土壌と気候を備えた地球上でも数少ない場所であり、他所での栽培の試みはおおむね成功していない。",
  ),
  q(
    5,
    "Which African country produces the most tea by volume, consistently ranking among the world's top tea exporters?|¿Qué país africano produce más té en volumen, situándose de forma constante entre los mayores exportadores mundiales de té?|Quel pays africain produit le plus de thé en volume, se classant régulièrement parmi les plus grands exportateurs de thé au monde ?|生産量で見てアフリカ最大の茶葉産出国で、世界有数の茶輸出国の座を維持し続けているのは?",
    ["Kenya|Kenia|Le Kenya|ケニア", "Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Malawi|Malaui|Le Malawi|マラウイ"],
    0,
    "Kenyan tea is grown mainly in the cool, high-altitude regions around Mount Kenya and the Rift Valley, and the country is consistently one of the world's top three tea exporters despite tea being a relatively late 20th-century colonial-era introduction rather than a traditional local crop.|El té keniano se cultiva sobre todo en las regiones frescas y de gran altitud en torno al monte Kenia y el Valle del Rift, y el país figura de forma constante entre los tres mayores exportadores mundiales de té, pese a que el té fue una introducción relativamente tardía de la época colonial del siglo XX y no un cultivo tradicional local.|Le thé kényan est cultivé surtout dans les régions fraîches et d'altitude autour du mont Kenya et de la vallée du Rift, et le pays figure régulièrement parmi les trois plus grands exportateurs de thé au monde, bien que le thé soit une introduction relativement tardive de l'époque coloniale du XXe siècle plutôt qu'une culture locale traditionnelle.|ケニアの茶は、ケニア山周辺やリフトバレーの冷涼な高地でおもに栽培されている。茶は伝統的な在来作物ではなく20世紀の植民地時代に比較的遅れて持ち込まれた作物であるにもかかわらず、この国はいまも世界有数の茶輸出国の一つであり続けている。",
  ),
  q(
    5,
    "Jollof rice, a spiced one-pot rice dish subject to long-running, good-natured online rivalry over whose version is best, is a signature dish claimed by both Nigeria and which other country?|El arroz jollof, un plato de arroz especiado cocinado en una sola olla y objeto de una larga y amistosa rivalidad en internet sobre cuál versión es mejor, es un plato insignia reclamado tanto por Nigeria como por ¿qué otro país?|Le riz jollof, plat de riz épicé cuit dans une seule marmite et objet d'une longue rivalité amicale en ligne sur la meilleure version, est un plat emblématique revendiqué à la fois par le Nigeria et par quel autre pays ?|どちらの国のものが本場かをめぐって長年ネット上で仲良く張り合われてきた、一つの鍋で作る香辛料入り炊き込みご飯ジョロフライスは、ナイジェリアともう一つどこの国の代表料理とされているか?",
    ["Ghana|Ghana|Le Ghana|ガーナ", "Kenya|Kenia|Le Kenya|ケニア", "Ethiopia|Etiopía|L'Éthiopie|エチオピア"],
    0,
    "The good-humoured 'Jollof Wars' debate spans West African communities and their diasporas worldwide, with each side insisting its blend of tomatoes, peppers, spices and rice, cooked to pick up a smoky flavour from the pot's bottom layer, is the true original.|El debate de buen humor de las 'guerras del jollof' se extiende por comunidades de África Occidental y sus diásporas en todo el mundo, y cada bando insiste en que su mezcla de tomates, pimientos, especias y arroz, cocinada para captar un sabor ahumado de la capa del fondo de la olla, es el original verdadero.|Le débat bon enfant des « guerres du jollof » traverse les communautés d'Afrique de l'Ouest et leurs diasporas dans le monde entier, chaque camp insistant que son mélange de tomates, de piments, d'épices et de riz, cuit pour capter une saveur fumée de la couche du fond de la marmite, est le véritable original.|この和やかな「ジョロフ戦争」論争は西アフリカの人々とその世界中の移民コミュニティにまで広がっており、双方とも鍋の底の層から生まれる燻したような風味を活かして炊いたトマト・唐辛子・香辛料・米の配合こそが本家本元だと主張して譲らない。",
  ),
  q(
    5,
    "Injera, a spongy sourdough flatbread used both as food and as an edible 'plate' for stews, is a staple of which country's cuisine?|El injera, un pan plano esponjoso de masa fermentada usado tanto como alimento como 'plato' comestible para guisos, es un pilar de la cocina de ¿qué país?|L'injéra, une galette spongieuse au levain utilisée à la fois comme aliment et comme « assiette » comestible pour les ragoûts, est un pilier de la cuisine de quel pays ?|スポンジ状の発酵薄焼きパンで、食べ物であると同時に煮込み料理を盛る食べられる「皿」としても使われるインジェラは、どこの国の料理の主食か?",
    ["Ethiopia|Etiopía|L'Éthiopie|エチオピア", "Morocco|Marruecos|Le Maroc|モロッコ", "Senegal|Senegal|Le Sénégal|セネガル"],
    0,
    "Injera is made from teff, a tiny grain native to the Ethiopian highlands that is naturally gluten-free and unusually rich in iron, fermented over several days to give the bread its distinctive sour taste and bubbly texture.|El injera se hace con teff, un grano diminuto nativo del altiplano etíope que es naturalmente sin gluten e inusualmente rico en hierro, fermentado durante varios días para dar al pan su característico sabor agrio y su textura burbujeante.|L'injéra est fait à partir de teff, une minuscule céréale originaire des hauts plateaux éthiopiens, naturellement sans gluten et exceptionnellement riche en fer, fermentée pendant plusieurs jours pour donner au pain son goût acidulé caractéristique et sa texture alvéolée.|インジェラは、エチオピア高地原産の小さな穀物テフから作られる。テフは自然にグルテンを含まず、鉄分に富む。数日かけて発酵させることで、この生地特有の酸味と気泡だらけの食感が生まれる。",
  ),
  q(
    4,
    "Piri piri (peri-peri) sauce, made from a small hot chili pepper, spread internationally largely through the cuisine of which former Portuguese colony?|La salsa piri piri (peri-peri), hecha con un pequeño chile picante, se difundió internacionalmente sobre todo a través de la cocina de ¿qué antigua colonia portuguesa?|La sauce piri piri (peri-peri), à base d'un petit piment fort, s'est répandue internationalement en grande partie via la cuisine de quelle ancienne colonie portugaise ?|小さな辛い唐辛子から作られるピリピリソースが、おもにどの旧ポルトガル植民地の料理を通じて世界に広まったか?",
    ["Mozambique|Mozambique|Le Mozambique|モザンビーク", "Angola|Angola|L'Angola|アンゴラ", "Cape Verde|Cabo Verde|Le Cap-Vert|カーボベルデ"],
    0,
    "The chili itself, related to varieties brought from the Americas by Portuguese traders, became closely tied to Mozambican Portuguese cuisine and later spread widely through South African restaurant chains built around piri-piri-flavoured grilled chicken.|El chile en sí, emparentado con variedades traídas de América por comerciantes portugueses, se ligó estrechamente a la cocina luso-mozambiqueña y luego se difundió ampliamente a través de cadenas de restaurantes sudafricanas construidas en torno al pollo a la parrilla con sabor piri-piri.|Le piment lui-même, apparenté à des variétés apportées des Amériques par des marchands portugais, se lia étroitement à la cuisine luso-mozambicaine et se répandit ensuite largement via des chaînes de restaurants sud-africaines bâties autour du poulet grillé au piri-piri.|この唐辛子自体は、ポルトガル商人がアメリカ大陸から持ち込んだ品種に連なるもので、モザンビークのポルトガル系料理と強く結びつくようになった。その後、ピリピリ風味のグリルチキンを看板にした南アフリカのレストランチェーンを通じて広く世界に伝わった。",
  ),
  q(
    5,
    "Which African country shares a border with nine different neighbouring countries, more than any other country on the continent?|¿Qué país africano comparte frontera con nueve países vecinos distintos, más que cualquier otro país del continente?|Quel pays africain partage une frontière avec neuf pays voisins différents, plus qu'aucun autre pays du continent ?|9つもの異なる隣国と国境を接し、大陸のどの国よりも多いアフリカの国は?",
    ["DR Congo|La RD Congo|La RD Congo|コンゴ民主共和国", "Sudan|Sudán|Le Soudan|スーダン", "Chad|Chad|Le Tchad|チャド"],
    0,
    "DR Congo borders the Republic of the Congo, the Central African Republic, South Sudan, Uganda, Rwanda, Burundi, Tanzania, Zambia and Angola — a huge country roughly the size of Western Europe sitting at the crossroads of Central, East and Southern Africa.|La RD Congo limita con la República del Congo, la República Centroafricana, Sudán del Sur, Uganda, Ruanda, Burundi, Tanzania, Zambia y Angola: un país enorme, del tamaño aproximado de Europa Occidental, situado en la encrucijada de África Central, Oriental y Austral.|La RD Congo est bordée par la République du Congo, la République centrafricaine, le Soudan du Sud, l'Ouganda, le Rwanda, le Burundi, la Tanzanie, la Zambie et l'Angola — un pays immense, à peu près de la taille de l'Europe occidentale, au carrefour de l'Afrique centrale, orientale et australe.|コンゴ民主共和国は、コンゴ共和国・中央アフリカ共和国・南スーダン・ウガンダ・ルワンダ・ブルンジ・タンザニア・ザンビア・アンゴラと国境を接している。西ヨーロッパにほぼ匹敵する広さを持つこの国は、中部・東部・南部アフリカが交わる場所に位置している。",
  ),
  q(
    3,
    "Which of these African animals, despite its rounded, placid appearance, is responsible for more human deaths each year than lions, leopards and crocodiles combined?|¿Cuál de estos animales africanos, pese a su aspecto rechoncho y apacible, causa más muertes humanas al año que los leones, leopardos y cocodrilos juntos?|Lequel de ces animaux africains, malgré son allure ronde et placide, cause chaque année plus de morts humaines que les lions, les léopards et les crocodiles réunis ?|丸みを帯びたのんびりした見た目にもかかわらず、ライオン・ヒョウ・ワニを合わせたより多くの人命を毎年奪っているアフリカの動物はどれか?",
    ["The hippopotamus|El hipopótamo|L'hippopotame|カバ", "The zebra|La cebra|Le zèbre|シマウマ", "The warthog|El facóquero|Le phacochère|イボイノシシ"],
    0,
    "Hippos are fiercely territorial around water, can run surprisingly fast on land despite their bulk, and have jaws that open nearly 180 degrees with tusk-like canine teeth capable of biting a small boat in half.|Los hipopótamos son ferozmente territoriales en torno al agua, pueden correr sorprendentemente rápido en tierra pese a su volumen, y tienen mandíbulas que se abren casi 180 grados con caninos parecidos a colmillos capaces de partir por la mitad una pequeña barca.|Les hippopotames sont farouchement territoriaux autour de l'eau, peuvent courir étonnamment vite sur terre malgré leur masse, et possèdent des mâchoires s'ouvrant à près de 180 degrés, avec des canines semblables à des défenses capables de sectionner une petite embarcation.|カバは水辺で強い縄張り意識を持ち、その巨体にもかかわらず陸上でも意外なほど速く走れる。あごはほぼ180度まで開き、牙のような犬歯は小舟を真っ二つに噛み切れるほどの力を持つ。",
  ),
];
