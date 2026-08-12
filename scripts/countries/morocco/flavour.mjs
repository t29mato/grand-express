/**
 * モロッコの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * イタリア・韓国・フランス・インドと同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く
 * (REGISTER.md に貼り付け用のコード片を用意してある)。
 *
 * **ラマダンは意図的に入れていない。**イスラム暦は太陽暦と噛み合わず、
 * 年によって月が動く(トルコ盤面も同じ理由で入れていない)。
 * 固定の12ヶ月サイクルに嵌め込むと不正確になるため、代わりに
 * 王位の祝日(7月30日)・独立記念日(11月18日)・ヤンナイル(アマジグ暦の新年、
 * 1月中旬)など、**グレゴリオ暦で日付が固定されている祝祭**を選んだ。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const MOROCCO_META = {
  id: "morocco",
  name: t("Morocco|Marruecos|Maroc|モロッコ"),
  blurb: t(
    "A kingdom of blue-washed mountain towns, red-walled imperial cities and a high-speed line racing toward the edge of the Sahara|Un reino de pueblos de montaña pintados de azul, ciudades imperiales de murallas rojas y una línea de alta velocidad que corre hacia el borde del Sáhara|Un royaume de villages de montagne badigeonnés de bleu, de villes impériales aux remparts rouges et d'une ligne à grande vitesse filant vers les portes du Sahara|青く塗られた山あいの町、赤い城壁の帝都、そしてサハラの縁へ走る高速鉄道の王国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (REGISTER.md参照)。ここに書く mul はその値と揃えてある。
  cur: { pre: "", post: " DH", mul: 650 },
  start: "rabat",
  // いずれもモロッコに縁のある実在の人物・語り部の定番役。イブン・バットゥータは
  // タンジェ生まれの大旅行家、レオ・アフリカヌスはフェズで育った地理学者、
  // イブン・ハルドゥーンはフェズの宮廷に仕えた歴史家、ジョハは北アフリカ一帯で
  // 語られる、賢いのか愚かなのか分からないとんち者。
  cpuNames: ["Ibn Battuta", "Leo Africanus", "Ibn Khaldun", "Joha"],
  // 国旗の赤(#c1272d)・緑の星(#006233)に、ジェリージュの金・マジョレル・ブルー・
  // 日干し煉瓦の砂色を添えた5色。
  stripe: ["#c1272d", "#006233", "#f5b31c", "#1a5a9c", "#c9a877"],
};

/** 地方区分(6つ)。 */
export const MOROCCO_REGIONS = {
  rif: t("North — the Rif and the Mediterranean coast|Norte — el Rif y la costa mediterránea|Nord — le Rif et la côte méditerranéenne|北部(リーフ山脈・地中海岸)"),
  atl: t("Atlantic coast — Rabat, Casablanca and the port cities|Costa atlántica — Rabat, Casablanca y las ciudades portuarias|Côte atlantique — Rabat, Casablanca et les villes portuaires|大西洋岸(ラバト・カサブランカと港町)"),
  cen: t("Centre — the imperial cities of the interior|Centro — las ciudades imperiales del interior|Centre — les villes impériales de l'intérieur|中部・内陸(帝都群)"),
  atm: t("The Atlas — cedar forests and mountain passes|El Atlas — bosques de cedro y puertos de montaña|L'Atlas — forêts de cèdres et cols de montagne|アトラス山脈(杉の森と峠)"),
  sud: t("South — the pre-Sahara and the desert|Sur — la presáhara y el desierto|Sud — la présahara et le désert|南部(サハラ前線と砂漠)"),
  est: t("East — Oujda and the Algerian border|Este — Uxda y la frontera argelina|Est — Oujda et la frontière algérienne|東部(ウジダとアルジェリア国境)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const MOROCCO_ITEMS = {
  mobylette: {
    e: "🛵",
    price: 240,
    kind: "move",
    n: t("A Ride on a Mobylette|Un paseo en mobylette|Une balade en Mobylette|モビレットでひとっ走り"),
    d: t(
      "Carried 8–12 squares. The road decides where you come down.|Te lleva de 8 a 12 casillas. La carretera decide dónde bajas.|Emporté de 8 à 12 cases. La route décide où tu redescends.|8〜12マス運ばれる。どこに着くかは道まかせ。",
    ),
    f: t(
      "French-built Mobylette and Peugeot two-stroke mopeds spread across rural Morocco from the 1960s on, and villages too small for a proper garage still keep a mechanic who can strip one down half asleep. A loaf of bread or a sack of mint balanced under one arm is still a more common sight on the road than a helmet.|Los ciclomotores franceses Mobylette y Peugeot de dos tiempos se extendieron por el Marruecos rural desde los años sesenta, y pueblos demasiado pequeños para un taller de verdad aún tienen un mecánico capaz de desmontar uno medio dormido. Una barra de pan o un saco de menta bajo el brazo sigue siendo más habitual en la carretera que un casco.|Les mobylettes françaises Mobylette et Peugeot deux-temps se sont répandues dans le Maroc rural à partir des années 1960, et des villages trop petits pour un vrai garage gardent encore un mécanicien capable d'en démonter une à moitié endormi. Une miche de pain ou un sac de menthe coincé sous le bras reste plus courant sur la route qu'un casque.|フランス製の2ストロークモペット、モビレットやプジョーは1960年代からモロッコの農村部に広まり、まともな整備工場もない小さな村にさえ、半分眠りながらでも分解できる整備士がいまも一人はいる。道路でよく見かけるのはヘルメットより、片腕に抱えたパンの塊やミントの袋である。",
    ),
  },
  horaire: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("The Printed Timetable|El horario impreso|L'horaire imprimé|印刷された時刻表(オレール)"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "ONCF, the state railway, still prints a horaire booklet at every timetable change that riders fold into wallets and glove compartments out of habit, even though the same information now lives in an app. Morocco's railway is one of the oldest in Africa; its first line was laid in 1911 under the French protectorate to move phosphate, not passengers.|La ONCF, la compañía ferroviaria estatal, sigue imprimiendo un folleto horaire en cada cambio de temporada que los viajeros doblan en la cartera por costumbre, aunque la misma información ya viva en una app. El ferrocarril marroquí es de los más antiguos de África: su primera línea se tendió en 1911 bajo el protectorado francés para mover fosfato, no pasajeros.|L'ONCF, la compagnie ferroviaire nationale, imprime encore un horaire à chaque changement de saison que les voyageurs plient par habitude dans leur portefeuille, même si la même information vit désormais dans une appli. Le rail marocain est l'un des plus anciens d'Afrique : sa première ligne fut posée en 1911 sous le protectorat français pour transporter du phosphate, pas des voyageurs.|国鉄ONCFはいまもダイヤ改正のたびに印刷版のオレール(時刻表)を出しており、同じ情報がアプリにもあるにもかかわらず、乗客は習慣でそれを財布やグローブボックスに折りたたんでしまっておく。モロッコの鉄道はアフリカでも指折りの古さで、最初の路線は1911年、フランス保護領時代に旅客ではなくリン鉱石を運ぶために敷かれた。",
    ),
  },
  rapide: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("A Rapide Ticket|Un billete Rapide|Un billet Rapide|ラピッド切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Before the high-speed line opened, ONCF's fastest ordinary service was simply branded Rapide, stopping only at the largest stations between Casablanca, Rabat, Fez and Marrakech. Much of that older rolling stock is still in service today, on lines the new high-speed route doesn't reach.|Antes de que abriera la línea de alta velocidad, el servicio ordinario más rápido de la ONCF se llamaba simplemente Rapide, y solo paraba en las grandes estaciones entre Casablanca, Rabat, Fez y Marrakech. Buena parte de ese material rodante más antiguo sigue en servicio hoy, en líneas a las que la nueva ruta de alta velocidad no llega.|Avant l'ouverture de la ligne à grande vitesse, le service ordinaire le plus rapide de l'ONCF s'appelait simplement Rapide, ne s'arrêtant que dans les plus grandes gares entre Casablanca, Rabat, Fès et Marrakech. Une bonne part de ce matériel plus ancien roule encore aujourd'hui, sur des lignes que la nouvelle ligne à grande vitesse n'atteint pas.|高速新線が開業する前、ONCFの在来線で最速だった便は単に「ラピッド」と呼ばれ、カサブランカ・ラバト・フェズ・マラケシュを結ぶ主要駅にしか停まらなかった。その古い車両の多くは、新しい高速線が通らない路線でいまも現役である。",
    ),
  },
  alboraq: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("An Al Boraq Ticket|Un billete Al Boraq|Un billet Al Boraq|アル・ボラーク切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Al Boraq, launched in 2018 between Tangier and Casablanca, was the first true high-speed rail line built anywhere in Africa, running at up to 320 km/h and cutting a trip that once took roughly five hours down to about two. It's named for al-Burāq, the winged steed said in Islamic tradition to have carried the Prophet on his night journey.|Al Boraq, inaugurado en 2018 entre Tánger y Casablanca, fue la primera línea de alta velocidad de verdad construida en toda África, capaz de 320 km/h y que redujo un trayecto que antes duraba unas cinco horas a poco más de dos. Debe su nombre a al-Burāq, la montura alada que, según la tradición islámica, llevó al Profeta en su viaje nocturno.|Al Boraq, inaugurée en 2018 entre Tanger et Casablanca, fut la première véritable ligne à grande vitesse construite en Afrique, filant jusqu'à 320 km/h et ramenant un trajet qui prenait jadis environ cinq heures à un peu plus de deux. Elle tire son nom d'al-Burāq, la monture ailée censée, selon la tradition islamique, avoir porté le Prophète lors de son voyage nocturne.|2018年にタンジェ―カサブランカ間で開業したアル・ボラークは、アフリカで初めて建設された本物の高速鉄道で、最高時速320kmで走り、かつておよそ5時間かかっていた行程を2時間ほどに縮めた。名はイスラームの伝承で預言者を夜の旅へと運んだとされる翼を持つ乗り物、アル・ブラークに由来する。",
    ),
  },
  khamsa: {
    e: "🖐️",
    price: 320,
    kind: "passive",
    n: t("The Khamsa Charm|El amuleto de la khamsa|Le porte-bonheur khamsa|カムサの御守り(五本指)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The khamsa — literally \"five,\" for its five fingers — is hung over doorways and worn as jewelry across Morocco to turn away the evil eye, and open-palm charms very like it appear under different names throughout North Africa and the Middle East. Its job isn't to fight misfortune head-on, only to catch a harmful glance before it lands.|La khamsa —literalmente «cinco», por sus cinco dedos— se cuelga sobre las puertas y se lleva como joya en todo Marruecos para ahuyentar el mal de ojo, y amuletos de mano abierta muy parecidos aparecen con otros nombres por todo el norte de África y Oriente Medio. Su función no es combatir la desgracia de frente, solo interceptar una mirada dañina antes de que llegue.|La khamsa — littéralement « cinq », pour ses cinq doigts — est accrochée au-dessus des portes et portée en bijou dans tout le Maroc pour détourner le mauvais œil, et des amulettes à main ouverte très semblables apparaissent sous d'autres noms dans toute l'Afrique du Nord et le Moyen-Orient. Son rôle n'est pas de combattre le malheur de front, seulement d'intercepter un regard nuisible avant qu'il n'atteigne sa cible.|「カムサ」は文字どおり「五」を意味し、その五本の指にちなむ。モロッコでは戸口に掛けたり装身具として身につけたりして邪視を防ぐとされ、よく似た開いた手の御守りは呼び名を変えて北アフリカから中東まで広く見られる。この御守りの役目は災難と正面から戦うことではなく、届く前の悪意ある視線を横取りすることだけである。",
    ),
  },
  bakhour: {
    e: "🕯️",
    price: 440,
    kind: "pre",
    n: t("The Bakhour Smoke|El humo de bakhour|La fumée de bakhour|バフールの煙",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Burning bakhour — resin incense, or the pungent seeds of harmel, wild rue — is a common Moroccan remedy against jnun, the unseen beings said to share the house with the living. The smoke is carried through every room corner by corner, since jnun are said to favor exactly the places a broom can't easily reach.|Quemar bakhour —incienso de resina, o las semillas de olor fuerte del harmel, la ruda silvestre— es un remedio corriente en Marruecos contra los jnun, seres invisibles que se dice comparten la casa con los vivos. El humo se pasea por cada rincón de cada habitación, ya que se dice que los jnun prefieren justo los sitios que una escoba no alcanza bien.|Brûler du bakhour — de l'encens résineux, ou les graines âcres du harmel, la rue sauvage — est un remède courant au Maroc contre les jnoun, ces êtres invisibles censés partager la maison avec les vivants. La fumée est promenée dans chaque pièce, coin par coin, car les jnoun préféreraient justement les endroits qu'un balai atteint mal.|樹脂の香(バフール)や、ハルマル(野生のヘンルーダ)の香りの強い種子を焚くのは、生きている人間と家を分かち合うとされる目に見えない存在「ジュヌーン」への、モロッコでよくある対処法である。煙は部屋の隅々まで運ばれる。ジュヌーンはまさに箒の届きにくい場所を好むとされるからである。",
    ),
  },
  fiche: {
    e: "📝",
    price: 130,
    kind: "passive",
    n: t("The Crib Card|La ficha chuleta|La fiche antisèche|虎の巻(フィッシュ)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommée.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "A fiche, in Moroccan classrooms and lycées that still teach largely in French, is a condensed revision card small enough to slip up a sleeve during an oral exam. Teachers caught on to the trick generations ago, and some now hand out an official one-page fiche of their own before the hardest exams, just to level the field.|Una fiche, en las aulas y liceos marroquíes que aún enseñan en gran parte en francés, es una chuleta condensada lo bastante pequeña para deslizarla en la manga durante un examen oral. Los profesores llevan generaciones al tanto del truco, y algunos ahora reparten su propia fiche oficial de una página antes de los exámenes más difíciles, solo para igualar el terreno.|Une fiche, dans les classes et lycées marocains qui enseignent encore largement en français, est un résumé condensé assez petit pour se glisser dans une manche pendant un oral. Les professeurs connaissent l'astuce depuis des générations, et certains distribuent désormais leur propre fiche officielle d'une page avant les examens les plus difficiles, histoire d'égaliser les chances.|「フィッシュ」とは、いまも大部分をフランス語で教えるモロッコの学校・リセで、口頭試験のあいだ袖にこっそり忍ばせられるほど小さくまとめた要点集を指す。教師たちはこの手口を何世代も前から見抜いており、いまでは最も難しい試験の前に、条件を揃えるためだけに教師自身が公式の1枚フィッシュを配ることさえある。",
    ),
  },
  zerbia: {
    e: "🧶",
    price: 280,
    kind: "pre",
    n: t("A Zerbia Sold at a Good Price|Una zerbia vendida a buen precio|Une zerbia vendue à bon prix|良い値で売れたゼルビア絨毯"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "A zerbia, a thick-piled Middle Atlas rug knotted by Amazigh women often as part of a household's dowry, can take months to finish on a vertical loom set up in a home courtyard. Souk traders in the big cities buy them from mountain villages for a fraction of what a finished rug fetches once resold in a Marrakech shop.|Una zerbia, alfombra de pelo grueso del Atlas Medio anudada por mujeres amazigh a menudo como parte de la dote familiar, puede tardar meses en completarse en un telar vertical instalado en el patio de casa. Los comerciantes de los zocos de las grandes ciudades las compran a las aldeas de montaña por una fracción de lo que vale una vez revendida en una tienda de Marrakech.|Une zerbia, tapis épais du Moyen Atlas noué par des femmes amazighes souvent en dot, peut prendre des mois à achever sur un métier vertical installé dans la cour de la maison. Les marchands des souks des grandes villes les achètent aux villages de montagne pour une fraction de ce qu'un tapis fini rapporte une fois revendu dans une boutique de Marrakech.|中部アトラスの厚い毛足の絨毯「ゼルビア」は、アマジグの女性たちが結婚の持参品としてしばしば手がけるもので、家の中庭に立てた縦型の織機で仕上げるまでに何か月もかかる。大都市の市場商人は山あいの村からこれを二束三文で買い付け、マラケシュの店で転売されるときの値の何分の一かで済ませる。",
    ),
  },
  wasta: {
    e: "🤝",
    price: 420,
    kind: "pre",
    n: t("A Word from Someone Who Knows Someone|Una palabra de alguien que conoce a alguien|Un mot de quelqu'un qui connaît quelqu'un|顔利きの一声(ワスタ)"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Wasta — literally \"connection\" or \"mediation\" — describes the quiet favor of someone who knows someone, said to smooth paperwork, permits and waiting lists across Morocco and the wider Arab world. It's talked about constantly as a problem and used just as constantly by the very people complaining about it.|Wasta —literalmente «conexión» o «mediación»— describe el favor discreto de alguien que conoce a alguien, que se dice que allana trámites, permisos y listas de espera en Marruecos y en todo el mundo árabe. Se habla de ella constantemente como un problema y la usan igual de constantemente quienes se quejan de ella.|Wasta — littéralement « connexion » ou « médiation » — désigne la faveur discrète de quelqu'un qui connaît quelqu'un, censée aplanir paperasse, permis et listes d'attente au Maroc comme dans tout le monde arabe. On s'en plaint sans cesse comme d'un problème, et on l'utilise tout aussi constamment, souvent les mêmes personnes.|「ワスタ」とは文字どおり「つながり」「仲介」を意味し、知り合いの知り合いからの静かな口利きが、モロッコやアラブ世界全体で書類手続きも許可も順番待ちもするりと通してしまうとされる。それを絶えず問題だと語る当人たちが、同じくらい絶えずそれを使っている。",
    ),
  },
};

/**
 * 厄災の神。戸口や排水口、暗い隅に宿るとされる「ジュヌーン(jnun)」の一柱にした。
 * 特定の伝説上の名前を持つ強大な存在(アイシャ・カンディシャなど、恐れられる
 * 性格が強い)ではなく、家々に実際に伝わる作法──熱い湯を流す前や夜に掃く前に
 * 「デストゥル(ご容赦を)」と声をかける習慣──に根ざした、名も無い戸口の精にした
 * (悪意ではなく、ないがしろにされると拗ねる性格。韓国のトッケビ・イタリアの
 * モナチェッロと同じ扱い)。
 */
export const MOROCCO_SPIRIT = {
  e: "💨",
  n: t("The Doorstep Jinn|El yinn del umbral|Le djinn du seuil|戸口のジュヌーン"),
  big: t("The Doorstep Jinn's Long Sulk|El largo enfado del yinn del umbral|La longue bouderie du djinn du seuil|戸口のジュヌーンの長い拗ね"),
  ward: "khamsa",
  arrive: t(
    "<b>💨 A jinn has taken an interest in you.</b> Moroccan households leave space near doorways, drains and dark corners out of old habit, since jnun are said to rest in exactly those spots and don't take kindly to being startled without warning. This one now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>💨 Un yinn se ha fijado en ti.</b> Las casas marroquíes dejan espacio junto a puertas, desagües y rincones oscuros por vieja costumbre, ya que se dice que los jnun descansan justo en esos sitios y no toman bien que los sobresalten sin avisar. Este ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>💨 Un djinn s'est intéressé à toi.</b> Les foyers marocains laissent de l'espace près des portes, des évacuations et des coins sombres par vieille habitude, car les jnoun sont censés se reposer justement là et n'apprécient guère d'être surpris sans prévenir. Celui-ci marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>💨 ジュヌーンに目を付けられた。</b> モロッコの家々は昔からの習わしで、戸口や排水口、暗い隅に空間を残しておく。ジュヌーンはまさにそうした場所で休んでいるとされ、断りなく驚かされるのを嫌うからである。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "💨 <b>The jinn</b> slips off through a crack in the wall toward <b>{0}</b>, farthest from {1}.|💨 <b>El yinn</b> se escurre por una grieta del muro hacia <b>{0}</b>, el más lejano de {1}.|💨 <b>Le djinn</b> se faufile par une fissure du mur vers <b>{0}</b>, le plus loin de {1}.|💨 <b>ジュヌーン</b> は壁の隙間をすり抜け、{1} から最も遠い <b>{0}</b> のほうへ移った。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the jinn and never once said <i>destur</i> — the word still murmured in Morocco before pouring hot water down a drain, out of respect for whatever might be resting there. Taken for granted once too often, the jinn stops being merely mischievous — <b>the Doorstep Jinn's Long Sulk</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al yinn sin decir ni una vez <i>destur</i>, la palabra que aún se murmura en Marruecos antes de verter agua caliente por un desagüe, por respeto a lo que pueda descansar allí. Harto de que lo den por sentado, el yinn deja de ser solo travieso: empieza <b>el largo enfado del yinn del umbral</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le djinn sans jamais dire <i>destur</i>, ce mot encore murmuré au Maroc avant de verser de l'eau chaude dans une évacuation, par respect pour ce qui pourrait s'y reposer. Pris pour acquis une fois de trop, le djinn cesse d'être simplement espiègle — <b>la longue bouderie du djinn du seuil</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもジュヌーンと歩いていながら、一度も「デストゥル(ご容赦を)」と唱えなかった。それは排水口に熱い湯を流す前、そこに何かが休んでいるかもしれないと敬って、いまもモロッコでつぶやかれる言葉である。あまりに当たり前に扱われ続けたジュヌーンは、ただのいたずら好きではいられなくなる。<b>戸口のジュヌーンの長い拗ね</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> saying destur — roughly \"with your leave\" — before sweeping at night, pouring hot water, or stepping over a threshold in the dark remains a common courtesy in Morocco, addressed to jnun believed to share these ordinary spaces with the living.|<b>Tras la historia:</b> decir destur —algo así como «con su permiso»— antes de barrer de noche, verter agua caliente o cruzar un umbral a oscuras sigue siendo una cortesía habitual en Marruecos, dirigida a los jnun que se cree comparten estos espacios cotidianos con los vivos.|<b>Derrière l'histoire :</b> dire destur — à peu près « avec votre permission » — avant de balayer la nuit, de verser de l'eau chaude ou de franchir un seuil dans le noir reste une politesse courante au Maroc, adressée aux jnoun censés partager ces espaces ordinaires avec les vivants.|<b>物語の背景:</b> 夜に掃除をする前や熱い湯を流す前、暗闇で敷居をまたぐ前に「デストゥル(お許しを)」と唱えるのは、いまもモロッコでよく見られる作法で、こうしたありふれた場所を生者と分かち合っているとされるジュヌーンに向けたものである。",
  ),
  pleased: t(
    "A warm gust slips past, and a coin turns up at your feet as if it had been lying there all along. <b>{0}</b> gains <span class='money'>+{1}</span>.|Una ráfaga cálida pasa de largo, y una moneda aparece a tus pies como si llevara ahí todo el tiempo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Une bourrasque tiède passe, et une pièce apparaît à tes pieds comme si elle avait toujours été là. <b>{0}</b> gagne <span class='money'>+{1}</span>.|温かい風がすり抜けたかと思うと、足元に前からそこにあったかのように銭が一枚落ちていた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A khamsa catches the light where the jinn can see it, and — never one to cross a charm hung in good faith — it slips past <b>{0}</b> without a glance this turn.|Una khamsa capta la luz donde el yinn puede verla, y —que nunca cruza un amuleto colgado de buena fe— pasa de largo junto a <b>{0}</b> sin mirar esta vuelta.|Une khamsa accroche la lumière bien en vue du djinn, et — ne franchissant jamais un porte-bonheur accroché de bonne foi — il passe devant <b>{0}</b> sans un regard ce tour-ci.|カムサの御守りが光を返してジュヌーンの目につくと、善意で掛けられた御守りの領分を決して侵さないジュヌーンは、このターン <b>{0}</b> を一瞥もせず通り過ぎた。",
  ),
};

/** 災難7種。 */
export const MOROCCO_DOOM = [
  {
    id: "compteur",
    n: t("A petit taxi 'forgets' to run the meter|Un petit taxi «se olvida» de poner el taxímetro|Un petit taxi « oublie » d'enclencher le compteur|プティ・タクシーがメーターを「忘れる」"),
    t: t(
      "The petit taxi pulled over fast enough, but the driver waved off the request to start the meter with a shrug and a price already decided before the door had even closed. Petit taxis are legally required to run a compteur inside city limits, and while most drivers do, a flat inflated fare for anyone who looks like a first-time rider is common enough that guidebooks still warn about it by name.|El petit taxi paró bastante rápido, pero el conductor descartó con un gesto la petición de poner el taxímetro, con un precio ya decidido antes de que se cerrara la puerta. Los petit taxis están legalmente obligados a usar el compteur dentro de la ciudad, y aunque la mayoría lo hace, una tarifa plana inflada para quien parece un pasajero primerizo es lo bastante común como para que las guías todavía avisen de ello por su nombre.|Le petit taxi s'est arrêté assez vite, mais le chauffeur a balayé d'un geste la demande d'enclencher le compteur, un prix déjà fixé avant même que la porte ne se ferme. Les petits taxis sont légalement tenus de faire tourner le compteur en ville, et si la plupart le font, un tarif forfaitaire gonflé pour qui a l'air d'un premier passage est assez courant pour que les guides le signalent encore nommément.|プティ・タクシーはすぐに停まってくれたが、運転手はメーターを回してほしいという頼みを手振りで受け流し、ドアが閉まる前にはもう値段が決まっていた。プティ・タクシーは市内ではメーター(コンプトゥール)を使うことが法律で義務づけられており、たいていの運転手は守っているが、初めての乗客に見える相手には水増しした一律料金を吹っかけることも珍しくなく、ガイドブックがいまも名指しで注意を促すほどである。",
    ),
  },
  {
    id: "chergui",
    n: t("The chergui wind scorches the harvest|El viento chergui abrasa la cosecha|Le vent chergui grille la récolte|シェルギ風が収穫を焦がす"),
    t: t(
      "The chergui blew in off the Sahara for three straight days, a hot dry wind that can push temperatures up more than fifteen degrees in a single afternoon and strip the moisture out of anything left uncovered. Orchards along the plains lost blossom and unripe fruit before growers could get shade cloth up, and even indoors the wind found every gap in a closed shutter.|El chergui sopló desde el Sáhara durante tres días seguidos, un viento cálido y seco capaz de subir la temperatura más de quince grados en una sola tarde y secar cualquier cosa dejada al descubierto. Los huertos de la llanura perdieron flores y fruta verde antes de que se pudiera tender la malla de sombra, y hasta dentro de casa el viento encontró cada rendija de una contraventana cerrada.|Le chergui a soufflé depuis le Sahara trois jours durant, un vent chaud et sec capable de faire grimper la température de plus de quinze degrés en un seul après-midi et d'assécher tout ce qui restait à découvert. Les vergers de la plaine ont perdu fleurs et fruits verts avant qu'on ait pu tendre les toiles d'ombrage, et même à l'intérieur, le vent trouvait chaque interstice d'un volet fermé.|シェルギ風がサハラから3日間吹き続けた。この熱く乾いた風はわずか一日の午後で気温を15度以上押し上げ、覆いのないものから水分をことごとく奪う。平野部の果樹園では、遮光ネットを張る間もなく花や青い実が落ち、屋内でさえ閉めた鎧戸のあらゆる隙間から風が入り込んだ。",
    ),
    months: [1, 2],
  },
  {
    id: "souqday",
    n: t("The weekly souq blocks the only road|El zoco semanal bloquea la única carretera|Le souk hebdomadaire bloque l'unique route|週市が唯一の道を塞ぐ"),
    t: t(
      "The weekly souq brought half the district's sheep, mules and motorbikes onto the one road out of town at once, and by the time the animals had been sorted back into their pens the whole morning was gone. Most rural Moroccan towns still hold their souq on a single fixed weekday, a rhythm old enough that many villages are simply named for the day theirs falls on — Souk et-Tnine, \"Monday's market.\"|El zoco semanal llevó a la vez a media comarca de ovejas, mulas y motos a la única carretera de salida del pueblo, y para cuando los animales volvieron a sus corrales se había ido toda la mañana. La mayoría de los pueblos rurales marroquíes siguen celebrando su zoco un día fijo de la semana, una costumbre tan antigua que muchas aldeas llevan simplemente el nombre del día en que cae el suyo: Souk et-Tnine, «el mercado del lunes».|Le souk hebdomadaire a amené d'un coup la moitié des moutons, mulets et motos du district sur l'unique route de sortie du village, et le temps que les bêtes regagnent leurs enclos, toute la matinée était partie. La plupart des villes rurales marocaines tiennent encore leur souk un jour fixe de la semaine, une habitude si ancienne que bien des villages portent simplement le nom du jour où tombe le leur — Souk et-Tnine, « le marché du lundi ».|週に一度の市(スーク)が、羊やラバやバイクを地区の半分ぶん、町を出る唯一の道路に一度に押し寄せさせ、動物たちが囲いへ戻される頃には午前中がまるまる潰れていた。モロッコの農村の町の多くはいまも週のうち決まった曜日にスークを開いており、その習わしはあまりに古いため、多くの村が単にその市の立つ曜日にちなんで名付けられている――「月曜の市」を意味するスーク・エッ=トニンのように。",
    ),
  },
  {
    id: "harika",
    n: t("A fire spreads through the covered souk|Un incendio se propaga por el zoco cubierto|Un incendie se propage dans le souk couvert|屋根付きの市場に火が広がる"),
    t: t(
      "A dropped brazier in a narrow textile stall caught the awnings above it before anyone smelled the smoke, and in a medina of covered alleys barely wide enough for two loaded donkeys to pass, the fire jumped three stalls before it could be beaten out with wet blankets. Fire insurance is rare in the old souks, so what burns there is usually simply gone for good.|Un brasero caído en un puesto estrecho de telas prendió los toldos de encima antes de que nadie oliera el humo, y en una medina de callejones cubiertos apenas anchos para que pasen dos burros cargados, el fuego saltó tres puestos antes de poder apagarse a golpes de manta mojada. El seguro contra incendios es raro en los zocos antiguos, así que lo que arde ahí suele perderse para siempre.|Un brasero renversé dans une étroite échoppe de tissus a pris feu aux auvents au-dessus avant que quiconque ne sente la fumée, et dans une médina d'allées couvertes à peine assez larges pour deux ânes chargés, le feu a sauté trois échoppes avant d'être étouffé à coups de couvertures mouillées. L'assurance incendie est rare dans les vieux souks, alors ce qui y brûle est le plus souvent perdu pour de bon.|狭い布地の露店で落ちた火鉢が誰も煙に気づかないうちに上の日よけに燃え移り、荷を積んだロバ二頭がやっと通れるほどの幅しかない屋根付きの路地が続く旧市街では、濡れた毛布で叩き消されるまでに火は三軒先の店まで飛び火した。古い市場では火災保険はまれで、そこで燃えたものはたいてい永久に失われる。",
    ),
  },
  {
    id: "atay",
    n: t("Losing badly at dominoes means buying the tea|Perder feo al dominó significa pagar el té|Une lourde défaite aux dominos, et c'est la tournée de thé|ドミノに負けて、お茶をおごる羽目に"),
    t: t(
      "The dominoes were going badly, and the house rule — loser buys the next round of tea for the whole table — turned out to include everyone who had pulled up a stool just to watch. Moroccan mint tea is traditionally poured from height to build a foam on top and served in three rounds, with an old saying holding that the first glass is as gentle as life, the second as strong as love, and the third as bitter as death.|La partida de dominó iba mal, y la norma de la casa —el que pierde paga la ronda de té para toda la mesa— resultó incluir a todos los que habían arrimado un taburete solo para mirar. El té de menta marroquí se sirve tradicionalmente vertido desde lo alto para formar espuma, en tres rondas, con un viejo dicho que sostiene que el primer vaso es dulce como la vida, el segundo fuerte como el amor y el tercero amargo como la muerte.|La partie de dominos tournait mal, et la règle de la maison — le perdant paie la tournée de thé pour toute la table — s'est révélée inclure tous ceux qui avaient tiré un tabouret rien que pour regarder. Le thé à la menthe marocain se verse traditionnellement de haut pour former une mousse, en trois tournées, avec un vieux dicton voulant que le premier verre soit doux comme la vie, le second fort comme l'amour, et le troisième amer comme la mort.|ドミノの勝負は分が悪く、「負けた者がテーブル全員分のお茶をおごる」という店の習わしは、ただ見物に腰掛けを引っ張ってきただけの者まで巻き込む羽目になった。モロッコのミントティーは高い位置から注いで泡を立て、三杯に分けて出すのが伝統で、古い言い習わしによれば一杯目は人生のように穏やかで、二杯目は愛のように強く、三杯目は死のように苦いという。",
    ),
  },
  {
    id: "grandtaxi",
    n: t("Boarding the wrong grand taxi|Subiendo al grand taxi equivocado|Monter dans le mauvais grand taxi|違う大型タクシーに乗ってしまう"),
    t: t(
      "Six strangers wedged into the beige Mercedes at the collective taxi rank, and it wasn't until well past the point of turning back that it became clear this particular grand taxi was bound for a town with a very similar name and a very different destination. Grands taxis run fixed routes and leave only once all six seats are filled, which usually means a fast trip — just not always in the direction a new rider expects.|Seis desconocidos se apretujaron en el Mercedes beige de la parada de taxis colectivos, y no fue hasta bien pasado el punto de dar la vuelta cuando quedó claro que ese grand taxi en concreto iba a un pueblo de nombre muy parecido y destino muy distinto. Los grands taxis siguen rutas fijas y solo salen cuando se llenan los seis asientos, lo que suele significar un viaje rápido, aunque no siempre en la dirección que un pasajero nuevo espera.|Six inconnus se sont entassés dans la Mercedes beige à la station de taxis collectifs, et ce n'est que bien après le point de non-retour qu'il est apparu que ce grand taxi précis filait vers une ville au nom très proche mais à la destination bien différente. Les grands taxis suivent des itinéraires fixes et ne partent qu'une fois les six places occupées, ce qui garantit un trajet rapide — mais pas toujours dans la direction attendue par un nouveau passager.|見知らぬ乗客六人が乗合タクシー乗り場のベージュのメルセデスに詰め込まれ、もう引き返せない地点をとうに過ぎてから、この大型タクシーが名前のよく似た、まったく別の目的地の町へ向かっていることがようやくはっきりした。大型タクシー(グラン・タクシー)は決まった路線を走り、六座席すべてが埋まって初めて出発する。それはたいてい速い旅を意味するが、初めて乗る客が思っている方向とは限らない。",
    ),
  },
  {
    id: "nachal",
    n: t("A pickpocket in the evening crowd|Un carterista en la multitud del atardecer|Un pickpocket dans la foule du soir|夕暮れの人混みでのすり"),
    t: t(
      "The crowd around the storytellers and orange-juice carts in the main square pressed in tight after dark, and it was only back at the hotel that the missing wallet — lifted from an outside jacket pocket sometime in the crush — was noticed at all. Marrakech's Jemaa el-Fnaa fills with thousands of people every evening, and the same density that makes it one of the liveliest public squares in Africa makes an unwatched pocket an easy target.|La multitud alrededor de los cuentacuentos y los carritos de zumo de naranja de la plaza principal se apretó al caer la noche, y no fue hasta volver al hotel cuando se notó que faltaba la cartera, sacada de un bolsillo exterior de la chaqueta en algún momento del apretujón. La Jemaa el-Fnaa de Marrakech se llena de miles de personas cada tarde, y la misma densidad que la convierte en una de las plazas públicas más vivas de África hace de un bolsillo descuidado un blanco fácil.|La foule autour des conteurs et des charrettes de jus d'orange de la grand-place s'est resserrée après la tombée de la nuit, et ce n'est qu'une fois à l'hôtel qu'on a remarqué le portefeuille manquant, subtilisé dans une poche extérieure de veste au plus fort de la cohue. La Jemaa el-Fna de Marrakech se remplit de milliers de personnes chaque soir, et la même densité qui en fait l'une des places publiques les plus vivantes d'Afrique rend une poche mal surveillée facile à cibler.|中央広場の語り部やオレンジジュースの屋台の周りに集まる人混みは日が暮れると一段と密になり、財布が上着の外ポケットからいつの間にか抜き取られていたことに気づいたのは、宿に戻ってからだった。マラケシュのジャマ・エル・フナ広場は毎晩何千人もの人で埋まり、アフリカでも指折りに活気ある広場たらしめているその密度こそが、油断したポケットを格好の的にする。",
    ),
  },
];

/** 季節。4月始まりの12ヶ月。 */
export const MOROCCO_SEASONS = [
  {
    e: "🐑",
    n: t("Flocks move up to the high pastures|Los rebaños suben a los pastos altos|Les troupeaux montent vers les hauts pâturages|群れが高地の牧草地へ登る"),
    t: t(
      "Amazigh shepherds in the Atlas begin the annual azaghar, walking flocks of sheep and goats up out of the valleys toward the high summer pastures as the last snow retreats from the passes, a migration some families still make entirely on foot over several days. Wildflowers spread across the foothills just behind them.|Los pastores amazigh del Atlas comienzan el azaghar anual, llevando rebaños de ovejas y cabras desde los valles hacia los pastos altos de verano a medida que la última nieve se retira de los puertos, una migración que algunas familias aún hacen enteramente a pie durante varios días. Las flores silvestres cubren las estribaciones justo detrás de ellos.|Les bergers amazighs de l'Atlas entament l'azaghar annuel, menant moutons et chèvres hors des vallées vers les hauts pâturages d'été à mesure que la dernière neige se retire des cols, une migration que certaines familles font encore entièrement à pied sur plusieurs jours. Les fleurs sauvages envahissent les contreforts juste derrière eux.|アトラスのアマジグの羊飼いたちは毎年恒例のアザガル(移牧)を始め、峠から最後の雪が退くとともに、羊とヤギの群れを谷から夏の高地牧草地へと連れて登る。いまも何日もかけて完全に徒歩で行う家族がいる移動である。その後を追うように、麓には野の花が広がる。",
    ),
    f: t(
      "The return trip, taleft, happens in reverse each autumn, and the two migrations together can move a flock well over a thousand metres in elevation across a single year.|El viaje de vuelta, taleft, se hace en sentido contrario cada otoño, y las dos migraciones juntas pueden mover un rebaño más de mil metros de altitud en un solo año.|Le trajet de retour, le taleft, se fait en sens inverse chaque automne, et les deux migrations combinées peuvent faire gagner à un troupeau plus de mille mètres de dénivelé en une seule année.|秋には逆方向の帰り旅「タレフト」が行われ、この二つの移動を合わせると、群れは一年のうちに標高差1000メートル以上を移動することになる。",
    ),
  },
  {
    e: "🌹",
    n: t("The Rose Festival at Kelâat M'Gouna|El Festival de la Rosa en Kelâat M'Gouna|La Fête des Roses à Kelâat M'Gouna|ケラア・ムグナのバラ祭り"),
    t: t(
      "The Valley of Roses around Kelâat M'Gouna holds its harvest just as the Damask roses bloom, with pickers working before sunrise since the petals' fragrant oil fades fast once the day heats up, and the Moussem des Roses caps the week with a parade and a rose-crowned festival queen. Almost the entire national rosewater and rose-oil supply comes from this one valley.|El Valle de las Rosas, en torno a Kelâat M'Gouna, celebra su cosecha justo cuando florece la rosa de Damasco, con recolectores trabajando antes del amanecer porque el aceite fragante de los pétalos se pierde rápido en cuanto aprieta el calor del día, y el Moussem des Roses cierra la semana con un desfile y una reina de las rosas. Casi todo el agua de rosas y el aceite de rosa del país sale de este único valle.|La vallée des Roses autour de Kelâat M'Gouna célèbre sa récolte juste à la floraison des roses de Damas, les cueilleurs travaillant avant le lever du soleil car l'huile parfumée des pétales s'évapore vite dès que la chaleur du jour monte, et le Moussem des Roses clôt la semaine par un défilé et une reine des roses. Presque toute l'eau de rose et l'huile de rose du pays viennent de cette seule vallée.|ケラア・ムグナ周辺の「バラの谷」では、ダマスクローズが咲くのに合わせて収穫を行う。花びらの香り高い油は日中の暑さで急速に失われるため、摘み手は日の出前から働き、週の締めくくりにはバラの女王の行進を伴うバラ祭り(ムーセム・デ・ローズ)が開かれる。国内のローズウォーターとローズオイルのほぼすべてがこのひとつの谷から出荷される。",
    ),
    f: t(
      "It takes roughly four tonnes of rose petals to distill a single litre of pure rose oil, which is why most of the harvest goes instead into the far less concentrated rosewater used in cooking and splashed on guests' hands before a meal.|Hacen falta unas cuatro toneladas de pétalos de rosa para destilar un solo litro de aceite de rosa puro, por lo que la mayor parte de la cosecha va en cambio al agua de rosas, mucho menos concentrada, usada en la cocina y rociada sobre las manos de los invitados antes de comer.|Il faut environ quatre tonnes de pétales de rose pour distiller un seul litre d'huile de rose pure, ce qui explique pourquoi l'essentiel de la récolte part plutôt en eau de rose, bien moins concentrée, utilisée en cuisine et versée sur les mains des invités avant un repas.|純粋なローズオイル1リットルを蒸留するにはおよそ4トンのバラの花びらが要る。そのため収穫の大半は、料理に使ったり食事前に客の手にかけたりする、はるかに濃度の低いローズウォーターに回される。",
    ),
  },
  {
    e: "🎶",
    n: t("Sacred and Gnawa music festivals fill June|Los festivales de música sacra y gnaua llenan junio|Les festivals de musique sacrée et gnaoua remplissent juin|聖なる音楽とグナワ音楽祭が満ちる6月",
    ),
    t: t(
      "Fez's Festival of World Sacred Music brings devotional musicians from every tradition into the old city's courtyards the same month Essaouira's Gnaoua World Music Festival packs the ramparts with the trance rhythms of iron qraqeb castanets, drawing well over a hundred thousand people to a town of barely 90,000 residents.|El Festival de Música Sagrada del Mundo de Fez lleva a músicos devocionales de todas las tradiciones a los patios de la ciudad vieja el mismo mes en que el Festival Gnaoua de Esauira llena las murallas con los ritmos de trance de las castañuelas de hierro qraqeb, atrayendo a bastante más de cien mil personas a una ciudad de apenas 90.000 habitantes.|Le Festival des musiques sacrées du monde de Fès amène des musiciens dévotionnels de toutes traditions dans les cours de la vieille ville le même mois où le Festival Gnaoua d'Essaouira remplit les remparts des rythmes de transe des castagnettes de fer qraqeb, attirant bien plus de cent mille personnes dans une ville de guère 90 000 habitants.|フェズの世界聖なる音楽祭があらゆる伝統の宗教音楽家たちを旧市街の中庭に招くのと同じ月、エッサウィラのグナワ・ワールド・ミュージック・フェスティバルは鉄のカスタネット(カラカブ)のトランス的なリズムで城壁を満たし、人口わずか9万ほどの町に10万人をゆうに超える人出をもたらす。",
    ),
    f: t(
      "Gnawa music traces back to musicians brought to Morocco from further south in Africa, and its lila all-night healing ceremonies, built around the same repeating basslines heard at the festival, are still held privately and are rarely open to outside audiences.|La música gnaua se remonta a músicos traídos a Marruecos desde zonas más al sur de África, y sus ceremonias curativas de toda la noche, las lila, construidas sobre las mismas líneas de bajo repetitivas que se oyen en el festival, se siguen celebrando en privado y rara vez se abren a público externo.|La musique gnaoua remonte à des musiciens amenés au Maroc depuis plus au sud de l'Afrique, et ses cérémonies de guérison nocturnes, les lila, bâties sur les mêmes lignes de basse répétitives qu'on entend au festival, se tiennent encore en privé et s'ouvrent rarement à un public extérieur.|グナワ音楽はアフリカのさらに南からモロッコへ連れて来られた音楽家たちに由来するとされ、祭りで耳にするのと同じ反復するベースラインを軸に組み立てられた夜通しの治療儀式「リラ」は、いまも私的に営まれ、外部の観客に開かれることはめったにない。",
    ),
  },
  {
    e: "👑",
    n: t("Throne Day|El Día del Trono|La Fête du Trône|王位記念日"),
    t: t(
      "Throne Day on July 30th marks the king's accession with flags strung across every street and a televised royal address watched in cafés nationwide, timed just as the Sahara's true heat sets in and interior towns start emptying their streets by midday.|El Día del Trono, el 30 de julio, celebra la subida al trono del rey con banderas tendidas por todas las calles y un discurso real televisado que se sigue en los cafés de todo el país, justo cuando llega el calor de verdad del Sáhara y las ciudades del interior empiezan a vaciar sus calles al mediodía.|La Fête du Trône, le 30 juillet, célèbre l'accession du roi au trône, drapeaux tendus dans chaque rue et discours royal télévisé suivi dans les cafés de tout le pays, juste au moment où la vraie chaleur du Sahara s'installe et où les villes de l'intérieur commencent à vider leurs rues dès midi.|7月30日の王位記念日は国王の即位を祝う祝日で、街のあらゆる通りに旗が張られ、国じゅうのカフェでテレビ中継される国王演説が見守られる。ちょうどサハラ本来の暑さが始まり、内陸の町が正午には通りを空にし始める時期と重なる。",
    ),
  },
  {
    e: "🏜️",
    n: t("Peak heat, and the khettaras run dry|El calor máximo, y las khettaras se secan|Le pic de chaleur, et les khettaras s'assèchent|暑さの頂点、涸れるハッタラ",
    ),
    t: t(
      "Interior towns like Ouarzazate and Errachidia see their hottest weeks now, and the ancient khettara system of gently sloped underground tunnels that has carried groundwater to oasis fields without pumps for close to a thousand years is worked hardest just as the water table it depends on drops lowest.|Los pueblos del interior como Uarzazate y Errachidia viven ahora sus semanas más calurosas, y el antiguo sistema de khettaras, túneles subterráneos de suave pendiente que llevan agua freática a los campos de oasis sin bombas desde hace casi mil años, trabaja al máximo justo cuando el nivel freático del que depende baja más.|Les villes de l'intérieur comme Ouarzazate et Errachidia connaissent maintenant leurs semaines les plus chaudes, et l'antique système des khettaras, ces tunnels souterrains en pente douce qui acheminent l'eau souterraine vers les champs des oasis sans pompe depuis près de mille ans, tourne à plein régime juste quand la nappe dont il dépend est au plus bas.|ワルザザートやエルラシディアといった内陸の町はいま最も暑い数週間を迎え、ポンプを使わずおよそ千年にわたりオアシスの畑へ地下水を運んできた、緩やかに傾斜した地下トンネル網「ハッタラ」は、頼みの地下水位が最も下がるこの時期にこそ最も酷使される。",
    ),
    months: [4],
  },
  {
    e: "💍",
    n: t("The Imilchil betrothal moussem|El moussem de esponsales de Imilchil|Le moussem des fiançailles d'Imilchil|イミルシルの婚約祭",
    ),
    t: t(
      "The Ait Haddidou people gather each September near Imilchil for a moussem tied by local tradition to a legend of two star-crossed lovers, where families set up tents to trade livestock and, historically, young people from different communities had one of their few chances all year to meet and arrange a marriage.|El pueblo ait haddidou se reúne cada septiembre cerca de Imilchil para un moussem que la tradición local vincula a la leyenda de dos amantes desdichados, donde las familias levantan tiendas para comerciar con ganado y, históricamente, los jóvenes de distintas comunidades tenían una de sus pocas ocasiones del año para conocerse y concertar un matrimonio.|Le peuple ait haddidou se rassemble chaque septembre près d'Imilchil pour un moussem que la tradition locale relie à la légende de deux amants maudits, où les familles dressent des tentes pour échanger du bétail et où, historiquement, les jeunes de communautés différentes disposaient de l'une de leurs rares occasions de l'année pour se rencontrer et arranger un mariage.|アイト・ハッディドゥの人々は毎年9月、イミルシル近郊に集まりムーセム(祭り)を開く。地元の言い伝えでは引き裂かれた二人の恋人の伝説と結びつけられており、家族はテントを張って家畜を商い、歴史的には、別々の共同体の若者たちが一年でも数少ない、出会って縁談をまとめる機会だった。",
    ),
    f: t(
      "The nickname \"marriage market\" that outside media still attach to the moussem overstates how the event actually works today; most matches now are arranged well beforehand, and the gathering functions largely as a livestock fair and a reunion of scattered clans.|El apodo de «mercado del matrimonio» que los medios externos aún dan al moussem exagera cómo funciona hoy en realidad el evento; la mayoría de los emparejamientos ya se acuerdan de antemano, y la reunión funciona sobre todo como feria de ganado y reencuentro de clanes dispersos.|Le surnom de « marché du mariage » que les médias extérieurs accolent encore au moussem exagère la façon dont l'événement fonctionne réellement aujourd'hui ; la plupart des unions sont désormais arrangées bien à l'avance, et le rassemblement sert surtout de foire au bétail et de retrouvailles pour des clans dispersés.|外部のメディアがいまも祭りに付けたがる「結婚市場」という呼び名は、現在の実態を誇張している。縁組の大半はいまでは事前に決められており、この集まりは主に家畜市と、散らばった一族の再会の場として機能している。",
    ),
  },
  {
    e: "🌴",
    n: t("The date harvest at Erfoud|La cosecha de dátiles en Erfoud|La récolte des dattes à Erfoud|エルフードのデーツ収穫"),
    t: t(
      "Palm groves along the Ziz and Tafilalt oases drop their dates this month, and Erfoud's date festival closes the harvest with produce stalls, folk dancing and a competition for the finest fruit, judged on more than a dozen named varieties that range from the soft, prized majhoul to smaller, drier ones meant for storage through winter.|Los palmerales de los oasis del Ziz y el Tafilalt sueltan sus dátiles este mes, y el festival de dátiles de Erfoud cierra la cosecha con puestos de producto, danzas folclóricas y un concurso al mejor fruto, que valora más de una decena de variedades con nombre, desde el blando y apreciado majhoul hasta otras más pequeñas y secas pensadas para guardar todo el invierno.|Les palmeraies des oasis du Ziz et du Tafilalt lâchent leurs dattes ce mois-ci, et le festival des dattes d'Erfoud clôt la récolte avec des étals de produits, des danses folkloriques et un concours du plus beau fruit, jugeant plus d'une douzaine de variétés nommées, de la majhoul tendre et prisée aux plus petites et sèches destinées à se conserver tout l'hiver.|ジズ川とタフィラルトのオアシス沿いのナツメヤシ林は今月実を落とし、エルフードのデーツ祭りが収穫を締めくくる。物産の屋台、民族舞踊、そして最上の実を競う品評会が催され、柔らかく珍重されるマジュールから、冬じゅう保存するための小ぶりで乾いた品種まで、十数種の名を持つ品種が審査される。",
    ),
  },
  {
    e: "🕊️",
    n: t("Green March and Independence Day|La Marcha Verde y el Día de la Independencia|La Marche Verte et la Fête de l'Indépendance|緑の行進と独立記念日"),
    t: t(
      "November holds two fixed national anniversaries within twelve days of each other, the Green March of November 6th and Independence Day on the 18th, both marked with flag displays and school assemblies from the Rif to the pre-Sahara, while the first real chill of autumn finally reaches the interior.|Noviembre reúne dos aniversarios nacionales fijos con doce días de diferencia, la Marcha Verde del 6 de noviembre y el Día de la Independencia el 18, ambos marcados con despliegues de banderas y actos escolares desde el Rif hasta la presáhara, mientras el primer frío real del otoño llega por fin al interior.|Novembre réunit deux anniversaires nationaux fixes à douze jours d'écart, la Marche Verte du 6 novembre et la Fête de l'Indépendance le 18, tous deux marqués par des drapeaux et des cérémonies scolaires du Rif à la présahara, tandis que le premier vrai froid de l'automne atteint enfin l'intérieur.|11月には12日の間を置いて二つの固定された国の記念日がある。11月6日の「緑の行進」と18日の独立記念日で、どちらもリーフからサハラ前線まで旗の掲揚と学校の式典で祝われ、秋本格的な冷え込みがようやく内陸にも届く。",
    ),
  },
  {
    e: "🫒",
    n: t("The olive harvest and the first pressing|La cosecha de aceitunas y la primera prensa|La récolte des olives et la première pression|オリーブの収穫と初搾り"),
    t: t(
      "Olive groves around Meknes, one of the country's biggest olive-growing regions, are picked by hand and shaken from ladders this month, and the first cold-pressed oil of the season — cloudy, sharp and prized above the clarified oil sold later — sells out at roadside stands almost as soon as it's pressed.|Los olivares de Meknes, una de las mayores regiones olivareras del país, se recolectan a mano y a varazos desde escaleras este mes, y el primer aceite prensado en frío de la temporada —turbio, punzante y más apreciado que el aceite clarificado que se vende después— se agota en los puestos de carretera casi nada más prensarse.|Les oliveraies autour de Meknès, l'une des plus grandes régions oléicoles du pays, sont cueillies à la main et gaulées depuis des échelles ce mois-ci, et la première huile de première pression à froid de la saison — trouble, mordante et plus prisée que l'huile clarifiée vendue plus tard — s'écoule dans les étals de bord de route presque aussitôt pressée.|国内屈指のオリーブ産地であるメクネス周辺のオリーブ畑では今月、手摘みと梯子からの叩き落としで収穫が行われ、その季節最初の低温圧搾油――濁って風味の強い、後で売られる清澄なオイルより珍重される品――は搾ってからほとんど間を置かずに道端の売店で売り切れる。",
    ),
  },
  {
    e: "🏔️",
    n: t("Yennayer and the first snow on the passes|Yennayer y la primera nieve en los puertos|Yennayer et les premières neiges sur les cols|ヤンナイルと峠の初雪"),
    t: t(
      "Yennayer, the Amazigh new year, falls in mid-January on a fixed date drawn from the old agrarian Julian calendar rather than the lunar Islamic one, and households mark it with a heavy couscous meal the same week the first real snow closes some High Atlas passes and opens the ski season at Oukaïmeden and Mischliffen.|Yennayer, el año nuevo amazigh, cae a mediados de enero en una fecha fija tomada del antiguo calendario agrario juliano y no del islámico lunar, y las familias lo celebran con un cuscús abundante la misma semana en que la primera nieve real cierra algunos puertos del Alto Atlas y abre la temporada de esquí en Oukaïmeden y Mischliffen.|Yennayer, le nouvel an amazigh, tombe à la mi-janvier à une date fixe tirée de l'ancien calendrier agraire julien plutôt que du calendrier islamique lunaire, et les foyers le marquent d'un copieux couscous la même semaine où les premières vraies neiges ferment certains cols du Haut Atlas et ouvrent la saison de ski à Oukaïmeden et Mischliffen.|アマジグの新年ヤンナイルは、太陰暦のイスラム暦ではなく古い農事用のユリウス暦に基づく1月中旬の固定日で、家庭では豪華なクスクスの食事で祝う。同じ週には本格的な初雪が高アトラスのいくつかの峠を閉ざし、ウカイメデンやミシュリフェンではスキーシーズンが始まる。",
    ),
    f: t(
      "Morocco officially recognized Yennayer as a paid public holiday only in 2023, and its year count runs on a separate Amazigh calendar era that sits roughly 950 years ahead of the Gregorian one.|Marruecos reconoció oficialmente Yennayer como fiesta pública remunerada solo en 2023, y su cómputo de años sigue una era del calendario amazigh independiente, que va unos 950 años por delante del gregoriano.|Le Maroc n'a officiellement reconnu Yennayer comme jour férié payé qu'en 2023, et son décompte des années suit une ère du calendrier amazigh distincte, en avance d'environ 950 ans sur le calendrier grégorien.|モロッコがヤンナイルを有給の祝日として正式に認めたのは2023年のことにすぎず、その年数はグレゴリオ暦よりおよそ950年進んだ、独自のアマジグ暦の紀元で数えられる。",
    ),
  },
  {
    e: "🌸",
    n: t("Almond blossom over Tafraoute|El almendro en flor sobre Tafraoute|La fleur d'amandier au-dessus de Tafraoute|タフラウトを覆うアーモンドの花"),
    t: t(
      "The pink granite hills around Tafraoute in the Anti-Atlas turn white and pale pink this month as the almond trees terraced into the rock bloom all at once, celebrated with a local almond festival while snow still lingers on the High Atlas passes not far to the northeast.|Las colinas de granito rosado en torno a Tafraoute, en el Antiatlas, se vuelven blancas y rosa pálido este mes, cuando florecen a la vez los almendros en terrazas talladas en la roca, celebrado con un festival local del almendro mientras la nieve aún se aferra a los puertos del Alto Atlas no muy lejos al noreste.|Les collines de granit rose autour de Tafraoute, dans l'Anti-Atlas, virent au blanc et au rose pâle ce mois-ci quand les amandiers en terrasses taillées dans la roche fleurissent tous à la fois, célébrés par une fête locale de l'amandier tandis que la neige s'attarde encore sur les cols du Haut Atlas non loin au nord-est.|反アトラスのタフラウト周辺、桃色の花崗岩の丘は今月、岩に刻まれた段々畑のアーモンドの木がいっせいに花開き、白と淡いピンクに染まる。地元のアーモンド祭りで祝われる一方、そう遠くない北東の高アトラスの峠にはまだ雪が残っている。",
    ),
  },
  {
    e: "🍊",
    n: t("Orange blossom over the Gharb|El azahar sobre el Gharb|La fleur d'oranger sur le Gharb|ガルブを覆うオレンジの花"),
    t: t(
      "The citrus groves of the Gharb plain around Fez and Meknes fill with white blossom this month, and small family distilleries collect the petals before dawn to steam them into orange-flower water, a staple splashed into pastry dough, tea and the hands of guests that most Moroccan kitchens keep close to soy sauce in a Japanese one.|Los cítricos de la llanura del Gharb, en torno a Fez y Meknes, se llenan de flor blanca este mes, y pequeñas destilerías familiares recogen los pétalos antes del alba para destilarlos al vapor en agua de azahar, un básico que se añade a la masa de pastelería, al té y a las manos de los invitados, tan presente en la cocina marroquí como la salsa de soja en una japonesa.|Les agrumeraies de la plaine du Gharb, autour de Fès et Meknès, se couvrent de fleurs blanches ce mois-ci, et de petites distilleries familiales récoltent les pétales avant l'aube pour les distiller à la vapeur en eau de fleur d'oranger, un basique versé dans la pâte à pâtisserie, le thé et les mains des invités, aussi présent dans une cuisine marocaine que la sauce soja dans une cuisine japonaise.|フェズとメクネスを囲むガルブ平野の柑橘畑は今月、白い花で埋まる。小さな家族経営の蒸留所が夜明け前に花びらを集め、蒸してオレンジフラワーウォーターにする。菓子の生地や茶、客の手にかける水にも使われる定番品で、日本の台所における醤油ほど、モロッコの台所に欠かせない。",
    ),
  },
];
