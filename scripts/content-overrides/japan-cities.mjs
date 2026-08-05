/**
 * 日本の追加都市。legacyの30都市では山陰・北陸・四国東部・南九州・道東などが
 * 空白だったため、地理的な空白を埋める都市を追加する。
 *
 * これは移行(legacyの再現)ではなく新規のコンテンツ追加なので、
 * `legacy/grand-express.html`(アーカイブ)は書き換えず、抽出後にマージする
 * (`scripts/content-overrides/index.mjs` 参照)。
 *
 * `mark`/`bg` は既存のものを再利用している(新規の絵を描き起こす代わりに、
 * 都市の性格に合うものを選ぶ)。
 */

/** `_t("en|es|fr|ja")` 相当。抽出済みデータと同じ {en,es,fr,ja} 形に展開する。 */
function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/** 物件定義 [名前, 価格, 四半期収入]。 */
function prop(name, cost, income) {
  return { n: t(name), cost, inc: income };
}

export const JAPAN_EXTRA_CITIES = {
  asahikawa: {
    n: t("Asahikawa|Asahikawa|Asahikawa|旭川"),
    lo: 142.36,
    la: 43.77,
    mark: "clocktower",
    bg: "snowcity",
    reg: "nor",
    lp: "r",
    tag: t("Snow country crossroads|Cruce del país de la nieve|Carrefour du pays de neige|雪国の十字路"),
    fact: t(
      "Hokkaidō's second city sits in a basin that swings between −41°C, the coldest ever recorded in Japan, and hot summers. Its zoo is famous for showing animals as they actually move.|La segunda ciudad de Hokkaidō está en una cuenca que oscila entre los −41 °C, el récord de frío de Japón, y veranos calurosos. Su zoo es célebre por mostrar a los animales en movimiento real.|La deuxième ville de Hokkaidō occupe un bassin oscillant entre −41 °C, record de froid du Japon, et des étés chauds. Son zoo est réputé montrer les animaux en mouvement réel.|北海道第2の都市。日本最低気温−41℃を記録した盆地で、夏は暑い。動物本来の動きを見せる旭山動物園で知られる。",
    ),
    props: [
      prop("Ramen Village|Aldea del ramen|Village du ramen|ラーメン村", 200, 42),
      prop("Winter Zoo|Zoo de invierno|Zoo d'hiver|冬の動物園", 260, 54),
    ],
  },
  kushiro: {
    n: t("Kushiro|Kushiro|Kushiro|釧路"),
    lo: 144.38,
    la: 42.98,
    mark: "katsuo",
    bg: "port",
    reg: "nor",
    lp: "r",
    tag: t("Marsh, fog and red-crowned cranes|Marisma, niebla y grullas|Marais, brume et grues du Japon|湿原と霧とタンチョウ"),
    fact: t(
      "Japan's largest marshland lies inland, home to the red-crowned crane once thought extinct here. Summer fog rolls off the cold current and swallows the port whole.|El mayor humedal de Japón alberga a la grulla de corona roja, que aquí se creyó extinta. La niebla veraniega de la corriente fría engulle el puerto.|La plus vaste zone humide du Japon abrite la grue à couronne rouge, jadis crue disparue ici. La brume d'été venue du courant froid avale le port.|日本最大の湿原が広がり、一度は絶滅したと思われたタンチョウが生きる。夏は寒流由来の霧が港を包む。",
    ),
    props: [
      prop("Fish Market|Mercado de pescado|Marché aux poissons|和商市場", 220, 46),
      prop("Marsh Boardwalk|Pasarela del marisma|Passerelle du marais|湿原の木道", 180, 38),
    ],
  },
  yamagata: {
    n: t("Yamagata|Yamagata|Yamagata|山形"),
    lo: 140.36,
    la: 38.24,
    mark: "onsen",
    bg: "valley2",
    reg: "nor",
    lp: "l",
    tag: t("Cherries, hot springs and stone steps|Cerezas, aguas termales y escaleras|Cerises, sources chaudes et marches|さくらんぼと温泉と石段"),
    fact: t(
      "Bashō climbed the 1,015 stone steps of Yamadera and wrote of cicadas boring into the rocks. The basin grows most of Japan's cherries.|Bashō subió los 1.015 escalones de Yamadera y escribió sobre cigarras perforando la roca. La cuenca produce la mayoría de las cerezas de Japón.|Bashō gravit les 1 015 marches de Yamadera et écrivit les cigales perçant le roc. Le bassin produit l'essentiel des cerises du Japon.|芭蕉が山寺の1015段を登り「岩にしみ入る蝉の声」と詠んだ地。盆地は日本一のさくらんぼ産地。",
    ),
    props: [
      prop("Cherry Orchard|Cerezal|Verger de cerisiers|さくらんぼ園", 240, 50),
      prop("Mountain Temple|Templo de montaña|Temple de montagne|山寺", 200, 42),
    ],
  },
  toyama: {
    n: t("Toyama|Toyama|Toyama|富山"),
    lo: 137.21,
    la: 36.7,
    mark: "garden",
    bg: "alps",
    reg: "kan",
    lp: "r",
    tag: t("Alpine wall above a deep bay|Muro alpino sobre una bahía|Mur alpin au-dessus d'une baie|深い湾に迫る立山連峰"),
    fact: t(
      "The Tateyama range rises 3,000 m barely 25 km from a bay 1,000 m deep. Spring buses run through snow corridors walls of 20 m high.|La cordillera Tateyama se alza 3.000 m a apenas 25 km de una bahía de 1.000 m de hondo. En primavera los autobuses cruzan corredores de nieve de 20 m.|La chaîne Tateyama culmine à 3 000 m à 25 km d'une baie profonde de 1 000 m. Au printemps, les bus traversent des couloirs de neige de 20 m.|立山連峰は水深1000mの富山湾からわずか25kmで3000m級に達する。春は高さ20mの雪の大谷をバスが走る。",
    ),
    props: [
      prop("Firefly Squid Boat|Barco de calamar luciérnaga|Bateau à calmars lucioles|ホタルイカ漁船", 230, 48),
      prop("Alpine Route Station|Estación de la ruta alpina|Gare de la route alpine|立山黒部の駅", 300, 62),
    ],
  },
  takayama: {
    n: t("Takayama|Takayama|Takayama|高山"),
    lo: 137.25,
    la: 36.15,
    mark: "yatai",
    bg: "alps",
    reg: "kan",
    lp: "l",
    tag: t("Carpenters' town in the mountains|Villa de carpinteros en la montaña|Ville de charpentiers en montagne|山あいの匠の町"),
    fact: t(
      "Hida carpenters were so skilled that the imperial court took them as tax instead of rice. Their descendants build the festival floats that still parade each spring.|Los carpinteros de Hida eran tan hábiles que la corte los aceptaba como impuesto en vez de arroz. Sus descendientes construyen las carrozas que desfilan cada primavera.|Les charpentiers de Hida étaient si habiles que la cour les prenait en guise d'impôt. Leurs descendants bâtissent les chars qui défilent au printemps.|飛騨の匠は米の代わりに税として都に徴用されたほどの腕前。その系譜が春の祭屋台を今も作る。",
    ),
    props: [
      prop("Morning Market|Mercado matinal|Marché du matin|朝市", 190, 40),
      prop("Festival Float Hall|Sala de carrozas|Halle des chars|屋台会館", 250, 52),
    ],
  },
  shizuoka: {
    n: t("Shizuoka|Shizuoka|Shizuoka|静岡"),
    lo: 138.38,
    la: 34.98,
    mark: "fuji",
    bg: "fujiview",
    reg: "kan",
    lp: "b",
    tag: t("Green tea under Mount Fuji|Té verde bajo el monte Fuji|Thé vert au pied du Fuji|富士を望む茶どころ"),
    fact: t(
      "Nearly 40% of Japan's tea grows on these slopes. Warm currents in Suruga Bay meet water 2,500 m deep, giving the port both sakura shrimp and deep-sea fish.|Casi el 40% del té japonés crece en estas laderas. La bahía de Suruga alcanza 2.500 m, dando al puerto gambas sakura y peces abisales.|Près de 40 % du thé japonais pousse sur ces pentes. La baie de Suruga atteint 2 500 m, offrant crevettes sakura et poissons abyssaux.|日本茶の約4割がこの斜面で育つ。水深2500mの駿河湾は桜えびと深海魚をもたらす。",
    ),
    props: [
      prop("Tea Plantation|Plantación de té|Plantation de thé|茶畑", 260, 54),
      prop("Sakura Shrimp Quay|Muelle de gambas|Quai aux crevettes|桜えびの港", 210, 44),
    ],
  },
  chiba: {
    n: t("Chiba|Chiba|Chiba|千葉"),
    lo: 140.12,
    la: 35.6,
    mark: "ferriswheel",
    bg: "coasttown",
    reg: "kan",
    lp: "r",
    tag: t("Peanuts, soy sauce and the gateway sky|Cacahuetes, soja y el cielo de entrada|Arachides, soja et ciel d'arrivée|落花生と醤油と空の玄関"),
    fact: t(
      "The Bōsō peninsula's mild winters made it Edo's kitchen garden, and its soy brewers still supply much of the country. Narita, Japan's main international gateway, sits inland.|Los inviernos suaves de Bōsō lo hicieron la huerta de Edo, y sus fábricas de soja aún surten al país. Narita, principal puerta internacional, está tierra adentro.|Les hivers doux de Bōsō en firent le potager d'Edo ; ses brasseries de soja fournissent encore le pays. Narita, principale porte internationale, est à l'intérieur.|温暖な房総は江戸の台所となり、醤油醸造は今も全国を支える。内陸には日本の空の玄関・成田がある。",
    ),
    props: [
      prop("Soy Sauce Brewery|Fábrica de salsa de soja|Brasserie de sauce soja|醤油蔵", 240, 50),
      prop("Seaside Ferris Wheel|Noria junto al mar|Grande roue du bord de mer|海辺の観覧車", 200, 42),
    ],
  },
  okayama: {
    n: t("Okayama|Okayama|Okayama|岡山"),
    lo: 133.92,
    la: 34.66,
    mark: "garden",
    bg: "citygreen",
    reg: "kin",
    lp: "b",
    tag: t("Peach boy's sunny province|La provincia soleada del niño melocotón|La province ensoleillée de Momotarō|晴れの国と桃太郎"),
    fact: t(
      "The province claims the legend of Momotarō, the boy born from a peach. It calls itself the Land of Sunshine for having the fewest rainy days in Japan.|La provincia reclama la leyenda de Momotarō, el niño nacido de un melocotón, y se llama Tierra del Sol por tener los días de lluvia más escasos de Japón.|La province revendique la légende de Momotarō, l'enfant né d'une pêche, et se dit Pays du Soleil, ayant le moins de jours de pluie du Japon.|桃から生まれた桃太郎伝説の地。雨の日が日本一少なく「晴れの国」を名乗る。",
    ),
    props: [
      prop("Kōrakuen Garden|Jardín Kōrakuen|Jardin Kōrakuen|後楽園", 300, 62),
      prop("Peach Orchard|Melocotonar|Verger de pêchers|桃畑", 220, 46),
    ],
  },
  matsue: {
    n: t("Matsue|Matsue|Matsue|松江"),
    lo: 133.05,
    la: 35.47,
    mark: "castle_black",
    bg: "castletown",
    reg: "kin",
    lp: "l",
    tag: t("Water castle of the myth coast|Castillo de agua de la costa mítica|Château d'eau de la côte des mythes|神話の海辺の水の城"),
    fact: t(
      "Built between a lagoon and a lake, Matsue is one of only twelve castles with an original keep. Nearby Izumo shrine is where Japan's gods are said to gather each autumn.|Entre una laguna y un lago, Matsue conserva una de las doce torres originales. En el cercano santuario de Izumo se reúnen los dioses cada otoño.|Entre lagune et lac, Matsue garde l'un des douze donjons d'origine. Au sanctuaire d'Izumo voisin, les dieux se réuniraient chaque automne.|汽水湖と宍道湖に挟まれた城下町。現存12天守のひとつ。近くの出雲大社には神無月に全国の神が集うとされる。",
    ),
    props: [
      prop("Lake Sunset Boat|Barco del atardecer|Bateau du couchant|宍道湖の遊覧船", 210, 44),
      prop("Original Keep|Torre del homenaje|Donjon d'origine|現存天守", 290, 60),
    ],
  },
  tottori: {
    n: t("Tottori|Tottori|Tottori|鳥取"),
    lo: 134.24,
    la: 35.5,
    mark: "star5",
    bg: "seaside",
    reg: "kin",
    lp: "r",
    tag: t("Dunes on the Japan Sea|Dunas del mar de Japón|Dunes de la mer du Japon|日本海の砂丘"),
    fact: t(
      "Sand carried down by the Sendai river and pushed back by winter waves has built dunes 50 m high and 16 km long — a desert edge in a rainy country.|La arena del río Sendai, empujada por el oleaje invernal, ha formado dunas de 50 m y 16 km — un borde de desierto en un país lluvioso.|Le sable du fleuve Sendai, repoussé par la houle d'hiver, forme des dunes de 50 m sur 16 km — un bout de désert en pays pluvieux.|千代川が運び冬の波が押し戻した砂が、高さ50m・長さ16kmの砂丘をつくった。雨の国の砂漠。",
    ),
    props: [
      prop("Dune Camel Ride|Paseo en camello|Balade à dos de chameau|砂丘のらくだ", 180, 38),
      prop("Pear Orchard|Peral|Verger de poiriers|梨園", 230, 48),
    ],
  },
  takamatsu: {
    n: t("Takamatsu|Takamatsu|Takamatsu|高松"),
    lo: 134.05,
    la: 34.35,
    mark: "garden",
    bg: "seaside",
    reg: "kin",
    lp: "b",
    tag: t("Udon and island-dotted sea|Udon y un mar sembrado de islas|Udon et mer parsemée d'îles|うどんと島々の海"),
    fact: t(
      "Kagawa is Japan's smallest prefecture and eats the most udon; the dry climate that once failed rice suited wheat instead. Ferries fan out to art islands across the Inland Sea.|Kagawa es la prefectura más pequeña y la que más udon come: el clima seco que arruinaba el arroz favoreció el trigo. Los ferris salen hacia las islas del arte.|Kagawa, plus petite préfecture, mange le plus d'udon : le climat sec, mauvais pour le riz, convenait au blé. Les ferries desservent les îles d'art.|日本最小の香川県はうどん消費日本一。米に向かない乾いた気候が小麦を育てた。瀬戸内のアートの島へ船が出る。",
    ),
    props: [
      prop("Udon Counter|Mostrador de udon|Comptoir à udon|うどん店", 170, 36),
      prop("Ritsurin Garden|Jardín Ritsurin|Jardin Ritsurin|栗林公園", 290, 60),
    ],
  },
  tokushima: {
    n: t("Tokushima|Tokushima|Tokushima|徳島"),
    lo: 134.55,
    la: 34.07,
    mark: "kanto",
    bg: "coasttown",
    reg: "kin",
    lp: "r",
    tag: t("Whirlpools and the dancing fool|Remolinos y el baile del loco|Tourbillons et la danse des fous|渦潮と阿波おどり"),
    fact: t(
      "Tides squeezing through the Naruto strait spin whirlpools up to 20 m across. In August the whole city dances the Awa Odori: \"the dancing fool and the watching fool\".|Las mareas del estrecho de Naruto giran remolinos de hasta 20 m. En agosto la ciudad baila el Awa Odori: «tonto el que baila, tonto el que mira».|Les marées du détroit de Naruto forment des tourbillons de 20 m. En août, la ville danse l'Awa Odori : « fou qui danse, fou qui regarde ».|鳴門海峡の潮流は直径20mに達する渦潮を生む。8月は街中が阿波おどり――「踊る阿呆に見る阿呆」。",
    ),
    props: [
      prop("Whirlpool Boat|Barco de los remolinos|Bateau des tourbillons|渦潮観潮船", 220, 46),
      prop("Indigo Dyehouse|Tintorería de índigo|Teinturerie d'indigo|藍染工房", 240, 50),
    ],
  },
  miyazaki: {
    n: t("Miyazaki|Miyazaki|Miyazaki|宮崎"),
    lo: 131.42,
    la: 31.91,
    mark: "torii_wood",
    bg: "subtropic",
    reg: "kyu",
    lp: "r",
    tag: t("Sunlit coast of the old myths|Costa soleada de los viejos mitos|Côte ensoleillée des vieux mythes|日向神話の陽ざしの海岸"),
    fact: t(
      "Hyūga means \"facing the sun\". The Kojiki places the descent of the imperial ancestor on these shores, and the palm-lined coast made it Japan's honeymoon capital in the 1960s.|Hyūga significa «de cara al sol». El Kojiki sitúa aquí el descenso del ancestro imperial; su costa de palmeras fue capital de las lunas de miel en los 60.|Hyūga signifie « face au soleil ». Le Kojiki y place la descente de l'ancêtre impérial ; sa côte de palmiers fut la capitale des lunes de miel des années 60.|日向は「日に向かう」の意。古事記は天孫降臨をこの地とする。フェニックス並木の海岸は1960年代の新婚旅行の聖地だった。",
    ),
    props: [
      prop("Mango Greenhouse|Invernadero de mangos|Serre à mangues|マンゴー農園", 250, 52),
      prop("Shrine in the Cave|Santuario en la cueva|Sanctuaire de la grotte|鵜戸神宮", 210, 44),
    ],
  },
  saga: {
    n: t("Saga|Saga|Saga|佐賀"),
    lo: 130.3,
    la: 33.25,
    mark: "church",
    bg: "ricefield",
    reg: "kyu",
    lp: "l",
    tag: t("Where Japanese porcelain began|Donde nació la porcelana japonesa|Là où naquit la porcelaine japonaise|磁器発祥の地"),
    fact: t(
      "Korean potters brought here after the 1590s invasions found kaolin at Arita and fired Japan's first porcelain, which Dutch traders soon carried to Europe.|Alfareros coreanos traídos tras las invasiones de 1590 hallaron caolín en Arita y cocieron la primera porcelana japonesa, que los holandeses llevaron a Europa.|Des potiers coréens amenés après les invasions de 1590 trouvèrent du kaolin à Arita et cuisirent la première porcelaine japonaise, exportée par les Hollandais.|1590年代の朝鮮出兵で連れられた陶工が有田で磁石を見つけ、日本初の磁器を焼いた。オランダ商人が欧州へ運んだ。",
    ),
    props: [
      prop("Arita Kiln|Horno de Arita|Four d'Arita|有田の窯", 280, 58),
      prop("Balloon Field|Campo de globos|Champ de montgolfières|バルーン会場", 190, 40),
    ],
  },
};

/** 追加都市をつなぐ路線(既存の都市とも接続する)。 */
export const JAPAN_EXTRA_EDGES = [
  ["sapporo", "asahikawa"],
  ["asahikawa", "kushiro"],
  ["sendai", "yamagata"],
  ["yamagata", "niigata"],
  ["kanazawa", "toyama"],
  ["toyama", "takayama"],
  ["takayama", "matsumoto"],
  ["nagoya", "shizuoka"],
  ["shizuoka", "hakone"],
  ["tokyo", "chiba"],
  ["himeji", "okayama"],
  ["okayama", "hiroshima"],
  ["okayama", "takamatsu"],
  ["takamatsu", "tokushima"],
  ["tokushima", "kochi"],
  ["matsue", "hiroshima"],
  ["matsue", "tottori"],
  ["tottori", "himeji"],
  ["fukuoka", "saga"],
  ["saga", "nagasaki"],
  ["kagoshima", "miyazaki"],
  ["miyazaki", "beppu"],
];
