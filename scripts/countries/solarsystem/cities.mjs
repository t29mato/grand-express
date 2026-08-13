/**
 * 太陽系の「都市」=天体。40天体。
 *
 * `city()` の経度・緯度には、geography.mjs の `BODY_POS`(=天体の島の中心)を
 * そのまま使う。**島の中心=都市の座標にしているので、都市が島の外に出ることは
 * 原理的に無い**(自己検算はスクリプトで別途行った)。
 *
 * `reg`(地方コード)は7種類。money-events・seasons の演出に使う。
 *
 * | コード | 意味 | 天体 |
 * |---|---|---|
 * | `core`  | 太陽そのもの | 太陽 |
 * | `inner` | 地球型惑星とその衛星 | 水星・金星・地球・月・火星・フォボス・ダイモス |
 * | `belt`  | 小惑星帯 | ベスタ・ケレス |
 * | `outer` | 巨大惑星とその衛星 | 木星〜海王星とその衛星群 |
 * | `tno`   | 冥王星以遠の準惑星とカイパーベルト | 冥王星・カロン・カイパーベルト・ハウメア・マケマケ・エリス |
 * | `deep`  | 太陽系の縁 | ハレー彗星・太陽圏界面・セドナ・オールトの雲 |
 * | `probe` | 探査機 | パーカー・ソーラー・プローブ・ニューホライズンズ・ボイジャー1号2号 |
 *
 * `mark`(20種)・`bg`(19種)は art.mjs 参照。似た天体どうしで使い回している
 * (盤面では直径19pxにしかならないので、韓国などと同じく描き分けられる数に絞ってある)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";
import { BODY_POS } from "./geography.mjs";

export const SOLARSYSTEM_CITIES = {
  // ===================================================================
  // 太陽
  // ===================================================================
  sun: city(
    "The Sun|El Sol|Le Soleil|太陽",
    ...BODY_POS.sun, "core", "sun", "solarcore", "r",
    "The star every road on this board points away from|La estrella de la que se alejan todos los caminos de este tablero|L'astre dont s'éloignent toutes les routes de ce plateau|この盤面のすべての道が遠ざかっていく星",
    "The Sun holds 99.86% of the Solar System's total mass, so overwhelming that Jupiter and every other planet, moon and asteroid combined would still be dwarfed by it. Sunlight takes about 8 minutes and 20 seconds to cross the gap to Earth, so every glimpse of it is already old news by the time it arrives.|El Sol contiene el 99,86% de la masa total del Sistema Solar, tan abrumador que Júpiter y todos los demás planetas, lunas y asteroides juntos seguirían siendo minúsculos a su lado. La luz solar tarda unos 8 minutos y 20 segundos en cruzar la distancia hasta la Tierra, así que cada vistazo a él ya llega como noticia vieja.|Le Soleil concentre 99,86 % de la masse totale du Système solaire, si écrasant que Jupiter et toutes les autres planètes, lunes et astéroïdes réunis resteraient minuscules à côté. La lumière solaire met environ 8 minutes et 20 secondes à franchir la distance jusqu'à la Terre, si bien que chaque regard qu'on lui jette est déjà une vieille nouvelle.|太陽は太陽系全体の質量の99.86%を占め、木星をはじめ他のすべての惑星・衛星・小惑星を合わせても、その前ではなお小さく見えてしまうほど圧倒的である。太陽の光が地球に届くまでにはおよそ8分20秒かかるので、見上げるたびにその姿はすでに少し昔のものである。",
    [prop("Corona Observation Platform|Plataforma de observación de la corona|Plateforme d'observation de la couronne|コロナ観測プラットフォーム", 2900, 600),
     prop("Solar Wind Monitoring Post|Puesto de vigilancia del viento solar|Poste de surveillance du vent solaire|太陽風監視ステーション", 1500, 310)],
  ),
  parkersolarprobe: city(
    "Parker Solar Probe|Sonda Solar Parker|Sonde solaire Parker|パーカー・ソーラー・プローブ",
    ...BODY_POS.parkersolarprobe, "probe", "probe", "sunprobedeck", "l",
    "The fastest object ever built, skimming the Sun's atmosphere|El objeto más rápido jamás construido, rozando la atmósfera del Sol|L'objet le plus rapide jamais construit, frôlant l'atmosphère du Soleil|太陽の大気をかすめる、人類史上もっとも速い物体",
    "Parker Solar Probe has flown closer to the Sun than any spacecraft before it, dipping into the outer corona at around 6 million km from the surface, and its speed at closest approach — over 690,000 km/h — makes it the fastest human-made object ever. A carbon-composite heat shield keeps its instruments near room temperature while the sunward side faces temperatures above 1,000°C.|La Parker Solar Probe ha volado más cerca del Sol que cualquier nave anterior, adentrándose en la corona exterior a unos 6 millones de km de la superficie, y su velocidad en el punto más cercano —más de 690.000 km/h— la convierte en el objeto más rápido jamás construido. Un escudo térmico de fibra de carbono mantiene sus instrumentos a temperatura casi ambiente mientras la cara orientada al Sol soporta más de 1.000°C.|La Parker Solar Probe a volé plus près du Soleil qu'aucun engin avant elle, plongeant dans la couronne externe à environ 6 millions de km de la surface, et sa vitesse au plus près — plus de 690 000 km/h — en fait l'objet le plus rapide jamais construit. Un bouclier thermique en composite de carbone maintient ses instruments à température quasi ambiante tandis que la face tournée vers le Soleil affronte plus de 1 000°C.|パーカー・ソーラー・プローブはどの探査機よりも太陽に近づき、表面からおよそ600万kmのコロナの外縁にまで入り込んだ。最接近時の速度は時速69万km超で、人類が作った物体の中で最速である。炭素複合材の熱シールドのおかげで、太陽側の面が1,000℃を超える中でも、機器はほぼ室温に保たれている。",
    [prop("Corona Skim Heat-Shield Post|Puesto del escudo térmico en la corona|Poste du bouclier thermique dans la couronne|コロナかすめ耐熱シールド基地", 240, 50),
     prop("Record Speed Tracking Camp|Campamento de seguimiento del récord de velocidad|Camp de suivi du record de vitesse|最高速度追跡キャンプ", 180, 37)],
  ),

  // ===================================================================
  // 地球型惑星と衛星
  // ===================================================================
  mercury: city(
    "Mercury|Mercurio|Mercure|水星",
    ...BODY_POS.mercury, "inner", "rockyplanet", "rockysurface", "r",
    "A planet where a day lasts longer than its year|Un planeta donde un día dura más que su año|Une planète où un jour dure plus longtemps que son année|一日が一年より長い惑星",
    "Mercury rotates so slowly and orbits so quickly that a full day-night cycle there takes 176 Earth days — longer than its own year of 88 days. Despite sitting closest to the Sun, it is not the hottest planet, since it has almost no atmosphere to hold the heat, and its night side can drop to -180°C.|Mercurio gira tan despacio y orbita tan rápido que un ciclo completo de día y noche allí dura 176 días terrestres, más que su propio año de 88 días. A pesar de ser el más cercano al Sol, no es el planeta más caliente, ya que apenas tiene atmósfera para retener el calor, y su cara nocturna puede bajar a -180°C.|Mercure tourne si lentement et orbite si vite qu'un cycle complet de jour et de nuit y dure 176 jours terrestres, plus long que sa propre année de 88 jours. Bien qu'il soit le plus proche du Soleil, ce n'est pas la planète la plus chaude, car il n'a presque pas d'atmosphère pour retenir la chaleur, et sa face nocturne peut descendre à -180°C.|水星は自転が遅く公転が速いため、一昼夜のサイクルは地球の176日分もかかり、自らの一年(88日)より長い。太陽にいちばん近いのにもっとも熱い惑星ではない。熱をとどめる大気がほとんど無く、夜側は-180℃まで下がる。",
    [prop("Caloris Basin Overlook|Mirador de la cuenca Caloris|Belvédère du bassin Caloris|カロリス盆地展望台", 480, 100),
     prop("Polar Ice Shadow Station|Estación del hielo en sombra polar|Station de la glace à l'ombre polaire|極の陰の氷観測所", 300, 62)],
  ),
  venus: city(
    "Venus|Venus|Vénus|金星",
    ...BODY_POS.venus, "inner", "cloudplanet", "cloudsurface", "l",
    "A planet whose day is longer than its year|Un planeta cuyo día es más largo que su año|Une planète dont le jour est plus long que son année|一日が一年より長いもうひとつの惑星",
    "Venus rotates backwards compared to most planets, and so slowly that a single day there (243 Earth days) is longer than its year (225 Earth days). Its thick carbon dioxide atmosphere traps heat so effectively that the surface reaches about 465°C, hot enough to melt lead, despite being farther from the Sun than Mercury.|Venus gira al revés que la mayoría de los planetas, y tan despacio que un solo día allí (243 días terrestres) dura más que su año (225 días terrestres). Su densa atmósfera de dióxido de carbono retiene tanto el calor que la superficie alcanza unos 465°C, suficiente para fundir plomo, pese a estar más lejos del Sol que Mercurio.|Vénus tourne à l'envers par rapport à la plupart des planètes, et si lentement qu'un seul jour là-bas (243 jours terrestres) dure plus longtemps que son année (225 jours terrestres). Son épaisse atmosphère de dioxyde de carbone retient si bien la chaleur que la surface atteint environ 465°C, de quoi faire fondre du plomb, bien qu'elle soit plus loin du Soleil que Mercure.|金星はほとんどの惑星と逆向きに自転し、しかもきわめて遅いため、そこでの一日(243地球日)は一年(225地球日)より長い。分厚い二酸化炭素の大気が熱を閉じ込め、表面温度は鉛を溶かせるほどの約465℃に達する。水星より太陽から遠いにもかかわらずである。",
    [prop("Cloud-Deck Sulfuric Observatory|Observatorio sulfúrico de la capa de nubes|Observatoire sulfurique de la couche nuageuse|硫酸雲観測所", 650, 135),
     prop("Maxwell Montes Pressure Station|Estación de presión de Maxwell Montes|Station de pression du Maxwell Montes|マクスウェル山脈気圧観測所", 420, 87)],
  ),
  earth: city(
    "Earth|La Tierra|La Terre|地球",
    ...BODY_POS.earth, "inner", "earth", "bluemarble", "l",
    "The only stop on this line with a working biosphere|La única parada de esta línea con una biosfera en funcionamiento|Le seul arrêt de cette ligne à posséder une biosphère en état de marche|この路線でいまも生態系が働いている唯一の駅",
    "Earth's molten iron core generates a magnetic field that deflects most of the solar wind, a shield Mars appears to have lost early in its history along with much of its atmosphere. Roughly 71% of the surface is covered by a single connected ocean, and yet in most languages the planet's name simply means \"the ground.\"|El núcleo de hierro fundido de la Tierra genera un campo magnético que desvía la mayor parte del viento solar, un escudo que Marte parece haber perdido al principio de su historia junto con buena parte de su atmósfera. Cerca del 71% de la superficie está cubierta por un único océano conectado, y aun así, en la mayoría de los idiomas, el nombre del planeta simplemente significa «la tierra».|Le noyau de fer en fusion de la Terre engendre un champ magnétique qui dévie l'essentiel du vent solaire, un bouclier que Mars semble avoir perdu tôt dans son histoire, avec une bonne part de son atmosphère. Environ 71 % de la surface est couverte par un unique océan connecté, et pourtant, dans la plupart des langues, le nom de la planète signifie simplement « le sol ».|地球の溶けた鉄の核は磁場を生み出し、太陽風の大半を弾いている。火星はその歴史の初期にこの盾を失い、大気の多くも一緒に失ったと考えられている。地表のおよそ71%は一つにつながった海に覆われているが、それでもほとんどの言語で、この星の名はただ「地面」を意味する。",
    [prop("Low Earth Orbit Relay Station|Estación de relevo en órbita baja|Station relais en orbite basse|低軌道中継ステーション", 900, 190),
     prop("Mariana Trench Observation Post|Puesto de observación de la fosa de las Marianas|Poste d'observation de la fosse des Mariannes|マリアナ海溝観測基地", 500, 105)],
  ),
  moon: city(
    "The Moon|La Luna|La Lune|月",
    ...BODY_POS.moon, "inner", "icymoon", "icysurface", "r",
    "The only other world human feet have touched|El único otro mundo que han tocado pies humanos|Le seul autre monde qu'aient touché des pieds humains|人の足が触れた、地球以外で唯一の世界",
    "The Moon is slowly drifting away from Earth by about 3.8 cm a year, measured precisely using mirrors that Apollo astronauts left on its surface. It is large enough relative to its planet that the pair is sometimes called a double planet, and its pull is the main reason Earth has ocean tides at all.|La Luna se aleja lentamente de la Tierra a un ritmo de unos 3,8 cm al año, medido con precisión gracias a espejos que dejaron los astronautas del Apolo en su superficie. Es lo bastante grande respecto a su planeta como para que a veces se hable de un planeta doble, y su atracción es la razón principal de que existan las mareas oceánicas.|La Lune s'éloigne lentement de la Terre d'environ 3,8 cm par an, mesuré avec précision grâce à des miroirs laissés sur sa surface par les astronautes d'Apollo. Elle est assez grande par rapport à sa planète pour qu'on parle parfois de planète double, et son attraction est la principale raison des marées océaniques terrestres.|月は年におよそ3.8cmずつ地球から遠ざかっている。これはアポロの宇宙飛行士が表面に残した鏡を使って精密に測られている。地球に対して十分に大きいため「二重惑星」と呼ばれることもあり、その引力こそが地球に潮の満ち引きをもたらす主な原因である。",
    [prop("Tranquility Base Museum|Museo de la Base Tranquilidad|Musée de la base Tranquillité|静かの海基地記念館", 420, 87),
     prop("Far Side Radio-Quiet Observatory|Observatorio silencioso de la cara oculta|Observatoire radio-silencieux de la face cachée|裏側の電波静寂観測所", 260, 54)],
  ),
  mars: city(
    "Mars|Marte|Mars|火星",
    ...BODY_POS.mars, "inner", "mars", "redplanet", "r",
    "A red planet that may once have been blue|Un planeta rojo que quizá una vez fue azul|Une planète rouge qui fut peut-être bleue jadis|かつては青かったかもしれない赤い惑星",
    "Dust storms here can occasionally grow to wrap the entire planet for weeks, driven by the thin atmosphere's wide temperature swings between day and night. Olympus Mons, the tallest known volcano in the Solar System at roughly 22 kilometers, has such gentle slopes that a hiker standing on it might not even notice a mountain underfoot.|Las tormentas de polvo aquí pueden llegar a envolver el planeta entero durante semanas, impulsadas por los fuertes cambios de temperatura entre el día y la noche que permite su atmósfera tan tenue. El Olimpo, el volcán más alto conocido del Sistema Solar con unos 22 kilómetros, tiene laderas tan suaves que quien caminara por él quizá ni notaría que pisa una montaña.|Les tempêtes de poussière peuvent parfois y envelopper la planète entière pendant des semaines, portées par les grands écarts de température entre le jour et la nuit que permet son atmosphère ténue. L'Olympus Mons, le plus haut volcan connu du Système solaire avec environ 22 kilomètres, a des pentes si douces qu'un randonneur dessus ne remarquerait peut-être même pas qu'il gravit une montagne.|火星の砂嵐は、薄い大気のせいで昼夜の寒暖差が激しいことも手伝って、ときに惑星全体を何週間も覆うほどに育つ。太陽系で最も高い火山とされるオリンポス山は標高約22kmに達するが、傾斜があまりに緩やかで、登っている本人が山を登っていると気づかないかもしれないほどである。",
    [prop("Olympus Mons Base Camp|Campamento base del Olimpo|Camp de base de l'Olympus Mons|オリンポス山ベースキャンプ", 500, 105),
     prop("Valles Marineris Overlook|Mirador de Valles Marineris|Belvédère de Valles Marineris|マリネリス峡谷展望台", 300, 63)],
  ),
  phobos: city(
    "Phobos|Fobos|Phobos|フォボス",
    ...BODY_POS.phobos, "inner", "rockymoon", "rockysurface", "l",
    "A moon that is slowly falling toward its planet|Una luna que cae lentamente hacia su planeta|Une lune qui tombe lentement vers sa planète|少しずつ火星へ落ちていく衛星",
    "Phobos orbits Mars so closely, about 6,000 km up, that it circles the planet three times a day, faster than Mars itself rotates, so it rises in the west and sets in the east. It is spiraling inward by roughly 2 cm a year and is expected to break apart into a ring within tens of millions of years.|Fobos orbita Marte tan cerca, a unos 6.000 km de altura, que da tres vueltas al planeta al día, más rápido que la propia rotación de Marte, así que sale por el oeste y se pone por el este. Se acerca en espiral unos 2 cm al año y se espera que se rompa en un anillo dentro de decenas de millones de años.|Phobos orbite Mars de si près, à environ 6 000 km d'altitude, qu'il fait trois fois le tour de la planète par jour, plus vite que la rotation de Mars elle-même, si bien qu'il se lève à l'ouest et se couche à l'est. Il se rapproche en spirale d'environ 2 cm par an et devrait se disloquer en un anneau d'ici quelques dizaines de millions d'années.|フォボスは火星からわずか約6,000kmという近さを回っているため、一日に三周もする。これは火星自体の自転より速く、そのため西から昇り東に沈む。年に約2cmずつ螺旋を描いて近づいており、数千万年のうちに崩れて環になると見られている。",
    [prop("Stickney Crater Rim Camp|Campamento del borde del cráter Stickney|Camp du bord du cratère Stickney|スティックニークレーター縁キャンプ", 220, 46),
     prop("Deimos-Watch Relay Post|Puesto de relevo de observación de Deimos|Poste relais de surveillance de Déimos|ダイモス監視中継所", 180, 37)],
  ),
  deimos: city(
    "Deimos|Deimos|Déimos|ダイモス",
    ...BODY_POS.deimos, "inner", "rockymoon", "rockysurface", "r",
    "A moon so small its own gravity barely holds it together|Una luna tan pequeña que su propia gravedad apenas la mantiene unida|Une lune si petite que sa propre gravité la maintient à peine assemblée|自分の重力ではまとまりきらないほど小さな衛星",
    "Deimos is only about 12 km across, so small that a person standing on it would weigh next to nothing and could plausibly throw a ball into orbit. It circles Mars slowly enough, once every 30 hours, that from the Martian surface it would take more than two days to cross the sky from moonrise to moonset.|Deimos mide apenas unos 12 km, tan pequeña que una persona de pie sobre ella casi no pesaría nada y podría, en teoría, lanzar una pelota a la órbita. Rodea Marte con tanta lentitud, una vez cada 30 horas, que desde la superficie marciana tardaría más de dos días en cruzar el cielo de salida a puesta.|Déimos ne mesure qu'environ 12 km, si petite qu'une personne debout dessus ne pèserait presque rien et pourrait en théorie lancer une balle en orbite. Elle tourne autour de Mars si lentement, une fois toutes les 30 heures, que depuis la surface martienne il lui faudrait plus de deux jours pour traverser le ciel du lever au coucher.|ダイモスは直径わずか約12kmしかなく、その上に立てばほとんど体重を感じず、ボールを投げれば軌道に乗せられそうなほど小さい。火星を回る速さは30時間に一周とゆっくりで、火星の地表から見ると昇ってから沈むまで二日以上かかる。",
    [prop("Low-Gravity Sample Camp|Campamento de muestras de baja gravedad|Camp d'échantillonnage à faible gravité|低重力サンプル採取キャンプ", 200, 42),
     prop("Outer Orbit Watch Post|Puesto de vigilancia de la órbita exterior|Poste de guet de l'orbite extérieure|外側軌道監視所", 170, 35)],
  ),

  // ===================================================================
  // 小惑星帯
  // ===================================================================
  vesta: city(
    "Vesta|Vesta|Vesta|ベスタ",
    ...BODY_POS.vesta, "belt", "asteroid", "asteroidfield", "r",
    "The brightest asteroid, bright enough to see with the naked eye|El asteroide más brillante, visible incluso a simple vista|L'astéroïde le plus brillant, visible même à l'œil nu|肉眼でも見える、いちばん明るい小惑星",
    "Vesta is small enough to be called an asteroid rather than a dwarf planet, yet an ancient impact gouged a crater near its south pole deep enough to expose material from deep inside it. It is the only asteroid ever bright enough to be seen from Earth with the naked eye under a dark sky.|Vesta es lo bastante pequeña como para llamarse asteroide y no planeta enano, y aun así un impacto antiguo abrió cerca de su polo sur un cráter tan profundo que dejó al descubierto material de su interior. Es el único asteroide que ha llegado a verse a simple vista desde la Tierra bajo un cielo oscuro.|Vesta est assez petite pour être appelée astéroïde plutôt que planète naine, et pourtant un impact ancien a creusé près de son pôle sud un cratère assez profond pour exposer des matériaux venus de ses profondeurs. C'est le seul astéroïde jamais vu à l'œil nu depuis la Terre sous un ciel bien sombre.|ベスタは準惑星ではなく小惑星と呼ぶにふさわしいほど小さいが、大昔の衝突で南極付近に深いクレーターができ、内部の物質がむき出しになった。暗い夜空のもとで肉眼から見えたことのある唯一の小惑星でもある。",
    [prop("Rheasilvia Basin Survey Camp|Campamento de estudio de la cuenca Rheasilvia|Camp d'étude du bassin Rheasilvia|レアシルヴィア盆地調査キャンプ", 300, 62),
     prop("Bright-Surface Reflectance Post|Puesto de reflectancia de superficie brillante|Poste de réflectance de surface brillante|明るい表面反射観測所", 190, 40)],
  ),
  ceres: city(
    "Ceres|Ceres|Cérès|ケレス",
    ...BODY_POS.ceres, "belt", "asteroid", "asteroidfield", "l",
    "The only dwarf planet inside the asteroid belt|El único planeta enano dentro del cinturón de asteroides|La seule planète naine à l'intérieur de la ceinture d'astéroïdes|小惑星帯の中にある唯一の準惑星",
    "Ceres is the largest object in the asteroid belt and the only dwarf planet found inside it, holding roughly a third of the belt's total mass by itself. Bright spots inside its Occator crater turned out to be salt deposits left behind after briny water evaporated, hinting at a hidden reservoir underground.|Ceres es el mayor objeto del cinturón de asteroides y el único planeta enano hallado en su interior, y por sí sola contiene cerca de un tercio de la masa total del cinturón. Los puntos brillantes de su cráter Occator resultaron ser depósitos de sal dejados por agua salobre al evaporarse, lo que sugiere un depósito oculto bajo tierra.|Cérès est le plus gros objet de la ceinture d'astéroïdes et la seule planète naine qu'on y trouve, concentrant à elle seule environ un tiers de la masse totale de la ceinture. Les taches brillantes de son cratère Occator se sont révélées être des dépôts de sel laissés par de l'eau saumâtre évaporée, indice d'une réserve cachée sous la surface.|ケレスは小惑星帯でいちばん大きな天体であり、その中にある唯一の準惑星でもある。帯全体の質量のおよそ三分の一を単独で占める。オカトルクレーターの中の明るい斑点は、塩水が蒸発したあとに残った塩の堆積だと分かり、地下に隠れた水がある可能性を示している。",
    [prop("Occator Crater Salt-Flat Post|Puesto del salar del cráter Occator|Poste du désert de sel du cratère Occator|オカトルクレーター塩原観測所", 320, 66),
     prop("Belt Traffic Relay Station|Estación de relevo del tráfico del cinturón|Station relais du trafic de la ceinture|小惑星帯航行中継所", 200, 42)],
  ),

  // ===================================================================
  // 木星と衛星
  // ===================================================================
  jupiter: city(
    "Jupiter|Júpiter|Jupiter|木星",
    ...BODY_POS.jupiter, "outer", "jupiter", "gasbands", "l",
    "A planet massive enough to shepherd moons with oceans of their own|Un planeta tan masivo que gobierna lunas con océanos propios|Une planète assez massive pour régir des lunes ayant leurs propres océans|自らの海を持つ衛星たちを従える巨大惑星",
    "The Great Red Spot is a storm wider than Earth that has been tracked continuously for well over a century, though it has visibly shrunk over the decades astronomers have measured it. Jupiter's gravity is thought to intercept a share of the comets and asteroids that might otherwise reach the inner planets, a role sometimes nicknamed the Solar System's goalkeeper, though how much protection it truly provides is still debated.|La Gran Mancha Roja es una tormenta más ancha que la Tierra que se ha seguido sin interrupción durante más de un siglo, aunque se ha encogido visiblemente en las décadas que los astrónomos llevan midiéndola. Se cree que la gravedad de Júpiter intercepta parte de los cometas y asteroides que de otro modo podrían llegar a los planetas interiores, un papel a veces apodado el portero del Sistema Solar, aunque cuánta protección ofrece realmente sigue debatiéndose.|La Grande Tache rouge est une tempête plus large que la Terre, suivie sans interruption depuis plus d'un siècle, même si elle a visiblement rétréci au fil des décennies où les astronomes l'ont mesurée. On pense que la gravité de Jupiter intercepte une partie des comètes et astéroïdes qui pourraient sinon atteindre les planètes intérieures, un rôle parfois surnommé le gardien de but du Système solaire, bien que l'ampleur réelle de cette protection reste débattue.|大赤斑は地球より幅の広い嵐で、1世紀以上にわたり観測され続けているが、その間にも目に見えて縮んできた。木星の重力は、内側の惑星に届くはずだった彗星や小惑星の一部を引き寄せて取り込んでいると考えられ、「太陽系のゴールキーパー」と呼ばれることもあるが、実際どれほど守っているかはいまも議論が続いている。",
    [prop("Great Red Spot Observation Deck|Mirador de la Gran Mancha Roja|Belvédère de la Grande Tache rouge|大赤斑展望デッキ", 2000, 415),
     prop("Radiation Belt Monitoring Post|Puesto de vigilancia del cinturón de radiación|Poste de surveillance de la ceinture de radiations|放射線帯監視基地", 1100, 230)],
  ),
  io: city(
    "Io|Ío|Io|イオ",
    ...BODY_POS.io, "outer", "volcanicmoon", "lavamoon", "l",
    "The most volcanically active place in the Solar System|El lugar con más actividad volcánica del Sistema Solar|Le lieu le plus volcaniquement actif du Système solaire|太陽系でもっとも火山活動の激しい場所",
    "Io has more than 400 active volcanoes, more than anywhere else in the Solar System, kept molten by the constant flexing of its interior as Jupiter's gravity and its neighboring moons pull on it. Its surface is repainted by fresh sulfur deposits often enough that almost no impact craters survive to be seen.|Ío tiene más de 400 volcanes activos, más que cualquier otro lugar del Sistema Solar, mantenidos fundidos por la constante flexión de su interior debido al tirón de la gravedad de Júpiter y de sus lunas vecinas. Su superficie se repinta con depósitos frescos de azufre tan a menudo que apenas sobreviven cráteres de impacto visibles.|Io compte plus de 400 volcans actifs, plus que partout ailleurs dans le Système solaire, maintenus en fusion par la flexion constante de son intérieur sous l'attraction de Jupiter et de ses lunes voisines. Sa surface est repeinte de dépôts de soufre frais si souvent que presque aucun cratère d'impact n'y survit visiblement.|イオには400を超える活火山があり、太陽系のどこよりも多い。木星と近隣の衛星の重力が絶えず内部をこね続けるため、溶けた状態が保たれている。表面は新しい硫黄の堆積で頻繁に塗り替えられ、衝突クレーターがほとんど残らない。",
    [prop("Loki Patera Volcano Watch|Vigía del volcán Loki Patera|Guet du volcan Loki Patera|ロキ・パテラ火山監視所", 440, 92),
     prop("Sulfur Plains Field Station|Estación de campo de las llanuras de azufre|Station de terrain des plaines de soufre|硫黄平原フィールドステーション", 280, 58)],
  ),
  europa: city(
    "Europa|Europa|Europe|エウロパ",
    ...BODY_POS.europa, "outer", "icymoon", "icysurface", "r",
    "An icy moon that may hide an ocean twice Earth's|Una luna helada que quizá esconda un océano el doble que el terrestre|Une lune glacée qui cache peut-être un océan deux fois plus vaste que celui de la Terre|地球の倍もの海を隠しているかもしれない氷の衛星",
    "Europa's icy shell is criss-crossed by long reddish cracks, and beneath it scientists believe there is a liquid water ocean warmed by tidal flexing, thought to hold roughly twice as much water as all of Earth's oceans combined. NASA's Europa Clipper mission, launched in 2024, is on its way to study whether that ocean could support life.|La corteza helada de Europa está cruzada por largas grietas rojizas, y bajo ella los científicos creen que hay un océano de agua líquida calentado por la flexión de marea, con quizá el doble de agua que todos los océanos terrestres juntos. La misión Europa Clipper de la NASA, lanzada en 2024, viaja hacia allí para estudiar si ese océano podría albergar vida.|La croûte glacée d'Europe est sillonnée de longues fissures rougeâtres, et en dessous les scientifiques pensent qu'existe un océan d'eau liquide réchauffé par la flexion de marée, censé contenir environ deux fois plus d'eau que tous les océans terrestres réunis. La mission Europa Clipper de la NASA, lancée en 2024, est en route pour étudier si cet océan pourrait abriter la vie.|エウロパの氷の殻には赤みを帯びた長い亀裂が走っており、その下には潮汐力で温められた液体の水の海があると考えられている。地球の全海洋を合わせた量のおよそ二倍の水を蓄えているとされる。2024年に打ち上げられたNASAのエウロパ・クリッパーは、その海に生命を育める条件があるかを調べに向かっている。",
    [prop("Ice-Crack Drilling Camp|Campamento de perforación de grietas heladas|Camp de forage des fissures glacées|氷の亀裂掘削キャンプ", 500, 105),
     prop("Subsurface Ocean Listening Post|Puesto de escucha del océano subterráneo|Poste d'écoute de l'océan souterrain|地下海洋探査聴音所", 320, 66)],
  ),
  ganymede: city(
    "Ganymede|Ganímedes|Ganymède|ガニメデ",
    ...BODY_POS.ganymede, "outer", "icymoon", "icysurface", "l",
    "The largest moon in the Solar System, bigger than Mercury|La luna más grande del Sistema Solar, mayor que Mercurio|La plus grande lune du Système solaire, plus vaste que Mercure|太陽系最大の衛星、水星より大きい",
    "Ganymede is the largest moon of any planet, bigger even than Mercury, though lighter since it is made largely of ice and rock rather than metal. It is the only moon known to generate its own magnetic field, a sign that it may hold a salty ocean deep beneath its icy crust.|Ganímedes es la luna más grande de cualquier planeta, mayor incluso que Mercurio, aunque más ligera por estar hecha sobre todo de hielo y roca en vez de metal. Es la única luna conocida que genera su propio campo magnético, señal de que podría esconder un océano salado bajo su corteza helada.|Ganymède est la plus grande lune de toutes les planètes, plus vaste même que Mercure, bien que plus légère car composée surtout de glace et de roche plutôt que de métal. C'est la seule lune connue à générer son propre champ magnétique, signe qu'elle abrite peut-être un océan salé sous sa croûte de glace.|ガニメデはどの惑星の衛星よりも大きく、水星さえ上回る。ただし主に氷と岩石でできているため、質量は軽い。自ら磁場を作る唯一の衛星として知られ、氷の地殻の奥に塩水の海を隠している可能性を示している。",
    [prop("Magnetic Field Research Post|Puesto de investigación del campo magnético|Poste de recherche sur le champ magnétique|固有磁場研究基地", 460, 96),
     prop("Ancient Grooved Terrain Camp|Campamento del terreno surcado antiguo|Camp du terrain sillonné ancien|古代の溝状地形キャンプ", 300, 62)],
  ),
  callisto: city(
    "Callisto|Calisto|Callisto|カリスト",
    ...BODY_POS.callisto, "outer", "rockymoon", "rockysurface", "r",
    "The most heavily cratered surface known|La superficie más craterizada conocida|La surface la plus criblée de cratères connue|知られている中でもっともクレーターだらけの表面",
    "Callisto's surface is so old and so thoroughly pounded by impacts — around 4 billion years without any resurfacing — that it is considered one of the most heavily cratered bodies in the Solar System. Its distance from Jupiter spares it much of the radiation that scours the inner Galilean moons, making it a proposed staging point for future crewed missions.|La superficie de Calisto es tan antigua y ha recibido tantos impactos —unos 4.000 millones de años sin renovarse— que se la considera uno de los cuerpos más craterizados del Sistema Solar. Su distancia a Júpiter la libra de buena parte de la radiación que azota a las lunas galileanas interiores, por lo que se ha propuesto como base para futuras misiones tripuladas.|La surface de Callisto est si ancienne et si criblée d'impacts — environ 4 milliards d'années sans renouvellement — qu'elle est considérée comme l'un des corps les plus cratérisés du Système solaire. Son éloignement de Jupiter l'épargne d'une bonne part du rayonnement qui balaie les lunes galiléennes intérieures, ce qui en fait une base envisagée pour de futures missions habitées.|カリストの表面は非常に古く、およそ40億年にわたり作り替えられることなく衝突を受け続けてきたため、太陽系でもっともクレーターだらけの天体の一つとされる。木星から離れているぶん内側のガリレオ衛星を苛む放射線の多くを免れており、将来の有人探査の拠点候補にも挙げられている。",
    [prop("Valhalla Basin Crater Rim Post|Puesto del borde del cráter de la cuenca Valhalla|Poste du rebord du bassin Valhalla|ヴァルハラ盆地クレーター縁基地", 400, 83),
     prop("Low-Radiation Staging Camp|Campamento de escala de baja radiación|Camp d'étape à faible radiation|低放射線中継キャンプ", 260, 54)],
  ),

  // ===================================================================
  // 土星と衛星
  // ===================================================================
  saturn: city(
    "Saturn|Saturno|Saturne|土星",
    ...BODY_POS.saturn, "outer", "saturn", "ringworld", "r",
    "Rings made of ice, not rock|Anillos de hielo, no de roca|Des anneaux de glace, pas de roche|岩ではなく氷でできた環",
    "Saturn's rings are made almost entirely of water ice, in pieces ranging from dust grains to house-sized boulders, and are only about ten meters thick on average despite spanning hundreds of thousands of kilometers across. Saturn is also the least dense of the eight planets, with an average density lower than water, so in theory a bathtub big enough could make it float.|Los anillos de Saturno están hechos casi por completo de hielo de agua, en fragmentos que van desde granos de polvo hasta rocas del tamaño de una casa, y apenas miden unos diez metros de grosor en promedio pese a extenderse cientos de miles de kilómetros. Saturno es además el menos denso de los ocho planetas, con una densidad media inferior a la del agua, así que en teoría flotaría en una bañera lo bastante grande.|Les anneaux de Saturne sont presque entièrement faits de glace d'eau, en fragments allant du grain de poussière au rocher de la taille d'une maison, et ne mesurent en moyenne qu'une dizaine de mètres d'épaisseur malgré une étendue de centaines de milliers de kilomètres. Saturne est aussi la moins dense des huit planètes, avec une densité moyenne inférieure à celle de l'eau, si bien qu'elle flotterait en théorie dans une baignoire assez grande.|土星の環はほとんどが水の氷でできており、塵ほどの粒から家ほどの岩塊まで大きさは様々だが、数十万kmにも広がる割に厚さは平均でわずか十メートルほどしかない。土星は八惑星の中でいちばん密度が低く、平均密度は水より小さいので、理論上は十分大きな風呂桶に浮かべられる。",
    [prop("Ring-Ice Mining Claim|Concesión minera de hielo del anillo|Concession minière de glace annulaire|環の氷採掘権", 1800, 375),
     prop("Ring-Plane Viewing Platform|Plataforma de observación del plano de los anillos|Plateforme d'observation du plan des anneaux|環の平面展望台", 950, 198)],
  ),
  titan: city(
    "Titan|Titán|Titan|タイタン",
    ...BODY_POS.titan, "outer", "hazymoon", "hazyorange", "l",
    "A moon with rivers, rain and lakes — of methane|Una luna con ríos, lluvia y lagos — de metano|Une lune avec rivières, pluie et lacs — de méthane|川も雨も湖もある、ただしメタンでできた衛星",
    "Titan is the only other place in the Solar System known to have stable liquid on its surface, but the rivers, rain and lakes there are made of liquid methane and ethane rather than water, under a haze-choked atmosphere denser than Earth's. The Huygens probe landed on it in 2005, the most distant surface landing any spacecraft has made.|Titán es el único otro lugar conocido del Sistema Solar con líquido estable en superficie, pero sus ríos, lluvia y lagos son de metano y etano líquidos, no de agua, bajo una atmósfera brumosa más densa que la terrestre. La sonda Huygens aterrizó allí en 2005, el aterrizaje más lejano que ha logrado una nave espacial.|Titan est le seul autre endroit connu du Système solaire à posséder du liquide stable en surface, mais ses rivières, sa pluie et ses lacs sont faits de méthane et d'éthane liquides plutôt que d'eau, sous une atmosphère brumeuse plus dense que celle de la Terre. La sonde Huygens s'y est posée en 2005, l'atterrissage le plus lointain jamais réalisé par un engin spatial.|タイタンは、表面に安定した液体を持つことが分かっている太陽系で唯一もう一つの場所だが、そこを流れる川や降る雨、湖はすべて水ではなく液体のメタンとエタンでできている。大気は地球より濃く、もやに包まれている。2005年にホイヘンス・プローブが着陸しており、探査機による着陸としてはもっとも遠い記録である。",
    [prop("Methane Lakeshore Landing Post|Puesto de aterrizaje del lago de metano|Poste d'atterrissage du lac de méthane|メタン湖畔着陸基地", 700, 145),
     prop("Huygens Landing Site Museum|Museo del lugar de aterrizaje de Huygens|Musée du site d'atterrissage de Huygens|ホイヘンス着陸地記念館", 460, 96)],
  ),
  enceladus: city(
    "Enceladus|Encélado|Encelade|エンケラドス",
    ...BODY_POS.enceladus, "outer", "icymoon", "geysersurface", "r",
    "A small moon that sprays its own ocean into space|Una pequeña luna que lanza su propio océano al espacio|Une petite lune qui projette son propre océan dans l'espace|自分の海を宇宙へ噴き上げる小さな衛星",
    "Enceladus shoots geysers of water vapor and ice grains out through cracks near its south pole, tall enough to feed one of Saturn's rings, and the Cassini probe found chemical building blocks associated with life when it flew through the spray. Almost all of its surface reflects sunlight so well that it is one of the brightest objects in the Solar System.|Encélado lanza géiseres de vapor de agua y granos de hielo por grietas cerca de su polo sur, lo bastante altos como para alimentar uno de los anillos de Saturno, y la sonda Cassini halló componentes químicos asociados a la vida al atravesar la nube. Casi toda su superficie refleja tan bien la luz solar que es uno de los objetos más brillantes del Sistema Solar.|Encelade projette des geysers de vapeur d'eau et de grains de glace par des fissures près de son pôle sud, assez haut pour alimenter l'un des anneaux de Saturne, et la sonde Cassini y a trouvé des éléments chimiques associés à la vie en traversant le panache. Presque toute sa surface réfléchit si bien la lumière du Soleil qu'elle compte parmi les objets les plus brillants du Système solaire.|エンケラドスは南極付近の亀裂から水蒸気と氷の粒の間欠泉を噴き上げており、その高さは土星の環の一つを作るほどである。カッシーニ探査機がその噴出物を通り抜けた際、生命に結びつく化学物質の材料が見つかった。表面のほぼ全体が太陽光をよく反射し、太陽系でも屈指の明るさを持つ天体である。",
    [prop("South Polar Geyser Watch|Vigía de los géiseres polares del sur|Guet des geysers polaires sud|南極間欠泉監視所", 340, 71),
     prop("Bright-Ice Reflectance Camp|Campamento de reflectancia del hielo brillante|Camp de réflectance de la glace brillante|明るい氷反射観測キャンプ", 210, 44)],
  ),
  mimas: city(
    "Mimas|Mimas|Mimas|ミマス",
    ...BODY_POS.mimas, "outer", "rockymoon", "rockysurface", "l",
    "The moon that looks like a certain fictional space station|La luna que se parece a cierta estación espacial de ficción|La lune qui ressemble à une certaine station spatiale de fiction|あるSFの宇宙要塞に似た衛星",
    "A crater named Herschel, roughly a third of Mimas's own diameter, gives the moon a striking resemblance to a famous fictional battle station, a comparison only made once images arrived since the moon itself was named more than a century earlier. The impact that formed it was so violent that models suggest it nearly shattered the moon apart.|Un cráter llamado Herschel, de casi un tercio del diámetro de Mimas, le da a la luna un parecido llamativo con cierta estación de combate de ficción, comparación que solo pudo hacerse al llegar las imágenes, pues la luna ya tenía nombre desde más de un siglo antes. El impacto que lo formó fue tan violento que, según los modelos, casi hizo pedazos la luna.|Un cratère nommé Herschel, large d'environ un tiers du diamètre de Mimas, donne à la lune une ressemblance frappante avec une célèbre station de combat de fiction, comparaison qui n'a pu être faite qu'à l'arrivée des images, la lune ayant été nommée plus d'un siècle auparavant. L'impact qui l'a formé fut si violent que les modèles suggèrent qu'il a failli briser la lune.|ハーシェルと呼ばれるクレーターは、ミマスの直径のおよそ三分の一もの大きさがあり、あるSF映画の要塞に似ていることで知られる。この衛星の命名は画像が届くより一世紀以上も前だったので、その類似は偶然である。この衝突はあまりに激しく、模型によれば衛星をほぼ粉砕しかねないほどだったという。",
    [prop("Herschel Crater Overlook|Mirador del cráter Herschel|Belvédère du cratère Herschel|ハーシェルクレーター展望台", 240, 50),
     prop("Near-Shatter Impact Survey Post|Puesto de estudio del impacto casi fatal|Poste d'étude de l'impact quasi fatal|粉砕寸前衝突調査所", 180, 37)],
  ),
  iapetus: city(
    "Iapetus|Jápeto|Japet|イアペトゥス",
    ...BODY_POS.iapetus, "outer", "rockymoon", "rockysurface", "r",
    "A moon with one bright face and one coal-black face|Una luna con una cara brillante y otra negra como el carbón|Une lune à une face claire et une face noire comme le charbon|片面が真っ白、片面が真っ黒な衛星",
    "Iapetus has one hemisphere as dark as coal and the other almost as bright as snow, a divide thought to begin with dust swept up from another moon and then run away as exposed ice sublimates on the sun-warmed dark side. A mountain ridge runs almost exactly along its equator, tall enough to be visible from space, and no one fully agrees on how it formed.|Jápeto tiene un hemisferio tan oscuro como el carbón y el otro casi tan brillante como la nieve, una división que se cree comienza con polvo arrastrado de otra luna y luego se acentúa a medida que el hielo expuesto se sublima en la cara oscura calentada por el Sol. Una cresta montañosa recorre casi exactamente su ecuador, lo bastante alta para verse desde el espacio, y nadie se pone del todo de acuerdo en cómo se formó.|Japet a un hémisphère aussi sombre que le charbon et l'autre presque aussi clair que la neige, une division qui commencerait par de la poussière balayée d'une autre lune, puis s'accentuerait quand la glace exposée se sublime sur la face sombre réchauffée par le Soleil. Une crête montagneuse court presque exactement le long de son équateur, assez haute pour être visible depuis l'espace, et sa formation ne fait pas consensus.|イアペトゥスは片方の半球が石炭のように黒く、もう片方は雪のように白い。この違いは、他の衛星から舞い込んだ塵が始まりで、太陽に温められた黒い側で露出した氷が蒸発し続けて差が広がったと考えられている。赤道にほぼ沿って山脈が走り、宇宙からも見えるほど高いが、その成因については意見が一致していない。",
    [prop("Equatorial Ridge Trek Post|Puesto de senderismo de la cresta ecuatorial|Poste de randonnée de la crête équatoriale|赤道山脈トレッキング拠点", 260, 54),
     prop("Two-Toned Boundary Camp|Campamento del límite bicolor|Camp de la frontière bicolore|二色境界観測キャンプ", 190, 40)],
  ),
  rhea: city(
    "Rhea|Rea|Rhéa|レア",
    ...BODY_POS.rhea, "outer", "icymoon", "icysurface", "l",
    "Saturn's second-largest moon, and maybe ringed itself|La segunda luna más grande de Saturno, y quizá con anillos propios|La deuxième plus grande lune de Saturne, peut-être elle-même annelée|土星で二番目に大きく、自らも環を持つかもしれない衛星",
    "Rhea is made mostly of water ice and is heavily cratered like a smaller cousin of Callisto, and in 2008 the Cassini probe detected hints of a thin particle disk around it, which would make it the only moon known to have rings of its own — though later analysis left the finding unconfirmed. Its surface is bright enough to reflect more than half the sunlight that hits it.|Rea está hecha sobre todo de hielo de agua y muy craterizada, como una prima menor de Calisto, y en 2008 la sonda Cassini detectó indicios de un fino disco de partículas a su alrededor, lo que la haría la única luna con anillos propios conocidos, aunque análisis posteriores dejaron el hallazgo sin confirmar. Su superficie es lo bastante brillante como para reflejar más de la mitad de la luz solar que recibe.|Rhéa est faite surtout de glace d'eau et fortement cratérisée, comme une petite cousine de Callisto, et en 2008 la sonde Cassini y a détecté des indices d'un fin disque de particules, ce qui en ferait la seule lune connue à posséder ses propres anneaux — bien que des analyses ultérieures aient laissé la découverte non confirmée. Sa surface est assez brillante pour réfléchir plus de la moitié de la lumière solaire qu'elle reçoit.|レアは主に水の氷でできており、カリストの小型版のようにクレーターだらけである。2008年にカッシーニ探査機がその周囲に薄い粒子円盤の兆候を検出し、もし確認されれば自らの環を持つ唯一の衛星ということになったが、その後の解析では確証が得られていない。表面は明るく、受けた太陽光の半分以上を反射する。",
    [prop("Possible-Ring Survey Post|Puesto de estudio del posible anillo|Poste d'étude de l'anneau possible|環の可能性調査所", 380, 79),
     prop("Ice-Cliff Overlook Camp|Campamento mirador del acantilado de hielo|Camp du belvédère de la falaise de glace|氷の断崖展望キャンプ", 240, 50)],
  ),

  // ===================================================================
  // 天王星と衛星
  // ===================================================================
  uranus: city(
    "Uranus|Urano|Uranus|天王星",
    ...BODY_POS.uranus, "outer", "uranus", "icebands", "r",
    "A planet tipped over, rolling around the Sun on its side|Un planeta volcado, que rueda alrededor del Sol de lado|Une planète renversée, qui roule autour du Soleil sur le flanc|横倒しのまま太陽を転がる惑星",
    "Uranus spins on an axis tilted roughly 98 degrees, so far past vertical that it effectively rolls around the Sun on its side, likely the result of a colossal collision billions of years ago. Each of its poles gets about 42 years of continuous sunlight followed by 42 years of darkness over the course of its 84-year orbit.|Urano gira sobre un eje inclinado unos 98 grados, tan lejos de la vertical que en la práctica rueda alrededor del Sol de lado, probablemente por una colosal colisión hace miles de millones de años. Cada uno de sus polos recibe unos 42 años seguidos de luz solar seguidos de 42 años de oscuridad a lo largo de su órbita de 84 años.|Uranus tourne sur un axe incliné d'environ 98 degrés, si loin de la verticale qu'il roule en pratique autour du Soleil sur le flanc, probablement à cause d'une collision colossale il y a des milliards d'années. Chacun de ses pôles reçoit environ 42 années de lumière solaire continue suivies de 42 années d'obscurité au cours de son orbite de 84 ans.|天王星の自転軸はおよそ98度も傾いており、ほぼ横倒しのまま太陽の周りを転がるように公転している。数十億年前の巨大な衝突が原因と考えられている。84年かけて一周する間、両極はそれぞれ約42年間ずっと太陽の光を浴び続け、続く42年間はずっと闇に包まれる。",
    [prop("Sideways Axis Survey Post|Puesto de estudio del eje volcado|Poste d'étude de l'axe renversé|横倒し自転軸調査所", 1200, 250),
     prop("Polar Decades-Night Camp|Campamento de la noche polar de décadas|Camp de la nuit polaire de plusieurs décennies|数十年極夜観測キャンプ", 700, 145)],
  ),
  miranda: city(
    "Miranda|Miranda|Miranda|ミランダ",
    ...BODY_POS.miranda, "outer", "rockymoon", "rockysurface", "l",
    "A moon that looks stitched together from broken pieces|Una luna que parece cosida a partir de piezas rotas|Une lune qui semble cousue à partir de morceaux brisés|壊れた破片を継ぎ合わせたような衛星",
    "Miranda's surface is a patchwork of oddly shaped regions with completely different textures butted up against each other, as if the moon had been shattered and reassembled, and its Verona Rupes cliff face may be the tallest known cliff in the Solar System at roughly 20 km. Only one spacecraft, Voyager 2 in 1986, has ever seen it up close.|La superficie de Miranda es un mosaico de regiones de formas extrañas y texturas completamente distintas unidas entre sí, como si la luna se hubiera roto y vuelto a armar, y su acantilado Verona Rupes podría ser el más alto conocido del Sistema Solar, con unos 20 km. Solo una nave, la Voyager 2 en 1986, la ha visto de cerca.|La surface de Miranda est une mosaïque de régions aux formes étranges et aux textures totalement différentes juxtaposées, comme si la lune avait été brisée puis reconstituée, et sa falaise de Verona Rupes pourrait être la plus haute connue du Système solaire, avec environ 20 km. Un seul engin, Voyager 2 en 1986, l'a observée de près.|ミランダの表面は、形も質感もまるで違う地域がまるで継ぎ接ぎのように隣り合っており、まるで一度砕けてから組み直されたかのようである。ヴェローナ断崖は高さ約20kmと、太陽系で知られる中でもっとも高い崖かもしれない。これまで間近で見たのは1986年のボイジャー2号だけである。",
    [prop("Verona Rupes Cliff-Edge Post|Puesto del borde del acantilado Verona Rupes|Poste du bord de la falaise Verona Rupes|ヴェローナ断崖観測所", 320, 66),
     prop("Patchwork Terrain Survey Camp|Campamento de estudio del terreno mosaico|Camp d'étude du terrain en mosaïque|継ぎ接ぎ地形調査キャンプ", 200, 42)],
  ),
  titania: city(
    "Titania|Titania|Titania|ティタニア",
    ...BODY_POS.titania, "outer", "icymoon", "icysurface", "r",
    "The largest moon of a planet tipped on its side|La mayor luna de un planeta volcado de lado|La plus grande lune d'une planète couchée sur le flanc|横倒しの惑星が持つ、いちばん大きな衛星",
    "Titania is the largest of Uranus's moons, named like all of them after characters from Shakespeare and Pope rather than mythology, and its surface is scarred by canyons far longer than the Grand Canyon, evidence of a crust that once stretched and cracked. Because Uranus itself is tipped almost completely on its side, Titania's poles take turns facing the Sun for decades at a time.|Titania es la mayor de las lunas de Urano, bautizadas todas ellas con nombres de personajes de Shakespeare y Pope en vez de la mitología, y su superficie está marcada por cañones mucho más largos que el Gran Cañón, señal de una corteza que se estiró y agrietó en el pasado. Como Urano está casi por completo volcado de lado, los polos de Titania se turnan para mirar al Sol durante décadas seguidas.|Titania est la plus grande des lunes d'Uranus, toutes nommées d'après des personnages de Shakespeare et de Pope plutôt que la mythologie, et sa surface est marquée de canyons bien plus longs que le Grand Canyon, preuve d'une croûte qui s'est jadis étirée et fissurée. Comme Uranus est presque totalement couchée sur le flanc, les pôles de Titania font face au Soleil à tour de rôle pendant des décennies.|ティタニアは天王星最大の衛星で、この星の衛星はすべて神話ではなくシェイクスピアやポープの登場人物にちなんで名付けられている。表面にはグランドキャニオンよりずっと長い峡谷の傷跡があり、かつて地殻が引き伸ばされて割れた証拠とされる。天王星がほぼ横倒しであるため、ティタニアの両極も数十年単位で交互に太陽へ向くことになる。",
    [prop("Shakespearean Canyon Survey Post|Puesto de estudio del cañón shakespeariano|Poste d'étude du canyon shakespearien|シェイクスピア峡谷調査所", 340, 71),
     prop("Long Polar Night Watch Camp|Campamento de vigilancia de la larga noche polar|Camp de veille de la longue nuit polaire|長い極夜監視キャンプ", 220, 46)],
  ),

  // ===================================================================
  // 海王星と衛星
  // ===================================================================
  neptune: city(
    "Neptune|Neptuno|Neptune|海王星",
    ...BODY_POS.neptune, "outer", "neptune", "icebands", "l",
    "The windiest planet, found by mathematics before a telescope|El planeta más ventoso, hallado por las matemáticas antes que por un telescopio|La planète la plus venteuse, trouvée par les mathématiques avant un télescope|数式が望遠鏡より先に見つけた、いちばん風の強い惑星",
    "Neptune was found in 1846 not by chance but by predicting its position from wobbles in Uranus's orbit, one of the cleanest confirmations of Newtonian gravity ever made. Its winds are the fastest recorded on any planet, gusting past 2,000 km/h, remarkable for a world that receives roughly 900 times less sunlight than Earth.|Neptuno se descubrió en 1846 no por azar, sino prediciendo su posición a partir de las irregularidades en la órbita de Urano, una de las confirmaciones más claras jamás hechas de la gravedad newtoniana. Sus vientos son los más rápidos registrados en cualquier planeta, con ráfagas de más de 2.000 km/h, algo notable en un mundo que recibe unas 900 veces menos luz solar que la Tierra.|Neptune fut découverte en 1846 non par hasard, mais en prédisant sa position à partir des irrégularités de l'orbite d'Uranus, l'une des confirmations les plus nettes jamais faites de la gravité newtonienne. Ses vents sont les plus rapides jamais enregistrés sur une planète, avec des rafales dépassant 2 000 km/h, remarquable pour un monde qui reçoit environ 900 fois moins de lumière solaire que la Terre.|海王星は1846年、偶然ではなく天王星の軌道のずれから位置を予言する形で発見された。ニュートン力学のもっとも鮮やかな検証例の一つである。その風は惑星の中で観測史上最速で、時速2,000kmを超える突風が吹く。地球のおよそ900分の1しか太陽光を受けない星であることを思えば驚くべきことである。",
    [prop("Great Dark Spot Storm-Watch|Vigía de la tormenta de la Gran Mancha Oscura|Guet de la tempête de la Grande Tache sombre|大暗斑嵐監視所", 1150, 240),
     prop("Mathematical Discovery Observatory|Observatorio del descubrimiento matemático|Observatoire de la découverte mathématique|数式発見記念観測所", 650, 135)],
  ),
  triton: city(
    "Triton|Tritón|Triton|トリトン",
    ...BODY_POS.triton, "outer", "icymoon", "icysurface", "r",
    "A moon that orbits backwards and erupts nitrogen geysers|Una luna que orbita al revés y expulsa géiseres de nitrógeno|Une lune qui orbite à l'envers et crache des geysers d'azote|逆向きに公転し、窒素の間欠泉を噴き上げる衛星",
    "Triton is the only large moon in the Solar System that orbits its planet backwards relative to Neptune's own rotation, strong evidence that it was a captured Kuiper Belt object rather than born alongside its planet. Voyager 2 spotted geysers of nitrogen gas erupting from its icy surface in 1989, driven by sunlight warming trapped ice from below.|Tritón es la única luna grande del Sistema Solar que orbita su planeta al revés respecto a la rotación de Neptuno, un fuerte indicio de que fue un objeto del cinturón de Kuiper capturado en vez de haber nacido junto a su planeta. La Voyager 2 detectó géiseres de nitrógeno gaseoso brotando de su superficie helada en 1989, impulsados por la luz solar que calienta hielo atrapado debajo.|Triton est la seule grande lune du Système solaire à orbiter sa planète à contre-sens de la rotation de Neptune elle-même, indice solide qu'elle fut un objet de la ceinture de Kuiper capturé plutôt que née aux côtés de sa planète. Voyager 2 a repéré des geysers d'azote gazeux jaillissant de sa surface glacée en 1989, alimentés par la lumière solaire réchauffant de la glace piégée en dessous.|トリトンは太陽系の大型衛星の中で唯一、海王星自身の自転と逆向きに公転している。これは、この星とともに生まれたのではなく、カイパーベルトから捕獲された天体である強い証拠とされる。1989年、ボイジャー2号はその氷の表面から窒素ガスの間欠泉が噴き出す様子をとらえた。太陽光が地下に閉じ込められた氷を温めたことが原因とされる。",
    [prop("Retrograde Orbit Survey Post|Puesto de estudio de la órbita retrógrada|Poste d'étude de l'orbite rétrograde|逆行軌道調査所", 520, 108),
     prop("Nitrogen Geyser Watch Camp|Campamento de vigilancia del géiser de nitrógeno|Camp de veille du geyser d'azote|窒素間欠泉監視キャンプ", 360, 75)],
  ),

  // ===================================================================
  // ハレー彗星
  // ===================================================================
  halley: city(
    "Halley's Comet|Cometa Halley|Comète de Halley|ハレー彗星",
    ...BODY_POS.halley, "deep", "comet", "comettail", "l",
    "The comet that returns within a human lifetime|El cometa que regresa dentro de una vida humana|La comète qui revient en une vie humaine|人の一生のうちに戻ってくる彗星",
    "Halley's Comet is the only short-period comet regularly visible to the naked eye, swinging in as close as Venus's orbit and back out beyond Neptune's on a roughly 76-year cycle, last seen in 1986 and due back around 2061. Its nucleus, imaged up close by the Giotto probe in 1986, is a dark, elongated body often described as blacker than coal.|El cometa Halley es el único cometa de corto período regularmente visible a simple vista, que se acerca hasta la órbita de Venus y vuelve a alejarse más allá de la de Neptuno en un ciclo de unos 76 años; se vio por última vez en 1986 y se espera de vuelta hacia 2061. Su núcleo, fotografiado de cerca por la sonda Giotto en 1986, es un cuerpo oscuro y alargado a menudo descrito como más negro que el carbón.|La comète de Halley est la seule comète à courte période régulièrement visible à l'œil nu, s'approchant jusqu'à l'orbite de Vénus puis repartant au-delà de celle de Neptune sur un cycle d'environ 76 ans, vue pour la dernière fois en 1986 et attendue vers 2061. Son noyau, photographié de près par la sonde Giotto en 1986, est un corps sombre et allongé souvent décrit comme plus noir que le charbon.|ハレー彗星は肉眼で定期的に見える唯一の短周期彗星で、金星の軌道近くまで接近しては海王星の軌道の外まで戻る、およそ76年周期の旅を繰り返す。前回は1986年に見られ、次に戻るのは2061年ごろとされる。同じ1986年にジオット探査機が間近で捉えた核は、暗く細長い天体で、しばしば「石炭より黒い」と表現される。",
    [prop("Nucleus Flyby Observation Post|Puesto de observación del sobrevuelo del núcleo|Poste d'observation du survol du noyau|核フライバイ観測所", 260, 54),
     prop("Ion-Tail Sample Camp|Campamento de muestras de la cola iónica|Camp d'échantillonnage de la queue ionique|イオンの尾サンプル採取キャンプ", 190, 40)],
  ),

  // ===================================================================
  // 冥王星以遠
  // ===================================================================
  pluto: city(
    "Pluto|Plutón|Pluton|冥王星",
    ...BODY_POS.pluto, "tno", "pluto", "plutoheart", "r",
    "A world reclassified, not demoted|Un mundo reclasificado, no degradado|Un monde reclassé, non déchu|「格下げ」ではなく、分類が変わった世界",
    "Pluto was reclassified from planet to dwarf planet in 2006 after the discovery of similarly sized worlds like Eris made \"planet\" hard to define consistently, a decision some astronomers still debate today. NASA's New Horizons probe flew past it in 2015 and found a heart-shaped plain of nitrogen ice, Tombaugh Regio, large enough to be visible from Earth-based telescopes only as a bright spot.|Plutón se reclasificó de planeta a planeta enano en 2006, después de que el hallazgo de mundos de tamaño similar como Eris hiciera difícil definir «planeta» de forma coherente, una decisión que algunos astrónomos aún debaten. La sonda New Horizons de la NASA lo sobrevoló en 2015 y halló una llanura de hielo de nitrógeno con forma de corazón, Tombaugh Regio, lo bastante grande para verse desde telescopios terrestres solo como un punto brillante.|Pluton fut reclassée de planète à planète naine en 2006, après que la découverte de mondes de taille comparable comme Éris eut rendu difficile de définir « planète » de façon cohérente, une décision que certains astronomes débattent encore. La sonde New Horizons de la NASA l'a survolée en 2015 et y a trouvé une plaine de glace d'azote en forme de cœur, Tombaugh Regio, assez vaste pour n'apparaître depuis les télescopes terrestres que comme un point lumineux.|冥王星は2006年、エリスのような同規模の天体が見つかったことで「惑星」の定義を一貫させるのが難しくなり、惑星から準惑星に分類し直された。この決定はいまも一部の天文学者のあいだで議論が続いている。2015年にNASAのニューホライズンズが接近通過し、ハート形の窒素の氷の平原トンボー地域を見つけた。地球の望遠鏡からはこれまで一つの明るい点としてしか見えなかったほど大きい。",
    [prop("Tombaugh Regio Heart-Ice Post|Puesto del corazón de hielo de Tombaugh Regio|Poste du cœur de glace de Tombaugh Regio|トンボー地域ハート氷原基地", 380, 79),
     prop("Reclassification Debate Hall|Sala de debate de la reclasificación|Salle de débat sur le reclassement|分類論争ホール", 240, 50)],
  ),
  charon: city(
    "Charon|Caronte|Charon|カロン",
    ...BODY_POS.charon, "tno", "icymoon", "icysurface", "l",
    "A moon so large its planet orbits it back|Una luna tan grande que su planeta también gira en torno a ella|Une lune si grande que sa planète orbite aussi autour d'elle|自分の惑星をも回らせる大きな衛星",
    "Charon is just over half Pluto's diameter, big enough that the two do not orbit a point inside Pluto but a shared center of gravity hanging in space between them, leading some astronomers to call them a double dwarf planet. Both bodies are tidally locked to each other, so the same face of Charon always hangs in Pluto's sky, and vice versa.|Caronte mide algo más de la mitad del diámetro de Plutón, lo bastante grande para que ambos no giren en torno a un punto dentro de Plutón, sino a un centro de gravedad compartido suspendido en el espacio entre ambos, lo que lleva a algunos astrónomos a llamarlos planeta enano doble. Ambos cuerpos están acoplados por marea entre sí, así que la misma cara de Caronte siempre cuelga en el cielo de Plutón, y viceversa.|Charon mesure un peu plus de la moitié du diamètre de Pluton, assez grande pour que les deux ne tournent pas autour d'un point à l'intérieur de Pluton, mais autour d'un centre de gravité commun suspendu dans l'espace entre elles, ce qui pousse certains astronomes à parler de planète naine double. Les deux corps sont verrouillés par marée l'un envers l'autre, si bien que la même face de Charon reste toujours suspendue dans le ciel de Pluton, et inversement.|カロンは冥王星の直径の半分をわずかに超える大きさがあり、二つの重心は冥王星の内部ではなく、両者の間の宇宙空間にある。そのため一部の天文学者は二つを「二重準惑星」と呼ぶ。両者は互いに潮汐固定されており、カロンの同じ面がつねに冥王星の空にかかり、その逆も同じである。",
    [prop("Mordor Macula Red-Cap Post|Puesto del casquete rojo Mordor Macula|Poste de la calotte rouge Mordor Macula|モルドール斑赤い極冠基地", 280, 58),
     prop("Barycenter Orbit Observatory|Observatorio de la órbita del baricentro|Observatoire de l'orbite du barycentre|共通重心軌道観測所", 190, 40)],
  ),
  newhorizons: city(
    "New Horizons|New Horizons|New Horizons|ニューホライズンズ",
    ...BODY_POS.newhorizons, "probe", "probe", "probedeck", "r",
    "The probe that gave Pluto its first close-up|La sonda que dio a Plutón su primer primer plano|La sonde qui a offert à Pluton son premier gros plan|冥王星を初めて間近から見た探査機",
    "New Horizons launched in 2006 and took nine and a half years to reach Pluto, returning the first close-up images of it and Charon in 2015 before flying past the small Kuiper Belt object Arrokoth in 2019. As of this snapshot it is roughly 60 AU from the Sun and still transmitting, though its exact distance grows a little farther every single day.|New Horizons se lanzó en 2006 y tardó nueve años y medio en llegar a Plutón, devolviendo en 2015 las primeras imágenes de cerca de él y Caronte, antes de sobrevolar en 2019 el pequeño objeto del cinturón de Kuiper Arrokoth. En esta instantánea está a unas 60 UA del Sol y sigue transmitiendo, aunque su distancia exacta crece un poco cada día.|New Horizons a été lancée en 2006 et a mis neuf ans et demi à atteindre Pluton, rapportant en 2015 les premières images rapprochées de la planète naine et de Charon, avant de survoler en 2019 le petit objet de la ceinture de Kuiper Arrokoth. À l'instant de cet aperçu, elle se trouve à environ 60 UA du Soleil et transmet toujours, bien que sa distance exacte s'accroisse un peu chaque jour.|ニューホライズンズは2006年に打ち上げられ、冥王星に到達するまで9年半かかった。2015年に冥王星とカロンの初めての接近画像を送り、2019年には小さなカイパーベルト天体アロコスをかすめた。この記録の時点で太陽からおよそ60天文単位の距離にあり、いまも通信を続けているが、その正確な距離は毎日少しずつ伸びている。",
    [prop("Pluto Flyby Data Relay|Relevo de datos del sobrevuelo de Plutón|Relais de données du survol de Pluton|冥王星接近データ中継所", 220, 46),
     prop("Kuiper Belt Trajectory Post|Puesto de la trayectoria del cinturón de Kuiper|Poste de la trajectoire de la ceinture de Kuiper|カイパーベルト航路観測所", 170, 35)],
  ),
  kuiperbelt: city(
    "Kuiper Belt|Cinturón de Kuiper|Ceinture de Kuiper|カイパーベルト",
    ...BODY_POS.kuiperbelt, "tno", "beltcloud", "deepfield", "r",
    "A second asteroid belt, far larger and made of ice|Un segundo cinturón de asteroides, mucho mayor y hecho de hielo|Une seconde ceinture d'astéroïdes, bien plus vaste et faite de glace|氷でできた、はるかに大きなもう一つの小惑星帯",
    "The Kuiper Belt is a disk of icy bodies beyond Neptune's orbit, roughly 20 times wider and dozens of times more massive than the main asteroid belt, and it is thought to be the source of many short-period comets. Pluto, Haumea, Makemake and countless smaller worlds all orbit within it, so this stop stands in for the whole scattered region rather than any single body.|El cinturón de Kuiper es un disco de cuerpos helados más allá de la órbita de Neptuno, unas 20 veces más ancho y docenas de veces más masivo que el cinturón principal de asteroides, y se cree que es la fuente de muchos cometas de corto período. Plutón, Haumea, Makemake e innumerables mundos menores orbitan dentro de él, así que esta parada representa a toda la región dispersa y no a un solo cuerpo.|La ceinture de Kuiper est un disque de corps glacés au-delà de l'orbite de Neptune, environ 20 fois plus large et des dizaines de fois plus massive que la ceinture d'astéroïdes principale, et on pense qu'elle est la source de nombreuses comètes à courte période. Pluton, Hauméa, Makémaké et d'innombrables mondes plus petits y orbitent tous, si bien que cette étape représente toute la région dispersée plutôt qu'un seul corps.|カイパーベルトは海王星の軌道の外側に広がる氷の天体の円盤で、幅は主小惑星帯のおよそ20倍、質量は数十倍にもなる。多くの短周期彗星の故郷と考えられている。冥王星・ハウメア・マケマケをはじめ数え切れない小天体がこの中を巡っており、この駅は特定の一天体ではなく散らばった領域全体の代表である。",
    [prop("Belt Survey Relay Hub|Centro de relevo de estudio del cinturón|Relais central d'étude de la ceinture|ベルト調査中継拠点", 300, 62),
     prop("Icy Planetesimal Sample Post|Puesto de muestras de planetesimales helados|Poste d'échantillonnage de planétésimaux glacés|氷微惑星サンプル採取所", 200, 42)],
  ),
  haumea: city(
    "Haumea|Haumea|Hauméa|ハウメア",
    ...BODY_POS.haumea, "tno", "dwarfplanet", "dwarfplanetsurface", "l",
    "A dwarf planet spinning so fast it stretched into an egg|Un planeta enano que gira tan rápido que se estiró como un huevo|Une planète naine qui tourne si vite qu'elle s'est étirée en forme d'œuf|自転が速すぎて卵形に伸びた準惑星",
    "Haumea rotates once every 3.9 hours, faster than any other known large body in the Solar System, and the spin has stretched it into an elongated, egg-like shape rather than a sphere. It has two small moons and a thin ring, discovered in 2017, making it the first trans-Neptunian object confirmed to have one.|Haumea gira una vez cada 3,9 horas, más rápido que cualquier otro cuerpo grande conocido del Sistema Solar, y la rotación la ha estirado en una forma alargada, como un huevo, en vez de una esfera. Tiene dos lunas pequeñas y un anillo fino, descubierto en 2017, lo que la convierte en el primer objeto transneptuniano confirmado con uno.|Hauméa tourne une fois toutes les 3,9 heures, plus vite que tout autre grand corps connu du Système solaire, et cette rotation l'a étirée en une forme allongée, en œuf, plutôt qu'en sphère. Elle possède deux petites lunes et un anneau fin, découvert en 2017, ce qui en fait le premier objet transneptunien confirmé à en avoir un.|ハウメアは3.9時間に一回転という、太陽系で知られる大きな天体の中でもっとも速い自転をしており、そのせいで球ではなく卵のように引き伸ばされた形になっている。二つの小さな衛星と、2017年に発見された薄い環を持ち、環が確認された最初の海王星以遠天体となった。",
    [prop("Rapid-Spin Survey Post|Puesto de estudio de la rotación rápida|Poste d'étude de la rotation rapide|高速自転調査所", 260, 54),
     prop("Ring Discovery Observatory|Observatorio del descubrimiento del anillo|Observatoire de la découverte de l'anneau|環発見記念観測所", 170, 35)],
  ),
  makemake: city(
    "Makemake|Makemake|Makémaké|マケマケ",
    ...BODY_POS.makemake, "tno", "dwarfplanet", "dwarfplanetsurface", "r",
    "A dwarf planet named after a Rapa Nui creator god|Un planeta enano llamado por un dios creador rapanui|Une planète naine nommée d'après un dieu créateur rapa nui|イースター島の創造神にちなんで名付けられた準惑星",
    "Makemake was discovered in 2005 shortly after Easter and named for the creator of humanity and god of fertility in Rapa Nui (Easter Island) mythology, continuing the custom of naming dwarf planets after deities of creation. Its reddish-brown surface is covered in frozen methane and ethane, and a small dark moon was found orbiting it in 2016.|Makemake se descubrió en 2005 poco después de Semana Santa y se le puso el nombre del creador de la humanidad y dios de la fertilidad en la mitología rapanui (Isla de Pascua), siguiendo la costumbre de nombrar planetas enanos con deidades creadoras. Su superficie rojiza está cubierta de metano y etano congelados, y en 2016 se halló una pequeña luna oscura orbitándolo.|Makémaké fut découverte en 2005 peu après Pâques et nommée d'après le créateur de l'humanité et dieu de la fertilité dans la mythologie rapa nui (île de Pâques), poursuivant la coutume de nommer les planètes naines d'après des divinités créatrices. Sa surface brun-rougeâtre est couverte de méthane et d'éthane gelés, et une petite lune sombre y a été découverte en orbite en 2016.|マケマケは2005年、復活祭の少しあとに発見され、ラパ・ヌイ(イースター島)神話で人類の創造神とされる豊穣の神にちなんで名付けられた。準惑星に創造神の名を付ける慣例に沿ったものである。赤茶色の表面は凍ったメタンとエタンに覆われ、2016年には小さな暗い衛星が周りを回っているのが見つかった。",
    [prop("Frozen Methane Field Post|Puesto del campo de metano congelado|Poste du champ de méthane gelé|凍結メタン原基地", 260, 54),
     prop("Dark Moon Discovery Camp|Campamento del descubrimiento de la luna oscura|Camp de la découverte de la lune sombre|暗い衛星発見キャンプ", 170, 35)],
  ),
  eris: city(
    "Eris|Eris|Éris|エリス",
    ...BODY_POS.eris, "tno", "dwarfplanet", "dwarfplanetsurface", "l",
    "The dwarf planet whose discovery redefined \"planet\"|El planeta enano cuyo descubrimiento redefinió «planeta»|La planète naine dont la découverte a redéfini « planète »|「惑星」の定義を変えた準惑星",
    "Eris is almost exactly the same size as Pluto but nearly three times farther from the Sun on average, and its discovery in 2005 directly triggered the 2006 debate that reclassified Pluto, since astronomers had to decide whether Eris was the tenth planet or neither of them was. Its surface is one of the most reflective in the Solar System, likely a frozen layer of atmosphere that fell as frost as Eris moved farther out along its long orbit.|Eris tiene casi exactamente el mismo tamaño que Plutón, pero está de media casi tres veces más lejos del Sol, y su descubrimiento en 2005 desencadenó directamente el debate de 2006 que reclasificó a Plutón, pues los astrónomos tuvieron que decidir si Eris era el décimo planeta o ninguno de los dos lo era. Su superficie es una de las más reflectantes del Sistema Solar, probablemente una capa congelada de atmósfera que cayó como escarcha al alejarse Eris en su larga órbita.|Éris a presque exactement la même taille que Pluton mais se trouve en moyenne près de trois fois plus loin du Soleil, et sa découverte en 2005 a directement déclenché le débat de 2006 qui a reclassé Pluton, les astronomes devant décider si Éris était la dixième planète ou si aucune des deux ne l'était. Sa surface est l'une des plus réfléchissantes du Système solaire, probablement une couche d'atmosphère gelée retombée en givre à mesure qu'Éris s'éloignait sur sa longue orbite.|エリスは冥王星とほぼ同じ大きさでありながら、平均して太陽からおよそ三倍も遠い。2005年の発見が直接のきっかけとなり、2006年に冥王星の分類が見直される議論が起きた。エリスを十番目の惑星とするか、それともどちらも惑星ではないとするかを天文学者が決めねばならなくなったからである。表面は太陽系でも屈指の反射率を持ち、長い軌道で太陽から遠ざかるにつれて大気が凍って霜のように降り積もったものと考えられている。",
    [prop("Reflective Ice-Frost Survey|Estudio del hielo-escarcha reflectante|Étude du gel-glace réfléchissant|反射霜氷調査所", 300, 62),
     prop("Tenth Planet Debate Post|Puesto del debate del décimo planeta|Poste du débat de la dixième planète|第十惑星論争基地", 190, 40)],
  ),

  // ===================================================================
  // 太陽系のさらに外へ
  // ===================================================================
  heliopause: city(
    "The Heliopause|La Heliopausa|L'Héliopause|太陽圏界面",
    ...BODY_POS.heliopause, "deep", "boundary", "deepfield", "r",
    "The edge of the Sun's bubble in space|El borde de la burbuja del Sol en el espacio|Le bord de la bulle du Soleil dans l'espace|宇宙に浮かぶ、太陽の泡の縁",
    "The heliopause is the boundary where the outward push of the solar wind finally gives way to the thin gas drifting between stars, marking the practical edge of the Sun's influence rather than any solid surface. Voyager 1 crossed it in 2012 and Voyager 2 followed in 2018, both recording a sudden jump in the density of the particles around them as they passed through.|La heliopausa es el límite donde el empuje del viento solar hacia fuera finalmente cede ante el tenue gas que flota entre las estrellas, marcando el borde práctico de la influencia del Sol y no una superficie sólida. La Voyager 1 la cruzó en 2012 y la Voyager 2 la siguió en 2018, ambas registrando un salto repentino en la densidad de las partículas a su alrededor al atravesarla.|L'héliopause est la limite où la poussée du vent solaire cède finalement devant le gaz ténu dérivant entre les étoiles, marquant le bord pratique de l'influence du Soleil plutôt qu'une surface solide. Voyager 1 l'a franchie en 2012 et Voyager 2 l'a suivie en 2018, toutes deux enregistrant un bond soudain de la densité des particules environnantes en la traversant.|太陽圏界面は、太陽風の押し出す力がついに星々のあいだを漂う希薄なガスに屈する境目であり、実体のある表面ではなく太陽の影響がおよぶ実質的な果てを示す。ボイジャー1号は2012年、2号は2018年にこれを越え、どちらも通過時に周囲の粒子密度が急に跳ね上がるのを記録した。",
    [prop("Solar Wind Boundary Post|Puesto del límite del viento solar|Poste de la limite du vent solaire|太陽風境界観測所", 240, 50),
     prop("Interstellar Density Monitor|Monitor de densidad interestelar|Moniteur de densité interstellaire|恒星間密度監視所", 180, 37)],
  ),
  voyager2: city(
    "Voyager 2|Voyager 2|Voyager 2|ボイジャー2号",
    ...BODY_POS.voyager2, "probe", "probe", "probedeck", "l",
    "The only probe to have visited all four giant planets|La única sonda que ha visitado los cuatro planetas gigantes|La seule sonde à avoir visité les quatre géantes|4つの巨大惑星すべてを訪れた唯一の探査機",
    "Voyager 2, launched in 1977, remains the only spacecraft to have flown past Jupiter, Saturn, Uranus and Neptune, using a rare planetary alignment that will not repeat for another 175 years to slingshot from one to the next. It crossed into interstellar space in 2018, six years after its twin Voyager 1, and both are still returning data on power expected to run out sometime in the 2030s.|La Voyager 2, lanzada en 1977, sigue siendo la única nave que ha sobrevolado Júpiter, Saturno, Urano y Neptuno, aprovechando una rara alineación planetaria que no se repetirá hasta dentro de 175 años para impulsarse de uno a otro. Cruzó al espacio interestelar en 2018, seis años después que su gemela Voyager 1, y ambas siguen enviando datos con una energía que se espera se agote hacia la década de 2030.|Voyager 2, lancée en 1977, reste le seul engin à avoir survolé Jupiter, Saturne, Uranus et Neptune, profitant d'un alignement planétaire rare qui ne se reproduira pas avant 175 ans pour bondir de l'une à l'autre. Elle est entrée dans l'espace interstellaire en 2018, six ans après sa jumelle Voyager 1, et les deux transmettent encore des données sur une énergie censée s'épuiser dans les années 2030.|1977年に打ち上げられたボイジャー2号は、いまも木星・土星・天王星・海王星のすべてを訪れた唯一の探査機である。175年に一度しか起こらない惑星配置を利用し、一つずつスイングバイして飛び移った。双子のボイジャー1号から6年遅れの2018年に恒星間空間へ入った。両機とも、2030年代のどこかで尽きると見込まれる電力でいまもデータを送り続けている。",
    [prop("Grand Tour Flyby Archive|Archivo del sobrevuelo del gran recorrido|Archives du survol du grand tour|グランドツアー接近記録館", 220, 46),
     prop("Interstellar Crossing Post|Puesto del cruce interestelar|Poste du franchissement interstellaire|恒星間突入記念所", 170, 35)],
  ),
  voyager1: city(
    "Voyager 1|Voyager 1|Voyager 1|ボイジャー1号",
    ...BODY_POS.voyager1, "probe", "probe", "probedeck", "r",
    "The most distant human-made object|El objeto humano más distante|L'objet humain le plus lointain|人類が作った、もっとも遠くにある物体",
    "Voyager 1 is the farthest spacecraft from Earth and the first to cross into interstellar space, doing so in 2012, and it carries the Golden Record, a collection of sounds and images of Earth meant to introduce humanity should it ever be found. As of this snapshot it is roughly 167 AU from the Sun, a distance that grows by more than 3 AU every year.|La Voyager 1 es la nave más alejada de la Tierra y la primera en cruzar al espacio interestelar, en 2012, y lleva a bordo el Disco de Oro, una colección de sonidos e imágenes de la Tierra pensada para presentar a la humanidad si alguna vez se encuentra. En esta instantánea está a unas 167 UA del Sol, una distancia que crece más de 3 UA cada año.|Voyager 1 est l'engin le plus éloigné de la Terre et le premier à être entré dans l'espace interstellaire, en 2012, et elle transporte le Disque d'or, une collection de sons et d'images de la Terre destinée à présenter l'humanité si elle était un jour trouvée. À l'instant de cet aperçu, elle se trouve à environ 167 UA du Soleil, une distance qui croît de plus de 3 UA chaque année.|ボイジャー1号は地球からもっとも遠く離れた探査機であり、2012年に恒星間空間へ入った最初の機体でもある。地球の音と映像を収めたゴールデンレコードを積んでおり、いつか発見されたときに人類を紹介する役目を持つ。この記録の時点で太陽からおよそ167天文単位の距離にあり、その距離は年に3天文単位以上ずつ伸びている。",
    [prop("Golden Record Archive Post|Puesto de archivo del Disco de Oro|Poste des archives du Disque d'or|ゴールデンレコード記録所", 220, 46),
     prop("Farthest-Object Tracking Camp|Campamento de seguimiento del objeto más lejano|Camp de suivi de l'objet le plus lointain|最遠方物体追跡キャンプ", 170, 35)],
  ),
  sedna: city(
    "Sedna|Sedna|Sedna|セドナ",
    ...BODY_POS.sedna, "deep", "dwarfplanet", "dwarfplanetsurface", "l",
    "A world on the most extreme orbit ever mapped|Un mundo con la órbita más extrema jamás trazada|Un monde sur l'orbite la plus extrême jamais cartographiée|かつてないほど極端な軌道を持つ天体",
    "Sedna's orbit is so elongated that it takes about 11,400 years to complete, swinging from roughly 76 AU at its closest to nearly 940 AU at its farthest, a path too extreme to be explained by the gravity of any known planet. Some astronomers think its orbit was shaped by a close pass with another star long ago, or that it hints at an undiscovered planet far beyond Neptune.|La órbita de Sedna es tan alargada que tarda unos 11.400 años en completarse, oscilando entre unas 76 UA en su punto más cercano y casi 940 UA en el más lejano, una trayectoria demasiado extrema para explicarse por la gravedad de ningún planeta conocido. Algunos astrónomos creen que su órbita se moldeó por el paso cercano de otra estrella hace mucho, o que apunta a un planeta aún no descubierto mucho más allá de Neptuno.|L'orbite de Sedna est si allongée qu'elle met environ 11 400 ans à se boucler, oscillant entre environ 76 UA au plus près et près de 940 UA au plus loin, une trajectoire trop extrême pour s'expliquer par la gravité d'une planète connue. Certains astronomes pensent que son orbite fut façonnée par le passage rapproché d'une autre étoile il y a longtemps, ou qu'elle indique une planète encore inconnue bien au-delà de Neptune.|セドナの軌道はきわめて細長く、一周するのにおよそ11,400年もかかる。もっとも近いときで約76天文単位、もっとも遠いときは940天文単位近くにまで達し、既知のどの惑星の重力でも説明のつかない軌道である。大昔に別の恒星が近くを通ったせいだとする説や、海王星のはるか外側にまだ見つかっていない惑星がある兆しだとする説もある。",
    [prop("Extreme-Orbit Tracking Post|Puesto de seguimiento de la órbita extrema|Poste de suivi de l'orbite extrême|極端軌道追跡所", 220, 46),
     prop("Deep-Red Surface Survey Camp|Campamento de estudio de la superficie rojo oscuro|Camp d'étude de la surface rouge sombre|深紅表面調査キャンプ", 170, 35)],
  ),
  oortcloud: city(
    "The Oort Cloud|La Nube de Oort|Le Nuage de Oort|オールトの雲",
    ...BODY_POS.oortcloud, "deep", "beltcloud", "deepfield", "l",
    "A shell of comets so far this board's own scale can't reach it|Una capa de cometas tan lejana que ni la escala de este tablero llega a ella|Une coquille de comètes si lointaine que l'échelle de ce plateau ne l'atteint pas|この盤面の縮尺でも届かないほど遠い、彗星の殻",
    "The Oort Cloud is a vast, largely theoretical shell of icy bodies thought to surround the Solar System starting somewhere around 2,000 AU out and reaching perhaps 100,000 AU, roughly a quarter of the way to the nearest star. On this board's own logarithmic scale, its inner edge would fall past longitude 360 — off the right edge of the map itself — so it is shown pulled back onto the board as a reminder of how compressed even a logarithmic scale has to be out here.|La Nube de Oort es una vasta capa, en gran parte teórica, de cuerpos helados que se cree rodea el Sistema Solar desde unas 2.000 UA hacia fuera hasta quizá 100.000 UA, alrededor de una cuarta parte del camino a la estrella más cercana. En la escala logarítmica de este tablero, su borde interior caería más allá de la longitud 360, fuera del borde derecho del mapa mismo, así que se muestra traída de vuelta al tablero como recordatorio de cuánto hay que comprimir incluso una escala logarítmica aquí fuera.|Le Nuage de Oort est une vaste coquille, largement théorique, de corps glacés censée entourer le Système solaire à partir d'environ 2 000 UA et s'étendant peut-être jusqu'à 100 000 UA, environ un quart du chemin vers l'étoile la plus proche. Sur l'échelle logarithmique de ce plateau, son bord interne tomberait au-delà de la longitude 360, hors du bord droit de la carte elle-même ; il est donc montré ramené sur le plateau, pour rappeler à quel point même une échelle logarithmique doit être compressée ici.|オールトの雲は、太陽系を取り巻くと考えられている広大で大部分は理論上の氷天体の殻で、内縁はおよそ2,000天文単位あたりから始まり、いちばん近い恒星までの距離のおよそ四分の一にあたる10万天文単位ほどまで広がっているとされる。この盤面の対数尺では、その内縁は経度360度を超え、地図の右端の外に出てしまう。そこでここでは盤面の中に引き戻して示している。対数尺でさえここまで来ると圧縮しきれないことを示す印である。",
    [prop("Long-Period Comet Origin Post|Puesto del origen de cometas de largo período|Poste de l'origine des comètes à longue période|長周期彗星起源観測所", 260, 54),
     prop("Theoretical Shell Survey Camp|Campamento de estudio de la capa teórica|Camp d'étude de la coquille théorique|理論上の殻調査キャンプ", 190, 40)],
  ),
};

/**
 * 路線。39本(主系列18・支線5・天体系内の陸路16)。
 *
 * 主系列は対数尺の隣どうしだけを繋ぐ(飛び越えると他の島の上を通ってしまう)。
 * 天体系内(親星—衛星)は同じ島の中に収まっているので陸路にできる
 * (team-lead承認: 「同じ天体系の中は陸路にしてもよい」)。
 */
export const SOLARSYSTEM_EDGES = [
  // --- 主系列(航路) ---
  ["sun", "mercury", "sea"],
  ["mercury", "venus", "sea"],
  ["venus", "earth", "sea"],
  ["earth", "mars", "sea"],
  ["mars", "vesta", "sea"],
  ["vesta", "ceres", "sea"],
  ["ceres", "jupiter", "sea"],
  ["jupiter", "saturn", "sea"],
  ["saturn", "uranus", "sea"],
  ["uranus", "neptune", "sea"],
  ["neptune", "pluto", "sea"],
  ["pluto", "kuiperbelt", "sea"],
  ["kuiperbelt", "eris", "sea"],
  ["eris", "heliopause", "sea"],
  ["heliopause", "voyager2", "sea"],
  ["voyager2", "voyager1", "sea"],
  ["voyager1", "sedna", "sea"],
  ["sedna", "oortcloud", "sea"],
  // --- 支線(航路) ---
  ["sun", "parkersolarprobe", "sea"],
  ["neptune", "halley", "sea"],
  ["pluto", "newhorizons", "sea"],
  ["kuiperbelt", "haumea", "sea"],
  ["kuiperbelt", "makemake", "sea"],
  // --- 天体系内(陸路) ---
  ["earth", "moon", "rail"],
  ["mars", "phobos", "rail"],
  ["mars", "deimos", "rail"],
  ["jupiter", "io", "rail"],
  ["jupiter", "europa", "rail"],
  ["jupiter", "ganymede", "rail"],
  ["jupiter", "callisto", "rail"],
  ["saturn", "titan", "rail"],
  ["saturn", "enceladus", "rail"],
  ["saturn", "mimas", "rail"],
  ["saturn", "iapetus", "rail"],
  ["saturn", "rhea", "rail"],
  ["uranus", "miranda", "rail"],
  ["uranus", "titania", "rail"],
  ["neptune", "triton", "rail"],
  ["pluto", "charon", "rail"],
];
