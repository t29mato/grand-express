import { LocalizedText } from "../../domain/shared-kernel/localized-text";

/**
 * プレイヤー向けのリリースノート。
 *
 * 開発上の変更履歴(コミットログ)ではなく、**遊ぶ人から見て何が変わったか**を書く。
 * アプリ本体と同じく4言語で表示するため、文言は `LocalizedText` で持つ。
 * 新しい版は配列の先頭に追加すること(新しい順に表示される)。
 */
export interface ReleaseNote {
  readonly version: string;
  /** 公開日(YYYY-MM-DD)。 */
  readonly date: string;
  readonly title: LocalizedText;
  readonly highlights: readonly LocalizedText[];
}

/** `_t("en|es|fr|ja")` と同じ書き方で4言語を1行にまとめるヘルパー。 */
function t(source: string): LocalizedText {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const RELEASE_NOTES: readonly ReleaseNote[] = [
  {
    version: "0.13.4",
    date: "2026-08-07",
    title: t(
      "The sea has shallows now|El mar ahora tiene bajíos|La mer a désormais ses hauts-fonds|海に浅瀬ができました",
    ),
    highlights: [
      t(
        "The sea was one flat colour, so the coast met it with a hard edge and the board looked like cut paper. The water is now lighter close to the shore and deepens as it goes out.|El mar era de un solo color y la costa quedaba como recortada. Ahora el agua es más clara junto a la orilla y se oscurece mar adentro.|La mer était d'un seul ton et la côte semblait découpée. L'eau est désormais plus claire près du rivage et s'assombrit au large.|海が一色でのっぺりしていて、陸との境が切り絵のように見えていました。岸に近いほど水が明るく、沖へ行くほど深くなるようにしました。",
      ),
    ],
  },
  {
    version: "0.13.3",
    date: "2026-08-07",
    title: t(
      "Ajaccio is readable again|Ajaccio vuelve a leerse|Ajaccio est de nouveau lisible|アジャクシオが読めるようになりました",
    ),
    highlights: [
      t(
        "The key to the squares sat on the board itself, so it covered whatever was in the bottom-right corner — Corsica on the French map, New Zealand on the world one. It now sits in the corner of the screen instead, and stays the same size however far you zoom in.|La leyenda tapaba lo que hubiera en la esquina inferior derecha: Córcega, Nueva Zelanda. Ahora va en la esquina de la pantalla y no cambia de tamaño al acercar.|La légende masquait ce qui se trouvait en bas à droite : la Corse, la Nouvelle-Zélande. Elle est désormais dans le coin de l'écran et garde sa taille quel que soit le zoom.|マスの見かたの表が盤面の上に載っていたため、右下にあるもの——フランスならコルシカ島、世界一周ならニュージーランド——を覆っていました。画面の隅に移し、どれだけ寄せても同じ大きさで読めるようにしました。",
      ),
    ],
  },
  {
    version: "0.13.2",
    date: "2026-08-07",
    title: t(
      "The lines bend, not snap|Las líneas se curvan, no se quiebran|Les lignes s'incurvent au lieu de casser|線路の角が丸くなりました",
    ),
    highlights: [
      t(
        "Where a line changed direction it used to turn a hard right angle. It now sweeps round the bend, the way an underground map does — the board reads softer without losing any of its straightness.|Donde una línea cambiaba de dirección giraba en ángulo recto. Ahora describe una curva, como en un plano de metro.|Là où une ligne changeait de direction, elle formait un angle droit. Elle décrit désormais une courbe, comme sur un plan de métro.|線路が向きを変えるところが直角に折れていました。地下鉄の路線図と同じように、なめらかに回り込むようにしました。まっすぐさはそのままに、盤面の当たりが柔らかくなります。",
      ),
    ],
  },
  {
    version: "0.13.1",
    date: "2026-08-07",
    title: t(
      "You can see the moment a town changes hands|Se ve el momento en que una ciudad cambia de dueño|On voit le moment où une ville change de mains|町の持ち主が変わる瞬間が見えます",
    ),
    highlights: [
      t(
        "When a town becomes yours, the ring around it swells once and settles. It happens only on the change, so the board stays calm the rest of the time.|Cuando una ciudad pasa a ser tuya, el anillo se ensancha una vez y se asienta. Solo ocurre en el cambio.|Quand une ville devient vôtre, l'anneau s'élargit une fois puis se pose. Cela n'arrive qu'au changement.|町が自分のものになった瞬間、輪がひと回り広がってから収まります。変わったときだけなので、それ以外は盤面が落ち着いたままです。",
      ),
    ],
  },
  {
    version: "0.13.0",
    date: "2026-08-07",
    title: t(
      "The map turns your colour|El mapa se tiñe de tu color|La carte prend votre couleur|地図が自分の色に染まります",
    ),
    highlights: [
      t(
        "Buying a business used to change nothing on the map — you had to read the numbers on the side. Now a town you own wears a ring in your colour.|Comprar un negocio no cambiaba nada en el mapa. Ahora la ciudad que posees lleva un anillo de tu color.|Acheter un commerce ne changeait rien sur la carte. Désormais une ville qui vous appartient porte un anneau de votre couleur.|物件を買っても地図は何も変わらず、横の数字を読むしかありませんでした。持っている町に自分の色の輪が付くようになりました。",
      ),
      t(
        "Own every business in a town and the ring doubles and thickens — you can spot your monopolies across the whole board at a glance.|Si posees todos los negocios de una ciudad, el anillo se dobla y engrosa: tus monopolios se ven de un vistazo.|Possédez tous les commerces d'une ville et l'anneau double et s'épaissit : vos monopoles se repèrent d'un coup d'œil.|町の物件をすべてそろえると輪が太い二重になります。独占した町が盤面のどこにあっても一目で分かります。",
      ),
      t(
        "Where two travellers own the same number in one town, it stays uncoloured — it would be a lie to paint it as anyone's.|Si dos viajeros tienen lo mismo en una ciudad, esta queda sin color: pintarla de uno sería mentir.|Si deux voyageurs en possèdent autant l'un que l'autre, la ville reste incolore : la peindre serait mentir.|2人が同じ数だけ持っている町には色を付けません。どちらかの色で塗ると、盤面が実際より偏って見えてしまうからです。",
      ),
    ],
  },
  {
    version: "0.12.1",
    date: "2026-08-07",
    title: t(
      "The map reads properly now|Ahora el mapa se lee bien|La carte se lit enfin correctement|地図が読みやすくなりました",
    ),
    highlights: [
      t(
        "The lines were supposed to run only up, across or at 45° — but only 5% of them actually did. Now every single one does, on all five boards.|Las líneas debían ir solo en vertical, horizontal o a 45°, pero solo el 5% lo hacía. Ahora lo hacen todas, en los cinco tableros.|Les lignes ne devaient aller qu'à la verticale, à l'horizontale ou à 45° — seules 5 % le faisaient. Désormais toutes, sur les cinq plateaux.|線路は縦・横・45度だけで引くはずが、実際にそうなっていたのは5%だけでした。5つの盤面すべてで、全部の線がそうなりました。",
      ),
      t(
        "Around Osaka and Kyoto the squares were sitting on top of the town markers, hiding them. They now slide along the line instead.|Cerca de Osaka y Kioto las casillas tapaban las ciudades. Ahora se desplazan a lo largo de la vía.|Autour d'Osaka et de Kyoto, les cases masquaient les villes. Elles glissent maintenant le long de la voie.|大阪や京都のあたりで、マスが町の印の上に乗って隠していました。線路の上を滑ってよけるようにしました。",
      ),
      t(
        "France was drawn half again too tall. It is a country almost as wide as it is high, and now it looks like one.|Francia se dibujaba una vez y media más alta de lo debido. Es casi tan ancha como alta, y ahora lo parece.|La France était dessinée une fois et demie trop haute. Elle est presque aussi large que haute, et cela se voit enfin.|フランスの形が縦に1.5倍伸びていました。横と縦がほぼ同じ長さの国なので、そう見えるようになりました。",
      ),
      t(
        "The white patch on Hokkaidō had green spikes poking out of it and meant nothing. It now follows the shape of the island — it is the snow country.|La mancha blanca de Hokkaidō tenía picos verdes y no significaba nada. Ahora sigue la forma de la isla: es el país de la nieve.|La tache blanche d'Hokkaidō laissait dépasser des pointes vertes sans rien vouloir dire. Elle épouse désormais l'île : c'est le pays de la neige.|北海道の白い部分から緑がとげのようにはみ出していて、何を表しているのか分からない模様になっていました。島の形に合わせ、雪国だと分かるようにしました。",
      ),
    ],
  },
  {
    version: "0.12.0",
    date: "2026-08-07",
    title: t(
      "France and the world start moving|Francia y el mundo se ponen en marcha|La France et le monde s'animent|フランスと世界一周も動き出しました",
    ),
    highlights: [
      t(
        "The two newest boards were still standing still. Now every month, every town, every misfortune and every thing that can happen to you has a picture that moves — 94 new ones.|Los dos tableros más nuevos estaban quietos. Ahora cada mes, cada ciudad, cada desgracia y cada suceso tiene una imagen que se mueve: 94 nuevas.|Les deux plateaux les plus récents restaient immobiles. Désormais chaque mois, chaque ville, chaque malheur et chaque événement a une image animée : 94 nouvelles.|新しい2つの盤面だけが止まったままでした。月替わり・町・厄災・道中の出来事、そのすべてに動く絵が付きました。全94本。",
      ),
      t(
        "On the world board seven of the twelve months are split down the middle, because the hemispheres disagree: cherry blossom on one side and the grape harvest on the other, snow in one half and a beach in the other.|En el tablero mundial, siete de los doce meses se parten por la mitad porque los hemisferios no coinciden: cerezos a un lado y vendimia al otro.|Sur le plateau mondial, sept des douze mois sont coupés en deux, les hémisphères étant en désaccord : cerisiers d'un côté, vendanges de l'autre.|世界一周では12ヶ月のうち7ヶ月が画面の真ん中で割れています。南北で言い分が違うからです。片側で桜が咲き、反対側でぶどうを摘む。片側は雪の市で、反対側は浜辺です。",
      ),
      t(
        "August on the world board is the doldrums: the sails hang flat, the sea turns to a mirror, and even the misfortune spirit cannot move.|Agosto en el tablero mundial es la calma ecuatorial: las velas cuelgan, el mar es un espejo y ni el espíritu puede moverse.|En août, c'est le pot-au-noir : les voiles pendent, la mer devient un miroir, et même l'esprit du malheur ne peut bouger.|世界一周の8月は赤道の無風帯です。帆は垂れ、海は鏡になり、厄災の神まで動けません。",
      ),
      t(
        "In France, Easter begins with the bells flying off to Rome — in the old story it is the bells, not a rabbit, that bring the eggs back.|En Francia, la Pascua empieza con las campanas volando a Roma: en el cuento son ellas, no un conejo, las que traen los huevos.|En France, Pâques commence par les cloches qui s'envolent vers Rome — ce sont elles, non un lapin, qui rapportent les œufs.|フランスの4月は、鐘がローマへ飛んでいくところから始まります。卵を運んでくるのは兎ではなく鐘だ、という言い伝えです。",
      ),
    ],
  },
  {
    version: "0.11.0",
    date: "2026-08-07",
    title: t(
      "Around the World|La vuelta al mundo|Le tour du monde|世界一周がはじまりました",
    ),
    highlights: [
      t(
        "A fifth board, and the first that is not a country: 60 cities on six continents, 40 new questions, and 90 routes — 50 by land, 40 by sea.|Un quinto tablero, el primero que no es un país: 60 ciudades en seis continentes, 40 preguntas y 90 rutas (50 por tierra, 40 por mar).|Un cinquième plateau, le premier qui n'est pas un pays : 60 villes sur six continents, 40 questions et 90 liaisons (50 par voie de terre, 40 par mer).|5つ目の盤面は、はじめて国ではありません。6大陸60都市、新作クイズ40問、路線90本(陸路50・航路40)。",
      ),
      t(
        "Where the land runs on, you take the train — Moscow to Ulaanbaatar is the Trans-Siberian, and Cairo to Jerusalem crosses the Sinai. Everywhere else you take a ship.|Donde hay tierra, se va en tren: Moscú–Ulán Bator es el Transiberiano. En el resto, en barco.|Là où la terre continue, on prend le train : Moscou–Oulan-Bator, c'est le Transsibérien. Partout ailleurs, le bateau.|陸が続いているところは鉄道で行きます。モスクワからウランバートルはシベリア鉄道、カイロからエルサレムはシナイ半島越えです。それ以外は船旅になります。",
      ),
      t(
        "Because the hemispheres run opposite, no month is good everywhere. July empties Europe and North America while the great migration fills East Africa; December is snow in one half and swimming in the other.|Como los hemisferios van al revés, ningún mes es bueno en todas partes: julio vacía Europa mientras la gran migración llena África oriental.|Les hémisphères étant inversés, aucun mois n'est bon partout : juillet vide l'Europe tandis que la grande migration remplit l'Afrique de l'Est.|南半球と北半球で季節が逆なので、どの月も「どこかが盛りで、どこかが端境期」になります。7月はヨーロッパと北アメリカが休みに入る一方、東アフリカは大移動の季節です。12月は片側が雪で、反対側は海水浴です。",
      ),
      t(
        "The spirit of misfortune here is the Flying Dutchman, the ship that swore to round the Cape whatever came and was never let into port again. His charm is a Saint Christopher medal.|El espíritu de la desgracia es el Holandés Errante. El amuleto es una medalla de San Cristóbal.|L'esprit du malheur est le Hollandais volant. L'amulette est une médaille de saint Christophe.|厄災の神はさまよえるオランダ人。何があろうと喜望峰を回ると誓い、二度と港に入れてもらえなくなった船です。お守りは聖クリストフォロスのメダイ。",
      ),
    ],
  },
  {
    version: "0.10.0",
    date: "2026-08-07",
    title: t(
      "A new departure board|Un nuevo tablero de salidas|Un nouveau tableau des départs|入口をつくり直しました",
    ),
    highlights: [
      t(
        "The first screen now has a train on it. It runs along a dawn ridge, and the golden track ahead of the locomotive is still being laid — the journey you are about to choose.|La primera pantalla tiene ahora un tren que corre al amanecer, con la vía dorada aún tendiéndose por delante.|Le premier écran a maintenant un train qui roule à l'aube, la voie dorée devant lui restant à poser.|最初の画面に汽車が走るようになりました。夜明けの丘を行き、機関車の前には金色の線路がこれから敷かれていきます。これから選ぶ旅です。",
      ),
      t(
        "Choosing a country is now a grid of maps instead of a long list, so you can see every board at once.|Elegir país es ahora una cuadrícula de mapas en vez de una lista larga: se ven todos los tableros a la vez.|Le choix du pays est désormais une grille de cartes plutôt qu'une longue liste : tous les plateaux d'un coup d'œil.|国選びが縦長の一覧から地図のグリッドになり、どの盤面も一目で見渡せます。",
      ),
      t(
        "The settings are sorted into who is riding and the house rules, and the empty fourth seat is hidden until you ask for it. Three travellers and one tap is enough to leave.|Los ajustes se agrupan en quién viaja y las reglas; el cuarto asiento vacío se oculta. Basta un toque para salir.|Les réglages sont regroupés en qui voyage et les règles ; le quatrième siège vide reste caché. Un seul geste suffit pour partir.|設定を「だれが乗る?」と「ルール」に分け、空いている4人目の席は必要になるまで出しません。3人のまま、ひと押しで出発できます。",
      ),
      t(
        "If you prefer things to hold still, the train stops when your device asks for reduced motion.|Si prefieres que nada se mueva, el tren se detiene cuando el dispositivo pide menos movimiento.|Si vous préférez l'immobilité, le train s'arrête lorsque l'appareil demande moins d'animations.|動きが少ないほうがよい設定にしている場合は、汽車も止まります。",
      ),
    ],
  },
  {
    version: "0.9.0",
    date: "2026-08-07",
    title: t("France joins the map|Francia se suma al mapa|La France rejoint la carte|フランスが加わりました"),
    highlights: [
      t(
        "A fourth country: France, with 50 towns from Lille to Ajaccio, a sea crossing to Corsica, 40 new questions and 16 things that can happen to you on the road.|Un cuarto país: Francia, con 50 ciudades de Lille a Ajaccio, travesía a Córcega, 40 preguntas y 16 sucesos.|Un quatrième pays : la France, 50 villes de Lille à Ajaccio, une traversée vers la Corse, 40 questions et 16 événements.|4か国目としてフランスを追加しました。リールからアジャクシオまで50都市、コルシカへの航路、新作クイズ40問、道中で起きる出来事16件。",
      ),
      t(
        "The misfortune spirit here is the Ankou of Brittany — not death itself but death's servant, who in the old tales collects souls in a cart. The charm that wards him off is a blessed sprig of box, handed out on Palm Sunday where no palm will grow.|El espíritu de la desgracia es el Ankou bretón, el sirviente de la muerte. El amuleto es una rama de boj bendecida.|L'esprit du malheur est l'Ankou breton, non la mort mais son serviteur. L'amulette est un rameau de buis béni.|厄災の神はブルターニュのアンクー。死そのものではなく「死の下働き」で、荷車で魂を迎えに行くと伝わります。お守りは祝別された黄楊の枝 — 棕櫚が育たない土地で、枝の主日に配られるものです。",
      ),
      t(
        "In August the whole country goes on holiday: Paris earns less, the Mediterranean earns far more, and even the misfortune spirit takes the month off.|En agosto el país entero se va de vacaciones: París gana menos, el Mediterráneo mucho más, y hasta el espíritu descansa.|En août, tout le pays part en vacances : Paris gagne moins, la Méditerranée bien plus, et même l'esprit du malheur prend congé.|8月は国じゅうがヴァカンスに出ます。パリの実入りは減り、地中海は大きく増え、厄災の神まで休みます。",
      ),
    ],
  },
  {
    version: "0.8.0",
    date: "2026-08-07",
    title: t("The towns come alive|Los pueblos cobran vida|Les villes s'animent|町が動き出しました"),
    highlights: [
      t(
        "Every town illustration now moves. Waves roll into the harbours, steam rises from the hot springs, snow falls on the northern towns, city windows flicker, and condors glide over the valleys — 43 scenes in all.|Todas las ilustraciones de ciudad se mueven ahora: olas, vapor, nieve, ventanas que parpadean y cóndores. 43 escenas.|Toutes les illustrations de ville s'animent : vagues, vapeur, neige, fenêtres qui clignotent et condors. 43 scènes.|都市のイラストがすべて動くようになりました。港には波が寄せ、温泉からは湯気が立ち、北国には雪が降り、街の窓は明滅し、谷をコンドルが滑空します。全43種類。",
      ),
      t(
        "The original artwork is untouched — the movement is a thin layer laid over it, so the pictures you knew are still there.|El arte original no se ha tocado: el movimiento es una capa fina sobre él.|Les illustrations d'origine sont intactes : le mouvement est une fine couche posée par-dessus.|元の絵はそのままです。動きは上に重ねた薄い層なので、これまでの絵はそのまま残っています。",
      ),
    ],
  },
  {
    version: "0.7.0",
    date: "2026-08-07",
    title: t("The season decides what happens|La estación decide lo que pasa|La saison décide de ce qui arrive|季節によって起きることが変わります"),
    highlights: [
      t(
        "What happens on a blue or red square now depends on the month as well as the region. Drift ice only strands you in winter, the salmon run only pays in autumn, and cherry-blossom work only comes up in April.|Lo que ocurre en una casilla azul o roja depende ahora del mes además de la región: el hielo a la deriva solo en invierno, el salmón solo en otoño.|Ce qui arrive sur une case bleue ou rouge dépend désormais du mois autant que de la région : la banquise en hiver seulement, le saumon en automne.|青マス・赤マスで起きることが、地方だけでなく月にも左右されるようになりました。流氷で足止めされるのは冬だけ、鮭の水揚げで稼げるのは秋だけ、花見の場所取りは4月だけです。",
      ),
      t(
        "On the Sea of Japan side, winter now brings more misfortune than good luck — buried tracks and roof-clearing bills — while summer stays even.|En el lado del mar del Japón, el invierno trae ahora más desgracias que suertes; el verano se mantiene equilibrado.|Côté mer du Japon, l'hiver apporte désormais plus de malchance que de chance ; l'été reste équilibré.|日本海側の冬は、線路の埋没や雪下ろしの出費で、良いことより悪いことが多くなりました。夏は均衡したままです。",
      ),
    ],
  },
  {
    version: "0.6.2",
    date: "2026-08-07",
    title: t("Everything has a scene now|Todo tiene su escena|Chaque moment a sa scène|どの場面にも絵がつきました"),
    highlights: [
      t(
        "Departing, and answering a quiz, now have their own scene: a train pulling out at dawn with someone waving it off, and a circle or cross drawn on screen.|La salida y las respuestas del quiz tienen ahora su escena propia.|Le départ et les réponses au quiz ont désormais leur propre scène.|出発とクイズの正誤にも絵が付きました。夜明けの駅を列車が走り出し、見送る人が手を振ります。正誤は丸やバツが描かれます。",
      ),
      t(
        "When the misfortune spirit strikes, you now see what actually happened — a typhoon shutting the shops, a landslide taking the stall down the hillside, a hand slipping into your bag on a packed train. 21 scenes in all.|Cuando golpea la desgracia, ahora ves qué ha pasado: un tifón, un derrumbe, una mano en tu bolsa. 21 escenas.|Quand le malheur frappe, on voit désormais ce qui s'est passé : typhon, glissement de terrain, main dans le sac. 21 scènes.|厄災に見舞われたとき、何が起きたのかが絵で見えるようになりました。台風でシャッターが下りる、地滑りで店が流される、満員電車で荷物に手が伸びる、など21種類。",
      ),
    ],
  },
  {
    version: "0.6.0",
    date: "2026-08-07",
    title: t("Things that happen to you|Cosas que te pasan|Ce qui vous arrive|旅で起きること"),
    highlights: [
      t(
        "Blue and red squares are back, but the money no longer moves at random. You get a short story from that region — the drift ice comes early and the ferry is cancelled, a zebra-suited traffic marshal in La Paz returns your dropped bag, a chai seller refuses payment because you are the first customer of the day.|Vuelven las casillas azules y rojas, pero el dinero ya no cambia al azar: ocurre algo propio de esa región.|Les cases bleues et rouges reviennent, mais l'argent ne bouge plus au hasard : il vous arrive quelque chose de propre à cette région.|青マス・赤マスが戻りました。ただし金額はもう運任せではなく、その地方で起こりそうな出来事が起きます。流氷が早く来て船が欠航する、ラパスでシマウマ姿の交通整理に落とし物を拾ってもらう、初商いの客だからとチャイ代を取ってもらえない、など。",
      ),
      t(
        "Everything now moves. 49 events, 36 monthly seasons, the arrival at your destination and the prize-giving all have their own short animation.|Ahora todo se mueve: 49 sucesos, 36 meses, la llegada al destino y la entrega de premios tienen su propia animación.|Tout s'anime : 49 événements, 36 mois, l'arrivée à destination et la remise des prix ont chacun leur animation.|絵が動くようになりました。出来事49件、月ごとの季節36件、目的地への到着、表彰式に、それぞれ専用のアニメーションが付きます。",
      ),
      t(
        "The game now ends with a prize-giving. Awards like Quiz Master and Great Traveller are revealed one at a time, so nobody knows who won until the very last card.|La partida termina con una entrega de premios que se revelan de uno en uno: nadie sabe quién ha ganado hasta el final.|La partie s'achève par une remise des prix dévoilés un à un : nul ne sait qui a gagné avant la toute fin.|ゲームの終わりに表彰式が入りました。クイズ王・旅の達人などの賞を1つずつめくっていくので、最後の1枚まで誰が勝ったか分かりません。",
      ),
      t(
        "Rail lines now run only up, across or at 45°, which makes the board far easier to read.|Las vías van solo en vertical, horizontal o a 45°, lo que hace el tablero mucho más legible.|Les voies ne suivent que la verticale, l'horizontale ou 45°, ce qui rend le plateau bien plus lisible.|線路が縦・横・45度の3方向だけになり、盤面がぐっと見やすくなりました。",
      ),
      t(
        "You can now change language from inside a pop-up, so you can re-read a story in your own language.|Ahora puedes cambiar de idioma dentro de una ventana para releer en tu lengua.|Tu peux changer de langue depuis une fenêtre pour relire dans ta langue.|モーダルの中でも言語を切り替えられます。読み物を自分の言語で読み直せます。",
      ),
      t(
        "The dice roll stays on screen while you choose where to stop, and the dice now land with a thump and a puff of dust.|El resultado del dado permanece mientras eliges dónde parar, y los dados caen con polvo.|Le résultat du dé reste affiché pendant que tu choisis, et les dés atterrissent dans un nuage de poussière.|行き先を選んでいるあいだ出目が残るようになり、サイコロは砂ぼこりを上げて着地します。",
      ),
      t(
        "Item prices were rebalanced — no item is a guaranteed profit any more.|Se han reequilibrado los precios: ningún objeto da ya beneficio garantizado.|Les prix des objets ont été rééquilibrés : aucun n'est plus un profit garanti.|アイテムの値段を見直しました。買うだけで確実に得をするアイテムは無くなりました。",
      ),
      t(
        "Map fixes: Honshū, Shikoku and Kyūshū are separate islands again, and every town now sits on land.|Correcciones del mapa: Honshū, Shikoku y Kyūshū vuelven a ser islas separadas y todas las ciudades están en tierra firme.|Corrections de carte : Honshū, Shikoku et Kyūshū sont de nouveau séparées, et chaque ville est sur la terre ferme.|地図の修正: 本州・四国・九州が再びそれぞれの島になり、すべての町が陸の上に乗りました。",
      ),
    ],
  },
  {
    version: "0.5.0",
    date: "2026-08-06",
    title: t("Japan, town by town|Japón, pueblo a pueblo|Le Japon, ville par ville|町の単位で見る日本"),
    highlights: [
      t(
        "Japan now has 151 towns instead of 74. Alongside the prefectural capitals you can now stop at Tsukuba, Ōarai, Hiraizumi, Ginzan Onsen, Shirakawa-gō, Kamikōchi, Uji, Miyajima, Naoshima, Dazaifu, Aso, Chiran and many more.|Japón pasa de 74 a 151 ciudades. Junto a las capitales ahora puedes parar en Tsukuba, Ōarai, Hiraizumi, Shirakawa-gō, Uji, Miyajima, Naoshima, Dazaifu, Aso y muchas más.|Le Japon passe de 74 à 151 villes. Outre les préfectures, on s'arrête désormais à Tsukuba, Ōarai, Hiraizumi, Shirakawa-gō, Uji, Miyajima, Naoshima, Dazaifu, Aso et bien d'autres.|日本の都市が74から151になりました。県庁所在地に加えて、つくば・大洗・平泉・銀山温泉・白川郷・上高地・宇治・宮島・直島・太宰府・阿蘇・知覧などに立ち寄れます。",
      ),
      t(
        "Each new town has its own story to read when you land there — why the roofs are that steep, why the gods gather there in October, why the town refused to modernise.|Cada nueva ciudad trae su historia al llegar: por qué los tejados son tan inclinados, por qué los dioses se reúnen allí en octubre.|Chaque nouvelle ville a son histoire à lire en y arrivant : pourquoi les toits sont si pentus, pourquoi les dieux s'y réunissent en octobre.|新しい町にはそれぞれ読みものが付いています。なぜ屋根がこれほど急なのか、なぜ十月に神々が集まるのか、なぜ近代化を拒んだのか。",
      ),
      t(
        "The board was widened to match, so the extra towns have room to breathe rather than piling on top of each other.|El tablero se ha ampliado para que las nuevas ciudades tengan espacio y no se amontonen.|Le plateau a été élargi pour que les nouvelles villes respirent au lieu de s'empiler.|盤面もそのぶん広げたので、増えた町が重なり合わずに収まります。",
      ),
      t(
        "The far south-west islands — Ishigaki, Taketomi and Yonaguni — were being drawn off the edge of the board and are now on it.|Las islas del suroeste — Ishigaki, Taketomi y Yonaguni — se dibujaban fuera del tablero y ahora aparecen en él.|Les îles du sud-ouest — Ishigaki, Taketomi et Yonaguni — étaient dessinées hors du plateau ; elles y figurent désormais.|先島諸島(石垣島・竹富島・与那国島)が盤面の外に描かれていたのを直しました。",
      ),
    ],
  },
  {
    version: "0.4.0",
    date: "2026-08-06",
    title: t("India, and a board you can see|India, y un tablero que se ve entero|L'Inde, et un plateau entièrement visible|インドと、全体が見える盤面"),
    highlights: [
      t(
        "A third country: India, with 60 towns from Leh to Kanyakumari, sea routes to the Andaman and Lakshadweep islands, and 42 new questions.|Un tercer país: la India, con 60 ciudades de Leh a Kanyakumari, rutas marítimas a Andamán y Lakshadweep, y 42 preguntas nuevas.|Un troisième pays : l'Inde, 60 villes de Leh à Kanyakumari, des routes maritimes vers Andaman et Lakshadweep, et 42 nouvelles questions.|3か国目としてインドを追加しました。レーからカニヤークマリまで60都市、アンダマン諸島やラクシャドウィープ諸島への航路、新作クイズ42問。",
      ),
      t(
        "Japan gained 13 island towns reached by sea — from Izu Ōshima and Sado to Amami, Yakushima and Ishigaki — plus 10 more towns in Hokkaidō.|Japón suma 13 ciudades isleñas a las que se llega por mar — de Izu Ōshima y Sado a Amami, Yakushima e Ishigaki — y 10 ciudades más en Hokkaidō.|Le Japon gagne 13 villes insulaires desservies par bateau — d'Izu Ōshima et Sado à Amami, Yakushima et Ishigaki — et 10 villes de plus à Hokkaidō.|日本に、船で渡る島の町を13件(伊豆大島・佐渡から奄美・屋久島・石垣島まで)、北海道に10件を追加しました。",
      ),
      t(
        "Your piece is now a locomotive instead of a dot, so you can find yourself on a crowded map.|Tu ficha es ahora una locomotora en vez de un punto, para encontrarte en un mapa lleno.|Ton pion est désormais une locomotive plutôt qu'un point, pour te repérer sur une carte chargée.|自分の駒が丸から機関車になりました。マーカーの多い地図でも自分の位置が分かります。",
      ),
      t(
        "Items that roll two or three dice now show every die and the total, so the number you see always matches the squares you move.|Los objetos que lanzan dos o tres dados muestran todos los dados y el total: el número que ves coincide con las casillas que avanzas.|Les objets lançant deux ou trois dés les affichent tous avec le total : le nombre affiché correspond aux cases parcourues.|サイコロを2〜3個振るアイテムで、振った数と合計をそのまま表示するようにしました。見えている数と進むマス数が一致します。",
      ),
      t(
        "When a rival answers a question, only the result is shown — the question and answer stay hidden so they are not spoiled for you.|Cuando un rival responde, solo se muestra el resultado: la pregunta y la respuesta quedan ocultas para no destriparlas.|Quand un rival répond, seul le résultat s'affiche : la question et la réponse restent masquées.|CPUがクイズに答えたときは正誤だけを表示し、問題と解説は伏せるようにしました(答えを先に知ってしまわないように)。",
      ),
      t(
        "The whole map now fits in the window, and turning on \"whole map\" really shows all of it.|El mapa entero cabe en la ventana y «mapa completo» muestra de verdad todo el tablero.|La carte entière tient dans la fenêtre, et « carte entière » montre vraiment tout le plateau.|地図全体が画面に収まるようになり、「全体表示」で盤面の端まで見えるようになりました。",
      ),
      t(
        "If your system asks for reduced motion, the dice now settle at once instead of tumbling.|Si tu sistema pide menos movimiento, los dados se posan al instante en vez de rodar.|Si votre système demande moins d'animations, les dés se posent aussitôt au lieu de rouler.|OSの「視差効果を減らす」設定が有効なときは、サイコロが転がる演出を省いてすぐ結果を出します。",
      ),
    ],
  },
  {
    version: "0.3.0",
    date: "2026-08-06",
    title: t("Learning, properly|Aprender de verdad|Vraiment apprendre|ちゃんと学べるように"),
    highlights: [
      t(
        "Answering a quiz now always shows the correct answer and the explanation — even when you get it right.|Al responder ahora siempre se muestra la respuesta correcta y la explicación, incluso si aciertas.|Après chaque question, la bonne réponse et l'explication s'affichent — même en cas de réussite.|クイズに答えると、正解と解説が必ず表示されるようになりました(正解したときも)。",
      ),
      t(
        "At the end of the journey you get a review of every question the table got wrong.|Al final del viaje verás un repaso de todas las preguntas falladas en la mesa.|En fin de voyage, un récapitulatif de toutes les questions ratées à la table.|旅の終わりに、その卓で間違えた問題をおさらいできるようになりました。",
      ),
      t(
        "Questions no longer repeat until the whole set has been used.|Las preguntas ya no se repiten hasta agotar el conjunto.|Les questions ne se répètent plus avant d'avoir toutes été posées.|同じ問題が続けて出ないようになりました(ひと通り出るまで重複しません)。",
      ),
      t(
        "Each player can now say how well they know the country. Newcomers get two choices instead of three and bigger rewards; locals earn less and risk more.|Cada jugador indica cuánto conoce el país: quien es nuevo elige entre dos opciones y gana más; quien lo conoce bien gana menos y arriesga más.|Chaque joueur indique s'il connaît le pays : les novices ont deux choix et gagnent plus, les connaisseurs gagnent moins et risquent plus.|プレイヤーごとに「この国をどれくらい知っているか」を選べます。はじめての人は3択が2択になり賞金も多め、くわしい人は賞金が控えめで損失は重めになります。",
      ),
      t(
        "Lucky charms now absorb the loss instead of turning a wrong answer into a right one, so you always know when you missed.|Los amuletos ahora absorben la pérdida en vez de convertir un fallo en acierto, así siempre sabes si fallaste.|Les amulettes absorbent désormais la perte au lieu de transformer une erreur en réussite : tu sais toujours quand tu t'es trompé.|お守りは「不正解を正解に変える」のをやめ、損失を肩代わりするだけになりました。自分が間違えたことが分かるようになります。",
      ),
    ],
  },
  {
    version: "0.2.0",
    date: "2026-08-06",
    title: t("A bigger board and livelier rivals|Un tablero mayor y rivales más vivos|Un plateau plus grand, des rivaux plus vivants|広い盤面と、動きの見える対戦相手"),
    highlights: [
      t(
        "Japan now has at least one town in every prefecture (30 → 52), including Mito, Kawagoe, Hikone, Kōyasan and Hagi.|Japón tiene ahora al menos una ciudad por prefectura (30 → 52), incluidas Mito, Kawagoe, Hikone, Kōyasan y Hagi.|Le Japon compte désormais au moins une ville par préfecture (30 → 52), dont Mito, Kawagoe, Hikone, Kōyasan et Hagi.|日本の都市が全47都道府県をカバーしました(30→52都市)。水戸・川越・彦根・高野山・萩などを追加。",
      ),
      t(
        "The maps were redrawn to follow the real coastlines and borders more closely.|Los mapas se han redibujado siguiendo mejor las costas y fronteras reales.|Les cartes ont été redessinées pour suivre de plus près les côtes et frontières réelles.|地図の形を実際の海岸線・国境に近づけました。",
      ),
      t(
        "You can drag the map to look around and zoom with the wheel. Town names no longer overlap.|Puedes arrastrar el mapa y hacer zoom con la rueda. Los nombres ya no se solapan.|Tu peux faire glisser la carte et zoomer à la molette. Les noms ne se chevauchent plus.|地図をドラッグで動かせるようになり、ホイールで拡大縮小もできます。都市名が重ならなくなりました。",
      ),
      t(
        "On the rivals' turns you now see the dice roll, the move, and exactly what they bought.|En los turnos de los rivales verás la tirada, el movimiento y qué compraron exactamente.|Pendant le tour des rivaux, tu vois le lancer, le déplacement et ce qu'ils ont acheté.|CPUの手番でも、サイコロ・移動・何を買ったのかが見えるようになりました。",
      ),
      t(
        "The language can be changed during a game, and the travel log is translated too.|Se puede cambiar el idioma durante la partida, y el registro también se traduce.|La langue peut être changée en cours de partie, et le journal est aussi traduit.|ゲーム中でも言語を切り替えられるようになりました。旅の記録も翻訳されます。",
      ),
      t(
        "Money is shown in each country's currency (Bs 1,200 / ¥120,000).|El dinero se muestra en la moneda de cada país (Bs 1.200 / ¥120 000).|L'argent s'affiche dans la monnaie du pays (Bs 1 200 / ¥120 000).|金額が国ごとの通貨表記になりました(Bs 1,200 / ¥120,000)。",
      ),
    ],
  },
  {
    version: "0.1.0",
    date: "2026-08-05",
    title: t("First journey|Primer viaje|Premier voyage|最初の旅"),
    highlights: [
      t(
        "Two countries to travel — Bolivia and Japan — in four languages.|Dos países para viajar — Bolivia y Japón — en cuatro idiomas.|Deux pays à parcourir — Bolivie et Japon — en quatre langues.|ボリビアと日本の2ヶ国を、4言語で旅できます。",
      ),
      t(
        "Music that changes with the region, sound effects, and a rolling 3D die.|Música que cambia según la región, efectos de sonido y un dado 3D.|Une musique qui change selon la région, des effets sonores et un dé 3D.|地方によって変わる音楽、効果音、3Dのサイコロ。",
      ),
      t(
        "Towns tell their story and sell businesses; buy every business in a town to double its income.|Los pueblos cuentan su historia y venden negocios; cómpralos todos para duplicar la renta.|Les villes racontent leur histoire et vendent des affaires ; achète-les toutes pour doubler le revenu.|町では解説を読み、物件を買えます。町の物件を全部買うと収入が2倍に。",
      ),
      t(
        "Your journey is saved in this browser, so you can continue later.|Tu viaje se guarda en este navegador para continuar más tarde.|Ton voyage est enregistré dans ce navigateur pour reprendre plus tard.|旅はブラウザに保存され、あとから続きから遊べます。",
      ),
    ],
  },
];

/** ビルド時に埋め込まれたバージョン(`next.config.ts` 参照)。 */
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
/** ビルド時のコミット(Vercel以外では空)。 */
export const APP_COMMIT = process.env.NEXT_PUBLIC_APP_COMMIT ?? "";
