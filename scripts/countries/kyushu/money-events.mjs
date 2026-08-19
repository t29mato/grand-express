/**
 * 九州地方の青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: fuk=福岡 / sag=佐賀 / nag=長崎 / kum=熊本 /
 * toe=東九州(大分+宮崎) / kag=鹿児島(cities.mjsの地方区分と同じ)。
 *
 * **都市カード・アイテム・厄災で扱った大きな出来事(三池・端島・平戸・
 * 浦上・桜島・西九州新幹線の分断そのもの)はここでは繰り返さない。**
 * 代わりに、その土地で実際に起きる小さな出来事(祭りの手伝い・水揚げの
 * 手伝い・観光船の欠航・降灰の洗濯物)を軸にした。
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける。
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

export const KYUSHU_MONEY_EVENTS = [
  // ---- 九州どこでも・通年(4件) ----
  ev(
    "yamaboko-kazari", "gain", [], "🏮", 240,
    "Hired to help dress a festival float|Contratado para vestir una carroza festiva|Embauché pour habiller un char de fête|祭りの山車の飾り付けを手伝う",
    "Nearly every town in Kyūshū has some float, lantern or dragon festival of its own, and the week before it needs more hands than the neighbourhood has, tying cord and hanging paper long after dark. Nobody asks where you are from as long as you can tie a knot that holds.|Casi todo pueblo de Kyūshū tiene su propia carroza, farol o festival del dragón, y la semana previa necesita más manos de las que el barrio tiene, atando cuerdas y colgando papel hasta bien entrada la noche. Nadie pregunta de dónde eres si sabes atar un nudo que aguante.|Presque chaque ville du Kyūshū a son propre char, ses lanternes ou sa fête du dragon, et la semaine précédente réclame plus de bras que le quartier n'en a, à nouer des cordes et suspendre du papier bien après la nuit tombée. Personne ne demande d'où tu viens du moment que ton nœud tient.|九州のほとんどの町には山車か提灯か龍踊りの祭りがあり、その前の週は町内だけでは手が足りない。夜遅くまで縄を結び、紙を吊るす。結び目がほどけなければ、どこから来たかは誰も聞かない。",
  ),
  ev(
    "shochu-shiage", "gain", [], "🍶", 220,
    "Bottling the new season's shōchū|Embotellando el shōchū de la nueva temporada|Mettre en bouteille le shōchū de la nouvelle saison|新酒の焼酎を瓶詰めする",
    "A distillery short-handed at bottling time pays by the crate, and the smell of the still follows you home on your clothes for a day. Almost every town south of Kumamoto has at least one small distillery of its own, most of them family-run for generations.|Una destilería con falta de manos en el embotellado paga por caja, y el olor del alambique te sigue a casa en la ropa durante un día. Casi todo pueblo al sur de Kumamoto tiene al menos una pequeña destilería propia.|Une distillerie à court de bras au moment de l'embouteillage paie à la caisse, et l'odeur de l'alambic te suit chez toi sur tes vêtements pendant une journée. Presque chaque ville au sud de Kumamoto a au moins sa propre petite distillerie.|瓶詰めの人手が足りない蒸留所は箱単位で払ってくれるが、その日は蒸留所の匂いが服について家までついてくる。熊本より南のほとんどの町には、家族経営の小さな蒸留所が少なくとも一軒ある。",
  ),
  ev(
    "kazan-bai-sentaku", "loss", [], "🌋", 200,
    "Ash ruins the laundry on the line|La ceniza arruina la colada tendida|La cendre ruine le linge sur le fil|干した洗濯物が降灰で台無し",
    "A dusting of fine grey ash settled on everything hung out to dry while you were away, and the whole load has to be rewashed and paid for again at the coin laundry. In the towns nearest an active peak, people learn to check the wind before hanging anything out at all.|Un polvo fino de ceniza gris se posó sobre todo lo tendido mientras estabas fuera, y hay que lavarlo todo otra vez y pagarlo en la lavandería. En los pueblos más cercanos a un pico activo, la gente aprende a mirar el viento antes de tender nada.|Une fine poussière de cendre grise s'est déposée sur tout le linge étendu pendant ton absence, et il faut tout relaver et repayer à la laverie. Dans les villes les plus proches d'un sommet actif, on apprend à vérifier le vent avant d'étendre quoi que ce soit.|留守のあいだに干していた洗濯物すべてに細かい灰が積もり、コインランドリーでもう一度洗い直す羽目になった。活火山に近い町では、何かを干す前にまず風向きを確かめる癖がつく。",
  ),
  ev(
    "kansen-unkyu", "loss", [], "⛴️", 220,
    "The ferry is cancelled for the day|El ferry se cancela por el día|Le ferry est annulé pour la journée|フェリーがその日は欠航",
    "The crossing is called off for rough seas with no refund on the return leg already booked, and the only way on is to wait it out or pay again for tomorrow's boat. Kyūshū's coast and its outlying islands run on ferries that a bad swell can shut down without much warning.|La travesía se cancela por mar de fondo sin reembolso del tramo de vuelta ya reservado, y solo queda esperar o pagar de nuevo por el barco de mañana. La costa de Kyūshū y sus islas dependen de ferris que un mal oleaje puede detener sin mucho aviso.|La traversée est annulée pour cause de forte houle, sans remboursement du trajet retour déjà réservé, et il ne reste qu'à attendre ou repayer pour le bateau du lendemain. La côte du Kyūshū et ses îles dépendent de ferries qu'une mauvaise houle peut arrêter sans grand préavis.|うねりが高く、渡航は取りやめになった。すでに予約していた帰りぶんの払い戻しはない。待つか、明日の便にもう一度払うしかない。九州の海岸や離島の足はフェリーで、荒れればあまり前触れなく止まる。",
  ),

  // ---- 福岡(fuk) ----
  ev(
    "yamakasa-katsugite", "gain", ["fuk"], "🎏", 300,
    "Called in to shoulder the float|Llamado a cargar la carroza al hombro|Appelé à porter le char sur l'épaule|山を担ぐ人手に呼ばれる",
    "A neighbourhood team is short a shoulder for the pre-dawn run and pays in cash plus the kind of standing that lasts the rest of the year. The floats weigh close to a tonne stripped down for racing, and every team needs more men than it has on the actual morning.|Un equipo de barrio necesita un hombro más para la carrera antes del alba y paga en efectivo, además de un prestigio que dura el resto del año. Las carrozas pesan casi una tonelada reducidas para la carrera, y todo equipo necesita más hombres de los que tiene la mañana del evento.|Une équipe de quartier manque d'une épaule pour la course avant l'aube et paie en espèces, plus une reconnaissance qui dure le reste de l'année. Les chars pèsent près d'une tonne une fois allégés pour la course, et chaque équipe a besoin de plus d'hommes qu'elle n'en a le matin même.|町内の一団が夜明け前の走りに肩が足りず声をかけてきた。現金に加え、一年じゅう続く顔の広さも手に入る。競走用に軽くした山車でも重さは一トン近く、当日の朝はどの町も人手が足りない。",
    [3],
  ),
  ev(
    "orisokonai", "loss", ["fuk"], "🧵", 220,
    "A weaving slip ruins the silk|Un descuido en el telar arruina la seda|Une erreur au métier gâche la soie|織り損じで絹を無駄にする",
    "One wrong pass of the shuttle in the thick, ridged sash cloth used for kimono obi and the whole length has to be cut out and paid for at cost, silk being too dear to weave carelessly. The weave dates back some 770 years to a local trader who brought the technique home from Song-dynasty China, and its patterns are still set by hand, thread by thread.|Un solo paso erróneo de la lanzadera en la tela gruesa y acanalada de los obi de kimono obliga a cortar todo el tramo y pagarlo a precio de coste, pues la seda es demasiado cara para tejerla con descuido. La técnica se remonta unos 770 años a un comerciante local que la trajo de la China Song.|Un seul mauvais passage de la navette dans ce tissu épais et côtelé pour obi de kimono, et toute la longueur doit être découpée et payée à prix coûtant, la soie étant trop chère pour être tissée à la légère. La technique remonte à environ 770 ans, ramenée de Chine des Song par un marchand local.|着物の帯に使う厚く畝のある博多織は、杼を一度通し間違えただけでその区間を切り落とし、実費で弁償する羽目になる。絹は不注意に織るには高すぎる。この織り技法は約770年前、宋の中国から地元の商人が持ち帰ったもので、柄は今も一本一本、手で決めていく。",
  ),
  ev(
    "chikuho-honesuji", "loss", ["fuk"], "🚚", 220,
    "The old mine road caves in overnight|El viejo camino minero se hunde de noche|L'ancienne route minière s'effondre dans la nuit|旧炭鉱の道が夜のうちに陥没する",
    "A stretch of road built over a shallow mine tunnel gives way, and the detour through Chikuhō's back lanes adds an hour and a tank of fuel to what should have been a short run. It happens often enough that the local council keeps a standing budget for exactly this.|Un tramo de carretera construido sobre un túnel minero poco profundo cede, y el desvío por los caminos traseros de Chikuhō añade una hora y un depósito de gasolina a lo que debía ser un trayecto corto. Ocurre lo bastante a menudo como para que el ayuntamiento tenga un presupuesto fijo para esto.|Un tronçon de route bâti sur un tunnel de mine peu profond s'effondre, et le détour par les petites routes de Chikuhō ajoute une heure et un plein d'essence à ce qui devait être un court trajet. Cela arrive assez souvent pour que la mairie garde un budget permanent pour cela.|浅い坑道の上に敷かれた道の一部が陥没し、筑豊の裏道を迂回するはめになって、短いはずの道のりに一時間と満タン分の燃料がよけいにかかった。あまりに頻繁なので、町の予算にはこのための項目が常設されている。",
  ),

  // ---- 佐賀(sag) ----
  ev(
    "arita-tozukuri", "gain", ["sag"], "🏺", 260,
    "Loading kilns for the porcelain fair|Cargando hornos para la feria de porcelana|Charger les fours pour la foire de porcelaine|磁器市に向けて窯出しを手伝う",
    "Kilns across the town fire through the night before the spring ceramics fair, and someone is needed to carry the still-warm pieces to the stalls without a single chip. Buyers come from across the country for the one week when every workshop opens its seconds shelf.|Los hornos de todo el pueblo cuecen toda la noche antes de la feria cerámica de primavera, y hace falta quien lleve las piezas aún calientes a los puestos sin una sola mella. Los compradores llegan de todo el país para la única semana en que todos los talleres abren su estante de segundas.|Les fours de toute la ville cuisent toute la nuit avant la foire de céramique du printemps, et il faut quelqu'un pour porter les pièces encore chaudes jusqu'aux étals sans une seule ébréchure. Les acheteurs viennent de tout le pays pour l'unique semaine où chaque atelier ouvre son étagère de seconds choix.|春の陶器市を前に、町じゅうの窯が一晩じゅう焚かれる。まだ温かい器を一つも欠けさせず露店まで運ぶ人手が要る。どの工房も規格外品の棚を開くこの一週間だけ、買い手が全国から集まる。",
    [0],
  ),
  ev(
    "yoshinogari-hakkutsu", "gain", ["sag"], "🏺", 220,
    "A dig site pays for careful hands|Un yacimiento paga por manos cuidadosas|Un chantier de fouilles paie pour des mains soigneuses|発掘現場が丁寧な手を求める",
    "The excavation is short of people who can sift soil without rushing, and a season's work here means brushing dirt off things nobody has touched in some two thousand years. Half the interest is finding out what turns up; the other half is the pay, which is steady.|Al yacimiento le faltan manos que criben la tierra sin prisa, y una temporada aquí significa cepillar tierra de cosas que nadie ha tocado en unos dos mil años. Parte del interés está en lo que aparece; la otra parte es la paga, que es constante.|Le chantier manque de mains capables de tamiser la terre sans se presser, et une saison ici, c'est épousseter des objets que personne n'a touchés depuis quelque deux mille ans. La moitié de l'intérêt, c'est ce qu'on trouve ; l'autre moitié, c'est la paie, régulière.|発掘現場は土を急がず篩える人手を求めている。ここでの一季節は、およそ二千年誰も触れていないものの土を筆で払う仕事になる。何が出るかという興味と、安定した日当と、半々の魅力である。",
  ),
  ev(
    "ariake-kaigan-jiban", "loss", ["sag"], "🌊", 200,
    "The reclaimed land settles again|La tierra ganada al mar vuelve a hundirse|La terre gagnée sur la mer s'affaisse encore|干拓地がまた沈む",
    "Land built out of tidal mud never quite stops settling, and a warehouse floor a centimetre out of level cracks the stock stacked against the wall. Everyone who farms or builds on the reclaimed flats budgets for this the way others budget for rent.|La tierra ganada al barro de marea nunca deja de asentarse del todo, y un centímetro de desnivel en el suelo de un almacén agrieta el género apilado contra la pared. Todo el que cultiva o construye en el fangal ganado presupuesta esto igual que otros presupuestan el alquiler.|Une terre gagnée sur la vase de marée ne cesse jamais tout à fait de s'affaisser, et un centimètre de dénivelé sur le sol d'un entrepôt fissure le stock empilé contre le mur. Quiconque cultive ou bâtit sur les terres gagnées budgète cela comme d'autres budgètent le loyer.|潟の泥から作った土地は沈むのが完全には止まらない。倉庫の床がわずか1センチ傾いただけで、壁際に積んだ在庫にひびが入った。干拓地で耕す者も建てる者も、これを家賃と同じように織り込んで暮らしている。",
  ),

  // ---- 長崎(nag) ----
  ev(
    "champon-tetsudai", "gain", ["nag"], "🍜", 240,
    "The noodle shop needs an extra pair of hands|La tienda de fideos necesita otro par de manos|Le restaurant de nouilles a besoin de bras en plus|ちゃんぽん屋が助っ人を探している",
    "A dish born from feeding hungry Chinese students on a tight budget still uses whatever the market had that morning, and a kitchen swamped by a cruise-ship crowd pays well for someone who can chop fast. The bowl still owes its shape to the port that made it necessary.|Un plato nacido para alimentar con poco presupuesto a estudiantes chinos hambrientos aún usa lo que hubiera esa mañana en el mercado, y una cocina desbordada por un grupo de crucero paga bien a quien corte rápido. El plato aún debe su forma al puerto que lo hizo necesario.|Un plat né pour nourrir à petit budget des étudiants chinois affamés utilise encore ce que le marché avait ce matin-là, et une cuisine débordée par un groupe de croisiéristes paie bien qui coupe vite. Le bol doit toujours sa forme au port qui l'a rendu nécessaire.|限られた予算で腹を空かせた中国人留学生に食べさせるために生まれたこの料理は、今も朝の市場にあったもので作る。クルーズ船の団体で混み合った厨房は、手早く刻める人を高く雇う。この一杯の形は、それを必要とした港のかたちそのものである。",
  ),
  ev(
    "kensa-ochi", "loss", ["nag"], "🐟", 200,
    "The catch is downgraded at inspection|La pesca es rebajada en la inspección|La prise est déclassée à l'inspection|水揚げが検査で等級を落とされる",
    "A net that looked full at dawn turns out to be mostly a single low-value species, and the auction price falls well short of what the morning's fuel and ice cost. Nagasaki's ports land more different kinds of fish than almost anywhere else in Japan, which cuts both ways when one boat's haul is not the right kind.|Una red que parecía llena al alba resulta ser sobre todo una sola especie de poco valor, y el precio de subasta queda muy por debajo de lo que costaron el combustible y el hielo de la mañana. Los puertos de Nagasaki desembarcan más variedades de pescado que casi ningún otro lugar de Japón, lo que juega en contra cuando la captura de un barco no es la adecuada.|Un filet qui semblait plein à l'aube s'avère surtout composé d'une seule espèce de faible valeur, et le prix de la criée reste bien en deçà de ce qu'ont coûté le carburant et la glace du matin. Les ports de Nagasaki débarquent plus d'espèces de poissons que presque partout ailleurs au Japon, ce qui joue aussi contre le pêcheur quand sa prise n'est pas la bonne.|夜明けには満杯に見えた網の中身は、ほとんどが値の付かない一種類だけだったとわかり、競りの値は朝の燃料と氷の代さえ賄えなかった。長崎の港は日本でも指折りの魚種の多さを誇るが、それは狙った種でなかったときには不利にも働く。",
  ),

  // ---- 熊本(kum) ----
  ev(
    "kumamon-kigurumi", "gain", ["kum"], "🐻", 260,
    "Hired inside the bear costume for the day|Contratado dentro del disfraz de oso por el día|Embauché dans le costume d'ours pour la journée|着ぐるみの中で一日働く",
    "An event needs someone the right height inside the prefecture's black bear mascot costume, and the pay is decent for an afternoon of not being able to see your own feet. The character has become one of the most recognised local mascots in the country since its 2010 debut.|Un evento necesita a alguien de la altura justa dentro del disfraz del oso negro mascota de la prefectura, y la paga es decente por una tarde sin poder verse los propios pies. El personaje se ha vuelto una de las mascotas locales más reconocidas del país desde su debut en 2010.|Un événement a besoin de quelqu'un de la bonne taille dans le costume de l'ours noir, mascotte de la préfecture, et la paie est correcte pour un après-midi sans voir ses propres pieds. Le personnage est devenu l'une des mascottes locales les plus reconnues du pays depuis ses débuts en 2010.|イベントで、県のマスコットの黒い熊の着ぐるみに入れる背丈の人が求められた。自分の足元も見えない午後だが、日当は悪くない。2010年のデビュー以来、全国でも指折りの知名度を持つご当地キャラになっている。",
  ),
  ev(
    "kariboshi-nouhaba", "loss", ["kum"], "🐄", 220,
    "The grazing herd wanders off during the burn|El rebaño se dispersa durante la quema|Le troupeau s'égaille pendant le brûlis|野焼きの最中に牛が迷い出る",
    "Smoke from the spring grassland fire spooks part of the herd before the firebreak is fully cut, and the afternoon goes to finding cattle instead of tending the flame. It is a routine risk of a routine the caldera's grazing has kept up for over a thousand years.|El humo de la quema de primavera asusta a parte del rebaño antes de terminar el cortafuego, y la tarde se va buscando vacas en vez de cuidando el fuego. Es un riesgo habitual de una faena que el pastoreo de la caldera mantiene desde hace más de mil años.|La fumée du brûlis de printemps effraie une partie du troupeau avant que le pare-feu ne soit totalement dégagé, et l'après-midi se passe à chercher des bêtes plutôt qu'à surveiller le feu. C'est un risque habituel d'une corvée que le pâturage de la caldeira perpétue depuis plus de mille ans.|防火帯を切り終える前に春の野焼きの煙が牛の群れの一部を驚かせ、午後は火の番ではなく牛探しに費やされた。千年以上続くカルデラの放牧が抱える、ありふれた危険である。",
    [11],
  ),

  // ---- 東九州(toe。大分+宮崎) ----
  ev(
    "onsen-jigoku-annai", "gain", ["toe"], "♨️", 200,
    "Guiding tourists between the boiling pools|Guiando turistas entre las pozas hirvientes|Guider des touristes entre les bassins bouillants|沸き立つ湯を案内して回る",
    "A tour group needs someone who knows which of the coloured hot pools are safe to stand near and which are not, and the tips are decent for an afternoon spent not falling in. Some of these springs run hot enough to cook an egg in a few minutes flat.|Un grupo turístico necesita a alguien que sepa cerca de qué pozas de colores es seguro estar y de cuáles no, y las propinas son decentes por una tarde sin caerse dentro. Algunas de estas fuentes hierven lo bastante como para cocer un huevo en pocos minutos.|Un groupe de touristes a besoin de quelqu'un qui sache près de quels bassins colorés on peut s'approcher sans danger, et les pourboires sont corrects pour un après-midi sans tomber dedans. Certaines de ces sources bouillent assez fort pour cuire un œuf en quelques minutes.|色とりどりの温泉のどれに近づいて安全でどれが危ないかを知る案内人が求められた。落ちさえしなければ、午後のチップは悪くない。中には数分で卵をゆでられるほど沸いている湯もある。",
  ),
  ev(
    "ikada-kudakeru", "loss", ["toe"], "🪵", 220,
    "The timber raft breaks apart on the river|La balsa de madera se rompe en el río|Le radeau de bois se disloque sur la rivière|材木の筏が川で崩れる",
    "A rope gives way on a bend and the raft of cedar logs cut upstream scatters into the current, and whatever cannot be recaught downstream comes out of the crew's pay. The trade has run this river for so long that the merchant district's warehouses still face the water, not the road, but the water does not always cooperate.|Una cuerda cede en una curva y la balsa de troncos de cedro talados río arriba se dispersa en la corriente, y lo que no se recupera aguas abajo sale de la paga de la cuadrilla. El oficio lleva tanto tiempo en este río que los almacenes del barrio mercantil aún miran al agua, no a la carretera, pero el agua no siempre coopera.|Une corde cède dans un virage et le radeau de cèdre coupé en amont se disperse dans le courant, et ce qui n'est pas rattrapé en aval est retenu sur la paie de l'équipe. Le commerce dure sur cette rivière depuis si longtemps que les entrepôts du quartier marchand font encore face à l'eau, non à la route, mais l'eau ne coopère pas toujours.|曲がり角で綱が切れ、上流で伐った杉の筏が流れにばらけてしまい、下流で拾い切れなかった分は組の日当から引かれる。この商いがあまりに長く川とともにあったため、商家の蔵は今も道ではなく水のほうを向いているが、水はいつも味方するとは限らない。",
  ),

  ev(
    "shochu-kojiya", "gain", ["toe"], "🍠", 240,
    "A malting room needs a night watch|Una sala de malteado necesita vigilancia nocturna|Une salle de maltage a besoin d'une garde de nuit|麹室の夜番を頼まれる",
    "The koji mould that turns steamed sweet potato into the base of shōchū has to be checked through the night for temperature, and the distillery pays well for someone willing to stay awake and keep it from overheating. Miss the window by an hour and the whole batch turns.|El moho koji que convierte el boniato al vapor en base de shōchū hay que vigilarlo toda la noche por su temperatura, y la destilería paga bien a quien esté dispuesto a no dormir y evitar que se recaliente. Si se pasa la ventana una hora, el lote entero se echa a perder.|Le moisi koji qui transforme la patate douce cuite à la vapeur en base de shōchū doit être surveillé toute la nuit pour sa température, et la distillerie paie bien qui accepte de rester éveillé pour éviter la surchauffe. Rater la fenêtre d'une heure et tout le lot est perdu.|蒸した芋を焼酎のもとに変える麹は一晩じゅう温度を見張らねばならず、蒸留所は起きていて過熱を防げる人を高く雇う。一時間でも見過ごせば、その一仕込みがまるごと駄目になる。",
    [6],
  ),
  ev(
    "taifu-sonshitsu-miyazaki", "loss", ["toe"], "🌀", 240,
    "The mango greenhouse loses its roof|El invernadero de mangos pierde el techo|La serre à mangues perd son toit|マンゴー温室の屋根が飛ぶ",
    "A typhoon crossing the coast peels the plastic sheeting off a greenhouse overnight, and every fruit inside has to be picked early and sold cheap before the sun finishes the job. The farm carries insurance for exactly this, but the paperwork never moves as fast as the weather.|Un tifón que cruza la costa arranca el plástico de un invernadero durante la noche, y hay que recoger toda la fruta antes de tiempo y venderla barata antes de que el sol termine el trabajo. La granja tiene seguro justo para esto, pero el papeleo nunca va tan rápido como el tiempo.|Un typhon traversant la côte arrache la bâche plastique d'une serre pendant la nuit, et il faut cueillir tous les fruits en avance et les vendre bon marché avant que le soleil ne finisse le travail. La ferme est assurée pour exactement cela, mais la paperasse ne va jamais aussi vite que le temps.|沿岸を通った台風が一晩でビニールハウスの覆いを剥いでしまい、日差しが仕事を終わらせる前に中の実をすべて早採りして安く売るしかなくなった。農家はこのために保険をかけているが、書類の手続きは天気ほど速くは進まない。",
    [4, 5],
  ),

  // ---- 鹿児島(kag) ----
  ev(
    "karaimo-kakiage", "gain", ["kag"], "🍠", 220,
    "Digging the volcanic-soil sweet potato|Cavando el boniato del suelo volcánico|Déterrer la patate douce du sol volcanique|火山灰土のさつまいもを掘る",
    "A farm behind on the harvest before the next rain pays by the crate for anyone who can dig without cutting the tubers, and the loose ash soil at least makes the digging easier than clay ever would. Nearly every one of these fields will end up in a still eventually.|Una granja atrasada en la cosecha antes de la próxima lluvia paga por caja a quien pueda cavar sin cortar los tubérculos, y la suelta tierra de ceniza al menos facilita cavar más que la arcilla. Casi todos estos campos acabarán en un alambique tarde o temprano.|Une ferme en retard sur la récolte avant la prochaine pluie paie à la caisse quiconque sait creuser sans couper les tubercules, et le sol meuble de cendres facilite au moins le creusage plus que ne le ferait de l'argile. Presque tous ces champs finiront un jour dans un alambic.|次の雨の前に収穫を終えたい農家が、芋を傷つけずに掘れる人をかご単位で雇っている。ゆるい火山灰の土は、粘土質よりは少なくとも掘りやすい。この畑のほとんどは、いずれ蒸留所へ向かう。",
    [6, 7],
  ),
  ev(
    "kokuhaibukuro-shukashuu", "loss", ["kag"], "🌋", 200,
    "A heavier ash fall than the bags can hold|Una caída de ceniza mayor de lo que caben las bolsas|Une chute de cendres plus lourde que les sacs ne peuvent en contenir|克灰袋が足りないほどの降灰",
    "A stronger eruption than usual leaves more ash than the free collection bags can hold, and the extra has to be bagged in what you can buy at your own cost until the next truck comes round. On a bad week the routine of sweeping and bagging eats an hour every morning.|Una erupción más fuerte de lo habitual deja más ceniza de la que caben en las bolsas gratuitas, y el resto hay que embolsarlo a tu costa hasta que pase el próximo camión. En una mala semana, la rutina de barrer y embolsar consume una hora cada mañana.|Une éruption plus forte que d'habitude laisse plus de cendres que les sacs gratuits ne peuvent en contenir, et le surplus doit être ensaché à ses frais jusqu'au passage du prochain camion. Une mauvaise semaine, la routine de balayage et d'ensachage dévore une heure chaque matin.|いつもより強い噴火で、無料の克灰袋に入りきらないほどの灰が積もり、あふれた分は次の収集車が来るまで自費で買った袋に詰めるしかない。悪い週は、掃いて詰めるだけの日課に毎朝一時間取られる。",
  ),
];
