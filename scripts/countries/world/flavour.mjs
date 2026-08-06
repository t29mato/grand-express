/**
 * 世界一周の国情報・地方区分・アイテム・厄災の神・災難・季節イベント。
 *
 * 世界規模なので、季節は「北半球と南半球で逆になる」ことを軸に組んでいる
 * (4月始まりの12ヶ月なのは他国と同じ)。8月は赤道の無風帯で船が止まる月に
 * あて、厄災の神もそこで足を止める。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const WORLD_META = {
  id: "world",
  name: t("Around the World|La vuelta al mundo|Le tour du monde|世界一周"),
  blurb: t(
    "Liners, night trains, and one day handed back at the date line|Transatlánticos, trenes nocturnos y un día devuelto en la línea de cambio de fecha|Paquebots, trains de nuit et un jour rendu à la ligne de changement de date|定期船と夜行列車と、日付変更線で返してもらう一日",
  ),
  // 大陸をまたぐので、どこでも通じる通貨記号にしている。
  cur: { pre: "$", post: "", mul: 100 },
  start: "london",
  // 長い航海をした船の名前から。
  cpuNames: ["ヴィクトリア Victoria", "ビーグル Beagle", "スプレー Spray", "エンデバー Endeavour"],
  // 海の青、帆布の生成り、赤道の赤、大陸の緑、砂漠の黄。
  stripe: ["#2f6f9f", "#f6efe2", "#e8443f", "#3f8f5f", "#f5b31c"],
};

export const WORLD_REGIONS = {
  eur: t("Europe|Europa|L'Europe|ヨーロッパ"),
  asi: t("Asia|Asia|L'Asie|アジア"),
  afr: t("Africa & the Middle East|África y Oriente Medio|L'Afrique et le Moyen-Orient|アフリカ・中東"),
  nam: t("North America|América del Norte|L'Amérique du Nord|北アメリカ"),
  sam: t("South America|América del Sur|L'Amérique du Sud|南アメリカ"),
  oce: t("Oceania & the Pacific|Oceanía y el Pacífico|L'Océanie et le Pacifique|オセアニア・太平洋"),
};

/**
 * アイテム。効果の種類は他国と同じ9種で、名前だけがその国のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const WORLD_ITEMS = {
  zeppelin: {
    e: "🛩️",
    price: 560,
    kind: "move",
    n: t("The Graf Zeppelin|El Graf Zeppelin|Le Graf Zeppelin|ツェッペリン伯号"),
    d: t(
      "Fly straight to the destination.|Vuela directo al destino.|Vole droit au but.|目的地へ一気に飛ぶ。",
    ),
    f: t(
      "In August 1929 the Graf Zeppelin went round the world in twenty-one days with only three stops: Friedrichshafen, Tokyo and Los Angeles. A newspaper owner paid half the cost, on condition that the flight began and ended at Lakehurst in New Jersey so that it would be an American story.|En agosto de 1929 el Graf Zeppelin dio la vuelta al mundo en veintiún días con solo tres escalas: Friedrichshafen, Tokio y Los Ángeles. Un dueño de periódicos pagó la mitad del viaje a condición de que saliera y llegara a Lakehurst, en Nueva Jersey, para que la historia fuese norteamericana.|En août 1929, le Graf Zeppelin fit le tour du monde en vingt et un jours avec trois escales seulement : Friedrichshafen, Tokyo et Los Angeles. Un patron de presse en paya la moitié, à condition que le vol parte et revienne à Lakehurst, dans le New Jersey, pour que l'exploit soit américain.|1929年8月、ツェッペリン伯号はフリードリヒスハーフェン・東京・ロサンゼルスの三か所に降りただけで、21日で世界を一周しました。費用の半分は新聞社主が出しており、その条件は「アメリカの話」にするため、ニュージャージー州レイクハーストを発着地にすることでした。",
    ),
  },
  chronometer: {
    e: "🕰️",
    price: 400,
    kind: "pre",
    n: t("Marine Chronometer|Cronómetro de marina|Chronomètre de marine|航海用クロノメーター"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "On an eighty-one-day crossing to Jamaica in 1761 John Harrison's fourth timekeeper lost about five seconds, which puts a ship within a few kilometres of where it really is. Until then a captain's east–west position was dead reckoning and argument.|En una travesía de ochenta y un días a Jamaica, en 1761, el cuarto reloj de John Harrison se atrasó unos cinco segundos: eso sitúa un barco a pocos kilómetros de donde está de verdad. Hasta entonces la posición este-oeste era estima y discusión.|Lors d'une traversée de quatre-vingt-un jours vers la Jamaïque, en 1761, la quatrième horloge de John Harrison perdit environ cinq secondes : de quoi situer un navire à quelques kilomètres près. Jusque-là, la position est-ouest relevait de l'estime et de la dispute.|1761年、81日かけたジャマイカ航海で、ジョン・ハリソンの四番目の時計が狂ったのは5秒ほど。船の位置を数キロの誤差で言い当てられる精度です。それまで東西の位置は推測航法と船内の議論で決まっていました。",
    ),
  },
  mailsteamer: {
    e: "🚢",
    price: 360,
    kind: "pre",
    n: t("The Mail Steamer|El vapor correo|Le paquebot-poste|郵便定期船"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The first regular ocean lines were paid for by mail contracts, not passengers: a government paid by the voyage on condition the ship sailed on a fixed day, full or empty. When the Suez Canal opened in 1869 the London–Bombay mail went from months to weeks.|Las primeras líneas regulares las pagó el correo, no el pasaje: un gobierno pagaba por viaje a condición de que el barco zarpase el día fijado, lleno o vacío. Al abrirse el canal de Suez en 1869, el correo Londres-Bombay pasó de meses a semanas.|Les premières lignes régulières furent payées par le courrier, non par les passagers : l'État payait au voyage, à condition que le navire parte le jour dit, plein ou vide. À l'ouverture du canal de Suez en 1869, la poste Londres-Bombay passa de plusieurs mois à quelques semaines.|最初の定期航路を支えたのは乗客ではなく郵便契約でした。政府は一航海いくらで払う代わりに、船が満員でも空でも決まった日に出ることを求めたのです。1869年にスエズ運河が開くと、ロンドン=ボンベイ間の郵便は数か月から数週間になりました。",
    ),
  },
  blueriband: {
    e: "🏆",
    price: 640,
    kind: "pre",
    n: t("The Blue Riband|La Cinta Azul|Le Ruban bleu|ブルーリボン(大西洋最速)"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "In July 1952 the liner United States crossed from New York to Cornwall in three days, ten hours and forty minutes, and no ship has taken the record since. For most of a century the Blue Riband was only a phrase in the newspapers; nobody offered an actual trophy for it until 1935.|En julio de 1952 el transatlántico United States cruzó de Nueva York a Cornualles en tres días, diez horas y cuarenta minutos, y nadie le ha quitado la marca. Durante casi un siglo la Cinta Azul fue solo una expresión de los periódicos: hasta 1935 no hubo trofeo alguno.|En juillet 1952, le paquebot United States relia New York aux Cornouailles en trois jours, dix heures et quarante minutes ; personne ne lui a repris le record. Pendant près d'un siècle, le Ruban bleu ne fut qu'une expression de journaux : aucun trophée ne fut offert avant 1935.|1952年7月、定期船ユナイテッド・ステーツはニューヨークからコーンウォールまでを3日10時間40分で渡り、以後その記録は破られていません。「ブルーリボン」は一世紀近いあいだ新聞の言い回しにすぎず、実物のトロフィーが用意されたのは1935年でした。",
    ),
  },
  christopher: {
    e: "📿",
    price: 320,
    kind: "passive",
    n: t("St Christopher's Medal|La medalla de San Cristóbal|La médaille de saint Christophe|聖クリストフォロスのメダイ"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The story says he carried a child across a river and the child grew heavier at every step, which is why travellers took him for their own saint. Rome removed his feast from the universal calendar in 1969 because so little about him is certain, and drivers went on hanging the medal from the mirror.|Cuenta la leyenda que llevó a un niño a través de un río y que el niño pesaba más a cada paso: por eso los viajeros lo tomaron por santo suyo. Roma quitó su fiesta del calendario universal en 1969 por lo poco que se sabe de él, y los conductores siguieron colgando la medalla del retrovisor.|La légende veut qu'il ait porté un enfant à travers une rivière et que l'enfant pesât davantage à chaque pas : c'est pourquoi les voyageurs en firent leur saint. Rome a retiré sa fête du calendrier universel en 1969, faute de certitudes à son sujet, et les automobilistes ont continué de suspendre la médaille au rétroviseur.|川を渡る子どもを背負ったところ、一歩ごとに重くなっていった——その話ゆえに、旅人は彼を自分たちの守護聖人としました。確かなことがあまりに少ないため1969年に一般暦から祝日が外されましたが、運転する人はその後もメダイをミラーに提げています。",
    ),
  },
  elmo: {
    e: "⚡",
    price: 440,
    kind: "pre",
    n: t("St Elmo's Fire|El fuego de San Telmo|Le feu de Saint-Elme|セントエルモの火"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "When the air is charged enough, a pale flame stands on the mastheads and hums; it is a corona discharge, and sailors read it as their patron showing himself once the worst of the storm had passed. Darwin watched it on the Beagle off the Río de la Plata and wrote home that the very masts were tipped with blue flame.|Cuando el aire se carga lo bastante, una llama pálida se posa en las puntas de los mástiles y zumba: es una descarga en corona, y los marinos la leían como su patrón mostrándose una vez pasado lo peor de la tormenta. Darwin la vio en el Beagle frente al Río de la Plata y escribió a casa que hasta los mástiles remataban en llama azul.|Quand l'air est assez chargé, une flamme pâle se pose en tête de mât et bourdonne : c'est une décharge de couronne, que les marins lisaient comme leur patron se montrant une fois le pire de la tempête passé. Darwin la vit sur le Beagle au large du Río de la Plata et écrivit que les mâts eux-mêmes s'achevaient en flamme bleue.|空気が十分に帯電すると、マストの先に青白い炎が立って低く鳴ります。これはコロナ放電で、船乗りたちは嵐の峠を越えた合図に守護聖人が姿を見せたのだと読みました。ダーウィンもビーグル号でラプラタ川の沖にこれを見て、マストの先まで青い炎が灯っていたと書き送っています。",
    ),
  },
  baedeker: {
    e: "📕",
    // クイズを外したときの損失(最大147)を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Baedeker Guide|Una guía Baedeker|Un guide Baedeker|ベデカーの旅行案内"),
    d: t(
      "Saves you once from a wrong quiz answer.|Te salva una vez de una respuesta equivocada.|Te sauve une fois d'une mauvaise réponse.|クイズを1回だけ間違えても正解扱いになる。",
    ),
    f: t(
      "The red books put stars beside what was worth the walk, and travellers trusted them so completely that anything without one went unvisited. Every volume printed a request for corrections, and the next edition was rewritten out of readers' letters.|Los libros rojos ponían estrellas junto a lo que merecía la caminata, y los viajeros se fiaban tanto que lo no señalado no se visitaba. Cada tomo pedía correcciones, y la edición siguiente se rehacía con las cartas de los lectores.|Les livres rouges mettaient des étoiles devant ce qui valait le détour, et les voyageurs s'y fiaient au point de ne rien regarder qui n'en eût pas. Chaque volume sollicitait des corrections, et l'édition suivante était refaite à partir des lettres des lecteurs.|赤い表紙の案内書は、見に行く価値のあるものに星を付けました。旅人はそれを信用しきっていて、星のないものは誰も見に行きませんでした。どの巻にも「間違いがあれば知らせてほしい」と刷ってあり、次の版は読者の手紙で書き直されたのです。",
    ),
  },
  posterestante: {
    e: "✉️",
    price: 280,
    kind: "pre",
    n: t("Poste Restante|Lista de correos|Poste restante|局留めの手紙"),
    d: t(
      "Turns up unexpected cash.|Aparece dinero inesperado.|Fait surgir de l'argent inattendu.|思いがけない収入が入る。",
    ),
    f: t(
      "Write to a traveller care of a city's head post office and the counter will keep the letter under their name for a month or two, then send it back. Before anyone could be reached on the move, this is where money and news caught up with them.|Escribe a un viajero a la lista de correos de una ciudad y el mostrador guardará la carta bajo su nombre uno o dos meses antes de devolverla. Antes de que se pudiera localizar a nadie en ruta, ahí era donde el dinero y las noticias los alcanzaban.|Écrivez à un voyageur en poste restante et le guichet gardera la lettre à son nom un mois ou deux avant de la renvoyer. Avant qu'on pût joindre quelqu'un en chemin, c'est là que l'argent et les nouvelles le rattrapaient.|旅先の人に宛てるときは、その街の中央郵便局に局留めで出します。窓口は名前ごとに一〜二か月保管し、来なければ差出人へ返します。移動中の人に連絡を取る手段がなかった時代、金も知らせもここで追いついたのです。",
    ),
  },
  dateline: {
    e: "🗓️",
    price: 420,
    kind: "pre",
    n: t("The Day You Gain|El día que ganas|Le jour gagné|もらえる一日"),
    d: t(
      "Take another turn straight away.|Juega otro turno de inmediato.|Rejoue aussitôt.|すぐにもう一手番行える。",
    ),
    f: t(
      "Go round the world eastward and you meet the sun one extra time, so you arrive a day before your own count of days says you can — the arithmetic that wins the wager in Around the World in Eighty Days. No treaty fixes the line where the date changes: Samoa stepped across it at the end of 29 December 2011 and simply never had a thirtieth.|Da la vuelta al mundo hacia el este y te sale un amanecer de más, así que llegas un día antes de lo que dice tu propia cuenta: es la aritmética que gana la apuesta en La vuelta al mundo en ochenta días. Ningún tratado fija la línea de cambio de fecha: Samoa la cruzó al acabar el 29 de diciembre de 2011 y sencillamente no tuvo día 30.|Faites le tour du monde vers l'est et vous croisez le soleil une fois de plus : vous arrivez un jour avant ce que dit votre propre compte, l'arithmétique qui gagne le pari du Tour du monde en quatre-vingts jours. Aucun traité ne fixe la ligne de changement de date : les Samoa l'ont franchie à la fin du 29 décembre 2011 et n'ont tout simplement pas eu de 30.|東回りで世界を一周すると、日の出に一回多く出会うので、自分で数えた日数より一日早く着きます。『八十日間世界一周』の賭けが成立するのは、この計算のためです。日付変更線に条約の裏づけはなく、サモアは2011年12月29日の終わりに線をまたいで、30日をまるごと持たずに年を越しました。",
    ),
  },
};

/**
 * 厄災の神。
 *
 * 日本の貧乏神・ボリビアのエル・ティーオ・フランスのアンクーと同じ役回りを、
 * 大洋の船乗りの伝承から取っている。さまよえるオランダ人は、喜望峰を回ると
 * 誓って果たせず、港に入ることを許されないまま海を走りつづける船。
 * 強化形は、その船が「本国へ届けてほしい」と郵袋を差し出してくる状態で、
 * 宛名の人はみな何十年も前に死んでいる、というのが語られ方である。
 */
export const WORLD_SPIRIT = {
  e: "⛵",
  n: t("The Flying Dutchman|El Holandés Errante|Le Hollandais volant|さまよえるオランダ人"),
  big: t("The Dutchman's Mailbag|El saco de cartas del Holandés|Le sac de lettres du Hollandais|オランダ人の郵袋"),
  ward: "christopher",
  arrive: t(
    "<b>⛵ A ship stands out of the haze astern.</b> Sailors have told the same thing for three hundred years: a captain swore he would round the Cape whatever it cost him, and he is rounding it still, never allowed to make port. She keeps station now on <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>⛵ Un barco se recorta en la calima, por la popa.</b> Los marinos cuentan lo mismo desde hace trescientos años: un capitán juró doblar el Cabo costase lo que costase, y sigue doblándolo, sin permiso para entrar en puerto. Ahora navega a la altura de <b>{0}</b>, el más lejano del destino, y trae una desgracia cada turno.|<b>⛵ Un navire se détache de la brume, sur l'arrière.</b> Les marins racontent la même chose depuis trois cents ans : un capitaine a juré de doubler le Cap quoi qu'il en coûte, et il le double encore, sans jamais avoir droit au port. Il tient désormais la même route que <b>{0}</b>, le plus éloigné du but, et amène un malheur chaque tour.|<b>⛵ 船尾の靄の中から、一隻の船が現れた。</b> 船乗りたちは三百年、同じ話をしてきた。何があろうと喜望峰を回ってみせると誓った船長がいて、彼はいまも回りつづけている。港に入ることは許されない。船は目的地から最も遠い <b>{0}</b> と同じ針路を取り、毎ターン災難をもたらす。",
  ),
  moves: t(
    "⛵ <b>The Flying Dutchman</b> puts her helm over — she now runs alongside <b>{0}</b>, farthest from {1}.|⛵ <b>El Holandés Errante</b> mete el timón: ahora navega junto a <b>{0}</b>, el más lejano de {1}.|⛵ <b>Le Hollandais volant</b> met la barre dessous — il longe à présent <b>{0}</b>, le plus loin de {1}.|⛵ <b>さまよえるオランダ人</b> が舵を切った。いまは {1} から最も遠い <b>{0}</b> と並んで走っている。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns with the Dutchman and cannot shake her off. A boat comes across with <b>a bag of letters</b> and asks that they be delivered — the names on them belong to people who have been dead a hundred years. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con el Holandés y no logra perderlo. Un bote se acerca con <b>un saco de cartas</b> y pide que se entreguen: los nombres son de gente que murió hace cien años. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours avec le Hollandais sans parvenir à le semer. Un canot accoste avec <b>un sac de lettres</b> et demande qu'on les remette : les noms sont ceux de gens morts depuis cent ans. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンかけてもオランダ人を振り切れなかった。艀が近づき、<b>郵袋</b> をひとつ差し出して「届けてほしい」と言う。宛名の人はみな、百年前に死んでいる。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the log of HMS Bacchante records that at four in the morning on 11 July 1881, off the Australian coast, thirteen men saw a strange red light with a brig standing out against it. One of the party keeping the log was the boy who would become George V.|<b>Tras la historia:</b> el diario del HMS Bacchante anota que a las cuatro de la madrugada del 11 de julio de 1881, frente a la costa australiana, trece hombres vieron una extraña luz roja con un bergantín recortado en ella. Uno de los que llevaban el diario era el muchacho que llegaría a ser Jorge V.|<b>Derrière l'histoire :</b> le journal de bord du HMS Bacchante note qu'à quatre heures du matin, le 11 juillet 1881, au large de l'Australie, treize hommes virent une étrange lueur rouge sur laquelle se détachait un brick. L'un des rédacteurs du journal était le garçon qui deviendrait George V.|<b>物語の背景:</b> 英艦バッカントの航海日誌には、1881年7月11日午前四時、オーストラリア沖で十三人が奇妙な赤い光を見、その中に一隻のブリッグが浮かび上がっていた、と記されている。日誌を付けていた一人は、のちのジョージ5世となる少年だった。",
  ),
  pleased: t(
    "Something goes over the side of the phantom and drifts down the current — a locked box, still dry inside. <b>{0}</b> gains <span class='money'>+{1}</span>.|Algo cae por la borda del barco fantasma y baja con la corriente: una caja cerrada, seca por dentro. <b>{0}</b> gana <span class='money'>+{1}</span>.|Quelque chose passe par-dessus bord du navire fantôme et descend au fil du courant : une caisse fermée, sèche à l'intérieur. <b>{0}</b> gagne <span class='money'>+{1}</span>.|幽霊船の舷から何かが落ち、潮に乗って流れてきた。錠のかかった箱で、中は濡れていない。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A worn medal of St Christopher hangs by the window. The ship holds her course without closing, and <b>{0}</b> goes on untouched this turn.|Una medalla gastada de San Cristóbal cuelga junto a la ventanilla. El barco mantiene su rumbo sin acercarse, y <b>{0}</b> sigue intacto este turno.|Une médaille usée de saint Christophe pend près de la fenêtre. Le navire tient son cap sans se rapprocher, et <b>{0}</b> poursuit indemne ce tour-ci.|窓のそばに、擦り切れた聖クリストフォロスのメダイが下がっている。船は針路を変えず、距離を詰めてこない。<b>{0}</b> はこのターン無事に進んだ。",
  ),
};

/** 災難(7種)。効果の対応は season-and-doom-rules.ts 側。 */
export const WORLD_DOOM = [
  {
    id: "customs-shed",
    n: t("Everything out on the counter|Todo fuera, sobre el mostrador|Tout sur le comptoir|台の上に全部出す"),
    t: t(
      "One bag interests the officer, and then all of them do. There is a form, a stamp, and a figure written in by someone who never asks what you paid for any of it; the receipt is in a language you cannot read.|Una bolsa le interesa al agente, y luego le interesan todas. Hay un impreso, un sello y una cifra que alguien escribe sin preguntar nunca cuánto pagaste por nada; el recibo está en una lengua que no lees.|Un sac intéresse l'agent, puis tous les autres. Il y a un formulaire, un tampon et un chiffre inscrit par quelqu'un qui ne demande jamais ce que tu as payé ; le reçu est dans une langue que tu ne lis pas.|鞄が一つ目に留まり、次には全部が目に留まる。書類があり、判が押され、いくら払ったのかを一度も訊かないまま金額が書き込まれる。受け取った控えは、読めない言語で書かれている。",
    ),
  },
  {
    id: "devaluation",
    n: t("The rate changes overnight|El cambio se mueve de noche|Le taux change dans la nuit|一夜で相場が変わる"),
    t: t(
      "The notes in your pocket are the same notes. The board behind the counter is not the same board, and by evening there is a queue at every exchange window in the city and the shops have stopped putting prices on anything.|Los billetes de tu bolsillo son los mismos. El panel tras el mostrador no es el mismo, y al caer la tarde hay cola en cada ventanilla de cambio de la ciudad y las tiendas han dejado de poner precios.|Les billets dans ta poche sont les mêmes. Le panneau derrière le guichet ne l'est plus, et le soir venu il y a la queue à chaque bureau de change de la ville et les magasins n'affichent plus rien.|懐にある紙幣は昨日と同じ紙幣である。窓口の後ろの掲示板だけが同じではない。夕方には街じゅうの両替窓口に列ができ、店は値札を出すのをやめている。",
    ),
  },
  {
    id: "quarantine",
    n: t("The yellow flag|La bandera amarilla|Le pavillon jaune|黄色い旗"),
    t: t(
      "The ship is not allowed alongside, and nobody lands until the doctor has been out and the days have been counted off. Ragusa began the practice in 1377 with thirty days of waiting; when it was pushed to forty, the count gave the thing its name.|El barco no atraca y nadie desembarca hasta que el médico haya subido a bordo y se hayan contado los días. Ragusa empezó en 1377 con treinta días de espera; cuando pasaron a cuarenta, la cuenta le dio nombre a la cosa.|Le navire n'accoste pas et personne ne débarque avant que le médecin soit monté à bord et que les jours soient comptés. Raguse commença en 1377 avec trente jours d'attente ; quand on passa à quarante, le compte donna son nom à la chose.|船は接岸を許されず、医師が乗り込み、日数が数え終わるまで誰も上陸できない。ラグーサが1377年に始めたときの待機は三十日だった。のちに四十日へ延ばされ、その数が「検疫」という語になった。",
    ),
  },
  {
    id: "expropriation",
    n: t("The concession is taken over|Se interviene la concesión|La concession est reprise|事業が接収される"),
    t: t(
      "A decree is read out on the radio at six in the morning and there are men at the gate by seven. What you owned yesterday belongs to the state today; compensation is promised in the same sentence, and it will be argued about for years.|A las seis de la mañana leen un decreto por la radio y a las siete hay hombres en la puerta. Lo que ayer era tuyo hoy es del Estado; la indemnización se promete en la misma frase y se discutirá durante años.|Un décret est lu à la radio à six heures du matin et il y a des hommes au portail à sept. Ce qui t'appartenait hier est à l'État aujourd'hui ; l'indemnité est promise dans la même phrase, et on en discutera pendant des années.|朝六時、ラジオで政令が読み上げられ、七時には門の前に人が立っている。昨日まで自分のものだったものが、今日から国のものになる。補償は同じ一文の中で約束され、その中身は何年も争われることになる。",
    ),
  },
  {
    id: "crossing-the-line",
    n: t("King Neptune comes aboard|Neptuno sube a bordo|Neptune monte à bord|ネプチューンが乗り込む"),
    t: t(
      "The ship crosses the equator and everyone who has never done it is brought forward to pay a forfeit to everyone who has. There is a court, a sentence and a certificate at the end of it, and the ceremony has been held at sea for at least four hundred years.|El barco cruza el ecuador y a los que no lo han hecho nunca los sacan a pagar prenda a los que sí. Hay tribunal, sentencia y un certificado al final, y la ceremonia se celebra en el mar desde hace al menos cuatrocientos años.|Le navire coupe l'équateur et tous ceux qui ne l'ont jamais fait doivent payer leur gage à ceux qui l'ont déjà fait. Il y a un tribunal, une sentence et un certificat à la fin, et la cérémonie se tient en mer depuis au moins quatre cents ans.|船が赤道を越え、初めての者は全員、すでに越えた者たちへ「科料」を払わされる。法廷があり、判決があり、最後に証書が出る。この儀式は少なくとも四百年、海の上で続いている。",
    ),
  },
  {
    id: "wrong-port",
    n: t("The ship calls somewhere else|El barco recala en otra parte|Le navire relâche ailleurs|船が別の港に寄る"),
    t: t(
      "The cargo is wanted two ports along, so the scheduled call is dropped and the passengers go where the freight goes. You are set ashore on a coast you had not planned on, holding a ticket for a town the ship is no longer visiting.|La carga hace falta dos puertos más allá, así que se suprime la escala prevista y el pasaje va adonde va el flete. Te dejan en una costa que no habías previsto, con un billete para una ciudad que el barco ya no toca.|La cargaison est attendue deux ports plus loin : l'escale prévue saute et les passagers vont où va le fret. On te débarque sur une côte que tu n'avais pas prévue, un billet en main pour une ville que le navire ne dessert plus.|積み荷が二つ先の港で要るというので、予定の寄港は取り消され、客は荷物の行く先へ運ばれる。思ってもみなかった海岸に降ろされ、手元には、もう船が寄らない街までの切符が残る。",
    ),
  },
  {
    id: "shell-game",
    n: t("Three shells on a folding table|Tres cubiletes en una mesa plegable|Trois gobelets sur une table pliante|折りたたみ台の三つの椀"),
    t: t(
      "The man in front of you wins twice and walks off pleased, and he is part of it; so is the woman who jostles you, and the boy watching the corner. By the time the table is folded and gone your pocket is lighter, and nobody in the square saw anything at all.|El de delante gana dos veces y se marcha contento, y es parte del asunto; también la mujer que te empuja y el chico que vigila la esquina. Cuando la mesa ya está plegada, tu bolsillo pesa menos y nadie en la plaza ha visto nada.|Celui qui est devant toi gagne deux fois et s'en va content : il est de la partie, comme la femme qui te bouscule et le gamin qui surveille le coin. Quand la table est repliée, ta poche est plus légère et personne sur la place n'a rien vu.|前の客が二度当てて、満足そうに立ち去る。あれも仲間だ。ぶつかってきた女も、角を見張っている少年もそうである。台が畳まれて消える頃には懐が軽くなっていて、広場の誰も何も見ていない。",
    ),
  },
];

/** 季節イベント(4月始まりの12ヶ月)。南北で季節が逆になることを軸にしている。 */
export const WORLD_SEASONS = [
  {
    e: "🌸",
    n: t("Blossom in the north, harvest in the south|Flores en el norte, vendimia en el sur|Fleurs au nord, vendanges au sud|北は花、南は収穫"),
    t: t(
      "The same weeks put blossom on the trees in one hemisphere and grapes in the press in the other: Kyoto is looking up, Mendoza and the Cape are looking down. In mainland Southeast Asia the year turns over instead, with water thrown in the street for three days.|Las mismas semanas ponen flores en los árboles de un hemisferio y uva en el lagar del otro: Kioto mira hacia arriba, Mendoza y El Cabo miran hacia abajo. En el sudeste asiático continental, en cambio, cambia el año y se tira agua en la calle durante tres días.|Les mêmes semaines mettent des fleurs aux arbres dans un hémisphère et du raisin au pressoir dans l'autre : Kyoto regarde en l'air, Mendoza et Le Cap regardent par terre. En Asie du Sud-Est continentale, c'est l'année qui bascule, et l'on se jette de l'eau dans la rue trois jours durant.|同じ週に、片方の半球では木に花が咲き、もう片方では葡萄が搾られる。京都は上を見上げ、メンドーサやケープは足元を見ている。東南アジアの大陸部ではその頃が年の変わり目で、三日のあいだ道で水を掛け合う。",
    ),
    f: t(
      "Because the seasons are reversed across the equator, wine has two vintages a year: the southern one is picked around March and is on the shelf while the northern vines are still in flower.|Como las estaciones se invierten al cruzar el ecuador, el vino tiene dos vendimias al año: la del sur se recoge hacia marzo y ya está en el estante cuando la viña del norte todavía está en flor.|Les saisons s'inversant de part et d'autre de l'équateur, le vin connaît deux vendanges par an : celle du sud se fait vers mars et se trouve en rayon quand la vigne du nord est encore en fleur.|赤道をまたぐと季節が逆になるので、葡萄酒には一年に二度の収穫があります。南半球のぶどうは3月ごろに摘まれ、北半球の畑がまだ花をつけている頃には、もう店に並んでいます。",
    ),
  },
  {
    e: "⚓",
    n: t("The ice lets go|Se suelta el hielo|La débâcle des glaces|氷が解ける"),
    t: t(
      "The northern rivers break up, the supply season opens, and the first ships of the year go up to ports that have been shut since autumn. South of the equator the blankets come out and the mountain hotels start counting snow.|Los ríos del norte se rompen, se abre la temporada de suministro y los primeros barcos del año suben a puertos cerrados desde el otoño. Al sur del ecuador salen las mantas y los hoteles de montaña empiezan a contar nieve.|Les fleuves du nord débâclent, la saison de ravitaillement s'ouvre et les premiers navires de l'année remontent vers des ports fermés depuis l'automne. Au sud de l'équateur, on ressort les couvertures et les hôtels de montagne comptent la neige.|北の川の氷が割れ、補給の季節が開き、秋から閉ざされていた港へその年最初の船が上っていく。赤道の南では毛布が出され、山のホテルが雪の量を数えはじめる。",
    ),
    f: t(
      "At Nenana in Alaska a tripod is planted on the frozen river with a line running to a clock, and the whole state bets on the minute the ice will move it. The contest has been run every year since 1917.|En Nenana, Alaska, se planta un trípode sobre el río helado con un cable atado a un reloj, y todo el estado apuesta al minuto en que el hielo lo mueva. El concurso se celebra cada año desde 1917.|À Nenana, en Alaska, on plante un trépied sur le fleuve gelé, relié par un câble à une horloge, et tout l'État parie sur la minute où la glace le déplacera. Le concours se tient chaque année depuis 1917.|アラスカのニナナでは、凍った川の上に三脚を立て、そこから時計まで紐を張ります。氷が動いて時計が止まる「分」を、州じゅうが賭けるのです。この行事は1917年から毎年続いています。",
    ),
  },
  {
    e: "☀️",
    n: t("One sun, two solstices|Un sol, dos solsticios|Un soleil, deux solstices|同じ太陽、二つの至"),
    t: t(
      "North of the Arctic Circle the sun does not set at all, and on the very same day Cusco lights fires for the shortest one of the year. Half the world is outdoors at midnight; the other half is indoors by five.|Al norte del Círculo Polar el sol no se pone, y ese mismo día Cusco enciende hogueras por el día más corto del año. Medio mundo está en la calle a medianoche; el otro medio, en casa a las cinco.|Au nord du cercle polaire, le soleil ne se couche pas, et le même jour Cusco allume des feux pour la journée la plus courte de l'année. La moitié du monde est dehors à minuit ; l'autre est rentrée à cinq heures.|北極圏では太陽が沈まなくなり、まったく同じ日に、クスコは一年でいちばん短い日のために火を焚く。世界の半分は真夜中に外におり、もう半分は五時には家に入っている。",
    ),
    f: t(
      "Inti Raymi is held above Cusco on 24 June, at the southern winter solstice. The Spanish banned it in 1572, and it was staged again from 1944 using the description left by Garcilaso de la Vega, who had watched it as a child.|El Inti Raymi se celebra sobre Cusco el 24 de junio, en el solsticio de invierno austral. Los españoles lo prohibieron en 1572 y se volvió a representar desde 1944 con la descripción que dejó Garcilaso de la Vega, que lo había visto de niño.|L'Inti Raymi se tient au-dessus de Cusco le 24 juin, au solstice d'hiver austral. Les Espagnols l'interdirent en 1572 ; il fut rejoué à partir de 1944 d'après la description laissée par Garcilaso de la Vega, qui l'avait vu enfant.|インティ・ライミは南半球の冬至にあたる6月24日、クスコを見下ろす丘で行われます。1572年にスペイン人が禁じましたが、幼い頃にこの祭りを見たガルシラーソ・デ・ラ・ベーガの記述をもとに、1944年から再び演じられるようになりました。",
    ),
  },
  {
    e: "🧳",
    n: t("The north takes its holidays|El norte se va de vacaciones|Le nord part en vacances|北半球が休みに入る"),
    t: t(
      "Europe and North America move to the coast for six weeks, every fare doubles, and nothing is decided in any office until September. South of the equator it is midwinter, and the whales are calving in the bays off Hermanus and Baja.|Europa y Norteamérica se mudan a la costa seis semanas, cada billete dobla de precio y en ninguna oficina se decide nada hasta septiembre. Al sur del ecuador es pleno invierno y las ballenas paren en las bahías de Hermanus y Baja California.|L'Europe et l'Amérique du Nord s'installent au bord de la mer pour six semaines, tous les billets doublent et plus rien ne se décide dans aucun bureau avant septembre. Au sud de l'équateur, c'est le plein hiver et les baleines mettent bas dans les baies d'Hermanus et de Basse-Californie.|ヨーロッパと北アメリカが六週間ほど海辺へ移り、運賃はどれも倍になり、九月までどの事務所でも何も決まらない。赤道の南は真冬で、エルマヌスやバハ・カリフォルニアの湾では鯨が子を産んでいる。",
    ),
    f: t(
      "About this time a million and a half wildebeest reach the Mara river in East Africa. They are following rain that fell weeks earlier and hundreds of kilometres away, which nobody has yet explained convincingly.|Por estas fechas un millón y medio de ñus llegan al río Mara, en África oriental. Siguen una lluvia caída semanas antes y a cientos de kilómetros, y nadie ha explicado todavía cómo lo saben.|Vers cette époque, un million et demi de gnous atteignent la rivière Mara, en Afrique de l'Est. Ils suivent une pluie tombée des semaines plus tôt et à des centaines de kilomètres, sans qu'on sache encore expliquer comment.|この頃、東アフリカのマラ川に150万頭ほどのヌーが到達します。数週間前に数百キロ先で降った雨を追っているのですが、なぜそれが分かるのかは、まだ納得のいく説明がありません。",
    ),
  },
  {
    e: "🌫️",
    n: t("The belt of calms|La zona de las calmas|La zone des calmes|無風帯"),
    t: t(
      "Along the equator the wind dies, the sea goes to glass, and a sailing ship can lie a week without steerage way. Nothing that depends on the wind moves at all this month — and that includes whatever has been keeping station astern.|A lo largo del ecuador el viento muere, el mar se vuelve un espejo y un velero puede pasar una semana sin gobierno. Este mes no se mueve nada que dependa del viento, y eso incluye lo que venía siguiéndote por la popa.|Le long de l'équateur, le vent tombe, la mer devient un miroir et un voilier peut rester une semaine sans erre. Ce mois-ci, rien de ce qui dépend du vent ne bouge — y compris ce qui tenait la même route derrière toi.|赤道のあたりで風が死に、海は硝子のようになり、帆船は一週間も舵の利かないまま漂う。今月は風に頼るものが何ひとつ動かない。船尾についてきたあれも、動かない。",
    ),
    f: t(
      "Sailors call this belt the doldrums. It is where the trade winds of the two hemispheres run into each other and the air goes up instead of along, which is also why it rains there almost every afternoon.|Los marinos llaman a esta franja las calmas ecuatoriales. Es donde chocan los alisios de los dos hemisferios y el aire sube en vez de avanzar, y por eso allí llueve casi todas las tardes.|Les marins appellent cette bande le pot au noir. C'est là que les alizés des deux hémisphères se rencontrent et que l'air monte au lieu d'avancer : c'est aussi pourquoi il y pleut presque tous les après-midi.|船乗りはこの帯を「ドルドラム(赤道無風帯)」と呼びます。南北両半球の貿易風がぶつかる場所で、空気は横へではなく上へ抜けていきます。ここでほとんど毎日午後に雨が降るのも、そのためです。",
    ),
  },
  {
    e: "🌀",
    n: t("Storm season on both oceans|Temporada de tormentas en dos océanos|Saison des tempêtes sur deux océans|二つの海の嵐の季節"),
    t: t(
      "The Atlantic season peaks in the second week of the month and the western Pacific is running its own storms at the same time. Ports close, freight sits on the quay, and every insurer in the world is reading the same charts.|La temporada atlántica llega a su punto álgido en la segunda semana del mes, y a la vez el Pacífico occidental tiene las suyas. Se cierran puertos, la carga se queda en el muelle y todas las aseguradoras del mundo leen los mismos mapas.|La saison atlantique culmine dans la deuxième semaine du mois, tandis que le Pacifique occidental a les siennes au même moment. Les ports ferment, le fret reste à quai et tous les assureurs du monde lisent les mêmes cartes.|大西洋の嵐の季節は月の第二週に山を迎え、同じ頃、西太平洋にも西太平洋の嵐が来る。港は閉じ、貨物は岸壁に取り残され、世界じゅうの保険会社が同じ天気図を見ている。",
    ),
    f: t(
      "It is one kind of storm with three names: a hurricane in the Atlantic and eastern Pacific, a typhoon west of the date line, a cyclone in the Indian Ocean. The names came from whichever sailors met them first, and they never got tidied up.|Es una sola clase de tormenta con tres nombres: huracán en el Atlántico y el Pacífico oriental, tifón al oeste de la línea de cambio de fecha, ciclón en el Índico. Los nombres vienen de los marinos que las encontraron primero y nunca se unificaron.|C'est une seule espèce de tempête sous trois noms : ouragan dans l'Atlantique et le Pacifique est, typhon à l'ouest de la ligne de changement de date, cyclone dans l'océan Indien. Les noms viennent des marins qui les ont rencontrées les premiers et n'ont jamais été harmonisés.|同じ現象に三つの名前があります。大西洋と東太平洋では「ハリケーン」、日付変更線より西では「台風」、インド洋では「サイクロン」。最初に出会った船乗りたちの呼び方がそのまま残り、統一されないままなのです。",
    ),
  },
  {
    e: "🍁",
    n: t("Autumn one way, jacaranda the other|Otoño de un lado, jacarandás del otro|L'automne d'un côté, les jacarandas de l'autre|片や紅葉、片やジャカランダ"),
    t: t(
      "The northern forests turn and coaches are chartered to go and look at them; in Pretoria and Buenos Aires the streets go purple instead. Both last about three weeks, and both are worth going out of your way for.|Los bosques del norte cambian de color y se fletan autocares para ir a verlos; en Pretoria y Buenos Aires las calles se ponen moradas. Ambas cosas duran unas tres semanas y ambas merecen el rodeo.|Les forêts du nord tournent et l'on affrète des cars pour aller les voir ; à Pretoria et Buenos Aires, ce sont les rues qui virent au mauve. Cela dure trois semaines de part et d'autre, et vaut le détour des deux côtés.|北の森が色を変え、それを見に行くためのバスが仕立てられる。プレトリアやブエノスアイレスでは、代わりに通りが紫になる。どちらも三週間ほどで、どちらも回り道をする値打ちがある。",
    ),
    f: t(
      "Jacarandas come from South America, and in South Africa they now count as an invading species. The old trees lining the streets of Pretoria are allowed to stand, but a dead one may not be replaced.|El jacarandá es sudamericano y en Sudáfrica está declarado especie invasora. Los árboles viejos de las calles de Pretoria pueden quedarse, pero el que se muere no se puede reponer.|Le jacaranda vient d'Amérique du Sud et compte aujourd'hui, en Afrique du Sud, parmi les espèces envahissantes. Les vieux arbres des rues de Pretoria peuvent rester, mais celui qui meurt ne sera pas remplacé.|ジャカランダは南アメリカ原産で、南アフリカでは現在、侵略的外来種に指定されています。プレトリアの街路の古木はそのまま認められていますが、枯れたぶんを植え直すことは許されていません。",
    ),
  },
  {
    e: "🕯️",
    n: t("Lights, and the dead|Luces y difuntos|Lumières et défunts|灯りと死者"),
    t: t(
      "Cities from Delhi to Leicester fill with lamps and fireworks, and at the start of the month Mexican families sit up all night in the cemeteries with candles and food. South of the equator, meanwhile, everyone is taking their coat off.|Ciudades de Delhi a Leicester se llenan de lámparas y fuegos, y al empezar el mes las familias mexicanas pasan la noche en los cementerios con velas y comida. Al sur del ecuador, mientras tanto, todo el mundo se quita el abrigo.|Des villes de Delhi à Leicester se remplissent de lampes et de feux d'artifice, et au début du mois les familles mexicaines veillent au cimetière avec des bougies et de quoi manger. Au sud de l'équateur, pendant ce temps, on enlève son manteau.|デリーからレスターまで、街は灯明と花火で埋まる。月の初めにはメキシコの家族が蝋燭と食べ物を持って墓地で夜を明かす。その頃、赤道の南では、みな上着を脱ぎはじめている。",
    ),
    f: t(
      "Diwali follows the moon and falls in October or November; the Day of the Dead is fixed to the first and second. The marigolds that carpet the Mexican graves are grown for those two days and for nothing else.|El Diwali sigue a la luna y cae en octubre o noviembre; el Día de Muertos está fijado al uno y al dos. Las flores de cempasúchil que cubren las tumbas mexicanas se cultivan para esos dos días y para nada más.|Diwali suit la lune et tombe en octobre ou en novembre ; le Jour des morts est fixé aux 1er et 2. Les œillets d'Inde qui tapissent les tombes mexicaines sont cultivés pour ces deux jours-là et pour rien d'autre.|ディワーリーは月の運行に従うので10月か11月に来ますが、「死者の日」は11月1日と2日に固定されています。メキシコの墓を埋めるマリーゴールドは、この二日のためだけに栽培されます。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas at two temperatures|Navidad a dos temperaturas|Noël sous deux climats|二つの気温のクリスマス"),
    t: t(
      "In one hemisphere the wooden huts and the hot wine, in the other the beach and the grill set up on the sand. The same songs about snow are sung in both, at the same hour, in shirtsleeves on one side.|En un hemisferio las casetas de madera y el vino caliente; en el otro la playa y la parrilla montada en la arena. Se cantan las mismas canciones sobre la nieve, a la misma hora, en mangas de camisa a un lado.|Dans un hémisphère les chalets de bois et le vin chaud, dans l'autre la plage et le barbecue monté sur le sable. On y chante les mêmes chansons sur la neige, à la même heure, en bras de chemise d'un côté.|片方の半球では木の小屋とホットワイン、もう片方では浜辺と砂の上のバーベキュー。同じ時刻に、雪の歌が両方で歌われる。片側の人は半袖である。",
    ),
    f: t(
      "In Australia, southern Africa and much of South America the school year ends in December, so Christmas and the long summer holiday are the same six weeks. It is the biggest month in the shops there for that reason, not in spite of the heat.|En Australia, África austral y buena parte de Sudamérica el curso acaba en diciembre, así que la Navidad y las largas vacaciones de verano son las mismas seis semanas. Por eso es el mejor mes del comercio allí, y no a pesar del calor.|En Australie, en Afrique australe et dans une bonne part de l'Amérique du Sud, l'année scolaire finit en décembre : Noël et les grandes vacances d'été sont les mêmes six semaines. C'est pour cela que les commerces y font leur meilleur mois, et non malgré la chaleur.|オーストラリア、アフリカ南部、南アメリカの多くでは学年が12月で終わるので、クリスマスと長い夏休みが同じ六週間に重なります。その地域で12月が商店の書き入れ時なのは、暑さにもかかわらず、ではなく、そのためです。",
    ),
  },
  {
    e: "🎆",
    n: t("Midnight goes round the world|La medianoche da la vuelta al mundo|Minuit fait le tour du monde|真夜中が世界を一周する"),
    t: t(
      "The new year opens on a low island in the Pacific and takes twenty-six hours to reach the last one, and somewhere along the way everybody is handed something to open. By the time the final stretch of empty ocean turns the page, the first fireworks have already been swept up.|El año nuevo empieza en una isla baja del Pacífico y tarda veintiséis horas en llegar a la última, y en algún punto del camino a todos les ponen algo en las manos para abrir. Cuando el último trecho de océano vacío pasa la página, los primeros fuegos ya están barridos.|La nouvelle année s'ouvre sur une île basse du Pacifique et met vingt-six heures à gagner la dernière, et quelque part en chemin chacun reçoit quelque chose à ouvrir. Quand le dernier morceau d'océan vide tourne la page, les premiers feux ont déjà été balayés.|新しい年は太平洋の低い島から始まり、最後の場所に届くまで26時間かかる。その途中のどこかで、誰もが開けるものを手渡される。最後の、誰もいない海がページをめくる頃には、最初の花火はもう掃き集められている。",
    ),
    f: t(
      "Kiribati moved the date line eastward in 1995 so that its far islands would not be a day behind the capital, which gave Kiritimati the earliest clock on earth at UTC+14. The last places to see the new year in are Baker and Howland Islands, at UTC−12.|Kiribati desplazó la línea de cambio de fecha hacia el este en 1995 para que sus islas lejanas no fueran un día por detrás de la capital, y así Kiritimati tiene el reloj más adelantado del mundo, UTC+14. Los últimos lugares en estrenar el año son las islas Baker y Howland, en UTC−12.|Kiribati a déplacé la ligne de changement de date vers l'est en 1995 pour que ses îles lointaines ne soient plus en retard d'un jour sur la capitale : Kiritimati a ainsi l'horloge la plus avancée du monde, UTC+14. Les derniers lieux à entrer dans l'année nouvelle sont les îles Baker et Howland, à UTC−12.|キリバスは1995年、遠方の島が首都より一日遅れることのないよう、日付変更線を東へ動かしました。おかげでキリティマティ島は世界で最も進んだUTC+14の時刻を持ちます。最後に新年を迎えるのはUTC−12のベーカー島とハウランド島です。",
    ),
  },
  {
    e: "🎭",
    n: t("Carnival|Carnaval|Le carnaval|謝肉祭"),
    t: t(
      "Rio, Port of Spain, Venice and New Orleans all count backwards from the same movable date, and for four days nothing else is arranged anywhere near them. North of the tropics it is the coldest fortnight of the year, so the hall is hired and the dancing goes indoors.|Río, Puerto España, Venecia y Nueva Orleans cuentan hacia atrás desde la misma fecha movible, y durante cuatro días no se organiza nada más a su alrededor. Al norte de los trópicos es la quincena más fría del año, así que se alquila el salón y se baila dentro.|Rio, Port-d'Espagne, Venise et La Nouvelle-Orléans comptent à rebours à partir de la même date mobile, et pendant quatre jours on n'organise rien d'autre alentour. Au nord des tropiques, c'est la quinzaine la plus froide de l'année : on loue la salle et l'on danse à l'intérieur.|リオ、ポート・オブ・スペイン、ヴェネツィア、ニューオーリンズは、同じ移動祝日から日を逆算する。その四日間、周辺では他に何の予定も入らない。熱帯より北ではこの二週間が一年でいちばん寒く、踊りは借りた広間の中へ移る。",
    ),
    f: t(
      "Carnival ends on the Tuesday before Ash Wednesday, so its date moves with Easter and can fall anywhere from early February to early March. In Trinidad the bands come out at four in the morning covered in mud, oil and paint; the name for it, J'Ouvert, is the French for daybreak.|El carnaval acaba el martes anterior al Miércoles de Ceniza, así que su fecha se mueve con la Pascua y puede caer entre principios de febrero y principios de marzo. En Trinidad las comparsas salen a las cuatro de la madrugada cubiertas de barro, aceite y pintura: a eso lo llaman J'Ouvert, del francés para el amanecer.|Le carnaval s'achève le mardi précédant le mercredi des Cendres : sa date suit celle de Pâques et peut tomber de début février à début mars. À Trinité, les bandes sortent à quatre heures du matin couvertes de boue, d'huile et de peinture ; on appelle cela le J'Ouvert, du français « jour ouvert ».|謝肉祭は灰の水曜日の前日の火曜に終わるため、日付は復活祭とともに動き、2月初めから3月初めまでのどこかに来ます。トリニダードでは楽隊が泥と油と塗料にまみれて朝四時に繰り出します。これを「ジュヴェ」と呼ぶのは、フランス語の「夜明け」から来ています。",
    ),
  },
  {
    e: "🐦",
    n: t("The great crossings begin again|Vuelven las grandes travesías|Les grandes traversées reprennent|大移動がまた始まる"),
    t: t(
      "At the equinox day and night stand level everywhere on earth for one day, and the birds go north with it. Yards that were shut for the winter open again, and the first sailings of the season are full within a week of the notice going up.|En el equinoccio el día y la noche se igualan en toda la tierra durante una jornada, y las aves se van al norte con ello. Los astilleros cerrados por el invierno vuelven a abrir, y las primeras salidas de la temporada se llenan a la semana de anunciarse.|À l'équinoxe, le jour et la nuit s'égalisent partout sur terre pendant une journée, et les oiseaux montent vers le nord avec lui. Les chantiers fermés pour l'hiver rouvrent, et les premiers départs de la saison sont complets une semaine après l'affichage.|春分・秋分には、地球上のどこでも昼と夜の長さが一日だけ並ぶ。鳥はそれに合わせて北へ発つ。冬のあいだ閉じていた造船所が再び開き、その季節最初の便は、掲示が出て一週間で満席になる。",
    ),
    f: t(
      "The Arctic tern breeds in the far north and winters in the far south, flying something like seventy thousand kilometres a year. It follows the summer from one end of the world to the other and sees more daylight in its life than any other animal.|El charrán ártico cría en el extremo norte e inverna en el extremo sur, volando unos setenta mil kilómetros al año. Sigue el verano de una punta del mundo a la otra y ve más luz de día en su vida que ningún otro animal.|La sterne arctique niche à l'extrême nord et hiverne à l'extrême sud, parcourant quelque soixante-dix mille kilomètres par an. Elle suit l'été d'un bout du monde à l'autre et voit dans sa vie plus de lumière du jour que tout autre animal.|キョクアジサシは極北で繁殖し、極南で冬を越すため、年に7万キロほどを飛びます。世界の端から端まで夏を追いかけるので、生涯に浴びる昼の光は、どの動物よりも長いことになります。",
    ),
  },
];
