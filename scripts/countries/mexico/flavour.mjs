/**
 * メキシコの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 国単位の盤面なので、韓国・日本・フランス・インドと同じく「地方まるごとの
 * 好不況」で差をつける(実際の効果は `src/infrastructure/content/
 * season-and-doom-rules.ts` 側にteam-leadが実装する)。
 *
 * 厄災の神は**チャネケ**(ナワトル系民話に伝わる、森や水辺を守る
 * いたずら好きの小さな精霈)にした。トッケビ(韓国)・だいだらぼう(茨城)と
 * 同じく「残酷な悪霊ではなく、度の過ぎたいたずら者」として描いている。
 * 「足が後ろ向き」という実際の民話の特徴を軸に、トッケビの脚相撲と対になる
 * 仕掛け(逆さの足跡を読めるかどうか)を作った。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const MEXICO_META = {
  id: "mexico",
  name: t("Mexico|México|Mexique|メキシコ"),
  blurb: t(
    "A plateau between two mountain ranges, carrying pyramids older than the empire that named them and a railway that now runs almost only freight|Un altiplano entre dos sierras, con pirámides más antiguas que el imperio que las nombró y un ferrocarril que hoy casi solo lleva carga|Un haut plateau entre deux sierras, portant des pyramides plus anciennes que l'empire qui les nomma et un chemin de fer qui ne transporte presque plus que du fret|二つの山脈に挟まれた高原に、それを名付けた帝国より古いピラミッドと、いまはほとんど貨物しか運ばない鉄道を抱く国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランスと同じ理由。ここは他国と同じ暫定値100のまま)。
  cur: { pre: "MX$", post: "", mul: 100 },
  start: "teotihuacan",
  cpuNames: ["Jaguar", "Coyote", "Quetzal", "Ajolote"],
  // 国旗の緑・赤、コパルや紙の生成りの白、マヤ/アステカの翡翠の青緑、金/トウモロコシの黄。
  stripe: ["#006847", "#ce1126", "#f5f0e1", "#1a8fa3", "#c9a227"],
};

/** 実際の地理にならった7区分。 */
export const MEXICO_REGIONS = {
  norte: t("The North, deserts and the US border|El Norte, desiertos y la frontera con EE. UU.|Le Nord, déserts et frontière américaine|北部、砂漠と米国境"),
  bajio: t("The Bajío, colonial silver country|El Bajío, tierra de plata colonial|Le Bajío, pays de l'argent colonial|バヒオ、植民地期の銀の国"),
  occidente: t("The West, Jalisco and Michoacán|El Occidente, Jalisco y Michoacán|L'Ouest, Jalisco et Michoacán|西部、ハリスコとミチョアカン"),
  centro: t("The Center, the high valley basins|El Centro, las cuencas del altiplano|Le Centre, les bassins du haut plateau|中央部、高原の盆地"),
  golfo: t("The Gulf Coast, Veracruz and Tamaulipas|El Golfo, Veracruz y Tamaulipas|Le Golfe, Veracruz et Tamaulipas|湾岸部、ベラクルスとタマウリパス"),
  sur: t("The South, Oaxaca and Chiapas|El Sur, Oaxaca y Chiapas|Le Sud, Oaxaca et Chiapas|南部、オアハカとチアパス"),
  yucatan: t("The Yucatán Peninsula|La Península de Yucatán|La péninsule du Yucatán|ユカタン半島"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。既存の鍵
 * `globo/brujula/chepe/trenmaya/copal/silbato/acordeon/centenario/chapulin`
 * はどの盤面とも衝突しないことを確認済み)。
 */
export const MEXICO_ITEMS = {
  globo: {
    e: "🎈",
    price: 260,
    kind: "move",
    n: t("A Ride in a Hot-Air Balloon|Un paseo en globo aerostático|Une balade en montgolfière|熱気球での飛行"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Balloons have floated over Teotihuacan's pyramids at dawn since the 1980s, timed to launch in the brief window each morning before the wind picks up enough to make landings unpredictable. Pilots steer only by climbing or descending into a different wind layer, never sideways, so the landing spot is always something of a guess.|Los globos flotan sobre las pirámides de Teotihuacán al amanecer desde los años ochenta, programados para despegar en la breve ventana matutina antes de que el viento se vuelva lo bastante fuerte como para hacer impredecibles los aterrizajes. Los pilotos solo dirigen subiendo o bajando a otra capa de viento, nunca de lado, así que el punto de aterrizaje siempre es, en cierto modo, una apuesta.|Des montgolfières survolent les pyramides de Teotihuacan à l'aube depuis les années 1980, programmées pour décoller dans la brève fenêtre matinale avant que le vent ne devienne assez fort pour rendre les atterrissages imprévisibles. Les pilotes ne dirigent qu'en montant ou descendant vers une autre couche de vent, jamais latéralement, si bien que le point d'atterrissage reste toujours un peu un pari.|1980年代から、テオティワカンのピラミッドの上空を夜明けの熱気球が飛んでいる。風が強まって着陸が読めなくなる前の、朝のわずかな時間帯に合わせて飛び立つ。操縦士は上昇・下降で別の風の層に移ることでしか進路を変えられず、横には動かせない。だから着陸地点はいつも、ある程度は賭けになる。",
    ),
  },
  brujula: {
    e: "🧭",
    price: 300,
    kind: "pre",
    n: t("A Surveyor's Compass|Una brújula de agrimensor|Une boussole d'arpenteur|測量士の羅針盤"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Colonial-era land surveys across New Spain relied on a compass and a measured length of rope, called a cordel, to lay out property lines and mining claims with enough precision that some of those same boundaries are still cited in land disputes today. A good surveyor was trusted to walk a straight line across rough country and come out exactly where the map said he would.|Los levantamientos de tierras de la época colonial en Nueva España se apoyaban en una brújula y una cuerda de medida llamada cordel para trazar linderos de propiedades y concesiones mineras con precisión suficiente para que algunos de esos mismos límites aún se citen hoy en disputas de tierras. A un buen agrimensor se le confiaba caminar en línea recta por terreno accidentado y salir exactamente donde el mapa decía.|Les levés de terres de l'époque coloniale en Nouvelle-Espagne s'appuyaient sur une boussole et une corde de mesure appelée cordel pour tracer limites de propriétés et concessions minières avec une précision telle que certaines de ces mêmes limites sont encore citées aujourd'hui dans des litiges fonciers. On faisait confiance à un bon arpenteur pour marcher en ligne droite à travers un terrain accidenté et ressortir exactement là où la carte l'annonçait.|ヌエバ・エスパーニャ植民地時代の土地測量は、羅針盤と「コルデル」と呼ばれる計測用の縄に頼っていた。土地の境界や鉱区をあまりに正確に定めたため、その同じ境界線がいまも土地紛争で引き合いに出されることがある。腕のいい測量士は、荒れた土地をまっすぐ歩いて、地図が示すとおりの地点にぴたりと出られると信頼されていた。",
    ),
  },
  chepe: {
    e: "🚞",
    price: 360,
    kind: "pre",
    n: t("El Chepe Scenic Ticket|Billete panorámico de El Chepe|Billet panoramique d'El Chepe|エル・チェペ展望列車の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The Chihuahua–Pacific line, better known as El Chepe, is one of the last full-length passenger trains still running regularly in a country where almost all other lines carry freight only, crossing the Sierra Tarahumara on 37 bridges and through 86 tunnels. Most days it is booked out weeks ahead by travelers who have nowhere else left to buy a long-distance train ticket in Mexico.|La línea Chihuahua-Pacífico, más conocida como El Chepe, es uno de los últimos trenes de pasajeros de recorrido completo que aún circula con regularidad en un país donde casi todas las demás líneas son solo de carga, cruzando la Sierra Tarahumara por 37 puentes y 86 túneles. La mayoría de los días se agota con semanas de antelación entre viajeros que ya no tienen otro lugar en México donde comprar un billete de tren de largo recorrido.|La ligne Chihuahua-Pacifique, plus connue sous le nom d'El Chepe, est l'un des derniers trains de voyageurs à parcours complet encore en service régulier dans un pays où presque toutes les autres lignes ne transportent que du fret, traversant la Sierra Tarahumara sur 37 ponts et par 86 tunnels. La plupart des jours, il affiche complet des semaines à l'avance auprès de voyageurs qui n'ont plus nulle part ailleurs au Mexique où acheter un billet de train longue distance.|チワワ太平洋鉄道、通称エル・チェペは、ほとんど全ての路線が貨物専用になったこの国で、いまも定期的に走る数少ない全区間旅客列車の一つで、シエラ・タラウマラを37の橋と86のトンネルで越える。たいていの日は何週間も前から満席になる。もはやメキシコ国内に、長距離列車の切符を買える場所がほとんど残っていないからである。",
    ),
  },
  trenmaya: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Tren Maya Express Ticket|Billete exprés del Tren Maya|Billet express du Tren Maya|トレン・マヤ急行の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Opened in stages from 2023, the Tren Maya is the newest full passenger line built in Mexico in decades, running the length of the Yucatán Peninsula on track built partly through limestone cave systems that cave divers and environmental groups fought in court to protect. Supporters call it the biggest infrastructure project the south has seen in a century; critics call it a tourism project dressed up as regional development.|Inaugurado por etapas desde 2023, el Tren Maya es la línea de pasajeros de recorrido completo más nueva construida en México en décadas, y recorre toda la península de Yucatán sobre una vía tendida en parte a través de sistemas de cuevas calizas que buzos espeleólogos y grupos ambientalistas defendieron en los tribunales. Sus defensores lo llaman el mayor proyecto de infraestructura que ha visto el sur en un siglo; sus críticos, un proyecto turístico disfrazado de desarrollo regional.|Ouvert par étapes depuis 2023, le Tren Maya est la plus récente ligne de voyageurs à parcours complet construite au Mexique depuis des décennies, parcourant toute la péninsule du Yucatán sur une voie tracée en partie à travers des réseaux de grottes calcaires que plongeurs spéléologues et associations environnementales ont défendus devant les tribunaux. Ses partisans y voient le plus grand chantier d'infrastructure que le sud ait connu depuis un siècle ; ses détracteurs, un projet touristique déguisé en développement régional.|2023年から段階的に開業したトレン・マヤは、この数十年でメキシコに建設された最新の全区間旅客鉄道で、ユカタン半島を縦断する。その線路の一部は、洞窟ダイバーや環境保護団体が法廷で守ろうとした石灰岩の洞窟網を貫いている。支持者はこれをこの一世紀で南部が目にした最大のインフラ事業と呼び、批判者は地域開発を装った観光事業と呼ぶ。",
    ),
  },
  copal: {
    e: "🪔",
    price: 360,
    kind: "passive",
    n: t("A Bundle of Copal Incense|Un manojo de incienso de copal|Un bouquet d'encens de copal|コパル香の束"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Copal resin, tapped from trees native to Mexico and burned as incense since long before Europeans arrived, is still lit at markets, doorways and shrines today to clear a space of bad air, a practice that predates and outlasted the empire that once tried to stamp it out as idolatry. Vendors sell it in hardened amber-colored chunks that release smoke the moment they touch a coal.|La resina de copal, extraída de árboles nativos de México y quemada como incienso desde mucho antes de que llegaran los europeos, aún se enciende hoy en mercados, portales y altares para limpiar un espacio de mal aire, una práctica anterior y más duradera que el imperio que en su día intentó erradicarla por idolatría. Los vendedores la venden en trozos endurecidos de color ámbar que sueltan humo en cuanto tocan un carbón.|La résine de copal, extraite d'arbres natifs du Mexique et brûlée comme encens bien avant l'arrivée des Européens, s'allume encore aujourd'hui sur les marchés, aux portes et aux autels pour purifier un lieu du mauvais air, une pratique antérieure et plus durable que l'empire qui tenta jadis de l'éradiquer comme idolâtrie. Les vendeurs la proposent en morceaux durcis couleur ambre qui fument dès qu'ils touchent une braise.|メキシコ原産の木から採れるコパル樹脂は、ヨーロッパ人が到来するはるか前から香として焚かれてきた。市場や戸口、祭壇ではいまも空間を「悪い空気」から清めるために焚かれており、この習わしはかつてこれを偶像崇拝として根絶やしにしようとした帝国よりも古く、そしてそれより長く生き延びた。売り手は琥珀色に固まった塊で売り、炭に触れた瞬間に煙を上げる。",
    ),
  },
  silbato: {
    e: "💀",
    price: 440,
    kind: "pre",
    n: t("An Aztec Death Whistle|Un silbato de la muerte azteca|Un sifflet de la mort aztèque|アステカの死の笛"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Skull-shaped clay whistles found in Aztec burials produce a shriek that modern acousticians describe as unsettlingly close to a human scream, and archaeologists still debate whether they were sounded in battle to unnerve enemies, in ritual to represent the wind of the god of death, or both. Reproductions sold today still startle people who have never heard one blown before.|Los silbatos de barro con forma de calavera hallados en entierros aztecas producen un chillido que los acústicos modernos describen como inquietantemente parecido a un grito humano, y los arqueólogos aún debaten si sonaban en batalla para desconcertar al enemigo, en rituales para representar el viento del dios de la muerte, o ambas cosas. Las reproducciones que se venden hoy siguen sobresaltando a quien nunca ha oído una.|Les sifflets d'argile en forme de crâne trouvés dans des sépultures aztèques produisent un cri que les acousticiens modernes décrivent comme troublant de ressemblance avec un hurlement humain, et les archéologues débattent encore de savoir s'ils sonnaient au combat pour déstabiliser l'ennemi, en rituel pour représenter le vent du dieu de la mort, ou les deux. Les reproductions vendues aujourd'hui font encore sursauter ceux qui n'en ont jamais entendu.|アステカの埋葬から見つかる頭蓋骨の形をした土笛は、現代の音響学者が「不気味なほど人間の悲鳴に近い」と評する音を出す。考古学者は、これが敵を怯ませるための戦場の道具だったのか、死の神の風を表す儀式の道具だったのか、あるいはその両方だったのか、いまも議論を続けている。今日売られる復元品も、初めて吹く音を聞いた人をたいてい驚かせる。",
    ),
  },
  acordeon: {
    e: "📝",
    price: 130,
    kind: "passive",
    n: t("The Folded Exam Cheat Sheet|El acordeón de examen|L'antisèche pliée en accordéon|試験用の「アコルデオン」"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Mexican students call a folded strip of crib notes an acordeón, for the way it concertinas open and shut like the instrument, small enough to palm and unfold one pleat at a time under a desk. Teachers who confiscate one rarely bother reading it, since writing it out by hand is already most of the studying.|Los estudiantes mexicanos llaman acordeón a una tira de apuntes doblada, por cómo se abre y cierra en pliegues como el instrumento, lo bastante pequeña para esconderla en la palma y desdoblarla un pliegue a la vez bajo el pupitre. Los profesores que confiscan uno rara vez se molestan en leerlo, porque escribirlo a mano ya es casi todo el estudio.|Les élèves mexicains appellent acordeón une bande de notes pliée, à la façon dont elle s'ouvre et se referme en plis comme l'instrument, assez petite pour se cacher dans la paume et se déplier un pli à la fois sous le bureau. Les professeurs qui en confisquent une prennent rarement la peine de la lire, car l'écrire à la main constitue déjà l'essentiel de la révision.|メキシコの学生は、折り畳んだカンニングペーパーの帯を、楽器のアコーディオンのように開いたり閉じたりすることから「アコルデオン」と呼ぶ。手のひらに隠せるほど小さく、机の下で一折りずつ広げて使う。没収した教師がわざわざ読むことはめったにない。手で書き写すこと自体が、すでに勉強の大半だからである。",
    ),
  },
  centenario: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Gold Centenario Coin|Una moneda de oro Centenario|Une pièce d'or Centenario|金貨センテナリオ"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "First minted in 1921 to mark a century since independence, the Centenario shows the Angel of Independence on one face and the national eagle devouring a serpent on the other, and continues to be struck today as a bullion coin bought mostly for its gold content rather than spent as currency. Its weight, just under 37.5 grams of pure gold, has stayed fixed since the original run.|Acuñada por primera vez en 1921 para marcar un siglo de independencia, la moneda Centenario muestra el Ángel de la Independencia en una cara y el águila nacional devorando una serpiente en la otra, y sigue acuñándose hoy como moneda de inversión, comprada sobre todo por su contenido de oro y no para gastarse como divisa. Su peso, algo menos de 37,5 gramos de oro puro, se ha mantenido fijo desde la primera emisión.|Frappée pour la première fois en 1921 pour marquer un siècle d'indépendance, la pièce Centenario montre l'Ange de l'Indépendance sur une face et l'aigle national dévorant un serpent sur l'autre, et continue d'être frappée aujourd'hui comme pièce d'investissement, achetée surtout pour sa teneur en or plutôt que dépensée comme monnaie. Son poids, un peu moins de 37,5 grammes d'or pur, est resté fixe depuis la première émission.|1921年、独立から百年を記念して初めて鋳造されたセンテナリオ金貨は、片面に独立記念の天使像、もう片面に蛇を食らう国章の鷲を刻む。いまも地金型金貨として鋳造され続けているが、通貨として使うより、その金の含有量目当てに買われることがほとんどである。純金約37.5gという重さは、最初の鋳造以来変わっていない。",
    ),
  },
  chapulin: {
    e: "🦗",
    price: 420,
    kind: "pre",
    n: t("A Basket of Toasted Chapulines|Una canasta de chapulines tostados|Un panier de chapulines grillés|炒りチャプリネスの籠"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Chapulines, grasshoppers toasted with garlic, lime and chili, have been eaten in Oaxaca since long before the conquest and are sold today by the handful in market baskets, crunchy enough that vendors judge freshness by the sound a scoop makes. The same word gave its name to a popular masked television superhero whose defining trait is leaping in wildly, before thinking, to save the day.|Los chapulines, saltamontes tostados con ajo, limón y chile, se comen en Oaxaca desde mucho antes de la conquista y hoy se venden a puñados en canastas de mercado, tan crujientes que los vendedores juzgan su frescura por el sonido que hace un cucharón. La misma palabra dio nombre a un popular superhéroe enmascarado de televisión cuyo rasgo distintivo es saltar a lo loco, sin pensar, para salvar el día.|Les chapulines, sauterelles grillées à l'ail, au citron vert et au piment, se mangent à Oaxaca bien avant la conquête et se vendent aujourd'hui par poignées dans des paniers de marché, assez croustillantes pour que les vendeurs jugent leur fraîcheur au bruit que fait une pelletée. Le même mot a donné son nom à un célèbre super-héros masqué de télévision dont le trait distinctif est de bondir tête baissée, sans réfléchir, pour sauver la situation.|ニンニクとライム、チリで炒ったバッタ「チャプリネス」は、征服よりずっと前からオアハカで食べられてきた食材で、いまも市場では籠に山盛りで売られる。すくったときの音で鮮度を判じるほどのパリパリとした食感である。同じ語は、後先考えずに闇雲に飛び出して人助けをする、覆面姿の人気テレビヒーローの名前の由来にもなった。",
    ),
  },
};

/**
 * 厄災の神。ナワトル系民話のチャネケ(森・洞窟・泉を守る、年をとらない
 * いたずら好きの小さな精霈)にした。「足が後ろ向き」という民話の特徴を軸に、
 * トッケビの脚相撲と対になる「逆さの足跡」の仕掛けにしている。
 */
export const MEXICO_SPIRIT = {
  e: "🧚",
  n: t("The Chaneque|El Chaneque|Le Chaneque|チャネケ"),
  big: t("The Chaneque's Backward Race|La carrera al revés del Chaneque|La course à l'envers du Chaneque|チャネケの逆走競争"),
  ward: "copal",
  arrive: t(
    "<b>🧚 A chaneque has taken an interest in you.</b> Nahua folklore describes these small, ageless spirits as guardians of the forests, caves and springs, easy to spot if you know to look at their feet — they point backward, so anyone who tries to track a chaneque, or follow its trail out of the woods, only ends up walking the wrong way. It now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧚 Un chaneque se ha fijado en ti.</b> El folclore náhuatl describe a estos pequeños espíritus sin edad como guardianes de bosques, cuevas y manantiales, fáciles de reconocer si sabes mirarles los pies: apuntan hacia atrás, así que quien intenta rastrear a un chaneque, o seguir su rastro para salir del bosque, solo termina caminando en la dirección equivocada. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧚 Un chaneque s'est intéressé à toi.</b> Le folklore nahua décrit ces petits esprits sans âge comme des gardiens des forêts, des grottes et des sources, faciles à repérer si l'on sait regarder leurs pieds : ils pointent vers l'arrière, si bien que quiconque tente de suivre la trace d'un chaneque, ou de suivre sa piste pour sortir des bois, ne fait que marcher dans la mauvaise direction. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧚 チャネケに目を付けられた。</b> ナワトル系の民話によれば、この年をとらない小さな精霈は森や洞窟、泉の守り手だという。見分け方は簡単で、足を見ればいい――かかとが前を向いているので、その足跡を追って森から抜け出そうとする者は、かえって逆の方向へ歩いてしまう。いま目的地から最も遠い<b>{0}</b>の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧚 <b>The chaneque</b> loses interest and hops after <b>{0}</b>, farthest from {1}.|🧚 <b>El chaneque</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|🧚 <b>Le chaneque</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|🧚 <b>チャネケ</b>は興味を失い、{1}から最も遠い<b>{0}</b>のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the chaneque and never once read its backward tracks. It grins and challenges the whole road to a footrace run entirely backward — <b>the Chaneque's Backward Race</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al chaneque sin haber leído nunca sus huellas al revés. Sonríe y reta a todo el camino a una carrera corrida enteramente hacia atrás: empieza <b>la carrera al revés del Chaneque</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le chaneque sans jamais avoir su lire ses traces à l'envers. Il sourit et défie toute la route à une course entièrement à reculons : <b>la course à l'envers du Chaneque</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b>は4ターンもチャネケと歩いていながら、一度もその逆向きの足跡を読み解けなかった。彼はにやりと笑い、道行く者すべてに完全な逆走競争を挑む。<b>チャネケの逆走競争</b>の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> because a chaneque's feet are said to point the wrong way, an experienced tracker reads a footprint trail in reverse — the way it appears to lead in is actually the way out. Nobody playing this game has learned to read the tracks backward yet.|<b>Tras la historia:</b> como se dice que los pies de un chaneque apuntan al revés, un rastreador experto lee su huella al contrario: el camino que parece llevar hacia dentro es en realidad la salida. Nadie en esta partida ha aprendido aún a leer las huellas al revés.|<b>Derrière l'histoire :</b> les pieds d'un chaneque étant censés pointer à l'envers, un pisteur expérimenté lit sa piste en sens inverse — le chemin qui semble mener à l'intérieur est en réalité la sortie. Personne dans cette partie n'a encore appris à lire les traces à l'envers.|<b>物語の背景:</b> チャネケの足は逆向きについているとされるため、熟練の追跡者はその足跡を逆に読む。入っていくように見える道が、実は出口だという。この対局では、まだ誰も足跡を逆に読む術を身につけていない。",
  ),
  pleased: t(
    "It tugs a ripe fruit down from a branch to show off its climbing, and the fruit splits open to reveal a coin instead of seeds. <b>{0}</b> gains <span class='money'>+{1}</span>.|Tira de una fruta madura desde una rama para presumir de su trepada, y la fruta se abre revelando una moneda en vez de semillas. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il tire un fruit mûr d'une branche pour montrer son agilité à grimper, et le fruit s'ouvre pour révéler une pièce au lieu de graines. <b>{0}</b> gagne <span class='money'>+{1}</span>.|木登りの腕前を見せつけようと枝から熟した実をもぎ取ると、その実は種の代わりに一枚の銭をこぼした。<b>{0}</b>は<span class='money'>+{1}</span>を得た。",
  ),
  wardBody: t(
    "A stick of copal incense is lit where it can see the smoke rise. Chaneques are said to hate the smell above all things, and it backs off, passing <b>{0}</b> without noticing this turn.|Se enciende una barra de incienso de copal donde pueda ver subir el humo. Se dice que los chaneques odian ese olor sobre todas las cosas, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On allume un bâton d'encens de copal là où il peut voir monter la fumée. On dit que les chaneques détestent cette odeur par-dessus tout, et il recule, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|煙が立ちのぼるのが見えるところでコパル香を焚いた。チャネケは何よりもこの匂いを嫌うという。彼はひるんで後ずさり、このターンは<b>{0}</b>に気づかないまま通り過ぎた。",
  ),
};

/**
 * 災難7種。ART-KEYS.mdで絵の担当と共有した7件の本文化。
 * 麻薬組織関連の題材は入れず、天災と生活の中の小さな災難に絞った。
 */
export const MEXICO_DOOM = [
  {
    id: "huracan",
    n: t("A hurricane makes landfall|Un huracán toca tierra|Un ouragan touche terre|ハリケーンが上陸する"),
    t: t(
      "The storm had a name and a tracked path for days before it reached the coast, and still it peels roofing sheets off like paper and turns palm fronds into projectiles. Fishing boats that did not make it back to a sheltered cove in time are found afterward stacked against the seawall, sometimes three deep.|La tormenta tuvo nombre y trayectoria seguida durante días antes de llegar a la costa, y aun así arranca las láminas de los techos como si fueran papel y convierte las palmas en proyectiles. Las barcas de pesca que no llegaron a tiempo a una cala resguardada aparecen después amontonadas contra el rompeolas, a veces de tres en tres.|La tempête portait un nom et une trajectoire suivie pendant des jours avant d'atteindre la côte, et pourtant elle arrache les tôles des toits comme du papier et transforme les palmes en projectiles. Les barques de pêche qui n'ont pas regagné à temps une crique abritée se retrouvent ensuite empilées contre la digue, parfois sur trois rangs.|嵐には名前が付けられ、上陸の何日も前から進路が追われていたが、それでも屋根板を紙のように剥がし、ヤシの葉を飛び道具に変えてしまう。間に合わず入り江に避難できなかった漁船は、あとになって防波堤に三重にも折り重なって打ち上げられているのが見つかる。",
    ),
    months: [4, 5, 6],
  },
  {
    id: "temblor",
    n: t("The ground shakes|Tiembla la tierra|Le sol tremble|地面が揺れる"),
    t: t(
      "The country sits along the Pacific Ring of Fire, where the Cocos Plate slides beneath the North American Plate, and a shelf of dishes rattling is common enough that most people barely look up from what they are doing. A stronger jolt still empties the room in seconds, everyone counting silently until the swaying stops before anyone speaks.|El país se asienta sobre el Cinturón de Fuego del Pacífico, donde la placa de Cocos se desliza bajo la placa norteamericana, y que tiemble un estante de platos es bastante común como para que la mayoría apenas levante la vista de lo que está haciendo. Una sacudida más fuerte igual vacía la habitación en segundos, todos contando en silencio hasta que el balanceo cesa antes de que alguien hable.|Le pays se trouve sur la ceinture de feu du Pacifique, où la plaque de Cocos glisse sous la plaque nord-américaine, et une étagère de vaisselle qui tremble est assez courante pour que la plupart des gens lèvent à peine les yeux de ce qu'ils font. Une secousse plus forte vide tout de même la pièce en quelques secondes, chacun comptant en silence jusqu'à ce que le balancement cesse avant que personne ne parle.|この国は環太平洋火山帯に位置し、ココスプレートが北アメリカプレートの下に沈み込んでいる。食器棚がカタカタと鳴る程度の揺れはありふれていて、たいていの人は手元の作業から顔を上げもしない。もっと強い一撃が来れば、それでも数秒で部屋は空になり、誰もが揺れが収まるまで無言で数を数える。",
    ),
  },
  {
    id: "ceniza",
    n: t("Volcanic ash falls|Cae ceniza volcánica|La cendre volcanique tombe|火山灰が降る"),
    t: t(
      "A plume rises from one of the volcanoes on the horizon and drifts wherever the upper winds carry it, dusting parked cars and drying laundry with a fine grey grit that gets into everything left uncovered. Airport authorities watch the same plume closely, since even a thin haze of ash is enough to ground flights until it clears.|Una columna se eleva de uno de los volcanes del horizonte y deriva adonde la lleven los vientos de altura, cubriendo de un polvo gris fino los autos aparcados y la ropa tendida, colándose en todo lo que quede destapado. Las autoridades del aeropuerto vigilan de cerca la misma columna, pues incluso una neblina fina de ceniza basta para dejar en tierra los vuelos hasta que se disipa.|Un panache s'élève de l'un des volcans à l'horizon et dérive au gré des vents d'altitude, couvrant d'une fine poussière grise les voitures garées et le linge qui sèche, s'infiltrant dans tout ce qui n'était pas couvert. Les autorités aéroportuaires surveillent le même panache de près, car même une fine brume de cendre suffit à clouer les vols au sol jusqu'à sa dissipation.|地平線に見える火山の一つから噴煙が立ちのぼり、上空の風に流されるまま漂う。停めてある車や干した洗濯物に細かい灰色の粉が積もり、覆っていないものすべてに入り込む。空港当局は同じ噴煙を注視しており、わずかな灰の靄でも晴れるまで便を欠航させるのに十分だからである。",
    ),
  },
  {
    id: "contingencia",
    n: t("A pollution alert takes cars off the road|Una alerta ambiental saca autos de la calle|Une alerte de pollution retire des voitures de la route|大気汚染警報で車が締め出される"),
    t: t(
      "Cold air trapped beneath warmer air overhead seals a lid over the valley some winter mornings, and once the smog reading crosses a set threshold, cars are barred from the road on a rotating schedule tied to the last digit of their license plate. Buses and the metro fill past capacity on those mornings, and joggers who usually keep an early routine skip it until the air clears.|El aire frío atrapado bajo aire más cálido en altura sella una tapa sobre el valle algunas mañanas de invierno, y en cuanto la lectura de esmog cruza un umbral fijado, se prohíbe circular a los autos según un calendario rotativo ligado al último dígito de la placa. Los autobuses y el metro se llenan más allá de su capacidad esas mañanas, y quienes suelen salir a correr temprano se saltan la rutina hasta que el aire se despeja.|L'air froid piégé sous un air plus chaud en altitude referme un couvercle sur la vallée certains matins d'hiver, et dès que le taux de smog franchit un seuil fixé, les voitures sont interdites de circulation selon un roulement lié au dernier chiffre de leur plaque. Bus et métro se remplissent au-delà de leur capacité ces matins-là, et les joggeurs qui gardent d'habitude une routine matinale la sautent jusqu'à ce que l'air se dégage.|冬のある朝、上空の暖かい空気の下に冷たい空気が閉じ込められて盆地に蓋をし、スモッグの数値が定めた基準を超えると、ナンバープレート末尾の数字に応じた輪番で自動車の通行が禁じられる。そんな朝はバスと地下鉄が定員を超えて混み合い、いつも早朝に走る人たちも空気が晴れるまで日課を休む。",
    ),
    months: [8, 9],
  },
  {
    id: "chaneque",
    n: t("Led astray by a chaneque|Un chaneque te hace perder el camino|Un chaneque t'égare|チャネケに化かされる"),
    t: t(
      "The path back looked exactly the same at every turn, and only well past the point of being lost does it become clear that the same fallen log was passed three times. Old tales blame a chaneque for the trick, a small guardian spirit whose feet point backward, so anyone who tries to follow its footprints out of the woods only walks deeper in.|El camino de vuelta parecía idéntico en cada recodo, y solo mucho después de perderse queda claro que se pasó tres veces por el mismo tronco caído. Los viejos cuentos culpan de esta treta a un chaneque, un pequeño espíritu guardián con los pies al revés, así que quien intenta seguir sus huellas para salir del bosque solo se adentra más en él.|Le chemin du retour semblait identique à chaque tournant, et ce n'est que bien après s'être perdu qu'on comprend être passé trois fois devant le même tronc abattu. Les vieux contes en accusent un chaneque, petit esprit gardien aux pieds tournés à l'envers, si bien que quiconque tente de suivre ses empreintes pour sortir du bois ne fait que s'y enfoncer davantage.|帰り道はどの曲がり角でも同じに見え、道に迷ってからずいぶん経ってようやく、同じ倒木のそばを三度通ったことに気づいた。昔話はこの仕掛けをチャネケのしわざだとする。足が後ろ向きについた小さな守り神で、その足跡をたどって森を抜けようとする者は、かえって奥へ迷い込んでしまうという。",
    ),
  },
  {
    id: "ratero",
    n: t("A pickpocket works the tianguis|Un carterista trabaja el tianguis|Un pickpocket sévit au tianguis|ティアンギスですりに遭う"),
    t: t(
      "A shoulder bump between two crowded stalls barely registered as anything at all, and only at the next stall does the missing weight in a pocket become obvious. The open-air market is loud and packed enough on its one day a week that nobody nearby noticed a thing.|Un roce de hombro entre dos puestos abarrotados apenas se notó como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. El mercado al aire libre está tan bullicioso y lleno en su único día de la semana que nadie cerca notó nada.|Un coup d'épaule entre deux étals bondés est à peine passé pour quelque chose, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Le marché en plein air est si bruyant et si dense en son unique jour de la semaine que personne aux alentours n'a rien remarqué.|混み合う露店のあいだで肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。週に一度しか立たないこの青空市は、その日だけざわめきと人混みでいっぱいになり、近くの誰も何にも気づかなかった。",
    ),
  },
  {
    id: "padrino",
    n: t("Named padrino for the quinceañera|Nombrado padrino de la quinceañera|Nommé padrino de la quinceañera|キンセアニェーラの代父に指名される"),
    t: t(
      "A relative corners the guest of honor early in the party and asks, more announcement than question, whether they will be padrino of the cake, or the music, or the dress, one of a dozen sponsorships that split a fifteenth-birthday celebration's cost across the whole extended family. Saying yes on the spot is the only real option once the whole table is already listening.|Un pariente arrincona al invitado de honor al comienzo de la fiesta y le pregunta, más como anuncio que como pregunta, si será padrino del pastel, de la música o del vestido, uno de una docena de padrinazgos que reparten el costo de una fiesta de quince años entre toda la familia extendida. Decir que sí en el momento es la única opción real una vez que toda la mesa ya está escuchando.|Un parent coince l'invité d'honneur au début de la fête et lui demande, plus en annonce qu'en question, s'il sera padrino du gâteau, de la musique ou de la robe, l'un d'une douzaine de parrainages qui répartissent le coût d'une fête de quinze ans sur toute la famille élargie. Dire oui sur-le-champ est la seule vraie option une fois que toute la tablée écoute déjà.|パーティーが始まってすぐ、親戚の一人が主賓を捕まえて、ケーキか音楽かドレスの「パドリーノ」になってくれないかと、質問というより宣言のように持ちかけてくる。十五歳の誕生祝いの費用を親族全体で分担する十数の役目の一つである。すでに食卓じゅうが聞き耳を立てている以上、その場で引き受ける以外の選択肢は実質無い。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月(`season-and-doom-rules.ts` の月インデックスと
 * 揃える。0=4月)。国単位の盤面なので、地方まるごとの好不況で差をつける
 * (効果の数値はteam-leadが `season-and-doom-rules.ts` の mexico の項に実装)。
 */
export const MEXICO_SEASONS = [
  {
    e: "🎪",
    n: t("The Feria de San Marcos opens|Abre la Feria de San Marcos|La Feria de San Marcos ouvre ses portes|サン・マルコス祭が始まる"),
    t: t(
      "One of the country's largest annual fairs fills a park in Aguascalientes for nearly a month with cockfights, agricultural pavilions, bullfights and a nightly concert lineup, drawing visitors who outnumber the city's own population several times over during its run. Hotel rooms across the state book out weeks ahead, and the railworkers' neighborhoods nearby empty into the fairgrounds most evenings.|Una de las mayores ferias anuales del país llena un parque de Aguascalientes durante casi un mes con peleas de gallos, pabellones agrícolas, corridas de toros y conciertos cada noche, atrayendo a visitantes que superan varias veces a la población de la ciudad durante su celebración. Las habitaciones de hotel en todo el estado se agotan con semanas de antelación, y los barrios ferroviarios cercanos se vacían hacia el recinto ferial casi todas las noches.|L'une des plus grandes foires annuelles du pays remplit un parc d'Aguascalientes pendant près d'un mois de combats de coqs, de pavillons agricoles, de corridas et de concerts chaque soir, attirant des visiteurs plusieurs fois plus nombreux que la population de la ville durant sa tenue. Les chambres d'hôtel de tout l'État sont réservées des semaines à l'avance, et les quartiers cheminots voisins se vident vers le champ de foire presque tous les soirs.|国内でも指折りの規模を誇るこの年次祭りは、アグアスカリエンテスの公園を闘鶏や農業パビリオン、闘牛、毎晩のコンサートで約一か月間埋め尽くし、開催中は市の人口の何倍もの来場者を集める。州じゅうのホテルの部屋は何週間も前に埋まり、近くの鉄道労働者街もほとんど毎晩、会場へと人が流れ出す。",
    ),
    f: t(
      "The fair began in the 1600s as a religious feast day trade fair and only later added its now-famous entertainment lineup, so its patron saint's mass still opens the calendar each year before the concerts take over.|La feria comenzó en el siglo XVII como una feria comercial ligada a una fiesta religiosa, y solo después sumó la cartelera de espectáculos por la que hoy es célebre, así que la misa de su santo patrono aún abre el calendario cada año antes de que lleguen los conciertos.|La foire commença au XVIIe siècle comme une foire commerciale liée à une fête religieuse, et n'ajouta que plus tard la programmation de spectacles pour laquelle elle est aujourd'hui célèbre, si bien que la messe de son saint patron ouvre encore le calendrier chaque année avant l'arrivée des concerts.|この祭りは17世紀、宗教的な祝日に合わせた市として始まり、いまや有名な娯楽の数々はあとから加わったものである。そのため守護聖人のミサはいまも毎年、コンサートに先立って暦の幕を開ける。",
    ),
  },
  {
    e: "🎺",
    n: t("Cinco de Mayo, bigger abroad than at home|Cinco de Mayo, más grande fuera que en casa|Cinco de Mayo, plus fêté à l'étranger que chez soi|海外の方が盛大な五月五日"),
    t: t(
      "The anniversary of the 1862 battle is a modest regional holiday here, marked mainly around Puebla where the fighting happened, while across the border it has grown into one of the largest Mexican-heritage celebrations of the year, complete with parades that dwarf anything held on the actual battlefield. Most people elsewhere in the country simply go to work as usual.|El aniversario de la batalla de 1862 es aquí una fiesta regional modesta, celebrada sobre todo en torno a Puebla, donde ocurrió el combate, mientras que al otro lado de la frontera se ha convertido en una de las mayores celebraciones de herencia mexicana del año, con desfiles que empequeñecen cualquier cosa que se organice en el propio campo de batalla. En el resto del país, la mayoría simplemente va a trabajar como cualquier día.|L'anniversaire de la bataille de 1862 est ici une fête régionale modeste, célébrée surtout autour de Puebla, où eut lieu le combat, tandis que de l'autre côté de la frontière elle est devenue l'une des plus grandes célébrations du patrimoine mexicain de l'année, avec des défilés qui éclipsent tout ce qui se tient sur le champ de bataille lui-même. Ailleurs dans le pays, la plupart des gens vont simplement travailler comme un jour ordinaire.|1862年の戦いの記念日は、この国では戦場となったプエブラ周辺を中心に祝われる控えめな地方の祝日にすぎないが、国境の向こうでは一年でも指折りの規模のメキシコ系文化の祝祭に育ち、実際の戦場での催しをはるかに凌ぐパレードが繰り広げられる。国内の他の地域では、たいていの人はふだんどおり仕事に出る。",
    ),
    f: t(
      "Independence Day, the country's actual founding anniversary, falls more than four months later on September 16, a date many people abroad mistakenly attach to this holiday instead.|El Día de la Independencia, el verdadero aniversario fundacional del país, cae más de cuatro meses después, el 16 de septiembre, una fecha que mucha gente en el extranjero confunde erróneamente con esta festividad.|Le jour de l'Indépendance, véritable anniversaire fondateur du pays, tombe plus de quatre mois plus tard, le 16 septembre, une date que beaucoup de gens à l'étranger associent à tort à cette fête.|この国の本当の建国記念日である独立記念日は、4か月以上あとの9月16日にあたる。海外では多くの人がこの日をこちらの祝日と取り違えている。",
    ),
  },
  {
    e: "🌀",
    n: t("Hurricane season opens on both coasts|Se abre la temporada de huracanes en ambas costas|La saison des ouragans s'ouvre sur les deux côtes|両岸でハリケーン期が始まる"),
    t: t(
      "The Pacific season has already been running a few weeks by the time the Atlantic and Gulf season opens on the first of the month, so for a stretch of the year a storm system could in theory be brewing off either coast at once. Coastal towns run through their shutter drills and check their radios out of habit rather than alarm, since a season without at least one close call is unusual.|La temporada del Pacífico ya lleva unas semanas en marcha cuando se abre la del Atlántico y el Golfo el primero del mes, así que durante un tramo del año, en teoría, podría estar gestándose una tormenta en cualquiera de las dos costas a la vez. Los pueblos costeros repasan sus simulacros de cierre de persianas y revisan las radios más por costumbre que por alarma, pues una temporada sin al menos un susto cercano es poco común.|La saison du Pacifique bat déjà son plein depuis quelques semaines quand celle de l'Atlantique et du Golfe s'ouvre le premier du mois, si bien que pour un temps de l'année, une tempête pourrait en théorie se former sur l'une ou l'autre côte à la fois. Les villes côtières refont leurs exercices de fermeture des volets et vérifient leurs radios par habitude plutôt que par inquiétude, une saison sans au moins une alerte rapprochée étant chose rare.|太平洋側の期間はすでに数週間前から始まっており、月の初日に大西洋・メキシコ湾側の期間が始まる頃には、理屈のうえではどちらの海岸でも同時に嵐が発達しうる時期に入る。沿岸の町は不安からというよりは習慣として雨戸閉めの訓練をし、ラジオを確かめる。一つも肝を冷やす接近の無い年のほうが珍しいからである。",
    ),
    f: t(
      "Forecasters retire a storm's name permanently from the rotation list after it causes especially severe damage, so a name that vanishes from future years' lists is itself a small piece of the record.|Los meteorólogos retiran permanentemente el nombre de una tormenta de la lista de rotación tras causar daños especialmente graves, así que un nombre que desaparece de las listas de años futuros es en sí mismo un pequeño registro histórico.|Les météorologues retirent définitivement le nom d'une tempête de la liste de rotation après qu'elle a causé des dégâts particulièrement graves, si bien qu'un nom disparu des listes des années suivantes constitue en soi une petite trace historique.|とりわけ深刻な被害を出した嵐の名前は、以後の巡回リストから永久に外される。だから翌年以降のリストから消えた名前そのものが、小さな記録として残ることになる。",
    ),
  },
  {
    e: "💃",
    n: t("The Guelaguetza brings the regions to one hillside|La Guelaguetza reúne a las regiones en una ladera|La Guelaguetza rassemble les régions sur une même colline|グエラゲッツァが各地方を丘に集める"),
    t: t(
      "Delegations from Oaxaca's many regions climb a hillside amphitheater on two Mondays this month to perform traditional dances in costumes specific to their own communities, a festival whose name comes from a Zapotec word for reciprocal gift-giving, since each troupe traditionally throws local produce or crafts to the crowd as it dances. Getting a seat close to the stage means arriving hours before the first dancer appears.|Delegaciones de las muchas regiones de Oaxaca suben a un anfiteatro en la ladera dos lunes de este mes para bailar danzas tradicionales con trajes propios de sus comunidades, un festival cuyo nombre viene de una palabra zapoteca para el intercambio recíproco de regalos, pues cada grupo suele lanzar productos o artesanías locales al público mientras baila. Conseguir un lugar cerca del escenario significa llegar horas antes de que aparezca el primer bailarín.|Des délégations venues des nombreuses régions d'Oaxaca gravissent un amphithéâtre à flanc de colline deux lundis de ce mois pour exécuter des danses traditionnelles dans des costumes propres à leur communauté, un festival dont le nom vient d'un mot zapotèque désignant l'échange réciproque de cadeaux, chaque troupe lançant traditionnellement des produits ou de l'artisanat locaux à la foule en dansant. Obtenir une place près de la scène suppose d'arriver des heures avant l'apparition du premier danseur.|オアハカの数多くの地方から集まった代表団は、この月の二回の月曜日、丘の上の野外劇場に登り、それぞれの共同体固有の衣装をまとって伝統舞踊を披露する。この祭りの名はサポテコ語で「互いに贈り合う」を意味する語に由来し、各団体は踊りながら地元の産物や工芸品を観客に投げるのが習わしである。舞台近くの席を取るには、最初の踊り手が現れる何時間も前から並ぶ必要がある。",
    ),
    f: t(
      "The festival's roots are older than its modern staging, tied to a pre-Hispanic ceremony honoring the corn goddess that colonial authorities later folded into a Catholic feast day without erasing it.|Las raíces del festival son más antiguas que su puesta en escena moderna, ligadas a una ceremonia prehispánica en honor a la diosa del maíz que las autoridades coloniales fusionaron después con una fiesta católica sin llegar a borrarla.|Les racines du festival sont plus anciennes que sa mise en scène moderne, liées à une cérémonie préhispanique en l'honneur de la déesse du maïs que les autorités coloniales fondirent plus tard dans une fête catholique sans l'effacer.|この祭りの起源は現代の上演形式よりずっと古く、トウモロコシの女神を祀る先スペイン期の儀式に遡る。植民地時代の当局はのちにこれをカトリックの祝日に組み込んだが、消し去ることはできなかった。",
    ),
  },
  {
    e: "🍇",
    n: t("The grape harvest comes in at Valle de Guadalupe|La vendimia llega al Valle de Guadalupe|Les vendanges arrivent dans la Valle de Guadalupe|グアダルーペ谷でブドウの収穫期"),
    t: t(
      "Pickers move through the rows before sunrise to get the grapes off the vine while the desert heat is still bearable, and wineries throw open their doors for a harvest festival that has grown alongside the valley's wine industry since the 1990s. Restaurants inland fill with visitors following a wine trail that barely existed a generation ago.|Los recolectores recorren las hileras antes del amanecer para bajar la uva de la vid mientras el calor del desierto aún es soportable, y las bodegas abren sus puertas para un festival de la vendimia que ha crecido junto con la industria vinícola del valle desde los años noventa. Los restaurantes tierra adentro se llenan de visitantes que siguen una ruta del vino que apenas existía hace una generación.|Les vendangeurs parcourent les rangs avant le lever du soleil pour cueillir le raisin tant que la chaleur du désert reste supportable, et les domaines ouvrent grand leurs portes pour un festival des vendanges qui a grandi avec l'industrie viticole de la vallée depuis les années 1990. Les restaurants à l'intérieur des terres se remplissent de visiteurs suivant une route des vins qui existait à peine il y a une génération.|摘み手は砂漠の暑さがまだ耐えられるうちにと、日の出前から畝を回ってブドウを収穫する。ワイナリーは1990年代からこの谷のワイン産業とともに育ってきた収穫祭に向けて門を開け放つ。内陸のレストランは、一世代前にはほとんど存在しなかったワイン街道をたどる客で埋まる。",
    ),
    f: t(
      "Most of the valley's vineyards sit on land that was semi-arid ranchland within living memory, and growers here still irrigate carefully, since the region gets a fraction of the rainfall of better-known wine countries.|La mayoría de los viñedos del valle se asientan en tierras que hasta hace poco eran ranchos semiáridos, y los productores de aquí aún riegan con cuidado, pues la región recibe una fracción de la lluvia de las regiones vinícolas más conocidas.|La plupart des vignobles de la vallée reposent sur des terres qui, il y a peu encore, étaient des ranchs semi-arides, et les vignerons d'ici irriguent encore avec soin, la région recevant une fraction des précipitations des régions viticoles plus connues.|この谷のブドウ園の多くは、記憶に新しいほど最近まで半乾燥の牧場地だった土地に広がっている。よく知られたワイン産地に比べて降水量がわずかなため、栽培者はいまも注意深く灌漑を行っている。",
    ),
  },
  {
    e: "🎆",
    n: t("El Grito marks independence at every town hall|El Grito marca la independencia en cada ayuntamiento|El Grito marque l'indépendance sur chaque place de mairie|どの町役場でも独立を告げる叫び"),
    t: t(
      "On the night of the 15th, mayors and the president alike step onto a balcony to ring a bell and shout a version of the cry Miguel Hidalgo is said to have given from his own church tower in 1810, and the crowd below answers each ¡Viva! before the fireworks start at midnight. Green, white and red bunting goes up on buildings nationwide days ahead, a color scheme so common in this one week that its absence would be more noticeable than its presence.|En la noche del 15, tanto los alcaldes como el presidente salen a un balcón a tocar una campana y dar una versión del grito que se dice que Miguel Hidalgo lanzó desde la torre de su propia iglesia en 1810, y la multitud de abajo responde a cada «¡Viva!» antes de que los fuegos artificiales empiecen a medianoche. Días antes ya cuelgan de los edificios banderines verdes, blancos y rojos por todo el país, una combinación tan común esa semana que su ausencia llamaría más la atención que su presencia.|Dans la nuit du 15, maires et président montent sur un balcon pour sonner une cloche et lancer une version du cri que Miguel Hidalgo aurait poussé depuis le clocher de son église en 1810, et la foule en contrebas répond à chaque « ¡Viva! » avant que les feux d'artifice n'éclatent à minuit. Des jours à l'avance, des banderoles vertes, blanches et rouges montent sur les bâtiments dans tout le pays, une combinaison si courante cette semaine-là que son absence se remarquerait plus que sa présence.|15日の夜、市長も大統領も揃ってバルコニーに出て鐘を鳴らし、1810年にミゲル・イダルゴが自らの教会の鐘楼から発したと伝えられる叫びを再現する。真夜中に花火が上がる前、下に集まった群衆はひとつひとつの「ビバ!」に応える。数日前から緑・白・赤の飾りが全国の建物に掲げられ、この一週間はその色が無いほうがかえって目を引くほど当たり前になる。",
    ),
    f: t(
      "Historians note that Hidalgo's actual words that night were never recorded verbatim, so every version rung out today, including the official one, is necessarily a reconstruction rather than a quotation.|Los historiadores señalan que las palabras exactas de Hidalgo esa noche nunca se registraron, así que toda versión que se proclama hoy, incluida la oficial, es necesariamente una reconstrucción y no una cita textual.|Les historiens notent que les paroles exactes prononcées par Hidalgo cette nuit-là n'ont jamais été consignées, si bien que toute version proclamée aujourd'hui, y compris la version officielle, est nécessairement une reconstruction plutôt qu'une citation.|歴史家によれば、その夜のイダルゴの実際の言葉は一語一句として記録に残っていない。今日唱えられるどの版も、公式のものを含めて、引用ではなく再構成にすぎない。",
    ),
  },
  {
    e: "🦋",
    n: t("The first monarchs reach the oyamel forests|Las primeras monarcas llegan a los bosques de oyamel|Les premiers monarques atteignent les forêts d'oyamel|オヤメルの森に最初のオオカバマダラが到着"),
    t: t(
      "Scouts of the monarch migration start showing up in the mountain forests toward the end of this month, weeks ahead of the millions that will follow through November, and local guides begin walking the trails daily to judge when the colonies are dense enough to open for visitors. Farmers nearby still time some planting by the butterflies' return, a folk calendar older than the scientific tracking of the migration itself.|Los exploradores de la migración monarca empiezan a aparecer en los bosques de montaña hacia fines de este mes, semanas antes de los millones que llegarán durante noviembre, y los guías locales comienzan a recorrer los senderos a diario para juzgar cuándo las colonias son lo bastante densas para abrir a los visitantes. Los agricultores cercanos aún ajustan alguna siembra al regreso de las mariposas, un calendario popular más antiguo que el seguimiento científico de la migración.|Les éclaireurs de la migration monarque commencent à apparaître dans les forêts de montagne vers la fin de ce mois, des semaines avant les millions qui suivront en novembre, et les guides locaux se mettent à parcourir les sentiers chaque jour pour juger du moment où les colonies sont assez denses pour ouvrir aux visiteurs. Les agriculteurs des environs calent encore certains semis sur le retour des papillons, un calendrier populaire plus ancien que le suivi scientifique de la migration.|オオカバマダラの大移動の先発隊は、この月の終わり頃から山の森に姿を見せ始める。11月にかけて続く何百万匹の本隊より何週間も早い到着である。地元の案内人は毎日小径を歩いて、群れが訪問客を迎えられるほど密になったかを見極める。近隣の農家はいまも蝶の帰還に合わせて種まきの時期を決めることがあり、これは移動の科学的な追跡よりも古い、暦にまつわる言い伝えである。",
    ),
    f: t(
      "Only the generation born in late summer makes the full migration south, living up to eight times longer than the generations that came before it that same year, long enough to fly thousands of kilometers and overwinter before finally breeding.|Solo la generación nacida a finales del verano hace la migración completa hacia el sur, viviendo hasta ocho veces más que las generaciones que la precedieron ese mismo año, el tiempo suficiente para volar miles de kilómetros e invernar antes de reproducirse por fin.|Seule la génération née à la fin de l'été effectue la migration complète vers le sud, vivant jusqu'à huit fois plus longtemps que les générations qui l'ont précédée cette même année, assez longtemps pour voler des milliers de kilomètres et hiverner avant de finalement se reproduire.|夏の終わりに生まれた世代だけが南への大移動を完遂し、同じ年の先行世代の最大8倍も長く生きる。それは何千kmも飛び、冬を越して、ようやく繁殖するのに十分な長さである。",
    ),
  },
  {
    e: "💀",
    n: t("Día de Muertos, a homecoming rather than a haunting|El Día de Muertos, un regreso a casa y no un espanto|Le Día de Muertos, un retour au foyer plutôt qu'une hantise|幽霊譚ではなく帰郷としての死者の日"),
    t: t(
      "Families spend the first two days of the month building altars layered with marigolds, candles, sugar skulls and a photograph of each relative being welcomed back, along with whichever food or drink that person liked best in life. Cemeteries fill with entire extended families cleaning headstones and setting out picnics beside them, treating the visit as an ordinary, even cheerful, family gathering rather than a solemn one.|Las familias pasan los dos primeros días del mes construyendo altares con capas de cempasúchil, velas, calaveras de azúcar y una foto de cada pariente al que reciben de vuelta, junto con la comida o bebida que esa persona prefería en vida. Los cementerios se llenan de familias enteras limpiando lápidas y poniendo meriendas junto a ellas, tratando la visita como una reunión familiar ordinaria, incluso alegre, y no solemne.|Les familles passent les deux premiers jours du mois à bâtir des autels en couches de cempasúchil, de bougies, de crânes en sucre et d'une photo de chaque proche qu'on accueille à nouveau, avec le plat ou la boisson qu'il préférait de son vivant. Les cimetières se remplissent de familles entières nettoyant les pierres tombales et y installant des pique-niques, traitant la visite comme une réunion de famille ordinaire, voire joyeuse, plutôt que solennelle.|家族はこの月の最初の二日間をかけて、マリーゴールドと蝋燭、砂糖髑髏、そして迎え入れる親族一人ひとりの写真を重ねた祭壇を作り、その人が生前いちばん好きだった食べ物や飲み物も供える。墓地には親族一同が集まって墓石を掃除し、そのそばでピクニックを広げる。この訪れを厳粛な行事ではなく、ふつうの、むしろ陽気な家族の集まりとして扱う。",
    ),
    f: t(
      "UNESCO added the tradition to its intangible cultural heritage list in 2008, citing the blending of Indigenous beliefs about death as a continuation of life with the Catholic feast days it was later mapped onto.|La UNESCO sumó la tradición a su lista de patrimonio cultural inmaterial en 2008, citando la fusión de creencias indígenas sobre la muerte como continuación de la vida con las fiestas católicas a las que después se hizo coincidir.|L'UNESCO a inscrit la tradition à son patrimoine culturel immatériel en 2008, citant la fusion de croyances autochtones sur la mort comme continuation de la vie avec les fêtes catholiques auxquelles elle fut plus tard associée.|ユネスコは2008年、この伝統を無形文化遺産に登録した。死を生の続きと捉える先住民の信仰と、のちに重ね合わされたカトリックの祝日との融合が評価の理由とされた。",
    ),
  },
  {
    e: "🕯️",
    n: t("Guadalupe Day opens nine nights of posadas|El Día de Guadalupe abre nueve noches de posadas|Le jour de Guadalupe ouvre neuf nuits de posadas|グアダルペの日が九夜のポサーダを開く"),
    t: t(
      "Pilgrims converge on the basilica on the 12th to mark the reported 1531 apparition of the Virgin on a hill that was already a shrine to an Indigenous mother goddess before the conquest, some covering the final stretch on their knees. The nine nights that follow send neighborhood processions from door to door reenacting Mary and Joseph's search for lodging, turned away at each house until the last one opens with hot punch, a piñata and a candlelit nativity scene.|Los peregrinos convergen en la basílica el día 12 para conmemorar la aparición de la Virgen, reportada en 1531, en un cerro que ya era santuario de una diosa madre indígena antes de la conquista, y algunos recorren de rodillas el último tramo. Las nueve noches siguientes llevan procesiones vecinales de puerta en puerta, recreando la búsqueda de posada de María y José, rechazados en cada casa hasta que la última abre con ponche caliente, una piñata y un nacimiento iluminado con velas.|Les pèlerins convergent vers la basilique le 12 pour marquer l'apparition rapportée de la Vierge en 1531, sur une colline qui abritait déjà, avant la conquête, un sanctuaire dédié à une déesse mère autochtone, certains parcourant le dernier tronçon à genoux. Les neuf nuits suivantes envoient des processions de voisinage de porte en porte, rejouant la recherche d'un logis de Marie et Joseph, refusés à chaque maison jusqu'à ce que la dernière ouvre avec du punch chaud, une piñata et une crèche à la bougie.|巡礼者たちは12日、征服より前からすでに先住民の母なる女神の聖地だった丘で1531年に聖母が現れたと伝えられる出来事を祝い、大聖堂へ向かう。最後の道のりを膝をついて進む者もいる。続く九夜は近所を戸口から戸口へ練り歩く行列となり、宿を探すマリアとヨセフの姿を再現する。どの家でも一度は断られ、最後の一軒でようやく温かいポンチとピニャータ、蝋燭の灯る降誕の場面で迎え入れられる。",
    ),
    f: t(
      "The image on the cloak displayed at the basilica has been studied and debated by scientists and church officials alike for centuries, and its preservation without visible fading despite the material's normal lifespan remains part of what pilgrims point to as evidence of the apparition.|La imagen del manto que se exhibe en la basílica ha sido estudiada y debatida durante siglos tanto por científicos como por autoridades eclesiásticas, y su conservación sin decoloración visible pese a la vida útil normal del material sigue siendo parte de lo que los peregrinos señalan como prueba de la aparición.|L'image du manteau exposé à la basilique a été étudiée et débattue pendant des siècles par les scientifiques comme par les autorités religieuses, et sa conservation sans décoloration visible malgré la durée de vie normale du matériau reste l'un des éléments que les pèlerins citent comme preuve de l'apparition.|大聖堂に展示されるマントに浮かぶ像は、何世紀にもわたって科学者と教会関係者の双方から研究と論争の対象になってきた。素材の通常の耐用年数を超えても目立った褪色が見られないことは、巡礼者たちがこの顕現の証と指摘する点の一つであり続けている。",
    ),
  },
  {
    e: "👑",
    n: t("Día de Reyes, when the gifts actually arrive|El Día de Reyes, cuando llegan de verdad los regalos|Le jour des Rois, quand les cadeaux arrivent vraiment|贈り物が本当に届く公現祭"),
    t: t(
      "Children here traditionally receive their main gifts on the 6th rather than on the 25th, left overnight by the three kings rather than by any single gift-bringer, and the day closes with families slicing into a ring-shaped sweet bread hiding one or more tiny plastic figures inside. Whoever finds a figure in their slice is obligated to host and provide tamales for everyone at a follow-up gathering the following month.|Los niños de aquí reciben tradicionalmente sus regalos principales el día 6 y no el 25, dejados durante la noche por los tres reyes y no por un solo repartidor, y el día se cierra con familias cortando un pan dulce en forma de rosca que esconde una o varias figuritas de plástico. Quien encuentre una figurita en su rebanada queda obligado a organizar y llevar tamales para todos en una reunión de seguimiento al mes siguiente.|Les enfants reçoivent ici traditionnellement leurs principaux cadeaux le 6 plutôt que le 25, déposés dans la nuit par les trois rois plutôt que par un unique porteur de cadeaux, et la journée se termine par des familles tranchant un pain sucré en forme de couronne cachant une ou plusieurs petites figurines en plastique. Quiconque trouve une figurine dans sa part est tenu d'organiser et d'apporter des tamales pour tout le monde lors d'une réunion le mois suivant.|この国の子どもたちは、伝統的に主な贈り物を25日ではなく6日に受け取る。特定の一人ではなく三人の王が夜のうちに置いていくとされる。この日は、輪の形をした甘いパンに一つ以上の小さなプラスチックの人形を隠して切り分けて締めくくる。自分の一切れに人形が入っていた人は、翌月開かれる集まりで全員分のタマレスを用意して主催する義務を負う。",
    ),
    f: t(
      "The hidden figures represent the infant Jesus, echoing a story of the holy family hiding from persecution, and the tradition of assigning tamale duty grew up as a lighthearted way to keep the gathering going a second time.|Las figuritas ocultas representan al niño Jesús, en eco a la historia de la sagrada familia escondiéndose de la persecución, y la tradición de asignar el deber de los tamales surgió como una manera desenfadada de mantener viva la reunión una segunda vez.|Les figurines cachées représentent l'enfant Jésus, faisant écho à l'histoire de la sainte famille se cachant de la persécution, et la tradition d'assigner la corvée de tamales est née comme une façon légère de prolonger la réunion une seconde fois.|隠された人形は幼子イエスを表し、迫害から逃れて身を隠した聖家族の物語に重ねられている。タマレス当番を割り当てる習わしは、集まりをもう一度、軽い気持ちで続けるための工夫として根付いた。",
    ),
  },
  {
    e: "🎭",
    n: t("Carnival takes over the Veracruz waterfront|El Carnaval toma el malecón de Veracruz|Le carnaval s'empare du front de mer de Veracruz|カーニバルがベラクルスの海岸通りを占拠する"),
    t: t(
      "One of the country's largest carnival celebrations fills the port's waterfront for more than a week before Lent with parade floats, elected carnival royalty and a soundtrack built on the same Afro-Caribbean rhythms the port has heard from ships for centuries. The celebration formally opens each year with the symbolic burning of a papier-mâché figure representing bad humor, cleared out to make room for the party.|Una de las mayores celebraciones de carnaval del país llena el malecón del puerto durante más de una semana antes de la Cuaresma con carros alegóricos, realeza carnavalesca elegida y una banda sonora construida sobre los mismos ritmos afrocaribeños que el puerto ha oído llegar de los barcos durante siglos. La celebración se abre formalmente cada año con la quema simbólica de una figura de cartón que representa el mal humor, despejado para dar paso a la fiesta.|L'une des plus grandes célébrations de carnaval du pays remplit le front de mer du port pendant plus d'une semaine avant le carême, avec des chars, une royauté de carnaval élue et une bande sonore bâtie sur les mêmes rythmes afro-caribéens que le port entend depuis des siècles depuis ses navires. La célébration s'ouvre chaque année formellement par la crémation symbolique d'une figure en papier mâché représentant la mauvaise humeur, écartée pour faire place à la fête.|国内でも指折り規模のこのカーニバルは、四旬節に入る前の一週間あまり、港の海岸通りをパレードの山車と選ばれたカーニバルの女王・王、そして何世紀もこの港が船から聞いてきたのと同じアフロカリブのリズムを基にした音楽で埋め尽くす。祭りは毎年、不機嫌を表す張り子人形を象徴的に焼く儀式で正式に幕を開け、祝祭のための場所を空ける。",
    ),
    f: t(
      "The festival was suspended for decades under a 19th-century ban on public masking and only revived in its modern form in 1925, after officials decided the port's economy needed the tourism more than it needed the old restriction.|El festival estuvo suspendido durante décadas bajo una prohibición del siglo XIX contra el uso público de máscaras, y solo se revivió en su forma moderna en 1925, después de que las autoridades decidieran que la economía del puerto necesitaba más el turismo que la vieja restricción.|Le festival fut suspendu pendant des décennies sous une interdiction du XIXe siècle visant le port public de masques, et ne fut relancé sous sa forme moderne qu'en 1925, après que les autorités eurent jugé que l'économie du port avait davantage besoin du tourisme que de l'ancienne restriction.|この祭りは19世紀に公共の場での仮面着用が禁じられて何十年も中断していたが、1925年、当局が旧来の規制よりも観光収入を優先する判断を下し、いまの形で復活した。",
    ),
  },
  {
    e: "🐍",
    n: t("The equinox sends a serpent down El Castillo|El equinoccio manda una serpiente por El Castillo|L'équinoxe fait descendre un serpent le long d'El Castillo|分点がエル・カスティージョに蛇を送り込む"),
    t: t(
      "Thousands gather at Chichén Itzá on the spring equinox to watch the afternoon light and shadow trace what looks like a serpent slithering down the pyramid's staircase to meet a carved stone head at its base, an alignment repeated in miniature at smaller Maya sites across the region the same week. Vendors along the access road sell little else but shade hats and water for the hours-long wait in the open sun.|Miles se reúnen en Chichén Itzá en el equinoccio de primavera para ver cómo la luz y la sombra de la tarde trazan lo que parece una serpiente deslizándose por la escalinata de la pirámide hasta encontrarse con una cabeza tallada en piedra al pie, una alineación que se repite en miniatura esa misma semana en sitios mayas más pequeños de la región. Los vendedores del camino de acceso apenas venden otra cosa que sombreros y agua para la espera de horas bajo el sol abierto.|Des milliers de personnes se rassemblent à Chichén Itzá à l'équinoxe de printemps pour voir la lumière et l'ombre de l'après-midi tracer ce qui ressemble à un serpent glissant le long de l'escalier de la pyramide jusqu'à rejoindre une tête de pierre sculptée à sa base, un alignement répété en miniature la même semaine sur de plus petits sites mayas de la région. Les vendeurs le long de la route d'accès ne proposent guère que chapeaux et eau pour l'attente de plusieurs heures en plein soleil.|春分の日、チチェン・イッツァには何千人もが集まり、午後の陽光と影がピラミッドの階段に蛇のように滑り降りて麓の石彫りの頭部と出会う様子を見守る。同じ週には、この地域の小さなマヤ遺跡でも同じ配置が縮小版で繰り返される。参道の露店は、灼熱の中で何時間も待つ客のために、日除け帽と水以外ほとんど何も売っていない。",
    ),
    f: t(
      "The same effect recurs at the autumn equinox in September, slightly less crowded than the spring date, and modern measurements of the alignment's precision are cited as evidence that its builders tracked the sun's movement with more exactness than any single written record from the period confirms.|El mismo efecto se repite en el equinoccio de otoño de septiembre, algo menos concurrido que la fecha de primavera, y las mediciones modernas de la precisión de esta alineación se citan como prueba de que sus constructores rastreaban el movimiento del sol con más exactitud de la que confirma cualquier registro escrito de la época.|Le même effet se reproduit à l'équinoxe d'automne en septembre, un peu moins fréquenté qu'à la date de printemps, et les mesures modernes de la précision de cet alignement sont citées comme preuve que ses bâtisseurs suivaient le mouvement du soleil avec plus d'exactitude qu'aucun document écrit de l'époque ne le confirme.|同じ現象は9月の秋分にも再現され、春分の日よりはやや人出が少ない。この配置の精度を現代の測定で調べた結果は、建設者たちが当時のどの文献記録が裏付けるよりも正確に太陽の動きを追跡していた証拠として引き合いに出される。",
    ),
  },
];
