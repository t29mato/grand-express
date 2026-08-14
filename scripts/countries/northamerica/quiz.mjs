/**
 * 北アメリカ大陸のクイズ(36問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その大陸の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(45件)が扱う具体的な事実(金の犬釘・エル・チェペ・パナマ鉄道・
 * ハバナの1837年鉄道・ポンセの虐殺など)はここでは問わない。代わりに、
 * 地理・歴史・言語・食・スポーツ・自然など、**都市カードが触れていない主題**を
 * 選んである。
 *
 * ```
 * node scripts/check-quiz.mjs northamerica
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること
 * (焼いたあとに)。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 が12問ずつになるよう機械的に割り振った。
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

export const NORTHAMERICA_QUIZ = [
  q(
    1,
    "Which river system is the longest in North America?|¿Cuál es el sistema fluvial más largo de Norteamérica?|Quel est le plus long système fluvial d'Amérique du Nord ?|北アメリカでいちばん長い川の水系は?",
    [
      "The Mississippi–Missouri|El Misisipi–Misuri|Le Mississippi–Missouri|ミシシッピ・ミズーリ",
      "The Yukon River|El río Yukón|Le fleuve Yukon|ユーコン川",
      "The Rio Grande|El río Bravo|Le Rio Grande|リオグランデ",
    ],
    0,
    "Measured together as one system, the Mississippi and its main tributary the Missouri run for roughly 6,000 kilometers, longer than the Yukon or the Rio Grande by a wide margin.|Medidos juntos como un solo sistema, el Misisipi y su principal afluente, el Misuri, recorren unos 6.000 kilómetros, mucho más que el Yukón o el río Bravo.|Mesurés ensemble comme un seul système, le Mississippi et son principal affluent, le Missouri, parcourent environ 6 000 kilomètres, bien plus que le Yukon ou le Rio Grande.|ミシシッピ川とその主な支流であるミズーリ川を一つの水系として測ると、全長はおよそ6,000kmに達し、ユーコン川やリオグランデをはるかに上回る。",
  ),
  q(
    3,
    "What is the highest peak in North America?|¿Cuál es el pico más alto de Norteamérica?|Quel est le plus haut sommet d'Amérique du Nord ?|北アメリカでいちばん高い山は?",
    [
      "Mount Logan|El monte Logan|Le mont Logan|ローガン山",
      "Denali|Denali|Denali|デナリ",
      "Pico de Orizaba|El Pico de Orizaba|Le Pico de Orizaba|オリサバ山",
    ],
    1,
    "Denali, in Alaska, rises to 6,190 meters and was officially known by its English name, Mount McKinley, until 2015, when the US government restored the mountain's Koyukon Athabascan name.|El Denali, en Alaska, se eleva a 6.190 metros y se conoció oficialmente por su nombre en inglés, monte McKinley, hasta 2015, cuando el gobierno estadounidense restauró su nombre en koyukon.|Le Denali, en Alaska, culmine à 6 190 mètres et fut officiellement connu sous son nom anglais, mont McKinley, jusqu'en 2015, quand le gouvernement américain rétablit son nom d'origine koyukon athabascan.|アラスカのデナリは標高6,190mで、2015年にアメリカ政府がコユーコン・アサバスカ語の元の名を復活させるまでは、英語名の「マッキンリー山」として公式に呼ばれていた。",
  ),
  q(
    2,
    "Which strait separates Alaska from Russia?|¿Qué estrecho separa Alaska de Rusia?|Quel détroit sépare l'Alaska de la Russie ?|アラスカとロシアを隔てる海峡は?",
    [
      "The Davis Strait|El estrecho de Davis|Le détroit de Davis|デービス海峡",
      "The Nootka Sound|El estrecho de Nutka|Le détroit de Nootka|ヌートカ海峡",
      "The Bering Strait|El estrecho de Bering|Le détroit de Béring|ベーリング海峡",
    ],
    2,
    "At its narrowest, the Bering Strait is only about 82 kilometers wide, and two small islands in the middle, one American and one Russian, sit less than 4 kilometers apart.|En su punto más estrecho, el estrecho de Bering mide solo unos 82 kilómetros de ancho, y dos islas pequeñas en su centro, una estadounidense y otra rusa, están a menos de 4 kilómetros entre sí.|À son point le plus étroit, le détroit de Béring ne mesure qu'environ 82 kilomètres de large, et deux petites îles en son centre, l'une américaine et l'autre russe, sont séparées de moins de 4 kilomètres.|ベーリング海峡はいちばん狭い所で幅約82kmしかなく、中央に浮かぶ二つの小島、アメリカ領とロシア領は互いに4km足らずしか離れていない。",
  ),
  q(
    2,
    "Which mountain range runs down the western spine of North America from Alaska to New Mexico?|¿Qué cordillera recorre la columna occidental de Norteamérica desde Alaska hasta Nuevo México?|Quelle chaîne de montagnes parcourt l'épine dorsale occidentale de l'Amérique du Nord, de l'Alaska au Nouveau-Mexique ?|アラスカからニューメキシコまで北アメリカ西部の背骨をなす山脈は?",
    [
      "The Rocky Mountains|Las Montañas Rocosas|Les montagnes Rocheuses|ロッキー山脈",
      "The Appalachian Mountains|Los Apalaches|Les Appalaches|アパラチア山脈",
      "The Sierra Madre Oriental|La Sierra Madre Oriental|La Sierra Madre Oriental|シエラマドレ・オリエンタル",
    ],
    0,
    "The Rockies stretch more than 4,800 kilometers and mark the Continental Divide along most of their length, the line that decides whether a raindrop eventually reaches the Atlantic or the Pacific.|Las Rocosas se extienden más de 4.800 kilómetros y marcan la Divisoria Continental en la mayor parte de su recorrido, la línea que decide si una gota de lluvia acaba en el Atlántico o en el Pacífico.|Les Rocheuses s'étendent sur plus de 4 800 kilomètres et marquent la ligne de partage des eaux continentale sur la majeure partie de leur longueur, la ligne qui décide si une goutte de pluie finit dans l'Atlantique ou dans le Pacifique.|ロッキー山脈は4,800kmを超えて連なり、その大半で大陸分水嶺をなす。雨粒が最終的に大西洋へ流れるか太平洋へ流れるかを決める境界線である。",
  ),
  q(
    3,
    "What is the name of the large bay that cuts deep into northern Canada?|¿Cómo se llama la gran bahía que se adentra profundamente en el norte de Canadá?|Comment s'appelle la grande baie qui s'enfonce profondément dans le nord du Canada ?|カナダ北部に深く入り込む大きな湾の名は?",
    [
      "Baffin Bay|La bahía de Baffin|La baie de Baffin|バフィン湾",
      "Hudson Bay|La bahía de Hudson|La baie d'Hudson|ハドソン湾",
      "James Bay|La bahía James|La baie James|ジェームズ湾",
    ],
    1,
    "Hudson Bay covers over 1.2 million square kilometers, and its waters freeze over almost entirely each winter before breaking up again in summer, a cycle the fur-trading posts around its shore were built to endure.|La bahía de Hudson cubre más de 1,2 millones de kilómetros cuadrados, y sus aguas se congelan casi por completo cada invierno antes de deshelarse de nuevo en verano, un ciclo que los puestos de comercio de pieles de su orilla estaban hechos para soportar.|La baie d'Hudson couvre plus de 1,2 million de kilomètres carrés, et ses eaux gèlent presque entièrement chaque hiver avant de se libérer de nouveau en été, un cycle que les postes de traite des fourrures sur ses rives étaient bâtis pour supporter.|ハドソン湾は120万km²を超える広さで、その海はほぼ毎冬完全に凍り、夏にまた解ける。この周期に耐えられるよう、湖畔の毛皮交易所は建てられていた。",
  ),
  q(
    4,
    "Which desert spans much of the US–Mexico border region, including parts of Arizona and Sonora?|¿Qué desierto abarca buena parte de la región fronteriza entre EE. UU. y México, incluidas partes de Arizona y Sonora?|Quel désert s'étend sur une grande partie de la région frontalière États-Unis–Mexique, dont des parties de l'Arizona et du Sonora ?|アリゾナ州とソノラ州を含む米墨国境地帯の多くを占める砂漠は?",
    [
      "The Mojave Desert|El desierto de Mojave|Le désert des Mojaves|モハーベ砂漠",
      "The Sonoran Desert|El desierto de Sonora|Le désert de Sonora|ソノラ砂漠",
      "The Atacama Desert|El desierto de Atacama|Le désert d'Atacama|アタカマ砂漠",
    ],
    1,
    "The Sonoran Desert is one of the wettest deserts in the world, catching two separate rainy seasons a year, which is part of why it supports the towering saguaro cactus, a plant found almost nowhere else.|El desierto de Sonora es uno de los desiertos más lluviosos del mundo, con dos temporadas de lluvia separadas al año, lo que en parte explica que sostenga el imponente cactus saguaro, una planta que casi no crece en ningún otro lugar.|Le désert de Sonora est l'un des déserts les plus arrosés au monde, avec deux saisons des pluies distinctes par an, ce qui explique en partie qu'il abrite l'imposant cactus saguaro, une plante que l'on ne trouve presque nulle part ailleurs.|ソノラ砂漠は世界でも屈指の雨の多い砂漠で、年に二度別々の雨季がある。これが、他にはほとんど見られない巨大なサワロサボテンをこの地に育てる一因になっている。",
  ),
  q(
    5,
    "In what year did Canada's Confederation unite several British colonies into one country?|¿En qué año la Confederación unió varias colonias británicas en un solo país llamado Canadá?|En quelle année la Confédération canadienne unit-elle plusieurs colonies britanniques en un seul pays ?|カナダ連邦が複数のイギリス植民地を一つの国にまとめたのは何年?",
    [
      "1867|1867|1867|1867年",
      "1812|1812|1812|1812年",
      "1931|1931|1931|1931年",
    ],
    0,
    "The British North America Act joined the Province of Canada, Nova Scotia and New Brunswick into a single dominion on 1 July 1867, a date still marked as Canada Day.|La Ley de la Norteamérica Británica unió la provincia de Canadá, Nueva Escocia y Nuevo Brunswick en un solo dominio el 1 de julio de 1867, fecha que aún se celebra como el Día de Canadá.|L'Acte de l'Amérique du Nord britannique unit la province du Canada, la Nouvelle-Écosse et le Nouveau-Brunswick en un seul dominion le 1er juillet 1867, date encore célébrée comme la fête du Canada.|英領北アメリカ法により、1867年7月1日、カナダ州・ノヴァスコシア・ニューブランズウィックが一つの自治領にまとめられた。この日はいまもカナダの建国記念日として祝われる。",
  ),
  q(
    6,
    "Which 1848 treaty ended the Mexican–American War and ceded much of the present-day US Southwest to the United States?|¿Qué tratado de 1848 puso fin a la guerra entre México y Estados Unidos y cedió buena parte del actual suroeste estadounidense?|Quel traité de 1848 mit fin à la guerre américano-mexicaine et céda une bonne partie de l'actuel sud-ouest des États-Unis ?|1848年、米墨戦争を終わらせ現在の米南西部の大半を割譲した条約は?",
    [
      "The Treaty of Paris|El Tratado de París|Le traité de Paris|パリ条約",
      "The Treaty of Guadalupe Hidalgo|El Tratado de Guadalupe Hidalgo|Le traité de Guadalupe Hidalgo|グアダルーペ・イダルゴ条約",
      "The Treaty of Tordesillas|El Tratado de Tordesillas|Le traité de Tordesillas|トルデシリャス条約",
    ],
    1,
    "Signed in the town whose name it carries, the treaty transferred what is now California, Nevada, Utah and most of Arizona and New Mexico to the United States in exchange for a payment of 15 million dollars.|Firmado en la localidad que le da nombre, el tratado transfirió a Estados Unidos lo que hoy son California, Nevada, Utah y la mayor parte de Arizona y Nuevo México, a cambio de un pago de 15 millones de dólares.|Signé dans la localité qui lui donne son nom, le traité transféra aux États-Unis les actuels Californie, Nevada, Utah et la majeure partie de l'Arizona et du Nouveau-Mexique, en échange d'un paiement de 15 millions de dollars.|その名の由来となった町で調印されたこの条約により、現在のカリフォルニア・ネバダ・ユタ、アリゾナとニューメキシコの大半が1500万ドルの支払いと引き換えにアメリカへ譲渡された。",
  ),
  q(
    6,
    "What derisive nickname did critics give the 1867 US purchase of Alaska from Russia, mocking its price of roughly two cents an acre?|¿Qué apodo burlón dieron los críticos a la compra de Alaska a Rusia por parte de EE. UU. en 1867, que se mofaba de su precio de unos dos centavos el acre?|Quel surnom moqueur les critiques donnèrent-ils à l'achat de l'Alaska à la Russie par les États-Unis en 1867, raillant son prix d'environ deux cents l'acre ?|1867年、アメリカがロシアからアラスカを1エーカーあたり約2セントで購入したことを批判者たちが揶揄して呼んだ名は?",
    [
      "Seward's Folly|La locura de Seward|La folie de Seward|スワードの氷庫",
      "Monroe's Blunder|El error de Monroe|La bévue de Monroe|モンローの失策",
      "Polk's Gamble|La apuesta de Polk|Le pari de Polk|ポークの賭け",
    ],
    0,
    "Secretary of State William Seward negotiated the purchase for 7.2 million dollars, and newspapers mocked it as an icebox not worth the price, until gold and later oil proved the critics wrong many times over.|El secretario de Estado William Seward negoció la compra por 7,2 millones de dólares, y los periódicos se burlaron llamándola una nevera que no valía el precio, hasta que el oro y después el petróleo demostraron muchas veces que los críticos se equivocaban.|Le secrétaire d'État William Seward négocia l'achat pour 7,2 millions de dollars, et les journaux le raillèrent comme une glacière ne valant pas son prix, jusqu'à ce que l'or puis le pétrole donnent tort aux critiques à de nombreuses reprises.|国務長官ウィリアム・スワードは720万ドルでこの買収を交渉したが、新聞はそれを値段に見合わない氷庫だと嘲笑した。のちに金、さらに石油が見つかり、批判者たちの見立ては何度も覆されることになる。",
  ),
  q(
    1,
    "Which country declared independence from Britain in 1776?|¿Qué país declaró su independencia de Gran Bretaña en 1776?|Quel pays déclara son indépendance de la Grande-Bretagne en 1776 ?|1776年にイギリスから独立を宣言した国は?",
    [
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "Canada|Canadá|Le Canada|カナダ",
      "Mexico|México|Le Mexique|メキシコ",
    ],
    0,
    "Thirteen British colonies along the Atlantic coast adopted the Declaration of Independence on 4 July 1776, though fighting continued for another seven years before Britain formally recognized the new country.|Trece colonias británicas de la costa atlántica adoptaron la Declaración de Independencia el 4 de julio de 1776, aunque los combates continuaron siete años más antes de que Gran Bretaña reconociera formalmente al nuevo país.|Treize colonies britanniques de la côte atlantique adoptèrent la déclaration d'indépendance le 4 juillet 1776, bien que les combats se poursuivirent sept années encore avant que la Grande-Bretagne ne reconnaisse formellement le nouveau pays.|大西洋岸の13のイギリス植民地は1776年7月4日に独立宣言を採択したが、イギリスが新しい国を正式に承認するまでにはさらに7年の戦いが続いた。",
  ),
  q(
    2,
    "The 49th parallel forms the border between which two countries for most of its length?|El paralelo 49 forma la frontera entre qué dos países en la mayor parte de su recorrido?|Le 49e parallèle forme la frontière entre quels deux pays sur la majeure partie de sa longueur ?|北緯49度線は、その大半でどの二国の国境になっているか?",
    [
      "The United States and Canada|Estados Unidos y Canadá|Les États-Unis et le Canada|アメリカとカナダ",
      "The United States and Mexico|Estados Unidos y México|Les États-Unis et le Mexique|アメリカとメキシコ",
      "Canada and Greenland|Canadá y Groenlandia|Le Canada et le Groenland|カナダとグリーンランド",
    ],
    0,
    "Surveyed and marked through the nineteenth century, the border runs arrow-straight along this line of latitude from the Pacific coast to Lake of the Woods, cutting through prairie, forest and even the odd building without regard for terrain.|Trazada y demarcada a lo largo del siglo XIX, la frontera corre en línea recta como una flecha por este paralelo desde la costa del Pacífico hasta el lago de los Bosques, atravesando praderas, bosques e incluso algún edificio sin importarle el terreno.|Levée et bornée tout au long du XIXe siècle, la frontière court en ligne parfaitement droite le long de ce parallèle depuis la côte pacifique jusqu'au lac des Bois, traversant prairies, forêts et même quelque bâtiment sans égard pour le relief.|19世紀を通して測量され標された国境は、太平洋岸からウッズ湖まで、この緯線に沿って矢のようにまっすぐ延びる。地形にはお構いなしに、大平原も森も、時には建物さえも貫いている。",
  ),
  q(
    5,
    "Which two US states joined the union in 1959, more than a century after most others?|¿Qué dos estados de EE. UU. se incorporaron a la unión en 1959, más de un siglo después que la mayoría?|Quels deux États américains rejoignirent l'union en 1959, plus d'un siècle après la plupart des autres ?|1959年、他の多くの州より一世紀以上遅れて合衆国に加わった二つの州は?",
    [
      "Alaska and Hawaii|Alaska y Hawái|L'Alaska et Hawaï|アラスカ州とハワイ州",
      "Florida and Arizona|Florida y Arizona|La Floride et l'Arizona|フロリダ州とアリゾナ州",
      "Texas and California|Texas y California|Le Texas et la Californie|テキサス州とカリフォルニア州",
    ],
    0,
    "Alaska was admitted in January 1959 and Hawaii followed that August, the last two states added to the country and, to date, the only ones that do not border another US state.|Alaska se admitió en enero de 1959 y Hawái le siguió ese agosto, los últimos dos estados añadidos al país y, hasta hoy, los únicos que no limitan con otro estado de EE. UU.|L'Alaska fut admis en janvier 1959 et Hawaï suivit en août de la même année, les deux derniers États ajoutés au pays et, à ce jour, les seuls à ne border aucun autre État américain.|アラスカ州は1959年1月に、ハワイ州は同年8月に加わった。合衆国に加わった最後の二州であり、いまも他のどの州とも陸続きでない唯一の州である。",
  ),
  q(
    7,
    "In what year did Panama gain full control of the Panama Canal from the United States?|¿En qué año Panamá obtuvo el control total del Canal de Panamá de manos de Estados Unidos?|En quelle année le Panama obtint-il le contrôle total du canal de Panama, cédé par les États-Unis ?|パナマがパナマ運河の完全な管理権をアメリカから得たのは何年?",
    [
      "1979|1979|1979|1979年",
      "1999|1999|1999|1999年",
      "2009|2009|2009|2009年",
    ],
    1,
    "A pair of treaties signed in 1977 set a twenty-two-year transition, and at noon on 31 December 1999 the canal and the zone around it passed fully into Panamanian hands.|Un par de tratados firmados en 1977 fijaron una transición de veintidós años, y al mediodía del 31 de diciembre de 1999 el canal y la zona a su alrededor pasaron por completo a manos panameñas.|Une paire de traités signés en 1977 fixa une transition de vingt-deux ans, et à midi le 31 décembre 1999, le canal et la zone qui l'entoure passèrent entièrement aux mains panaméennes.|1977年に結ばれた二つの条約が22年の移行期間を定め、1999年12月31日正午、運河とその周辺地域は完全にパナマの手に渡った。",
  ),
  q(
    8,
    "What short-lived federation did several Central American countries form together after declaring independence from Spain in 1821?|¿Qué federación de corta vida formaron varios países centroamericanos tras declarar la independencia de España en 1821?|Quelle fédération éphémère plusieurs pays d'Amérique centrale formèrent-ils après avoir déclaré leur indépendance de l'Espagne en 1821 ?|1821年にスペインから独立を宣言したあと、中米諸国がともに結成した短命の連邦国家は?",
    [
      "Gran Colombia|La Gran Colombia|La Grande Colombie|大コロンビア",
      "The Federal Republic of Central America|La República Federal de Centroamérica|La République fédérale d'Amérique centrale|中央アメリカ連邦共和国",
      "The United Provinces of the Río de la Plata|Las Provincias Unidas del Río de la Plata|Les Provinces-Unies du Río de la Plata|リオ・デ・ラ・プラタ連合州",
    ],
    1,
    "The federation lasted barely seventeen years before civil wars split it into the separate republics of Guatemala, Honduras, El Salvador, Nicaragua and Costa Rica, all of which still mark their independence day on the same date.|La federación duró apenas diecisiete años antes de que las guerras civiles la dividieran en las repúblicas separadas de Guatemala, Honduras, El Salvador, Nicaragua y Costa Rica, que aún celebran su día de la independencia en la misma fecha.|La fédération dura à peine dix-sept ans avant que des guerres civiles ne la scindent en républiques distinctes du Guatemala, du Honduras, du Salvador, du Nicaragua et du Costa Rica, qui célèbrent toutes encore leur fête de l'indépendance à la même date.|この連邦はわずか17年しか続かず、内戦によってグアテマラ・ホンジュラス・エルサルバドル・ニカラグア・コスタリカという別々の共和国に分かれた。いずれの国もいまなお同じ日付を独立記念日として祝っている。",
  ),
  q(
    1,
    "Besides English, what is Canada's other official language at the federal level?|Además del inglés, ¿cuál es la otra lengua oficial de Canadá a nivel federal?|En dehors de l'anglais, quelle est l'autre langue officielle du Canada au niveau fédéral ?|英語のほかに、カナダの連邦レベルでの公用語は?",
    [
      "Inuktitut|Inuktitut|L'inuktitut|イヌクティトゥット語",
      "French|Francés|Le français|フランス語",
      "Spanish|Español|L'espagnol|スペイン語",
    ],
    1,
    "French has held equal status with English in federal law since the Official Languages Act of 1969, reflecting the roughly one in five Canadians whose first language is French, concentrated mostly in Quebec.|El francés tiene el mismo estatus que el inglés en la ley federal desde la Ley de Lenguas Oficiales de 1969, lo que refleja que cerca de uno de cada cinco canadienses tiene el francés como primera lengua, sobre todo en Quebec.|Le français a un statut égal à l'anglais dans la loi fédérale depuis la Loi sur les langues officielles de 1969, reflétant qu'environ un Canadien sur cinq a le français comme langue maternelle, principalement au Québec.|1969年の公用語法以来、フランス語は連邦法のもとで英語と対等の地位を持つ。これは、母語がフランス語であるカナダ人がおよそ5人に1人おり、その多くがケベック州に集まっていることを反映している。",
  ),
  q(
    5,
    "The English words \"chocolate,\" \"tomato\" and \"coyote\" all come from which indigenous language?|¿De qué lengua indígena proceden las palabras «chocolate», «tomate» y «coyote»?|D'où viennent, dans une langue indigène, les mots « chocolat », « tomate » et « coyote » ?|英語の chocolate・tomato・coyote は、いずれもどの先住民の言語に由来するか?",
    [
      "Maya|Maya|Le maya|マヤ語",
      "Taíno|Taíno|Le taïno|タイノ語",
      "Nahuatl|Náhuatl|Le nahuatl|ナワトル語",
    ],
    2,
    "Nahuatl, the language of the Aztec state and still spoken by over a million people in Mexico today, gave Spanish and later English dozens of words for foods and animals that were new to Europeans.|El náhuatl, la lengua del estado azteca y aún hablada hoy por más de un millón de personas en México, dio al español y después al inglés docenas de palabras para alimentos y animales desconocidos para los europeos.|Le nahuatl, langue de l'État aztèque et encore parlée aujourd'hui par plus d'un million de personnes au Mexique, a donné à l'espagnol puis à l'anglais des dizaines de mots pour des aliments et des animaux inconnus des Européens.|アステカの国家の言語であり、いまもメキシコで100万人以上に話されるナワトル語は、ヨーロッパ人にとって未知だった食べ物や動物を表す言葉を何十もスペイン語、のちに英語へ与えた。",
  ),
  q(
    6,
    "The English word \"hurricane\" comes from a word in which indigenous Caribbean language?|¿De qué lengua indígena caribeña procede la palabra «huracán»?|De quelle langue indigène des Caraïbes vient le mot « ouragan » ?|「ハリケーン」という英語は、どのカリブ先住民の言語に由来するか?",
    [
      "Taíno|Taíno|Le taïno|タイノ語",
      "Nahuatl|Náhuatl|Le nahuatl|ナワトル語",
      "Quechua|Quechua|Le quechua|ケチュア語",
    ],
    0,
    "Taíno, once spoken across much of the Greater Antilles, had a word for a storm god, huracán, that Spanish colonists borrowed directly and other European languages later picked up from Spanish.|El taíno, hablado antaño en buena parte de las Grandes Antillas, tenía una palabra para un dios de la tormenta, huracán, que los colonos españoles tomaron directamente y que otras lenguas europeas adoptaron después del español.|Le taïno, jadis parlé dans une bonne partie des Grandes Antilles, possédait un mot pour un dieu de la tempête, huracán, que les colons espagnols empruntèrent directement et que d'autres langues européennes reprirent ensuite de l'espagnol.|かつて大アンティル諸島の多くで話されていたタイノ語には、嵐の神を指す「フラカン」という語があり、スペインの植民者がそのまま借用し、他のヨーロッパの言語もスペイン語を通じて取り入れた。",
  ),
  q(
    5,
    "What Creole language, blending French vocabulary with African grammatical structures, is spoken across Haiti?|¿Qué lengua criolla, que mezcla vocabulario francés con estructuras gramaticales africanas, se habla en Haití?|Quelle langue créole, mêlant vocabulaire français et structures grammaticales africaines, est parlée en Haïti ?|フランス語の語彙とアフリカ系の文法構造が混ざった、ハイチで話されるクレオール語は?",
    [
      "Haitian Creole|El criollo haitiano|Le créole haïtien|ハイチ・クレオール語",
      "Papiamento|Papiamento|Le papiamento|パピアメント語",
      "Louisiana Creole|El criollo de Luisiana|Le créole louisianais|ルイジアナ・クレオール語",
    ],
    0,
    "Haitian Creole developed among enslaved people brought from West and Central Africa to work French sugar plantations, and it is now one of Haiti's two official languages alongside French, spoken by virtually the entire population.|El criollo haitiano se desarrolló entre las personas esclavizadas traídas de África occidental y central para trabajar en las plantaciones azucareras francesas, y hoy es una de las dos lenguas oficiales de Haití junto al francés, hablada por casi toda la población.|Le créole haïtien s'est développé parmi les personnes réduites en esclavage venues d'Afrique de l'Ouest et centrale pour travailler dans les plantations sucrières françaises, et c'est aujourd'hui l'une des deux langues officielles d'Haïti aux côtés du français, parlée par la quasi-totalité de la population.|ハイチ・クレオール語は、フランスの砂糖プランテーションで働かされるため西・中央アフリカから連れてこられた人々のあいだで生まれた。いまはフランス語と並ぶハイチの公用語の一つで、ほぼ全人口が話す。",
  ),
  q(
    2,
    "Poutine, a dish of fries, cheese curds and gravy, comes from which country?|La poutine, un plato de patatas fritas, cuajada de queso y salsa, ¿de qué país procede?|La poutine, un plat de frites, de fromage en grains et de sauce, vient de quel pays ?|フライドポテトとチーズカード、グレイビーソースを合わせたプーティンはどの国の料理?",
    [
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "Canada|Canadá|Le Canada|カナダ",
      "Mexico|México|Le Mexique|メキシコ",
    ],
    1,
    "First served in rural Quebec diners in the late 1950s, poutine was considered unrefined for decades before it spread across the rest of Canada and eventually onto menus abroad.|Servida por primera vez en fondas rurales de Quebec a finales de los años 1950, la poutine se consideró poco refinada durante décadas antes de extenderse por el resto de Canadá y, con el tiempo, a menús del extranjero.|Servie pour la première fois dans des casse-croûte ruraux du Québec à la fin des années 1950, la poutine fut jugée peu raffinée pendant des décennies avant de se répandre dans le reste du Canada puis sur des menus à l'étranger.|1950年代末にケベック州の田舎の食堂で最初に出されたプーティンは、何十年も洗練されていない料理とみなされていたが、やがてカナダ全土に広まり、海外のメニューにも載るようになった。",
  ),
  q(
    4,
    "Mole, a sauce that blends chocolate with chili peppers and other spices, is a signature dish of which country?|El mole, una salsa que mezcla chocolate con chiles y otras especias, ¿es un plato característico de qué país?|Le mole, une sauce mêlant chocolat, piments et autres épices, est un plat emblématique de quel pays ?|チョコレートと唐辛子などの香辛料を合わせたソース、モーレはどの国を代表する料理?",
    [
      "Guatemala|Guatemala|Le Guatemala|グアテマラ",
      "Mexico|México|Le Mexique|メキシコ",
      "Cuba|Cuba|Cuba|キューバ",
    ],
    1,
    "There are dozens of regional mole recipes across Mexico, some calling for more than twenty ingredients and hours of grinding by hand, though chocolate appears in only some varieties rather than all of them.|Hay decenas de recetas regionales de mole en México, algunas con más de veinte ingredientes y horas de molienda a mano, aunque el chocolate aparece solo en algunas variedades y no en todas.|Il existe des dizaines de recettes régionales de mole à travers le Mexique, certaines demandant plus de vingt ingrédients et des heures de broyage à la main, bien que le chocolat n'apparaisse que dans certaines variétés et non dans toutes.|メキシコにはモーレの地方ごとのレシピが何十種もあり、20種類を超える材料と何時間もの手作業のすり潰しを要するものもある。ただしチョコレートが入るのは一部の種類だけで、すべてではない。",
  ),
  q(
    4,
    "Jerk seasoning, blending allspice, scotch bonnet pepper and thyme, is most closely associated with which island?|El sazón jerk, que mezcla pimienta de Jamaica, chile scotch bonnet y tomillo, ¿con qué isla se asocia más estrechamente?|L'assaisonnement jerk, mêlant piment de la Jamaïque, piment scotch bonnet et thym, est le plus associé à quelle île ?|オールスパイスとスコッチボネット、タイムを合わせたジャーク調味料と最も結びつく島は?",
    [
      "Jamaica|Jamaica|La Jamaïque|ジャマイカ",
      "Cuba|Cuba|Cuba|キューバ",
      "Puerto Rico|Puerto Rico|Porto Rico|プエルトリコ",
    ],
    0,
    "The technique of slow-smoking meat over pimento wood is credited to the Maroons, communities of Africans who escaped slavery and built free settlements in Jamaica's mountainous interior from the seventeenth century onward.|La técnica de ahumar lentamente la carne sobre madera de pimienta se atribuye a los cimarrones, comunidades de africanos que escaparon de la esclavitud y fundaron asentamientos libres en el interior montañoso de Jamaica desde el siglo XVII.|La technique consistant à fumer lentement la viande sur du bois de piment est attribuée aux Marrons, des communautés d'Africains ayant échappé à l'esclavage et bâti des établissements libres dans l'intérieur montagneux de la Jamaïque à partir du XVIIe siècle.|ピメントの木でじっくり燻す調理法は、17世紀以降、奴隷制から逃れてジャマイカの山がちな内陸部に自由な集落を築いたアフリカ系の人々、マルーンたちの功績とされている。",
  ),
  q(
    7,
    "The technique behind tacos al pastor, meat roasted on a vertical spit, was brought to Mexico by immigrants from where?|La técnica de los tacos al pastor, carne asada en un asador vertical, ¿la llevaron a México inmigrantes de dónde?|La technique des tacos al pastor, viande rôtie sur une broche verticale, fut apportée au Mexique par des immigrants venus d'où ?|垂直の焼き串で肉を焼くタコス・アル・パストールの技法を、メキシコに伝えた移民の出身地は?",
    [
      "Chinese immigrants|Inmigrantes chinos|Des immigrants chinois|中国系移民",
      "Lebanese immigrants|Inmigrantes libaneses|Des immigrants libanais|レバノン系移民",
      "Italian immigrants|Inmigrantes italianos|Des immigrants italiens|イタリア系移民",
    ],
    1,
    "Lebanese immigrants who settled in central Mexico in the early twentieth century brought the shawarma technique of stacking meat on a vertical spit; Mexican cooks swapped lamb for pork and added pineapple, and the dish took on a new name.|Los inmigrantes libaneses que se asentaron en el centro de México a principios del siglo XX trajeron la técnica del shawarma de apilar carne en un asador vertical; los cocineros mexicanos cambiaron el cordero por cerdo y añadieron piña, y el plato tomó un nombre nuevo.|Les immigrants libanais installés dans le centre du Mexique au début du XXe siècle apportèrent la technique du chawarma consistant à empiler la viande sur une broche verticale ; les cuisiniers mexicains remplacèrent l'agneau par le porc et ajoutèrent de l'ananas, et le plat prit un nouveau nom.|20世紀初頭にメキシコ中部へ移り住んだレバノン系移民が、肉を垂直の串に重ねて焼くシャワルマの技法を持ち込んだ。メキシコの料理人は羊肉を豚肉に替え、パイナップルを加えて、新しい名の料理に仕立て直した。",
  ),
  q(
    6,
    "Ackee, a fruit that is poisonous unless fully ripe and properly prepared, is the national fruit of which country?|El seso vegetal, una fruta venenosa si no está bien madura y preparada, ¿es la fruta nacional de qué país?|L'akée, un fruit toxique s'il n'est pas parfaitement mûr et correctement préparé, est le fruit national de quel pays ?|完熟して正しく調理しないと有毒になる果物アキーは、どの国の国果とされているか?",
    [
      "The Bahamas|Las Bahamas|Les Bahamas|バハマ",
      "Jamaica|Jamaica|La Jamaïque|ジャマイカ",
      "The Dominican Republic|República Dominicana|La République dominicaine|ドミニカ共和国",
    ],
    1,
    "Ackee, brought from West Africa in the eighteenth century, is paired with saltfish as Jamaica's national dish; the fruit's unripe pods and seeds contain a toxin that has caused fatal poisonings, so it is only eaten once the pod has opened naturally.|El seso vegetal, traído de África occidental en el siglo XVIII, se combina con bacalao salado en el plato nacional de Jamaica; sus vainas y semillas verdes contienen una toxina que ha causado envenenamientos mortales, así que solo se come una vez que la vaina se ha abierto de forma natural.|L'akée, importé d'Afrique de l'Ouest au XVIIIe siècle, s'associe à la morue salée dans le plat national jamaïcain ; ses gousses et graines non mûres renferment une toxine ayant causé des empoisonnements mortels, aussi ne le mange-t-on qu'une fois la gousse ouverte naturellement.|18世紀に西アフリカから伝わったアキーは、塩漬け魚と合わせてジャマイカの国民食となっている。未熟な莢と種には死に至ることもある毒があるため、莢が自然に開いたものしか食べない。",
  ),
  q(
    2,
    "Which sport, played with a bat and a pitcher's mound, is especially popular in the United States, the Dominican Republic and Cuba?|¿Qué deporte, jugado con bate y montículo del lanzador, es especialmente popular en Estados Unidos, República Dominicana y Cuba?|Quel sport, joué avec une batte et un monticule pour le lanceur, est particulièrement populaire aux États-Unis, en République dominicaine et à Cuba ?|バットとピッチャーマウンドを使う、アメリカ・ドミニカ共和国・キューバで特に人気のスポーツは?",
    [
      "Cricket|Cricket|Le cricket|クリケット",
      "Rugby|Rugby|Le rugby|ラグビー",
      "Baseball|Béisbol|Le baseball|野球",
    ],
    2,
    "The Dominican Republic alone has sent well over a thousand players to the top American professional league, and baseball academies dot the country's sugar towns, many of them run directly by US teams.|Solo República Dominicana ha enviado a más de mil jugadores a la máxima liga profesional estadounidense, y academias de béisbol salpican los pueblos azucareros del país, muchas de ellas dirigidas directamente por equipos estadounidenses.|La seule République dominicaine a envoyé bien plus d'un millier de joueurs vers la plus grande ligue professionnelle américaine, et des académies de baseball parsèment les villes sucrières du pays, dont beaucoup sont dirigées directement par des équipes américaines.|ドミニカ共和国だけでアメリカの最高峰プロリーグへ千人を優に超える選手を送り出しており、砂糖産業の町のあちこちに野球アカデミーが点在する。その多くはアメリカの球団が直接運営している。",
  ),
  q(
    1,
    "Ice hockey is the official national winter sport of which country?|El hockey sobre hielo es el deporte nacional de invierno oficial de qué país?|Le hockey sur glace est le sport national d'hiver officiel de quel pays ?|アイスホッケーが公式の国民的冬季スポーツとされている国は?",
    [
      "Canada|Canadá|Le Canada|カナダ",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "Mexico|México|Le Mexique|メキシコ",
    ],
    0,
    "Parliament declared ice hockey Canada's official winter sport by law in 1994, in the same act that named lacrosse, a game with Indigenous origins, the official summer sport.|El Parlamento declaró por ley en 1994 el hockey sobre hielo deporte nacional de invierno de Canadá, en la misma ley que nombró al lacrosse, un juego de origen indígena, deporte oficial de verano.|Le Parlement déclara par la loi en 1994 le hockey sur glace sport national d'hiver du Canada, la même loi désignant la crosse, un jeu d'origine autochtone, comme sport officiel d'été.|カナダ議会は1994年、法律でアイスホッケーを公式の冬季国技と定めた。同じ法律で、先住民に起源を持つラクロスが公式の夏季国技とされている。",
  ),
  q(
    3,
    "Which island is generally credited as the birthplace of reggae music?|¿Qué isla se considera generalmente la cuna del reggae?|Quelle île est généralement créditée comme le berceau de la musique reggae ?|レゲエ音楽の発祥地とされる島は?",
    [
      "Trinidad|Trinidad|Trinité|トリニダード",
      "Puerto Rico|Puerto Rico|Porto Rico|プエルトリコ",
      "Jamaica|Jamaica|La Jamaïque|ジャマイカ",
    ],
    2,
    "Reggae emerged in Jamaica in the late 1960s out of earlier styles called ska and rocksteady, slowing the tempo and emphasizing the off-beat guitar chop that became the genre's signature.|El reggae surgió en Jamaica a finales de los años 1960 a partir de estilos anteriores llamados ska y rocksteady, ralentizando el tempo y acentuando el rasgueo a contratiempo de guitarra que se volvió su seña de identidad.|Le reggae émergea en Jamaïque à la fin des années 1960 à partir de styles antérieurs appelés ska et rocksteady, ralentissant le tempo et accentuant le contretemps de guitare qui devint sa signature.|レゲエは1960年代末、ジャマイカでスカやロックステディといった先行するスタイルから生まれた。テンポを落とし、裏拍を刻むギターの奏法を持ち味とするようになった。",
  ),
  q(
    2,
    "What is the name of the Mexican holiday, honoring deceased loved ones with home altars and offerings, held in early November?|¿Cómo se llama la festividad mexicana que honra a los seres queridos difuntos con altares y ofrendas, celebrada a principios de noviembre?|Comment s'appelle la fête mexicaine honorant les proches défunts avec des autels et des offrandes, célébrée au début du mois de novembre ?|11月初めに家庭の祭壇と供え物で故人を偲ぶメキシコの祝日の名は?",
    [
      "Cinco de Mayo|Cinco de Mayo|Cinco de Mayo|シンコ・デ・マヨ",
      "Independence Day|Día de la Independencia|Le jour de l'Indépendance|独立記念日",
      "Día de los Muertos|Día de los Muertos|Día de los Muertos|死者の日",
    ],
    2,
    "Día de los Muertos blends Indigenous traditions honoring ancestors with the Catholic calendar's All Souls' Day, and families believe the marigold petals scattered along a path help guide spirits home for the visit.|El Día de los Muertos mezcla tradiciones indígenas de honra a los antepasados con el Día de Todos los Santos del calendario católico, y las familias creen que los pétalos de cempasúchil esparcidos por un camino ayudan a guiar a los espíritus de vuelta a casa.|Le Día de los Muertos mêle des traditions indigènes honorant les ancêtres au jour catholique de la Toussaint, et les familles croient que les pétales de rose d'Inde éparpillés le long d'un chemin aident à guider les esprits jusqu'à la maison pour cette visite.|死者の日は、先祖を敬う先住民の伝統とカトリック暦の万霊節が混ざり合ったもので、道に撒かれたマリーゴールドの花びらが、訪れる死者の魂を家まで導くと信じられている。",
  ),
  q(
    4,
    "Every autumn, monarch butterflies migrate thousands of kilometers to overwinter in the forests of which country?|Cada otoño, las mariposas monarca migran miles de kilómetros para invernar en los bosques de qué país?|Chaque automne, les papillons monarques migrent sur des milliers de kilomètres pour hiverner dans les forêts de quel pays ?|毎秋、何千kmも渡って森で越冬する場所として知られるオオカバマダラの目的地の国は?",
    [
      "Costa Rica|Costa Rica|Le Costa Rica|コスタリカ",
      "Cuba|Cuba|Cuba|キューバ",
      "Mexico|México|Le Mexique|メキシコ",
    ],
    2,
    "Millions of monarchs from as far away as Canada cluster so densely in a handful of fir forests west of Mexico City that branches visibly bend under their combined weight, a wintering ground that was not confirmed by scientists until 1975.|Millones de monarcas venidas de tan lejos como Canadá se agrupan tan densamente en un puñado de bosques de oyamel al oeste de la Ciudad de México que las ramas se doblan visiblemente bajo su peso conjunto, un lugar de invernada que los científicos no confirmaron hasta 1975.|Des millions de monarques venus d'aussi loin que le Canada se massent si densément dans une poignée de forêts de sapins à l'ouest de Mexico que les branches plient visiblement sous leur poids cumulé, un site d'hivernage que les scientifiques ne confirmèrent qu'en 1975.|カナダほど遠方から来た何百万匹ものオオカバマダラが、メキシコシティ西方のわずかな樅の森に密集して群がり、枝がその重みで目に見えてしなうほどになる。この越冬地が科学的に確認されたのは1975年になってからだった。",
  ),
  q(
    3,
    "Which North American mammal, a symbol of the Great Plains, was hunted to near extinction in the nineteenth century?|¿Qué mamífero norteamericano, símbolo de las Grandes Llanuras, fue cazado casi hasta la extinción en el siglo XIX?|Quel mammifère nord-américain, symbole des Grandes Plaines, fut chassé jusqu'au bord de l'extinction au XIXe siècle ?|大平原の象徴とされ、19世紀にほぼ絶滅寸前まで狩り尽くされた北アメリカの哺乳類は?",
    [
      "The grizzly bear|El oso pardo|Le grizzli|ハイイログマ",
      "The pronghorn|El berrendo|L'antilocapre|プロングホーン",
      "The American bison|El bisonte americano|Le bison d'Amérique|アメリカバイソン",
    ],
    2,
    "Tens of millions of bison once roamed the plains, but commercial hide-hunting and a deliberate campaign to undercut Indigenous nations that depended on the herds left fewer than a thousand animals alive by the 1880s.|Antes recorrían las llanuras decenas de millones de bisontes, pero la caza comercial de pieles y una campaña deliberada para debilitar a las naciones indígenas que dependían de las manadas dejaron menos de mil animales vivos hacia la década de 1880.|Des dizaines de millions de bisons parcouraient jadis les plaines, mais la chasse commerciale aux peaux et une campagne délibérée visant à affaiblir les nations autochtones qui dépendaient des troupeaux ne laissèrent pas plus d'un millier de bêtes vivantes dans les années 1880.|かつて大平原には何千万頭ものバイソンがいたが、毛皮を目的とした商業狩猟と、群れに頼る先住民の力を削ぐための意図的な政策により、1880年代までに生き残った頭数は千頭に満たなかった。",
  ),
  q(
    5,
    "Central America sits along a horseshoe-shaped belt of frequent earthquakes and active volcanoes known as what?|Centroamérica se sitúa a lo largo de un cinturón en forma de herradura de terremotos frecuentes y volcanes activos conocido como qué?|L'Amérique centrale se trouve sur une ceinture en fer à cheval de séismes fréquents et de volcans actifs, connue sous quel nom ?|中央アメリカが位置する、地震と活火山の多い馬蹄形の帯は何と呼ばれるか?",
    [
      "The Great Rift Valley|El Gran Valle del Rift|Le grand rift|グレート・リフト・バレー",
      "The Mid-Atlantic Ridge|La dorsal mesoatlántica|La dorsale médio-atlantique|大西洋中央海嶺",
      "The Ring of Fire|El Cinturón de Fuego|La ceinture de feu|環太平洋火山帯",
    ],
    2,
    "The Ring of Fire traces the edges of the Pacific Ocean's tectonic plates for roughly 40,000 kilometers, and about three-quarters of the world's active volcanoes, including most of Central America's, sit somewhere along it.|El Cinturón de Fuego sigue los bordes de las placas tectónicas del océano Pacífico a lo largo de unos 40.000 kilómetros, y aproximadamente tres cuartas partes de los volcanes activos del mundo, incluidos la mayoría de los centroamericanos, se hallan en algún punto de su recorrido.|La ceinture de feu suit les bords des plaques tectoniques de l'océan Pacifique sur environ 40 000 kilomètres, et environ les trois quarts des volcans actifs du monde, dont la plupart de ceux d'Amérique centrale, se trouvent quelque part le long de son tracé.|環太平洋火山帯は太平洋のプレートの縁に沿っておよそ4万kmにわたって延び、世界の活火山のおよそ4分の3が、中米のほとんどの火山を含めてこの帯のどこかに位置している。",
  ),
  q(
    6,
    "What is the name of the imaginary line, running along mountain ranges from Alaska to Panama, that separates rivers draining to the Atlantic from those draining to the Pacific?|¿Cómo se llama la línea imaginaria, trazada a lo largo de las cordilleras desde Alaska hasta Panamá, que separa los ríos que drenan al Atlántico de los que drenan al Pacífico?|Comment s'appelle la ligne imaginaire, courant le long des chaînes de montagnes de l'Alaska au Panama, qui sépare les rivières se jetant dans l'Atlantique de celles se jetant dans le Pacifique ?|アラスカからパナマまで山脈沿いに延び、大西洋へ注ぐ川と太平洋へ注ぐ川を分ける仮想の線は?",
    [
      "The Continental Divide|La Divisoria Continental|La ligne de partage des eaux continentale|大陸分水嶺",
      "The Equator|El ecuador|L'équateur|赤道",
      "The Tropic of Cancer|El trópico de Cáncer|Le tropique du Cancer|北回帰線",
    ],
    0,
    "A drop of rain landing exactly on the Continental Divide could, in principle, end up in either ocean depending on which side of a ridge it happens to fall, and several marked crossing points along highways let travelers straddle the line on foot.|Una gota de lluvia que cayera justo sobre la Divisoria Continental podría, en principio, acabar en cualquiera de los dos océanos según el lado de la cresta en que caiga, y varios puntos señalizados junto a carreteras dejan a los viajeros pisar la línea con un pie en cada lado.|Une goutte de pluie tombant exactement sur la ligne de partage des eaux continentale pourrait, en principe, finir dans l'un ou l'autre océan selon le côté de la crête où elle tombe, et plusieurs points signalés le long des routes permettent aux voyageurs de se tenir à cheval sur la ligne.|大陸分水嶺のちょうど真上に落ちた雨粒は、尾根のどちら側に落ちるかによって理論上どちらの海にもたどり着きうる。街道沿いにはいくつも標識があり、旅行者はその線をまたいで立つことができる。",
  ),
  q(
    5,
    "The original 1994 free-trade agreement that became today's USMCA originally linked which three countries?|El tratado de libre comercio original de 1994 que hoy es el T-MEC, ¿unía originalmente a qué tres países?|L'accord de libre-échange original de 1994, devenu aujourd'hui l'ACEUM, liait à l'origine quels trois pays ?|今日のUSMCAの前身にあたる1994年の自由貿易協定は、当初どの三国を結んでいたか?",
    [
      "The United States, Cuba and Panama|Estados Unidos, Cuba y Panamá|Les États-Unis, Cuba et le Panama|アメリカ・キューバ・パナマ",
      "The United States, Canada and Mexico|Estados Unidos, Canadá y México|Les États-Unis, le Canada et le Mexique|アメリカ・カナダ・メキシコ",
      "Canada, Guatemala and Belize|Canadá, Guatemala y Belice|Le Canada, le Guatemala et le Belize|カナダ・グアテマラ・ベリーズ",
    ],
    1,
    "NAFTA eliminated most tariffs among the three countries starting in 1994 and was replaced by a renegotiated version, the USMCA, in 2020, keeping the same three members but tightening several of its rules.|El TLCAN eliminó la mayoría de los aranceles entre los tres países a partir de 1994 y fue sustituido por una versión renegociada, el T-MEC, en 2020, que mantuvo a los mismos tres miembros pero endureció varias de sus reglas.|L'ALENA élimina la plupart des tarifs douaniers entre les trois pays à partir de 1994 et fut remplacé par une version renégociée, l'ACEUM, en 2020, conservant les trois mêmes membres mais durcissant plusieurs de ses règles.|NAFTAは1994年から三国間の関税の大半を撤廃し、2020年には再交渉されたUSMCAに置き換わった。加盟国は同じ三国のままだが、いくつかの規則が厳しくなった。",
  ),
  q(
    6,
    "Costa Rica's currency, the colón, is named after which historical figure?|El colón, la moneda de Costa Rica, ¿debe su nombre a qué figura histórica?|Le colón, la monnaie du Costa Rica, doit son nom à quelle figure historique ?|コスタリカの通貨コロンは、どの歴史上の人物にちなんで名付けられたか?",
    [
      "Simón Bolívar|Simón Bolívar|Simón Bolívar|シモン・ボリバル",
      "Hernán Cortés|Hernán Cortés|Hernán Cortés|エルナン・コルテス",
      "Christopher Columbus|Cristóbal Colón|Christophe Colomb|クリストファー・コロンブス",
    ],
    2,
    "Costa Rica and El Salvador both once named their currency after Columbus, whose Spanish surname is Colón; El Salvador later switched entirely to the US dollar, while Costa Rica kept its colón alongside growing everyday use of the dollar.|Costa Rica y El Salvador nombraron ambos en su día su moneda en honor a Colón; El Salvador cambió después por completo al dólar estadounidense, mientras que Costa Rica conservó su colón junto a un uso cotidiano creciente del dólar.|Le Costa Rica et le Salvador nommèrent tous deux jadis leur monnaie en l'honneur de Colomb, dont le nom espagnol est Colón ; le Salvador passa ensuite entièrement au dollar américain, tandis que le Costa Rica conserva son colón aux côtés d'un usage quotidien croissant du dollar.|コスタリカとエルサルバドルは、かつてどちらもコロンブスのスペイン語表記「コロン」にちなんで通貨を名付けた。エルサルバドルはのちに完全に米ドルへ切り替えたが、コスタリカは日常的なドル使用が広がる一方でコロンを使い続けている。",
  ),
  q(
    5,
    "Which currency circulates as legal tender in Panama alongside its own coins?|¿Qué moneda circula como de curso legal en Panamá junto a sus propias monedas?|Quelle monnaie a cours légal au Panama aux côtés de ses propres pièces ?|パナマで自国の硬貨とともに法定通貨として流通している通貨は?",
    [
      "The euro|El euro|L'euro|ユーロ",
      "The Canadian dollar|El dólar canadiense|Le dollar canadien|カナダドル",
      "The US dollar|El dólar estadounidense|Le dollar américain|米ドル",
    ],
    2,
    "Panama has used the US dollar as its paper currency since 1904, the year after it gained independence with American backing, printing only its own coins, called balboas, which are minted to match US coin sizes exactly.|Panamá usa el dólar estadounidense como papel moneda desde 1904, el año después de lograr la independencia con respaldo estadounidense, e imprime solo sus propias monedas, llamadas balboas, acuñadas para coincidir exactamente con el tamaño de las monedas de EE. UU.|Le Panama utilise le dollar américain comme monnaie papier depuis 1904, l'année suivant son indépendance obtenue avec l'appui américain, ne frappant que ses propres pièces, appelées balboas, dont la taille correspond exactement à celle des pièces américaines.|パナマは、アメリカの後押しで独立した翌年の1904年から紙幣に米ドルを用いている。自国で鋳造するのは「バルボア」と呼ばれる硬貨だけで、アメリカの硬貨とまったく同じ大きさに作られている。",
  ),
  q(
    4,
    "What term, still used today, describes the outsized political and economic influence a few fruit companies once held over small Central American nations?|¿Qué término, aún usado hoy, describe la influencia política y económica desmedida que unas pocas bananeras tuvieron sobre pequeñas naciones centroamericanas?|Quel terme, encore employé aujourd'hui, décrit l'influence politique et économique démesurée que quelques compagnies fruitières exercèrent jadis sur de petites nations d'Amérique centrale ?|かつて少数のフルーツ会社が中米の小国に及ぼした過大な政治的・経済的影響力を指し、今も使われる言葉は?",
    [
      "A \"company town\"|Un «pueblo de empresa»|Une « ville-usine »|企業城下町",
      "A \"petro-state\"|Un «petroestado»|Un « pétro-État »|石油国家",
      "A \"banana republic\"|Una «república bananera»|Une « république bananière »|バナナ共和国",
    ],
    2,
    "The phrase was coined by the American writer O. Henry in a 1904 short story about a fictional country modeled on Honduras, where a single foreign fruit company's plantations, railways and ports could outweigh the elected government.|La frase fue acuñada por el escritor estadounidense O. Henry en un relato de 1904 sobre un país ficticio inspirado en Honduras, donde las plantaciones, ferrocarriles y puertos de una sola bananera extranjera podían pesar más que el gobierno electo.|L'expression fut inventée par l'écrivain américain O. Henry dans une nouvelle de 1904 sur un pays fictif inspiré du Honduras, où les plantations, chemins de fer et ports d'une seule compagnie fruitière étrangère pouvaient peser plus lourd que le gouvernement élu.|この言葉は、ホンジュラスをもとにした架空の国を描いた1904年のアメリカの作家オー・ヘンリーの短編小説から生まれた。そこでは一つの外国のフルーツ会社が持つ農園・鉄道・港が、選挙で選ばれた政府より大きな力を持ちえた。",
  ),
  q(
    7,
    "Which international body, headquartered in Washington DC, promotes cooperation among the nations of the Americas?|¿Qué organismo internacional, con sede en Washington D. C., promueve la cooperación entre las naciones de América?|Quel organisme international, basé à Washington, promeut la coopération entre les nations des Amériques ?|南北アメリカ諸国の協力を進める、ワシントンD.C.に本部を置く国際機関は?",
    [
      "The United Nations|Las Naciones Unidas|Les Nations unies|国際連合",
      "The World Trade Organization|La Organización Mundial del Comercio|L'Organisation mondiale du commerce|世界貿易機関",
      "The Organization of American States|La Organización de los Estados Americanos|L'Organisation des États américains|米州機構",
    ],
    2,
    "Founded in 1948 and tracing its roots to an even older 1889 pan-American conference, the Organization of American States counts every recognized country in the Americas among its members except Cuba, which was excluded in 1962.|Fundada en 1948 y con raíces en una conferencia panamericana aún más antigua, de 1889, la Organización de los Estados Americanos cuenta entre sus miembros a todos los países reconocidos de América salvo Cuba, excluida en 1962.|Fondée en 1948 et puisant ses racines dans une conférence panaméricaine encore plus ancienne, datant de 1889, l'Organisation des États américains compte parmi ses membres tous les pays reconnus des Amériques sauf Cuba, exclue en 1962.|1948年に設立され、さらに古い1889年の汎米会議にその起源をたどる米州機構には、1962年に除名されたキューバを除く南北アメリカのすべての承認国が加盟している。",
  ),

  // -------------------------------------------------------------------
  // 以下、団体戦の偏り是正のため追加(易しい層+6・中間層+24・難しい層+24・
  // 最難層+12。都市カード61件・上のQ1〜36と重ならない題材を選んだ)
  // -------------------------------------------------------------------
  q(
    1,
    "Which two oceans does the Panama Canal connect?|¿Qué dos océanos conecta el Canal de Panamá?|Quels deux océans le canal de Panama relie-t-il ?|パナマ運河はどの二つの大洋を結んでいるか?",
    [
      "The Pacific and the Atlantic|El Pacífico y el Atlántico|Le Pacifique et l'Atlantique|太平洋と大西洋",
      "The Pacific and the Indian|El Pacífico y el Índico|Le Pacifique et l'Indien|太平洋とインド洋",
      "The Atlantic and the Arctic|El Atlántico y el Ártico|L'Atlantique et l'Arctique|大西洋と北極海",
    ],
    0,
    "Opened in 1914, the canal cuts roughly 80 kilometers across the isthmus, saving ships the months-long voyage around South America's Cape Horn.|Inaugurado en 1914, el canal atraviesa unos 80 kilómetros del istmo, ahorrando a los barcos el viaje de meses para rodear el cabo de Hornos en Sudamérica.|Ouvert en 1914, le canal traverse environ 80 kilomètres de l'isthme, épargnant aux navires le voyage de plusieurs mois pour contourner le cap Horn, en Amérique du Sud.|1914年に開通したこの運河は地峡を約80km貫いており、南アメリカのホーン岬を回る何か月もの航海を船から省かせている。",
  ),
  q(
    1,
    "Baseball's championship series, the World Series, is contested almost entirely between teams from which two countries?|¿Entre equipos de qué dos países se disputa casi siempre la Serie Mundial, el campeonato del béisbol?|La Série mondiale, le championnat de baseball, oppose presque toujours des équipes de quels deux pays ?|野球の頂点を決める「ワールドシリーズ」は、ほぼどの二か国のチームの間で争われるか?",
    [
      "The United States and Mexico|Estados Unidos y México|Les États-Unis et le Mexique|アメリカとメキシコ",
      "The United States and Canada|Estados Unidos y Canadá|Les États-Unis et le Canada|アメリカとカナダ",
      "The United States and Cuba|Estados Unidos y Cuba|Les États-Unis et Cuba|アメリカとキューバ",
    ],
    1,
    "Despite the name, only one non-US team, Canada's Toronto Blue Jays, has ever won it, doing so in 1992 and 1993.|A pesar del nombre, solo un equipo no estadounidense, los Azulejos de Toronto de Canadá, la ha ganado, en 1992 y 1993.|Malgré son nom, une seule équipe non américaine, les Blue Jays de Toronto, l'a remportée, en 1992 et 1993.|その名に反して、アメリカ以外のチームで優勝したのはカナダのトロント・ブルージェイズ(1992年・1993年)だけである。",
  ),
  q(
    2,
    "Greenland, geographically part of North America, is a territory of which European country?|Groenlandia, geográficamente parte de América del Norte, es territorio de qué país europeo?|Le Groenland, géographiquement en Amérique du Nord, est un territoire de quel pays européen ?|地理的には北アメリカに属するグリーンランドは、どのヨーロッパの国の領土か?",
    [
      "Norway|Noruega|La Norvège|ノルウェー",
      "The United Kingdom|El Reino Unido|Le Royaume-Uni|イギリス",
      "Denmark|Dinamarca|Le Danemark|デンマーク",
    ],
    2,
    "Greenland runs most of its own domestic affairs but relies on Denmark for defense and foreign policy, and a majority of its population is Inuit.|Groenlandia gestiona la mayoría de sus asuntos internos, pero depende de Dinamarca en defensa y política exterior, y la mayoría de su población es inuit.|Le Groenland gère l'essentiel de ses affaires intérieures mais dépend du Danemark pour la défense et la politique étrangère, et la majorité de sa population est inuit.|グリーンランドは内政の大半を自ら担うが、国防と外交はデンマークに委ねており、住民の多くはイヌイットである。",
  ),
  q(
    2,
    "The loonie and the toonie are coins used in which country?|¿En qué país se usan las monedas llamadas loonie y toonie?|Dans quel pays utilise-t-on les pièces appelées loonie et toonie ?|ルーニーとトゥーニーという硬貨が使われているのはどの国か?",
    [
      "Canada|Canadá|Le Canada|カナダ",
      "The United States|Estados Unidos|Les États-Unis|アメリカ",
      "Mexico|México|Le Mexique|メキシコ",
    ],
    0,
    "The loonie, a one-dollar coin, is named for the loon pictured on it; the two-dollar coin that followed was nicknamed the toonie to match.|El loonie, moneda de un dólar, debe su nombre al somorgujo (loon) grabado en ella; la moneda de dos dólares que siguió se apodó toonie a juego.|Le loonie, pièce d'un dollar, doit son nom au huard (loon) qui y est gravé ; la pièce de deux dollars qui a suivi fut surnommée toonie en écho.|1ドル硬貨「ルーニー」の名は、刻まれた水鳥アビ(loon)に由来する。その後発行された2ドル硬貨は語呂を合わせて「トゥーニー」と呼ばれるようになった。",
  ),
  q(
    3,
    "Guatemala's currency, the quetzal, is named after a type of what?|La moneda de Guatemala, el quetzal, debe su nombre a un tipo de qué?|La monnaie du Guatemala, le quetzal, doit son nom à un type de quoi ?|グアテマラの通貨ケツァルは、何の一種にちなんで名付けられたか?",
    [
      "A flower|Una flor|Une fleur|花",
      "A bird|Un ave|Un oiseau|鳥",
      "A tree|Un árbol|Un arbre|木",
    ],
    1,
    "The resplendent quetzal, prized by the Maya for its brilliant green tail feathers, is also Guatemala's national bird.|El quetzal resplandeciente, apreciado por los mayas por sus brillantes plumas verdes de la cola, es también el ave nacional de Guatemala.|Le quetzal resplendissant, apprécié des Mayas pour ses plumes caudales d'un vert éclatant, est aussi l'oiseau national du Guatemala.|マヤの人々が輝く緑の尾羽を珍重したケツァルは、グアテマラの国鳥でもある。",
  ),
  q(
    3,
    "The English word \"canoe\" entered European languages from the language of which Caribbean indigenous people?|La palabra inglesa \"canoe\" (canoa) llegó a las lenguas europeas del idioma de qué pueblo indígena del Caribe?|Le mot anglais « canoe » (canoë) est entré dans les langues européennes par la langue de quel peuple indigène des Caraïbes ?|英語のcanoe(カヌー)という語は、カリブ海のどの先住民の言語からヨーロッパの言語に入ったか?",
    [
      "The Maya|Los mayas|Les Mayas|マヤ",
      "The Aztec|Los aztecas|Les Aztèques|アステカ",
      "The Taíno|Los taínos|Les Taïnos|タイノ",
    ],
    2,
    "Spanish colonists first recorded the word from the Taíno of the Greater Antilles in the late 15th century, and it spread from Spanish into English and other European languages soon after.|Los colonos españoles registraron la palabra por primera vez tomándola de los taínos de las Antillas Mayores a finales del siglo XV, y de ahí pasó pronto del español al inglés y a otras lenguas europeas.|Les colons espagnols consignèrent le mot pour la première fois auprès des Taïnos des Grandes Antilles à la fin du XVe siècle, d'où il passa bientôt de l'espagnol vers l'anglais et d'autres langues européennes.|スペインの植民者たちは15世紀末、大アンティル諸島のタイノの人々からこの語を初めて記録し、そこからほどなくスペイン語を経て英語など他のヨーロッパの言語へ広まった。",
  ),
  q(
    4,
    "The Aleutian Islands, stretching from mainland Alaska toward Russia, belong to which country?|Las islas Aleutianas, que se extienden desde Alaska continental hacia Rusia, ¿a qué país pertenecen?|Les îles Aléoutiennes, qui s'étirent de l'Alaska continentale vers la Russie, appartiennent à quel pays ?|アラスカ本土からロシアへ向けて連なるアリューシャン列島は、どの国に属するか?",
    [
      "The United States|Estados Unidos|Les États-Unis|アメリカ",
      "Russia|Rusia|La Russie|ロシア",
      "Canada|Canadá|Le Canada|カナダ",
    ],
    0,
    "Some of the outermost islands, like Attu, sit so far west that they fall on the other side of the International Date Line from the rest of the country.|Algunas de las islas más occidentales, como Attu, están tan al oeste que quedan al otro lado de la línea internacional de cambio de fecha respecto al resto del país.|Certaines des îles les plus occidentales, comme Attu, sont si loin à l'ouest qu'elles se trouvent de l'autre côté de la ligne de changement de date internationale par rapport au reste du pays.|アッツ島など最も西にある島々は、あまりに西寄りにあるため、国の他の地域から見て日付変更線の反対側に位置する。",
  ),
  q(
    5,
    "Costa Rica and Nicaragua both claim as their own a rice-and-beans dish called what?|Costa Rica y Nicaragua reclaman como propio un plato de arroz con frijoles llamado cómo?|Le Costa Rica et le Nicaragua revendiquent tous deux comme leur un plat de riz et de haricots appelé comment ?|コスタリカとニカラグアがともに自国発祥だと主張する、米と豆の料理は何か?",
    [
      "Mofongo|Mofongo|Le mofongo|モフォンゴ",
      "Gallo pinto|Gallo pinto|Le gallo pinto|ガジョ・ピント",
      "Ceviche|Ceviche|Le ceviche|セビーチェ",
    ],
    1,
    "The dish's name, meaning \"spotted rooster,\" refers to the speckled look the rice takes on once mixed with beans, and each country insists it invented the recipe first.|El nombre del plato, «gallo pinto», alude al aspecto moteado que toma el arroz al mezclarse con los frijoles, y cada país insiste en haber inventado la receta primero.|Le nom du plat, « coq tacheté », évoque l'aspect moucheté que prend le riz une fois mélangé aux haricots, et chaque pays insiste avoir inventé la recette en premier.|「まだら模様の雄鶏」を意味するこの料理名は、豆と混ざった米のまだら模様に由来し、両国とも自分たちが先に考案したと譲らない。",
  ),
  q(
    5,
    "Chili con carne, a dish often assumed to be Mexican, is generally traced to which US state?|El chile con carne, un plato que suele darse por mexicano, se remonta generalmente a qué estado de EE. UU.?|Le chili con carne, un plat souvent supposé mexicain, est généralement rattaché à quel État américain ?|しばしばメキシコ料理だと思われているチリ・コン・カルネは、一般にアメリカのどの州が起源とされるか?",
    [
      "California|California|La Californie|カリフォルニア州",
      "New Mexico|Nuevo México|Le Nouveau-Mexique|ニューメキシコ州",
      "Texas|Texas|Le Texas|テキサス州",
    ],
    2,
    "The dish is largely unknown in traditional Mexican cuisine, and its association with Texas gave rise to the broader food category now called Tex-Mex.|El plato es prácticamente desconocido en la cocina tradicional mexicana, y su asociación con Texas dio origen a la categoría culinaria más amplia hoy llamada tex-mex.|Le plat est largement méconnu de la cuisine mexicaine traditionnelle, et son association avec le Texas donna naissance à la catégorie culinaire aujourd'hui appelée tex-mex.|この料理は伝統的なメキシコ料理にはほとんど見られず、テキサス州との結びつきから、いまの「テクスメクス」という料理区分が生まれた。",
  ),
  q(
    4,
    "Lacrosse, with roots among Indigenous peoples of North America, is Canada's official national sport of which season?|El lacrosse, con raíces entre los pueblos indígenas de América del Norte, es el deporte nacional oficial de Canadá de qué estación?|La crosse, dont les racines remontent aux peuples autochtones d'Amérique du Nord, est le sport national officiel du Canada de quelle saison ?|北アメリカ先住民に起源を持つラクロスは、カナダのどの季節の公式国技とされているか?",
    [
      "Summer|Verano|L'été|夏",
      "Winter|Invierno|L'hiver|冬",
      "Autumn|Otoño|L'automne|秋",
    ],
    0,
    "A 1994 law names lacrosse Canada's official summer sport and ice hockey its official winter sport, giving the country two national sports rather than one.|Una ley de 1994 declara al lacrosse deporte nacional de verano de Canadá y al hockey sobre hielo deporte nacional de invierno, dando al país dos deportes nacionales en vez de uno.|Une loi de 1994 fait de la crosse le sport national d'été du Canada et du hockey sur glace son sport national d'hiver, donnant au pays deux sports nationaux plutôt qu'un seul.|1994年の法律により、ラクロスはカナダの夏の公式国技、アイスホッケーは冬の公式国技とされ、この国には国技が一つではなく二つある。",
  ),
  q(
    6,
    "Nunavut, Canada's largest and newest territory, was created in 1999 by splitting it off from which territory?|Nunavut, el territorio más grande y reciente de Canadá, se creó en 1999 al separarse de qué territorio?|Le Nunavut, le plus vaste et le plus récent territoire du Canada, fut créé en 1999 en se détachant de quel territoire ?|カナダ最大かつ最も新しい準州ヌナブトは、1999年にどの準州から分離して生まれたか?",
    [
      "Yukon|Yukón|Le Yukon|ユーコン準州",
      "The Northwest Territories|Los Territorios del Noroeste|Les Territoires du Nord-Ouest|ノースウェスト準州",
      "British Columbia|Columbia Británica|La Colombie-Britannique|ブリティッシュコロンビア州",
    ],
    1,
    "The split followed decades of negotiation with the Inuit, who make up the majority of Nunavut's population and whose land claim helped define its borders.|La separación siguió a décadas de negociación con los inuit, mayoría de la población de Nunavut, cuya reivindicación territorial ayudó a definir sus fronteras.|La séparation suivit des décennies de négociations avec les Inuits, majoritaires dans la population du Nunavut, dont la revendication territoriale contribua à définir ses frontières.|この分離は、ヌナブトの住民の多数を占め、その土地要求が境界の決定に寄与したイヌイットとの数十年に及ぶ交渉の末に実現した。",
  ),
  q(
    6,
    "The brief 1969 \"Football War,\" whose real causes lay in migration and land disputes rather than sport, was fought between which two countries?|La breve «Guerra del Fútbol» de 1969, cuyas causas reales fueron migratorias y territoriales más que deportivas, ¿entre qué dos países se libró?|La brève « guerre du Football » de 1969, dont les vraies causes tenaient à la migration et aux différends territoriaux plutôt qu'au sport, opposa quels deux pays ?|1969年の短い「サッカー戦争」――本当の原因はスポーツではなく移民と土地問題だった――は、どの二国のあいだで戦われたか?",
    [
      "Guatemala and Belize|Guatemala y Belice|Le Guatemala et le Belize|グアテマラとベリーズ",
      "Nicaragua and Costa Rica|Nicaragua y Costa Rica|Le Nicaragua et le Costa Rica|ニカラグアとコスタリカ",
      "El Salvador and Honduras|El Salvador y Honduras|Le Salvador et le Honduras|エルサルバドルとホンジュラス",
    ],
    2,
    "The conflict broke out amid tensions surrounding a World Cup qualifying match between the two countries, giving the four-day war its popular nickname, though the underlying dispute was over land and migrant workers.|El conflicto estalló en medio de las tensiones de un partido clasificatorio para el Mundial entre ambos países, lo que dio a la guerra de cuatro días su apodo, aunque el fondo del litigio era la tierra y los trabajadores migrantes.|Le conflit éclata au milieu des tensions entourant un match de qualification pour la Coupe du monde entre les deux pays, ce qui valut à cette guerre de quatre jours son surnom, bien que le vrai différend portât sur la terre et les travailleurs migrants.|この紛争は両国間のワールドカップ予選の緊張の最中に勃発し、それが4日間の戦争にこの通称を与えたが、根底にあったのは土地と出稼ぎ労働者をめぐる争いだった。",
  ),
  q(
    7,
    "The 1917 Zimmermann Telegram, intercepted by British intelligence, proposed a wartime alliance between Germany and which North American country against the United States?|El telegrama Zimmermann de 1917, interceptado por inteligencia británica, proponía una alianza de guerra entre Alemania y qué país norteamericano contra Estados Unidos?|Le télégramme Zimmermann de 1917, intercepté par le renseignement britannique, proposait une alliance de guerre entre l'Allemagne et quel pays nord-américain contre les États-Unis ?|イギリス情報部が傍受した1917年のツィンメルマン電報は、ドイツとどの北アメリカの国との対米同盟を持ちかけていたか?",
    [
      "Mexico|México|Le Mexique|メキシコ",
      "Cuba|Cuba|Cuba|キューバ",
      "Canada|Canadá|Le Canada|カナダ",
    ],
    0,
    "The telegram, which promised Mexico help recovering Texas, New Mexico and Arizona in exchange for joining Germany, helped push the United States into World War I once it became public.|El telegrama, que prometía a México ayuda para recuperar Texas, Nuevo México y Arizona a cambio de unirse a Alemania, ayudó a empujar a Estados Unidos a la Primera Guerra Mundial al hacerse público.|Le télégramme, qui promettait à Mexico une aide pour récupérer le Texas, le Nouveau-Mexique et l'Arizona en échange d'un ralliement à l'Allemagne, contribua à pousser les États-Unis dans la Première Guerre mondiale une fois rendu public.|この電報はドイツ側につけばテキサス・ニューメキシコ・アリゾナの奪還を助けると約束するもので、公になったことがアメリカを第一次世界大戦参戦へ後押しする一因となった。",
  ),
  q(
    5,
    "Belize, an English-speaking country in Central America, was known by which name until its 1973 renaming?|Belice, país anglófono de Centroamérica, ¿con qué nombre se conocía hasta su cambio de nombre en 1973?|Le Belize, pays anglophone d'Amérique centrale, était connu sous quel nom avant son changement de nom en 1973 ?|中米の英語圏の国ベリーズは、1973年に改名するまで何と呼ばれていたか?",
    [
      "New Caledonia|Nueva Caledonia|La Nouvelle-Calédonie|ニューカレドニア",
      "British Honduras|Honduras Británico|Le Honduras britannique|イギリス領ホンジュラス",
      "British Guiana|Guayana Británica|La Guyane britannique|イギリス領ギアナ",
    ],
    1,
    "The colony kept its old name for nine years after gaining self-government in 1964, only adopting \"Belize\" in the run-up to full independence in 1981.|La colonia conservó su antiguo nombre nueve años después de obtener el autogobierno en 1964, y adoptó «Belice» solo en el tramo previo a la independencia plena de 1981.|La colonie conserva son ancien nom neuf ans après avoir obtenu l'autonomie en 1964, n'adoptant « Belize » qu'à l'approche de l'indépendance complète de 1981.|この植民地は1964年に自治を得たあとも9年間旧名を保ち、「ベリーズ」を名乗ったのは1981年の完全独立を目前にしてのことだった。",
  ),
  q(
    6,
    "Canada's 1969 law making English and French equal at the federal level is known as what?|La ley canadiense de 1969 que igualó al inglés y al francés a nivel federal se conoce como qué?|La loi canadienne de 1969 qui rendit l'anglais et le français égaux au niveau fédéral est connue sous quel nom ?|1969年、カナダで英語とフランス語を連邦レベルで対等に扱うよう定めた法律は何と呼ばれるか?",
    [
      "The Indian Act|La Ley Indígena|La Loi sur les Indiens|インディアン法",
      "The Multiculturalism Act|La Ley de Multiculturalismo|La Loi sur le multiculturalisme|多文化主義法",
      "The Official Languages Act|La Ley de Idiomas Oficiales|La Loi sur les langues officielles|公用語法",
    ],
    2,
    "The act requires federal services to be available in both languages nationwide, though it does not require individual Canadians outside Quebec to be bilingual.|La ley exige que los servicios federales estén disponibles en ambos idiomas en todo el país, aunque no obliga a los canadienses fuera de Quebec a ser bilingües.|La loi exige que les services fédéraux soient offerts dans les deux langues à l'échelle du pays, sans pour autant obliger les Canadiens hors Québec à être bilingues.|この法律は連邦の行政サービスを全国で両言語で提供するよう定めているが、ケベック州外のカナダ人個人にバイリンガルを義務付けるものではない。",
  ),
  q(
    5,
    "A Canadian Football League field is how many yards long, compared with the NFL's 100?|¿Cuántas yardas mide un campo de la Liga Canadiense de Fútbol Americano, frente a las 100 de la NFL?|Un terrain de la Ligue canadienne de football compte combien de verges, contre 100 pour la NFL ?|カナダン・フットボール・リーグの競技場は、NFLの100ヤードに対して何ヤードあるか?",
    [
      "110|110|110|110",
      "105|105|105|105",
      "120|120|120|120",
    ],
    0,
    "The extra 10 yards, plus wider goal posts and only three downs instead of four, are among the rule differences that give Canadian football its own distinct rhythm.|Las 10 yardas de más, junto con postes más anchos y solo tres downs en vez de cuatro, son algunas de las diferencias que dan al fútbol canadiense su ritmo propio.|Ces 10 verges supplémentaires, des poteaux plus larges et seulement trois essais au lieu de quatre comptent parmi les différences de règles qui donnent au football canadien son rythme propre.|この10ヤードの差に加え、より幅の広いゴールポストや、4回ではなく3回のダウン制など、カナダン・フットボールにはこの競技独自のリズムを生む規則の違いがいくつもある。",
  ),
  q(
    5,
    "Mexico's Baja California peninsula is separated from the mainland by which body of water?|La península de Baja California, en México, ¿de qué cuerpo de agua la separa del continente?|La péninsule mexicaine de Basse-Californie est séparée du continent par quelle étendue d'eau ?|メキシコのバハカリフォルニア半島を本土から隔てているのはどの海域か?",
    [
      "The Gulf of Mexico|El golfo de México|Le golfe du Mexique|メキシコ湾",
      "The Gulf of California|El golfo de California|Le golfe de Californie|カリフォルニア湾",
      "The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海",
    ],
    1,
    "Also called the Sea of Cortés, the gulf is prized by marine biologists for its unusually high concentration of whale and dolphin species.|También llamado mar de Cortés, el golfo es apreciado por los biólogos marinos por su concentración inusualmente alta de especies de ballenas y delfines.|Aussi appelé mer de Cortés, le golfe est prisé des biologistes marins pour sa concentration inhabituellement élevée d'espèces de baleines et de dauphins.|コルテス海とも呼ばれるこの湾は、クジラやイルカの種数が異例に多いことで海洋生物学者に珍重されている。",
  ),
  q(
    6,
    "Unlike the United States, which North American country switched its highway signs to metric distances in the 1970s?|A diferencia de Estados Unidos, ¿qué país norteamericano pasó sus señales de carretera a distancias métricas en los años 1970?|Contrairement aux États-Unis, quel pays nord-américain a fait passer ses panneaux routiers aux distances métriques dans les années 1970 ?|アメリカとは異なり、1970年代に道路標識の距離をメートル法に切り替えた北アメリカの国はどこか?",
    [
      "Mexico|México|Le Mexique|メキシコ",
      "Guatemala|Guatemala|Le Guatemala|グアテマラ",
      "Canada|Canadá|Le Canada|カナダ",
    ],
    2,
    "The changeover, largely completed by 1977, means a Canadian driver crossing into the US must suddenly start reading distances in miles rather than kilometers.|El cambio, prácticamente completo en 1977, hace que un conductor canadiense que cruce a Estados Unidos deba leer de pronto las distancias en millas en vez de kilómetros.|Le changement, en grande partie achevé dès 1977, fait qu'un automobiliste canadien franchissant la frontière américaine doit soudain lire les distances en miles plutôt qu'en kilomètres.|この切り替えは1977年までにほぼ完了しており、カナダの運転手がアメリカへ入った途端、距離をキロメートルではなくマイルで読まねばならなくなる。",
  ),
  q(
    4,
    "Cacao, used to make chocolate, was so valued by Mesoamerican civilizations that its beans were once used as what?|El cacao, usado para hacer chocolate, era tan valorado por las civilizaciones mesoamericanas que sus granos se usaban como qué?|Le cacao, utilisé pour faire le chocolat, était si prisé des civilisations mésoaméricaines que ses fèves servaient jadis de quoi ?|チョコレートの原料であるカカオは、メソアメリカの文明にあまりに重んじられ、豆は何として使われていたか?",
    [
      "Currency|Moneda|Monnaie|通貨",
      "Medicine only|Solo medicina|Uniquement de médicament|薬としてのみ",
      "Building material|Material de construcción|Matériau de construction|建材",
    ],
    0,
    "Aztec markets recorded fixed cacao-bean prices for everyday goods — a rabbit for around 30 beans, according to one Spanish colonial account — making it one of history's few edible currencies.|Los mercados aztecas registraban precios fijos en granos de cacao para bienes cotidianos —un conejo por unos 30 granos, según un relato colonial español—, lo que la convierte en una de las pocas monedas comestibles de la historia.|Les marchés aztèques consignaient des prix fixes en fèves de cacao pour les biens courants — un lapin pour une trentaine de fèves, selon un récit colonial espagnol —, en faisant l'une des rares monnaies comestibles de l'histoire.|アステカの市場ではカカオ豆で日用品の値段が定められており、あるスペイン植民地時代の記録によればウサギ1羽が豆30粒ほどだったという。史上数少ない「食べられる通貨」の一つである。",
  ),
  q(
    6,
    "Of Haiti and the Dominican Republic, which nation occupies the larger share of the island of Hispaniola?|De Haití y la República Dominicana, ¿cuál ocupa la mayor parte de la isla de La Española?|D'Haïti et de la République dominicaine, lequel occupe la plus grande partie de l'île d'Hispaniola ?|ハイチとドミニカ共和国のうち、イスパニョーラ島でより広い面積を占めるのはどちらか?",
    [
      "Haiti|Haití|Haïti|ハイチ",
      "The Dominican Republic|La República Dominicana|La République dominicaine|ドミニカ共和国",
      "They split it exactly evenly|Se lo reparten en partes exactamente iguales|Ils se le partagent exactement en deux|正確に半分ずつ分けている",
    ],
    1,
    "The Dominican Republic covers roughly the eastern two-thirds of the island, while Haiti occupies the more mountainous western third.|La República Dominicana cubre aproximadamente los dos tercios orientales de la isla, mientras que Haití ocupa el tercio occidental, más montañoso.|La République dominicaine couvre environ les deux tiers orientaux de l'île, tandis qu'Haïti occupe le tiers occidental, plus montagneux.|ドミニカ共和国は島のおよそ東側3分の2を占め、ハイチはより山がちな西側3分の1を占めている。",
  ),
  q(
    7,
    "Maya hieroglyphic writing, once thought largely undecipherable, saw its major breakthroughs mostly during which decade?|La escritura jeroglífica maya, considerada en gran parte indescifrable, tuvo sus grandes avances sobre todo en qué década?|L'écriture hiéroglyphique maya, longtemps jugée largement indéchiffrable, a connu ses principales avancées surtout au cours de quelle décennie ?|かつて大部分は解読不能とされていたマヤの象形文字は、主にどの年代に大きな解読の進展があったか?",
    [
      "The 1950s|Los años 1950|Les années 1950|1950年代",
      "The 1970s|Los años 1970|Les années 1970|1970年代",
      "The 1980s|Los años 1980|Les années 1980|1980年代",
    ],
    2,
    "Breakthroughs by epigraphers including Linda Schele and David Stuart in the 1980s showed the script recorded actual history, not just calendar dates, transforming how Maya civilization is understood.|Los avances de epigrafistas como Linda Schele y David Stuart en los años 1980 mostraron que la escritura registraba historia real, no solo fechas del calendario, y transformaron la comprensión de la civilización maya.|Les percées d'épigraphistes comme Linda Schele et David Stuart dans les années 1980 montrèrent que l'écriture consignait une histoire réelle, et non de simples dates calendaires, transformant la compréhension de la civilisation maya.|1980年代、リンダ・シェーレやデイヴィッド・スチュアートらの碑文学者による解読の進展により、この文字が単なる暦の日付ではなく実際の歴史を記していたことが分かり、マヤ文明の理解を一変させた。",
  ),
  q(
    4,
    "Which Central American country abolished its standing army altogether in 1948?|¿Qué país centroamericano abolió por completo su ejército permanente en 1948?|Quel pays d'Amérique centrale a totalement aboli son armée permanente en 1948 ?|1948年に常備軍を全廃した中米の国はどこか?",
    [
      "Costa Rica|Costa Rica|Le Costa Rica|コスタリカ",
      "Panama|Panamá|Le Panama|パナマ",
      "Belize|Belice|Le Belize|ベリーズ",
    ],
    0,
    "The decision followed a brief civil war, and the money saved on the military was redirected toward education and healthcare, a point of national pride ever since.|La decisión siguió a una breve guerra civil, y el dinero ahorrado en lo militar se redirigió a educación y salud, motivo de orgullo nacional desde entonces.|La décision suivit une brève guerre civile, et l'argent économisé sur le militaire fut réorienté vers l'éducation et la santé, une fierté nationale depuis lors.|この決定は短い内戦のあとに下され、軍事費に充てるはずだった予算は教育と医療に振り向けられた。以来これは国の誇りとされている。",
  ),
  q(
    6,
    "The Pan-American Highway, the world's longest motorable road, has one deliberate gap of roughly 100 kilometers left unbuilt, separating Panama from Colombia — what is this gap called?|La Carretera Panamericana, la carretera transitable más larga del mundo, tiene un vacío deliberado de unos 100 kilómetros sin construir, que separa Panamá de Colombia; ¿cómo se llama este vacío?|La route panaméricaine, la plus longue route carrossable au monde, comporte un vide volontaire d'environ 100 kilomètres jamais construit, séparant le Panama de la Colombie — comment appelle-t-on ce vide ?|世界最長の自動車道パンアメリカン・ハイウェイには、パナマとコロンビアを隔てる約100kmの意図的な未整備区間がある。この空白地帯は何と呼ばれるか?",
    [
      "The Sonora Gap|El Vacío de Sonora|Le vide de Sonora|ソノラ・ギャップ",
      "The Darién Gap|El Tapón del Darién|Le bouchon du Darién|ダリエン・ギャップ",
      "The Chiapas Gap|El Vacío de Chiapas|Le vide du Chiapas|チアパス・ギャップ",
    ],
    1,
    "Dense rainforest, swampland and the difficulty of policing a border used by smugglers and, more recently, migrants heading north, have kept the gap unbuilt since the highway's other sections were completed decades ago.|La densa selva, los pantanos y la dificultad de vigilar una frontera usada por contrabandistas y, más recientemente, por migrantes rumbo al norte, han mantenido el vacío sin construir desde que se completaron las demás secciones de la carretera hace décadas.|La forêt tropicale dense, les marécages et la difficulté de surveiller une frontière empruntée par des contrebandiers puis, plus récemment, par des migrants en route vers le nord, ont empêché la construction de ce tronçon depuis que le reste de la route fut achevé il y a des décennies.|うっそうとした熱帯雨林と湿地、そして密輸業者や近年では北を目指す移民が使う国境地帯の取り締まりの難しさから、他の区間が何十年も前に完成したあとも、この空白地帯だけは手つかずのままである。",
  ),
  q(
    4,
    "Cinco de Mayo, widely celebrated in the United States, commemorates an 1862 Mexican military victory over the forces of which country?|El Cinco de Mayo, muy celebrado en Estados Unidos, conmemora una victoria militar mexicana de 1862 sobre las fuerzas de qué país?|Le Cinco de Mayo, largement célébré aux États-Unis, commémore une victoire militaire mexicaine de 1862 sur les forces de quel pays ?|アメリカで盛んに祝われる「シンコ・デ・マヨ」は、1862年にメキシコがどの国の軍を破った勝利を記念しているか?",
    [
      "Spain|España|L'Espagne|スペイン",
      "The United States|Estados Unidos|Les États-Unis|アメリカ",
      "France|Francia|La France|フランス",
    ],
    2,
    "The battle, fought at Puebla, was a single unexpected win in a war Mexico ultimately lost; the date is barely marked in most of Mexico itself but became a major celebration among Mexican-American communities in the US.|La batalla, librada en Puebla, fue un triunfo inesperado y aislado en una guerra que México acabó perdiendo; la fecha apenas se celebra en la mayor parte de México, pero se volvió una gran fiesta entre las comunidades méxico-estadounidenses.|La bataille, livrée à Puebla, fut une victoire isolée et inattendue dans une guerre que le Mexique perdit finalement ; la date est à peine marquée dans la majeure partie du Mexique mais devint une grande fête parmi les communautés mexicaines-américaines des États-Unis.|プエブラで行われたこの戦いは、結局メキシコが敗れる戦争の中での一度きりの意外な勝利だった。この日はメキシコ本国ではほとんど祝われないが、アメリカのメキシコ系コミュニティでは大きな祝日となった。",
  ),
  q(
    6,
    "Canada's Trans-Canada Highway, one of the longest national highways in the world, officially opened in which year?|La autopista Transcanadiense, una de las carreteras nacionales más largas del mundo, ¿en qué año se inauguró oficialmente?|La route transcanadienne, l'une des plus longues routes nationales au monde, a été officiellement inaugurée en quelle année ?|世界でも指折りの長さを誇るカナダ横断ハイウェイが公式に開通したのは何年か?",
    [
      "1962|1962|1962|1962年",
      "1975|1975|1975|1975年",
      "1948|1948|1948|1948年",
    ],
    0,
    "Even after its official 1962 opening, sections in Newfoundland and British Columbia remained unpaved for years afterward.|Incluso tras su inauguración oficial en 1962, tramos en Terranova y Columbia Británica siguieron sin pavimentar durante años.|Même après son inauguration officielle en 1962, des tronçons à Terre-Neuve et en Colombie-Britannique restèrent non pavés pendant des années.|1962年の公式開通後も、ニューファンドランドとブリティッシュコロンビアの一部区間は長年舗装されないままだった。",
  ),
  q(
    5,
    "Nicaragua's currency is called the córdoba, named after which historical figure?|La moneda de Nicaragua, el córdoba, debe su nombre a qué figura histórica?|La monnaie du Nicaragua, le córdoba, doit son nom à quelle figure historique ?|ニカラグアの通貨コルドバは、どの歴史上の人物にちなんで名付けられたか?",
    [
      "A Nicaraguan poet|Un poeta nicaragüense|Un poète nicaraguayen|ニカラグアの詩人",
      "The Spanish conquistador who founded several of the country's colonial cities|El conquistador español que fundó varias de las ciudades coloniales del país|Le conquistador espagnol qui fonda plusieurs des villes coloniales du pays|同国の植民地時代の複数の都市を建設したスペインの征服者",
      "A 19th-century president|Un presidente del siglo XIX|Un président du XIXe siècle|19世紀の大統領",
    ],
    1,
    "Francisco Hernández de Córdoba founded León and Granada in the 1520s, and both the currency and the city of Granada's central plaza still carry his name.|Francisco Hernández de Córdoba fundó León y Granada en la década de 1520, y tanto la moneda como la plaza central de Granada aún llevan su nombre.|Francisco Hernández de Córdoba fonda León et Grenade dans les années 1520, et tant la monnaie que la place centrale de Grenade portent encore son nom.|フランシスコ・エルナンデス・デ・コルドバは1520年代にレオンとグラナダを築いた人物で、通貨だけでなくグラナダの中央広場も今なお彼の名を冠している。",
  ),
  q(
    6,
    "A 1494 treaty between Spain and Portugal drew a north-south line dividing newly claimed territory in the Americas — what is this treaty called?|Un tratado de 1494 entre España y Portugal trazó una línea de norte a sur que dividía el territorio recién reclamado en América; ¿cómo se llama este tratado?|Un traité de 1494 entre l'Espagne et le Portugal traça une ligne nord-sud divisant le territoire nouvellement revendiqué dans les Amériques — comment appelle-t-on ce traité ?|1494年、スペインとポルトガルの間で結ばれ、南北アメリカの新たに主張された領土を南北の線で分けた条約は何と呼ばれるか?",
    [
      "The Treaty of Paris|El Tratado de París|Le traité de Paris|パリ条約",
      "The Treaty of Utrecht|El Tratado de Utrecht|Le traité d'Utrecht|ユトレヒト条約",
      "The Treaty of Tordesillas|El Tratado de Tordesillas|Le traité de Tordesillas|トルデシリャス条約",
    ],
    2,
    "The line, running mostly through what is now Brazil, is a key reason Brazil speaks Portuguese while its neighbors speak Spanish, though the treaty's original terms rested on a wildly inaccurate sense of the Americas' true width.|La línea, que atraviesa en su mayor parte el actual Brasil, es una razón clave por la que Brasil habla portugués mientras sus vecinos hablan español, aunque los términos originales del tratado se basaban en una idea muy inexacta de la anchura real de América.|La ligne, traversant surtout ce qui est aujourd'hui le Brésil, explique en grande partie pourquoi le Brésil parle portugais alors que ses voisins parlent espagnol, bien que les termes originaux du traité reposaient sur une idée très inexacte de la largeur réelle des Amériques.|主にいまのブラジルを通るこの線引きは、隣国がスペイン語を話す中でブラジルだけがポルトガル語を話す大きな理由の一つになっているが、条約が結ばれた当初、南北アメリカの実際の幅についての認識はひどく不正確だった。",
  ),
  q(
    5,
    "Which North American country's name is, unusually, also literally the name most commonly used for its capital city?|¿Qué país norteamericano tiene, de forma poco común, el mismo nombre que se usa comúnmente para su capital?|Quel pays nord-américain porte, fait rare, le même nom que celui couramment utilisé pour sa capitale ?|珍しく、国名がその首都を呼ぶときにも最もよく使われる名前と重なっている北アメリカの国はどこか?",
    [
      "Panama|Panamá|Le Panama|パナマ",
      "Guatemala|Guatemala|Le Guatemala|グアテマラ",
      "Honduras|Honduras|Le Honduras|ホンジュラス",
    ],
    0,
    "Panama City takes its name directly from the country, while Guatemala City and Guatemala are distinguished by the word \"City,\" making Panama's pairing the closest overlap among North American capitals.|Ciudad de Panamá toma su nombre directamente del país, mientras que Ciudad de Guatemala y Guatemala se distinguen por la palabra «Ciudad», lo que hace del caso panameño la coincidencia más cercana entre las capitales norteamericanas.|Panama City tire son nom directement du pays, tandis que Guatemala Ciudad et le Guatemala se distinguent par le mot « Ciudad », faisant du cas panaméen le chevauchement le plus étroit parmi les capitales nord-américaines.|「パナマシティ」は国名パナマからそのまま取られた名だが、「グアテマラシティ」はグアテマラと「シティ」の語で区別されており、パナマの場合が北アメリカの首都の中でも国名との重なりが最も大きい。",
  ),
  q(
    6,
    "Which strait, separating Cuba from Mexico's Yucatán Peninsula, connects the Gulf of Mexico to the Caribbean Sea?|¿Qué estrecho, que separa Cuba de la península mexicana de Yucatán, conecta el golfo de México con el mar Caribe?|Quel détroit, séparant Cuba de la péninsule mexicaine du Yucatán, relie le golfe du Mexique à la mer des Caraïbes ?|キューバとメキシコのユカタン半島を隔て、メキシコ湾とカリブ海を結んでいる海峡はどこか?",
    [
      "The Strait of Florida|El estrecho de Florida|Le détroit de Floride|フロリダ海峡",
      "The Yucatán Channel|El canal de Yucatán|Le canal du Yucatán|ユカタン海峡",
      "The Windward Passage|El paso de los Vientos|Le passage du Vent|ウィンドワード海峡",
    ],
    1,
    "The channel is narrow enough, at just over 200 kilometers across, that it is often used as a reference point in studies of the Gulf Stream current.|El canal es lo bastante estrecho, con poco más de 200 kilómetros de ancho, como para usarse a menudo como referencia en estudios de la corriente del Golfo.|Le canal est assez étroit, un peu plus de 200 kilomètres de large, pour servir souvent de point de référence dans les études sur le courant du Gulf Stream.|わずか200kmあまりの幅しかないこの海峡は、メキシコ湾流の研究でしばしば基準点として使われる。",
  ),
  q(
    7,
    "Panama and Belize were both absent from the short-lived Federal Republic of Central America formed in 1823 — Panama, at the time, was part of which South American country?|Panamá y Belice estuvieron ausentes de la efímera República Federal de Centroamérica formada en 1823; Panamá, en aquel entonces, formaba parte de qué país sudamericano?|Le Panama et le Belize étaient tous deux absents de l'éphémère République fédérale d'Amérique centrale formée en 1823 ; le Panama, à l'époque, faisait partie de quel pays sud-américain ?|1823年に成立した短命の中米連邦共和国に、パナマとベリーズはともに参加していない。当時パナマは南アメリカのどの国の一部だったか?",
    [
      "Peru|Perú|Le Pérou|ペルー",
      "Venezuela|Venezuela|Le Venezuela|ベネズエラ",
      "Gran Colombia|La Gran Colombia|La Grande Colombie|グラン・コロンビア",
    ],
    2,
    "Panama did not become fully independent until 1903, when it separated from Colombia with US backing during negotiations over what became the Panama Canal.|Panamá no se independizó plenamente hasta 1903, cuando se separó de Colombia con el respaldo de Estados Unidos durante las negociaciones sobre lo que sería el Canal de Panamá.|Le Panama ne devint pleinement indépendant qu'en 1903, lorsqu'il se sépara de la Colombie avec le soutien des États-Unis, en pleine négociation autour de ce qui allait devenir le canal de Panama.|パナマが完全に独立したのは1903年になってからで、後にパナマ運河となるものをめぐる交渉のさなか、アメリカの後押しを受けてコロンビアから分離した。",
  ),
  q(
    7,
    "Due to an 18th-century surveying error, which part of Minnesota lies north of the 49th parallel and can be reached by land only by driving through Canada?|Debido a un error de agrimensura del siglo XVIII, ¿qué parte de Minnesota queda al norte del paralelo 49 y solo se alcanza por tierra atravesando Canadá?|En raison d'une erreur d'arpentage du XVIIIe siècle, quelle partie du Minnesota se trouve au nord du 49e parallèle et n'est accessible par la route qu'en traversant le Canada ?|18世紀の測量の誤りにより、北緯49度線より北に位置し、陸路ではカナダを通らなければ行けないミネソタ州の一角はどこか?",
    [
      "The Northwest Angle|El Ángulo Noroeste|Le Northwest Angle|ノースウェスト・アングル",
      "The Aroostook Strip|La Franja de Aroostook|La bande d'Aroostook|アルーストゥーク・ストリップ",
      "The Chilkoot Corridor|El Corredor de Chilkoot|Le corridor de Chilkoot|チルクート回廊",
    ],
    0,
    "The mistake traces to a 1783 treaty map based on inaccurate geography of the Lake of the Woods area; roughly 150 people live in the isolated pocket today.|El error se remonta a un mapa de un tratado de 1783 basado en una geografía inexacta de la zona del Lago de los Bosques; hoy viven allí unas 150 personas en ese enclave aislado.|L'erreur remonte à une carte de traité de 1783 fondée sur une géographie inexacte de la région du lac des Bois ; environ 150 personnes vivent aujourd'hui dans cette poche isolée.|この誤りは1783年の条約地図がウッズ湖周辺の地理を不正確に描いたことに端を発する。この孤立した一角には現在およそ150人が暮らす。",
  ),
  q(
    7,
    "In the twin towns of Derby Line, Vermont, and Stanstead, Quebec, a shared library and opera house building straddles the international border — where is the line marked inside?|En las localidades gemelas de Derby Line (Vermont) y Stanstead (Quebec), un edificio compartido de biblioteca y teatro de ópera está a caballo sobre la frontera internacional; ¿dónde está marcada la línea en su interior?|Dans les villes jumelles de Derby Line, au Vermont, et Stanstead, au Québec, un bâtiment partagé abritant bibliothèque et opéra chevauche la frontière internationale ; où la ligne est-elle marquée à l'intérieur ?|バーモント州ダービーラインとケベック州スタンステッドという双子の町では、図書館とオペラハウスを兼ねた一つの建物が国際国境をまたいでいる。建物の中でその境界線はどこに引かれているか?",
    [
      "Across the ceiling|A través del techo|Au plafond|天井を横切って",
      "Across the floor|A través del suelo|Au sol|床を横切って",
      "There is no marking at all|No hay marca alguna|Il n'y a aucun marquage|何の印もない",
    ],
    1,
    "A black tape line runs diagonally across the reading room floor, letting patrons sit in the US to check out a book shelved in Canada, a quirk that became far more complicated after post-9/11 border security tightened.|Una cinta negra cruza en diagonal el suelo de la sala de lectura, lo que permite a los usuarios sentarse en EE. UU. para sacar un libro guardado en Canadá, una rareza que se complicó mucho tras el endurecimiento fronterizo posterior al 11-S.|Un ruban noir traverse en diagonale le sol de la salle de lecture, permettant aux usagers assis aux États-Unis d'emprunter un livre rangé côté canadien, une curiosité bien plus compliquée depuis le renforcement de la sécurité frontalière après le 11-Septembre.|閲覧室の床には黒いテープの線が斜めに引かれており、利用者はアメリカ側に座ったままカナダ側の棚にある本を借りられる。この奇妙な仕組みは、9・11後の国境警備強化でずっと厄介なものになった。",
  ),
  q(
    7,
    "The bloodless 1838–39 \"Aroostook War,\" a dispute over the Maine–New Brunswick border, was ultimately settled by which 1842 treaty?|La incruenta «guerra de Aroostook» de 1838–39, un litigio por la frontera entre Maine y Nuevo Brunswick, se resolvió finalmente con qué tratado de 1842?|La « guerre d'Aroostook » de 1838-1839, un différend sans effusion de sang sur la frontière entre le Maine et le Nouveau-Brunswick, fut finalement réglée par quel traité de 1842 ?|1838〜39年の流血のない「アルーストゥーク戦争」――メーン州とニューブランズウィックの国境をめぐる争い――は、1842年のどの条約で決着したか?",
    [
      "The Jay Treaty|El Tratado de Jay|Le traité Jay|ジェイ条約",
      "The Treaty of Ghent|El Tratado de Gante|Le traité de Gand|ガン条約",
      "The Webster-Ashburton Treaty|El Tratado Webster-Ashburton|Le traité Webster-Ashburton|ウェブスター・アシュバートン条約",
    ],
    2,
    "Despite the name, the standoff produced no battle deaths on either side, though both Maine and New Brunswick called up militia and the affair strained US-British relations for months.|A pesar del nombre, el enfrentamiento no dejó muertos en combate en ningún bando, aunque tanto Maine como Nuevo Brunswick movilizaron milicias y el asunto tensó las relaciones angloestadounidenses durante meses.|Malgré son nom, l'affrontement ne fit aucun mort au combat d'aucun côté, bien que le Maine et le Nouveau-Brunswick aient tous deux mobilisé leurs milices et que l'affaire ait tendu les relations anglo-américaines pendant des mois.|「戦争」と呼ばれるものの、双方に戦死者は一人も出ていない。それでもメーン州とニューブランズウィックはともに民兵を招集し、この一件は米英関係を数か月にわたり緊張させた。",
  ),
  q(
    6,
    "Which 1846 treaty set the western section of the US-Canada border at the 49th parallel?|¿Qué tratado de 1846 fijó el tramo occidental de la frontera entre EE. UU. y Canadá en el paralelo 49?|Quel traité de 1846 fixa la section occidentale de la frontière américano-canadienne au 49e parallèle ?|1846年、米加国境の西側部分を北緯49度線に定めた条約はどれか?",
    [
      "The Oregon Treaty|El Tratado de Oregón|Le traité de l'Oregon|オレゴン条約",
      "The Treaty of Paris|El Tratado de París|Le traité de Paris|パリ条約",
      "The Convention of 1818|La Convención de 1818|La convention de 1818|1818年条約",
    ],
    0,
    "The settlement ended a long dispute known by the slogan \"Fifty-Four Forty or Fight,\" after the more northerly line some Americans had demanded.|El acuerdo puso fin a un largo litigio conocido por el lema «Cincuenta y cuatro cuarenta o pelea», por la línea más septentrional que exigían algunos estadounidenses.|L'accord mit fin à un long différend connu sous le slogan « Cinquante-quatre quarante ou la guerre », du nom de la ligne plus septentrionale que réclamaient certains Américains.|この合意により、一部のアメリカ人が求めていたより北寄りの境界線にちなむ「北緯54度40分でなければ戦争だ」というスローガンで知られた長い対立に終止符が打たれた。",
  ),
  q(
    7,
    "Although the US-Canada border runs along the 49th parallel for most of its western length, why does it dip south around Vancouver Island?|Aunque la frontera entre EE. UU. y Canadá sigue el paralelo 49 en la mayor parte de su tramo occidental, ¿por qué se desvía al sur alrededor de la isla de Vancouver?|Bien que la frontière américano-canadienne suive le 49e parallèle sur la majeure partie de sa section occidentale, pourquoi s'incurve-t-elle vers le sud autour de l'île de Vancouver ?|米加国境は西側の大半で北緯49度線をたどるのに、なぜバンクーバー島の周りだけ南へ迂回しているのか?",
    [
      "To give the US a Pacific naval base|Para dar a EE. UU. una base naval en el Pacífico|Pour offrir aux États-Unis une base navale sur le Pacifique|アメリカに太平洋の海軍基地を与えるため",
      "To keep the entire island under British/Canadian control|Para mantener toda la isla bajo control británico/canadiense|Pour maintenir l'île entière sous contrôle britannique/canadien|島全体をイギリス・カナダの支配下に置くため",
      "To follow a river's course|Para seguir el curso de un río|Pour suivre le cours d'une rivière|川の流路に沿わせるため",
    ],
    1,
    "Straightening the line at the 49th parallel would have split the island roughly in half, so the 1846 Oregon Treaty routed the border through the strait south of it instead.|Trazar la línea recta por el paralelo 49 habría partido la isla casi por la mitad, así que el Tratado de Oregón de 1846 hizo pasar la frontera por el estrecho situado al sur.|Faire passer la ligne droite par le 49e parallèle aurait coupé l'île à peu près en deux, si bien que le traité de l'Oregon de 1846 fit passer la frontière par le détroit situé plus au sud.|北緯49度線をそのまま直進させると島がほぼ半分に割れてしまうため、1846年のオレゴン条約は国境をその南側の海峡に通した。",
  ),
  q(
    8,
    "The jaguar, an animal usually associated with South America, has confirmed sightings as far north as which US state?|El jaguar, animal que suele asociarse con Sudamérica, tiene avistamientos confirmados hasta qué estado de EE. UU. por el norte?|Le jaguar, animal généralement associé à l'Amérique du Sud, a des observations confirmées aussi loin au nord que dans quel État américain ?|通常は南アメリカと結びつけられるジャガーが、北はアメリカのどの州まで確認されているか?",
    [
      "Texas|Texas|Le Texas|テキサス州",
      "New Mexico|Nuevo México|Le Nouveau-Mexique|ニューメキシコ州",
      "Arizona|Arizona|L'Arizona|アリゾナ州",
    ],
    2,
    "Camera-trap photographs have documented individual jaguars in the mountains of southern Arizona periodically since the 1990s, at the very edge of a range that once reached much further north.|Fotografías de cámaras trampa han documentado jaguares individuales en las montañas del sur de Arizona periódicamente desde los años 1990, en el mismo borde de un territorio que antes se extendía mucho más al norte.|Des photographies prises par pièges photographiques ont documenté des jaguars isolés dans les montagnes du sud de l'Arizona de façon périodique depuis les années 1990, à l'extrême limite d'une aire de répartition qui s'étendait jadis bien plus au nord.|自動撮影カメラにより、1990年代以降アリゾナ州南部の山地で個体のジャガーが断続的に記録されている。かつてはもっと北まで広がっていた生息域の、まさに縁にあたる場所である。",
  ),
  q(
    7,
    "Haitian Creole became a co-official language alongside French in which year's Haitian constitution?|El criollo haitiano se convirtió en idioma cooficial junto al francés en la constitución haitiana de qué año?|Le créole haïtien est devenu langue coofficielle aux côtés du français dans la constitution haïtienne de quelle année ?|ハイチ語がフランス語と並んで共同公用語となったのは、何年の憲法によってか?",
    [
      "1987|1987|1987|1987年",
      "1957|1957|1957|1957年",
      "2004|2004|2004|2004年",
    ],
    0,
    "Although the vast majority of Haitians speak Creole as a first language, French had remained the sole official language for most of the country's history until the change.|Aunque la inmensa mayoría de los haitianos habla criollo como primera lengua, el francés siguió siendo el único idioma oficial durante la mayor parte de la historia del país hasta ese cambio.|Bien que l'immense majorité des Haïtiens parlent le créole comme langue maternelle, le français resta la seule langue officielle pendant la majeure partie de l'histoire du pays, jusqu'à ce changement.|ハイチ人の大多数はハイチ語を母語とするが、この改正までは国史の大半を通じてフランス語だけが唯一の公用語であり続けた。",
  ),
  q(
    8,
    "Before switching to standard gauge in the 1870s, many of Canada's earliest railways, including the Grand Trunk, were built to which wider gauge?|Antes de pasar a la vía ancha estándar en la década de 1870, muchos de los primeros ferrocarriles de Canadá, incluido el Grand Trunk, se construyeron con qué trocha más ancha?|Avant de passer à l'écartement standard dans les années 1870, bon nombre des premiers chemins de fer du Canada, dont le Grand Trunk, furent construits selon quel écartement plus large ?|1870年代に標準軌へ切り替える前、グランド・トランク鉄道をはじめカナダ初期の多くの鉄道は、どの広い軌間で敷かれていたか?",
    [
      "4 feet 8.5 inches|4 pies 8,5 pulgadas|4 pieds 8,5 pouces|4フィート8.5インチ",
      "5 feet 6 inches|5 pies 6 pulgadas|5 pieds 6 pouces|5フィート6インチ",
      "6 feet|6 pies|6 pieds|6フィート",
    ],
    1,
    "The wider \"Provincial gauge\" was chosen partly to discourage easy military use of Canadian track by American forces in case of war, but it meant freight had to be transferred by hand at the US border for decades.|La más ancha «trocha provincial» se eligió en parte para dificultar el uso militar de la vía canadiense por fuerzas estadounidenses en caso de guerra, pero obligó a trasbordar la carga a mano en la frontera con EE. UU. durante décadas.|Le plus large « écartement provincial » fut choisi en partie pour dissuader une utilisation militaire aisée des voies canadiennes par les forces américaines en cas de guerre, mais il obligea pendant des décennies à transborder le fret à la main à la frontière américaine.|この幅広の「州際軌間」が選ばれた理由の一つは、戦争になった際にアメリカ軍がカナダの線路を容易に使えないようにするためだったが、そのせいで数十年にわたり米国境で貨物を手作業で積み替える必要があった。",
  ),
  q(
    7,
    "Which Central American country is the only one without a coastline on the Caribbean Sea?|¿Qué país centroamericano es el único que no tiene costa en el mar Caribe?|Quel pays d'Amérique centrale est le seul à ne pas avoir de côte sur la mer des Caraïbes ?|中米で唯一、カリブ海に面していない国はどこか?",
    [
      "Guatemala|Guatemala|Le Guatemala|グアテマラ",
      "Panama|Panamá|Le Panama|パナマ",
      "El Salvador|El Salvador|Le Salvador|エルサルバドル",
    ],
    2,
    "El Salvador's entire coast faces the Pacific Ocean, making it the sole Central American nation whose territory does not touch the Caribbean at any point.|Toda la costa de El Salvador da al océano Pacífico, lo que lo convierte en la única nación centroamericana cuyo territorio no toca el Caribe en ningún punto.|Toute la côte du Salvador donne sur l'océan Pacifique, ce qui en fait la seule nation d'Amérique centrale dont le territoire ne touche nulle part la mer des Caraïbes.|エルサルバドルの海岸はすべて太平洋に面しており、領土がどこにおいてもカリブ海に接していない中米唯一の国となっている。",
  ),
  q(
    8,
    "Pancho Villa's 1916 cross-border raid, which prompted a US military expedition into Mexico, struck which New Mexico town?|El ataque transfronterizo de Pancho Villa en 1916, que provocó una expedición militar estadounidense a México, golpeó a qué pueblo de Nuevo México?|Le raid transfrontalier de Pancho Villa en 1916, qui provoqua une expédition militaire américaine au Mexique, frappa quelle ville du Nouveau-Mexique ?|1916年、アメリカによるメキシコへの軍事遠征を招いたパンチョ・ビリャの越境襲撃が襲ったニューメキシコ州の町はどこか?",
    [
      "Columbus|Columbus|Columbus|コロンバス",
      "Deming|Deming|Deming|デミング",
      "Truth or Consequences|Truth or Consequences|Truth or Consequences|トゥルース・オア・コンシクエンシズ",
    ],
    0,
    "The raid killed several American residents and soldiers, and General John J. Pershing's subsequent \"Punitive Expedition\" into Mexico failed to capture Villa despite months of pursuit.|El ataque mató a varios residentes y soldados estadounidenses, y la posterior «Expedición Punitiva» del general John J. Pershing en México no logró capturar a Villa pese a meses de persecución.|Le raid tua plusieurs résidents et soldats américains, et l'« expédition punitive » du général John J. Pershing qui s'ensuivit au Mexique ne parvint pas à capturer Villa malgré des mois de poursuite.|この襲撃で複数のアメリカ人住民と兵士が死亡し、続くジョン・パーシング将軍の「懲罰遠征」はメキシコに何か月も追跡を続けたが、ビリャを捕らえることはできなかった。",
  ),
  q(
    7,
    "Which 1965 US law abolished the national-origin quota system, significantly increasing immigration from Latin America and Asia in the decades that followed?|¿Qué ley estadounidense de 1965 abolió el sistema de cuotas por origen nacional, aumentando notablemente la inmigración desde América Latina y Asia en las décadas siguientes?|Quelle loi américaine de 1965 abolit le système de quotas par origine nationale, augmentant nettement l'immigration en provenance d'Amérique latine et d'Asie dans les décennies suivantes ?|1965年に成立し、以後数十年にわたりラテンアメリカとアジアからの移民を大きく増やすことになった、出身国別割当制度を廃止したアメリカの法律はどれか?",
    [
      "The Displaced Persons Act|La Ley de Personas Desplazadas|La loi sur les personnes déplacées|避難民法",
      "The Immigration and Nationality Act of 1965|La Ley de Inmigración y Nacionalidad de 1965|La loi de 1965 sur l'immigration et la nationalité|1965年移民国籍法",
      "The Homestead Act|La Ley de Asentamientos Rurales|La loi sur les concessions de terres|ホームステッド法",
    ],
    1,
    "Also known as the Hart-Celler Act, the law reversed a quota system dating to the 1920s that had heavily favored immigrants from Western Europe.|Conocida también como Ley Hart-Celler, revirtió un sistema de cuotas que databa de los años 1920 y favorecía en gran medida a los inmigrantes de Europa occidental.|Aussi appelée loi Hart-Celler, elle inversa un système de quotas datant des années 1920 qui favorisait largement les immigrants d'Europe occidentale.|ハート=セラー法とも呼ばれるこの法律は、1920年代から続き西ヨーロッパからの移民を大きく優遇していた割当制度を覆した。",
  ),
  q(
    8,
    "The bracero program, a mid-20th-century agreement bringing Mexican farm laborers to work legally in the United States, ran from 1942 to which year?|El programa Bracero, acuerdo de mediados del siglo XX que llevó a trabajadores agrícolas mexicanos a trabajar legalmente en EE. UU., ¿operó de 1942 a qué año?|Le programme Bracero, accord du milieu du XXe siècle amenant des ouvriers agricoles mexicains à travailler légalement aux États-Unis, fonctionna de 1942 à quelle année ?|20世紀半ば、メキシコの農業労働者が合法的にアメリカで働けるようにしたブラセロ計画は、1942年から何年まで続いたか?",
    [
      "1952|1952|1952|1952年",
      "1958|1958|1958|1958年",
      "1964|1964|1964|1964年",
    ],
    2,
    "Over its more than two decades, the program issued millions of short-term contracts, and its 1964 end is often cited as one factor behind a later rise in undocumented farm labor migration.|A lo largo de más de dos décadas, el programa emitió millones de contratos temporales, y su fin en 1964 suele citarse como uno de los factores tras el posterior aumento de la migración laboral agrícola indocumentada.|Sur plus de deux décennies, le programme délivra des millions de contrats de courte durée, et sa fin en 1964 est souvent citée comme l'un des facteurs de la hausse ultérieure de la migration agricole sans papiers.|20年以上続いたこの計画は数百万件の短期契約を発給し、1964年の終了は、その後の非正規の農業移民労働者増加の一因としてしばしば挙げられる。",
  ),
  q(
    7,
    "Which Canadian province is the only one whose sole official language, provincially, is French?|¿Qué provincia canadiense es la única cuyo único idioma oficial, a nivel provincial, es el francés?|Quelle province canadienne est la seule dont la seule langue officielle, au niveau provincial, est le français ?|州レベルで公用語がフランス語のみとされている唯一のカナダの州はどこか?",
    [
      "Quebec|Quebec|Le Québec|ケベック州",
      "New Brunswick|Nuevo Brunswick|Le Nouveau-Brunswick|ニューブランズウィック州",
      "Ontario|Ontario|L'Ontario|オンタリオ州",
    ],
    0,
    "New Brunswick, by contrast, is Canada's only officially bilingual province at the provincial level, while the federal government itself operates in both English and French nationwide.|Nuevo Brunswick, en cambio, es la única provincia oficialmente bilingüe de Canadá a nivel provincial, mientras que el propio gobierno federal opera en inglés y francés en todo el país.|Le Nouveau-Brunswick, à l'inverse, est la seule province officiellement bilingue du Canada au niveau provincial, tandis que le gouvernement fédéral lui-même fonctionne dans les deux langues à l'échelle du pays.|一方ニューブランズウィック州は、州レベルで公式に英仏バイリンガルとされる唯一の州であり、連邦政府自体は全国で英語とフランス語の両方を用いて運営されている。",
  ),
  q(
    8,
    "The Cascadia Subduction Zone, capable of producing a magnitude-9 earthquake, lies off the coast of which region?|La zona de subducción de Cascadia, capaz de producir un terremoto de magnitud 9, se encuentra frente a la costa de qué región?|La zone de subduction de Cascadia, capable de produire un séisme de magnitude 9, se trouve au large des côtes de quelle région ?|マグニチュード9クラスの地震を引き起こしうるカスケード沈み込み帯は、どの地域の沖にあるか?",
    [
      "The Gulf of Mexico|El golfo de México|Le golfe du Mexique|メキシコ湾",
      "The Pacific Northwest|El noroeste del Pacífico|Le Nord-Ouest Pacifique|太平洋岸北西部",
      "The Bay of Fundy|La bahía de Fundy|La baie de Fundy|ファンディ湾",
    ],
    1,
    "Geological evidence points to the fault's last major rupture in January 1700, an event precisely dated thanks to a tsunami it triggered that was recorded in written accounts in Japan.|La evidencia geológica señala la última gran ruptura de la falla en enero de 1700, fechada con precisión gracias a un tsunami que provocó y que quedó registrado en crónicas escritas en Japón.|Les preuves géologiques situent la dernière rupture majeure de la faille en janvier 1700, un événement daté avec précision grâce à un tsunami qu'elle déclencha et qui fut consigné dans des récits écrits au Japon.|地質学的な証拠は、この断層の最後の大規模な破壊が1700年1月に起きたことを示しており、それが引き起こした津波が日本の文献記録に残っていたことから正確な日付が判明している。",
  ),
  q(
    7,
    "The 1840s US political slogan \"Fifty-Four Forty or Fight\" referred to a boundary dispute over which region, eventually settled at the 49th parallel?|El eslogan político estadounidense de la década de 1840 «Cincuenta y cuatro cuarenta o pelea» se refería a una disputa fronteriza sobre qué región, resuelta finalmente en el paralelo 49?|Le slogan politique américain des années 1840 « Cinquante-quatre quarante ou la guerre » renvoyait à un différend frontalier sur quelle région, finalement réglé au 49e parallèle ?|1840年代のアメリカの政治スローガン「北緯54度40分でなければ戦争だ」は、最終的に北緯49度線で決着した、どの地域をめぐる国境紛争を指していたか?",
    [
      "The Alaska Panhandle|La franja de Alaska|Le Panhandle de l'Alaska|アラスカ・パンハンドル",
      "The Yucatán Peninsula|La península de Yucatán|La péninsule du Yucatán|ユカタン半島",
      "The Oregon Country|El País de Oregón|Le pays de l'Oregon|オレゴン・カントリー",
    ],
    2,
    "Some expansionists wanted the border pushed north to the latitude 54°40', which would have given the US most of present-day British Columbia; the eventual 1846 treaty settled for far less.|Algunos expansionistas querían empujar la frontera al norte hasta la latitud 54°40', lo que habría dado a EE. UU. la mayor parte de la actual Columbia Británica; el tratado final de 1846 se conformó con mucho menos.|Certains expansionnistes voulaient repousser la frontière au nord jusqu'à la latitude 54°40', ce qui aurait donné aux États-Unis l'essentiel de l'actuelle Colombie-Britannique ; le traité de 1846 se contenta finalement de bien moins.|一部の拡張主義者は国境を北緯54度40分まで押し上げることを望んでおり、それが実現していれば現在のブリティッシュコロンビア州の大半がアメリカ領になっていた。1846年に結ばれた条約は、それよりずっと控えめな線に落ち着いた。",
  ),
  q(
    7,
    "The 1853–54 Gadsden Purchase, bought from Mexico to allow a southern transcontinental railroad route, added territory to which two present-day US states?|La Compra de Gadsden de 1853–54, adquirida a México para permitir una ruta ferroviaria transcontinental sur, añadió territorio a qué dos estados actuales de EE. UU.?|L'achat Gadsden de 1853-1854, acquis au Mexique pour permettre une route ferroviaire transcontinentale méridionale, ajouta du territoire à quels deux États américains actuels ?|南回りの大陸横断鉄道を通すためメキシコから購入した1853〜54年のガズデン購入は、現在のどの二つのアメリカの州に領土を加えたか?",
    [
      "Arizona and New Mexico|Arizona y Nuevo México|L'Arizona et le Nouveau-Mexique|アリゾナ州とニューメキシコ州",
      "Texas and Oklahoma|Texas y Oklahoma|Le Texas et l'Oklahoma|テキサス州とオクラホマ州",
      "California and Nevada|California y Nevada|La Californie et le Nevada|カリフォルニア州とネバダ州",
    ],
    0,
    "The strip was bought for 10 million dollars specifically because it offered a flatter, lower-elevation route for a railway than the mountainous land to the north.|La franja se compró por 10 millones de dólares precisamente porque ofrecía una ruta ferroviaria más llana y de menor altitud que el terreno montañoso al norte.|La bande fut achetée pour 10 millions de dollars précisément parce qu'elle offrait un tracé ferroviaire plus plat et de moindre altitude que le terrain montagneux plus au nord.|この帯状の土地が1000万ドルで購入されたのは、まさに北側の山がちな土地よりも平坦で標高の低い鉄道用地を提供したからだった。",
  ),
  q(
    7,
    "Which Central American country has English, rather than Spanish, as its sole official language, a legacy of British colonial rule?|¿Qué país centroamericano tiene el inglés, y no el español, como único idioma oficial, herencia del dominio colonial británico?|Quel pays d'Amérique centrale a l'anglais, et non l'espagnol, pour seule langue officielle, héritage de la domination coloniale britannique ?|イギリス植民地支配の名残で、スペイン語ではなく英語を唯一の公用語としている中米の国はどこか?",
    [
      "Panama|Panamá|Le Panama|パナマ",
      "Belize|Belice|Le Belize|ベリーズ",
      "Honduras|Honduras|Le Honduras|ホンジュラス",
    ],
    1,
    "Despite English being the official language, Belizean Kriol and Spanish are both more widely spoken day to day than formal English.|A pesar de que el inglés es el idioma oficial, tanto el criollo beliceño como el español se hablan más en el día a día que el inglés formal.|Bien que l'anglais soit la langue officielle, le kriol bélizien et l'espagnol sont tous deux plus parlés au quotidien que l'anglais formel.|英語が公用語であるにもかかわらず、日常ではベリーズ・クリオール語とスペイン語のほうが正式な英語よりも広く話されている。",
  ),
  q(
    8,
    "The Panama Canal's lock system lifts ships to Gatun Lake, which sits roughly how many meters above sea level?|El sistema de esclusas del Canal de Panamá eleva los buques hasta el lago Gatún, situado a unos cuántos metros sobre el nivel del mar?|Le système d'écluses du canal de Panama élève les navires jusqu'au lac Gatún, situé à environ combien de mètres au-dessus du niveau de la mer ?|パナマ運河の閘門システムは船をガトゥン湖まで持ち上げるが、この湖は海抜およそ何メートルにあるか?",
    [
      "10 meters|10 metros|10 mètres|10メートル",
      "45 meters|45 metros|45 mètres|45メートル",
      "26 meters|26 metros|26 mètres|26メートル",
    ],
    2,
    "Gatun Lake, formed by damming the Chagres River, was the largest artificial lake in the world when it was created in the 1910s and still supplies the fresh water that operates the canal's locks.|El lago Gatún, formado al represar el río Chagres, fue el mayor lago artificial del mundo cuando se creó en la década de 1910 y aún hoy suministra el agua dulce que opera las esclusas del canal.|Le lac Gatún, formé en barrant le fleuve Chagres, était le plus grand lac artificiel du monde lors de sa création dans les années 1910, et il fournit encore l'eau douce qui actionne les écluses du canal.|チャグレス川をせき止めて作られたガトゥン湖は、1910年代の完成当時は世界最大の人工湖であり、いまも運河の閘門を動かす真水を供給し続けている。",
  ),
  q(
    7,
    "Which desert, spanning much of northern Mexico and parts of the southwestern United States, is North America's largest by area?|¿Qué desierto, que abarca buena parte del norte de México y partes del suroeste de EE. UU., es el más extenso de América del Norte?|Quel désert, s'étendant sur une grande partie du nord du Mexique et des parties du sud-ouest des États-Unis, est le plus vaste d'Amérique du Nord ?|メキシコ北部の大部分とアメリカ南西部の一部にまたがる、北アメリカ最大の面積を持つ砂漠はどれか?",
    [
      "The Chihuahuan Desert|El desierto de Chihuahua|Le désert de Chihuahua|チワワ砂漠",
      "The Mojave Desert|El desierto de Mojave|Le désert de Mojave|モハーヴェ砂漠",
      "The Sonoran Desert|El desierto de Sonora|Le désert de Sonora|ソノラ砂漠",
    ],
    0,
    "Despite its size, the Chihuahuan Desert sits at a relatively high elevation and receives more of its modest rainfall in summer than deserts further west.|Pese a su tamaño, el desierto de Chihuahua se sitúa a una altitud relativamente alta y recibe más de su modesta lluvia en verano que los desiertos más al oeste.|Malgré sa taille, le désert de Chihuahua se situe à une altitude relativement élevée et reçoit une plus grande part de ses modestes précipitations en été que les déserts plus à l'ouest.|チワワ砂漠はその広さにもかかわらず標高が比較的高く、わずかな降水の多くが、より西にある砂漠地帯より夏に集中する。",
  ),
  q(
    7,
    "Which Canadian province was a separate British Dominion, not part of Canada, until it joined the confederation in 1949?|¿Qué provincia canadiense fue un Dominio británico independiente, no parte de Canadá, hasta unirse a la confederación en 1949?|Quelle province canadienne fut un Dominion britannique distinct, non rattaché au Canada, jusqu'à son adhésion à la confédération en 1949 ?|1949年に連邦へ加わるまで、カナダとは別のイギリス自治領だったカナダの州はどこか?",
    [
      "Prince Edward Island|Isla del Príncipe Eduardo|L'Île-du-Prince-Édouard|プリンスエドワードアイランド州",
      "Newfoundland|Terranova|Terre-Neuve|ニューファンドランド州",
      "Nova Scotia|Nueva Escocia|La Nouvelle-Écosse|ノバスコシア州",
    ],
    1,
    "A close 1948 referendum decided the question, with confederation with Canada narrowly defeating the option of returning to full self-government as an independent dominion.|Un reñido referéndum de 1948 decidió la cuestión, con la confederación con Canadá ganando por poco a la opción de volver al autogobierno pleno como dominio independiente.|Un référendum serré en 1948 trancha la question, la confédération avec le Canada l'emportant de justesse sur l'option d'un retour à l'autonomie complète en tant que dominion indépendant.|1948年の僅差の住民投票でこの問題が決着し、カナダとの連邦入りが、独立自治領としての完全自治復帰という選択肢をわずかに上回った。",
  ),
  q(
    8,
    "The Confederation Bridge, linking Prince Edward Island to the New Brunswick mainland, opened to traffic in which year?|El puente de la Confederación, que une la Isla del Príncipe Eduardo con el continente en Nuevo Brunswick, se abrió al tráfico en qué año?|Le pont de la Confédération, reliant l'Île-du-Prince-Édouard au continent au Nouveau-Brunswick, a ouvert à la circulation en quelle année ?|プリンスエドワードアイランド州とニューブランズウィック州本土を結ぶコンフェデレーション橋が開通したのは何年か?",
    [
      "1985|1985|1985|1985年",
      "2005|2005|2005|2005年",
      "1997|1997|1997|1997年",
    ],
    2,
    "At roughly 12.9 kilometers, it is often cited as the longest bridge in the world over ice-covered water, engineered to withstand seasonal pack ice in the Northumberland Strait.|Con unos 12,9 kilómetros, suele citarse como el puente más largo del mundo sobre aguas cubiertas de hielo, diseñado para resistir el hielo estacional del estrecho de Northumberland.|Avec environ 12,9 kilomètres, il est souvent cité comme le plus long pont du monde sur des eaux couvertes de glace, conçu pour résister à la banquise saisonnière du détroit de Northumberland.|全長およそ12.9kmのこの橋は、しばしば「氷に覆われた海の上では世界最長の橋」と言われ、ノーサンバーランド海峡の季節的な氷に耐えるよう設計されている。",
  ),
  q(
    7,
    "Which North American country's national anthem is customarily performed in a version that blends both English and French verses at official events?|El himno nacional de qué país norteamericano se interpreta habitualmente en una versión que mezcla estrofas en inglés y en francés en actos oficiales?|L'hymne national de quel pays nord-américain est-il habituellement interprété dans une version mêlant couplets anglais et français lors d'événements officiels ?|公式行事で英語とフランス語の歌詞を組み合わせた形で歌われるのが慣例になっている国歌は、北アメリカのどの国のものか?",
    [
      "Canada|Canadá|Le Canada|カナダ",
      "Haiti|Haití|Haïti|ハイチ",
      "The United States|Estados Unidos|Les États-Unis|アメリカ",
    ],
    0,
    "\"O Canada\" was originally written entirely in French in 1880; an English version followed decades later, and today ceremonial performances often alternate between the two.|«O Canada» se escribió originalmente por completo en francés en 1880; una versión en inglés llegó décadas después, y hoy las interpretaciones ceremoniales suelen alternar entre ambas.|« Ô Canada » fut à l'origine écrit entièrement en français en 1880 ; une version anglaise suivit des décennies plus tard, et les interprétations cérémonielles alternent aujourd'hui souvent entre les deux.|「オー・カナダ」は1880年、当初は全編フランス語で書かれた。英語版が続いたのは数十年後のことで、今日の式典での演奏は両方の言語を交互に用いることが多い。",
  ),
  q(
    7,
    "A 1944 treaty divides the shared waters of the Colorado and Rio Grande rivers between which two countries?|Un tratado de 1944 reparte las aguas compartidas de los ríos Colorado y Bravo entre qué dos países?|Un traité de 1944 répartit les eaux partagées des fleuves Colorado et Rio Grande entre quels deux pays ?|1944年の条約は、コロラド川とリオグランデ川の共有水域をどの二国のあいだで分けているか?",
    [
      "Canada and the United States|Canadá y Estados Unidos|Le Canada et les États-Unis|カナダとアメリカ",
      "The United States and Mexico|Estados Unidos y México|Les États-Unis et le Mexique|アメリカとメキシコ",
      "Mexico and Guatemala|México y Guatemala|Le Mexique et le Guatemala|メキシコとグアテマラ",
    ],
    1,
    "The treaty guarantees Mexico a fixed annual share of Colorado River water and the US a share of certain Rio Grande tributaries originating in Mexico, an arrangement strained in dry years.|El tratado garantiza a México una cuota anual fija de agua del río Colorado, y a EE. UU. una parte de ciertos afluentes del Bravo que nacen en México, un arreglo que se tensa en los años secos.|Le traité garantit au Mexique une part annuelle fixe de l'eau du fleuve Colorado, et aux États-Unis une part de certains affluents du Rio Grande prenant leur source au Mexique, un arrangement mis à rude épreuve les années sèches.|この条約はメキシコにコロラド川の水の年間一定量を、アメリカにはメキシコを水源とするリオグランデ川の一部支流の水を保証しているが、渇水の年にはこの取り決めがきしむことがある。",
  ),
  q(
    8,
    "Which country's 1989 military intervention in Panama, \"Operation Just Cause,\" removed the country's leader, Manuel Noriega, from power?|La intervención militar de 1989 en Panamá, «Operación Causa Justa», que derrocó al líder del país, Manuel Noriega, ¿fue de qué país?|L'intervention militaire de 1989 au Panama, « Opération Juste Cause », qui destitua le dirigeant du pays, Manuel Noriega, fut menée par quel pays ?|1989年、パナマの指導者マヌエル・ノリエガを権力の座から追った軍事介入「正義の大義作戦」を行ったのはどの国か?",
    [
      "Colombia|Colombia|La Colombie|コロンビア",
      "The United Kingdom|El Reino Unido|Le Royaume-Uni|イギリス",
      "The United States|Estados Unidos|Les États-Unis|アメリカ",
    ],
    2,
    "Noriega, once a paid US intelligence asset, surrendered after taking refuge in the Vatican's diplomatic mission in Panama City and was later convicted on drug-trafficking charges in a US court.|Noriega, en su día informante pagado de la inteligencia estadounidense, se rindió tras refugiarse en la misión diplomática del Vaticano en Ciudad de Panamá, y fue condenado después por narcotráfico en un tribunal de EE. UU.|Noriega, autrefois informateur rémunéré des services de renseignement américains, se rendit après s'être réfugié à la mission diplomatique du Vatican à Panama City, et fut plus tard condamné pour trafic de drogue par un tribunal américain.|かつてアメリカの情報機関から報酬を得ていたノリエガは、パナマシティのバチカン外交使節団に逃げ込んだのち投降し、のちにアメリカの法廷で麻薬密輸の罪により有罪判決を受けた。",
  ),
  q(
    9,
    "The original ceremonial golden spike from the 1869 Promontory Summit ceremony is preserved today at which institution?|El clavo de oro ceremonial original de la ceremonia de Promontory Summit de 1869 se conserva hoy en qué institución?|Le crampon doré cérémoniel original de la cérémonie de Promontory Summit de 1869 est aujourd'hui conservé dans quelle institution ?|1869年のプロモントリー・サミット式典で使われた本物の金の犬釘は、いまどの施設に保存されているか?",
    [
      "Stanford University's museum|El museo de la Universidad de Stanford|Le musée de l'université Stanford|スタンフォード大学の博物館",
      "The Smithsonian Institution|La Institución Smithsonian|La Smithsonian Institution|スミソニアン協会",
      "The Canadian Museum of History|El Museo Canadiense de Historia|Le Musée canadien de l'histoire|カナダ歴史博物館",
    ],
    0,
    "The gold spike was pulled out again almost immediately after the ceremonial photographs were taken and replaced with an ordinary iron one for actual railroad use; the donor family had ties to Leland Stanford, the university's founder.|El clavo de oro se retiró de nuevo casi inmediatamente después de las fotos ceremoniales y se sustituyó por uno de hierro corriente para el uso ferroviario real; la familia donante tenía vínculos con Leland Stanford, fundador de la universidad.|Le crampon doré fut retiré presque aussitôt après les photographies cérémonielles et remplacé par un crampon en fer ordinaire pour l'usage ferroviaire réel ; la famille donatrice avait des liens avec Leland Stanford, fondateur de l'université.|金の犬釘は式典の記念写真が撮られるとほぼ即座に抜き取られ、実際の鉄道用にはただの鉄釘に差し替えられた。寄贈した一族は大学創設者リーランド・スタンフォードと縁があった。",
  ),
  q(
    9,
    "The Panama Railroad, when it opened in 1855, charged a one-way fare often cited as the highest per-mile passenger fare in railroad history — roughly how much, in gold dollars?|El Ferrocarril de Panamá, al inaugurarse en 1855, cobraba un pasaje de ida a menudo citado como la tarifa por milla más alta de la historia ferroviaria: ¿unos cuántos dólares en oro?|Le chemin de fer de Panama, à son ouverture en 1855, facturait un aller simple souvent cité comme le tarif au mile le plus élevé de l'histoire ferroviaire — environ combien, en dollars-or ?|1855年に開通したパナマ鉄道は、鉄道史上もっとも高いマイル当たり運賃だったとしばしば言われる片道運賃を課していたが、金貨でおよそいくらだったか?",
    [
      "5 dollars|5 dólares|5 dollars|5ドル",
      "25 dollars|25 dólares|25 dollars|25ドル",
      "100 dollars|100 dólares|100 dollars|100ドル",
    ],
    1,
    "Desperate gold-rush travelers paid it anyway rather than face weeks crossing the isthmus on foot and by canoe, or months sailing around Cape Horn.|Los desesperados viajeros de la fiebre del oro lo pagaban igual antes que enfrentar semanas cruzando el istmo a pie y en canoa, o meses navegando alrededor del cabo de Hornos.|Les voyageurs de la ruée vers l'or, désespérés, le payaient tout de même plutôt que d'affronter des semaines à traverser l'isthme à pied et en canoë, ou des mois à naviguer autour du cap Horn.|ゴールドラッシュに向かう必死の旅人たちは、地峡を徒歩とカヌーで何週間もかけて渡るか、ホーン岬を何か月もかけて回る航海をするよりはと、それでもこの運賃を払った。",
  ),
  q(
    10,
    "In what became known as the \"Great Gauge Change\" of 1886, roughly how many kilometers of Southern US railroad track were converted from a wider gauge to standard gauge in about 36 hours?|En lo que se conoció como el «Gran Cambio de Trocha» de 1886, ¿cuántos kilómetros de vía férrea del sur de EE. UU. se convirtieron de una trocha más ancha a la estándar en unas 36 horas?|Dans ce qu'on appela le « grand changement d'écartement » de 1886, combien de kilomètres de voies ferrées du sud des États-Unis furent convertis d'un écartement plus large à l'écartement standard en environ 36 heures ?|1886年、「大改軌」と呼ばれる出来事で、アメリカ南部の鉄道はおよそ36時間のうちに広軌から標準軌へ何km分改められたか?",
    [
      "1,300 km|1300 km|1 300 km|1300km",
      "4,000 km|4000 km|4 000 km|4000km",
      "13,000 km|13 000 km|13 000 km|13000km",
    ],
    2,
    "Tens of thousands of workers moved one rail of each track inward by exactly three inches in a single coordinated weekend, instantly linking the South's rail network to the rest of the continent.|Decenas de miles de trabajadores movieron un riel de cada vía exactamente 7,6 centímetros hacia dentro en un único fin de semana coordinado, uniendo al instante la red ferroviaria del Sur con el resto del continente.|Des dizaines de milliers d'ouvriers déplacèrent un rail de chaque voie de tout juste sept centimètres vers l'intérieur, en un seul week-end coordonné, reliant instantanément le réseau ferroviaire du Sud au reste du continent.|数万人の作業員が、綿密に調整された週末のわずかな間に、各線路の片方のレールをちょうど3インチだけ内側へ動かし、南部の鉄道網を大陸の他の路線へ一挙につないだ。",
  ),
  q(
    9,
    "Historians generally describe the death toll of building the Panama Canal, across its French and American construction eras combined, as at least roughly how many workers?|Los historiadores suelen describir el número de muertos en la construcción del Canal de Panamá, sumando las etapas francesa y estadounidense, como al menos unos cuántos trabajadores?|Les historiens décrivent généralement le nombre de morts de la construction du canal de Panama, sur ses périodes de chantier française et américaine combinées, comme étant d'au moins environ combien d'ouvriers ?|パナマ運河建設の死者数は、フランス期とアメリカ期を合わせて、歴史家たちにより少なくともおよそ何人と語られることが多いか?",
    [
      "25,000|25 000|25 000|25000人",
      "2,500|2500|2 500|2500人",
      "250,000|250 000|250 000|250000人",
    ],
    0,
    "The true number was never precisely counted, particularly among Caribbean laborers during the disease-ridden French era of the 1880s, so historians generally describe the toll only as a rough, and probably conservative, estimate.|El número real nunca se contó con precisión, sobre todo entre los trabajadores caribeños durante la etapa francesa de los años 1880, plagada de enfermedades, así que los historiadores lo describen solo como una estimación aproximada y probablemente conservadora.|Le nombre réel ne fut jamais compté avec précision, en particulier parmi les ouvriers caribéens durant la période française des années 1880, ravagée par la maladie, si bien que les historiens ne le décrivent que comme une estimation approximative, sans doute prudente.|正確な数はついに数えられておらず、とりわけ疫病の蔓延した1880年代のフランス期のカリブ海出身労働者についてはなおさらである。そのため歴史家たちは、この数字をあくまで控えめな概算としてしか語らない。",
  ),
  q(
    10,
    "Whose campaign against mosquito-borne disease made the American-era completion of the Panama Canal possible after French efforts had failed?|La campaña de quién contra las enfermedades transmitidas por mosquitos hizo posible que la etapa estadounidense completara el Canal de Panamá tras el fracaso de los esfuerzos franceses?|La campagne de qui contre les maladies transmises par les moustiques rendit possible l'achèvement du canal de Panama par les Américains, après l'échec des efforts français ?|フランスの試みが失敗したあと、アメリカ期のパナマ運河完成を可能にした、蚊が媒介する病気との闘いを率いたのは誰か?",
    [
      "Walter Reed|Walter Reed|Walter Reed|ウォルター・リード",
      "William Gorgas|William Gorgas|William Gorgas|ウィリアム・ゴーガス",
      "Louis Pasteur|Louis Pasteur|Louis Pasteur|ルイ・パスツール",
    ],
    1,
    "Gorgas, a US Army physician, applied lessons from earlier yellow fever control efforts in Havana to drain standing water and fumigate buildings across the Canal Zone, dramatically cutting disease deaths among workers.|Gorgas, médico del ejército de EE. UU., aplicó lecciones de anteriores esfuerzos contra la fiebre amarilla en La Habana para drenar aguas estancadas y fumigar edificios en toda la Zona del Canal, reduciendo drásticamente las muertes por enfermedad entre los trabajadores.|Gorgas, médecin de l'armée américaine, appliqua les leçons tirées d'efforts antérieurs de lutte contre la fièvre jaune à La Havane pour assécher les eaux stagnantes et fumiger les bâtiments dans toute la zone du canal, réduisant radicalement les décès dus à la maladie chez les ouvriers.|アメリカ陸軍の医師ゴーガスは、以前ハバナで行われた黄熱病対策の教訓を運河地帯全域に適用し、たまり水を排水し建物を燻蒸することで、労働者の疫病による死者数を劇的に減らした。",
  ),
  q(
    9,
    "The Alaska Highway, built during World War II to link the contiguous United States to Alaska through Canada, was completed start to finish in roughly how many months?|La carretera de Alaska, construida durante la Segunda Guerra Mundial para unir el resto de EE. UU. con Alaska a través de Canadá, ¿se completó de principio a fin en unos cuántos meses?|La route de l'Alaska, construite pendant la Seconde Guerre mondiale pour relier les États-Unis continentaux à l'Alaska via le Canada, fut achevée de bout en bout en environ combien de mois ?|第二次世界大戦中、カナダを経由してアメリカ本土とアラスカを結ぶために建設されたアラスカ・ハイウェイは、着工から完成までおよそ何か月で仕上がったか?",
    [
      "3 months|3 meses|3 mois|3か月",
      "20 months|20 meses|20 mois|20か月",
      "8 months|8 meses|8 mois|8か月",
    ],
    2,
    "The original 1942 route was a rough, often muddy pioneer road; a years-long project to properly pave and straighten it followed only after the war.|La ruta original de 1942 era un camino pionero, tosco y a menudo embarrado; el proyecto, de años, para pavimentarla y enderezarla como es debido llegó solo tras la guerra.|La route d'origine de 1942 était une piste pionnière rudimentaire, souvent boueuse ; le chantier de plusieurs années visant à la paver et la redresser correctement ne suivit qu'après la guerre.|1942年当初の道は荒く、しばしばぬかるむ開拓道路にすぎなかった。きちんと舗装し線形を直す何年もかかる工事が行われたのは、戦後になってからである。",
  ),
  q(
    9,
    "What is the standard railway gauge, in millimeters, used on nearly all mainline track across the United States, Canada, and Mexico?|¿Cuál es la trocha ferroviaria estándar, en milímetros, usada en casi toda la vía principal de EE. UU., Canadá y México?|Quel est l'écartement ferroviaire standard, en millimètres, utilisé sur presque toutes les voies principales des États-Unis, du Canada et du Mexique ?|アメリカ・カナダ・メキシコの幹線のほぼすべてで使われている標準軌の幅は、ミリメートルで言うといくらか?",
    [
      "1,435 mm|1435 mm|1 435 mm|1435mm",
      "1,000 mm|1000 mm|1 000 mm|1000mm",
      "1,676 mm|1676 mm|1 676 mm|1676mm",
    ],
    0,
    "Often called \"standard gauge,\" this width traces back to early British colliery railways and became dominant across North America only after decades of competing gauges were phased out in the 19th century.|A menudo llamada «trocha estándar», esta anchura se remonta a los primeros ferrocarriles mineros británicos y solo se impuso en América del Norte tras décadas de retirar trochas competidoras en el siglo XIX.|Souvent appelé « écartement standard », cet écartement remonte aux premiers chemins de fer miniers britanniques et ne s'imposa en Amérique du Nord qu'après des décennies d'élimination progressive d'écartements concurrents au XIXe siècle.|「標準軌」と呼ばれるこの幅は、イギリスの初期の炭鉱鉄道にまでさかのぼり、19世紀を通じて競合する複数の軌間が何十年もかけて淘汰されたのちに、ようやく北アメリカ全域で主流となった。",
  ),
  q(
    9,
    "At their narrowest point, the two Diomede Islands in the Bering Strait — one Russian, one American — sit roughly how many kilometers apart?|En su punto más estrecho, las dos islas Diómedes del estrecho de Bering —una rusa, una estadounidense— están separadas por unos cuántos kilómetros?|À leur point le plus étroit, les deux îles Diomède du détroit de Béring — l'une russe, l'autre américaine — sont distantes d'environ combien de kilomètres ?|ベーリング海峡に浮かぶ、ロシア領と米国領の二つのダイオミード島は、最も狭い地点でおよそ何km離れているか?",
    [
      "40 kilometers|40 kilómetros|40 kilomètres|40km",
      "4 kilometers|4 kilómetros|4 kilomètres|4km",
      "400 kilometers|400 kilómetros|400 kilomètres|400km",
    ],
    1,
    "On a clear winter day, when the strait sometimes freezes over, it has occasionally been possible to walk between the two islands across the ice, though doing so unofficially crosses an international border.|En un claro día de invierno, cuando el estrecho a veces se congela, en ocasiones ha sido posible caminar entre las dos islas sobre el hielo, aunque hacerlo cruza sin autorización una frontera internacional.|Par une claire journée d'hiver, quand le détroit gèle parfois, il a été occasionnellement possible de marcher entre les deux îles sur la glace, bien que cela franchisse alors une frontière internationale sans autorisation.|海峡が凍る冬の晴れた日には、氷の上を歩いて二つの島の間を行き来できることもあるが、それは非公式に国際国境を越える行為になる。",
  ),
  q(
    10,
    "Big Diomede (Russia) and Little Diomede (United States), separated by only a few kilometers, are also divided by which invisible line, making the time difference between them nearly a full day?|La Diómedes Grande (Rusia) y la Diómedes Menor (EE. UU.), separadas por solo unos kilómetros, ¿también están divididas por qué línea invisible, que hace que la diferencia horaria entre ambas sea de casi un día entero?|La Grande Diomède (Russie) et la Petite Diomède (États-Unis), séparées par seulement quelques kilomètres, sont aussi divisées par quelle ligne invisible, rendant le décalage horaire entre elles de près d'une journée entière ?|わずか数kmしか離れていない大ダイオミード島(ロシア)と小ダイオミード島(アメリカ)を隔てているもう一つの見えない境界線は何で、両島の時差をほぼ丸一日にしているか?",
    [
      "The Tropic of Cancer|El trópico de Cáncer|Le tropique du Cancer|北回帰線",
      "The Prime Meridian|El meridiano de Greenwich|Le méridien de Greenwich|本初子午線",
      "The International Date Line|La línea internacional de cambio de fecha|La ligne de changement de date internationale|日付変更線",
    ],
    2,
    "The two islands are sometimes nicknamed \"Tomorrow Island\" and \"Yesterday Isle\" because of this quirk, even though they are close enough to see each other across the water.|A las dos islas a veces se las apoda «isla del Mañana» e «isla del Ayer» por esta curiosidad, aunque están lo bastante cerca como para verse una a otra al otro lado del agua.|Les deux îles sont parfois surnommées « l'île de Demain » et « l'île d'Hier » à cause de cette curiosité, bien qu'elles soient assez proches pour se voir l'une l'autre par-delà l'eau.|この奇妙な事情から、二つの島はときに「明日の島」「昨日の島」と呼ばれる。互いに水を隔てて姿が見えるほど近い距離にあるにもかかわらずである。",
  ),
  q(
    9,
    "The Confederation Bridge, connecting Prince Edward Island to the Canadian mainland, is approximately how many kilometers long?|El puente de la Confederación, que conecta la Isla del Príncipe Eduardo con el continente canadiense, ¿mide aproximadamente cuántos kilómetros?|Le pont de la Confédération, reliant l'Île-du-Prince-Édouard au continent canadien, mesure environ combien de kilomètres ?|プリンスエドワードアイランド州とカナダ本土を結ぶコンフェデレーション橋は、およそ何kmの長さか?",
    [
      "12.9 km|12,9 km|12,9 km|12.9km",
      "3.5 km|3,5 km|3,5 km|3.5km",
      "28 km|28 km|28 km|28km",
    ],
    0,
    "It is frequently cited as the longest bridge in the world over ice-covered water, a title tied to the seasonal pack ice that forms in the Northumberland Strait each winter.|Se cita con frecuencia como el puente más largo del mundo sobre aguas cubiertas de hielo, un título ligado al hielo estacional que se forma cada invierno en el estrecho de Northumberland.|Il est fréquemment cité comme le plus long pont du monde sur des eaux couvertes de glace, un titre lié à la banquise saisonnière qui se forme chaque hiver dans le détroit de Northumberland.|しばしば「氷に覆われた水域では世界最長の橋」と言われ、その称号はノーサンバーランド海峡に毎冬できる季節的な流氷と結びついている。",
  ),
  q(
    10,
    "The French effort to build a Panama Canal in the 1880s, which ultimately went bankrupt, was led by an engineer famous for an earlier, successful canal project — which one?|El intento francés de construir un Canal de Panamá en la década de 1880, que acabó en bancarrota, fue liderado por un ingeniero famoso por un proyecto de canal anterior y exitoso, ¿cuál?|La tentative française de construction d'un canal de Panama dans les années 1880, qui finit en faillite, fut menée par un ingénieur célèbre pour un précédent projet de canal réussi — lequel ?|1880年代にパナマ運河建設を試み、最終的に破綻したフランスの事業を率いたのは、以前に別の運河事業を成功させたことで知られる技師だが、それはどの運河か?",
    [
      "The Kiel Canal|El Canal de Kiel|Le canal de Kiel|キール運河",
      "The Suez Canal|El Canal de Suez|Le canal de Suez|スエズ運河",
      "The Erie Canal|El Canal de Erie|Le canal Érié|エリー運河",
    ],
    1,
    "Ferdinand de Lesseps tried to repeat his Suez success with a sea-level canal design unsuited to Panama's terrain and disease environment, and the project's collapse triggered one of the largest financial scandals of 19th-century France.|Ferdinand de Lesseps intentó repetir su éxito de Suez con un diseño de canal a nivel del mar poco adecuado al terreno y al entorno de enfermedades de Panamá, y el colapso del proyecto desató uno de los mayores escándalos financieros de la Francia del siglo XIX.|Ferdinand de Lesseps tenta de répéter son succès de Suez avec un canal à niveau de la mer inadapté au terrain et à l'environnement pathogène du Panama, et l'effondrement du projet déclencha l'un des plus grands scandales financiers de la France du XIXe siècle.|フェルディナン・ド・レセップスはスエズでの成功を再現しようと、パナマの地形と疫病環境には不向きな海面式運河の設計に挑んだが、事業は破綻し、19世紀フランス最大級の金融スキャンダルの一つを引き起こした。",
  ),
  q(
    9,
    "Mexico's nationalization of foreign oil companies, a landmark event still marked by a national holiday, took place in which month and year?|La nacionalización mexicana de las petroleras extranjeras, hito que aún se conmemora con un feriado nacional, ¿ocurrió en qué mes y año?|La nationalisation mexicaine des compagnies pétrolières étrangères, événement marquant encore commémoré par un jour férié national, eut lieu en quel mois et quelle année ?|いまも祝日として記念されている、メキシコによる外国石油会社の国有化は、何年の何月に行われたか?",
    [
      "January 1917|Enero de 1917|Janvier 1917|1917年1月",
      "September 1929|Septiembre de 1929|Septembre 1929|1929年9月",
      "March 1938|Marzo de 1938|Mars 1938|1938年3月",
    ],
    2,
    "President Lázaro Cárdenas's expropriation created the state oil company Pemex, and March 18 is still marked each year as \"Oil Expropriation Day.\"|La expropiación del presidente Lázaro Cárdenas creó la petrolera estatal Pemex, y el 18 de marzo aún se conmemora cada año como el «Día de la Expropiación Petrolera».|L'expropriation du président Lázaro Cárdenas créa la compagnie pétrolière d'État Pemex, et le 18 mars est encore célébré chaque année comme le « jour de l'expropriation pétrolière ».|ラサロ・カルデナス大統領によるこの接収により国営石油会社ペメックスが誕生し、3月18日はいまも毎年「石油接収記念日」として記念されている。",
  ),
];
