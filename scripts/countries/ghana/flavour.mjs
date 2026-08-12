/**
 * ガーナの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国と同じく「地方まるごとの好不況」で差をつける。
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

export const GHANA_META = {
  id: "ghana",
  name: t("Ghana|Ghana|Ghana|ガーナ"),
  blurb: t(
    "A West African coast of gold and cocoa, where a golden stool still rules an ancient kingdom and one of the world's largest lakes reaches deep into the Sahel|Una costa de oro y cacao de África Occidental, donde un taburete dorado sigue gobernando un antiguo reino y uno de los mayores lagos del mundo se adentra en el Sahel|Une côte ouest-africaine d'or et de cacao, où un tabouret d'or gouverne encore un royaume ancien et où l'un des plus grands lacs du monde s'enfonce jusqu'au Sahel|金とカカオの西アフリカの海岸。黄金の腰掛けがいまも古い王国を統べ、世界屈指の巨大な湖がサヘルの奥まで伸びている",
  ),
  // 表示専用の倍率。1セディ≒10円(1ドル≒150円・1ドル≒15セディ、2025年半ばの
  // 相場を基準)として、日本(×10000で¥12,000,000スタート)と同じ物価感覚に
  // なるよう mul=10000/10=1000 を当てた(REGISTER.md参照)。
  cur: { pre: "₵", post: "", mul: 1000 },
  start: "accra",
  // アナンシ物語(アナンセセム)に登場する天空神と、アナンシの妻・息子・宿敵のカラス。
  cpuNames: ["Nyame", "Aso", "Ntikuma", "Konori"],
  // 国旗の赤・金・緑に、星の黒を添えた4色。
  stripe: ["#ce1126", "#fcd116", "#006b3f", "#000000"],
};

/** 6地方。大アクラ/中部・海岸/アシャンティ/ヴォルタ/北部/西部。 */
export const GHANA_REGIONS = {
  gar: t("Greater Accra — the capital and its coastal plain|Gran Acra — la capital y su llanura costera|Grand Accra — la capitale et sa plaine côtière|大アクラ(首都とその沿岸平野)"),
  cen: t("Central & Coast — the old slaving forts and fishing towns|Centro y Costa — los antiguos fuertes esclavistas y pueblos pesqueros|Centre et Côte — les anciens forts négriers et villages de pêcheurs|中部・海岸(奴隷貿易の砦と漁村)"),
  asa: t("Ashanti — the forest kingdom of gold and kente|Ashanti — el reino forestal del oro y el kente|Ashanti — le royaume forestier de l'or et du kente|アシャンティ(金とケンテの森の王国)"),
  vol: t("Volta — the Ewe heartland east of the great lake|Volta — el corazón ewe al este del gran lago|Volta — le cœur ewe à l'est du grand lac|ヴォルタ(大きな湖の東、エウェの中心地)"),
  nor: t("Northern — the savanna of Dagbon, Gonja and Mamprugu|Norte — la sabana de Dagbon, Gonja y Mamprugu|Nord — la savane du Dagbon, du Gonja et du Mamprugu|北部(ダゴンボン・ゴンジャ・マンプルグのサバンナ)"),
  wes: t("Western — Sekondi-Takoradi's gold, rubber and cocoa|Oeste — el oro, caucho y cacao de Sekondi-Takoradi|Ouest — l'or, le caoutchouc et le cacao de Sekondi-Takoradi|西部(セコンディ・タコラディの金・ゴム・カカオ)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const GHANA_ITEMS = {
  kwahu: {
    e: "🪂",
    price: 240,
    kind: "move",
    n: t("A Lift from a Kwahu Paraglider|Un vuelo con un parapentista de Kwahu|Un vol avec un parapentiste de Kwahu|クワフェのパラグライダーに乗せてもらう"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde aterrizas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu atterris.|8〜12マス運ばれる。どこに降りるかは風まかせ。",
    ),
    f: t(
      "The Kwahu Easter paragliding festival has launched from the cliffs above Atibie since 2005, timed to a week when tens of thousands of Ghanaians already travel up to the Kwahu plateau for family reunions, church conventions and street parties that long predate anyone bringing a glider. The 300-metre escarpment gives such reliable updrafts that pilots now fly it every Easter regardless of what else is scheduled that year.|El festival de parapente de Pascua en Kwahu despega desde los acantilados sobre Atibie desde 2005, coincidiendo con una semana en la que decenas de miles de ghaneses ya suben a la meseta de Kwahu por reuniones familiares, convenciones religiosas y fiestas callejeras muy anteriores a la llegada de cualquier parapente. El escarpe de 300 metros ofrece corrientes ascendentes tan fiables que los pilotos vuelan allí cada Pascua pase lo que pase ese año.|Le festival de parapente de Pâques à Kwahu décolle des falaises au-dessus d'Atibie depuis 2005, calé sur une semaine où des dizaines de milliers de Ghanéens montent déjà sur le plateau de Kwahu pour des retrouvailles familiales, des conventions religieuses et des fêtes de rue bien antérieures à l'arrivée du moindre parapente. L'escarpement de 300 mètres offre des ascendances si fiables que les pilotes y volent désormais chaque Pâques quoi qu'il arrive cette année-là.|クワフェ・イースター・パラグライディング祭は2005年から、アティビエ上方の崖から飛び立っている。この週はもともと、パラグライダーが来るよりずっと前から、家族の集まりや教会の大会、街頭のお祭りのために何万人ものガーナ人がクワフェ高原へ登ってくる週である。標高300メートルの断崖は非常に安定した上昇気流を生むため、パイロットはその年の予定がどうであれ毎年復活祭にここを飛ぶ。",
    ),
  },
  adae: {
    e: "📅",
    price: 380,
    kind: "pre",
    n: t("The Adae Festival Calendar|El calendario del festival Adae|Le calendrier du festival Adae|アデー祭の暦"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Asante calendar runs on a 42-day cycle quite separate from the Gregorian one, so an Akwasidae festival, held on a Sunday to honour the ancestral stools with food and drink, and its midweek counterpart Awukudae never fall on the same weekday twice in a row. Court criers still announce each coming Adae day by drum, days ahead, exactly as they did before anyone in the kingdom owned a printed calendar.|El calendario asante sigue un ciclo de 42 días bastante distinto del gregoriano, de modo que el festival Akwasidae, celebrado en domingo para honrar con comida y bebida a los taburetes ancestrales, y su homólogo de entre semana, el Awukudae, nunca caen dos veces seguidas en el mismo día. Los pregoneros de la corte siguen anunciando cada Adae venidero a tambor, con días de antelación, tal como hacían antes de que nadie en el reino tuviera un calendario impreso.|Le calendrier asante suit un cycle de 42 jours bien distinct du calendrier grégorien, si bien que le festival Akwasidae, célébré un dimanche pour honorer les tabourets ancestraux avec nourriture et boisson, et son pendant de semaine, l'Awukudae, ne tombent jamais deux fois de suite le même jour. Les hérauts de la cour annoncent encore chaque Adae à venir au tambour, plusieurs jours à l'avance, comme ils le faisaient avant qu'un calendrier imprimé n'existe dans le royaume.|アサンテの暦はグレゴリオ暦とはまったく別の42日周期で回るため、祖先の腰掛けを食べ物と酒でもてなす日曜のアクワシデー祭と、その中日にあたるアウクデー祭は、同じ曜日に二度続けて来ることがない。宮廷の触れ役はいまも、王国の誰も印刷された暦を持たなかった時代と同じように、次のアデーの日を太鼓で数日前から告げて回る。",
    ),
  },
  trotro: {
    e: "🚐",
    price: 360,
    kind: "pre",
    n: t("A Seat on the Last Tro-Tro|Un asiento en el último tro-tro|Une place dans le dernier tro-tro|最後のトロトロの座席"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Ghana's tro-tro minibuses are privately owned and run to no fixed timetable, so a conductor called the mate leans out the sliding door shouting the destination and slaps the roof twice to tell the driver to pull away. Regular riders flag one down with a whole vocabulary of hand signs — a downward point, a circled finger — that name a destination without a single word spoken.|Los minibuses tro-tro de Ghana son de propiedad privada y no siguen horario fijo, así que un cobrador llamado mate se asoma por la puerta corredera gritando el destino y golpea el techo dos veces para indicar al conductor que arranque. Los pasajeros habituales los paran con todo un lenguaje de señas con la mano —un dedo apuntando hacia abajo, un círculo trazado en el aire— que nombra un destino sin decir una palabra.|Les minibus tro-tro du Ghana appartiennent à des particuliers et ne suivent aucun horaire fixe, si bien qu'un receveur appelé mate se penche par la porte coulissante en criant la destination et frappe deux fois le toit pour signaler au chauffeur de démarrer. Les habitués en hèlent un avec tout un vocabulaire de signes de la main — un doigt pointé vers le bas, un cercle tracé en l'air — qui nomme une destination sans un mot.|ガーナのトロトロ(乗合ミニバス)は個人所有で決まった時刻表を持たず、「メイト」と呼ばれる助手が引き戸から身を乗り出して行き先を叫び、屋根を二回叩いて運転手に発車の合図を送る。常連客は指を下に向けたり指で輪を描いたりと、一言も発さずに行き先を伝える手のサインの一式で車を呼び止める。",
    ),
  },
  motorway: {
    e: "🛣️",
    price: 640,
    kind: "pre",
    n: t("A Ticket on the Motorway Express|Un billete en el expreso de la autopista|Un billet pour l'express de l'autoroute|高速道路急行の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Accra–Tema Motorway opened in 1965 as the first limited-access highway anywhere in West Africa, a showpiece of Kwame Nkrumah's industrial ambitions built to link the capital to the new deep-water port being dug at Tema. Six decades on it is still one of the few stretches of road in the country with a toll gate, and still carries most of the traffic between the two cities.|La autopista Accra-Tema se inauguró en 1965 como la primera vía de acceso limitado de toda África Occidental, un escaparate de las ambiciones industriales de Kwame Nkrumah, construida para unir la capital con el nuevo puerto de aguas profundas que se excavaba en Tema. Seis décadas después sigue siendo uno de los pocos tramos de carretera del país con peaje, y aún transporta la mayor parte del tráfico entre ambas ciudades.|L'autoroute Accra-Tema a ouvert en 1965, première voie à accès limité de toute l'Afrique de l'Ouest, vitrine des ambitions industrielles de Kwame Nkrumah bâtie pour relier la capitale au nouveau port en eau profonde alors creusé à Tema. Six décennies plus tard, elle reste l'un des rares tronçons du pays à péage, et achemine toujours l'essentiel du trafic entre les deux villes.|アクラ―テマ間の高速道路は1965年、西アフリカで初めての立体交差の高速道路として開通した。テマに新たに掘削中だった深海港と首都を結ぶために建設された、クワメ・ンクルマの工業化構想の象徴だった。それから60年経ったいまも、この国で数少ない有料区間の一つであり続け、両都市間の交通の大半をいまも担っている。",
    ),
  },
  sankofa: {
    e: "🔁",
    price: 320,
    kind: "passive",
    n: t("The Sankofa Pendant|El colgante Sankofa|Le pendentif Sankofa|サンコファのペンダント"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The Sankofa symbol shows a bird walking forward with its head turned backward to lift an egg off its own back, illustrating the Akan proverb that it is never wrong to go back for what was left behind. Carved into staffs, cast in gold weights and now printed on everything from taxis to T-shirts, it is one of dozens of Adinkra symbols that each compress a piece of proverb wisdom into a single image.|El símbolo Sankofa muestra un ave que camina hacia delante con la cabeza vuelta hacia atrás para recoger un huevo de su propio lomo, ilustrando el proverbio akan de que nunca está mal volver por lo que se dejó atrás. Tallado en bastones, fundido en pesas de oro y hoy impreso desde en taxis hasta en camisetas, es uno de las decenas de símbolos adinkra que condensan cada uno un proverbio en una sola imagen.|Le symbole Sankofa montre un oiseau marchant vers l'avant, la tête tournée en arrière pour saisir un œuf sur son propre dos, illustrant le proverbe akan selon lequel il n'est jamais mauvais de revenir chercher ce qu'on a laissé derrière soi. Sculpté sur des bâtons, coulé en poids à peser l'or et aujourd'hui imprimé sur tout, des taxis aux T-shirts, c'est l'un des dizaines de symboles adinkra qui condensent chacun un proverbe en une seule image.|サンコファの図像は、前へ歩きながら頭だけを後ろへ向け、自分の背中にある卵を取ろうとする鳥を描く。「置いてきたものを取りに戻るのは決して間違いではない」というアカン人の諺を表している。杖に彫られ、金の分銅に鋳込まれ、いまではタクシーからTシャツまであらゆる物に刷り込まれるこの図像は、一つ一つが諺の知恵を一枚の絵に凝縮した何十種ものアディンクラ紋様の一つである。",
    ),
  },
  libation: {
    e: "🍾",
    price: 440,
    kind: "pre",
    n: t("Pouring a Libation|Verter una libación|Verser une libation|献酒(リベーション)を注ぐ"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Before a chief speaks, a funeral begins, or even some government ceremonies open, an elder pours a small measure of schnapps or akpeteshie onto the ground while calling out ancestors and gods by name, asking them to witness and to keep trouble away. The same gesture, poured a splash at a time between each name, is repeated so often at Ghanaian gatherings that imported schnapps brands built entire marketing campaigns around funerals and festivals rather than drinking.|Antes de que hable un jefe, comience un funeral o incluso se abran algunas ceremonias de gobierno, un anciano vierte una pequeña medida de ginebra o akpeteshie sobre el suelo mientras nombra en voz alta a ancestros y dioses, pidiéndoles que sean testigos y alejen el infortunio. El mismo gesto, un chorrito entre cada nombre, se repite tanto en las reuniones ghanesas que las marcas de ginebra importada construyeron campañas enteras en torno a funerales y festivales, no a la bebida.|Avant qu'un chef ne prenne la parole, qu'un enterrement ne commence, ou même que certaines cérémonies officielles ne s'ouvrent, un aîné verse un peu de schnaps ou d'akpeteshie sur le sol en nommant à voix haute ancêtres et divinités, leur demandant d'être témoins et d'écarter le malheur. Ce même geste, versé par petites gorgées entre chaque nom, se répète tant lors des rassemblements ghanéens que des marques de schnaps importé ont bâti des campagnes entières autour des funérailles et des festivals plutôt que de la boisson elle-même.|首長が話す前も、葬儀が始まる前も、いくつかの政府の式典の開幕でさえ、年長者が地面に少量のシュナップスや地酒アクペテシーを注ぎながら祖先と神々の名を呼び上げ、立ち会いと厄除けを願う。名を呼ぶたびに少しずつ注ぐこの仕草はガーナの集まりであまりに頻繁に繰り返されるため、輸入シュナップスの銘柄は飲用そのものより葬儀や祭りを軸にした広告展開を築いてきたほどである。",
    ),
  },
  expo: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("An Expo Sheet|Una chuleta ('expo')|Une antisèche (« expo »)|カンニングペーパー(エクスポ)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Ghanaian students call a smuggled answer sheet or a leaked set of exam questions an 'expo' — school slang so widespread that national exam authorities now name it directly in the warnings printed on every test booklet. Leaked exam papers sold as 'expo' have occasionally forced whole subjects to be re-sat nationwide, at real cost to the students who never bought one.|Los estudiantes ghaneses llaman 'expo' a una hoja de respuestas colada o a un examen filtrado, jerga escolar tan extendida que las autoridades de exámenes nacionales ya la nombran directamente en las advertencias impresas en cada cuadernillo. Los exámenes filtrados vendidos como 'expo' han obligado a veces a repetir asignaturas enteras a nivel nacional, a costa de los estudiantes que jamás compraron uno.|Les élèves ghanéens appellent 'expo' une feuille de réponses introduite en fraude ou un sujet d'examen fuité — argot scolaire si répandu que les autorités des examens nationaux le nomment désormais directement dans les avertissements imprimés sur chaque livret. Des sujets fuités vendus comme 'expo' ont parfois forcé à refaire passer des matières entières à l'échelle nationale, au prix fort pour les élèves qui n'en avaient jamais acheté.|ガーナの学生は、こっそり持ち込む解答用紙や漏れた試験問題を「エクスポ」と呼ぶ。あまりに広まった学校の隠語で、全国統一試験の実施機関がいまや試験冊子の注意書きに直接この語を書き込むほどである。「エクスポ」として売られた流出問題のせいで、ある科目まるごと全国で再試験になったこともあり、エクスポを一度も買わなかった生徒までその割を食った。",
    ),
  },
  lotto: {
    e: "🎟️",
    price: 280,
    kind: "pre",
    n: t("A Winning Lotto Slip|Un boleto de lotto premiado|Un ticket de lotto gagnant|当たった宝くじ(ロト)"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Ghana's state lottery draws numbers several times a week, and generations of players have picked theirs from small printed 'dream books' that translate a dream — a snake, a wedding, a falling tooth — into a lucky number, much as an older almanac once matched dates to saints. Illegal private numbers-writing operations, known locally as banker-to-banker, ran alongside the official lottery for decades before some of them were folded into it.|La lotería estatal de Ghana sortea números varias veces por semana, y generaciones de jugadores han elegido los suyos en pequeños 'libros de sueños' impresos que traducen un sueño —una serpiente, una boda, un diente que se cae— en un número de la suerte, casi como un almanaque antiguo emparejaba fechas con santos. Operaciones ilegales privadas de apuestas numéricas, conocidas localmente como banker-to-banker, funcionaron junto a la lotería oficial durante décadas antes de que algunas se integraran en ella.|La loterie d'État du Ghana tire des numéros plusieurs fois par semaine, et des générations de joueurs choisissent les leurs dans de petits « livres de rêves » imprimés qui traduisent un rêve — un serpent, un mariage, une dent qui tombe — en numéro porte-bonheur, un peu comme un vieil almanach associait autrefois des dates à des saints. Des opérations clandestines de paris sur les numéros, connues localement sous le nom de banker-to-banker, ont fonctionné en parallèle de la loterie officielle pendant des décennies avant que certaines n'y soient intégrées.|ガーナの国営宝くじは週に何度も抽選を行い、何世代ものプレイヤーが、蛇や結婚式や抜けた歯といった夢を幸運の数字に変換する小さな印刷物「夢の本」を頼りに数字を選んできた。かつての暦が日付と聖人を結びつけていたのとよく似ている。「バンカー・トゥ・バンカー」と呼ばれる非公認の私設賭博も、公式宝くじと並行して何十年も営まれ、のちにその一部は公式に取り込まれた。",
    ),
  },
  okyeame: {
    e: "🗣️",
    price: 420,
    kind: "pre",
    n: t("A Word from the Linguist|Una palabra del vocero (okyeame)|Un mot du porte-parole (okyeame)|取次役(オチェアメ)の一声"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "An Akan chief traditionally never addresses a formal gathering directly; he murmurs to his okyeame, a trained linguist standing beside him, who repeats the message aloud in more polished language and carries replies back the other way. The okyeame's carved staff, topped with a small gold or wooden finial illustrating a proverb, is itself a piece of coded diplomacy, chosen ahead of a meeting to signal exactly what kind of conversation the chief intends to have.|Tradicionalmente, un jefe akan nunca se dirige directamente a una asamblea formal: susurra a su okyeame, un vocero adiestrado a su lado, que repite el mensaje en voz alta con un lenguaje más pulido y lleva las respuestas de vuelta. El bastón tallado del okyeame, rematado por un pequeño remate de oro o madera que ilustra un proverbio, es en sí mismo una pieza de diplomacia codificada, elegida antes de un encuentro para señalar exactamente qué tipo de conversación pretende tener el jefe.|Un chef akan ne s'adresse traditionnellement jamais directement à une assemblée formelle : il murmure à son okyeame, un porte-parole formé se tenant à ses côtés, qui répète le message à voix haute dans une langue plus soignée et rapporte les réponses en sens inverse. Le bâton sculpté de l'okyeame, surmonté d'un petit fleuron d'or ou de bois illustrant un proverbe, est lui-même une pièce de diplomatie codée, choisie avant une rencontre pour signaler exactement quel type de conversation le chef entend avoir.|アカンの首長は伝統的に正式な集まりで直接話すことをしない。傍らに立つ訓練された取次役「オチェアメ」に小声で伝え、オチェアメがそれをより整った言葉で声高に繰り返し、返答も同じ経路で運ぶ。金や木で作られた諺を表す小さな飾りを頂くオチェアメの彫刻杖そのものが、暗号化された外交の道具であり、会見の前にどんな種類の対話を望むかを示すために選ばれる。",
    ),
  },
};

/**
 * 厄災の神。アカン(アシャンティ)の民話に伝わるアナンシ(クモの姿の知恵者。
 * 天空神ニャメから世界のすべての物語を買い取ったという話で知られる)にした。
 * 悪霊ではなく、賢さで得をする一方でしばしば自分の悪知恵に自分がはまる
 * という二面性を持つ(イタリアのモナチェッロ・韓国のトッケビと同じく
 * 「残酷ではなく、ただ度が過ぎる」性格)。
 */
export const GHANA_SPIRIT = {
  e: "🕷️",
  n: t("Anansi|Anansi|Anansi|アナンシ"),
  big: t("Anansi's Grand Prank|La gran travesura de Anansi|La grande farce d'Anansi|アナンシの大いたずら"),
  ward: "sankofa",
  arrive: t(
    "<b>🕷️ Anansi has taken an interest in you.</b> Akan storytellers describe an amber-eyed spider who once bought all the world's stories from the sky god Nyame by tricking a python, a leopard and a swarm of hornets into captivity one after another, and who has been getting the better of bigger, stronger neighbours ever since through cleverness rather than strength. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🕷️ Anansi se ha fijado en ti.</b> Los narradores akan describen a una araña de ojos ámbar que una vez compró todas las historias del mundo al dios del cielo Nyame, engañando uno tras otro a una pitón, un leopardo y un enjambre de avispas para capturarlos, y que desde entonces supera a vecinos más grandes y fuertes gracias a la astucia y no a la fuerza. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🕷️ Anansi s'est intéressé à toi.</b> Les conteurs akan décrivent une araignée aux yeux ambrés qui acheta jadis toutes les histoires du monde au dieu du ciel Nyame en piégeant tour à tour un python, un léopard et un essaim de frelons, et qui depuis l'emporte sur des voisins plus grands et plus forts par la ruse plutôt que par la force. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🕷️ アナンシに目を付けられた。</b> アカンの語り部たちは、琥珀色の目をしたクモが、蛇や豹やスズメバチの群れを次々とだまして捕らえ、その手柄で天空神ニャメから世界のすべての物語を買い取ったと語る。そのアナンシはいまも、力ではなく知恵で自分より大きく強い相手を出し抜き続けている。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🕷️ <b>Anansi</b> loses interest and scuttles after <b>{0}</b>, farthest from {1}.|🕷️ <b>Anansi</b> pierde el interés y corretea tras <b>{0}</b>, el más lejano de {1}.|🕷️ <b>Anansi</b> se désintéresse et détale vers <b>{0}</b>, le plus loin de {1}.|🕷️ <b>アナンシ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ這っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with Anansi and never once laughed at his stories. Insulted, he spins a web clean across the road to teach everyone a lesson — <b>Anansi's Grand Prank</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a Anansi sin haberse reído ni una vez de sus historias. Ofendido, teje una telaraña que cruza todo el camino para dar una lección a todos: empieza <b>la gran travesura de Anansi</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec Anansi sans jamais avoir ri de ses histoires. Vexé, il tisse une toile en travers de toute la route pour donner une leçon à tout le monde — <b>la grande farce d'Anansi</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもアナンシと歩いていながら、その話に一度も笑わなかった。気を悪くしたアナンシは道いっぱいに巣を張り、みなに思い知らせてやろうとする。<b>アナンシの大いたずら</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the oldest Anansi tales the spider is never truly evil, only endlessly hungry for status and stories, and he is regularly outwitted in turn by his own son Ntikuma or by animals who see his trick coming. Anansi crossed the Atlantic in the memory of enslaved Akan people, since a story could be carried in a way no possession could, and the same trickster is still called Anansi in Jamaica, Anansi in Suriname, and Aunt Nancy in the American South.|<b>Tras la historia:</b> en los relatos más antiguos de Anansi, la araña nunca es realmente malvada, solo insaciablemente ávida de estatus e historias, y con frecuencia es superada a su vez por su propio hijo Ntikuma o por animales que anticipan su treta. Anansi cruzó el Atlántico en la memoria de los akan esclavizados, porque un relato podía llevarse consigo de un modo que ninguna posesión podía, y el mismo embaucador se sigue llamando Anansi en Jamaica, Anansi en Surinam y Aunt Nancy en el sur de Estados Unidos.|<b>Derrière l'histoire :</b> dans les contes les plus anciens, l'araignée n'est jamais vraiment mauvaise, seulement insatiablement avide de statut et d'histoires, et elle se fait régulièrement rouler à son tour par son propre fils Ntikuma ou par des animaux qui voient venir son piège. Anansi traversa l'Atlantique dans la mémoire des Akan réduits en esclavage, car une histoire pouvait s'emporter d'une manière qu'aucun bien ne le pouvait, et le même filou s'appelle encore Anansi en Jamaïque, Anansi au Surinam et Aunt Nancy dans le sud des États-Unis.|<b>物語の背景:</b> もっとも古いアナンシ物語では、このクモは本当に悪ではなく、ただ地位と物語に対して底なしの渇望を抱いているだけとされ、実の息子ンティクマや、罠を見抜いた動物たちにしばしば逆に出し抜かれる。アナンシは、奴隷にされたアカンの人々の記憶に乗って大西洋を渡った。物語は、どんな持ち物とも違うやり方で持ち運べたからである。同じ知恵者はいまもジャマイカではアナンシ、スリナムではアナンシ、アメリカ南部ではアント・ナンシーと呼ばれている。",
  ),
  pleased: t(
    "He lowers a single gold nugget on a thread of silk, chuckling at his own generosity. <b>{0}</b> gains <span class='money'>+{1}</span>.|Baja una pepita de oro sujeta a un hilo de seda, riéndose de su propia generosidad. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il fait descendre une pépite d'or au bout d'un fil de soie, riant de sa propre générosité. <b>{0}</b> gagne <span class='money'>+{1}</span>.|一筋の糸に金塊をひとつ吊るして下ろし、自分の気前のよさに一人笑う。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A sankofa pendant catches the light where he can see it, and Anansi — who respects anyone smart enough to carry proof they already learned his lesson — skitters past <b>{0}</b> without a word this turn.|Un colgante sankofa capta la luz donde él puede verlo, y Anansi —que respeta a quien es lo bastante listo como para llevar la prueba de haber aprendido ya su lección— pasa corriendo junto a <b>{0}</b> sin decir nada esta vuelta.|Un pendentif sankofa accroche la lumière bien en vue, et Anansi — qui respecte quiconque est assez malin pour porter la preuve d'avoir déjà retenu sa leçon — détale devant <b>{0}</b> sans un mot ce tour-ci.|サンコファのペンダントが目につくところで光を返すと、すでに自分の教訓を学んだ証を身につけるほど賢い相手には敬意を払うアナンシは、このターン何も言わずに <b>{0}</b> の前を走り去った。",
  ),
};

/** 災難7種。アナンシのいたずら好きな性格に合わせ、ちょっとした災難を明るめに書いてある。 */
export const GHANA_DOOM = [
  {
    id: "matecall",
    n: t("The mate calls a different destination|El mate anuncia otro destino|Le mate annonce une autre destination|助手(メイト)が違う行き先を叫ぶ"),
    t: t(
      "The hand signal at the roadside looked exactly like the one for the intended stop, and it was only after ten minutes wedged between market bags and a sack of yams that the conductor's shouted stops made it clear this tro-tro was going nowhere near it. Getting back means paying the fare twice, once for the wrong direction and once for the right one.|La seña que se hizo al borde de la vía parecía exactamente la del destino previsto, y solo tras diez minutos encajado entre bolsas del mercado y un saco de ñame quedó claro, por las paradas que gritaba el cobrador, que aquel tro-tro no iba ni cerca. Volver significa pagar el pasaje dos veces, una por la dirección equivocada y otra por la correcta.|Le signe fait au bord de la route ressemblait exactement à celui de la destination prévue, et ce n'est qu'après dix minutes coincé entre des sacs de marché et un sac d'ignames que les arrêts criés par le receveur ont révélé que ce tro-tro n'allait pas du tout par là. Faire demi-tour signifie payer le trajet deux fois, une pour la mauvaise direction et une pour la bonne.|道端で出した手のサインは目指す行き先のものとまったく同じに見えたが、市場の袋とヤムイモの俵に挟まれて10分ほど経ってから、助手が叫ぶ停留所の名前でこのトロトロがまったく別方向へ向かっていることがはっきりした。戻るには運賃を二度払うことになる。間違った方向への分と、正しい方向への分と。",
    ),
  },
  {
    id: "dumsor",
    n: t("Dumsor cuts the power|El dumsor corta la luz|Le dumsor coupe le courant|ダムソーで停電になる"),
    t: t(
      "The lights went out with no warning at exactly the hour the freezer was fullest, part of the rolling blackouts Ghanaians have nicknamed 'dumsor' — Twi for 'off, then on' — after the power authority's habit of rationing supply on a schedule nobody outside the building seems to know in advance. By the time the line hums back to life, everything that needed to stay cold has not.|Las luces se fueron sin previo aviso justo cuando el congelador estaba más lleno, parte de los apagones rotativos que los ghaneses apodan 'dumsor' —en twi, 'apagado, luego encendido'— por la costumbre de la compañía eléctrica de racionar el suministro con un horario que nadie fuera del edificio parece conocer de antemano. Para cuando la línea vuelve a zumbar, todo lo que debía mantenerse frío ya no lo está.|Les lumières se sont éteintes sans prévenir juste à l'heure où le congélateur était le plus plein, épisode des coupures tournantes que les Ghanéens surnomment 'dumsor' — en twi, « éteint, puis allumé » — d'après l'habitude de la compagnie d'électricité de rationner le courant selon un horaire que personne en dehors du siège ne semble connaître à l'avance. Le temps que la ligne se remette à bourdonner, tout ce qui devait rester froid ne l'est plus.|冷凍庫がいちばんいっぱいだったちょうどそのとき、前触れもなく灯りが消えた。電力会社が外部の誰にも事前に分からない予定で供給を制限する癖から、ガーナ人が「ダムソー」(トウィ語で「消えて、また点く」の意)と呼ぶ計画停電の一幕である。送電が再びうなりを上げて戻る頃には、冷たいままでなければならなかったものはもう冷たくない。",
    ),
  },
  {
    id: "harmattanhaze",
    n: t("Harmattan haze grounds the flight|La bruma del harmatán retiene el vuelo|La brume de l'harmattan cloue l'avion au sol|ハルマッタンの砂塵で足止めされる"),
    t: t(
      "A wall of Sahara dust rolled in overnight and cut visibility at the airport so far below minimum that departures simply stopped, the runway lights swallowed in a haze the colour of weak tea. Airlines quietly build a Harmattan buffer into their December and January schedules for exactly this reason, and this was the week it was needed.|Una muralla de polvo del Sahara llegó durante la noche y redujo la visibilidad en el aeropuerto muy por debajo del mínimo, así que las salidas simplemente se detuvieron, con las luces de la pista tragadas por una bruma del color de un té aguado. Las aerolíneas incluyen discretamente un margen de harmatán en sus horarios de diciembre y enero precisamente por esto, y esa fue la semana en que hizo falta.|Un mur de poussière saharienne est arrivé pendant la nuit et a réduit la visibilité à l'aéroport bien en dessous du minimum, si bien que les départs se sont simplement arrêtés, les feux de piste noyés dans une brume couleur de thé léger. Les compagnies aériennes prévoient discrètement une marge harmattan dans leurs horaires de décembre et janvier, justement pour cette raison, et c'est cette semaine-là qu'elle a servi.|一夜のうちにサハラの砂埃の壁が押し寄せ、空港の視程は最低限度をはるかに下回り、出発便はすべて止まった。滑走路の灯りは薄い紅茶のような色の霞に飲み込まれていた。航空各社はまさにこのためにひそかに12月と1月のダイヤにハルマッタンの余裕を組み込んでいるが、その余裕が実際に必要になった週だった。",
    ),
  },
  {
    id: "owarebet",
    n: t("A wagered game of oware, lost|Una partida de oware con apuesta, perdida|Une partie d'oware pariée, perdue|賭けたオワレの一局に負ける"),
    t: t(
      "The two players had agreed a small stake before the first seed was ever sown, the way a friendly game under the mango tree can turn serious without anyone quite deciding it should, and the pits emptied one after another faster than the losing side could talk the bet back down. Oware itself — also called ayo — is simply a board game of skill played across West Africa with carved wooden boards and captured seeds; it was the coins set aside beforehand, not the game, that turned this particular match into a gamble.|Los dos jugadores habían acordado una pequeña apuesta antes de sembrar la primera semilla, tal como una partida amistosa bajo el árbol de mango a veces se pone seria sin que nadie decida bien cuándo, y los hoyos se fueron vaciando uno tras otro más deprisa de lo que el lado perdedor pudo negociar a la baja la apuesta. El oware en sí —también llamado ayo— es simplemente un juego de mesa de habilidad que se juega por toda África Occidental con tableros de madera tallada y semillas capturadas; fueron las monedas puestas aparte de antemano, y no el juego, lo que convirtió esta partida en concreto en una apuesta.|Les deux joueurs avaient convenu d'une petite mise avant même que la première graine ne soit semée, comme une partie amicale sous le manguier peut parfois devenir sérieuse sans que personne ne décide vraiment à quel moment, et les trous se sont vidés les uns après les autres plus vite que le camp perdant n'a pu renégocier la mise à la baisse. L'oware lui-même — aussi appelé ayo — est simplement un jeu de plateau d'adresse joué dans toute l'Afrique de l'Ouest avec des plateaux de bois sculpté et des graines capturées ; ce sont les pièces mises de côté à l'avance, et non le jeu, qui ont transformé cette partie précise en pari.|二人の対局者は最初の種を蒔く前に、ささやかな賭け金で合意していた。マンゴーの木の下の気楽な対局が、誰がそう決めたわけでもないのに本気の勝負に変わることがあるのと同じである。穴は次々と空になっていき、負けている側が賭け金を値切る間もないほど速かった。オワレそのもの――「アヨ」とも呼ばれる――は、彫刻を施した木の盤と取った種を使って西アフリカ中で打たれる、ただの腕を競う盤上遊戯にすぎない。この一局を賭け事に変えたのは、あらかじめ脇に置かれた硬貨であって遊戯そのものではなかった。",
    ),
  },
  {
    id: "fantasycoffin",
    n: t("Giving way to a fisherman's funeral procession|Cediendo el paso al cortejo fúnebre de un pescador|Céder le passage au cortège funèbre d'un pêcheur|漁師の葬列に道を譲る"),
    t: t(
      "A fisherman was being carried to his rest inside a coffin carved and painted like the boat he had worked his whole life, trailed by a brass band and mourners in matching cloth walking at a funeral's own unhurried pace, and every car on the road simply waited rather than try to pass. Ga carpenters around Teshie and Nungua have built these 'proverb boxes' since the mid-twentieth century, shaping each one — a fish, a Bible, a cocoa pod, a hammer — to fit the particular life it was made to honour.|Un pescador era llevado a su descanso dentro de un ataúd tallado y pintado como el barco en el que había trabajado toda su vida, seguido de una banda de metales y dolientes con telas a juego caminando al paso pausado propio de un funeral, y todos los coches de la vía simplemente esperaron en lugar de intentar pasar. Los carpinteros ga de Teshie y Nungua llevan construyendo desde mediados del siglo XX estos «ataúdes proverbio», dando forma a cada uno —un pez, una Biblia, una mazorca de cacao, un martillo— según la vida concreta que debía honrar.|Un pêcheur était porté vers son dernier repos dans un cercueil sculpté et peint comme le bateau sur lequel il avait travaillé toute sa vie, suivi d'une fanfare et de personnes en deuil vêtues d'un même tissu marchant au rythme tranquille propre à un enterrement, et toutes les voitures se sont simplement arrêtées plutôt que de tenter de dépasser. Les menuisiers ga de Teshie et Nungua fabriquent depuis le milieu du XXe siècle ces « cercueils-proverbes », donnant à chacun — un poisson, une Bible, une cabosse de cacao, un marteau — la forme de la vie précise qu'il devait honorer.|一人の漁師が、生涯働いてきた船をかたどり彩色された棺に納められて、最後の眠りへと運ばれていった。ブラスバンドと揃いの布をまとった会葬者たちが葬儀ならではのゆっくりした足取りで続き、道にいた車はどれも追い越そうとせず、ただ待っていた。テシエやヌングアあたりのガ人の指物師たちは20世紀半ばから、魚やバイブル、カカオの実、金槌など、それぞれが弔うべき生涯の形に合わせてこの「諺の箱」と呼ばれる棺を作ってきた。",
    ),
  },
  {
    id: "mudroad",
    n: t("The rains turn the road to mud|Las lluvias convierten la vía en barro|Les pluies transforment la route en boue|雨で道がぬかるみに変わる"),
    t: t(
      "The laterite road that was hard-packed and orange that morning turned, after twenty minutes of rain, into a red mud that swallowed the tyres up to the axle, exactly why so many rural roads still wash out every rainy season regardless of how well they were graded in the dry months. A group of boys from the nearest village appeared with the practised speed of people who do this for a living, and pushed for a fee that felt entirely fair by the time the car was free.|La carretera de laterita que esa mañana estaba dura y compacta y de color anaranjado se convirtió, tras veinte minutos de lluvia, en un barro rojo que se tragó las ruedas hasta el eje, precisamente la razón por la que tantas vías rurales se siguen deshaciendo cada temporada de lluvias sin importar lo bien niveladas que estuvieran en los meses secos. Un grupo de chicos del pueblo más cercano apareció con la rapidez de quien vive de esto, y empujaron a cambio de una tarifa que, para cuando el coche quedó libre, pareció del todo justa.|La route en latérite qui était dure et orangée ce matin-là s'est transformée, après vingt minutes de pluie, en une boue rouge engloutissant les roues jusqu'à l'essieu, exactement la raison pour laquelle tant de routes rurales continuent de se dégrader chaque saison des pluies, aussi bien nivelées soient-elles pendant les mois secs. Un groupe de garçons du village le plus proche est arrivé avec la rapidité rodée de ceux qui vivent de cela, et ont poussé contre une somme qui, une fois la voiture dégagée, a paru tout à fait juste.|その朝は硬く締まってオレンジ色をしていたラテライトの道は、雨が20分降っただけで車輪を車軸まで飲み込む赤い泥に変わった。乾季にどれほどよく整地しても、雨季のたびに多くの地方道が同じように崩れる理由がまさにこれである。近くの村の少年たちが、これを生業にしている者らしい手慣れた速さで現れ、押し出してくれた。車が抜け出た頃には、その代金はまったく正当に思えた。",
    ),
  },
  {
    id: "pickpocket",
    n: t("A pickpocket works the market crowd|Un carterista trabaja entre la multitud del mercado|Un pickpocket travaille la foule du marché|市場の人混みでスリに遭う"),
    t: t(
      "The crowd at the market was thick enough that a shoulder bag brushing past twice barely registered as anything but the ordinary crush of a Saturday, and it was only at the taxi rank, reaching for cash, that the missing wallet became obvious. Traders nearby offered the same advice they give every visitor who asks after the fact: keep it in a front pocket, and never where anyone walking behind you can watch your hand go.|La multitud en el mercado era tan densa que un bolso rozando dos veces apenas se notó entre el ajetreo normal de un sábado, y solo en la parada de taxis, al buscar dinero, se hizo evidente que faltaba la cartera. Los comerciantes cercanos dieron el mismo consejo que dan a todo visitante que pregunta después de los hechos: llevarla en el bolsillo delantero, y nunca donde alguien que camine detrás pueda ver adónde va la mano.|La foule du marché était si dense qu'un sac à bandoulière frôlé deux fois passait à peine pour autre chose que la cohue ordinaire d'un samedi, et ce n'est qu'à la station de taxis, en cherchant de l'argent, que le portefeuille manquant est devenu évident. Les commerçants alentour ont donné le même conseil qu'ils donnent à tout visiteur qui demande après coup : le garder dans une poche avant, jamais là où quelqu'un marchant derrière peut voir la main s'y glisser.|市場の人混みはあまりに濃く、肩掛け鞄が二度かすめられても、いつもの土曜の雑踏としか感じられなかった。タクシー乗り場で現金を出そうとして初めて、財布が消えていることに気づいた。近くの商人たちは、事が起きたあとに尋ねるすべての客に言うのと同じ助言をくれた。前ポケットに入れておくこと、そして後ろを歩く誰かに手の動きを見られる場所には決して入れないこと。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国と同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の ghana の項)。
 */
export const GHANA_SEASONS = [
  {
    e: "🪂",
    n: t("Easter on the Kwahu escarpment|La Pascua en la escarpa de Kwahu|Pâques sur l'escarpement de Kwahu|クワフェ断崖の復活祭"),
    t: t(
      "Easter week sends tens of thousands of Ghanaians up onto the Kwahu plateau for a week of church conventions, family reunions and street parties that drew crowds long before anyone launched a paraglider off the escarpment above Atibie. The rains that will define the next two months typically break this month too, turning red dust to mud almost overnight across the south.|La semana de Pascua lleva a decenas de miles de ghaneses a la meseta de Kwahu para una semana de convenciones religiosas, reencuentros familiares y fiestas callejeras que atraían multitudes mucho antes de que nadie despegara en parapente desde el escarpe sobre Atibie. Las lluvias que marcarán los próximos dos meses también suelen empezar este mes, convirtiendo el polvo rojo en barro casi de la noche a la mañana en todo el sur.|La semaine de Pâques fait monter des dizaines de milliers de Ghanéens sur le plateau de Kwahu pour une semaine de conventions religieuses, de retrouvailles familiales et de fêtes de rue qui attiraient déjà les foules bien avant qu'on ne décolle en parapente depuis l'escarpement au-dessus d'Atibie. Les pluies qui définiront les deux prochains mois se déclenchent en général aussi ce mois-ci, transformant la poussière rouge en boue presque du jour au lendemain dans tout le sud.|復活祭の週には何万人ものガーナ人がクワフェ高原へ登り、教会の大会や家族の再会、街頭のお祭りで一週間を過ごす。これはアティビエ上方の断崖からパラグライダーが飛ぶようになるずっと前から人を集めていた。この先二ヶ月を決定づける雨も例年この月に始まり、南部各地で赤い砂埃がほとんど一夜にして泥へと変わる。",
    ),
    f: t(
      "The Kwahu Easter paragliding festival only began in 2005, making it a recent addition to a week of celebration that Kwahu families and churches had already been keeping for generations.|El festival de parapente de Pascua en Kwahu solo comenzó en 2005, una incorporación reciente a una semana de celebración que las familias e iglesias de Kwahu ya guardaban desde hacía generaciones.|Le festival de parapente de Pâques à Kwahu n'a commencé qu'en 2005, ajout récent à une semaine de célébration que les familles et les églises de Kwahu observaient déjà depuis des générations.|クワフェ・イースター・パラグライディング祭が始まったのは2005年に過ぎず、クワフェの家族や教会が何世代も前から続けてきた祝いの週に、比較的最近加わったものである。",
    ),
  },
  {
    e: "🌱",
    n: t("The rains settle in|Las lluvias se asientan|Les pluies s'installent|雨季が本格化する"),
    t: t(
      "The south's major rainy season peaks this month, with forest and cocoa farms turning a deep, saturated green and the rivers feeding Lake Volta visibly rising. Farmers race to finish planting maize and cassava before the heaviest downpours make the unpaved roads between farms impassable.|La principal temporada de lluvias del sur alcanza su punto álgido este mes, con el bosque y las fincas de cacao tornándose de un verde profundo y saturado, y los ríos que alimentan el lago Volta subiendo visiblemente. Los agricultores corren para terminar de sembrar maíz y mandioca antes de que los aguaceros más fuertes vuelvan intransitables las vías sin asfaltar entre las fincas.|La grande saison des pluies du sud atteint son pic ce mois-ci, la forêt et les plantations de cacao virant à un vert profond et saturé, tandis que les rivières alimentant le lac Volta montent visiblement. Les agriculteurs se pressent de finir de planter maïs et manioc avant que les averses les plus fortes ne rendent impraticables les pistes non goudronnées entre les fermes.|南部の大雨季は今月にピークを迎え、森とカカオ畑は深く濃い緑に色づき、ボルタ湖に注ぐ川の水位も目に見えて上がる。農家は、いちばん激しい雨で畑と畑を結ぶ未舗装路が通れなくなる前に、トウモロコシとキャッサバの植え付けを終えようと急ぐ。",
    ),
    f: t(
      "Ghana's cocoa trees actually flower twice a year, but it is this rainy start to the season that most determines the size of the main October harvest months later.|Los cacaoteros de Ghana en realidad florecen dos veces al año, pero es este inicio lluvioso de la temporada el que más determina el tamaño de la cosecha principal de octubre, meses después.|Les cacaoyers du Ghana fleurissent en réalité deux fois par an, mais c'est ce démarrage pluvieux de la saison qui détermine le plus la taille de la récolte principale d'octobre, des mois plus tard.|ガーナのカカオの木は実は年に二度花を咲かせるが、数か月後にやってくる10月の主要な収穫量を最も左右するのは、この雨季の始まりである。",
    ),
  },
  {
    e: "🎣",
    n: t("A lull between the rains|Una pausa entre lluvias|Une accalmie entre les pluies|雨のあいまの小休止"),
    t: t(
      "Rainfall eases briefly this month across much of the south, and along the coast the main tuna and sardine fishing season is in full swing, with brightly painted canoes returning loaded before noon. Schools break for a short mid-year holiday, timed to this calmer stretch of weather.|Las lluvias amainan brevemente este mes en buena parte del sur, y a lo largo de la costa la principal temporada de pesca de atún y sardina está en pleno apogeo, con canoas de colores vivos que regresan cargadas antes del mediodía. Las escuelas hacen un breve receso de mitad de año, coincidiendo con este tramo más calmado del clima.|Les pluies s'apaisent brièvement ce mois-ci sur une grande partie du sud, et le long de la côte, la principale saison de pêche au thon et à la sardine bat son plein, avec des pirogues aux couleurs vives qui reviennent chargées avant midi. Les écoles font une courte pause de milieu d'année, calée sur cette accalmie du temps.|今月は南部の大半で雨が一時弱まり、海岸沿いではマグロとイワシの主要漁期が最盛期を迎え、鮮やかに塗られたカヌーが正午前には満載で戻ってくる。学校はこの落ち着いた天候の時期に合わせて短い中間休みに入る。",
    ),
    f: t(
      "Ghana's canoe fishing fleet is still mostly unmotorised or lightly motorised, built as wooden boats painted with proverbs and Bible verses along the hull rather than registration numbers alone.|La flota de pesca con canoa de Ghana sigue siendo en su mayoría sin motor o con motor ligero: barcas de madera pintadas a lo largo del casco con proverbios y versículos bíblicos, y no solo con números de registro.|La flotte de pêche en pirogue du Ghana reste majoritairement non motorisée ou faiblement motorisée : des barques en bois peintes le long de la coque de proverbes et de versets bibliques, plutôt que de simples numéros d'immatriculation.|ガーナのカヌー漁船団はいまも大半が無動力か、あってもごく小さな船外機付きで、木造の船体には登録番号だけでなく諺や聖書の一節が描かれている。",
    ),
  },
  {
    e: "☁️",
    n: t("The August break begins|Comienza el respiro de agosto|La pause d'août commence|「八月の休み」が始まる"),
    t: t(
      "A short dry spell known locally as the August break sets in along the coast this month, clearing enough that a cool, overcast sky sometimes hides the sun for days at a stretch rather than rain outright. Cocoa farmers use the gap to clear weeds from between the trees before the smaller, secondary rains return in September.|Un breve período seco conocido localmente como el 'respiro de agosto' se instala en la costa este mes, despejando lo suficiente como para que un cielo fresco y nublado a veces oculte el sol durante días seguidos en lugar de llover directamente. Los cacaoteros aprovechan la pausa para desherbar entre los árboles antes de que regresen en septiembre las lluvias secundarias, más cortas.|Une courte accalmie connue localement sous le nom de pause d'août s'installe le long de la côte ce mois-ci, dégageant suffisamment le ciel pour qu'un temps frais et couvert masque parfois le soleil plusieurs jours d'affilée plutôt que de pleuvoir franchement. Les cacaoculteurs profitent de ce répit pour désherber entre les arbres avant le retour, en septembre, des petites pluies secondaires.|地元で「八月の休み」と呼ばれる短い乾いた時期が今月、海岸沿いに始まる。雨そのものよりも、涼しく曇った空が何日も続けて太陽を隠すほど天候が落ち着く。カカオ農家はこの合間を使って、9月に戻ってくる短い小雨季の前に木々のあいだの雑草を払う。",
    ),
    f: t(
      "The August break is a genuine meteorological feature of the Guinea Coast climate, driven by the same shift in Atlantic winds that also cools the sea enough to trigger a small seasonal upwelling offshore.|El respiro de agosto es un fenómeno meteorológico real del clima de la costa de Guinea, impulsado por el mismo cambio en los vientos atlánticos que también enfría el mar lo suficiente como para provocar una pequeña surgencia estacional en alta mar.|La pause d'août est un véritable phénomène météorologique du climat de la côte de Guinée, provoqué par le même changement des vents atlantiques qui refroidit aussi assez la mer pour déclencher une petite remontée d'eau saisonnière au large.|「八月の休み」はギニア海岸の気候に実際に見られる気象現象で、海をわずかに冷やして沖合に小さな季節性の湧昇を起こすのと同じ大西洋の風向きの変化によって生じる。",
    ),
  },
  {
    e: "🍲",
    n: t("Homowo hoots at hunger|El Homowo se burla del hambre|Le Homowo se moque de la faim|ホモウォ、飢えを笑い飛ばす祭"),
    t: t(
      "The Ga people of the Accra coast mark Homowo — 'hooting at hunger' — this month, remembering a historic famine that a good harvest finally broke, by ceremonially sprinkling a dish of steamed corn and palm-nut soup called kpokpoi at the doorstep before anyone else is served. Drumming and dancing fill Ga neighbourhoods like Jamestown and La for days, and a strict ban on loud noise observed in the weeks before the festival is lifted all at once.|El pueblo ga de la costa de Acra celebra este mes el Homowo —'burlarse del hambre'—, en recuerdo de una hambruna histórica que finalmente rompió una buena cosecha, esparciendo ceremonialmente un plato de maíz al vapor y sopa de nuez de palma llamado kpokpoi en el umbral antes de servir a nadie más. Tambores y bailes llenan barrios ga como Jamestown y La durante días, y una estricta prohibición del ruido, observada en las semanas previas al festival, se levanta de golpe.|Le peuple ga de la côte d'Accra célèbre ce mois-ci le Homowo — « se moquer de la faim » —, en souvenir d'une famine historique qu'une bonne récolte finit par vaincre, en répandant cérémonieusement sur le seuil un plat de maïs cuit à la vapeur et de soupe de noix de palme appelé kpokpoi, avant de servir quiconque d'autre. Tambours et danses envahissent des quartiers ga comme Jamestown et La pendant des jours, et l'interdiction stricte du bruit observée dans les semaines précédant le festival est levée d'un coup.|アクラ沿岸のガ人は今月、「飢えを笑い飛ばす」を意味するホモウォを祝う。かつての飢饉が豊作でついに終わったことを記念し、蒸しトウモロコシとパーム椰子の実のスープ「クポクピ」を、他の誰にも供する前に儀式として戸口にまく。太鼓と踊りがジェームスタウンやラといったガ人の街を何日も満たし、祭りの数週間前から守られてきた厳格な騒音禁止令が一気に解かれる。",
    ),
    f: t(
      "The ban on drumming that precedes Homowo, observed for about a month beforehand in Ga areas, is traditionally explained as giving the ancestors quiet before the noisy celebration that follows.|La prohibición de tocar tambores que precede al Homowo, observada durante aproximadamente un mes antes en las zonas ga, se explica tradicionalmente como dar silencio a los ancestros antes de la ruidosa celebración que sigue.|L'interdiction de tambouriner qui précède le Homowo, observée environ un mois auparavant dans les zones ga, s'explique traditionnellement par le besoin de laisser les ancêtres en paix avant la célébration bruyante qui suit.|ホモウォに先立ち、ガ人の地域でおよそ一か月前から守られる太鼓禁止の慣わしは、伝統的には、そのあとに続く騒がしい祝祭の前に祖先へ静けさを差し出すためだと説明される。",
    ),
  },
  {
    e: "🍠",
    n: t("The short rains and the new yam|Las lluvias cortas y el ñame nuevo|Les pluies courtes et le nouvel igname|小雨季と新ヤムイモ"),
    t: t(
      "A second, shorter rainy season begins across the south this month, and the first yams of the year start reaching markets, marking the run-up to new yam festivals held across Akan communities before anyone is meant to eat the new harvest without first offering some of it to the ancestors. In Akuapem, the Odwira festival opens the same season with a week of purification rites for the stools of past chiefs.|Una segunda temporada de lluvias, más corta, comienza este mes en todo el sur, y los primeros ñames del año empiezan a llegar a los mercados, marcando el preludio de los festivales del ñame nuevo celebrados en las comunidades akan antes de que nadie deba comer la nueva cosecha sin antes ofrecer parte de ella a los ancestros. En Akuapem, el festival Odwira abre la misma temporada con una semana de ritos de purificación para los taburetes de jefes pasados.|Une seconde saison des pluies, plus courte, débute ce mois-ci dans tout le sud, et les premiers ignames de l'année commencent à arriver sur les marchés, annonçant les festivals du nouvel igname tenus dans les communautés akan avant que quiconque ne soit censé manger la nouvelle récolte sans d'abord en offrir une part aux ancêtres. En Akuapem, le festival Odwira ouvre la même saison par une semaine de rites de purification pour les tabourets des chefs défunts.|南部各地で今月、二度目の短い雨季が始まり、その年最初のヤムイモが市場に出回り始める。新しい収穫を祖先に少し捧げてから初めて食べるという決まりのもと、アカンの各地で新ヤムイモ祭を迎える準備が整っていく。アクアペムでは同じ季節にオドウィラ祭が開かれ、歴代の首長の腰掛けを清める儀式が一週間続く。",
    ),
    f: t(
      "Eating the new yam before the festival that formally opens the season is traditionally considered bad luck in many Akan communities, whatever the actual harvest timing on a given farm.|Comer el ñame nuevo antes del festival que abre formalmente la temporada se considera tradicionalmente de mala suerte en muchas comunidades akan, sea cual sea el momento real de la cosecha en una finca dada.|Manger le nouvel igname avant le festival qui ouvre officiellement la saison est traditionnellement considéré comme portant malheur dans de nombreuses communautés akan, quel que soit le moment réel de la récolte sur une ferme donnée.|季節を正式に開く祭りより前に新ヤムイモを食べることは、実際の畑での収穫時期がどうであれ、多くのアカンの地域で伝統的に縁起が悪いとされる。",
    ),
  },
  {
    e: "🍫",
    n: t("The cocoa harvest begins|Empieza la cosecha de cacao|La récolte de cacao commence|カカオの収穫が始まる"),
    t: t(
      "The main cocoa crop, which supplies most of the country's export earnings, starts coming in this month, with farmers cracking open yellow-orange pods by hand and fermenting the wet beans under banana leaves for about a week before they are dried in the sun. Ghana usually ranks as the world's second-largest cocoa producer, and the price farmers are paid for this harvest is set by the government before a single pod is cut.|La principal cosecha de cacao, que aporta la mayor parte de las divisas de exportación del país, empieza a entrar este mes, con agricultores que abren a mano vainas de color naranja amarillento y fermentan los granos húmedos bajo hojas de plátano durante about una semana antes de secarlos al sol. Ghana suele ocupar el segundo puesto mundial como productor de cacao, y el precio que se paga a los agricultores por esta cosecha lo fija el gobierno antes de cortar una sola vaina.|La récolte principale de cacao, qui fournit l'essentiel des recettes d'exportation du pays, commence à rentrer ce mois-ci, les agriculteurs ouvrant à la main des cabosses jaune orangé et faisant fermenter les fèves humides sous des feuilles de bananier pendant environ une semaine avant de les sécher au soleil. Le Ghana se classe généralement deuxième producteur mondial de cacao, et le prix payé aux agriculteurs pour cette récolte est fixé par le gouvernement avant même qu'une seule cabosse ne soit coupée.|この国の輸出収入の大半を支える主要カカオの収穫が今月から始まる。農家は黄橙色の実を手で割り、湿った豆をバナナの葉の下で一週間ほど発酵させてから天日で乾かす。ガーナは例年、世界第2位のカカオ生産国であり、この収穫で農家に支払われる価格は、実を一つ切る前から政府によって定められている。",
    ),
    f: t(
      "Ghana pioneered a fixed, government-announced 'producer price' for cocoa specifically to protect farmers from swings in the world market, a system that has been in place in some form since the colonial era.|Ghana fue pionera en fijar un 'precio al productor' de cacao anunciado por el gobierno, precisamente para proteger a los agricultores de los vaivenes del mercado mundial, un sistema vigente de una forma u otra desde la época colonial.|Le Ghana a été pionnier d'un « prix au producteur » du cacao fixé et annoncé par le gouvernement, précisément pour protéger les agriculteurs des fluctuations du marché mondial, un système en place sous une forme ou une autre depuis l'époque coloniale.|ガーナは、世界市場の変動から農家を守るために政府が発表する固定の「生産者価格」制度を早くから導入した国であり、この仕組みは形を変えながら植民地時代から続いている。",
    ),
  },
  {
    e: "🌫️",
    n: t("Harmattan arrives and Hogbetsotso is danced|Llega el harmatán y se baila el Hogbetsotso|L'harmattan arrive et l'on danse le Hogbetsotso|ハルマッタンとホグベツォツォの舞"),
    t: t(
      "The first dry, dusty Harmattan winds off the Sahara begin reaching the north this month and will work their way south over the following weeks, while the Ewe people of the Volta region hold Hogbetsotso — the 'festival of exodus' — to re-enact their ancestors' historic migration from a walled and hostile town, complete with a mock escape through a symbolic hole in a wall.|Los primeros vientos secos y polvorientos del harmatán, procedentes del Sahara, empiezan a llegar al norte este mes e irán avanzando hacia el sur en las semanas siguientes, mientras el pueblo ewe de la región del Volta celebra el Hogbetsotso —el 'festival del éxodo'— para escenificar la histórica migración de sus ancestros desde una ciudad amurallada y hostil, con una fuga simulada a través de un agujero simbólico en un muro.|Les premiers vents secs et poussiéreux de l'harmattan, venus du Sahara, commencent à atteindre le nord ce mois-ci et gagneront le sud dans les semaines suivantes, tandis que le peuple ewe de la région de la Volta célèbre le Hogbetsotso — le « festival de l'exode » — pour rejouer la migration historique de ses ancêtres depuis une ville fortifiée et hostile, avec une fuite simulée à travers un trou symbolique percé dans un mur.|サハラから吹く乾いた砂埃混じりのハルマッタンの初風が今月、北部に届き始め、これから数週間かけて南下していく。一方ヴォルタ地方のエウェ人は「脱出の祭り」ホグベツォツォを催し、城壁に囲まれた敵対的な町から逃れた祖先の史実の移住を、壁に開けた象徴的な穴からの模擬脱出とともに再現する。",
    ),
    f: t(
      "Hogbetsotso's central story, of Ewe ancestors escaping a tyrannical king by tricking guards into thinking they were dancing backward rather than fleeing, is retold every year through the very steps of the festival's opening procession.|La historia central del Hogbetsotso, en la que los ancestros ewe escapan de un rey tiránico haciendo creer a los guardias que bailaban hacia atrás en vez de huir, se recrea cada año en los propios pasos de la procesión de apertura del festival.|L'histoire centrale du Hogbetsotso, celle d'ancêtres ewe échappant à un roi tyrannique en faisant croire aux gardes qu'ils dansaient à reculons plutôt que de fuir, est reracontée chaque année par les pas mêmes du cortège d'ouverture du festival.|エウェ人の祖先が、逃げているのではなく後ろ向きに踊っているのだと見張りに思い込ませて暴君の王から逃れたというホグベツォツォの中心的な物語は、毎年、祭りの開幕の行列の足取りそのものを通じて語り直される。",
    ),
  },
  {
    e: "🎄",
    n: t("Harmattan haze and Christmas lights|Bruma de harmatán y luces de Navidad|Brume de l'harmattan et lumières de Noël|ハルマッタンの霞とクリスマスの灯"),
    t: t(
      "Harmattan haze settles fully over the country this month, drying skin and throats and sometimes cutting visibility enough to delay flights, even as Christmas turns market streets in Accra and Kumasi into a crush of shoppers under coloured lights strung between shopfronts. Many families use the same week to travel to hometowns upcountry for both Christmas and the funerals that Ghanaian families often schedule for this crowded, everyone's-home season.|La bruma del harmatán se instala por completo sobre el país este mes, resecando piel y garganta y a veces reduciendo la visibilidad lo bastante como para retrasar vuelos, mientras la Navidad convierte las calles del mercado en Acra y Kumasi en una multitud de compradores bajo luces de colores tendidas entre los escaparates. Muchas familias aprovechan esa misma semana para viajar a sus pueblos del interior, tanto por la Navidad como por los funerales que las familias ghanesas suelen programar para esta temporada abarrotada en que todos están en casa.|La brume de l'harmattan s'installe pleinement sur le pays ce mois-ci, asséchant peau et gorges et réduisant parfois assez la visibilité pour retarder des vols, tandis que Noël transforme les rues commerçantes d'Accra et de Kumasi en une cohue d'acheteurs sous des guirlandes lumineuses tendues entre les devantures. Beaucoup de familles profitent de cette même semaine pour rejoindre leur ville natale à l'intérieur du pays, à la fois pour Noël et pour les funérailles que les familles ghanéennes programment souvent pour cette saison où tout le monde rentre.|今月はハルマッタンの霞が国全体を完全に覆い、肌と喉を乾かし、時には視界を悪くして便を遅らせるほどになる。それでもクリスマスはアクラやクマシの市場通りを、店先に渡された色とりどりの電飾の下で買い物客がひしめく光景に変える。多くの家族はこの同じ週を使って地方の故郷へ帰る。クリスマスのためでもあり、皆が家に戻るこの混み合う季節に合わせてガーナの家族がよく葬儀を組む、その葬儀のためでもある。",
    ),
    f: t(
      "Scheduling funerals for the December holiday period, specifically so that relatives working abroad or in other regions can attend, is common enough in Ghana that some hometowns hold several elaborate funerals on the very same weekend.|Programar funerales para el período de vacaciones de diciembre, específicamente para que puedan asistir familiares que trabajan en el extranjero u otras regiones, es tan común en Ghana que algunos pueblos celebran varios funerales elaborados el mismo fin de semana.|Programmer des funérailles pour la période des fêtes de décembre, précisément pour permettre aux proches travaillant à l'étranger ou dans d'autres régions d'y assister, est si courant au Ghana que certaines villes natales organisent plusieurs funérailles élaborées le même week-end.|海外や他の地域で働く親族が参列できるようにと、あえて12月の休暇期間に葬儀を組むことはガーナでは十分にありふれており、同じ週末に手の込んだ葬儀がいくつも重なる故郷の町もある。",
    ),
  },
  {
    e: "🏜️",
    n: t("The driest, dustiest weeks of the year|Las semanas más secas y polvorientas del año|Les semaines les plus sèches et poussiéreuses de l'année|一年でいちばん乾いて埃っぽい季節"),
    t: t(
      "Harmattan usually peaks this month, humidity dropping so low that wooden furniture and guitar necks crack unless someone leaves a bowl of water in the room, while up north the dry season has already turned Guinea savanna grass the colour of straw and shrunk the smaller rivers to a trickle. Cocoa farmers keep drying last season's beans on raised mats, taking advantage of the very air that makes everything else in the house creak.|El harmatán suele alcanzar su punto máximo este mes, con una humedad tan baja que los muebles de madera y los mástiles de guitarra se agrietan si nadie deja un cuenco de agua en la habitación, mientras que en el norte la estación seca ya ha vuelto la hierba de la sabana de Guinea del color de la paja y ha reducido los ríos menores a un hilo. Los cacaoteros siguen secando los granos de la temporada pasada sobre esteras elevadas, aprovechando el mismo aire que hace crujir todo lo demás de la casa.|L'harmattan atteint généralement son pic ce mois-ci, l'humidité chutant si bas que les meubles en bois et les manches de guitare se fendent si personne ne laisse un bol d'eau dans la pièce, tandis qu'au nord la saison sèche a déjà donné à l'herbe de la savane guinéenne la couleur de la paille et réduit les petites rivières à un filet. Les cacaoculteurs continuent de faire sécher les fèves de la saison passée sur des claies surélevées, profitant de ce même air qui fait craquer tout le reste de la maison.|ハルマッタンは例年今月にピークを迎え、湿度は木製の家具やギターの棹が誰かが部屋に水を張った器を置いておかない限りひび割れるほど下がる。北部ではすでに乾季がギニアサバンナの草を藁色に変え、小さな川を細い流れにまで減らしている。カカオ農家は、家の中の何もかもをきしませるその同じ空気を利用して、前季の豆を高床の台の上で乾かし続ける。",
    ),
    f: t(
      "The word Harmattan is generally thought to come from a word for the dry-season wind itself in a Guinean or Akan language, adapted by European traders on the coast centuries ago and then carried into English almost unchanged.|Se cree generalmente que la palabra 'harmatán' proviene de un término para el propio viento de la estación seca en una lengua guineana o akan, adaptado por comerciantes europeos en la costa hace siglos y llevado al inglés casi sin cambios.|On pense généralement que le mot harmattan vient d'un terme désignant le vent de saison sèche lui-même dans une langue guinéenne ou akan, adapté par des marchands européens sur la côte il y a des siècles puis transmis presque tel quel à l'anglais.|「ハルマッタン」という語は一般に、ギニアかアカン系の言語で乾季の風そのものを指す言葉に由来するとされ、何世紀も前に海岸のヨーロッパ商人たちが取り入れ、ほぼそのままの形で英語に伝わったと考えられている。",
    ),
  },
  {
    e: "🍫",
    n: t("National Chocolate Day|El Día Nacional del Chocolate|La Journée nationale du chocolat|ナショナル・チョコレート・デー"),
    t: t(
      "Ghana has marked 14 February as National Chocolate Day since 2005, a deliberate government push to get a country that grows the beans to actually eat some of the finished chocolate, most of which has historically been exported abroad to be processed and sold back at a markup. Harmattan haze begins to lift toward the end of the month as the wind shifts, and the first mango blossoms appear on trees that will fruit by April.|Ghana celebra el 14 de febrero como Día Nacional del Chocolate desde 2005, un impulso deliberado del gobierno para que un país que cultiva los granos llegue a comer algo del chocolate terminado, que históricamente se ha exportado en su mayoría para procesarlo y revenderlo con recargo. La bruma del harmatán empieza a levantarse hacia final de mes al cambiar el viento, y aparecen las primeras flores del mango en árboles que darán fruto hacia abril.|Le Ghana célèbre le 14 février comme Journée nationale du chocolat depuis 2005, initiative délibérée du gouvernement pour qu'un pays qui cultive les fèves finisse par manger un peu du chocolat fini, historiquement exporté pour l'essentiel afin d'être transformé puis revendu à prix majoré. La brume de l'harmattan commence à se lever vers la fin du mois avec le changement de vent, et les premières fleurs de manguier apparaissent sur les arbres qui fructifieront d'ici avril.|ガーナは2005年から2月14日を「ナショナル・チョコレート・デー」と定めている。豆を育てる国自身が、歴史的に多くが海外へ輸出され加工されて割高で売り戻されてきた完成品のチョコレートを実際に食べるようにという、政府による意図的な後押しである。月の終わり頃には風向きが変わってハルマッタンの霞が晴れ始め、4月には実をつけるマンゴーの木に最初の花が咲く。",
    ),
    f: t(
      "Ghana still processes only a small share of its own cocoa into finished chocolate domestically, so National Chocolate Day doubles as a campaign to grow that share rather than simply a sweet-toothed holiday.|Ghana todavía transforma en chocolate terminado solo una pequeña parte de su propio cacao dentro del país, así que el Día Nacional del Chocolate funciona también como campaña para aumentar esa proporción, no solo como una fiesta para golosos.|Le Ghana ne transforme encore qu'une faible part de son propre cacao en chocolat fini sur son sol, si bien que la Journée nationale du chocolat sert aussi de campagne pour accroître cette part, et pas seulement de fête pour les gourmands.|ガーナはいまも自国産カカオのごく一部しか国内で完成品のチョコレートに加工しておらず、ナショナル・チョコレート・デーは単に甘党のための祝日というより、その割合を増やすための運動を兼ねている。",
    ),
  },
  {
    e: "⭐",
    n: t("Independence Day|Día de la Independencia|Fête de l'indépendance|独立記念日"),
    t: t(
      "6 March marks the anniversary of the 1957 declaration that made Ghana the first sub-Saharan African country to win independence from colonial rule, marked nationwide with school parades, marching bands and speeches, largest of all at Independence Square in Accra where the declaration itself was made. The hot, dry season is near its peak by now, and everyone is watching the sky for the first proper rains of the new year, expected within weeks.|El 6 de marzo marca el aniversario de la declaración de 1957 que convirtió a Ghana en el primer país del África subsahariana en lograr la independencia del dominio colonial, celebrado en todo el país con desfiles escolares, bandas y discursos, el mayor de todos en la Plaza de la Independencia de Acra, donde se hizo la propia declaración. La estación cálida y seca está ya cerca de su punto máximo, y todos vigilan el cielo esperando las primeras lluvias serias del nuevo año, previstas dentro de pocas semanas.|Le 6 mars marque l'anniversaire de la déclaration de 1957 qui fit du Ghana le premier pays d'Afrique subsaharienne à obtenir son indépendance de la tutelle coloniale, célébré dans tout le pays par des défilés scolaires, des fanfares et des discours, le plus grand de tous se tenant sur la place de l'Indépendance à Accra, où la déclaration elle-même fut prononcée. La saison chaude et sèche approche déjà de son pic, et chacun scrute le ciel dans l'attente des premières vraies pluies de la nouvelle année, prévues d'ici quelques semaines.|3月6日は、ガーナをサハラ以南アフリカで最初にヨーロッパの支配から独立させた1957年の宣言の記念日である。全国各地で学校のパレードやマーチングバンド、演説が行われ、なかでも最大のものは、その宣言自体が行われたアクラの独立広場で催される。暑く乾いた季節はこの頃すでにほぼピークに達しており、誰もが数週間後に見込まれる新しい年の最初の本格的な雨を空に探している。",
    ),
    f: t(
      "Ghana's Independence Day parades are held in every town with a school, not only in Accra, so the largest audience for the anniversary in any given year is often not in the capital at all but wherever that year's national parade has been assigned.|Los desfiles del Día de la Independencia de Ghana se celebran en cada pueblo que tiene una escuela, no solo en Acra, así que el público más numeroso del aniversario en un año dado a menudo no está en la capital, sino donde se haya asignado el desfile nacional de ese año.|Les défilés de la fête de l'indépendance du Ghana ont lieu dans chaque ville dotée d'une école, pas seulement à Accra, si bien que le plus grand public de l'anniversaire une année donnée ne se trouve souvent pas dans la capitale, mais là où le défilé national de l'année a été organisé.|ガーナの独立記念日のパレードはアクラだけでなく学校のあるあらゆる町で行われるため、その年いちばん多くの人が見物する記念式典は、首都ではなくその年の全国式典の開催地に当たった町であることも多い。",
    ),
  },
];
