/**
 * 太陽系のクイズ(32問)。
 *
 * 難易度は1〜10で、他の盤面と同じ基準。
 *   1〜3 … 知らなくても常識や推測で当たる
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 文化・歴史に踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 40天体の都市カード(tag/fact)がすでに扱っている固有の見出し事実
 * (太陽の質量比率・水星の一日と一年・木星の大赤斑・冥王星の再分類・
 * ボイジャー1号のゴールデンレコード等)は、ここでは正解として問わない。
 * 代わりに、**天体どうしの比較・superlative(いちばん〜)・宇宙開発史の
 * 記念日(季節に既出だが都市カードには無い)・カードに書いていない
 * 副次的な事実**を選んである。
 *
 * `node scripts/check-quiz.mjs solarsystem` で(取りまとめ側が焼いたあと)
 * 確認すること。ここでは同じ観点(答えの漏れ・4言語・正解の偏り)を
 * 手作りの自己検算スクリプトで先に確かめてある。
 *
 * 選択肢は3つ。正解の位置(`a`)はほぼ均等になるよう割り当てた。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const SOLARSYSTEM_QUIZ = [
  q(
    1,
    "How many planets are there in the Solar System?|¿Cuántos planetas hay en el Sistema Solar?|Combien y a-t-il de planètes dans le Système solaire ?|太陽系には惑星がいくつあるか?",
    ["8|8|8|8", "7|7|7|7", "9|9|9|9"],
    0,
    "Pluto was the ninth planet until 2006, when it was reclassified as a dwarf planet, leaving eight.|Plutón fue el noveno planeta hasta 2006, cuando se reclasificó como planeta enano, dejando ocho.|Pluton était la neuvième planète jusqu'en 2006, date à laquelle elle fut reclassée planète naine, n'en laissant que huit.|冥王星は2006年に準惑星へ分類し直されるまで九番目の惑星だった。それ以降は八つになった。",
  ),
  q(
    1,
    "Which planet is closest to the Sun?|¿Qué planeta está más cerca del Sol?|Quelle planète est la plus proche du Soleil ?|太陽にいちばん近い惑星はどれか?",
    ["Mercury|Mercurio|Mercure|水星", "Venus|Venus|Vénus|金星", "Earth|La Tierra|La Terre|地球"],
    0,
    "Mercury orbits at an average distance of only about 58 million km from the Sun, well under half Earth's distance.|Mercurio orbita a una distancia media de solo unos 58 millones de km del Sol, bastante menos de la mitad que la Tierra.|Mercure orbite à une distance moyenne d'à peine 58 millions de km du Soleil, bien moins de la moitié de celle de la Terre.|水星は太陽から平均およそ5,800万kmの距離を回っており、地球の半分にも満たない。",
  ),
  q(
    1,
    "Which planet is nicknamed \"the Red Planet\"?|¿Qué planeta se apoda «el planeta rojo»?|Quelle planète est surnommée « la planète rouge » ?|「赤い惑星」と呼ばれる惑星はどれか?",
    ["Mars|Marte|Mars|火星", "Venus|Venus|Vénus|金星", "Jupiter|Júpiter|Jupiter|木星"],
    0,
    "Iron oxide — essentially rust — coats much of the Martian surface, giving the planet its colour even from Earth.|El óxido de hierro, esencialmente óxido, cubre buena parte de la superficie marciana y le da su color incluso visto desde la Tierra.|L'oxyde de fer — essentiellement de la rouille — recouvre une bonne partie de la surface martienne, donnant à la planète sa couleur même vue depuis la Terre.|酸化鉄、つまり錆が火星の表面の多くを覆っており、地球から見てもその色の元になっている。",
  ),
  q(
    2,
    "How many natural moons does Earth have?|¿Cuántas lunas naturales tiene la Tierra?|Combien de lunes naturelles la Terre possède-t-elle ?|地球には自然の衛星がいくつあるか?",
    ["0|0|0|0", "1|1|1|1", "2|2|2|2"],
    1,
    "Earth has exactly one large natural satellite, simply called the Moon, along with a handful of tiny temporarily-captured asteroids that don't really count.|La Tierra tiene exactamente un satélite natural grande, llamado simplemente la Luna, además de un puñado de asteroides diminutos capturados temporalmente que en realidad no cuentan.|La Terre possède exactement un grand satellite naturel, simplement appelé la Lune, en plus d'une poignée de minuscules astéroïdes temporairement capturés qui ne comptent pas vraiment.|地球には大きな自然衛星が一つだけあり、単に「月」と呼ばれる。ほかに一時的に捕獲された小さな小惑星がわずかにあるが、数には入れないのが普通である。",
  ),
  q(
    2,
    "Which is the largest planet in the Solar System?|¿Cuál es el planeta más grande del Sistema Solar?|Quelle est la plus grande planète du Système solaire ?|太陽系でいちばん大きい惑星はどれか?",
    ["Jupiter|Júpiter|Jupiter|木星", "Saturn|Saturno|Saturne|土星", "Neptune|Neptuno|Neptune|海王星"],
    0,
    "Jupiter is more than twice as massive as all the other planets in the Solar System put together.|Júpiter tiene más del doble de masa que todos los demás planetas del Sistema Solar juntos.|Jupiter a plus du double de la masse de toutes les autres planètes du Système solaire réunies.|木星の質量は、太陽系の他のすべての惑星を合わせたものの二倍以上ある。",
  ),
  q(
    2,
    "Which is the smallest planet in the Solar System?|¿Cuál es el planeta más pequeño del Sistema Solar?|Quelle est la plus petite planète du Système solaire ?|太陽系でいちばん小さい惑星はどれか?",
    ["Mercury|Mercurio|Mercure|水星", "Mars|Marte|Mars|火星", "Venus|Venus|Vénus|金星"],
    0,
    "Mercury is barely larger than Earth's own Moon, even though the two formed in completely different ways.|Mercurio es apenas más grande que la propia Luna de la Tierra, aunque ambos se formaron de maneras completamente distintas.|Mercure est à peine plus grande que la Lune terrestre elle-même, bien que les deux se soient formées de façons complètement différentes.|水星は地球の月よりわずかに大きい程度しかない。もっとも、両者の生まれ方はまったく違う。",
  ),
  q(
    2,
    "Which planet is famous for rings bright enough to see with a small telescope?|¿Qué planeta es famoso por unos anillos lo bastante brillantes para verse con un telescopio pequeño?|Quelle planète est célèbre pour des anneaux assez brillants pour être vus avec un petit télescope ?|小さな望遠鏡でも見えるほど明るい環で知られる惑星はどれか?",
    ["Mars|Marte|Mars|火星", "Saturn|Saturno|Saturne|土星", "Mercury|Mercurio|Mercure|水星"],
    1,
    "Galileo saw Saturn's rings as early as 1610, though his telescope was too weak to tell they were rings rather than strange handle-like bumps.|Galileo vio los anillos de Saturno ya en 1610, aunque su telescopio era demasiado débil para distinguir que eran anillos y no extrañas protuberancias en forma de asas.|Galilée vit les anneaux de Saturne dès 1610, bien que son télescope fût trop faible pour distinguer qu'il s'agissait d'anneaux plutôt que d'étranges bosses en forme d'anses.|ガリレオは早くも1610年に土星の環を見ていたが、彼の望遠鏡ではそれが環なのか奇妙な取っ手状の出っ張りなのか見分けがつかなかった。",
  ),
  q(
    3,
    "Which galaxy contains the entire Solar System?|¿Qué galaxia contiene todo el Sistema Solar?|Quelle galaxie contient tout le Système solaire ?|太陽系全体が属する銀河はどれか?",
    ["Andromeda|Andrómeda|Andromède|アンドロメダ銀河", "The Milky Way|La Vía Láctea|La Voie lactée|天の川銀河", "Triangulum|Triángulo|Triangulum|さんかく座銀河"],
    1,
    "The Solar System takes roughly 230 million years to complete one orbit around the Milky Way's centre, a span sometimes called a \"galactic year.\"|El Sistema Solar tarda unos 230 millones de años en completar una órbita alrededor del centro de la Vía Láctea, un lapso a veces llamado «año galáctico».|Le Système solaire met environ 230 millions d'années à effectuer une orbite autour du centre de la Voie lactée, une durée parfois appelée « année galactique ».|太陽系が天の川銀河の中心を一周するのにはおよそ2億3千万年かかる。この長さは「銀河年」と呼ばれることもある。",
  ),
  q(
    3,
    "In 1610, how many of Jupiter's largest moons did Galileo discover?|En 1610, ¿cuántas de las lunas más grandes de Júpiter descubrió Galileo?|En 1610, combien des plus grandes lunes de Jupiter Galilée a-t-il découvertes ?|1610年、ガリレオは木星の大きな衛星をいくつ発見したか?",
    ["4|4|4|4", "2|2|2|2", "6|6|6|6"],
    0,
    "Io, Europa, Ganymede and Callisto are still called the Galilean moons today, the first moons ever found orbiting a planet other than Earth.|Ío, Europa, Ganímedes y Calisto se siguen llamando lunas galileanas hoy en día, las primeras lunas descubiertas orbitando un planeta que no fuera la Tierra.|Io, Europe, Ganymède et Callisto sont encore appelées les lunes galiléennes aujourd'hui, les premières lunes jamais découvertes en orbite autour d'une planète autre que la Terre.|イオ・エウロパ・ガニメデ・カリストはいまも「ガリレオ衛星」と呼ばれる。地球以外の惑星を回る衛星として初めて見つかったものである。",
  ),
  q(
    3,
    "Which of these planets has no moons at all?|¿Cuál de estos planetas no tiene ninguna luna?|Laquelle de ces planètes n'a aucune lune du tout ?|次の惑星のうち、衛星が一つも無いのはどれか?",
    ["Mars|Marte|Mars|火星", "Venus|Venus|Vénus|金星", "Jupiter|Júpiter|Jupiter|木星"],
    1,
    "Mercury and Venus are the only two planets in the Solar System without any moons, likely because they orbit too close to the Sun's own strong gravity for a moon to stay captured.|Mercurio y Venus son los únicos dos planetas del Sistema Solar sin lunas, probablemente porque orbitan demasiado cerca de la fuerte gravedad del Sol como para que una luna se mantenga capturada.|Mercure et Vénus sont les deux seules planètes du Système solaire sans aucune lune, probablement parce qu'elles orbitent trop près de la forte gravité du Soleil pour qu'une lune y reste captive.|水星と金星は、太陽系で衛星を一つも持たない唯一の二つの惑星である。太陽自身の強い重力に近すぎて、衛星がとどまれないためだと考えられている。",
  ),
  q(
    4,
    "Roughly how many Earths could fit side by side across Jupiter's diameter?|¿Aproximadamente cuántas Tierras cabrían una junto a otra a lo ancho de Júpiter?|Environ combien de Terres tiendraient côte à côte sur le diamètre de Jupiter ?|木星の直径には、地球がおよそいくつ横に並ぶか?",
    ["About 11|Unas 11|Environ 11|約11個", "About 5|Unas 5|Environ 5|約5個", "About 30|Unas 30|Environ 30|約30個"],
    0,
    "Jupiter's diameter is about 143,000 km against Earth's roughly 12,700 km, a ratio of just over 11 to 1.|El diámetro de Júpiter es de unos 143.000 km frente a los aproximadamente 12.700 km de la Tierra, una proporción de poco más de 11 a 1.|Le diamètre de Jupiter est d'environ 143 000 km contre environ 12 700 km pour la Terre, un rapport d'un peu plus de 11 pour 1.|木星の直径はおよそ143,000kmで、地球のおよそ12,700kmに対し11倍強にあたる。",
  ),
  q(
    4,
    "Roughly how long does sunlight take to reach Neptune, far beyond Earth?|¿Cuánto tarda aproximadamente la luz solar en llegar a Neptuno, mucho más allá de la Tierra?|Combien de temps la lumière solaire met-elle environ pour atteindre Neptune, bien au-delà de la Terre ?|地球よりはるかに遠い海王星まで、太陽の光が届くのにおよそどれくらいかかるか?",
    ["About 8 minutes|Unos 8 minutos|Environ 8 minutes|約8分", "About 4 hours|Unas 4 horas|Environ 4 heures|約4時間", "About 4 days|Unos 4 días|Environ 4 jours|約4日"],
    1,
    "At roughly 30 AU from the Sun, Neptune sits far enough out that even light takes about four hours to make the crossing, compared to about 8 minutes for Earth.|A unas 30 UA del Sol, Neptuno está tan lejos que incluso la luz tarda unas cuatro horas en cruzar la distancia, frente a los 8 minutos de la Tierra.|À environ 30 UA du Soleil, Neptune est assez loin pour que même la lumière mette environ quatre heures à parcourir la distance, contre environ 8 minutes pour la Terre.|海王星は太陽からおよそ30天文単位も離れており、光でさえ渡るのに約4時間かかる。地球のおよそ8分と比べるとその差は大きい。",
  ),
  q(
    4,
    "Which planet is closest to Earth in size, sometimes called its \"sister planet\"?|¿Qué planeta es más parecido a la Tierra en tamaño, a veces llamado su «planeta hermano»?|Quelle planète est la plus proche de la Terre en taille, parfois appelée sa « planète sœur » ?|大きさが地球にいちばん近く、「姉妹惑星」と呼ばれることもある惑星はどれか?",
    ["Venus|Venus|Vénus|金星", "Mars|Marte|Mars|火星", "Mercury|Mercurio|Mercure|水星"],
    0,
    "Venus's diameter is about 95% of Earth's, closer in size than any other planet, even though its surface conditions could hardly be more different.|El diámetro de Venus es cerca del 95% del de la Tierra, más parecido en tamaño que cualquier otro planeta, aunque las condiciones de su superficie no podrían ser más distintas.|Le diamètre de Vénus représente environ 95 % de celui de la Terre, plus proche en taille qu'aucune autre planète, bien que les conditions de sa surface ne pourraient guère être plus différentes.|金星の直径は地球のおよそ95%で、他のどの惑星より大きさが近い。もっとも、表面の環境はこれ以上ないほど違う。",
  ),
  q(
    4,
    "Which of these moons orbits Saturn rather than Jupiter?|¿Cuál de estas lunas orbita Saturno y no Júpiter?|Laquelle de ces lunes orbite Saturne plutôt que Jupiter ?|次の衛星のうち、木星ではなく土星を回っているのはどれか?",
    ["Io|Ío|Io|イオ", "Europa|Europa|Europe|エウロパ", "Titan|Titán|Titan|タイタン"],
    2,
    "Titan is Saturn's largest moon and the second-largest moon in the Solar System after Jupiter's Ganymede.|Titán es la mayor luna de Saturno y la segunda más grande del Sistema Solar, tras Ganímedes de Júpiter.|Titan est la plus grande lune de Saturne et la deuxième plus grande lune du Système solaire après Ganymède, celle de Jupiter.|タイタンは土星最大の衛星であり、木星のガニメデに次いで太陽系で二番目に大きな衛星である。",
  ),
  q(
    5,
    "What is the region beyond Neptune called, where Pluto and countless icy bodies orbit?|¿Cómo se llama la región más allá de Neptuno donde orbitan Plutón e innumerables cuerpos helados?|Comment appelle-t-on la région au-delà de Neptune où orbitent Pluton et d'innombrables corps glacés ?|海王星の外側で冥王星や無数の氷天体が周回する領域を何と呼ぶか?",
    ["The Asteroid Belt|El cinturón de asteroides|La ceinture d'astéroïdes|小惑星帯", "The Oort Cloud|La Nube de Oort|Le Nuage de Oort|オールトの雲", "The Kuiper Belt|El cinturón de Kuiper|La ceinture de Kuiper|カイパーベルト"],
    2,
    "The Kuiper Belt was only confirmed to exist in 1992, decades after Pluto's 1930 discovery had already hinted something like it might be out there.|La existencia del cinturón de Kuiper solo se confirmó en 1992, décadas después de que el descubrimiento de Plutón en 1930 ya insinuara que podía haber algo así.|L'existence de la ceinture de Kuiper ne fut confirmée qu'en 1992, des décennies après que la découverte de Pluton en 1930 eut déjà laissé entrevoir qu'il pourrait exister quelque chose de semblable.|カイパーベルトの存在が確認されたのは1992年になってからで、1930年の冥王星発見によってその存在が示唆されてから数十年が経っていた。",
  ),
  q(
    5,
    "How many dwarf planets are most commonly recognized today?|¿Cuántos planetas enanos se reconocen habitualmente hoy en día?|Combien de planètes naines sont le plus couramment reconnues aujourd'hui ?|今日もっとも一般的に認められている準惑星はいくつか?",
    ["3|3|3|3", "5|5|5|5", "8|8|8|8"],
    1,
    "Ceres, Pluto, Haumea, Makemake and Eris are the five most commonly listed, though many astronomers think dozens more objects likely qualify once studied closely enough.|Ceres, Plutón, Haumea, Makemake y Eris son los cinco que se citan con más frecuencia, aunque muchos astrónomos creen que docenas más de objetos probablemente calificarían si se estudiaran de cerca.|Cérès, Pluton, Hauméa, Makémaké et Éris sont les cinq le plus souvent citées, bien que de nombreux astronomes pensent que des dizaines d'autres objets seraient probablement qualifiés une fois étudiés d'assez près.|ケレス・冥王星・ハウメア・マケマケ・エリスの五つが最も頻繁に挙げられるが、詳しく調べればさらに何十もの天体が該当しうると考える天文学者は多い。",
  ),
  q(
    5,
    "Which was the first artificial satellite ever launched, in 1957?|¿Cuál fue el primer satélite artificial jamás lanzado, en 1957?|Quel fut le tout premier satellite artificiel lancé, en 1957 ?|1957年に打ち上げられた、史上最初の人工衛星はどれか?",
    ["Sputnik 1|Sputnik 1|Spoutnik 1|スプートニク1号", "Explorer 1|Explorer 1|Explorer 1|エクスプローラー1号", "Apollo 1|Apolo 1|Apollo 1|アポロ1号"],
    0,
    "The Soviet Union's Sputnik 1 opened what is now called the Space Age, months before the first American satellite, Explorer 1, followed in 1958.|El Sputnik 1 soviético abrió lo que hoy se llama la Era Espacial, meses antes de que le siguiera el primer satélite estadounidense, el Explorer 1, en 1958.|Le Spoutnik 1 soviétique a ouvert ce qu'on appelle aujourd'hui l'ère spatiale, des mois avant que ne le suive le premier satellite américain, Explorer 1, en 1958.|ソ連のスプートニク1号は、いま「宇宙時代」と呼ばれる幕を開けた。アメリカ初の人工衛星エクスプローラー1号が続いたのは、その数か月後、1958年のことだった。",
  ),
  q(
    5,
    "Who became the first human in space, in April 1961?|¿Quién se convirtió en el primer humano en el espacio, en abril de 1961?|Qui devint le premier humain dans l'espace, en avril 1961 ?|1961年4月、人類初の宇宙飛行士となったのは誰か?",
    ["Neil Armstrong|Neil Armstrong|Neil Armstrong|ニール・アームストロング", "Alan Shepard|Alan Shepard|Alan Shepard|アラン・シェパード", "Yuri Gagarin|Yuri Gagarin|Youri Gagarine|ユーリイ・ガガーリン"],
    2,
    "Yuri Gagarin orbited Earth once aboard Vostok 1 on 12 April 1961, a flight lasting 108 minutes from launch to landing.|Yuri Gagarin orbitó la Tierra una vez a bordo de la Vostok 1 el 12 de abril de 1961, un vuelo de 108 minutos desde el lanzamiento hasta el aterrizaje.|Youri Gagarine fit le tour de la Terre une fois à bord de Vostok 1 le 12 avril 1961, un vol de 108 minutes du lancement à l'atterrissage.|ユーリイ・ガガーリンは1961年4月12日、ヴォストーク1号で地球を一周した。打ち上げから着陸まで108分の飛行だった。",
  ),
  q(
    6,
    "Which probe first landed successfully on Mars and sent back photographs, in 1976?|¿Qué sonda aterrizó por primera vez con éxito en Marte y envió fotografías, en 1976?|Quelle sonde s'est posée avec succès sur Mars pour la première fois et a renvoyé des photographies, en 1976 ?|1976年、初めて火星への着陸に成功し写真を送り返した探査機はどれか?",
    ["Viking 1|Viking 1|Viking 1|バイキング1号", "Mariner 4|Mariner 4|Mariner 4|マリナー4号", "Pathfinder|Pathfinder|Pathfinder|パスファインダー"],
    0,
    "Mariner 4 had already flown past Mars in 1965 and taken the first close-up photos, but Viking 1 was the first to land and operate on the surface itself.|La Mariner 4 ya había sobrevolado Marte en 1965 y tomado las primeras fotos de cerca, pero la Viking 1 fue la primera en aterrizar y operar en la propia superficie.|Mariner 4 avait déjà survolé Mars en 1965 et pris les premières photos rapprochées, mais Viking 1 fut la première à se poser et à fonctionner sur la surface elle-même.|マリナー4号はすでに1965年に火星をフライバイし最初の接写を撮っていたが、実際に着陸して地表で稼働したのはバイキング1号が最初だった。",
  ),
  q(
    6,
    "Which planet was the first discovered using a telescope, unknown to ancient astronomers?|¿Qué planeta fue el primero descubierto con telescopio, desconocido para los astrónomos antiguos?|Quelle planète fut la première découverte grâce à un télescope, inconnue des astronomes antiques ?|望遠鏡によって初めて発見され、古代の天文学者には知られていなかった惑星はどれか?",
    ["Saturn|Saturno|Saturne|土星", "Neptune|Neptuno|Neptune|海王星", "Uranus|Urano|Uranus|天王星"],
    2,
    "William Herschel spotted Uranus in 1781 while systematically surveying the sky, at first mistaking it for a comet before its planetary orbit became clear.|William Herschel avistó Urano en 1781 mientras rastreaba sistemáticamente el cielo, confundiéndolo al principio con un cometa hasta que su órbita planetaria quedó clara.|William Herschel repéra Uranus en 1781 en balayant systématiquement le ciel, la prenant d'abord pour une comète avant que son orbite planétaire ne devienne évidente.|ウィリアム・ハーシェルは1781年、空を組織的に観測している最中に天王星を見つけた。最初は彗星と勘違いしていたが、やがて惑星の軌道であることが明らかになった。",
  ),
  q(
    6,
    "Who was the first woman in space, in June 1963?|¿Quién fue la primera mujer en el espacio, en junio de 1963?|Qui fut la première femme dans l'espace, en juin 1963 ?|1963年6月、最初の女性宇宙飛行士となったのは誰か?",
    ["Sally Ride|Sally Ride|Sally Ride|サリー・ライド", "Valentina Tereshkova|Valentina Tereshkova|Valentina Terechkova|ワレンチナ・テレシコワ", "Mae Jemison|Mae Jemison|Mae Jemison|メイ・ジェミソン"],
    1,
    "Valentina Tereshkova spent almost three days alone in orbit, and no other woman flew to space for the next 19 years.|Valentina Tereshkova pasó casi tres días sola en órbita, y ninguna otra mujer voló al espacio durante los 19 años siguientes.|Valentina Terechkova passa près de trois jours seule en orbite, et aucune autre femme ne vola dans l'espace pendant les 19 années suivantes.|ワレンチナ・テレシコワはほぼ三日間ひとりで軌道上に滞在した。次に女性が宇宙へ飛んだのは、それから19年後だった。",
  ),
  q(
    6,
    "Which of these is NOT a moon of Jupiter?|¿Cuál de estas no es una luna de Júpiter?|Laquelle n'est pas une lune de Jupiter ?|次のうち、木星の衛星ではないのはどれか?",
    ["Callisto|Calisto|Callisto|カリスト", "Ganymede|Ganímedes|Ganymède|ガニメデ", "Enceladus|Encélado|Encelade|エンケラドス"],
    2,
    "Enceladus orbits Saturn, not Jupiter — its south-polar ice geysers are one of the most striking sights among Saturn's many moons.|Encélado orbita Saturno, no Júpiter; sus géiseres de hielo del polo sur son uno de los espectáculos más llamativos entre las muchas lunas de Saturno.|Encelade orbite Saturne, pas Jupiter — ses geysers de glace au pôle sud comptent parmi les spectacles les plus frappants des nombreuses lunes de Saturne.|エンケラドスは木星ではなく土星を回っている。その南極の氷の間欠泉は、土星の数ある衛星の中でもとりわけ目を引く光景である。",
  ),
  q(
    7,
    "Roughly how many Earth years does Neptune take to complete one orbit of the Sun?|¿Cuántos años terrestres tarda aproximadamente Neptuno en completar una órbita alrededor del Sol?|Combien d'années terrestres Neptune met-elle environ à faire une orbite autour du Soleil ?|海王星が太陽を一周するのにおよそ何地球年かかるか?",
    ["About 84 years|Unos 84 años|Environ 84 ans|約84年", "About 165 years|Unos 165 años|Environ 165 ans|約165年", "About 250 years|Unos 250 años|Environ 250 ans|約250年"],
    1,
    "Neptune has completed barely more than one full orbit since its discovery in 1846, finishing its first since then in 2011.|Neptuno apenas ha completado una órbita entera desde su descubrimiento en 1846, terminando la primera desde entonces en 2011.|Neptune a à peine achevé plus d'une orbite complète depuis sa découverte en 1846, terminant la première depuis lors en 2011.|海王星は1846年の発見からまだ一周半にも満たない。発見後初めて一周を終えたのは2011年のことだった。",
  ),
  q(
    7,
    "Which spacecraft was the first to orbit Mercury, rather than just fly past it?|¿Qué nave fue la primera en orbitar Mercurio, en vez de solo sobrevolarlo?|Quel engin fut le premier à orbiter Mercure, plutôt que de simplement la survoler ?|フライバイではなく水星を周回した最初の探査機はどれか?",
    ["Mariner 10|Mariner 10|Mariner 10|マリナー10号", "MESSENGER|MESSENGER|MESSENGER|メッセンジャー", "BepiColombo|BepiColombo|BepiColombo|ベピコロンボ"],
    1,
    "MESSENGER entered orbit around Mercury in 2011 after a six-and-a-half-year journey that looped past Earth, Venus and Mercury itself multiple times to shed enough speed to be captured.|La MESSENGER entró en órbita alrededor de Mercurio en 2011 tras un viaje de seis años y medio que pasó varias veces por la Tierra, Venus y el propio Mercurio para perder suficiente velocidad.|MESSENGER entra en orbite autour de Mercure en 2011 après un voyage de six ans et demi qui la fit repasser plusieurs fois près de la Terre, de Vénus et de Mercure elle-même pour perdre assez de vitesse.|メッセンジャーは2011年に水星の周回軌道に入った。地球・金星・水星自身を何度も回りながら6年半かけて速度を落とし、ようやく捕獲された旅だった。",
  ),
  q(
    7,
    "Which giant planet's interior is thought to be mostly water, ammonia and methane \"ices\" rather than metallic hydrogen?|¿El interior de qué planeta gigante se cree hecho sobre todo de agua, amoníaco y metano «helados» en vez de hidrógeno metálico?|L'intérieur de quelle géante est censé être surtout fait d'eau, d'ammoniac et de méthane « glacés » plutôt que d'hydrogène métallique ?|水・アンモニア・メタンの「氷」を主とし、金属水素をあまり持たないと考えられる巨大惑星はどれか?",
    ["Jupiter|Júpiter|Jupiter|木星", "Saturn|Saturno|Saturne|土星", "Neptune|Neptuno|Neptune|海王星"],
    2,
    "Neptune and Uranus are classed as \"ice giants\" for this reason, distinct from the \"gas giants\" Jupiter and Saturn, even though all four are mostly fluid rather than solid ice.|Neptuno y Urano se clasifican como «gigantes helados» por esta razón, distintos de los «gigantes gaseosos» Júpiter y Saturno, aunque los cuatro son sobre todo fluidos y no hielo sólido.|Neptune et Uranus sont classées « géantes de glace » pour cette raison, à la différence des « géantes gazeuses » Jupiter et Saturne, bien que les quatre soient surtout fluides plutôt que glace solide.|海王星と天王星はこの理由で「氷惑星」に分類され、「ガス惑星」の木星・土星とは区別される。もっとも四惑星とも大半は固体の氷ではなく流体である。",
  ),
  q(
    7,
    "Which planet currently has the most confirmed moons?|¿Qué planeta tiene actualmente más lunas confirmadas?|Quelle planète possède actuellement le plus de lunes confirmées ?|現在、確認されている衛星の数がいちばん多い惑星はどれか?",
    ["Jupiter|Júpiter|Jupiter|木星", "Saturn|Saturno|Saturne|土星", "Uranus|Urano|Uranus|天王星"],
    1,
    "Saturn overtook Jupiter's moon count after large batches of small outer moons were confirmed in the 2020s, though new discoveries keep both totals climbing.|Saturno superó el número de lunas de Júpiter después de que se confirmaran grandes lotes de lunas exteriores pequeñas en la década de 2020, aunque ambos totales siguen subiendo con nuevos hallazgos.|Saturne a dépassé le nombre de lunes de Jupiter après la confirmation de nombreux lots de petites lunes extérieures dans les années 2020, bien que de nouvelles découvertes continuent de faire grimper les deux totaux.|土星の衛星数は、2020年代に外側の小さな衛星がまとめて確認されたことで木星を上回った。もっとも新発見が続き、両者の数はいまも増え続けている。",
  ),
  q(
    8,
    "What is the vast, mostly theoretical shell of icy bodies thought to surround the whole Solar System called?|¿Cómo se llama la vasta y en gran parte teórica capa de cuerpos helados que se cree rodea todo el Sistema Solar?|Comment appelle-t-on la vaste coquille, en grande partie théorique, de corps glacés censée entourer tout le Système solaire ?|太陽系全体を取り巻くと考えられる、大部分が理論上の氷天体の殻を何と呼ぶか?",
    ["The Kuiper Belt|El cinturón de Kuiper|La ceinture de Kuiper|カイパーベルト", "The Asteroid Belt|El cinturón de asteroides|La ceinture d'astéroïdes|小惑星帯", "The Oort Cloud|La Nube de Oort|Le Nuage de Oort|オールトの雲"],
    2,
    "No object in the Oort Cloud has ever been directly observed — its existence is inferred mainly from the long, looping orbits of certain comets.|Ningún objeto de la Nube de Oort se ha observado jamás directamente: su existencia se infiere sobre todo de las órbitas largas y curvas de ciertos cometas.|Aucun objet du Nuage de Oort n'a jamais été observé directement : son existence est déduite surtout des orbites longues et en boucle de certaines comètes.|オールトの雲の天体は、これまで一つも直接観測されたことがない。その存在は主に、いくつかの彗星が描く長く弧を描く軌道から推測されている。",
  ),
  q(
    8,
    "Which of these was NOT achieved by the two Voyager probes?|¿Cuál de estas cosas NO lograron las dos sondas Voyager?|Laquelle de ces réalisations n'est PAS due aux deux sondes Voyager ?|次のうち、二機のボイジャー探査機が達成していないものはどれか?",
    ["Being the only probes to visit all four giant planets between them|Ser las únicas sondas que, entre las dos, visitaron los cuatro planetas gigantes|Être les seules sondes à avoir visité, à elles deux, les quatre géantes|二機合わせて四つの巨大惑星すべてを訪れた唯一の探査機であること", "Carrying a message intended for whatever might one day find them|Llevar un mensaje pensado para quien pudiera hallarlas algún día|Transporter un message destiné à qui pourrait un jour les trouver|いつか見つけるかもしれない誰かへ向けた記録を積んでいること", "Landing a probe on the surface of Titan|Posar una sonda en la superficie de Titán|Poser une sonde à la surface de Titan|タイタンの地表に着陸機を降ろしたこと"],
    2,
    "It was the separate Huygens probe, riding along with the Cassini orbiter, that landed on Titan in 2005 — decades after the Voyagers had already flown on past Saturn.|Fue la sonda Huygens, independiente, viajando junto al orbitador Cassini, la que aterrizó en Titán en 2005, décadas después de que las Voyager ya hubieran pasado Saturno.|C'est la sonde Huygens, distincte, voyageant avec l'orbiteur Cassini, qui s'est posée sur Titan en 2005 — des décennies après que les Voyager eurent déjà dépassé Saturne.|タイタンに着陸したのは、カッシーニ探査機に相乗りした別のホイヘンス・プローブで、2005年のことだった。ボイジャー探査機が土星を通り過ぎてから何十年も後である。",
  ),
  q(
    8,
    "Roughly how many Earth years does Pluto take to complete one orbit of the Sun?|¿Cuántos años terrestres tarda aproximadamente Plutón en completar una órbita alrededor del Sol?|Combien d'années terrestres Pluton met-elle environ à faire une orbite autour du Soleil ?|冥王星が太陽を一周するのにおよそ何地球年かかるか?",
    ["About 90 years|Unos 90 años|Environ 90 ans|約90年", "About 165 years|Unos 165 años|Environ 165 ans|約165年", "About 248 years|Unos 248 años|Environ 248 ans|約248年"],
    2,
    "Pluto has not yet completed a single full orbit since its discovery in 1930 — it will not do so until 2178.|Plutón todavía no ha completado ni una órbita entera desde su descubrimiento en 1930: no lo hará hasta 2178.|Pluton n'a pas encore achevé une seule orbite complète depuis sa découverte en 1930 — elle ne le fera pas avant 2178.|冥王星は1930年の発見からまだ一周も終えていない。一周を終えるのは2178年になってからである。",
  ),
  q(
    9,
    "Which spacecraft runs on a nuclear (radioisotope) battery rather than solar panels, since it travels too far for panels to work well?|¿Qué nave funciona con una batería nuclear (radioisótopos) en vez de paneles solares, por viajar demasiado lejos para que los paneles funcionen bien?|Quel engin fonctionne sur une batterie nucléaire (radio-isotope) plutôt que des panneaux solaires, car il voyage trop loin pour qu'ils fonctionnent bien ?|太陽電池パネルではなく原子力電池(放射性同位体電池)で動く探査機はどれか。太陽から遠すぎてパネルがうまく働かないためである。",
    ["Parker Solar Probe|Sonda Solar Parker|Sonde solaire Parker|パーカー・ソーラー・プローブ", "Voyager 1|Voyager 1|Voyager 1|ボイジャー1号", "Juno|Juno|Juno|ジュノー"],
    1,
    "Parker Solar Probe and Juno both actually rely on solar panels, engineered to handle extreme heat or extreme distance respectively — it's the far-flung Voyagers that need a nuclear source instead.|La Parker Solar Probe y Juno, de hecho, dependen de paneles solares, diseñados para soportar calor extremo o distancias extremas respectivamente; son las lejanas Voyager las que necesitan en cambio una fuente nuclear.|La sonde Parker et Juno reposent en fait toutes deux sur des panneaux solaires, conçus pour supporter une chaleur extrême ou une distance extrême respectivement ; ce sont les lointaines Voyager qui ont besoin d'une source nucléaire.|パーカー・ソーラー・プローブもジュノーも、実は太陽電池パネルで動いている。それぞれ極端な熱や極端な距離に耐えるよう設計されているためである。原子力電池が必要なのは、はるか遠くまで行くボイジャーのほうである。",
  ),
  q(
    9,
    "Which of these moons is NOT suspected to hide a subsurface ocean beneath an icy shell?|¿Cuál de estas lunas NO se sospecha que esconda un océano bajo una corteza helada?|Laquelle de ces lunes n'est PAS soupçonnée de cacher un océan sous une coquille de glace ?|次の衛星のうち、氷の下に海を隠しているとは考えられていないのはどれか?",
    ["Europa|Europa|Europe|エウロパ", "Enceladus|Encélado|Encelade|エンケラドス", "Phobos|Fobos|Phobos|フォボス"],
    2,
    "Phobos is a small, dry, heavily cratered rock thought to be either a captured asteroid or debris from an ancient impact on Mars, with no ocean suspected at all.|Fobos es una roca pequeña, seca y muy craterizada, que se cree un asteroide capturado o restos de un impacto antiguo en Marte, sin océano alguno sospechado.|Phobos est une roche petite, sèche et très cratérisée, censée être soit un astéroïde capturé, soit des débris d'un impact ancien sur Mars, sans aucun océan soupçonné.|フォボスは乾いた小さな岩の塊で、クレーターだらけである。捕獲された小惑星か、大昔に火星に起きた衝突の破片だと考えられており、海があるとは考えられていない。",
  ),
  q(
    10,
    "Which dwarf planet is named after an Inuit goddess of the sea?|¿Qué planeta enano recibe el nombre de una diosa inuit del mar?|Quelle planète naine porte le nom d'une déesse inuite de la mer ?|イヌイットの海の女神にちなんで名付けられた準惑星はどれか?",
    ["Sedna|Sedna|Sedna|セドナ", "Eris|Eris|Éris|エリス", "Haumea|Haumea|Hauméa|ハウメア"],
    0,
    "In Inuit tradition, Sedna is said to rule the creatures of the deep sea, a fitting name for a world that spends most of its 11,400-year orbit in the deep cold far beyond Neptune.|En la tradición inuit, se dice que Sedna gobierna las criaturas del mar profundo, un nombre apropiado para un mundo que pasa la mayor parte de su órbita de 11.400 años en el frío profundo mucho más allá de Neptuno.|Dans la tradition inuite, Sedna est dite régner sur les créatures des profondeurs marines, un nom bien choisi pour un monde qui passe l'essentiel de son orbite de 11 400 ans dans le froid profond bien au-delà de Neptune.|イヌイットの伝承では、セドナは深海の生き物たちを統べるとされる。海王星のはるか外側の深い寒さの中で、11,400年周期の軌道のほとんどを過ごす天体にふさわしい名である。",
  ),
];
