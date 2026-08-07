/**
 * 茨城県の県情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。
 * **県の盤面なので、季節は「地方まるごとの好不況」ではなく行事で書く。**
 * 茨城で「県北が不況の年」と書けば嘘になるが、「2月は梅、10月は菊、
 * 1月は氷瀑」なら、その月にその場所で実際に起きていることである。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const IBARAKI_META = {
  id: "ibaraki",
  name: t("Ibaraki|Ibaraki|Ibaraki|茨城県"),
  blurb: t(
    "A flat province of lotus ponds, plum gardens and a mountain you can see from Tokyo|Una provincia llana de lotos, ciruelos y una montaña que se ve desde Tokio|Une province plate de lotus, de pruniers et d'une montagne visible depuis Tokyo|れんこんの沼と梅の庭と、東京から見える山の県",
  ),
  // 日本の盤面と同じ円。内部の金額は100倍で持って表示時に割る。
  cur: { pre: "¥", post: "", mul: 100 },
  start: "mito",
  cpuNames: ["ウメ Ume", "ナット Natto", "ツクバ Tsukuba", "ハス Hasu"],
  // 梅の紅、偕楽園の白梅、太平洋の青、台地の緑、干し芋の飴色。
  stripe: ["#c4384f", "#f6efe2", "#2f6ea8", "#5f8f4a", "#d8a24a"],
};

/** 県が実際に使う5区分。 */
export const IBARAKI_REGIONS = {
  hok: t("The North|El norte|Le Nord|県北"),
  cen: t("The Centre|El centro|Le Centre|県央"),
  rok: t("Rokkō — Kashima & Namegata|Rokkō: Kashima y Namegata|Rokkō — Kashima et Namegata|鹿行"),
  nan: t("The South|El sur|Le Sud|県南"),
  sei: t("The West|El oeste|L'Ouest|県西"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。
 * 茨城のキーはまだ登録されていないので、取りまとめ側で追加が要る)。
 */
export const IBARAKI_ITEMS = {
  hobiki: {
    e: "⛵",
    price: 240,
    kind: "move",
    n: t("Sail-Trawler of the Lake|Barca de vela del lago|Barque à voile du lac|霞ヶ浦の帆引き船"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "The boat does not sail forwards but sideways: one huge square sail pushes it across the wind while the net drags behind. It was worked out in 1880 by a fisherman who wanted to trawl without oarsmen, and it needs a wind of exactly the right strength — too little and nothing moves, too much and the boat goes over.|La barca no navega hacia delante sino de costado: una gran vela cuadrada la empuja a través del viento mientras la red arrastra detrás. La ideó en 1880 un pescador que quería faenar sin remeros.|La barque ne va pas devant mais de côté : une grande voile carrée la pousse en travers du vent, le filet traînant derrière. Un pêcheur l'imagina en 1880 pour draguer sans rameurs.|この舟は前へではなく横へ進む。大きな四角い帆が風を受けて舟を横に押し、網は後ろを曳く。1880年、漕ぎ手なしで網を曳きたいと考えた漁師が編み出した。風の強さがちょうどでないと成り立たない。弱ければ動かず、強すぎれば横倒しになる。",
    ),
  },
  jikokuhyo: {
    e: "📖",
    price: 400,
    kind: "pre",
    n: t("The Jōban Line Timetable|El horario de la línea Jōban|L'horaire de la ligne Jōban|常磐線の時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The line runs the length of the prefecture from the Tokyo edge to the Fukushima border, and for a century it was the only way most of these towns were reached at all. Local people still say a place is \"on the line\" or \"off the line\", and it decides more about a town than which district it belongs to.|La línea recorre la prefectura desde el borde de Tokio hasta Fukushima, y durante un siglo fue el único modo de llegar a casi todos estos pueblos.|La ligne parcourt la préfecture du bord de Tokyo à la frontière de Fukushima ; un siècle durant, ce fut le seul accès à presque toutes ces villes.|常磐線は東京寄りの端から福島県境まで県を縦に貫き、この百年、多くの町にとって唯一の到達手段だった。いまも人は「線に乗っている町」「線から外れた町」と言う。どの郡に属するかより、そちらのほうが町の性格を決めている。",
    ),
  },
  tokiwa: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Limited Express Tokiwa|Expreso limitado Tokiwa|Rapide Tokiwa|特急ときわ"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Tokiwa is the old name of this coast, written with the characters for \"eternal rock\", and the trains that carry it stop at the towns the faster ones run past. Ordering a seat is done by tapping a card at the door rather than by holding a ticket, and the light above your seat turns green when you have paid.|Tokiwa es el viejo nombre de esta costa, escrito con los caracteres de \"roca eterna\", y esos trenes paran donde los más rápidos pasan de largo.|Tokiwa est l'ancien nom de cette côte, écrit « roche éternelle » ; ces trains desservent les villes que les plus rapides dépassent.|「ときわ」はこの海沿いの古い呼び名で、常しえの岩と書く。速い列車が通過する町に、この列車は停まる。座席の予約は切符を持つのではなく扉で札をかざす方式で、支払いが済むと頭上の灯が緑に変わる。",
    ),
  },
  tsukubaex: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Tsukuba Express|Tsukuba Express|Tsukuba Express|つくばエクスプレス"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Opened in 2005 with not a single level crossing anywhere on its 58 km, so that nothing on the ground could ever slow it down. It reaches Tokyo in 45 minutes, and the farm villages it passes through gained more people in ten years than in the previous hundred.|Abierto en 2005 sin un solo paso a nivel en sus 58 km, para que nada del suelo pudiera frenarlo. Llega a Tokio en 45 minutos.|Ouvert en 2005 sans un seul passage à niveau sur ses 58 km, pour que rien au sol ne puisse le ralentir. Il gagne Tokyo en 45 minutes.|2005年開業。58kmのどこにも踏切が一つもない。地上のものに速度を落とされないためである。東京まで45分。沿線の農村は、この十年でそれまでの百年より多くの人を得た。",
    ),
  },
  ookushigai: {
    e: "🐚",
    price: 320,
    kind: "passive",
    n: t("Shell from the Ōkushi Mound|Concha del montículo de Ōkushi|Coquille du tertre d'Ōkushi|大串の貝がら"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The mound on the ridge at Ōkushi is a real heap of shells left by people four thousand years ago, and the eighth-century chronicle explains it as the leavings of a giant's meal. Carrying one of its shells is said to settle him: he is shown that he has eaten already, and goes on his way.|El túmulo de Ōkushi es un montón real de conchas dejado hace cuatro mil años, y la crónica del siglo VIII lo explica como las sobras de la comida de un gigante.|Le tertre d'Ōkushi est un vrai amas de coquilles vieux de quatre mille ans, que la chronique du VIIIe siècle donne pour les restes du repas d'un géant.|大串の丘にある塚は、四千年前の人が捨てた貝殻が実際に積もったものである。八世紀の風土記は、これを巨人の食べ残しとして説く。その貝を一つ持っていると巨人は落ち着くという。もう食べたのだと示されて、先へ行くからである。",
    ),
  },
  kashimatachi: {
    e: "⚔️",
    price: 440,
    kind: "pre",
    n: t("Sword of Kashima|Espada de Kashima|Épée de Kashima|鹿島の太刀"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The shrine keeps a straight iron sword 2.7 m long, far too big to have ever been swung, made to be a god rather than a weapon. Warriors setting out on a journey would stop here first, and the phrase for departing on a long road still carries the shrine's name.|El santuario guarda una espada recta de hierro de 2,7 m, demasiado grande para blandirse: se hizo para ser un dios, no un arma.|Le sanctuaire garde une épée droite en fer de 2,7 m, bien trop grande pour être maniée : faite pour être un dieu, non une arme.|鹿島神宮には長さ2.7mの直刀が伝わる。振るには大きすぎ、武器ではなく神そのものとして作られたものである。旅立つ武人はまずここへ寄った。長い道へ出ることをいまも「鹿島立ち」という。",
    ),
  },
  kodokan: {
    e: "📜",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("Copybook from the Domain School|Cuaderno de la escuela del feudo|Cahier de l'école du fief|弘道館の写本"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "The school at Mito was the largest of its kind in Japan by grounds, and it had no graduation — a student could keep coming back at any age. Besides the classics it taught medicine, astronomy and music, on the argument that a man who knew only books knew nothing.|La escuela de Mito fue la mayor del país por superficie y no tenía graduación: se podía volver a cualquier edad. Enseñaba medicina, astronomía y música junto a los clásicos.|L'école de Mito fut la plus vaste du pays et sans diplôme de sortie : on pouvait y revenir à tout âge. Elle enseignait médecine, astronomie et musique autant que les classiques.|水戸の藩校は敷地の広さで国内最大であり、卒業というものがなかった。何歳になっても通い直せた。経書のほかに医学・天文・音楽を教えた。書物しか知らぬ者は何も知らぬ、という理屈である。",
    ),
  },
  kasamayaki: {
    e: "🏺",
    price: 280,
    kind: "pre",
    n: t("Kasama Cup|Taza de Kasama|Coupe de Kasama|笠間焼のぐい呑み"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The clay here is coarse and full of iron, so the ware was never fine enough for display and was made instead for mortars, pickle jars and everyday cups. That freedom from a house style is why potters from elsewhere settled here in the 1960s — there was no tradition telling them what to make.|La arcilla es basta y ferrosa, así que la loza nunca fue de lujo: morteros, tarros y tazas de diario. Esa falta de estilo obligado atrajo a ceramistas de fuera en los sesenta.|L'argile est grossière et ferreuse : la faïence ne fut jamais d'apparat, mais mortiers, jarres et bols du quotidien. Cette absence de style imposé attira des potiers venus d'ailleurs dans les années 1960.|ここの土は粗く鉄分が多いので、飾りものになるほど上品には焼けず、すり鉢や漬物甕、日用の器を作ってきた。決まった作風がないその自由さゆえに、1960年代、よそから来た陶工たちがこの町に住みついた。何を作れと言う伝統がなかったのである。",
    ),
  },
  gamanoabura: {
    e: "🐸",
    price: 420,
    kind: "pre",
    n: t("Toad Salve of Tsukuba|Ungüento de sapo de Tsukuba|Baume de crapaud du Tsukuba|筑波山のガマの油"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The seller's patter is the real product: he draws a blade across his own arm, wipes the cut with the salve, and shows the skin whole again. The routine is performed word for word to this day on the mountain, and the trick is that the arm was never cut.|El discurso del vendedor es el verdadero producto: se pasa una hoja por el brazo, unta el corte y muestra la piel entera otra vez. El número se recita igual hoy en el monte.|Le boniment est le vrai produit : le vendeur passe une lame sur son bras, enduit la coupure et montre la peau intacte. Le numéro se récite encore mot pour mot sur la montagne.|売り手の口上こそが本当の商品である。自分の腕に刃を引き、傷に油を塗り、また元通りの肌を見せる。この一席はいまも山でそっくり同じ文句で演じられている。種は、はじめから腕が切れていないことである。",
    ),
  },
};

/**
 * 厄災の神。要石と大鯰はクイズと都市カードが扱うので、こちらは
 * 『常陸国風土記』の巨人にした。丘に腰かけて海の貝を食べ、
 * 捨てた殻が塚になったという、日本で最も古く文字に残った巨人である。
 */
export const IBARAKI_SPIRIT = {
  e: "👣",
  n: t("The Daidarabō|El Daidarabō|Le Daidarabō|ダイダラボウ"),
  big: t("The Giant's Footfall|El paso del gigante|Le pas du géant|ダイダラボウの足音"),
  ward: "ookushigai",
  arrive: t(
    "<b>👣 The Daidarabō has noticed you.</b> The chronicle of this province, written around 721, says he sat on the ridge at Ōkushi and reached down to the sea to eat clams, and that the shells he threw aside became the hill. He is not cruel, only enormous and hungry, and he does not look down before he puts a foot somewhere. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👣 El Daidarabō te ha visto.</b> La crónica de esta provincia, hacia 721, dice que se sentaba en la loma de Ōkushi y alcanzaba el mar para comer almejas, y que las conchas formaron la colina. No es cruel, solo enorme y hambriento, y no mira al suelo antes de pisar. Ahora camina junto a <b>{0}</b>, el más lejano del destino, y trae una desgracia cada turno.|<b>👣 Le Daidarabō t'a remarqué.</b> La chronique de cette province, vers 721, dit qu'il s'asseyait sur la crête d'Ōkushi et atteignait la mer pour manger des coques, et que les coquilles firent la colline. Il n'est pas cruel, seulement immense et affamé, et il ne regarde pas où il pose le pied. Il marche désormais près de <b>{0}</b>, le plus éloigné du but, et amène un malheur chaque tour.|<b>👣 ダイダラボウに見つかった。</b> 721年ごろに書かれたこの国の風土記は、彼が大串の丘に腰かけたまま海へ手を伸ばして貝を食べ、捨てた殻が丘になったと記す。残酷なのではない。ただ大きすぎ、腹が減っていて、足を下ろす前に下を見ないだけである。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👣 <b>The Daidarabō</b> turns his head and starts after <b>{0}</b>, farthest from {1}.|👣 <b>El Daidarabō</b> vuelve la cabeza y va tras <b>{0}</b>, el más lejano de {1}.|👣 <b>Le Daidarabō</b> tourne la tête et suit <b>{0}</b>, le plus loin de {1}.|👣 <b>ダイダラボウ</b> が首を巡らせ、{1} から最も遠い <b>{0}</b> のほうへ歩き出した。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns in the giant's shadow and has not got clear of it. He sits down to eat, and the whole plain tilts — <b>the Giant's Footfall</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos a la sombra del gigante sin salir de ella. Él se sienta a comer y la llanura entera se inclina: empieza <b>el paso del gigante</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours dans l'ombre du géant sans s'en dégager. Il s'assoit pour manger et toute la plaine bascule : <b>le pas du géant</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターン歩いても巨人の影から出られなかった。彼が食事のために腰を下ろすと、平野がまるごと傾く。<b>ダイダラボウの足音</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the shell mound at Ōkushi is real and about four thousand years old, and the giant was invented to explain it. Across Japan his name later got attached to any hollow that looked like a footprint — but this book is the oldest place he appears, so every one of those ponds is a descendant of this hill.|<b>Tras la historia:</b> el concheros de Ōkushi es real y tiene unos cuatro mil años; el gigante se inventó para explicarlo. Su nombre acabó pegado a cualquier hondonada con forma de huella en todo Japón, pero aquí aparece por primera vez.|<b>Derrière l'histoire :</b> l'amas coquillier d'Ōkushi est réel et vieux d'environ quatre mille ans ; le géant fut inventé pour l'expliquer. Son nom s'attacha ensuite à tout creux en forme d'empreinte au Japon, mais c'est ici qu'il paraît d'abord.|<b>物語の背景:</b> 大串の貝塚は実在し、およそ四千年前のものである。巨人はそれを説明するために生まれた。のちに日本各地で、足跡のような窪地には彼の名が付けられていったが、最初に現れるのはこの書である。全国のその池はみな、この丘の子孫にあたる。",
  ),
  pleased: t(
    "He reaches past you for the water and something spills out of his hand. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se estira sobre ti hacia el agua y algo se le cae de la mano. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il se penche par-dessus toi vers l'eau et quelque chose lui échappe de la main. <b>{0}</b> gagne <span class='money'>+{1}</span>.|彼が頭越しに水へ手を伸ばしたとき、掌から何かがこぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A shell from the old mound is held up where he can see it. He straightens, satisfied that he has eaten, and steps over <b>{0}</b> without noticing this turn.|Se le muestra una concha del viejo túmulo. Se yergue, convencido de que ya ha comido, y pasa por encima de <b>{0}</b> sin verlo este turno.|On lui montre une coquille du vieux tertre. Il se redresse, convaincu d'avoir mangé, et enjambe <b>{0}</b> sans le voir ce tour-ci.|古い塚の貝を一つ、見えるように掲げた。彼はもう食べたのだと納得して身を起こし、このターンは <b>{0}</b> をまたいで気づかずに行き過ぎた。",
  ),
};

/** 災難7種。巨人の歩きかたに合わせて、大きくて鈍いものにしてある。 */
export const IBARAKI_DOOM = [
  {
    id: "ashiato-numa",
    n: t("A footprint fills with water|Una huella se llena de agua|Une empreinte se remplit d'eau|足跡が水を溜める"),
    t: t(
      "The field you crossed yesterday is a pond this morning, and there is no way round it. Half the small ponds on this plain are explained the same way, which is no comfort at all when the road goes into one.|El campo que cruzaste ayer es hoy un estanque y no hay rodeo. La mitad de las charcas de esta llanura se explican igual, lo que no consuela cuando el camino entra en una.|Le champ traversé hier est un étang ce matin, et pas moyen de le contourner. La moitié des mares de cette plaine s'explique ainsi, ce qui ne console guère.|昨日渡った畑が、今朝は池になっている。迂回する道はない。この平野の小さな池の半分は同じ理由で説かれるが、道がその一つに沈んでいるときには何の慰めにもならない。",
    ),
  },
  {
    id: "karakkaze-doom",
    n: t("The dry wind does not stop|El viento seco no cesa|Le vent sec ne cesse pas|からっ風が止まない"),
    t: t(
      "Four days of it, and everything you own has sand in it — the seams, the food, the workings of the lock. Nothing blows in from the sea here; it comes down off the mountains already dry, and it does not soften until it reaches the coast.|Cuatro días así y todo lo tuyo tiene arena: las costuras, la comida, la cerradura. No viene del mar, sino ya seco de la montaña.|Quatre jours ainsi, et tout ce que tu possèdes a du sable dedans : coutures, nourriture, serrure. Il ne vient pas de la mer mais des monts, déjà sec.|四日続けば、持ち物のすべてに砂が入る。縫い目にも、食べ物にも、錠の中にも。この風は海からではなく、乾ききって山から下りてくる。海岸に届くまで和らがない。",
    ),
  },
  {
    id: "kaminari",
    n: t("Thunder over the plain|Truenos sobre la llanura|Le tonnerre sur la plaine|平野の雷"),
    t: t(
      "The storm builds all afternoon over flat ground with nothing to break it, and comes down on whatever stands tallest. Power goes, the pumps stop, and what was in the cold store is worth less by evening.|La tormenta se forma toda la tarde sobre terreno llano y cae sobre lo más alto. Se va la luz, paran las bombas y lo del frigorífico vale menos al anochecer.|L'orage se forme tout l'après-midi sur un sol plat et frappe ce qui dépasse. Le courant tombe, les pompes s'arrêtent, et la chambre froide perd sa valeur.|遮るもののない平地の上で午後じゅう育った雷雲が、いちばん高いものへ落ちる。電気が止まり、ポンプが止まり、冷蔵庫の中身は夕方には値打ちを下げている。",
    ),
  },
  {
    id: "mizu-ga-hikanai",
    n: t("The water will not go down|El agua no baja|L'eau ne redescend pas|水が引かない"),
    t: t(
      "A lake four metres deep and 220 km² wide has nowhere to drain quickly, so a wet week stands for a month. The lotus beds are under, the roads along the shore are under, and everyone waits.|Un lago de cuatro metros de hondo y 220 km² no desagua deprisa: una semana de lluvia se queda un mes. Los lotales están bajo el agua y todos esperan.|Un lac de quatre mètres de fond sur 220 km² ne s'écoule pas vite : une semaine de pluie reste un mois. Les lotus sont sous l'eau, et l'on attend.|深さ4メートル、面積220平方キロメートルの湖には、水を早く逃がす先がない。一週間の雨がひと月居座る。れんこん田は水の下、岸沿いの道も水の下で、みなが待つ。",
    ),
  },
  {
    id: "shio-ga-noboru",
    n: t("The tide comes up the river|La marea remonta el río|La marée remonte le fleuve|潮が川を遡る"),
    t: t(
      "Salt water pushes far inland on a spring tide and gets into the paddies nearest the mouth. It is the same tide that keeps the clams fat in the brackish lake, so the district curses and blesses it in the same breath.|El agua salada sube muy adentro con la marea viva y entra en los arrozales más cercanos a la boca. Es la misma marea que engorda las almejas del lago salobre.|L'eau salée remonte loin à la marée de vive-eau et gagne les rizières proches de l'embouchure. C'est la marée qui engraisse les palourdes du lac saumâtre.|大潮になると海水が内陸まで押し上がり、河口に近い田に入り込む。汽水の沼でシジミを太らせているのと同じ潮なので、この土地は同じ息で潮を呪い、潮に感謝する。",
    ),
  },
  {
    id: "hakobi-ga-tsukanai",
    n: t("Nothing can be moved|Nada se puede mover|Rien ne peut bouger|運び手がつかまらない"),
    t: t(
      "Everything here leaves by road, and today the road is shut. Two or three highways carry the whole prefecture towards Tokyo, and when one of them stops there is no second way to try.|Todo sale de aquí por carretera, y hoy la carretera está cortada. Dos o tres vías llevan toda la prefectura hacia Tokio; si una para, no hay otra.|Tout part d'ici par la route, et aujourd'hui la route est coupée. Deux ou trois axes portent toute la préfecture vers Tokyo ; si l'un s'arrête, il n'y a pas de second.|ここのものはすべて道路で出ていく。その道路が今日は止まっている。県じゅうの荷を東京へ運ぶ幹線は二、三本しかなく、一本が止まれば試す先がない。",
    ),
  },
  {
    id: "hoshiba-ga-nureru",
    n: t("Rain on the drying racks|Lluvia sobre los secaderos|Pluie sur les claies|干し場が濡れる"),
    t: t(
      "The slices were out in the open, as they must be, and a warm wet night took the lot. There is no indoor way to make this — the whole product is three months of cold dry wind, and a single bad week is the year.|Las lonchas estaban al aire libre, como debe ser, y una noche cálida y húmeda se las llevó. No hay forma de hacerlo bajo techo.|Les tranches étaient dehors, comme il se doit, et une nuit tiède et humide a tout emporté. Il n'y a pas de manière de le faire à l'abri.|薄切りは、そうするほかないので野天に出してあった。生ぬるく湿った一夜がそのすべてを持っていった。屋内で作る方法はない。この品そのものが三か月ぶんの冷たい乾いた風であり、一週間の悪天がその年になる。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。**その月にその場所で実際に起きることだけを書く。**
 * 「県北が不況」のような地方まるごとの好不況は茨城では嘘になるため使わない。
 */
export const IBARAKI_SEASONS = [
  {
    e: "🌾",
    n: t("Water goes into the paddies|El agua entra en los arrozales|L'eau entre dans les rizières|田に水が入る"),
    t: t(
      "In a fortnight the flat land between the plateaus turns from brown to a sheet of standing water, and for a few weeks the whole plain reflects the sky. The frogs start the same night the water does, all of them at once.|En quince días la tierra llana entre las mesetas pasa de parda a lámina de agua, y durante unas semanas la llanura entera refleja el cielo. Las ranas empiezan la misma noche que el agua.|En quinze jours, la terre plate entre les plateaux passe du brun à une nappe d'eau, et la plaine entière reflète le ciel. Les grenouilles commencent la nuit même.|二週間のうちに、台地のあいだの平らな土地が茶色から一面の水になり、しばらくのあいだ平野じゅうが空を映す。蛙は水と同じ晩に、いっせいに鳴きはじめる。",
    ),
    f: t(
      "Ibaraki farms more land than almost any other prefecture, and it is nearly all flat, which is why the flooding happens everywhere at the same time rather than valley by valley.|Ibaraki cultiva más superficie que casi ninguna otra prefectura, y es casi toda llana: por eso la inundación ocurre a la vez en todas partes.|Ibaraki cultive plus de terres que presque toute autre préfecture, et presque toute plate : l'inondation se fait donc partout en même temps.|茨城県の耕地面積は全国有数で、そのほとんどが平らです。谷ごとに順にではなく、どこも同時に水が入るのはそのためです。",
    ),
  },
  {
    e: "🍈",
    n: t("Melons and the first tea|Melones y el primer té|Melons et premier thé|メロンと新茶"),
    t: t(
      "The sorting sheds run all day on the eastern plateau, and in the west the first flush of tea comes off the bushes. Both are the same weather — a dry, bright, still stretch that lets sugar and leaf come on together.|Los almacenes de clasificación no paran en la meseta oriental, y al oeste se recoge el primer brote de té. Es el mismo tiempo: seco, luminoso y quieto.|Les hangars de tri tournent tout le jour sur le plateau est, et à l'ouest on cueille la première pousse de thé. Même météo : sec, clair et calme.|東の台地では選果場が一日じゅう動き、西では茶の一番茶が摘まれる。どちらも同じ天気の産物で、乾いて明るく風のない日が続くと、糖も葉も一緒に乗ってくる。",
    ),
    f: t(
      "Tea grown this far north is unusual, and Sashima tea was the first Japanese tea shipped abroad, reaching New York in 1859.|El té cultivado tan al norte es raro, y el de Sashima fue el primer té japonés enviado al extranjero: llegó a Nueva York en 1859.|Le thé cultivé si au nord est rare, et celui de Sashima fut le premier thé japonais expédié à l'étranger, à New York en 1859.|これほど北で茶を作るのは珍しいことです。猿島茶は海外へ送られた最初の日本茶で、1859年にニューヨークへ渡りました。",
    ),
  },
  {
    e: "🪻",
    n: t("Irises along the canals|Lirios en los canales|Iris le long des canaux|水路のあやめ"),
    t: t(
      "For three weeks the banks of the waterways are lined with iris, and the flat-bottomed boats that once carried brides between villages are put back on the water for visitors. The rain starts in the same weeks and nobody minds much.|Durante tres semanas los canales se orlan de lirios y las barcas planas que llevaban novias entre aldeas vuelven al agua. La lluvia empieza esas mismas semanas.|Trois semaines durant, les berges se bordent d'iris et les barques plates qui portaient les mariées reprennent l'eau. La pluie commence alors, sans gêner personne.|三週間ほど、水路の岸があやめで縁取られる。かつて村から村へ花嫁を運んだ平底の舟が、客を乗せてまた水に浮かぶ。梅雨はその同じ週に始まるが、誰もさして気にしない。",
    ),
    f: t(
      "Where the land is this low and this wet, the canals were the roads: a bride went to her husband's house by boat because there was no other way to get there.|Donde la tierra es tan baja y húmeda, los canales eran los caminos: la novia iba en barca porque no había otro modo.|Là où la terre est si basse et si humide, les canaux étaient les routes : la mariée allait en barque faute d'autre chemin.|土地がこれほど低く水気が多いところでは、水路が道でした。花嫁が舟で嫁いだのは、ほかに行きようがなかったからです。",
    ),
  },
  {
    e: "🏖️",
    n: t("The sea opens|Se abre el mar|La mer s'ouvre|海が開く"),
    t: t(
      "The beaches open in the middle of the month and fill with families up from Tokyo, because this is the nearest open Pacific to the capital. The sail-trawlers go out on the lake the same season, now for the look of the thing rather than the fish.|Las playas abren a mitad de mes y se llenan de familias de Tokio: es el Pacífico abierto más cercano a la capital. Las barcas de vela salen al lago esa misma temporada.|Les plages ouvrent à la mi-mois et se remplissent de familles venues de Tokyo : c'est le Pacifique ouvert le plus proche de la capitale. Les barques à voile ressortent alors sur le lac.|海開きは月半ば。首都からいちばん近い外洋の海なので、東京から上がってきた家族連れで埋まる。湖では同じ季節に帆引き船が出る。いまは漁のためというより、見せるためである。",
    ),
    f: t(
      "The sail-trawler was a working boat until nets could be pulled by engine; it survives now because it is the most photographed thing on the lake.|La barca de vela fue una embarcación de trabajo hasta que llegaron los motores; sobrevive por ser lo más fotografiado del lago.|La barque à voile fut un bateau de travail jusqu'aux moteurs ; elle survit aujourd'hui comme l'objet le plus photographié du lac.|帆引き船は、機関で網を曳けるようになるまでは働く舟でした。いま残っているのは、湖でいちばん写真に撮られるものだからです。",
    ),
  },
  {
    e: "🎆",
    n: t("Thunder, real and made|Truenos, reales y fabricados|Tonnerre, vrai et fabriqué|雷と、雷でないもの"),
    t: t(
      "Storms build over the flat ground most afternoons and break in the early evening, and the fireworks makers work through the heat preparing for autumn. It is the loudest month of the year in every sense.|Las tormentas se forman casi cada tarde y estallan al anochecer, mientras los pirotécnicos trabajan en el calor preparando el otoño. Es el mes más ruidoso del año.|Les orages se forment presque chaque après-midi et éclatent au soir, tandis que les artificiers préparent l'automne dans la chaleur. C'est le mois le plus bruyant de l'année.|平らな土地の上でほとんど毎日午後に雷雲が育ち、夕方に崩れる。花火師は暑さのなかで秋の支度を進める。どの意味でも一年でいちばんやかましい月である。",
    ),
    f: t(
      "Flat open country with nothing to break the air is exactly the ground thunderstorms like, which is why they are so regular here in high summer.|El campo llano y abierto, sin nada que rompa el aire, es justo el terreno que gustan a las tormentas.|Une campagne plate et ouverte, sans rien pour briser l'air, est précisément ce qu'aiment les orages.|空気を遮るもののない平らな土地は、雷雲が好む地形そのものです。真夏にこれほど規則正しく雷が鳴るのはそのためです。",
    ),
  },
  {
    e: "🍐",
    n: t("Pears, and the wind that takes them|Peras, y el viento que se las lleva|Poires, et le vent qui les emporte|梨と、それを落とす風",
    ),
    t: t(
      "The fruit is at its heaviest and still on the tree, and this is the month the storms come up the coast. A grower watches the forecast the way a sailor does, and picks early if there is any doubt at all.|La fruta está en su punto más pesado y aún en el árbol, y es el mes en que las tormentas suben por la costa. El fruticultor mira el parte como un marinero.|Le fruit est au plus lourd et encore sur l'arbre, et c'est le mois où les tempêtes remontent la côte. Le producteur guette le bulletin comme un marin.|実がいちばん重くなり、まだ木に付いている。そしてこの月、嵐が海岸を上がってくる。梨作りは船乗りのように天気図を見て、少しでも怪しければ早採りする。",
    ),
    f: t(
      "Pears here are trained flat on overhead frames so pickers can walk beneath, which spreads the weight but gives a typhoon a sail to push against.|Aquí los perales se conducen en emparrado plano para poder andar debajo, lo que reparte el peso pero ofrece al tifón una vela.|Ici les poiriers sont conduits à plat sur des treilles pour qu'on passe dessous : le poids se répartit, mais le typhon y trouve une voile.|この土地の梨は、人が下を歩けるように棚へ平らに仕立てます。重さは分散しますが、そのぶん台風には帆になります。",
    ),
  },
  {
    e: "🎇",
    n: t("Fireworks judged like a craft|Fuegos juzgados como oficio|Des feux jugés comme un métier|技を裁かれる花火"),
    t: t(
      "Makers come from all over the country and are scored shell by shell, in silence, by judges who have watched this for decades. The chrysanthemum growers are dressing their figures the same weeks, and the new buckwheat opens in the northern valleys.|Los pirotécnicos llegan de todo el país y se les puntúa bomba a bomba, en silencio. Esas mismas semanas se visten las figuras de crisantemo y se abre el trigo nuevo en el norte.|Les artificiers viennent de tout le pays et sont notés bombe par bombe, en silence. Les mêmes semaines, on habille les figures de chrysanthèmes et le sarrasin nouveau s'ouvre au nord.|花火師が全国から集まり、玉ごとに、静かに、何十年も見てきた審査員に点を付けられる。同じ週、菊人形には花が着せられ、北の谷では新そばが出る。",
    ),
    f: t(
      "Judging fireworks as a competition rather than a display has gone on here since 1925, and a maker's reputation for the year is settled in one evening.|Juzgar los fuegos como competición y no como espectáculo se hace aquí desde 1925: la fama del año se decide en una noche.|Juger les feux en concours plutôt qu'en spectacle se pratique ici depuis 1925 : la réputation d'une année se joue en un soir.|見せるためではなく競技として花火を裁く催しは、ここで1925年から続いています。その年の評判が一晩で決まります。",
    ),
  },
  {
    e: "🍁",
    n: t("The gorges turn|Los desfiladeros cambian|Les gorges tournent|渓谷が色を変える"),
    t: t(
      "The northern valleys colour from the top down over about three weeks, and the suspension bridges over them are crossed slowly by people who stop in the middle. On the plain the sweet potato comes up and goes straight to the steamers.|Los valles del norte se tiñen de arriba abajo en unas tres semanas, y los puentes colgantes se cruzan despacio. En la llanura se arranca el boniato y va derecho a las vaporeras.|Les vallées du nord se colorent du haut vers le bas en trois semaines, et l'on traverse lentement les ponts suspendus. En plaine, la patate douce part droit aux étuves.|北の谷は三週間ほどかけて上から下へ色づき、その上に架かる吊り橋を、人は真ん中で立ち止まりながらゆっくり渡る。平野ではさつまいもが掘り上げられ、そのまま蒸し器へ運ばれる。",
    ),
    f: t(
      "The colour moves downhill at roughly a hundred metres of altitude a day, so the same valley is worth visiting twice three weeks apart.|El color baja unos cien metros de altitud al día, así que el mismo valle merece dos visitas con tres semanas de diferencia.|La couleur descend d'une centaine de mètres d'altitude par jour : la même vallée mérite deux visites à trois semaines d'écart.|色は一日におよそ標高100mずつ下ります。同じ谷を三週間あけて二度訪ねる値打ちがあるのはそのためです。",
    ),
  },
  {
    e: "🌬️",
    n: t("The racks go up|Se montan los secaderos|On dresse les claies|干し場が立つ"),
    t: t(
      "Whole fields near the coast are filled with wooden racks, and the sliced potato goes out to meet the wind coming off the mountains. It must be cold, dry and clear for three months, and everyone watches the sky for the one wet week that would ruin it.|Campos enteros junto a la costa se llenan de bastidores y el boniato cortado sale a recibir el viento de la montaña. Deben ser tres meses fríos, secos y claros.|Des champs entiers près de la côte se couvrent de claies, et la patate tranchée sort au vent des montagnes. Il faut trois mois froids, secs et clairs.|海に近い畑がまるごと木の棚で埋まり、薄切りにした芋が山から下りてくる風を受けに出る。三か月のあいだ寒く、乾き、晴れていなければならない。誰もが、それを台無しにする雨の一週間を恐れて空を見る。",
    ),
    f: t(
      "About nine tenths of Japan's dried sweet potato is made in this one prefecture, entirely because of what its winter is like.|Cerca de nueve décimas partes del boniato seco de Japón se hace en esta prefectura, únicamente por cómo es su invierno.|Près des neuf dixièmes de la patate douce séchée du Japon se font dans cette seule préfecture, uniquement à cause de son hiver.|日本の干し芋のおよそ九割がこの一県で作られます。理由はひとえに、ここの冬がどういうものかにあります。",
    ),
  },
  {
    e: "🧊",
    n: t("The waterfall stops|La cascada se detiene|La chute s'arrête|滝が止まる"),
    t: t(
      "In the coldest years the whole 120-metre face freezes into a wall of ice, and the road up is queued from before dawn. On the coast the sun comes straight out of the open sea, and the first sunrise of the year fills every east-facing shore.|En los años más fríos toda la pared de 120 m se hiela y la carretera se llena antes del alba. En la costa el sol sale del mar abierto y el primer amanecer llena cada playa.|Les années les plus froides, les 120 m gèlent entièrement et la route est prise avant l'aube. Sur la côte, le soleil sort de la pleine mer.|寒い年には高さ120mの岩壁がまるごと凍って氷の壁になり、上る道は夜明け前から車が並ぶ。海沿いでは日が外洋から直接昇り、東向きの浜という浜が初日の出の人で埋まる。",
    ),
    f: t(
      "The prefecture's coast faces due east with nothing in the way, so the sun rises out of water rather than over a headland — the reason the beaches fill on the first morning of the year.|La costa mira al este sin nada delante: el sol sale del agua y no tras un cabo. De ahí que las playas se llenen la primera mañana del año.|La côte regarde plein est sans obstacle : le soleil sort de l'eau et non derrière un cap. D'où les plages pleines au premier matin de l'année.|この県の海岸は遮るもののない東向きなので、日は岬の陰からではなく水平線から昇ります。元日の朝に浜が埋まるのはそのためです。",
    ),
  },
  {
    e: "🌸",
    n: t("Plum before anything else|Ciruelo antes que nada|Le prunier avant tout|何よりも先に梅"),
    t: t(
      "Three thousand trees of a hundred varieties open over six weeks rather than all at once, so the crowds keep coming while the rest of the country is still waiting for spring. On the mountain the same trees open a fortnight later, and the one road up stops moving.|Tres mil árboles de cien variedades abren a lo largo de seis semanas, no de golpe, y la gente sigue viniendo mientras el resto del país aún espera. En el monte abren quince días después.|Trois mille arbres de cent variétés s'ouvrent sur six semaines et non d'un coup : on continue d'affluer quand le reste du pays attend encore. Sur la montagne, ils fleurissent quinze jours plus tard.|百品種三千本の梅が、一斉にではなく六週間かけて順に開く。国じゅうがまだ春を待っているあいだ、ここだけ人が絶えない。山の梅は二週間遅れて咲き、上る一本道は動かなくなる。",
    ),
    f: t(
      "The garden was opened to the townspeople from the start in 1842, which was unusual for a lord's garden, and the plum was chosen because it flowers when nothing else will.|El jardín se abrió a los vecinos desde 1842, algo insólito, y se eligió el ciruelo porque florece cuando nada más lo hace.|Le jardin fut ouvert aux habitants dès 1842, chose rare, et le prunier choisi parce qu'il fleurit quand rien d'autre ne fleurit.|この庭は1842年、はじめから領民に開かれました。大名の庭としては異例です。梅が選ばれたのは、ほかに何も咲かない時期に咲くからです。",
    ),
  },
  {
    e: "🍑",
    n: t("Peach blossom on the old ground|Flor de melocotón en el viejo recinto|Fleurs de pêcher sur l'ancien terre-plein|城跡の桃"),
    t: t(
      "In the west the flowering peaches come out on what used to be a castle's outer ground, and they are grown for blossom alone — no fruit is ever picked from them. Everywhere else the fields are being turned over, and the water is nearly ready to go back in.|Al oeste los melocotoneros de flor brotan sobre el antiguo recinto de un castillo, cultivados solo por la flor. En el resto se labra la tierra y el agua está a punto de volver.|À l'ouest, les pêchers à fleurs s'ouvrent sur l'ancienne enceinte d'un château, cultivés pour la seule fleur. Ailleurs, on retourne les champs et l'eau va revenir.|西では、城の外郭だった土地に花桃が咲く。花のためだけに育てられ、実は一つも採らない。ほかの土地では畑が起こされ、じきにまた水が入る。",
    ),
    f: t(
      "Flowering peach and fruiting peach are different trees bred for different ends; the flowering kind gives a better blossom and a fruit not worth eating.|El melocotonero de flor y el de fruto son árboles distintos: el primero da mejor flor y un fruto que no vale comer.|Pêcher à fleurs et pêcher à fruits sont deux arbres distincts : le premier donne une meilleure fleur et un fruit sans intérêt.|花桃と実桃は目的の違う別の木です。花桃はよい花を咲かせますが、実は食べるに値しません。",
    ),
  },
];
