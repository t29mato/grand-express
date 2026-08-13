/**
 * ベネズエラの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・韓国と同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const VENEZUELA_META = {
  id: "venezuela",
  name: t("Venezuela|Venezuela|Venezuela|ベネズエラ"),
  blurb: t(
    "A land of tepui-topped tables, an oil lake, and cities where prices are quoted straight in dollars|Una tierra de mesas coronadas por tepuyes, un lago de petróleo y ciudades donde los precios se dicen directamente en dólares|Une terre de tables couronnées de tepuis, un lac de pétrole, et des villes où les prix se disent en dollars|テプイの卓状台地と油の湖、値段をドルで言う町々の国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (他の書き起こし国と同じ理由。ここは暫定値100のまま)。
  //
  // ## 通貨をボリバルではなくドルにした理由
  //
  // ベネズエラは2008年・2018年・2021年と3度のデノミネーション(通貨単位の
  // 切り下げ)を行った国で、直近だけでも旧単位から数字を14桁削っている。
  // ハイパーインフレでボリバル建ての値付けそのものが機能しなくなり、
  // 不動産も中古車も、家賃も、露店の値段でさえ、いまは日常的に米ドルで
  // 交渉・支払いされる(「ドル化(dolarización)」と呼ばれる)。
  // これは面白い豆知識として軽く扱うものではなく、通貨が実質的な役目を
  // 果たせなくなった生活の結果として起きていることである。
  // この盤面がボリバルではなくドルで物件価格を表示するのは、その事実を
  // そのまま反映しているだけであり、誇張でも脚色でもない。
  cur: { pre: "$", post: "", mul: 100 },
  start: "caracas",
  cpuNames: ["Guacamaya", "Tepuy", "Chigüire", "Araguaney"],
  // 国旗の黄・青・赤(黄=富、青=大西洋を渡る独立、赤=独立の血)。
  stripe: ["#f4c430", "#00247d", "#c8102e", "#f6efe2"],
};

/** 6区分。人口密集の首都圏・オイルマネーのスリア・アンデス・
 * 中西部とラノス(牧畜地帯)・グアヤナ(南部)・オリエンテ(東部沿岸)。 */
export const VENEZUELA_REGIONS = {
  cap: t("Capital Region, around Caracas|Región Capital, en torno a Caracas|Région capitale, autour de Caracas|首都圏(カラカスの周り)"),
  zu: t("Zulia, around Lake Maracaibo|Zulia, en torno al lago de Maracaibo|Zulia, autour du lac de Maracaibo|スリア(マラカイボ湖の周り)"),
  and: t("The Andes|Los Andes|Les Andes|アンデス地方"),
  cen: t("West-Central Venezuela and the Llanos|Centro-occidente y los Llanos|Le Centre-ouest et les Llanos|中西部とラノス平原"),
  gua: t("Guayana, south of the Orinoco|Guayana, al sur del Orinoco|Guayane, au sud de l'Orénoque|グアヤナ(オリノコ川以南)"),
  ori: t("The Oriente coast|El Oriente|L'Oriente|オリエンテ(東部沿岸)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵はベネズエラ固有のスペイン語(9件とも既存キーと衝突していないことを
 * `country-index.json` で確認済み。REGISTER.md参照)。
 */
export const VENEZUELA_ITEMS = {
  condor: {
    e: "🦅",
    price: 260,
    kind: "move",
    n: t("A Ride on the Andean Condor|Un vuelo en el cóndor andino|Un vol sur le condor des Andes|アンデスコンドルの背に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "The Andean condor can hold a three-metre wingspan almost motionless for hours, riding thermal currents up the mountain faces rather than flapping, and a single bird may cover well over 100 kilometres in a day without much more effort than drifting. Andean legend across the region treats the condor less as a bird of prey than as a messenger that carries the sun back up the sky each morning.|El cóndor andino puede mantener casi inmóviles sus tres metros de envergadura durante horas, remontando las corrientes térmicas en las laderas en vez de aletear, y un solo ejemplar puede recorrer más de 100 kilómetros en un día sin mucho más esfuerzo que dejarse llevar. La leyenda andina de la región trata al cóndor menos como ave de rapiña que como un mensajero que devuelve el sol al cielo cada mañana.|Le condor des Andes peut tenir ses trois mètres d'envergure presque immobiles pendant des heures, remontant les courants thermiques le long des parois plutôt qu'en battant des ailes, et un seul oiseau peut couvrir plus de 100 kilomètres en une journée sans beaucoup plus d'effort que de se laisser porter. La légende andine de la région traite le condor moins comme un rapace que comme un messager qui ramène le soleil dans le ciel chaque matin.|アンデスコンドルは3メートルの翼をほとんど動かさぬまま何時間も保つことができ、羽ばたく代わりに山肌に沿う上昇気流に乗る。一羽で一日に100キロメートル以上を、漂うのとさして変わらない労力で移動することもある。この地域のアンデスの伝承は、コンドルを猛禽としてよりも、毎朝太陽を空へ運び戻す使者として扱う。",
    ),
  },
  animalito: {
    e: "🎫",
    price: 380,
    kind: "pre",
    n: t("An Animalitos Lottery Ticket|Un ticket de la lotería de animalitos|Un billet de la loterie animalitos|アニマリートス富くじの券"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "In animalitos, each number from 00 to 36 is paired with an animal — the deer, the parrot, the elephant — and street vendors take small bets on which one a spinning wheel will land on, all without any official lottery licence. The game has been informally played, and periodically banned, for over a century, and regulars insist certain animals run in \"hot streaks\" the way others swear by lucky numbers.|En los animalitos, cada número del 00 al 36 va emparejado con un animal —el venado, el loro, el elefante— y los vendedores callejeros toman pequeñas apuestas sobre cuál tocará una ruleta giratoria, todo sin ninguna licencia oficial de lotería. El juego se ha practicado de forma informal, y prohibido a ratos, desde hace más de un siglo, y los habituales insisten en que ciertos animales tienen \"rachas\" igual que otros juran por números de la suerte.|Dans les animalitos, chaque numéro de 00 à 36 est associé à un animal — le cerf, le perroquet, l'éléphant — et des vendeurs de rue prennent de petits paris sur celui que désignera une roue tournante, sans la moindre licence de loterie officielle. Le jeu se pratique de façon informelle, et a été périodiquement interdit, depuis plus d'un siècle, et les habitués jurent que certains animaux connaissent des \"séries chaudes\" comme d'autres jurent par des numéros porte-bonheur.|アニマリートスでは00から36までの数字それぞれに鹿・オウム・象などの動物が対応づけられ、路上の売り子が公式の富くじの免許なしに、回転盤がどの動物で止まるかに小さな賭けを取り仕切る。この遊びは非公式に行われ、ときに禁止されながらも一世紀以上続いており、常連は特定の動物に「当たりの波」があると言い張る。ラッキーナンバーを信じる人と同じ理屈である。",
    ),
  },
  porpuesto: {
    e: "🚗",
    price: 300,
    kind: "pre",
    n: t("A Por Puesto Shared Taxi|Un por puesto (taxi compartido)|Un por puesto (taxi partagé)|ポル・プエスト(乗合タクシー)"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "A por puesto — literally \"for the seat\" — is a car or minibus that runs a fixed route and leaves the moment every seat is filled rather than on any timetable, so the wait can be a minute or twenty depending on who else is going your way. Fares are agreed by word of mouth along the route rather than posted anywhere.|Un por puesto —literalmente \"por el puesto\"— es un carro o buseta que sigue una ruta fija y sale en cuanto se llenan todos los asientos, sin ningún horario fijo, así que la espera puede ser de un minuto o de veinte según quién más vaya en tu dirección. Las tarifas se acuerdan de boca en boca a lo largo de la ruta, sin que estén anunciadas en ningún lado.|Un por puesto — littéralement « pour la place » — est une voiture ou un minibus qui suit un trajet fixe et part dès que toutes les places sont occupées plutôt qu'à heure fixe, si bien que l'attente peut durer une minute ou vingt selon qui d'autre va dans la même direction. Les tarifs se négocient de bouche à oreille le long du trajet plutôt que d'être affichés.|「ポル・プエスト」――文字どおり「席ぶんだけ」を意味する――は決まった路線を走る乗用車やミニバスで、時刻表ではなく座席が全部埋まった瞬間に発車する。だから待ち時間は同じ方向へ行く客がどれだけいるかで、1分のこともあれば20分のこともある。運賃はどこにも掲示されず、その路線に乗る人たちの口コミで決まる。",
    ),
  },
  metro: {
    e: "🚇",
    price: 560,
    kind: "pre",
    n: t("Caracas Metro Ticket|Boleto del Metro de Caracas|Ticket du métro de Caracas|カラカス地下鉄の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Opened in 1983, the Caracas Metro was the first underground railway built in Venezuela and remains one of only a handful of passenger rail systems the country has, cutting a trip across the traffic-choked capital from an hour or more down to about twenty minutes. Its stations have doubled for decades as informal art galleries, with murals and sculptures commissioned specifically for commuters rather than tourists.|Inaugurado en 1983, el Metro de Caracas fue el primer ferrocarril subterráneo construido en Venezuela y sigue siendo uno de los pocos sistemas de tren de pasajeros que tiene el país, reduciendo un cruce de la capital, atascada de tráfico, de una hora o más a unos veinte minutos. Sus estaciones han servido durante décadas como galerías de arte informales, con murales y esculturas encargados pensando en los pasajeros, no en los turistas.|Inauguré en 1983, le métro de Caracas fut le premier chemin de fer souterrain construit au Venezuela et reste l'un des rares réseaux ferroviaires de voyageurs que compte le pays, ramenant une traversée de la capitale engorgée par la circulation d'une heure ou plus à une vingtaine de minutes. Ses stations servent depuis des décennies de galeries d'art informelles, avec des fresques et des sculptures commandées pour les usagers plutôt que pour les touristes.|1983年に開業したカラカス地下鉄は、ベネズエラで初めて建設された地下鉄道であり、いまも国内に数えるほどしかない旅客鉄道の一つである。渋滞まみれの首都を横断する移動を、1時間以上からおよそ20分にまで縮めた。その駅は何十年ものあいだ非公式の美術館としても使われており、壁画や彫刻は観光客ではなく通勤客のために発注されてきた。",
    ),
  },
  tabaco: {
    e: "🚬",
    price: 340,
    kind: "passive",
    n: t("A Lit Cigar Against the Silbón|Un tabaco encendido contra El Silbón|Un cigare allumé contre le Silbón|エル・シルボン除けの葉巻"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Llanero cowboys have long carried a lit cigar or a pouch of chimó, a fermented tobacco paste, on night rides across the plains, partly for the habit and partly for the old belief that the smoke is one of the few things that turns the Silbón aside. Nobody claims it works for certain, only that riding without it feels like tempting something.|Los llaneros llevan desde hace tiempo un tabaco encendido o una bolsita de chimó, una pasta de tabaco fermentado, en sus cabalgatas nocturnas por la sabana, en parte por costumbre y en parte por la vieja creencia de que el humo es una de las pocas cosas que hace desviarse al Silbón. Nadie asegura que funcione con certeza, solo que cabalgar sin él es tentar algo.|Les llaneros emportent depuis longtemps un cigare allumé ou une pochette de chimó, une pâte de tabac fermenté, lors de leurs chevauchées nocturnes dans la plaine, en partie par habitude, en partie à cause de la vieille croyance selon laquelle la fumée est l'une des rares choses qui détourne le Silbón. Personne n'affirme que ça marche à coup sûr, seulement que chevaucher sans en avoir revient à tenter quelque chose.|リャネロ(平原の牧童)たちは昔から夜の騎行に火のついた葉巻や、発酵させたタバコの練り物「チモ」の小袋を携えてきた。半分は習慣、半分は煙がエル・シルボンをそらす数少ないものだという古い言い伝えのためである。確実に効くと言い切る者はいないが、持たずに夜駆けするのは何かを試すようなものだとされる。",
    ),
  },
  ruda: {
    e: "🌿",
    price: 440,
    kind: "pre",
    n: t("A Cross of Rue Branches|Una cruz de ramas de ruda|Une croix de branches de rue|ルダの枝の十字"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Ruda, common rue, is tucked behind doors and worn in small bundles across much of Latin America as protection against mal de ojo and bad luck in general, and Venezuelan households often keep a potted plant by the entrance for exactly this reason as much as for its bitter medicinal tea. Two branches tied in a cross are said to work faster than the plant left growing.|La ruda se guarda tras las puertas y se lleva en pequeños atados por buena parte de Latinoamérica como protección contra el mal de ojo y la mala suerte en general, y los hogares venezolanos suelen tener una mata en maceta junto a la entrada tanto por esto como por su té medicinal amargo. Se dice que dos ramas atadas en cruz actúan más rápido que la planta dejada crecer.|La rue, ruda, se glisse derrière les portes et se porte en petits bouquets dans une bonne partie de l'Amérique latine comme protection contre le mauvais œil et la malchance en général, et les foyers vénézuéliens gardent souvent un pied en pot près de l'entrée autant pour cela que pour son thé médicinal amer. Deux branches nouées en croix sont dites agir plus vite que la plante laissée à pousser.|ルダ(ヘンルーダ)はラテンアメリカの広い地域で、邪視や不運全般への魔除けとして戸口に挟んだり小さな束にして身につけたりする。ベネズエラの家庭も苦い薬草茶としての用途と同じくらいの理由で、入口の脇に鉢植えを置くことが多い。二本の枝を十字に結ぶと、育てたままの鉢より早く効くと言われている。",
    ),
  },
  chuleta: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    // 効果の上限(難易度10のクイズ失点147)より安くする必要があり
    // (item-pricing.test.ts)、韓国のjokbo(同じ効果、130)に合わせた。
    price: 130,
    kind: "passive",
    n: t("An Exam Cheat-Sheet|Una chuleta de examen|Une antisèche d'examen|試験のチュレータ(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Chuleta means \"cutlet\" in ordinary Spanish, but Venezuelan students borrowed the word for the tiny, densely folded crib note smuggled into an exam, the kind written small enough to fit inside a pen cap or under a wristwatch. Teachers who confiscate one rarely bother reading it, since half the value was in the effort of copying the material down in the first place.|Chuleta significa literalmente eso, un corte de carne, pero los estudiantes venezolanos tomaron prestada la palabra para la notita diminuta y muy doblada que se cuela en un examen, del tipo que se escribe tan pequeño que cabe dentro de la tapa de un bolígrafo o bajo un reloj de pulsera. Los profesores que confiscan una rara vez se molestan en leerla, porque la mitad del valor estaba en el esfuerzo de copiar el material.|Chuleta signifie littéralement « côtelette » en espagnol courant, mais les étudiants vénézuéliens ont emprunté le mot pour désigner la minuscule antisèche pliée en accordéon glissée dans un examen, écrite si petit qu'elle tient dans le capuchon d'un stylo ou sous une montre-bracelet. Les professeurs qui en confisquent une prennent rarement la peine de la lire, la moitié de sa valeur tenant déjà dans l'effort d'avoir recopié la matière.|チュレータはふつうのスペイン語では「切り身肉」を意味するが、ベネズエラの学生はこの語を、試験に持ち込む極小に折りたたんだカンニングペーパーの意味で借用した。ペンのキャップの中や腕時計の下に収まるほど小さな字で書く。没収した教師がわざわざ読むことはめったにない。価値の半分は、そもそも要点を書き写す作業そのものにあるからである。",
    ),
  },
  billete: {
    e: "💵",
    price: 240,
    kind: "pre",
    n: t("A Discontinued Bolívar Banknote|Un billete de bolívar fuera de circulación|Un billet de bolívar hors circulation|流通を終えたボリバル紙幣"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "After three redenominations since 2008 stripped a combined fourteen zeros from the currency, older bolívar notes stopped being money and started being souvenirs, sold to collectors and travelers for a fraction of a dollar apiece regardless of the enormous number printed on the front. Street vendors in tourist areas now do a small trade in exactly this — worthless cash reframed as a curiosity.|Tras tres redenominaciones desde 2008 que juntas quitaron catorce ceros a la moneda, los billetes de bolívar más antiguos dejaron de ser dinero para convertirse en souvenirs, vendidos a coleccionistas y viajeros por una fracción de dólar cada uno sin importar la cifra enorme impresa al frente. Los vendedores callejeros de zonas turísticas hacen ahora un pequeño negocio justo con esto: dinero sin valor convertido en curiosidad.|Après trois redénominations depuis 2008 qui ont retiré au total quatorze zéros à la monnaie, les anciens billets de bolívar ont cessé d'être de l'argent pour devenir des souvenirs, vendus aux collectionneurs et aux voyageurs pour une fraction de dollar pièce, quel que soit le nombre énorme imprimé au recto. Des vendeurs de rue dans les zones touristiques en tirent aujourd'hui un petit commerce : de l'argent sans valeur transformé en curiosité.|2008年以降三度のデノミで合わせて14桁もの数字が通貨から削られたのち、古いボリバル紙幣はお金であることをやめ、土産物になった。額面にどれほど大きな数字が印刷されていても、コレクターや旅行者に1ドルにも満たない値段で売られる。観光地の露店商人は、価値を失った紙幣を珍品として売る、まさにこの小さな商いをいまも営んでいる。",
    ),
  },
  mototaxi: {
    e: "🏍️",
    price: 400,
    kind: "pre",
    n: t("A Mototaxi Ride|Un mototaxi|Une course en mototaxi|モトタクシー"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A mototaxi splits lanes, mounts the odd sidewalk and treats a red light as more of a suggestion, cutting a cross-city trip that would take a car forty minutes down to something closer to fifteen. Riders are handed a spare helmet that has clearly seen better decades, and nobody spends much time asking where it's been.|Un mototaxi se cuela entre carriles, sube alguna que otra acera y trata un semáforo en rojo más como una sugerencia, reduciendo un trayecto por la ciudad que a un carro le tomaría cuarenta minutos a algo más cercano a quince. Al pasajero le dan un casco de repuesto que claramente ha visto mejores décadas, y nadie se detiene mucho a preguntar por dónde ha andado.|Un mototaxi se faufile entre les voies, monte parfois sur le trottoir et traite un feu rouge plutôt comme une suggestion, ramenant un trajet à travers la ville qui prendrait quarante minutes en voiture à quelque chose de plus proche de quinze. On tend au passager un casque de secours qui a visiblement connu de meilleures décennies, et personne ne s'attarde à demander d'où il vient.|モトタクシーは車線をすり抜け、時には歩道にも乗り上げ、赤信号をほとんど提案程度にしか扱わない。車なら40分かかる市内横断を15分ほどに縮めてしまう。渡される予備のヘルメットは明らかに何十年分もくたびれているが、それがどこをくぐり抜けてきたのか、わざわざ尋ねる客はいない。",
    ),
  },
};

/**
 * 厄災の神。リャノス(平原)の伝説エル・シルボンにした。父を殺した罪で
 * 骨の入った袋を背負い、口笛で人を欺きながら永遠にさまよう若者の霊。
 * 残酷な脅威としてではなく、耳を欺くいたずら好きの性格として描く
 * (韓国のトッケビ・茨城のダイダラボウと同じく「度が過ぎるだけ」の性格)。
 */
export const VENEZUELA_SPIRIT = {
  e: "👻",
  n: t("The Silbón|El Silbón|Le Silbón|エル・シルボン"),
  big: t("The Silbón's Closing Whistle|El silbido que se acerca de El Silbón|Le sifflement qui approche du Silbón|エル・シルボンの迫る口笛"),
  ward: "tabaco",
  arrive: t(
    "<b>👻 The Silbón has picked up your trail.</b> Llanos legend says he was a young man cursed to wander forever with a sack of his father's bones on his back after a terrible crime, whistling a tune that tricks the ear — loud when he is far, faint when he is near. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👻 El Silbón ha dado contigo.</b> La leyenda llanera cuenta que fue un joven condenado a vagar para siempre con un saco de los huesos de su padre a la espalda tras un crimen terrible, silbando una tonada que engaña al oído: fuerte cuando está lejos, apenas audible cuando está cerca. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👻 Le Silbón s'est mis sur ta piste.</b> La légende des Llanos raconte qu'il fut un jeune homme condamné à errer pour toujours avec un sac des os de son père sur le dos après un crime terrible, sifflant un air qui trompe l'oreille : fort quand il est loin, à peine audible quand il est proche. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👻 エル・シルボンに目を付けられた。</b> リャノスの伝説によれば、彼はある恐ろしい罪ののち、父の骨の入った袋を背負って永遠にさまよう呪いをかけられた若者だという。その口笛は耳を欺く。遠くにいるときほど大きく響き、近くにいるときほどかすかにしか聞こえない。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👻 <b>The Silbón</b> loses interest and drifts toward <b>{0}</b>, farthest from {1}.|👻 <b>El Silbón</b> pierde el interés y se desliza hacia <b>{0}</b>, el más lejano de {1}.|👻 <b>Le Silbón</b> se désintéresse et glisse vers <b>{0}</b>, le plus loin de {1}.|👻 <b>エル・シルボン</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ漂っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the Silbón and the whistle has never once told the truth. He stops trying to trick the ear and simply closes the distance — <b>the Silbón's Closing Whistle</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al Silbón y el silbido nunca ha dicho la verdad ni una vez. Deja de intentar engañar al oído y sencillamente acorta la distancia: empieza <b>el silbido que se acerca de El Silbón</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le Silbón et le sifflement n'a jamais dit la vérité. Il cesse de tromper l'oreille et se contente de réduire la distance : <b>le sifflement qui approche du Silbón</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもエル・シルボンと歩いていながら、その口笛は一度も真実を語らなかった。彼はもう耳を欺くのをやめ、ただ距離を詰め始める。<b>エル・シルボンの迫る口笛</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the whistle's trick is the whole legend — travelers are taught that a loud, close-sounding whistle means he is actually far away, and a whistle you can barely hear means he is right behind you. Dogs are said to sense the truth before any person does, and start barking long before the whistle is heard at all.|<b>Tras la historia:</b> el engaño del silbido es el corazón de la leyenda; se enseña a los viajeros que un silbido fuerte y cercano significa que en realidad está lejos, y uno apenas audible significa que lo tienes justo detrás. Se dice que los perros sienten la verdad antes que cualquier persona, y empiezan a ladrar mucho antes de oírse el silbido siquiera.|<b>Derrière l'histoire :</b> la ruse du sifflement est le cœur de la légende ; on apprend aux voyageurs qu'un sifflement fort et proche signifie qu'il est en réalité loin, et un sifflement à peine audible qu'il est juste derrière eux. Les chiens, dit-on, sentent la vérité avant quiconque, et se mettent à aboyer bien avant qu'on entende le moindre sifflement.|<b>物語の背景:</b> 口笛の欺きこそがこの伝説の核心である。旅人は、大きく近くに聞こえる口笛は実は遠くにいる証拠で、かすかにしか聞こえない口笛こそすぐ背後にいる証拠だと教えられる。犬は人より先にその真実を感じ取り、口笛が聞こえるよりずっと前から吠え始めるという。",
  ),
  pleased: t(
    "He sets his sack down for a moment to rest, and a few coins that were never his slip out of it. <b>{0}</b> gains <span class='money'>+{1}</span>.|Deja el saco un momento para descansar, y se le escapan unas monedas que nunca fueron suyas. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il pose son sac un instant pour se reposer, et quelques pièces qui ne lui ont jamais appartenu s'en échappent. <b>{0}</b> gagne <span class='money'>+{1}</span>.|彼はひと休みしようと袋を下ろした拍子に、もともと彼のものではなかった銭が何枚かこぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A lit cigar is left burning where he'll pass. Tobacco smoke is said to be one of the few things the Silbón won't cross, and he turns aside, drifting past <b>{0}</b> without noticing this turn.|Se deja un tabaco encendido en su camino. Se dice que el humo de tabaco es una de las pocas cosas que el Silbón no cruza, y se desvía, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On laisse un cigare allumé sur son chemin. La fumée de tabac est dite être l'une des rares choses que le Silbón ne traverse pas ; il dévie, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|彼が通る道に火のついた葉巻を置いておいた。タバコの煙はエル・シルボンがまず越えようとしない数少ないものだという。彼は道を逸れ、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/**
 * 災難7種。効果IDの割り当ては中国・韓国と同じ並び順の約束
 * (fine→percentLoss→skipTurn→loseProperties→payOthers→teleport→steal)。
 */
export const VENEZUELA_DOOM = [
  {
    id: "relampago-catatumbo",
    n: t("A Catatumbo storm blacks out the block|Una tormenta del Catatumbo apaga la cuadra|Un orage du Catatumbo plonge le quartier dans le noir|カタトゥンボの雷が街区を停電させる"),
    t: t(
      "The transformer on the corner trips the moment the first bolt cracks close enough to rattle the windows, and the whole block goes dark except for the sky itself, which keeps flashing every few seconds regardless. Neighbors drag chairs onto the sidewalk to watch the show, since there's nothing else to do until the power crew gets around to this street.|El transformador de la esquina se dispara en cuanto el primer rayo cae lo bastante cerca para sacudir las ventanas, y toda la cuadra se queda a oscuras salvo por el propio cielo, que sigue destellando cada pocos segundos de todos modos. Los vecinos sacan sillas a la acera para ver el espectáculo, porque no hay nada más que hacer hasta que la cuadrilla llegue a esta calle.|Le transformateur du coin saute dès que le premier éclair tombe assez près pour faire trembler les vitres, et tout le pâté de maisons plonge dans le noir, sauf le ciel lui-même, qui continue de clignoter toutes les quelques secondes. Les voisins sortent des chaises sur le trottoir pour regarder le spectacle, faute d'autre chose à faire avant que l'équipe technique n'arrive dans cette rue.|角の変圧器は、最初の雷が窓を揺らすほど近くに落ちた瞬間に落ちてしまい、街区はすっかり暗くなる。それでも空だけは数秒おきに光り続ける。復旧班がこの通りに来るまでほかにすることもないので、近所の人たちは歩道に椅子を持ち出してその光の見世物を眺める。",
    ),
  },
  {
    id: "derrumbe-andino",
    n: t("A landslide closes the mountain road|Un derrumbe cierra la carretera de montaña|Un glissement de terrain ferme la route de montagne|山道が地滑りで塞がれる"),
    t: t(
      "A week of steady rain loosened enough of the slope that a section of the two-lane road came down overnight, and the only way past it now is on foot along a footpath cut by whoever got there first. Buses on this route carry a machete in the luggage compartment for exactly this reason, and drivers rarely act surprised.|Una semana de lluvia constante aflojó tanto la ladera que un tramo de la carretera de dos carriles se vino abajo durante la noche, y ahora la única forma de pasar es a pie por un sendero abierto por quien llegó primero. Los autobuses de esta ruta llevan un machete en el maletero justo por esto, y los conductores rara vez se sorprenden.|Une semaine de pluie continue a suffisamment détrempé le versant pour qu'un tronçon de la route à deux voies s'effondre pendant la nuit, et le seul moyen de passer désormais est à pied, par un sentier tracé par les premiers arrivés. Les bus de cette ligne transportent une machette dans la soute justement pour cette raison, et les chauffeurs semblent rarement surpris.|一週間降り続いた雨が斜面を緩め、二車線の山道の一区間が一夜で崩れ落ちた。いま通れるのは、最初にたどり着いた誰かが切り開いた徒歩の小道だけである。この路線のバスはまさにこの事態のために荷物入れに山刀を積んでおり、運転手が驚く様子はめったにない。",
    ),
    months: [2, 3],
  },
  {
    id: "cola-de-transito",
    n: t("Stuck in a cola that isn't moving|Atrapado en una cola que no avanza|Coincé dans une cola qui n'avance pas|動かない「コラ」に巻き込まれる"),
    t: t(
      "The word cola covers any line that doesn't move, and this one stretches from a stalled truck at the bridge back past three intersections, radio traffic reports offering no better advice than to turn the engine off and wait. Drivers who know each other from waiting here before roll down windows to trade the actual reason, since the reports rarely match it.|La palabra cola cubre cualquier fila que no avanza, y esta se extiende desde un camión averiado en el puente hasta tres cruces atrás, con los partes de tráfico en la radio sin más consejo que apagar el motor y esperar. Los conductores que ya se conocen de otras esperas bajan la ventanilla para intercambiar el motivo real, porque el parte rara vez coincide.|Le mot cola désigne toute file qui n'avance pas, et celle-ci s'étire depuis un camion en panne sur le pont jusqu'à trois carrefours en arrière, les informations routières à la radio ne conseillant rien de mieux que de couper le moteur et d'attendre. Des conducteurs qui se connaissent d'autres attentes baissent leur vitre pour échanger la vraie raison, le bulletin correspondant rarement.|「コラ」という言葉は、動かない行列や渋滞を何にでも指す。今回のそれは橋の上で立ち往生したトラックから三つ先の交差点まで延び、ラジオの交通情報はエンジンを切って待つ以上の助言をくれない。ここで何度も待った顔なじみの運転手同士が窓を下ろし、放送とはたいてい違う本当の理由を教え合う。",
    ),
  },
  {
    id: "techo-inundado",
    n: t("A downpour floods a self-built roof|Un aguacero inunda un techo autoconstruido|Une averse inonde un toit autoconstruit|夕立が手作りの屋根を水浸しにする"),
    t: t(
      "The zinc sheeting on the hillside house was never meant to hold this much water at once, and a single tropical downpour finds every seam that wasn't sealed, sending a stream down the inside wall and across whatever was stored below it. Neighbours further up the same unpaved street lose the same afternoon to the same repair, since the rain never seems to fall on just one roof.|El techo de zinc de la casa en la colina nunca estuvo pensado para tanta agua de golpe, y un solo aguacero tropical encuentra cada juntura sin sellar, mandando un chorro por la pared interior y sobre lo que estuviera guardado debajo. Los vecinos calle arriba, en la misma vía sin pavimentar, pierden la misma tarde en la misma reparación, porque la lluvia nunca parece caer sobre un solo techo.|Le toit de zinc de la maison sur la colline n'a jamais été prévu pour tant d'eau d'un coup, et une seule averse tropicale trouve chaque joint mal scellé, envoyant un filet le long du mur intérieur sur tout ce qui était rangé en dessous. Les voisins plus haut dans la même rue non pavée perdent le même après-midi à la même réparation, la pluie ne semblant jamais tomber sur un seul toit à la fois.|丘の上の家のトタン屋根は、これほどの雨を一度に受け止めるようには作られていない。ひとしきりの熱帯性の夕立が塞ぎ切れていない継ぎ目を見つけ出し、内壁を伝って下に置いてあったものすべてを濡らす。同じ未舗装の坂道の上のほうに住む近所の人たちも、同じ午後を同じ修理に費やす羽目になる。雨は決して一軒の屋根だけには降らないからである。",
    ),
    months: [7, 8],
  },
  {
    id: "vaca-de-cumpleanos",
    n: t("It's your turn to cover the whole vaca|Te toca poner tú toda la vaca|C'est ton tour de payer toute la vaca|「バカ」を全部負担する番が回ってくる"),
    t: t(
      "Everyone agreed to chip in for the birthday cake and the piñata, a shared pool locals call a vaca, but three friends' contributions never showed up and the bakery wants the balance before the party starts. Being the one who organized it means being the one who covers the gap tonight and collects, maybe, whenever everyone else remembers.|Todos quedaron en poner algo para la torta y la piñata, un fondo compartido que aquí se llama vaca, pero el aporte de tres amigos nunca llegó y la pastelería quiere el resto antes de que empiece la fiesta. Ser quien lo organizó significa ser quien cubre la diferencia esta noche y cobra, quizás, cuando a los demás se les ocurra acordarse.|Tout le monde avait promis de participer au gâteau d'anniversaire et à la piñata, une cagnotte commune qu'on appelle ici une vaca, mais la part de trois amis n'est jamais arrivée et la pâtisserie veut le solde avant le début de la fête. Être celui qui a tout organisé, c'est être celui qui comble l'écart ce soir et se fait rembourser, peut-être, quand les autres y penseront.|誕生日ケーキとピニャータの費用をみんなで出し合う約束だった。地元で「バカ(牛)」と呼ばれるこの共同基金に、三人の友人の分だけがいつまでも届かない。パーティーが始まる前に菓子店は残額を求めてくる。幹事を引き受けるということは、今夜その穴を自分で埋め、いつか誰かが思い出してくれたときに返してもらう立場になるということでもある。",
    ),
  },
  {
    id: "silbon-enganio",
    n: t("Led astray by the Silbón's whistle|Un silbido de El Silbón te hace perder el camino|Un sifflement du Silbón t'égare|エル・シルボンの口笛に惑わされる"),
    t: t(
      "The whistle sounded so faint it seemed safely far off, which every Llanos grandmother would have recognized as the one sound that means the opposite, and only after an hour of walking in what turned out to be a circle does the trick become obvious. By the time the path home is found again, whatever plans the evening held have already fallen through.|El silbido sonó tan tenue que parecía a salvo, lejos, lo cual cualquier abuela llanera habría reconocido como la única señal que significa justo lo contrario, y solo tras una hora caminando en lo que resultó ser un círculo se hace evidente el engaño. Para cuando se vuelve a encontrar el camino a casa, los planes de la noche ya se han venido abajo.|Le sifflement semblait si faible qu'il paraissait sans danger, loin, ce que n'importe quelle grand-mère des Llanos aurait reconnu comme le seul signe voulant dire le contraire, et ce n'est qu'après une heure de marche en cercle que la ruse devient évidente. Le temps de retrouver le chemin du retour, les projets de la soirée sont déjà tombés à l'eau.|口笛はあまりにかすかで、遠くにいて安全だと思わせた。だがそれこそが、リャノスのどの祖母も知っている「逆の意味」を示す唯一の音だった。結局一時間も歩き回ってようやく、同じところをぐるぐる回っていたと気づき、仕掛けにはまったと分かる。ようやく帰り道を見つけたころには、その晩の予定はもう台無しになっていた。",
    ),
  },
  {
    id: "carterista-mercado",
    n: t("A pickpocket works the crowded market|Un carterista trabaja el mercado abarrotado|Un pickpocket sévit au marché bondé|混み合う市場ですりに遭う"),
    t: t(
      "A shoulder bump between two crowded stalls barely registered as anything at the time, and only at the next stall, reaching for change, does the missing weight in a pocket become obvious. The market is loud and packed enough on a Saturday that nobody nearby noticed a thing, and everyone has a story about the same trick from a different market.|Un roce de hombro entre dos puestos abarrotados apenas se notó en su momento, y solo en el siguiente puesto, al buscar el cambio, se hace evidente el peso que falta en el bolsillo. El mercado está tan ruidoso y lleno un sábado que nadie cerca notó nada, y todos tienen una historia del mismo truco en otro mercado.|Un frottement d'épaule entre deux étals bondés n'a presque rien laissé remarquer sur le moment, et ce n'est qu'à l'étal suivant, en cherchant la monnaie, que le poids manquant dans une poche devient évident. Le marché est si bruyant et bondé un samedi que personne aux alentours n'a rien vu, et chacun a une histoire du même tour dans un autre marché.|混み合う露店のあいだで肩がぶつかったが、そのときはほとんど気にも留めなかった。次の店でお釣りを探そうとして、はじめてポケットの軽さに気づく。土曜の市場はあまりに騒がしく混み合っていて、近くの誰も何にも気づかなかった。誰もが、別の市場で同じ手口に遭った話を一つは持っている。",
    ),
  },
];

/** 季節。4月始まりの12ヶ月。 */
export const VENEZUELA_SEASONS = [
  {
    e: "🕯️",
    n: t("Holy Week empties the cities for the coast|La Semana Santa vacía las ciudades hacia la costa|La Semaine sainte vide les villes vers la côte|聖週間、都市から海辺へ人が流れ出す"),
    t: t(
      "The country's biggest single travel week falls on the moon rather than the calendar, and by Holy Thursday whole apartment blocks in the capital sit empty while beach towns from Choroní to Puerto La Cruz fill past capacity. Andean towns keep a quieter version of the week, carrying carved wooden Christ figures through cobbled streets in processions some parishes have repeated for over a century.|La semana de mayor éxodo del país cae según la luna y no el calendario, y para el Jueves Santo bloques enteros de apartamentos en la capital quedan vacíos mientras los pueblos de playa, de Choroní a Puerto La Cruz, se llenan por encima de su capacidad. Los pueblos andinos guardan una versión más silenciosa de la semana, llevando tallas de Cristo en procesión por calles empedradas que algunas parroquias repiten desde hace más de un siglo.|La plus grande semaine de départs du pays tombe selon la lune et non le calendrier, et dès le Jeudi saint des immeubles entiers de la capitale se vident tandis que les villes balnéaires, de Choroní à Puerto La Cruz, se remplissent au-delà de leur capacité. Les villages andins gardent une version plus tranquille de la semaine, portant en procession des christs sculptés dans le bois par des rues pavées que certaines paroisses répètent depuis plus d'un siècle.|国内最大の移動週間は暦ではなく月の満ち欠けで決まり、聖木曜日にはカラカスのマンションの棟がまるごと空になる一方、チョロニからプエルトラクルスまでの海辺の町は収容しきれないほど人で埋まる。アンデスの町々はこの週をもっと静かに過ごし、一部の教区で一世紀以上続く行列で、木彫りのキリスト像を石畳の通りに担ぎ出す。",
    ),
    f: t(
      "Because the date is set by the first full moon after the spring equinox, Holy Week can land anywhere across a five-week window, and hotel and bus prices along the coast are set well in advance of knowing exactly which week that will be.|Como la fecha se fija por la primera luna llena tras el equinoccio de primavera, la Semana Santa puede caer en cualquier punto de una ventana de cinco semanas, y los precios de hoteles y autobuses en la costa se fijan con antelación sin saber aún en cuál semana caerá exactamente.|La date étant fixée par la première pleine lune suivant l'équinoxe de printemps, la Semaine sainte peut tomber n'importe où dans une fenêtre de cinq semaines, et les prix des hôtels et des bus sur la côte sont fixés bien avant de savoir laquelle ce sera exactement.|春分後最初の満月で日付が決まるため、聖週間は5週間ほどの幅のどこにでも来うる。海岸沿いのホテルやバスの値段は、実際にどの週になるか分かるよりずっと前から決められている。",
    ),
  },
  {
    e: "🌼",
    n: t("The May Cross keeps a vigil with song|La Cruz de Mayo vela con canto|La Croix de mai veille en chantant|花で飾った五月の十字架を歌で守る"),
    t: t(
      "Households along the coast dress a wooden cross in flowers and paper streamers and sit up through the night around it, trading improvised décima verses back and forth over cuatro and maracas until whoever runs out of rhymes first has to concede. The custom blends a Catholic feast with older harvest and fertility rites brought by enslaved Africans, and no two neighbourhoods sing quite the same tune.|Los hogares de la costa visten una cruz de madera con flores y serpentinas de papel y velan toda la noche a su alrededor, intercambiando décimas improvisadas al son del cuatro y las maracas hasta que a alguien se le acaban las rimas primero. La costumbre mezcla una fiesta católica con ritos de cosecha y fertilidad más antiguos traídos por africanos esclavizados, y no hay dos barrios que canten exactamente la misma tonada.|Les foyers de la côte parent une croix de bois de fleurs et de serpentins en papier et veillent toute la nuit autour d'elle, échangeant des décimas improvisées au son du cuatro et des maracas jusqu'à ce que l'un des deux manque de rimes le premier. La coutume mêle une fête catholique à des rites de récolte et de fertilité plus anciens apportés par des Africains réduits en esclavage, et deux quartiers ne chantent jamais tout à fait le même air.|海沿いの家々は木の十字架を花と紙の飾りで彩り、一晩じゅうその周りで起きて過ごす。クアトロとマラカスに合わせて即興のデシマ(十行詩)を交わし合い、先に韻が尽きたほうが負けとなる。この習わしはカトリックの祝祭と、奴隷にされたアフリカ人が持ち込んだより古い収穫・豊穣の儀礼が混じり合ったもので、まったく同じ節で歌う地区は二つとない。",
    ),
    f: t(
      "The décima verse form itself — ten lines of eight syllables each, with a fixed rhyme scheme — arrived from Spain but took root most firmly in exactly the places where the May Cross is kept, so the two traditions are now taught almost as a single subject by older singers to younger ones.|La propia forma de la décima —diez versos de ocho sílabas cada uno, con rima fija— llegó de España, pero arraigó con más fuerza justo en los lugares donde se vela la Cruz de Mayo, así que hoy los cantores mayores enseñan ambas tradiciones casi como una sola materia a los más jóvenes.|La forme même de la décima — dix vers de huit syllabes chacun, à rime fixe — vint d'Espagne, mais s'enracina le plus fermement justement là où l'on veille la Croix de mai, si bien que les deux traditions sont aujourd'hui enseignées presque comme une seule matière par les chanteurs aînés aux plus jeunes.|デシマという詩形――一行八音節、十行、決まった韻を踏む――はスペインから伝わったが、まさに五月の十字架を守る土地でこそ最も深く根付いた。いまでは年配の歌い手が若い世代に、この二つの伝統をほとんど一つの技として教えている。",
    ),
  },
  {
    e: "🥁",
    n: t("Drums and a battle share the same date|Tambores y una batalla comparten la fecha|Des tambours et une bataille partagent la date|太鼓と戦いが同じ日を分け合う"),
    t: t(
      "June 24 does double duty on the calendar: Barlovento's drummers open the feast of Saint John with the all-night tradition kept since colonial times, while soldiers in period uniform reenact the Battle of Carabobo on the plain outside Valencia the same morning. Neither event defers to the other, so families along the coast often celebrate one before dawn and watch the other by midday.|El 24 de junio hace doble jornada en el calendario: los tamboreros de Barlovento abren la fiesta de San Juan con la tradición de toda la noche que se guarda desde tiempos coloniales, mientras que soldados de época reconstituyen la Batalla de Carabobo en la llanura afueras de Valencia esa misma mañana. Ningún evento cede ante el otro, así que las familias de la costa suelen celebrar uno antes del amanecer y ver el otro hacia el mediodía.|Le 24 juin fait double emploi dans le calendrier : les tambourineurs de Barlovento ouvrent la fête de la Saint-Jean par la tradition de toute la nuit gardée depuis l'époque coloniale, tandis que des soldats en uniforme d'époque rejouent la bataille de Carabobo dans la plaine aux portes de Valencia ce même matin. Aucun des deux événements ne cède le pas à l'autre, si bien que les familles de la côte célèbrent souvent l'un avant l'aube et regardent l'autre vers midi.|6月24日は暦の上で二役をこなす。バルロベントの太鼓打ちたちは植民地時代から続く一晩じゅうの伝統で聖ヨハネの祝いを開き、同じ朝、当時の軍装をまとった兵士たちがヴァレンシア郊外の平原でカラボボの戦いを再現する。どちらも譲らないので、海沿いの家族は夜明け前に一方を祝い、正午までにもう一方を見物することも多い。",
    ),
    f: t(
      "Barlovento's drum styles are grouped into named families with their own rhythm and function — the mina, the culo e' puya, the redondo — and a skilled player is expected to know which one a given moment of the night calls for, since playing the wrong drum at the wrong hour is considered a real mistake, not a small one.|Los estilos de tambor de Barlovento se agrupan en familias con nombre propio, ritmo y función —la mina, el culo e' puya, el redondo— y se espera que un tamborero hábil sepa cuál corresponde a cada momento de la noche, pues tocar el tambor equivocado a la hora equivocada se considera un error de verdad, no uno pequeño.|Les styles de tambour de Barlovento se regroupent en familles nommées, avec leur propre rythme et leur fonction — la mina, le culo e' puya, le redondo — et un joueur habile est censé savoir lequel convient à tel moment de la nuit, car jouer le mauvais tambour à la mauvaise heure est considéré comme une vraie erreur, non une broutille.|バルロベントの太鼓の型は、それぞれ名を持つリズムと役割の一族に分けられる――ミナ、クロ・エ・プジャ、レドンドなど。腕のある奏者は夜のどの瞬間にどの太鼓がふさわしいか心得ているべきとされ、時ならぬ太鼓を叩くのは小さな失敗ではなく本当の間違いとみなされる。",
    ),
  },
  {
    e: "🎆",
    n: t("Two dates that measure the same freedom|Dos fechas que miden la misma libertad|Deux dates qui mesurent la même liberté|同じ自由を測る二つの日付"),
    t: t(
      "Independence Day on July 5 opens the month, and Simón Bolívar's birthday on July 24 closes it, so flags stay up on balconies for most of four weeks rather than coming down after a single holiday. Schools that have been out since early July use the stretch for civics pageants built around Bolívar's letters and speeches, memorised by children too young to fully parse them.|El Día de la Independencia, el 5 de julio, abre el mes, y el cumpleaños de Simón Bolívar, el 24 de julio, lo cierra, así que las banderas permanecen en los balcones casi cuatro semanas seguidas en vez de bajarse tras un solo feriado. Las escuelas, de vacaciones desde principios de julio, usan ese tramo para actos cívicos basados en cartas y discursos de Bolívar, memorizados por niños aún demasiado pequeños para entenderlos del todo.|Le jour de l'Indépendance, le 5 juillet, ouvre le mois, et l'anniversaire de Simón Bolívar, le 24 juillet, le referme, si bien que les drapeaux restent aux balcons presque quatre semaines d'affilée plutôt que d'être redescendus après un seul jour férié. Les écoles, en vacances depuis début juillet, profitent de cette période pour des spectacles civiques bâtis sur les lettres et discours de Bolívar, mémorisés par des enfants encore trop jeunes pour les comprendre pleinement.|7月5日の独立記念日でこの月は幕を開け、7月24日のシモン・ボリバルの誕生日で幕を閉じる。バルコニーの国旗は一つの祝日で下ろされるのではなく、ほぼ4週間掲げられたままになる。7月初めから休みに入った学校は、この期間を使ってボリバルの手紙や演説をもとにした学芸会を開く。まだ十分に意味を汲み取れない年頃の子どもたちがそれを暗唱する。",
    ),
    f: t(
      "Bolívar is formally titled El Libertador in Venezuela, and the honorific is used seriously enough that referring to him by name alone in a formal speech can read as oddly plain, the way omitting a president's title might elsewhere.|A Bolívar se le da formalmente el título de El Libertador en Venezuela, y el honorífico se usa con tal seriedad que nombrarlo solo por su nombre en un discurso formal puede sonar extrañamente escueto, como omitir el título de un presidente en otros países.|Bolívar porte formellement le titre d'El Libertador au Venezuela, et l'honorifique est employé avec assez de sérieux pour que le nommer par son seul nom dans un discours officiel puisse sembler étrangement sec, comme si l'on omettait le titre d'un président ailleurs.|ベネズエラでボリバルは正式に「エル・リベルタドール(解放者)」と呼ばれ、この敬称はきわめて真剣に使われるため、公式の演説で名前だけを呼ぶと、他の国で大統領の肩書きを省くのと同じくらい妙にそっけなく響く。",
    ),
  },
  {
    e: "💧",
    n: t("The world's tallest waterfall runs full|La catarata más alta del mundo corre a tope|La plus haute chute du monde coule à plein débit|世界最高の滝が水量を増す"),
    t: t(
      "Angel Falls carries far more water in the wet season than the dry, and by August the thin ribbon that can nearly vanish in an April drought becomes a continuous white column visible from well before the canoe reaches the base of Auyantepui. Tour operators quietly discourage visits in the driest months for exactly this reason, without always saying so outright.|El Salto Ángel lleva mucha más agua en temporada de lluvias que en la seca, y para agosto la delgada cinta que casi puede desaparecer en la sequía de abril se convierte en una columna blanca continua, visible mucho antes de que la canoa llegue al pie del Auyantepui. Los operadores turísticos desalientan discretamente las visitas en los meses más secos justo por esto, sin siempre decirlo abiertamente.|Le Salto Ángel charrie bien plus d'eau en saison des pluies qu'en saison sèche, et dès août, le mince ruban qui peut presque disparaître lors de la sécheresse d'avril devient une colonne blanche continue, visible bien avant que le canoë n'atteigne le pied de l'Auyantepui. Les tour-opérateurs découragent discrètement les visites durant les mois les plus secs, justement pour cette raison, sans toujours le dire ouvertement.|エンジェル・フォールは乾季より雨季にはるかに多くの水を運び、8月には4月の渇水期にはほとんど消えかねない細いリボンが、カヌーがアウヤン・テプイの麓に着くよりずっと前から見える途切れない白い柱に変わる。旅行会社はまさにこの理由で、いちばん乾いた月の訪問をそれとなく勧めない。はっきり口にしないことも多いが。",
    ),
    f: t(
      "The 979-metre drop is officially measured as 807 metres of uninterrupted freefall plus a further cascade below, a distinction that matters because a handful of other waterfalls claim a greater total height by counting steep rapids that never truly leave the rock.|La caída de 979 metros se mide oficialmente como 807 metros de caída libre ininterrumpida más una cascada adicional debajo, una distinción que importa porque un puñado de otras cataratas reclama mayor altura total contando rápidos empinados que nunca llegan a separarse de la roca.|La chute de 979 mètres se mesure officiellement comme 807 mètres de chute libre ininterrompue suivis d'une cascade supplémentaire en contrebas, une distinction qui compte car une poignée d'autres chutes revendiquent une hauteur totale supérieure en comptant des rapides abrupts qui ne quittent jamais vraiment la roche.|979メートルの落差は、公式には807メートルの途切れない自由落下と、その下に続く滝の部分に分けて測られる。この区別には意味があり、ほかのいくつかの滝は岩肌を離れない急流部分まで含めて総落差を主張し、より高いと称することがあるからである。",
    ),
  },
  {
    e: "🌀",
    n: t("A hurricane season that mostly stays offshore|Una temporada de huracanes que se queda mar afuera|Une saison des ouragans qui reste surtout au large|沖合を通り過ぎる台風シーズン"),
    t: t(
      "The Caribbean hurricane season peaks around now, but Venezuela's coast sits far enough south, close to the equator, that storms rarely curve down to make landfall the way they do across the islands to the north, and news of a hurricane here usually means watching someone else's forecast. The one major exception, Hurricane Bret in 1993, is still the storm older fishermen bring up first.|La temporada de huracanes del Caribe llega a su punto álgido por estas fechas, pero la costa venezolana queda lo bastante al sur, cerca del ecuador, para que las tormentas rara vez giren hacia el sur y toquen tierra como en las islas del norte, y aquí una noticia de huracán suele significar seguir el pronóstico de otro país. La única excepción mayor, el huracán Bret de 1993, sigue siendo la tormenta que los pescadores más veteranos mencionan primero.|La saison des ouragans des Caraïbes atteint son pic vers cette période, mais la côte vénézuélienne se trouve assez au sud, près de l'équateur, pour que les tempêtes s'y incurvent rarement jusqu'à toucher terre comme sur les îles plus au nord, et une nouvelle d'ouragan ici signifie généralement suivre les prévisions d'un autre pays. La seule exception majeure, l'ouragan Bret en 1993, reste la tempête que les pêcheurs les plus âgés citent en premier.|カリブ海の台風シーズンはこの時期に山場を迎えるが、ベネズエラの海岸は赤道に近い南寄りに位置するため、北側の島々のように嵐が湾曲して上陸することはめったになく、この国で「台風」のニュースといえばたいてい他国の予報を見守ることを意味する。唯一の大きな例外、1993年のハリケーン・ブレットは、いまも年配の漁師がまっさきに口にする嵐である。",
    ),
    f: t(
      "Low latitude alone doesn't fully explain the near miss — meteorologists also credit the Coriolis effect being too weak this close to the equator to spin a tropical depression into a full hurricane before it drifts past, which is why storms typically strengthen only once they've cleared the Venezuelan coast.|La baja latitud por sí sola no explica del todo el respiro: los meteorólogos también lo atribuyen a que el efecto Coriolis es demasiado débil tan cerca del ecuador para convertir una depresión tropical en huracán completo antes de que pase de largo, por lo que las tormentas suelen intensificarse solo una vez que han dejado atrás la costa venezolana.|La faible latitude n'explique pas tout à elle seule : les météorologues l'attribuent aussi à un effet Coriolis trop faible si près de l'équateur pour transformer une dépression tropicale en ouragan complet avant qu'elle ne dérive plus loin, ce qui explique que les tempêtes ne se renforcent généralement qu'une fois passé la côte vénézuélienne.|緯度の低さだけでは説明しきれず、気象学者は赤道に近すぎてコリオリ力が弱く、熱帯低気圧が通り過ぎる前に本格的な台風へ発達しきれないことも一因に挙げる。だからこそ嵐は通常、ベネズエラの海岸を過ぎてから初めて勢力を強める。",
    ),
  },
  {
    e: "🌊",
    n: t("The plains flood and the cattle move to higher ground|Los llanos se inundan y el ganado sube a tierras altas|Les plaines s'inondent et le bétail gagne les hauteurs|平原が水に沈み、牛は高地へ移る"),
    t: t(
      "The rainy season turns much of the flat Llanos into a shallow, temporary lake that can stay standing for weeks, and ranch hands spend these weeks moving cattle herds to the scattered high ground called mesas before the water reaches the pens. The same floods that complicate ranching refill the wetlands that make the plains one of the richest places on the continent to see wildlife once the water recedes.|La temporada de lluvias convierte buena parte del llano plano en un lago somero y temporal que puede quedarse semanas, y los peones dedican esas semanas a trasladar el ganado a las lomas dispersas llamadas mesas antes de que el agua llegue a los corrales. Las mismas crecidas que complican la ganadería rellenan los humedales que hacen del llano uno de los lugares más ricos del continente para ver fauna una vez que baja el agua.|La saison des pluies transforme une bonne partie des plaines en un lac peu profond et temporaire qui peut durer des semaines, et les gardiens de troupeaux passent ces semaines à déplacer le bétail vers les hauteurs éparses appelées mesas avant que l'eau n'atteigne les enclos. Les mêmes crues qui compliquent l'élevage remplissent les zones humides qui font des llanos l'un des endroits les plus riches du continent pour observer la faune une fois l'eau retirée.|雨季になると平坦なラノスの多くが浅く一時的な湖と化し、それが何週間も残ることがある。牧童たちはこの数週間、水が畜舎に届く前に、点在する高台「メサ」へ牛の群れを移す仕事に費やす。牧畜を難しくするのと同じこの増水が、水が引いたあとの平原を大陸屈指の野生動物観察地に変える湿地を満たしてもいる。",
    ),
    f: t(
      "Capybaras, the world's largest rodent, gather in some of their densest known concentrations on these drying mesas as the floodwaters recede, which is also roughly why the Llanos supplies most of the country's capybara meat eaten, by special church dispensation, during Lent.|Los chigüires, el roedor más grande del mundo, se reúnen en algunas de sus concentraciones más densas conocidas en estas mesas al secarse, tras la crecida, lo cual explica también, más o menos, por qué el llano aporta la mayor parte de la carne de chigüire que se come, con dispensa eclesiástica especial, en Cuaresma.|Les capybaras, le plus grand rongeur du monde, se rassemblent dans certaines de leurs concentrations connues les plus denses sur ces mesas qui s'assèchent après la crue, ce qui explique aussi à peu près pourquoi les llanos fournissent l'essentiel de la viande de capybara consommée, avec une dispense ecclésiastique spéciale, pendant le Carême.|世界最大のげっ歯類カピバラは、増水が引いて乾き始めるこれらのメサに、知られている中でも指折りの密度で群れる。ラノスが、教会の特別な許しのもとで四旬節に食べられるカピバラ肉の大半を供給しているのも、おおむね同じ理由による。",
    ),
  },
  {
    e: "🎶",
    n: t("Maracaibo's gaita season opens with its patron saint|La temporada de gaita de Maracaibo abre con su santa patrona|La saison de gaita de Maracaibo s'ouvre avec sa sainte patronne|マラカイボのガイタの季節が守護聖人とともに始まる"),
    t: t(
      "The Feria de la Chinita opens in mid-November around the image of the Virgin of Chiquinquirá, said to have appeared on a wooden board fished out of the lake, and the ten days of bullfights, parades and concerts also mark the unofficial start of gaita zuliana season nationwide. Furniture stores start playing gaita over their speakers on cue, weeks before anyone else officially declares the season open.|La Feria de la Chinita abre a mediados de noviembre en torno a la imagen de la Virgen de Chiquinquirá, que se dice apareció en una tabla de madera sacada del lago, y los diez días de corridas, desfiles y conciertos marcan también el arranque no oficial de la temporada de gaita zuliana en todo el país. Las mueblerías empiezan a poner gaita por sus altavoces como señal, semanas antes de que nadie declare oficialmente abierta la temporada.|La Feria de la Chinita ouvre à la mi-novembre autour de l'image de la Vierge de Chiquinquirá, censée être apparue sur une planche de bois repêchée dans le lac, et les dix jours de corridas, défilés et concerts marquent aussi le début officieux de la saison de gaita zuliana dans tout le pays. Les magasins de meubles se mettent à passer de la gaita dans leurs haut-parleurs comme signal, des semaines avant que quiconque ne déclare officiellement la saison ouverte.|11月半ば、湖から拾い上げられた木の板に現れたと伝わるチキンキラの聖母の像を中心に、フェリア・デ・ラ・チニタが開く。十日間の闘牛やパレード、コンサートは、全国的なガイタ・スリアーナの季節の非公式な幕開けでもある。家具店は誰かが正式に季節の開始を宣言するより何週間も早く、店先のスピーカーからガイタを流し始める。",
    ),
    f: t(
      "Gaita zuliana is built around the furruco, a friction drum played by rubbing a wet hand along a stick through its skin to produce a low groaning note, an instrument distinctive enough that a song is barely recognisable as gaita to Venezuelan ears without it.|La gaita zuliana se construye en torno al furruco, un tambor de fricción que se toca frotando una mano mojada por un palo que atraviesa el parche para producir una nota grave y gemebunda, un instrumento tan característico que, sin él, una canción apenas se reconoce como gaita para el oído venezolano.|La gaita zuliana se construit autour du furruco, un tambour à friction que l'on joue en frottant une main mouillée le long d'un bâton traversant sa peau pour produire une note grave et geignarde, un instrument si caractéristique qu'une chanson est à peine reconnaissable comme gaita à l'oreille vénézuélienne sans lui.|ガイタ・スリアーナはフルコという摩擦太鼓を軸にした音楽で、皮を貫く棒を濡れた手でこすって低くうめくような音を出す。あまりに特徴的な楽器なので、これが無ければベネズエラ人の耳にはガイタとほとんど聞こえない。",
    ),
  },
  {
    e: "🎄",
    n: t("Gaita takes over the radio for Christmas|La gaita toma la radio en Navidad|La gaita envahit les ondes pour Noël|クリスマスにガイタがラジオを占拠する"),
    t: t(
      "For four weeks, stations across the country that play almost nothing but gaita zuliana turn what began as a regional folk style into the default sound of the whole country's Christmas, alongside the roasted-pork-and-cornmeal dish families spend the twenty-fourth folding by hand into plantain leaves. Kitchens across every region smell the same that week regardless of what plays on the radio.|Durante cuatro semanas, emisoras de todo el país que ponen casi solo gaita zuliana convierten lo que empezó como un estilo folclórico regional en el sonido navideño por defecto de todo el país, junto al plato de cerdo asado y masa de maíz que las familias pasan el veinticuatro doblando a mano en hojas de plátano. Las cocinas de todas las regiones huelen igual esa semana, sin importar qué suene en la radio.|Pendant quatre semaines, des radios de tout le pays qui ne diffusent presque que de la gaita zuliana transforment ce qui n'était qu'un style folklorique régional en le son de Noël par défaut de tout le pays, aux côtés du plat de porc rôti et de pâte de maïs que les familles passent le vingt-quatre à envelopper à la main dans des feuilles de bananier. Les cuisines de toutes les régions sentent la même chose cette semaine-là, quoi que joue la radio.|4週間のあいだ、国じゅうの放送局がほとんどガイタ・スリアーナばかりを流し、もともと地方の民俗音楽だったものを国全体のクリスマスの定番音楽に変えてしまう。家族は24日、豚肉とトウモロコシ生地の料理を、手でバナナの葉に包んで作る。その週はどの地域の台所も同じ匂いがする。ラジオから何が流れていようと関係ない。",
    ),
    f: t(
      "The dish, hallaca, differs enough from household to household that a family recipe is treated as something close to an heirloom, and disputes over the correct proportion of raisins to olives in the filling are conducted, mostly, with good humour.|El plato, la hallaca, difiere tanto de una casa a otra que la receta familiar se trata casi como una reliquia, y las disputas sobre la proporción correcta de pasas y aceitunas en el relleno se llevan, en su mayoría, con buen humor.|Le plat, la hallaca, diffère assez d'un foyer à l'autre pour que la recette familiale soit traitée presque comme un bien de famille, et les disputes sur la juste proportion de raisins secs et d'olives dans la farce se règlent, la plupart du temps, dans la bonne humeur.|アジャカという料理は家庭ごとにかなり異なり、家族のレシピはほとんど家宝のように扱われる。詰め物のレーズンとオリーブの正しい割合をめぐる議論は、たいてい和やかに交わされる。",
    ),
  },
  {
    e: "👶",
    n: t("The Andes hold a mock search for a missing Christ child|Los Andes celebran una búsqueda fingida del Niño perdido|Les Andes tiennent une fausse recherche de l'Enfant Jésus perdu|アンデスは「迷子の幼子」を探す茶番を演じる"),
    t: t(
      "Andean households quietly move the baby Jesus figure out of its nativity scene sometime after Christmas, and neighbours gather to stage a mock search, complete with lanterns and a procession, before \"finding\" the figure and standing it back up — paradura literally means \"the standing up\". Whoever is chosen as godparent for the ritual is expected to host the party that follows, which can outlast the search itself by hours.|Los hogares andinos sacan discretamente al Niño Jesús del pesebre después de Navidad, y los vecinos se reúnen a montar una búsqueda fingida, con faroles y procesión incluidos, antes de \"encontrar\" la figura y ponerla de pie de nuevo —paradura significa literalmente \"la parada\"—. A quien elijan como padrino del ritual le toca luego ofrecer la fiesta, que puede durar más horas que la búsqueda misma.|Les foyers andins retirent discrètement la figurine de l'Enfant Jésus de la crèche après Noël, et les voisins se réunissent pour organiser une fausse recherche, lanternes et procession à l'appui, avant de \"retrouver\" la figurine et de la remettre debout — paradura signifie littéralement \"la mise debout\". Celui ou celle choisi comme parrain du rituel est censé offrir ensuite la fête, qui peut durer plus longtemps que la recherche elle-même.|アンデスの家庭はクリスマスのあと、こっそり馬小屋の飾りから幼子イエスの人形を取り出す。近所の人々は提灯を手に行列を組んで「捜索」の芝居を演じ、やがて人形を「見つけ」て立たせる――パラドゥーラとは文字どおり「立たせること」を意味する。この儀式の名付け親に選ばれた者は、そのあと宴を開く役目を負う。宴は捜索そのものより何時間も長引くこともある。",
    ),
    f: t(
      "The custom is dated to the eighteenth or nineteenth century and is thought to have spread through the Andes from a single valley, though which one exactly is disputed between towns that each claim to have started it first.|La costumbre se remonta al siglo XVIII o XIX y se cree que se extendió por los Andes desde un solo valle, aunque cuál exactamente se discute entre pueblos que se disputan haber sido los primeros.|La coutume remonte au XVIIIe ou au XIXe siècle et se serait répandue dans les Andes depuis une seule vallée, bien que laquelle exactement soit disputée entre des villages qui revendiquent chacun d'en être à l'origine.|この習わしは18世紀か19世紀に遡るとされ、アンデスのある一つの谷から広まったと考えられているが、それがどの谷なのかは、自分たちが元祖だと主張する町どうしのあいだで意見が分かれている。",
    ),
  },
  {
    e: "🎭",
    n: t("Carnival empties offices and fills the coast roads|El carnaval vacía las oficinas y llena las carreteras de la costa|Le carnaval vide les bureaux et remplit les routes côtières|カーニバルがオフィスを空にし、海岸の道を埋める"),
    t: t(
      "Carnival's four days are fixed to the same lunar calendar as Holy Week, forty-odd days ahead of it, and the country effectively shuts down offices while carnival towns from El Callao to Carúpano run parades that have continued almost every year since the nineteenth century. Families without a hometown carnival to attend often just aim for whichever coast road has the shortest traffic that year.|Los cuatro días de carnaval se fijan por el mismo calendario lunar que la Semana Santa, unos cuarenta y tantos días antes, y el país prácticamente cierra sus oficinas mientras los pueblos carnavaleros, de El Callao a Carúpano, sacan desfiles que han seguido casi todos los años desde el siglo XIX. Las familias sin un carnaval de pueblo al que ir suelen apuntar sin más a la carretera costera con menos cola ese año.|Les quatre jours de carnaval suivent le même calendrier lunaire que la Semaine sainte, une quarantaine de jours avant elle, et le pays ferme pratiquement ses bureaux tandis que les villes carnavalesques, d'El Callao à Carúpano, organisent des défilés qui se poursuivent presque chaque année depuis le XIXe siècle. Les familles sans carnaval de village où se rendre visent souvent simplement la route côtière la moins embouteillée cette année-là.|カーニバルの四日間は聖週間と同じ月の暦で決まり、その40日ほど前にあたる。国じゅうのオフィスが事実上休みになり、エルカジャオからカルパノまでのカーニバルの町々では、19世紀からほぼ毎年続くパレードが繰り広げられる。地元にカーニバルの伝統がない家族は、たいていその年いちばん渋滞の短そうな海岸道路を目指すだけになる。",
    ),
    f: t(
      "Because the date shifts with Easter, a particularly late Carnival can land in early March instead of February, which is treated less as a scheduling quirk than as one more reason the coast roads that week are worth checking a forecast for.|Como la fecha se desplaza con la Pascua, un carnaval especialmente tardío puede caer a principios de marzo en vez de febrero, lo cual se trata menos como una rareza de calendario que como una razón más para consultar el pronóstico de esas carreteras esa semana.|La date se déplaçant avec Pâques, un carnaval particulièrement tardif peut tomber début mars plutôt qu'en février, ce qui est perçu moins comme une bizarrerie de calendrier que comme une raison de plus de consulter les prévisions pour ces routes-là cette semaine-là.|日付は復活祭とともに動くため、特に遅い年のカーニバルは2月ではなく3月初めに来ることもある。これは暦の奇妙さというより、その週の海岸道路の予報を確かめる理由がもう一つ増えるだけの話として受け止められている。",
    ),
  },
  {
    e: "🏝️",
    n: t("The dry season sends everyone to the reefs|La temporada seca manda a todos a los arrecifes|La saison sèche envoie tout le monde vers les récifs|乾季、誰もがサンゴ礁へ向かう"),
    t: t(
      "The last weeks before the rains return are the driest and clearest of the year, and the coral archipelago of Los Roques fills with visitors chasing water so transparent that boats appear to float on nothing at all from the air. University students finishing exams this month treat the timing as no coincidence, even though the reef has been running on the same dry-season clock regardless of anyone's schedule.|Las últimas semanas antes de que vuelvan las lluvias son las más secas y despejadas del año, y el archipiélago coralino de Los Roques se llena de visitantes que persiguen un agua tan transparente que, desde el aire, los botes parecen flotar sobre la nada. Los estudiantes que terminan exámenes este mes no lo ven como coincidencia, aunque el arrecife lleva su propio reloj de temporada seca sin importarle el calendario de nadie.|Les dernières semaines avant le retour des pluies sont les plus sèches et les plus limpides de l'année, et l'archipel corallien de Los Roques se remplit de visiteurs en quête d'une eau si transparente que, vus du ciel, les bateaux semblent flotter sur rien du tout. Les étudiants qui terminent leurs examens ce mois-ci n'y voient pas une coïncidence, bien que le récif suive son propre calendrier de saison sèche, indifférent à celui de quiconque.|雨が戻る前の最後の数週間は一年でいちばん乾いて澄んでおり、ロス・ロケスのサンゴ礁の群島は、上空から見ると舟が何もない上に浮いているように見えるほど透明な水を求める旅行者で埋まる。この月に試験を終える大学生たちはこの巡り合わせをただの偶然とは思わないが、サンゴ礁のほうは誰の予定にもお構いなく、乾季という自分の時計で動いているだけである。",
    ),
    f: t(
      "Los Roques was declared a national park in 1972 specifically to keep the reef free of the resort development that reshaped much of the Caribbean, so the only way to stay overnight on most of its 300-odd islets is a small posada run by an actual resident rather than a chain hotel.|Los Roques se declaró parque nacional en 1972 justamente para mantener el arrecife libre del desarrollo turístico que transformó buena parte del Caribe, así que la única forma de pasar la noche en la mayoría de sus más de 300 islotes es una pequeña posada llevada por un residente real, no una cadena hotelera.|Los Roques fut déclaré parc national en 1972 précisément pour préserver le récif du développement hôtelier qui a transformé une bonne partie des Caraïbes, si bien que la seule façon d'y passer la nuit, sur la plupart de ses quelque 300 îlots, est une petite posada tenue par un habitant, et non une chaîne hôtelière.|ロス・ロケスは1972年、カリブ海の多くを作り変えたリゾート開発からサンゴ礁を守るためにこそ国立公園に指定された。300ほどある島々のほとんどで一晩過ごす方法は、チェーンホテルではなく実際にそこに住む人が営む小さな宿だけである。",
    ),
  },
];
