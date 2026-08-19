/**
 * スイスの青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: de=ドイツ語圏 / fr=フランス語圏 / it=イタリア語圏 / gr=グラウビュンデン
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、4地方それぞれに4件(増2・減2)を土地の実情に結びつけて置いている。
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

export const SWITZERLAND_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "alphuette-hilfe", "gain", [], "🧀", 220,
    "A day helping out at a mountain dairy|Un día ayudando en una lechería de alta montaña|Une journée à aider à la fromagerie d'alpage|山の酪農小屋を手伝う一日",
    "The cheesemaker up at the alp needed an extra pair of hands stirring the copper vat and hauling water before the morning's milk turned, and paid in cash at the end of the shift along with a wedge of the new batch to take home. The work starts before sunrise and doesn't wait for anyone who oversleeps.|El quesero de la alpe necesitaba manos extra para remover la cuba de cobre y acarrear agua antes de que se cortara la leche de la mañana, y pagó en efectivo al final del turno, además de una cuña del nuevo lote para llevar a casa. El trabajo empieza antes del amanecer y no espera a quien se quede dormido.|Le fromager de l'alpage avait besoin de bras supplémentaires pour remuer la cuve de cuivre et porter l'eau avant que le lait du matin ne tourne, et il a payé en espèces à la fin du service, avec un quartier de la nouvelle meule à emporter. Le travail commence avant le lever du soleil et n'attend personne qui aurait trop dormi.|高地牧場のチーズ職人が、朝の乳が変質する前に銅鍋をかき混ぜ水を運ぶ手を求めていて、勤務明けに現金と、できたてのひと切れを土産にもらった。仕事は日の出前から始まり、寝坊した者を待ってはくれない。",
  ),
  ev(
    "halbtax-fundstueck", "gain", [], "🎫", 190,
    "Returning a lost half-fare travelcard|Devolver un abono medio-precio perdido|Rendre un abonnement demi-tarif perdu|落とし物の半額パスを届ける",
    "A half-fare travelcard turned up wedged behind a station bench, and the owner, tracked down through the ticket office, insisted on paying a reward on the spot rather than waiting for the lost-property office to sort it out. Half the country carries one of these cards, so a lost one is rarely gone for good.|Apareció un abono de medio precio encajado detrás de un banco de la estación, y el dueño, localizado a través de la taquilla, insistió en pagar una recompensa allí mismo en vez de esperar a que la oficina de objetos perdidos lo resolviera. Medio país lleva una de estas tarjetas, así que una perdida rara vez se pierde del todo.|Un abonnement demi-tarif est réapparu coincé derrière un banc de gare, et son propriétaire, retrouvé via le guichet, a insisté pour verser une récompense sur-le-champ plutôt que d'attendre que le bureau des objets trouvés s'en charge. La moitié du pays possède une de ces cartes, si bien qu'une carte perdue l'est rarement pour de bon.|駅のベンチの裏に挟まっていた半額パスが見つかり、切符売り場を通じて突き止められた持ち主は、忘れ物取扱所の処理を待たずその場で謝礼を払うと言い張った。国民の半分がこのカードを持っているので、失くしても本当に無くなることはめったにない。",
  ),
  ev(
    "anschluss-verpasst", "loss", [], "⏱️", 180,
    "Missing the connection by seconds|Perder el enlace por segundos|Rater la correspondance de quelques secondes|数秒差で乗り継ぎを逃す",
    "The connecting train pulled away exactly as the platform display switched from 'on time' to 'departed', leaving no way to make the next leg without paying for a taxi across town. The whole national timetable depends on everyone else making their own tight connections, which is small comfort to the one person who didn't.|El tren de enlace arrancó justo cuando el panel del andén cambió de «puntual» a «salido», sin dejar más opción para continuar el trayecto que pagar un taxi al otro lado de la ciudad. Todo el horario nacional depende de que todos los demás hagan sus propios enlaces ajustados, lo cual es poco consuelo para quien no lo consiguió.|Le train de correspondance est parti exactement au moment où le panneau du quai passait de « à l'heure » à « parti », ne laissant d'autre choix que de payer un taxi à travers la ville pour continuer le trajet. Tout l'horaire national dépend du fait que chacun assure sa propre correspondance serrée, ce qui est peu consolant pour celui qui n'y est pas parvenu.|乗り継ぎ列車は、ホームの表示が「定刻」から「出発済み」に変わったちょうどそのときに走り去ってしまい、街の反対側までタクシーで行く以外に先へ進む手立てがなくなった。国全体の時刻表は、誰もが自分のぎりぎりの乗り継ぎをきちんとこなすことに依存しているが、それができなかった一人にとってはさしたる慰めにもならない。",
  ),
  ev(
    "jass-verlust", "loss", [], "🃏", 200,
    "Losing badly at Jass|Perdiendo feo al Jass|Une lourde défaite au Jass|ヤスの勝負に負ける",
    "The trump suit kept landing in the wrong hands all evening, and by the last round the stakes had crept up well past what seemed reasonable when the cards were first dealt. Jass gets played everywhere from train compartments to village bars with a deck found nowhere outside German-speaking Europe, and the scoring is complicated enough that newcomers rarely walk away ahead.|El palo de triunfo no dejó de caer en las manos equivocadas toda la noche, y para la última ronda la apuesta había subido mucho más de lo razonable cuando se repartieron las cartas por primera vez. Al Jass se juega en todas partes, desde compartimentos de tren hasta bares de pueblo, con una baraja que no se encuentra fuera de la Europa germanófona, y la puntuación es tan complicada que los novatos rara vez salen ganando.|L'atout n'a cessé de tomber dans les mauvaises mains toute la soirée, et à la dernière manche, la mise avait grimpé bien au-delà du raisonnable au moment de la première donne. On joue au Jass partout, des compartiments de train aux bistrots de village, avec un jeu de cartes introuvable hors d'Europe germanophone, et le compte des points est assez compliqué pour que les débutants en ressortent rarement gagnants.|切り札はその晩ずっと都合の悪い相手の手に渡り続け、最後の局には最初に配られたときには妥当に思えた賭け金がずいぶん膨らんでいた。ヤスは列車のコンパートメントから村のバーまで至る所で打たれ、使うカードはドイツ語圏欧州の外では見かけない。点の数え方が込み入っていて、初心者が勝ち逃げすることはまずない。",
  ),

  // ---- de ドイツ語圏 ----
  ev(
    "zug-registrierung", "gain", ["de"], "📎", 200,
    "Filing papers for a new holding company|Tramitando papeles para una nueva sociedad holding|Classer les papiers d'une nouvelle holding|新しい持株会社の書類整理",
    "A lawyer's office in Zug needed an extra pair of hands photocopying and binding registration papers before a filing deadline, paying by the hour for work that asked no questions about why a company with three employees needed quite so many folders. Nobody explained what the company actually did.|Un bufete de abogados en Zug necesitaba manos extra para fotocopiar y encuadernar papeles de registro antes de un plazo, pagando por horas un trabajo que no hacía preguntas sobre por qué una empresa de tres empleados necesitaba tantas carpetas. Nadie explicó a qué se dedicaba realmente la empresa.|Un cabinet d'avocats à Zoug avait besoin de bras supplémentaires pour photocopier et relier des papiers d'enregistrement avant une échéance, payant à l'heure un travail qui ne posait aucune question sur la raison pour laquelle une société de trois employés avait besoin d'autant de classeurs. Personne n'a expliqué ce que faisait réellement l'entreprise.|ツークの法律事務所が、提出期限の前に登記書類のコピーと製本の手を求めていて、時給で払われた。三人しかいない会社がなぜこれほど多くのフォルダを必要とするのか、誰も問わない仕事だった。その会社が実際に何をしているのか、説明してくれる者はいなかった。",
  ),
  ev(
    "foehn-kopfweh", "loss", ["de"], "🤕", 160,
    "A föhn headache and a chemist's bill|Un dolor de cabeza por el föhn y la cuenta de la farmacia|Un mal de tête de föhn et la note du pharmacien|フェーン頭痛と薬局の会計",
    "The warm wind made concentrating on anything impossible by mid-afternoon, and the chemist's counter was three deep with people buying the same painkillers for the same reason. Whole offices quietly agree to expect less of each other on days like this.|El viento cálido hizo imposible concentrarse en nada a media tarde, y el mostrador de la farmacia tenía tres personas de cola comprando los mismos analgésicos por el mismo motivo. Oficinas enteras acuerdan tácitamente esperar menos unas de otras en días así.|Le vent chaud a rendu impossible toute concentration en milieu d'après-midi, et le comptoir du pharmacien avait trois personnes de front achetant les mêmes antalgiques pour la même raison. Des bureaux entiers s'accordent tacitement à moins attendre les uns des autres ces jours-là.|温かい風のせいで、午後の半ばには何にも集中できなくなり、薬局のカウンターには同じ理由で同じ鎮痛剤を買う人が三人分並んでいた。こういう日はオフィスじゅうが、暗黙のうちに互いへの期待値を下げ合う。",
  ),
  ev(
    "alpaufzug-hilfe", "gain", ["de"], "🐄", 210,
    "Herding a stray cow back during Alpaufzug|Devolviendo una vaca descarriada durante el Alpaufzug|Rattraper une vache égarée pendant l'Alpaufzug|アルプアウフツークで逸れた牛を追い戻す",
    "One decorated cow decided the procession route wasn't for her and bolted down a side lane, and catching up with her before she reached the main road earned a thank-you from the farmer worth more than the hour it took. The rest of the herd, less adventurous, kept walking as if nothing had happened.|Una vaca engalanada decidió que la ruta del desfile no era para ella y salió disparada por una calleja lateral, y alcanzarla antes de que llegara a la carretera principal le valió al que la atrapó un agradecimiento del granjero que compensó la hora que costó. El resto del rebaño, menos aventurero, siguió caminando como si nada hubiera pasado.|Une vache parée a décidé que le parcours du cortège n'était pas pour elle et a filé dans une ruelle latérale, et la rattraper avant qu'elle n'atteigne la route principale a valu au fermier un remerciement qui valait bien l'heure que cela a pris. Le reste du troupeau, moins aventureux, a continué de marcher comme si de rien n'était.|花飾りを着けた一頭の牛が、行列の道は自分向きではないと決めて横道へ駆け出し、本道に出る前に追いついたことで、費やした一時間分以上の礼を農家から受け取った。残りの群れはさほど冒険心もなく、何事もなかったかのように歩き続けていた。",
    [2],
  ),
  ev(
    "steuererklaerung-fehler", "loss", ["de"], "📮", 170,
    "A mistake on the cantonal tax return|Un error en la declaración de impuestos cantonal|Une erreur dans la déclaration d'impôts cantonale|州税申告の記入ミス",
    "A box on the cantonal tax form got filled in wrong, and the correction fee for a resubmission arrived by post before the mistake had even been fully understood. Every canton runs its own tax forms slightly differently, so an error that would be harmless in one is a small fine in another.|Se rellenó mal una casilla del formulario de impuestos cantonal, y la tasa de corrección por volver a presentarlo llegó por correo antes incluso de haber entendido bien el error. Cada cantón gestiona sus formularios de impuestos de forma ligeramente distinta, así que un error inofensivo en uno es una pequeña multa en otro.|Une case du formulaire d'impôts cantonal a été mal remplie, et les frais de correction pour un nouveau dépôt sont arrivés par courrier avant même que l'erreur n'ait été bien comprise. Chaque canton gère ses formulaires fiscaux un peu différemment, si bien qu'une erreur sans conséquence dans l'un vaut une petite amende dans l'autre.|州の納税申告書の欄を書き間違え、その誤りをまだ十分に理解しないうちに、再提出のための訂正手数料の通知が郵便で届いた。どの州も申告書の様式が少しずつ違うため、ある州なら問題にならない誤りが、別の州では小さな罰金になる。",
  ),

  // ---- fr フランス語圏 ----
  ev(
    "montreux-jazz-crew", "gain", ["fr"], "🎸", 230,
    "Working stage crew at the jazz festival|Trabajando en el equipo técnico del festival de jazz|Faire partie de l'équipe technique du festival de jazz|ジャズフェスの舞台裏スタッフ",
    "The lakeside stage needed extra hands coiling cables and moving amp stacks between sets, and the pay came with a wristband good for the rest of the festival on nights off. Headline acts get a soundcheck that empties the venue for an hour, which is when the real work happens.|El escenario junto al lago necesitaba manos extra para enrollar cables y mover torres de amplificadores entre actuaciones, y el pago incluyó una pulsera válida para el resto del festival en las noches libres. Los cabezas de cartel tienen una prueba de sonido que vacía el recinto durante una hora, que es cuando ocurre el trabajo de verdad.|La scène au bord du lac avait besoin de bras pour enrouler les câbles et déplacer les tours d'amplis entre les concerts, et la paie incluait un bracelet valable pour le reste du festival les soirs de congé. Les têtes d'affiche ont une balance qui vide la salle pendant une heure, et c'est là que se fait le vrai travail.|湖畔のステージが、公演の合間にケーブルを巻きアンプの塔を動かす人手を求めていて、給金には休みの夜にまた入れるリストバンドが付いてきた。大物出演者のサウンドチェックの間は会場が一時間空になるが、本当の仕事はまさにその時間に行われる。",
    [3, 4],
  ),
  ev(
    "tgv-lyria-surbook", "loss", ["fr"], "🚆", 220,
    "Bumped from an overbooked train to France|Sacado de un tren a Francia con overbooking|Débarqué d'un train surbooké vers la France|フランス行き列車の予約超過で降ろされる",
    "The reserved seat on the express to France turned out to belong to someone else too, and untangling the double booking at the border station ate up the time saved by taking the fast train in the first place. A refund eventually came through, minus the cost of the taxi taken instead.|El asiento reservado en el expreso a Francia resultó pertenecer también a otra persona, y desenredar la doble reserva en la estación fronteriza se comió el tiempo que se había ganado tomando el tren rápido. Al final llegó un reembolso, menos el coste del taxi que se tomó en su lugar.|La place réservée dans l'express vers la France appartenait aussi à quelqu'un d'autre, et démêler la double réservation à la gare frontière a englouti le temps gagné en prenant le train rapide. Un remboursement a fini par arriver, moins le coût du taxi pris à la place.|フランス行き特急の予約席は、他の誰かの席でもあったことが判明し、国境の駅でその二重予約をほどくのに、そもそも速い列車に乗ったことで浮いたはずの時間を使い果たしてしまった。払い戻しは結局届いたが、代わりに乗ったタクシー代を差し引かれていた。",
  ),
  ev(
    "lavaux-vendange-vente", "gain", ["fr"], "🍇", 200,
    "Selling the last cases at the harvest stand|Vendiendo las últimas cajas en el puesto de la vendimia|Vendre les dernières caisses à l'étal des vendanges|収穫祭の売店で最後の箱を売る",
    "The vintner's roadside stand above the lake sold out its new-press tastings faster than expected, and minding the till for the last busy hour earned a cut plus a bottle to take home. Most of what's grown on these terraces never makes it further than the next village anyway.|El puesto del viticultor junto a la carretera sobre el lago agotó las catas de mosto recién prensado antes de lo previsto, y llevar la caja durante la última hora de ajetreo dio una comisión más una botella para llevar a casa. Casi todo lo que crece en estas terrazas no llega de todos modos más allá del pueblo siguiente.|L'étal du vigneron au bord de la route au-dessus du lac a écoulé ses dégustations de moût plus vite que prévu, et tenir la caisse pendant la dernière heure d'affluence a valu une commission plus une bouteille à emporter. De toute façon, presque rien de ce qui pousse sur ces terrasses ne va plus loin que le village suivant.|湖を見下ろす道沿いのぶどう農家の売店は、搾りたての試飲が予想より早く売り切れ、混雑した最後の一時間だけレジを任されたことで、歩合とお土産の一本をもらった。この段々畑で採れるもののほとんどは、どのみち隣村より先へは出回らない。",
    [5],
  ),
  ev(
    "abstimmung-flugblatt", "gain", ["fr"], "📣", 190,
    "Handing out leaflets before a cantonal vote|Repartiendo octavillas antes de una votación cantonal|Distribuer des tracts avant un vote cantonal|州の投票前にビラを配る",
    "A local committee needed someone standing outside the polling place handing out one last leaflet before Sunday's vote, careful to stay the required distance from the door so as not to break the rules on campaigning too close to the ballot box. Half the people taking a leaflet had already made up their minds regardless.|Un comité local necesitaba a alguien de pie fuera del colegio electoral repartiendo una última octavilla antes de la votación del domingo, con cuidado de mantenerse a la distancia exigida de la puerta para no infringir las normas sobre hacer campaña demasiado cerca de las urnas. La mitad de quienes cogían una octavilla ya se habían decidido de todos modos.|Un comité local avait besoin de quelqu'un debout devant le bureau de vote pour distribuer un dernier tract avant le scrutin du dimanche, en veillant à rester à la distance requise de la porte pour ne pas enfreindre les règles sur le démarchage trop proche de l'urne. La moitié des gens qui prenaient un tract avaient de toute façon déjà décidé.|地元の委員会が、日曜の投票の前に投票所の外に立って最後のビラを配る人手を求めていた。投票箱に近すぎる場所での運動を禁じる決まりを破らぬよう、戸口から定められた距離を保つ必要があった。ビラを受け取った人の半分は、どのみちすでに心を決めていた。",
    [1, 5, 7, 10],
  ),

  // ---- it イタリア語圏(ティチーノ) ----
  ev(
    "locarno-usher-mancia", "gain", ["it"], "🎬", 210,
    "Ushering at the open-air film festival|Acomodando al público en el festival de cine al aire libre|Placeur au festival de cinéma en plein air|野外映画祭の案内係",
    "The main square's screen needed someone directing the crowd to empty folding-chair rows before the evening premiere, and a few late arrivals tipped generously for a seat found in the dark without stepping on anyone. The film is shown to thousands sitting under the open sky, weather allowing.|La pantalla de la plaza principal necesitaba a alguien dirigiendo al público hacia las filas de sillas plegables vacías antes del estreno de la noche, y algunos rezagados dieron buena propina por un asiento encontrado en la oscuridad sin pisar a nadie. La película se proyecta para miles de personas sentadas bajo el cielo abierto, si el tiempo lo permite.|L'écran de la place principale avait besoin de quelqu'un pour guider le public vers les rangées de chaises pliantes vides avant l'avant-première du soir, et quelques retardataires ont généreusement laissé un pourboire pour une place trouvée dans le noir sans marcher sur personne. Le film est projeté devant des milliers de spectateurs assis à ciel ouvert, si le temps le permet.|広場のスクリーンは、夜の上映前に空いている折りたたみ椅子の列へ客を案内する人手を求めていて、暗がりの中で誰も踏まずに席を見つけてもらった遅れて来た客の何人かが気前よくチップをくれた。天気さえ許せば、映画は野外に座る何千人もの観客に向けて上映される。",
    [3],
  ),
  ev(
    "carte-serata-perdita", "loss", ["it"], "🃏", 180,
    "A losing streak at cards one evening|Una mala racha de cartas una noche|Une série de défaites aux cartes un soir|ある晩のカード運の悪さ",
    "Every hand seemed to go the neighbour's way at the café table, and the small stakes agreed at the start of the evening had a way of not staying small. Nobody keeps score officially, but everyone at the table remembers exactly who owes whom.|Cada mano parecía irle al vecino en la mesa del café, y las pequeñas apuestas acordadas al principio de la noche tenían la costumbre de no quedarse pequeñas. Nadie lleva la cuenta oficialmente, pero todos en la mesa recuerdan exactamente quién le debe a quién.|Chaque main semblait aller au voisin à la table du café, et les petites mises convenues en début de soirée avaient une manière de ne pas rester petites. Personne ne tient de compte officiel, mais tout le monde à la table se souvient exactement qui doit quoi à qui.|カフェのテーブルでは、どの手も隣の客に流れていくようで、宵の口に決めた小さな賭け金はいつの間にか小さくなくなっていた。誰も公式に記録はつけていないが、テーブルの誰もが誰が誰に借りているかを正確に覚えている。",
  ),
  ev(
    "castagne-raccolta", "gain", ["it"], "🌰", 190,
    "Gathering chestnuts to sell in the piazza|Recogiendo castañas para vender en la plaza|Ramasser des châtaignes à vendre sur la place|広場で売る栗を拾い集める",
    "An old chestnut grove above the valley dropped a heavy crop this year, and a morning spent filling sacks earned enough to make roasting and selling them warm from a brazier in the square worthwhile that evening. Whole hillsides here were once terraced and planted for exactly this tree, back when chestnut flour filled in for grain in a lean year.|Un viejo castañar sobre el valle dio una cosecha abundante este año, y una mañana llenando sacos dio para que valiera la pena asarlas y venderlas calientes desde un brasero en la plaza esa misma tarde. Laderas enteras de aquí se aterrazaron y plantaron en su día precisamente con este árbol, cuando la harina de castaña sustituía al grano en los años de escasez.|Une vieille châtaigneraie au-dessus de la vallée a donné une récolte abondante cette année, et une matinée à remplir des sacs a rapporté de quoi rentabiliser la vente de châtaignes grillées au brasero sur la place ce soir-là. Des versants entiers ici furent jadis mis en terrasses et plantés précisément pour cet arbre, à l'époque où la farine de châtaigne remplaçait le grain les mauvaises années.|谷を見下ろす古い栗林が今年は豊作で、朝のうちに袋をいっぱいにしたおかげで、その晩広場の火鉢で焼いて温かいまま売るだけの元手になった。ここの丘という丘はかつて、まさにこの木のために段々畑に切り開かれ植えられた。凶作の年には栗粉が穀物の代わりを務めていた時代のことである。",
    [6, 7],
  ),
  ev(
    "banca-commissione-sorpresa", "loss", ["it"], "🏦", 190,
    "A surprise fee at the bank counter|Una comisión sorpresa en el mostrador del banco|Une commission surprise au guichet de la banque|銀行窓口での思わぬ手数料",
    "Changing a small amount of cash at the counter came with a service charge nobody mentioned until the receipt printed, small enough on its own but the kind of thing that adds up across a whole afternoon of errands. The clerk shrugged; the fee schedule is posted somewhere, technically.|Cambiar una pequeña cantidad de efectivo en el mostrador vino con una comisión de servicio que nadie mencionó hasta que salió el recibo, pequeña por sí sola pero del tipo que se acumula a lo largo de toda una tarde de gestiones. El empleado se encogió de hombros; la tabla de comisiones está expuesta en algún sitio, técnicamente.|Changer une petite somme en espèces au guichet s'est accompagné de frais de service que personne n'a mentionnés avant l'impression du reçu, minimes en soi mais du genre qui s'additionne sur toute une après-midi de courses. L'employé a haussé les épaules ; le barème des frais est affiché quelque part, techniquement.|窓口でわずかな現金を両替すると、レシートが印字されるまで誰も触れなかった手数料が上乗せされていた。それ自体は小さくても、用事で歩き回る午後じゅうに積み重なる類のものだった。行員は肩をすくめた。手数料表はどこかに、いちおう掲示されているのだという。",
  ),

  // ---- gr グラウビュンデン州 ----
  ev(
    "davos-ski-assistent", "gain", ["gr"], "⛷️", 220,
    "Assisting a ski instructor for the day|Ayudando a un instructor de esquí por un día|Assister un moniteur de ski pour la journée|スキーインストラクターを一日手伝う",
    "A fully booked ski school needed someone to carry spare poles and round up children who'd wandered off toward the lift line, and the pay came with a free lunch at the mid-mountain restaurant. Watching six beginners at once turns out to be harder than skiing the black run above them.|Una escuela de esquí totalmente reservada necesitaba a alguien que llevara bastones de repuesto y reuniera a los niños que se habían alejado hacia la cola del telesilla, y el pago incluyó un almuerzo gratis en el restaurante de media montaña. Vigilar a seis principiantes a la vez resulta más difícil que esquiar la pista negra de encima.|Une école de ski complète avait besoin de quelqu'un pour porter des bâtons de rechange et rassembler les enfants partis traîner vers la file du télésiège, et la paie incluait un déjeuner gratuit au restaurant à mi-montagne. Surveiller six débutants à la fois s'avère plus difficile que skier la piste noire au-dessus.|予約でいっぱいのスキー学校が、予備のストックを運びリフト待ちの列へふらふら行ってしまう子どもたちを集める人手を求めていて、給金には山の中腹のレストランでの無料の昼食が付いてきた。六人の初心者を同時に見るのは、その上にある上級コースを滑るより難しいと分かった。",
    [8, 9, 10],
  ),
  ev(
    "wef-hotel-rechnung", "loss", ["gr"], "🧾", 230,
    "A hotel bill inflated by the summit week|Una factura de hotel inflada por la semana de la cumbre|Une note d'hôtel gonflée par la semaine du sommet|サミット週で膨らんだホテル代",
    "The same room that costs a fraction of this most weeks of the year triples in price the one week a global economic summit fills every bed in town, and the booking made months ago didn't lock in a rate after all. Locals mostly rent out spare rooms and leave for the week rather than compete with the prices.|La misma habitación que cuesta una fracción esto la mayoría de las semanas del año se triplica de precio justo la semana en que una cumbre económica mundial llena todas las camas del pueblo, y la reserva hecha meses antes no fijó al final la tarifa. Los vecinos suelen alquilar sus habitaciones libres e irse esa semana en vez de competir con los precios.|La même chambre qui coûte une fraction de ce prix la plupart des semaines de l'année triple de tarif la semaine où un sommet économique mondial remplit tous les lits de la ville, et la réservation faite des mois plus tôt n'avait finalement pas bloqué de tarif. Les habitants louent surtout leurs chambres libres et partent pour la semaine plutôt que de rivaliser avec les prix.|一年のほとんどの週ならこの何分の一の値段の同じ部屋が、世界経済サミットが町じゅうのベッドを埋め尽くすその一週間だけ三倍に跳ね上がる。何か月も前にした予約は、結局その値段を固定してはいなかった。地元の住民は、たいていこの値段と張り合うより、空き部屋を貸し出してその週は町を離れる。",
    [9, 10],
  ),
  ev(
    "chur-kaese-marktstand", "gain", ["gr"], "🧀", 200,
    "Selling surplus alpine cheese at the market|Vendiendo queso alpino sobrante en el mercado|Vendre du fromage d'alpage en surplus au marché|余った高地チーズを市で売る",
    "A dairy family had more wheels than their usual customers could take, and minding the folding table in the market square for a Saturday morning earned a share of the extra sales plus the end of a wheel too irregular to sell whole. Regulars know to come early, before the good wedges are gone.|Una familia de queseros tenía más ruedas de las que sus clientes habituales podían llevarse, y atender la mesa plegable en la plaza del mercado un sábado por la mañana dio una parte de las ventas extra más el resto de una rueda demasiado irregular para vender entera. Los habituales saben que hay que llegar temprano, antes de que se acaben las buenas cuñas.|Une famille de fromagers avait plus de meules que ses clients habituels ne pouvaient en écouler, et tenir la table pliante sur la place du marché un samedi matin a rapporté une part des ventes supplémentaires plus le reste d'une meule trop irrégulière pour être vendue entière. Les habitués savent qu'il faut arriver tôt, avant que les bons morceaux ne soient partis.|ある酪農家は、いつもの客では捌ききれないほどの丸チーズを抱えていて、土曜の朝、市場の広場の折りたたみ台を任されたことで、余分の売上の分け前と、丸ごと売るには形の崩れた端の一切れをもらった。常連は、良い部分が無くなる前に早く来るものだと心得ている。",
    [7, 8],
  ),
  ev(
    "rhb-billett-verwirrung", "loss", ["gr"], "🚋", 170,
    "The wrong narrow-gauge ticket zone|La zona equivocada del billete de vía estrecha|La mauvaise zone sur le billet à voie étroite|狭軌線の乗車区間を間違える",
    "The ticket bought at the machine covered only part of the mountain line's zones, and the difference had to be paid on the spot to the conductor once the mistake turned up at a request stop with no way back to the machine. The narrow-gauge network's fare map looks simple until the train is actually moving through it.|El billete comprado en la máquina solo cubría parte de las zonas de la línea de montaña, y la diferencia hubo que pagarla en el acto al revisor una vez que el error salió a la luz en una parada a petición sin forma de volver a la máquina. El mapa de tarifas de la red de vía estrecha parece sencillo hasta que el tren realmente lo recorre.|Le billet acheté au distributeur ne couvrait qu'une partie des zones de la ligne de montagne, et la différence a dû être payée sur place au contrôleur une fois l'erreur découverte à un arrêt facultatif sans moyen de revenir au distributeur. La carte tarifaire du réseau à voie étroite paraît simple jusqu'à ce que le train la traverse réellement.|券売機で買った切符は、この山岳路線の区間の一部しかカバーしておらず、その誤りがリクエスト停車場で発覚したときには券売機に戻る術もなく、その場で車掌に差額を払うしかなかった。狭軌鉄道網の運賃地図は、実際に列車がその中を走り出すまでは単純に見える。",
  ),
];
