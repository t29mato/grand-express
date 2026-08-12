/**
 * ドイツの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・韓国・フランス・インドと同じく「地方まるごとの好不況」で差をつける。
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

export const GERMANY_META = {
  id: "germany",
  name: t("Germany|Alemania|Allemagne|ドイツ"),
  blurb: t(
    "A land of castle turrets and cathedral spires, half-timbered market towns and a capital that tore down the wall it once built|Una tierra de torres de castillo y agujas de catedral, pueblos de entramado de madera y una capital que derribó el muro que ella misma alzó|Une terre de tourelles de château et de flèches de cathédrale, de bourgs à colombages et d'une capitale qui abattit le mur qu'elle avait dressé|尖塔の城とゴシックの大聖堂、木組みの町並みが連なり、首都は自ら築いた壁を自らの手で壊した国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (フランス・世界一周と同じ理由。ここは暫定値100のまま)。
  cur: { pre: "€", post: "", mul: 100 },
  start: "berlin",
  cpuNames: ["Lorelei", "Klabautermann", "Wichtel", "Krampus"],
  // ドイツ国旗の黒・赤・金、プロイセン風の紺、羊皮紙のような白。
  stripe: ["#1a1a1a", "#d21f3c", "#f4c430", "#1e5fa8", "#f6efe2"],
};

/** 実際の州をまとめた6区分。 */
export const GERMANY_REGIONS = {
  nord: t("The North, around Hamburg and the coasts|El Norte, en torno a Hamburgo y las costas|Le Nord, autour de Hambourg et des côtes|北部(ハンブルクと海沿い)"),
  rhein: t("The Rhineland|Renania|La Rhénanie|ラインラント"),
  sw: t("The Southwest, Hesse and Baden-Württemberg|El Suroeste, Hesse y Baden-Wurtemberg|Le Sud-Ouest, la Hesse et le Bade-Wurtemberg|南西部(ヘッセンとバーデン=ヴュルテンベルク)"),
  bay: t("Bavaria|Baviera|La Bavière|バイエルン"),
  mitte: t("Central Germany, Thuringia|Alemania central, Turingia|L'Allemagne centrale, la Thuringe|中部(テューリンゲン)"),
  ost: t("The East, Berlin and Saxony|El Este, Berlín y Sajonia|L'Est, Berlin et la Saxe|東部(ベルリンとザクセン)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const GERMANY_ITEMS = {
  zeppelinfahrt: {
    e: "🎈",
    price: 240,
    kind: "move",
    n: t("A Ride on the Zeppelin|Un vuelo en el zepelín|Une envolée en zeppelin|ツェッペリン飛行船に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Count Ferdinand von Zeppelin's first rigid airship lifted off from a floating hangar on Lake Constance on 2 July 1900 and stayed aloft for eighteen minutes before a broken part forced it down onto the water. Within two decades the same design was ferrying paying passengers across the Atlantic in airships fitted with a smoking lounge and a baby grand piano.|El primer dirigible rígido del conde Ferdinand von Zeppelin despegó de un hangar flotante en el lago Constanza el 2 de julio de 1900 y se mantuvo en el aire dieciocho minutos antes de que una pieza rota lo obligara a posarse en el agua. En menos de dos décadas, el mismo diseño cruzaba el Atlántico con pasajeros de pago, en dirigibles con salón de fumar y piano de cola.|Le premier dirigeable rigide du comte Ferdinand von Zeppelin décolla d'un hangar flottant sur le lac de Constance le 2 juillet 1900 et resta en l'air dix-huit minutes avant qu'une pièce cassée ne le force à se poser sur l'eau. En moins de vingt ans, le même modèle traversait l'Atlantique avec des passagers payants, à bord de dirigeables dotés d'un fumoir et d'un piano à queue.|フェルディナント・フォン・ツェッペリン伯爵の最初の硬式飛行船は1900年7月2日、ボーデン湖に浮かぶ格納庫から飛び立ち、部品の故障で水面に降ろされるまで18分間空を飛んだ。二十年と経たないうちに、同じ設計の飛行船は喫煙室とグランドピアノまで備えて、有料の乗客を乗せて大西洋を渡るようになった。",
    ),
  },
  fahrplan: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Printed Kursbuch|El Kursbuch impreso|Le Kursbuch imprimé|印刷された時刻表(クアスブーフ)"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Deutsche Bahn's printed Kursbuch once ran to more than 3,000 pages listing every stop of every train in the country, reprinted each December for the new timetable year. Punctuality is taken seriously enough that a train only counts as on time if it arrives within six minutes of the printed minute — any later and the delay statistics take note.|El Kursbuch impreso de Deutsche Bahn llegó a tener más de 3.000 páginas con cada parada de cada tren del país, reeditado cada diciembre para el nuevo año de horarios. La puntualidad se toma tan en serio que un tren solo cuenta como puntual si llega dentro de los seis minutos del horario impreso; pasado ese margen, entra en las estadísticas de retraso.|Le Kursbuch imprimé de la Deutsche Bahn a compté plus de 3 000 pages listant chaque arrêt de chaque train du pays, réédité chaque décembre pour la nouvelle année horaire. La ponctualité est prise si au sérieux qu'un train n'est considéré à l'heure que s'il arrive dans les six minutes suivant l'horaire imprimé — au-delà, il entre dans les statistiques de retard.|ドイツ鉄道の印刷版クアスブーフ(時刻表)は最盛期には3000ページを超え、国じゅうのすべての列車の全停車駅を載せていた。毎年12月に新しいダイヤの年度版へ刷り直された。定時運行はかなり厳格に扱われ、印刷された時刻から6分以内に着いてはじめて「時刻通り」とされる。それを超えると遅延の統計に数えられる。",
    ),
  },
  intercity: {
    e: "🚈",
    price: 360,
    kind: "pre",
    n: t("Intercity Ticket|Billete Intercity|Billet Intercity|インターシティ(IC)の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Launched in 1971, the Intercity network was built around a clockface schedule, so a train left the same platform at the same minute past the hour, hour after hour, all day long. The idea worked well enough that other European railways later copied the same fixed-interval timetable for their own networks.|Lanzada en 1971, la red Intercity se construyó en torno a un horario de reloj: un tren salía del mismo andén al mismo minuto pasada la hora, hora tras hora, todo el día. La idea funcionó tan bien que otras redes ferroviarias europeas acabaron copiando el mismo horario de intervalo fijo.|Lancé en 1971, le réseau Intercity fut bâti sur un horaire cadencé : un train partait du même quai à la même minute de chaque heure, heure après heure, toute la journée. L'idée fonctionna si bien que d'autres réseaux ferroviaires européens finirent par copier ce même horaire à intervalle fixe.|1971年に始まったインターシティ網は「時計のような」ダイヤを軸に組まれ、同じホームから毎時同じ分に、一日じゅう列車が出発した。この発想はうまくいき、のちにヨーロッパの他の鉄道網も同じ等間隔ダイヤを取り入れるようになった。",
    ),
  },
  ice: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("ICE Ticket|Billete ICE|Billet ICE|ICE(イーツェーエー)の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The high-speed line between Cologne and Frankfurt, opened in 2002, was built for trains running at 300 km/h through hilly country, so engineers bored 30 tunnels and raised long viaducts rather than follow the winding valley route trains had used for a century. The new line cut the journey from just over two hours down to about an hour.|La línea de alta velocidad entre Colonia y Fráncfort, abierta en 2002, se construyó para trenes a 300 km/h por terreno accidentado, así que los ingenieros perforaron 30 túneles y levantaron largos viaductos en vez de seguir la ruta sinuosa del valle que los trenes habían usado durante un siglo. La nueva línea redujo el viaje de poco más de dos horas a aproximadamente una.|La ligne à grande vitesse entre Cologne et Francfort, ouverte en 2002, fut bâtie pour des trains filant à 300 km/h en terrain accidenté ; les ingénieurs percèrent donc 30 tunnels et élevèrent de longs viaducs plutôt que de suivre la route sinueuse de la vallée empruntée pendant un siècle. La nouvelle ligne ramena le trajet d'un peu plus de deux heures à environ une heure.|2002年に開業したケルン—フランクフルト間の高速新線は、起伏の激しい地形を時速300kmで走れるように設計され、技術者たちは一世紀にわたって使われてきた渓谷沿いの曲がりくねった旧線をたどる代わりに、トンネル30本と長い高架橋を築いた。新線は二時間強かかっていた所要時間をおよそ一時間に縮めた。",
    ),
  },
  kaminkehrer: {
    e: "🧹",
    price: 320,
    kind: "passive",
    n: t("A Chimney Sweep's Lucky Button|El botón de la suerte del deshollinador|Le bouton porte-bonheur du ramoneur|煙突掃除人の幸運のボタン"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Touching one of the black buttons on a passing chimney sweep's coat is still held to bring luck, a superstition that goes back to when a sweep kept a house from burning down and its stove drawing properly. On New Year's Eve, marzipan and chocolate sweets shaped like tiny sweeps are sold on the same logic, in case the real thing cannot be found in time.|Tocar uno de los botones negros del abrigo de un deshollinador que pasa se sigue considerando de buena suerte, una superstición que viene de cuando un deshollinador evitaba que la casa ardiera y que la estufa tirara bien. En Nochevieja se venden dulces de mazapán y chocolate con forma de deshollinador, por si el de verdad no aparece a tiempo.|Toucher l'un des boutons noirs du manteau d'un ramoneur qui passe est encore censé porter chance, une superstition héritée du temps où un ramoneur empêchait la maison de brûler et le poêle de bien tirer. À la Saint-Sylvestre, on vend des friandises en massepain et en chocolat en forme de petits ramoneurs, au cas où le vrai ne se présenterait pas à temps.|通りすがりの煙突掃除人の上着についた黒いボタンに触れると幸運が訪れるといういわれは、いまも残っている。掃除人が火事を防ぎ、暖炉の火の通りをよく保ってくれた時代の名残である。大晦日には、本物に間に合わない場合に備えて、マジパンやチョコレートで作った小さな煙突掃除人の飾りが売られる。",
    ),
  },
  almglocke: {
    e: "🔔",
    price: 440,
    kind: "pre",
    n: t("An Alpine Cowbell|Un cencerro alpino|Une cloche à vache alpine|アルプスの牛の鈴"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "In Alpine villages, masked figures called Perchten still parade through the streets each January shaking enormous cowbells and cracking whips, a noisy tradition meant to drive out winter's evil spirits before spring can properly begin. The same bells worn by cattle in summer are said to serve double duty, keeping track of a wandering herd and keeping its luck from wandering off with it.|En los pueblos alpinos, figuras enmascaradas llamadas Perchten aún desfilan por las calles cada enero agitando enormes cencerros y chasqueando látigos, una tradición ruidosa pensada para expulsar a los malos espíritus del invierno antes de que empiece bien la primavera. Se dice que los mismos cencerros que llevan las vacas en verano cumplen una doble función.|Dans les villages alpins, des personnages masqués appelés Perchten défilent encore chaque janvier dans les rues en secouant d'énormes cloches à vache et en faisant claquer des fouets, une tradition bruyante censée chasser les mauvais esprits de l'hiver avant que le printemps ne s'installe vraiment. Les mêmes cloches portées par le bétail en été rendraient, dit-on, un double service.|アルプスの村々では、いまも毎年1月、ペルヒテンと呼ばれる仮面姿の一団が巨大な牛鈴を鳴らし鞭を打ち鳴らしながら通りを練り歩く。春が本当に始まる前に冬の悪い霊を追い払うための、騒々しい習わしである。夏に牛がつける同じ鈴には二重の役目があるとされ、はぐれた牛の居場所を知らせるだけでなく、牛の運がはぐれていかないようにするのだという。",
    ),
  },
  eselsbruecke: {
    e: "🐴",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("An Eselsbrücke (Memory Trick)|Una Eselsbrücke (truco mnemotécnico)|Un Eselsbrücke (astuce mnémotechnique)|エーゼルスブリュッケ(記憶の橋)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "The German word for a mnemonic device translates literally as 'donkey's bridge', from the old idea that a stubborn donkey, like a stubborn fact, needs a bridge built specially to get it across. Students still trade rhymes and acronyms under exactly this name for the dates and rules plain memory refuses to hold.|La palabra alemana para regla mnemotécnica se traduce literalmente como «puente de burro», de la vieja idea de que un burro terco, como un dato terco, necesita un puente construido a propósito para cruzarlo. Los estudiantes siguen intercambiando rimas y siglas bajo ese mismo nombre para las fechas y reglas que la memoria a secas se niega a retener.|Le mot allemand pour moyen mnémotechnique se traduit littéralement par « pont de l'âne », d'après l'idée qu'un âne têtu, comme un fait têtu, a besoin d'un pont construit tout exprès pour le faire passer. Les élèves échangent encore des rimes et des acronymes sous ce même nom pour les dates et les règles que la mémoire seule refuse de retenir.|ドイツ語で「語呂合わせ・記憶術」を指す言葉は、直訳すると「ロバの橋」となる。頑固なロバも、頑固な暗記事項も、渡らせるにはそのための橋をわざわざ架けねばならない、という昔ながらの発想による。生徒たちはいまも、素の記憶力では覚えられない年号や規則のために、まさにこの名で語呂合わせや略語を教え合っている。",
    ),
  },
  flohmarkt: {
    e: "🧺",
    price: 280,
    kind: "pre",
    n: t("A Flea-Market Find, Resold|Un hallazgo de mercadillo, revendido|Une trouvaille de marché aux puces, revendue|蚤の市の掘り出し物を転売"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Flea markets (Flohmärkte) fill town squares most weekends across the country, and haggling over the price of a chipped teacup or a box of old postcards counts as part of the fun rather than bad manners. A good find, spotted early and resold at the next stall over, has funded more than one traveller's next leg of the journey.|Los mercadillos (Flohmärkte) llenan las plazas de casi todas las ciudades casi todos los fines de semana, y regatear el precio de una taza desportillada o una caja de postales antiguas se considera parte de la diversión y no mala educación. Un buen hallazgo, visto a tiempo y revendido en el puesto de al lado, ha pagado más de un tramo de viaje.|Les marchés aux puces (Flohmärkte) envahissent les places de presque toutes les villes presque chaque week-end, et marchander le prix d'une tasse ébréchée ou d'une boîte de vieilles cartes postales fait partie du jeu plutôt que d'être malpoli. Une bonne trouvaille, repérée tôt et revendue à l'étal d'à côté, a financé plus d'une étape de voyage.|蚤の市(フローマルクト)は国じゅうのほぼどの町でも週末になると広場を埋め尽くし、欠けたティーカップや古い絵葉書の束の値切り交渉は無作法どころかお楽しみの一部とされる。掘り出し物を早く見つけて隣の露店で転売できれば、旅の次の一区間ぶんの路銀になることもある。",
    ),
  },
  autobahn: {
    e: "🏎️",
    price: 420,
    kind: "pre",
    n: t("An Unrestricted Autobahn Stretch|Un tramo de autopista sin límite|Un tronçon d'autoroute sans limite|速度無制限区間のアウトバーン"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Around a third of the German motorway network still carries no general speed limit, a fact defended so fiercely in public debate that a 2019 parliamentary push to introduce one nationwide failed by a wide margin. The rest of the network is limited exactly like anywhere else, which surprises visitors who expected the whole country to be one long straightaway.|Cerca de un tercio de la red de autopistas alemana sigue sin límite general de velocidad, un hecho tan defendido en el debate público que un intento parlamentario de 2019 por imponerlo en todo el país fracasó por amplio margen. El resto de la red tiene límites como en cualquier otro sitio.|Environ un tiers du réseau autoroutier allemand ne connaît toujours aucune limitation de vitesse générale, un fait si farouchement défendu dans le débat public qu'une tentative parlementaire de 2019 pour en imposer une à l'échelle nationale échoua largement. Le reste du réseau est limité comme partout ailleurs, ce qui surprend les visiteurs.|ドイツの高速道路網のおよそ三分の一には、いまも一般的な速度制限がない。この状況はあまりに強く支持されており、2019年に全国一律の制限を設けようとした議会の動きも大差で否決された。残りの区間はほかの国と同じようにふつうに制限されており、国じゅうがずっと一本道だと思っていた旅行者を驚かせる。",
    ),
  },
};

/**
 * 厄災の神。ドイツ民話に伝わるリューベツァール(巨人山地/リーゼン山地に
 * 棲む気まぐれな山の精)にした。人を苦しめる悪霊ではなく、いたずら好きで
 * すぐ拗ねる巨人として描く(茨城のダイダラボウ・韓国のトッケビと同じく
 * 「残酷ではなく、ただ度が過ぎるだけ」の性格)。
 */
export const GERMANY_SPIRIT = {
  e: "🧙",
  n: t("Rübezahl|Rübezahl|Rübezahl|リューベツァール"),
  big: t("Rübezahl's Turnip-Counting Challenge|El reto de contar nabos de Rübezahl|Le défi de comptage de navets de Rübezahl|リューベツァールのカブ数え勝負"),
  ward: "almglocke",
  arrive: t(
    "<b>🧙 Rübezahl has taken an interest in you.</b> Old tales say this giant of the Riesengebirge can turn stones into bread, turnips into soldiers, and clear skies into fog within minutes — mischievous rather than cruel, and quick to punish anyone who mocks him or uses his name lightly. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧙 Rübezahl se ha fijado en ti.</b> Los viejos cuentos dicen que este gigante de los Montes de los Gigantes puede convertir piedras en pan, nabos en soldados y un cielo despejado en niebla en cuestión de minutos —travieso más que cruel, y rápido en castigar a quien se burla de él o usa su nombre a la ligera. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧙 Rübezahl s'est intéressé à toi.</b> Les vieux contes disent que ce géant des monts des Géants peut changer des pierres en pain, des navets en soldats, et un ciel dégagé en brouillard en quelques minutes — espiègle plus que cruel, et prompt à punir qui se moque de lui ou prononce son nom à la légère. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧙 リューベツァールに目を付けられた。</b> 昔話によれば、この巨人山地(リーゼン山地)の巨人は石をパンに、カブを兵士に、晴れた空を数分で霧に変えられるという。残酷なのではなく、ただのいたずら好きだが、自分を馬鹿にしたり名を軽々しく口にしたりする者はすぐさま懲らしめる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧙 <b>Rübezahl</b> loses interest and drifts like fog toward <b>{0}</b>, farthest from {1}.|🧙 <b>Rübezahl</b> pierde el interés y se desliza como niebla hacia <b>{0}</b>, el más lejano de {1}.|🧙 <b>Rübezahl</b> se désintéresse et glisse comme le brouillard vers <b>{0}</b>, le plus loin de {1}.|🧙 <b>リューベツァール</b> は興味を失い、霧のように {1} から最も遠い <b>{0}</b> のほうへ流れていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with Rübezahl and never once outwitted him. He grins, plants a field of turnips at the roadside, and challenges the whole road to count every one before sundown — <b>Rübezahl's Turnip-Counting Challenge</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a Rübezahl sin haberlo burlado ni una vez. Él sonríe, planta un campo de nabos junto al camino y reta a todo el camino a contarlos antes de que caiga el sol: empieza <b>el reto de contar nabos de Rübezahl</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec Rübezahl sans jamais l'avoir déjoué. Il sourit, plante un champ de navets au bord du chemin et défie toute la route à les compter avant le coucher du soleil : <b>le défi de comptage de navets de Rübezahl</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもリューベツァールと歩いていながら、一度もその裏をかけなかった。彼はにやりと笑うと道端にカブ畑を出現させ、日が沈むまでに道行く者すべてに数え終えるよう挑む。<b>リューベツァールのカブ数え勝負</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the old tale, a princess Rübezahl had carried off to his mountain agreed to marry him only once he had counted every turnip in a field — then slipped away by turning the turnips into a coach and horses and shouting his own name back at him as she escaped, which is supposedly how the mountain spirit got the name 'turnip-counter' at all.|<b>Tras la historia:</b> en el viejo cuento, una princesa que Rübezahl había raptado a su montaña aceptó casarse con él solo si contaba todos los nabos de un campo; entonces escapó convirtiendo los nabos en un carruaje con caballos y gritándole su propio nombre mientras huía, lo que —según dicen— es como este espíritu de la montaña llegó a llamarse «el que cuenta nabos».|<b>Derrière l'histoire :</b> dans le vieux conte, une princesse que Rübezahl avait enlevée jusqu'à sa montagne n'accepta de l'épouser qu'une fois tous les navets d'un champ comptés ; elle s'échappa alors en changeant les navets en carrosse et en chevaux, lui criant son propre nom en s'enfuyant — ce qui, dit-on, valut à cet esprit de la montagne le nom de « compteur de navets ».|<b>物語の背景:</b> 昔話では、リューベツァールが山へさらったある姫が、畑のカブをすべて数え終えたら嫁ぐと約束させた。姫はその隙にカブを馬車と馬に変え、逃げながら彼自身の名を叫んで姿を消したという。この山の精が「カブ数え」という名を持つに至った由来だと伝えられている。",
  ),
  pleased: t(
    "He conjures a turnip out of thin air, decides it is not gold after all, and tosses it aside — a coin bounces loose from the hole it leaves. <b>{0}</b> gains <span class='money'>+{1}</span>.|Conjura un nabo de la nada, decide que al final no es oro y lo tira; una moneda se le escapa del agujero que deja. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il fait apparaître un navet de nulle part, décide que ce n'est finalement pas de l'or et le jette — une pièce s'échappe du trou qu'il laisse. <b>{0}</b> gagne <span class='money'>+{1}</span>.|彼は何もないところからカブを取り出したが、結局それが金ではないと分かって放り投げた。その穴から銭が一枚跳ねて転がり出た。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A cowbell is rung hard, three times, in the old Alpine way. Rübezahl is said to hate sudden loud noise above almost everything, and he backs off into the mist, stepping past <b>{0}</b> without noticing this turn.|Un cencerro suena con fuerza, tres veces, a la vieja usanza alpina. Se dice que Rübezahl odia el ruido repentino por encima de casi todo, y retrocede hacia la niebla, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une cloche à vache résonne fort, trois fois, à la vieille manière alpine. Rübezahl détesterait le bruit soudain par-dessus presque tout, et il recule dans la brume, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|アルプス式に、牛鈴が三度、力強く鳴らされた。リューベツァールは何よりも突然の大きな音を嫌うといわれ、彼は霧の中へひるんで後ずさりし、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。リューベツァールのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const GERMANY_DOOM = [
  {
    id: "foehn",
    n: t("A föhn wind sets everyone on edge|Un viento föhn pone a todos de los nervios|Un vent de foehn met tout le monde à cran|フェーン風でみんなが苛立つ"),
    t: t(
      "The warm, dry wind rolling down off the Alps arrives with a run of headaches, short tempers and, old folklore insists, a jump in minor accidents — meteorologists still argue about how much of it is real weather and how much is a very old excuse. Either way, headache tablets and a strong coffee both cost more than usual once word gets around that the föhn is blowing.|El viento cálido y seco que baja de los Alpes llega acompañado de dolores de cabeza, mal humor y, según el viejo folclore, un repunte de pequeños accidentes; los meteorólogos aún debaten cuánto de eso es clima real y cuánto una excusa muy antigua. Sea como sea, las pastillas para el dolor de cabeza y un café cargado cuestan más de lo habitual en cuanto corre la voz de que sopla el föhn.|Le vent chaud et sec qui dévale des Alpes arrive avec son lot de maux de tête, de mauvaise humeur et, selon le vieux folklore, une hausse des petits accidents — les météorologues débattent encore de la part de vrai climat et de très vieille excuse. Dans tous les cas, cachets contre le mal de tête et café serré coûtent tous deux plus cher dès que la rumeur du foehn se répand.|アルプスから吹き下ろす暖かく乾いた風が来ると、頭痛と苛立ち、そして昔からの言い伝えによれば些細な事故の増加までもがついてくる。気象学者はいまも、これがどこまで本物の気象現象でどこまで言い訳なのか議論している。いずれにせよ、フェーンが吹いているという噂が広まると、頭痛薬も濃いコーヒーもいつもより値が張る。",
    ),
  },
  {
    id: "hochwasser",
    n: t("The Rhine rises over its banks|El Rin se desborda|Le Rhin sort de son lit|ライン川が堤を越える"),
    t: t(
      "Winter snowmelt and heavy rain send the Rhine climbing the gauge at Koblenz's Deutsches Eck, and when the water tops the flood markers carved into the stone steps below the confluence monument, cellars and riverside cafés along the whole valley start pumping long before the news headlines catch up. A flood this size arrives most years, so the sandbags come out of storage on a schedule almost as reliable as the trains.|El deshielo invernal y las lluvias intensas hacen subir el Rin en la escala del Deutsches Eck de Coblenza, y cuando el agua supera las marcas de crecida talladas en los escalones de piedra bajo el monumento de la confluencia, las bodegas y cafés ribereños empiezan a achicar agua mucho antes de que salga en las noticias. Una crecida así llega casi todos los años, así que los sacos de arena salen del almacén con un horario casi tan fiable como el de los trenes.|La fonte des neiges et les fortes pluies font grimper le Rhin sur l'échelle du Deutsches Eck à Coblence, et quand l'eau dépasse les repères de crue gravés dans les marches de pierre sous le monument du confluent, caves et cafés en bord de fleuve commencent à pomper bien avant que les journaux ne s'en fassent l'écho. Une crue de cette ampleur survient presque chaque année, si bien que les sacs de sable sortent de réserve selon un horaire presque aussi fiable que celui des trains.|冬の雪解けと大雨でライン川の水位はコブレンツのドイチェス・エック(独逸の角)の水位計を押し上げ、合流点の記念碑の下の石段に刻まれた洪水の目盛りを水が超えると、渓谷じゅうの地下室や川辺のカフェはニュースになるよりずっと前から排水を始める。この規模の増水はほとんど毎年やってくるので、土嚢は列車のダイヤに劣らぬ規則正しさで倉庫から出される。",
    ),
    months: [8, 9, 10],
  },
  {
    id: "stau",
    n: t("A Stau locks the Autobahn solid|Un Stau bloquea la autopista|Un Stau bloque l'autoroute|アウトバーンが渋滞(シュタウ)で固まる"),
    t: t(
      "Ten lanes of holiday traffic funnel down to two ahead of a construction zone, and the jam backs up for kilometres before most of the drivers in it even know why. Radio stations still interrupt the music for a dedicated traffic bulletin, precisely because a country this proud of its motorways produces jams just as legendary.|Diez carriles de tráfico vacacional se estrechan a dos ante una zona en obras, y el atasco se extiende por kilómetros antes de que la mayoría de los conductores sepa siquiera por qué. Las emisoras de radio siguen interrumpiendo la música con un boletín de tráfico específico, precisamente porque un país tan orgulloso de sus autopistas produce atascos igual de legendarios.|Dix voies de trafic de vacances se resserrent en deux avant une zone de travaux, et le bouchon s'étire sur des kilomètres avant que la plupart des conducteurs n'en comprennent la cause. Les radios interrompent encore la musique pour un bulletin routier dédié, précisément parce qu'un pays si fier de ses autoroutes produit des embouteillages tout aussi légendaires.|休暇シーズンの十車線の流れが工事区間の手前で二車線に絞られ、渋滞は何キロも延びるが、渦中のドライバーの多くはその理由すら分からない。ラジオ局はいまも音楽を中断して専用の交通情報を流す。自慢の高速道路網を持つこの国は、それに劣らず伝説的な渋滞も生み出すからである。",
    ),
    months: [3, 4],
  },
  {
    id: "sturmflut",
    n: t("A Sturmflut floods the coast|Una Sturmflut inunda la costa|Une Sturmflut inonde la côte|シュトルムフルート(高潮)が海岸を襲う"),
    t: t(
      "A North Sea storm surge pushes water far past the normal tideline, and towns behind the dikes spend the day watching gauges instead of clocks. The coast's whole system of earthen dikes and storm barriers exists because of exactly this kind of week, when the wind and the tide arrive together instead of taking turns.|Una marea de tempestad del mar del Norte empuja el agua mucho más allá de la línea normal de marea, y los pueblos tras los diques pasan el día vigilando escalas en vez de relojes. Todo el sistema de diques de tierra y barreras contra tormentas de la costa existe precisamente por semanas como esta, cuando el viento y la marea llegan juntos en vez de turnarse.|Une onde de tempête en mer du Nord pousse l'eau bien au-delà de la ligne de marée habituelle, et les villes derrière les digues passent la journée à surveiller les échelles plutôt que l'horloge. Tout le système de digues de terre et de barrages anti-tempête de la côte existe précisément pour des semaines comme celle-ci, où le vent et la marée arrivent ensemble plutôt qu'à tour de rôle.|北海の高潮が通常の満潮線をはるかに越えて押し寄せ、堤防の内側の町は一日じゅう時計ではなく水位計を見て過ごす。海岸沿いの土堤と防潮堰の仕組みすべては、まさにこうした週――風と潮が入れ替わりでなく同時に襲ってくる週――のために存在している。",
    ),
    months: [6, 7],
  },
  {
    id: "runde",
    n: t("Stuck buying the next Runde|Tocado pagar la próxima Runde|Bon pour payer la prochaine Runde|次のラウンド(ルンデ)を奢らされる"),
    t: t(
      "The beer tent's long communal tables mean today's neighbours are whoever sat down first, and losing the toss for who orders next means covering a tray of a dozen steins before anyone offers to split the bill. Tradition says the loser buys, and tradition, at a table this crowded, does not get renegotiated.|Las largas mesas comunales de la carpa de cerveza hacen que los vecinos de hoy sean quienes se sentaron primero, y perder el sorteo de quién pide la próxima ronda significa pagar una bandeja de una docena de jarras antes de que a nadie se le ocurra dividir la cuenta. La tradición dice que paga quien pierde.|Aux longues tables communes de la tente à bière, les voisins du jour sont ceux qui se sont assis en premier, et perdre le tirage au sort de qui commande la tournée suivante signifie payer un plateau d'une douzaine de chopes avant que quiconque ne songe à partager l'addition. La tradition veut que le perdant régale.|ビールテントの長い共用テーブルでは、今日の隣人は先に座った者たちというだけの間柄だが、次の注文の順番を決めるくじに負けると、誰かが割り勘を申し出るより先にジョッキ十数杯分の代金を持たされる。負けた者が奢るのが習わしで、これだけ混んだテーブルでは、その習わしが交渉の余地なく通る。",
    ),
    months: [5, 6],
  },
  {
    id: "bergnebel",
    n: t("Led astray by mountain fog|Extraviado por la niebla de la montaña|Égaré par le brouillard de la montagne|山霧に迷わされる"),
    t: t(
      "The path through the Riesengebirge looked exactly the same at every switchback, and only after passing the same boulder a third time does it become clear that a fog rolled in from nowhere and turned the whole ridge around. Locals still blame Rübezahl for weather that behaves exactly like this — arriving too fast to be ordinary and lifting the moment the joke has landed.|El sendero por los Montes de los Gigantes parecía idéntico en cada recodo, y solo al pasar la misma roca por tercera vez queda claro que una niebla llegó de la nada y dio la vuelta a toda la cresta. Los lugareños siguen culpando a Rübezahl de un tiempo que se comporta exactamente así.|Le sentier à travers les monts des Géants semblait identique à chaque lacet, et ce n'est qu'en repassant devant le même rocher pour la troisième fois qu'on comprend qu'un brouillard est venu de nulle part retourner toute la crête. Les gens du coin en attribuent encore la faute à Rübezahl, pour un temps qui se comporte exactement ainsi.|リーゼン山地を抜ける道は、どの折り返しでもまったく同じ景色に見えた。同じ岩を三度も通り過ぎてはじめて、どこからともなく霧が湧いて尾根全体の向きが分からなくなっていたと気づいた。地元の人はいまもこうした天候をリューベツァールのしわざだとする。普通ではありえない速さで現れ、悪ふざけが決まった途端に晴れるからである。",
    ),
  },
  {
    id: "marktdieb",
    n: t("A pickpocket works the Christmas market|Un carterista trabaja el mercado navideño|Un pickpocket sévit au marché de Noël|クリスマス市ですりに遭う"),
    t: t(
      "The crowd around the mulled-wine stand was packed shoulder to shoulder, everyone's hands full of a hot cup and a gingerbread heart, and a coat pocket came up light before anyone even felt the bump. Markets this crowded post a warning sign about exactly this every December, right next to the stall selling wallets.|La multitud junto al puesto de vino caliente estaba apretada hombro con hombro, con las manos ocupadas en una taza humeante y un corazón de pan de jengibre, y un bolsillo del abrigo quedó ligero antes de que nadie notara el roce. Mercados tan concurridos cuelgan cada diciembre un cartel advirtiendo justo de esto.|La foule autour du stand de vin chaud était compacte, chacun les mains occupées par une tasse fumante et un cœur en pain d'épices, et une poche de manteau s'est allégée avant que quiconque ne sente le frôlement. Des marchés aussi bondés affichent chaque décembre un panneau d'avertissement à ce sujet.|ホットワインの屋台の周りは肩がぶつかるほどの人混みで、誰もが湯気の立つカップとジンジャーブレッドのハート形クッキーで両手がふさがっていた。誰もぶつかられたことにすら気づかないうちに、上着のポケットは軽くなっていた。これほど混み合う市では、毎年12月、財布を売る屋台のすぐ隣に、まさにこの手口を警告する張り紙が出る。",
    ),
    months: [8],
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・韓国・フランス・
 * インドと同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の germany の項)。
 */
export const GERMANY_SEASONS = [
  {
    e: "🌱",
    n: t("Spargelzeit, the white asparagus season, begins|Empieza la Spargelzeit, la temporada del espárrago blanco|La Spargelzeit, la saison des asperges blanches, commence|白アスパラガスの季節「シュパーゲルツァイト」が始まる"),
    t: t(
      "Fields around Beelitz and Schwetzingen are mounded into long ridges of soil so the asparagus spears grow entirely underground and stay pale white rather than turning green in the sun, and both towns now market themselves almost entirely on the strength of the vegetable. Restaurants print special asparagus menus for the season and take them down again the moment it ends on 24 June, whether or not the fields still have more to give.|Los campos de Beelitz y Schwetzingen se amontonan en largos caballones de tierra para que los brotes de espárrago crezcan enteramente bajo tierra y se mantengan blancos, y ambas localidades se promocionan hoy casi por entero gracias a esta hortaliza. Los restaurantes imprimen menús especiales de espárragos para la temporada y los retiran en cuanto termina, el 24 de junio.|Les champs autour de Beelitz et de Schwetzingen sont buttés en longues levées de terre pour que les asperges poussent entièrement sous terre et restent blanches, et les deux villes vivent aujourd'hui presque entièrement de ce légume. Les restaurants impriment des menus spéciaux asperges pour la saison et les retirent dès qu'elle s'achève, le 24 juin.|ベーリッツやシュヴェツィンゲンの畑は長い畝に土を盛り上げてあり、アスパラガスの茎がまるごと地中で育ち、日に当たらず白いまま伸びるようにしてある。いまや両方の町は、ほぼこの野菜だけを頼りに観光を売りにしている。レストランはこの季節だけの特別なアスパラガス・メニューを刷り、6月24日に終わると、畑にまだ収穫があろうとなかろうと即座に取り下げる。",
    ),
    f: t(
      "The custom of eating white rather than green asparagus took hold in the 18th century, when growers realised that keeping the shoots covered and light-starved produced a milder, less fibrous vegetable that fetched a far higher price at market.|La costumbre de comer espárragos blancos en vez de verdes se afianzó en el siglo XVIII, cuando los cultivadores descubrieron que mantener los brotes cubiertos y sin luz producía una hortaliza más suave y menos fibrosa que se vendía mucho más cara.|La coutume de manger l'asperge blanche plutôt que verte s'installa au XVIIIe siècle, quand les maraîchers s'aperçurent que garder les pousses couvertes et privées de lumière donnait un légume plus doux, moins fibreux, qui se vendait bien plus cher.|緑ではなく白いアスパラガスを食べる習慣は18世紀に定着した。芽を覆って光を遮ると、より柔らかく繊維の少ない野菜になり、市場でずっと高値がつくと栽培者たちが気づいたためである。",
    ),
  },
  {
    e: "🌳",
    n: t("Villages raise the Maibaum|Los pueblos levantan el Maibaum|Les villages dressent le Maibaum|村々がマイバウム(五月柱)を立てる"),
    t: t(
      "Bavarian villages spend the last night of April guarding a freshly felled spruce, stripped of its lower branches and painted in a blue-and-white spiral, because a rival village stealing an unguarded Maibaum before it goes up is treated as a genuine and slightly embarrassing local scandal. The following day the whole trunk, sometimes over 30 metres tall, is hauled upright by hand using only ropes and long wooden poles.|Los pueblos bávaros pasan la última noche de abril vigilando un abeto recién talado, despojado de sus ramas bajas y pintado en espiral azul y blanca, porque si un pueblo rival roba un Maibaum sin vigilancia se considera un auténtico escándalo local. Al día siguiente, todo el tronco, a veces de más de 30 metros, se alza a mano con solo cuerdas y varas de madera.|Les villages bavarois passent la dernière nuit d'avril à surveiller un épicéa fraîchement abattu, débarrassé de ses branches basses et peint en spirale bleu et blanc, car un village rival qui vole un Maibaum sans surveillance est considéré comme un véritable scandale local. Le lendemain, tout le tronc, parfois haut de plus de 30 mètres, est redressé à la main, à l'aide de cordes et de longues perches.|バイエルンの村々は4月の最終夜、下枝を払って青白の螺旋模様に塗った伐りたてのトウヒの木を見張って過ごす。見張りのいないマイバウム(五月柱)をよその村に盗まれると、ちょっとした恥とされる本物の騒動になるからである。翌日、時に30mを超える丸太まるごとを、綱と長い木の棒だけを使って人力で立てる。",
    ),
    f: t(
      "Rival villages that succeed in stealing an unguarded Maibaum traditionally hold it for ransom, demanding beer and food from the village that lost it before handing the pole back — a custom taken seriously enough that some villages now rotate guard shifts through the entire night.|Los pueblos rivales que logran robar un Maibaum sin vigilancia suelen retenerlo como rescate, exigiendo cerveza y comida al pueblo que lo perdió antes de devolver el mástil, una costumbre tomada tan en serio que algunos pueblos ya organizan turnos de guardia toda la noche.|Les villages rivaux qui parviennent à voler un Maibaum sans surveillance le retiennent traditionnellement contre rançon, exigeant bière et nourriture du village qui l'a perdu avant de rendre le mât — une coutume prise assez au sérieux pour que certains villages organisent désormais des tours de garde toute la nuit.|見張りのいないマイバウムを盗み出すことに成功した村は、伝統的にそれを人質のように扱い、失った村にビールと食べ物を要求してから柱を返す。この習わしはかなり真剣に受け止められており、いまでは一晩じゅう交代で見張りを立てる村もある。",
    ),
  },
  {
    e: "🎆",
    n: t("The Rhine catches fire (in fireworks)|El Rin se incendia (de fuegos artificiales)|Le Rhin s'embrase (de feux d'artifice)|ライン川が(花火で)燃え上がる"),
    t: t(
      "Castle ruins along the Rhine gorge are lit in red floodlight for a single evening each year, timed to a procession of illuminated boats and a fireworks display fired from barges anchored mid-river, drawing crowds who book riverside hotel rooms a year ahead. The tradition began in the 1980s as a way to bring visitors back to a stretch of the valley that wine tourism alone was no longer supporting.|Las ruinas de los castillos a lo largo del desfiladero del Rin se iluminan de rojo una sola noche al año, coincidiendo con un desfile de barcos iluminados y unos fuegos artificiales lanzados desde barcazas ancladas en medio del río. La tradición empezó en los años ochenta para atraer visitantes a un tramo del valle que el turismo del vino ya no sostenía por sí solo.|Les ruines de châteaux le long des gorges du Rhin s'illuminent de rouge le temps d'une seule soirée chaque année, au rythme d'un défilé de bateaux illuminés et d'un feu d'artifice tiré depuis des péniches ancrées au milieu du fleuve. La tradition a débuté dans les années 1980 pour ramener des visiteurs sur un tronçon de la vallée que le seul tourisme viticole ne suffisait plus à faire vivre.|ライン渓谷沿いの城跡は年に一晩だけ赤い照明で照らされ、灯りをともした船の行列と、川の真ん中に停泊したはしけから打ち上げる花火に合わせて演出される。川辺の宿を一年前から予約する客も集まる。この催しは1980年代、ワイン観光だけでは支えきれなくなった渓谷の一区間に客を呼び戻す方法として始まった。",
    ),
    f: t(
      "Four separate stretches of the Rhine and Mosel hold their own version on different weekends through the summer, so a determined visitor can, in theory, follow the fireworks upriver for most of the season.|Cuatro tramos distintos del Rin y el Mosela celebran su propia versión en fines de semana diferentes durante el verano, así que un visitante decidido puede, en teoría, seguir los fuegos artificiales río arriba casi toda la temporada.|Quatre tronçons distincts du Rhin et de la Moselle organisent chacun leur propre version à des week-ends différents tout au long de l'été, si bien qu'un visiteur déterminé peut, en théorie, remonter le fleuve à la suite des feux d'artifice presque toute la saison.|ラインとモーゼルの四つの区間が、それぞれ夏のうちの異なる週末に独自の催しを開いており、その気になれば一夏かけて花火を追いながら川をさかのぼることもできる。",
    ),
  },
  {
    e: "⛵",
    n: t("Kieler Woche fills the fjord with sails|La Kieler Woche llena el fiordo de velas|La Kieler Woche remplit le fjord de voiles|キーラー・ヴォッヘがフィヨルドを帆で埋める"),
    t: t(
      "More than 4,000 sailing boats crowd into Kiel Fjord for the world's largest sailing event, racing in classes from Olympic dinghies to century-old wooden schooners, while the harbourfront runs an open-air festival that draws over three million visitors across the week. The event survived being founded in 1882 by a rowing club, then briefly used for propaganda in the 1930s, and has been rebuilt since as a purely sporting and civic celebration.|Más de 4.000 veleros se agolpan en el fiordo de Kiel para el mayor evento de vela del mundo, compitiendo en categorías que van de botes olímpicos a goletas de madera centenarias, mientras el paseo marítimo acoge un festival al aire libre con más de tres millones de visitantes en la semana.|Plus de 4 000 voiliers se pressent dans le fjord de Kiel pour le plus grand événement de voile au monde, s'affrontant dans des catégories allant des dériveurs olympiques aux goélettes en bois centenaires, tandis que le front de mer accueille un festival en plein air attirant plus de trois millions de visiteurs sur la semaine.|4000隻を超えるヨットが世界最大のセーリング大会のためにキール・フィヨルドに集まり、オリンピック級の小艇から百年物の木造スクーナーまで様々な部門で競い合う。港沿いでは屋外フェスティバルが催され、一週間で300万人以上の来場者を集める。この催しは1882年にボート部が始めたもので、1930年代にはナチス政権に一時プロパガンダとして利用されたが、その後は純粋なスポーツと市民の祭典として立て直された。",
    ),
    f: t(
      "The fjord's steady, funnel-shaped wind pattern is what first drew serious sailors here in the 1880s, and the same geography still makes Kiel one of the few harbours in the world where an Olympic-standard course can be laid out within sight of the city centre.|El patrón de viento constante y en forma de embudo del fiordo fue lo que atrajo a los primeros regatistas serios en la década de 1880, y esa misma geografía sigue haciendo de Kiel uno de los pocos puertos del mundo con un recorrido olímpico a la vista del centro.|Le régime de vent régulier et en entonnoir du fjord est ce qui attira ici les premiers marins sérieux dans les années 1880, et cette même géographie fait toujours de Kiel l'un des rares ports au monde où un parcours de niveau olympique peut être tracé à vue du centre-ville.|漏斗状の地形が生む安定した風の吹き方こそが、1880年代に本格的な帆走者たちをこの地へ引き寄せた理由であり、いまも同じ地形のおかげで、キールは市街地から見渡せる場所にオリンピック級のコースを設定できる世界でも数少ない港のひとつになっている。",
    ),
  },
  {
    e: "🏖️",
    n: t("Sommerferien empties the cities|Las Sommerferien vacían las ciudades|Les Sommerferien vident les villes|夏休みで街が空になる"),
    t: t(
      "Because each of the sixteen states staggers its own school summer holiday across five to six weeks rather than releasing every child at once, the country effectively runs a rolling, month-long exodus toward the Baltic coast, the Alps and beaches beyond its own borders. Rübezahl, like most of the mountains he haunts, takes the month off from mischief along with everyone else.|Como cada uno de los dieciséis estados escalona sus propias vacaciones escolares de verano a lo largo de cinco o seis semanas, el país vive en la práctica un éxodo rodante de un mes hacia la costa báltica, los Alpes y las playas más allá de sus fronteras. Rübezahl, como la mayoría de las montañas que habita, se toma el mes libre de travesuras.|Comme chacun des seize Länder échelonne ses propres vacances scolaires d'été sur cinq à six semaines, le pays vit en pratique un exode continu d'un mois vers la côte baltique, les Alpes et les plages au-delà de ses frontières. Rübezahl, comme la plupart des montagnes qu'il hante, prend le mois de congé de ses farces.|16ある州がそれぞれ夏休みの時期を5〜6週間ずつずらして設定しているため、全国の子どもが一斉に休みに入るのではなく、バルト海沿岸やアルプス、さらには国境の外の浜辺へ向けて一か月がかりで波状に人が流れていく。リューベツァールも、彼が棲みつくたいていの山々と同じく、この月はいたずらを休む。",
    ),
    f: t(
      "The staggered system began in the 1960s partly to spread the strain on holiday roads and resorts more evenly, and partly out of old rivalry between states over who got first and last pick of the summer weather.|El sistema escalonado empezó en los sesenta, en parte para repartir mejor la presión sobre carreteras y destinos turísticos, y en parte por una vieja rivalidad entre estados sobre quién se quedaba con el mejor tramo del tiempo veraniego.|Ce système échelonné a débuté dans les années 1960, en partie pour mieux répartir la pression sur les routes et les stations de vacances, et en partie à cause d'une vieille rivalité entre Länder sur qui aurait le meilleur de la météo estivale.|この時期をずらす仕組みは1960年代に始まった。休暇シーズンの道路やリゾートへの負荷をより均等に分散させる狙いもあれば、夏の天気の良い時期を誰が先取りし誰が最後になるかという州どうしの古い張り合いも背景にあった。",
    ),
  },
  {
    e: "🍺",
    n: t("Oktoberfest opens, despite the name, in September|El Oktoberfest abre, pese al nombre, en septiembre|L'Oktoberfest ouvre, malgré son nom, en septembre|名前に反して9月に始まるオクトーバーフェスト"),
    t: t(
      "The mayor of Munich taps the first keg with a wooden mallet at noon on opening day, and the festival is timed to run mostly through the warmer, longer days of late September rather than October precisely because it works better that way — the name simply never caught up. Only breweries brewed within Munich's city limits, following a recipe registered as Oktoberfestbier, are allowed to serve inside the festival's beer tents.|El alcalde de Múnich abre el primer barril con un mazo de madera a mediodía del día de apertura, y el festival está programado para transcurrir sobre todo en los días más cálidos y largos de finales de septiembre, precisamente porque así funciona mejor; el nombre simplemente nunca se puso al día.|Le maire de Munich perce le premier tonneau d'un coup de maillet en bois à midi le jour de l'ouverture, et le festival est calé pour se dérouler surtout durant les jours plus chauds et plus longs de fin septembre plutôt qu'en octobre, précisément parce que cela fonctionne mieux ainsi — le nom, lui, n'a simplement jamais suivi.|ミュンヘン市長が開幕日の正午、木槌で最初の樽に栓を打ち込む。祭りは10月ではなく主に9月末の暖かく日の長い時期に開かれるよう組まれている。単にそのほうがうまくいくからで、名前だけが時代に追いつかなかったのである。祭りのビールテントで出せるのは、ミュンヘン市内で醸造され「オクトーバーフェストビア」として登録された製法によるビールに限られる。",
    ),
    f: t(
      "The festival still opens on the meadow named Theresienwiese after the 1810 royal wedding that started it all, and locals shorten the whole event to simply 'die Wiesn' — the meadow — rather than using its official name.|El festival aún abre en el prado llamado Theresienwiese en honor a la boda real de 1810 que lo originó todo, y los locales abrevian todo el evento simplemente como «die Wiesn» —el prado— en vez de usar su nombre oficial.|Le festival ouvre toujours sur la prairie nommée Theresienwiese en l'honneur du mariage royal de 1810 qui est à l'origine de tout, et les habitants abrègent l'ensemble de l'événement en simplement « die Wiesn » — la prairie.|祭りはいまも、すべての始まりとなった1810年の王家の婚礼にちなんで名付けられたテレージエンヴィーゼという草地で開かれる。地元の人はこの催し全体を正式名称ではなく、ただ「ディー・ヴィーズン(あの草地)」と呼び縮めている。",
    ),
  },
  {
    e: "🍇",
    n: t("Unity Day and the grape harvest|El Día de la Unidad y la vendimia|La fête de l'Unité et les vendanges|統一記念日とワインの収穫"),
    t: t(
      "The third of October marks German reunification in 1990, chosen as the date over the fall of the Wall itself because 9 November already carried too much other, darker history attached to it. The same weeks bring the wine harvest to the Rhine, Mosel and Neckar valleys, where villages hold Winzerfeste that crown a wine queen and empty the vineyards of pickers working against the first autumn frost.|El tres de octubre marca la reunificación alemana de 1990, elegida como fecha en vez de la propia caída del Muro porque el 9 de noviembre ya cargaba con demasiada otra historia, más oscura. Las mismas semanas traen la vendimia a los valles del Rin, el Mosela y el Neckar, donde los pueblos celebran Winzerfeste que coronan a una reina del vino.|Le trois octobre marque la réunification allemande de 1990, choisi comme date plutôt que la chute du Mur elle-même, car le 9 novembre portait déjà trop d'autre histoire, plus sombre. Les mêmes semaines apportent les vendanges dans les vallées du Rhin, de la Moselle et du Neckar, où les villages tiennent des Winzerfeste qui couronnent une reine du vin.|10月3日は1990年のドイツ再統一を記念する日で、壁崩壊そのものの日ではなくこちらが選ばれたのは、11月9日にはすでに別の、より暗い歴史がまとわりついていたためである。同じ時期、ライン・モーゼル・ネッカー渓谷ではブドウの収穫期を迎え、村々はヴィンツァーフェスト(ワイン祭り)を開いてワインの女王を戴冠させ、初霜と競うように摘み手たちがブドウ畑を空にする。",
    ),
    f: t(
      "9 November also happens to be the date of the 1938 Kristallnacht pogrom, which is the specific reason organisers of reunification deliberately picked a different day rather than the more obvious anniversary of the Wall's fall.|El 9 de noviembre también es, por coincidencia, la fecha del pogromo de la Kristallnacht de 1938, razón concreta por la que los organizadores de la reunificación eligieron deliberadamente otro día en vez del aniversario más obvio de la caída del Muro.|Le 9 novembre est aussi, par coïncidence, la date du pogrom de la Nuit de Cristal en 1938, raison précise pour laquelle les organisateurs de la réunification choisirent délibérément un autre jour plutôt que l'anniversaire plus évident de la chute du Mur.|11月9日はまた、1938年の水晶の夜(クリスタルナハト)の虐殺が起きた日でもある。これこそ、統一記念日の制定にあたって、より分かりやすい壁崩壊の記念日ではなくあえて別の日が選ばれた具体的な理由である。",
    ),
  },
  {
    e: "🏮",
    n: t("Sankt Martin's lantern processions|Los desfiles de faroles de San Martín|Les cortèges de lanternes de la Saint-Martin|聖マルティンの提灯行列"),
    t: t(
      "On the evening of 11 November, children across the Rhineland walk through the streets carrying paper lanterns on sticks behind someone dressed as a Roman soldier on horseback, re-enacting the legend of a saint who cut his cloak in half to share it with a freezing beggar. The procession ends with a bonfire and a sweet roll shaped like a man, the Weckmann, handed out to every child who made it to the end.|La tarde del 11 de noviembre, los niños de toda Renania recorren las calles con faroles de papel en un palo, detrás de alguien disfrazado de soldado romano a caballo, recreando la leyenda de un santo que partió su capa en dos para compartirla con un mendigo helado de frío. El desfile termina con una hoguera y un bollo dulce con forma de hombrecillo, el Weckmann.|Le soir du 11 novembre, les enfants de toute la Rhénanie parcourent les rues avec des lanternes en papier au bout d'un bâton, derrière quelqu'un déguisé en soldat romain à cheval, rejouant la légende d'un saint qui coupa son manteau en deux pour le partager avec un mendiant transi de froid. Le cortège s'achève par un feu de joie et une brioche sucrée en forme de bonhomme, le Weckmann.|11月11日の夕方、ラインラント各地の子どもたちは棒に付けた紙の提灯を手に、ローマ兵に扮して馬に乗った人物のあとについて通りを歩く。凍える物乞いに自分のマントを半分に裂いて分け与えた聖人の伝説を再現したものである。行列の最後にはかがり火が焚かれ、最後まで歩いた子どもには人の形をした甘いパン「ヴェックマン」が配られる。",
    ),
    f: t(
      "The lantern-making tradition began in kindergartens and schools in the late 19th century as a way to teach children about sharing, and the paper lanterns themselves were originally lit with real candles long before battery versions became standard.|La tradición de hacer faroles empezó en los jardines de infancia y las escuelas a finales del siglo XIX como manera de enseñar a los niños a compartir, y los faroles de papel se iluminaban originalmente con velas de verdad mucho antes de que las versiones a pilas se volvieran habituales.|La tradition de fabriquer des lanternes a débuté dans les jardins d'enfants et les écoles à la fin du XIXe siècle pour apprendre aux enfants à partager, et les lanternes en papier étaient à l'origine éclairées par de vraies bougies, bien avant les versions à pile.|提灯を手作りする習わしは19世紀末、子どもに分かち合うことを教える方法として幼稚園や学校で始まった。紙の提灯はもともと本物のろうそくで灯されており、電池式が定番になったのはずっとあとのことである。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas markets fill every square|Los mercados navideños llenan cada plaza|Les marchés de Noël envahissent chaque place|クリスマス市がどの広場にも立つ"),
    t: t(
      "Dresden's Striezelmarkt has run every December since 1434, making it the oldest documented Christmas market in the country, while Nuremberg's Christkindlesmarkt opens each year with a girl chosen from the city to deliver a spoken prologue dressed as the Christkind. Between them, the two markets alone sell several hundred tonnes of gingerbread and roasted almonds over the season.|El Striezelmarkt de Dresde funciona cada diciembre desde 1434, lo que lo convierte en el mercado navideño documentado más antiguo del país, mientras que el Christkindlesmarkt de Núremberg abre cada año con una joven elegida de la ciudad que recita un prólogo vestida de Christkind.|Le Striezelmarkt de Dresde se tient chaque décembre depuis 1434, ce qui en fait le plus ancien marché de Noël documenté du pays, tandis que le Christkindlesmarkt de Nuremberg ouvre chaque année avec une jeune fille choisie dans la ville pour réciter un prologue vêtue en Christkind.|ドレスデンのシュトリーツェルマルクトは1434年から毎年12月に開かれており、記録に残る国内最古のクリスマス市とされる。一方ニュルンベルクのクリストキントレスマルクトは毎年、市から選ばれた少女がクリストキント(幼子キリスト)に扮して口上を述べて開幕する。この二つの市だけで、シーズン中に数百トンのジンジャーブレッドと焼きアーモンドが売られる。",
    ),
    f: t(
      "The Nuremberg market's Christkind tradition dates back to the Reformation, when Protestant reformers tried to replace Saint Nicholas as the gift-bringer with a Christ-child figure instead — the substitution mostly failed elsewhere, but the market kept the character as its mascot.|La tradición del Christkind del mercado de Núremberg se remonta a la Reforma, cuando los reformadores protestantes intentaron sustituir a San Nicolás por una figura del niño Jesús; la sustitución fracasó en casi todas partes, pero el mercado conservó al personaje como su mascota.|La tradition du Christkind au marché de Nuremberg remonte à la Réforme, quand les réformateurs protestants tentèrent de remplacer saint Nicolas par une figure d'enfant Jésus — la substitution échoua presque partout ailleurs, mais le marché a conservé le personnage comme mascotte.|ニュルンベルクの市のクリストキントの伝統は宗教改革にまでさかのぼる。プロテスタントの改革者たちは、贈り物を運ぶ聖ニコラウスを幼子キリストの姿に置き換えようとした。この置き換えはほかの土地ではほぼ失敗に終わったが、この市だけはそのキャラクターをマスコットとして残した。",
    ),
  },
  {
    e: "🎇",
    n: t("Silvester fireworks ring in the new year|Los fuegos de Silvester reciben el año nuevo|Les feux de la Saint-Sylvestre accueillent la nouvelle année|ジルヴェスターの花火が新年を告げる"),
    t: t(
      "For one night only, private citizens are legally allowed to buy and set off fireworks, and the result is a self-organised barrage loud enough that some cities now hand out earplugs to worried pet owners in advance. Households also serve Berliner doughnuts on New Year's Eve, and tradition holds that exactly one in the batch, unmarked, is filled with mustard instead of jam.|Solo esa noche los particulares pueden comprar y lanzar fuegos artificiales legalmente, y el resultado es un bombardeo autoorganizado tan ruidoso que algunas ciudades ya reparten tapones para los oídos entre dueños de mascotas preocupados. Los hogares también sirven berlinesas en Nochevieja, y una, sin marcar, lleva mostaza en vez de mermelada.|Cette seule nuit de l'année, les particuliers ont le droit d'acheter et de tirer des feux d'artifice, et il en résulte un bombardement autoorganisé si bruyant que certaines villes distribuent désormais des bouchons d'oreilles aux propriétaires d'animaux inquiets. Les foyers servent aussi des beignets Berliner, et l'un d'eux, sans marque, est fourré à la moutarde plutôt qu'à la confiture.|この一晩だけ、市民は合法的に花火を買って打ち上げることができ、結果として自然発生的な大騒音の饗宴になる。心配するペットの飼い主のために耳栓を事前に配る自治体も出てきたほどである。大晦日にはベルリーナー(揚げ菓子)も食べられ、印のない一個だけがジャムではなくマスタード入りになっているという言い伝えがある。",
    ),
    f: t(
      "The tradition of watching Dinner for One, a short English-language comedy sketch almost unknown in Britain itself, on television every 31 December has run unbroken since 1972 and is now watched by more people in Germany each year than almost any other single broadcast.|La tradición de ver Dinner for One, un breve sketch cómico en inglés casi desconocido en el propio Reino Unido, en televisión cada 31 de diciembre se mantiene ininterrumpida desde 1972 y hoy la ve más gente en Alemania cada año que casi cualquier otra emisión concreta.|La tradition de regarder Dinner for One, un court sketch comique en anglais presque inconnu au Royaume-Uni lui-même, à la télévision chaque 31 décembre se poursuit sans interruption depuis 1972, et plus de gens la regardent chaque année en Allemagne que presque toute autre émission unique.|『ディナー・フォー・ワン』という、本国イギリスではほぼ無名の短い英語のコメディ寸劇を毎年12月31日にテレビで見る習わしは1972年から途切れることなく続いており、いまではドイツで一年のどの単独番組よりも多くの人に見られている。",
    ),
  },
  {
    e: "🎭",
    n: t("Karneval takes over the Rhineland|El Karneval toma Renania|Le Karneval s'empare de la Rhénanie|カーニバルがラインラントを乗っ取る"),
    t: t(
      "Cologne, Düsseldorf and Mainz each crown their own Karneval prince and elect a mock city council months in advance, building up to Rosenmontag, Rose Monday, when parade floats mocking the year's politicians roll through streets packed with costumed crowds catching thrown sweets. Offices in the Rhineland unofficially empty out for the whole week, a custom serious enough that some employers now write it into the calendar rather than fight it.|Colonia, Düsseldorf y Maguncia coronan cada una a su propio príncipe del Karneval y eligen un ayuntamiento ficticio con meses de antelación, en el camino hacia el Rosenmontag, el Lunes de Rosas, cuando carrozas que se burlan de los políticos del año recorren calles llenas de gente disfrazada.|Cologne, Düsseldorf et Mayence couronnent chacune leur propre prince du Karneval et élisent un conseil municipal fictif des mois à l'avance, dans la montée vers le Rosenmontag, le Lundi des Roses, quand des chars raillant les politiciens de l'année défilent dans des rues bondées de gens costumés.|ケルン・デュッセルドルフ・マインツはそれぞれ独自のカーニバルの「王子」を戴冠させ、何か月も前から模擬の市議会まで選出して、その年の政治家を風刺した山車が仮装した群衆でひしめく通りを練り歩く「バラの月曜日」ローゼンモンタークへと盛り上がっていく。ラインラントのオフィスはこの一週間、非公式にほぼ空になる。",
    ),
    f: t(
      "The date moves with Easter, so Rosenmontag can fall anywhere from early February to early March, and the whole season formally opens each year at exactly 11 minutes past 11 o'clock on 11 November, for reasons no one now agrees on.|La fecha se mueve con la Pascua, así que el Rosenmontag puede caer entre principios de febrero y principios de marzo, y toda la temporada se abre oficialmente cada año exactamente a las 11:11 del 11 de noviembre, por razones sobre las que ya nadie se pone de acuerdo.|La date suit Pâques, si bien que le Rosenmontag peut tomber entre début février et début mars, et toute la saison ouvre officiellement chaque année à exactement 11h11 le 11 novembre, pour des raisons sur lesquelles plus personne ne s'accorde.|この日取りは復活祭に連動して動くため、ローゼンモンタークは2月初めから3月初めまでの間のどこかになる。そしてシーズンは毎年、正確に11月11日11時11分に正式開幕する。その理由については、もはや誰の意見も一致していない。",
    ),
  },
  {
    e: "🌤️",
    n: t("Frühjahrsputz and the first market stalls|El Frühjahrsputz y los primeros puestos de mercado|Le Frühjahrsputz et les premiers étals|春の大掃除フリューヤールスプッツと最初の露店"),
    t: t(
      "Households throw open every window for the traditional spring clean, airing out rooms sealed against the cold since October, while riverside towns along the Rhine and Elbe watch the first cargo barges of the season pass now that the winter ice, when there was any, has finally cleared. Market squares that spent the winter hosting only a handful of vegetable stalls start filling back out again, in quiet preparation for the asparagus season a few weeks off.|Los hogares abren todas las ventanas para la tradicional limpieza de primavera, ventilando habitaciones selladas contra el frío desde octubre, mientras los pueblos ribereños del Rin y el Elba ven pasar las primeras barcazas de carga de la temporada. Las plazas de mercado empiezan a llenarse de nuevo, en silenciosa preparación para la temporada del espárrago.|Les foyers ouvrent grand toutes les fenêtres pour le grand nettoyage de printemps traditionnel, aérant des pièces closes contre le froid depuis octobre, tandis que les villes riveraines du Rhin et de l'Elbe voient passer les premières péniches de fret de la saison. Les places de marché recommencent à se remplir, en silencieuse préparation de la saison des asperges.|各家庭は伝統の春の大掃除のためにあらゆる窓を開け放ち、10月から寒さを防いで閉め切っていた部屋に風を通す。ライン川やエルベ川沿いの町では、あった年には冬の氷がようやく消え、その季節最初の貨物はしけが行き交うのを目にする。冬のあいだ野菜の露店がぽつぽつと出るだけだった市場の広場は、数週間先に迫ったアスパラガスの季節に向けて静かに賑わいを取り戻していく。",
    ),
    f: t(
      "River ice on the Rhine has become rare enough in recent decades that older accounts of townspeople walking or even driving carts across a frozen stretch now read, to younger readers, almost like folklore rather than living memory.|El hielo en el Rin se ha vuelto tan raro en las últimas décadas que los relatos antiguos de vecinos cruzando a pie, o incluso en carro, un tramo helado suenan hoy, para los más jóvenes, casi como leyenda.|La glace sur le Rhin est devenue si rare ces dernières décennies que les récits plus anciens d'habitants traversant à pied, voire en charrette, un tronçon gelé se lisent aujourd'hui, pour les plus jeunes, presque comme du folklore.|ここ数十年でライン川が結氷することはめっきり少なくなり、かつて凍った川面を町の人々が歩いて、あるいは荷馬車で渡ったという昔の記録は、いまの若い世代には生きた記憶というよりほとんど民話のように読める。",
    ),
  },
];
