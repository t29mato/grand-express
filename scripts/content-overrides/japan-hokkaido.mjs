/**
 * 北海道の都市。
 *
 * legacy は札幌・函館の2都市、そこへ旭川・釧路を足しただけで、本州の県ひとつ
 * ぶんの面積しかない土地に4都市という粗さだった(北海道は本州の約1/3の面積が
 * ある)。道東・道北・道南をそれぞれ歩けるよう、主要都市を追加する。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function prop(name, cost, income) {
  return { n: t(name), cost, inc: income };
}

export const JAPAN_HOKKAIDO_CITIES = {
  otaru: {
    n: t("Otaru|Otaru|Otaru|小樽"),
    lo: 141.0,
    la: 43.19,
    mark: "clocktower",
    bg: "port",
    reg: "nor",
    lp: "l",
    tag: t("Canal town of herring money|Ciudad del canal y el arenque|Ville du canal et du hareng|鰊で栄えた運河の町"),
    fact: t(
      "Herring shoals made this port rich enough to be called the Wall Street of the North, until the fish stopped coming in the 1950s. The gaslit canal and stone warehouses are what the boom left behind.|Los bancos de arenque enriquecieron tanto al puerto que lo llamaban la Wall Street del Norte, hasta que en los años 50 los peces dejaron de llegar. El canal y los almacenes de piedra son lo que quedó.|Les bancs de harengs enrichirent tant ce port qu'on l'appelait le Wall Street du Nord, jusqu'à ce que le poisson disparaisse dans les années 1950. Le canal et les entrepôts de pierre en témoignent.|鰊の群れがこの港を「北のウォール街」と呼ばれるほど富ませたが、1950年代に魚は来なくなった。ガス灯の運河と石造倉庫はその名残である。",
    ),
    props: [
      prop("Canal Warehouse|Almacén del canal|Entrepôt du canal|運河の倉庫", 260, 54),
      prop("Glass Workshop|Taller de vidrio|Atelier de verre|硝子工房", 220, 46),
    ],
  },
  niseko: {
    n: t("Niseko|Niseko|Niseko|ニセコ"),
    lo: 140.69,
    la: 42.8,
    mark: "fuji",
    bg: "snowcity",
    reg: "nor",
    lp: "l",
    tag: t("The lightest snow on earth|La nieve más ligera del mundo|La neige la plus légère du monde|世界一軽い雪"),
    fact: t(
      "Siberian wind crossing the Sea of Japan dumps up to fifteen metres of exceptionally dry snow here each winter. Australian skiers arrived in the 1990s and never left.|El viento siberiano que cruza el mar del Japón deja hasta quince metros de nieve muy seca cada invierno. Los esquiadores australianos llegaron en los 90 y se quedaron.|Le vent sibérien traversant la mer du Japon dépose jusqu'à quinze mètres de neige très sèche chaque hiver. Les skieurs australiens sont arrivés dans les années 1990 et ne sont jamais repartis.|シベリアからの風が日本海を渡って、毎冬15mにも達する極めて乾いた雪を降らせる。1990年代に来たオーストラリア人スキーヤーはそのまま住み着いた。",
    ),
    props: [
      prop("Powder Ski Lodge|Refugio de esquí|Chalet de ski|パウダースノーの宿", 300, 62),
      prop("Mountain Onsen|Onsen de montaña|Onsen de montagne|山の温泉", 240, 50),
    ],
  },
  muroran: {
    n: t("Muroran|Muroran|Muroran|室蘭"),
    // 絵鞆岬の鉤形の先(140.97, 42.32)に置くとマーカーの押し離しで海へ出る。
    // 市街の中心である東室蘭側に寄せてある。
    lo: 141.02,
    la: 42.35,
    mark: "steam",
    bg: "port",
    reg: "nor",
    lp: "r",
    tag: t("Steel furnaces above the sea|Altos hornos sobre el mar|Hauts fourneaux au-dessus de la mer|海に臨む製鉄の街"),
    fact: t(
      "Coal from nearby mines and a deep ice-free harbour made this Hokkaidō's steel town. Its factories lit at night are now a tourist attraction in their own right.|El carbón de las minas cercanas y un puerto profundo sin hielo lo convirtieron en la ciudad del acero de Hokkaidō. Sus fábricas iluminadas de noche son hoy una atracción.|Le charbon des mines voisines et un port profond libre de glace en firent la ville de l'acier de Hokkaidō. Ses usines illuminées la nuit sont devenues une attraction.|近くの炭鉱の石炭と不凍の深い港が、ここを北海道の製鉄の街にした。夜に灯る工場群は今や観光名所である。",
    ),
    props: [
      prop("Blast Furnace|Alto horno|Haut fourneau|高炉", 280, 58),
      prop("Cape Lighthouse|Faro del cabo|Phare du cap|地球岬の灯台", 200, 42),
    ],
  },
  obihiro: {
    n: t("Obihiro|Obihiro|Obihiro|帯広"),
    lo: 143.2,
    la: 42.92,
    mark: "ricebale",
    bg: "ricefield",
    reg: "nor",
    lp: "r",
    tag: t("Farm belt and draught-horse races|Cinturón agrícola y carreras de tiro|Ceinture agricole et courses de trait|畑作地帯とばんえい競馬"),
    fact: t(
      "The Tokachi plain grows a large share of Japan's beans, potatoes and beet sugar. Obihiro holds the world's only races where draught horses drag iron sledges up sand ramps.|La llanura de Tokachi produce buena parte de las alubias, patatas y azúcar de remolacha de Japón. Aquí se corren las únicas carreras de caballos de tiro arrastrando trineos de hierro.|La plaine de Tokachi produit une grande part des haricots, pommes de terre et sucre de betterave du Japon. On y court les seules courses de chevaux de trait tirant des traîneaux de fer.|十勝平野は日本の豆・じゃがいも・てん菜糖の多くを産する。帯広には、輓馬が鉄のそりを引いて砂の坂を登る世界唯一の競馬がある。",
    ),
    props: [
      prop("Bean Granary|Granero de alubias|Grenier à haricots|豆の倉", 240, 50),
      prop("Draught Horse Track|Pista de caballos de tiro|Piste des chevaux de trait|ばんえい競馬場", 260, 54),
    ],
  },
  furano: {
    n: t("Furano|Furano|Furano|富良野"),
    lo: 142.38,
    la: 43.34,
    mark: "garden",
    bg: "valley2",
    reg: "nor",
    lp: "l",
    tag: t("Lavender rows in a mountain basin|Hileras de lavanda en un valle|Rangs de lavande dans un bassin|山あいのラベンダー畑"),
    fact: t(
      "Lavender was grown here for perfume oil until synthetics killed the trade in the 1970s. One farmer kept his field, a railway poster made it famous, and tourism saved the crop.|Aquí se cultivaba lavanda para perfume hasta que los sintéticos arruinaron el negocio en los 70. Un granjero conservó su campo, un cartel de tren lo hizo famoso y el turismo salvó el cultivo.|On y cultivait la lavande pour le parfum jusqu'à ce que les synthétiques ruinent ce commerce dans les années 1970. Un fermier garda son champ, une affiche de train le rendit célèbre, le tourisme sauva la culture.|香料用のラベンダー栽培は1970年代に合成香料に押されて壊滅した。一人の農家が畑を残し、鉄道のポスターで有名になり、観光が作物を救った。",
    ),
    props: [
      prop("Lavender Field|Campo de lavanda|Champ de lavande|ラベンダー畑", 230, 48),
      prop("Cheese Dairy|Quesería|Fromagerie|チーズ工房", 200, 42),
    ],
  },
  kitami: {
    n: t("Kitami|Kitami|Kitami|北見"),
    lo: 143.9,
    la: 43.8,
    mark: "garden",
    bg: "valley2",
    reg: "nor",
    lp: "r",
    tag: t("Onion capital of the north|Capital de la cebolla del norte|Capitale de l'oignon du nord|北のたまねぎの都"),
    fact: t(
      "A quarter of Japan's onions grow around this inland city, whose dry, sunny summers suit the crop. It once led the world in peppermint oil, supplying most of the global supply before the war.|Un cuarto de las cebollas de Japón crece en torno a esta ciudad interior, de veranos secos y soleados. Antes de la guerra lideraba el mundo en aceite de menta.|Un quart des oignons du Japon poussent autour de cette ville intérieure aux étés secs et ensoleillés. Avant-guerre, elle dominait le marché mondial de l'essence de menthe.|日本のたまねぎの4分の1がこの内陸の街の周りで穫れる。乾いて晴れた夏が適しているためだ。戦前は世界のハッカ油の大半を供給していた。",
    ),
    props: [
      prop("Onion Warehouse|Almacén de cebollas|Entrepôt d'oignons|たまねぎの倉庫", 220, 46),
      prop("Mint Distillery|Destilería de menta|Distillerie de menthe|ハッカ蒸留所", 240, 50),
    ],
  },
  abashiri: {
    n: t("Abashiri|Abashiri|Abashiri|網走"),
    lo: 144.27,
    la: 44.02,
    mark: "castle_stone",
    bg: "snowcity",
    reg: "nor",
    lp: "r",
    tag: t("Drift ice and a famous prison|Hielo a la deriva y una prisión célebre|Glace dérivante et prison célèbre|流氷と監獄の町"),
    fact: t(
      "Every February pack ice drifts down from the Amur river and locks the coast solid. The prison built here in 1890 held convicts who cut the roads across Hokkaidō, many dying at the work.|Cada febrero el hielo baja desde el río Amur y sella la costa. La prisión de 1890 albergó a presos que abrieron las carreteras de Hokkaidō, muchos murieron en la obra.|Chaque février, la banquise descend du fleuve Amour et scelle la côte. Le bagne de 1890 y détenait les forçats qui ouvrirent les routes de Hokkaidō, beaucoup y périrent.|毎年2月、アムール川から流氷が押し寄せて海岸を閉ざす。1890年の監獄には、北海道の道路を切り開き多くが命を落とした囚人が収容された。",
    ),
    props: [
      prop("Drift Ice Icebreaker|Rompehielos|Brise-glace|流氷砕氷船", 280, 58),
      prop("Prison Museum|Museo de la prisión|Musée du bagne|監獄博物館", 230, 48),
    ],
  },
  shiretoko: {
    n: t("Shiretoko|Shiretoko|Shiretoko|知床"),
    lo: 145.05,
    la: 44.02,
    mark: "volcano_m",
    bg: "forest",
    reg: "nor",
    lp: "r",
    tag: t("The end of the earth|El fin de la tierra|Le bout du monde|地の果て"),
    fact: t(
      "Its Ainu name means \"the place where the earth protrudes\", and no road reaches the peninsula's tip. Brown bears, sea eagles and salmon share one of the densest food chains on the planet.|Su nombre ainu significa «donde la tierra sobresale», y ninguna carretera llega a la punta. Osos pardos, pigargos y salmones forman una de las cadenas alimentarias más densas del planeta.|Son nom aïnou signifie « là où la terre s'avance », et aucune route n'atteint la pointe. Ours bruns, pygargues et saumons forment l'une des chaînes alimentaires les plus denses du globe.|アイヌ語で「地の突き出たところ」を意味し、半島の先端まで道路は通じていない。ヒグマ・オジロワシ・鮭が地球有数の濃密な食物連鎖をなす。",
    ),
    props: [
      prop("Wildlife Cruise|Crucero de fauna|Croisière faunique|野生動物クルーズ", 270, 56),
      prop("Cape Onsen Falls|Cascada termal|Cascade thermale|カムイワッカの湯の滝", 220, 46),
    ],
  },
  wakkanai: {
    n: t("Wakkanai|Wakkanai|Wakkanai|稚内"),
    lo: 141.68,
    la: 45.42,
    mark: "katsuo",
    bg: "seaside",
    reg: "nor",
    lp: "l",
    tag: t("Japan's northernmost port|El puerto más al norte de Japón|Le port le plus septentrional du Japon|日本最北の港"),
    fact: t(
      "On a clear day you can see Sakhalin, 43 km away, from the northern cape. Until 1945 a ferry ran there and Wakkanai was a domestic, not an international, port.|En un día claro se ve Sajalín, a 43 km, desde el cabo norte. Hasta 1945 había un ferry y Wakkanai era un puerto interior, no internacional.|Par temps clair, on voit Sakhaline, à 43 km, depuis le cap nord. Jusqu'en 1945 un ferry y menait et Wakkanai était un port intérieur, non international.|晴れた日には宗谷岬から43km先の樺太が見える。1945年までは連絡船が通い、稚内は国際港ではなく国内航路の港だった。",
    ),
    props: [
      prop("Northern Cape Inn|Posada del cabo norte|Auberge du cap nord|宗谷岬の宿", 230, 48),
      prop("Scallop Quay|Muelle de vieiras|Quai des coquilles|帆立の岸壁", 240, 50),
    ],
  },
  noboribetsu: {
    n: t("Noboribetsu|Noboribetsu|Noboribetsu|登別"),
    // 室蘭と近すぎると、押し離しで室蘭が噴火湾へ押し出される。
    // 温泉街のある内陸側(北東)に取ってある。
    lo: 141.22,
    la: 42.48,
    mark: "onsen",
    bg: "volcano",
    reg: "nor",
    lp: "r",
    tag: t("Hell Valley's boiling springs|Los manantiales del Valle del Infierno|Les sources du Val de l'Enfer|地獄谷の湯けむり"),
    fact: t(
      "Eleven different kinds of hot water rise from one small valley, which is unusual anywhere in the world. The steaming crater floor has been called Hell Valley for centuries.|Once tipos distintos de agua termal brotan de un solo valle pequeño, algo insólito en el mundo. El cráter humeante se llama Valle del Infierno desde hace siglos.|Onze types d'eau thermale jaillissent d'une seule petite vallée, chose rare au monde. Le fond de cratère fumant s'appelle le Val de l'Enfer depuis des siècles.|ひとつの小さな谷から11種類もの泉質が湧く、世界的にも珍しい場所。湯気を上げる火口原は何世紀も「地獄谷」と呼ばれてきた。",
    ),
    props: [
      prop("Hell Valley Ryokan|Ryokan del Valle|Ryokan du Val|地獄谷の旅館", 290, 60),
      prop("Bear Park|Parque de osos|Parc aux ours|クマ牧場", 210, 44),
    ],
  },
};

/**
 * 北海道内の路線。既存の 札幌—旭川—釧路 という細い1本を、
 * 道南(函館—室蘭—登別—ニセコ—小樽)・道東(帯広・北見・網走・知床)・
 * 道北(稚内)へ枝分かれさせる。
 */
export const JAPAN_HOKKAIDO_EDGES = [
  // 道南のループ
  ["hakodate", "muroran"],
  ["muroran", "noboribetsu"],
  ["noboribetsu", "niseko"],
  ["niseko", "otaru"],
  ["otaru", "sapporo"],
  // 道北
  ["asahikawa", "wakkanai"],
  // 道東(旭川から富良野・帯広へ、網走から知床へ)
  ["asahikawa", "furano"],
  ["furano", "obihiro"],
  ["obihiro", "kushiro"],
  ["asahikawa", "kitami"],
  ["kitami", "abashiri"],
  ["abashiri", "shiretoko"],
  ["shiretoko", "kushiro"],
];
