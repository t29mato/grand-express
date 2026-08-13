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
];
