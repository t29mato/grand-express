/**
 * 北アメリカ大陸の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 大陸の盤面なので、地方(`reg`)は国別ではなく地理で7つに切ってある
 * (cities.mjs 冒頭のコメント参照)。季節・お金の出来事の効果の強さは
 * 他の盤面と同じく `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 *
 * アイテム9件のキーは、既存25盤面のキー一覧(node -e で country-index.json と
 * 各 *.content.json の items を突き合わせ)と衝突しないことを確認して選んだ。
 * boxcar / officialguide / zephyr / superchief / worrydoll / cintaroja /
 * cliffsnotes / pieceseight / handcar のいずれも既存キーに無い。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const NORTHAMERICA_META = {
  id: "northamerica",
  name: t("North America|Norteamérica|Amérique du Nord|北アメリカ"),
  blurb: t(
    "A continent stitched together by golden spikes, banana railways and a border drawn with a ruler|Un continente cosido con clavos dorados, ferrocarriles bananeros y una frontera trazada a regla|Un continent cousu de crampons dorés, de chemins de fer bananiers et d'une frontière tracée à la règle|金の犬釘とバナナ鉄道、そして定規で引かれた国境が縫い合わせた大陸",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (アメリカ盤面と同じ通貨・同じ倍率100)。
  cur: { pre: "$", post: "", mul: 100 },
  start: "ciudaddemexico",
  cpuNames: ["Casey Jones", "La Llorona", "Anansi", "Coyote"],
  // 大西洋の紺・熱帯の緑・砂漠と大平原の砂色・鉄路の赤・韓紙ならぬメスティーソの白。
  stripe: ["#1a3c6e", "#2f7a44", "#d8c07f", "#c8102e", "#f6efe2"],
};

/** 地理で切った7地帯。国境をまたぐ話を書くための区分で、国別ではない。 */
export const NORTHAMERICA_REGIONS = {
  arctic: t(
    "The Arctic, Alaska & Yukon|El Ártico, Alaska y Yukón|L'Arctique, l'Alaska et le Yukon|北極圏・アラスカ・ユーコン",
  ),
  pac: t(
    "The Pacific Coast & the Rockies|La costa del Pacífico y las Rocosas|La côte pacifique et les Rocheuses|西海岸・ロッキー山脈",
  ),
  plains: t(
    "The Great Plains & Great Lakes|Las Grandes Llanuras y los Grandes Lagos|Les Grandes Plaines et les Grands Lacs|大平原・五大湖",
  ),
  atl: t(
    "The Atlantic Coast|La costa atlántica|La côte atlantique|東海岸・大西洋岸",
  ),
  mex: t("Mexico|México|Mexique|メキシコ"),
  canorth: t(
    "Northern Central America|Centroamérica del norte|L'Amérique centrale du nord|中米北部",
  ),
  casouth: t(
    "Southern Central America|Centroamérica del sur|L'Amérique centrale du sud|中米南部",
  ),
  cargr: t(
    "The Greater Antilles & the Bahamas|Las Antillas Mayores y las Bahamas|Les Grandes Antilles et les Bahamas|大アンティル諸島とバハマ",
  ),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const NORTHAMERICA_ITEMS = {
  boxcar: {
    e: "🚃",
    price: 240,
    kind: "move",
    n: t("A Ride in an Empty Boxcar|Un viaje en un vagón vacío|Un voyage dans un wagon couvert vide|空の貨車に飛び乗る"),
    d: t(
      "Carried 8–12 squares. The railway picks where you get off.|Te lleva de 8 a 12 casillas. El ferrocarril elige dónde bajas.|Emporté de 8 à 12 cases. Le chemin de fer choisit où tu descends.|8〜12マス運ばれる。降りる場所は鉄道まかせ。",
    ),
    f: t(
      "Riding freight trains for free, known as hopping boxcars, became common across the continent during hard times, when a side door left cracked open was as good as a ticket. Nobody riding this way ever knows which yard the train will stop in next.|Viajar gratis en trenes de carga, saltando a los vagones, se hizo común por todo el continente en tiempos difíciles, cuando una puerta lateral entreabierta valía como billete. Quien viaja así nunca sabe en qué patio parará el tren después.|Voyager gratuitement dans les trains de marchandises, en sautant dans les wagons, devint courant sur tout le continent aux temps difficiles, une porte latérale entrouverte valant alors un billet. Personne voyageant ainsi ne sait jamais dans quelle gare de triage le train s'arrêtera ensuite.|貨物列車にただ乗りすること、いわゆる箱型貨車への飛び乗りは、苦しい時代に大陸じゅうで珍しくなかった。少し開いた側扉が切符代わりだった。こうして乗る者は、次にどの操車場で列車が止まるのか誰にも分からない。",
    ),
  },
  officialguide: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Official Guide of the Railways|La Guía Oficial de los Ferrocarriles|Le Guide officiel des chemins de fer|鉄道公認時刻表",
    ),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Published monthly from 1868, this brick-thick volume listed the timetables of every railway on the continent down to the minute, and a conductor's word was only as good as the page he could point to. Travelers who could actually read its dense tables were said to have an edge over everyone else at the station.|Publicado mensualmente desde 1868, este volumen grueso como un ladrillo recogía los horarios de todos los ferrocarriles del continente al minuto, y la palabra de un revisor valía lo que la página que podía señalar. Se decía que quien sabía leer sus densas tablas llevaba ventaja sobre el resto en la estación.|Publié mensuellement depuis 1868, ce volume épais comme une brique consignait les horaires de tous les chemins de fer du continent à la minute près, et la parole d'un contrôleur ne valait que la page qu'il pouvait montrer. On disait que quiconque savait vraiment lire ses tableaux touffus avait une longueur d'avance sur tous les autres à la gare.|1868年から毎月刊行されたこの煉瓦のように分厚い一冊には、大陸じゅうの鉄道の時刻が分単位で載っていた。車掌の言葉も、指させるページがあってこそ意味を持った。この密な表を本当に読みこなせる旅人は、駅にいる誰よりも有利だと言われた。",
    ),
  },
  zephyr: {
    e: "🚄",
    price: 460,
    kind: "pre",
    n: t("A Ticket on the Zephyr|Un billete en el Zephyr|Un billet sur le Zephyr|ゼファー号の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The stainless-steel Zephyr trains that entered service in the 1930s were built light enough to outrun the wind they were named for, and one crossed a route in half the time of the steam trains it replaced on its record demonstration run. Diners on board served meals plated to survive the sway of curves taken faster than anyone thought safe.|Los trenes Zephyr de acero inoxidable que entraron en servicio en los años 1930 se construyeron tan ligeros que superaban en velocidad al viento que les daba nombre, y uno cruzó una ruta en la mitad del tiempo de los trenes de vapor a los que reemplazaba en su viaje récord de demostración. Los vagones comedor servían platos pensados para resistir el balanceo de curvas tomadas más rápido de lo que se creía seguro.|Les trains Zephyr en acier inoxydable, entrés en service dans les années 1930, furent bâtis assez légers pour distancer le vent dont ils portaient le nom, et l'un d'eux traversa une ligne en la moitié du temps des trains à vapeur qu'il remplaçait, lors de son trajet de démonstration record. Les wagons-restaurants servaient des plats dressés pour résister au roulis des courbes prises plus vite que quiconque ne le jugeait prudent.|1930年代に登場したステンレス鋼の列車ゼファー号は、その名の由来である西風より速く走れるほど軽く造られ、記念運行では置き換える蒸気機関車の半分の時間で路線を走り抜けた。車内の食堂車は、誰もが不安に思うほど速いカーブの揺れにも崩れない盛り付けで料理を出した。",
    ),
  },
  superchief: {
    e: "🚅",
    price: 700,
    kind: "pre",
    n: t("A Ticket on the Super Chief|Un billete en el Super Chief|Un billet sur le Super Chief|スーパーチーフ号の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Nicknamed the Train of the Stars for the film-industry passengers who rode it between Chicago and Los Angeles, this all-Pullman express carried its own barber, valet and secretary, and its dining car chinaware became so collectible that passengers were gently discouraged from pocketing it. It never once, in over three decades of service, failed to run on time.|Apodado el Tren de las Estrellas por los pasajeros de la industria del cine que viajaban en él entre Chicago y Los Ángeles, este expreso íntegramente de coches Pullman llevaba su propio barbero, ayuda de cámara y secretaria, y la vajilla de su coche comedor se volvió tan codiciada que se disuadía con tacto a los pasajeros de llevársela. En más de tres décadas de servicio, jamás dejó de llegar puntual.|Surnommé le Train des Stars pour les passagers du cinéma qui l'empruntaient entre Chicago et Los Angeles, cet express tout-Pullman emportait son propre barbier, valet et secrétaire, et la vaisselle de son wagon-restaurant devint si prisée qu'on dissuadait poliment les voyageurs de l'emporter. En plus de trois décennies de service, il ne manqua jamais une seule fois d'arriver à l'heure.|シカゴとロサンゼルスを結び、映画業界の乗客が多かったことから「星の列車」と呼ばれたこの全席プルマンの特急には、専属の理髪師と従者、秘書まで乗っていた。食堂車の食器はあまりに人気で、乗客が持ち帰らないようやんわり注意されたほどだった。三十年を超える運行のあいだ、定刻を外したことは一度もなかったという。",
    ),
  },
  worrydoll: {
    e: "🪆",
    price: 260,
    kind: "passive",
    n: t("A Guatemalan Worry Doll|Un muñeco quitapenas guatemalteco|Une poupée à soucis guatémaltèque|グアテマラの心配人形",
    ),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Mayan tradition holds that a worry, whispered to one of these thumbnail-sized dolls before bed and tucked beneath the pillow, will be carried away and dealt with by morning, so children are given six or more at once, one worry per doll. Each is wound from scraps of cloth and wire too small for the fingers that made it to see clearly by daylight alone.|La tradición maya sostiene que una preocupación, susurrada a uno de estos muñecos del tamaño de una uña antes de dormir y guardada bajo la almohada, se la lleva y se resuelve para la mañana, así que a los niños se les dan seis o más a la vez, una preocupación por muñeco. Cada uno se enrolla con retazos de tela y alambre demasiado pequeños para que los dedos que lo hicieron los vean con claridad solo a la luz del día.|La tradition maya veut qu'un souci, chuchoté à l'une de ces poupées grandes comme un ongle avant de dormir et glissé sous l'oreiller, soit emporté et réglé d'ici le matin, si bien qu'on en donne six ou plus à la fois aux enfants, un souci par poupée. Chacune est façonnée de bouts de tissu et de fil trop petits pour que les doigts qui l'ont faite les distinguent clairement à la seule lumière du jour.|マヤの言い伝えでは、寝る前にこの爪先ほどの人形の一つに悩みをささやいて枕の下に入れておけば、朝までにその悩みを人形が持ち去って片付けてくれるという。だから子どもには一度に六つ以上、悩み一つに人形一つで渡される。それぞれ布切れと針金で作られ、作った指先でさえ日の光の下でしかはっきり見分けられないほど小さい。",
    ),
  },
  cintaroja: {
    e: "🎀",
    price: 300,
    kind: "pre",
    n: t("A Red Ribbon Against the Sombrerón|Una cinta roja contra el Sombrerón|Un ruban rouge contre le Sombrerón|ソンブレロンよけの赤いリボン",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Guatemalan tales warn that a short man in an oversized black hat follows travelers by night and spends the hours until dawn braiding the manes of any horse or mule left untied, leaving the animal exhausted by morning. A red ribbon tied into the mane is said to keep him too busy untangling it to start braiding at all.|Los cuentos guatemaltecos advierten que un hombre bajo con un sombrero negro enorme sigue a los viajeros de noche y pasa las horas hasta el alba trenzando las crines de cualquier caballo o mula que quede sin atar, dejando al animal agotado por la mañana. Se dice que una cinta roja anudada en la crin lo mantiene ocupado desenredándola en vez de ponerse a trenzar.|Les contes guatémaltèques avertissent qu'un petit homme au chapeau noir démesuré suit les voyageurs la nuit et passe les heures jusqu'à l'aube à tresser la crinière de tout cheval ou toute mule laissés sans attache, épuisant l'animal d'ici le matin. Un ruban rouge noué dans la crinière le tiendrait, dit-on, trop occupé à le démêler pour seulement commencer à tresser.|グアテマラの言い伝えでは、大きすぎる黒い帽子をかぶった小柄な男が夜な夜な旅人の跡をつけ、繋がれていない馬やラバのたてがみを夜明けまで編み続け、朝には動物をくたびれさせてしまうという。たてがみに赤いリボンを結んでおくと、彼はそれをほどくのに手一杯になり、編み始める暇がなくなると言われている。",
    ),
  },
  cliffsnotes: {
    e: "📔",
    // team-leadの実焼きでeffect価格上限(147)超過が判明。他盤面の
    // quiz-save系アイテム(baedeker/pacha/fiche等)が軒並み130なので揃えた。
    price: 130,
    kind: "passive",
    n: t("A Well-Worn Study Guide|Una guía de estudio muy usada|Un guide de révision très usé|使い古された虎の巻",
    ),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Slim yellow-and-black study guides summarizing whole novels chapter by chapter have propped up generations of students the night before an exam, first sold from a card table by a founder who mailed the earliest copies himself. Teachers have argued for decades about whether they help students learn or simply help them avoid it.|Delgadas guías de estudio amarillas y negras que resumen novelas enteras capítulo a capítulo han sacado de apuros a generaciones de estudiantes la noche antes de un examen; las primeras se vendían desde una mesa plegable y su fundador enviaba él mismo los primeros ejemplares por correo. Los profesores llevan décadas discutiendo si ayudan a aprender o solo a evitarlo.|De minces guides de révision jaune et noir résumant des romans entiers chapitre par chapitre ont sauvé des générations d'étudiants la veille d'un examen ; les tout premiers se vendaient depuis une table pliante, et leur fondateur postait lui-même les premiers exemplaires. Les enseignants débattent depuis des décennies pour savoir s'ils aident à apprendre ou simplement à l'éviter.|一冊まるごとの小説を章ごとに要約した黄と黒の薄い虎の巻は、試験前夜の学生を何世代にもわたって助けてきた。最初は創業者が折りたたみ机で売り、初期の注文分は自ら郵送していたという。それが学びを助けるのか、それとも学ぶことを避けさせているだけなのか、教師たちは何十年も議論を続けている。",
    ),
  },
  pieceseight: {
    e: "🪙",
    price: 300,
    kind: "pre",
    n: t("A Handful of Pieces of Eight|Un puñado de reales de a ocho|Une poignée de pièces de huit|八リアル銀貨のひとつかみ",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Minted from silver in Mexico and Peru and shipped north through this very network of ports and roads, the Spanish dollar coin was cut into eight wedges to make small change, giving English speakers the phrase \"two bits\" for a quarter. It remained legal tender in the United States until 1857, long after independence from Spain.|Acuñada en plata en México y Perú y enviada al norte por esta misma red de puertos y caminos, la moneda de dólar español se cortaba en ocho cuñas para hacer cambio, y de ahí la expresión inglesa «two bits» para un cuarto de dólar. Siguió siendo moneda de curso legal en Estados Unidos hasta 1857, mucho después de la independencia de España.|Frappée en argent au Mexique et au Pérou puis expédiée vers le nord par ce même réseau de ports et de routes, la pièce de dollar espagnol se découpait en huit quartiers pour faire la monnaie, d'où l'expression anglaise « two bits » pour un quart de dollar. Elle resta monnaie légale aux États-Unis jusqu'en 1857, longtemps après l'indépendance vis-à-vis de l'Espagne.|メキシコとペルーで銀から鋳造され、まさにこの港と道の網を通って北へ運ばれたスペイン・ドル銀貨は、小銭を作るため八つのくさび形に切り分けられた。英語で四半ドルを「トゥー・ビッツ」と呼ぶのはここに由来する。スペインからの独立からずっとのち、1857年までアメリカ合衆国の法定通貨であり続けた。",
    ),
  },
  handcar: {
    e: "🛤️",
    price: 400,
    kind: "pre",
    n: t("A Sprint on the Handcar|Un tramo en zorra manual|Un sprint sur le vélorail|保線用トロッコで一区間",
    ),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Track crews the length of the continent once patrolled their sections on hand-pumped rail carts light enough for two people to lift off the line when a real train approached, working the seesaw lever until their arms gave out. A crew that could out-pump the section ahead of them got there, and back to the shed, faster.|Las cuadrillas de mantenimiento de vías, de un extremo al otro del continente, patrullaban antes sus tramos en carritos de riel accionados a mano, lo bastante ligeros para que dos personas los apartaran de la vía cuando se acercaba un tren de verdad, bombeando la palanca de balancín hasta que los brazos no daban más. La cuadrilla que bombeaba más fuerte que la del tramo siguiente llegaba, y volvía al cobertizo, más rápido.|D'un bout à l'autre du continent, les équipes d'entretien des voies patrouillaient jadis leur tronçon sur des chariots à bras assez légers pour que deux personnes les soulèvent de la voie à l'approche d'un vrai train, actionnant le levier à bascule jusqu'à l'épuisement des bras. L'équipe qui pompait plus fort que celle du tronçon suivant y arrivait, et revenait au hangar, plus vite.|大陸じゅうの保線班は、かつて手押しのシーソー式レバーを漕いで担当区間を巡回した。本物の列車が近づけば二人で持ち上げて線路から下ろせるほど軽い台車で、腕が上がらなくなるまでレバーを漕ぎ続けた。隣の区間の班より力強く漕げる班のほうが、先に着き、先に小屋へ戻れた。",
    ),
  },
};

/**
 * 厄災の神。グアテマラ民話のエル・ソンブレロン(大きすぎる黒い帽子の小男)。
 * 馬やラバのたてがみを一晩じゅう編み続けるいたずら者として伝わり、
 * 人を苦しめる悪霊ではない(韓国のトッケビ・茨城のダイダラボウと同じく
 * 「残酷ではなく、ただ度が過ぎるだけ」の性格)。
 */
export const NORTHAMERICA_SPIRIT = {
  e: "🎩",
  n: t("El Sombrerón|El Sombrerón|El Sombrerón|エル・ソンブレロン"),
  big: t(
    "The Sombrerón's All-Night Braiding|La trenzada de toda la noche del Sombrerón|Le tressage de toute la nuit du Sombrerón|ソンブレロンの徹夜編み",
  ),
  ward: "cliffsnotes",
  arrive: t(
    "<b>🎩 The Sombrerón has taken an interest in you.</b> Guatemalan tales describe a short man in an oversized black hat who follows travelers by night, more mischievous than cruel, forever braiding the manes of any horse or mule left untied. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🎩 El Sombrerón se ha fijado en ti.</b> Los cuentos guatemaltecos describen a un hombre bajo con un sombrero negro enorme que sigue a los viajeros de noche, más travieso que cruel, siempre trenzando las crines de cualquier caballo o mula que quede sin atar. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🎩 Le Sombrerón s'est intéressé à toi.</b> Les contes guatémaltèques décrivent un petit homme au chapeau noir démesuré qui suit les voyageurs la nuit, espiègle plus que cruel, tressant sans fin la crinière de tout cheval ou toute mule laissés sans attache. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🎩 エル・ソンブレロンに目を付けられた。</b> グアテマラの言い伝えによれば、大きすぎる黒い帽子をかぶった小柄な男が夜な夜な旅人の跡をつけ、残酷というよりいたずら好きで、繋がれていない馬やラバのたてがみをいつまでも編み続けるという。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🎩 <b>El Sombrerón</b> loses interest and follows <b>{0}</b>, farthest from {1}.|🎩 <b>El Sombrerón</b> pierde el interés y sigue a <b>{0}</b>, el más lejano de {1}.|🎩 <b>Le Sombrerón</b> se désintéresse et suit <b>{0}</b>, le plus loin de {1}.|🎩 <b>エル・ソンブレロン</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへついていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the Sombrerón and never once tied a ribbon in his path. He grins beneath his enormous hat and settles in for a full night's braiding — <b>the Sombrerón's All-Night Braiding</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al Sombrerón sin haberle puesto jamás una cinta en el camino. Él sonríe bajo su sombrero enorme y se acomoda para una noche entera de trenzado: empieza <b>la trenzada de toda la noche del Sombrerón</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le Sombrerón sans jamais avoir noué de ruban sur son chemin. Il sourit sous son chapeau démesuré et s'installe pour une nuit entière de tressage : <b>le tressage de toute la nuit du Sombrerón</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもエル・ソンブレロンと歩いていながら、一度もその道にリボンを結ばなかった。彼は大きな帽子の下でにやりと笑い、一晩じゅう編み続ける支度を始める。<b>ソンブレロンの徹夜編み</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the old tales, a red ribbon tied into a horse's mane is said to keep the Sombrerón too busy untangling it to braid anything at all — the trouble is that it has to be tied before he arrives, not after. Nobody playing this game tied one in time.|<b>Tras la historia:</b> en los viejos cuentos, una cinta roja atada a la crin de un caballo mantiene al Sombrerón demasiado ocupado desenredándola como para trenzar nada; el problema es que hay que atarla antes de que llegue, no después. Nadie en esta partida la ató a tiempo.|<b>Derrière l'histoire :</b> dans les vieux contes, un ruban rouge noué dans la crinière d'un cheval tiendrait le Sombrerón trop occupé à le démêler pour tresser quoi que ce soit ; le hic, c'est qu'il faut le nouer avant son arrivée, pas après. Personne dans cette partie ne l'a noué à temps.|<b>物語の背景:</b> 昔話では、馬のたてがみに赤いリボンを結んでおけば、ソンブレロンはそれをほどくのに手一杯になり何も編めなくなるという。ただし結ぶのは彼が来る前でなければならず、来てからでは遅い。この旅ではまだ誰も間に合っていない。",
  ),
  pleased: t(
    "He tips his enormous hat to show it off, and a coin tumbles loose from the band. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se quita el enorme sombrero para lucirlo y una moneda se le cae de la cinta. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il soulève son chapeau démesuré pour le montrer et une pièce tombe de son ruban. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに大きな帽子を持ち上げて見せたはずみで、帽子帯から銭が一枚転がり落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A worn study guide is held up where he can see it, its dense pages as tangled as any mane. The Sombrerón is said to hate anything already knotted beyond his skill, and he backs off, passing <b>{0}</b> without noticing this turn.|Se le muestra una guía de estudio gastada, con páginas tan enredadas como cualquier crin. Dicen que el Sombrerón odia todo lo que ya está anudado más allá de su habilidad, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On brandit devant lui un guide de révision usé, aux pages aussi emmêlées que n'importe quelle crinière. On dit que le Sombrerón déteste tout ce qui est déjà noué au-delà de son talent, et il recule, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|使い古した虎の巻を、彼に見えるように掲げた。びっしり詰まったページは、どんなたてがみより絡まって見える。ソンブレロンは自分の腕でも解けないほど絡まったものを何より嫌うという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。エル・ソンブレロンのいたずら好きな性格に合わせ、度が過ぎるが滑稽な話にしてある。 */
export const NORTHAMERICA_DOOM = [
  {
    id: "hurricane",
    n: t("A hurricane crosses the coast|Un huracán cruza la costa|Un ouragan traverse la côte|ハリケーンが海岸を通る"),
    t: t(
      "The storm was tracked for a week before it made landfall, and still it strips roofs and floods streets that had never flooded before. Coastal towns from the Gulf to the Caribbean read a hurricane's forecast cone the way other places read the weekly weather, until the cone actually points their way.|La tormenta se siguió durante una semana antes de tocar tierra, y aun así arranca tejados e inunda calles que nunca se habían inundado. Los pueblos costeros, del Golfo al Caribe, leen el cono de pronóstico de un huracán como quien lee el parte semanal, hasta que el cono apunta hacia ellos.|La tempête fut suivie une semaine avant de toucher terre, et pourtant elle arrache des toits et inonde des rues qui n'avaient jamais été inondées. Les villes côtières, du golfe aux Caraïbes, lisent le cône de prévision d'un ouragan comme un bulletin météo ordinaire, jusqu'au jour où le cône pointe vers elles.|嵐は上陸の一週間も前から進路が追われていたが、それでも屋根を剥がし、これまで浸水したことのない通りを水浸しにする。メキシコ湾からカリブ海にかけての沿岸の町は、ハリケーンの予報円をふだんの週間予報のように読む。その円が自分たちのほうを指すまでは。",
    ),
    months: [4, 5],
  },
  {
    id: "hielo",
    n: t("An ice storm shuts the line|Una tormenta de hielo cierra la línea|Une tempête de verglas ferme la ligne|着氷が線路を止める"),
    t: t(
      "Freezing rain coated every rail and overhead wire overnight, and the first train out in the morning has to crawl behind a car dragging a de-icer instead of running to schedule. Branches too heavy with ice to hold their own weight come down across roads that were clear the evening before.|La lluvia helada cubrió cada riel y cable aéreo durante la noche, y el primer tren de la mañana tiene que avanzar despacio detrás de un vagón que arrastra un deshielador en vez de circular según el horario. Ramas demasiado cargadas de hielo para sostener su propio peso caen sobre calles que la tarde anterior estaban despejadas.|La pluie verglaçante a recouvert chaque rail et chaque câble aérien pendant la nuit, et le premier train du matin doit avancer au pas derrière un wagon tirant un dégivreur au lieu de rouler à l'horaire. Des branches trop chargées de glace pour tenir leur propre poids s'abattent sur des routes dégagées la veille au soir.|夜のうちに凍雨がすべてのレールと架線を覆い、朝いちばんの列車は時刻表どおりではなく、氷を落とす車両の後ろをゆっくり進むほかない。前の晩には何ともなかった道に、氷の重みに耐えきれなくなった枝が次々に倒れ込む。",
    ),
    months: [9, 10],
  },
  {
    id: "cenizas",
    n: t("Volcanic ash grounds the trains|La ceniza volcánica detiene los trenes|La cendre volcanique bloque les trains|火山灰が列車を止める"),
    t: t(
      "A volcano along the isthmus sent ash high enough to drift for hundreds of kilometers, and the fine grit works its way into switch points and wheel bearings faster than crews can clean it out. Passengers wipe grey dust from every windowsill for days after the sky itself has cleared.|Un volcán del istmo lanzó ceniza lo bastante alto como para derivar cientos de kilómetros, y el polvo fino se cuela en los cambios de vía y los cojinetes de las ruedas más rápido de lo que las cuadrillas pueden limpiarlo. Los pasajeros limpian polvo gris de cada alféizar durante días después de que el propio cielo ya se ha despejado.|Un volcan de l'isthme a projeté de la cendre assez haut pour dériver sur des centaines de kilomètres, et la fine poussière s'infiltre dans les aiguillages et les roulements de roues plus vite que les équipes ne peuvent la nettoyer. Les passagers essuient une poussière grise sur chaque rebord de fenêtre des jours durant, longtemps après que le ciel lui-même s'est dégagé.|地峡沿いの火山が噴き上げた灰は何百kmも流れ、細かい粉塵が保線班の掃除より速く転轍機や車輪の軸受けに入り込む。空そのものはとうに晴れているのに、乗客は何日も窓枠の灰色の粉を拭き続ける。",
    ),
  },
  {
    id: "ventisca",
    n: t("A blizzard buries the pass|Una ventisca sepulta el paso|Un blizzard ensevelit le col|吹雪が峠を埋める"),
    t: t(
      "Wind off the mountains drove the snow sideways for two days straight, and the pass that was clear on Monday is buried under drifts taller than the plow by Wednesday. Crews with rotary snowblowers dig through around the clock, and everyone waiting at either end agrees the mountains win this argument every single winter.|El viento de las montañas empujó la nieve de lado durante dos días seguidos, y el paso que el lunes estaba despejado amanece el miércoles sepultado bajo ventisqueros más altos que la quitanieves. Las cuadrillas con sopladoras rotativas cavan sin descanso, y todos los que esperan en cualquiera de los dos extremos coinciden en que las montañas ganan esta discusión cada invierno.|Le vent des montagnes a chassé la neige de côté deux jours durant, et le col dégagé le lundi se retrouve mercredi enseveli sous des congères plus hautes que le chasse-neige. Les équipes aux souffleuses rotatives creusent sans relâche, et tous ceux qui attendent à chaque bout s'accordent à dire que la montagne gagne ce bras de fer chaque hiver.|山から吹き下ろす風が二日間ぶっ通しで雪を横殴りに降らせ、月曜には通れた峠が、水曜には除雪車より高い吹きだまりに埋もれていた。ロータリー除雪車の作業員は昼夜を分かたず掘り続け、両端で待つ誰もが、この勝負は毎冬かならず山のほうが勝つと口をそろえる。",
    ),
    months: [9, 10, 11],
  },
  {
    id: "sombreron-trenza",
    n: t("Led astray by the Sombrerón|El Sombrerón te hace perder el camino|Le Sombrerón t'égare|ソンブレロンに化かされる"),
    t: t(
      "The road home looked exactly the same at every turn, and only at dawn does it become clear that the same crossing was passed four times over. Old tales blame the Sombrerón for this exact trick, leading a traveler in circles all night for the fun of it and vanishing the moment the sun clears the ridge.|El camino de vuelta parecía idéntico en cada recodo, y solo al amanecer queda claro que el mismo cruce se pasó cuatro veces. Los viejos cuentos culpan de esta treta al Sombrerón, que hace caminar en círculos a un viajero toda la noche por diversión y desaparece en cuanto el sol asoma sobre la cresta.|Le chemin du retour semblait identique à chaque tournant, et ce n'est qu'à l'aube qu'on comprend avoir repassé quatre fois le même croisement. Les vieux contes en accusent le Sombrerón, qui fait tourner en rond un voyageur toute la nuit pour s'amuser et disparaît dès que le soleil dépasse la crête.|帰り道はどの角を曲がっても同じ景色に見え、夜明けになってようやく同じ交差点を四度も通っていたと分かった。昔話はこの仕掛けをエル・ソンブレロンのしわざだとする。面白がって旅人を一晩じゅう堂々巡りさせ、日が尾根から差した瞬間に消えるという。",
    ),
  },
  {
    id: "aduana",
    n: t("Held up at the border checkpoint|Retenido en el puesto fronterizo|Retenu au poste-frontière|国境検問所で足止め",
    ),
    t: t(
      "The queue for the checkpoint stretched back past the last streetlight, and the officer waved through three cars for every one pulled aside for a longer look. Papers that were in order the last time somehow needed a second stamp this time, and there was no arguing about it before the office reopened after lunch.|La cola del puesto fronterizo se extendía más allá de la última farola, y el oficial dejaba pasar tres coches por cada uno que apartaba para una revisión más larga. Los papeles que la última vez estaban en regla esta vez necesitaban, por algún motivo, un segundo sello, y no había forma de discutirlo antes de que la oficina reabriera tras el almuerzo.|La file d'attente au poste-frontière s'étirait au-delà du dernier lampadaire, et l'agent laissait passer trois voitures pour chaque véhicule mis de côté pour un contrôle plus long. Des papiers en règle la dernière fois avaient cette fois-ci besoin, allez savoir pourquoi, d'un second tampon, et il n'y avait rien à faire avant la réouverture du bureau après le déjeuner.|検問所の列は最後の街灯を越えて延び、係官は三台に一台を選んで念入りに調べ、残りは通した。前回は問題なかった書類が、今回はなぜか二つ目の判が要ると言われ、昼休み明けに窓口が開くまで文句の言いようもなかった。",
    ),
  },
  {
    id: "pickpocket-mercado",
    n: t("A pickpocket works the market|Un carterista trabaja el mercado|Un pickpocket sévit au marché|市場ですりに遭う"),
    t: t(
      "A shoulder bump in the thick of the crowded stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. The market is loud enough and packed enough that nobody nearby noticed a thing.|Un roce de hombro en medio del gentío de los puestos pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. El mercado está tan bullicioso y abarrotado que nadie cerca notó nada.|Un coup d'épaule au cœur de la foule des étals est passé avant même d'être remarqué, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Le marché est si bruyant et si dense que personne aux alentours n'a rien vu.|混み合う露店の合間で肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。市場はざわめきと人混みでいっぱいで、近くの誰も何にも気づかなかった。",
    ),
  },
];

/** 季節。他の盤面と同じく4月始まりの12ヶ月。地方ごとの好不況で差をつける。 */
export const NORTHAMERICA_SEASONS = [
  {
    e: "🌷",
    n: t("Coffee blossoms open in the highlands|Los cafetales florecen en el altiplano|Les caféiers fleurissent sur les hauts plateaux|高地でコーヒーの花が咲く"),
    t: t(
      "A single warm rain after the dry season sets every coffee bush on a hillside blooming within days of each other, covering whole slopes in white blossom that smells faintly of jasmine and lasts barely a week before the petals drop. Farmers read the timing of that first rain as closely as any forecast, since blossom that opens unevenly means an uneven harvest eight months later.|Una sola lluvia cálida tras la temporada seca hace florecer cada cafeto de una ladera con apenas días de diferencia, cubriendo laderas enteras de flor blanca que huele levemente a jazmín y apenas dura una semana antes de caer. Los agricultores leen el momento de esa primera lluvia con tanta atención como cualquier pronóstico.|Une seule pluie chaude après la saison sèche fait fleurir en quelques jours à peine tous les caféiers d'un même versant, couvrant des pentes entières d'une floraison blanche qui sent vaguement le jasmin et ne dure guère plus d'une semaine avant que les pétales ne tombent. Les cultivateurs surveillent le moment de cette première pluie d'aussi près qu'une prévision météo.|乾季明けの最初の暖かい雨が、斜面いっぱいのコーヒーの木をわずか数日のうちに一斉に咲かせる。かすかにジャスミンの香りがする白い花は、一週間ともたずに散る。農家はこの最初の雨の時期を天気予報以上に注意深く読む。花の咲き方がそろわなければ、8か月後の収穫もそろわないからである。",
    ),
    f: t(
      "A coffee tree can take three to four years after planting before it produces a usable harvest at all, so the blossom on a hillside this month is often the first real sign of whether a farm planted years ago was a good bet.|Un cafeto puede tardar de tres a cuatro años tras plantarse en dar una cosecha aprovechable, así que la floración de una ladera este mes suele ser la primera señal real de si una finca sembrada años atrás fue una buena apuesta.|Un caféier peut mettre trois à quatre ans après la plantation avant de donner une récolte exploitable, si bien que la floraison d'un versant ce mois-ci est souvent le premier vrai signe qu'une plantation mise en terre des années plus tôt était un bon pari.|コーヒーの木は植えてから使える収穫が出るまで3〜4年かかることもある。だからこの月の斜面の花は、何年も前に植えた農園が正しい賭けだったかどうかを示す最初の本当の兆しであることが多い。",
    ),
  },
  {
    e: "🐢",
    n: t("Sea turtles come ashore to nest|Las tortugas marinas suben a anidar|Les tortues de mer viennent nidifier|ウミガメが産卵に上陸する"),
    t: t(
      "Beaches from the Gulf coast to the Caribbean go dark at night by local rule this month, streetlights dimmed and bonfires banned, so hatchlings crossing the sand will follow the glow of the surf instead of wandering inland toward a porch light. Volunteers walk the tideline before dawn counting new nests and marking each one with a stake.|Las playas, desde la costa del Golfo hasta el Caribe, se apagan de noche por norma local este mes, con farolas atenuadas y hogueras prohibidas, para que las crías que cruzan la arena sigan el brillo del oleaje en vez de desviarse tierra adentro hacia la luz de un porche. Voluntarios recorren la orilla antes del amanecer contando nidos nuevos y marcando cada uno con una estaca.|Les plages, de la côte du Golfe aux Caraïbes, s'assombrissent la nuit par règlement local ce mois-ci, lampadaires tamisés et feux de joie interdits, afin que les nouveau-nés traversant le sable suivent la lueur du ressac plutôt que de s'égarer vers la lumière d'un porche. Des bénévoles arpentent la laisse de marée avant l'aube pour compter les nouveaux nids et en marquer chacun d'un piquet.|メキシコ湾岸からカリブ海にかけて、この月の夜は地元の取り決めで暗くされる。街灯は落とされ、焚き火も禁じられる。砂を渡る子ガメが玄関灯のほうへ迷い込まず、波打ち際の明るさを追えるようにするためである。ボランティアは夜明け前に汀線を歩いて新しい巣を数え、それぞれに杭を立てて印をつける。",
    ),
    f: t(
      "A sea turtle nest's temperature during incubation decides the hatchlings' sex, warmer sand producing more females, so a run of unusually hot months can shift a whole beach's nests toward one sex for years without anyone doing anything differently.|La temperatura del nido de una tortuga marina durante la incubación decide el sexo de las crías; la arena más cálida produce más hembras, así que una racha de meses inusualmente calurosos puede inclinar los nidos de toda una playa hacia un sexo durante años sin que nadie cambie nada.|La température d'un nid de tortue de mer pendant l'incubation détermine le sexe des nouveau-nés, un sable plus chaud produisant davantage de femelles, si bien qu'une série de mois anormalement chauds peut faire pencher les nids de toute une plage vers un même sexe pendant des années sans que personne n'y change quoi que ce soit.|ウミガメの巣は孵化中の温度で子の性別が決まり、砂が暖かいほどメスが多く生まれる。異常に暑い月が続くと、誰が何をしたわけでもないのに、その浜辺全体の巣が何年も片方の性別に偏ることがある。",
    ),
  },
  {
    e: "🌾",
    n: t("The dry season pauses for a rain|La temporada seca se detiene por una lluvia|La saison sèche s'interrompt pour une pluie|乾季の合間に雨が来る"),
    t: t(
      "A short break in the dry season brings a week of rain just heavy enough to green the pastures without flooding the roads, and ranchers from the plains to the isthmus move cattle to fresh grazing while it lasts. Farmers further south, already deep in their own wet season, watch the northern reports and wait their turn.|Una breve pausa en la temporada seca trae una semana de lluvia justo lo bastante fuerte como para reverdecer los pastos sin inundar los caminos, y los ganaderos, de las llanuras al istmo, trasladan el ganado a pastos frescos mientras dura. Los agricultores más al sur, ya en plena temporada de lluvias propia, siguen los partes del norte y esperan su turno.|Une courte accalmie dans la saison sèche apporte une semaine de pluie tout juste assez forte pour reverdir les pâturages sans inonder les routes, et les éleveurs, des plaines à l'isthme, déplacent le bétail vers de l'herbe fraîche tant que cela dure. Plus au sud, les agriculteurs déjà en pleine saison des pluies suivent les bulletins du nord et attendent leur tour.|乾季の短い切れ目に、道を水浸しにしない程度の一週間の雨が降り、牧草地が緑を取り戻す。大平原から地峡まで、牧場主たちはその間に牛を新しい牧草地へ移す。すでに自分たちの雨季の真っただ中にいるさらに南の農家は、北の報告を見ながら自分たちの番を待つ。",
    ),
    f: t(
      "This short mid-dry-season rain has different names in different countries but the same cause everywhere: a brief northward shift in the belt of rain that otherwise sits over the equator most of the year.|Esta breve lluvia de mitad de la temporada seca tiene nombres distintos según el país, pero la misma causa en todas partes: un breve desplazamiento hacia el norte de la franja de lluvia que el resto del año se sitúa sobre el ecuador.|Cette courte pluie de milieu de saison sèche porte des noms différents selon les pays, mais partout la même cause : un bref déplacement vers le nord de la bande de pluie qui, le reste de l'année, se situe au-dessus de l'équateur.|この乾季の合間の短い雨は国によって呼び名が違うが、原因はどこでも同じである。ふだんは一年の大半、赤道付近に居座る雨帯が、束の間だけ北へずれるのである。",
    ),
  },
  {
    e: "🍌",
    n: t("The banana harvest peaks|La cosecha de banano llega a su pico|La récolte de bananes atteint son pic|バナナの収穫が盛りを迎える",
    ),
    t: t(
      "Cutting crews move through the plantations before dawn while the fruit is still cool, hanging stems on an overhead cable line that carries them to the packing shed without a single hand having to lift the full weight twice. Boats time their arrival to the week the fruit is cut, because bananas that wait too long on the dock never ripen right at the other end.|Las cuadrillas de corte recorren las plantaciones antes del alba mientras la fruta aún está fresca, colgando los racimos de un cable aéreo que los lleva al galpón de empaque sin que una sola mano tenga que cargar todo el peso dos veces. Los barcos calculan su llegada para la semana del corte, porque el banano que espera demasiado en el muelle nunca madura bien al otro lado.|Les équipes de coupe traversent les plantations avant l'aube pendant que le fruit est encore frais, suspendant les régimes à un câble aérien qui les porte jusqu'au hangar d'emballage sans qu'une seule main n'ait à soulever deux fois tout le poids. Les bateaux calent leur arrivée sur la semaine de la coupe, car une banane qui attend trop sur le quai ne mûrit jamais bien à l'arrivée.|収穫班は果実がまだ涼しいうちに夜明け前から農園を回り、房を頭上のケーブルに吊るす。荷は誰も二度と全重量を持ち上げることなく荷造り小屋まで運ばれる。船は収穫の週に合わせて到着を計る。埠頭で待たされすぎたバナナは、向こう岸でうまく熟さないからである。",
    ),
    f: t(
      "Bananas are cut green on purpose and ripen after harvest rather than on the plant, a trait that let the whole export trade exist in the first place, since a fruit that ripened before the boat cleared port would never survive the trip.|El banano se corta verde a propósito y madura después de la cosecha, no en la planta, un rasgo que hizo posible el comercio de exportación desde el principio, ya que una fruta que madurara antes de que el barco zarpara nunca sobreviviría el viaje.|La banane est coupée verte exprès et mûrit après la récolte plutôt que sur le plant, un trait qui a rendu possible tout le commerce d'exportation dès le départ, un fruit mûrissant avant que le bateau ne quitte le port n'ayant aucune chance de survivre au trajet.|バナナはわざと青いうちに切られ、木の上ではなく収穫後に熟す。この性質があったからこそ輸出貿易そのものが成り立った。船が港を出る前に熟してしまう果実では、航海に耐えられなかったからである。",
    ),
  },
  {
    e: "🌊",
    n: t("Hurricane season opens|Se abre la temporada de huracanes|La saison des ouragans s'ouvre|ハリケーンシーズンが始まる",
    ),
    t: t(
      "The official season begins on the same date every year regardless of what the ocean is actually doing, so coastal towns stock plywood and batteries on the calendar's schedule rather than the weather's. The first named storm of the year gets more attention for being first than for how strong it actually is.|La temporada oficial empieza la misma fecha cada año, haga lo que haga el océano en realidad, así que los pueblos costeros acopian madera contrachapada y pilas según el calendario y no según el tiempo. La primera tormenta con nombre del año recibe más atención por ser la primera que por su fuerza real.|La saison officielle débute à la même date chaque année, quoi que fasse réellement l'océan, si bien que les villes côtières stockent contreplaqué et piles selon le calendrier plutôt que la météo. La première tempête nommée de l'année attire plus l'attention pour être la première que pour sa force réelle.|公式のシーズンは、海が実際にどうであろうと毎年同じ日付に始まる。だから沿岸の町は天気ではなく暦に合わせて合板と電池を買いだめする。その年最初の名前付きの嵐は、実際の強さよりも「最初である」ことのほうで注目される。",
    ),
    f: t(
      "Storm names are assigned from a rotating alphabetical list agreed years in advance, and a name is permanently retired from the list only after a storm using it causes damage severe enough that reusing the name would feel wrong.|Los nombres de las tormentas se asignan de una lista alfabética rotativa acordada con años de antelación, y un nombre se retira de la lista para siempre solo cuando una tormenta que lo usó causó daños tan graves que reutilizarlo resultaría de mal gusto.|Les noms de tempêtes sont attribués depuis une liste alphabétique tournante arrêtée des années à l'avance, et un nom n'est retiré définitivement de la liste qu'après qu'une tempête l'ayant porté a causé des dégâts si graves que le réutiliser semblerait déplacé.|嵐の名は何年も前に決められたアルファベット順の輪番リストから割り当てられる。ある名がリストから永久に外されるのは、その名を使った嵐が、再利用するのはふさわしくないと思われるほど深刻な被害を出したときだけである。",
    ),
  },
  {
    e: "☕",
    n: t("The coffee harvest begins in earnest|La cosecha de café arranca en serio|La récolte de café bat son plein|コーヒーの収穫が本格化する",
    ),
    t: t(
      "Pickers move up the same slopes that bloomed white months earlier, now heavy with cherries that ripen unevenly enough that a single bush gets picked over three or four separate passes rather than all at once. Mills that ran silent most of the year now churn day and night pulping the harvest before it can spoil.|Los recolectores suben las mismas laderas que meses antes florecieron de blanco, ahora cargadas de cerezas que maduran de forma tan desigual que un mismo arbusto se recoge en tres o cuatro pasadas distintas en lugar de una sola vez. Los beneficios que estuvieron callados casi todo el año ahora despulpan la cosecha día y noche antes de que se eche a perder.|Les cueilleurs remontent les mêmes versants qui fleurissaient de blanc quelques mois plus tôt, désormais chargés de cerises mûrissant si inégalement qu'un même arbuste est récolté en trois ou quatre passages distincts plutôt qu'en une seule fois. Les moulins restés silencieux presque toute l'année dépulpent maintenant la récolte jour et nuit avant qu'elle ne s'abîme.|摘み手は数か月前に白く咲いた同じ斜面を登る。実は熟し方がそろわず、同じ木でも一度ではなく三、四回に分けて摘み取られる。一年の大半黙っていた製粉所は、収穫が傷む前にと昼夜を分かたずコーヒーの果肉を剥き続ける。",
    ),
    f: t(
      "The coffee cherry has to be pulped, fermented and dried within a day or two of picking or the beans inside pick up an off flavor that no roasting can fix afterward, which is why mills run around the clock at the harvest's peak rather than on a shift schedule.|La cereza de café debe despulparse, fermentarse y secarse en un día o dos tras la recolección, o el grano de dentro adquiere un sabor defectuoso que ningún tueste puede arreglar después; por eso los beneficios funcionan sin descanso en el pico de la cosecha en vez de por turnos.|La cerise de café doit être dépulpée, fermentée et séchée dans le jour ou les deux jours suivant la cueillette, sinon le grain qu'elle contient prend un goût défectueux qu'aucune torréfaction ne pourra corriger ensuite, d'où le fonctionnement des moulins jour et nuit au pic de la récolte plutôt que par équipes.|コーヒーの実は摘んでから一両日のうちに果肉を剥き、発酵させ、乾かさなければならない。それを過ぎると中の豆に、あとでどう焙煎しても直らない雑味がついてしまう。製粉所が交代制ではなく昼夜通しで動くのはそのためである。",
    ),
  },
  {
    e: "🎆",
    n: t("Independence days come one after another|Los días de independencia se suceden uno tras otro|Les fêtes de l'indépendance se succèdent|独立記念日が相次ぐ",
    ),
    t: t(
      "Several republics on the isthmus mark their independence within days of each other this month, having all declared it at once in 1821 as a single federation before splitting apart within a generation. Fireworks in one capital can sometimes be seen answered by fireworks across the border on the same night.|Varias repúblicas del istmo celebran su independencia con pocos días de diferencia este mes, tras haberla declarado todas a la vez en 1821 como una sola federación antes de separarse en el plazo de una generación. Los fuegos artificiales de una capital a veces parecen tener respuesta en fuegos artificiales al otro lado de la frontera la misma noche.|Plusieurs républiques de l'isthme marquent leur indépendance à quelques jours d'intervalle ce mois-ci, l'ayant toutes proclamée d'un coup en 1821 en une seule fédération avant de se scinder en l'espace d'une génération. Les feux d'artifice d'une capitale trouvent parfois un écho de l'autre côté de la frontière, la même nuit.|地峡のいくつかの共和国は、この月のうちに数日を置かず独立を祝う。1821年、いずれも一つの連邦として一斉に独立を宣言し、一世代のうちに分かれていったからである。ある首都の花火に、同じ夜、国境の向こうの花火が応えることもある。",
    ),
    f: t(
      "The federation that declared independence together in 1821 lasted barely seventeen years before civil wars split it into separate republics, so the shared date on the calendar is one of the few things left of a union that otherwise did not hold.|La federación que declaró la independencia junta en 1821 duró apenas diecisiete años antes de que las guerras civiles la partieran en repúblicas separadas, así que la fecha compartida en el calendario es una de las pocas cosas que quedan de una unión que, por lo demás, no se sostuvo.|La fédération qui proclama l'indépendance ensemble en 1821 dura à peine dix-sept ans avant que des guerres civiles ne la scindent en républiques distinctes, si bien que la date commune du calendrier est l'une des rares choses qui subsistent d'une union qui, sinon, ne tint pas.|1821年に共に独立を宣言した連邦は、内戦で別々の共和国に分かれるまでわずか17年しか続かなかった。暦に残る同じ日付は、それ以外はほとんど残らなかったこの連合の数少ない痕跡の一つである。",
    ),
  },
  {
    e: "🍁",
    n: t("Leaves turn along the northern rail lines|Las hojas cambian a lo largo de las vías del norte|Les feuilles changent le long des voies du nord|北の鉄路沿いに紅葉が広がる",
    ),
    t: t(
      "Colour spreads south along the mountain corridors carrying the continent's oldest rail lines, and observation cars that ran empty in summer sell out for the single weekend a valley hits its peak. Farther south, past where frost ever reaches, the calendar simply turns without a single leaf changing color.|El color se extiende hacia el sur por los corredores montañosos que llevan las vías más antiguas del continente, y los coches mirador que en verano circulaban vacíos se agotan el único fin de semana en que un valle alcanza su punto máximo. Más al sur, donde nunca llega la escarcha, el calendario simplemente avanza sin que cambie de color ni una sola hoja.|La couleur se répand vers le sud le long des corridors montagneux qui portent les plus anciennes voies ferrées du continent, et les voitures panoramiques qui roulaient vides en été affichent complet le seul week-end où une vallée atteint son pic. Plus au sud, là où le gel n'arrive jamais, le calendrier avance simplement sans qu'une seule feuille ne change de couleur.|色は、大陸最古の鉄路が通る山あいの回廊沿いに南へ広がっていく。夏はがら空きだった展望車は、谷が紅葉の盛りを迎えるたった一つの週末に満席になる。霜の降りない、さらに南の土地では、葉の色が変わることなく暦だけがめくれていく。",
    ),
    f: t(
      "The observation cars built for this view often had swiveling seats bolted to the floor rather than facing rows, a design choice made specifically so a passenger could turn to follow a single mountain as the train curved around it.|Los coches mirador construidos para esta vista solían llevar asientos giratorios atornillados al suelo en vez de filas enfrentadas, una elección de diseño hecha justamente para que un pasajero pudiera girar y seguir una sola montaña mientras el tren la rodeaba en la curva.|Les voitures panoramiques bâties pour ce paysage avaient souvent des sièges pivotants boulonnés au sol plutôt que des rangées face à face, un choix de conception fait justement pour qu'un passager puisse pivoter et suivre une même montagne pendant que le train la contournait.|この眺めのために造られた展望車には、向かい合う座席の列ではなく、床にボルト留めされた回転椅子が備わっていることが多い。これは、列車がカーブする間も乗客が一つの山を目で追い続けられるよう、わざわざそう設計されたものである。",
    ),
  },
  {
    e: "🦃",
    n: t("Harvest holidays fill the rails|Las fiestas de la cosecha llenan los rieles|Les fêtes des moissons remplissent les rails|収穫祝いの祝日で鉄路が混む",
    ),
    t: t(
      "The busiest travel week of the year in the north sends every seat on every line north of the mex region into a sellout days in advance, families converging on a single table the way they do nowhere else on the calendar. The rest of the continent, mid-dry-season and mid-term, watches the northern news and keeps working.|La semana de viajes más ocupada del año en el norte deja sin un solo asiento libre en cada línea al norte de la región de México, con días de antelación, mientras las familias convergen en una sola mesa como en ningún otro momento del calendario. El resto del continente, en plena temporada seca y en plena marcha, ve las noticias del norte y sigue trabajando.|La semaine de voyage la plus chargée de l'année dans le nord affiche complet, des jours à l'avance, sur chaque place de chaque ligne au nord de la région du Mexique, les familles convergeant vers une même table comme à aucun autre moment du calendrier. Le reste du continent, en pleine saison sèche et en plein travail, regarde les nouvelles du nord et continue de travailler.|北では、一年でいちばん旅の混む週に、メキシコより北のあらゆる路線の座席が数日前から売り切れる。家族は暦のどの時期にもまして、一つの食卓へ集まる。大陸の他の地域は乾季と日々の仕事の真っただ中で、北のニュースを見ながら働き続ける。",
    ),
    f: t(
      "Railways in the north once ran extra sections of the same named train back to back on this one week alone, since a single set of cars could not carry everyone trying to be home on the same afternoon.|En el norte, los ferrocarriles llegaron a poner en marcha secciones adicionales de un mismo tren con el mismo nombre, una tras otra, solo durante esta semana, porque un único juego de vagones no podía llevar a todos los que querían estar en casa la misma tarde.|Dans le nord, les chemins de fer faisaient jadis rouler des sections supplémentaires d'un même train, bout à bout, rien que cette semaine-là, un seul jeu de voitures ne pouvant transporter tous ceux qui voulaient rentrer le même après-midi.|北では、この一週間だけ、同じ名の列車の増結編成が次々と走らされたこともあった。一組の車両だけでは、同じ午後に家に着きたい人全員を運びきれなかったからである。",
    ),
  },
  {
    e: "🎄",
    n: t("Poinsettias and posadas move south to north|Las flores de Pascua y las posadas van del sur al norte|Les poinsettias et les posadas remontent du sud au nord|ポインセチアとポサーダが南から北へ",
    ),
    t: t(
      "A flower native to Mexico's Pacific coast, first carried north by a nineteenth-century ambassador with a garden hobby, now covers windowsills from the isthmus to the Arctic circle by this month, red leaves mistaken for petals by nearly everyone who grows them. Nightly processions reenacting a search for shelter move through towns from Guatemala to New Mexico, ending each evening at a different house.|Una flor originaria de la costa pacífica de México, llevada por primera vez al norte por un embajador del siglo XIX aficionado a la jardinería, cubre ya para este mes los alféizares desde el istmo hasta el círculo ártico, con hojas rojas que casi todo el mundo que las cultiva confunde con pétalos. Procesiones nocturnas que recrean la búsqueda de posada recorren pueblos de Guatemala a Nuevo México, terminando cada noche en una casa distinta.|Une fleur originaire de la côte pacifique du Mexique, rapportée pour la première fois vers le nord par un ambassadeur du XIXe siècle amateur de jardinage, couvre désormais ce mois-ci les rebords de fenêtre de l'isthme jusqu'au cercle polaire, ses feuilles rouges prises pour des pétales par presque tous ceux qui la cultivent. Des processions nocturnes rejouant une recherche de logis traversent des villes du Guatemala au Nouveau-Mexique, s'achevant chaque soir dans une maison différente.|メキシコ太平洋岸原産のこの花は、19世紀に園芸好きの大使によって初めて北へ運ばれ、いまではこの月、地峡から北極圏近くまで窓辺を覆う。赤い葉を花びらと思い込んでいる者がほとんどである。宿を求めてさまよう場面を演じる夜ごとの行列が、グアテマラからニューメキシコまでの町を練り歩き、毎晩違う家で終わる。",
    ),
    f: t(
      "What looks like a single large red flower on this plant is actually a cluster of small yellow flowers surrounded by leaves that turn red, a trick of coloring that had to be perfected through generations of selective breeding before it looked convincing enough to sell.|Lo que parece una única flor roja grande en esta planta es en realidad un racimo de flores amarillas pequeñas rodeadas de hojas que se vuelven rojas, un truco de coloración que tuvo que perfeccionarse a través de generaciones de cría selectiva antes de resultar lo bastante convincente para venderse.|Ce qui ressemble à une seule grande fleur rouge sur cette plante est en réalité un amas de petites fleurs jaunes entourées de feuilles qui rougissent, un artifice de coloration qu'il fallut perfectionner sur des générations de sélection avant qu'il ne paraisse assez convaincant pour se vendre.|この植物の一輪の大きな赤い花に見えるものは、実は赤く色づいた葉に囲まれた小さな黄色い花の集まりにすぎない。この色づきの仕掛けは、売り物として説得力を持つまでに、何世代もの選抜育種を経てようやく完成された。",
    ),
  },
  {
    e: "🥶",
    n: t("A cold snap drops south of its usual line|Una ola de frío baja más al sur de lo habitual|Un coup de froid descend plus au sud qu'à l'accoutumée|寒波がふだんより南まで下がる",
    ),
    t: t(
      "Cold air that usually stays north of the border occasionally spills south this month, catching towns and crops built for heat entirely unprepared; pipes that never needed insulation burst, and fields of tender crops are covered overnight with anything that will hold in warmth. The cold snap rarely lasts more than a few days, but the damage to a season's harvest can last much longer.|El aire frío que suele quedarse al norte de la frontera a veces se desborda hacia el sur este mes, tomando totalmente desprevenidos a pueblos y cultivos hechos para el calor; tuberías que nunca necesitaron aislamiento revientan, y campos de cultivos delicados se cubren de la noche a la mañana con lo que sea que retenga el calor. La ola de frío rara vez dura más de unos días, pero el daño a la cosecha de la temporada puede durar mucho más.|L'air froid qui reste habituellement au nord de la frontière déborde parfois vers le sud ce mois-ci, prenant totalement au dépourvu des villes et des cultures conçues pour la chaleur ; des tuyaux qui n'ont jamais eu besoin d'isolation éclatent, et des champs de cultures fragiles sont recouverts du jour au lendemain de tout ce qui peut retenir la chaleur. Le coup de froid dure rarement plus de quelques jours, mais les dégâts sur la récolte de la saison peuvent durer bien plus longtemps.|国境より北にとどまるはずの寒気が、この月まれに南まで流れ込み、暑さを前提にした町や作物を丸腰のまま襲う。断熱の要らなかった配管が破裂し、傷みやすい作物の畑は一夜のうちに暖を保てそうなものなら何でも被せられる。寒波そのものは数日しか続かないことが多いが、その年の収穫への被害はずっと長く尾を引く。",
    ),
    f: t(
      "Citrus growers this far south sometimes run wind machines or even set smudge pots burning through a single freezing night specifically because a few degrees of difference decides whether an entire orchard's fruit survives to market.|Los citricultores de estas latitudes tan al sur a veces ponen en marcha máquinas de viento o incluso encienden hogueras de humo durante una sola noche de helada, precisamente porque unos pocos grados de diferencia deciden si la fruta de todo un huerto llega o no al mercado.|Les agrumiculteurs de ces latitudes si méridionales font parfois tourner des éoliennes antigel, voire allument des feux de fumée pour une seule nuit de gel, précisément parce que quelques degrés d'écart décident si les fruits de tout un verger survivront jusqu'au marché.|これほど南にある柑橘農家でも、たった一夜の氷点下のために風力送風機を回したり、いぶし火を焚いたりすることがある。わずか数度の差が、果樹園全体の実が市場まで持つかどうかを分けるからである。",
    ),
  },
  {
    e: "🚂",
    n: t("Dry season ends and the rails reopen|Termina la temporada seca y los rieles reabren|La saison sèche s'achève et les rails rouvrent|乾季が終わり、線路が開き直す",
    ),
    t: t(
      "Track crews use the last dry weeks before the rains to replace ties and tighten every loose bolt on lines that will otherwise wash out once the wet season starts in earnest, working double shifts against a deadline set by the sky rather than the calendar. A branch line closed for maintenance reopens with a small crowd waiting at the platform to be first aboard.|Las cuadrillas de vía aprovechan las últimas semanas secas antes de las lluvias para cambiar traviesas y apretar cada perno suelto en líneas que de otro modo se socavarían en cuanto la temporada de lluvias arranque en serio, trabajando dobles turnos contra un plazo que marca el cielo y no el calendario. Un ramal cerrado por mantenimiento reabre con un pequeño grupo esperando en el andén para ser los primeros a bordo.|Les équipes de voie profitent des dernières semaines sèches avant les pluies pour remplacer les traverses et resserrer chaque boulon desserré sur des lignes qui, sinon, seraient emportées dès que la saison des pluies s'installera pour de bon, travaillant en double équipe contre un délai fixé par le ciel plutôt que par le calendrier. Un embranchement fermé pour entretien rouvre avec une petite foule attendant sur le quai pour être du premier voyage.|保線班は雨季が始まる前の最後の乾いた数週間を使って、放っておけば本格的な雨季で流されてしまう路線の枕木を替え、緩んだボルトを締め直す。暦ではなく空が決めた締め切りに追われ、二交代で働く。保守のため閉じていた支線が開き直り、一番乗りを待つ小さな人だかりがホームにできる。",
    ),
    f: t(
      "Because the wet season's arrival varies by a few weeks from year to year, maintenance crews on lines through the isthmus watch the same seasonal cues farmers do rather than a fixed date, timing the last dry-season work to the same signs that tell growers when to plant.|Como la llegada de la temporada de lluvias varía unas semanas de un año a otro, las cuadrillas de mantenimiento en las líneas del istmo siguen las mismas señales estacionales que los agricultores en vez de una fecha fija, ajustando el último trabajo de temporada seca a las mismas señas que indican a los cultivadores cuándo sembrar.|L'arrivée de la saison des pluies variant de quelques semaines d'une année à l'autre, les équipes d'entretien des lignes traversant l'isthme suivent les mêmes signes saisonniers que les agriculteurs plutôt qu'une date fixe, calant les derniers travaux de saison sèche sur les mêmes indices qui disent aux cultivateurs quand semer.|雨季の訪れは年によって数週間前後するため、地峡を通る路線の保線班は決まった日付ではなく、農家と同じ季節の兆しを頼りにする。乾季最後の作業も、農家が種をまく時期を告げるのと同じ兆候に合わせて行われる。",
    ),
  },
];
