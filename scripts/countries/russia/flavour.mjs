/**
 * ロシアの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国・イタリアと同じく「地方まるごとの好不況」で
 * 差をつける。実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 *
 * **ウクライナ侵攻には一切触れない。** 歴史上の出来事(大祖国戦争の戦勝記念日、
 * ソ連時代の強制収容所・配給列)には触れるが、現在進行中の戦争は
 * 遊びの題材にしない、という盤面全体の方針をこのファイルでも守っている。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const RUSSIA_META = {
  id: "russia",
  name: t("Russia|Rusia|Russie|ロシア"),
  blurb: t(
    "The world's largest country, eleven time zones from onion-domed Moscow to the Pacific coast, threaded together by the Trans-Siberian Railway|El país más extenso del mundo, once husos horarios desde la Moscú de cúpulas bulbosas hasta la costa del Pacífico, unidos por el Transiberiano|Le plus vaste pays du monde, onze fuseaux horaires entre la Moscou aux bulbes dorés et la côte du Pacifique, reliés par le Transsibérien|玉ねぎ屋根のモスクワから太平洋岸まで11の時間帯にまたがる世界最大の国を、シベリア鉄道が一本につなぐ",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (計算根拠はそちら側のコメントに書く)。
  cur: { pre: "₽", post: "", mul: 5900 },
  start: "moscow",
  // ロシア民話の代表的な登場人物4人。
  cpuNames: ["Baba Yaga", "Ivan", "Vasilisa", "Koschei"],
  // ロシア国旗の白・青・赤に、正教の聖堂の金と極夜の紺を添えた5色。
  stripe: ["#f2f0e8", "#2a5aa8", "#c8202f", "#f4c430", "#20364a"],
};

/** ロシアの6地方(実際の連邦管区の区分を単純化)。 */
export const RUSSIA_REGIONS = {
  tsn: t(
    "Central — Moscow and the towns of the Golden Ring|Centro — Moscú y las ciudades del Anillo de Oro|Centre — Moscou et les villes de l'Anneau d'or|中央(モスクワとゴールデンリングの古都)",
  ),
  szp: t(
    "Northwest — Saint Petersburg, Karelia, the Arctic ports|Noroeste — San Petersburgo, Carelia, los puertos árticos|Nord-Ouest — Saint-Pétersbourg, la Carélie, les ports arctiques|北西(サンクトペテルブルクとカレリア・北極海の港)",
  ),
  yug: t(
    "South & Caucasus — the Black Sea coast, the Volga delta, the Caucasus foothills|Sur y Cáucaso — la costa del mar Negro, el delta del Volga, las estribaciones del Cáucaso|Sud et Caucase — la côte de la mer Noire, le delta de la Volga, les contreforts du Caucase|南部・カフカス(黒海沿岸・ヴォルガ河口・カフカスの山あい)",
  ),
  vlg: t(
    "Volga & Urals — Tatarstan, Bashkortostan, the industrial Urals|Volga y Urales — Tartaristán, Baskortostán, los Urales industriales|Volga et Oural — le Tatarstan, le Bachkortostan, l'Oural industriel|ヴォルガ・ウラル(タタールスタン・バシコルトスタンとウラルの工業地帯)",
  ),
  sib: t(
    "Siberia — the taiga, the Trans-Siberian's heartland, Lake Baikal|Siberia — la taiga, el corazón del Transiberiano, el lago Baikal|Sibérie — la taïga, le cœur du Transsibérien, le lac Baïkal|シベリア(タイガとシベリア鉄道の中心、バイカル湖)",
  ),
  dv: t(
    "Far East — the Pacific coast, Sakhalin, Kamchatka's volcanoes|Lejano Oriente — la costa del Pacífico, Sajalín, los volcanes de Kamchatka|Extrême-Orient — la côte du Pacifique, Sakhaline, les volcans du Kamtchatka|極東(太平洋岸とサハリン、カムチャツカの火山)",
  ),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存の全盤面のアイテム鍵と衝突しないことを確認済み(REGISTER.md参照)。
 */
export const RUSSIA_ITEMS = {
  troika: {
    e: "🛷",
    price: 240,
    kind: "move",
    n: t("A Troika Ride|Un paseo en troika|Une balade en troïka|トロイカでひとっ走り"),
    d: t(
      "Carried 8–12 squares. The snow picks where you come down.|Te lleva de 8 a 12 casillas. La nieve elige dónde bajas.|Emporté de 8 à 12 cases. C'est la neige qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは雪まかせ。",
    ),
    f: t(
      "A troika harnesses three horses abreast, with the center horse trotting while the two outer horses canter, a gait combination that let 18th-century mail routes cross the empire's vast distances faster than any single horse could. Gogol's novel Dead Souls famously compares all of Russia to a troika racing forward into an unknown future, a line still quoted today.|Una troika unce tres caballos en fila, con el del centro al trote y los dos laterales al galope corto, una combinación que permitió a las rutas postales del siglo XVIII cruzar las vastas distancias del imperio más rápido que un solo caballo.|Une troïka attelle trois chevaux de front, celui du milieu au trot et les deux autres au petit galop, une combinaison d'allures qui permit aux routes postales du XVIIIe siècle de franchir les vastes distances de l'empire plus vite qu'un seul cheval ne le pouvait.|トロイカは3頭の馬を並べて曳かせ、真ん中の馬は速歩、両脇の馬は駆歩で走るという歩様の組み合わせにより、18世紀の郵便路は帝国の広大な距離を1頭立てよりずっと速く越えられた。ゴーゴリの小説『死せる魂』はロシアそのものを、未知の未来へ疾走するトロイカにたとえたことで知られ、その一節はいまも引用され続けている。",
    ),
  },
  raspisanie: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Train Timetable|El horario de trenes|L'horaire des trains|列車時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Soviet and Russian railway timetables have long been printed down to the minute and followed with a precision that outlasted the empire, the union, and every currency reform since, and a departure that leaves even sixty seconds late is still noted as an anomaly by railway staff.|Los horarios ferroviarios soviéticos y rusos se han impreso durante mucho tiempo al minuto y se han seguido con una precisión que ha sobrevivido al imperio, a la unión y a todas las reformas monetarias posteriores.|Les horaires ferroviaires soviétiques et russes sont depuis longtemps imprimés à la minute près et suivis avec une précision qui a survécu à l'empire, à l'union et à toutes les réformes monétaires qui ont suivi.|ソ連・ロシアの鉄道時刻表は古くから分単位で印刷され、帝政・ソ連・その後のあらゆる通貨改革を生き延びるほどの精度で守られてきた。わずか1分の遅れでさえ、鉄道職員には異例として記録される。",
    ),
  },
  platskart: {
    e: "🚈",
    price: 360,
    kind: "pre",
    n: t("A Platzkart Ticket|Un billete de platzkart|Un billet de platzkart|プラツカルト切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Platzkart carriages have no compartment doors, just open bays of bunks running the length of the car, and generations of long-distance travelers say the class produces more genuine conversation between strangers, over shared tea and instant noodles, than any closed first-class compartment ever could.|Los vagones de platzkart no tienen puertas de compartimento, solo bahías abiertas de literas a lo largo del vagón, y generaciones de viajeros de larga distancia dicen que esta clase genera más conversación auténtica entre desconocidos que cualquier compartimento cerrado de primera clase.|Les wagons platzkart n'ont pas de portes de compartiment, juste des alcôves ouvertes de couchettes sur toute la longueur du wagon, et des générations de voyageurs de longue distance disent que cette classe suscite plus de vraies conversations entre inconnus qu'aucun compartiment fermé de première classe.|プラツカルト車両には個室の扉がなく、車両の端から端まで寝台が連なる開放式の造りで、長距離を旅してきた幾世代もの人々は、閉じた一等個室よりも見知らぬ者どうしのお茶やカップ麺を挟んだ本物の会話が、この等級でこそ生まれると語る。",
    ),
  },
  sapsan: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("A Sapsan Ticket|Un billete de Sapsán|Un billet de Sapsan|サプサン切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Sapsan, named for the peregrine falcon, began running between Moscow and Saint Petersburg in 2009 at speeds up to 250 km/h, cutting a journey that once took most of a day down to under four hours, and its German-built trains were the fastest ever to operate in the country when they debuted.|El Sapsan, cuyo nombre significa halcón peregrino, empezó a circular entre Moscú y San Petersburgo en 2009 a velocidades de hasta 250 km/h, reduciendo un trayecto que antes ocupaba casi todo un día a menos de cuatro horas.|Le Sapsan, du nom du faucon pèlerin, commença à circuler entre Moscou et Saint-Pétersbourg en 2009 à des vitesses atteignant 250 km/h, ramenant à moins de quatre heures un trajet qui occupait autrefois presque toute une journée.|「ハヤブサ」を意味するサプサンは2009年、モスクワ―サンクトペテルブルク間を最高時速250kmで走り始め、かつてほぼ丸一日かかっていた行程を4時間足らずに縮めた。ドイツ製のこの車両は、デビュー当時ロシア国内で運行された中で最速だった。",
    ),
  },
  khlebsol: {
    e: "🍞",
    price: 320,
    kind: "passive",
    n: t("Bread and Salt|Pan y sal|Pain et sel|パンと塩(フレープ・ソリ)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Presenting a round loaf with a small dish of salt set on top is the traditional Russian welcome for an honored guest, or a new household spirit, and declining to taste the offering has long been considered a serious breach of hospitality on both sides of the doorway.|Presentar un pan redondo con un platito de sal encima es el saludo tradicional ruso para un huésped de honor, o para un nuevo espíritu del hogar, y rechazar probar la ofrenda se ha considerado durante mucho tiempo una grave falta de hospitalidad por ambas partes.|Offrir un pain rond surmonté d'un petit plat de sel est l'accueil traditionnel russe réservé à un hôte d'honneur, ou à un nouvel esprit du foyer, et refuser d'y goûter a longtemps été considéré comme un grave manquement à l'hospitalité, des deux côtés du seuil.|丸いパンの上に小さな塩の器を載せて差し出すのは、大切な客(あるいは新しい家の精霊)を迎えるロシア伝統の作法で、これを口にすることを断るのは、戸口の内と外どちらにとっても重い無礼とされてきた。",
    ),
  },
  sol: {
    e: "🧂",
    price: 440,
    kind: "pre",
    n: t("Salt Over the Left Shoulder|Sal sobre el hombro izquierdo|Du sel par-dessus l'épaule gauche|左肩越しの塩",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Spilling salt is considered a bad omen in Russian folk belief, said to invite a quarrel into the household, and the traditional remedy is to pinch up a little of the spilled salt and toss it back over the left shoulder, supposedly into the eye of whatever mischief is lurking there.|Derramar sal se considera un mal presagio en la creencia popular rusa, que se dice invita a una disputa en el hogar, y el remedio tradicional es tomar un poco de la sal derramada y lanzarla por encima del hombro izquierdo.|Renverser du sel passe pour un mauvais présage dans la croyance populaire russe, censé attirer la querelle au sein du foyer, et le remède traditionnel consiste à pincer un peu du sel renversé et à le jeter par-dessus l'épaule gauche.|塩をこぼすのはロシアの民間信仰では悪い前触れとされ、家に諍いを招くと言われる。伝統的な厄除けは、こぼれた塩を少しつまんで左肩越しに投げ返すことで、そこに潜んでいるかもしれない厄介事の目に入れてやるのだとされる。",
    ),
  },
  shpargalka: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("The Crib Sheet|La chuleta|L'antisèche|カンニングペーパー(シパルガルカ)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Shpargalka properly refers to a tightly folded strip of exam answers small enough to hide in a sleeve or a pen case, and Soviet-era students grew so skilled at concealing them that certain folding methods, such as the accordion-pleated \"garmoshka,\" earned their own folk names among classmates.|Shpargalka designa propiamente una tira de respuestas de examen plegada con fuerza, lo bastante pequeña para esconderla en una manga o un estuche, y los estudiantes de la era soviética se volvieron tan hábiles ocultándolas que ciertos métodos de plegado ganaron nombres propios entre compañeros.|Chpargalka désigne à proprement parler une bande de réponses d'examen pliée serré, assez petite pour se cacher dans une manche ou une trousse, et les étudiants de l'ère soviétique devinrent si habiles à les dissimuler que certaines méthodes de pliage, comme la « garmochka » en accordéon, gagnèrent leur propre nom entre camarades.|「シパルガルカ」とは本来、袖や筆箱に隠せるほど小さくきつく折りたたんだ試験の解答紙を指す。ソ連時代の学生はこれを隠す技をあまりに磨いたため、蛇腹折りの「ガルモシカ」のような特定の折り方には、同級生のあいだで固有の呼び名までついた。",
    ),
  },
  gosloto: {
    e: "🎟️",
    price: 280,
    kind: "pre",
    n: t("A Winning Gosloto Ticket|Un billete premiado de Gosloto|Un billet gagnant du Gosloto|当たったゴスロト券"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Gosloto, the state-run numbers lottery, traces back to a Soviet draw first held in 1970 to raise money for sport, and the format has continued in something close to its original form ever since, outliving the union that created it by more than three decades.|Gosloto, la lotería numérica estatal, se remonta a un sorteo soviético celebrado por primera vez en 1970 para recaudar fondos para el deporte, y el formato ha continuado en una forma cercana a la original desde entonces.|Le Gosloto, la loterie à numéros gérée par l'État, remonte à un tirage soviétique organisé pour la première fois en 1970 pour financer le sport, et son format se poursuit sous une forme proche de l'originale depuis lors.|国営の数字選択式宝くじ「ゴスロト」は、1970年にスポーツ振興資金を集めるため初めて行われたソ連時代の抽選にさかのぼり、それを生んだ連邦が消えて30年以上たったいまも、ほぼ当時に近い形式のまま続いている。",
    ),
  },
  blat: {
    e: "🤝",
    price: 420,
    kind: "pre",
    n: t("A Word Through Blat|Una palabra por blat|Un mot grâce au blat|コネの一声(ブラート)"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Blat was the informal Soviet-era system of favors and personal connections used to obtain scarce goods or skip a queue, so woven into daily life that a well-known saying held blat to be worth more than money, since money alone often could not buy what a good connection could.|El blat era el sistema informal de favores y contactos personales de la era soviética usado para conseguir bienes escasos o saltarse una cola, tan arraigado en la vida diaria que un dicho popular sostenía que el blat valía más que el dinero.|Le blat était le système informel de faveurs et de relations personnelles de l'ère soviétique, utilisé pour obtenir des biens rares ou passer devant une file d'attente, si ancré dans la vie quotidienne qu'un dicton bien connu affirmait que le blat valait plus que l'argent.|ブラートとは、不足物資を手に入れたり行列を飛ばしたりするためにソ連時代に広く使われた非公式な便宜供与とコネのしくみで、日常にあまりに深く根づいていたため「金より縁のほうが値打ちがある」という言い回しまで生まれた。金だけでは買えないものを、良いコネなら手に入れられたからである。",
    ),
  },
};

/**
 * 厄災の神。ロシア民話に伝わるドモヴォイ(ストーブの裏や敷居の下に住む
 * 小さな髭の家の精、丁重に扱われれば家を守り、粗末に扱われればいたずらをする)
 * にした。悪霊ではなく、機嫌次第で家に幸運も不運も持ち込むという二面性を持つ
 * (韓国のトッケビ・茨城のダイダラボウ・イタリアのモナチェッロと同じく
 * 「残酷ではなく、ただ度が過ぎる」性格)。
 */
export const RUSSIA_SPIRIT = {
  e: "🧔",
  n: t("The Domovoi|El domovói|Le domovoï|ドモヴォイ"),
  big: t("The Domovoi's Great Sulk|El gran enfado del domovói|La grande bouderie du domovoï|ドモヴォイの大すね"),
  ward: "khlebsol",
  arrive: t(
    "<b>🧔 A domovoi has taken an interest in you.</b> Russian folklore holds that every household has its own domovoi, a small bearded spirit who lives behind the stove or under the threshold and looks after the home, so long as the family treats him with respect. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧔 Un domovói se ha fijado en ti.</b> El folclore ruso sostiene que cada hogar tiene su propio domovói, un pequeño espíritu barbudo que vive detrás de la estufa o bajo el umbral y cuida de la casa, siempre que la familia lo trate con respeto. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧔 Un domovoï s'est intéressé à toi.</b> Le folklore russe veut que chaque foyer ait son propre domovoï, un petit esprit barbu qui vit derrière le poêle ou sous le seuil et veille sur la maison, à condition que la famille le traite avec respect. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧔 ドモヴォイに目を付けられた。</b> ロシアの民話によれば、どの家にもストーブの裏か敷居の下に住む、小さな髭の精霊ドモヴォイがいるとされ、家族から敬われている限りは家を守ってくれる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧔 <b>The domovoi</b> loses interest and slips after <b>{0}</b>, farthest from {1}.|🧔 <b>El domovói</b> pierde el interés y se desliza tras <b>{0}</b>, el más lejano de {1}.|🧔 <b>Le domovoï</b> se désintéresse et se faufile vers <b>{0}</b>, le plus loin de {1}.|🧔 <b>ドモヴォイ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへすり抜けていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the domovoi and never once left him an offering. He decides the whole household needs teaching a lesson and lets the floorboards creak all night — <b>the Domovoi's Great Sulk</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al domovói sin dejarle nunca una ofrenda. Decide que toda la casa necesita una lección y hace crujir las tablas del suelo toda la noche: empieza <b>el gran enfado del domovói</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le domovoï sans jamais lui laisser d'offrande. Il décide que toute la maisonnée mérite une leçon et fait craquer le plancher toute la nuit — <b>la grande bouderie du domovoï</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもドモヴォイと歩いていながら、一度も供え物を残さなかった。彼は家じゅうに思い知らせてやろうと、夜通し床板をきしませ始める。<b>ドモヴォイの大すね</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> a domovoi who feels neglected is said to move the furniture, tangle hair in the night, or hide small objects, but a family that leaves him a saucer of milk or porridge by the stove each evening can usually win him back.|<b>Tras la historia:</b> se dice que un domovói que se siente descuidado mueve los muebles, enreda el pelo por la noche o esconde objetos pequeños, pero una familia que le deja un platito de leche o de gachas junto a la estufa cada noche suele reconciliarse con él.|<b>Derrière l'histoire :</b> un domovoï qui se sent négligé déplacerait les meubles, emmêlerait les cheveux la nuit ou cacherait de petits objets, mais une famille qui lui laisse chaque soir une soucoupe de lait ou de kacha près du poêle parvient généralement à se le concilier de nouveau.|<b>物語の背景:</b> ないがしろにされたと感じたドモヴォイは、家具を動かしたり、夜のうちに髪をもつれさせたり、小物を隠したりするとされるが、毎晩ストーブのそばに牛乳やお粥を小皿に置いておく家族なら、たいてい機嫌を取り戻せるという。",
  ),
  pleased: t(
    "He tugs at his beard, pleased, and a coin rolls out from under the stove to your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se tira de la barba, complacido, y una moneda rueda desde debajo de la estufa hasta tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il tire sur sa barbe, satisfait, et une pièce roule de sous le poêle jusqu'à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|満足げに髭を引っぱると、ストーブの下から銭が一枚転がり出て足元まで来た。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A loaf of bread with a dish of salt sits ready on the table where he can see it, and the domovoi, who takes hospitality seriously, slips past <b>{0}</b> without stirring this turn.|Un pan con un platito de sal está listo en la mesa donde él puede verlo, y el domovói, que se toma en serio la hospitalidad, pasa de largo junto a <b>{0}</b> sin moverse esta vuelta.|Un pain accompagné d'un plat de sel attend sur la table, bien en vue, et le domovoï, qui prend l'hospitalité au sérieux, passe devant <b>{0}</b> sans bouger ce tour-ci.|パンと塩の器がよく見える食卓の上に用意されており、もてなしを大切にするドモヴォイは、このターン <b>{0}</b> のそばを何もせず通り過ぎた。",
  ),
};

/** 災難7種。旅先で実際に起こりそうな、ロシアならではの困りごとにしてある。 */
export const RUSSIA_DOOM = [
  {
    id: "gibdd",
    n: t("A traffic police stop and fine|Un control y multa de la policía de tránsito|Un contrôle et une amende de la police routière|交通警察の検問と罰金"),
    t: t(
      "A GIBDD officer waves the car onto the shoulder for what he calls a routine document check, and the conversation somehow drifts toward how much trouble a small on-the-spot fine could save everyone the paperwork. Stops like this have grown rarer since dashcams became standard equipment in nearly every Russian car, precisely because the footage now backs up whichever side is telling the truth.|Un agente de la GIBDD hace señas al coche para que se detenga en el arcén para lo que llama una revisión rutinaria de documentos, y la conversación deriva hacia cuánto papeleo podría ahorrar a todos una pequeña multa in situ.|Un agent de la GIBDD fait signe à la voiture de se ranger sur le bas-côté pour ce qu'il appelle un contrôle de routine des papiers, et la conversation dérive vers le fait qu'une petite amende réglée sur place éviterait bien de la paperasse à tout le monde.|GIBDD(交通警察)の隊員が「通常の書類確認」だと言って車を路肩に停めさせ、話はいつの間にか、その場で小さな罰金を払えば互いに書類の手間が省けるのではないかという方向に流れていく。ロシアの車のほとんどにドライブレコーダーが標準装備になって以来、こうした検問は減ってきている。映像がどちらの言い分を裏付けるかをはっきりさせてしまうからである。",
    ),
  },
  {
    id: "obmennik",
    n: t("A currency exchange booth shortchanges you|Una casa de cambio te da de menos|Un bureau de change vous arnaque|両替所でごまかされる"),
    t: t(
      "The exchange booth's rate board listed one generous number in large friendly digits and a far worse one in small print for the actual transaction, and once the commission and a vaguely worded \"service fee\" were subtracted, the total fell well short of what the sign had promised. Locals know to change money only at a bank counter, never at the booths clustered outside train stations.|El panel de tasas de la casa de cambio mostraba un número generoso en cifras grandes y amistosas, y uno mucho peor en letra pequeña para la operación real, y una vez descontadas la comisión y una vaga «tarifa de servicio», el total quedó muy por debajo de lo prometido.|Le tableau des taux du bureau de change affichait un chiffre généreux en gros caractères accueillants, et un bien pire en petits caractères pour la transaction réelle, et une fois la commission et de vagues « frais de service » déduits, le total tombait bien en deçà de ce que promettait l'écriteau.|両替所の相場表には気前のいい数字が大きく親しみやすく掲げられていたが、実際の取引にはずっと悪い数字が小さな字で添えられており、手数料と曖昧な「サービス料」を差し引くと、看板が約束した額にはるかに届かなかった。地元の人は、駅前に並ぶ両替所ではなく銀行の窓口でしか両替しないことを知っている。",
    ),
  },
  {
    id: "ochered",
    n: t("A bureaucratic queue swallows the afternoon|Una cola burocrática se traga la tarde|Une file d'attente administrative engloutit l'après-midi|お役所の行列に午後がまるごと消える"),
    t: t(
      "The office reopened after its two advertised lunch breaks, a numbered-ticket machine, and a handwritten sign taped over that same machine redirecting everyone to a different window, by which point the whole line had to reform from scratch. Standing in queues for permits and paperwork was such a fixture of Soviet life that an entire vocabulary grew up around holding a place in one for somebody else.|La oficina reabrió tras sus dos pausas de almuerzo anunciadas, una máquina expendedora de turnos numerados y un cartel escrito a mano pegado sobre esa misma máquina que redirigía a todos a otra ventanilla, momento en el que toda la fila tuvo que rehacerse desde cero.|Le bureau rouvrit après ses deux pauses déjeuner annoncées, un distributeur de tickets numérotés, et une pancarte manuscrite collée sur ce même distributeur redirigeant tout le monde vers un autre guichet, moment où toute la file dut se reformer de zéro.|窓口は告知された二度の昼休みのあと、番号札の発券機ごと再開したが、その発券機の上には手書きの張り紙が貼られ、全員を別の窓口へ差し向けていた。結局、行列は最初からやり直しになった。許可証や書類のための行列に並ぶことはソ連時代の暮らしの一部そのもので、誰かのぶんまで場所取りをすることをめぐる言い回しが丸ごとひとつの語彙として育ったほどである。",
    ),
  },
  {
    id: "buran",
    n: t("A buran blizzard sweeps in|Un buran, ventisca, arrasa la zona|Un buran, blizzard, s'abat sur la région|ブラン(猛吹雪)が襲う"),
    t: t(
      "A buran blew in with almost no warning, driving snow sideways hard enough to erase the road within minutes, and it took emergency crews the better part of a day to reopen the buried route and account for the damage left behind. Villages on the open steppe still string rope lines between buildings ahead of a forecast storm, a precaution old enough to predate weather radio.|Un buran llegó casi sin aviso, arrastrando la nieve de lado con fuerza suficiente para borrar la carretera en minutos, y a los equipos de emergencia les llevó casi un día entero reabrir la ruta sepultada y evaluar los daños.|Un buran survint presque sans prévenir, chassant la neige de côté avec assez de force pour effacer la route en quelques minutes, et il fallut aux équipes d'urgence presque une journée entière pour rouvrir la route ensevelie et évaluer les dégâts.|ほとんど前触れなくブランが吹き込み、道を数分で消し去るほどの勢いで雪を横殴りに叩きつけた。緊急対応の作業班が埋もれた道を掘り開け、残された被害を確かめ終えるまでほぼ丸一日かかった。開けた草原の村々では、予報された嵐に備えて建物のあいだにロープを張る備えがいまも続いている。ラジオの天気予報より古くからある用心である。",
    ),
    months: [9, 10],
  },
  {
    id: "zastolye",
    n: t("A toast-filled zastolye table won't let you go|Una mesa de zastolye llena de brindis no te suelta|Une tablée de zastolié pleine de toasts ne vous lâche pas|乾杯続きのザスチョリエの席から抜けられない"),
    t: t(
      "A neighboring table insisted on including a stranger in three separate toasts before the main course had even arrived, and turning down the fourth round would have been a bigger insult than paying for it. A proper zastolye is said to need a toastmaster, a tamada, to keep the rounds from spinning out of control, and this table clearly did not have one.|Una mesa vecina insistió en incluir a un desconocido en tres brindis distintos antes de que llegara siquiera el plato principal, y rechazar la cuarta ronda habría sido un insulto mayor que pagarla.|Une table voisine insista pour inclure un inconnu dans trois toasts distincts avant même l'arrivée du plat principal, et refuser la quatrième tournée aurait été une insulte plus grande que de la payer.|隣の席の人々は、メイン料理が届く前から三度も別々の乾杯にこちらを巻き込み、四杯目を断ることは、それに付き合って払うことよりもずっと大きな無礼になりそうだった。きちんとしたザスチョリエ(酒宴)には、乾杯が際限なく続かないよう仕切る「タマダ」役が要るとされるが、この席には明らかにそれがいなかった。",
    ),
  },
  {
    id: "ne-tot-poyezd",
    n: t("Boarding the wrong long-distance train|Subiendo al tren de larga distancia equivocado|Monter dans le mauvais train longue distance|違う長距離列車に乗ってしまう"),
    t: t(
      "Two trains bound for opposite ends of the country waited on facing platforms of a station too large to cross twice in time, and the mix-up only became clear well after departure, somewhere past the point of getting off and walking back. Provodnitsas, the carriage attendants who check every ticket at the door, have heard every version of the excuse and rarely look surprised anymore.|Dos trenes con destinos opuestos del país esperaban en andenes enfrentados de una estación demasiado grande para cruzarla dos veces a tiempo, y la confusión solo quedó clara bastante después de la salida.|Deux trains à destination opposée du pays attendaient sur des quais qui se faisaient face dans une gare trop vaste pour la traverser deux fois à temps, et la méprise ne devint claire que bien après le départ.|国の正反対の方向へ向かう二本の列車が、渡り直す時間もないほど巨大な駅の向かい合うホームで待っていた。取り違えに気づいたのは発車してからずいぶん経ったあと、降りて歩いて戻れる地点をとうに過ぎたころだった。乗降口ですべての切符を確かめる車掌(プロヴォドニツァ)は、あらゆる言い訳を聞き尽くしており、もう驚きもしない。",
    ),
  },
  {
    id: "karmannik",
    n: t("A pickpocket on the crowded metro|Un carterista en el metro abarrotado|Un pickpocket dans le métro bondé|満員の地下鉄でスリに遭う"),
    t: t(
      "A crowded metro carriage at rush hour is exactly the cover a practised pickpocket needs, and the wallet was gone before the doors had even finished their warning chime. Moscow's metro stations are famous for their chandeliers and mosaics, but the crush of the evening crowd looks much the same as in any other big city's underground.|Un vagón de metro abarrotado en hora punta es justo la cobertura que necesita un carterista experto, y la cartera desapareció antes de que las puertas terminaran su aviso sonoro.|Une rame de métro bondée à l'heure de pointe offre exactement la couverture dont a besoin un pickpocket expérimenté, et le portefeuille avait disparu avant même que les portes n'aient fini leur signal sonore.|ラッシュ時の満員車両は、手練れのスリにとって格好の隠れ蓑で、扉の警告音が鳴り終わる前に財布は消えていた。モスクワの地下鉄駅はシャンデリアとモザイクで名高いが、夕方の人混みの押し合いは、どこの街の地下鉄ともさして変わらない。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国・イタリアと同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の russia の項)。
 * 白夜(6月)・冬将軍(1〜2月)・雪解け(4月のラスプーチツァ)・
 * 戦勝記念日(5月)・きのこ狩り(9月)・バイカルの氷(2〜3月)を軸にした。
 */
export const RUSSIA_SEASONS = [
  {
    e: "🥾",
    n: t("Rasputitsa turns the roads to mud|La rasputitsa convierte los caminos en barro|La raspoutitsa transforme les routes en boue|ラスプーチツァが道をぬかるみに変える"),
    t: t(
      "As the last snow finally lets go, back roads across the steppe and forest turn into thick, sucking mud that swallows tyres and hooves alike, a season that has slowed invading armies almost as effectively as any battle plan. Paved highways and the railway keep running regardless, but the villages that depend on them for the last few kilometres go quiet until the ground firms up.|Al soltarse por fin la última nieve, los caminos rurales de la estepa y el bosque se convierten en un barro espeso que engulle neumáticos y cascos por igual, una estación que ha frenado a ejércitos invasores casi tan eficazmente como cualquier plan de batalla.|Quand la dernière neige lâche enfin prise, les chemins de traverse de la steppe et de la forêt se changent en une boue épaisse qui engloutit pneus et sabots, une saison qui a ralenti les armées d'invasion presque aussi efficacement que n'importe quel plan de bataille.|最後の雪がようやく解け落ちると、草原と森を抜ける裏道は、タイヤも蹄も呑み込むほど粘る泥に変わる。この季節は、どんな戦術にも劣らぬほど侵攻する軍勢の足を鈍らせてきた。舗装された幹線道路と鉄道はそれでも動き続けるが、その先の数キロを頼る村々は、地面が固まるまで静まり返る。",
    ),
    f: t(
      "Historians still debate how much credit rasputitsa truly deserves for slowing Napoleon's 1812 retreat and later invasions, since the season also happens to coincide with exhausted supply lines and stretched troops for reasons that have nothing to do with the mud itself.|Los historiadores aún debaten cuánto mérito merece realmente la rasputitsa por frenar la retirada de Napoleón en 1812 y invasiones posteriores, ya que la estación también coincide con líneas de suministro agotadas.|Les historiens débattent encore du mérite véritable de la raspoutitsa dans le ralentissement de la retraite de Napoléon en 1812 et des invasions ultérieures, la saison coïncidant aussi avec des lignes de ravitaillement épuisées.|1812年のナポレオンの退却やその後の侵攻を遅らせた功績がラスプーチツァにどれほどあるのか、歴史家のあいだではいまも意見が分かれている。この季節はちょうど補給線が尽き、兵が疲弊する時期とも重なるためで、泥そのものだけの手柄とは言い切れない。",
    ),
  },
  {
    e: "🎆",
    n: t("Victory Day fills the sky over Red Square|El Día de la Victoria llena el cielo sobre la Plaza Roja|Le jour de la Victoire embrase le ciel au-dessus de la place Rouge|戦勝記念日、赤の広場の空が彩られる"),
    t: t(
      "On the ninth of May, military parades and fireworks mark the end of the Great Patriotic War in 1945, and the Immortal Regiment march sees ordinary families carry photographs of relatives who served, walking together through city centres nationwide. Ticket touts and souvenir sellers along the parade routes do their best business of the year.|El nueve de mayo, desfiles militares y fuegos artificiales conmemoran el fin de la Gran Guerra Patria en 1945, y la marcha del Regimiento Inmortal reúne a familias corrientes que portan fotografías de parientes que sirvieron.|Le neuf mai, défilés militaires et feux d'artifice marquent la fin de la Grande Guerre patriotique en 1945, et la marche du Régiment immortel voit des familles ordinaires porter les photographies de proches ayant servi.|5月9日、軍事パレードと花火が1945年の大祖国戦争終結を記念し、「不滅の連隊」の行進では、ふつうの家族が従軍した親族の写真を掲げ、全国の街の中心を連なって歩く。パレードの沿道の転売屋や土産物売りにとって、一年でいちばんの稼ぎどきである。",
    ),
    f: t(
      "The Immortal Regiment march began as a grassroots initiative in Tomsk in 2012 before spreading nationwide and then to Russian communities abroad, entirely independent of the official military parade it now runs alongside every year.|La marcha del Regimiento Inmortal comenzó como una iniciativa popular en Tomsk en 2012 antes de extenderse por todo el país y luego a las comunidades rusas en el extranjero, del todo independiente del desfile militar oficial.|La marche du Régiment immortel naquit d'une initiative populaire à Tomsk en 2012 avant de se répandre dans tout le pays puis dans les communautés russes à l'étranger, tout à fait indépendante du défilé militaire officiel.|「不滅の連隊」の行進は2012年、トムスクでの草の根の取り組みとして始まり、その後全国、さらに海外のロシア人コミュニティへ広がった。いまも毎年並んで行われる公式の軍事パレードとはまったく別に生まれたものである。",
    ),
  },
  {
    e: "🌇",
    n: t("White nights keep Saint Petersburg lit until dawn|Las noches blancas mantienen San Petersburgo iluminado hasta el alba|Les nuits blanches gardent Saint-Pétersbourg éclairée jusqu'à l'aube|白夜がサンクトペテルブルクを明け方まで照らす"),
    t: t(
      "For several weeks around the summer solstice the sun barely dips below the horizon this far north, and Saint Petersburg fills its bridges and embankments with crowds waiting up to watch the drawbridges over the Neva raise at two in the morning, still in full daylight. Outdoor cafés and river cruises run on nearly continuous custom.|Durante varias semanas en torno al solsticio de verano, el sol apenas se pone bajo el horizonte tan al norte, y San Petersburgo llena sus puentes y malecones de gente esperando ver cómo se levantan los puentes levadizos sobre el Nevá a las dos de la madrugada.|Pendant plusieurs semaines autour du solstice d'été, le soleil descend à peine sous l'horizon si loin au nord, et Saint-Pétersbourg remplit ses ponts et ses quais de foules attendant de voir les ponts-levis sur la Neva se lever à deux heures du matin.|夏至をはさむ数週間、これほど北では太陽がほとんど地平線の下に沈まず、サンクトペテルブルクの橋と河岸は、午前2時になおも昼のような明るさの中でネヴァ川に架かる跳ね橋が上がるのを見ようと待つ人々で埋まる。屋外カフェと川の遊覧船は、ほぼ絶え間ない客足に恵まれる。",
    ),
    f: t(
      "The best-known of the White Nights events, the Scarlet Sails festival for graduating high schoolers, draws a fireworks display and a tall ship with red sails up the Neva, timed deliberately to coincide with the brightest nights of the whole year.|El más conocido de los eventos de las noches blancas, el festival de las Velas Escarlata para los graduados de secundaria, atrae fuegos artificiales y un velero de altura con velas rojas por el Nevá.|Le plus connu des événements des nuits blanches, le festival des Voiles écarlates pour les lycéens diplômés, attire un feu d'artifice et un grand voilier aux voiles rouges remontant la Neva.|白夜の催しの中でもとりわけ有名な、高校卒業生を祝う「緋色の帆」フェスティバルは、花火と赤い帆を掲げた帆船をネヴァ川にのぼらせるもので、一年でいちばん夜が明るい時期にわざと合わせて開かれる。",
    ),
  },
  {
    e: "🚤",
    n: t("River cruises fill the Volga|Los cruceros fluviales llenan el Volga|Les croisières fluviales envahissent la Volga|遊覧船がヴォルガ川を埋める"),
    t: t(
      "Multi-day cruise ships thread the canals and reservoirs linking Moscow to the Volga and on to Kazan or Astrakhan, docking for a few hours at riverside towns whose economies lean heavily on the day's worth of passengers stepping ashore to shop. Dacha gardens outside every city hit peak production of tomatoes and cucumbers for the year's pickling.|Cruceros de varios días recorren los canales y embalses que unen Moscú con el Volga y siguen hasta Kazán o Astracán, atracando unas horas en pueblos ribereños cuya economía depende en gran medida de los pasajeros del día.|Des croisières de plusieurs jours empruntent les canaux et réservoirs reliant Moscou à la Volga puis à Kazan ou Astrakhan, accostant quelques heures dans des villes riveraines dont l'économie dépend largement des passagers du jour.|数日がかりの遊覧船が、モスクワとヴォルガ川、さらにカザンやアストラハンを結ぶ運河と貯水池を縫って進み、河岸の町に数時間停泊する。その町の経済は、上陸して買い物をするその日の乗客に大きく頼っている。どの町の郊外のダーチャ(菜園付き別荘)も、今年の漬け物用トマトときゅうりの収穫が最盛期を迎える。",
    ),
    f: t(
      "The Moscow Canal and the Volga-Don Canal, both built substantially with forced labour under Stalin, are what make an unbroken cruise route from the capital all the way to the Caspian and Black Seas possible at all.|El canal de Moscú y el canal Volga-Don, ambos construidos en gran parte con trabajo forzado bajo Stalin, son lo que hace posible una ruta de crucero ininterrumpida desde la capital hasta los mares Caspio y Negro.|Le canal de Moscou et le canal Volga-Don, tous deux construits en grande partie par le travail forcé sous Staline, sont ce qui rend possible un itinéraire de croisière ininterrompu depuis la capitale jusqu'aux mers Caspienne et Noire.|モスクワ運河とヴォルガ・ドン運河は、いずれもスターリン時代に強制労働で大きく築かれたもので、これらがあってはじめて首都からカスピ海・黒海まで途切れず遊覧船で下れる。",
    ),
  },
  {
    e: "🥒",
    n: t("Dachas empty the cities for the harvest|Las dachas vacían las ciudades para la cosecha|Les datchas vident les villes pour la récolte|ダーチャが収穫のため街を空にする"),
    t: t(
      "City apartments empty out on Friday evenings as families head to their dacha plots to bring in the last of the summer harvest before the weather turns, leaving rows of jars filled with pickled cucumbers and tomatoes lined up for winter by the time they head back. Even the domovoi seems to take the month off from mischief.|Los pisos de la ciudad se vacían los viernes por la tarde cuando las familias se dirigen a sus parcelas de dacha para recoger lo último de la cosecha de verano antes de que cambie el tiempo, dejando filas de tarros de pepinillos y tomates en conserva listos para el invierno.|Les appartements citadins se vident le vendredi soir quand les familles rejoignent leur parcelle de datcha pour rentrer les dernières récoltes de l'été avant que le temps ne change, laissant des rangées de bocaux de cornichons et tomates en conserve prêts pour l'hiver.|金曜の夕方、家族は天候が変わる前に夏の収穫の最後を取り込もうとダーチャの畑へ向かい、都会のアパートは空になる。戻る頃には、冬に備えて漬けたきゅうりとトマトの瓶が何列も並ぶ。ドモヴォイもこの月はいたずらを休んでいるようである。",
    ),
    f: t(
      "A great many Soviet-era dachas were originally allotted specifically as small food-production plots rather than leisure retreats, and the pickling habits formed in that era of real scarcity have persisted long into a time of full supermarket shelves.|Muchas dachas de la era soviética se asignaron originalmente como pequeñas parcelas de producción de alimentos y no como retiros de ocio, y los hábitos de conservar en vinagre formados en aquella época de escasez real han perdurado hasta hoy.|Nombre de datchas de l'ère soviétique furent à l'origine attribuées spécifiquement comme petites parcelles de production alimentaire plutôt que comme lieux de villégiature, et les habitudes de conserves nées à cette époque de pénurie réelle ont perduré bien après.|ソ連時代の多くのダーチャは、もともと余暇のための別荘ではなく、小さな食料生産区画として割り当てられたものだった。実際の物資不足の時代に根づいた漬け物の習慣は、スーパーの棚が満ちた今の時代まで長く残り続けている。",
    ),
  },
  {
    e: "🍄",
    n: t("Mushroom hunters take to the taiga|Los buscadores de setas salen a la taiga|Les chasseurs de champignons partent en taïga|きのこ狩りの人々がタイガへ入る"),
    t: t(
      "September sends families deep into the birch and pine forests with baskets and a practised eye for the difference between a prized porcini and something better left on the forest floor, a skill passed down rather than taught from any book. School begins nationwide on the first, marked by children carrying enormous bouquets in for their teachers.|Septiembre envía a las familias al fondo de los bosques de abedules y pinos con cestas y un ojo entrenado para distinguir un preciado boleto de algo mejor dejado en el suelo del bosque, una habilidad que se transmite y no se enseña en ningún libro.|Septembre envoie les familles au cœur des forêts de bouleaux et de pins, panier au bras et œil exercé pour distinguer un cèpe précieux de ce qu'il vaut mieux laisser au sol, un savoir transmis plutôt qu'enseigné dans aucun livre.|9月、家族は籠を手に白樺と松の森の奥深くへ入っていく。上物のポルチーニと、林床に残しておくべき代物とを見分ける目は、どんな本でも教わらず受け継がれてきたものである。9月1日には全国一斉に新学期が始まり、子どもたちは大きな花束を抱えて先生のもとへ向かう。",
    ),
    f: t(
      "Foraging guides warn that far more mushroom poisonings come from confident amateurs than from true beginners, since the deadliest species often closely resemble a common, perfectly edible one that pickers already trust.|Las guías de recolección advierten de que muchos más envenenamientos por setas provienen de aficionados confiados que de verdaderos principiantes, ya que las especies más letales suelen parecerse mucho a otra común y comestible.|Les guides de cueillette avertissent que bien plus d'empoisonnements aux champignons viennent d'amateurs trop confiants que de vrais débutants, les espèces les plus mortelles ressemblant souvent de près à une espèce commune et comestible.|きのこ採りの手引きは、中毒の多くは真の初心者よりも自信過剰な経験者に起きると警告する。最も危険な種は、採る人がすでに信頼している普通の食用種とよく似ていることが多いためである。",
    ),
  },
  {
    e: "🍂",
    n: t("Golden Autumn colours the Golden Ring|El otoño dorado colorea el Anillo de Oro|L'automne doré colore l'Anneau d'or|黄金の秋がゴールデンリングを彩る"),
    t: t(
      "Birch leaves turn a brilliant gold across the ancient towns northeast of Moscow just as the tourist season there reaches its last real push before winter closes the smaller guesthouses. Called zolotaya osen, the season has been a fixture of Russian landscape painting since at least the 19th century.|Las hojas de abedul se vuelven de un dorado brillante en las antiguas ciudades al noreste de Moscú justo cuando la temporada turística allí alcanza su último gran impulso antes de que el invierno cierre las pensiones más pequeñas.|Les feuilles de bouleau prennent un or éclatant dans les anciennes villes au nord-est de Moscou, juste au moment où la saison touristique y connaît son dernier vrai regain avant que l'hiver ne ferme les petites pensions.|モスクワ北東の古い町々で白樺の葉が輝く金色に染まるのは、小さな宿が冬支度で閉まる前の観光シーズン最後のひと押しの時期にちょうど重なる。「黄金の秋」(ゾロタヤ・オセニ)と呼ばれるこの季節は、少なくとも19世紀以来ロシア風景画の定番であり続けている。",
    ),
    f: t(
      "Isaac Levitan's 1895 painting Golden Autumn, showing a birch grove above a bend in a river, is one of the most reproduced images in Russian art and gave the season much of its enduring name and popular image.|El cuadro de 1895 de Isaak Levitán, Otoño dorado, que muestra un bosquecillo de abedules sobre un recodo de un río, es una de las imágenes más reproducidas del arte ruso y dio a la estación buena parte de su nombre duradero.|Le tableau de 1895 d'Isaac Lévitan, L'Automne doré, montrant un bosquet de bouleaux au-dessus d'un méandre de rivière, est l'une des images les plus reproduites de l'art russe et a largement donné son nom durable à la saison.|イサーク・レヴィタンが1895年に描いた『黄金の秋』は、川の湾曲部を見下ろす白樺林を描いた作品で、ロシア美術の中でも指折り複製される絵の一つであり、この季節の呼び名と親しまれるイメージの多くを与えた。",
    ),
  },
  {
    e: "❄️",
    n: t("The first snow settles for good|La primera nieve cuaja definitivamente|La première neige s'installe pour de bon|初雪がそのまま根雪になる"),
    t: t(
      "Somewhere in November the season's snow stops melting between falls and settles in for the winter proper, while November 4th's Unity Day marks a 17th-century uprising against foreign occupation with a relatively young public holiday still finding its place among older ones. Households begin swapping summer tyres for studded winter ones.|En algún momento de noviembre, la nieve de la estación deja de derretirse entre nevadas y se asienta para el invierno propiamente dicho, mientras que el Día de la Unidad del 4 de noviembre conmemora un levantamiento del siglo XVII contra la ocupación extranjera.|Quelque part en novembre, la neige de la saison cesse de fondre entre deux chutes et s'installe pour l'hiver véritable, tandis que le jour de l'Unité du 4 novembre commémore un soulèvement du XVIIe siècle contre l'occupation étrangère.|11月のどこかで、その年の雪は降っても解けなくなり、本格的な冬として根雪になる。11月4日の民族統一の日は17世紀の外国占領への蜂起を記念する比較的新しい祝日で、いまも古くからの祝日の中で自分の居場所を探している。各家庭は夏タイヤをスタッドレスに替え始める。",
    ),
    f: t(
      "National Unity Day was established only in 2005, replacing the Soviet-era November 7th holiday marking the 1917 Revolution, and public awareness of exactly what it commemorates still lags behind more established holidays on the calendar.|El Día de la Unidad Nacional se instauró apenas en 2005, sustituyendo la festividad soviética del 7 de noviembre que conmemoraba la Revolución de 1917, y el conocimiento público de lo que exactamente conmemora aún va por detrás de festividades más asentadas.|Le jour de l'Unité nationale ne fut instauré qu'en 2005, remplaçant la fête soviétique du 7 novembre marquant la révolution de 1917, et la connaissance publique de ce qu'il commémore précisément reste en retrait par rapport aux fêtes plus anciennes.|民族統一の日が制定されたのは2005年とごく最近で、1917年革命を記念していたソ連時代の11月7日の祝日に代わるものである。それが正確に何を記念しているのかについての一般の認知は、いまも古くからの祝日には及ばない。",
    ),
  },
  {
    e: "🎄",
    n: t("Markets fill with New Year lights|Los mercados se llenan de luces de Año Nuevo|Les marchés se remplissent de lumières du Nouvel An|市場が新年のイルミネーションで埋まる"),
    t: t(
      "Ded Moroz, Grandfather Frost, and his granddaughter Snegurochka anchor the season's decorations far more than any Western Santa Claus, and his official residence at Veliky Ustyug receives sacks of children's letters every December. New Year, not Christmas, is by far the season's biggest gift-giving night.|Ded Moroz, el Abuelo Frío, y su nieta Snegúrochka son mucho más el eje de las decoraciones de la temporada que cualquier Santa Claus occidental, y su residencia oficial en Veliki Ustiug recibe sacos de cartas infantiles cada diciembre.|Ded Moroz, le Grand-Père Gel, et sa petite-fille Snegourotchka dominent bien plus les décorations de la saison que tout Père Noël occidental, et sa résidence officielle à Veliki Oustioug reçoit des sacs de lettres d'enfants chaque décembre.|「グランドファーザー・フロスト」ことジェド・マロースとその孫娘スネグーロチカは、西洋のサンタクロースよりもはるかにこの季節の飾り付けの中心にいる。ヴェリーキー・ウスチュグにある彼の「公式の住まい」には、毎年12月に子どもたちの手紙が袋いっぱい届く。クリスマスではなく新年こそが、この季節でいちばん贈り物が交わされる夜である。",
    ),
    f: t(
      "Grandfather Frost predates the Soviet Union in folklore but was actively promoted as a secular replacement for religious Christmas celebrations after 1917, which is part of why New Year's Eve still outweighs Christmas in Russian gift-giving today.|El Abuelo Frío es anterior a la Unión Soviética en el folclore, pero se promovió activamente como sustituto laico de las celebraciones religiosas de Navidad tras 1917, lo que explica en parte por qué la Nochevieja aún supera a la Navidad en regalos.|Le Grand-Père Gel préexiste à l'Union soviétique dans le folklore, mais il fut activement promu comme substitut laïc aux célébrations religieuses de Noël après 1917, ce qui explique en partie pourquoi le Nouvel An l'emporte encore sur Noël dans les cadeaux.|グランドファーザー・フロストは民話としてはソ連より古い存在だが、1917年以降は宗教色を持つクリスマスの祝いに代わる世俗的な存在として積極的に推し進められた。今日のロシアで新年の贈り物がクリスマスをしのぐ理由の一端は、そこにある。",
    ),
  },
  {
    e: "🎅",
    n: t("New Year's Eve brings the year's gifts|La Nochevieja trae los regalos del año|Le réveillon du Nouvel An apporte les cadeaux de l'année|大晦日にその年の贈り物が届く"),
    t: t(
      "The countdown to midnight on the 31st, followed by the president's televised address and twelve chimes of the Kremlin clock, is the single most-watched moment of the Russian calendar, and gifts long attributed to Ded Moroz appear under the fir tree once the chimes finish. Old New Year, a leftover of the pre-revolutionary Julian calendar, gives many families a quieter second celebration on the 13th and 14th.|La cuenta atrás hasta la medianoche del 31, seguida del discurso televisado del presidente y las doce campanadas del reloj del Kremlin, es el momento más visto del calendario ruso, y los regalos atribuidos desde antiguo a Ded Moroz aparecen bajo el abeto en cuanto acaban las campanadas.|Le compte à rebours vers minuit le 31, suivi du discours télévisé du président et des douze coups de l'horloge du Kremlin, est le moment le plus regardé du calendrier russe, et les cadeaux longtemps attribués à Ded Moroz apparaissent sous le sapin une fois les coups terminés.|31日深夜0時へのカウントダウンに続く大統領のテレビ演説とクレムリンの鐘の十二打は、ロシアの暦の中で最も見られる瞬間であり、鐘が鳴り終わると、昔からジェド・マロースの仕業とされる贈り物がモミの木の下に現れる。革命前のユリウス暦の名残である「旧正月」は、多くの家庭に13日・14日のより静かな二度目の祝いをもたらす。",
    ),
    f: t(
      "Because the Julian calendar the empire used ran thirteen days behind the Gregorian one adopted in 1918, some households still mark this second, unofficial new year, treating the gap between the calendars as an extra excuse to celebrate.|Como el calendario juliano que usaba el imperio iba trece días por detrás del gregoriano adoptado en 1918, algunas familias aún celebran este segundo Año Nuevo no oficial, tratando el desfase entre calendarios como una excusa extra para festejar.|Le calendrier julien qu'utilisait l'empire retardant de treize jours sur le grégorien adopté en 1918, certains foyers marquent encore ce second Nouvel An non officiel, traitant l'écart entre les calendriers comme un prétexte supplémentaire à la fête.|帝政期に使われていたユリウス暦は、1918年に採用されたグレゴリオ暦より13日遅れていたため、いまもこの非公式の「二度目の新年」を祝う家庭があり、暦のずれをもう一度祝う口実として楽しんでいる。",
    ),
  },
  {
    e: "🥶",
    n: t("General Winter tightens his grip|El general Invierno aprieta su garra|Le général Hiver resserre son étau|冬将軍が締め付けを強める"),
    t: t(
      "January and February bring the coldest weeks of the year across most of the country, and the nickname \"General Winter\" has been used since at least Napoleon's failed 1812 campaign to describe how thoroughly the season itself, more than any army, has turned invasions back. Heating bills and fur-hat sales both peak alongside it.|Enero y febrero traen las semanas más frías del año en la mayor parte del país, y el apodo «general Invierno» se usa desde al menos la fallida campaña de Napoleón de 1812 para describir cómo la propia estación, más que cualquier ejército, ha rechazado invasiones.|Janvier et février apportent les semaines les plus froides de l'année dans la majeure partie du pays, et le surnom « général Hiver » est employé depuis au moins l'échec de la campagne napoléonienne de 1812 pour décrire comment la saison elle-même a repoussé des invasions.|1月と2月は国のほとんどの地域で一年でいちばん寒い週をもたらし、「冬将軍」という呼び名は少なくとも1812年のナポレオンの遠征失敗以来、どんな軍隊よりもこの季節そのものが侵攻を押し返してきたことを表すのに使われてきた。暖房費と毛皮帽子の売れ行きは、ともにこの時期に最も高まる。",
    ),
    f: t(
      "Historians generally consider \"General Winter\" an oversimplification, since supply lines, disease and exhausted logistics did at least as much damage to both the 1812 and 1941 campaigns as the cold itself, but the nickname has stuck regardless.|Los historiadores suelen considerar que el «general Invierno» es una simplificación excesiva, ya que las líneas de suministro, las enfermedades y la logística agotada dañaron tanto las campañas de 1812 y 1941 como el propio frío.|Les historiens jugent généralement que le « général Hiver » relève de la simplification excessive, les lignes de ravitaillement, la maladie et une logistique épuisée ayant autant nui aux campagnes de 1812 et 1941 que le froid lui-même.|「冬将軍」という呼び方は単純化しすぎだと歴史家は一般に見なしている。1812年と1941年、どちらの遠征でも、寒さそのものと同じくらい補給線の困難・疫病・尽きた兵站が打撃を与えていたからだが、それでもこの呼び名は定着したままである。",
    ),
  },
  {
    e: "🥞",
    n: t("Maslenitsa burns away the winter|La Maslenitsa quema el invierno|Maslenitsa brûle l'hiver|マースレニツァが冬を焼き払う"),
    t: t(
      "The week before Lent, Maslenitsa fills town squares with bonfires, blini stacked with butter and jam, and a straw effigy of winter that is burned or drowned on the final Sunday to see the season off properly. Out on Lake Baikal, the ice grows thick enough this month for vehicles to drive across it on marked winter roads, before the spring thaw makes the whole idea unthinkable again.|La semana antes de la Cuaresma, la Maslenitsa llena las plazas de hogueras, blinis apilados con mantequilla y mermelada, y un espantapájaros de paja del invierno que se quema o se hunde el último domingo para despedir la estación como es debido.|La semaine précédant le Carême, Maslenitsa remplit les places de bûchers, de blinis empilés de beurre et de confiture, et d'un mannequin de paille représentant l'hiver qu'on brûle ou qu'on noie le dernier dimanche pour bien clore la saison.|四旬節前の一週間、マースレニツァは町の広場をかがり火と、バターとジャムを重ねたブリヌイ、そして最後の日曜に燃やすか水に沈めて冬をきちんと見送るわら人形で埋め尽くす。バイカル湖では今月、氷が標識付きの冬季道路を車で渡れるほど厚くなる。春の雪解けが始まればまた考えられなくなる話である。",
    ),
    f: t(
      "Maslenitsa's roots predate Christianity as a Slavic welcome to spring, and the Orthodox Church folded the existing festival into the run-up to Lent rather than replacing it outright, which is why a week of butter-heavy indulgence still precedes forty days of fasting.|Las raíces de la Maslenitsa son anteriores al cristianismo, como bienvenida eslava a la primavera, y la Iglesia ortodoxa incorporó la fiesta existente a la antesala de la Cuaresma en vez de sustituirla del todo.|Les racines de Maslenitsa précèdent le christianisme, en tant qu'accueil slave du printemps, et l'Église orthodoxe a intégré la fête existante dans les préparatifs du Carême plutôt que de la remplacer purement.|マースレニツァの起源はキリスト教以前、春を迎えるスラヴの祭りにさかのぼり、正教会はこの既存の祭りを完全に置き換えるのではなく、四旬節前の期間に組み込んだ。バターをふんだんに使う一週間の放縦がいまも四十日の断食の前に置かれているのは、そのためである。",
    ),
  },
];
