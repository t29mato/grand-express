/**
 * スペインの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国と同じく「地方まるごとの好不況」で差をつける
 * (実際の効果は `src/infrastructure/content/season-and-doom-rules.ts` 側に置く)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const SPAIN_META = {
  id: "spain",
  name: t("Spain|España|Espagne|スペイン"),
  blurb: t(
    "A high, dry plateau of four languages and a rail gauge that stops dead at the French border|Una alta y seca meseta de cuatro lenguas y un ancho de vía que se detiene en seco en la frontera francesa|Un haut plateau aride à quatre langues et un écartement de voie qui s'arrête net à la frontière française|四つの言語を持つ乾いた高原と、フランス国境でぴたりと止まる軌間",
  ),
  // ユーロ。他のユーロ圏(フランスなど)と同じく×100で揃えてある。
  cur: { pre: "€", post: "", mul: 100 },
  start: "madrid",
  cpuNames: ["Trasgu", "Xana", "Nuberu", "Ratoncito Pérez"],
  // 国旗の赤・金に、アル=アンダルスの緑、大西洋の青、古文書の生成り色を足した帯。
  stripe: ["#aa151b", "#f1bf00", "#2e7d32", "#1e4a6f", "#f2e9dc"],
};

/** 8地方。 */
export const SPAIN_REGIONS = {
  ctr: t("Castile, the high Meseta|Castilla, la Meseta alta|La Castille, la haute Meseta|カスティーリャ(高原メセタ)"),
  ext: t("Extremadura|Extremadura|Estrémadure|エストレマドゥーラ"),
  cat: t("Catalonia|Cataluña|Catalogne|カタルーニャ"),
  eus: t("the Basque Country & Navarre|el País Vasco y Navarra|le Pays basque et la Navarre|バスク州とナバラ"),
  nor: t("the Cantabrian coast|la cornisa cantábrica|la corniche cantabrique|カンタブリア海岸"),
  gal: t("Galicia|Galicia|Galice|ガリシア"),
  and: t("Andalusia|Andalucía|Andalousie|アンダルシア"),
  est: t("Aragon, the Levante & Murcia|Aragón, el Levante y Murcia|L'Aragon, le Levant et Murcie|アラゴン・レバンテ・ムルシア"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 既存の全盤面の鍵一覧と照合し、衝突が無いことを確認済み(encierro / itinerario /
 * talgo / ave / azabache / esquila / apuntes / decimo / carajillo)。
 */
export const SPAIN_ITEMS = {
  encierro: {
    e: "🐂",
    price: 260,
    kind: "move",
    n: t("Swept Up in the Running of the Bulls|Arrastrado por el encierro|Emporté par l'encierro|牛追いに巻き込まれて"),
    d: t(
      "Carried 8–12 squares. The bulls pick where you end up.|Te lleva de 8 a 12 casillas. Los toros eligen dónde acabas.|Emporté de 8 à 12 cases. Les taureaux choisissent où tu finis.|8〜12マス運ばれる。どこに着くかは牛まかせ。",
    ),
    f: t(
      "The bulls run in Pamplona's encierro are the same animals fought that evening, so the morning run is, from the animals' point of view, simply the first half of a day that ends the same way for all six. Runners are advised never to move in a group of more than two or three, since a cluster is far more likely to trip and pile up than a single person moving alone.|Los toros del encierro de Pamplona son los mismos que se lidiarán esa tarde, así que la carrera matinal es, desde el punto de vista de los animales, la primera mitad de un día que termina igual para los seis. A los corredores se les aconseja no moverse nunca en grupos de más de dos o tres, pues un grupo grande cae y se amontona con más facilidad que una sola persona.|Les taureaux de l'encierro de Pampelune sont les mêmes qui seront combattus ce soir-là, si bien que la course matinale est, du point de vue des animaux, la première moitié d'une journée qui finit de la même façon pour les six. Il est conseillé aux coureurs de ne jamais se déplacer en groupe de plus de deux ou trois, un attroupement trébuchant bien plus facilement qu'une personne seule.|パンプローナのエンシエロで走らされる牛は、その日の夕方に闘牛にかけられるのと同じ個体である。牛からすれば、朝の牛追いは6頭とも同じ結末を迎える一日の前半にすぎない。走者は二、三人より多い集団で動かないよう助言される。単独より集団のほうがつまずいて折り重なりやすいからである。",
    ),
  },
  itinerario: {
    e: "🥾",
    price: 380,
    kind: "pre",
    n: t("A Pilgrim's Route Sheet|Una hoja de ruta del peregrino|Une feuille de route de pèlerin|巡礼者の道のり表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Pilgrims on the Camino de Santiago carry a credencial, a paper passport stamped at albergues and churches along the way, required as proof of the route walked before the cathedral will issue a Compostela certificate. Regions have long argued over which of the half-dozen historic branches counts as the 'real' Camino, though the cathedral itself recognises all of them equally.|Los peregrinos del Camino de Santiago llevan una credencial, un pasaporte de papel sellado en albergues e iglesias por el camino, exigido como prueba de la ruta recorrida antes de que la catedral expida la Compostela. Las regiones llevan tiempo discutiendo cuál de las media docena de ramales históricos es el Camino 'de verdad', aunque la propia catedral los reconoce todos por igual.|Les pèlerins du Camino de Santiago portent une credencial, un passeport de papier tamponné dans les gîtes et les églises en chemin, exigé comme preuve du trajet parcouru avant que la cathédrale ne délivre la Compostela. Les régions se disputent depuis longtemps pour savoir laquelle des six branches historiques est le « vrai » Camino, bien que la cathédrale les reconnaisse toutes à égalité.|サンティアゴ巡礼路の巡礼者は「クレデンシアル」と呼ばれる紙の通行手形を携え、道中のアルベルゲや教会でスタンプを押してもらう。大聖堂が巡礼証明書「コンポステーラ」を発行する前に、歩いた経路の証拠として求められるものである。半ダースほどある歴史的な支線のうちどれが「本物」の巡礼路かをめぐって各地方は長年言い争ってきたが、大聖堂自体はそのすべてを等しく認めている。",
    ),
  },
  talgo: {
    e: "🚈",
    price: 360,
    kind: "pre",
    n: t("Talgo Ticket|Billete de Talgo|Billet Talgo|タルゴ切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Talgo trains use an articulated, wheel-less-axle design patented in the 1940s that lets each carriage tilt independently into curves, and the variable-gauge technology built on it in the 1960s is what still lets some services slide automatically from Spain's broad gauge onto France's standard gauge at the border. The name is itself an acronym: Tren Articulado Ligero Goicoechea Oriol, after its two inventors.|Los trenes Talgo usan un diseño articulado sin ejes rígidos patentado en los años cuarenta que permite a cada coche inclinarse de forma independiente en las curvas, y la tecnología de ancho variable desarrollada sobre esa base en los sesenta es la que aún permite a algunos servicios pasar automáticamente del ancho ibérico al europeo en la frontera. El nombre es en sí un acrónimo: Tren Articulado Ligero Goicoechea Oriol.|Les trains Talgo utilisent une conception articulée sans essieux rigides, brevetée dans les années 1940, qui permet à chaque voiture de s'incliner indépendamment dans les courbes, et la technologie à écartement variable développée sur cette base dans les années 1960 permet encore à certains services de glisser automatiquement de l'écartement ibérique à l'écartement européen à la frontière. Le nom est lui-même un acronyme : Tren Articulado Ligero Goicoechea Oriol.|タルゴ車両は1940年代に特許を取った、車軸を持たない連接構造で、各車両がカーブで独立して傾けるようになっている。1960年代にその上に築かれた軌間可変技術のおかげで、いまも一部の便は国境でスペインの広軌からヨーロッパの標準軌へ自動で滑り移ることができる。タルゴという名自体、二人の発明者にちなむ「軽量連接列車ゴイコエチェア・オリオル」の頭字語である。",
    ),
  },
  ave: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("AVE Ticket|Billete de AVE|Billet AVE|AVE切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Spain's first AVE line, Madrid to Seville, opened in April 1992 in time for the Seville Expo, and the operator's original punctuality guarantee — a full refund if a train ran more than five minutes late — proved so costly to honour that it was quietly dropped after a few years. Spain now has the longest high-speed rail network in Europe, though several lines run well under capacity outside peak travel dates.|La primera línea AVE de España, Madrid-Sevilla, se inauguró en abril de 1992 a tiempo para la Expo de Sevilla, y la garantía de puntualidad original del operador —devolución íntegra si un tren llegaba con más de cinco minutos de retraso— resultó tan costosa de cumplir que se retiró discretamente pocos años después. España tiene hoy la red de alta velocidad más larga de Europa, aunque varias líneas circulan muy por debajo de su capacidad fuera de fechas punta.|La première ligne AVE d'Espagne, Madrid-Séville, ouvrit en avril 1992 à temps pour l'Expo de Séville, et la garantie de ponctualité initiale de l'opérateur — remboursement intégral si un train avait plus de cinq minutes de retard — se révéla si coûteuse à tenir qu'elle fut discrètement abandonnée quelques années plus tard. L'Espagne possède aujourd'hui le plus long réseau à grande vitesse d'Europe, bien que plusieurs lignes roulent bien en dessous de leur capacité hors dates de pointe.|スペイン初のAVE路線、マドリード〜セビーリャ間は1992年4月、セビーリャ万博に間に合わせて開業した。運営会社が当初掲げた「5分以上遅れたら全額払い戻し」という定時運行保証は、守るにはあまりに費用がかさみ、数年後にひっそりと取り下げられた。スペインはいまやヨーロッパ最長の高速鉄道網を持つが、繁忙期以外は輸送力を大きく下回って走る路線も少なくない。",
    ),
  },
  azabache: {
    e: "🖤",
    price: 320,
    kind: "passive",
    n: t("A Jet-Black Azabache Charm|Un amuleto de azabache|Une amulette d'azabache noire|黒い黒玉(アサバチェ)の御守り",
    ),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Jet, a compressed form of fossilised wood mined for centuries in Asturias, is carved into small fist- or horn-shaped charms traditionally pinned to a baby's clothing against mal de ojo, the evil eye — a folk belief with close cousins across the Mediterranean. Pilgrims on the Camino de Santiago also carried azabache charms home as souvenirs, and medieval workshops in Santiago itself once specialised in carving them for exactly that trade.|El azabache, una forma comprimida de madera fosilizada extraída durante siglos en Asturias, se talla en pequeños amuletos con forma de puño o cuerno que tradicionalmente se prendían a la ropa de los bebés contra el mal de ojo, una creencia popular con primos cercanos por todo el Mediterráneo. Los peregrinos del Camino de Santiago también se llevaban amuletos de azabache como recuerdo, y talleres medievales de la propia Santiago se especializaron en tallarlos para ese comercio.|Le jais, une forme comprimée de bois fossilisé extrait pendant des siècles en Asturies, est taillé en petites amulettes en forme de poing ou de corne, traditionnellement épinglées aux vêtements d'un bébé contre le mal de ojo, le mauvais œil — une croyance populaire aux cousines proches tout autour de la Méditerranée. Les pèlerins du Camino de Santiago rapportaient aussi des amulettes d'azabache en souvenir, et des ateliers médiévaux de Saint-Jacques elle-même se spécialisaient dans leur taille pour ce commerce.|アストゥリアスで何世紀も採掘されてきた化石化した木材、黒玉(ジェット)は、握り拳や角の形をした小さな御守りに彫られ、悪い目「マル・デ・オホ」除けとして伝統的に赤子の服に留められた。地中海各地に似た民間信仰を持つ。サンティアゴ巡礼の巡礼者たちも黒玉の御守りを土産に持ち帰り、サンティアゴの街の中世の工房はまさにその商いのために彫刻を専門としていた。",
    ),
  },
  esquila: {
    e: "🔔",
    price: 440,
    kind: "pre",
    n: t("A Shepherd's Bronze Bell|Un cencerro de pastor|Une clochette de berger|羊飼いの青銅の鈴"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The bronze bells hung on transhumant sheep walked along the cañadas reales were tuned to slightly different pitches within the same flock, so a shepherd could tell from sound alone, without looking, whether the herd was drifting apart in fog or darkness. Village councils in parts of northern Spain still ring church or town bells in old, coded sequences to announce specific news — fire, a death, a call to assembly — separate from the sequence used for ordinary services.|Los cencerros de bronce colgados a las ovejas trashumantes que recorrían las cañadas reales se afinaban en tonos ligeramente distintos dentro del mismo rebaño, de modo que un pastor podía saber solo por el sonido, sin mirar, si el rebaño se dispersaba entre niebla u oscuridad. En partes del norte de España, algunos ayuntamientos aún tocan las campanas con secuencias antiguas y codificadas para anunciar noticias concretas: fuego, una muerte, una llamada a reunión.|Les clochettes de bronze accrochées aux moutons transhumants cheminant le long des cañadas reales étaient accordées sur des tons légèrement différents au sein d'un même troupeau, si bien qu'un berger pouvait savoir au seul son, sans regarder, si le troupeau se dispersait dans le brouillard ou l'obscurité. Dans certaines régions du nord de l'Espagne, des conseils municipaux sonnent encore les cloches selon d'anciennes séquences codées pour annoncer des nouvelles précises.|カニャーダ・レアル(移牧路)を歩く羊の群れに掛けられた青銅の鈴は、同じ群れの中でもわずかに違う音程に調律されていた。羊飼いは霧や暗闇の中でも、姿を見なくても音だけで群れがばらけているかどうかを聞き分けられた。スペイン北部の一部の村では、いまも教会や町の鐘を古くからの符牒的な鳴らし方で、火事・死者・招集といった特定の知らせを、ふだんの礼拝の合図とは別に伝えている。",
    ),
  },
  apuntes: {
    e: "📓",
    price: 140,
    kind: "passive",
    n: t("A Bound Set of Old Exam Notes|Un dosier de apuntes de examen viejos|Un dossier de vieilles notes d'examen|古い試験の手書きノート束"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Photocopy shops near Spanish university campuses have long done a brisk trade in bound sets of a specific professor's old exam questions and model answers, sold semi-officially and passed down between years of students in exactly the courses where the format rarely changes. Faculty who catch on sometimes respond by rewriting the exam from scratch every year, which itself becomes common knowledge students plan around.|Las fotocopisterías cerca de los campus españoles llevan tiempo haciendo un negocio activo con dosieres encuadernados de exámenes antiguos y respuestas modelo de un profesor concreto, vendidos de forma semioficial y transmitidos entre promociones en las asignaturas donde el formato apenas cambia. El profesorado que se da cuenta a veces responde reescribiendo el examen desde cero cada año.|Les photocopieurs près des campus espagnols font depuis longtemps un commerce actif de dossiers reliés d'anciens sujets d'examen et de corrigés types d'un professeur donné, vendus de façon semi-officielle et transmis entre promotions dans les matières où le format change rarement. Les enseignants qui s'en aperçoivent répondent parfois en réécrivant l'examen de zéro chaque année.|スペインの大学キャンパス近くのコピー屋は、特定の教授の過去問と模範解答をまとめた冊子で長らく手堅い商売をしてきた。半ば公然と売られ、出題形式がめったに変わらない科目では学年をまたいで受け継がれる。それに気づいた教員の中には、毎年ゼロから試験を書き直すことで応じる者もいるが、それ自体が学生のあいだで織り込み済みの知識になる。",
    ),
  },
  decimo: {
    e: "🎫",
    price: 280,
    kind: "pre",
    n: t("A Lucky Décimo Lottery Share|Un décimo de lotería premiado|Un décimo de loterie gagnant|当たった宝くじの十分の一券"),
    d: t(
      "Gain money immediately.|Gana dinero al instante.|Gagne de l'argent immédiatement.|即座にお金を得る。",
    ),
    f: t(
      "El Gordo, Spain's Christmas lottery draw on 22 December, sells tickets as whole billetes or shared décimos, one-tenth fractions, specifically so bars, workplaces and entire village associations can split a single number, spreading both the cost and, if it hits, the winnings across dozens of people at once. Losing tickets are traditionally not thrown away right away, since a small consolation prize is paid to numbers sharing the top prize's last two digits.|El Gordo, el sorteo de Navidad de España el 22 de diciembre, vende billetes enteros o décimos compartidos, para que bares, oficinas y asociaciones de pueblos enteros puedan repartir un mismo número, repartiendo tanto el coste como, si toca, el premio entre docenas de personas a la vez. Los billetes perdedores tradicionalmente no se tiran enseguida, porque se paga un pequeño premio de consolación a los números que comparten las dos últimas cifras del premio mayor.|El Gordo, le tirage de la loterie de Noël espagnole le 22 décembre, vend des billets entiers ou des décimos partagés, des dixièmes, spécialement pour que bars, bureaux et associations de village entiers puissent se répartir un même numéro. Les billets perdants ne sont traditionnellement pas jetés tout de suite, un petit lot de consolation étant versé aux numéros partageant les deux derniers chiffres du gros lot.|12月22日に開催されるスペインのクリスマス宝くじ「エル・ゴルド」は、丸ごとの券「ビリェーテ」だけでなく十分の一に分けた「デシモ」でも売られる。バーや職場、村の団体が同じ番号を分け合い、費用も当たった場合の賞金も何十人もで分け合えるようにするためである。外れ券もすぐには捨てられない習わしがある。1等の下二桁が一致する番号にはささやかな慰め賞が出るからである。",
    ),
  },
  carajillo: {
    e: "☕",
    price: 420,
    kind: "pre",
    n: t("A Shot of Carajillo Coffee|Un carajillo|Un carajillo|カラヒージョの一杯"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A carajillo — coffee with a shot of brandy, rum or anisette, sometimes flamed at the table — was traditionally drunk by manual labourers before an early shift or a long stretch of physical work rather than as an after-dinner drink. The name is often traced to coraje, courage, on the theory that the alcohol was meant to supply some before a hard day began.|El carajillo —café con un chorro de coñac, ron o anís, a veces flambeado en la mesa— lo bebían tradicionalmente los trabajadores manuales antes de un turno temprano o una larga jornada física, y no como digestivo tras la cena. El nombre suele rastrearse hasta 'coraje', por la idea de que el alcohol debía aportar algo de él antes de empezar un día duro.|Le carajillo — café avec un trait de cognac, de rhum ou d'anisette, parfois flambé à table — était traditionnellement bu par les travailleurs manuels avant une prise de poste matinale ou une longue journée physique, plutôt qu'en digestif après le dîner. Le nom serait souvent lié à 'coraje', le courage, l'alcool étant censé en fournir un peu avant une dure journée.|カラヒージョ――ブランデーやラム酒、アニス酒を一杯加えたコーヒーで、卓上で炎を上げることもある――は、伝統的には食後の一杯としてではなく、早朝の勤務や長い肉体労働の前に労働者が飲むものだった。その名は「勇気」を意味するコラヘに由来するとよく言われる。きつい一日が始まる前に、その勇気を少し授けるための酒だったという説である。",
    ),
  },
};

/**
 * 厄災の神。アストゥリアス・カンタブリアの民話に伝わるトラスグ(赤い尖り帽子と
 * 手のひらの穴が特徴の家つき妖精)にした。人を苦しめる悪霊ではなく、
 * 手のひらの穴のせいでいつも物を落とすだけの、いたずら好きな厄介者として描く
 * (韓国のトッケビ・茨城のダイダラボウと同じく「残酷ではなく、ただ度が過ぎる」性格)。
 */
export const SPAIN_SPIRIT = {
  e: "👺",
  n: t("The Trasgu|El Trasgu|Le Trasgu|トラスグ"),
  big: t("The Trasgu's Red Cap Wager|La apuesta del gorro rojo del Trasgu|Le pari du bonnet rouge du Trasgu|トラスグの赤い帽子の賭け"),
  ward: "azabache",
  arrive: t(
    "<b>👺 A trasgu has taken an interest in you.</b> Asturian tales describe this household goblin as small, quick and mischievous rather than cruel, marked by a red pointed cap and a hole clean through one palm that makes him drop nearly everything he tries to carry. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👺 Un trasgu se ha fijado en ti.</b> Los cuentos asturianos describen a este duende doméstico como pequeño, rápido y travieso más que cruel, con un gorro rojo puntiagudo y un agujero que le atraviesa una palma y le hace dejar caer casi todo lo que intenta llevar. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👺 Un trasgu s'est intéressé à toi.</b> Les contes asturiens décrivent ce lutin domestique comme petit, vif et espiègle plutôt que cruel, marqué par un bonnet rouge pointu et un trou traversant une paume, qui le fait lâcher presque tout ce qu'il tente de porter. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👺 トラスグに目を付けられた。</b> アストゥリアスの昔話によれば、この家つきの妖精は残酷というより小柄ですばしこく、いたずら好きだという。赤い尖り帽子をかぶり、片方の手のひらに穴が空いていて、運ぼうとするものをほとんど落としてしまう。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👺 <b>The trasgu</b> loses interest and hops after <b>{0}</b>, farthest from {1}.|👺 <b>El trasgu</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|👺 <b>Le trasgu</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|👺 <b>トラスグ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the trasgu and never once found where he hides his red cap. Bored of the quiet, he hides it somewhere on {0}'s own person as a dare — <b>the Trasgu's Red Cap Wager</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al trasgu sin haber encontrado jamás dónde esconde su gorro rojo. Aburrido del silencio, lo esconde en la propia persona de {0} como desafío: empieza <b>la apuesta del gorro rojo del Trasgu</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le trasgu sans jamais avoir trouvé où il cache son bonnet rouge. Lassé du calme, il le cache quelque part sur {0} lui-même en guise de défi : <b>le pari du bonnet rouge du Trasgu</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもトラスグと歩いていながら、彼が赤い帽子をどこに隠しているのか一度も見つけられなかった。静けさに飽きた彼は、挑発として帽子を{0}自身のどこかに隠してしまう。<b>トラスグの赤い帽子の賭け</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in Asturian tradition, whoever manages to snatch a trasgu's red cap is said to gain power over him until it is given back. Nobody playing this game has managed it yet — the cap, wherever it is hidden, has never once turned up.|<b>Tras la historia:</b> en la tradición asturiana, quien logra arrebatarle el gorro rojo a un trasgu gana poder sobre él hasta devolvérselo. Nadie en esta partida lo ha logrado todavía: el gorro, dondequiera que esté escondido, nunca ha aparecido.|<b>Derrière l'histoire :</b> dans la tradition asturienne, quiconque parvient à arracher son bonnet rouge à un trasgu obtient un pouvoir sur lui jusqu'à ce qu'il le lui rende. Personne dans cette partie n'y est encore parvenu — le bonnet, où qu'il soit caché, n'a jamais refait surface.|<b>物語の背景:</b> アストゥリアスの言い伝えでは、トラスグの赤い帽子を奪い取った者は、それを返すまで彼を意のままにできるという。この旅でそれに成功した者はまだいない。帽子はどこに隠されていようと、一度も見つかったことがない。",
  ),
  pleased: t(
    "He tries to juggle a handful of coins with his holed palm, and most of them spill loose onto the road. <b>{0}</b> gains <span class='money'>+{1}</span>.|Intenta hacer malabares con un puñado de monedas con la palma agujereada, y la mayoría se le caen sueltas al camino. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il tente de jongler avec une poignée de pièces dans sa paume trouée, et la plupart tombent éparpillées sur la route. <b>{0}</b> gagne <span class='money'>+{1}</span>.|穴の空いた手のひらで一握りの硬貨を器用に回そうとして、そのほとんどが道にこぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A black azabache charm glints where he can see it, hung by the door. Trasgus are said to be wary of jet, and he sidles past <b>{0}</b> without noticing this turn.|Un amuleto de azabache negro brilla donde él puede verlo, colgado junto a la puerta. Se dice que los trasgus recelan del azabache, y pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une amulette de jais noir brille là où il peut la voir, suspendue près de la porte. On dit que les trasgus se méfient du jais, et il passe devant <b>{0}</b> sans le remarquer ce tour-ci.|戸口に吊るした黒玉の御守りが、彼の目につくところで光っている。トラスグは黒玉を苦手とすると言われ、このターンは <b>{0}</b> に気づかないまますり抜けていった。",
  ),
};

/** 災難7種。トラスグのいたずら好きな性格に合わせつつ、実在の困りごとも混ぜてある。 */
export const SPAIN_DOOM = [
  {
    id: "calima",
    n: t("A Saharan haze rolls in|Llega una calima sahariana|Une brume saharienne s'installe|サハラの砂塵が舞い込む"),
    t: t(
      "The sky turns a dull orange by midday and the sun can be looked at almost directly through the haze, as a southerly wind carries fine reddish dust up from the Sahara across the Strait of Gibraltar. Cars, balconies and washing left outside pick up a fine ochre film by evening, and pharmacies sell out of eye drops faster than usual.|El cielo se vuelve de un naranja apagado a mediodía y se puede mirar el sol casi directamente a través de la calima, mientras el viento del sur arrastra fino polvo rojizo desde el Sáhara a través del Estrecho de Gibraltar. Coches, balcones y ropa tendida fuera acaban con una fina película ocre al anochecer, y las farmacias se quedan sin colirio antes de lo habitual.|Le ciel vire à l'orange terne dès midi et l'on peut presque regarder le soleil en face à travers la brume, tandis qu'un vent du sud charrie une fine poussière rougeâtre depuis le Sahara par le détroit de Gibraltar. Voitures, balcons et linge laissés dehors se couvrent d'un fin film ocre au soir venu, et les pharmacies se retrouvent à court de collyre plus vite que d'habitude.|正午には空が鈍い橙色に染まり、もやを通せば太陽をほぼ直視できるほどになる。南風がサハラ砂漠から細かい赤茶けた砂をジブラルタル海峡越しに運んでくるからだ。夕方には外に出しておいた車もバルコニーも洗濯物も薄いオークル色の膜をかぶり、薬局ではいつもより早く目薬が売り切れる。",
    ),
  },
  {
    id: "ola-calor",
    n: t("A heatwave slows the rails|Una ola de calor frena los raíles|Une canicule ralentit les rails|熱波がレールを鈍らせる"),
    t: t(
      "When surface rail temperatures climb high enough to risk warping the track, the operator imposes speed restrictions on affected lines rather than risk a derailment, and journeys that normally take a couple of hours stretch out with no clear new arrival time given. Station announcements apologise in the same flat tone every summer, as if reading from a script nobody bothers to update.|Cuando la temperatura de la superficie del raíl sube lo bastante para arriesgar una deformación de la vía, el operador impone restricciones de velocidad en las líneas afectadas antes que arriesgar un descarrilamiento, y trayectos que normalmente duran un par de horas se alargan sin que se dé una hora de llegada clara. Los avisos de estación piden disculpas cada verano con el mismo tono neutro, como leyendo un guion que nadie se molesta en actualizar.|Quand la température de surface du rail grimpe assez pour risquer de déformer la voie, l'opérateur impose des restrictions de vitesse sur les lignes concernées plutôt que de risquer un déraillement, et des trajets qui durent normalement deux heures s'étirent sans qu'une nouvelle heure d'arrivée soit clairement donnée. Les annonces en gare s'excusent chaque été sur le même ton neutre, comme si elles lisaient un texte que personne ne prend la peine de mettre à jour.|レールの表面温度が歪みかねないほど上がると、鉄道会社は脱線の危険を避けるため該当区間に速度制限をかける。普段は2時間ほどの行程が、はっきりした新しい到着時刻も告げられないまま延びる。駅の放送は毎年夏、同じ抑揚のない口調で詫びを繰り返す。誰も更新しない台本を読んでいるかのように。",
    ),
    months: [2, 3, 4],
  },
  {
    id: "dana",
    n: t("A DANA storm floods the tracks|Una DANA inunda las vías|Une DANA inonde les voies|DANAが線路を水浸しにする"),
    t: t(
      "A pocket of cold air trapped high over the warm Mediterranean drops as sudden, violent rain that can dump a year's average rainfall in a single day on the coast; rivers that were dry riverbeds a week earlier rise fast enough to close level crossings and flood low sections of track. Trains are held at the nearest station until engineers confirm the line is safe to run again.|Una bolsa de aire frío atrapada en altura sobre el Mediterráneo cálido cae en forma de lluvia repentina y violenta que puede descargar en un solo día la lluvia media de todo un año en la costa; ríos que una semana antes eran cauces secos suben tan rápido que cierran pasos a nivel e inundan tramos bajos de vía. Los trenes se retienen en la estación más cercana hasta que los ingenieros confirman que la línea es segura.|Une poche d'air froid piégée en altitude au-dessus de la Méditerranée chaude retombe en pluies soudaines et violentes pouvant déverser en une seule journée sur la côte la pluviométrie moyenne d'une année entière ; des rivières qui n'étaient que des lits secs une semaine plus tôt montent assez vite pour fermer des passages à niveau et inonder des tronçons bas de la voie. Les trains sont retenus à la gare la plus proche jusqu'à ce que les ingénieurs confirment que la ligne est sûre.|暖かい地中海の上空高くに閉じ込められた寒気の塊が、突然の激しい雨となって落ちてくる。海沿いでは一年分の平均降水量が一日で降ることもある。一週間前まで乾いた川床だった川が、踏切を閉じさせ低い区間の線路を水浸しにするほどの速さで増水する。技術者が線路の安全を確認するまで、列車は最寄りの駅に留め置かれる。",
    ),
    months: [5, 6],
  },
  {
    id: "huelga",
    n: t("A rail strike halts the timetable|Una huelga ferroviaria paraliza el horario|Une grève ferroviaire paralyse l'horaire|ストライキが時刻表を止める"),
    t: t(
      "A union calls a one-day strike over pay or staffing, and the operator publishes a skeleton 'servicios mínimos' schedule required by law, usually covering only a fraction of normal departures at the busiest hours. Platforms fill with more people than the reduced trains can carry, and station clocks become mostly decorative for the day.|Un sindicato convoca una huelga de un día por salario o plantilla, y el operador publica un horario mínimo de 'servicios mínimos' exigido por ley, que suele cubrir solo una fracción de las salidas normales en las horas de más afluencia. Los andenes se llenan de más gente de la que los trenes reducidos pueden llevar, y los relojes de la estación se vuelven casi decorativos por un día.|Un syndicat appelle à une grève d'une journée pour les salaires ou les effectifs, et l'opérateur publie un horaire minimal de « services minimums » exigé par la loi, ne couvrant généralement qu'une fraction des départs normaux aux heures de pointe. Les quais se remplissent de plus de monde que les trains réduits ne peuvent en transporter, et les horloges de gare deviennent surtout décoratives pour la journée.|組合が賃金や人員をめぐって一日限りのストライキを呼びかけると、鉄道会社は法律で義務付けられた「最低限のサービス」の時刻表を発表する。たいていは混雑時間帯の通常便のごく一部しかカバーしない。ホームには減便した列車が運びきれないほどの人が集まり、駅の時計はその日一日、ほとんど飾りと化す。",
    ),
  },
  {
    id: "siesta",
    n: t("The whole street shuts for siesta|Toda la calle cierra para la siesta|Toute la rue ferme pour la sieste|通り全体がシエスタで閉まる"),
    t: t(
      "Between roughly two and five in the afternoon, especially in smaller towns, shutters come down on shops, ticket windows and even some station kiosks at once, following working hours set generations ago around the hottest part of the day rather than around a traveller's schedule. Anyone needing a ticket, a form stamped, or simply a bottle of water finds the whole street looking the same: closed.|Entre las dos y las cinco de la tarde, sobre todo en poblaciones pequeñas, bajan a la vez las persianas de tiendas, taquillas e incluso algunos quioscos de estación, siguiendo un horario laboral fijado generaciones atrás en torno a la hora de más calor y no al itinerario de un viajero. Quien necesite un billete, sellar un papel o simplemente agua se encuentra la calle entera igual: cerrada.|Entre deux et cinq heures de l'après-midi environ, surtout dans les petites villes, les rideaux des boutiques, des guichets et même de certains kiosques de gare tombent tous en même temps, selon des horaires de travail fixés des générations plus tôt autour de l'heure la plus chaude plutôt qu'autour de l'emploi du temps d'un voyageur. Quiconque a besoin d'un billet, d'un tampon sur un papier ou simplement d'eau trouve toute la rue pareillement fermée.|だいたい午後2時から5時のあいだ、特に小さな町では、店も窓口も駅の売店までもがいっせいにシャッターを下ろす。何世代も前に、旅人の都合ではなく一日でいちばん暑い時間帯を基準に決められた労働時間の名残である。切符を買いたい人も、書類に判をもらいたい人も、ただ水が欲しい人も、通り全体が同じように閉まっているのを見ることになる。",
    ),
  },
  {
    id: "procesion",
    n: t("A procession seals off the street to the station|Una procesión sella la calle hacia la estación|Une procession scelle la rue vers la gare|行列が駅への通りを封じる"),
    t: t(
      "A brass band, a slow-moving float and a crowd several rows deep block the most direct route to the station without warning, timed to a religious calendar or a local saint's day a visitor has no reason to know in advance. Police barriers only come down once the procession has fully passed, and cutting through the crowd is slower than simply waiting it out.|Una banda de música, un paso que avanza despacio y una multitud de varias filas de fondo cortan sin previo aviso la ruta más directa a la estación, al ritmo de un calendario religioso o la festividad de un santo local que un visitante no tiene motivo para conocer de antemano. Las barreras policiales no se retiran hasta que la procesión ha pasado por completo.|Une fanfare, un char processionnel avançant lentement et une foule sur plusieurs rangs bloquent sans prévenir l'itinéraire le plus direct vers la gare, au rythme d'un calendrier religieux ou de la fête d'un saint local qu'un visiteur n'a aucune raison de connaître à l'avance. Les barrières de police ne sont levées qu'une fois la procession entièrement passée.|吹奏楽団と、ゆっくり進む山車、そして何列にも連なる人だかりが、前触れもなく駅への最短路を塞ぐ。宗教暦や地元の聖人の祝日に合わせたもので、訪れた者には前もって知りようがない。警察の柵は行列が完全に通り過ぎるまで下ろされず、人混みを縫って進むより、ただ待つほうが結局は速い。",
    ),
    months: [11, 0],
  },
  {
    id: "carterista",
    n: t("A pickpocket works the crowded market|Un carterista trabaja el mercado abarrotado|Un pickpocket sévit sur le marché bondé|混み合う市場ですりが働く"),
    t: t(
      "A light shoulder bump in the thick of a crowded market stall row passes for nothing more than the usual jostle, and it is only a few stalls later that the missing weight in a pocket or bag becomes obvious. Market noise and shoppers haggling out loud make an ideal cover, and by the time anyone thinks to check, the trail is already gone cold.|Un ligero golpe de hombro en pleno gentío de un mercado abarrotado pasa por el simple empujón habitual, y solo unos puestos más allá se hace evidente el peso que falta en un bolsillo o bolso. El ruido del mercado y el gentío regateando en voz alta son la tapadera perfecta, y cuando a alguien se le ocurre comprobarlo, el rastro ya se ha enfriado.|Un léger coup d'épaule au cœur de la cohue d'un marché bondé passe pour la simple bousculade habituelle, et ce n'est que quelques étals plus loin que le poids manquant dans une poche ou un sac devient évident. Le bruit du marché et les acheteurs marchandant à voix haute offrent une couverture idéale, et le temps que quiconque songe à vérifier, la piste est déjà froide.|混み合う市場の露店が並ぶあいだで軽く肩がぶつかっても、いつもの人混みの押し合いにしか感じない。数軒先の店に来てようやく、ポケットやかばんの軽さに気づく。市場のざわめきと値切り合う買い物客の喧騒が絶好の隠れみのとなり、気づいたときにはもう手がかりは冷え切っている。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の spain の項。
 */
export const SPAIN_SEASONS = [
  {
    e: "🕯️",
    n: t("Holy Week processions carry the streets|La Semana Santa toma las calles|La Semaine sainte envahit les rues|聖週間の行列が街を練り歩く"),
    t: t(
      "Hooded penitents called nazarenos file for hours behind wooden pasos, huge sculpted platforms of Christ or the Virgin carried on the shoulders of costaleros hidden beneath the float's skirts, swaying to a drumbeat only they can hear from inside. In Seville a lone unaccompanied voice sometimes cuts through the crowd with a saeta, an improvised flamenco lament aimed straight at the passing image.|Penitentes encapuchados llamados nazarenos desfilan durante horas tras pasos de madera, enormes plataformas esculpidas de Cristo o la Virgen cargadas a hombros por costaleros ocultos bajo los faldones del trono, meciéndose al ritmo de un tambor que solo ellos oyen desde dentro. En Sevilla, a veces una sola voz sin acompañamiento corta entre la multitud con una saeta.|Des pénitents encapuchonnés appelés nazarenos défilent des heures durant derrière des pasos de bois, immenses plateformes sculptées du Christ ou de la Vierge portées sur les épaules de costaleros cachés sous les jupes du char, se balançant au rythme d'un tambour qu'eux seuls entendent de l'intérieur. À Séville, une voix seule et sans accompagnement perce parfois la foule avec une saeta.|「ナサレノ」と呼ばれる頭巾姿の贖罪者たちは、キリストや聖母を彫った巨大な山車「パソ」の後ろを何時間も練り歩く。山車の裾に隠れた「コスタレロ」たちが肩で担ぎ、内側からしか聞こえない太鼓の音に合わせて揺らす。セビーリャでは、伴奏の無いただ一つの声が群衆を切り裂くように、通り過ぎる聖像へ即興のフラメンコの哀歌「サエタ」を投げかけることもある。",
    ),
    f: t(
      "The pointed hood, the capirote, predates any association with Ku Klux Klan robes by centuries — it originated as a medieval Spanish penitent's coning cap, and historians trace both costumes independently back to wider medieval European penitential dress rather than one copying the other.|El capirote puntiagudo es siglos anterior a cualquier asociación con las túnicas del Ku Klux Klan: nació como el gorro cónico del penitente español medieval, y los historiadores rastrean ambos trajes de forma independiente hasta la vestimenta penitencial medieval europea más amplia.|Le capirote pointu précède de plusieurs siècles toute association avec les robes du Ku Klux Klan : il est né comme la coiffe conique du pénitent espagnol médiéval, et les historiens font remonter les deux costumes indépendamment à la tenue pénitentielle médiévale européenne plus large.|尖った頭巾「カピロテ」は、クー・クラックス・クランのローブとの結びつきよりも何世紀も前にさかのぼる。もとは中世スペインの贖罪者がかぶった円錐形の帽子で、歴史家たちは両者の衣装を、一方が他方を真似たのではなく、より広い中世ヨーロッパの贖罪服の伝統からそれぞれ独立に生まれたものとしている。",
    ),
  },
  {
    e: "🪴",
    n: t("Córdoba opens its courtyards to strangers|Córdoba abre sus patios a los desconocidos|Cordoue ouvre ses patios aux inconnus|コルドバが見知らぬ人に中庭を開く"),
    t: t(
      "For a couple of weeks each May, homeowners in Córdoba's old quarter throw open their private courtyards, walls packed floor to ceiling with potted geraniums and carnations around a central well or fountain, for a competition judged on watering discipline as much as colour. The tradition of a walled courtyard, common across the old Islamic quarters of Andalusia, began as a way to cool the air through shade and evaporation rather than to grow flowers at all.|Durante un par de semanas cada mayo, los propietarios del casco antiguo de Córdoba abren sus patios privados, con muros cubiertos de suelo a techo de geranios y claveles en macetas en torno a un pozo o fuente central, para un concurso que valora tanto la disciplina del riego como el color. La tradición del patio amurallado, común en los antiguos barrios islámicos de Andalucía, nació como forma de refrescar el aire mediante sombra y evaporación, no para cultivar flores.|Pendant deux semaines chaque mois de mai, les habitants de la vieille ville de Cordoue ouvrent leurs patios privés, aux murs couverts du sol au plafond de géraniums et d'œillets en pots autour d'un puits ou d'une fontaine centrale, pour un concours jugé autant sur la discipline d'arrosage que sur la couleur. La tradition du patio muré, courante dans les anciens quartiers islamiques d'Andalousie, naquit comme moyen de rafraîchir l'air par l'ombre et l'évaporation plutôt que pour cultiver des fleurs.|5月の数週間、コルドバの旧市街の住人は自宅の中庭を見知らぬ人に開放する。井戸や噴水を囲む壁は床から天井まで鉢植えのゼラニウムとカーネーションで埋め尽くされ、色合いだけでなく水やりの丹念さも競う品評会が開かれる。アンダルシアの旧イスラム地区に共通するこの壁で囲んだ中庭の伝統は、そもそも花を育てるためではなく、日陰と蒸発で空気を涼しく保つための工夫として始まった。",
    ),
    f: t(
      "UNESCO added the Patios Festival to its Intangible Cultural Heritage list in 2012, one of the few times the recognition went to residents maintaining their own homes rather than to a monument, a museum or a performance.|La UNESCO incluyó la Fiesta de los Patios en su lista de Patrimonio Cultural Inmaterial en 2012, uno de los pocos casos en que el reconocimiento recayó en vecinos que cuidan sus propias casas y no en un monumento, un museo o una representación.|L'UNESCO ajouta la Fête des Patios à sa liste du patrimoine culturel immatériel en 2012, l'une des rares fois où la reconnaissance alla à des habitants entretenant leur propre maison plutôt qu'à un monument, un musée ou une représentation.|ユネスコは2012年、パティオ祭りを無形文化遺産に登録した。記念碑でも美術館でも芸能でもなく、住民が自宅を手入れする営みそのものが認められた数少ない例の一つである。",
    ),
  },
  {
    e: "🔥",
    n: t("Bonfires burn away the year up to now|Las hogueras queman el año hasta ahora|Des feux de joie brûlent l'année écoulée|かがり火がこれまでの一年を焼く"),
    t: t(
      "On the night before Saint John's feast day, close to the summer solstice, beaches across Spain fill with bonfires that people jump over — traditionally three times — to burn away bad luck before the new half of the year begins, and midnight swimmers wade into the sea for the same reason. Fireworks keep going well past dawn in some coastal towns, and cleanup crews spend the following day clearing beaches that were, briefly, more fire than sand.|La noche anterior a San Juan, cerca del solsticio de verano, las playas de toda España se llenan de hogueras que la gente salta —tradicionalmente tres veces— para quemar la mala suerte antes de que empiece la segunda mitad del año, y los bañistas de medianoche entran al mar por el mismo motivo. Los fuegos artificiales siguen bien pasado el amanecer en algunos pueblos costeros.|La nuit précédant la Saint-Jean, proche du solstice d'été, les plages espagnoles se remplissent de feux de joie que l'on saute — traditionnellement trois fois — pour brûler la malchance avant que ne débute la seconde moitié de l'année, et les baigneurs de minuit entrent dans la mer pour la même raison. Les feux d'artifice continuent bien après l'aube dans certaines villes côtières.|夏至に近い聖ヨハネの祝日前夜、スペイン各地の浜辺はかがり火で埋まる。人々は伝統的に三度、その火を飛び越えて厄を焼き払い、一年の後半を迎える。真夜中に海へ入る海水浴もまた同じ意味を持つ。一部の沿岸の町では花火が夜明けをとうに過ぎても続き、翌日には清掃隊が、つかのま砂より火のほうが多かった浜辺を片付ける。",
    ),
    f: t(
      "The custom predates Christianity, tied originally to the solstice itself, and the Church folded it into Saint John's nativity feast rather than replacing it outright, which is why fire-jumping has survived under a saint's name that has little to do with fire.|La costumbre es anterior al cristianismo, ligada originalmente al propio solsticio, y la Iglesia la incorporó a la fiesta de la natividad de San Juan en vez de sustituirla del todo, por lo que saltar hogueras ha sobrevivido bajo el nombre de un santo que poco tiene que ver con el fuego.|La coutume précède le christianisme, liée à l'origine au solstice lui-même, et l'Église l'intégra à la fête de la nativité de saint Jean plutôt que de la remplacer purement, ce qui explique que le saut des feux ait survécu sous le nom d'un saint qui n'a guère à voir avec le feu.|この風習はキリスト教以前から、もともと夏至そのものに結び付いていたもので、教会はこれを完全に置き換えるのではなく聖ヨハネの誕生祭に取り込んだ。だから火とはほとんど関係のない聖人の名の下で、火を飛び越える習わしがいまも生き残っている。",
    ),
  },
  {
    e: "🎆",
    n: t("A rocket opens nine days of San Fermín|Un cohete abre nueve días de San Fermín|Une fusée ouvre neuf jours de San Fermín|ロケット花火がサン・フェルミンの9日間を開く"),
    t: t(
      "At noon on 6 July, a rocket fired from Pamplona's town hall balcony, the chupinazo, opens nine days of the San Fermín festival, and the crowd below — already dressed head to toe in white with a single red scarf, the pañuelico — erupts before the smoke even clears. The scarf stays knotted around the neck for the entire nine days and is traditionally not washed until the festival closes with a crowd chant asking for one more year.|A mediodía del 6 de julio, un cohete lanzado desde el balcón del ayuntamiento de Pamplona, el chupinazo, abre nueve días de San Fermín, y la multitud de abajo —ya vestida de blanco de la cabeza a los pies con un único pañuelo rojo, el pañuelico— estalla antes de que se disipe el humo. El pañuelo permanece anudado al cuello los nueve días y tradicionalmente no se lava hasta que la fiesta termina.|À midi le 6 juillet, une fusée tirée depuis le balcon de la mairie de Pampelune, le chupinazo, ouvre neuf jours de fête de San Fermín, et la foule en contrebas — déjà vêtue de blanc de la tête aux pieds avec un unique foulard rouge, le pañuelico — explose avant même que la fumée ne se dissipe. Le foulard reste noué au cou durant les neuf jours et n'est traditionnellement pas lavé avant la clôture de la fête.|7月6日正午、パンプローナの市庁舎バルコニーから打ち上げられるロケット花火「チュピナソ」が、サン・フェルミン祭9日間の幕を開ける。すでに頭からつま先まで白ずくめに一枚の赤いスカーフ「パニュエリコ」を締めた眼下の群衆は、煙が晴れる前から沸き立つ。このスカーフは9日間ずっと首に結ばれたまま、祭りが「もう一年」を願う群衆の合唱で閉じるまで、慣習として洗われることはない。",
    ),
    f: t(
      "Ernest Hemingway is honoured with a bronze bust outside the bullring, placed there in 1968 by local bullfighting enthusiasts grateful for the tourism his writing brought — a rare case of a foreign author memorialised in the very town his writing helped make famous.|A Ernest Hemingway se le honra con un busto de bronce frente a la plaza de toros, colocado en 1968 por aficionados taurinos locales agradecidos por el turismo que trajo su obra: un caso raro de un autor extranjero conmemorado en el mismo pueblo que su escritura ayudó a hacer famoso.|Ernest Hemingway est honoré d'un buste de bronze devant les arènes, placé là en 1968 par des amateurs de tauromachie locaux reconnaissants du tourisme apporté par ses écrits — un cas rare d'un auteur étranger commémoré dans la ville même que son œuvre a contribué à rendre célèbre.|アーネスト・ヘミングウェイは闘牛場の外に立つ胸像で称えられている。1968年、彼の作品がもたらした観光客に感謝した地元の闘牛愛好家たちが建てたものである。外国人作家が、自らの筆によって有名にした当のその町で記念されるという、珍しい例である。",
    ),
  },
  {
    e: "🏖️",
    n: t("The whole country seems to close for August|Todo el país parece cerrar en agosto|Le pays entier semble fermer en août|8月、国じゅうが店じまいするように見える"),
    t: t(
      "Small shops and family businesses across Spain hang a hand-written 'cerrado por vacaciones' sign for two to four weeks in August, and in cities like Madrid entire neighbourhoods empty out toward the coast, leaving streets so quiet the silence is often remarked on more than the heat. Motorway operators publish daily 'operación salida' traffic forecasts for the weekends bracketing the month, since millions of households travel within the same few days rather than staggering their leave.|Pequeños comercios y negocios familiares de toda España cuelgan un cartel manuscrito de 'cerrado por vacaciones' durante dos a cuatro semanas en agosto, y en ciudades como Madrid barrios enteros se vacían hacia la costa, dejando calles tan silenciosas que a menudo se comenta más el silencio que el calor. Los operadores de autopistas publican previsiones diarias de tráfico de 'operación salida' para los fines de semana que enmarcan el mes.|Petits commerces et entreprises familiales de toute l'Espagne affichent un écriteau manuscrit 'cerrado por vacaciones' pendant deux à quatre semaines en août, et dans des villes comme Madrid des quartiers entiers se vident vers la côte, laissant des rues si silencieuses qu'on en remarque souvent plus le calme que la chaleur. Les gestionnaires d'autoroutes publient des prévisions de trafic quotidiennes pour les week-ends encadrant le mois.|スペイン各地の小さな店や家族経営の商店は、8月のあいだ2週間から4週間、手書きの「休暇のため休業」の札を下げる。マドリードのような都市では丸ごと一つの地区が海辺へ向けて空になり、通りは暑さより静けさのほうが話題になるほど静まり返る。高速道路会社は、この月を挟む週末ごとに「出発作戦」と呼ばれる日々の交通予報を発表する。何百万もの世帯が休暇を分散させず、同じ数日間に一斉に移動するからである。",
    ),
    f: t(
      "The pattern is not universal: hospitality and tourism-facing businesses in beach towns do the opposite, staying open through their busiest weeks of the year precisely because everyone else has decided to switch off.|El patrón no es universal: los negocios de hostelería y turismo de los pueblos de playa hacen lo contrario, permaneciendo abiertos en sus semanas más ajetreadas del año precisamente porque todos los demás han decidido desconectar.|Le schéma n'est pas universel : les commerces d'hôtellerie et de tourisme des stations balnéaires font l'inverse, restant ouverts durant leurs semaines les plus chargées de l'année, précisément parce que tout le monde a décidé de débrancher.|この型は一様ではない。海辺の町の宿泊業や観光業は正反対で、まさに他の誰もが店を閉じると決めたからこそ、一年でいちばん忙しい週を開けたまま過ごす。",
    ),
  },
  {
    e: "🍇",
    n: t("La Rioja picks its grapes by hand before dawn|La Rioja vendimia a mano antes del alba|La Rioja vendange à la main avant l'aube|ラ・リオハが夜明け前に手摘みでぶどうを摘む"),
    t: t(
      "Harvest crews in La Rioja often pick through the cooler hours before dawn so the grapes reach the press before the day's heat can start fermentation early, and the region's regulatory council certifies each year's harvest quality on a public five-tier scale, from 'regular' to 'excelente'. In Logroño the season opens with a ceremonial first-grape blessing, and a grape-treading festival draws crowds who queue to stomp barefoot in a shallow vat, a token echo of how the wine was pressed for most of its history.|Las cuadrillas de vendimia en La Rioja suelen recoger en las horas frescas antes del alba para que la uva llegue al lagar antes de que el calor del día adelante la fermentación, y el consejo regulador de la región certifica cada año la calidad de la cosecha en una escala pública de cinco niveles, de 'regular' a 'excelente'. En Logroño la temporada se abre con una bendición ceremonial de la primera uva.|Les équipes de vendange en La Rioja récoltent souvent durant les heures fraîches avant l'aube afin que le raisin atteigne le pressoir avant que la chaleur du jour n'amorce la fermentation, et le conseil régulateur de la région certifie chaque année la qualité de la récolte sur une échelle publique à cinq niveaux, de « regular » à « excelente ». À Logroño, la saison s'ouvre par une bénédiction cérémonielle du premier raisin.|ラ・リオハの収穫班は、日中の暑さが発酵を早めてしまう前にぶどうを搾り場へ届けようと、夜明け前の涼しい時間帯に摘むことが多い。地域の規制委員会は毎年の収穫の質を「普通」から「卓越」までの5段階で公に格付けする。ログローニョでは、その年最初のぶどうを祝福する儀式で収穫期が始まり、浅い桶で裸足のままぶどうを踏む祭りには、歴史の大半でワインが搾られてきた方法をなぞろうと行列ができる。",
    ),
    f: t(
      "Rioja's harvest quality rating, published every year since the 1980s, is one of the clearer public windows into how a wine region formally grades an entire vintage before a single bottle is sold.|La calificación de la cosecha de Rioja, publicada cada año desde los ochenta, es una de las ventanas públicas más claras a cómo una región vinícola califica formalmente toda una añada antes de vender una sola botella.|La note de récolte de la Rioja, publiée chaque année depuis les années 1980, offre l'une des fenêtres publiques les plus claires sur la façon dont une région viticole note formellement tout un millésime avant même la vente d'une seule bouteille.|1980年代から毎年公表されているラ・リオハの収穫格付けは、一本のボトルも売られる前にワイン産地がその年のヴィンテージ全体を公式にどう評価するかを、外から見える数少ない窓の一つである。",
    ),
    months: [5],
  },
  {
    e: "🌹",
    n: t("Zaragoza offers flowers to a pillar|Zaragoza ofrece flores a un pilar|Saragosse offre des fleurs à un pilier|サラゴサが柱に花を捧げる"),
    t: t(
      "Around 12 October, tens of thousands of people in regional costume file past the Basílica del Pilar in Zaragoza carrying flowers, building a towering mound at the feet of a statue of the Virgin over the course of a single day — a tradition formalised only in 1958 but now one of the festival's best-attended events. The same date is Spain's national holiday, marking the anniversary of the day in 1492 that a Genoese navigator's ships, sailing under the Castilian crown, first sighted land in the Caribbean.|Alrededor del 12 de octubre, decenas de miles de personas en traje regional desfilan ante la Basílica del Pilar de Zaragoza portando flores, levantando un montículo enorme a los pies de una imagen de la Virgen en el curso de un solo día. La misma fecha es la fiesta nacional de España, que conmemora el aniversario del día de 1492 en que los barcos de un navegante genovés, bajo la corona castellana, avistaron por primera vez tierra en el Caribe.|Vers le 12 octobre, des dizaines de milliers de personnes en costume régional défilent devant la Basílica del Pilar de Saragosse en portant des fleurs, élevant un monticule imposant aux pieds d'une statue de la Vierge en une seule journée. La même date est la fête nationale espagnole, marquant l'anniversaire du jour de 1492 où les navires d'un navigateur génois, naviguant sous la couronne castillane, aperçurent pour la première fois une terre dans les Caraïbes.|10月12日前後、地方衣装をまとった何万もの人々が花を手にサラゴサのピラール聖堂の前を練り歩き、たった一日のうちに聖母像の足元に花の山を築き上げる。1958年に定着した比較的新しい伝統だが、いまや祭りで最も人出の多い催しの一つになっている。同じ日はスペインの建国記念日でもあり、1492年、カスティーリャ王権のもとで航海したジェノヴァ出身の航海者の船団が、カリブ海で初めて陸地を視認した日を記念する。",
    ),
    f: t(
      "The flower mound is dismantled the same evening, and the blooms are donated to hospitals, retirement homes and other institutions across the city rather than left to wilt in place.|El montículo de flores se desmonta esa misma tarde, y las flores se donan a hospitales, residencias de mayores y otras instituciones de la ciudad en vez de dejarlas marchitar en el sitio.|Le monticule de fleurs est démonté le soir même, et les fleurs sont données à des hôpitaux, des maisons de retraite et d'autres institutions de la ville plutôt que laissées à faner sur place.|花の山はその日の晩のうちに解体され、その場でしおれさせるのではなく、市内の病院や高齢者施設などに寄贈される。",
    ),
    months: [6],
  },
  {
    e: "🐖",
    n: t("Villages turn one pig into a winter's meat|Los pueblos convierten un cerdo en la carne de todo el invierno|Les villages transforment un cochon en viande pour tout l'hiver|農村が一頭の豚を冬じゅうの食料に変える"),
    t: t(
      "In rural Extremadura, Castile and elsewhere, the matanza — the traditional slaughter, butchering and preserving of a household pig — has historically gathered extended family and neighbours for a full day of shared, exhausting work each November, turning one animal into hams for curing, sausages and rendered fat meant to last a family through winter. The timing follows the first hard cold snap rather than a fixed date, since the meat needs cold weather to cure safely without refrigeration.|En la Extremadura rural, Castilla y otros lugares, la matanza —el sacrificio, despiece y conservación tradicional del cerdo doméstico— ha reunido históricamente a familia extensa y vecinos para una jornada entera de trabajo compartido y agotador cada noviembre, convirtiendo un animal en jamones para curar, embutidos y manteca pensados para durar a una familia todo el invierno. El momento sigue la primera helada fuerte y no una fecha fija.|Dans l'Estrémadure rurale, la Castille et ailleurs, la matanza — l'abattage, le découpage et la conservation traditionnels du cochon domestique — a historiquement rassemblé famille élargie et voisins pour une journée entière de travail partagé et épuisant chaque novembre, transformant un animal en jambons à affiner, en saucisses et en graisse fondue censés faire vivre une famille tout l'hiver. Le moment suit le premier grand froid plutôt qu'une date fixe.|農村部のエストレマドゥーラやカスティーリャなどでは、家で飼う豚を屠り、解体し、保存食に加工する伝統行事「マタンサ」が、毎年11月、一族と近隣を丸一日がかりの骨の折れる共同作業に集めてきた。一頭の豚は、熟成させる生ハムやソーセージ、冬じゅう家族を支える精製した脂身へと姿を変える。決まった日付ではなく、その年最初の厳しい寒波を待って行われる。冷蔵設備なしに肉を安全に熟成させるには寒さが要るからである。",
    ),
    f: t(
      "The custom has declined sharply since EU food-safety rules restricted home slaughter in the early 2000s, and what continues today is often a smaller-scale, licensed or symbolic version of a practice that used to be close to universal in rural households.|La costumbre ha decaído mucho desde que las normas europeas de seguridad alimentaria restringieron el sacrificio doméstico a principios de los 2000, y lo que continúa hoy suele ser una versión a menor escala, autorizada o simbólica de una práctica antes casi universal en los hogares rurales.|La coutume a fortement décliné depuis que les règles européennes de sécurité alimentaire ont restreint l'abattage à domicile au début des années 2000, et ce qui subsiste aujourd'hui est souvent une version réduite, autorisée ou symbolique d'une pratique jadis quasi universelle dans les foyers ruraux.|この習わしは2000年代初頭、EUの食品安全規則が自家屠殺を制限して以来大きく衰えた。いまも続いているのは、かつて農村の家庭でほぼ当たり前だった行為の、規模を縮めた許可制ないし象徴的な版であることが多い。",
    ),
    months: [7],
  },
  {
    e: "🎟️",
    n: t("A children's choir sings out the year's luckiest numbers|Un coro de niños canta los números más afortunados del año|Une chorale d'enfants chante les numéros les plus chanceux de l'année|子供の合唱団がその年の当たり番号を歌い上げる"),
    t: t(
      "On 22 December, students from Madrid's Colegio de San Ildefonso sing out winning numbers from Spain's Christmas lottery, El Gordo, live on national television for hours, a tradition running since the nineteenth century; tickets are conventionally bought as décimos, one-tenth shares, split among family, coworkers or entire village associations so a single winning number can make dozens of people rich at once. Nochebuena, on the 24th, is the main family meal of the season, eaten late in the evening rather than at midday.|El 22 de diciembre, alumnos del Colegio de San Ildefonso de Madrid cantan en directo por televisión nacional durante horas los números premiados de la lotería de Navidad, El Gordo, una tradición vigente desde el siglo XIX; los billetes se compran convencionalmente como décimos, repartidos entre familia, compañeros de trabajo o asociaciones de pueblos enteros. La Nochebuena, el 24, es la comida familiar principal de la temporada.|Le 22 décembre, des élèves du Colegio de San Ildefonso de Madrid chantent en direct à la télévision nationale, durant des heures, les numéros gagnants de la loterie de Noël espagnole, El Gordo, une tradition en vigueur depuis le XIXe siècle ; les billets sont classiquement achetés en décimos, des dixièmes, partagés entre famille, collègues ou associations de village entières. La Nochebuena, le 24, est le principal repas de famille de la saison.|12月22日、マドリードのサン・イルデフォンソ学校の生徒たちが、何時間もかけて全国放送でスペインのクリスマス宝くじ「エル・ゴルド」の当選番号を歌い上げる。19世紀から続く伝統である。券は慣習として十分の一の「デシモ」で買われ、家族や同僚、村の団体全体で分け合うため、一つの当選番号が一度に何十人もを裕福にすることもある。24日の「ノチェブエナ」はこの季節いちばんの家族の食事で、昼ではなく夜遅くに取られる。",
    ),
    f: t(
      "El Gordo's total prize pool is among the largest of any lottery draw in the world, but because tickets are so widely shared in small fractions, individual payouts are often modest — the fame comes from how many people win something, not from how much any one person wins.|El bote total de El Gordo está entre los mayores de cualquier sorteo del mundo, pero como los billetes se comparten tanto en fracciones pequeñas, los premios individuales suelen ser modestos: la fama viene de cuánta gente gana algo, no de cuánto gana una sola persona.|La cagnotte totale d'El Gordo compte parmi les plus importantes de tous les tirages de loterie au monde, mais les billets étant si largement partagés en petites fractions, les gains individuels sont souvent modestes — la renommée vient du nombre de gens qui gagnent quelque chose, pas du montant gagné par une seule personne.|エル・ゴルドの総賞金額は世界のどの宝くじ抽選と比べても屈指の規模だが、券が細かく分割されて広く共有されるため、一人あたりの受取額はしばしば控えめである。その名声は、一人がいくら勝つかではなく、何人が何かしら勝つかから来ている。",
    ),
    months: [8],
  },
  {
    e: "👑",
    n: t("Presents wait for the Three Kings, not Christmas morning|Los regalos esperan a los Reyes Magos, no a la mañana de Navidad|Les cadeaux attendent les Rois mages, pas le matin de Noël|贈り物はクリスマスの朝ではなく東方の三博士を待つ"),
    t: t(
      "In most Spanish households, the main gift-giving still happens on the morning of 6 January, Epiphany, rather than on Christmas Day, marking the night the three kings are said to have reached the infant Christ; the evening before, towns hold a cabalgata, a costumed parade with the three kings throwing sweets from floats. Children traditionally leave out shoes, water and hay for the kings' camels rather than milk and cookies.|En la mayoría de los hogares españoles, el grueso de los regalos sigue llegando la mañana del 6 de enero, Epifanía, y no el día de Navidad, en recuerdo de la noche en que se dice que los tres reyes llegaron hasta el niño Jesús; la víspera, los pueblos celebran una cabalgata, un desfile de disfraces con los tres reyes lanzando caramelos desde las carrozas. Los niños tradicionalmente dejan zapatos, agua y paja para los camellos de los reyes, en vez de leche y galletas.|Dans la plupart des foyers espagnols, l'essentiel des cadeaux arrive encore le matin du 6 janvier, jour de l'Épiphanie, plutôt qu'à Noël, en souvenir de la nuit où les trois rois mages seraient parvenus jusqu'à l'enfant Jésus ; la veille, les villes organisent une cabalgata, un défilé costumé où les trois rois lancent des bonbons depuis leurs chars. Les enfants laissent traditionnellement des chaussures, de l'eau et de la paille pour les chameaux des rois, plutôt que du lait et des biscuits.|スペインの多くの家庭では、いまも贈り物の中心は1月6日、公現祭「エピファニア」の朝に届く。降誕祭の日ではない。東方の三博士が幼子イエスのもとにたどり着いたとされる夜を記念している。前夜には各町で「カバルガタ」と呼ばれる仮装行列が行われ、三博士が山車から菓子を投げる。子どもたちは伝統的に、ミルクとクッキーではなく、王たちのラクダのために靴と水と藁を置いておく。",
    ),
    f: t(
      "The custom of a fourth, unofficial gift moment — Christmas Day presents alongside the 6 January ones, or a separate letter-collecting royal page character — has spread in recent decades as commercial pressure and imagery from elsewhere have layered onto the older tradition rather than replaced it.|La costumbre de un cuarto momento de regalos, no oficial —regalos el día de Navidad además de los del 6 de enero, o un paje real que recoge cartas por separado— se ha extendido en las últimas décadas, superponiéndose a la tradición antigua sin sustituirla.|La coutume d'un quatrième moment de cadeaux, non officiel — cadeaux du jour de Noël en plus de ceux du 6 janvier, ou un page royal séparé collectant les lettres — s'est répandue ces dernières décennies, se superposant à la tradition ancienne sans la remplacer.|クリスマス当日にも贈り物をする、あるいは手紙を別に集める王家の小姓のような、非公式の「第四の贈答の機会」を設ける習慣が近年広まっている。商業的な圧力や他所からのイメージが、古い伝統に取って代わるのではなく重なる形で層をなしている。",
    ),
    months: [9],
  },
  {
    e: "🎭",
    n: t("Cádiz sings its complaints instead of shouting them|Cádiz canta sus quejas en vez de gritarlas|Cadix chante ses griefs plutôt que de les crier|カディスは不満を叫ばず歌う"),
    t: t(
      "Cádiz's Carnival is built around chirigotas, satirical singing groups who spend months writing new lyrics set to popular tunes, mocking politicians, local scandals and the price of everything, then compete in a theatre before taking their act to the streets in costume for weeks of open-air performance. Unlike more visually spectacular carnivals elsewhere, the Cádiz version is judged almost entirely on wordplay and how sharply, and how funnily, a group can needle power.|El Carnaval de Cádiz se construye en torno a las chirigotas, agrupaciones satíricas que pasan meses escribiendo nuevas letras sobre melodías populares, burlándose de políticos, escándalos locales y el precio de todo, y que compiten en un teatro antes de sacar su número a la calle disfrazadas durante semanas. A diferencia de carnavales más vistosos en otros lugares, el de Cádiz se juzga casi por completo por el juego de palabras.|Le Carnaval de Cadix repose sur les chirigotas, des groupes chantants satiriques qui passent des mois à écrire de nouvelles paroles sur des airs populaires, se moquant des politiciens, des scandales locaux et du prix de tout, avant de concourir dans un théâtre puis de porter leur numéro dans la rue en costume pendant des semaines. Contrairement à des carnavals plus spectaculaires visuellement ailleurs, celui de Cadix se juge presque entièrement sur le jeu de mots.|カディスのカーニバルの中心は「チリゴタ」と呼ばれる風刺の合唱団で、政治家や地元の醜聞、あらゆるものの値上がりを茶化す新しい歌詞を流行歌のメロディーに乗せて何か月もかけて書き上げ、劇場で競い合ったのち、衣装をまとって何週間も路上で演じる。他の土地の見た目に派手なカーニバルと違い、カディスのそれはほとんど言葉遊びと、権力をどれだけ鋭く、どれだけ面白く突けるかだけで評価される。",
    ),
    f: t(
      "The competition has run in something close to its current format since the early twentieth century, and censors under the Franco dictatorship struggled for decades to control lyrics that relied on double meanings audiences understood instantly but that were far harder to prosecute on paper.|La competición se celebra en un formato cercano al actual desde principios del siglo XX, y los censores de la dictadura franquista lucharon durante décadas por controlar letras que se apoyaban en dobles sentidos que el público captaba al instante pero que eran mucho más difíciles de perseguir por escrito.|La compétition se tient dans un format proche de l'actuel depuis le début du XXe siècle, et les censeurs de la dictature franquiste peinèrent des décennies à contrôler des paroles reposant sur des doubles sens que le public saisissait instantanément mais bien plus difficiles à poursuivre sur le papier.|この競演会は20世紀初頭からほぼ現在に近い形式で続いており、フランコ独裁体制下の検閲官は、観客には一瞬で伝わるのに文書としては取り締まりにくい二重の意味に頼った歌詞を統制しようと、何十年も苦労し続けた。",
    ),
    months: [10],
  },
  {
    e: "🎆",
    n: t("Valencia builds giant satirical statues just to burn them|Valencia construye estatuas satíricas gigantes solo para quemarlas|Valence construit d'immenses statues satiriques rien que pour les brûler|バレンシアは風刺の巨像をわざわざ燃やすために作る"),
    t: t(
      "Neighbourhood associations across Valencia spend up to a year building fallas, elaborate papier-mâché and polystyrene sculptures often several storeys tall lampooning politicians and celebrities, only to burn nearly all of them in the streets on the night of 19 March; a daytime fireworks display called the mascletà goes off in the main square every single day of the festival, valued as much for its rhythm and the pressure felt in the chest as for its noise. One figure is spared the flames each year by public vote and kept in the city's Fallas museum.|Las asociaciones de barrio de Valencia pasan hasta un año construyendo fallas, elaboradas esculturas de cartón piedra y poliestireno a menudo de varios pisos de altura que ridiculizan a políticos y famosos, solo para quemar casi todas en las calles la noche del 19 de marzo; cada día del festival se dispara en la plaza mayor una mascletà, un espectáculo de fuegos artificiales diurno valorado tanto por su ritmo como por su estruendo. Cada año, una figura se salva de las llamas por votación popular.|Les associations de quartier de Valence passent jusqu'à un an à construire des fallas, sculptures élaborées en papier mâché et polystyrène, souvent hautes de plusieurs étages, raillant politiciens et célébrités, pour n'en brûler presque toutes dans les rues que le soir du 19 mars ; un spectacle pyrotechnique diurne appelé mascletà est tiré sur la place principale chaque jour du festival. Une figure est épargnée chaque année par vote public et conservée au musée des Fallas.|バレンシア各地の町内会は、政治家や有名人を風刺する、しばしば何階分もの高さになる紙粘土と発泡スチロールの手の込んだ像「ファリャ」の制作に一年近くをかける。それなのに3月19日の夜、そのほとんどを街頭で燃やしてしまう。祭りの期間中は毎日昼間、中央広場で「マスクレタ」と呼ばれる花火が打ち上げられ、音そのものより、そのリズムと胸に響く圧力が値打ちとされる。毎年、投票によって一体だけが炎を免れ、市のファリャ博物館に収められる。",
    ),
    f: t(
      "UNESCO recognised Las Fallas as Intangible Cultural Heritage in 2016, citing not the sculptures themselves — which are deliberately destroyed — but the year-round neighbourhood organising, fundraising and craftsmanship that goes into building something meant to last only a single night.|La UNESCO reconoció las Fallas como Patrimonio Cultural Inmaterial en 2016, citando no las esculturas en sí —que se destruyen deliberadamente— sino la organización vecinal, la recaudación de fondos y el oficio que se dedican todo el año a construir algo pensado para durar una sola noche.|L'UNESCO a reconnu les Fallas comme patrimoine culturel immatériel en 2016, citant non les sculptures elles-mêmes — délibérément détruites — mais l'organisation de quartier, la collecte de fonds et le savoir-faire déployés toute l'année pour bâtir quelque chose destiné à ne durer qu'une seule nuit.|ユネスコは2016年、ファリャス祭りを無形文化遺産に認定した。評価されたのは、わざと壊されるその彫像そのものではなく、たった一晩しかもたないものを作るために一年を通じて続けられる、地区の組織づくりと資金集め、職人技のほうである。",
    ),
    months: [11],
  },
];
