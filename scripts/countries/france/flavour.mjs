/**
 * フランスの国情報・地方区分・アイテム・厄災の神・災難・季節イベント。
 *
 * 季節は他国と同じく4月始まりの12ヶ月。フランスの1年は「復活祭 → 5月の連休 →
 * ヴァカンス → ラントレ(新学期) → 収穫と冬の市」と、休みと仕事のあいだを
 * はっきり行き来するので、その順に並べている。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const FRANCE_META = {
  id: "france",
  name: t("France|Francia|France|フランス"),
  blurb: t(
    "Vineyards, cathedrals and the fastest trains in Europe|Viñedos, catedrales y los trenes más rápidos de Europa|Vignobles, cathédrales et les trains les plus rapides d'Europe|ぶどう畑と大聖堂とヨーロッパ最速の列車",
  ),
  // ユーロ。他国と同じく、内部の金額は100倍で持って表示時に割る。
  cur: { pre: "€", post: "", mul: 100 },
  start: "paris",
  cpuNames: ["カミーユ Camille", "リュック Luc", "アメリ Amélie", "ティボー Thibault"],
  // 三色旗に、ラヴェンダーとひまわりを足した帯。
  stripe: ["#2f4fa2", "#f5f0e4", "#cf3b34", "#7b4b8a", "#e8b84b"],
};

export const FRANCE_REGIONS = {
  idf: t("Île-de-France|Isla de Francia|Île-de-France|イル・ド・フランス"),
  nor: t("The North & Normandy|El norte y Normandía|Le Nord et la Normandie|北部・ノルマンディ"),
  oue: t("The West & Brittany|El oeste y Bretaña|L'Ouest et la Bretagne|西部・ブルターニュ"),
  est: t("The East & the Alps|El este y los Alpes|L'Est et les Alpes|東部・アルプス"),
  sud: t("The South-West & the Pyrenees|El suroeste y los Pirineos|Le Sud-Ouest et les Pyrénées|南西部・ピレネー"),
  med: t("The Mediterranean & Corsica|El Mediterráneo y Córcega|La Méditerranée et la Corse|地中海・コルシカ"),
};

/**
 * アイテム。効果の種類は他国と同じ9種で、名前だけがその国のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const FRANCE_ITEMS = {
  montgolfiere: {
    e: "🎈",
    price: 240,
    kind: "move",
    n: t("Montgolfier Balloon|Globo de los Montgolfier|Montgolfière|モンゴルフィエの気球"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに降りるかは風まかせ。",
    ),
    f: t(
      "The first passengers of a hot-air balloon, in September 1783, were a sheep, a duck and a rooster; two men rose over Paris two months later.|Los primeros pasajeros de un globo, en septiembre de 1783, fueron una oveja, un pato y un gallo; dos hombres se elevaron sobre París dos meses después.|Les premiers passagers d'une montgolfière, en septembre 1783, furent un mouton, un canard et un coq ; deux hommes s'élevèrent au-dessus de Paris deux mois plus tard.|1783年9月、熱気球に最初に乗ったのは羊と家鴨と雄鶏でした。人を乗せてパリの空に上がったのは、その二か月後です。",
    ),
  },
  chaix: {
    e: "📖",
    price: 400,
    kind: "pre",
    n: t("The Chaix Timetable|El horario Chaix|L'indicateur Chaix|シェックスの時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "From 1846 Napoléon Chaix printed every railway departure in France in a single booklet, and for a century travellers simply called the timetable the Chaix.|Desde 1846 Napoléon Chaix imprimió en un solo cuadernillo todas las salidas de tren de Francia, y durante un siglo la gente llamó al horario simplemente el Chaix.|Dès 1846, Napoléon Chaix imprima dans un seul livret tous les départs de trains de France ; pendant un siècle, on appela l'horaire tout simplement le Chaix.|1846年からナポレオン・シェックスはフランス中の列車の発車時刻を一冊にまとめて刷り、以後100年ほど、時刻表そのものが「シェックス」と呼ばれました。",
    ),
  },
  corail: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Corail Express|Expreso Corail|Le Corail|コライユ急行"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The name of the 1975 coaches squeezes together confort and rail; they were the first French carriages with no compartments and windows that would not open.|El nombre de los coches de 1975 junta confort y rail: fueron los primeros vagones franceses sin compartimentos y con ventanillas selladas.|Le nom des voitures de 1975 contracte confort et rail : ce furent les premières voitures françaises sans compartiments et à fenêtres scellées.|1975年に登場した客車の名は confort(快適)と rail(鉄路)を縮めたもので、コンパートメントを廃し、窓の開かない初のフランス客車でした。",
    ),
  },
  tgv: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("TGV|TGV|TGV|TGV(高速列車)"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "In April 2007 a shortened TGV reached 574.8 km/h on the new line towards Strasbourg, still the record for a train on ordinary rails.|En abril de 2007 un TGV acortado alcanzó 574,8 km/h en la nueva línea hacia Estrasburgo, aún el récord de un tren sobre raíles convencionales.|En avril 2007, une rame TGV raccourcie atteignit 574,8 km/h sur la ligne nouvelle vers Strasbourg : c'est toujours le record sur rails classiques.|2007年4月、短く組み直したTGVがストラスブール方面の新線で574.8km/hを記録し、いまも通常の鉄軌道での世界最速です。",
    ),
  },
  buis: {
    e: "🌿",
    price: 320,
    kind: "passive",
    n: t("Blessed Boxwood|Boj bendito|Brin de buis bénit|黄楊の小枝のお守り"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "French churches hand out boxwood instead of palm on Palm Sunday, since palms will not grow there; the sprig stays behind the crucifix for a year and is burned when the next one comes.|En Francia el Domingo de Ramos se reparte boj en vez de palma, porque allí no crece la palmera; la ramita se guarda un año tras el crucifijo y se quema al llegar la siguiente.|En France, on distribue du buis plutôt que des palmes le dimanche des Rameaux, faute de palmiers ; le brin reste un an derrière le crucifix et on le brûle quand arrive le suivant.|フランスでは棕櫚が育たないため、枝の主日には棕櫚ではなく黄楊が配られます。その小枝は十字架の裏に一年さし、翌年の枝が来ると燃やします。",
    ),
  },
  feustjean: {
    e: "🔥",
    price: 440,
    kind: "pre",
    n: t("Saint John's Brand|Tizón de San Juan|Tison de la Saint-Jean|聖ヨハネの火の燃えさし"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "On the shortest night of the year bonfires are lit in village squares; people jump the embers and carry home a charred stick said to keep lightning off the roof until the next fire.|En la noche más corta del año se encienden hogueras en las plazas; se saltan las brasas y se lleva a casa un tizón que, dicen, aparta el rayo del tejado hasta la hoguera siguiente.|Lors de la nuit la plus courte de l'année, on allume des feux sur les places ; on saute les braises et l'on rapporte un tison qui, dit-on, écarte la foudre du toit jusqu'au feu suivant.|一年で最も短い夜、村の広場で焚き火が焚かれます。人々は熾火を飛び越え、燃えさしを一本持ち帰る。それが次の火の夜まで、屋根に雷を落とさせないと言われます。",
    ),
  },
  antiseche: {
    e: "📝",
    // クイズを外したときの損失(最大147)を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("Crib Note|Chuleta|Antisèche|カンニングペーパー"),
    d: t(
      "Saves you once from a wrong quiz answer.|Te salva una vez de una respuesta equivocada.|Te sauve une fois d'une mauvaise réponse.|クイズを1回だけ間違えても正解扱いになる。",
    ),
    f: t(
      "In French slang sécher means to dry up in front of a question, so the folded scrap that prevents it is an antisèche; the exam it is aimed at, the baccalauréat, was created by Napoleon in 1808.|En argot francés sécher es quedarse en blanco ante una pregunta, así que el papelito que lo evita es un antisèche; el examen al que apunta, el bachillerato, lo creó Napoleón en 1808.|En argot, sécher c'est rester sans réponse : le petit papier plié qui l'empêche est donc une antisèche. L'examen visé, le baccalauréat, fut créé par Napoléon en 1808.|フランス語の俗語で sécher は「答えに詰まる」こと。それを防ぐ小さな紙だから「アンティセッシュ(乾き止め)」といいます。相手のバカロレアは、1808年にナポレオンが作った試験です。",
    ),
  },
  brocante: {
    e: "🖼️",
    price: 280,
    kind: "pre",
    n: t("Flea-Market Find|Hallazgo de brocante|Trouvaille de brocante|蚤の市の掘り出し物"),
    d: t(
      "Turns up unexpected cash.|Aparece dinero inesperado.|Fait surgir de l'argent inattendu.|思いがけない収入が入る。",
    ),
    f: t(
      "Tens of thousands of vide-greniers are held across France each year, and the Braderie de Lille alone tips a whole city onto its pavements for one September weekend.|En Francia se celebran decenas de miles de vide-greniers al año, y solo la Braderie de Lille vuelca una ciudad entera sobre sus aceras un fin de semana de septiembre.|Des dizaines de milliers de vide-greniers ont lieu chaque année en France, et la seule Braderie de Lille déverse une ville entière sur ses trottoirs un week-end de septembre.|フランスでは年に何万件ものヴィッド・グルニエ(蚤の市)が開かれます。9月の週末に開くリールのブラドリーでは、街ぜんぶが歩道に並びます。",
    ),
  },
  relais: {
    e: "📯",
    price: 420,
    kind: "pre",
    n: t("Post Relay|Relevo de postas|Relais de poste|宿駅の乗り継ぎ"),
    d: t(
      "Take another turn straight away.|Juega otro turno de inmediato.|Rejoue aussitôt.|すぐにもう一手番行える。",
    ),
    f: t(
      "From 1464 the king kept fresh horses at fixed stages along the main roads so a courier need never rest one; the word poste comes from those posted stations.|Desde 1464 el rey mantuvo caballos de refresco a distancias fijas en los caminos reales para que el correo no parase nunca; de aquellas postas viene la palabra postal.|Dès 1464, le roi entretint des chevaux frais à intervalles fixes sur les grandes routes pour que le courrier ne s'arrête jamais ; c'est de ces relais postés que vient le mot poste.|1464年以降、王は街道の一定間隔に替え馬を置き、急使が馬を休ませずに走れるようにしました。「郵便(ポスト)」という語は、この置かれた宿駅に由来します。",
    ),
  },
};

/**
 * 厄災の神。
 *
 * 日本の貧乏神・ボリビアのエル・ティーオと同じ役回りを、ブルターニュの伝承から
 * 取っている。アンクー(l'Ankou)は死そのものではなく「死の下働き」で、
 * その年最後に亡くなった者が翌年その役を負い、荷車を引いて魂を迎えに行くとされる。
 * 強化形は、その荷車(karrigell an Ankou)の車軸が軋みはじめた状態。
 */
export const FRANCE_SPIRIT = {
  e: "🐴",
  n: t("The Ankou|El Ankou|L'Ankou|アンクー"),
  big: t("The Cart of the Ankou|La carreta del Ankou|La charrette de l'Ankou|アンクーの荷車"),
  ward: "buis",
  arrive: t(
    "<b>🐴 The Ankou takes the next seat!</b> In Breton lore he is not death itself but its workman — the last soul of the year, sent to fetch the others — and he goes about the lanes with a cart and two lean horses. He now travels with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🐴 ¡El Ankou ocupa el asiento de al lado!</b> En la tradición bretona no es la muerte, sino su obrero: el último difunto del año, enviado a buscar a los demás, que recorre los caminos con una carreta y dos caballos flacos. Ahora viaja con <b>{0}</b>, el más lejano del destino, y trae una desgracia cada turno.|<b>🐴 L'Ankou s'assoit à côté !</b> Dans la tradition bretonne, il n'est pas la mort mais son ouvrier : le dernier défunt de l'année, chargé d'aller chercher les autres, qui va par les chemins avec une charrette et deux chevaux maigres. Il voyage désormais avec <b>{0}</b>, le plus éloigné du but, et amène un malheur chaque tour.|<b>🐴 アンクーが隣の席に座った!</b> ブルターニュの伝承では、死そのものではなく死の下働きとされる。その年最後に亡くなった者が、翌年、他の魂を迎えに行く役を負うのだという。痩せた二頭の馬と荷車を連れて道を行く。いま目的地から最も遠い <b>{0}</b> について歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🐴 <b>The Ankou</b> turns his cart around — he now follows <b>{0}</b>, farthest from {1}.|🐴 <b>El Ankou</b> da la vuelta a la carreta: ahora sigue a <b>{0}</b>, el más lejano de {1}.|🐴 <b>L'Ankou</b> fait tourner sa charrette — il suit à présent <b>{0}</b>, le plus loin de {1}.|🐴 <b>アンクー</b> が荷車の向きを変えた。いまは {1} から最も遠い <b>{0}</b> について行く。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns with the Ankou and has not shaken him off. Behind the carriage the axle of <b>the cart</b> begins to sing — the sound country people listen for at night and hope not to hear. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con el Ankou y no ha logrado perderlo. Tras el vagón, el eje de <b>la carreta</b> empieza a cantar: ese ruido que en el campo se escucha de noche esperando no oírlo. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours avec l'Ankou sans parvenir à le semer. Derrière la voiture, l'essieu de <b>la charrette</b> se met à chanter — ce bruit que l'on guette la nuit à la campagne en espérant ne pas l'entendre. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンかけてもアンクーを振り切れなかった。車両の後ろで <b>荷車</b> の車軸が鳴きはじめる。田舎の人々が夜、聞こえませんようにと耳を澄ますあの音である。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the Breton ossuaries at Ploumilliau and La Roche-Maurice still keep a carved Ankou, and his scythe is mounted the wrong way round — he does not draw the blade towards himself, he pushes it out ahead of him.|<b>Tras la historia:</b> en los osarios bretones de Ploumilliau y La Roche-Maurice todavía se conserva un Ankou tallado, con la guadaña montada al revés: no siega tirando hacia sí, sino empujando hacia delante.|<b>Derrière l'histoire :</b> les ossuaires bretons de Ploumilliau et de La Roche-Maurice conservent un Ankou sculpté, la faux montée à l'envers : il ne fauche pas en ramenant la lame vers lui, mais en la poussant devant lui.|<b>物語の背景:</b> ブルターニュのプルミリオーやラ・ロシュ=モーリスの納骨堂には、いまも木彫のアンクーが残る。その大鎌は刃が逆向きに取り付けられている。手前へ引いて刈るのではなく、前へ押して刈るからだという。",
  ),
  pleased: t(
    "One of the lean horses stops to crop the grass on the verge, and something rolls out of the cart. <b>{0}</b> gains <span class='money'>+{1}</span>.|Uno de los caballos flacos se para a pacer en la cuneta y algo rueda fuera de la carreta. <b>{0}</b> gana <span class='money'>+{1}</span>.|L'un des chevaux maigres s'arrête pour brouter le talus, et quelque chose roule hors de la charrette. <b>{0}</b> gagne <span class='money'>+{1}</span>.|痩せ馬の一頭が路肩の草を食もうと足を止め、荷車から何かが転がり落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A sprig of blessed boxwood is tucked in above the window. The cart does not slow down, and <b>{0}</b> goes on untouched this turn.|Un ramito de boj bendito está metido sobre la ventanilla. La carreta no aminora, y <b>{0}</b> sigue intacto este turno.|Un brin de buis bénit est glissé au-dessus de la fenêtre. La charrette ne ralentit pas, et <b>{0}</b> poursuit indemne ce tour-ci.|窓の上に、祝別された黄楊の小枝が挟んである。荷車は速度を落とさずに行き過ぎ、<b>{0}</b> はこのターン無事に進んだ。",
  ),
};

/** 災難(7種)。効果の対応は season-and-doom-rules.ts 側。 */
export const FRANCE_DOOM = [
  {
    id: "mistral",
    n: t("The mistral gets under the tiles|El mistral se cuela bajo las tejas|Le mistral passe sous les tuiles|ミストラルが瓦の下に入る"),
    t: t(
      "The wind comes down the Rhône valley for three days, or six, or nine, and lifts the roof tiles one by one. The bill for putting them back arrives while it is still blowing.|El viento baja por el valle del Ródano tres días, o seis, o nueve, y levanta las tejas una a una. La factura de volver a colocarlas llega mientras aún sopla.|Le vent descend la vallée du Rhône trois jours, ou six, ou neuf, et soulève les tuiles une à une. La facture pour les remettre arrive alors qu'il souffle encore.|風はローヌの谷を三日、あるいは六日、あるいは九日吹き下ろし、屋根瓦を一枚ずつ剥がしていく。葺き直しの請求書は、まだ風の吹いているうちに届く。",
    ),
  },
  {
    id: "vendange-ratee",
    n: t("The harvest is lost|Se pierde la vendimia|La vendange est perdue|ぶどうが穫れない"),
    t: t(
      "Hail in June, rot in September, and the year is written off before it is picked. Everything bought and sold here loses value along with it.|Granizo en junio, podredumbre en septiembre, y el año se da por perdido antes de recogerlo. Todo lo que aquí se compra y se vende pierde valor con él.|La grêle en juin, la pourriture en septembre, et l'année est perdue avant d'être ramassée. Tout ce qui s'achète et se vend ici perd sa valeur avec elle.|六月に雹、九月に腐敗。その年は摘む前に棒に振られる。この地の売り買いも、ぶどうと一緒に値を落とす。",
    ),
  },
  {
    id: "greve",
    n: t("A day of strike|Día de huelga|Jour de grève|ストライキの日"),
    t: t(
      "One train in four, no metro at all, and a march down the boulevard at two o'clock. The notice went up five days ago and there is nothing to do but wait it out.|Un tren de cada cuatro, ningún metro y una manifestación por el bulevar a las dos. El preaviso se puso hace cinco días y no queda más que esperar.|Un train sur quatre, pas de métro du tout, et un cortège sur le boulevard à quatorze heures. Le préavis est tombé il y a cinq jours : il n'y a qu'à attendre.|列車は四本に一本、地下鉄は動かず、二時には大通りをデモが行く。予告は五日前に出ている。待つよりほかにない。",
    ),
  },
  {
    id: "feu-de-garrigue",
    n: t("Fire in the garrigue|Fuego en la garriga|Le feu dans la garrigue|ガリーグの火事"),
    t: t(
      "Dry scrub, a north wind, and one spark from the roadside. The water bombers come over at first light, but not before the fire has taken whatever stood in its way.|Matorral seco, viento del norte y una chispa desde la cuneta. Los hidroaviones llegan al alba, pero no antes de que el fuego se lleve lo que había en su camino.|Broussaille sèche, vent du nord et une étincelle venue du bas-côté. Les Canadairs passent aux premières lueurs, mais le feu a déjà emporté ce qui se trouvait sur son chemin.|乾いた低木、北からの風、路肩の火花ひとつ。消火飛行艇は夜明けとともに飛来するが、その前に火は行く手にあったものを持っていく。",
    ),
  },
  {
    id: "tournee-generale",
    n: t("A round for the whole bar|Una ronda para todo el bar|Tournée générale|店じゅうに一杯"),
    t: t(
      "Losing thirteen to nothing at pétanque has a name of its own, and the penalty is settled custom: the loser stands a round for everyone at the counter. Nobody asks whether you meant to offer.|Perder trece a cero a la petanca tiene nombre propio, y el castigo es costumbre fija: el perdedor paga una ronda para todos en la barra. Nadie pregunta si querías invitar.|Perdre treize à zéro à la pétanque porte un nom bien à lui, et la sanction est réglée d'avance : le perdant paie sa tournée à tout le comptoir. Personne ne demande si tu comptais offrir.|ペタンクで13対0で負けることには専用の呼び名があり、罰も昔から決まっている。負けた者がカウンターの全員に一杯おごるのだ。おごる気があったかどうかは誰も訊かない。",
    ),
  },
  {
    id: "rame-coupee",
    n: t("The train splits in two|El tren se parte en dos|La rame se coupe en deux|列車が二つに分かれる"),
    t: t(
      "Two sets run coupled as far as the junction; there one half carries on and the other turns off somewhere else. The announcement did say which coaches, once, in the tunnel.|Dos ramas van unidas hasta el empalme; allí una mitad sigue y la otra se desvía a otra parte. El aviso sí decía qué coches: se dio una vez, dentro del túnel.|Deux rames roulent accouplées jusqu'à la bifurcation ; là, une moitié continue et l'autre part ailleurs. L'annonce précisait bien les voitures : elle est passée une fois, dans le tunnel.|二編成は分岐駅まで連結して走り、そこで片方は先へ、片方は別の線へ行く。何号車かは案内されていた。トンネルの中で、一度だけ。",
    ),
  },
  {
    id: "tire-laine",
    n: t("A hand in your pocket|Una mano en el bolsillo|Une main dans la poche|懐に伸びる手"),
    t: t(
      "A crush at the doors, a folded newspaper held a little too close, and by the next station the pocket is lighter. The old word for the trade, tire-laine, is four hundred years old.|Un apretón en las puertas, un periódico doblado demasiado cerca, y en la siguiente estación el bolsillo pesa menos. La vieja palabra del oficio, tire-laine, tiene cuatrocientos años.|Une bousculade aux portes, un journal plié tenu un peu trop près, et à la station suivante la poche est plus légère. Le vieux mot du métier, tire-laine, a quatre cents ans.|扉のあたりの人だかり、少し近すぎる位置に畳まれた新聞、次の駅では懐が軽くなっている。この稼業を指す古い言葉「ティール=レーヌ」は四百年前のものだ。",
    ),
  },
];

/** 季節イベント(4月始まりの12ヶ月)。 */
export const FRANCE_SEASONS = [
  {
    e: "🔔",
    n: t("The bells come back from Rome|Las campanas vuelven de Roma|Les cloches reviennent de Rome|鐘がローマから帰ってくる"),
    t: t(
      "Church bells go silent from Friday, and on Sunday morning the children are sent into the garden to find what fell out of them on the way home. The first white asparagus reaches every market the same week.|Las campanas callan desde el viernes y el domingo por la mañana se manda a los niños al jardín a buscar lo que se les cayó al volver. Esa misma semana el primer espárrago blanco llega a todos los mercados.|Les cloches se taisent à partir du vendredi et, le dimanche matin, on envoie les enfants au jardin ramasser ce qui en est tombé au retour. Les premières asperges blanches arrivent sur les marchés la même semaine.|金曜から教会の鐘は鳴らなくなり、日曜の朝、子どもたちは庭へ出て、鐘が帰り道に落としていったものを探す。同じ週、市場には最初の白アスパラガスが並ぶ。",
    ),
    f: t(
      "French children are told the bells fly to Rome for Holy Week rather than that a rabbit brings the eggs, which is why they hang silent for three days.|A los niños franceses no se les habla de un conejo, sino de campanas que vuelan a Roma en Semana Santa: por eso permanecen mudas tres días.|En France, on ne parle pas de lapin : les cloches partent à Rome pour la Semaine sainte, et c'est pour cela qu'elles restent muettes trois jours.|フランスでは卵を運ぶのは兎ではなく、聖週間のあいだローマへ飛んでいく鐘だと語られます。鐘が三日間鳴らないのはそのためです。",
    ),
  },
  {
    e: "💐",
    n: t("Lily of the valley and long weekends|Muguete y puentes|Le muguet et les ponts|スズランと連休"),
    t: t(
      "On the first of the month anyone at all may stand on a street corner and sell lily of the valley, licence-free and untaxed. Then come three public holidays in five weeks, and the whole country works out how to bridge each one to the nearest weekend.|El día uno cualquiera puede plantarse en una esquina a vender muguete, sin licencia ni impuesto. Luego llegan tres festivos en cinco semanas y el país entero calcula cómo unir cada uno con el fin de semana.|Le premier du mois, n'importe qui peut vendre du muguet au coin de la rue, sans licence ni impôt. Puis viennent trois jours fériés en cinq semaines, et le pays entier calcule comment faire le pont jusqu'au week-end.|一日には、誰でも街角に立ってスズランを売ってよい。許可も税も要らない。続く五週間に祝日が三つあり、国じゅうがそれを週末までどう「橋渡し」するか考える。",
    ),
    f: t(
      "The custom is traced to 1561, when Charles IX was given a sprig for luck and decided to hand one to every lady of his court each first of May.|La costumbre se remonta a 1561: a Carlos IX le regalaron un ramito de la suerte y decidió dar uno a cada dama de su corte cada primero de mayo.|La coutume remonte à 1561 : Charles IX reçut un brin porte-bonheur et décida d'en offrir un à chaque dame de sa cour tous les premiers mai.|習わしの由来は1561年。幸運のしるしにスズランを贈られたシャルル9世が、以後毎年5月1日に宮廷の女性たちへ配ることにしたと伝えられます。",
    ),
  },
  {
    e: "🎶",
    n: t("Music in every street|Música en cada calle|De la musique dans chaque rue|どの通りにも音楽"),
    t: t(
      "On the longest evening of the year anyone may play anywhere, and the country stays out until three in the morning listening to strangers. Cafés and record shops take more than in any other week.|En la tarde más larga del año cualquiera puede tocar en cualquier parte, y el país se queda fuera hasta las tres escuchando a desconocidos. Cafés y tiendas de discos hacen su mejor semana.|Le soir le plus long de l'année, chacun peut jouer n'importe où, et le pays reste dehors jusqu'à trois heures du matin à écouter des inconnus. Cafés et disquaires font leur meilleure semaine.|一年でいちばん長い夕暮れ、誰でもどこでも演奏してよい。国じゅうが朝三時まで外に出て、見知らぬ人の音楽を聴いている。カフェもレコード屋も、この週がいちばん売れる。",
    ),
    f: t(
      "The Fête de la Musique began in Paris in 1982 with a single rule — the music must be free and out of doors — and is now held in more than a hundred countries.|La Fiesta de la Música nació en París en 1982 con una sola regla —la música debe ser gratuita y al aire libre— y hoy se celebra en más de cien países.|La Fête de la Musique est née à Paris en 1982 avec une seule règle — la musique doit être gratuite et en plein air — et se tient aujourd'hui dans plus de cent pays.|音楽の祭日は1982年にパリで始まりました。決まりは「無料で、屋外で」の一つだけ。いまでは100か国以上で行われています。",
    ),
  },
  {
    e: "🎆",
    n: t("Fireworks and the firemen's ball|Fuegos y el baile de bomberos|Le feu d'artifice et le bal des pompiers|花火と消防士の舞踏会"),
    t: t(
      "On the thirteenth the fire stations open their doors and everyone dances between the engines; on the fourteenth the sky goes up over every town hall in the country. Meanwhile the bicycle race is climbing the Alps, and the villages on the route have been painting the road for weeks.|El día trece los parques de bomberos abren sus puertas y se baila entre los camiones; el catorce el cielo se enciende sobre cada ayuntamiento del país. Mientras, la carrera ciclista sube los Alpes y los pueblos del recorrido llevan semanas pintando la carretera.|Le treize, les casernes ouvrent leurs portes et l'on danse entre les camions ; le quatorze, le ciel s'embrase au-dessus de chaque mairie du pays. Pendant ce temps, la course grimpe dans les Alpes et les villages traversés peignent la route depuis des semaines.|十三日、消防署が門を開き、消防車のあいだで人々が踊る。十四日には、国じゅうの町役場の上で空が上がる。その頃、自転車の大会はアルプスを登っていて、通り道の村々は何週間も前から路面に絵を描いている。",
    ),
    f: t(
      "The story goes that in 1937 a Paris crew returning from the parade was followed home by a crowd and simply let them in; the balls are still run by the firefighters themselves, for their own funds.|Se cuenta que en 1937 una dotación parisina, al volver del desfile, fue seguida por la gente y acabó dejándola entrar; los bailes los siguen organizando los propios bomberos, para su caja.|On raconte qu'en 1937 une caserne parisienne, rentrant du défilé, fut suivie par la foule et finit par la laisser entrer ; les bals sont toujours organisés par les pompiers eux-mêmes, à leur profit.|1937年、行進から戻るパリの消防隊のあとを人々がついて来てしまい、そのまま署に入れたのが始まりだと語られます。舞踏会は今も、消防士たち自身が自分たちの資金のために開いています。",
    ),
  },
  {
    e: "🚗",
    n: t("The whole country goes on holiday|El país entero se va de vacaciones|Tout le pays part en vacances|国じゅうが休みに入る"),
    t: t(
      "Bakeries post the name of whichever one of them is staying open, and the cities empty out street by street. Nothing much is decided anywhere until the first week of September.|Las panaderías cuelgan el nombre de la que se queda abierta y las ciudades se vacían calle a calle. No se decide gran cosa en ninguna parte hasta la primera semana de septiembre.|Les boulangeries affichent le nom de celle qui reste ouverte et les villes se vident rue par rue. Plus rien ne se décide nulle part avant la première semaine de septembre.|パン屋は「今月開けている店」の名を貼り出し、都市は一区画ずつ空になっていく。九月の第一週まで、どこでも大したことは決まらない。",
    ),
    f: t(
      "Paid holidays were won in 1936, two weeks of them, with a cheap railway ticket to go with them; in some departments the closing rota for bakeries is still fixed by the prefecture.|Las vacaciones pagadas se ganaron en 1936, dos semanas, con un billete de tren barato para aprovecharlas; en algunos departamentos el turno de cierre de las panaderías aún lo fija la prefectura.|Les congés payés furent obtenus en 1936 — deux semaines — avec un billet de train à prix réduit pour en profiter ; dans certains départements, le tour de rôle des boulangeries est encore fixé par la préfecture.|有給休暇は1936年に勝ち取られ、二週間の休みと割引の鉄道切符が付いてきました。パン屋の閉店当番は、いくつかの県では今も知事の命令で決められています。",
    ),
  },
  {
    e: "📚",
    n: t("La rentrée|La rentrée|La rentrée|ラントレ(新学期)"),
    t: t(
      "School, work, politics and publishing all start again on the same Monday. The stationers are stripped bare, and the bookshops take in a whole autumn of novels at once.|El colegio, el trabajo, la política y la edición vuelven a empezar el mismo lunes. Las papelerías quedan vacías y las librerías reciben de golpe todo el otoño de novelas.|École, travail, politique et édition repartent le même lundi. Les papeteries sont dévalisées et les librairies reçoivent d'un coup tout l'automne romanesque.|学校も仕事も政治も出版も、同じ月曜に一斉に動き出す。文房具屋の棚は空になり、書店には秋ぶんの小説がまとめて届く。",
    ),
    f: t(
      "In the rentrée littéraire some five hundred novels appear within a few weeks, timed so that they are on the tables when the autumn prizes are decided.|En la rentrée littéraire aparecen unas quinientas novelas en pocas semanas, calculadas para estar en las mesas cuando se fallan los premios de otoño.|La rentrée littéraire fait paraître quelque cinq cents romans en quelques semaines, calés pour être sur les tables au moment des prix d'automne.|「文学のラントレ」では数週間に500冊ほどの小説が出ます。秋の文学賞が決まる頃に平台に並んでいるよう、時期を合わせているのです。",
    ),
  },
  {
    e: "🍇",
    n: t("The grape harvest|La vendimia|Les vendanges|ぶどうの収穫"),
    t: t(
      "The date is called a few days ahead, and then everyone is in the rows at first light, cutting until the light goes. Even Paris brings in its own crop, from the vines on the north slope of Montmartre.|La fecha se anuncia con pocos días de aviso y luego todos están entre las cepas al amanecer, cortando hasta que se va la luz. Hasta París recoge lo suyo, en las viñas de la ladera norte de Montmartre.|La date est annoncée quelques jours à l'avance, puis tout le monde est dans les rangs dès l'aube, à couper jusqu'à la nuit. Paris aussi rentre sa récolte, sur les vignes du versant nord de la Butte.|収穫の日取りは数日前に告げられ、あとは夜明けから畝に入り、日が落ちるまで鋏を動かす。パリでさえ自前のぶどうを穫る。モンマルトルの丘の北斜面に畑がある。",
    ),
    f: t(
      "Harvest dates written down in Burgundy since 1354 make one of the longest weather records anywhere, and they now fall about two weeks earlier than the long-run average.|Las fechas de vendimia anotadas en Borgoña desde 1354 forman uno de los registros climáticos más largos que existen, y hoy caen unas dos semanas antes que la media histórica.|Les dates de vendange notées en Bourgogne depuis 1354 forment l'une des plus longues séries climatiques qui soient ; elles tombent aujourd'hui environ deux semaines plus tôt que la moyenne.|ブルゴーニュで1354年から記録されてきた収穫開始日は、世界でも有数に長い気候の記録です。近年の日付は、長期平均より2週間ほど早くなっています。",
    ),
  },
  {
    e: "🍷",
    n: t("Chrysanthemums, then the new wine|Crisantemos y luego el vino nuevo|Les chrysanthèmes, puis le vin nouveau|菊、そして新酒"),
    t: t(
      "On the first the cemeteries fill with pots of chrysanthemums; on the third Thursday, at midnight, the year's first wine is opened everywhere at once. Between the two the country is grey and busy.|El día uno los cementerios se llenan de macetas de crisantemos; el tercer jueves, a medianoche, se abre a la vez en todas partes el primer vino del año. Entre ambas fechas el país está gris y atareado.|Le premier, les cimetières se couvrent de pots de chrysanthèmes ; le troisième jeudi, à minuit, on ouvre partout en même temps le premier vin de l'année. Entre les deux, le pays est gris et affairé.|一日、墓地は菊の鉢で埋まる。第三木曜の零時には、その年の最初の葡萄酒がどこでも一斉に開けられる。そのあいだの国は、灰色で忙しい。",
    ),
    f: t(
      "Because chrysanthemums are the flower taken to graves on All Saints' Day, arriving at a French house with a pot of them is a mistake worth avoiding.|Como el crisantemo es la flor que se lleva a las tumbas en Todos los Santos, presentarse en una casa francesa con una maceta es un error que conviene evitar.|Le chrysanthème étant la fleur que l'on porte sur les tombes à la Toussaint, arriver chez des Français avec un pot est une maladresse à éviter.|菊は諸聖人の日に墓へ供える花なので、フランスの家に鉢植えの菊を持っていくのは避けたほうがよい贈り物です。",
    ),
  },
  {
    e: "🎄",
    n: t("The Christmas markets|Los mercados de Navidad|Les marchés de Noël|クリスマスの市"),
    t: t(
      "Wooden huts go up around the cathedrals of the east, and the smell of hot wine carries to the end of the street. In the south the table is laid with thirteen desserts and left standing overnight.|Se levantan casetas de madera junto a las catedrales del este y el olor a vino caliente llega al final de la calle. En el sur se ponen trece postres en la mesa y se dejan toda la noche.|Les chalets de bois s'installent autour des cathédrales de l'Est et l'odeur du vin chaud porte jusqu'au bout de la rue. Dans le Midi, on dresse les treize desserts et on les laisse sur la table toute la nuit.|東部の大聖堂のまわりに木の小屋が並び、ホットワインの匂いが通りの端まで届く。南部では十三のデザートを卓に並べ、そのまま一晩置いておく。",
    ),
    f: t(
      "Strasbourg has held its market since 1570, when it took the place of a Saint Nicholas fair; the thirteen desserts of Provence stand for the guests at the last supper.|Estrasburgo celebra su mercado desde 1570, cuando ocupó el lugar de una feria de San Nicolás; los trece postres de Provenza representan a los comensales de la última cena.|Strasbourg tient son marché depuis 1570, année où il prit la place d'une foire de la Saint-Nicolas ; les treize desserts de Provence rappellent les convives de la Cène.|ストラスブールの市は1570年から続き、聖ニコラウスの市に取って代わったものです。プロヴァンスの十三のデザートは、最後の晩餐の席についた人数を表しています。",
    ),
  },
  {
    e: "👑",
    n: t("The kings' cake|El roscón de reyes|La galette des Rois|王様のガレット"),
    t: t(
      "The bakeries sell almost nothing else all month, and every cake has a small charm baked inside it. The youngest person goes under the table and calls out who gets each slice, so that nobody can be accused of aiming.|Las panaderías no venden casi otra cosa en todo el mes, y cada torta lleva escondida una figurita. El más pequeño se mete bajo la mesa y canta a quién va cada porción, para que nadie pueda acusarle de apuntar.|Les boulangeries ne vendent presque que cela tout le mois, et chaque galette cache une fève. Le plus jeune se glisse sous la table et annonce à qui va chaque part, pour que personne ne puisse viser.|その月、パン屋はほとんどこれしか売らない。どのガレットにも小さな陶器が一つ焼き込まれている。いちばん年下の者が卓の下に潜り、どの一切れが誰のものかを言う。狙って配ったと言われないためである。",
    ),
    f: t(
      "The charm was once a real broad bean, which is why it is still called a fève; collectors now hunt the porcelain ones, and bakeries bring out a new set every year.|La figurita fue en su día una haba de verdad, y por eso aún se llama fève; hoy hay coleccionistas de las de porcelana y las panaderías sacan una serie nueva cada año.|La fève fut d'abord une véritable fève sèche : c'est de là que vient son nom. On collectionne aujourd'hui les fèves en porcelaine, et les boulangeries sortent une nouvelle série chaque année.|焼き込む陶器はもともと本物のそら豆で、「フェーヴ(そら豆)」という名はそこから来ています。今では磁器のフェーヴを集める人がいて、パン屋は毎年図柄を変えます。",
    ),
  },
  {
    e: "🥞",
    n: t("Crêpes and carnival|Crepes y carnaval|Crêpes et carnaval|クレープと謝肉祭"),
    t: t(
      "On the second, the first crêpe is tossed with a coin held in the other hand, for a year with money in it. Two weeks later Nice fills with floats and Menton builds its animals out of citrus.|El día dos se voltea la primera crepe con una moneda en la otra mano, para un año con dinero. Dos semanas después Niza se llena de carrozas y Menton construye sus figuras con cítricos.|Le deux, on fait sauter la première crêpe une pièce dans l'autre main, pour une année où l'argent ne manquera pas. Deux semaines plus tard, Nice se remplit de chars et Menton bâtit ses animaux en agrumes.|二日、片手に硬貨を握って最初のクレープを宙返しさせる。その年、金に困らないようにという願いである。二週間後にはニースが山車で埋まり、マントンは柑橘で動物をこしらえる。",
    ),
    f: t(
      "Menton's festival uses well over a hundred tonnes of lemons and oranges, each one wired on by hand and swapped out as it spoils.|La fiesta de Menton emplea bastante más de cien toneladas de limones y naranjas, atados uno a uno a mano y sustituidos según se estropean.|La fête de Menton emploie bien plus de cent tonnes de citrons et d'oranges, fixés un à un à la main et remplacés au fur et à mesure qu'ils s'abîment.|マントンのレモン祭りでは100トンを超える檸檬と橙が使われ、一つずつ手で針金留めされ、傷んだものから取り替えられます。",
    ),
  },
  {
    e: "☕",
    n: t("The chairs go back outside|Vuelven las sillas a la calle|Les chaises ressortent|椅子が外に出る"),
    t: t(
      "The first mild afternoon and every terrace is full by four, the chairs turned to face the street rather than each other. Then a March shower comes through and everyone crowds back inside for twenty minutes.|La primera tarde templada y a las cuatro no queda terraza libre, con las sillas vueltas hacia la calle y no unas frente a otras. Luego pasa un chaparrón de marzo y todos se meten dentro veinte minutos.|Premier après-midi doux : à quatre heures toutes les terrasses sont pleines, les chaises tournées vers la rue plutôt que les unes vers les autres. Puis une giboulée passe et tout le monde rentre pour vingt minutes.|最初の暖かい午後、四時にはどのテラスも埋まる。椅子は向かい合わせではなく、通りのほうを向いて並んでいる。そこへ三月の俄雨が抜けていき、二十分ほどみな中へ避難する。",
    ),
    f: t(
      "A café pays the town by the square metre for the pavement it puts its chairs on, which is why the same coffee costs more outside than at the counter.|Un café paga al ayuntamiento por metro cuadrado de acera ocupada, y por eso el mismo café cuesta más fuera que en la barra.|Un café paie à la ville un droit de terrasse au mètre carré de trottoir occupé : c'est pourquoi le même café coûte plus cher dehors qu'au comptoir.|カフェは歩道に椅子を置く面積に応じて市に使用料を払います。同じコーヒーがカウンターより外の席で高いのは、そのためです。",
    ),
  },
];
