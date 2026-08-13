/**
 * ブラジルの青マス・赤マスで起きる出来事(19件。増10・減9)。
 *
 * 地方コード: no=北部 / ne=北東部 / co=中西部 / se=南東部 / su=南部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、5地方それぞれに3件、その土地らしい話に絞って置いている。
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

export const BRAZIL_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "ifood-chuva", "gain", [], "🛵", 220,
    "Extra pay for delivering through a downpour|Paga extra por repartir bajo un aguacero|Prime pour livrer sous une averse|土砂降りの中の配達で上乗せ手当",
    "The app's surge pricing kicked in the moment the sky opened, and the extra fee per delivery outweighed the soaking. Restaurants that would normally sit half-empty on a rainy weeknight suddenly had a line of orders backed up, all needing a driver willing to go out in it.|El recargo por lluvia de la aplicación se activó en cuanto se abrió el cielo, y el extra por entrega compensó la empapada. Restaurantes que normalmente estarían medio vacíos una noche lluviosa de repente tenían una cola de pedidos, todos necesitando un repartidor dispuesto a salir.|Le tarif majoré de l'appli s'est déclenché dès que le ciel s'est ouvert, et le supplément par livraison a compensé la trempette. Des restaurants d'ordinaire à moitié vides un soir de pluie en semaine se sont soudain retrouvés avec une file de commandes, toutes en attente d'un livreur prêt à sortir sous l'averse.|空が割れた瞬間にアプリの悪天候割増料金が発動し、配達1件ごとの上乗せがずぶ濡れになった分を上回った。ふだんなら雨の平日の夜は半分空いているはずの店に、次々と注文が溜まり、雨の中を出て行ってくれる配達員を求めていた。",
  ),
  ev(
    "churrasco-gig", "gain", [], "🍖", 260,
    "Manning the grill at someone else's birthday churrasco|A cargo de la parrilla en el churrasco de cumpleaños de otro|Aux commandes du grill pour l'anniversaire d'un autre|よその誕生日シュハスコで炭火を任される",
    "The host's usual grill master cancelled at the last minute, and turning skewers of picanha for forty guests all afternoon paid well enough to make up for missing your own weekend plans. Nobody at the party seemed to notice the cook was a last-minute substitute, which felt like the highest compliment.|El asador habitual del anfitrión canceló a última hora, y pasar toda la tarde dando vueltas a espetos de picanha para cuarenta invitados pagó lo suficiente para compensar los planes propios del fin de semana perdidos. Nadie en la fiesta pareció notar que el cocinero era un sustituto de última hora, lo cual se sintió como el mayor cumplido.|Le grillardin habituel de l'hôte a annulé à la dernière minute, et retourner des brochettes de picanha tout l'après-midi pour quarante invités a suffisamment payé pour compenser le week-end perdu. Personne à la fête n'a semblé remarquer que le cuisinier était un remplaçant de dernière minute, ce qui a semblé le plus beau des compliments.|主催者のいつもの焼き係が土壇場でキャンセルし、代わりに午後じゅうかけて40人分のピカーニャの串を回した。その分の手当で、自分の週末の予定を潰した埋め合わせには十分だった。パーティーの誰も、料理人が土壇場の代役だとは気づかなかったようで、それが何よりの誉め言葉に感じられた。",
  ),
  ev(
    "truco-perda", "loss", [], "🃏", 190,
    "Losing badly at truco|Perdiendo feo al truco|Une lourde défaite au truco|トルーコの勝負に負ける",
    "Truco is a game of bluffing as much as cards, and an uncle who never blinks kept calling every raise until the stakes had crept far past what seemed reasonable at the start. The hand signals players flash to their partners across the table are supposed to be secret, but everyone at this table had long since learned to read them anyway.|El truco es tanto un juego de faroles como de cartas, y un tío que nunca pestañea siguió igualando cada envite hasta que la apuesta subió mucho más de lo razonable al empezar. Las señas que los jugadores hacen a su compañero se supone que son secretas, pero todos en esta mesa ya sabían leerlas de todos modos.|Le truco est autant un jeu de bluff que de cartes, et un oncle qui ne cille jamais a relancé à chaque fois jusqu'à ce que la mise grimpe bien au-delà du raisonnable au départ. Les signes que les joueurs adressent à leur partenaire sont censés rester secrets, mais tout le monde à cette table avait depuis longtemps appris à les lire.|トルーコはカードと同じくらいハッタリがものを言う勝負で、まばたき一つしない叔父がすべての賭け金を釣り上げ続け、最初は妥当に思えた額をはるかに超えるまで膨らんだ。テーブルの向こうの相方に送るはずの合図は本来秘密だが、この卓の面々はとうの昔にお互いの手を読みきっていた。",
  ),
  ev(
    "pardal-multa", "loss", [], "📷", 170,
    "Caught by a speed camera nicknamed the sparrow|Pillado por una cámara de velocidad apodada «el gorrión»|Flashé par un radar surnommé le moineau|「小雀」と呼ばれる速度取締カメラに捕まる",
    "The camera, nicknamed pardal for how it perches unblinking on its pole, caught the plate before the brake lights even came on, and the fine notice arrived by mail weeks later as if the road itself had been keeping a grudge. Locals still swear they know exactly where every one of these cameras sits — right up until they forget.|La cámara, apodada pardal por cómo se posa impasible en su poste, captó la matrícula antes de que se encendieran las luces de freno, y la multa llegó por correo semanas después, como si la carretera misma hubiera guardado rencor. Los lugareños juran conocer la ubicación exacta de cada una de estas cámaras, hasta que se olvidan.|La caméra, surnommée pardal pour la façon dont elle se perche impassible sur son poteau, a capté la plaque avant même que les feux de freinage ne s'allument, et l'avis d'amende est arrivé par courrier des semaines plus tard, comme si la route elle-même en avait gardé rancune. Les habitants jurent connaître l'emplacement exact de chaque radar, jusqu'à ce qu'ils l'oublient.|「パルダル(雀)」と呼ばれるこのカメラは、支柱にじっと止まる様子からその名がついたが、ブレーキランプが灯る前にナンバーを捉えていた。数週間後、まるで道路そのものに恨まれていたかのように罰金の通知が郵便で届いた。地元の人々は決まってどこにカメラがあるか全部知っていると言うが、忘れた頃にやられる。",
  ),

  // ---- no 北部 ----
  ev(
    "encontro-guia", "gain", ["no"], "🚤", 240,
    "Guiding tourists out to see two rivers refuse to mix|Guiando turistas para ver a dos ríos negarse a mezclarse|Guider des touristes voir deux fleuves refuser de se mélanger|二つの川が混ざらない様子へ観光客を案内する",
    "A regular boat guide called in sick, and taking the afternoon tour out to where the dark and pale waters run side by side paid a full day's wage for a couple of hours on the water. Visitors always ask to dip a hand in each current at once, as if touch might explain what the eye cannot.|El guía habitual de la lancha avisó de que estaba enfermo, y llevar el tour de la tarde hasta donde las aguas oscuras y claras corren en paralelo pagó un jornal completo por un par de horas en el agua. Los visitantes siempre piden meter una mano en cada corriente a la vez, como si el tacto pudiera explicar lo que el ojo no puede.|Le guide habituel du bateau s'est déclaré malade, et emmener la visite de l'après-midi là où les eaux sombres et claires coulent côte à côte a payé un salaire de journée entière pour deux heures sur l'eau. Les visiteurs demandent toujours à tremper une main dans chaque courant à la fois, comme si le toucher pouvait expliquer ce que l'œil ne peut pas.|いつもの船頭が急病で休み、暗い水と薄い色の水が並んで流れる場所まで午後の周遊を案内すると、水上のわずか数時間で丸一日分の日当になった。観光客はいつも両方の流れに同時に手を浸したがる。目で見て分からないことを、触れば分かるとでもいうように。",
  ),
  ev(
    "acai-beira", "gain", ["no"], "🫐", 200,
    "A good day selling açaí by the roadside|Un buen día vendiendo açaí a la orilla del camino|Une bonne journée à vendre de l'açaí au bord de la route|路上のアサイー売りの好調な一日",
    "The morning's açaí, pounded fresh from berries bought straight off a riverboat before dawn, sold out well before noon, thick and cold and served with tapioca flour the way locals actually eat it rather than the sweetened version sold abroad. The bowls were washed and stacked before the afternoon heat even set in.|El açaí de la mañana, batido fresco con bayas compradas directamente de una lancha antes del amanecer, se agotó bien antes del mediodía, espeso y frío y servido con harina de tapioca tal como lo comen los lugareños, y no la versión endulzada que se vende fuera. Los cuencos ya estaban lavados y apilados antes de que llegara el calor de la tarde.|L'açaí du matin, fraîchement pilé à partir de baies achetées directement sur une pirogue avant l'aube, s'est écoulé bien avant midi, épais et froid, servi avec de la farine de tapioca comme le mangent vraiment les habitants plutôt que la version sucrée vendue à l'étranger. Les bols étaient lavés et empilés avant même que la chaleur de l'après-midi ne s'installe.|夜明け前に川船から直接買い付けた実をその場で搗いた朝のアサイーは、正午前に売り切れた。海外で売られる甘い版とは違い、地元の食べ方どおりとろりと冷たく、タピオカ粉を添えて出す。午後の暑さが本格化する前には、器はもう洗って積み上げてあった。",
  ),
  ev(
    "seca-rio", "loss", ["no"], "🚤", 210,
    "Stranded for days as the river runs too low|Varado días enteros porque el río baja demasiado|Bloqué des jours entiers car le fleuve est trop bas|川の水位が低すぎて何日も足止め",
    "The dry-season water level dropped low enough that the regular boat couldn't clear a sandbar it had crossed easily for years, and the whole cargo had to wait at the dock for a smaller launch to ferry it out in stages. Every year the same stretch of river seems to catch someone off guard.|El nivel del agua bajó tanto en la estación seca que la lancha habitual no pudo pasar un banco de arena que llevaba años cruzando sin problema, y toda la carga tuvo que esperar en el muelle a que una lancha más pequeña la sacara por tandas. Cada año ese mismo tramo del río parece coger a alguien desprevenido.|Le niveau d'eau de la saison sèche a baissé au point que le bateau habituel n'a pu franchir un banc de sable qu'il passait sans problème depuis des années, et toute la cargaison a dû attendre au quai qu'une embarcation plus petite la fasse traverser par étapes. Chaque année, ce même tronçon du fleuve semble surprendre quelqu'un.|乾季で水位が下がりすぎ、いつもの船が長年問題なく越えてきた砂州を越えられなくなった。荷物はすべて桟橋で足止めされ、小型の船が何往復もして少しずつ運び出すのを待つほかなかった。毎年、この同じ川の区間が誰かの不意を突くようである。",
  ),

  // ---- ne 北東部 ----
  ev(
    "tapioca-quiosque", "gain", ["ne"], "🫓", 210,
    "A steady line at the beach tapioca kiosk|Una fila constante en el quiosco de tapioca de la playa|Une file constante au kiosque de tapioca de la plage|浜辺のタピオカ屋台に途切れぬ行列",
    "The griddle never cooled down between orders, cheese and coconut tapioca crepes flipped out one after another for a line of sunbathers who all seemed to arrive hungry at once. By closing time the flour sack was nearly empty and the tip jar was heavier than the till.|La plancha nunca se enfrió entre pedido y pedido, con crepes de tapioca de queso y coco saliendo uno tras otro para una fila de bañistas que parecían llegar todos hambrientos a la vez. A la hora de cerrar, el saco de harina estaba casi vacío y el bote de propinas pesaba más que la caja.|La plaque n'a jamais refroidi entre les commandes, crêpes de tapioca au fromage et à la noix de coco enchaînées les unes après les autres pour une file de baigneurs qui semblaient tous arriver affamés en même temps. À la fermeture, le sac de farine était presque vide et le pot à pourboires plus lourd que la caisse.|鉄板は注文の合間も冷める暇がなく、チーズとココナッツのタピオカ生地が次々と焼き上がっていった。日光浴の客の列は、みな示し合わせたように空腹でやってきたようだった。閉店時にはタピオカ粉の袋はほぼ空になり、チップの瓶はレジより重くなっていた。",
  ),
  ev(
    "forro-sao-joao", "gain", ["ne"], "🪗", 250,
    "An extra gig playing forró through São João|Un bolo extra tocando forró en San Juan|Un cachet supplémentaire à jouer du forró pour la Saint-Jean|サンジョアン祭りでフォホーを演奏する追加の仕事",
    "A neighbourhood arraiá needed a triangle player at the last minute, and three straight nights of forró under strings of paper flags paid better than most of the month's regular work combined. Dancing couples spin so close together in forró that a good player has to watch the crowd as much as the accordion.|Un arraiá de barrio necesitaba un triangulista a última hora, y tres noches seguidas de forró bajo hileras de banderines de papel pagaron mejor que la mayor parte del trabajo habitual del mes junto. En el forró las parejas bailan tan pegadas que un buen músico tiene que mirar tanto al gentío como al acordeón.|Un arraiá de quartier avait besoin d'un triangliste à la dernière minute, et trois nuits de forró d'affilée sous des guirlandes de fanions en papier ont mieux payé que la plupart du travail habituel du mois réuni. Dans le forró, les couples dansent si serrés qu'un bon musicien doit autant surveiller la foule que son accordéon.|近所のアハイアー(祭り)が土壇場でトライアングル奏者を求めていて、紙の旗飾りの下で三晩続けてフォホーを演奏すると、その月の普段の仕事の大半を合わせたより稼げた。フォホーの踊り手はとても近く寄り添って回るので、腕のいい奏者はアコーディオンと同じくらい客の様子にも目を配らねばならない。",
    [1, 2],
  ),
  ev(
    "chuva-quiosque", "loss", ["ne"], "🌧️", 180,
    "A sudden downpour clears the beach kiosk|Un aguacero repentino vacía el quiosco de playa|Une averse soudaine vide le kiosque de plage|突然の豪雨で浜辺の屋台が空になる",
    "A squall blew in off the water without warning and emptied the beach in minutes, taking every customer with it and leaving a full batch of shrimp already breaded and ready to fry. None of it kept well enough to sell the next day.|Un chubasco llegó del mar sin avisar y vació la playa en minutos, llevándose a todos los clientes y dejando un lote entero de camarones ya empanados y listos para freír. Nada de eso se conservó lo bastante bien como para venderlo al día siguiente.|Un grain a soufflé du large sans prévenir et a vidé la plage en quelques minutes, emportant chaque client et laissant un plein lot de crevettes déjà panées et prêtes à frire. Rien de tout cela ne s'est assez bien conservé pour être vendu le lendemain.|海のほうから前触れなく突風混じりの雨が吹きつけ、数分で浜辺を空にしてしまい、客を一人残らず連れ去った。すでに衣をつけて揚げる準備をしていたエビが丸ごと残された。どれも翌日まで持たせるほど日持ちがしなかった。",
  ),

  // ---- co 中西部 ----
  ev(
    "pequi-colheita", "gain", ["co"], "🌰", 220,
    "A strong harvest of pequi from the cerrado|Una cosecha abundante de pequi del cerrado|Une bonne récolte de pequi dans le cerrado|セラードでの豊作のペキ",
    "The pequi trees fruited heavily this season, and a basket of the small yellow fruit — prized for the rich, sharp-smelling pulp cooked into rice but treated with real caution for the spines hidden inside — sold out at the market within an hour. Everyone here learns young to eat around the thorns rather than bite straight through.|Los árboles de pequi dieron mucho fruto esta temporada, y una cesta de la pequeña fruta amarilla —apreciada por la pulpa espesa y de olor intenso que se cocina con arroz, pero tratada con verdadera cautela por las espinas ocultas dentro— se agotó en el mercado en una hora. Aquí todos aprenden de niños a comer esquivando las espinas en vez de morder directo.|Les arbres de pequi ont beaucoup fructifié cette saison, et un panier de ce petit fruit jaune — prisé pour sa pulpe épaisse et odorante cuisinée avec du riz, mais manié avec une vraie prudence à cause des épines cachées à l'intérieur — s'est vendu en une heure au marché. Ici, tout le monde apprend enfant à manger en évitant les épines plutôt qu'à mordre directement.|今シーズンはペキの木が豊かに実をつけ、濃厚で香りの強い果肉を米と炊き込むのに珍重される、この小さな黄色い実の入った籠は、中に隠れた棘に本気で気をつけながら扱われつつも、市場で1時間もしないうちに売り切れた。ここでは誰もが子供のうちから、棘をよけて食べる術を身につける。",
    [3, 4],
  ),
  ev(
    "pneu-furado", "loss", ["co"], "🛞", 200,
    "A flat tyre on a long dirt road between farms|Un pinchazo en un largo camino de tierra entre haciendas|Une crevaison sur une longue piste entre les fermes|農場間の長い未舗装路でのパンク",
    "The nearest town with a working tyre shop was two hours off in either direction, and the spare had gone flat months earlier without anyone getting around to fixing it. Distances out here are measured in hours of driving rather than kilometres for good reason.|El pueblo más cercano con un taller de neumáticos en funcionamiento quedaba a dos horas en cualquier dirección, y el repuesto se había desinflado meses atrás sin que nadie se ocupara de arreglarlo. Aquí las distancias se miden en horas de viaje más que en kilómetros, y con razón.|La ville la plus proche avec un atelier de pneus en état de marche se trouvait à deux heures dans les deux sens, et la roue de secours était à plat depuis des mois sans que personne ne s'en occupe. Ici, les distances se mesurent en heures de route plutôt qu'en kilomètres, et pour de bonnes raisons.|使えるタイヤ店がある最寄りの町はどちらの方向にも2時間かかり、予備のタイヤも何か月も前から空気が抜けたまま放置されていた。この土地で距離がキロメートルではなく走行時間で語られるのには、もっともな理由がある。",
  ),
  ev(
    "geada-safra", "loss", ["co"], "🥶", 230,
    "An unexpected frost bites the soy fields|Una helada inesperada golpea los soyales|Une gelée inattendue frappe les champs de soja|思わぬ霜が大豆畑を痛める",
    "A cold front pushed further north than usual and left frost on leaves that had never needed to survive one, and the bruised patch of the field had to be written off before the rest of the harvest could even be brought in. The rest of the season's numbers still looked fine on paper, which made this one field sting more.|Un frente frío avanzó más al norte de lo habitual y dejó escarcha en hojas que nunca habían tenido que sobrevivir a una, y hubo que dar por perdida esa parte del campo antes de poder siquiera recoger el resto de la cosecha. Las cifras del resto de la temporada seguían viéndose bien sobre el papel, lo que hizo que ese único campo doliera más.|Un front froid a poussé plus au nord que d'habitude et a laissé du givre sur des feuilles qui n'avaient jamais eu à en survivre, et cette portion abîmée du champ a dû être radiée avant même de pouvoir rentrer le reste de la récolte. Les chiffres du reste de la saison restaient bons sur le papier, ce qui a rendu ce seul champ d'autant plus douloureux.|寒波がいつもより北まで押し寄せ、これまで一度も霜に耐える必要のなかった葉に霜を降らせた。畑の傷んだ一角は、残りの収穫を運び出す前に見切りをつけざるを得なかった。今季の他の数字は帳簿の上では悪くなかっただけに、この一角の損失がなおさら痛かった。",
    [6, 7],
  ),

  // ---- se 南東部 ----
  ev(
    "praia-gorjeta", "gain", ["se"], "🏖️", 230,
    "A big tip day working the beach cooler|Un gran día de propinas trabajando la nevera de la playa|Une grosse journée de pourboires à la glacière de la plage|浜辺のクーラーボックス売りでチップが弾んだ日",
    "Carrying an ice-packed cooler of mate and beer up and down the sand all afternoon is brutal work, but a heatwave weekend meant customers waved you over before you'd even finished your call, and the tips alone covered what the drinks brought in. The trick, regulars say, is remembering who ordered what three trips ago.|Cargar una nevera con hielo llena de mate y cerveza por la arena toda la tarde es un trabajo brutal, pero un fin de semana de ola de calor hizo que los clientes llamaran antes de terminar el pregón, y las propinas por sí solas cubrieron lo que dieron las bebidas. El truco, dicen los habituales, es recordar quién pidió qué hace tres vueltas.|Porter une glacière de maté et de bière sur le sable tout l'après-midi est un travail brutal, mais un week-end de canicule a fait que les clients faisaient signe avant même la fin du boniment, et les pourboires seuls ont couvert ce qu'ont rapporté les boissons. L'astuce, disent les habitués, est de se souvenir qui a commandé quoi trois passages plus tôt.|氷を詰めたクーラーボックスにマテ茶とビールを入れて午後じゅう砂浜を往復するのはきつい仕事だが、猛暑の週末には呼び声を終える前から客に手招きされ、チップだけで飲み物の売上を上回った。常連いわく、コツは三周前に誰が何を頼んだか覚えていることだという。",
  ),
  ev(
    "onibus-batedor", "loss", ["se"], "🚌", 200,
    "Pickpocketed on a packed rush-hour bus|Le roban la cartera en un autobús abarrotado en hora punta|Détroussé dans un bus bondé aux heures de pointe|満員のラッシュ時のバスですりに遭う",
    "The bus lurched hard around a corner, everyone grabbed for a rail at once, and only two stops later did the missing wallet register. Rush hour on these routes is crowded enough that a practised hand barely needs a second of cover.|El autobús dio un bandazo fuerte en una curva, todos se agarraron a la vez a una barra, y solo dos paradas después se notó la falta de la cartera. La hora punta en estas rutas está tan abarrotada que una mano experta apenas necesita un segundo de distracción.|Le bus a fait une embardée dans un virage, tout le monde s'est agrippé en même temps à une barre, et ce n'est que deux arrêts plus tard que l'absence du portefeuille s'est fait sentir. L'heure de pointe sur ces lignes est si bondée qu'une main experte n'a besoin que d'une seconde de couverture.|バスが角で大きく揺れ、乗客が一斉に手すりをつかんだ。財布がないと気づいたのは、そのわずか二停留所後のことだった。この路線のラッシュ時はあまりに混み合っていて、手慣れた者ならほんの一瞬のどさくさで事足りる。",
  ),
  ev(
    "engarrafamento-multa", "loss", ["se"], "🚗", 190,
    "Missing a delivery window stuck in gridlock|Perdiendo una franja de entrega atascado en un embotellamiento|Rater un créneau de livraison coincé dans les embouteillages|大渋滞で配達時間に遅れる",
    "What should have been a twenty-minute crossing of the city stretched past two hours on an avenue that never fully cleared, and the missed delivery window came with a penalty deducted straight from the day's pay. Everyone in the queue seemed to be checking the same traffic app and getting the same bad news.|Lo que debería haber sido un cruce de veinte minutos por la ciudad se alargó más de dos horas en una avenida que nunca llegó a despejarse del todo, y la franja de entrega perdida trajo una penalización descontada directamente del pago del día. Todos en la fila parecían mirar la misma app de tráfico y recibir la misma mala noticia.|Ce qui aurait dû être une traversée de vingt minutes de la ville s'est étiré sur plus de deux heures sur une avenue qui ne s'est jamais vraiment dégagée, et le créneau de livraison manqué a valu une pénalité déduite directement de la paie du jour. Tout le monde dans la file semblait consulter la même appli de trafic et recevoir la même mauvaise nouvelle.|本来なら20分で渡れるはずの市街地の横断が、まったく流れない大通りで2時間以上に伸びた。配達時間に間に合わなかった分、その日の稼ぎから直接罰金が引かれた。列に並ぶ誰もが同じ渋滞アプリを見て、同じ悪い知らせを受け取っているようだった。",
  ),

  // ---- su 南部 ----
  ev(
    "chimarrao-rodeio", "gain", ["su"], "🧉", 240,
    "An extra shift pouring chimarrão at a rodeio|Un turno extra sirviendo chimarrão en un rodeio|Un service supplémentaire à servir du chimarrão au rodeio|ロデイオでのシメロン茶注ぎの追加仕事",
    "The gaucho festival needed another pair of hands refilling thermoses of hot water for the chimarrão gourds passed hand to hand around the fire, and a weekend of steady work paid enough to make the long drive out worthwhile. Regulars can tell by the sound alone when a gourd needs topping up.|El festival gaucho necesitaba otro par de manos rellenando termos de agua caliente para los mates de chimarrão que pasaban de mano en mano junto al fuego, y un fin de semana de trabajo constante pagó lo suficiente para justificar el largo viaje. Los habituales reconocen solo por el sonido cuándo hay que rellenar un mate.|Le festival gaucho avait besoin d'une autre paire de mains pour remplir les thermos d'eau chaude destinés aux calebasses de chimarrão passées de main en main autour du feu, et un week-end de travail régulier a suffisamment payé pour justifier le long trajet. Les habitués reconnaissent au seul bruit quand une calebasse a besoin d'être rechargée.|ガウーショの祭りでは、焚き火を囲んで手から手へ渡されるシメロン用の瓢箪に注ぐ湯の魔法瓶を補充する人手がもう一人必要で、週末を通した仕事で長距離の運転をしてきた甲斐のある稼ぎになった。常連は音だけで瓢箪の湯が切れたと分かるという。",
  ),
  ev(
    "geada-vinicola", "loss", ["su"], "🍇", 210,
    "A cold snap nips the vineyard's bonus harvest|Una ola de frío echa a perder la cosecha extra del viñedo|Un coup de froid abîme la récolte bonus du vignoble|寒波でブドウ畑の増収分が失われる",
    "A late cold snap swept down over the hillside rows the week before harvest, and the bud damage meant a noticeably smaller yield than the season had promised, cutting into the bonus that a good crop would otherwise have paid out. The wine itself, growers say, will probably still turn out fine — there just won't be as much of it.|Una ola de frío tardía barrió las hileras de la ladera la semana antes de la cosecha, y el daño en los brotes supuso un rendimiento notablemente menor del que prometía la temporada, recortando el extra que una buena cosecha habría pagado. El vino en sí, dicen los productores, probablemente saldrá bien de todos modos, solo que habrá menos cantidad.|Un coup de froid tardif a balayé les rangs du coteau la semaine avant la récolte, et les dégâts sur les bourgeons ont entraîné un rendement nettement plus faible que ce que promettait la saison, rognant sur le bonus qu'une bonne récolte aurait sinon rapporté. Le vin lui-même, disent les viticulteurs, sera sans doute bon quand même — il y en aura simplement moins.|収穫の一週間前、遅い寒波が丘の斜面の畝を襲い、芽が傷んで今季見込まれていたよりも目に見えて少ない収量になった。豊作であれば入るはずだった増収分が削られた。ワインそのものはおそらく悪くない出来になるだろうと栽培者は言うが、量が少ないだけである。",
    [7, 8],
  ),
  ev(
    "erva-mate-feira", "gain", ["su"], "🧉", 220,
    "A busy Saturday selling erva-mate at the fair|Un sábado ajetreado vendiendo yerba mate en la feria|Un samedi chargé à vendre de la yerba mate à la foire|市の日、シメロン茶葉が飛ぶように売れる",
    "Bags of freshly ground erva-mate moved faster than they could be restocked at the Saturday fair, regulars filling their own gourds to sniff the blend before buying the way others might sample cheese. By early afternoon the stall had nothing left but the empty crates.|Las bolsas de yerba mate recién molida se vendieron más rápido de lo que se podían reponer en la feria del sábado, con habituales llenando sus propios mates para oler la mezcla antes de comprar, como quien prueba un queso. A primera hora de la tarde, el puesto no tenía más que cajas vacías.|Les sachets de yerba mate fraîchement moulue sont partis plus vite qu'on ne pouvait les réapprovisionner à la foire du samedi, des habitués remplissant leur propre calebasse pour humer le mélange avant d'acheter, comme d'autres goûteraient un fromage. Au début de l'après-midi, l'étal n'avait plus que des caisses vides.|土曜の市では挽きたてのシメロン茶葉の袋が補充が追いつかないほどの速さで売れていった。常連はチーズの試食のように、自分の瓢箪に注いで香りを確かめてから買っていく。午後の早い時間には、屋台には空の木箱しか残っていなかった。",
  ),
];
