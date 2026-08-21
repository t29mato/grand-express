/**
 * アルゼンチンの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月(0=4月〜11=3月、暦は共通)。
 * アルゼンチンは南半球なので、暦の並びは他国と同じでも中身の季節は逆になる
 * (7月が独立記念日・乾季寄りの月、1月が真夏)。
 *
 * 厄災の神は「エル・ファミリアル」——北西部の製糖工場(インヘニオ)に伝わる
 * 伝承の怪物で、工場主が良い収穫と引き換えに労働者の命を捧げているとされる。
 * **これは伝承として明示し、事実として書かない**(cities.mjs のトゥクマンの
 * カードにも同じ断り書きがある)。ボリビア盤面のエル・ティーオ、ペルー盤面の
 * アプとは題材が重ならない。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const ARGENTINA_META = {
  id: "argentina",
  name: t("Argentina|Argentina|Argentine|アルゼンチン"),
  blurb: t(
    "A country whose railways were laid out like a fan pointed at one port, in three gauges that still don't meet|Un país cuyos ferrocarriles se trazaron en abanico apuntando a un solo puerto, en tres trochas que todavía no se encuentran|Un pays dont les chemins de fer furent tracés en éventail vers un seul port, en trois écartements qui ne se rejoignent toujours pas|一つの港を指す扇の形に敷かれ、いまも噛み合わない3つの軌間を残す鉄道の国",
  ),
  cur: { pre: "AR$", post: "", mul: 90000 },
  start: "buenosaires",
  cpuNames: ["Hornero", "Yaguareté", "Zorzal", "Ceibo"],
  // 国旗の空色・白、パンパの小麦色、土の茶、亜熱帯の緑。
  stripe: ["#75aadb", "#ffffff", "#f0b429", "#8b6a3f", "#3f6b3a"],
};

/** 5地方(cities.mjs と同じコード)。 */
export const ARGENTINA_REGIONS = {
  pa: t("The Pampas & Buenos Aires|La Pampa y Buenos Aires|La Pampa et Buenos Aires|パンパとブエノスアイレス"),
  no: t("The Northwest (NOA)|El Noroeste (NOA)|Le Nord-Ouest (NOA)|北西部(NOA)"),
  me: t("Mesopotamia & the Northeast|Mesopotamia y el Nordeste|La Mésopotamie et le Nord-Est|メソポタミアと北東部"),
  cu: t("Cuyo|Cuyo|Cuyo|クージョ"),
  pt: t("Patagonia|Patagonia|Patagonie|パタゴニア"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存全盤面(約300件)と衝突しないことを確認済み(2026-08-21)。
 *
 * 「向きの選べない移動アイテムは、操縦できるものより安い」の原則どおり、
 * hacerdedo(ヒッチハイク・行き先まかせ・260)は cochecama(自分で選ぶ・380)
 * より安い。
 */
export const ARGENTINA_ITEMS = {
  hacerdedo: {
    e: "👍",
    price: 260,
    kind: "move",
    n: t("Hitching a Ride on Ruta 40|Un aventón haciendo dedo en la Ruta 40|Un stop sur la Ruta 40|国道40号のヒッチハイク"),
    d: t(
      "Carried 8–12 squares. The driver decides where you get out, not you.|Te lleva de 8 a 12 casillas. Adónde bajás lo decide el conductor, no vos.|Emmené de 8 à 12 cases. C'est le conducteur qui décide où tu descends, pas toi.|8〜12マス運ばれる。どこで降ろされるかは運転手が決め、乗る側には選べない。",
    ),
    f: t(
      "Along much of Patagonia's Ruta 40, buses run only a few times a week, so thumbing a ride with whichever truck or pickup happens to pass is often simply how people get around, not a last resort.|En buena parte de la Ruta 40 patagónica los colectivos pasan apenas un par de veces por semana, así que hacer dedo con el camión o la camioneta que pase suele ser, simplemente, la manera de moverse, no un último recurso.|Sur une bonne partie de la Ruta 40 patagonienne, les bus ne passent que quelques fois par semaine, si bien que faire du stop avec le camion ou le pick-up qui passe est souvent, tout simplement, la façon de se déplacer, pas un dernier recours.|パタゴニアの国道40号線の多くの区間ではバスが週に数本しか通らないため、たまたま通りかかったトラックやピックアップに手を挙げて乗せてもらうのは、最後の手段ではなく単なる移動手段であることが多い。",
    ),
  },
  cochecama: {
    e: "🚌",
    price: 380,
    kind: "pre",
    n: t("A Coche Cama Sleeper Seat|Un asiento de coche cama|Un siège de coche cama|コチェカマの寝台席"),
    d: t(
      "Choose exactly how far you travel.|Elegí exactamente cuánto avanzás.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Long-distance buses, not trains, now carry most of Argentina's intercity passengers, and a coche cama seat reclines almost flat, with meal service and a screen, for overnight trips that can run well over twelve hours.|Los ómnibus de larga distancia, y no los trenes, llevan hoy a la mayoría de los pasajeros interurbanos de Argentina, y un asiento de coche cama se reclina casi horizontal, con servicio de comida y pantalla, para viajes nocturnos que pueden superar las doce horas.|Ce sont aujourd'hui les autocars longue distance, et non les trains, qui transportent l'essentiel des voyageurs interurbains d'Argentine, et un siège coche cama s'incline presque à plat, avec repas et écran, pour des trajets de nuit qui peuvent dépasser douze heures.|いまアルゼンチンの都市間旅客の多くを運ぶのは鉄道ではなく長距離バスであり、コチェカマの座席はほぼ水平近くまで倒れ、食事のサービスや画面も付いて、12時間を優に超える夜行の旅を支えている。",
    ),
  },
  grancapitan: {
    e: "🚃",
    price: 340,
    kind: "pre",
    n: t("A Ticket on El Gran Capitán|Un boleto en El Gran Capitán|Un billet pour El Gran Capitán|エル・グラン・カピタンの切符"),
    d: t(
      "Roll two dice.|Tirá dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "One of Argentina's few remaining long-distance trains, this standard-gauge service still links Buenos Aires to the Litoral, running on the Ferrocarril Urquiza network built to a different gauge from almost everything else on this board.|Uno de los pocos trenes de larga distancia que le quedan a Argentina, este servicio de trocha estándar todavía une Buenos Aires con el Litoral, sobre la red del Ferrocarril Urquiza, tendida en una trocha distinta de casi todo el resto de este tablero.|L'un des rares trains longue distance qu'il reste à l'Argentine, ce service à voie standard relie encore Buenos Aires au Litoral, sur le réseau du Ferrocarril Urquiza, posé selon un écartement différent de presque tout le reste de ce plateau.|アルゼンチンにいまも残るわずかな長距離列車のひとつで、この標準軌の便はいまもブエノスアイレスとリトラル地方を結ぶ。走るのはフェロカリル・ウルキサ線で、この盤面のほとんど他すべてとは異なる軌間で敷かれている。",
    ),
  },
  trenalasnubes: {
    e: "🚂",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the Tren a las Nubes|Un boleto en el Tren a las Nubes|Un billet pour le Tren a las Nubes|「雲への列車」の切符"),
    d: t(
      "Roll three dice.|Tirá tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Built to reach a Chilean port decades before it ever carried a tourist, the line climbs a metre-gauge track of switchbacks and tunnels to the Polvorilla Viaduct at over 4,200 metres, one of the highest points any railway reaches anywhere.|Construida para llegar a un puerto chileno décadas antes de llevar a un solo turista, la línea sube por una trocha métrica de zigzags y túneles hasta el Viaducto La Polvorilla, a más de 4.200 metros, uno de los puntos más altos que alcanza cualquier ferrocarril.|Construite pour atteindre un port chilien des décennies avant de transporter le moindre touriste, la ligne grimpe par une voie métrique de zigzags et de tunnels jusqu'au viaduc de la Polvorilla, à plus de 4 200 mètres, l'un des points les plus élevés atteints par un chemin de fer.|観光客を一人も乗せないうちから、何十年も前にチリの港へ届くために敷かれたこの路線は、1000mm軌のつづら折りとトンネルを登り、標高4200メートルを超えるラ・ポルボリージャ高架橋に至る。世界のどの鉄道が到達する地点の中でも屈指の高さである。",
    ),
  },
  gauchitogil: {
    e: "🎗️",
    price: 300,
    kind: "passive",
    n: t("A Gauchito Gil Roadside Ribbon|Una cinta roja del Gauchito Gil|Un ruban rouge du Gauchito Gil|ガウチート・ヒルの赤いリボン"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea automáticamente la próxima desgracia.|Bloque automatiquement le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Roadside shrines strung with red ribbons and flags for Gauchito Gil, a folk saint not recognized by the Catholic Church, dot Argentine highways, and long-haul drivers often stop to leave an offering for safe travel.|Los santuarios al costado de la ruta, con cintas y banderas rojas para el Gauchito Gil, un santo popular no reconocido por la Iglesia católica, salpican las carreteras argentinas, y los camioneros de larga distancia suelen parar a dejar una ofrenda por un viaje seguro.|Des sanctuaires de bord de route ornés de rubans et drapeaux rouges pour le Gauchito Gil, un saint populaire non reconnu par l'Église catholique, ponctuent les routes argentines, et les routiers longue distance s'arrêtent souvent y laisser une offrande pour un voyage sûr.|カトリック教会に公認されていない民間の聖人ガウチート・ヒルにちなむ赤いリボンや旗で飾られた道端の祠は、アルゼンチンの街道のあちこちにあり、長距離ドライバーはしばしば車を止めて道中の無事を願う捧げ物を残す。",
    ),
  },
  salgruesa: {
    e: "🧂",
    price: 420,
    kind: "pre",
    n: t("A Handful of Coarse Salt|Un puñado de sal gruesa|Une poignée de gros sel|粗塩ひとつかみ"),
    d: t(
      "Drive the misfortune spirit away from you.|Alejá de vos al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Throwing coarse salt behind you or across a doorway is a common folk practice against bad luck across much of Argentina, one of several small rituals that outlasted the specific beliefs that first attached to them.|Tirar sal gruesa detrás de uno o cruzando un umbral es una práctica popular común contra la mala suerte en buena parte de Argentina, uno de varios pequeños rituales que sobrevivieron a las creencias concretas que primero los originaron.|Jeter du gros sel derrière soi ou en travers d'un seuil est une pratique populaire courante contre la malchance dans une bonne partie de l'Argentine, l'un de ces petits rituels qui ont survécu aux croyances précises qui les avaient d'abord motivés.|背後や戸口の敷居越しに粗塩を撒くのは、アルゼンチンの広い地域で見られる魔除けの民間習慣であり、それを最初に生んだ具体的な信仰そのものより長く残った、いくつかの小さな儀礼のひとつである。",
    ),
  },
  resumen: {
    e: "📋",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("A Photocopied Exam Summary|Un resumen fotocopiado|Un résumé photocopié|コピーされた試験対策要点集"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallás una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Argentine university students, especially at Buenos Aires' large, free public faculties, have long relied on 'resúmenes,' condensed and often hand-copied summaries of a course passed down from one exam sitting to the next.|Los estudiantes universitarios argentinos, sobre todo en las grandes facultades públicas y gratuitas de Buenos Aires, dependen desde hace tiempo de los 'resúmenes', síntesis de una materia, muchas veces copiadas a mano, que se heredan de un llamado a examen al siguiente.|Les étudiants universitaires argentins, surtout dans les grandes facultés publiques et gratuites de Buenos Aires, comptent depuis longtemps sur les « resúmenes », des résumés condensés d'un cours, souvent recopiés à la main, transmis d'une session d'examen à l'autre.|アルゼンチンの大学生、とりわけブエノスアイレスの大規模な無償公立学部の学生たちは、以前から「レスメン」と呼ばれる、しばしば手写しで受け継がれてきた講義の要点集に頼ってきた。ある試験期から次の試験期へと代々受け渡される。",
    ),
  },
  quiniela: {
    e: "🎫",
    price: 280,
    kind: "pre",
    n: t("A Winning Quiniela Number|Un número ganador de la quiniela|Un numéro gagnant de la quiniela|当たったキニエラの番号"),
    d: t(
      "Sell it on and take the money.|Vendelo y quedate con la plata.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Quiniela, a numbers game run off the last digits of official lottery draws, is sold from small kiosks across Argentina and paid out the same day, a much faster turnaround than the national lottery's big draws.|La quiniela, un juego de números basado en las últimas cifras de sorteos oficiales, se vende en kioscos de todo el país y se paga el mismo día, mucho más rápido que los grandes sorteos de la lotería nacional.|La quiniela, un jeu de nombres basé sur les derniers chiffres de tirages officiels, se vend dans de petits kiosques à travers l'Argentine et se paie le jour même, bien plus vite que les grands tirages de la loterie nationale.|公式の抽選の末尾の数字をもとにした数字賭博「キニエラ」は、アルゼンチン各地の小さなキオスクで売られ、当日中に払い戻される。全国宝くじの大きな抽選よりずっと早い。",
    ),
  },
  vivezacriolla: {
    e: "😉",
    price: 400,
    kind: "pre",
    n: t("A Bit of Viveza Criolla|Un poco de viveza criolla|Un peu de viveza criolla|一ひねりのビベサ・クリオージャ"),
    d: t(
      "Take another turn straight away.|Jugá otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "'Viveza criolla' names a broad cultural habit of getting ahead through cleverness, a shortcut or a bent rule rather than by waiting your turn, celebrated in folklore as often as it's blamed for the small daily corruptions Argentines complain about.|La 'viveza criolla' nombra un hábito cultural amplio: salir adelante con astucia, un atajo o una regla torcida en vez de esperar el turno, celebrada en el folclore casi tanto como se la culpa por las pequeñas corruptelas cotidianas de las que se quejan los argentinos.|La « viveza criolla » désigne une habitude culturelle répandue : prendre l'avantage par la ruse, un raccourci ou une règle contournée plutôt qu'en attendant son tour, célébrée dans le folklore presque autant qu'on la blâme pour les petites entorses quotidiennes dont se plaignent les Argentins.|「ビベサ・クリオージャ」は、順番を待つのではなく、機転や近道、あるいは少し曲げた規則で一歩先んじるという広く根付いた文化的な流儀を指す言葉で、民話でもてはやされる一方、アルゼンチン人が日々こぼす小さな不正の原因としても名指しされる。",
    ),
  },
};

/**
 * 厄災の神。北西部の製糖工場(インヘニオ)に伝わる伝承の怪物「エル・
 * ファミリアル」。工場主が良い収穫と引き換えに労働者の命を捧げているとされる
 * ——**これは伝承として扱い、事実として書かない。**ボリビアのエル・ティーオ、
 * ペルーのアプとは題材が重ならない。
 */
export const ARGENTINA_SPIRIT = {
  e: "🐕‍🦺",
  n: t("El Familiar|El Familiar|El Familiar|エル・ファミリアル"),
  big: t("El Familiar's Feast|El festín de El Familiar|Le festin d'El Familiar|エル・ファミリアルの饗宴"),
  ward: "gauchitogil",
  arrive: t(
    "<b>🐕‍🦺 El Familiar has picked up your trail.</b> Sugar-mill legend across the northwest tells of a chained, dog-like creature that a mill owner is said to keep fed on workers' lives in exchange for a good harvest. It now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🐕‍🦺 El Familiar te siguió el rastro.</b> La leyenda de los ingenios del noroeste habla de una criatura encadenada, parecida a un perro, que el dueño del ingenio supuestamente alimenta con vidas de trabajadores a cambio de una buena zafra. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🐕‍🦺 El Familiar a trouvé ta trace.</b> La légende des sucreries du nord-ouest parle d'une créature enchaînée, semblable à un chien, que le propriétaire du moulin nourrirait de vies d'ouvriers en échange d'une bonne récolte. Elle marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🐕‍🦺 エル・ファミリアルに目を付けられた。</b> 北西部の製糖工場(インヘニオ)に伝わる言い伝えでは、鎖につながれた犬のような怪物がおり、工場主は良い収穫と引き換えにそれへ労働者の命を捧げているとされる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🐕‍🦺 <b>El Familiar</b> loses interest and settles over <b>{0}</b>, farthest from {1}.|🐕‍🦺 <b>El Familiar</b> pierde el interés y se posa sobre <b>{0}</b>, el más lejano de {1}.|🐕‍🦺 <b>El Familiar</b> se désintéresse et se pose sur <b>{0}</b>, le plus loin de {1}.|🐕‍🦺 <b>エル・ファミリアル</b> は興味を失い、{1} から最も遠い <b>{0}</b> の上に留まった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside El Familiar without ever leaving it an offering. The chain finally slips — <b>El Familiar's Feast</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a El Familiar sin dejarle nunca una ofrenda. La cadena por fin se suelta: empieza <b>el festín de El Familiar</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours aux côtés d'El Familiar sans jamais lui laisser d'offrande. La chaîne finit par céder : <b>le festin d'El Familiar</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもエル・ファミリアルの傍らを歩きながら、一度も捧げ物を残さなかった。鎖がついに緩む。<b>エル・ファミリアルの饗宴</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the legend is usually read as a folk indictment of exploitative labour conditions on the sugar estates, a way of naming a real danger — mills that quietly used up their workers — without naming an owner directly.|<b>Tras la historia:</b> la leyenda suele leerse como una denuncia popular de las condiciones laborales de explotación en los ingenios, una manera de nombrar un peligro real —fábricas que silenciosamente consumían a sus trabajadores— sin señalar directamente a un dueño.|<b>Derrière l'histoire :</b> la légende se lit généralement comme une dénonciation populaire des conditions de travail d'exploitation dans les sucreries, une façon de nommer un danger réel — des usines qui usaient silencieusement leurs ouvriers — sans désigner directement un propriétaire.|<b>物語の背景:</b> この伝承はふつう、製糖農園における搾取的な労働条件への民衆の告発として読まれる。労働者を静かに消耗させていく工場という現実の危険を、経営者を名指しせずに語る方法だったとされる。",
  ),
  pleased: t(
    "The chain rattles once, distantly, and then goes quiet. A coin turns up in the dust at your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|La cadena suena una vez, a lo lejos, y luego calla. Una moneda aparece en el polvo a tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|La chaîne cliquette une fois, au loin, puis se tait. Une pièce apparaît dans la poussière à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|鎖が一度、遠くで鳴り、それきり静まった。足元の土埃の中に硬貨が一枚落ちていた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A red ribbon is tied where El Familiar can see it. The offering is enough — it slinks back into the cane rows, passing <b>{0}</b> without incident this turn.|Se ata una cinta roja donde El Familiar pueda verla. La ofrenda basta: se repliega entre la caña y pasa junto a <b>{0}</b> sin incidentes esta vuelta.|Un ruban rouge est noué là où El Familiar peut le voir. L'offrande suffit : il se retire dans les rangs de canne, passant devant <b>{0}</b> sans incident ce tour-ci.|エル・ファミリアルに見えるところに赤いリボンを結んだ。それだけで十分だった。サトウキビの畝の中へと退き、このターンは何事もなく <b>{0}</b> の傍らを通り過ぎた。",
  ),
};

/**
 * 災難7種。並び順が仕組みと対応している(`season-and-doom-rules.ts` は
 * 全盤面共通で fine / percentLoss / skipTurn / loseProperties / payOthers /
 * teleport / steal の順に対応づける)。**登録時に順序を変えないこと。**
 *
 * 「ソンダ風」は南アメリカ盤(southamerica.content.json)がすでに厄災として
 * 使っているため避け、percentLoss は通貨切り下げにした(2026-08-21確認)。
 */
export const ARGENTINA_DOOM = [
  // 1) fine — 直接の出費
  {
    id: "sinboleto",
    n: t("Caught riding without a ticket|Te agarran viajando sin boleto|Attrapé à voyager sans billet|無賃乗車を見つかる"),
    t: t(
      "The inspector worked back through the carriage checking tickets one row at a time, and there was no getting off before reaching the seat in question. A fine on the spot is cheaper than the ticket would have been, but only barely.|El inspector fue revisando el vagón fila por fila, y no hubo forma de bajarse antes de llegar al asiento en cuestión. La multa en el acto sale más barata que el boleto, pero por poco.|Le contrôleur remonta la voiture rangée par rangée, et impossible de descendre avant d'atteindre le siège en question. L'amende sur place coûte moins cher que le billet n'aurait coûté, mais de peu.|検札係は車両を一列ずつ後ろから確かめてきて、問題の座席にたどり着くまでに降りる隙は無かった。その場での罰金は本来の切符より安く済むが、それもわずかな差でしかない。",
    ),
  },
  // 2) percentLoss — 割合で失う
  {
    id: "megadevaluacion",
    n: t("A sudden devaluation eats into your cash|Una devaluación repentina se come tu plata|Une dévaluation soudaine grignote ton argent|突然の切り下げが手持ちを蝕む"),
    t: t(
      "The exchange rate moved overnight, again, and the bills in your pocket buy less this morning than they did yesterday evening. Nobody bothers being surprised anymore; the only question is how much this time.|El tipo de cambio se movió de un día para el otro, otra vez, y los billetes en tu bolsillo compran menos esta mañana que anoche. Ya nadie se sorprende; la única duda es cuánto esta vez.|Le taux de change a encore bougé du jour au lendemain, et les billets dans ta poche achètent moins ce matin qu'hier soir. Plus personne ne s'en étonne ; la seule question est de combien, cette fois.|為替は一晩でまた動き、今朝ポケットの中の紙幣は昨夜より買える物が減っている。もう誰も驚かない。今回はどれだけかというだけが問題だ。",
    ),
  },
  // 3) skipTurn — 足止め
  {
    id: "parogeneral",
    n: t("A general strike halts the trains|Un paro general detiene los trenes|Une grève générale arrête les trains|ゼネストが列車を止める"),
    t: t(
      "The union called a paro with a day's notice, and every train on the line stayed in the yard rather than run. Waiting it out on the platform is the only real option; the strike ends when it ends.|El sindicato convocó un paro con un día de aviso, y todos los trenes de la línea se quedaron en el depósito en vez de circular. Esperar en el andén es la única opción real; el paro termina cuando termina.|Le syndicat a lancé un préavis de grève d'un jour, et tous les trains de la ligne sont restés au dépôt plutôt que de circuler. Attendre sur le quai est la seule vraie option ; la grève se termine quand elle se termine.|組合はわずか1日前の通告でストを呼びかけ、その路線のすべての列車は走らず車両基地に留め置かれた。ホームで待つ以外に手立てはなく、ストは終わるときに終わる。",
    ),
  },
  // 4) loseProperties — 持ち物件を失う
  {
    id: "cierrederamal",
    n: t("A branch line closes for good|Un ramal cierra para siempre|Une ligne secondaire ferme pour de bon|支線が完全に閉じる",
    ),
    t: t(
      "A one-line notice in the official gazette was all it took: the branch is closed, effective immediately, no replacement service announced. A property that depended on the station losing its trains is worth a fraction of what it was.|Un aviso de una línea en el boletín oficial bastó: el ramal queda cerrado, con efecto inmediato, sin servicio alternativo anunciado. Una propiedad que dependía de la estación que se quedó sin trenes vale una fracción de lo que valía.|Un avis d'une ligne au journal officiel a suffi : la ligne est fermée, avec effet immédiat, aucun service de remplacement annoncé. Une propriété qui dépendait de la gare qui a perdu ses trains ne vaut plus qu'une fraction de son ancienne valeur.|官報のたった1行の告示だけで十分だった。支線は即日閉鎖、代替の便の案内も無い。列車を失った駅に頼っていた物件は、かつての価値のごくわずかしか残らない。",
    ),
  },
  // 5) payOthers — 皆に払う
  {
    id: "trasbordoforzado",
    n: t("A forced transshipment at the break of gauge|Un trasbordo forzoso en el cambio de trocha|Un transbordement forcé au changement d'écartement|軌間の切り替え地点で強いられる積み替え"),
    t: t(
      "The train can go no further on this gauge, and the gang waiting at the yard charges by the car to unload, carry across and reload everything onto the train on the other track. There's no line to skip and no cheaper crew to call.|El tren no puede seguir con esta trocha, y la cuadrilla que espera en el playón cobra por vagón para descargar, cruzar y volver a cargar todo en el tren de la otra vía. No hay fila que saltar ni cuadrilla más barata que llamar.|Le train ne peut aller plus loin avec cet écartement, et l'équipe qui attend sur le faisceau facture au wagon pour décharger, transporter et recharger le tout sur le train de l'autre voie. Pas de file à sauter ni d'équipe moins chère à appeler.|この軌間ではこれ以上先へ進めず、操車場で待つ人足たちは、荷を下ろして運び、別の線路の列車へ積み直す作業を一両ごとに請求する。列を飛ばす方法も、安く済ませる手立ても無い。",
    ),
  },
  // 6) teleport — 気付けば違う場所に
  {
    id: "trenfantasma",
    n: t("The ghost train picks you up|El tren fantasma te levanta|Le train fantôme t'embarque|幽霊列車に拾われる"),
    t: t(
      "Small-town legend along more than one closed line tells of a train still running its old timetable long after the tracks were meant to be silent, its lit windows passing through stations that no longer exist. Waking up somewhere else on the line, with no memory of boarding, is the story people tell afterward.|La leyenda de pueblo, en más de un ramal cerrado, habla de un tren que sigue corriendo su viejo horario mucho después de que las vías debían quedar en silencio, con las ventanillas iluminadas pasando por estaciones que ya no existen. Despertar en otro punto de la línea, sin recordar haber subido, es lo que se cuenta después.|La légende de bourgade, sur plus d'une ligne fermée, parle d'un train qui suit encore son vieil horaire longtemps après que les voies devaient rester silencieuses, ses fenêtres allumées traversant des gares qui n'existent plus. Se réveiller ailleurs sur la ligne, sans souvenir d'être monté, voilà ce qu'on raconte après coup.|閉じた支線のいくつかに伝わる町の言い伝えでは、線路が静まったはずのずっとあとも、明かりの灯った窓を連ねてもう存在しない駅々を通り過ぎる、昔の時刻表どおりに走り続ける列車がいるという。乗った覚えもなく路線の別の場所で目を覚ました、というのがあとで語られる話である。",
    ),
  },
  // 7) steal — すられる
  {
    id: "arrebatoretiro",
    n: t("A bag snatched at Retiro station|Un arrebato en la estación Retiro|Un vol à l'arraché à la gare de Retiro|レティーロ駅でひったくりに遭う"),
    t: t(
      "The concourse was loud with three stations' worth of departure announcements at once, and a hand closed on the bag strap and pulled before the grip could tighten. Whoever it was is already lost in the crowd heading for one of the other two platforms.|El hall estaba lleno del ruido de los avisos de salida de las tres estaciones a la vez, y una mano cerró sobre la correa del bolso y tiró antes de que el agarre se ajustara. Quien haya sido ya se perdió entre la gente que va hacia alguno de los otros dos andenes.|Le hall résonnait à la fois des annonces de départ des trois gares, et une main s'est refermée sur la bandoulière du sac et a tiré avant que la prise ne se resserre. Qui que ce soit, il s'est déjà perdu dans la foule filant vers l'un des deux autres quais.|コンコースは3つの駅ぶんの出発案内が同時に響いてやかましく、しっかり握りしめる前にバッグのストラップに手がかかり、引っ張られた。犯人はもう、残る二つの駅のどちらかへ向かう人混みに紛れて見えなくなっている。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月(暦の並びは他国と共通)。南半球なので中身は
 * 逆になる(7月が独立記念日、1月が真夏)。ここは文面(e/n/t/f)のみで、
 * 数値の仕組み(region-income-multiplier 等)は共有ファイル
 * `season-and-doom-rules.ts` 側に付く。提案値は REGISTER.md に叩き台として
 * 書いた(6月・12月のアギナルドを all-players-gain-cash に、7月の独立記念日を
 * rest-spirit に、2月のグアレグアイチュ・カーニバルを give-item-to-all に)。
 */
export const ARGENTINA_SEASONS = [
  {
    e: "🌱",
    n: t("The main soy and corn harvest peaks|La cosecha gruesa está en su punto|La récolte principale de soja et de maïs bat son plein|大豆・とうもろこしの本作収穫が最盛期を迎える"),
    t: t(
      "Combines run day and night across the humid pampa as the season's soybeans and corn come in, and grain trucks queue for hours outside the elevators at Rosario and along the rail sidings that still feed them.|Las cosechadoras trabajan día y noche en la pampa húmeda mientras entra la soja y el maíz de la temporada, y los camiones graneleros hacen fila por horas afuera de los silos de Rosario y de los apeaderos que aún los abastecen.|Les moissonneuses tournent jour et nuit dans la pampa humide tandis que rentrent le soja et le maïs de la saison, et les camions céréaliers font la queue pendant des heures devant les silos de Rosario et les voies de garage qui les alimentent encore.|湿潤パンパでは大型収穫機が昼夜を分かたず動き、その季節の大豆ととうもろこしが取り込まれる。穀物トラックはロサリオのサイロや、いまもそこへ穀物を送り込む鉄道の側線の外で何時間も列を作る。",
    ),
    f: t(
      "Argentina is one of the world's largest exporters of soybean products, and the crush plants clustered around Rosario process much of what the pampa grows into oil and meal before it ever leaves the country.|Argentina es uno de los mayores exportadores mundiales de productos derivados de la soja, y las plantas de molienda concentradas en torno a Rosario procesan buena parte de lo que produce la pampa en aceite y harina antes de que salga del país.|L'Argentine est l'un des plus grands exportateurs mondiaux de produits du soja, et les usines de trituration concentrées autour de Rosario transforment une bonne part de ce que produit la pampa en huile et en farine avant même que cela ne quitte le pays.|アルゼンチンは世界有数の大豆製品輸出国であり、ロサリオ周辺に集まる搾油工場は、パンパで採れたものの多くを、国外へ出る前に油と粕へと加工する。",
    ),
  },
  {
    e: "🧉",
    n: t("The yerba mate harvest is underway in Misiones|La zafra de la yerba mate está en marcha en Misiones|La récolte du maté bat son plein à Misiones|ミシオネスでイェルバ・マテの収穫が進む"),
    t: t(
      "Workers called tareferos strip the leaves from yerba mate plants across Misiones province by hand, filling sacks slung from a shoulder strap that can weigh as much as the picker carrying them.|Trabajadores llamados tareferos cosechan a mano las hojas de yerba mate en toda la provincia de Misiones, llenando bolsas colgadas de una correa al hombro que pueden pesar tanto como quien las carga.|Des travailleurs appelés tareferos récoltent à la main les feuilles de maté dans toute la province de Misiones, remplissant des sacs suspendus à une bretelle qui peuvent peser aussi lourd que le cueilleur qui les porte.|「タレフェロ」と呼ばれる労働者たちが、ミシオネス州各地でイェルバ・マテの葉を手摘みし、肩紐で吊るした袋を満たす。その袋は、担ぐ本人と同じくらいの重さになることもある。",
    ),
    f: t(
      "Mate, drunk from a shared gourd through a metal straw, is such a fixture of daily life across Argentina that offices, bus terminals and long car trips are rarely without a thermos of hot water on hand.|El mate, que se bebe de una calabaza compartida con una bombilla metálica, es un hábito tan arraigado en la vida diaria de Argentina que oficinas, terminales de ómnibus y viajes largos en auto rara vez están sin un termo de agua caliente a mano.|Le maté, bu dans une calebasse partagée à travers une paille métallique, est si ancré dans la vie quotidienne argentine que bureaux, gares routières et longs trajets en voiture manquent rarement d'un thermos d'eau chaude à portée de main.|金属製のストローで、みなで回し飲みするひょうたんから飲むマテ茶は、アルゼンチンの日常にあまりに深く根づいており、職場やバスターミナル、長距離のドライブでも、お湯の入った魔法瓶が手元に無いことはめったにない。",
    ),
  },
  {
    e: "🎿",
    n: t("The first Aguinaldo lands, and the ski season opens|Cae el primer Aguinaldo y abre la temporada de esquí|Le premier Aguinaldo tombe, et la saison de ski s'ouvre|最初のアギナルドが支払われ、スキー場が開く"),
    t: t(
      "By law, Argentine workers receive half of an extra month's pay, the Aguinaldo, by the end of June, timed to help cover the start of the cold season. In the Andes, Bariloche's slopes open for the season around the same weeks.|Por ley, los trabajadores argentinos reciben la mitad de un sueldo extra, el Aguinaldo, antes de fin de junio, pensado para ayudar a afrontar el inicio del frío. En los Andes, las pistas de Bariloche abren la temporada por esas mismas semanas.|Par la loi, les travailleurs argentins reçoivent la moitié d'un salaire supplémentaire, l'Aguinaldo, avant fin juin, pensé pour aider à affronter le début du froid. Dans les Andes, les pistes de Bariloche ouvrent la saison ces mêmes semaines.|法律により、アルゼンチンの労働者は6月末までに、給与1か月分の半分にあたる「アギナルド」を受け取る。寒さが本格化する時期を乗り切る助けとして時期が定められている。アンデスでは、同じ頃にバリローチェのゲレンデがシーズンを開ける。",
    ),
    f: t(
      "The Aguinaldo, paid in two instalments each June and December, dates back to a mid-twentieth-century labour law and remains one of the most closely watched dates on the Argentine calendar for household budgets.|El Aguinaldo, pagado en dos cuotas cada junio y diciembre, se remonta a una ley laboral de mediados del siglo XX y sigue siendo una de las fechas más vigiladas del calendario argentino para el presupuesto familiar.|L'Aguinaldo, versé en deux fois chaque juin et décembre, remonte à une loi du travail du milieu du XXe siècle et reste l'une des dates les plus surveillées du calendrier argentin pour le budget des ménages.|6月と12月の年2回に分けて支払われるアギナルドは20世紀半ばの労働法に由来し、いまも家計にとってアルゼンチンの暦の中でも特に注視される日である。",
    ),
  },
  {
    e: "🇦🇷",
    n: t("Independence Day falls at the height of the dry season|El Día de la Independencia cae en lo más seco del año|Le jour de l'Indépendance tombe au plus sec de l'année|独立記念日が乾季の頂点に重なる"),
    t: t(
      "Congress delegates meeting in Tucumán declared independence on 9 July 1816, and the date is now a national holiday marked by flag-raisings and, in the Andes, some of the clearest, driest weather of the year for mountain travel.|Los diputados del Congreso reunidos en Tucumán declararon la independencia el 9 de julio de 1816, y la fecha es hoy feriado nacional, marcado por izadas de bandera y, en los Andes, algunos de los días más despejados y secos del año para viajar por la montaña.|Les délégués du Congrès réunis à Tucumán déclarèrent l'indépendance le 9 juillet 1816, et la date est aujourd'hui un jour férié national, marqué par des levers de drapeau et, dans les Andes, certains des jours les plus clairs et secs de l'année pour voyager en montagne.|トゥクマンに集まった議会の代表たちは1816年7月9日に独立を宣言し、いまこの日は国の祝日として国旗掲揚とともに祝われる。アンデスでは、この時期は一年でも特に晴れて乾いた、山を越えて旅するのに適した日々にあたる。",
    ),
    f: t(
      "Public buildings and many homes hang the sky-blue-and-white flag for the holiday, a flag Manuel Belgrano first raised on the banks of the Paraná at Rosario four years earlier, in 1812.|Los edificios públicos y muchas casas cuelgan la bandera celeste y blanca por el feriado, la misma que Manuel Belgrano izó por primera vez a orillas del Paraná en Rosario cuatro años antes, en 1812.|Bâtiments publics et nombre de maisons arborent le drapeau bleu ciel et blanc pour ce jour férié, le même que Manuel Belgrano hissa pour la première fois sur les rives du Paraná à Rosario quatre ans plus tôt, en 1812.|祝日には公共の建物や多くの家々が空色と白の国旗を掲げる。この旗は4年前の1812年、マヌエル・ベルグラノがロサリオのパラナ川岸で初めて掲げたものである。",
    ),
  },
  {
    e: "🌎",
    n: t("Households in the northwest give back to the earth|Los hogares del noroeste le devuelven algo a la tierra|Les foyers du nord-ouest rendent quelque chose à la terre|北西部の家々が大地に捧げ物をする"),
    t: t(
      "On the first of August, families across the northwest bury small offerings of food, drink and coca leaves for Pachamama, the earth, in a tradition shared with the Andean highlands of Bolivia and Peru just across the border.|El primero de agosto, familias de todo el noroeste entierran pequeñas ofrendas de comida, bebida y hojas de coca para la Pachamama, la tierra, en una tradición compartida con las tierras altas andinas de Bolivia y Perú, del otro lado de la frontera.|Le premier août, des familles de tout le nord-ouest enterrent de petites offrandes de nourriture, de boisson et de feuilles de coca pour la Pachamama, la terre, une tradition partagée avec les hauts plateaux andins de Bolivie et du Pérou, de l'autre côté de la frontière.|8月1日、北西部各地の家族は、パチャママ(大地)への食べ物や飲み物、コカの葉の小さな捧げ物を土に埋める。これは国境を越えたボリビアやペルーのアンデス高地とも分かち合う伝統である。",
    ),
    f: t(
      "The ritual, still very much alive rather than staged for visitors, sits alongside Catholic practice rather than replacing it in most households that observe it.|El ritual, todavía muy vivo y no puesto en escena para visitantes, convive con la práctica católica en la mayoría de los hogares que lo observan, en vez de reemplazarla.|Le rituel, encore bien vivant et non mis en scène pour les visiteurs, coexiste avec la pratique catholique dans la plupart des foyers qui l'observent, plutôt que de la remplacer.|この儀礼はいまも観光向けに演じられるものではなく本当に生きた慣習であり、それを行う多くの家庭ではカトリックの信仰に取って代わるのではなく、それと並んで続けられている。",
    ),
  },
  {
    e: "🎋",
    n: t("The sugar-cane harvest keeps the mills running|La zafra cañera mantiene los ingenios en marcha|La récolte de canne à sucre fait tourner les sucreries|サトウキビの収穫が製糖工場を動かし続ける"),
    t: t(
      "Cane trucks queue outside the sugar mills of Tucumán and neighbouring provinces during the zafra, the months-long harvest and milling season that gives the region around Tucumán its old nickname, the garden of the republic.|Los camiones cañeros hacen fila afuera de los ingenios de Tucumán y provincias vecinas durante la zafra, la temporada de cosecha y molienda que dura meses y le da a la región en torno a Tucumán su viejo apodo, el jardín de la república.|Les camions à canne font la queue devant les sucreries de Tucumán et des provinces voisines pendant la zafra, la saison de récolte et de broyage qui dure des mois et vaut à la région autour de Tucumán son vieux surnom, le jardin de la république.|トゥクマンと近隣の州の製糖工場の外には、サフラと呼ばれる数か月続く収穫と製糖の季節のあいだ、サトウキビを積んだトラックが列をなす。この季節が、トゥクマン周辺の地方に「共和国の庭」という古くからの呼び名を与えている。",
    ),
    f: t(
      "Seasonal cane-cutting work has long drawn labourers from poorer neighbouring provinces, and the mills' hard, cyclical rhythm of boom and layoff is part of what fed the region's Familiar legend in the first place.|El trabajo estacional de corte de caña atrajo desde siempre a jornaleros de provincias vecinas más pobres, y el ritmo duro y cíclico de auge y despido de los ingenios es parte de lo que alimentó, en primer lugar, la leyenda del Familiar de la región.|Le travail saisonnier de coupe de la canne a toujours attiré des ouvriers de provinces voisines plus pauvres, et le rythme dur et cyclique de plein emploi puis de licenciements des sucreries est en partie ce qui a nourri, à l'origine, la légende régionale du Familiar.|季節労働のサトウキビ刈りは昔から、より貧しい近隣州から労働者を引き寄せてきた。好況と解雇を繰り返す製糖工場の厳しい周期こそが、そもそもこの地方のエル・ファミリアルの伝承を育てた一因でもある。",
    ),
  },
  {
    e: "🍇",
    n: t("Vines bud out across Cuyo as the growing season begins|Los viñedos brotan en Cuyo al empezar el ciclo de crecimiento|Les vignes bourgeonnent à Cuyo au début du cycle de croissance|クージョのぶどうが芽吹き、生育期が始まる",
    ),
    t: t(
      "As frost risk fades across Mendoza and San Juan, vines planted along acequia-fed rows begin to bud, and growers start the year's watch over how much snowpack the Andes will send down through the irrigation canals.|A medida que el riesgo de heladas se aleja en Mendoza y San Juan, las vides plantadas junto a las hileras regadas por acequias empiezan a brotar, y los productores inician la vigilancia anual sobre cuánta nieve acumulada bajarán los Andes por los canales.|Alors que le risque de gel s'éloigne à Mendoza et San Juan, les vignes plantées le long des rangs irrigués par des acequias commencent à bourgeonner, et les producteurs entament la surveillance annuelle de la quantité de neige que les Andes enverront par les canaux.|メンドーサとサンフアンで霜の心配が薄れるにつれ、アセキア水路沿いに植えられたぶどうの木々が芽吹き始め、生産者たちはその年、アンデスの積雪がどれだけ灌漑水路を通って下りてくるかを見守り始める。",
    ),
    f: t(
      "A dry Andean winter with little snow can mean a tight irrigation allowance later in the season, so growers watch the mountains as closely as the vines themselves.|Un invierno andino seco con poca nieve puede significar una asignación de riego ajustada más adelante en la temporada, así que los productores vigilan la montaña tan de cerca como a las propias vides.|Un hiver andin sec avec peu de neige peut signifier une allocation d'irrigation serrée plus tard dans la saison, si bien que les producteurs surveillent la montagne d'aussi près que les vignes elles-mêmes.|雪の少ない乾いたアンデスの冬は、のちの季節の灌漑割り当てが厳しくなることを意味しかねない。だから生産者はぶどうそのものと同じくらい、山の様子を注意深く見守る。",
    ),
  },
  {
    e: "🐑",
    n: t("Shearing season opens across the Patagonian steppe|Empieza la esquila en la estepa patagónica|La saison de tonte s'ouvre sur la steppe patagonienne|パタゴニアのステップで毛刈りの季節が始まる"),
    t: t(
      "Shearing crews move estancia to estancia across Santa Cruz and Chubut as the weather turns, working fast through flocks that can number in the thousands before wool prices and shipping schedules move against them.|Las cuadrillas de esquila recorren estancia tras estancia en Santa Cruz y Chubut a medida que cambia el clima, trabajando rápido en rebaños que pueden contar miles de cabezas antes de que los precios de la lana y los cronogramas de embarque jueguen en contra.|Des équipes de tondeurs parcourent estancia après estancia à travers Santa Cruz et Chubut à mesure que le temps change, travaillant vite sur des troupeaux pouvant compter des milliers de têtes avant que les prix de la laine et les calendriers d'expédition ne se retournent contre eux.|天候が変わるにつれ、毛刈りの一団はサンタクルスやチュブ各地のestanciaを渡り歩き、時に数千頭にのぼる群れを、羊毛の価格や船積みの日程が不利に動く前に手早くこなしていく。",
    ),
    f: t(
      "Wool from these flocks still moves out through ports like Río Gallegos much as it did a century ago, even though almost nothing else about how the wool gets to the coast has stayed the same.|La lana de estos rebaños todavía sale por puertos como Río Gallegos casi como hacía un siglo, aunque casi nada más de cómo llega la lana a la costa siga igual.|La laine de ces troupeaux sort encore par des ports comme Río Gallegos à peu près comme il y a un siècle, même si presque rien d'autre dans la façon dont la laine atteint la côte n'est resté pareil.|この羊毛はいまもリオ・ガジェゴスのような港を通じて、一世紀前とほとんど変わらぬやり方で送り出されている。もっとも、羊毛が海岸へ届くまでの道のりそのものは、それ以外ほとんど何もかもが様変わりしている。",
    ),
  },
  {
    e: "🏖️",
    n: t("The second Aguinaldo lands as the beach season opens|Cae el segundo Aguinaldo al abrir la temporada de playa|Le second Aguinaldo tombe à l'ouverture de la saison balnéaire|第2回アギナルドが支払われ、海水浴シーズンが開く"),
    t: t(
      "The year's second half-month bonus is due by 18 December, just as families start booking rooms in Mar del Plata and along the Atlantic coast for the summer holidays that follow.|La segunda mitad del aguinaldo del año vence el 18 de diciembre, justo cuando las familias empiezan a reservar habitaciones en Mar del Plata y en toda la costa atlántica para las vacaciones de verano que siguen.|La seconde moitié de la prime annuelle est due le 18 décembre, juste au moment où les familles commencent à réserver des chambres à Mar del Plata et le long de la côte atlantique pour les vacances d'été qui suivent.|年のうちもう半分のアギナルドは12月18日までに支払われる。ちょうど家族連れが続く夏の休暇に向けて、マル・デル・プラタや大西洋岸沿いの宿を予約し始める頃である。",
    ),
    f: t(
      "Mar del Plata's population can multiply several times over in a good summer, filling a resort infrastructure built more than a century ago around the very railway that first brought Buenos Aires society to its cliffs.|La población de Mar del Plata puede multiplicarse varias veces en un buen verano, llenando una infraestructura turística construida hace más de un siglo en torno al mismo ferrocarril que llevó por primera vez a la sociedad porteña a sus acantilados.|La population de Mar del Plata peut se multiplier plusieurs fois en un bon été, remplissant une infrastructure touristique bâtie il y a plus d'un siècle autour du chemin de fer même qui amena pour la première fois la société de Buenos Aires sur ses falaises.|良い夏には、マル・デル・プラタの人口は何倍にも膨れ上がり、1世紀以上前、ブエノスアイレスの社交界を初めてその崖へ運んだのと同じ鉄道を中心に築かれたリゾートの受け皿を満たす。",
    ),
  },
  {
    e: "☀️",
    n: t("High summer packs the Atlantic coast|El verano pleno llena la costa atlántica|Le plein été remplit la côte atlantique|真夏が大西洋岸を埋め尽くす"),
    t: t(
      "January is the peak month for Argentina's Atlantic beach towns, when much of Buenos Aires effectively relocates to the coast for a few weeks and inland cities empty out in return.|Enero es el mes pico para los balnearios atlánticos de Argentina, cuando buena parte de Buenos Aires se traslada en la práctica a la costa por unas semanas, y las ciudades del interior se vacían a cambio.|Janvier est le mois de pointe pour les stations balnéaires atlantiques d'Argentine, quand une bonne part de Buenos Aires se déplace en pratique vers la côte pour quelques semaines, tandis que les villes de l'intérieur se vident en retour.|1月はアルゼンチンの大西洋沿岸リゾートの最盛期であり、ブエノスアイレスの多くが数週間、事実上海岸へと移り、その分内陸の町々は静かになる。",
    ),
    f: t(
      "The same month brings the driest, hottest weather to the Andean interior, when mountain roads are at their most reliable for the trekking season that peaks well before the southern winter returns.|El mismo mes trae el clima más seco y caluroso al interior andino, cuando los caminos de montaña son más confiables para la temporada de trekking, que llega a su pico bien antes de que vuelva el invierno austral.|Le même mois apporte le temps le plus sec et le plus chaud à l'intérieur andin, quand les routes de montagne sont les plus fiables pour la saison de trekking, qui atteint son pic bien avant le retour de l'hiver austral.|同じ月は、アンデスの内陸にもっとも乾いて暑い気候をもたらし、山道がもっとも頼れる時期でもある。南半球の冬が戻るずっと前にトレッキングの最盛期を迎える。",
    ),
  },
  {
    e: "🎭",
    n: t("Gualeguaychú's Corsódromo fills for carnival|El Corsódromo de Gualeguaychú se llena para el carnaval|Le Corsódromo de Gualeguaychú se remplit pour le carnaval|グアレグアイチュのコルソドロモがカーニバルで埋まる"),
    t: t(
      "Comparsa troupes parade their feathered costumes through Gualeguaychú's purpose-built Corsódromo on consecutive weekends, in Argentina's biggest carnival celebration, drawing visitors from well beyond the Litoral.|Las comparsas desfilan con sus trajes de plumas por el Corsódromo de Gualeguaychú, construido para ese fin, en fines de semana consecutivos, en la mayor celebración de carnaval de Argentina, que atrae visitantes de mucho más allá del Litoral.|Des troupes de comparsas défilent avec leurs costumes à plumes dans le Corsódromo de Gualeguaychú, bâti à cet effet, des week-ends d'affilée, lors de la plus grande célébration de carnaval d'Argentine, attirant des visiteurs bien au-delà du Litoral.|コンパルサの一団は羽根飾りの衣装をまとい、そのために作られたグアレグアイチュのコルソドロモを何週末も連続でパレードする。アルゼンチン最大のカーニバルで、リトラル地方の外からも大勢の見物客を集める。",
    ),
    f: t(
      "Building a single comparsa's costumes and float can take a group most of the year and a serious budget, all for a performance measured in a few hundred metres of parade route.|Construir los trajes y la carroza de una sola comparsa puede llevarle a un grupo casi todo el año y un presupuesto serio, todo para una actuación que se mide en unos pocos cientos de metros de recorrido.|Confectionner les costumes et le char d'une seule comparsa peut prendre à un groupe presque toute l'année et un budget conséquent, tout cela pour une prestation qui se mesure en quelques centaines de mètres de défilé.|たった一つのコンパルサの衣装と山車を作るのに、一団はほぼ一年がかりで相当な予算をかけることもある。それもすべて、わずか数百メートルのパレードのためである。",
    ),
  },
  {
    e: "🍷",
    n: t("Mendoza crowns a Vendimia queen as harvest ends|Mendoza corona a la reina de la Vendimia al cerrar la cosecha|Mendoza couronne une reine des Vendanges à la fin de la récolte|収穫を終えたメンドーサがベンディミアの女王を戴冠する"),
    t: t(
      "The Fiesta Nacional de la Vendimia closes out the grape harvest with a televised open-air pageant in Mendoza, crowning a queen chosen from among the province's wine-growing departments in a tradition running since 1936.|La Fiesta Nacional de la Vendimia cierra la cosecha de uva con un acto al aire libre televisado en Mendoza, que corona a una reina elegida entre los departamentos vitivinícolas de la provincia, en una tradición que corre desde 1936.|La Fiesta Nacional de la Vendimia clôt la récolte du raisin par un spectacle télévisé en plein air à Mendoza, couronnant une reine choisie parmi les départements viticoles de la province, une tradition qui remonte à 1936.|フィエスタ・ナシオナル・デ・ラ・ベンディミアは、メンドーサでテレビ中継される野外の祝祭でぶどうの収穫を締めくくり、1936年から続く伝統のもと、州内のワイン産地から選ばれた女王を戴冠する。",
    ),
    f: t(
      "Before the pageant, growers across Mendoza and San Juan hold smaller harvest blessings of their own, a religious note that predates the twentieth-century festival built around it.|Antes del acto central, los productores de Mendoza y San Juan celebran bendiciones de cosecha propias y más pequeñas, una nota religiosa anterior a la fiesta del siglo XX construida en torno a ella.|Avant le spectacle central, les producteurs de Mendoza et San Juan célèbrent leurs propres bénédictions de récolte, plus modestes, une note religieuse antérieure à la fête du XXe siècle bâtie autour d'elle.|中心となる祝祭の前には、メンドーサやサンフアン各地の生産者たちがそれぞれ小規模な収穫の祝福を行っており、これは20世紀に作られたこの祭りより古くからある宗教的な習わしである。",
    ),
  },
];
