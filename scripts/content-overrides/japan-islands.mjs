/**
 * 島嶼部の都市と、それらを結ぶ航路。
 *
 * 桃太郎電鉄の日本版のように島まで足を伸ばせるよう、伊豆諸島・奄美群島・
 * 小笠原・佐渡・隠岐・対馬・五島・屋久島・南西諸島などを追加する。
 * 本土との接続は**航路**(`"sea"`)にしており、盤面では青い破線で描かれる。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function prop(name, cost, income) {
  return { n: t(name), cost, inc: income };
}

export const JAPAN_ISLAND_CITIES = {
  oshima: {
    n: t("Izu Ōshima|Izu Ōshima|Izu Ōshima|伊豆大島"),
    lo: 139.4,
    la: 34.75,
    mark: "volcano_m",
    bg: "islandhill",
    reg: "kan",
    lp: "r",
    tag: t("Camellia island with a living volcano|Isla de camelias con un volcán vivo|Île aux camélias et volcan actif|椿と活火山の島"),
    fact: t(
      "Mount Mihara erupts every few decades and its 1986 eruption forced the whole island to evacuate. Three million camellia trees supply oil still used for hair and cooking.|El monte Mihara entra en erupción cada pocas décadas; en 1986 obligó a evacuar toda la isla. Tres millones de camelias dan aceite usado aún para el cabello y la cocina.|Le mont Mihara entre en éruption tous les quelques décennies ; en 1986 toute l'île fut évacuée. Trois millions de camélias fournissent une huile encore utilisée.|三原山は数十年ごとに噴火し、1986年の噴火では全島民が避難した。300万本の椿から採れる椿油は今も髪や料理に使われる。",
    ),
    props: [
      prop("Camellia Oil Press|Prensa de aceite de camelia|Pressoir d'huile de camélia|椿油の搾油所", 220, 46),
      prop("Crater Trail Lodge|Refugio del cráter|Refuge du cratère|火口の山小屋", 190, 40),
    ],
  },
  hachijojima: {
    n: t("Hachijōjima|Hachijōjima|Hachijōjima|八丈島"),
    lo: 139.79,
    la: 33.11,
    mark: "torii_wood",
    bg: "subtropic",
    reg: "kan",
    lp: "r",
    tag: t("Island of exiles and yellow silk|Isla de exiliados y seda amarilla|Île des exilés et de la soie jaune|流人と黄八丈の島"),
    fact: t(
      "For three centuries the shogunate exiled people here, 290 km out to sea. The exiles' descendants still weave kihachijō, silk dyed yellow with a local grass.|Durante tres siglos el shogunato desterró aquí, a 290 km mar adentro. Sus descendientes aún tejen el kihachijō, seda teñida de amarillo con una hierba local.|Trois siècles durant, le shogunat y exila des condamnés, à 290 km au large. Leurs descendants tissent encore le kihachijō, soie teinte en jaune.|幕府は290km沖のこの島へ3世紀にわたり流人を送った。その子孫は今も、島の草で黄色に染める黄八丈を織る。",
    ),
    props: [
      prop("Kihachijō Loom|Telar de kihachijō|Métier à kihachijō|黄八丈の機屋", 250, 52),
      prop("Seaside Onsen|Onsen junto al mar|Onsen du bord de mer|海辺の露天風呂", 210, 44),
    ],
  },
  chichijima: {
    n: t("Chichijima|Chichijima|Chichijima|父島"),
    lo: 142.2,
    la: 27.09,
    mark: "katsuo",
    bg: "subtropic",
    reg: "kan",
    lp: "r",
    tag: t("The Galápagos of the Orient|Las Galápagos de Oriente|Les Galápagos de l'Orient|東洋のガラパゴス"),
    fact: t(
      "These islands have never been connected to a continent, so much of their wildlife exists nowhere else. There is no airport — a 24-hour ferry from Tokyo is the only way in.|Estas islas nunca estuvieron unidas a un continente, así que buena parte de su fauna no existe en ningún otro sitio. Sin aeropuerto: solo un ferry de 24 horas desde Tokio.|Ces îles n'ont jamais été reliées à un continent : une grande part de leur faune est unique. Pas d'aéroport — seul un ferry de 24 heures depuis Tokyo.|一度も大陸と地続きになったことがなく、固有の生き物が多い。空港は無く、東京から24時間の船が唯一の足である。",
    ),
    props: [
      prop("Whale Watch Boat|Barco de avistamiento|Bateau d'observation|ホエールウォッチング船", 260, 54),
      prop("Island Guesthouse|Pensión isleña|Pension insulaire|島の民宿", 200, 42),
    ],
  },
  amami: {
    n: t("Amami Ōshima|Amami Ōshima|Amami Ōshima|奄美大島"),
    lo: 129.49,
    la: 28.37,
    mark: "church",
    bg: "subtropic",
    reg: "kyu",
    lp: "r",
    tag: t("Mud-dyed silk and ancient forest|Seda teñida con barro y bosque antiguo|Soie teinte à la boue et forêt ancienne|泥染めの紬と原生林"),
    fact: t(
      "Ōshima tsumugi silk is dyed by burying it in iron-rich mud, a technique over a thousand years old. The island's forests, home to the Amami rabbit, became a World Heritage site in 2021.|La seda tsumugi se tiñe enterrándola en barro ferroso, técnica milenaria. Sus bosques, hogar del conejo de Amami, son Patrimonio Mundial desde 2021.|La soie tsumugi est teinte en l'enfouissant dans une boue ferreuse, technique millénaire. Ses forêts, refuge du lapin d'Amami, sont classées depuis 2021.|大島紬は鉄分を含む泥に埋めて染める千年以上の技法で作られる。アマミノクロウサギが棲む森は2021年に世界自然遺産となった。",
    ),
    props: [
      prop("Mud Dye Workshop|Taller de tintura de barro|Atelier de teinture à la boue|泥染めの工房", 270, 56),
      prop("Mangrove Canoe|Canoa por el manglar|Canoë dans la mangrove|マングローブのカヌー", 220, 46),
    ],
  },
  sado: {
    n: t("Sado|Sado|Sado|佐渡"),
    lo: 138.36,
    la: 38.02,
    mark: "star5",
    bg: "seaside",
    reg: "nor",
    lp: "l",
    tag: t("Gold mine island of exiled artists|Isla minera de artistas exiliados|Île aurifère des artistes exilés|流された芸能と金山の島"),
    fact: t(
      "Sado's gold funded the shogunate for 250 years. Exiles brought courtly arts with them, which is why this remote island preserves noh theatre stages in village after village.|El oro de Sado financió al shogunato 250 años. Los desterrados trajeron artes cortesanas: por eso esta isla remota conserva escenarios de nō pueblo tras pueblo.|L'or de Sado finança le shogunat 250 ans. Les exilés y apportèrent les arts de cour : d'où les scènes de nō conservées village après village.|佐渡の金は250年にわたり幕府を支えた。流された人々が都の芸能を持ち込んだため、集落ごとに能舞台が残る。",
    ),
    props: [
      prop("Gold Mine Tunnel|Túnel de la mina|Galerie de la mine d'or|金山の坑道", 300, 62),
      prop("Tub Boat Quay|Muelle de las barcas|Quai des barques-cuves|たらい舟の桟橋", 190, 40),
    ],
  },
  oki: {
    n: t("Oki|Oki|Oki|隠岐"),
    lo: 133.32,
    la: 36.2,
    mark: "torii_wood",
    bg: "seaside",
    reg: "kin",
    lp: "l",
    tag: t("Where an emperor was banished|Adonde desterraron a un emperador|Où fut banni un empereur|天皇が流された島"),
    fact: t(
      "Emperor Go-Toba was exiled here in 1221 and died without returning. The islands' bullfighting, in which two bulls lock horns, is said to have begun as entertainment for him.|El emperador Go-Toba fue desterrado aquí en 1221 y murió sin volver. Las corridas de toros de las islas, donde dos toros luchan, nacieron para entretenerlo.|L'empereur Go-Toba y fut exilé en 1221 et mourut sans revenir. Les combats de taureaux des îles seraient nés pour le distraire.|1221年に後鳥羽上皇が配流され、還ることなく崩御した。牛と牛が角を合わせる牛突きは、上皇を慰めるために始まったと伝わる。",
    ),
    props: [
      prop("Bull Sumo Ring|Ruedo de toros|Arène des taureaux|牛突きの土俵", 230, 48),
      prop("Sea Cliff Boat|Barco de los acantilados|Bateau des falaises|国賀海岸の遊覧船", 210, 44),
    ],
  },
  tsushima: {
    n: t("Tsushima|Tsushima|Tsushima|対馬"),
    lo: 129.29,
    la: 34.2,
    mark: "castle_stone",
    bg: "forest",
    reg: "kyu",
    lp: "l",
    tag: t("The stepping stone to the continent|El peldaño hacia el continente|Le tremplin vers le continent|大陸への足がかり"),
    fact: t(
      "Closer to Korea than to Kyūshū, Tsushima handled diplomacy with the continent for centuries and bore the brunt of the Mongol invasions of 1274 and 1281.|Más cerca de Corea que de Kyūshū, Tsushima gestionó la diplomacia continental durante siglos y sufrió las invasiones mongolas de 1274 y 1281.|Plus proche de la Corée que de Kyūshū, Tsushima géra la diplomatie continentale des siècles durant et subit les invasions mongoles de 1274 et 1281.|九州より朝鮮半島に近く、何世紀も大陸との外交を担った。1274年と1281年の元寇では最初の戦場となった。",
    ),
    props: [
      prop("Border Watchtower|Atalaya fronteriza|Tour de guet frontalière|国境の見張り台", 250, 52),
      prop("Anago Fishing Boat|Barco de anguilas|Bateau à congres|穴子漁船", 210, 44),
    ],
  },
  goto: {
    n: t("Gotō|Gotō|Gotō|五島"),
    lo: 128.84,
    la: 32.7,
    mark: "church",
    bg: "seaside",
    reg: "kyu",
    lp: "l",
    tag: t("Churches of the hidden Christians|Iglesias de los cristianos ocultos|Églises des chrétiens cachés|潜伏キリシタンの教会群"),
    fact: t(
      "Christians fleeing persecution settled these islands and kept their faith in secret for 250 years. The churches they built after the ban lifted are now World Heritage.|Cristianos que huían de la persecución poblaron estas islas y guardaron su fe en secreto 250 años. Las iglesias que alzaron tras el fin de la prohibición son Patrimonio Mundial.|Des chrétiens fuyant la persécution peuplèrent ces îles et gardèrent la foi en secret 250 ans. Les églises bâties après la levée de l'interdit sont classées.|迫害を逃れたキリシタンが移り住み、250年にわたり信仰を隠し通した。禁教が解けてから建てた教会群は世界遺産となっている。",
    ),
    props: [
      prop("Stone Church|Iglesia de piedra|Église de pierre|石造りの教会", 260, 54),
      prop("Udon Workshop|Taller de udon|Atelier d'udon|五島うどんの工房", 200, 42),
    ],
  },
  yakushima: {
    n: t("Yakushima|Yakushima|Yakushima|屋久島"),
    lo: 130.5,
    la: 30.36,
    mark: "star5",
    bg: "forest",
    reg: "kyu",
    lp: "r",
    tag: t("Cedars that outlive empires|Cedros que sobreviven a imperios|Des cèdres qui survivent aux empires|千年杉の森"),
    fact: t(
      "It rains here \"thirty-five days a month\", as the saying goes, feeding cedars thousands of years old. Japan's first natural World Heritage site.|Aquí llueve «treinta y cinco días al mes», dice el dicho, alimentando cedros milenarios. Fue el primer Patrimonio Natural de Japón.|Il y pleut « trente-cinq jours par mois », dit-on, nourrissant des cèdres millénaires. Premier site naturel japonais classé au patrimoine mondial.|「ひと月に三十五日雨が降る」と言われる多雨が、樹齢数千年の杉を育てた。日本初の世界自然遺産。",
    ),
    props: [
      prop("Cedar Forest Trail|Sendero de los cedros|Sentier des cèdres|杉の森の登山道", 280, 58),
      prop("Flying Fish Quay|Muelle de peces voladores|Quai des poissons volants|トビウオの港", 200, 42),
    ],
  },
  tanegashima: {
    n: t("Tanegashima|Tanegashima|Tanegashima|種子島"),
    lo: 130.96,
    la: 30.62,
    mark: "star5",
    bg: "seaside",
    reg: "kyu",
    lp: "r",
    tag: t("Guns then, rockets now|Antes arcabuces, ahora cohetes|Jadis les arquebuses, aujourd'hui les fusées|鉄砲とロケットの島"),
    fact: t(
      "A Portuguese ship blown off course in 1543 brought the first firearms to Japan, and local smiths copied them within a year. Today Japan launches its rockets from the same island.|Un barco portugués desviado en 1543 trajo las primeras armas de fuego a Japón, copiadas por herreros locales en un año. Hoy Japón lanza sus cohetes desde la misma isla.|Un navire portugais dérouté en 1543 apporta les premières armes à feu au Japon ; les forgerons locaux les copièrent en un an. Aujourd'hui le Japon y lance ses fusées.|1543年に漂着したポルトガル船が日本へ初めて鉄砲を伝え、島の鍛冶はわずか1年で複製した。今は同じ島からロケットが打ち上げられる。",
    ),
    props: [
      prop("Rocket Launch Pad|Plataforma de lanzamiento|Pas de tir|ロケット発射場", 320, 66),
      prop("Matchlock Smithy|Forja de arcabuces|Forge d'arquebuses|鉄砲鍛冶", 220, 46),
    ],
  },
  miyakojima: {
    n: t("Miyakojima|Miyakojima|Miyakojima|宮古島"),
    lo: 125.28,
    la: 24.8,
    mark: "shurigate",
    bg: "subtropic",
    reg: "kyu",
    lp: "l",
    tag: t("Coral island without a river|Isla de coral sin ríos|Île corallienne sans rivière|川のない珊瑚の島"),
    fact: t(
      "The island is raised coral, so rain sinks straight through and there are no rivers — drinking water comes from an underground dam. Its beaches rank among Japan's clearest.|La isla es coral elevado: la lluvia se filtra y no hay ríos; el agua potable viene de una presa subterránea. Sus playas están entre las más claras de Japón.|L'île est un corail soulevé : la pluie s'infiltre, aucun cours d'eau ; l'eau potable vient d'un barrage souterrain. Ses plages comptent parmi les plus claires du Japon.|隆起珊瑚礁のため雨が地下に浸み、川が無い。飲み水は地下ダムで賄う。日本有数の透明度を誇る海が広がる。",
    ),
    props: [
      prop("Coral Beach Resort|Resort de playa|Complexe de plage|珊瑚のビーチリゾート", 300, 62),
      prop("Underground Dam|Presa subterránea|Barrage souterrain|地下ダム", 240, 50),
    ],
  },
  ishigaki: {
    n: t("Ishigaki|Ishigaki|Ishigaki|石垣島"),
    lo: 124.16,
    la: 24.34,
    mark: "shurigate",
    bg: "subtropic",
    reg: "kyu",
    lp: "r",
    tag: t("Gateway to the far south|Puerta del sur lejano|Porte de l'extrême sud|南の果ての玄関口"),
    fact: t(
      "Closer to Taiwan than to Okinawa's main island, Ishigaki is the base for the Yaeyama islands. Its black cattle and star-sand beaches draw visitors year round.|Más cerca de Taiwán que de la isla principal de Okinawa, Ishigaki es la base de las Yaeyama. Su ternera negra y sus playas de arena-estrella atraen todo el año.|Plus proche de Taïwan que de l'île principale d'Okinawa, Ishigaki dessert les Yaeyama. Son bœuf noir et ses plages de sable-étoile attirent toute l'année.|沖縄本島より台湾に近く、八重山諸島の玄関口。石垣牛と星砂の浜が一年中人を集める。",
    ),
    props: [
      prop("Black Cattle Ranch|Rancho de ternera negra|Élevage de bœuf noir|石垣牛の牧場", 280, 58),
      prop("Star Sand Beach|Playa de arena-estrella|Plage au sable-étoile|星砂の浜", 230, 48),
    ],
  },
};

/**
 * 島をつなぐ航路(第3要素の `"sea"` が航路であることを示す)。
 * 伊豆諸島は南へ数珠つなぎ、南西諸島は九州から沖縄へ渡る形にしている。
 */
export const JAPAN_ISLAND_EDGES = [
  // 伊豆諸島・小笠原(東京から南へ)
  ["chiba", "oshima", "sea"],
  ["oshima", "hachijojima", "sea"],
  ["hachijojima", "chichijima", "sea"],
  // 日本海側
  ["niigata", "sado", "sea"],
  ["matsue", "oki", "sea"],
  // 九州周辺
  ["fukuoka", "tsushima", "sea"],
  ["nagasaki", "goto", "sea"],
  ["kagoshima", "tanegashima", "sea"],
  ["tanegashima", "yakushima", "sea"],
  // 南西諸島(屋久島 → 奄美 → 沖縄 → 宮古 → 石垣)
  ["yakushima", "amami", "sea"],
  ["amami", "naha", "sea"],
  ["naha", "miyakojima", "sea"],
  ["miyakojima", "ishigaki", "sea"],
];
