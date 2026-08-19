/**
 * 九州のクイズ。
 *
 * 都市カード(cities.mjs、40都市)が扱った具体的な事実(三池・端島・平戸・
 * 浦上・桜島・唐津の名護屋城など)はここでは問わない。代わりに、
 * 都市カードが触れていない主題(地理・近代史・方言と食・現代の産業)を選んだ。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その土地の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 難易度9の1問(九州最初の鉄道の開業年)は答えの年号を team-lead が裏取り済み
 * (report参照)。ほかの難易度9〜10の問いは、まだ他盤面の担当による
 * 確認前(report内に確度の低いものを個別に記載)。
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

export const KYUSHU_QUIZ = [
  q(
    3,
    "Among Japan's four main islands, where does Kyūshū rank by land area?|Entre las cuatro islas principales de Japón, ¿qué lugar ocupa Kyūshū por superficie?|Parmi les quatre îles principales du Japon, quel rang occupe Kyūshū par sa superficie ?|日本の四つの主要な島のうち、九州は面積で何番目?",
    [
      "Third, after Honshū and Hokkaidō|Tercera, tras Honshū y Hokkaidō|Troisième, après Honshū et Hokkaidō|本州・北海道に次ぐ3番目",
      "Second, after only Honshū|Segunda, solo tras Honshū|Deuxième, après Honshū seulement|本州に次ぐ2番目",
      "Fourth, the smallest of the four|Cuarta, la más pequeña de las cuatro|Quatrième, la plus petite des quatre|4つの中で最も小さい",
    ],
    0,
    "Kyūshū covers roughly 36,750 km², well behind Honshū and Hokkaidō but almost twice the area of Shikoku, and holds about ten million people across its seven prefectures.|Kyūshū cubre unos 36.750 km², muy por detrás de Honshū y Hokkaidō pero casi el doble que Shikoku, y alberga unos diez millones de personas en sus siete prefecturas.|Kyūshū couvre environ 36 750 km², loin derrière Honshū et Hokkaidō mais près du double de Shikoku, et compte environ dix millions d'habitants dans ses sept préfectures.|九州の面積はおよそ36,750km²で、本州・北海道には遠く及ばないが四国のほぼ2倍あり、七県でおよそ千万人が暮らす。",
  ),
  q(
    7,
    "Where do most passengers riding the Nishi-Kyūshū Shinkansen have to change trains to continue toward the rest of Japan's shinkansen network?|¿Dónde tiene que cambiar de tren la mayoría de los pasajeros del Nishi-Kyūshū Shinkansen para continuar hacia el resto de la red japonesa?|Où la plupart des passagers du Nishi-Kyūshū Shinkansen doivent-ils changer de train pour rejoindre le reste du réseau japonais ?|西九州新幹線の乗客の多くは、日本の新幹線網の残りへ向かうためどこで乗り換える必要がある?",
    [
      "Takeo-Onsen Station|Estación de Takeo-Onsen|Gare de Takeo-Onsen|武雄温泉駅",
      "Hakata Station|Estación de Hakata|Gare de Hakata|博多駅",
      "Isahaya Station|Estación de Isahaya|Gare d'Isahaya|諫早駅",
    ],
    0,
    "The line opened in 2022 running only between Takeo-Onsen and Nagasaki; Saga Prefecture has not agreed to fund the full-gauge extension toward Hakata, so passengers cross the same platform at Takeo-Onsen onto a conventional-line limited express to continue their journey.|La línea abrió en 2022 y circula solo entre Takeo-Onsen y Nagasaki; la prefectura de Saga no ha aceptado financiar la extensión de vía ancha hacia Hakata, así que los pasajeros cruzan el mismo andén en Takeo-Onsen hacia un exprés de línea convencional para continuar su viaje.|La ligne a ouvert en 2022 et ne circule qu'entre Takeo-Onsen et Nagasaki ; la préfecture de Saga n'a pas accepté de financer le prolongement à voie standard vers Hakata, si bien que les passagers traversent le même quai à Takeo-Onsen pour prendre un express de ligne classique et poursuivre leur trajet.|2022年に開業したこの路線は武雄温泉—長崎間しか走っておらず、博多までのフル規格延伸に佐賀県が同意していないため、乗客は武雄温泉で同じホームを渡って在来線特急に乗り継ぐ。",
  ),
  q(
    9,
    "In what year did Kyūshū's first railway line open, running south from Hakata toward Kurume and Kumamoto?|¿En qué año abrió la primera línea ferroviaria de Kyūshū, que iba de Hakata hacia el sur, a Kurume y Kumamoto?|En quelle année la première ligne ferroviaire de Kyūshū ouvrit-elle, filant de Hakata vers le sud, en direction de Kurume et Kumamoto ?|九州で最初の鉄道路線が開業したのは何年? 博多から南へ、久留米・熊本方面へ向かう路線だった。",
    [
      "1889|1889|1889|1889年",
      "1901|1901|1901|1901年",
      "1872|1872|1872|1872年",
    ],
    0,
    "The privately run Kyūshū Railway Company opened its first stretch, from Hakata to a temporary terminus, in December 1889; the terminus was temporary only because flooding on the Chikugo River had delayed the bridge onward. The railway built specifically to carry Chikuhō coalfield coal came two years later, in 1891, from a separate company.|La empresa privada Kyūshū Railway abrió su primer tramo, de Hakata a una terminal provisional, en diciembre de 1889; la terminal era provisional solo porque una crecida del río Chikugo había retrasado el puente siguiente. El ferrocarril construido específicamente para transportar el carbón de la cuenca de Chikuhō llegó dos años después, en 1891, de manos de otra empresa.|La compagnie privée Kyūshū Railway ouvrit son premier tronçon, de Hakata à un terminus provisoire, en décembre 1889 ; ce terminus n'était provisoire qu'à cause d'une crue de la rivière Chikugo qui avait retardé le pont suivant. La ligne construite spécifiquement pour transporter le charbon du bassin de Chikuhō vint deux ans plus tard, en 1891, d'une autre compagnie.|民営の九州鉄道会社は1889年12月、博多から仮停車場までの最初の区間を開業させた。仮停車場止まりだったのは、筑後川の氾濫で先の橋梁工事が遅れていたためにすぎない。筑豊の石炭を運ぶために敷かれた鉄道は、2年後の1891年、別会社の手で開通した。",
  ),

  // ==================== 地理 ====================
  q(
    1,
    "How many prefectures make up the island of Kyūshū (not counting Okinawa)?|¿Cuántas prefecturas forman la isla de Kyūshū (sin contar Okinawa)?|Combien de préfectures composent l'île de Kyūshū (sans compter Okinawa) ?|沖縄を除くと、九州島はいくつの県からなる?",
    ["Seven|Siete|Sept|7つ", "Five|Cinco|Cinq|5つ", "Nine|Nueve|Neuf|9つ"],
    0,
    "Fukuoka, Saga, Nagasaki, Kumamoto, Ōita, Miyazaki and Kagoshima are the seven; Okinawa is administered separately, having been the independent Ryūkyū Kingdom until 1879.|Fukuoka, Saga, Nagasaki, Kumamoto, Ōita, Miyazaki y Kagoshima son las siete; Okinawa se administra aparte, pues fue el reino independiente de Ryūkyū hasta 1879.|Fukuoka, Saga, Nagasaki, Kumamoto, Ōita, Miyazaki et Kagoshima sont les sept ; Okinawa est administrée à part, ayant été le royaume indépendant de Ryūkyū jusqu'en 1879.|福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島の七県。沖縄は1879年まで独立した琉球王国だったこともあり、別に扱われる。",
  ),
  q(
    2,
    "What strait separates Kyūshū from Honshū, Japan's main island?|¿Qué estrecho separa Kyūshū de Honshū, la isla principal de Japón?|Quel détroit sépare Kyūshū de Honshū, l'île principale du Japon ?|九州と本州を隔てる海峡は?",
    ["The Kanmon Strait|El estrecho de Kanmon|Le détroit de Kanmon|関門海峡", "The Tsugaru Strait|El estrecho de Tsugaru|Le détroit de Tsugaru|津軽海峡", "The Bungo Channel|El canal de Bungo|Le canal de Bungo|豊後水道"],
    0,
    "At its narrowest the Kanmon Strait is under a kilometre wide, and both a road tunnel and a rail tunnel run beneath it linking Kitakyūshū to Shimonoseki on Honshū.|En su punto más estrecho, el estrecho de Kanmon mide menos de un kilómetro, y bajo él pasan un túnel de carretera y otro ferroviario que unen Kitakyūshū con Shimonoseki, en Honshū.|À son point le plus étroit, le détroit de Kanmon mesure moins d'un kilomètre, et un tunnel routier ainsi qu'un tunnel ferroviaire le traversent, reliant Kitakyūshū à Shimonoseki, sur Honshū.|関門海峡はいちばん狭い所で幅1kmに満たない。道路トンネルと鉄道トンネルの両方が海底を通り、北九州と本州の下関を結んでいる。",
  ),
  q(
    2,
    "What is the name of the sea off Kyūshū's north-western coast, facing the Korean Peninsula?|¿Cómo se llama el mar frente a la costa noroeste de Kyūshū, de cara a la península de Corea?|Comment s'appelle la mer au large de la côte nord-ouest de Kyūshū, face à la péninsule coréenne ?|九州の北西の海岸沖、朝鮮半島に面した海の名は?",
    ["The Genkai Sea|El mar de Genkai|La mer de Genkai|玄界灘", "The Seto Inland Sea|El mar interior de Seto|La mer intérieure de Seto|瀬戸内海", "The Sea of Okhotsk|El mar de Ojotsk|La mer d'Okhotsk|オホーツク海"],
    0,
    "The Genkai Sea is part of the Korea Strait, and its rough winter swells have wrecked fishing boats for centuries even on routes only a day's sail from the Korean coast.|El mar de Genkai forma parte del estrecho de Corea, y su oleaje invernal ha hundido barcos de pesca durante siglos incluso en rutas a solo un día de navegación de la costa coreana.|La mer de Genkai fait partie du détroit de Corée, et sa houle hivernale a englouti des bateaux de pêche pendant des siècles, même sur des routes à seulement une journée de navigation de la côte coréenne.|玄界灘は朝鮮海峡の一部で、朝鮮半島の海岸まで船で一日ほどの航路であっても、冬の荒波は何世紀も漁船を沈めてきた。",
  ),
  q(
    4,
    "What is the name of the southernmost point of the Kyūshū mainland?|¿Cómo se llama el punto más al sur de la isla principal de Kyūshū?|Comment s'appelle le point le plus au sud de l'île principale de Kyūshū ?|九州本土の最南端の名は?",
    ["Cape Sata|Cabo Sata|Cap Sata|佐多岬", "Cape Sōya|Cabo Sōya|Cap Sōya|宗谷岬", "Cape Inubō|Cabo Inubō|Cap Inubō|犬吠埼"],
    0,
    "Cape Sata sits at the tip of the Ōsumi Peninsula in Kagoshima Prefecture, and its lighthouse looks out toward the Ōsumi Strait and, eventually, the Ryūkyū Islands.|El cabo Sata está en la punta de la península de Ōsumi, en la prefectura de Kagoshima, y su faro mira hacia el estrecho de Ōsumi y, más allá, hacia las islas Ryūkyū.|Le cap Sata se trouve à la pointe de la péninsule d'Ōsumi, dans la préfecture de Kagoshima, et son phare regarde vers le détroit d'Ōsumi et, plus loin, vers les îles Ryūkyū.|佐多岬は鹿児島県の大隅半島の先端にあり、その灯台は大隅海峡、さらに先の琉球列島のほうを見つめている。",
  ),
  q(
    6,
    "Which Kyūshū prefecture has, by a wide margin, the largest number of named inhabited islands of any Japanese prefecture?|¿Qué prefectura de Kyūshū tiene, con gran diferencia, el mayor número de islas habitadas con nombre de todo Japón?|Quelle préfecture du Kyūshū compte, de loin, le plus grand nombre d'îles habitées nommées de tout le Japon ?|日本のどの都道府県よりも大差で有人島の数が多い九州の県は?",
    ["Nagasaki|Nagasaki|Nagasaki|長崎県", "Fukuoka|Fukuoka|Fukuoka|福岡県", "Kagoshima|Kagoshima|Kagoshima|鹿児島県"],
    0,
    "Nagasaki Prefecture is made up of hundreds of islands large and small, including the Gotō and Tsushima chains, and it has the second-longest coastline of any prefecture in Japan despite its small land area.|La prefectura de Nagasaki se compone de cientos de islas grandes y pequeñas, incluidas las cadenas de Gotō y Tsushima, y tiene la segunda costa más larga de cualquier prefectura de Japón pese a su pequeña superficie.|La préfecture de Nagasaki se compose de centaines d'îles grandes et petites, dont les chaînes de Gotō et de Tsushima, et possède le deuxième plus long littoral de toutes les préfectures du Japon malgré sa faible superficie.|長崎県は五島列島や対馬列島を含む大小何百もの島からなり、面積は小さいにもかかわらず、海岸線の長さは全国の都道府県で2番目に長い。",
  ),
  q(
    5,
    "Which Kyūshū prefecture includes Tsushima, an island only about 50 km from the South Korean coast?|¿Qué prefectura de Kyūshū incluye Tsushima, una isla a solo unos 50 km de la costa surcoreana?|Quelle préfecture du Kyūshū comprend Tsushima, une île à seulement environ 50 km de la côte sud-coréenne ?|韓国の海岸からわずか約50kmの対馬島を含む九州の県は?",
    ["Nagasaki|Nagasaki|Nagasaki|長崎県", "Fukuoka|Fukuoka|Fukuoka|福岡県", "Saga|Saga|Saga|佐賀県"],
    0,
    "Tsushima is closer to Busan than it is to the Kyūshū mainland, and on a clear day the lights of South Korea are visible from its northern hills.|Tsushima está más cerca de Busan que de la isla principal de Kyūshū, y en un día despejado se ven las luces de Corea del Sur desde sus colinas del norte.|Tsushima est plus proche de Busan que de l'île principale de Kyūshū, et par temps clair, les lumières de la Corée du Sud sont visibles depuis ses collines du nord.|対馬は九州本土よりも釜山に近く、晴れた日には島の北部の丘から韓国の灯りが見える。",
  ),
  q(
    7,
    "What is the name of Kyūshū mainland's highest peak, part of the Kujū mountain range in Ōita Prefecture?|¿Cómo se llama el pico más alto de la isla principal de Kyūshū, en la cordillera Kujū de la prefectura de Ōita?|Comment s'appelle le plus haut sommet de l'île principale de Kyūshū, dans le massif du Kujū en préfecture d'Ōita ?|大分県の九重連山にある、九州本土でいちばん高い峰の名は?",
    ["Nakadake|Nakadake|Nakadake|中岳", "Karakunidake|Karakunidake|Karakunidake|韓国岳", "Miyanouradake|Miyanouradake|Miyanouradake|宮之浦岳"],
    0,
    "At 1,791 m, Nakadake edges out its neighbouring peaks by only a few metres; the two other options are Kagoshima's Kirishima volcano and Yakushima's own highest point offshore.|Con 1.791 m, Nakadake supera a los picos vecinos por solo unos metros; las otras dos opciones son el volcán Kirishima de Kagoshima y el punto más alto de la propia Yakushima, mar adentro.|Avec 1 791 m, le Nakadake dépasse ses sommets voisins de quelques mètres seulement ; les deux autres options sont le volcan Kirishima de Kagoshima et le point culminant de Yakushima au large.|中岳は標高1,791mで、隣り合う峰よりわずかに高い。他の選択肢は鹿児島の霧島連峰の一峰と、洋上の屋久島の最高峰である。",
  ),
  q(
    6,
    "Yakushima, off Kagoshima's southern coast, is known for cedar trees claimed to be how old, in some cases?|Yakushima, frente a la costa sur de Kagoshima, es conocida por cedros a los que se atribuye una edad de hasta cuántos años, en algunos casos?|Yakushima, au large de la côte sud de Kagoshima, est réputée pour des cèdres auxquels on prête, dans certains cas, un âge d'environ combien d'années ?|鹿児島の南方沖にある屋久島は、樹齢がどれほどとされる杉で知られる?",
    ["Several thousand years|Varios miles de años|Plusieurs milliers d'années|数千年", "About two hundred years|Unos doscientos años|Environ deux cents ans|約200年", "About fifty years|Unos cincuenta años|Environ cinquante ans|約50年"],
    0,
    "The most famous, Jōmon Sugi, is estimated by some studies at over 2,000 years old and by others at closer to 7,000, a gap wide enough that its true age is still debated.|El más famoso, el Jōmon Sugi, se estima en más de 2.000 años según algunos estudios y en casi 7.000 según otros, una diferencia tan amplia que su edad real sigue debatiéndose.|Le plus célèbre, le Jōmon Sugi, est estimé à plus de 2 000 ans par certaines études et à près de 7 000 par d'autres, un écart assez large pour que son âge réel soit encore débattu.|最も有名な縄文杉は、研究によって樹齢2,000年超ともおよそ7,000年ともされ、その幅の大きさゆえに本当の樹齢は今も議論が続く。",
  ),
  q(
    5,
    "Yakushima was registered in 1993, alongside Shirakami-Sanchi, as one of Japan's first sites on which UNESCO list?|Yakushima fue inscrita en 1993, junto con Shirakami-Sanchi, como uno de los primeros sitios de Japón en qué lista de la UNESCO?|Yakushima fut inscrite en 1993, avec Shirakami-Sanchi, parmi les premiers sites du Japon sur quelle liste de l'UNESCO ?|屋久島は1993年、白神山地とともに、ユネスコのどの一覧に登録された日本最初の物件になった?",
    ["The Natural World Heritage list|La lista de Patrimonio Natural de la Humanidad|La liste du patrimoine naturel mondial|自然遺産", "The Intangible Cultural Heritage list|La lista de Patrimonio Cultural Inmaterial|La liste du patrimoine culturel immatériel|無形文化遺産", "The Memory of the World register|El registro Memoria del Mundo|Le registre Mémoire du monde|世界の記憶"],
    0,
    "Japan had no Natural World Heritage sites at all before 1993; Yakushima's mix of subtropical coast and near-alpine peak in a single small island was central to the case for listing it.|Japón no tenía ningún sitio de Patrimonio Natural antes de 1993; la mezcla de costa subtropical y cumbre casi alpina en una sola isla pequeña fue clave para su inscripción.|Le Japon n'avait aucun site du patrimoine naturel avant 1993 ; le mélange de côte subtropicale et de sommet quasi alpin sur une seule petite île fut central dans le dossier d'inscription.|1993年以前、日本には自然遺産は一つもなかった。亜熱帯の海岸とほぼ高山帯の頂を一つの小さな島に併せ持つことが、登録の決め手になった。",
  ),

  // ==================== 近代以前の歴史 ====================
  q(
    3,
    "What natural phenomenon is credited with helping repel both Mongol invasion fleets that attacked Kyūshū in 1274 and 1281?|¿A qué fenómeno natural se atribuye haber ayudado a repeler ambas flotas mongolas que atacaron Kyūshū en 1274 y 1281?|À quel phénomène naturel attribue-t-on d'avoir contribué à repousser les deux flottes mongoles qui attaquèrent le Kyūshū en 1274 et 1281 ?|1274年と1281年、九州を襲った二度の元寇の船団を退けるのに一役買ったとされる自然現象は?",
    ["Typhoons|Tifones|Des typhons|台風", "Earthquakes|Terremotos|Des séismes|地震", "A volcanic eruption|Una erupción volcánica|Une éruption volcanique|火山噴火"],
    0,
    "The storms that scattered the Mongol fleets were later remembered as kamikaze, \"divine wind\", a term that would take on a very different meaning seven centuries later.|Las tormentas que dispersaron las flotas mongolas se recordaron después como kamikaze, «viento divino», un término que siete siglos después adquiriría un significado muy distinto.|Les tempêtes qui dispersèrent les flottes mongoles furent plus tard retenues sous le nom de kamikaze, « vent divin », un terme qui prendrait un sens bien différent sept siècles plus tard.|元寇の船団を吹き散らした嵐は、後に「神風」として語り継がれた。この語は七百年後、まったく違う意味を帯びることになる。",
  ),
  q(
    4,
    "Rice cultivation is believed to have first reached Japan via Kyūshū from where, around the 3rd century BC?|¿De dónde se cree que llegó por primera vez a Japón el cultivo del arroz, vía Kyūshū, hacia el siglo III a. C.?|D'où le riz aurait-il d'abord gagné le Japon via le Kyūshū, vers le IIIe siècle av. J.-C. ?|紀元前3世紀頃、稲作は九州経由でどこから日本へ最初に伝わったとされる?",
    ["The Korean Peninsula|La península de Corea|La péninsule coréenne|朝鮮半島", "Southeast Asia by sea|El sudeste asiático por mar|L'Asie du Sud-Est par la mer|海路の東南アジア", "Northern China overland|China del norte por tierra|La Chine du Nord par voie terrestre|陸路の中国北部"],
    0,
    "Wet-rice farming, along with bronze and iron tools, arrived in the Yayoi period through Kyūshū's short sea crossing from the peninsula, and spread east from there over the following centuries.|El arrozal inundado, junto con herramientas de bronce y hierro, llegó en el período Yayoi a través de la corta travesía marítima de Kyūshū desde la península, y se extendió hacia el este en los siglos siguientes.|La riziculture inondée, avec les outils de bronze et de fer, arriva à l'époque Yayoi par la courte traversée maritime du Kyūshū depuis la péninsule, puis se répandit vers l'est au fil des siècles suivants.|水田稲作は青銅器・鉄器とともに、朝鮮半島から九州への短い海路を経て弥生時代に伝わり、そこから何世紀もかけて東へ広がった。",
  ),
  q(
    5,
    "According to legend, a Japanese empress led an invasion fleet toward Korea after gathering forces in northern Kyūshū. What is she known as?|Según la leyenda, una emperatriz japonesa lideró una flota de invasión hacia Corea tras reunir fuerzas en el norte de Kyūshū. ¿Cómo se la conoce?|Selon la légende, une impératrice japonaise mena une flotte d'invasion vers la Corée après avoir rassemblé des forces dans le nord du Kyūshū. Comment est-elle connue ?|伝説によれば、九州北部で兵を集めた後、朝鮮への遠征船団を率いた日本の皇后がいる。何と呼ばれる?",
    ["Empress Jingū|La emperatriz Jingū|L'impératrice Jingū|神功皇后", "Empress Suiko|La emperatriz Suiko|L'impératrice Suiko|推古天皇", "Empress Kōken|La emperatriz Kōken|L'impératrice Kōken|孝謙天皇"],
    0,
    "The story appears in Japan's earliest chronicles but has no confirmed historical record behind it; several shrines around Kyūshū's Genkai coast nonetheless mark sites tied to the legend.|La historia aparece en las crónicas más antiguas de Japón pero no tiene respaldo histórico confirmado; varios santuarios de la costa de Genkai en Kyūshū marcan igualmente lugares ligados a la leyenda.|L'histoire figure dans les plus anciennes chroniques du Japon mais n'a aucune confirmation historique ; plusieurs sanctuaires le long de la côte de Genkai au Kyūshū marquent néanmoins des lieux liés à la légende.|この話は日本最古の史書に載るが、確かな史実の裏付けはない。それでも玄界灘沿岸のいくつかの神社は、伝説にちなむ場所として今も祀られている。",
  ),
  q(
    4,
    "Which European missionary, later canonised as a saint, first landed in Japan at Kagoshima in 1549?|¿Qué misionero europeo, canonizado después como santo, desembarcó por primera vez en Japón en Kagoshima en 1549?|Quel missionnaire européen, canonisé plus tard, débarqua le premier au Japon à Kagoshima en 1549 ?|1549年、鹿児島に最初に上陸し、後に聖人とされたヨーロッパの宣教師は?",
    ["Francis Xavier|Francisco Javier|François Xavier|フランシスコ・ザビエル", "Matteo Ricci|Matteo Ricci|Matteo Ricci|マテオ・リッチ", "Luís de Almeida|Luís de Almeida|Luís de Almeida|ルイス・デ・アルメイダ"],
    0,
    "Xavier stayed only about a year before moving on to other parts of Japan, but the mission he began grew, within a few decades, into a Christian population estimated in the hundreds of thousands.|Javier permaneció apenas un año antes de pasar a otras partes de Japón, pero la misión que inició creció, en pocas décadas, hasta una población cristiana estimada en cientos de miles.|Xavier ne resta qu'environ un an avant de gagner d'autres régions du Japon, mais la mission qu'il entama grandit, en quelques décennies, jusqu'à une population chrétienne estimée à plusieurs centaines de milliers.|ザビエルが鹿児島に滞在したのは一年ほどにすぎないが、彼が始めた布教はその後数十年で数十万人規模とされるキリシタン人口にまで広がった。",
  ),
  q(
    7,
    "Kumamoto Castle, one of Japan's most celebrated fortresses, was largely built in the early 1600s by which daimyō?|El castillo de Kumamoto, una de las fortalezas más célebres de Japón, fue construido en gran parte a comienzos del siglo XVII por qué daimyō?|Le château de Kumamoto, l'une des forteresses les plus célèbres du Japon, fut en grande partie bâti au début du XVIIe siècle par quel daimyō ?|日本でも屈指の名城とされる熊本城は、17世紀初めにおもにどの大名によって築かれた?",
    ["Katō Kiyomasa|Katō Kiyomasa|Katō Kiyomasa|加藤清正", "Date Masamune|Date Masamune|Date Masamune|伊達政宗", "Uesugi Kenshin|Uesugi Kenshin|Uesugi Kenshin|上杉謙信"],
    0,
    "Katō Kiyomasa had learned castle design the hard way, having survived a siege in Korea during Hideyoshi's invasions, and built in features meant to withstand exactly that kind of prolonged attack.|Katō Kiyomasa había aprendido el diseño de castillos por las malas, tras sobrevivir a un asedio en Corea durante las invasiones de Hideyoshi, e incorporó elementos pensados para resistir justo ese tipo de ataque prolongado.|Katō Kiyomasa avait appris l'art de bâtir des châteaux à la dure, ayant survécu à un siège en Corée durant les invasions de Hideyoshi, et intégra des dispositifs conçus pour résister précisément à ce type d'attaque prolongée.|加藤清正は、秀吉の朝鮮出兵での籠城戦を生き延びた経験から築城の勘所を学んでおり、まさにそうした長期の攻囲に耐えるための工夫を城に組み込んだ。",
  ),
  q(
    8,
    "In 1863, which Kyūshū domain did the British Royal Navy bombard, in retaliation for the killing of a British merchant the previous year?|En 1863, ¿qué dominio de Kyūshū bombardeó la Marina Real británica, en represalia por el asesinato de un comerciante británico el año anterior?|En 1863, quel domaine du Kyūshū la Royal Navy britannique bombarda-t-elle, en représailles du meurtre d'un marchand britannique l'année précédente ?|1863年、前年に起きたイギリス人商人殺害への報復として英国海軍が砲撃した九州の藩は?",
    ["Satsuma|Satsuma|Satsuma|薩摩藩", "Chōshū|Chōshū|Chōshū|長州藩", "Hizen|Hizen|Hizen|肥前藩"],
    0,
    "The bombardment of Kagoshima, provoked by the killing of Charles Lennox Richardson at Namamugi near Yokohama, damaged much of the town but convinced Satsuma's leaders that Western military technology could not simply be resisted, and had to be learned.|El bombardeo de Kagoshima, provocado por el asesinato de Charles Lennox Richardson en Namamugi, cerca de Yokohama, dañó buena parte de la ciudad pero convenció a los líderes de Satsuma de que la tecnología militar occidental no podía simplemente resistirse, sino que había que aprenderla.|Le bombardement de Kagoshima, provoqué par le meurtre de Charles Lennox Richardson à Namamugi, près de Yokohama, endommagea une bonne partie de la ville mais convainquit les dirigeants de Satsuma que la technologie militaire occidentale ne pouvait être simplement combattue, mais devait être apprise.|横浜近郊の生麦で起きたイギリス人商人リチャードソン殺害事件への報復として、英国海軍は鹿児島を砲撃した。町の多くが損なわれたが、これが薩摩の指導者たちに、西洋の軍事技術は抗うのではなく学ぶべきものだと確信させることになった。",
  ),
  q(
    5,
    "After a 1609 invasion, the Ryūkyū Kingdom (present-day Okinawa) came under the indirect control of which Kyūshū domain?|Tras una invasión en 1609, ¿bajo el control indirecto de qué dominio de Kyūshū quedó el reino de Ryūkyū (actual Okinawa)?|Après une invasion en 1609, le royaume de Ryūkyū (actuelle Okinawa) passa sous le contrôle indirect de quel domaine du Kyūshū ?|1609年の侵攻の後、間接統治の下に置かれた琉球王国(現在の沖縄)を治めた九州の藩は?",
    ["Satsuma|Satsuma|Satsuma|薩摩藩", "Hizen|Hizen|Hizen|肥前藩", "Bungo|Bungo|Bungo|豊後藩"],
    0,
    "Satsuma allowed the Ryūkyū Kingdom to keep its own king and continue paying tribute to China, since a nominally independent kingdom could trade with China in ways a Japanese domain could not.|Satsuma permitió al reino de Ryūkyū conservar a su propio rey y seguir rindiendo tributo a China, ya que un reino nominalmente independiente podía comerciar con China de un modo que un dominio japonés no podía.|Satsuma laissa le royaume de Ryūkyū conserver son propre roi et continuer de payer tribut à la Chine, un royaume nominalement indépendant pouvant commercer avec la Chine d'une façon qu'un domaine japonais ne pouvait pas.|薩摩は琉球王国に独自の王を残し、中国への朝貢も続けさせた。名目上独立した王国であれば、日本の藩にはできない形で中国と貿易できたからである。",
  ),
  q(
    8,
    "During the Shimabara Rebellion, ships from which European trading nation bombarded the rebels' Hara Castle at the shogunate's request?|Durante la rebelión de Shimabara, ¿los barcos de qué nación comercial europea bombardearon el castillo de Hara de los rebeldes, a petición del shogunato?|Pendant la rébellion de Shimabara, des navires de quelle nation commerçante européenne bombardèrent-ils le château de Hara des rebelles, à la demande du shogunat ?|島原の乱で、幕府の要請により反乱側の原城を艦砲射撃したヨーロッパの通商国はどこ?",
    ["The Dutch|Los neerlandeses|Les Néerlandais|オランダ", "The Portuguese|Los portugueses|Les Portugais|ポルトガル", "The Spanish|Los españoles|Les Espagnols|スペイン"],
    0,
    "The Dutch, eager to protect their trading position after the Portuguese were expelled, agreed to help suppress a rebellion led by fellow Christians — an episode still uncomfortable for the way it entangled trade with religious persecution.|Los neerlandeses, deseosos de proteger su posición comercial tras la expulsión de los portugueses, accedieron a ayudar a sofocar una rebelión liderada por otros cristianos, un episodio aún incómodo por cómo entrelazó el comercio con la persecución religiosa.|Les Néerlandais, soucieux de protéger leur position commerciale après l'expulsion des Portugais, acceptèrent d'aider à mater une rébellion menée par d'autres chrétiens — un épisode encore gênant par la façon dont il mêla commerce et persécution religieuse.|ポルトガル人が追放された後の自らの貿易上の立場を守りたかったオランダは、同じキリスト教徒が率いる反乱の鎮圧に手を貸すことを承知した。貿易と宗教弾圧が絡み合ったこの一件は、今も語るに気まずさが残る。",
  ),
  q(
    7,
    "Which Satsuma-born general led the 1877 Satsuma Rebellion — the last major samurai uprising against the new Meiji government — and died at the Battle of Shiroyama?|¿Qué general nacido en Satsuma lideró la rebelión de Satsuma de 1877, el último gran levantamiento samurái contra el nuevo gobierno Meiji, y murió en la batalla de Shiroyama?|Quel général né à Satsuma dirigea la rébellion de Satsuma en 1877 — le dernier grand soulèvement de samouraïs contre le nouveau gouvernement Meiji — et mourut à la bataille de Shiroyama ?|1877年、新政府に対する最後の大規模な士族反乱・西南戦争を率い、城山の戦いで没した薩摩出身の将は?",
    ["Saigō Takamori|Saigō Takamori|Saigō Takamori|西郷隆盛", "Ōkubo Toshimichi|Ōkubo Toshimichi|Ōkubo Toshimichi|大久保利通", "Yamagata Aritomo|Yamagata Aritomo|Yamagata Aritomo|山縣有朋"],
    0,
    "Saigō had himself helped bring down the shogunate a decade earlier, only to turn against the government he had helped create once it began dismantling the samurai class's privileges.|El propio Saigō había ayudado a derribar el shogunato una década antes, solo para volverse contra el gobierno que había ayudado a crear cuando este empezó a desmantelar los privilegios de la clase samurái.|Saigō lui-même avait contribué à renverser le shogunat une décennie plus tôt, avant de se retourner contre le gouvernement qu'il avait aidé à fonder lorsque celui-ci entreprit de démanteler les privilèges de la classe des samouraïs.|西郷自身、十年前には幕府を倒す側にいたが、自らが樹立を助けた政府が武士の特権を解体し始めると、その政府に対して兵を挙げることになった。",
  ),
  q(
    6,
    "What was the name of the 1866 secret alliance between Satsuma and Chōshū domains, partly brokered by Sakamoto Ryōma, that helped bring down the shogunate?|¿Cómo se llamó la alianza secreta de 1866 entre los dominios de Satsuma y Chōshū, mediada en parte por Sakamoto Ryōma, que ayudó a derribar el shogunato?|Comment s'appelait l'alliance secrète de 1866 entre les domaines de Satsuma et Chōshū, en partie négociée par Sakamoto Ryōma, qui contribua à renverser le shogunat ?|坂本龍馬らが仲介し、1866年に結ばれ倒幕につながった薩摩・長州両藩の密約の名は?",
    ["The Satchō Alliance|La Alianza Satchō|L'Alliance Satchō|薩長同盟", "The Sonnō Jōi Pact|El Pacto Sonnō Jōi|Le Pacte Sonnō Jōi|尊王攘夷の盟約", "The Meirokusha Accord|El Acuerdo Meirokusha|L'Accord Meirokusha|明六社の協定"],
    0,
    "Satsuma and Chōshū had been rivals rather than allies, and the deal — combining Satsuma's access to weapons with Chōshū's fighting experience against the shogunate — was negotiated in secret because open cooperation between them still seemed unthinkable.|Satsuma y Chōshū habían sido rivales, no aliados, y el pacto —que combinaba el acceso de Satsuma a las armas con la experiencia de combate de Chōshū contra el shogunato— se negoció en secreto porque una cooperación abierta entre ambos aún parecía impensable.|Satsuma et Chōshū avaient été rivaux plutôt qu'alliés, et l'accord — combinant l'accès de Satsuma aux armes et l'expérience de combat de Chōshū contre le shogunat — fut négocié en secret car une coopération ouverte entre eux semblait encore inconcevable.|薩摩と長州はそれまで同盟者ではなく競争相手だった。薩摩の武器調達力と長州の対幕府戦の実戦経験を組み合わせたこの盟約は、両者の公然たる協力がまだ考えられなかったため、秘密裏に結ばれた。",
  ),
  q(
    8,
    "Admiral Tōgō Heihachirō, who commanded Japan's fleet to victory at the decisive 1905 Battle of Tsushima, was born in which Kyūshū city?|El almirante Tōgō Heihachirō, que llevó a la flota japonesa a la victoria en la decisiva batalla de Tsushima de 1905, ¿en qué ciudad de Kyūshū nació?|L'amiral Tōgō Heihachirō, qui mena la flotte japonaise à la victoire lors de la décisive bataille de Tsushima en 1905, est né dans quelle ville du Kyūshū ?|1905年の日本海海戦(対馬沖)で艦隊を勝利に導いた東郷平八郎提督が生まれた九州の都市は?",
    ["Kagoshima|Kagoshima|Kagoshima|鹿児島", "Nagasaki|Nagasaki|Nagasaki|長崎", "Kumamoto|Kumamoto|Kumamoto|熊本"],
    0,
    "Tōgō was a Satsuma samurai's son who survived the British bombardment of Kagoshima as a boy in 1863, an experience that reportedly convinced him early on that Japan needed a modern navy of its own.|Tōgō era hijo de un samurái de Satsuma que sobrevivió de niño al bombardeo británico de Kagoshima en 1863, una experiencia que, se dice, lo convenció desde joven de que Japón necesitaba una armada moderna propia.|Tōgō était le fils d'un samouraï de Satsuma qui survécut, enfant, au bombardement britannique de Kagoshima en 1863, une expérience qui l'aurait convaincu très tôt que le Japon avait besoin de sa propre marine moderne.|東郷は薩摩藩士の子で、1863年の英国艦隊による鹿児島砲撃を少年として生き延びた。この経験が早くから、日本には独自の近代海軍が要ると彼に確信させたと言われる。",
  ),
  q(
    3,
    "The Battle of Tsushima, a decisive Russo-Japanese War naval victory in 1905, was fought near an island belonging to which Kyūshū prefecture?|La batalla de Tsushima, una decisiva victoria naval japonesa en la guerra ruso-japonesa de 1905, se libró cerca de una isla perteneciente a qué prefectura de Kyūshū?|La bataille de Tsushima, victoire navale décisive de la guerre russo-japonaise en 1905, se déroula près d'une île appartenant à quelle préfecture du Kyūshū ?|1905年、日露戦争を決した対馬沖の海戦が戦われたのは、九州のどの県に属する島の近くか?",
    ["Nagasaki|Nagasaki|Nagasaki|長崎県", "Fukuoka|Fukuoka|Fukuoka|福岡県", "Ōita|Ōita|Ōita|大分県"],
    0,
    "Japan's near-total destruction of the Russian Baltic Fleet in the strait off Tsushima was the first time in the modern era that an Asian navy had decisively defeated a major European power at sea.|La destrucción casi total japonesa de la flota rusa del Báltico en el estrecho frente a Tsushima fue la primera vez en la era moderna que una armada asiática derrotaba de forma decisiva en el mar a una gran potencia europea.|La destruction quasi totale, par le Japon, de la flotte russe de la Baltique dans le détroit au large de Tsushima fut la première fois, à l'époque moderne, qu'une marine asiatique battait de façon décisive en mer une grande puissance européenne.|対馬沖の海峡でロシアのバルチック艦隊をほぼ壊滅させたこの海戦は、近代においてアジアの海軍が海上でヨーロッパの大国を決定的に打ち破った初めての例だった。",
  ),
  q(
    9,
    "The Imperial Japanese Navy battleship Musashi, one of the largest battleships ever built, was constructed in near-total secrecy at a shipyard in which Kyūshū city?|El acorazado imperial japonés Musashi, uno de los mayores acorazados jamás construidos, se construyó en casi total secreto en un astillero de qué ciudad de Kyūshū?|Le cuirassé impérial japonais Musashi, l'un des plus grands cuirassés jamais construits, fut bâti dans un secret quasi total dans un chantier naval de quelle ville du Kyūshū ?|かつて建造された中でも最大級の戦艦・武蔵が、九州のどの都市の造船所でほぼ完全な秘匿のもと建造されたか?",
    ["Nagasaki|Nagasaki|Nagasaki|長崎", "Sasebo|Sasebo|Sasebo|佐世保", "Kagoshima|Kagoshima|Kagoshima|鹿児島"],
    0,
    "Workers at the Mitsubishi shipyard strung enormous curtains of rope screening around the hull and evacuated nearby residents during construction to keep the ship's existence hidden even from most of the city around it.|Los trabajadores del astillero Mitsubishi tendieron enormes cortinas de cuerda alrededor del casco y evacuaron a los vecinos cercanos durante la construcción para ocultar la existencia del buque incluso a la mayor parte de la ciudad que lo rodeaba.|Les ouvriers du chantier Mitsubishi tendirent d'immenses rideaux de corde autour de la coque et évacuèrent les riverains pendant la construction, afin de cacher l'existence du navire même à la majeure partie de la ville alentour.|三菱の造船所の労働者たちは船体の周りに縄で編んだ巨大な目隠しを張り巡らせ、建造中は近隣住民を避難させた。周囲の街のほとんどにさえ、その存在を隠すためである。",
  ),

  // ==================== 方言・食・工芸 ====================
  q(
    2,
    "Tonkotsu ramen, a rich pork-bone broth style now served worldwide, is most closely associated with which Kyūshū city?|El ramen tonkotsu, un caldo espeso de hueso de cerdo hoy servido en todo el mundo, se asocia sobre todo con qué ciudad de Kyūshū?|Le ramen tonkotsu, un bouillon riche à base d'os de porc aujourd'hui servi dans le monde entier, est surtout associé à quelle ville du Kyūshū ?|世界中で出されるようになった濃厚な豚骨スープのラーメンは、九州のどの都市と最も結びつけられる?",
    ["Fukuoka|Fukuoka|Fukuoka|福岡", "Nagasaki|Nagasaki|Nagasaki|長崎", "Kumamoto|Kumamoto|Kumamoto|熊本"],
    0,
    "The style is said to have been perfected in the 1930s and spread through Fukuoka's yatai food-stall culture, where a small bowl and a request for extra noodles, kaedama, became the standard order.|Se dice que el estilo se perfeccionó en la década de 1930 y se difundió por la cultura de puestos yatai de Fukuoka, donde un bol pequeño y una ración extra de fideos, kaedama, se volvieron el pedido habitual.|Le style se serait perfectionné dans les années 1930 et répandu par la culture des échoppes yatai de Fukuoka, où un petit bol et une portion supplémentaire de nouilles, kaedama, devinrent la commande standard.|この様式は1930年代に洗練され、福岡の屋台文化とともに広まったとされる。小ぶりの丼に「替え玉」で麺だけ足す注文の仕方が、そこで定番になった。",
  ),
  q(
    4,
    "The rich, sweet sponge cake called kasutera, a Nagasaki specialty, takes its name from which European kingdom?|El bizcocho rico y dulce llamado kasutera, especialidad de Nagasaki, toma su nombre de qué reino europeo?|Le gâteau moelleux et sucré appelé kasutera, spécialité de Nagasaki, tire son nom de quel royaume européen ?|長崎名物の甘いカステラという名は、どのヨーロッパの王国に由来する?",
    ["Castile|Castilla|Castille|カスティーリャ", "Portugal proper|Portugal propiamente dicho|Le Portugal proprement dit|ポルトガル本国", "The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ"],
    0,
    "Portuguese traders introduced the cake in the 16th century as pão de Castela, \"bread of Castile\", and Nagasaki bakers gradually dropped the wheat crust and refined it into the plain, custardy loaf sold today.|Comerciantes portugueses introdujeron el bizcocho en el siglo XVI como pão de Castela, «pan de Castilla», y los reposteros de Nagasaki fueron eliminando la corteza de trigo hasta convertirlo en el pan liso y cremoso que se vende hoy.|Des marchands portugais introduisirent le gâteau au XVIe siècle sous le nom de pão de Castela, « pain de Castille », et les pâtissiers de Nagasaki en retirèrent peu à peu la croûte de blé pour en faire le pain lisse et onctueux vendu aujourd'hui.|16世紀、ポルトガル商人が「カスティーリャのパン」を意味するパン・デ・カステラとしてこの菓子を伝え、長崎の菓子職人が徐々に小麦の皮を取り除いて、今売られている滑らかで卵の風味豊かな一本へと洗練させた。",
  ),
  q(
    6,
    "Which two Kyūshū pottery traditions are both famous, but for opposite reasons — one for its plain, understated tea-ceremony ware and one for elaborate gold-decorated export pieces?|¿Qué dos tradiciones alfareras de Kyūshū son célebres, pero por razones opuestas: una por su loza sencilla y sobria de ceremonia del té, y otra por sus piezas de exportación con elaborada decoración dorada?|Quelles deux traditions de poterie du Kyūshū sont célèbres, mais pour des raisons opposées — l'une pour sa vaisselle sobre de cérémonie du thé, l'autre pour ses pièces d'exportation richement décorées d'or ?|九州の二つの焼き物の伝統は、対照的な理由でそれぞれ知られている。一方は簡素で控えめな茶陶、もう一方は金彩の華やかな輸出向けの器である。それぞれ何焼?",
    ["Karatsu ware and Satsuma ware|Loza Karatsu y loza Satsuma|Poterie de Karatsu et poterie de Satsuma|唐津焼と薩摩焼", "Arita ware and Imari ware|Loza Arita y loza Imari|Poterie d'Arita et poterie d'Imari|有田焼と伊万里焼", "Hagi ware and Kutani ware|Loza Hagi y loza Kutani|Poterie de Hagi et poterie de Kutani|萩焼と九谷焼"],
    0,
    "Karatsu ware favours rough, muted glazes prized by tea masters for their humility, while Satsuma ware — developed by Korean potters brought to Kagoshima — became famous in the West for cream-coloured pieces covered in gold filigree.|La loza Karatsu favorece esmaltes ásperos y apagados apreciados por los maestros del té por su humildad, mientras que la loza Satsuma —desarrollada por alfareros coreanos llevados a Kagoshima— se hizo famosa en Occidente por piezas de color crema cubiertas de filigrana dorada.|La poterie de Karatsu privilégie des glaçures rugueuses et sourdes, prisées des maîtres de thé pour leur humilité, tandis que la poterie de Satsuma — développée par des potiers coréens amenés à Kagoshima — devint célèbre en Occident pour ses pièces couleur crème couvertes de filigrane doré.|唐津焼は、茶人にその慎ましさを愛された荒く渋い釉薬を特徴とする。一方、薩摩へ連れて来られた朝鮮人陶工が興した薩摩焼は、金の細密画で覆われたクリーム色の器で欧米に名を馳せた。",
  ),
  q(
    5,
    "Kurume gasuri, a traditional indigo-dyed cotton cloth with a distinctive splashed pattern, comes from which Kyūshū city?|El kurume gasuri, una tela tradicional de algodón teñida de índigo con un característico dibujo salpicado, procede de qué ciudad de Kyūshū?|Le kurume gasuri, une toile de coton traditionnelle teinte à l'indigo au motif éclaboussé caractéristique, vient de quelle ville du Kyūshū ?|藍染めで独特のかすり模様を持つ伝統の綿織物・久留米絣は、九州のどの都市に由来する?",
    ["Kurume|Kurume|Kurume|久留米", "Yame|Yame|Yame|八女", "Ōmuta|Ōmuta|Ōmuta|大牟田"],
    0,
    "The technique is said to have been invented around 1800 by a teenage girl who noticed how sun-faded patches in old indigo cloth formed patterns, and worked out how to bind and dye thread to reproduce the effect deliberately.|Se dice que la técnica la inventó hacia 1800 una adolescente que notó cómo los desteñidos del sol en telas viejas de índigo formaban dibujos, y averiguó cómo atar y teñir el hilo para reproducir el efecto a propósito.|La technique aurait été inventée vers 1800 par une adolescente qui remarqua comment les taches décolorées par le soleil sur de vieux tissus indigo formaient des motifs, et découvrit comment lier et teindre le fil pour reproduire l'effet à dessein.|この技法は1800年頃、古い藍染めの布に日焼けでできた模様に気づいた少女が考案したとされる。彼女は糸を括ってから染めることで、その効果をわざと再現する方法を編み出した。",
  ),
  q(
    7,
    "The Kagoshima dialect, Satsuma-ben, is famously hard for other Japanese speakers to understand. During the turbulent 1860s, what practical use did this reportedly serve for Satsuma domain?|El dialecto de Kagoshima, satsuma-ben, es célebre por ser difícil de entender para otros hablantes de japonés. Durante la turbulenta década de 1860, ¿qué uso práctico se dice que tuvo esto para el dominio de Satsuma?|Le dialecte de Kagoshima, le satsuma-ben, est réputé difficile à comprendre pour les autres locuteurs japonais. Durant les années 1860 tumultueuses, quelle utilité pratique cela aurait-il eue pour le domaine de Satsuma ?|鹿児島の方言・薩摩弁は、他地域の日本語話者には理解しづらいことで知られる。動乱の1860年代、これが薩摩藩にとって実際にどう役立ったとされる?",
    ["It made messages hard for outsiders and spies to understand|Hacía difícil que forasteros y espías entendieran los mensajes|Il rendait les messages difficiles à comprendre pour les étrangers et les espions|よそ者や間者に伝令の中身を理解されにくくした", "It was used to negotiate directly with Dutch traders|Se usaba para negociar directamente con comerciantes neerlandeses|Il servait à négocier directement avec les marchands néerlandais|オランダ商人と直接交渉するのに使われた", "It became the official language of the new Meiji government|Se convirtió en el idioma oficial del nuevo gobierno Meiji|Il devint la langue officielle du nouveau gouvernement Meiji|新政府の公用語になった"],
    0,
    "The dialect's heavy contractions and distinct vocabulary are said to have functioned as a natural safeguard against eavesdroppers during the domain's secretive dealings in the years before the Meiji Restoration.|Se dice que las fuertes contracciones y el vocabulario propio del dialecto funcionaron como una salvaguarda natural contra oyentes indiscretos durante los tratos secretos del dominio en los años previos a la Restauración Meiji.|Les fortes contractions et le vocabulaire propre du dialecte auraient fonctionné comme une protection naturelle contre les oreilles indiscrètes durant les tractations secrètes du domaine dans les années précédant la restauration Meiji.|強い音の縮約と独自の語彙を持つこの方言は、明治維新前夜、藩の秘密のやり取りを盗み聞きから自然に守る働きをしたと言われている。",
  ),
  q(
    7,
    "Karashi renkon, deep-fried lotus root stuffed with spicy mustard and miso, is a specialty most associated with which Kyūshū prefecture?|El karashi renkon, raíz de loto rellena de mostaza picante y miso y frita, es una especialidad asociada sobre todo a qué prefectura de Kyūshū?|Le karashi renkon, racine de lotus frite fourrée de moutarde épicée et de miso, est une spécialité surtout associée à quelle préfecture du Kyūshū ?|辛子とみそを詰めて揚げたれんこん料理・辛子蓮根は、九州のどの県と最も結びつけられる?",
    ["Kumamoto|Kumamoto|Kumamoto|熊本県", "Saga|Saga|Saga|佐賀県", "Miyazaki|Miyazaki|Miyazaki|宮崎県"],
    0,
    "The dish is said to have been created for an ailing Edo-period lord of the Hosokawa clan as a fortifying food, using lotus root grown in the moats around Kumamoto Castle.|Se dice que el plato se creó para un señor enfermo del clan Hosokawa en el período Edo, como alimento fortificante, usando raíz de loto cultivada en los fosos del castillo de Kumamoto.|Le plat aurait été créé pour un seigneur malade du clan Hosokawa à l'époque d'Edo, comme aliment fortifiant, à partir de racine de lotus cultivée dans les douves du château de Kumamoto.|この料理は江戸期、病弱だった細川家の藩主のための滋養食として考案されたとされ、熊本城の堀で育ったれんこんが使われた。",
  ),
  q(
    9,
    "Kagoshima is Japan's leading producer of which farmed fish, prized as a delicacy and grown in coastal net pens across the prefecture?|Kagoshima es el principal productor japonés de qué pez de piscicultura, apreciado como manjar y criado en jaulas costeras por toda la prefectura?|Kagoshima est le premier producteur japonais de quel poisson d'élevage, prisé comme mets fin et élevé en cages côtières dans toute la préfecture ?|鹿児島は、珍味として珍重され県内各地の海面いけすで育てられる養殖魚で、日本一の生産量を誇る。何の魚?",
    ["Freshwater eel (unagi)|Anguila de agua dulce (unagi)|L'anguille d'eau douce (unagi)|うなぎ", "Bluefin tuna|Atún rojo|Le thon rouge|クロマグロ", "Salmon|Salmón|Le saumon|サケ"],
    0,
    "Kagoshima's warm groundwater and coastal ponds make it the country's largest producer of farmed eel, an industry that grew after wild eel catches began declining nationwide in the late 20th century.|Las aguas subterráneas cálidas y los estanques costeros de Kagoshima la convierten en la mayor productora del país de anguila de piscicultura, una industria que creció al declinar las capturas silvestres a fines del siglo XX en todo el país.|Les eaux souterraines chaudes et les étangs côtiers de Kagoshima en font le plus grand producteur du pays d'anguille d'élevage, une industrie qui s'est développée après le déclin des prises sauvages à l'échelle nationale à la fin du XXe siècle.|鹿児島の温かい地下水と沿岸の養殖池は、この県を国内最大のうなぎ養殖地にしている。20世紀末以降、天然うなぎの漁獲が全国的に減る中で育った産業である。",
  ),
  q(
    3,
    "Which fruit, marketed nationally under the nickname \"egg of the sun\", is Miyazaki Prefecture particularly famous for growing?|¿Qué fruta, comercializada a nivel nacional bajo el apodo «huevo del sol», es especialmente famosa en la prefectura de Miyazaki?|Quel fruit, commercialisé dans tout le pays sous le surnom d'« œuf du soleil », la préfecture de Miyazaki est-elle particulièrement réputée pour cultiver ?|「太陽のたまご」の愛称で全国に売られる、宮崎県が特に有名な果物は?",
    ["Mango|Mango|Mangue|マンゴー", "Kiwifruit|Kiwi|Kiwi|キウイフルーツ", "Pineapple|Piña|Ananas|パイナップル"],
    0,
    "Only the ripest, heaviest fruit that fall naturally from the tree into a net rather than being cut early qualify for the top grade, which can sell for well over ¥10,000 a pair.|Solo la fruta más madura y pesada que cae del árbol de forma natural a una red, en vez de cortarse temprano, califica para la máxima categoría, que puede venderse por más de 10.000 yenes el par.|Seuls les fruits les plus mûrs et les plus lourds, tombés naturellement de l'arbre dans un filet plutôt que cueillis tôt, se qualifient pour la catégorie supérieure, vendue parfois plus de 10 000 yens la paire.|木から自然に熟して落ち、網で受け止められた最も重く熟した実だけが、早採りではなく最高等級に選ばれる。二玉で一万円を超えて売られることもある。",
  ),
  q(
    4,
    "The Kyūshū Grand Sumo Tournament, one of Japan's six annual professional sumo tournaments, is held every November in which city?|El torneo de gran sumo de Kyūshū, uno de los seis torneos profesionales anuales de Japón, se celebra cada noviembre en qué ciudad?|Le tournoi de grand sumo du Kyūshū, l'un des six tournois professionnels annuels du Japon, se tient chaque novembre dans quelle ville ?|日本の年6場所の大相撲本場所のひとつ、九州場所は毎年11月にどの都市で開かれる?",
    ["Fukuoka|Fukuoka|Fukuoka|福岡", "Kumamoto|Kumamoto|Kumamoto|熊本", "Kagoshima|Kagoshima|Kagoshima|鹿児島"],
    0,
    "The Kyūshū tournament is the youngest of the six, added to the calendar only in 1957, more than a decade after the other five regional tournaments were fixed in place.|El torneo de Kyūshū es el más joven de los seis, añadido al calendario recién en 1957, más de una década después de que los otros cinco torneos regionales quedaran fijados.|Le tournoi du Kyūshū est le plus récent des six, ajouté au calendrier seulement en 1957, plus d'une décennie après la fixation des cinq autres tournois régionaux.|九州場所は六場所の中でいちばん新しく、他の五場所が定着してから十年以上たった1957年になってようやく加わった。",
  ),
  q(
    8,
    "In 2015, which Kyūshū nuclear power plant became the first in Japan to restart after the nationwide shutdown following the 2011 Fukushima disaster?|En 2015, ¿qué central nuclear de Kyūshū fue la primera de Japón en reiniciarse tras el cierre nacional que siguió al desastre de Fukushima de 2011?|En 2015, quelle centrale nucléaire du Kyūshū fut la première du Japon à redémarrer après l'arrêt national consécutif à la catastrophe de Fukushima en 2011 ?|2011年の福島の事故後の全国的な停止を経て、2015年に日本で最初に再稼働した原子力発電所は九州のどこにある?",
    ["Sendai Nuclear Power Plant, Kagoshima|Central nuclear de Sendai, Kagoshima|Centrale nucléaire de Sendai, Kagoshima|鹿児島県の川内原子力発電所", "Genkai Nuclear Power Plant, Saga|Central nuclear de Genkai, Saga|Centrale nucléaire de Genkai, Saga|佐賀県の玄海原子力発電所", "Ikata Nuclear Power Plant, Ehime|Central nuclear de Ikata, Ehime|Centrale nucléaire d'Ikata, Ehime|愛媛県の伊方原子力発電所"],
    0,
    "The restart came under new, stricter safety standards introduced after the Fukushima accident, and drew protests from residents even though the plant is on Kyūshū's opposite coast from any of Japan's major fault-line disasters.|El reinicio se hizo bajo nuevas normas de seguridad más estrictas, introducidas tras el accidente de Fukushima, y provocó protestas vecinales aunque la planta está en la costa opuesta de Kyūshū a cualquiera de los grandes desastres sísmicos de Japón.|Le redémarrage eut lieu sous de nouvelles normes de sécurité plus strictes, introduites après l'accident de Fukushima, et suscita des protestations de riverains bien que la centrale se trouve sur la côte du Kyūshū opposée aux grandes catastrophes sismiques du Japon.|再稼働は福島の事故後に導入されたより厳しい新基準のもとで行われ、九州の反対側の海岸にあるにもかかわらず住民の抗議を招いた。",
  ),
  q(
    9,
    "Which Kyūshū prefecture became home to Japan's first major overseas-built advanced semiconductor fab, opened by Taiwan's TSMC in 2024?|¿Qué prefectura de Kyūshū acogió la primera gran fábrica de semiconductores avanzados construida en Japón por una empresa extranjera, abierta por la taiwanesa TSMC en 2024?|Quelle préfecture du Kyūshū a accueilli la première grande usine de semi-conducteurs avancés construite au Japon par une entreprise étrangère, ouverte par la taïwanaise TSMC en 2024 ?|台湾のTSMCが2024年に開いた、外国企業による日本初の大規模な先端半導体工場は九州のどの県にあるか?",
    ["Kumamoto|Kumamoto|Kumamoto|熊本県", "Fukuoka|Fukuoka|Fukuoka|福岡県", "Ōita|Ōita|Ōita|大分県"],
    0,
    "The plant revived a nickname from the 1980s, when Kyūshū's cluster of chip factories first earned it the label \"Silicon Island\", after decades in which much of that earlier industry had declined or moved overseas.|La planta revivió un apodo de la década de 1980, cuando el conjunto de fábricas de chips de Kyūshū le valió por primera vez el apelativo «Isla de Silicio», tras décadas en que buena parte de esa industria anterior había declinado o se había trasladado al extranjero.|L'usine a ravivé un surnom des années 1980, lorsque le groupement d'usines de puces du Kyūshū lui valut pour la première fois le surnom d'« île de Silicium », après des décennies où une bonne part de cette industrie plus ancienne avait décliné ou délocalisé.|この工場は1980年代、九州の半導体工場の集積が「シリコンアイランド」と呼ばれた頃のあだ名を復活させた。その後、かつての産業の多くは衰退するか海外へ移っていた。",
  ),
  q(
    5,
    "Fukuoka Airport is unusual among major Japanese airports for what reason?|¿Por qué el aeropuerto de Fukuoka es poco común entre los grandes aeropuertos japoneses?|Pourquoi l'aéroport de Fukuoka est-il inhabituel parmi les grands aéroports japonais ?|福岡空港が日本の主要空港の中で珍しいのはなぜ?",
    ["It sits only a few subway stops from the city centre|Está a solo unas pocas paradas de metro del centro de la ciudad|Il se trouve à seulement quelques stations de métro du centre-ville|地下鉄でわずか数駅の距離に市の中心部がある", "It has no domestic flights, only international ones|No tiene vuelos nacionales, solo internacionales|Il n'a aucun vol intérieur, seulement des vols internationaux|国内線が無く国際線のみである", "It is built entirely on reclaimed land offshore|Está construido totalmente en tierra ganada al mar, mar adentro|Il est entièrement construit sur des terres gagnées sur la mer, au large|沖合の埋立地に丸ごと造られている"],
    0,
    "The subway ride from Hakata Station to the terminal takes about eleven minutes, making Fukuoka one of the most centrally located major airports of any city in the world.|El trayecto en metro desde la estación de Hakata hasta la terminal dura unos once minutos, lo que hace de Fukuoka uno de los aeropuertos principales más céntricos del mundo respecto a su ciudad.|Le trajet en métro depuis la gare de Hakata jusqu'au terminal prend environ onze minutes, ce qui fait de Fukuoka l'un des grands aéroports les plus proches du centre-ville au monde.|博多駅からターミナルまで地下鉄でおよそ十一分。福岡空港は、世界の主要空港の中でも屈指の街なかに近い空港である。",
  ),

  // ==================== 常識で解ける・基本の地理 ====================
  q(
    1,
    "Sakurajima, the volcano rising out of Kagoshima Bay, is what kind of natural feature?|El Sakurajima, el volcán que se alza en la bahía de Kagoshima, ¿qué tipo de accidente natural es?|Le Sakurajima, le volcan qui s'élève dans la baie de Kagoshima, quel type de relief est-ce ?|鹿児島湾にそびえる桜島は、どのような自然の地形か?",
    ["An active volcano|Un volcán activo|Un volcan actif|活火山", "A coral atoll|Un atolón de coral|Un atoll de corail|サンゴ礁の環礁", "An extinct meteor crater|Un cráter de meteorito extinto|Un cratère de météorite éteint|隕石の落下跡"],
    0,
    "It erupts on most days of the year and is one of the most closely monitored volcanoes on Earth, with seismometers and cameras trained on it around the clock.|Entra en erupción casi a diario y es uno de los volcanes más vigilados del planeta, con sismógrafos y cámaras que lo observan las veinticuatro horas.|Il entre en éruption presque tous les jours et compte parmi les volcans les plus surveillés au monde, avec sismomètres et caméras braqués sur lui en permanence.|ほとんどの日に噴火しており、地球上でも指折り厳重に監視されている火山で、地震計とカメラが常時見張っている。",
  ),
  q(
    1,
    "Which of these is not one of Kyūshū's seven prefectures?|¿Cuál de estas no es una de las siete prefecturas de Kyūshū?|Laquelle de ces préfectures ne fait pas partie des sept du Kyūshū ?|次のうち、九州の七県に含まれないものは?",
    ["Ehime|Ehime|Ehime|愛媛県", "Ōita|Ōita|Ōita|大分県", "Miyazaki|Miyazaki|Miyazaki|宮崎県"],
    0,
    "Ehime is on Shikoku, the smallest of Japan's four main islands, reached from Kyūshū only by sea or by a long chain of bridges further east.|Ehime está en Shikoku, la más pequeña de las cuatro islas principales de Japón, a la que solo se llega desde Kyūshū por mar o por una larga cadena de puentes más al este.|Ehime se trouve sur Shikoku, la plus petite des quatre îles principales du Japon, à laquelle on n'accède depuis le Kyūshū que par la mer ou par une longue chaîne de ponts plus à l'est.|愛媛県は四国にある。日本の四主要島の中で最も小さいこの島へは、九州からは海路か、もっと東にある長い橋の連なりを経るしかない。",
  ),
  q(
    1,
    "Nagasaki was struck by the second atomic bomb used in warfare in which year?|¿En qué año Nagasaki fue alcanzada por la segunda bomba atómica usada en la guerra?|En quelle année Nagasaki fut-elle frappée par la seconde bombe atomique utilisée à la guerre ?|長崎に、戦争で使われた二発目の原子爆弾が投下されたのは何年?",
    ["1945|1945|1945|1945年", "1941|1941|1941|1941年", "1950|1950|1950|1950年"],
    0,
    "The bomb fell on 9 August 1945, three days after the first was dropped on Hiroshima; Japan announced its surrender less than a week later.|La bomba cayó el 9 de agosto de 1945, tres días después de que la primera cayera sobre Hiroshima; Japón anunció su rendición menos de una semana después.|La bombe tomba le 9 août 1945, trois jours après que la première fut larguée sur Hiroshima ; le Japon annonça sa capitulation moins d'une semaine plus tard.|原爆投下は1945年8月9日、広島への一発目からわずか3日後だった。日本の降伏発表は、その一週間後もかからなかった。",
  ),
  q(
    2,
    "Which of these three Kyūshū prefectures lies farthest north?|¿Cuál de estas tres prefecturas de Kyūshū está más al norte?|Laquelle de ces trois préfectures du Kyūshū se trouve la plus au nord ?|次の三県のうち、いちばん北にあるのは?",
    ["Fukuoka|Fukuoka|Fukuoka|福岡県", "Kumamoto|Kumamoto|Kumamoto|熊本県", "Kagoshima|Kagoshima|Kagoshima|鹿児島県"],
    0,
    "Fukuoka faces the Kanmon Strait and Honshū across it, making it the natural gateway prefecture for anyone entering Kyūshū over land.|Fukuoka mira al estrecho de Kanmon y a Honshū al otro lado, lo que la convierte en la prefectura de entrada natural para quien llega a Kyūshū por tierra.|Fukuoka fait face au détroit de Kanmon et à Honshū de l'autre côté, ce qui en fait la préfecture d'entrée naturelle pour qui rejoint le Kyūshū par voie terrestre.|福岡県は関門海峡を挟んで本州と向き合い、陸路で九州に入る者にとって自然な玄関口の県になっている。",
  ),
  q(
    2,
    "Beppu and Yufuin, two of Japan's best-known hot-spring resort towns, are both located in which Kyūshū prefecture?|Beppu y Yufuin, dos de los balnearios termales más conocidos de Japón, ¿en qué prefectura de Kyūshū se hallan ambos?|Beppu et Yufuin, deux des stations thermales les plus connues du Japon, se trouvent toutes deux dans quelle préfecture du Kyūshū ?|日本でも指折りの名高い温泉町、別府と湯布院はともに九州のどの県にある?",
    ["Ōita|Ōita|Ōita|大分県", "Kumamoto|Kumamoto|Kumamoto|熊本県", "Miyazaki|Miyazaki|Miyazaki|宮崎県"],
    0,
    "Ōita Prefecture produces more hot-spring water than any other in Japan, drawing on geothermal activity fed by the same volcanic systems that also power the region's Kujū and Aso mountains.|La prefectura de Ōita produce más agua termal que ninguna otra de Japón, alimentada por la misma actividad volcánica que también nutre los montes Kujū y Aso de la región.|La préfecture d'Ōita produit plus d'eau thermale qu'aucune autre au Japon, alimentée par l'activité géothermique des mêmes systèmes volcaniques qui animent aussi les monts Kujū et Aso de la région.|大分県は日本のどの県よりも多くの温泉湧出量を誇る。これは地域の九重連山や阿蘇山を育むのと同じ火山活動に支えられている。",
  ),
  q(
    3,
    "The word \"Kyūshū\" itself literally translates to what, referring to the region's historic nine ancient provinces?|La propia palabra «Kyūshū» significa literalmente qué, en referencia a las nueve antiguas provincias históricas de la región?|Le mot « Kyūshū » lui-même signifie littéralement quoi, en référence aux neuf anciennes provinces historiques de la région ?|「九州」という言葉自体は、この地方にかつてあった九つの令制国にちなみ、文字どおりには何を意味する?",
    ["Nine provinces|Nueve provincias|Neuf provinces|九つの国", "Southern gate|Puerta del sur|Porte du sud|南の門", "Land of fire|Tierra de fuego|Terre de feu|火の国"],
    0,
    "The nine were Chikuzen, Chikugo, Buzen, Bungo, Hizen, Higo, Hyūga, Ōsumi and Satsuma; the name stuck even after Japan's modern prefectures replaced the old borders.|Las nueve eran Chikuzen, Chikugo, Buzen, Bungo, Hizen, Higo, Hyūga, Ōsumi y Satsuma; el nombre perduró incluso después de que las prefecturas modernas sustituyeran las viejas fronteras.|Les neuf étaient Chikuzen, Chikugo, Buzen, Bungo, Hizen, Higo, Hyūga, Ōsumi et Satsuma ; le nom demeura même après que les préfectures modernes eurent remplacé les anciennes frontières.|筑前・筑後・豊前・豊後・肥前・肥後・日向・大隅・薩摩の九国である。近代の県が古い国境に取って代わった後も、この呼び名だけは残った。",
  ),
  q(
    3,
    "Which prefecture is responsible for administering the remote islands of Yakushima and Tanegashima, off Kyūshū's southern tip?|¿Qué prefectura administra las islas remotas de Yakushima y Tanegashima, frente a la punta sur de Kyūshū?|Quelle préfecture administre les îles isolées de Yakushima et Tanegashima, au large de la pointe sud du Kyūshū ?|九州最南端沖の離島、屋久島と種子島を管轄する県は?",
    ["Kagoshima|Kagoshima|Kagoshima|鹿児島県", "Miyazaki|Miyazaki|Miyazaki|宮崎県", "Kumamoto|Kumamoto|Kumamoto|熊本県"],
    0,
    "Both islands are reached by ferry or plane from Kagoshima port or airport, and both, along with dozens of smaller islands, fall under Kagoshima Prefecture's jurisdiction.|Ambas islas se alcanzan en ferry o avión desde el puerto o el aeropuerto de Kagoshima, y ambas, junto con decenas de islas menores, caen bajo la jurisdicción de la prefectura de Kagoshima.|Les deux îles s'atteignent en ferry ou en avion depuis le port ou l'aéroport de Kagoshima, et toutes deux, avec des dizaines d'îles plus petites, relèvent de la juridiction de la préfecture de Kagoshima.|両島とも鹿児島の港や空港からフェリーや飛行機で渡り、ほかの数十の小島とともに鹿児島県の管轄下にある。",
  ),
  q(
    2,
    "The Kyūshū Shinkansen bullet-train line runs from Hakata in Fukuoka to which city at its southern end?|La línea de tren bala Kyūshū Shinkansen va desde Hakata, en Fukuoka, hasta qué ciudad en su extremo sur?|La ligne à grande vitesse Kyūshū Shinkansen relie Hakata, à Fukuoka, à quelle ville à son extrémité sud ?|九州新幹線は博多からどの都市までを結んでいる?",
    ["Kagoshima|Kagoshima|Kagoshima|鹿児島", "Miyazaki|Miyazaki|Miyazaki|宮崎", "Ōita|Ōita|Ōita|大分"],
    0,
    "The line's southern terminus, Kagoshima-Chūō, sits close enough to the bay that passengers stepping off the platform can often see Sakurajima smoking across the water.|La terminal sur de la línea, Kagoshima-Chūō, está tan cerca de la bahía que los pasajeros que bajan del andén suelen ver al Sakurajima humeando al otro lado del agua.|Le terminus sud de la ligne, Kagoshima-Chūō, est si proche de la baie que les passagers descendant du quai peuvent souvent voir le Sakurajima fumer de l'autre côté de l'eau.|路線の南端・鹿児島中央駅は湾のすぐ近くにあり、ホームに降りた乗客はしばしば水面越しに煙を上げる桜島を目にする。",
  ),
  q(
    2,
    "Shōchū, a distilled spirit strongly associated with southern Kyūshū, differs from sake mainly in what way?|El shōchū, un licor destilado muy asociado al sur de Kyūshū, ¿en qué se diferencia principalmente del sake?|Le shōchū, un alcool distillé fortement associé au sud du Kyūshū, diffère principalement du saké en quoi ?|南九州と強く結びつく蒸留酒・焼酎は、日本酒と主にどう違う?",
    ["Shōchū is distilled, while sake is brewed|El shōchū se destila, mientras que el sake se fermenta|Le shōchū est distillé, tandis que le saké est brassé|焼酎は蒸留酒だが、日本酒は醸造酒である", "Shōchū is always sweeter than sake|El shōchū siempre es más dulce que el sake|Le shōchū est toujours plus sucré que le saké|焼酎は必ず日本酒より甘い", "Shōchū contains no alcohol|El shōchū no contiene alcohol|Le shōchū ne contient pas d'alcool|焼酎にはアルコールが含まれない"],
    0,
    "Because it is distilled rather than simply fermented, shōchū can be made from a wide range of starting ingredients — sweet potato, barley, rice or buckwheat all being common across different parts of Kyūshū.|Al destilarse en vez de solo fermentarse, el shōchū puede elaborarse a partir de una amplia gama de ingredientes: boniato, cebada, arroz o trigo sarraceno, todos comunes en distintas partes de Kyūshū.|Étant distillé plutôt que simplement fermenté, le shōchū peut être fait à partir d'une large gamme d'ingrédients de départ — patate douce, orge, riz ou sarrasin, tous courants dans différentes régions du Kyūshū.|単に発酵させるだけの日本酒と違い蒸留するため、焼酎はさつまいも・麦・米・そばなど、九州内の地域ごとに異なる幅広い原料から作ることができる。",
  ),

  // ==================== 近現代・自然・産業(踏み込んだ知識) ====================
  q(
    9,
    "Amami Ōshima, an island belonging to Kagoshima Prefecture, is home to a rare rabbit species sometimes called a \"living fossil\". What is it called?|Amami Ōshima, isla de la prefectura de Kagoshima, alberga una rara especie de conejo a veces llamada «fósil viviente». ¿Cómo se llama?|Amami Ōshima, île de la préfecture de Kagoshima, abrite une rare espèce de lapin parfois qualifiée de « fossile vivant ». Comment s'appelle-t-elle ?|鹿児島県に属する島、奄美大島には「生きた化石」とも呼ばれる珍しいウサギが生息する。何という?",
    ["The Amami rabbit|El conejo de Amami|Le lapin d'Amami|アマミノクロウサギ", "The Ōsumi hare|La liebre de Ōsumi|Le lièvre d'Ōsumi|オオスミノウサギ", "The Satsuma jackrabbit|La liebre saltarina de Satsuma|Le lièvre-lapin de Satsuma|サツマジャックウサギ"],
    0,
    "With short legs, small ears and thick claws for digging, the Amami rabbit resembles fossil rabbit species that went extinct elsewhere millions of years ago, having survived in isolation once its ancestors' island separated from the mainland.|Con patas cortas, orejas pequeñas y garras gruesas para excavar, el conejo de Amami se parece a especies fósiles de conejo extinguidas en otros lugares hace millones de años, habiendo sobrevivido aislado desde que la isla de sus ancestros se separó del continente.|Avec ses pattes courtes, ses petites oreilles et ses griffes épaisses pour creuser, le lapin d'Amami ressemble à des espèces fossiles de lapins éteintes ailleurs il y a des millions d'années, ayant survécu isolé depuis que l'île de ses ancêtres se sépara du continent.|短い脚、小さな耳、掘るための太い爪を持つアマミノクロウサギは、何百万年も前に他の地域で絶滅した化石種のウサギに似ている。祖先の島が大陸から切り離されて以来、隔絶された中で生き延びてきた。",
  ),
  q(
    9,
    "In 2013, JR Kyūshū launched Nanatsuboshi in Kyūshū, one of Japan's first ultra-luxury multi-day sleeper cruise trains. What does the train's name mean?|En 2013, JR Kyūshū lanzó el Nanatsuboshi in Kyūshū, uno de los primeros trenes de lujo de varios días de Japón. ¿Qué significa el nombre del tren?|En 2013, JR Kyūshū lança le Nanatsuboshi in Kyūshū, l'un des premiers trains-hôtels de luxe de plusieurs jours du Japon. Que signifie le nom du train ?|2013年、JR九州は日本初期の超豪華な数日がかりの寝台周遊列車の一つ「ななつ星in九州」を走らせ始めた。この列車名は何を意味する?",
    ["Seven stars|Siete estrellas|Sept étoiles|七つ星", "Golden dragon|Dragón dorado|Dragon d'or|金龍", "Southern wind|Viento del sur|Vent du sud|南風"],
    0,
    "The seven stars stand for Kyūshū's seven prefectures and, separately, for seven features the operator considered essential to the journey, from the train itself to the food and the routes chosen.|Las siete estrellas representan las siete prefecturas de Kyūshū y, aparte, siete elementos que el operador consideró esenciales para el viaje, desde el propio tren hasta la comida y las rutas elegidas.|Les sept étoiles représentent les sept préfectures du Kyūshū et, séparément, sept éléments que l'exploitant jugeait essentiels au voyage, du train lui-même à la nourriture et aux itinéraires choisis.|七つの星は九州の七県を表すと同時に、運行会社が旅に不可欠と考えた七つの要素——列車そのものから食事、選ばれた経路まで——も表している。",
  ),
  q(
    10,
    "In 2016, JR Kyūshū became notable among Japan's regional railway companies for what financial milestone?|En 2016, JR Kyūshū destacó entre las compañías ferroviarias regionales de Japón por qué hito financiero?|En 2016, JR Kyūshū s'est distinguée parmi les compagnies ferroviaires régionales du Japon par quel jalon financier ?|2016年、JR九州は日本の地域鉄道会社の中でどんな財務上の節目によって注目された?",
    [
      "It listed its shares on the stock exchange|Cotizó sus acciones en bolsa|Elle fit coter ses actions en bourse|株式を証券取引所に上場した",
      "It became fully owned by a foreign investor|Pasó a ser propiedad total de un inversor extranjero|Elle devint entièrement détenue par un investisseur étranger|外国の投資家に全株を保有された",
      "It stopped running any shinkansen services|Dejó de operar todo servicio de shinkansen|Elle cessa d'exploiter tout service de shinkansen|新幹線の運行をすべてやめた",
    ],
    0,
    "Along with JR East, Central and West, JR Kyūshū was one of the JR companies formed from the 1987 breakup of the state railway to eventually go public, a step the two JR companies serving Hokkaidō and Shikoku have not managed.|Junto con JR East, Central y West, JR Kyūshū fue una de las compañías JR nacidas de la escisión de 1987 del ferrocarril estatal que acabó saliendo a bolsa, un paso que las dos JR de Hokkaidō y Shikoku no han logrado dar.|Avec JR East, Central et West, JR Kyūshū fut l'une des compagnies JR issues de l'éclatement de 1987 du chemin de fer national à finalement entrer en bourse, une étape que les deux compagnies JR desservant Hokkaidō et Shikoku n'ont pas franchie.|JR東日本・東海・西日本とともに、JR九州は1987年の国鉄分割民営化で生まれたJR各社のうち株式上場を果たした一社となった。北海道・四国のJR2社はいまだこの段階に至っていない。",
  ),

  // ==================== 信仰・工芸・現代の暮らし ====================
  q(
    8,
    "Usa Jingū, a shrine in Ōita Prefecture, holds what special status among Japan's tens of thousands of Shinto shrines?|El santuario Usa Jingū, en la prefectura de Ōita, ¿qué estatus especial ocupa entre las decenas de miles de santuarios sintoístas de Japón?|Le sanctuaire Usa Jingū, en préfecture d'Ōita, occupe quel statut particulier parmi les dizaines de milliers de sanctuaires shinto du Japon ?|大分県の宇佐神宮は、日本の何万もの神社の中でどのような特別な位置づけを持つ?",
    ["It is the head shrine of all Hachiman shrines nationwide|Es el santuario principal de todos los santuarios Hachiman del país|Il est le sanctuaire principal de tous les sanctuaires Hachiman du pays|全国の八幡宮の総本宮である", "It is the only shrine allowed to hold a full-time Buddhist monk|Es el único santuario donde puede residir un monje budista a tiempo completo|C'est le seul sanctuaire autorisé à héberger un moine bouddhiste à plein temps|専従の僧侶が常駐できる唯一の神社である", "It is the newest major shrine, built after 1950|Es el santuario mayor más reciente, construido después de 1950|C'est le plus récent grand sanctuaire, bâti après 1950|1950年以降に建てられた最も新しい大社である"],
    0,
    "Roughly 44,000 Hachiman shrines across Japan trace their lineage back to Usa Jingū, making it one of the most influential single shrines in the entire Shinto tradition despite being far less famous abroad than Ise or Izumo.|Cerca de 44.000 santuarios Hachiman en todo Japón remontan su linaje a Usa Jingū, lo que lo convierte en uno de los santuarios individuales más influyentes de toda la tradición sintoísta, pese a ser mucho menos conocido fuera de Japón que Ise o Izumo.|Environ 44 000 sanctuaires Hachiman à travers le Japon font remonter leur lignée à Usa Jingū, en faisant l'un des sanctuaires les plus influents de toute la tradition shinto, bien que bien moins connu à l'étranger qu'Ise ou Izumo.|全国およそ4万4千の八幡宮は、その系譜を宇佐神宮にたどる。伊勢や出雲ほど海外では知られていないが、神道の伝統全体の中でも指折り影響力の大きい一社である。",
  ),
  q(
    8,
    "The Kunisaki Peninsula in Ōita Prefecture is known for a distinctive local culture, Rokugō Manzan, that blends Buddhism with what other tradition?|La península de Kunisaki, en la prefectura de Ōita, es conocida por una cultura local particular, Rokugō Manzan, que mezcla el budismo con qué otra tradición?|La péninsule de Kunisaki, en préfecture d'Ōita, est connue pour une culture locale particulière, le Rokugō Manzan, qui mêle le bouddhisme à quelle autre tradition ?|大分県の国東半島は、仏教と何を融合させた独特の地域文化「六郷満山」で知られる?",
    ["Mountain-worship Shinto (Shugendō)|El sintoísmo de culto a la montaña (Shugendō)|Le shinto de vénération des montagnes (Shugendō)|山岳信仰の神道(修験道)", "Confucian ancestor rites|Ritos confucianos a los antepasados|Les rites confucéens des ancêtres|儒教の祖先祭祀", "Dutch Reformed Christianity|El cristianismo reformado neerlandés|Le christianisme réformé néerlandais|オランダ改革派キリスト教"],
    0,
    "The peninsula's hillsides are dotted with stone Buddhas carved directly into cliff faces and small mountain temples reached by steep stone stairways, a landscape shaped by ascetic monks who treated the mountains themselves as sacred.|Las laderas de la península están salpicadas de budas de piedra tallados directamente en la roca y pequeños templos de montaña a los que se llega por empinadas escaleras de piedra, un paisaje moldeado por monjes ascetas que veneraban las propias montañas.|Les coteaux de la péninsule sont parsemés de bouddhas de pierre taillés à même la falaise et de petits temples de montagne accessibles par de raides escaliers de pierre, un paysage façonné par des moines ascètes qui vénéraient les montagnes elles-mêmes.|半島の斜面には崖に直接彫られた磨崖仏や、急な石段の先にある小さな山寺が点在する。山そのものを神聖視した修行僧たちが形作った景観である。",
  ),
  q(
    6,
    "Fukuoka's domed baseball stadium, opened in 1993 and now known as PayPay Dome, was notable in Japan for what feature?|El estadio de béisbol cubierto de Fukuoka, abierto en 1993 y hoy llamado PayPay Dome, era destacable en Japón por qué característica?|Le stade de baseball couvert de Fukuoka, ouvert en 1993 et aujourd'hui appelé PayPay Dome, se distinguait au Japon par quelle caractéristique ?|1993年に開場し、今はPayPayドームと呼ばれる福岡のドーム球場は、日本で何によって注目された?",
    ["Japan's first fully retractable dome roof|El primer techo de cúpula totalmente retráctil de Japón|Le premier toit de dôme entièrement rétractable du Japon|日本初の完全開閉式ドーム屋根", "It was built entirely underground|Se construyó enteramente bajo tierra|Il fut entièrement construit sous terre|地下にまるごと建設された", "It had no artificial lighting|No tenía iluminación artificial|Il n'avait aucun éclairage artificiel|人工照明が一切無かった"],
    0,
    "The stadium's roof can open in about twenty minutes, and it was built as the home of the Fukuoka Daiei Hawks, the team that had moved from Osaka and would later become the SoftBank Hawks.|El techo del estadio puede abrirse en unos veinte minutos, y se construyó como sede de los Fukuoka Daiei Hawks, el equipo que se había mudado de Osaka y más tarde sería los SoftBank Hawks.|Le toit du stade peut s'ouvrir en une vingtaine de minutes, et il fut construit comme domicile des Fukuoka Daiei Hawks, l'équipe venue d'Osaka qui deviendrait plus tard les SoftBank Hawks.|屋根はおよそ20分で開閉できる。この球場は大阪から移転してきた福岡ダイエーホークス、後のソフトバンクホークスの本拠地として建てられた。",
  ),
  q(
    7,
    "The Nishitetsu Lions, a professional baseball team once based in Fukuoka, relocated in 1978 and are known today under what name?|Los Nishitetsu Lions, un equipo profesional de béisbol antes con sede en Fukuoka, se trasladaron en 1978 y hoy se conocen bajo qué nombre?|Les Nishitetsu Lions, une équipe professionnelle de baseball autrefois basée à Fukuoka, déménagèrent en 1978 et sont connus aujourd'hui sous quel nom ?|かつて福岡を本拠地とした西鉄ライオンズは、1978年に本拠地を移し、今は何という名前で知られる?",
    ["The Seibu Lions|Los Seibu Lions|Les Seibu Lions|埼玉西武ライオンズ", "The Hiroshima Carp|Los Hiroshima Carp|Les Hiroshima Carp|広島東洋カープ", "The Chunichi Dragons|Los Chunichi Dragons|Les Chunichi Dragons|中日ドラゴンズ"],
    0,
    "The team's move to Saitama, near Tokyo, left Fukuoka without a professional baseball team for a decade, until the Nankai Hawks relocated from Osaka in 1988 and eventually became today's SoftBank Hawks.|El traslado del equipo a Saitama, cerca de Tokio, dejó a Fukuoka sin equipo profesional de béisbol durante una década, hasta que los Nankai Hawks se mudaron desde Osaka en 1988 y acabaron siendo los actuales SoftBank Hawks.|Le déménagement de l'équipe à Saitama, près de Tokyo, laissa Fukuoka sans équipe professionnelle de baseball pendant une décennie, jusqu'à ce que les Nankai Hawks s'y installent depuis Osaka en 1988 pour devenir les actuels SoftBank Hawks.|この球団の埼玉への移転で、福岡は十年ものあいだプロ野球チームを持たない街になった。1988年に大阪から南海ホークスが移転し、それが後のソフトバンクホークスになった。",
  ),
  q(
    8,
    "A magnitude-7.0 earthquake struck offshore from Fukuoka in March of which year, one of the strongest to hit a major Kyūshū city in recent memory?|Un terremoto de magnitud 7,0 sacudió la costa de Fukuoka en marzo de qué año, uno de los más fuertes en golpear una gran ciudad de Kyūshū en la memoria reciente?|Un séisme de magnitude 7,0 a frappé au large de Fukuoka en mars de quelle année, l'un des plus forts à toucher une grande ville du Kyūshū de mémoire récente ?|マグニチュード7.0の地震が福岡沖を襲ったのは何年の3月か。近年、九州の大都市を襲った地震としては最大級のものだった。",
    ["2005|2005|2005|2005年", "1995|1995|1995|1995年", "2011|2011|2011|2011年"],
    0,
    "The Fukuoka-ken Seihō-oki earthquake was centred near the small island of Genkai and, while less deadly than some other Japanese quakes, was a reminder that even Kyūshū's largest city, long thought relatively safe, sits on active faults.|El terremoto de Fukuoka-ken Seihō-oki se centró cerca de la pequeña isla de Genkai y, aunque menos mortífero que otros terremotos japoneses, recordó que incluso la mayor ciudad de Kyūshū, considerada relativamente segura, se asienta sobre fallas activas.|Le séisme de Fukuoka-ken Seihō-oki fut centré près de la petite île de Genkai et, bien que moins meurtrier que d'autres séismes japonais, rappela que même la plus grande ville du Kyūshū, longtemps jugée relativement sûre, repose sur des failles actives.|福岡県西方沖地震の震源は玄界島近くにあり、他の日本の地震ほど死者は多くなかったが、比較的安全とされてきた九州最大の都市も活断層の上にあることを思い出させた。",
  ),
  q(
    7,
    "Nagasaki Prefecture's population has been declining faster than almost anywhere else in Japan in recent decades, largely tied to the decline of which two older industries?|La población de la prefectura de Nagasaki ha caído más deprisa que en casi cualquier otro lugar de Japón en las últimas décadas, ligada en gran parte al declive de qué dos industrias más antiguas?|La population de la préfecture de Nagasaki a décliné plus vite que presque partout ailleurs au Japon ces dernières décennies, largement liée au déclin de quelles deux industries plus anciennes ?|近年、長崎県の人口は日本のほかのどこよりも速く減っている。これは主にどの二つの旧来産業の衰退と結びついている?",
    ["Shipbuilding and coal mining|Construcción naval y minería del carbón|Construction navale et extraction du charbon|造船業と石炭採掘業", "Silk weaving and rice farming|Tejido de seda y cultivo de arroz|Le tissage de la soie et la riziculture|絹織物業と稲作", "Whaling and salt production|Ballenería y producción de sal|La chasse à la baleine et la production de sel|捕鯨業と製塩業"],
    0,
    "As shipyards and coal mines that once employed tens of thousands closed one after another from the 1960s onward, younger workers left the prefecture's port towns for Fukuoka, Osaka and Tokyo in numbers the region has never fully recovered from.|Cuando los astilleros y minas de carbón que antes empleaban a decenas de miles cerraron uno tras otro desde la década de 1960, los trabajadores jóvenes abandonaron los pueblos portuarios de la prefectura hacia Fukuoka, Osaka y Tokio en cifras de las que la región nunca se ha recuperado del todo.|Quand les chantiers navals et les mines de charbon qui employaient jadis des dizaines de milliers de personnes fermèrent l'un après l'autre à partir des années 1960, les jeunes travailleurs quittèrent les villes portuaires de la préfecture pour Fukuoka, Osaka et Tokyo en nombre dont la région ne s'est jamais pleinement remise.|かつて何万人も雇っていた造船所や炭鉱が1960年代以降相次いで閉じると、若い働き手は県内の港町を離れ福岡・大阪・東京へ向かった。その人数から、この地方はいまだ完全には立ち直っていない。",
  ),
  q(
    6,
    "The waters off Amakusa, in Kumamoto Prefecture, are unusual in Japan for hosting a resident year-round population of what marine mammal?|Las aguas frente a Amakusa, en la prefectura de Kumamoto, son poco comunes en Japón por albergar una población residente todo el año de qué mamífero marino?|Les eaux au large d'Amakusa, en préfecture de Kumamoto, sont rares au Japon pour abriter une population résidente à l'année de quel mammifère marin ?|熊本県天草沖の海は、一年を通して定住する海洋哺乳類がいる点で日本では珍しい。何の動物か?",
    ["Wild bottlenose dolphins|Delfines mulares salvajes|Des grands dauphins sauvages|野生のバンドウイルカ", "Sea otters|Nutrias marinas|Des loutres de mer|ラッコ", "Harbour seals|Focas comunes|Des phoques communs|ゼニガタアザラシ"],
    0,
    "Most dolphin populations around Japan migrate seasonally, but a pod of several hundred bottlenose dolphins stays in the waters off Amakusa year-round, making boat-based sightings reliable in almost any month.|La mayoría de las poblaciones de delfines de Japón migran estacionalmente, pero un grupo de varios cientos de delfines mulares permanece frente a Amakusa todo el año, lo que hace fiables las excursiones de avistamiento en casi cualquier mes.|La plupart des populations de dauphins du Japon migrent selon les saisons, mais un groupe de plusieurs centaines de grands dauphins reste au large d'Amakusa toute l'année, rendant les sorties d'observation fiables presque tous les mois.|日本各地のイルカの多くは季節ごとに回遊するが、天草沖には数百頭規模のバンドウイルカの群れが一年じゅう留まっており、ほぼどの月でも船からの観察が期待できる。",
  ),
  q(
    4,
    "Beppu's famous \"hell tour\" (jigoku meguri) lets visitors walk between several natural pools of what?|El famoso «recorrido de los infiernos» (jigoku meguri) de Beppu permite a los visitantes caminar entre varias pozas naturales de qué?|Le célèbre « tour des enfers » (jigoku meguri) de Beppu permet aux visiteurs de marcher entre plusieurs bassins naturels de quoi ?|別府の有名な「地獄めぐり」では、訪れた人はいくつもの何の自然の池を巡り歩ける?",
    ["Boiling, mineral-coloured hot springs|Aguas termales hirvientes de colores minerales|Sources chaudes bouillantes aux couleurs minérales|沸き立つ鉱物色の温泉", "Volcanic ash-filled craters|Cráteres llenos de ceniza volcánica|Des cratères remplis de cendres volcaniques|火山灰に満ちた噴火口", "Freshwater eel breeding ponds|Estanques de cría de anguila de agua dulce|Des bassins d'élevage d'anguilles d'eau douce|うなぎの養殖池"],
    0,
    "Named \"hells\" for their fierce heat and otherworldly colours, the pools range from cobalt blue to blood red depending on the minerals dissolved in each one, and none of them are safe to bathe in.|Llamadas «infiernos» por su calor intenso y colores de otro mundo, las pozas van del azul cobalto al rojo sangre según los minerales disueltos en cada una, y en ninguna es seguro bañarse.|Baptisés « enfers » pour leur chaleur intense et leurs couleurs surnaturelles, les bassins vont du bleu cobalt au rouge sang selon les minéraux dissous dans chacun, et aucun n'est sûr pour s'y baigner.|激しい熱と現世離れした色から「地獄」と呼ばれるこれらの池は、含まれる鉱物によってコバルトブルーから血のような赤まで様々で、どれも入浴はできない。",
  ),
  q(
    5,
    "Dejima, the artificial island in Nagasaki harbour that once housed Dutch traders, was built in what distinctive shape?|Dejima, la isla artificial en el puerto de Nagasaki que albergó a los comerciantes neerlandeses, se construyó con qué forma característica?|Dejima, l'île artificielle du port de Nagasaki qui abritait jadis les marchands néerlandais, fut bâtie selon quelle forme caractéristique ?|かつてオランダ商人を住まわせた長崎港の人工島・出島は、どんな特徴的な形に造られた?",
    ["A fan shape|Forma de abanico|Une forme d'éventail|扇形", "A perfect circle|Un círculo perfecto|Un cercle parfait|正円形", "A five-pointed star|Una estrella de cinco puntas|Une étoile à cinq branches|五芒星形"],
    0,
    "At only about 1.2 hectares, the fan-shaped island held warehouses, a chief trader's residence and little else, and its Dutch residents needed permission to so much as step onto the mainland.|Con solo unas 1,2 hectáreas, la isla en forma de abanico albergaba almacenes, la residencia del jefe de la factoría y poco más, y sus residentes neerlandeses necesitaban permiso hasta para pisar tierra firme.|Avec seulement environ 1,2 hectare, l'île en forme d'éventail abritait des entrepôts, la résidence du chef de facteurs et guère plus, et ses résidents néerlandais avaient besoin d'une autorisation pour seulement mettre le pied sur la terre ferme.|わずか1.2ヘクタールほどのこの扇形の島には、倉庫と商館長の住居くらいしかなかった。住んでいたオランダ人は本土へ足を踏み入れるだけでも許可が要った。",
  ),
  q(
    6,
    "Ōura Church in Nagasaki, built in 1864, holds what distinction among buildings in Japan?|La iglesia de Ōura, en Nagasaki, construida en 1864, ¿qué distinción tiene entre los edificios de Japón?|L'église d'Ōura à Nagasaki, bâtie en 1864, détient quelle distinction parmi les bâtiments du Japon ?|1864年に建てられた長崎の大浦天主堂は、日本の建物の中でどのような地位を持つ?",
    ["It is the oldest standing church in the country|Es la iglesia en pie más antigua del país|C'est la plus ancienne église encore debout du pays|現存する日本最古の教会建築である", "It is the tallest wooden structure in Japan|Es la estructura de madera más alta de Japón|C'est la plus haute structure en bois du Japon|日本一高い木造建築である", "It was Japan's first building with electric lighting|Fue el primer edificio de Japón con luz eléctrica|Ce fut le premier bâtiment du Japon à avoir l'éclairage électrique|日本で最初に電灯が灯った建物である"],
    0,
    "It was built for the small foreign community allowed to live in Nagasaki after Japan's ports reopened, and became famous the following year when a group of local villagers secretly confessed to its priest that they, too, were Christian.|Se construyó para la pequeña comunidad extranjera autorizada a vivir en Nagasaki tras la reapertura de los puertos de Japón, y se hizo famosa al año siguiente cuando un grupo de aldeanos locales confesó en secreto a su sacerdote que ellos también eran cristianos.|Elle fut bâtie pour la petite communauté étrangère autorisée à vivre à Nagasaki après la réouverture des ports du Japon, et devint célèbre l'année suivante lorsqu'un groupe de villageois locaux confessa en secret à son prêtre qu'ils étaient eux aussi chrétiens.|日本の港が再開された後、長崎に住むことを許された小さな外国人社会のために建てられた。翌年、地元の村人の一団が神父にひそかに自分たちもキリシタンだと打ち明け、一躍知られるようになった。",
  ),
  q(
    2,
    "Kagoshima, sitting on a bay beneath an active volcano, is sometimes given what affectionate nickname?|Kagoshima, asentada en una bahía bajo un volcán activo, ¿qué apodo cariñoso recibe a veces?|Kagoshima, installée sur une baie sous un volcan actif, reçoit parfois quel surnom affectueux ?|活火山のふもとの湾に面した鹿児島には、時にどんな愛称が付けられる?",
    ["The Naples of the Eastern world|La Nápoles del mundo oriental|La Naples du monde oriental|東洋のナポリ", "The Venice of Japan|La Venecia de Japón|La Venise du Japon|日本のヴェネツィア", "The Athens of the East|La Atenas de Oriente|L'Athènes de l'Orient|東洋のアテネ"],
    0,
    "The comparison to Naples, another bayside city living in the shadow of an active volcano, dates back to at least the early 20th century and still appears on local tourism signs today.|La comparación con Nápoles, otra ciudad costera que vive a la sombra de un volcán activo, se remonta al menos a comienzos del siglo XX y aún aparece hoy en carteles turísticos locales.|La comparaison avec Naples, une autre ville de bord de baie vivant à l'ombre d'un volcan actif, remonte au moins au début du XXe siècle et figure encore aujourd'hui sur des panneaux touristiques locaux.|同じく活火山のふもとの湾岸都市であるナポリになぞらえるこの呼び名は、遅くとも20世紀初頭にさかのぼり、今も地元の観光案内板に見られる。",
  ),
  q(
    5,
    "Kitakyūshu, one of Kyūshū's largest cities, was formed in 1963 by merging how many separate cities, including Moji and Yahata?|Kitakyūshu, una de las mayores ciudades de Kyūshū, se formó en 1963 al fusionar cuántas ciudades independientes, incluidas Moji y Yahata?|Kitakyūshu, l'une des plus grandes villes du Kyūshū, fut formée en 1963 par la fusion de combien de villes distinctes, dont Moji et Yahata ?|九州有数の都市・北九州市は、1963年に門司・八幡などいくつの都市が合併してできた?",
    ["Five|Cinco|Cinq|5つ", "Three|Tres|Trois|3つ", "Seven|Siete|Sept|7つ"],
    0,
    "Moji, Kokura, Wakamatsu, Yahata and Tobata each had their own separate identity and industrial specialty before the merger; the new city's name was chosen deliberately to avoid favouring any one of the five over the others.|Moji, Kokura, Wakamatsu, Yahata y Tobata tenían cada una su propia identidad y especialidad industrial antes de la fusión; el nombre de la nueva ciudad se eligió a propósito para no favorecer a ninguna de las cinco sobre las demás.|Moji, Kokura, Wakamatsu, Yahata et Tobata avaient chacune leur propre identité et spécialité industrielle avant la fusion ; le nom de la nouvelle ville fut choisi à dessein pour ne favoriser aucune des cinq sur les autres.|門司・小倉・若松・八幡・戸畑はそれぞれ独自の色と産業を持つ町だった。合併後の新しい市名は、五つのどれか一つだけをひいきしないよう、あえて選ばれたものである。",
  ),
  q(
    5,
    "Before their 1889 merger into a single city, Fukuoka and Hakata were what kind of two distinct towns?|Antes de fusionarse en una sola ciudad en 1889, Fukuoka y Hakata eran qué tipo de dos pueblos distintos?|Avant leur fusion en une seule ville en 1889, Fukuoka et Hakata étaient deux villes distinctes de quel type ?|1889年に一つの市へ合併する前、福岡と博多はそれぞれどのような性格の別の町だったか?",
    ["A samurai castle town and a merchant port town|Una ciudad-castillo samurái y una ciudad portuaria mercantil|Une ville-château de samouraïs et une ville marchande portuaire|武家の城下町と商人の港町", "A fishing village and a farming village|Un pueblo pesquero y un pueblo agrícola|Un village de pêcheurs et un village agricole|漁村と農村", "A temple town and a hot-spring resort|Un pueblo de templos y una estación termal|Une ville de temples et une station thermale|寺町と温泉町"],
    0,
    "The rivalry over which name the merged city should keep was settled by a single vote in the new city assembly, and \"Fukuoka\" won by the narrowest of margins — though the train station and much everyday usage still favour \"Hakata\".|La rivalidad sobre qué nombre debía quedarse la ciudad fusionada se zanjó con un solo voto en la nueva asamblea municipal, y «Fukuoka» ganó por el margen más estrecho, aunque la estación de tren y buena parte del uso cotidiano aún prefieren «Hakata».|La rivalité sur le nom à conserver pour la ville fusionnée se régla par un seul vote à la nouvelle assemblée municipale, et « Fukuoka » l'emporta de justesse — bien que la gare et une bonne part de l'usage quotidien privilégient encore « Hakata ».|合併後の市名をどちらにするかの争いは、新しい市議会でのわずか一票差の採決で決まり、「福岡」が僅差で勝った。それでも駅名をはじめ日常ではいまも「博多」がよく使われる。",
  ),
  q(
    3,
    "Which real professional baseball team is based in Fukuoka today?|¿Qué equipo profesional de béisbol tiene hoy su sede en Fukuoka?|Quelle équipe professionnelle de baseball a aujourd'hui son siège à Fukuoka ?|今日、福岡を本拠地とする実在のプロ野球チームは?",
    ["The Fukuoka SoftBank Hawks|Los Fukuoka SoftBank Hawks|Les Fukuoka SoftBank Hawks|福岡ソフトバンクホークス", "The Osaka Tigers|Los Osaka Tigers|Les Osaka Tigers|大阪タイガース", "The Nagoya Dragons|Los Nagoya Dragons|Les Nagoya Dragons|名古屋ドラゴンズ"],
    0,
    "The Hawks have won the Japan Series numerous times since relocating to Fukuoka, and their dome stadium remains one of the city's most recognisable landmarks.|Los Hawks han ganado la Serie de Japón numerosas veces desde su traslado a Fukuoka, y su estadio cubierto sigue siendo uno de los edificios más reconocibles de la ciudad.|Les Hawks ont remporté la Série du Japon à de nombreuses reprises depuis leur installation à Fukuoka, et leur stade couvert demeure l'un des monuments les plus reconnaissables de la ville.|ホークスは福岡移転後、日本シリーズを何度も制している。そのドーム球場は今も市を象徴する建物の一つである。",
  ),
  q(
    3,
    "Sub-tropical Yakushima and Tanegashima, off Kyūshū's southern tip, share their climate most closely with which part of Japan?|Yakushima y Tanegashima, subtropicales y frente a la punta sur de Kyūshū, comparten su clima sobre todo con qué parte de Japón?|Yakushima et Tanegashima, subtropicales et au large de la pointe sud du Kyūshū, partagent leur climat surtout avec quelle partie du Japon ?|九州最南端沖の亜熱帯の島、屋久島と種子島は、日本のどの地域と最も気候が似ているか?",
    ["The Okinawan islands, further south|Las islas de Okinawa, más al sur|Les îles d'Okinawa, plus au sud|さらに南の沖縄の島々", "Hokkaidō, in the far north|Hokkaidō, en el extremo norte|Hokkaidō, tout au nord|遥か北の北海道", "The Sea of Japan coast of Honshū|La costa de Honshū en el mar de Japón|La côte de Honshū sur la mer du Japon|本州の日本海側"],
    0,
    "Warm ocean currents keep both islands mild and wet year-round, supporting palm trees and other subtropical plants that would not survive on the Kyūshū mainland just to the north.|Las corrientes oceánicas cálidas mantienen ambas islas templadas y húmedas todo el año, sustentando palmeras y otras plantas subtropicales que no sobrevivirían en la isla principal de Kyūshū, justo al norte.|Des courants marins chauds maintiennent les deux îles douces et humides toute l'année, permettant à des palmiers et autres plantes subtropicales de pousser, ce qui ne serait pas possible sur l'île principale du Kyūshū juste au nord.|暖流のおかげでどちらの島も一年じゅう温暖湿潤で、すぐ北の九州本土では育たないヤシなどの亜熱帯の植物が育つ。",
  ),

  // ==================== 島・建築・災害・食(補足) ====================
  q(
    9,
    "In 1792, the collapse of a lava dome called Mayuyama on Mount Unzen triggered a landslide and tsunami across the Ariake Sea, killing an estimated how many people in one of Japan's deadliest-ever natural disasters?|En 1792, el colapso de una cúpula de lava llamada Mayuyama en el monte Unzen provocó un deslizamiento y un tsunami que cruzó el mar de Ariake, matando a un número estimado de cuántas personas, uno de los peores desastres naturales de la historia de Japón?|En 1792, l'effondrement d'un dôme de lave appelé Mayuyama sur le mont Unzen déclencha un glissement de terrain et un tsunami traversant la mer d'Ariake, tuant environ combien de personnes, l'une des pires catastrophes naturelles de l'histoire du Japon ?|1792年、雲仙岳の溶岩ドーム「眉山」の崩壊が引き起こした山体崩壊と、有明海を渡った津波は、日本史上でも最悪級の自然災害として、およそ何人の命を奪ったとされる?",
    ["Roughly 15,000|Unas 15.000|Environ 15 000|およそ1万5千人", "Roughly 1,500|Unas 1.500|Environ 1 500|およそ1,500人", "Roughly 150,000|Unas 150.000|Environ 150 000|およそ15万人"],
    0,
    "Known as \"Shimabara Taihen, Higo Meiwaku\" — the Shimabara disaster, Higo's trouble — the event is still cited as an example of a landslide-generated tsunami striking a coast far from where the collapse itself occurred, since most of the dead were on the Higo (Kumamoto) shore across the bay rather than in Shimabara.|Conocido como «Shimabara Taihen, Higo Meiwaku» —el desastre de Shimabara, la desgracia de Higo—, el suceso aún se cita como ejemplo de un tsunami generado por un deslizamiento que golpea una costa lejana al colapso mismo, pues la mayoría de los muertos estaban en la orilla de Higo (Kumamoto), al otro lado de la bahía, y no en Shimabara.|Connu sous le nom de « Shimabara Taihen, Higo Meiwaku » — le désastre de Shimabara, le malheur de Higo —, l'événement est encore cité en exemple d'un tsunami généré par un glissement de terrain frappant un rivage loin de l'effondrement lui-même, la plupart des morts se trouvant sur la rive de Higo (Kumamoto), de l'autre côté de la baie, plutôt qu'à Shimabara.|「島原大変肥後迷惑」と呼ばれるこの出来事は、山体崩壊そのものから遠く離れた岸を津波が襲った例として今も引かれる。犠牲者の多くは島原ではなく、湾の対岸の肥後(熊本)側にいた人々だったからである。",
  ),
  q(
    7,
    "Glover Garden in Nagasaki preserves the residence, built in 1863, of which foreign merchant who supplied weapons to anti-shogunate domains?|El jardín Glover, en Nagasaki, conserva la residencia, construida en 1863, de qué comerciante extranjero que suministró armas a los dominios antishogunales?|Le jardin Glover, à Nagasaki, conserve la résidence, bâtie en 1863, de quel marchand étranger qui fournissait des armes aux domaines antishogunaux ?|長崎のグラバー園には、反幕府側の諸藩に武器を供給した外国人商人の1863年築の邸宅が保存されている。誰の邸宅か?",
    ["Thomas Blake Glover|Thomas Blake Glover|Thomas Blake Glover|トーマス・ブレーク・グラバー", "William Adams|William Adams|William Adams|ウィリアム・アダムス", "Townsend Harris|Townsend Harris|Townsend Harris|タウンゼント・ハリス"],
    0,
    "The Scottish trader sold rifles and ships to Satsuma and Chōshū even while they were technically barred from dealing with foreigners, and his residence is considered the oldest surviving Western-style wooden building in Japan.|El comerciante escocés vendió rifles y barcos a Satsuma y Chōshū aun cuando técnicamente tenían prohibido tratar con extranjeros, y su residencia se considera el edificio de madera de estilo occidental más antiguo que se conserva en Japón.|Le marchand écossais vendit fusils et navires à Satsuma et Chōshū alors qu'ils étaient techniquement interdits de traiter avec des étrangers, et sa résidence est considérée comme le plus ancien bâtiment en bois de style occidental encore debout au Japon.|このスコットランド人商人は、名目上は外国人との取引を禁じられていた薩摩や長州にも銃や船を売った。彼の邸宅は現存する日本最古の木造洋風建築とされる。",
  ),
  q(
    6,
    "Meganebashi (\"Spectacles Bridge\"), built in Nagasaki in 1634, is notable in Japan as what?|El Meganebashi («puente de las gafas»), construido en Nagasaki en 1634, es célebre en Japón por qué?|Le Meganebashi (« pont à lunettes »), bâti à Nagasaki en 1634, est réputé au Japon pour quoi ?|1634年に長崎に架けられた眼鏡橋は、日本で何として知られる?",
    ["Japan's oldest stone arch bridge|El puente de arco de piedra más antiguo de Japón|Le plus ancien pont en arc de pierre du Japon|日本最古の石造アーチ橋", "Japan's longest suspension bridge|El puente colgante más largo de Japón|Le plus long pont suspendu du Japon|日本一長い吊り橋", "The only floating pontoon bridge in Japan|El único puente flotante de pontones de Japón|Le seul pont flottant sur pontons du Japon|日本で唯一の浮橋"],
    0,
    "Its two stone arches and their reflection in the still river below form what looks like a pair of spectacles, which is how the bridge got its name.|Sus dos arcos de piedra y su reflejo en el río tranquilo de abajo forman lo que parece un par de gafas, de donde le viene el nombre al puente.|Ses deux arcs de pierre et leur reflet dans la rivière calme en contrebas forment ce qui ressemble à une paire de lunettes, d'où le nom du pont.|二つの石造アーチとその下の穏やかな川面に映る影が眼鏡のように見えることから、この名がついた。",
  ),
  q(
    5,
    "\"Shirokuma\" (white bear), a mountain of shaved ice topped with condensed milk, fruit and beans, is a dessert said to have originated in which Kyūshū city?|El «shirokuma» (oso blanco), una montaña de hielo raspado con leche condensada, fruta y judías, es un postre que se dice originario de qué ciudad de Kyūshū?|Le « shirokuma » (ours blanc), une montagne de glace pilée surmontée de lait concentré, de fruits et de haricots, est un dessert originaire, dit-on, de quelle ville du Kyūshū ?|練乳・果物・豆をたっぷりのせた氷菓「白熊」は、九州のどの都市で生まれたとされる?",
    ["Kagoshima|Kagoshima|Kagoshima|鹿児島", "Nagasaki|Nagasaki|Nagasaki|長崎", "Ōita|Ōita|Ōita|大分"],
    0,
    "It is said to have started in the 1940s at a shop that served plain shaved ice with milk, and the name comes from the dessert's fluffy white appearance once fruit and beans were added on top.|Se dice que comenzó en la década de 1940 en una tienda que servía hielo raspado simple con leche, y el nombre viene del aspecto blanco y esponjoso del postre una vez añadidos la fruta y las judías por encima.|Il aurait débuté dans les années 1940 dans une échoppe servant de la glace pilée simple au lait, et le nom vient de l'aspect blanc et duveteux du dessert une fois fruits et haricots ajoutés dessus.|1940年代、練乳をかけた素朴なかき氷を出す店から始まったとされ、果物や豆をのせたふわふわの白い見た目から「白熊」の名が付いた。",
  ),
  q(
    7,
    "Higo zōgan, a traditional craft of inlaying gold and silver wire into blackened iron, developed in Kumamoto to decorate what kind of samurai-era items?|El higo zōgan, técnica tradicional de incrustar hilo de oro y plata en hierro ennegrecido, se desarrolló en Kumamoto para decorar qué tipo de objetos de la era samurái?|Le higo zōgan, technique traditionnelle d'incrustation de fils d'or et d'argent dans du fer noirci, s'est développé à Kumamoto pour décorer quel type d'objets de l'époque des samouraïs?|黒く着色した鉄に金銀の線を象嵌する伝統工芸・肥後象がんは、熊本で武家の時代の何を飾るために発達した?",
    ["Sword fittings and gun barrels|Guarniciones de espada y cañones de armas|Garnitures d'épée et canons d'armes|刀の金具と鉄砲の銃身", "Roof tiles|Tejas|Tuiles de toit|屋根瓦", "Rice-storage jars|Tinajas de almacenamiento de arroz|Jarres de stockage du riz|米びつ"],
    0,
    "Craftsmen working for the Hosokawa clan refined the technique on sword guards and matchlock barrels, and it later moved on to obi clasps and jewellery once the samurai class itself disappeared.|Los artesanos al servicio del clan Hosokawa refinaron la técnica en guardas de espada y cañones de arcabuz, y más tarde pasó a broches de obi y joyería cuando la propia clase samurái desapareció.|Des artisans au service du clan Hosokawa perfectionnèrent la technique sur les gardes d'épée et les canons d'arquebuses, avant qu'elle ne passe aux fermoirs d'obi et à la joaillerie une fois la classe des samouraïs disparue.|細川家に仕えた職人が刀の鍔や火縄銃の銃身でこの技法を磨き、武士という身分そのものが消えた後は帯留めや装身具へと受け継がれていった。",
  ),
  q(
    7,
    "The five bridges linking the Amakusa islands to the Kyūshū mainland, called the Amakusa Gokyō, were completed in what decade?|Los cinco puentes que unen las islas de Amakusa con la isla principal de Kyūshū, llamados Amakusa Gokyō, ¿en qué década se terminaron?|Les cinq ponts reliant les îles d'Amakusa à l'île principale du Kyūshū, appelés Amakusa Gokyō, furent achevés dans quelle décennie ?|天草諸島を九州本土と結ぶ五つの橋、天草五橋が完成したのはいつの年代?",
    ["The 1960s|Los años 60|Les années 1960|1960年代", "The 1920s|Los años 20|Les années 1920|1920年代", "The 2000s|Los años 2000|Les années 2000|2000年代"],
    0,
    "Before 1966, reaching Amakusa meant a ferry crossing; the bridges connected a population that had been effectively islanded for its entire history to the rest of Kyūshū by road for the first time.|Antes de 1966, llegar a Amakusa suponía cruzar en ferri; los puentes conectaron por carretera, por primera vez, a una población que había estado prácticamente aislada durante toda su historia con el resto de Kyūshū.|Avant 1966, rejoindre Amakusa signifiait traverser en ferry ; les ponts relièrent par la route, pour la première fois, une population restée pratiquement insulaire tout au long de son histoire au reste du Kyūshū.|1966年以前、天草へは船で渡るしかなかった。この橋は、歴史のほとんどを事実上の島として過ごしてきた住民を、初めて道路で九州本土とつないだ。",
  ),
  q(
    6,
    "What is the name of the largest island in the Gotō archipelago, home to its main town and airport?|¿Cómo se llama la isla más grande del archipiélago de Gotō, sede de su pueblo principal y aeropuerto?|Comment s'appelle la plus grande île de l'archipel de Gotō, siège de sa ville principale et de son aéroport ?|五島列島でいちばん大きく、中心の町と空港がある島の名は?",
    ["Fukue Island|Isla Fukue|Île de Fukue|福江島", "Nakadōri Island|Isla Nakadōri|Île de Nakadōri|中通島", "Ojika Island|Isla Ojika|Île d'Ojika|小値賀島"],
    0,
    "Fukue's own castle town grew around one of the last Japanese castles built before the Meiji era ended feudal domains, and ferries and flights from Fukue remain the main way to reach the rest of the archipelago.|El pueblo-castillo de Fukue creció en torno a uno de los últimos castillos japoneses construidos antes de que la era Meiji acabara con los dominios feudales, y los ferris y vuelos desde Fukue siguen siendo la vía principal para llegar al resto del archipiélago.|La ville-château de Fukue se développa autour de l'un des derniers châteaux japonais construits avant que l'ère Meiji ne mette fin aux domaines féodaux, et les ferries et vols depuis Fukue restent le principal moyen de rejoindre le reste de l'archipel.|福江の城下町は、明治が藩を終わらせる直前に築かれた日本最後期の城の一つを中心に育った。福江からのフェリーと空路が、今も列島の他の島へ渡る主な足である。",
  ),
  q(
    7,
    "Iki Island, part of Nagasaki Prefecture, is one of Japan's oldest centres for producing shōchū distilled from which grain?|La isla de Iki, en la prefectura de Nagasaki, es uno de los centros más antiguos de Japón para producir shōchū destilado de qué grano?|L'île d'Iki, en préfecture de Nagasaki, est l'un des plus anciens centres du Japon pour la production de shōchū distillé à partir de quelle céréale ?|長崎県に属する壱岐島は、何の穀物を蒸留した焼酎の産地として日本でも最も古い地域のひとつである?",
    ["Barley|Cebada|L'orge|麦", "Buckwheat|Trigo sarraceno|Le sarrasin|そば", "Corn|Maíz|Le maïs|とうもろこし"],
    0,
    "Barley shōchū is thought to have been distilled on Iki since at least the 16th century, using a technique that may have arrived from the Asian mainland along the same short sea routes used for centuries of trade.|Se cree que el shōchū de cebada se destila en Iki desde al menos el siglo XVI, con una técnica que quizá llegó del continente asiático por las mismas rutas marítimas cortas usadas durante siglos de comercio.|Le shōchū d'orge serait distillé à Iki depuis au moins le XVIe siècle, selon une technique peut-être venue du continent asiatique par les mêmes courtes routes maritimes empruntées pendant des siècles d'échanges.|壱岐では遅くとも16世紀から麦焼酎が蒸留されてきたとされる。何世紀にもわたる交易で使われたのと同じ短い海路を通じ、大陸から伝わった技法とも言われる。",
  ),
  q(
    5,
    "In the 1960s, Miyazaki's palm-lined Pacific coast made it Japan's leading domestic destination for which kind of trip?|En la década de 1960, la costa pacífica de Miyazaki, bordeada de palmeras, la convirtió en el principal destino nacional japonés para qué tipo de viaje?|Dans les années 1960, la côte pacifique de Miyazaki bordée de palmiers en fit la principale destination nationale japonaise pour quel type de voyage ?|1960年代、フェニックス並木の宮崎の太平洋岸は、日本国内におけるある種の旅行先として一番人気を誇った。何のための旅行か?",
    ["Honeymoons|Lunas de miel|Voyages de noces|新婚旅行", "School excursions only|Solo excursiones escolares|Uniquement les sorties scolaires|修学旅行のみ", "Pilgrimages to Buddhist temples|Peregrinaciones a templos budistas|Pèlerinages vers des temples bouddhistes|仏教寺院への巡礼"],
    0,
    "Domestic air travel was still a novelty and overseas honeymoons were largely out of reach, so newlyweds flew to Miyazaki's tropical-feeling coastline in numbers that built an entire local hotel industry around them.|Los vuelos nacionales aún eran una novedad y las lunas de miel al extranjero quedaban fuera del alcance de la mayoría, así que los recién casados volaban en gran número a la costa de aire tropical de Miyazaki, construyendo a su alrededor toda una industria hotelera local.|Les vols intérieurs étaient encore une nouveauté et les lunes de miel à l'étranger restaient hors de portée de la plupart, si bien que les jeunes mariés affluaient vers la côte à l'allure tropicale de Miyazaki, faisant naître autour d'eux toute une industrie hôtelière locale.|国内線がまだ珍しく、海外への新婚旅行はほとんどの人には手が届かなかった時代、新婚夫婦は南国風の宮崎の海岸へ大勢飛んできた。その数が、地元にホテル産業まるごとを育てた。",
  ),
  q(
    5,
    "Nagasaki's historic Chinatown is counted, along with Yokohama and one other city, among Japan's three largest. What is that third city?|El barrio chino histórico de Nagasaki se cuenta, junto con Yokohama y otra ciudad, entre los tres mayores de Japón. ¿Cuál es esa tercera ciudad?|Le quartier chinois historique de Nagasaki compte, avec Yokohama et une autre ville, parmi les trois plus grands du Japon. Quelle est cette troisième ville ?|長崎の歴史ある中華街は、横浜ともう一つの都市とともに、日本三大中華街に数えられる。もう一つの都市はどこ?",
    ["Kobe|Kobe|Kobe|神戸", "Sapporo|Sapporo|Sapporo|札幌", "Sendai|Sendai|Sendai|仙台"],
    0,
    "All three grew from ports that were among the first opened to foreign trade in the 19th century, and each developed its own distinct Chinese immigrant community with its own regional dishes.|Los tres crecieron a partir de puertos que estuvieron entre los primeros abiertos al comercio exterior en el siglo XIX, y cada uno desarrolló su propia comunidad inmigrante china, con sus propios platos regionales.|Les trois se sont développés à partir de ports parmi les premiers ouverts au commerce extérieur au XIXe siècle, et chacun a formé sa propre communauté immigrée chinoise, avec ses propres plats régionaux.|三つとも、19世紀に外国との交易のために最も早く開かれた港から育った。それぞれが独自の中国系移民の社会を築き、地域色のある料理を育てた。",
  ),
  q(
    6,
    "Across Kyūshū's dialects, the word \"batten\", meaning roughly \"but\" or \"however\", is a well-known feature associated most with which part of the region?|En los dialectos de Kyūshū, la palabra «batten», que significa aproximadamente «pero» o «sin embargo», es un rasgo conocido asociado sobre todo a qué parte de la región?|Dans les dialectes du Kyūshū, le mot « batten », signifiant à peu près « mais » ou « cependant », est un trait bien connu associé surtout à quelle partie de la région ?|九州の方言の中で、「けれど」「しかし」を意味する「ばってん」という語は、地方のどの辺りと最も結びつけられる?",
    ["Nagasaki and the Hizen area|Nagasaki y la zona de Hizen|Nagasaki et la région de Hizen|長崎・肥前地方", "The Ōsumi Peninsula alone|Solo la península de Ōsumi|La seule péninsule d'Ōsumi|大隅半島のみ", "Only formal written Japanese|Solo el japonés escrito formal|Uniquement le japonais écrit formel|かしこまった書き言葉のみ"],
    0,
    "The word appears widely enough across Kyūshū dialects to be something of a shorthand for \"Kyūshū speech\" in the rest of Japan, though it is most strongly identified with Nagasaki and the old Hizen region.|La palabra aparece en dialectos de todo Kyūshū lo bastante como para funcionar casi de taquigrafía del «habla de Kyūshū» en el resto de Japón, aunque se identifica más con Nagasaki y la antigua región de Hizen.|Le mot apparaît assez largement dans les dialectes du Kyūshū pour servir presque de raccourci pour le « parler du Kyūshū » dans le reste du Japon, bien qu'il soit surtout identifié à Nagasaki et à l'ancienne région de Hizen.|「ばってん」は九州の方言全般でかなり広く使われ、九州以外の地域では「九州弁」を代表する語のように扱われることもあるが、最も強く結びつくのは長崎など旧肥前の地域である。",
  ),
  q(
    5,
    "The Ariake Sea has, by a wide margin, the largest what of any body of water in Japan?|El mar de Ariake tiene, con gran diferencia, la mayor qué de cualquier masa de agua en Japón?|La mer d'Ariake possède, de loin, le plus grand quoi de toute étendue d'eau au Japon ?|有明海は日本のどの海域よりも、大差で何が大きい?",
    ["Tidal range|Amplitud de marea|Marnage|干満の差", "Average depth|Profundidad media|Profondeur moyenne|平均水深", "Salt concentration|Concentración de sal|Concentration en sel|塩分濃度"],
    0,
    "The difference between high and low tide can reach around 6 m at the head of the bay, uncovering the vast mudflats that mudskippers, shellfish and the region's fishing culture all depend on.|La diferencia entre pleamar y bajamar puede alcanzar unos 6 m en el fondo de la bahía, dejando al descubierto los vastos fangales de los que dependen los peces saltarines, el marisco y la cultura pesquera de la región.|L'écart entre marée haute et marée basse peut atteindre environ 6 m au fond de la baie, découvrant les vastes vasières dont dépendent périophtalmes, coquillages et toute la culture halieutique de la région.|湾の奥では満潮と干潮の差が6mほどにも達し、ムツゴロウや貝、この地方の漁の文化を支える広大な干潟が現れる。",
  ),
  q(
    6,
    "The Nanatsugama sea caves near Karatsu were carved into cliffs by what natural process?|Las cuevas marinas de Nanatsugama, cerca de Karatsu, se formaron en los acantilados por qué proceso natural?|Les grottes marines de Nanatsugama, près de Karatsu, furent creusées dans les falaises par quel processus naturel ?|唐津近くの七ツ釜の海食洞は、どのような自然の作用で崖に刻まれた?",
    ["Wave erosion of volcanic rock|La erosión del oleaje sobre roca volcánica|L'érosion des vagues sur de la roche volcanique|火山岩が波に浸食されて", "Glacial carving during an ice age|El tallado glaciar durante una glaciación|Le creusement glaciaire pendant une glaciation|氷期の氷河による侵食", "Underground river collapse|El colapso de un río subterráneo|L'effondrement d'une rivière souterraine|地下水脈の陥没"],
    0,
    "Constant wave action over thousands of years hollowed seven connected caverns into the basalt cliffs, and boat tours now run directly into the largest of them when the sea is calm enough.|La acción constante del oleaje durante miles de años ahuecó siete cavernas conectadas en los acantilados de basalto, y hoy hay excursiones en barco que entran directamente en la más grande cuando el mar está lo bastante calmo.|L'action constante des vagues sur des milliers d'années a creusé sept cavernes reliées dans les falaises de basalte, et des excursions en bateau pénètrent aujourd'hui directement dans la plus grande d'entre elles quand la mer est assez calme.|数千年にわたる絶え間ない波の作用が、玄武岩の崖に七つのつながった洞窟を穿った。海が穏やかな日には、最大の洞窟の中まで観光船が直接入っていく。",
  ),

  // ==================== さらに基本の知識 ====================
  q(
    2,
    "Kyūshū's eastern coastline, including Miyazaki and eastern Ōita, faces which ocean?|La costa oriental de Kyūshū, incluidas Miyazaki y el este de Ōita, ¿a qué océano da?|Le littoral oriental du Kyūshū, y compris Miyazaki et l'est d'Ōita, fait face à quel océan ?|宮崎や大分東部を含む九州の東海岸は、どの大洋に面している?",
    ["The Pacific Ocean|El océano Pacífico|L'océan Pacifique|太平洋", "The Indian Ocean|El océano Índico|L'océan Indien|インド洋", "The Sea of Japan|El mar de Japón|La mer du Japon|日本海"],
    0,
    "The stretch of Pacific along this coast is often called the Hyūga Sea, and its open swell makes it a popular surfing coast even though it lacks the shelter of Kyūshū's inland seas to the west.|El tramo de Pacífico junto a esta costa suele llamarse mar de Hyūga, y su oleaje abierto la hace una costa popular para el surf, aunque carece del abrigo de los mares interiores de Kyūshū al oeste.|Ce tronçon du Pacifique le long de cette côte est souvent appelé mer de Hyūga, et sa houle ouverte en fait une côte prisée des surfeurs, bien qu'elle manque de l'abri des mers intérieures du Kyūshū à l'ouest.|この海岸沿いの太平洋は日向灘とも呼ばれ、九州西側の内海のような遮りが無いぶん外洋のうねりが立ち、サーフィンで人気の海岸になっている。",
  ),
  q(
    2,
    "Which of these three is a real Kyūshū prefecture, unlike the other two, which are on Honshū?|¿Cuál de estas tres es una prefectura real de Kyūshū, a diferencia de las otras dos, que están en Honshū?|Laquelle de ces trois est une véritable préfecture du Kyūshū, contrairement aux deux autres, situées sur Honshū ?|次の三つのうち、他の二つが本州にあるのに対し、実在する九州の県はどれ?",
    ["Kumamoto|Kumamoto|Kumamoto|熊本県", "Okayama|Okayama|Okayama|岡山県", "Tottori|Tottori|Tottori|鳥取県"],
    0,
    "Okayama and Tottori both sit on the Honshū side of the Seto Inland Sea and Sea of Japan respectively, well over a hundred kilometres from Kyūshū's nearest shore.|Okayama y Tottori están en el lado de Honshū del mar interior de Seto y del mar de Japón respectivamente, a más de cien kilómetros de la costa más cercana de Kyūshū.|Okayama et Tottori se trouvent toutes deux du côté Honshū de la mer intérieure de Seto et de la mer du Japon respectivement, à plus de cent kilomètres de la côte la plus proche du Kyūshū.|岡山県と鳥取県はそれぞれ本州側の瀬戸内海沿い・日本海沿いにあり、九州の最寄りの海岸からも百キロ以上離れている。",
  ),
  q(
    3,
    "Kyūshū's typhoon season, when most storms make landfall on the region, generally peaks in which two months?|La temporada de tifones de Kyūshū, cuando la mayoría de las tormentas tocan tierra en la región, ¿en qué dos meses suele alcanzar su punto álgido?|La saison des typhons du Kyūshū, où la plupart des tempêtes touchent terre dans la région, culmine généralement en quels deux mois ?|ほとんどの嵐が上陸する九州の台風シーズンは、一般にどの二か月に最も集中する?",
    ["August and September|Agosto y septiembre|Août et septembre|8月と9月", "December and January|Diciembre y enero|Décembre et janvier|12月と1月", "March and April|Marzo y abril|Mars et avril|3月と4月"],
    0,
    "Warm sea surface temperatures peak in late summer, feeding the tropical storms that track up from the Pacific and Philippine Sea toward Kyūshū before curving north-east toward the rest of Japan.|Las temperaturas del mar alcanzan su máximo a fines del verano, alimentando las tormentas tropicales que suben desde el Pacífico y el mar de Filipinas hacia Kyūshū antes de virar al noreste hacia el resto de Japón.|Les températures de surface de la mer culminent à la fin de l'été, alimentant les tempêtes tropicales qui remontent du Pacifique et de la mer des Philippines vers le Kyūshū avant de virer au nord-est vers le reste du Japon.|海面水温は晩夏にピークを迎え、太平洋やフィリピン海から九州へ北上し、その後日本の他地域へ向けて北東へ曲がっていく熱帯低気圧を育てる。",
  ),
  q(
    3,
    "Which of these three is not a sea bordering Kyūshū?|¿Cuál de estos tres no es un mar que bordea Kyūshū?|Laquelle de ces trois n'est pas une mer bordant le Kyūshū ?|次の三つのうち、九州に接していない海はどれ?",
    ["The Caribbean Sea|El mar Caribe|La mer des Caraïbes|カリブ海", "The Genkai Sea|El mar de Genkai|La mer de Genkai|玄界灘", "The Ariake Sea|El mar de Ariake|La mer d'Ariake|有明海"],
    0,
    "The Caribbean lies on the far side of the world from Kyūshū; the Genkai and Ariake seas, by contrast, both wash directly against the island's own coastline.|El Caribe está en el otro extremo del mundo respecto a Kyūshū; los mares de Genkai y Ariake, en cambio, bañan directamente la costa de la isla.|Les Caraïbes se trouvent à l'autre bout du monde par rapport au Kyūshū ; les mers de Genkai et d'Ariake, elles, baignent directement le littoral de l'île.|カリブ海は九州から地球の反対側にある。一方、玄界灘と有明海はどちらも九州自身の海岸に直接洗われている。",
  ),
  q(
    4,
    "What term describes Kyūshū's warm winters, mild enough that snow rarely settles except in its highest inland mountains?|¿Qué término describe los inviernos cálidos de Kyūshū, lo bastante suaves para que la nieve rara vez cuaje salvo en sus montañas interiores más altas?|Quel terme décrit les hivers doux du Kyūshū, assez cléments pour que la neige tienne rarement, sauf sur ses plus hautes montagnes de l'intérieur ?|九州の穏やかな冬は、内陸の最も高い山々を除けば雪がめったに積もらないほど暖かい。これをどう表す気候区分と言えるか?",
    ["Warm temperate|Templado cálido|Tempéré chaud|温暖な温帯", "Polar|Polar|Polaire|寒帯", "Arid desert|Desértico árido|Désertique aride|乾燥した砂漠気候"],
    0,
    "Most of Kyūshū falls into the warm temperate zone, with the far south around Yakushima and Tanegashima edging into subtropical conditions.|La mayor parte de Kyūshū cae en la zona templada cálida, y el extremo sur, en torno a Yakushima y Tanegashima, roza condiciones subtropicales.|La majeure partie du Kyūshū relève de la zone tempérée chaude, l'extrême sud autour de Yakushima et Tanegashima frôlant des conditions subtropicales.|九州の大部分は温暖な温帯に属し、屋久島や種子島のある最南部は亜熱帯に近い気候になる。",
  ),
  q(
    8,
    "Nagasaki's Peace Statue, unveiled in 1955, was created by which Nagasaki-born sculptor?|La estatua de la Paz de Nagasaki, inaugurada en 1955, fue creada por qué escultor nacido en Nagasaki?|La statue de la Paix de Nagasaki, dévoilée en 1955, fut créée par quel sculpteur né à Nagasaki ?|1955年に除幕された長崎平和祈念像は、長崎生まれのどの彫刻家によって作られた?",
    ["Seibō Kitamura|Seibō Kitamura|Seibō Kitamura|北村西望", "Kōtarō Takamura|Kōtarō Takamura|Kōtarō Takamura|高村光太郎", "Fumio Asakura|Fumio Asakura|Fumio Asakura|朝倉文夫"],
    0,
    "The bronze figure sits with one hand pointing to the sky, said to represent the threat of nuclear weapons, and the other extended flat, said to represent peace, though the sculptor himself gave few fixed explanations for its gestures.|La figura de bronce se sienta con una mano señalando al cielo, se dice que representando la amenaza nuclear, y la otra extendida en horizontal, representando la paz, aunque el propio escultor dio pocas explicaciones fijas sobre sus gestos.|La figure de bronze est assise, une main pointée vers le ciel, censée représenter la menace nucléaire, et l'autre tendue à l'horizontale, censée représenter la paix, bien que le sculpteur lui-même ait peu précisé le sens de ces gestes.|ブロンズ像は片手を天に向け核の脅威を、もう片方の手を水平に伸ばし平和を表すとされるが、彫刻家自身はその仕草の意味を固定的には多く語らなかった。",
  ),

  // ==================== 鉄道の記録・庭園・各県の話題 ====================
  q(
    8,
    "Nishi-Ōyama Station, in Kagoshima Prefecture, long held what railway record for mainland Japan (excluding Okinawa's monorail)?|La estación de Nishi-Ōyama, en la prefectura de Kagoshima, ¿qué récord ferroviario mantuvo durante mucho tiempo en el Japón continental (sin contar el monorraíl de Okinawa)?|La gare de Nishi-Ōyama, en préfecture de Kagoshima, détint longtemps quel record ferroviaire pour le Japon continental (sans compter le monorail d'Okinawa) ?|鹿児島県の西大山駅は、(沖縄のモノレールを除く)本土の鉄道でどんな記録を長く保持していた?",
    ["Japan's southernmost railway station|La estación ferroviaria más al sur de Japón|La gare ferroviaire la plus au sud du Japon|日本最南端の鉄道駅", "Japan's highest-altitude railway station|La estación ferroviaria a mayor altitud de Japón|La gare ferroviaire la plus haute en altitude du Japon|日本一標高の高い鉄道駅", "Japan's shortest railway platform|El andén ferroviario más corto de Japón|Le quai ferroviaire le plus court du Japon|日本一短いホーム"],
    0,
    "The tiny unstaffed station has a clear view of Kaimondake, a conical volcano nicknamed \"Satsuma Fuji\", and it kept its title as the southernmost station in mainland Japan even after Okinawa's monorail opened farther south still.|La pequeña estación sin personal tiene vista despejada del Kaimondake, un volcán cónico apodado «Fuji de Satsuma», y mantuvo su título de estación más al sur del Japón continental incluso después de que el monorraíl de Okinawa abriera más al sur.|La petite gare sans personnel offre une vue dégagée sur le Kaimondake, un volcan conique surnommé « Fuji de Satsuma », et a conservé son titre de gare la plus australe du Japon continental même après l'ouverture, plus au sud encore, du monorail d'Okinawa.|無人のこの小さな駅からは「薩摩富士」と呼ばれる円錐形の開聞岳がよく見える。沖縄にさらに南のモノレールができた後も、本土の鉄道駅としては最南端の座を保っている。",
  ),
  q(
    9,
    "Which small railway station near Hirado, reached by the Matsuura Railway, is sometimes cited as mainland Japan's westernmost train station?|¿Qué pequeña estación cerca de Hirado, servida por el ferrocarril Matsuura, se cita a veces como la estación de tren más occidental del Japón continental?|Quelle petite gare près de Hirado, desservie par le chemin de fer Matsuura, est parfois citée comme la gare ferroviaire la plus occidentale du Japon continental ?|松浦鉄道が通る平戸近くの小さな駅で、本土最西端の鉄道駅とされることがあるのはどこ?",
    ["Tabira-Hiradoguchi Station|Estación de Tabira-Hiradoguchi|Gare de Tabira-Hiradoguchi|たびら平戸口駅", "Karatsu Station|Estación de Karatsu|Gare de Karatsu|唐津駅", "Sasebo Station|Estación de Sasebo|Gare de Sasebo|佐世保駅"],
    0,
    "A monument on the platform marks the claim, and the station sits close enough to the bridge onto Hirado island that many travellers use it as their jumping-off point for the trading-post town.|Un monumento en el andén señala esta distinción, y la estación está lo bastante cerca del puente a la isla de Hirado como para que muchos viajeros la usen como punto de partida hacia el pueblo de la antigua factoría.|Un monument sur le quai signale cette particularité, et la gare est assez proche du pont menant à l'île de Hirado pour que de nombreux voyageurs l'utilisent comme point de départ vers la ville du comptoir commercial.|ホームには本土最西端を示す記念碑が立ち、平戸島へ渡る橋にも近いため、多くの旅行者がこの駅をかつての商館の町への乗り換え地点にしている。",
  ),
  q(
    7,
    "The Kyūshū National Museum, which opened in Dazaifu in 2005, was notable as Japan's first new national museum built where in over a century?|El Museo Nacional de Kyūshū, abierto en Dazaifu en 2005, fue el primer museo nacional nuevo de Japón construido dónde en más de un siglo?|Le Musée national du Kyūshū, ouvert à Dazaifu en 2005, fut le premier nouveau musée national du Japon construit où depuis plus d'un siècle ?|2005年に大宰府で開館した九州国立博物館は、一世紀以上ぶりに日本のどこに新設された国立博物館として注目された?",
    ["Outside the Tokyo–Kyoto–Nara corridor|Fuera del corredor Tokio-Kioto-Nara|Hors du corridor Tokyo-Kyoto-Nara|東京・京都・奈良以外の場所", "Underground, in a basement complex|Bajo tierra, en un complejo subterráneo|Sous terre, dans un complexe souterrain|地下の複合施設内", "Inside a former royal palace|Dentro de un antiguo palacio real|Dans un ancien palais royal|旧王宮の中"],
    0,
    "Japan's other three national museums are all in Tokyo, Kyoto and Nara, so placing the fourth in Dazaifu was a deliberate acknowledgement of the town's centuries-old role managing contact with the Asian continent.|Los otros tres museos nacionales de Japón están en Tokio, Kioto y Nara, así que situar el cuarto en Dazaifu fue un reconocimiento deliberado del papel centenario del pueblo en la gestión del contacto con el continente asiático.|Les trois autres musées nationaux du Japon se trouvent à Tokyo, Kyoto et Nara, si bien qu'installer le quatrième à Dazaifu reconnaissait délibérément le rôle séculaire de la ville dans la gestion des contacts avec le continent asiatique.|日本の他の三つの国立博物館は東京・京都・奈良にある。四つ目を大宰府に置いたのは、大陸との接触を何世紀も取り仕切ってきたこの町の役割を意識してのことだった。",
  ),
  q(
    5,
    "Ibusuki, on the Satsuma Peninsula in Kagoshima, is famous for a hot-spring bathing style in which visitors are buried up to the neck in what?|Ibusuki, en la península de Satsuma, en Kagoshima, es famosa por un estilo de baño termal en el que se entierra a los visitantes hasta el cuello en qué?|Ibusuki, sur la péninsule de Satsuma à Kagoshima, est réputée pour une forme de bain thermal où les visiteurs sont enterrés jusqu'au cou dans quoi ?|鹿児島の薩摩半島にある指宿は、客が首まで何に埋められる温泉の入り方で知られる?",
    ["Naturally heated black sand|Arena negra calentada de forma natural|Du sable noir chauffé naturellement|自然に温められた黒い砂", "Warm mud from a caldera lake|Barro tibio de un lago de caldera|De la boue tiède d'un lac de caldeira|カルデラ湖の温かい泥", "Volcanic ash from Sakurajima|Ceniza volcánica del Sakurajima|De la cendre volcanique du Sakurajima|桜島の火山灰"],
    0,
    "Geothermally heated groundwater seeping up through the beach warms the sand from below, and bathers lie in shallow pits dug by attendants who shovel more hot sand on top until only the head is showing.|El agua subterránea calentada geotérmicamente que aflora en la playa calienta la arena desde abajo, y los bañistas se tienden en pozos poco profundos que cavan los encargados, quienes echan más arena caliente encima hasta dejar solo la cabeza fuera.|Une eau souterraine chauffée par la géothermie remonte sous la plage et réchauffe le sable par en dessous ; les baigneurs s'allongent dans des fosses peu profondes creusées par le personnel, qui recouvre le corps de sable chaud jusqu'à ne laisser dépasser que la tête.|地熱で温められた地下水が砂浜ににじみ出て下から砂を温め、係員が浅い穴を掘って熱い砂をさらにかけ、頭だけを残して体を埋める。",
  ),
  q(
    5,
    "Karatsu Castle, overlooking the bay, is nicknamed \"Maizuru-jō\" (Dancing Crane Castle) because of what?|El castillo de Karatsu, con vistas a la bahía, se apoda «Maizuru-jō» (castillo de la grulla danzante) por qué motivo?|Le château de Karatsu, dominant la baie, est surnommé « Maizuru-jō » (château de la grue dansante) pour quelle raison ?|湾を見下ろす唐津城が「舞鶴城」と呼ばれるのはなぜか?",
    ["Its wing-like walls seen from the bay resemble a crane in flight|Sus murallas, como alas vistas desde la bahía, recuerdan a una grulla en vuelo|Ses murailles, tel des ailes vues depuis la baie, évoquent une grue en vol|湾から見た翼のような城壁が、飛ぶ鶴の姿に見えるから", "Cranes historically nested on its main keep every winter|Antaño las grullas anidaban cada invierno en su torre principal|Des grues nichaient chaque hiver sur son donjon principal|毎冬、天守に鶴が巣を作っていたから", "It was built using timber shaped like crane feathers|Se construyó con madera tallada en forma de plumas de grulla|Il fut bâti avec du bois taillé en forme de plumes de grue|鶴の羽をかたどった木材で建てられたから"],
    0,
    "The castle's outer walls extend outward from the main keep like a pair of spread wings when viewed from the water, a silhouette that gave the fortress its poetic nickname.|Las murallas exteriores del castillo se extienden desde la torre principal como un par de alas desplegadas al verlas desde el agua, una silueta que le dio a la fortaleza su apodo poético.|Les murailles extérieures du château s'étendent depuis le donjon comme une paire d'ailes déployées vues depuis l'eau, une silhouette qui valut à la forteresse son surnom poétique.|城の外郭は、海から見ると本丸から広げた翼のように延びて見える。その輪郭が、この詩的なあだ名の由来になった。",
  ),
  q(
    6,
    "Yūtoku Inari Shrine in Saga Prefecture is counted among Japan's \"three great\" shrines dedicated to which deity, associated with rice, fertility and business success?|El santuario Yūtoku Inari, en la prefectura de Saga, se cuenta entre los «tres grandes» santuarios de Japón dedicados a qué deidad, asociada con el arroz, la fertilidad y el éxito en los negocios?|Le sanctuaire Yūtoku Inari, en préfecture de Saga, compte parmi les « trois grands » sanctuaires du Japon dédiés à quelle divinité, associée au riz, à la fertilité et à la réussite en affaires ?|佐賀県の祐徳稲荷神社は、米・豊穣・商売繁盛と結びつく何の神を祀る「三大稲荷」の一つに数えられる?",
    ["Inari|Inari|Inari|稲荷", "Hachiman|Hachiman|Hachiman|八幡", "Tenjin|Tenjin|Tenjin|天神"],
    0,
    "Built on a hillside with its main hall raised on stilts in a style that echoes Kyoto's Kiyomizu-dera, the shrine draws close to three million visitors a year despite being well off the main tourist routes.|Construido en una ladera con su salón principal elevado sobre pilotes, en un estilo que recuerda al Kiyomizu-dera de Kioto, el santuario atrae a cerca de tres millones de visitantes al año pese a estar bastante alejado de las rutas turísticas principales.|Bâti à flanc de colline, son bâtiment principal surélevé sur pilotis dans un style qui rappelle le Kiyomizu-dera de Kyoto, le sanctuaire attire près de trois millions de visiteurs par an bien qu'il soit assez éloigné des circuits touristiques principaux.|斜面に建ち、京都の清水寺を思わせる懸造りで本殿を高く掲げるこの神社は、主要な観光路からは外れているにもかかわらず、年に三百万人近くが訪れる。",
  ),
  q(
    7,
    "The basalt cliffs of Miyazaki's Takachiho Gorge were formed by a pyroclastic flow from which volcano roughly 120,000 years ago?|Los acantilados de basalto del desfiladero de Takachiho, en Miyazaki, se formaron por una colada piroclástica de qué volcán hace unos 120.000 años?|Les falaises basaltiques des gorges de Takachiho, à Miyazaki, se sont formées à partir d'une coulée pyroclastique de quel volcan il y a environ 120 000 ans ?|宮崎県の高千穂峡の柱状節理の断崖は、およそ12万年前、どの火山の火砕流によって形づくられた?",
    ["Mount Aso|El monte Aso|Le mont Aso|阿蘇山", "Mount Fuji|El monte Fuji|Le mont Fuji|富士山", "Sakurajima|El Sakurajima|Le Sakurajima|桜島"],
    0,
    "Aso's eruption sent pyroclastic material more than 100 km to fill the ancient river valley that became the gorge, and the lava cooled into the tall hexagonal columns that line its walls today.|La erupción del Aso envió material piroclástico a más de 100 km para rellenar el antiguo valle fluvial que se convirtió en el desfiladero, y la lava se enfrió formando las altas columnas hexagonales que hoy recubren sus paredes.|L'éruption de l'Aso projeta des matériaux pyroclastiques sur plus de 100 km pour combler l'ancienne vallée fluviale devenue les gorges, et la lave se refroidit en hautes colonnes hexagonales qui tapissent aujourd'hui ses parois.|阿蘇の噴火は火砕流を100km以上先まで送り、古い川の谷を埋めてこの峡谷を作った。溶岩が冷えて固まり、今も壁を覆う高い六角柱状の岩になっている。",
  ),
  q(
    6,
    "Suizenji Jōjuen, a landscape garden in Kumamoto, is famous for a miniature representation of which famous mountain?|El jardín paisajístico Suizenji Jōjuen, en Kumamoto, es famoso por una representación en miniatura de qué montaña célebre?|Le jardin paysager Suizenji Jōjuen, à Kumamoto, est réputé pour une représentation miniature de quelle montagne célèbre ?|熊本の水前寺成趣園は、どの有名な山をかたどったミニチュアの築山で知られる?",
    ["Mount Fuji|El monte Fuji|Le mont Fuji|富士山", "Mount Aso|El monte Aso|Le mont Aso|阿蘇山", "Mount Kirishima|El monte Kirishima|Le mont Kirishima|霧島山"],
    0,
    "The garden, laid out for the Hosokawa clan starting in 1636, arranges a chain of grassy mounds and a spring-fed pond to suggest a journey along the old Tōkaidō road, with a neatly clipped cone standing in for Fuji itself.|El jardín, trazado para el clan Hosokawa a partir de 1636, dispone una cadena de montículos herbosos y un estanque de manantial que evocan un recorrido por el antiguo camino Tōkaidō, con un cono bien recortado que representa al propio Fuji.|Le jardin, aménagé pour le clan Hosokawa à partir de 1636, dispose une chaîne de monticules herbeux et un étang alimenté par une source pour évoquer un parcours le long de l'ancienne route du Tōkaidō, avec un cône soigneusement taillé représentant le Fuji lui-même.|1636年から細川家のために造られたこの庭園は、芝の築山と湧水の池を連ねて旧東海道の旅を思わせる作りになっており、きれいに刈り込まれた円錐形の築山が富士山に見立てられている。",
  ),
  q(
    6,
    "Fukuoka City has, in recent years, ranked among Japan's five most populous cities, having overtaken which older industrial city?|En los últimos años, Fukuoka se ha situado entre las cinco ciudades más pobladas de Japón, tras superar a qué ciudad industrial más antigua?|Ces dernières années, Fukuoka s'est classée parmi les cinq villes les plus peuplées du Japon, ayant dépassé quelle ville industrielle plus ancienne ?|近年、福岡市は日本で人口の多い都市の上位5位に入り、どのより古い工業都市を上回った?",
    ["Kobe|Kobe|Kobe|神戸市", "Sapporo|Sapporo|Sapporo|札幌市", "Nagoya|Nagoya|Nagoya|名古屋市"],
    0,
    "A young population, a compact city centre and steady inward migration from the rest of Kyūshū have kept Fukuoka growing even as many of Japan's older industrial cities have shrunk.|Una población joven, un centro urbano compacto y una migración constante desde el resto de Kyūshū han mantenido a Fukuoka en crecimiento, incluso mientras muchas de las ciudades industriales más antiguas de Japón se reducían.|Une population jeune, un centre-ville compact et une migration constante depuis le reste du Kyūshū ont maintenu la croissance de Fukuoka, alors même que nombre des villes industrielles plus anciennes du Japon se sont contractées.|若い人口構成、コンパクトな都心、九州各地からの絶えざる流入が、日本の古い工業都市の多くが縮小する中でも福岡の成長を支えてきた。",
  ),
  q(
    9,
    "Kagoshima's Sengan-en garden, laid out by the Shimazu clan in 1658, uses which distant natural feature as \"borrowed scenery\" instead of building an artificial hill?|El jardín Sengan-en de Kagoshima, trazado por el clan Shimazu en 1658, usa qué elemento natural lejano como «paisaje prestado» en vez de construir una colina artificial?|Le jardin Sengan-en de Kagoshima, aménagé par le clan Shimazu en 1658, utilise quel élément naturel lointain comme « paysage emprunté » plutôt que de bâtir une colline artificielle ?|1658年に島津家が築いた鹿児島の仙巌園は、人工の築山を造る代わりに何を「借景」として取り入れているか?",
    ["Sakurajima and the bay|El Sakurajima y la bahía|Le Sakurajima et la baie|桜島と鹿児島湾", "Mount Fuji, visible on clear days|El monte Fuji, visible en días despejados|Le mont Fuji, visible par temps clair|晴れた日に見える富士山", "The Ryūkyū Islands|Las islas Ryūkyū|Les îles Ryūkyū|琉球列島"],
    0,
    "By leaving that side of the garden open, the designers made the volcano across the bay function as the garden's own mountain backdrop, changing mood with the smoke and light of the day.|Al dejar ese lado del jardín abierto, los diseñadores hicieron que el volcán al otro lado de la bahía funcionara como telón de fondo montañoso propio del jardín, cambiando de ánimo según el humo y la luz del día.|En laissant ce côté du jardin ouvert, les concepteurs firent du volcan de l'autre côté de la baie la toile de fond montagneuse du jardin lui-même, changeant d'humeur selon la fumée et la lumière du jour.|庭のその側を開けたままにすることで、設計者は湾の対岸の火山そのものを庭の背景の山として機能させた。その日の煙や光によって表情が変わる。",
  ),

  // ==================== 最後の補足 ====================
  q(
    4,
    "Huis Ten Bosch, a large theme park near Sasebo that opened in 1992, was built to resemble the townscape of which country?|Huis Ten Bosch, un gran parque temático cerca de Sasebo que abrió en 1992, se construyó para parecerse al paisaje urbano de qué país?|Huis Ten Bosch, un grand parc à thème près de Sasebo ouvert en 1992, fut bâti pour ressembler au paysage urbain de quel pays ?|1992年に佐世保近くに開業した大型テーマパーク、ハウステンボスは、どの国の街並みを再現して造られた?",
    ["The Netherlands|Los Países Bajos|Les Pays-Bas|オランダ", "Portugal|Portugal|Portugal|ポルトガル", "Spain|España|L'Espagne|スペイン"],
    0,
    "The name means \"House in the Woods\" in Dutch, after a royal palace near The Hague, and the park's canals and windmills echo the same Dutch presence in Nagasaki Prefecture that once ran through Dejima and Hirado centuries earlier.|El nombre significa «Casa en el bosque» en neerlandés, por un palacio real cerca de La Haya, y los canales y molinos del parque recuerdan la misma presencia neerlandesa en la prefectura de Nagasaki que antes pasó por Dejima y Hirado siglos atrás.|Le nom signifie « Maison dans les bois » en néerlandais, d'après un palais royal près de La Haye, et les canaux et moulins du parc font écho à la même présence néerlandaise en préfecture de Nagasaki qui passait autrefois par Dejima et Hirado.|「森の中の家」を意味するオランダ語の名は、ハーグ近郊の王宮に由来する。園内の運河と風車は、何世紀も前に出島や平戸を通じてこの長崎県にあった同じオランダとの関わりを今に映している。",
  ),
  q(
    7,
    "Tsūjun-kyō, a stone arch bridge built in 1854 in Kumamoto Prefecture, is unusual for doubling as what kind of structure?|El Tsūjun-kyō, un puente de arco de piedra construido en 1854 en la prefectura de Kumamoto, es poco común por servir también como qué tipo de estructura?|Le Tsūjun-kyō, un pont en arc de pierre bâti en 1854 en préfecture de Kumamoto, est particulier car il sert aussi de quel type de structure ?|1854年に熊本県に築かれた石造アーチ橋・通潤橋は、同時に何の役目も果たす点で珍しい?",
    ["An aqueduct carrying irrigation water|Un acueducto que transporta agua de riego|Un aqueduc transportant l'eau d'irrigation|田畑へ水を送る水路橋", "A covered vegetable market|Un mercado de verduras cubierto|Un marché aux légumes couvert|屋根付きの青物市場", "An ammunition storehouse|Un almacén de municiones|Un entrepôt de munitions|弾薬の貯蔵庫"],
    0,
    "Built to carry irrigation water across a valley to fields that had struggled with drought for generations, the bridge still periodically releases dramatic arcs of water from its centre as a demonstration, and it remains partly in agricultural use today.|Construido para llevar agua de riego a través de un valle hasta campos que habían sufrido sequía durante generaciones, el puente aún libera periódicamente arcos espectaculares de agua desde su centro como demostración, y sigue parcialmente en uso agrícola hoy.|Bâti pour acheminer l'eau d'irrigation à travers une vallée vers des champs en proie à la sécheresse depuis des générations, le pont libère encore périodiquement de spectaculaires jets d'eau depuis son centre en démonstration, et reste partiellement utilisé pour l'agriculture aujourd'hui.|何世代も日照りに苦しんできた谷向こうの畑へ用水を送るために築かれたこの橋は、今も時おり中央から豪快に水を放って見せる。今日でも一部は実際の農業用水として使われている。",
  ),
  q(
    5,
    "Yame, in Fukuoka Prefecture, is one of Japan's most celebrated growing areas for which high-grade shade-grown green tea?|Yame, en la prefectura de Fukuoka, es una de las zonas de cultivo más célebres de Japón de qué té verde de alta gama cultivado a la sombra?|Yame, en préfecture de Fukuoka, est l'une des régions de culture les plus réputées du Japon pour quel thé vert haut de gamme cultivé à l'ombre ?|福岡県の八女は、日光を遮って育てる高級な緑茶、何の産地として日本でも屈指の名高さを誇る?",
    ["Gyokuro|Gyokuro|Gyokuro|玉露", "Hōjicha|Hōjicha|Hōjicha|ほうじ茶", "Genmaicha|Genmaicha|Genmaicha|玄米茶"],
    0,
    "Covering the tea bushes with netting for several weeks before picking keeps sunlight from breaking down the amino acids that give gyokuro its sweetness, a labour-intensive method that makes it one of the most expensive teas Japan produces.|Cubrir los arbustos de té con red durante varias semanas antes de la recolección evita que la luz solar descomponga los aminoácidos que dan al gyokuro su dulzor, un método laborioso que lo hace uno de los tés más caros que produce Japón.|Couvrir les théiers d'un filet pendant plusieurs semaines avant la cueillette empêche la lumière du soleil de dégrader les acides aminés qui donnent au gyokuro sa douceur, une méthode exigeante en main-d'œuvre qui en fait l'un des thés les plus chers produits au Japon.|摘採の数週間前から茶の木に覆いをかけて日光を遮ることで、玉露特有の甘みのもとになるアミノ酸が分解されるのを防ぐ。手間のかかるこの方法が、玉露を日本でも指折り高価な茶にしている。",
  ),
  q(
    6,
    "The Ariake Sea coast, shared by Saga and Fukuoka Prefectures, is one of Japan's leading production areas for which edible seaweed?|La costa del mar de Ariake, compartida por las prefecturas de Saga y Fukuoka, es una de las principales zonas de producción de Japón de qué alga comestible?|La côte de la mer d'Ariake, partagée par les préfectures de Saga et de Fukuoka, est l'une des principales zones de production du Japon pour quelle algue comestible ?|佐賀県と福岡県にまたがる有明海沿岸は、何の食用海藻の生産で日本有数の産地となっている?",
    ["Nori (laver)|Nori (alga laver)|Nori (laver)|海苔", "Wakame|Wakame|Wakame|わかめ", "Kombu|Kombu|Kombu|昆布"],
    0,
    "Nori farmers plant nets in the shallow, nutrient-rich waters uncovered by the bay's huge tidal swing, and Saga alone has ranked as Japan's top nori-producing prefecture by value in many recent years.|Los cultivadores de nori plantan redes en las aguas someras y ricas en nutrientes que deja al descubierto la enorme amplitud de marea de la bahía, y solo Saga se ha situado como la prefectura productora de nori de mayor valor de Japón en muchos años recientes.|Les producteurs de nori plantent des filets dans les eaux peu profondes et riches en nutriments découvertes par le vaste marnage de la baie, et Saga seule s'est classée prefecture productrice de nori de plus grande valeur du Japon ces dernières années.|海苔養殖業者は、湾の大きな干満差で現れる浅く栄養豊かな水域に網を張る。佐賀県だけでも、近年たびたび生産額で日本一の海苔の産地になっている。",
  ),
  q(
    6,
    "Kokura-ori, a hard-wearing striped cotton weave historically used for samurai trousers, originated in which Kyūshū city?|El kokura-ori, un tejido de algodón a rayas resistente usado históricamente para pantalones de samurái, ¿en qué ciudad de Kyūshū se originó?|Le kokura-ori, un tissage de coton rayé résistant historiquement utilisé pour les pantalons de samouraïs, est originaire de quelle ville du Kyūshū ?|武士の袴に使われた丈夫な縞織りの綿織物・小倉織は、九州のどの都市に由来する?",
    ["Kokura|Kokura|Kokura|小倉", "Yame|Yame|Yame|八女", "Karatsu|Karatsu|Karatsu|唐津"],
    0,
    "The dense, tightly woven cloth was prized for its durability rather than its looks, and after nearly disappearing in the 20th century it was revived by local weavers researching fragments held in old collections.|La tela, densa y tejida apretadamente, se apreciaba por su durabilidad más que por su aspecto, y tras casi desaparecer en el siglo XX, tejedores locales la revivieron estudiando fragmentos conservados en colecciones antiguas.|Ce tissu dense et serré était prisé pour sa robustesse plus que pour son apparence, et après avoir presque disparu au XXe siècle, il fut ravivé par des tisserands locaux étudiant des fragments conservés dans d'anciennes collections.|目の詰んだこの丈夫な織物は、見た目より丈夫さで重宝された。20世紀にほぼ途絶えかけたが、古い収蔵品の断片を研究した地元の織り手たちの手で復興した。",
  ),
  q(
    6,
    "Nagasaki's hilly, terraced neighbourhoods are said to give the city one of Japan's lowest rates of what everyday item?|Los barrios en cuesta y terrazas de Nagasaki hacen que la ciudad tenga, se dice, una de las tasas más bajas de Japón de qué objeto cotidiano?|Les quartiers en pente et en terrasses de Nagasaki donnent, dit-on, à la ville l'un des taux les plus bas du Japon de quel objet du quotidien ?|坂とひな壇状の地形が多い長崎は、日本でも指折り何の日用品の保有率が低いと言われる?",
    ["Bicycles|Bicicletas|Vélos|自転車", "Umbrellas|Paraguas|Parapluies|傘", "Refrigerators|Refrigeradores|Réfrigérateurs|冷蔵庫"],
    0,
    "With so many neighbourhoods reachable only by stone stairways too steep and narrow for wheels, many residents get by without ever owning a bicycle, relying instead on the city's slope-climbing lifts, buses and a great deal of walking.|Con tantos barrios accesibles solo por escaleras de piedra demasiado empinadas y estrechas para ruedas, muchos vecinos se arreglan sin poseer nunca una bicicleta, y dependen en cambio de los funiculares, autobuses y mucho caminar.|Avec tant de quartiers accessibles uniquement par des escaliers de pierre trop raides et étroits pour des roues, beaucoup d'habitants se passent de vélo, comptant plutôt sur les ascenseurs inclinés, les bus et beaucoup de marche.|車輪の通れないほど急で狭い石段でしか行けない地区が多いため、多くの住民は自転車を持たずに暮らし、代わりに斜行エレベーターやバス、そして多くの徒歩に頼っている。",
  ),
  q(
    5,
    "The night view from Mount Inasa, overlooking Nagasaki's harbour, is often ranked among the \"three great night views\" of Japan alongside Hakodate and which other city?|La vista nocturna desde el monte Inasa, sobre el puerto de Nagasaki, suele figurar entre las «tres grandes vistas nocturnas» de Japón junto a Hakodate y qué otra ciudad?|La vue nocturne depuis le mont Inasa, dominant le port de Nagasaki, figure souvent parmi les « trois grandes vues nocturnes » du Japon aux côtés de Hakodate et de quelle autre ville ?|長崎港を見下ろす稲佐山からの夜景は、函館ともう一つの都市とともに日本三大夜景に数えられることが多い。もう一つはどこ?",
    ["Kobe|Kobe|Kobe|神戸", "Nagoya|Nagoya|Nagoya|名古屋", "Sendai|Sendai|Sendai|仙台"],
    0,
    "Nagasaki's steep, bowl-shaped harbour setting means house lights climb the hillsides on three sides at once, a layout that lets the whole city sparkle in a way that flatter cities cannot match.|El emplazamiento del puerto de Nagasaki, empinado y en forma de cuenco, hace que las luces de las casas trepen las laderas por tres lados a la vez, una disposición que hace brillar a toda la ciudad como no pueden las ciudades más llanas.|L'écrin escarpé en forme de cuvette du port de Nagasaki fait grimper les lumières des maisons sur les collines de trois côtés à la fois, un relief qui fait scintiller toute la ville comme ne le peuvent les villes plus plates.|すり鉢状の急な地形を持つ長崎港では、家々の灯りが三方の斜面を同時に這い上がる。この地形が、平らな街にはまねのできない街全体のきらめきを生んでいる。",
  ),
  q(
    3,
    "Which of these four Kyūshū prefectures does not border the Ariake Sea?|¿Cuál de estas cuatro prefecturas de Kyūshū no bordea el mar de Ariake?|Laquelle de ces quatre préfectures du Kyūshū ne borde pas la mer d'Ariake ?|次の四県のうち、有明海に面していないのはどこ?",
    ["Ōita|Ōita|Ōita|大分県", "Saga|Saga|Saga|佐賀県", "Kumamoto|Kumamoto|Kumamoto|熊本県"],
    0,
    "Ōita faces the Pacific side of Kyūshū around Beppu Bay and the Bungo Channel, on the opposite side of the island from the enclosed, shallow Ariake Sea.|Ōita da al lado pacífico de Kyūshū, en torno a la bahía de Beppu y el canal de Bungo, en el lado opuesto de la isla al mar de Ariake, cerrado y poco profundo.|Ōita fait face au côté pacifique du Kyūshū, autour de la baie de Beppu et du canal de Bungo, du côté opposé de l'île par rapport à la mer d'Ariake, fermée et peu profonde.|大分県は九州の太平洋側、別府湾や豊後水道に面しており、閉じた浅い海である有明海とは島の反対側にあたる。",
  ),
  q(
    2,
    "Kyūshū Shinkansen trains run under service names including \"Sakura\" and \"Tsubame\". What do both of these names refer to?|Los trenes del Kyūshū Shinkansen circulan bajo nombres de servicio como «Sakura» y «Tsubame». ¿A qué se refieren ambos nombres?|Les trains du Kyūshū Shinkansen circulent sous des noms de service tels que « Sakura » et « Tsubame ». À quoi ces deux noms renvoient-ils ?|九州新幹線には「さくら」「つばめ」といった愛称の列車がある。この二つの名はそれぞれ何を指す?",
    ["A flower (cherry blossom) and a bird (swallow)|Una flor (flor de cerezo) y un ave (golondrina)|Une fleur (fleur de cerisier) et un oiseau (hirondelle)|花(桜)と鳥(つばめ)", "Two different mountain ranges|Dos cordilleras distintas|Deux chaînes de montagnes différentes|二つの異なる山脈", "Two former Kyūshū domains|Dos antiguos dominios de Kyūshū|Deux anciens domaines du Kyūshū|二つの旧藩"],
    0,
    "Japanese limited express and shinkansen services are traditionally named after natural or seasonal images rather than numbers, a naming style that predates the shinkansen itself by decades.|Los servicios japoneses de expreso limitado y shinkansen tradicionalmente llevan nombres de imágenes naturales o estacionales en vez de números, un estilo que es décadas anterior al propio shinkansen.|Les services japonais d'express limité et de shinkansen portent traditionnellement des noms d'images naturelles ou saisonnières plutôt que des numéros, un usage antérieur de plusieurs décennies au shinkansen lui-même.|日本の特急や新幹線は、番号ではなく自然や季節を思わせる言葉で呼ばれるのが伝統である。この命名の慣習は新幹線そのものより何十年も古い。",
  ),
];
