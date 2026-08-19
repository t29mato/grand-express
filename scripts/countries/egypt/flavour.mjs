/**
 * エジプトの国情報・地方区分・アイテム・厄災の神・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・韓国・フランスと同じく「地方まるごとの好不況」で差をつける。
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

export const EGYPT_META = {
  id: "egypt",
  name: t("Egypt|Egipto|Égypte|エジプト"),
  blurb: t(
    "A nation drawn onto a green thread through a sea of empty desert|Una nación trazada sobre un hilo verde en medio de un mar de desierto vacío|Une nation tracée sur un fil vert au milieu d'une mer de désert vide|海のような空の砂漠の中、一本の緑の糸の上に描かれた国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ。
  // 12,000,000円 ÷ 3円/EGP ÷ 1200 ≒ 3333 → 3300(team-lead確認済み、2026-08-19)。
  cur: { pre: "", post: " £E", mul: 3300 },
  start: "cairo",
  cpuNames: ["الفلاح El-Fallah", "الملاح El-Mallah", "أم الدنيا Umm El-Donia", "الصياد El-Sayad"],
  // エジプト国旗の紅・白・黒、紋章の金、ナイルを思わせる緑。
  stripe: ["#ce1126", "#ffffff", "#000000", "#c09a3e", "#2e7d4f"],
};

/** 6地方(cities.mjs 冒頭のコメントと同じ)。 */
export const EGYPT_REGIONS = {
  cairo: t("Greater Cairo|El Gran Cairo|Le Grand Caire|大カイロ"),
  delta: t("The Nile Delta|El delta del Nilo|Le delta du Nil|ナイルデルタ"),
  canal: t("Along the Suez Canal|A lo largo del canal de Suez|Le long du canal de Suez|スエズ運河沿い"),
  medit: t("The western Mediterranean coast|La costa mediterránea occidental|La côte méditerranéenne occidentale|地中海沿岸(西)"),
  valley: t("The Nile Valley of Middle Egypt|El valle del Nilo del Egipto Medio|La vallée du Nil de Moyenne-Égypte|中部エジプトのナイル渓谷"),
  upper: t("Upper Egypt|El Alto Egipto|La Haute-Égypte|上エジプト南部"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。鍵の衝突は
 * REGISTER.md に記載)。
 */
export const EGYPT_ITEMS = {
  feluccawind: {
    e: "⛵",
    price: 300,
    kind: "move",
    n: t("A Ride on a Felucca's Wind|Un paseo con el viento de una falucha|Une traversée portée par le vent d'une felouque|風任せのファルーカ"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Feluccas have no engine and only a single triangular sail, so a good boatman reads the wind and current together rather than fighting either; a crossing that takes ten minutes one afternoon can take an hour the next. Cairo's felucca fleet still sails almost exactly as its ancestors did on the Nile centuries ago, one of the few kinds of boat traffic the river never mechanised.|Las faluchas no tienen motor, solo una vela triangular, así que un buen barquero lee el viento y la corriente juntos en vez de forzar ninguno; un cruce que toma diez minutos una tarde puede tardar una hora la siguiente. La flota de faluchas de El Cairo aún navega casi como lo hacían sus antepasadas en el Nilo hace siglos.|Les felouques n'ont pas de moteur, seulement une unique voile triangulaire, si bien qu'un bon batelier lit le vent et le courant ensemble plutôt que de lutter contre l'un ou l'autre ; une traversée de dix minutes un après-midi peut en prendre une heure le lendemain. La flotte de felouques du Caire navigue encore presque comme le faisaient ses ancêtres sur le Nil il y a des siècles.|ファルーカにはエンジンがなく、三角の帆が一枚あるだけである。だから腕の良い船頭は風と流れのどちらとも張り合わず、両方を読んで乗る。ある日の午後は十分で終わる横断が、次の日には一時間かかることもある。カイロのファルーカ船団は、何世紀も前の祖先とほとんど変わらない姿でいまもナイル川を渡っている。この川で数少ない、機械化されなかった船の交通である。",
    ),
  },
  camelpace: {
    e: "🐫",
    price: 380,
    kind: "pre",
    n: t("A Camel Caravan's Steady Pace|El paso firme de una caravana de camellos|Le pas régulier d'une caravane de chameaux|ラクダ隊商の一定の歩み"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "A loaded camel walks at a pace so steady that traders on the old desert roads could reckon distance almost to the hour just by counting days on the trail, without a map. Camels can go roughly a week without drinking, the only reason routes like the old road to Darfur ever crossed stretches of desert with no well at all.|Un camello cargado camina a un paso tan regular que los comerciantes de las viejas rutas del desierto podían calcular la distancia casi a la hora, contando días de camino, sin mapa. Los camellos pueden pasar cerca de una semana sin beber, la única razón por la que rutas como el viejo camino a Darfur cruzaban tramos de desierto sin un solo pozo.|Un chameau chargé marche d'un pas si régulier que les marchands des vieilles routes désertiques pouvaient estimer la distance presque à l'heure près, rien qu'en comptant les jours de marche, sans carte. Les chameaux peuvent tenir près d'une semaine sans boire, seule raison pour laquelle des routes comme l'ancienne piste vers le Darfour traversaient des étendues désertiques sans le moindre puits.|荷を積んだラクダは非常に一定した歩調で歩くため、昔の砂漠の道の商人たちは地図なしに、旅した日数を数えるだけでほぼ時間単位まで距離を見積もることができた。ラクダは一週間近く水を飲まずに歩けるので、ダルフールへの古い道のような、井戸が一つもない区間を横切る道が成り立っていた。",
    ),
  },
  microbusride: {
    e: "🚐",
    price: 340,
    kind: "pre",
    n: t("A Shared Microbus Seat|Un asiento compartido en microbús|Une place partagée en microbus|乗合ミニバスの相席"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Egypt's private microbuses fill every seat before leaving, and passengers shout their stop over each other's heads to a driver who is also handling fares, so a short ride means constant renegotiation of who is getting off where. Officially these routes barely exist on any map, yet they carry a large share of the country's daily short-distance trips.|Los microbuses privados de Egipto no salen hasta llenar todos los asientos, y los pasajeros gritan su parada por encima de los demás a un conductor que también cobra los pasajes, así que un trayecto corto implica una renegociación constante de quién baja dónde. Oficialmente estas rutas casi no existen en ningún mapa, pero llevan buena parte de los trayectos cortos diarios del país.|Les microbus privés d'Égypte ne partent qu'une fois tous les sièges remplis, et les passagers crient leur arrêt par-dessus la tête des autres à un chauffeur qui encaisse aussi les tarifs, si bien qu'un court trajet est une renégociation constante de qui descend où. Officiellement, ces itinéraires n'existent presque sur aucune carte, et pourtant ils assurent une bonne part des trajets courts quotidiens du pays.|エジプトの民間ミニバスは満席になるまで出発せず、乗客は運賃も扱う運転手に向かって、互いの頭越しに降りる場所を叫ぶ。だから短い区間でも、誰がどこで降りるかの絶え間ないやり取りが続く。この路線網は公式にはどの地図にもほとんど載っていないが、国内の日常的な近距離移動のかなりの部分を担っている。",
    ),
  },
  deserthighspeed: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the New Desert Line|Un billete de la nueva línea del desierto|Un billet pour la nouvelle ligne du désert|新しい砂漠横断高速線の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "In 2021, Egypt signed a contract for a new high-speed rail network built partly through open desert rather than following the Nile, its first mainline in over a century not shaped by the river. The first segments opened for testing later in the decade, running electric trains built to cut journeys that once took most of a day down to a couple of hours.|En 2021, Egipto firmó un contrato para una nueva red de alta velocidad construida en parte a través de desierto abierto en vez de seguir al Nilo, su primera línea principal en más de un siglo que no está determinada por el río. Los primeros tramos se abrieron a pruebas ya avanzada la década, con trenes eléctricos pensados para reducir a un par de horas trayectos que antes ocupaban casi un día entero.|En 2021, l'Égypte a signé un contrat pour un nouveau réseau à grande vitesse construit en partie à travers le désert plutôt qu'en suivant le Nil, sa première grande ligne en plus d'un siècle à ne pas être façonnée par le fleuve. Les premiers tronçons ont ouvert aux essais plus tard dans la décennie, avec des trains électriques conçus pour ramener à quelques heures des trajets qui prenaient autrefois presque une journée entière.|2021年、エジプトはナイル川沿いではなく開けた砂漠を貫く区間を含む新しい高速鉄道網の契約を結んだ。一世紀以上ぶりに、川の形に縛られない幹線である。その後の数年で最初の区間が試験走行を始め、かつてはほぼ丸一日かかった行程を数時間に縮める電気列車が走り始めた。",
    ),
  },
  ironnail: {
    e: "🔩",
    price: 320,
    kind: "passive",
    n: t("An Iron Nail in the Pocket|Un clavo de hierro en el bolsillo|Un clou de fer dans la poche|懐に忍ばせた鉄釘"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Old village belief across the Nile Valley holds that jinn dislike the touch of iron, so a plain nail carried in a pocket or hung over a doorway was thought enough to keep one from crossing the threshold. Grandmothers in some villages still tuck a small piece of iron into a cradle, a habit that has long outlasted anyone's certainty about why it started.|Una vieja creencia rural del valle del Nilo sostiene que a los yinn les disgusta el contacto del hierro, así que llevar un clavo sencillo en el bolsillo o colgarlo sobre una puerta se consideraba suficiente para impedir que uno cruzara el umbral. En algunos pueblos, las abuelas todavía meten un trocito de hierro en la cuna.|Une vieille croyance villageoise de la vallée du Nil veut que les djinns détestent le contact du fer, si bien que porter un simple clou dans une poche ou le suspendre au-dessus d'une porte suffisait, croyait-on, à empêcher l'un d'eux de franchir le seuil. Dans certains villages, les grand-mères glissent encore un petit bout de fer dans un berceau.|ナイル渓谷に伝わる古い村の言い伝えによれば、ジンは鉄に触れるのを嫌うという。だからポケットに入れたただの釘や、戸口に吊るした釘だけで、ジンが敷居を越えてくるのを防ぐには十分だと考えられてきた。いまも一部の村では、祖母たちが小さな鉄片を揺りかごに忍ばせる。なぜそうするのか、確かな理由を知る者はもういない。",
    ),
  },
  saltoveshoulder: {
    e: "🧂",
    price: 440,
    kind: "pre",
    n: t("A Pinch of Salt Thrown Behind|Un pellizco de sal lanzado hacia atrás|Une pincée de sel jetée par-dessus l'épaule|背後へ投げた一つまみの塩"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Tossing a pinch of salt over one's shoulder without looking is an old gesture said to blind whatever ill-wishing presence might be following close behind, a habit shared in one form or another across much of the Mediterranean and Middle East. It costs nothing and takes a moment, which may be exactly why it never fully died out even among people who do not otherwise believe in it.|Lanzar un pellizco de sal por encima del hombro sin mirar es un viejo gesto que se dice ciega a cualquier presencia malintencionada que pudiera estar siguiendo de cerca, una costumbre compartida de una u otra forma en buena parte del Mediterráneo y Oriente Medio. No cuesta nada y toma un instante, quizá la razón exacta de que nunca se extinguiera del todo.|Jeter une pincée de sel par-dessus l'épaule sans regarder est un vieux geste censé aveugler toute présence malveillante qui suivrait de près, une habitude partagée sous une forme ou une autre dans une bonne partie de la Méditerranée et du Moyen-Orient. Cela ne coûte rien et prend un instant, ce qui explique peut-être pourquoi le geste n'a jamais tout à fait disparu.|振り返らずに一つまみの塩を肩越しに投げる仕草は、すぐ後ろに付いてくる悪意ある存在の目をくらませると言われる古いしぐさで、形を変えながら地中海から中東の広い範囲で共有されている。金もかからず一瞬で済むしぐさだからこそ、それを信じていない人のあいだでも完全には廃れずに残っているのかもしれない。",
    ),
  },
  thanaweyaguide: {
    e: "📘",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値(韓国の族譜と同水準)。
    price: 140,
    kind: "passive",
    n: t("A Worn Thanaweya Amma Study Guide|Una guía gastada del Thanaweya Amma|Un guide usé du Thanaweya Amma|使い古したサナウィーヤ・アンマの参考書"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "The Thanaweya Amma, Egypt's national high-school exit exam, decides university placement so strictly that a single point can be the difference between studying medicine and something a family considers a disappointment, and its stress is a nationwide rite of passage discussed on the news every summer. Guides for it get passed down between cousins and neighbours dog-eared and heavily underlined, each margin note a small inheritance from whoever studied it before.|El Thanaweya Amma, el examen final de secundaria de Egipto, decide el ingreso a la universidad con tal rigor que un solo punto puede ser la diferencia entre estudiar medicina y algo que la familia considera una decepción, y su estrés es un rito de paso nacional que se comenta en las noticias cada verano. Sus guías se heredan entre primos y vecinos, dobladas y muy subrayadas.|Le Thanaweya Amma, l'examen national de fin de lycée en Égypte, décide de l'orientation universitaire avec une telle rigueur qu'un seul point peut faire la différence entre étudier la médecine et quelque chose qu'une famille jugerait décevant, et son stress est un rite de passage national dont on parle aux informations chaque été. Ses guides se transmettent entre cousins et voisins, cornés et abondamment soulignés.|エジプトの高校卒業国家試験サナウィーヤ・アンマは、大学の進路をあまりに厳密に決めるため、たった1点が医学部に進めるかどうかの分かれ目になることもあり、その重圧は毎年夏、ニュースでも語られる国民的な通過儀礼になっている。参考書はいとこや近所どうしで、角が折れ線がびっしり引かれたまま受け継がれていく。書き込みの一つひとつが、先に使った誰かからのささやかな遺産である。",
    ),
  },
  oldpiastres: {
    e: "🪙",
    price: 260,
    kind: "pre",
    n: t("A Handful of Old Piastres|Un puñado de piastras antiguas|Une poignée de vieilles piastres|古い硬貨ピアストルの束"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The piastre, one hundred to the pound, has been so worn down by inflation that its coins barely circulate any more, yet the word survives in everyday speech the way people still say pennies for prices that have not used them in decades. Collectors pay more for a set that still has all its now-uncommon low denominations than for a single old high-value note.|La piastra, cien por libra, se ha devaluado tanto por la inflación que sus monedas apenas circulan ya, aunque la palabra sobrevive en el habla cotidiana, igual que se sigue diciendo «centavos» para precios que hace décadas no los usan. Los coleccionistas pagan más por un juego que conserve todas sus denominaciones bajas, ahora poco comunes, que por un solo billete antiguo de alto valor.|La piastre, cent pour une livre, a tant été rongée par l'inflation que ses pièces circulent à peine encore, bien que le mot survive dans le langage courant, comme on continue de dire « centimes » pour des prix qui n'en utilisent plus depuis des décennies. Les collectionneurs paient plus pour un jeu conservant toutes ses petites coupures devenues rares que pour un seul vieux billet de grande valeur.|100分の1ポンドにあたるピアストルは、インフレでその価値がすり減りすぎて、硬貨そのものはほとんど流通していない。それでもこの語は、何十年も使われていない値段にいまも「銭」と言い続ける感覚と同じように、日常の言葉の中に生き残っている。収集家は、いまでは珍しい小額面をすべて揃えた一組に、高額の古い紙幣一枚よりも高い値を付ける。",
    ),
  },
  telegraphsprint: {
    e: "🏃",
    price: 420,
    kind: "pre",
    n: t("A Telegraph Boy's Sprint|La carrera del chico del telégrafo|La course du garçon télégraphiste|電信配達少年の全力疾走"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Before telephones reached most Egyptian towns, a telegraph office's boy would run a message the last stretch to its recipient's door on foot, often faster than waiting for a delivery cart. The job largely vanished with the mobile phone, but older residents in some towns still remember a particular runner by name.|Antes de que el teléfono llegara a la mayoría de los pueblos egipcios, el chico de la oficina de telégrafos llevaba el mensaje corriendo a pie el último tramo hasta la puerta del destinatario, a menudo más rápido que esperar un carro de reparto. El oficio desapareció en gran parte con el móvil, pero en algunos pueblos los mayores aún recuerdan a un mensajero concreto por su nombre.|Avant que le téléphone n'atteigne la plupart des villes égyptiennes, le garçon du bureau télégraphique courait à pied la dernière portion pour porter le message jusqu'à la porte du destinataire, souvent plus vite qu'en attendant une charrette de livraison. Le métier a largement disparu avec le téléphone portable, mais dans certaines villes, les anciens se souviennent encore d'un coursier précis, par son nom.|電話がエジプトの大半の町に届く前、電信局の少年は最後の区間を走って受取人の戸口まで伝言を届けた。配達の荷車を待つより速いことも多かった。この仕事は携帯電話の普及とともにほぼ消えたが、いくつかの町ではいまも年配の住民が、あの伝令の少年の名を覚えている。",
    ),
  },
};

/**
 * 厄災の神。ナイル沿いの村に伝わる民話の存在「ナダーハ(呼ぶ女)」にした。
 * 悪意のある悪霊としてではなく、韓国のトッケビと同じく「その気になれば
 * 悪いことも良いことも起こす、気まぐれな存在」として描く。伝承である旨は
 * `arrive`/`wakeFact` の文中で明示している(「昔の言い伝えでは」)。
 */
export const EGYPT_SPIRIT = {
  e: "🌊",
  n: t("An-Nadaha|La Nadaha|La Nadaha|ナダーハ"),
  big: t("An-Nadaha's Call to the Water|La llamada de la Nadaha hacia el agua|L'appel de la Nadaha vers l'eau|水辺へ誘うナダーハの呼び声"),
  ward: "ironnail",
  arrive: t(
    "<b>🌊 An-Nadaha has taken an interest in you.</b> Old rural tales along the Nile describe her as a jinn who calls out in a woman's voice from the reeds at night, and travelers who answer are said to wander toward the water and never quite explain afterward why they went. She now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🌊 La Nadaha se ha fijado en ti.</b> Los viejos cuentos rurales del Nilo la describen como un yinn que llama con voz de mujer desde los juncos por la noche, y se dice que los viajeros que responden acaban vagando hacia el agua sin saber explicar después por qué lo hicieron. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🌊 La Nadaha s'est intéressée à toi.</b> Les vieux contes ruraux du Nil la décrivent comme une djinn qui appelle d'une voix de femme depuis les roseaux la nuit, et l'on dit que les voyageurs qui répondent finissent par errer vers l'eau sans jamais bien expliquer pourquoi ensuite. Elle marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🌊 ナダーハに目を付けられた。</b> ナイル沿いの古い村の言い伝えでは、彼女は夜になると葦の茂みから女の声で呼びかけるジンだとされ、その声に応えた旅人は水辺へふらふらと歩いていき、あとになってもなぜそうしたのか自分でもうまく説明できないという。いま彼女は目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🌊 <b>An-Nadaha</b> loses interest and calls instead toward <b>{0}</b>, farthest from {1}.|🌊 <b>La Nadaha</b> pierde el interés y llama en cambio hacia <b>{0}</b>, el más lejano de {1}.|🌊 <b>La Nadaha</b> se désintéresse et appelle désormais vers <b>{0}</b>, le plus loin de {1}.|🌊 <b>ナダーハ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ呼びかけを移した。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside her voice and never once turned to answer it. She stops calling gently and instead sings without pause — <b>An-Nadaha's Call to the Water</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a su voz sin haber respondido a la llamada ni una vez. Deja de llamar con suavidad y canta ahora sin pausa: empieza <b>la llamada de la Nadaha hacia el agua</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours aux côtés de sa voix sans jamais y avoir répondu. Elle cesse d'appeler doucement et se met à chanter sans relâche : <b>l'appel de la Nadaha vers l'eau</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもその声のそばを歩きながら、一度も振り返って応えなかった。彼女はやさしく呼ぶのをやめ、途切れることなく歌い始める。<b>水辺へ誘うナダーハの呼び声</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the tales agree on one rule above all others — never turn to look toward the voice, because it is the turning, not the sound itself, that lets her take hold. Travelers who kept walking without looking back are the ones the stories say made it home.|<b>Tras la historia:</b> los cuentos coinciden sobre todo en una regla: nunca volverse a mirar hacia la voz, porque es el gesto de girarse, no el sonido en sí, lo que le permite atraparte. Los viajeros que siguieron caminando sin mirar atrás son, según los cuentos, los que llegaron a casa.|<b>Derrière l'histoire :</b> les contes s'accordent surtout sur une règle : ne jamais se retourner vers la voix, car c'est ce geste, et non le son lui-même, qui lui permet de vous saisir. Les voyageurs qui ont continué sans se retourner sont, disent les contes, ceux qui sont rentrés chez eux.|<b>物語の背景:</b> 言い伝えが何より一致して説く決まりが一つある。声のほうを決して振り向いてはならない、というものだ。捕まえられるのは音そのものではなく、振り向くという仕草のせいだとされる。振り返らず歩き続けた旅人だけが、無事に家へたどり着いたと語られている。",
  ),
  pleased: t(
    "She hums contentedly from somewhere among the reeds, and a coin she once dropped there turns up at <b>{0}</b>'s feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Tararea contenta desde algún lugar entre los juncos, y una moneda que dejó caer allí aparece a los pies de <b>{0}</b>. <b>{0}</b> gana <span class='money'>+{1}</span>.|Elle fredonne, satisfaite, quelque part parmi les roseaux, et une pièce qu'elle y avait laissé tomber ressurgit aux pieds de <b>{0}</b>. <b>{0}</b> gagne <span class='money'>+{1}</span>.|葦の茂みのどこかで満足げに鼻歌を歌っており、かつてそこに落とした銭が <b>{0}</b> の足元に転がり出た。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "An iron nail is pressed into the soil at the water's edge where she calls from. Old tales say she cannot cross iron, and her voice pulls back, passing <b>{0}</b> by without being noticed this turn.|Se clava un clavo de hierro en la tierra a la orilla del agua, de donde ella llama. Los viejos cuentos dicen que no puede cruzar el hierro, y su voz se retira, pasando de largo junto a <b>{0}</b> sin ser notada esta vuelta.|Un clou de fer est planté dans la terre au bord de l'eau, là d'où elle appelle. Les vieux contes disent qu'elle ne peut franchir le fer, et sa voix se retire, passant devant <b>{0}</b> sans être remarquée ce tour-ci.|彼女が呼びかける水際の土に、鉄の釘を打ち込んだ。古い言い伝えによれば彼女は鉄を越えられないという。その声は引いていき、このターンは <b>{0}</b> に気づかれることなく通り過ぎた。",
  ),
};

/**
 * 災難7種。運河・熱・水・祭りなど、この盤面の芯(ナイルと砂漠、そこを走る鉄道)
 * に沿わせた。度が過ぎるだけの、悪意のない出来事として描く。
 */
export const EGYPT_DOOM = [
  {
    id: "khamsin",
    n: t("The khamsin wind buries the line|El viento khamsin entierra la vía|Le vent khamsin ensevelit la ligne|ハムシーンの風が線路を埋める"),
    t: t(
      "For fifty days each spring, a hot wind off the Sahara can turn the sky the colour of weak tea within the hour and bury open stretches of track under drifting sand, halting trains until a crew with shovels clears the line by hand. Farmers call it khamsin, meaning fifty, for the stretch of the calendar it is expected to return in, though no single storm lasts anywhere near that long.|Durante cincuenta días cada primavera, un viento cálido del Sahara puede teñir el cielo del color de un té flojo en cuestión de una hora y sepultar tramos abiertos de vía bajo arena a la deriva, deteniendo los trenes hasta que una cuadrilla con palas despeja la línea a mano. Los agricultores lo llaman khamsin, que significa cincuenta, por el tramo del calendario en que se espera que regrese, aunque ninguna tormenta dura ni de lejos tanto.|Pendant cinquante jours chaque printemps, un vent chaud venu du Sahara peut teindre le ciel de la couleur d'un thé léger en l'espace d'une heure et ensevelir des tronçons de voie à ciel ouvert sous le sable, arrêtant les trains jusqu'à ce qu'une équipe armée de pelles dégage la ligne à la main. Les paysans l'appellent khamsin, qui signifie cinquante, pour la période du calendrier où l'on s'attend à son retour, bien qu'aucune tempête ne dure jamais aussi longtemps.|毎年春の五十日間、サハラから吹く熱風は一時間もしないうちに空を薄い茶の色に変え、剥き出しの線路を吹き溜まった砂で埋めてしまうことがある。列車はシャベルを持った作業班が手で線路を掘り出すまで止まる。農民たちはこれをハムシーン(「五十」の意)と呼ぶ。訪れると見込まれる暦の幅を指した名だが、一度の嵐がそれほど長く続くことはない。",
    ),
    months: [1, 2],
  },
  {
    id: "canalblock",
    n: t("A ship runs aground and blocks the canal|Un barco encalla y bloquea el canal|Un navire s'échoue et bloque le canal|座礁した船が運河を塞ぐ"),
    t: t(
      "A container ship wedges itself sideways across the narrowest stretch of the canal, and within hours a queue of vessels stretches back toward both seas with nowhere to pass. Some captains further down the queue simply give up and turn south for the long way around Africa rather than wait to find out how long the salvage crews will need.|Un buque portacontenedores queda encajado de través en el tramo más estrecho del canal, y en cuestión de horas una cola de embarcaciones se extiende hacia ambos mares sin ningún hueco por donde pasar. Algunos capitanes más atrás en la cola simplemente se rinden y ponen rumbo al sur, el largo camino que rodea África, en vez de esperar a saber cuánto tardarán los equipos de salvamento.|Un porte-conteneurs se retrouve en travers du tronçon le plus étroit du canal, et en quelques heures une file de navires s'étire vers les deux mers sans aucun passage possible. Certains capitaines plus loin dans la file abandonnent tout simplement et mettent le cap au sud, la longue route qui contourne l'Afrique, plutôt que d'attendre de savoir combien de temps il faudra aux équipes de sauvetage.|コンテナ船が運河のいちばん狭い区間で横向きに座礁し、数時間のうちに両側の海へ向かって船の列が伸び、抜け道は一つもなくなる。列の後ろのほうにいた船長の中には、救助隊がどれだけ時間をかけるか分からないまま待つよりはと、あきらめてアフリカを大きく迂回する南回りの航路へ舵を切る者もいる。",
    ),
  },
  {
    id: "heatbuckle",
    n: t("Summer heat warps the rails|El calor del verano deforma los raíles|La chaleur de l'été déforme les rails|夏の熱で線路が曲がる"),
    t: t(
      "On the hottest days, steel rail can expand enough to bow sideways out of its bed, and trains have to slow to a crawl over the affected stretch until a maintenance crew cuts and resets a section before it fails outright. It happens often enough in peak summer that some lines quietly build extra speed restrictions into the timetable rather than wait for it to happen.|En los días más calurosos, el raíl de acero puede expandirse tanto que se arquea hacia un lado fuera de su asiento, y los trenes tienen que reducir a paso de tortuga en el tramo afectado hasta que una cuadrilla de mantenimiento corta y reajusta una sección antes de que falle del todo. Ocurre con la frecuencia suficiente en pleno verano que algunas líneas incorporan discretamente restricciones de velocidad extra al horario en vez de esperar a que suceda.|Les jours les plus chauds, le rail d'acier peut se dilater au point de gauchir hors de son lit, et les trains doivent ralentir au pas sur le tronçon touché jusqu'à ce qu'une équipe de maintenance découpe et réajuste une section avant qu'elle ne cède complètement. Cela arrive assez souvent en plein été pour que certaines lignes intègrent discrètement des restrictions de vitesse supplémentaires à l'horaire plutôt que d'attendre que cela se produise.|最も暑い日には鋼鉄のレールが膨張しすぎて横に反り上がることがあり、保線班が壊れる前に区間を切って調整するまで、列車はその区間を這うような速度で進まなければならない。真夏にはこれが頻繁に起きるため、路線によっては、起きるのを待つのではなく時刻表にあらかじめ余分な速度制限を組み込んでいる。",
    ),
    months: [3, 4],
  },
  {
    id: "ferryoverload",
    n: t("The Nile ferry waits for one more passenger|El transbordador del Nilo espera a un pasajero más|Le bac du Nil attend un passager de plus|ナイルの渡し船が、もう一人と客を待つ"),
    t: t(
      "The small Nile ferry was meant to leave the moment it filled, but the boatman keeps waving on just one more passenger, one more bicycle, one more crate, until the boat sits low enough in the water that the crossing takes twice as long as it should. Nobody complains too loudly, because everyone waiting on the bank hopes to be the next one waved aboard.|El pequeño transbordador del Nilo debía zarpar en cuanto se llenara, pero el barquero sigue haciendo señas a un pasajero más, una bicicleta más, un cajón más, hasta que el bote se hunde tanto en el agua que la travesía tarda el doble de lo debido. Nadie se queja demasiado alto, porque todos los que esperan en la orilla esperan ser los siguientes en subir.|Le petit bac du Nil devait partir dès qu'il serait plein, mais le batelier fait encore signe à un passager de plus, un vélo de plus, une caisse de plus, jusqu'à ce que le bateau s'enfonce assez dans l'eau pour que la traversée prenne le double du temps normal. Personne ne se plaint trop fort, car tous ceux qui attendent sur la berge espèrent être les prochains à monter.|小さなナイルの渡し船は満員になり次第出るはずだったが、船頭はもう一人、もう一台の自転車、もう一箱と手招きを続け、船が水に沈み込むほど積み込んだ結果、渡りにいつもの倍の時間がかかった。岸で待つ誰もが次に乗せてもらいたいと思っているので、あまり大きな声で文句を言う者はいない。",
    ),
  },
  {
    id: "zaffa",
    n: t("A wedding procession takes over the street|Un cortejo nupcial toma la calle|Un cortège nuptial envahit la rue|結婚式の行列が通りを占領する"),
    t: t(
      "A wedding procession comes down the middle of the street with drummers, horns and a crowd dancing behind the couple, and traffic simply stops rather than tries to push through — pedestrians and drivers alike end up pressing a few coins into the hands of the musicians as they pass.|Un cortejo nupcial baja por el centro de la calle con tamborileros, trompetas y una multitud bailando tras la pareja, y el tráfico simplemente se detiene en vez de intentar abrirse paso; peatones y conductores por igual acaban poniendo unas monedas en las manos de los músicos a su paso.|Un cortège nuptial descend le milieu de la rue avec tambours, trompettes et une foule dansant derrière les mariés, et la circulation s'arrête tout simplement au lieu d'essayer de se frayer un passage — piétons comme automobilistes finissent par glisser quelques pièces dans les mains des musiciens à leur passage.|太鼓とラッパを鳴らし、新郎新婦の後ろで踊る人々を従えた結婚式の行列が通りの真ん中を進んでくると、車も無理に割り込もうとはせず、ただ止まる。歩行者も運転手も、通り過ぎる楽団員の手に小銭を握らせることになる。",
    ),
  },
  {
    id: "blackout",
    n: t("The summer blackout hits at the worst moment|El apagón de verano llega en el peor momento|La coupure d'été frappe au pire moment|夏の停電が最悪のタイミングで来る"),
    t: t(
      "The power cuts out across the whole neighbourhood on the hottest afternoon of the summer, taking refrigeration and freezers down with it right when perishable stock is most vulnerable, and nobody can say for certain when the grid will catch back up with demand.|La electricidad se corta en todo el barrio la tarde más calurosa del verano, llevándose consigo la refrigeración y los congeladores justo cuando el género perecedero está más expuesto, y nadie puede decir con certeza cuándo la red volverá a dar abasto con la demanda.|Le courant coupe dans tout le quartier l'après-midi le plus chaud de l'été, emportant avec lui la réfrigération et les congélateurs juste au moment où les denrées périssables sont les plus vulnérables, et personne ne peut dire avec certitude quand le réseau rattrapera la demande.|夏いちばんの暑い午後、地域一帯の電気が止まり、冷蔵・冷凍設備も道連れになる。生鮮品がいちばん傷みやすいまさにその時である。送電網がいつ需要に追いつくのか、誰にもはっきりとは分からない。",
    ),
    months: [3, 4],
  },
  {
    id: "scenicroute",
    n: t("The felucca captain finds a longer way around|El capitán de la falucha encuentra un camino más largo|Le capitaine de felouque trouve un chemin plus long|ファルーカの船頭が遠回りの道を見つける"),
    t: t(
      "The felucca captain insists the direct route is blocked by other boats today, and steers a slow loop past two extra bends of riverbank before finally reaching the far shore — a detour that always seems to happen on days when a foreign visitor is aboard.|El capitán de la falucha insiste en que hoy la ruta directa está bloqueada por otras barcas, y traza un lento rodeo pasando dos recodos extra de la orilla antes de llegar por fin a la otra orilla, un desvío que siempre parece ocurrir en los días en que hay a bordo un visitante extranjero.|Le capitaine de la felouque insiste, aujourd'hui la route directe serait bloquée par d'autres bateaux, et trace une lente boucle par deux méandres supplémentaires de la berge avant d'atteindre enfin l'autre rive — un détour qui semble toujours survenir les jours où un visiteur étranger est à bord.|今日は直行の水路が他の船でふさがっているのだと船頭は言い張り、川岸の余分な曲がり角を二つも回ってから、ようやく対岸へたどり着くゆっくりとした遠回りをする。この遠回りは、外国からの客が乗っている日に限って起きるようだ。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。4月(index 0)がシャム・エンネシームの卵配りに
 * 合わせて給アイテム、8月(index 4)が酷暑で休神という想定
 * (`season-and-doom-rules.ts` 側で実装。REGISTER.md に記載)。
 */
export const EGYPT_SEASONS = [
  {
    e: "🥚",
    n: t("Sham el-Nessim, everyone's spring picnic|Sham el-Nessim, el pícnic de primavera de todos|Sham el-Nessim, le pique-nique de printemps de tous|皆の春の行楽、シャム・エンネシーム"),
    t: t(
      "On the Monday after Coptic Easter, families of every religion pack salted fish, spring onions and dyed eggs and head outdoors together for a national holiday nobody quite agrees is religious or not. Parks and riverbanks fill from dawn, and the smell of feseekh, a strong-cured fish eaten only this one day a year, drifts over half the country at once.|El lunes después de la Pascua copta, familias de todas las religiones preparan pescado salado, cebolletas y huevos teñidos y salen juntas al aire libre para una fiesta nacional que nadie termina de decidir si es religiosa o no. Parques y orillas se llenan desde el amanecer, y el olor a feseekh, un pescado muy curado que se come solo este día al año, flota sobre medio país a la vez.|Le lundi qui suit Pâques copte, des familles de toutes les religions préparent poisson salé, oignons nouveaux et œufs teints et sortent ensemble pour une fête nationale dont personne ne tranche vraiment si elle est religieuse ou non. Parcs et berges se remplissent dès l'aube, et l'odeur du feseekh, un poisson fortement salé mangé ce seul jour de l'année, flotte sur la moitié du pays à la fois.|コプト教のイースターの翌月曜、あらゆる宗教の家族が塩漬け魚と新玉ねぎ、染めた卵を用意して、宗教的な祝日なのかどうか誰もはっきりとは決めない国民的な休日に外へ出かける。公園と川岸は夜明けから人で埋まり、年に一度この日だけ食べる強く塩漬けにした魚フェセイフの匂いが国の半分に漂う。",
    ),
    f: t(
      "The holiday's name is usually translated as 'smelling the breeze', and some trace its roots to a spring festival recorded in Egypt long before Christianity or Islam arrived, one of the few widely kept customs that crosses the country's religious lines without anyone treating it as belonging to one side.|El nombre de la fiesta suele traducirse como «oler la brisa», y algunos rastrean su origen en un festival de primavera registrado en Egipto mucho antes de que llegaran el cristianismo o el islam, una de las pocas costumbres ampliamente seguidas que cruza las líneas religiosas del país sin que nadie la considere de un solo bando.|Le nom de la fête se traduit généralement par « sentir la brise », et certains en font remonter les racines à un festival de printemps consigné en Égypte bien avant l'arrivée du christianisme ou de l'islam, l'une des rares coutumes largement suivies qui traverse les lignes religieuses du pays sans que personne ne la considère comme appartenant à un seul camp.|この祝日の名は普通「そよ風を嗅ぐ」と訳され、キリスト教やイスラム教が伝わるよりずっと前からエジプトに記録のある春の祭りに起源をたどる説もある。国内の宗教の垣根を越えて広く守られる、数少ない習わしの一つで、どちらか一方のものと見なされていない。",
    ),
  },
  {
    e: "📝",
    n: t("Exam season, and the year's first real heat|La temporada de exámenes, y el primer calor de verdad del año|La saison des examens, et la première vraie chaleur de l'année|試験の季節と、その年最初の本格的な暑さ"),
    t: t(
      "Final exams for every grade land in the same few weeks that daytime heat first climbs past what a fan alone can manage, so households run air conditioners through study nights they would otherwise skip to save on the bill. Streets around exam halls go quiet by government order, sometimes even banning car horns nearby so nothing breaks a student's concentration.|Los exámenes finales de todos los cursos caen en las mismas semanas en que el calor diurno empieza a superar lo que un ventilador solo puede manejar, así que los hogares encienden el aire acondicionado durante noches de estudio que de otro modo evitarían por la factura. Las calles alrededor de los locales de examen se acallan por orden del gobierno, a veces prohibiendo incluso las bocinas cerca para que nada rompa la concentración de un estudiante.|Les examens finaux de toutes les classes tombent dans les mêmes semaines où la chaleur diurne dépasse pour la première fois ce qu'un simple ventilateur peut gérer, si bien que les foyers font tourner la climatisation des nuits de révision qu'ils éviteraient autrement pour la facture. Les rues autour des salles d'examen se taisent sur ordre du gouvernement, interdisant parfois même les klaxons à proximité pour ne rien briser de la concentration d'un élève.|あらゆる学年の期末試験は、日中の暑さがそよ風だけでは足りなくなる最初の数週間と重なる。だから各家庭は、普段なら電気代を惜しんで避ける勉強夜にもエアコンを回す。試験会場の周りの通りは政府の指示で静かにされ、学生の集中を乱さないよう近くのクラクションが禁止されることさえある。",
    ),
    f: t(
      "Some governorates temporarily restrict wedding parties and loud construction work near exam centres during this stretch, a rule taken seriously enough that violators can be fined.|Algunas provincias restringen temporalmente las fiestas de boda y las obras ruidosas cerca de los centros de examen durante este tramo, una norma que se toma en serio hasta el punto de multar a quien la incumple.|Certaines provinces restreignent temporairement les fêtes de mariage et les travaux bruyants près des centres d'examen durant cette période, une règle prise assez au sérieux pour que les contrevenants soient verbalisés.|一部の県はこの時期、試験会場の近くでの結婚式の祝宴や騒音を伴う工事を一時的に制限する。違反すれば罰金が科されるほど、この決まりは真剣に扱われている。",
    ),
  },
  {
    e: "🌾",
    n: t("The wheat comes in across the valley|La cosecha del trigo llega por todo el valle|Le blé rentre dans toute la vallée|渓谷いっぱいに麦の収穫"),
    t: t(
      "Combine harvesters move down the Nile valley from south to north roughly in step with the ripening grain, and roadside straw stacks appear almost overnight in fields that were solid gold a week earlier. Egypt still imports much of the wheat it needs despite the harvest, a gap between what the narrow strip of farmland can grow and what a large population eats.|Las cosechadoras avanzan por el valle del Nilo de sur a norte casi al ritmo del grano que madura, y las pacas de paja junto a la carretera aparecen casi de la noche a la mañana en campos que una semana antes eran oro puro. Egipto sigue importando buena parte del trigo que necesita pese a la cosecha, una brecha entre lo que puede dar la estrecha franja de tierra cultivable y lo que come una población tan grande.|Les moissonneuses-batteuses descendent la vallée du Nil du sud au nord à peu près au rythme du grain qui mûrit, et les meules de paille en bord de route apparaissent presque du jour au lendemain dans des champs qui étaient tout dorés une semaine plus tôt. L'Égypte importe encore une bonne part du blé dont elle a besoin malgré la récolte, un écart entre ce que peut produire l'étroite bande de terre cultivable et ce que mange une population aussi nombreuse.|コンバインはナイル渓谷を、実った麦とほぼ足並みを揃えて南から北へと下っていく。道端の藁の山は、一週間前まで一面黄金色だった畑にほとんど一夜で現れる。この収穫があってもなお、エジプトは必要な小麦の多くを輸入し続けている。細い農地の帯が作れる量と、多い人口が食べる量とのあいだの隔たりである。",
    ),
    f: t(
      "Egypt has for decades been one of the world's largest wheat importers by volume, buying heavily from the Black Sea region in particular, which is why disruptions to Ukrainian or Russian grain shipments tend to be felt quickly in Egyptian bread prices.|Durante décadas, Egipto ha sido uno de los mayores importadores de trigo del mundo en volumen, comprando mucho sobre todo a la región del mar Negro, razón por la que las interrupciones en los envíos de grano ucraniano o ruso suelen notarse rápido en el precio del pan egipcio.|Depuis des décennies, l'Égypte est l'un des plus grands importateurs de blé au monde en volume, achetant massivement notamment dans la région de la mer Noire, ce qui explique que les perturbations des expéditions de céréales ukrainiennes ou russes se répercutent vite sur le prix du pain égyptien.|エジプトは数十年にわたり、量にして世界有数の小麦輸入国であり続けており、とりわけ黒海地域からの買い付けが多い。ウクライナやロシアからの穀物輸送が滞ると、エジプトのパンの値段にすぐ響くのはそのためである。",
    ),
  },
  {
    e: "🥵",
    n: t("The heat settles in and does not lift|El calor se instala y no cede|La chaleur s'installe et ne cède pas|暑さが居座り、引かない"),
    t: t(
      "Daytime temperatures in Upper Egypt regularly clear 40 degrees for weeks on end, and anyone who can adjusts their whole day around it, working early, disappearing indoors at noon, and only really living again after sunset. Tourist numbers drop to their lowest point of the year in the south, even as the Delta and coast stay comparatively bearable.|Las temperaturas diurnas en el Alto Egipto superan con regularidad los 40 grados durante semanas seguidas, y quien puede reorganiza todo su día en torno a eso: trabaja temprano, desaparece bajo techo al mediodía y solo vuelve a vivir de verdad después de la puesta de sol. El número de turistas cae a su punto más bajo del año en el sur, mientras el delta y la costa siguen siendo comparativamente soportables.|Les températures diurnes en Haute-Égypte dépassent régulièrement 40 degrés pendant des semaines, et quiconque le peut réorganise toute sa journée en conséquence : travailler tôt, disparaître à l'intérieur à midi, et ne vraiment revivre qu'après le coucher du soleil. Le nombre de touristes tombe à son plus bas de l'année dans le sud, alors que le delta et la côte restent comparativement supportables.|上エジプトの日中の気温は何週間も40度を超え続け、できる者は一日の過ごし方をそれに合わせて組み替える。早くに働き、正午には屋内に消え、日が沈んでからようやく本当の生活が始まる。南部の観光客数は一年でいちばん落ち込むが、デルタと沿岸は比較的しのぎやすいままである。",
    ),
    f: t(
      "Luxor and Aswan are among the hottest inhabited places on Earth in summer, with July averages that regularly exceed the peak temperatures of far more famous desert record-holders.|Luxor y Asuán están entre los lugares habitados más calurosos de la Tierra en verano, con promedios de julio que a menudo superan los máximos de desiertos mucho más famosos por sus récords.|Louxor et Assouan comptent parmi les lieux habités les plus chauds de la Terre en été, avec des moyennes de juillet dépassant régulièrement les pics de déserts bien plus réputés pour leurs records.|夏のルクソールとアスワンは地球上でも指折り暑い有人地であり、7月の平均気温は、記録で名高い他のずっと有名な砂漠の最高気温を上回ることも珍しくない。",
    ),
  },
  {
    e: "🌱",
    n: t("Cotton picking, and even the spirits take a break|La recolección del algodón, y hasta los espíritus descansan|La cueillette du coton, et même les esprits font une pause|綿花摘みと、精霊すら休む月"),
    t: t(
      "Delta families still turn out by hand for the cotton harvest despite decades of mechanisation elsewhere, because the long-staple variety bruises too easily for a picking machine to be worth the loss in quality. The heat is by now so relentless across the country that even An-Nadaha is said to fall quiet until the nights cool again.|Las familias del delta todavía salen a mano a la cosecha del algodón pese a décadas de mecanización en otras partes, porque la variedad de fibra larga se magulla con demasiada facilidad para que una recolectora mecánica compense la pérdida de calidad. El calor es ya tan implacable en todo el país que hasta se dice que la Nadaha calla hasta que las noches vuelven a refrescar.|Les familles du delta sortent encore à la main pour la cueillette du coton malgré des décennies de mécanisation ailleurs, car la variété à fibre longue se meurtrit trop facilement pour qu'une machine à cueillir vaille la perte de qualité. La chaleur est désormais si implacable dans tout le pays que même An-Nadaha se tairait, dit-on, jusqu'à ce que les nuits refroidissent à nouveau.|デルタの家族はいまも手で綿花を摘む。よそでは何十年も前に機械化が進んだが、長繊維種はあまりに傷みやすく、摘み取り機を使うと品質の損失が見合わないからである。この頃には国じゅうの暑さがあまりに容赦なく、ナダーハさえも夜が涼しくなるまで声を潜めると言われている。",
    ),
    f: t(
      "Egyptian long-staple cotton is picked almost entirely by hand precisely because its extra length, the quality that makes it valuable, is also what a mechanical picker is most likely to damage.|El algodón egipcio de fibra larga se recolecta casi por completo a mano precisamente porque esa longitud extra, la cualidad que lo hace valioso, es también lo que más fácilmente daña una recolectora mecánica.|Le coton égyptien à fibre longue est cueilli presque entièrement à la main précisément parce que cette longueur supplémentaire, la qualité qui en fait le prix, est aussi ce qu'une cueilleuse mécanique risque le plus d'abîmer.|エジプト産長繊維綿がほぼすべて手摘みされるのは、まさにその価値を生む余分な長さが、摘み取り機がいちばん傷めやすい部分でもあるからである。",
    ),
  },
  {
    e: "🗓️",
    n: t("Nayrouz, the Coptic new year|Nayrouz, el año nuevo copto|Nayrouz, le nouvel an copte|コプトの新年、ナイルーズ"),
    t: t(
      "The Coptic calendar's new year falls in September, and it traditionally marked the moment the Nile's annual flood was expected to have peaked and begun to recede, long before the High Dam turned that flood into a controlled release rather than a yearly event of its own will. Churches mark the day quietly with services, while for most households it passes as an ordinary date on a calendar few outside the Coptic community track closely.|El año nuevo del calendario copto cae en septiembre, y tradicionalmente marcaba el momento en que se esperaba que la crecida anual del Nilo alcanzara su punto máximo y empezara a bajar, mucho antes de que la Presa Alta convirtiera esa crecida en una suelta controlada en vez de un fenómeno anual con voluntad propia. Las iglesias marcan el día con discretos oficios, mientras que para la mayoría de los hogares pasa como una fecha ordinaria de un calendario que pocos fuera de la comunidad copta siguen de cerca.|Le nouvel an du calendrier copte tombe en septembre, et marquait traditionnellement le moment où la crue annuelle du Nil était censée atteindre son pic puis commencer à baisser, bien avant que le haut barrage ne transforme cette crue en un lâcher contrôlé plutôt qu'un événement annuel doté de sa propre volonté. Les églises marquent le jour discrètement par des offices, tandis que pour la plupart des foyers, il passe comme une date ordinaire d'un calendrier que peu suivent de près en dehors de la communauté copte.|コプト暦の新年は9月にあたり、伝統的にはナイルの毎年の増水がピークを迎え、引き始める頃を示す目印だった。ハイダムがこの増水を、みずからの意思を持つ年ごとの出来事から、管理された放流へと変えるよりずっと前の話である。教会はこの日を静かな礼拝で祝うが、多くの家庭にとってはコプト共同体の外ではあまり注目されない暦の、ふつうの一日として過ぎていく。",
    ),
    f: t(
      "The Coptic calendar itself descends from the ancient Egyptian civil calendar, carried forward through the centuries by the church long after the state around it had adopted other systems for everyday use.|El propio calendario copto desciende del antiguo calendario civil egipcio, transmitido a lo largo de los siglos por la iglesia mucho después de que el estado que la rodeaba adoptara otros sistemas para el uso cotidiano.|Le calendrier copte lui-même descend de l'ancien calendrier civil égyptien, transmis au fil des siècles par l'Église bien après que l'État environnant eut adopté d'autres systèmes pour l'usage quotidien.|コプト暦そのものは古代エジプトの民用暦の流れを汲み、周りの国がとうに日常用に別の暦へ切り替えたあとも、何世紀にもわたり教会によって受け継がれてきた。",
    ),
  },
  {
    e: "🎪",
    n: t("Mawlid season fills the Delta's calendar|La temporada de mawlid llena el calendario del delta|La saison des mawlid remplit le calendrier du delta|マウリドの季節がデルタの暦を埋める"),
    t: t(
      "Autumn is thick with saints' festivals across the Delta, each town timing its own around a different local shrine, so a family with relatives scattered across several towns can find itself invited to three or four in a single month. Freight yards run just as busy in the background, moving the last of the season's ginned cotton out toward the ports before winter shipping schedules tighten.|El otoño está cargado de fiestas de santos por todo el delta, cada pueblo con la suya en torno a un santuario local distinto, así que una familia con parientes repartidos en varios pueblos puede verse invitada a tres o cuatro en un solo mes. Los patios de mercancías van igual de ajetreados de fondo, sacando hacia los puertos el último algodón desmotado de la temporada antes de que se aprieten los horarios de embarque de invierno.|L'automne regorge de fêtes de saints dans tout le delta, chaque ville calant la sienne autour d'un sanctuaire local différent, si bien qu'une famille aux parents dispersés dans plusieurs villes peut se retrouver invitée à trois ou quatre en un seul mois. Les gares de triage tournent tout aussi fort en coulisses, acheminant vers les ports le dernier coton égrené de la saison avant que les horaires d'expédition hivernaux ne se resserrent.|秋のデルタは聖者祭でいっぱいになる。それぞれの町が別々の地元の廟に合わせて祭りの日を決めるので、いくつもの町に親戚が散らばる家族は、一か月のうちに三つも四つも招かれることがある。裏では貨物操車場も同じくらい忙しく、冬の船積み予定が詰まる前に、その季節最後の綿繰り済みの綿花を港へ運び出している。",
    ),
    f: t(
      "Estimates for how many separate mawlid festivals are held across Egypt each year vary widely, from a few hundred to well over a thousand, largely because there is no single authority that tracks or licenses all of them.|Las estimaciones de cuántos mawlid distintos se celebran en Egipto cada año varían mucho, de unos pocos cientos a bastante más de mil, en gran parte porque no existe una sola autoridad que los registre o autorice todos.|Les estimations du nombre de mawlid distincts célébrés chaque année en Égypte varient beaucoup, de quelques centaines à bien plus d'un millier, en grande partie parce qu'aucune autorité unique ne les recense ni ne les autorise tous.|エジプトで毎年開かれる別々のマウリドの数についての見積もりは、数百から千をゆうに超えるものまで大きく幅がある。すべてを記録・許可する単一の当局が無いことが大きな理由である。",
    ),
  },
  {
    e: "🍊",
    n: t("Orange groves start their harvest|Los naranjales empiezan la cosecha|Les orangeraies commencent la récolte|オレンジ畑が収穫を始める"),
    t: t(
      "Egypt's citrus orchards, concentrated along the edges of the Delta and the reclaimed desert fringes around it, begin picking oranges that will mostly be loaded onto refrigerated trucks and trains bound for European supermarkets within the week. The country has grown into one of the world's largest orange exporters almost entirely within living memory, on land that was mostly unirrigated scrub two generations ago.|Los huertos cítricos de Egipto, concentrados en los bordes del delta y en los flecos de desierto recuperado a su alrededor, empiezan a recoger naranjas que en su mayoría se cargarán en camiones y trenes refrigerados rumbo a los supermercados europeos en el plazo de una semana. El país se ha convertido en uno de los mayores exportadores de naranja del mundo casi por completo dentro de la memoria viva, en tierras que hace dos generaciones eran sobre todo matorral sin riego.|Les vergers d'agrumes d'Égypte, concentrés en bordure du delta et sur les franges désertiques récupérées alentour, commencent à cueillir des oranges qui seront pour la plupart chargées sur des camions et trains réfrigérés à destination des supermarchés européens sous une semaine. Le pays est devenu l'un des plus grands exportateurs d'oranges au monde presque entièrement de mémoire vivante, sur des terres qui n'étaient que broussailles non irriguées il y a deux générations.|エジプトの柑橘畑は、デルタの縁とその周りの干拓された砂漠地帯に集中しており、収穫されたオレンジの多くは一週間以内に冷蔵トラックや貨車に積まれ、ヨーロッパのスーパーマーケットへ向かう。この国はほぼ生きた記憶の範囲内で、世界有数のオレンジ輸出国に育った。二世代前まではほとんどが灌漑もされない荒れ地だった土地の上でのことである。",
    ),
    f: t(
      "Much of the recent expansion in citrus growing has happened on reclaimed desert land fed by deep groundwater wells rather than the Nile directly, land that did not exist as farmland at all before large state reclamation projects from the 1980s onward.|Buena parte de la reciente expansión del cultivo de cítricos ha ocurrido en tierras de desierto recuperadas, alimentadas por pozos de agua subterránea profunda y no directamente por el Nilo, tierras que no existían como terreno de cultivo antes de los grandes proyectos estatales de recuperación desde los años ochenta.|Une bonne part de l'expansion récente de la culture des agrumes s'est faite sur des terres désertiques récupérées, alimentées par des puits d'eau souterraine profonde plutôt que directement par le Nil, des terres qui n'existaient pas du tout comme terres agricoles avant les grands projets de récupération de l'État à partir des années 1980.|柑橘栽培の近年の拡大の多くは、ナイル川から直接ではなく深い地下水の井戸で灌漑される干拓地で起きている。1980年代以降の国家による大規模な干拓事業より前は、農地としてはそもそも存在しなかった土地である。",
    ),
  },
  {
    e: "🚢",
    n: t("River cruise season fills the locks|La temporada de cruceros fluviales llena las esclusas|La saison des croisières fluviales remplit les écluses|川のクルーズ船の季節が水門を埋める"),
    t: t(
      "Cooler winter weather draws the year's busiest run of Nile river cruises between Luxor and Aswan, and boats queue in strings at the narrow locks along the way, timing their whole itinerary around a gate that can only pass one vessel at a time. Hotels and riverside restaurants in the south see the sharpest jump in business of any season.|El clima más fresco del invierno atrae la temporada más ajetreada del año de cruceros fluviales por el Nilo entre Luxor y Asuán, y los barcos hacen fila en las estrechas esclusas del camino, ajustando todo su itinerario a una compuerta que solo deja pasar una embarcación a la vez. Los hoteles y restaurantes ribereños del sur ven el mayor repunte de negocio de cualquier temporada.|Le temps plus frais de l'hiver attire la période la plus chargée de l'année pour les croisières fluviales sur le Nil entre Louxor et Assouan, et les bateaux font la queue en chapelet aux écluses étroites du parcours, calant tout leur itinéraire sur une porte qui ne laisse passer qu'un seul navire à la fois. Les hôtels et restaurants riverains du sud connaissent le plus fort bond d'activité de toute la saison.|涼しい冬の気候が、ルクソールとアスワンを結ぶナイル川クルーズの一年でいちばん忙しい時期を呼び込む。船は途中の狭い水門でいくつも連なって順番を待ち、一度に一隻しか通さない門に旅程全体を合わせる。南部のホテルと川辺のレストランは、どの季節よりも大きな商売の伸びを見せる。",
    ),
    f: t(
      "The cruise fleet was hit hard enough by a string of shocks in the 2010s and early 2020s — political upheaval, a pandemic, and regional conflict scares — that several boats spent years tied up unused before winter bookings recovered enough to bring them back into service.|La flota de cruceros se vio tan golpeada por una serie de sacudidas en los años 2010 y principios de los 2020 —agitación política, una pandemia y sustos de conflictos regionales— que varios barcos pasaron años amarrados sin uso antes de que las reservas de invierno se recuperaran lo bastante para devolverlos al servicio.|La flotte de croisière fut assez durement touchée par une série de chocs dans les années 2010 et au début des années 2020 — bouleversements politiques, pandémie, craintes de conflits régionaux — que plusieurs bateaux restèrent amarrés sans usage pendant des années avant que les réservations hivernales ne se rétablissent assez pour les remettre en service.|クルーズ船団は2010年代から2020年代初めにかけて、政変・感染症の流行・地域紛争への懸念という一連の打撃を強く受け、何隻もが何年も使われないまま係留されたままだった。冬の予約が十分に持ち直して再び運航に戻るまで、長い時間がかかった。",
    ),
  },
  {
    e: "🎋",
    n: t("Sugarcane harvest begins in the south|Empieza la cosecha de caña de azúcar en el sur|La récolte de la canne à sucre commence au sud|南部でサトウキビの収穫が始まる"),
    t: t(
      "From January to April, Upper Egypt's cane fields are cut by hand and rushed to the mills before the cut stalks lose sugar content, moved along seasonal narrow-gauge tracks laid fresh each year just for the harvest. The work draws seasonal labourers from across the south, and mill towns swell in population for the length of the season.|De enero a abril, los cañaverales del Alto Egipto se cortan a mano y se llevan deprisa a los ingenios antes de que los tallos cortados pierdan azúcar, transportados por vías estacionales de trocha estrecha tendidas de nuevo cada año solo para la cosecha. El trabajo atrae a jornaleros de todo el sur, y los pueblos con ingenio crecen en población mientras dura la temporada.|De janvier à avril, les champs de canne de Haute-Égypte sont coupés à la main et pressés jusqu'aux usines avant que les tiges coupées ne perdent leur teneur en sucre, acheminés sur des voies saisonnières à voie étroite posées à neuf chaque année rien que pour la récolte. Le travail attire des ouvriers saisonniers de tout le sud, et les villes à usine voient leur population gonfler le temps de la saison.|1月から4月にかけて、上エジプトのサトウキビ畑は手で刈り取られ、切った茎が糖分を失う前に急いで工場へ運ばれる。この輸送には、収穫のためだけに毎年新しく敷かれる季節限定の狭軌線が使われる。この仕事は南部各地から季節労働者を集め、工場のある町は季節のあいだ人口が膨れ上がる。",
    ),
    f: t(
      "Sugarcane needs far more water than most Nile-valley crops, which is why its cultivation is concentrated almost entirely in Upper Egypt, closer to the river's main channel, rather than spread evenly across the country.|La caña de azúcar necesita mucha más agua que la mayoría de los cultivos del valle del Nilo, razón por la que su cultivo se concentra casi por completo en el Alto Egipto, más cerca del cauce principal del río, en vez de repartirse por igual por todo el país.|La canne à sucre a besoin de bien plus d'eau que la plupart des cultures de la vallée du Nil, ce qui explique que sa culture soit concentrée presque entièrement en Haute-Égypte, plus près du chenal principal du fleuve, plutôt que répartie également dans tout le pays.|サトウキビはナイル渓谷の他の多くの作物よりずっと多くの水を必要とする。だからその栽培は国じゅうに均等に広がるのではなく、川の本流に近い上エジプトにほぼ集中している。",
    ),
  },
  {
    e: "🥬",
    n: t("Winter vegetables head for European markets|Las verduras de invierno salen hacia los mercados europeos|Les légumes d'hiver partent vers les marchés européens|冬野菜がヨーロッパの市場へ向かう"),
    t: t(
      "Egypt's mild winter lets Delta farms grow vegetables that would be out of season across most of Europe, and refrigerated trucks queue at the ports through February loaded with produce timed to arrive on shelves within days of picking. It is one of the few times of year the country's agricultural exports outpace its wheat imports in sheer tonnage moving through the same ports.|El suave invierno egipcio permite que las granjas del delta cultiven verduras que estarían fuera de temporada en casi toda Europa, y los camiones frigoríficos hacen cola en los puertos durante febrero, cargados de productos calculados para llegar a las estanterías a los pocos días de la recolección. Es una de las pocas épocas del año en que las exportaciones agrícolas del país superan en tonelaje puro a las importaciones de trigo que pasan por los mismos puertos.|L'hiver doux de l'Égypte permet aux fermes du delta de cultiver des légumes hors saison dans presque toute l'Europe, et des camions frigorifiques font la queue aux ports tout au long de février, chargés de produits calés pour arriver en rayon quelques jours après la cueillette. C'est l'une des rares périodes de l'année où les exportations agricoles du pays dépassent en tonnage pur les importations de blé transitant par les mêmes ports.|エジプトの穏やかな冬は、ヨーロッパの大半では季節外れになる野菜をデルタの農場で作ることを可能にする。2月には冷蔵トラックが港で列を作り、収穫から数日で店頭に並ぶよう見込んだ品を積んでいる。この国の農産物輸出が、同じ港を通る小麦輸入をトン数で上回る数少ない時期の一つである。",
    ),
    f: t(
      "Much of this trade grew out of contract farming arrangements with European supermarket chains that specify exact planting dates months in advance, syncing an Egyptian farmer's calendar to a shopper's in another country entirely.|Buena parte de este comercio surgió de acuerdos de agricultura por contrato con cadenas de supermercados europeas que fijan fechas exactas de siembra con meses de antelación, sincronizando el calendario de un agricultor egipcio con el de un comprador en un país completamente distinto.|Une bonne part de ce commerce est née d'accords d'agriculture contractuelle avec des chaînes de supermarchés européennes qui fixent des dates de plantation précises des mois à l'avance, synchronisant le calendrier d'un agriculteur égyptien avec celui d'un acheteur dans un tout autre pays.|この貿易の多くは、何か月も前から正確な作付け日を指定するヨーロッパのスーパーマーケットチェーンとの契約栽培から育った。エジプトの農家の暦が、まったく別の国の買い物客の暦に合わせられている形である。",
    ),
  },
  {
    e: "🌙",
    n: t("Ramadan reshapes the whole day|Ramadán rehace el día entero|Le ramadan refaçonne toute la journée|ラマダーンが一日の形を変える"),
    t: t(
      "Shops shorten their hours and streets empty out in the run-up to sunset, then fill again all at once as families break the day's fast together and stalls selling qatayef pastries do a month's worth of business in four weeks. The holiday's date shifts roughly eleven days earlier each year on the solar calendar, since it follows the lunar one instead.|Las tiendas acortan su horario y las calles se vacían en el tramo previo a la puesta de sol, y luego se llenan de golpe cuando las familias rompen juntas el ayuno del día y los puestos que venden qatayef hacen en cuatro semanas el negocio de un mes entero. La fecha de la fiesta se adelanta cada año unos once días en el calendario solar, porque sigue el lunar en su lugar.|Les boutiques réduisent leurs horaires et les rues se vident à l'approche du coucher du soleil, puis se remplissent d'un coup quand les familles rompent ensemble le jeûne du jour et que les étals de qatayef font en quatre semaines le chiffre d'un mois entier. La date de la fête recule d'environ onze jours chaque année sur le calendrier solaire, puisqu'elle suit le calendrier lunaire à la place.|店は営業時間を短くし、日没が近づくにつれ通りは人気が絶える。そして家族が一斉に一日の断食を解くと、通りはまた一気に賑わい、カタイフ菓子を売る屋台は四週間で一か月分の商いをする。この祝月は太陰暦に従うため、太陽暦の上では毎年およそ11日ずつ早まっていく。",
    ),
    f: t(
      "Because Ramadan is lunar, it cycles slowly through every solar season over about 33 years, meaning a fasting day in high summer, with its long daylight hours, and one in deep winter are genuinely different experiences separated by roughly a generation and a half.|Como el Ramadán es lunar, recorre lentamente todas las estaciones solares a lo largo de unos 33 años, lo que significa que un día de ayuno en pleno verano, con sus largas horas de luz, y uno en pleno invierno son experiencias genuinamente distintas separadas por casi generación y media.|Le ramadan étant lunaire, il traverse lentement chaque saison solaire sur environ 33 ans, ce qui signifie qu'un jour de jeûne en plein été, avec ses longues heures de jour, et un autre en plein hiver sont des expériences vraiment différentes séparées d'environ une génération et demie.|ラマダーンは太陰暦のため、およそ33年かけてゆっくりと太陽暦の全季節を巡る。だから日照時間の長い真夏の断食日と、真冬の断食日とでは、およそ一世代半を隔てて、まったく異なる体験になる。",
    ),
  },
];
