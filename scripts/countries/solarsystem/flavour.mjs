/**
 * 太陽系の盤面情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 他国は実在の言い伝えから厄災の神を採るが、太陽系には土地の言い伝えが
 * 無い。**そのため厄災の神(スクラップ・スプライト)はこのゲームのために
 * 作った架空の存在であり、実在の神話や伝承を借りていない。**本文でも
 * 「宇宙飛行士のあいだで語られる話」という体裁にして、史実や実在の信仰と
 * 混同されないようにしてある。
 *
 * 季節(12ヶ月)は実際の四季が無いので、代わりに**実在する宇宙開発史の
 * 記念日**を月ごとに割り当てた(4月始まり)。豆知識の1文目に必ず年号と
 * 固有名詞が入るようにしてある。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const SOLARSYSTEM_META = {
  id: "solarsystem",
  name: t("The Solar System|El Sistema Solar|Le Système solaire|太陽系"),
  blurb: t(
    "A line with no coastline, where every stop is a world of its own and the sea is simply everything between them|Una línea sin costa, donde cada parada es un mundo propio y el mar es sencillamente todo lo que hay entre ellos|Une ligne sans littoral, où chaque arrêt est un monde à part et la mer n'est que tout ce qu'il y a entre eux|海岸線の無い路線。どの駅も一つの世界そのもので、海はただ、その間に広がるすべてを指す",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (他国と同じ理由)。team-lead指示どおり ×100(所持金1200×100=120,000cr)を想定。
  cur: { pre: "", post: " cr", mul: 100 },
  start: "earth",
  // 実在する動物宇宙飛行士から。人間の実在の宇宙飛行士の名は対戦相手の名前として
  // 使わない(競う相手にするのが失礼になりかねないため)。
  cpuNames: ["Laika", "Ham", "Félicette", "Miss Baker"],
  // 深宇宙紺・太陽の黄橙・地球の青・火星の赤錆・土星の環の金。
  stripe: ["#050a1c", "#f5b31c", "#2f6fb0", "#b5502a", "#e8d8a0"],
};

/** 7地方区分。天体系のまとまりに沿う(money-events・seasons の演出に使う)。 */
export const SOLARSYSTEM_REGIONS = {
  core: t("The Sun itself|El Sol mismo|Le Soleil lui-même|太陽そのもの"),
  inner: t("The inner, rocky worlds|Los mundos rocosos interiores|Les mondes rocheux intérieurs|地球型惑星"),
  belt: t("The asteroid belt|El cinturón de asteroides|La ceinture d'astéroïdes|小惑星帯"),
  outer: t("The giant planets and their moons|Los planetas gigantes y sus lunas|Les planètes géantes et leurs lunes|巨大惑星とその衛星"),
  tno: t("Pluto and the Kuiper Belt|Plutón y el cinturón de Kuiper|Pluton et la ceinture de Kuiper|冥王星とカイパーベルト"),
  deep: t("The far edge of the Solar System|El borde lejano del Sistema Solar|Le lointain bord du Système solaire|太陽系の遠い縁"),
  probe: t("Robotic explorers|Exploradores robóticos|Explorateurs robotiques|無人探査機"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts` に登録)。既存の鍵と
 * 衝突しない新規9件(確認方法はREGISTER.md参照)。
 */
export const SOLARSYSTEM_ITEMS = {
  gravassist: {
    e: "🛰️",
    price: 260,
    kind: "move",
    n: t("Gravity-Assist Slingshot|Asistencia gravitatoria|Assistance gravitationnelle|重力アシスト・スイングバイ"),
    d: t(
      "Carried 8–12 squares. Momentum decides where you end up.|Te lleva de 8 a 12 casillas. El impulso decide dónde acabas.|Emporté de 8 à 12 cases. L'élan décide où tu finis.|8〜12マス運ばれる。どこに着くかは勢いまかせ。",
    ),
    f: t(
      "Voyager 2 borrowed a rare alignment of the outer planets to swing from one to the next, gaining speed for free each time by stealing a sliver of a planet's own orbital momentum. The trick only works if the timing is exact — miss the window and there is no second try on the same pass.|La Voyager 2 aprovechó una rara alineación de los planetas exteriores para saltar de uno a otro, ganando velocidad gratis cada vez al robar una pizca del propio impulso orbital del planeta. El truco solo funciona con un cronometraje exacto.|Voyager 2 a profité d'un alignement rare des planètes extérieures pour bondir de l'une à l'autre, gagnant à chaque fois de la vitesse gratuitement en volant un peu de l'élan orbital de la planète. Le tour ne fonctionne qu'avec un minutage exact.|ボイジャー2号は外惑星のまれな配置を利用し、一つの惑星の軌道の勢いをわずかに借り受けては次へ次へと加速していった。この技はタイミングが寸分違わず合ったときしか効かない。窓を逃せば、同じ通過では二度目のチャンスは無い。",
    ),
  },
  ionburn: {
    e: "🔷",
    price: 380,
    kind: "pre",
    n: t("Ion Thruster Burn|Encendido de motor iónico|Poussée du moteur ionique|イオンエンジン噴射"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Dawn spacecraft's ion engine produced thrust roughly equal to the weight of a sheet of paper resting on your hand, yet by pushing continuously for years it reached speed changes no chemical rocket carried aboard could match. Patience, not power, is the whole idea.|El motor iónico de la sonda Dawn generaba un empuje similar al peso de una hoja de papel sobre la mano, pero al empujar sin parar durante años alcanzó cambios de velocidad que ningún cohete químico a bordo podría igualar.|Le moteur ionique de la sonde Dawn produisait une poussée à peu près égale au poids d'une feuille de papier posée sur la main, mais en poussant sans relâche pendant des années, il a atteint des changements de vitesse qu'aucune fusée chimique embarquée n'aurait pu égaler.|探査機ドーンのイオンエンジンが生む推力は、手のひらに紙一枚を乗せた重さほどしかない。それでも何年も押し続けることで、機体に積んだどんな化学燃料ロケットにも出せない速度変化を実現した。力ではなく根気がものを言う仕組みである。",
    ),
  },
  solarsail: {
    e: "⛵",
    price: 420,
    kind: "pre",
    n: t("Solar Sail Deployment|Despliegue de vela solar|Déploiement de voile solaire|ソーラーセイル展開",
    ),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Japan's IKAROS became the first spacecraft to cross interplanetary space pushed only by sunlight in 2010, unfurling a sail thinner than a human hair over an area the size of a small house. The push from light alone is tiny, but in the vacuum of space nothing is there to slow it down.|La sonda japonesa IKAROS se convirtió en 2010 en la primera nave en cruzar el espacio interplanetario impulsada solo por la luz solar, desplegando una vela más fina que un cabello humano y del tamaño de una casa pequeña.|La sonde japonaise IKAROS fut en 2010 le premier engin à traverser l'espace interplanétaire propulsé par la seule lumière solaire, déployant une voile plus fine qu'un cheveu humain sur une surface de la taille d'une petite maison.|日本の探査機イカロスは2010年、太陽光だけを受けて惑星間空間を渡った初めての探査機となった。人の髪より薄い帆を、小さな家ほどの面積に広げている。光だけが与える推力はごくわずかだが、真空の宇宙にはそれを妨げるものが何も無い。",
    ),
  },
  fusiondrive: {
    e: "☄️",
    price: 640,
    kind: "pre",
    n: t("Fusion Drive Concept|Concepto de motor de fusión|Concept de moteur à fusion|核融合推進の設計案"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "No fusion rocket has ever actually flown — the 1970s British Interplanetary Society study Project Daedalus only worked the idea out on paper, sketching an unmanned probe that could in theory reach a nearby star within a human lifetime. Engineering studies like it still shape how real propulsion research is funded today.|Ningún cohete de fusión ha volado jamás: el estudio británico de los años setenta Proyecto Dédalo solo desarrolló la idea sobre el papel, esbozando una sonda no tripulada que en teoría podría alcanzar una estrella cercana en una vida humana.|Aucune fusée à fusion n'a jamais volé : l'étude britannique des années 1970, le Projet Daedalus, n'a développé l'idée que sur le papier, esquissant une sonde sans pilote pouvant en théorie atteindre une étoile proche en une vie humaine.|核融合ロケットは、まだ一度も実際に飛んだことがない。1970年代に英国惑星間協会が行ったデイダロス計画は、机上の設計にとどまったが、理論上は人の一生のうちに近くの恒星へ届く無人探査機を描いてみせた。こうした設計研究はいまも実際の推進技術への投資の道しるべになっている。",
    ),
  },
  shieldplating: {
    e: "🛡️",
    price: 340,
    kind: "passive",
    n: t("Micrometeorite Shield Blanket|Manta escudo antimicrometeoritos|Couverture bouclier anti-micrométéorites|微小隕石シールド毛布"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Fred Whipple proposed in 1946 that a thin outer bumper layer, spaced a gap away from a spacecraft's hull, would vaporize incoming debris before it ever reached the real wall behind it. The idea still protects the International Space Station today, wrapped around modules as a multi-layer blanket rather than solid armor.|Fred Whipple propuso en 1946 que una fina capa exterior, separada por un hueco del casco de la nave, vaporizaría los restos entrantes antes de que llegaran a la pared real. La idea aún protege hoy a la Estación Espacial Internacional.|Fred Whipple proposa en 1946 qu'une fine couche extérieure, séparée d'un espace de la coque du vaisseau, vaporiserait les débris entrants avant qu'ils n'atteignent la paroi réelle. L'idée protège encore aujourd'hui la Station spatiale internationale.|フレッド・ホイップルは1946年、船体から少し離した薄い外側の層があれば、飛んでくる破片は本当の壁に届く前に蒸発してしまうと提案した。この考えはいまも国際宇宙ステーションを守っており、頑丈な装甲ではなく幾重にも重ねた毛布のような形でモジュールを包んでいる。",
    ),
  },
  distressflare: {
    e: "🆘",
    price: 300,
    kind: "pre",
    n: t("Distress Beacon|Baliza de socorro|Balise de détresse|遭難信号ビーコン"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The international Cospas-Sarsat satellite network has relayed distress signals since 1982, and its very first rescue came within days of switching on, guiding searchers to survivors of a downed light aircraft in Canada. The system now needs only minutes to pin down a beacon's position anywhere on Earth.|La red internacional de satélites Cospas-Sarsat retransmite señales de socorro desde 1982, y su primer rescate llegó a los pocos días de activarse, guiando a los rescatistas hasta los supervivientes de una avioneta caída en Canadá.|Le réseau satellite international Cospas-Sarsat relaie des signaux de détresse depuis 1982, et son tout premier sauvetage est survenu quelques jours après sa mise en service, guidant les secours vers les survivants d'un petit avion écrasé au Canada.|国際的な衛星網コスパス・サーサットは1982年から遭難信号を中継しており、稼働してわずか数日で最初の救助を成功させ、カナダで墜落した小型機の生存者のもとへ捜索隊を導いた。いまでは地球上のどこにあるビーコンでも、位置の特定に数分もかからない。",
    ),
  },
  missionuplink: {
    e: "📡",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("Mission Control Uplink|Enlace con el control de misión|Liaison montante avec le contrôle de mission|管制センター・アップリンク"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "A radio signal to Voyager 1 now takes more than 20 hours to arrive one way, so mission controllers cannot correct a mistake in real time and instead double- and triple-check every command years in advance of sending it. The uplink is precious precisely because there is no taking it back once sent.|Una señal de radio a la Voyager 1 tarda ahora más de 20 horas en llegar en un solo sentido, así que los controladores no pueden corregir un error en tiempo real y revisan cada orden con años de antelación.|Un signal radio vers Voyager 1 met désormais plus de 20 heures à arriver dans un seul sens, si bien que les contrôleurs ne peuvent corriger une erreur en temps réel et vérifient chaque commande des années à l'avance.|ボイジャー1号への電波は、いまや片道だけで20時間以上かかる。だから管制官はその場で間違いを直すことができず、送る何年も前から一つひとつの指令を何度も確かめる。一度送ればやり直しがきかないからこそ、この通信は貴重である。",
    ),
  },
  salvagepod: {
    e: "📦",
    price: 320,
    kind: "pre",
    n: t("Recovered Cargo Pod|Cápsula de carga recuperada|Capsule de fret récupérée|回収されたカーゴポッド"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "In 2013, an expedition funded by Jeff Bezos recovered two Saturn V first-stage engines from the ocean floor, corroded but intact three miles down, decades after they fell away from the Apollo 11 launch. NASA still owned the hardware, so the recovered engines went straight to museums rather than any private collection.|En 2013, una expedición financiada por Jeff Bezos recuperó dos motores de la primera etapa del Saturno V del fondo oceánico, corroídos pero intactos a casi cinco kilómetros de profundidad, décadas después de separarse del lanzamiento del Apolo 11.|En 2013, une expédition financée par Jeff Bezos a récupéré deux moteurs du premier étage de la Saturn V au fond de l'océan, corrodés mais intacts à près de cinq kilomètres de profondeur, des décennies après leur largage lors du lancement d'Apollo 11.|2013年、ジェフ・ベゾスが資金を出した調査隊が、サターンVロケット第一段のエンジン二基を水深およそ5kmの海底から引き上げた。錆びてはいたが原形をとどめており、アポロ11号の打ち上げで切り離されてから数十年が経っていた。所有権はいまもNASAにあったため、回収されたエンジンは個人のコレクションではなく博物館へ収められた。",
    ),
  },
  overclock: {
    e: "🔋",
    price: 380,
    kind: "pre",
    n: t("Overclocked Reactor|Reactor sobreacelerado|Réacteur surcadencé|過負荷運転の原子力電池"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Voyager 1 and 2 are both powered by plutonium-238 that decays a little further every year, so engineers have had to shut instruments off one by one over the decades to keep the ones that matter most running a little longer. There is no way to refuel a radioisotope generator once it launches.|Las Voyager 1 y 2 se alimentan de plutonio-238 que se desintegra un poco más cada año, así que los ingenieros han tenido que apagar instrumentos uno a uno durante décadas para mantener encendidos los más importantes un poco más.|Voyager 1 et 2 sont toutes deux alimentées par du plutonium-238 qui se désintègre un peu plus chaque année, si bien que les ingénieurs ont dû éteindre les instruments un à un au fil des décennies pour maintenir plus longtemps les plus importants.|ボイジャー1号・2号はいずれもプルトニウム238で発電しており、その出力は年々わずかずつ落ちていく。技術者たちは何十年もかけて機器を一つずつ止め、いちばん大事な機器だけを少しでも長く動かし続けてきた。放射性同位体電池は、打ち上げたあとに補給する手立てが無い。",
    ),
  },
};

/**
 * 厄災の神。**この盤面には土地の言い伝えが無いため、架空の存在として作った。**
 * 実在の神話・伝承の借用ではない(本文も「宇宙飛行士のあいだで語られる話」という
 * 体裁にして、史実と混同されないようにしてある)。人を苦しめる悪霊ではなく、
 * 寄せ集めのガラクタが悪気なくまとわりつくだけの存在として描く
 * (韓国のトッケビ・茨城のダイダラボウと同じく「残酷ではなく、ただ度が過ぎるだけ」)。
 */
export const SOLARSYSTEM_SPIRIT = {
  e: "🤖",
  n: t("The Scrap Sprite|El Duende de Chatarra|Le Lutin de Ferraille|スクラップ・スプライト"),
  big: t("The Scrap Sprite's Overload|La sobrecarga del Duende de Chatarra|La surcharge du Lutin de Ferraille|スクラップ・スプライトの過負荷"),
  ward: "shieldplating",
  arrive: t(
    "<b>🤖 A Scrap Sprite has taken an interest in you.</b> Old spacer talk says enough abandoned bolts, solar-panel shards and dead antenna parts drifting together for long enough eventually wake up as something that can follow a ship, mischievous rather than dangerous. It now drifts beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🤖 Un Duende de Chatarra se ha fijado en ti.</b> Los relatos de los viajeros del espacio dicen que suficientes pernos abandonados, trozos de panel solar y antenas muertas, flotando juntos el tiempo suficiente, terminan por despertar como algo capaz de seguir a una nave, travieso más que peligroso. Ahora flota junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🤖 Un Lutin de Ferraille s'est intéressé à toi.</b> Les récits des voyageurs de l'espace disent qu'assez de boulons abandonnés, d'éclats de panneaux solaires et d'antennes mortes, dérivant ensemble assez longtemps, finissent par s'éveiller en quelque chose capable de suivre un vaisseau, espiègle plutôt que dangereux. Il dérive désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🤖 スクラップ・スプライトに目を付けられた。</b> 宇宙飛行士のあいだで語り継がれる話によれば、捨てられたボルトや太陽電池のかけら、壊れたアンテナの部品が十分に長く漂い集まると、船について来られる何かとして目覚めるという。危険というより、いたずら好きな性分らしい。いま目的地から最も遠い<b>{0}</b>の傍らを漂い、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🤖 <b>The Scrap Sprite</b> loses interest and drifts after <b>{0}</b>, farthest from {1}.|🤖 <b>El Duende de Chatarra</b> pierde el interés y flota tras <b>{0}</b>, el más lejano de {1}.|🤖 <b>Le Lutin de Ferraille</b> se désintéresse et dérive vers <b>{0}</b>, le plus loin de {1}.|🤖 <b>スクラップ・スプライト</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ漂っていった。",
  ),
  wake: t(
    "<b>{0}</b> has drifted four turns with the Scrap Sprite without ever shaking it loose. It locks onto the hull and overloads — <b>the Scrap Sprite's Overload</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al Duende de Chatarra sin haber logrado desprenderlo. Se engancha al casco y se sobrecarga: empieza <b>la sobrecarga del Duende de Chatarra</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> dérive depuis quatre tours avec le Lutin de Ferraille sans jamais avoir réussi à s'en défaire. Il s'accroche à la coque et surcharge : <b>la surcharge du Lutin de Ferraille</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもスクラップ・スプライトと漂っていながら、一度も振り切れなかった。船体に取り付いて過負荷を起こす。<b>スクラップ・スプライトの過負荷</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> spacer talk holds that a Scrap Sprite can only cling on through one full shield cycle, and any ship that stays powered up long enough should eventually shake it off — nobody playing this game has stayed powered up that long yet.|<b>Tras la historia:</b> los relatos dicen que un Duende de Chatarra solo puede aferrarse durante un ciclo completo de escudo, y cualquier nave que mantenga la energía el tiempo suficiente debería acabar por desprenderlo. Nadie en esta partida lo ha logrado todavía.|<b>Derrière l'histoire :</b> les récits disent qu'un Lutin de Ferraille ne peut s'accrocher que le temps d'un cycle complet de bouclier, et tout vaisseau qui reste alimenté assez longtemps devrait finir par s'en défaire. Personne dans cette partie n'y est encore parvenu.|<b>物語の背景:</b> 宇宙飛行士の話では、スクラップ・スプライトはシールドの一周期のあいだしかしがみつけず、電力を保ち続けた船はいずれ振り切れるという。このゲームでは、まだ誰もそこまで電力を保てていない。",
  ),
  pleased: t(
    "It short-circuits trying to pry open an access panel, and a loose part clatters free. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se cortocircuita intentando forzar un panel de acceso, y una pieza suelta cae con estrépito. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il fait un court-circuit en tentant de forcer un panneau d'accès, et une pièce détachée tombe en cliquetant. <b>{0}</b> gagne <span class='money'>+{1}</span>.|点検パネルをこじ開けようとして自ら短絡し、はずれた部品がからからと転がり落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A sheet of micrometeorite shielding is unfurled where it can see it. Scrap Sprites are said to steer clear of anything that reflects radar cleanly, and it drifts off, passing <b>{0}</b> without noticing this turn.|Se despliega una lámina de blindaje antimicrometeoritos donde puede verla. Se dice que los Duendes de Chatarra evitan todo lo que refleja bien el radar, y se aleja flotando, pasando junto a <b>{0}</b> sin percatarse esta vuelta.|On déploie une feuille de bouclier anti-micrométéorites bien en vue. On dit que les Lutins de Ferraille évitent tout ce qui réfléchit bien le radar, et il s'éloigne en dérivant, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|見えるところに微小隕石シールドを広げた。スクラップ・スプライトはレーダーをきれいに反射するものを避けるという。ひるんで漂い去り、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。team-lead指示の題材(太陽フレア・デブリ・通信途絶・重力アシスト失敗・
 * 放射線帯・砂嵐・燃料切れ)にした。 */
export const SOLARSYSTEM_DOOM = [
  {
    id: "solarflare",
    n: t("A solar flare knocks out the electronics|Una llamarada solar deja sin electrónica|Une éruption solaire grille l'électronique|太陽フレアで電子機器が飛ぶ"),
    t: t(
      "The alert came twelve minutes before the flare's radiation did, just enough time to power down anything that could be saved by powering down. The largest flare ever recorded, the 1859 Carrington Event, knocked out telegraph lines on Earth and set some of the paper on fire at the receiving end.|La alerta llegó doce minutos antes que la radiación de la llamarada, el tiempo justo para apagar lo que se pudiera salvar apagándolo. La mayor llamarada jamás registrada, el Evento Carrington de 1859, dejó fuera de servicio líneas de telégrafo en la Tierra e incendió parte del papel en el extremo receptor.|L'alerte est arrivée douze minutes avant le rayonnement de l'éruption, juste assez de temps pour éteindre ce qui pouvait être sauvé en l'éteignant. La plus grande éruption jamais enregistrée, l'événement de Carrington en 1859, a mis hors service des lignes télégraphiques sur Terre et enflammé le papier à l'arrivée.|警報が届いたのは、フレアの放射線が来る12分前だった。電源を落とせば守れるものだけを、ぎりぎり落とせるだけの時間である。史上最大とされる1859年のキャリントン・イベントでは、地球上の電信線が使えなくなり、受信側の紙に火がついた場所さえあった。",
    ),
  },
  {
    id: "debris",
    n: t("Orbital debris punches a hole in the hull|Un desecho orbital perfora el casco|Un débris orbital perce la coque|軌道デブリが船体に穴を開ける"),
    t: t(
      "Something no bigger than a fleck of paint hit hard enough to crack a window, because at orbital speed even a fleck carries the force of a dropped bowling ball. The European Space Agency estimates well over 100 million pieces of debris smaller than a centimetre are currently circling Earth, none of them trackable one by one.|Algo no mayor que una mota de pintura golpeó con fuerza suficiente para agrietar una ventana, porque a la velocidad orbital hasta una mota lleva la fuerza de una bola de bolos al caer. La Agencia Espacial Europea estima que más de 100 millones de fragmentos menores de un centímetro orbitan la Tierra ahora mismo.|Quelque chose pas plus gros qu'un éclat de peinture a frappé assez fort pour fissurer une vitre, car à la vitesse orbitale même un éclat porte la force d'une boule de bowling qui tombe. L'Agence spatiale européenne estime que plus de 100 millions de débris de moins d'un centimètre gravitent actuellement autour de la Terre.|塗料のかけらほどの大きさの何かが、窓にひびを入れるほどの勢いでぶつかった。軌道速度では、そんな小片でも落としたボウリング球ほどの衝撃を持つ。欧州宇宙機関の推計では、1cmに満たないデブリが1億個以上、いまも地球の周りを回っており、一つひとつを追跡することはできない。",
    ),
  },
  {
    id: "commblackout",
    n: t("A communications blackout cuts the link home|Un apagón de comunicaciones corta el enlace a casa|Une panne de communication coupe le lien avec la Terre|通信途絶で本部との連絡が切れる",
    ),
    t: t(
      "The dish lost lock and nothing but static came back, a routine annoyance stretched into a genuine worry the longer it went on. Signals to Mars already take anywhere from 4 to 24 minutes one way depending on where the two planets sit in their orbits, so a live conversation was never possible even on a good day.|La antena perdió el enganche y solo llegó estática, una molestia rutinaria que se convirtió en preocupación real cuanto más se alargaba. Las señales a Marte ya tardan entre 4 y 24 minutos en un solo sentido según dónde estén los dos planetas en sus órbitas.|L'antenne a perdu le signal et il n'est revenu que des parasites, un ennui routinier qui devint une vraie inquiétude à mesure qu'il durait. Les signaux vers Mars mettent déjà entre 4 et 24 minutes dans un sens selon la position des deux planètes sur leur orbite.|アンテナが同調を失い、雑音しか返ってこなくなった。よくある不調のはずが、長引くにつれ本当の心配に変わった。火星への信号はもともと、二つの惑星の位置関係によって片道4分から24分もかかる。もとより会話などできる相手ではない。",
    ),
  },
  {
    id: "gravityassistfail",
    n: t("A gravity-assist burn misses its window|Un encendido de asistencia gravitatoria pierde su ventana|Une poussée d'assistance gravitationnelle rate sa fenêtre|重力アシストの噴射がタイミングを逃す"),
    t: t(
      "The burn fired a few seconds late, and a few seconds is enough to turn a free slingshot into a wasted pass that has to be paid for in fuel instead. Mission planners spend months modelling a single flyby down to fractions of a second precisely because there is no pulling over to try again once the planet has been passed.|El encendido se disparó unos segundos tarde, y unos segundos bastan para convertir un impulso gratuito en un sobrevuelo desperdiciado que hay que pagar en combustible. Los planificadores de misión pasan meses modelando un solo sobrevuelo hasta fracciones de segundo.|La poussée s'est déclenchée quelques secondes trop tard, et quelques secondes suffisent à transformer un élan gratuit en un survol raté qu'il faut payer en carburant. Les planificateurs de mission passent des mois à modéliser un seul survol à la fraction de seconde près.|噴射は数秒遅れて点火した。だがその数秒だけで、只で得られたはずの加速は、燃料を代わりに使う無駄な通過に変わってしまう。ミッション計画者が一回の接近通過を何か月もかけて何分の一秒単位で計算するのは、惑星を通り過ぎてしまえばやり直しがきかないからである。",
    ),
  },
  {
    id: "radiationbelt",
    n: t("A pass through the radiation belt costs a dose|Un paso por el cinturón de radiación cuesta una dosis|Un passage dans la ceinture de radiations coûte une dose|放射線帯の通過で被曝する"),
    t: t(
      "The route home cut straight through the thick of it, and even a fast pass left the dosimeter reading higher than a whole month usually does. Jupiter's radiation belts are so intense that the Juno probe carries its most sensitive electronics inside a titanium vault about the thickness of a phone book.|La ruta de vuelta cruzó justo por el centro, y hasta un paso rápido dejó el dosímetro marcando más que todo un mes normal. Los cinturones de radiación de Júpiter son tan intensos que la sonda Juno lleva su electrónica más sensible dentro de una bóveda de titanio.|La route du retour a traversé en plein cœur, et même un passage rapide a laissé le dosimètre afficher plus qu'un mois entier habituel. Les ceintures de radiations de Jupiter sont si intenses que la sonde Juno transporte son électronique la plus sensible dans un coffre de titane.|帰りの経路はその真っただ中を突っ切った。すばやく抜けただけなのに、線量計はふだんの一か月分より高い値を示した。木星の放射線帯はあまりに強烈で、探査機ジュノーは電話帳ほどの厚さのチタンの金庫の中にいちばん繊細な電子機器を収めている。",
    ),
  },
  {
    id: "duststorm",
    n: t("A dust storm swallows the solar panels|Una tormenta de polvo se traga los paneles solares|Une tempête de poussière engloutit les panneaux solaires|砂嵐が太陽電池パネルを覆う"),
    t: t(
      "The sky went from butterscotch to charcoal in under a day, and the panels went dark not long after. A global dust storm did exactly this to the Opportunity rover in 2018, blotting out the Martian sky for weeks and ending, after more than fourteen years of driving, its ability to recharge at all.|El cielo pasó de color caramelo a carbón en menos de un día, y los paneles se apagaron poco después. Una tormenta de polvo global le hizo justo esto al róver Opportunity en 2018, tras más de catorce años de recorrido.|Le ciel est passé du caramel au charbon en moins d'une journée, et les panneaux se sont éteints peu après. Une tempête de poussière mondiale a fait exactement cela au rover Opportunity en 2018, après plus de quatorze ans de parcours.|空は一日足らずであめ色から炭のような黒へと変わり、まもなくパネルは働かなくなった。2018年、探査車オポチュニティは全球規模の砂嵐にまさにこの目に遭い、14年以上走り続けたのちに、充電する術そのものを失った。",
    ),
  },
  {
    id: "fuelshortage",
    n: t("The maneuvering fuel gauge reads empty|El indicador de combustible de maniobra marca vacío|La jauge de carburant de manœuvre indique vide|姿勢制御用の燃料計がゼロを指す"),
    t: t(
      "The tank that keeps the craft pointed the right way ran dry faster than the mission plan allowed for, and without it even a perfectly healthy engine has nothing to aim with. The Kepler space telescope's science mission ended in 2018 not because its main instrument failed but because it finally ran out of the fuel needed to hold steady.|El depósito que mantiene la nave apuntando en la dirección correcta se vació más rápido de lo previsto, y sin él ni un motor perfectamente sano tiene con qué apuntar. La misión científica del telescopio Kepler terminó en 2018 no porque fallara su instrumento principal, sino porque se quedó sin el combustible necesario para mantenerse estable.|Le réservoir qui maintient l'engin correctement orienté s'est vidé plus vite que prévu, et sans lui, même un moteur parfaitement sain n'a plus de quoi viser. La mission scientifique du télescope Kepler s'est achevée en 2018 non parce que son instrument principal a lâché, mais parce qu'il a fini par manquer du carburant nécessaire pour rester stable.|機体の向きを保つための燃料タンクが、計画より早く空になった。これが無ければ、どれほど健全なエンジンでも狙いを定められない。ケプラー宇宙望遠鏡の観測任務が2018年に終わったのは主鏡が壊れたからではなく、姿勢を保つための燃料がついに尽きたからだった。",
    ),
  },
];

/**
 * 季節。実際の四季が無いため、代わりに宇宙開発史の記念日を月ごとに割り当てた
 * (4月始まり)。効果の数値は `src/infrastructure/content/season-and-doom-rules.ts`
 * の solarsystem の項に置く。
 *
 * **配列の並びは実際の記念日の月と一致させてある**(0=4月〜11=3月)。
 * 最初に書いたときは月を意識せずに事実を選んだため、7月に2件
 * (アポロ11号とバイキング1号、どちらも7月20日)、11月に2件
 * (ライカとザーリャ、どちらも11月)が重なり、8月と1月が空いていた。
 * 気づいて並べ替え、重なった2件のうち後発のバイキング1号とザーリャは
 * 別の記念日(8月のキュリオシティ着陸・1月のエクスプローラー1号)に
 * 差し替えてある。
 */
export const SOLARSYSTEM_SEASONS = [
  {
    // 0 4月
    e: "🚀",
    n: t("Gagarin's day|El día de Gagarin|Le jour de Gagarine|ガガーリンの日"),
    t: t(
      "On 12 April 1961, Yuri Gagarin became the first human in space, orbiting Earth once in Vostok 1 in a flight lasting 108 minutes. Ticket offices along this line get busy every year on the anniversary, as if the whole route were named for that single orbit.|El 12 de abril de 1961, Yuri Gagarin se convirtió en el primer humano en el espacio, orbitando la Tierra una vez en la Vostok 1 en un vuelo de 108 minutos. Cada año, las taquillas de esta línea se llenan en el aniversario.|Le 12 avril 1961, Youri Gagarine devint le premier humain dans l'espace, faisant le tour de la Terre une fois à bord de Vostok 1 lors d'un vol de 108 minutes. Chaque année, les guichets de cette ligne s'animent à l'anniversaire.|1961年4月12日、ユーリイ・ガガーリンはヴォストーク1号で地球を一周し、人類初の宇宙飛行士となった。飛行時間はわずか108分だった。この記念日には、路線じゅうの切符売り場がまるでその一周のために名付けられたかのように賑わう。",
    ),
    f: t(
      "Gagarin's capsule had no manual landing controls at all — mission designers of the day did not yet trust a pilot's judgement over an automated system for the descent, so he ejected and parachuted down separately near the capsule.|La cápsula de Gagarin no tenía controles manuales de aterrizaje: los diseñadores de la misión aún no confiaban en el juicio de un piloto por encima de un sistema automático, así que él se eyectó y descendió en paracaídas por separado.|La capsule de Gagarine n'avait aucun contrôle d'atterrissage manuel : les concepteurs de la mission ne faisaient pas encore confiance au jugement d'un pilote face à un système automatisé, si bien qu'il s'éjecta et descendit en parachute séparément.|ガガーリンのカプセルには手動の着陸操縦装置が無かった。当時の設計者はまだ、降下を自動制御より操縦士の判断に委ねることを信用していなかったため、彼はカプセルとは別に射出されてパラシュートで降りた。",
    ),
  },
  {
    // 1 5月
    e: "🧑‍🚀",
    n: t("First American in space remembrance|Recuerdo del primer estadounidense en el espacio|Souvenir du premier Américain dans l'espace|最初のアメリカ人宇宙飛行士を偲ぶ月"),
    t: t(
      "Alan Shepard's suborbital flight on 5 May 1961 lasted just over 15 minutes, barely a fifth as long as Gagarin's orbit three weeks earlier, and yet NASA still treated it as proof the young agency's approach could work. He later walked on the Moon in 1971, at 47 the oldest person to do so at the time.|El vuelo suborbital de Alan Shepard el 5 de mayo de 1961 duró poco más de 15 minutos, apenas una quinta parte de la órbita de Gagarin tres semanas antes, y aun así la NASA lo consideró prueba de que el enfoque de la joven agencia podía funcionar.|Le vol suborbital d'Alan Shepard le 5 mai 1961 dura à peine plus de 15 minutes, à peine un cinquième de l'orbite de Gagarine trois semaines plus tôt, et pourtant la NASA y vit la preuve que l'approche de la jeune agence pouvait fonctionner.|アラン・シェパードの弾道飛行は1961年5月5日、わずか15分あまりで終わった。3週間前のガガーリンの周回飛行の五分の一にも満たない長さだったが、それでもNASAは若い組織のやり方が通用する証だとみなした。彼はのちの1971年に月面を歩き、当時47歳で最年長の月面歩行者となった。",
    ),
    f: t(
      "Shepard's flight so nearly did not happen on schedule that a chimpanzee named Ham had flown the same suborbital profile only three months earlier specifically to prove it survivable, after two unmanned test failures had already delayed the human flight once.|El vuelo de Shepard estuvo tan cerca de no cumplirse a tiempo que un chimpancé llamado Ham había volado el mismo perfil suborbital solo tres meses antes, precisamente para demostrar que era sobrevivible.|Le vol de Shepard a failli ne pas avoir lieu à temps : un chimpanzé nommé Ham avait volé le même profil suborbital trois mois plus tôt, précisément pour prouver que c'était supportable.|シェパードの飛行が予定どおり行われるかは危ういところだった。無人試験の失敗が二度続いて人間の飛行が一度延期されたのち、生存可能だと示すためだけに、チンパンジーのハムがわずか3か月前に同じ弾道軌道を飛んでいた。",
    ),
  },
  {
    // 2 6月
    e: "👩‍🚀",
    n: t("The first woman in space anniversary|El aniversario de la primera mujer en el espacio|L'anniversaire de la première femme dans l'espace|最初の女性宇宙飛行士の記念日"),
    t: t(
      "Valentina Tereshkova spent almost three days alone in orbit starting 16 June 1963, more flight time than all American astronauts before her combined, after being selected partly because she was an experienced amateur parachutist rather than a trained pilot. No other woman flew to space for the following 19 years.|Valentina Tereshkova pasó casi tres días sola en órbita a partir del 16 de junio de 1963, más tiempo de vuelo que todos los astronautas estadounidenses anteriores juntos, tras ser elegida en parte por ser una paracaidista aficionada experimentada.|Valentina Terechkova passa près de trois jours seule en orbite à partir du 16 juin 1963, plus de temps de vol que tous les astronautes américains précédents réunis, ayant été choisie en partie parce qu'elle était une parachutiste amateur expérimentée.|ワレンチナ・テレシコワは1963年6月16日から、ほぼ三日間ひとりで軌道上に滞在した。それ以前のアメリカ人宇宙飛行士全員の飛行時間を合わせたより長い。選ばれた理由の一つは、訓練された操縦士ではなく経験豊富なアマチュアのパラシュート降下者だったことである。次に女性が宇宙へ飛んだのは、それから19年後だった。",
    ),
    f: t(
      "Tereshkova's selection criteria specifically favoured parachuting experience because, at the time, Soviet capsules required cosmonauts to eject and parachute down separately during the final descent, exactly as Gagarin had two years earlier.|Los criterios de selección de Tereshkova favorecían específicamente la experiencia en paracaidismo porque, en la época, las cápsulas soviéticas exigían que los cosmonautas se eyectaran y descendieran en paracaídas por separado durante el descenso final, igual que Gagarin dos años antes.|Les critères de sélection de Terechkova favorisaient spécifiquement l'expérience du parachutisme car, à l'époque, les capsules soviétiques exigeaient que les cosmonautes s'éjectent et descendent en parachute séparément lors de la descente finale, comme Gagarine deux ans plus tôt.|テレシコワの選考基準がパラシュート経験を重視したのは、当時のソ連のカプセルが、ガガーリンの二年前と同じく、最終降下の際に宇宙飛行士がカプセルから射出され別にパラシュートで降りる方式だったためである。",
    ),
  },
  {
    // 3 7月
    e: "🌕",
    n: t("The Moon landing anniversary|El aniversario del alunizaje|L'anniversaire de l'alunissage|月面着陸の記念日"),
    t: t(
      "Apollo 11's lunar module landed on 20 July 1969 with barely 25 seconds of fuel left in its descent tank, after Neil Armstrong took manual control late in the descent to steer clear of a boulder field the automatic system was heading straight for. This stop's ticket booths sell out first every year around the date.|El módulo lunar del Apolo 11 alunizó el 20 de julio de 1969 con apenas 25 segundos de combustible restantes en su tanque de descenso, después de que Neil Armstrong tomara el control manual para esquivar un campo de rocas.|Le module lunaire d'Apollo 11 s'est posé le 20 juillet 1969 avec à peine 25 secondes de carburant restant dans son réservoir de descente, après que Neil Armstrong eut pris les commandes manuelles pour éviter un champ de rochers.|アポロ11号の月着陸船は1969年7月20日、降下用タンクの燃料をわずか25秒ぶん残すのみで着陸した。ニール・アームストロングが降下の終盤に手動操縦へ切り替え、自動操縦がまっすぐ向かっていた岩場を避けたためである。この駅の切符売り場は、毎年この時期いちばん早く売り切れる。",
    ),
    f: t(
      "The boulder field Armstrong steered around is still visible in landing footage, and the spot he actually touched down on had not been surveyed in advance — the automatic landing target turned out to be unusable only in the final minute of descent.|El campo de rocas que Armstrong esquivó aún se ve en las imágenes del alunizaje, y el lugar donde realmente aterrizó no había sido inspeccionado de antemano: el objetivo de aterrizaje automático resultó inutilizable solo en el último minuto del descenso.|Le champ de rochers qu'Armstrong a évité est encore visible sur les images de l'alunissage, et l'endroit où il s'est réellement posé n'avait pas été étudié à l'avance : la cible d'atterrissage automatique s'est révélée inutilisable seulement dans la dernière minute de la descente.|アームストロングが避けた岩場は、着陸時の映像にいまも映っている。実際に着地した場所は事前に調査されておらず、自動着陸の目標地点が使い物にならないと分かったのは降下の最後の一分になってからだった。",
    ),
  },
  {
    // 4 8月
    e: "🪐",
    n: t("The Curiosity landing anniversary|El aniversario del aterrizaje de Curiosity|L'anniversaire de l'atterrissage de Curiosity|キュリオシティ着陸の記念日"),
    t: t(
      "On 6 August 2012, the Curiosity rover landed on Mars using an untested \"sky crane\" manoeuvre that lowered it on cables from a hovering rocket stage, a sequence engineers nicknamed the \"seven minutes of terror\" because radio delay meant it had to happen entirely on its own. It is still driving across Gale Crater more than a decade later, reading rock layers for signs Mars once could have supported microbial life.|El 6 de agosto de 2012, el róver Curiosity aterrizó en Marte con una maniobra nunca probada, la «grúa celeste», que lo bajó con cables desde una etapa de cohete suspendida en el aire, una secuencia que los ingenieros apodaron los «siete minutos de terror» porque el retraso de la radio obligaba a que ocurriera por sí sola.|Le 6 août 2012, le rover Curiosity s'est posé sur Mars grâce à une manœuvre jamais testée, la « grue céleste », qui l'a descendu par câbles depuis un étage de fusée en vol stationnaire, une séquence que les ingénieurs surnommèrent les « sept minutes de terreur » car le délai radio l'obligeait à se dérouler entièrement seule.|2012年8月6日、探査車キュリオシティは一度も試したことのない「スカイクレーン」という方式で火星に着陸した。空中で静止したロケット段からケーブルで吊り下ろす方式で、技術者はこの手順を「恐怖の七分間」と呼んだ。電波の遅れのせいで、すべてを機体だけで完結させねばならなかったからである。十年以上たったいまも、微生物が生きられた痕跡を求めてゲイルクレーターを走り続けている。",
    ),
    f: t(
      "The sky-crane manoeuvre had never been tried before Curiosity, yet every NASA rover landed since, including Perseverance in 2021, has used the same method — simply because no better way exists to set down a rover too heavy for the airbags earlier landers used.|La maniobra de la grúa celeste nunca se había probado antes de Curiosity, y sin embargo todos los róveres de la NASA aterrizados desde entonces, incluido Perseverance en 2021, han usado el mismo método, sencillamente porque no existe una forma mejor de posar un róver demasiado pesado para los airbags de los aterrizadores anteriores.|La manœuvre de la grue céleste n'avait jamais été tentée avant Curiosity, et pourtant tous les rovers de la NASA posés depuis, dont Perseverance en 2021, ont utilisé la même méthode — simplement parce qu'il n'existe pas de meilleure façon de poser un rover trop lourd pour les airbags des atterrisseurs précédents.|スカイクレーン方式はキュリオシティ以前には一度も試されたことがなかったが、それ以降に着陸したNASAの探査車はすべて、2021年のパーサヴィアランスも含めて同じ方式を使っている。それより前の着陸機が使ったエアバッグでは支えきれないほど重い探査車を降ろすのに、これより良い方法が無いからである。",
    ),
  },
  {
    // 5 9月
    e: "🛰️",
    n: t("Voyager launch season|La temporada de lanzamiento de las Voyager|La saison de lancement des Voyager|ボイジャー打ち上げの季節"),
    t: t(
      "Voyager 2 launched first, on 20 August 1977, followed by the faster-trajectory Voyager 1 on 5 September, so despite its number Voyager 1 overtook its twin within months and has led ever since. Both still carry the Golden Record, and along this stretch of the line replica copies are sold as souvenirs every year around the dates.|La Voyager 2 se lanzó primero, el 20 de agosto de 1977, seguida por la Voyager 1, de trayectoria más rápida, el 5 de septiembre, así que pese a su número la Voyager 1 adelantó a su gemela en meses.|Voyager 2 fut lancée en premier, le 20 août 1977, suivie par Voyager 1, sur une trajectoire plus rapide, le 5 septembre, si bien que malgré son numéro, Voyager 1 dépassa sa jumelle en quelques mois.|ボイジャー2号は1977年8月20日に先に打ち上げられ、より速い軌道を取った1号は9月5日に続いた。そのため番号とは裏腹に、1号は数か月のうちに双子の相方を追い抜き、以来ずっと先を行っている。両機ともいまもゴールデンレコードを積んでおり、この区間ではこの時期、その複製がお土産として売られる。",
    ),
    f: t(
      "The launch order was deliberate: Voyager 1's path was designed for a closer look at Saturn's moon Titan, a choice that used up enough of its trajectory options that it could never be redirected to Uranus and Neptune the way Voyager 2 eventually was.|El orden de lanzamiento fue deliberado: la trayectoria de la Voyager 1 se diseñó para ver más de cerca la luna de Saturno, Titán, una elección que agotó suficientes opciones de trayectoria como para que nunca pudiera redirigirse a Urano y Neptuno.|L'ordre de lancement était délibéré : la trajectoire de Voyager 1 fut conçue pour un survol rapproché de Titan, la lune de Saturne, un choix qui épuisa assez d'options de trajectoire pour qu'elle ne puisse jamais être redirigée vers Uranus et Neptune.|打ち上げの順番は意図的だった。ボイジャー1号の経路は土星の衛星タイタンに近づくよう設計されており、その選択によって軌道の自由度を使い切ってしまい、2号のようにあとから天王星・海王星へ向け直すことは二度とできなくなった。",
    ),
  },
  {
    // 6 10月
    e: "🛰️",
    n: t("The first satellite's month|El mes del primer satélite|Le mois du premier satélite|最初の人工衛星の月"),
    t: t(
      "Sputnik 1 launched on 4 October 1957, a beeping sphere barely larger than a beach ball that opened what is now called the Space Age. It burned up in the atmosphere only three months later, having already changed how every government on the ground thought about the sky above it.|El Sputnik 1 se lanzó el 4 de octubre de 1957, una esfera pitadora apenas mayor que un balón de playa que abrió lo que hoy se llama la Era Espacial. Ardió en la atmósfera solo tres meses después.|Spoutnik 1 fut lancé le 4 octobre 1957, une sphère bipante à peine plus grande qu'un ballon de plage qui ouvrit ce qu'on appelle aujourd'hui l'ère spatiale. Il brûla dans l'atmosphère à peine trois mois plus tard.|スプートニク1号は1957年10月4日に打ち上げられた。ビーチボールよりわずかに大きいだけの、ピーピーと音を発する球体が、いま「宇宙時代」と呼ばれる幕を開けた。わずか三か月後には大気圏で燃え尽きたが、そのときにはもう、地上のあらゆる政府の空への見方を変えてしまっていた。",
    ),
    f: t(
      "Sputnik's beep could be picked up by amateur radio operators around the world on ordinary shortwave sets, which is part of why it caused such an immediate stir — no telescope or credential was needed to hear proof of it passing overhead.|El pitido del Sputnik podía captarse en todo el mundo con receptores de onda corta comunes, lo que explica en parte la conmoción inmediata que causó: no hacía falta telescopio ni credencial alguna para oír la prueba de su paso.|Le bip de Spoutnik pouvait être capté dans le monde entier par des radioamateurs sur de simples postes à ondes courtes, ce qui explique en partie l'émoi immédiat qu'il suscita : nul besoin de télescope pour en entendre la preuve au passage.|スプートニクの発する音は、世界中のアマチュア無線家がふつうの短波受信機で拾うことができた。これが即座に大騒ぎを引き起こした理由の一つでもある。頭上を通過する証拠を聞くのに、望遠鏡も資格も要らなかった。",
    ),
  },
  {
    // 7 11月
    e: "🐾",
    n: t("First animal in orbit remembrance|Recuerdo del primer animal en órbita|Souvenir du premier animal en orbite|軌道を回った最初の動物を偲ぶ月"),
    t: t(
      "Laika, a stray dog from Moscow, became the first animal to orbit Earth aboard Sputnik 2 in November 1957, though the technology to bring her back down safely did not yet exist and the Soviet Union did not admit for decades that she died within hours from overheating. Small memorials appear along this line's inner stretches every year.|Laika, una perra callejera de Moscú, se convirtió en el primer animal en orbitar la Tierra a bordo del Sputnik 2 en noviembre de 1957, aunque la tecnología para devolverla sana y salva aún no existía.|Laïka, une chienne errante de Moscou, devint le premier animal à orbiter autour de la Terre à bord de Spoutnik 2 en novembre 1957, bien que la technologie pour la ramener saine et sauve n'existât pas encore.|モスクワの野良犬だったライカは、1957年11月、スプートニク2号で地球を周回した最初の動物となった。だが安全に連れ帰る技術はまだ無く、ソ連が彼女が数時間で過熱により死んだと認めたのは何十年も後のことだった。この時期、路線の内側区間には小さな追悼の印が置かれる。",
    ),
    f: t(
      "Later Soviet missions did bring dogs home alive, including Belka and Strelka in 1960, and it was their successful round trip — not Laika's one-way flight — that finally convinced engineers a human return was survivable.|Misiones soviéticas posteriores sí devolvieron perros con vida, incluidas Belka y Strelka en 1960, y fue ese viaje de ida y vuelta exitoso —no el vuelo sin retorno de Laika— lo que finalmente convenció a los ingenieros de que el regreso humano era viable.|Des missions soviétiques ultérieures ramenèrent bien des chiens vivants, dont Belka et Strelka en 1960, et c'est cet aller-retour réussi — non le vol sans retour de Laïka — qui convainquit enfin les ingénieurs qu'un retour humain était possible.|後のソ連の任務では犬が生きて帰還しており、1960年のベルカとストレルカもその例である。技術者たちが人間の帰還も可能だと確信したのは、ライカの片道飛行ではなく、この二匹の往復成功によってだった。",
    ),
  },
  {
    // 8 12月
    e: "🌍",
    n: t("The Earthrise anniversary|El aniversario del amanecer terrestre|L'anniversaire du lever de Terre|「地球の出」の記念日"),
    t: t(
      "On 24 December 1968, the crew of Apollo 8 became the first humans to see the whole Earth rise over the Moon's horizon, and Bill Anders's photograph of it, taken almost by accident, is still credited with shifting how people saw the planet's fragility. The line runs a special observation-deck fare every year around the date.|El 24 de diciembre de 1968, la tripulación del Apolo 8 fue la primera en ver la Tierra entera salir por el horizonte lunar, y la fotografía de Bill Anders, tomada casi por accidente, aún se considera decisiva para cambiar la percepción de la fragilidad del planeta.|Le 24 décembre 1968, l'équipage d'Apollo 8 fut le premier à voir la Terre entière se lever au-dessus de l'horizon lunaire, et la photographie de Bill Anders, prise presque par accident, est encore créditée d'avoir changé le regard sur la fragilité de la planète.|1968年12月24日、アポロ8号の乗組員は月の地平線から昇る地球全体を初めて目にした人類となった。ビル・アンダースがほとんど偶然に撮ったその写真は、人々の地球の脆さへの見方を変えたとされている。この時期には路線じゅうで特別な展望デッキ運賃が組まれる。",
    ),
    f: t(
      "Apollo 8's crew had not planned to photograph Earth rising at all — mission control had scheduled that orbit for lunar surface photography, and the famous shot exists because Anders grabbed a colour film magazine at the last moment.|La tripulación del Apolo 8 no tenía previsto fotografiar el amanecer terrestre: el control de misión había programado esa órbita para fotografiar la superficie lunar, y la famosa toma existe porque Anders cogió un carrete de color en el último momento.|L'équipage d'Apollo 8 n'avait pas prévu de photographier le lever de Terre : le contrôle de mission avait programmé cette orbite pour photographier la surface lunaire, et le célèbre cliché existe parce qu'Anders a attrapé un magasin de pellicule couleur au dernier moment.|アポロ8号の乗組員は、そもそも地球の出を撮る予定ではなかった。管制はその周回を月面の撮影用に組んでいたが、アンダースが土壇場でカラーフィルムを手に取ったおかげで、あの有名な一枚が残った。",
    ),
  },
  {
    // 9 1月
    e: "📡",
    n: t("First American satellite anniversary|El aniversario del primer satélite estadounidense|L'anniversaire du premier satellite américain|アメリカ初の人工衛星の記念日"),
    t: t(
      "Explorer 1 reached orbit on 31 January 1958, four months after Sputnik 1, and carried a single instrument that made the mission's real discovery: a radiation counter that kept reporting suspiciously low readings until scientists realised it had simply saturated, revealing the Van Allen radiation belts encircling Earth. The belt's discoverer, James Van Allen, had to build the instrument small enough to fit a satellite that weighed barely 14 kg.|El Explorer 1 alcanzó la órbita el 31 de enero de 1958, cuatro meses después del Sputnik 1, y llevaba un único instrumento que hizo el verdadero hallazgo de la misión: un contador de radiación que daba lecturas sospechosamente bajas hasta que los científicos comprendieron que se había saturado, revelando los cinturones de radiación de Van Allen que rodean la Tierra.|L'Explorer 1 atteignit l'orbite le 31 janvier 1958, quatre mois après Spoutnik 1, et transportait un unique instrument à l'origine de la vraie découverte de la mission : un compteur de radiations qui donnait des lectures étonnamment basses jusqu'à ce que les scientifiques comprennent qu'il avait simplement saturé, révélant les ceintures de radiations de Van Allen entourant la Terre.|エクスプローラー1号は1958年1月31日、スプートニク1号から四か月遅れて軌道に乗った。搭載していたたった一つの機器が、この任務の本当の発見をもたらした。放射線カウンターが不自然に低い値を返し続けていたが、それは単に飽和していただけだと分かり、地球を取り巻くヴァン・アレン放射線帯が見つかった。発見者のジェームズ・ヴァン・アレンは、重さわずか14kgの衛星に収まるようその機器を小さく作らねばならなかった。",
    ),
    f: t(
      "Explorer 1's launch was rushed forward after the very public failure of the US Vanguard rocket weeks earlier, broadcast live and mocked in the press as \"Kaputnik\", which is part of why the smaller, less ambitious Explorer programme was allowed to fly first instead.|El lanzamiento del Explorer 1 se adelantó tras el sonado fracaso del cohete estadounidense Vanguard semanas antes, retransmitido en directo y apodado «Kaputnik» por la prensa, lo que en parte explica que se dejara volar primero al programa Explorer, más modesto.|Le lancement de l'Explorer 1 fut avancé après l'échec très public de la fusée américaine Vanguard des semaines plus tôt, retransmis en direct et surnommé « Kaputnik » par la presse, ce qui explique en partie pourquoi le programme Explorer, plus modeste, fut autorisé à voler en premier à la place.|エクスプローラー1号の打ち上げは、その数週間前に生中継され「カプートニク」と報道陣にあざけられたアメリカのヴァンガードロケットの大失敗を受けて前倒しされた。より小さく控えめなエクスプローラー計画が代わりに先を越したのは、それも一因である。",
    ),
  },
  {
    // 10 2月
    e: "🔭",
    n: t("The Pale Blue Dot anniversary|El aniversario del punto azul pálido|L'anniversaire du point bleu pâle|「ペイル・ブルー・ドット」の記念日"),
    t: t(
      "On 14 February 1990, Voyager 1 turned its camera back toward home from about 6 billion km away and photographed Earth as a single pixel caught in a scattered sunbeam, at the request of astronomer Carl Sagan. The image is printed on tickets sold along the outer stretches of this line every year around the date.|El 14 de febrero de 1990, la Voyager 1 giró su cámara hacia casa desde unos 6.000 millones de km de distancia y fotografió la Tierra como un solo píxel atrapado en un rayo de sol disperso, a petición del astrónomo Carl Sagan.|Le 14 février 1990, Voyager 1 tourna sa caméra vers la Terre depuis environ 6 milliards de km et photographia notre planète comme un seul pixel pris dans un rayon de soleil diffus, à la demande de l'astronome Carl Sagan.|1990年2月14日、ボイジャー1号はおよそ60億km離れた地点からカメラを地球へ向け直し、天文学者カール・セーガンの求めに応じて、散乱した太陽光の中のたった一つの画素として地球を写した。この時期、路線の外側区間の切符にはこの写真が刷られる。",
    ),
    f: t(
      "The command to turn the camera around was risky in itself, since pointing any part of the spacecraft too close to the Sun's glare could have permanently damaged the optics — engineers waited until Voyager 1 had finished its main mission before approving the shot.|La orden de girar la cámara ya era arriesgada de por sí, pues apuntar cualquier parte de la nave demasiado cerca del resplandor solar podía dañar la óptica de forma permanente; los ingenieros esperaron a que la Voyager 1 terminara su misión principal antes de aprobar la toma.|L'ordre de retourner la caméra était risqué en soi, car pointer une partie de la sonde trop près de l'éclat du Soleil pouvait endommager définitivement l'optique ; les ingénieurs attendirent que Voyager 1 ait terminé sa mission principale avant d'approuver la prise de vue.|カメラを振り向かせる指令そのものが危険を伴った。機体のどこかを太陽の眩しさに近づけすぎれば、光学系を恒久的に傷めかねなかったからである。技術者たちはボイジャー1号が主任務を終えるまで、この撮影の許可を待った。",
    ),
  },
  {
    // 11 3月
    e: "🚶",
    n: t("The first spacewalk anniversary|El aniversario del primer paseo espacial|L'anniversaire de la première sortie dans l'espace|最初の宇宙遊泳の記念日"),
    t: t(
      "On 18 March 1965, Alexei Leonov left his capsule for just over 12 minutes, becoming the first person to float freely in space, and then discovered his suit had ballooned so stiff in the vacuum that he could not fit back through the airlock as designed. He solved it by bleeding air out of the suit himself, against procedure, until it was thin enough to squeeze through.|El 18 de marzo de 1965, Alexei Leonov salió de su cápsula durante poco más de 12 minutos, siendo la primera persona en flotar libremente en el espacio, y luego descubrió que su traje se había hinchado tan rígido en el vacío que no cabía de vuelta por la esclusa según lo previsto.|Le 18 mars 1965, Alexeï Leonov quitta sa capsule pendant un peu plus de 12 minutes, devenant le premier à flotter librement dans l'espace, avant de découvrir que sa combinaison avait tellement gonflé dans le vide qu'il ne pouvait plus repasser le sas comme prévu.|1965年3月18日、アレクセイ・レオーノフはわずか12分あまりカプセルの外に出て、宇宙を自由に漂った最初の人間となった。だがその後、真空で宇宙服が想定より硬く膨らみ、設計どおりにはエアロックを通れないことに気づいた。手順を無視して自ら宇宙服の空気を抜き、細くなったところをどうにかくぐり抜けて解決した。",
    ),
    f: t(
      "Leonov kept the near-disaster out of his official report at the time and only discussed it openly decades later, after the political pressure to present the mission as flawless had long since faded.|Leonov omitió el casi desastre de su informe oficial en su momento y solo lo comentó abiertamente décadas después, cuando la presión política por presentar la misión como impecable ya había desaparecido.|Leonov omit ce quasi-désastre de son rapport officiel à l'époque et n'en parla ouvertement que des décennies plus tard, une fois la pression politique de présenter la mission comme sans faille depuis longtemps retombée.|レオーノフは当時の公式報告からこの九死に一生を得た出来事を伏せており、任務を完璧に見せるべきだという政治的圧力がとうに薄れた何十年も後になって、ようやく公に語った。",
    ),
  },
];
