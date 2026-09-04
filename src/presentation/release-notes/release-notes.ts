import { LocalizedText } from "../../domain/shared-kernel/localized-text";

/**
 * プレイヤー向けのリリースノート。
 *
 * 開発上の変更履歴(コミットログ)ではなく、**遊ぶ人から見て何が変わったか**を書く。
 * アプリ本体と同じく4言語で表示するため、文言は `LocalizedText` で持つ。
 * 新しい版は配列の先頭に追加すること(新しい順に表示される)。
 */
export interface ReleaseNote {
  readonly version: string;
  /** 公開日(YYYY-MM-DD)。 */
  readonly date: string;
  readonly title: LocalizedText;
  readonly highlights: readonly LocalizedText[];
}

/** `_t("en|es|fr|ja")` と同じ書き方で4言語を1行にまとめるヘルパー。 */
function t(source: string): LocalizedText {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const RELEASE_NOTES: readonly ReleaseNote[] = [
  {
    version: "0.64.0",
    date: "2026-09-04",
    title: t(
      "A world atlas you can wander|Un atlas del mundo para pasear|Un atlas du monde où flâner|歩ける世界地図ができました",
    ),
    highlights: [
      t(
        "There is a new page: one map of the whole world that you can drag and zoom, the way you would any map. Pull back and the whole globe fits. Lean in and the boards appear, then their coastlines, then the towns on them. It is under “Atlas” at the foot of every page — you do not have to be in a game to open it.|Hay una página nueva: un mapa del mundo entero que puedes arrastrar y ampliar, como cualquier mapa. Aléjate y cabe el globo entero. Acércate y aparecen los tableros, luego sus costas, luego sus pueblos. Está en «Atlas», al pie de cada página, y no hace falta estar jugando para abrirlo.|Une nouvelle page : une carte du monde entier que tu peux faire glisser et agrandir, comme n’importe quelle carte. Recule et le globe entier tient. Approche et les plateaux apparaissent, puis leurs côtes, puis leurs villes. C’est « Atlas », en bas de chaque page — nul besoin d’être en partie pour l’ouvrir.|**新しいページができました。**世界ぜんぶが1枚の地図になっていて、ふつうの地図と同じように**つかんで動かせて、寄ったり引いたりできます。**引けば地球全体、寄れば盤面、さらに寄ると海岸線、その先に町。どのページの下からでも「地図帳」で開けます。遊んでいる最中でなくても開けます。",
      ),
      t(
        "Tap a town and it tells you about itself — its picture, its one line, and the few sentences behind it. Sapporo was laid out on a grid in 1869 with American advisers, unlike any older Japanese city. Ōarai has a torii standing in the waves. There are 2,218 towns across 47 boards, and every one of them has something to say.|Toca un pueblo y te cuenta lo suyo: su dibujo, su frase y las pocas líneas que hay detrás. Sapporo se trazó en cuadrícula en 1869 con asesores estadounidenses, a diferencia de cualquier ciudad japonesa más antigua. Ōarai tiene un torii entre las olas. Son 2.218 pueblos en 47 tableros, y todos tienen algo que contar.|Touche une ville et elle se raconte : son dessin, sa phrase, et les quelques lignes derrière. Sapporo fut tracée en damier en 1869 avec des conseillers américains, contrairement à toute ville japonaise plus ancienne. Ōarai a un torii dressé dans les vagues. 2 218 villes sur 47 plateaux, et chacune a quelque chose à dire.|**町を押すと、その町の話が出ます。**絵と、一言と、その裏にある数行。札幌は1869年にアメリカ人顧問と碁盤の目に引かれた、それまでの日本の町とは違う町。大洗には波間に立つ鳥居。**47盤面に2,218の町があり、そのどれもが何かを語ります。**気に入った土地が見つかったら、その場から「この盤面で遊ぶ」へ行けます。",
      ),
      t(
        "And it shows you the holes. Land with a board of its own is gold; land with none is hatched and dark. Africa, the Middle East and the Arctic go dark — about a quarter of the world’s land has no board of its own yet. It is an honest picture of how far this has got, and of where it could go next.|Y enseña los huecos. La tierra con tablero propio va en dorado; la que no lo tiene, rayada y oscura. África, Oriente Medio y el Ártico se oscurecen: cerca de una cuarta parte de la tierra firme aún no tiene tablero propio. Es un retrato honesto de hasta dónde ha llegado esto y de por dónde podría seguir.|Et elle montre les trous. Les terres qui ont leur plateau sont dorées ; celles qui n’en ont pas sont hachurées et sombres. L’Afrique, le Moyen-Orient et l’Arctique s’assombrissent : près d’un quart des terres émergées n’a pas encore de plateau. C’est un portrait honnête de ce qui existe et de ce qui reste à faire.|**そして、まだ無い場所も見えます。**自分の盤面がある陸は金色、無い陸は暗い斜線。**アフリカ・中東・北極圏が暗く沈みます**——陸地のおよそ4分の1に、まだその土地の盤面がありません。どこまで来たのかと、次にどこへ行けるのかが、そのまま1枚の絵になっています。",
      ),
    ],
  },
  {
    version: "0.63.0",
    date: "2026-09-03",
    title: t(
      "The map tells you what each town is for|El mapa te dice a qué se dedica cada pueblo|La carte dit ce que chaque ville a de particulier|地図が、その町の顔を見せるようになりました",
    ),
    highlights: [
      t(
        "The Ibaraki board had thirty-six towns sharing fourteen symbols. Ōarai and any other shrine town wore the same little mark, so the map could tell you a name but never what the place was known for. Every town now has its own: a torii standing in the waves at Ōarai, a kiln jar at Kasama, four hectares of sunflowers at Naka, a melon at Hokota, the tall chimney at Hitachi, a bride’s boat at Itako.|El tablero de Ibaraki tenía treinta y seis pueblos compartiendo catorce símbolos. Ōarai y cualquier otro pueblo con santuario llevaban la misma marca, así que el mapa daba el nombre pero nunca el porqué. Ahora cada pueblo tiene el suyo: un torii entre las olas en Ōarai, una tinaja de alfar en Kasama, cuatro hectáreas de girasoles en Naka, un melón en Hokota, la gran chimenea de Hitachi, la barca de la novia en Itako.|Le plateau d’Ibaraki avait trente-six villes pour quatorze symboles. Ōarai et n’importe quelle autre ville à sanctuaire portaient la même marque : la carte donnait un nom, jamais une raison. Chaque ville a désormais le sien : un torii dans les vagues à Ōarai, une jarre de four à Kasama, quatre hectares de tournesols à Naka, un melon à Hokota, la haute cheminée de Hitachi, la barque de la mariée à Itako.|**茨城盤面は、36の町が14種類の印を使い回していました。**大洗も、ほかの神社の町も、同じ小さな印。地図は名前は教えてくれても、そこが何の土地なのかは教えてくれませんでした。**いまは町ごとに違う印が付きます。**大洗は波間に立つ鳥居、笠間は窯の甕、那珂は四ヘクタールのひまわり、鉾田はメロン、日立は大煙突、潮来は花嫁の舟。",
      ),
      t(
        "The symbols also grow as you lean in. They used to be a fixed size on the board, which meant they were smallest exactly where towns crowd together and you most wanted to read them. Now they follow the zoom, up to half again as large. Pulled all the way out to the whole map, they go back to being dots — at that distance the towns sit fourteen pixels apart, and a readable picture would only have swallowed the names.|Los símbolos además crecen cuando te acercas. Antes tenían un tamaño fijo, así que eran más pequeños justo donde los pueblos se apiñan y más falta hacía leerlos. Ahora siguen al zoom, hasta una vez y media. En el mapa completo vuelven a ser puntos: a esa distancia los pueblos están a catorce píxeles y un dibujo legible solo se habría comido los nombres.|Les symboles grandissent aussi quand tu t’approches. Ils avaient une taille fixe : ils étaient donc les plus petits là où les villes se serrent et où on veut justement les lire. Ils suivent maintenant le zoom, jusqu’à une fois et demie. Sur la carte entière ils redeviennent des points : à cette distance les villes sont à quatorze pixels et un dessin lisible n’aurait fait qu’avaler les noms.|**印は、寄るほど大きくなります。**これまでは盤面上で大きさが固定だったので、**町が密集している盤面ほど画面上では小さく**、いちばん読みたいところで読めませんでした。いまは寄り具合に合わせて1.5倍まで育ちます。全体表示まで引くと、また点に戻ります——その距離では町どうしが14ピクセルしか離れておらず、読める絵を置くと名前を飲み込んでしまうためです。",
      ),
      t(
        "And the towns that matter right now say a word about themselves. The destination, the town you are standing in, and the towns you could stop at this turn carry a short line — “A torii gate standing in the waves”, “Four hectares of sunflowers” — placed only where it will not push a name off the map. At most five at a time, so the map stays a map.|Y los pueblos que ahora importan dicen algo de sí mismos. El destino, el pueblo donde estás y los pueblos donde podrías parar este turno llevan una línea corta —«Un torii entre las olas», «Cuatro hectáreas de girasoles»— colocada solo donde no expulse a ningún nombre. Cinco como mucho a la vez, para que el mapa siga siendo un mapa.|Et les villes qui comptent en ce moment disent un mot d’elles-mêmes. La destination, la ville où tu te trouves et celles où tu peux t’arrêter ce tour portent une courte ligne — « Un torii dans les vagues », « Quatre hectares de tournesols » — placée seulement là où elle ne chasse aucun nom. Cinq au plus à la fois, pour que la carte reste une carte.|**いま関係のある町だけが、自分のことを一言だけ話します。**目的地、いま立っている町、この手番で止まれる町に、短い一文が付きます——「波間に立つ鳥居」「四ヘクタールのひまわり」。**ほかの町の名前を押しのける場所には出しません。**一度に多くても5つまでなので、地図は地図のままです。",
      ),
    ],
  },
  {
    version: "0.62.0",
    date: "2026-09-03",
    title: t(
      "Arriving is the moment now|Llegar ya es EL momento|L’arrivée devient le grand moment|到着が、いちばんの見せ場になりました",
    ),
    highlights: [
      t(
        "Reaching the destination now takes over the whole screen — the town you reached, who reached it, and the prize, with a halo and confetti. A first arrival gets more of everything. It happens whoever arrives, so you will never again learn about someone else’s big moment from the log afterwards. Tap anywhere to move on.|Llegar al destino ahora ocupa toda la pantalla: el pueblo alcanzado, quién llegó y el premio, con aureola y confeti. Una primera llegada se lleva más de todo. Ocurre llegue quien llegue, así que nunca más te enterarás del gran momento de otro leyendo el diario. Toca donde sea para seguir.|Atteindre la destination prend maintenant tout l’écran : la ville atteinte, qui l’a atteinte, et le prix, avec halo et confettis. Une première arrivée en reçoit davantage. Cela se produit quel que soit l’arrivant : tu n’apprendras plus le grand moment d’un autre après coup dans le journal. Touche n’importe où pour continuer.|**目的地への到着が、画面いっぱいの演出になりました。**着いた町、着いた人、受け取った賞金を、後光と紙吹雪とともに見せます。一番乗りならさらに華やかに。**誰が着いても出る**ので、他の人の見せ場をあとから旅の記録で知ることはもうありません。どこを押しても先へ進めます。",
      ),
      t(
        "The finish is worth reaching. The standings now show the placing, each traveller’s colour, their cash and businesses separately, and the towns they took whole — with first place given its own card. The award ceremony hands out its prizes with the winners’ colours beside their names.|El final merece la pena. La clasificación muestra ahora el puesto, el color de cada viajero, su efectivo y sus negocios por separado, y los pueblos que se llevaron enteros, con una tarjeta propia para el primer puesto. La ceremonia entrega sus premios con el color de cada ganador junto al nombre.|La fin vaut le voyage. Le classement montre désormais la place, la couleur de chaque voyageur, ses espèces et ses commerces séparément, et les villes prises en entier — la première place ayant sa propre carte. La cérémonie remet ses prix avec la couleur de chaque lauréat à côté du nom.|**走りきった終わりが、報われるようになりました。**順位画面に、順位・旅人の色・現金と物件の内訳・独占した町を出し、**1位は専用の札**で大きく見せます。表彰式でも、受賞者の名前の隣に駒の色が付きます。",
      ),
      t(
        "If you said you are new here, the first few turns talk to you. One line at a time, in the corner, never in your way: press the die; pick the lit square with the smaller number; and when you first stop in a town, what buying a business actually does. You can dismiss it for good with one tap.|Si dijiste que eres nuevo, los primeros turnos te hablan. Una línea cada vez, en una esquina, sin estorbar: pulsa el dado; elige la casilla iluminada con el número más bajo; y cuando pares por primera vez en un pueblo, qué hace en realidad comprar un negocio. Puedes quitarlo para siempre con un toque.|Si tu as dit que tu débutes, les premiers tours te parlent. Une ligne à la fois, dans un coin, jamais gênante : appuie sur le dé ; choisis la case allumée au plus petit nombre ; et à ton premier arrêt en ville, ce que fait vraiment l’achat d’un commerce. Un seul geste pour l’enlever définitivement.|**「はじめて」で遊ぶ人には、最初の数手番だけ声をかけます。**画面の下に1行ずつ、手は止めずに——サイコロを押すこと、光っているマスは**数字が小さいほうが目的地に近い**こと、そして初めて町に止まったときに、物件を買うと何が起きるか。ひと押しで消せます。",
      ),
      t(
        "Items that carry you now let you choose where to land. A plane ticket used to fling you 8–12 squares somewhere random — once, it cost ¥2,400,000 and moved the destination one square closer. Now the reachable squares light up with their distance-to-destination on them, and you pick. The distance is still luck; where you step off is not.|Los objetos que te transportan ahora te dejan elegir dónde bajar. Un billete de avión te lanzaba 8–12 casillas al azar: una vez costó ¥2.400.000 y acercó el destino una sola casilla. Ahora las casillas alcanzables se iluminan con su distancia al destino y eliges tú. La distancia sigue siendo suerte; dónde te bajas, no.|Les objets qui t’emportent te laissent maintenant choisir où descendre. Un billet d’avion te projetait de 8 à 12 cases au hasard : une fois, il a coûté ¥2 400 000 pour rapprocher la destination d’une seule case. Désormais les cases atteignables s’allument avec leur distance à la destination, et tu choisis. La distance reste au hasard ; l’endroit où tu descends, non.|**運んでくれるアイテムで、降りる場所を選べるようになりました。**飛行機のチケットは 8〜12マス先の**行き先まで運任せ**で、¥2,400,000 を払って目的地まで1マスしか縮まないことがありました。いまは降りられるマスが「残り◯」の数字付きで光り、その中から選べます。**距離は運のままですが、どこで降りるかは自分で決められます。**",
      ),
      t(
        "The keyboard works properly. Space rolls the die and advances the cards, the arrow keys move between the lit squares, and Enter picks one — from anywhere on the page, without hunting for the button first. A small note says so once, the first time you can roll. Pass-and-play around one laptop just got easier.|El teclado ya funciona de verdad. Espacio tira el dado y pasa las cartas, las flechas se mueven entre las casillas iluminadas y Enter elige — desde cualquier punto de la página, sin buscar antes el botón. Un aviso pequeño lo explica una sola vez. Jugar por turnos alrededor de un portátil es ahora más cómodo.|Le clavier fonctionne vraiment. Espace lance le dé et fait avancer les cartes, les flèches se déplacent entre les cases allumées, et Entrée choisit — depuis n’importe où dans la page, sans chercher le bouton. Un petit avis l’explique une seule fois. Jouer à tour de rôle autour d’un portable devient plus simple.|**キーボードがきちんと使えるようになりました。****Space** で振る・カードを進める、**←→** で光っているマスを移る、**Enter** で決定。**画面のどこにいても効きます**(これまではサイコロのボタンを Tab で探し直す必要がありました)。初めて振れるときに一度だけ小さく案内します。1台のパソコンを回して遊ぶときが楽になります。",
      ),
      t(
        "And the buttons say what they are. The map button at the corner of the board now reads “Whole map” and shows whether it is on or off; the music note says whether music is on; the compass says north is up. Hover, focus, or hold your finger on any of them. In the last two months of the journey, the music quickens — the same tune of the land you are in, but restless.|Y los botones dicen lo que son. El botón del mapa en la esquina ahora dice «Mapa completo» y si está activado; la nota musical dice si hay música; la brújula dice que el norte está arriba. Pasa el ratón, enfócalos o mantén el dedo. En los dos últimos meses del viaje la música se acelera: la misma melodía de la tierra, pero inquieta.|Et les boutons disent ce qu’ils sont. Le bouton carte au coin du plateau affiche « Carte entière » et son état ; la note de musique dit si la musique joue ; la boussole dit que le nord est en haut. Survole-les, tabule dessus, ou garde le doigt appuyé. Dans les deux derniers mois du voyage, la musique s’accélère : le même air du pays, mais fébrile.|**ボタンが、自分が何なのかを言うようになりました。**盤面の隅の地図ボタンは「全体表示」と名乗り、いま入っているか切れているかを見せます。音符は音楽の入切を、方位磁針は「北が上」を言います。指で長押ししても出ます。そして**旅の最後の2ヶ月は音楽が速くなります**——その土地の曲のまま、落ち着かなくなります。",
      ),
    ],
  },
  {
    version: "0.61.0",
    date: "2026-09-03",
    title: t(
      "You can see what just happened|Ahora se ve lo que acaba de pasar|On voit enfin ce qui vient de se passer|起きたことが、その場で見えるようになりました",
    ),
    highlights: [
      t(
        "The big moments now stop the game and show themselves, whoever they happen to. Someone reaching the destination, the next destination being drawn, the spirit changing shoulders, a town falling to one owner — you used to find these out afterwards by reading the travel log, if you read it at all. Now they play out in front of you, and you can tap to move on.|Los momentos grandes ahora paran la partida y se muestran, le pasen a quien le pasen. Alguien llega al destino, se sortea el siguiente, el espíritu cambia de hombro, un pueblo entero cae en las mismas manos: antes te enterabas después leyendo el diario, si es que lo leías. Ahora ocurren delante de ti, y puedes tocar para seguir.|Les grands moments arrêtent maintenant la partie et se montrent, quel que soit celui à qui ils arrivent. Quelqu’un atteint la destination, la suivante est tirée, l’esprit change d’épaule, une ville tombe entière dans les mêmes mains : avant, tu l’apprenais après coup dans le journal, si tu le lisais. Maintenant ça se joue devant toi, et tu peux toucher pour continuer.|**大きな出来事は、誰に起きても画面を止めて見せます。**誰かの目的地到着、次の目的地の抽選、厄災の神の移動、町の独占——これまでは、あとから旅の記録を読んで知るしかありませんでした。いまは目の前で起きます。タップで先へ進めます。",
      ),
      t(
        "The spirit now explains itself. When it climbs onto someone it says why (it goes to whoever is farthest from the destination) and how to get rid of it (get ahead of someone, or pay with an offering). Every misfortune card now states what it actually did — the exact amount, the turn you lose, the business you lost by name. And in your first year, if you have said you are new here, it will not strike you three turns in a row.|El espíritu ahora se explica. Cuando se sube a alguien dice por qué (va al que está más lejos del destino) y cómo quitárselo (adelanta a alguien o paga con una ofrenda). Cada carta de desgracia dice ahora lo que hizo de verdad: la cantidad exacta, el turno que pierdes, el negocio que perdiste con su nombre. Y en tu primer año, si has dicho que eres nuevo, no te golpeará tres turnos seguidos.|L’esprit s’explique enfin. Quand il monte sur quelqu’un, il dit pourquoi (il va au plus éloigné de la destination) et comment s’en défaire (dépasse quelqu’un, ou paie avec une offrande). Chaque carte de malheur dit maintenant ce qu’elle a vraiment fait : le montant exact, le tour perdu, le commerce perdu et son nom. Et dans ta première année, si tu as dit que tu débutes, il ne te frappera pas trois tours d’affilée.|**厄災の神が、自分のことを説明するようになりました。**憑いた瞬間に、なぜあなたなのか(目的地からいちばん遠い人に憑く)と、どうすれば離れるか(誰かより先に進む/供物で払う)を出します。災難のカードには**何が起きたかを必ず書きます**——引かれた額、休む手番、失った物件の名前。さらに「はじめて」で遊んでいる最初の1年は、3手番続けて災難に遭うことがなくなりました。",
      ),
      t(
        "Money no longer changes without a reason you can see. Every three months a settlement card shows what each traveller earned, side by side. The destination prize says out loud that it grows every month it goes unclaimed. And the calendar now sits above your turn panel: which month it is, and how many are left.|El dinero ya no cambia sin un motivo visible. Cada tres meses una tarjeta de balance muestra lo que ganó cada viajero, uno al lado del otro. El premio del destino dice en voz alta que crece cada mes que nadie lo reclama. Y el calendario está ahora encima del panel de turno: en qué mes estás y cuántos quedan.|L’argent ne change plus sans raison visible. Tous les trois mois, une carte de bilan montre ce que chaque voyageur a gagné, côte à côte. Le prix de la destination dit clairement qu’il grandit chaque mois où personne ne le réclame. Et le calendrier se tient maintenant au-dessus du panneau de tour : quel mois il est, et combien il en reste.|**お金が、理由の見えないまま増えたり減ったりしなくなりました。**3ヶ月ごとに「決算」の札が出て、誰がいくら受け取ったかを並べて見せます。目的地の賞金には「1ヶ月経つごとに増える」と書きました。そして**手番パネルの上に暦を置きました**——いま何月で、あと何ヶ月か。",
      ),
      t(
        "The board is easier to read. After a roll, each square you can reach carries a small number: how far the destination will still be if you stop there. A faint gold trail shows the shortest way to the destination. Your own train is drawn a size larger with a coloured ring, so you can find yourself at a glance. The camera glides between turns instead of jumping.|El tablero se lee mejor. Tras la tirada, cada casilla alcanzable lleva un número: a cuánto quedará el destino si paras ahí. Un rastro dorado tenue marca el camino más corto al destino. Tu propio tren se dibuja un tamaño mayor y con un anillo de color, para encontrarte de un vistazo. La cámara se desliza entre turnos en vez de saltar.|Le plateau se lit mieux. Après le lancer, chaque case atteignable porte un petit nombre : à quelle distance sera la destination si tu t’y arrêtes. Une traînée dorée discrète montre le chemin le plus court. Ton propre train est dessiné une taille au-dessus, avec un anneau de couleur, pour te retrouver d’un coup d’œil. La caméra glisse entre les tours au lieu de sauter.|**盤面が読みやすくなりました。**サイコロを振ったあと、行けるマスの上に**「そこで止まると目的地まで残り何マスか」**の数字が出ます。目的地までの近道は淡い金の点線でたどれます。自分の駒は一回り大きく、色の輪を付けて描くので、ひと目で見つかります。カメラは手番の切り替えで跳ばず、滑らかに移ります。",
      ),
      t(
        "And the little answers are back. The die no longer sits on the map after it has stopped — it shrinks into the die button, out of the way of the squares you are choosing. Stopping on an empty square now gets a whistle, a small bounce, and a line from the window telling you where you are. Buying a business raises a banner and lets you see the town turn your colour; selling one asks twice, and never right after you bought it.|Y vuelven las pequeñas respuestas. El dado ya no se queda sobre el mapa cuando para: se encoge hacia el botón del dado y deja libres las casillas. Parar en una casilla vacía ahora trae un silbato, un pequeño bote y una línea de ventanilla que te dice dónde estás. Comprar un negocio iza una bandera y te deja ver el pueblo tomar tu color; venderlo pregunta dos veces, y nunca justo después de comprarlo.|Et les petites réponses reviennent. Le dé ne reste plus sur la carte une fois arrêté : il se rétracte vers son bouton et libère les cases. S’arrêter sur une case vide donne maintenant un coup de sifflet, un petit rebond, et une ligne de fenêtre qui te dit où tu es. Acheter un commerce hisse une bannière et te laisse voir la ville prendre ta couleur ; en vendre un demande deux fois, et jamais juste après l’achat.|**小さな返事が戻ってきました。**サイコロは止まったあと盤面に居座らず、**出目のボタンへ縮んで収まります**(選びたいマスを覆いません)。何も無いマスに止まると、汽笛と駒の小さな弾み、そして「いまどこを走っているか」の一言が出ます。物件を買うとのぼりが立ち、町が自分の色に染まるところを見せます。売るときは二度たずね、**買った直後には売却を出しません。**",
      ),
      t(
        "Choosing where to ride was quietly misleading, and is not any more. Opening a new region now clears the board you had picked, so you never set off somewhere you did not choose. Boards inside a country (Japan has five) are listed beside the map instead of piling their names on top of each other. And if a journey is already saved, setting off asks first.|Elegir dónde viajar despistaba en silencio, y ya no. Abrir una región nueva ahora borra el tablero que tenías elegido, así que nunca sales hacia donde no elegiste. Los tableros dentro de un país (Japón tiene cinco) se listan junto al mapa en vez de amontonar sus nombres. Y si ya hay un viaje guardado, salir pregunta antes.|Choisir où rouler induisait discrètement en erreur, ce n’est plus le cas. Ouvrir une nouvelle région efface le plateau choisi : tu ne pars plus vers un endroit que tu n’as pas choisi. Les plateaux d’un pays (le Japon en a cinq) sont listés à côté de la carte au lieu d’empiler leurs noms. Et si un voyage est déjà sauvegardé, le départ demande d’abord.|**行き先の選びかたが、静かに誤解を招いていたのを直しました。**別の地域を開くと、前に選んでいた盤面は外れます(選んでいない場所に出発してしまうことがなくなりました)。国の中の盤面(日本には5つあります)は、名前を地図の上で重ねずに**地図の右の一覧**から選べます。そして**途中の旅があるときは、出発の前に一度たずねます。**",
      ),
    ],
  },
  {
    version: "0.60.0",
    date: "2026-08-28",
    title: t(
      "A tidier address|Una dirección más ordenada|Une adresse plus nette|住所が名前とそろいました",
    ),
    highlights: [
      t(
        "The game now lives at t29mato.github.io/world-express/. It has always called itself World Express on screen; the address said something else, and that has been quietly confusing for a while. Both now say the same thing.|El juego vive ahora en t29mato.github.io/world-express/. En pantalla siempre se ha llamado World Express, pero la dirección decía otra cosa, y eso llevaba tiempo confundiendo. Ahora ambas dicen lo mismo.|Le jeu se trouve désormais à t29mato.github.io/world-express/. À l'écran il s'est toujours appelé World Express ; l'adresse disait autre chose, ce qui prêtait à confusion depuis un moment. Les deux concordent enfin.|**遊ぶ場所が t29mato.github.io/world-express/ に変わりました。**画面ではずっと World Express と名乗っていたのに、住所だけ別の名前のままでした。これで両方そろいます。",
      ),
      t(
        "If you kept the old address, it will send you here on its own. If you added the game to your home screen from the old address, opening it once while online moves it across and clears out what it had stored; after that it works offline again as before.|Si guardaste la dirección anterior, te traerá aquí sola. Y si añadiste el juego a la pantalla de inicio desde la dirección antigua, ábrelo una vez con conexión: se trasladará solo y limpiará lo que tenía guardado. Después vuelve a funcionar sin conexión como antes.|Si vous aviez gardé l'ancienne adresse, elle vous amènera ici d'elle-même. Et si vous aviez ajouté le jeu à l'écran d'accueil depuis l'ancienne adresse, ouvrez-le une fois connecté : il se déplacera tout seul et videra ce qu'il avait stocké. Ensuite il refonctionne hors ligne comme avant.|**前の住所を覚えていても、そのままこちらへ案内されます。**前の住所からホーム画面に置いていた場合は、**通信できる状態で一度開いてください。**自動でこちらへ移り、古い持ち物を片付けます。そのあとは今までどおり圏外でも遊べます。",
      ),
      t(
        "Your saved games are untouched. They live in your browser under a name that has not changed, so a game left half-finished is still waiting where you left it.|Tus partidas guardadas no se tocan. Viven en tu navegador bajo un nombre que no ha cambiado, así que una partida a medias sigue esperándote donde la dejaste.|Vos parties sauvegardées ne bougent pas. Elles vivent dans votre navigateur sous un nom inchangé : une partie laissée en cours vous attend toujours là où vous l'avez laissée.|**セーブしたゲームはそのままです。**ブラウザの中に、名前を変えていない場所で残してあるので、途中の旅は途中のまま待っています。",
      ),
    ],
  },
  {
    version: "0.59.0",
    date: "2026-08-26",
    title: t(
      "Put it on your home screen|Llévalo en la pantalla de inicio|À garder sur l'écran d'accueil|ホーム画面に置けるようになりました",
    ),
    highlights: [
      t(
        "You can now keep World Express on your phone's home screen. Open it in Safari or Chrome, tap the share button, and choose “Add to Home Screen”. It gets its own icon and opens without an address bar or tabs — just the game. Nothing comes from an app store, and no account is needed.|Ahora puedes dejar World Express en la pantalla de inicio de tu móvil. Ábrelo en Safari o Chrome, toca el botón de compartir y elige «Añadir a pantalla de inicio». Tendrá su propio icono y se abrirá sin barra de direcciones ni pestañas: solo el juego. No viene de ninguna tienda y no hace falta cuenta.|Vous pouvez désormais garder World Express sur l'écran d'accueil de votre téléphone. Ouvrez-le dans Safari ou Chrome, touchez le bouton de partage et choisissez « Sur l'écran d'accueil ». Il obtient sa propre icône et s'ouvre sans barre d'adresse ni onglets : rien que le jeu. Rien ne passe par une boutique, et aucun compte n'est nécessaire.|**携帯のホーム画面に置けるようになりました。**SafariやChromeで開いて、共有ボタンから「ホーム画面に追加」を選んでください。**専用のアイコンができ、アドレスバーもタブも出ずにゲームだけが開きます。**ストアからの入手も、アカウントも要りません。",
      ),
      t(
        "It also runs without a connection. The game keeps itself on your device, so it opens on a train, on a plane, or anywhere the signal drops. Boards you have opened before stay playable; a board you have never opened still needs a connection the first time.|También funciona sin conexión. El juego se queda en tu dispositivo, así que se abre en el tren, en el avión o donde se caiga la señal. Los tableros que ya has abierto siguen jugables; uno que nunca hayas abierto sí necesita conexión la primera vez.|Il fonctionne aussi sans connexion. Le jeu reste sur votre appareil : il s'ouvre dans le train, dans l'avion, ou partout où le signal disparaît. Les plateaux déjà ouverts restent jouables ; un plateau jamais ouvert demande encore une connexion la première fois.|**圏外でも遊べます。**電車の中でも、飛行機の中でも立ち上がります。**一度開いた盤面はそのまま遊べます。**まだ一度も開いていない盤面だけは、最初の1回だけ通信が要ります。",
      ),
      t(
        "And when a new version arrives, the game tells you. A small note appears at the bottom with an Update button; press it and the new version loads. It never swaps itself while you are playing, and your journey is saved before it reloads.|Y cuando llega una versión nueva, el juego te avisa. Aparece un aviso pequeño abajo con un botón Actualizar; al pulsarlo se carga la versión nueva. Nunca se cambia sola mientras juegas, y tu viaje queda guardado antes de recargar.|Et quand une nouvelle version arrive, le jeu vous le dit. Un petit avis apparaît en bas avec un bouton Mettre à jour ; appuyez et la nouvelle version se charge. Le jeu ne se remplace jamais tout seul pendant que vous jouez, et votre partie est sauvegardée avant le rechargement.|**新しい版が出たら、その場で報せます。**画面の下に小さな報せと「更新」が出ます。押すと新しい版に切り替わります。**遊んでいる最中に勝手に入れ替わることはありません。**旅は手番ごとに保存されているので、切り替えても続きから遊べます。",
      ),
    ],
  },
  {
    version: "0.58.0",
    date: "2026-08-25",
    title: t(
      "Four ways to know a country|Cuatro formas de conocer un país|Quatre façons de connaître un pays|「どれくらい知っていますか」が4段階に",
    ),
    highlights: [
      t(
        "“New here” no longer hides two of the three answers. Hiding them made an easy question into a coin toss: get it right and you learned nothing, get it wrong and it just felt unfair. Everyone now sees all three answers, whatever they picked. What changes instead is the questions themselves — pick “New here” and you get the well-known things, the ones with a large hint inside them.|“Es nuevo” ya no oculta dos de las tres respuestas. Ocultarlas convertía una pregunta fácil en un cara o cruz: si acertabas no aprendías nada, y si fallabas solo quedaba la sensación de injusticia. Ahora todos ven las tres respuestas, sea cual sea su nivel. Lo que cambia son las preguntas: elige “Es nuevo” y te tocarán las cosas conocidas, las que llevan dentro una buena pista.|« Découverte » ne cache plus deux des trois réponses. Les cacher transformait une question facile en pile ou face : juste, on n'apprenait rien ; faux, il ne restait qu'un sentiment d'injustice. Tout le monde voit maintenant les trois réponses, quel que soit son niveau. Ce qui change, ce sont les questions : choisissez « Découverte » et vous aurez les faits connus, ceux qui portent en eux un gros indice.|**「はじめて」を選んでも、選択肢を2つに減らさなくなりました。**減らすと、易しくしたつもりが**ただの運試し**になっていました。当たっても何も学べず、外れたら理不尽さだけが残ります。**これからは、どの段を選んでも3つとも見えます。**かわりに変わるのは**問いのほう**です。「はじめて」を選ぶと、**よく知られた事実や、大きなヒントを含んだ問い**が出るようになります。",
      ),
      t(
        "And there is a fourth step now. “A little” and “Very well” were far apart, and anyone in between had to round themselves off in one direction or the other. “Quite well” sits between them. The reward still tilts the same way it always did: the less you claim to know, the more a right answer is worth, and the less a wrong one costs.|Y ahora hay un cuarto escalón. “Un poco” y “Muy bien” estaban muy separados, y quien quedaba en medio tenía que redondearse hacia un lado u otro. “Bastante bien” se sitúa entre ambos. La recompensa sigue inclinándose igual que siempre: cuanto menos digas saber, más vale un acierto y menos cuesta un fallo.|Et il y a désormais un quatrième palier. « Un peu » et « Très bien » étaient très éloignés, et ceux du milieu devaient s'arrondir d'un côté ou de l'autre. « Assez bien » se place entre les deux. La récompense penche toujours dans le même sens : moins vous prétendez savoir, plus une bonne réponse rapporte et moins une erreur coûte.|**段が1つ増えて4つになりました。**「すこし」と「くわしい」が離れすぎていて、あいだの人はどちらかに丸めるしかありませんでした。**「けっこう」**がそのあいだに入ります。取り分の傾きは今までどおりです——**知らないと申告するほど、正解の値打ちが上がり、外したときの損が軽くなります。**",
      ),
    ],
  },
  {
    version: "0.57.0",
    date: "2026-08-25",
    title: t(
      "A new home|Una nueva casa|Une nouvelle adresse|引っ越しました",
    ),
    highlights: [
      t(
        "The game has moved to t29mato.github.io/grand-express/. That is now the address to bookmark and to share. The old one still works, so nothing you have saved is lost — saved games live in your own browser and are not affected by the move at all.|El juego se ha mudado a t29mato.github.io/grand-express/. Esa es ahora la dirección para guardar en favoritos y compartir. La antigua sigue funcionando, así que no se pierde nada: las partidas guardadas viven en tu propio navegador y la mudanza no las toca.|Le jeu a déménagé vers t29mato.github.io/grand-express/. C'est désormais l'adresse à mettre en favori et à partager. L'ancienne fonctionne toujours : rien de ce que vous avez enregistré n'est perdu, les parties sauvegardées vivent dans votre navigateur et le déménagement ne les touche pas.|**遊ぶ場所が t29mato.github.io/grand-express/ に変わりました。**これからはこちらが正式な住所です。**前の住所もそのまま使えます。**セーブしたゲームはお使いのブラウザの中にあるので、引っ越しの影響を受けません。",
      ),
      t(
        "The feedback form now hands your words straight to GitHub instead of passing them through us. Press Send and a GitHub page opens with everything already filled in; press the button there and it becomes a public ticket you can follow. Nothing else about it changes — it was always a public ticket.|El formulario de comentarios ahora entrega tus palabras directamente a GitHub en vez de pasarlas por nosotros. Pulsa Enviar y se abre una página de GitHub con todo ya escrito; pulsa el botón de allí y se convierte en un ticket público que puedes seguir. Lo demás no cambia: siempre fue un ticket público.|Le formulaire de retour transmet désormais vos mots directement à GitHub au lieu de passer par nous. Appuyez sur Envoyer et une page GitHub s'ouvre, déjà remplie ; appuyez sur le bouton là-bas et cela devient un ticket public que vous pouvez suivre. Rien d'autre ne change : c'était déjà un ticket public.|**ご意見の送り先が、こちらを経由せず GitHub へ直接になりました。**「送る」を押すと内容が入った GitHub の画面が開き、そこで送信ボタンを押すと届きます。**公開のチケットになる点は前と同じ**で、あとから経過を見に行けます。",
      ),
    ],
  },
  {
    version: "0.56.0",
    date: "2026-08-21",
    title: t(
      "Argentina, Chile, Colombia and Cuba|Argentina, Chile, Colombia y Cuba|L'Argentine, le Chili, la Colombie et Cuba|アルゼンチン・チリ・コロンビア・キューバ",
    ),
    highlights: [
      t(
        "Argentina, where the railways were never built to join the country together. Every line was laid by a rival foreign company to carry the wealth of the pampas to the port of Buenos Aires, and the fan shape they left is still the shape of the country. Retiro station is really three separate stations, built side by side between 1915 and 1930 by companies that competed with each other; two are broad gauge and one is metre gauge, and they have never shared a platform. Nationalising the lot in 1948 made them one company but did not make the gauges match. At Ingeniero Jacobacci freight had to be lifted from one train to another, wagon by wagon.|La Argentina, donde los ferrocarriles nunca se tendieron para unir el país. Cada línea la puso una compañía extranjera rival para llevar la riqueza de la pampa al puerto de Buenos Aires, y el abanico que dejaron sigue siendo la forma del país. La estación de Retiro son en realidad tres estaciones distintas, levantadas una junto a otra entre 1915 y 1930 por empresas que competían entre sí; dos son de trocha ancha y una de trocha métrica, y jamás han compartido andén. Nacionalizarlo todo en 1948 las volvió una sola empresa, pero no igualó las trochas. En Ingeniero Jacobacci la carga había que pasarla de un tren a otro, vagón por vagón.|L'Argentine, où le rail ne fut jamais posé pour relier le pays. Chaque ligne fut construite par une compagnie étrangère rivale pour acheminer la richesse de la pampa vers le port de Buenos Aires, et l'éventail qu'elles ont laissé est encore la forme du pays. La gare de Retiro, ce sont en réalité trois gares distinctes, bâties côte à côte entre 1915 et 1930 par des compagnies concurrentes ; deux à voie large, une à voie métrique, et elles n'ont jamais partagé un quai. Tout nationaliser en 1948 en fit une seule compagnie, mais n'aligna pas les écartements. À Ingeniero Jacobacci, il fallait transborder le fret d'un train à l'autre, wagon par wagon.|**鉄道は、国を一つに結ぶために敷かれたのではありませんでした。**どの線も、パンパの富をブエノスアイレス港へ送り出すために、**競い合う外国の会社がそれぞれ別々に**敷いたものです。その扇の形が、いまも国の形です。レティロ駅は**実は隣り合う3つの別々の駅**で、1915年から1930年にかけて互いに競合する会社がそれぞれ建てました。**2つは広軌、1つは1000mm軌で、ホームを共有したことは一度もありません。**1948年に全部を国有化しても、**会社が1つになっただけで軌間は揃いませんでした。**インヘニエロ・ハコバッシでは、貨物を一両ずつ積み替える必要がありました。",
      ),
      t(
        "Chile, a country 4,300 kilometres long and never more than about 350 wide — the thinnest board in the game. The railways stop twice, for two different reasons. In the north a Bolivian tax on a Chilean nitrate railway company, ten centavos a quintal, ended in Chilean troops landing at Antofagasta on the very day the company's assets were to be auctioned; the war that followed redrew three countries' coastlines. Then artificial nitrogen made the whole industry pointless and the desert kept the empty towns. In the south the line simply ends at Puerto Montt, because beyond it there are only fjords. Puerto Edén, two hundred people, can still only be reached by boat.|Chile, un país de 4.300 kilómetros de largo y nunca más de unos 350 de ancho: el tablero más estrecho del juego. El ferrocarril se detiene dos veces, por dos razones distintas. En el norte, un impuesto boliviano de diez centavos por quintal a una compañía chilena de salitre acabó con tropas chilenas desembarcando en Antofagasta el día mismo en que iban a rematarse los bienes de la empresa; la guerra que siguió redibujó las costas de tres países. Luego el nitrógeno artificial dejó sin sentido a toda la industria y el desierto se quedó con los pueblos vacíos. En el sur la vía simplemente termina en Puerto Montt, porque más allá solo hay fiordos. A Puerto Edén, doscientas personas, aún solo se llega en barco.|Le Chili, long de 4 300 kilomètres et jamais large de plus de 350 environ : le plateau le plus étroit du jeu. Le rail s'arrête deux fois, pour deux raisons différentes. Au nord, un impôt bolivien de dix centavos le quintal sur une compagnie chilienne de salpêtre s'acheva par le débarquement de troupes chiliennes à Antofagasta le jour même où les biens de la compagnie devaient être vendus aux enchères ; la guerre qui suivit redessina les côtes de trois pays. Puis l'azote artificiel rendit toute l'industrie inutile et le désert garda les villes vides. Au sud, la voie s'arrête tout simplement à Puerto Montt, car au-delà il n'y a que des fjords. Puerto Edén, deux cents habitants, ne s'atteint toujours qu'en bateau.|**南北4300km、東西はいちばん広いところでも350kmほど。**ゲームでいちばん細長い盤面です。**鉄道は2回、別々の理由で止まります。**北では、ボリビアがチリの硝石鉄道会社に課した**1キンタルあたり10センターボ**の税が、**その会社の資産が競売にかけられる当日にチリ軍がアントファガスタへ上陸する**という結末を迎えました。続いた戦争は3か国の海岸線を書き換えます。やがて**人工の窒素が、その産業を丸ごと不要にしました。**砂漠には無人の町が残っています。南では、線路はプエルト・モントで**ただ終わります。**その先はフィヨルドしかないからです。人口200人ほどのプエルト・エデンには、いまも船でしか行けません。",
      ),
      t(
        "Colombia, where the river was the road first. Three ranges of the Andes run side by side, so the railways never became one trunk line — they stayed short branches carrying cargo to the Magdalena, around the rapids at Honda, around the sandbar at the river mouth. Puerto Colombia's pier, opened in 1893, was once the longest in the world; it fell silent when engineers cut a channel through the bar in the 1930s. And when SCADTA began flying in 1920 there were not enough runways, so the aeroplanes were seaplanes and they landed on the Magdalena. The river was the road, and then it was the runway.|Colombia, donde el río fue primero el camino. Tres cordilleras de los Andes corren en paralelo, así que los ferrocarriles nunca formaron un tronco: siguieron siendo ramales cortos que llevaban carga al Magdalena, rodeando los rápidos de Honda, rodeando la barra de la desembocadura. El muelle de Puerto Colombia, inaugurado en 1893, fue en su día el más largo del mundo; enmudeció cuando los ingenieros abrieron un canal en la barra en los años treinta. Y cuando SCADTA empezó a volar en 1920 no había pistas suficientes, así que los aviones eran hidroaviones y amaraban en el Magdalena. El río fue el camino, y después fue la pista.|La Colombie, où le fleuve fut d'abord la route. Trois cordillères des Andes courent côte à côte : le rail n'a donc jamais formé de ligne maîtresse, restant de courtes antennes qui portaient le fret vers le Magdalena, contournant les rapides de Honda, contournant la barre de l'embouchure. Le quai de Puerto Colombia, ouvert en 1893, fut un temps le plus long du monde ; il s'est tu quand les ingénieurs ont percé un chenal dans la barre, dans les années 1930. Et quand la SCADTA commença à voler en 1920, les pistes manquaient : les avions étaient des hydravions et se posaient sur le Magdalena. Le fleuve était la route, puis il devint la piste.|**川がまず道でした。**アンデスが3本の山脈に分かれて並んで走るため、鉄道は幹線になれず、**マグダレナ川へ荷を運ぶ短い枝**のままでした。オンダの急流を迂回し、河口の砂州を迂回するための枝です。1893年に開いたプエルト・コロンビアの桟橋は**一時は世界最長**でしたが、1930年代に技術者が砂州に水路を切り開くと、静まりました。そして1920年にSCADTAが飛び始めたとき、**滑走路が足りませんでした。**だから飛行機は水上機で、**マグダレナ川に着水しました。****川は道であり、そのまま滑走路になりました。**",
      ),
      t(
        "Cuba had a railway eleven years before Spain did. The line from Havana to Bejucal opened on 19 November 1837 — Barcelona to Mataró did not open until 1848. It was not the crown that paid for it but the sugar and tobacco merchants of Havana, and in 1832 the planters themselves had petitioned for a road from Güines to the port. It was laid for sugar, not for people. A report from 1837 complains that the works could not hire enough hands: at harvest the cane fields paid better than the railway. The only line the colonial government built itself was military, and it was laid, like the sugar lines, by enslaved people and indentured labourers.|Cuba tuvo ferrocarril once años antes que España. La línea de La Habana a Bejucal se inauguró el 19 de noviembre de 1837; Barcelona-Mataró no abrió hasta 1848. No lo pagó la corona, sino los comerciantes de azúcar y tabaco de La Habana, y en 1832 los propios hacendados habían pedido un camino de Güines al puerto. Se tendió para el azúcar, no para la gente. Un informe de 1837 se queja de que las obras no lograban contratar brazos suficientes: en la zafra, los cañaverales pagaban mejor que el ferrocarril. La única línea que construyó el propio gobierno colonial fue militar, y se tendió, como las del azúcar, con personas esclavizadas y trabajadores por contrato.|Cuba eut le chemin de fer onze ans avant l'Espagne. La ligne de La Havane à Bejucal fut inaugurée le 19 novembre 1837 ; Barcelone-Mataró n'ouvrit qu'en 1848. Ce ne fut pas la couronne qui la paya, mais les négociants en sucre et en tabac de La Havane, et dès 1832 les planteurs eux-mêmes avaient réclamé une route de Güines au port. Elle fut posée pour le sucre, non pour les gens. Un rapport de 1837 se plaint que le chantier ne trouvait pas assez de bras : à la récolte, les cannaies payaient mieux que le rail. La seule ligne que le gouvernement colonial construisit lui-même fut militaire, et elle fut posée, comme celles du sucre, par des personnes réduites en esclavage et des travailleurs sous contrat.|**キューバは、本国スペインより11年早く鉄道を持ちました。**ハバナからベフカルまでの線が開業したのは**1837年11月19日**で、バルセロナ―マタロが開くのは1848年です。**費用を出したのは王室ではなく、ハバナの砂糖・タバコ商人**でした。1832年には**農園主たち自身が、グイネスから港への道を請願**しています。**人ではなく、砂糖のために敷かれた鉄道でした。**1837年の報告書は、工事が人手を集められないと嘆いています——**収穫期には、キビ畑のほうが鉄道より日当が良かった**からです。植民地政府が自ら建設した唯一の路線は軍用のもので、それも砂糖の線と同じく、**奴隷とされた人々と年季契約の労働者の手で**敷かれました。",
      ),
      t(
        "Forty-seven boards now, with 2,218 towns and 3,849 questions.|Ya son cuarenta y siete tableros, con 2.218 pueblos y 3.849 preguntas.|Quarante-sept plateaux désormais, avec 2 218 villes et 3 849 questions.|盤面は47枚になりました。町は2218、問いは3849です。",
      ),
    ],
  },
  {
    version: "0.55.0",
    date: "2026-08-21",
    title: t("Oceania|Oceanía|L'Océanie|オセアニア"),
    highlights: [
      t(
        "Oceania. Fifty-one of the fifty-four routes are sea crossings; only three run on land. The railway barely reached this continent, and where it did, each line was laid for a single cargo. Lautoka's 610mm network — some 600 kilometres of it — has never carried a passenger. Yaren's phosphate line stopped once four fifths of the island's surface had been dug away. At Lae no road or railway ever crossed the mountains to the goldfields, so from 1927 the dredges were taken apart and flown in; for a few years in the early 1930s that grass strip is said to have handled more freight by weight than any airport on Earth.|Oceanía. Cincuenta y una de las cincuenta y cuatro rutas son travesías marítimas; solo tres van por tierra. El ferrocarril apenas llegó a este continente, y donde llegó fue siempre para una sola carga. La red de 610 mm de Lautoka —unos 600 kilómetros— nunca ha llevado a un pasajero. La línea de fosfato de Yaren se detuvo cuando ya se habían excavado cuatro quintas partes de la superficie de la isla. En Lae ninguna carretera ni vía cruzó jamás las montañas hacia los yacimientos de oro, así que desde 1927 las dragas se desmontaban y se llevaban en avión; durante unos años, a principios de los treinta, se dice que aquella pista de hierba movió más carga en peso que cualquier aeropuerto del mundo.|L'Océanie. Cinquante et une des cinquante-quatre liaisons sont maritimes ; trois seulement passent par la terre. Le rail n'a presque pas atteint ce continent, et là où il l'a fait, chaque ligne fut posée pour une seule marchandise. Le réseau à voie de 610 mm de Lautoka — quelque 600 kilomètres — n'a jamais transporté un passager. La ligne de phosphate de Yaren s'est arrêtée une fois creusés les quatre cinquièmes de la surface de l'île. À Lae, aucune route ni voie ferrée n'a jamais franchi les montagnes vers les gisements d'or : dès 1927, on démontait les dragues pour les acheminer par avion ; pendant quelques années, au début des années 1930, cette piste en herbe aurait traité plus de fret en poids que n'importe quel aéroport du monde.|**54本の路線のうち51本が航路で、陸を走る線は3本しかありません。**この大陸に鉄道はほとんど来ませんでした。**来た場合は決まって、一つの資源のためだけに敷かれています。**ラウトカの軌間610mm・総延長およそ600キロのサトウキビ鉄道は、**客を一人も乗せません。**ヤレンの燐鉱石の線は、島の表面の**5分の4を掘り尽くしたところで止まりました。**ラエでは、海岸と内陸の金鉱を隔てる山に道路も鉄道も一度も通ったことがなく、**1927年から浚渫機を分解して飛行機で運びました。**1930年代初めの数年、その草地の滑走路は世界のどの空港より重い貨物を扱ったと伝えられます。",
      ),
      t(
        "The rising sea is not drawn as something in the future. Funafuti's highest point is 4.6 metres above the water and Majuro averages two; both already flood at every spring tide. The board draws the water at the foot of houses on stilts. Bikini and Mururoa appear not as explosions but as wire fences, warning signs and a concrete dome over the waste — because the subject is that eighty years on, nobody can go back. The spirit of this board is called The Ship That Has Not Come, and it is never shown: only an empty horizon through a window.|La subida del mar no se dibuja como algo del futuro. El punto más alto de Funafuti está a 4,6 metros sobre el agua y Majuro promedia dos; ambos ya se inundan en cada marea viva. El tablero dibuja el agua al pie de las casas sobre pilotes. Bikini y Mururoa no aparecen como explosiones, sino como alambradas, señales de advertencia y una cúpula de hormigón sobre los residuos, porque el asunto es que ochenta años después nadie puede volver. El espíritu de este tablero se llama El barco que no llega, y nunca se le ve: solo un horizonte vacío tras una ventana.|La montée des eaux n'est pas dessinée comme un avenir. Le point culminant de Funafuti est à 4,6 mètres au-dessus de l'eau et Majuro est à deux en moyenne ; l'un et l'autre sont déjà inondés à chaque grande marée. Le plateau dessine l'eau au pied des maisons sur pilotis. Bikini et Mururoa n'apparaissent pas en explosions mais en grillages, en panneaux d'avertissement et en une coupole de béton posée sur les déchets — car le sujet, c'est qu'au bout de quatre-vingts ans on ne peut toujours pas revenir. L'esprit de ce plateau s'appelle Le navire qui ne vient pas, et on ne le voit jamais : seulement un horizon vide par une fenêtre.|**海面上昇を、将来の話として描いていません。**フナフティの最高点は海抜4.6メートル、マジュロの平均標高は2メートルで、**どちらもすでに大潮のたびに冠水しています。**盤面は、高床の家の足元まで来た水を描きます。ビキニ環礁とムルロアは、爆発ではなく**金網と警告標、そして核廃棄物を覆うコンクリートのドーム**として出てきます。**八十年たっても帰れないこと**のほうが題材だからです。この盤面の神の名は**「まだ来ない船」**で、姿は一度も描かれません。窓の外に、何も無い水平線があるだけです。",
      ),
      t(
        "That completes the six continent-wide boards: Asia, Europe, Africa, North America, South America and Oceania. Forty-three boards now, with 2,036 towns and 3,460 questions.|Con esto se completan los seis tableros continentales: Asia, Europa, África, América del Norte, América del Sur y Oceanía. Ya son cuarenta y tres tableros, con 2.036 pueblos y 3.460 preguntas.|Les six plateaux continentaux sont désormais au complet : Asie, Europe, Afrique, Amérique du Nord, Amérique du Sud et Océanie. Quarante-trois plateaux désormais, avec 2 036 villes et 3 460 questions.|これで**大陸ぜんぶを走る盤面が6枚そろいました**(アジア・ヨーロッパ・アフリカ・北アメリカ・南アメリカ・オセアニア)。盤面は43枚、町は2036、問いは3460です。",
      ),
    ],
  },
  {
    version: "0.54.0",
    date: "2026-08-20",
    title: t(
      "Hokkaidō and Kyūshū|Hokkaidō y Kyūshū|Hokkaidō et Kyūshū|北海道と九州",
    ),
    highlights: [
      t(
        "Hokkaidō, where the railways were laid for coal and are now being closed by depopulation. The Yūbari branch went in 2019; the whole Rumoi line in 2023. Seven of the forty towns sit on lines that no longer exist, and the board draws them with buffer stops rather than ruins — people still live there. Shiraoi carries a law that stood from 1899 until 1997. Matsumae and Esashi are older than the settlement of the island: they were trading ports before the surveyors arrived.|Hokkaidō, donde los ferrocarriles se tendieron para el carbón y ahora los cierra la despoblación. El ramal de Yūbari cerró en 2019; toda la línea de Rumoi en 2023. Siete de los cuarenta pueblos están en líneas que ya no existen, y el tablero los dibuja con topes de vía en lugar de ruinas: allí sigue viviendo gente. Shiraoi lleva una ley que estuvo vigente de 1899 a 1997. Matsumae y Esashi son más antiguos que la colonización de la isla: eran puertos comerciales antes de que llegaran los agrimensores.|Hokkaidō, où les voies furent posées pour le charbon et sont aujourd\'hui fermées par le dépeuplement. L\'antenne de Yūbari a disparu en 2019 ; toute la ligne de Rumoi en 2023. Sept des quarante villes se trouvent sur des lignes qui n\'existent plus, et le plateau les dessine avec des heurtoirs plutôt que des ruines : des gens y vivent encore. Shiraoi porte une loi restée en vigueur de 1899 à 1997. Matsumae et Esashi sont plus anciens que la colonisation de l\'île : c\'étaient des ports de commerce avant l\'arrivée des arpenteurs.|**鉄道は石炭のために敷かれ、いま人口で閉じられています。**夕張支線は2019年、留萌本線は2023年に全線が消えました。40の町のうち**7つは、もう無い線の上にあります。**盤面はそれを廃墟ではなく**車止め**で描いています——**人はいまも住んでいるからです。**白老には、1899年から**1997年まで**あった法律の話があります。松前と江差は開拓より古い町で、測量が来る前から交易の港でした。",
      ),
      t(
        "Kyūshū, the only window Japan kept open for two hundred years. Hirado had a trading post decades before Dejima, and in 1641 the shogunate made the Dutch tear down a new warehouse because the Christian date was carved on it — then moved them to Nagasaki. At Urakami the cathedral of 1925 was directly under the second atomic bomb; the city demolished what was left in 1958 and rebuilt on the same spot, and the argument about that has not ended. Forty towns, and next to the crater at Sakurajima the board draws not a disaster but a routine: yellow ash bags at the collection point, children in helmets.|Kyūshū, la única ventana que Japón mantuvo abierta durante doscientos años. Hirado tuvo factoría décadas antes que Dejima, y en 1641 el shogunato obligó a los neerlandeses a derribar un almacén nuevo porque llevaba grabada la fecha cristiana; luego los trasladó a Nagasaki. En Urakami, la catedral de 1925 quedó justo bajo la segunda bomba atómica; la ciudad demolió lo que quedaba en 1958 y reconstruyó en el mismo lugar, y la discusión sobre aquello no ha terminado. Cuarenta pueblos, y junto al cráter de Sakurajima el tablero no dibuja una catástrofe sino una rutina: bolsas amarillas de ceniza en el punto de recogida, niños con casco.|Kyūshū, la seule fenêtre que le Japon garda ouverte pendant deux cents ans. Hirado eut un comptoir des décennies avant Dejima, et en 1641 le shogunat fit démolir aux Néerlandais un entrepôt neuf parce que la date chrétienne y était gravée — puis les transféra à Nagasaki. À Urakami, la cathédrale de 1925 se trouvait juste sous la seconde bombe atomique ; la ville rasa ce qu\'il en restait en 1958 et rebâtit au même endroit, et le débat là-dessus n\'est pas clos. Quarante villes, et près du cratère de Sakurajima le plateau ne dessine pas une catastrophe mais une routine : sacs jaunes de cendre au point de collecte, enfants casqués.|**鎖国の二百年、日本で外へ開いていた窓は、ここだけでした。**平戸には出島より数十年早く商館があり、**1641年、幕府は新築のオランダ倉庫を取り壊させます——キリスト教暦が刻まれていたからです。**そして商館は長崎へ移されました。浦上では1925年の天主堂が二発目の原爆のほぼ真下にあり、**市は1958年に残りを取り壊して同じ場所に建て直しました。その是非をめぐる議論は、いまも終わっていません。**40の町。桜島の火口の隣に、盤面が描いたのは災害ではなく**日常**です——収集所の黄色い克灰袋と、ヘルメットをかぶった子どもたち。",
      ),
      t(
        "Forty-two boards now, with 1,985 towns and 3,359 questions.|Ya son cuarenta y dos tableros, con 1.985 pueblos y 3.359 preguntas.|Quarante-deux plateaux désormais, avec 1 985 villes et 3 359 questions.|盤面は42枚になりました。町は1985、問いは3359です。",
      ),
    ],
  },
  {
    version: "0.53.0",
    date: "2026-08-20",
    title: t(
      "South Africa and Norway complete the six|Sudáfrica y Noruega completan los seis|L\'Afrique du Sud et la Norvège complètent les six|南アフリカとノルウェー。6枚がそろいました",
    ),
    highlights: [
      t(
        "South Africa, where the railway carried people every day between the place the law let them live and the place it let them work. Soweto is an administrative abbreviation — South Western Townships — and its commuter line was laid to move workers who were not allowed to live in the city. At Carletonville the gold is four kilometres down and the rock is sixty degrees. Kimberley invented the closed compound in the 1880s, and the gold mines copied it. Forty-one towns across all nine provinces, and the rest of the board is wine, whales, rock art and the flowers of Namaqualand.|Sudáfrica, donde el ferrocarril llevaba gente cada día entre el lugar donde la ley les permitía vivir y aquel donde les permitía trabajar. Soweto es una abreviatura administrativa —South Western Townships— y su línea de cercanías se tendió para mover a trabajadores a quienes no se permitía vivir en la ciudad. En Carletonville el oro está a cuatro kilómetros de profundidad y la roca a sesenta grados. Kimberley inventó el recinto cerrado en los años 1880, y las minas de oro lo copiaron. Cuarenta y un pueblos en las nueve provincias, y el resto del tablero es vino, ballenas, arte rupestre y las flores de Namaqualand.|L\'Afrique du Sud, où le chemin de fer transportait chaque jour les gens entre le lieu où la loi les autorisait à vivre et celui où elle les autorisait à travailler. Soweto est une abréviation administrative — South Western Townships — et sa ligne de banlieue fut posée pour déplacer des travailleurs qui n\'avaient pas le droit d\'habiter en ville. À Carletonville, l\'or est à quatre kilomètres de fond et la roche à soixante degrés. Kimberley inventa l\'enceinte fermée dans les années 1880, et les mines d\'or l\'ont copiée. Quarante et une villes dans les neuf provinces, et le reste du plateau, c\'est le vin, les baleines, l\'art rupestre et les fleurs du Namaqualand.|**法律が「住んでよい場所」と「働いてよい場所」を引き離し、そのあいだを鉄道が毎日運んでいた国。**ソウェトという地名は行政の略称です——South Western Townships。**その通勤線は、市内に住むことを許されなかった労働者を運ぶために敷かれました。**カールトンビルの金は地下4km、岩盤は60度あります。キンバリーが1880年代に始めた**閉鎖コンパウンド**を、のちの金鉱が真似しました。9州すべてから41の町。**残りはワインと鯨と岩絵と、ナマクワランドの花です。**",
      ),
      t(
        "Norway, where the railway thins as it goes north and stops at Bodø. Beyond it there is no line at all — Tromsø, Alta, Kirkenes have never had one, and on this board the north is joined by sea. Narvik has a railway, but it runs east into Sweden and was never connected to Norway\'s own network. Stavanger sent fifty-two emigrants on a sloop in 1825 and eight hundred thousand more over the next century, out of a country of barely two million, and then oil was found in 1969. Forty-eight towns.|Noruega, donde el ferrocarril se adelgaza hacia el norte y termina en Bodø. Más allá no hay línea alguna —Tromsø, Alta y Kirkenes nunca la tuvieron— y en este tablero el norte se une por mar. Narvik sí tiene ferrocarril, pero va al este hacia Suecia y nunca se conectó con la red noruega. Stavanger envió cincuenta y dos emigrantes en un balandro en 1825 y ochocientos mil más en el siglo siguiente, desde un país de apenas dos millones; luego, en 1969, se encontró petróleo. Cuarenta y ocho pueblos.|La Norvège, où le rail s\'amincit vers le nord et s\'arrête à Bodø. Au-delà, il n\'y a plus aucune ligne — Tromsø, Alta, Kirkenes n\'en ont jamais eu — et sur ce plateau le nord se relie par la mer. Narvik possède un chemin de fer, mais il file à l\'est vers la Suède et ne fut jamais raccordé au réseau norvégien. Stavanger fit partir cinquante-deux émigrants sur un sloop en 1825, puis huit cent mille au cours du siècle suivant, depuis un pays d\'à peine deux millions d\'habitants ; et en 1969 on trouva du pétrole. Quarante-huit villes.|**鉄道は北へ行くほど痩せ細り、ボードーで途切れます。**その先には一本もありません——トロムソもアルタもキルケネスも、鉄道を持ったことがありません。**この盤面では、北は海路でつながっています。**ナルヴィクには鉄道がありますが、**東のスウェーデンへ行く線で、ノルウェー自身の鉄道網とはついに結ばれませんでした。**スタヴァンゲルは1825年に52人を帆船で送り出し、その後の一世紀で**80万人**が国を出ました——人口が200万人あまりの国から。そして1969年に石油が見つかります。48の町。",
      ),
      t(
        "Forty boards now, with 1,905 towns and 3,157 questions. This finishes the second wave: Egypt, Peru, Vietnam, Switzerland, South Africa, Norway.|Ya son cuarenta tableros, con 1.905 pueblos y 3.157 preguntas. Con esto se cierra la segunda tanda: Egipto, Perú, Vietnam, Suiza, Sudáfrica y Noruega.|Quarante plateaux désormais, avec 1 905 villes et 3 157 questions. Cela achève la deuxième vague : Égypte, Pérou, Vietnam, Suisse, Afrique du Sud, Norvège.|盤面は40枚になりました。町は1905、問いは3157です。**第2弾の6枚がこれでそろいました**——エジプト・ペルー・ベトナム・スイス・南アフリカ・ノルウェー。",
      ),
    ],
  },
  {
    version: "0.52.0",
    date: "2026-08-20",
    title: t(
      "Vietnam and Switzerland|Vietnam y Suiza|Le Vietnam et la Suisse|ベトナムとスイス",
    ),
    highlights: [
      t(
        "Vietnam, where the line was finished before the country was. The Reunification Express ran the length of the coast from 1936; the partition cut it in 1954; it was joined again twenty months after the war ended. Forty-three towns. At Hanoi the truss bridge of 1902 was bombed again and again and never replaced — only patched, and the board draws the patched spans in a different colour. At the old dividing line the picture shows no weapons, only a bicycle crossing.|Vietnam, donde la vía se terminó antes que el país. El Expreso de la Reunificación recorría toda la costa desde 1936; la partición lo cortó en 1954; volvió a unirse veinte meses después de acabar la guerra. Cuarenta y tres pueblos. En Hanói el puente de celosía de 1902 fue bombardeado una y otra vez y nunca se sustituyó, solo se remendó, y el tablero dibuja los tramos remendados de otro color. En la antigua línea divisoria no se ve ningún arma, solo una bicicleta que cruza.|Le Vietnam, où la voie fut achevée avant le pays. L\'Express de la Réunification parcourait toute la côte dès 1936 ; la partition le coupa en 1954 ; il fut rejoint vingt mois après la fin de la guerre. Quarante-trois villes. À Hanoï, le pont en treillis de 1902 fut bombardé encore et encore et jamais remplacé — seulement rapiécé, et le plateau dessine les travées rapiécées d\'une autre couleur. À l\'ancienne ligne de partage, l\'image ne montre aucune arme, seulement un vélo qui traverse.|**線路のほうが、国より先に一本につながった国。**統一鉄道は1936年から海岸沿いを縦断し、1954年の分断で切られ、**戦争が終わって二十か月後に再びつながりました。**43の町。ハノイの1902年のトラス橋は繰り返し爆撃されましたが、**架け替えられることはなく、繕われ続けました**——盤面では、継ぎ足した桁だけ色が違います。かつての分断線の絵に武器は描かれていません。**いま自転車が渡っているだけです。**",
      ),
      t(
        "Switzerland, where neutrality meant turning the country into a fortress. For most of the twentieth century the Gotthard tunnels and bridges were kept wired with demolition charges. In July 1940 General Guisan gathered every officer at the Rütli — the meadow of the founding legend — and told them the army would fall back into the Alps and blow every road behind it. At Chiasso the border sent refugees back for being Jewish while staying open to gold traded with Germany. Forty-four towns, four languages, and a constitution that never once calls Bern the capital.|Suiza, donde la neutralidad significó convertir el país en una fortaleza. Durante casi todo el siglo XX los túneles y puentes del San Gotardo se mantuvieron cargados con explosivos. En julio de 1940 el general Guisan reunió a todos sus oficiales en el Rütli —el prado de la leyenda fundacional— y les dijo que el ejército se replegaría a los Alpes volando cada carretera a su espalda. En Chiasso la frontera devolvía a los refugiados por ser judíos mientras seguía abierta al oro comerciado con Alemania. Cuarenta y cuatro pueblos, cuatro lenguas y una constitución que jamás llama capital a Berna.|La Suisse, où la neutralité a signifié transformer le pays en forteresse. Pendant presque tout le XXe siècle, les tunnels et ponts du Gothard restèrent garnis de charges de démolition. En juillet 1940, le général Guisan réunit tous ses officiers au Rütli — la prairie de la légende fondatrice — et leur annonça que l\'armée se replierait dans les Alpes en faisant sauter chaque route derrière elle. À Chiasso, la frontière renvoyait les réfugiés parce qu\'ils étaient juifs tout en restant ouverte à l\'or échangé avec l\'Allemagne. Quarante-quatre villes, quatre langues, et une constitution qui n\'appelle jamais Berne la capitale.|**中立とは、国土そのものを要塞に変えることでした。**20世紀の大半、ゴッタルドのトンネルと橋には**爆破装薬が仕掛けられたまま**でした。1940年7月、ギザン将軍は全将校を**建国伝説の地リュトリ**に集め、アルプスへ後退して背後の道を全部爆破すると告げます。キアッソの国境は、**ユダヤ人であることを理由に難民を送り返しながら、対独の金塊取引には開かれ続けていました。**44の町、4つの言語、そして**一度もベルンを首都と呼んでいない憲法。**",
      ),
      t(
        "Thirty-eight boards now, with 1,816 towns and 2,956 questions.|Ya son treinta y ocho tableros, con 1.816 pueblos y 2.956 preguntas.|Trente-huit plateaux désormais, avec 1 816 villes et 2 956 questions.|盤面は38枚になりました。町は1816、問いは2956です。",
      ),
    ],
  },
  {
    version: "0.51.0",
    date: "2026-08-20",
    title: t(
      "Peru, where the railway climbed higher than the body can|Perú, donde el ferrocarril subió más de lo que aguanta el cuerpo|Le Pérou, où le rail est monté plus haut que le corps ne le supporte|ペルー。鉄道は、人の体より先に山を登ってしまった",
    ),
    highlights: [
      t(
        "The Central Railway crosses the Andes at over 4,700 metres. It was not built to carry people — it was built to bring ore down from Cerro de Pasco and La Oroya to the port, and the tourist trains that use it today still carry oxygen for passengers who faint. Forty-six towns, from a coast that almost never rains to an Amazon city no road has ever reached.|El Ferrocarril Central cruza los Andes a más de 4.700 metros. No se construyó para llevar personas: se hizo para bajar el mineral de Cerro de Pasco y La Oroya hasta el puerto, y los trenes turísticos que hoy lo recorren siguen llevando oxígeno para los pasajeros que se desmayan. Cuarenta y seis pueblos, desde una costa donde casi nunca llueve hasta una ciudad amazónica a la que jamás ha llegado una carretera.|Le chemin de fer central franchit les Andes à plus de 4 700 mètres. Il ne fut pas bâti pour transporter des gens : il servait à descendre le minerai de Cerro de Pasco et de La Oroya jusqu\'au port, et les trains touristiques qui l\'empruntent aujourd\'hui emportent encore de l\'oxygène pour les voyageurs qui défaillent. Quarante-six villes, d\'une côte où il ne pleut presque jamais à une cité amazonienne qu\'aucune route n\'a jamais atteinte.|**中央鉄道は標高4,700mを超えてアンデスを越えます。**人を運ぶために敷かれたのではありません。セロ・デ・パスコとラ・オロヤの鉱石を港へ下ろすために敷かれ、いまそこを走る観光列車は、**気を失う乗客のために酸素を積んでいます。**46の町。ほとんど雨の降らない海岸から、**いまも道が一本も通じていないアマゾンの都市**まで。",
      ),
      t(
        "Cerro de Pasco began by digging up its own cemetery. Puno has an iron ship carried over the Andes in more than two thousand pieces on the backs of mules, and fired at first with llama dung. Iquitos has rubber-boom mansions and, a river away, a 1912 British consular report that called what was happening there slavery. Ayacucho\'s card says plainly that a war which killed tens of thousands was fought mostly there.|Cerro de Pasco empezó excavando su propio cementerio. Puno tiene un barco de hierro llevado por los Andes en más de dos mil piezas a lomo de mula, alimentado al principio con bosta de llama. Iquitos tiene mansiones del caucho y, a un río de distancia, un informe consular británico de 1912 que llamó esclavitud a lo que allí ocurría. La ficha de Ayacucho dice sin rodeos que una guerra que mató a decenas de miles se libró sobre todo allí.|Cerro de Pasco a commencé par déterrer son propre cimetière. Puno possède un navire de fer transporté à travers les Andes en plus de deux mille pièces à dos de mulet, chauffé d\'abord à la bouse de lama. Iquitos a ses demeures du caoutchouc et, à une rivière de là, un rapport consulaire britannique de 1912 qui qualifiait d\'esclavage ce qui s\'y passait. La fiche d\'Ayacucho dit clairement qu\'une guerre ayant tué des dizaines de milliers de personnes s\'y est déroulée pour l\'essentiel.|**セロ・デ・パスコは、自分の町の墓地を掘り返すところから始まりました。**プーノには、**2700個以上に分解してラバの背でアンデスを越えさせた鉄の船**があります(燃料は当初リャマの糞でした)。イキトスにはゴムブームの邸宅があり、川を一本隔てた先では、1912年の英国領事の報告が、そこで起きていたことを**奴隷制だと断じています。**アヤクーチョの札には、**数万人が死んだ戦争が主にここで戦われた**と、そのまま書いてあります。",
      ),
      t(
        "Thirty-six boards now, with 1,729 towns and 2,751 questions.|Ya son treinta y seis tableros, con 1.729 pueblos y 2.751 preguntas.|Trente-six plateaux désormais, avec 1 729 villes et 2 751 questions.|盤面は36枚になりました。町は1729、問いは2751です。",
      ),
    ],
  },
  {
    version: "0.50.1",
    date: "2026-08-20",
    title: t(
      "Two dates on the Egypt board were wrong|Dos fechas del tablero de Egipto estaban mal|Deux dates du plateau égyptien étaient fausses|エジプト盤の日付を2つ直しました",
    ),
    highlights: [
      t(
        "A question said the Ras El Hekma investment agreement was announced in March 2024; it was signed on 23 February. Another said Ethiopia laid the foundation stone of its dam days after Mubarak resigned; it was closer to seven weeks — 11 February to 2 April 2011. Both answers were right and only the dates around them were wrong, which is the shape almost every error we have found takes.|Una pregunta decía que el acuerdo de inversión de Ras El Hekma se anunció en marzo de 2024; se firmó el 23 de febrero. Otra decía que Etiopía puso la primera piedra de su presa días después de la renuncia de Mubarak; fueron casi siete semanas — del 11 de febrero al 2 de abril de 2011. Las respuestas eran correctas y solo fallaban las fechas a su alrededor, que es la forma que toma casi todo error que encontramos.|Une question affirmait que l\'accord d\'investissement de Ras El Hekma avait été annoncé en mars 2024 ; il fut signé le 23 février. Une autre disait que l\'Éthiopie avait posé la première pierre de son barrage quelques jours après la démission de Moubarak ; il s\'écoula près de sept semaines — du 11 février au 2 avril 2011. Les réponses étaient justes, seules les dates autour étaient fausses : c\'est la forme que prend presque chaque erreur que nous trouvons.|ラス・エル=ヘクマ投資契約を「2024年3月」としていましたが、署名は**2月23日**でした。エチオピアがダムの礎石を据えたのを「ムバーラク辞任の数日後」としていましたが、**2月11日から4月2日で7週間近く**あります。**どちらも答えは正しく、その周りの日付だけが違っていました。**見つかる誤りは、ほとんどがこの形をしています。",
      ),
    ],
  },
  {
    version: "0.50.0",
    date: "2026-08-20",
    title: t(
      "Egypt, where the map is the population|Egipto, donde el mapa es la población|L'Égypte, où la carte est la population|エジプト。地図がそのまま人口の分布",
    ),
    highlights: [
      t(
        "Almost all of Egypt is empty desert, and almost everyone lives along one river and its delta. You can see it on the board: forty-one towns strung along a thin green ribbon, with nothing on either side. There are no pyramids and no pharaohs anywhere on this board — not in a town, not in a question, not in a picture. Egypt is a place where people live now.|Casi todo Egipto es desierto vacío, y casi todo el mundo vive junto a un río y su delta. Se ve en el tablero: cuarenta y una ciudades ensartadas en una cinta verde estrecha, y nada a los lados. En este tablero no hay pirámides ni faraones — ni en un pueblo, ni en una pregunta, ni en un dibujo. Egipto es un lugar donde la gente vive ahora.|Presque toute l\'Égypte est un désert vide, et presque tout le monde vit le long d\'un fleuve et de son delta. Cela se voit sur le plateau : quarante et une villes enfilées sur un mince ruban vert, et rien de part et d\'autre. Il n\'y a sur ce plateau ni pyramides ni pharaons — ni dans une ville, ni dans une question, ni dans une image. L\'Égypte est un endroit où des gens vivent aujourd\'hui.|**エジプトのほとんどは無人の砂漠で、人はほぼ全員、一本の川とその三角州のそばに住んでいます。**それが盤面で見えます。細い緑の帯に41の町が並び、両側には何もありません。**この盤面にピラミッドとファラオは1つもありません。**町にも、問いにも、絵にも。**エジプトは、いま人が暮らしている場所です。**",
      ),
      t(
        "The Aswan High Dam drowned people before it drowned monuments: more than fifty thousand Egyptian Nubians left villages their families had lived in for generations. At Luxor the same argument runs the other way — three thousand families were moved off the west bank between 2006 and 2009 because they were living on top of the tombs. Alexandria has the oldest tram in Africa, running since 1860, in a city that is slowly sinking. Rosetta is a town named after a stone that has spent two centuries in another country\'s museum.|La presa de Asuán ahogó a personas antes que a monumentos: más de cincuenta mil nubios egipcios dejaron aldeas donde sus familias habían vivido durante generaciones. En Luxor el argumento corre al revés: tres mil familias fueron trasladadas de la orilla oeste entre 2006 y 2009 porque vivían encima de las tumbas. Alejandría tiene el tranvía más antiguo de África, en marcha desde 1860, en una ciudad que se hunde lentamente. Rosetta es un pueblo que lleva el nombre de una piedra que pasó dos siglos en el museo de otro país.|Le haut barrage d\'Assouan a noyé des gens avant de noyer des monuments : plus de cinquante mille Nubiens égyptiens ont quitté des villages où leurs familles vivaient depuis des générations. À Louxor, l\'argument s\'inverse : trois mille familles furent déplacées de la rive ouest entre 2006 et 2009 parce qu\'elles vivaient au-dessus des tombes. Alexandrie possède le plus ancien tramway d\'Afrique, en service depuis 1860, dans une ville qui s\'enfonce lentement. Rosette est une ville qui porte le nom d\'une pierre passée deux siècles dans le musée d\'un autre pays.|**アスワン・ハイダムは、遺跡より先に人を沈めました。**5万人を超えるエジプト系ヌビア人が、何世代も暮らした村を離れています。ルクソールでは同じ話が逆向きに起きました。2006〜2009年、3000世帯が西岸から移されています——**墓の真上に住んでいたからです。**アレクサンドリアには1860年から走るアフリカ最古の路面電車があり、その街はいま少しずつ沈んでいます。ロゼッタは、**二世紀にわたって他国の博物館にある石**の名を持つ町です。",
      ),
      t(
        "Thirty-five boards now, with 1,683 towns and 2,650 questions.|Ya son treinta y cinco tableros, con 1.683 pueblos y 2.650 preguntas.|Trente-cinq plateaux désormais, avec 1 683 villes et 2 650 questions.|盤面は35枚になりました。町は1683、問いは2650です。",
      ),
    ],
  },
  {
    version: "0.49.0",
    date: "2026-08-19",
    title: t(
      "Africa, the fifth continent board|África, el quinto tablero continental|L'Afrique, le cinquième plateau continental|大陸まるごとの盤面、5枚目はアフリカ",
    ),
    highlights: [
      t(
        "Sixty-three towns from Alexandria to Cape Town, and one thing they keep saying: these railways were built to carry things out, not to carry people across. Kinshasa and Brazzaville are the two closest capitals on earth and there is no bridge between them. Kigali has no railway at all. Banjul sits on the only country the river served instead of a railway. Nouadhibou has a line laid for a single train, two and a half kilometres of iron ore. At Oran a border station has been waiting thirty years for a train that has not come.|Sesenta y tres ciudades, de Alejandría a Ciudad del Cabo, y una cosa que repiten: estos ferrocarriles se hicieron para sacar cosas, no para llevar gente de un lado a otro. Kinshasa y Brazzaville son las dos capitales más cercanas del mundo y no hay puente entre ellas. Kigali no tiene ferrocarril alguno. Banjul está en el único país al que sirvió el río en lugar de una vía. Nuadibú tiene una línea tendida para un solo tren: dos kilómetros y medio de mineral de hierro. En Orán, una estación fronteriza lleva treinta años esperando un tren que no llega.|Soixante-trois villes, d\'Alexandrie au Cap, et une chose qu\'elles répètent : ces chemins de fer furent bâtis pour sortir des marchandises, non pour faire circuler les gens. Kinshasa et Brazzaville sont les deux capitales les plus proches du monde, et aucun pont ne les relie. Kigali n\'a pas de chemin de fer du tout. Banjul est dans le seul pays que le fleuve a desservi à la place d\'une voie ferrée. Nouadhibou a une ligne posée pour un seul train : deux kilomètres et demi de minerai de fer. À Oran, une gare frontière attend depuis trente ans un train qui ne vient pas.|**アレクサンドリアからケープタウンまで63の町。**この盤面がくり返し言うことがひとつあります。**ここの鉄道は、物を運び出すために敷かれたのであって、人が行き来するために敷かれたのではない。**キンシャサとブラザヴィルは世界でいちばん近い二つの首都ですが、あいだに橋はありません。キガリには鉄道が一本も届いていません。バンジュルがあるのは、鉄道ではなく川が国を貫いた唯一の国です。ヌアディブには、たった一本の列車のためだけに敷かれた線があります——長さ2.5kmの鉄鉱石列車です。オランでは、国境の駅が30年、来ない列車を待っています。",
      ),
      t(
        "The Cape-to-Cairo railway was never finished, and the board lets you see where it stopped. Aswan is the end of the line going south; Cape Town is the start going north; Bulawayo is where every direction of that plan met. The gaps in between are the point. A hundred and three questions, and a spirit of misfortune drawn from the same idea: the Unfinished Line, who rides with whoever falls behind.|El ferrocarril de El Cabo a El Cairo nunca se terminó, y el tablero deja ver dónde se detuvo. Asuán es el final hacia el sur; Ciudad del Cabo, el comienzo hacia el norte; Bulawayo, donde se cruzaban todas las direcciones de aquel plan. Los huecos entre medias son justamente el asunto. Ciento tres preguntas, y un espíritu de infortunio nacido de la misma idea: la Línea Inacabada, que viaja con quien se queda atrás.|Le chemin de fer du Cap au Caire ne fut jamais achevé, et le plateau montre où il s\'est arrêté. Assouan est le terminus vers le sud ; Le Cap, le départ vers le nord ; Bulawayo, le point où toutes les directions de ce projet se rejoignaient. Ce sont les manques entre les deux qui comptent. Cent trois questions, et un esprit du malheur né de la même idée : la Ligne inachevée, qui voyage avec celui qui est distancé.|**ケープ〜カイロ鉄道は完成しませんでした。**この盤面では、それがどこで止まったかが見えます。南へ向かう線の終わりがアスワン、北へ向かう線の始まりがケープタウン、その構想のあらゆる方角が集まったのがブラワヨです。**あいだの空白のほうが本題です。**103問と、同じ考えから生まれた厄災の神がひとつ。最下位の旅人に付いてくる「繋がらなかった線」です。",
      ),
      t(
        "Thirty-four boards now, with 1,642 towns and 2,548 questions.|Ya son treinta y cuatro tableros, con 1.642 pueblos y 2.548 preguntas.|Trente-quatre plateaux désormais, avec 1 642 villes et 2 548 questions.|盤面は34枚になりました。町は1642、問いは2548です。",
      ),
    ],
  },
  {
    version: "0.48.0",
    date: "2026-08-19",
    title: t(
      "Mexico, Spain and New Zealand|México, España y Nueva Zelanda|Le Mexique, l'Espagne et la Nouvelle-Zélande|メキシコ・スペイン・ニュージーランド",
    ),
    highlights: [
      t(
        "Mexico, where the passenger trains mostly stopped. The network was broken up and sold in the 1990s and the scheduled services went with it; what survives is freight, the Copper Canyon line through thirty-seven bridges and eighty-six tunnels, and the new Maya Train, which the board describes together with the objections to it. Forty-five towns, from Teotihuacán — whose builders are still unknown, and whose Avenue of the Dead was named centuries later by Aztecs who assumed the mounds were tombs — to Aguascalientes, where the railway workshops opened in 1884.|México, donde los trenes de pasajeros casi desaparecieron. La red se fragmentó y se vendió en los años noventa, y con ella se fueron los servicios regulares; queda la carga, la línea del Cañón del Cobre con sus treinta y siete puentes y ochenta y seis túneles, y el nuevo Tren Maya, que el tablero describe junto con las objeciones que suscita. Cuarenta y cinco pueblos, de Teotihuacán —cuyos constructores siguen siendo desconocidos y cuya Calzada de los Muertos fue bautizada siglos después por aztecas que supusieron que los montículos eran tumbas— a Aguascalientes, donde los talleres ferroviarios abrieron en 1884.|Le Mexique, où les trains de voyageurs ont presque disparu. Le réseau fut démantelé et vendu dans les années 1990, emportant les services réguliers ; restent le fret, la ligne du Cañon du Cuivre et ses trente-sept ponts et quatre-vingt-six tunnels, et le nouveau Train Maya, que le plateau décrit avec les objections qu'il soulève. Quarante-cinq villes, de Teotihuacan — dont les bâtisseurs restent inconnus et dont la Chaussée des Morts fut nommée des siècles plus tard par des Aztèques qui croyaient les tertres funéraires — à Aguascalientes, où les ateliers ferroviaires ouvrirent en 1884.|**旅客列車がほとんど消えた国、メキシコ。**1990年代に鉄道網が分割・売却され、定期の旅客列車もそのとき一緒に消えました。残っているのは貨物と、37の橋と86のトンネルを抜けるチワワ太平洋鉄道、そして新しいマヤ列車です(この盤面は、マヤ列車への批判も並べて書いています)。45の町。建てた人がいまも分かっておらず、「死者の大通り」という名は何世紀もあとにアステカの人々が塚を墓だと思って付けたテオティワカンから、1884年に鉄道工場が開いたアグアスカリエンテスまで。",
      ),
      t(
        "Spain, where the trains change gauge at the border. The Iberian gauge of 1,668mm does not meet Europe's 1,435mm, so for over a century crossing into France meant changing trains — and now the high-speed lines run on standard gauge, so two gauges run side by side inside the same country. Bilbao adds a third: the metre-gauge lines British capital laid to move iron ore. Forty-five towns across eight regions, and four official languages, one of which — Basque — is related to no other language on earth.|España, donde los trenes cambian de ancho en la frontera. El ancho ibérico de 1.668 mm no encaja con los 1.435 mm de Europa, así que durante más de un siglo cruzar a Francia significó cambiar de tren; ahora las líneas de alta velocidad ruedan en ancho estándar y dos anchos conviven dentro del mismo país. Bilbao añade un tercero: las líneas de vía métrica que el capital británico tendió para mover mineral de hierro. Cuarenta y cinco pueblos en ocho regiones, y cuatro lenguas oficiales, una de las cuales —el euskera— no está emparentada con ninguna otra lengua del mundo.|L'Espagne, où les trains changent d'écartement à la frontière. L'écartement ibérique de 1 668 mm ne rejoint pas les 1 435 mm européens : pendant plus d'un siècle, passer en France signifiait changer de train — et les lignes à grande vitesse roulent désormais en écartement standard, si bien que deux écartements cohabitent dans le même pays. Bilbao en ajoute un troisième : les voies métriques posées par les capitaux britanniques pour le minerai de fer. Quarante-cinq villes dans huit régions, et quatre langues officielles, dont le basque, apparenté à aucune autre langue au monde.|**国境で列車の軌間が変わる国、スペイン。**イベリア半島の1668mmは、ヨーロッパの標準軌1435mmとつながりません。1世紀以上のあいだ、フランスへ渡るには乗り換えが要りました。いっぽう高速新線は標準軌で敷かれたので、**同じ国の中に2つの軌間が並んで走っています。**ビルバオには3つ目があります。鉄鉱石を運ぶために英国の資本が敷いたメーターゲージです。8つの地方に45の町。公用語は4つあり、そのうちバスク語は**地球上のどの言語とも親戚ではありません。**",
      ),
      t(
        "New Zealand, where the railway crosses the sea. Wagons roll onto the ferry at Picton and off again at Wellington, because the two islands have no bridge. Forty-three towns: the geothermal field at Rotorua, the coast at Kaikōura that rose six metres in the 2016 earthquake and cut the line for over a year, Te Anau where a bird declared extinct in 1898 turned up alive in 1948. Wellington became the capital in 1864 because the colonies could not agree, and three commissioners were brought over from Australia to decide for them.|Nueva Zelanda, donde el ferrocarril cruza el mar. Los vagones suben al transbordador en Picton y bajan en Wellington, porque las dos islas no tienen puente. Cuarenta y tres pueblos: el campo geotérmico de Rotorua, la costa de Kaikōura que se elevó seis metros en el terremoto de 2016 y cortó la línea más de un año, Te Anau, donde un ave declarada extinta en 1898 apareció viva en 1948. Wellington fue capital en 1864 porque las colonias no lograban ponerse de acuerdo, y se trajo a tres comisionados de Australia para que decidieran.|La Nouvelle-Zélande, où le chemin de fer traverse la mer. Les wagons montent sur le ferry à Picton et en descendent à Wellington, faute de pont entre les deux îles. Quarante-trois villes : le champ géothermique de Rotorua, la côte de Kaikōura soulevée de six mètres lors du séisme de 2016, coupant la ligne plus d'un an, Te Anau où un oiseau déclaré éteint en 1898 réapparut vivant en 1948. Wellington devint capitale en 1864 parce que les colonies n'arrivaient pas à s'entendre : on fit venir trois commissaires d'Australie pour trancher.|**線路が海を渡る国、ニュージーランド。**2つの島に橋は無く、貨車はピクトンで船に乗り、ウェリントンで降ります。43の町。ロトルアの地熱地帯、2016年の地震で6m隆起して1年以上も線路が断たれたカイコウラの海岸、1898年に絶滅とされた鳥が1948年に生きて見つかったテ・アナウ。ウェリントンが1864年に首都になったのは、**植民地どうしで決着がつかず、オーストラリアから3人の委員を呼んで決めてもらった**からです。",
      ),
    ],
  },
  {
    version: "0.47.0",
    date: "2026-08-19",
    title: t(
      "Towns you already know get out of the way|Los pueblos que ya conoces se apartan|Les villes déjà connues s'effacent|一度来た町は、さっと通れます",
    ),
    highlights: [
      t(
        "The first time you stop in a town you get the picture, the name and the line about what the place is. The fourth time you stop in the same town, you got all of it again — the same picture, the same line — before you could get to the part you actually stopped for. Now a town you have already visited opens straight onto your cash, the businesses and the stall. The picture is not gone: there is a button under the name that brings it back, for when you skipped past it the first time.|La primera vez que paras en un pueblo ves la ilustración, el nombre y la frase que dice qué es ese lugar. La cuarta vez en el mismo pueblo, lo veías todo otra vez —la misma imagen, la misma frase— antes de llegar a lo que ibas a hacer. Ahora un pueblo ya visitado se abre directamente en tu dinero, los negocios y el puesto. La ilustración no desaparece: hay un botón bajo el nombre que la devuelve, por si la pasaste de largo la primera vez.|La première fois que vous vous arrêtez dans une ville, vous avez l'image, le nom et la phrase qui dit ce qu'est ce lieu. La quatrième fois dans la même ville, vous aviez tout de nouveau — même image, même phrase — avant d'arriver à ce pour quoi vous vous étiez arrêté. Désormais une ville déjà visitée s'ouvre directement sur votre argent, les commerces et l'étal. L'image n'est pas perdue : un bouton sous le nom la ramène, si vous l'aviez passée la première fois.|**初めて止まった町では、これまでどおり**絵と名前と、その土地がどんな場所かの一言が出ます。ところが同じ町に4回目に止まったときも、同じ絵と同じ一言が最後まで出ていました。止まった用事にたどり着くまで、毎回それを越える必要がありました。**一度来た町は、手持ち・物件・屋台から始まります。**絵を捨てたわけではありません。町の名前の下のボタンを押せば戻ってきます(1回目に読み飛ばした人のために残してあります)。",
      ),
      t(
        "Arriving at your destination is left alone — that is the biggest moment in the game and not somewhere to save time. Whether a town counts as visited is tracked per traveler, so a town that is old news to you may still be new to the player next to you. Saved games from before this change treat every town as new again, once.|La llegada al destino no cambia: es el momento más importante de la partida y no es donde hay que ahorrar tiempo. Que un pueblo cuente como visitado se guarda por viajero, así que un pueblo que a ti ya no te dice nada puede ser nuevo para quien juega a tu lado. Las partidas guardadas antes de este cambio tratan cada pueblo como nuevo una vez más.|L'arrivée à destination reste inchangée : c'est le plus grand moment du jeu, pas un endroit où gagner du temps. Le fait qu'une ville compte comme visitée est suivi par voyageur : une ville que vous connaissez par cœur peut être neuve pour votre voisin. Les parties sauvegardées avant ce changement considèrent chaque ville comme neuve, une fois.|**目的地に着いたときは、これまでどおりです。**あれはこの遊びのいちばん大きな見せ場で、時間を切り詰めるところではありません。町を訪ねたかどうかは**旅人ごと**に覚えているので、あなたには見慣れた町でも、隣の人には初めてかもしれません。この変更より前のセーブから続けると、その回だけどの町も「初めて」に戻ります。",
      ),
    ],
  },
  {
    version: "0.46.2",
    date: "2026-08-17",
    title: t(
      "The whole-continent boards were hiding|Los tableros de continente estaban escondidos|Les plateaux de continent se cachaient|大陸まるごとの盤面が隠れていました",
    ),
    highlights: [
      t(
        "Open Asia on the map and you get Japan, Korea, China, India and the rest — and under them a thin bar reading \"Asia\". That bar was the whole-continent board, sixty-five towns from Istanbul to Vladivostok, but it looked like a heading. Someone told us there was no Asia board at all. It had been there since v0.43.0. The bar now says what it is and carries the board's description, like every other choice. The same applies to Europe, North America and South America.|Abre Asia en el mapa y aparecen Japón, Corea, China, India y los demás, y debajo una barra fina que dice «Asia». Esa barra era el tablero del continente entero, sesenta y cinco pueblos de Estambul a Vladivostok, pero parecía un encabezado. Alguien nos dijo que no había ningún tablero de Asia. Estaba ahí desde la v0.43.0. Ahora la barra dice lo que es y lleva su descripción, como cualquier otra opción. Lo mismo con Europa, Norteamérica y Sudamérica.|Ouvrez l'Asie sur la carte et vous obtenez le Japon, la Corée, la Chine, l'Inde et les autres — et en dessous une fine barre indiquant « Asia ». Cette barre était le plateau du continent entier, soixante-cinq villes d'Istanbul à Vladivostok, mais elle ressemblait à un titre. On nous a signalé qu'il n'y avait pas de plateau Asie du tout. Il était là depuis la v0.43.0. La barre dit désormais ce qu'elle est et porte la description du plateau, comme tout autre choix. Idem pour l'Europe, l'Amérique du Nord et l'Amérique du Sud.|地図で「アジア」を開くと、日本・韓国・中国・インドなどが並び、その下に「Asia」とだけ書かれた細い帯が出ていました。**あれが大陸まるごとの盤面**——イスタンブールからウラジオストクまで65の町——だったのですが、見出しにしか見えませんでした。「アジア版が無いのでは」という報せをいただいて気づきました。**v0.43.0 からずっとありました。**帯に説明を添えて、ほかの選択肢と同じ「選ぶもの」の見た目にしました。ヨーロッパ・北アメリカ・南アメリカも同じです。",
      ),
    ],
  },
  {
    version: "0.46.1",
    date: "2026-08-17",
    title: t(
      "We now count visits|Ahora contamos las visitas|Nous comptons désormais les visites|訪問数を数えるようにしました",
    ),
    highlights: [
      t(
        "We had no idea whether anyone was playing, or which boards they picked. The game now counts page views so we can tell. It does not set a cookie, does not follow you between sites, and does not collect anything that identifies you — we chose a counter that works without any of that, rather than the usual one, precisely so there is no consent banner to click past. Nothing about how the game plays has changed.|No sabíamos si alguien jugaba, ni qué tableros elegía. El juego cuenta ahora las visitas para saberlo. No pone ninguna cookie, no te sigue entre sitios y no recoge nada que te identifique: elegimos un contador que funciona sin nada de eso, en vez del habitual, precisamente para que no haya ningún aviso de consentimiento que descartar. Nada en el juego cambia.|Nous ignorions si quelqu'un jouait, et quels plateaux étaient choisis. Le jeu compte désormais les visites. Il ne dépose aucun cookie, ne vous suit pas d'un site à l'autre et ne recueille rien qui vous identifie : nous avons choisi un compteur qui fonctionne sans tout cela, plutôt que l'habituel, précisément pour qu'il n'y ait aucune bannière de consentement à écarter. Rien ne change dans le jeu lui-même.|**誰かが遊んでくれているのか、どの盤面が選ばれているのかが、こちらには分かりませんでした。**訪問数を数えるようにしました。**Cookieは置きません。**サイトをまたいで追いかけることも、あなたを特定できるものを集めることもしません。よくあるものではなく、そうしたことをせずに数えられる仕組みを選んでいます。**同意バナーを押してもらわずに済ませたかった**からです。遊びかたは何も変わりません。",
      ),
    ],
  },
  {
    version: "0.46.0",
    date: "2026-08-17",
    title: t(
      "A quiet run out of the station|Una salida tranquila de la estación|Un départ tranquille|駅を出てしばらくは静か",
    ),
    highlights: [
      t(
        "The opening of a game was the busiest part of it. Not because more was packed in — we measured, and the squares near the start carry the same mix as the rest of the board — but because everything there is new. Every town is a town you have not read yet, you have no items, and you have no money behind you. Three squares in and you had already been stopped four times. Now the squares around your departure town are mostly plain: roughly seven in ten of the events near the start have been taken out, so you can get moving before the map starts asking you things.|La apertura de la partida era su parte más recargada. No porque hubiera más —lo medimos, y las casillas cercanas a la salida tienen la misma mezcla que el resto— sino porque allí todo es nuevo. Cada pueblo es uno que aún no has leído, no tienes objetos y no llevas dinero detrás. A las tres casillas ya te habían detenido cuatro veces. Ahora las casillas alrededor de tu pueblo de salida son casi todas simples: se han quitado cerca de siete de cada diez sucesos, para que puedas ponerte en marcha antes de que el mapa empiece a preguntarte cosas.|L'ouverture de la partie en était le moment le plus chargé. Non qu'il y ait eu davantage — nous avons mesuré, et les cases proches du départ portent le même mélange que le reste — mais parce que tout y est neuf. Chaque ville est une ville que vous n'avez pas encore lue, vous n'avez pas d'objets, ni d'argent derrière vous. Trois cases plus loin, on vous avait déjà arrêté quatre fois. Les cases autour de votre ville de départ sont désormais surtout neutres : près de sept événements sur dix y ont été retirés, pour que vous puissiez vous élancer avant que la carte ne se mette à vous questionner.|**ゲームの序盤がいちばん忙しい**、という報せをいただきました。測ってみると、出発地のまわりのマスは盤面のほかの場所と同じ配分でした。**詰まっていたわけではありません。**それでも重かったのは、序盤は何もかもが初めてだからです。どの町もまだ読んでいない町で、持ち物も無く、資金の勢いもありません。3マス進むころには、もう4回止められている。**出発する町のまわりを、ほとんど何も起きないマスにしました。**序盤の出来事のおよそ7割を取り除いてあります。地図から問いかけられる前に、まず走り出せます。",
      ),
      t(
        "Towns were left alone. Buying businesses is the game, and the towns near the start are where you build the position you spend the rest of the year defending. The quiet stretch also fades rather than ending abruptly — the further you get from home, the more the board wakes up. And a few events are always kept near the start, so the first quiz never sits more than a short ride away.|Los pueblos no se han tocado. Comprar negocios es el juego, y los pueblos cercanos a la salida son donde construyes la posición que defenderás el resto del año. Además, el tramo tranquilo se desvanece en vez de cortarse: cuanto más te alejas de casa, más despierta el tablero. Y siempre se conservan algunos sucesos cerca de la salida, para que el primer quiz nunca quede a más de un corto trayecto.|Les villes n'ont pas été touchées. Acheter des commerces, c'est le jeu, et les villes proches du départ sont là où se construit la position que vous défendrez toute l'année. Le calme s'estompe progressivement plutôt que de s'arrêter net : plus on s'éloigne, plus le plateau se réveille. Et quelques événements sont toujours conservés près du départ, pour que le premier quiz ne soit jamais à plus d'un court trajet.|**町には手を付けていません。**物件を買うのがこの遊びの本体で、出発地のまわりの町は、その年ずっと守ることになる足場を築く場所だからです。静かな区間は途中でぷつりと終わるのではなく、**家から離れるほど盤面が目を覚まします。**出発地の近くにも出来事はいくつか必ず残してあるので、最初のクイズが遠くなりすぎることもありません。",
      ),
    ],
  },
  {
    version: "0.45.1",
    date: "2026-08-15",
    title: t(
      "The phone screen fits again|La pantalla del móvil vuelve a caber|L'écran du téléphone tient enfin|携帯の画面に収まるようにしました",
    ),
    highlights: [
      t(
        "On a phone, everything below the map was off the screen. The destination you are racing to, your items, the other travelers, how many squares are left — all of it needed scrolling, and the page itself ran 326 to 389 pixels past the bottom. You could roll the die, but you could not see where you were going or use what you were carrying. Now it all fits on one screen at once, on a 375-wide phone as well as a 390-wide one.|En el móvil, todo lo que había debajo del mapa quedaba fuera de la pantalla. El destino al que corres, tus objetos, los demás viajeros, cuántas casillas faltan: todo exigía desplazarse, y la propia página se pasaba entre 326 y 389 píxeles del borde inferior. Podías tirar el dado, pero no ver adónde ibas ni usar lo que llevabas. Ahora todo cabe de una vez, tanto en un móvil de 375 de ancho como en uno de 390.|Sur téléphone, tout ce qui se trouvait sous la carte sortait de l'écran. La destination visée, vos objets, les autres voyageurs, le nombre de cases restantes : il fallait faire défiler, et la page elle-même dépassait de 326 à 389 pixels. On pouvait lancer le dé, mais sans voir où l'on allait ni utiliser ce qu'on portait. Tout tient désormais sur un seul écran, sur un téléphone de 375 de large comme de 390.|携帯では、地図から下がすべて画面の外にありました。目指している行き先も、持ち物も、ほかの旅人も、あと何マスかも、全部スクロールしないと見えず、ページ自体も326〜389ピクセルはみ出していました。サイコロは振れるのに、**どこへ向かっているのかが見えず、持っているものも使えない**状態でした。横375の機種でも390の機種でも、いまは一度に収まります。",
      ),
      t(
        "Getting there meant giving up some things on small screens: the header no longer shows the app name, the destination card hides its artwork, and the travel log is folded away. The most recent line of the log still appears at the top of the screen when something happens, so nothing is lost. On a tablet or a computer, nothing has changed.|Para lograrlo hubo que ceder algo en pantallas pequeñas: la cabecera ya no muestra el nombre, la tarjeta de destino oculta su ilustración y el diario de viaje queda plegado. La última línea del diario sigue apareciendo arriba cuando ocurre algo, así que no se pierde nada. En tableta u ordenador no cambia nada.|Il a fallu renoncer à certaines choses sur petit écran : l'en-tête n'affiche plus le nom, la carte de destination masque son illustration et le journal de voyage est replié. La dernière ligne du journal apparaît toujours en haut quand il se passe quelque chose, rien n'est donc perdu. Sur tablette ou ordinateur, rien ne change.|そのために、狭い画面ではいくつか譲りました。ヘッダの題名を伏せ、行き先カードの絵を隠し、旅の記録を畳んでいます。記録の最新の1行は、何かが起きたときに画面の上に出るので見落としません。タブレットやパソコンでは何も変わりません。",
      ),
    ],
  },
  {
    version: "0.45.0",
    date: "2026-08-15",
    title: t(
      "Room to breathe|Espacio para respirar|De quoi souffler|息をつげる間",
    ),
    highlights: [
      t(
        "Every square used to do something. Land anywhere between two towns and a window opened — a quiz, a windfall, a setback — and the board disappeared behind it until you closed it. Across all thirty boards that was 3,466 squares, every one of them an interruption. Now about half of them are plain: you stop, nothing happens, and the next traveler rolls. The rail journey has some quiet stretches in it again.|Antes cada casilla hacía algo. Caías en cualquier punto entre dos pueblos y se abría una ventana —una pregunta, una ganancia, un contratiempo— y el tablero desaparecía tras ella hasta que la cerrabas. En los treinta tableros eran 3.466 casillas, todas ellas una interrupción. Ahora cerca de la mitad son simples: te detienes, no pasa nada, y tira el siguiente viajero. El viaje en tren vuelve a tener tramos tranquilos.|Chaque case faisait quelque chose. On s'arrêtait n'importe où entre deux villes et une fenêtre s'ouvrait — une question, une aubaine, un contretemps — et le plateau disparaissait derrière jusqu'à ce qu'on la referme. Sur les trente plateaux, cela faisait 3 466 cases, autant d'interruptions. Environ la moitié sont désormais neutres : on s'arrête, rien ne se passe, et le voyageur suivant lance le dé. Le trajet retrouve des portions calmes.|これまでは、どのマスに止まっても必ず何かが起きていました。町と町のあいだのどこに止まっても窓が開き(クイズ、臨時収入、災難)、閉じるまで盤面が見えませんでした。全30盤面で3,466マス、その全部が中断だったことになります。**いまはそのおよそ半分が、止まっても何も起きないマスです。**止まって、何も起きず、次の人がサイコロを振る。鉄道の旅に、静かな区間が戻ってきました。",
      ),
      t(
        "Quiz squares are now about a quarter of the run between towns rather than half. You will still meet plenty of questions — a board has hundreds of squares and one game touches only a few of them — but they no longer arrive on every single stop. The legend under \"What the squares do\" lists the plain square alongside the others.|Las casillas de preguntas son ahora cerca de una cuarta parte del trayecto entre pueblos, en vez de la mitad. Seguirás encontrando muchas preguntas —un tablero tiene cientos de casillas y una partida pisa solo unas pocas— pero ya no llegan en cada parada. La leyenda de «Qué hace cada casilla» incluye la casilla simple junto a las demás.|Les cases quiz représentent maintenant environ un quart du trajet entre deux villes, au lieu de la moitié. Vous rencontrerez encore beaucoup de questions — un plateau compte des centaines de cases et une partie n'en touche qu'une poignée — mais elles n'arrivent plus à chaque arrêt. La légende « Ce que font les cases » présente la case neutre avec les autres.|クイズのマスは、町と町のあいだの半分から**4分の1ほど**になりました。問題に出会う機会が大きく減るわけではありません(盤面には数百のマスがあり、1回の対局で踏むのはその一部だけです)。ただ、止まるたびに出題されることは無くなりました。「マスの意味」の凡例にも、何も起きないマスを載せてあります。",
      ),
    ],
  },
  {
    version: "0.44.0",
    date: "2026-08-14",
    title: t(
      "Harder questions, and more of them|Preguntas más difíciles, y más|Des questions plus difficiles, et plus nombreuses|難しい問題を、たくさん",
    ),
    highlights: [
      t(
        "You told us the quiz repeats itself the more you play. We measured, and the cause was not the number of questions — it was where they sat. Say you know a place well and the game draws from its hardest tier, and some boards had almost nothing there: Europe had fifty questions and not one above difficulty six. Ten boards have now been rebuilt to a hundred or more each, weighted to the hard end. Japan went from thirty-two questions to a hundred and nine, the Solar System from thirty-two to a hundred and one, Korea from thirty-seven to a hundred and two.|Nos dijiste que las preguntas se repiten cuanto más juegas. Lo medimos, y la causa no era el número sino su reparto: si dices que conoces bien un lugar, el juego saca del nivel más difícil, y algunos tableros casi no tenían nada ahí — Europa tenía cincuenta preguntas y ninguna por encima de dificultad seis. Diez tableros llevan ahora cien o más cada uno, cargados hacia lo difícil. Japón pasó de treinta y dos preguntas a ciento nueve; el Sistema Solar, de treinta y dos a ciento una; Corea, de treinta y siete a ciento dos.|Vous nous avez dit que les questions se répètent à mesure qu'on joue. Nous avons mesuré : la cause n'était pas leur nombre mais leur répartition. Si vous dites bien connaître un lieu, le jeu puise dans le niveau le plus difficile, et certains plateaux n'y avaient presque rien — l'Europe comptait cinquante questions et aucune au-dessus de la difficulté six. Dix plateaux en portent désormais cent ou plus, orientés vers le haut. Le Japon est passé de trente-deux questions à cent neuf, le Système solaire de trente-deux à cent une, la Corée de trente-sept à cent deux.|「プレイすればするほどクイズが被る」という報せをいただきました。測ったところ、原因は問題の数ではなく、難易度の偏りでした。「その土地をよく知っている」を選ぶといちばん難しい層から出題されるのですが、そこがほとんど空の盤面があったのです。ヨーロッパは50問あって、難易度6を超えるものが1問もありませんでした。10の盤面を100問以上に組み直し、足したぶんは難しい層に寄せました。日本は32問から109問、太陽系は32問から101問、韓国は37問から102問になりました。",
      ),
      t(
        "The new questions go where the town cards do not. Ainu place names read as sentences about the land — Niseko-Annupuri says where it stands. Four railway gauges collide across Asia, and none of them is an accident. Ceuta and Tetouan were joined by a metre-gauge line that could never meet the standard-gauge track in the French zone, because the two protectorates built separately. Britain's one double-deck train was abandoned not for lack of demand but because the ceilings were too low to board quickly.|Las preguntas nuevas van donde no llegan las cartas de las ciudades. Los topónimos ainu se leen como frases sobre el terreno: Niseko-Annupuri dice dónde se alza. Cuatro anchos de vía chocan en Asia, y ninguno es casual. Ceuta y Tetuán se unieron con una línea de ancho métrico que jamás pudo encontrarse con la vía normal de la zona francesa, porque los dos protectorados construyeron por separado. El único tren de dos pisos británico se abandonó no por falta de demanda, sino porque los techos eran demasiado bajos para subir deprisa.|Les nouvelles questions vont là où les cartes des villes ne vont pas. Les toponymes aïnous se lisent comme des phrases sur le terrain : Niseko-Annupuri dit où il se dresse. Quatre écartements ferroviaires se heurtent en Asie, et aucun n'est fortuit. Ceuta et Tétouan furent reliées par une voie métrique qui ne pouvait rejoindre la voie normale de la zone française, les deux protectorats ayant bâti séparément. L'unique train à deux niveaux britannique fut abandonné non faute de clients, mais parce que les plafonds étaient trop bas pour monter vite.|足した問題は、都市カードが書いていないところを狙っています。アイヌ語の地名は土地を述べた一文として読めること(「ニセコアンヌプリ」はその山がどこに立っているかを言っています)。アジアでは4つの軌間がぶつかっていて、どれも偶然ではないこと。セウタとテトゥアンを結んだ鉄道はメーターゲージで、フランス側の標準軌とは決してつながらなかったこと——保護領が2つに割れていたからです。イギリスに1本だけあった2階建て列車が廃れたのは、客が来なかったからではなく、天井が低すぎて乗り降りに時間がかかったからでした。",
      ),
      t(
        "Along the way we found questions whose answers were already printed on the town card you had just read, and a few that were simply wrong — Sedna was called a dwarf planet, which it is not, and Japan's record gust was dated to the wrong typhoon. Those are fixed. Twenty boards are still waiting their turn.|Por el camino encontramos preguntas cuya respuesta ya estaba impresa en la carta de la ciudad que acababas de leer, y algunas sencillamente equivocadas: se llamaba planeta enano a Sedna, que no lo es, y la racha récord de Japón estaba fechada en el tifón equivocado. Ya están corregidas. Veinte tableros siguen esperando su turno.|Chemin faisant, nous avons trouvé des questions dont la réponse figurait déjà sur la carte de ville que vous veniez de lire, et quelques-unes tout simplement fausses : Sedna était qualifiée de planète naine, ce qu'elle n'est pas, et la rafale record du Japon était datée du mauvais typhon. C'est corrigé. Vingt plateaux attendent encore leur tour.|作業のあいだに、答えがついさっき読んだ都市カードにそのまま書いてある問題や、単純に間違っている問題も見つかりました。セドナを準惑星と呼んでいたもの(準惑星ではありません)、日本の最大瞬間風速を別の台風の年にしていたもの。直してあります。残り20の盤面はこれからです。",
      ),
    ],
  },
  {
    version: "0.43.0",
    date: "2026-08-14",
    title: t(
      "Asia, and harder questions|Asia, y preguntas más difíciles|L'Asie, et des questions plus difficiles|アジアと、難しい問題",
    ),
    highlights: [
      t(
        "Asia completes the four continents: sixty-five towns across thirty-five countries, from Istanbul to Vladivostok and from Irkutsk to Java. The Silk Road was a net, not a road. Coaches change their bogies at Dostyk and at Naushki because the gauge changes at the border. Busan has no railway to the mainland at all. At Kanchanaburi the board says plainly that far more rōmusha died on the Burma Railway than Allied prisoners, and that their names were not kept.|Asia completa los cuatro continentes: sesenta y cinco pueblos en treinta y cinco países, de Estambul a Vladivostok y de Irkutsk a Java. La Ruta de la Seda era una red, no un camino. Los coches cambian de bogie en Dostyk y en Naushki porque el ancho cambia en la frontera. Busan no tiene ferrocarril alguno hacia el continente. En Kanchanaburi el tablero dice sin rodeos que murieron muchos más rōmusha que prisioneros aliados, y que no se guardaron sus nombres.|L'Asie complète les quatre continents : soixante-cinq villes dans trente-cinq pays, d'Istanbul à Vladivostok et d'Irkoutsk à Java. La route de la soie était un filet, pas une route. Les voitures changent de bogies à Dostyk et à Naouchki, car l'écartement change à la frontière. Busan n'a aucune voie ferrée vers le continent. À Kanchanaburi, le plateau dit clairement que bien plus de rōmusha sont morts sur la voie ferrée de Birmanie que de prisonniers alliés, et que leurs noms n'ont pas été conservés.|アジアが加わって、大陸が4枚そろいました。35か国65の町、イスタンブールからウラジオストク、イルクーツクからジャワまで。シルクロードは一本道ではなく網でした。ドスティクとナウシキでは、国境で軌間が変わるので客車の台車を履き替えます。釜山からは大陸へ向かう鉄路が一本もありません。カンチャナブリの項には、泰緬鉄道で亡くなったロームシャが連合軍捕虜よりはるかに多かったこと、その名前が残されなかったことを、そのまま書いてあります。",
      ),
      t(
        "Quizzes were repeating for anyone who played a board more than once. The cause was not the number of questions but their spread: pick \"I know this place well\" and the game draws from the hardest tier, and some boards had almost nothing there — Europe had fifty questions and not one above difficulty six. Europe, South America and North America now carry a hundred or more each, with the new ones weighted to the hard end. The other boards follow.|Las preguntas se repetían para quien jugaba un tablero más de una vez. La causa no era el número sino su reparto: si eliges «conozco bien este lugar», el juego saca del nivel más difícil, y algunos tableros casi no tenían nada ahí — Europa tenía cincuenta preguntas y ninguna por encima de dificultad seis. Europa, Sudamérica y Norteamérica llevan ahora cien o más cada uno. Los demás vendrán después.|Les questions se répétaient pour qui jouait un plateau plus d'une fois. La cause n'était pas leur nombre mais leur répartition : si vous choisissez « je connais bien cet endroit », le jeu puise dans le niveau le plus difficile, et certains plateaux n'y avaient presque rien — l'Europe comptait cinquante questions et aucune au-dessus de la difficulté six. L'Europe, l'Amérique du Sud et l'Amérique du Nord en portent désormais cent ou plus chacune. Les autres suivront.|盤面を2回以上遊ぶとクイズが被る、という報せをいただきました。原因は問題の数ではなく、難易度の偏りでした。「その土地をよく知っている」を選ぶといちばん難しい層から出題されるのですが、そこがほとんど空の盤面があったのです。ヨーロッパは50問あって、難易度6を超えるものが1問もありませんでした。ヨーロッパ・南アメリカ・北アメリカを100問以上にし、足したぶんは難しい層に寄せました。ほかの盤面もこれから増やします。",
      ),
      t(
        "Typing a player's name used to rebuild 235KB of map artwork on every keystroke, even on screens where none of it is visible. It does not any more.|Escribir el nombre de un jugador reconstruía 235KB de mapas en cada pulsación, incluso en pantallas donde no se ve ninguno. Ya no.|Saisir le nom d'un joueur reconstruisait 235 Ko de cartes à chaque frappe, même sur les écrans où rien de tout cela n'est visible. Ce n'est plus le cas.|旅人の名前を1文字打つたびに、235KBぶんの盤面の絵を組み立て直していました(その絵が1枚も見えていない画面でも)。やめました。",
      ),
    ],
  },
  {
    version: "0.42.0",
    date: "2026-08-14",
    title: t(
      "Three continents you can ride end to end|Tres continentes que puedes recorrer de punta a punta|Trois continents à parcourir d'un bout à l'autre|大陸まるごとの盤面が3枚",
    ),
    highlights: [
      t(
        "Europe, South America and North America each fit onto a single board. These are not the country boards zoomed out — they carry the stories that only cross a border: the coaches lifted one by one at Brest to change their bogies for Russian gauge, the Pan-American Highway stopping dead at the Darién Gap, the Trans-Andine that cut thirty-six hours off the voyage around Cape Horn, the harbour at Punta Arenas that emptied overnight when the Panama Canal opened.|Europa, Sudamérica y Norteamérica caben cada una en un solo tablero. No son los tableros de país alejados: llevan las historias que solo cruzan una frontera — los coches izados uno a uno en Brest para cambiar de bogie al ancho ruso, la Panamericana que se detiene en seco en el Tapón del Darién, el Transandino que recortó treinta y seis horas al viaje por el Cabo de Hornos, el puerto de Punta Arenas que se vació de un día para otro al abrirse el Canal de Panamá.|L'Europe, l'Amérique du Sud et l'Amérique du Nord tiennent chacune sur un seul plateau. Ce ne sont pas les plateaux de pays vus de loin : ils portent les histoires qui ne se racontent qu'en traversant une frontière — les voitures soulevées une à une à Brest pour changer de bogies, la route panaméricaine qui s'arrête net au Darién, le Transandin qui a retranché trente-six heures au voyage par le cap Horn, le port de Punta Arenas vidé du jour au lendemain par l'ouverture du canal de Panama.|ヨーロッパ・南アメリカ・北アメリカが、それぞれ1枚の盤面に収まりました。国の盤面を引いて見たものではありません。国境をまたがないと出てこない話を集めてあります——ブレストで客車を1両ずつ持ち上げてロシア軌間の台車に履き替えること、パンアメリカン・ハイウェイがダリエン地峡でぷつりと途切れること、ホーン岬回りを36時間縮めたトランスアンディーノ、パナマ運河の開通で一夜にして空になったプンタアレナスの港。",
      ),
      t(
        "The same river changes its name at the border, and so does the board: it reads Rio Grande in English and Río Bravo del Norte in Spanish. Iceland has never had a railway. Kathmandu is a capital with no station. Not one of these is a country's own story.|El mismo río cambia de nombre en la frontera, y el tablero también: dice Rio Grande en inglés y Río Bravo del Norte en español. Islandia nunca ha tenido ferrocarril. Katmandú es una capital sin estación. Ninguna de estas es la historia de un solo país.|Le même fleuve change de nom à la frontière, et le plateau aussi : il affiche Rio Grande en anglais et Río Bravo del Norte en espagnol. L'Islande n'a jamais eu de chemin de fer. Katmandou est une capitale sans gare. Aucune de ces histoires n'appartient à un seul pays.|同じ川が国境の向こうで名前を変えるので、盤面も変えました。英語では Rio Grande、スペイン語では Río Bravo del Norte と出ます。アイスランドには鉄道が一度もありません。カトマンズは駅の無い首都です。どれも一つの国の話ではありません。",
      ),
      t(
        "Auschwitz-Birkenau is not a square you can land on and buy. It is written into Kraków's card as fact, the way Hiroshima has always been written on the Japan board, and what you can buy there has nothing to do with it.|Auschwitz-Birkenau no es una casilla en la que caer y comprar. Está escrito como hecho en la carta de Cracovia, igual que Hiroshima en el tablero de Japón, y lo que allí se compra nada tiene que ver.|Auschwitz-Birkenau n'est pas une case où s'arrêter et acheter. C'est écrit comme un fait sur la carte de Cracovie, comme Hiroshima l'est depuis toujours sur le plateau du Japon, et ce qu'on y achète n'a rien à voir.|アウシュヴィッツ=ビルケナウは、止まって物件を買うマスにはしていません。日本の盤面が広島をずっとそう書いてきたのと同じように、クラクフの豆知識に事実として置き、そこで買えるものはその歴史と関係のない地元の商いにしてあります。",
      ),
    ],
  },
  {
    version: "0.41.1",
    date: "2026-08-14",
    title: t(
      "A steam engine was running between the planets|Una locomotora circulaba entre los planetas|Une locomotive à vapeur circulait entre les planètes|惑星のあいだを蒸気機関車が走っていました",
    ),
    highlights: [
      t(
        "On the Solar System board your piece is now a probe with solar panels and a dish, not a steam locomotive. The water texture has been taken out of space as well.|En el tablero del Sistema Solar tu ficha es ahora una sonda con paneles solares y antena, no una locomotora de vapor. También se ha quitado del espacio la textura de agua.|Sur le plateau du Système solaire, votre pion est désormais une sonde à panneaux solaires et antenne, non une locomotive à vapeur. La texture d'eau a également disparu de l'espace.|太陽系の盤面では、駒が蒸気機関車ではなく、太陽電池のパドルとパラボラを持つ探査機になりました。宇宙に出ていた水面の模様も消しました。",
      ),
    ],
  },
  {
    version: "0.41.0",
    date: "2026-08-14",
    title: t(
      "Two boards that are not countries: the Solar System and Japan's Hundred Mountains|Dos tableros que no son países: el Sistema Solar y las Cien Montañas de Japón|Deux plateaux qui ne sont pas des pays : le Système solaire et les Cent Montagnes du Japon|国ではない盤面が2枚。太陽系と、日本百名山",
    ),
    highlights: [
      t(
        "The Solar System board treats space as the sea and each body as an island, so the line between planets is a ship's route — a probe's trajectory. Forty bodies from the Sun to the Oort Cloud, spaced by the logarithm of their distance, because at true scale the inner planets collapse into a single dot. The Oort Cloud does not fit even so, and the board says so.|El tablero del Sistema Solar trata el espacio como el mar y cada cuerpo como una isla, de modo que la línea entre planetas es una ruta marítima: la trayectoria de una sonda. Cuarenta cuerpos del Sol a la nube de Oort, espaciados por el logaritmo de su distancia, porque a escala real los planetas interiores se reducen a un punto. La nube de Oort no cabe ni así, y el tablero lo dice.|Le plateau du Système solaire traite l'espace comme la mer et chaque corps comme une île : la ligne entre deux planètes est donc une route maritime — la trajectoire d'une sonde. Quarante corps du Soleil au nuage d'Oort, espacés selon le logarithme de leur distance, car à l'échelle réelle les planètes intérieures se réduisent à un point. Le nuage d'Oort n'entre pas même ainsi, et le plateau le dit.|太陽系の盤面は、宇宙を「海」、天体を「島」として作りました。惑星のあいだの線は航路——探査機の軌道です。太陽からオールトの雲まで40天体を、距離の対数で並べています。実際の距離で並べると内側の惑星が1点に潰れてしまうためです。それでもオールトの雲は盤面に収まりません。そのことも盤面に書いてあります。",
      ),
      t(
        "The Hundred Mountains board turns Fukada Kyūya's hundred peaks into a hundred stops. A third of them crowd into the Japan Alps, close enough that the map cannot name them all at once — but the ridge lines between them are real, and so is the gap: not one of the hundred stands in western Honshū, so no train can round the Inland Sea.|El tablero de las Cien Montañas convierte las cien cumbres de Fukada Kyūya en cien paradas. Un tercio se agolpa en los Alpes japoneses, tan juntas que el mapa no puede nombrarlas todas a la vez, pero las crestas que las unen son reales, y también lo es el vacío: ninguna de las cien está en el oeste de Honshū.|Le plateau des Cent Montagnes fait des cent sommets de Fukada Kyūya cent arrêts. Un tiers se presse dans les Alpes japonaises, si serrées que la carte ne peut toutes les nommer à la fois — mais les crêtes qui les relient sont réelles, et le vide aussi : aucune des cent ne se dresse dans l'ouest de Honshū.|日本百名山の盤面は、深田久弥の選んだ100座をそのまま100の止まり場所にしました。3分の1が日本アルプスに集まっていて、俯瞰では名前を全部は出せないほど近いのですが、そのあいだをつなぐ縦走路は実在します。抜けているところも実在します——100座のうち1座も中国地方より西の本州にありません。",
      ),
      t(
        "The board picker now has a button under the map for boards that cannot be pinned to a place on Earth, and the Americas are split into North and South.|El selector de tableros tiene ahora un botón bajo el mapa para los tableros que no pueden fijarse a un punto de la Tierra, y América se divide en Norte y Sur.|Le sélecteur de plateaux propose désormais un bouton sous la carte pour ceux qu'on ne peut pas épingler sur Terre, et les Amériques sont séparées en Nord et Sud.|地球の上に置けない盤面のために、地図の下にボタンを付けました。アメリカ大陸は北と南に分かれました。",
      ),
    ],
  },
  {
    version: "0.40.0",
    date: "2026-08-13",
    title: t(
      "Five more boards: Brazil, Venezuela, Australia, Canada, Ukraine|Cinco tableros más: Brasil, Venezuela, Australia, Canadá y Ucrania|Cinq plateaux de plus : Brésil, Venezuela, Australie, Canada, Ukraine|盤面が5枚ふえました。ブラジル・ベネズエラ・オーストラリア・カナダ・ウクライナ",
    ),
    highlights: [
      t(
        "Twenty-four boards now, with one thousand and eighty-three towns and nine hundred and thirty-four questions. Ride the Indian Pacific across the Nullarbor, follow the line the Canadian Pacific was built to make a country, cross Brazil where the railways mostly went quiet, take the ferry to Margarita Island, and travel a Ukraine that keeps its timetable.|Ya son veinticuatro tableros, con mil ochenta y tres pueblos y novecientas treinta y cuatro preguntas. Cruza el Nullarbor en el Indian Pacific, sigue la línea que el Canadian Pacific tendió para hacer un país, recorre un Brasil donde los trenes casi callaron, toma el ferry a la isla Margarita y viaja por una Ucrania que mantiene su horario.|Vingt-quatre plateaux désormais, mille quatre-vingt-trois villes et neuf cent trente-quatre questions. Traverse le Nullarbor à bord de l'Indian Pacific, suis la ligne que le Canadien Pacifique a posée pour faire un pays, parcours un Brésil où les trains se sont tus, prends le bac pour l'île de Margarita, et voyage dans une Ukraine qui tient son horaire.|24枚になりました。1083の町と934問です。ナラボー平原を横切るインディアン・パシフィック号、国をつくるために敷かれたカナディアン・パシフィック鉄道、鉄道がほとんど黙ってしまったブラジル、マルガリータ島への渡し船、そして時刻表を守り続けるウクライナの鉄道。",
      ),
      t(
        "Each board keeps its own money, music, items, spirit of misfortune, and twelve months of weather and festivals. Venezuela prices its property in US dollars, because that is how homes there are actually bought. Ukraine's board leaves the occupied and shelled towns off the route, and draws Crimea as the land it is recognised to be.|Cada tablero conserva su dinero, su música, sus objetos, su espíritu de la desgracia y sus doce meses. Venezuela pone precio a sus inmuebles en dólares, porque así se compran allí las casas. El tablero de Ucrania deja fuera del recorrido los pueblos ocupados y bombardeados, y dibuja Crimea como el territorio que se le reconoce.|Chaque plateau garde sa monnaie, sa musique, ses objets, son esprit du malheur et ses douze mois. Le Venezuela affiche ses biens en dollars, car c'est ainsi qu'on y achète une maison. Le plateau ukrainien laisse hors du parcours les villes occupées et bombardées, et dessine la Crimée comme le territoire qu'on lui reconnaît.|盤面ごとにお金・音楽・アイテム・厄災の神・12ヶ月の気候と祭りを持っています。ベネズエラの物件は米ドル建てです。実際にそうやって家が売り買いされているからです。ウクライナの盤面は、占領されている町と砲撃の続く町を止まりマスにしていません。クリミアは国際的に認められたとおりの陸地として描いています。",
      ),
      t(
        "Twenty city backgrounds that had a see-through gap between sky and ground — most of them in Indonesia — have been repaired.|Se han reparado veinte fondos de ciudad que dejaban ver un hueco entre el cielo y el suelo, la mayoría en Indonesia.|Vingt décors de ville laissaient voir un vide entre le ciel et le sol — surtout en Indonésie — et ont été réparés.|都市の背景20枚で、空と地面のあいだが透けていたのを直しました(多くはインドネシアの町です)。",
      ),
    ],
  },
  {
    version: "0.39.0",
    date: "2026-08-13",
    title: t(
      "Pick a region, then a board|Elige una región y luego un tablero|Choisis une région, puis un plateau|大陸をえらんでから、行き先をえらぶ",
    ),
    highlights: [
      t(
        "The map now asks for a region first. Tap Asia, Europe, Africa or the Americas and the map moves in, writing each board's name across its own country — tap the name to ride there. With nineteen boards on one world map the marks were closer together than a fingertip; a region at a time leaves room to read them.|El mapa pide primero una región. Toca Asia, Europa, África o América y el mapa se acerca, escribiendo el nombre de cada tablero sobre su país: toca el nombre para viajar allí. Con diecinueve tableros en un solo mapamundi las marcas quedaban más juntas que un dedo; de región en región hay sitio para leerlas.|La carte demande d'abord une région. Touche l'Asie, l'Europe, l'Afrique ou les Amériques et la carte s'approche, en inscrivant le nom de chaque plateau sur son pays — touche le nom pour y partir. Avec dix-neuf plateaux sur une seule carte du monde, les marques étaient plus serrées qu'un doigt ; une région à la fois laisse la place de les lire.|地図はまず大陸をたずねます。アジア・ヨーロッパ・アフリカ・アメリカ大陸のどれかを押すと地図がそこへ寄り、それぞれの盤面の名前がその国の上に書かれます。名前を押すとその盤面へ。19枚を1枚の世界地図に載せると、印の間隔が指より狭くなっていました。大陸ごとなら名前を読む余地があります。",
      ),
      t(
        "Boards that live inside another board now have their own step. Tapping Japan moves in to Japan's own map, where Japan and Ibaraki sit side by side — the same for Indonesia and Bali. Around the World keeps its button under the map, because a whole planet cannot be pointed at with one mark.|Los tableros que viven dentro de otro tienen ahora su propio paso. Al tocar Japón se entra en el mapa de Japón, donde Japón e Ibaraki aparecen juntos; lo mismo con Indonesia y Bali. La vuelta al mundo conserva su botón bajo el mapa, porque un planeta entero no se señala con una sola marca.|Les plateaux contenus dans un autre ont désormais leur propre étape. Toucher le Japon ouvre la carte du Japon, où le Japon et Ibaraki figurent côte à côte — de même pour l'Indonésie et Bali. Le tour du monde garde son bouton sous la carte : on ne montre pas une planète entière d'un seul point.|中に入っている盤面には、もう一段が付きました。日本を押すと日本自身の地図へ寄り、日本と茨城県が並びます。インドネシアとバリ島も同じです。世界一周は1点で指せないので、これまでどおり地図の下のボタンのままです。",
      ),
    ],
  },
  {
    version: "0.38.0",
    date: "2026-08-13",
    title: t(
      "Pick your board from the world map|Elige tu tablero en el mapamundi|Choisis ton plateau sur la carte du monde|行き先を世界地図から選べます",
    ),
    highlights: [
      t(
        "The board list is now a world map. Every board sits where it belongs, so you can see that Bali is a dot beside Java and that Russia stretches across a third of the map. Tap a mark to choose it; the whole-world board has its own button under the map.|La lista de tableros es ahora un mapamundi. Cada tablero está donde le corresponde, así que se ve que Bali es un punto junto a Java y que Rusia ocupa un tercio del mapa. Toca una marca para elegirla; el tablero de la vuelta al mundo tiene su botón bajo el mapa.|La liste des plateaux est devenue une carte du monde. Chaque plateau est à sa place : on voit que Bali n'est qu'un point à côté de Java et que la Russie occupe un tiers de la carte. Touche une marque pour la choisir ; le tour du monde a son propre bouton sous la carte.|盤面の一覧が世界地図になりました。それぞれの盤面が本当の場所に置かれているので、バリがジャワの隣の点でしかないことも、ロシアが地図の3分の1に伸びていることも見て分かります。印を押すと選べます。世界一周は1点で指せないので、地図の下のボタンにしました。",
      ),
      t(
        "Marks that would overlap are nudged apart, with a thin line back to the true spot. Filter by region and the names appear beside each mark. On a phone the map is too small to tap accurately, so the card list is used there instead.|Las marcas que se solaparían se separan un poco, con una línea fina hasta su lugar real. Filtra por región y aparecen los nombres junto a cada marca. En el móvil el mapa es demasiado pequeño para acertar, así que allí se usa la lista de fichas.|Les marques qui se chevaucheraient sont écartées, avec un fil vers leur vraie position. Filtre par région et les noms s'affichent à côté de chaque marque. Sur téléphone la carte est trop petite pour viser juste : la liste de cartes y est conservée.|重なってしまう印は少しずらし、本当の位置へ細い線を引いています。地域で絞ると、印の横に名前が出ます。携帯では地図が小さすぎて押し分けられないので、そちらは今までの札の一覧のままです。",
      ),
    ],
  },
  {
    version: "0.37.0",
    date: "2026-08-13",
    title: t(
      "Nineteen boards|Diecinueve tableros|Dix-neuf plateaux|盤面が19枚になりました",
    ),
    highlights: [
      t(
        "Seven new boards join the twelve: Russia along the Trans-Siberian, the United States coast to coast, Indonesia across seventeen thousand islands, Morocco from the Atlantic to the dunes, Ghana from the forts to the northern savanna, Bali on its own, and Malaysia across the South China Sea. Eight hundred and eighty-two towns, one thousand one hundred and twenty-two lines, seven hundred and fifty-six questions.|Siete tableros nuevos se suman a los doce: Rusia por el Transiberiano, Estados Unidos de costa a costa, Indonesia entre diecisiete mil islas, Marruecos del Atlántico a las dunas, Ghana de los fuertes a la sabana, Bali sola y Malasia a ambos lados del mar de China Meridional. Ochocientos ochenta y dos pueblos, mil ciento veintidós líneas, setecientas cincuenta y seis preguntas.|Sept nouveaux plateaux rejoignent les douze : la Russie le long du Transsibérien, les États-Unis d'une côte à l'autre, l'Indonésie parmi dix-sept mille îles, le Maroc de l'Atlantique aux dunes, le Ghana des forts à la savane, Bali seule, et la Malaisie de part et d'autre de la mer de Chine méridionale. Huit cent quatre-vingt-deux villes, mille cent vingt-deux lignes, sept cent cinquante-six questions.|12枚に7枚が加わりました。シベリア鉄道を行くロシア、海から海へ渡るアメリカ、1万7千の島をつなぐインドネシア、大西洋から砂丘までのモロッコ、砦から北のサバンナまでのガーナ、島ひとつのバリ、南シナ海をまたぐマレーシア。882の町、1122の路線、756問。",
      ),
      t(
        "Each board keeps its own money, music, items, spirit of misfortune, and twelve months of weather and festivals. A ferry crosses Lake Volta where the old town lies under the water. The Trans-Siberian runs its real stops. Kete Krachi, Salerno, Purwokerto and Jerada were added because a line was crossing water it should not — and each turned out to have a story worth the stop.|Cada tablero conserva su dinero, su música, sus objetos, su espíritu de la desgracia y sus doce meses. Un transbordador cruza el lago Volta, donde el pueblo viejo yace bajo el agua. El Transiberiano sigue sus paradas reales. Kete Krachi, Salerno, Purwokerto y Jerada se añadieron porque una línea cruzaba agua que no debía, y todas resultaron merecer la parada.|Chaque plateau garde sa monnaie, sa musique, ses objets, son esprit du malheur et ses douze mois. Un bac traverse le lac Volta, où l'ancienne ville repose sous l'eau. Le Transsibérien suit ses arrêts réels. Kete Krachi, Salerne, Purwokerto et Jerada ont été ajoutées parce qu'une ligne traversait de l'eau à tort — et chacune méritait l'arrêt.|盤面ごとにお金・音楽・アイテム・厄災の神・12ヶ月の気候と祭りを持っています。ボルタ湖には渡し船が通り、その湖底には旧市街が沈んでいます。シベリア鉄道は実在の停車順で走ります。ケテ・クラチ、サレルノ、プルウォクルト、ジェラダは「線が通ってはいけない水の上を通っていた」ために足した町ですが、どれも降りる価値のある話を持っていました。",
      ),
    ],
  },
  {
    version: "0.36.0",
    date: "2026-08-12",
    title: t(
      "The game is now called World Express|El juego se llama ahora World Express|Le jeu s'appelle désormais World Express|ゲームの名前を World Express にしました",
    ),
    highlights: [
      t(
        "It began on the Bolivian altiplano and carried that name for a while. There are twelve boards now, on five continents, and the old name only described the first one. The new name says what the game is.|Empezó en el altiplano boliviano y llevó ese nombre un tiempo. Ahora hay doce tableros en cinco continentes, y el nombre antiguo solo describía el primero. El nuevo dice lo que es el juego.|Le jeu est né sur l'altiplano bolivien et en a longtemps porté le nom. Il compte aujourd'hui douze plateaux sur cinq continents, et l'ancien nom ne décrivait que le premier. Le nouveau dit ce qu'est le jeu.|このゲームはボリビアのアルティプラーノで生まれ、しばらくその名前で来ました。いまは5つの大陸に12の盤面があり、古い名前は最初の1枚しか表していません。新しい名前は、このゲームが何なのかを言っています。",
      ),
    ],
  },
  {
    version: "0.35.0",
    date: "2026-08-12",
    title: t(
      "Five more boards: Turkey, Germany, China, the United Kingdom and Italy|Cinco tableros más: Turquía, Alemania, China, el Reino Unido e Italia|Cinq plateaux de plus : Turquie, Allemagne, Chine, Royaume-Uni et Italie|盤面が5つ増えました。トルコ・ドイツ・中国・イギリス・イタリア",
    ),
    highlights: [
      t(
        "Two hundred and twenty-six towns, joined by two hundred and ninety-eight lines, with two hundred and thirteen new questions between them. Istanbul to Kars on the eastern express, Beijing to Lhasa on the line that climbs the plateau, Sylt and Rügen by the causeways the trains actually cross, Holyhead to Belfast by ferry, and ships from Naples and Genoa to Sicily and Sardinia.|Doscientos veintiséis pueblos unidos por doscientas noventa y ocho líneas, con doscientas trece preguntas nuevas. De Estambul a Kars en el expreso de oriente, de Pekín a Lhasa por la línea que sube a la meseta, a Sylt y Rügen por los diques que cruzan los trenes de verdad, de Holyhead a Belfast en ferry, y barcos desde Nápoles y Génova a Sicilia y Cerdeña.|Deux cent vingt-six villes reliées par deux cent quatre-vingt-dix-huit lignes, avec deux cent treize nouvelles questions. D'Istanbul à Kars par l'express de l'est, de Pékin à Lhassa par la ligne qui grimpe sur le plateau, vers Sylt et Rügen par les digues que les trains empruntent vraiment, de Holyhead à Belfast en ferry, et des navires de Naples et Gênes vers la Sicile et la Sardaigne.|226の町を298本の路線でつなぎ、クイズは213問増えました。イスタンブールからカルスへ東方急行の筋で、北京からラサへ高原を登る線で、ジュルト島とリューゲン島へは列車が実際に渡る堤防で、ホーリーヘッドからベルファストへは船で。ナポリとジェノヴァからはシチリアとサルデーニャへ渡ります。",
      ),
      t(
        "Each board keeps its own music, its own nine items, its own spirit of misfortune and its own twelve months of weather and festivals — Chungcheong takes the slowest tempo in Korea, the Karakoncolos walks the cold nights of February in Turkey, and the Monacello of Naples pays you back in treasure if you steal his red cap.|Cada tablero conserva su música, sus nueve objetos, su propio espíritu de la desgracia y sus doce meses de clima y fiestas: Chungcheong lleva el tempo más lento de Corea, el Karakoncolos recorre las noches frías de febrero en Turquía, y el Monacello de Nápoles te paga con tesoros si le robas el gorro rojo.|Chaque plateau garde sa musique, ses neuf objets, son propre esprit du malheur et ses douze mois de climat et de fêtes : le Chungcheong prend le tempo le plus lent de Corée, le Karakoncolos parcourt les nuits froides de février en Turquie, et le Monacello de Naples vous paie en trésors si vous lui volez son bonnet rouge.|盤面ごとに音楽・9つのアイテム・厄災の神・12ヶ月の気候と祭りを持っています。韓国では忠清道がいちばんゆっくりした調子で鳴り、トルコでは2月の寒い夜をカラコンジョロスが歩き、ナポリのモナチェッロは赤い帽子を盗まれると財宝で償います。",
      ),
      t(
        "Where a map cuts a name off at the edge of the board, the name now moves to where it fits — Kashgar had been showing as “ashgar”, and Çeşme as “eşme”.|Cuando un mapa cortaba un nombre en el borde del tablero, el nombre se desplaza ahora a donde cabe: Kashgar aparecía como «ashgar» y Çeşme como «eşme».|Lorsqu'une carte coupait un nom au bord du plateau, le nom se déplace désormais là où il tient : Kashgar s'affichait « ashgar » et Çeşme « eşme ».|地図の端で名前が切れていたところは、収まる場所へ動くようにしました。カシュガルが「ashgar」、チェシメが「eşme」としか出ていませんでした。",
      ),
    ],
  },
  {
    version: "0.34.0",
    date: "2026-08-12",
    title: t(
      "A new board: Korea|Un tablero nuevo: Corea|Un nouveau plateau : la Corée|新しい盤面「韓国」",
    ),
    highlights: [
      t(
        "Forty towns from Seoul down to Seogwipo, joined by fifty-five lines along the KTX routes, with ships out to Jeju and to Ulleungdo in the East Sea. Thirty-seven questions, nineteen things that can happen when you stop, and music that follows the regional modes rather than the Japanese scales — the slowest tempo of the six regions belongs to Chungcheong, which has a long-standing reputation for taking its time.|Cuarenta pueblos, de Seúl a Seogwipo, unidos por cincuenta y cinco líneas siguiendo el KTX, con barcos a Jeju y a Ulleungdo. Treinta y siete preguntas, diecinueve sucesos y música basada en los modos coreanos; el tempo más lento de las seis regiones es el de Chungcheong, célebre por tomarse su tiempo.|Quarante villes, de Séoul à Seogwipo, reliées par cinquante-cinq lignes suivant le KTX, avec des navires vers Jeju et Ulleungdo. Trente-sept questions, dix-neuf événements et une musique fondée sur les modes coréens ; le tempo le plus lent des six régions est celui du Chungcheong, réputé prendre son temps.|ソウルから西帰浦まで40の町を、KTXの筋に沿った55本の路線でつなぎました。済州島と、東海の欝陵島へは船で渡ります。クイズ37問、止まったときに起こることが19種類。音楽は日本の音階ではなく韓国のトリ(調)を使っています。6つの地方でいちばん遅いのは忠清道です(のんびりしていることで知られる土地柄から)。",
      ),
      t(
        "With more boards to choose from, the picker now filters by region and the cards are smaller, so the travellers and house rules no longer get pushed off the screen. Each card carries a tag for how much ground it covers — a whole world, a country, or somewhere closer in.|Con más tableros donde elegir, el selector filtra por región y las tarjetas son más pequeñas, de modo que los viajeros y las reglas ya no quedan fuera de la pantalla. Cada tarjeta indica cuánto terreno abarca: el mundo entero, un país o algo más cercano.|Avec davantage de plateaux, le sélecteur filtre par région et les vignettes sont plus petites : les voyageurs et les règles ne sont plus repoussés hors de l'écran. Chaque vignette indique l'étendue parcourue — le monde, un pays, ou quelque chose de plus proche.|盤面が増えたので、選ぶところを地域で絞れるようにし、札を小さくしました。旅人と決まりごとが画面の外へ押し出されなくなります。札の肩には、走る広さ(世界・国・地方)を出しています。",
      ),
    ],
  },
  {
    version: "0.33.0",
    date: "2026-08-12",
    title: t(
      "Four ships now sail where ships can sail|Cuatro barcos navegan ahora por donde se puede navegar|Quatre navires empruntent enfin des routes navigables|4本の船が、船の通れるところを通るようになりました",
    ),
    highlights: [
      t(
        "The last of the crossings that ran overland have been re-routed to ports that face the right sea. Marrakesh now sails to Lisbon rather than Barcelona, which had meant crossing Spain; Cairo meets Athens rather than Rome; Singapore meets Kolkata across the Bay of Bengal; and the run up to Dwarka starts from Goa, since no route from Mumbai could get round the Kathiawar peninsula.|Las últimas travesías que iban por tierra se han redirigido a puertos que dan al mar correcto. Marrakech navega ahora a Lisboa y no a Barcelona, lo que suponía cruzar España; El Cairo enlaza con Atenas en vez de Roma; Singapur con Calcuta por el golfo de Bengala; y la subida a Dwarka parte de Goa, porque desde Bombay no había forma de rodear la península de Kathiawar.|Les dernières traversées qui passaient par voie de terre ont été redirigées vers des ports donnant sur la bonne mer. Marrakech rejoint désormais Lisbonne et non Barcelone, ce qui imposait de traverser l'Espagne ; Le Caire rejoint Athènes plutôt que Rome ; Singapour rejoint Calcutta par le golfe du Bengale ; et la remontée vers Dwarka part de Goa, faute de pouvoir contourner la péninsule de Kathiawar depuis Bombay.|陸を走っていた航路の残りを、正しい海に面した港へつなぎ替えました。マラケシュはバルセロナではなくリスボンへ渡ります(バルセロナ発だとスペインを縦断していました)。カイロはローマではなくアテネへ。シンガポールはベンガル湾を越えてカルカッタへ。ドワルカへの船はゴアから出ます。ムンバイからでは、どう引いてもカティアワール半島を横切ってしまうためです。",
      ),
      t(
        "Seven crossings are kept as they are, each with its reason written down: the train under the Tsugaru Strait, the railway down the Malay peninsula, and five long ocean routes that merely graze a cape — real ships pass the same way. They are listed separately from the faults now, so the next person to look does not undo a decision that was already made.|Siete travesías se conservan tal cual, cada una con su motivo anotado: el tren bajo el estrecho de Tsugaru, el ferrocarril de la península malaya y cinco rutas oceánicas largas que apenas rozan un cabo, por donde pasan los barcos de verdad. Ahora figuran aparte de los fallos, para que quien mire después no deshaga una decisión ya tomada.|Sept traversées sont conservées telles quelles, chacune avec sa raison consignée : le train sous le détroit de Tsugaru, la voie ferrée de la péninsule malaise et cinq longues routes océaniques qui ne font qu'effleurer un cap — les vrais navires passent de même. Elles sont désormais listées à part des défauts, pour que le prochain regard ne défasse pas une décision déjà prise.|7本はそのまま残しました。理由も一本ずつ書いてあります。津軽海峡の下を通る列車、マレー半島を下る鉄道、そして岬をかすめるだけの長い航路が5本。実際の船も同じところを通ります。不具合とは別枠で並べてあるので、次に見た人が決着済みの判断をやり直さずに済みます。",
      ),
    ],
  },
  {
    version: "0.32.0",
    date: "2026-08-12",
    title: t(
      "Ships have stopped sailing over land|Los barcos han dejado de navegar por tierra|Les navires ont cessé de naviguer sur la terre ferme|船が陸を走るのをやめました",
    ),
    highlights: [
      t(
        "On the world map, twenty-five shipping lines ran across dry land — one sailed the whole width of Angola, another straight over Spain. Sixteen of them are fixed. Most only needed the bend in the line moved to the other end; two were never sea voyages at all and are now railways, including the run from Kolkata to Bangkok, which had been sailing over Myanmar.|En el mapa mundial, veinticinco líneas marítimas cruzaban tierra firme: una navegaba a lo ancho de Angola, otra por encima de España. Dieciséis están corregidas. A la mayoría le bastó mover el codo de la línea al otro extremo; dos nunca fueron travesías marítimas y ahora son ferrocarriles, como el trayecto de Calcuta a Bangkok, que navegaba sobre Birmania.|Sur la carte du monde, vingt-cinq lignes maritimes traversaient la terre ferme — l'une naviguait sur toute la largeur de l'Angola, une autre par-dessus l'Espagne. Seize sont corrigées. La plupart n'avaient besoin que d'un coude déplacé à l'autre bout ; deux n'étaient pas des traversées maritimes et sont devenues des voies ferrées, dont Calcutta–Bangkok, qui naviguait au-dessus de la Birmanie.|世界地図で、25本の航路が陸の上を走っていました。1本はアンゴラを丸ごと横断し、別の1本はスペインを突っ切っていました。16本を直しました。多くは線の折れ方を反対側に移すだけで済み、2本はそもそも航路ではなかったので鉄道にしました。カルカッタ—バンコクはミャンマーの上を航行していたものです。",
      ),
      t(
        "Japan and India had the same trouble in the other direction, with lines drawn out to sea. Those are fixed too. A few crossings are left alone on purpose: the train between Hakodate and Aomori really does run under the strait, and the line down the Malay peninsula really is a railway — there the coastline is what is coarse, not the route.|Japón y la India tenían el problema inverso, con líneas trazadas mar adentro. También están corregidas. Algunos cruces se dejan a propósito: el tren entre Hakodate y Aomori pasa de verdad bajo el estrecho, y la línea de la península malaya es un ferrocarril real; ahí lo impreciso es la costa, no la ruta.|Le Japon et l'Inde avaient le problème inverse, avec des lignes tracées en pleine mer. Elles sont corrigées aussi. Quelques traversées sont laissées telles quelles à dessein : le train entre Hakodate et Aomori passe bel et bien sous le détroit, et la ligne de la péninsule malaise est un vrai chemin de fer — c'est le littoral qui est grossier, pas le tracé.|日本とインドでは逆に、線路が海の上に出ていました。こちらも直しました。わざと残したものもあります。函館—青森の列車は本当に海の下を通りますし、マレー半島を下る線も実在の鉄道です。粗いのは経路ではなく海岸線のほうなので、触っていません。",
      ),
    ],
  },
  {
    version: "0.31.0",
    date: "2026-08-11",
    title: t(
      "You can cross the Pacific at last|Por fin se puede cruzar el Pacífico|On peut enfin traverser le Pacifique|太平洋が渡れるようになりました",
    ),
    highlights: [
      t(
        "To get from Tokyo to San Francisco you had to sail the other way round the world, through Europe and the Atlantic. A ship now runs from Suva to Papeete, and the crossing takes twenty-four squares instead of the long way about.|Para ir de Tokio a San Francisco había que dar la vuelta al mundo por Europa y el Atlántico. Ahora hay un barco de Suva a Papeete, y la travesía son veinticuatro casillas en lugar del rodeo.|Pour aller de Tokyo à San Francisco, il fallait faire le tour du monde par l'Europe et l'Atlantique. Un navire relie désormais Suva à Papeete : la traversée fait vingt-quatre cases au lieu du long détour.|東京からサンフランシスコへ行くのに、ヨーロッパと大西洋を通って地球を反対に回るしかありませんでした。スバとパペーテのあいだに船を通しました。24マスで着きます。",
      ),
      t(
        "The world map is cut at the date line, so the Pacific sits split between the two edges of the board. The new route is drawn the way a globe would have it: the line leaves the eastern edge and comes back in from the west, with the far port named at each end, and your train crosses in a single step instead of sliding back across Africa.|El mapa está cortado por la línea de cambio de fecha, así que el Pacífico queda partido entre los dos bordes del tablero. La nueva ruta se dibuja como en un globo terráqueo: la línea sale por el este y vuelve por el oeste, con el puerto lejano indicado en cada extremo, y el tren cruza de un paso en vez de deslizarse de vuelta sobre África.|La carte est coupée à la ligne de changement de date : le Pacifique se retrouve partagé entre les deux bords du plateau. La nouvelle ligne est tracée comme sur un globe : elle sort par l'est et revient par l'ouest, le port lointain étant nommé à chaque extrémité, et le train traverse d'un seul pas au lieu de reglisser au-dessus de l'Afrique.|世界地図は日付変更線で切ってあるので、太平洋は盤面の左右に分かれています。新しい航路は地球儀のとおりに描きました。線は右端から出て左端から入り、それぞれの端に向こうの港の名前を添えてあります。列車は一歩で渡ります(アフリカの上を滑って戻ったりしません)。",
      ),
    ],
  },
  {
    version: "0.30.0",
    date: "2026-08-11",
    title: t(
      "The spirit rides with you now|El espíritu ahora viaja contigo|L'esprit voyage désormais avec vous|厄災の神が、列車に乗って追いかけてきます",
    ),
    highlights: [
      t(
        "El Tío, the Binbōgami, the Flying Dutchman — whichever spirit your board keeps, it only ever showed up as a mark beside a name in the traveller list. Now it rides on the roof of the train it has chosen, and you can see across the map who is carrying it. Its ring is in that traveller's colour, so there is no mistaking whose luck is about to turn.|El Tío, el Binbōgami, el Holandés Errante: el espíritu de cada tablero solo aparecía como una marca junto a un nombre en la lista de viajeros. Ahora viaja en el techo del tren que ha elegido y se ve desde cualquier punto del mapa quién lo lleva. Su aro tiene el color de ese viajero, así que no hay confusión posible.|El Tío, le Binbōgami, le Hollandais volant : l'esprit de chaque plateau n'apparaissait que sous forme d'une marque à côté d'un nom dans la liste des voyageurs. Il voyage désormais sur le toit du train qu'il a choisi, et l'on voit d'un coup d'œil qui le porte. Son cercle reprend la couleur de ce voyageur : aucun doute possible.|エル・ティーオ、貧乏神、さまよえるオランダ人。盤面ごとの厄災の神は、旅人一覧に絵文字が付くだけで、地図を見ているあいだは誰に憑いているのか分かりませんでした。憑いた列車の屋根に乗って、一緒に走るようにしました。輪の色はその旅人の色なので、誰が背負っているのか見間違えません。",
      ),
      t(
        "Two towns close together were joined by a bare line with nothing between them, and a single roll could carry you across three of them. Around the world, thirty-six of the ninety-six lines were like that, and you could shuttle between Amsterdam and Paris to burn off a roll. Every line has at least one square again.|Dos ciudades cercanas se unían con una línea sin nada en medio, y una sola tirada podía llevarte por tres de ellas. En la vuelta al mundo, treinta y seis de las noventa y seis líneas eran así, y se podía ir y volver entre Ámsterdam y París para gastar la tirada. Cada línea vuelve a tener al menos una casilla.|Deux villes proches étaient reliées par un trait sans rien entre elles, et un seul jet pouvait vous en faire traverser trois. Sur le tour du monde, trente-six des quatre-vingt-seize lignes étaient ainsi, et l'on pouvait faire l'aller-retour Amsterdam–Paris pour épuiser un jet. Chaque ligne a de nouveau au moins une case.|近い町どうしが、あいだに何も無い線で直につながっていました。1回の出目で3つの町を通り過ぎることができ、世界一周では96本のうち36本がこの状態でした。アムステルダムとパリを往復して歩数を使い切る、といった動きもできてしまいます。どの路線にも必ず1マス以上を置くように戻しました。",
      ),
    ],
  },
  {
    version: "0.29.0",
    date: "2026-08-11",
    title: t(
      "You are buying property now, not souvenirs|Ahora compras propiedades, no recuerdos|Vous achetez désormais des biens, pas des souvenirs|買うものが、お土産から不動産になりました",
    ),
    highlights: [
      t(
        "A journey used to start with about the price of a good camera. It now starts with twelve million yen in Japan — the sort of money that buys a building, which is what the town shops were always selling. Every board is scaled to match; the play itself is unchanged.|Un viaje empezaba con lo que cuesta una buena cámara. Ahora empieza con doce millones de yenes en Japón: dinero para comprar un edificio, que es lo que las tiendas vendían desde el principio. Todos los tableros están a escala; el juego no cambia.|Un voyage commençait avec le prix d\'un bon appareil photo. Il commence désormais avec douze millions de yens au Japon — de quoi acheter un immeuble, ce que les boutiques vendaient depuis le début. Tous les plateaux suivent ; le jeu lui-même ne change pas.|旅の始まりが、カメラ1台ぶんの金額でした。日本では1200万円から始まります。町で売っているのは建物なので、それに見合う桁にしました。6つの盤面すべてを同じ考えで揃えています。遊びの計算そのものは変わりません。",
      ),
      t(
        "Some boards had nothing worth saving up for: on Ibaraki the dearest business cost barely more than the cheapest. Each board now has something that takes a year to afford — the space centre at Tsukuba, the lithium works on the Uyuni salt flat — and every business returns the same rate, so a big one costs more without paying better.|Algunos tableros no tenían nada por lo que ahorrar: en Ibaraki el negocio más caro apenas superaba al más barato. Ahora cada tablero tiene algo que cuesta un año de ahorro, y todos rinden lo mismo: lo grande cuesta más sin rendir más.|Certains plateaux n\'offraient rien qui vaille d\'économiser : en Ibaraki, l\'affaire la plus chère dépassait à peine la moins chère. Chaque plateau a maintenant un bien qui demande une année d\'économies, et tous rapportent au même taux.|貯める甲斐のあるものが無い盤面がありました。茨城は、いちばん高い物件がいちばん安いものとほとんど変わりません。どの盤面にも、1年ぶん貯めないと買えないものを置きました。筑波の宇宙センター、ウユニ塩湖のリチウム工場。利回りはどれも同じなので、高いものは「効率が良い」のではなく、まとまった金が要るという重みになります。",
      ),
      t(
        "A roll of one could light up squares that looked two apart. The board was right — but a square on a short line was drawn a tenth of the length of a square on a long one, so the eye was being told something the rules did not mean. Spacing is now even.|Un uno podía iluminar casillas que parecían estar a dos. El tablero acertaba, pero una casilla en un tramo corto se dibujaba diez veces más pequeña que en uno largo. Ahora el espaciado es parejo.|Un « un » pouvait éclairer des cases qui semblaient à deux pas. Le plateau avait raison, mais une case sur un tronçon court était dessinée dix fois plus petite que sur un long. L\'espacement est désormais régulier.|出目が1なのに、2マス先に見えるマスが光ることがありました。盤面の判定は正しく、短い路線の1マスが長い路線の1マスの10分の1の長さで描かれていたためです。目に見えるものと規則が食い違っていました。間隔を揃えました。",
      ),
      t(
        "Saving mid-game could leave the other travellers frozen: the \u201Csaved\u201D notice closed over whatever was open, and some of those windows were what set the next turn going. Saving no longer interrupts anything.|Guardar a media partida podía dejar congelados a los demás viajeros: el aviso de guardado tapaba lo que hubiera abierto, y algunas de esas ventanas eran las que ponían en marcha el turno siguiente. Guardar ya no interrumpe nada.|Sauvegarder en cours de partie pouvait figer les autres voyageurs : l\'avis de sauvegarde recouvrait ce qui était ouvert, or certaines de ces fenêtres lançaient le tour suivant. La sauvegarde n\'interrompt plus rien.|途中で保存すると、他の旅人が動かなくなることがありました。「保存しました」の知らせが、開いていた画面を上書きしてしまい、その画面を閉じることが次の手番を始める合図だったためです。保存しても何も止まらなくなりました。",
      ),
      t(
        "Each computer traveller has its own strength now, so you can face a gentle one and a merciless one in the same game. And the round-the-world map has weather in it — taiga, desert, tropics — with the oceans and regions named.|Cada viajero de la máquina tiene ahora su propia fuerza, así que puedes enfrentarte a uno suave y a otro implacable en la misma partida. Y el mapa mundial tiene clima: taiga, desierto, trópicos, con océanos y regiones nombrados.|Chaque voyageur de la machine a désormais sa propre force : on peut affronter un adversaire clément et un impitoyable dans la même partie. Et la carte du monde a un climat — taïga, désert, tropiques — océans et régions nommés.|CPUの強さを、CPUごとに選べるようになりました。手加減する相手と本気の相手を、同じ旅に混ぜられます。世界一周の地図には気候が入りました。タイガ、砂漠、熱帯。海と地域にも名前が付いています。",
      ),
    ],
  },
  {
    version: "0.28.0",
    date: "2026-08-11",
    title: t(
      "Nothing is thrown away without asking, and other people\'s turns stop asking you|Nada se borra sin preguntar, y los turnos ajenos dejan de pedirte permiso|Rien n\'est effacé sans vous demander, et les tours des autres cessent de vous solliciter|消す前に訊くようになり、他人の手番で押させるのをやめました",
    ),
    highlights: [
      t(
        "Discarding a saved journey used to wipe it on the spot. A year of play could go in one misclick. It now shows you what is about to be lost and asks first, with \u201Ckeep\u201D as the default.|Descartar un viaje guardado lo borraba en el acto: un año de partida podía irse en un clic. Ahora te muestra qué se va a perder y pregunta antes, con \u201Cconservar\u201D por defecto.|Écarter un voyage sauvegardé l\'effaçait sur-le-champ : une année de jeu pouvait disparaître d\'un clic. Le jeu montre désormais ce qui va être perdu et demande d\'abord, en proposant de garder par défaut.|保存した旅を「捨てる」と、その場で消えていました。1年ぶんの旅が、押し間違い1回で無くなります。何が消えるのかを見せてから訊くようにし、既定は「残す」にしました。",
      ),
      t(
        "A right answer is gold now, a wrong one stays red. They used to be the same colour, told apart only by the shape of the mark — which meant you had to look, instead of just seeing.|Un acierto ahora es dorado y un fallo sigue en rojo. Antes compartían color y solo los distinguía la forma de la marca: había que mirar en vez de simplemente ver.|Une bonne réponse est désormais dorée, une mauvaise reste rouge. Elles partageaient la même couleur, et seule la forme les distinguait : il fallait regarder au lieu de simplement voir.|正解が金色になり、不正解は赤のままになりました。これまでは同じ色で、印の形でしか見分けられませんでした。見るのではなく、読む必要があったということです。",
      ),
      t(
        "Squares no longer ignore a press that lands slightly off. The clickable area used to be a small centre and a thin ring with a dead gap between them; the gap is filled, so anywhere inside the glow now counts.|Las casillas ya no ignoran una pulsación algo desviada. La zona sensible era un centro pequeño y un anillo fino con un hueco muerto en medio; el hueco está relleno, así que ahora cuenta todo el interior del resplandor.|Les cases n\'ignorent plus un clic légèrement décalé. La zone sensible se limitait à un petit centre et à un mince anneau, avec un vide entre les deux ; ce vide est comblé : tout l\'intérieur du halo répond.|マスを少し外して押しても無反応、ということがなくなりました。押せる範囲が、小さな中心と細い輪に分かれていて、あいだが空洞だったためです。埋めたので、光っている範囲ならどこでも押せます。",
      ),
      t(
        "During other players\' turns, the game no longer waits for you to click through things you had no part in. Their blue and red square events, and the turn of the season, now pass on their own — press to skip ahead if you would rather not wait.|En los turnos ajenos, el juego ya no espera a que confirmes cosas en las que no participas. Sus sucesos y el cambio de estación pasan solos; pulsa si prefieres no esperar.|Pendant les tours des autres, le jeu n\'attend plus que vous validiez des choses qui ne vous concernent pas. Leurs événements et le changement de saison défilent seuls ; appuyez pour aller plus vite.|他の旅人の手番で、自分に関係のないものを押させるのをやめました。相手の青マス・赤マスの出来事と、月替わりが、そのまま流れるようになります。待ちたくなければ押せば飛ばせます。",
      ),
      t(
        "Items that carry you off — the Ekeko figure, the aeroplane, the balloon, the sail-trawler — now show the journey. The token walks the rails one square at a time with the item riding above it, instead of sliding straight across under a modal you could not see past.|Los objetos que te llevan lejos —el Ekeko, el avión, el globo, la barca de vela— ahora muestran el trayecto: la ficha recorre los raíles casilla a casilla con el objeto encima, en vez de deslizarse en línea recta bajo una ventana que lo tapaba.|Les objets qui vous emportent — l\'Ekeko, l\'avion, le ballon, la barque à voile — montrent désormais le trajet : le pion suit les rails case par case, l\'objet au-dessus, au lieu de glisser en ligne droite sous une fenêtre qui masquait tout.|運ばれるアイテム(エケコ人形・飛行機・気球・帆引き船)が、道のりを見せるようになりました。これまでは線路を無視して直線に滑り、しかもその動きがモーダルの下に隠れていました。1マスずつ線路をたどり、駒の上にそのアイテムが乗ります。",
      ),
    ],
  },
  {
    version: "0.27.0",
    date: "2026-08-09",
    title: t(
      "The game remembers what you called yourself|El juego recuerda cómo te llamaste|Le jeu retient le nom que vous vous êtes donné|付けた名前を覚えておくようになりました",
    ),
    highlights: [
      t(
        "Starting a new journey no longer means typing everyone's name again. The names you gave are waiting on the setup screen. Default names are not saved, so switching language still switches them.|Empezar otro viaje ya no obliga a teclear los nombres otra vez: los que pusiste esperan en la pantalla de preparación. Los nombres por defecto no se guardan, así que cambiar de idioma los sigue cambiando.|Commencer un nouveau voyage n\'oblige plus à retaper les noms : ceux que vous avez donnés vous attendent à l\'écran de préparation. Les noms par défaut ne sont pas enregistrés, si bien que changer de langue les change toujours.|新しい旅を始めるたびに名前を入れ直す必要がなくなりました。付けた名前が、はじめの画面に残っています。既定の名前は保存しないので、言語を切り替えれば今までどおり切り替わります。",
      ),
    ],
  },
  {
    version: "0.26.1",
    date: "2026-08-09",
    title: t(
      "Events now come from the board you are actually on|Los sucesos vienen ya del tablero en el que juegas|Les événements viennent enfin du plateau où vous jouez|出来事が、いま遊んでいる盤面のものになりました",
    ),
    highlights: [
      t(
        "If you played India and then started a game in Bolivia, the blue and red squares kept handing you Indian events — a chai wallah refusing payment, on the altiplano. The board, the towns and the quiz all changed; only the events were left behind.|Si jugabas a la India y luego empezabas en Bolivia, las casillas azules y rojas seguían dando sucesos indios: un chai wallah que no cobra, en pleno altiplano. El tablero, las ciudades y las preguntas cambiaban; solo los sucesos se quedaban atrás.|Après une partie en Inde, une partie en Bolivie continuait de servir des événements indiens : un chai wallah qui refuse d\'être payé, sur l\'altiplano. Le plateau, les villes et le quiz changeaient ; seuls les événements restaient.|インドで遊んだあとボリビアを始めると、青マス・赤マスがインドの出来事を出し続けていました。アルティプラーノでチャイ売りが代金を受け取らない、という具合です。盤面も町もクイズも切り替わるのに、出来事だけが前の国のまま残っていました。",
      ),
    ],
  },
  {
    version: "0.26.0",
    date: "2026-08-09",
    title: t(
      "If you play with animation turned down, you can still see what happened|Si juegas con las animaciones reducidas, ahora ves lo que ocurrió|Avec les animations réduites, vous voyez enfin ce qui s'est passé|動きを減らして遊んでいる人にも、何が起きたか見えるようになりました",
    ),
    highlights: [
      t(
        "Some scenes hid the thing that mattered until the animation moved it into view — so with motion turned down, the pickpocket's take vanished from the pickpocket scene, and the surcharge vanished from the bill. Eleven of those are now visible whether anything moves or not.|Algunas escenas escondían lo importante hasta que la animación lo traía a la vista: con el movimiento reducido, el botín desaparecía de la escena del carterista y el recargo desaparecía de la cuenta. Once de esos casos ya se ven, haya movimiento o no.|Certaines scènes cachaient l'essentiel jusqu'à ce que l'animation l'amène : animations réduites, le butin disparaissait de la scène du pickpocket et le supplément disparaissait de la note. Onze de ces cas sont désormais visibles, que ça bouge ou non.|一部の絵は、肝心のものを動きが運んでくるまで隠していました。そのため動きを減らす設定では、スリの絵から盗られたものが消え、伝票から足された料金が消えていました。11か所を、動いても動かなくても見えるようにしました。",
      ),
      t(
        "France's cut-train scene read as a derailment — a carriage tipped nose-down with a shock star above it. The carriage was fine; the branch line under it had been drawn dropping away at an impossible gradient. The track is redrawn as coming toward you instead, and the train sits level again.|La escena del tren acortado en Francia parecía un descarrilamiento. El vagón estaba bien: la vía de desvío estaba dibujada con una pendiente imposible. Ahora la vía viene hacia el espectador y el tren está nivelado.|La scène du train raccourci, en France, évoquait un déraillement. La voiture n'y était pour rien : la voie de desserte descendait selon une pente impossible. La voie vient maintenant vers vous, et le train est de niveau.|フランスの「編成が短い」場面が、脱線事故に見えていました。悪かったのは車両ではなく線路で、分岐線がありえない勾配で下っていました。手前に向かってくる線として描き直し、車両は水平に戻りました。",
      ),
      t(
        "When two squares you could move to sounded exactly alike to a screen reader — same direction, same kind, same distance — there was no way to tell which one you were about to pick. They are told apart now.|Cuando dos casillas sonaban igual al lector de pantalla —misma dirección, mismo tipo, misma distancia— no había forma de saber cuál ibas a elegir. Ahora se distinguen.|Quand deux cases se lisaient à l'identique au lecteur d'écran — même direction, même type, même distance — impossible de savoir laquelle on allait choisir. Elles se distinguent désormais.|読み上げで、行き先の候補がまったく同じ文になることがありました。向きも種類も残りマス数も同じだと、どちらを選ぼうとしているのか分かりません。区別が付くようにしました。",
      ),
    ],
  },
  {
    version: "0.25.0",
    date: "2026-08-09",
    title: t(
      "Ibaraki's misfortunes are seven different people now|Las desgracias de Ibaraki son ahora siete personas distintas|Les malheurs d'Ibaraki sont désormais sept personnes différentes|茨城の災難に、七人ちがう人が出るようになりました",
    ),
    highlights: [
      t(
        "All seven of Ibaraki's misfortune scenes had the same figure in them — same red shirt, same raised arm, only the hat changed. Now there is a carrier with a shoulder pole, a driver sitting on his crates, someone pulling matting over the drying racks in the rain, a farmer crouched at the paddy edge tasting the water for salt.|Las siete desgracias de Ibaraki tenían la misma figura: misma camisa roja, mismo brazo alzado. Ahora hay un porteador, un transportista sentado sobre sus cajas, alguien tapando los secaderos bajo la lluvia, un labrador agachado probando si el agua sabe a sal.|Les sept malheurs d'Ibaraki montraient la même silhouette : même chemise rouge, même bras levé. On y trouve maintenant un porteur, un transporteur assis sur ses caisses, quelqu'un qui bâche les séchoirs sous la pluie, un paysan accroupi qui goûte le sel dans l'eau.|茨城の災難7枚は、7枚とも同じ人が出ていました。同じ赤いシャツ、同じ上げた腕、違うのは帽子だけです。いまは、天秤棒で荷を担ぐ人、荷物の上に座って待つ運転手、雨の中で干し場に筵を掛ける人、畦にしゃがんで水の塩気を確かめる農夫が出ます。",
      ),
      t(
        "The giant's footprint keeps its scene, with one addition: a heron already standing in the pond that appeared overnight. Some things do not drain away.|La huella del gigante conserva su escena, con un añadido: una garza ya posada en la charca surgida de la noche a la mañana. Hay cosas que no se secan.|L'empreinte du géant garde sa scène, avec un ajout : un héron déjà posté dans la mare apparue en une nuit. Certaines choses ne se retirent pas.|巨人の足跡の絵はそのままに、一つだけ足しました。ひと晩でできた池に、もう鷺が立っています。引かない水もあります。",
      ),
    ],
  },
  {
    version: "0.24.0",
    date: "2026-08-09",
    title: t(
      "The travel log now speaks proper English, Spanish and French|El diario de viaje ya escribe en condiciones|Le journal de voyage écrit enfin correctement|旅の記録の文章が、英語・スペイン語・フランス語で直りました",
    ),
    highlights: [
      t(
        "Every line of the log put your name in front of a verb — and since the default name is a pronoun, the result was “You answers wrong” and “You is carried nine squares”, every single turn. The log now sets the name apart from what happened, the way the Japanese always did.|Cada línea ponía tu nombre delante de un verbo, y como el nombre por defecto es un pronombre, salía «Tú falla» en cada turno. Ahora el nombre va separado de lo ocurrido, como siempre hizo el japonés.|Chaque ligne plaçait votre nom devant un verbe ; le nom par défaut étant un pronom, cela donnait « Toi se trompe » à chaque tour. Le nom est désormais séparé de ce qui s'est passé, comme le faisait déjà le japonais.|旅の記録は、名前のすぐあとに動詞を活用させて置いていました。既定の名前が代名詞なので、毎ターン「You answers wrong」「Toi se trompe」といった壊れた文が出ていました。日本語が最初からそうしていたように、名前と出来事を切り離しました。",
      ),
      t(
        "The same change fixes something quieter: in Spanish and French a few lines assumed the player was male. If you named yourself María, the game had been getting your grammar wrong all along.|El mismo cambio corrige algo más callado: en español y francés varias líneas daban por hecho que jugabas en masculino. Si te llamabas María, el juego llevaba todo el tiempo equivocándose.|Le même changement en corrige un plus discret : en espagnol et en français, certaines lignes supposaient un joueur masculin. Si vous vous appeliez María, le jeu se trompait depuis le début.|同じ直しで、もう一つ静かな誤りが消えました。スペイン語とフランス語の一部の行は、遊ぶ人が男性である前提で書かれていました。「マリア」と名乗って遊んでいた人には、ずっと誤った文が出ていたことになります。",
      ),
      t(
        "Items that cannot do anything right now no longer let themselves be spent. Pressing the ch'alla offering without a spirit on you used to consume it for nothing; it now says why it is waiting.|Los objetos que ahora no pueden hacer nada ya no se gastan. Usar la ofrenda de ch'alla sin un espíritu encima la consumía para nada; ahora explica por qué espera.|Les objets qui ne peuvent rien faire ne se laissent plus dépenser. L'offrande de ch'alla, utilisée sans esprit sur soi, se consommait pour rien ; elle dit maintenant pourquoi elle attend.|いま効果が成立しないアイテムは、押しても消えなくなりました。厄災を背負っていないのにチャラの供物を使うと、何も起きずに無くなっていました。いまは「厄災を背負っているときだけ」と理由が出ます。",
      ),
      t(
        "Passing the misfortune to someone else now says who received it — it used to happen in silence. And a charm's description no longer promises to turn a wrong answer right: it absorbs the loss, but wrong stays wrong, which is the point.|Pasar la desgracia a otro ahora dice a quién le tocó; antes ocurría en silencio. Y el amuleto ya no promete convertir un fallo en acierto: absorbe la pérdida, pero el fallo sigue siendo un fallo.|Refiler le malheur à quelqu'un indique désormais à qui ; cela se faisait en silence. Et l'amulette ne promet plus de transformer une erreur en bonne réponse : elle absorbe la perte, mais l'erreur reste une erreur.|厄災を誰かに押し付けたとき、相手の名前が出るようになりました。これまでは黙って移っていました。お守りの説明も直しました。「次の不正解を正解にする」と書いてありましたが、実際は損失を肩代わりするだけで、不正解であることは変わりません。そこが大事な点です。",
      ),
      t(
        "Sixteen more quiz questions across the other five boards gave their answer away in a town card. Bolivia had nine of them. All six boards are clean now.|Otras dieciséis preguntas de los cinco tableros restantes revelaban su respuesta en una ficha de ciudad; nueve eran de Bolivia. Los seis tableros están limpios.|Seize autres questions, sur les cinq plateaux restants, livraient leur réponse dans une fiche de ville ; neuf en Bolivie. Les six plateaux sont désormais nets.|残る5盤面でも、都市の紹介文に答えが書いてある問題が16問見つかりました。うち9問がボリビアです。6盤面すべて解消しました。",
      ),
    ],
  },
  {
    version: "0.23.0",
    date: "2026-08-09",
    title: t(
      "The misfortune spirit lets go, and the die shows what it rolled|El espíritu de la desgracia por fin se marcha, y el dado muestra lo que sacó|L'esprit de malheur finit par lâcher prise, et le dé montre ce qu'il a fait|厄災の神が離れるようになり、サイコロが出た目を見せるようになりました",
    ),
    highlights: [
      t(
        "Once the spirit took hold it never let go: it struck again every time you reached for the die, and the log filled with the same line forever. It now moves on at the end of a turn, to whoever is furthest behind — the way it was always meant to.|Una vez que el espíritu se agarraba, no soltaba: golpeaba cada vez que ibas a por el dado y el diario se llenaba con la misma línea. Ahora se marcha al final del turno hacia quien va más rezagado, como debía ser.|Une fois accroché, l'esprit ne lâchait plus : il frappait chaque fois que vous tendiez la main vers le dé, et le journal se remplissait de la même ligne. Il passe désormais, en fin de tour, à celui qui est le plus en retard — comme prévu depuis le début.|厄災の神は、一度取り憑くと二度と離れませんでした。サイコロに手を伸ばすたびに災難が起き、旅の記録が同じ一行で埋まります。手番の終わりに、いちばん遅れている人へ移るようになりました。本来そうあるべきものでした。",
      ),
      t(
        "The die was landing on its side when it rolled a two or a five, so the face you saw was not the face it had rolled. That is why the number sometimes looked wrong, and why squares you thought were out of reach turned out not to be. It now settles upright whatever it rolls.|El dado caía de lado al sacar un dos o un cinco, así que la cara que veías no era la que había salido. Por eso el número parecía equivocado a veces. Ahora se posa derecho saque lo que saque.|Le dé retombait sur le flanc pour un deux ou un cinq : la face visible n'était pas celle qu'il avait faite. D'où les nombres qui semblaient faux. Il se pose maintenant droit, quel que soit le résultat.|サイコロは出目が2と5のとき横倒しで止まっていて、見えている面が出た目ではありませんでした。「出目がときどき違う」「行けないはずのマスに行けた」のはこれが原因です。どの目でも正しく立って止まります。",
      ),
      t(
        "Items that let you name your own number — the Jōban Line timetable and its like on every board — did nothing at all. They vanished from your bag and that was that. They now open a panel where you pick one to six.|Los objetos que te dejan elegir el número —el horario de la línea Jōban y sus equivalentes en cada tablero— no hacían nada: desaparecían de la bolsa y ya. Ahora abren un panel para elegir del uno al seis.|Les objets permettant d'annoncer son chiffre — l'indicateur de la ligne Jōban et ses équivalents sur chaque plateau — ne faisaient rien : ils disparaissaient du sac, un point c'est tout. Ils ouvrent désormais un panneau où l'on choisit de un à six.|出目を自分で選べるアイテム——常磐線の時刻表と、各盤面の同じ働きのもの——は、何も起きずに持ち物から消えるだけでした。1から6を選ぶ画面が出るようになりました。",
      ),
      t(
        "In a town you can now see what you have before you buy, what each purchase leaves you with, and how many businesses are still needed to double the income. Ushiku has its Great Buddha. And on the Ibaraki board, misfortune finally has pictures — a giant's footprint filling with water, a drying yard caught in the rain.|En un pueblo ahora ves cuánto tienes antes de comprar, con cuánto te quedas y cuántos negocios faltan para doblar la renta. Ushiku tiene su Gran Buda. Y en el tablero de Ibaraki, la desgracia por fin tiene imágenes.|En ville, vous voyez maintenant ce que vous avez avant d'acheter, ce qu'il vous restera, et combien d'affaires manquent pour doubler le revenu. Ushiku a son Grand Bouddha. Et sur le plateau d'Ibaraki, le malheur a enfin des images.|町では、買う前に所持金と、買ったあとの残りと、あと何件で収入が倍になるかが見えるようになりました。牛久に大仏が立ちました。茨城の盤面では、災難にようやく絵が付きました。巨人の足跡に水が溜まり、干し場が雨に濡れます。",
      ),
      t(
        "Ten of Ibaraki's questions have been rewritten. Some asked why something is so, which has no single answer; four gave their answer away in the town card you may already have read.|Diez preguntas de Ibaraki se han reescrito. Algunas preguntaban por qué algo es así, lo que no tiene una sola respuesta; cuatro revelaban su respuesta en la ficha del pueblo.|Dix questions d'Ibaraki ont été réécrites. Certaines demandaient pourquoi une chose est ainsi, ce qui n'a pas de réponse unique ; quatre livraient leur réponse dans la fiche de la ville.|茨城の問題を10問書き直しました。「なぜそうなのか」を問うものは答えが一つに定まりません。4問は、すでに読んだかもしれない町の紹介文に答えが書いてありました。",
      ),
    ],
  },
  {
    version: "0.22.0",
    date: "2026-08-08",
    title: t(
      "Every town on every board now looks like somewhere|Cada ciudad de cada tablero parece ahora un lugar de verdad|Chaque ville de chaque plateau ressemble enfin à quelque part|どの盤面のどの町も、どこかの場所に見えるようになりました",
    ),
    highlights: [
      t(
        "All six boards are done. Where a town used to sit against a flat band of colour, there is now a place with people working in it — a bathing step at dusk, an oyster bed at low tide, a lake boat pulled by nothing but the wind. Three hundred and twenty-one towns, none of them bare.|Los seis tableros están listos. Donde una ciudad se recortaba sobre una franja de color plana, hay ahora un lugar con gente trabajando: una escalinata al anochecer, un criadero de ostras en bajamar, una barca de lago movida solo por el viento. Trescientas veintiuna ciudades, ninguna desnuda.|Les six plateaux sont terminés. Là où une ville se détachait sur une bande de couleur unie, il y a désormais un lieu habité : un escalier de bain au crépuscule, un parc à huîtres à marée basse, une barque de lac tirée par le seul vent. Trois cent vingt et une villes, aucune nue.|6つの盤面すべてが仕上がりました。のっぺりした色の帯を背にしていた町が、人の働く場所になっています。夕暮れの沐浴場、引き潮の牡蠣棚、風だけで進む湖の帆引き船。321の町に、空っぽのものはもうありません。",
      ),
      t(
        "On a tablet or a phone, opening a game used to put the die below the map — you had to scroll before you could do anything at all. The die, whose turn it is, and the hint now sit above the map, so the first thing you see is the thing you press.|En tableta o móvil, al empezar una partida el dado quedaba bajo el mapa: había que desplazarse para poder hacer algo. Ahora el dado, el turno y la pista están sobre el mapa: lo primero que ves es lo que hay que pulsar.|Sur tablette ou téléphone, le dé se trouvait sous la carte au lancement : il fallait faire défiler avant de pouvoir agir. Le dé, le tour et l'indice sont désormais au-dessus de la carte : la première chose visible est celle sur laquelle on appuie.|タブレットや携帯でゲームを始めると、サイコロが地図の下にあり、画面を送るまで何も押せませんでした。サイコロと手番と手引きを地図の上に置いたので、最初に目に入るものが、そのまま押すものになります。",
      ),
      t(
        "When something happened on a rival's turn, the result still read as if it had happened to you — “You come out ahead, +Bs 200” under a heading that said CPU 1. Every one of the hundred and seven events has been rewritten so that only the heading says whose turn it is.|Cuando algo ocurría en el turno de un rival, el resultado se leía como si te hubiera pasado a ti: «Sales ganando, +Bs 200» bajo un título que decía CPU 1. Los ciento siete sucesos se han reescrito para que solo el título diga de quién se trata.|Quand un événement survenait chez un adversaire, le résultat se lisait comme s'il vous concernait : « Tu t'en sors gagnant, +Bs 200 » sous un titre indiquant CPU 1. Les cent sept événements ont été réécrits : seul le titre dit à qui cela arrive.|相手の番に何かが起きたとき、結果の行が自分に起きたことのように読めていました。見出しには「CPU 1」と出ているのに「得をした +Bs 200」と書いてあったためです。107件の出来事すべてを書き直し、誰の話かは見出しだけが言うようにしました。",
      ),
      t(
        "The square guide no longer sits open on top of the map, where it covered up to thirteen place names. It is a labelled button now — one press to read it, and nothing hidden behind it. In French the game had been addressing you two different ways in the same screen; it now speaks as it always did elsewhere.|La guía de casillas ya no se queda abierta sobre el mapa, donde tapaba hasta trece nombres. Ahora es un botón con texto: una pulsación para leerla y nada oculto detrás. En francés el juego te trataba de dos formas en la misma pantalla; ahora habla como siempre lo hizo.|Le guide des cases ne reste plus ouvert sur la carte, où il masquait jusqu'à treize noms de lieux. C'est désormais un bouton libellé : une pression pour le lire, et plus rien de caché. En français, le jeu vous tutoyait et vous vouvoyait dans le même écran ; il parle maintenant d'une seule voix.|マスの見かたが、地図の上に開いたままにならなくなりました。最大13件の地名を覆っていたためです。文字の入ったボタンにしたので、1回押せば読め、後ろに隠れるものはありません。フランス語では1つの画面で二通りの呼びかけが混ざっていたのも、元からの言い方に揃えました。",
      ),
    ],
  },
  {
    version: "0.21.0",
    date: "2026-08-08",
    title: t(
      "Bolivia has more places to go, and the towns you visit look like somewhere|Bolivia tiene más sitios adonde ir, y sus pueblos parecen lugares de verdad|La Bolivie a plus d'endroits où aller, et ses villes ressemblent enfin à quelque part|ボリビアに行ける場所が増え、着いた町がどこかの町に見えるようになりました",
    ),
    highlights: [
      t(
        "Five towns join the Bolivian board — Challapata on a lake that dried up, Chulumani on terraces older than the Inca, Totora, Punata, and Yacuiba where the railway stops at the border — with nine new lines between them. The board had fewer junctions than any other, so there was rarely a choice of route; now there is.|Cinco pueblos se suman al tablero boliviano —Challapata junto a un lago que se secó, Chulumani en terrazas anteriores a los incas, Totora, Punata y Yacuiba, donde el ferrocarril se detiene en la frontera— con nueve líneas nuevas. Era el tablero con menos cruces: casi nunca había ruta que elegir. Ahora sí.|Cinq villes rejoignent le plateau bolivien — Challapata au bord d'un lac disparu, Chulumani sur des terrasses antérieures aux Incas, Totora, Punata et Yacuiba où le rail s'arrête à la frontière — avec neuf lignes nouvelles. C'était le plateau le moins ramifié : on n'avait presque jamais le choix de l'itinéraire. Désormais, si.|ボリビアの盤面に5つの町が加わりました。干上がった湖のほとりのチャジャパタ、インカより古い段々畑のチュルマニ、トタラ、プナタ、そして線路が国境で終わるヤクイバ。あいだを結ぶ路線も9本増えています。この盤面はどこよりも分かれ道が少なく、道順を選ぶ場面がほとんどありませんでした。",
      ),
      t(
        "Seven new things can happen on the blue and red squares, so the same story stops coming round. You might help restring a charango — an instrument whose body was once an armadillo shell — or find the airstrip closed by the smoke of the season's field burning.|Siete sucesos nuevos en las casillas azules y rojas, para que no se repita siempre lo mismo. Puedes ayudar a encordar un charango —cuya caja fue en su día un caparazón de armadillo— o encontrar la pista cerrada por el humo de las quemas.|Sept événements inédits sur les cases bleues et rouges : la même histoire ne revient plus sans cesse. Vous aiderez à recorder un charango — dont la caisse fut jadis une carapace de tatou — ou trouverez la piste fermée par la fumée des brûlis.|青マス・赤マスで起きることが7つ増え、同じ話が何度も出ることが減りました。チャランゴの弦を張る手伝いをしたり(この楽器の胴は、かつてアルマジロの甲羅で作られていました)、焼き畑の煙で滑走路が閉じて足止めされたりします。",
      ),
      t(
        "The pictures behind each town are much fuller. India's are finished — every one of its sixty towns now looks like a particular place, with people in it — and Bolivia and the round-the-world board are most of the way there. Where a town used to sit against a flat band of colour, there is now a street, a shore, or a market with someone working in it.|Los fondos de las ciudades son mucho más ricos. La India está terminada —sus sesenta ciudades tienen ahora un lugar propio, con gente— y Bolivia y la vuelta al mundo van muy avanzadas. Donde antes había una franja de color plana, ahora hay una calle, una orilla o un mercado con alguien trabajando.|Les décors des villes sont bien plus fournis. L'Inde est terminée — ses soixante villes ont chacune un lieu, avec des gens — et la Bolivie et le tour du monde sont bien avancés. Là où une ville se détachait sur une bande de couleur unie, il y a maintenant une rue, un rivage, un marché où quelqu'un travaille.|都市の背景がずっと厚くなりました。インドは完成し、60都市すべてが「どこかの場所」に見えます。ボリビアと世界一周も大半が済みました。のっぺりした色の帯を背にしていた町が、通りや岸辺や、誰かが働いている市場になっています。",
      ),
      t(
        "In English the turn indicator used to read “You’s turn” when you had not typed a name. It now says “Your turn”.|En inglés el indicador de turno decía “You’s turn” si no habías escrito un nombre. Ahora dice “Your turn”.|En anglais, l’indicateur de tour affichait “You’s turn” faute de nom saisi. Il affiche désormais “Your turn”.|英語で遊んでいて名前を付けずに始めると、手番の表示が “You’s turn” という壊れた英語になっていました。“Your turn” に直しました。",
      ),
    ],
  },
  {
    version: "0.20.0",
    date: "2026-08-08",
    title: t(
      "What your items do is written on them now|Ahora tus objetos dicen lo que hacen|Vos objets disent enfin ce qu'ils font|アイテムに、何が起きるかが書いてあります",
    ),
    highlights: [
      t(
        "An item's effect was only written in a tooltip you had to hover over, so on a phone there was no way to read it at all. Each item now carries its effect under its name, where you can just see it.|El efecto de cada objeto solo aparecía al pasar el ratón por encima, así que en el móvil no había forma de leerlo. Ahora cada objeto lleva su efecto bajo el nombre, a la vista.|L'effet d'un objet n'apparaissait qu'au survol de la souris : sur téléphone, impossible de le lire. Chaque objet affiche désormais son effet sous son nom, simplement visible.|アイテムの効果は、マウスを乗せたときだけ出る吹き出しにしか書いてありませんでした。携帯では読む方法がなかったということです。今は名前の下に効果が書いてあり、そのまま目に入ります。",
      ),
      t(
        "Items you can use right now say so, and the ones that work on their own say that instead — you no longer have to tap one to find out whether tapping does anything.|Los objetos que puedes usar ahora lo indican, y los que actúan solos también: ya no hace falta pulsarlos para averiguar si sirven.|Les objets utilisables maintenant le disent, et ceux qui agissent seuls aussi : plus besoin d'en presser un pour savoir s'il se passe quelque chose.|いま使えるアイテムには「使える」と、ひとりでに働くものには「自動」と出ます。押してみないと押せるかどうか分からない、ということがなくなりました。",
      ),
      t(
        "The square guide now folds away, and it says what each colour actually does rather than only naming it.|La guía de casillas ahora se pliega, y explica qué hace cada color en vez de solo nombrarlo.|Le guide des cases se replie désormais, et il dit ce que fait chaque couleur au lieu de seulement la nommer.|マスの見かたは、たためるようになりました。色の名前だけでなく、止まると何が起きるかを書いています。",
      ),
      t(
        "When something happens on your turn, a short line slides in near the board. The travel log was at the bottom of the side panel, where nobody looks mid-game.|Cuando ocurre algo en tu turno, aparece una línea breve junto al tablero. El diario de viaje estaba al fondo del panel, donde nadie mira jugando.|Quand il se passe quelque chose pendant votre tour, une ligne courte glisse près du plateau. Le journal de voyage était en bas du panneau, là où personne ne regarde en jouant.|自分の番に何かが起きると、盤面のそばに短い一行が流れます。旅の記録は横のパネルのいちばん下にあり、遊んでいる最中は目に入らない場所でした。",
      ),
    ],
  },
  {
    version: "0.19.0",
    date: "2026-08-08",
    title: t(
      "Money now lands with some weight|El dinero ahora se nota|L\'argent se fait enfin sentir|お金の増減に手応えが付きました",
    ),
    highlights: [
      t(
        "Your money no longer flicks from one number to the next. It rolls, and how long it takes depends on how much moved: small change counts up quickly, a big prize takes its time.|Tu dinero ya no salta de una cifra a otra: va rodando, y cuanto mayor es el cambio, más tarda en contarse.|Votre argent ne saute plus d\'un chiffre à l\'autre : il défile, et plus la somme est grosse, plus le compte est long.|所持金がいきなり切り替わらず、数字が転がって増減します。動いた大きさで時間が変わり、小銭は速く、大金はゆっくり数えます。",
      ),
      t(
        "A gain lifts and turns gold, a loss dips and turns red, and the amount appears beside the total — so you can see what just happened without reading the log.|Lo que ganas sube y se vuelve dorado; lo que pierdes baja y se vuelve rojo, y la cantidad aparece junto al total.|Un gain monte et devient doré, une perte descend et devient rouge, et le montant s\'affiche à côté du total.|増えるときは金色に持ち上がり、減るときは赤く沈みます。動いた額が金額の横に出るので、旅の記録を読まなくても何が起きたか分かります。",
      ),
      t(
        "Arriving at your destination scatters coins, and a heavy loss shakes the number. Everyday quiz wins and blue squares stay quiet, and other travellers’ money moves without the fuss, so the big moments are the ones that stand out.|Llegar a tu destino hace saltar monedas y una pérdida fuerte sacude la cifra. Los aciertos corrientes y el dinero de los demás se mueven sin alboroto.|Arriver à destination fait jaillir des pièces, une grosse perte fait trembler le chiffre. Le quotidien et l\'argent des autres restent discrets.|目的地に着くとコインが弾け、大きく減ると数字が揺れます。ふだんのクイズや青マス、それに他の旅人のお金は静かに動くので、見せ場だけが際立ちます。",
      ),
      t(
        "If your device is set to reduce motion, nothing rolls or scatters — the numbers simply change.|Si tu dispositivo reduce el movimiento, nada rueda ni salta: las cifras cambian sin más.|Si votre appareil limite les animations, rien ne défile ni ne jaillit : les chiffres changent, tout simplement.|端末で動きを減らす設定にしている場合は、転がりもコインも出ず、数字がそのまま変わります。",
      ),
    ],
  },
  {
    version: "0.18.1",
    date: "2026-08-08",
    title: t(
      "The legend no longer swallows your taps|La leyenda ya no se traga tus toques|La légende n'avale plus vos clics|凡例がマスの押しを吸い取らなくなりました",
    ),
    highlights: [
      t(
        "The square guide sits in the top-left corner of the map, and squares underneath it could not be tapped at all. On the round-the-world board that corner is Europe, so London and its neighbours were impossible to choose at some window widths.|La guía de casillas está en la esquina superior izquierda del mapa y las casillas que quedaban debajo no se podían pulsar. En el tablero de la vuelta al mundo esa esquina es Europa, así que Londres y sus vecinas no se podían elegir con ciertos anchos de ventana.|Le guide des cases occupe le coin supérieur gauche de la carte, et les cases situées dessous ne réagissaient pas du tout. Sur le plateau du tour du monde, ce coin, c'est l'Europe : Londres et ses voisines étaient donc impossibles à choisir à certaines largeurs de fenêtre.|マスの見かたは地図の左上に置いてあり、その下に来たマスがまったく押せませんでした。世界一周の盤面では左上がヨーロッパなので、窓の幅によってはロンドンとその周りが選べなくなっていました。",
      ),
    ],
  },
  {
    version: "0.17.0",
    date: "2026-08-08",
    title: t(
      "You can see where you may go, and the board answers when you press it|Ahora se ve adónde puedes ir, y el tablero responde al pulsarlo|On voit où l'on peut aller, et le plateau répond quand on le presse|行けるマスが見えるようになり、押したら盤面が返事をします",
    ),
    highlights: [
      t(
        "The squares you can reach were already being marked, but in the same gold as the quiz squares, so the mark vanished among them. Reachable squares now wear a thick white ring and everything else is dimmed, so they stand out at a glance.|Las casillas alcanzables ya se marcaban, pero con el mismo dorado que las de preguntas, así que la marca se perdía entre ellas. Ahora llevan un grueso anillo blanco y el resto se atenúa, para verlas de un vistazo.|Les cases accessibles étaient déjà marquées, mais dans le même doré que les cases quiz : la marque s'y perdait. Elles portent désormais un large anneau blanc et le reste s'assombrit, pour les repérer d'un coup d'œil.|行けるマスには前から印が付いていましたが、クイズマスと同じ金色だったので、黄色いマスの中に紛れて見えませんでした。白い太い輪を付け、ほかを暗く沈めるようにしたので、ひと目で分かります。",
      ),
      t(
        "Pressing a square you cannot reach used to do nothing at all, which looked broken. It now bumps back with a short sound and a red ring, so you can tell the game heard you and the square is simply out of range.|Pulsar una casilla inalcanzable no hacía absolutamente nada y parecía una avería. Ahora rebota con un sonido breve y un anillo rojo, para saber que el juego te oyó y que la casilla queda fuera de alcance.|Presser une case hors de portée ne produisait rien du tout, ce qui semblait cassé. Elle recule maintenant d'un cran avec un son bref et un anneau rouge : le jeu vous a bien entendu, la case est simplement trop loin.|届かないマスを押しても本当に何も起きず、壊れているように見えていました。今は軽く弾んで短い音と赤い輪を返すので、「聞こえてはいるが、そのマスには届かない」と分かります。",
      ),
      t(
        "The die now lifts when you point at it and sinks when you press it, and it glows softly while it is your turn to roll — it was hard to tell it was a button at all.|El dado ahora se eleva al apuntarlo y se hunde al pulsarlo, y brilla suavemente cuando te toca tirar: antes costaba ver que fuera un botón.|Le dé se soulève au survol et s'enfonce quand on le presse, et il brille doucement quand c'est à vous de lancer : on ne devinait pas que c'était un bouton.|サイコロは、指を乗せると浮き上がり、押すと沈むようになりました。自分の番のあいだは金色にゆっくり光ります。これまでボタンだと気づきにくいものでした。",
      ),
      t(
        "The whole-map button now shows whether it is on: it turns gold, changes its picture, and puts a label beside itself, so you can tell the overview from the view you actually play in.|El botón de mapa completo ahora indica si está activo: se vuelve dorado, cambia de dibujo y muestra una etiqueta al lado, para distinguir la vista general de la de juego.|Le bouton carte entière indique désormais s'il est actif : il devient doré, change de dessin et affiche une étiquette à côté, pour distinguer la vue générale de celle où l'on joue.|全体表示のボタンが、押されているかどうかを見せるようになりました。金色になり、絵柄が変わり、脇に名前が出ます。確認用の俯瞰と、実際に遊ぶ表示を見分けられます。",
      ),
    ],
  },
  {
    version: "0.16.2",
    date: "2026-08-08",
    title: t(
      "The board is no longer covered on tablet-sized windows|El tablero ya no queda tapado en ventanas de tamaño tableta|Le plateau n'est plus recouvert sur les fenêtres de taille tablette|タブレットくらいの幅で盤面が隠れなくなりました",
    ),
    highlights: [
      t(
        "At in-between window widths the side panel was drawn on top of the map and hid the board. It now sits below the map, the way it does on a phone.|Con anchos de ventana intermedios, el panel lateral se dibujaba sobre el mapa y tapaba el tablero. Ahora queda debajo del mapa, como en el móvil.|Aux largeurs de fenêtre intermédiaires, le panneau latéral se dessinait par-dessus la carte et masquait le plateau. Il se place désormais sous la carte, comme sur téléphone.|中くらいの幅にすると、右側のパネルが地図の上に重なって盤面を隠していました。携帯と同じように、地図の下に並ぶようにしました。",
      ),
      t(
        "The starting player names now follow the language you are playing in. A name you type yourself is kept when you switch language.|Los nombres iniciales ahora siguen el idioma en el que juegas. Si escribes tu propio nombre, se conserva al cambiar de idioma.|Les noms de départ suivent désormais la langue dans laquelle vous jouez. Un nom que vous saisissez est conservé si vous changez de langue.|最初のプレイヤー名が、遊んでいる言語に合うようになりました(日本語なら「あなた」)。自分で付けた名前は、言語を切り替えても残ります。",
      ),
      t(
        "When several trains stop on the same square they no longer pile up. They spread out so every colour stays visible, and the train whose turn it is is drawn in front.|Cuando varios trenes coinciden en la misma casilla, ya no se amontonan: se reparten para que se vea cada color, y el tren de quien tiene el turno se dibuja delante.|Quand plusieurs trains s'arrêtent sur la même case, ils ne se chevauchent plus : ils se répartissent pour que chaque couleur reste visible, et le train dont c'est le tour passe devant.|同じマスに何台も止まったとき、駒が重なって見えなくなるのをやめました。少しずつずらして全員の色が見えるようにし、手番の駒を手前に描いています。",
      ),
    ],
  },
  {
    version: "0.16.1",
    date: "2026-08-08",
    title: t(
      "The dice keep the number to themselves until they stop|Los dados se guardan el número hasta pararse|Les dés gardent leur chiffre jusqu'à l'arrêt|サイコロは止まるまで出目を見せません",
    ),
    highlights: [
      t(
        "Pressing the die used to show the number and light up the squares you could reach straight away, while the die was still in the air. Now nothing is shown until it lands.|Antes, al pulsar el dado el número aparecía al instante y las casillas se iluminaban mientras el dado seguía en el aire. Ahora no se muestra nada hasta que cae.|Auparavant, le chiffre s'affichait dès la pression et les cases s'allumaient alors que le dé roulait encore. Désormais, rien n'apparaît avant qu'il ne se pose.|これまでは押した瞬間に出目が出て、行けるマスも光っていました。サイコロがまだ転がっている間にです。止まるまで何も出さないようにしました。",
      ),
      t(
        "The roll itself was redone. The bounces get lower and closer together as it settles, and the die goes a little too far and rocks back instead of stopping dead.|También se rehízo la tirada: los rebotes son más bajos y seguidos al final, y el dado se pasa un poco y se balancea en vez de frenar en seco.|Le lancer a été refait : les rebonds deviennent plus bas et plus rapprochés, et le dé dépasse légèrement puis oscille au lieu de s'arrêter net.|転がり方も作り直しました。弾むたびに低く、そして間隔が短くなり、止まりぎわは少し行き過ぎてから揺れて収まります。",
      ),
      t(
        "The faces are shaded differently from each other, so the die reads as a cube instead of a flat card, and it comes to rest at a slight angle.|Las caras tienen sombras distintas entre sí: el dado se ve como un cubo y no como una ficha plana, y queda algo inclinado al detenerse.|Les faces sont ombrées différemment les unes des autres : le dé ressemble à un cube et non à une carte plate, et il s'immobilise légèrement de biais.|面ごとに明るさを変えたので、平たい札ではなく立方体に見えます。止まるときも少し斜めを向きます。",
      ),
    ],
  },
  {
    version: "0.16.0",
    date: "2026-08-08",
    title: t(
      "The music can be turned off|Ahora se puede silenciar la música|La musique peut être coupée|音楽を止められるようになりました",
    ),
    highlights: [
      t(
        "There is a music button in the header now, on the title screen and while you play. Until today there was no way to stop the music from inside the game.|Ahora hay un botón de música en la cabecera, en la pantalla de inicio y durante la partida. Hasta hoy no había forma de detener la música desde el juego.|Un bouton de musique apparaît dans l\'en-tête, sur l\'écran d\'accueil comme en cours de partie. Jusqu\'ici, rien ne permettait de couper la musique depuis le jeu.|トップ画面とゲーム画面のヘッダーに、音楽ボタンが付きました。これまで画面から音楽を止める手段がありませんでした。",
      ),
      t(
        "It stops the music only. The dice, the coins and the rest of the sound effects keep playing, because those are the game answering what you just did.|Solo detiene la música: los dados, las monedas y los demás efectos siguen sonando, porque son la respuesta del juego a lo que acabas de hacer.|Elle ne coupe que la musique : les dés, les pièces et les autres effets continuent, car ce sont les réponses du jeu à ce que vous venez de faire.|止まるのは音楽だけです。サイコロやお金の効果音は残ります。あれは自分の操作に対する返事なので。",
      ),
      t(
        "Your choice is remembered. Turn the music off today and it is still off the next time you open the game.|Tu elección se recuerda: si la silencias hoy, seguirá silenciada la próxima vez que abras el juego.|Votre choix est retenu : musique coupée aujourd\'hui, musique toujours coupée à la prochaine ouverture.|選んだ状態は覚えています。今日切っておけば、次に開いたときも切れたままです。",
      ),
    ],
  },
  {
    version: "0.15.1",
    date: "2026-08-08",
    title: t(
      "Eight lakes come back|Vuelven ocho lagos|Huit lacs réapparaissent|消えていた湖が戻りました",
    ),
    highlights: [
      t(
        "Eight lakes had never once been drawn — Chilika and the Dal, Geneva and Annecy among them. They were written in degrees where the board wanted pixels, so each came out less than one pixel across and vanished without a trace.|Ocho lagos nunca se habían dibujado: estaban escritos en grados donde el tablero esperaba píxeles.|Huit lacs n\'avaient jamais été dessinés : ils étaient écrits en degrés là où le plateau attendait des pixels.|8つの湖が一度も描かれていませんでした。チルカ湖、ダル湖、レマン湖、アヌシー湖など。盤面がピクセルで受け取るところに度で書かれていて、1ピクセルに満たない大きさになって消えていました。",
      ),
    ],
  },
  {
    version: "0.15.0",
    date: "2026-08-08",
    title: t(
      "Ibaraki — a whole board for one province|Ibaraki: un tablero para una sola provincia|Ibaraki : tout un plateau pour une seule province|茨城県の盤面ができました",
    ),
    highlights: [
      t(
        "A sixth board, and the first that is not a country: one Japanese province, 36 towns, 40 new questions. The same machinery that draws the whole world draws a single province just as well.|Un sexto tablero, el primero que no es un país: una provincia japonesa, 36 ciudades, 40 preguntas.|Un sixième plateau, le premier qui n\'est pas un pays : une province japonaise, 36 villes, 40 questions.|6つ目の盤面は、はじめて「県」です。36の町と新作クイズ40問。世界一周を描く仕組みが、そのまま一つの県にも効きました。",
      ),
      t(
        "In one province there is no such thing as a region having a good year while another has a bad one, so the seasons here are festivals instead: plums at Kairakuen in February, irises at Itako in June, the sea opening at Ōarai in July, fireworks judged at Tsuchiura in October, and the waterfall at Fukuroda freezing solid in January.|En una sola provincia no hay regiones con buenos y malos años, así que las estaciones son fiestas: ciruelos, lirios, la apertura del mar, fuegos artificiales, la cascada helada.|Dans une seule province, pas de région en bonne ou mauvaise année : les saisons sont des fêtes — pruniers, iris, ouverture de la mer, feux d\'artifice, cascade gelée.|一つの県の中に「この地方は好況、あちらは不況」という差はありません。そこで季節は行事にしました。2月の偕楽園の梅、6月の潮来のあやめ、7月の大洗の海開き、10月の土浦の花火、1月に凍りつく袋田の滝。",
      ),
      t(
        "The spirit of misfortune here is the Daidarabō, the giant of the old shell-mound tale, whose footprints filled with water and became the ponds. The charm against him is a shell from that mound.|El espíritu es el Daidarabō, el gigante cuyas huellas se llenaron de agua y formaron los estanques.|L\'esprit est le Daidarabō, le géant dont les empreintes se sont remplies d\'eau pour devenir les étangs.|厄災の神はダイダラボウ。大串貝塚に伝わる巨人で、その足跡に水が溜まって沼になったといいます。お守りはその貝塚の貝。",
      ),
      t(
        "The world board also gained six port towns, so that ships no longer sail across dry land — Kolkata, Mombasa, Belém, Bandar Abbas, Veracruz and Lobito.|El tablero mundial ganó seis puertos para que los barcos ya no naveguen por tierra firme.|Le plateau mondial gagne six ports, pour que les navires ne traversent plus la terre ferme.|世界一周にも港町を6つ足しました。船が陸の上を走らないようにするためです。コルカタ・モンバサ・ベレン・バンダレアッバース・ベラクルス・ロビト。",
      ),
    ],
  },
  {
    version: "0.14.0",
    date: "2026-08-07",
    title: t(
      "The game gets its old name back|El juego recupera su nombre original|Le jeu retrouve son nom d'origine|もとの名前に戻りました",
    ),
    highlights: [
      t(
        "This started life on the Bolivian altiplano, and it was called Altiplano Express. The name it picked up later said less, so it has the old one back — even though the trains now run through five parts of the world.|Empezó en el altiplano boliviano y se llamaba Altiplano Express. Recupera aquel nombre, aunque ahora los trenes recorran cinco tableros.|Le jeu est né sur l'altiplano bolivien sous le nom d'Altiplano Express. Il le reprend, même si les trains parcourent désormais cinq plateaux.|このゲームはボリビアのアルティプラーノで生まれ、Altiplano Express という名前でした。あとから付いた名前は当たり障りがなかったので、もとの名前に戻します。いまは5つの盤面を走っていますが、生まれた場所の名前です。",
      ),
    ],
  },
  {
    version: "0.13.5",
    date: "2026-08-07",
    title: t(
      "A compass in the corner|Una brújula en la esquina|Une boussole dans le coin|方位記号を置きました",
    ),
    highlights: [
      t(
        "Every board is drawn with north at the top, so there is now a compass in the corner to say so. There is no scale bar — on the world board a single bar would be a lie somewhere, because a degree is not the same length everywhere.|Todos los tableros tienen el norte arriba, y ahora una brújula lo indica. No hay escala: en el mapa mundial una sola barra mentiría en algún punto.|Tous les plateaux ont le nord en haut ; une boussole le rappelle. Pas d\'échelle : sur la carte du monde, une seule barre mentirait quelque part.|どの盤面も北が上なので、それを示す方位記号を隅に置きました。縮尺は出していません。世界一周では緯度によって1度の長さが変わるため、1本の尺だとどこかで嘘になるからです。",
      ),
    ],
  },
  {
    version: "0.13.4",
    date: "2026-08-07",
    title: t(
      "The sea has shallows now|El mar ahora tiene bajíos|La mer a désormais ses hauts-fonds|海に浅瀬ができました",
    ),
    highlights: [
      t(
        "The sea was one flat colour, so the coast met it with a hard edge and the board looked like cut paper. The water is now lighter close to the shore and deepens as it goes out.|El mar era de un solo color y la costa quedaba como recortada. Ahora el agua es más clara junto a la orilla y se oscurece mar adentro.|La mer était d'un seul ton et la côte semblait découpée. L'eau est désormais plus claire près du rivage et s'assombrit au large.|海が一色でのっぺりしていて、陸との境が切り絵のように見えていました。岸に近いほど水が明るく、沖へ行くほど深くなるようにしました。",
      ),
    ],
  },
  {
    version: "0.13.3",
    date: "2026-08-07",
    title: t(
      "Ajaccio is readable again|Ajaccio vuelve a leerse|Ajaccio est de nouveau lisible|アジャクシオが読めるようになりました",
    ),
    highlights: [
      t(
        "The key to the squares sat on the board itself, so it covered whatever was in the bottom-right corner — Corsica on the French map, New Zealand on the world one. It now sits in the corner of the screen instead, and stays the same size however far you zoom in.|La leyenda tapaba lo que hubiera en la esquina inferior derecha: Córcega, Nueva Zelanda. Ahora va en la esquina de la pantalla y no cambia de tamaño al acercar.|La légende masquait ce qui se trouvait en bas à droite : la Corse, la Nouvelle-Zélande. Elle est désormais dans le coin de l'écran et garde sa taille quel que soit le zoom.|マスの見かたの表が盤面の上に載っていたため、右下にあるもの——フランスならコルシカ島、世界一周ならニュージーランド——を覆っていました。画面の隅に移し、どれだけ寄せても同じ大きさで読めるようにしました。",
      ),
    ],
  },
  {
    version: "0.13.2",
    date: "2026-08-07",
    title: t(
      "The lines bend, not snap|Las líneas se curvan, no se quiebran|Les lignes s'incurvent au lieu de casser|線路の角が丸くなりました",
    ),
    highlights: [
      t(
        "Where a line changed direction it used to turn a hard right angle. It now sweeps round the bend, the way an underground map does — the board reads softer without losing any of its straightness.|Donde una línea cambiaba de dirección giraba en ángulo recto. Ahora describe una curva, como en un plano de metro.|Là où une ligne changeait de direction, elle formait un angle droit. Elle décrit désormais une courbe, comme sur un plan de métro.|線路が向きを変えるところが直角に折れていました。地下鉄の路線図と同じように、なめらかに回り込むようにしました。まっすぐさはそのままに、盤面の当たりが柔らかくなります。",
      ),
    ],
  },
  {
    version: "0.13.1",
    date: "2026-08-07",
    title: t(
      "You can see the moment a town changes hands|Se ve el momento en que una ciudad cambia de dueño|On voit le moment où une ville change de mains|町の持ち主が変わる瞬間が見えます",
    ),
    highlights: [
      t(
        "When a town becomes yours, the ring around it swells once and settles. It happens only on the change, so the board stays calm the rest of the time.|Cuando una ciudad pasa a ser tuya, el anillo se ensancha una vez y se asienta. Solo ocurre en el cambio.|Quand une ville devient vôtre, l'anneau s'élargit une fois puis se pose. Cela n'arrive qu'au changement.|町が自分のものになった瞬間、輪がひと回り広がってから収まります。変わったときだけなので、それ以外は盤面が落ち着いたままです。",
      ),
    ],
  },
  {
    version: "0.13.0",
    date: "2026-08-07",
    title: t(
      "The map turns your colour|El mapa se tiñe de tu color|La carte prend votre couleur|地図が自分の色に染まります",
    ),
    highlights: [
      t(
        "Buying a business used to change nothing on the map — you had to read the numbers on the side. Now a town you own wears a ring in your colour.|Comprar un negocio no cambiaba nada en el mapa. Ahora la ciudad que posees lleva un anillo de tu color.|Acheter un commerce ne changeait rien sur la carte. Désormais une ville qui vous appartient porte un anneau de votre couleur.|物件を買っても地図は何も変わらず、横の数字を読むしかありませんでした。持っている町に自分の色の輪が付くようになりました。",
      ),
      t(
        "Own every business in a town and the ring doubles and thickens — you can spot your monopolies across the whole board at a glance.|Si posees todos los negocios de una ciudad, el anillo se dobla y engrosa: tus monopolios se ven de un vistazo.|Possédez tous les commerces d'une ville et l'anneau double et s'épaissit : vos monopoles se repèrent d'un coup d'œil.|町の物件をすべてそろえると輪が太い二重になります。独占した町が盤面のどこにあっても一目で分かります。",
      ),
      t(
        "Where two travellers own the same number in one town, it stays uncoloured — it would be a lie to paint it as anyone's.|Si dos viajeros tienen lo mismo en una ciudad, esta queda sin color: pintarla de uno sería mentir.|Si deux voyageurs en possèdent autant l'un que l'autre, la ville reste incolore : la peindre serait mentir.|2人が同じ数だけ持っている町には色を付けません。どちらかの色で塗ると、盤面が実際より偏って見えてしまうからです。",
      ),
    ],
  },
  {
    version: "0.12.1",
    date: "2026-08-07",
    title: t(
      "The map reads properly now|Ahora el mapa se lee bien|La carte se lit enfin correctement|地図が読みやすくなりました",
    ),
    highlights: [
      t(
        "The lines were supposed to run only up, across or at 45° — but only 5% of them actually did. Now every single one does, on all five boards.|Las líneas debían ir solo en vertical, horizontal o a 45°, pero solo el 5% lo hacía. Ahora lo hacen todas, en los cinco tableros.|Les lignes ne devaient aller qu'à la verticale, à l'horizontale ou à 45° — seules 5 % le faisaient. Désormais toutes, sur les cinq plateaux.|線路は縦・横・45度だけで引くはずが、実際にそうなっていたのは5%だけでした。5つの盤面すべてで、全部の線がそうなりました。",
      ),
      t(
        "Around Osaka and Kyoto the squares were sitting on top of the town markers, hiding them. They now slide along the line instead.|Cerca de Osaka y Kioto las casillas tapaban las ciudades. Ahora se desplazan a lo largo de la vía.|Autour d'Osaka et de Kyoto, les cases masquaient les villes. Elles glissent maintenant le long de la voie.|大阪や京都のあたりで、マスが町の印の上に乗って隠していました。線路の上を滑ってよけるようにしました。",
      ),
      t(
        "France was drawn half again too tall. It is a country almost as wide as it is high, and now it looks like one.|Francia se dibujaba una vez y media más alta de lo debido. Es casi tan ancha como alta, y ahora lo parece.|La France était dessinée une fois et demie trop haute. Elle est presque aussi large que haute, et cela se voit enfin.|フランスの形が縦に1.5倍伸びていました。横と縦がほぼ同じ長さの国なので、そう見えるようになりました。",
      ),
      t(
        "The white patch on Hokkaidō had green spikes poking out of it and meant nothing. It now follows the shape of the island — it is the snow country.|La mancha blanca de Hokkaidō tenía picos verdes y no significaba nada. Ahora sigue la forma de la isla: es el país de la nieve.|La tache blanche d'Hokkaidō laissait dépasser des pointes vertes sans rien vouloir dire. Elle épouse désormais l'île : c'est le pays de la neige.|北海道の白い部分から緑がとげのようにはみ出していて、何を表しているのか分からない模様になっていました。島の形に合わせ、雪国だと分かるようにしました。",
      ),
    ],
  },
  {
    version: "0.12.0",
    date: "2026-08-07",
    title: t(
      "France and the world start moving|Francia y el mundo se ponen en marcha|La France et le monde s'animent|フランスと世界一周も動き出しました",
    ),
    highlights: [
      t(
        "The two newest boards were still standing still. Now every month, every town, every misfortune and every thing that can happen to you has a picture that moves — 94 new ones.|Los dos tableros más nuevos estaban quietos. Ahora cada mes, cada ciudad, cada desgracia y cada suceso tiene una imagen que se mueve: 94 nuevas.|Les deux plateaux les plus récents restaient immobiles. Désormais chaque mois, chaque ville, chaque malheur et chaque événement a une image animée : 94 nouvelles.|新しい2つの盤面だけが止まったままでした。月替わり・町・厄災・道中の出来事、そのすべてに動く絵が付きました。全94本。",
      ),
      t(
        "On the world board seven of the twelve months are split down the middle, because the hemispheres disagree: cherry blossom on one side and the grape harvest on the other, snow in one half and a beach in the other.|En el tablero mundial, siete de los doce meses se parten por la mitad porque los hemisferios no coinciden: cerezos a un lado y vendimia al otro.|Sur le plateau mondial, sept des douze mois sont coupés en deux, les hémisphères étant en désaccord : cerisiers d'un côté, vendanges de l'autre.|世界一周では12ヶ月のうち7ヶ月が画面の真ん中で割れています。南北で言い分が違うからです。片側で桜が咲き、反対側でぶどうを摘む。片側は雪の市で、反対側は浜辺です。",
      ),
      t(
        "August on the world board is the doldrums: the sails hang flat, the sea turns to a mirror, and even the misfortune spirit cannot move.|Agosto en el tablero mundial es la calma ecuatorial: las velas cuelgan, el mar es un espejo y ni el espíritu puede moverse.|En août, c'est le pot-au-noir : les voiles pendent, la mer devient un miroir, et même l'esprit du malheur ne peut bouger.|世界一周の8月は赤道の無風帯です。帆は垂れ、海は鏡になり、厄災の神まで動けません。",
      ),
      t(
        "In France, Easter begins with the bells flying off to Rome — in the old story it is the bells, not a rabbit, that bring the eggs back.|En Francia, la Pascua empieza con las campanas volando a Roma: en el cuento son ellas, no un conejo, las que traen los huevos.|En France, Pâques commence par les cloches qui s'envolent vers Rome — ce sont elles, non un lapin, qui rapportent les œufs.|フランスの4月は、鐘がローマへ飛んでいくところから始まります。卵を運んでくるのは兎ではなく鐘だ、という言い伝えです。",
      ),
    ],
  },
  {
    version: "0.11.0",
    date: "2026-08-07",
    title: t(
      "Around the World|La vuelta al mundo|Le tour du monde|世界一周がはじまりました",
    ),
    highlights: [
      t(
        "A fifth board, and the first that is not a country: 60 cities on six continents, 40 new questions, and 90 routes — 50 by land, 40 by sea.|Un quinto tablero, el primero que no es un país: 60 ciudades en seis continentes, 40 preguntas y 90 rutas (50 por tierra, 40 por mar).|Un cinquième plateau, le premier qui n'est pas un pays : 60 villes sur six continents, 40 questions et 90 liaisons (50 par voie de terre, 40 par mer).|5つ目の盤面は、はじめて国ではありません。6大陸60都市、新作クイズ40問、路線90本(陸路50・航路40)。",
      ),
      t(
        "Where the land runs on, you take the train — Moscow to Ulaanbaatar is the Trans-Siberian, and Cairo to Jerusalem crosses the Sinai. Everywhere else you take a ship.|Donde hay tierra, se va en tren: Moscú–Ulán Bator es el Transiberiano. En el resto, en barco.|Là où la terre continue, on prend le train : Moscou–Oulan-Bator, c'est le Transsibérien. Partout ailleurs, le bateau.|陸が続いているところは鉄道で行きます。モスクワからウランバートルはシベリア鉄道、カイロからエルサレムはシナイ半島越えです。それ以外は船旅になります。",
      ),
      t(
        "Because the hemispheres run opposite, no month is good everywhere. July empties Europe and North America while the great migration fills East Africa; December is snow in one half and swimming in the other.|Como los hemisferios van al revés, ningún mes es bueno en todas partes: julio vacía Europa mientras la gran migración llena África oriental.|Les hémisphères étant inversés, aucun mois n'est bon partout : juillet vide l'Europe tandis que la grande migration remplit l'Afrique de l'Est.|南半球と北半球で季節が逆なので、どの月も「どこかが盛りで、どこかが端境期」になります。7月はヨーロッパと北アメリカが休みに入る一方、東アフリカは大移動の季節です。12月は片側が雪で、反対側は海水浴です。",
      ),
      t(
        "The spirit of misfortune here is the Flying Dutchman, the ship that swore to round the Cape whatever came and was never let into port again. His charm is a Saint Christopher medal.|El espíritu de la desgracia es el Holandés Errante. El amuleto es una medalla de San Cristóbal.|L'esprit du malheur est le Hollandais volant. L'amulette est une médaille de saint Christophe.|厄災の神はさまよえるオランダ人。何があろうと喜望峰を回ると誓い、二度と港に入れてもらえなくなった船です。お守りは聖クリストフォロスのメダイ。",
      ),
    ],
  },
  {
    version: "0.10.0",
    date: "2026-08-07",
    title: t(
      "A new departure board|Un nuevo tablero de salidas|Un nouveau tableau des départs|入口をつくり直しました",
    ),
    highlights: [
      t(
        "The first screen now has a train on it. It runs along a dawn ridge, and the golden track ahead of the locomotive is still being laid — the journey you are about to choose.|La primera pantalla tiene ahora un tren que corre al amanecer, con la vía dorada aún tendiéndose por delante.|Le premier écran a maintenant un train qui roule à l'aube, la voie dorée devant lui restant à poser.|最初の画面に汽車が走るようになりました。夜明けの丘を行き、機関車の前には金色の線路がこれから敷かれていきます。これから選ぶ旅です。",
      ),
      t(
        "Choosing a country is now a grid of maps instead of a long list, so you can see every board at once.|Elegir país es ahora una cuadrícula de mapas en vez de una lista larga: se ven todos los tableros a la vez.|Le choix du pays est désormais une grille de cartes plutôt qu'une longue liste : tous les plateaux d'un coup d'œil.|国選びが縦長の一覧から地図のグリッドになり、どの盤面も一目で見渡せます。",
      ),
      t(
        "The settings are sorted into who is riding and the house rules, and the empty fourth seat is hidden until you ask for it. Three travellers and one tap is enough to leave.|Los ajustes se agrupan en quién viaja y las reglas; el cuarto asiento vacío se oculta. Basta un toque para salir.|Les réglages sont regroupés en qui voyage et les règles ; le quatrième siège vide reste caché. Un seul geste suffit pour partir.|設定を「だれが乗る?」と「ルール」に分け、空いている4人目の席は必要になるまで出しません。3人のまま、ひと押しで出発できます。",
      ),
      t(
        "If you prefer things to hold still, the train stops when your device asks for reduced motion.|Si prefieres que nada se mueva, el tren se detiene cuando el dispositivo pide menos movimiento.|Si vous préférez l'immobilité, le train s'arrête lorsque l'appareil demande moins d'animations.|動きが少ないほうがよい設定にしている場合は、汽車も止まります。",
      ),
    ],
  },
  {
    version: "0.9.0",
    date: "2026-08-07",
    title: t("France joins the map|Francia se suma al mapa|La France rejoint la carte|フランスが加わりました"),
    highlights: [
      t(
        "A fourth country: France, with 50 towns from Lille to Ajaccio, a sea crossing to Corsica, 40 new questions and 16 things that can happen to you on the road.|Un cuarto país: Francia, con 50 ciudades de Lille a Ajaccio, travesía a Córcega, 40 preguntas y 16 sucesos.|Un quatrième pays : la France, 50 villes de Lille à Ajaccio, une traversée vers la Corse, 40 questions et 16 événements.|4か国目としてフランスを追加しました。リールからアジャクシオまで50都市、コルシカへの航路、新作クイズ40問、道中で起きる出来事16件。",
      ),
      t(
        "The misfortune spirit here is the Ankou of Brittany — not death itself but death's servant, who in the old tales collects souls in a cart. The charm that wards him off is a blessed sprig of box, handed out on Palm Sunday where no palm will grow.|El espíritu de la desgracia es el Ankou bretón, el sirviente de la muerte. El amuleto es una rama de boj bendecida.|L'esprit du malheur est l'Ankou breton, non la mort mais son serviteur. L'amulette est un rameau de buis béni.|厄災の神はブルターニュのアンクー。死そのものではなく「死の下働き」で、荷車で魂を迎えに行くと伝わります。お守りは祝別された黄楊の枝 — 棕櫚が育たない土地で、枝の主日に配られるものです。",
      ),
      t(
        "In August the whole country goes on holiday: Paris earns less, the Mediterranean earns far more, and even the misfortune spirit takes the month off.|En agosto el país entero se va de vacaciones: París gana menos, el Mediterráneo mucho más, y hasta el espíritu descansa.|En août, tout le pays part en vacances : Paris gagne moins, la Méditerranée bien plus, et même l'esprit du malheur prend congé.|8月は国じゅうがヴァカンスに出ます。パリの実入りは減り、地中海は大きく増え、厄災の神まで休みます。",
      ),
    ],
  },
  {
    version: "0.8.0",
    date: "2026-08-07",
    title: t("The towns come alive|Los pueblos cobran vida|Les villes s'animent|町が動き出しました"),
    highlights: [
      t(
        "Every town illustration now moves. Waves roll into the harbours, steam rises from the hot springs, snow falls on the northern towns, city windows flicker, and condors glide over the valleys — 43 scenes in all.|Todas las ilustraciones de ciudad se mueven ahora: olas, vapor, nieve, ventanas que parpadean y cóndores. 43 escenas.|Toutes les illustrations de ville s'animent : vagues, vapeur, neige, fenêtres qui clignotent et condors. 43 scènes.|都市のイラストがすべて動くようになりました。港には波が寄せ、温泉からは湯気が立ち、北国には雪が降り、街の窓は明滅し、谷をコンドルが滑空します。全43種類。",
      ),
      t(
        "The original artwork is untouched — the movement is a thin layer laid over it, so the pictures you knew are still there.|El arte original no se ha tocado: el movimiento es una capa fina sobre él.|Les illustrations d'origine sont intactes : le mouvement est une fine couche posée par-dessus.|元の絵はそのままです。動きは上に重ねた薄い層なので、これまでの絵はそのまま残っています。",
      ),
    ],
  },
  {
    version: "0.7.0",
    date: "2026-08-07",
    title: t("The season decides what happens|La estación decide lo que pasa|La saison décide de ce qui arrive|季節によって起きることが変わります"),
    highlights: [
      t(
        "What happens on a blue or red square now depends on the month as well as the region. Drift ice only strands you in winter, the salmon run only pays in autumn, and cherry-blossom work only comes up in April.|Lo que ocurre en una casilla azul o roja depende ahora del mes además de la región: el hielo a la deriva solo en invierno, el salmón solo en otoño.|Ce qui arrive sur une case bleue ou rouge dépend désormais du mois autant que de la région : la banquise en hiver seulement, le saumon en automne.|青マス・赤マスで起きることが、地方だけでなく月にも左右されるようになりました。流氷で足止めされるのは冬だけ、鮭の水揚げで稼げるのは秋だけ、花見の場所取りは4月だけです。",
      ),
      t(
        "On the Sea of Japan side, winter now brings more misfortune than good luck — buried tracks and roof-clearing bills — while summer stays even.|En el lado del mar del Japón, el invierno trae ahora más desgracias que suertes; el verano se mantiene equilibrado.|Côté mer du Japon, l'hiver apporte désormais plus de malchance que de chance ; l'été reste équilibré.|日本海側の冬は、線路の埋没や雪下ろしの出費で、良いことより悪いことが多くなりました。夏は均衡したままです。",
      ),
    ],
  },
  {
    version: "0.6.2",
    date: "2026-08-07",
    title: t("Everything has a scene now|Todo tiene su escena|Chaque moment a sa scène|どの場面にも絵がつきました"),
    highlights: [
      t(
        "Departing, and answering a quiz, now have their own scene: a train pulling out at dawn with someone waving it off, and a circle or cross drawn on screen.|La salida y las respuestas del quiz tienen ahora su escena propia.|Le départ et les réponses au quiz ont désormais leur propre scène.|出発とクイズの正誤にも絵が付きました。夜明けの駅を列車が走り出し、見送る人が手を振ります。正誤は丸やバツが描かれます。",
      ),
      t(
        "When the misfortune spirit strikes, you now see what actually happened — a typhoon shutting the shops, a landslide taking the stall down the hillside, a hand slipping into your bag on a packed train. 21 scenes in all.|Cuando golpea la desgracia, ahora ves qué ha pasado: un tifón, un derrumbe, una mano en tu bolsa. 21 escenas.|Quand le malheur frappe, on voit désormais ce qui s'est passé : typhon, glissement de terrain, main dans le sac. 21 scènes.|厄災に見舞われたとき、何が起きたのかが絵で見えるようになりました。台風でシャッターが下りる、地滑りで店が流される、満員電車で荷物に手が伸びる、など21種類。",
      ),
    ],
  },
  {
    version: "0.6.0",
    date: "2026-08-07",
    title: t("Things that happen to you|Cosas que te pasan|Ce qui vous arrive|旅で起きること"),
    highlights: [
      t(
        "Blue and red squares are back, but the money no longer moves at random. You get a short story from that region — the drift ice comes early and the ferry is cancelled, a zebra-suited traffic marshal in La Paz returns your dropped bag, a chai seller refuses payment because you are the first customer of the day.|Vuelven las casillas azules y rojas, pero el dinero ya no cambia al azar: ocurre algo propio de esa región.|Les cases bleues et rouges reviennent, mais l'argent ne bouge plus au hasard : il vous arrive quelque chose de propre à cette région.|青マス・赤マスが戻りました。ただし金額はもう運任せではなく、その地方で起こりそうな出来事が起きます。流氷が早く来て船が欠航する、ラパスでシマウマ姿の交通整理に落とし物を拾ってもらう、初商いの客だからとチャイ代を取ってもらえない、など。",
      ),
      t(
        "Everything now moves. 49 events, 36 monthly seasons, the arrival at your destination and the prize-giving all have their own short animation.|Ahora todo se mueve: 49 sucesos, 36 meses, la llegada al destino y la entrega de premios tienen su propia animación.|Tout s'anime : 49 événements, 36 mois, l'arrivée à destination et la remise des prix ont chacun leur animation.|絵が動くようになりました。出来事49件、月ごとの季節36件、目的地への到着、表彰式に、それぞれ専用のアニメーションが付きます。",
      ),
      t(
        "The game now ends with a prize-giving. Awards like Quiz Master and Great Traveller are revealed one at a time, so nobody knows who won until the very last card.|La partida termina con una entrega de premios que se revelan de uno en uno: nadie sabe quién ha ganado hasta el final.|La partie s'achève par une remise des prix dévoilés un à un : nul ne sait qui a gagné avant la toute fin.|ゲームの終わりに表彰式が入りました。クイズ王・旅の達人などの賞を1つずつめくっていくので、最後の1枚まで誰が勝ったか分かりません。",
      ),
      t(
        "Rail lines now run only up, across or at 45°, which makes the board far easier to read.|Las vías van solo en vertical, horizontal o a 45°, lo que hace el tablero mucho más legible.|Les voies ne suivent que la verticale, l'horizontale ou 45°, ce qui rend le plateau bien plus lisible.|線路が縦・横・45度の3方向だけになり、盤面がぐっと見やすくなりました。",
      ),
      t(
        "You can now change language from inside a pop-up, so you can re-read a story in your own language.|Ahora puedes cambiar de idioma dentro de una ventana para releer en tu lengua.|Tu peux changer de langue depuis une fenêtre pour relire dans ta langue.|モーダルの中でも言語を切り替えられます。読み物を自分の言語で読み直せます。",
      ),
      t(
        "The dice roll stays on screen while you choose where to stop, and the dice now land with a thump and a puff of dust.|El resultado del dado permanece mientras eliges dónde parar, y los dados caen con polvo.|Le résultat du dé reste affiché pendant que tu choisis, et les dés atterrissent dans un nuage de poussière.|行き先を選んでいるあいだ出目が残るようになり、サイコロは砂ぼこりを上げて着地します。",
      ),
      t(
        "Item prices were rebalanced — no item is a guaranteed profit any more.|Se han reequilibrado los precios: ningún objeto da ya beneficio garantizado.|Les prix des objets ont été rééquilibrés : aucun n'est plus un profit garanti.|アイテムの値段を見直しました。買うだけで確実に得をするアイテムは無くなりました。",
      ),
      t(
        "Map fixes: Honshū, Shikoku and Kyūshū are separate islands again, and every town now sits on land.|Correcciones del mapa: Honshū, Shikoku y Kyūshū vuelven a ser islas separadas y todas las ciudades están en tierra firme.|Corrections de carte : Honshū, Shikoku et Kyūshū sont de nouveau séparées, et chaque ville est sur la terre ferme.|地図の修正: 本州・四国・九州が再びそれぞれの島になり、すべての町が陸の上に乗りました。",
      ),
    ],
  },
  {
    version: "0.5.0",
    date: "2026-08-06",
    title: t("Japan, town by town|Japón, pueblo a pueblo|Le Japon, ville par ville|町の単位で見る日本"),
    highlights: [
      t(
        "Japan now has 151 towns instead of 74. Alongside the prefectural capitals you can now stop at Tsukuba, Ōarai, Hiraizumi, Ginzan Onsen, Shirakawa-gō, Kamikōchi, Uji, Miyajima, Naoshima, Dazaifu, Aso, Chiran and many more.|Japón pasa de 74 a 151 ciudades. Junto a las capitales ahora puedes parar en Tsukuba, Ōarai, Hiraizumi, Shirakawa-gō, Uji, Miyajima, Naoshima, Dazaifu, Aso y muchas más.|Le Japon passe de 74 à 151 villes. Outre les préfectures, on s'arrête désormais à Tsukuba, Ōarai, Hiraizumi, Shirakawa-gō, Uji, Miyajima, Naoshima, Dazaifu, Aso et bien d'autres.|日本の都市が74から151になりました。県庁所在地に加えて、つくば・大洗・平泉・銀山温泉・白川郷・上高地・宇治・宮島・直島・太宰府・阿蘇・知覧などに立ち寄れます。",
      ),
      t(
        "Each new town has its own story to read when you land there — why the roofs are that steep, why the gods gather there in October, why the town refused to modernise.|Cada nueva ciudad trae su historia al llegar: por qué los tejados son tan inclinados, por qué los dioses se reúnen allí en octubre.|Chaque nouvelle ville a son histoire à lire en y arrivant : pourquoi les toits sont si pentus, pourquoi les dieux s'y réunissent en octobre.|新しい町にはそれぞれ読みものが付いています。なぜ屋根がこれほど急なのか、なぜ十月に神々が集まるのか、なぜ近代化を拒んだのか。",
      ),
      t(
        "The board was widened to match, so the extra towns have room to breathe rather than piling on top of each other.|El tablero se ha ampliado para que las nuevas ciudades tengan espacio y no se amontonen.|Le plateau a été élargi pour que les nouvelles villes respirent au lieu de s'empiler.|盤面もそのぶん広げたので、増えた町が重なり合わずに収まります。",
      ),
      t(
        "The far south-west islands — Ishigaki, Taketomi and Yonaguni — were being drawn off the edge of the board and are now on it.|Las islas del suroeste — Ishigaki, Taketomi y Yonaguni — se dibujaban fuera del tablero y ahora aparecen en él.|Les îles du sud-ouest — Ishigaki, Taketomi et Yonaguni — étaient dessinées hors du plateau ; elles y figurent désormais.|先島諸島(石垣島・竹富島・与那国島)が盤面の外に描かれていたのを直しました。",
      ),
    ],
  },
  {
    version: "0.4.0",
    date: "2026-08-06",
    title: t("India, and a board you can see|India, y un tablero que se ve entero|L'Inde, et un plateau entièrement visible|インドと、全体が見える盤面"),
    highlights: [
      t(
        "A third country: India, with 60 towns from Leh to Kanyakumari, sea routes to the Andaman and Lakshadweep islands, and 42 new questions.|Un tercer país: la India, con 60 ciudades de Leh a Kanyakumari, rutas marítimas a Andamán y Lakshadweep, y 42 preguntas nuevas.|Un troisième pays : l'Inde, 60 villes de Leh à Kanyakumari, des routes maritimes vers Andaman et Lakshadweep, et 42 nouvelles questions.|3か国目としてインドを追加しました。レーからカニヤークマリまで60都市、アンダマン諸島やラクシャドウィープ諸島への航路、新作クイズ42問。",
      ),
      t(
        "Japan gained 13 island towns reached by sea — from Izu Ōshima and Sado to Amami, Yakushima and Ishigaki — plus 10 more towns in Hokkaidō.|Japón suma 13 ciudades isleñas a las que se llega por mar — de Izu Ōshima y Sado a Amami, Yakushima e Ishigaki — y 10 ciudades más en Hokkaidō.|Le Japon gagne 13 villes insulaires desservies par bateau — d'Izu Ōshima et Sado à Amami, Yakushima et Ishigaki — et 10 villes de plus à Hokkaidō.|日本に、船で渡る島の町を13件(伊豆大島・佐渡から奄美・屋久島・石垣島まで)、北海道に10件を追加しました。",
      ),
      t(
        "Your piece is now a locomotive instead of a dot, so you can find yourself on a crowded map.|Tu ficha es ahora una locomotora en vez de un punto, para encontrarte en un mapa lleno.|Ton pion est désormais une locomotive plutôt qu'un point, pour te repérer sur une carte chargée.|自分の駒が丸から機関車になりました。マーカーの多い地図でも自分の位置が分かります。",
      ),
      t(
        "Items that roll two or three dice now show every die and the total, so the number you see always matches the squares you move.|Los objetos que lanzan dos o tres dados muestran todos los dados y el total: el número que ves coincide con las casillas que avanzas.|Les objets lançant deux ou trois dés les affichent tous avec le total : le nombre affiché correspond aux cases parcourues.|サイコロを2〜3個振るアイテムで、振った数と合計をそのまま表示するようにしました。見えている数と進むマス数が一致します。",
      ),
      t(
        "When a rival answers a question, only the result is shown — the question and answer stay hidden so they are not spoiled for you.|Cuando un rival responde, solo se muestra el resultado: la pregunta y la respuesta quedan ocultas para no destriparlas.|Quand un rival répond, seul le résultat s'affiche : la question et la réponse restent masquées.|CPUがクイズに答えたときは正誤だけを表示し、問題と解説は伏せるようにしました(答えを先に知ってしまわないように)。",
      ),
      t(
        "The whole map now fits in the window, and turning on \"whole map\" really shows all of it.|El mapa entero cabe en la ventana y «mapa completo» muestra de verdad todo el tablero.|La carte entière tient dans la fenêtre, et « carte entière » montre vraiment tout le plateau.|地図全体が画面に収まるようになり、「全体表示」で盤面の端まで見えるようになりました。",
      ),
      t(
        "If your system asks for reduced motion, the dice now settle at once instead of tumbling.|Si tu sistema pide menos movimiento, los dados se posan al instante en vez de rodar.|Si votre système demande moins d'animations, les dés se posent aussitôt au lieu de rouler.|OSの「視差効果を減らす」設定が有効なときは、サイコロが転がる演出を省いてすぐ結果を出します。",
      ),
    ],
  },
  {
    version: "0.3.0",
    date: "2026-08-06",
    title: t("Learning, properly|Aprender de verdad|Vraiment apprendre|ちゃんと学べるように"),
    highlights: [
      t(
        "Answering a quiz now always shows the correct answer and the explanation — even when you get it right.|Al responder ahora siempre se muestra la respuesta correcta y la explicación, incluso si aciertas.|Après chaque question, la bonne réponse et l'explication s'affichent — même en cas de réussite.|クイズに答えると、正解と解説が必ず表示されるようになりました(正解したときも)。",
      ),
      t(
        "At the end of the journey you get a review of every question the table got wrong.|Al final del viaje verás un repaso de todas las preguntas falladas en la mesa.|En fin de voyage, un récapitulatif de toutes les questions ratées à la table.|旅の終わりに、その卓で間違えた問題をおさらいできるようになりました。",
      ),
      t(
        "Questions no longer repeat until the whole set has been used.|Las preguntas ya no se repiten hasta agotar el conjunto.|Les questions ne se répètent plus avant d'avoir toutes été posées.|同じ問題が続けて出ないようになりました(ひと通り出るまで重複しません)。",
      ),
      t(
        "Each player can now say how well they know the country. Newcomers get two choices instead of three and bigger rewards; locals earn less and risk more.|Cada jugador indica cuánto conoce el país: quien es nuevo elige entre dos opciones y gana más; quien lo conoce bien gana menos y arriesga más.|Chaque joueur indique s'il connaît le pays : les novices ont deux choix et gagnent plus, les connaisseurs gagnent moins et risquent plus.|プレイヤーごとに「この国をどれくらい知っているか」を選べます。はじめての人は3択が2択になり賞金も多め、くわしい人は賞金が控えめで損失は重めになります。",
      ),
      t(
        "Lucky charms now absorb the loss instead of turning a wrong answer into a right one, so you always know when you missed.|Los amuletos ahora absorben la pérdida en vez de convertir un fallo en acierto, así siempre sabes si fallaste.|Les amulettes absorbent désormais la perte au lieu de transformer une erreur en réussite : tu sais toujours quand tu t'es trompé.|お守りは「不正解を正解に変える」のをやめ、損失を肩代わりするだけになりました。自分が間違えたことが分かるようになります。",
      ),
    ],
  },
  {
    version: "0.2.0",
    date: "2026-08-06",
    title: t("A bigger board and livelier rivals|Un tablero mayor y rivales más vivos|Un plateau plus grand, des rivaux plus vivants|広い盤面と、動きの見える対戦相手"),
    highlights: [
      t(
        "Japan now has at least one town in every prefecture (30 → 52), including Mito, Kawagoe, Hikone, Kōyasan and Hagi.|Japón tiene ahora al menos una ciudad por prefectura (30 → 52), incluidas Mito, Kawagoe, Hikone, Kōyasan y Hagi.|Le Japon compte désormais au moins une ville par préfecture (30 → 52), dont Mito, Kawagoe, Hikone, Kōyasan et Hagi.|日本の都市が全47都道府県をカバーしました(30→52都市)。水戸・川越・彦根・高野山・萩などを追加。",
      ),
      t(
        "The maps were redrawn to follow the real coastlines and borders more closely.|Los mapas se han redibujado siguiendo mejor las costas y fronteras reales.|Les cartes ont été redessinées pour suivre de plus près les côtes et frontières réelles.|地図の形を実際の海岸線・国境に近づけました。",
      ),
      t(
        "You can drag the map to look around and zoom with the wheel. Town names no longer overlap.|Puedes arrastrar el mapa y hacer zoom con la rueda. Los nombres ya no se solapan.|Tu peux faire glisser la carte et zoomer à la molette. Les noms ne se chevauchent plus.|地図をドラッグで動かせるようになり、ホイールで拡大縮小もできます。都市名が重ならなくなりました。",
      ),
      t(
        "On the rivals' turns you now see the dice roll, the move, and exactly what they bought.|En los turnos de los rivales verás la tirada, el movimiento y qué compraron exactamente.|Pendant le tour des rivaux, tu vois le lancer, le déplacement et ce qu'ils ont acheté.|CPUの手番でも、サイコロ・移動・何を買ったのかが見えるようになりました。",
      ),
      t(
        "The language can be changed during a game, and the travel log is translated too.|Se puede cambiar el idioma durante la partida, y el registro también se traduce.|La langue peut être changée en cours de partie, et le journal est aussi traduit.|ゲーム中でも言語を切り替えられるようになりました。旅の記録も翻訳されます。",
      ),
      t(
        "Money is shown in each country's currency (Bs 1,200 / ¥120,000).|El dinero se muestra en la moneda de cada país (Bs 1.200 / ¥120 000).|L'argent s'affiche dans la monnaie du pays (Bs 1 200 / ¥120 000).|金額が国ごとの通貨表記になりました(Bs 1,200 / ¥120,000)。",
      ),
    ],
  },
  {
    version: "0.1.0",
    date: "2026-08-05",
    title: t("First journey|Primer viaje|Premier voyage|最初の旅"),
    highlights: [
      t(
        "Two countries to travel — Bolivia and Japan — in four languages.|Dos países para viajar — Bolivia y Japón — en cuatro idiomas.|Deux pays à parcourir — Bolivie et Japon — en quatre langues.|ボリビアと日本の2ヶ国を、4言語で旅できます。",
      ),
      t(
        "Music that changes with the region, sound effects, and a rolling 3D die.|Música que cambia según la región, efectos de sonido y un dado 3D.|Une musique qui change selon la région, des effets sonores et un dé 3D.|地方によって変わる音楽、効果音、3Dのサイコロ。",
      ),
      t(
        "Towns tell their story and sell businesses; buy every business in a town to double its income.|Los pueblos cuentan su historia y venden negocios; cómpralos todos para duplicar la renta.|Les villes racontent leur histoire et vendent des affaires ; achète-les toutes pour doubler le revenu.|町では解説を読み、物件を買えます。町の物件を全部買うと収入が2倍に。",
      ),
      t(
        "Your journey is saved in this browser, so you can continue later.|Tu viaje se guarda en este navegador para continuar más tarde.|Ton voyage est enregistré dans ce navigateur pour reprendre plus tard.|旅はブラウザに保存され、あとから続きから遊べます。",
      ),
    ],
  },
];

/** ビルド時に埋め込まれたバージョン(`next.config.ts` 参照)。 */
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
/** ビルド時のコミット(Vercel以外では空)。 */
export const APP_COMMIT = process.env.NEXT_PUBLIC_APP_COMMIT ?? "";
