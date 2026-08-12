/**
 * イタリアの青マス・赤マスで起きる出来事(20件。増12・減8)。
 *
 * 地方コード: nov=北西 / nes=北東 / cen=中部 / sud=南部 / sic=シチリア / sar=サルデーニャ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、北西・北東・中部・南部の4地方には各3件(増2・減1)、
 * シチリア・サルデーニャには各2件(増1・減1)を、季節や祭りに
 * 結びつけて置いている。**地方ごとの `gains`/`losses` は、その地方の
 * 出来事だけで増・減の両方が引けることを個別に確認済み**
 * (全国共通の4件に頼らなくても成り立つ)。
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

export const ITALY_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "comparsa-film", "gain", [], "🎬", 220,
    "A day as a film extra|Un día como extra de cine|Une journée comme figurant de cinéma|映画のエキストラで一日働く",
    "A production scouting the piazza needed bodies to fill the background for a crowd scene, and standing around in period costume for six hours paid better than it looked. Italy's film and television industry shoots constantly outside the big studios, and small towns keep informal lists of locals willing to be called on short notice.|Una producción que buscaba localizaciones en la plaza necesitaba gente para llenar el fondo de una escena de multitud, y pasarse seis horas de pie con vestuario de época pagó mejor de lo que parecía. La industria del cine y la televisión italiana rueda constantemente fuera de los grandes estudios.|Une production en repérage sur la place avait besoin de figurants pour remplir l'arrière-plan d'une scène de foule, et rester debout six heures en costume d'époque a payé mieux qu'il n'y paraissait. Le cinéma et la télévision italiens tournent sans cesse hors des grands studios.|広場でロケハンをしていた撮影隊が、群衆シーンの背景を埋める人手を求めていた。時代衣装で6時間突っ立っているだけの仕事だったが、見た目より実入りは良かった。イタリアの映画・テレビ業界は大きな撮影所の外でも絶えず撮影しており、小さな町でも急な呼び出しに応じる地元の人の名簿を非公式に持っていることが多い。",
  ),
  ev(
    "gelateria-turno", "gain", [], "🍨", 200,
    "Covering a shift at a gelateria|Cubriendo un turno en una heladería|Assurer un service à la gelateria|ジェラート屋の店番を代わる",
    "The usual scooper had a family emergency and the queue was already out the door, so an hour spent learning which flavours went with which was paid in cash at closing. Every town of any size has at least one gelateria that considers itself the best in the region, and most will not say so quietly.|Al heladero habitual le surgió una emergencia familiar y la cola ya llegaba a la puerta, así que una hora aprendiendo qué sabores combinaban se pagó en efectivo al cerrar. Todo pueblo de cierto tamaño tiene al menos una heladería que se cree la mejor de la región.|Le glacier habituel a eu un empêchement familial et la queue débordait déjà sur le trottoir, alors une heure passée à apprendre quels parfums allaient ensemble a été payée en liquide à la fermeture. Toute ville d'une certaine taille compte au moins une gelateria qui se croit la meilleure de la région.|いつもの店員が急な家族の用事で来られず、行列はすでに店の外まで延びていた。どの味とどの味が合うかを覚えながら過ごした1時間は、閉店時に現金で支払われた。ある程度の大きさの町にはたいてい、自分こそが地方一だと思っているジェラート屋が少なくとも一軒はある。",
  ),
  ev(
    "ztl-multa", "loss", [], "🚫", 180,
    "A camera-issued fine for entering a restricted zone|Una multa por cámara al entrar en una zona restringida|Une amende par caméra pour être entré dans une zone restreinte|カメラ制限区域への進入で罰金",
    "The historic centre's ZTL gate looked like an ordinary street until a camera overhead read the plate and logged the crossing, and the fine arrived by mail weeks later with no warning in between. Nearly every Italian city with a medieval core enforces one of these zones, and hotel car parks are the safest way to avoid them entirely.|La puerta de la ZTL del centro histórico parecía una calle cualquiera hasta que una cámara arriba leyó la matrícula y registró el paso, y la multa llegó por correo semanas después sin aviso previo. Casi toda ciudad italiana con casco medieval aplica una de estas zonas.|La porte de la ZTL du centre historique ressemblait à une rue ordinaire jusqu'à ce qu'une caméra en hauteur lise la plaque et enregistre le passage, et l'amende est arrivée par courrier des semaines plus tard sans avertissement entre-temps. Presque toute ville italienne au cœur médiéval applique une de ces zones.|旧市街のZTL(交通制限区域)のゲートはふつうの通りに見えたが、頭上のカメラがナンバーを読み取って通行を記録しており、何週間も後になって前触れもなく罰金が郵送されてきた。中世の中心街を持つイタリアの町のほとんどがこうした区域を設けており、ホテルの駐車場に入れておくのが確実に避ける方法である。",
  ),
  ev(
    "carte-perse", "loss", [], "🃏", 160,
    "A losing streak at scopa in the bar|Una racha perdedora jugando a la escoba en el bar|Une série de défaites à la scopa au bar|バールでのスコパの勝負に負け続ける",
    "The regulars at the corner table invited a stranger to make up a fourth, and the small coins on the table added up faster than the rules ever quite made sense. Card games like scopa and briscola are played everywhere from village bars to beach umbrellas, usually for stakes too small to really call gambling — usually.|Los habituales de la mesa del rincón invitaron a un desconocido a completar la cuarta mano, y las monedas pequeñas sobre la mesa se acumularon más rápido de lo que las reglas llegaron a tener sentido. Juegos de cartas como la escoba y la briscola se juegan en todas partes, casi siempre por apuestas demasiado pequeñas para llamarlo apuesta —casi siempre.|Les habitués de la table du coin ont invité un inconnu à compléter la partie à quatre, et les petites pièces sur la table se sont accumulées plus vite que les règles n'ont jamais vraiment eu de sens. Des jeux de cartes comme la scopa et la briscola se jouent partout, presque toujours pour des mises trop faibles pour parler de jeu d'argent — presque toujours.|奥の席の常連たちが、四人目が必要だと見知らぬ客を誘い込んだ。テーブルの上の小銭は、ルールをちゃんと理解する前に思ったより早く積み上がっていった。スコパやブリスコラのようなカードゲームは村のバールからビーチのパラソルの下まであちこちで打たれ、たいていは賭けと呼ぶには小さすぎる額だが――たいていは。",
  ),

  // ---- nov 北西 ----
  ev(
    "alba-tartufo-lotta", "gain", ["nov"], "🐕", 260,
    "Helping carry the day's truffle haul|Ayudando a cargar la cosecha de trufas del día|Aider à porter la récolte de truffes du jour|その日のトリュフの収穫を運ぶのを手伝う",
    "A trifolau needed a spare pair of hands to carry baskets back from the oak woods while the dog kept working, paid by the hour rather than by weight since the actual finds stayed strictly the hunter's business. The best truffle grounds are family secrets passed down and never marked on any map.|Un trifolau necesitaba manos extra para llevar los cestos desde el robledal mientras el perro seguía trabajando, pagado por hora y no por peso, ya que los hallazgos seguían siendo estrictamente asunto del cazador. Los mejores terrenos truferos son secretos de familia que nunca aparecen en ningún mapa.|Un trifolau avait besoin d'un coup de main pour rapporter les paniers depuis la chênaie pendant que le chien continuait à travailler, payé à l'heure et non au poids, les trouvailles restant strictement l'affaire du chasseur. Les meilleurs terrains à truffes sont des secrets de famille jamais marqués sur aucune carte.|トリフォラウ(トリュフ猟師)が、犬が働き続けるあいだにオークの林から籠を運び戻す手を求めていた。実際に見つかった量は猟師だけの秘密なので、重さではなく時間で払われた。最良のトリュフの採れる場所は代々受け継がれる家族の秘密で、どんな地図にも記されない。",
    [6, 7],
  ),
  ev(
    "sfilata-backstage", "gain", ["nov"], "👗", 240,
    "Steaming clothes backstage at a fashion show|Planchando al vapor tras bambalinas de un desfile|Défroisser des vêtements en coulisses d'un défilé|ファッションショーの舞台裏で衣装のしわを伸ばす",
    "A Milan showroom short on dressers for fashion week paid well for anyone who could work a steamer fast and stay invisible while models changed in under ninety seconds between looks. The city runs two of these weeks a year, and half the temporary jobs they create never get advertised anywhere.|Un showroom milanés escaso de personal de vestuario para la semana de la moda pagó bien por quien supiera manejar rápido la plancha de vapor. La ciudad organiza dos de estas semanas al año, y la mitad de los empleos temporales que crea nunca se anuncian en ningún sitio.|Un showroom milanais manquant d'habilleurs pour la fashion week a bien payé quiconque savait manier vite le défroisseur vapeur tout en restant invisible pendant que les mannequins changeaient en moins de quatre-vingt-dix secondes. La ville organise deux de ces semaines par an.|ファッションウィークで衣装係が足りなかったミラノのショールームは、スチーマーを手早く扱い、モデルが90秒足らずで着替えるあいだ目立たずにいられる人を高く買った。この町では年に二度このイベントが開かれ、そこで生まれる臨時の仕事の半分はどこにも公募されない。",
    [1, 6],
  ),
  ev(
    "strada-stretta-graffio", "loss", ["nov"], "🚗", 220,
    "A rental car scraped on a Ligurian coast road|Un coche de alquiler rozado en una carretera de la costa de Liguria|Une voiture de location éraflée sur une route côtière ligure|リグーリアの海岸道路でレンタカーをこする",
    "The coast road out to the villages was narrower than the map made it look, and a stone wall protecting somebody's lemon terrace came off better than the wing mirror did. Insurance excess on a rental this small is rarely worth arguing about at the counter.|La carretera costera hacia los pueblos era más estrecha de lo que parecía en el mapa, y un muro de piedra que protegía la terraza de limoneros de alguien salió mejor parado que el retrovisor. La franquicia del seguro en un coche tan pequeño rara vez merece discutirla en el mostrador.|La route côtière vers les villages était plus étroite qu'elle n'y paraissait sur la carte, et un muret protégeant la terrasse à citrons de quelqu'un s'en est mieux sorti que le rétroviseur. La franchise d'assurance sur une si petite voiture ne vaut guère la peine d'être discutée au comptoir.|村々へ続く海岸道路は地図で見るより狭く、誰かのレモン畑の段々を守る石垣のほうがドアミラーより無傷で済んだ。これほど小さいレンタカーの保険免責分は、窓口で言い争うほどの額でもない。",
  ),

  // ---- nes 北東 ----
  ev(
    "maschere-carnevale", "gain", ["nes"], "🎭", 260,
    "Painting masks for Carnevale|Pintando máscaras para el Carnaval|Peindre des masques pour le Carnaval|カーニバルの仮面に彩色する",
    "A mask workshop swamped with orders before Carnevale paid by the piece for anyone steady-handed enough to add gold leaf without smudging it, and the backlog of half-finished faces never seemed to shrink. Venice's carnival masks were originally worn to let nobles gamble and mingle without being recognised.|Un taller de máscaras desbordado de pedidos antes del Carnaval pagaba por pieza a quien tuviera mano firme para aplicar pan de oro sin mancharlo, y la pila de caras a medio terminar nunca parecía menguar. Las máscaras del carnaval veneciano se llevaban originalmente para que los nobles jugaran y se mezclaran sin ser reconocidos.|Un atelier de masques débordé de commandes avant le Carnaval payait à la pièce quiconque avait la main assez sûre pour poser la feuille d'or sans la maculer, et la pile de visages à moitié finis ne semblait jamais diminuer. Les masques du carnaval vénitien étaient à l'origine portés pour que les nobles jouent et se mêlent sans être reconnus.|カーニバル前で注文が殺到した仮面工房は、金箔を汚さず貼れる手先の器用な人に出来高で払った。仕上がりかけの面の山はいつまでも減らないように見えた。ヴェネツィアのカーニバルの仮面はもともと、貴族が正体を隠して賭け事や社交を楽しむために着けたものだった。",
    [10],
  ),
  ev(
    "laurea-festa", "gain", ["nes"], "🎓", 230,
    "Waiting tables at a graduation party|Sirviendo mesas en una fiesta de graduación|Servir les tables lors d'une fête de remise de diplôme|卒業パーティーで給仕をする",
    "Bologna's students celebrate finishing a degree with a raucous public party involving a crude poem read aloud and a laurel crown, and the restaurant hosting the after-dinner needed extra hands who wouldn't flinch at the noise. The oldest university in the world produces a fresh crop of these parties nearly every week of the academic year.|Los estudiantes de Bolonia celebran acabar la carrera con una fiesta pública ruidosa que incluye un poema burlesco leído en voz alta y una corona de laurel, y el restaurante que acogía la cena necesitaba manos extra que no se inmutaran con el ruido.|Les étudiants de Bologne fêtent la fin de leurs études par une fête publique bruyante avec un poème burlesque lu à voix haute et une couronne de laurier, et le restaurant accueillant le dîner avait besoin de bras qui ne s'affoleraient pas du bruit.|ボローニャの学生は卒業を、下品な詩を大声で読み上げ月桂冠をかぶるという賑やかな公開の祝いで祝う。その後の食事会を受け持つレストランは、騒がしさにひるまない追加の人手を求めていた。世界最古のこの大学では、学年中ほぼ毎週のようにこうした祝いが新たに生まれる。",
  ),
  ev(
    "vaporetto-biglietto", "loss", ["nes"], "🎫", 200,
    "An unvalidated vaporetto ticket|Un billete de vaporetto sin validar|Un billet de vaporetto non validé|水上バスの切符を刻印し忘れる",
    "The water bus was crowded enough that reaching the validation machine at the back took longer than expected, and an inspector boarded at the very next stop asking to see a stamped ticket that didn't exist. Venice's public boats run the same fare-checking system as any bus, water underfoot or not.|El autobús acuático iba tan lleno que llegar a la máquina validadora del fondo llevó más de lo previsto, y un inspector subió justo en la siguiente parada pidiendo ver un billete sellado que no existía. Los barcos públicos de Venecia aplican el mismo control de billetes que cualquier autobús.|Le bateau-bus était si bondé qu'atteindre le composteur au fond a pris plus de temps que prévu, et un contrôleur est monté à l'arrêt suivant pour réclamer un billet composté qui n'existait pas. Les bateaux publics de Venise appliquent le même contrôle des titres que n'importe quel bus.|水上バスは混み合っていて、後方の刻印機にたどり着くのに思ったより時間がかかった。次の停留所ですぐに検札係が乗り込み、存在しない刻印済みの切符を求めてきた。ヴェネツィアの公共の船も、足元が水であること以外はふつうのバスと同じ検札の仕組みで動いている。",
  ),

  // ---- cen 中部 ----
  ev(
    "vendemmia-raccolta", "gain", ["cen"], "🍇", 250,
    "Picking grapes for the harvest|Recogiendo uvas para la vendimia|Cueillir le raisin pour les vendanges|収穫のぶどう摘みをする",
    "A Chianti estate short on pickers before an incoming storm paid a flat rate per full crate, and racing the weather down the rows left hands stained purple for days afterward. The exact start date of the vendemmia is decided field by field, based on sugar readings taken from the grapes themselves.|Una finca del Chianti, escasa de recolectores antes de una tormenta que se acercaba, pagaba una tarifa fija por cada cajón lleno, y correr contra el tiempo dejó las manos moradas durante días. La fecha exacta de inicio de la vendimia se decide campo a campo, según las mediciones de azúcar de las propias uvas.|Un domaine du Chianti manquant de vendangeurs avant l'arrivée d'un orage payait un tarif fixe par caisse pleine, et la course contre le temps a laissé les mains violettes pendant des jours. La date exacte du début des vendanges se décide parcelle par parcelle, selon le taux de sucre relevé sur les raisins eux-mêmes.|嵐が近づく中、収穫の手が足りなかったキャンティのぶどう園は、満杯にした籠一つごとに定額を払った。天候と競いながら畝を回った手は、その後何日も紫に染まったままだった。収穫(ヴェンデンミア)の正確な開始日は畑ごとに決められ、ぶどうそのものから測る糖度が基準になる。",
    [5, 6],
  ),
  ev(
    "guida-mancia", "gain", ["cen"], "🏛️", 240,
    "A generous tip for an impromptu tour|Una propina generosa por una visita guiada improvisada|Un généreux pourboire pour une visite improvisée|即興の案内にたっぷりのチップをもらう",
    "A confused family circling the same block near the ruins accepted directions and then a full explanation of what they were looking at, and the tip at the end was worth more than the twenty minutes it took. Rome has more licensed guides than most cities have taxi drivers, but plenty of visitors never book one.|Una familia desorientada que daba vueltas por la misma manzana cerca de las ruinas aceptó indicaciones y luego una explicación completa de lo que veían, y la propina al final valió más que los veinte minutos que costó. Roma tiene más guías licenciados que taxistas tiene la mayoría de ciudades.|Une famille perdue qui tournait en rond près des ruines a accepté des indications puis une explication complète de ce qu'elle regardait, et le pourboire final valait plus que les vingt minutes que cela avait pris. Rome compte plus de guides agréés que la plupart des villes n'ont de chauffeurs de taxi.|遺跡の近くで同じ区画をぐるぐる回っていた家族連れに道を教え、さらに目の前にあるものの由来をひととおり説明してやった。最後にもらったチップは、費やした20分より値打ちがあった。ローマには多くの都市のタクシー運転手より多い数の公認ガイドがいるが、それでも予約せずに来る観光客は少なくない。",
  ),
  ev(
    "scavo-metro-catalogazione", "gain", ["cen"], "🏺", 240,
    "Paid to catalogue finds at a stalled subway dig|Pagado por catalogar hallazgos en unas obras de metro paradas|Payé pour cataloguer des trouvailles sur un chantier de métro à l'arrêt|止まった地下鉄工事で出土品の目録を手伝う",
    "The Metro C excavation next to the square had turned up another stretch of intact Roman wall, and the crew needed an extra pair of hands to photograph and bag pottery shards before the tunnel boring machine could even think about moving again. Rome's newest subway line has run more than a decade behind schedule for exactly this reason, and archaeologists here have stopped being surprised by what turns up under a single city block.|Las obras de la línea C del metro junto a la plaza habían sacado a la luz otro tramo de muro romano intacto, y el equipo necesitaba manos extra para fotografiar y embolsar fragmentos de cerámica antes de que la tuneladora pudiera siquiera pensar en volver a moverse.|Le chantier de la ligne C du métro près de la place avait mis au jour un nouveau pan de mur romain intact, et l'équipe avait besoin de bras supplémentaires pour photographier et mettre en sachet des tessons de céramique avant que le tunnelier ne puisse même songer à repartir.|広場の隣で進む地下鉄C線の工事が、また新たに無傷のローマ時代の城壁を掘り当てた。トンネル掘削機が再び動き出せるようになる前に、陶器の破片を写真に撮って袋詰めする人手が要ると呼びかけられた。ローマ最新の地下鉄路線はまさにこうした理由で予定より10年以上遅れており、この土地の考古学者は一街区の下から何が出てきてももう驚かなくなっている。",
  ),
  ev(
    "borseggio-piazza", "loss", ["cen"], "👛", 230,
    "A pickpocket in the crowd around a fountain|Un carterista entre la multitud junto a una fuente|Un pickpocket dans la foule autour d'une fontaine|噴水前の人混みですりに遭う",
    "The crush of people angling for a photo by the fountain was thick enough that a light hand into an open bag went completely unfelt, and only the wallet's absence at the next café gave it away. Guides and police alike repeat the same advice about crowded piazzas, and every year a fresh wave of visitors learns it the hard way.|El gentío que buscaba la foto junto a la fuente era tan denso que una mano ligera en una bolsa abierta pasó del todo inadvertida, y solo la ausencia de la cartera en el siguiente café lo delató. Guías y policía repiten el mismo consejo sobre las plazas concurridas.|La cohue autour de la fontaine pour la photo était si dense qu'une main légère dans un sac ouvert est passée totalement inaperçue, et seule l'absence du portefeuille au café suivant l'a trahie. Guides et policiers répètent le même conseil sur les places bondées.|噴水の前で写真を撮ろうとする人だかりはあまりに密で、開いたバッグに軽く伸びた手にはまったく気づかなかった。次のカフェで財布がないと気づいて初めて分かったほどである。ガイドも警察も混み合う広場について同じ忠告を繰り返すが、毎年また新しい観光客がそれを痛い思いで学ぶ。",
  ),

  // ---- sud 南部 ----
  ev(
    "limoni-cassette", "gain", ["sud"], "🍋", 230,
    "Loading crates of lemons onto the truck|Cargando cajas de limones en el camión|Charger des caisses de citrons sur le camion|レモンの木箱をトラックに積み込む",
    "The grove above the coast road needed hands to carry the season's heaviest crates down the terrace steps before the truck's scheduled pickup, and the pay came with a sack of the ones too oddly shaped to sell. The steepest terraces still have no path a vehicle could ever use.|El huerto sobre la carretera costera necesitaba manos para bajar por las escaleras de la terraza las cajas más pesadas de la temporada antes de que pasara el camión, y el pago vino con un saco de los limones demasiado deformes para vender.|Le verger dominant la route côtière avait besoin de bras pour descendre par les marches en terrasse les caisses les plus lourdes de la saison avant le passage programmé du camion, et la paie s'est accompagnée d'un sac des fruits trop biscornus pour être vendus.|海沿いの道を見下ろす果樹園は、トラックが取りに来る前に、その季節でいちばん重い木箱を段々畑の階段で運び下ろす手を求めていた。支払いには、形が悪すぎて売り物にならないレモンの入った袋がおまけについてきた。いちばん急な段々畑には、いまも車の通れる道がまったくない。",
    [10, 11],
  ),
  ev(
    "matrimonio-cameriere", "gain", ["sud"], "💍", 260,
    "Serving at a wedding that ran past midnight|Sirviendo en una boda que se alargó pasada la medianoche|Servir lors d'un mariage qui a duré jusqu'après minuit|真夜中を過ぎても続く結婚式で給仕する",
    "A southern wedding with over two hundred guests and eleven courses needed more staff than the venue kept on the books, and the night stretched so long that the sugared almonds were handed out closer to sunrise than to the ceremony. Weddings here are still judged partly by how impossible it is to leave hungry.|Una boda del sur con más de doscientos invitados y once platos necesitaba más personal del que tenía contratado el local, y la noche se alargó tanto que los peladillas se repartieron más cerca del amanecer que de la ceremonia.|Un mariage du sud avec plus de deux cents invités et onze plats nécessitait plus de personnel que la salle n'en avait sous contrat, et la soirée s'est tant prolongée que les dragées furent distribuées plus près du lever du soleil que de la cérémonie.|招待客200人以上、料理11品の南部の結婚式は、会場が抱える人数以上のスタッフを必要としていた。夜はあまりに長く続き、砂糖菓子(コンフェッティ)が配られたのは式の直後というよりほとんど夜明け前だった。この地の結婚式はいまも、腹をすかせて帰らせないことがどれほど徹底されているかで語られる。",
  ),
  ev(
    "motorino-specchietto", "loss", ["sud"], "🛵", 210,
    "A scooter mirror clipped in Naples traffic|Un retrovisor de moto rozado en el tráfico de Nápoles|Un rétroviseur de scooter accroché dans la circulation napolitaine|ナポリの交通の中でスクーターのミラーをもがれる",
    "Lanes here are more of a suggestion than a rule, and a scooter squeezing past on the inside took a mirror clean off before either rider had time to react. The repair shop had seen the exact same damage so many times that it barely looked up from the part already on the shelf.|Aquí los carriles son más una sugerencia que una norma, y una moto que se coló por dentro arrancó de cuajo un retrovisor antes de que ninguno de los dos reaccionara. El taller había visto ese mismo desperfecto tantas veces que apenas alzó la vista, con la pieza ya en el estante.|Ici, les voies sont plus une suggestion qu'une règle, et un scooter se faufilant à l'intérieur a arraché net un rétroviseur avant que l'un ou l'autre n'ait le temps de réagir. Le garage avait vu tant de fois exactement le même dégât qu'il a à peine levé les yeux, la pièce déjà en stock sur l'étagère.|ここでは車線はルールというより目安に過ぎず、内側をすり抜けようとしたスクーターが、互いに反応する間もなくミラーをきれいに引きちぎっていった。修理工場はあまりに同じ損傷を見慣れていて、棚にすでに部品を用意したまま顔も上げなかった。",
  ),

  // ---- sic シチリア ----
  ev(
    "granita-mattina", "gain", ["sic"], "🍧", 220,
    "Working the morning rush at a granita bar|Trabajando el bullicio matinal de un bar de granizado|Assurer le coup de feu du matin dans un bar à granita|グラニータ屋の朝の忙しさを手伝う",
    "The bar's usual crowd of workers stopping for a granita and a warm brioche before their shift turned into a line out the door when the regular barista called in sick, and an unfamiliar hand at the machine got a crash course in almond versus pistachio. Breakfast granita, eaten with the brioche used almost like a spoon, is a habit locals defend fiercely.|La clientela habitual de trabajadores que paraban por un granizado y una brioche calentita antes del turno se convirtió en cola hasta la puerta cuando el barista habitual avisó de que estaba enfermo, y una mano nueva en la máquina recibió un curso urgente de almendra frente a pistacho.|La clientèle habituelle de travailleurs s'arrêtant pour une granita et une brioche tiède avant leur service s'est transformée en file jusqu'à la porte quand le barista habituel s'est déclaré malade, et une main inconnue à la machine a reçu un cours accéléré amande contre pistache.|仕事前にグラニータと温かいブリオッシュを求める常連客の列が、いつものバリスタが急病で来られなくなったせいで店の外まで延びていた。機械に不慣れな手がアーモンドとピスタチオの違いを大急ぎで叩き込まれることになった。ブリオッシュをほとんどスプーン代わりに使う朝のグラニータは、地元の人が頑として譲らない習慣である。",
  ),
  ev(
    "finta-guida-tempio", "loss", ["sic"], "🏺", 220,
    "Paying a self-appointed guide at the ruins|Pagando a un guía autoproclamado en las ruinas|Payer un guide autoproclamé sur les ruines|遺跡で自称ガイドに料金を払わされる",
    "A man near the entrance offered directions and a running commentary that sounded knowledgeable enough, then named a price only once the tour was already finished and impossible to politely refuse. The real, licensed guides wear a visible badge, a detail that becomes obvious only in hindsight.|Un hombre cerca de la entrada ofreció indicaciones y un comentario que sonaba bastante experto, y solo puso precio una vez terminada la visita, cuando ya era imposible rechazarlo con educación. Los guías de verdad, licenciados, llevan una placa visible, un detalle que solo se nota a toro pasado.|Un homme près de l'entrée a proposé des indications et un commentaire qui semblait assez savant, puis n'a annoncé son prix qu'une fois la visite terminée, impossible à refuser poliment. Les vrais guides agréés portent un badge visible, détail qui ne saute aux yeux qu'après coup.|入口近くの男が道案内と、もっともらしい解説を買って出た。値段を切り出したのはツアーがすっかり終わり、もう丁重に断れなくなってからだった。本物の公認ガイドは目に見えるバッジを着けているものだが、それに気づくのはいつも後になってからである。",
  ),

  // ---- sar サルデーニャ ----
  ev(
    "resort-stagione", "gain", ["sar"], "⛵", 250,
    "A summer season working the marina|Una temporada de verano trabajando en el puerto deportivo|Une saison d'été à travailler à la marina|夏のあいだマリーナで働く",
    "The Costa Smeralda's marinas hire seasonal hands by the boatload every summer to fold sails, hand off mooring lines and generally keep up appearances for yachts worth more than the whole harbour, and the pay reflects who is docking. The whole coast was empty scrubland as recently as the early 1960s.|Los puertos deportivos de la Costa Esmeralda contratan cada verano mano de obra estacional a espuertas para plegar velas, pasar cabos de amarre y en general mantener las apariencias ante yates que valen más que todo el puerto.|Les marinas de la Costa Smeralda embauchent chaque été des saisonniers par bateaux entiers pour plier les voiles, passer les amarres et globalement soigner les apparences devant des yachts valant plus que tout le port réuni.|コスタ・ズメラルダの各マリーナは毎夏、帆をたたみ、係留ロープを受け渡し、港全体より高価なヨットの体裁を保つための季節労働者を大勢雇う。給金は誰が停泊しているかで変わる。この海岸一帯は1960年代初めまで、ただの何もない荒れ地だった。",
    [4, 5],
  ),
  ev(
    "traghetto-ritardo", "loss", ["sar"], "⛴️", 210,
    "A missed connection after a delayed ferry|Una conexión perdida por un ferri retrasado|Une correspondance manquée après un ferry retardé|フェリーの遅れで乗り継ぎを逃す",
    "The overnight ferry from the mainland ran late enough that the onward connection had already left, and the only replacement was a taxi fare that erased most of what the ferry ticket had saved in the first place. Rough seas in the strait can push a crossing back for hours with little warning.|El ferri nocturno desde el continente llegó con tanto retraso que la conexión ya había salido, y el único reemplazo fue un taxi que borró la mayor parte de lo que el billete del ferri había ahorrado. El mar agitado en el estrecho puede retrasar una travesía horas con poco aviso.|Le ferry de nuit depuis le continent a eu un tel retard que la correspondance était déjà partie, et le seul remplacement fut un taxi qui a effacé l'essentiel de ce que le billet de ferry avait fait économiser. Une mer agitée dans le détroit peut retarder une traversée de plusieurs heures.|本土からの夜行フェリーがひどく遅れ、乗り継ぎの便はすでに出てしまっていた。代わりの手段はタクシーしかなく、そもそもフェリー切符で浮いたはずの金の大半が消えていった。海峡の荒れた海はほとんど前触れなく、渡航を何時間も遅らせることがある。",
  ),
];
