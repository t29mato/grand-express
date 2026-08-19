/**
 * 九州地方の県情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。**都市カードで扱った題材
 * (三池・端島・平戸・浦上・桜島・唐津の名護屋城など)はここでは避け、
 * 都市カードが触れていない主題(博多どんたく・山笠・唐津くんち・
 * 長崎ランタンフェスティバルなど)を選んである。**
 *
 * 厄災の神は**がらっぱ**(九州各地の方言名を持つ河童。熊本・天草では
 * がわっぱ、鹿児島ではガラッパと呼ばれる)にした。要石や巨人を使う
 * 他の盤面と違う題材にするため。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const KYUSHU_META = {
  id: "kyushu",
  name: t("Kyūshū|Kyūshū|Kyūshū|九州"),
  blurb: t(
    "Japan's historic window to the world, its coalfields, and a volcano that never stops|La ventana histórica de Japón al mundo, sus cuencas carboníferas y un volcán que nunca se detiene|La fenêtre historique du Japon sur le monde, ses bassins houillers et un volcan qui ne s'arrête jamais|日本が世界に開いていた窓と、炭鉱と、止まらない火山",
  ),
  // 日本・茨城・百名山と同じ円。内部の金額は10000倍で持って表示時に割る。
  cur: { pre: "¥", post: "", mul: 10000 },
  start: "fukuoka",
  cpuNames: ["タン Tan", "デジマ Dejima", "ハイ Hai", "イモ Imo"],
  // 石炭の黒、桜島の灰赤、玄界灘の藍、有田焼の染付。
  stripe: ["#2b2b2b", "#c0392b", "#1e4266", "#3f6fa8"],
};

/** 九州の実際の7県。 */
export const KYUSHU_REGIONS = {
  fuk: t("Fukuoka|Fukuoka|Fukuoka|福岡"),
  sag: t("Saga|Saga|Saga|佐賀"),
  nag: t("Nagasaki|Nagasaki|Nagasaki|長崎"),
  kum: t("Kumamoto|Kumamoto|Kumamoto|熊本"),
  oit: t("Ōita|Ōita|Ōita|大分"),
  miy: t("Miyazaki|Miyazaki|Miyazaki|宮崎"),
  kag: t("Kagoshima|Kagoshima|Kagoshima|鹿児島"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ9種
 * (`src/infrastructure/content/item-effect-rules.ts` は取りまとめ側が当てる。
 * 必要な数値は REGISTER.md に明記してある)。
 */
export const KYUSHU_ITEMS = {
  gatasuki: {
    e: "🛹",
    price: 220,
    kind: "move",
    n: t("Mudflat Sled of the Ariake Sea|Trineo de barro del mar de Ariake|Traîneau à vase de la mer d'Ariake|有明海の潟スキー"),
    d: t(
      "Carried 8–12 squares. You cannot choose the direction.|Te lleva de 8 a 12 casillas. No puedes elegir la dirección.|Emporté de 8 à 12 cases. Tu ne choisis pas la direction.|8〜12マス運ばれる。向きは選べない。",
    ),
    f: t(
      "The Ariake Sea empties out for kilometres at low tide, leaving mudflats too soft to walk and too wet to wheel a cart across, so fishers of mudskippers and shellfish push off standing on a single board instead, one knee down and one leg poling behind. It works only on this particular mud — too thin and the board sinks, too firm and it will not glide.|El mar de Ariake se vacía kilómetros en marea baja, dejando un barro demasiado blando para andar y demasiado húmedo para un carro, así que los pescadores de mútsugoro y marisco se impulsan de pie sobre una sola tabla, con una rodilla apoyada y la otra pierna remando atrás. Solo funciona con este barro concreto.|La mer d'Ariake se vide sur des kilomètres à marée basse, laissant une vase trop molle pour marcher et trop humide pour une charrette ; les pêcheurs de mudskippers et de coquillages se propulsent donc debout sur une seule planche, un genou posé, l'autre jambe ramant derrière. Cela ne fonctionne que sur cette vase précise.|有明海は干潮になると数キロにわたって沖まで潟が現れる。歩くには柔らかすぎ、荷車を通すには湿りすぎたその泥の上を、ムツゴロウや貝を獲る漁師は一枚の板に片膝を突き、もう片方の足で漕いで進む。この泥でなければ成り立たない。柔らかすぎれば沈み、硬すぎれば滑らない。",
    ),
  },
  tetsudoukaishagojikoku: {
    e: "📖",
    price: 420,
    kind: "pre",
    n: t("The Kyūshū Railway Company Timetable|El horario de la Kyūshū Railway Company|L'horaire de la Kyūshū Railway Company|九州鉄道会社の時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The private company that opened Kyūshū's first line in 1889 printed its own timetable rather than wait for the state to catch up, and by the time the government nationalised the network in 1907 it was the largest private railway in Japan. Its old headquarters building still stands in Mojikō.|La compañía privada que abrió la primera línea de Kyūshū en 1889 imprimía su propio horario en vez de esperar al Estado, y para cuando el gobierno nacionalizó la red en 1907 era el mayor ferrocarril privado de Japón.|La compagnie privée qui ouvrit la première ligne du Kyūshū en 1889 imprimait son propre horaire sans attendre l'État, et lorsque le gouvernement nationalisa le réseau en 1907, c'était le plus grand chemin de fer privé du Japon.|1889年に九州最初の路線を開業させた民営の九州鉄道会社は、国の整備を待たず独自の時刻表を刷った。1907年に国有化された時点では日本最大の私鉄になっていた。門司港には今も旧本社の建物が残る。",
    ),
  },
  relaykamome: {
    e: "🚆",
    price: 340,
    kind: "pre",
    n: t("Relay Kamome Transfer Ticket|Billete de trasbordo Relay Kamome|Billet de correspondance Relay Kamome|リレーかもめの乗継券"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "When the Nishi-Kyūshū Shinkansen opened in 2022 without a full-speed link to Hakata, this relay train was created just to carry passengers the remaining conventional-gauge distance from Takeo-Onsen, changing trains on the same platform. It exists purely because a gauge dispute was never settled.|Cuando el Nishi-Kyūshū Shinkansen abrió en 2022 sin enlace de alta velocidad completo a Hakata, se creó este tren de enlace solo para llevar a los pasajeros el resto del trayecto en vía convencional desde Takeo-Onsen. Existe únicamente porque una disputa de ancho de vía nunca se resolvió.|Lorsque le Nishi-Kyūshū Shinkansen ouvrit en 2022 sans liaison à pleine vitesse jusqu'à Hakata, ce train de correspondance fut créé pour parcourir le reste du trajet en voie classique depuis Takeo-Onsen. Il existe uniquement parce qu'un différend sur l'écartement des voies n'a jamais été tranché.|2022年、西九州新幹線が博多までのフル規格連絡のないまま開業した際、武雄温泉から先の在来線区間だけを埋めるために作られたのがこの乗継列車である。同じホームで乗り換える。存在理由はただ一つ、軌間を巡る対立が決着していないからである。",
    ),
  },
  tsubametokkyu: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("Tsubame Limited Express Ticket|Billete del expreso limitado Tsubame|Billet de l'express limité Tsubame|特急つばめの乗車券"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Tsubame was the name given to the Kyūshū Shinkansen's first trains when the Kagoshima-route section opened in 2004, borrowed from a pre-war express so fast it was nicknamed the swallow; the full Hakata–Kagoshima line was not finished until 2011. Each car was built with a different regional wood for its interior panelling.|Tsubame fue el nombre dado a los primeros trenes del Kyūshū Shinkansen cuando abrió el tramo hacia Kagoshima en 2004, tomado de un expreso de antes de la guerra tan rápido que lo apodaban la golondrina; la línea completa Hakata–Kagoshima no se acabó hasta 2011.|Tsubame fut le nom donné aux premiers trains du Kyūshū Shinkansen lors de l'ouverture du tronçon vers Kagoshima en 2004, emprunté à un express d'avant-guerre si rapide qu'on le surnommait l'hirondelle ; la ligne complète Hakata–Kagoshima ne fut achevée qu'en 2011.|「つばめ」は2004年、鹿児島ルートの区間が先行開業した際に九州新幹線の最初の列車に付けられた名で、あまりの速さから「つばめ」と呼ばれた戦前の特急にちなむ。博多―鹿児島の全線開業は2011年までかかった。各車両の内装には県ごとに異なる木材が使われている。",
    ),
  },
  kyuurinohono: {
    e: "🥒",
    price: 300,
    kind: "passive",
    n: t("Cucumber Offering|Ofrenda de pepino|Offrande de concombre|きゅうりの奉納"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "River spirits across Kyūshū are said to favour cucumbers above all food, and some households still carve a family name into one and float it downstream before children swim, a small bargain struck before anyone gets in the water.|Se dice que los espíritus del río de todo Kyūshū prefieren el pepino a cualquier otro alimento, y algunas casas aún graban un nombre en uno y lo dejan flotar río abajo antes de que los niños se bañen.|On dit que les esprits des rivières du Kyūshū préfèrent le concombre à toute autre nourriture, et certaines familles y gravent encore un nom avant de le laisser flotter en aval, avant que les enfants ne se baignent.|九州各地の河童は何よりきゅうりを好むとされ、今も家によっては家族の名を刻んだきゅうりを子供が泳ぐ前に川へ流す。誰かが水に入る前に交わす、ささやかな取り決めである。",
    ),
  },
  suijinomamori: {
    e: "🎐",
    price: 420,
    kind: "pre",
    n: t("Suijin Shrine Ward|Amuleto del santuario Suijin|Amulette du sanctuaire Suijin|水神様のお守り"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Almost every river town in Kyūshū keeps a small shrine to its own water god at the point where a ford or a weir once stood, and boatmen would stop to leave a coin before a difficult stretch. The custom outlived most of the fords themselves.|Casi todo pueblo ribereño de Kyūshū guarda un pequeño santuario a su propio dios del agua en el lugar donde hubo un vado o una presa, y los barqueros se detenían a dejar una moneda antes de un tramo difícil.|Presque chaque ville riveraine du Kyūshū garde un petit sanctuaire à son propre dieu de l'eau, à l'endroit d'un ancien gué ou d'un barrage, et les bateliers s'arrêtaient y laisser une pièce avant un passage difficile.|九州の川沿いの町のほとんどには、かつて渡し場や堰があった場所に小さな水神社が祀られている。船頭は難所の手前でそこに小銭を置いて発った。渡し場そのものはとうに無くなっても、この習わしは残っている。",
    ),
  },
  imarizuke: {
    e: "🏺",
    price: 300,
    kind: "pre",
    n: t("Sold Imari Export Crate|Cajón de exportación de Imari vendido|Caisse d'exportation d'Imari vendue|売った伊万里の積出箱"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Straw-packed crates of porcelain once left Imari's wharf by the thousand for Dejima, and a chipped or mismatched piece that would never survive the sea voyage still fetched a fair price sold locally instead.|Cajones de porcelana envueltos en paja salían por miles del muelle de Imari rumbo a Dejima, y una pieza desportillada o desparejada que nunca habría sobrevivido la travesía se vendía bien igualmente en el mercado local.|Des caisses de porcelaine emballées de paille quittaient par milliers le quai d'Imari pour Dejima, et une pièce ébréchée ou dépareillée qui n'aurait jamais survécu à la traversée se vendait tout de même bien sur place.|藁で梱包された磁器の箱は、かつて何千と伊万里の岸壁から出島へ向けて積み出された。航海に耐えられない欠けや不揃いの品は、その場で地元に売っても十分な値が付いた。",
    ),
  },
  botayamasuberidai: {
    e: "🛝",
    price: 380,
    kind: "pre",
    n: t("Botayama Slag-Hill Slide|Tobogán del terril botayama|Toboggan du terril botayama|ボタ山の滑り台"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Several of the black slag hills left behind by the closed Chikuhō mines have been grassed over and turned into parks, and children now sled down slopes that miners once dumped mine waste onto by the wagonload.|Varias de las colinas negras de escombros dejadas por las minas cerradas de Chikuhō se han cubierto de hierba y convertido en parques, y los niños se deslizan hoy por laderas donde antes se volcaban vagonetas de estéril.|Plusieurs des collines noires de déblais laissées par les mines fermées de Chikuhō ont été engazonnées et transformées en parcs, et des enfants dévalent aujourd'hui des pentes où l'on déversait jadis des wagonnets de stérile.|閉山した筑豊の炭鉱が残した黒いボタ山のいくつかは芝が張られて公園になり、かつて捨て石を積んだトロッコが行き来した斜面を、いまは子供たちが滑り降りている。",
    ),
  },
  kangientouan: {
    e: "📜",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 150,
    kind: "passive",
    n: t("Kangien Test Paper|Examen de la academia Kangien|Copie d'examen du Kangien|咸宜園の答案"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Hita's Confucian academy ranked its pupils purely by test score in a nine-level system with no regard for rank or birth, so a low-born student who wrote a strong answer could outrank a samurai's son who wrote a weak one.|La academia confuciana de Hita clasificaba a sus alumnos solo por la nota del examen, en un sistema de nueve niveles ajeno al rango o al nacimiento, así que un alumno humilde con una buena respuesta podía superar al hijo de un samurái con una mala.|L'académie confucéenne de Hita classait ses élèves uniquement selon leur note d'examen, dans un système à neuf niveaux indifférent au rang ou à la naissance : un élève humble à la bonne réponse pouvait ainsi dépasser le fils d'un samouraï à la mauvaise.|日田の私塾・咸宜園は、身分や生まれに関係なく試験の成績だけで九段階に生徒を格付けした。良い答案を書けば、家柄の低い者が武家の子を追い抜くこともあった。",
    ),
  },
};

/**
 * 厄災の神。がらっぱ(河童の九州方言名。天草・熊本では「がわっぱ」、
 * 鹿児島では「ガラッパ」)。都市カードが扱わない題材で、川と海の両方を
 * 縄張りにする九州らしい姿にした。
 */
export const KYUSHU_SPIRIT = {
  e: "🥒",
  n: t("Garappa|Garappa|Garappa|がらっぱ"),
  big: t("The Sumo Challenge|El desafío de sumo|Le défi de sumo|相撲の挑み"),
  ward: "kyuurinohono",
  arrive: t(
    "<b>🥒 A garappa has taken a liking to you.</b> Older residents along the rivers of Kyūshū still warn children not to swim alone at dusk, when the water spirits are said to pull a leg from below and challenge whoever they catch to a bout of sumo. He is not malicious, only proud and easily bored, and he has decided <b>{0}</b>, the traveler farthest from the destination, looks like a worthy match. He now walks the riverbanks beside them and brings a misfortune every turn.|<b>🥒 Un garappa te ha tomado cariño.</b> Los mayores de las riberas de Kyūshū aún advierten a los niños de no nadar solos al anochecer, cuando se dice que los espíritus del agua tiran de una pierna desde abajo y retan a quien atrapan a un combate de sumo. No es malicioso, solo orgulloso y fácil de aburrir, y ha decidido que <b>{0}</b>, el más lejano del destino, parece un buen rival. Ahora camina por la orilla a su lado y trae una desgracia cada turno.|<b>🥒 Un garappa s'est pris d'affection pour toi.</b> Les anciens le long des rivières du Kyūshū avertissent encore les enfants de ne pas nager seuls au crépuscule, quand les esprits de l'eau tireraient une jambe par en dessous et défieraient qui ils attrapent à un combat de sumo. Il n'est pas malveillant, seulement fier et vite lassé, et il a jugé <b>{0}</b>, le plus éloigné du but, digne d'un affrontement. Il marche désormais sur la berge à ses côtés et amène un malheur chaque tour.|<b>🥒 がらっぱに気に入られた。</b> 九州の川沿いでは、夕暮れに一人で泳ぐと水の中から足を引かれ、捕まえた相手に相撲を挑むと今も年寄りが子供に言い聞かせる。悪意はなく、ただ誇り高くすぐ退屈するだけだが、目的地から最も遠い <b>{0}</b> を好敵手と見定めたらしい。いま岸辺を並んで歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🥒 <b>The garappa</b> turns and paddles after <b>{0}</b>, farthest from {1}.|🥒 <b>El garappa</b> se gira y nada tras <b>{0}</b>, el más lejano de {1}.|🥒 <b>Le garappa</b> se retourne et pagaie vers <b>{0}</b>, le plus loin de {1}.|🥒 <b>がらっぱ</b> が向きを変え、{1} から最も遠い <b>{0}</b> のほうへ水を掻いて進んだ。",
  ),
  wake: t(
    "<b>{0}</b> has kept the garappa's company for four turns without breaking away. Bored of walking, he plants his feet on the bank and calls out a real challenge — <b>the Sumo Challenge</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con el garappa sin librarse de él. Aburrido de caminar, planta los pies en la orilla y lanza un desafío de verdad: comienza <b>el desafío de sumo</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> tient compagnie au garappa depuis quatre tours sans s'en défaire. Lassé de marcher, il plante ses pieds sur la berge et lance un vrai défi : <b>le défi de sumo</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターン歩いても、がらっぱから離れられなかった。歩くのに飽きた彼は岸に足を踏ん張り、本気の挑みを口にする。<b>相撲の挑み</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the kappa's love of sumo and its weakness for cucumbers are told the same way in nearly every version of the legend across Japan, but Kyūshū is unusual for keeping so many local names for the same creature — gawappa, garappa, hyōsube — one for nearly every river system.|<b>Tras la historia:</b> la afición del kappa al sumo y su debilidad por el pepino se cuentan igual en casi toda versión de la leyenda en Japón, pero Kyūshū es raro por conservar tantos nombres locales para la misma criatura.|<b>Derrière l'histoire :</b> le goût du kappa pour le sumo et sa faiblesse pour le concombre se racontent de la même façon dans presque toutes les versions de la légende au Japon, mais le Kyūshū est singulier par le nombre de noms locaux qu'il garde pour la même créature.|<b>物語の背景:</b> 河童が相撲を好み、きゅうりに弱いという話は日本各地でほぼ同じ形で語られるが、九州は同じ生き物に「がわっぱ」「がらっぱ」「ひょうすべ」と、水系ごとに違う呼び名を今も残している点が珍しい。",
  ),
  pleased: t(
    "He loses interest in the match and tosses something from his sack onto the bank instead. <b>{0}</b> gains <span class='money'>+{1}</span>.|Pierde interés en el combate y arroja algo de su saco a la orilla. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il perd tout intérêt pour le combat et jette plutôt quelque chose de son sac sur la berge. <b>{0}</b> gagne <span class='money'>+{1}</span>.|勝負への興味を失った彼は、代わりに背負った袋から何かを岸へ放った。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A cucumber, carved with a name, is set floating past him. He forgets the match entirely and paddles off after it, leaving <b>{0}</b> alone this turn.|Se deja flotar ante él un pepino grabado con un nombre. Olvida el combate por completo y nada tras él, dejando en paz a <b>{0}</b> esta vez.|On laisse flotter devant lui un concombre gravé d'un nom. Il oublie complètement le combat et pagaie à sa poursuite, laissant <b>{0}</b> tranquille ce tour-ci.|名を刻んだきゅうりを一つ、彼の前に流した。勝負のことはすっかり忘れて追いかけていき、このターンは <b>{0}</b> を放っておいた。",
  ),
};

/** 災難7件。がらっぱの縄張り(川と海)に沿わせてある。 */
export const KYUSHU_DOOM = [
  {
    id: "kougai-jiban",
    n: t("The ground under the tracks sinks|El suelo bajo las vías se hunde|Le sol sous les rails s'affaisse|線路の下が抜ける"),
    t: t(
      "Old mine tunnels honeycomb the ground here, and every so often the roof of one finally gives way under a road or a rail bed. Repair crews cannot simply fill the hole; they first have to work out which century's tunnel collapsed.|Viejos túneles de mina horadan el subsuelo, y de vez en cuando el techo de uno cede al fin bajo una carretera o una vía. Las cuadrillas no pueden rellenar el hueco sin más: primero han de averiguar de qué siglo era el túnel.|De vieux tunnels de mine truffent le sous-sol, et de temps à autre le toit de l'un d'eux finit par céder sous une route ou une voie. Les équipes ne peuvent pas simplement combler le trou : il faut d'abord établir de quel siècle date le tunnel effondré.|この土地の地下は古い坑道が蜂の巣のように走り、時おりどれかの天井が道路や線路の下でついに抜け落ちる。復旧班は穴を埋める前に、まずそれが何世紀の坑道だったのかを突き止めねばならない。",
    ),
  },
  {
    id: "shiokaze-sabi",
    n: t("Salt wind eats the rails|El viento salado corroe los raíles|Le vent salé ronge les rails|潮風が線路を錆びさせる"),
    t: t(
      "A week of onshore wind leaves a white crust on anything metal, and the points at the coastal junctions seize until they are wire-brushed clean by hand. Nowhere in Kyūshū is more than about 100 km from salt water, so there is no line the wind cannot reach.|Una semana de viento de mar deja una costra blanca en todo lo metálico, y las agujas de los empalmes costeros se traban hasta que se limpian a mano con cepillo. En Kyūshū no hay lugar a más de unos 100 km del mar salado.|Une semaine de vent du large laisse une croûte blanche sur tout ce qui est métallique, et les aiguillages des jonctions côtières se grippent jusqu'à un nettoyage manuel à la brosse métallique. Nulle part au Kyūshū n'est à plus de 100 km environ de l'eau salée.|海からの風が一週間も吹けば、金属という金属に白い塩の膜が張る。海沿いの分岐器は詰まり、手でワイヤーブラシをかけるまで動かない。九州で海水から100km以上離れた場所はどこにもない。",
    ),
  },
  {
    id: "gouu-keihou",
    n: t("A rain warning nobody can outrun|Una alerta de lluvia de la que nadie escapa|Une alerte pluie que personne ne peut devancer|逃げ切れない大雨警報",
    ),
    t: t(
      "Kyūshū sits at the front of the rainy season each year, and the same warm, wet air that waters the rice fields can also stall over one valley for a day and drop a month of rain in an afternoon. The warning comes, but the water is often already at the door.|Kyūshū encabeza cada año la temporada de lluvias, y el mismo aire cálido y húmedo que riega los arrozales puede estancarse sobre un valle un día entero y descargar un mes de lluvia en una tarde. La alerta llega, pero el agua suele estar ya en la puerta.|Le Kyūshū est chaque année en première ligne de la saison des pluies, et le même air chaud et humide qui arrose les rizières peut stagner un jour entier sur une vallée et y déverser un mois de pluie en un après-midi. L'alerte arrive, mais l'eau est souvent déjà à la porte.|九州は毎年、梅雨前線がまず通る場所にある。田を潤すのと同じ暖かく湿った空気が、一つの谷にまる一日居座り、ひと月分の雨を一日で降らせることもある。警報が出た時には、水はもう戸口まで来ていることが多い。",
    ),
  },
  {
    id: "kanmon-kiri",
    n: t("Fog closes the strait|La niebla cierra el estrecho|Le brouillard ferme le détroit|海峡に霧が下りる"),
    t: t(
      "When warm and cold water meet in the narrow channel, fog can drop visibility to a few metres within minutes, and ferries and small craft anchor where they are until it lifts. Trains through the undersea tunnel keep running, which is the one advantage of going under instead of across.|Cuando el agua cálida y la fría se encuentran en el canal estrecho, la niebla puede reducir la visibilidad a pocos metros en minutos, y ferris y embarcaciones pequeñas fondean donde están hasta que se levanta. Los trenes por el túnel submarino siguen circulando.|Quand l'eau chaude et l'eau froide se rencontrent dans le chenal étroit, le brouillard peut réduire la visibilité à quelques mètres en quelques minutes, et ferries et petites embarcations mouillent où ils sont jusqu'à ce qu'il se lève. Les trains du tunnel sous-marin continuent de circuler.|狭い海峡で暖かい水と冷たい水がぶつかると、数分で視界が数メートルまで落ちることがある。フェリーや小舟はその場に錨を下ろして霧が晴れるのを待つ。海底トンネルを行く列車だけは、渡らずに潜っているぶん動き続ける。",
    ),
  },
  {
    id: "kazan-bai-kansoku",
    n: t("Ash grounds the flights|La ceniza detiene los vuelos|La cendre cloue les vols au sol|降灰が便を止める"),
    t: t(
      "A heavier eruption than usual sends ash high enough to close the nearest airport for the day, and the fine grit that gets into engines is treated as seriously as any storm. On the ground, everyone simply keeps a broom by the door and sweeps.|Una erupción más fuerte de lo habitual lanza ceniza lo bastante alto para cerrar el aeropuerto más cercano por el día, y el polvo fino que entra en los motores se toma tan en serio como cualquier tormenta.|Une éruption plus forte que d'habitude projette de la cendre assez haut pour fermer l'aéroport le plus proche pour la journée, et la fine poussière qui s'infiltre dans les moteurs est prise aussi au sérieux qu'une tempête.|いつもより強い噴火は、灰を最寄りの空港がその日じゅう閉まるほどの高さまで噴き上げる。エンジンに入り込む細かな粒子は、嵐と同じ重さで扱われる。地上では誰もが戸口に箒を置き、ただ掃くだけである。",
    ),
  },
  {
    id: "taifuu-shinro",
    n: t("The typhoon changes course overnight|El tifón cambia de rumbo de noche|Le typhon change de cap dans la nuit|台風が夜のうちに進路を変える"),
    t: t(
      "The forecast track missed by 80 km while everyone slept, and the side of the storm that was supposed to stay offshore came ashore instead. Kyūshū takes the first landfall of most typhoons reaching Japan, which means the least warning of anywhere in the country.|El pronóstico falló por 80 km mientras todos dormían, y el lado de la tormenta que debía quedarse en el mar tocó tierra en su lugar. Kyūshū recibe el primer desembarco de la mayoría de los tifones que llegan a Japón.|La trajectoire prévue s'est trompée de 80 km pendant que tout le monde dormait, et le flanc de la tempête censé rester au large a touché terre à la place. Le Kyūshū essuie le premier atterrissage de la plupart des typhons qui atteignent le Japon.|寝ているあいだに進路予報は80kmも外れ、沖にとどまるはずだった側が上陸してしまった。日本に来る台風の多くは九州に最初に上陸する。つまり国内でいちばん警報の猶予が短い土地でもある。",
    ),
  },
  {
    id: "kigyou-torikeshi",
    n: t("The transfer train is cancelled|El tren de trasbordo se cancela|Le train de correspondance est annulé|乗継列車が運休になる"),
    t: t(
      "The connecting service between the two halves of the shinkansen line is suspended for the day, and everyone bound west has to backtrack and find a bus instead. The gap between the two networks was never meant to be permanent, but nobody has fixed a date for closing it.|El servicio de enlace entre las dos mitades de la línea shinkansen queda suspendido por el día, y todos los que van hacia el oeste tienen que retroceder y buscar un autobús. El hueco entre las dos redes nunca debía ser permanente, pero nadie ha fijado fecha para cerrarlo.|La correspondance entre les deux moitiés de la ligne shinkansen est suspendue pour la journée, et tous ceux qui vont vers l'ouest doivent rebrousser chemin et chercher un bus. L'écart entre les deux réseaux ne devait jamais être permanent, mais personne n'a fixé de date pour le combler.|新幹線の二つの区間をつなぐ乗継列車がその日は運休になり、西へ向かう者は皆、引き返してバスを探す羽目になる。二つの区間の隙間は本来ずっと続くはずのものではなかったが、埋める期日は誰も決めていない。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。都市カードで扱った題材は避け、
 * 博多どんたく・山笠・唐津くんち・長崎ランタンフェスティバルなど、
 * カードが触れていない年中行事を軸にした。
 */
export const KYUSHU_SEASONS = [
  {
    e: "🌸",
    n: t("The first blossom in the country|La primera flor del país|La première fleur du pays|国内で最初に咲く花"),
    t: t(
      "The cherry blossom forecast almost always starts somewhere in Kyūshū before anywhere else in Japan, and the trees along the region's rivers and moats open while the rest of the country is still waiting.|El pronóstico del florecimiento del cerezo casi siempre arranca en algún punto de Kyūshū antes que en el resto de Japón, y los árboles junto a ríos y fosos de la región abren mientras el resto del país sigue esperando.|Les prévisions de floraison des cerisiers démarrent presque toujours quelque part au Kyūshū avant le reste du Japon, et les arbres le long des rivières et des douves de la région s'ouvrent quand le reste du pays attend encore.|桜の開花予想は、ほぼ毎年どこかの九州から始まる。川沿いや堀端の木々が咲くころ、国のほかの場所はまだ待っている。",
    ),
    f: t(
      "Kyūshū's warm winters put it consistently among the first regions to reach the temperature threshold that triggers blossom, ahead of Tokyo by one to two weeks most years.|Los inviernos cálidos de Kyūshū la sitúan constantemente entre las primeras regiones en alcanzar el umbral de temperatura que dispara la floración, una o dos semanas antes que Tokio la mayoría de los años.|Les hivers doux du Kyūshū en font régulièrement l'une des premières régions à atteindre le seuil de température déclenchant la floraison, une à deux semaines avant Tokyo la plupart des années.|九州の暖かい冬のおかげで、開花の目安となる気温にはほぼ毎年いちばん早く達します。東京より1〜2週間早いことが多いです。",
    ),
  },
  {
    e: "🎏",
    n: t("The whole city dances in the street|Toda la ciudad baila en la calle|Toute la ville danse dans la rue|街じゅうが通りで踊る"),
    t: t(
      "For three days the main streets close to traffic and fill instead with dancers, floats and brass bands, one of the largest street festivals in the country by the number of people who turn out to watch or join in.|Durante tres días las calles principales se cierran al tráfico y se llenan de bailarines, carrozas y bandas de música: uno de los mayores festivales callejeros del país por el número de asistentes.|Trois jours durant, les grandes artères ferment à la circulation et se remplissent de danseurs, de chars et de fanfares : l'une des plus grandes fêtes de rue du pays par le nombre de participants et de spectateurs.|三日間、大通りは車を締め出され、踊り手と山車と鼓笛隊で埋まる。見物や参加のために出てくる人の数では国内有数の街頭祭りである。",
    ),
    f: t(
      "The festival began in 1962 as a renaming of an older Matsubayashi tradition, and today draws crowds numbered in the millions over the three days.|El festival empezó en 1962 al renombrar una tradición Matsubayashi más antigua, y hoy reúne multitudes de millones de personas en los tres días.|La fête a débuté en 1962 en rebaptisant une tradition Matsubayashi plus ancienne, et rassemble aujourd'hui des millions de personnes sur les trois jours.|この祭りは1962年、より古い松囃子の伝統を改称する形で始まりました。今では三日間で数百万人規模の人出になります。",
    ),
  },
  {
    e: "🐟",
    n: t("Mudskippers wake on the tideflats|Los peces saltarines despiertan en el fangal|Les périophtalmes s'éveillent sur la vasière|干潟でムツゴロウが動き出す"),
    t: t(
      "As the rainy season sets in, the mud of the Ariake Sea warms enough for mudskippers to come up out of their burrows in numbers, skipping across the surface on their fins in front of anyone walking the flats at low tide.|Al llegar la temporada de lluvias, el barro del mar de Ariake se calienta lo bastante para que los peces saltarines salgan en número de sus madrigueras, brincando sobre la superficie ante quien camina por el fangal en marea baja.|À l'arrivée de la saison des pluies, la vase de la mer d'Ariake se réchauffe assez pour que les périophtalmes sortent en nombre de leurs terriers, sautillant sur la surface devant quiconque marche sur la vasière à marée basse.|梅雨に入ると有明海の泥は十分に温まり、ムツゴロウが巣穴から次々と出てくる。干潮の潟を歩く人の前で、ひれを使って泥の上を跳ねる。",
    ),
    f: t(
      "The Ariake Sea has the largest tidal range in Japan, uncovering mudflats that stretch kilometres from shore and support species found nowhere else in the country.|El mar de Ariake tiene la mayor amplitud de marea de Japón, dejando al descubierto fangales que se extienden kilómetros desde la orilla y albergan especies que no se hallan en ningún otro lugar del país.|La mer d'Ariake a le plus fort marnage du Japon, découvrant des vasières qui s'étendent sur des kilomètres et abritent des espèces introuvables ailleurs dans le pays.|有明海は日本でいちばん干満の差が大きい海です。岸から数キロにわたって現れる干潟には、国内のほかの場所にはいない生き物が暮らしています。",
    ),
  },
  {
    e: "🏮",
    n: t("A ton of float, carried at a run|Una tonelada de carroza, cargada corriendo|Une tonne de char, portée en courant|一トンの山を担いで走る"),
    t: t(
      "Before dawn on the festival's last day, teams of men carry one-tonne wooden floats through the streets at a run, timed to the second, a display of strength that has been rehearsed and refined since the 1600s.|Antes del amanecer del último día del festival, equipos de hombres cargan carrozas de madera de una tonelada por las calles corriendo, cronometradas al segundo, una demostración de fuerza ensayada desde el siglo XVII.|Avant l'aube du dernier jour de la fête, des équipes d'hommes portent en courant des chars de bois d'une tonne à travers les rues, chronométrés à la seconde, une démonstration de force répétée depuis le XVIIe siècle.|祭りの最終日、夜明け前に男たちの一団が一トンの木の山車を担いで通りを駆け抜ける。秒単位で計られるその力比べは、17世紀から練り上げられてきた。",
    ),
    f: t(
      "The floats can stand over 10 m tall when displayed but are stripped down to a running height of about 5 m for the race itself, so they fit under the streets' utility wires.|Las carrozas pueden superar los 10 m expuestas, pero se reducen a unos 5 m para la carrera, de modo que pasen bajo los cables de las calles.|Les chars peuvent dépasser 10 m de haut lorsqu'ils sont exposés, mais sont ramenés à environ 5 m pour la course, afin de passer sous les fils électriques des rues.|山車は展示されているときは10mを超えますが、走る本番では電線をくぐれるよう約5mまで低く組み替えられます。",
    ),
  },
  {
    e: "🌀",
    n: t("The season Kyūshū meets first|La temporada que Kyūshū recibe primero|La saison que le Kyūshū affronte en premier|九州が最初に受け止める季節"),
    t: t(
      "Late-summer storms tracking up from the Pacific make landfall on Kyūshū before anywhere else in the country most years, and fishing boats crowd into harbour days ahead of a system still far out at sea.|Las tormentas de finales de verano que suben desde el Pacífico tocan tierra en Kyūshū antes que en ningún otro lugar del país la mayoría de los años, y los barcos de pesca se apiñan en puerto días antes de que el sistema esté aún lejos, en el mar.|Les tempêtes de fin d'été remontant du Pacifique touchent terre au Kyūshū avant le reste du pays la plupart des années, et les bateaux de pêche s'entassent au port des jours avant qu'un système encore lointain n'approche.|太平洋から上ってくる晩夏の嵐は、ほとんどの年、日本のどこよりも先に九州へ上陸する。まだ遠く沖にある段階から、漁船は港へ何日も前から集まり始める。",
    ),
    f: t(
      "Kyūshū's position makes it the first major landmass most Pacific typhoons cross, which is why its buildings and farms are built with stronger wind-resistance standards than much of the rest of Japan.|La posición de Kyūshū la convierte en la primera gran masa de tierra que cruzan la mayoría de los tifones del Pacífico, por lo que sus edificios y granjas se construyen con normas de resistencia al viento más estrictas que en buena parte del resto de Japón.|La position du Kyūshū en fait la première grande masse terrestre que traversent la plupart des typhons du Pacifique, d'où des normes de résistance au vent plus strictes pour ses bâtiments et ses fermes que dans une bonne partie du reste du Japon.|九州の位置は、太平洋から来るほとんどの台風が最初に横切る大きな陸地にあたります。建物や農業施設の耐風基準が日本の他の多くの地域より厳しいのはそのためです。",
    ),
  },
  {
    e: "🌾",
    n: t("The plain turns gold at once|La llanura se dora de golpe|La plaine dore d'un coup|平野が一斉に金色になる"),
    t: t(
      "The rice across the Chikushi Plain ripens within days of one another, so harvest machines move field to field almost without stopping, working ahead of whichever typhoon is forecast next.|El arroz de la llanura de Chikushi madura casi al mismo tiempo, así que las cosechadoras van de campo en campo casi sin parar, adelantándose al próximo tifón previsto.|Le riz de la plaine de Chikushi mûrit à quelques jours près, si bien que les moissonneuses passent de champ en champ presque sans s'arrêter, prenant de vitesse le prochain typhon annoncé.|筑紫平野の稲はほぼ同時に実り、コンバインはほとんど休まず田から田へ移っていく。次に来ると予報された台風の前に済ませようとしている。",
    ),
    f: t(
      "The Chikushi Plain is one of Kyūshū's few large stretches of flat land, which is exactly why its rice ripens on a uniform schedule rather than valley by valley as in the mountains.|La llanura de Chikushi es una de las pocas grandes extensiones llanas de Kyūshū, por eso su arroz madura en un calendario uniforme y no valle a valle como en la montaña.|La plaine de Chikushi est l'une des rares grandes étendues plates du Kyūshū, ce qui explique que son riz mûrisse selon un calendrier uniforme plutôt que vallée par vallée comme en montagne.|筑紫平野は九州でも数少ない広い平地です。谷ごとに順に実る山間部と違い、稲がそろって実るのはそのためです。",
    ),
  },
  {
    e: "🍠",
    n: t("The harvest goes straight to the still|La cosecha va directa al alambique|La récolte part droit à l'alambic|掘った芋がそのまま蒸留所へ"),
    t: t(
      "Sweet potatoes come out of the volcanic ash soil across the south by the truckload, and much of the crop goes almost directly from the field to the steam and the still rather than to market.|Los boniatos salen del suelo de ceniza volcánica del sur a camionadas, y buena parte de la cosecha va casi directa del campo al vapor y al alambique, no al mercado.|Les patates douces sortent du sol de cendres volcaniques du sud par camions entiers, et une bonne part de la récolte part presque directement du champ à la vapeur et à l'alambic, sans passer par le marché.|南部の火山灰土壌からトラック単位で掘り出されるさつまいもは、市場へではなく、畑からほぼそのまま蒸し器と蒸留所へ運ばれる。",
    ),
    f: t(
      "The distilling season runs opposite to rice shōchū, whose base grain is harvested earlier, so the two industries share the same stills at different times of year rather than competing for them.|La temporada de destilación va al contrario que el shōchū de arroz, cuyo grano se cosecha antes, así que ambas industrias comparten los mismos alambiques en épocas distintas del año.|La saison de distillation est décalée par rapport au shōchū de riz, dont le grain se récolte plus tôt : les deux filières partagent donc les mêmes alambics à des moments différents de l'année.|この蒸留の時期は、収穫がもっと早い米焼酎とは時期がずれています。そのため二つの産業は同じ蒸留設備を、奪い合うのではなく年のうちで分け合って使います。",
    ),
  },
  {
    e: "🎎",
    n: t("Fourteen floats through the old town|Catorce carrozas por el casco antiguo|Quatorze chars dans la vieille ville|旧市街を行く十四台の曳山"),
    t: t(
      "Lacquered floats shaped like helmets, dolphins and dragons, some over 300 years old, are hauled by rope through narrow streets for three days by teams whose grandfathers pulled the same rope on the same corner.|Carrozas lacadas con forma de yelmo, delfín y dragón, algunas de más de 300 años, son arrastradas con cuerdas por calles estrechas durante tres días por equipos cuyos abuelos tiraron de la misma cuerda en la misma esquina.|Des chars laqués en forme de casque, de dauphin et de dragon, certains vieux de plus de 300 ans, sont tirés à la corde dans des rues étroites pendant trois jours par des équipes dont les grands-pères tiraient déjà la même corde au même coin de rue.|兜や鯛、龍をかたどった漆塗りの曳山は、三百年を超えるものもあり、三日間、狭い路地を綱で引かれていく。曳き手には、祖父が同じ角で同じ綱を引いていた者も多い。",
    ),
    f: t(
      "The float-pulling festivals of Karatsu and several other Kyūshū towns are grouped together with dozens of others nationwide under a single UNESCO Intangible Cultural Heritage listing for float, drum-tower and portable-shrine festivals.|Los festivales de arrastre de carrozas de Karatsu y otras localidades de Kyūshū se agrupan con docenas de otros de todo el país en una única declaración de la UNESCO como Patrimonio Cultural Inmaterial.|Les fêtes de chars tirés de Karatsu et de plusieurs autres villes du Kyūshū sont regroupées avec des dizaines d'autres à travers le pays sous un même classement UNESCO au patrimoine culturel immatériel.|唐津をはじめ九州のいくつかの町の曳山行事は、全国の同種の祭り数十件とともに、ユネスコ無形文化遺産「山・鉾・屋台行事」として一括で登録されています。",
    ),
  },
  {
    e: "🍊",
    n: t("The hillsides turn orange|Las laderas se tiñen de naranja|Les coteaux virent à l'orange|斜面がみかん色になる"),
    t: t(
      "Terraced hillsides facing the sea across the region turn orange as unshū mikan ripen, and picking runs for weeks on slopes too steep for anything but hand-carried baskets and a rope for balance.|Las laderas escalonadas frente al mar se tornan naranjas cuando maduran las mikan unshū, y la recogida dura semanas en cuestas demasiado empinadas para otra cosa que cestas cargadas a mano y una cuerda de apoyo.|Les coteaux en terrasses face à la mer virent à l'orange à mesure que mûrissent les mikan unshū, et la cueillette dure des semaines sur des pentes trop raides pour autre chose que des paniers portés à la main et une corde d'appui.|海に面した段々畑は、温州みかんが実ると一帯がオレンジ色に染まる。収穫は何週間も続き、あまりの急斜面のためかごを手で担ぎ、命綱代わりの縄を頼りに作業する。",
    ),
    f: t(
      "Kyūshū's coastal prefectures are among Japan's largest mikan producers, helped by hillsides that drain fast and reflect extra sunlight off the sea onto the fruit.|Las prefecturas costeras de Kyūshū están entre las mayores productoras de mikan de Japón, favorecidas por laderas de drenaje rápido que reflejan luz extra del mar sobre el fruto.|Les préfectures côtières du Kyūshū comptent parmi les plus grandes productrices de mikan du Japon, aidées par des coteaux au drainage rapide qui reflètent sur le fruit une lumière supplémentaire venue de la mer.|九州の沿岸各県は日本有数のみかんの産地です。水はけの良い斜面と、海面から反射して実に当たる余分な陽光がそれを支えています。",
    ),
  },
  {
    e: "🐟",
    n: t("The winter catch comes in cold|La pesca de invierno llega fría|La pêche d'hiver arrive dans le froid|冬の漁が水揚げされる"),
    t: t(
      "The Genkai Sea's yellowtail run thickest in the cold months, and boats that were tied up through the calmer season go back out before dawn into water rough enough to need real experience.|El pez limón del mar de Genkai abunda más en los meses fríos, y barcos amarrados en la temporada más tranquila vuelven a salir antes del alba a un mar lo bastante bravo como para exigir experiencia real.|La sériole du mer de Genkai abonde surtout dans les mois froids, et des bateaux amarrés durant la saison plus calme repartent avant l'aube sur une mer assez agitée pour exiger une vraie expérience.|玄界灘のブリは寒い時期にいちばん群れが濃くなる。穏やかな季節は係留されていた船が、夜明け前、本物の経験が要るほど荒れた海へまた出ていく。",
    ),
    f: t(
      "Yellowtail caught here in the coldest months are prized for the fat they carry after feeding through autumn, and command some of the highest winter prices of any Japanese fishing ground.|El pez limón capturado aquí en los meses más fríos se aprecia por la grasa que acumula tras alimentarse en otoño, y alcanza algunos de los precios de invierno más altos de cualquier caladero japonés.|La sériole pêchée ici durant les mois les plus froids est prisée pour le gras accumulé après s'être nourrie tout l'automne, et atteint certains des prix hivernaux les plus élevés de tous les fonds de pêche japonais.|この時期に獲れるブリは、秋のあいだ食べて蓄えた脂が評価され、日本の漁場の中でも冬にとりわけ高値が付きます。",
    ),
  },
  {
    e: "🏮",
    n: t("Lanterns from the Chinese quarter|Faroles del barrio chino|Lanternes du quartier chinois|唐人屋敷から広がった灯"),
    t: t(
      "A festival begun by the descendants of the Chinese traders once confined to their own walled quarter now lights the whole old town with over ten thousand lanterns for the lunar new year, dragon dances included.|Un festival iniciado por los descendientes de los comerciantes chinos antes confinados a su propio barrio amurallado ilumina hoy todo el casco antiguo con más de diez mil faroles por el año nuevo lunar, con danza del dragón incluida.|Une fête lancée par les descendants des marchands chinois jadis confinés à leur quartier fortifié illumine aujourd'hui toute la vieille ville de plus de dix mille lanternes pour le nouvel an lunaire, danse du dragon comprise.|かつて塀に囲まれた唐人屋敷に住むことを定められた中国商人の子孫たちが始めた祭りは、いまでは旧正月に一万個を超す灯籠で旧市街全体を照らす。龍踊りも出る。",
    ),
    f: t(
      "Unlike the Dutch at Dejima, Chinese traders were never confined to an artificial island, but from 1689 they were restricted to a walled compound on the mainland for much the same reason.|A diferencia de los holandeses en Dejima, los comerciantes chinos nunca se confinaron en una isla artificial, pero desde 1689 se les restringió a un recinto amurallado en tierra firme por motivos similares.|Contrairement aux Hollandais de Dejima, les marchands chinois ne furent jamais confinés sur une île artificielle, mais dès 1689 ils furent cantonnés à une enceinte fortifiée sur la terre ferme pour des raisons similaires.|出島のオランダ人と違い、中国商人は人工島には閉じ込められませんでしたが、1689年からは本土の塀で囲われた一区画に居住を制限されました。理由はほぼ同じです。",
    ),
  },
  {
    e: "🍃",
    n: t("The tea bushes are cut back|Se podan los arbustos de té|On taille les théiers|茶の木が刈り込まれる"),
    t: t(
      "Before the new growth starts, tea farmers cut last year's bushes back hard across the region's hill terraces, a bare, businesslike scene that has nothing of the picking season's colour but decides how the first flush will taste.|Antes de que arranque el nuevo brote, los cultivadores podan con fuerza los arbustos del año pasado en las terrazas de la región, una escena desnuda y práctica sin el color de la temporada de recolección, pero que decide el sabor del primer brote.|Avant le nouveau départ de végétation, les producteurs taillent sévèrement les théiers de l'an passé sur les terrasses de la région, une scène nue et sans apprêt, loin des couleurs de la cueillette, mais qui décide du goût de la première récolte.|新芽が出る前に、地方の段々畑では去年伸びた茶の木を大きく刈り込む。摘採期のような彩りのない、実務的な光景だが、これが一番茶の味を決める。",
    ),
    f: t(
      "A hard pruning every few years keeps the bushes producing tender new leaf rather than woody growth, at the cost of a smaller harvest the following spring.|Una poda fuerte cada pocos años mantiene a los arbustos produciendo hoja nueva y tierna en vez de madera, a costa de una cosecha menor la siguiente primavera.|Une taille sévère tous les quelques ans maintient les théiers dans une production de jeunes feuilles tendres plutôt que de bois, au prix d'une récolte plus faible le printemps suivant.|数年に一度の強い剪定は、木を固い枝ではなくやわらかい新芽を出す状態に保ちます。その代わり、翌春の収穫量は少なくなります。",
    ),
  },
];
