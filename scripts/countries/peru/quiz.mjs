/**
 * ペルーのクイズ(フェーズ1・3問の下書き)。
 *
 * 難易度は1〜10。基準は他の盤面と同じ「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。都市カード(5件)が扱う具体的な事実
 * (ラ・オロヤの製錬所・セロ・デ・パスコの露天掘り・イキトスのゴム御殿・
 * プーノのヤバリ号・カハマルカの身代金の間)はここでは問わない。
 *
 * 3問のうち1問(Q3)は難易度9。裏取りの確度はコメントに書いた。
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

export const PERU_QUIZ = [
  q(
    2,
    "What is the capital of Peru?|¿Cuál es la capital de Perú?|Quelle est la capitale du Pérou ?|ペルーの首都はどこか?",
    [
      "Lima|Lima|Lima|リマ",
      "Bogotá|Bogotá|Bogotá|ボゴタ",
      "Quito|Quito|Quito|キト",
    ],
    0,
    "Lima has been the seat of Spanish colonial government since Francisco Pizarro founded it in 1535, and its metropolitan area now holds roughly a third of the country's entire population.|Lima es sede de gobierno desde que Francisco Pizarro la fundó en 1535 como capital del virreinato, y su área metropolitana alberga hoy cerca de un tercio de la población del país.|Lima est le siège du gouvernement depuis que Francisco Pizarro la fonda en 1535 comme capitale de la vice-royauté, et son aire métropolitaine abrite aujourd'hui près d'un tiers de la population du pays.|リマは1535年にフランシスコ・ピサロが総督府の置き場として開いて以来、政治の中心であり続けている。首都圏には今や全国の人口のおよそ3分の1が暮らす。",
  ),
  q(
    6,
    "A summit tunnel on Peru's Ferrocarril Central Andino sits at roughly 4,780 metres above sea level. For over a century, this made the line what?|Un túnel de cumbre del Ferrocarril Central Andino del Perú se halla a unos 4.780 metros sobre el nivel del mar. Durante más de un siglo, ¿qué hizo esto con la línea?|Un tunnel de faîte du Ferrocarril Central Andino du Pérou se situe à environ 4 780 mètres d'altitude. Pendant plus d'un siècle, qu'est-ce que cela a fait de cette ligne ?|ペルーの中央鉄道の頂上トンネルは標高およそ4780メートルにある。1世紀以上のあいだ、これはこの路線を何にしていたか?",
    [
      "The world's highest standard-gauge railway|El ferrocarril de trocha estándar más alto del mundo|Le chemin de fer à écartement standard le plus haut du monde|世界でいちばん高い所を走る標準軌の鉄道",
      "The world's longest railway tunnel|El túnel ferroviario más largo del mundo|Le plus long tunnel ferroviaire du monde|世界でいちばん長い鉄道トンネル",
      "The world's steepest rack railway|El ferrocarril de cremallera más empinado del mundo|Le chemin de fer à crémaillère le plus pentu du monde|世界でいちばん急な登山用ラック鉄道",
    ],
    0,
    "The line opened its Andean crossing in 1893 and held the record until a railway built across Tibet overtook it in the 2000s. Because the air is so thin this high, tourist trips on the line have long carried bottled oxygen for passengers.|La línea abrió su cruce andino en 1893 y mantuvo el récord hasta que un ferrocarril construido a través del Tíbet la superó en la década de 2000. Como el aire es tan escaso a esta altura, los trenes turísticos de la línea llevan desde hace tiempo oxígeno embotellado para los pasajeros.|La ligne ouvrit sa traversée andine en 1893 et détint le record jusqu'à ce qu'un chemin de fer construit à travers le Tibet la dépasse dans les années 2000. L'air y étant si rare, les trains touristiques de la ligne transportent depuis longtemps de l'oxygène en bouteille pour les passagers.|この路線は1893年にアンデス越えを開通させ、2000年代にチベットを横断する鉄道に抜かれるまで記録を保った。この高さでは空気が薄すぎるため、この路線の観光列車は長らく乗客用に酸素ボンベを積んできた。",
  ),
  // 難易度9。裏取り: マリノフスキがペルー国営鉄道の技師長としてスイッチバック
  // (ジグザグ)の設計に関わったことは複数の資料で確認できる(高い確度)。
  // 生涯(1830年蜂起との関わりの詳細、記念貨幣・地名の有無)は出典を一本に
  // 絞れなかったため、クイズ本文・解説からは外し、確実な部分だけを問うている。
  q(
    9,
    "The zigzag switchbacks that let Peru's Ferrocarril Central Andino climb the Andes without impossibly long tunnels are chiefly credited to an engineer born in which country?|Los cambios de sentido en zigzag que permiten al Ferrocarril Central Andino del Perú subir los Andes sin túneles imposiblemente largos se atribuyen sobre todo a un ingeniero nacido en qué país?|Les changements de sens en zigzag qui permettent au Ferrocarril Central Andino du Pérou de gravir les Andes sans tunnels démesurément longs sont surtout attribués à un ingénieur né dans quel pays ?|ペルーの中央鉄道が、途方もなく長いトンネルを掘らずにアンデスを登れるようにしたジグザグのスイッチバックは、おもにどの国生まれの技師の功績とされているか?",
    [
      "Poland|Polonia|Pologne|ポーランド",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "The United Kingdom|Reino Unido|Le Royaume-Uni|イギリス",
    ],
    0,
    "Ernest Malinowski, who had settled in Peru after emigrating from Poland, was chief engineer of the state railways when he designed the switchback system — trains reverse direction on angled spurs instead of needing far longer tunnels to gain the same height.|Ernest Malinowski, que se había establecido en Perú tras emigrar de Polonia, era el ingeniero jefe de los ferrocarriles del Estado cuando diseñó el sistema en zigzag: los trenes invierten el sentido de marcha en apartaderos angulados en vez de necesitar túneles mucho más largos para ganar la misma altura.|Ernest Malinowski, installé au Pérou après avoir émigré de Pologne, était l'ingénieur en chef des chemins de fer de l'État lorsqu'il conçut le système en zigzag : les trains inversent leur sens de marche sur des voies de garage en biais au lieu d'exiger des tunnels bien plus longs pour gagner la même hauteur.|ポーランドから移り住んだ技師エルネスト・マリノフスキは、国営鉄道の技師長としてこのジグザグ方式を設計した。列車は斜めに切られた側線で進行方向を切り替えることで、同じ高さを稼ぐのにずっと長いトンネルを掘らずに済ませている。",
  ),
];
