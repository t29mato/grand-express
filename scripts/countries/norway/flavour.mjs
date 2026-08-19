/**
 * ノルウェーの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・韓国・フランスと同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果は `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 *
 * アイテムの効果は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存の全盤面と重ならないことを確認済み(reinsdyr / hurtigrute /
 * regiontog / flytoget / rommegrot / jernspiker / lesenotater / solvklump /
 * hurtigbat)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const NORWAY_META = {
  id: "norway",
  name: t("Norway|Noruega|Norvège|ノルウェー"),
  blurb: t(
    "A country stretched so long north that its own railway gives up before the land does|Un país tan alargado hacia el norte que su propio ferrocarril se rinde antes que la tierra|Un pays si étiré vers le nord que son propre chemin de fer abandonne avant la terre|鉄道が国土より先に音を上げるほど、北へ長く伸びた国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が持つ。
  // 1NOK≒14.3円(USD/JPY≒150、USD/NOK≒10.5から逆算)として
  // 12,000,000÷14.3÷1200≒699 → 700。team-lead確認済み(2026-08-19)。
  cur: { pre: "kr", post: "", mul: 700 },
  start: "oslo",
  cpuNames: ["Nissen", "Trollet", "Huldra", "Draugen"],
  // ノルウェー国旗の赤・青・白に、木材と山の色を添える。
  stripe: ["#BA0C2F", "#00205B", "#F5F5F0", "#7A6A52", "#4C6B4C"],
};

/** 5区分。決定理由は REGISTER.md 参照。 */
export const NORWAY_REGIONS = {
  ol: t("Østlandet, around Oslo|Østlandet, en torno a Oslo|Østlandet, autour d'Oslo|エストラン(オスロ周辺)"),
  ve: t("Vestlandet, the fjord country|Vestlandet, el país de los fiordos|Vestlandet, le pays des fjords|ヴェストラン(フィヨルド地帯)"),
  tr: t("Trøndelag|Trøndelag|Trøndelag|トロンデラーグ"),
  nn: t("Nord-Norge, the far north|Nord-Norge, el extremo norte|Nord-Norge, le grand nord|ヌール・ノルゲ(北部)"),
  so: t("Sørlandet, the south coast|Sørlandet, la costa sur|Sørlandet, la côte sud|スールラン(南部海岸)"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ(move / choose-distance /
 * 2dice / 3dice / auto-block / drive-spirit / quiz-safety / sell-for-cash /
 * extra-turn)。
 */
export const NORWAY_ITEMS = {
  reinsdyr: {
    e: "🦌",
    price: 240,
    kind: "move",
    n: t("A Ride on a Reindeer Sled|Un paseo en trineo de renos|Une balade en traîneau à rennes|トナカイぞりに乗って"),
    d: t(
      "Carried 8–12 squares. The herd picks where you come down.|Te lleva de 8 a 12 casillas. La manada elige dónde bajas.|Emporté de 8 à 12 cases. Le troupeau choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは群れまかせ。",
    ),
    f: t(
      "Sámi herders drive their reindeer along migration routes fixed by the animals themselves rather than by any human plan, since a herd that senses better grazing ahead will simply go there regardless of where its handler intended. A rider on the sled goes wherever the reindeer decide the day's route runs.|Los pastores samis conducen a sus renos por rutas migratorias que fijan los propios animales y no ningún plan humano, ya que una manada que intuye mejores pastos más adelante simplemente va allí, sin importar adónde pretendiera su guía. Quien viaja en el trineo va adonde los renos decidan que corre la ruta del día.|Les éleveurs samis conduisent leurs rennes sur des itinéraires de migration fixés par les animaux eux-mêmes plutôt que par un quelconque plan humain, car un troupeau qui sent de meilleurs pâturages plus loin s'y rendra simplement, quel que soit le projet du berger. Qui voyage sur le traîneau va où les rennes décident que mène la route du jour.|サーミの放牧民はトナカイの群れを追うが、その移動経路を決めるのは人の計画ではなく動物たち自身である。先によい牧草地があると群れが感じ取れば、飼い主の思惑にかかわらずそちらへ進んでしまう。そりに乗る者は、その日トナカイが決めた道をただ行くしかない。",
    ),
  },
  hurtigrute: {
    e: "🚢",
    price: 380,
    kind: "pre",
    n: t("A Hurtigruten Berth, Booked Ahead|Un camarote del Hurtigruten, reservado con antelación|Une cabine du Hurtigruten, réservée à l'avance|予約済みのフッティルーテンの寝台"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Hurtigruten timetables have listed exact arrival times at each of the coast's ports since 1893, precise enough that fishing villages once set their clocks by the ship's whistle rather than the other way around. A berth booked ahead guarantees passage on a fixed, chosen date rather than whenever a seat happens to be free.|Los horarios del Hurtigruten han indicado la hora exacta de llegada a cada puerto de la costa desde 1893, con una precisión tal que antes los pueblos pesqueros ponían en hora sus relojes por el silbato del barco y no al revés. Un camarote reservado con antelación garantiza el pasaje en una fecha fija y elegida, no cuando haya un asiento libre.|Les horaires du Hurtigruten indiquent l'heure exacte d'arrivée à chaque port de la côte depuis 1893, avec une précision telle que les villages de pêcheurs réglaient jadis leurs horloges sur le sifflet du bateau plutôt que l'inverse. Une cabine réservée à l'avance garantit une place à une date fixe et choisie, plutôt que lorsqu'un siège se libère par hasard.|フッティルーテンの時刻表は1893年以来、沿岸の各港への正確な到着時刻を記してきた。あまりに正確なため、かつて漁村では逆に船の汽笛で時計を合わせていたほどである。前もって予約した寝台は、席が偶然空いたときではなく、自分で選んだ決まった日に乗れることを保証する。",
    ),
  },
  regiontog: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Regiontog Ticket|Billete de Regiontog|Billet de Regiontog|レギオントーグ切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Norway's regional trains are the slower of the country's two named passenger grades, built to serve towns the express service runs straight past, and many of their routes follow branch lines that would otherwise have lost their last passenger service decades ago.|Los trenes regionales de Noruega son la más lenta de las dos categorías de pasajeros con nombre del país, pensados para las localidades que el servicio exprés se salta, y muchas de sus rutas siguen ramales que, si no, habrían perdido su último servicio de pasajeros hace décadas.|Les trains régionaux de Norvège sont la plus lente des deux catégories nommées de trains voyageurs du pays, conçus pour desservir les villes que l'express se contente de traverser, et nombre de leurs lignes suivent des antennes qui, sans eux, auraient perdu leur dernier service voyageurs depuis des décennies.|ノルウェーの地域列車(レギオントーグ)は、名前の付いた2種の旅客列車のうち遅いほうで、急行が素通りする町に仕えるために走る。その多くの路線は、この列車が無ければ何十年も前に最後の旅客便を失っていたであろう支線をたどっている。",
    ),
  },
  flytoget: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Flytoget Express Ticket|Billete del Flytoget exprés|Billet du Flytoget express|フライトーゲット特急切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Flytoget covers the 19 minutes between Oslo's centre and its airport at up to 210 kilometres per hour, and its trains are timed tightly enough that the operator has long promised a partial refund to any passenger delayed more than 20 minutes.|El Flytoget cubre los 19 minutos entre el centro de Oslo y su aeropuerto a hasta 210 kilómetros por hora, y sus trenes van tan ajustados de horario que el operador lleva años prometiendo un reembolso parcial a cualquier pasajero con más de 20 minutos de retraso.|Le Flytoget couvre les 19 minutes entre le centre d'Oslo et son aéroport à jusqu'à 210 kilomètres à l'heure, et ses trains sont si serrés à l'horaire que l'exploitant promet depuis longtemps un remboursement partiel à tout passager retardé de plus de 20 minutes.|フライトーゲットはオスロ中心部と空港の間、最高時速210kmでわずか19分を結ぶ。あまりに正確な時刻管理のため、運行会社は20分を超える遅延があれば一部払い戻すと長年約束している。",
    ),
  },
  rommegrot: {
    e: "🥣",
    price: 320,
    kind: "passive",
    n: t("A Bowl of Rømmegrøt Left Out|Un cuenco de rømmegrøt dejado fuera|Un bol de rømmegrøt laissé dehors|外に置いたロンメグロート"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Sour-cream porridge topped with melted butter and sugar was traditionally set out on the barn floor overnight for the nisse who was believed to watch over the farm, since a nisse denied his bowl was said to turn spiteful, souring the milk or tangling the cattle's tails by morning.|Las gachas de nata agria coronadas con mantequilla derretida y azúcar se dejaban tradicionalmente en el suelo del granero durante la noche para el nisse que se creía velaba por la granja, pues se decía que un nisse sin su cuenco se volvía rencoroso y agriaba la leche o enredaba las colas del ganado antes del amanecer.|La bouillie à la crème aigre, nappée de beurre fondu et de sucre, était traditionnellement déposée la nuit sur le sol de la grange pour le nisse censé veiller sur la ferme, car un nisse privé de son bol devenait, disait-on, rancunier, faisant tourner le lait ou emmêlant la queue du bétail avant le matin.|サワークリームで作り溶かしバターと砂糖をのせた粥は、農場を見守るとされるニッセのために、伝統的に一晩中納屋の床に置かれた。椀を与えられなかったニッセは意地悪になり、朝までに牛乳を酸っぱくしたり牛の尻尾を絡ませたりすると言われていたからである。",
    ),
  },
  jernspiker: {
    e: "🔩",
    price: 440,
    kind: "pre",
    n: t("An Iron Spike Over the Doorway|Un clavo de hierro sobre el dintel|Un clou de fer au-dessus de la porte|戸口の上の鉄の大釘"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Iron was long held to repel trolls and huldra in the Norwegian countryside, driven into doorframes or laid across a cradle, and blacksmiths were sometimes treated with a wary respect for working a metal that unsettled creatures said to prefer the old ways of stone and wood.|El hierro se consideró durante mucho tiempo capaz de repeler a trols y huldras en la Noruega rural, y se clavaba en los marcos de las puertas o se colocaba sobre una cuna; a los herreros a veces se los trataba con un respeto cauteloso por trabajar un metal que inquietaba a criaturas que, se decía, preferían las viejas formas de la piedra y la madera.|Le fer fut longtemps tenu pour repousser trolls et huldras dans les campagnes norvégiennes, planté dans les chambranles ou posé sur un berceau, et les forgerons étaient parfois traités avec un respect prudent pour travailler un métal qui troublait des créatures réputées préférer les vieilles façons de la pierre et du bois.|鉄は長らく、ノルウェーの田舎でトロルやフルドラを遠ざけると信じられ、戸枠に打ち込まれたり揺りかごの上に置かれたりした。鍛冶屋は、石や木の古いやり方を好むとされる者たちを不安にさせる金属を扱う者として、どこか用心深い敬意を持って見られることもあった。",
    ),
  },
  lesenotater: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("Borrowed Lecture Notes|Apuntes de clase prestados|Notes de cours empruntées|借りた講義ノート"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Norwegian university culture leans on kollokvier, informal study groups where students compare notes and argue through problem sets together before an exam, and a borrowed notebook from someone who attended every lecture is treated as worth more than a textbook.|La cultura universitaria noruega se apoya en los kollokvier, grupos de estudio informales donde los alumnos comparan apuntes y discuten juntos los ejercicios antes de un examen, y unos apuntes prestados de alguien que fue a todas las clases se consideran más valiosos que un libro de texto.|La culture universitaire norvégienne s'appuie sur les kollokvier, des groupes d'étude informels où les étudiants comparent leurs notes et discutent ensemble des exercices avant un examen, et des notes empruntées à quelqu'un qui a assisté à tous les cours sont jugées plus précieuses qu'un manuel.|ノルウェーの大学文化は「コロクヴィエル」と呼ばれる非公式の勉強会に支えられている。試験前に学生どうしノートを見せ合い、一緒に問題を議論する集まりである。すべての講義に出ていた誰かから借りたノートは、教科書より値打ちがあるとされる。",
    ),
  },
  solvklump: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Lump of Kongsberg Silver|Un pedazo de plata de Kongsberg|Un lingot d'argent de Kongsberg|コングスベルグ産の銀塊"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Kongsberg's mines once yielded silver in pieces large enough to be displayed whole rather than melted down, including one nugget weighing several hundred kilograms that was cut apart specifically so it would fit through the mine's own entrance shaft.|Las minas de Kongsberg llegaron a producir plata en piezas tan grandes que se exhibían enteras en vez de fundirse, incluida una pepita de varios cientos de kilos que se cortó expresamente para que cupiera por el propio pozo de entrada de la mina.|Les mines de Kongsberg produisirent autrefois de l'argent en morceaux assez gros pour être exposés entiers plutôt que fondus, dont une pépite de plusieurs centaines de kilos qu'il fallut découper spécialement pour qu'elle passe par le puits d'entrée de la mine elle-même.|コングスベルグの鉱山は、溶かさずそのまま展示できるほど大きな塊で銀を産出することがあった。中には数百kgに及ぶ塊もあり、鉱山自身の入坑坑道を通すためだけにわざわざ切り分けられたという。",
    ),
  },
  hurtigbat: {
    e: "🛥️",
    price: 420,
    kind: "pre",
    n: t("An Express Boat Transfer|Un trasbordo en barco exprés|Un transfert en bateau express|急行船の乗り継ぎ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Hurtigbåt catamarans cut hours off journeys the coastal ferry takes all day to complete, skipping most intermediate ports entirely, though the trade-off is a ticket price several times higher and a hull that pitches uncomfortably in anything but calm water.|Los catamaranes hurtigbåt recortan horas a trayectos que el ferry costero tarda todo el día en completar, saltándose casi todas las escalas intermedias, aunque a cambio el billete cuesta varias veces más y el casco cabecea incómodamente si el mar no está en calma.|Les catamarans hurtigbåt retranchent des heures à des trajets que le ferry côtier met toute une journée à accomplir, sautant la plupart des escales intermédiaires, au prix toutefois d'un billet plusieurs fois plus cher et d'une coque qui tangue désagréablement dès que la mer n'est pas calme.|フッティグボート型高速船は、沿岸フェリーが丸一日かける行程を数時間短縮し、途中の港のほとんどを飛ばして進む。ただし引き換えに運賃は何倍にもなり、穏やかな海でなければ船体は不快なほど揺れる。",
    ),
  },
};

/**
 * 厄災の神。ノルウェー民話のニッセ(農場を見守るとされる、小さく髭を
 * 蓄えた妖精)にした。人を苦しめる悪霊ではなく、粥をもらえないと
 * すねて意地悪をする性格として描く(韓国のトッケビ・茨城のダイダラボウと
 * 同じく「残酷ではなく、ただ度が過ぎるだけ」)。
 */
export const NORWAY_SPIRIT = {
  e: "🧝",
  n: t("The Nisse|El nisse|Le nisse|ニッセ"),
  big: t("The Nisse's Tug-of-War|El pulso del nisse|Le bras de fer du nisse|ニッセの綱引き"),
  ward: "rommegrot",
  arrive: t(
    "<b>🧝 A nisse has taken an interest in you.</b> Old belief holds that these small, bearded farmhands are older than the farms themselves, tending the barn and livestock through the night in exchange for nothing more than a bowl of porridge — and turning spiteful, not cruel, the moment that bowl is forgotten. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧝 Un nisse se ha fijado en ti.</b> Una vieja creencia sostiene que estos pequeños mozos de granja barbudos son más viejos que las propias granjas, y cuidan el granero y el ganado durante la noche a cambio de nada más que un cuenco de gachas, volviéndose rencorosos, no crueles, en cuanto se olvida ese cuenco. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧝 Un nisse s'est intéressé à toi.</b> Une vieille croyance veut que ces petits valets de ferme barbus soient plus anciens que les fermes elles-mêmes, veillant sur la grange et le bétail la nuit durant contre rien de plus qu'un bol de bouillie — devenant rancuniers, non cruels, dès que ce bol est oublié. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧝 ニッセに目を付けられた。</b> 古い言い伝えによれば、この髭を蓄えた小さな農場の下働きは農場そのものより古い存在で、粥の椀ひとつと引き換えに夜通し納屋と家畜の世話をするという。その椀を忘れられると、残酷にではなく、ただ意地悪になる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧝 <b>The nisse</b> loses interest and hops after <b>{0}</b>, farthest from {1}.|🧝 <b>El nisse</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|🧝 <b>Le nisse</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|🧝 <b>ニッセ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the nisse and never once left out a bowl for him. He plants his small feet, grips the nearest rope, and challenges the whole road to a match — <b>the Nisse's Tug-of-War</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al nisse sin haberle dejado nunca un cuenco. Planta sus pequeños pies, agarra la cuerda más próxima y reta a todo el camino a un pulso — empieza <b>el pulso del nisse</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le nisse sans jamais lui avoir laissé de bol. Il plante ses petits pieds, saisit la corde la plus proche et défie toute la route à un bras de fer — <b>le bras de fer du nisse</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもニッセと歩いていながら、一度も椀を置いてやらなかった。彼は小さな足を踏ん張り、手近な綱をつかんで、道行く者すべてに勝負を挑む。<b>ニッセの綱引き</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> one Norwegian folk tale tells of a farmhand who ate the butter meant for the nisse's porridge and hid it, only for the enraged nisse to kill the farm's best cow that night — before the farmhand found the butter again, forgotten at the bottom of the very same bowl. Nobody in this game has checked the bottom of the bowl yet.|<b>Tras la historia:</b> un cuento popular noruego narra a un mozo de granja que se comió la mantequilla destinada a las gachas del nisse y la escondió, y el nisse, furioso, mató esa misma noche a la mejor vaca de la granja, justo antes de que el mozo volviera a encontrar la mantequilla, olvidada en el fondo del mismo cuenco. En esta partida, nadie ha mirado aún el fondo del cuenco.|<b>Derrière l'histoire :</b> un conte populaire norvégien raconte qu'un valet de ferme mangea le beurre destiné à la bouillie du nisse et le cacha, si bien que le nisse, furieux, tua cette nuit-là la meilleure vache de la ferme — juste avant que le valet ne retrouve le beurre, oublié au fond de ce même bol. Dans cette partie, personne n'a encore regardé le fond du bol.|<b>物語の背景:</b> あるノルウェーの民話では、下働きの男がニッセの粥用のバターを食べて隠してしまい、怒ったニッセはその夜、農場でいちばん良い牛を殺してしまう。そのすぐ後、男はそのバターが同じ椀の底に忘れられていただけだったと気づく。この勝負では、まだ誰も椀の底を確かめていない。",
  ),
  pleased: t(
    "He swings his little axe around to show off, and a coin bounces loose from his belt. <b>{0}</b> gains <span class='money'>+{1}</span>.|Blande su hachita para presumir y una moneda se le suelta del cinturón. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il brandit sa petite hache pour frimer et une pièce se détache de sa ceinture. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに小さな斧を振り回したはずみで、帯から銭が一枚こぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A bowl of rømmegrøt, butter melting on top, is set out where he can see it. Nisser are said to forgive almost anything once fed, and he backs off, stepping past <b>{0}</b> without noticing this turn.|Se le pone delante un cuenco de rømmegrøt con la mantequilla derritiéndose encima. Se dice que los nisser perdonan casi cualquier cosa una vez alimentados, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On dépose devant lui un bol de rømmegrøt, le beurre fondant dessus. On dit que les nisser pardonnent presque tout une fois nourris, et il recule, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|バターが溶けかけたロンメグロートの椀を、見えるところに置いた。ニッセは一度食べさせればたいていのことを許すという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。ニッセのすねやすい性格に合わせつつ、実際の自然の脅威も混ぜてある。 */
export const NORWAY_DOOM = [
  {
    id: "snoskred",
    n: t("An avalanche closes the line|Una avalancha cierra la línea|Une avalanche ferme la ligne|雪崩で線路が塞がる"),
    t: t(
      "A slope that looked stable for weeks lets go without warning, burying the track under snow and rock in minutes and closing the line until crews can dig it clear. Steep mountain routes here are watched constantly for exactly this, but watching does not always mean stopping it in time.|Una ladera que llevaba semanas pareciendo estable cede sin previo aviso, sepultando la vía bajo nieve y rocas en minutos y cerrando la línea hasta que las cuadrillas puedan despejarla. Aquí se vigilan constantemente las rutas de montaña más empinadas justo por esto, pero vigilar no siempre significa detenerlo a tiempo.|Un versant qui semblait stable depuis des semaines lâche sans prévenir, ensevelissant la voie sous la neige et les rochers en quelques minutes et fermant la ligne jusqu'à ce que des équipes puissent la dégager. Les itinéraires de montagne les plus raides sont ici surveillés en permanence pour exactement cette raison, mais surveiller ne suffit pas toujours à l'arrêter à temps.|数週間安定して見えていた斜面が前触れなく崩れ、数分のうちに線路を雪と岩で埋め、除雪隊が掘り出すまで線を閉ざす。ここの急峻な山岳路線はまさにこのために常時監視されているが、見張っていても間に合うとは限らない。",
    ),
    months: [10, 11],
  },
  {
    id: "havstorm",
    n: t("A storm shuts down the coastal route|Una tormenta cierra la ruta costera|Une tempête ferme la route côtière|嵐で沿岸航路が止まる"),
    t: t(
      "Waves piling up against the coast reach a height the ferry captains have a hard limit for, and the day's sailing is cancelled with a few hours' notice, stranding whoever was counting on it. The same stretch of open water between headlands causes most of the cancellations year after year, a place local timetables quietly build slack around.|Las olas que se amontonan contra la costa alcanzan una altura para la que los capitanes de los ferris tienen un límite estricto, y la travesía del día se cancela con apenas unas horas de aviso, dejando varado a quien contaba con ella. El mismo tramo de mar abierto entre cabos provoca la mayoría de las cancelaciones año tras año, un lugar en torno al cual los horarios locales dejan discretamente un margen.|Les vagues qui s'amoncellent contre la côte atteignent une hauteur pour laquelle les capitaines de ferry ont une limite stricte, et la traversée du jour est annulée avec quelques heures de préavis, laissant en rade qui comptait dessus. Le même tronçon de mer ouverte entre deux caps provoque la plupart des annulations année après année, un endroit autour duquel les horaires locaux ménagent discrètement une marge.|岬と岬のあいだの外海で波が船長たちの定める限界の高さに達すると、その日の便は数時間前の通告だけで欠航になり、頼りにしていた者は足止めを食う。毎年、欠航の大半は同じ外海の区間で起きており、地元の時刻表はその区間を見込んでひそかに余裕を持たせてある。",
    ),
    months: [6, 7],
  },
  {
    id: "reinsdyrspor",
    n: t("Reindeer lie down on the line|Los renos se tumban en la vía|Des rennes se couchent sur la voie|トナカイが線路に寝そべる"),
    t: t(
      "A herd finds the cleared, gravel-warm track bed more comfortable than the deep snow on either side and simply refuses to move, and drivers have learned that a slow, patient approach works better than the horn. Delays measured in whole reindeer are logged often enough in winter that dispatchers barely raise an eyebrow anymore.|Una manada encuentra el lecho de grava despejada de la vía más cómodo que la nieve profunda de ambos lados y sencillamente se niega a moverse, y los maquinistas han aprendido que acercarse despacio y con paciencia funciona mejor que la bocina. En invierno se registran retrasos medidos en renos enteros con tanta frecuencia que a los despachadores ya casi ni les sorprende.|Un troupeau trouve le ballast dégagé de la voie plus confortable que la neige profonde de part et d'autre et refuse tout simplement de bouger, et les conducteurs ont appris qu'une approche lente et patiente marche mieux que le klaxon. Des retards mesurés en rennes entiers sont si souvent consignés l'hiver que les répartiteurs n'y prêtent presque plus attention.|除雪された砂利敷きの線路が両脇の深い雪より心地よいと感じた群れが、そこに寝そべって動こうとしない。運転士たちは警笛より、じっと辛抱強く近づくほうが効くと学んでいる。冬にはトナカイの頭数で測る遅れがあまりに頻繁に記録され、指令係もほとんど眉一つ動かさなくなった。",
    ),
    months: [9, 10],
  },
  {
    id: "midnattsinnsomni",
    n: t("The midnight sun steals a night's sleep|El sol de medianoche roba una noche de sueño|Le soleil de minuit vole une nuit de sommeil|白夜に眠りを奪われる"),
    t: t(
      "Sunlight leaking around the blackout curtains at what should be the darkest hour makes the whole night feel like a long, disorienting afternoon, and the receipts and tickets tucked away for safekeeping the evening before turn out, this once, to have been tucked away somewhere no one can now recall.|La luz del sol que se cuela por los bordes de las cortinas opacas en lo que debería ser la hora más oscura hace que toda la noche parezca una larga y desorientadora tarde, y los recibos y billetes guardados a buen recaudo la noche anterior resultan, esta vez, haber quedado guardados en algún sitio que ahora nadie recuerda.|La lumière du soleil qui filtre autour des rideaux occultants à l'heure censée être la plus sombre donne à toute la nuit des airs de longue après-midi désorientante, et les reçus et billets rangés en lieu sûr la veille se révèlent, cette fois, avoir été rangés quelque part dont personne ne se souvient plus.|本来いちばん暗いはずの時刻に遮光カーテンの端から日の光が漏れ込み、夜じゅうがまるで方向感覚を失わせる長い午後のように感じられる。前の晩、大事にしまっておいたはずの領収書や切符は、今回に限ってどこにしまったのか誰も思い出せない。",
    ),
    months: [2, 3],
  },
  {
    id: "bomstasjon",
    n: t("An unexpected toll gate|Un peaje inesperado|Un péage inattendu|思わぬ通行料金所"),
    t: t(
      "A bridge or tunnel that looked free on the map turns out to have its own automatic toll station, billing by number-plate recognition rather than a barrier anyone could see coming, and the invoice arrives by post weeks later with a small administrative fee added on top for the trouble of sending it.|Un puente o túnel que en el mapa parecía gratuito resulta tener su propia estación de peaje automática, que cobra por reconocimiento de matrícula en vez de una barrera visible, y la factura llega por correo semanas después con un pequeño recargo administrativo añadido por la molestia de enviarla.|Un pont ou un tunnel qui semblait gratuit sur la carte s'avère avoir sa propre station de péage automatique, facturant par reconnaissance de plaque plutôt que par une barrière visible à l'avance, et la facture arrive par courrier des semaines plus tard, majorée d'un petit frais administratif pour la peine de l'avoir envoyée.|地図では無料に見えた橋やトンネルに、実は独自の自動料金所があった。目に見える遮断機ではなくナンバープレート認識で課金する方式で、請求書は数週間後に郵送で届き、送付の手間だとして小さな事務手数料まで上乗せされている。",
    ),
  },
  {
    id: "nissespill",
    n: t("Led astray by an unfed nisse|Un nisse hambriento te hace perder el camino|Un nisse affamé t'égare|腹を空かせたニッセに化かされる"),
    t: t(
      "The path back looked exactly the same at every turn, and only well past the time it should have taken does it become clear that the same fence line was followed in a circle. Old belief blames a nisse denied his porridge for exactly this trick, walking a traveler in loops through the night for spite rather than any real cruelty.|El camino de vuelta parecía idéntico en cada recodo, y solo mucho después del tiempo que debería haber llevado queda claro que se siguió la misma valla en círculo. La vieja creencia culpa de esta treta a un nisse sin sus gachas, que hace caminar en círculos a un viajero toda la noche por rencor y no por verdadera crueldad.|Le chemin du retour semblait identique à chaque tournant, et ce n'est que bien après le temps qu'il aurait dû prendre qu'on comprend avoir suivi la même clôture en cercle. La vieille croyance en accuse un nisse privé de sa bouillie, faisant tourner en rond un voyageur toute la nuit par rancune plutôt que par réelle cruauté.|帰り道はどの角を曲がっても同じ景色に見え、本来かかるはずの時間をとうに過ぎてから、同じ柵沿いをぐるぐる回っていただけだと分かった。古い言い伝えは、粥をもらえなかったニッセのしわざだとする。残酷さゆえではなく、ただの意趣返しで旅人を一晩じゅう堂々巡りさせるという。",
    ),
  },
  {
    id: "spleiselag",
    n: t("The spleiselag comes up short|El spleiselag no llega a cubrir la cuenta|Le spleiselag ne suffit pas|割り勘が足りない"),
    t: t(
      "Everyone at the table agreed to split the bill evenly, the usual spleiselag arrangement, and only once the plates are cleared does the counting reveal that someone's share was quietly forgotten in the tally — and by the unwritten rule of these things, the one who noticed first is the one who covers the gap.|Todos en la mesa acordaron dividir la cuenta a partes iguales, el habitual spleiselag, y solo al retirar los platos el recuento revela que la parte de alguien se olvidó discretamente en la suma; y, por la regla no escrita de estas cosas, quien lo nota primero es quien cubre la diferencia.|Toute la tablée avait convenu de partager l'addition à parts égales, le classique spleiselag, et ce n'est qu'une fois les assiettes débarrassées que le décompte révèle qu'une part avait été discrètement oubliée dans le total — et selon la règle non écrite en la matière, celui qui le remarque le premier est celui qui comble la différence.|食卓を囲んだ全員が、いつもの「割り勘(スプレイセラーグ)」で均等に払うことにしていたが、皿が下げられてから数え直すと、誰か一人分がひっそりと勘定から漏れていたと分かった。こういうときの不文律で、最初に気づいた者が差額を持つことになる。",
    ),
  },
];

/** 季節。4月始まりの12ヶ月。 */
export const NORWAY_SEASONS = [
  {
    e: "⛷️",
    n: t("Easter in the mountains|Semana Santa en la montaña|Pâques à la montagne|山でのイースター"),
    t: t(
      "Offices and schools empty out for the week around Easter as much of the country heads for mountain cabins to ski while the snow is still deep but the sun has grown strong enough to sit outside in, a combination known here as 'påskesol'. Kvikk Lunsj sales spike so predictably that the wrapper now often carries a crossword or a weather forecast rather than an advertisement.|Oficinas y colegios se vacían durante la semana de Semana Santa mientras buena parte del país se va a cabañas de montaña a esquiar, con la nieve aún profunda pero el sol ya lo bastante fuerte para sentarse fuera, combinación conocida aquí como 'påskesol'. Las ventas de Kvikk Lunsj repuntan con tanta regularidad que el envoltorio suele llevar ahora un crucigrama o un parte meteorológico en vez de publicidad.|Bureaux et écoles se vident pendant la semaine de Pâques tandis qu'une grande partie du pays part skier dans des chalets de montagne, la neige encore profonde mais le soleil déjà assez fort pour s'asseoir dehors, combinaison connue ici sous le nom de 'påskesol'. Les ventes de Kvikk Lunsj grimpent si régulièrement que l'emballage porte désormais souvent des mots croisés ou un bulletin météo plutôt qu'une publicité.|イースターの週には職場も学校も空になり、国の多くが山小屋へスキーに向かう。雪はまだ深いが、外に座っていられるほど日差しが強くなる時期で、この組み合わせは「ポースケソール」と呼ばれる。クヴィック・ルンシの売上はあまりに規則正しく跳ね上がるため、いまでは包装に広告ではなくクロスワードや天気予報が載ることも多い。",
    ),
    f: t(
      "Norway's crime-fiction publishers time their biggest releases for the weeks before Easter specifically to catch this captive mountain-cabin audience, a marketing custom old enough to have its own name, påskekrim.|Las editoriales noruegas de novela negra programan sus mayores lanzamientos para las semanas previas a la Semana Santa, precisamente para captar a este público cautivo de las cabañas de montaña, una costumbre comercial lo bastante antigua como para tener nombre propio, påskekrim.|Les éditeurs norvégiens de romans policiers calent leurs plus grosses sorties dans les semaines précédant Pâques, spécifiquement pour capter ce public captif des chalets de montagne, une coutume commerciale assez ancienne pour porter son propre nom, le påskekrim.|ノルウェーの推理小説の出版社は、この山小屋にこもる読者を狙って、イースター前の数週間に主力作品を投入する。この商売の慣習には「ポースケクリム」という専用の呼び名がつくほど長い歴史がある。",
    ),
  },
  {
    e: "🎉",
    n: t("Constitution Day and the children's parades|El Día de la Constitución y los desfiles infantiles|La fête de la Constitution et les défilés d'enfants|憲法記念日と子どもの行進"),
    t: t(
      "On the seventeenth of May, every town however small puts on its own children's parade, school marching bands and flag-waving pupils filling streets that stay otherwise quiet the rest of the year, while ice-cream vendors and hot-dog stands do more business in this one day than in most ordinary weeks.|El diecisiete de mayo, cada localidad, por pequeña que sea, organiza su propio desfile infantil, con bandas escolares y alumnos agitando banderas que llenan calles por lo demás tranquilas el resto del año, mientras los vendedores de helados y perritos calientes hacen en este único día más negocio que en la mayoría de semanas normales.|Le dix-sept mai, chaque ville, si petite soit-elle, organise son propre défilé d'enfants, fanfares scolaires et élèves agitant des drapeaux emplissant des rues par ailleurs tranquilles le reste de l'année, tandis que marchands de glaces et de hot-dogs font en ce seul jour plus d'affaires qu'en la plupart des semaines ordinaires.|5月17日、どんなに小さな町でも独自の子どもの行進が催され、学校の鼓笛隊と旗を振る児童が、一年の他の日々は静かな通りを埋め尽くす。アイスクリームやホットドッグの露店は、この一日だけでふだんの何週間分もの商いをする。",
    ),
    f: t(
      "The tradition of a children's parade rather than a military one is credited to the writer Bjørnstjerne Bjørnson, who helped organise the first in Christiania in 1870 specifically as a peaceful alternative aimed at the next generation.|La tradición de un desfile infantil en vez de uno militar se atribuye al escritor Bjørnstjerne Bjørnson, que ayudó a organizar el primero en Christiania en 1870, pensado precisamente como alternativa pacífica dirigida a la generación siguiente.|La tradition d'un défilé d'enfants plutôt que militaire est attribuée à l'écrivain Bjørnstjerne Bjørnson, qui aida à organiser le premier à Christiania en 1870, conçu précisément comme une alternative pacifique destinée à la génération suivante.|軍事パレードではなく子どもの行進とする伝統は、作家ビョルンスティエルネ・ビョルンソンによるところが大きいとされる。彼は1870年、クリスチャニアで最初の行進を組織する手助けをした。次の世代に向けた、意図的に平和的な代案としてである。",
    ),
  },
  {
    e: "🔥",
    n: t("Sankthansaften bonfires|Las hogueras de Sankthansaften|Les feux de Sankthansaften|サンクトハンスの夜のかがり火"),
    t: t(
      "Coastal towns spend weeks stacking pallets and driftwood into bonfires that can reach several storeys before they are lit on the night of the twenty-third of June, a night short enough this far north that the fire barely has time to burn down before the sky brightens again.|Los pueblos costeros pasan semanas apilando palés y madera de deriva en hogueras que pueden alcanzar varios pisos antes de encenderse la noche del veintitrés de junio, una noche tan corta a esta latitud que el fuego apenas tiene tiempo de consumirse antes de que el cielo vuelva a clarear.|Les villes côtières passent des semaines à empiler palettes et bois flotté en bûchers pouvant atteindre plusieurs étages avant d'être allumés la nuit du vingt-trois juin, une nuit si courte à cette latitude que le feu a à peine le temps de se consumer avant que le ciel ne s'éclaircisse de nouveau.|沿岸の町々は何週間もかけてパレットや流木を積み上げ、6月23日の夜に何階建てもの高さになるかがり火を焚く。この緯度では夜があまりに短く、火が燃え尽きる前にはもう空が明るくなり始める。",
    ),
    f: t(
      "The bonfires predate Christianity in the region and were originally lit to mark the summer solstice itself, a date the Church later folded into the feast day of St John the Baptist without much changing what people actually did on the night.|Las hogueras son anteriores al cristianismo en la región y originalmente se encendían para marcar el propio solsticio de verano, fecha que la Iglesia incorporó después a la festividad de San Juan Bautista sin cambiar mucho lo que la gente hacía en realidad esa noche.|Les feux sont antérieurs au christianisme dans la région et étaient à l'origine allumés pour marquer le solstice d'été lui-même, une date que l'Église intégra plus tard à la fête de saint Jean-Baptiste sans changer grand-chose à ce que les gens faisaient réellement cette nuit-là.|このかがり火の習わしはこの地域にキリスト教が広まる前からあり、もとは夏至そのものを祝うためのものだった。教会は後にこの日を洗礼者ヨハネの祝日に組み込んだが、その夜に人々が実際にすることはさして変わらなかった。",
    ),
  },
  {
    e: "🏖️",
    n: t("Fellesferie, the shared summer break|Fellesferie, las vacaciones de verano compartidas|Fellesferie, les vacances d'été partagées|フェッレスフェーリエ、みんなの夏休み"),
    t: t(
      "Much of Norwegian industry once shut down for the same three weeks each July by informal agreement between employers and unions, and although the practice has loosened, whole factory towns can still feel emptied out at once as families head for the coast or the mountains together.|Buena parte de la industria noruega llegó a cerrar antes durante las mismas tres semanas cada julio por un acuerdo informal entre empresarios y sindicatos, y aunque la práctica se ha relajado, pueblos industriales enteros aún pueden sentirse vaciados de golpe cuando las familias parten juntas hacia la costa o la montaña.|Une grande partie de l'industrie norvégienne fermait autrefois durant les mêmes trois semaines chaque juillet, par accord informel entre employeurs et syndicats, et bien que la pratique se soit assouplie, des villes industrielles entières peuvent encore sembler vidées d'un coup lorsque les familles partent ensemble vers la côte ou la montagne.|かつてノルウェーの産業の多くは、雇用主と労働組合の非公式な取り決めにより、毎年7月の同じ3週間いっせいに操業を止めた。この慣行は緩んできたものの、家族連れが海や山へそろって向かうと、工業の町全体が一度に空になったように感じられることがいまもある。",
    ),
    f: t(
      "The custom traces to the 1947 introduction of paid holiday for industrial workers, when staggering the break individually was administratively harder than simply closing the whole plant at once.|La costumbre se remonta a la introducción en 1947 de las vacaciones pagadas para los trabajadores industriales, cuando escalonar el descanso individualmente resultaba administrativamente más difícil que cerrar toda la planta a la vez.|La coutume remonte à l'instauration en 1947 des congés payés pour les ouvriers de l'industrie, une époque où échelonner les départs individuellement était administrativement plus compliqué que de fermer toute l'usine d'un coup.|この慣習は1947年、工場労働者に有給休暇が導入された時代にさかのぼる。当時は休みを個人ごとにずらすより、工場全体をいっぺんに閉めるほうが事務的に簡単だった。",
    ),
  },
  {
    e: "🎒",
    n: t("Schools reopen as the light nights fade|Las escuelas reabren mientras se acortan las noches claras|Les écoles rouvrent tandis que les nuits claires s'estompent|明るい夜が薄れ、学校が始まる"),
    t: t(
      "The school year begins in mid-August, just as the near-permanent daylight of high summer starts giving way to proper darkness after sunset again, and the return of a visible night sky is, for children in the far north, as much a seasonal marker as any change in temperature.|El curso escolar empieza a mediados de agosto, justo cuando la luz casi permanente del pleno verano empieza a dar paso de nuevo a una oscuridad real tras la puesta de sol, y el regreso de un cielo nocturno visible es, para los niños del extremo norte, una señal de cambio de estación tanto como cualquier variación de temperatura.|L'année scolaire commence à la mi-août, juste au moment où la lumière quasi permanente du plein été cède de nouveau la place à une véritable obscurité après le coucher du soleil, et le retour d'un ciel nocturne visible constitue, pour les enfants du grand nord, un repère saisonnier autant que tout changement de température.|学年は8月半ばに始まる。ちょうど真夏のほぼ絶え間ない日差しが、日没後にまた本物の暗さへと道を譲り始める頃である。北部の子どもたちにとって、夜空が再び見えるようになることは、気温の変化と同じくらい季節の節目を告げる。",
    ),
    f: t(
      "Far enough north, some schools build the return of visible stars into early-autumn science lessons simply because it is the first chance all year for a nine-year-old to actually see one from the schoolyard.|Suficientemente al norte, algunos colegios incorporan el regreso de las estrellas visibles a las clases de ciencias de principios de otoño, sencillamente porque es la primera ocasión del año en que un niño de nueve años puede verlas de verdad desde el patio.|Suffisamment au nord, certaines écoles intègrent le retour des étoiles visibles aux leçons de sciences du début de l'automne, tout simplement parce que c'est la première occasion de l'année pour un enfant de neuf ans d'en voir réellement une depuis la cour.|北部では、星が再び見えるようになることを初秋の理科の授業に組み込む学校もある。それが一年のうちで9歳の子どもが校庭から実際に星を見られる最初の機会だからというだけの理由である。",
    ),
  },
  {
    e: "🦌",
    n: t("Livestock comes down from the mountain pastures|El ganado baja de los pastos de montaña|Le bétail redescend des pâturages de montagne|家畜が高原の牧草地から下りてくる"),
    t: t(
      "Sheep and cattle that have grazed free on unfenced mountain pasture all summer are gathered back down in a communal round-up known as sanking, a task that can take days across rough terrain and that neighbours still turn out to help each other with. Moose hunting season opens around the same weeks, and rifle shots echoing from the treeline become, briefly, an entirely normal autumn sound.|Las ovejas y vacas que han pastado libres todo el verano en pastos de montaña sin vallar se reúnen de nuevo en un rodeo comunitario llamado sanking, tarea que puede llevar días por terreno escarpado y para la que los vecinos aún se ayudan mutuamente. La temporada de caza del alce se abre por las mismas semanas, y los disparos de rifle que resuenan desde la linde del bosque se vuelven, por un tiempo, un sonido otoñal de lo más normal.|Moutons et bovins qui ont pâturé librement tout l'été sur des alpages sans clôture sont rassemblés lors d'une battue collective appelée sanking, une tâche qui peut prendre des jours sur un terrain accidenté et pour laquelle les voisins se prêtent encore main-forte. La saison de chasse à l'élan ouvre à peu près aux mêmes semaines, et les coups de fusil résonnant depuis la lisière deviennent, un temps, un bruit d'automne des plus ordinaires.|夏じゅう柵の無い高原の牧草地で放し飼いにされていた羊や牛は、「サンキング」と呼ばれる共同の追い込みでまとめて下ろされる。険しい地形での作業は何日もかかることがあり、いまも近所どうし助け合う。ヘラジカ猟の解禁もほぼ同じ時期で、木立の際から響く銃声が、しばらくのあいだごく当たり前の秋の音になる。",
    ),
    f: t(
      "Norway's moose hunt is managed through a strict licence and quota system by municipality, and the meat from a successful hunt is traditionally shared among family and neighbours rather than sold, filling freezers that carry households well into winter.|La caza del alce en Noruega se gestiona mediante un estricto sistema de licencias y cupos por municipio, y la carne de una cacería exitosa se comparte tradicionalmente entre familia y vecinos en vez de venderse, llenando congeladores que sostienen a los hogares bien entrado el invierno.|La chasse à l'élan en Norvège est gérée par un système strict de permis et de quotas par commune, et la viande d'une chasse réussie est traditionnellement partagée entre famille et voisins plutôt que vendue, remplissant des congélateurs qui soutiennent les foyers bien avant dans l'hiver.|ノルウェーのヘラジカ猟は自治体ごとの厳格な許可と頭数割り当てで管理されており、獲れた肉は売られるのではなく伝統的に家族や近所で分け合う。冬の半ばまで家庭を支える冷凍庫を満たすことになる。",
    ),
  },
  {
    e: "🍂",
    n: t("Autumn storms roll in off the Atlantic|Las tormentas de otoño llegan del Atlántico|Les tempêtes d'automne arrivent de l'Atlantique|大西洋から秋の嵐が来る"),
    t: t(
      "The calm of late summer breaks as low-pressure systems begin queuing up over the North Atlantic, each one bringing a named storm with wind strong enough to cancel coastal ferry sailings for a day or more, while inland the birch forests turn a brief, brilliant yellow before the leaves are stripped by the same wind.|La calma de finales de verano se rompe cuando los sistemas de baja presión empiezan a hacer cola sobre el Atlántico Norte, cada uno trayendo una tormenta con nombre y vientos lo bastante fuertes como para cancelar durante un día o más las travesías del ferri costero, mientras tierra adentro los abedules se vuelven de un amarillo breve y brillante antes de que el mismo viento arranque las hojas.|Le calme de la fin de l'été se rompt lorsque les dépressions commencent à faire la queue au-dessus de l'Atlantique Nord, chacune apportant une tempête baptisée avec des vents assez forts pour annuler les traversées du ferry côtier pendant un jour ou plus, tandis qu'à l'intérieur des terres les bouleaux prennent un jaune bref et éclatant avant que ce même vent n'arrache les feuilles.|晩夏の静けさは、北大西洋に低気圧が次々と並び始めると崩れる。それぞれが名前の付いた嵐を運び、強風で沿岸フェリーが一日以上欠航することもある。内陸では白樺の森がつかの間鮮やかな黄色に染まるが、その葉も同じ風にすぐ吹き払われる。",
    ),
    f: t(
      "Norway and the other Nordic countries maintain their own shared list of storm names, separate from the naming lists used further south in Europe, so a storm that batters the Norwegian coast in October may carry a name nobody in London or Paris has ever heard.|Noruega y los demás países nórdicos mantienen su propia lista compartida de nombres de tormentas, distinta de las listas usadas más al sur en Europa, así que una tormenta que azota la costa noruega en octubre puede llevar un nombre que nadie en Londres o París ha oído jamás.|La Norvège et les autres pays nordiques tiennent leur propre liste commune de noms de tempêtes, distincte des listes utilisées plus au sud en Europe, si bien qu'une tempête qui frappe la côte norvégienne en octobre peut porter un nom que personne à Londres ou à Paris n'a jamais entendu.|ノルウェーと他の北欧諸国は、ヨーロッパ南部で使われる命名リストとは別に、独自の共通の嵐の命名リストを持っている。そのため10月にノルウェー沿岸を襲う嵐が、ロンドンやパリでは誰も聞いたことのない名前を背負っていることもある。",
    ),
  },
  {
    e: "🌑",
    n: t("The polar night begins in the far north|La noche polar comienza en el extremo norte|La nuit polaire commence dans le grand nord|北部で極夜が始まる"),
    t: t(
      "North of the Arctic Circle the sun stops rising at all for weeks at a stretch, and towns like Tromsø and Hammerfest settle into a blue, twilight-toned midday that never quite brightens into full daylight, while street lights and shop windows stay lit around the clock to compensate.|Al norte del círculo polar ártico el sol deja de salir del todo durante semanas seguidas, y ciudades como Tromsø y Hammerfest se instalan en un mediodía de tono azulado y crepuscular que nunca llega a aclarar del todo, mientras las farolas y los escaparates permanecen encendidos las veinticuatro horas para compensarlo.|Au nord du cercle polaire arctique, le soleil cesse complètement de se lever pendant des semaines d'affilée, et des villes comme Tromsø et Hammerfest s'installent dans un midi bleuté et crépusculaire qui ne s'éclaircit jamais tout à fait, tandis que réverbères et vitrines restent allumés jour et nuit pour compenser.|北極圏より北では、数週間にわたって太陽がまったく昇らなくなる。トロムソやハンメルフェストのような町は、決して完全には明るくならない青みがかった薄明のような昼を迎え、街灯や店の明かりはそれを補うため昼夜を問わずついたままになる。",
    ),
    f: t(
      "The same darkness that closes in each November also makes the aurora easier to see at almost any hour, and some far-northern schools schedule outdoor breaks specifically around midday, the closest the month comes to daylight at all.|La misma oscuridad que se cierra cada noviembre también facilita ver la aurora casi a cualquier hora, y algunos colegios del extremo norte programan los recreos al aire libre justo al mediodía, lo más parecido a la luz del día que ofrece el mes.|La même obscurité qui s'installe chaque novembre facilite aussi l'observation de l'aurore à presque toute heure, et certaines écoles du grand nord programment les récréations en plein air précisément à midi, ce que le mois offre de plus proche de la lumière du jour.|毎年11月に迫るこの暗さは、オーロラをほぼどの時間帯でも見やすくする一因でもある。北部の一部の学校は屋外休憩をわざわざ正午に合わせて組む。その月がいちばん日中らしくなる時間帯だからである。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas and the watchful julenisse|La Navidad y el vigilante julenisse|Noël et le julenisse qui veille|クリスマスと見張るユーレニッセ"),
    t: t(
      "Advent calendars and candlelit windows fill the long dark afternoons, and on Christmas Eve itself, the main celebration here rather than the day after, families leave a bowl of rice porridge out for the julenisse before sitting down to their own meal, one almond hidden inside as a small prize for whoever finds it.|Los calendarios de Adviento y las ventanas iluminadas con velas llenan las largas tardes oscuras, y en la propia Nochebuena, la celebración principal aquí y no el día siguiente, las familias dejan fuera un cuenco de arroz con leche para el julenisse antes de sentarse a su propia cena, con una almendra escondida dentro como pequeño premio para quien la encuentre.|Calendriers de l'Avent et fenêtres éclairées à la bougie emplissent les longs après-midis sombres, et le soir de Noël même, la célébration principale ici plutôt que le lendemain, les familles laissent un bol de riz au lait pour le julenisse avant de s'attabler elles-mêmes, une amande cachée dedans en petite récompense pour qui la trouve.|アドベントカレンダーとろうそくの灯る窓辺が、暗く長い午後を彩る。ここでは翌日ではなくクリスマスイブそのものが主な祝いの日で、家族は自分たちの食事につく前にユーレニッセのため米粥の椀を外に置く。中には見つけた者への小さな褒美として、アーモンドが一粒隠されている。",
    ),
    f: t(
      "The rice porridge with a hidden almond is called risengrynsgrøt, and the custom of hiding a prize inside it predates its association with the julenisse, having originally been a simple Christmas Eve dessert in its own right.|Las gachas de arroz con la almendra escondida se llaman risengrynsgrøt, y la costumbre de esconder un premio dentro es anterior a su asociación con el julenisse, pues originalmente era, por derecho propio, un simple postre de Nochebuena.|Le riz au lait à l'amande cachée s'appelle risengrynsgrøt, et la coutume d'y cacher une récompense est antérieure à son association avec le julenisse, ayant été à l'origine un simple dessert de la veille de Noël.|アーモンドを隠した米粥はリーセングリュンスグロートと呼ばれる。中に褒美を隠す習わしはユーレニッセとの結びつきより古く、もとはそれ自体がクリスマスイブの素朴なデザートだった。",
    ),
  },
  {
    e: "❄️",
    n: t("A deep cold settles over the inland valleys|Un frío intenso se asienta sobre los valles del interior|Un froid intense s'installe sur les vallées de l'intérieur|内陸の谷に厳しい寒さが居座る"),
    t: t(
      "Cold air pools in the sheltered inland valleys where it cannot easily drain away, and temperatures there can drop far lower than in far more northerly coastal towns kept milder by the sea, a reversal that surprises visitors who assume north always means colder.|El aire frío se estanca en los valles resguardados del interior, donde no puede drenarse con facilidad, y las temperaturas allí pueden caer mucho más bajas que en ciudades costeras mucho más septentrionales, mantenidas más templadas por el mar, una inversión que sorprende a quienes dan por hecho que más al norte siempre significa más frío.|L'air froid stagne dans les vallées abritées de l'intérieur, où il ne peut guère s'évacuer, et les températures y chutent parfois bien plus bas que dans des villes côtières bien plus septentrionales, adoucies par la mer, un renversement qui surprend ceux qui présument que plus au nord signifie toujours plus froid.|冷たい空気は逃げ場のない内陸の谷に溜まり、そこの気温は、海に守られて温暖なはずのずっと北の沿岸の町よりもさらに下がることがある。北へ行くほど必ず寒くなるはずだと思い込んでいる訪問者を驚かせる逆転現象である。",
    ),
    f: t(
      "Røros, deep in an inland valley near the Swedish border, regularly ranks among the coldest reliably inhabited towns in Norway each winter, even though it sits far south of Finnmark's true Arctic reaches.|Røros, en un valle profundo del interior cerca de la frontera sueca, se cuenta cada invierno entre los pueblos habitados de forma fiable más fríos de Noruega, aunque se encuentra muy al sur de los verdaderos confines árticos de Finnmark.|Røros, au fond d'une vallée intérieure près de la frontière suédoise, compte chaque hiver parmi les villes durablement habitées les plus froides de Norvège, bien qu'elle se trouve bien au sud des véritables confins arctiques du Finnmark.|スウェーデン国境に近い内陸の谷にあるレーロスは、フィンマルクの真の北極圏よりずっと南に位置しながら、毎冬ノルウェーで確実に人が住む町としては屈指の寒さを記録する。",
    ),
  },
  {
    e: "🦌",
    n: t("Samisk uke, Sámi Week|Samisk uke, la Semana Sami|Samisk uke, la semaine samie|サーミ週間"),
    t: t(
      "Sámi National Day on the sixth of February anchors a wider week of markets, reindeer-racing and joik performances held in towns across the north, an observance that has grown from a mostly internal commemoration into one increasingly attended by Norwegians with no Sámi background at all.|El Día Nacional Sami, el seis de febrero, sirve de eje a una semana más amplia de mercados, carreras de renos y actuaciones de joik en ciudades de todo el norte, una conmemoración que ha pasado de ser sobre todo interna a contar cada vez con más asistencia de noruegos sin ascendencia sami alguna.|La journée nationale samie, le six février, ancre une semaine plus large de marchés, de courses de rennes et de représentations de joik dans des villes du nord, une commémoration passée d'un événement surtout interne à un rendez-vous de plus en plus suivi par des Norvégiens sans aucune ascendance samie.|2月6日のサーミ国民の日を軸に、北部各地の町で市や、トナカイレース、ヨイクの演奏が催される一週間が広がる。もとは内輪の記念行事に近かったものが、サーミの血を引かないノルウェー人の来場者も年々増える催しへと育ってきた。",
    ),
    f: t(
      "The sixth of February marks the anniversary of the first joint Sámi assembly held across national borders, in Trondheim in 1917, called specifically to organise resistance to policies then pushing Sámi children toward assimilation in Norwegian, Swedish and Russian schools alike.|El seis de febrero conmemora el aniversario de la primera asamblea sami conjunta celebrada a través de fronteras nacionales, en Trondheim en 1917, convocada específicamente para organizar la resistencia a políticas que entonces empujaban a los niños samis hacia la asimilación en escuelas noruegas, suecas y rusas por igual.|Le six février commémore l'anniversaire de la première assemblée samie conjointe tenue par-delà les frontières nationales, à Trondheim en 1917, convoquée spécifiquement pour organiser la résistance à des politiques qui poussaient alors les enfants samis vers l'assimilation dans les écoles norvégiennes, suédoises et russes.|2月6日は、国境をまたいで開かれた初の合同サーミ会議(1917年、トロンハイム)を記念する日である。当時ノルウェー・スウェーデン・ロシアいずれの学校でもサーミの子どもたちを同化へ押しやっていた政策に抵抗するための組織作りを、特に目的として開かれた。",
    ),
  },
  {
    e: "🌤️",
    n: t("The light comes back to the far north|La luz vuelve al extremo norte|La lumière revient dans le grand nord|光が極北に戻る"),
    t: t(
      "The sun clears the horizon again in towns that spent months without seeing it directly, and the first sunrise of the year is marked in some far-northern communities with people simply stepping outside to stand in it, a small deliberate ritual after a winter spent under artificial light.|El sol vuelve a asomar sobre el horizonte en ciudades que llevaban meses sin verlo directamente, y el primer amanecer del año se celebra en algunas comunidades del extremo norte con la gente saliendo sencillamente a quedarse de pie bajo él, un pequeño ritual deliberado tras un invierno bajo luz artificial.|Le soleil franchit de nouveau l'horizon dans des villes qui étaient restées des mois sans le voir directement, et le premier lever de soleil de l'année est marqué dans certaines communautés du grand nord par le simple fait de sortir se tenir dedans, un petit rituel délibéré après un hiver passé sous lumière artificielle.|何か月も直接日を見なかった町々に、再び太陽が地平線の上に現れる。極北の一部の集落では、その年最初の日の出を、人々がただ外に出てその光の中に立つことで祝う。人工の明かりで過ごした冬のあとの、ささやかで意図的な儀式である。",
    ),
    f: t(
      "In Hammerfest, one of the towns that marks the sun's return most visibly, schoolchildren traditionally gather on a low hill above the town for the first sunrise, a custom the town has kept even through the years it had to be entirely rebuilt.|En Hammerfest, una de las ciudades que celebra más visiblemente el regreso del sol, los escolares se reúnen tradicionalmente en una loma sobre la ciudad para el primer amanecer, costumbre que la ciudad ha mantenido incluso en los años en que tuvo que reconstruirse por completo.|À Hammerfest, l'une des villes qui marque le plus visiblement le retour du soleil, les écoliers se rassemblent traditionnellement sur une colline surplombant la ville pour le premier lever de soleil, une coutume que la ville a maintenue même durant les années où elle dut être entièrement reconstruite.|太陽の帰還をとりわけ目に見える形で祝う町の一つハンメルフェストでは、学童たちが伝統的に町を見下ろす小高い丘に集まり、最初の日の出を迎える。町をまるごと再建しなければならなかった時期でさえ、この習わしは守られてきた。",
    ),
  },
];
