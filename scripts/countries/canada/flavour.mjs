/**
 * カナダの国情報・地方区分・アイテム・厄災の神・季節。
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

export const CANADA_META = {
  id: "canada",
  name: t("Canada|Canadá|Canada|カナダ"),
  blurb: t(
    "A transcontinental country stitched together by a railway, from Pacific fjords to Arctic tundra to Atlantic fishing towns|Un país transcontinental cosido por un ferrocarril, desde fiordos del Pacífico hasta la tundra ártica y los pueblos pesqueros del Atlántico|Un pays transcontinental cousu ensemble par un chemin de fer, des fjords du Pacifique à la toundra arctique et aux villages de pêcheurs de l'Atlantique|太平洋のフィヨルドから北極圏のツンドラ、大西洋の漁村まで、一本の鉄道で縫い合わされた大陸横断の国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランス・世界一周・茨城と同じ理由。ここは暫定値100のまま)。
  cur: { pre: "C$", post: "", mul: 100 },
  start: "ottawa",
  cpuNames: ["Ogopogo", "La Chasse-galerie", "Old Yellow Top", "Bluenose"],
  // 国旗の赤、針葉樹林の深緑、湖と海の青、プレーリーの小麦色、雪と紙の白。
  stripe: ["#c8102e", "#1a5f3f", "#2f6ea8", "#e8b23c", "#f6efe2"],
};

/** 実際の州・準州を大まかにまとめた7区分。 */
export const CANADA_REGIONS = {
  bc: t("British Columbia|Columbia Británica|La Colombie-Britannique|ブリティッシュコロンビア"),
  ab: t("Alberta|Alberta|L'Alberta|アルバータ"),
  pr: t("The Prairies (Saskatchewan & Manitoba)|Las Praderas (Saskatchewan y Manitoba)|Les Prairies (Saskatchewan et Manitoba)|プレーリー(サスカチュワン・マニトバ)"),
  on: t("Ontario|Ontario|L'Ontario|オンタリオ"),
  qc: t("Quebec|Quebec|Le Québec|ケベック"),
  atl: t("Atlantic Canada|Canadá Atlántico|Le Canada atlantique|大西洋岸諸州"),
  north: t("The Territories (Yukon & NWT)|Los Territorios (Yukón y TNO)|Les Territoires (Yukon et TNO)|準州(ユーコン・ノースウエスト準州)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 *
 * 鍵は既存全盤面のキー一覧と突き合わせて重ならないことを確認済み
 * (`node -e '...'` で country-index.json 経由の全キーを列挙して照合。
 * 詳細は REGISTER.md)。英語圏で当たりやすい平易な語(road/atlas/coach等)は
 * 避け、カナダに固有の語・実在の列車名を選んである。
 */
export const CANADA_ITEMS = {
  bushplane: {
    e: "🛩️",
    price: 240,
    kind: "move",
    n: t("A Charter on a Bush Plane|Un vuelo chárter en avioneta|Un vol nolisé en hydravion de brousse|ブッシュプレーンのチャーター便"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Small floatplanes and ski-planes remain the only way in or out of hundreds of northern communities that no road or rail line reaches, landing on whatever lake or gravel strip is closest to level. A charter pilot up here is expected to double as a mechanic, a weather forecaster and, when the strip is too short, a very calm passenger.|Los pequeños hidroaviones y aviones de esquís siguen siendo la única forma de entrar o salir de cientos de comunidades norteñas a las que no llega ninguna carretera ni vía férrea, aterrizando en el lago o la pista de grava más nivelada que encuentran. Un piloto chárter aquí debe hacer también de mecánico, meteorólogo y, cuando la pista es demasiado corta, de pasajero muy tranquilo.|Les petits hydravions et avions à skis restent le seul moyen d'entrer ou de sortir de centaines de communautés nordiques qu'aucune route ni voie ferrée n'atteint, se posant sur le lac ou la piste de gravier la plus plate qui soit. Un pilote nolisé ici doit aussi savoir jouer les mécaniciens, les météorologues et, quand la piste est trop courte, les passagers très calmes.|小型の水上機やスキー付き機は、道路も鉄道も届かない北方の何百もの集落にとって、いまも唯一の出入りの手段である。いちばん水平に近い湖や砂利の滑走路を見つけて降りる。ここのチャーターパイロットは整備士でも気象予報士でもあり、滑走路が短すぎるときは自分自身もひどく落ち着いた乗客でいなければならない。",
    ),
  },
  portage: {
    e: "🛶",
    price: 380,
    kind: "pre",
    n: t("A Canoe Portage|Un porteo en canoa|Un portage en canot|カヌーのポーテージ"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Voyageurs of the fur trade carried both canoe and cargo overland between rivers on their own backs, and a portage's length was measured not in metres but in the number of times a load had to be set down to rest — the same units still marked on canoe-route maps today. A skilled voyageur could carry two 40-kilogram bundles at once, one on the back and one balanced on top.|Los voyageurs del comercio de pieles cargaban tanto la canoa como el equipaje a hombros entre ríos, y la longitud de un porteo no se medía en metros sino en el número de veces que había que dejar la carga en el suelo para descansar, las mismas unidades que aún marcan los mapas de rutas de canotaje. Un voyageur diestro podía llevar dos fardos de 40 kilos a la vez.|Les voyageurs de la traite des fourrures portaient à dos d'homme le canot et la cargaison entre deux rivières, et la longueur d'un portage ne se mesurait pas en mètres mais au nombre de fois où il fallait déposer la charge pour se reposer — les mêmes unités qui figurent encore sur les cartes de routes de canot aujourd'hui. Un voyageur habile pouvait porter deux ballots de 40 kg à la fois.|毛皮交易のヴォワイアジャーたちは、カヌーも荷も自分の背で川から川へと陸路運んだ。ポーテージの長さはメートルではなく、荷を下ろして休む回数で測られた。この単位はいまもカヌー航路の地図に記されている。熟達したヴォワイアジャーは40キロの荷を二つ、背中と頭上に一つずつ、同時に運ぶことができたという。",
    ),
  },
  oceantrain: {
    e: "🚋",
    price: 360,
    kind: "pre",
    n: t("A Ticket on The Ocean|Un billete en The Ocean|Un billet pour The Ocean|「ジ・オーシャン」の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Running between Montreal and Halifax since 1904, The Ocean is one of the oldest named passenger trains still operating anywhere in North America, older than the province of Saskatchewan itself. Its route still follows the Bay of Fundy shore for long stretches, timed so that daylight hours catch the coast.|En marcha entre Montreal y Halifax desde 1904, The Ocean es uno de los trenes de pasajeros con nombre más antiguos que aún operan en Norteamérica, más viejo que la propia provincia de Saskatchewan. Su ruta aún sigue la costa de la bahía de Fundy en largos tramos.|En circulation entre Montréal et Halifax depuis 1904, The Ocean est l'un des plus anciens trains de voyageurs nommés encore en service en Amérique du Nord, plus vieux que la province de la Saskatchewan elle-même. Son tracé longe encore la baie de Fundy sur de longs tronçons.|1904年からモントリオールとハリファックスのあいだを走る「ジ・オーシャン」は、北米で現役として走る名前付き旅客列車の中でも指折りの古株で、サスカチュワン州そのものより歴史が長い。いまもファンディ湾の海岸線に沿って長い区間を走り、日中に海が見えるよう時刻が組まれている。",
    ),
  },
  canadianrail: {
    e: "🚆",
    price: 640,
    kind: "pre",
    n: t("A Ticket on The Canadian|Un billete en The Canadian|Un billet pour The Canadian|「ザ・カナディアン」の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "VIA Rail's flagship transcontinental train covers roughly 4,466 km between Toronto and Vancouver over four nights, still pulled in part by stainless-steel dome and sleeper cars built for the original Canadian Pacific service in the 1950s. The route crosses the Rockies through Yellowhead Pass rather than the steeper Kicking Horse line the railway's builders originally chose.|El tren transcontinental insignia de VIA Rail recorre unos 4.466 km entre Toronto y Vancouver en cuatro noches, tirado en parte todavía por vagones cúpula y coches cama de acero inoxidable construidos para el servicio original de Canadian Pacific en los años cincuenta. La ruta cruza las Rocosas por el paso Yellowhead.|Le train transcontinental phare de VIA Rail parcourt environ 4 466 km entre Toronto et Vancouver en quatre nuits, tiré en partie par des voitures-dômes et des wagons-lits en acier inoxydable construits pour le service original du Canadien Pacifique dans les années 1950. Le tracé franchit les Rocheuses par le col Yellowhead.|VIA鉄道の看板列車である大陸横断特急は、トロントとバンクーバーのあいだおよそ4,466kmを4泊かけて走る。いまも一部の車両は、1950年代にカナダ太平洋鉄道の元祖サービス用に造られたステンレス製の展望車と寝台車である。経路はロッキー山脈を、建設当初に選ばれたより急なキッキング・ホース線ではなくイエローヘッド峠で越える。",
    ),
  },
  bearbells: {
    e: "🔔",
    price: 320,
    kind: "passive",
    n: t("A String of Bear Bells|Un cordón de campanillas antiosos|Un chapelet de clochettes anti-ours|クマよけの鈴の紐"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Hikers tie small bells to a pack or belt so that a steady jingle announces their approach well before they round a blind bend in the trail, since most bears would rather avoid a surprise encounter than have one. Some backcountry guides call them 'dinner bells' instead, only half joking that the sound just tells a bear where to find you.|Los excursionistas atan campanillas a la mochila o el cinturón para que un tintineo constante anuncie su llegada mucho antes de doblar una curva ciega del sendero, ya que la mayoría de los osos prefiere evitar un encuentro sorpresa a tenerlo. Algunos guías de montaña las llaman en broma 'campanas de la cena'.|Les randonneurs attachent de petites clochettes à leur sac ou leur ceinture pour qu'un tintement constant annonce leur approche bien avant un virage sans visibilité du sentier, la plupart des ours préférant éviter une rencontre surprise. Certains guides de l'arrière-pays les surnomment, mi-sérieux, les « clochettes du dîner ».|ハイカーはザックやベルトに小さな鈴を結びつけ、絶え間ない音で見通しの悪い曲がり角の手前から自分の接近を知らせる。ほとんどのクマは不意の遭遇よりそれを避けたがるからである。奥地のガイドの中には、この鈴を半ば冗談で「夕食の鐘」と呼ぶ者もいる。音がクマにこちらの居場所を教えているだけだ、というわけである。",
    ),
  },
  bearspray: {
    e: "🧴",
    price: 440,
    kind: "pre",
    n: t("A Can of Bear Spray|Un bote de espray antiosos|Une bombe de poivre à ours|クマよけスプレーの缶",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "A strong capsaicin fog, not a repellent scent, is what actually works — spraying it on a tent or pack ahead of time does nothing but attract animals curious about the smell. Parks staff recommend practising the draw beforehand, since fumbling with the safety clip in the two or three seconds a real encounter allows is a common way for it to go unused.|Lo que realmente funciona es una nube fuerte de capsaicina, no un aroma repelente; rociarla de antemano en una tienda o mochila no hace más que atraer a animales curiosos por el olor. El personal de los parques recomienda practicar el gesto de desenfundar antes, porque forcejear con el seguro en los dos o tres segundos que da un encuentro real es una forma común de que quede sin usar.|Ce qui fonctionne vraiment, c'est un nuage dense de capsaïcine, pas un parfum répulsif ; en vaporiser à l'avance sur une tente ou un sac ne fait qu'attirer des animaux curieux de l'odeur. Le personnel des parcs recommande de s'entraîner au dégainage, car tâtonner avec le cran de sécurité dans les deux ou trois secondes qu'offre une vraie rencontre est une façon fréquente qu'elle reste inutilisée.|実際に効くのは香りで追い払う忌避剤ではなく、強烈なカプサイシンの霧である。テントやザックに前もって吹きかけても、匂いに興味を持った動物を呼び寄せるだけで意味がない。公園スタッフは事前に抜く練習をしておくよう勧める。実際の遭遇で与えられる二、三秒のうちに安全クリップに手間取ってしまい、結局使えないまま終わることが多いからである。",
    ),
  },
  almanac: {
    e: "📖",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Dog-Eared Farmers' Almanac|Un almanaque agrícola muy usado|Un almanach agricole tout écorné|使い古された農事暦"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Annual almanacs have printed long-range weather predictions, planting dates and folk wisdom for Canadian farmers since well into the 1800s, and this dog-eared copy has notes scribbled in three different generations of handwriting in the margins. Nobody in the family fully trusts the forecasts, but nobody has thrown the book out either.|Los almanaques anuales han impreso pronósticos meteorológicos a largo plazo, fechas de siembra y sabiduría popular para los agricultores canadienses desde bien entrado el siglo XIX, y este ejemplar gastado tiene anotaciones garabateadas de tres generaciones distintas en los márgenes. Nadie en la familia confía del todo en los pronósticos, pero tampoco nadie ha tirado el libro.|Les almanachs annuels impriment des prévisions météo à long terme, des dates de semis et de la sagesse populaire pour les agriculteurs canadiens depuis bien avant le XXe siècle, et cet exemplaire écorné porte des notes griffonnées de trois générations différentes dans les marges. Personne dans la famille ne fait tout à fait confiance aux prévisions, mais personne n'a jeté le livre non plus.|年刊の農事暦は、19世紀のうちからカナダの農家に向けて長期の天気予報や種まきの時期、言い伝えを載せてきた。この使い古された一冊の余白には、三世代分の異なる筆跡の書き込みが残っている。家族の誰も予報を心底信じてはいないが、誰もこの本を捨てたことはない。",
    ),
  },
  loonie: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Handful of Old Loonies|Un puñado de loonies viejos|Une poignée de vieux huards|古い1ドルコインの束"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The one-dollar coin has carried a common loon on its reverse since 1987, and its nickname stuck so firmly that the two-dollar coin introduced later was simply called the toonie by the public before the mint had settled on anything official. An early production error struck a small batch without the loon's usual mint mark, and those coins now sell to collectors for far more than a dollar.|La moneda de un dólar lleva un colimbo común en el reverso desde 1987, y su apodo se afianzó tanto que la moneda de dos dólares introducida después el público simplemente la llamó 'toonie' antes de que la casa de moneda decidiera nada oficial. Un error de producción temprano acuñó un pequeño lote sin la marca de ceca habitual del colimbo, y esas monedas hoy se venden a coleccionistas por mucho más de un dólar.|La pièce d'un dollar porte un plongeon huard au revers depuis 1987, et son surnom s'est tellement imposé que la pièce de deux dollars introduite plus tard fut simplement appelée « toonie » par le public avant que la Monnaie ne tranche officiellement. Une erreur de production précoce a frappé un petit lot sans la marque d'atelier habituelle du huard, et ces pièces se vendent aujourd'hui aux collectionneurs bien plus cher qu'un dollar.|1ドル硬貨は1987年から裏面にアビ(潜り鳥)が描かれており、その愛称があまりに定着したため、後に登場した2ドル硬貨も造幣局が正式名称を決める前から国民に「トゥーニー」と呼ばれるようになった。初期の製造過程での誤りで、通常あるはずのアビの刻印が抜け落ちた一群が鋳造されたことがあり、それらはいまコレクター相手に1ドルをはるかに超える値で取引されている。",
    ),
  },
  doubledouble: {
    e: "☕",
    price: 420,
    kind: "pre",
    n: t("A Double-Double, Extra Hot|Un doble-doble, extra caliente|Un double-double, extra chaud|ダブルダブル、熱々で",
    ),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A 'double-double' — two creams, two sugars — is ordered so often at the country's biggest coffee chain that the words have become their own shorthand at the drive-thru speaker, understood the same way from a small-town window as a big-city one. On a cold morning, the line can stretch around the building and still move faster than making coffee at home.|Un 'double-double' —dos cremas, dos azúcares— se pide tan a menudo en la mayor cadena de café del país que la frase se ha vuelto una fórmula propia en el altavoz del drive-thru, entendida igual en una ventanilla de pueblo que en una de la gran ciudad. En una mañana fría, la fila puede rodear el edificio y aun así avanzar más rápido que preparar café en casa.|Un « double-double » — deux crèmes, deux sucres — se commande si souvent à la plus grande chaîne de café du pays que l'expression est devenue son propre raccourci au micro du service au volant, comprise de la même façon dans une petite ville que dans une grande. Par une matinée froide, la file peut faire le tour du bâtiment et avancer quand même plus vite que de préparer du café chez soi.|「ダブルダブル」(クリーム二つ、砂糖二つ)は、国内最大のコーヒーチェーンであまりに頻繁に注文されるため、ドライブスルーのスピーカー越しにそれ自体が一つの符丁になっている。小さな町の窓口でも大都市の窓口でも同じように通じる。寒い朝には建物をぐるりと囲むほどの行列ができるが、それでも家でコーヒーを淹れるより早く順番が回ってくる。",
    ),
  },
};

/**
 * 厄災の神。カナダの森に伝わるとされる巨大でシャイなサスクワッチ(ビッグフット)
 * にした。人を苦しめる怪物ではなく、大きすぎていたずら好きなだけの存在として
 * 描く(韓国のトッケビ・茨城のダイダラボウと同じ「残酷ではなく度が過ぎるだけ」)。
 * サスクワッチ伝承は先住民の口承にも西洋の開拓者の逸話にも見られるが、ここでは
 * 特定の民族の信仰と結び付けず、山師や木こりのキャンプ話として広く流布した
 * 伝聞の水準で扱う。
 */
export const CANADA_SPIRIT = {
  e: "🦶",
  n: t("The Sasquatch|El Sasquatch|Le Sasquatch|サスクワッチ"),
  big: t("The Sasquatch's Log-Toss|El lanzamiento de troncos del Sasquatch|Le lancer de bûche du Sasquatch|サスクワッチの丸太投げ"),
  ward: "bearbells",
  arrive: t(
    "<b>🦶 A sasquatch has taken an interest in you.</b> Old woodsmen's tales describe a huge, shy figure that leaves footprints twice the length of a boot print and vanishes into the trees the moment it's looked at directly — more curious about a camp's food than dangerous to the people in it. It now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🦶 Un sasquatch se ha fijado en ti.</b> Los viejos cuentos de leñadores describen a una figura enorme y esquiva que deja huellas del doble de largo que una bota y se esfuma entre los árboles en cuanto la miran directamente, más curiosa por la comida del campamento que peligrosa para su gente. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🦶 Un sasquatch s'est intéressé à toi.</b> Les vieux récits de bûcherons décrivent une silhouette immense et farouche qui laisse des empreintes deux fois plus longues qu'une botte et s'évanouit entre les arbres dès qu'on la regarde en face, plus curieuse de la nourriture d'un camp que dangereuse pour ses occupants. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🦶 サスクワッチに目を付けられた。</b> 木こりたちの昔語りによれば、それは長靴の跡の倍もある足跡を残す、巨大で人見知りな姿をしており、まともに見られた瞬間に木立の中へ消えてしまうという。キャンプにいる人間そのものより、その食料に興味があるらしい。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🦶 <b>The sasquatch</b> loses interest and lumbers after <b>{0}</b>, farthest from {1}.|🦶 <b>El sasquatch</b> pierde el interés y va tras <b>{0}</b>, el más lejano de {1}, con paso pesado.|🦶 <b>Le sasquatch</b> se désintéresse et se traîne vers <b>{0}</b>, le plus loin de {1}.|🦶 <b>サスクワッチ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへのっそりと歩いていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the sasquatch and never once startled it into running off. It plants two enormous feet and challenges the whole road to a log-toss — <b>the Sasquatch's Log-Toss</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al sasquatch sin haber logrado espantarlo ni una vez. Planta sus dos pies enormes y reta a todo el camino a un lanzamiento de troncos: empieza <b>el lanzamiento de troncos del Sasquatch</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le sasquatch sans jamais avoir réussi à l'effrayer. Il plante ses deux pieds énormes et défie toute la route à un lancer de bûche : <b>le lancer de bûche du Sasquatch</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもサスクワッチと歩いていながら、一度もそれを驚かせて追い払えなかった。巨大な両足をどしんと踏みしめ、道行く者すべてに丸太投げを挑む。<b>サスクワッチの丸太投げ</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in camp tales, a sasquatch startles at a sudden loud noise more than almost anything else — bang two pots together and it bolts for the treeline before the second clang finishes ringing. Nobody playing this game has tried banging pots yet.|<b>Tras la historia:</b> en los cuentos de campamento, un sasquatch se asusta con un ruido fuerte y repentino más que con casi cualquier otra cosa: entrechoca dos ollas y sale disparado hacia los árboles antes de que termine el segundo golpe. Nadie en esta partida ha probado a golpear ollas todavía.|<b>Derrière l'histoire :</b> dans les récits de camp, un sasquatch sursaute à un bruit fort et soudain plus qu'à presque tout le reste : entrechoquez deux casseroles et il file vers la lisière des bois avant même la fin du second coup. Personne dans cette partie n'a encore essayé de cogner des casseroles.|<b>物語の背景:</b> キャンプ話によれば、サスクワッチはほとんど何よりも突然の大きな音に驚くという。鍋を二つ打ち鳴らせば、二度目の音が鳴り終わる前に木立へ逃げ去るらしい。このゲームでは、まだ誰も鍋を打ち鳴らしてみていない。",
  ),
  pleased: t(
    "It hefts a fallen log to show off its strength, and the log splits apart, scattering a stash of coins some careless traveler had hidden inside a hollow. <b>{0}</b> gains <span class='money'>+{1}</span>.|Levanta un tronco caído para lucir su fuerza, y el tronco se parte, esparciendo un alijo de monedas que algún viajero descuidado había escondido en un hueco. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il soulève une bûche tombée pour montrer sa force, et la bûche se fend, éparpillant un magot de pièces qu'un voyageur négligent avait caché dans un creux. <b>{0}</b> gagne <span class='money'>+{1}</span>.|力を見せびらかそうと倒木を持ち上げると、丸太が真っ二つに割れ、うっかり者の旅人が中の空洞に隠していた銭がこぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A string of bear bells is hung where the wind will ring them all night. Sasquatch are said to hate a sudden bell above almost anything else, and it backs off into the trees, passing <b>{0}</b> by without noticing this turn.|Se cuelga un cordón de campanillas donde el viento las hará sonar toda la noche. Se dice que los sasquatch odian una campanilla repentina más que casi cualquier cosa, y retrocede hacia los árboles, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On accroche un chapelet de clochettes là où le vent les fera sonner toute la nuit. On dit que les sasquatchs détestent par-dessus tout une clochette soudaine, et il recule vers les bois, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|一晩じゅう風に鳴る場所にクマよけの鈴を吊るした。サスクワッチはほとんど何よりも不意の鈴の音を嫌うという。彼は木立へと後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。サスクワッチのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const CANADA_DOOM = [
  {
    id: "gravy-spill",
    n: t("Gravy down the front of a new coat|Salsa por delante del abrigo nuevo|De la sauce sur le devant du manteau neuf|新しいコートの前面にグレイビーがこぼれる"),
    t: t(
      "The rink concession line lurched forward just as the tray came level with a shoulder, and the curds and gravy landed exactly where a new coat had no business being tested this early in the winter. A dry-cleaner's rush fee costs about as much as a second helping would have.|La fila del puesto de la pista dio un tirón justo cuando la bandeja quedó a la altura de un hombro, y el queso en grano y la salsa cayeron justo donde un abrigo nuevo no debía probarse tan pronto en el invierno. El recargo urgente de la tintorería cuesta casi lo mismo que una segunda ración.|La file du kiosque de la patinoire a avancé d'un coup juste comme le plateau arrivait à hauteur d'épaule, et le fromage en grains et la sauce sont tombés exactement là où un manteau neuf n'avait pas à être testé si tôt dans l'hiver. Le supplément express du nettoyeur coûte à peu près le prix d'une seconde portion.|リンクの売店の列がちょうどトレーが肩の高さに来た瞬間に前へ詰まり、チーズカードとグレイビーが、この冬まだ試されて間もない新しいコートの前面にそのまま落ちた。クリーニング店の特急料金は、もう一皿頼めるくらいの値段がする。",
    ),
  },
  {
    id: "raccoon-cooler",
    n: t("A raccoon breaks into the camping cooler|Un mapache entra en la nevera del campamento|Un raton laveur s'introduit dans la glacière du camping|アライグマがキャンプのクーラーボックスを開けてしまう"),
    t: t(
      "The latch was supposedly raccoon-proof, but a determined pair of dexterous little paws worked it open sometime after the fire died down, and morning found the cooler tipped over with two nights of groceries scattered and half-eaten across the site. Campground raccoons learn cooler latches faster than most campers learn to actually secure them.|El cierre se suponía a prueba de mapaches, pero un par de patitas hábiles y decididas lo abrió en algún momento después de apagarse la fogata, y por la mañana la nevera estaba volcada con dos noches de compras esparcidas y medio comidas por el campamento. Los mapaches de los campings aprenden los cierres más rápido de lo que la mayoría de campistas aprende a asegurarlos.|Le loquet était censé être à l'épreuve des ratons laveurs, mais une paire de petites pattes habiles et déterminées l'a forcé quelque temps après l'extinction du feu, et le matin a révélé la glacière renversée, deux nuits de provisions éparpillées et à moitié mangées sur le site. Les ratons laveurs des campings apprennent les loquets plus vite que la plupart des campeurs n'apprennent à les fixer.|「アライグマ対策済み」のはずの留め金だったが、焚き火が消えたあとのどこかで、器用な小さな両手がそれをこじ開けてしまった。朝にはクーラーボックスがひっくり返り、二晩ぶんの食料がサイトじゅうに散らばって半分食べられていた。キャンプ場のアライグマは、たいていのキャンパーが留め金をきちんと固定する術を覚えるより早く、その開け方を覚える。",
    ),
    months: [1, 2, 3, 4],
  },
  {
    id: "black-ice-fender",
    n: t("A slide on black ice dents the fender|Un patinazo en hielo negro abolla el guardabarros|Une glissade sur de la glace noire cabosse le pare-chocs|ブラックアイスで滑ってフェンダーをへこます"),
    t: t(
      "The road looked merely wet under the streetlight, and only the sudden loss of steering made clear it was something else entirely until the curb arrived faster than expected. A body shop in any winter city keeps a waiting list for exactly this kind of dent from October through March.|La carretera parecía solo mojada bajo la farola, y solo la pérdida repentina de dirección dejó claro que era otra cosa por completo, hasta que la acera llegó más rápido de lo esperado. Un taller de chapa en cualquier ciudad invernal mantiene lista de espera para exactamente este tipo de abolladura.|La route semblait simplement mouillée sous le lampadaire, et seule la perte soudaine de direction a révélé qu'il s'agissait d'autre chose, jusqu'à ce que le trottoir arrive plus vite que prévu. Un atelier de carrosserie dans n'importe quelle ville d'hiver garde une liste d'attente pour exactement ce genre de bosse d'octobre à mars.|街灯の下では道路はただ濡れているだけに見えたが、突然ハンドルが利かなくなってはじめて、それが全く別のものだと分かった。歩道の縁石は思ったより早くやってきた。冬のある町の板金修理工場はどこも、10月から3月までまさにこの種のへこみで予約待ちになる。",
    ),
    months: [8, 9, 10],
  },
  {
    id: "blackfly-swarm",
    n: t("Blackflies descend in clouds|Los jejenes descienden en nubes|Les mouches noires descendent en nuées|ブヨの大群が押し寄せる"),
    t: t(
      "The bug spray ran out halfway through the hike, and the last stretch back to the car was covered at something close to a jog with a jacket zipped up over the nose. Blackfly season in the boreal forest lasts only a few intense weeks, which is little comfort while it is happening.|El repelente se acabó a medio camino de la caminata, y el último tramo de vuelta al auto se cubrió casi trotando con la chaqueta subida hasta la nariz. La temporada de jejenes en el bosque boreal dura solo unas pocas semanas intensas, lo cual consuela poco mientras ocurre.|Le chasse-moustiques s'est épuisé à mi-chemin de la randonnée, et le dernier tronçon jusqu'à la voiture s'est fait presque au petit trot, la veste remontée jusqu'au nez. La saison des mouches noires dans la forêt boréale ne dure que quelques semaines intenses, ce qui console peu pendant qu'elle sévit.|ハイキングの途中で虫よけスプレーが切れてしまい、車までの最後の区間はジャケットを鼻まで引き上げてほとんど小走りで戻る羽目になった。ボレアル林のブヨの季節はほんの数週間だけの激しいものだが、その最中はそれが慰めにならない。",
    ),
    months: [1, 2],
  },
  {
    id: "led-astray",
    n: t("Led in circles by the sasquatch|El sasquatch te hace caminar en círculos|Le sasquatch te fait tourner en rond|サスクワッチに堂々巡りさせられる"),
    t: t(
      "The trail markers looked exactly the same at every turn, and only after passing the same fallen log for the third time did it become clear that something enormous and unseen had been herding the path in a slow, wide circle. Bush pilots and hunters both tell some version of this story about the woods playing tricks on a full moon.|Las marcas del sendero parecían idénticas en cada recodo, y solo al pasar por tercera vez junto al mismo tronco caído quedó claro que algo enorme e invisible había estado guiando el camino en un círculo lento y amplio. Tanto pilotos de avioneta como cazadores cuentan alguna versión de esta historia.|Les marques du sentier semblaient identiques à chaque tournant, et ce n'est qu'en repassant pour la troisième fois devant la même bûche tombée qu'il devint clair que quelque chose d'énorme et d'invisible avait guidé le chemin en un cercle lent et large. Pilotes de brousse et chasseurs racontent tous deux une version de cette histoire.|小道の目印はどの角を曲がっても同じに見え、同じ倒木を三度目に通り過ぎてようやく、何か巨大で見えないものが道をゆっくり大きな円に沿って誘導していたのだと分かった。ブッシュパイロットも猟師も、満月の夜に森がいたずらをするというこの手の話を口にする。",
    ),
  },
  {
    id: "drive-thru-line",
    n: t("Stuck behind a huge drive-thru line|Atrapado tras una enorme fila de autoservicio|Coincé derrière une immense file au service au volant|ドライブスルーの長い行列にはまる"),
    t: t(
      "A delivery truck had blocked half the lane just as the morning rush hit its peak, and what should have been a two-minute coffee stop turned into twenty-five minutes of idling with the meter on a parking spot elsewhere quietly running out. Every driver in line agreed it was worth it once the coffee finally arrived.|Un camión de reparto había bloqueado media fila justo cuando el ajetreo matutino llegaba a su punto máximo, y lo que debía ser una parada de dos minutos por un café se convirtió en veinticinco minutos al ralentí, mientras en otro lugar se agotaba en silencio el tiempo de un parquímetro.|Un camion de livraison bloquait la moitié de la voie juste au pic de l'affluence du matin, et ce qui devait être un arrêt-café de deux minutes s'est transformé en vingt-cinq minutes au ralenti, pendant qu'ailleurs le compteur de stationnement s'épuisait tranquillement.|配送トラックが車線の半分を塞いだのが、ちょうど朝のラッシュが最も混み合う時間帯だった。二分で済むはずのコーヒー休憩は、アイドリングしたまま25分に延び、その間よそに停めた車のパーキングメーターが静かに切れていった。列に並んでいた誰もが、コーヒーが届いた瞬間には待った甲斐があったと認めた。",
    ),
  },
  {
    id: "ice-storm-outage",
    n: t("An ice storm drops the power for days|Una tormenta de hielo corta la luz por días|Une tempête de verglas coupe le courant pendant des jours|着氷性の嵐で何日も停電する"),
    t: t(
      "Every branch in the neighbourhood was sheathed in a centimetre of clear ice by morning, beautiful right up until the weight started bringing down power lines one by one. A generator rental and a freezer full of food gone soft add up fast when the outage runs past the second day.|Cada rama del barrio quedó recubierta de un centímetro de hielo transparente por la mañana, hermosa hasta que el peso empezó a derribar las líneas eléctricas una a una. El alquiler de un generador y un congelador lleno de comida ablandada suman rápido cuando el corte pasa del segundo día.|Chaque branche du quartier était gainée d'un centimètre de glace claire au matin, magnifique jusqu'à ce que le poids commence à faire tomber les lignes électriques une à une. La location d'une génératrice et un congélateur plein de nourriture ramollie, ça chiffre vite quand la panne dépasse le deuxième jour.|朝には近所じゅうの枝という枝が1センチほどの透き通った氷に覆われていた。見とれるほど美しかったが、それも重みで電線が一本ずつ切れ始めるまでのことだった。停電が二日を超えると、発電機のレンタル代と溶けかけた冷凍庫の中身の損失があっという間に積み重なる。",
    ),
    months: [8, 9],
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、地方まるごとの好不況で
 * 差をつける(効果の数値は `src/infrastructure/content/season-and-doom-rules.ts`
 * の canada の項)。
 */
export const CANADA_SEASONS = [
  {
    e: "🍁",
    n: t("The last sap boils down as the snow melts|La última savia se hierve mientras la nieve se derrite|La dernière sève bout tandis que la neige fond|最後の樹液を煮詰め、雪が解けていく"),
    t: t(
      "Sugar shacks across the east run their last boils of the year as nights stop dropping below freezing, closing out a season that can be over in as little as four or five weeks. Stanley Cup playoff hockey starts the same month, and office pools tracking it appear in workplaces that show no other interest in the sport all year.|Las cabañas de azúcar del este hacen sus últimas hervidas del año a medida que las noches dejan de bajar de cero, cerrando una temporada que puede durar apenas cuatro o cinco semanas. Los playoffs de la Copa Stanley comienzan el mismo mes, y aparecen quinielas de oficina en lugares de trabajo sin ningún otro interés en el hockey el resto del año.|Les cabanes à sucre de l'est font leurs dernières bouillies de l'année à mesure que les nuits cessent de descendre sous zéro, clôturant une saison qui peut ne durer que quatre ou cinq semaines. Les séries éliminatoires de la Coupe Stanley commencent le même mois, et des cagnottes de bureau apparaissent dans des lieux de travail qui ne montrent aucun autre intérêt pour le hockey le reste de l'année.|夜が氷点下に下がらなくなるにつれ、東部のシュガーシャックはその年最後の煮詰めを行う。この季節はわずか4、5週間で終わることもある。スタンレーカップ・プレーオフも同じ月に始まり、一年の他の時期はホッケーに何の関心も示さない職場にまでオフィス内の勝敗予想が現れる。",
    ),
    f: t(
      "A sugar shack's sap run depends entirely on nights that still freeze and days that thaw; a warm spring that skips the freeze-thaw cycle can cut a season short no matter how many taps are in the trees.|La corrida de savia de una cabaña de azúcar depende por completo de noches que aún hielan y días que deshielan; una primavera cálida que se salta el ciclo de hielo y deshielo puede acortar la temporada sin importar cuántos grifos haya en los árboles.|La coulée de sève d'une cabane à sucre dépend entièrement de nuits qui gèlent encore et de jours qui dégèlent ; un printemps chaud qui saute le cycle gel-dégel peut écourter la saison, peu importe le nombre d'entailles dans les arbres.|シュガーシャックの樹液採取は、夜はまだ凍り昼は溶けるという条件に完全に左右される。この凍結と融解の繰り返しを飛ばしてしまう暖かい春が来ると、木にどれだけタップを打っていても季節は短く終わってしまう。",
    ),
  },
  {
    e: "🚤",
    n: t("The May long weekend opens cottage country|El puente de mayo abre la temporada de cabañas|Le long week-end de mai ouvre le pays des chalets|5月の連休で別荘地の季節が開く"),
    t: t(
      "Docks go back in the water and boats come out of storage across the country the same weekend, an unofficial start-of-summer marked more by the mass movement of trailers on the highway than by the weather, which is rarely reliably warm yet. Garden centres sell more bedding plants this single weekend than in the rest of the month combined.|Los muelles vuelven al agua y los botes salen del almacenamiento en todo el país el mismo fin de semana, un inicio no oficial del verano marcado más por el movimiento masivo de remolques en la autopista que por el clima, que rara vez es fiablemente cálido todavía. Los viveros venden más plantines este único fin de semana que en el resto del mes junto.|Les quais retournent à l'eau et les bateaux sortent d'entreposage partout au pays le même week-end, un début d'été officieux marqué davantage par le mouvement massif de remorques sur l'autoroute que par la météo, rarement fiablement chaude encore. Les jardineries vendent plus de fleurs annuelles ce seul week-end que le reste du mois réuni.|同じ週末、国じゅうで桟橋が水に戻され、ボートが倉庫から出される。まだ天気があてにならないことも多いこの時期の「夏の非公式な始まり」は、天候そのものよりもハイウェイを埋めるトレーラーの大移動によって印づけられる。園芸店はこの一つの週末だけで、残りの月をすべて合わせたより多くの苗を売る。",
    ),
    f: t(
      "The holiday's official name honours Queen Victoria's birthday and has been marked since 1845, though in Quebec the same long weekend is observed instead as National Patriots' Day.|El nombre oficial del festivo honra el cumpleaños de la reina Victoria y se celebra desde 1845, aunque en Quebec el mismo puente se observa en cambio como el Día Nacional de los Patriotas.|Le nom officiel du congé honore l'anniversaire de la reine Victoria et est célébré depuis 1845, bien qu'au Québec le même long week-end soit plutôt observé comme la Journée nationale des patriotes.|この祝日の正式名称はビクトリア女王の誕生日を記念するもので、1845年から祝われてきた。もっともケベック州では同じ連休を「愛国者の日」として祝う。",
    ),
  },
  {
    e: "🦟",
    n: t("Construction season starts as blackflies rule the north|La temporada de obras empieza mientras los jejenes dominan el norte|La saison des chantiers débute tandis que les mouches noires règnent au nord|ブヨが北を支配し、建設シーズンが始まる"),
    t: t(
      "The ground finally thaws deep enough for heavy equipment across most of the country, and road crews compress a year's worth of paving into the few frost-free months available. Further north, blackfly season peaks hard enough that outdoor work sometimes means a head net regardless of the heat.|El suelo finalmente se descongela lo bastante hondo para la maquinaria pesada en casi todo el país, y las cuadrillas viales comprimen un año de pavimentación en los pocos meses sin heladas disponibles. Más al norte, la temporada de jejenes llega a un punto tan alto que el trabajo al aire libre a veces exige una redecilla para la cabeza pese al calor.|Le sol dégèle enfin assez profondément pour la machinerie lourde dans la majeure partie du pays, et les équipes de voirie compriment une année de pavage dans les quelques mois sans gel disponibles. Plus au nord, la saison des mouches noires atteint un tel pic que le travail extérieur exige parfois un filet anti-insectes malgré la chaleur.|地面がようやく重機を支えられるほど深く解け、国の大半で道路工事のクルーは、限られた凍結のない数か月に一年分の舗装工事を詰め込む。さらに北では、ブヨの季節が激しいピークを迎え、暑さにもかかわらず屋外作業に防虫ネットが要ることもある。",
    ),
    f: t(
      "National Indigenous Peoples Day falls late in this month, chosen to coincide with the summer solstice, a date already significant in many Indigenous cultures across the country long before the observance was formally established in 1996.|El Día Nacional de los Pueblos Indígenas cae a fines de este mes, elegido para coincidir con el solsticio de verano, una fecha ya significativa en muchas culturas indígenas del país mucho antes de que la observancia se estableciera formalmente en 1996.|La Journée nationale des peuples autochtones tombe à la fin de ce mois, choisie pour coïncider avec le solstice d'été, une date déjà significative dans de nombreuses cultures autochtones du pays bien avant que la commémoration ne soit officiellement établie en 1996.|「先住民族の日」はこの月の終わりに置かれ、夏至と重なるよう選ばれている。この日付は1996年に正式に制定されるよりずっと前から、国内の多くの先住民文化にとって意味のある日だった。",
    ),
  },
  {
    e: "🎆",
    n: t("Canada Day opens the height of summer|El Día de Canadá abre el pleno verano|La fête du Canada ouvre le cœur de l'été|カナダ・デーが真夏の始まりを告げる"),
    t: t(
      "Flags and fireworks mark the anniversary of Confederation on the first, and from here the calendar is wall-to-wall festivals, patios and long daylight until well past nine at night in the north. Wildfire season also builds through this month in BC and Alberta, and a smoky haze can travel provinces from a fire nobody nearby has actually seen.|Banderas y fuegos artificiales marcan el aniversario de la Confederación el día uno, y de aquí en adelante el calendario se llena de festivales, terrazas y luz diurna que se extiende hasta bien pasadas las nueve de la noche en el norte. La temporada de incendios forestales también se intensifica este mes en BC y Alberta.|Drapeaux et feux d'artifice marquent l'anniversaire de la Confédération le premier, et à partir de là, le calendrier se remplit de festivals, de terrasses et d'une lumière du jour qui dure bien après neuf heures du soir dans le nord. La saison des feux de forêt s'intensifie aussi ce mois-ci en C.-B. et en Alberta.|1日には国旗と花火が連邦結成の記念日を祝い、そこから先はカレンダーが祭りとテラス席で埋め尽くされ、北部では夜9時を過ぎても明るさが残る。BC州とアルバータ州ではこの月、山火事の季節も本格化し、近くの誰も実際には見ていない火事から煙霞が州境を越えて流れてくることもある。",
    ),
    f: t(
      "The holiday was called Dominion Day for its first 115 years and was renamed Canada Day only in 1982, the same year the constitution was patriated from Britain.|El festivo se llamó Día del Dominio durante sus primeros 115 años y se renombró Día de Canadá solo en 1982, el mismo año en que la constitución se repatrió desde Gran Bretaña.|La fête s'est appelée fête du Dominion pendant ses 115 premières années et n'a été renommée fête du Canada qu'en 1982, la même année où la constitution fut rapatriée de Grande-Bretagne.|この祝日は最初の115年間「自治領の日」と呼ばれ、憲法が英国から本国送還されたのと同じ1982年になってようやく「カナダ・デー」に改名された。",
    ),
  },
  {
    e: "🌾",
    n: t("The prairie harvest races the first frost|La cosecha de la pradera corre contra la primera helada|La moisson des Prairies court contre le premier gel|プレーリーの収穫が初霜と競争する",
    ),
    t: t(
      "Combines run from first light until headlights are needed, farm families and hired crews alike pushing to get the crop off before an early frost or a week of rain undoes months of growing. Grain elevators along the rail lines fill on a schedule that has nothing to do with the calendar and everything to do with the weather.|Las cosechadoras funcionan desde el primer rayo de luz hasta que hacen falta los faros, familias agricultoras y cuadrillas contratadas por igual se apresuran a sacar la cosecha antes de que una helada temprana o una semana de lluvia deshaga meses de crecimiento. Los elevadores de grano junto a las vías se llenan según un calendario que nada tiene que ver con el mes y todo con el clima.|Les moissonneuses-batteuses tournent du lever du jour jusqu'à ce que les phares soient nécessaires, familles agricoles et équipes embauchées se pressant de rentrer la récolte avant qu'un gel précoce ou une semaine de pluie ne défasse des mois de croissance. Les silos à grain le long des voies ferrées se remplissent selon un calendrier qui n'a rien à voir avec le mois et tout à voir avec la météo.|コンバインは夜明けからヘッドライトが要る時間まで動き続ける。農家も雇われクルーも、早い霜や一週間の雨が何か月分もの生育を台無しにする前に収穫を終えようと急ぐ。線路沿いの穀物エレベーターは、暦ではなく天候だけに従う日程で満たされていく。",
    ),
    f: t(
      "Many provinces mark a Civic Holiday on the first Monday of this month under a different local name in nearly every province that observes it, one of the few statutory holidays without a single agreed-upon reason to celebrate.|Muchas provincias marcan un feriado cívico el primer lunes de este mes con un nombre local distinto en casi cada provincia que lo observa, uno de los pocos feriados oficiales sin una única razón acordada para celebrarlo.|Plusieurs provinces marquent un congé civique le premier lundi de ce mois sous un nom local différent dans presque chaque province qui l'observe, l'un des rares jours fériés sans raison unique convenue de le célébrer.|多くの州はこの月の第一月曜に「市民の日」を祝うが、その名称は州ごとにほぼ異なる。祝う共通の理由が一つに定まっていない、数少ない法定祝日の一つである。",
    ),
  },
  {
    e: "🎒",
    n: t("Buses return as Terry Fox runs across the country|Los autobuses vuelven mientras Terry Fox corre por el país|Les autobus reviennent tandis que Terry Fox court à travers le pays|バスが戻り、テリー・フォックスの走りが国じゅうで行われる"),
    t: t(
      "School buses reappear on rural roads the same week offices quietly empty out for Labour Day weekend, the unofficial last gasp of summer. Schools, workplaces and towns across the country hold a Terry Fox Run this month, a fundraising tradition that has continued every year since the runner's own attempt was cut short in 1980.|Los autobuses escolares reaparecen en las carreteras rurales la misma semana en que las oficinas se vacían discretamente por el fin de semana del Día del Trabajo, el último suspiro no oficial del verano. Escuelas, lugares de trabajo y pueblos de todo el país celebran una Carrera Terry Fox este mes.|Les autobus scolaires réapparaissent sur les routes rurales la même semaine où les bureaux se vident discrètement pour le week-end de la fête du Travail, le dernier souffle officieux de l'été. Écoles, lieux de travail et villes à travers le pays tiennent une Course Terry Fox ce mois-ci.|田舎道にスクールバスが戻ってくるのと同じ週、オフィスは労働者の日の連休に向けてひっそりと空になっていく。夏の非公式な最後のあがきである。この月、国じゅうの学校や職場、町でテリー・フォックス・ランが開かれる。走者本人の挑戦が1980年に途中で終わって以来、毎年続く募金の伝統である。",
    ),
    f: t(
      "The run has raised well over a billion dollars for cancer research across more than five decades, entirely through small local events run by volunteers rather than a single national organization.|La carrera ha recaudado bien más de mil millones de dólares para investigación del cáncer a lo largo de más de cinco décadas, enteramente mediante pequeños eventos locales organizados por voluntarios.|La course a amassé bien plus d'un milliard de dollars pour la recherche sur le cancer sur plus de cinq décennies, entièrement grâce à de petits événements locaux organisés par des bénévoles.|この募金活動は五十年以上にわたって10億ドルを優に超える額をがん研究のために集めてきた。すべて、単一の全国組織ではなくボランティアが運営する小さな地域行事の積み重ねによるものである。",
    ),
  },
  {
    e: "🦃",
    n: t("Thanksgiving comes early and the leaves follow|Acción de Gracias llega temprano y las hojas la siguen|L'Action de grâce arrive tôt et les feuilles suivent|感謝祭が早めに訪れ、紅葉が後を追う"),
    t: t(
      "Thanksgiving falls on the second Monday of this month, six weeks ahead of the American holiday of the same name, timed closer to the actual harvest rather than a later commemoration. Fall colour sweeps south from the north over the following weeks, and highway shoulders fill with parked cars wherever the display peaks on a weekend.|Acción de Gracias cae el segundo lunes de este mes, seis semanas antes de la fiesta estadounidense del mismo nombre, programada más cerca de la cosecha real en vez de una conmemoración posterior. El color otoñal avanza del norte al sur en las semanas siguientes.|L'Action de grâce tombe le deuxième lundi de ce mois, six semaines avant la fête américaine du même nom, calée plus près de la récolte réelle plutôt que d'une commémoration plus tardive. Les couleurs d'automne descendent du nord vers le sud dans les semaines qui suivent.|感謝祭はこの月の第二月曜に置かれ、同じ名を持つ米国の祝日より六週間早い。後になってからの記念日というより、実際の収穫の時期に近づけて定められている。この後の数週間、紅葉は北から南へと広がっていき、見頃を迎えた週末には道端に駐車した車が並ぶ。",
    ),
    f: t(
      "Parliament formally fixed the date to the second Monday of October only in 1957, after decades of the holiday drifting between different dates almost every year.|El Parlamento fijó formalmente la fecha en el segundo lunes de octubre solo en 1957, tras décadas en que el feriado cambiaba de fecha casi cada año.|Le Parlement n'a fixé officiellement la date au deuxième lundi d'octobre qu'en 1957, après des décennies où la fête changeait de date presque chaque année.|議会が感謝祭の日付を10月第二月曜に正式に固定したのは1957年になってからのことで、それまでは何十年ものあいだ、この祝日はほぼ毎年のように日付が変わっていた。",
    ),
  },
  {
    e: "🌺",
    n: t("Poppies mark Remembrance Day as the Grey Cup is decided|Las amapolas marcan el Día del Recuerdo mientras se decide la Grey Cup|Les coquelicots marquent le jour du Souvenir alors que se joue la Coupe Grey|ポピーが戦没者追悼の日を印づけ、グレイカップが決まる"),
    t: t(
      "Red poppies appear on coat lapels across the country from late October through a moment of silence at eleven on the eleventh, a tradition dating to the years after the First World War. The Canadian Football League's championship, the Grey Cup, is usually decided this same month, older than the Stanley Cup and contested since 1909.|Amapolas rojas aparecen en las solapas de todo el país desde fines de octubre hasta un minuto de silencio a las once del día once, una tradición que data de los años posteriores a la Primera Guerra Mundial. El campeonato de la Liga Canadiense de Fútbol, la Grey Cup, suele decidirse este mismo mes.|Des coquelicots rouges apparaissent sur les revers de manteau à travers le pays de la fin octobre jusqu'à une minute de silence à onze heures le onze, une tradition remontant aux années suivant la Première Guerre mondiale. Le championnat de la Ligue canadienne de football, la Coupe Grey, se décide généralement ce même mois.|10月末から、11日11時の黙祷の瞬間まで、国じゅうのコートの襟に赤いポピーが付けられる。この習わしは第一次世界大戦後の年月にさかのぼる。カナディアン・フットボール・リーグの選手権、グレイカップも例年この同じ月に決まる。スタンレーカップより歴史が古く、1909年から争われている。",
    ),
    f: t(
      "The poppy tradition traces to the 1915 poem 'In Flanders Fields', written by a Canadian military doctor after a friend's death at Ypres, and the paper flowers are still assembled largely by veterans as a fundraiser each year.|La tradición de la amapola se remonta al poema de 1915 'En los campos de Flandes', escrito por un médico militar canadiense tras la muerte de un amigo en Ypres, y las flores de papel aún las arman en gran parte veteranos como recaudación anual.|La tradition du coquelicot remonte au poème de 1915 « Au champ d'honneur », écrit par un médecin militaire canadien après la mort d'un ami à Ypres, et les fleurs de papier sont encore assemblées en grande partie par des vétérans lors d'une collecte annuelle.|ポピーの伝統は、イーペルでの友人の戦死を受けてカナダの軍医が書いた1915年の詩「フランダースの野に」にさかのぼる。この紙の花はいまも、毎年の募金活動として大部分が退役軍人の手で組み立てられている。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas markets open as ice-fishing huts go out|Abren los mercados navideños mientras salen las casetas de pesca en hielo|Les marchés de Noël ouvrent tandis que les cabanes de pêche sur glace sortent|クリスマスマーケットが開き、ワカサギ釣り小屋が氷上に出る"),
    t: t(
      "Lit-up markets fill town squares from coast to coast for the weeks before Christmas, and further inland the first lake ice thick enough to trust sees fishing huts towed out and set up in clusters that will stay for months. Whichever comes first, a family argument about the tree usually starts the same week.|Mercados iluminados llenan las plazas de costa a costa en las semanas previas a la Navidad, y más tierra adentro, el primer hielo lacustre lo bastante grueso como para confiar en él ve casetas de pesca remolcadas y montadas en grupos que quedarán durante meses. Casi siempre, la discusión familiar por el árbol empieza esa misma semana.|Des marchés illuminés remplissent les places des villes d'un océan à l'autre dans les semaines précédant Noël, et plus à l'intérieur des terres, la première glace de lac assez épaisse pour qu'on lui fasse confiance voit des cabanes de pêche remorquées et installées en grappes qui resteront des mois. La dispute familiale sur le sapin commence en général la même semaine.|クリスマス前の数週間、灯りに照らされたマーケットが国じゅうの町の広場を埋める。もっと内陸では、信頼できる厚さになった最初の湖の氷にワカサギ釣り小屋が曳かれて据えられ、何か月もそのまま集落を作る。どちらが先に来ても、クリスマスツリーをめぐる家族の言い争いはたいてい同じ週に始まる。",
    ),
    f: t(
      "Ice thickness is checked before a hut goes out, but the rule of thumb — about 10 cm for a person on foot, closer to 20 cm before a vehicle follows — is treated as a floor, not a guarantee, and local rescue crews still pull vehicles out of lakes most winters.|El grosor del hielo se comprueba antes de sacar una caseta, pero la regla general —unos 10 cm para una persona a pie, cerca de 20 cm antes de que siga un vehículo— se trata como un mínimo, no una garantía, y los equipos de rescate locales aún sacan vehículos de los lagos casi cada invierno.|L'épaisseur de la glace est vérifiée avant de sortir une cabane, mais la règle empirique — environ 10 cm pour une personne à pied, près de 20 cm avant qu'un véhicule ne suive — est traitée comme un minimum, non une garantie, et les équipes de secours locales sortent encore des véhicules des lacs presque chaque hiver.|小屋を出す前に氷の厚さを確認するが、目安とされる数値――人が歩くには約10cm、車両が続くには20cm近く――はあくまで最低限であって保証ではない。地元の救助隊はいまもほとんどの冬、湖から車両を引き揚げている。",
    ),
  },
  {
    e: "🥶",
    n: t("Deep winter and the Polar Bear Dip|Pleno invierno y el chapuzón del oso polar|Le cœur de l'hiver et le plongeon de l'ours polaire|真冬とポーラーベア・ディップ"),
    t: t(
      "The coldest stretch of the year settles in for real, and on the first day of it groups gather at beaches and docks from coast to coast to run screaming into freezing water for a Polar Bear Dip, usually for charity and always followed by hot chocolate. Vehicles left outside overnight anywhere in the deeper cold need a block heater plugged in or a difficult morning ahead.|El tramo más frío del año llega de verdad, y el primer día grupos se reúnen en playas y muelles de costa a costa para correr gritando al agua helada en un chapuzón del oso polar, casi siempre para beneficencia y siempre seguido de chocolate caliente. Los vehículos dejados afuera durante la noche en el frío profundo necesitan un calentador de bloque enchufado o les espera una mañana difícil.|Le tronçon le plus froid de l'année s'installe pour de bon, et dès le premier jour, des groupes se rassemblent sur des plages et des quais d'un océan à l'autre pour courir en hurlant dans l'eau glacée pour un plongeon de l'ours polaire, généralement pour la charité et toujours suivi de chocolat chaud. Les véhicules laissés dehors la nuit dans le grand froid ont besoin d'un chauffe-moteur branché.|一年で最も寒い時期が本格的に始まる。その初日、国じゅうの浜辺や桟橋には人々が集まり、悲鳴を上げながら凍える水へ「ポーラーベア・ディップ」で飛び込む。たいてい慈善のためで、必ず後にホットチョコレートが待っている。深い寒さの中で一晩外に置かれた車は、ブロックヒーターを差しておかないと翌朝ひどい目に遭う。",
    ),
    f: t(
      "Vancouver's English Bay Polar Bear Swim has run most years since 1920, making it one of the longest-running organized cold-water dips in the world, though similarly named events are now held in dozens of towns nationwide.|El chapuzón del oso polar de English Bay, en Vancouver, se ha celebrado casi cada año desde 1920, siendo uno de los chapuzones organizados en agua fría más antiguos del mundo, aunque hoy hay eventos similares en decenas de pueblos del país.|Le plongeon de l'ours polaire d'English Bay, à Vancouver, se tient presque chaque année depuis 1920, l'un des plus anciens plongeons organisés en eau froide au monde, bien que des événements similaires aient lieu aujourd'hui dans des dizaines de villes du pays.|バンクーバーのイングリッシュ・ベイのポーラーベア・スイムは1920年からほぼ毎年続いており、世界でも指折り歴史の長い組織的な冷水飛び込みイベントである。いまでは似た名前の催しが国内何十もの町で開かれている。",
    ),
  },
  {
    e: "⛄",
    n: t("Winterlude and Winter Carnival fill the coldest weeks|Winterlude y el Carnaval de Invierno llenan las semanas más frías|Winterlude et le Carnaval d'hiver remplissent les semaines les plus froides|ウィンタールードと冬祭りが最も寒い時期を彩る"),
    t: t(
      "Ottawa's Winterlude turns the frozen Rideau Canal into an ice-sculpture-lined skating rink most years since 1979, while Quebec City's older Winter Carnival runs its own ice palace and canoe race across the half-frozen St. Lawrence at the same time of year. A Family Day holiday gives much of the country a long weekend to enjoy either.|El Winterlude de Ottawa convierte el canal Rideau congelado en una pista de patinaje bordeada de esculturas de hielo casi cada año desde 1979, mientras el Carnaval de Invierno, más antiguo, de la Ciudad de Quebec monta su propio palacio de hielo y carrera de canoas por el San Lorenzo medio congelado en la misma época del año.|Le Winterlude d'Ottawa transforme le canal Rideau gelé en patinoire bordée de sculptures de glace presque chaque année depuis 1979, tandis que le Carnaval d'hiver, plus ancien, de Québec monte son propre palais de glace et sa course en canot sur le Saint-Laurent à demi gelé à la même période de l'année. Un congé de la fête de la Famille donne à une bonne partie du pays un long week-end pour en profiter.|オタワのウィンタールードは1979年からほぼ毎年、凍ったリドー運河を氷像が並ぶスケートリンクに変える。いっぽう歴史のより古いケベックシティの冬祭りは、同じ時期に独自の氷の宮殿と、半ば凍ったセントローレンス川を渡るカヌーレースを催す。「家族の日」の祝日が、国の多くの地域にどちらかを楽しむための連休を与える。",
    ),
    f: t(
      "The Quebec City canoe race requires crews to alternately paddle open water and haul the canoe across drifting ice pans, a discipline that grew directly out of how mail and passengers actually crossed the river before a bridge existed.|La carrera de canoas de la Ciudad de Quebec exige a las tripulaciones remar en agua abierta y arrastrar la canoa sobre témpanos de hielo a la deriva por turnos, una disciplina nacida directamente de cómo se cruzaba realmente el río antes de que existiera un puente.|La course en canot de Québec exige des équipages qu'ils pagaient en eau libre et traînent le canot sur des glaces flottantes en alternance, une discipline née directement de la façon dont le courrier et les passagers traversaient réellement la rivière avant l'existence d'un pont.|ケベックシティのカヌーレースでは、乗組員が開けた水面を漕ぐことと流氷の上でカヌーを引きずることを交互に行う必要がある。この競技は、橋が存在する前に郵便物や乗客が実際にこの川を渡っていた方法から直接生まれたものである。",
    ),
  },
  {
    e: "🌱",
    n: t("March break sends families south as sap starts to run|El receso de marzo manda a las familias al sur mientras la savia empieza a correr|Le congé de mars envoie les familles vers le sud tandis que la sève recommence à couler|春休みで家族は南へ、そして樹液が動き出す"),
    t: t(
      "School lets out for a week and airports fill with families heading somewhere warm, while back home the days finally climb above freezing often enough that sugar makers start watching the forecast for the first good sap run of the year. Daylight saving time also begins this month, and the sudden extra evening light feels like a much bigger change than one hour.|Las escuelas cierran una semana y los aeropuertos se llenan de familias que van a algún lugar cálido, mientras en casa los días por fin suben sobre cero lo bastante seguido para que los productores de azúcar empiecen a vigilar el pronóstico de la primera buena corrida de savia del año. El horario de verano también empieza este mes.|Les écoles ferment une semaine et les aéroports se remplissent de familles filant vers un endroit chaud, tandis qu'au pays les jours dépassent enfin le point de congélation assez souvent pour que les acériculteurs guettent les prévisions de la première bonne coulée de sève de l'année. L'heure d'été commence aussi ce mois-ci.|学校は一週間休みになり、空港はどこか暖かい場所へ向かう家族連れで埋まる。いっぽう地元では、ようやく日中の気温が氷点を超える日が増え、メープル生産者たちはその年最初の樹液の動きを予報とにらめっこしながら待ち始める。夏時間もこの月に始まり、突然増える夕方の明るさは一時間分よりずっと大きな変化に感じられる。",
    ),
    f: t(
      "Because school boards stagger their break across different weeks region by region, ski hills and southern resorts effectively get a full month of March break traffic rather than a single crowded week.|Como los consejos escolares escalonan el receso en distintas semanas según la región, las pistas de esquí y los complejos del sur reciben en la práctica un mes entero de tráfico de receso de marzo en vez de una sola semana abarrotada.|Comme les commissions scolaires échelonnent leur congé sur des semaines différentes selon la région, les pentes de ski et les complexes du sud reçoivent en pratique tout un mois de trafic du congé de mars plutôt qu'une seule semaine bondée.|学校区ごとに休みの週をずらしているため、スキー場や南の行楽地は、一週間だけ混雑が集中するのではなく、事実上まるまる一か月にわたって春休みの人出を受けることになる。",
    ),
  },
];
