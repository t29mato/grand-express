/**
 * スイスの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 韓国・日本・フランス・インドと同じく「地方まるごとの好不況」で差をつける。
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

export const SWITZERLAND_META = {
  id: "switzerland",
  name: t("Switzerland|Suiza|Suisse|スイス"),
  blurb: t(
    "A mountain confederation that armed its neutrality as fiercely as any war|Una confederación de montaña que armó su neutralidad tan fieramente como cualquier guerra|Une confédération de montagne qui a armé sa neutralité aussi farouchement qu'une guerre|中立を、どんな戦争にも劣らぬほど武装して守った山の国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランス・世界一周・茨城と同じ理由)。ここは暫定値100のまま。
  // 実際の倍率55の根拠は REGISTER.md に書いた。
  cur: { pre: "CHF ", post: "", mul: 100 },
  start: "bern",
  // 4公用語ぶんのアルプスの動物(独ステインボック=アイベックス/仏マルモット/
  // 伊ジペート=ヒゲワシ/ロマンシュ・ウォルス=熊)。歴史上の人物ではなく
  // あえて動物にして、史実の正確さを問われない領域に置いた。
  cpuNames: ["Steinbock", "Marmotte", "Gipeto", "Uors"],
  // 国旗の赤と白、ティチーノの青、ジュネーブ・ウーリの金、グラウビュンデンの黒。
  stripe: ["#d52b1e", "#ffffff", "#003f8c", "#f4c430", "#1a1a1a"],
};

/**
 * 4地方。`gr`は「ロマンシュ語圏」ではなく「グラウビュンデン州」で区切った
 * (理由は cities.mjs の冒頭コメントと REGISTER.md)。
 */
export const SWITZERLAND_REGIONS = {
  de: t("German-speaking Switzerland (Deutschschweiz)|Suiza de habla alemana (Deutschschweiz)|Suisse alémanique (Deutschschweiz)|ドイツ語圏(Deutschschweiz)"),
  fr: t("French-speaking Switzerland (Romandie)|Suiza francófona (Romandía)|Suisse romande|フランス語圏(ロマンディ)"),
  it: t("Italian-speaking Switzerland (Ticino)|Suiza italófona (Tesino)|Suisse italienne (Tessin)|イタリア語圏(ティチーノ)"),
  gr: t("Graubünden|Grisones|Grisons|グラウビュンデン州"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存29盤面と衝突しないことを確認済み(REGISTER.md参照)。
 */
export const SWITZERLAND_ITEMS = {
  foehn: {
    e: "💨",
    price: 260,
    kind: "move",
    n: t("A Gust of Föhn Wind|Una ráfaga de viento föhn|Une rafale de vent föhn|フェーン風の突風"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "The föhn is a warm, dry wind that spills down the northern side of the Alps after crossing the range, clearing the sky to an almost unnatural clarity while giving many people headaches and short tempers severe enough that some Swiss courts have historically weighed it as a mitigating factor in assault cases. Older wooden Alpine towns still keep strict rules against open flames on föhn days, remembering fires that a single gust once turned into a whole street burning.|El föhn es un viento cálido y seco que baja por el lado norte de los Alpes tras cruzar la cordillera, despejando el cielo hasta una claridad casi antinatural mientras provoca en muchas personas dolores de cabeza y un mal humor tan intenso que algunos tribunales suizos lo han considerado históricamente un atenuante en casos de agresión. Los pueblos alpinos más antiguos, de madera, aún mantienen normas estrictas contra el fuego abierto en días de föhn, en memoria de incendios que una sola ráfaga convirtió en toda una calle ardiendo.|Le föhn est un vent chaud et sec qui dévale le versant nord des Alpes après avoir franchi la chaîne, dégageant le ciel d'une clarté presque irréelle tout en donnant à beaucoup de gens des maux de tête et une irritabilité si forte que certains tribunaux suisses l'ont historiquement retenue comme circonstance atténuante dans des affaires d'agression. Les vieux villages alpins en bois maintiennent encore des règles strictes contre le feu ouvert les jours de föhn, en souvenir d'incendies qu'une seule rafale a jadis transformés en rue entière en flammes.|フェーンは、アルプスを越えて北側の斜面を吹き下ろす温かく乾いた風で、空をほとんど不自然なほど澄み切らせる一方、多くの人に頭痛や激しい苛立ちをもたらし、スイスの裁判所が過去に傷害事件の情状酌量の一因として重んじたことすらある。木造の古いアルプスの村々は、いまもフェーンの日には火気を厳しく禁じている。一陣の風が通り一本を丸ごと焼いた過去を覚えているからである。",
    ),
  },
  kursbuch: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Official Kursbuch Timetable|El horario oficial Kursbuch|L'horaire officiel Kursbuch|公式時刻表クアスブーフ"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "For over a century the Kursbuch listed the departure time of every train, postbus and lake steamer in the country down to the minute, thick enough to double as a doorstop, before the internet made the printed volume mostly obsolete. Swiss connections were built tight enough around it that a delay of a few minutes could still cost a traveller an entire missed onward journey.|Durante más de un siglo, el Kursbuch enumeró la hora de salida de cada tren, autobús postal y barco de vapor del país al minuto exacto, tan grueso que servía de tope de puerta, hasta que internet volvió casi obsoleto el volumen impreso. Los enlaces suizos se construían tan ajustados en torno a él que un retraso de pocos minutos aún podía costarle a un viajero perder toda la continuación de su viaje.|Pendant plus d'un siècle, le Kursbuch indiqua à la minute près l'heure de départ de chaque train, car postal et bateau à vapeur du pays, assez épais pour servir de cale-porte, avant qu'Internet ne rende le volume imprimé presque obsolète. Les correspondances suisses étaient calées si serré autour de lui qu'un retard de quelques minutes pouvait encore coûter à un voyageur toute la suite de son trajet.|一世紀以上のあいだ、クアスブーフは国内すべての列車・郵便バス・湖の遊覧船の発車時刻を分単位で載せており、ドアストッパーにできるほど分厚かった。インターネットが印刷版をほぼ過去のものにするまでのことである。スイスの乗り継ぎはこの時刻表を軸にあまりに緻密に組まれていたため、数分の遅れが旅の続き全体を棒に振らせることもあった。",
    ),
  },
  postauto: {
    e: "🚌",
    price: 340,
    kind: "pre",
    n: t("PostAuto Ticket|Billete de PostAuto|Billet de PostAuto|ポストアウト(郵便バス)の乗車券"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The bright yellow postbuses that climb narrow mountain roads to villages the railway never reached still sound a distinctive three-note horn call before blind curves, unchanged in shape for generations even as the vehicles themselves were modernised again and again. Where the road is too narrow for two vehicles to pass, the postbus has right of way over everything, including tour coaches three times its size.|Los autobuses postales de un amarillo brillante que suben por estrechas carreteras de montaña hasta pueblos a los que el ferrocarril nunca llegó aún tocan una distintiva llamada de tres notas antes de las curvas ciegas, sin cambiar de forma durante generaciones aunque los propios vehículos se hayan modernizado una y otra vez. Donde la carretera es demasiado estrecha para que pasen dos vehículos, el autobús postal tiene prioridad sobre todo, incluidos autocares tres veces más grandes.|Les cars postaux jaune vif qui grimpent des routes de montagne étroites vers des villages que le rail n'a jamais atteints font encore entendre un appel distinctif de trois notes au klaxon avant les virages sans visibilité, resté inchangé de génération en génération alors même que les véhicules eux-mêmes ont été modernisés maintes fois. Là où la route est trop étroite pour croiser un autre véhicule, le car postal a priorité sur tout, y compris des autocars trois fois plus gros que lui.|鉄道がついに届かなかった村々へ、狭い山道を登っていく鮮やかな黄色の郵便バスは、見通しの悪いカーブの前でいまも独特な三音のクラクションを鳴らす。車両そのものは何度も更新されてきたのに、この音型だけは何世代も変わっていない。道幅が二台分無い場所では、郵便バスはどんな大型観光バスよりも優先される。",
    ),
  },
  icn: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("ICN Tilting Express Ticket|Billete del expreso basculante ICN|Billet de l'express pendulaire ICN|振り子式特急ICNの乗車券"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The InterCity-Neigezug tilts its carriages into curves by a few degrees, letting it take bends faster than a normal train without throwing standing passengers sideways, a trick borrowed from motorcycle racing rather than invented for railways. It runs some of its fastest stretches on lines built more than a century earlier for trains a third as quick, squeezing modern speed out of an old alignment rather than a new one.|El InterCity-Neigezug inclina sus vagones unos pocos grados en las curvas, lo que le permite tomarlas más rápido que un tren normal sin lanzar a los pasajeros de pie hacia un lado, un truco tomado del motociclismo de carreras y no inventado para los ferrocarriles. Recorre algunos de sus tramos más rápidos por líneas construidas más de un siglo antes para trenes tres veces más lentos, exprimiendo velocidad moderna de un trazado antiguo en vez de uno nuevo.|L'InterCity-Neigezug incline ses voitures de quelques degrés dans les courbes, ce qui lui permet de les négocier plus vite qu'un train normal sans projeter les voyageurs debout sur le côté, une astuce empruntée à la course moto plutôt qu'inventée pour le rail. Il parcourt certains de ses tronçons les plus rapides sur des lignes construites plus d'un siècle plus tôt pour des trains trois fois plus lents, tirant une vitesse moderne d'un tracé ancien plutôt que neuf.|振り子式特急(インターシティ・ナイゲツーク)は、カーブで車体を数度傾けることで、立っている乗客を横に振り回すことなく通常の列車より速く曲がれる。この仕組みはオートバイレースから借りた発想で、鉄道のために考案されたものではない。最も速く走る区間の一部は、いまより三分の一も遅い列車のために百年以上前に敷かれた線路であり、新しい線路ではなく古い線形から現代の速さを絞り出している。",
    ),
  },
  kuhglocke: {
    e: "🔔",
    price: 320,
    kind: "passive",
    n: t("A Cowbell Left by the Door|Un cencerro dejado junto a la puerta|Une sonnaille laissée près de la porte|戸口に置かれた牛の首鈴"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Each herd's lead cow traditionally wears the largest bell, forged individually by hand and passed down for decades, and farmers say the sound carries far enough through fog or snow to call a scattered herd home without anyone climbing after it. In some Alpine communities a full set of bells still gets rung together each spring in a procession blessing the animals before they're driven up to the high pastures for summer.|La vaca líder de cada rebaño lleva tradicionalmente el cencerro más grande, forjado a mano de forma individual y transmitido durante décadas, y los granjeros dicen que el sonido llega lo bastante lejos entre la niebla o la nieve como para reunir a un rebaño disperso sin que nadie tenga que subir a buscarlo. En algunas comunidades alpinas, todo un juego de cencerros aún se hace sonar junto en una procesión de primavera que bendice a los animales antes de subirlos a los pastos de verano.|La vache meneuse de chaque troupeau porte traditionnellement la plus grande sonnaille, forgée individuellement à la main et transmise pendant des décennies, et les paysans disent que le son porte assez loin dans le brouillard ou la neige pour ramener un troupeau dispersé sans que personne n'ait à grimper le chercher. Dans certaines communautés alpines, tout un jeu de sonnailles est encore fait résonner ensemble chaque printemps lors d'une procession bénissant les bêtes avant leur montée aux alpages d'été.|群れの先頭に立つ牛には伝統的に最も大きな首鈴が着けられる。一つひとつ手作りで鍛えられ、何十年も受け継がれていく。農家によれば、その音は霧や雪の中でも遠くまで届き、誰も追いかけて登らずとも散らばった群れを呼び戻せるという。一部のアルプスの共同体では、いまも春になると鈴一式を一斉に鳴らす行列が行われ、家畜たちが夏の高地牧場へ追い上げられる前に祝福する。",
    ),
  },
  alphorn: {
    e: "📯",
    price: 440,
    kind: "pre",
    n: t("A Blast on the Alphorn|Un toque de cuerno alpino|Un appel au cor des Alpes|アルペンホルンの一吹き"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The alphorn, sometimes over three and a half metres of hollowed and bound wood, was originally a herding and signalling instrument, sounding across a valley to call cattle or warn neighbouring farms of danger long before it became a concert instrument played in matching rows at folk festivals. Its natural notes don't fit modern musical scales exactly, so composers writing for it have to work around pitches an ordinary instrument can't produce.|El cuerno alpino, a veces de más de tres metros y medio de madera ahuecada y ceñida con anillas, fue originalmente un instrumento de pastoreo y de señales, que resonaba por todo un valle para llamar al ganado o avisar a las granjas vecinas de un peligro, mucho antes de convertirse en un instrumento de concierto tocado en filas iguales en festivales folclóricos. Sus notas naturales no encajan exactamente en las escalas musicales modernas, así que los compositores que escriben para él tienen que arreglárselas con alturas que un instrumento corriente no puede producir.|Le cor des Alpes, parfois long de plus de trois mètres et demi de bois évidé et cerclé, fut d'abord un instrument de pâturage et de signal, résonnant à travers toute une vallée pour appeler le bétail ou avertir les fermes voisines d'un danger, bien avant de devenir un instrument de concert joué en rangs assortis dans les fêtes folkloriques. Ses notes naturelles ne correspondent pas exactement aux gammes musicales modernes, si bien que les compositeurs qui écrivent pour lui doivent composer avec des hauteurs qu'un instrument ordinaire ne peut produire.|時に3.5mを超える、くり抜いて束ねた木でできたアルペンホルンは、もともとは放牧と合図のための道具で、谷じゅうに音を響かせて牛を呼び集めたり、隣の農場に危険を知らせたりするために使われていた。フォークフェスティバルで列をなして演奏される演奏会用の楽器になるよりずっと前のことである。その自然倍音は現代の音階にきっちりとは収まらないため、この楽器のために曲を書く作曲家は、ふつうの楽器では出せない音の高さと折り合いをつけねばならない。",
    ),
  },
  spickzettel: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("A Matura Exam Cheat Sheet|Una chuleta del examen de Matura|Une antisèche de l'examen de maturité|マトゥーラ試験のカンニングペーパー"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "The Matura, the exam that opens the door to Swiss universities, is set and marked differently in each canton, and generations of students have folded tiny sheets of formulas and dates small enough to hide in a pencil case, a risk taken seriously enough that getting caught can void years of study in an afternoon. Passing it remains, in most cantons, a requirement no amount of private tutoring is supposed to be able to shortcut.|La Matura, el examen que abre la puerta a las universidades suizas, se plantea y corrige de forma distinta en cada cantón, y generaciones de estudiantes han doblado hojitas de fórmulas y fechas lo bastante pequeñas para esconderlas en un estuche, un riesgo tomado en serio porque que te pillen puede anular años de estudio en una tarde. Aprobarla sigue siendo, en la mayoría de los cantones, un requisito que ninguna cantidad de clases particulares debería poder sortear.|La Matura, l'examen qui ouvre la porte des universités suisses, est fixée et corrigée différemment selon les cantons, et des générations d'étudiants ont plié de minuscules feuilles de formules et de dates, assez petites pour se cacher dans une trousse, un risque pris au sérieux car se faire prendre peut annuler des années d'étude en un après-midi. La réussir reste, dans la plupart des cantons, une exigence qu'aucun soutien scolaire privé n'est censé pouvoir contourner.|スイスの大学への扉を開くマトゥーラ試験は、州ごとに出題も採点も異なる。何世代もの生徒が、公式や年号を書き込んだごく小さな紙を折りたたみ、筆箱に隠せる大きさにしてきた。見つかれば何年もの勉強が一日で無に帰しかねないため、これは真剣に取られたリスクである。合格することは、たいていの州でいまも、どれだけ家庭教師をつけても近道できないはずの必須条件であり続けている。",
    ),
  },
  fundbuero: {
    e: "🎒",
    price: 280,
    kind: "pre",
    n: t("An Afternoon at the Lost Property Auction|Una tarde en la subasta de objetos perdidos|Un après-midi à la vente aux enchères des objets trouvés|忘れ物競売での午後"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Zürich's main station holds one of the largest lost-and-found offices of any railway in Europe, and unclaimed umbrellas, bicycles and the occasional musical instrument are eventually auctioned off rather than thrown away, a sale some regulars attend every year specifically hoping for an underpriced bargain. Passengers who report a loss within a few days still get a real chance of it turning up untouched, sorted and shelved by an office that treats forgetfulness as routine.|La estación central de Zúrich alberga una de las mayores oficinas de objetos perdidos de cualquier ferrocarril de Europa, y paraguas, bicicletas y algún que otro instrumento musical no reclamados terminan subastándose en vez de tirarse, una venta a la que algunos habituales acuden cada año buscando precisamente una ganga mal tasada. Los pasajeros que denuncian una pérdida en pocos días aún tienen una posibilidad real de que aparezca intacta, clasificada y guardada en estantes por una oficina que trata el olvido como algo rutinario.|La gare centrale de Zurich abrite l'un des plus grands bureaux d'objets trouvés de tous les chemins de fer d'Europe, et parapluies, vélos et instruments de musique non réclamés finissent vendus aux enchères plutôt que jetés, une vente que certains habitués fréquentent chaque année en espérant justement une bonne affaire sous-cotée. Les voyageurs qui signalent une perte en quelques jours ont encore une réelle chance de la voir réapparaître intacte, triée et rangée par un bureau qui traite l'oubli comme une routine.|チューリヒ中央駅は欧州の鉄道でも屈指の規模を誇る忘れ物取扱所を構えており、持ち主が現れなかった傘や自転車、時には楽器までもが、捨てられずに最終的には競売にかけられる。この競売には、狙い目の掘り出し物を求めて毎年通う常連もいる。数日以内に紛失を届け出た乗客には、手つかずのまま仕分けられ棚に収まったそれが見つかる現実的な見込みがまだ残っている。忘れ物をありふれた日常として扱う窓口である。",
    ),
  },
  anschlusszug: {
    e: "🔁",
    price: 420,
    kind: "pre",
    n: t("A Connection Made With Seconds to Spare|Un enlace conseguido con segundos de margen|Une correspondance prise avec quelques secondes d'avance|数秒差で間に合った乗り継ぎ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The whole national timetable is built around the takt system, in which trains meet at major stations at the same few minutes each hour specifically so passengers can step from one platform to another with only a short wait, repeated on the hour every hour. The system depends on every single link running close to on time, since one late train can ripple delays across connections it was never itself carrying passengers to.|Todo el horario nacional se construye en torno al sistema takt, en el que los trenes se encuentran en las estaciones principales en los mismos minutos de cada hora, precisamente para que los pasajeros puedan pasar de un andén a otro con una espera breve, repetido cada hora en punto. El sistema depende de que cada enlace circule prácticamente puntual, ya que un solo tren con retraso puede propagar demoras a conexiones a las que ni siquiera llevaba pasajeros.|Tout l'horaire national est bâti autour du système du cadencement (Takt), où les trains se croisent dans les gares principales aux mêmes minutes de chaque heure, précisément pour que les voyageurs puissent passer d'un quai à l'autre avec une attente brève, répété à chaque heure pile. Le système dépend de ce que chaque maillon roule quasiment à l'heure, car un seul train en retard peut répercuter des retards sur des correspondances auxquelles il ne menait pourtant aucun passager.|国全体の時刻表は「タクト(等間隔運行)」方式を軸に組まれており、主要駅では毎時ほぼ同じ分に列車が行き交うことで、乗客は短い待ち時間だけでホームからホームへ乗り換えられるようになっている。これが毎時繰り返される。この仕組みは、あらゆる一本一本の列車がほぼ定刻どおりに走ることに依存しており、一本の遅れが、そもそも乗客を運んでいたわけでもない別の乗り継ぎにまで波及することがある。",
    ),
  },
};

/**
 * 厄災の神。アルプス民話に伝わるバルベガジ(巨大な足を持つ、雪山に棲む
 * 小さな精霊)にした。人を苦しめる悪霊ではなく、いたずら好きで度が過ぎる
 * だけの存在として描く(韓国のトッケビ・茨城のダイダラボウと同じ性格)。
 */
export const SWITZERLAND_SPIRIT = {
  e: "🦶",
  n: t("The Barbegazi|El Barbegazi|Le Barbegazi|バルベガジ"),
  big: t("The Barbegazi's Avalanche|El alud del Barbegazi|L'avalanche du Barbegazi|バルベガジの雪崩"),
  ward: "kuhglocke",
  arrive: t(
    "<b>🦶 A barbegazi has taken an interest in you.</b> Alpine folklore describes these small, snow-white, long-bearded gnomes as having feet large enough to serve as built-in skis, whistling as they slide down slopes for the fun of it and occasionally setting off small avalanches along the way — mischievous rather than cruel, and said to sleep through the warm months entirely. It now follows <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🦶 Un barbegazi se ha fijado en ti.</b> El folclore alpino describe a estos pequeños gnomos, blancos como la nieve y de larga barba, con pies lo bastante grandes como para servir de esquís incorporados, silbando mientras se deslizan por las laderas por pura diversión y provocando de vez en cuando pequeños aludes en el camino —traviesos más que crueles, y se dice que duermen durante todos los meses cálidos. Ahora sigue a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🦶 Un barbegazi s'est intéressé à toi.</b> Le folklore alpin décrit ces petits gnomes blancs comme neige, à longue barbe, dotés de pieds assez grands pour servir de skis intégrés, sifflant en dévalant les pentes pour le plaisir et déclenchant parfois de petites avalanches au passage — espiègles plus que cruels, et censés dormir tout au long des mois chauds. Il suit désormais <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🦶 バルベガジに目を付けられた。</b> アルプスの言い伝えによれば、この雪のように白く長いひげを蓄えた小さな妖精は、天然のスキーとして使えるほど大きな足を持ち、面白がって斜面を滑り降りながら口笛を吹き、時にはその拍子に小さな雪崩を起こすこともあるという。残酷なのではなく、ただのいたずら好きで、暖かい季節はまるまる眠って過ごすとされる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🦶 <b>The barbegazi</b> loses interest and slides off toward <b>{0}</b>, farthest from {1}.|🦶 <b>El barbegazi</b> pierde el interés y se desliza hacia <b>{0}</b>, el más lejano de {1}.|🦶 <b>Le barbegazi</b> se désintéresse et glisse vers <b>{0}</b>, le plus loin de {1}.|🦶 <b>バルベガジ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ滑っていった。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns with the barbegazi and never once made it lose its footing. It grins and sends the whole road tumbling — <b>the Barbegazi's Avalanche</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al barbegazi sin haberlo hecho perder el equilibrio ni una vez. Sonríe y hace que todo el camino se venga abajo: empieza <b>el alud del Barbegazi</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours avec le barbegazi sans jamais lui avoir fait perdre pied. Il sourit et fait dévaler toute la route — <b>l'avalanche du Barbegazi</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもバルベガジと歩いていながら、一度もその足を滑らせられなかった。彼はにやりと笑い、道全体を巻き込んで滑り落とす。<b>バルベガジの雪崩</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> tales describe barbegazi whistling loudly just before they trigger a small slide, supposedly to warn any chamois or hunters nearby to get clear first — a courtesy the legend never quite explains, since the avalanche was theirs to start in the first place.|<b>Tras la historia:</b> los relatos describen a los barbegazi silbando fuerte justo antes de provocar un pequeño desprendimiento, en teoría para avisar a las gamuzas o cazadores cercanos de que se aparten primero, una cortesía que la leyenda nunca acaba de explicar, ya que el alud era cosa suya desde el principio.|<b>Derrière l'histoire :</b> les récits décrivent les barbegazi sifflant fort juste avant de déclencher un petit éboulement, censément pour avertir chamois ou chasseurs alentour de se mettre à l'abri d'abord — une courtoisie que la légende n'explique jamais tout à fait, puisque l'avalanche était la leur depuis le départ.|<b>物語の背景:</b> 言い伝えによれば、バルベガジは小さな雪崩を起こす直前に大きく口笛を吹くという。近くのシャモアや猟師に先に逃げるよう知らせるためとされるが、そもそも雪崩を起こしたのは自分自身なのだから、この律儀さを伝説はついに説明してくれない。",
  ),
  pleased: t(
    "It stamps its huge feet in delight, and the snow it kicks loose turns out to be hiding a coin. <b>{0}</b> gains <span class='money'>+{1}</span>.|Pisotea de alegría con sus enormes pies, y la nieve que levanta resulta esconder una moneda. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il tape des pieds de joie, et la neige qu'il fait voler cachait une pièce. <b>{0}</b> gagne <span class='money'>+{1}</span>.|大きな足を嬉しそうに踏み鳴らすと、蹴り上げた雪の中から硬貨が一枚出てきた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A cowbell is rung loudly nearby. Barbegazi are said to hate sudden noise above all else, and it flinches and slips past <b>{0}</b> without noticing this turn.|Se hace sonar fuerte un cencerro cerca. Se dice que los barbegazi odian el ruido repentino sobre todas las cosas, y se sobresalta y pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une sonnaille retentit fort à proximité. On dit que les barbegazi détestent par-dessus tout le bruit soudain ; il sursaute et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|近くで牛の首鈴が大きく鳴らされた。バルベガジは何より突然の物音を嫌うという。彼はびくりとひるみ、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。3種は自然災害、3種は日常の出来事、1種はバルベガジのいたずら。 */
export const SWITZERLAND_DOOM = [
  {
    id: "steinschlag",
    n: t("Rockfall closes the line|Un desprendimiento de rocas cierra la línea|Un éboulement ferme la ligne|落石で線路が閉ざされる"),
    t: t(
      "A slab of loosened rock the size of a delivery van let go overnight and now sits square across the tracks, freed by exactly the kind of freeze-thaw cycle that keeps engineers walking these slopes with binoculars every spring and autumn. Clearing it means waiting for a crew with the right crane, not just a shovel.|Una losa de roca suelta, del tamaño de una furgoneta de reparto, se desprendió durante la noche y ahora yace atravesada sobre las vías, liberada por exactamente el tipo de ciclo de hielo y deshielo que mantiene a los ingenieros recorriendo estas laderas con prismáticos cada primavera y otoño. Despejarla implica esperar a un equipo con la grúa adecuada, no solo una pala.|Une dalle de roche détachée, de la taille d'une camionnette de livraison, s'est décrochée dans la nuit et repose maintenant en travers des voies, libérée par exactement le genre de cycle gel-dégel qui pousse les ingénieurs à arpenter ces pentes aux jumelles chaque printemps et chaque automne. La déblayer suppose d'attendre une équipe avec la bonne grue, pas seulement une pelle.|配送トラックほどの大きさの岩塊が一夜のうちに緩んで崩れ、いま線路をまっすぐふさいでいる。技術者たちが毎年春と秋に双眼鏡片手にこの斜面を見回る、まさにその原因である凍結と融解の繰り返しが引き起こしたものだ。取り除くにはシャベルではなく、しかるべきクレーンを備えた作業班を待つほかない。",
    ),
    months: [0, 1, 7, 8],
  },
  {
    id: "alpenlawine", // "lawine" は europe と鍵が衝突するため改名(2026-08-20 実測)
    n: t("An avalanche buries the pass|Un alud sepulta el paso|Une avalanche enterre le col|雪崩が峠を埋める"),
    t: t(
      "A slope that looked stable an hour ago let go all at once, and the road over the pass is now under several metres of packed snow and broken pine. Avalanche control teams had already fired warning charges that morning, which is exactly why nobody was on the slope when it happened — small comfort to anyone now waiting for the road to reopen.|Una ladera que hacía una hora parecía estable se vino abajo de golpe, y la carretera del paso queda ahora bajo varios metros de nieve compacta y pinos rotos. Los equipos de control de aludes ya habían disparado cargas de aviso esa misma mañana, que es justo la razón de que nadie estuviera en la ladera cuando ocurrió: poco consuelo para quien ahora espera a que reabran la carretera.|Un versant qui semblait stable une heure plus tôt a lâché d'un coup, et la route du col se trouve désormais sous plusieurs mètres de neige tassée et de pins brisés. Les équipes de contrôle des avalanches avaient déjà tiré des charges d'avertissement ce matin-là, ce qui explique justement que personne ne se trouvait sur la pente au moment des faits — maigre consolation pour qui attend maintenant la réouverture de la route.|一時間前まで安定して見えていた斜面が、いっぺんに崩れ落ちた。峠の道はいま、締まった雪と折れた松の木の下に数メートル埋もれている。雪崩対策班はその朝すでに警告のための発破をかけていた。だからこそ誰も斜面にいなかったのだが、いま道の再開通を待つ者にとってはさしたる慰めにもならない。",
    ),
    months: [8, 9, 10, 11],
  },
  {
    id: "schneeschmelze", // "hochwasser" は既存盤面と鍵が衝突するため改名(2026-08-20 実測)
    n: t("Snowmelt floods the valley floor|El deshielo inunda el fondo del valle|La fonte des neiges inonde le fond de la vallée|雪解け水が谷底を洪水にする"),
    t: t(
      "A sudden warm spell melted a winter's worth of snow faster than the rivers could carry it away, and the valley floor's fields and cellars are now under brown water the colour of the mountains it came from. Insurers here have priced this into premiums for generations, since a valley this steep drains fast in both directions: dry in a hot summer, and suddenly not.|Una ola de calor repentina derritió toda la nieve del invierno más rápido de lo que los ríos podían evacuarla, y ahora los campos y sótanos del fondo del valle están bajo un agua marrón del color de las montañas de las que procede. Aquí las aseguradoras llevan generaciones incluyendo esto en las primas, porque un valle tan escarpado drena rápido en ambos sentidos: seco en un verano caluroso, y de pronto ya no.|Un coup de chaud soudain a fait fondre toute la neige de l'hiver plus vite que les rivières ne pouvaient l'évacuer, et les champs et les caves du fond de la vallée se retrouvent sous une eau brune de la couleur des montagnes d'où elle vient. Les assureurs d'ici intègrent cela dans leurs primes depuis des générations, car une vallée aussi encaissée s'écoule vite dans les deux sens : sèche un été chaud, et soudain plus du tout.|急な暖気が、川が運びきれない速さで一冬分の雪をいっぺんに溶かし、谷底の畑や地下室はいま、それが流れ出てきた山と同じ色の茶色い水に浸かっている。ここの保険会社は何世代も前からこれを保険料に織り込んでいる。これほど急峻な谷は両方向にすぐ表情を変える。暑い夏には乾き、あるときふいにそうではなくなる。",
    ),
    months: [1, 2],
  },
  {
    id: "foehnsturm",
    n: t("A föhn storm rips through|Una tormenta de föhn arrasa el valle|Une tempête de föhn balaie la vallée|フェーン嵐が吹き荒れる"),
    t: t(
      "The warm wind that usually just gives everyone a headache turned into gale-force gusts overnight, tearing tiles from roofs and toppling anything not properly secured along the valley. Firefighters spend nights like this on standby rather than asleep, because the same dry wind that broke the shutters is also exactly what a stray spark needs.|El viento cálido que normalmente solo da dolor de cabeza a todo el mundo se convirtió durante la noche en rachas de fuerza de vendaval, arrancando tejas de los tejados y derribando todo lo que no estuviera bien asegurado en el valle. Los bomberos pasan noches así de guardia en vez de durmiendo, porque el mismo viento seco que rompió las contraventanas es también justo lo que necesita una chispa perdida.|Le vent chaud qui ne donne d'habitude qu'un mal de tête à tout le monde s'est changé en rafales de force tempête pendant la nuit, arrachant des tuiles aux toits et renversant tout ce qui n'était pas bien arrimé dans la vallée. Les pompiers passent des nuits comme celle-ci d'astreinte plutôt qu'à dormir, car le même vent sec qui a brisé les volets est aussi exactement ce dont une étincelle égarée a besoin.|ふだんはただ頭痛の種でしかない温かい風が、一夜のうちに暴風となり、屋根の瓦を剥ぎ取り、しっかり固定されていなかったものを谷じゅうでなぎ倒した。消防団はこういう夜、眠らずに待機する。鎧戸を壊したのと同じ乾いた風が、飛び火にとってまさに好都合な条件でもあるからである。",
    ),
  },
  {
    id: "abstimmungssonntag",
    n: t("Referendum Sunday changes the timetable|El domingo de referéndum cambia el horario|Le dimanche référendaire change l'horaire|国民投票の日曜、時刻表が変わる"),
    t: t(
      "Today's vote drew such heavy turnout at the local polling station that the municipality rerouted the connecting bus to serve as extra parking overflow, a decision made by the same direct democracy that just decided three unrelated national questions this morning. Nobody thought to post the change anywhere a traveller might actually see it before missing the connection entirely.|La votación de hoy atrajo tanta afluencia al colegio electoral local que el municipio desvió el autobús de enlace para usarlo como aparcamiento extra, una decisión tomada por la misma democracia directa que esta mañana acaba de resolver otras tres cuestiones nacionales sin relación. A nadie se le ocurrió anunciar el cambio en un sitio donde un viajero pudiera verlo antes de perder la conexión por completo.|Le scrutin du jour a attiré une telle affluence au bureau de vote local que la commune a détourné le bus de correspondance pour servir de parking supplémentaire, une décision prise par la même démocratie directe qui vient de trancher ce matin trois questions nationales sans rapport. Personne n'a pensé à afficher le changement quelque part où un voyageur aurait pu le voir avant de rater complètement sa correspondance.|今日の投票は地元の投票所にあまりに多くの人を集めたため、自治体は乗り継ぎバスを臨時駐車場の誘導用に振り替えてしまった。今朝、それとは無関係な国政の案件を三つも決めたのと同じ直接民主主義による決定である。旅行者の目に留まる場所にこの変更を知らせようと思いついた者は誰もおらず、乗り継ぎはそのまま逃した。",
    ),
    months: [1, 5, 7, 10],
  },
  {
    id: "raclette-missgeschick",
    n: t("The raclette grill tips over|Se vuelca la parrilla de raclette|Le gril à raclette se renverse|ラクレットの鉄板がひっくり返る"),
    t: t(
      "A sleeve caught the little tabletop grill mid-scrape, and half a wheel of melted cheese went straight onto the wooden table, the guest's lap and a rug that was definitely not meant to be part of dinner. The host insists this happens at least once a season and has stopped being precious about the tablecloth.|Una manga enganchó la pequeña parrilla de sobremesa a mitad del raspado, y medio queso derretido cayó directo sobre la mesa de madera, el regazo del invitado y una alfombra que desde luego no estaba pensada para formar parte de la cena. El anfitrión insiste en que esto pasa al menos una vez por temporada y ha dejado de preocuparse por el mantel.|Une manche a accroché le petit gril de table en plein raclage, et la moitié d'une meule fondue a atterri directement sur la table en bois, les genoux de l'invité et un tapis qui n'était certainement pas censé faire partie du dîner. L'hôte assure que cela arrive au moins une fois par saison et a cessé de s'inquiéter pour la nappe.|袖がテーブルの小さな鉄板に引っかかり、削っている最中だった半玉分の溶けたチーズがそのまま木のテーブルと客の膝、そしてこの夕食には確実に予定されていなかった絨毯の上に落ちた。主人は毎シーズン少なくとも一度はこれが起きると言い、テーブルクロスのことはもう気にしないことにしている。",
    ),
    months: [8, 9, 10],
  },
  {
    id: "barbegazi-gil",
    n: t("Led astray in the fog|Extraviado en la niebla|Égaré dans le brouillard|霧の中で迷わされる"),
    t: t(
      "The path down looked exactly the same at every switchback, and only once the fog lifts does it become clear that the same boulder was passed three times. Old tales blame a barbegazi for exactly this trick, whistling just out of sight to lead a traveller in useless circles until it gets bored and the weather finally clears.|El sendero de bajada parecía idéntico en cada revuelta, y solo cuando se levanta la niebla queda claro que se pasó tres veces junto a la misma roca. Los viejos relatos culpan de esta treta exacta a un barbegazi, que silba justo fuera de la vista para hacer dar vueltas inútiles a un viajero hasta que se aburre y el tiempo por fin se despeja.|Le sentier de descente semblait identique à chaque lacet, et ce n'est qu'une fois le brouillard levé qu'il devient clair que le même rocher a été croisé trois fois. Les vieux récits en accusent un barbegazi, qui siffle juste hors de vue pour faire tourner en rond un voyageur jusqu'à s'en lasser et laisser enfin le temps se dégager.|下りの道はどの九十九折りでも同じ景色に見え、霧が晴れてはじめて同じ岩の前を三度も通っていたと分かった。昔話はこの仕掛けをバルベガジのしわざだとする。姿を見せないまま口笛を吹いて旅人を無意味にぐるぐる歩かせ、やがて飽きて天気がようやく晴れるまで続くのだという。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。地方まるごとの好不況で差をつける
 * (効果の数値は `src/infrastructure/content/season-and-doom-rules.ts` の
 * switzerland の項)。時計・チョコレート・アルプスの観光案内にしないよう、
 * 具体的な行事・制度・気象を選んである。
 */
export const SWITZERLAND_SEASONS = [
  {
    e: "🔥",
    n: t("Zürich burns its snowman|Zúrich quema a su muñeco de nieve|Zurich brûle son bonhomme de neige|チューリヒが雪だるまを焼く"),
    t: t(
      "Zürich's guilds parade through the old town in historical dress, mounted and on foot, before setting fire to a giant snowman stuffed with firecrackers atop a bonfire — the Böögg's head is meant to explode within a set time, and old belief holds that a fast explosion promises a hot, dry summer ahead. Guild members who aren't riding horses spend the following days comparing notes on whose float looked best.|Los gremios de Zúrich desfilan por el casco antiguo con trajes históricos, a caballo y a pie, antes de prender fuego a un muñeco de nieve gigante relleno de petardos sobre una hoguera —se supone que la cabeza del Böögg debe estallar en un tiempo determinado, y la creencia antigua sostiene que una explosión rápida promete un verano caluroso y seco. Los miembros del gremio que no van a caballo pasan los días siguientes comparando de quién era la mejor carroza.|Les corporations de Zurich défilent dans la vieille ville en costume d'époque, à cheval et à pied, avant de mettre le feu à un bonhomme de neige géant bourré de pétards au sommet d'un bûcher — la tête du Böögg est censée exploser dans un délai fixé, et la croyance ancienne veut qu'une explosion rapide promette un été chaud et sec. Les membres de corporation qui ne montent pas à cheval passent les jours suivants à comparer qui avait le plus beau char.|チューリヒの同業組合は史実衣装をまとい、馬に乗った者も徒歩の者も旧市街を練り歩いたのち、爆竹を詰めた巨大な雪だるまに火をつける。ブーグの頭は決められた時間内に爆発することになっており、昔からの言い伝えでは、爆発が早いほど暑く乾いた夏になるとされる。馬に乗らなかった組合員たちは、その後何日もどの山車が一番よかったかを語り合って過ごす。",
    ),
    f: t(
      "The custom dates only to the 1900s in its current form, though the guilds parading it are centuries-older trade associations that once controlled who could work which craft inside the city walls, long before any of them needed a snowman to justify a public holiday.|La costumbre en su forma actual data solo de principios del siglo XX, aunque los gremios que desfilan son asociaciones de oficios varios siglos más antiguas que antaño controlaban quién podía ejercer cada oficio dentro de las murallas, mucho antes de que ninguno necesitara un muñeco de nieve para justificar un día festivo.|La coutume sous sa forme actuelle ne date que du début du XXe siècle, bien que les corporations qui défilent soient des associations de métiers plusieurs fois centenaires, qui contrôlaient jadis qui pouvait exercer quel artisanat dans l'enceinte de la ville, bien avant qu'aucune d'elles n'ait besoin d'un bonhomme de neige pour justifier un jour férié.|この行事が現在の形になったのは20世紀初頭に過ぎないが、行列を作る同業組合そのものは、かつて城壁の中で誰がどの職を営めるかを取り仕切っていた、何世紀も古い職業団体である。雪だるまを口実に祝日を作る必要が生じるよりずっと前からの存在である。",
    ),
  },
  {
    e: "🥾",
    n: t("Mountain huts reopen for the season|Los refugios de montaña reabren la temporada|Les cabanes de montagne rouvrent pour la saison|山小屋が今シーズンに向けて開く"),
    t: t(
      "As the last avalanche risk eases on the higher routes, hut wardens ski or hike up with the first supply loads of the season, restocking refuges that have sat locked and empty since autumn under metres of snow. Many of these huts run entirely on solar power and helicopter deliveries, since no road reaches most of them at all.|A medida que el último riesgo de alud se disipa en las rutas más altas, los guardas de los refugios suben esquiando o caminando con la primera carga de suministros de la temporada, reabasteciendo refugios que han permanecido cerrados y vacíos desde el otoño bajo metros de nieve. Muchos de estos refugios funcionan enteramente con energía solar y entregas en helicóptero, ya que la mayoría no tiene ninguna carretera de acceso.|Tandis que le dernier risque d'avalanche s'atténue sur les itinéraires les plus hauts, les gardiens de cabane montent à ski ou à pied avec le premier chargement de ravitaillement de la saison, réapprovisionnant des refuges restés fermés et vides depuis l'automne sous des mètres de neige. Beaucoup de ces cabanes fonctionnent entièrement à l'énergie solaire et aux livraisons par hélicoptère, aucune route n'atteignant la plupart d'entre elles.|高所の登山道で雪崩の危険がようやく和らぐと、山小屋の管理人はスキーや徒歩でシーズン最初の物資を担ぎ上げ、秋から数メートルの雪の下で施錠されたまま空になっていた小屋に補給する。これらの小屋の多くは太陽光発電とヘリコプター輸送だけで運営されている。ほとんどの小屋には、そもそも道路が一本も通じていないからである。",
    ),
    f: t(
      "The Swiss Alpine Club network includes over 150 staffed and unstaffed huts, some dating to the nineteenth century, built specifically to let climbers reach high routes without carrying tents — a piece of shared mountain infrastructure that predates any of the country's ski resorts.|La red del Club Alpino Suizo incluye más de 150 refugios con y sin guarda, algunos del siglo XIX, construidos específicamente para que los alpinistas alcanzaran rutas altas sin cargar tiendas de campaña —una infraestructura de montaña compartida anterior a cualquier estación de esquí del país.|Le réseau du Club alpin suisse compte plus de 150 cabanes gardées et non gardées, certaines datant du XIXe siècle, construites précisément pour permettre aux alpinistes d'atteindre les itinéraires d'altitude sans porter de tente — une infrastructure de montagne partagée antérieure à toutes les stations de ski du pays.|スイス山岳会のネットワークには、管理人常駐・無人を合わせて150軒を超える山小屋があり、中には19世紀にさかのぼるものもある。登山者がテントを担がずに高所ルートへ到達できるようにと、あえて建てられたものだ。国内のどのスキーリゾートよりも古い、共有の山岳インフラである。",
    ),
  },
  {
    e: "🐄",
    n: t("Herds walk up to the high pastures|Los rebaños suben a los pastos de altura|Les troupeaux montent aux alpages|家畜が高地牧場へ登る",
    ),
    t: t(
      "Herds are driven up from the valley floor to communal high pastures for the summer, a rotation of grazing rights among families that has been negotiated village by village for centuries rather than decided by any single landowner. The lead cows wear the largest bells and flower headdresses, though the economics behind the walk matter more than the decoration: cheese made up here is priced differently from cheese made in the valley.|Los rebaños suben desde el fondo del valle hasta los pastos comunales de altura para el verano, una rotación de derechos de pasto entre familias negociada aldea por aldea durante siglos y no decidida por ningún propietario único. Las vacas líderes llevan los cencerros más grandes y tocados de flores, aunque la economía detrás de la subida importa más que el adorno: el queso hecho aquí arriba se tasa de forma distinta al hecho en el valle.|Les troupeaux montent du fond de la vallée vers les alpages communaux pour l'été, une rotation des droits de pâture entre familles négociée village par village depuis des siècles plutôt que décidée par un seul propriétaire. Les vaches meneuses portent les plus grandes sonnailles et des couronnes de fleurs, mais l'économie derrière la montée compte plus que la décoration : le fromage fait ici est tarifé différemment de celui fait dans la vallée.|家畜は夏のあいだ、谷底から共有の高地牧場へと追い上げられる。放牧権を家々の間で回す慣行は、どこか一人の地主が決めたのではなく、何世紀も村ごとに交渉されてきたものである。先頭の牛は最も大きな鈴と花の冠を着けるが、この移動を支えているのは飾りよりも経済の仕組みのほうである。ここで作られるチーズは、谷で作られるチーズとは値の付き方が違う。",
    ),
    f: t(
      "Rights to graze a given alpine meadow, known as Allmend, are often owned collectively by a village rather than by any one farmer, a form of commons management old enough to predate the modern Swiss state by centuries.|Los derechos de pasto de un prado alpino determinado, conocidos como Allmend, suelen ser propiedad colectiva de una aldea y no de un único agricultor, una forma de gestión comunal lo bastante antigua como para preceder en siglos al estado suizo moderno.|Les droits de pâture d'un alpage donné, appelés Allmend, appartiennent souvent collectivement à un village plutôt qu'à un seul agriculteur, une forme de gestion commune assez ancienne pour précéder de plusieurs siècles l'État suisse moderne.|特定の高地牧草地の放牧権は「アルメンド(入会地)」と呼ばれ、一人の農家ではなく村全体の共有財産であることが多い。この共同管理のかたちは、近代スイス国家よりも何世紀も古い。",
    ),
  },
  {
    e: "🥐",
    n: t("Parliament breaks as the high routes clear|El parlamento hace receso al despejarse las rutas altas|Le parlement fait relâche quand les hautes routes se dégagent|高所の登山道が開き、議会が休会する",
    ),
    t: t(
      "The federal parliament in Bern breaks for its summer recess just as the high routes finally clear of snow, and mountain huts fill with hikers attempting multi-day traverses between them, some following paths engineers first cut for chamois hunters and salt traders rather than for tourism at all. A politician who wants to avoid being quoted for a month knows exactly when to stop answering the phone.|El parlamento federal en Berna hace receso de verano justo cuando las rutas altas por fin se despejan de nieve, y los refugios de montaña se llenan de excursionistas que intentan travesías de varios días entre ellos, algunos siguiendo senderos que los ingenieros abrieron primero para cazadores de gamuzas y comerciantes de sal, no para el turismo. Un político que quiere evitar que lo citen durante un mes sabe exactamente cuándo dejar de contestar el teléfono.|Le parlement fédéral à Berne entre en pause estivale juste au moment où les hautes routes se dégagent enfin de neige, et les cabanes de montagne se remplissent de randonneurs tentant des traversées de plusieurs jours entre elles, certains suivant des sentiers que des ingénieurs avaient d'abord tracés pour des chasseurs de chamois et des marchands de sel, non pour le tourisme. Un politicien qui veut éviter d'être cité pendant un mois sait précisément quand cesser de répondre au téléphone.|ベルンの連邦議会は、高所の登山道がついに雪から解放されるのとちょうど同じ頃、夏季休会に入る。山小屋は数日がかりの縦走に挑む登山者で埋まり、その道の一部は観光のためではなく、かつてシャモア猟師や塩の行商人のために技術者が切り開いた道である。一か月間引用されたくない政治家は、いつ電話に出るのをやめればよいか、心得ている。",
    ),
    f: t(
      "Switzerland's parliament is a militia system: most members hold other jobs and are only paid for the days they sit, which is part of why a full summer recess remains standard practice rather than an occasional indulgence.|El parlamento suizo es un sistema de milicia: la mayoría de sus miembros tienen otros trabajos y solo cobran por los días de sesión, lo que en parte explica por qué un receso de verano completo sigue siendo la norma y no un capricho ocasional.|Le parlement suisse fonctionne en système de milice : la plupart des membres exercent un autre métier et ne sont payés que les jours de séance, ce qui explique en partie pourquoi une pause estivale complète reste la norme plutôt qu'une fantaisie occasionnelle.|スイスの議会は「民兵制」的な仕組みで、多くの議員は他に本業を持ち、報酬は開会した日にしか支払われない。夏に議会が丸ごと休みになるのが例外ではなく通例であり続けている理由の一端である。",
    ),
  },
  {
    e: "🏔️",
    n: t("Bonfires chain across the hillsides|Las hogueras encadenan las laderas|Des feux s'enchaînent sur les collines|尾根伝いに篝火の鎖がつながる",
    ),
    t: t(
      "On the night of the first, bonfires are lit on hillsides across the country in a chain visible from valley to valley, and children carry paper lanterns through the streets after dark while a sweet bread traditionally gets baked for the day. The fires burn on countless private and communal peaks regardless of what any document from 1291 does or doesn't say about how the day came to be marked.|En la noche del día uno, se encienden hogueras en las laderas de todo el país formando una cadena visible de valle en valle, y los niños llevan farolillos de papel por las calles al anochecer mientras se hornea tradicionalmente un pan dulce para la ocasión. Las hogueras arden en incontables cimas privadas y comunales sin importar lo que diga o deje de decir cualquier documento de 1291 sobre cómo llegó a marcarse este día.|Dans la nuit du premier, des feux de joie sont allumés sur les collines à travers tout le pays en une chaîne visible de vallée en vallée, et les enfants portent des lanternes de papier dans les rues à la nuit tombée pendant qu'un pain sucré est traditionnellement cuit pour l'occasion. Les feux brûlent sur d'innombrables sommets privés et communaux, quoi qu'un document de 1291 dise ou ne dise pas sur la façon dont ce jour en est venu à être marqué.|1日の夜、国じゅうの丘という丘に篝火が灯され、谷から谷へと連なる鎖のように見える。日が暮れると子どもたちは紙の提灯を手に通りを歩き、この日のために甘いパンが焼かれるのが習わしである。火は数え切れない私有地や共有地の頂で燃え続けるが、それは1291年のどんな文書がこの日をどう記していようと、あるいは記していまいと関係のないことである。",
    ),
    f: t(
      "Fireworks sales spike so heavily around the first that some cantons now restrict private displays to reduce wildfire risk on the very slopes the bonfires are lit on, an irony not lost on the fire brigades who staff both nights.|La venta de fuegos artificiales se dispara tanto en torno al día uno que algunos cantones ya restringen los espectáculos privados para reducir el riesgo de incendio forestal en las mismas laderas donde arden las hogueras, una ironía que no se les escapa a los bomberos que cubren ambas noches.|Les ventes de feux d'artifice grimpent tant autour du premier que certains cantons restreignent désormais les tirs privés pour réduire le risque d'incendie de forêt sur les pentes mêmes où brûlent les feux de joie, une ironie qui n'échappe pas aux pompiers de garde ces deux nuits-là.|1日の前後は花火の売上が跳ね上がりすぎるため、一部の州はいまや個人の花火を制限している。まさに篝火が燃えるその同じ斜面での山火事の危険を減らすためであり、両方の夜に詰める消防団にはそのなんとも言えない皮肉が分からないはずがない。",
    ),
  },
  {
    e: "🍇",
    n: t("Pickers move through the vine terraces|Los vendimiadores recorren las terrazas de viñedo|Les vendangeurs parcourent les terrasses viticoles|摘み手がぶどう畑の段々畑を巡る",
    ),
    t: t(
      "Pickers move through the steep stone-walled terraces above Lake Geneva and along the slopes of Valais and Ticino, cutting bunches by hand on inclines too sharp for most machinery, while village squares fill with the first tastings of the year straight from the press. Vintners here grow well over two hundred grape varieties across the country's tiny wine-growing area, far more than its modest export profile would suggest.|Los vendimiadores recorren las escarpadas terrazas de piedra sobre el lago Lemán y las laderas de Valais y Tesino, cortando racimos a mano en pendientes demasiado pronunciadas para casi cualquier máquina, mientras las plazas de los pueblos se llenan con las primeras catas del año recién salidas del lagar. Los viticultores de aquí cultivan bastante más de doscientas variedades de uva en la diminuta superficie vinícola del país, muchas más de lo que su modesto perfil exportador haría suponer.|Les vendangeurs parcourent les terrasses escarpées en pierre au-dessus du lac Léman et sur les pentes du Valais et du Tessin, coupant les grappes à la main sur des pentes trop raides pour la plupart des machines, tandis que les places de village se remplissent des premières dégustations de l'année tout juste sorties du pressoir. Les vignerons d'ici cultivent bien plus de deux cents cépages sur la minuscule surface viticole du pays, bien plus que ne le laisserait supposer son modeste profil à l'export.|摘み手たちは、レマン湖を見下ろす石垣の急な段々畑や、ヴァレー・ティチーノの斜面を巡り、ほとんどの機械が入れないほどの急傾斜で房を手で切り取る。村の広場は、搾ったばかりのその年最初の試飲でにぎわう。ここの生産者は、国のごく狭いぶどう畑の面積の中で200種を優に超える品種を育てており、控えめな輸出量からは想像しにくいほどの多様さである。",
    ),
    f: t(
      "Most Swiss wine never leaves the country: production is small enough, and demand at home strong enough, that many labels are essentially unknown outside their own canton, let alone abroad.|La mayor parte del vino suizo nunca sale del país: la producción es lo bastante pequeña, y la demanda interna lo bastante fuerte, como para que muchas etiquetas sean prácticamente desconocidas fuera de su propio cantón, y no digamos en el extranjero.|La plupart des vins suisses ne quittent jamais le pays : la production est assez restreinte, et la demande locale assez forte, pour que de nombreuses étiquettes soient pratiquement inconnues hors de leur propre canton, sans parler de l'étranger.|スイスのワインの大半は国外に出ない。生産量が少なく、国内の需要が強いため、多くの銘柄は自分の州の外ではほとんど知られておらず、まして海外となればなおさらである。",
    ),
  },
  {
    e: "🌼",
    n: t("Herds parade back down for autumn|Los rebaños desfilan de vuelta para el otoño|Les troupeaux défilent en redescendant pour l'automne|家畜が秋を迎え行列で下りてくる",
    ),
    t: t(
      "The herds come back down from the high pastures decorated with flower crowns and the season's largest bells, parading through valley towns in a procession that doubles as the unofficial start of the cheese season, since wheels made on the alp all summer are only now ready to sell. The descent happens earlier if the first hard frost threatens the grass, later in a mild year — the animals' schedule, not the calendar's.|Los rebaños bajan de los pastos de altura adornados con coronas de flores y los cencerros más grandes de la temporada, desfilando por los pueblos del valle en una procesión que hace también de inicio no oficial de la temporada del queso, ya que las ruedas hechas en el alpe durante todo el verano solo ahora están listas para vender. El descenso ocurre antes si la primera helada fuerte amenaza el pasto, más tarde en un año templado: el calendario lo marcan los animales, no la fecha.|Les troupeaux redescendent des alpages, parés de couronnes de fleurs et des plus grandes sonnailles de la saison, défilant à travers les villages de la vallée en un cortège qui fait aussi office de début officieux de la saison du fromage, les meules faites à l'alpage tout l'été n'étant prêtes à la vente qu'à ce moment-là. La descente a lieu plus tôt si le premier gel dur menace l'herbe, plus tard une année clémente — c'est le calendrier des bêtes, pas celui du calendrier.|家畜たちは花の冠とその季節でいちばん大きな鈴を飾って高地牧場から下りてきて、谷の町を練り歩く。この行列はチーズの季節の非公式な始まりも兼ねている。夏じゅう高地で作られてきた丸いチーズが、ようやく売り出せる状態になるからである。最初の厳しい霜が牧草を脅かせば下山は早まり、温暖な年には遅くなる。決めるのは暦ではなく家畜たちの都合である。",
    ),
    f: t(
      "A cow that spent the summer producing milk at altitude is popularly said to make richer cheese than one grazing the valley floor, a claim dairies have never fully agreed on how to price, let alone prove.|Se dice popularmente que una vaca que pasó el verano produciendo leche en altitud da un queso más rico que una que pasta en el fondo del valle, una afirmación que las queserías nunca han terminado de ponerse de acuerdo en cómo tasar, y mucho menos demostrar.|On dit couramment qu'une vache ayant passé l'été à produire du lait en altitude donne un fromage plus riche qu'une vache paissant au fond de la vallée, une affirmation que les fromageries ne se sont jamais vraiment accordées à chiffrer, encore moins à prouver.|夏を高地で乳を出して過ごした牛は、谷底で草を食む牛よりも濃いチーズになると俗に言われるが、乳業者たちはこれをどう値段に反映すべきか、ましてどう証明すべきかについて、いまだに意見が一致していない。",
    ),
  },
  {
    e: "🌫️",
    n: t("Fog seals the lowlands under a sea of cloud|La niebla sella las tierras bajas bajo un mar de nubes|Le brouillard scelle les basses terres sous une mer de nuages|霧が低地を雲海の下に閉じ込める",
    ),
    t: t(
      "A grey lid of fog settles over the Mittelland's cities and lakes and can sit there for days or weeks at a stretch, while a short train or cable-car ride up any nearby slope breaks through it into clear winter sunshine above a sea of white cloud. Commuters who work in the valley and live on the hillside — or the other way around — learn to check two separate weather forecasts each morning rather than one.|Una tapa gris de niebla se posa sobre las ciudades y lagos del Mittelland y puede quedarse ahí días o semanas seguidas, mientras un corto trayecto en tren o teleférico por cualquier ladera cercana la atraviesa hasta un sol de invierno despejado sobre un mar de nubes blancas. Los que trabajan en el valle y viven en la ladera —o al revés— aprenden a consultar cada mañana dos partes meteorológicos distintos en vez de uno.|Un couvercle gris de brouillard s'installe sur les villes et les lacs du Mittelland et peut y rester des jours ou des semaines d'affilée, tandis qu'un court trajet en train ou en téléphérique sur n'importe quel versant voisin le traverse pour déboucher sur un plein soleil d'hiver au-dessus d'une mer de nuages blancs. Ceux qui travaillent dans la vallée et vivent sur le coteau — ou l'inverse — apprennent à consulter chaque matin deux bulletins météo distincts plutôt qu'un seul.|灰色の霧の蓋がミッテルラントの街や湖の上に降り、そのまま何日も何週間も居座ることがある。一方、近くのどの斜面でも、列車やロープウェイに少し乗るだけでそれを突き抜け、白い雲海の上に広がる澄んだ冬の日差しに出られる。谷で働き丘の中腹に住む人々——あるいはその逆の人々——は、毎朝一つではなく二つの天気予報を確かめる習慣を身につけている。",
    ),
    f: t(
      "This temperature inversion traps cold, damp air in the lowlands beneath a warmer layer above, the same physical effect that keeps woodsmoke and pollution from clearing out of Alpine valleys in still winter weather.|Esta inversión térmica atrapa aire frío y húmedo en las tierras bajas bajo una capa más cálida encima, el mismo efecto físico que impide que el humo de leña y la contaminación se despejen de los valles alpinos en tiempo invernal en calma.|Cette inversion de température piège l'air froid et humide des basses terres sous une couche plus chaude au-dessus, le même effet physique qui empêche la fumée de bois et la pollution de se dissiper des vallées alpines par temps d'hiver calme.|この気温の逆転現象は、冷たく湿った空気を、より暖かい層の下の低地に閉じ込める。凪いだ冬の日にアルプスの谷から薪の煙や大気汚染が抜けきらないのと、まったく同じ物理現象である。",
    ),
  },
  {
    e: "🕯️",
    n: t("Bell-ringing processions drive out the old year|Procesiones de cencerros expulsan al año viejo|Des cortèges de sonnailles chassent la vieille année|鈴を鳴らす行列が古い年を追い払う",
    ),
    t: t(
      "In parts of central Switzerland, processions march through the dark carrying enormous illuminated headdresses built from paper and lit from within, while cowbell-wearing figures crack long whips and blow on cow horns loudly enough to be heard across the valley. The noise is the point: the custom is generally explained as driving out the spirits of a dying year to make room for the new one.|En algunas zonas de la Suiza central, procesiones marchan en la oscuridad portando enormes tocados iluminados hechos de papel e iluminados por dentro, mientras figuras cargadas de cencerros chasquean largos látigos y soplan cuernos de vaca lo bastante fuerte como para oírse por todo el valle. El ruido es lo esencial: la costumbre suele explicarse como una forma de expulsar a los espíritus del año que termina para dejar sitio al nuevo.|Dans certaines régions de Suisse centrale, des cortèges marchent dans le noir en portant d'énormes coiffes illuminées faites de papier et éclairées de l'intérieur, tandis que des silhouettes chargées de sonnailles font claquer de longs fouets et soufflent dans des cornes de vache assez fort pour s'entendre à travers toute la vallée. Le bruit est le but même : la coutume s'explique généralement comme chassant les esprits de l'année finissante pour faire place à la nouvelle.|中央スイスの一部地域では、暗闇の中を紙で作られ内側から灯りをともした巨大な頭飾りを掲げた行列が練り歩き、牛の首鈴を身にまとった者たちが長い鞭を打ち鳴らし、谷じゅうに届くほど大きく牛の角笛を吹く。この騒々しさこそが目的である。この習わしは一般に、去りゆく年の霊を追い払い、新しい年のための場所を空けるためのものと説明される。",
    ),
    f: t(
      "Building one of the largest headdresses, some over a metre tall and lit by dozens of small candles, can take a family workshop the better part of the preceding year, passed down and rebuilt season after season rather than bought ready-made.|Construir uno de los tocados más grandes, algunos de más de un metro de altura e iluminados por decenas de velas pequeñas, puede llevarle a un taller familiar la mayor parte del año anterior, transmitido y rehecho temporada tras temporada en vez de comprado ya hecho.|Construire l'une des plus grandes coiffes, certaines dépassant le mètre de haut et éclairées par des dizaines de petites bougies, peut occuper un atelier familial une bonne partie de l'année précédente, transmise et refaite saison après saison plutôt qu'achetée toute faite.|一部の最も大きな頭飾りは高さ1mを超え、何十本もの小さな蝋燭で灯される。それを作るのに、一家の作業場が前年の大半を費やすこともある。既製品を買うのではなく、代々受け継がれ、季節ごとに作り直されるものである。",
    ),
  },
  {
    e: "⚠️",
    n: t("The avalanche bulletin is checked every morning|El boletín de aludes se consulta cada mañana|Le bulletin d'avalanches est consulté chaque matin|毎朝、雪崩情報が確かめられる",
    ),
    t: t(
      "The national avalanche danger scale, published fresh each morning on a one-to-five rating, gets checked by anyone heading off a marked piste as closely as a commuter checks a delayed train, and a rating of three or above is enough to turn back groups who'd otherwise have gone. Rescue teams say most incidents involve people who saw the day's rating and decided their own judgement mattered more.|La escala nacional de peligro de aludes, publicada de nuevo cada mañana con una valoración de uno a cinco, la consulta cualquiera que se aparte de una pista marcada con la misma atención con que un viajero mira un tren con retraso, y una valoración de tres o más basta para hacer dar media vuelta a grupos que de otro modo habrían seguido. Los equipos de rescate dicen que la mayoría de los incidentes implican a personas que vieron la valoración del día y decidieron que su propio juicio pesaba más.|L'échelle nationale de danger d'avalanche, republiée chaque matin sur une cote de un à cinq, est consultée par quiconque quitte une piste balisée avec autant d'attention qu'un usager consulte un train en retard, et une cote de trois ou plus suffit à faire rebrousser chemin à des groupes qui seraient autrement partis. Les équipes de secours disent que la plupart des incidents concernent des gens qui ont vu la cote du jour et jugé que leur propre avis comptait davantage.|一から五までの段階で毎朝新しく発表される全国雪崩危険度は、指定コースを外れて進む者なら誰もが、通勤客が遅延情報を確かめるのと同じくらいの熱心さで確認する。危険度3以上であれば、それだけでなければ出発していたはずの一行を引き返させるのに十分である。救助隊によれば、事故の多くはその日の危険度を見た上で、自分の判断のほうを重んじた人々に起きているという。",
    ),
    f: t(
      "The scale was developed collaboratively across several Alpine countries specifically so a single number would mean the same thing whether read in a Swiss, Austrian or French forecast, rather than each country inventing its own incompatible system.|La escala se desarrolló de forma conjunta entre varios países alpinos precisamente para que un mismo número significara lo mismo tanto en un parte suizo como austriaco o francés, en vez de que cada país inventara su propio sistema incompatible.|L'échelle a été mise au point conjointement par plusieurs pays alpins précisément pour qu'un même chiffre signifie la même chose dans un bulletin suisse, autrichien ou français, plutôt que chaque pays n'invente son propre système incompatible.|この尺度は複数のアルプス諸国が共同で作り上げたもので、各国が互換性のない独自の基準を作るのではなく、スイスでもオーストリアでもフランスでも、同じ数字が同じ意味を持つようにするためである。",
    ),
  },
  {
    e: "🎭",
    n: t("Basel plunges into three days of darkness and drums|Basilea se sumerge en tres días de oscuridad y tambores|Bâle plonge dans trois jours d'obscurité et de tambours|バーゼルが三日間、闇と太鼓に沈む",
    ),
    t: t(
      "At four in the morning, every streetlight in Basel's old town is switched off and the Morgestraich begins: thousands of masked drummers and piccolo players step off in the dark behind hand-painted lanterns, launching three days of carnival that Protestant Basel, unlike Catholic Lucerne, holds a full week after the rest of the country's carnivals have already finished. Satirical newspapers printed only for the occasion mock the year's politicians by name, protected by a custom of licensed rudeness that ordinary manners mostly leave alone.|A las cuatro de la madrugada se apagan todas las farolas del casco antiguo de Basilea y empieza el Morgestraich: miles de tamborileros y flautines enmascarados arrancan en la oscuridad tras faroles pintados a mano, dando inicio a tres días de carnaval que la protestante Basilea, a diferencia de la católica Lucerna, celebra una semana entera después de que los demás carnavales del país ya hayan terminado. Periódicos satíricos impresos solo para la ocasión se burlan por su nombre de los políticos del año, protegidos por una costumbre de grosería con licencia que las normas habituales de trato mayormente dejan pasar.|À quatre heures du matin, tous les lampadaires de la vieille ville de Bâle s'éteignent et le Morgestraich commence : des milliers de tambours et de piccolos masqués s'ébranlent dans le noir derrière des lanternes peintes à la main, ouvrant trois jours de carnaval que la Bâle protestante, à la différence de la Lucerne catholique, tient une semaine pleine après la fin des autres carnavals du pays. Des journaux satiriques imprimés pour la seule occasion tournent en dérision les politiciens de l'année, nommément, protégés par une coutume de grossièreté autorisée que les usages ordinaires laissent largement faire.|午前4時、バーゼル旧市街の街灯がすべて消され、モルゲンシュトライヒが始まる。何千人もの覆面の太鼓奏者とピッコロ奏者が、手描きの提灯を掲げて暗闇の中を進み出し、三日間のカーニバルの幕が開く。カトリックのルツェルンとは違い、プロテスタントのバーゼルは、国内の他のカーニバルがすべて終わったちょうど一週間後にこれを開く。この機会のためだけに刷られる風刺新聞は、その年の政治家を実名で笑いものにする。ふだんの礼儀作法がおおむね目をつぶる「免許付きの無礼」という習わしに守られてのことである。",
    ),
    f: t(
      "Basel's carnival was recognised on UNESCO's intangible heritage list in 2017, cited specifically for how tightly its schedule, music and lantern-painting traditions are passed down within family cliques called Cliquen rather than run by any central organiser.|El carnaval de Basilea fue reconocido en la lista de patrimonio inmaterial de la UNESCO en 2017, citado específicamente por lo estrechamente que su calendario, su música y sus tradiciones de pintura de faroles se transmiten dentro de camarillas familiares llamadas Cliquen, en vez de ser dirigido por ningún organizador central.|Le carnaval de Bâle fut inscrit au patrimoine immatériel de l'UNESCO en 2017, cité précisément pour la façon dont son calendrier, sa musique et ses traditions de peinture de lanternes se transmettent étroitement au sein de cliques familiales appelées Cliquen, plutôt que d'être dirigés par un organisateur central.|バーゼルのカーニバルは2017年、ユネスコの無形文化遺産に登録された。称えられたのは、中央の主催者がいるわけでもなく、日程・音楽・提灯絵付けの伝統が「クリーク」と呼ばれる家族的な仲間内でいかに緊密に受け継がれているか、その点だった。",
    ),
  },
  {
    e: "🌬️",
    n: t("Föhn wind peaks and the snow line climbs|El föhn llega a su punto álgido y la línea de nieve sube|Le föhn atteint son pic et la limite des neiges grimpe|フェーンが最も吹き、雪線が押し上げられる",
    ),
    t: t(
      "The warm wind peaks in frequency this month, clearing the sky to a hard blue and pushing the freezing line absurdly high for the season, so that a valley floor can sit in shirtsleeve weather while the peaks above still carry a full winter's snow. Farmers watch it as closely as any forecast, since a few föhn days in a row can strip a slope bare well before the grass beneath is ready to grow back.|El viento cálido alcanza su máxima frecuencia este mes, despejando el cielo hasta un azul intenso y empujando la isoterma cero grados a una altura absurda para la temporada, de modo que el fondo del valle puede estar en mangas de camisa mientras las cumbres siguen cubiertas por la nieve de todo el invierno. Los agricultores lo vigilan tan de cerca como cualquier pronóstico, ya que unos días seguidos de föhn pueden desnudar una ladera mucho antes de que la hierba de debajo esté lista para volver a crecer.|Le vent chaud atteint sa fréquence maximale ce mois-ci, dégageant un ciel d'un bleu intense et repoussant l'isotherme zéro à une altitude absurde pour la saison, si bien que le fond de la vallée peut connaître un temps en bras de chemise pendant que les sommets portent encore toute la neige de l'hiver. Les paysans le surveillent d'aussi près que n'importe quel bulletin, car quelques jours de föhn d'affilée peuvent mettre un versant à nu bien avant que l'herbe en dessous ne soit prête à repousser.|温かい風はこの月に最も頻繁に吹き、空を刺すような青に晴れ上がらせ、この季節にしては異様なほど氷点高度を押し上げる。谷底はシャツ一枚の陽気になる一方、頭上の峰々にはまだ冬いっぱいの雪が残っている。農家はどんな天気予報にも劣らぬ熱心さでこれを見張る。フェーンが数日続けば、下の草がまだ生え変わる準備もできていないうちに、斜面をむき出しにしてしまうことがあるからである。",
    ),
    f: t(
      "The name has been borrowed into general vocabulary to describe any hot, dry, headache-inducing wind anywhere in the world, an export from Alpine meteorology into everyday language that most speakers no longer connect to Switzerland at all.|El nombre se ha tomado prestado en el vocabulario general para describir cualquier viento caliente, seco y que provoca dolor de cabeza en cualquier parte del mundo, una exportación de la meteorología alpina al lenguaje cotidiano que la mayoría de los hablantes ya ni siquiera asocia con Suiza.|Le nom a été emprunté dans le vocabulaire courant pour décrire n'importe quel vent chaud, sec et migraineux n'importe où dans le monde, une exportation de la météorologie alpine vers le langage quotidien que la plupart des locuteurs ne relient plus du tout à la Suisse.|この語は一般の語彙にまで取り込まれ、世界のどこであれ、暑く乾いた頭痛を誘う風を指す言葉として使われるようになった。アルプスの気象用語が日常語へと輸出された例だが、いまではほとんどの話者がスイスと結びつけて考えることさえない。",
    ),
  },
];
