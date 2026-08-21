/**
 * キューバの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 厄災の神は「エル・グイヘ(El Güije)」。川や水たまりに棲むという
 * キューバ民話の小さな精霊で、いたずら好きだが時に人を溺れさせるとも
 * 語られる(ボリビアのエル・ティーオ、ペルーのアプとは題材が重ならない)。
 * この盤面では、製糖工場が水車や灌漑のために川筋を作り替え、鉄道が
 * その上に橋を架けたことに機嫌を損ねている、という設定で盤面の芯
 * (鉄道と製糖業が土地を作り替えた)と重ねた。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const CUBA_META = {
  id: "cuba",
  name: t("Cuba|Cuba|Cuba|キューバ"),
  blurb: t(
    "An island that had a railway before Spain did — laid down for sugar, not passengers|Una isla que tuvo ferrocarril antes que España, tendido por el azúcar y no por los pasajeros|Une île qui eut un chemin de fer avant l'Espagne elle-même — posé pour le sucre, non pour les passagers|スペイン本国より先に鉄道を持った島。敷かれたのは乗客のためではなく砂糖のためだった",
  ),
  cur: { pre: "$", post: "", mul: 100 },
  start: "habana",
  cpuNames: ["Tocororo", "Jutía", "Zunzún", "Hatuey"],
  // 国旗の青・白・赤、サトウキビの緑、精糖釜の銅色。
  stripe: ["#002a8f", "#ffffff", "#ce1126", "#3f7d20", "#8b6a3f"],
};

/** 3地方(cities.mjs と同じコード)。音楽3地方の指定に合わせている。 */
export const CUBA_REGIONS = {
  oc: t("Occidente (the west)|Occidente|Occidente (l'ouest)|オクシデンテ(西部)"),
  ce: t("Centro (the centre)|Centro|Centro (le centre)|セントロ(中部)"),
  or: t("Oriente (the east)|Oriente|Oriente (l'est)|オリエンテ(東部)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存盤面(約300件)と衝突しないことを確認済み(REGISTER.md参照)。
 *
 * 「向きの選べない移動アイテムは、操縦できるものより安い」の原則どおり、
 * camello(行き先まかせ・260)は electrico(自分で選ぶ・380)より安い。
 */
export const CUBA_ITEMS = {
  camello: {
    e: "🚌",
    price: 260,
    kind: "move",
    n: t("A Seat on the Camello|Un asiento en el camello|Une place dans le camello|カメージョの座席"),
    d: t(
      "Carried 8–12 squares. The route and every stop are decided for you.|Te lleva de 8 a 12 casillas. La ruta y cada parada las decide otro.|Emporté de 8 à 12 cases. L'itinéraire et chaque arrêt sont décidés pour toi.|8〜12マス運ばれる。経路も停まる場所も、乗客には選べない。",
    ),
    f: t(
      "When fuel all but vanished in the 1990s after Soviet aid ended, Havana kept its buses running by welding giant trailers, nicknamed camellos ('camels') for their humped roofline, onto the backs of long-haul trucks; each one could pack in hundreds of standing passengers at a time.|Cuando el combustible casi desapareció en los años noventa tras el fin de la ayuda soviética, La Habana mantuvo sus autobuses circulando soldando enormes remolques, apodados camellos por el perfil jorobado del techo, a la parte trasera de camiones de carga; cada uno podía llevar de pie a cientos de pasajeros a la vez.|Quand le carburant a presque disparu dans les années 1990 après la fin de l'aide soviétique, La Havane a maintenu ses bus en circulation en soudant d'immenses remorques, surnommées camellos (« chameaux ») pour leur toit bossu, à l'arrière de camions long-courriers ; chacune pouvait entasser des centaines de passagers debout à la fois.|1990年代、ソ連の援助が終わり燃料がほとんど無くなったとき、ハバナは長距離トラックの荷台に巨大なトレーラーを溶接して連結し、バスを走らせ続けた。屋根の盛り上がった形から「カメージョ(ラクダ)」と呼ばれたこの車両は、一度に何百人もの立ち客を詰め込むことができた。",
    ),
  },
  electrico: {
    e: "🚋",
    price: 380,
    kind: "pre",
    n: t("A Booked Seat on El Eléctrico|Un asiento reservado en El Eléctrico|Une place réservée dans El Eléctrico|エレクトリコの予約席"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Hershey chocolate company built Cuba's only electric railway in the 1910s–20s to move sugar and workers between Havana, Matanzas and its own company town, and though the mill is long gone, some of the same overhead-wire cars, nicknamed El Eléctrico, still creep along parts of the original route.|La compañía de chocolate Hershey construyó en los años 1910–20 el único ferrocarril eléctrico de Cuba, para mover azúcar y trabajadores entre La Habana, Matanzas y su propio pueblo de compañía, y aunque el ingenio desapareció hace mucho, algunos de esos mismos coches de catenaria, apodados El Eléctrico, todavía avanzan despacio por parte de la ruta original.|La compagnie de chocolat Hershey construisit dans les années 1910-20 l'unique chemin de fer électrique de Cuba, pour transporter sucre et ouvriers entre La Havane, Matanzas et sa propre ville-usine, et bien que la sucrerie ait disparu depuis longtemps, certaines de ces mêmes voitures à caténaire, surnommées El Eléctrico, avancent encore lentement sur une partie du tracé d'origine.|チョコレート会社ハーシーは1910〜20年代、ハバナとマタンサス、そして自社の企業城下町のあいだで砂糖と労働者を運ぶため、キューバで唯一の電化鉄道を建設した。製糖工場はとうになくなったが、「エレクトリコ」とあだ名される架線式の同じ車両が、いまも元の路線の一部をゆっくりと走っている。",
    ),
  },
  guagua: {
    e: "🚐",
    price: 340,
    kind: "pre",
    n: t("A Guagua Heading Your Way|Una guagua que va hacia allá|Un guagua qui va par là|行き先の合うグアグア(バス)"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Guagua is the everyday Cuban word for bus, and on routes where official service is thin, shared trucks and vans doing the same job get called guaguas too, flagged down with a wave rather than boarded at a marked stop.|Guagua es la palabra cubana de todos los días para autobús, y en rutas donde el servicio oficial escasea, los camiones y furgonetas compartidos que hacen el mismo trabajo también se llaman guaguas, a los que se les hace señas con la mano en vez de abordarlos en una parada marcada.|Guagua est le mot cubain de tous les jours pour désigner un bus, et sur les trajets où le service officiel se fait rare, les camions et fourgonnettes partagés assurant le même travail sont eux aussi appelés guaguas, hélés d'un geste de la main plutôt qu'embarqués à un arrêt marqué.|グアグアはキューバで日常的に使われるバスを指す言葉で、公式の便が少ない路線では、同じ役目を果たす乗合トラックやバンもグアグアと呼ばれる。決められた停留所で乗るのではなく、手を振って呼び止めて乗る。",
    ),
  },
  trenfrances: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the Tren Francés|Un boleto en el Tren Francés|Un billet pour le Tren Francés|トレン・フランセスの切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Cuba's aging Soviet-era passenger stock was gradually joined from around 2019 by French-built carriages purchased secondhand, quickly nicknamed the Tren Francés, running the long Havana–Santiago de Cuba route in a fraction of the time older trains needed.|El envejecido material de pasajeros de la era soviética de Cuba fue acompañándose desde alrededor de 2019 por coches de fabricación francesa comprados de segunda mano, apodados enseguida el Tren Francés, que recorren la larga ruta La Habana–Santiago de Cuba en una fracción del tiempo que necesitaban los trenes más viejos.|Le vieux matériel voyageurs cubain d'époque soviétique fut peu à peu rejoint, à partir d'environ 2019, par des voitures de fabrication française achetées d'occasion, vite surnommées le Tren Francés, parcourant la longue ligne La Havane–Santiago de Cuba en une fraction du temps qu'exigeaient les trains plus anciens.|老朽化したソ連製のキューバの旅客車両に、2019年ごろから中古で購入されたフランス製の車両が加わり始めた。すぐに「トレン・フランセス」とあだ名されたこの列車は、ハバナ―サンティアゴ・デ・クーバ間の長距離をそれまでの列車よりずっと短い時間で走る。",
    ),
  },
  azabache: {
    e: "🖤",
    price: 300,
    kind: "passive",
    n: t("An Azabache Charm|Un azabache|Un azabache|アサバチェのお守り"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "A small bead of black jet, worn as a bracelet or pinned to clothing, is a common folk charm across Cuba and much of Latin America meant to draw away mal de ojo (the evil eye); babies are especially likely to be given one.|Una pequeña cuenta de azabache, llevada como pulsera o prendida a la ropa, es un amuleto popular común en Cuba y buena parte de Latinoamérica para alejar el mal de ojo; a los bebés se les suele poner uno especialmente.|Une petite perle de jais noir, portée en bracelet ou épinglée aux vêtements, est une amulette populaire courante à Cuba et dans une bonne partie de l'Amérique latine censée éloigner le mauvais œil ; les bébés en reçoivent souvent une en particulier.|黒い黒玉(ジェット)の小さな珠をブレスレットにしたり衣服に留めたりするのは、キューバやラテンアメリカの多くで悪目(マル・デ・オホ)を遠ざけるための一般的なお守りで、特に赤ん坊に持たせることが多い。",
    ),
  },
  machetazo: {
    e: "🔪",
    price: 420,
    kind: "pre",
    n: t("A Machete Swung to Clear the Path|Un machetazo para despejar el camino|Un coup de machette pour dégager le chemin|道を切り開く鉈の一振り"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The machete used to cut cane by hand during the zafra is still the single most common tool on a Cuban sugar farm, swung low and fast along the base of the stalk; a skilled cutter can fell more than four tonnes of cane in a single working day.|El machete usado para cortar caña a mano durante la zafra sigue siendo la herramienta más común en una finca azucarera cubana, blandido bajo y rápido junto a la base del tallo; un cortador experto puede talar más de cuatro toneladas de caña en una sola jornada.|La machette utilisée pour couper la canne à la main pendant la zafra reste l'outil le plus courant d'une exploitation sucrière cubaine, maniée bas et vite à la base de la tige ; un coupeur expérimenté peut abattre plus de quatre tonnes de canne en une seule journée de travail.|サフラ(収穫期)に手作業でサトウキビを刈るための鉈(マチェテ)は、いまもキューバの砂糖農園でもっともありふれた道具で、茎の根元を低く素早く払うように振るう。熟練の刈り手は一日で4トンを超えるサトウキビを刈り倒すことができる。",
    ),
  },
  hojaderuta: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。上限140以下。
    price: 130,
    kind: "passive",
    n: t("A Waybill (Crib Sheet)|Una hoja de ruta (chuleta)|Une feuille de route (antisèche)|ホハ・デ・ルタ(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "A waybill travels with a freight run listing everything about it — wagons, weight, cargo, crew — and rail workers waiting out a delay have long joked that its blank margins make a fine place to scribble notes for anything else that needs remembering.|Una hoja de ruta viaja con cada corrida de carga anotando todo sobre ella —vagones, peso, mercancía, tripulación— y los ferroviarios que esperan un retraso llevan tiempo bromeando con que sus márgenes en blanco son un buen lugar para apuntar cualquier otra cosa que haya que recordar.|Une feuille de route accompagne chaque convoi de fret en y consignant tout — wagons, poids, cargaison, équipage — et les cheminots attendant un retard plaisantent depuis longtemps sur le fait que ses marges vides sont un bon endroit pour griffonner tout ce qu'il faut se rappeler par ailleurs.|貨物列車の運行にはホハ・デ・ルタ(運行票)が付き添い、車両・重量・積み荷・乗務員などすべてが書き込まれる。遅延を待つ鉄道員たちは昔から、その余白が他に覚えておきたいことを書き留めるのにちょうどいい、と冗談を言ってきた。",
    ),
  },
  cigarros: {
    e: "🚬",
    price: 280,
    kind: "pre",
    n: t("A Box of Cigars to Sell On|Una caja de puros para revender|Une boîte de cigares à revendre|売り払う葉巻の箱",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Hand-rolled habanos are one of Cuba's best-known legal exports, but visitors are just as likely to be offered a box informally on the street at a fraction of the shop price, no receipt included and no guarantee the leaf inside is what it's claimed to be.|Los habanos torcidos a mano son una de las exportaciones legales más conocidas de Cuba, pero es igual de probable que a un visitante le ofrezcan una caja de manera informal en la calle a una fracción del precio de tienda, sin recibo y sin garantía de que la hoja de dentro sea la que dicen.|Les habanos roulés à la main sont l'une des exportations légales les plus connues de Cuba, mais un visiteur a tout autant de chances de se voir proposer une boîte de façon informelle dans la rue, pour une fraction du prix boutique, sans reçu et sans garantie que la feuille à l'intérieur soit bien celle annoncée.|手巻きのアバノス(葉巻)はキューバでもよく知られた合法の輸出品だが、旅行者は路上でも同じくらいの頻度で、店の値段のごく一部で非公式に箱を勧められる。領収書は付かず、中身が言われたとおりの葉である保証もない。",
    ),
  },
  cambiavia: {
    e: "🚦",
    price: 400,
    kind: "pre",
    n: t("A Switchman's Quick Favour|Un favor rápido del cambiavía|Une faveur rapide de l'aiguilleur|転轍手のすばやい計らい"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "At every junction where a private mill line met the main track, a cambiavía stood ready to throw the points by hand so a loaded cane train could jump ahead of whatever was waiting — a small, unglamorous job that decided which train actually moved first.|En cada empalme donde una línea privada de ingenio se unía a la vía principal, un cambiavía estaba listo para cambiar las agujas a mano y dejar que un tren de caña cargado se adelantara a lo que esperaba: un trabajo pequeño y sin brillo que decidía qué tren avanzaba primero de verdad.|À chaque jonction où une ligne privée de sucrerie rejoignait la voie principale, un cambiavía se tenait prêt à actionner les aiguilles à la main pour qu'un train de canne chargé double tout ce qui attendait — un petit travail sans éclat qui décidait quel train avançait vraiment le premier.|私有の製糖工場の線路が幹線と合流するあらゆる分岐点で、転轍手(カンビアビア)は手でポイントを切り替える用意をしていた。荷を積んだサトウキビ列車を、待っている他の列車より先に進ませるためである。地味な仕事だが、実際にどの列車が先に動くかはこの仕事が決めていた。",
    ),
  },
};

/**
 * 厄災の神。ボリビアのエル・ティーオ、ペルーのアプとは題材が重ならない
 * よう、川に棲む小さな精霊「エル・グイヘ」にした。製糖工場が水車や
 * 灌漑のために川筋を作り替え、鉄道が橋を架けたことに機嫌を損ねている、
 * という設定で盤面の芯と重ねた。
 */
export const CUBA_SPIRIT = {
  e: "💧",
  n: t("El Güije|El Güije|El Güije|エル・グイヘ"),
  big: t("El Güije's Flash Flood|La crecida del Güije|La crue soudaine du Güije|グイヘの鉄砲水"),
  ward: "azabache",
  arrive: t(
    "<b>💧 A güije has taken offence at you.</b> In Cuban folk tradition, small dark spirits called güijes are said to live in rivers and mill ponds, and to resent anything that dams, diverts or bridges their water without asking. One now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>💧 Un güije se ha ofendido contigo.</b> Según la tradición popular cubana, unos pequeños espíritus oscuros llamados güijes viven en ríos y represas de ingenio, y les molesta todo lo que embalse, desvíe o cruce su agua sin pedir permiso. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>💧 Un güije s'est offensé de toi.</b> Selon la tradition populaire cubaine, de petits esprits sombres appelés güijes vivraient dans les rivières et les bassins de sucrerie, et n'apprécieraient guère qu'on endigue, détourne ou enjambe leur eau sans le leur demander. L'un d'eux marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>💧 グイヘの不興を買った。</b> キューバの民話では、川や製糖工場の溜め池には「グイヘ」と呼ばれる小さな黒い精霊が棲むとされ、断りなく水をせき止めたり、迂回させたり、橋を架けたりすることを嫌うという。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "💧 <b>El Güije</b> loses interest and settles over <b>{0}</b>, farthest from {1}.|💧 <b>El Güije</b> pierde el interés y se posa sobre <b>{0}</b>, el más lejano de {1}.|💧 <b>Le Güije</b> se désintéresse et se pose sur <b>{0}</b>, le plus loin de {1}.|💧 <b>グイヘ</b> は興味を失い、{1} から最も遠い <b>{0}</b> の上に留まった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside the güije without ever leaving it an offering. The still water breaks all at once — <b>El Güije's Flash Flood</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al güije sin dejarle nunca una ofrenda. El agua quieta se rompe de golpe: empieza <b>la crecida del Güije</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours aux côtés du güije sans jamais lui laisser d'offrande. L'eau calme se brise d'un coup : <b>la crue soudaine du Güije</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもグイヘの傍らを歩きながら、一度も捧げ物を残さなかった。静かだった水面が一気に破れる。<b>グイヘの鉄砲水</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> güijes appear across oral storytelling in Cuba with roots in both Taíno and West African tradition, and are usually described as mischievous rather than purely evil — quick to punish disrespect, but just as quick to leave someone alone who shows the water proper caution.|<b>Tras la historia:</b> los güijes aparecen en la tradición oral cubana con raíces tanto taínas como del África occidental, y suelen describirse como traviesos más que puramente malvados: rápidos para castigar la falta de respeto, pero igual de rápidos para dejar en paz a quien trata el agua con la debida cautela.|<b>Derrière l'histoire :</b> les güijes apparaissent dans la tradition orale cubaine, aux racines à la fois taïnos et ouest-africaines, et sont généralement décrits comme espiègles plutôt que purement malveillants — prompts à punir le manque de respect, mais tout aussi prompts à laisser tranquille qui traite l'eau avec la prudence voulue.|<b>物語の背景:</b> グイヘはタイノとアフリカ西部、両方の伝統に根を持つキューバの口承伝承に登場し、たいてい純粋な悪ではなくいたずら好きとして語られる。無礼には素早く罰を与えるが、水に相応の用心を払う者は同じくらい素早く放っておく。",
  ),
  pleased: t(
    "The river runs clear for a moment, and something glints among the stones at the ford. <b>{0}</b> gains <span class='money'>+{1}</span>.|El río corre claro un instante, y algo brilla entre las piedras del vado. <b>{0}</b> gana <span class='money'>+{1}</span>.|La rivière coule claire un instant, et quelque chose brille parmi les pierres du gué. <b>{0}</b> gagne <span class='money'>+{1}</span>.|川が一瞬澄み渡り、渡し場の石の間で何かがきらりと光った。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A small black bead is left on a stone at the water's edge where the güije can see it. The offering is enough — it slips back under the surface, passing <b>{0}</b> without incident this turn.|Se deja una pequeña cuenta negra sobre una piedra a la orilla del agua, donde el güije pueda verla. La ofrenda basta: se desliza de nuevo bajo la superficie, pasando junto a <b>{0}</b> sin incidentes esta vuelta.|Une petite perle noire est laissée sur une pierre au bord de l'eau, bien en vue du güije. L'offrande suffit : il replonge sous la surface, passant devant <b>{0}</b> sans incident ce tour-ci.|水際の石の上に、グイヘに見えるよう小さな黒い珠を一つ置いた。それだけで十分だった。グイヘは水面の下へ滑るように戻り、このターンは何事もなく <b>{0}</b> の傍らを通り過ぎた。",
  ),
};

/**
 * 災難7種。並び順が `season-and-doom-rules.ts` 側の対応
 * (fine / percentLoss / skipTurn / loseProperties / payOthers / teleport / steal)
 * と一致している。
 */
export const CUBA_DOOM = [
  // 1) fine — 直接の出費
  {
    id: "tranca-de-rio",
    n: t("A güije tips a handcart at the ford|Un güije vuelca una carreta de mano en el vado|Un güije renverse une charrette à bras au gué|グイヘが渡し場の手押し車をひっくり返す"),
    t: t(
      "The handcart's wheel caught on a stone that wasn't there a moment ago, and half a load of tools and produce went into the shallows before anyone could grab it. Fords across the smaller rivers still do most of the crossing work that bridges never got built for.|La rueda de la carreta se trabó en una piedra que un momento antes no estaba, y media carga de herramientas y productos cayó al agua poco profunda antes de que nadie pudiera atajarla. Los vados de los ríos más pequeños todavía hacen la mayor parte del cruce para el que nunca se construyeron puentes.|La roue de la charrette a buté sur une pierre qui n'était pas là un instant plus tôt, et la moitié du chargement d'outils et de produits est tombée dans l'eau peu profonde avant que quiconque ne puisse la rattraper. Les gués des petites rivières assurent encore l'essentiel des traversées pour lesquelles aucun pont ne fut jamais construit.|手押し車の車輪が、さっきまで無かったはずの石に引っかかり、道具と農産物の半分が浅瀬に落ちた。誰も掴む間もなかった。橋の架けられなかった小さな川では、いまも渡し場がほとんどの横断を引き受けている。",
    ),
  },
  // 2) percentLoss — 大きな損失
  {
    id: "ciclon-de-la-zafra",
    n: t("A late hurricane flattens the standing cane|Un huracán tardío tumba la caña en pie|Un ouragan tardif couche la canne sur pied|季節外れのハリケーンが立ちサトウキビをなぎ倒す"),
    t: t(
      "The storm tracked further south than forecast and tore through fields that were meant to stand another month before cutting, flattening stalks that a machine or a machete can no longer harvest cleanly. Cuba sits directly in the Atlantic hurricane belt, and a bad storm can undo a season's growth in an afternoon.|La tormenta se desvió más al sur de lo previsto y arrasó campos que debían aguantar en pie un mes más antes del corte, tumbando tallos que ya ni una máquina ni un machete pueden cosechar limpiamente. Cuba está justo en la franja de huracanes del Atlántico, y una mala tormenta puede deshacer el crecimiento de toda una temporada en una tarde.|La tempête a dévié plus au sud que prévu et a ravagé des champs censés tenir debout un mois de plus avant la coupe, couchant des tiges qu'une machine ou une machette ne peuvent plus récolter proprement. Cuba se trouve en plein sur la trajectoire des ouragans atlantiques, et une mauvaise tempête peut annuler en un après-midi la croissance de toute une saison.|嵐は予報よりさらに南を通り、あと一月は立たせておくはずだった畑を薙ぎ払った。倒れた茎は、機械でも鉈でももうきれいに刈り取れない。キューバは大西洋のハリケーン帯の真上にあり、悪いハリケーン一つで一季節ぶんの生育がひと午後で無に帰すこともある。",
    ),
    months: [5, 6, 7, 8],
  },
  // 3) skipTurn — 足止め
  {
    id: "descarrilamiento",
    n: t("A cane wagon jumps the rails|Un vagón cañero se sale de los rieles|Un wagon de canne déraille|サトウキビ貨車が脱線する"),
    t: t(
      "An overloaded cane wagon on an old, softened rail bed finally tips off the track at a curve, blocking the line until a work crew can right it by hand and jack. On the older mill spurs, nobody is surprised when this happens more than once in a season.|Un vagón cañero sobrecargado, sobre un lecho de vía viejo y reblandecido, termina por salirse de los rieles en una curva, bloqueando la línea hasta que una cuadrilla lo endereza a mano y con gatos. En los ramales más viejos de los ingenios, a nadie sorprende que esto pase más de una vez en una zafra.|Un wagon de canne surchargé, sur un lit de voie ancien et affaissé, finit par dérailler dans une courbe, bloquant la ligne jusqu'à ce qu'une équipe le redresse à la main et au cric. Sur les vieux embranchements d'usine, personne ne s'étonne que cela arrive plus d'une fois dans une zafra.|古く緩んだ路盤の上、積みすぎたサトウキビ貨車がついにカーブで脱線し、作業班が手とジャッキで起こすまで線路を塞ぐ。古い製糖工場の専用線では、これが一季節に一度きりで済まないことも珍しくない。",
    ),
  },
  // 4) loseProperties — 持ち物件を失う
  {
    id: "incendio-del-central",
    n: t("Fire sweeps a mill building|El fuego arrasa un edificio del ingenio|Le feu ravage un bâtiment de l'usine|工場の建屋を火が焼く"),
    t: t(
      "Dry cane trash and old timber catch fast, and a fire that starts in one shed at a sugar mill can take a whole building before the pumps get water on it. Mills built up over a century of additions rarely have anything as modern as a sprinkler system.|La paja seca de la caña y la madera vieja arden rápido, y un fuego que empieza en un galpón de un ingenio puede llevarse todo el edificio antes de que las bombas le echen agua. Los ingenios, construidos a lo largo de más de un siglo de ampliaciones, casi nunca tienen algo tan moderno como un sistema de rociadores.|La paille de canne sèche et le vieux bois s'enflamment vite, et un feu qui démarre dans un hangar d'une sucrerie peut emporter tout le bâtiment avant que les pompes n'y amènent de l'eau. Les usines, bâties au fil de plus d'un siècle d'agrandissements, ont rarement quelque chose d'aussi moderne qu'un système d'extincteurs automatiques.|乾いたサトウキビの残滓と古い木材はすぐに燃え広がり、製糖工場のある小屋から出た火は、ポンプが水をかける前に建物ひとつを飲み込むことがある。一世紀を超えて増築を重ねてきた工場に、スプリンクラーのような近代的な設備が備わっていることはめったにない。",
    ),
  },
  // 5) payOthers — 皆に払う
  {
    id: "paro-de-los-obreros",
    n: t("A work stoppage forces a settlement|Un paro obliga a un arreglo|Un débrayage force un règlement|作業停止で示談金を払う羽目になる"),
    t: t(
      "Cane cutters at the next mill down the line walked off over unpaid wages, and every wagon queued behind theirs, including one already booked and paid for, sat idle until the dispute was settled with cash on the table. Nobody on the platform is in a hurry to explain whose fault the delay really was.|Los cortadores de caña del siguiente ingenio en la línea pararon por salarios impagos, y cada vagón en la cola detrás del suyo, incluido uno ya reservado y pagado, quedó parado hasta que la disputa se resolvió con dinero sobre la mesa. Nadie en el andén tiene prisa por explicar de quién fue realmente la culpa del retraso.|Les coupeurs de canne de la prochaine sucrerie sur la ligne ont débrayé pour des salaires impayés, et chaque wagon dans la file derrière le leur, y compris un déjà réservé et payé, est resté à l'arrêt jusqu'à ce que le différend se règle argent sur la table. Personne sur le quai n'est pressé d'expliquer à qui la faute du retard revient vraiment.|先の製糖工場の刈り取り人夫たちが未払い賃金を理由に仕事を放棄し、すでに予約と支払いを済ませていた貨車も含め、その後ろに並んだ車両はすべて、現金を積んで示談が済むまで止まったままだった。ホームの誰も、遅れの本当の責任が誰にあるかを進んで説明しようとはしない。",
    ),
  },
  // 6) teleport — 気付けば違う場所に
  {
    id: "desvio-del-guije",
    n: t("The güije leads the way down a flooded branch|El güije guía por un ramal inundado|Le güije conduit vers un embranchement inondé|グイヘが水没した支線へ導く"),
    t: t(
      "Following what looked like the main channel around a bend, the boat (or the road running alongside it) ends up on a flooded side branch instead, well past where the intended crossing was. Locals blame a güije for the wrong turn more often than they blame the map.|Siguiendo lo que parecía el cauce principal en una curva, el bote (o el camino que corre a su lado) termina en un ramal lateral inundado en vez de en el cruce previsto, bastante más allá. Los lugareños culpan a un güije por el giro equivocado más a menudo que al mapa.|En suivant ce qui semblait être le chenal principal dans un virage, le bateau (ou la route qui le longe) se retrouve plutôt sur un embranchement latéral inondé, bien au-delà du passage prévu. Les habitants du coin blâment plus souvent un güije pour le mauvais virage que la carte.|曲がり角で本流に見えたほうへ進んだつもりが、船(あるいはその脇の道)は意図した渡し場よりずっと先の、水に浸かった支流へ入り込んでいた。地元の人は地図よりもグイヘのせいにすることのほうが多い。",
    ),
  },
  // 7) steal — すられる
  {
    id: "robo-en-la-estacion",
    n: t("A thief works the station platform|Un ladrón trabaja el andén de la estación|Un voleur sévit sur le quai de la gare|駅のホームで盗みに遭う"),
    t: t(
      "The platform was crowded with families waiting on a delayed train, and a hand slipped into an open bag before its owner even noticed the crowd had shifted. Old junction stations built for freight, not passengers, were never designed with anywhere quiet to stand and watch a bag.|El andén estaba lleno de familias esperando un tren con retraso, y una mano se coló en una bolsa abierta antes de que su dueño notara siquiera que la multitud se había movido. Las viejas estaciones de empalme, construidas para carga y no para pasajeros, nunca se pensaron con algún rincón tranquilo para vigilar un bolso.|Le quai était bondé de familles attendant un train retardé, et une main s'est glissée dans un sac ouvert avant même que son propriétaire ne remarque que la foule avait bougé. Les vieilles gares de jonction, bâties pour le fret et non pour les voyageurs, n'ont jamais été pensées avec un coin tranquille où surveiller un sac.|遅れた列車を待つ家族連れでホームは混み合っており、持ち主が人混みの動きに気づく前に、開いたバッグへ手が忍び込んでいた。旅客ではなく貨物のために作られた古い分岐駅には、荷物を落ち着いて見張れる場所など最初から用意されていない。",
    ),
  },
];

/**
 * 季節12ヶ月(4月始まり、他国と同じ並び)。キューバは北半球なので
 * 季節の中身も他の北半球の盤面と同じ向きで進む。
 * サフラ(サトウキビの収穫期、乾季)は概ね12〜4月、ティエンポ・ムエルト
 * (死んだ季節、雨季で工場が止まる)は概ね5〜11月。ハリケーン季は6〜11月。
 */
export const CUBA_SEASONS = [
  /* 0 Apr サフラの終わり */ {
    e: "🌾",
    n: t("The zafra winds down|La zafra llega a su fin|La zafra touche à sa fin|サフラ(収穫期)の終わり"),
    t: t(
      "The last fields of standing cane are cut before the rains make the roads to the mill impassable, and the crushing season's final weeks are usually its most frantic, racing to mill everything before the machinery is shut down for cleaning and repair.|Se cortan los últimos campos de caña en pie antes de que las lluvias vuelvan intransitables los caminos al ingenio, y las últimas semanas de la molienda suelen ser las más frenéticas, corriendo para moler todo antes de apagar la maquinaria para limpieza y reparación.|Les derniers champs de canne encore debout sont coupés avant que les pluies ne rendent les routes vers l'usine impraticables, et les dernières semaines de la mouture sont d'ordinaire les plus frénétiques, dans la course pour tout broyer avant l'arrêt des machines pour nettoyage et réparation.|工場への道が雨でぬかるんで通れなくなる前に、最後まで立っていたサトウキビ畑が刈り取られる。製糖期の最後の数週間はたいてい一年でいちばん慌ただしく、機械を清掃と修理のために止める前にすべてを挽き終えようと急ぐ。",
    ),
    f: t(
      "Some of the oldest mills still running, like the Uruguay mill at Jatibonico, have ground cane for over a century, patched and rebuilt piece by piece rather than replaced outright.|Algunos de los ingenios más antiguos que aún funcionan, como el Uruguay en Jatibonico, llevan moliendo caña más de un siglo, remendados y reconstruidos pieza por pieza en vez de sustituidos por completo.|Certaines des plus anciennes sucreries encore en activité, comme le central Uruguay à Jatibonico, broient de la canne depuis plus d'un siècle, rafistolées et reconstruites pièce par pièce plutôt que remplacées d'un coup.|ハティボニコのウルグアイ工場のように、いまも稼働する最古参の製糖工場のいくつかは、丸ごと建て替えられることなく一部ずつ修繕・再建されながら、1世紀を超えてサトウキビを挽き続けている。",
    ),
  },
  /* 1 May ティエンポ・ムエルトの始まり */ {
    e: "🔧",
    n: t("Tiempo muerto begins as the mills fall silent|Empieza el tiempo muerto y los ingenios callan|Le tiempo muerto commence : les usines se taisent|工場が静まり「死んだ季節」が始まる"),
    t: t(
      "With the cane cut and milled, the machinery goes quiet for months of maintenance, and the seasonal cutting crews scatter to other work until the next zafra calls them back. The name tiempo muerto, 'dead time,' has stuck to this stretch of the calendar for generations.|Con la caña cortada y molida, la maquinaria calla durante meses de mantenimiento, y las cuadrillas estacionales de corte se dispersan a otros trabajos hasta que la próxima zafra los llame de vuelta. El nombre tiempo muerto se ha quedado pegado a este tramo del calendario por generaciones.|La canne coupée et broyée, les machines se taisent pour des mois d'entretien, et les équipes saisonnières de coupe se dispersent vers d'autres travaux jusqu'à ce que la prochaine zafra les rappelle. Le nom tiempo muerto, « temps mort », colle à cette période du calendrier depuis des générations.|サトウキビが刈られ挽き終えられると、機械は何か月もの保守のあいだ静まり返り、季節ごとの刈り取り班は次のサフラに呼び戻されるまで他の仕事に散っていく。「ティエンポ・ムエルト(死んだ季節)」という呼び名は、何世代も前からこの時期に貼り付いている。",
    ),
  },
  /* 2 Jun 大西洋ハリケーン季の始まり */ {
    e: "🌀",
    n: t("The Atlantic hurricane season opens|Se abre la temporada de huracanes del Atlántico|La saison des ouragans atlantiques s'ouvre|大西洋ハリケーン季が始まる"),
    t: t(
      "1 June marks the official start of the Atlantic hurricane season, and Cuban households along the coast begin the yearly ritual of checking shutters, batteries and the route to the nearest shelter, whether or not a storm is anywhere near yet.|El 1 de junio marca el inicio oficial de la temporada de huracanes del Atlántico, y los hogares cubanos en la costa empiezan el ritual anual de revisar postigos, pilas y la ruta al refugio más cercano, haya o no una tormenta cerca todavía.|Le 1er juin marque le début officiel de la saison des ouragans atlantiques, et les foyers cubains du littoral entament le rituel annuel de vérifier volets, piles et itinéraire vers l'abri le plus proche, qu'une tempête soit ou non déjà en approche.|6月1日は大西洋のハリケーン季の公式な始まりで、海岸沿いのキューバの家々は、まだ嵐が近づいていなくても、雨戸や電池、最寄りの避難所への経路を確かめる毎年の儀式を始める。",
    ),
    f: t(
      "Cuba's civil defence evacuation drills are large enough that international agencies have repeatedly pointed to the country's low hurricane death tolls, relative to the strength of the storms it takes, as a model worth studying.|Los simulacros de evacuación de la defensa civil cubana son tan amplios que organismos internacionales han señalado repetidamente el bajo número de muertos por huracán del país, en relación con la fuerza de las tormentas que recibe, como un modelo digno de estudio.|Les exercices d'évacuation de la défense civile cubaine sont assez vastes pour que des organismes internationaux aient plusieurs fois cité le faible nombre de morts dus aux ouragans du pays, au regard de la force des tempêtes qu'il essuie, comme un modèle à étudier.|キューバの民間防衛による避難訓練は規模が大きく、国際機関はこの国が受ける嵐の強さに対してハリケーンによる死者数が少ないことを、繰り返し学ぶ価値のある模範として指摘してきた。",
    ),
  },
  /* 3 Jul カルナバル・デ・サンティアゴ */ {
    e: "💃",
    n: t("Carnaval de Santiago fills the streets|El Carnaval de Santiago llena las calles|Le Carnaval de Santiago envahit les rues|サンティアゴのカルナバルが通りを埋める"),
    t: t(
      "Santiago de Cuba's carnival, generally considered the country's biggest and rowdiest, fills the streets with comparsa groups dancing conga behind trucks stacked with speakers, drawing crowds from across Oriente and beyond.|El carnaval de Santiago de Cuba, considerado en general el más grande y bullicioso del país, llena las calles con comparsas bailando conga tras camiones apilados de altavoces, atrayendo multitudes de todo Oriente y de más allá.|Le carnaval de Santiago de Cuba, généralement considéré comme le plus grand et le plus bruyant du pays, remplit les rues de comparsas dansant la conga derrière des camions chargés de haut-parleurs, attirant des foules de tout l'Oriente et d'ailleurs.|一般にキューバでいちばん大きく賑やかとされるサンティアゴ・デ・クーバのカルナバルは、スピーカーを積み上げたトラックの後ろでコンガを踊るコンパルサの一団で通りを埋め尽くし、オリエンテ各地やそれ以外からも人を集める。",
    ),
  },
  /* 4 Aug ハリケーン季の頂点 */ {
    e: "🌊",
    n: t("Hurricane season nears its peak|La temporada de huracanes se acerca a su pico|La saison des ouragans approche de son pic|ハリケーン季が頂点に近づく",
    ),
    t: t(
      "Late August through September is statistically the most active stretch of the whole Atlantic season, and mill managers and station agents alike keep one ear on the radio for storm tracks even during otherwise quiet weeks.|De finales de agosto a septiembre es, estadísticamente, el tramo más activo de toda la temporada atlántica, y tanto los gerentes de ingenio como los jefes de estación mantienen un oído puesto en la radio para las trayectorias de tormentas incluso en semanas por lo demás tranquilas.|De fin août à septembre est statistiquement la période la plus active de toute la saison atlantique, et gérants de sucrerie comme chefs de gare gardent une oreille sur la radio pour suivre les trajectoires de tempêtes, même durant des semaines par ailleurs calmes.|8月末から9月にかけては大西洋のハリケーン季全体の中でも統計的にもっとも活発な時期にあたり、製糖工場の管理者も駅長も、ほかは静かな週であってもラジオの嵐の進路情報に片耳を傾け続ける。",
    ),
  },
  /* 5 Sep ビルヘン・デ・ラ・カリダ祭(全員給付) */ {
    e: "🕯️",
    n: t("Cuba honours its patron saint of El Cobre|Cuba honra a su patrona de El Cobre|Cuba honore sa patronne d'El Cobre|キューバがエル・コブレの守護聖人を祝う"),
    t: t(
      "8 September is the feast day of Nuestra Señora de la Caridad del Cobre, Cuba's patron saint, and pilgrims travel from across the island to the basilica at El Cobre to give thanks, leaving small offerings much like the copper miners who first built it did.|El 8 de septiembre es la fiesta de Nuestra Señora de la Caridad del Cobre, patrona de Cuba, y peregrinos viajan desde toda la isla hasta la basílica de El Cobre para dar gracias, dejando pequeñas ofrendas como hacían los mineros de cobre que la construyeron.|Le 8 septembre est la fête de Nuestra Señora de la Caridad del Cobre, patronne de Cuba, et des pèlerins de toute l'île se rendent à la basilique d'El Cobre pour rendre grâce, y laissant de petites offrandes comme le faisaient les mineurs de cuivre qui la bâtirent.|9月8日はキューバの守護聖人「エル・コブレの慈愛の聖母」の祝日で、島じゅうから巡礼者がエル・コブレのバジリカへ旅をして感謝を捧げ、かつてこの聖堂を築いた銅山の鉱夫たちがそうしていたように、ささやかな捧げ物を残していく。",
    ),
    f: t(
      "All-players-gain-cash represents small gifts and shared food passed among travelers on pilgrimage, a custom widely reported around this date.|El reparto de dinero entre todos representa los pequeños regalos y la comida compartida entre los viajeros en peregrinación, costumbre muy reportada en torno a esta fecha.|Le don d'argent à tous les joueurs représente les petits cadeaux et la nourriture partagée entre pèlerins, coutume largement rapportée autour de cette date.|全員への給付は、この時期に巡礼者どうしで交わされるという、ちょっとした贈り物や分け合う食べ物を表している。",
    ),
  },
  /* 6 Oct ティエンポ・ムエルトの底 */ {
    e: "🌧️",
    n: t("The rains sit heaviest over the mills|Las lluvias se asientan más pesadas sobre los ingenios|Les pluies s'installent le plus lourdement sur les usines|工場の上に雨がもっとも重く居座る",
    ),
    t: t(
      "October usually brings the heaviest rainfall of the year to much of the island, keeping fields too wet to prepare for the coming zafra and giving repair crews inside the silent mills the wettest weeks to work through.|Octubre suele traer las lluvias más intensas del año a buena parte de la isla, manteniendo los campos demasiado húmedos para prepararlos para la próxima zafra y dando a las cuadrillas de reparación dentro de los ingenios silenciosos las semanas más lluviosas para trabajar.|Octobre apporte d'ordinaire les pluies les plus intenses de l'année sur une bonne partie de l'île, gardant les champs trop humides pour être préparés à la prochaine zafra et offrant aux équipes de réparation dans les usines silencieuses leurs semaines les plus pluvieuses de travail.|10月は島の多くの地域で一年でもっとも雨が強まる時期で、畑は次のサフラに向けて準備するにはぬかるみすぎたままとなり、静まった工場の中で働く修理班にとっては、もっとも雨の多い週を働き通すことになる。",
    ),
  },
  /* 7 Nov 修理の追い込み */ {
    e: "⚙️",
    n: t("Repair crews race to ready the mills|Las cuadrillas de reparación corren a alistar los ingenios|Les équipes de réparation courent à préparer les usines|修理班が工場の準備に追われる",
    ),
    t: t(
      "With the next zafra only weeks away, boiler crews and machinists push to finish a year's worth of patchwork repairs before the first cane wagons start arriving, often working through the night in the final stretch.|Con la próxima zafra a solo semanas, las cuadrillas de calderas y los mecánicos se apuran por terminar un año de reparaciones de parche antes de que lleguen los primeros vagones de caña, muchas veces trabajando de noche en el último tramo.|La prochaine zafra n'étant plus qu'à quelques semaines, chaudronniers et mécaniciens se hâtent de finir une année de réparations de fortune avant l'arrivée des premiers wagons de canne, travaillant souvent de nuit dans la dernière ligne droite.|次のサフラまであと数週間となり、罐焚きや機械工たちは最初のサトウキビ貨車が届く前に一年分の応急修理を終わらせようと急ぎ、終盤には夜を徹して働くことも多い。",
    ),
  },
  /* 8 Dec レメディオスのパランダス(全員給付) */ {
    e: "🎆",
    n: t("Remedios lights up for Las Parrandas|Remedios se enciende para Las Parrandas|Remedios s'illumine pour Las Parrandas|レメディオスがパランダスで灯る",
    ),
    t: t(
      "Every 24 December, Remedios splits into two rival neighbourhoods that spend the whole year building floats and stockpiling fireworks in secret, then set it all off at once in a night-long contest that draws visitors from well beyond Villa Clara province.|Cada 24 de diciembre, Remedios se divide en dos barrios rivales que pasan todo el año construyendo carrozas y acumulando fuegos artificiales en secreto, para soltarlo todo de golpe en una competencia que dura toda la noche y atrae visitantes de mucho más allá de la provincia de Villa Clara.|Chaque 24 décembre, Remedios se divise en deux quartiers rivaux qui passent toute l'année à construire des chars et à amasser des feux d'artifice en secret, avant de tout lâcher d'un coup lors d'une compétition qui dure toute la nuit et attire des visiteurs bien au-delà de la province de Villa Clara.|毎年12月24日、レメディオスは対抗する二つの地区に分かれ、一年をかけて秘密裏に山車を作り花火を蓄え、それを一夜で一斉に打ち上げる夜通しの競い合いを行う。ビジャクララ州のはるか外からも見物客を集める。",
    ),
    f: t(
      "All-players-gain-cash here represents the food and rum shared freely around the plaza on the night itself, a custom as central to Las Parrandas as the fireworks.|El reparto de dinero entre todos representa aquí la comida y el ron que se comparten libremente en la plaza esa misma noche, costumbre tan central en Las Parrandas como los fuegos artificiales.|Le don d'argent à tous les joueurs représente ici la nourriture et le rhum partagés librement sur la place ce soir-là, coutume aussi centrale à Las Parrandas que les feux d'artifice.|全員への給付はここでは、当夜に広場で気前よく分け合われる食べ物とラム酒を表しており、この習わしは花火と同じくらいパランダスの中心をなしている。",
    ),
  },
  /* 9 Jan サフラの盛り */ {
    e: "🔥",
    n: t("The zafra reaches full swing|La zafra alcanza su plena marcha|La zafra bat son plein|サフラが本格化する",
    ),
    t: t(
      "January's dry weather and cane at peak sugar content make this the heart of the crushing season, when mills run around the clock and the sweet, scorched smell of boiling cane juice hangs over every town built around one.|El clima seco de enero y la caña en su punto máximo de sacarosa hacen de este el corazón de la molienda, cuando los ingenios funcionan sin parar y el olor dulce y quemado del guarapo hirviendo se cierne sobre cada pueblo construido en torno a uno.|Le temps sec de janvier et la canne à son taux de sucre maximal en font le cœur de la mouture, quand les usines tournent jour et nuit et que l'odeur sucrée et brûlée du jus de canne bouillant plane sur chaque ville bâtie autour d'une sucrerie.|1月の乾いた天候とサトウキビの糖度が最高潮になることが重なり、この時期は製糖のいちばんの盛りとなる。工場は昼夜を問わず動き続け、煮詰まるサトウキビ汁の甘く焦げた匂いが、それを中心に建てられたどの町にも立ち込める。",
    ),
  },
  /* 10 Feb カルナバル各地(全員給付) */ {
    e: "🎭",
    n: t("Carnival season spreads to smaller towns|La temporada de carnaval llega a los pueblos pequeños|La saison de carnaval gagne les petites villes|カルナバル季が小さな町にも広がる",
    ),
    t: t(
      "Beyond Santiago's giant carnival, smaller towns hold their own comparsa parades and street dances through February, timed to give cane-cutting crews a break in the middle of the busiest stretch of the zafra.|Más allá del gran carnaval de Santiago, los pueblos más pequeños celebran sus propios desfiles de comparsas y bailes callejeros durante febrero, programados para dar un respiro a las cuadrillas de corte en medio del tramo más ajetreado de la zafra.|Au-delà du gigantesque carnaval de Santiago, de plus petites villes tiennent leurs propres défilés de comparsas et bals de rue tout au long de février, programmés pour offrir une pause aux équipes de coupe en plein cœur du tronçon le plus chargé de la zafra.|サンティアゴの巨大なカルナバルだけでなく、より小さな町々も2月を通して独自のコンパルサの行進や街頭の踊りを開く。サフラの一番忙しい時期の合間に刈り取り班へ一息つかせるための時期でもある。",
    ),
    f: t(
      "All-players-gain-cash here stands in for the informal street vending — food, rum, small crafts — that fills these town carnivals alongside the dancing.|El reparto de dinero entre todos representa aquí la venta callejera informal —comida, ron, pequeñas artesanías— que llena estos carnavales de pueblo junto con el baile.|Le don d'argent à tous les joueurs représente ici la vente de rue informelle — nourriture, rhum, petit artisanat — qui remplit ces carnavals de ville aux côtés de la danse.|全員への給付はここでは、踊りとともにこうした町のカルナバルを埋め尽くす、食べ物やラム酒、小さな手工芸品といった非公式な露店商いを表している。",
    ),
  },
  /* 11 Mar グイヘが静まる季節(rest-spirit) */ {
    e: "🌤️",
    n: t("The dry season settles and the rivers run low|La temporada seca se asienta y los ríos bajan|La saison sèche s'installe et les rivières baissent|乾季が落ち着き、川の水位が下がる",
    ),
    t: t(
      "With the rivers at their lowest and the fords easy to cross, even a güije is said to have little to be angry about this month — the water sits calm, and so, for once, does whatever lives in it.|Con los ríos en su nivel más bajo y los vados fáciles de cruzar, se dice que incluso un güije tiene poco de qué enojarse este mes: el agua se mantiene calma, y también, por una vez, lo que vive en ella.|Les rivières étant à leur plus bas niveau et les gués faciles à traverser, même un güije, dit-on, a peu de raisons de s'énerver ce mois-ci : l'eau reste calme, et pour une fois, ce qui y vit aussi.|川の水位がもっとも下がり、渡し場を渡りやすくなるこの月は、グイヘでさえ怒る理由に乏しいという。水は穏やかに凪ぎ、そこに棲むものも、この時ばかりは同じように凪いでいる。",
    ),
    f: t(
      "Rest-spirit reflects this month's calm; the güije's usual restlessness resumes as soon as the rains and the machinery start up again.|El descanso del espíritu refleja la calma de este mes; la inquietud habitual del güije vuelve en cuanto regresan las lluvias y la maquinaria.|Le repos de l'esprit reflète le calme de ce mois ; l'agitation habituelle du güije reprend dès que les pluies et les machines redémarrent.|この月の穏やかさを表して精霊は休む。グイヘのいつもの落ち着きのなさは、雨と機械が再び動き出せばすぐに戻ってくる。",
    ),
  },
];
