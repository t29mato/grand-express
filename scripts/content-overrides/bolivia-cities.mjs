/**
 * ボリビアの追加都市(フェーズ1の最初の5件)。
 *
 * ボリビアは最初に作った盤面で、都市30・路線37しかない。1都市あたり2.47本と
 * 分かれ道が少なく、「マップがシンプルすぎる」と言われる直接の原因になっている
 * (`docs/50-authoring/11-bolivia-enrichment-wbs.md`)。
 *
 * legacy(アーカイブ)は書き換えず、抽出後にこの層でマージする
 * (`scripts/content-overrides/index.mjs` 参照)。
 *
 * **路線は末尾に足すだけにしてある。** 既存の路線を消したり間に挟んだりすると
 * それより後ろ全部の添字がずれ、`edgeIndex % 2` で決まる折れる向きと、
 * `h32(edgeIndex * 97 + k)` で決まるマスの種類が、無関係な路線まで変わる。
 * `extraEdges` は push されるだけなので、既存37本の並びは動かない。
 *
 * `mark` / `bg` は既存のキーから選んでいる(新しい絵を描き起こさない)。
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

export const BOLIVIA_EXTRA_CITIES = {
  challapata: {
    n: t("Challapata|Challapata|Challapata|チャジャパタ"),
    lo: -66.58,
    la: -18.9,
    mark: "boat",
    bg: "altiplano",
    reg: "alt",
    lp: "r",
    tag: t("The shore of a lake that left|La orilla de un lago que se fue|La rive d'un lac qui s'en est allé|消えた湖のほとり"),
    fact: t(
      "The Desaguadero river drains Lake Titicaca and ends here, at Lake Poopó — it never reaches the sea, so whatever the water carries down stays on the altiplano. That is why this plateau tastes of salt. In 2015 the lake evaporated away entirely, and the fishing families had to leave.|El río Desaguadero desagua el Titicaca y muere aquí, en el lago Poopó: nunca llega al mar, así que todo lo que arrastra el agua se queda en el altiplano. Por eso esta meseta sabe a sal. En 2015 el lago se evaporó por completo y las familias pescadoras tuvieron que marcharse.|Le Desaguadero, émissaire du Titicaca, s'achève ici, au lac Poopó : il n'atteint jamais la mer, et tout ce que l'eau charrie reste sur l'altiplano. D'où le goût de sel de ce plateau. En 2015, le lac s'est entièrement évaporé et les familles de pêcheurs ont dû partir.|チチカカ湖から流れ出たデサグアデーロ川は、ここポーポー湖で行き止まりになる。海に届かないので、水が運んできたものはアルティプラーノに残り続ける。この高原が塩の味をしているのはそのためだ。2015年に湖は干上がり、漁で暮らしていた人たちは土地を離れた。",
    ),
    props: [
      prop("Lakebed Salt Pans|Salinas del lecho|Salines du lit du lac|湖底の塩田", 210, 44),
      prop("Livestock Fair|Feria de ganado|Foire aux bestiaux|家畜の市", 240, 50),
    ],
  },

  chulumani: {
    n: t("Chulumani|Chulumani|Chulumani|チュルマニ"),
    lo: -67.53,
    la: -16.41,
    mark: "waterfall",
    bg: "yungas",
    reg: "val",
    lp: "r",
    tag: t("Terraces of the South Yungas|Terrazas de los Yungas del sur|Terrasses des Yungas du sud|南ユンガスの段々畑"),
    fact: t(
      "The slopes here are cut into takanas, stone terraces older than the Inca, and they still grow coca. The leaf is legal and everyday in Bolivia — chewed against hunger and altitude, and named in the constitution as part of the country's heritage.|Las laderas están labradas en takanas, terrazas de piedra anteriores a los incas, y siguen dando coca. La hoja es legal y cotidiana en Bolivia: se mastica contra el hambre y la altura, y la constitución la nombra patrimonio del país.|Les pentes sont taillées en takanas, terrasses de pierre antérieures aux Incas, et produisent toujours de la coca. La feuille est légale et quotidienne en Bolivie : mâchée contre la faim et l'altitude, elle est inscrite au patrimoine dans la constitution.|斜面はタカナと呼ばれる石積みの段々畑で、インカより古い。いまもコカを育てる。ボリビアでコカの葉は合法で日常のもの。空腹と高地に噛んで備え、憲法に国の遺産として書かれている。",
    ),
    props: [
      prop("Coca Terrace|Terraza de coca|Terrasse de coca|コカの段々畑", 240, 50),
      prop("Citrus Grove|Huerto de cítricos|Verger d'agrumes|柑橘の果樹園", 190, 40),
    ],
  },

  totora: {
    n: t("Totora|Totora|Totora|トタラ"),
    lo: -65.19,
    la: -17.73,
    mark: "belltower",
    bg: "valley",
    reg: "val",
    lp: "b",
    tag: t("Rebuilt in mud, on purpose|Reconstruida en adobe, a propósito|Rebâtie en adobe, volontairement|あえて土で建て直した町"),
    fact: t(
      "An earthquake in 1998 brought down much of this colonial town. Rather than rebuild in concrete, Totora was raised again in adobe and tile on the old street plan, and is now a national monument. Its valley grows the ají that colours Bolivian cooking red.|Un terremoto en 1998 derribó gran parte de esta villa colonial. En vez de hormigón, Totora se rehízo en adobe y teja sobre el trazado antiguo, y hoy es monumento nacional. Su valle cultiva el ají que enrojece la cocina boliviana.|Un séisme en 1998 a jeté à bas une grande part de ce bourg colonial. Plutôt que le béton, Totora fut relevée en adobe et tuile sur le plan ancien ; elle est aujourd'hui monument national. Sa vallée cultive l'ají qui rougit la cuisine bolivienne.|1998年の地震で植民地時代の町並みの多くが崩れた。コンクリートではなく日干し煉瓦と瓦で、昔の町割りのまま建て直され、いまは国の記念物になっている。谷ではボリビア料理を赤くする唐辛子アヒを育てる。",
    ),
    props: [
      prop("Adobe Workshop|Taller de adobe|Atelier d'adobe|日干し煉瓦の工房", 170, 36),
      prop("Chilli Drying Yard|Secadero de ají|Séchoir à ají|唐辛子の干し場", 210, 44),
    ],
  },

  punata: {
    n: t("Punata|Punata|Punata|プナタ"),
    lo: -65.83,
    la: -17.54,
    mark: "cathedral",
    bg: "valley",
    reg: "val",
    lp: "r",
    tag: t("A white flag means the chicha is ready|Bandera blanca: hay chicha|Drapeau blanc : la chicha est prête|白い旗はチチャができた合図"),
    fact: t(
      "Chicha here is maize beer fermented in clay jars, and a white flag on a pole outside means today's batch is ready to drink. The valley is watered by canals dug in colonial times off the Tunari range, which is why so much maize grows this high.|La chicha es cerveza de maíz fermentada en cántaros de barro, y una bandera blanca en un palo anuncia que la tanda del día ya se puede beber. Canales coloniales traen agua de la cordillera del Tunari: por eso crece tanto maíz a esta altura.|La chicha est une bière de maïs fermentée en jarres, et un drapeau blanc sur une perche annonce que la cuvée du jour est prête. Des canaux creusés à l'époque coloniale captent l'eau du Tunari : d'où tant de maïs à cette altitude.|チチャはトウモロコシの酒で、素焼きの甕で発酵させる。棒に白い旗が出ていれば、その日のぶんが飲めるという合図。谷は植民地時代に掘られた水路でトゥナリ山群から水を引いており、この高さでトウモロコシが実るのはそのおかげ。",
    ),
    props: [
      prop("Chicha House|Chichería|Chichería|チチャの店", 200, 42),
      prop("Thursday Market|Mercado del jueves|Marché du jeudi|木曜の市", 230, 48),
    ],
  },

  yacuiba: {
    n: t("Yacuiba|Yacuiba|Yacuiba|ヤクイバ"),
    lo: -63.68,
    la: -22.02,
    mark: "arch",
    bg: "chaco",
    reg: "cha",
    lp: "l",
    tag: t("The line ends at the gas|La vía termina en el gas|La voie s'arrête au gaz|線路はガスで終わる"),
    fact: t(
      "The railway down from Santa Cruz stops here at the Argentine border. Argentina paid to build it in the 1950s in exchange for Bolivian gas, and the fields around the town still send most of what they pump abroad.|El ferrocarril que baja de Santa Cruz se detiene aquí, en la frontera argentina. Argentina pagó su construcción en los años cincuenta a cambio de gas boliviano, y los campos de los alrededores siguen enviando fuera casi todo lo que extraen.|Le chemin de fer descendu de Santa Cruz s'arrête ici, à la frontière argentine. L'Argentine en paya la construction dans les années 1950 en échange du gaz bolivien, et les gisements alentour expédient encore l'essentiel de leur production à l'étranger.|サンタクルスから下ってきた鉄道は、アルゼンチン国境のここで終わる。1950年代にアルゼンチンがボリビアのガスと引き換えに建設費を出した線で、周りのガス田はいまも産出のほとんどを国外へ送っている。",
    ),
    props: [
      prop("Border Freight Yard|Patio de carga|Gare de fret|国境の貨物駅", 250, 52),
      prop("Chaco Gas Depot|Depósito de gas|Dépôt de gaz|チャコのガス基地", 280, 58),
    ],
  },
};

/**
 * 追加する路線。**末尾に足されるだけ**なので既存の並びは動かない。
 * どれも実際に道か線路のある区間を選んでいる。
 */
export const BOLIVIA_EXTRA_EDGES = [
  // オルロからポトシへ下る幹線。いまは オルロ—ウユニ しかなく、東へ回る道が無かった
  ["oruro", "challapata"],
  ["challapata", "potosi"],
  // ラパスからウンドゥアビ峠を越えて南ユンガスへ。コロイコとは尾根続き
  ["lapaz", "chulumani"],
  ["chulumani", "coroico"],
  // コチャバンバ谷の東側。旧サンタクルス街道がプナタ・トタラ・アイキレをつなぐ
  ["cochabamba", "punata"],
  ["punata", "totora"],
  ["totora", "aiquile"],
  // チャコ南端。ビジャモンテスから国境へ下り、山越えでタリハへ
  ["villamontes", "yacuiba"],
  ["yacuiba", "tarija"],
];
