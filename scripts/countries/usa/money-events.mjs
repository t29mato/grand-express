/**
 * アメリカ合衆国の青マス・赤マスで起きる出来事(18件。増10・減8)。
 *
 * 地方コード: ne=北東部 / south=南部 / mw=中西部 / plains=大平原・山岳部 /
 * sw=南西部 / pacific=太平洋岸
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、南部・南西部には各3件(増2・減1)、北東部・中西部・
 * 大平原・太平洋岸には各2件(増1・減1)を、その土地らしい話に
 * 結びつけて置いている。**地方ごとの `gains`/`losses` は、全国共通の
 * 4件に頼らなくても、その地方の出来事だけで増・減の両方が引けることを
 * 確認済み。**
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

export const USA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "flea-market-flip", "gain", [], "🏷️", 180,
    "Flipping a flea-market find|Revendiendo un hallazgo del mercadillo|Revendre une trouvaille de brocante|フリーマーケットの掘り出し物を転売する",
    "A chipped lamp sat in the corner of a folding table marked five dollars, and a quick photo posted online that evening turned up three collectors who hadn't seen this model in years. Weekend flea markets and church-parking-lot sales are common enough that regulars keep a mental map of which ones run early and which ones haggle.|Una lámpara descascarillada estaba en la esquina de una mesa plegable marcada a cinco dólares, y una foto rápida publicada esa noche encontró a tres coleccionistas que no veían ese modelo hacía años. Los mercadillos de fin de semana son lo bastante comunes como para que los habituales lleven un mapa mental de cuáles abren temprano.|Une lampe ébréchée trônait dans le coin d'une table pliante marquée cinq dollars, et une photo prise à la hâte et postée en ligne ce soir-là attira trois collectionneurs qui n'avaient pas vu ce modèle depuis des années. Les brocantes du week-end sont assez courantes pour que les habitués tiennent une carte mentale de celles qui ouvrent tôt.|折りたたみ式テーブルの隅に5ドルの値札をつけて置かれていた欠けたランプを、その夜さっそく写真に撮ってネットに出したところ、何年もこの型を探していたという収集家が3人も名乗り出た。週末のフリーマーケットや教会の駐車場セールはどこにでもあり、常連は早く始まる場所と値切りが利く場所を頭の中の地図で覚えている。",
  ),
  ev(
    "extra-in-a-shoot", "gain", [], "🎬", 220,
    "A day of work as a background extra|Un día de trabajo como extra de fondo|Une journée de travail comme figurant|背景のエキストラとして一日働く",
    "A television crew filming on location needed bodies to fill out a street scene, and standing around in normal clothes for six hours paid better than it looked from the sidewalk. Film and television productions shoot in ordinary towns far more often than the credits ever let on, chasing tax incentives that plenty of states now offer.|Un equipo de televisión rodando en exteriores necesitaba gente para llenar una escena de calle, y quedarse de pie con ropa normal durante seis horas pagó mejor de lo que parecía desde la acera. Las producciones de cine y televisión ruedan en pueblos corrientes mucho más de lo que los créditos dejan ver.|Une équipe de télévision en tournage en extérieur avait besoin de figurants pour remplir une scène de rue, et rester debout en vêtements ordinaires pendant six heures a payé mieux qu'il n'y paraissait depuis le trottoir. Les productions de cinéma et de télévision tournent dans des villes ordinaires bien plus souvent que le générique ne le laisse voir.|ロケ撮影中のテレビ局が街角のシーンを埋める人手を求めていた。普段着のまま6時間突っ立っているだけの仕事だったが、歩道から見た印象より実入りは良かった。映画やテレビの撮影はクレジットが示す以上に、ごく普通の町で行われている。多くの州がいまでは税優遇でロケを呼び込んでいるためである。",
  ),
  ev(
    "parking-ticket", "loss", [], "🎫", 140,
    "An overstayed parking meter|Un parquímetro cuyo tiempo se agotó|Un parcmètre dépassé|駐車メーターの時間切れ",
    "The meter had another twelve minutes on it when the errand started, or so it seemed, and by the time the ticket was noticed under the wiper the chalk mark on the tire told a different story. Nearly every downtown in the country now reads plates with a camera instead of chalk, which has only made the fines more consistent, not less common.|El parquímetro tenía otros doce minutos, o eso parecía, y para cuando se vio la multa bajo el limpiaparabrisas, la marca de tiza en la rueda contaba otra historia. Casi todos los centros urbanos del país ahora leen las matrículas con cámara en vez de tiza.|Le parcmètre affichait encore douze minutes, du moins le pensait-on, et le temps de remarquer la contravention sous l'essuie-glace, la marque à la craie sur le pneu racontait une autre histoire. Presque tous les centres-villes du pays lisent désormais les plaques par caméra plutôt qu'à la craie.|用事を済ませに行く前、メーターにはまだ12分残っていたはずだった。だがワイパーの下に挟まれた違反切符に気づいたときには、タイヤに引かれたチョークの印が別の話を語っていた。いまや全国のほとんどの中心街がチョークの代わりにカメラでナンバープレートを読み取っており、罰金がより確実に、むしろ以前より頻繁になっただけだった。",
  ),
  ev(
    "tollroad-bill", "loss", [], "🛣️", 160,
    "A toll bill arrives weeks later|Una factura de peaje llega semanas después|Une facture de péage arrive des semaines plus tard|数週間後に届いた通行料の請求書",
    "The overhead gantry looked like ordinary road signage, easy to miss without a transponder mounted on the windshield, and the toll authority's letter took its time catching up with an added administrative fee stacked on top of the fare itself. Cashless tolling has spread to nearly every major highway corridor, and rental cars in particular rarely warn drivers before they cross one.|El pórtico elevado parecía señalización normal, fácil de pasar por alto sin transpondedor en el parabrisas, y la carta de la autoridad de peajes tardó su tiempo en llegar con un recargo administrativo añadido a la tarifa. El peaje sin efectivo se ha extendido a casi todos los grandes corredores.|Le portique aérien ressemblait à une signalisation routière ordinaire, facile à manquer sans transpondeur sur le pare-brise, et la lettre de l'organisme de péage a mis du temps à arriver, avec des frais administratifs ajoutés au tarif lui-même. Le péage sans arrêt s'est répandu sur presque tous les grands axes.|頭上のゲートはふつうの道路標識にしか見えず、フロントガラスに発信機を付けていなければ見落としやすかった。通行料徴収機関からの請求書は、料金そのものに事務手数料が上乗せされた形でしばらく経ってから届いた。キャッシュレス化した料金所は主要な高速道路のほとんどに広がっており、特にレンタカーではゲートを通る前に警告されないことが多い。",
  ),

  // ---- ne 北東部 ----
  ev(
    "subway-busking", "gain", ["ne"], "🎸", 200,
    "Busking in the subway|Tocando música en el metro|Jouer de la musique dans le métro|地下鉄構内で路上演奏する",
    "The acoustics of the tiled passage carried a borrowed guitar further than expected, and the evening rush hour crowd, usually too hurried to stop, tossed enough into the open case to cover dinner twice over. Cities that license subway performers keep waiting lists for the busiest platforms, since the trains guarantee a fresh audience every few minutes.|La acústica del pasillo alicatado llevó una guitarra prestada más lejos de lo esperado, y la multitud de la hora punta de la tarde, normalmente demasiado apurada para detenerse, echó al estuche abierto lo suficiente para pagar la cena dos veces.|L'acoustique du couloir carrelé porta une guitare empruntée plus loin que prévu, et la foule de l'heure de pointe du soir, d'ordinaire trop pressée pour s'arrêter, jeta dans l'étui ouvert de quoi payer le dîner deux fois.|タイル張りの通路の音響は借り物のギターの音を思ったより遠くまで届かせた。いつもは足を止める暇もない夕方のラッシュの人波が、開いたケースに夕食二回分をゆうに超える額を投げ入れてくれた。地下鉄の路上演奏を許可制にしている都市では、いちばん人通りの多いホームの許可を待つ順番待ちリストまである。列車が数分おきに新しい観客を運んでくるからである。",
  ),
  ev(
    "brownstone-stoop-sale", "loss", ["ne"], "🏚️", 130,
    "An impulse buy at a stoop sale|Una compra impulsiva en una venta de escalinata|Un achat impulsif lors d'une vente sur le perron|玄関前セールでの衝動買い",
    "A folding table set up on the brownstone's front steps was selling off a whole apartment's worth of things at once, and a perfectly good-looking side table turned out, once carried home, to wobble on a leg nobody had checked in the crowd. Stoop sales pop up with almost no notice on weekend mornings, cash only and rarely negotiable past the first offer.|Una mesa plegable montada en la escalinata de la casa vendía de golpe las pertenencias de todo un apartamento, y una mesita auxiliar de aspecto perfecto resultó, ya en casa, cojear de una pata que nadie revisó entre la multitud.|Une table pliante installée sur le perron de la maison vendait d'un coup tout le contenu d'un appartement, et une table d'appoint d'apparence parfaite s'est révélée, une fois rentrée à la maison, bancale sur un pied que personne n'avait vérifié dans la foule.|ブラウンストーン(赤褐色砂岩造りの家)の玄関先に出された折りたたみテーブルでは、部屋一室分の持ち物がまとめて売られていた。一見申し分なさそうなサイドテーブルは、家に持ち帰ってから、人だかりの中で誰も確かめなかった脚がぐらつくことが分かった。玄関前セールはほとんど予告なしに週末の朝現れ、現金払いのみで最初の言い値からほぼ値切れない。",
  ),

  // ---- south 南部 ----
  ev(
    "crawfish-boil-help", "gain", ["south"], "🦞", 210,
    "Helping run a crawfish boil|Ayudando a organizar una crawfish boil|Aider à organiser un crawfish boil|クロウフィッシュ(ザリガニ)の茹で会を手伝う",
    "A backyard crawfish boil for forty people needed an extra pair of hands to keep the corn and potatoes moving between the pot and the newspaper-covered table, paid in cash at the end of the night on top of all the crawfish anyone could peel. The right ratio of cayenne, lemon, and garlic in the boil is argued over as fiercely as any family recipe in the region.|Un crawfish boil en el patio trasero para cuarenta personas necesitaba manos extra para mover el maíz y las patatas entre la olla y la mesa cubierta de periódicos, pagado en efectivo al final de la noche además de todo el cangrejo de río que uno pudiera pelar.|Un crawfish boil dans un jardin pour quarante personnes avait besoin d'un coup de main pour faire circuler maïs et pommes de terre entre la marmite et la table couverte de journaux, payé en liquide en fin de soirée en plus de toutes les écrevisses qu'on pouvait éplucher.|裏庭で40人分のクロウフィッシュ・ボイル(ザリガニの茹で会)を開くには、鍋と新聞紙を敷いたテーブルの間でトウモロコシとジャガイモを行き来させる追加の手が要った。夜が更けたところで現金払いを受け取り、しかも剥き放題のザリガニまでついてきた。カイエンペッパーとレモン、ニンニクの配合は、この地方では家伝のレシピと同じくらい熱く議論される。",
    [10, 11, 0, 1],
  ),
  ev(
    "tailgate-cooking", "gain", ["south"], "🏈", 190,
    "Cooking for a football tailgate|Cocinando para un tailgate de fútbol americano|Cuisiner pour un tailgate de football américain|フットボールのテールゲート・パーティーで料理する",
    "A tailgate crew in the stadium parking lot needed someone who actually knew how to run a smoker for six hours before kickoff, and the pulled pork disappeared fast enough that the tip jar filled up before the national anthem even started. College football Saturdays turn entire parking lots into open-air kitchens hours before the gates open.|Un grupo de tailgate en el aparcamiento del estadio necesitaba a alguien que supiera manejar un ahumador durante seis horas antes del inicio, y el cerdo desmenuzado desapareció tan rápido que el bote de propinas se llenó antes de que empezara el himno.|Une équipe de tailgate sur le parking du stade avait besoin de quelqu'un qui sache vraiment faire tourner un fumoir pendant six heures avant le coup d'envoi, et le porc effiloché a disparu assez vite pour que le pot à pourboires se remplisse avant même l'hymne national.|スタジアムの駐車場のテールゲート仲間は、キックオフの6時間前からスモーカーを扱える人手を求めていた。プルドポークはあっという間になくなり、国歌斉唱が始まる前にチップの瓶はいっぱいになった。大学フットボールの土曜日は、開場の何時間も前から駐車場全体が野外の台所に変わる。",
    [5, 6, 7, 8],
  ),
  ev(
    "hurricane-prep-supplies", "loss", ["south"], "🌀", 220,
    "Stocking up before a hurricane watch|Abasteciéndose antes de una alerta de huracán|Faire des provisions avant une alerte d'ouragan|ハリケーン警戒下での備蓄買い出し",
    "The forecast cone still had days of uncertainty in it, but the bottled water shelves were already half empty by the time the store was reached, and a generator's worth of fuel cans and batteries added up fast at the register. Coastal residents keep a mental checklist ready from June to November and know better than to wait for the mandatory evacuation order to start shopping.|El cono del pronóstico todavía tenía días de incertidumbre, pero los estantes de agua embotellada ya estaban medio vacíos al llegar a la tienda, y las latas de combustible para el generador y las pilas sumaron rápido en la caja.|Le cône de prévision comportait encore des jours d'incertitude, mais les rayons d'eau en bouteille étaient déjà à moitié vides à l'arrivée au magasin, et les bidons de carburant pour le générateur ainsi que les piles se sont vite additionnés à la caisse.|進路予想円にはまだ何日分もの不確実さが残っていたが、店に着いた頃にはペットボトルの水の棚はもう半分空になっていた。発電機用の燃料缶と電池がレジであっという間に積み上がった。沿岸部の住民は6月から11月まで頭の中に備蓄チェックリストを用意しており、強制避難命令が出るのを待ってから買い出しに走るような真似はしない。",
    [2, 3, 4, 5, 6, 7],
  ),

  // ---- mw 中西部 ----
  ev(
    "butter-sculpture-helper", "gain", ["mw"], "🧈", 180,
    "Assisting the state fair butter sculptor|Ayudando al escultor de mantequilla de la feria estatal|Aider le sculpteur de beurre de la foire d'État|州フェアのバター彫刻家を手伝う",
    "The refrigerated glass case needed constant tending while the sculptor worked, keeping tools clean and the crowd from fogging the window with their breath, paid by the hour out of the fair's own budget. A life-size butter cow takes roughly a week of carving from a half-ton block kept just above freezing the whole time.|La vitrina refrigerada necesitaba atención constante mientras trabajaba el escultor, manteniendo las herramientas limpias y evitando que la gente empañara el cristal con su aliento, pagado por hora con el presupuesto de la propia feria.|La vitrine réfrigérée nécessitait une attention constante pendant que le sculpteur travaillait, gardant les outils propres et empêchant la foule d'embuer la vitre de son souffle, payé à l'heure sur le budget de la foire elle-même.|冷蔵ガラスケースは彫刻家が作業する間ずっと手入れが必要で、道具をきれいに保ち、群衆の息でガラスが曇らないよう気を配る仕事に、フェア自身の予算から時給が支払われた。等身大のバターの牛を彫るには、氷点をわずかに超える温度に保たれた半トンの塊からおよそ1週間かかる。",
    [4, 5],
  ),
  ev(
    "polar-vortex-heating-bill", "loss", ["mw"], "🥶", 200,
    "A polar vortex spikes the heating bill|Un vórtice polar dispara la factura de calefacción|Un vortex polaire fait grimper la facture de chauffage|寒波(ポーラーボルテックス)で暖房費が急騰する",
    "The furnace ran nearly nonstop for four straight days while the wind chill sat well below anything the forecast graphic had labels for, and the utility bill that arrived weeks later made the actual thermostat setting look almost reasonable by comparison. Whole school districts across the region call snow days for cold this severe, not just for snow.|La caldera funcionó casi sin parar durante cuatro días seguidos mientras la sensación térmica se hundía muy por debajo de lo que el gráfico del pronóstico llegaba a etiquetar, y la factura que llegó semanas después hizo que el termostato pareciera razonable en comparación.|La chaudière a tourné presque sans arrêt pendant quatre jours d'affilée tandis que le refroidissement éolien plongeait bien en dessous de tout ce que le graphique météo savait encore étiqueter, et la facture arrivée des semaines plus tard a rendu le réglage du thermostat presque raisonnable en comparaison.|体感温度が予報グラフの目盛りをはみ出すほど下がるなか、暖房は4日間ほぼ休みなく稼働し続けた。何週間か後に届いた光熱費の請求書を見ると、サーモスタットの設定温度のほうがまだましに思えるほどだった。この地域では雪ではなくこれほどの寒さそのものを理由に、学区丸ごと休校になることもある。",
    [8, 9, 10],
  ),

  // ---- plains 大平原・山岳部 ----
  ev(
    "wheat-harvest-help", "gain", ["plains"], "🌾", 230,
    "Helping bring in the wheat harvest|Ayudando a recoger la cosecha de trigo|Aider à rentrer la récolte de blé|小麦の収穫を手伝う",
    "A farmer racing a forecast storm needed an extra hand running the grain cart alongside the combine, paid a flat rate for the day since every hour before the rain mattered more than the wage itself. Custom harvest crews follow the wheat north from Texas to the Dakotas over the summer, working fields that belong to someone new almost every week.|Un agricultor que corría contra una tormenta pronosticada necesitaba una mano extra manejando el carro de grano junto a la cosechadora, pagado a tarifa fija por el día, ya que cada hora antes de la lluvia importaba más que el propio salario.|Un fermier qui courait contre un orage annoncé avait besoin d'un coup de main supplémentaire pour conduire la benne à grain à côté de la moissonneuse, payé à un tarif fixe pour la journée, chaque heure avant la pluie comptant plus que le salaire lui-même.|嵐の予報と競争していた農家は、コンバインと並走する穀物運搬車を動かす追加の手を求めていた。雨が降る前の一時間一時間が賃金そのものより重かったため、一日分の定額が支払われた。夏のあいだ、季節労働の収穫クルーはテキサスからダコタまで北上しながら小麦を追い、ほぼ毎週別の誰かの畑で働く。",
    [2, 3, 4],
  ),
  ev(
    "gravel-road-flat-tire", "loss", ["plains"], "🛞", 210,
    "A flat tire on a remote gravel road|Un pinchazo en un camino de grava remoto|Une crevaison sur une route de gravier isolée|人里離れた砂利道でパンクする",
    "The gravel road had looked shorter on the map than it felt after the second flat, and the nearest tow truck operator, reached by the only bar of signal on a fence-post rise, quoted a flat rate that assumed correctly nobody haggles from a ditch. Distances between towns out here are measured in hours as often as miles, and a spare tire is considered basic equipment, not an afterthought.|El camino de grava parecía más corto en el mapa de lo que resultó tras el segundo pinchazo, y el operador de la grúa más cercano, contactado con la única barra de señal en un poste de valla, cotizó una tarifa fija sabiendo que nadie regatea desde una cuneta.|La route de gravier paraissait plus courte sur la carte qu'elle ne l'a semblé après la deuxième crevaison, et le dépanneur le plus proche, joint grâce à la seule barre de réseau captée sur un piquet de clôture, a annoncé un tarif fixe en sachant bien que personne ne négocie depuis un fossé.|砂利道は地図で見るより、二度目のパンクを迎えたころには長く感じられた。フェンスの支柱の上でようやく一本立ったアンテナで連絡のついた最寄りのレッカー業者は、溝にはまった人間が値切れるはずもないと承知の上で定額料金を告げた。この一帯の町と町の距離は、マイルよりも時間で測られることが多く、予備タイヤは念のためではなく最低限の装備とされている。",
  ),

  // ---- sw 南西部 ----
  ev(
    "balloon-chase-crew", "gain", ["sw"], "🎈", 200,
    "Joining a hot-air balloon chase crew|Uniéndose a un equipo de persecución de globos aerostáticos|Rejoindre une équipe de poursuite de montgolfière|熱気球の追跡クルーに加わる",
    "A pilot short-staffed for a dawn launch needed someone in the chase truck to track the balloon by radio and be ready to help fold the envelope wherever it happened to land, paid for showing up before sunrise and staying until the basket was packed away. Where a balloon actually comes down is never quite the field anyone plans for.|Un piloto con poco personal para un lanzamiento al amanecer necesitaba a alguien en la camioneta de persecución para seguir el globo por radio y ayudar a plegar el envoltorio donde aterrizara, pagado por presentarse antes del amanecer.|Un pilote en sous-effectif pour un décollage à l'aube avait besoin de quelqu'un dans le camion de poursuite pour suivre le ballon par radio et aider à plier l'enveloppe là où il atterrirait, payé pour s'être présenté avant le lever du soleil.|夜明けの打ち上げで人手が足りなかった気球のパイロットは、追跡トラックに乗って無線で気球を追い、どこに降りようとその場で気球の生地を畳むのを手伝える人を求めていた。日の出前に来て、バスケットを片付け終えるまで残ったことに対して支払いがあった。気球が実際にどこへ降りるかは、誰の計画とも決して一致しない。",
    [5, 6],
  ),
  ev(
    "trailhead-tourist-guide", "gain", ["sw"], "🥾", 170,
    "Pointing lost tourists back to the trailhead|Guiando a turistas perdidos de vuelta al inicio del sendero|Ramener des touristes perdus jusqu'au départ du sentier|道に迷った観光客をトレイルヘッドまで案内する",
    "A family who had wandered well past the last trail marker chasing a better photo of the rock formations was visibly relieved to be walked back the right direction before the afternoon heat set in, and they insisted on pressing cash into a hand that had only meant to be polite. Desert trails can look identical in every direction once someone leaves the marked path.|Una familia que se había desviado bien más allá del último marcador del sendero persiguiendo una mejor foto de las formaciones rocosas se sintió visiblemente aliviada al ser guiada de vuelta antes de que llegara el calor de la tarde.|Une famille qui s'était bien éloignée du dernier repère du sentier pour photographier les formations rocheuses fut visiblement soulagée d'être raccompagnée dans la bonne direction avant que la chaleur de l'après-midi ne s'installe.|岩の造形をもっと良く撮ろうと最後のトレイル標識をだいぶ過ぎたところまで迷い込んでいた家族連れは、午後の暑さが本格化する前に正しい方向へ案内されて明らかにほっとした様子で、ただの親切のつもりだった手に強引にお金を握らせてきた。砂漠のトレイルは、いったん決められた道を外れるとどちらを向いても同じに見えることがある。",
    [4, 5, 6],
  ),
  ev(
    "desert-rental-breakdown", "loss", ["sw"], "🌡️", 230,
    "A rental car overheats in the desert|Un coche de alquiler se sobrecalienta en el desierto|Une voiture de location surchauffe dans le désert|レンタカーが砂漠で オーバーヒートする",
    "The temperature gauge climbed steadily on the long grade with the air conditioning running full blast against a sun that made the dashboard too hot to touch, and steam finally won the argument at a pull-off with no shade and one bar of cell signal. Rental companies in the region quietly expect a certain number of cars back every summer needing more than a wash.|El indicador de temperatura subió constantemente en la larga pendiente con el aire acondicionado a tope contra un sol que hacía el salpicadero demasiado caliente para tocar, y el vapor finalmente ganó la discusión en un apartadero sin sombra.|La jauge de température a grimpé régulièrement sur la longue montée, la climatisation poussée à fond contre un soleil qui rendait le tableau de bord trop chaud à toucher, et la vapeur a fini par l'emporter sur une aire sans ombre.|長い上り坂でエアコンを全開にしても、ダッシュボードに触れないほどの日差しに温度計はじわじわと上がり続け、日陰も電波も乏しい待避所でついに蒸気が勝負を決めた。この地方のレンタカー会社は、夏になると洗車以上の手当てが要る車が一定数戻ってくることを、内心では見越している。",
    [3, 4, 5],
  ),

  // ---- pacific 太平洋岸 ----
  ev(
    "farmers-market-stall-help", "gain", ["pacific"], "🥬", 190,
    "Helping run a farmers market stall|Ayudando a llevar un puesto del mercado de agricultores|Aider à tenir un stand de marché fermier|ファーマーズマーケットの屋台を手伝う",
    "A grower short a pair of hands for the Saturday market needed someone who could make change quickly and talk knowledgeably about which peaches were actually ripe versus which just looked that way under the tent lights, paid in cash at closing along with a box of whatever hadn't sold. Weekend farmers markets up and down the coast run rain or shine, year-round in the mildest stretches.|Un agricultor con pocas manos para el mercado del sábado necesitaba a alguien que pudiera dar el cambio rápido y hablar con conocimiento sobre qué melocotones estaban realmente maduros, pagado en efectivo al cierre junto con una caja de lo que no se hubiera vendido.|Un producteur en sous-effectif pour le marché du samedi avait besoin de quelqu'un capable de rendre la monnaie rapidement et de parler avec assurance des pêches vraiment mûres, payé en liquide à la fermeture avec une caisse de ce qui n'avait pas été vendu.|土曜の市場で人手が足りなかった生産者は、素早くお釣りを渡せて、どの桃が本当に熟れているか(テントの光の下で熟れて見えるだけのものとの違い)を分かっている人を求めていた。閉店時に現金払いに加え、売れ残った品の詰め合わせも渡された。海岸沿いのファーマーズマーケットは週末ごとに雨天決行で開かれ、温暖な地域では一年を通して続く。",
  ),
  ev(
    "wildfire-smoke-air-purifier", "loss", ["pacific"], "😷", 200,
    "Buying an air purifier during a smoke advisory|Comprando un purificador de aire durante una alerta por humo|Acheter un purificateur d'air pendant une alerte fumée|煙害警報のなか空気清浄機を買う",
    "The sky had turned an odd orange by mid-morning and the air quality index on every phone in the room climbed past the number where staying inside stopped being optional, so the last air purifier on the shelf at the hardware store went home at a price that would have seemed absurd the week before. Wildfire smoke can now drift far enough to blanket cities that never see the flames themselves.|El cielo se había vuelto de un extraño naranja a media mañana y el índice de calidad del aire en todos los teléfonos de la sala superó el número a partir del cual quedarse dentro dejaba de ser opcional, así que el último purificador de aire de la ferretería se fue a casa a un precio que la semana anterior habría parecido absurdo.|Le ciel avait pris une étrange teinte orange en milieu de matinée et l'indice de qualité de l'air sur tous les téléphones de la pièce dépassait le seuil à partir duquel rester à l'intérieur cessait d'être facultatif, si bien que le dernier purificateur d'air du magasin de bricolage est reparti à un prix qui aurait semblé absurde la semaine précédente.|午前も半ばを過ぎる頃には空が奇妙なオレンジ色に染まり、部屋にいる誰の携帯電話の大気質指数も、屋内に留まることがもはや選択肢ではなくなる数値を超えていた。金物店の棚に残っていた最後の空気清浄機は、前の週なら馬鹿げていると思えたはずの値段で持ち帰られることになった。山火事の煙はいまや、火そのものを一度も見ない都市にまで漂って広がることがある。",
    [4, 5],
  ),
];
