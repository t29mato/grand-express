/**
 * バリの島情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * **島ひとつの盤面**(茨城県と同じ縮尺の考え方)。国単位の盤面(イタリア等)と
 * 違い、「地方まるごとの好不況」は使わない。島の中では地方どうしの経済が
 * ほとんど変わらないので、それをやると嘘になる。かわりに**実際にその月・
 * その場所で起きる行事**(ガルンガン、キンタマーニのコーヒー収穫、
 * クサンバの塩づくりなど)で地方ごとの収入に差をつける(`ibaraki/flavour.mjs`
 * と同じ考え方)。実際の効果は `src/infrastructure/content/season-and-doom-rules.ts`
 * 側に置く(このファイルには書かない)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const BALI_META = {
  id: "bali",
  name: t("Bali|Bali|Bali|バリ島"),
  blurb: t(
    "An island of temple bells and rice terraces, where irrigation is a religion and the calendar decides the good days|Una isla de campanas de templo y arrozales en terraza, donde el riego es una religión y el calendario decide los días buenos|Une île de cloches de temple et de rizières en terrasses, où l'irrigation est une religion et le calendrier décide des bons jours|寺の鐘と棚田の島。灌漑は信仰であり、良い日を選ぶのは暦である",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS に置く。
  // 1円≒100ルピアを基準に、日本(¥12,000,000スタート)と実質を揃えると
  // mul=1,000,000(Rp 1,200,000,000スタート)になる。桁数の判断はREGISTER.md参照。
  cur: { pre: "Rp", post: "", mul: 1000000 },
  start: "denpasar",
  // バリでは生まれ順で名を付ける(性別に関わらず1人目ワヤン・2人目マデ・
  // 3人目ニョマン・4人目クトゥット、5人目以降はまた最初から)。実在の慣習そのもの。
  cpuNames: ["Wayan", "Made", "Nyoman", "Ketut"],
  // ポレン(黒白の格子布、聖俗の均衡=ルワ・ビネダを表す)の黒白に、
  // 供物の赤、棚田の緑、海の青を添えた5色。
  stripe: ["#241a10", "#f6efe2", "#e8443f", "#6fae4a", "#1a5f8a"],
};

/** 島が実際に使う6区分。 */
export const BALI_REGIONS = {
  sel: t("The South|El sur|Le Sud|南部"),
  ubu: t("Central Bali & Ubud|Bali central y Ubud|Bali central et Ubud|中部・ウブド"),
  gl: t("Mountains & Lakes|Montañas y lagos|Montagnes et lacs|山岳・湖"),
  tim: t("The East|El este|L'Est|東部"),
  utr: t("The North|El norte|Le Nord|北部"),
  brt: t("The West & Islands|El oeste y las islas|L'Ouest et les îles|西部・島嶼"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。
 * バリのキーはまだ登録されていないので、取りまとめ側で追加が要る)。
 */
export const BALI_ITEMS = {
  ojek: {
    e: "🛵",
    price: 260,
    kind: "move",
    n: t("Ojek Motorbike Ride|Viaje en ojek|Course en ojek|オジェックのバイク"),
    d: t(
      "Carried 8–12 squares. The rider picks the shortcut, not you.|Te lleva de 8 a 12 casillas. El camino corto lo elige el conductor, no tú.|Emporté de 8 à 12 cases. C'est le chauffeur qui choisit le raccourci, pas toi.|8〜12マス運ばれる。近道を選ぶのは運転手で、自分ではない。",
    ),
    f: t(
      "Bali's roads are often too narrow for two cars to pass, so a motorbike taxi driver can cut through gaps and alleys no larger vehicle could reach. The name lent itself to Gojek, the ride-hailing app founded in 2010, which began as a single call centre booking these drivers in Jakarta and now runs across Southeast Asia.|Las carreteras de Bali suelen ser demasiado estrechas para que se crucen dos coches, así que un mototaxi puede colarse por huecos y callejones donde no cabe un vehículo mayor. El nombre dio origen a Gojek, la app de transporte fundada en 2010.|Les routes de Bali sont souvent trop étroites pour que deux voitures se croisent, si bien qu'un chauffeur de moto-taxi se faufile dans des ruelles inaccessibles à un plus gros véhicule. Le nom a donné Gojek, l'application de VTC fondée en 2010.|バリの道は車二台がすれ違うにも狭いことが多く、バイクタクシーの運転手は大きな車では入れない路地や隙間を抜けていく。この呼び名は2010年創業の配車アプリ「ゴジェック」の名にもなった。もとはジャカルタで運転手を電話で手配する一つの窓口にすぎなかった。",
    ),
  },
  padewasan: {
    e: "📅",
    price: 420,
    kind: "pre",
    n: t("Padewasan Almanac|Almanaque padewasan|Almanach padewasan|パデワサンの暦"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Balinese priests calculate the right day for anything from a wedding to a cremation using the pawukon, a 210-day calendar built from ten overlapping week-cycles running at once, the shortest just one day long and the longest ten. A family may delay a funeral for weeks waiting for the calendar to agree, since holding it on the wrong day is thought to unsettle the soul rather than release it.|Los sacerdotes balineses calculan el día correcto para una boda o una cremación con el pawukon, un calendario de 210 días con diez ciclos semanales superpuestos a la vez. Una familia puede retrasar un funeral semanas esperando que el calendario esté de acuerdo.|Les prêtres balinais calculent le bon jour pour un mariage ou une crémation grâce au pawukon, un calendrier de 210 jours fait de dix cycles hebdomadaires qui tournent en même temps. Une famille peut retarder des funérailles de plusieurs semaines en attendant l'accord du calendrier.|バリの僧侶は、結婚式から火葬まであらゆる日取りを「パウコン」という210日の暦で計算する。長さの違う十の週の周期が同時に回っており、短いものは1日、長いものは10日である。日取りを誤ると魂が解き放たれずかえって乱れると考えられているため、暦が合うまで葬儀を何週間も延ばす家もある。",
    ),
  },
  bemo: {
    e: "🚐",
    price: 360,
    kind: "pre",
    n: t("Bemo Minibus|Bemo (microbús)|Bemo (minibus)|ベモ(乗合バス)"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Until motorbikes got cheap, these three-wheeled or minivan bemo, packed well past their seat count, were the only public transport between Balinese towns, running on no fixed timetable and leaving only once full. Most routes have since emptied out, and a few towns keep a single bemo running mostly out of habit.|Hasta que las motos se abarataron, estos bemo de tres ruedas o furgoneta, siempre más llenos de lo debido, eran el único transporte público entre pueblos balineses y solo salían cuando se llenaban. Hoy casi todas las rutas se han vaciado.|Avant que les motos ne deviennent bon marché, ces bemo à trois roues ou en camionnette, toujours bondés au-delà des places prévues, étaient le seul transport public entre les villages balinais et ne partaient qu'une fois pleins. Presque toutes les lignes se sont depuis vidées.|バイクが安くなるまで、この三輪車やミニバンの乗合バス「ベモ」は、席数を超えて詰め込みながらもバリの町と町を結ぶ唯一の公共交通で、時刻表はなく満員になったら出発した。いまはほとんどの路線が寂れ、習慣のように一台だけ走らせている町もある。",
    ),
  },
  perama: {
    e: "🚌",
    price: 620,
    kind: "pre",
    n: t("Perama Shuttle|Lanzadera Perama|Navette Perama|ペラマのシャトルバス"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Founded in the early 1990s, this shuttle network was one of the first in Bali to run on a fixed timetable rather than leaving only when full, linking the tourist towns the bemo routes had stopped bothering with. A single ticket also buys the boat crossing onward to Nusa Lembongan or the Gili Islands, one fare covering both road and sea.|Fundada a principios de los años 90, esta red de lanzaderas fue de las primeras en Bali con horario fijo, en vez de salir solo al llenarse, y enlazaba los pueblos turísticos que el bemo ya no cubría. Un mismo billete incluye después la travesía en barco hasta Nusa Lembongan.|Fondé au début des années 1990, ce réseau de navettes fut l'un des premiers de Bali à suivre un horaire fixe plutôt que de partir seulement une fois plein, reliant les villes touristiques que les bemo avaient délaissées. Un même billet inclut ensuite la traversée en bateau vers Nusa Lembongan.|1990年代初めに創業したこの乗合バス網は、満員になるまで待つのではなく時刻表通りに走る、バリでは早い部類の路線で、ベモが見放した観光の町どうしを結んだ。同じ切符でそのままヌサレンボンガンやギリ諸島への船便まで乗り継げる。",
    ),
  },
  tridatu: {
    e: "🧵",
    price: 300,
    kind: "passive",
    n: t("Tridatu Thread|Hilo tridatu|Fil tridatu|トリダトゥの糸"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The three colours — red, white and black — stand for the gods Brahma, Vishnu and Shiva, and a priest ties the thread on after blessing it with holy water at a temple ceremony. Balinese Hindus wear it until it wears through and falls off on its own; cutting it off is considered poor manners toward the blessing.|Los tres colores (rojo, blanco y negro) representan a Brahma, Vishnu y Shiva; un sacerdote ata el hilo tras bendecirlo con agua sagrada en una ceremonia. Se lleva hasta que se rompe solo; cortarlo se considera una falta de respeto hacia la bendición.|Les trois couleurs (rouge, blanc, noir) représentent Brahma, Vishnu et Shiva ; un prêtre noue le fil après l'avoir béni à l'eau sacrée lors d'une cérémonie. On le porte jusqu'à ce qu'il s'use et tombe seul ; le couper est jugé irrespectueux envers la bénédiction.|赤・白・黒の三色はブラフマー・ヴィシュヌ・シヴァの三神を表す。寺院の儀式で聖水により清められたのち、僧侶がこの糸を結ぶ。すり切れて自然に取れるまで身につけ、自分で切るのは祝福に対して礼を欠くとされる。",
    ),
  },
  keris: {
    e: "🗡️",
    price: 460,
    kind: "pre",
    n: t("Keris Dagger|Daga keris|Poignard keris|クリスの短剣"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "A keris is forged by folding different irons and a nickel-bearing meteoric alloy together dozens of times, and its wavy blade always has an odd number of curves — usually three, five or nine. Balinese families keep them wrapped in cloth and present offerings to them as if they were living things, and UNESCO recognised the Indonesian keris in 2005.|Un keris se forja plegando distintos hierros y una aleación meteórica con níquel decenas de veces, y su hoja ondulada siempre tiene un número impar de curvas. Las familias balinesas lo guardan envuelto en tela y le ofrecen ofrendas como si estuviera vivo; la UNESCO reconoció el keris indonesio en 2005.|Un keris se forge en pliant des dizaines de fois différents fers avec un alliage météorique au nickel ; sa lame ondulée compte toujours un nombre impair de courbes. Les familles balinaises le gardent enveloppé de tissu et lui présentent des offrandes comme s'il était vivant ; l'UNESCO a reconnu le keris indonésien en 2005.|クリスは幾種もの鉄とニッケルを含む隕石合金を何十回も折り返して鍛える。波打つ刃の曲がりの数は必ず奇数で、三つ・五つ・九つが多い。バリの家では布に包んで保管し、生き物のように供物を捧げる。2005年、ユネスコはインドネシアのクリスを無形文化遺産に登録した。",
    ),
  },
  lontar: {
    e: "📜",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("Borrowed Lontar|Lontar prestado|Lontar emprunté|借りたロンタル"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "The text is not written but incised into the dried palm leaf with a small curved knife, and only afterwards rubbed with soot and candlenut oil so the letters show up black in the cuts. A well-made lontar can last several hundred years if kept dry, but the craft of preparing the leaf and cutting the script correctly is now practised by only a small number of people.|El texto no se escribe sino que se graba en la hoja de palma seca con un cuchillo curvo, y después se frota con hollín y aceite de candelnut para que las letras resalten en negro. Un lontar bien hecho puede durar siglos si se mantiene seco.|Le texte n'est pas écrit mais gravé dans la feuille de palmier séchée avec un petit couteau courbe, puis frotté à la suie et à l'huile de bancoulier pour que les lettres ressortent en noir. Un lontar bien fait peut durer des siècles au sec.|文字は書くのではなく、乾かした椰子の葉に小さな曲がり刀で刻む。そのあとすすとキャンドルナッツ油を擦り込んで、刻んだ線だけが黒く浮き上がる。よく作られたロンタルは乾いた場所で数百年もつが、葉の下ごしらえと文字を正しく刻む技を持つ人はいまは少ない。",
    ),
  },
  perak: {
    e: "💍",
    price: 290,
    kind: "pre",
    n: t("Celuk Silver Bracelet|Pulsera de plata de Celuk|Bracelet en argent de Celuk|チュルックの銀の腕輪"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Whole families in this one village work silver from home workshops rather than a single factory, a trade said to go back to royal silversmiths who settled here generations ago. A piece is priced by weight and hours of filigree, not by the story attached to it, so a plain ring and an ornate one of the same weight can cost about the same.|Familias enteras de este pueblo trabajan la plata en talleres domésticos y no en una sola fábrica, oficio que, se dice, viene de los plateros de la corte real asentados aquí generaciones atrás. Una pieza se cobra por peso y horas de filigrana, no por la historia que lleve.|Dans ce seul village, des familles entières travaillent l'argent dans des ateliers domestiques plutôt qu'en usine, un métier venu, dit-on, d'orfèvres royaux installés ici des générations plus tôt. Une pièce se facture au poids et aux heures de filigrane, non à son histoire.|この一つの村では、工場ではなく家々の工房で一族総出で銀を打つ。何世代も前にここへ住みついた王家お抱えの銀細工師にまで遡るという。値は重さと透かし細工にかけた時間で決まり、模様の由来では決まらないので、無地の指輪も凝った指輪も同じ重さなら値はさほど変わらない。",
    ),
  },
  kecak: {
    e: "🔥",
    price: 400,
    kind: "pre",
    n: t("Kecak Trance Leap|Salto en trance del kecak|Saut en transe du kecak|ケチャの火の舞"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "There is no gamelan orchestra: a circle of a hundred or more bare-chested men chants \"cak\" in overlapping rhythms to carry the whole performance, a form assembled in the 1930s from an older trance ritual with help from the German painter Walter Spies. Some performances end with a dancer, said to be in trance, walking through the embers of a coconut-husk fire and stamping on them barefoot.|No hay orquesta de gamelán: un círculo de cien hombres o más, con el torso desnudo, canta «cak» en ritmos superpuestos para sostener toda la función, una forma armada en los años 30 a partir de un ritual de trance más antiguo. Algunas funciones terminan con un bailarín, se dice que en trance, caminando descalzo sobre las brasas.|Pas d'orchestre de gamelan : un cercle de cent hommes ou plus, torse nu, chante « cak » en rythmes superposés pour porter tout le spectacle, une forme composée dans les années 1930 à partir d'un rituel de transe plus ancien. Certaines représentations s'achèvent par un danseur, dit en transe, marchant pieds nus sur des braises de bourre de coco.|ガムランの楽団はいない。百人を超す上半身裸の男たちが輪になり、幾重にも重なる「チャッ」の声だけで舞台を支える。1930年代、ドイツ人画家ヴァルター・シュピースの助力を得て、もっと古いトランスの儀式から組み立てられた形である。演目によっては、トランス状態にあるという踊り手がヤシ殻の熾火の中を裸足で踏み歩いて終わる。",
    ),
  },
};

/**
 * 厄災の神。バリの民間信仰でいう「レヤック」──夜に肉体を離れ、
 * 頭が内臓を垂らしたまま飛び回るとされる魔性で、火の玉として
 * 目撃されると語られる。黒魔術の女王ランダの眷属とされる。
 */
export const BALI_SPIRIT = {
  e: "🔥",
  n: t("The Leyak|El leyak|Le leyak|レヤック"),
  big: t("The Leyak's Fire|El fuego del leyak|Le feu du leyak|レヤックの火"),
  ward: "tridatu",
  arrive: t(
    "<b>🔥 A leyak has caught your scent.</b> Balinese belief holds that certain people can leave their sleeping body at night, the head pulling free with the entrails trailing beneath it, and go hunting as a leyak — most often reported, people say, as an unexplained ball of fire crossing a rice field or a graveyard after dark. It is drawn to whoever is farthest behind, and now walks beside <b>{0}</b>, bringing a misfortune every turn.|<b>🔥 Un leyak te ha olido.</b> Se cree en Bali que ciertas personas dejan su cuerpo dormido de noche, con la cabeza separándose y los intestinos colgando, y salen a cazar como un leyak, visto a menudo, se dice, como una bola de fuego que cruza un arrozal o un cementerio. Ahora camina junto a <b>{0}</b>, el más rezagado, y trae una desgracia cada turno.|<b>🔥 Un leyak t'a repéré.</b> On croit à Bali que certaines personnes quittent la nuit leur corps endormi, la tête se détachant avec les entrailles pendantes, et partent chasser sous forme de leyak, vu souvent, dit-on, comme une boule de feu traversant une rizière ou un cimetière. Il marche désormais près de <b>{0}</b>, le plus en retard, et amène un malheur chaque tour.|<b>🔥 レヤックに見つかった。</b> バリの民間信仰では、ある種の人は夜、眠る身体を離れ、頭だけが内臓を垂らしたまま抜け出て「レヤック」となって狩りをするという。夜の田や墓地を横切る、説明のつかない火の玉として目撃されることが多いと言われる。いま目的地から最も遅れている <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🔥 <b>The leyak</b> turns and drifts toward <b>{0}</b>, farthest from {1}.|🔥 <b>El leyak</b> gira y flota hacia <b>{0}</b>, el más lejano de {1}.|🔥 <b>Le leyak</b> se retourne et dérive vers <b>{0}</b>, le plus loin de {1}.|🔥 <b>レヤック</b> が向きを変え、{1} から最も遠い <b>{0}</b> のほうへ漂い出した。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns within the leyak's reach and has not shaken it loose. It circles back toward the crossroads shrine of the dead, calling on Rangda, its queen — <b>the Leyak's Fire</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos al alcance del leyak sin librarse de él. Este vuelve hacia el santuario de los muertos en la encrucijada, invocando a Rangda, su reina: empieza <b>el fuego del leyak</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours à la portée du leyak sans s'en défaire. Celui-ci revient vers le sanctuaire des morts au carrefour, invoquant Rangda, sa reine : <b>le feu du leyak</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターン、レヤックの手の届く場所を歩いても振り切れなかった。レヤックは辻にある死者の祠へ引き返し、女王ランダを呼ぶ。<b>レヤックの火</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> Rangda, the widow-witch queen of all leyak, appears opposite the protector Barong in Bali's best-known temple dance, and every death temple (pura dalem) is built facing kelod — downhill, toward the sea, the least auspicious direction — because that is where such things are thought to belong.|<b>Tras la historia:</b> Rangda, la reina-bruja viuda de todos los leyak, aparece frente al protector Barong en la danza de templo más conocida de Bali, y todo templo de la muerte (pura dalem) se construye mirando hacia kelod, cuesta abajo hacia el mar.|<b>Derrière l'histoire :</b> Rangda, la reine-sorcière veuve de tous les leyak, apparaît face au protecteur Barong dans la danse de temple la plus connue de Bali, et chaque temple des morts (pura dalem) est bâti tourné vers kelod, en aval, vers la mer.|<b>物語の背景:</b> すべてのレヤックを統べる魔女の女王ランダは、バリで最もよく知られる寺院舞踊で守護者バロンと対峙する。死の寺院(プラ・ダレム)はどこも、いちばん不吉とされる方角「クロッド」(海へ向かう下手)を向いて建てられる。そうしたものの居場所はそちらだと考えられているからである。",
  ),
  pleased: t(
    "It drifts past you toward the graveyard and something drops from the fire as it goes. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se aleja de ti hacia el cementerio y algo cae del fuego al pasar. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il s'éloigne de toi vers le cimetière et quelque chose tombe du feu en chemin. <b>{0}</b> gagne <span class='money'>+{1}</span>.|レヤックは墓地のほうへ漂い去り、その火から何かがこぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A tri-coloured thread, freshly blessed with holy water, is held up where it can see it. The fire recoils and passes over <b>{0}</b> without noticing this turn.|Se le muestra un hilo tricolor recién bendecido con agua sagrada. El fuego retrocede y pasa por encima de <b>{0}</b> sin verlo este turno.|On lui montre un fil tricolore fraîchement béni à l'eau sacrée. Le feu recule et enjambe <b>{0}</b> sans le voir ce tour-ci.|聖水で清めたばかりの三色の糸を、見えるように掲げた。火はひるみ、このターンは <b>{0}</b> をまたいで気づかずに行き過ぎた。",
  ),
};

/** 災難7種。バリの日常の困りごとから7つ選んでいる。 */
export const BALI_DOOM = [
  {
    id: "razia-polisi",
    n: t("A checkpoint wants your papers|Un control pide tus papeles|Un contrôle réclame tes papiers|検問が書類を求める"),
    t: t(
      "Officers are checking helmets and international driving permits on the road out of town — the permit rule most scooter rental shops never mention to tourists. Papers or not, the fine is due before you can go on.|Agentes revisan cascos y permisos de conducir internacionales en la salida del pueblo, una norma que casi ningún alquiler de moto explica al turista. Haya papeles o no, la multa se paga antes de seguir.|Des agents contrôlent casques et permis de conduire internationaux à la sortie de la ville, une règle que presque aucun loueur de scooter n'explique aux touristes. Papiers ou non, l'amende est due avant de repartir.|町を出る道で、警察がヘルメットと国際運転免許証を確認している。この免許証の規定は、バイクの貸出店がほとんど旅行者に説明しない決まりである。書類があってもなくても、先へ進む前に罰金を払うことになる。",
    ),
  },
  {
    id: "hama-tikus",
    n: t("Rats move into the ripening rice|Ratas invaden el arroz que madura|Des rats envahissent le riz mûrissant|実りかけの田に鼠が入る"),
    t: t(
      "Rice rats move into the ripening paddy overnight, and by morning a field that looked full is a third empty husks. Farmers here have fought the same pest with owl boxes and ritual since long before pesticides existed, with mixed success either way.|Las ratas invaden el arrozal que madura de la noche a la mañana, y al alba un tercio del campo son cáscaras vacías. Aquí se lucha contra la misma plaga con cajas nido para lechuzas y rituales desde mucho antes de los pesticidas.|Des rats envahissent la rizière mûrissante en une nuit, et au matin un tiers du champ n'est plus que balles vides. On combat ici la même engeance à coups de nichoirs à chouettes et de rituels depuis bien avant les pesticides.|一夜のうちに鼠が実りかけの田に入り込み、朝には田の三分の一が空の籾殻になっている。この害獣とは、殺鼠剤ができるはるか前から、梟の巣箱と儀式で戦ってきた。どちらも効くときと効かないときがある。",
    ),
  },
  {
    id: "menunggu-dewasa",
    n: t("The calendar says: not today|El calendario dice: hoy no|Le calendrier dit : pas aujourd'hui|暦が「今日ではない」と言う"),
    t: t(
      "The priest consulted about today's departure says it falls on a day the pawukon calendar marks as unfit for travel, and no one argues with the calendar. Everything waits for tomorrow, when a better day is due.|El sacerdote consultado sobre la salida de hoy dice que cae en un día que el calendario pawukon marca como no apto para viajar, y nadie discute con el calendario. Todo espera a mañana, cuando toque un día mejor.|Le prêtre consulté pour le départ d'aujourd'hui dit que ce jour est marqué par le calendrier pawukon comme impropre au voyage, et personne ne discute le calendrier. Tout attend demain, où un meilleur jour est prévu.|今日の出発について尋ねられた僧侶は、パウコン暦がこの日を旅に向かないと定めていると言う。誰も暦に逆らわない。すべては、より良い日が来るはずの明日まで待つことになる。",
    ),
  },
  {
    id: "abu-vulkanik",
    n: t("Fine ash settles on the roof|Ceniza fina cubre el tejado|De la cendre fine se dépose sur le toit|屋根に細かい灰が積もる"),
    t: t(
      "A dusting of fine grey ash from the mountain settles over roofs, water tanks and the crops standing in the field, and it has to be washed off before it hardens. It happens often enough here that most houses keep a broom by the door just for the roof.|Una capa de ceniza gris cubre tejados, depósitos de agua y cultivos, y hay que lavarla antes de que se endurezca. Ocurre tan a menudo que casi todas las casas guardan una escoba en la puerta solo para el tejado.|Un voile de cendre grise se dépose sur les toits, les citernes et les cultures, et il faut le laver avant qu'il ne durcisse. Cela arrive assez souvent ici pour que presque chaque maison garde un balai à la porte, rien que pour le toit.|山からの細かい灰色の灰が屋根や貯水槽、畑の作物にうっすら積もり、固まる前に洗い流さなければならない。ここでは珍しくないことなので、たいていの家は屋根専用の箒を戸口に置いている。",
    ),
  },
  {
    id: "sumbangan-upacara",
    n: t("The banjar calls for a contribution|El banjar pide una contribución|Le banjar réclame une contribution|バンジャールが寄付を募る"),
    t: t(
      "The banjar, the neighbourhood council every household belongs to, has announced a cremation and everyone contributes toward the cost, whether or not they knew the family well. Skipping the collection is allowed, but it is remembered for a long time.|El banjar, el consejo vecinal al que pertenece cada casa, anuncia una cremación y todos aportan al coste, se conociera bien o no a la familia. Faltar a la colecta está permitido, pero se recuerda durante mucho tiempo.|Le banjar, le conseil de quartier auquel appartient chaque foyer, annonce une crémation et chacun contribue aux frais, qu'il ait bien connu la famille ou non. Se soustraire à la collecte est permis, mais on s'en souvient longtemps.|各世帯が属す隣組「バンジャール」が火葬の知らせを出すと、その家族をよく知っていようといまいと、みなで費用を出し合う。集金を断ることはできるが、長く覚えられてしまう。",
    ),
  },
  {
    id: "arus-balik",
    n: t("A current pulls straight out to sea|Una corriente tira mar adentro|Un courant tire droit vers le large|離岸流に引かれる"),
    t: t(
      "A rip current pulls straight out from the beach faster than anyone can swim against it, invisible from the sand and marked, if at all, by a single flag most people miss. It sets you down well along the coast, clear of where you went in.|Una corriente de resaca tira mar adentro más rápido de lo que nadie puede nadar en contra, invisible desde la arena y marcada, si acaso, por una sola bandera que casi nadie ve. Te deja bien lejos, a lo largo de la costa.|Un courant de baïne tire droit vers le large plus vite que quiconque ne peut nager contre lui, invisible depuis le sable et signalé, tout au plus, par un unique drapeau que presque personne ne voit. Il te dépose bien plus loin le long de la côte.|離岸流は、誰にも逆らって泳げない速さでまっすぐ沖へ引く。砂浜からは見えず、目印があってもほとんどの人が見落とす旗一本だけである。押し流された先は、入った場所からずいぶん離れた海岸になる。",
    ),
  },
  {
    id: "monyet-mencuri",
    n: t("A macaque grabs whatever is loose|Un macaco agarra lo que esté suelto|Un macaque saisit ce qui traîne|猿がゆるんだ物をさらう"),
    t: t(
      "A macaque grabs whatever is loosest — sunglasses, a sandal, a half-eaten snack — and retreats to a branch just out of reach to inspect it. Trading it back for fruit works more often than anger does.|Un macaco agarra lo que esté más suelto (gafas de sol, una sandalia, un tentempié a medio comer) y se retira a una rama fuera de alcance para examinarlo. Cambiarlo por fruta funciona más a menudo que el enfado.|Un macaque saisit ce qui traîne le plus (lunettes de soleil, tong, en-cas à moitié mangé) et se retire sur une branche hors d'atteinte pour l'examiner. L'échanger contre un fruit marche plus souvent que la colère.|マカクは緩んでいるものなら何でもさらう。サングラス、サンダル、食べかけの菓子。手の届かない枝まで持って行って調べる。怒るより、果物と交換する方がたいてい効く。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。**その月にその場所で実際に起きる行事だけを書く**
 * (茨城と同じ考え方)。ガルンガン・クニンガンはパウコン暦の210日周期なので
 * 年により月がずれるが、盤面では代表的な位置(1月・8月、約7か月おき)に固定した。
 */
export const BALI_SEASONS = [
  {
    e: "🏄",
    n: t("The dry-season swell arrives|Llega el oleaje de la estación seca|La houle de la saison sèche arrive|乾季の波が届く"),
    t: t(
      "The wind swings offshore along the southwest coast and the swell that has been rolling in sideways all wet season finally breaks clean, so surfers who left in March start coming back. Farmers elsewhere start counting on six months without much rain.|El viento gira mar adentro en la costa suroeste y el oleaje que llegaba de lado toda la estación húmeda por fin rompe limpio, así que los surfistas que se fueron en marzo empiezan a volver. En otras partes se cuenta con seis meses casi sin lluvia.|Le vent tourne au large sur la côte sud-ouest et la houle qui arrivait de travers toute la saison humide déferle enfin proprement, si bien que les surfeurs partis en mars reviennent. Ailleurs, on compte sur six mois sans grande pluie.|南西岸で風が沖向きに変わり、雨季のあいだ斜めに崩れていた波がようやくきれいに割れるようになる。3月に去ったサーファーたちが戻り始める季節である。ほかの土地では、あまり雨の降らない六か月をあてにし始める。",
    ),
    f: t(
      "Bali sits close enough to the equator that \"dry season\" and \"wet season\" matter more than the four seasons most visitors expect, and the surf coast runs almost entirely on this one switch in wind direction.|Bali está tan cerca del ecuador que «estación seca» y «húmeda» pesan más que las cuatro estaciones que muchos visitantes esperan, y la costa surfera depende casi solo de este cambio de viento.|Bali est assez proche de l'équateur pour que « saison sèche » et « saison humide » comptent plus que les quatre saisons attendues par la plupart des visiteurs, et la côte du surf dépend presque uniquement de ce changement de vent.|バリは赤道に近く、多くの旅行者が思い描く四季よりも「乾季」と「雨季」のほうが意味を持つ。サーフの海岸は、ほぼこの風向きの切り替え一つで決まっている。",
    ),
  },
  {
    e: "☕",
    n: t("The first coffee cherries turn red|Los primeros granos de café enrojecen|Les premières cerises de café rougissent|コーヒーの実が赤くなり始める"),
    t: t(
      "On the highland slopes around the crater lake the coffee cherries begin to ripen unevenly, so pickers go over the same bushes several times through the season rather than stripping them once. Some farms still grow it the old way, shaded under fruit trees rather than in open rows.|En las laderas altas alrededor del lago del cráter, los granos de café maduran de forma desigual, así que los recolectores repasan los mismos arbustos varias veces. Algunas fincas aún lo cultivan a la sombra de árboles frutales.|Sur les pentes des hauts plateaux autour du lac de cratère, les cerises de café mûrissent de façon inégale, si bien qu'on repasse plusieurs fois sur les mêmes arbustes plutôt que de tout cueillir d'un coup. Certaines fermes le cultivent encore à l'ombre d'arbres fruitiers.|カルデラ湖を囲む高地の斜面で、コーヒーの実は揃わず色づき始める。摘み手は同じ木を一度で終わらせず、季節を通じて何度も見て回る。いまも果樹の陰で育てる昔ながらのやり方を続ける農園もある。",
    ),
    f: t(
      "A civet-processed variant from these same highlands is sold at a large premium abroad, but most of what the terraces actually produce is ordinary robusta drunk black and thick in a glass at the roadside stall.|Una variante procesada por civetas de estas mismas tierras altas se vende cara en el extranjero, pero la mayor parte de lo que producen las terrazas es robusta corriente, servido negro y espeso en un vaso junto a la carretera.|Une variante digérée par la civette, issue des mêmes hauts plateaux, se vend cher à l'étranger, mais l'essentiel de ce que produisent les terrasses reste du robusta ordinaire, bu noir et épais dans un verre au bord de la route.|同じ高地でジャコウネコに食べさせて作る変わり種は海外で高値で売れるが、実際にこの棚田が多く作っているのはふつうのロブスタで、道端の屋台で濃く黒いままグラスで飲まれる。",
    ),
  },
  {
    e: "🎭",
    n: t("The arts festival opens in the capital|Se abre el festival de las artes en la capital|Le festival des arts s'ouvre dans la capitale|州都で芸術祭が開く"),
    t: t(
      "For a month the provincial capital hosts a programme of dance, gamelan and painting drawn from every regency on the island, a tradition the governor started in 1979 to keep village troupes performing rather than letting the old repertoire thin out. Whole banjar travel in from the country to compete.|Durante un mes la capital provincial acoge un programa de danza, gamelán y pintura de todas las regencías de la isla, tradición que el gobernador inició en 1979 para que las compañías de aldea siguieran actuando. Banjar enteros viajan desde el campo para competir.|Pendant un mois, la capitale provinciale accueille un programme de danse, de gamelan et de peinture venu de chaque régence de l'île, tradition lancée par le gouverneur en 1979 pour que les troupes de village continuent de se produire. Des banjar entiers viennent concourir depuis la campagne.|一か月のあいだ、州都では島じゅうの県から集まった舞踊とガムラン、絵画の催しが開かれる。1979年に知事が始めた伝統で、村の一座の芸が途絶えないようにする狙いだった。バンジャール(隣組)がまるごと競演のために田舎からやってくる。",
    ),
    f: t(
      "Some of the dances performed here exist nowhere else outside the one village that still keeps them, so the festival is as much a rescue effort as a show.|Algunas danzas que se representan aquí no existen fuera del único pueblo que aún las conserva, así que el festival es tanto un rescate como un espectáculo.|Certaines danses jouées ici n'existent nulle part ailleurs que dans l'unique village qui les conserve encore, si bien que le festival tient autant du sauvetage que du spectacle.|ここで演じられる踊りの中には、いまも守り続けている一つの村の外にはもう残っていないものもある。この芸術祭は見世物であると同時に、芸を絶やさないための取り組みでもある。",
    ),
  },
  {
    e: "🪁",
    n: t("Giant kites rise over open fields|Cometas gigantes se alzan sobre campos abiertos|D'immenses cerfs-volants s'élèvent sur les champs|巨大な凧が野に上がる"),
    t: t(
      "The dry wind is steady enough now to fly kites the size of a house — a fish-shaped bebean, a dragon-shaped janggan with a tail dozens of metres long, or a leaf-shaped pecukan — and some of the largest need seventy people just to get airborne. Villages compete banjar against banjar rather than flier against flier.|El viento seco es ya lo bastante constante para volar cometas del tamaño de una casa (un bebean con forma de pez, un janggan con cola de decenas de metros, un pecukan con forma de hoja), y algunas de las mayores necesitan setenta personas solo para despegar. Compiten banjar contra banjar.|Le vent sec est désormais assez régulier pour faire voler des cerfs-volants gros comme une maison (un bebean en forme de poisson, un janggan-dragon à la queue de plusieurs dizaines de mètres, un pecukan en forme de feuille), et les plus grands demandent soixante-dix personnes rien que pour décoller. On rivalise de banjar à banjar.|乾いた風がようやく安定し、家ほどもある凧が上がる。魚の形のブベアン、尾が何十メートルにもなる竜の形のジャンガン、葉の形のプチュカン。最大のものは、揚げるだけで七十人を要する。競うのは飛ばし手どうしではなく、バンジャール(隣組)どうしである。",
    ),
    f: t(
      "The kites are flown as an offering to the god of the harvest as much as for sport, so a field full of them just before the main rice cutting is not really a coincidence.|Las cometas se vuelan tanto como ofrenda al dios de la cosecha como por deporte, así que un campo lleno de ellas justo antes de la siega principal no es del todo casualidad.|Les cerfs-volants sont autant une offrande au dieu des récoltes qu'un sport, si bien qu'un champ qui s'en couvre juste avant la grande coupe du riz n'a rien d'un hasard.|凧はスポーツであると同時に豊作の神への供物でもある。本格的な稲刈りの直前に野が凧で埋まるのは、まったくの偶然ではない。",
    ),
  },
  {
    e: "🙏",
    n: t("Galungan: the ancestors come down|Galungan: los antepasados bajan|Galungan : les ancêtres descendent|ガルンガン、祖霊が降りる日"),
    t: t(
      "Every household raises a penjor — a tall bent bamboo pole hung with rice, coconut leaf and flowers — outside its gate to mark the day the ancestors and gods are believed to visit the earth, and the streets of even the smallest village fill with them for a fortnight. Ten days later, on Kuningan, the same spirits are sent back.|Cada casa levanta un penjor (una vara de bambú alta y curvada, colgada de arroz, hoja de palma y flores) frente a su puerta el día en que se cree que antepasados y dioses visitan la tierra, y hasta el pueblo más pequeño se llena de ellos dos semanas. Diez días después, en Kuningan, se les despide.|Chaque foyer dresse un penjor (une haute perche de bambou courbée, garnie de riz, de feuilles de palmier et de fleurs) devant son portail le jour où l'on croit que les ancêtres et les dieux visitent la terre, et même le plus petit village s'en couvre pendant quinze jours. Dix jours plus tard, à Kuningan, on les renvoie.|祖霊と神々がこの世を訪れるとされる日、どの家も門の前に「プンジョール」を立てる。米や椰子の葉、花を吊るした、大きく弧を描く竹竿である。どんな小さな村の通りも、二週間このプンジョールで埋まる。十日後のクニンガンには、同じ霊たちを送り返す。",
    ),
    f: t(
      "The date is set by the pawukon calendar rather than the sun or moon, so it falls roughly every 210 days — about seven times every six years by the calendar most of the world uses.|La fecha la fija el calendario pawukon, no el sol ni la luna, así que cae cada 210 días aproximadamente: unas siete veces cada seis años según el calendario que usa la mayor parte del mundo.|La date est fixée par le calendrier pawukon, non par le soleil ni la lune, si bien qu'elle revient environ tous les 210 jours, soit environ sept fois tous les six ans selon le calendrier utilisé par la majeure partie du monde.|日取りを決めるのは太陽でも月でもなくパウコン暦で、およそ210日ごとに巡ってくる。世界の多くが使う暦でいえば、六年でおよそ七回にあたる。",
    ),
  },
  {
    e: "🌾",
    n: t("The terraces are cut|Se cortan las terrazas|On coupe les terrasses|棚田を刈る"),
    t: t(
      "Thanks to a year-round irrigation system old enough to be a UNESCO listing, the south's terraces can be harvested two or three times a year rather than once, and this cut overlaps with the first ripening mangoes in the lowland orchards. The subak that manages the water decides the planting date for an entire terrace at once, not field by field.|Gracias a un sistema de riego que funciona todo el año y que la UNESCO ha reconocido, las terrazas del sur pueden cosecharse dos o tres veces al año en vez de una, y este corte coincide con los primeros mangos maduros. El subak que gestiona el agua fija la fecha de siembra para toda la terraza a la vez.|Grâce à un système d'irrigation permanent, assez ancien pour figurer à l'UNESCO, les terrasses du sud se récoltent deux ou trois fois par an au lieu d'une, et cette coupe coïncide avec les premières mangues mûres des vergers de plaine. Le subak qui gère l'eau fixe la date de plantation pour toute la terrasse à la fois.|一年を通じて機能する灌漑がユネスコに登録されるほど古くから続くおかげで、南部の棚田は一年に一度ではなく二、三度刈れる。この刈り取りは低地の果樹園でマンゴーが熟し始める時期と重なる。水を差配する組合「スバック」が、田一枚ずつではなく棚田全体の田植えの日を一度に決める。",
    ),
    f: t(
      "Because the subak decides collectively, a field cannot simply be planted early to beat the market — the whole terrace is synchronised to share the same limited water, which is part of why UNESCO listed it as a cultural landscape rather than just an irrigation network.|Como el subak decide colectivamente, no se puede adelantar la siembra de un campo para ganar al mercado: toda la terraza se sincroniza para repartir el agua limitada, en parte por lo que la UNESCO lo declaró paisaje cultural y no solo red de riego.|Comme le subak décide collectivement, un champ ne peut pas être planté en avance pour devancer le marché : toute la terrasse est synchronisée pour se partager une eau limitée, ce qui explique en partie pourquoi l'UNESCO l'a classée paysage culturel et non simple réseau d'irrigation.|スバックが共同で決めるため、一枚の田だけ早く植えて相場を出し抜くことはできない。限られた水を分け合うため棚田全体を足並みそろえる。ユネスコが単なる灌漑網ではなく文化的景観として登録したのは、そのためでもある。",
    ),
  },
  {
    e: "🧂",
    n: t("The salt pans are raked|Se rastrillan las salinas|On ratisse les marais salants|塩田をならす"),
    t: t(
      "With the dry season nearly spent, salt farmers on the black-sand coast make their last rounds pouring seawater over sand, drying it in the sun, then filtering it through a trough of palm fibre before boiling it down — a method unchanged since long before factory salt arrived. Once the rains return in earnest the pans go idle for the year.|Con la estación seca casi acabada, los salineros de la costa de arena negra hacen sus últimas rondas: vierten agua de mar sobre la arena, la secan al sol y la filtran por un canal de fibra de palma antes de hervirla, un método sin cambios desde antes de la sal industrial. Cuando vuelven las lluvias, las salinas quedan paradas.|La saison sèche touchant à sa fin, les sauniers de la côte de sable noir font leurs dernières tournées : ils versent de l'eau de mer sur le sable, le sèchent au soleil, puis le filtrent dans une auge de fibre de palmier avant de le faire bouillir, une méthode inchangée depuis bien avant le sel industriel. Une fois les pluies revenues, les marais restent au repos.|乾季も終わりに近づき、黒砂の海岸の塩づくりは最後の仕込みに入る。砂に海水をかけて天日で乾かし、椰子の繊維を敷いた樋で濾してから煮詰める。工場塩が来るよりずっと前から変わらない作り方である。本格的な雨が戻れば、塩田は一年間休む。",
    ),
    f: t(
      "A single farmer works only a few dozen square metres of sand by hand, so this salt has never been able to compete on price with the industrial kind — only on the people who still choose to buy it.|Un solo salinero trabaja a mano solo unas pocas docenas de metros cuadrados de arena, así que esta sal nunca ha podido competir en precio con la industrial, solo en la gente que aún elige comprarla.|Un seul saunier ne travaille à la main que quelques dizaines de mètres carrés de sable, si bien que ce sel n'a jamais pu rivaliser de prix avec le sel industriel, seulement convaincre ceux qui choisissent encore de l'acheter.|一人の塩職人が手で扱う砂はせいぜい数十平方メートルにすぎない。だからこの塩は値段で工業塩に太刀打ちしたことはない。それでも買い続ける人がいるかどうかだけが頼りである。",
    ),
  },
  {
    e: "🌧️",
    n: t("The rains return and the paddies are turned|Vuelven las lluvias y se voltean los arrozales|Les pluies reviennent et l'on retourne les rizières|雨が戻り田を起こす"),
    t: t(
      "The first heavy rains soften ground that has baked hard for months, and farmers plough the paddies under with water buffalo or a small hand tractor to start the next planting. The frogs and dragonflies that vanished in the dry months are back within days of the first flooding.|Las primeras lluvias fuertes ablandan una tierra que llevaba meses endurecida, y los agricultores aran los arrozales con búfalos de agua o un pequeño tractor de mano para la próxima siembra. Ranas y libélulas, ausentes en los meses secos, vuelven a los pocos días de la primera inundación.|Les premières pluies fortes amollissent une terre durcie depuis des mois, et les paysans labourent les rizières au buffle d'eau ou au petit motoculteur pour la prochaine plantation. Grenouilles et libellules, disparues durant les mois secs, reviennent quelques jours après la première inondation.|数か月かけて固くなった土を、最初の強い雨がやわらげる。農家は水牛か小さな耕耘機で田を起こし、次の田植えに備える。乾季のあいだ姿を消していた蛙と蜻蛉は、最初に水が入って数日のうちに戻ってくる。",
    ),
    f: t(
      "A water buffalo can plough ground a small tractor gets stuck in, and on the steepest terraces it is still the only practical option — which is part of why the animal appears so often in temple carving.|Un búfalo de agua puede arar terreno donde un tractor pequeño se atasca, y en las terrazas más empinadas sigue siendo la única opción práctica; en parte por eso el animal aparece tan a menudo en las tallas de los templos.|Un buffle d'eau peut labourer un terrain où un petit tracteur s'enlise, et sur les terrasses les plus abruptes, il reste la seule option pratique, ce qui explique en partie sa présence si fréquente dans les sculptures de temple.|水牛は小型の耕耘機がはまり込むような土地でも耕せる。もっとも急な棚田では、いまも実用的な手段はこれしかない。寺院の彫刻にこの動物がよく登場するのも、そのためでもある。",
    ),
  },
  {
    e: "🥭",
    n: t("Markets fill with mango and rain|Los mercados se llenan de mango y lluvia|Les marchés se remplissent de mangues et de pluie|市場がマンゴーと雨で埋まる"),
    t: t(
      "The heaviest rain of the year falls in short, hard bursts most afternoons, and between them the markets are stacked with mango, rambutan and the first of the season's salak. Indoors, the woodcarvers and silversmiths whose season slows in the dry-season tourist rush get their busiest months.|La lluvia más fuerte del año cae en ráfagas cortas casi cada tarde, y entre ellas los mercados se llenan de mango, rambután y el primer salak de temporada. Bajo techo, talladores y plateros, cuya temporada se ralentiza con el turismo de la estación seca, viven sus meses más ocupados.|La pluie la plus forte de l'année tombe en averses courtes et fortes presque chaque après-midi, et entre elles, les marchés débordent de mangues, de ramboutans et des premiers salak de la saison. À l'intérieur, sculpteurs sur bois et orfèvres, dont la saison ralentit pendant l'afflux touristique de la saison sèche, vivent leurs mois les plus actifs.|一年でいちばん強い雨がほとんど毎日午後、短く激しく降る。その合間、市場はマンゴーやランブータン、その季節はじめのサラッカで埋まる。乾季の観光客で忙しい時期には手が回らない木彫師や銀細工師にとっては、いちばん忙しい月になる。",
    ),
    f: t(
      "Salak, sold in a brown scaled skin peeled off like a lizard's, is nicknamed \"snake fruit\" for exactly that reason, and Bali's own variety is smaller and sweeter than the kind grown elsewhere in Indonesia.|El salak, con una piel escamosa marrón que se pela como la de un lagarto, se apoda «fruta serpiente» justo por eso, y la variedad propia de Bali es más pequeña y dulce que la cultivada en el resto de Indonesia.|Le salak, à la peau brune écailleuse qu'on pèle comme celle d'un lézard, est surnommé « fruit-serpent » pour cette raison même, et la variété propre à Bali est plus petite et plus sucrée que celle cultivée ailleurs en Indonésie.|サラッカは蜥蜴の皮のように剥ける茶色い鱗状の皮を持ち、それゆえ「蛇の実」と呼ばれる。バリ産の品種は、インドネシアのほかの土地のものより小ぶりで甘い。",
    ),
  },
  {
    e: "🙏",
    n: t("Saraswati and Galungan close the cycle|Saraswati y Galungan cierran el ciclo|Saraswati et Galungan referment le cycle|サラスワティとガルンガンが暦を閉じる"),
    t: t(
      "On the last day of the 210-day pawukon cycle books and lontar manuscripts are set out and blessed rather than read, honouring Saraswati, goddess of knowledge; three days later the cycle restarts with Galungan, when the penjor poles go up outside every gate again. Nobody is meant to read on Saraswati's own day.|El último día del ciclo pawukon de 210 días se exponen y bendicen libros y manuscritos lontar en vez de leerlos, en honor a Saraswati, diosa del conocimiento; tres días después el ciclo reinicia con Galungan. Se supone que nadie lee ese día.|Le dernier jour du cycle pawukon de 210 jours, on expose et bénit livres et manuscrits lontar au lieu de les lire, en l'honneur de Sarasvatî, déesse du savoir ; trois jours plus tard, le cycle repart avec Galungan. Personne n'est censé lire ce jour-là.|210日のパウコン暦の最終日、書物とロンタル写本は読まれるのではなく供えられ、清められる。知の女神サラスワティを讃える日である。三日後、暦はガルンガンとともにまた回り始め、どの門にもプンジョールが再び立つ。この日は誰も本を読んではならないとされる。",
    ),
    f: t(
      "The paradox of a knowledge festival where reading is set aside is deliberate: the day honours the source of knowledge itself, not the act of studying it.|La paradoja de un festival del conocimiento en el que se deja de leer es deliberada: el día honra la fuente misma del conocimiento, no el acto de estudiarlo.|Le paradoxe d'une fête du savoir où l'on cesse de lire est volontaire : le jour honore la source même du savoir, non l'acte de l'étudier.|知の祭りなのに本を読まないという逆説は、わざとそうしてある。この日が讃えるのは知そのものの源であって、学ぶという行いではない。",
    ),
  },
  {
    e: "⛈️",
    n: t("The wet season peaks|La estación húmeda alcanza su punto máximo|La saison humide culmine|雨季が最も深まる"),
    t: t(
      "The lowland south floods most readily of anywhere on the island, since it is where every river off the central mountains eventually drains, and canals that look ordinary the rest of the year fill to the brim within an hour of a hard storm. Temple anniversaries keep to their own 210-day clock regardless of the weather.|El sur bajo se inunda con más facilidad que cualquier otro punto de la isla, pues es donde acaban desaguando todos los ríos de las montañas centrales, y canales que el resto del año parecen normales se llenan hasta el borde en una hora de tormenta fuerte. Los aniversarios de los templos siguen su propio reloj de 210 días.|Le sud des basses terres est l'endroit de l'île qui inonde le plus facilement, car c'est là que finissent par se jeter toutes les rivières des montagnes centrales, et des canaux d'apparence ordinaire le reste de l'année se remplissent à ras bord en une heure d'orage. Les anniversaires de temple suivent leur propre horloge de 210 jours, quel que soit le temps.|中央の山々から出るすべての川が最後に注ぐのが南の低地であるため、島でもっとも水があふれやすい。ふだんは何でもない水路が、激しい嵐から一時間で縁まで満ちる。寺院の創建記念日「オダラン」は天候に関わりなく独自の210日周期で巡ってくる。",
    ),
    f: t(
      "Every temple keeps its own anniversary on this same 210-day pawukon rhythm as Galungan, which is why a temple festival can fall in the middle of the wettest month for one temple and the driest for another, entirely by chance of the calendar.|Cada templo celebra su propio aniversario con el mismo ritmo pawukon de 210 días que Galungan, por lo que su fiesta puede caer en pleno mes más lluvioso para un templo y en el más seco para otro, por puro azar del calendario.|Chaque temple célèbre son propre anniversaire selon le même rythme pawukon de 210 jours que Galungan, si bien que sa fête peut tomber en plein mois le plus pluvieux pour l'un et le plus sec pour l'autre, par pur hasard du calendrier.|どの寺院も創建記念日「オダラン」をガルンガンと同じ210日のパウコン周期で祝う。そのため、ある寺院ではいちばん雨の多い月に、別の寺院ではいちばん乾いた月に祭りが当たることもある。まったくの暦の巡り合わせである。",
    ),
  },
  {
    e: "🌑",
    n: t("Nyepi: the island falls silent|Nyepi: la isla enmudece|Nyepi : l'île se tait|ニュピ、島が静まる"),
    t: t(
      "Days before, statues and temple relics are carried down to the sea for purification in the Melasti procession; then on New Year's Day itself, no fire may be lit, no work done, no travel made and no lights shown after dark for twenty-four straight hours, to convince evil spirits the island is empty and move on elsewhere. Even the international airport closes, the only one in the world to do so for a religious holiday.|Días antes, estatuas y reliquias del templo bajan al mar para purificarse en la procesión de Melasti; luego, en el día de Año Nuevo, no se enciende fuego, no se trabaja, no se viaja ni se muestra luz tras el anochecer durante veinticuatro horas seguidas, para convencer a los malos espíritus de que la isla está vacía. Hasta el aeropuerto internacional cierra, el único del mundo que lo hace por una fiesta religiosa.|Quelques jours avant, statues et reliques de temple descendent à la mer pour être purifiées lors de la procession de Melasti ; puis, le jour du Nouvel An lui-même, on n'allume aucun feu, on ne travaille pas, on ne voyage pas et l'on ne montre aucune lumière après la tombée du jour, vingt-quatre heures durant, pour convaincre les mauvais esprits que l'île est vide. Même l'aéroport international ferme, le seul au monde à le faire pour une fête religieuse.|数日前、寺院の御神体は清めのため海へ運ばれる「ムラスティ」の行列に加わる。そして新年の当日は、火を灯さず、働かず、外へ出ず、日没後は明かりも見せない状態が丸一日続く。悪い霊に、この島には誰もいないと思わせて通り過ぎさせるためである。国際空港さえ閉まる。宗教行事のために閉鎖する空港は世界でここだけである。",
    ),
    f: t(
      "Non-Hindus and tourists must observe the same rules of darkness and silence as everyone else, which is part of why the day is treated here as a shared pause for the whole spirit world, not just a Balinese Hindu observance.|No hindúes y turistas deben cumplir las mismas normas de oscuridad y silencio que el resto, por lo que aquí se trata este día como una pausa compartida para todo el mundo espiritual, no solo para los hindúes balineses.|Non-hindous et touristes doivent respecter les mêmes règles d'obscurité et de silence que tout le monde, ce qui explique en partie pourquoi ce jour est traité ici comme une pause partagée pour tout le monde des esprits, pas seulement pour les hindous balinais.|ヒンドゥー教徒でない者も旅行者も、暗闇と静寂の同じ決まりを守らねばならない。この日がバリ・ヒンドゥーだけの行事ではなく、霊のすべてに対する共通の休止として扱われているのは、そのためでもある。",
    ),
  },
];
