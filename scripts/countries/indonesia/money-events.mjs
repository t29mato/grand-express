/**
 * インドネシアの青マス・赤マスで起きる出来事(22件。増13・減9)。
 *
 * 地方コード: sum=スマトラ / jav=ジャワ / nut=小スンダ列島(バリ含む) /
 * kal=カリマンタン / sul=スラウェシ / mlp=マルク・パプア
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、どの地方・
 * どの月でも必ず1件は引ける(他の盤面と同じ約束)。そのうえで、6地方すべてに
 * 各3件(増2・減1)を、土地に結びついた話で置いている。**地方ごとの
 * `gains`/`losses` は、その地方の出来事だけで増・減の両方が引けることを
 * 個別に確認済み**(全国共通の4件に頼らなくても成り立つ)。
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

export const INDONESIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "sinetron-figuran", "gain", [], "🎬", 220,
    "A day as a sinetron extra|Un día como extra de sinetron|Une journée de figurant de sinetron|テレビドラマ(シネトロン)のエキストラで一日働く",
    "A production crew shooting a sinetron soap opera episode in the neighborhood needed bodies to fill a market crowd scene, and standing around holding a prop shopping bag for six hours paid better than it looked. Indonesian television churns out thousands of sinetron episodes a year, and small production houses keep informal lists of locals willing to be called on a day's notice.|Un equipo de producción rodando un episodio de sinetron en el barrio necesitaba gente para llenar una escena de mercado, y pasarse seis horas de pie con una bolsa de la compra de atrezo pagó mejor de lo que parecía. La televisión indonesia produce miles de episodios de sinetron al año.|Une équipe tournant un épisode de sinetron dans le quartier avait besoin de figurants pour une scène de marché, et rester debout six heures avec un sac de courses accessoire a payé mieux qu'il n'y paraissait. La télévision indonésienne produit des milliers d'épisodes de sinetron par an.|近所でホームドラマ(シネトロン)の撮影をしていた制作チームが市場の群衆シーンの人手を求めていた。小道具の買い物袋を持って6時間突っ立っているだけの仕事だったが、見た目より実入りは良かった。インドネシアのテレビは年に何千話ものシネトロンを量産しており、小さな制作会社は急な呼び出しに応じる地元の人の名簿を非公式に持っていることが多い。",
  ),
  ev(
    "jaga-warung", "gain", [], "🍜", 200,
    "Covering a shift at a friend's warung|Cubriendo un turno en el warung de un amigo|Assurer un service dans le warung d'un ami|友人のワルン(屋台食堂)の店番を代わる",
    "The regular cook had a family emergency and the lunch crowd was already lining up, so a few hours spent frying and serving whatever was on the menu that day was paid in cash at closing. Warung food stalls run on trust between neighbors more than any formal staffing plan, and a familiar face behind the wok is usually enough.|La cocinera habitual tuvo una emergencia familiar y ya había cola para el almuerzo, así que unas horas friendo y sirviendo lo que hubiera en el menú ese día se pagaron en efectivo al cerrar. Los puestos warung funcionan más por la confianza entre vecinos que por ningún plan formal de personal.|La cuisinière habituelle a eu un empêchement familial et la file du déjeuner s'allongeait déjà, alors quelques heures à frire et servir ce qu'il y avait au menu ce jour-là ont été payées en liquide à la fermeture. Les warung fonctionnent plus sur la confiance entre voisins que sur un vrai plan d'effectifs.|いつもの料理人が急な家族の用事で来られず、昼どきの行列はすでにできていた。その日の献立を揚げて出すだけの数時間の仕事だったが、閉店時に現金で支払われた。ワルン(屋台食堂)は正式な人員計画というより近所同士の信頼で回っており、顔なじみが鍋の前に立てばそれで十分なことが多い。",
  ),
  ev(
    "parkir-liar-derek", "loss", [], "🚗", 180,
    "The motorbike gets towed from an illegal spot|La moto se la lleva la grúa de un sitio prohibido|La moto est enlevée d'un emplacement interdit|禁止区域に停めたバイクがレッカー移動される",
    "The curb looked like every other stretch of informal parking nearby, right up until a municipal tow truck hauled the bike away while its owner was inside paying a bill, and getting it back meant a taxi ride to the impound lot plus the fine itself. Enforcement sweeps in busy districts appear with little warning, and locals mostly rely on word of mouth to know which blocks to avoid that week.|El bordillo parecía como cualquier otro tramo de aparcamiento informal cercano, hasta que una grúa municipal se llevó la moto mientras su dueño pagaba una factura dentro, y recuperarla supuso un taxi hasta el depósito más la propia multa.|Le trottoir ressemblait à n'importe quel autre coin de stationnement informel du quartier, jusqu'à ce qu'une dépanneuse municipale embarque la moto pendant que son propriétaire réglait une facture à l'intérieur, et la récupérer a coûté un taxi jusqu'à la fourrière plus l'amende elle-même.|その路肩は近所のよくある非公式な駐車帯にしか見えなかったが、持ち主が中で支払いをしているあいだに市のレッカー車がバイクを運び去っていた。取り戻すには保管場までのタクシー代に加え罰金そのものもかかった。混雑した地区の取り締まりはほとんど前触れなく行われ、地元の人も口コミでその週どの区画を避けるべきか知るしかない。",
  ),
  ev(
    "taruhan-bola-kalah", "loss", [], "⚽", 160,
    "A losing streak betting on football with friends|Una racha perdedora apostando al fútbol con amigos|Une série de paris perdus au football entre amis|友人と賭けたサッカーで負け続ける",
    "The group chat had been confident all week about which team would win, and the small pooled bets kept doubling down after each wrong guess until the total owed was well past what anyone meant to risk. Informal football pools like this run in office group chats and coffee stalls alike every time a big match airs, usually for stakes too small to call real gambling — usually.|El chat del grupo llevaba toda la semana seguro de qué equipo ganaría, y las pequeñas apuestas conjuntas se duplicaban tras cada fallo hasta que lo debido superó con mucho lo que nadie pretendía arriesgar. Estas quinielas informales de fútbol corren tanto en chats de oficina como en puestos de café.|Le groupe de discussion était sûr toute la semaine de l'équipe gagnante, et les petites mises communes doublaient après chaque mauvais pronostic jusqu'à ce que la somme due dépasse largement ce que quiconque comptait risquer. Ces paris de football informels circulent aussi bien dans les discussions de bureau que dans les échoppes à café.|グループチャットは一週間ずっとどちらのチームが勝つか自信満々だったが、小さな共同の賭け金は予想が外れるたび倍々に膨らみ、最終的な負け分は誰も本気で賭けるつもりのなかった額をはるかに超えていた。こうした非公式なサッカー賭けは、大きな試合が中継されるたびオフィスのグループチャットでもコーヒー屋台でも行われるが、たいていは本物の賭博と呼ぶには小さすぎる額で――たいていは。",
  ),

  // ---- sum スマトラ ----
  ev(
    "angkut-karung-kopi", "gain", ["sum"], "☕", 260,
    "Helping load sacks of coffee onto the truck|Ayudando a cargar sacos de café al camión|Aider à charger des sacs de café sur le camion|コーヒー豆の麻袋をトラックに積むのを手伝う",
    "A highland cooperative near the harvest deadline was short-handed getting the season's sacks down to the collection point before the buyer's truck left, and a morning of carrying paid by the sack added up fast. Sumatra's mountain coffee, grown at altitude in volcanic soil, is prized enough abroad that cooperatives guard their best growing plots closely.|Una cooperativa de las tierras altas, cerca del plazo de la cosecha, andaba corta de manos para bajar los sacos de la temporada hasta el punto de acopio antes de que se fuera el camión del comprador, y una mañana cargando pagada por saco se sumó rápido. El café de montaña de Sumatra, cultivado en altura sobre suelo volcánico, se aprecia tanto fuera que las cooperativas guardan celosamente sus mejores parcelas.|Une coopérative des hautes terres, proche de la date limite de récolte, manquait de bras pour descendre les sacs de la saison jusqu'au point de collecte avant le départ du camion de l'acheteur, et une matinée à porter, payée au sac, s'est vite accumulée. Le café de montagne de Sumatra, cultivé en altitude sur sol volcanique, est assez prisé à l'étranger pour que les coopératives gardent jalousement leurs meilleures parcelles.|収穫期の締め切り間際、高地の協同組合は買い付け業者のトラックが出発する前にその季節の麻袋を集荷場まで下ろす人手が足りなかった。麻袋一つごとに支払われる午前中の力仕事で、実入りは早く積み上がった。火山灰土壌の高地で育つスマトラの山地コーヒーは海外で珍重されており、協同組合は最良の栽培地を固く守っている。",
    [1, 2],
  ),
  ev(
    "pemandu-danau-toba", "gain", ["sum"], "🚣", 240,
    "Guiding a lost group of visitors around the lake|Guiando a un grupo de visitantes perdido junto al lago|Guider un groupe de visiteurs perdus autour du lac|湖畔で迷った観光客の一団を案内する",
    "A group of visitors had missed the last scheduled ferry back from Samosir and could not agree on a plan, so a couple of hours spent explaining the boat schedules and negotiating a private crossing earned an unplanned tip. Locals who grew up around the lake tend to know every informal boatman by name, a resource no guidebook lists.|Un grupo de visitantes había perdido el último ferri programado de vuelta desde Samosir y no lograba ponerse de acuerdo, así que un par de horas explicando los horarios de barco y negociando una travesía privada ganaron una propina inesperada. Los lugareños que crecieron junto al lago suelen conocer por su nombre a todos los barqueros informales.|Un groupe de visiteurs avait raté le dernier ferry prévu au retour de Samosir et ne parvenait pas à se mettre d'accord, alors quelques heures à expliquer les horaires de bateaux et à négocier une traversée privée ont valu un pourboire imprévu. Les habitants ayant grandi autour du lac connaissent souvent par leur nom tous les bateliers informels.|観光客の一団がサモシール島からの最終フェリーに乗り遅れ、どうするか話がまとまらずにいた。船の時刻表を説明し個人契約の渡し船を交渉する数時間の手助けは、予定外のチップを稼いだ。湖のほとりで育った地元の人は、どのガイドブックにも載っていない非公式な船頭の顔と名前をたいてい覚えている。",
  ),
  ev(
    "mabuk-laut-feri", "loss", ["sum"], "🤢", 180,
    "Seasickness on a rough Sunda Strait crossing|Mareo en un cruce agitado del estrecho de la Sonda|Mal de mer lors d'une traversée agitée du détroit de la Sonde|荒れたスンダ海峡の航海で船酔いする",
    "The ferry from Bakauheni pitched harder than usual through a squall halfway across, and the seasickness pills bought hastily from the onboard kiosk cost several times what they would on land, on top of the ruined sandwich nobody finished. Rough crossings are common enough in the strait's currents that regular commuters keep their own remedies rather than trust the boat's supply.|El ferri desde Bakauheni cabeceó más de lo habitual en un chubasco a mitad de camino, y las pastillas para el mareo compradas a toda prisa en el quiosco de a bordo costaron varias veces más que en tierra.|Le ferry venant de Bakauheni a tangué plus que d'habitude au milieu d'un grain, et les pilules contre le mal de mer achetées à la hâte au kiosque de bord ont coûté plusieurs fois leur prix à terre.|バカウヘニ発のフェリーはちょうど半ばでスコールに遭い、いつもより激しく揺れた。船内の売店で慌てて買った酔い止め薬は陸で買うより何倍もの値段がつき、誰も食べきれなかったサンドイッチも無駄になった。この海峡の潮流では荒れた航海がめずらしくないため、通いなれた乗客は船の備えを頼らず自分の酔い止めを持ち歩く。",
  ),

  // ---- jav ジャワ ----
  ev(
    "les-privat-un", "gain", ["jav"], "📚", 240,
    "Tutoring a neighbor's kid for exams|Dando clases particulares al hijo de un vecino para los exámenes|Donner des cours particuliers à l'enfant d'un voisin pour les examens|近所の子どもに試験対策の家庭教師をする",
    "A neighbor's teenager was panicking over an upcoming school exam, and a few evenings spent working through practice problems at the kitchen table earned a fee negotiated informally over tea. Private tutoring, les privat, is a huge informal economy in Java's cities, run mostly through word of mouth between families rather than any agency.|El adolescente de un vecino estaba nervioso por un examen escolar próximo, y unas tardes resolviendo problemas de práctica en la mesa de la cocina ganaron una tarifa negociada de forma informal tomando té. Las clases particulares, les privat, mueven una enorme economía informal en las ciudades de Java.|L'adolescent d'un voisin paniquait à l'approche d'un examen scolaire, et quelques soirées à faire des exercices à la table de la cuisine ont rapporté un tarif négocié de façon informelle autour d'un thé. Les cours particuliers, les privat, forment une immense économie informelle dans les villes javanaises.|近所の十代の子が近づく学校の試験に慌てていた。台所のテーブルで練習問題に取り組む何晩かは、お茶を飲みながら非公式に決めた謝礼をもたらした。家庭教師「レス・プリバット」はジャワの都市で巨大な非公式経済を成しており、業者を通さず家族同士の口コミでほとんどが決まる。",
    [2, 6],
  ),
  ev(
    "kru-lepas-syuting", "gain", ["jav"], "🎥", 260,
    "A day crewing a small film shoot|Un día de rodaje en un pequeño equipo de cine|Une journée d'équipe sur un petit tournage|小さな映画撮影の現場を手伝う",
    "A location scout short on hands for a low-budget shoot in an old colonial building paid decently for anyone who could carry lighting gear and keep curious bystanders out of frame. Indonesia's film industry has grown fast in the last decade, and small independent productions rely heavily on local day labor rather than a permanent crew.|Un buscador de localizaciones, escaso de manos para un rodaje de bajo presupuesto en un antiguo edificio colonial, pagó bien a quien pudiera cargar equipo de iluminación y mantener alejados a los curiosos del encuadre. La industria cinematográfica indonesia ha crecido rápido en la última década.|Un repéreur de lieux, à court de bras pour un tournage à petit budget dans un vieux bâtiment colonial, a bien payé quiconque pouvait porter le matériel d'éclairage et écarter les curieux du cadre. L'industrie cinématographique indonésienne a connu une croissance rapide ces dix dernières années.|古い植民地時代の建物での低予算撮影で人手が足りなかったロケハン担当は、照明機材を運び、好奇心旺盛な野次馬をカメラの外へ追いやれる人を手厚く雇った。インドネシアの映画産業はこの十年で急成長しており、小規模な独立系制作は常勤スタッフより地元の日雇いに大きく頼っている。",
  ),
  ev(
    "ganjil-genap-tilang", "loss", ["jav"], "🚦", 220,
    "Caught by Jakarta's odd-even plate rule|Pillado por la norma de matrículas pares e impares de Yakarta|Pris par la règle des plaques paires-impaires de Jakarta|ジャカルタの奇数偶数ナンバー規制に引っかかる",
    "The car's plate ended in the wrong digit for the day, a rule meant to thin out traffic on the capital's worst corridors, and the camera at the checkpoint caught the crossing before the mistake was even noticed. The rule changes which roads and hours it covers often enough that even longtime residents occasionally get it wrong.|La matrícula del coche terminaba en el dígito equivocado para ese día, una norma pensada para aligerar el tráfico en los peores corredores de la capital, y la cámara del control captó el paso antes de que nadie notara el error.|La plaque de la voiture se terminait par le mauvais chiffre ce jour-là, une règle censée alléger la circulation sur les pires axes de la capitale, et la caméra du point de contrôle a enregistré le passage avant même que l'erreur ne soit remarquée.|その日は車のナンバーの末尾が対象外の数字で、首都のとりわけ混雑する幹線道路の交通量を減らすための規制だったが、間違いに気づく前に検問のカメラが通過を記録してしまっていた。この規制は対象の道路や時間帯がたびたび変わるため、長年住んでいる人でもときどき間違える。",
  ),

  // ---- nut 小スンダ列島(バリ含む) ----
  ev(
    "bantu-toko-selam", "gain", ["nut"], "🤿", 240,
    "Helping a dive shop rinse and hang gear|Ayudando en una tienda de buceo a enjuagar y colgar el equipo|Aider une boutique de plongée à rincer et suspendre le matériel|ダイブショップで器材を洗って干すのを手伝う",
    "A small dive operation had three boats returning at once and nowhere near enough hands to rinse the salt off dozens of sets of gear before the next morning's trips, so a few hours of hosing down wetsuits and tanks paid in cash and a free tank fill later in the week. Dive shops along these coasts run on a shoestring outside peak season and lean on locals for exactly this kind of help.|Una pequeña operadora de buceo tenía tres barcos volviendo a la vez y ni de lejos manos suficientes para enjuagar la sal de docenas de equipos antes de las salidas de la mañana siguiente, así que unas horas manguereando trajes de neopreno y botellas se pagaron en efectivo.|Un petit centre de plongée avait trois bateaux qui rentraient en même temps et pas assez de bras pour rincer le sel de dizaines d'équipements avant les sorties du lendemain matin, alors quelques heures à passer combinaisons et bouteilles au jet ont été payées en liquide.|小さなダイブショップでは三隻の船が同時に戻ってきて、翌朝の便までに何十セットもの器材の塩を洗い流す人手がまったく足りなかった。ウェットスーツとタンクをホースで洗う数時間は現金で支払われ、その週のうちにタンク一本分の無料補充もついてきた。この海岸沿いのダイブショップはシーズンオフには苦しい経営をしており、まさにこうした手助けを地元の人に頼っている。",
  ),
  ev(
    "buat-sesajen", "gain", ["nut"], "🌺", 220,
    "Weaving palm-leaf offering trays for a temple festival|Tejiendo bandejas de ofrendas de hoja de palma para una fiesta de templo|Tresser des plateaux d'offrandes en feuille de palme pour une fête de temple|寺院祭りのため椰子の葉の供物皿を編む",
    "A temple anniversary festival needed hundreds of small woven trays finished before dawn, and quick hands folding palm leaf into shape earned a fee paid by the household organizing the ceremony. Making these offerings well enough to sell, rather than just for one's own family, takes years of practice most people pick up from a grandmother rather than any class.|Una fiesta de aniversario de un templo necesitaba cientos de pequeñas bandejas tejidas listas antes del amanecer, y unas manos rápidas doblando hojas de palma ganaron una tarifa pagada por la familia que organizaba la ceremonia.|Une fête d'anniversaire de temple avait besoin de centaines de petits plateaux tressés prêts avant l'aube, et des mains rapides pliant la feuille de palme ont gagné un tarif payé par la famille organisant la cérémonie.|寺院の記念祭で、夜明け前までに何百もの小さな編み皿を仕上げる必要があった。椰子の葉を手早く折って形にする作業は、儀式を主催する家から謝礼が支払われた。自分の家族のためだけでなく売れるほど上手にこの供物を作るには何年もの修練が要り、たいていは教室ではなく祖母から受け継いだ技である。",
    [10, 11],
  ),
  ev(
    "deposit-snorkel-hilang", "loss", ["nut"], "🥽", 160,
    "The rented snorkel mask never made it back|La máscara de esnórquel alquilada nunca volvió|Le masque de snorkeling loué n'est jamais revenu|レンタルのシュノーケルマスクが戻ってこない",
    "The mask had seemed secure enough clipped to the boat's rail during the swim to the reef, and only back on shore did it become clear it had slipped off somewhere in the current, leaving the deposit forfeited to the rental stand. Rental stalls along popular snorkel spots charge deposits well above the gear's actual cost precisely because of afternoons like this one.|La máscara parecía bien sujeta a la barandilla del barco durante el nado hasta el arrecife, y solo al volver a tierra quedó claro que se había soltado en algún punto de la corriente, perdiendo el depósito a favor del puesto de alquiler.|Le masque semblait bien accroché au bastingage du bateau pendant la nage vers le récif, et ce n'est qu'une fois à terre qu'il est devenu clair qu'il avait glissé quelque part dans le courant, le dépôt de garantie restant acquis au loueur.|礁へ泳いでいくあいだ、マスクは船の手すりにしっかり留めてあったはずだったが、陸に戻って初めて、どこかの流れで外れて失われたことに気づいた。預けた保証金はレンタル業者のものになった。人気のシュノーケルスポット沿いのレンタル店が器材の実際の値段よりずっと高い保証金を取るのは、まさにこうした午後があるからである。",
  ),

  // ---- kal カリマンタン ----
  ev(
    "pemandu-sungai-mahakam", "gain", ["kal"], "🛶", 260,
    "Filling in as a boat guide upriver|Sustituyendo como guía de barco río arriba|Remplacer un guide de bateau en amont|川上りの船案内を臨時で務める",
    "The usual boatman was down with a fever and a group had already paid for the day's trip, so a cousin who knew the river's bends and sandbars well enough took the tiller instead and split the fare. Piloting these waterways safely depends on reading water levels that shift with the season, knowledge passed down informally rather than from any chart.|El barquero habitual tenía fiebre y un grupo ya había pagado la excursión del día, así que un primo que conocía bien los recodos y bancos de arena del río tomó el timón y se repartió la tarifa.|Le batelier habituel avait de la fièvre et un groupe avait déjà payé l'excursion du jour, alors un cousin connaissant assez bien les méandres et les bancs de sable de la rivière a pris la barre à sa place et partagé la recette.|いつもの船頭が熱を出し、その日の船旅の代金はすでに支払われていた。川の曲がりと砂州をよく知る従兄弟が代わりに舵を取り、運賃を分け合った。この水路を安全に操るには季節で変わる水位を読む知識が要るが、それは海図ではなく口伝えで受け継がれる。",
  ),
  ev(
    "jual-buah-hutan", "gain", ["kal"], "🍈", 200,
    "Selling forest fruit picked along the trail|Vendiendo fruta del bosque recogida en el sendero|Vendre des fruits forestiers cueillis le long du sentier|山道で採った森の果実を売る",
    "A basket of rambutan and wild durian gathered on the way back from checking a relative's rubber trees sold quickly to passersby at a roadside stand, since the fruit rarely makes it to any formal market before spoiling. Forest fruit stands like this appear and vanish with the season, run by whoever happens to be walking that stretch of road that week.|Una cesta de rambután y durián silvestre recogida al volver de revisar los árboles de caucho de un pariente se vendió rápido a los transeúntes en un puesto junto a la carretera, ya que esta fruta rara vez llega a ningún mercado formal antes de estropearse.|Un panier de ramboutans et de durians sauvages cueillis en revenant de vérifier les hévéas d'un parent s'est vendu vite aux passants à un étal de bord de route, ce fruit atteignant rarement un marché formel avant de s'abîmer.|親戚のゴムの木を見に行った帰りに摘んだランブータンと野生のドリアンの籠は、道端の露店で通りすがりの人にすぐ売れた。この果物は正式な市場に届く前に傷んでしまうことがほとんどだからである。こうした森の果物の露店はその季節だけ現れては消え、その週たまたまその道を歩いていた誰かが商う。",
    [2, 3],
  ),
  ev(
    "mobil-terjebak-lumpur", "loss", ["kal"], "🚙", 220,
    "The car sinks into a muddy logging road|El coche se hunde en un camino embarrado de tala|La voiture s'enlise sur une piste boueuse d'exploitation forestière|泥の伐採道路で車がはまり込む",
    "A shortcut that looked driveable at the start turned to axle-deep mud after an hour's rain upriver, and pulling the car free took a passing truck, a length of rope, and a fee that felt steep until the alternative — walking the rest of the way — was considered. Unpaved roads through this terrain change condition fast with rainfall the driver rarely sees coming from town.|Un atajo que parecía transitable al principio se volvió barro hasta el eje tras una hora de lluvia río arriba, y sacar el coche costó un camión que pasaba, una cuerda y una tarifa que pareció alta hasta considerar la alternativa: caminar el resto.|Un raccourci qui semblait praticable au départ s'est transformé en boue jusqu'aux essieux après une heure de pluie en amont, et dégager la voiture a nécessité un camion de passage, une corde et un tarif qui a paru élevé face à l'alternative : marcher le reste du trajet.|最初は通れそうに見えた近道は、川上での一時間の雨のあとで車軸まで沈む泥に変わっていた。車を引き上げるには通りかかったトラックとロープ、そして高く感じる料金が必要だったが、残りを歩く選択肢を考えれば納得のいく額だった。この一帯の未舗装路は、町からは見えない上流の雨で状態が急に変わる。",
  ),

  // ---- sul スラウェシ ----
  ev(
    "perbaiki-jaring-ikan", "gain", ["sul"], "🪢", 220,
    "Mending torn fishing nets before the boats go out|Reparando redes rotas antes de que salgan los barcos|Réparer des filets de pêche déchirés avant le départ des bateaux|船が出る前に破れた漁網を繕う",
    "A fishing crew found a net badly torn by a snag on the reef the night before and needed it fixed before the morning tide, and quick hands with a shuttle needle earned a share of that day's catch instead of cash. Net repair is skilled, tedious work, and boats without a dedicated hand for it often pay outsiders rather than lose fishing hours doing it themselves.|Una tripulación de pesca encontró una red muy rota por engancharse en el arrecife la noche anterior y necesitaba repararla antes de la marea matutina, y unas manos rápidas con la aguja de zurcir ganaron parte de la pesca del día en vez de dinero.|Un équipage de pêcheurs a trouvé un filet gravement déchiré après s'être accroché au récif la veille au soir et devait le réparer avant la marée du matin, et des mains rapides avec une aiguille à filet ont gagné une part de la pêche du jour au lieu d'argent.|漁師たちは前夜、礁に引っかかってひどく破れた網を見つけ、朝の潮までに直す必要があった。網針を素早く操る手が、現金の代わりにその日の漁獲の分け前を稼いだ。網の修繕は熟練を要する根気のいる仕事で、専属の担い手がいない船は、自分たちで直して漁の時間を失うより外の人に頼むことが多い。",
  ),
  ev(
    "angkut-hasil-panen-toraja", "gain", ["sul"], "🌾", 240,
    "Carrying harvest sacks down from the terraces|Cargando sacos de la cosecha desde las terrazas|Descendre des sacs de récolte depuis les terrasses|棚田から収穫の袋を運び下ろす",
    "A family preparing for an upcoming funeral ceremony needed extra hands carrying rice and coffee sacks down narrow terrace paths to the nearest road before a truck arrived, work paid on the spot since the household's own relatives were already stretched thin with preparations. Funeral ceremonies here can take months to organize, and the practical labor around them quietly employs half the surrounding village.|Una familia que preparaba un funeral próximo necesitaba manos extra para bajar sacos de arroz y café por estrechos senderos de terraza hasta la carretera más cercana antes de que llegara un camión, trabajo pagado al momento porque los propios parientes ya andaban muy ocupados con los preparativos.|Une famille se préparant pour de prochaines funérailles avait besoin de bras supplémentaires pour descendre des sacs de riz et de café par d'étroits sentiers en terrasse jusqu'à la route la plus proche avant l'arrivée d'un camion, travail payé sur place car les proches de la famille étaient déjà débordés par les préparatifs.|近く葬儀を控えた家族が、トラックが来る前に米とコーヒーの袋を狭い棚田の道づたいに最寄りの道路まで運び下ろす人手を求めていた。その場で支払われた仕事だったのは、家族の親戚はすでに準備で手一杯だったためである。ここでの葬儀は準備に何か月もかかることがあり、それにまつわる実務労働が周辺の村の半分をひそかに雇っている。",
  ),
  ev(
    "kalah-taruhan-adu-layang", "loss", ["sul"], "🪁", 160,
    "A losing bet on a kite-fighting match|Una apuesta perdida en una pelea de cometas|Un pari perdu lors d'un combat de cerfs-volants|凧合戦の勝負に賭けて負ける",
    "The kite everyone agreed had the sharper glass-coated string lost its duel within minutes, cut loose and drifting out over the rooftops while the small side bets placed beforehand quietly changed hands. Kite fighting draws serious neighborhood rivalries in coastal towns here, fought with string coated in ground glass to saw through a rival's line.|La cometa que todos coincidían tenía el hilo con vidrio molido más afilado perdió el duelo en minutos, cortada y flotando sobre los tejados, mientras las pequeñas apuestas hechas de antemano cambiaban de manos en silencio.|Le cerf-volant dont tout le monde s'accordait à dire qu'il avait le fil enduit de verre le plus tranchant a perdu son duel en quelques minutes, coupé et dérivant au-dessus des toits, tandis que les petits paris placés à l'avance changeaient discrètement de mains.|誰もがいちばん鋭いガラス粉入りの糸だと認めていた凧が、数分のうちに勝負に敗れ、切られて屋根の上を漂っていった。あらかじめ交わされていた小さな賭けは静かに持ち主を変えた。凧合戦はこの沿岸の町で本気の近所同士の対抗心を呼び起こし、相手の糸を切るためガラスの粉をまぶした糸で争われる。",
  ),

  // ---- mlp マルク・パプア ----
  ev(
    "sortir-pala-cengkeh", "gain", ["mlp"], "🌰", 240,
    "Sorting a nutmeg harvest by hand|Clasificando a mano una cosecha de nuez moscada|Trier à la main une récolte de muscade|ナツメグの収穫を手で選別する",
    "A grower needed the day's harvest split quickly into the nutmeg fruit, the mace webbing around the seed, and the seed itself, each of which sells separately and at a different price, and steady hands sorting through crates all afternoon earned a flat fee. The three-part harvest is still handled this way on most small plots, with machinery too costly to justify for a single family's trees.|Un cultivador necesitaba separar rápido la cosecha del día en el fruto de la nuez moscada, la envoltura de macis alrededor de la semilla y la propia semilla, cada una vendida por separado y a distinto precio, y unas manos firmes clasificando cajas toda la tarde ganaron una tarifa fija.|Un producteur avait besoin de trier rapidement la récolte du jour en fruit de muscade, en macis entourant la graine et en graine elle-même, chacun se vendant séparément à un prix différent, et des mains sûres triant des caisses tout l'après-midi ont gagné un tarif fixe.|栽培農家はその日の収穫を、ナツメグの果実・種を包むメース(仮種皮)・種そのものの三つに素早く分ける必要があった。それぞれ別々に、異なる値段で売られるためである。午後じゅう箱の中身を選り分ける確かな手は、決まった手当を稼いだ。小規模な畑の多くでは、機械を導入するには一家の木の分では割に合わず、いまもこうして手作業が続いている。",
    [5, 6],
  ),
  ev(
    "bantu-ukir-asmat", "gain", ["mlp"], "🪵", 220,
    "Sanding finished woodcarvings for a workshop|Lijando tallas de madera terminadas para un taller|Poncer des sculptures sur bois finies pour un atelier|工房で彫刻の仕上げを研磨する",
    "A carving workshop preparing pieces for a cultural exhibition needed the final sanding and oiling done on a dozen finished pieces before a shipping deadline, careful work that could not touch the carved detail itself but still took most of a day. Finished carvings from Papua's coast are traded well beyond the region, though the carvers who make them rarely see a large share of the final sale price.|Un taller de talla que preparaba piezas para una exposición cultural necesitaba lijar y aceitar una docena de piezas terminadas antes de un plazo de envío, un trabajo cuidadoso que no podía tocar el tallado en sí pero aun así llevó casi todo un día.|Un atelier de sculpture préparant des pièces pour une exposition culturelle avait besoin de terminer le ponçage et l'huilage d'une douzaine de pièces avant une date d'expédition, un travail minutieux qui ne devait pas toucher au motif sculpté lui-même mais a tout de même pris presque toute une journée.|文化展示の準備をしていた彫刻工房は、出荷の締め切りまでに十数点の完成品の最終研磨と油塗りを終える必要があった。彫り自体には触れられない繊細な作業だったが、それでもほぼ一日がかりだった。パプア沿岸の完成した彫刻はこの地域をはるかに超えて取引されるが、それを作る彫師自身が最終的な売値のうち大きな取り分を目にすることはめったにない。",
  ),
  ev(
    "reschedule-penerbangan", "loss", ["mlp"], "✈️", 240,
    "A storm forces an expensive flight rebooking|Una tormenta obliga a un caro cambio de vuelo|Une tempête force un coûteux changement de vol|嵐で航空券の高い振替を強いられる",
    "Cloud cover over the highlands grounded the only flight out for two days straight, and every seat on the first plane back in the air was already booked, leaving no option but a pricier rebooking on a later flight through a different route. Where roads do not reach, weather delays are not an inconvenience so much as the only real transport risk that matters.|La niebla sobre las tierras altas dejó en tierra el único vuelo de salida durante dos días seguidos, y todos los asientos del primer avión que volvió a volar ya estaban reservados, sin más opción que un cambio más caro a un vuelo posterior por otra ruta.|La couverture nuageuse sur les hautes terres a cloué au sol le seul vol de sortie pendant deux jours d'affilée, et tous les sièges du premier avion à revoler étaient déjà réservés, ne laissant d'autre choix qu'un changement plus cher vers un vol ultérieur par un autre trajet.|高地を覆う雲のせいで唯一の出発便が二日連続で欠航し、次に飛んだ便の座席はすでに埋まっていた。別の経路を通るあとの便への、割高な振替しか選択肢は残っていなかった。道路が通じていない土地では、天候による遅れはちょっとした不便どころか、唯一本当に懸念すべき交通上のリスクである。",
  ),
];
