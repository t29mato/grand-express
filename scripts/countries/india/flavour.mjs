/**
 * インドの国情報・地方区分・アイテム・厄災の神・災難・季節イベント。
 *
 * 季節は他国と同じく4月始まりの12ヶ月。インドの1年は暑季 → モンスーン →
 * 祭りの季節 → 涼季とはっきり移り変わるので、その順に並べている。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const INDIA_META = {
  id: "india",
  name: t("India|India|Inde|インド"),
  blurb: t(
    "Monsoons, temples and the great trunk lines|Monzones, templos y las grandes líneas|Moussons, temples et grandes lignes|モンスーンと寺院と大幹線",
  ),
  // ルピー。他国と同じく、内部の金額は100倍で持って表示時に割る。
  cur: { pre: "₹", post: "", mul: 100 },
  start: "delhi",
  cpuNames: ["アルナ Aruna", "ヴィクラム Vikram", "ミーラ Meera", "ラヴィ Ravi"],
  stripe: ["#e8722f", "#f6efe2", "#3f8f5a", "#5b8fe8", "#f5b31c"],
};

export const INDIA_REGIONS = {
  him: t("Himalaya & the North|Himalaya y el norte|Himalaya et le Nord|ヒマラヤ・北部"),
  gan: t("The Ganges Plain|La llanura del Ganges|La plaine du Gange|ガンジス平原"),
  des: t("Desert & the West|Desierto y el oeste|Désert et Ouest|砂漠・西部"),
  dec: t("The Deccan|El Decán|Le Deccan|デカン・中部"),
  sou: t("The South|El sur|Le Sud|南インド"),
  eas: t("East & North-East|Este y noreste|Est et Nord-Est|東部・北東部"),
};

/**
 * アイテム。効果の種類は他国と同じ9種で、名前だけがその国のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const INDIA_ITEMS = {
  garuda: {
    e: "🦅",
    price: 560,
    kind: "move",
    n: t("Garuda's Flight|El vuelo de Garuda|Le vol de Garuda|ガルーダの飛翔"),
    d: t(
      "Fly straight to the destination.|Vuela directo al destino.|Vole droit au but.|目的地へ一気に飛ぶ。",
    ),
    f: t(
      "Garuda, the eagle who carries Vishnu, appears on temple gateways and on the tail of India's national airline.|Garuda, el águila que lleva a Vishnu, aparece en las puertas de los templos y en la cola de la aerolínea nacional.|Garuda, l'aigle qui porte Vishnou, orne les portes des temples et la queue de la compagnie nationale.|ヴィシュヌ神を乗せる神鳥ガルーダは、寺院の門にもインドの国営航空の尾翼にも描かれています。",
    ),
  },
  tatkal: {
    e: "🎫",
    price: 400,
    kind: "pre",
    n: t("Tatkal Ticket|Billete tatkal|Billet tatkal|当日枠の切符"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Indian Railways holds back a quota of seats released one day before departure, so a last-minute traveller still has a chance.|Los ferrocarriles indios reservan un cupo de plazas liberadas un día antes de salir, así que quien decide tarde aún tiene opción.|Les chemins de fer indiens réservent un quota de places libérées la veille du départ : un voyageur de dernière minute garde sa chance.|インド国鉄は出発1日前に解放される座席枠を残しており、直前の旅人にもまだ望みがあります。",
    ),
  },
  rajdhani: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Rajdhani Express|Rajdhani Express|Rajdhani Express|ラージダニー急行"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Introduced in 1969, the Rajdhani links state capitals to Delhi and was the first Indian train with air conditioning throughout.|Introducido en 1969, el Rajdhani une capitales estatales con Delhi y fue el primer tren indio con aire acondicionado en todo el convoy.|Lancé en 1969, le Rajdhani relie les capitales d'État à Delhi ; ce fut le premier train indien entièrement climatisé.|1969年に登場したラージダニー急行は州都とデリーを結び、全車冷房を備えたインド初の列車でした。",
    ),
  },
  vandebharat: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Vande Bharat|Vande Bharat|Vande Bharat|ヴァンデ・バーラト"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "India's fastest train was designed and built domestically in eighteen months, and needs no separate locomotive.|El tren más rápido de la India se diseñó y construyó en el país en dieciocho meses y no necesita locomotora aparte.|Le train le plus rapide d'Inde fut conçu et construit sur place en dix-huit mois, sans locomotive séparée.|インド最速の列車は18ヶ月で国内設計・製造され、機関車を別に連結しない構造です。",
    ),
  },
  nimbumirchi: {
    e: "🍋",
    price: 320,
    kind: "passive",
    n: t("Nimbu-Mirchi Charm|Amuleto de limón y guindilla|Charme citron-piment|レモンと唐辛子の魔除け"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "A lemon and seven chillies on a thread hang over shop doors and truck bumpers across India, changed for a fresh one each week.|Un limón y siete guindillas en un hilo cuelgan sobre puertas de tiendas y parachoques de camiones, y se cambian cada semana.|Un citron et sept piments enfilés pendent aux portes des boutiques et aux pare-chocs des camions, renouvelés chaque semaine.|レモンと唐辛子7本を糸に通した魔除けは、インド中の店先やトラックの前に吊るされ、毎週新しいものに替えられます。",
    ),
  },
  neem: {
    e: "🌿",
    price: 440,
    kind: "pre",
    n: t("Neem Branch|Rama de nim|Branche de neem|ニームの枝"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Neem leaves are hung at doorways and used in medicine; the tree is bitter enough that almost no insect will touch it.|Las hojas de nim se cuelgan en las puertas y se usan en medicina; el árbol es tan amargo que casi ningún insecto lo toca.|Les feuilles de neem se suspendent aux portes et servent en médecine ; l'arbre est si amer que presque aucun insecte n'y touche.|ニームの葉は戸口に吊るされ、薬にも使われます。木が苦いため、ほとんどの虫が寄りつきません。",
    ),
  },
  panchang: {
    e: "📜",
    price: 340,
    kind: "passive",
    n: t("Panchang Almanac|Almanaque panchang|Almanach panchang|パンチャーング(暦)"),
    d: t(
      "Saves you once from a wrong quiz answer.|Te salva una vez de una respuesta equivocada.|Te sauve une fois d'une mauvaise réponse.|クイズを1回だけ間違えても正解扱いになる。",
    ),
    f: t(
      "The panchang is a traditional almanac giving auspicious times for travel, planting and weddings; new editions still sell in millions each year.|El panchang es un almanaque tradicional con los momentos propicios para viajar, sembrar o casarse; aún se venden millones cada año.|Le panchang est un almanach traditionnel indiquant les moments propices aux voyages, semailles et mariages ; il s'en vend encore des millions par an.|パンチャーングは旅立ち・種まき・婚礼の吉日を示す伝統的な暦で、今も毎年数百万部が売れています。",
    ),
  },
  jugaad: {
    e: "🔧",
    price: 280,
    kind: "pre",
    n: t("Jugaad Fix|Apaño jugaad|Bricolage jugaad|ジュガール(工夫)"),
    d: t(
      "Turns up unexpected cash.|Aparece dinero inesperado.|Fait surgir de l'argent inattendu.|思いがけない収入が入る。",
    ),
    f: t(
      "Jugaad means solving a problem with whatever is to hand; business schools now teach it as frugal innovation.|Jugaad es resolver un problema con lo que haya a mano; las escuelas de negocios lo enseñan como innovación frugal.|Jugaad, c'est résoudre un problème avec ce qu'on a sous la main ; les écoles de commerce l'enseignent comme innovation frugale.|ジュガールは「手元にあるもので何とかする」こと。今ではビジネススクールが倹約型イノベーションとして教えています。",
    ),
  },
  dabbawala: {
    e: "🍱",
    price: 420,
    kind: "pre",
    n: t("Dabbawala Relay|Relevo dabbawala|Relais dabbawala|ダッバーワーラーの継走"),
    d: t(
      "Take another turn straight away.|Juega otro turno de inmediato.|Rejoue aussitôt.|すぐにもう一手番行える。",
    ),
    f: t(
      "Mumbai's lunchbox carriers hand each tin through five or six people and still deliver on time almost without fail.|Los porteadores de fiambreras de Bombay pasan cada lata por cinco o seis manos y aun así entregan a tiempo casi sin fallo.|Les porteurs de gamelles de Bombay font passer chaque boîte par cinq ou six mains et livrent pourtant à l'heure, presque sans faute.|ムンバイの弁当配達人は、ひとつの弁当箱を5〜6人の手で受け渡しながら、ほぼ間違いなく時間どおりに届けます。",
    ),
  },
};

/**
 * 厄災の神。
 *
 * 日本の貧乏神・ボリビアのエル・ティーオと同じ役回りを、
 * インドの伝承から取っている。アラクシュミーはラクシュミー(富と幸運の女神)の
 * 姉とされ、争いと欠乏を連れてくる存在として語られる。
 * 強化形の「サデー・サティー」は占星術でいう7年半の苦難期のこと。
 */
export const INDIA_SPIRIT = {
  e: "🫏",
  n: t("Alakshmi|Alakshmi|Alakshmi|アラクシュミー"),
  big: t("Sade Sati|Sade Sati|Sade Sati|サデー・サティー"),
  ward: "nimbumirchi",
  arrive: t(
    "<b>🫏 Alakshmi climbs aboard!</b> In Hindu lore she is the elder sister of Lakshmi, goddess of fortune — where Lakshmi brings plenty, Alakshmi brings quarrels and empty hands, and she rides a donkey. She now travels with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🫏 ¡Alakshmi sube al tren!</b> En la tradición hindú es la hermana mayor de Lakshmi, diosa de la fortuna: donde Lakshmi trae abundancia, Alakshmi trae disputas y manos vacías, y monta un asno. Ahora viaja con <b>{0}</b>, el más lejano del destino, y trae una desgracia cada turno.|<b>🫏 Alakshmi monte à bord !</b> Dans la tradition hindoue, elle est la sœur aînée de Lakshmi, déesse de la fortune : là où Lakshmi apporte l'abondance, Alakshmi apporte querelles et mains vides, et elle chevauche un âne. Elle voyage désormais avec <b>{0}</b>, le plus éloigné du but, et amène un malheur chaque tour.|<b>🫏 アラクシュミーが乗り込んできた!</b> ヒンドゥーの伝承では、富と幸運の女神ラクシュミーの姉とされる。ラクシュミーが豊かさを運ぶのに対し、アラクシュミーは諍いと空の手を連れてきて、驢馬に乗って現れる。いま目的地から最も遠い <b>{0}</b> に取り憑き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🫏 <b>Alakshmi</b> changes trains — she now rides with <b>{0}</b>, farthest from {1}.|🫏 <b>Alakshmi</b> cambia de tren: ahora viaja con <b>{0}</b>, el más lejano de {1}.|🫏 <b>Alakshmi</b> change de train — elle voyage à présent avec <b>{0}</b>, le plus loin de {1}.|🫏 <b>アラクシュミー</b> が乗り換えた。いまは {1} から最も遠い <b>{0}</b> についている。",
  ),
  wake: t(
    "<b>{0}</b> has carried Alakshmi for four turns without shaking her off. The shadow lengthens into <b>Sade Sati</b>, the seven-and-a-half-year hard passage of the astrologers. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con Alakshmi sin lograr librarse. La sombra se alarga hasta el <b>Sade Sati</b>, el paso difícil de siete años y medio de los astrólogos. Cada desgracia golpea ahora el doble.|<b>{0}</b> porte Alakshmi depuis quatre tours sans s'en défaire. L'ombre s'allonge en <b>Sade Sati</b>, le passage difficile de sept ans et demi des astrologues. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもアラクシュミーを振り払えずにいる。影は伸びて、占星術でいう7年半の苦難期 <b>サデー・サティー</b> となった。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> Alakshmi is said to prefer dark, quarrelsome and untidy houses, which is why homes are swept and lit with rows of lamps before Diwali — a welcome for Lakshmi and a hint to her sister to move on.|<b>Tras la historia:</b> se dice que Alakshmi prefiere las casas oscuras, sucias y llenas de disputas; por eso antes de Diwali se barren los hogares y se encienden hileras de lámparas: una bienvenida a Lakshmi y una indirecta a su hermana.|<b>Derrière l'histoire :</b> Alakshmi préférerait les maisons sombres, désordonnées et querelleuses ; d'où le grand ménage et les rangées de lampes avant Diwali — un accueil pour Lakshmi et une invitation à sa sœur à passer son chemin.|<b>物語の背景:</b> アラクシュミーは暗く、散らかり、争いのある家を好むという。ディワーリーの前に家を掃き清め、灯明を並べて灯すのは、ラクシュミーを迎えると同時に、その姉に立ち去ってもらうためだと語られる。",
  ),
  pleased: t(
    "The donkey stops to eat a marigold garland, and something falls from the saddlebag. <b>{0}</b> gains <span class='money'>+{1}</span>.|El asno se detiene a comer una guirnalda de caléndulas y algo cae de la alforja. <b>{0}</b> gana <span class='money'>+{1}</span>.|L'âne s'arrête pour manger une guirlande de soucis et quelque chose tombe de la sacoche. <b>{0}</b> gagne <span class='money'>+{1}</span>.|驢馬がマリーゴールドの花輪を食べようと立ち止まり、鞍袋から何かが落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A lemon and seven chillies swing from the luggage rack. Alakshmi will not pass under them, and <b>{0}</b> goes on untouched this turn.|Un limón y siete guindillas cuelgan del portaequipajes. Alakshmi no pasa por debajo, y <b>{0}</b> sigue intacto este turno.|Un citron et sept piments pendent au porte-bagages. Alakshmi ne passe pas dessous, et <b>{0}</b> poursuit indemne ce tour-ci.|荷物棚からレモンと唐辛子7本の魔除けが揺れている。アラクシュミーはその下を通れず、<b>{0}</b> はこのターン無事に進んだ。",
  ),
};

/** 災難(7種)。効果の対応は season-and-doom-rules.ts 側。 */
export const INDIA_DOOM = [
  {
    id: "monsoonflood",
    n: t("The monsoon overflows|El monzón se desborda|La mousson déborde|モンスーンの氾濫"),
    t: t(
      "A week's rain arrives in a night. The tracks vanish under brown water and the repair bill arrives before the water has gone down.|La lluvia de una semana cae en una noche. Las vías desaparecen bajo el agua parda y la factura llega antes de que baje.|La pluie d'une semaine tombe en une nuit. Les voies disparaissent sous l'eau brune et la facture arrive avant la décrue.|一週間分の雨が一晩で降る。線路は茶色い水に沈み、水が引く前に修理の請求書が届く。",
    ),
  },
  {
    id: "drought",
    n: t("The rains fail|Las lluvias fallan|Les pluies manquent|雨が来ない"),
    t: t(
      "The monsoon stops short of the plateau. Wells drop, crops shrivel, and everything bought and sold here loses value at once.|El monzón no alcanza la meseta. Bajan los pozos, se secan las cosechas y todo lo que aquí se compra y vende pierde valor.|La mousson n'atteint pas le plateau. Les puits baissent, les récoltes grillent, et tout ce qui s'échange ici perd sa valeur.|モンスーンが高原まで届かない。井戸は下がり作物は枯れ、この地の売り買いは一斉に値を落とす。",
    ),
  },
  {
    id: "bandh",
    n: t("A bandh shuts the roads|Un bandh cierra las carreteras|Un bandh ferme les routes|バンド(全面ストライキ)"),
    t: t(
      "Shops shutter, buses stop, and nothing moves until evening. There is nothing to do but wait it out.|Cierran las tiendas, paran los autobuses y nada se mueve hasta la tarde. No queda más que esperar.|Les boutiques ferment, les bus s'arrêtent, rien ne bouge jusqu'au soir. Il n'y a qu'à attendre.|店は閉まり、バスは止まり、夕方まで何も動かない。待つよりほかにない。",
    ),
  },
  {
    id: "cyclone",
    n: t("A cyclone crosses the coast|Un ciclón cruza la costa|Un cyclone traverse la côte|サイクロン上陸"),
    t: t(
      "The Bay of Bengal sends up a storm with a name. Roofs go first, then the signboards, then whatever was being kept for later.|El golfo de Bengala manda una tormenta con nombre propio. Primero los tejados, luego los carteles, luego lo que se guardaba para después.|Le golfe du Bengale envoie une tempête qui porte un nom. D'abord les toits, puis les enseignes, puis tout ce qu'on gardait pour plus tard.|ベンガル湾が名前つきの嵐を寄越す。まず屋根、次に看板、そして後のために取っておいたものが飛んでいく。",
    ),
  },
  {
    id: "tollgate",
    n: t("Caught at every toll gate|Atrapado en cada peaje|Bloqué à chaque péage|料金所づくし"),
    t: t(
      "Barrier after barrier, each with its own receipt book. By the far side of the state the purse is a good deal lighter than the others'.|Barrera tras barrera, cada una con su talonario. Al otro lado del estado, la bolsa pesa bastante menos que las de los demás.|Barrière après barrière, chacune avec son carnet de reçus. À l'autre bout de l'État, la bourse est bien plus légère que celle des autres.|遮断機のたびに領収書の綴りが出てくる。州の反対側に着く頃には、財布は他人より目に見えて軽い。",
    ),
  },
  {
    id: "wrongtrain",
    n: t("On the wrong train|En el tren equivocado|Dans le mauvais train|乗る列車を間違えた"),
    t: t(
      "Two trains, one platform, thirty seconds to decide. The name on the coach is only readable once it has left.|Dos trenes, un andén, treinta segundos para decidir. El nombre del vagón sólo se lee cuando ya ha salido.|Deux trains, un quai, trente secondes pour choisir. Le nom sur la voiture ne se lit qu'une fois parti.|同じホームに二本、決断は30秒。車体の行先が読めるのは、走り出してからである。",
    ),
  },
  {
    id: "chori",
    n: t("A hand in the bag|Una mano en la bolsa|Une main dans le sac|荷物に伸びる手"),
    t: t(
      "A crowded carriage, a shoulder pressed against yours, and by the next station the side pocket is open and lighter.|Un vagón lleno, un hombro contra el tuyo, y en la siguiente estación el bolsillo lateral está abierto y más ligero.|Un wagon bondé, une épaule contre la vôtre, et à la gare suivante la poche latérale est ouverte et allégée.|混み合った車内、肩と肩が触れ、次の駅では脇のポケットが開いて軽くなっている。",
    ),
  },
];

/** 季節イベント(4月始まりの12ヶ月)。 */
export const INDIA_SEASONS = [
  {
    e: "🌾",
    n: t("Baisakhi and the first heat|Baisakhi y el primer calor|Baisakhi et les premières chaleurs|バイサーキーと初夏の熱"),
    t: t(
      "The wheat comes in across the north and the drums come out with it. By the end of the month the plains are already too hot to walk on at noon.|El trigo entra en todo el norte y salen los tambores con él. A fin de mes la llanura ya quema al mediodía.|Le blé rentre dans tout le nord et les tambours sortent avec lui. À la fin du mois, la plaine brûle déjà à midi.|北インド一帯で麦が穫れ、それに合わせて太鼓が出てくる。月末には平原はもう昼に歩けないほど暑い。",
    ),
    f: t(
      "Baisakhi marks both the harvest and the founding of the Khalsa in 1699, so it is a farmers' festival and a Sikh anniversary at once.|Baisakhi marca la cosecha y la fundación del Khalsa en 1699: es a la vez fiesta campesina y aniversario sij.|Baisakhi marque à la fois la moisson et la fondation du Khalsa en 1699 : fête paysanne et anniversaire sikh.|バイサーキーは収穫祭であると同時に、1699年のカールサー創設の記念日でもあります。",
    ),
  },
  {
    e: "🔥",
    n: t("The loo blows|Sopla el loo|Le loo souffle|ルー(熱風)が吹く"),
    t: t(
      "A dry wind comes off the desert at 45°C and the cities empty between noon and four. Everyone buys ice, matkas and cold drinks, and nobody buys anything else.|Un viento seco llega del desierto a 45 °C y las ciudades se vacían de doce a cuatro. Todos compran hielo, botijos y bebidas frías, y nada más.|Un vent sec venu du désert souffle à 45 °C et les villes se vident de midi à seize heures. Tout le monde achète glace, jarres et boissons fraîches, rien d'autre.|砂漠から45℃の乾いた風が吹き、正午から4時まで街は空になる。氷と素焼きの水瓶と冷たい飲み物だけが売れ、他は売れない。",
    ),
    f: t(
      "The loo is hot enough to be dangerous; unglazed clay matkas cool water by letting a little of it evaporate through the pot wall.|El loo es peligrosamente caliente; los botijos de barro sin vidriar enfrían el agua dejando que algo se evapore por la pared.|Le loo est dangereusement chaud ; les jarres de terre non vernissées refroidissent l'eau en la laissant s'évaporer par la paroi.|ルーは命に関わるほど熱い風です。素焼きの水瓶は、壁からわずかに水を蒸発させることで中身を冷やします。",
    ),
  },
  {
    e: "🌧",
    n: t("The monsoon bursts on Kerala|El monzón rompe en Kerala|La mousson éclate au Kerala|モンスーン、ケーララに来る"),
    t: t(
      "Around the first of June the rain reaches the southern coast and works north over six weeks. The whole country has been waiting for this since March.|Hacia el 1 de junio la lluvia llega a la costa sur y sube al norte en seis semanas. El país entero lleva esperándola desde marzo.|Vers le 1er juin la pluie atteint la côte sud et remonte vers le nord en six semaines. Le pays l'attend depuis mars.|6月1日ごろ、雨は南の海岸に届き、6週間かけて北上する。国じゅうが3月からこれを待っている。",
    ),
    f: t(
      "The monsoon's arrival date on the Kerala coast is announced nationally; about 70% of India's annual rain falls in these four months.|La fecha de llegada del monzón a Kerala se anuncia a todo el país; cerca del 70% de la lluvia anual cae en estos cuatro meses.|La date d'arrivée de la mousson au Kerala est annoncée à tout le pays ; environ 70 % des pluies annuelles tombent en ces quatre mois.|ケーララ海岸へのモンスーン到達日は全国に発表されます。年間降水量のおよそ7割がこの4ヶ月に降ります。",
    ),
  },
  {
    e: "☔",
    n: t("Rain over the whole plain|Lluvia sobre toda la llanura|Pluie sur toute la plaine|平原一面の雨"),
    t: t(
      "Rivers rise, roads soften, and trains run late as a matter of course. Fields go green almost overnight and nobody complains for long.|Suben los ríos, se ablandan las carreteras y los trenes llegan tarde por norma. Los campos verdean casi de la noche a la mañana y nadie se queja mucho.|Les fleuves montent, les routes ramollissent et les trains ont du retard par principe. Les champs verdissent presque du jour au lendemain et personne ne se plaint longtemps.|川は増水し、道はぬかるみ、列車が遅れるのは当たり前になる。畑はほとんど一夜で緑になり、誰も長くは文句を言わない。",
    ),
    f: t(
      "Indian classical music assigns particular ragas to the rainy season; Raga Megh Malhar is traditionally said to be able to call down rain.|La música clásica india asigna ragas a la estación de lluvias; se dice que el Raga Megh Malhar puede hacer llover.|La musique classique indienne attribue des ragas à la saison des pluies ; le Raga Megh Malhar passe pour appeler la pluie.|インド古典音楽には雨季のためのラーガがあり、メーグ・マルハールは雨を呼ぶと言い伝えられています。",
    ),
  },
  {
    e: "🇮🇳",
    n: t("Independence Day in the wet|Día de la Independencia bajo la lluvia|Fête de l'Indépendance sous la pluie|雨のなかの独立記念日"),
    t: t(
      "Kites go up over the rooftops on the fifteenth, between downpours. In the east the rivers are at their highest and whole districts move to higher ground.|El día quince suben las cometas entre chaparrones. En el este los ríos van llenos y distritos enteros se mudan a tierras altas.|Le quinze, les cerfs-volants montent entre deux averses. À l'est, les fleuves sont au plus haut et des districts entiers gagnent les hauteurs.|15日、にわか雨の合間に屋上から凧が上がる。東部では川が最も高く、いくつもの地区がまるごと高台へ移る。",
    ),
    f: t(
      "India became independent at midnight on 15 August 1947; the prime minister has addressed the country from the Red Fort every year since.|La India se independizó a medianoche del 15 de agosto de 1947; desde entonces el primer ministro habla cada año desde el Fuerte Rojo.|L'Inde devint indépendante à minuit le 15 août 1947 ; depuis, le premier ministre s'adresse au pays depuis le Fort Rouge.|インドは1947年8月15日午前0時に独立しました。以来、首相は毎年この日にレッド・フォートから国民に語りかけます。",
    ),
  },
  {
    e: "🐘",
    n: t("Ganesh goes to the sea|Ganesh va al mar|Ganesh part à la mer|ガネーシャを海へ送る"),
    t: t(
      "Clay figures the height of a house are carried through the streets of the Deccan and given to the water. The rain thins out behind them.|Figuras de arcilla altas como una casa recorren las calles del Decán y se entregan al agua. La lluvia amaina tras ellas.|Des figures d'argile hautes comme une maison traversent les rues du Deccan et sont rendues à l'eau. La pluie faiblit derrière elles.|家ほどの高さの土の像がデカンの街路を進み、水に還される。その後ろで雨は細くなっていく。",
    ),
    f: t(
      "Ganesh Chaturthi was turned into a mass public festival in the 1890s partly as a way of gathering crowds that colonial law otherwise forbade.|El Ganesh Chaturthi se volvió fiesta pública masiva en los 1890, en parte para reunir multitudes que la ley colonial prohibía.|Ganesh Chaturthi devint une fête publique de masse dans les années 1890, en partie pour rassembler des foules autrement interdites par la loi coloniale.|ガネーシャ・チャトゥルティーが大規模な公開祭になったのは1890年代で、植民地法が禁じていた集会の代わりという面もありました。",
    ),
  },
  {
    e: "🪔",
    n: t("Nine nights and the tenth day|Nueve noches y el décimo día|Neuf nuits et le dixième jour|九夜と十日目"),
    t: t(
      "Bengal builds and dismantles whole temporary temples in a week, and Gujarat dances in circles until three in the morning. Trade is brisk everywhere.|Bengala levanta y desmonta templos enteros en una semana, y Guyarat baila en círculos hasta las tres. El comercio va vivo por todas partes.|Le Bengale bâtit et démonte des temples entiers en une semaine, et le Gujarat danse en rond jusqu'à trois heures. Le commerce est vif partout.|ベンガルでは仮設の寺院が一週間で建てられ、また解体される。グジャラートでは朝三時まで輪になって踊る。どこでも商売は活気づく。",
    ),
    f: t(
      "Durga Puja's pandals are competitive works of temporary architecture, some modelled on famous buildings and all taken down within days.|Los pandals del Durga Puja son obras de arquitectura efímera en competencia, algunos copian edificios famosos y todos se desmontan en días.|Les pandals de Durga Puja sont des œuvres d'architecture éphémère en concurrence, parfois copiées sur des monuments célèbres, toutes démontées en quelques jours.|ドゥルガー・プージャーのパンダル(仮設堂)は競い合う一種の建築作品で、有名建築を模したものもあり、数日で解体されます。",
    ),
  },
  {
    e: "✨",
    n: t("Diwali|Diwali|Diwali|ディワーリー"),
    t: t(
      "Every doorway is scrubbed, painted with rice flour and lined with lamps. Accounts are closed, new ledgers opened, and gold changes hands all week.|Cada portal se friega, se pinta con harina de arroz y se llena de lámparas. Se cierran cuentas, se abren libros nuevos y el oro cambia de manos toda la semana.|Chaque seuil est récuré, peint à la farine de riz et bordé de lampes. On clôt les comptes, on ouvre de nouveaux registres et l'or change de mains toute la semaine.|どの戸口も磨かれ、米粉で文様を描き、灯明を並べる。帳簿を締め、新しい帳面を開き、一週間ずっと金が動く。",
    ),
    f: t(
      "For many merchant communities Diwali is the start of the financial year, and new account books are blessed before the first entry is made.|Para muchas comunidades mercantiles, Diwali abre el año contable, y los libros nuevos se bendicen antes del primer asiento.|Pour beaucoup de communautés marchandes, Diwali ouvre l'année comptable, et les nouveaux livres sont bénis avant la première écriture.|多くの商人共同体にとってディワーリーは会計年度の始まりで、新しい帳簿は最初の記帳の前に祈祷を受けます。",
    ),
  },
  {
    e: "💒",
    n: t("The wedding season|La temporada de bodas|La saison des mariages|婚礼の季節"),
    t: t(
      "The cool months are auspicious, so bands, marquees and horses are booked out for weeks. In the far north the passes close and the hill towns go quiet.|Los meses frescos son propicios, así que bandas, carpas y caballos están reservados semanas. En el extremo norte se cierran los puertos y los pueblos de montaña callan.|Les mois frais sont propices : orchestres, chapiteaux et chevaux sont réservés des semaines. Au nord, les cols ferment et les villes de montagne se taisent.|涼しい月は吉日が多く、楽隊も天幕も馬も何週間も先まで予約で埋まる。北の果てでは峠が閉じ、山の町は静かになる。",
    ),
    f: t(
      "Indian weddings are timed by the panchang almanac, so a few auspicious dates each winter see tens of thousands of ceremonies at once.|Las bodas indias se fijan por el almanaque panchang, así que unas pocas fechas propicias concentran decenas de miles de ceremonias.|Les mariages indiens sont fixés par l'almanach panchang : quelques dates propices concentrent des dizaines de milliers de cérémonies.|インドの婚礼はパンチャーング(暦)で日取りを決めるため、冬の限られた吉日に何万もの式が重なります。",
    ),
  },
  {
    e: "🪁",
    n: t("Sankranti and the kite sky|Sankranti y el cielo de cometas|Sankranti et le ciel aux cerfs-volants|サンクラーンティと凧の空"),
    t: t(
      "The sun turns north again and the rooftops of Gujarat disappear under kite strings. Sesame and jaggery sweets are pressed into every visitor's hand.|El sol vuelve al norte y los tejados de Guyarat desaparecen bajo hilos de cometa. Dulces de sésamo y panela se ponen en la mano de cada visitante.|Le soleil repart vers le nord et les toits du Gujarat disparaissent sous les fils de cerfs-volants. On glisse des confiseries au sésame dans la main de chaque visiteur.|太陽が再び北へ向かい、グジャラートの屋上は凧糸で見えなくなる。胡麻と粗糖の菓子が訪れる人みなの手に押し込まれる。",
    ),
    f: t(
      "Makar Sankranti is one of the few Indian festivals fixed to the solar calendar, so it falls on 14 or 15 January almost every year.|El Makar Sankranti es de las pocas fiestas indias fijadas al calendario solar, por eso cae el 14 o 15 de enero casi siempre.|Makar Sankranti est l'une des rares fêtes indiennes calées sur le calendrier solaire : elle tombe presque toujours les 14 ou 15 janvier.|マカル・サンクラーンティは太陽暦に基づく数少ないインドの祭りで、ほぼ毎年1月14日か15日になります。",
    ),
  },
  {
    e: "🌤",
    n: t("The best weeks to travel|Las mejores semanas para viajar|Les meilleures semaines pour voyager|旅に最も良い数週間"),
    t: t(
      "Dry, mild and clear from the Deccan to the southern tip. Every temple town, beach and hill station is full, and prices go with them.|Seco, suave y claro desde el Decán hasta la punta sur. Cada ciudad-templo, playa y estación de montaña está llena, y los precios suben con ellas.|Sec, doux et clair du Deccan à la pointe sud. Chaque ville-temple, plage et station de montagne est pleine, et les prix suivent.|デカンから南端まで、乾いて穏やかで晴れる。寺院の町も浜も高原の避暑地も満員で、値段もそれに従う。",
    ),
    f: t(
      "February is when most of India's classical music and dance festivals are held, many of them staged outdoors in temple courtyards.|En febrero se celebran la mayoría de los festivales de música y danza clásicas, muchos al aire libre en patios de templos.|C'est en février qu'ont lieu la plupart des festivals de musique et de danse classiques, souvent en plein air dans les cours de temples.|2月にはインド古典音楽・古典舞踊の祭典の多くが開かれ、その多くは寺院の中庭で野外上演されます。",
    ),
  },
  {
    e: "🎨",
    n: t("Holi|Holi|Holi|ホーリー"),
    t: t(
      "A bonfire the night before, then a morning in which nobody is recognisable and nobody is spared. Business stops entirely and starts again the next day, richer.|Una hoguera la víspera y luego una mañana en la que nadie es reconocible ni nadie se libra. El negocio para del todo y al día siguiente recomienza, más rico.|Un feu la veille au soir, puis un matin où personne n'est reconnaissable et personne n'est épargné. Les affaires s'arrêtent net et repartent le lendemain, plus prospères.|前夜は焚き火、翌朝は誰が誰だか分からず、誰も逃れられない。商いは完全に止まり、翌日にはより豊かになって動き出す。",
    ),
    f: t(
      "Holi marks the end of winter and, for one day, the ordinary rules of who may speak to whom are set aside.|Holi marca el fin del invierno y, por un día, se dejan de lado las reglas de quién puede hablar con quién.|Holi marque la fin de l'hiver et, pour un jour, les règles ordinaires sur qui peut s'adresser à qui sont suspendues.|ホーリーは冬の終わりを告げ、その一日だけは「誰が誰に話しかけてよいか」という日頃の決まりが脇に置かれます。",
    ),
  },
];
