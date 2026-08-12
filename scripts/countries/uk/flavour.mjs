/**
 * イギリスの国情報・地方区分・アイテム・厄災の神・災難・季節。
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

export const UK_META = {
  id: "uk",
  name: t("United Kingdom|Reino Unido|Royaume-Uni|イギリス"),
  blurb: t(
    "A scatter of islands stitched together by rail, rain and a monarchy older than most of its castles|Un archipiélago cosido por el ferrocarril, la lluvia y una monarquía más vieja que la mayoría de sus castillos|Un archipel cousu par le rail, la pluie et une monarchie plus vieille que la plupart de ses châteaux|鉄道と雨、そして城の多くより古い王室が結び合わせる島々",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランス・世界一周・茨城と同じ理由。ここは他国と同じ暫定値100のまま。
  // 実際の値=53はREGISTER.mdに理由つきで書いてある)。
  cur: { pre: "£", post: "", mul: 100 },
  start: "london",
  cpuNames: ["Black Shuck", "The Kelpie", "Y Ddraig Goch", "An Púca"],
  // ユニオンフラッグの赤と紺、旗の白、ウェールズ国旗の緑、スコットランド高地のヒースの紫。
  stripe: ["#c8102e", "#012169", "#f2f0e8", "#2f8f4f", "#8a6a94"],
};

/** 6地方。 */
export const UK_REGIONS = {
  se: t("Southern England|Sur de Inglaterra|Sud de l'Angleterre|イングランド南部"),
  mi: t("The Midlands|Midlands|Midlands|イングランド中部"),
  no: t("Northern England|Norte de Inglaterra|Nord de l'Angleterre|イングランド北部"),
  wa: t("Wales|Gales|Pays de Galles|ウェールズ"),
  sc: t("Scotland|Escocia|Écosse|スコットランド"),
  ni: t("Northern Ireland|Irlanda del Norte|Irlande du Nord|北アイルランド"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const UK_ITEMS = {
  girdle: {
    e: "🧚",
    price: 240,
    kind: "move",
    n: t("Puck's Forty-Minute Girdle|El cinturón de cuarenta minutos de Puck|La ceinture de quarante minutes de Puck|パックの四十分の帯"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "In A Midsummer Night's Dream, Puck boasts to Oberon that he can \"put a girdle round about the earth in forty minutes,\" a claim never tested and never doubted by anyone who has actually met him. Nobody who borrows the girdle has ever managed to explain afterward exactly which way they went.|En El sueño de una noche de verano, Puck alardea ante Oberón de que puede «poner un cinturón alrededor de la tierra en cuarenta minutos», una afirmación que nadie que lo haya conocido de verdad se atreve a poner en duda.|Dans Le Songe d'une nuit d'été, Puck se vante devant Obéron de pouvoir « ceindre la terre d'une ceinture en quarante minutes », une affirmation que personne l'ayant vraiment rencontré n'ose mettre en doute.|『夏の夜の夢』の中でパックはオベロンに「四十分あれば地球に帯を巻いてみせる」と豪語する。誰も試したことはなく、実際に彼と会った者は誰もその話を疑わない。この帯を借りた者は誰ひとり、あとになってどちらの方角へ運ばれたのか説明できたためしがない。",
    ),
  },
  osmap: {
    e: "🗺️",
    price: 380,
    kind: "pre",
    n: t("An Ordnance Survey Map|Un mapa del Ordnance Survey|Une carte de l'Ordnance Survey|陸地測量部の地図"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Ordnance Survey began in 1791 to map the coast for cannon placement against a feared French invasion, and its surveyors triangulated the entire country from a single measured baseline on Hounslow Heath. The maps are now so precise, down to individual field boundaries, that walkers trust them over their own eyes on foggy hills.|El Ordnance Survey comenzó en 1791 para cartografiar la costa y emplazar cañones contra una temida invasión francesa, y sus topógrafos triangularon todo el país desde una única línea base medida en Hounslow Heath.|L'Ordnance Survey débuta en 1791 pour cartographier la côte en vue d'y placer des canons contre une invasion française redoutée, et ses arpenteurs triangulèrent tout le pays depuis une unique ligne de base mesurée sur la lande de Hounslow.|陸地測量部(オードナンス・サーヴェイ)は1791年、恐れられていたフランスの侵攻に備えて大砲を配置するため海岸線を測量することから始まった。測量士たちはハウンズロー・ヒースで測った一本の基線から国じゅうを三角測量した。地図はいまや個々の畑の境界まで精密で、霧の丘では登山者が自分の目より地図を信じる。",
    ),
  },
  nightriviera: {
    e: "🌙",
    price: 360,
    kind: "pre",
    n: t("Night Riviera Sleeper Ticket|Billete del Night Riviera Sleeper|Billet du Night Riviera Sleeper|ナイト・リヴィエラ寝台の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The sleeper service between London and Cornwall has run in something like its current form since 1877, and passengers still wake to breakfast being served as the train hugs the sea wall at Dawlish, close enough for spray to hit the windows in a storm. It is one of the last regularly scheduled sleeper trains left in Britain.|El servicio nocturno entre Londres y Cornualles funciona en una forma parecida a la actual desde 1877, y los pasajeros aún despiertan con el desayuno servido mientras el tren bordea el muro marino de Dawlish.|Le train de nuit entre Londres et les Cornouailles roule sous une forme proche de l'actuelle depuis 1877, et les passagers se réveillent encore avec le petit-déjeuner servi tandis que le train longe la digue de Dawlish.|ロンドンとコーンウォールを結ぶ寝台列車は1877年からほぼ今の形で走り続けており、乗客はダウリッシュの海沿いの防波堤ぎりぎりを列車が進むころに朝食を運ばれて目を覚ます。嵐の日には窓に飛沫がかかるほどの近さである。英国に残るわずかな定期寝台列車の一つでもある。",
    ),
  },
  scotsman: {
    e: "🚂",
    price: 640,
    kind: "pre",
    n: t("Flying Scotsman Ticket|Billete del Flying Scotsman|Billet du Flying Scotsman|フライング・スコッツマンの切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The locomotive Flying Scotsman became the first steam engine officially recorded at 100 miles per hour in 1934, running the London-to-Edinburgh route it was built for in 1923 non-stop by swapping crews through a corridor connecting to a following carriage. It has been rescued from scrapping by public appeal more than once since.|La locomotora Flying Scotsman fue la primera máquina de vapor registrada oficialmente a 160 km/h en 1934, recorriendo sin paradas la ruta Londres-Edimburgo para la que se construyó en 1923.|La locomotive Flying Scotsman fut la première machine à vapeur officiellement enregistrée à 160 km/h en 1934, parcourant sans arrêt la ligne Londres-Édimbourg pour laquelle elle fut construite en 1923.|蒸気機関車フライング・スコッツマン号は1934年、公式記録として初めて時速100マイル(約160km)を出した機関車になった。1923年に造られたロンドン—エディンバラ間をノンストップで走るため、後続車両とつながる通路で乗務員を交代させながら走った。その後も何度か、廃車の危機を市民の募金で救われている。",
    ),
  },
  horseshoe: {
    e: "🧲",
    price: 320,
    kind: "passive",
    n: t("A Horseshoe Over the Door|Una herradura sobre la puerta|Un fer à cheval au-dessus de la porte|扉の上の蹄鉄"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Nailed open-end-up, the shape is said to catch and hold good luck rather than let it spill out, and the tradition is old enough that nobody agrees whether the iron itself or the shape does the warding. Blacksmiths were once considered lucky people to meet on the road for exactly this reason.|Clavada con las puntas hacia arriba, se dice que su forma atrapa y retiene la buena suerte en vez de dejarla escapar, y la tradición es tan antigua que nadie se pone de acuerdo en si el mérito es del hierro o de la forma.|Clouée pointes vers le haut, sa forme est censée retenir la bonne fortune plutôt que de la laisser s'échapper, et la tradition est si ancienne que nul ne s'accorde à dire si c'est le fer ou la forme qui protège.|開いた側を上にして打ち付けると、この形は幸運をこぼさずに受け止めるとされる。この習わしはあまりに古く、鉄そのものと形のどちらに魔除けの力があるのか、いまも意見が分かれている。かつて鍛冶屋が道で出会うと縁起がよいとされたのも、同じ理由からだった。",
    ),
  },
  rowan: {
    e: "🌿",
    price: 440,
    kind: "pre",
    n: t("A Sprig of Rowan|Una ramita de serbal|Un brin de sorbier|ナナカマドの小枝"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "\"Rowan tree and red thread put the witches to their speed,\" runs an old rhyme from the Scottish borders, and sprigs tied with red wool were hung over doorways and byres to keep spirits and ill luck from crossing the threshold. The tree's red berries and the five-pointed star on the underside of each one were taken as a sign it was marked for exactly this purpose.|«Árbol de serbal e hilo rojo ponen a las brujas en fuga», dice una vieja rima de la frontera escocesa, y las ramitas atadas con lana roja se colgaban sobre puertas y establos para impedir el paso a espíritus y mala suerte.|« Sorbier et fil rouge mettent les sorcières en fuite », dit une vieille comptine des Borders écossais, et l'on suspendait des brins liés de laine rouge au-dessus des portes et des étables pour empêcher esprits et malchance de franchir le seuil.|「ナナカマドの木と赤い糸で、魔女を退散させる」というスコットランド国境地方の古い言い伝えがあり、赤い毛糸で結んだ小枝を戸口や牛小屋に掛けて、悪霊や不運が敷居を越えないようにした。赤い実の裏にある五芒星の形が、まさにこの用途のために刻まれた印だと考えられていた。",
    ),
  },
  pubquiz: {
    e: "📋",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("The Pub Quiz Team Card|La ficha del equipo de trivial del pub|La fiche de l'équipe du bar-quiz|パブクイズのチーム用紙"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Pub quizzes are held most weeks in tens of thousands of British pubs, and every team is expected to have a name a little too clever for its own good and one member who quietly knows an alarming amount about capital cities. Whispering the answer under the noise of the room is treated as part of the game rather than cheating, so long as nobody actually looks at a phone.|El trivial del pub se celebra casi cada semana en decenas de miles de pubes británicos, y se espera que todo equipo tenga un nombre demasiado ingenioso para su propio bien.|Le quiz de pub se tient presque chaque semaine dans des dizaines de milliers de pubs britanniques, et chaque équipe se doit d'avoir un nom un peu trop malin pour son propre bien.|パブクイズはほぼ毎週、英国じゅう何万軒ものパブで開かれており、どのチームにもちょっと気取りすぎたチーム名と、首都の名前を不気味なほど知っているメンバーが一人はいるものとされる。周囲の騒がしさに紛れて答えをささやくのは、ズルではなくお約束の一部とされる。ただしスマホをこっそり見るのは論外である。",
    ),
  },
  detectorist: {
    e: "🔍",
    price: 280,
    kind: "pre",
    n: t("A Metal Detectorist's Find|El hallazgo de un aficionado al detector de metales|La trouvaille d'un prospecteur au détecteur|メタルディテクター愛好家の掘り出し物",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "A weekend hobbyist found the Staffordshire Hoard, over 4,000 pieces of Anglo-Saxon gold and silver, in a freshly ploughed field in 2009 using a detector bought secondhand, the largest such hoard ever recorded in Britain. British law requires any find judged \"treasure\" to be reported within fourteen days, with a reward split between finder and landowner if a museum wants it.|Un aficionado de fin de semana halló el Tesoro de Staffordshire, más de 4.000 piezas de oro y plata anglosajonas, en un campo recién arado en 2009, usando un detector comprado de segunda mano.|Un amateur du week-end découvrit le trésor du Staffordshire, plus de 4 000 pièces d'or et d'argent anglo-saxonnes, dans un champ fraîchement labouré en 2009, avec un détecteur acheté d'occasion.|2009年、週末だけの愛好家が中古で買った探知機を使い、耕したばかりの畑で4000点を超えるアングロサクソン時代の金銀細工「スタッフォードシャーの秘宝」を発見した。英国で記録された中で最大級の埋蔵品である。英国法では「財宝」と判定された発見物は14日以内に届け出る義務があり、博物館が引き取る場合は発見者と地主に報奨金が分けられる。",
    ),
  },
  guardswhistle: {
    e: "🚨",
    price: 420,
    kind: "pre",
    n: t("A Guard's Whistle Blast|El pitido del silbato del guarda|Le coup de sifflet du chef de train|車掌の笛の合図"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A single sharp blast on the guard's whistle is the traditional signal that all doors are shut and the platform is clear, and on older lines it is still paired with a green flag rather than a light. Missing it by a second used to mean genuinely missing the train, back when doors were opened and closed by hand.|Un pitido corto y agudo del silbato del guarda es la señal tradicional de que todas las puertas están cerradas y el andén despejado, y en las líneas más antiguas aún se acompaña de una bandera verde en vez de una luz.|Un coup de sifflet bref et aigu du chef de train est le signal traditionnel indiquant que toutes les portes sont fermées et le quai dégagé, et sur les lignes les plus anciennes, il s'accompagne encore d'un drapeau vert plutôt que d'un feu.|車掌の笛が短く鋭く一度鳴るのは、扉がすべて閉まりホームが安全だという昔ながらの合図で、古い路線ではいまも灯りではなく緑の旗が添えられる。扉を手で開け閉めしていた時代には、これに一瞬遅れただけで本当に電車に乗り遅れたものだった。",
    ),
  },
};

/**
 * 厄災の神。イングランド北部の民話に伝わるボガート(家に棲みつく、
 * 姿を変える性悪の精霊)にした。引っ越しても付いてくるという語りが
 * 「毎ターン付きまとう」仕組みそのものと重なるので選んだ。
 * 韓国のトッケビ・茨城のダイダラボウと同じく「残酷ではなく、ただ
 * いたずら好きで度が過ぎるだけ」の性格に描く。
 */
export const UK_SPIRIT = {
  e: "👹",
  n: t("The Boggart|El Boggart|Le Boggart|ボガート"),
  big: t("The Boggart's Flitting|La mudanza del Boggart|Le déménagement du Boggart|ボガートの引っ越し"),
  ward: "horseshoe",
  arrive: t(
    "<b>👹 A boggart has taken an interest in you.</b> Old tales from the north of England say these shapeshifting household spirits turn spiteful the moment they are named or insulted, souring milk and hiding tools rather than doing any real harm. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👹 Un boggart se ha fijado en ti.</b> Viejos cuentos del norte de Inglaterra dicen que estos espíritus domésticos que cambian de forma se vuelven rencorosos en cuanto se les nombra o insulta, agriando la leche y escondiendo herramientas antes que hacer daño de verdad. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👹 Un boggart s'est intéressé à toi.</b> De vieux contes du nord de l'Angleterre disent que ces esprits domestiques changeant de forme deviennent malveillants dès qu'on les nomme ou les insulte, faisant tourner le lait et cachant les outils plutôt que de causer un vrai tort. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👹 ボガートに目を付けられた。</b> イングランド北部の昔話によれば、この姿を変える家の精霊は名前を呼ばれたり侮辱されたりした途端に意地悪になるが、本当の害をなすことはなく、牛乳を酸っぱくしたり道具を隠したりする程度だという。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👹 <b>The boggart</b> loses interest and shuffles after <b>{0}</b>, farthest from {1}.|👹 <b>El boggart</b> pierde el interés y se arrastra tras <b>{0}</b>, el más lejano de {1}.|👹 <b>Le Boggart</b> se désintéresse et se traîne vers <b>{0}</b>, le plus loin de {1}.|👹 <b>ボガート</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ引きずるように向かった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the boggart and never once shaken him off. He grins and climbs aboard for good, the way the old tale tells it — <b>the Boggart's Flitting</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al boggart sin haber logrado sacudírselo. Él sonríe y se instala para quedarse, tal como cuenta el viejo relato: empieza <b>la mudanza del Boggart</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le Boggart sans jamais avoir réussi à s'en défaire. Il sourit et s'installe pour de bon, comme le raconte le vieux conte : <b>le déménagement du Boggart</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもボガートと歩いていながら、一度も振り払えなかった。彼はにやりと笑い、昔話そのままにそのまま居座ることに決める。<b>ボガートの引っ越し</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in a Yorkshire tale, a family loaded a cart to flee their troublesome boggart, only for a neighbour to ask if they were flitting — and a voice from inside a milk churn on the cart answered, \"Aye, we're flitting!\" Realising the boggart had packed itself along, the family gave up and simply went home.|<b>Tras la historia:</b> en un cuento de Yorkshire, una familia cargó un carro para huir de su boggart problemático, y un vecino les preguntó si se mudaban; una voz desde dentro de una lechera del carro respondió: «¡Sí, nos mudamos!». Al comprender que el boggart se había empacado con ellos, la familia se rindió y volvió a casa.|<b>Derrière l'histoire :</b> dans un conte du Yorkshire, une famille chargea une charrette pour fuir son boggart gênant, et un voisin leur demanda s'ils déménageaient ; une voix venue d'une baratte à lait sur la charrette répondit : « Oui, on déménage ! » Comprenant que le boggart avait fait ses valises avec eux, la famille abandonna et rentra chez elle.|<b>物語の背景:</b> ヨークシャーのある話では、厄介なボガートから逃げようと一家が荷馬車に家財を積んでいたところ、近所の人に「引っ越すのかい」と聞かれ、荷馬車に積んだミルク缶の中から「ああ、俺たちも引っ越すのさ!」と声が返ってきたという。ボガートも一緒に荷造りしていたと知った一家は諦め、そのまま家へ戻った。",
  ),
  pleased: t(
    "He hides a coin in an old boot for a joke, then forgets which one and knocks it over showing off. <b>{0}</b> gains <span class='money'>+{1}</span>.|Esconde una moneda en una bota vieja como broma, luego olvida cuál era y la tira al presumir. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il cache une pièce dans une vieille botte pour rire, puis oublie laquelle et la renverse en frimant. <b>{0}</b> gagne <span class='money'>+{1}</span>.|冗談のつもりで古い長靴の片方に銭を隠したが、どちらに隠したか忘れてしまい、いばって歩いた拍子に自分で蹴倒した。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A horseshoe is nailed open-end-up over the door where he can see it. Boggarts are said to hate the touch of cold iron above all else, and he backs off, stepping past <b>{0}</b> without noticing this turn.|Una herradura se clava con las puntas hacia arriba sobre la puerta, a la vista. Se dice que los boggarts odian el contacto del hierro frío sobre todas las cosas, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un fer à cheval est cloué pointes vers le haut au-dessus de la porte, bien en vue. On dit que les boggarts détestent par-dessus tout le contact du fer froid ; il recule et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|開いた側を上にした蹄鉄を、彼から見える戸口に打ち付けた。ボガートは何より冷たい鉄に触れるのを嫌うという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。ボガートのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const UK_DOOM = [
  {
    id: "leaves-on-line",
    n: t("The wrong kind of leaves on the line|Las hojas equivocadas en la vía|Les mauvaises feuilles sur la voie|線路に「間違った種類の落ち葉」"),
    t: t(
      "A thin, slippery paste of crushed autumn leaves coats the rails just enough to fool the wheels into thinking they are stopped when they are not, and the announcement blaming it draws the same tired groan every year. Engineers insist the phrase is a genuine physical problem and not an excuse, which somehow makes it funnier rather than less annoying.|Una pasta fina y resbaladiza de hojas de otoño aplastadas cubre los raíles lo justo para engañar a las ruedas y hacerles creer que están detenidas sin estarlo, y el anuncio que lo culpa arranca el mismo suspiro cansado cada año.|Une fine pâte glissante de feuilles d'automne écrasées enduit les rails juste assez pour tromper les roues, qui se croient arrêtées alors qu'elles ne le sont pas, et l'annonce qui en rejette la faute arrache chaque année le même soupir excédé.|砕けた秋の落ち葉の薄く滑るペーストがレールをちょうど覆い、車輪に「止まっている」と錯覚させるほどになる。それを理由にする車内放送は毎年おなじみのため息を誘う。鉄道技師たちはこれが本物の物理現象であって言い訳ではないと主張するが、それがかえっておかしみを増している。",
    ),
    months: [6, 7],
  },
  {
    id: "last-bus",
    n: t("Missing the last bus home|Perdiendo el último autobús a casa|Rater le dernier bus pour rentrer|最終バスに乗り遅れる",
    ),
    t: t(
      "The timetable said one more minute, and one more minute turned out to be exactly enough to watch the bus pull away from the far end of the street. The walk home takes forty minutes in the rain, which somehow still feels shorter than waiting for the first bus of the morning would.|El horario decía que faltaba un minuto más, y ese minuto de más bastó justo para ver el autobús alejarse desde el otro extremo de la calle. Caminar a casa bajo la lluvia lleva cuarenta minutos.|L'horaire annonçait encore une minute, et cette minute de plus a suffi tout juste à voir le bus s'éloigner à l'autre bout de la rue. La marche jusqu'à la maison sous la pluie prend quarante minutes.|時刻表ではあと1分のはずだったが、その1分がちょうど通りの向こうの端でバスが走り去るのを見届けるのに十分な時間だった。雨の中を歩いて帰ると40分かかるが、それでも朝一番のバスを待つよりはましに感じられる。",
    ),
  },
  {
    id: "parking-warden",
    n: t("A traffic warden with a very sharp pencil|Un agente de tráfico con un lápiz muy afilado|Un contractuel au crayon bien taillé|やけに厳しい駐車監視員",
    ),
    t: t(
      "The pay-and-display ticket was bought with two minutes to spare, and the warden's camera still caught the exact moment it expired before the walk back to the car was finished. Appealing rarely works, but everyone tries anyway, filling in the form with the particular fury reserved for machines that are technically correct.|El tique de aparcamiento se compró con dos minutos de margen, y aun así la cámara del agente captó el momento exacto en que caducó antes de terminar el paseo de vuelta al coche. Apelar rara vez funciona, pero todos lo intentan igualmente.|Le ticket de stationnement fut acheté avec deux minutes d'avance, et pourtant la caméra du contractuel a saisi l'instant précis où il expirait avant la fin du trajet retour vers la voiture. Faire appel fonctionne rarement, mais tout le monde essaie quand même.|駐車券は2分の余裕を持って買ったはずなのに、車に戻る途中でちょうど切れた瞬間を監視員のカメラがとらえていた。異議申し立てが通ることはめったにないが、それでも誰もが、技術的には正しい機械に対する特有の怒りを込めて用紙を書く。",
    ),
  },
  {
    id: "fete-rained-off",
    n: t("The village fete gets rained off|La feria del pueblo se cancela por lluvia|La fête du village est annulée pour cause de pluie|村祭りが雨で流れる",
    ),
    t: t(
      "The bunting was up, the tea urn was on, and the sky held for exactly as long as it took to set out the last trestle table before opening without warning. The Women's Institute cake stall carried on regardless under a single borrowed gazebo, on the grounds that a bit of weather has never once stopped a fete.|Los banderines estaban puestos, la tetera al fuego, y el cielo aguantó justo hasta que se colocó la última mesa de caballetes antes de abrirse sin previo aviso. El puesto de pasteles del Instituto de la Mujer siguió igualmente bajo una única carpa prestada.|Les fanions étaient installés, la théière chauffait, et le ciel a tenu juste le temps de dresser la dernière table à tréteaux avant de s'ouvrir sans prévenir. Le stand de gâteaux du Women's Institute a continué quand même sous une unique tonnelle empruntée.|飾り旗も張られ、お茶のポットも用意され、最後の折り畳みテーブルを出し終えるまで空は持ちこたえていたが、そこで前触れもなく降り出した。婦人会のケーキ売り場は、借りたテント一張りの下でそれでも営業を続けた。少しの雨で祭りが中止になったためしはないという理屈である。",
    ),
    months: [3, 4],
  },
  {
    id: "your-round",
    n: t("Somehow, it is your round again|De algún modo, otra vez te toca invitar|Comme par hasard, c'est encore ta tournée|なぜかまた自分の番になる会計",
    ),
    t: t(
      "Everyone at the table swears blind it has been exactly your turn to buy since the beginning of the evening, and the maths never quite works out in your favour no matter how carefully you count the rounds already bought. Refusing is somehow a worse option than just paying and getting on with it.|Todos en la mesa juran que te toca a ti desde el principio de la noche, y las cuentas nunca salen a tu favor por mucho que cuentes las rondas ya pagadas. Negarse resulta, de algún modo, peor que pagar y seguir con la noche.|Tout le monde à table jure mordicus que c'est ta tournée depuis le début de la soirée, et le calcul ne penche jamais en ta faveur, quel que soit le soin que tu mettes à compter les tournées déjà payées. Refuser est pire, d'une certaine façon, que payer et continuer la soirée.|食卓を囲む誰もが、宵の口からずっと自分の番だったと言い張るが、すでに何杯おごったか数えてみても、計算はどうしても自分に有利には出ない。断るのは、払ってその場をやり過ごすよりも、なぜかもっと分が悪い。",
    ),
  },
  {
    id: "queue-jumper",
    n: t("Someone jumps the queue|Alguien se cuela en la cola|Quelqu'un resquille dans la file|列に割り込まれる",
    ),
    t: t(
      "A stranger steps in three places ahead with a mutter about \"just asking a quick question,\" and the queue, usually the one truly sacred institution of the day, holds its collective breath rather than say anything directly. Someone eventually clears their throat pointedly, which counts as a formal complaint by local custom.|Un desconocido se cuela tres puestos más adelante murmurando algo sobre «solo una pregunta rápida», y la cola, la única institución de verdad sagrada del día, contiene la respiración colectiva antes de decir nada directamente.|Un inconnu se glisse trois places plus avant en marmonnant qu'il « veut juste poser une petite question », et la file, seule institution vraiment sacrée de la journée, retient son souffle collectif plutôt que de dire quoi que ce soit directement.|見知らぬ人が「ちょっと聞くだけだから」とつぶやきながら3人分前に割り込む。その日でただ一つ本当に神聖な制度である行列は、はっきり文句を言う代わりに一斉に息をのむ。やがて誰かがわざとらしく咳払いをするが、それがこの土地の習わしでは正式な抗議にあたる。",
    ),
  },
  {
    id: "fog-delay",
    n: t("Fog holds the ferry at the harbour wall|La niebla retiene el ferri en el muelle|Le brouillard retient le ferry contre le quai|霧でフェリーが港に足止め",
    ),
    t: t(
      "A bank of sea fog rolls in thick enough to erase the harbour mouth entirely, and the crossing waits at the wall until visibility clears rather than risk the rocks that everyone insists are perfectly well marked. Passengers crowd the café for tea that goes cold twice over before the horn finally sounds departure.|Un banco de niebla marina llega tan espeso que borra por completo la bocana del puerto, y la travesía espera en el muelle hasta que mejore la visibilidad, en vez de arriesgarse a las rocas.|Un banc de brouillard marin s'installe, assez épais pour effacer entièrement la passe du port, et la traversée patiente contre le quai jusqu'à ce que la visibilité s'améliore, plutôt que de risquer les rochers.|海霧が港の入口をすっかり見えなくするほど濃く立ち込め、航路は視界が晴れるまで岸壁で待たされる。誰もが「ちゃんと標識はある」と言い張る岩礁に近づく危険を冒すよりはましだからである。乗客は喫茶室に集まり、出港の汽笛が鳴るまでに紅茶を二度も冷ましてしまう。",
    ),
    months: [6, 9],
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・韓国と
 * 同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の uk の項)。
 */
export const UK_SEASONS = [
  {
    e: "🐑",
    n: t("Easter lambs and the Grand National|Corderos de Pascua y el Grand National|Agneaux de Pâques et le Grand National|復活祭の子羊とグランド・ナショナル"),
    t: t(
      "Fields across the country fill with new lambs just as Easter egg displays take over shop windows, and on the first Saturday of the month a field in Liverpool called Aintree stages the Grand National, a horse race so demanding that fewer than half the runners typically finish it. Offices empty out early for a sweepstake nobody in them actually understands the form for.|Los campos de todo el país se llenan de corderos recién nacidos justo cuando los escaparates se cubren de huevos de Pascua, y el primer sábado del mes, en un hipódromo de Liverpool llamado Aintree, se corre el Grand National, una carrera tan exigente que suele terminarla menos de la mitad de los caballos.|Les champs du pays se remplissent d'agneaux nouveau-nés juste au moment où les vitrines se couvrent d'œufs de Pâques, et le premier samedi du mois, sur un champ de courses de Liverpool nommé Aintree, se dispute le Grand National, une course si exigeante que moins de la moitié des chevaux la termine en général.|全国の野原が生まれたての子羊で埋まるちょうどそのころ、店の窓は復活祭の卵の飾りで覆われる。月の第一土曜、リヴァプールのエイントリーという競馬場でグランド・ナショナルが開かれる。あまりに過酷なレースで、たいてい出走馬の半分も完走しない。オフィスは、誰も出走表を理解していない予想くじのために早々と空になる。",
    ),
    f: t(
      "The National's Becher's Brook fence, named for a rider who fell into the brook behind it in the race's first running in 1839 and reportedly waited there rather than remount into the chaos, remains one of the most feared jumps in horse racing.|La valla Becher's Brook del National, llamada así por un jinete que cayó al arroyo tras ella en la primera edición de 1839 y, según se dice, prefirió esperar allí antes que remontar en pleno caos, sigue siendo uno de los obstáculos más temidos del hípica.|La haie Becher's Brook du National, nommée d'après un cavalier tombé dans le ruisseau qui la borde lors de la première édition en 1839 et qui, dit-on, préféra y attendre plutôt que de remonter en cheval dans le chaos, reste l'un des obstacles les plus redoutés des courses hippiques.|ナショナルの「ビーチャーズ・ブルック」という障害は、1839年の第一回で落馬してその奥の小川に落ち、混乱の中で再び馬に乗るより川辺で待つほうを選んだと伝わる騎手の名にちなむ。競馬でも屈指の恐れられる障害であり続けている。",
    ),
  },
  {
    e: "🌷",
    n: t("Chelsea in bloom and dancers at dawn|Chelsea en flor y bailarines al amanecer|Chelsea en fleurs et danseurs à l'aube|花咲くチェルシーと夜明けの踊り手"),
    t: t(
      "The Chelsea Flower Show takes over the grounds of the Royal Hospital for one week with show gardens so elaborate that some are built and torn down within days, having taken designers up to a year to plan. On the first of the month, Morris dancers with bells strapped to their shins greet the sunrise on hilltops in a tradition nobody can trace further back than a few written mentions from the 1600s.|El Chelsea Flower Show ocupa durante una semana los jardines del Royal Hospital con jardines de exhibición tan elaborados que algunos se montan y desmontan en pocos días, tras hasta un año de diseño. El primero del mes, bailarines Morris con cascabeles en las espinillas saludan el amanecer en las colinas.|Le Chelsea Flower Show occupe une semaine durant les jardins du Royal Hospital avec des jardins d'exposition si élaborés que certains sont montés puis démontés en quelques jours, après jusqu'à un an de conception. Le premier du mois, des danseurs Morris aux clochettes attachées aux tibias saluent le lever du soleil sur les collines.|チェルシー・フラワー・ショーは一週間、王立病院の敷地を占拠し、設計に一年近くかけながらわずか数日で作って壊す展示庭園まである。月の初日には、すねに鈴を結んだモリス・ダンサーたちが丘の上で日の出を迎える。この習わしがいつ始まったのかは、1600年代の数少ない文献記録より前にはさかのぼれない。",
    ),
    f: t(
      "Chelsea's show gardens are judged so strictly that even a single wilted leaf can cost a gold medal, and some designers have been known to replace individual flowers by hand through the night before judging.|Los jardines de Chelsea se juzgan con tanta rigurosidad que hasta una sola hoja marchita puede costar una medalla de oro, y algunos diseñadores han llegado a reemplazar flores una a una durante la noche antes del juicio.|Les jardins de Chelsea sont jugés si strictement qu'une seule feuille flétrie peut coûter une médaille d'or, et certains concepteurs sont connus pour remplacer des fleurs une à une pendant la nuit précédant le jugement.|チェルシーの展示庭園はあまりに厳しく審査されるため、しおれた葉が一枚あるだけで金賞を逃すこともある。審査前夜、花を一輪ずつ手で取り替える設計者がいるとも言われる。",
    ),
  },
  {
    e: "🎾",
    n: t("Wimbledon fortnight and the longest evenings|La quincena de Wimbledon y las tardes más largas|La quinzaine de Wimbledon et les soirées les plus longues|ウィンブルドンの二週間と一番長い夕暮れ"),
    t: t(
      "Wimbledon has required players to wear \"almost entirely white\" since a written rule was added in 1963, a tradition older than the rule itself, and strawberries and cream sell by the tonne over the two-week tournament regardless of how often rain stops play. The solstice lands in the same fortnight, giving the country its longest daylight of the year for outdoor cricket that often runs past nine in the evening.|Wimbledon exige a los jugadores vestir «casi enteramente de blanco» desde que se añadió una norma escrita en 1963, tradición más antigua que la propia norma, y las fresas con nata se venden por toneladas durante las dos semanas del torneo.|Wimbledon exige des joueurs une tenue « presque entièrement blanche » depuis l'ajout d'une règle écrite en 1963, tradition plus ancienne que la règle elle-même, et les fraises à la crème se vendent par tonnes durant les deux semaines du tournoi.|ウィンブルドンは1963年に成文化された規則で「ほぼ全身白」の着用を選手に義務づけているが、この伝統自体は規則より古い。二週間の大会中、雨で何度中断しようとイチゴとクリームはトン単位で売れる。同じ二週間に夏至が重なり、一年で一番長い日照のもと、屋外のクリケットが夜9時を過ぎても続くことがある。",
    ),
    f: t(
      "Wimbledon's Centre Court retractable roof, added in 2009, takes about ten minutes to close, and the decision to use it is treated as a genuine tactical moment because the change in light and air noticeably affects how the ball bounces.|El tejado retráctil de la pista central de Wimbledon, añadido en 2009, tarda unos diez minutos en cerrarse, y la decisión de usarlo se trata como un auténtico momento táctico.|Le toit rétractable du court central de Wimbledon, ajouté en 2009, met environ dix minutes à se fermer, et la décision de l'utiliser est traitée comme un véritable moment tactique.|2009年に設けられたウィンブルドン・センターコートの開閉式屋根は、閉じるのに約10分かかる。使うかどうかの判断は、光や空気の変化がボールの弾み方に目に見えて影響するため、本物の戦術的判断として扱われる。",
    ),
  },
  {
    e: "🏖️",
    n: t("School's out and the coast fills up|Se acaban las clases y la costa se llena|L'école finit et la côte se remplit|学校が休みになり海辺がにぎわう"),
    t: t(
      "The summer term ends and families head for the coast in numbers that turn small seaside towns into traffic jams by lunchtime, a tradition of the British seaside holiday that survived the rise of cheap flights abroad better than anyone expected. Music festivals fill fields across the country the same weekends, with wellington boots packed regardless of the forecast.|Termina el trimestre de verano y las familias se dirigen a la costa en tal número que los pequeños pueblos costeros se convierten en atascos a la hora del almuerzo, una tradición de las vacaciones británicas junto al mar que sobrevivió al auge de los vuelos baratos al extranjero mejor de lo esperado.|Le trimestre d'été s'achève et les familles filent vers la côte en nombre tel que les petites stations balnéaires se transforment en embouteillages dès l'heure du déjeuner, une tradition des vacances britanniques au bord de mer qui a mieux survécu à l'essor des vols pas chers à l'étranger que quiconque ne l'aurait cru.|夏学期が終わり、家族連れが海辺を目指すため、昼過ぎには小さな海辺の町が渋滞と化す。海外への格安航空券が広まってもなお、思いのほかしぶとく生き残った英国式の海辺の休暇の伝統である。同じ週末には全国の野原で音楽フェスティバルが開かれ、天気予報に関わらずウェリントンブーツが荷物に詰め込まれる。",
    ),
    f: t(
      "British seaside piers were originally built in the 19th century as promenades for steamer passengers rather than for amusement, and the rides and arcades that now define them were mostly added decades later once the boats stopped calling.|Los muelles costeros británicos se construyeron originalmente en el siglo XIX como paseos para los pasajeros de vapores, no para diversiones, y las atracciones y salones recreativos que hoy los definen se añadieron sobre todo décadas después.|Les jetées balnéaires britanniques furent à l'origine bâties au XIXe siècle comme promenades pour les passagers des bateaux à vapeur, non pour l'amusement, et les manèges et salles de jeux qui les définissent aujourd'hui furent surtout ajoutés des décennies plus tard.|英国の海辺の桟橋はもともと19世紀、娯楽のためではなく蒸気船の乗客のための遊歩道として建てられた。いまその代名詞になっている遊具やゲームセンターの多くは、船の寄港が途絶えて何十年も経ってから加えられたものである。",
    ),
  },
  {
    e: "🎭",
    n: t("The Fringe takes over Edinburgh and the hills turn purple|El Fringe toma Edimburgo y las colinas se tiñen de púrpura|Le Fringe envahit Édimbourg et les collines se teintent de pourpre|フリンジがエディンバラを占拠し、丘が紫に染まる"),
    t: t(
      "The Edinburgh Festival Fringe fills every spare room, church hall and cellar in the city with comedy and theatre, having grown from eight uninvited companies in 1947 into the largest arts festival on Earth by sheer number of shows. In the Highlands the same weeks turn hillsides a deep purple as heather comes into flower, a bloom so short that hillwalking guides publish week-by-week colour forecasts.|El Festival Fringe de Edimburgo llena cada sala libre, salón parroquial y sótano de la ciudad con comedia y teatro, habiendo crecido desde ocho compañías no invitadas en 1947 hasta convertirse en el mayor festival de artes del mundo por número de espectáculos.|Le Festival Fringe d'Édimbourg remplit chaque salle libre, salle paroissiale et cave de la ville de comédie et de théâtre, ayant grandi depuis huit compagnies non invitées en 1947 jusqu'à devenir le plus grand festival artistique du monde par le nombre de spectacles.|エディンバラ・フェスティバル・フリンジは、教会のホールから地下室まで町じゅうの空き部屋をコメディと演劇で埋め尽くす。1947年に招かれざる8劇団から始まり、上演数では世界最大の芸術祭へと育った。同じ時期のハイランドでは、ヒースの花が咲いて丘の斜面が深い紫に染まる。花の盛りがあまりに短いため、登山ガイドは週ごとの色づき予報まで出す。",
    ),
    f: t(
      "The word \"fringe\" stuck because the eight companies that turned up uninvited in 1947 performed on the edges of the official Edinburgh International Festival programme rather than within it, a description a newspaper critic used that year and that never went away.|La palabra «fringe» (margen) se quedó porque las ocho compañías que se presentaron sin invitación en 1947 actuaron al margen del programa oficial del Festival Internacional de Edimburgo, una descripción que usó un crítico de prensa ese año y que nunca desapareció.|Le mot « fringe » (marge) est resté parce que les huit compagnies venues sans invitation en 1947 se produisirent en marge du programme officiel du Festival international d'Édimbourg, une description utilisée cette année-là par un critique de presse et qui n'a jamais disparu.|「フリンジ(周縁)」という語が定着したのは、1947年に招かれず現れた8つの劇団が、エディンバラ国際フェスティバルの正式プログラムの「外側」で上演したからである。その年、ある新聞評論家が使った表現がそのまま残り続けた。",
    ),
  },
  {
    e: "⚽",
    n: t("Football returns and the harvest comes in|Vuelve el fútbol y llega la cosecha|Le football revient et la moisson rentre|サッカーが戻り、収穫の時が来る"),
    t: t(
      "The Premier League season kicks off in earnest this month, filling pubs on Saturday afternoons with a ritual that shapes the national mood more reliably than the weather does, while combine harvesters work fields into the evening under headlights to bring in the grain before autumn rain sets in. School terms restart within the same fortnight, uniforms still creased from the shop.|La temporada de la Premier League arranca de lleno este mes, llenando los pubes los sábados por la tarde con un ritual que moldea el ánimo nacional más fielmente que el propio clima, mientras las cosechadoras trabajan los campos hasta el anochecer bajo los faros para recoger el grano antes de las lluvias de otoño.|La saison de Premier League démarre pour de bon ce mois-ci, remplissant les pubs le samedi après-midi d'un rituel qui façonne l'humeur nationale plus fidèlement que la météo elle-même, tandis que les moissonneuses-batteuses travaillent les champs jusqu'au soir sous les phares pour rentrer le grain avant les pluies d'automne.|プレミアリーグの本格的な開幕がこの月にあり、土曜の午後のパブを、天気よりも確実に国民の気分を左右する儀式で満たす。一方、コンバイン収穫機は秋の雨が来る前に穀物を刈り入れようと、ヘッドライトを点けて夕方まで畑で働く。学校も同じ二週間のうちに新学期を迎え、制服にはまだ店の折り目が残っている。",
    ),
    f: t(
      "The Premier League is watched in an estimated 200 countries and territories, and some clubs now sell more replica shirts abroad each season than the entire population of the town their stadium sits in.|Se calcula que la Premier League se sigue en unos 200 países y territorios, y algunos clubes venden hoy más camisetas de réplica en el extranjero cada temporada que la población entera de la ciudad donde está su estadio.|On estime que la Premier League est suivie dans 200 pays et territoires, et certains clubs vendent aujourd'hui chaque saison plus de maillots à l'étranger que la population entière de la ville où se trouve leur stade.|プレミアリーグはおよそ200の国と地域で視聴されているとされ、クラブによっては一シーズンに海外で売る複製ユニフォームの枚数が、スタジアムのある町の人口全体を上回ることもある。",
    ),
  },
  {
    e: "🍂",
    n: t("The clocks go back and the leaves turn|Los relojes retrasan y las hojas cambian de color|Les horloges reculent et les feuilles changent de couleur|時計が戻り、木の葉が色づく"),
    t: t(
      "Clocks are put back an hour at the end of the month, handing back an hour of sleep but pushing sunset into mid-afternoon for the rest of the winter, and school half-term coincides closely enough that families often use the extra hour for a trip to see autumn colour in the country's beech woods. Supermarkets quietly begin stacking selection boxes weeks before anyone is ready to think about it.|Los relojes se atrasan una hora a finales de mes, devolviendo una hora de sueño pero adelantando la puesta de sol a media tarde para el resto del invierno, y las vacaciones escolares de mitad de trimestre coinciden lo bastante como para que las familias aprovechen la hora extra para ver los colores otoñales.|Les horloges reculent d'une heure à la fin du mois, rendant une heure de sommeil mais avançant le coucher du soleil au milieu de l'après-midi pour le reste de l'hiver, et les vacances scolaires de la moitié du trimestre coïncident d'assez près pour que les familles profitent de cette heure en plus pour aller voir les couleurs d'automne.|月末に時計が1時間戻され、眠りの1時間は返ってくるものの、冬の残りは日没が午後半ばまで早まる。学校の中間休みとちょうど重なるため、家族連れはその余った1時間を使ってブナ林の紅葉を見に出かけることも多い。スーパーは誰もまだ考えたくもないうちから、静かにクリスマス菓子の詰め合わせを積み始める。",
    ),
    f: t(
      "The clock change was first proposed as \"daylight saving\" in 1907 by a builder annoyed at losing golfing light in the evenings, though it took the fuel shortages of the First World War to actually get it adopted in 1916.|El cambio de hora se propuso por primera vez como «horario de verano» en 1907, obra de un constructor molesto por perder luz para jugar al golf por las tardes, aunque hicieron falta las escaseces de combustible de la Primera Guerra Mundial para que se adoptara en 1916.|Le changement d'heure fut proposé pour la première fois sous le nom d'« heure d'été » en 1907 par un entrepreneur agacé de perdre la lumière du soir pour jouer au golf, mais il fallut les pénuries de combustible de la Première Guerre mondiale pour qu'il soit réellement adopté en 1916.|夏時間(サマータイム)は1907年、夕方のゴルフの光を失うことに苛立ったある建築業者によって初めて提案されたが、実際に採用されたのは第一次大戦の燃料不足がきっかけとなった1916年のことだった。",
    ),
  },
  {
    e: "🎆",
    n: t("Bonfires for a failed plot, poppies for the fallen|Hogueras por un complot fallido, amapolas por los caídos|Des feux de joie pour un complot manqué, des coquelicots pour les morts|失敗した陰謀のかがり火と、戦没者を悼むポピー"),
    t: t(
      "Bonfire Night on the fifth burns effigies and fireworks nationwide to mark the failure of a 1605 plot to blow up Parliament, an event so old that many who light the fires could not say which king was meant to die. A week later the country falls silent at eleven o'clock on the eleventh day, red paper poppies pinned to coats for weeks beforehand in memory of the war dead.|La Noche de las Hogueras, el día cinco, quema muñecos y fuegos artificiales por todo el país para conmemorar el fracaso de un complot de 1605 para volar el Parlamento, un suceso tan antiguo que muchos de los que encienden las hogueras no sabrían decir qué rey debía morir.|La Nuit des feux de joie, le cinq, brûle des effigies et des feux d'artifice dans tout le pays pour marquer l'échec d'un complot de 1605 visant à faire sauter le Parlement, un événement si ancien que beaucoup de ceux qui allument les feux ne sauraient dire quel roi devait mourir.|5日のボンファイア・ナイトには全国でかかしを燃やし花火を打ち上げ、1605年に議会を爆破しようとした陰謀が失敗に終わったことを祝う。あまりに古い出来事のため、かがり火を焚く人の多くはどの王を狙った陰謀だったかすら言えない。その一週間後、11日の11時に国じゅうが黙祷を捧げる。戦没者を悼み、何週間も前から赤い紙のポピーが上着に留められる。",
    ),
    f: t(
      "The plot's most famous conspirator, Guy Fawkes, was caught guarding barrels of gunpowder in a cellar beneath the House of Lords, and effigies of him — \"guys\" — are still built by children from old clothes stuffed with newspaper for the bonfires, the origin of the word \"guy\" for any man at all.|El conspirador más famoso del complot, Guy Fawkes, fue sorprendido vigilando barriles de pólvora en un sótano bajo la Cámara de los Lores, y los niños aún construyen muñecos suyos —«guys»— con ropa vieja rellena de periódico.|Le plus célèbre conspirateur du complot, Guy Fawkes, fut surpris à surveiller des barils de poudre dans une cave sous la Chambre des Lords, et des enfants construisent encore ses effigies — des « guys » — avec de vieux vêtements bourrés de papier journal.|陰謀の一味で最も有名なガイ・フォークスは、貴族院の地下室で火薬樽を見張っているところを捕らえられた。いまも子どもたちは古着に新聞紙を詰めた彼の人形「ガイ」を作ってかがり火にくべる。英語で男を指す「ガイ」という語は、ここから広まった。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas markets and the panto|Mercadillos navideños y el panto|Marchés de Noël et le panto|クリスマス市とパントマイム",
    ),
    t: t(
      "Wooden stalls selling mulled wine and roasted chestnuts fill town squares from the start of the month, while theatres nationwide stage pantomimes — fairy tales retold with cross-dressed leads, audience shouting matches and jokes aimed entirely over children's heads at their parents — a tradition unbroken since the 18th century. \"He's behind you!\" gets shouted at the stage by audiences who all know perfectly well that he is.|Puestos de madera con vino caliente y castañas asadas llenan las plazas desde principios de mes, mientras los teatros de todo el país representan pantomimas —cuentos de hadas recontados con protagonistas travestidos y chistes dirigidos por completo a los padres por encima de la cabeza de los niños—, una tradición ininterrumpida desde el siglo XVIII.|Des étals de bois vendant vin chaud et châtaignes grillées envahissent les places dès le début du mois, tandis que les théâtres du pays entier montent des pantomimes — contes de fées revisités avec des rôles travestis, joutes avec le public et blagues visant carrément les parents par-dessus la tête des enfants — une tradition ininterrompue depuis le XVIIIe siècle.|木造の屋台がホットワインと焼き栗を売る市が月初めから広場を埋め、全国の劇場では「パント」――主役が異性装で演じられ、観客と掛け合いをし、子どもの頭上を飛び越えて親に向けたジョークが飛び交うおとぎ話の劇――が18世紀から途切れず上演され続けている。「後ろにいるよ!」と観客が舞台へ叫ぶが、みな本当にそこにいることを百も承知である。",
    ),
    f: t(
      "The pantomime dame, an older woman played by a man in exaggerated costume, is a tradition thought to descend from 19th-century music hall, and landing the role is considered a genuine badge of honour among British actors rather than a novelty.|La dama de la pantomima, una mujer mayor interpretada por un hombre con vestuario exagerado, es una tradición que se cree heredada del music hall del siglo XIX, y conseguir el papel se considera entre los actores británicos una auténtica insignia de honor.|La « dame » de la pantomime, une femme âgée jouée par un homme en costume exagéré, est une tradition que l'on croit héritée du music-hall du XIXe siècle, et décrocher ce rôle est considéré chez les acteurs britanniques comme un véritable insigne d'honneur.|パントの「デイム」――大げさな衣装をまとった男性が演じる年配の女性役――は19世紀のミュージックホールに由来すると考えられており、この役を射止めることは余興どころか英国の俳優たちのあいだで本物の名誉の証とされる。",
    ),
  },
  {
    e: "🥧",
    n: t("Hogmanay, resolutions and the sales|Hogmanay, propósitos y las rebajas|Hogmanay, résolutions et les soldes|ホグマネイと決意と大安売り",
    ),
    t: t(
      "Scotland's New Year celebration, Hogmanay, runs at least as large as Christmas in some households, with \"first-footing\" — being the first visitor over a neighbour's threshold after midnight, ideally dark-haired and bearing coal, shortbread or whisky — still taken seriously in places. On the 25th, Scots and increasingly the rest of the country toast the poet Robert Burns with haggis piped in on a silver tray and a formal address delivered to it before anyone is allowed to eat.|La celebración de fin de año escocesa, Hogmanay, se vive en algunos hogares con tanta fuerza como la Navidad, y el «first-footing» —ser el primer visitante que cruza el umbral de un vecino tras la medianoche, idealmente moreno y con carbón, shortbread o whisky— aún se toma en serio en algunos lugares.|La célébration du Nouvel An écossais, Hogmanay, se vit dans certains foyers avec autant d'ampleur que Noël, et le « first-footing » — être le premier visiteur à franchir le seuil d'un voisin après minuit, idéalement brun et porteur de charbon, de shortbread ou de whisky — reste pris au sérieux par endroits.|スコットランドの新年の祝い「ホグマネイ」は、家庭によってはクリスマスに劣らぬ規模で祝われ、「ファースト・フッティング」――真夜中を過ぎて最初に隣家の敷居をまたぐ客になること、理想は黒髪で石炭やショートブレッド、ウイスキーを携えて訪れること――がいまも大切にされている土地がある。25日にはスコットランド、そしていまや国じゅうの人々が詩人ロバート・バーンズを祝う。ハギスは銀の盆に乗せてバグパイプとともに運ばれ、食べる前に正式な口上が捧げられる。",
    ),
    f: t(
      "The Burns Night address to the haggis, a poem written by Burns himself in 1786, ends with the reciter plunging a knife into the dish on the line \"an cut you up wi' ready slight,\" a moment of theatre every bit as anticipated as the meal itself.|La oda a la haggis de la Noche de Burns, poema escrito por el propio Burns en 1786, termina con quien la recita clavando un cuchillo en el plato en el verso «y te corta con diestra agilidad», un momento tan esperado como la propia comida.|L'adresse au haggis de la Burns Night, poème écrit par Burns lui-même en 1786, s'achève quand le récitant plante un couteau dans le plat sur le vers « et te découpe d'un geste assuré », un moment de théâtre aussi attendu que le repas lui-même.|バーンズ・ナイトのハギスへの口上は、バーンズ自身が1786年に書いた詩で、朗誦者が「巧みな一撃で切り裂く」という一節でナイフを料理に突き立てて締めくくられる。食事そのものに劣らず心待ちにされる見せ場である。",
    ),
  },
  {
    e: "🏉",
    n: t("The Six Nations and half-term|Las Seis Naciones y las vacaciones de mitad de trimestre|Le Tournoi des Six Nations et les vacances de mi-trimestre|シックス・ネイションズと中間休み",
    ),
    t: t(
      "The Six Nations rugby championship kicks off, pitting England, Scotland, Wales and Ireland against France and Italy across six weekends of grounds that fill regardless of the cold, with the England-Wales fixture nicknamed after the pipe band and choirs that try to out-sing each other before kickoff. Half-term sends families to snow in Scotland's Cairngorms if it has fallen, or to indoor trampoline parks if it has not.|El campeonato de rugby de las Seis Naciones arranca, enfrentando a Inglaterra, Escocia, Gales e Irlanda contra Francia e Italia durante seis fines de semana en estadios que se llenan pese al frío, con el partido Inglaterra-Gales apodado por las bandas de gaitas y coros que compiten por cantar más alto antes del saque.|Le Tournoi des Six Nations de rugby démarre, opposant l'Angleterre, l'Écosse, le pays de Galles et l'Irlande à la France et à l'Italie sur six week-ends dans des stades qui se remplissent malgré le froid, le match Angleterre-Galles étant surnommé d'après les fanfares de cornemuses et les chœurs qui rivalisent avant le coup d'envoi.|ラグビーのシックス・ネイションズが開幕し、イングランド・スコットランド・ウェールズ・アイルランドがフランス・イタリアと6週にわたって対戦する。寒さにも関わらずスタジアムは満員になる。イングランド対ウェールズ戦は、キックオフ前に歌声を競い合うバグパイプ隊と合唱団にちなんだ愛称で呼ばれる。中間休みには、雪が積もっていればケアンゴームズへ、積もっていなければ屋内トランポリン施設へと家族連れが向かう。",
    ),
    f: t(
      "Wales's home ground, the Principality Stadium in Cardiff, has a retractable roof that the Welsh Rugby Union is often accused by opposing fans of closing specifically to trap in crowd noise, a charge officials have never quite denied with a straight face.|El estadio Principality de Cardiff, campo local de Gales, tiene un techo retráctil que los aficionados rivales acusan a menudo a la federación galesa de cerrar para atrapar el ruido del público, una acusación que los responsables nunca han negado del todo con la cara seria.|Le stade Principality de Cardiff, terrain gallois, possède un toit rétractable que les supporters adverses accusent souvent la fédération galloise de fermer exprès pour emprisonner le bruit de la foule, une accusation que les responsables n'ont jamais tout à fait démentie sans sourire.|ウェールズの本拠地、カーディフのプリンシパリティ・スタジアムには開閉式の屋根があり、対戦相手のファンからは観客の歓声を閉じ込めるためにわざと閉めていると度々非難される。関係者はこの非難を真顔できっぱり否定したことがない。",
    ),
  },
  {
    e: "🌼",
    n: t("Two saints' days and the clocks spring forward|Dos días de santos patronos y los relojes adelantan|Deux fêtes de saints patrons et les horloges avancent|二つの守護聖人の日と春の時計進め",
    ),
    t: t(
      "Wales marks Saint David's Day on the first with daffodils and leeks pinned to lapels, and later in the month Northern Ireland turns out for Saint Patrick's Day parades shared with Ireland across the border, green dyed into rivers and even the odd pint. Clocks spring forward at month's end, and Mothering Sunday, older than the American Mother's Day it is often confused with, falls on the fourth Sunday of Lent with simnel cake traditionally marking it.|Gales celebra el Día de San David el primero con narcisos y puerros prendidos en la solapa, y más adelante Irlanda del Norte sale a las calles por el Día de San Patricio con desfiles compartidos con Irlanda al otro lado de la frontera.|Le pays de Galles célèbre la Saint David le premier du mois avec jonquilles et poireaux épinglés au revers, et plus tard dans le mois, l'Irlande du Nord se rassemble pour les défilés de la Saint-Patrick partagés avec l'Irlande de l'autre côté de la frontière.|ウェールズは月初めの聖デイヴィッドの日を、襟にラッパズイセンやリーキを挿して祝う。月の後半には北アイルランドが、国境を越えたアイルランドと分かち合う聖パトリックの日のパレードでにぎわい、川まで緑に染まり、時にはビールまで緑になる。月末には時計が春時間に進み、しばしば混同されるアメリカの母の日より古いマザリング・サンデーが四旬節第四日曜に祝われ、シムネルケーキで彩られるのが習わしである。",
    ),
    f: t(
      "Simnel cake's eleven marzipan balls on top are traditionally said to represent the twelve apostles minus Judas, though some older recipes use twelve, leaving the symbolism a matter families argue about every year while baking.|Se dice tradicionalmente que las once bolas de mazapán sobre el simnel cake representan a los doce apóstoles menos Judas, aunque algunas recetas más antiguas usan doce, dejando el simbolismo como motivo de discusión familiar cada año al hornearlo.|Les onze boules de massepain sur le simnel cake sont traditionnellement censées représenter les douze apôtres moins Judas, bien que certaines recettes plus anciennes en utilisent douze, laissant le symbolisme faire l'objet d'une dispute familiale chaque année au moment de la pâtisserie.|シムネルケーキの上に乗る11個のマジパン玉は、伝統的にはユダを除く12使徒を表すとされるが、古いレシピの中には12個使うものもあり、この象徴の解釈は毎年焼くたびに家族の議論の種になる。",
    ),
  },
];
