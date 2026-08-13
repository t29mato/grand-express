/**
 * ブラジルの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・韓国・フランス・インドと同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く(REGISTER.md参照)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const BRAZIL_META = {
  id: "brazil",
  name: t("Brazil|Brasil|Brésil|ブラジル"),
  blurb: t(
    "A continent-sized country of rainforest rivers, colonial gold towns and a coastline that runs from the equator to the pampas|Un país del tamaño de un continente, de ríos de selva, pueblos coloniales del oro y una costa que va del ecuador a las pampas|Un pays continent, de rivières de forêt tropicale, de villes coloniales de l'or et d'un littoral courant de l'équateur aux pampas|赤道からパンパまで続く海岸線と、密林の川、金鉱の植民地町を抱える大陸なみの国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (team-lead 指定: brazil は360。R$432,000スタート)。ここは暫定値100のまま。
  cur: { pre: "R$", post: "", mul: 100 },
  start: "riodejaneiro",
  cpuNames: ["Curupira 🦶", "Boto-Cor-de-Rosa 🐬", "Iara 🧜‍♀️", "Caipora 🌿"],
  // ブラジル国旗の緑・黄・青、そしてカンドンブレの白。
  stripe: ["#009c3b", "#ffdf00", "#002776", "#f6efe2", "#e8443f"],
};

/** 実際のブラジルの5大地方。 */
export const BRAZIL_REGIONS = {
  no: t("North, the Amazon|Norte, la Amazonía|Nord, l'Amazonie|北部(アマゾン)"),
  ne: t("Northeast|Nordeste|Nord-Est|北東部"),
  co: t("Central-West|Centro-Oeste|Centre-Ouest|中西部"),
  se: t("Southeast|Sudeste|Sud-Est|南東部"),
  su: t("South|Sul|Sud|南部"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。鍵9件は
 * REGISTER.md にまとめてある)。
 */
export const BRAZIL_ITEMS = {
  arara: {
    e: "🦜",
    price: 240,
    kind: "move",
    n: t("A Ride on a Macaw's Wings|Un vuelo en las alas de una guacamaya|Un vol sur les ailes d'une arara|アララ(コンゴウインコ)の翼に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Blue and scarlet macaws mate for life and are rarely seen flying alone, so a lone bird crossing open sky is read by some river communities as a sign that its partner is close behind, just out of sight.|Las guacamayas azules y escarlatas se emparejan de por vida y rara vez se ven volar solas, así que un ave sola cruzando el cielo abierto se interpreta en algunas comunidades ribereñas como señal de que su pareja va cerca, fuera de la vista.|Les aras bleus et écarlates s'accouplent pour la vie et se voient rarement voler seuls, si bien qu'un oiseau isolé traversant le ciel ouvert est lu par certaines communautés riveraines comme le signe que son partenaire suit de près, hors de vue.|コンゴウインコは生涯同じ相手と番い、一羽だけで飛ぶ姿はめったに見られない。そのため一羽だけが空を渡っていくのを見た川辺の集落では、連れ合いがすぐ近く、見えないところにいる印だと言われることがある。",
    ),
  },
  horacerta: {
    e: "⏰",
    price: 380,
    kind: "pre",
    n: t("A Punctual Ticket|Un billete puntual|Un billet ponctuel|ピッタリの発車時刻切符"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Long-distance bus companies here print the departure time in bold on every ticket precisely because so much else in daily life runs on its own private clock, and a bus that actually leaves on the dot still counts as a small local miracle.|Las compañías de autobuses de largo recorrido imprimen la hora de salida en negrita en cada billete precisamente porque gran parte de la vida diaria funciona con su propio reloj particular, y un autobús que sale realmente en punto sigue contando como un pequeño milagro local.|Les compagnies d'autocars longue distance impriment l'heure de départ en gras sur chaque billet précisément parce qu'une grande partie de la vie quotidienne suit sa propre horloge, et un car qui part réellement à l'heure pile reste un petit miracle local.|長距離バス会社が乗車券に発車時刻を太字で刷るのは、日常の多くが独自の緩やかな時間感覚で回っているからこそで、実際に定刻どおり出発するバスは、それだけでちょっとした地元の奇跡として扱われる。",
    ),
  },
  mariafumaca: {
    e: "🚂",
    price: 360,
    kind: "pre",
    n: t("Maria Fumaça Steam Ticket|Billete de la Maria Fumaça|Billet de la Maria Fumaça|マリア・フマッサの蒸気機関車切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "\"Maria Fumaça\", smoking Mary, is the affectionate nickname given to old steam locomotives all over Brazil, most of which now haul tourists on short heritage stretches rather than the cargo or passengers they were built for.|«Maria Fumaça», María la humeante, es el apodo cariñoso que se da a las viejas locomotoras de vapor por todo Brasil, la mayoría de las cuales ahora llevan turistas en breves tramos patrimoniales en vez de la carga o los pasajeros para los que se construyeron.|« Maria Fumaça », Marie la fumeuse, est le surnom affectueux donné aux vieilles locomotives à vapeur dans tout le Brésil, dont la plupart transportent aujourd'hui des touristes sur de courts tronçons patrimoniaux plutôt que le fret ou les voyageurs pour lesquels elles furent construites.|「マリア・フマッサ(煙を吐くマリア)」は、ブラジル各地に残る古い蒸気機関車に親しみを込めて付けられた愛称で、その多くはいまでは元々運ぶはずだった貨物や乗客ではなく、短い保存区間で観光客を乗せている。",
    ),
  },
  trembala: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Trem-Bala Bullet Train Ticket|Billete del trem-bala|Billet du trem-bala|トレン・バーラ(弾丸列車)切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "A high-speed trem-bala between Rio and São Paulo has been formally proposed, studied and shelved since at least the 1970s, and every so often a new round of plans revives the promise of a trip that today still takes most of a day by road.|Un trem-bala de alta velocidad entre Río y São Paulo se ha propuesto, estudiado y archivado formalmente desde al menos los años setenta, y de tanto en tanto una nueva ronda de planes revive la promesa de un trayecto que hoy sigue llevando casi un día entero por carretera.|Un trem-bala à grande vitesse entre Rio et São Paulo est formellement proposé, étudié puis abandonné depuis au moins les années 1970, et de temps à autre une nouvelle série de projets ravive la promesse d'un trajet qui aujourd'hui prend encore presque une journée entière par la route.|リオとサンパウロを結ぶ高速のトレン・バーラは、少なくとも1970年代から正式に提案・検討されては棚上げにされてきた。ときおり新たな計画が持ち上がるたび、いまも道路で丸一日近くかかるこの区間の短縮という約束がまた蒸し返される。",
    ),
  },
  figa: {
    e: "✊",
    price: 320,
    kind: "passive",
    n: t("A Figa Charm|Un amuleto figa|Un porte-bonheur figa|フィガのお守り"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Carved as a closed fist with the thumb tucked between the first two fingers, the figa blends an old Portuguese charm against the evil eye with West African traditions carried by enslaved artisans, and it is still handed to newborns and worn on bracelets alike.|Tallado como un puño cerrado con el pulgar entre los dos primeros dedos, el amuleto figa mezcla un viejo talismán portugués contra el mal de ojo con tradiciones de África occidental traídas por artesanos esclavizados, y aún hoy se regala a los recién nacidos y se lleva en pulseras.|Sculptée en poing fermé, le pouce glissé entre les deux premiers doigts, la figa mêle un vieux porte-bonheur portugais contre le mauvais œil à des traditions ouest-africaines apportées par des artisans réduits en esclavage, et elle est encore offerte aux nouveau-nés comme portée en bracelet.|親指を人差し指と中指の間に挟んだ握りこぶしの形に彫られるフィガは、邪視除けの古いポルトガルの護符と、奴隷にされた職人たちが伝えた西アフリカの伝統が混ざり合ったもので、いまも新生児に贈られたり腕輪として身につけられたりする。",
    ),
  },
  defumacao: {
    e: "🌿",
    price: 440,
    kind: "pre",
    n: t("A Bundle of Smudging Herbs|Un manojo de hierbas para sahumar|Un bouquet d'herbes à fumigation|燻しのハーブ束"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Defumação, burning bundles of herbs like rue and guiné to clear a heavy space, is common practice in terreiros of Umbanda and Candomblé, where smoke is treated as a way to physically move something unwanted out of a room.|La defumação, quemar manojos de hierbas como ruda y guiné para despejar un espacio cargado, es práctica común en los terreiros de umbanda y candomblé, donde el humo se trata como una forma de sacar físicamente algo indeseado de una habitación.|La defumação, brûler des bouquets d'herbes comme la rue et le guiné pour purifier un lieu chargé, est une pratique courante dans les terreiros d'umbanda et de candomblé, où la fumée est traitée comme un moyen de faire physiquement sortir quelque chose d'indésirable d'une pièce.|ヘンルーダやギネーなどの薬草の束を燃やして重い気を払う「デフマサォン」は、ウンバンダやカンドンブレの祭場(テヘイロ)で広く行われる作法で、煙は部屋から望まれないものを物理的に押し出す手段として扱われる。",
    ),
  },
  cola: {
    e: "📋",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Cheat Sheet|Una chuleta|Une antisèche|コーラ(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "\"Cola\" literally means glue, but Brazilian students long ago bent the word toward cheating in exams — colar means both to stick something and to copy off it — and a well-folded one tucked into a sleeve is a small rite of passage for anyone who has sat a Brazilian test.|«Cola» significa literalmente pegamento, pero hace tiempo los estudiantes brasileños torcieron la palabra hacia el copiar en los exámenes —colar significa tanto pegar algo como copiarlo—, y una bien doblada y escondida en la manga es un pequeño rito de paso para quien haya hecho un examen en Brasil.|« Cola » signifie littéralement colle, mais les étudiants brésiliens ont depuis longtemps détourné le mot vers la triche aux examens — colar signifie à la fois coller quelque chose et le copier —, et une antisèche bien pliée glissée dans une manche est un petit rite de passage pour quiconque a passé un examen au Brésil.|「コーラ」は文字どおりには糊を意味するが、ブラジルの学生たちは昔からこの語を試験でのカンニングの意味にねじ曲げて使ってきた。コラールという動詞は「貼り付ける」と「写す」の両方を意味する。折りたたんで袖に忍ばせるこの紙は、ブラジルで試験を受けたことのある誰にとっても、ちょっとした通過儀礼である。",
    ),
  },
  bicho: {
    e: "🐆",
    price: 280,
    kind: "pre",
    n: t("A Winning Jogo do Bicho Slip|Un boleto ganador del jogo do bicho|Un billet gagnant du jogo do bicho|当たった動物くじの券"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The jogo do bicho, an illegal but openly tolerated numbers game where each bet is tied to one of 25 animals, was invented in the 1890s to draw visitors to a struggling Rio zoo and has outlived both the zoo's original owner and every attempt to shut it down.|El jogo do bicho, un juego de números ilegal pero tolerado abiertamente donde cada apuesta se asocia a uno de 25 animales, se inventó en la década de 1890 para atraer visitantes a un zoológico de Río en apuros y ha sobrevivido tanto a su fundador como a todo intento de cerrarlo.|Le jogo do bicho, un jeu de nombres illégal mais ouvertement toléré où chaque mise est liée à l'un des 25 animaux, fut inventé dans les années 1890 pour attirer des visiteurs vers un zoo de Rio en difficulté, et il a survécu à son fondateur comme à toutes les tentatives de le faire disparaître.|25種の動物のそれぞれに賭け金を結びつける、違法だが公然と黙認されている数字くじ「ジョーゴ・ド・ビーショ」は、1890年代、経営に苦しむリオの動物園に客を呼び込むために考案された。その創設者はもちろん、これを取り締まろうとしたあらゆる試みよりも長く生き延びている。",
    ),
  },
  atalho: {
    e: "🛵",
    price: 420,
    kind: "pre",
    n: t("A Local's Shortcut|Un atajo de un lugareño|Un raccourci de local|地元民の近道",
    ),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Every neighbourhood here seems to have a gap in a fence, an alley behind a bakery or an unmarked footbridge that shaves ten minutes off the official route, passed on by word of mouth rather than printed on any map.|Cada barrio aquí parece tener un hueco en una valla, un callejón detrás de una panadería o una pasarela sin señalizar que recorta diez minutos a la ruta oficial, transmitido de boca en boca y no impreso en ningún mapa.|Chaque quartier ici semble avoir une brèche dans une clôture, une ruelle derrière une boulangerie ou une passerelle non signalée qui gagne dix minutes sur l'itinéraire officiel, transmise de bouche à oreille plutôt qu'imprimée sur une carte.|この土地のどの界隈にも、正規の道より十分は縮められる塀の隙間やパン屋の裏道、案内標識のない歩道橋があるようで、それは地図に載ることなく、もっぱら口伝えで受け継がれる。",
    ),
  },
};

/**
 * 厄災の神。ブラジル民話のサシ・ペレレ(赤い帽子を被り、パイプをくわえ、
 * 片足で竜巻(レデモインニョ)に乗って現れるいたずら好きの妖精)にした。
 * 人を苦しめる悪霊ではなく、ただ度を越したいたずら好きとして描く
 * (韓国のトッケビ、茨城のダイダラボウと同じ性格付け)。
 */
export const BRAZIL_SPIRIT = {
  e: "🌪️",
  n: t("The Saci-Pererê|El Saci-Pererê|Le Saci-Pererê|サシ・ペレレ"),
  big: t("The Saci's Whirlwind|El torbellino del Saci|Le tourbillon du Saci|サシの大竜巻"),
  ward: "figa",
  arrive: t(
    "<b>🌪️ A saci-pererê has taken an interest in you.</b> Old tales say this one-legged, pipe-smoking trickster rides in on a small dust devil, ties knots in horses' manes for fun and vanishes the moment anyone traps his red cap. He now hops beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🌪️ Un saci-pererê se ha fijado en ti.</b> Los viejos cuentos dicen que este bromista de una sola pierna y pipa en la boca llega montado en un pequeño torbellino, hace nudos en las crines de los caballos por diversión y desaparece en cuanto alguien atrapa su gorro rojo. Ahora salta junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🌪️ Un saci-pererê s'est intéressé à toi.</b> Les vieux contes disent que ce farceur à une jambe, pipe à la bouche, arrive monté sur un petit tourbillon de poussière, noue la crinière des chevaux pour s'amuser et disparaît dès qu'on attrape son bonnet rouge. Il saute désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🌪️ サシ・ペレレに目を付けられた。</b> 昔話によれば、この片足でパイプをくわえたいたずら妖精は小さな砂ぼこりの竜巻に乗ってやってきて、面白がって馬のたてがみを結び、誰かが赤い帽子を捕まえた瞬間に姿を消すという。いま目的地から最も遠い <b>{0}</b> の傍らを跳びはね、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🌪️ <b>The saci</b> loses interest and hops after <b>{0}</b>, farthest from {1}.|🌪️ <b>El saci</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|🌪️ <b>Le saci</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|🌪️ <b>サシ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the saci and never once caught his red cap. He grins around his pipe and whips the road into a proper whirlwind — <b>the Saci's Whirlwind</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al saci sin haber atrapado nunca su gorro rojo. Él sonríe con la pipa en la boca y convierte el camino en un torbellino de verdad: empieza <b>el torbellino del Saci</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le saci sans jamais avoir attrapé son bonnet rouge. Il sourit, pipe à la bouche, et transforme la route en un véritable tourbillon : <b>le tourbillon du Saci</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもサシと歩いていながら、一度もあの赤い帽子を捕まえられなかった。彼はパイプをくわえたままにやりと笑い、道をまるごと本物の竜巻に変える。<b>サシの大竜巻</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the old tales, catching a saci's red cap is the one way to bind him and force him to grant a wish or reveal a hidden treasure — but the moment his cap is set down again, even for a second, he vanishes with it. Nobody playing this game has managed to hold on that long.|<b>Tras la historia:</b> en los viejos cuentos, atrapar el gorro rojo del saci es la única forma de atarlo y obligarlo a conceder un deseo o revelar un tesoro escondido, pero en cuanto se suelta el gorro, aunque sea un segundo, él desaparece con él. Nadie en esta partida ha logrado retenerlo tanto tiempo.|<b>Derrière l'histoire :</b> dans les vieux contes, attraper le bonnet rouge du saci est le seul moyen de le lier et de le forcer à exaucer un vœu ou à révéler un trésor caché — mais dès que le bonnet est reposé, même une seconde, il disparaît avec. Personne dans cette partie n'a réussi à le garder aussi longtemps.|<b>物語の背景:</b> 昔話では、サシの赤い帽子を捕まえることだけが彼を縛り、願いを叶えさせたり隠された宝を教えさせたりする唯一の方法だとされる。だが帽子をほんの一瞬でも置いた隙に、彼は帽子ごと消えてしまう。この旅では、まだ誰もそれほど長く帽子を離さずにいられていない。",
  ),
  pleased: t(
    "He puffs his pipe and, in a rare good mood, leaves a little whirl of loose change spinning on the road behind him. <b>{0}</b> gains <span class='money'>+{1}</span>.|Da una calada a su pipa y, de raro buen humor, deja un pequeño remolino de monedas sueltas girando en el camino tras de sí. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il tire sur sa pipe et, d'humeur rare et bonne, laisse un petit tourbillon de monnaie tourner sur la route derrière lui. <b>{0}</b> gagne <span class='money'>+{1}</span>.|パイプをふかし、珍しく機嫌よく、小銭の小さな渦を道に残していった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A figa charm is held up where he can see it. Sacis are said to shy from the closed fist above all else, and he ducks away, hopping past <b>{0}</b> without noticing this turn.|Se le muestra un amuleto figa a la vista. Dicen que los sacis rehúyen sobre todo el puño cerrado, y él se aparta, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On brandit sous ses yeux un porte-bonheur figa. On dit que les sacis fuient par-dessus tout le poing fermé, et il s'esquive, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|フィガのお守りを見えるところにかざした。サシは何より握りこぶしの形を嫌うと言われ、彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。サシ・ペレレのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const BRAZIL_DOOM = [
  {
    id: "conta-atrasada",
    n: t("An overdue boleto turns up|Aparece un boleto atrasado|Un boleto en retard refait surface|滞納した請求書が出てくる"),
    t: t(
      "The paper slip was tucked into a jacket pocket weeks ago and forgotten, and by the time it resurfaces the late fee has quietly doubled the original amount. The bank machine reads the barcode without complaint, which somehow makes it worse.|El papel se guardó en el bolsillo de una chaqueta hace semanas y se olvidó, y para cuando reaparece, el recargo por mora ha duplicado en silencio el importe original. La máquina del banco lee el código de barras sin protestar, lo que de algún modo lo hace peor.|Le papier a été glissé dans une poche de veste il y a des semaines et oublié, et le temps qu'il ressurgisse, la pénalité de retard a discrètement doublé le montant initial. Le distributeur de la banque lit le code-barres sans broncher, ce qui rend la chose pire encore.|その紙切れは何週間も前に上着のポケットにしまわれたまま忘れられていた。ようやく出てきたときには延滞料でいつのまにか元の額の倍になっていた。銀行の機械は何も言わずバーコードを読み取るだけで、それがかえって腹立たしい。",
    ),
  },
  {
    id: "enchente",
    n: t("A flash flood soaks the street|Una riada repentina empapa la calle|Une crue éclair trempe la rue|路地を一気に浸す鉄砲水"),
    t: t(
      "An hour of hard rain was enough to turn the street into a shin-deep river, and whatever was left at ground level — boxes, a parked stall, a day's stock — came out soaked or ruined. Storm drains here are built for a gentler climate than the one that keeps arriving.|Una hora de lluvia intensa bastó para convertir la calle en un río hasta la espinilla, y lo que quedó a ras de suelo —cajas, un puesto aparcado, la mercancía del día— salió empapado o arruinado. Los desagües aquí están hechos para un clima más suave que el que sigue llegando.|Une heure de pluie battante a suffi à transformer la rue en une rivière à hauteur de mollet, et tout ce qui traînait au sol — cartons, un étal garé, le stock du jour — est ressorti trempé ou fichu. Les égouts pluviaux d'ici sont conçus pour un climat plus clément que celui qui n'arrête pas d'arriver.|一時間の激しい雨だけで通りはすねの深さまで水浸しの川になり、地面近くにあったもの――段ボール箱、停めてあった屋台、その日の商品――はずぶ濡れか使い物にならなくなった。この土地の排水溝は、いま実際に降っている気候よりずっと穏やかな想定で作られている。",
    ),
  },
  {
    id: "greve-onibus",
    n: t("A bus strike leaves you stranded|Una huelga de autobuses te deja varado|Une grève des bus vous laisse en rade|バスのストで足止め",
    ),
    t: t(
      "The drivers walked out at dawn over unpaid wages, and the stop that should have had a bus every ten minutes has had none for two hours. Everyone waiting seems to already know it will end sometime today — nobody can say when.|Los conductores se declararon en huelga al amanecer por sueldos impagados, y la parada que debería tener un autobús cada diez minutos lleva dos horas sin ninguno. Todos los que esperan parecen ya saber que terminará en algún momento del día, pero nadie sabe cuándo.|Les chauffeurs ont débrayé à l'aube pour des salaires impayés, et l'arrêt qui devrait voir un bus toutes les dix minutes n'en a vu aucun depuis deux heures. Tous ceux qui attendent semblent déjà savoir que ça se terminera dans la journée — personne ne sait quand.|運転手たちは未払いの賃金をめぐって夜明けにストライキに入り、本来なら10分おきにバスが来るはずの停留所には、もう2時間も一台も来ていない。待っている誰もが、今日じゅうには終わるはずだとなんとなく分かっているようだが、いつ終わるかは誰にも分からない。",
    ),
  },
  {
    id: "deslizamento",
    n: t("A hillside gives way after heavy rain|Una ladera cede tras lluvias intensas|Un versant s'effondre après de fortes pluies|大雨のあと斜面が崩れる"),
    t: t(
      "Days of steady rain soaked the slope until it simply let go, and the mud carried off whatever stood in its path lower down. Engineers say the same warning signs — a crack in a retaining wall, a leaning fence post — show up every rainy season, and every season somebody chooses to wait one more night before moving.|Días de lluvia constante empaparon la ladera hasta que esta simplemente cedió, y el barro se llevó todo lo que encontró a su paso más abajo. Los ingenieros dicen que las mismas señales de aviso —una grieta en un muro de contención, un poste de valla inclinado— aparecen cada temporada de lluvias, y cada temporada alguien decide esperar una noche más antes de mudarse.|Des jours de pluie continue ont trempé le versant jusqu'à ce qu'il cède tout simplement, et la boue a emporté tout ce qui se trouvait sur son passage plus bas. Les ingénieurs disent que les mêmes signes avant-coureurs — une fissure dans un mur de soutènement, un poteau de clôture penché — réapparaissent chaque saison des pluies, et chaque saison quelqu'un choisit d'attendre encore une nuit avant de partir.|何日も降り続いた雨が斜面を染み込ませ、ついに崩れ落ち、泥は下にあったものを何もかも押し流した。技術者たちによれば、擁壁のひび割れや傾いた柵の支柱といった同じ前兆が毎年の雨季に現れるというが、毎年、誰かがもう一晩だけ待とうと判断してしまう。",
    ),
    months: [1, 2],
  },
  {
    id: "rodada-boteco",
    n: t("Stuck covering the whole table's tab|Atrapado pagando la cuenta de toda la mesa|Coincé à régler l'addition de toute la table|テーブル全員分の勘定を持たされる",
    ),
    t: t(
      "Someone at the boteco declared it was your round just as the waiter arrived with a tray of chope for the whole table, and by the time anyone thought to argue the glasses were already half empty. Being the one who says \"deixa que eu pago\" a beat too slowly is how this always seems to happen.|Alguien en el boteco dijo que la ronda era tuya justo cuando el camarero llegó con una bandeja de chope para toda la mesa, y para cuando alguien pensó en protestar, los vasos ya estaban medio vacíos. Ser el que dice «deixa que eu pago» un segundo tarde es como esto siempre parece ocurrir.|Quelqu'un au boteco a déclaré que c'était ta tournée juste au moment où le serveur arrivait avec un plateau de chope pour toute la table, et le temps que quelqu'un songe à protester, les verres étaient déjà à moitié vides. Être celui qui dit « deixa que eu pago » une seconde trop tard, c'est toujours comme ça que ça arrive.|ボテコ(下町の酒場)で誰かが「今度は君の番だ」と言い出した、ちょうどそのとき店員がテーブル全員分のショッピ(生ビール)を盆に載せて運んできた。誰かが異議を唱えようとした頃には、もうグラスは半分空になっていた。「ここは俺が払うよ」と言うタイミングをいつも一瞬遅らせてしまう、それがいつもの成り行きである。",
    ),
  },
  {
    id: "redemoinho",
    n: t("A dust devil scatters everything loose|Un torbellino de polvo esparce todo lo suelto|Un tourbillon de poussière disperse tout ce qui traîne|竜巻状のつむじ風で散らかる持ち物"),
    t: t(
      "A small whirlwind spun up out of nowhere on the dry road and tore through, flinging papers, a hat and a bag of shopping in three different directions before dying out just as suddenly. Older folks nearby just shrugged and said the saci must be in a mood today.|Un pequeño torbellino surgió de la nada en el camino seco y arrasó, lanzando papeles, un sombrero y una bolsa de compras en tres direcciones distintas antes de apagarse tan de repente como había llegado. La gente mayor cercana solo se encogió de hombros y dijo que el saci debía de estar de humor hoy.|Un petit tourbillon a surgi de nulle part sur la route sèche et a tout balayé, projetant des papiers, un chapeau et un sac de courses dans trois directions différentes avant de s'éteindre aussi soudainement qu'il était apparu. Les anciens du coin ont juste haussé les épaules en disant que le saci devait être d'humeur aujourd'hui.|乾いた道でどこからともなく小さなつむじ風が巻き起こり、紙切れと帽子と買い物袋をそれぞれ別の方向へ吹き飛ばして、現れたときと同じくらい唐突に消えた。近くにいた年配の人々は肩をすくめ、今日はサシの機嫌が悪いのだろうと言った。",
    ),
  },
  {
    id: "arrastao",
    n: t("A running crowd sweeps a beach bag away|Una turba corriendo se lleva una bolsa de playa|Une foule qui court emporte un sac de plage|走り抜ける人波にビーチバッグをさらわれる"),
    t: t(
      "A sudden crush of running bodies swept down the sand, and in the few seconds it took to stand up and look around, the bag left by the towel was simply gone. Lifeguards say the safest thing on a crowded beach is to never let a bag out of arm's reach in the first place.|Una repentina avalancha de gente corriendo bajó por la arena, y en los pocos segundos que tomó levantarse y mirar alrededor, la bolsa dejada junto a la toalla sencillamente había desaparecido. Los socorristas dicen que lo más seguro en una playa concurrida es no dejar nunca una bolsa fuera del alcance del brazo.|Une soudaine bousculade de gens courant a déferlé sur le sable, et dans les quelques secondes qu'il a fallu pour se lever et regarder autour, le sac laissé près de la serviette avait tout simplement disparu. Les maîtres-nageurs disent que le plus sûr sur une plage bondée est de ne jamais laisser un sac hors de portée de bras.|突然、人々が走り抜ける波が砂浜を駆け抜け、立ち上がって周りを見回すまでのわずか数秒の間に、タオルのそばに置いていたバッグはただ消えていた。監視員によれば、混雑した浜辺でいちばん安全なのは、そもそもバッグを腕の届く外に置かないことだという。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・韓国・フランス・
 * インドと同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の brazil の項)。
 */
export const BRAZIL_SEASONS = [
  {
    e: "🐟",
    n: t("Carnival's dust settles and Holy Week arrives|El polvo del Carnaval se asienta y llega la Semana Santa|La poussière du Carnaval retombe et la Semaine sainte arrive|カーニバルが去り、聖週間が来る"),
    t: t(
      "With Carnival's confetti finally swept up, the country turns quiet for Holy Week, and fish stalls do their best trade of the year as families cook bacalhau, salted cod imported from Portugal since colonial times, instead of meat on Good Friday.|Con el confeti del Carnaval por fin barrido, el país se serena para la Semana Santa, y los puestos de pescado hacen su mejor negocio del año mientras las familias cocinan bacalao, importado de Portugal desde tiempos coloniales, en vez de carne el Viernes Santo.|Une fois les confettis du Carnaval enfin balayés, le pays se calme pour la Semaine sainte, et les étals de poisson font leur meilleure affaire de l'année tandis que les familles cuisinent la morue salée, importée du Portugal depuis l'époque coloniale, plutôt que de la viande le Vendredi saint.|カーニバルの紙吹雪がようやく片付けられると、国は聖週間を迎えて静かになる。魚屋は一年でいちばんの書き入れ時を迎える。聖金曜日には、家庭は肉の代わりに、植民地時代からポルトガルより輸入され続けるバカリャウ(塩漬け鱈)を料理するからである。",
    ),
    f: t(
      "Brazil imports more salted cod than almost any other country despite having no cod fishery of its own, a habit inherited whole from Portuguese colonists who needed a protein that could survive the transatlantic crossing.|Brasil importa más bacalao salado que casi cualquier otro país pese a no tener pesquería propia de bacalao, un hábito heredado por completo de los colonos portugueses que necesitaban una proteína capaz de sobrevivir la travesía atlántica.|Le Brésil importe plus de morue salée que presque tout autre pays malgré l'absence de pêcherie de morue sur son territoire, une habitude héritée en bloc des colons portugais qui avaient besoin d'une protéine capable de survivre à la traversée atlantique.|ブラジルは自国に鱈漁がまったくないにもかかわらず、世界でも屈指の塩漬け鱈の輸入国である。これは大西洋を渡る航海に耐えられる蛋白源を必要としたポルトガル人入植者からそっくり受け継いだ習慣である。",
    ),
  },
  {
    e: "☕",
    n: t("The coffee harvest gets underway|Arranca la cosecha del café|La récolte du café démarre|コーヒーの収穫が始まる"),
    t: t(
      "Pickers move through the hillside rows as the cherries ripen, working fields that between them still produce more coffee than the next two largest producing countries combined, a lead the country has held for close to two centuries.|Los recolectores avanzan por las hileras de la ladera a medida que maduran las cerezas, trabajando campos que entre todos aún producen más café que los dos siguientes mayores países productores juntos, una ventaja que el país mantiene desde hace casi dos siglos.|Les cueilleurs avancent le long des rangs du coteau à mesure que les cerises mûrissent, travaillant des champs qui, ensemble, produisent encore plus de café que les deux pays producteurs suivants réunis, une avance que le pays détient depuis près de deux siècles.|さくらんぼ状の実が熟すにつれ、収穫の人々が丘の畝を進んでいく。これらの畑を合わせると、二位・三位の生産国を合わせたよりなお多いコーヒーが生産され、この首位の座は二世紀近く保たれている。",
    ),
    f: t(
      "Unlike wine grapes, coffee cherries on the same branch ripen unevenly, so most smaller farms are still picked at least partly by hand, one red cherry at a time, rather than stripped all at once by machine.|A diferencia de las uvas de vino, las cerezas de café en la misma rama maduran de forma desigual, así que la mayoría de las fincas pequeñas se siguen recolectando al menos en parte a mano, cereza roja por cereza roja, en vez de arrancarlas todas de golpe con máquina.|Contrairement aux raisins de cuve, les cerises de café sur une même branche mûrissent de façon inégale, si bien que la plupart des petites exploitations sont encore récoltées au moins en partie à la main, cerise rouge après cerise rouge, plutôt qu'arrachées d'un coup à la machine.|ワイン用のブドウと違い、同じ枝についたコーヒーの実は熟し方がまちまちなので、小規模な農園の多くはいまも少なくとも部分的に、赤く熟した実を一粒ずつ手摘みしている。機械で一気にしごき取るのではない。",
    ),
  },
  {
    e: "🌽",
    n: t("Bonfires and quadrilhas mark Festa Junina|Hogueras y quadrilhas marcan la Festa Junina|Feux de joie et quadrilhas marquent la Festa Junina|かがり火と四角踊りで祝うフェスタ・ジュニーナ"),
    t: t(
      "Bonfires, paper lanterns and mock country-wedding dances called quadrilha fill town squares nationwide for the June festivals, and corn — roasted, boiled, ground into cake or simmered into sweet canjica — takes over the menu almost entirely.|Hogueras, farolillos de papel y bailes de falsa boda campesina llamados quadrilha llenan las plazas de todo el país durante las fiestas de junio, y el maíz —asado, hervido, molido en pastel o cocido en el dulce canjica— se apodera casi por completo del menú.|Feux de joie, lanternes en papier et danses de faux mariage paysan appelées quadrilha remplissent les places de tout le pays pendant les fêtes de juin, et le maïs — grillé, bouilli, moulu en gâteau ou mijoté en canjica sucrée — s'empare presque entièrement du menu.|かがり火と紙提灯、そして田舎の結婚式を演じる「カドリーリャ」という寸劇の踊りが、6月の祭りの間、全国の広場を埋める。とうもろこしは焼いても茹でても、粉にしてケーキにしても、甘く煮てカンジッカにしても、この時期はほとんど献立を独占する。",
    ),
    f: t(
      "The festival honours Saint Anthony, Saint John and Saint Peter across three separate feast days in June, but in most towns the celebrations blur into one long season of dancing rather than three distinct events.|La fiesta honra a San Antonio, San Juan y San Pedro en tres días festivos distintos de junio, pero en la mayoría de los pueblos las celebraciones se funden en una sola y larga temporada de baile en vez de tres eventos diferenciados.|La fête honore saint Antoine, saint Jean et saint Pierre lors de trois jours de fête distincts en juin, mais dans la plupart des villes, les célébrations se fondent en une seule et longue saison de danse plutôt qu'en trois événements séparés.|この祭りは6月の三つの別々の祝日で聖アントニオ、聖ヨハネ、聖ペトロを讃えるものだが、たいていの町では三つの別個の行事というより、ひと続きの長い踊りの季節として溶け合っている。",
    ),
    months: [2],
  },
  {
    e: "🧥",
    n: t("Winter school break sends families travelling|Las vacaciones de invierno mandan a las familias de viaje|Les vacances scolaires d'hiver envoient les familles voyager|冬休みで家族が旅に出る"),
    t: t(
      "Schools close for the July winter break, and the coldest weeks of the year send families both toward the beach towns still mild enough for a swim and toward the southern hills, where a cold snap can leave frost on car windshields by morning.|Las escuelas cierran por las vacaciones de invierno de julio, y las semanas más frías del año llevan a las familias tanto hacia los pueblos de playa aún lo bastante templados para bañarse como hacia las colinas del sur, donde una ola de frío puede dejar escarcha en los parabrisas por la mañana.|Les écoles ferment pour les vacances d'hiver de juillet, et les semaines les plus froides de l'année envoient les familles aussi bien vers les stations balnéaires encore assez douces pour la baignade que vers les collines du sud, où un coup de froid peut laisser du givre sur les pare-brise au matin.|7月の冬休みで学校が閉まり、一年でいちばん寒いこの数週間、家族連れはまだ泳げるほど温暖なビーチの町へも、朝には車のフロントガラスに霜が降りることもある南部の丘陵地へも旅立っていく。",
    ),
    f: t(
      "Because the school year runs February to December rather than September to June, this winter break falls roughly at the midpoint of the academic calendar instead of at its end.|Como el año escolar va de febrero a diciembre en vez de septiembre a junio, estas vacaciones de invierno caen aproximadamente a mitad del calendario académico en vez de al final.|Comme l'année scolaire va de février à décembre plutôt que de septembre à juin, ces vacances d'hiver tombent à peu près au milieu du calendrier scolaire plutôt qu'à sa fin.|学年度が9月から6月ではなく2月から12月までであるため、この冬休みは学年の終わりではなく、ほぼ真ん中に位置することになる。",
    ),
  },
  {
    e: "🔥",
    n: t("The dry season brings smoke to the horizon|La temporada seca trae humo al horizonte|La saison sèche apporte de la fumée à l'horizon|乾季が地平線に煙をもたらす"),
    t: t(
      "Little rain falls across the central plateau and the southern fringe of the Amazon this month, and the dry vegetation means both natural and deliberately set fires are easier to start and harder to put out, leaving a haze that can dim the sun for days at a time.|Casi no llueve en la meseta central ni en el borde sur de la Amazonía este mes, y la vegetación seca hace que los incendios, tanto naturales como provocados, sean más fáciles de iniciar y más difíciles de apagar, dejando una calima que puede oscurecer el sol durante días.|Il pleut peu sur le plateau central et la frange sud de l'Amazonie ce mois-ci, et la végétation sèche fait que les feux, naturels comme volontaires, s'allument plus facilement et s'éteignent plus difficilement, laissant une brume qui peut voiler le soleil pendant des jours.|この月、中央高原とアマゾン南縁ではほとんど雨が降らず、乾いた植生のせいで自然発火にせよ人為的なものにせよ火が付きやすく消えにくくなる。何日も太陽をかすませるほどの煙霧が残ることもある。",
    ),
    f: t(
      "Cerrado vegetation actually evolved alongside fire over millions of years and many native plants depend on periodic burns to reproduce, which makes distinguishing a healthy ecological fire from a harmful one a genuinely difficult call even for specialists.|La vegetación del cerrado en realidad evolucionó junto al fuego durante millones de años, y muchas plantas nativas dependen de quemas periódicas para reproducirse, lo que hace que distinguir un fuego ecológicamente sano de uno dañino sea una decisión genuinamente difícil incluso para especialistas.|La végétation du cerrado a en réalité évolué aux côtés du feu pendant des millions d'années, et de nombreuses plantes indigènes dépendent de brûlis périodiques pour se reproduire, ce qui rend la distinction entre un feu écologiquement sain et un feu nuisible réellement difficile même pour des spécialistes.|セラードの植生は実際には何百万年もかけて火とともに進化してきており、多くの在来植物は定期的な野焼きに繁殖を頼っている。そのため、生態学的に健全な火とそうでない火を見分けるのは、専門家にとってさえ本当に難しい判断となる。",
    ),
  },
  {
    e: "🎖️",
    n: t("Independence Day parades fill the avenues|Los desfiles del Día de la Independencia llenan las avenidas|Les défilés du jour de l'Indépendance envahissent les avenues|独立記念日の行進が大通りを埋める"),
    t: t(
      "Marching bands and military units fill main avenues nationwide on the seventh, echoing the moment in 1822 when the prince regent is said to have declared independence beside a stream near São Paulo rather than sail home to Lisbon.|Bandas de música y unidades militares llenan las avenidas principales de todo el país el día siete, en eco del momento de 1822 en que se dice que el príncipe regente declaró la independencia junto a un arroyo cerca de São Paulo en vez de zarpar de vuelta a Lisboa.|Fanfares et unités militaires envahissent les grandes avenues du pays le sept, en écho au moment de 1822 où le prince régent aurait déclaré l'indépendance au bord d'un ruisseau près de São Paulo plutôt que de rentrer à Lisbonne.|七日には行進楽団と軍の部隊が全国の大通りを埋め、1822年、摂政皇太子がリスボンへ帰らず、サンパウロ近郊の小川のほとりで独立を宣言したとされる、あの瞬間を再現する。",
    ),
    f: t(
      "September falls in the middle of the Southern Hemisphere spring, so the parade season also coincides with jacaranda trees blooming a deep violet along the very avenues the marching bands pass through.|Septiembre cae en pleno de la primavera del hemisferio sur, así que la temporada de desfiles coincide también con la floración de un violeta intenso de los jacarandás a lo largo de las mismas avenidas por las que pasan las bandas.|Septembre tombe en plein printemps de l'hémisphère Sud, si bien que la saison des défilés coïncide aussi avec la floraison d'un violet profond des jacarandas le long des mêmes avenues que traversent les fanfares.|9月は南半球の春の真っ只中にあたり、パレードの季節は、まさに楽団が行進するその大通り沿いでジャカランダの木が深い紫色の花を咲かせる時期とも重なる。",
    ),
  },
  {
    e: "🕯️",
    n: t("Pilgrims fill the basilica for Our Lady of Aparecida|Los peregrinos llenan la basílica por Nuestra Señora de Aparecida|Des pèlerins emplissent la basilique pour Notre-Dame d'Aparecida|アパレシーダの聖母を祝う巡礼者が聖堂を埋める"),
    t: t(
      "Fishermen are said to have pulled a small clay statue of the Virgin from a river in 1717 and, soon after, an unusually large catch of fish, and the basilica built around that statue now draws one of the largest annual pilgrimages of any Catholic shrine on Earth this month.|Se dice que unos pescadores sacaron en 1717 una pequeña estatua de arcilla de la Virgen de un río y, poco después, una pesca inusualmente grande, y la basílica erigida en torno a esa estatua atrae hoy este mes una de las mayores peregrinaciones anuales de cualquier santuario católico del planeta.|Des pêcheurs auraient tiré d'une rivière en 1717 une petite statue d'argile de la Vierge, suivie peu après d'une pêche inhabituellement abondante, et la basilique bâtie autour de cette statue attire aujourd'hui ce mois-ci l'un des plus grands pèlerinages annuels de tout sanctuaire catholique au monde.|1717年、漁師たちが川から聖母の小さな粘土像を引き上げ、その直後に異例の大漁があったと伝えられる。その像を祀るために建てられた聖堂は、この月、地上のカトリック聖地の中でも屈指の規模の年次巡礼を集める。",
    ),
    f: t(
      "The same date, 12 October, is also observed nationwide as Children's Day, so pilgrimage buses and toy-shop sales somehow share the same calendar square without much sense of contradiction.|La misma fecha, el 12 de octubre, también se celebra en todo el país como el Día del Niño, así que los autobuses de peregrinos y las rebajas de las jugueterías comparten la misma casilla del calendario sin que parezca contradictorio.|La même date, le 12 octobre, est aussi célébrée dans tout le pays comme la fête des Enfants, si bien que les bus de pèlerins et les soldes des magasins de jouets partagent la même case du calendrier sans grande contradiction apparente.|同じ10月12日は全国で「こどもの日」としても祝われており、巡礼バスと玩具店のセールが、さして矛盾を感じさせることもなく同じ暦の日を分け合っている。",
    ),
  },
  {
    e: "✊🏾",
    n: t("Black Consciousness Day is marked nationwide|El Día de la Conciencia Negra se conmemora en todo el país|La Journée de la Conscience noire est marquée dans tout le pays|黒人意識の日が全国で記念される"),
    t: t(
      "The twentieth of November marks the day Zumbi, the last leader of the Quilombo dos Palmares refuge for people who had escaped slavery, was killed in 1695, and the date has grown from a grassroots observance into an official holiday in a majority of states.|El veinte de noviembre marca el día en que Zumbi, último líder del refugio del Quilombo dos Palmares para personas que habían escapado de la esclavitud, fue asesinado en 1695, y la fecha ha pasado de ser una conmemoración de base a un feriado oficial en la mayoría de los estados.|Le vingt novembre marque le jour où Zumbi, dernier chef du refuge du Quilombo dos Palmares pour les personnes ayant échappé à l'esclavage, fut tué en 1695, et la date est passée d'une commémoration populaire à un jour férié officiel dans la majorité des États.|11月20日は、奴隷の境遇から逃れた人々の避難所キロンボ・ドス・パルマーレスの最後の指導者ズンビが1695年に殺害された日にあたる。この日は草の根の記念日から、大多数の州で公式の祝日へと格上げされてきた。",
    ),
    f: t(
      "It was declared a national public holiday only in 2023, decades after Black movement organisers first began marking it locally in the 1970s, making it one of the newest additions to the federal calendar.|Se declaró feriado nacional oficial recién en 2023, décadas después de que organizadores del movimiento negro empezaran a conmemorarlo localmente en los años setenta, lo que lo convierte en una de las incorporaciones más recientes al calendario federal.|Elle ne fut déclarée jour férié national qu'en 2023, des décennies après que des militants du mouvement noir eurent commencé à la marquer localement dans les années 1970, ce qui en fait l'un des ajouts les plus récents au calendrier fédéral.|これが国の公式な祝日と定められたのは2023年になってからのことで、1970年代に黒人運動の活動家たちが地域で記念し始めてから数十年を経ての制定であり、連邦の祝日暦の中でも最も新しい部類に入る。",
    ),
  },
  {
    e: "🌊",
    n: t("Summer opens and white flowers go out to sea|Empieza el verano y las flores blancas salen al mar|L'été s'ouvre et des fleurs blanches partent vers la mer|夏が始まり、白い花が海へ流される"),
    t: t(
      "As beach season opens across a country now in full summer, coastal communities gather after dark on New Year's Eve to send small boats of white flowers out on the tide for Iemanjá, the orixá of the sea, a practice followed by many who would not otherwise call themselves religious.|Mientras la temporada de playa abre en un país ya en pleno verano, las comunidades costeras se reúnen tras el anochecer de fin de año para enviar en la marea pequeñas barcas de flores blancas a Iemanjá, la orixá del mar, una práctica seguida por muchos que de otro modo no se dirían religiosos.|Tandis que la saison balnéaire s'ouvre dans un pays désormais en plein été, les communautés côtières se rassemblent après la tombée de la nuit du Nouvel An pour envoyer sur la marée de petites embarcations de fleurs blanches à Iemanjá, l'orixá de la mer, une pratique suivie par bien des gens qui ne se diraient pas religieux autrement.|国じゅうが真夏を迎え海開きの季節が訪れるなか、沿岸の共同体は大晦日の夜、海の女神オリシャであるイエマンジャーに向けて、白い花を乗せた小さな舟を潮に流すために日暮れ後に集まる。ふだんは自分を信心深いと思っていない人々の多くもこれに加わる。",
    ),
    f: t(
      "If the little boat of flowers is carried out to sea rather than washed back onto the sand, it is taken as a sign that Iemanjá has accepted the offering and the coming year will go well.|Si la pequeña barca de flores se aleja hacia el mar en vez de ser devuelta a la arena, se interpreta como señal de que Iemanjá aceptó la ofrenda y el año que viene irá bien.|Si la petite embarcation de fleurs part vers le large plutôt que d'être rejetée sur le sable, c'est pris comme un signe qu'Iemanjá a accepté l'offrande et que l'année à venir se passera bien.|花を乗せた小舟が浜に打ち戻されず沖へ流れていけば、イエマンジャーが供物を受け取り、来る年が良い年になる印とされる。",
    ),
  },
  {
    e: "🎆",
    n: t("Millions gather on Copacabana for Réveillon|Millones se reúnen en Copacabana por el Réveillon|Des millions se rassemblent à Copacabana pour le Réveillon|コパカバーナに数百万人が集まるレヴェイヨン",
    ),
    t: t(
      "Copacabana beach fills with several million people dressed in white for New Year's fireworks that rank among the largest displays on Earth, and the crowd is dense enough that many spend the countdown unable to see the sand beneath their own feet.|La playa de Copacabana se llena de varios millones de personas vestidas de blanco para unos fuegos artificiales de fin de año que figuran entre los mayores del planeta, y la multitud es tan densa que muchos pasan la cuenta atrás sin poder ver la arena bajo sus propios pies.|La plage de Copacabana se remplit de plusieurs millions de personnes vêtues de blanc pour un feu d'artifice du Nouvel An comptant parmi les plus grands au monde, et la foule est si dense que beaucoup passent le compte à rebours sans pouvoir voir le sable sous leurs propres pieds.|コパカバーナの浜辺は、地球上でも屈指の規模とされる大晦日の花火を見ようと、白い服をまとった数百万人で埋め尽くされる。人混みはあまりに密で、多くの人はカウントダウンの間、自分の足元の砂さえ見えないほどである。",
    ),
    f: t(
      "Wearing white on New Year's Eve is itself tied to Afro-Brazilian religious tradition, where the colour is associated with peace and with Oxalá, the orixá said to preside over all the others.|Vestir de blanco en Nochevieja está a su vez ligado a la tradición religiosa afrobrasileña, donde el color se asocia con la paz y con Oxalá, el orixá que se dice preside a todos los demás.|Porter du blanc le soir du Nouvel An est lui-même lié à la tradition religieuse afro-brésilienne, où la couleur est associée à la paix et à Oxalá, l'orixá dit présider tous les autres.|大晦日に白を着る習わしそのものが、アフロ・ブラジル系の宗教的伝統に結びついている。白は平和と、他のすべてのオリシャを統べるとされるオシャラーに結びつけられた色である。",
    ),
  },
  {
    e: "🎭",
    n: t("Street blocos take over Carnival|Los blocos callejeros toman el Carnaval|Les blocos de rue s'emparent du Carnaval|路上のブローコがカーニバルを埋め尽くす"),
    t: t(
      "Beyond the ticketed Sambadrome parades, free street parties called blocos, each following its own brass band through a fixed route, draw far larger informal crowds nationwide, some blocos pulling in over a million people behind a single truck of speakers.|Más allá de los desfiles del Sambódromo con entrada, las fiestas callejeras gratuitas llamadas blocos, cada una siguiendo su propia banda de metales por una ruta fija, atraen multitudes informales mucho mayores por todo el país, y algunos blocos reúnen a más de un millón de personas tras un solo camión de altavoces.|Au-delà des défilés payants du Sambódromo, des fêtes de rue gratuites appelées blocos, chacune suivant sa propre fanfare sur un parcours fixe, attirent des foules informelles bien plus nombreuses dans tout le pays, certains blocos rassemblant plus d'un million de personnes derrière un seul camion de sonorisation.|チケット制のサンボードロモのパレードとは別に、決まった道筋を独自の吹奏楽団とともに練り歩く無料の路上パーティー「ブローコ」が、全国でずっと大きな非公式の人出を集めており、たった一台のスピーカートラックの後ろに100万人を超える人が付いていくブローコもある。",
    ),
    f: t(
      "Because Easter's date shifts the whole liturgical calendar, Carnival can fall as early as early February or as late as early March, and street bloco organisers often only lock down routes a few months ahead.|Como la fecha de la Pascua desplaza todo el calendario litúrgico, el Carnaval puede caer tan pronto como principios de febrero o tan tarde como principios de marzo, y los organizadores de blocos callejeros suelen fijar las rutas solo con unos meses de antelación.|Comme la date de Pâques déplace tout le calendrier liturgique, le Carnaval peut tomber dès début février ou aussi tard que début mars, et les organisateurs de blocos de rue ne verrouillent souvent les parcours que quelques mois à l'avance.|復活祭の日付が典礼暦全体をずらすため、カーニバルは早ければ2月初め、遅ければ3月初めにずれ込むこともあり、路上ブローコの主催者はしばしば数か月前になってようやくルートを確定させる。",
    ),
    months: [10],
  },
  {
    e: "🍇",
    n: t("Jabuticaba fruits straight from the trunk|La jabuticaba fructifica directo del tronco|Le jabuticaba fructifie à même le tronc|樹の幹に直接なるジャボチカーバ"),
    t: t(
      "The jabuticaba tree fruits in an odd way that startles first-time visitors: dark, grape-like berries erupt directly from the bark of the trunk and main branches rather than hanging from twigs, ripening thickly enough this month that a tree can look coated in them.|El árbol de jabuticaba fructifica de un modo curioso que sorprende a quien lo ve por primera vez: unas bayas oscuras parecidas a uvas brotan directamente de la corteza del tronco y las ramas principales en vez de colgar de ramitas, madurando este mes tan densamente que un árbol puede parecer cubierto de ellas.|Le jabuticaba fructifie d'une manière étrange qui surprend les visiteurs la première fois : des baies sombres ressemblant à du raisin surgissent directement de l'écorce du tronc et des branches principales plutôt que de pendre à des rameaux, mûrissant ce mois-ci si densément qu'un arbre peut sembler en être recouvert.|ジャボチカーバの木は、初めて見る人を驚かせる奇妙な実り方をする。ブドウに似た濃い色の実が、小枝からではなく幹や主な枝の樹皮から直接吹き出すように実るのである。この月には、木がまるごとその実に覆われているように見えるほど密に熟す。",
    ),
    f: t(
      "The fruit spoils within a day or two of picking, so unlike most Brazilian produce it is almost never exported and remains something visitors mostly have to taste on the tree or not at all.|La fruta se echa a perder en uno o dos días tras recogerla, así que, a diferencia de la mayoría de los productos brasileños, casi nunca se exporta y sigue siendo algo que los visitantes en su mayoría deben probar en el propio árbol o no probarlo en absoluto.|Le fruit se gâte un jour ou deux après la cueillette, si bien que, contrairement à la plupart des produits brésiliens, il n'est presque jamais exporté et reste quelque chose que les visiteurs doivent surtout goûter à même l'arbre, ou pas du tout.|この実は摘んでから一両日で傷んでしまうため、ブラジルの他の農産物と違ってほとんど輸出されず、訪れた人はその場で木から食べるほかに、味わう機会がほとんどない。",
    ),
  },
];
