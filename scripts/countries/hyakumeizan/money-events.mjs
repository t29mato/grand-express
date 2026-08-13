/**
 * 日本百名山の青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: hokkaido / tohoku / joshinetsu / kitaalps / chuo_minami_alps /
 * fujihakone / kinkihokuriku / nishinihon(cities.mjsの地方区分と同じ)。
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける。そのうえで8地方それぞれに
 * gain1・loss1の2件ずつ、山にまつわる話として置いている。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/**
 * 出来事1件。`months` を指定すると、その月にしか起こらない
 * (0=4月。9月=5、10月=6、11月=7、12月=8、1月=9、2月=10、3月=11)。
 * 省略すれば通年。
 */
function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const HYAKUMEIZAN_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "koya-tetsudai", "gain", [], "🍳", 220,
    "A day helping out in a hut's kitchen|Un día ayudando en la cocina de un refugio|Une journée d'aide en cuisine dans un refuge|山小屋の厨房を手伝う",
    "The hut warden was short-handed for a suddenly busy weekend and paid in cash plus a real bed for the night instead of floor space. Staffed huts run on exactly this kind of last-minute help, since almost everything they serve was carried up on someone's back.|El encargado del refugio andaba corto de manos para un fin de semana repentinamente concurrido y pagó en efectivo, además de una cama de verdad en vez de sitio en el suelo. Los refugios con personal funcionan justo con este tipo de ayuda de última hora.|Le gardien du refuge manquait de bras pour un week-end soudainement chargé et a payé en espèces, avec un vrai lit au lieu d'une place au sol. Les refuges gardés fonctionnent grâce à ce genre d'aide de dernière minute.|急に混み合った週末で人手が足りず、山小屋の小屋番から現金と、床ではなく本物の寝床をもらって手伝った。有人小屋はまさにこうした急な助っ人で回っている。振る舞われるものはほとんど誰かの背に担ぎ上げられたものだからである。",
  ),
  ev(
    "bokka-baito", "gain", [], "🎒", 260,
    "A day carrying supplies up as a bokka porter|Un día subiendo suministros como porteador bokka|Une journée à monter des provisions comme porteur bokka|歩荷のアルバイトで荷を担ぎ上げる",
    "A hut needed an extra back to help haul beer, rice and propane up from the trailhead, paid by the kilogram rather than the hour. Professional bokka porters still carry loads well over sixty kilograms on some routes, but even a modest load for a day pays well for the strain.|Un refugio necesitaba una espalda más para subir cerveza, arroz y propano desde el inicio del sendero, pagado por kilogramo y no por hora. Los porteadores bokka profesionales aún cargan más de sesenta kilos en algunas rutas, pero incluso una carga modesta por un día se paga bien por el esfuerzo.|Un refuge avait besoin d'un dos de plus pour monter bière, riz et propane depuis le départ de sentier, payé au kilogramme plutôt qu'à l'heure. Les porteurs bokka professionnels transportent encore plus de soixante kilos sur certains itinéraires, mais même une charge modeste pour une journée est bien payée vu l'effort.|山小屋がビールと米とプロパンガスを登山口から担ぎ上げる人手を求めていた。給金は時間ではなく重さで決まる。プロの歩荷はルートによっては60kgを超える荷を担ぐが、一日ぶんの手頃な荷でも、その苦労に見合うだけの実入りにはなる。",
  ),
  ev(
    "koya-beer", "loss", [], "🍺", 200,
    "A hut beer costs three times the price down in town|Una cerveza en el refugio cuesta el triple que en el pueblo|Une bière au refuge coûte trois fois le prix en ville|山小屋のビールは下界の3倍",
    "Every can at a mountain hut arrived on someone's back or by helicopter, and the price on the menu board reflects that rather than anything at the till being unfair. It still stings to hand over the note after climbing all day to reach it.|Cada lata del refugio llegó a la espalda de alguien o en helicóptero, y el precio en el menú refleja eso, no que la caja sea injusta. Aun así, escuece entregar el billete después de haber subido todo el día para llegar hasta allí.|Chaque canette du refuge est arrivée sur le dos de quelqu'un ou par hélicoptère, et le prix affiché en tient compte, sans rien d'injuste au comptoir. Cela pique quand même de tendre le billet après avoir grimpé toute la journée pour l'atteindre.|山小屋の缶ビールは一本一本が誰かの背か、ヘリコプターで運ばれてきたもので、その値段はレジの不公平さではなくそのことを表している。それでも、一日じゅう登ってたどり着いた末にその紙幣を渡すのは、やはり少々こたえる。",
  ),
  ev(
    "kappa-wasure", "loss", [], "☔", 190,
    "Forgotten rain gear means an emergency poncho at trailhead prices|Olvidar el chubasquero obliga a un poncho de emergencia a precio de inicio de sendero|Un imperméable oublié impose un poncho de secours au prix du départ de sentier|雨具を忘れ、登山口価格の合羽を買う羽目に",
    "The forecast looked fine at home, and the rain jacket stayed folded in a drawer instead of a pack pocket. The shop by the bus stop sells exactly one kind of emergency poncho, at exactly one price, to exactly the kind of person who needs it most right now.|El pronóstico parecía bueno en casa, y el chubasquero se quedó doblado en un cajón en vez de en el bolsillo de la mochila. La tienda junto a la parada de autobús vende justo un tipo de poncho de emergencia, a un único precio, justo a quien más lo necesita ahora mismo.|La météo semblait bonne à la maison, et l'imperméable est resté plié dans un tiroir plutôt que dans une poche du sac. La boutique près de l'arrêt de bus ne vend qu'un seul type de poncho de secours, à un seul prix, à exactement le genre de personne qui en a le plus besoin maintenant.|家では天気予報が良さそうに見え、雨具は荷物の中ではなく引き出しにたたまれたままだった。バス停脇の売店はちょうど一種類の緊急用合羽を、ちょうど一つの値段で、今まさにそれをいちばん必要としている人に売っている。",
  ),

  // ---- hokkaido ----
  ev(
    "konbu-boshi", "gain", ["hokkaido"], "🌿", 240,
    "Helping lay out kelp to dry on the shore|Ayudando a extender algas kombu a secar en la orilla|Aider à étaler du kombu à sécher sur le rivage|昆布干しを手伝う",
    "A short-handed household needed extra arms to spread the morning's harvest across the drying racks before the wind picked up, and paid on the spot once the last strand was laid flat. Rishiri kombu commands some of the highest prices of any kelp in Japan, and every strand still gets turned by hand.|Una familia con pocas manos necesitaba brazos extra para extender la cosecha de la mañana en los tendales antes de que arreciara el viento, y pagó al momento en cuanto la última tira quedó plana. El kombu de Rishiri alcanza algunos de los precios más altos de Japón.|Une famille en sous-effectif avait besoin de bras en plus pour étaler la récolte du matin sur les claies avant que le vent ne forcisse, et a payé sur-le-champ dès la dernière algue étalée. Le kombu de Rishiri atteint parmi les prix les plus élevés du Japon.|人手の足りない家が、風が強まる前に朝の水揚げを干し台に広げる手を求めていて、最後の一本を平らに敷き終えるとその場で払ってくれた。利尻昆布は日本でも屈指の高値で取引される昆布で、今も一本一本が手でひっくり返される。",
    [4, 5, 6],
  ),
  ev(
    "ferry-kekkou", "loss", ["hokkaido"], "⛴️", 210,
    "The island ferry is cancelled for weather|El ferry a la isla se cancela por el clima|Le ferry vers l'île est annulé pour cause de météo|強風でフェリーが欠航する",
    "The strait between the island and the mainland is open enough that a strong wind alone can cancel every sailing for the day, and the only option left is another night's lodging while the forecast is checked again in the morning. Nobody at the terminal argues with the captain's decision.|El estrecho entre la isla y tierra firme está tan expuesto que un viento fuerte por sí solo puede cancelar todas las travesías del día, y la única opción que queda es otra noche de alojamiento mientras se revisa el pronóstico por la mañana. Nadie en la terminal discute la decisión del capitán.|Le détroit entre l'île et le continent est assez exposé pour qu'un simple vent fort annule toutes les traversées de la journée, et la seule option restante est une nuit d'hébergement de plus en attendant de revérifier la météo le matin. Personne au terminal ne conteste la décision du capitaine.|島と本土のあいだの海峡は開けているため、強風だけでその日の全便が欠航になることがある。残された道は、翌朝また天気を確かめるまでもう一泊するしかない。ターミナルで船長の判断に逆らう者はいない。",
  ),

  // ---- tohoku ----
  ev(
    "ringo-shukaku", "gain", ["tohoku"], "🍎", 230,
    "A day helping bring in the apple harvest|Un día ayudando a recoger la cosecha de manzanas|Une journée à aider à rentrer la récolte de pommes|りんご畑の収穫を手伝う",
    "An orchard near the trailhead needed extra hands before an early frost, and a day spent twisting apples free of the branch paid in cash and a crate to take along. The region grows a large share of the country's apples, and harvest labour is always short at exactly this time of year.|Un huerto cerca del inicio del sendero necesitaba manos extra antes de una helada temprana, y un día girando manzanas para soltarlas de la rama pagó en efectivo y una caja para llevar. La región cultiva buena parte de las manzanas del país.|Un verger près du départ de sentier avait besoin de bras avant une gelée précoce, et une journée à détacher des pommes de la branche a payé en espèces plus une caisse à emporter. La région cultive une grande part des pommes du pays.|登山口近くの果樹園が早い霜の前に人手を求めていて、枝からりんごをひねって外す一日仕事は現金と持ち帰り用の一箱で報われた。この地方は国内のりんごの大きな割合を生産しており、この時期はいつも収穫の人手が足りない。",
    [6, 7],
  ),
  ev(
    "juhyo-jutai", "loss", ["tohoku"], "🚌", 230,
    "A snow-monster viewing tour bus jam adds a night|Un atasco del autobús turístico de los monstruos de nieve añade una noche|Un embouteillage de bus touristique des monstres de neige ajoute une nuit|樹氷見物のバス渋滞で延泊になる",
    "The ropeway line and the road below it back up for kilometres on a clear winter weekend, and by the time the bus finally reaches the base station the last connecting service down the mountain has already left. The frost-covered trees are worth the wait, most people agree, just not the wait they had in mind.|La cola del teleférico y la carretera de abajo se atascan varios kilómetros en un fin de semana de invierno despejado, y para cuando el autobús llega por fin a la estación base, el último servicio de conexión ya se ha ido. Los árboles escarchados valen la espera, coinciden la mayoría, aunque no esta espera.|La file du téléphérique et la route en contrebas s'étirent sur des kilomètres un week-end d'hiver dégagé, et le temps que le bus atteigne enfin la gare de base, la dernière correspondance vers le bas est déjà partie. Les arbres givrés valent l'attente, la plupart en conviennent, mais pas celle-ci.|晴れた冬の週末、ロープウェイの列とその下の道路は数キロにわたって渋滞し、バスがようやく山麓駅に着くころには最終の連絡便はもう出たあとだった。霜に覆われた木々は待つ価値があると誰もが言うが、思っていたのとは違う待ち時間だった。",
    [8, 9, 10],
  ),

  // ---- joshinetsu ----
  ev(
    "ski-kisetsu-koyou", "gain", ["joshinetsu"], "🎿", 250,
    "Seasonal work on a ski resort lift crew|Trabajo de temporada en el equipo de telesillas de una estación de esquí|Travail saisonnier dans l'équipe des télésièges d'une station de ski|スキー場のリフト係の季節雇い",
    "The resort hires by the season for lift operators and slope groomers, and a few cold weeks spent flagging skiers through pay better by the hour than most indoor work nearby. Several of Japan's oldest ski areas cluster in this region, developed not long after the sport itself arrived from Europe.|El complejo contrata por temporada a operadores de telesilla y máquinas pisapistas, y unas semanas frías indicando a los esquiadores pagan mejor por hora que la mayoría del trabajo bajo techo cercano. Varias de las estaciones de esquí más antiguas de Japón se agrupan en esta región.|La station embauche à la saison des opérateurs de télésiège et des dameurs de pistes, et quelques semaines froides à orienter les skieurs paient mieux à l'heure que la plupart des emplois intérieurs voisins. Plusieurs des plus anciennes stations de ski du Japon se regroupent dans cette région.|リゾートはリフト係やゲレンデ整備の人手を季節雇いで募集しており、寒さの中でスキーヤーを誘導する数週間は、近くの屋内の仕事より時給が良いことが多い。日本でも指折りの古いスキー場がこの地方に集まっており、この競技がヨーロッパから伝わってほどなく開発された。",
    [8, 9, 10],
  ),
  ev(
    "oze-boukyoukyo-otoshi", "loss", ["joshinetsu"], "🔭", 200,
    "A dropped pair of binoculars is lost to the marsh for good|Unos prismáticos caídos se pierden en el pantano para siempre|Des jumelles tombées sont perdues à jamais dans le marais|尾瀬の木道で双眼鏡を落とし、拾いに行けない",
    "Leaning over the boardwalk rail for a better look at a bird sent the binoculars straight into the bog, and stepping off the planks to fetch them is exactly what the boardwalk exists to prevent. They stay where they landed, and a replacement gets ordered from the trailhead lodge instead.|Al asomarse sobre la barandilla del paso de tablones para ver mejor un ave, los prismáticos cayeron directo a la turbera, y bajarse de las tablas a recogerlos es justo lo que el paso de tablones existe para evitar. Se quedan donde cayeron, y se pide un recambio en el albergue del inicio del sendero.|En se penchant par-dessus la rambarde de la passerelle pour mieux voir un oiseau, les jumelles sont tombées droit dans la tourbière, et descendre des planches pour les récupérer est exactement ce que la passerelle existe pour empêcher. Elles restent où elles sont tombées.|鳥をよく見ようと木道の柵から身を乗り出したはずみで、双眼鏡はそのまま湿原に落ちてしまった。板から降りて拾いに行くこと自体が、この木道が防ごうとしていることそのものである。双眼鏡は落ちた場所に残り、代わりは登山口の宿で注文することになった。",
  ),

  // ---- kitaalps ----
  ev(
    "tenmakuhari-daikou", "gain", ["kitaalps"], "⛺", 240,
    "Helping a slower party pitch tents at the cirque|Ayudando a un grupo más lento a montar tiendas en el circo|Aider un groupe plus lent à monter les tentes au cirque|涸沢でテント設営を手伝う",
    "A group that arrived exhausted just before dark offered cash for a hand pitching their tents on the crowded cirque floor, and the extra pair of hands had the guy-lines staked before the last light went. Come autumn the same bowl fills with color as thickly as it fills with tents.|Un grupo que llegó agotado justo antes del anochecer ofreció dinero por una mano montando sus tiendas en el abarrotado suelo del circo, y el par de manos extra clavó los vientos antes de que se fuera la última luz. En otoño, el mismo circo se llena de color tan densamente como de tiendas.|Un groupe arrivé épuisé juste avant la nuit a proposé de l'argent pour un coup de main à monter les tentes sur le sol bondé du cirque, et la paire de mains en plus a planté les haubans avant la dernière lueur. À l'automne, le même cirque se remplit de couleurs aussi densément que de tentes.|暗くなる直前に疲れ果てて着いた一行が、混み合うカールの底でのテント設営を手伝ってほしいと現金を差し出した。最後の光が消える前に張り綱を打ち終えた。秋にはこの同じお椀が、テントと同じくらい色づきで埋め尽くされる。",
    [7, 8],
  ),
  ev(
    "koya-mankan-eiho", "loss", ["kitaalps"], "🏕️", 220,
    "A missed hut booking means buying camping gear on the spot|Una reserva de refugio perdida obliga a comprar equipo de acampada al momento|Une réservation de refuge manquée oblige à acheter du matériel de camping sur-le-champ|山小屋の予約を逃し幕営装備を買い足す",
    "The reservation call went through a day too late, and the hut's floor space was already spoken for by the time the trailhead was reached. The gear shop by the bus stop sells just enough of a tent and a stove to get through one unplanned night on the campsite out back.|La llamada de reserva llegó un día tarde, y el espacio del refugio ya estaba comprometido para cuando se alcanzó el inicio del sendero. La tienda de material junto a la parada de autobús vende justo lo necesario de tienda y hornillo para pasar una noche no planeada en el camping de atrás.|L'appel de réservation est arrivé un jour trop tard, et la place au sol du refuge était déjà prise le temps d'atteindre le départ de sentier. La boutique de matériel près de l'arrêt de bus vend juste assez de tente et de réchaud pour passer une nuit imprévue sur le terrain de camping à l'arrière.|予約の電話が一日遅れ、登山口に着いたころには山小屋の床の場所はもう埋まっていた。バス停脇の登山用品店は、裏手のキャンプ指定地で予定外の一晩をしのぐのにちょうど足りるだけのテントとコンロを売っている。",
  ),

  // ---- chuo_minami_alps ----
  ev(
    "kisoji-gaido", "gain", ["chuo_minami_alps"], "🏮", 220,
    "A day guiding visitors along the old post road|Un día guiando a visitantes por el antiguo camino de postas|Une journée à guider des visiteurs sur l'ancienne route de poste|木曽路の旧街道で観光ガイドを頼まれる",
    "A tour group needed someone who knew which stone-paved stretches of the old Nakasendo were worth the detour, and a few hours of walking and talking paid better than expected. The lacquered post towns along this route have drawn travelers on foot for over four hundred years.|Un grupo turístico necesitaba a alguien que supiera qué tramos empedrados del antiguo Nakasendo merecían el desvío, y unas horas de caminar y hablar pagaron mejor de lo esperado. Los pueblos de posta lacados de esta ruta atraen a viajeros a pie desde hace más de cuatrocientos años.|Un groupe de visiteurs avait besoin de quelqu'un qui sache quels tronçons pavés de l'ancien Nakasendo méritaient le détour, et quelques heures à marcher et discuter ont payé mieux que prévu. Les bourgs-relais laqués de cette route attirent des voyageurs à pied depuis plus de quatre cents ans.|旧中山道の石畳のどの区間が寄り道の価値があるか知る者を観光団が求めていて、数時間歩いて話すだけで思った以上の実入りになった。この街道沿いの漆塗りの宿場町は、四百年以上にわたり徒歩の旅人を惹きつけてきた。",
  ),
  ev(
    "ropeway-shuuden-nogashi", "loss", ["chuo_minami_alps"], "🚕", 210,
    "Missing the last ropeway down means a long taxi ride|Perder el último teleférico de bajada obliga a un largo trayecto en taxi|Rater le dernier téléphérique de descente impose un long trajet en taxi|ロープウェイの最終便を逃しタクシーで下山",
    "The view from the cirque was worth one more photograph, and then one more after that, until the last car of the day had already left without anyone in it. The mountain taxi that finally answers the phone charges by a meter that does not care how nice the sunset was.|La vista desde el circo merecía una foto más, y luego otra más, hasta que el último coche del día ya se había ido sin nadie dentro. El taxi de montaña que por fin contesta al teléfono cobra según un taxímetro al que no le importa lo bonita que fuera la puesta de sol.|La vue depuis le cirque méritait une photo de plus, puis encore une, jusqu'à ce que la dernière cabine du jour soit déjà repartie sans personne dedans. Le taxi de montagne qui finit par répondre au téléphone facture selon un compteur qui se moque de la beauté du coucher de soleil.|カールからの眺めはもう一枚、そしてまたもう一枚の写真に値するように思え、気づけばその日最後の便は誰も乗せずに出たあとだった。ようやく電話に出た山のタクシーのメーターは、夕焼けがどれほど美しかったかなど気にしてくれない。",
  ),

  // ---- fujihakone ----
  ev(
    "goraikou-shashin", "gain", ["kanto"], "📷", 240,
    "Helping sell sunrise photographs at the summit|Ayudando a vender fotos del amanecer en la cima|Aider à vendre des photos du lever du soleil au sommet|山頂で御来光の写真販売を手伝う",
    "Summit vendors set up a tripod and a printer to sell photographs of climbers watching the sunrise, and a spare pair of hands lining people up for the shot earned a cut of the morning's sales. Goraiko, the sacred sunrise, has been treated as a reason in itself to climb through the night since long before cameras existed.|Los vendedores de la cima montan un trípode y una impresora para vender fotos de los alpinistas viendo el amanecer, y un par de manos extra ordenando a la gente para la toma se llevó una parte de las ventas de la mañana. El goraiko, el amanecer sagrado, se ha tratado como motivo en sí para subir de noche desde mucho antes de que existieran las cámaras.|Les vendeurs du sommet installent un trépied et une imprimante pour vendre des photos des alpinistes regardant le lever du soleil, et une paire de mains en plus pour aligner les gens pour la photo a rapporté une part des ventes du matin. Le goraiko, le lever de soleil sacré, est traité comme une raison en soi de grimper de nuit depuis bien avant l'existence des appareils photo.|山頂の売店は三脚とプリンターを構え、御来光を見る登山者たちの写真を売る。並ばせる係の手が足りず手伝うと、その朝の売上の分け前をもらえた。御来光、この聖なる日の出は、カメラが存在するよりずっと前から、夜通し登るそれ自体の理由として扱われてきた。",
    [3, 4],
  ),
  ev(
    "gogoume-omiyage", "loss", ["kanto"], "🛍️", 220,
    "Fifth-station souvenirs come at tourist-trap prices|Los recuerdos de la quinta estación tienen precio de trampa turística|Les souvenirs du cinquième poste ont des prix de piège à touristes|五合目の土産物は観光地価格",
    "The wooden walking-stick and its row of branding stamps looked like the obvious souvenir of the climb, and only at the register does the fifth station's captive market become obvious: the nearest competing shop is a bus ride and a thousand vertical metres away.|El bastón de madera con su hilera de sellos de quemado parecía el recuerdo obvio de la ascensión, y solo en la caja se hace evidente el mercado cautivo de la quinta estación: la tienda competidora más cercana está a un trayecto en autobús y mil metros de desnivel.|Le bâton de marche en bois et sa rangée de tampons au fer semblait le souvenir évident de l'ascension, et ce n'est qu'à la caisse que le marché captif de la cinquième station devient évident : la boutique concurrente la plus proche est à un trajet de bus et mille mètres de dénivelé.|木の金剛杖とそこに押していく焼印の列は、いかにも登山の記念品らしく見えたが、レジに立ってはじめて五合目という「逃げ場のない客」相手の商売に気づく。次に近い店はバスに乗って標高差1000mも下った先である。",
  ),

  // ---- kinkihokuriku ----
  ev(
    "hakusan-kasetsu-gaido", "gain", ["kinkihokuriku"], "🌼", 230,
    "Assisting a ranger's alpine flower survey|Ayudando en un censo de flora alpina de un guarda|Aider un garde dans un recensement de flore alpine|白山の高山植物調査を手伝う",
    "A park ranger needed a second set of eyes to count flowering stems along a fixed survey line, and the work paid a modest day rate on top of a lesson in telling similar-looking alpine species apart. The mountain's own namesake pink primrose blooms for barely a few weeks each year.|Un guarda del parque necesitaba un segundo par de ojos para contar tallos en flor a lo largo de una línea de censo fija, y el trabajo pagó una modesta tarifa diaria además de una lección para distinguir especies alpinas parecidas. La prímula rosa que da nombre a la montaña florece apenas unas semanas al año.|Un garde du parc avait besoin d'une seconde paire d'yeux pour compter les tiges en fleurs le long d'une ligne de relevé fixe, et le travail a payé un modeste tarif journalier en plus d'une leçon pour distinguer des espèces alpines similaires. La primevère rose éponyme de la montagne ne fleurit que quelques semaines par an.|山を守る係員が、決められた調査線に沿って花の付いた茎を数えるもう一対の目を求めていた。仕事は控えめな日当に加え、よく似た高山植物の見分け方の手ほどきになった。山の名を冠したハクサンコザクラは一年のうちわずか数週間しか咲かない。",
    [3, 4],
  ),
  ev(
    "dorogawa-omiyage-kaisugi", "loss", ["kinkihokuriku"], "🛍️", 190,
    "Too many souvenirs bought at the trailhead onsen village|Demasiados recuerdos comprados en el pueblo termal del inicio del sendero|Trop de souvenirs achetés au village thermal du départ de sentier|洞川温泉で土産を買いすぎる",
    "The trailhead village's shops sell dried mountain herbs, hand-carved amulets and the local konnyaku jelly candy, and it is easy to walk out with a bag heavier than anything carried up the mountain itself. The receipt only becomes a regret once the wallet is checked back at the inn.|Las tiendas del pueblo del inicio del sendero venden hierbas de montaña secas, amuletos tallados a mano y el dulce de gelatina konnyaku local, y es fácil salir con una bolsa más pesada que nada de lo llevado a la propia montaña. El recibo solo se convierte en pesar al revisar la billetera de vuelta en la posada.|Les boutiques du village de départ vendent des herbes de montagne séchées, des amulettes sculptées à la main et la friandise locale en gelée de konjac, et il est facile d'en repartir avec un sac plus lourd que tout ce qui fut porté sur la montagne elle-même. Le reçu ne devient un regret qu'au moment de vérifier son porte-monnaie de retour à l'auberge.|登山口の門前町の店は乾燥させた山の薬草や手彫りのお守り、名物のこんにゃく飴を売っており、山そのものに担ぎ上げたものより重い袋を提げて出てくるのは容易い。その領収書が後悔に変わるのは、宿に戻って財布を確かめたときである。",
  ),

  // ---- nishinihon ----
  ev(
    "noyaki-borantia", "gain", ["nishinihon"], "🔥", 220,
    "A thank-you payment for controlled-burn volunteer work|Un pago de agradecimiento por el voluntariado de quema controlada|Une gratification pour le bénévolat de brûlis contrôlé|野焼きボランティアの謝礼",
    "The caldera grassland needs a burn every year to keep forest from swallowing the pasture, and the volunteer fire lines always need more hands cutting breaks than the local ranchers alone can provide. A modest thank-you payment and a hot lunch come with the smoke-smelling work clothes.|El pastizal de la caldera necesita una quema cada año para impedir que el bosque engulla el pasto, y las líneas de bomberos voluntarios siempre necesitan más manos abriendo cortafuegos de las que pueden dar solo los ganaderos locales. Un modesto pago de agradecimiento y un almuerzo caliente vienen con la ropa que huele a humo.|La prairie de la caldeira a besoin d'un brûlis chaque année pour empêcher la forêt d'engloutir le pâturage, et les lignes de pompiers bénévoles ont toujours besoin de plus de bras pour couper les pare-feu que les seuls éleveurs locaux ne peuvent fournir. Une modeste gratification et un déjeuner chaud accompagnent les vêtements qui sentent la fumée.|カルデラの草原は、森に呑み込まれないよう毎年野焼きが必要で、防火帯を切る消防団のボランティアは地元の畜産農家だけではいつも人手が足りない。煙の匂いの染みついた作業着と一緒に、控えめな謝礼と温かい昼食がついてくる。",
    [10, 11],
  ),
  ev(
    "ferry-kekkou-yakushima", "loss", ["nishinihon"], "⛴️", 210,
    "Rough seas cancel the ferry to the island and add a night's stay|El mar agitado cancela el ferry a la isla y añade una noche de estancia|Une mer agitée annule le ferry vers l'île et ajoute une nuit d'hôtel|時化でフェリーが欠航し延泊になる",
    "The strait to the island is open water with no shelter, and a stiff wind is enough to keep every hydrofoil in port for the day regardless of how clear the sky looks. The guesthouse on the mainland side has seen this exact booking pattern often enough to keep a room ready for it.|El estrecho hacia la isla es mar abierto sin abrigo, y un viento fuerte basta para mantener en puerto todos los hidroalas del día, por muy despejado que parezca el cielo. La pensión del lado continental ha visto este mismo patrón de reservas tantas veces que siempre guarda una habitación lista.|Le détroit vers l'île est une mer ouverte sans abri, et un vent soutenu suffit à garder tous les hydroptères au port pour la journée, quel que soit le ciel dégagé. La pension côté continent a vu ce schéma de réservation assez souvent pour toujours garder une chambre prête.|島への海峡は遮るもののない外海で、空がどれほど晴れていても強い風だけで水中翼船は一日じゅう港に留め置かれる。本土側の民宿はこの予約の流れを何度も見てきたので、いつもそのための部屋を一つ空けている。",
  ),
];
