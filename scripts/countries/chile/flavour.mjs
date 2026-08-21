/**
 * チリの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月(0=4月〜11=3月、暦は共通)。
 * チリは南半球なので、暦の並びは他国と同じでも中身の季節は逆になる
 * (4月は収穫の終わり、9月18日が独立記念日、2月が真夏)。
 *
 * 厄災の神は「カレウチェ」──チロエ地方に伝わる、水死者を乗組員とする
 * 幻の帆船の伝説。ボリビア盤面の鉱山の守護霊(エル・ティーオ)・ペルー盤面の
 * 山の霊(アプ)とは題材が重ならないよう、海と霧を司る存在にしてある。
 * この盤面はアイセン・マガジャネスで航路(sea)が多いので、海の伝承が
 * 盤面の仕組みと重なるようにした。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const CHILE_META = {
  id: "chile",
  name: t("Chile|Chile|Le Chili|チリ"),
  blurb: t(
    "A ribbon of a country where the railway had to decide, twice, where to stop|Un país en forma de cinta donde el ferrocarril tuvo que decidir, dos veces, dónde detenerse|Un pays en forme de ruban où le chemin de fer a dû décider, deux fois, où s'arrêter|鉄道が二度、どこで止まるかを決めねばならなかった、リボンのような国",
  ),
  cur: { pre: "CLP$", post: "", mul: 57000 },
  start: "santiago",
  cpuNames: ["Huemul", "Copihue", "Araucaria", "Ñandú"],
  // 国旗の赤・白・青、銅の色、南部森林の緑。
  stripe: ["#d52b1e", "#ffffff", "#0039a6", "#b87333", "#2f6b3a"],
};

/** 5地方(cities.mjsと同じコード)。 */
export const CHILE_REGIONS = {
  ng: t("Norte Grande (the great north)|Norte Grande (el gran norte)|Norte Grande (le grand nord)|ノルテ・グランデ(大いなる北)"),
  nc: t("Norte Chico (the little north)|Norte Chico (el norte chico)|Norte Chico (le petit nord)|ノルテ・チコ(小さな北)"),
  ce: t("Zona Central (the heartland)|Zona Central|Zone centrale|セントラル(中心地帯)"),
  su: t("Zona Sur (the south)|Zona Sur|Zone sud|スル(南部)"),
  au: t("Zona Austral (the far south)|Zona Austral|Zone australe|アウストラル(最果ての南)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9件のひな型(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。鍵は既存盤面
 * (約300件)と衝突しないことを確認済み(2026-08-21)。
 *
 * 「向きの選べない移動アイテムは、操縦できるものより安い」の原則どおり、
 * avionpatagonico(飛行機まかせ・260)はpullman(自分で選ぶ・380)より安い。
 */
export const CHILE_ITEMS = {
  avionpatagonico: {
    e: "🛩️",
    price: 260,
    kind: "move",
    n: t("A Seat on the Patagonia Mail Plane|Un asiento en el avión del correo patagónico|Une place dans l'avion du courrier patagon|パタゴニア郵便機の座席"),
    d: t(
      "Carried 8–12 squares. The pilot decides where you land, not you.|Te lleva de 8 a 12 casillas. Dónde aterrizas lo decide el piloto, no tú.|Emporté de 8 à 12 cases. C'est le pilote qui décide où tu atterris, pas toi.|8〜12マス運ばれる。どこに降りるかは操縦士が決め、乗客には選べない。",
    ),
    f: t(
      "Small regional airlines have flown mail, freight and passengers over Aysén and Magallanes since the mid-twentieth century, rerouting constantly around the weather in valleys that no road or railway has ever reached.|Pequeñas aerolíneas regionales llevan correo, carga y pasajeros sobre Aisén y Magallanes desde mediados del siglo XX, cambiando de ruta constantemente según el clima en valles a los que ningún camino ni ferrocarril ha llegado jamás.|De petites compagnies aériennes régionales transportent courrier, fret et passagers au-dessus de l'Aysén et du Magallanes depuis le milieu du XXe siècle, changeant constamment de route selon la météo dans des vallées qu'aucune route ni voie ferrée n'a jamais atteintes.|地方の小さな航空会社は20世紀半ばから、道路も鉄道も一度も届いたことのない谷の上空で、天候に合わせて絶えず経路を変えながらアイセンとマガジャネスへ郵便や貨物、乗客を運んできた。",
    ),
  },
  pullman: {
    e: "🚌",
    price: 380,
    kind: "pre",
    n: t("A Ticket on the Pullman Bus|Un pasaje en el bus Pullman|Un billet de bus Pullman|プルマン・バスの乗車券"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Long-distance coach companies now cover almost every route the passenger railway abandoned across the twentieth century, running reclining 'cama' seats on overnight trips the length of the country.|Las empresas de buses interurbanos cubren hoy casi todas las rutas que el ferrocarril de pasajeros abandonó a lo largo del siglo XX, con asientos reclinables 'cama' en viajes nocturnos a lo largo de todo el país.|Les compagnies de cars longue distance couvrent aujourd'hui presque tous les trajets abandonnés par le rail voyageurs au cours du XXe siècle, avec des sièges inclinables « cama » pour des trajets de nuit sur toute la longueur du pays.|長距離バス会社はいまや、20世紀を通じて旅客鉄道が手放していったほとんどの路線を引き継いでおり、「カマ」と呼ばれるリクライニング座席で国の端から端までの夜行便を走らせている。",
    ),
  },
  trensalitrero: {
    e: "🚂",
    price: 340,
    kind: "pre",
    n: t("A Ticket on the Nitrate Train|Un boleto en el tren salitrero|Un billet du train du salpêtre|硝石列車の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Narrow-gauge lines once webbed the whole nitrate pampa, built purely to bring ore down to port; almost none of that network still runs, and the few surviving cars mostly carry tourists through the ghost towns instead.|Líneas de trocha angosta tejían antes toda la pampa salitrera, construidas solo para bajar el mineral al puerto; casi nada de esa red sigue funcionando, y los pocos vagones que sobreviven llevan sobre todo turistas por los pueblos fantasma.|Des lignes à voie étroite maillaient autrefois toute la pampa du salpêtre, bâties uniquement pour descendre le minerai au port ; presque rien de ce réseau ne fonctionne encore, et les rares wagons survivants transportent surtout des touristes à travers les villes fantômes.|狭軌の路線がかつて硝石地帯全体に網の目のように張り巡らされていたが、それは鉱石を港へ下ろすためだけに敷かれたものだった。その路線網はいまではほとんど動いておらず、生き残ったわずかな車両は主に観光客をゴーストタウン巡りに運んでいる。",
    ),
  },
  expresolongitudinal: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the Longitudinal Express|Un boleto en el Expreso Longitudinal|Un billet de l'Express Longitudinal|縦断急行の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Ferrocarril Longitudinal once ran passenger trains the length of the central valley from the desert north almost to Puerto Montt; most of that service was cut in stages from the 1980s on, and today's trains cover only a fraction of the old line.|El Ferrocarril Longitudinal llevó trenes de pasajeros a lo largo del valle central, desde el norte desértico hasta casi Puerto Montt; la mayor parte de ese servicio se fue recortando por etapas desde la década de 1980, y los trenes de hoy cubren solo una fracción de la vieja línea.|Le Ferrocarril Longitudinal fit un temps circuler des trains de voyageurs sur toute la longueur de la vallée centrale, du désert du nord jusqu'à presque Puerto Montt ; l'essentiel de ce service fut supprimé par étapes à partir des années 1980, et les trains d'aujourd'hui ne couvrent qu'une fraction de l'ancienne ligne.|縦断鉄道はかつて、北の砂漠からほぼプエルト・モントまで、中央谷を貫いて旅客列車を走らせていた。その運行の大半は1980年代以降、段階的に打ち切られ、いまの列車は昔の路線のごく一部しか走っていない。",
    ),
  },
  ramadecanelo: {
    e: "🌿",
    price: 300,
    kind: "passive",
    n: t("A Branch of Canelo|Una rama de canelo|Une branche de canelo|カネロの枝"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The canelo tree is sacred in Mapuche religious practice, its branches planted at ceremonial grounds and, in Chilote folk belief, kept in doorways as protection against witches and the things that sail with the Caleuche at night.|El canelo es sagrado en la práctica religiosa mapuche, y sus ramas se plantan en los sitios ceremoniales y, en la creencia popular chilota, se guardan en las puertas como protección contra las brujas y lo que navega de noche con el Caleuche.|Le canelo est sacré dans la pratique religieuse mapuche, ses branches étant plantées sur les lieux cérémoniels et, dans la croyance populaire chilote, gardées aux portes en protection contre les sorcières et ce qui navigue la nuit avec le Caleuche.|カネロの木はマプチェの宗教儀礼で神聖な木とされ、その枝は儀式の場に立てられる。チロエの民間信仰では、魔女や夜にカレウチェとともに航行するものへの護りとして、戸口にこの枝を掲げる習わしもある。",
    ),
  },
  linternafarera: {
    e: "🏮",
    price: 420,
    kind: "pre",
    n: t("A Lighthouse Keeper's Lantern|El farol del farero|La lanterne du gardien de phare|灯台守のランプ",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Chile's coast and channels are marked by more than a hundred lighthouses, many still tended in person because of how thick fog and narrow passages remain even with modern instruments; sailors in Chilote legend say a steady light is the surest way to keep the Caleuche's crew from taking any interest in you.|La costa y los canales de Chile están marcados por más de cien faros, muchos todavía atendidos en persona por lo espeso que sigue siendo la niebla y lo angosto de los pasos incluso con instrumentos modernos; según la leyenda chilota, una luz firme es la manera más segura de que la tripulación del Caleuche no se fije en ti.|La côte et les chenaux du Chili sont jalonnés de plus de cent phares, dont beaucoup restent gardés en personne tant le brouillard demeure épais et les passages étroits, même avec des instruments modernes ; selon la légende chilote, une lumière stable est le moyen le plus sûr d'éviter que l'équipage du Caleuche ne s'intéresse à vous.|チリの海岸と水路には100を超える灯台が並び、現代の計器があってもなお霧が濃く水路が狭いため、いまも人の手で守られているものが多い。チロエの伝承では、絶えず灯る光こそがカレウチェの乗組員に見つからずに済む確かな方法だとされる。",
    ),
  },
  torpedo: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値(上限140)。
    price: 130,
    kind: "passive",
    n: t("A Torpedo (Cheat Sheet)|Un torpedo (chuleta)|Un torpedo (antisèche)|トルペード(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "'Torpedo' is Chilean student slang for a hidden crib sheet, rolled tight or folded small enough to pass unnoticed from desk to desk during an exam.|'Torpedo' es la jerga escolar chilena para una chuleta escondida, enrollada o doblada lo bastante pequeña para pasar de pupitre a pupitre sin que se note durante una prueba.|« Torpedo » est l'argot scolaire chilien pour une antisèche cachée, roulée serré ou pliée assez petite pour passer inaperçue de pupitre en pupitre pendant un examen.|「トルペード」はチリの学生の隠語で、隠し持つカンニングペーパーを指す。試験中に机から机へと気づかれずに渡せるくらい、きつく丸めたり小さく折りたたんだりする。",
    ),
  },
  boletokino: {
    e: "🎟️",
    price: 280,
    kind: "pre",
    n: t("A Winning Kino Ticket|Un boleto ganador del Kino|Un billet gagnant du Kino|当たったキノ券"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Kino, a numbers lottery drawn several times a week, is one of the most widely played games in Chile, sold from small stands on street corners in every city on this board.|El Kino, una lotería de números que se sortea varias veces por semana, es uno de los juegos más jugados en Chile, vendido en pequeños puestos de esquina en todas las ciudades de este tablero.|Le Kino, une loterie à numéros tirée plusieurs fois par semaine, est l'un des jeux les plus joués au Chili, vendu à de petits stands de coin de rue dans toutes les villes de ce plateau.|週に何度も抽選が行われる数字くじ「キノ」は、チリでもとりわけ多くの人が買う賭け事のひとつで、この盤面のどの町でも街角の小さな売店で売られている。",
    ),
  },
  atajoarriero: {
    e: "🐴",
    price: 400,
    kind: "pre",
    n: t("The Arriero's Shortcut|El atajo del arriero|Le raccourci de l'arriero|アリエロの近道"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Arrieros, mule and horse drivers who move livestock and goods across the Andes, know unmarked passes that cut hours or days off the routes shown on any map, knowledge passed down inside families rather than written anywhere.|Los arrieros, que mueven ganado y mercadería a través de los Andes con mulas y caballos, conocen pasos sin señalizar que recortan horas o días a las rutas de cualquier mapa, un saber que se transmite en familia y no se escribe en ninguna parte.|Les arrieros, muletiers et cavaliers qui déplacent bétail et marchandises à travers les Andes, connaissent des cols non balisés qui raccourcissent de plusieurs heures ou jours les trajets indiqués sur toute carte, un savoir transmis en famille plutôt que consigné nulle part.|ラバや馬を使ってアンデスを越え家畜や荷を運ぶアリエロたちは、どの地図にも載っていない峠道を知っており、それを使えば普通の道より何時間、時には何日も短縮できる。その知識は書き記されることなく、一族の中で代々受け継がれてきた。",
    ),
  },
};

/**
 * 厄災の神。カレウチェ──チロエ地方に伝わる、水死者を乗組員とする幻の
 * 帆船の伝説。ボリビア盤面のエル・ティーオ・ペルー盤面のアプとは題材が
 * 重ならないよう、海と霧を司る存在にした。
 */
export const CHILE_SPIRIT = {
  e: "⛵",
  n: t("The Caleuche|El Caleuche|Le Caleuche|カレウチェ"),
  big: t("The Caleuche's Fog Bank|La bruma del Caleuche|Le banc de brume du Caleuche|カレウチェの濃霧"),
  ward: "ramadecanelo",
  arrive: t(
    "<b>⛵ The Caleuche has taken an interest in you.</b> In Chilote legend, this ghost ship glides through the southern channels at night, crewed by the drowned and lit from within, and anyone who spots it risks being taken aboard or struck dumb so they can never describe it. It now trails <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>⛵ El Caleuche se ha fijado en ti.</b> Según la leyenda chilota, este barco fantasma se desliza de noche por los canales del sur, tripulado por ahogados y iluminado por dentro, y quien lo ve corre el riesgo de ser llevado a bordo o quedar mudo para no poder describirlo jamás. Ahora sigue a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>⛵ Le Caleuche s'est intéressé à toi.</b> Selon la légende chilote, ce navire fantôme glisse la nuit dans les chenaux du sud, avec un équipage de noyés et illuminé de l'intérieur, et quiconque l'aperçoit risque d'être emmené à bord ou rendu muet pour ne jamais pouvoir le décrire. Il suit désormais <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>⛵ カレウチェの目に留まった。</b> チロエの伝承によれば、この幻の帆船は夜になると南部の水路を静かに滑り、水死者たちが乗組員となって船内から光を放つ。これを見た者は船に連れ去られるか、二度と語れぬよう口を利けなくされるという。いま目的地から最も遠い <b>{0}</b> の後を追い、毎ターン災難をもたらす。",
  ),
  moves: t(
    "⛵ <b>The Caleuche</b> slips into the fog and reappears beside <b>{0}</b>, farthest from {1}.|⛵ <b>El Caleuche</b> se pierde en la niebla y reaparece junto a <b>{0}</b>, el más lejano de {1}.|⛵ <b>Le Caleuche</b> se glisse dans la brume et réapparaît près de <b>{0}</b>, le plus loin de {1}.|⛵ <b>カレウチェ</b> は霧の中へ消え、{1} から最も遠い <b>{0}</b> の傍らに再び現れた。",
  ),
  wake: t(
    "<b>{0}</b> has sailed four turns in the Caleuche's wake without ever looking away. The ship's lights flare all at once and the fog rolls in solid — <b>the Caleuche's Fog Bank</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos navegando a la estela del Caleuche sin apartar nunca la mirada. Las luces del barco estallan de golpe y la niebla se cierra del todo: empieza <b>la bruma del Caleuche</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> navigue depuis quatre tours dans le sillage du Caleuche sans jamais détourner le regard. Les lumières du navire flambent d'un coup et la brume se referme entièrement : <b>le banc de brume du Caleuche</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> はカレウチェの航跡を4ターンも進みながら、一度も目をそらさなかった。船の灯りが一斉に燃え上がり、霧が濃く垂れ込める。<b>カレウチェの濃霧</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the Caleuche is one of the best-known figures of Chilote mythology, tied historically to real fears about disappearances at sea in the treacherous channels of Chiloé, and is still told today as a living legend rather than a children's tale.|<b>Tras la historia:</b> el Caleuche es una de las figuras más conocidas de la mitología chilota, ligada históricamente a temores reales sobre desapariciones en el mar en los traicioneros canales de Chiloé, y todavía hoy se cuenta como leyenda viva y no como cuento infantil.|<b>Derrière l'histoire :</b> le Caleuche est l'une des figures les plus connues de la mythologie chilote, historiquement liée à de réelles craintes de disparitions en mer dans les chenaux traîtres de Chiloé, et se raconte encore aujourd'hui comme une légende vivante plutôt qu'un conte pour enfants.|<b>物語の背景:</b> カレウチェはチロエ神話でもとりわけよく知られた存在で、チロエの危険な水路での行方不明という現実の恐れと歴史的に結びついている。いまも子供向けの昔話としてではなく、生きた伝承として語り継がれている。",
  ),
  pleased: t(
    "The fog thins for a moment, and something glints on the tideline that the sea left behind. <b>{0}</b> gains <span class='money'>+{1}</span>.|La niebla se aclara un instante, y algo brilla en la línea de marea que dejó el mar. <b>{0}</b> gana <span class='money'>+{1}</span>.|La brume s'éclaircit un instant, et quelque chose brille sur la laisse de mer que la marée a laissée. <b>{0}</b> gagne <span class='money'>+{1}</span>.|霧が一瞬薄れ、潮が残していった渚に何かがきらりと光った。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A branch of canelo is set by the door, the way Chilote grandmothers still teach. The ship glides past without slowing, passing <b>{0}</b> without incident this turn.|Se pone una rama de canelo junto a la puerta, como todavía enseñan las abuelas chilotas. El barco se desliza sin aminorar, pasando junto a <b>{0}</b> sin incidentes esta vuelta.|Une branche de canelo est posée près de la porte, comme l'enseignent encore les grands-mères chilotes. Le navire glisse sans ralentir, passant devant <b>{0}</b> sans incident ce tour-ci.|チロエの祖母たちがいまも教えるとおり、戸口にカネロの枝を一本立てた。船は速度を緩めることなく滑り去り、このターンは何事もなく <b>{0}</b> の傍らを通り過ぎた。",
  ),
};

/**
 * 災難7種。並び順が仕組みと対応している(`season-and-doom-rules.ts` 側は
 * 全盤面共通で fine / percentLoss / skipTurn / loseProperties / payOthers /
 * teleport / steal の順に対応づける)。登録時に順序を変えないこと。
 *
 * 太平洋戦争の関税紛争(アントファガスタの都市カード)をそのまま繰り返さず、
 * 「輸出関税」という同じ構造を現代の税関の話に置き換えて別の事実にしている。
 */
export const CHILE_DOOM = [
  // 1) fine — 直接の出費
  {
    id: "impuesto-salitre",
    n: t("A surprise customs reassessment on a mineral shipment|Una reliquidación aduanera sorpresa sobre un embarque mineral|Une réévaluation douanière surprise sur un chargement minier|鉱物輸出に思わぬ税関の再査定"),
    t: t(
      "The paperwork looked fine when the truck left the mine, but customs at the port reassessed the shipment's export duty before it could be loaded, and the difference had to be paid on the spot to keep the container moving. Export duties on copper and mining royalties are argued over in Chile's Congress most years, and the numbers can shift between the mine gate and the dock.|El papeleo parecía correcto cuando el camión salió de la mina, pero la aduana en el puerto reliquidó el derecho de exportación del embarque antes de poder cargarlo, y la diferencia hubo que pagarla en el acto para que el contenedor siguiera su curso. Los derechos de exportación del cobre y los royalties mineros se discuten casi todos los años en el Congreso chileno, y las cifras pueden cambiar entre la puerta de la mina y el muelle.|Les papiers semblaient en règle quand le camion a quitté la mine, mais la douane du port a réévalué le droit d'exportation du chargement avant qu'il ne puisse être embarqué, et la différence a dû être payée sur-le-champ pour que le conteneur continue sa route. Les droits d'exportation sur le cuivre et les redevances minières sont débattus presque chaque année au Congrès chilien, et les chiffres peuvent changer entre la sortie de la mine et le quai.|トラックが鉱山を出たときは書類に問題は無かったが、港の税関は積み込み前に輸出税を再査定し、その差額をその場で払わなければコンテナを先へ進められなかった。銅の輸出税や鉱業ロイヤルティは、ほぼ毎年チリ議会で議論の的になっており、鉱山の門を出てから埠頭に着くまでのあいだに数字が変わることもある。",
    ),
  },
  // 2) percentLoss — 資産の割合を失う
  {
    id: "terremoto",
    n: t("The ground shakes without warning|La tierra tiembla sin avisar|La terre tremble sans prévenir|前触れなく大地が揺れる"),
    t: t(
      "A quake rattles shelves and cracks plaster somewhere along the coast, one of the dozens Chile's seismographs record every single day, most too small to notice and a few not. Insurance and quick repairs eat into savings whenever a bigger one lands close to a town.|Un sismo hace temblar estantes y agrieta el yeso en algún punto de la costa, uno de las decenas que registran a diario los sismógrafos de Chile, casi todos demasiado leves para notarse y unos pocos no. El seguro y las reparaciones urgentes se comen los ahorros cuando uno más fuerte cae cerca de un pueblo.|Une secousse fait vibrer les étagères et fissure le plâtre quelque part sur la côte, l'une des dizaines que les sismographes du Chili enregistrent chaque jour, presque toutes trop faibles pour être remarquées et quelques-unes non. L'assurance et les réparations rapides entament les économies quand une secousse plus forte frappe près d'une ville.|海岸のどこかで棚が揺れ、漆喰にひびが入る。チリの地震計が毎日記録する何十もの揺れの一つで、たいていは気づかれないほど小さいが、中にはそうでないものもある。町の近くで大きめの揺れが起きるたび、保険や急ぎの修理が貯えを食いつぶす。",
    ),
  },
  // 3) skipTurn — 足止め
  {
    id: "aluvion",
    n: t("A flash flood of mud blocks the only road|Un aluvión de barro bloquea el único camino|Une coulée de boue soudaine bloque l'unique route|土石流(アルビオン)が唯一の道をふさぐ",
    ),
    t: t(
      "A rare storm dumped more rain on the bone-dry hills than the ground could absorb, and the resulting aluvión of mud and rock buried the road before anyone could clear a path around it. Towns in the desert north are built for decades without rain and can be caught badly off guard when it finally comes.|Una tormenta poco común dejó caer sobre los cerros resecos más lluvia de la que el suelo podía absorber, y el aluvión de barro y piedra resultante sepultó el camino antes de que alguien pudiera despejar un desvío. Los pueblos del norte desértico se construyen para décadas sin lluvia y pueden quedar muy desprevenidos cuando por fin llega.|Un orage rare a déversé sur les collines desséchées plus de pluie que le sol ne pouvait en absorber, et l'aluvión de boue et de roche qui en a résulté a enseveli la route avant que quiconque ne puisse dégager un détour. Les bourgs du désert du nord sont bâtis pour des décennies sans pluie et peuvent être pris totalement au dépourvu quand elle finit par arriver.|めったにない嵐が、乾ききった丘に地面が吸収しきれないほどの雨を降らせ、その結果起きた泥と岩の土石流(アルビオン)が、迂回路を切り開く間もなく道を埋めてしまった。北部砂漠の町々は何十年も雨が降らない前提で建てられており、ついに雨が来たときには不意を突かれることがある。",
      ),
    months: [9, 10, 11],
  },
  // 4) loseProperties — 持ち物件を失う
  {
    id: "relave-derrame",
    n: t("A tailings dam spills over|Se derrama un tranque de relaves|Un bassin de résidus déborde|尾鉱ダムがあふれる"),
    t: t(
      "Heavy rain overtopped a mine's tailings dam upstream, and the grey sludge that followed the streambed down covered fields and blocked wells before crews could contain it. Regulations tightened after past dam failures, but older, smaller impoundments near older mines are still watched nervously every rainy season.|Una lluvia intensa desbordó el tranque de relaves de una mina río arriba, y el lodo gris que siguió el cauce cubrió campos y tapó pozos antes de que las cuadrillas pudieran contenerlo. Las normas se endurecieron tras fallas de tranques del pasado, pero los embalses más antiguos y pequeños cerca de minas viejas todavía se vigilan con nerviosismo cada temporada de lluvias.|De fortes pluies ont fait déborder le bassin de résidus d'une mine en amont, et la boue grise qui a suivi le lit du cours d'eau a recouvert des champs et bouché des puits avant que les équipes ne puissent la contenir. La réglementation s'est durcie après d'anciennes ruptures de bassins, mais les retenues plus vieilles et plus petites près d'anciennes mines sont encore surveillées avec nervosité à chaque saison des pluies.|上流の鉱山の尾鉱ダムが豪雨であふれ、川筋を伝って下ってきた灰色の泥が、作業班が食い止める前に畑を覆い井戸を塞いだ。過去のダム決壊を受けて規制は厳しくなったが、古い鉱山の近くに残る小さく古い堆積池は、いまも毎年の雨季にひやひやしながら見守られている。",
    ),
  },
  // 5) payOthers — 皆に払う
  {
    id: "polla-perdida",
    n: t("A lost office football pool|Una polla de fútbol perdida en la oficina|Un pari de foot de bureau perdu|職場のサッカー賭けに負ける"),
    t: t(
      "Everyone at work chipped in for the office polla on La Roja's match, and the losing side had to settle up on Monday morning in front of everyone. Betting a little on the national team is close to a national pastime in itself, win or lose.|Todos en el trabajo pusieron su parte para la polla de la oficina por el partido de La Roja, y el bando perdedor tuvo que pagar el lunes en la mañana delante de todos. Apostar un poco por la selección es casi un pasatiempo nacional en sí mismo, se gane o se pierda.|Tout le monde au bureau a mis sa part dans le pari collectif sur le match de La Roja, et le camp perdant a dû régler ses comptes le lundi matin devant tous. Parier un peu sur l'équipe nationale est presque un passe-temps national en soi, qu'on gagne ou qu'on perde.|職場の全員がラ・ロハの試合をめぐる賭けの「ポージャ」にお金を出し合い、負けた側は月曜の朝、みんなの前で払わなければならなかった。代表戦に少額を賭けることは、勝敗にかかわらずそれ自体がほとんど国民的な娯楽である。",
    ),
  },
  // 6) teleport — 気付けば違う場所に
  {
    id: "barco-desviado",
    n: t("A ferry is diverted by weather in the southern channels|Un ferry es desviado por el clima en los canales del sur|Un ferry est dérouté par le temps dans les chenaux du sud|南部の水路で天候によりフェリーが迂回する"),
    t: t(
      "Wind and swell in the narrow channels forced the captain to shelter in a different inlet for the night, and by the time the ferry got moving again it had fallen well behind its planned stop. Schedules on this stretch of coast are always written with a wide margin for exactly this.|El viento y la marejada en los canales angostos obligaron al capitán a resguardarse en una caleta distinta durante la noche, y para cuando el ferry volvió a moverse ya iba muy atrasado respecto a su parada prevista. Los horarios en este tramo de costa siempre se escriben con un margen amplio justamente para esto.|Le vent et la houle dans les chenaux étroits ont forcé le capitaine à s'abriter dans une autre crique pour la nuit, et le temps que le ferry reparte, il avait pris beaucoup de retard sur son escale prévue. Les horaires sur ce tronçon de côte sont toujours écrits avec une large marge, précisément pour ça.|狭い水路の風とうねりのため、船長は一晩別の入り江に避難せざるを得ず、フェリーが再び動き出す頃には予定していた寄港地から大きく遅れていた。この海岸沿いの時刻表は、まさにこうした事態のために、いつも余裕を大きく取って組まれている。",
      ),
    months: [2, 3, 4],
  },
  // 7) steal — すられる
  {
    id: "lanza-metro",
    n: t("A pickpocket works the crowded Metro|Un lanza trabaja el Metro abarrotado|Un voleur à la tire sévit dans le métro bondé|混み合う地下鉄でスリに遭う"),
    t: t(
      "The carriage was packed shoulder to shoulder at rush hour, and a hand slipped a phone from an open bag between one station and the next without anyone noticing over the noise of the doors. Santiago's Metro carries millions of riders a day, and platform announcements warn about lanzas as routinely as they announce the next stop.|El vagón iba apretado hombro con hombro en hora punta, y una mano sacó un teléfono de una mochila abierta entre una estación y la siguiente sin que nadie lo notara entre el ruido de las puertas. El Metro de Santiago mueve a millones de pasajeros al día, y los avisos de andén advierten sobre lanzas con la misma rutina con que anuncian la próxima estación.|La rame était bondée épaule contre épaule à l'heure de pointe, et une main a sorti un téléphone d'un sac ouvert entre une station et la suivante sans que personne ne le remarque dans le bruit des portes. Le métro de Santiago transporte des millions de voyageurs par jour, et les annonces de quai mettent en garde contre les voleurs à la tire aussi couramment qu'elles annoncent la prochaine station.|ラッシュ時、車両は肩がぶつかるほど混み合っており、ドアの音にまぎれて誰も気づかないうちに、開いたバッグから携帯電話が一駅ぶんのあいだに抜き取られた。サンティアゴの地下鉄は一日に何百万人もの乗客を運んでおり、ホームの案内放送は次の駅を告げるのと同じくらい当たり前にスリへの注意を呼びかける。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月(暦の並びは他国と共通)。南半球なので中身は
 * 逆になる(4月は収穫の終わり、9月18日が独立記念日、2月が真夏)。
 */
export const CHILE_SEASONS = [
  {
    e: "🍇",
    n: t("The grape harvest closes with festivals across the valleys|La vendimia cierra con fiestas por los valles|Les vendanges se referment sur des fêtes dans les vallées|ブドウ収穫祭が谷々を締めくくる"),
    t: t(
      "The autumn crush is finishing across the central valley's vineyards, and towns from Curicó to Colchagua mark the end of the harvest with grape-treading, folk dance and open cellars, well before Chilean wine became the major export it is today.|La molienda de otoño está terminando en los viñedos del valle central, y pueblos de Curicó a Colchagua celebran el fin de la cosecha con pisado de uva, baile folclórico y bodegas abiertas, mucho antes de que el vino chileno se convirtiera en la gran exportación que es hoy.|Le pressurage d'automne s'achève dans les vignobles de la vallée centrale, et des bourgs de Curicó à Colchagua marquent la fin de la récolte par le foulage du raisin, la danse folklorique et des chais ouverts, bien avant que le vin chilien ne devienne la grande exportation qu'il est aujourd'hui.|中央谷のブドウ畑では秋の搾汁が終わりに近づき、クリコからコルチャグアまでの町々は、ブドウ踏みや民族舞踊、蔵の開放とともに収穫の終わりを祝う。チリワインがいまのような一大輸出品になるよりずっと前から続く習わしである。",
    ),
    f: t(
      "Export-grade wine only became a major national industry from the 1980s onward, once foreign investment and new equipment let growers compete abroad; the harvest festivals themselves are far older, rooted in each valley's own farming calendar.|El vino de exportación solo se convirtió en una gran industria nacional a partir de los años ochenta, cuando la inversión extranjera y el nuevo equipamiento permitieron a los productores competir en el exterior; las fiestas de la vendimia en sí son mucho más antiguas, arraigadas en el calendario agrícola de cada valle.|Le vin d'exportation n'est devenu une grande industrie nationale qu'à partir des années 1980, quand l'investissement étranger et le nouvel équipement ont permis aux producteurs de rivaliser à l'étranger ; les fêtes des vendanges elles-mêmes sont bien plus anciennes, enracinées dans le calendrier agricole propre à chaque vallée.|輸出向けワインが一大産業になったのは1980年代以降、外国資本と新しい設備によって生産者が海外で競えるようになってからのことにすぎない。収穫祭そのものはそれよりずっと古く、それぞれの谷の農事暦に根ざしている。",
    ),
  },
  {
    e: "⚓",
    n: t("Naval Glories Day remembers a battle lost at sea|El Día de las Glorias Navales recuerda una batalla perdida en el mar|Le Jour des Gloires navales rappelle une bataille perdue en mer|海軍栄光の日が、海で敗れた戦いを悼む"),
    t: t(
      "21 May marks the 1879 naval battle of Iquique, in which Chile's outgunned corvette Esmeralda was sunk and its captain, Arturo Prat, died boarding the enemy ship rather than surrender; Chile keeps the day as a solemn naval holiday despite losing the battle itself.|El 21 de mayo conmemora el combate naval de Iquique de 1879, en que la corbeta chilena Esmeralda, en inferioridad de fuerza, fue hundida y su capitán, Arturo Prat, murió al abordar la nave enemiga en vez de rendirse; Chile guarda el día como feriado naval solemne pese a haber perdido el propio combate.|Le 21 mai commémore le combat naval d'Iquique de 1879, où la corvette chilienne Esmeralda, en infériorité, fut coulée et son capitaine, Arturo Prat, mourut en abordant le navire ennemi plutôt que de se rendre ; le Chili garde ce jour comme un jour férié naval solennel bien qu'ayant perdu le combat lui-même.|5月21日は1879年のイキケ海戦を記念する日である。劣勢だったチリのコルベット艦エスメラルダは撃沈され、艦長アルトゥーロ・プラットは降伏を拒んで敵艦への斬り込みで戦死した。この戦い自体には敗れたにもかかわらず、チリはこの日をいまも厳粛な海軍の祝日としている。",
    ),
    f: t(
      "Prat's death was turned into a founding patriotic legend almost immediately, and his name now marks streets, ships and towns across the country far more often than any battle Chile actually won.|La muerte de Prat se convirtió casi de inmediato en una leyenda patria fundacional, y hoy su nombre marca calles, barcos y pueblos por todo el país con mucha más frecuencia que cualquier batalla que Chile realmente ganó.|La mort de Prat devint presque aussitôt une légende patriotique fondatrice, et son nom marque aujourd'hui rues, navires et bourgs à travers tout le pays bien plus souvent qu'aucune bataille réellement remportée par le Chili.|プラットの死はほぼ即座に、建国の物語を支える愛国的な伝説となった。いま彼の名は、チリが実際に勝った戦いよりもずっと多く、全国の通りや船、町の名として残されている。",
    ),
  },
  {
    e: "🌒",
    n: t("We Tripantu marks the Mapuche new year at the solstice|El We Tripantu marca el año nuevo mapuche en el solsticio|Le We Tripantu marque le nouvel an mapuche au solstice|冬至にウェ・トリパントゥ(マプチェの新年)を迎える"),
    t: t(
      "Around the winter solstice, Mapuche communities across the south mark We Tripantu, the return of the sun, with an overnight vigil, ritual bathing before dawn and shared food, a living observance rather than a historical re-enactment.|En torno al solsticio de invierno, las comunidades mapuche del sur celebran el We Tripantu, el regreso del sol, con una vigilia nocturna, un baño ritual antes del amanecer y comida compartida, una observancia viva y no una recreación histórica.|Autour du solstice d'hiver, les communautés mapuches du sud célèbrent le We Tripantu, le retour du soleil, par une veillée nocturne, un bain rituel avant l'aube et un repas partagé, une observance vivante plutôt qu'une reconstitution historique.|冬至の頃、南部のマプチェの共同体はウェ・トリパントゥ(太陽の帰還)を祝う。夜通しの徹夜、夜明け前の沐浴の儀礼、分かち合う食事を伴う、いまも生きた行事であり、歴史の再現劇ではない。",
    ),
    f: t(
      "Chile made 24 June a national holiday marking Indigenous Peoples' Day only in 2021, decades after We Tripantu had already been openly celebrated again following years in which it was suppressed or discouraged.|Chile convirtió el 24 de junio en feriado nacional del Día de los Pueblos Indígenas recién en 2021, décadas después de que el We Tripantu ya se celebrara de nuevo abiertamente tras años en que fue reprimido o desalentado.|Le Chili n'a fait du 24 juin un jour férié national pour la Journée des peuples autochtones qu'en 2021, des décennies après que le We Tripantu était déjà de nouveau célébré ouvertement, après des années où il fut réprimé ou découragé.|チリが6月24日を先住民族の日として国の祝日にしたのは2021年になってからのことで、ウェ・トリパントゥが抑圧されたり控えられたりした時期を経て、すでに公然と祝われるようになってから何十年も後のことだった。",
    ),
  },
  {
    e: "💃",
    n: t("La Tirana fills the desert with dancers|La Tirana llena el desierto de bailarines|La Tirana emplit le désert de danseurs|ラ・ティラーナが砂漠を踊り手で埋める"),
    t: t(
      "For a week around 16 July, tens of thousands of costumed dancers converge on the small desert town of La Tirana for one of Chile's largest religious festivals, filling a place that otherwise counts only a few hundred residents.|Durante una semana en torno al 16 de julio, decenas de miles de bailarines disfrazados convergen en el pequeño pueblo desértico de La Tirana para una de las mayores fiestas religiosas de Chile, llenando un lugar que en otro momento apenas cuenta unos pocos cientos de habitantes.|Pendant une semaine autour du 16 juillet, des dizaines de milliers de danseurs costumés convergent vers le petit bourg désertique de La Tirana pour l'une des plus grandes fêtes religieuses du Chili, remplissant un lieu qui ne compte autrement que quelques centaines d'habitants.|7月16日前後の一週間、何万人もの仮装した踊り手が砂漠の小さな町ラ・ティラーナに集まり、チリでも屈指の規模の宗教祭が開かれる。ふだんは住民数百人ほどのこの町を埋め尽くす。",
    ),
    f: t(
      "The dances performed, called bailes religiosos, blend Catholic devotion with older Andean and Afro-descendant traditions from the mining camps that once brought migrant labour to the nitrate pampa.|Los bailes religiosos que se ejecutan mezclan la devoción católica con tradiciones andinas y afrodescendientes más antiguas, propias de los campamentos mineros que en su día trajeron mano de obra migrante a la pampa salitrera.|Les danses religieuses exécutées mêlent la dévotion catholique à des traditions andines et afro-descendantes plus anciennes, propres aux campements miniers qui apportèrent jadis une main-d'œuvre migrante à la pampa du salpêtre.|「バイレ・レリヒオソ」と呼ばれるこの踊りは、カトリックの信仰と、かつて硝石地帯へ出稼ぎ労働者を呼び込んだ鉱山キャンプに由来するより古いアンデスやアフリカ系の伝統とが混ざり合っている。",
    ),
  },
  {
    e: "🏔️",
    n: t("Snow closes the Andean passes|La nieve cierra los pasos andinos|La neige ferme les cols andins|雪がアンデスの峠を閉ざす"),
    t: t(
      "Heavy snowfall regularly shuts the mountain pass linking central Chile to Argentina for days at a time, stranding freight trucks in long queues and reminding towns on both sides how much of the year's trade depends on a single road through the peaks.|Las nevadas fuertes cierran con regularidad, por días seguidos, el paso de montaña que une el centro de Chile con Argentina, dejando varados a camiones de carga en largas filas y recordando a los pueblos de ambos lados cuánto del comercio del año depende de un solo camino entre las cumbres.|De fortes chutes de neige ferment régulièrement, pendant des jours d'affilée, le col de montagne reliant le centre du Chili à l'Argentine, immobilisant des camions de fret dans de longues files et rappelant aux bourgs des deux côtés combien le commerce de l'année dépend d'une seule route à travers les cimes.|大雪は中部チリとアルゼンチンを結ぶ山道を、数日間にわたって定期的に閉ざす。貨物トラックは長い列で立ち往生し、両側の町々に、年間の交易の多くがこの峰を貫くたった一本の道にかかっていることを思い知らせる。",
    ),
    f: t(
      "The same snowpack that closes the road each winter is what central Chile's rivers and reservoirs depend on for the following year's irrigation water, so a heavy snow season is dreaded on the highway and welcomed by farmers in the same week.|La misma capa de nieve que cierra el camino cada invierno es de la que dependen los ríos y embalses del centro de Chile para el agua de riego del año siguiente, así que una temporada de mucha nieve se teme en la carretera y se agradece entre los agricultores en la misma semana.|Le même manteau neigeux qui ferme la route chaque hiver est celui dont dépendent les rivières et barrages du centre du Chili pour l'eau d'irrigation de l'année suivante, si bien qu'une saison de fortes neiges est redoutée sur la route et accueillie avec soulagement par les agriculteurs la même semaine.|毎冬道を閉ざすのと同じ積雪こそが、中部チリの川や貯水池が翌年の灌漑用水を頼みにする水源でもある。だから大雪の年は、同じ週のうちに幹線道路では恐れられ、農家には歓迎される。",
    ),
  },
  {
    e: "🇨🇱",
    n: t("Fiestas Patrias fills the country with flags and asado smoke|Fiestas Patrias llena el país de banderas y humo de asado|Les Fiestas Patrias emplissent le pays de drapeaux et de fumée d'asado|フィエスタス・パトリアスが国を旗と焼肉の煙で満たす"),
    t: t(
      "18 September marks the 1810 start of Chile's independence process, and the days around it, known as Fiestas Patrias, empty offices and fill parks with fondas — temporary dance halls, barbecue smoke and the national drink terremoto — from the desert north to the lake district.|El 18 de septiembre marca el inicio en 1810 del proceso de independencia de Chile, y los días en torno a esa fecha, conocidos como Fiestas Patrias, vacían las oficinas y llenan los parques de fondas —salones de baile temporales, humo de asado y el trago nacional terremoto— desde el norte desértico hasta la zona de los lagos.|Le 18 septembre marque le début en 1810 du processus d'indépendance du Chili, et les jours qui l'entourent, appelés Fiestas Patrias, vident les bureaux et remplissent les parcs de fondas — bals temporaires, fumée de barbecue et le cocktail national terremoto — du désert du nord jusqu'à la région des lacs.|9月18日は1810年に始まったチリの独立過程を記念する日で、その前後の「フィエスタス・パトリアス」は職場を空にし、公園を「フォンダ」(仮設の踊り場)、焼肉の煙、国民的な飲み物「テレモト」で満たす。北の砂漠から湖水地方まで、国じゅうで同じことが起こる。",
    ),
    f: t(
      "The cocktail called terremoto — 'earthquake' — mixes cheap sweet wine, pineapple ice cream and a shot of stronger spirit, a name Chileans use with the same dark humour that names an earthquake-prone country's biggest party drink after a disaster.|El cóctel llamado terremoto mezcla vino dulce barato, helado de piña y un chorro de un licor más fuerte, un nombre que los chilenos usan con el mismo humor negro que bautiza la bebida festiva más popular de un país sísmico con el nombre de un desastre.|Le cocktail appelé terremoto mélange du vin doux bon marché, de la glace à l'ananas et une rasade d'alcool plus fort, un nom que les Chiliens emploient avec le même humour noir qui baptise la boisson festive la plus populaire d'un pays sismique du nom d'une catastrophe.|「テレモト(地震)」と呼ばれるこのカクテルは、安い甘口ワインにパイナップルアイスと強い酒を少し加えたもので、地震の多い国いちばんの祭りの飲み物に災害の名を付けるという、チリ流の皮肉なユーモアがそのまま名前になっている。",
    ),
  },
  {
    e: "🌱",
    n: t("Spring planting begins in the central valley|Comienza la siembra de primavera en el valle central|Les semailles de printemps commencent dans la vallée centrale|中央谷で春の作付けが始まる"),
    t: t(
      "As the rains ease and the days lengthen, farms across the central valley begin planting the fruit and vegetable crops that will fill export containers by the time the northern hemisphere is deep in its own winter.|Mientras las lluvias amainan y los días se alargan, las granjas del valle central comienzan a sembrar los cultivos de fruta y verdura que llenarán los contenedores de exportación para cuando el hemisferio norte esté en pleno invierno.|Alors que les pluies s'atténuent et que les jours s'allongent, les fermes de la vallée centrale commencent à planter les cultures fruitières et maraîchères qui rempliront les conteneurs d'exportation au moment où l'hémisphère nord sera en plein hiver.|雨が緩み日が長くなるにつれ、中央谷の農場は果物や野菜の作付けを始める。それは北半球が真冬を迎える頃、輸出用コンテナを満たすことになる。",
    ),
    f: t(
      "Chile's position south of the equator lets it supply fresh grapes, cherries and blueberries to markets in the United States and Europe during months when local growers there have nothing in season, a timing advantage the whole export industry is built around.|La posición de Chile al sur del ecuador le permite abastecer de uvas, cerezas y arándanos frescos a mercados de Estados Unidos y Europa en meses en que los productores locales de allá no tienen nada de temporada, una ventaja de calendario en torno a la cual se construye toda la industria exportadora.|La position du Chili au sud de l'équateur lui permet d'approvisionner en raisins, cerises et myrtilles fraîches les marchés des États-Unis et d'Europe durant les mois où les producteurs locaux n'y ont rien de saison, un avantage de calendrier autour duquel toute l'industrie exportatrice est bâtie.|赤道より南にあるチリの立地は、アメリカやヨーロッパの生産者が旬を迎えていない月に、新鮮なブドウやサクランボ、ブルーベリーをそれらの市場へ供給することを可能にする。この季節のずれこそが、輸出産業全体を支える強みになっている。",
    ),
  },
  {
    e: "🌸",
    n: t("The copihue blooms in the southern forest|El copihue florece en el bosque sureño|Le copihue fleurit dans la forêt du sud|コピウエが南部の森で咲く"),
    t: t(
      "Chile's national flower, a red or white bell-shaped vine flower found nowhere else, climbs native trees in the forests of the south and blooms through the spring, protected by law from being picked or uprooted in the wild.|La flor nacional de Chile, una enredadera con flores en forma de campana rojas o blancas que no se encuentra en ningún otro lugar, trepa por árboles nativos en los bosques del sur y florece durante la primavera, protegida por ley de ser cortada o arrancada en estado silvestre.|La fleur nationale du Chili, une liane à fleurs en forme de cloche rouges ou blanches que l'on ne trouve nulle part ailleurs, grimpe sur les arbres indigènes des forêts du sud et fleurit tout le printemps, protégée par la loi contre la cueillette ou l'arrachage à l'état sauvage.|チリの国花で、他のどこにも見られない赤や白の釣鐘形の花をつけるつる植物コピウエは、南部の森で在来の木に絡みつきながら春を通して咲く。野生のものを摘んだり掘り起こしたりすることは法律で禁じられている。",
    ),
    f: t(
      "The flower was declared a natural monument in 1977, one of Chile's earliest pieces of species-specific conservation law, after decades of unregulated picking for city flower markets had already thinned it out near several southern towns.|La flor fue declarada monumento natural en 1977, una de las primeras leyes de conservación de una especie específica en Chile, después de que décadas de recolección sin regular para los mercados florales de las ciudades ya la habían diezmado cerca de varios pueblos del sur.|La fleur fut déclarée monument naturel en 1977, l'une des premières lois chiliennes de conservation propres à une espèce, après que des décennies de cueillette non réglementée pour les marchés floraux urbains l'avaient déjà raréfiée près de plusieurs bourgs du sud.|この花は1977年に自然記念物に指定された。チリで種を特定した保護法としては早い部類に入るが、それは都市部の花市場向けに無秩序に摘み取られ続けた数十年のあいだに、南部のいくつかの町の近くですでに数を減らしたあとのことだった。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas opens the coastal summer|La Navidad abre el verano costero|Noël ouvre l'été côtier|クリスマスが海岸の夏を開く",
    ),
    t: t(
      "Christmas Eve dinner runs late into a warm summer night on the coast, windows open instead of a fire lit, and by the following week beach towns from Viña del Mar south begin filling with the first wave of summer visitors.|La cena de Nochebuena se alarga hasta bien entrada una cálida noche de verano en la costa, con las ventanas abiertas en vez de la chimenea encendida, y para la semana siguiente los balnearios desde Viña del Mar hacia el sur empiezan a llenarse con la primera ola de veraneantes.|Le dîner de la veille de Noël s'étire tard dans une chaude nuit d'été côtière, fenêtres ouvertes plutôt que feu allumé, et dès la semaine suivante les stations balnéaires au sud de Viña del Mar commencent à se remplir de la première vague d'estivants.|クリスマスイブの夕食は、暖炉ではなく窓を開け放った海岸の暖かい夏の夜更けまで続く。翌週にはもう、ビニャ・デル・マールより南の海辺の町々が最初の夏の行楽客で埋まり始める。",
    ),
    f: t(
      "Southern-hemisphere Christmas imagery still borrows heavily from a northern winter — snowmen, pine trees, sledges — a mismatch Chilean households have long since stopped noticing even while eating dinner outdoors in short sleeves.|La imaginería navideña del hemisferio sur todavía toma prestado en gran medida del invierno del norte —muñecos de nieve, pinos, trineos—, un desajuste que los hogares chilenos hace tiempo dejaron de notar aunque cenen al aire libre en manga corta.|L'imagerie de Noël dans l'hémisphère sud emprunte encore largement à l'hiver du nord — bonshommes de neige, sapins, traîneaux —, un décalage que les foyers chiliens ont depuis longtemps cessé de remarquer, même en dînant dehors en manches courtes.|南半球のクリスマスの飾りつけは、いまも雪だるまやモミの木、そりといった北の冬のイメージを色濃く借りている。半袖で屋外の夕食を囲みながらも、チリの家庭はもうとうにこのちぐはぐさに気づかなくなっている。",
    ),
  },
  {
    e: "🏖️",
    n: t("Beach towns reach their summer peak|Los balnearios llegan a su pico veraniego|Les stations balnéaires atteignent leur pic estival|海辺の町が夏の盛りを迎える"),
    t: t(
      "Santiago empties out as families head for the coast or the lake district for the school summer holidays, and beach towns from Viña del Mar to Pucón operate on a population several times their off-season size for a few crowded weeks.|Santiago se vacía mientras las familias se van a la costa o a la zona de los lagos para las vacaciones de verano escolares, y los balnearios de Viña del Mar a Pucón funcionan con una población varias veces mayor que fuera de temporada durante unas pocas semanas de gentío.|Santiago se vide tandis que les familles partent vers la côte ou la région des lacs pour les vacances d'été scolaires, et les stations balnéaires de Viña del Mar à Pucón fonctionnent avec une population plusieurs fois supérieure à celle de la basse saison durant quelques semaines bondées.|学校の夏休みに合わせて家族が海岸や湖水地方へ向かい、サンティアゴは人が減る。ビニャ・デル・マールからプコンまでの行楽地は、混み合う数週間のあいだ、閑散期の何倍もの人口で動くことになる。",
    ),
    f: t(
      "Chile's school year runs March to December, the reverse of the northern-hemisphere calendar, so the long summer break falls squarely across January and February rather than mid-year.|El año escolar chileno va de marzo a diciembre, al revés del calendario del hemisferio norte, así que las largas vacaciones de verano caen justo en enero y febrero, y no a mitad de año.|L'année scolaire chilienne va de mars à décembre, à l'inverse du calendrier de l'hémisphère nord, si bien que les longues vacances d'été tombent en plein janvier et février plutôt qu'à mi-année.|チリの学年度は3月から12月までで、北半球のカレンダーとは逆になる。そのため長い夏休みは年の半ばではなく、ちょうど1月から2月にかけてになる。",
    ),
  },
  {
    e: "🎤",
    n: t("The Viña del Mar song festival fills five nights of television|El Festival de Viña del Mar llena cinco noches de televisión|Le festival de la chanson de Viña del Mar remplit cinq soirées de télévision|ビニャ・デル・マール歌謡祭が5夜のテレビを埋める"),
    t: t(
      "Held every February since 1960, the international song festival at Viña del Mar's outdoor amphitheatre draws one of the largest television audiences of the Chilean year, famous as much for the crowd's blunt booing of acts it dislikes as for the performances themselves.|Celebrado cada febrero desde 1960, el festival internacional de la canción en el anfiteatro al aire libre de Viña del Mar reúne a una de las mayores audiencias televisivas del año en Chile, célebre tanto por los abucheos francos del público hacia lo que no le gusta como por las actuaciones mismas.|Tenu chaque février depuis 1960, le festival international de la chanson dans l'amphithéâtre en plein air de Viña del Mar rassemble l'une des plus grandes audiences télévisées de l'année au Chili, aussi célèbre pour les huées franches du public envers ce qu'il n'aime pas que pour les prestations elles-mêmes.|1960年から毎年2月に開かれるビニャ・デル・マールの野外円形劇場での国際歌謡祭は、チリの一年でもとりわけ大きなテレビ視聴者数を集める。出演者への遠慮のないブーイングは、演目そのものと同じくらい名物になっている。",
    ),
    f: t(
      "The amphitheatre, nicknamed the Quinta Vergara after the park that hosts it, seats around fifteen thousand people and has featured international acts alongside Chilean performers since the festival's earliest editions.|El anfiteatro, apodado la Quinta Vergara por el parque que lo alberga, tiene capacidad para unas quince mil personas y ha presentado artistas internacionales junto a intérpretes chilenos desde las primeras ediciones del festival.|L'amphithéâtre, surnommé la Quinta Vergara d'après le parc qui l'abrite, peut accueillir environ quinze mille personnes et a présenté des artistes internationaux aux côtés d'interprètes chiliens dès les toutes premières éditions du festival.|会場を含む公園にちなんで「キンタ・ベルガラ」と呼ばれるこの円形劇場は、およそ1万5000人を収容し、初期の開催から国際的な出演者とチリの歌手が共に舞台に立ってきた。",
    ),
  },
  {
    e: "📚",
    n: t("The school year begins as summer fades|El año escolar comienza mientras el verano se apaga|L'année scolaire commence tandis que l'été s'estompe|夏が終わり、新学年が始まる"),
    t: t(
      "Classes resume across the country in early March, and stationery shops sell out of uniforms and notebooks in the same week that the last summer crowds pack up and head back from the coast to the cities.|Las clases se reanudan en todo el país a comienzos de marzo, y las librerías escolares agotan uniformes y cuadernos la misma semana en que las últimas multitudes veraniegas hacen las maletas y vuelven de la costa a las ciudades.|Les cours reprennent dans tout le pays début mars, et les papeteries scolaires épuisent uniformes et cahiers la même semaine où les dernières foules estivales plient bagage pour rentrer de la côte vers les villes.|3月初め、全国で授業が再開する。文具店が制服やノートを売り切らせるのと同じ週に、夏の行楽客の最後の波が荷物をまとめ、海岸から街へと引き上げていく。",
    ),
    f: t(
      "The academic calendar was set to this rhythm long before any of today's export industries existed, tied instead to the agricultural cycle of the central valley, where the harvest, not the holiday, once decided when children could be spared from farm work.|El calendario académico se fijó con este ritmo mucho antes de que existiera cualquiera de las industrias exportadoras de hoy, ligado en cambio al ciclo agrícola del valle central, donde era la cosecha, no las vacaciones, la que antaño decidía cuándo se podía prescindir de los niños en el trabajo de campo.|Le calendrier scolaire fut fixé à ce rythme bien avant qu'aucune des industries d'exportation actuelles n'existe, lié plutôt au cycle agricole de la vallée centrale, où c'était la récolte, non les vacances, qui décidait autrefois quand on pouvait se passer des enfants aux champs.|この学校暦のリズムは、いまある輸出産業のどれよりも前から決まっていたもので、むしろ中央谷の農事暦に結びついている。かつては休暇ではなく収穫こそが、子供を農作業から解放できる時期を決めていた。",
    ),
  },
];
