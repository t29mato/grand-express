/**
 * ベトナムの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、韓国・
 * 日本・フランスと同じく「地方まるごとの好不況」で差をつける。実際の効果
 * (どの地方の収入が何倍になるか)は `src/infrastructure/content/
 * season-and-doom-rules.ts` 側に置く(取りまとめ側が登録)。
 *
 * 厄災の神は「マー・チョーイ」(鬼火)にした。墓地から立つ蒼白い彷徨う炎という
 * ベトナムの民話上の存在で、韓国のトッケビ・茨城のだいだらぼうと同じく
 * 「残酷な悪霊ではなく、度の過ぎたいたずら者」として描く。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const VIETNAM_META = {
  id: "vietnam",
  name: t("Việt Nam|Việt Nam|Việt Nam|ベトナム"),
  blurb: t(
    "A slender S of a country stitched together by a single railway, broken and mended again|Un país esbelto en forma de ese, unido por un único ferrocarril, roto y remendado una vez más|Un mince pays en forme de S, cousu par une unique voie ferrée, brisée puis rafistolée|一本の鉄道で縫い合わされた、細長いS字の国。切られては、また繕われた",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランスと同じ理由。ここは他国と同じ暫定値100のまま)。
  cur: { pre: "₫", post: "", mul: 100 },
  start: "hanoi",
  cpuNames: ["Rồng Vàng", "Rùa Vàng", "Cò Trắng", "Hổ Mây"],
  // 国旗の紅と黄、水田の緑、川霧の青、米紙の生成り。
  stripe: ["#da251d", "#ffcd00", "#2f6b3a", "#1b4b7a", "#f2ead9"],
};

/** 実際の地勢にならった7区分。 */
export const VIETNAM_REGIONS = {
  rrd: t("Red River Delta|Delta del río Rojo|Delta du fleuve Rouge|紅河デルタ"),
  nmt: t("Northern Mountains|Montañas del Norte|Montagnes du Nord|北部山岳"),
  btb: t("North Central Coast|Costa Centro-Norte|Côte du Centre-Nord|北中部沿岸"),
  ntb: t("South Central Coast|Costa Centro-Sur|Côte du Centre-Sud|南中部沿岸"),
  tn: t("Central Highlands|Tierras Altas Centrales|Hauts Plateaux du Centre|西原高原"),
  dnb: t("Southeast|Sudeste|Sud-Est|南東部"),
  mkd: t("Mekong Delta|Delta del Mekong|Delta du Mékong|メコンデルタ"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 向きの選べない移動(xeomlift)は、進む数を選べる移動(riverferry)より安くしてある。
 */
export const VIETNAM_ITEMS = {
  xeomlift: {
    e: "🛵",
    price: 240,
    kind: "move",
    n: t("A Xe Ôm Ride|Un viaje en xe ôm|Une course en xe ôm|セオムに乗って"),
    d: t(
      "Carried 8–12 squares. The driver picks the route.|Te lleva de 8 a 12 casillas. El conductor elige la ruta.|Emporté de 8 à 12 cases. Le conducteur choisit l'itinéraire.|8〜12マス運ばれる。どの道を行くかは運転手まかせ。",
    ),
    f: t(
      "The name comes from xe (vehicle) and ôm (to hug), for the way a passenger wraps both arms around the driver while weaving through traffic no passenger could ever predict a route through.|El nombre viene de xe (vehículo) y ôm (abrazar), por cómo el pasajero rodea con ambos brazos al conductor mientras serpentea por un tráfico que ningún pasajero podría predecir.|Le nom vient de xe (véhicule) et ôm (étreindre), pour la façon dont le passager enlace le conducteur des deux bras en se faufilant dans une circulation qu'aucun passager ne pourrait jamais prévoir.|「セ(乗り物)」と「オム(抱く)」に由来するこの名は、客が渋滞を縫って進む運転手に両腕でしがみつく様子から来ている。その進む道筋は、乗る側には決して読めない。",
    ),
  },
  setrain: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("SE Express Ticket|Billete del expreso SE|Billet de l'express SE|SE急行切符"),
    d: t("Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。"),
    f: t(
      "Vietnam Railways names its fastest Hà Nội–Hồ Chí Minh City services simply SE, followed by a number, and the quickest of them still needs the better part of a day and a half to cover the line's full length.|Los Ferrocarriles de Vietnam llaman a sus servicios más rápidos entre Hà Nội y Hồ Chí Minh simplemente SE, seguido de un número, y el más veloz de ellos aún necesita buena parte de un día y medio para cubrir toda la línea.|Les Chemins de fer du Vietnam nomment leurs services les plus rapides entre Hà Nội et Hồ Chí Minh-Ville simplement SE, suivi d'un numéro, et le plus rapide d'entre eux a encore besoin de la meilleure partie d'une journée et demie pour parcourir toute la ligne.|ベトナム鉄道はハノイ―ホーチミン間の最速列車を単に「SE」と番号で呼ぶ。その中で最も速い便でさえ、全線を走り切るには一日半近くかかる。",
    ),
  },
  taucho: {
    e: "🚆",
    price: 340,
    kind: "pre",
    n: t("Tàu Chợ (Market Train) Ticket|Billete del tàu chợ (tren del mercado)|Billet du tàu chợ (train du marché)|タウチョー(市場列車)切符"),
    d: t("Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。"),
    f: t(
      "Tàu chợ, literally \"market train,\" stops at every station along its route, letting vendors hop on and off with baskets of produce, and can take twice as long as a named express over the same stretch.|El tàu chợ, literalmente «tren del mercado», para en todas las estaciones de su recorrido, permitiendo que vendedores suban y bajen con cestas de productos, y puede tardar el doble que un expreso con nombre en el mismo tramo.|Le tàu chợ, littéralement « train du marché », s'arrête à chaque gare de son parcours, laissant les vendeurs monter et descendre avec leurs paniers de produits, et peut mettre deux fois plus de temps qu'un express nommé sur le même tronçon.|文字どおり「市場列車」を意味するタウチョーはどの駅にも停まり、農産物を入れた籠を提げた行商人が乗り降りする。名前付きの急行の倍近くの時間がかかることもある。",
    ),
  },
  riverferry: {
    e: "🛶",
    price: 460,
    kind: "pre",
    n: t("A Hired River Ferry|Una barca fluvial de alquiler|Un bac fluvial loué|雇った渡し舟"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "In the Mekong Delta, where roads once gave way entirely to water, a hired boatman rows or motors a passenger precisely to a named landing rather than wherever the current happens to carry a drifting craft.|En el delta del Mekong, donde antes las carreteras cedían por completo el paso al agua, un barquero de alquiler rema o navega a motor a un pasajero exactamente hasta un embarcadero indicado, en vez de a donde la corriente lleve una embarcación a la deriva.|Dans le delta du Mékong, où les routes cédaient jadis entièrement la place à l'eau, un batelier loué rame ou navigue à moteur pour mener un passager précisément à un débarcadère désigné, plutôt que là où le courant emporterait une embarcation à la dérive.|かつて道路がすっかり水路に取って代わられていたメコンデルタでは、雇った船頭が漕ぐか機走するかして、流れに任せた舟のようにどこへ行くか分からないのではなく、指定した船着き場まで正確に客を運ぶ。",
    ),
  },
  amuletward: {
    e: "🧻",
    price: 260,
    kind: "passive",
    n: t("Votive Paper Offering|Ofrenda de papel votivo|Offrande de papier votif|紙銭の供物"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Sheets of gold- and silver-printed joss paper, folded and burned at roadside shrines and doorways, are meant as spending money for wandering spirits with no family left to look after them.|Hojas de papel votivo impreso en oro y plata, plegadas y quemadas en altares junto al camino y en los umbrales, están pensadas como dinero de bolsillo para los espíritus errantes que ya no tienen familia que cuide de ellos.|Des feuilles de papier votif imprimées d'or et d'argent, pliées et brûlées devant des autels de bord de route et sur le pas des portes, sont censées servir d'argent de poche aux esprits errants qui n'ont plus de famille pour veiller sur eux.|金や銀を刷った紙銭は、折りたたんで路傍の祠や戸口で焼かれる。もはや世話をしてくれる身内のいない、彷徨う霊への小遣いとされている。",
    ),
  },
  baguamirror: {
    e: "🪞",
    price: 420,
    kind: "pre",
    n: t("An Octagonal Spirit Mirror|Un espejo octogonal de espíritus|Un miroir octogonal des esprits|八角形の魔除け鏡"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Hung above a doorway with its small round mirror facing outward, the eight-sided gương bát quái is meant to catch and reflect back whatever ill fortune happens to be passing by rather than let it inside.|Colgado sobre un umbral con su pequeño espejo redondo mirando hacia fuera, el gương bát quái de ocho lados está pensado para atrapar y reflejar de vuelta cualquier mala fortuna que pase por allí, en vez de dejarla entrar.|Suspendu au-dessus d'une porte, son petit miroir rond tourné vers l'extérieur, le gương bát quái à huit côtés est censé capter et renvoyer toute malchance de passage plutôt que de la laisser entrer.|戸口の上に、小さな丸い鏡を外向きにして掛けるこの八角形のグオン・バット・クアイは、通りかかった不運を家の中に入れず、捉えて跳ね返すためのものとされる。",
    ),
  },
  examsave: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    // 効果の上限(147)を上回らないよう140にした(npm run checkの指摘で判明)。
    price: 140,
    kind: "passive",
    n: t("An Exam Prep Cheat Sheet|Una chuleta de repaso para el examen|Une antisèche de révision|試験対策のヤマ張り資料"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Vietnam's high-stakes national university entrance exam has spawned an entire industry of cram schools and shared study guides, and a well-worn set of notes passed down from an older student is treated as half the battle.|El exigente examen nacional de acceso a la universidad de Vietnam ha dado lugar a toda una industria de academias y guías de estudio compartidas, y un juego de apuntes bien usados heredado de un estudiante mayor se considera medio camino andado.|L'examen national d'entrée à l'université, à l'enjeu très élevé au Vietnam, a fait naître toute une industrie d'écoles de bachotage et de guides de révision partagés, et un jeu de notes bien usées transmis par un élève plus âgé est considéré comme la moitié du travail.|ベトナムの大学入試は非常に競争が激しく、詰め込み塾や共有される参考書の一大産業を生んでいる。先輩から譲り受けた使い込まれたノート一式があれば、もう半分は勝ったも同然とされる。",
    ),
  },
  lixi: {
    e: "🧧",
    price: 280,
    kind: "pre",
    n: t("A Lucky Red Envelope|Un sobre rojo de la suerte|Une enveloppe rouge porte-bonheur|お年玉の赤い封筒(リーシー)"),
    d: t(
      "Take it and gain cash immediately.|Tómalo y gana dinero de inmediato.|Prends-la et gagne de l'argent immédiatement.|受け取るとすぐに現金を得る。",
    ),
    f: t(
      "Lì xì envelopes, handed out by elders to children and unmarried adults at Tết, are meant to carry good luck for the coming year more than any particular sum, though the amount is still quietly compared afterward.|Los sobres lì xì, que los mayores entregan a niños y adultos solteros en el Tết, están pensados para llevar buena suerte para el año que empieza más que una cantidad concreta, aunque después la cifra se compara igualmente en voz baja.|Les enveloppes lì xì, remises par les aînés aux enfants et aux adultes célibataires au Tết, sont censées porter chance pour l'année à venir plus qu'une somme précise, bien que le montant se compare tout de même discrètement après coup.|テトの際に目上の人が子どもや未婚の大人に配るリーシー袋は、金額そのものより新しい一年の幸運を運ぶものとされるが、それでもあとでこっそり金額を比べ合うことは変わらない。",
    ),
  },
  caffeinerush: {
    e: "☕",
    price: 380,
    kind: "pre",
    n: t("A Quick Roadside Iced Coffee|Un café helado rápido de la calle|Un café glacé rapide sur le trottoir|路上でさっと飲むアイスコーヒー"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A plastic stool, a glass loaded with ice and condensed milk, and the whole thing is finished before the seller has poured the next customer's — Vietnam drinks more coffee this way, standing or crouched roadside, than in any sit-down café.|Un taburete de plástico, un vaso cargado de hielo y leche condensada, y todo se termina antes de que el vendedor haya servido el del siguiente cliente: así se bebe en Vietnam más café, de pie o en cuclillas junto a la calle, que en ningún café con mesas.|Un tabouret en plastique, un verre chargé de glace et de lait concentré, et le tout est fini avant que le vendeur n'ait servi le client suivant — le Vietnam boit ainsi plus de café, debout ou accroupi au bord de la rue, que dans n'importe quel café avec des tables.|プラスチックの腰掛けに、氷と練乳をたっぷり入れたグラス。売り手が次の客の分を注ぎ終える前に飲み干してしまう。ベトナムでは、席のある喫茶店よりも、こうして路上に立ったりしゃがんだりして飲むコーヒーのほうが多い。",
    ),
  },
};

/**
 * 厄災の神。ベトナムの民話に伝わる「マー・チョーイ」(鬼火)にした。
 * 墓地から立つ蒼白い彷徨う炎とされ、韓国のトッケビ・茨城のだいだらぼうと
 * 同じく「人を苦しめる悪霊ではなく、度の過ぎたいたずら者」として描く。
 */
export const VIETNAM_SPIRIT = {
  e: "🔥",
  n: t("The Ma Trơi|El Ma Trơi|Le Ma Trơi|マー・チョーイ(鬼火)"),
  big: t(
    "The Ma Trơi's Midnight Chase|La persecución nocturna del Ma Trơi|La poursuite nocturne du Ma Trơi|マー・チョーイの真夜中の追いかけっこ",
  ),
  ward: "amuletward",
  arrive: t(
    "<b>🔥 A ma trơi has taken an interest in you.</b> Countryfolk say these pale wandering flames rise from old, unclaimed graves on damp nights — mischievous rather than cruel, forever leading travelers a few steps out of their way just to watch them turn in circles. It now flickers beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🔥 Un ma trơi se ha fijado en ti.</b> La gente del campo dice que estas pálidas llamas errantes surgen de tumbas antiguas y sin reclamar en noches húmedas, traviesas más que crueles, siempre desviando a los viajeros unos pasos de su camino solo para verlos dar vueltas. Ahora parpadea junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🔥 Un ma trơi s'est intéressé à toi.</b> Les gens de la campagne disent que ces pâles flammes errantes surgissent de vieilles tombes sans famille par les nuits humides, espiègles plus que cruelles, égarant sans cesse les voyageurs de quelques pas juste pour les voir tourner en rond. Il vacille désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🔥 マー・チョーイに目を付けられた。</b> 村の言い伝えによれば、この蒼白い彷徨う炎は、湿った夜に弔う者のない古い墓から立ち上るという。残酷なのではなく、ただのいたずら好きで、旅人をほんの数歩だけ道から逸らして、堂々巡りする様子を眺めて楽しむだけだという。いま目的地から最も遠い <b>{0}</b> の傍らでゆらめき、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🔥 <b>The ma trơi</b> loses interest and drifts toward <b>{0}</b>, farthest from {1}.|🔥 <b>El ma trơi</b> pierde el interés y flota hacia <b>{0}</b>, el más lejano de {1}.|🔥 <b>Le ma trơi</b> se désintéresse et dérive vers <b>{0}</b>, le plus loin de {1}.|🔥 <b>マー・チョーイ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ漂っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the ma trơi and never once lost it in the dark. It flares up brighter and challenges the whole road to a chase until dawn — <b>the Ma Trơi's Midnight Chase</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al ma trơi sin haberlo perdido nunca en la oscuridad. Este arde más brillante y reta a todo el camino a una persecución hasta el alba: empieza <b>la persecución nocturna del Ma Trơi</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le ma trơi sans jamais l'avoir semé dans le noir. Il s'embrase plus fort et défie toute la route à une poursuite jusqu'à l'aube : <b>la poursuite nocturne du Ma Trơi</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもマー・チョーイと歩いていながら、一度も闇の中でそれをまくことができなかった。炎はいっそう明るく燃え上がり、夜明けまで道行く者すべてに追いかけっこを挑む。<b>マー・チョーイの真夜中の追いかけっこ</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the pale, drifting glow that gave rise to ma trơi tales is thought by scientists to be phosphine and methane gas seeping from decomposing organic matter in old graves, igniting faintly on contact with air — a real chemical flicker mistaken, for centuries, for a wandering soul.|<b>Tras la historia:</b> el resplandor pálido y errante que dio origen a las historias del ma trơi se cree, según los científicos, que es gas fosfina y metano que se filtra de materia orgánica en descomposición en tumbas antiguas, encendiéndose débilmente al contacto con el aire: un parpadeo químico real confundido, durante siglos, con un alma errante.|<b>Derrière l'histoire :</b> la lueur pâle et errante à l'origine des récits de ma trơi serait, selon les scientifiques, du gaz phosphine et du méthane s'échappant de matière organique en décomposition dans de vieilles tombes, s'enflammant faiblement au contact de l'air — un vacillement chimique bien réel, pris pendant des siècles pour une âme errante.|<b>物語の背景:</b> マー・チョーイの言い伝えを生んだ蒼白く漂う光は、古い墓の中で腐敗する有機物から染み出したホスフィンガスやメタンガスが、空気に触れてかすかに発火したものだと考えられている。何世紀ものあいだ彷徨う魂と誤解されてきたのは、実は本物の化学反応の瞬きだった。",
  ),
  pleased: t(
    "It flares up in a shower of pale green sparks to show off, and a coin bounces loose from the light. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se aviva en una lluvia de chispas verde pálido para presumir, y una moneda se le escapa de la luz. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il s'embrase en une pluie d'étincelles vert pâle pour frimer, et une pièce s'échappe de la lumière. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに淡い緑の火花を散らして輝いたはずみに、光から銭が一枚跳ねて落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A stack of gold-printed joss paper is burned where it can see the smoke rise. Ma trơi are said to take burning paper offerings as a kind of payment and drift off satisfied, passing <b>{0}</b> without noticing this turn.|Se quema un fajo de papel votivo dorado donde puede ver subir el humo. Se dice que los ma trơi toman las ofrendas de papel quemado como una especie de pago y se alejan satisfechos, pasando junto a <b>{0}</b> sin percatarse esta vuelta.|On brûle une liasse de papier votif doré là où il peut en voir monter la fumée. On dit que les ma trơi prennent les offrandes de papier brûlé comme une sorte de paiement et s'éloignent satisfaits, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|煙が立ち上るのが見える場所で、金色に刷った紙銭の束を焼く。マー・チョーイはこの燃やされた紙の供物を一種の代金として受け取り、満足して漂い去るとされる。このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。マー・チョーイのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const VIETNAM_DOOM = [
  {
    id: "bao",
    n: t("A typhoon crosses the central coast|Un tifón cruza la costa central|Un typhon traverse la côte centrale|台風が中部沿岸を通る"),
    t: t(
      "The storm was tracked for days out over the South China Sea before it turned toward land, and still it flattens whatever was not tied down along the coast. A season without at least one direct hit on the central provinces is unusual, so the Reunification Express sometimes waits out a closure rather than risk the exposed stretch around Hải Vân.|La tormenta se siguió durante días en el mar de la China Meridional antes de virar hacia tierra, y aun así arrasa con lo que no estaba bien atado a lo largo de la costa. Una temporada sin al menos un impacto directo en las provincias centrales es poco habitual, así que el Expreso de la Reunificación a veces espera a que se levante un cierre en vez de arriesgarse en el tramo expuesto de Hải Vân.|La tempête fut suivie des jours durant au-dessus de la mer de Chine méridionale avant de virer vers la terre, et pourtant elle rase tout ce qui n'était pas arrimé le long de la côte. Une saison sans au moins un impact direct sur les provinces centrales est rare, si bien que l'Express de la Réunification attend parfois la fin d'une fermeture plutôt que de risquer le tronçon exposé du col de Hải Vân.|嵐は南シナ海の上空で何日も進路を追われたのち内陸へ向きを変えたが、それでも沿岸で縛っていなかったものは何もかもなぎ倒す。中部の省への直撃が一度もない年のほうが珍しく、統一急行はハイヴァン峠周辺の吹きさらしの区間で危険を冒すより、運休が明けるのを待つこともある。",
    ),
    months: [5, 6, 7],
  },
  {
    id: "lut",
    n: t("The Mekong Delta's flood season rises|La temporada de crecida del delta del Mekong sube|La saison des crues du delta du Mékong monte|メコンデルタの増水期が押し寄せる"),
    t: t(
      "The seasonal flood the Delta calls 'the floating water' spreads slowly out of the Mekong's banks and across the rice fields, expected enough that farmers plant and harvest around its rhythm rather than fight it, but a rise that comes higher or faster than usual still swamps roads, markets and more than a few motorbikes.|La crecida estacional que el delta llama «el agua flotante» se extiende lentamente desde las orillas del Mekong sobre los arrozales, algo tan esperado que los agricultores siembran y cosechan según su ritmo en vez de combatirla, pero una subida más alta o más rápida de lo habitual sigue anegando carreteras, mercados y más de una moto.|La crue saisonnière que le delta appelle « l'eau flottante » s'étend lentement hors des rives du Mékong sur les rizières, si attendue que les paysans sèment et récoltent selon son rythme plutôt que de la combattre, mais une montée plus haute ou plus rapide que d'habitude inonde tout de même routes, marchés et plus d'une moto.|デルタで「浮き水」と呼ばれる季節ごとの増水は、メコンの岸からゆっくりあふれて田を覆う。あまりに当たり前のことなので、農家はそれと戦うのではなくその周期に合わせて田植えと収穫の時期を決める。それでもいつもより高く速く水が来た年には、道路や市場、そして少なくない数のバイクが水浸しになる。",
    ),
    months: [6, 7],
  },
  {
    id: "nong",
    n: t("A heatwave bakes the central coast|Una ola de calor abrasa la costa central|Une canicule accable la côte centrale|熱波が中部沿岸を焼く"),
    t: t(
      "A dry wind blowing down off the mountains, the same phenomenon locals call 'the fire wind,' can push central coast temperatures past 40°C for days at a stretch, warping rails just enough that trains are sometimes slowed to a crawl over the hottest stretches until evening brings relief.|Un viento seco que sopla desde las montañas, el mismo fenómeno que los lugareños llaman «el viento de fuego», puede empujar las temperaturas de la costa central por encima de los 40 °C durante varios días seguidos, deformando los raíles lo suficiente como para que a veces los trenes reduzcan la marcha a paso de tortuga en los tramos más calurosos hasta que la noche trae alivio.|Un vent sec soufflant depuis les montagnes, le même phénomène que les habitants appellent « le vent de feu », peut pousser les températures de la côte centrale au-delà de 40 °C plusieurs jours d'affilée, déformant les rails juste assez pour que les trains ralentissent parfois à un pas d'escargot sur les tronçons les plus chauds jusqu'à ce que le soir apporte un répit.|山から吹き下ろす乾いた風、地元で「火の風」と呼ばれるこの現象は、中部沿岸の気温を何日も続けて40度以上に押し上げることがある。レールがわずかに歪むほどの暑さで、いちばん暑い区間では夕方に涼しくなるまで列車がのろのろ運転になることもある。",
    ),
    months: [2, 3],
  },
  {
    id: "ketxe",
    n: t("Gridlock swallows the city|El colapso vial se traga la ciudad|Un embouteillage engloutit la ville|大渋滞が街を飲み込む"),
    t: t(
      "A stalled truck at a single intersection is enough to back motorbikes up for kilometres in either direction, a river of idling engines and honking that can take an hour to clear even after the original obstruction is towed away.|Un camión averiado en un solo cruce basta para atascar las motos varios kilómetros en ambas direcciones, un río de motores al ralentí y bocinazos que puede tardar una hora en despejarse incluso después de remolcar el obstáculo original.|Un camion en panne à un seul carrefour suffit à bloquer les motos sur plusieurs kilomètres dans les deux sens, un fleuve de moteurs au ralenti et de klaxons qui peut mettre une heure à se dégager même après le remorquage de l'obstacle initial.|一つの交差点で立ち往生したトラック一台だけで、バイクが両方向に何キロも渋滞することがある。アイドリングとクラクションの川と化し、もとの障害物が撤去されたあとも解消まで一時間かかることもある。",
    ),
  },
  {
    id: "chaunhau",
    n: t("Losing the toasting game, paying the whole table|Perder el juego de brindis, pagar toda la mesa|Perdre au jeu des toasts, payer toute la table|乾杯ゲームに負けて全員分を払う"),
    t: t(
      "The dice cup went around the table faster than the beer could keep up, and losing three rounds running meant covering everyone's glasses rather than just one's own, by a house rule nobody remembers agreeing to. 'Một, hai, ba, dzô!' rings out at bia hơi tables across the country most evenings, and somebody always ends up holding the bill.|El cubilete de dados dio la vuelta a la mesa más rápido de lo que la cerveza podía seguir, y perder tres rondas seguidas significó pagar los vasos de todos y no solo el propio, por una regla de la casa que nadie recuerda haber aceptado. «Một, hai, ba, dzô!» resuena en las mesas de bia hơi de todo el país casi todas las noches, y siempre alguien acaba con la cuenta.|Le gobelet à dés a fait le tour de la table plus vite que la bière ne pouvait suivre, et perdre trois manches d'affilée a signifié payer les verres de tout le monde plutôt que le sien, selon une règle maison que personne ne se rappelle avoir acceptée. « Một, hai, ba, dzô ! » résonne aux tables de bia hơi du pays presque tous les soirs, et quelqu'un finit toujours par régler l'addition.|サイコロの入った椀はビールが追いつかないほど速く卓を回り、三回続けて負けると、自分の分だけでなく全員のグラス分を払う羽目になった。誰も同意した覚えのない店の決まりごとだった。「モッ、ハイ、バー、ヨー!」という掛け声は国じゅうのビアホイの卓でほぼ毎晩響き、いつも誰かが勘定を持たされる。",
    ),
  },
  {
    id: "matroidat",
    n: t("Led astray by a ma trơi|Un ma trơi te hace perder el camino|Un ma trơi t'égare|マー・チョーイに化かされる"),
    t: t(
      "The path home looked exactly the same at every turn in the dark, and only at dawn does it become clear that the same paddy dike was crossed four times over. Old tales blame a ma trơi for this exact trick, drifting a few steps ahead all night for the fun of it and winking out the moment the sun clears the horizon.|El camino a casa parecía idéntico en cada recodo en la oscuridad, y solo al amanecer queda claro que se cruzó el mismo terraplén de arrozal cuatro veces. Los viejos cuentos culpan de esta treta a un ma trơi, que flota unos pasos por delante toda la noche por diversión y se apaga en cuanto el sol asoma en el horizonte.|Le chemin du retour semblait identique à chaque tournant dans l'obscurité, et ce n'est qu'à l'aube qu'on comprend avoir traversé quatre fois la même digue de rizière. Les vieux contes en accusent un ma trơi, qui dérive quelques pas devant toute la nuit pour s'amuser et s'éteint dès que le soleil paraît à l'horizon.|暗闇の中、帰り道はどの角を曲がっても同じ景色に見え、夜明けになってようやく同じ田んぼの畦道を四度も横切っていたと分かった。昔話はこの仕掛けをマー・チョーイのしわざだとする。面白がって一晩じゅう数歩先を漂い、日が地平線に昇った瞬間に消えるという。",
    ),
  },
  {
    id: "chomoctui",
    n: t("A pickpocket works the market|Un carterista trabaja el mercado|Un pickpocket sévit au marché|市場ですりに遭う"),
    t: t(
      "A shoulder bump in the thick of the crowded stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. Between the noise of haggling and the press of shoppers, nobody nearby noticed a thing.|Un roce de hombro en medio del gentío de los puestos pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. Entre el ruido del regateo y el apretujón de compradores, nadie cerca notó nada.|Un coup d'épaule au cœur de la foule des étals est passé avant même d'être remarqué, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Entre le bruit du marchandage et la cohue des acheteurs, personne aux alentours n'a rien vu.|混み合う露店の合間で肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。値切る声と買い物客の人混みの中で、近くの誰も何にも気づかなかった。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、韓国・日本・フランスと
 * 同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の vietnam の項)。
 *
 * 10番目(旧正月テト)を給アイテム、5番目(ヴーラン/さまよう霊の日)を
 * 休神の月として登録することを提案する(REGISTER.md参照)。
 */
export const VIETNAM_SEASONS = [
  {
    e: "🎉",
    n: t("Reunification Day sends the country travelling|El Día de la Reunificación pone al país en marcha|Le jour de la Réunification met le pays en mouvement|統一記念日で国じゅうが移動する"),
    t: t(
      "The thirtieth of April, marking the war's end in 1975, runs straight into the first of May's Labour Day, and the joined holiday is one of the year's busiest for train and bus travel as workers head to the beach or back to a home province for a long weekend.|El treinta de abril, que marca el fin de la guerra en 1975, enlaza directamente con el Día del Trabajo del uno de mayo, y el puente combinado es uno de los más concurridos del año para viajar en tren y autobús, con trabajadores rumbo a la playa o de vuelta a su provincia natal para un fin de semana largo.|Le trente avril, marquant la fin de la guerre en 1975, enchaîne directement sur la fête du Travail du premier mai, et ce pont combiné est l'un des plus chargés de l'année pour les voyages en train et en bus, les travailleurs partant à la plage ou retournant dans leur province natale pour un long week-end.|1975年の終戦を記念する4月30日は、5月1日のメーデーへそのまま続き、この連休は鉄道もバスも一年でも指折りの混雑となる。働く人々は浜辺へ、あるいは長い週末を過ごすため故郷の省へと向かう。",
    ),
    f: t(
      "Reunification Day in the south is sometimes called Liberation Day and in some overseas Vietnamese communities is marked instead as a day of mourning, a split in how the same date is remembered that has never fully closed.|El Día de la Reunificación en el sur a veces se llama Día de la Liberación, y en algunas comunidades vietnamitas en el extranjero se marca en cambio como un día de luto, una división en cómo se recuerda la misma fecha que nunca se ha cerrado del todo.|Le jour de la Réunification, au sud, est parfois appelé jour de la Libération, et dans certaines communautés vietnamiennes d'outre-mer, il est au contraire marqué comme un jour de deuil, une division dans la mémoire de cette même date qui ne s'est jamais tout à fait refermée.|統一記念日は南部では「解放記念日」とも呼ばれる一方、一部の海外ベトナム人社会ではむしろ服喪の日とされる。同じ日付の記憶し方のこの隔たりは、いまも完全には閉じていない。",
    ),
  },
  {
    e: "🌧️",
    n: t("The rainy season returns to the south|La temporada de lluvias regresa al sur|La saison des pluies revient au sud|南部に雨季が戻る"),
    t: t(
      "Afternoon downpours become a near-daily fixture across the Mekong Delta and the southeast, arriving with enough regularity that street vendors plan their day around a reliable hour of shelter rather than around the rain itself.|Los aguaceros vespertinos se convierten en algo casi diario en todo el delta del Mekong y el sudeste, con tal regularidad que los vendedores callejeros planean su día en torno a una hora fiable de resguardo en vez de en torno a la lluvia misma.|Les averses de l'après-midi deviennent une habitude quasi quotidienne dans tout le delta du Mékong et le sud-est, avec une régularité telle que les vendeurs de rue organisent leur journée autour d'une heure fiable d'abri plutôt qu'autour de la pluie elle-même.|メコンデルタと南東部一帯では、午後の激しい雨がほぼ毎日の決まり事になる。あまりに規則正しいので、路上の物売りは雨そのものではなく、決まった時間に雨宿りできることを前提に一日の段取りを組む。",
    ),
    f: t(
      "The south's rainy season and the north's are offset by months, so a traveller moving the length of the country can sometimes chase — or flee — the same rain twice.|La temporada de lluvias del sur y la del norte están desfasadas por meses, así que un viajero que recorra el país puede a veces perseguir —o huir de— la misma lluvia dos veces.|La saison des pluies du sud et celle du nord sont décalées de plusieurs mois, si bien qu'un voyageur parcourant le pays peut parfois pourchasser — ou fuir — la même pluie à deux reprises.|南部の雨季と北部の雨季は何か月もずれているため、国を縦断する旅人は、同じ雨を二度追いかける、あるいは二度逃げることさえある。",
    ),
  },
  {
    e: "☀️",
    n: t("School lets out and the heat sets in|Terminan las clases y llega el calor|L'école se termine et la chaleur s'installe|学校が休みになり、暑さが本格化する"),
    t: t(
      "The academic year wraps up in late May, freeing children for a long summer break just as the dry central coast turns driest, and beach towns from Đà Nẵng to Nha Trang fill with domestic tourists escaping the inland heat.|El año escolar termina a finales de mayo, liberando a los niños para unas largas vacaciones de verano justo cuando la seca costa central se vuelve más seca aún, y los pueblos de playa desde Đà Nẵng hasta Nha Trang se llenan de turistas nacionales que escapan del calor del interior.|L'année scolaire se termine fin mai, libérant les enfants pour de longues vacances d'été juste au moment où la côte centrale, déjà sèche, devient plus sèche encore, et les villes balnéaires de Đà Nẵng à Nha Trang se remplissent de touristes locaux fuyant la chaleur de l'intérieur.|学年度は5月末に終わり、子どもたちは長い夏休みに入る。ちょうど乾いた中部沿岸がいちばん乾く時期でもあり、ダナンからニャチャンまでの海辺の町は、内陸の暑さを逃れてきた国内観光客で埋まる。",
    ),
    f: t(
      "Unlike Korea and Japan, Vietnam's school year runs roughly September to May, so this month's break falls at the true height of summer rather than in spring.|A diferencia de Corea y Japón, el año escolar de Vietnam va aproximadamente de septiembre a mayo, así que las vacaciones de este mes caen en pleno verano y no en primavera.|Contrairement à la Corée et au Japon, l'année scolaire du Vietnam va environ de septembre à mai, si bien que les vacances de ce mois tombent en plein été plutôt qu'au printemps.|韓国や日本と違い、ベトナムの学年度はおよそ9月から5月までなので、この月の休みは春ではなく真夏の盛りに当たる。",
    ),
  },
  {
    e: "🏔️",
    n: t("Highlanders escape the lowland heat|La gente huye del calor de las tierras bajas hacia las alturas|On fuit la chaleur des basses terres pour l'altitude|人々は低地の暑さを逃れて高地へ向かう"),
    t: t(
      "While the coast bakes, Đà Lạt's daytime temperatures barely reach the mid-20s, and honeymooners and families alike book out guesthouses months ahead for a taste of a cooler, pine-scented Vietnam most of the country never gets.|Mientras la costa se abrasa, las temperaturas diurnas de Đà Lạt apenas llegan a los mediados veinte, y tanto recién casados como familias reservan pensiones con meses de antelación para probar un Vietnam más fresco, con aroma a pino, que la mayor parte del país nunca conoce.|Tandis que la côte cuit au soleil, les températures diurnes à Đà Lạt atteignent à peine le milieu des vingt degrés, et jeunes mariés comme familles réservent des pensions des mois à l'avance pour goûter un Vietnam plus frais, parfumé aux pins, que le reste du pays ne connaît jamais.|沿岸が灼けつくように暑いあいだ、ダラットの日中の気温はせいぜい25度前後にしかならない。新婚夫婦も家族連れも、国の大半が知らない松の香り漂う涼しいベトナムを味わおうと、何か月も前から宿を予約する。",
    ),
    f: t(
      "Đà Lạt's cool climate is largely down to its elevation of roughly 1,500 metres, which the French recognised as early as 1893 when they scouted it as a hill station.|El clima fresco de Đà Lạt se debe en gran parte a su altitud de unos 1.500 metros, que los franceses reconocieron ya en 1893 al explorarlo como estación de montaña.|Le climat frais de Đà Lạt tient en grande partie à son altitude d'environ 1 500 mètres, que les Français reconnurent dès 1893 en l'explorant comme station d'altitude.|ダラットの涼しい気候は、標高およそ1,500メートルによるところが大きい。フランス人は早くも1893年、保養地の候補地として探索した際にこれを見出していた。",
    ),
  },
  {
    e: "🕯️",
    n: t("Wandering Souls' Day, when the spirit rests|El Día de las Almas Errantes, cuando el espíritu descansa|Le jour des âmes errantes, où l'esprit se repose|さまよう霊の日、鬼火が休む月"),
    t: t(
      "On the fifteenth of the seventh lunar month, households burn joss paper and lay out food both for their own ancestors and for spirits with no one left to remember them, and even a mischievous ma trơi is said to take the offerings and drift off satisfied for the night.|El día quince del séptimo mes lunar, los hogares queman papel votivo y disponen comida tanto para sus propios antepasados como para los espíritus sin nadie que los recuerde, y se dice que hasta un travieso ma trơi acepta las ofrendas y se aleja satisfecho esa noche.|Le quinzième jour du septième mois lunaire, les foyers brûlent du papier votif et disposent de la nourriture à la fois pour leurs propres ancêtres et pour les esprits que personne ne se rappelle plus, et même un ma trơi facétieux est dit accepter les offrandes et s'éloigner satisfait pour la nuit.|旧暦7月15日、各家庭は紙銭を焚き、自分たちの祖先だけでなく、誰にも弔われない霊のためにも食べ物を並べる。いたずら好きなマー・チョーイでさえ、この夜は供物を受け取って満足げに漂い去るとされる。",
    ),
    f: t(
      "The day overlaps with Vu Lan, a Buddhist festival of filial piety in which children who still have a living mother pin a red rose to their shirt, and those who do not, a white one.|El día coincide con Vu Lan, una fiesta budista de piedad filial en la que los hijos con la madre viva llevan prendida una rosa roja en la camisa, y quienes no la tienen, una blanca.|Ce jour coïncide avec Vu Lan, une fête bouddhiste de piété filiale où les enfants dont la mère est encore en vie épinglent une rose rouge à leur chemise, et ceux dont ce n'est pas le cas, une blanche.|この日はブラン(父母恩重節)という仏教の孝行の行事とも重なり、母がまだ健在の子は赤いバラを、そうでない子は白いバラを胸につける。",
    ),
  },
  {
    e: "🏮",
    n: t("Mid-Autumn lanterns and National Day fireworks|Faroles del Medio Otoño y fuegos artificiales del Día Nacional|Lanternes de la mi-automne et feux d'artifice de la Fête nationale|中秋の提灯と国慶節の花火"),
    t: t(
      "Children parade star-shaped lanterns for Tết Trung Thu just as National Day on the second brings official fireworks over city lakes, and mooncake gift boxes exchanged between colleagues and neighbours in the weeks before both crowd shop counters everywhere.|Los niños desfilan con faroles en forma de estrella para el Tết Trung Thu justo cuando el Día Nacional, el día dos, trae fuegos artificiales oficiales sobre los lagos de las ciudades, y las cajas de regalo de pasteles de luna intercambiadas entre compañeros y vecinos en las semanas previas a ambos abarrotan los mostradores de las tiendas.|Les enfants défilent avec des lanternes en forme d'étoile pour le Tết Trung Thu, juste au moment où la Fête nationale, le deux, apporte des feux d'artifice officiels au-dessus des lacs des villes, et les boîtes-cadeaux de gâteaux de lune échangées entre collègues et voisins dans les semaines précédant les deux occasions envahissent les comptoirs des magasins partout.|子どもたちがテト・チュントゥのために星型の提灯を手に練り歩くのと同じ頃、2日の国慶節では都市の湖の上に公式の花火が上がる。両方に先立つ数週間、同僚や近所どうしで贈り合う月餅の贈答箱がどの店の棚もふさぐ。",
    ),
    f: t(
      "The gift-box economy around mooncakes has grown so large that some companies now order custom tins printed with their own logo months in advance, treating the festival as much a client-relations exercise as a family one.|La economía de las cajas-regalo en torno a los pasteles de luna ha crecido tanto que algunas empresas ya encargan latas personalizadas con su propio logotipo con meses de antelación, tratando la fiesta tanto como un ejercicio de relaciones con clientes como algo familiar.|L'économie des coffrets-cadeaux autour des gâteaux de lune a pris une telle ampleur que certaines entreprises commandent désormais des boîtes personnalisées à leur propre logo des mois à l'avance, traitant la fête autant comme un exercice de relations clients qu'un moment familial.|月餅の贈答箱をめぐる経済はあまりに大きくなり、いまでは何か月も前から自社ロゴ入りの特注缶を発注する企業まである。この祭りは家族の行事であると同時に、取引先との関係作りの機会にもなっている。",
    ),
  },
  {
    e: "🌀",
    n: t("Typhoon and flood season peaks|La temporada de tifones e inundaciones alcanza su punto álgido|La saison des typhons et des crues atteint son pic|台風と増水がいちばん激しくなる"),
    t: t(
      "The central coast and the Mekong Delta face their heaviest storms and highest floodwaters of the year at roughly the same time, and it is not unusual for a single week's news to carry both a typhoon warning up north of Huế and flood photos from An Giang.|La costa central y el delta del Mekong se enfrentan a sus tormentas más fuertes y sus aguas más altas del año casi al mismo tiempo, y no es raro que las noticias de una sola semana traigan a la vez un aviso de tifón al norte de Huế y fotos de inundaciones de An Giang.|La côte centrale et le delta du Mékong affrontent leurs tempêtes les plus fortes et leurs eaux les plus hautes de l'année presque au même moment, et il n'est pas rare qu'une même semaine d'actualités porte à la fois une alerte au typhon au nord de Huế et des photos d'inondation en An Giang.|中部沿岸とメコンデルタは、ほぼ同じ時期に一年でいちばん激しい嵐といちばんの増水を迎える。フエの北で台風警報が出るのと同じ週に、アンザンの洪水の写真がニュースに流れるのも珍しくない。",
    ),
    f: t(
      "Vietnam's disaster-relief agencies coordinate closely with the Reunification Express operator during this month, since the trunk line is the only stretch of railway crossing the storm-prone central provinces at all.|Las agencias de ayuda ante desastres de Vietnam coordinan estrechamente con el operador del Expreso de la Reunificación durante este mes, ya que la línea troncal es el único tramo de ferrocarril que atraviesa las provincias centrales propensas a tormentas.|Les agences vietnamiennes de secours en cas de catastrophe coordonnent étroitement avec l'exploitant de l'Express de la Réunification durant ce mois, la ligne principale étant le seul tronçon ferroviaire traversant les provinces centrales sujettes aux tempêtes.|この月、ベトナムの災害対応機関は統一急行の運行会社と緊密に連携する。嵐の多い中部の省を通る鉄道はこの幹線だけだからである。",
    ),
  },
  {
    e: "🌾",
    n: t("The delta harvests as the floodwater recedes|El delta cosecha mientras baja el agua de la inundación|Le delta récolte tandis que la crue se retire|水が引き、デルタが収穫を迎える"),
    t: t(
      "As the Mekong's floating-water season drains back toward the river, farmers move fast to harvest the fish, snails and floating rice that the flood itself helped raise, a catch many households count on as much as the rice crop that follows.|Mientras la temporada del agua flotante del Mekong se retira hacia el río, los agricultores se apresuran a recoger los peces, caracoles y el arroz flotante que la propia crecida ayudó a criar, una captura con la que muchos hogares cuentan tanto como con la cosecha de arroz que sigue.|Alors que la saison de l'eau flottante du Mékong se retire vers le fleuve, les paysans se pressent de récolter poissons, escargots et riz flottant que la crue elle-même a contribué à faire grandir, une prise sur laquelle beaucoup de foyers comptent autant que sur la récolte de riz qui suit.|メコンの「浮き水」の季節が川へと引いていくにつれ、農家は増水そのものが育てた魚や巻貝、浮稲を大急ぎで収穫する。この漁獲は、続く米の収穫と同じくらい多くの家庭が頼りにしている。",
    ),
    f: t(
      "Floating rice, an old variety that can grow its stem several metres in a single season to keep pace with rising water, has largely been replaced by higher-yield varieties, though a few delta farmers still grow it for the flood-season catch it shelters.|El arroz flotante, una variedad antigua que puede alargar su tallo varios metros en una sola temporada para seguir el ritmo del agua que sube, ha sido en gran parte reemplazado por variedades de mayor rendimiento, aunque algunos agricultores del delta todavía lo cultivan por la pesca de temporada de crecida que alberga.|Le riz flottant, une variété ancienne pouvant allonger sa tige de plusieurs mètres en une seule saison pour suivre la montée des eaux, a été largement remplacé par des variétés à plus haut rendement, bien que quelques paysans du delta le cultivent encore pour la pêche de saison des crues qu'il abrite.|一つの季節で茎を数メートルも伸ばして増水に追いつく浮稲という古い品種は、いまでは収量の高い品種に取って代わられているが、それでも一部のデルタの農家は、増水期の漁を宿すという理由でいまも育てている。",
    ),
  },
  {
    e: "❄️",
    n: t("The north turns cold and shopfronts turn Christmas|El norte se enfría y los escaparates se visten de Navidad|Le nord se refroidit et les vitrines se parent de Noël|北部が冷え込み、店先はクリスマス色に染まる"),
    t: t(
      "Hà Nội's temperatures can dip into single digits on the coldest nights, prompting a rush on winter coats sold cheaply along Old Quarter pavements, while department stores nationwide compete over Christmas window displays for a holiday most households mark more as a date night than a religious one.|Las temperaturas de Hà Nội pueden bajar a un solo dígito en las noches más frías, provocando una carrera por abrigos de invierno vendidos baratos en las aceras del Casco Antiguo, mientras los grandes almacenes de todo el país compiten con sus escaparates navideños por una fiesta que la mayoría de los hogares vive más como una cita romántica que religiosa.|Les températures de Hà Nội peuvent descendre à un chiffre les nuits les plus froides, provoquant une ruée sur les manteaux d'hiver vendus à bas prix sur les trottoirs du Vieux Quartier, tandis que les grands magasins du pays rivalisent de vitrines de Noël pour une fête que la plupart des foyers vivent davantage comme une soirée en amoureux que religieuse.|ハノイの気温はいちばん寒い夜には一桁まで下がることもあり、旧市街の歩道で安く売られる防寒着に人が殺到する。全国のデパートはクリスマスの飾り付けを競うが、多くの家庭にとってこの日は宗教行事というより恋人どうしのデートの口実に近い。",
    ),
    f: t(
      "Because Vietnam spans more than 15 degrees of latitude, this month can mean a genuinely cold snap in Hà Nội and a comfortable 25°C afternoon in Hồ Chí Minh City on the very same day.|Como Vietnam abarca más de 15 grados de latitud, este mes puede significar una ola de frío auténtica en Hà Nội y una tarde agradable de 25 °C en Hồ Chí Minh el mismo día.|Le Vietnam s'étendant sur plus de 15 degrés de latitude, ce mois peut signifier un vrai coup de froid à Hà Nội et une agréable après-midi à 25 °C à Hồ Chí Minh-Ville le même jour.|ベトナムは緯度にして15度以上にまたがるため、この月はハノイで本物の寒波が来ている同じ日に、ホーチミン市では快適な25度の午後ということも起こりうる。",
    ),
  },
  {
    e: "☕",
    n: t("The Central Highlands bring in the coffee harvest|Las Tierras Altas Centrales recogen la cosecha de café|Les Hauts Plateaux du Centre rentrent la récolte de café|西原高原がコーヒーの収穫期を迎える"),
    t: t(
      "Robusta cherries ripen to a deep red across Đắk Lắk's plantations, and whole families turn out to hand-pick or lay tarps under the trees for a mechanical shake, racing to bring in the crop before the dry season's dust settles too thick on the drying yards.|Las cerezas de robusta maduran a un rojo intenso por las plantaciones de Đắk Lắk, y familias enteras salen a recoger a mano o a extender lonas bajo los árboles para una sacudida mecánica, corriendo para meter la cosecha antes de que el polvo de la temporada seca se asiente demasiado espeso en los patios de secado.|Les cerises de robusta mûrissent jusqu'au rouge profond dans les plantations du Đắk Lắk, et des familles entières sortent pour cueillir à la main ou étendre des bâches sous les arbres pour une secousse mécanique, courant pour rentrer la récolte avant que la poussière de la saison sèche ne s'installe trop épaisse sur les aires de séchage.|ロブスタの実はダクラク省の農園一帯で深紅に熟し、家族総出で手摘みするか、機械で揺すり落とすために木の下にシートを広げる。乾季の埃が天日干し場に厚く積もりすぎる前にと、収穫を急ぐ。",
    ),
    f: t(
      "Vietnam's harvest calendar runs opposite to Brazil's, the world's largest coffee producer, which means the country's beans often reach international markets during months when Brazilian supply is thinnest.|El calendario de cosecha de Vietnam va al contrario que el de Brasil, el mayor productor mundial de café, lo que significa que los granos del país a menudo llegan a los mercados internacionales en los meses en que el suministro brasileño es más escaso.|Le calendrier de récolte du Vietnam est à l'opposé de celui du Brésil, premier producteur mondial de café, ce qui signifie que les grains du pays atteignent souvent les marchés internationaux durant les mois où l'offre brésilienne est la plus maigre.|ベトナムの収穫期は、世界最大のコーヒー生産国であるブラジルとはちょうど逆になる。そのためベトナム産の豆は、ブラジルの供給が最も細る時期に国際市場へ届くことが多い。",
    ),
  },
  {
    e: "🧧",
    n: t("Tết, the lunar new year, empties the cities|Tết, el año nuevo lunar, vacía las ciudades|Tết, le nouvel an lunaire, vide les villes|旧正月テトが都市を空にする"),
    t: t(
      "Factories close, migrant workers pack the Reunification Express and every bus line home days ahead of the new moon, and by the eve itself the usually gridlocked cities fall eerily quiet, save for the family gatherings and gift-giving of red lì xì envelopes behind closed gates.|Las fábricas cierran, los trabajadores migrantes abarrotan el Expreso de la Reunificación y todas las líneas de autobús a casa días antes de la luna nueva, y para la propia víspera las ciudades, normalmente colapsadas, quedan extrañamente silenciosas, salvo por las reuniones familiares y el reparto de sobres rojos lì xì tras las puertas cerradas.|Les usines ferment, les travailleurs migrants envahissent l'Express de la Réunification et toutes les lignes de bus vers chez eux des jours avant la nouvelle lune, et dès la veille elle-même, les villes d'ordinaire embouteillées deviennent étrangement silencieuses, hormis les réunions de famille et la distribution d'enveloppes rouges lì xì derrière les portails fermés.|工場は閉まり、出稼ぎ労働者たちは新月の何日も前から統一急行と帰省の全バス路線を埋め尽くす。大晦日ともなれば、ふだんは渋滞だらけの街が不気味なほど静まり返り、聞こえるのは閉じた門の奥での家族団らんと赤いリーシー袋を配る声だけになる。",
    ),
    f: t(
      "The scale of the return-home migration before Tết is often compared to the world's largest annual human migration, on a par with China's Spring Festival travel rush happening at nearly the same time.|La magnitud de la migración de regreso a casa antes del Tết se compara a menudo con la mayor migración humana anual del mundo, a la par de la avalancha de viajes del Festival de Primavera chino, que ocurre casi al mismo tiempo.|L'ampleur de la migration de retour au pays avant le Tết est souvent comparée à la plus grande migration humaine annuelle au monde, à l'égal de la ruée des voyages du Nouvel An chinois, qui a lieu presque en même temps.|テト前の帰省による人の移動の規模は、ほぼ同じ時期に起きる中国の春節の大移動と並んで、世界最大級の年間人口移動にたとえられることが多い。",
    ),
  },
  {
    e: "🌼",
    n: t("Coffee flowers bloom white across the highlands|Las flores del café florecen blancas por las tierras altas|Les fleurs du caféier fleurissent blanches sur les hauts plateaux|コーヒーの花が高原一面を白く染める"),
    t: t(
      "A few days after the season's first rain breaks the dry spell, entire hillsides of coffee bushes around Buôn Ma Thuột burst into a haze of small white blossoms with a scent locals compare to jasmine, gone again within a week once the petals drop and tiny green cherries begin to form.|Unos días después de que la primera lluvia de la temporada rompa la sequía, laderas enteras de arbustos de café alrededor de Buôn Ma Thuột estallan en una neblina de pequeñas flores blancas con un aroma que los lugareños comparan al jazmín, que desaparece de nuevo en una semana en cuanto caen los pétalos y empiezan a formarse pequeñas cerezas verdes.|Quelques jours après que la première pluie de la saison rompt la sécheresse, des coteaux entiers de caféiers autour de Buôn Ma Thuột éclatent en une brume de petites fleurs blanches à l'odeur que les habitants comparent au jasmin, disparue à nouveau en une semaine dès que les pétales tombent et que de minuscules cerises vertes commencent à se former.|季節初めの雨が乾季を破ってから数日すると、ブオンマトゥオット周辺の丘という丘のコーヒーの木が、地元でジャスミンにたとえられる香りを放つ小さな白い花で一面に霞む。花びらが散って小さな緑の実がつき始めると、その光景は一週間ともたずに消えてしまう。",
    ),
    f: t(
      "Farmers watch the timing of this first rain closely, since blossoms that open too early can be scorched by a lingering dry spell, and a poor bloom season can mean a thinner harvest ten months later.|Los agricultores vigilan de cerca el momento de esta primera lluvia, ya que las flores que se abren demasiado pronto pueden abrasarse por una sequía persistente, y una mala temporada de floración puede significar una cosecha más pobre diez meses después.|Les agriculteurs surveillent de près le moment de cette première pluie, car des fleurs qui s'ouvrent trop tôt peuvent être brûlées par une sécheresse persistante, et une mauvaise saison de floraison peut signifier une récolte plus maigre dix mois plus tard.|農家はこの最初の雨の時期を注意深く見守る。早く咲きすぎた花は長引く乾季で焼けてしまうことがあり、花付きの悪い年は十か月後の収穫が細ることにもつながるからである。",
    ),
  },
];
