/**
 * イタリアの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国と同じく「地方まるごとの好不況」で差をつける。
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

export const ITALY_META = {
  id: "italy",
  name: t("Italy|Italia|Italie|イタリア"),
  blurb: t(
    "A boot-shaped peninsula of hill towns, high-speed rail and a coastline that never runs out of new colours|Una península con forma de bota de pueblos en colina, alta velocidad ferroviaria y una costa que nunca se queda sin colores nuevos|Une péninsule en forme de botte, faite de villages perchés, de trains à grande vitesse et d'un littoral aux couleurs toujours renouvelées|丘の町と高速鉄道、尽きることのない色彩の海岸線が連なる、長靴の形の半島",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (フランスと同じ通貨(ユーロ)なので同じ倍率に揃えてある。理由はREGISTER.md参照)。
  cur: { pre: "€", post: "", mul: 100 },
  start: "roma",
  // コンメディア・デッラルテ(仮面即興劇)の代表的な4役。
  cpuNames: ["Arlecchino", "Pulcinella", "Colombina", "Pantalone"],
  // イタリア国旗の緑・白・赤に、法王庁の金とテラコッタを添えた5色。
  stripe: ["#008c45", "#f4f5f0", "#cd212a", "#f4c430", "#8b5a2b"],
};

/** ISTAT(イタリア国家統計局)の6分割(シチリア・サルデーニャを分ける)。 */
export const ITALY_REGIONS = {
  nov: t("Northwest — Piedmont, Liguria, Lombardy, Aosta Valley|Noroeste — Piamonte, Liguria, Lombardía, Valle de Aosta|Nord-Ouest — Piémont, Ligurie, Lombardie, Vallée d'Aoste|北西(ピエモンテ・リグーリア・ロンバルディア・ヴァッレダオスタ)"),
  nes: t("Northeast — Veneto, Trentino, Friuli, Emilia-Romagna|Noreste — Véneto, Trentino, Friuli, Emilia-Romaña|Nord-Est — Vénétie, Trentin, Frioul, Émilie-Romagne|北東(ヴェネト・トレンティーノ・フリウリ・エミリア=ロマーニャ)"),
  cen: t("Centre — Tuscany, Umbria, Marche, Lazio|Centro — Toscana, Umbría, Las Marcas, Lacio|Centre — Toscane, Ombrie, Marches, Latium|中部(トスカーナ・ウンブリア・マルケ・ラツィオ)"),
  sud: t("South — Campania, Puglia, Basilicata, Calabria, Abruzzo|Sur — Campania, Apulia, Basilicata, Calabria, Abruzos|Sud — Campanie, Pouilles, Basilicate, Calabre, Abruzzes|南部(カンパーニア・プーリア・バジリカータ・カラブリア・アブルッツォ)"),
  sic: t("Sicily|Sicilia|Sicile|シチリア"),
  sar: t("Sardinia|Cerdeña|Sardaigne|サルデーニャ"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const ITALY_ITEMS = {
  vespa: {
    e: "🛵",
    price: 240,
    kind: "move",
    n: t("A Ride on a Vespa|Un paseo en Vespa|Une balade en Vespa|ヴェスパでひとっ走り"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Piaggio built the first Vespa in 1946 from spare aircraft parts left over from the war, and the name — Italian for \"wasp\" — came from an engineer who thought the fat rear body and narrow waist looked exactly like one. It has starred in more films than most actors, Roman Holiday chief among them.|Piaggio construyó la primera Vespa en 1946 con piezas de avión sobrantes de la guerra, y el nombre —«avispa» en italiano— vino de un ingeniero al que el cuerpo trasero ancho y la cintura estrecha le parecieron clavados a una. Ha protagonizado más películas que muchos actores.|Piaggio construisit la première Vespa en 1946 à partir de pièces d'avion récupérées de la guerre, et le nom — « guêpe » en italien — vint d'un ingénieur trouvant que le corps arrière large et la taille étroite y ressemblaient trait pour trait. Elle a tourné dans plus de films que bien des acteurs.|ピアッジオ社は1946年、戦争で余った航空機の部品を使って最初のヴェスパを作った。「蜂」を意味するその名は、太い後部と細いくびれがまさに蜂そっくりだと思った技師がつけたものである。『ローマの休日』をはじめ、多くの俳優より多い数の映画に主演してきた。",
    ),
  },
  orario: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Official Timetable|El horario oficial|L'horaire officiel|公式時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The printed Orario Ufficiale once ran to over a thousand pages listing every regional stop in the country, and generations of Italian travellers learned to read its dense grid of platform numbers and footnote symbols before phones made the whole thing obsolete overnight.|El Orario Ufficiale impreso llegó a tener más de mil páginas con cada parada regional del país, y generaciones de viajeros italianos aprendieron a leer su densa cuadrícula de andenes y notas al pie antes de que el móvil lo volviera obsoleto de la noche a la mañana.|L'Orario Ufficiale imprimé comptait plus de mille pages listant chaque arrêt régional du pays, et des générations de voyageurs italiens apprirent à lire sa grille dense de numéros de quai et de renvois avant que le téléphone ne le rende obsolète du jour au lendemain.|印刷版の公式時刻表(オラーリオ・ウフィチャーレ)はかつて千ページを超え、国内のあらゆる地方の停車駅を載せていた。イタリアの旅人は何世代にもわたり、そのぎっしり詰まったホーム番号と脚注記号の格子を読み解く術を身につけたが、スマートフォンの登場で一夜にして時代遅れになった。",
    ),
  },
  intercity: {
    e: "🚈",
    price: 360,
    kind: "pre",
    n: t("InterCity Ticket|Billete InterCity|Billet InterCity|インターシティ切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "InterCity trains fill the gap between the slow regionale that stops everywhere and the high-speed Frecce, running on ordinary track rather than the dedicated high-speed lines, which means they still pass close enough to hill towns to see them from the window.|Los trenes InterCity llenan el hueco entre el lento regionale, que para en todas partes, y las veloces Frecce, circulando por vía convencional en vez de líneas de alta velocidad dedicadas.|Les trains InterCity comblent l'écart entre le lent regionale qui s'arrête partout et les rapides Frecce, circulant sur des voies classiques plutôt que sur les lignes à grande vitesse dédiées.|インターシティは、どこにでも停まる鈍行のレジョナーレと高速のフレッチェ(矢)との中間を埋める列車で、専用の高速線ではなく在来線を走るため、車窓から丘の町がよく見える距離を通っていく。",
    ),
  },
  frecciarossa: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Frecciarossa Ticket|Billete Frecciarossa|Billet Frecciarossa|フレッチャロッサ切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Frecciarossa (\"red arrow\") can run at up to 300 km/h and cut the Rome–Milan run from about six and a half hours in the 1970s to under three today, largely by boring new tunnels straight through the Apennines instead of winding around them.|El Frecciarossa («flecha roja») puede alcanzar 300 km/h y ha reducido el trayecto Roma-Milán de unas seis horas y media en los setenta a menos de tres hoy, en gran parte perforando nuevos túneles rectos a través de los Apeninos.|Le Frecciarossa (« flèche rouge ») peut atteindre 300 km/h et a ramené le trajet Rome-Milan d'environ six heures et demie dans les années 1970 à moins de trois aujourd'hui, en grande partie en perçant de nouveaux tunnels tout droit à travers les Apennins.|フレッチャロッサ(「赤い矢」)は最高時速300kmで走り、ローマ―ミラノ間を1970年代のおよそ6時間半から、いまは3時間足らずに縮めた。その多くは、山を迂回せずアペニン山脈をまっすぐ貫く新しいトンネルを掘ったことによる。",
    ),
  },
  cornicello: {
    e: "🌶️",
    price: 320,
    kind: "passive",
    n: t("The Red Horn Charm|El amuleto del cuernecillo rojo|Le porte-bonheur en corne rouge|赤い角のお守り(コルニチェッロ)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The twisted red horn, worn on a chain or hung from a rear-view mirror, is said to ward off the evil eye by drawing bad luck onto itself instead of its owner, a superstition old enough that similar charms turn up in the ashes of Pompeii. It should never be bought for yourself — only given, or the protection supposedly does not work.|El cuernecillo rojo retorcido, llevado en una cadena o colgado del retrovisor, se dice que ahuyenta el mal de ojo atrayendo la mala suerte hacia sí mismo, superstición tan antigua que amuletos parecidos aparecen entre las cenizas de Pompeya.|La corne rouge torsadée, portée en pendentif ou suspendue au rétroviseur, est censée détourner le mauvais œil en attirant la malchance sur elle-même, superstition assez ancienne pour que des amulettes semblables ressurgissent dans les cendres de Pompéi.|よじれた赤い角の形をしたこの御守りは、鎖に通したりバックミラーに吊るしたりして身につけ、持ち主の代わりに自分へ不運を引き寄せることで邪視を防ぐとされる。似た御守りがポンペイの灰の中からも見つかるほど古い迷信である。自分で買ってはならず、人からもらわなければ効かないとされる。",
    ),
  },
  malocchio: {
    e: "🫒",
    price: 440,
    kind: "pre",
    n: t("The Oil-and-Water Rite|El rito del aceite y el agua|Le rite de l'huile et de l'eau|油と水の儀式"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "In the old countryside remedy, drops of olive oil are let fall into a bowl of water while a private prayer is murmured; if the oil breaks into small scattered beads rather than staying whole, the evil eye is confirmed, and the ritual is repeated until the drops finally hold together.|En el viejo remedio campesino, se dejan caer gotas de aceite de oliva en un cuenco de agua mientras se murmura una oración privada; si el aceite se rompe en gotitas dispersas en vez de mantenerse entero, se confirma el mal de ojo.|Dans le vieux remède campagnard, on laisse tomber des gouttes d'huile d'olive dans un bol d'eau tout en murmurant une prière privée ; si l'huile se disperse en petites perles au lieu de rester entière, le mauvais œil est confirmé.|昔ながらの田舎の儀式では、水を張った鉢にオリーブオイルを垂らしながら小声で祈りを唱える。油がひとまとまりのままではなく小さな粒に散らばれば邪視がかかっている証しとされ、粒が最後にまとまるまで儀式を繰り返す。",
    ),
  },
  bigino: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("The Crib Sheet|El machete|L'antisèche|虎の巻(ビジーノ)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Bigino properly refers to a condensed study guide, small enough to slip inside a textbook or a sleeve during an oral exam, and Italian students have traded them between generations of the same class long enough that some professors now write their questions specifically to defeat the ones already in circulation.|Bigino designa propiamente una guía de estudio condensada, lo bastante pequeña para deslizarla en un libro de texto o una manga durante un examen oral, y los estudiantes italianos se los han pasado entre generaciones de una misma clase.|Bigino désigne à proprement parler un résumé de cours condensé, assez petit pour se glisser dans un manuel ou une manche pendant un oral, et les étudiants italiens se les transmettent entre générations d'une même filière.|「ビジーノ」とは本来、教科書や口頭試験の袖口にこっそり忍ばせられるほど小さくまとめた要点集を指す。イタリアの学生は同じ学科の代々のあいだでこれをやり取りしてきたため、教授の中にはすでに出回っているビジーノを見抜いて無効化するよう問題を作る者もいる。",
    ),
  },
  lotteria: {
    e: "🎟️",
    price: 280,
    kind: "pre",
    n: t("A Winning Lottery Ticket|Un billete de lotería premiado|Un billet de loterie gagnant|当たった宝くじ"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The modern number lottery is generally traced back to 16th-century Genoa, where bettors wagered on which five names would be drawn to fill the city's ninety Great Council seats, and when the custom outlived the elections themselves the numbers alone kept the game running.|La lotería numérica moderna se remonta generalmente a la Génova del siglo XVI, donde se apostaba sobre qué cinco nombres saldrían sorteados para ocupar los noventa puestos del Gran Consejo de la ciudad.|La loterie à numéros moderne remonte généralement à la Gênes du XVIe siècle, où l'on pariait sur les cinq noms qui seraient tirés pour pourvoir les quatre-vingt-dix sièges du Grand Conseil de la ville.|現代の数字選択式宝くじは一般に16世紀のジェノヴァにさかのぼるとされる。市の大評議会の90の議席を埋めるくじで、どの5つの名が引かれるかに賭けたのが始まりで、選挙そのものが廃れたあとも数字だけが独立して興行として生き残った。",
    ),
  },
  raccomandazione: {
    e: "🤝",
    price: 420,
    kind: "pre",
    n: t("A Word from a Friend|Una palabra de un amigo|Un mot d'un ami|顔利きの一声(ラッコマンダツィオーネ)"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A raccomandazione — literally a \"recommendation\" — is the quiet phone call from someone who knows someone, said to smooth queues, paperwork and waiting lists across the country, and complained about constantly by the very same people who admit to using one when it mattered.|Una raccomandazione —literalmente una «recomendación»— es la llamada discreta de alguien que conoce a alguien, que se dice que allana colas, papeleos y listas de espera por todo el país, y de la que se quejan constantemente las mismas personas que admiten haber usado una cuando les convino.|Une raccomandazione — littéralement une « recommandation » — est ce coup de fil discret de quelqu'un qui connaît quelqu'un, censé aplanir files d'attente, paperasse et listes d'attente dans tout le pays, et dont se plaignent sans cesse les mêmes personnes qui admettent en avoir usé quand cela comptait.|「ラッコマンダツィオーネ」とは文字どおり「口利き」を意味し、知り合いの知り合いからかかってくる静かな電話が、行列も書類手続きも順番待ちも国じゅうでするりと通してしまうとされる。それを絶えず愚痴る当人たちが、いざという時には自分も使ったと認めるのが常である。",
    ),
  },
};

/**
 * 厄災の神。ナポリの民話に伝わるモナチェッロ(頭巾をかぶった小さな家の精、
 * 隠された財宝の在り処を知るいたずら好き)にした。悪霊ではなく、
 * 気に入られれば富をもたらし、からかわれれば悪さをするという二面性を持つ
 * (韓国のトッケビ・茨城のダイダラボウと同じく「残酷ではなく、ただ度が過ぎる」性格)。
 */
export const ITALY_SPIRIT = {
  e: "🎩",
  n: t("The Monaciello|El Monaciello|Le Monaciello|モナチェッロ"),
  big: t("The Monaciello's Grand Prank|La gran travesura del Monaciello|La grande farce du Monaciello|モナチェッロの大いたずら"),
  ward: "cornicello",
  arrive: t(
    "<b>🎩 A monaciello has taken an interest in you.</b> Neapolitan tales describe a small hooded figure, part house spirit and part ghost of an underground worker, who knows exactly where every hidden coin in the city is buried but only reveals it to those he likes. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🎩 Un monaciello se ha fijado en ti.</b> Los cuentos napolitanos describen a una figura pequeña y encapuchada, mitad espíritu del hogar y mitad fantasma de un trabajador subterráneo, que sabe exactamente dónde está enterrada cada moneda oculta de la ciudad pero solo se lo revela a quien le cae bien. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🎩 Un monaciello s'est intéressé à toi.</b> Les contes napolitains décrivent une petite silhouette encapuchonnée, mi-esprit du foyer mi-fantôme d'un ouvrier souterrain, qui sait exactement où chaque pièce cachée de la ville est enterrée mais ne le révèle qu'à ceux qu'il apprécie. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🎩 モナチェッロに目を付けられた。</b> ナポリの民話によれば、これは頭巾をかぶった小さな姿をしたもので、半分は家の精霊、半分は地下で働いていた者の亡霊とされる。町に埋まったすべての隠し金がどこにあるか知っているが、気に入った相手にしかそれを教えない。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🎩 <b>The monaciello</b> loses interest and slips after <b>{0}</b>, farthest from {1}.|🎩 <b>El monaciello</b> pierde el interés y se desliza tras <b>{0}</b>, el más lejano de {1}.|🎩 <b>Le monaciello</b> se désintéresse et se faufile vers <b>{0}</b>, le plus loin de {1}.|🎩 <b>モナチェッロ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへすり抜けていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the monaciello and never once made him laugh. He decides the whole road needs teaching a lesson and pulls his red cap down low — <b>the Monaciello's Grand Prank</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al monaciello sin haberlo hecho reír ni una vez. Decide que todo el camino necesita una lección y se cala bien el gorro rojo: empieza <b>la gran travesura del Monaciello</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le monaciello sans jamais l'avoir fait rire. Il décide que toute la route mérite une leçon et enfonce son bonnet rouge — <b>la grande farce du Monaciello</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもモナチェッロと歩いていながら、一度も彼を笑わせられなかった。彼は道中すべてに思い知らせてやろうと赤い帽子を目深にかぶり直す。<b>モナチェッロの大いたずら</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the monaciello's red cap is said to be the one item that, if stolen or hidden away by a clever household, forces him to reward the family with buried gold to get it back — the same cap that turns spiteful the moment nobody thinks to try.|<b>Tras la historia:</b> se dice que el gorro rojo del monaciello es lo único que, si una familia lista lo roba o lo esconde, le obliga a recompensarla con oro enterrado para recuperarlo, el mismo gorro que se vuelve rencoroso en cuanto nadie lo intenta.|<b>Derrière l'histoire :</b> le bonnet rouge du monaciello serait la seule chose qui, volée ou cachée par une famille astucieuse, l'oblige à la récompenser d'or enterré pour la récupérer — ce même bonnet qui devient rancunier dès que personne n'essaie.|<b>物語の背景:</b> モナチェッロの赤い帽子は、賢い家族に盗まれたり隠されたりすると、取り戻すために埋蔵金で報いなければならなくなる唯一の品とされる。だが誰もそれを試みなければ、同じ帽子が意地悪の種になる。",
  ),
  pleased: t(
    "He tips his little red cap and a coin drops out from underneath it, rolling to a stop at your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se toca el gorrito rojo y de debajo cae una moneda, que rueda hasta parar a tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il incline son petit bonnet rouge et une pièce en tombe, roulant jusqu'à s'arrêter à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|小さな赤い帽子を傾けると、下から銭が一枚こぼれ落ち、足元まで転がってきた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A red horn charm catches the light where he can see it, and the monaciello — never one to cross another lucky charm's territory — slips past <b>{0}</b> without noticing this turn.|Un amuleto de cuernecillo rojo capta la luz donde él puede verlo, y el monaciello —que nunca invade el territorio de otro amuleto de la suerte— pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un porte-bonheur en corne rouge accroche la lumière bien en vue, et le monaciello — qui n'empiète jamais sur le territoire d'un autre porte-bonheur — passe devant <b>{0}</b> sans le remarquer ce tour-ci.|赤い角のお守りが目につくところで光を返すと、他の幸運の御守りの縄張りには決して踏み込まないモナチェッロは、このターン <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。モナチェッロのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const ITALY_DOOM = [
  {
    id: "autovelox",
    n: t("A speed camera catches you|Un radar te pilla|Un radar te flashe|速度違反取締機に捕まる"),
    t: t(
      "The little grey box by the roadside looked like every other one that never seemed to be switched on, until a letter arrives weeks later with a photograph, a fine and a small lecture about the posted limit nobody was really watching for. The autostrada network is dotted with thousands of these, and locals swear they know exactly which stretches to slow down for — until they don't.|La cajita gris junto a la carretera parecía como cualquier otra que nunca parece encendida, hasta que semanas después llega una carta con una foto, una multa y un sermoncito sobre el límite que nadie vigilaba de verdad. La red de autopistas está sembrada de miles de estos, y los lugareños juran saber exactamente en qué tramos frenar, hasta que no.|Le petit boîtier gris au bord de la route ressemblait à tous les autres qui ne semblent jamais allumés, jusqu'à ce qu'une lettre arrive des semaines plus tard avec une photo, une amende et un petit sermon sur la limite que personne ne surveillait vraiment. Le réseau autoroutier en est semé de milliers, et les habitants jurent savoir exactement où ralentir — jusqu'au jour où non.|道端の小さな灰色の箱は、いつも作動していないように見えるほかの箱と同じに見えたが、数週間後に写真付きの手紙が届き、罰金と誰も気にしていなかった制限速度についての小言が添えられていた。高速道路網にはこうした機械が何千と点在しており、地元の人はどの区間で減速すべきか正確に知っていると豪語するが――知らないこともある。",
    ),
  },
  {
    id: "grandinata",
    n: t("Hail wrecks the harvest|El granizo destroza la cosecha|La grêle ravage la récolte|雹が収穫を台無しにする"),
    t: t(
      "A ten-minute hailstorm out of a clear afternoon sky strips leaves, splits grapes and dents fruit still weeks from ready, and the insurance paperwork for crop damage is nearly as painful as the loss itself. Farmers now watch radar apps as closely as the sky, hoping to net the most exposed rows in time.|Una granizada de diez minutos en un cielo despejado de tarde deshoja, revienta las uvas y abolla la fruta que aún faltan semanas para madurar, y el papeleo del seguro por daños en la cosecha es casi tan doloroso como la propia pérdida.|Une averse de grêle de dix minutes surgie d'un ciel d'après-midi dégagé effeuille, éclate les raisins et cabosse les fruits encore à des semaines de maturité, et les démarches d'assurance pour les dégâts aux cultures sont presque aussi pénibles que la perte elle-même.|晴れていた午後の空から降ってきたわずか10分の雹が、葉をむしり取りぶどうを裂き、まだ何週間も熟していない果実にへこみを残す。作物被害の保険手続きは、損失そのものとほとんど同じくらい骨が折れる。農家はいまや空と同じくらいレーダーアプリを見張り、いちばん露出した畝だけでも間に合わせて防護網をかけようとする。",
    ),
    months: [5, 6],
  },
  {
    id: "sciopero",
    n: t("A national rail strike shuts down the line|Una huelga ferroviaria nacional paraliza la línea|Une grève nationale des chemins de fer bloque la ligne|全国的な鉄道ストで運行が止まる"),
    t: t(
      "The strike was announced weeks in advance, with the legally required guaranteed minimum service posted in tiny print nobody reads until the platform board shows almost nothing running, and even the trains that do move stop for exactly the announced hours and not a minute less. Scioperi are frequent enough that regular commuters keep the strike calendar bookmarked out of habit.|La huelga se anunció con semanas de antelación, con el servicio mínimo garantizado obligatorio publicado en letra diminuta que nadie lee hasta que el panel del andén muestra casi nada en marcha.|La grève fut annoncée des semaines à l'avance, le service minimum garanti obligatoire affiché en tout petits caractères que personne ne lit avant que le tableau du quai n'affiche presque plus rien.|ストライキは何週間も前から告知され、法律で定められた最低限の運行案内は誰も読まない小さな字で掲示されていたが、それに気づくのはホームの掲示板がほとんど何も走らせていないと表示したときだった。動く列車でさえ、告知された時間ぴったりで止まり、一分たりとも短くはならない。ストは頻繁で、通勤客はもはや習慣でスト予定表をブックマークしている。",
    ),
  },
  {
    id: "incendio",
    n: t("A hillside wildfire spreads|Un incendio forestal se propaga por la ladera|Un incendie de colline se propage|丘の山火事が広がる"),
    t: t(
      "A dry August wind carried a spark from somewhere into the scrubby pine and gorse of the hillside, and by the time the water-bomber planes arrived overhead the fire had already jumped the first firebreak. Land left uncleared through years of rural depopulation burns faster than the same slope once did when every terrace still had someone tending it.|Un viento seco de agosto llevó una chispa de algún sitio al matorral de pinos y aulagas de la ladera, y cuando llegaron los aviones cisterna el fuego ya había saltado el primer cortafuegos. La tierra sin desbrozar por años de despoblación rural arde más deprisa.|Un vent sec d'août a porté une étincelle venue d'on ne sait où jusqu'aux pins et ajoncs du coteau, et le temps que les avions-citernes arrivent, le feu avait déjà franchi le premier pare-feu. Les terres laissées en friche par des années de dépeuplement rural brûlent plus vite.|8月の乾いた風が、どこからかの火の粉を丘の松と金雀枝の茂みに運び、消防用の散水機が到着したときにはすでに最初の防火帯を火が飛び越えていた。過疎化で何年も手入れされなくなった土地は、すべての段々畑に人がいた頃の同じ斜面よりも早く燃え広がる。",
    ),
    months: [3, 4],
  },
  {
    id: "morra",
    n: t("Losing badly at morra|Perdiendo feo a la morra|Une lourde défaite à la morra|モッラの勝負に負ける",
    ),
    t: t(
      "Both hands flew out shouting numbers at the exact same instant so many times in a row that the whole bar started keeping score, and the agreed forfeit for the loser — a round for the table — turned out to include several people who had only wandered over to watch. Morra is old enough to appear in Roman wall paintings, played then, as now, entirely on instinct and a good poker face.|Ambas manos salieron gritando números en el mismo instante tantas veces seguidas que todo el bar empezó a llevar la cuenta, y la penitencia acordada para el perdedor —una ronda para la mesa— acabó incluyendo a varios que solo se habían acercado a mirar.|Les deux mains ont jailli en criant des chiffres au même instant tant de fois d'affilée que tout le bar s'est mis à compter les points, et le gage convenu pour le perdant — une tournée pour la table — a fini par inclure plusieurs personnes venues simplement regarder.|両手を突き出して数字を叫ぶのがあまりに何度も同じ瞬間に重なったため、バール中が勝敗を数え始めた。負けた者が「テーブル全員分をおごる」という取り決めの罰は、見に来ただけの何人かまで巻き込む羽目になった。モッラはローマ時代の壁画にも描かれるほど古い遊びで、当時もいまも勘とポーカーフェイスだけで勝負する。",
    ),
  },
  {
    id: "treno-sbagliato",
    n: t("Boarding the wrong regional train|Subiendo al tren regional equivocado|Monter dans le mauvais train régional|違う地方電車に乗ってしまう"),
    t: t(
      "Two trains bound for opposite ends of the region waited on facing platforms with departure times three minutes apart, and only well after leaving the station did the mismatch between the ticket and the view out the window become obvious. Conductors have heard every version of the explanation and no longer look surprised.|Dos trenes con destinos opuestos de la región esperaban en andenes enfrentados con salidas separadas por tres minutos, y solo bien pasada la estación se hizo evidente el desajuste entre el billete y la vista por la ventana.|Deux trains à destination opposée de la région attendaient sur des quais qui se faisaient face, à trois minutes d'écart de départ, et ce n'est que bien après avoir quitté la gare que le décalage entre le billet et le paysage par la fenêtre est devenu évident.|地方の正反対の方向へ向かう二本の列車が、発車時刻がわずか3分違いで向かい合うホームに停まっていた。駅を出てからずいぶん経って初めて、切符と車窓の景色が合っていないことに気づいた。車掌はあらゆる言い訳を聞き尽くしており、もう驚きもしない。",
    ),
  },
  {
    id: "scippo",
    n: t("A scooter-riding bag snatcher|Un ladrón en moto que arrebata el bolso|Un voleur à scooter arrache le sac|スクーターに乗った引ったくり",
    ),
    t: t(
      "The scooter came from behind, close enough along the narrow pavement that the strap gave way before the shoulder even registered the tug, and it was gone around the corner before anyone nearby had time to shout. Cities have pushed hard against scippi for decades with mixed results, and the oldest advice — carry the bag on the side away from the road — is still the best one going.|La moto vino por detrás, tan cerca por la acera estrecha que la correa cedió antes de que el hombro registrara el tirón, y desapareció por la esquina antes de que nadie cerca tuviera tiempo de gritar. Las ciudades han combatido el scippo durante décadas con resultados desiguales.|Le scooter est arrivé par-derrière, si près sur le trottoir étroit que la bandoulière a cédé avant même que l'épaule ne sente la traction, et il avait disparu au coin de la rue avant que quiconque à proximité n'ait le temps de crier. Les villes luttent depuis des décennies contre le scippo, avec des résultats mitigés.|狭い歩道の後方からスクーターが近づき、肩がその引っぱりを感じるより先に肩紐が外れ、近くの誰かが叫ぶ間もなく角を曲がって消えていった。都市は何十年もこうした引ったくり(スキッポ)対策に力を入れてきたが成果はまちまちで、いちばん古くからある忠告――バッグは車道と反対側の肩にかける――がいまも一番確かである。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国と同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の italy の項)。
 */
export const ITALY_SEASONS = [
  {
    e: "🐣",
    n: t("Easter and the Monday picnic|Pascua y el lunes de picnic|Pâques et le lundi pique-nique|復活祭とピクニックの月曜日"),
    t: t(
      "Easter Monday, Pasquetta, sends nearly the whole country outdoors for a picnic the moment the weather allows, a custom so fixed that it survives even years when a cold snap makes eating lamb and hard-boiled eggs on a blanket a genuinely miserable idea. Olive trees across the centre and south break into small white flower clusters this month, the first sign of the year's harvest to come.|El lunes de Pascua, Pasquetta, saca a casi todo el país al aire libre para un pícnic en cuanto el tiempo lo permite, costumbre tan fija que sobrevive incluso los años en que una ola de frío hace que comer cordero y huevos duros sobre una manta sea una idea realmente incómoda.|Le lundi de Pâques, la Pasquetta, envoie presque tout le pays pique-niquer dehors dès que le temps le permet, coutume si ancrée qu'elle survit même les années où un coup de froid rend franchement pénible de manger agneau et œufs durs sur une couverture.|復活祭翌日の月曜(パスクエッタ)には、天気さえ許せば国じゅうがほぼ丸ごと屋外へピクニックに繰り出す。寒の戻りで羊肉と固ゆで卵を敷物の上で食べるのが本当に辛い年でも生き残るほど根付いた習わしである。中部から南部にかけてのオリーブの木は今月、小さな白い花房を咲かせる。今年の収穫の最初の兆しである。",
    ),
    f: t(
      "Pasquetta's picnic tradition has no fixed religious basis and is thought to have simply grown from the practical habit of using up leftover Easter food the next day, outdoors, before refrigeration made that less necessary.|La tradición del pícnic de Pasquetta no tiene base religiosa fija y se cree que surgió simplemente del hábito práctico de aprovechar al día siguiente, al aire libre, las sobras de la comida pascual, antes de que la nevera lo hiciera menos necesario.|La tradition du pique-nique de la Pasquetta n'a aucun fondement religieux fixe et serait simplement née de l'habitude pratique d'écouler dehors, le lendemain, les restes du repas pascal, avant que le réfrigérateur ne rende cela moins nécessaire.|パスクエッタのピクニックの習わしに定まった宗教的根拠はなく、冷蔵庫が普及する前、復活祭の残り物を翌日屋外で片付けるという実用的な習慣から自然に生まれたと考えられている。",
    ),
  },
  {
    e: "🍷",
    n: t("Cellars open their doors|Las bodegas abren sus puertas|Les caves ouvrent leurs portes|ワイナリーが門戸を開く"),
    t: t(
      "Cantine Aperte sends visitors up into hill country each May to taste directly from producers who spend the rest of the year selling almost exclusively through restaurants and distributors, and small family cellars that see almost nobody most months suddenly host a weekend's worth of cars parked along the lane. Wisteria and broom cover the hillsides in purple and yellow just as the event opens.|Cantine Aperte lleva a los visitantes cada mayo a las colinas para catar directamente de productores que el resto del año venden casi solo a restaurantes y distribuidores, y pequeñas bodegas familiares que no ven a casi nadie el resto de los meses reciben de golpe un fin de semana de coches aparcados en el camino.|Cantine Aperte envoie chaque mai les visiteurs dans les collines déguster directement chez des producteurs qui, le reste de l'année, vendent presque exclusivement via restaurants et distributeurs, et de petites caves familiales qui ne voient presque personne le reste du temps accueillent soudain tout un week-end de voitures garées le long du chemin.|カンティーネ・アペルテ(開かれた酒蔵)は毎年5月、普段はほぼレストランと業者向けにしか売らない生産者から直接試飲できる催しで、他の月にはほとんど誰も訪れない小さな家族経営の酒蔵の小道に、週末だけ車がずらりと並ぶことになる。藤とエニシダが紫と黄色で丘を覆うのも、ちょうどこの催しが始まる頃である。",
    ),
    f: t(
      "The event began in 1993 as a small regional initiative in Tuscany and Piedmont and has since spread nationwide, credited with normalising the now-common idea of visiting a winery in person rather than only ever meeting its wine on a shelf.|El evento comenzó en 1993 como una pequeña iniciativa regional en Toscana y Piamonte y desde entonces se ha extendido por todo el país, y se le atribuye haber normalizado la idea, hoy habitual, de visitar una bodega en persona.|L'événement a débuté en 1993 comme une petite initiative régionale en Toscane et au Piémont, avant de se répandre dans tout le pays, et on lui attribue d'avoir banalisé l'idée, aujourd'hui courante, de visiter une cave en personne.|この催しは1993年、トスカーナとピエモンテの小さな地方の取り組みとして始まり、その後全国に広がった。棚に並んだワインとしてしか出会わなかった酒蔵を実際に訪ねるという、いまでは当たり前の発想を根付かせたとされる。",
    ),
  },
  {
    e: "🏖️",
    n: t("The beach clubs open for the season|Los balnearios abren la temporada|Les clubs de plage ouvrent la saison|ビーチクラブが海開きする"),
    t: t(
      "Stabilimenti balneari along the coast plant their rows of matching umbrellas and sun loungers this month, renting the same numbered spot to the same families year after year with a loyalty that borders on inheritance, while June 2's Republic Day brings a military flypast trailing green, white and red smoke over Rome.|Los stabilimenti balneari de la costa plantan sus hileras de sombrillas y tumbonas iguales este mes, alquilando el mismo puesto numerado a las mismas familias año tras año con una fidelidad que roza la herencia.|Les stabilimenti balneari du littoral plantent ce mois-ci leurs rangées de parasols et transats assortis, louant le même emplacement numéroté aux mêmes familles année après année avec une fidélité proche de l'héritage.|海岸沿いのビーチクラブ(スタビリメント・バルネアーレ)は今月、揃いのパラソルとデッキチェアの列を立てる。同じ番号の一角を毎年同じ家族に貸し続け、その律義さはもはや相続に近い。6月2日の共和国記念日には、緑・白・赤の煙をなびかせる軍用機の編隊がローマの空を飛ぶ。",
    ),
    f: t(
      "A beach umbrella-and-lounger spot at a well-known stabilimento can be effectively passed down in a family for decades, with regulars greeting the same attendants each summer by name and often leaving a folded envelope of tip money at season's end.|Un puesto de sombrilla y tumbona en un stabilimento conocido puede pasar de hecho de generación en generación durante décadas, con clientes habituales que saludan cada verano por su nombre a los mismos encargados.|Une place de parasol et transat dans un stabilimento réputé peut effectivement se transmettre en famille pendant des décennies, les habitués saluant chaque été les mêmes employés par leur prénom.|よく知られたビーチクラブの傘とデッキチェアの一角は、事実上何十年も家族で代々受け継がれることがあり、常連は毎夏同じ係員を名前で呼び、シーズンの終わりには折りたたんだチップの封筒を渡すことも多い。",
    ),
  },
  {
    e: "🐎",
    n: t("Siena's summer race|La carrera de verano de Siena|La course d'été de Sienne|シエナの夏の競馬"),
    t: t(
      "The first of Siena's two Palio races each summer turns the whole shell-shaped main square into a dirt track for barely ninety frantic seconds, and heat across the peninsula climbs sharply enough this month that afternoon streets in the south genuinely empty out until the sun weakens.|La primera de las dos carreras del Palio de Siena cada verano convierte toda la plaza mayor en forma de concha en una pista de tierra durante apenas noventa frenéticos segundos, y el calor en la península sube este mes tan fuerte que las calles del sur se vacían de verdad por la tarde.|La première des deux courses du Palio de Sienne chaque été transforme toute la place principale en coquille en une piste de terre pour à peine quatre-vingt-dix secondes frénétiques, et la chaleur grimpe ce mois-ci assez fort sur la péninsule pour que les rues du sud se vident vraiment l'après-midi.|シエナで毎夏二度行われるパリオ競馬の一度目が、貝殻形の中央広場をわずか90秒の熱狂の土のコースに変える。今月は半島全体で暑さが急に増し、南部では午後の通りが本当に人気を失うほどになる。",
    ),
    f: t(
      "Each Palio horse is assigned by lot to one of Siena's historic contrade, and once drawn it is guarded around the clock in the days before the race against rumoured sabotage from rival neighbourhoods, real or imagined.|A cada caballo del Palio se le asigna por sorteo una de las contrade históricas de Siena, y una vez sorteado se le custodia día y noche antes de la carrera contra rumores de sabotaje de barrios rivales, reales o imaginados.|Chaque cheval du Palio est attribué par tirage au sort à l'une des contrade historiques de Sienne, et une fois désigné, il est gardé jour et nuit avant la course contre des rumeurs de sabotage venues des quartiers rivaux, réelles ou imaginaires.|パリオの馬はくじでシエナの歴史ある地区(コントラーダ)の一つに割り当てられ、決まったあとはレースまでの数日間、実際にせよ噂だけにせよライバル地区による妨害を警戒して昼夜見張りが付けられる。",
    ),
  },
  {
    e: "🎆",
    n: t("Ferragosto empties the cities|Ferragosto vacía las ciudades|Le Ferragosto vide les villes|フェラゴスト、街が空になる"),
    t: t(
      "Ferragosto on the fifteenth marks the dead centre of the national holiday, when entire neighbourhoods of shuttered shops hang the same handwritten \"chiuso per ferie\" sign and much of the country's workforce is at the coast or in the mountains at once. The monaciello, like everyone else, takes the month off.|El Ferragosto, el quince, marca el centro exacto de las vacaciones nacionales, cuando barrios enteros de tiendas cerradas cuelgan el mismo cartel manuscrito de «chiuso per ferie» y buena parte de la fuerza laboral del país está a la vez en la costa o en la montaña.|Le Ferragosto, le quinze, marque le cœur des vacances nationales, quand des quartiers entiers de boutiques fermées affichent le même écriteau manuscrit « chiuso per ferie » et qu'une bonne part de la main-d'œuvre du pays se retrouve à la fois sur la côte ou en montagne.|15日のフェラゴストは国民的休暇のちょうど真ん中にあたり、町じゅうの店が同じ手書きの「休業(キウーゾ・ペル・フェリエ)」の札を下げ、国の働き手の多くが一斉に海か山にいる。モナチェッロも、誰もと同じくこの月は休む。",
    ),
    f: t(
      "The holiday's name comes from the Feriae Augusti, a rest period declared by the emperor Augustus in 18 BC to follow the agricultural labour of high summer, meaning modern Italians are, technically, still observing an ancient Roman public holiday.|El nombre de la fiesta viene de las Feriae Augusti, un período de descanso declarado por el emperador Augusto en el año 18 a. C. tras el trabajo agrícola del pleno verano, así que los italianos modernos, técnicamente, siguen observando una fiesta pública de la Roma antigua.|Le nom de la fête vient des Feriae Augusti, une période de repos décrétée par l'empereur Auguste en 18 av. J.-C. après les travaux agricoles du cœur de l'été, si bien que les Italiens modernes observent, techniquement, encore une fête publique de la Rome antique.|この祝日の名は、紀元前18年に皇帝アウグストゥスが真夏の農作業のあとに定めた休息期間「フェリアエ・アウグスティ」に由来する。つまり現代のイタリア人は、厳密には古代ローマの祝日をいまも守っていることになる。",
    ),
  },
  {
    e: "🍇",
    n: t("The grape harvest and Venice's boat race|La vendimia y la regata de Venecia|Les vendanges et la régate de Venise|ぶどうの収穫とヴェネツィアの舟レース"),
    t: t(
      "Vendemmia sends pickers into the vineyards from north to south on a schedule set field by field, while Venice's Regata Storica fills the Grand Canal with ornately carved historic boats and crews in period costume racing past palazzo balconies rented out for the view. Children return to school this month, on a date fixed nationally rather than left to each region.|La vendimia manda a los recolectores a las viñas de norte a sur según un calendario fijado campo a campo, mientras la Regata Storica de Venecia llena el Gran Canal de barcas históricas ricamente talladas y tripulaciones de época que compiten ante balcones de palazzo alquilados por la vista.|Les vendanges envoient les cueilleurs dans les vignes du nord au sud selon un calendrier fixé parcelle par parcelle, tandis que la Regata Storica de Venise remplit le Grand Canal de barques historiques richement sculptées et d'équipages en costume d'époque courant devant des balcons de palazzo loués pour la vue.|収穫(ヴェンデンミア)は畑ごとに決まった日程で、北から南まで摘み手をぶどう畑へ送り込む。一方ヴェネツィアのレガータ・ストーリカは、彫刻を凝らした歴史的な舟と時代衣装の漕ぎ手たちで大運河を埋め、眺めのために貸し切られた館のバルコニーの前を競い漕ぎしていく。子どもたちは今月、地方ごとではなく全国一律の日付で新学期を迎える。",
    ),
    f: t(
      "The Regata Storica opens each year with a costumed historical procession re-enacting the 1489 welcome of Caterina Cornaro, the last queen of Cyprus, back to Venice after she ceded her island kingdom to the republic.|La Regata Storica abre cada año con un desfile histórico disfrazado que recrea la bienvenida de 1489 a Caterina Cornaro, la última reina de Chipre, de vuelta a Venecia tras ceder su reino insular a la república.|La Regata Storica s'ouvre chaque année par un cortège historique costumé rejouant l'accueil, en 1489, de Catherine Cornaro, dernière reine de Chypre, de retour à Venise après avoir cédé son royaume insulaire à la république.|レガータ・ストーリカは毎年、1489年にキプロス最後の女王カテリーナ・コルナーロが自らの島国をヴェネツィア共和国に譲り渡したのち帰還した様子を再現する時代衣装の行列で幕を開ける。",
    ),
  },
  {
    e: "🍄",
    n: t("Truffle hunters and chestnut roasters|Cazadores de trufas y asadores de castañas|Chasseurs de truffes et rôtisseurs de châtaignes|トリュフ猟師と栗焼き"),
    t: t(
      "The white truffle season around Alba opens this month, with dogs and their handlers working the oak woods before dawn, while roadside braziers roasting chestnuts appear on street corners further south as the first real chill of autumn sets in and olive picking for the year's new oil begins.|La temporada de trufa blanca en torno a Alba se abre este mes, con perros y sus guías trabajando los robledales antes del alba, mientras aparecen braseros de castañas asadas en las esquinas más al sur al llegar el primer frío otoñal de verdad, y empieza la recogida de aceitunas para el aceite nuevo del año.|La saison de la truffe blanche autour d'Alba s'ouvre ce mois-ci, chiens et maîtres travaillant les chênaies avant l'aube, tandis que des braseros de châtaignes grillées apparaissent aux coins de rue plus au sud dès le premier vrai froid de l'automne, et que la cueillette des olives pour l'huile nouvelle de l'année commence.|アルバ周辺の白トリュフの季節が今月始まり、夜明け前からオークの林で犬と猟師が働く。もっと南の街角では本格的な秋の冷え込みとともに焼き栗の炭火台が現れ始め、その年の新しいオリーブオイルのための収穫も始まる。",
    ),
    f: t(
      "White truffles cannot be cultivated the way black ones sometimes are and must always be found wild, which is part of why a single kilogram can sell at auction for several times an average monthly wage.|Las trufas blancas no se pueden cultivar como a veces se hace con las negras y siempre deben encontrarse silvestres, lo que en parte explica por qué un solo kilo puede venderse en subasta por varias veces un salario mensual medio.|Les truffes blanches ne peuvent être cultivées comme le sont parfois les noires et doivent toujours être trouvées à l'état sauvage, ce qui explique en partie qu'un seul kilo puisse se vendre aux enchères plusieurs fois un salaire mensuel moyen.|白トリュフは黒トリュフのように栽培することができず、必ず野生のものを探し当てなければならない。それも、たった1キロがオークションで平均月収の何倍もの値で落札される理由の一つである。",
    ),
  },
  {
    e: "🕯️",
    n: t("All Souls' visits and the year's last olives|Visitas de difuntos y las últimas aceitunas del año|Visites de la Toussaint et les dernières olives de l'année|万霊節の墓参りと今年最後のオリーブ"),
    t: t(
      "Families visit and tidy family graves around All Souls' Day at the start of the month, leaving fresh chrysanthemums, a flower otherwise rarely bought for any other occasion here since it is so tied to mourning, while the last of the olive harvest is pressed before the first hard frost can damage what remains on the trees.|Las familias visitan y arreglan las tumbas familiares en torno al día de los difuntos a principios de mes, dejando crisantemos frescos, una flor que aquí rara vez se compra para otra ocasión por estar tan ligada al luto.|Les familles visitent et fleurissent les tombes familiales autour de la Toussaint en début de mois, y déposant des chrysanthèmes frais, fleur que l'on achète ici rarement pour toute autre occasion tant elle reste liée au deuil.|月の初め、万霊節の頃に家族は墓参りをして手入れをし、生の菊の花を供える。菊はこの国では喪と強く結びついているため、ほかの機会にはめったに買われない花である。木に残ったオリーブが最初の本格的な霜で傷む前に、その年最後の収穫が搾油される。",
    ),
    f: t(
      "Giving or bringing chrysanthemums to a dinner party as a regular gift is considered a serious social mistake here, precisely because the flower is so specifically associated with cemetery visits rather than any celebration.|Regalar o llevar crisantemos a una cena como obsequio normal se considera aquí un serio desliz social, precisamente porque la flor está tan asociada a las visitas al cementerio y no a ninguna celebración.|Offrir ou apporter des chrysanthèmes à un dîner comme cadeau ordinaire y est considéré comme un impair social sérieux, précisément parce que la fleur reste si spécifiquement associée aux visites au cimetière plutôt qu'à toute célébration.|夕食会への手土産として菊の花を持っていくのは、この国では真剣な社交上の失礼とされる。この花が特定的に墓参りと結びつき、祝いごととは無縁とされているためである。",
    ),
  },
  {
    e: "🎄",
    n: t("Markets, lights and the presepe|Mercados, luces y el belén|Marchés, lumières et la crèche|クリスマス市と電飾、プレゼーペ",
    ),
    t: t(
      "Christmas markets fill town squares with wooden stalls selling ornaments, mulled wine and torrone nougat, and households assemble elaborate nativity scenes, presepi, that in some regions grow to fill entire tables with miniature villages built up over generations rather than just a manger.|Los mercados navideños llenan las plazas de puestos de madera con adornos, vino caliente y turrón, y las casas montan elaborados belenes, presepi, que en algunas regiones llegan a llenar mesas enteras con aldeas en miniatura construidas durante generaciones.|Les marchés de Noël remplissent les places de stands en bois vendant décorations, vin chaud et nougat torrone, et les foyers montent d'élaborées crèches, presepi, qui dans certaines régions finissent par couvrir des tables entières de villages miniatures bâtis sur des générations.|クリスマス市が町の広場を、飾り物やホットワイン、ヌガー菓子トッローネを売る木製の屋台で埋める。各家庭は精巧な降誕の場面(プレゼーペ)を組み立て、地方によっては馬小屋だけでなく、何世代もかけて作り足された小さな村ごと机いっぱいに広がることもある。",
    ),
    f: t(
      "Naples is particularly famous for presepe craftsmanship, and its San Gregorio Armeno street sells figurines year-round, including a long-running tradition of adding a small model of whichever celebrity or politician was most talked about that year.|Nápoles es especialmente famosa por la artesanía del presepe, y su calle de San Gregorio Armeno vende figuritas todo el año, incluida una tradición muy arraigada de añadir una pequeña figura del famoso o político más comentado del año.|Naples est particulièrement réputée pour l'artisanat du presepe, et sa rue San Gregorio Armeno vend des figurines toute l'année, avec notamment une longue tradition d'ajouter une petite figurine de la célébrité ou du politicien le plus commenté de l'année.|ナポリはプレゼーペ職人の技で特に名高く、サン・グレゴリオ・アルメーノ通りでは一年じゅう人形が売られている。その年いちばん話題になった有名人や政治家の小さな人形を新たに加える長年の習わしもある。",
    ),
  },
  {
    e: "🎁",
    n: t("Epiphany and the Befana|La Epifanía y la Befana|L'Épiphanie et la Befana|エピファニアとベファーナ"),
    t: t(
      "On the night of January 5th, an old woman called the Befana is said to fly on a broomstick to leave sweets in good children's stockings and a lump of coal, usually a dark rock candy version, in the naughty ones', closing out the holiday season on the twelfth day after Christmas exactly as the saying puts it: Epiphany takes all festivities away.|En la noche del 5 de enero, se dice que una anciana llamada la Befana vuela en escoba para dejar dulces en las medias de los niños buenos y un trozo de carbón, normalmente un caramelo negro, en las de los traviesos.|Dans la nuit du 5 janvier, une vieille femme appelée la Befana volerait sur un balai pour déposer des sucreries dans les chaussettes des enfants sages et un morceau de charbon, généralement un bonbon noir, dans celles des enfants turbulents.|1月5日の夜、ベファーナと呼ばれる老婆が箒に乗って飛び、良い子の靴下には菓子を、悪い子の靴下には(たいていは黒い飴で作られた)石炭のかけらを置いていくとされる。こうして「エピファニアはあらゆる祭りを持ち去る」という言い習わしどおり、クリスマスから12日目でその年の祝祭シーズンが締めくくられる。",
    ),
    f: t(
      "The Befana is generally thought to predate the Christian holiday itself, likely descended from older pre-Roman midwinter customs, and unlike Santa Claus she is drawn as an old woman on a broom rather than a gift-bringer with reindeer.|Se cree generalmente que la Befana es anterior a la propia fiesta cristiana, probablemente descendiente de costumbres prerromanas de pleno invierno, y a diferencia de Santa Claus se representa como una anciana en escoba, no como un repartidor de regalos con renos.|On pense généralement que la Befana précède la fête chrétienne elle-même, probablement héritée de coutumes préromaines du cœur de l'hiver, et contrairement au Père Noël, elle est représentée en vieille femme sur un balai plutôt qu'en donneur de cadeaux avec des rennes.|ベファーナはキリスト教の祝日そのものより古いとされ、おそらくローマ以前の真冬の習わしに由来すると考えられている。サンタクロースと違い、トナカイを連れた贈り物配達人ではなく箒に乗った老婆として描かれる。",
    ),
  },
  {
    e: "🎭",
    n: t("Masks fill the streets for Carnevale|Las máscaras llenan las calles en el Carnaval|Les masques envahissent les rues pour le Carnaval|カーニバルで街が仮面に埋まる"),
    t: t(
      "Carnevale season peaks this month with elaborate masked balls in Venice and confetti-throwing street parades elsewhere, all timed to end the night before Ash Wednesday begins the traditional weeks of Lenten restraint that follow. Fried, sugar-dusted pastries specific to the season appear in every bakery window at once.|La temporada de Carnaval alcanza su punto álgido este mes con elaborados bailes de máscaras en Venecia y desfiles callejeros con confeti en otros lugares, todo programado para acabar la noche antes de que empiece el Miércoles de Ceniza.|La saison du Carnaval atteint son pic ce mois-ci avec des bals masqués élaborés à Venise et des défilés de rue jetant des confettis ailleurs, le tout calé pour s'achever la nuit précédant le Mercredi des Cendres.|カーニバルの季節は今月に最高潮を迎え、ヴェネツィアでは凝った仮面舞踏会が、他の土地では紙吹雪をまき散らすパレードが開かれる。すべては灰の水曜日が始まる前夜に終わるよう組まれている。この季節特有の、砂糖をまぶした揚げ菓子がどの菓子店の窓にも一斉に並ぶ。",
    ),
    f: t(
      "Venice's carnival masks fall into a handful of traditional types, and the plain white, beak-nosed bauta was historically cut so a wearer could eat and drink through it without ever removing it, useful for staying anonymous at the gambling tables all night.|Las máscaras del carnaval veneciano se dividen en un puñado de tipos tradicionales, y la bauta blanca lisa de nariz en pico se cortaba históricamente para poder comer y beber sin quitársela, útil para mantener el anonimato toda la noche en las mesas de juego.|Les masques du carnaval vénitien se répartissent en une poignée de types traditionnels, et la bauta blanche unie au nez en bec était historiquement taillée pour qu'on puisse manger et boire sans jamais l'ôter, utile pour rester anonyme toute la nuit aux tables de jeu.|ヴェネツィアのカーニバルの仮面はいくつかの伝統的な型に分かれ、くちばし状の鼻を持つ無地の白い「バウタ」は、外さずに飲み食いできるよう歴史的に裁断されていた。夜通し賭博台で正体を隠しておくのに好都合だったからである。",
    ),
  },
  {
    e: "🌸",
    n: t("Almond blossom and the return of the light|El florecer del almendro y el regreso de la luz|La fleur d'amandier et le retour de la lumière|アーモンドの花と光の戻る季節"),
    t: t(
      "Sicily's almond trees bloom in a pale pink and white wave this month, celebrated with a folk-costume festival at the Valley of the Temples timed to the flowering, while further north the clocks spring forward and market stalls fill with the first wild asparagus and artichokes of the year.|Los almendros de Sicilia florecen este mes en una ola rosa pálido y blanca, celebrada con un festival de trajes populares en el Valle de los Templos sincronizado con la floración, mientras más al norte se adelanta el reloj y los puestos del mercado se llenan de los primeros espárragos silvestres y alcachofas del año.|Les amandiers de Sicile fleurissent ce mois-ci en une vague rose pâle et blanche, célébrée par un festival en costumes folkloriques dans la vallée des Temples au moment même de la floraison, tandis que plus au nord l'heure avance et que les étals se remplissent des premières asperges sauvages et artichauts de l'année.|シチリアのアーモンドの木は今月、淡いピンクと白の波のように花開き、その開花に合わせて神殿の谷で民族衣装の祭りが催される。もっと北では時計が夏時間に切り替わり、市場の露店にはその年最初の野生のアスパラガスとアーティチョークが並び始める。",
    ),
    f: t(
      "The Sagra del Mandorlo in Fiore, held among the ancient Greek temples of Agrigento, brings folk groups from around the world to perform alongside Sicilian musicians, making it as much an international folklore festival as a celebration of the local blossom.|La Sagra del Mandorlo in Fiore, celebrada entre los antiguos templos griegos de Agrigento, reúne a grupos folclóricos de todo el mundo para actuar junto a músicos sicilianos, lo que la convierte tanto en un festival internacional de folclore como en una celebración de la floración local.|La Sagra del Mandorlo in Fiore, tenue parmi les anciens temples grecs d'Agrigente, réunit des groupes folkloriques du monde entier se produisant aux côtés de musiciens siciliens, en faisant tout autant un festival international du folklore qu'une célébration de la floraison locale.|アグリジェントの古代ギリシャ神殿群の中で開かれる「アーモンドの花祭り」には世界中の民族舞踊団がシチリアの音楽家と共演しに集まり、地元の開花を祝う祭りであると同時に国際的な民俗フェスティバルにもなっている。",
    ),
  },
];
