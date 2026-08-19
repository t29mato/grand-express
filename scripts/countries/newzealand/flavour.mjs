/**
 * ニュージーランドの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。ただし南半球なので、4月は
 * 秋の始まりであり、実際の季節の巡りは北半球の国とは半年ずれる
 * (韓国・日本の4月=春とは逆で、ここでの4月は秋)。
 * 国単位の盤面なので、日本・フランス・インドと同じく「地方まるごとの
 * 好不況」で差をつける(実際の効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const NEWZEALAND_META = {
  id: "newzealand",
  name: t("New Zealand|Nueva Zelanda|Nouvelle-Zélande|ニュージーランド"),
  blurb: t(
    "Two islands split by a strait, joined only by a train that boards a ship|Dos islas separadas por un estrecho, unidas solo por un tren que sube a un barco|Deux îles séparées par un détroit, reliées seulement par un train qui embarque sur un navire|海峡で分かたれた二つの島を、船に乗り込む列車だけがつなぐ国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・オーストラリアと同じ理由。ここは他国と同じ暫定値100のまま)。
  cur: { pre: "NZ$", post: "", mul: 100 },
  start: "wellington",
  cpuNames: ["Kea", "Tuatara", "Weka", "Kārearea"],
  // 黒(オールブラックス・シルバーファーン)、マオリ旗の赤と白、原生林の緑、氷河湖の青。
  stripe: ["#1a1a1a", "#c8102e", "#f6efe2", "#2f6b3a", "#2f8fb4"],
};

/** 実際の地域区分を簡略化した11分割。 */
export const NEWZEALAND_REGIONS = {
  akl: t("Auckland & Northland|Auckland y Northland|Auckland et Northland|オークランド・ノースランド"),
  wko: t("Waikato & Bay of Plenty|Waikato y Bay of Plenty|Waikato et Bay of Plenty|ワイカト・ベイオブプレンティ"),
  cni: t("The Central Plateau|La Meseta Central|Le Plateau central|中央北島・火山台地"),
  egc: t("The East Coast & Hawke's Bay|La Costa Este y Hawke's Bay|La Côte Est et Hawke's Bay|イーストコースト・ホークス・ベイ"),
  tar: t("Taranaki & Whanganui|Taranaki y Whanganui|Taranaki et Whanganui|タラナキ・ワンガヌイ"),
  wgn: t("Wellington & the lower North Island|Wellington y el sur de la Isla Norte|Wellington et le bas de l'île du Nord|ウェリントン・下部北島"),
  top: t("The Top of the South|El Norte de la Isla Sur|Le Nord de l'île du Sud|サウス島北端"),
  cby: t("Canterbury|Canterbury|Canterbury|カンタベリー"),
  wcs: t("The West Coast|La Costa Oeste|La Côte Ouest|西海岸"),
  ota: t("Otago|Otago|Otago|オタゴ"),
  fld: t("Fiordland & Southland|Fiordlandia y Southland|Fiordland et Southland|フィヨルドランド・サウスランド"),
};

/**
 * アイテム。効果の種類はどの盤面も同じ9種で、名前と物語だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。新しい鍵の
 * 登録は取りまとめ側が行う)。
 */
export const NEWZEALAND_ITEMS = {
  roaringforties: {
    e: "💨",
    price: 260,
    kind: "move",
    n: t("Caught by the Roaring Forties|Atrapado por los Roaring Forties|Emporté par les Roaring Forties|吼える四十度風にさらわれて"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "New Zealand sits squarely inside the Roaring Forties, the belt of strong, unbroken westerly wind that circles the globe between 40 and 50 degrees south with almost nothing to slow it down, once prized by sailing ships for the fastest possible run east.|Nueva Zelanda se encuentra justo dentro de los Roaring Forties, la franja de viento del oeste fuerte e ininterrumpido que rodea el planeta entre los 40 y 50 grados sur casi sin nada que lo frene, antaño apreciada por los veleros para la ruta más rápida hacia el este.|La Nouvelle-Zélande se trouve en plein cœur des Roaring Forties, cette ceinture de vent d'ouest fort et ininterrompu qui fait le tour du globe entre 40 et 50 degrés sud sans presque rien pour la freiner, jadis prisée des voiliers pour filer le plus vite possible vers l'est.|ニュージーランドは、南緯40〜50度を遮るものほとんどなく吹き抜ける強い西風の帯「吼える四十度風」の真ん中に位置する。かつて帆船はこの風を使って東へ最速で進む航路を選んだ。",
    ),
  },
  starcompass: {
    e: "⭐",
    price: 380,
    kind: "pre",
    n: t("A Star Compass Reading|Una lectura del compás estelar|Une lecture de la boussole étoilée|星のコンパスを読む"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Long before compasses, Polynesian navigators crossed thousands of kilometres of open Pacific by reading the rising and setting points of particular stars, the pattern of ocean swells and the flight paths of land-seeking birds, knowledge passed down orally and only formally revived and taught again from the 1990s onward.|Mucho antes de la brújula, los navegantes polinesios cruzaban miles de kilómetros de Pacífico abierto leyendo la salida y puesta de ciertas estrellas, el patrón del oleaje y el vuelo de las aves que buscan tierra, un saber transmitido oralmente y solo revivido y enseñado de nuevo formalmente desde los años noventa.|Bien avant la boussole, les navigateurs polynésiens traversaient des milliers de kilomètres de Pacifique en lisant le lever et le coucher de certaines étoiles, le motif de la houle et le vol des oiseaux cherchant la terre, un savoir transmis oralement et seulement ranimé et réenseigné formellement à partir des années 1990.|コンパスが登場するずっと前、ポリネシアの航海者たちは特定の星の出没する位置や波のうねりの模様、陸を目指す鳥の飛び方を読んで太平洋を何千kmも渡った。この知恵は口伝えで受け継がれ、1990年代になってようやく体系立てて教え直されるようになった。",
    ),
  },
  tuisong: {
    e: "🐦",
    price: 340,
    kind: "pre",
    n: t("A Tui's Two Songs|Los dos cantos del tui|Les deux chants du tui|ツイの二つの歌"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The tui has two voice boxes working independently, letting it produce two notes at once and switch between an astonishing range of clicks, wheezes and bell-like chimes that can vary so much from valley to valley that birdwatchers describe it as having a local accent.|El tui tiene dos cajas de voz que funcionan de forma independiente, lo que le permite emitir dos notas a la vez y alternar entre una asombrosa variedad de chasquidos, resuellos y tañidos de campana que varían tanto de un valle a otro que los observadores de aves hablan de un «acento» local.|Le tui possède deux syrinx fonctionnant indépendamment, ce qui lui permet d'émettre deux notes à la fois et de passer par une étonnante variété de clics, sifflements et tintements de cloche qui varient tant d'une vallée à l'autre que les ornithologues parlent d'un accent local.|ツイは独立して働く二つの発声器官を持ち、同時に二つの音を出すことができる。カチカチという音やゼイゼイという音、鈴のような音色まで実に幅広く、谷ごとに鳴き方が違うため、バードウォッチャーはこれを「土地なまり」と呼ぶ。",
    ),
  },
  northernexplorer: {
    e: "🚆",
    price: 620,
    kind: "pre",
    n: t("A Northern Explorer Express Ticket|Un billete exprés del Northern Explorer|Un billet express du Northern Explorer|北方探検号の急行切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Northern Explorer covers the roughly 680 km between Auckland and Wellington in about eleven hours, slower than driving, but the only way to see the Raurimu Spiral and the Tongariro volcanoes without ever taking your eyes off the window.|El Northern Explorer cubre los cerca de 680 km entre Auckland y Wellington en unas once horas, más lento que ir en coche, pero es la única forma de ver la espiral de Raurimu y los volcanes de Tongariro sin apartar la vista de la ventanilla.|Le Northern Explorer parcourt les quelque 680 km entre Auckland et Wellington en environ onze heures, plus lentement qu'en voiture, mais c'est le seul moyen de voir la spirale de Raurimu et les volcans du Tongariro sans jamais quitter la fenêtre des yeux.|北方探検号(ノーザン・エクスプローラー)はオークランド〜ウェリントン間およそ680kmを約11時間かけて走る。車より遅いが、ラウリム・スパイラルとトンガリロの火山群を窓から目を離さずに眺められる唯一の手段である。",
    ),
  },
  heitiki: {
    e: "🪬",
    price: 320,
    kind: "passive",
    n: t("A Hei-Tiki Pendant|Un colgante hei-tiki|Un pendentif hei-tiki|ヘイ・ティキの首飾り"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Carved traditionally from pounamu, a hei-tiki is usually passed down through a family for generations rather than bought new for oneself, and is said to take on some of each wearer's own mana (standing) the longer it is worn, so an old, worn pendant is valued above a freshly carved one.|Tallado tradicionalmente en pounamu, un hei-tiki suele transmitirse en una familia durante generaciones en vez de comprarse nuevo para uno mismo, y se dice que va tomando parte del mana (prestigio) de cada portador cuanto más se lleva, así que un colgante viejo y desgastado se valora más que uno recién tallado.|Sculpté traditionnellement dans le pounamu, un hei-tiki se transmet généralement dans une famille sur plusieurs générations plutôt que d'être acheté neuf pour soi-même, et l'on dit qu'il absorbe un peu du mana (prestige) de chaque porteur à mesure qu'il est porté, si bien qu'un pendentif ancien et usé vaut plus qu'un pendentif fraîchement sculpté.|伝統的にポウナム(グリーンストーン)を彫って作るヘイ・ティキは、自分のために新しく買うものというより家族の中で代々受け継がれるもので、身につける者のマナ(威信)を少しずつ帯びていくとされる。だから古く使い込まれた一点のほうが、彫ったばかりの新品より重んじられる。",
    ),
  },
  taniwhaoffering: {
    e: "🪨",
    price: 440,
    kind: "pre",
    n: t("An Offering for the Taniwha|Una ofrenda para el taniwha|Une offrande pour le taniwha|タニファへの供物"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Travellers crossing a river or lake known to be a taniwha's home have long been advised to leave a small offering first — a pebble, a leaf, a pinch of food — rather than cross empty-handed and risk being noticed.|A los viajeros que cruzan un río o lago conocido como morada de un taniwha se les aconseja desde hace tiempo dejar antes una pequeña ofrenda —un guijarro, una hoja, una pizca de comida— en vez de cruzar con las manos vacías y arriesgarse a ser notados.|Les voyageurs traversant une rivière ou un lac réputé abriter un taniwha se voient depuis longtemps conseiller de laisser d'abord une petite offrande — un galet, une feuille, une pincée de nourriture — plutôt que de traverser les mains vides au risque d'être remarqués.|タニファの住処とされる川や湖を渡る旅人は、昔から手ぶらで渡って気づかれる危険を冒すより、小石や葉、ひとつまみの食べ物といったささやかな供物を先に置いていくよう言い伝えられてきた。",
    ),
  },
  correspondence: {
    e: "✉️",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("A Correspondence School Lesson|Una lección de la Escuela por Correspondencia|Une leçon de l'école par correspondance|通信学校の課題"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "New Zealand's Correspondence School has taught children too remote for a local school by mail since 1922, later by radio and now online, and for decades a single teacher might mark work sent in from a farm, a lighthouse and a fishing boat all in the same week.|La Escuela por Correspondencia de Nueva Zelanda enseña por correo desde 1922 a niños demasiado alejados de un colegio local, más tarde por radio y ahora en línea, y durante décadas un solo profesor podía corregir trabajos enviados desde una granja, un faro y un barco de pesca en la misma semana.|L'école par correspondance de Nouvelle-Zélande enseigne par courrier depuis 1922 aux enfants trop isolés d'une école locale, plus tard par radio et aujourd'hui en ligne, et pendant des décennies un même professeur pouvait corriger des devoirs envoyés depuis une ferme, un phare et un bateau de pêche la même semaine.|ニュージーランドの通信学校は1922年以来、近くに学校のない遠隔地の子どもたちに郵便で、のちにラジオで、いまはオンラインで授業を届けてきた。何十年ものあいだ、たった一人の教師が同じ週に農場・灯台・漁船から届いた課題を採点することもあった。",
    ),
  },
  kauirgum: {
    e: "🟠",
    price: 260,
    kind: "pre",
    n: t("A Handful of Kauri Gum|Un puñado de goma kauri|Une poignée de gomme kauri|カウリ樹脂のひとかけ"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Fossilised resin that leaked from ancient kauri trees over thousands of years, kauri gum was dug from Northland swamps by the tonne in the late 1800s and exported for varnish, and diggers judged a lump's worth by holding it up to the light to check its clarity.|La goma kauri, resina fosilizada que exudaron antiguos árboles kauri durante miles de años, se extraía por toneladas de los pantanos de Northland a finales del siglo XIX y se exportaba para barniz, y los excavadores juzgaban el valor de un trozo alzándolo a la luz para ver su transparencia.|La gomme kauri, résine fossilisée suintée par d'anciens kauris pendant des milliers d'années, était extraite par tonnes des marais de Northland à la fin du XIXe siècle et exportée pour le vernis, et les chratteurs jugeaient la valeur d'un morceau en le tenant à la lumière pour vérifier sa clarté.|太古のカウリの木が何千年もかけてにじませた樹脂が化石化したカウリ・ガムは、19世紀末にノースランドの湿地からトン単位で掘り出され、ニスの原料として輸出された。掘り手は塊を光にかざしてその透明度を確かめ、値打ちを見定めた。",
    ),
  },
  jandalsprint: {
    e: "🩴",
    price: 400,
    kind: "pre",
    n: t("A Jandal Sprint|Una carrera en jandals|Un sprint en jandals|ジャンダルで全力疾走"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The jandal, New Zealand's name for a rubber thong sandal, is cheap, universal and famously bad for actually running in, which has not stopped it from becoming the default footwear for chasing a bus, a dog or a rolling barbecue lid.|El jandal, como se llama en Nueva Zelanda a la sandalia de goma tipo chancla, es barato, universal y famosamente malo para correr de verdad, lo que no ha impedido que se convierta en el calzado por defecto para perseguir un autobús, un perro o una tapa de barbacoa que rueda.|Le jandal, nom néo-zélandais de la sandale en caoutchouc à lanière, est bon marché, universel et notoirement mauvais pour vraiment courir, ce qui ne l'a pas empêché de devenir la chaussure par défaut pour rattraper un bus, un chien ou un couvercle de barbecue qui roule.|ジャンダルはニュージーランドでゴム製のビーチサンダルを指す言葉で、安く誰もが持っているが、本気で走るには不向きなことで有名だ。それでもバスや犬、転がっていくバーベキューの蓋を追いかけるときの定番の履物になっている。",
    ),
  },
};

/**
 * 厄災の神。マオリの伝承に出るタニファ(川・湖・海の危険な場所に棲むとされる
 * 守護的な生き物)にした。人を苦しめる悪霊ではなく、縄張り意識が強すぎる
 * だけの性格として描く(韓国のトッケビ・茨城のダイダラボッチと同じ考え方)。
 * タプ(聖地)に深入りせず、公開されている一般的な伝承の粒度で扱っている。
 */
export const NEWZEALAND_SPIRIT = {
  e: "🐉",
  n: t("The Taniwha|El taniwha|Le taniwha|タニファ"),
  big: t("The Taniwha's Flood|La crecida del taniwha|La crue du taniwha|タニファの大水"),
  ward: "heitiki",
  arrive: t(
    "<b>🐉 A taniwha has taken an interest in you.</b> Old accounts describe these guardians as living in a particular river bend, lake or stretch of coast, fiercely protective of their own water and quick to trouble anyone who crosses it without due respect. It now swims alongside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🐉 Un taniwha se ha fijado en ti.</b> Los viejos relatos describen a estos guardianes viviendo en un recodo de río, un lago o un tramo de costa concretos, ferozmente protectores de sus propias aguas y prestos a molestar a quien las cruce sin el debido respeto. Ahora nada junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🐉 Un taniwha s'est intéressé à toi.</b> Les vieux récits décrivent ces gardiens vivant dans un méandre de rivière, un lac ou un tronçon de côte précis, farouchement protecteurs de leurs eaux et prompts à tourmenter quiconque les traverse sans le respect voulu. Il nage désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🐉 タニファに目を付けられた。</b> 昔からの言い伝えでは、この守り神は特定の川の曲がり角や湖、海岸に棲み、自分の水域を激しく守り、敬意を払わず渡る者にはすぐさま厄介ごとをもたらすという。いま目的地から最も遠い <b>{0}</b> の傍らを泳ぎ、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🐉 <b>The taniwha</b> loses interest and swims after <b>{0}</b>, farthest from {1}.|🐉 <b>El taniwha</b> pierde el interés y nada tras <b>{0}</b>, el más lejano de {1}.|🐉 <b>Le taniwha</b> se désintéresse et nage vers <b>{0}</b>, le plus loin de {1}.|🐉 <b>タニファ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ泳いでいった。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns through the taniwha's water and never once shown it proper respect. It rises up and floods the whole road ahead — <b>the Taniwha's Flood</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos viajando por las aguas del taniwha sin mostrarle nunca el debido respeto. Este se alza e inunda todo el camino: empieza <b>la crecida del taniwha</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours dans les eaux du taniwha sans jamais lui témoigner le respect voulu. Il se dresse et inonde toute la route à venir : <b>la crue du taniwha</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> はタニファの水域を4ターンも旅していながら、一度も敬意を示さなかった。タニファは身を起こし、行く手の道すべてを水浸しにする。<b>タニファの大水</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in Māori tradition a taniwha's temper could usually be settled with the right karakia (incantation) or a proper offering left at the water's edge, spoken or given by someone who knew the correct words — not by force. Nobody playing this game has learned the words yet.|<b>Tras la historia:</b> en la tradición maorí, el genio de un taniwha solía calmarse con la karakia (invocación) adecuada o una ofrenda correcta dejada a la orilla del agua, dicha o entregada por alguien que conociera las palabras correctas, no por la fuerza. Nadie en esta partida ha aprendido aún esas palabras.|<b>Derrière l'histoire :</b> dans la tradition māorie, la colère d'un taniwha pouvait généralement s'apaiser avec la bonne karakia (incantation) ou une offrande convenable laissée au bord de l'eau, prononcée ou donnée par quelqu'un connaissant les mots justes, non par la force. Personne dans cette partie n'a encore appris ces mots.|<b>物語の背景:</b> マオリの伝承では、タニファの機嫌は力ずくではなく、正しい言葉を知る者が唱える適切なカラキア(祈りの言葉)や、水辺に置く正しい供物によって鎮められるものだったという。旅人はまだ、その言葉を誰も覚えていない。",
  ),
  pleased: t(
    "It flicks its great tail in approval, and a coin washes up on the bank. <b>{0}</b> gains <span class='money'>+{1}</span>.|Agita su gran cola en señal de aprobación y una moneda llega a la orilla. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il agite sa grande queue en signe d'approbation et une pièce s'échoue sur la berge. <b>{0}</b> gagne <span class='money'>+{1}</span>.|大きな尾を振って満足げにするひょうしに、銭が一枚岸に打ち上げられた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A small offering is left where it can see it. Taniwha are said to respect nothing more than being properly acknowledged, and it slips back beneath the water, passing <b>{0}</b> without noticing this turn.|Se deja una pequeña ofrenda donde pueda verla. Se dice que nada respetan más los taniwha que ser reconocidos como es debido, y se desliza de nuevo bajo el agua, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une petite offrande est déposée là où il peut la voir. On dit que rien ne compte plus pour un taniwha qu'être dûment reconnu, et il replonge sous l'eau, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|見えるところにささやかな供物を置いた。タニファは何よりもきちんと敬意を払われることを重んじるという。タニファは水の下へ滑るように戻っていき、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。プレート境界の上の国であることと、日々の暮らしの両方から選んでいる。 */
export const NEWZEALAND_DOOM = [
  {
    id: "ruapehu-ash",
    n: t("Ash falls from Ruapehu|Cae ceniza del Ruapehu|Des cendres tombent du Ruapehu|ルアペフの降灰"),
    t: t(
      "A rumble from the volcano at the centre of the North Island sends a grey plume drifting downwind, and within the hour it is dusting rooftops, gardens and the very rails a train needs clean to grip. Engines run at reduced speed until track crews can sweep the worst of the grit away, and anyone caught outside comes back in coughing.|Un retumbo del volcán en el centro de la Isla Norte lanza una columna gris que deriva con el viento, y en una hora ya cubre de polvo los tejados, los jardines y los mismos raíles que un tren necesita limpios para agarrar. Las máquinas circulan más despacio hasta que las cuadrillas puedan barrer lo peor de la ceniza, y quien queda fuera vuelve tosiendo.|Un grondement du volcan au centre de l'île du Nord envoie un panache gris dérivant sous le vent, et en une heure il recouvre déjà les toits, les jardins et les rails mêmes qu'un train doit avoir propres pour adhérer. Les locomotives roulent au ralenti jusqu'à ce que les équipes puissent balayer le pire de la cendre, et quiconque est resté dehors rentre en toussant.|北島中央の火山がひと唸りすると、灰色の噴煙が風下へ流れ出し、一時間もしないうちに屋根や庭、そして列車が車輪を利かせるために清浄でなければならない線路までも粉で覆う。保線班が最悪の部分を掃き終えるまで機関車は速度を落として走り、外にいた者は咳き込みながら戻ってくる。",
    ),
  },
  {
    id: "norwester",
    n: t("The Nor'wester gale howls through|El vendaval del noroeste ruge|La tempête du Nor'wester hurle|ノーウェスターが吹き荒れる"),
    t: t(
      "A hot, dry wind roars down off the mountains and across the plains, arching the clouds into a long grey bank locals call the Nor'wester arch, and stripping loose iron roofing along the way. People half-joke that the wind itself sours moods and starts arguments, and more than a few small boats stay lashed to the wharf until it finally blows itself out.|Un viento cálido y seco baja rugiendo de las montañas y cruza las llanuras, arqueando las nubes en una larga banda gris que los lugareños llaman el arco del noroeste, y arrancando a su paso tejados de chapa suelta. La gente bromea a medias con que el propio viento agria el humor e inicia discusiones, y más de un botecito queda amarrado al muelle hasta que por fin amaina.|Un vent chaud et sec dévale les montagnes en rugissant à travers les plaines, arquant les nuages en une longue bande grise que les habitants appellent l'arche du Nor'wester, et arrachant au passage des toitures en tôle mal fixées. On plaisante à moitié en disant que ce vent aigrit les humeurs et déclenche les disputes, et plus d'un petit bateau reste amarré au quai jusqu'à ce qu'il finisse par se calmer.|山から吹き下ろす熱く乾いた風が平野を轟音とともに渡り、雲を「ノーウェスター・アーチ」と呼ばれる長い灰色の弧に押し曲げ、途中で緩んだトタン屋根を剥がしていく。この風そのものが機嫌を悪くさせ、喧嘩の種になるとも半ば冗談で言われ、小舟の何隻かは吹き止むまで波止場に繋がれたままになる。",
    ),
    months: [6, 8],
  },
  {
    id: "flood-washout",
    n: t("A river takes out the bridge|Un río se lleva el puente|Une rivière emporte le pont|川が鉄橋を洗い流す"),
    t: t(
      "Days of rain swell a river until it undercuts a rail bridge overnight, and the first train through in the morning has to stop short of a line that now hangs over nothing. Repair crews and a fleet of replacement buses take over until the span can be shored up, and the detour eats into everyone's afternoon.|Días de lluvia hinchan un río hasta que socava un puente ferroviario durante la noche, y el primer tren de la mañana tiene que detenerse antes de una vía que ahora cuelga sobre el vacío. Cuadrillas de reparación y una flota de autobuses sustitutos se hacen cargo hasta que se pueda apuntalar el tramo, y el desvío se come la tarde de todos.|Des jours de pluie gonflent une rivière jusqu'à ce qu'elle sape un pont ferroviaire pendant la nuit, et le premier train du matin doit s'arrêter avant une voie qui pend désormais dans le vide. Des équipes de réparation et une flotte de bus de remplacement prennent le relais jusqu'à ce que la travée soit étayée, et le détour grignote l'après-midi de tout le monde.|数日間の雨で増水した川が一夜のうちに鉄橋の基礎を洗い流し、朝いちばんの列車は、いまや宙に浮いた線路の手前で止まらざるを得なくなる。橋桁を補強するまでは復旧班と代行バスの一団が肩代わりし、迂回のせいで誰もの午後が削られる。",
    ),
    months: [3, 5],
  },
  {
    id: "sandflies",
    n: t("Sandflies find every inch of bare skin|Los sandflies encuentran cada centímetro de piel al descubierto|Les sandflies trouvent chaque centimètre de peau nue|サンドフライの大群",
    ),
    t: t(
      "A cloud of biting sandflies rises off the wet bush the moment the wind drops, and no amount of waving arms keeps them off for long. Locals swear by every home remedy from vinegar to strong coffee grounds, and none of them work as well as simply not stopping to admire the view.|Una nube de sandflies que pican se levanta del monte húmedo en cuanto amaina el viento, y ningún manoteo las mantiene alejadas por mucho tiempo. Los lugareños juran por todo remedio casero, del vinagre al café molido fuerte, y ninguno funciona tan bien como sencillamente no detenerse a admirar el paisaje.|Un nuage de sandflies piqueurs s'élève du bush humide dès que le vent tombe, et aucun moulinet de bras ne les tient éloignés bien longtemps. Les habitants jurent par tous les remèdes de grand-mère, du vinaigre au marc de café fort, mais aucun ne marche aussi bien que de simplement ne pas s'arrêter pour admirer le paysage.|風がやんだとたん、湿った茂みから刺すサンドフライの大群が立ちのぼり、いくら腕を振り回しても長くは追い払えない。地元の人は酢から濃いコーヒーかすまであらゆる民間療法を頼りにするが、どれも景色に見とれて足を止めないことほどには効かない。",
    ),
    months: [9, 11],
  },
  {
    id: "ferry-cancelled",
    n: t("Cook Strait turns too rough to cross|El estrecho de Cook se vuelve demasiado bravo para cruzar|Le détroit de Cook devient trop agité pour être traversé|クック海峡が荒れて欠航する"),
    t: t(
      "A southerly gale whips the strait into steep, close-set swells that even the big rail ferries are built to avoid, and the morning sailing is cancelled at the wharf gate with barely an hour's notice. Wagons and passengers alike queue for the next weather window, however long that takes.|Un vendaval del sur azota el estrecho hasta convertirlo en un oleaje empinado y apretado que hasta los grandes transbordadores ferroviarios están diseñados para evitar, y la travesía de la mañana se cancela en la puerta del muelle con apenas una hora de aviso. Vagones y pasajeros hacen cola por igual para la próxima ventana de buen tiempo, dure lo que dure.|Un coup de vent du sud transforme le détroit en une houle raide et serrée que même les grands ferries ferroviaires sont conçus pour éviter, et la traversée du matin est annulée au portail du quai avec à peine une heure de préavis. Wagons et passagers font la queue pour la prochaine fenêtre météo, aussi longue soit-elle.|南からの強風が海峡を、大型のレールフェリーでさえ避けるよう設計された険しく間隔の狭いうねりに変え、朝の便はわずか1時間前の告知で埠頭の門前で欠航が決まる。貨車も乗客も、次の天候の切れ目を待って列をなす。それがどれだけ長くかかろうとも。",
    ),
    months: [4, 6],
  },
  {
    id: "taniwha-lost",
    n: t("Led astray by a taniwha|Un taniwha te hace perder el camino|Un taniwha t'égare|タニファに化かされる"),
    t: t(
      "The path along the riverbank looked the same at every bend, and only well past dark does it become clear that the same stretch of bush has been crossed three times over. Old accounts blame a taniwha for this exact trick on travellers who cross its stretch of water without so much as a nod.|El sendero junto al río parecía igual en cada recodo, y solo bien entrada la noche queda claro que el mismo tramo de monte se ha cruzado tres veces. Los viejos relatos culpan de esta treta exacta a un taniwha, contra viajeros que cruzan su tramo de agua sin siquiera un saludo.|Le sentier le long de la rivière semblait identique à chaque courbe, et ce n'est que bien après la nuit tombée qu'il devient clair que le même tronçon de bush a été traversé trois fois. Les vieux récits en accusent un taniwha, qui joue exactement ce tour aux voyageurs traversant son tronçon d'eau sans même un salut.|川沿いの道はどの曲がり角も同じに見え、すっかり日が暮れてからようやく、同じ茂みを三度も横切っていたと分かった。古い言い伝えは、会釈もせずに自分の水域を渡る旅人にタニファがまさにこの手を使うのだとする。",
    ),
  },
  {
    id: "sheep-jam",
    n: t("A mob of sheep blocks the line|Un rebaño de ovejas bloquea la vía|Un troupeau de moutons bloque la voie|羊の大群が線路を塞ぐ"),
    t: t(
      "A farmer's mob of several hundred sheep, being moved between paddocks along the only road available, spills across a level crossing just as a train's whistle sounds in the distance. Everyone waits, dogs included, until the last straggler has been chased off the rails.|Un rebaño de varios cientos de ovejas de un granjero, trasladado entre potreros por la única carretera disponible, se desparrama sobre un paso a nivel justo cuando suena a lo lejos el silbato de un tren. Todos esperan, perros incluidos, hasta que la última rezagada es apartada de las vías.|Le troupeau d'un fermier, plusieurs centaines de moutons déplacés entre deux enclos le long de la seule route disponible, déborde sur un passage à niveau juste au moment où le sifflet d'un train retentit au loin. Tout le monde attend, chiens compris, que la dernière traînarde soit chassée des rails.|唯一使える道を通って牧区の間を移動させられている数百頭の羊の群れが、遠くで汽笛が鳴るのと同時に踏切いっぱいに広がってしまう。最後の一頭が線路から追い払われるまで、犬も含めて誰もが待つほかない。",
    ),
    months: [7, 9],
  },
];

/** 季節。4月始まりの12ヶ月(南半球なので4月は秋の始まり)。 */
export const NEWZEALAND_SEASONS = [
  {
    e: "🍂",
    n: t("Autumn colour, but only where someone planted it|El color otoñal, pero solo donde alguien lo plantó|La couleur automnale, mais seulement là où quelqu'un l'a plantée|誰かが植えた場所にだけ来る紅葉"),
    t: t(
      "Most native bush stays evergreen year-round, so the golds and reds of autumn show up almost only around towns settled by 19th-century colonists who planted introduced oaks, poplars and maples from home, turning old goldfield towns like Arrowtown into a startling contrast with the plain green hills around them.|La mayor parte del monte nativo se mantiene siempre verde, así que los dorados y rojos del otoño aparecen casi solo en torno a pueblos colonizados por gente del siglo XIX que plantó robles, álamos y arces traídos de su tierra, dando a antiguos pueblos mineros como Arrowtown un contraste llamativo con las colinas verdes de alrededor.|La majeure partie du bush indigène reste persistante toute l'année, si bien que les ors et les rouges de l'automne n'apparaissent presque que près des villes colonisées au XIXe siècle par des colons ayant planté chênes, peupliers et érables importés de chez eux, donnant à d'anciennes villes minières comme Arrowtown un contraste saisissant avec les collines vertes alentour.|在来の原生林の大半は一年じゅう常緑のままなので、秋の金色や赤は、19世紀の入植者が故郷から持ち込んだオークやポプラ、カエデを植えた町の周りにだけほぼ現れる。アロータウンのような古い金鉱町は、周りの緑一色の丘との際立った対比を見せる。",
    ),
    f: t(
      "Arrowtown near Queenstown plants a heavy concentration of these introduced deciduous trees along a single avenue, and for a few weeks each April the town runs a dedicated autumn festival built entirely around leaves that, elsewhere in the country, simply never turn.|Arrowtown, cerca de Queenstown, planta una fuerte concentración de estos árboles caducos introducidos a lo largo de una sola avenida, y durante unas semanas cada abril el pueblo celebra un festival otoñal dedicado por completo a unas hojas que, en el resto del país, sencillamente nunca cambian de color.|Arrowtown, près de Queenstown, a planté une forte concentration de ces arbres caducs importés le long d'une seule avenue, et pendant quelques semaines chaque avril, la ville organise un festival de l'automne entièrement consacré à des feuilles qui, ailleurs dans le pays, ne changent tout simplement jamais de couleur.|クイーンズタウン近郊のアロータウンは、この外来落葉樹を一本の並木道に集中して植えており、毎年4月の数週間、国内の他の場所では決して色づかない葉だけをテーマにした秋祭りを開いている。",
    ),
  },
  {
    e: "🐟",
    n: t("Eels head downstream to the sea|Las anguilas bajan hacia el mar|Les anguilles descendent vers la mer|ウナギが海へ下る"),
    t: t(
      "Longfin eels that have lived in the same river pool for decades, some for more than fifty years, finally leave it in a single autumn migration to spawn somewhere in the deep Pacific near Tonga and die without ever returning, a one-way journey timed to dark, rainy nights that make the trip safer from predators.|Las anguilas de aleta larga que han vivido en la misma poza del río durante décadas, algunas más de cincuenta años, la abandonan por fin en una única migración de otoño para desovar en algún lugar del Pacífico profundo cerca de Tonga y morir sin volver jamás, un viaje solo de ida programado para noches oscuras y lluviosas que lo hacen más seguro frente a los depredadores.|Les anguilles à longues nageoires qui ont vécu des décennies dans le même bassin de rivière, certaines plus de cinquante ans, le quittent enfin lors d'une unique migration d'automne pour frayer quelque part dans le Pacifique profond près des Tonga et mourir sans jamais revenir, un voyage sans retour programmé les nuits sombres et pluvieuses qui le rendent plus sûr face aux prédateurs.|数十年、中には50年以上も同じ川の淵に棲み続けてきたロングフィンイールは、秋のある夜ただ一度の回遊でついにそこを離れ、トンガ近くの太平洋の深みのどこかで産卵して、二度と戻ることなく命を終える。捕食者に襲われにくい、暗く雨の夜を選んでの片道の旅である。",
    ),
    f: t(
      "Māori have long timed eel harvests, called hīnaki fishing after the woven traps used, to this autumn downstream run, taking a share of a population that would otherwise leave the river entirely within a matter of weeks regardless.|Los maoríes llevan mucho tiempo programando la captura de anguilas, llamada pesca hīnaki por las trampas tejidas que se usan, para esta bajada otoñal, tomando una parte de una población que de todos modos abandonaría el río por completo en pocas semanas.|Les Māoris programment depuis longtemps la pêche aux anguilles, dite pêche au hīnaki d'après les nasses tressées utilisées, sur cette descente d'automne, prélevant une part d'une population qui quitterait de toute façon la rivière en quelques semaines.|マオリは昔から、編んだ罠「ヒナキ」にちなんでヒナキ漁と呼ばれるウナギ漁を、この秋の下りの回遊に合わせて行ってきた。どのみち数週間のうちに川をすっかり離れてしまう個体群から、その一部を分けてもらう形である。",
    ),
  },
  {
    e: "✨",
    n: t("Matariki rises, and the year turns over|Sale Matariki y el año da la vuelta|Matariki se lève et l'année tourne|マタリキが昇り、年が改まる"),
    t: t(
      "The Matariki star cluster, known elsewhere as the Pleiades, reappears low on the dawn horizon in midwinter, marking the Māori new year with a public holiday observed nationwide only since 2022, its exact date set each year by a lunar calendar rather than fixed to a single day.|El cúmulo estelar Matariki, conocido en otros lugares como las Pléyades, reaparece bajo en el horizonte del amanecer a mediados del invierno, marcando el año nuevo maorí con un feriado nacional observado en todo el país solo desde 2022, cuya fecha exacta se fija cada año por un calendario lunar en vez de un día fijo.|L'amas d'étoiles Matariki, connu ailleurs sous le nom des Pléiades, réapparaît bas sur l'horizon à l'aube en plein hiver, marquant le nouvel an māori par un jour férié observé dans tout le pays seulement depuis 2022, sa date exacte étant fixée chaque année selon un calendrier lunaire plutôt qu'un jour unique.|真冬、夜明けの空低くにマタリキ星団(他の地域ではプレアデス星団として知られる)が再び現れ、マオリの新年を告げる。2022年からようやく全国で祝日として観測されるようになったこの日は、固定された日付ではなく毎年、月の暦で定められる。",
    ),
    f: t(
      "Families mark the holiday by naming those who have died in the past year, celebrating those born, and looking ahead to the season's harvests, a set of observances so specific to place that different iwi traditionally watched for slightly different stars within the same cluster.|Las familias marcan la festividad nombrando a quienes han muerto en el último año, celebrando a los nacidos y mirando hacia las cosechas de la temporada, un conjunto de observancias tan específicas del lugar que distintos iwi observaban tradicionalmente estrellas ligeramente distintas dentro del mismo cúmulo.|Les familles marquent la fête en nommant ceux qui sont morts durant l'année écoulée, en célébrant les naissances et en se tournant vers les récoltes à venir, un ensemble d'observances si propres à chaque lieu que différents iwi guettaient traditionnellement des étoiles légèrement différentes au sein du même amas.|家族はこの祝日に、この一年に亡くなった人の名を挙げ、生まれた子を祝い、その季節の収穫に思いを馳せる。この習わしはあまりに土地に根ざしているため、同じ星団の中でも、イウィ(部族)によって伝統的に見つめる星がわずかに違っていた。",
    ),
  },
  {
    e: "🎿",
    n: t("The ski fields open|Abren las estaciones de esquí|Les champs de ski ouvrent|スキー場が開く"),
    t: t(
      "Whakapapa and Tūroa on Ruapehu's slopes and the fields above Queenstown and Wanaka open for the season, drawing skiers from a Northern Hemisphere summer looking for snow out of season, while the same volcano's crater lake, ice-covered for now, can turn dangerous within minutes if it ever erupts through the snowpack.|Whakapapa y Tūroa, en las laderas del Ruapehu, y las estaciones sobre Queenstown y Wanaka abren la temporada, atrayendo a esquiadores que huyen del verano del hemisferio norte en busca de nieve fuera de temporada, mientras el lago cratérico del mismo volcán, ahora cubierto de hielo, puede volverse peligroso en minutos si llega a entrar en erupción a través del manto de nieve.|Whakapapa et Tūroa, sur les pentes du Ruapehu, et les domaines au-dessus de Queenstown et de Wanaka ouvrent la saison, attirant des skieurs fuyant l'été de l'hémisphère Nord en quête de neige hors saison, tandis que le lac de cratère du même volcan, gelé pour l'instant, peut devenir dangereux en quelques minutes s'il entre en éruption à travers le manteau neigeux.|ルアペフ山腹のファカパパとトゥロア、そしてクイーンズタウンとワナカ上方のスキー場がシーズンを迎え、北半球が夏で雪を求める客を呼び込む。同じ火山の火口湖はいまは氷に覆われているが、積雪の下から噴火すれば数分で危険な状態に変わりうる。",
    ),
    f: t(
      "Ruapehu's crater lake has broken through its natural ice-and-ash dam and sent a wall of water, mud and rock (a lahar) down the mountain several times in the last century, including one in 1953 that swept away a rail bridge minutes before a train was due to cross it.|El lago cratérico del Ruapehu ha roto varias veces su presa natural de hielo y ceniza en el último siglo, enviando montaña abajo una pared de agua, barro y roca (un lahar), incluida una en 1953 que arrastró un puente ferroviario minutos antes de que un tren fuera a cruzarlo.|Le lac de cratère du Ruapehu a percé son barrage naturel de glace et de cendre à plusieurs reprises au cours du siècle dernier, envoyant un mur d'eau, de boue et de roche (un lahar) dévaler la montagne, dont un en 1953 qui emporta un pont ferroviaire quelques minutes avant qu'un train ne doive le franchir.|ルアペフの火口湖は過去一世紀のあいだに幾度も、氷と火山灰でできた天然のダムを突き破り、水と泥と岩の壁(ラハール)を山肌に送り出してきた。1953年のそれは、列車が渡るはずだったわずか数分前に鉄橋を押し流している。",
    ),
  },
  {
    e: "🐋",
    n: t("Humpback whales pass on their winter migration|Las ballenas jorobadas pasan en su migración de invierno|Les baleines à bosse passent lors de leur migration hivernale|ザトウクジラが冬の回遊で通り過ぎる"),
    t: t(
      "Humpback whales pass along both coasts on their way from Antarctic feeding grounds to warmer breeding waters in the tropical Pacific, a journey of several thousand kilometres taken almost entirely without eating, living off blubber built up over the previous summer.|Las ballenas jorobadas pasan por ambas costas de camino desde las zonas de alimentación antárticas hacia aguas de cría más cálidas en el Pacífico tropical, un viaje de varios miles de kilómetros hecho casi por completo sin comer, viviendo de la grasa acumulada el verano anterior.|Les baleines à bosse longent les deux côtes en route depuis leurs zones d'alimentation antarctiques vers des eaux de reproduction plus chaudes dans le Pacifique tropical, un voyage de plusieurs milliers de kilomètres effectué presque entièrement sans manger, en vivant sur la graisse accumulée l'été précédent.|ザトウクジラは南極の索餌海域から熱帯太平洋の温かい繁殖海域へ向かう途中、両岸沖を通り過ぎる。数千kmに及ぶこの旅のあいだ、ほとんど何も食べず、前の夏に蓄えた脂肪だけで生き延びる。",
    ),
    f: t(
      "Kaikōura's deep offshore canyon holds resident sperm whales year-round regardless of season, so it is one of the few places where a winter humpback passing through and a sperm whale that never left can sometimes be watched from the same boat.|El cañón profundo frente a Kaikōura alberga cachalotes residentes todo el año, sin importar la estación, así que es uno de los pocos lugares donde a veces se puede ver desde el mismo barco a una jorobada de paso invernal y a un cachalote que nunca se fue.|Le canyon profond au large de Kaikōura abrite des cachalots résidents toute l'année, quelle que soit la saison, ce qui en fait l'un des rares endroits où l'on peut parfois observer depuis le même bateau une baleine à bosse de passage hivernal et un cachalot qui n'est jamais parti.|カイコウラ沖の深い海底谷には季節を問わず一年じゅうマッコウクジラが留まっており、冬に通過するザトウクジラと、そこを離れないマッコウクジラを同じ船から一度に見られる数少ない場所の一つになっている。",
    ),
  },
  {
    e: "🕐",
    n: t("Clocks jump forward and lambing begins|Los relojes adelantan y comienza el parto de corderos|Les horloges avancent et l'agnelage commence|時計が進み、子羊が生まれ始める"),
    t: t(
      "Daylight saving begins in late September, pushing evenings an hour lighter just as spring lambing gets underway across the country's sheep farms, and shepherds on night watch during the peak weeks can lose more sleep to newborn lambs than to the shifted clock.|El horario de verano empieza a finales de septiembre, alargando una hora las tardes justo cuando arranca el parto de corderos de primavera en las granjas ovejeras del país, y los pastores de guardia nocturna en las semanas punta pueden perder más sueño por los corderos recién nacidos que por el cambio de hora.|L'heure d'été débute fin septembre, allongeant les soirées d'une heure juste au moment où l'agnelage de printemps démarre dans les élevages ovins du pays, et les bergers de garde de nuit pendant les semaines de pointe peuvent perdre plus de sommeil à cause des agneaux nouveau-nés que du changement d'heure.|9月下旬に始まるサマータイムは夕方を1時間明るくするが、それはちょうど国じゅうの牧羊場で春の出産期が始まる頃で、繁忙期に夜通し見回る羊飼いは、時計のずれよりも生まれたての子羊のほうでよほど寝不足になる。",
    ),
    f: t(
      "New Zealand runs one of the world's largest sheep-to-person ratios even after decades of decline from a mid-20th-century peak, and a bad spring storm during the lambing weeks can still cost a farm a meaningful share of that year's flock overnight.|Nueva Zelanda mantiene una de las mayores proporciones de ovejas por persona del mundo, incluso tras décadas de declive desde un máximo de mediados del siglo XX, y una mala tormenta de primavera durante las semanas de parto aún puede costarle a una granja una parte considerable del rebaño de ese año en una sola noche.|La Nouvelle-Zélande maintient l'un des plus forts ratios moutons/habitants au monde, même après des décennies de déclin depuis un pic du milieu du XXe siècle, et une mauvaise tempête de printemps pendant les semaines d'agnelage peut encore coûter à une ferme une part importante du troupeau de l'année en une seule nuit.|ニュージーランドは20世紀半ばのピークから何十年も減り続けてきたとはいえ、いまも世界有数の人口対羊比率を保っている。出産期の悪天候の春の嵐は、いまも一夜で一年分の群れのかなりの割合を失わせることがある。",
    ),
  },
  {
    e: "🍇",
    n: t("The vines flower and set the vintage|Las viñas florecen y marcan la cosecha|Les vignes fleurissent et fixent le millésime|ブドウが開花し、収穫年を左右する"),
    t: t(
      "Marlborough's vines flower in October, and the weather during this narrow window, rather than anything that happens later in the growing season, largely decides how good or poor that year's vintage will be, since cold or wet conditions during flowering can cause the berries to set unevenly or fail to form at all.|Las viñas de Marlborough florecen en octubre, y el clima durante esta estrecha ventana, más que cualquier cosa que ocurra después en la temporada de cultivo, decide en gran medida cuán buena o pobre será la cosecha de ese año, ya que el frío o la humedad durante la floración pueden hacer que los granos cuajen de forma desigual o no lleguen a formarse.|Les vignes du Marlborough fleurissent en octobre, et le temps durant cette brève fenêtre, plus que tout ce qui se passe plus tard dans la saison de culture, détermine en grande partie la qualité du millésime de l'année, car un temps froid ou humide pendant la floraison peut faire nouer les baies de façon inégale, voire les empêcher de se former.|マールボロのブドウは10月に開花し、この短い期間の天候こそが、その後の生育期の何よりもその年のヴィンテージの出来を左右する。開花期に寒さや湿気があると、実の結実が不揃いになったり、まったく実らなかったりするからである。",
    ),
    f: t(
      "The region's dry, sunny climate and free-draining gravel soils mean Marlborough now produces most of the country's wine grapes from vines only planted commercially since 1973, a rise fast enough that many of the original growers are still alive to see it.|El clima seco y soleado de la región y los suelos de grava de drenaje libre hacen que Marlborough produzca hoy la mayoría de la uva de vino del país, a partir de viñas plantadas comercialmente solo desde 1973, un auge tan rápido que muchos de los viticultores originales aún viven para verlo.|Le climat sec et ensoleillé de la région et ses sols graveleux à drainage libre font qu'aujourd'hui le Marlborough produit la majorité du raisin de cuve du pays, à partir de vignes plantées commercialement seulement depuis 1973, un essor si rapide que bon nombre des premiers viticulteurs sont encore là pour le voir.|この地方の乾いた晴天と水はけのよい砂利質土壌のおかげで、マールボロはいまや国内のワイン用ブドウの大半を産する地方になっているが、商業栽培が始まったのは1973年からにすぎず、最初期の栽培者の多くがいまも存命でその発展を見届けている。",
    ),
  },
  {
    e: "🌺",
    n: t("Pōhutukawa buds swell along the coast|Los capullos de pōhutukawa se hinchan en la costa|Les bourgeons de pōhutukawa gonflent le long de la côte|海岸沿いでポフツカワの蕾がふくらむ"),
    t: t(
      "Pōhutukawa trees along northern coastlines carry tight green buds through late spring, a slow build-up before the crimson flowers that give the tree its nickname, the New Zealand Christmas tree, and coastal towns start watching the branches the way others watch a calendar.|Los árboles de pōhutukawa a lo largo de las costas del norte llevan capullos verdes apretados hasta finales de la primavera, una lenta acumulación antes de las flores carmesí que dan al árbol su apodo, el árbol de Navidad neozelandés, y los pueblos costeros empiezan a vigilar las ramas como otros vigilan un calendario.|Les pōhutukawa le long des côtes septentrionales portent des bourgeons verts bien fermés jusqu'à la fin du printemps, une lente montée avant les fleurs cramoisies qui valent à l'arbre son surnom, l'arbre de Noël néo-zélandais, et les villes côtières se mettent à surveiller les branches comme d'autres surveillent un calendrier.|北部の海岸沿いに立つポフツカワの木は晩春まで固い緑の蕾を抱えたままで、この木に「ニュージーランドのクリスマスツリー」という愛称を与える深紅の花が咲くまでのゆっくりとした助走にあたる。海辺の町は、暦を見るように枝の様子をうかがい始める。",
    ),
    f: t(
      "A single old pōhutukawa can live for several hundred years and send down aerial roots from its own branches wherever they touch the ground, letting one tree spread sideways across a cliff face rather than simply growing taller.|Un solo pōhutukawa viejo puede vivir varios cientos de años y echar raíces aéreas desde sus propias ramas allí donde tocan el suelo, permitiendo que un solo árbol se extienda lateralmente por la cara de un acantilado en vez de simplemente crecer más alto.|Un vieux pōhutukawa isolé peut vivre plusieurs centaines d'années et faire descendre des racines aériennes depuis ses propres branches partout où elles touchent le sol, permettant à un seul arbre de s'étendre latéralement sur une falaise plutôt que de simplement grandir en hauteur.|老いた一本のポフツカワは数百年も生きることがあり、枝が地面に触れた場所から気根を下ろすため、一本の木がただ高く育つのではなく崖の斜面を横へ広がっていくこともある。",
    ),
  },
  {
    e: "🎄",
    n: t("Pōhutukawa bloom crimson for Christmas|El pōhutukawa florece carmesí para Navidad|Le pōhutukawa fleurit de rouge pour Noël|ポフツカワが深紅に咲き、クリスマスを迎える"),
    t: t(
      "The pōhutukawa's crimson flowers open in a rush right around Christmas, schools break up for the long summer holiday on the same week, and the whole country's rhythm shifts almost overnight from the work year to six weeks of beaches, barbecues and campgrounds booked out months in advance.|Las flores carmesí del pōhutukawa se abren de golpe justo por Navidad, los colegios cierran para las largas vacaciones de verano esa misma semana, y el ritmo de todo el país cambia casi de la noche a la mañana, del año laboral a seis semanas de playas, barbacoas y campings reservados con meses de antelación.|Les fleurs cramoisies du pōhutukawa s'ouvrent d'un coup juste autour de Noël, les écoles ferment pour les longues vacances d'été la même semaine, et le rythme de tout le pays bascule presque du jour au lendemain de l'année de travail à six semaines de plages, de barbecues et de campings réservés des mois à l'avance.|ポフツカワの深紅の花はクリスマスのころに一斉に開き、同じ週に学校は長い夏休みに入る。国全体のリズムはほとんど一晩のうちに、仕事の一年から、何か月も前から予約で埋まるビーチやバーベキュー、キャンプ場での6週間へと切り替わる。",
    ),
    f: t(
      "Because pōhutukawa flower reliably each December regardless of the actual weather that year, the tree has become a more dependable marker of the summer holiday's start than the solstice or the school calendar itself.|Como el pōhutukawa florece de forma fiable cada diciembre sin importar el clima real de ese año, el árbol se ha convertido en una señal más fiable del inicio de las vacaciones de verano que el solsticio o el propio calendario escolar.|Comme le pōhutukawa fleurit fidèlement chaque décembre quel que soit le temps réel de l'année, l'arbre est devenu un marqueur plus fiable du début des vacances d'été que le solstice ou le calendrier scolaire lui-même.|ポフツカワはその年の実際の天候にかかわらず毎年12月に必ず咲くため、夏休みの始まりを告げる目印として、夏至や学校の暦そのものよりも当てにされている。",
    ),
  },
  {
    e: "🏖️",
    n: t("The whole country goes on holiday at once|Todo el país se va de vacaciones a la vez|Tout le pays part en vacances en même temps|国じゅうが一斉に休暇に入る"),
    t: t(
      "With schools out and most workplaces closing for at least a week around New Year, campgrounds and beach towns fill to several times their off-season population, and the country's roads see some of the year's heaviest traffic funnelling toward the coast on the same handful of days.|Con los colegios cerrados y la mayoría de los lugares de trabajo parados al menos una semana en torno al Año Nuevo, los campings y pueblos de playa se llenan hasta multiplicar varias veces su población fuera de temporada, y las carreteras del país ven parte del tráfico más denso del año concentrado hacia la costa en el mismo puñado de días.|Écoles fermées et la plupart des lieux de travail arrêtés au moins une semaine autour du Nouvel An, les campings et villes balnéaires se remplissent jusqu'à plusieurs fois leur population hors saison, et les routes du pays connaissent certains des embouteillages les plus denses de l'année, canalisés vers la côte les mêmes quelques jours.|学校は休み、多くの職場も新年を挟んで少なくとも一週間は閉まるため、キャンプ場や海辺の町はオフシーズンの何倍もの人口で埋まり、国内の道路は同じわずかな日に海岸へ向かう一年でも指折りの交通量を見せる。",
    ),
    f: t(
      "Many businesses close entirely for these weeks rather than run on skeleton staff, a national habit sometimes called the \"Kiwi shutdown\", so visitors expecting shops and services to run as normal over the New Year are often caught out.|Muchos negocios cierran por completo durante estas semanas en vez de funcionar con personal mínimo, una costumbre nacional a veces llamada el «cierre kiwi», así que a los visitantes que esperan que tiendas y servicios funcionen con normalidad en Año Nuevo a menudo les sorprende.|Beaucoup d'entreprises ferment complètement durant ces semaines plutôt que de tourner avec un effectif minimal, une habitude nationale parfois appelée le « Kiwi shutdown », si bien que les visiteurs s'attendant à ce que magasins et services fonctionnent normalement au Nouvel An sont souvent pris au dépourvu.|多くの店はぎりぎりの人数で回すのではなく、この数週間まるごと閉めてしまう。「キーウィ・シャットダウン」とも呼ばれるこの国民的な習慣のせいで、正月も普段どおり店や施設が開いていると思っていた旅行者はしばしば当てが外れる。",
    ),
  },
  {
    e: "🇳🇿",
    n: t("Waitangi Day marks the country's founding document|El Día de Waitangi conmemora el documento fundacional del país|Le jour de Waitangi commémore le document fondateur du pays|ワイタンギ・デーが建国の文書を記念する"),
    t: t(
      "The sixth of February marks the 1840 signing of the Treaty of Waitangi, observed nationwide as a public holiday since 1974, and commemorations at the treaty grounds themselves regularly mix formal ceremony with open political protest over how the treaty's promises have and have not been kept.|El seis de febrero conmemora la firma en 1840 del Tratado de Waitangi, festivo nacional desde 1974, y las conmemoraciones en el propio recinto del tratado mezclan a menudo la ceremonia formal con la protesta política abierta sobre cómo se han cumplido o no sus promesas.|Le six février commémore la signature en 1840 du traité de Waitangi, jour férié national depuis 1974, et les commémorations sur le site même du traité mêlent régulièrement cérémonie officielle et contestation politique ouverte sur la façon dont ses promesses ont été, ou non, tenues.|2月6日は1840年のワイタンギ条約締結を記念する日で、1974年から全国の祝日とされている。条約締結の地そのものでの式典は、しばしば公式の儀式と、条約の約束がどこまで守られてきたか(あるいは守られなかったか)をめぐる公然たる政治的抗議とが入り混じる。",
    ),
    f: t(
      "The Māori-language and English-language versions of the treaty differed on a crucial point — governance versus full sovereignty — and that gap, rather than the date itself, remains the substance of most of the debate still held here every year.|Las versiones en maorí e inglés del tratado diferían en un punto crucial —gobierno frente a soberanía plena— y ese desajuste, más que la fecha en sí, sigue siendo el fondo de la mayor parte del debate que aún se celebra aquí cada año.|Les versions māorie et anglaise du traité divergeaient sur un point crucial — gouvernance contre pleine souveraineté —, et cet écart, plus que la date elle-même, reste le fond de l'essentiel du débat qui s'y tient encore chaque année.|条約のマオリ語版と英語版は、統治か完全な主権かという肝心な点で食い違っており、日付そのものよりも、その食い違いこそがいまも毎年ここで交わされる議論の大半の中身であり続けている。",
    ),
  },
  {
    e: "🍷",
    n: t("Clocks fall back and the harvest comes in|Los relojes atrasan y llega la vendimia|Les horloges reculent et les vendanges arrivent|時計が戻り、収穫が始まる"),
    t: t(
      "Daylight saving ends in early April, handing back the hour of evening light just as vineyards across Marlborough, Central Otago and Hawke's Bay race to bring in the grape harvest before the first proper autumn frost, sometimes picking through the night by tractor headlight to beat a forecast cold snap.|El horario de verano termina a principios de abril, devolviendo la hora de luz vespertina justo cuando los viñedos de Marlborough, Central Otago y Hawke's Bay corren para recoger la vendimia antes de la primera helada de otoño en serio, a veces cosechando de noche a la luz de los faros del tractor para adelantarse a una ola de frío prevista.|L'heure d'été s'achève début avril, rendant l'heure de lumière du soir juste au moment où les vignobles du Marlborough, du Central Otago et de Hawke's Bay se pressent de rentrer les vendanges avant la première vraie gelée d'automne, parfois en cueillant de nuit à la lumière des phares du tracteur pour devancer un coup de froid annoncé.|4月上旬にサマータイムが終わり、夕方の明るさが1時間戻ってくるが、それはちょうどマールボロ、セントラル・オタゴ、ホークス・ベイ各地のワイナリーが本格的な秋の霜が降りる前に収穫を急いでいる時期にあたる。予報されている冷え込みに間に合わせようと、トラクターのヘッドライトを頼りに夜通し収穫することもある。",
    ),
    f: t(
      "A single overnight frost at the wrong moment can damage an entire season's fruit still on the vine, so some vineyards run helicopters low over the rows before dawn simply to stir warmer air down onto the frost-prone ground.|Una sola helada nocturna en el momento equivocado puede dañar la fruta de toda una temporada aún en la vid, así que algunos viñedos hacen volar helicópteros a baja altura sobre las hileras antes del amanecer solo para remover aire más cálido hacia el suelo propenso a la helada.|Une seule gelée nocturne au mauvais moment peut endommager les fruits de toute une saison encore sur pied, si bien que certains vignobles font voler des hélicoptères à basse altitude au-dessus des rangs avant l'aube, simplement pour ramener de l'air plus chaud vers le sol sujet au gel.|一晩の霜がわずかなタイミングの違いで、まだ木になっている一年分の果実全体を傷めることがあるため、一部のワイナリーは夜明け前にヘリコプターを低空で畝の上に飛ばし、霜の降りやすい地面へ暖かい空気を送り込むだけのために使う。",
    ),
  },
];
