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
    version: "0.40.0",
    date: "2026-08-13",
    title: t(
      "Five more boards: Brazil, Venezuela, Australia, Canada, Ukraine|Cinco tableros más: Brasil, Venezuela, Australia, Canadá y Ucrania|Cinq plateaux de plus : Brésil, Venezuela, Australie, Canada, Ukraine|盤面が5枚ふえました。ブラジル・ベネズエラ・オーストラリア・カナダ・ウクライナ",
    ),
    highlights: [
      t(
        "Twenty-four boards now, with one thousand and eighty-three towns and nine hundred and thirty-four questions. Ride the Indian Pacific across the Nullarbor, follow the line the Canadian Pacific was built to make a country, cross Brazil where the railways mostly went quiet, take the ferry to Margarita Island, and travel a Ukraine that keeps its timetable.|Ya son veinticuatro tableros, con mil ochenta y tres pueblos y novecientas treinta y cuatro preguntas. Cruza el Nullarbor en el Indian Pacific, sigue la línea que el Canadian Pacific tendió para hacer un país, recorre un Brasil donde los trenes casi callaron, toma el ferry a la isla Margarita y viaja por una Ucrania que mantiene su horario.|Vingt-quatre plateaux désormais, mille quatre-vingt-trois villes et neuf cent trente-quatre questions. Traverse le Nullarbor à bord de l'Indian Pacific, suis la ligne que le Canadien Pacifique a posée pour faire un pays, parcours un Brésil où les trains se sont tus, prends le bac pour l'île de Margarita, et voyage dans une Ukraine qui tient son horaire.|24枚になりました。1083の町と934問です。ナラボー平原を横切るインディアン・パシフィック号、国をつくるために敷かれたカナディアン・パシフィック鉄道、鉄道がほとんど黙ってしまったブラジル、マルガリータ島への渡し船、そして時刻表を守り続けるウクライナの鉄道。",
      ),
      t(
        "Each board keeps its own money, music, items, spirit of misfortune, and twelve months of weather and festivals. Venezuela prices its property in US dollars, because that is how homes there are actually bought. Ukraine's board leaves the occupied and shelled towns off the route, and draws Crimea as the land it is recognised to be.|Cada tablero conserva su dinero, su música, sus objetos, su espíritu de la desgracia y sus doce meses. Venezuela pone precio a sus inmuebles en dólares, porque así se compran allí las casas. El tablero de Ucrania deja fuera del recorrido los pueblos ocupados y bombardeados, y dibuja Crimea como el territorio que se le reconoce.|Chaque plateau garde sa monnaie, sa musique, ses objets, son esprit du malheur et ses douze mois. Le Venezuela affiche ses biens en dollars, car c'est ainsi qu'on y achète une maison. Le plateau ukrainien laisse hors du parcours les villes occupées et bombardées, et dessine la Crimée comme le territoire qu'on lui reconnaît.|盤面ごとにお金・音楽・アイテム・厄災の神・12ヶ月の気候と祭りを持っています。ベネズエラの物件は米ドル建てです。実際にそうやって家が売り買いされているからです。ウクライナの盤面は、占領されている町と砲撃の続く町を止まりマスにしていません。クリミアは国際的に認められたとおりの陸地として描いています。",
      ),
      t(
        "Twenty city backgrounds that had a see-through gap between sky and ground — most of them in Indonesia — have been repaired.|Se han reparado veinte fondos de ciudad que dejaban ver un hueco entre el cielo y el suelo, la mayoría en Indonesia.|Vingt décors de ville laissaient voir un vide entre le ciel et le sol — surtout en Indonésie — et ont été réparés.|都市の背景20枚で、空と地面のあいだが透けていたのを直しました(多くはインドネシアの町です)。",
      ),
    ],
  },
  {
    version: "0.39.0",
    date: "2026-08-13",
    title: t(
      "Pick a region, then a board|Elige una región y luego un tablero|Choisis une région, puis un plateau|大陸をえらんでから、行き先をえらぶ",
    ),
    highlights: [
      t(
        "The map now asks for a region first. Tap Asia, Europe, Africa or the Americas and the map moves in, writing each board's name across its own country — tap the name to ride there. With nineteen boards on one world map the marks were closer together than a fingertip; a region at a time leaves room to read them.|El mapa pide primero una región. Toca Asia, Europa, África o América y el mapa se acerca, escribiendo el nombre de cada tablero sobre su país: toca el nombre para viajar allí. Con diecinueve tableros en un solo mapamundi las marcas quedaban más juntas que un dedo; de región en región hay sitio para leerlas.|La carte demande d'abord une région. Touche l'Asie, l'Europe, l'Afrique ou les Amériques et la carte s'approche, en inscrivant le nom de chaque plateau sur son pays — touche le nom pour y partir. Avec dix-neuf plateaux sur une seule carte du monde, les marques étaient plus serrées qu'un doigt ; une région à la fois laisse la place de les lire.|地図はまず大陸をたずねます。アジア・ヨーロッパ・アフリカ・アメリカ大陸のどれかを押すと地図がそこへ寄り、それぞれの盤面の名前がその国の上に書かれます。名前を押すとその盤面へ。19枚を1枚の世界地図に載せると、印の間隔が指より狭くなっていました。大陸ごとなら名前を読む余地があります。",
      ),
      t(
        "Boards that live inside another board now have their own step. Tapping Japan moves in to Japan's own map, where Japan and Ibaraki sit side by side — the same for Indonesia and Bali. Around the World keeps its button under the map, because a whole planet cannot be pointed at with one mark.|Los tableros que viven dentro de otro tienen ahora su propio paso. Al tocar Japón se entra en el mapa de Japón, donde Japón e Ibaraki aparecen juntos; lo mismo con Indonesia y Bali. La vuelta al mundo conserva su botón bajo el mapa, porque un planeta entero no se señala con una sola marca.|Les plateaux contenus dans un autre ont désormais leur propre étape. Toucher le Japon ouvre la carte du Japon, où le Japon et Ibaraki figurent côte à côte — de même pour l'Indonésie et Bali. Le tour du monde garde son bouton sous la carte : on ne montre pas une planète entière d'un seul point.|中に入っている盤面には、もう一段が付きました。日本を押すと日本自身の地図へ寄り、日本と茨城県が並びます。インドネシアとバリ島も同じです。世界一周は1点で指せないので、これまでどおり地図の下のボタンのままです。",
      ),
    ],
  },
  {
    version: "0.38.0",
    date: "2026-08-13",
    title: t(
      "Pick your board from the world map|Elige tu tablero en el mapamundi|Choisis ton plateau sur la carte du monde|行き先を世界地図から選べます",
    ),
    highlights: [
      t(
        "The board list is now a world map. Every board sits where it belongs, so you can see that Bali is a dot beside Java and that Russia stretches across a third of the map. Tap a mark to choose it; the whole-world board has its own button under the map.|La lista de tableros es ahora un mapamundi. Cada tablero está donde le corresponde, así que se ve que Bali es un punto junto a Java y que Rusia ocupa un tercio del mapa. Toca una marca para elegirla; el tablero de la vuelta al mundo tiene su botón bajo el mapa.|La liste des plateaux est devenue une carte du monde. Chaque plateau est à sa place : on voit que Bali n'est qu'un point à côté de Java et que la Russie occupe un tiers de la carte. Touche une marque pour la choisir ; le tour du monde a son propre bouton sous la carte.|盤面の一覧が世界地図になりました。それぞれの盤面が本当の場所に置かれているので、バリがジャワの隣の点でしかないことも、ロシアが地図の3分の1に伸びていることも見て分かります。印を押すと選べます。世界一周は1点で指せないので、地図の下のボタンにしました。",
      ),
      t(
        "Marks that would overlap are nudged apart, with a thin line back to the true spot. Filter by region and the names appear beside each mark. On a phone the map is too small to tap accurately, so the card list is used there instead.|Las marcas que se solaparían se separan un poco, con una línea fina hasta su lugar real. Filtra por región y aparecen los nombres junto a cada marca. En el móvil el mapa es demasiado pequeño para acertar, así que allí se usa la lista de fichas.|Les marques qui se chevaucheraient sont écartées, avec un fil vers leur vraie position. Filtre par région et les noms s'affichent à côté de chaque marque. Sur téléphone la carte est trop petite pour viser juste : la liste de cartes y est conservée.|重なってしまう印は少しずらし、本当の位置へ細い線を引いています。地域で絞ると、印の横に名前が出ます。携帯では地図が小さすぎて押し分けられないので、そちらは今までの札の一覧のままです。",
      ),
    ],
  },
  {
    version: "0.37.0",
    date: "2026-08-13",
    title: t(
      "Nineteen boards|Diecinueve tableros|Dix-neuf plateaux|盤面が19枚になりました",
    ),
    highlights: [
      t(
        "Seven new boards join the twelve: Russia along the Trans-Siberian, the United States coast to coast, Indonesia across seventeen thousand islands, Morocco from the Atlantic to the dunes, Ghana from the forts to the northern savanna, Bali on its own, and Malaysia across the South China Sea. Eight hundred and eighty-two towns, one thousand one hundred and twenty-two lines, seven hundred and fifty-six questions.|Siete tableros nuevos se suman a los doce: Rusia por el Transiberiano, Estados Unidos de costa a costa, Indonesia entre diecisiete mil islas, Marruecos del Atlántico a las dunas, Ghana de los fuertes a la sabana, Bali sola y Malasia a ambos lados del mar de China Meridional. Ochocientos ochenta y dos pueblos, mil ciento veintidós líneas, setecientas cincuenta y seis preguntas.|Sept nouveaux plateaux rejoignent les douze : la Russie le long du Transsibérien, les États-Unis d'une côte à l'autre, l'Indonésie parmi dix-sept mille îles, le Maroc de l'Atlantique aux dunes, le Ghana des forts à la savane, Bali seule, et la Malaisie de part et d'autre de la mer de Chine méridionale. Huit cent quatre-vingt-deux villes, mille cent vingt-deux lignes, sept cent cinquante-six questions.|12枚に7枚が加わりました。シベリア鉄道を行くロシア、海から海へ渡るアメリカ、1万7千の島をつなぐインドネシア、大西洋から砂丘までのモロッコ、砦から北のサバンナまでのガーナ、島ひとつのバリ、南シナ海をまたぐマレーシア。882の町、1122の路線、756問。",
      ),
      t(
        "Each board keeps its own money, music, items, spirit of misfortune, and twelve months of weather and festivals. A ferry crosses Lake Volta where the old town lies under the water. The Trans-Siberian runs its real stops. Kete Krachi, Salerno, Purwokerto and Jerada were added because a line was crossing water it should not — and each turned out to have a story worth the stop.|Cada tablero conserva su dinero, su música, sus objetos, su espíritu de la desgracia y sus doce meses. Un transbordador cruza el lago Volta, donde el pueblo viejo yace bajo el agua. El Transiberiano sigue sus paradas reales. Kete Krachi, Salerno, Purwokerto y Jerada se añadieron porque una línea cruzaba agua que no debía, y todas resultaron merecer la parada.|Chaque plateau garde sa monnaie, sa musique, ses objets, son esprit du malheur et ses douze mois. Un bac traverse le lac Volta, où l'ancienne ville repose sous l'eau. Le Transsibérien suit ses arrêts réels. Kete Krachi, Salerne, Purwokerto et Jerada ont été ajoutées parce qu'une ligne traversait de l'eau à tort — et chacune méritait l'arrêt.|盤面ごとにお金・音楽・アイテム・厄災の神・12ヶ月の気候と祭りを持っています。ボルタ湖には渡し船が通り、その湖底には旧市街が沈んでいます。シベリア鉄道は実在の停車順で走ります。ケテ・クラチ、サレルノ、プルウォクルト、ジェラダは「線が通ってはいけない水の上を通っていた」ために足した町ですが、どれも降りる価値のある話を持っていました。",
      ),
    ],
  },
  {
    version: "0.36.0",
    date: "2026-08-12",
    title: t(
      "The game is now called World Express|El juego se llama ahora World Express|Le jeu s'appelle désormais World Express|ゲームの名前を World Express にしました",
    ),
    highlights: [
      t(
        "It began on the Bolivian altiplano and carried that name for a while. There are twelve boards now, on five continents, and the old name only described the first one. The new name says what the game is.|Empezó en el altiplano boliviano y llevó ese nombre un tiempo. Ahora hay doce tableros en cinco continentes, y el nombre antiguo solo describía el primero. El nuevo dice lo que es el juego.|Le jeu est né sur l'altiplano bolivien et en a longtemps porté le nom. Il compte aujourd'hui douze plateaux sur cinq continents, et l'ancien nom ne décrivait que le premier. Le nouveau dit ce qu'est le jeu.|このゲームはボリビアのアルティプラーノで生まれ、しばらくその名前で来ました。いまは5つの大陸に12の盤面があり、古い名前は最初の1枚しか表していません。新しい名前は、このゲームが何なのかを言っています。",
      ),
    ],
  },
  {
    version: "0.35.0",
    date: "2026-08-12",
    title: t(
      "Five more boards: Turkey, Germany, China, the United Kingdom and Italy|Cinco tableros más: Turquía, Alemania, China, el Reino Unido e Italia|Cinq plateaux de plus : Turquie, Allemagne, Chine, Royaume-Uni et Italie|盤面が5つ増えました。トルコ・ドイツ・中国・イギリス・イタリア",
    ),
    highlights: [
      t(
        "Two hundred and twenty-six towns, joined by two hundred and ninety-eight lines, with two hundred and thirteen new questions between them. Istanbul to Kars on the eastern express, Beijing to Lhasa on the line that climbs the plateau, Sylt and Rügen by the causeways the trains actually cross, Holyhead to Belfast by ferry, and ships from Naples and Genoa to Sicily and Sardinia.|Doscientos veintiséis pueblos unidos por doscientas noventa y ocho líneas, con doscientas trece preguntas nuevas. De Estambul a Kars en el expreso de oriente, de Pekín a Lhasa por la línea que sube a la meseta, a Sylt y Rügen por los diques que cruzan los trenes de verdad, de Holyhead a Belfast en ferry, y barcos desde Nápoles y Génova a Sicilia y Cerdeña.|Deux cent vingt-six villes reliées par deux cent quatre-vingt-dix-huit lignes, avec deux cent treize nouvelles questions. D'Istanbul à Kars par l'express de l'est, de Pékin à Lhassa par la ligne qui grimpe sur le plateau, vers Sylt et Rügen par les digues que les trains empruntent vraiment, de Holyhead à Belfast en ferry, et des navires de Naples et Gênes vers la Sicile et la Sardaigne.|226の町を298本の路線でつなぎ、クイズは213問増えました。イスタンブールからカルスへ東方急行の筋で、北京からラサへ高原を登る線で、ジュルト島とリューゲン島へは列車が実際に渡る堤防で、ホーリーヘッドからベルファストへは船で。ナポリとジェノヴァからはシチリアとサルデーニャへ渡ります。",
      ),
      t(
        "Each board keeps its own music, its own nine items, its own spirit of misfortune and its own twelve months of weather and festivals — Chungcheong takes the slowest tempo in Korea, the Karakoncolos walks the cold nights of February in Turkey, and the Monacello of Naples pays you back in treasure if you steal his red cap.|Cada tablero conserva su música, sus nueve objetos, su propio espíritu de la desgracia y sus doce meses de clima y fiestas: Chungcheong lleva el tempo más lento de Corea, el Karakoncolos recorre las noches frías de febrero en Turquía, y el Monacello de Nápoles te paga con tesoros si le robas el gorro rojo.|Chaque plateau garde sa musique, ses neuf objets, son propre esprit du malheur et ses douze mois de climat et de fêtes : le Chungcheong prend le tempo le plus lent de Corée, le Karakoncolos parcourt les nuits froides de février en Turquie, et le Monacello de Naples vous paie en trésors si vous lui volez son bonnet rouge.|盤面ごとに音楽・9つのアイテム・厄災の神・12ヶ月の気候と祭りを持っています。韓国では忠清道がいちばんゆっくりした調子で鳴り、トルコでは2月の寒い夜をカラコンジョロスが歩き、ナポリのモナチェッロは赤い帽子を盗まれると財宝で償います。",
      ),
      t(
        "Where a map cuts a name off at the edge of the board, the name now moves to where it fits — Kashgar had been showing as “ashgar”, and Çeşme as “eşme”.|Cuando un mapa cortaba un nombre en el borde del tablero, el nombre se desplaza ahora a donde cabe: Kashgar aparecía como «ashgar» y Çeşme como «eşme».|Lorsqu'une carte coupait un nom au bord du plateau, le nom se déplace désormais là où il tient : Kashgar s'affichait « ashgar » et Çeşme « eşme ».|地図の端で名前が切れていたところは、収まる場所へ動くようにしました。カシュガルが「ashgar」、チェシメが「eşme」としか出ていませんでした。",
      ),
    ],
  },
  {
    version: "0.34.0",
    date: "2026-08-12",
    title: t(
      "A new board: Korea|Un tablero nuevo: Corea|Un nouveau plateau : la Corée|新しい盤面「韓国」",
    ),
    highlights: [
      t(
        "Forty towns from Seoul down to Seogwipo, joined by fifty-five lines along the KTX routes, with ships out to Jeju and to Ulleungdo in the East Sea. Thirty-seven questions, nineteen things that can happen when you stop, and music that follows the regional modes rather than the Japanese scales — the slowest tempo of the six regions belongs to Chungcheong, which has a long-standing reputation for taking its time.|Cuarenta pueblos, de Seúl a Seogwipo, unidos por cincuenta y cinco líneas siguiendo el KTX, con barcos a Jeju y a Ulleungdo. Treinta y siete preguntas, diecinueve sucesos y música basada en los modos coreanos; el tempo más lento de las seis regiones es el de Chungcheong, célebre por tomarse su tiempo.|Quarante villes, de Séoul à Seogwipo, reliées par cinquante-cinq lignes suivant le KTX, avec des navires vers Jeju et Ulleungdo. Trente-sept questions, dix-neuf événements et une musique fondée sur les modes coréens ; le tempo le plus lent des six régions est celui du Chungcheong, réputé prendre son temps.|ソウルから西帰浦まで40の町を、KTXの筋に沿った55本の路線でつなぎました。済州島と、東海の欝陵島へは船で渡ります。クイズ37問、止まったときに起こることが19種類。音楽は日本の音階ではなく韓国のトリ(調)を使っています。6つの地方でいちばん遅いのは忠清道です(のんびりしていることで知られる土地柄から)。",
      ),
      t(
        "With more boards to choose from, the picker now filters by region and the cards are smaller, so the travellers and house rules no longer get pushed off the screen. Each card carries a tag for how much ground it covers — a whole world, a country, or somewhere closer in.|Con más tableros donde elegir, el selector filtra por región y las tarjetas son más pequeñas, de modo que los viajeros y las reglas ya no quedan fuera de la pantalla. Cada tarjeta indica cuánto terreno abarca: el mundo entero, un país o algo más cercano.|Avec davantage de plateaux, le sélecteur filtre par région et les vignettes sont plus petites : les voyageurs et les règles ne sont plus repoussés hors de l'écran. Chaque vignette indique l'étendue parcourue — le monde, un pays, ou quelque chose de plus proche.|盤面が増えたので、選ぶところを地域で絞れるようにし、札を小さくしました。旅人と決まりごとが画面の外へ押し出されなくなります。札の肩には、走る広さ(世界・国・地方)を出しています。",
      ),
    ],
  },
  {
    version: "0.33.0",
    date: "2026-08-12",
    title: t(
      "Four ships now sail where ships can sail|Cuatro barcos navegan ahora por donde se puede navegar|Quatre navires empruntent enfin des routes navigables|4本の船が、船の通れるところを通るようになりました",
    ),
    highlights: [
      t(
        "The last of the crossings that ran overland have been re-routed to ports that face the right sea. Marrakesh now sails to Lisbon rather than Barcelona, which had meant crossing Spain; Cairo meets Athens rather than Rome; Singapore meets Kolkata across the Bay of Bengal; and the run up to Dwarka starts from Goa, since no route from Mumbai could get round the Kathiawar peninsula.|Las últimas travesías que iban por tierra se han redirigido a puertos que dan al mar correcto. Marrakech navega ahora a Lisboa y no a Barcelona, lo que suponía cruzar España; El Cairo enlaza con Atenas en vez de Roma; Singapur con Calcuta por el golfo de Bengala; y la subida a Dwarka parte de Goa, porque desde Bombay no había forma de rodear la península de Kathiawar.|Les dernières traversées qui passaient par voie de terre ont été redirigées vers des ports donnant sur la bonne mer. Marrakech rejoint désormais Lisbonne et non Barcelone, ce qui imposait de traverser l'Espagne ; Le Caire rejoint Athènes plutôt que Rome ; Singapour rejoint Calcutta par le golfe du Bengale ; et la remontée vers Dwarka part de Goa, faute de pouvoir contourner la péninsule de Kathiawar depuis Bombay.|陸を走っていた航路の残りを、正しい海に面した港へつなぎ替えました。マラケシュはバルセロナではなくリスボンへ渡ります(バルセロナ発だとスペインを縦断していました)。カイロはローマではなくアテネへ。シンガポールはベンガル湾を越えてカルカッタへ。ドワルカへの船はゴアから出ます。ムンバイからでは、どう引いてもカティアワール半島を横切ってしまうためです。",
      ),
      t(
        "Seven crossings are kept as they are, each with its reason written down: the train under the Tsugaru Strait, the railway down the Malay peninsula, and five long ocean routes that merely graze a cape — real ships pass the same way. They are listed separately from the faults now, so the next person to look does not undo a decision that was already made.|Siete travesías se conservan tal cual, cada una con su motivo anotado: el tren bajo el estrecho de Tsugaru, el ferrocarril de la península malaya y cinco rutas oceánicas largas que apenas rozan un cabo, por donde pasan los barcos de verdad. Ahora figuran aparte de los fallos, para que quien mire después no deshaga una decisión ya tomada.|Sept traversées sont conservées telles quelles, chacune avec sa raison consignée : le train sous le détroit de Tsugaru, la voie ferrée de la péninsule malaise et cinq longues routes océaniques qui ne font qu'effleurer un cap — les vrais navires passent de même. Elles sont désormais listées à part des défauts, pour que le prochain regard ne défasse pas une décision déjà prise.|7本はそのまま残しました。理由も一本ずつ書いてあります。津軽海峡の下を通る列車、マレー半島を下る鉄道、そして岬をかすめるだけの長い航路が5本。実際の船も同じところを通ります。不具合とは別枠で並べてあるので、次に見た人が決着済みの判断をやり直さずに済みます。",
      ),
    ],
  },
  {
    version: "0.32.0",
    date: "2026-08-12",
    title: t(
      "Ships have stopped sailing over land|Los barcos han dejado de navegar por tierra|Les navires ont cessé de naviguer sur la terre ferme|船が陸を走るのをやめました",
    ),
    highlights: [
      t(
        "On the world map, twenty-five shipping lines ran across dry land — one sailed the whole width of Angola, another straight over Spain. Sixteen of them are fixed. Most only needed the bend in the line moved to the other end; two were never sea voyages at all and are now railways, including the run from Kolkata to Bangkok, which had been sailing over Myanmar.|En el mapa mundial, veinticinco líneas marítimas cruzaban tierra firme: una navegaba a lo ancho de Angola, otra por encima de España. Dieciséis están corregidas. A la mayoría le bastó mover el codo de la línea al otro extremo; dos nunca fueron travesías marítimas y ahora son ferrocarriles, como el trayecto de Calcuta a Bangkok, que navegaba sobre Birmania.|Sur la carte du monde, vingt-cinq lignes maritimes traversaient la terre ferme — l'une naviguait sur toute la largeur de l'Angola, une autre par-dessus l'Espagne. Seize sont corrigées. La plupart n'avaient besoin que d'un coude déplacé à l'autre bout ; deux n'étaient pas des traversées maritimes et sont devenues des voies ferrées, dont Calcutta–Bangkok, qui naviguait au-dessus de la Birmanie.|世界地図で、25本の航路が陸の上を走っていました。1本はアンゴラを丸ごと横断し、別の1本はスペインを突っ切っていました。16本を直しました。多くは線の折れ方を反対側に移すだけで済み、2本はそもそも航路ではなかったので鉄道にしました。カルカッタ—バンコクはミャンマーの上を航行していたものです。",
      ),
      t(
        "Japan and India had the same trouble in the other direction, with lines drawn out to sea. Those are fixed too. A few crossings are left alone on purpose: the train between Hakodate and Aomori really does run under the strait, and the line down the Malay peninsula really is a railway — there the coastline is what is coarse, not the route.|Japón y la India tenían el problema inverso, con líneas trazadas mar adentro. También están corregidas. Algunos cruces se dejan a propósito: el tren entre Hakodate y Aomori pasa de verdad bajo el estrecho, y la línea de la península malaya es un ferrocarril real; ahí lo impreciso es la costa, no la ruta.|Le Japon et l'Inde avaient le problème inverse, avec des lignes tracées en pleine mer. Elles sont corrigées aussi. Quelques traversées sont laissées telles quelles à dessein : le train entre Hakodate et Aomori passe bel et bien sous le détroit, et la ligne de la péninsule malaise est un vrai chemin de fer — c'est le littoral qui est grossier, pas le tracé.|日本とインドでは逆に、線路が海の上に出ていました。こちらも直しました。わざと残したものもあります。函館—青森の列車は本当に海の下を通りますし、マレー半島を下る線も実在の鉄道です。粗いのは経路ではなく海岸線のほうなので、触っていません。",
      ),
    ],
  },
  {
    version: "0.31.0",
    date: "2026-08-11",
    title: t(
      "You can cross the Pacific at last|Por fin se puede cruzar el Pacífico|On peut enfin traverser le Pacifique|太平洋が渡れるようになりました",
    ),
    highlights: [
      t(
        "To get from Tokyo to San Francisco you had to sail the other way round the world, through Europe and the Atlantic. A ship now runs from Suva to Papeete, and the crossing takes twenty-four squares instead of the long way about.|Para ir de Tokio a San Francisco había que dar la vuelta al mundo por Europa y el Atlántico. Ahora hay un barco de Suva a Papeete, y la travesía son veinticuatro casillas en lugar del rodeo.|Pour aller de Tokyo à San Francisco, il fallait faire le tour du monde par l'Europe et l'Atlantique. Un navire relie désormais Suva à Papeete : la traversée fait vingt-quatre cases au lieu du long détour.|東京からサンフランシスコへ行くのに、ヨーロッパと大西洋を通って地球を反対に回るしかありませんでした。スバとパペーテのあいだに船を通しました。24マスで着きます。",
      ),
      t(
        "The world map is cut at the date line, so the Pacific sits split between the two edges of the board. The new route is drawn the way a globe would have it: the line leaves the eastern edge and comes back in from the west, with the far port named at each end, and your train crosses in a single step instead of sliding back across Africa.|El mapa está cortado por la línea de cambio de fecha, así que el Pacífico queda partido entre los dos bordes del tablero. La nueva ruta se dibuja como en un globo terráqueo: la línea sale por el este y vuelve por el oeste, con el puerto lejano indicado en cada extremo, y el tren cruza de un paso en vez de deslizarse de vuelta sobre África.|La carte est coupée à la ligne de changement de date : le Pacifique se retrouve partagé entre les deux bords du plateau. La nouvelle ligne est tracée comme sur un globe : elle sort par l'est et revient par l'ouest, le port lointain étant nommé à chaque extrémité, et le train traverse d'un seul pas au lieu de reglisser au-dessus de l'Afrique.|世界地図は日付変更線で切ってあるので、太平洋は盤面の左右に分かれています。新しい航路は地球儀のとおりに描きました。線は右端から出て左端から入り、それぞれの端に向こうの港の名前を添えてあります。列車は一歩で渡ります(アフリカの上を滑って戻ったりしません)。",
      ),
    ],
  },
  {
    version: "0.30.0",
    date: "2026-08-11",
    title: t(
      "The spirit rides with you now|El espíritu ahora viaja contigo|L'esprit voyage désormais avec vous|厄災の神が、列車に乗って追いかけてきます",
    ),
    highlights: [
      t(
        "El Tío, the Binbōgami, the Flying Dutchman — whichever spirit your board keeps, it only ever showed up as a mark beside a name in the traveller list. Now it rides on the roof of the train it has chosen, and you can see across the map who is carrying it. Its ring is in that traveller's colour, so there is no mistaking whose luck is about to turn.|El Tío, el Binbōgami, el Holandés Errante: el espíritu de cada tablero solo aparecía como una marca junto a un nombre en la lista de viajeros. Ahora viaja en el techo del tren que ha elegido y se ve desde cualquier punto del mapa quién lo lleva. Su aro tiene el color de ese viajero, así que no hay confusión posible.|El Tío, le Binbōgami, le Hollandais volant : l'esprit de chaque plateau n'apparaissait que sous forme d'une marque à côté d'un nom dans la liste des voyageurs. Il voyage désormais sur le toit du train qu'il a choisi, et l'on voit d'un coup d'œil qui le porte. Son cercle reprend la couleur de ce voyageur : aucun doute possible.|エル・ティーオ、貧乏神、さまよえるオランダ人。盤面ごとの厄災の神は、旅人一覧に絵文字が付くだけで、地図を見ているあいだは誰に憑いているのか分かりませんでした。憑いた列車の屋根に乗って、一緒に走るようにしました。輪の色はその旅人の色なので、誰が背負っているのか見間違えません。",
      ),
      t(
        "Two towns close together were joined by a bare line with nothing between them, and a single roll could carry you across three of them. Around the world, thirty-six of the ninety-six lines were like that, and you could shuttle between Amsterdam and Paris to burn off a roll. Every line has at least one square again.|Dos ciudades cercanas se unían con una línea sin nada en medio, y una sola tirada podía llevarte por tres de ellas. En la vuelta al mundo, treinta y seis de las noventa y seis líneas eran así, y se podía ir y volver entre Ámsterdam y París para gastar la tirada. Cada línea vuelve a tener al menos una casilla.|Deux villes proches étaient reliées par un trait sans rien entre elles, et un seul jet pouvait vous en faire traverser trois. Sur le tour du monde, trente-six des quatre-vingt-seize lignes étaient ainsi, et l'on pouvait faire l'aller-retour Amsterdam–Paris pour épuiser un jet. Chaque ligne a de nouveau au moins une case.|近い町どうしが、あいだに何も無い線で直につながっていました。1回の出目で3つの町を通り過ぎることができ、世界一周では96本のうち36本がこの状態でした。アムステルダムとパリを往復して歩数を使い切る、といった動きもできてしまいます。どの路線にも必ず1マス以上を置くように戻しました。",
      ),
    ],
  },
  {
    version: "0.29.0",
    date: "2026-08-11",
    title: t(
      "You are buying property now, not souvenirs|Ahora compras propiedades, no recuerdos|Vous achetez désormais des biens, pas des souvenirs|買うものが、お土産から不動産になりました",
    ),
    highlights: [
      t(
        "A journey used to start with about the price of a good camera. It now starts with twelve million yen in Japan — the sort of money that buys a building, which is what the town shops were always selling. Every board is scaled to match; the play itself is unchanged.|Un viaje empezaba con lo que cuesta una buena cámara. Ahora empieza con doce millones de yenes en Japón: dinero para comprar un edificio, que es lo que las tiendas vendían desde el principio. Todos los tableros están a escala; el juego no cambia.|Un voyage commençait avec le prix d\'un bon appareil photo. Il commence désormais avec douze millions de yens au Japon — de quoi acheter un immeuble, ce que les boutiques vendaient depuis le début. Tous les plateaux suivent ; le jeu lui-même ne change pas.|旅の始まりが、カメラ1台ぶんの金額でした。日本では1200万円から始まります。町で売っているのは建物なので、それに見合う桁にしました。6つの盤面すべてを同じ考えで揃えています。遊びの計算そのものは変わりません。",
      ),
      t(
        "Some boards had nothing worth saving up for: on Ibaraki the dearest business cost barely more than the cheapest. Each board now has something that takes a year to afford — the space centre at Tsukuba, the lithium works on the Uyuni salt flat — and every business returns the same rate, so a big one costs more without paying better.|Algunos tableros no tenían nada por lo que ahorrar: en Ibaraki el negocio más caro apenas superaba al más barato. Ahora cada tablero tiene algo que cuesta un año de ahorro, y todos rinden lo mismo: lo grande cuesta más sin rendir más.|Certains plateaux n\'offraient rien qui vaille d\'économiser : en Ibaraki, l\'affaire la plus chère dépassait à peine la moins chère. Chaque plateau a maintenant un bien qui demande une année d\'économies, et tous rapportent au même taux.|貯める甲斐のあるものが無い盤面がありました。茨城は、いちばん高い物件がいちばん安いものとほとんど変わりません。どの盤面にも、1年ぶん貯めないと買えないものを置きました。筑波の宇宙センター、ウユニ塩湖のリチウム工場。利回りはどれも同じなので、高いものは「効率が良い」のではなく、まとまった金が要るという重みになります。",
      ),
      t(
        "A roll of one could light up squares that looked two apart. The board was right — but a square on a short line was drawn a tenth of the length of a square on a long one, so the eye was being told something the rules did not mean. Spacing is now even.|Un uno podía iluminar casillas que parecían estar a dos. El tablero acertaba, pero una casilla en un tramo corto se dibujaba diez veces más pequeña que en uno largo. Ahora el espaciado es parejo.|Un « un » pouvait éclairer des cases qui semblaient à deux pas. Le plateau avait raison, mais une case sur un tronçon court était dessinée dix fois plus petite que sur un long. L\'espacement est désormais régulier.|出目が1なのに、2マス先に見えるマスが光ることがありました。盤面の判定は正しく、短い路線の1マスが長い路線の1マスの10分の1の長さで描かれていたためです。目に見えるものと規則が食い違っていました。間隔を揃えました。",
      ),
      t(
        "Saving mid-game could leave the other travellers frozen: the \u201Csaved\u201D notice closed over whatever was open, and some of those windows were what set the next turn going. Saving no longer interrupts anything.|Guardar a media partida podía dejar congelados a los demás viajeros: el aviso de guardado tapaba lo que hubiera abierto, y algunas de esas ventanas eran las que ponían en marcha el turno siguiente. Guardar ya no interrumpe nada.|Sauvegarder en cours de partie pouvait figer les autres voyageurs : l\'avis de sauvegarde recouvrait ce qui était ouvert, or certaines de ces fenêtres lançaient le tour suivant. La sauvegarde n\'interrompt plus rien.|途中で保存すると、他の旅人が動かなくなることがありました。「保存しました」の知らせが、開いていた画面を上書きしてしまい、その画面を閉じることが次の手番を始める合図だったためです。保存しても何も止まらなくなりました。",
      ),
      t(
        "Each computer traveller has its own strength now, so you can face a gentle one and a merciless one in the same game. And the round-the-world map has weather in it — taiga, desert, tropics — with the oceans and regions named.|Cada viajero de la máquina tiene ahora su propia fuerza, así que puedes enfrentarte a uno suave y a otro implacable en la misma partida. Y el mapa mundial tiene clima: taiga, desierto, trópicos, con océanos y regiones nombrados.|Chaque voyageur de la machine a désormais sa propre force : on peut affronter un adversaire clément et un impitoyable dans la même partie. Et la carte du monde a un climat — taïga, désert, tropiques — océans et régions nommés.|CPUの強さを、CPUごとに選べるようになりました。手加減する相手と本気の相手を、同じ旅に混ぜられます。世界一周の地図には気候が入りました。タイガ、砂漠、熱帯。海と地域にも名前が付いています。",
      ),
    ],
  },
  {
    version: "0.28.0",
    date: "2026-08-11",
    title: t(
      "Nothing is thrown away without asking, and other people\'s turns stop asking you|Nada se borra sin preguntar, y los turnos ajenos dejan de pedirte permiso|Rien n\'est effacé sans vous demander, et les tours des autres cessent de vous solliciter|消す前に訊くようになり、他人の手番で押させるのをやめました",
    ),
    highlights: [
      t(
        "Discarding a saved journey used to wipe it on the spot. A year of play could go in one misclick. It now shows you what is about to be lost and asks first, with \u201Ckeep\u201D as the default.|Descartar un viaje guardado lo borraba en el acto: un año de partida podía irse en un clic. Ahora te muestra qué se va a perder y pregunta antes, con \u201Cconservar\u201D por defecto.|Écarter un voyage sauvegardé l\'effaçait sur-le-champ : une année de jeu pouvait disparaître d\'un clic. Le jeu montre désormais ce qui va être perdu et demande d\'abord, en proposant de garder par défaut.|保存した旅を「捨てる」と、その場で消えていました。1年ぶんの旅が、押し間違い1回で無くなります。何が消えるのかを見せてから訊くようにし、既定は「残す」にしました。",
      ),
      t(
        "A right answer is gold now, a wrong one stays red. They used to be the same colour, told apart only by the shape of the mark — which meant you had to look, instead of just seeing.|Un acierto ahora es dorado y un fallo sigue en rojo. Antes compartían color y solo los distinguía la forma de la marca: había que mirar en vez de simplemente ver.|Une bonne réponse est désormais dorée, une mauvaise reste rouge. Elles partageaient la même couleur, et seule la forme les distinguait : il fallait regarder au lieu de simplement voir.|正解が金色になり、不正解は赤のままになりました。これまでは同じ色で、印の形でしか見分けられませんでした。見るのではなく、読む必要があったということです。",
      ),
      t(
        "Squares no longer ignore a press that lands slightly off. The clickable area used to be a small centre and a thin ring with a dead gap between them; the gap is filled, so anywhere inside the glow now counts.|Las casillas ya no ignoran una pulsación algo desviada. La zona sensible era un centro pequeño y un anillo fino con un hueco muerto en medio; el hueco está relleno, así que ahora cuenta todo el interior del resplandor.|Les cases n\'ignorent plus un clic légèrement décalé. La zone sensible se limitait à un petit centre et à un mince anneau, avec un vide entre les deux ; ce vide est comblé : tout l\'intérieur du halo répond.|マスを少し外して押しても無反応、ということがなくなりました。押せる範囲が、小さな中心と細い輪に分かれていて、あいだが空洞だったためです。埋めたので、光っている範囲ならどこでも押せます。",
      ),
      t(
        "During other players\' turns, the game no longer waits for you to click through things you had no part in. Their blue and red square events, and the turn of the season, now pass on their own — press to skip ahead if you would rather not wait.|En los turnos ajenos, el juego ya no espera a que confirmes cosas en las que no participas. Sus sucesos y el cambio de estación pasan solos; pulsa si prefieres no esperar.|Pendant les tours des autres, le jeu n\'attend plus que vous validiez des choses qui ne vous concernent pas. Leurs événements et le changement de saison défilent seuls ; appuyez pour aller plus vite.|他の旅人の手番で、自分に関係のないものを押させるのをやめました。相手の青マス・赤マスの出来事と、月替わりが、そのまま流れるようになります。待ちたくなければ押せば飛ばせます。",
      ),
      t(
        "Items that carry you off — the Ekeko figure, the aeroplane, the balloon, the sail-trawler — now show the journey. The token walks the rails one square at a time with the item riding above it, instead of sliding straight across under a modal you could not see past.|Los objetos que te llevan lejos —el Ekeko, el avión, el globo, la barca de vela— ahora muestran el trayecto: la ficha recorre los raíles casilla a casilla con el objeto encima, en vez de deslizarse en línea recta bajo una ventana que lo tapaba.|Les objets qui vous emportent — l\'Ekeko, l\'avion, le ballon, la barque à voile — montrent désormais le trajet : le pion suit les rails case par case, l\'objet au-dessus, au lieu de glisser en ligne droite sous une fenêtre qui masquait tout.|運ばれるアイテム(エケコ人形・飛行機・気球・帆引き船)が、道のりを見せるようになりました。これまでは線路を無視して直線に滑り、しかもその動きがモーダルの下に隠れていました。1マスずつ線路をたどり、駒の上にそのアイテムが乗ります。",
      ),
    ],
  },
  {
    version: "0.27.0",
    date: "2026-08-09",
    title: t(
      "The game remembers what you called yourself|El juego recuerda cómo te llamaste|Le jeu retient le nom que vous vous êtes donné|付けた名前を覚えておくようになりました",
    ),
    highlights: [
      t(
        "Starting a new journey no longer means typing everyone's name again. The names you gave are waiting on the setup screen. Default names are not saved, so switching language still switches them.|Empezar otro viaje ya no obliga a teclear los nombres otra vez: los que pusiste esperan en la pantalla de preparación. Los nombres por defecto no se guardan, así que cambiar de idioma los sigue cambiando.|Commencer un nouveau voyage n\'oblige plus à retaper les noms : ceux que vous avez donnés vous attendent à l\'écran de préparation. Les noms par défaut ne sont pas enregistrés, si bien que changer de langue les change toujours.|新しい旅を始めるたびに名前を入れ直す必要がなくなりました。付けた名前が、はじめの画面に残っています。既定の名前は保存しないので、言語を切り替えれば今までどおり切り替わります。",
      ),
    ],
  },
  {
    version: "0.26.1",
    date: "2026-08-09",
    title: t(
      "Events now come from the board you are actually on|Los sucesos vienen ya del tablero en el que juegas|Les événements viennent enfin du plateau où vous jouez|出来事が、いま遊んでいる盤面のものになりました",
    ),
    highlights: [
      t(
        "If you played India and then started a game in Bolivia, the blue and red squares kept handing you Indian events — a chai wallah refusing payment, on the altiplano. The board, the towns and the quiz all changed; only the events were left behind.|Si jugabas a la India y luego empezabas en Bolivia, las casillas azules y rojas seguían dando sucesos indios: un chai wallah que no cobra, en pleno altiplano. El tablero, las ciudades y las preguntas cambiaban; solo los sucesos se quedaban atrás.|Après une partie en Inde, une partie en Bolivie continuait de servir des événements indiens : un chai wallah qui refuse d\'être payé, sur l\'altiplano. Le plateau, les villes et le quiz changeaient ; seuls les événements restaient.|インドで遊んだあとボリビアを始めると、青マス・赤マスがインドの出来事を出し続けていました。アルティプラーノでチャイ売りが代金を受け取らない、という具合です。盤面も町もクイズも切り替わるのに、出来事だけが前の国のまま残っていました。",
      ),
    ],
  },
  {
    version: "0.26.0",
    date: "2026-08-09",
    title: t(
      "If you play with animation turned down, you can still see what happened|Si juegas con las animaciones reducidas, ahora ves lo que ocurrió|Avec les animations réduites, vous voyez enfin ce qui s'est passé|動きを減らして遊んでいる人にも、何が起きたか見えるようになりました",
    ),
    highlights: [
      t(
        "Some scenes hid the thing that mattered until the animation moved it into view — so with motion turned down, the pickpocket's take vanished from the pickpocket scene, and the surcharge vanished from the bill. Eleven of those are now visible whether anything moves or not.|Algunas escenas escondían lo importante hasta que la animación lo traía a la vista: con el movimiento reducido, el botín desaparecía de la escena del carterista y el recargo desaparecía de la cuenta. Once de esos casos ya se ven, haya movimiento o no.|Certaines scènes cachaient l'essentiel jusqu'à ce que l'animation l'amène : animations réduites, le butin disparaissait de la scène du pickpocket et le supplément disparaissait de la note. Onze de ces cas sont désormais visibles, que ça bouge ou non.|一部の絵は、肝心のものを動きが運んでくるまで隠していました。そのため動きを減らす設定では、スリの絵から盗られたものが消え、伝票から足された料金が消えていました。11か所を、動いても動かなくても見えるようにしました。",
      ),
      t(
        "France's cut-train scene read as a derailment — a carriage tipped nose-down with a shock star above it. The carriage was fine; the branch line under it had been drawn dropping away at an impossible gradient. The track is redrawn as coming toward you instead, and the train sits level again.|La escena del tren acortado en Francia parecía un descarrilamiento. El vagón estaba bien: la vía de desvío estaba dibujada con una pendiente imposible. Ahora la vía viene hacia el espectador y el tren está nivelado.|La scène du train raccourci, en France, évoquait un déraillement. La voiture n'y était pour rien : la voie de desserte descendait selon une pente impossible. La voie vient maintenant vers vous, et le train est de niveau.|フランスの「編成が短い」場面が、脱線事故に見えていました。悪かったのは車両ではなく線路で、分岐線がありえない勾配で下っていました。手前に向かってくる線として描き直し、車両は水平に戻りました。",
      ),
      t(
        "When two squares you could move to sounded exactly alike to a screen reader — same direction, same kind, same distance — there was no way to tell which one you were about to pick. They are told apart now.|Cuando dos casillas sonaban igual al lector de pantalla —misma dirección, mismo tipo, misma distancia— no había forma de saber cuál ibas a elegir. Ahora se distinguen.|Quand deux cases se lisaient à l'identique au lecteur d'écran — même direction, même type, même distance — impossible de savoir laquelle on allait choisir. Elles se distinguent désormais.|読み上げで、行き先の候補がまったく同じ文になることがありました。向きも種類も残りマス数も同じだと、どちらを選ぼうとしているのか分かりません。区別が付くようにしました。",
      ),
    ],
  },
  {
    version: "0.25.0",
    date: "2026-08-09",
    title: t(
      "Ibaraki's misfortunes are seven different people now|Las desgracias de Ibaraki son ahora siete personas distintas|Les malheurs d'Ibaraki sont désormais sept personnes différentes|茨城の災難に、七人ちがう人が出るようになりました",
    ),
    highlights: [
      t(
        "All seven of Ibaraki's misfortune scenes had the same figure in them — same red shirt, same raised arm, only the hat changed. Now there is a carrier with a shoulder pole, a driver sitting on his crates, someone pulling matting over the drying racks in the rain, a farmer crouched at the paddy edge tasting the water for salt.|Las siete desgracias de Ibaraki tenían la misma figura: misma camisa roja, mismo brazo alzado. Ahora hay un porteador, un transportista sentado sobre sus cajas, alguien tapando los secaderos bajo la lluvia, un labrador agachado probando si el agua sabe a sal.|Les sept malheurs d'Ibaraki montraient la même silhouette : même chemise rouge, même bras levé. On y trouve maintenant un porteur, un transporteur assis sur ses caisses, quelqu'un qui bâche les séchoirs sous la pluie, un paysan accroupi qui goûte le sel dans l'eau.|茨城の災難7枚は、7枚とも同じ人が出ていました。同じ赤いシャツ、同じ上げた腕、違うのは帽子だけです。いまは、天秤棒で荷を担ぐ人、荷物の上に座って待つ運転手、雨の中で干し場に筵を掛ける人、畦にしゃがんで水の塩気を確かめる農夫が出ます。",
      ),
      t(
        "The giant's footprint keeps its scene, with one addition: a heron already standing in the pond that appeared overnight. Some things do not drain away.|La huella del gigante conserva su escena, con un añadido: una garza ya posada en la charca surgida de la noche a la mañana. Hay cosas que no se secan.|L'empreinte du géant garde sa scène, avec un ajout : un héron déjà posté dans la mare apparue en une nuit. Certaines choses ne se retirent pas.|巨人の足跡の絵はそのままに、一つだけ足しました。ひと晩でできた池に、もう鷺が立っています。引かない水もあります。",
      ),
    ],
  },
  {
    version: "0.24.0",
    date: "2026-08-09",
    title: t(
      "The travel log now speaks proper English, Spanish and French|El diario de viaje ya escribe en condiciones|Le journal de voyage écrit enfin correctement|旅の記録の文章が、英語・スペイン語・フランス語で直りました",
    ),
    highlights: [
      t(
        "Every line of the log put your name in front of a verb — and since the default name is a pronoun, the result was “You answers wrong” and “You is carried nine squares”, every single turn. The log now sets the name apart from what happened, the way the Japanese always did.|Cada línea ponía tu nombre delante de un verbo, y como el nombre por defecto es un pronombre, salía «Tú falla» en cada turno. Ahora el nombre va separado de lo ocurrido, como siempre hizo el japonés.|Chaque ligne plaçait votre nom devant un verbe ; le nom par défaut étant un pronom, cela donnait « Toi se trompe » à chaque tour. Le nom est désormais séparé de ce qui s'est passé, comme le faisait déjà le japonais.|旅の記録は、名前のすぐあとに動詞を活用させて置いていました。既定の名前が代名詞なので、毎ターン「You answers wrong」「Toi se trompe」といった壊れた文が出ていました。日本語が最初からそうしていたように、名前と出来事を切り離しました。",
      ),
      t(
        "The same change fixes something quieter: in Spanish and French a few lines assumed the player was male. If you named yourself María, the game had been getting your grammar wrong all along.|El mismo cambio corrige algo más callado: en español y francés varias líneas daban por hecho que jugabas en masculino. Si te llamabas María, el juego llevaba todo el tiempo equivocándose.|Le même changement en corrige un plus discret : en espagnol et en français, certaines lignes supposaient un joueur masculin. Si vous vous appeliez María, le jeu se trompait depuis le début.|同じ直しで、もう一つ静かな誤りが消えました。スペイン語とフランス語の一部の行は、遊ぶ人が男性である前提で書かれていました。「マリア」と名乗って遊んでいた人には、ずっと誤った文が出ていたことになります。",
      ),
      t(
        "Items that cannot do anything right now no longer let themselves be spent. Pressing the ch'alla offering without a spirit on you used to consume it for nothing; it now says why it is waiting.|Los objetos que ahora no pueden hacer nada ya no se gastan. Usar la ofrenda de ch'alla sin un espíritu encima la consumía para nada; ahora explica por qué espera.|Les objets qui ne peuvent rien faire ne se laissent plus dépenser. L'offrande de ch'alla, utilisée sans esprit sur soi, se consommait pour rien ; elle dit maintenant pourquoi elle attend.|いま効果が成立しないアイテムは、押しても消えなくなりました。厄災を背負っていないのにチャラの供物を使うと、何も起きずに無くなっていました。いまは「厄災を背負っているときだけ」と理由が出ます。",
      ),
      t(
        "Passing the misfortune to someone else now says who received it — it used to happen in silence. And a charm's description no longer promises to turn a wrong answer right: it absorbs the loss, but wrong stays wrong, which is the point.|Pasar la desgracia a otro ahora dice a quién le tocó; antes ocurría en silencio. Y el amuleto ya no promete convertir un fallo en acierto: absorbe la pérdida, pero el fallo sigue siendo un fallo.|Refiler le malheur à quelqu'un indique désormais à qui ; cela se faisait en silence. Et l'amulette ne promet plus de transformer une erreur en bonne réponse : elle absorbe la perte, mais l'erreur reste une erreur.|厄災を誰かに押し付けたとき、相手の名前が出るようになりました。これまでは黙って移っていました。お守りの説明も直しました。「次の不正解を正解にする」と書いてありましたが、実際は損失を肩代わりするだけで、不正解であることは変わりません。そこが大事な点です。",
      ),
      t(
        "Sixteen more quiz questions across the other five boards gave their answer away in a town card. Bolivia had nine of them. All six boards are clean now.|Otras dieciséis preguntas de los cinco tableros restantes revelaban su respuesta en una ficha de ciudad; nueve eran de Bolivia. Los seis tableros están limpios.|Seize autres questions, sur les cinq plateaux restants, livraient leur réponse dans une fiche de ville ; neuf en Bolivie. Les six plateaux sont désormais nets.|残る5盤面でも、都市の紹介文に答えが書いてある問題が16問見つかりました。うち9問がボリビアです。6盤面すべて解消しました。",
      ),
    ],
  },
  {
    version: "0.23.0",
    date: "2026-08-09",
    title: t(
      "The misfortune spirit lets go, and the die shows what it rolled|El espíritu de la desgracia por fin se marcha, y el dado muestra lo que sacó|L'esprit de malheur finit par lâcher prise, et le dé montre ce qu'il a fait|厄災の神が離れるようになり、サイコロが出た目を見せるようになりました",
    ),
    highlights: [
      t(
        "Once the spirit took hold it never let go: it struck again every time you reached for the die, and the log filled with the same line forever. It now moves on at the end of a turn, to whoever is furthest behind — the way it was always meant to.|Una vez que el espíritu se agarraba, no soltaba: golpeaba cada vez que ibas a por el dado y el diario se llenaba con la misma línea. Ahora se marcha al final del turno hacia quien va más rezagado, como debía ser.|Une fois accroché, l'esprit ne lâchait plus : il frappait chaque fois que vous tendiez la main vers le dé, et le journal se remplissait de la même ligne. Il passe désormais, en fin de tour, à celui qui est le plus en retard — comme prévu depuis le début.|厄災の神は、一度取り憑くと二度と離れませんでした。サイコロに手を伸ばすたびに災難が起き、旅の記録が同じ一行で埋まります。手番の終わりに、いちばん遅れている人へ移るようになりました。本来そうあるべきものでした。",
      ),
      t(
        "The die was landing on its side when it rolled a two or a five, so the face you saw was not the face it had rolled. That is why the number sometimes looked wrong, and why squares you thought were out of reach turned out not to be. It now settles upright whatever it rolls.|El dado caía de lado al sacar un dos o un cinco, así que la cara que veías no era la que había salido. Por eso el número parecía equivocado a veces. Ahora se posa derecho saque lo que saque.|Le dé retombait sur le flanc pour un deux ou un cinq : la face visible n'était pas celle qu'il avait faite. D'où les nombres qui semblaient faux. Il se pose maintenant droit, quel que soit le résultat.|サイコロは出目が2と5のとき横倒しで止まっていて、見えている面が出た目ではありませんでした。「出目がときどき違う」「行けないはずのマスに行けた」のはこれが原因です。どの目でも正しく立って止まります。",
      ),
      t(
        "Items that let you name your own number — the Jōban Line timetable and its like on every board — did nothing at all. They vanished from your bag and that was that. They now open a panel where you pick one to six.|Los objetos que te dejan elegir el número —el horario de la línea Jōban y sus equivalentes en cada tablero— no hacían nada: desaparecían de la bolsa y ya. Ahora abren un panel para elegir del uno al seis.|Les objets permettant d'annoncer son chiffre — l'indicateur de la ligne Jōban et ses équivalents sur chaque plateau — ne faisaient rien : ils disparaissaient du sac, un point c'est tout. Ils ouvrent désormais un panneau où l'on choisit de un à six.|出目を自分で選べるアイテム——常磐線の時刻表と、各盤面の同じ働きのもの——は、何も起きずに持ち物から消えるだけでした。1から6を選ぶ画面が出るようになりました。",
      ),
      t(
        "In a town you can now see what you have before you buy, what each purchase leaves you with, and how many businesses are still needed to double the income. Ushiku has its Great Buddha. And on the Ibaraki board, misfortune finally has pictures — a giant's footprint filling with water, a drying yard caught in the rain.|En un pueblo ahora ves cuánto tienes antes de comprar, con cuánto te quedas y cuántos negocios faltan para doblar la renta. Ushiku tiene su Gran Buda. Y en el tablero de Ibaraki, la desgracia por fin tiene imágenes.|En ville, vous voyez maintenant ce que vous avez avant d'acheter, ce qu'il vous restera, et combien d'affaires manquent pour doubler le revenu. Ushiku a son Grand Bouddha. Et sur le plateau d'Ibaraki, le malheur a enfin des images.|町では、買う前に所持金と、買ったあとの残りと、あと何件で収入が倍になるかが見えるようになりました。牛久に大仏が立ちました。茨城の盤面では、災難にようやく絵が付きました。巨人の足跡に水が溜まり、干し場が雨に濡れます。",
      ),
      t(
        "Ten of Ibaraki's questions have been rewritten. Some asked why something is so, which has no single answer; four gave their answer away in the town card you may already have read.|Diez preguntas de Ibaraki se han reescrito. Algunas preguntaban por qué algo es así, lo que no tiene una sola respuesta; cuatro revelaban su respuesta en la ficha del pueblo.|Dix questions d'Ibaraki ont été réécrites. Certaines demandaient pourquoi une chose est ainsi, ce qui n'a pas de réponse unique ; quatre livraient leur réponse dans la fiche de la ville.|茨城の問題を10問書き直しました。「なぜそうなのか」を問うものは答えが一つに定まりません。4問は、すでに読んだかもしれない町の紹介文に答えが書いてありました。",
      ),
    ],
  },
  {
    version: "0.22.0",
    date: "2026-08-08",
    title: t(
      "Every town on every board now looks like somewhere|Cada ciudad de cada tablero parece ahora un lugar de verdad|Chaque ville de chaque plateau ressemble enfin à quelque part|どの盤面のどの町も、どこかの場所に見えるようになりました",
    ),
    highlights: [
      t(
        "All six boards are done. Where a town used to sit against a flat band of colour, there is now a place with people working in it — a bathing step at dusk, an oyster bed at low tide, a lake boat pulled by nothing but the wind. Three hundred and twenty-one towns, none of them bare.|Los seis tableros están listos. Donde una ciudad se recortaba sobre una franja de color plana, hay ahora un lugar con gente trabajando: una escalinata al anochecer, un criadero de ostras en bajamar, una barca de lago movida solo por el viento. Trescientas veintiuna ciudades, ninguna desnuda.|Les six plateaux sont terminés. Là où une ville se détachait sur une bande de couleur unie, il y a désormais un lieu habité : un escalier de bain au crépuscule, un parc à huîtres à marée basse, une barque de lac tirée par le seul vent. Trois cent vingt et une villes, aucune nue.|6つの盤面すべてが仕上がりました。のっぺりした色の帯を背にしていた町が、人の働く場所になっています。夕暮れの沐浴場、引き潮の牡蠣棚、風だけで進む湖の帆引き船。321の町に、空っぽのものはもうありません。",
      ),
      t(
        "On a tablet or a phone, opening a game used to put the die below the map — you had to scroll before you could do anything at all. The die, whose turn it is, and the hint now sit above the map, so the first thing you see is the thing you press.|En tableta o móvil, al empezar una partida el dado quedaba bajo el mapa: había que desplazarse para poder hacer algo. Ahora el dado, el turno y la pista están sobre el mapa: lo primero que ves es lo que hay que pulsar.|Sur tablette ou téléphone, le dé se trouvait sous la carte au lancement : il fallait faire défiler avant de pouvoir agir. Le dé, le tour et l'indice sont désormais au-dessus de la carte : la première chose visible est celle sur laquelle on appuie.|タブレットや携帯でゲームを始めると、サイコロが地図の下にあり、画面を送るまで何も押せませんでした。サイコロと手番と手引きを地図の上に置いたので、最初に目に入るものが、そのまま押すものになります。",
      ),
      t(
        "When something happened on a rival's turn, the result still read as if it had happened to you — “You come out ahead, +Bs 200” under a heading that said CPU 1. Every one of the hundred and seven events has been rewritten so that only the heading says whose turn it is.|Cuando algo ocurría en el turno de un rival, el resultado se leía como si te hubiera pasado a ti: «Sales ganando, +Bs 200» bajo un título que decía CPU 1. Los ciento siete sucesos se han reescrito para que solo el título diga de quién se trata.|Quand un événement survenait chez un adversaire, le résultat se lisait comme s'il vous concernait : « Tu t'en sors gagnant, +Bs 200 » sous un titre indiquant CPU 1. Les cent sept événements ont été réécrits : seul le titre dit à qui cela arrive.|相手の番に何かが起きたとき、結果の行が自分に起きたことのように読めていました。見出しには「CPU 1」と出ているのに「得をした +Bs 200」と書いてあったためです。107件の出来事すべてを書き直し、誰の話かは見出しだけが言うようにしました。",
      ),
      t(
        "The square guide no longer sits open on top of the map, where it covered up to thirteen place names. It is a labelled button now — one press to read it, and nothing hidden behind it. In French the game had been addressing you two different ways in the same screen; it now speaks as it always did elsewhere.|La guía de casillas ya no se queda abierta sobre el mapa, donde tapaba hasta trece nombres. Ahora es un botón con texto: una pulsación para leerla y nada oculto detrás. En francés el juego te trataba de dos formas en la misma pantalla; ahora habla como siempre lo hizo.|Le guide des cases ne reste plus ouvert sur la carte, où il masquait jusqu'à treize noms de lieux. C'est désormais un bouton libellé : une pression pour le lire, et plus rien de caché. En français, le jeu vous tutoyait et vous vouvoyait dans le même écran ; il parle maintenant d'une seule voix.|マスの見かたが、地図の上に開いたままにならなくなりました。最大13件の地名を覆っていたためです。文字の入ったボタンにしたので、1回押せば読め、後ろに隠れるものはありません。フランス語では1つの画面で二通りの呼びかけが混ざっていたのも、元からの言い方に揃えました。",
      ),
    ],
  },
  {
    version: "0.21.0",
    date: "2026-08-08",
    title: t(
      "Bolivia has more places to go, and the towns you visit look like somewhere|Bolivia tiene más sitios adonde ir, y sus pueblos parecen lugares de verdad|La Bolivie a plus d'endroits où aller, et ses villes ressemblent enfin à quelque part|ボリビアに行ける場所が増え、着いた町がどこかの町に見えるようになりました",
    ),
    highlights: [
      t(
        "Five towns join the Bolivian board — Challapata on a lake that dried up, Chulumani on terraces older than the Inca, Totora, Punata, and Yacuiba where the railway stops at the border — with nine new lines between them. The board had fewer junctions than any other, so there was rarely a choice of route; now there is.|Cinco pueblos se suman al tablero boliviano —Challapata junto a un lago que se secó, Chulumani en terrazas anteriores a los incas, Totora, Punata y Yacuiba, donde el ferrocarril se detiene en la frontera— con nueve líneas nuevas. Era el tablero con menos cruces: casi nunca había ruta que elegir. Ahora sí.|Cinq villes rejoignent le plateau bolivien — Challapata au bord d'un lac disparu, Chulumani sur des terrasses antérieures aux Incas, Totora, Punata et Yacuiba où le rail s'arrête à la frontière — avec neuf lignes nouvelles. C'était le plateau le moins ramifié : on n'avait presque jamais le choix de l'itinéraire. Désormais, si.|ボリビアの盤面に5つの町が加わりました。干上がった湖のほとりのチャジャパタ、インカより古い段々畑のチュルマニ、トタラ、プナタ、そして線路が国境で終わるヤクイバ。あいだを結ぶ路線も9本増えています。この盤面はどこよりも分かれ道が少なく、道順を選ぶ場面がほとんどありませんでした。",
      ),
      t(
        "Seven new things can happen on the blue and red squares, so the same story stops coming round. You might help restring a charango — an instrument whose body was once an armadillo shell — or find the airstrip closed by the smoke of the season's field burning.|Siete sucesos nuevos en las casillas azules y rojas, para que no se repita siempre lo mismo. Puedes ayudar a encordar un charango —cuya caja fue en su día un caparazón de armadillo— o encontrar la pista cerrada por el humo de las quemas.|Sept événements inédits sur les cases bleues et rouges : la même histoire ne revient plus sans cesse. Vous aiderez à recorder un charango — dont la caisse fut jadis une carapace de tatou — ou trouverez la piste fermée par la fumée des brûlis.|青マス・赤マスで起きることが7つ増え、同じ話が何度も出ることが減りました。チャランゴの弦を張る手伝いをしたり(この楽器の胴は、かつてアルマジロの甲羅で作られていました)、焼き畑の煙で滑走路が閉じて足止めされたりします。",
      ),
      t(
        "The pictures behind each town are much fuller. India's are finished — every one of its sixty towns now looks like a particular place, with people in it — and Bolivia and the round-the-world board are most of the way there. Where a town used to sit against a flat band of colour, there is now a street, a shore, or a market with someone working in it.|Los fondos de las ciudades son mucho más ricos. La India está terminada —sus sesenta ciudades tienen ahora un lugar propio, con gente— y Bolivia y la vuelta al mundo van muy avanzadas. Donde antes había una franja de color plana, ahora hay una calle, una orilla o un mercado con alguien trabajando.|Les décors des villes sont bien plus fournis. L'Inde est terminée — ses soixante villes ont chacune un lieu, avec des gens — et la Bolivie et le tour du monde sont bien avancés. Là où une ville se détachait sur une bande de couleur unie, il y a maintenant une rue, un rivage, un marché où quelqu'un travaille.|都市の背景がずっと厚くなりました。インドは完成し、60都市すべてが「どこかの場所」に見えます。ボリビアと世界一周も大半が済みました。のっぺりした色の帯を背にしていた町が、通りや岸辺や、誰かが働いている市場になっています。",
      ),
      t(
        "In English the turn indicator used to read “You’s turn” when you had not typed a name. It now says “Your turn”.|En inglés el indicador de turno decía “You’s turn” si no habías escrito un nombre. Ahora dice “Your turn”.|En anglais, l’indicateur de tour affichait “You’s turn” faute de nom saisi. Il affiche désormais “Your turn”.|英語で遊んでいて名前を付けずに始めると、手番の表示が “You’s turn” という壊れた英語になっていました。“Your turn” に直しました。",
      ),
    ],
  },
  {
    version: "0.20.0",
    date: "2026-08-08",
    title: t(
      "What your items do is written on them now|Ahora tus objetos dicen lo que hacen|Vos objets disent enfin ce qu'ils font|アイテムに、何が起きるかが書いてあります",
    ),
    highlights: [
      t(
        "An item's effect was only written in a tooltip you had to hover over, so on a phone there was no way to read it at all. Each item now carries its effect under its name, where you can just see it.|El efecto de cada objeto solo aparecía al pasar el ratón por encima, así que en el móvil no había forma de leerlo. Ahora cada objeto lleva su efecto bajo el nombre, a la vista.|L'effet d'un objet n'apparaissait qu'au survol de la souris : sur téléphone, impossible de le lire. Chaque objet affiche désormais son effet sous son nom, simplement visible.|アイテムの効果は、マウスを乗せたときだけ出る吹き出しにしか書いてありませんでした。携帯では読む方法がなかったということです。今は名前の下に効果が書いてあり、そのまま目に入ります。",
      ),
      t(
        "Items you can use right now say so, and the ones that work on their own say that instead — you no longer have to tap one to find out whether tapping does anything.|Los objetos que puedes usar ahora lo indican, y los que actúan solos también: ya no hace falta pulsarlos para averiguar si sirven.|Les objets utilisables maintenant le disent, et ceux qui agissent seuls aussi : plus besoin d'en presser un pour savoir s'il se passe quelque chose.|いま使えるアイテムには「使える」と、ひとりでに働くものには「自動」と出ます。押してみないと押せるかどうか分からない、ということがなくなりました。",
      ),
      t(
        "The square guide now folds away, and it says what each colour actually does rather than only naming it.|La guía de casillas ahora se pliega, y explica qué hace cada color en vez de solo nombrarlo.|Le guide des cases se replie désormais, et il dit ce que fait chaque couleur au lieu de seulement la nommer.|マスの見かたは、たためるようになりました。色の名前だけでなく、止まると何が起きるかを書いています。",
      ),
      t(
        "When something happens on your turn, a short line slides in near the board. The travel log was at the bottom of the side panel, where nobody looks mid-game.|Cuando ocurre algo en tu turno, aparece una línea breve junto al tablero. El diario de viaje estaba al fondo del panel, donde nadie mira jugando.|Quand il se passe quelque chose pendant votre tour, une ligne courte glisse près du plateau. Le journal de voyage était en bas du panneau, là où personne ne regarde en jouant.|自分の番に何かが起きると、盤面のそばに短い一行が流れます。旅の記録は横のパネルのいちばん下にあり、遊んでいる最中は目に入らない場所でした。",
      ),
    ],
  },
  {
    version: "0.19.0",
    date: "2026-08-08",
    title: t(
      "Money now lands with some weight|El dinero ahora se nota|L\'argent se fait enfin sentir|お金の増減に手応えが付きました",
    ),
    highlights: [
      t(
        "Your money no longer flicks from one number to the next. It rolls, and how long it takes depends on how much moved: small change counts up quickly, a big prize takes its time.|Tu dinero ya no salta de una cifra a otra: va rodando, y cuanto mayor es el cambio, más tarda en contarse.|Votre argent ne saute plus d\'un chiffre à l\'autre : il défile, et plus la somme est grosse, plus le compte est long.|所持金がいきなり切り替わらず、数字が転がって増減します。動いた大きさで時間が変わり、小銭は速く、大金はゆっくり数えます。",
      ),
      t(
        "A gain lifts and turns gold, a loss dips and turns red, and the amount appears beside the total — so you can see what just happened without reading the log.|Lo que ganas sube y se vuelve dorado; lo que pierdes baja y se vuelve rojo, y la cantidad aparece junto al total.|Un gain monte et devient doré, une perte descend et devient rouge, et le montant s\'affiche à côté du total.|増えるときは金色に持ち上がり、減るときは赤く沈みます。動いた額が金額の横に出るので、旅の記録を読まなくても何が起きたか分かります。",
      ),
      t(
        "Arriving at your destination scatters coins, and a heavy loss shakes the number. Everyday quiz wins and blue squares stay quiet, and other travellers’ money moves without the fuss, so the big moments are the ones that stand out.|Llegar a tu destino hace saltar monedas y una pérdida fuerte sacude la cifra. Los aciertos corrientes y el dinero de los demás se mueven sin alboroto.|Arriver à destination fait jaillir des pièces, une grosse perte fait trembler le chiffre. Le quotidien et l\'argent des autres restent discrets.|目的地に着くとコインが弾け、大きく減ると数字が揺れます。ふだんのクイズや青マス、それに他の旅人のお金は静かに動くので、見せ場だけが際立ちます。",
      ),
      t(
        "If your device is set to reduce motion, nothing rolls or scatters — the numbers simply change.|Si tu dispositivo reduce el movimiento, nada rueda ni salta: las cifras cambian sin más.|Si votre appareil limite les animations, rien ne défile ni ne jaillit : les chiffres changent, tout simplement.|端末で動きを減らす設定にしている場合は、転がりもコインも出ず、数字がそのまま変わります。",
      ),
    ],
  },
  {
    version: "0.18.1",
    date: "2026-08-08",
    title: t(
      "The legend no longer swallows your taps|La leyenda ya no se traga tus toques|La légende n'avale plus vos clics|凡例がマスの押しを吸い取らなくなりました",
    ),
    highlights: [
      t(
        "The square guide sits in the top-left corner of the map, and squares underneath it could not be tapped at all. On the round-the-world board that corner is Europe, so London and its neighbours were impossible to choose at some window widths.|La guía de casillas está en la esquina superior izquierda del mapa y las casillas que quedaban debajo no se podían pulsar. En el tablero de la vuelta al mundo esa esquina es Europa, así que Londres y sus vecinas no se podían elegir con ciertos anchos de ventana.|Le guide des cases occupe le coin supérieur gauche de la carte, et les cases situées dessous ne réagissaient pas du tout. Sur le plateau du tour du monde, ce coin, c'est l'Europe : Londres et ses voisines étaient donc impossibles à choisir à certaines largeurs de fenêtre.|マスの見かたは地図の左上に置いてあり、その下に来たマスがまったく押せませんでした。世界一周の盤面では左上がヨーロッパなので、窓の幅によってはロンドンとその周りが選べなくなっていました。",
      ),
    ],
  },
  {
    version: "0.17.0",
    date: "2026-08-08",
    title: t(
      "You can see where you may go, and the board answers when you press it|Ahora se ve adónde puedes ir, y el tablero responde al pulsarlo|On voit où l'on peut aller, et le plateau répond quand on le presse|行けるマスが見えるようになり、押したら盤面が返事をします",
    ),
    highlights: [
      t(
        "The squares you can reach were already being marked, but in the same gold as the quiz squares, so the mark vanished among them. Reachable squares now wear a thick white ring and everything else is dimmed, so they stand out at a glance.|Las casillas alcanzables ya se marcaban, pero con el mismo dorado que las de preguntas, así que la marca se perdía entre ellas. Ahora llevan un grueso anillo blanco y el resto se atenúa, para verlas de un vistazo.|Les cases accessibles étaient déjà marquées, mais dans le même doré que les cases quiz : la marque s'y perdait. Elles portent désormais un large anneau blanc et le reste s'assombrit, pour les repérer d'un coup d'œil.|行けるマスには前から印が付いていましたが、クイズマスと同じ金色だったので、黄色いマスの中に紛れて見えませんでした。白い太い輪を付け、ほかを暗く沈めるようにしたので、ひと目で分かります。",
      ),
      t(
        "Pressing a square you cannot reach used to do nothing at all, which looked broken. It now bumps back with a short sound and a red ring, so you can tell the game heard you and the square is simply out of range.|Pulsar una casilla inalcanzable no hacía absolutamente nada y parecía una avería. Ahora rebota con un sonido breve y un anillo rojo, para saber que el juego te oyó y que la casilla queda fuera de alcance.|Presser une case hors de portée ne produisait rien du tout, ce qui semblait cassé. Elle recule maintenant d'un cran avec un son bref et un anneau rouge : le jeu vous a bien entendu, la case est simplement trop loin.|届かないマスを押しても本当に何も起きず、壊れているように見えていました。今は軽く弾んで短い音と赤い輪を返すので、「聞こえてはいるが、そのマスには届かない」と分かります。",
      ),
      t(
        "The die now lifts when you point at it and sinks when you press it, and it glows softly while it is your turn to roll — it was hard to tell it was a button at all.|El dado ahora se eleva al apuntarlo y se hunde al pulsarlo, y brilla suavemente cuando te toca tirar: antes costaba ver que fuera un botón.|Le dé se soulève au survol et s'enfonce quand on le presse, et il brille doucement quand c'est à vous de lancer : on ne devinait pas que c'était un bouton.|サイコロは、指を乗せると浮き上がり、押すと沈むようになりました。自分の番のあいだは金色にゆっくり光ります。これまでボタンだと気づきにくいものでした。",
      ),
      t(
        "The whole-map button now shows whether it is on: it turns gold, changes its picture, and puts a label beside itself, so you can tell the overview from the view you actually play in.|El botón de mapa completo ahora indica si está activo: se vuelve dorado, cambia de dibujo y muestra una etiqueta al lado, para distinguir la vista general de la de juego.|Le bouton carte entière indique désormais s'il est actif : il devient doré, change de dessin et affiche une étiquette à côté, pour distinguer la vue générale de celle où l'on joue.|全体表示のボタンが、押されているかどうかを見せるようになりました。金色になり、絵柄が変わり、脇に名前が出ます。確認用の俯瞰と、実際に遊ぶ表示を見分けられます。",
      ),
    ],
  },
  {
    version: "0.16.2",
    date: "2026-08-08",
    title: t(
      "The board is no longer covered on tablet-sized windows|El tablero ya no queda tapado en ventanas de tamaño tableta|Le plateau n'est plus recouvert sur les fenêtres de taille tablette|タブレットくらいの幅で盤面が隠れなくなりました",
    ),
    highlights: [
      t(
        "At in-between window widths the side panel was drawn on top of the map and hid the board. It now sits below the map, the way it does on a phone.|Con anchos de ventana intermedios, el panel lateral se dibujaba sobre el mapa y tapaba el tablero. Ahora queda debajo del mapa, como en el móvil.|Aux largeurs de fenêtre intermédiaires, le panneau latéral se dessinait par-dessus la carte et masquait le plateau. Il se place désormais sous la carte, comme sur téléphone.|中くらいの幅にすると、右側のパネルが地図の上に重なって盤面を隠していました。携帯と同じように、地図の下に並ぶようにしました。",
      ),
      t(
        "The starting player names now follow the language you are playing in. A name you type yourself is kept when you switch language.|Los nombres iniciales ahora siguen el idioma en el que juegas. Si escribes tu propio nombre, se conserva al cambiar de idioma.|Les noms de départ suivent désormais la langue dans laquelle vous jouez. Un nom que vous saisissez est conservé si vous changez de langue.|最初のプレイヤー名が、遊んでいる言語に合うようになりました(日本語なら「あなた」)。自分で付けた名前は、言語を切り替えても残ります。",
      ),
      t(
        "When several trains stop on the same square they no longer pile up. They spread out so every colour stays visible, and the train whose turn it is is drawn in front.|Cuando varios trenes coinciden en la misma casilla, ya no se amontonan: se reparten para que se vea cada color, y el tren de quien tiene el turno se dibuja delante.|Quand plusieurs trains s'arrêtent sur la même case, ils ne se chevauchent plus : ils se répartissent pour que chaque couleur reste visible, et le train dont c'est le tour passe devant.|同じマスに何台も止まったとき、駒が重なって見えなくなるのをやめました。少しずつずらして全員の色が見えるようにし、手番の駒を手前に描いています。",
      ),
    ],
  },
  {
    version: "0.16.1",
    date: "2026-08-08",
    title: t(
      "The dice keep the number to themselves until they stop|Los dados se guardan el número hasta pararse|Les dés gardent leur chiffre jusqu'à l'arrêt|サイコロは止まるまで出目を見せません",
    ),
    highlights: [
      t(
        "Pressing the die used to show the number and light up the squares you could reach straight away, while the die was still in the air. Now nothing is shown until it lands.|Antes, al pulsar el dado el número aparecía al instante y las casillas se iluminaban mientras el dado seguía en el aire. Ahora no se muestra nada hasta que cae.|Auparavant, le chiffre s'affichait dès la pression et les cases s'allumaient alors que le dé roulait encore. Désormais, rien n'apparaît avant qu'il ne se pose.|これまでは押した瞬間に出目が出て、行けるマスも光っていました。サイコロがまだ転がっている間にです。止まるまで何も出さないようにしました。",
      ),
      t(
        "The roll itself was redone. The bounces get lower and closer together as it settles, and the die goes a little too far and rocks back instead of stopping dead.|También se rehízo la tirada: los rebotes son más bajos y seguidos al final, y el dado se pasa un poco y se balancea en vez de frenar en seco.|Le lancer a été refait : les rebonds deviennent plus bas et plus rapprochés, et le dé dépasse légèrement puis oscille au lieu de s'arrêter net.|転がり方も作り直しました。弾むたびに低く、そして間隔が短くなり、止まりぎわは少し行き過ぎてから揺れて収まります。",
      ),
      t(
        "The faces are shaded differently from each other, so the die reads as a cube instead of a flat card, and it comes to rest at a slight angle.|Las caras tienen sombras distintas entre sí: el dado se ve como un cubo y no como una ficha plana, y queda algo inclinado al detenerse.|Les faces sont ombrées différemment les unes des autres : le dé ressemble à un cube et non à une carte plate, et il s'immobilise légèrement de biais.|面ごとに明るさを変えたので、平たい札ではなく立方体に見えます。止まるときも少し斜めを向きます。",
      ),
    ],
  },
  {
    version: "0.16.0",
    date: "2026-08-08",
    title: t(
      "The music can be turned off|Ahora se puede silenciar la música|La musique peut être coupée|音楽を止められるようになりました",
    ),
    highlights: [
      t(
        "There is a music button in the header now, on the title screen and while you play. Until today there was no way to stop the music from inside the game.|Ahora hay un botón de música en la cabecera, en la pantalla de inicio y durante la partida. Hasta hoy no había forma de detener la música desde el juego.|Un bouton de musique apparaît dans l\'en-tête, sur l\'écran d\'accueil comme en cours de partie. Jusqu\'ici, rien ne permettait de couper la musique depuis le jeu.|トップ画面とゲーム画面のヘッダーに、音楽ボタンが付きました。これまで画面から音楽を止める手段がありませんでした。",
      ),
      t(
        "It stops the music only. The dice, the coins and the rest of the sound effects keep playing, because those are the game answering what you just did.|Solo detiene la música: los dados, las monedas y los demás efectos siguen sonando, porque son la respuesta del juego a lo que acabas de hacer.|Elle ne coupe que la musique : les dés, les pièces et les autres effets continuent, car ce sont les réponses du jeu à ce que vous venez de faire.|止まるのは音楽だけです。サイコロやお金の効果音は残ります。あれは自分の操作に対する返事なので。",
      ),
      t(
        "Your choice is remembered. Turn the music off today and it is still off the next time you open the game.|Tu elección se recuerda: si la silencias hoy, seguirá silenciada la próxima vez que abras el juego.|Votre choix est retenu : musique coupée aujourd\'hui, musique toujours coupée à la prochaine ouverture.|選んだ状態は覚えています。今日切っておけば、次に開いたときも切れたままです。",
      ),
    ],
  },
  {
    version: "0.15.1",
    date: "2026-08-08",
    title: t(
      "Eight lakes come back|Vuelven ocho lagos|Huit lacs réapparaissent|消えていた湖が戻りました",
    ),
    highlights: [
      t(
        "Eight lakes had never once been drawn — Chilika and the Dal, Geneva and Annecy among them. They were written in degrees where the board wanted pixels, so each came out less than one pixel across and vanished without a trace.|Ocho lagos nunca se habían dibujado: estaban escritos en grados donde el tablero esperaba píxeles.|Huit lacs n\'avaient jamais été dessinés : ils étaient écrits en degrés là où le plateau attendait des pixels.|8つの湖が一度も描かれていませんでした。チルカ湖、ダル湖、レマン湖、アヌシー湖など。盤面がピクセルで受け取るところに度で書かれていて、1ピクセルに満たない大きさになって消えていました。",
      ),
    ],
  },
  {
    version: "0.15.0",
    date: "2026-08-08",
    title: t(
      "Ibaraki — a whole board for one province|Ibaraki: un tablero para una sola provincia|Ibaraki : tout un plateau pour une seule province|茨城県の盤面ができました",
    ),
    highlights: [
      t(
        "A sixth board, and the first that is not a country: one Japanese province, 36 towns, 40 new questions. The same machinery that draws the whole world draws a single province just as well.|Un sexto tablero, el primero que no es un país: una provincia japonesa, 36 ciudades, 40 preguntas.|Un sixième plateau, le premier qui n\'est pas un pays : une province japonaise, 36 villes, 40 questions.|6つ目の盤面は、はじめて「県」です。36の町と新作クイズ40問。世界一周を描く仕組みが、そのまま一つの県にも効きました。",
      ),
      t(
        "In one province there is no such thing as a region having a good year while another has a bad one, so the seasons here are festivals instead: plums at Kairakuen in February, irises at Itako in June, the sea opening at Ōarai in July, fireworks judged at Tsuchiura in October, and the waterfall at Fukuroda freezing solid in January.|En una sola provincia no hay regiones con buenos y malos años, así que las estaciones son fiestas: ciruelos, lirios, la apertura del mar, fuegos artificiales, la cascada helada.|Dans une seule province, pas de région en bonne ou mauvaise année : les saisons sont des fêtes — pruniers, iris, ouverture de la mer, feux d\'artifice, cascade gelée.|一つの県の中に「この地方は好況、あちらは不況」という差はありません。そこで季節は行事にしました。2月の偕楽園の梅、6月の潮来のあやめ、7月の大洗の海開き、10月の土浦の花火、1月に凍りつく袋田の滝。",
      ),
      t(
        "The spirit of misfortune here is the Daidarabō, the giant of the old shell-mound tale, whose footprints filled with water and became the ponds. The charm against him is a shell from that mound.|El espíritu es el Daidarabō, el gigante cuyas huellas se llenaron de agua y formaron los estanques.|L\'esprit est le Daidarabō, le géant dont les empreintes se sont remplies d\'eau pour devenir les étangs.|厄災の神はダイダラボウ。大串貝塚に伝わる巨人で、その足跡に水が溜まって沼になったといいます。お守りはその貝塚の貝。",
      ),
      t(
        "The world board also gained six port towns, so that ships no longer sail across dry land — Kolkata, Mombasa, Belém, Bandar Abbas, Veracruz and Lobito.|El tablero mundial ganó seis puertos para que los barcos ya no naveguen por tierra firme.|Le plateau mondial gagne six ports, pour que les navires ne traversent plus la terre ferme.|世界一周にも港町を6つ足しました。船が陸の上を走らないようにするためです。コルカタ・モンバサ・ベレン・バンダレアッバース・ベラクルス・ロビト。",
      ),
    ],
  },
  {
    version: "0.14.0",
    date: "2026-08-07",
    title: t(
      "The game gets its old name back|El juego recupera su nombre original|Le jeu retrouve son nom d'origine|もとの名前に戻りました",
    ),
    highlights: [
      t(
        "This started life on the Bolivian altiplano, and it was called Altiplano Express. The name it picked up later said less, so it has the old one back — even though the trains now run through five parts of the world.|Empezó en el altiplano boliviano y se llamaba Altiplano Express. Recupera aquel nombre, aunque ahora los trenes recorran cinco tableros.|Le jeu est né sur l'altiplano bolivien sous le nom d'Altiplano Express. Il le reprend, même si les trains parcourent désormais cinq plateaux.|このゲームはボリビアのアルティプラーノで生まれ、Altiplano Express という名前でした。あとから付いた名前は当たり障りがなかったので、もとの名前に戻します。いまは5つの盤面を走っていますが、生まれた場所の名前です。",
      ),
    ],
  },
  {
    version: "0.13.5",
    date: "2026-08-07",
    title: t(
      "A compass in the corner|Una brújula en la esquina|Une boussole dans le coin|方位記号を置きました",
    ),
    highlights: [
      t(
        "Every board is drawn with north at the top, so there is now a compass in the corner to say so. There is no scale bar — on the world board a single bar would be a lie somewhere, because a degree is not the same length everywhere.|Todos los tableros tienen el norte arriba, y ahora una brújula lo indica. No hay escala: en el mapa mundial una sola barra mentiría en algún punto.|Tous les plateaux ont le nord en haut ; une boussole le rappelle. Pas d\'échelle : sur la carte du monde, une seule barre mentirait quelque part.|どの盤面も北が上なので、それを示す方位記号を隅に置きました。縮尺は出していません。世界一周では緯度によって1度の長さが変わるため、1本の尺だとどこかで嘘になるからです。",
      ),
    ],
  },
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
