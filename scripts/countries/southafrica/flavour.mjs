/**
 * 南アフリカの国情報・地方区分・アイテム・厄災の霊・季節。
 *
 * 季節は他の国盤面と同じく4月始まりの12ヶ月で配列を組むが、
 * **南半球なので実際の季節は北半球と逆**(4月は秋、12月は真夏)。
 * ここでは暦の並びを合わせつつ、中身は南アフリカの実際の季節・祝日に
 * 揃えてある。祝日はどれもこの国の歴史と結びついた具体的な日付を持つ。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const SOUTHAFRICA_META = {
  id: "southafrica",
  name: t("South Africa|Sudáfrica|Afrique du Sud|南アフリカ"),
  blurb: t(
    "A country where the railway carried people to work, but the law decided where they could live|Un país donde el ferrocarril llevaba a la gente al trabajo, pero la ley decidía dónde podían vivir|Un pays où le chemin de fer menait les gens au travail, mais où la loi décidait où ils pouvaient vivre|鉄道が働く場所へ運んでも、住める場所は法律が決めていた国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が持つ(未登録・取りまとめ側)。
  // 1ドル≒150円/1ドル≒18.5ランドの目安から1ランド≒8.1円、12,000,000÷8.1÷1200≒1235 → 1200。
  cur: { pre: "R", post: "", mul: 1200 },
  start: "johannesburg",
  cpuNames: ["Thandiwe", "Sipho", "Anneke", "Given"],
  // 南アフリカ国旗の黒・金・緑・赤(チリレッド)・青。
  stripe: ["#000000", "#ffb612", "#007a4d", "#de3831", "#001489"],
};

/** 実際の9州。 */
export const SOUTHAFRICA_REGIONS = {
  gt: t("Gauteng|Gauteng|Gauteng|ハウテン"),
  wc: t("Western Cape|Cabo Occidental|Cap-Occidental|西ケープ"),
  kzn: t("KwaZulu-Natal|KwaZulu-Natal|KwaZulu-Natal|クワズール・ナタール"),
  ec: t("Eastern Cape|Cabo Oriental|Cap-Oriental|東ケープ"),
  fs: t("Free State|Estado Libre|État libre|自由州"),
  nw: t("North West|Noroeste|Nord-Ouest|北西州"),
  mp: t("Mpumalanga|Mpumalanga|Mpumalanga|ムプマランガ"),
  lp: t("Limpopo|Limpopo|Limpopo|リンポポ"),
  nc: t("Northern Cape|Cabo Septentrional|Cap-Nord|北ケープ"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts` — 未登録)。
 * 向きの選べない移動アイテム(coalwagon)は、行き先を選べるアイテム
 * (transkaroo)より安く設定してある。
 */
export const SOUTHAFRICA_ITEMS = {
  coalwagon: {
    e: "🚂",
    price: 240,
    kind: "move",
    n: t("A Ride on a Coal Wagon|Un viaje en un vagón de carbón|Un trajet dans un wagon de charbon|石炭貨車への便乗"),
    d: t(
      "Carried 8–12 squares. The freight schedule picks where you get off.|Te lleva de 8 a 12 casillas. El horario de carga elige dónde bajas.|Emporté de 8 à 12 cases. L'horaire du fret choisit où tu descends.|8〜12マス運ばれる。どこで降ろされるかは貨物の都合しだい。",
    ),
    f: t(
      "Coal trains running from Mpumalanga's mines to the Richards Bay terminal are among the heaviest and longest in the Southern Hemisphere, and yard workers have long turned a blind eye to someone riding an empty wagon back toward the coalfields rather than paying for a passenger seat that barely exists on that line.|Los trenes de carbón que van de las minas de Mpumalanga a la terminal de Richards Bay están entre los más pesados y largos del hemisferio sur, y los trabajadores del patio llevan tiempo haciendo la vista gorda ante quien viaja en un vagón vacío de vuelta hacia el yacimiento en vez de pagar un asiento de pasajero que en esa línea casi no existe.|Les trains de charbon reliant les mines du Mpumalanga au terminal de Richards Bay comptent parmi les plus lourds et les plus longs de l'hémisphère sud, et les cheminots ferment depuis longtemps les yeux sur quiconque voyage dans un wagon vide en direction du bassin houiller plutôt que de payer une place de passager qui, sur cette ligne, existe à peine.|ムプマランガ州の炭鉱からリチャーズベイのターミナルへ向かう石炭列車は、南半球でも屈指の重さと長さを誇る。この路線には旅客席などほぼ存在しないので、構内の作業員は空の貨車に乗って炭田へ戻る者を長らく見て見ぬふりをしてきた。",
    ),
  },
  transkaroo: {
    e: "🗺️",
    price: 380,
    kind: "pre",
    n: t("The Trans Karoo Timetable|El horario del Trans Karoo|L'horaire du Trans Karoo|トランス・カルーの時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Trans Karoo Express once ran the roughly 1,600 km between Cape Town and Johannesburg on a schedule so fixed that farmers along the semi-desert route reportedly set their watches by its whistle rather than a radio signal, since the train passed the same lonely siding at the same minute for decades.|El Trans Karoo Express recorría antaño los cerca de 1.600 km entre Ciudad del Cabo y Johannesburgo con un horario tan fijo que, según se dice, los granjeros de la ruta semidesértica ponían en hora sus relojes por su silbato antes que por la radio.|Le Trans Karoo Express parcourait autrefois les quelque 1 600 km entre Le Cap et Johannesburg selon un horaire si immuable que les fermiers de cette route semi-désertique auraient réglé leur montre sur son sifflet plutôt que sur la radio.|かつてトランス・カルー急行はケープタウンとヨハネスブルグの間およそ1600kmを、あまりに正確な時刻表どおりに走ったため、この半砂漠の沿線の農家はラジオの時報ではなく汽笛で時計を合わせたと言われる。何十年も同じ側線を同じ分に通過し続けたからである。",
    ),
  },
  shosholoza: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Shosholoza Meyl Ticket|Billete del Shosholoza Meyl|Billet du Shosholoza Meyl|ショショローザ・メイル乗車券"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Named after 'Shosholoza', a call-and-response work song sung by migrant mineworkers on trains between the homelands and the mines, the current long-distance passenger service still carries that name — 'go forward' or 'make way' in Ndebele — long after the migrant-labour system that gave the song its meaning officially ended.|Llamado por 'Shosholoza', un canto de llamada y respuesta que entonaban los mineros migrantes en los trenes entre los homelands y las minas, el servicio actual de pasajeros de larga distancia sigue llevando ese nombre, 'sigue adelante' o 'abre paso' en ndebele, mucho después de que terminara oficialmente el sistema de trabajo migrante que le dio sentido a la canción.|Nommé d'après « Shosholoza », un chant de travail à répons entonné par les mineurs migrants dans les trains entre les homelands et les mines, l'actuel service de voyageurs longue distance porte encore ce nom, « avance » ou « fais de la place » en ndébélé, longtemps après la fin officielle du système de travail migrant qui donnait son sens au chant.|『ショショローザ』という名は、ホームランドと鉱山の間を結ぶ列車の中で出稼ぎ鉱夫たちが歌った掛け合いの労働歌に由来する。ンデベレ語で「前へ進め」「道を空けろ」を意味するこの名は、その歌に意味を与えた出稼ぎ労働の仕組みが公式には終わったあとも、いまの長距離旅客列車の名として残っている。",
    ),
  },
  bluetrain: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Blue Train Ticket|Billete del Blue Train|Billet du Blue Train|ブルートレイン乗車券"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Blue Train between Pretoria and Cape Town has run in some form since the 1930s and is marketed as one of the world's most luxurious rail journeys, with butler service and a barber on board, covering in 27 hours a route that the ordinary Shosholoza Meyl takes over 25 hours to run at a fraction of the price.|El Blue Train entre Pretoria y Ciudad del Cabo circula de una forma u otra desde los años treinta y se promociona como uno de los viajes en tren más lujosos del mundo, con servicio de mayordomo y barbero a bordo, cubriendo en 27 horas una ruta que el Shosholoza Meyl ordinario recorre en más de 25 horas a una fracción del precio.|Le Blue Train entre Pretoria et Le Cap circule sous une forme ou une autre depuis les années 1930 et se présente comme l'un des voyages en train les plus luxueux au monde, avec service de majordome et barbier à bord, couvrant en 27 heures un trajet que le Shosholoza Meyl ordinaire met plus de 25 heures à parcourir pour une fraction du prix.|プレトリアとケープタウンを結ぶブルートレインは1930年代から何らかの形で走り続けており、専属のボーイと理容師まで備えた世界屈指の豪華列車として売られている。27時間で走るその同じ区間を、普通のショショローザ・メイルはその何分の一かの値段で25時間以上かけて走る。",
    ),
  },
  muthi: {
    e: "🌿",
    price: 320,
    kind: "passive",
    n: t("A Sangoma's Muthi Bundle|Un atado de muthi de un sangoma|Un fagot de muthi d'un sangoma|サンゴマの薬草束(ムティ)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "A traditional healer, or sangoma, prepares muthi bundles from roots, bark and leaves chosen for a specific purpose rather than sold as a general remedy, and an estimated 60 to 80 percent of South Africans consult a traditional healer at some point alongside or instead of a doctor.|Un sanador tradicional, o sangoma, prepara los atados de muthi con raíces, corteza y hojas elegidas para un fin concreto, no como remedio general, y se calcula que entre el 60 y el 80 por ciento de los sudafricanos consulta a un sanador tradicional en algún momento, junto a un médico o en su lugar.|Un guérisseur traditionnel, ou sangoma, prépare les fagots de muthi à partir de racines, d'écorce et de feuilles choisies pour un usage précis plutôt que vendues comme remède général, et on estime que 60 à 80 % des Sud-Africains consultent un jour un guérisseur traditionnel, en plus d'un médecin ou à sa place.|伝統医療者サンゴマは、万能薬としてではなく特定の目的のために選んだ根・樹皮・葉を組み合わせてムティを調合する。南アフリカ人のおよそ60〜80パーセントが、医師と並行してか医師の代わりに、人生のどこかで伝統医療者に相談するとされる。",
    ),
  },
  bonethrow: {
    e: "🦴",
    price: 440,
    kind: "pre",
    n: t("A Sangoma's Bone Throw|Una tirada de huesos de sangoma|Un jet d'os de sangoma|サンゴマの骨投げ占い",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の霊を自分から追い払う。",
    ),
    f: t(
      "Sangomas divine using a set of small bones, shells and carved objects, each one standing for a specific ancestor, animal or warning, thrown onto a mat and read by the pattern they fall in — a practice passed down through years of apprenticeship under an established healer rather than learned from any book.|Los sangomas adivinan con un juego de huesos pequeños, conchas y objetos tallados, cada uno representando a un antepasado, animal o advertencia concretos, lanzados sobre una estera y leídos según el patrón en que caen, una práctica transmitida durante años de aprendizaje junto a un sanador establecido.|Les sangomas pratiquent la divination à l'aide d'un jeu de petits os, coquillages et objets sculptés, chacun représentant un ancêtre, un animal ou un avertissement précis, jetés sur une natte et lus selon la disposition dans laquelle ils tombent, une pratique transmise au fil d'années d'apprentissage auprès d'un guérisseur établi.|サンゴマは、それぞれが特定の祖先・動物・警告を表す小さな骨・貝殻・彫り物の一式を敷物の上に投げ、落ちた配置を読み解いて占う。これは本で学ぶものではなく、確立した治療師のもとで何年もかけて弟子入りして受け継がれる技である。",
    ),
  },
  matricpapers: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Stack of Old Matric Papers|Una pila de exámenes de matric antiguos|Une pile d'anciens sujets de matric|過去のマトリック試験問題の束"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Matric, the national school-leaving exam taken at the end of grade twelve, decides university entry for the whole country in one sitting, and past exam papers going back years are freely published by the education department, photocopied and passed hand to hand at schools that cannot afford much else.|El matric, el examen nacional de fin de secundaria que se hace al terminar el grado doce, decide el ingreso a la universidad para todo el país en una sola sesión, y los exámenes de años anteriores los publica libremente el ministerio de educación, se fotocopian y se pasan de mano en mano en escuelas que no pueden permitirse mucho más.|Le matric, l'examen national de fin de scolarité passé à la fin de la douzième année, décide de l'admission à l'université pour tout le pays en une seule session, et les sujets des années précédentes sont librement publiés par le ministère de l'éducation, photocopiés et passés de main en main dans des écoles qui n'ont pas les moyens de faire beaucoup plus.|高校最終学年の終わりに受ける全国統一の卒業試験マトリックは、全国の大学進学の可否を一発で決める。過去問は教育省が自由に公開しており、他に手立ての乏しい学校ではコピーされて生徒の手から手へと渡っていく。",
    ),
  },
  biltong: {
    e: "🥩",
    price: 380,
    kind: "pre",
    n: t("A Roadside Biltong Windfall|Una ganancia inesperada de biltong al borde de la carretera|Un gain inattendu de biltong en bord de route|道端の乾燥肉屋の思わぬ稼ぎ",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Biltong, meat cured and air-dried with vinegar and spice rather than smoked, keeps for weeks without refrigeration and is sold everywhere from petrol-station counters to roadside farm stalls, a method of preserving meat that predates refrigerated transport by centuries and never stopped being the default snack on a long drive.|El biltong, carne curada y secada al aire con vinagre y especias en vez de ahumada, se conserva semanas sin refrigeración y se vende en todas partes, desde el mostrador de una gasolinera hasta un puesto de granja junto a la carretera, un método de conservación anterior por siglos al transporte refrigerado.|Le biltong, viande macérée au vinaigre et aux épices puis séchée à l'air plutôt que fumée, se conserve des semaines sans réfrigération et se vend partout, du comptoir de station-service à l'étal de ferme en bord de route, une méthode de conservation antérieure de plusieurs siècles au transport frigorifique.|ビルトングは燻製ではなく酢と香辛料に漬けて風乾させた干し肉で、冷蔵なしで何週間も保つ。ガソリンスタンドのカウンターから道端の農家の露店まで、いたるところで売られている。冷蔵輸送より何世紀も前からある保存法で、長距離運転のお供という地位をいまも譲っていない。",
    ),
  },
  hooterblast: {
    e: "📣",
    price: 420,
    kind: "pre",
    n: t("A Minibus Taxi's Hooter Blast|Un bocinazo de taxi minibús|Un coup de klaxon de taxi minibus|ミニバスタクシーのクラクション連打",
    ),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Minibus taxi drivers communicate almost entirely through a code of hand signals and short hooter blasts — one tap to call a waiting passenger, a longer one to warn a rival taxi off a stop — a system understood countrywide without any official manual ever having written it down.|Los conductores de taxi minibús se comunican casi por completo con un código de señas y bocinazos cortos: uno para llamar a un pasajero que espera, uno más largo para advertir a un taxi rival que se aleje de una parada, un sistema entendido en todo el país sin que ningún manual oficial lo haya escrito jamás.|Les chauffeurs de taxi minibus communiquent presque entièrement par un code de gestes et de coups de klaxon brefs — un coup pour héler un passager qui attend, un plus long pour avertir un taxi rival de s'écarter d'un arrêt — un système compris dans tout le pays sans qu'aucun manuel officiel ne l'ait jamais consigné.|ミニバスタクシーの運転手たちは、ほぼ手信号と短いクラクションの合図だけで意思疎通する。一回鳴らせば待っている客への合図、長く鳴らせばライバルのタクシーに停留所を空けろという警告――こうした符牒は、どんな公式の手引きにも書かれたことがないまま全国で通じている。",
    ),
  },
};

/**
 * 厄災の霊。ズールー・コーサの民話に伝わるトコロシュ(いたずら好きの
 * 小さな悪霊で、寝台を煉瓦で高くして避けるという言い伝えがある)にした。
 * 純粋な悪ではなく、目に余るいたずら者として描く(他盤面と同じ性格づけ)。
 */
export const SOUTHAFRICA_SPIRIT = {
  e: "👺",
  n: t("The Tokoloshe|El Tokoloshe|Le Tokoloshe|トコロシュ"),
  big: t("The Tokoloshe's Long Night|La larga noche del Tokoloshe|La longue nuit du Tokoloshe|トコロシュの長い夜"),
  ward: "muthi",
  arrive: t(
    "<b>👺 A tokoloshe has taken an interest in you.</b> Old tales describe this small, mischievous spirit as short enough to hide under a bed — which is exactly why beds here are still sometimes propped up on bricks, just in case. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👺 Un tokoloshe se ha fijado en ti.</b> Los viejos cuentos describen a este espíritu pequeño y travieso como lo bastante bajo para esconderse bajo una cama, y por eso aquí a veces se sigue alzando la cama sobre ladrillos, por si acaso. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👺 Un tokoloshe s'est intéressé à toi.</b> Les vieux contes décrivent cet esprit petit et espiègle comme assez bas pour se cacher sous un lit — c'est d'ailleurs pour cela qu'on surélève parfois encore les lits sur des briques, juste au cas où. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👺 トコロシュに目を付けられた。</b> 昔話によれば、このいたずら好きの小さな霊はベッドの下に隠れられるほど背が低いという。この土地でいまも寝台を煉瓦で持ち上げる習わしが残っているのは、念のためにである。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👺 <b>The tokoloshe</b> loses interest and scurries after <b>{0}</b>, farthest from {1}.|👺 <b>El tokoloshe</b> pierde el interés y corretea tras <b>{0}</b>, el más lejano de {1}.|👺 <b>Le tokoloshe</b> se désintéresse et détale vers <b>{0}</b>, le plus loin de {1}.|👺 <b>トコロシュ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ駆けていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the tokoloshe and never once caught him at his tricks. He grins from under the nearest bed frame and settles in for the whole night — <b>the Tokoloshe's Long Night</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al tokoloshe sin haberlo pillado nunca en sus trucos. Él sonríe bajo el somier más cercano y se instala para toda la noche: empieza <b>la larga noche del Tokoloshe</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le tokoloshe sans jamais l'avoir surpris dans ses tours. Il sourit sous le sommier le plus proche et s'installe pour la nuit entière : <b>la longue nuit du Tokoloshe</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもトコロシュと歩いていながら、一度もそのいたずらの現場を押さえられなかった。彼は近くの寝台の下でにやりと笑い、一晩じゅう居座る構えを見せる。<b>トコロシュの長い夜</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> raising a bed on bricks is still a real, widely known precaution against the tokoloshe in parts of South Africa, alongside sleeping with a light on — small, ordinary defences against a spirit said to be too short to reach a raised mattress.|<b>Tras la historia:</b> alzar la cama sobre ladrillos sigue siendo una precaución real y muy conocida contra el tokoloshe en partes de Sudáfrica, junto con dormir con la luz encendida.|<b>Derrière l'histoire :</b> surélever un lit sur des briques reste une précaution réelle et bien connue contre le tokoloshe dans certaines régions d'Afrique du Sud, tout comme dormir avec la lumière allumée.|<b>物語の背景:</b> 寝台を煉瓦で高くするのは、南アフリカの一部でいまも実際に広く知られたトコロシュ避けの用心で、明かりをつけたまま眠るのと並ぶ習わしである。高くしたマットレスには背が届かないとされる霊への、ささやかで日常的な備えである。",
  ),
  pleased: t(
    "He tips over a forgotten coin jar just to watch it roll. <b>{0}</b> gains <span class='money'>+{1}</span>.|Vuelca un tarro de monedas olvidado solo por verlo rodar. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il renverse un pot à pièces oublié rien que pour le voir rouler. <b>{0}</b> gagne <span class='money'>+{1}</span>.|忘れられていた小銭の瓶を、転がるのを見たいだけの理由でひっくり返した。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A sangoma's muthi bundle is set out where he can smell it. Tokoloshes are said to hate the bitter roots above everything, and he backs off, scurrying past <b>{0}</b> without noticing this turn.|Se coloca un atado de muthi de un sangoma donde pueda olerlo. Dicen que los tokoloshes odian las raíces amargas sobre todo lo demás, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On dépose un fagot de muthi d'un sangoma à portée de son odorat. On dit que les tokoloshes détestent par-dessus tout les racines amères ; il recule et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|嗅ぎつけられる場所にサンゴマのムティ束を置いた。トコロシュは何より苦い根を嫌うという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。トコロシュのいたずら好きな性格に合わせつつ、鉄道の国らしい題材を混ぜている。 */
export const SOUTHAFRICA_DOOM = [
  {
    id: "load-shedding-line",
    n: t("Load shedding stalls the electric line|Un corte programado detiene la línea eléctrica|Une coupure programmée bloque la ligne électrique|計画停電で電化区間が止まる"),
    t: t(
      "The overhead line goes dead mid-journey without warning, and an electric train that was running on time sits stranded on an open stretch of track until the power stage lifts. Rolling blackouts have hit the rail network hard enough that some lines now schedule around the power utility's outage blocks rather than the other way around.|La catenaria se queda sin corriente en pleno trayecto sin previo aviso, y un tren eléctrico que iba puntual queda varado en un tramo abierto de vía hasta que se levanta la etapa de corte. Los cortes programados han golpeado tanto la red ferroviaria que algunas líneas ahora organizan su horario en torno a los bloques de corte de la eléctrica.|La caténaire tombe en panne en plein trajet sans prévenir, et un train électrique qui roulait à l'heure reste bloqué sur un tronçon à découvert jusqu'à la fin du palier de délestage. Les coupures programmées ont tant frappé le réseau ferroviaire que certaines lignes calent désormais leur horaire sur les créneaux de coupure de l'électricien plutôt que l'inverse.|架線が予告なく途中で落ち、時間どおりに走っていた電車がひらけた区間で立ち往生し、停電の段階が解除されるまで動けなくなった。計画停電は鉄道網にも大きな打撃を与えており、いまでは電力会社の停電予定に合わせてダイヤを組む路線さえある。",
    ),
  },
  {
    id: "cable-theft",
    n: t("Copper cable theft cuts the signal|El robo de cable de cobre corta la señal|Le vol de câble en cuivre coupe la signalisation|銅線の盗難で信号が切れる"),
    t: t(
      "Thieves stripped a length of signalling cable overnight for its scrap copper value, and without a working signal the whole section reverts to a walking-pace crawl until a replacement can be spliced in. Cable theft has cost the national rail operator so much over the years that entire branch lines have been suspended for months at a stretch while cable is repeatedly stolen faster than it can be replaced.|Unos ladrones arrancaron durante la noche un tramo de cable de señalización por su valor como chatarra de cobre, y sin señal en funcionamiento toda la sección se reduce a paso de hombre hasta que se pueda empalmar un repuesto. El robo de cable le ha costado tanto al operador ferroviario nacional que ramales enteros han quedado suspendidos durante meses seguidos.|Des voleurs ont arraché de nuit une section de câble de signalisation pour sa valeur en cuivre de récupération, et sans signal fonctionnel, toute la section retombe à l'allure d'un pas jusqu'à ce qu'un tronçon de remplacement soit épissé. Le vol de câble a coûté si cher à l'opérateur ferroviaire national au fil des ans que des embranchements entiers ont été suspendus des mois durant.|夜のうちに信号ケーブルの一区間が銅くずとしての価値目当てに盗まれ、信号が使えない区間全体が代わりを継ぎ足すまで徒歩並みの速度に落とされた。ケーブル盗難は国鉄に何年にもわたって大きな損害を与えており、盗まれる速さが補修に追いつかず、支線がまるごと何か月も運休したこともある。",
    ),
  },
  {
    id: "veld-fire-tracks",
    n: t("A veld fire sweeps across the tracks|Un incendio del veld arrasa las vías|Un feu de veld balaie la voie|野火が線路を焼き払う"),
    t: t(
      "Dry highveld grass caught from a spark thrown off a passing wheel and ran ahead of the wind faster than any crew could clear it, forcing every train on the line to wait behind a wall of smoke until the burn crossed the right of way and died down on its own. Winter's dry grass and near-constant wind make veld fires common enough across the interior that farmers deliberately set controlled burns each year just to keep the fuel load down.|El pasto seco del altiplano prendió con una chispa desprendida de una rueda al pasar y avanzó con el viento más rápido de lo que ninguna cuadrilla pudo contener, obligando a todo tren de la línea a esperar tras un muro de humo hasta que el fuego cruzó la vía y se apagó solo. La hierba seca del invierno y el viento casi constante hacen tan comunes los incendios del veld en el interior que los granjeros provocan quemas controladas cada año.|L'herbe sèche du highveld a pris feu à une étincelle projetée par une roue de passage et a couru devant le vent plus vite qu'aucune équipe ne pouvait la contenir, forçant tout train de la ligne à attendre derrière un mur de fumée jusqu'à ce que le feu traverse l'emprise et s'éteigne de lui-même. L'herbe sèche de l'hiver et un vent quasi constant rendent les feux de veld si courants dans l'intérieur que les fermiers y allument chaque année des brûlages contrôlés.|通過する車輪から飛んだ火花がハイフェルトの乾いた草に燃え移り、どの作業班も追いつけない速さで風に乗って広がった。路線上のすべての列車が、火が線路を越えて自然に鎮まるまで煙の壁の向こうで待たされた。冬の乾いた草とほぼ絶え間ない風のせいで、内陸部では野火はありふれており、農家は毎年みずから制御burnを行って燃えやすい草を減らしている。",
    ),
  },
  {
    id: "highveld-storm-cutting",
    n: t("A highveld thunderstorm floods the cutting|Una tormenta del altiplano inunda el desmonte|Un orage du highveld inonde la tranchée|ハイフェルトの雷雨で切通しが冠水する"),
    t: t(
      "An afternoon storm that had been building all day over the plateau broke all at once, dumping more rain in twenty minutes than the drainage under the line was built to move, and the cutting filled with brown water axle-deep before anyone could act. Highveld summer afternoons follow this pattern often enough — clear morning, towering cloud by noon, a violent but short storm by four — that engineers design drainage around a known, recurring risk rather than a rare one.|Una tormenta vespertina que llevaba todo el día formándose sobre la meseta estalló de golpe, dejando caer en veinte minutos más lluvia de la que el drenaje bajo la vía estaba hecho para evacuar, y el desmonte se llenó de agua parda hasta el eje antes de que nadie pudiera actuar. Las tardes de verano del altiplano siguen este patrón con tanta frecuencia.|Un orage d'après-midi qui se formait depuis le matin sur le plateau a éclaté d'un coup, déversant en vingt minutes plus de pluie que le drainage sous la voie n'était conçu pour évacuer, et la tranchée s'est remplie d'eau brune jusqu'à l'essieu avant que quiconque ne puisse agir. Les après-midi d'été du highveld suivent ce schéma assez souvent.|高原上空で一日じゅう発達していた午後の雷雨が一気にはじけ、20分で線路下の排水が処理できる量を超える雨を降らせ、誰かが動く前に切通しは車軸の高さまで茶色い水で満たされた。ハイフェルトの夏の午後は――晴れた朝、正午には巨大な積雲、四時には激しくも短い嵐と――この型を繰り返すことが多く、技術者はまれな危険としてではなく、繰り返す既知の危険として排水を設計している。",
    ),
  },
  {
    id: "cape-doctor-crane",
    n: t("The Cape Doctor grounds the harbour cranes|El Doctor del Cabo paraliza las grúas del puerto|Le Cape Doctor cloue les grues du port|喜望峰の強風で港のクレーンが止まる"),
    t: t(
      "The summer southeaster known locally as the Cape Doctor for the way it scours smog and dust out of the city picked up hard enough by mid-morning that the harbour's container cranes were shut down on safety limits, backing up freight trains waiting to load for hours. Cape Town's wind is strong and reliable enough in summer that sailors have used it to time departures for as long as ships have called at the harbour.|El viento del sureste de verano, conocido localmente como el Doctor del Cabo por cómo limpia el esmog y el polvo de la ciudad, arreció tanto a media mañana que las grúas de contenedores del puerto se detuvieron por límites de seguridad, dejando esperando horas a los trenes de carga.|Le vent du sud-est estival, surnommé localement le Cape Doctor pour la façon dont il balaie le smog et la poussière de la ville, a forci en milieu de matinée au point que les grues à conteneurs du port furent arrêtées par sécurité, retardant des heures les trains de fret en attente de chargement.|夏に南東から吹く、街のスモッグと埃を吹き払うことから地元で「ケープの医者」と呼ばれる強風が、午前半ばには安全基準を超えるほど強まり、港のコンテナクレーンが止められた。積み込みを待つ貨物列車は何時間も足止めされた。ケープタウンの夏の風はあまりに強く安定しているため、船乗りたちは港に船が着くようになって以来ずっと、この風で出航の時を計ってきた。",
    ),
  },
  {
    id: "tokoloshe-astray",
    n: t("Led astray by a tokoloshe|Un tokoloshe te hace perder el camino|Un tokoloshe t'égare|トコロシュに化かされる"),
    t: t(
      "The footpath home along the railway embankment looked exactly the same at every bend, and only well past midnight does it become clear the same signal box was passed three times over. Old tales blame a tokoloshe for this exact trick, leading a traveler in circles for the fun of it and slipping away the moment a torch beam finally catches him.|El sendero a casa junto al terraplén ferroviario parecía idéntico en cada recodo, y solo bien pasada la medianoche queda claro que se pasó tres veces por la misma caseta de señales. Los viejos cuentos culpan de esta treta exacta a un tokoloshe.|Le sentier du retour le long du talus de la voie ferrée semblait identique à chaque virage, et ce n'est que bien après minuit qu'il devient clair qu'on est passé trois fois devant le même poste d'aiguillage. Les vieux contes attribuent ce tour précis à un tokoloshe.|線路の土手沿いに家へ帰る小道は、どの曲がり角でも同じ景色に見え、真夜中をとうに過ぎてようやく同じ信号所を三度も通り過ぎていたと分かった。昔話はこの仕掛けをトコロシュのしわざだとする。面白がって旅人を堂々巡りさせ、懐中電灯の光がついに彼をとらえた瞬間にすっと消えるという。",
    ),
  },
  {
    id: "park-station-pickpocket",
    n: t("A pickpocket works the crowd at the station|Un carterista trabaja entre la multitud de la estación|Un pickpocket sévit dans la foule de la gare|駅の人混みですりに遭う"),
    t: t(
      "A shoulder bump in the crush of commuters changing lines was over before it registered as anything, and only on the platform does the missing weight in a pocket become obvious. Johannesburg's Park Station, one of the busiest transit hubs on the continent, moves enough people through its concourse each day that a practised hand barely needs a second.|Un roce de hombro en el gentío de pasajeros cambiando de línea pasó antes de notarse como algo, y solo en el andén se hace evidente el peso que falta en un bolsillo. La estación Park de Johannesburgo, uno de los nudos de tránsito más activos del continente, mueve a diario tanta gente por su vestíbulo que una mano experta apenas necesita un segundo.|Un coup d'épaule dans la cohue des usagers changeant de ligne est passé avant même d'être remarqué, et ce n'est que sur le quai que le poids manquant dans une poche devient évident. La gare de Park à Johannesburg, l'un des nœuds de transit les plus actifs du continent, fait transiter chaque jour tant de monde qu'une main exercée n'a besoin que d'une seconde à peine.|乗り換えの人混みで肩がぶつかった程度にしか感じなかったが、ホームに出てはじめてポケットの軽さに気づいた。アフリカ大陸でも屈指の乗降客数を誇るヨハネスブルグのパーク駅は、一日にあまりに多くの人がコンコースを行き交うため、手慣れた者なら一瞬あれば事足りる。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月の配列に、南半球の実際の季節と祝日を当てている。
 * (効果の数値は `src/infrastructure/content/season-and-doom-rules.ts` の southafrica の項 — 未登録)。
 */
export const SOUTHAFRICA_SEASONS = [
  {
    e: "🗳️",
    n: t("Freedom Day marks the first vote|El Día de la Libertad marca el primer voto|Le jour de la Liberté marque le premier vote|自由の日、初めての投票を記念する"),
    t: t(
      "Autumn settles over the highveld as the nation marks Freedom Day on the twenty-seventh, the anniversary of the April 1994 election in which Black South Africans could vote for the first time. Flags fly from taxi ranks and shopping malls alike, and the day is treated less as a party occasion than as a shared, matter-of-fact public holiday.|El otoño se instala en el altiplano mientras la nación marca el Día de la Libertad el veintisiete, aniversario de las elecciones de abril de 1994 en que los sudafricanos negros pudieron votar por primera vez. Ondean banderas tanto en las paradas de taxi como en los centros comerciales.|L'automne s'installe sur le highveld tandis que la nation marque le jour de la Liberté le vingt-sept, anniversaire de l'élection d'avril 1994 où les Sud-Africains noirs purent voter pour la première fois. Des drapeaux flottent aussi bien aux stations de taxis que devant les centres commerciaux.|ハイフェルトに秋が訪れる頃、国は27日の自由の日を迎える。1994年4月、黒人の南アフリカ人が初めて投票できた選挙の記念日である。タクシー乗り場からショッピングモールまで旗が掲げられ、この日は祝祭というより、皆に共有された当たり前の祝日として扱われる。",
    ),
    f: t(
      "Freedom Day is one of twelve official public holidays, and unlike some countries' independence days it does not mark a break from a foreign ruler but a change in who, within the same borders, was finally allowed to choose the government.|El Día de la Libertad es uno de los doce festivos oficiales, y a diferencia de los días de la independencia de otros países, no marca una ruptura con un gobernante extranjero, sino un cambio en quién, dentro de las mismas fronteras, pudo por fin elegir gobierno.|Le jour de la Liberté est l'un des douze jours fériés officiels, et contrairement aux fêtes d'indépendance de certains pays, il ne marque pas une rupture avec un dirigeant étranger, mais un changement dans qui, à l'intérieur des mêmes frontières, put enfin choisir le gouvernement.|自由の日は12ある公式祝日の一つで、他の国の独立記念日と違い、外国の支配からの離脱を記念するものではない。同じ国境の内側で、誰がついに政府を選べるようになったかという変化を記念している。",
    ),
    months: [0],
  },
  {
    e: "🥶",
    n: t("The first highveld frost|La primera helada del altiplano|Le premier gel du highveld|ハイフェルトに初霜が降りる"),
    t: t(
      "May brings the first hard frost to Johannesburg and Pretoria's gardens, whitening lawns that will not properly recover until spring, while Workers' Day on the first keeps its origins in the labour movement's long fight for an eight-hour day. Highveld mornings now start under a still, cold haze that only lifts by mid-morning.|Mayo trae la primera helada fuerte a los jardines de Johannesburgo y Pretoria, blanqueando céspedes que no se recuperarán del todo hasta la primavera, mientras el Día del Trabajador, el primero del mes, conserva sus orígenes en la larga lucha del movimiento obrero por la jornada de ocho horas.|Mai apporte la première forte gelée aux jardins de Johannesburg et de Pretoria, blanchissant des pelouses qui ne se remettront vraiment qu'au printemps, tandis que la fête des Travailleurs, le premier du mois, garde ses origines dans la longue lutte du mouvement ouvrier pour la journée de huit heures.|5月にはヨハネスブルグとプレトリアの庭に初めての本格的な霜が降り、春までまともに戻らない白い芝生を残す。月初のメーデーは、八時間労働を求める労働運動の長い闘いにその起源を持つ。ハイフェルトの朝は、昼近くまで晴れない静かで冷たいもやの下で始まるようになる。",
    ),
    f: t(
      "Johannesburg sits at over 1,700 metres above sea level, high enough that its winter nights regularly drop below freezing even though the city lies well within the subtropics by latitude alone.|Johannesburgo está a más de 1.700 metros sobre el nivel del mar, lo bastante alto para que sus noches de invierno bajen a menudo de cero pese a que, solo por latitud, la ciudad queda bien dentro de los subtrópicos.|Johannesburg se trouve à plus de 1 700 mètres d'altitude, assez haut pour que ses nuits d'hiver descendent régulièrement sous zéro, bien que la ville se situe, par sa seule latitude, en plein dans les subtropiques.|ヨハネスブルグは標高1700メートルを超える高地にあり、緯度だけで見れば亜熱帯の範囲に十分入るにもかかわらず、冬の夜は日常的に氷点下まで下がる。",
    ),
    months: [1],
  },
  {
    e: "✊",
    n: t("Youth Day remembers 1976|El Día de la Juventud recuerda 1976|La fête de la Jeunesse se souvient de 1976|若者の日、1976年を記憶する"),
    t: t(
      "The sixteenth of June is marked nationwide as Youth Day, commemorating the students who marched against apartheid education in 1976, and schools across the country hold assemblies rather than lessons that morning. Deep winter has set in by now, and snow occasionally dusts the higher Drakensberg peaks along the Lesotho border.|El dieciséis de junio se marca en todo el país como el Día de la Juventud, en conmemoración de los estudiantes que marcharon contra la educación del apartheid en 1976, y las escuelas de todo el país celebran actos en vez de clases esa mañana.|Le seize juin est marqué dans tout le pays comme la fête de la Jeunesse, en commémoration des élèves qui manifestèrent contre l'éducation de l'apartheid en 1976, et les écoles du pays tiennent ce matin-là des rassemblements plutôt que des cours.|6月16日は全国で若者の日として祝われ、1976年にアパルトヘイト教育に反対して行進した生徒たちを追悼する。この日の朝、全国の学校は授業の代わりに集会を開く。いまや真冬が訪れ、レソト国境沿いのドラケンスバーグの高い峰にはときおり雪が舞う。",
    ),
    f: t(
      "Youth Day was made an official public holiday specifically to keep 16 June in the national calendar rather than let it fade, a deliberate choice to commemorate an uprising rather than smooth it over.|El Día de la Juventud se hizo festivo oficial específicamente para mantener el 16 de junio en el calendario nacional en vez de dejarlo desvanecer, una elección deliberada de conmemorar un alzamiento en vez de suavizarlo.|La fête de la Jeunesse fut érigée en jour férié officiel spécifiquement pour maintenir le 16 juin dans le calendrier national plutôt que de le laisser s'estomper, un choix délibéré de commémorer un soulèvement plutôt que de l'atténuer.|若者の日がわざわざ公式祝日にされたのは、6月16日を風化させず国のカレンダーに刻みつけるためであり、蜂起を和らげるのではなくそのまま記念する選択だった。",
    ),
    months: [2],
  },
  {
    e: "🕊️",
    n: t("Mandela Day asks for 67 minutes|El Día de Mandela pide 67 minutos|La journée Mandela demande 67 minutes|マンデラ・デー、67分間を求める"),
    t: t(
      "On the eighteenth, Mandela Day asks people worldwide to give 67 minutes of their time to community service — one minute for each year Nelson Mandela spent in public life — and schools, offices and prisons across the country organise clean-ups and donation drives to mark it. Midwinter cold keeps most other outdoor plans on hold.|El dieciocho, el Día de Mandela pide a la gente de todo el mundo dedicar 67 minutos a servicio comunitario, un minuto por cada año que Nelson Mandela pasó en la vida pública, y escuelas, oficinas y cárceles de todo el país organizan limpiezas y campañas de donación.|Le dix-huit, la journée Mandela demande aux gens du monde entier de consacrer 67 minutes au service communautaire, une minute pour chaque année passée par Nelson Mandela dans la vie publique, et écoles, bureaux et prisons du pays organisent nettoyages et collectes de dons.|18日のマンデラ・デーは、世界中の人々にコミュニティ活動へ67分――ネルソン・マンデラが公的な活動に費やした年数一年につき一分――を捧げるよう呼びかける。全国の学校・職場・刑務所は清掃や寄付活動を催してこれを祝う。真冬の寒さのせいで、他の屋外の予定はたいてい先送りにされる。",
    ),
    f: t(
      "The United Nations formally recognised 18 July, Mandela's birthday, as Nelson Mandela International Day in 2009, one of very few global observance days named for a single individual.|Naciones Unidas reconoció formalmente el 18 de julio, cumpleaños de Mandela, como el Día Internacional de Nelson Mandela en 2009, una de las pocas jornadas de observancia mundial que llevan el nombre de una sola persona.|Les Nations unies reconnurent officiellement le 18 juillet, jour de naissance de Mandela, comme Journée internationale Nelson Mandela en 2009, l'une des très rares journées d'observance mondiale portant le nom d'une seule personne.|国連は2009年、マンデラの誕生日である7月18日を正式に「ネルソン・マンデラ国際デー」と定めた。一人の人物の名を冠した世界的な記念日はきわめて数少ない。",
    ),
    months: [3],
  },
  {
    e: "✊🏾",
    n: t("Women's Day marks the 1956 march|El Día de la Mujer recuerda la marcha de 1956|La fête des Femmes se souvient de la marche de 1956|女性の日、1956年の行進を記念する"),
    t: t(
      "The ninth of August commemorates the roughly 20,000 women of all races who marched on the Union Buildings in 1956 to petition against the extension of pass laws to women, chanting a phrase still quoted today: 'you strike a woman, you strike a rock.' Namaqualand's wildflower season is just beginning further west.|El nueve de agosto conmemora a las cerca de 20.000 mujeres de todas las razas que marcharon a los Union Buildings en 1956 para protestar contra la extensión de las leyes de pases a las mujeres, coreando una frase aún citada hoy: 'golpeas a una mujer, golpeas una roca'.|Le neuf août commémore les quelque 20 000 femmes de toutes origines qui marchèrent sur les Union Buildings en 1956 pour protester contre l'extension des lois sur les laissez-passer aux femmes, scandant une phrase encore citée aujourd'hui : « frapper une femme, c'est frapper un rocher ».|8月9日は、1956年に通行証法を女性にまで拡大することに抗議してユニオン・ビルディングスへ行進した、あらゆる人種のおよそ2万人の女性たちを記念する日である。「女性を打つ者は岩を打つ」という、いまも引用され続ける言葉が唱えられた。西のほうではナマクアランドの花の季節がちょうど始まる。",
    ),
    f: t(
      "The 1956 march is widely credited with delaying the full rollout of pass laws to Black women by several years, one of the clearest instances of mass civil protest visibly slowing an apartheid policy rather than merely opposing it.|A la marcha de 1956 se le atribuye ampliamente haber retrasado varios años la implantación total de las leyes de pases a las mujeres negras, uno de los casos más claros de protesta civil masiva que frenó visiblemente una política del apartheid.|La marche de 1956 est largement créditée d'avoir retardé de plusieurs années le déploiement complet des lois sur les laissez-passer aux femmes noires, l'un des cas les plus nets où une protestation civile massive a visiblement freiné une politique de l'apartheid.|1956年の行進は、黒人女性への通行証法の全面適用を数年遅らせたと広く評価されている。大衆による市民抗議が、単に反対するだけでなくアパルトヘイト政策を目に見えて遅らせた、数少ない明確な例の一つである。",
    ),
    months: [4],
  },
  {
    e: "🔥",
    n: t("Heritage Day fills the air with braai smoke|El Día del Patrimonio llena el aire de humo de braai|La fête du Patrimoine remplit l'air de fumée de braai|遺産の日、大気が炭火焼きの煙で満ちる"),
    t: t(
      "The twenty-fourth of September, Heritage Day, is celebrated as widely by the informal name National Braai Day as by its official one, a rebranding championed by Archbishop Desmond Tutu on the idea that a shared fire and grilled meat cross every one of the country's divides. Spring is properly under way, and jacaranda buds are starting to swell in Pretoria's avenues.|El veinticuatro de septiembre, Día del Patrimonio, se celebra tanto por su nombre informal, Día Nacional del Braai, como por el oficial, un cambio de imagen impulsado por el arzobispo Desmond Tutu bajo la idea de que un fuego compartido y carne a la parrilla cruzan todas las divisiones del país.|Le vingt-quatre septembre, fête du Patrimoine, est célébré tout autant sous son nom informel, journée nationale du Braai, que sous son nom officiel, un rebaptême porté par l'archevêque Desmond Tutu selon l'idée qu'un feu partagé et de la viande grillée traversent toutes les divisions du pays.|9月24日の遺産の日は、公式の名前と同じくらい「ナショナル・ブライ・デー(炭火焼きの日)」という通称でも祝われる。共に囲む炭火と焼く肉はこの国のあらゆる分断を越えるという考えのもと、デズモンド・ツツ大主教が後押しした呼び替えである。春は本格的に始まり、プレトリアの並木ではジャカランダのつぼみが膨らみ出す。",
    ),
    f: t(
      "The braai-day rebranding campaign, launched in the 2000s, was explicitly designed to give the holiday a shared, informal meaning that did not require choosing among the many separate cultural heritages the official name asks people to reflect on.|La campaña de cambio de imagen del braai day, lanzada en los años 2000, se diseñó explícitamente para dar al festivo un significado compartido e informal que no obligara a elegir entre los muchos patrimonios culturales que el nombre oficial pide reflexionar.|La campagne de rebaptême braai day, lancée dans les années 2000, fut explicitement conçue pour donner à ce jour férié un sens partagé et informel, sans obliger à choisir parmi les nombreux héritages culturels distincts que le nom officiel invite à considérer.|2000年代に始まったブライ・デーへの呼び替え運動は、公式名が求める数多くの別々の文化的遺産のどれかを選ばせるのではなく、皆が共有できる非公式な意味をこの祝日に与えるために意図的に仕掛けられたものだった。",
    ),
    months: [5],
  },
  {
    e: "💜",
    n: t("Jacaranda season and exam superstition|Temporada de jacarandás y la superstición de los exámenes|Saison des jacarandas et superstition des examens|ジャカランダの季節と試験のジンクス",
    ),
    t: t(
      "By October the jacaranda avenues of Pretoria and Johannesburg are in full purple bloom, and a long-standing student superstition holds that if a flower falls on your head before the year's final exams, you are guaranteed to pass. Petals carpet the pavement thick enough by month's end to need sweeping outside busy shops.|Para octubre, las avenidas de jacarandás de Pretoria y Johannesburgo están en plena floración morada, y una vieja superstición estudiantil sostiene que si una flor te cae en la cabeza antes de los exámenes finales, aprobarás seguro.|En octobre, les avenues de jacarandas de Pretoria et de Johannesburg sont en pleine floraison mauve, et une vieille superstition étudiante veut que si une fleur te tombe sur la tête avant les examens de fin d'année, la réussite est garantie.|10月にはプレトリアとヨハネスブルグのジャカランダ並木が紫一色の満開を迎える。学生の間に古くから伝わるジンクスによれば、年度末の試験の前に花が頭の上に落ちてくれば、合格が約束されるという。月末には花びらが歩道を厚く覆い、忙しい店先では掃き掃除が必要になるほどになる。",
    ),
    f: t(
      "The superstition is old enough and widespread enough that some students are said to deliberately walk under the trees during exam season hoping for exactly that lucky strike.|La superstición es lo bastante antigua y extendida como para que, se dice, algunos estudiantes caminen a propósito bajo los árboles en temporada de exámenes esperando justo ese golpe de suerte.|La superstition est assez ancienne et répandue pour que certains étudiants, dit-on, marchent délibérément sous les arbres en période d'examens dans l'espoir de ce coup de chance précis.|このジンクスはあまりに古く広く知られているため、試験の季節にわざと木の下を歩いて、まさにその幸運を狙う学生もいると言われる。",
    ),
    months: [6],
  },
  {
    e: "✏️",
    n: t("Matric finals begin|Empiezan los exámenes finales de matric|Les examens finaux du matric commencent|マトリック最終試験が始まる"),
    t: t(
      "November brings the start of the national matric exams, weeks of sittings that decide university entry for the whole country's grade-twelve pupils at once, held in silent halls while the rest of the country carries on with early-summer heat rising outside. Study groups fill libraries and church halls late into the night.|Noviembre trae el inicio de los exámenes nacionales de matric, semanas de pruebas que deciden a la vez el ingreso a la universidad para los alumnos de grado doce de todo el país, celebradas en salas en silencio mientras fuera sube el calor del comienzo del verano.|Novembre marque le début des examens nationaux du matric, des semaines de sessions qui décident d'un coup de l'admission à l'université pour tous les élèves de terminale du pays, tenues dans des salles silencieuses tandis que la chaleur du début d'été monte dehors.|11月には全国統一のマトリック試験が始まる。全国の高校最終学年の生徒の大学進学を一斉に決める、何週間にもわたる試験である。外では初夏の暑さが増していく中、静まり返った試験会場でそれは行われる。図書館や教会のホールは夜遅くまで勉強会で埋まる。",
    ),
    f: t(
      "Matric results, released in January, are published in newspapers and broadcast on television by name and school, a level of public disclosure around exam performance that few other countries practise at national scale.|Los resultados de matric, publicados en enero, se difunden en periódicos y televisión con nombre y colegio, un nivel de divulgación pública sobre el rendimiento en exámenes que pocos otros países practican a escala nacional.|Les résultats du matric, publiés en janvier, paraissent dans les journaux et à la télévision avec le nom et l'école de chacun, un niveau de divulgation publique des résultats d'examen que peu d'autres pays pratiquent à l'échelle nationale.|1月に発表されるマトリックの結果は、氏名と学校名付きで新聞やテレビで公表される。試験結果をここまで公然と開示する国は、全国規模では他にほとんど無い。",
    ),
    months: [7],
  },
  {
    e: "🕊️",
    n: t("Reconciliation Day replaces an old vow|El Día de la Reconciliación reemplaza un antiguo voto|La fête de la Réconciliation remplace un ancien vœu|和解の日、古い誓いに取って代わる"),
    t: t(
      "The sixteenth of December was once marked by some as the Day of the Vow, commemorating an 1838 Boer victory at Blood River, but post-apartheid South Africa deliberately renamed it the Day of Reconciliation, keeping the date but redirecting what it asks people to remember. Summer holidays begin in earnest, and coastal towns fill with visitors from the interior.|El dieciséis de diciembre fue antaño marcado por algunos como el Día del Voto, en conmemoración de una victoria bóer de 1838 en el río Blood, pero la Sudáfrica postapartheid lo rebautizó deliberadamente como Día de la Reconciliación, manteniendo la fecha pero redirigiendo lo que pide recordar.|Le seize décembre fut jadis marqué par certains comme le jour du Vœu, commémorant une victoire boer de 1838 à la rivière Blood, mais l'Afrique du Sud post-apartheid l'a délibérément rebaptisé jour de la Réconciliation, gardant la date mais réorientant ce qu'elle invite à retenir.|12月16日はかつて、1838年のブラッド川でのボーア人の勝利を記念する「誓いの日」として一部で祝われていたが、アパルトヘイト後の南アフリカは日付をそのままに、思い起こすべきものの向きを意図的に変えて「和解の日」と改称した。本格的な夏休みが始まり、海辺の町は内陸からの行楽客で埋まる。",
    ),
    f: t(
      "Keeping the same calendar date while changing what it commemorates was a deliberate choice rather than an accident, meant to fold a contested Afrikaner nationalist holiday into a new, shared national one rather than simply abolishing it.|Mantener la misma fecha del calendario cambiando lo que conmemora fue una elección deliberada y no un accidente, pensada para integrar un festivo nacionalista afrikáner disputado en uno nuevo y compartido, en vez de simplemente abolirlo.|Conserver la même date au calendrier tout en changeant ce qu'elle commémore fut un choix délibéré et non un accident, destiné à intégrer un jour férié nationaliste afrikaner contesté dans une nouvelle fête nationale partagée plutôt que de simplement l'abolir.|同じ日付を残したまま何を記念するかを変えたのは偶然ではなく意図的な選択であり、物議を醸すアフリカーナー民族主義の祝日を単に廃止するのではなく、新しい共有の国民の祝日へと組み替える狙いがあった。",
    ),
    months: [8],
  },
  {
    e: "☀️",
    n: t("A new school year opens in the heat|Un nuevo curso escolar abre con el calor|Une nouvelle année scolaire s'ouvre dans la chaleur|暑さの中、新学年が始まる"),
    t: t(
      "Unlike countries that start school in autumn, South Africa's academic year opens in mid-January, at the height of summer, so the first day of school and the last week of beach holidays often overlap by only a few days. Matric results from the previous year's exams are released this month, front-page news for weeks.|A diferencia de países que empiezan el curso en otoño, el año escolar sudafricano abre a mediados de enero, en pleno verano, así que el primer día de clase y la última semana de vacaciones en la playa a menudo se solapan por apenas unos días.|Contrairement aux pays qui commencent l'école en automne, l'année scolaire sud-africaine s'ouvre à la mi-janvier, en plein été, si bien que le premier jour d'école et la dernière semaine de vacances à la plage ne se chevauchent souvent que de quelques jours.|秋に新学年が始まる国と違い、南アフリカの学年度は真夏の1月半ばに始まる。そのため始業日と海辺の休暇最後の週は、わずか数日しか重ならないことも多い。前年の試験のマトリック結果もこの月に発表され、何週間も一面を飾る。",
    ),
    f: t(
      "The mismatch between a January school start and a results release the same month means some pupils find out which university they qualify for only days before term begins.|El desajuste entre el inicio escolar de enero y la publicación de resultados el mismo mes hace que algunos alumnos sepan a qué universidad califican solo días antes de que empiece el trimestre.|Le décalage entre une rentrée scolaire en janvier et la publication des résultats le même mois fait que certains élèves n'apprennent à quelle université ils sont admis que quelques jours avant la rentrée.|1月の始業と同じ月に結果が発表されるという食い違いのせいで、学期が始まるわずか数日前になってようやくどの大学に進めるか分かる生徒もいる。",
    ),
    months: [9],
  },
  {
    e: "🌬️",
    n: t("Fynbos fire season on the Cape peninsula|Temporada de incendios de fynbos en la península del Cabo|Saison des feux de fynbos sur la péninsule du Cap|ケープ半島のフィンボス火災の季節",
    ),
    t: t(
      "Hot, dry summer winds turn the Cape's fynbos vegetation, much of it naturally adapted to burn every decade or two, into standing fuel, and mountain fires above suburban neighbourhoods are common enough this month that residents keep an evacuation bag ready without much drama about it. Firebreaks are cut and controlled burns scheduled well before the worst of the heat arrives.|Los vientos calientes y secos del verano convierten la vegetación de fynbos del Cabo, en gran parte adaptada de forma natural a arder cada década o dos, en combustible en pie, y los incendios de montaña sobre barrios suburbanos son bastante comunes este mes.|Les vents chauds et secs de l'été transforment la végétation de fynbos du Cap, en grande partie naturellement adaptée à brûler tous les dix ou vingt ans, en combustible sur pied, et les feux de montagne au-dessus des quartiers résidentiels sont assez fréquents ce mois-ci.|夏の熱く乾いた風は、十数年から二十年おきに燃えることに自然に適応しているケープ地方のフィンボス植生を、そのまま立ち燃料に変える。住宅地の背後の山火事はこの月にはよくあることで、住民たちはさほど大げさに騒がず避難用の荷物を用意している。最悪の暑さが来る前に防火帯が切られ、制御された野焼きの予定も組まれる。",
    ),
    f: t(
      "Fynbos, the fine-leaved shrubland unique to the Cape floral kingdom, actually needs periodic fire to release seeds from certain species' seed pods, so fire suppression alone would eventually harm the ecosystem rather than protect it.|El fynbos, el matorral de hoja fina exclusivo del reino floral del Cabo, en realidad necesita fuego periódico para liberar semillas de las vainas de ciertas especies, así que solo suprimir el fuego acabaría dañando el ecosistema en vez de protegerlo.|Le fynbos, ce maquis à feuilles fines propre au royaume floral du Cap, a en réalité besoin d'un feu périodique pour libérer les graines des capsules de certaines espèces, si bien que la seule suppression du feu finirait par nuire à l'écosystème plutôt que de le protéger.|ケープ植物区系に固有の、細い葉を持つ低木群フィンボスは、実際には特定の種の莢から種子を放出させるために周期的な火を必要としている。だから火をただ抑え込むだけでは、生態系を守るどころかいずれ害することになる。",
    ),
    months: [10],
  },
  {
    e: "⚖️",
    n: t("Human Rights Day remembers Sharpeville|El Día de los Derechos Humanos recuerda Sharpeville|La fête des Droits humains se souvient de Sharpeville|人権の日、シャープビルを記憶する"),
    t: t(
      "The twenty-first of March commemorates the 1960 Sharpeville massacre, when police opened fire on a crowd protesting the pass laws, killing 69 people — an event that turned international opinion against apartheid more sharply than almost anything before it. Late-summer heat is only just beginning to break as the academic year's first term ends.|El veintiuno de marzo conmemora la masacre de Sharpeville de 1960, cuando la policía abrió fuego contra una multitud que protestaba contra las leyes de pases, matando a 69 personas, un suceso que volcó la opinión internacional contra el apartheid más que casi nada anterior.|Le vingt et un mars commémore le massacre de Sharpeville de 1960, quand la police ouvrit le feu sur une foule protestant contre les lois sur les laissez-passer, tuant 69 personnes, un événement qui retourna l'opinion internationale contre l'apartheid plus nettement que presque tout ce qui avait précédé.|3月21日は1960年のシャープビルの虐殺を記念する日である。通行証法に抗議する群衆に警官隊が発砲し、69人が死亡したこの事件は、それ以前のほとんどどんな出来事よりも鋭く国際世論をアパルトヘイトに背かせた。晩夏の暑さは学年最初の学期が終わる頃にようやく和らぎ始める。",
    ),
    f: t(
      "The United Nations designated 21 March the International Day for the Elimination of Racial Discrimination directly because of Sharpeville, making South Africa's own Human Rights Day and a global observance share the exact same date by design.|Naciones Unidas designó el 21 de marzo como el Día Internacional de la Eliminación de la Discriminación Racial directamente a causa de Sharpeville, haciendo que el propio Día de los Derechos Humanos de Sudáfrica y una jornada mundial compartan a propósito la misma fecha.|Les Nations unies désignèrent le 21 mars Journée internationale pour l'élimination de la discrimination raciale directement à cause de Sharpeville, faisant que la propre fête des Droits humains de l'Afrique du Sud et une observance mondiale partagent, par construction, exactement la même date.|国連はシャープビルの事件を直接の理由として3月21日を「人種差別撤廃国際デー」に定めた。南アフリカ独自の人権の日と世界的な記念日が、意図的に同じ日付を共有しているのはそのためである。",
    ),
    months: [11],
  },
];
