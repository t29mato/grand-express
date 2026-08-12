/**
 * イギリスの青マス・赤マスで起きる出来事(19件。増10・減9)。
 *
 * 地方コード: se=イングランド南部 / mi=イングランド中部 / no=イングランド北部 /
 * wa=ウェールズ / sc=スコットランド / ni=北アイルランド
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに2〜3件、産業や祭りに結びつけて置いている。
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

export const UK_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "carbootsale", "gain", [], "📦", 210,
    "A good haul at the car boot sale|Un buen botín en el mercadillo de coches|Une bonne trouvaille au marché aux puces|カーブートセールで思わぬ稼ぎ",
    "A trestle table of unwanted books and old crockery cleared out faster than expected once the early birds arrived before the official opening time, cash changing hands before the boot was even fully unloaded. Car boot sales run in car parks and fields most weekends, and getting there at dawn to buy is considered as much a national pastime as selling.|Una mesa de caballetes con libros y vajilla vieja se vació más rápido de lo esperado en cuanto llegaron los madrugadores antes de la apertura oficial, cambiando de manos el dinero antes incluso de descargar todo el maletero.|Une table à tréteaux couverte de livres et de vaisselle ancienne s'est vidée plus vite que prévu dès l'arrivée des lève-tôt avant l'ouverture officielle, l'argent changeant de main avant même que le coffre ne soit entièrement déchargé.|不用品の本や古い食器を並べたテーブルは、正式な開始時刻より早く来た早起きの客たちのおかげで思ったより早く売れていった。トランクを空にし終わる前から現金が動いていた。カーブートセールはほぼ毎週末、駐車場や野原で開かれ、夜明けに買いに行くのも売るのと同じくらい国民的な娯楽とされる。",
  ),
  ev(
    "busking", "gain", [], "🎸", 190,
    "A good afternoon busking on the high street|Una buena tarde tocando música en la calle principal|Un bon après-midi à faire la manche dans la rue principale|目抜き通りでの大道芸で稼ぐ",
    "A guitar case left open on a busy pedestrian street filled steadily through the afternoon, helped along by a chorus everyone within earshot seemed to already know. Many town councils require a licence and even an audition to busk in the busiest spots, so a good pitch on a Saturday is treated as something worth queuing for.|Un estuche de guitarra abierto en una calle peatonal concurrida se fue llenando poco a poco durante la tarde, ayudado por un estribillo que todos los que estaban al alcance del oído parecían ya conocerse.|Un étui de guitare laissé ouvert dans une rue piétonne animée s'est rempli peu à peu tout l'après-midi, porté par un refrain que tous ceux à portée d'oreille semblaient déjà connaître.|人通りの多い歩行者天国に開けたギターケースは、午後じゅうに少しずつ小銭で埋まっていった。聞こえる範囲の誰もがすでに知っているらしいサビの部分が特に効いた。人通りの多い場所で演奏するには許可、時にはオーディションまで必要な自治体もあり、土曜の良い場所は並んででも取る価値があるとされる。",
  ),
  ev(
    "servicesmarkup", "loss", [], "⛽", 180,
    "Motorway services markup|El recargo de las áreas de servicio de autopista|La surtaxe des aires d'autoroute|高速道路サービスエリアの割高価格",
    "A sandwich and a coffee bought in desperation at a motorway services stop somehow cost nearly double the same order in the nearest town, a markup drivers grumble about every single time and pay anyway rather than get back in the car hungry. The car park itself, at least, is still free.|Un sándwich y un café comprados por desesperación en un área de servicio de autopista costaron casi el doble que el mismo pedido en el pueblo más cercano, un recargo del que los conductores se quejan cada vez y aun así pagan.|Un sandwich et un café achetés par désespoir dans une aire de service d'autoroute ont coûté presque le double de la même commande dans la ville la plus proche, une surtaxe dont les automobilistes se plaignent à chaque fois et paient quand même.|高速道路のサービスエリアでやむを得ず買ったサンドイッチとコーヒーは、近くの町で買う同じ注文のほぼ倍の値段だった。ドライバーは毎回このことに文句を言いながらも、空腹のまま車に戻るよりはましだと払ってしまう。駐車場だけはいまも無料である。",
  ),
  ev(
    "brollyinsideout", "loss", [], "☔", 160,
    "An umbrella blown inside out|Un paraguas vuelto del revés por el viento|Un parapluie retourné par le vent|傘が風で裏返る",
    "A sudden gust turned the umbrella inside out on a street corner with no warning at all, snapping two spokes beyond repair and leaving nothing to do but carry the wreckage to the nearest bin looking as dignified as possible. A replacement from the newsagent by the station costs more than it has any right to.|Una ráfaga repentina volvió el paraguas del revés en una esquina sin aviso alguno, rompiendo dos varillas sin remedio y sin más remedio que llevar los restos a la papelera más cercana con la mayor dignidad posible.|Une rafale soudaine a retourné le parapluie au coin d'une rue sans le moindre avertissement, brisant deux baleines irréparablement, ne laissant d'autre choix que de porter l'épave jusqu'à la poubelle la plus proche avec le plus de dignité possible.|通りの角で前触れもなく突風が吹き、傘は裏返って骨が二本折れ、修理のしようもなくなった。できる限り堂々とした顔で、残骸を一番近いごみ箱まで運ぶほかなかった。駅前の売店で買う替えの傘は、値段に見合わないほど高い。",
  ),

  // ---- se イングランド南部 ----
  ev(
    "cambridgepunttips", "gain", ["se"], "🛶", 230,
    "Good tips guiding a punting tour|Buenas propinas guiando una excursión en batea|De bons pourboires en guidant une balade en barque|パント案内の心付けが弾む",
    "A group of tourists paid well over the odds after a punting tour along the Backs went smoothly enough that nobody fell in, tipping extra for the running commentary on which college owned which bridge. Term-time crowds of students cycling the same route make poling a straight line look easier than it is.|Un grupo de turistas pagó bastante más de lo habitual tras una excursión en batea por los Backs que salió tan bien que nadie se cayó al agua, con propina extra por el comentario continuo sobre qué colegio era dueño de cada puente.|Un groupe de touristes a payé bien plus que d'habitude après une balade en barque le long des Backs qui s'est si bien passée que personne n'est tombé à l'eau, avec un pourboire supplémentaire pour le commentaire continu sur quel collège possédait quel pont.|バックス沿いのパント遊覧は誰も川に落ちることなく順調に終わり、どの橋がどのカレッジのものかを解説し続けたことに観光客の一団が思いのほか気前よくチップを弾んでくれた。学期中は同じ道を自転車で通う学生の群れがいて、竿をまっすぐ操るのを見た目より難しくしている。",
    [2, 3, 4],
  ),
  ev(
    "congestioncharge", "loss", ["se"], "🚙", 210,
    "An accidental drive into the congestion charge zone|Una entrada sin querer en la zona de peaje urbano|Une entrée accidentelle dans la zone de péage urbain|知らずに混雑税の課金区域へ入ってしまう",
    "A wrong turn to avoid roadworks led straight into central London's charging zone without a single visible sign to say so, and the fine notice arrived by post two weeks later with a penalty far larger than the charge itself would have been. Paying by midnight the same day would have cost a fraction of the amount.|Un giro equivocado para esquivar obras condujo directo a la zona de peaje del centro de Londres sin un solo cartel visible que lo advirtiera, y el aviso de multa llegó por correo dos semanas después con una sanción mucho mayor que el propio peaje.|Un mauvais virage pour éviter des travaux a mené droit dans la zone de péage du centre de Londres sans le moindre panneau visible pour le signaler, et l'avis d'amende est arrivé par courrier deux semaines plus tard, bien plus salé que le péage lui-même.|工事を避けようと曲がった道が、案内もないままロンドン中心部の混雑税区域にそのまま続いていた。二週間後に届いた郵便の罰金通知は、本来の課金額よりはるかに高くついた。当日深夜までに支払えば、その何分の一で済んだはずだった。",
  ),

  ev(
    "chelseavolunteertip", "gain", ["se"], "🌷", 210,
    "A generous tip for volunteering at the Chelsea Flower Show|Una propina generosa por ser voluntario en el Chelsea Flower Show|Un généreux pourboire pour du bénévolat au Chelsea Flower Show|チェルシー・フラワー・ショーのボランティアで謝礼をもらう",
    "A show garden's designer needed an extra pair of hands watering and grooming display beds before the judges' final walk-through, and the thank-you at the end of the week came in cash rather than the usual free ticket. Getting this close to a gold-medal garden before the public ever sees it is treated as its own reward by most volunteers.|El diseñador de un jardín de exhibición necesitó unas manos extra para regar y arreglar los parterres antes de la última ronda de los jueces, y el agradecimiento de fin de semana llegó en efectivo en vez del habitual pase gratuito.|Le concepteur d'un jardin d'exposition avait besoin de bras supplémentaires pour arroser et soigner les massifs avant la dernière tournée des juges, et le remerciement de fin de semaine est arrivé en espèces plutôt que le billet gratuit habituel.|展示庭園の設計者が、審査員の最終見回りの前に花壇へ水をやり手入れをする人手を求めていた。週末の御礼はいつもの無料入場券ではなく現金だった。金賞候補の庭園を一般公開の前にこれほど間近で見られること自体が、多くのボランティアにとってすでに報酬だという。",
    [1],
  ),

  // ---- mi イングランド中部 ----
  ev(
    "stratfordextra", "gain", ["mi"], "🎭", 220,
    "A day's pay as an extra in a Shakespeare production|Un día de paga como extra en una producción de Shakespeare|Une journée de paie comme figurant dans une pièce de Shakespeare|シェイクスピア劇のエキストラで日当を稼ぐ",
    "The Royal Shakespeare Company needed a few more bodies for a crowd scene at short notice, and standing in period costume under hot stage lights for a few hours paid better than expected for mostly just reacting to swordfights. Nobody in the crowd gets a line, but everybody gets a programme credit.|La Royal Shakespeare Company necesitaba unos cuerpos más para una escena de multitud con poca antelación, y quedarse de pie con traje de época bajo focos calientes durante unas horas pagó mejor de lo esperado.|La Royal Shakespeare Company avait besoin de quelques figurants de plus pour une scène de foule au pied levé, et rester debout en costume d'époque sous des projecteurs chauds pendant quelques heures a payé mieux que prévu.|ロイヤル・シェイクスピア・カンパニーが急遽、群衆シーンにあと数人必要だと声をかけてきた。時代衣装を着て熱い舞台照明の下、数時間ほぼ剣戟に反応するだけの仕事だったが、思ったより実入りがよかった。台詞はもらえないが、誰でもプログラムには名前が載る。",
  ),
  ev(
    "peakbootblowout", "loss", ["mi"], "🥾", 190,
    "A walking boot sole comes apart on the Peak District moors|La suela de una bota se despega en los páramos de Peak District|La semelle d'une chaussure de marche se décolle sur les landes du Peak District|ピーク・ディストリクトの荒野でブーツの底が剥がれる",
    "The sole peeled halfway off a boot several kilometres from the nearest car park, and the rest of the walk back was done half-limping with a plastic bag and a length of string standing in for proper footwear. A new pair from the outdoor shop in the nearest town cost more than the whole day out was meant to.|La suela se despegó a medias a varios kilómetros del aparcamiento más cercano, y el resto de la caminata de vuelta se hizo medio cojeando, con una bolsa de plástico y un trozo de cuerda haciendo de calzado improvisado.|La semelle s'est à moitié décollée à plusieurs kilomètres du parking le plus proche, et le reste de la marche du retour s'est fait en boitant à moitié, un sac plastique et un bout de ficelle tenant lieu de chaussure de fortune.|一番近い駐車場から数kmも離れた地点で靴底が半分はがれてしまい、残りの道のりはビニール袋と紐で応急処置をしながら半分足を引きずって歩くはめになった。一番近い町のアウトドア店で買った新しい一足は、その日の外出全体の予算より高くついた。",
  ),

  // ---- no イングランド北部 ----
  ev(
    "matchdayprogramme", "gain", ["no"], "📰", 220,
    "Selling matchday programmes outside the ground|Vendiendo programas del partido a las puertas del estadio|Vendre les programmes de match devant le stade|試合当日のプログラム売りで稼ぐ",
    "A stack of matchday programmes sold out an hour before kickoff outside a packed ground, the crowd thickening fast enough that a small commission on every sale added up quickly. Long-time season ticket holders buy one out of habit every single week regardless of the score last time.|Una pila de programas de partido se agotó una hora antes del pitido inicial a las puertas de un estadio abarrotado, con la multitud espesándose lo bastante rápido como para que una pequeña comisión por cada venta se sumara deprisa.|Une pile de programmes de match s'est écoulée une heure avant le coup d'envoi devant un stade bondé, la foule s'épaississant assez vite pour qu'une petite commission sur chaque vente s'additionne rapidement.|試合開始の1時間前には満員のスタジアム前でプログラムの束が売り切れた。人だかりが急に厚くなり、一部売れるごとの手数料がみるみる積み上がった。長年の年間指定席保有者は、前回の結果に関わらず毎週習慣で一部買っていく。",
    [5, 6],
  ),
  ev(
    "lakedistrictdownpour", "loss", ["no"], "🌧️", 200,
    "Caught in a Lake District downpour with no waterproofs|Sorprendido por un aguacero en Lake District sin ropa impermeable|Surpris par une averse dans le Lake District sans vêtement imperméable|防水着なしで湖水地方の土砂降りに遭う",
    "A fell walk that started under blue sky turned into a soaking within twenty minutes once the cloud rolled in off the water, and every layer worth wearing had to be replaced at the outdoor shop in the nearest village before the bus home. Locals check the fells for cloud, not the sky overhead, before deciding whether to trust a forecast.|Una caminata por las colinas que empezó bajo cielo despejado se convirtió en un empape en veinte minutos en cuanto llegaron las nubes desde el lago, y hubo que reponer cada prenda decente en la tienda de la aldea más cercana.|Une marche en colline débutée sous un ciel bleu s'est transformée en trempette en vingt minutes dès l'arrivée des nuages depuis le lac, et chaque vêtement digne de ce nom a dû être remplacé au magasin du village le plus proche.|青空のもとで始まった丘歩きは、湖の方から雲が流れ込んでくると20分もしないうちにずぶ濡れに変わり、着られる服はすべて一番近い村のアウトドア店で買い直すはめになった。地元の人は天気予報を信じるかどうかを、頭上の空ではなく丘にかかる雲を見て決める。",
  ),

  ev(
    "bonfirenightstall", "gain", ["no"], "🎇", 200,
    "Helping run a bonfire night toffee-apple stall|Ayudando en un puesto de manzanas de caramelo la noche de la hoguera|Aider à tenir un stand de pommes d'amour pour Bonfire Night|ボンファイア・ナイトの飴りんご屋台を手伝う",
    "A community bonfire committee needed an extra pair of hands dipping apples in hot toffee before the crowds arrived for the fireworks, and the stall sold out well before the display even started. Sparklers are handed to children for free, but the toffee apples are how the committee pays for next year's fireworks.|Un comité de hoguera comunitaria necesitó manos extra para bañar manzanas en caramelo caliente antes de que llegara el gentío para los fuegos artificiales, y el puesto se agotó bastante antes de que empezara siquiera el espectáculo.|Un comité de feu de joie communautaire avait besoin de bras supplémentaires pour tremper des pommes dans du caramel chaud avant l'arrivée de la foule pour le feu d'artifice, et le stand fut épuisé bien avant même le début du spectacle.|地域のボンファイア委員会が、花火目当ての人だかりが来る前にりんごを熱いキャラメルにくぐらせる手を求めていた。屋台は花火が始まる前に売り切れた。子どもには花火の手持ち棒が無料で配られるが、来年の花火代を賄うのはこの飴りんごの売り上げである。",
    [7],
  ),

  // ---- wa ウェールズ ----
  ev(
    "welshcakesmarket", "gain", ["wa"], "🥮", 200,
    "A brisk morning selling Welsh cakes at the market|Una mañana ajetreada vendiendo tortas galesas en el mercado|Une matinée animée à vendre des Welsh cakes au marché|市場でウェルシュケーキがよく売れる朝",
    "A griddle set up at a market stall sold every last Welsh cake before noon, the smell of currants and nutmeg pulling in a queue that grew every time a fresh batch came off the hot plate. Recipes are handed down by weight and feel rather than written measurements in most families that sell them.|Una plancha instalada en un puesto de mercado vendió hasta la última torta galesa antes del mediodía, el olor a pasas y nuez moscada atrayendo una cola que crecía cada vez que salía una tanda fresca de la plancha.|Une plaque installée sur un étal de marché a vendu jusqu'à la dernière Welsh cake avant midi, l'odeur de raisins secs et de muscade attirant une file qui grandissait à chaque nouvelle fournée sortie de la plaque chaude.|市場の屋台に据えた鉄板は昼前にウェルシュケーキを売り切った。カラントとナツメグの香りが、焼き上がるたびに列を膨らませた。売る家庭の多くでは、レシピは書かれた分量ではなく重さと勘で代々受け継がれている。",
  ),
  ev(
    "rugbybartab", "loss", ["wa"], "🏉", 220,
    "A bigger bar tab than planned after the rugby|Una cuenta de bar más alta de lo previsto tras el rugby|Une note de bar plus salée que prévu après le rugby|ラグビー観戦後、思ったより高くついた飲み代",
    "A win in the last minute meant the whole pub kept celebrating long after the final whistle, and rounds bought in the excitement added up to far more than anyone planned to spend on a Saturday afternoon. Nobody keeps proper count of a round on international match day, which is exactly the problem.|Un triunfo en el último minuto hizo que todo el pub siguiera celebrando mucho después del pitido final, y las rondas compradas en el entusiasmo sumaron mucho más de lo que nadie pensaba gastar un sábado por la tarde.|Une victoire à la dernière minute a fait que tout le pub a continué de fêter bien après le coup de sifflet final, et les tournées offertes dans l'euphorie ont fini par coûter bien plus que ce que quiconque comptait dépenser un samedi après-midi.|土壇場での勝利にパブ全体が最後の笛のあともずっと祝杯を続け、興奮のあまり奢った酒代は土曜の午後に使うつもりだった額をはるかに超えていた。代表戦の日には誰もラウンドの正確な回数を数えていない。まさにそこが問題である。",
    [10, 11],
  ),

  // ---- sc スコットランド ----
  ev(
    "caddyingoldcourse", "gain", ["sc"], "⛳", 240,
    "A generous tip caddying for a visiting golfer|Una propina generosa haciendo de caddie para un golfista visitante|Un généreux pourboire en caddieant pour un golfeur en visite|訪れたゴルファーのキャディで気前よくチップをもらう",
    "A visiting golfer paid handsomely for a round of local knowledge about which way the wind would push a putt, having flown a long way specifically to play a course that has been used for the sport since long before anyone wrote formal rules down. Carrying the bag across eighteen holes of exposed coastline is harder work than it looks on television.|Un golfista visitante pagó generosamente por una ronda de conocimiento local sobre hacia dónde empujaría el viento un golpe, tras volar muy lejos justo para jugar un campo usado para este deporte desde mucho antes de que nadie escribiera reglas formales.|Un golfeur en visite a généreusement payé pour une ronde de conseils locaux sur le sens dans lequel le vent pousserait un putt, ayant volé de loin exprès pour jouer un parcours utilisé pour ce sport bien avant que quiconque n'en couche les règles par écrit.|訪れたゴルファーは、風がパットをどちらへ押すかという土地勘に気前よく払ってくれた。正式なルールが書き記されるよりずっと前からこの競技に使われてきたコースを目当てに、はるばる飛行機で来たのだという。むき出しの海岸沿い18ホール分バッグを担ぐのは、テレビで見るより重労働である。",
    [2, 3, 4],
  ),
  ev(
    "midgeswarm", "loss", ["sc"], "🦟", 170,
    "A midge swarm ruins a Highland picnic|Un enjambre de mosquitos arruina un pícnic en las Tierras Altas|Un essaim de moucherons gâche un pique-nique dans les Highlands|ハイランドのピクニックがブヨの大群に台無しにされる",
    "A still, warm evening by the loch turned out to be exactly the conditions the local midges wait for, and the picnic was abandoned within minutes in favour of the car, windows sealed, leaving behind a full flask and an unopened packet of shortbread. Repellent from the nearest shop suddenly seemed worth any price at all.|Una tarde calma y cálida junto al lago resultó ser justo las condiciones que esperan los mosquitos locales, y el pícnic se abandonó en minutos en favor del coche, ventanas cerradas, dejando atrás un termo lleno y un paquete de shortbread sin abrir.|Une soirée calme et chaude au bord du loch s'est révélée être exactement les conditions qu'attendent les moucherons locaux, et le pique-nique fut abandonné en quelques minutes au profit de la voiture, vitres closes, laissant derrière une thermos pleine et un paquet de shortbread non ouvert.|湖畔の穏やかで暖かい夕方は、まさに地元のブヨが待ち構えている条件そのものだった。ピクニックは数分で切り上げられ、窓を閉め切った車の中へ避難する羽目になり、満杯の水筒と封も開けていないショートブレッドの包みが置き去りにされた。一番近い店の虫よけスプレーが、急にいくら払ってもいいと思えるほどの値打ちに思えてきた。",
    [2, 3, 4],
  ),
  ev(
    "hogmanaytaxi", "loss", ["sc"], "🚕", 150,
    "A surge-priced taxi home after Hogmanay|Un taxi a precio disparado tras Hogmanay|Un taxi hors de prix après Hogmanay|ホグマネイの夜、割増料金のタクシーで帰る",
    "Every bus stopped running hours before the bells rang in the new year, and the only taxi still answering calls charged a rate that made the short ride home feel like a small toll on the celebration itself. The driver, at least, wished a good new year in return.|Todos los autobuses dejaron de circular horas antes de que sonaran las campanadas de año nuevo, y el único taxi que aún respondía llamadas cobraba una tarifa que hizo del corto trayecto a casa una pequeña peaje sobre la propia fiesta.|Tous les bus ont cessé de circuler des heures avant que les cloches ne sonnent le nouvel an, et le seul taxi qui répondait encore facturait un tarif qui a fait du court trajet du retour une sorte de péage sur la fête elle-même.|新年を告げる鐘が鳴る何時間も前にバスはすべて運行を終えており、唯一電話に出たタクシーの料金は、短い帰り道を祝いそのものへのちょっとした通行料のように感じさせた。運転手だけは、せめてよい一年をと声をかけてくれた。",
    [9],
  ),

  // ---- ni 北アイルランド ----
  ev(
    "titanicquartershift", "gain", ["ni"], "🚢", 230,
    "An extra shift guiding visitors round the Titanic Quarter|Un turno extra guiando a visitantes por el Titanic Quarter|Un service supplémentaire à guider des visiteurs dans le Titanic Quarter|タイタニック・クオーターの案内で臨時シフトを稼ぐ",
    "A coach party arrived unannounced and needed a guide at short notice through the old slipways where the ship was built, paying a same-day rate for someone who actually knew which crane was Samson and which was Goliath. Cruise ship days bring the same rush with almost no warning.|Un grupo en autocar llegó sin previo aviso y necesitó un guía con poca antelación por las antiguas gradas donde se construyó el barco, pagando una tarifa de última hora a alguien que de verdad sabía distinguir a Sansón de Goliat.|Un groupe en autocar est arrivé à l'improviste et a eu besoin d'un guide au pied levé à travers les anciennes cales où le navire fut construit, payant un tarif de dernière minute à quelqu'un qui savait vraiment distinguer Samson de Goliath.|団体観光バスが予告なく到着し、船が建造された旧進水台を案内できる人をその日のうちに求めていた。どちらがサムソンでどちらがゴリアテか本当に知っている案内人には、当日料金が支払われた。クルーズ船の寄港日は、ほとんど前触れなく同じ慌ただしさをもたらす。",
  ),
  ev(
    "causewaybusbreakdown", "loss", ["ni"], "🚌", 190,
    "A tour bus breaks down on the Causeway coast|Un autobús turístico se avería en la costa de la Calzada|Un bus touristique tombe en panne sur la côte de la Chaussée|コーズウェイ沿岸で観光バスが故障する",
    "The coach broke down on a narrow coast road with the basalt columns still a headland away, and the replacement taxi back to the hotel cost more than the whole day trip had in the first place. The driver blamed the road's endless bends for shaking something loose, and nobody argued.|El autocar se averió en una estrecha carretera costera con las columnas de basalto todavía a un promontorio de distancia, y el taxi de recambio de vuelta al hotel costó más que toda la excursión del día.|Le car est tombé en panne sur une route côtière étroite, les colonnes de basalte encore à un promontoire de distance, et le taxi de remplacement pour rentrer à l'hôtel a coûté plus cher que toute l'excursion de la journée.|海沿いの狭い道でバスが故障したとき、玄武岩の柱まではまだ岬一つ分の距離があった。ホテルまで戻る代わりのタクシー代は、その日の日帰り旅行の代金全体より高くついた。運転手は延々と続くカーブのせいで何かが緩んだのだと言い訳したが、誰も反論しなかった。",
  ),
];
