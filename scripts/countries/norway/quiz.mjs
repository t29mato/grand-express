/**
 * ノルウェーのクイズ。
 *
 * 都市カード(48件)がすでに扱った具体的な事実(1854年の最初の鉄道・
 * ブリッゲンのハンザ商人・トロンハイムの分岐・ボードーの空襲・
 * ティルピッツ撃沈・ナルヴィク海戦・スタヴァンゲルの移民と石油・
 * モー・イ・ラーナの捕虜労働・ハンメルフェストの焦土作戦など)は
 * ここでは問わない。国全体の地理・歴史・言語・自然・現代文化など、
 * 都市カードが触れていない主題を選んである。
 *
 * 難易度の基準は他の盤面と同じ(1〜10、「その国の外にいる一般的な人が
 * どれくらい答えられそうか」)。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ```
 * node scripts/check-quiz.mjs norway
 * ```
 * で、答えの漏れ・4言語の混入と欠け・正解の位置の偏り・題材の偏りを確認すること。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const NORWAY_QUIZ = [
  q(
    2,
    "What is the capital of Norway?|¿Cuál es la capital de Noruega?|Quelle est la capitale de la Norvège ?|ノルウェーの首都はどこか?",
    [
      "Oslo|Oslo|Oslo|オスロ",
      "Bergen|Bergen|Bergen|ベルゲン",
      "Trondheim|Trondheim|Trondheim|トロンハイム",
    ],
    0,
    "Oslo has been Norway's capital since the early fourteenth century and is by far its largest city today, though for centuries it was Bergen, not Oslo, that held more people.|Oslo es la capital de Noruega desde principios del siglo XIV y hoy es, con diferencia, su ciudad más poblada, aunque durante siglos fue Bergen, no Oslo, la que tuvo más habitantes.|Oslo est la capitale de la Norvège depuis le début du XIVe siècle et en est de loin la plus grande ville aujourd'hui, bien que pendant des siècles ce fût Bergen, et non Oslo, qui comptât le plus d'habitants.|オスロは14世紀初めからノルウェーの首都であり、今日では飛び抜けて最大の都市だが、何世紀ものあいだ人口で上回っていたのはオスロではなくベルゲンだった。",
  ),
  q(
    5,
    "Bergen has a reputation as one of Europe's wettest cities. Roughly how many days a year does it see measurable rain?|Bergen tiene fama de ser una de las ciudades más lluviosas de Europa. ¿Cuántos días al año recibe lluvia medible, aproximadamente?|Bergen a la réputation d'être l'une des villes les plus pluvieuses d'Europe. Combien de jours par an y mesure-t-on approximativement des précipitations ?|ベルゲンはヨーロッパでも屈指の雨の多い街として知られる。おおよそ年に何日、計測できる雨が降るか?",
    [
      "About 90 days|Unos 90 días|Environ 90 jours|およそ90日",
      "About 150 days|Unos 150 días|Environ 150 jours|およそ150日",
      "About 230 days|Unos 230 días|Environ 230 jours|およそ230日",
    ],
    2,
    "The mountains that ring Bergen on three sides trap the moisture blowing in off the Atlantic, wringing rain out of it before it can pass over the city — a shape of land that makes the wetness less an accident of weather than a fact of the terrain.|Las montañas que rodean Bergen por tres lados atrapan la humedad que llega desde el Atlántico y la exprimen en forma de lluvia antes de que pueda pasar sobre la ciudad, una configuración del terreno que hace de la humedad más un hecho del relieve que un azar del tiempo.|Les montagnes qui encerclent Bergen sur trois côtés emprisonnent l'humidité venue de l'Atlantique et en extraient la pluie avant qu'elle ne puisse passer au-dessus de la ville — un relief qui fait de cette humidité moins un hasard météorologique qu'un fait du terrain.|ベルゲンを三方から囲む山々が、大西洋から吹き込む湿った空気を閉じ込め、街を越える前に雨として絞り出す。この雨の多さは天気の巡り合わせというより、地形そのものが招く必然に近い。",
  ),
  q(
    9,
    "Tromsø's wooden \"Arctic Cathedral\" (Ishavskatedralen) is famous for a detail that contradicts its own name. What is it?|La \"Catedral Ártica\" de madera de Tromsø (Ishavskatedralen) es célebre por un detalle que contradice su propio nombre. ¿Cuál es?|La « cathédrale arctique » en bois de Tromsø (Ishavskatedralen) est connue pour un détail qui contredit son propre nom. Lequel ?|トロムソの木造「北極大聖堂」(イースハヴスカテドラーレン)には、その名前と矛盾する点があることで知られる。それは何か?",
    [
      "It is a parish church, not the seat of a bishop, despite being called a \"cathedral\"|Es una iglesia parroquial, no la sede de un obispo, pese a llamarse \"catedral\"|C'est une église paroissiale, non le siège d'un évêque, bien qu'on l'appelle « cathédrale »|「大聖堂」と呼ばれながら、実際は司教座のない一介の教区教会である",
      "It has never been consecrated, so no services are held inside it|Nunca ha sido consagrada, así que en su interior no se celebra ningún oficio|Elle n'a jamais été consacrée, aucun office n'y est donc célébré|一度も聖別されておらず、内部で礼拝が行われたことがない",
      "It was built as a concert hall and only later renamed a cathedral|Se construyó como sala de conciertos y solo después se rebautizó como catedral|Elle fut construite comme salle de concert et rebaptisée cathédrale plus tard|もとはコンサートホールとして建てられ、のちに大聖堂と改称された",
    ],
    0,
    "Tromsø's actual cathedral — the seat of the Diocese of Nord-Hålogaland's bishop — is a separate, older wooden church in the town centre. The dramatically pointed building across the strait earned its \"cathedral\" nickname from its shape alone, and the name stuck long before anyone corrected it.|La verdadera catedral de Tromsø —sede del obispo de la diócesis de Nord-Hålogaland— es otra iglesia de madera, más antigua, en el centro de la ciudad. El edificio de puntiaguda silueta al otro lado del estrecho ganó el apodo de \"catedral\" solo por su forma, y el nombre se quedó mucho antes de que nadie lo corrigiera.|La véritable cathédrale de Tromsø — siège de l'évêque du diocèse de Nord-Hålogaland — est une autre église en bois, plus ancienne, au centre-ville. Le bâtiment aux pointes spectaculaires de l'autre côté du détroit ne doit son surnom de « cathédrale » qu'à sa forme, et ce nom lui est resté bien avant que quiconque ne le corrige.|トロムソの本当の大聖堂——ノール・ホーロガラン教区の司教座がある教会——は、街の中心部にある別の、より古い木造教会である。海峡の対岸に立つあの尖った印象的な建物は、形だけを理由に「大聖堂」と呼ばれるようになり、誰も訂正しないうちにその名がすっかり定着してしまった。",
  ),
  // ---------------------------------------------------------------------
  // 一般常識(難易度1〜4)
  // ---------------------------------------------------------------------
  q(
    1,
    "What is the currency of Norway?|¿Cuál es la moneda de Noruega?|Quelle est la monnaie de la Norvège ?|ノルウェーの通貨は何か?",
    [
      "Norwegian krone|Corona noruega|Couronne norvégienne|ノルウェー・クローネ",
      "Norwegian mark|Marco noruego|Mark norvégien|ノルウェー・マルク",
      "Norwegian franc|Franco noruego|Franc norvégien|ノルウェー・フラン",
    ],
    0,
    "Norway has never adopted the euro and is not a member of the EU at all, so it kept the krone, first introduced in 1875 as part of a short-lived joint Scandinavian Monetary Union with Denmark and Sweden.|Noruega nunca ha adoptado el euro y ni siquiera es miembro de la UE, así que conservó la corona, introducida en 1875 dentro de una efímera Unión Monetaria Escandinava con Dinamarca y Suecia.|La Norvège n'a jamais adopté l'euro et n'est même pas membre de l'UE, elle a donc conservé la couronne, introduite en 1875 au sein d'une éphémère Union monétaire scandinave avec le Danemark et la Suède.|ノルウェーは一度もユーロを導入しておらず、そもそもEUに加盟してすらいない。そのためクローネを使い続けており、これは1875年、デンマーク・スウェーデンとの短命に終わったスカンディナヴィア通貨同盟の一環として導入されたものである。",
  ),
  q(
    2,
    "Which three countries share a land border with Norway?|¿Qué tres países comparten frontera terrestre con Noruega?|Quels trois pays partagent une frontière terrestre avec la Norvège ?|ノルウェーと陸続きの国境を接する3か国はどこか?",
    [
      "Sweden, Finland and Russia|Suecia, Finlandia y Rusia|Suède, Finlande et Russie|スウェーデン・フィンランド・ロシア",
      "Sweden, Denmark and Russia|Suecia, Dinamarca y Rusia|Suède, Danemark et Russie|スウェーデン・デンマーク・ロシア",
      "Sweden, Finland and Poland|Suecia, Finlandia y Polonia|Suède, Finlande et Pologne|スウェーデン・フィンランド・ポーランド",
    ],
    0,
    "Denmark, despite ruling Norway for over four centuries, has never actually shared a land border with it — the Skagerrak strait has always separated the two.|Dinamarca, pese a haber gobernado Noruega durante más de cuatro siglos, nunca ha compartido frontera terrestre con ella: el estrecho de Skagerrak siempre las ha separado.|Le Danemark, bien qu'ayant gouverné la Norvège pendant plus de quatre siècles, n'a jamais partagé de frontière terrestre avec elle — le détroit du Skagerrak les a toujours séparés.|デンマークは四百年以上ノルウェーを支配していたにもかかわらず、両国が陸地で国境を接したことは一度もない。スカゲラク海峡が常に両国を隔ててきた。",
  ),
  q(
    2,
    "What does Norway's flag look like?|¿Cómo es la bandera de Noruega?|À quoi ressemble le drapeau de la Norvège ?|ノルウェーの国旗はどのような図案か?",
    [
      "A blue cross outlined in white on a red field|Una cruz azul bordeada de blanco sobre fondo rojo|Une croix bleue bordée de blanc sur fond rouge|赤地に白縁取りの青い十字",
      "A white cross on a red field|Una cruz blanca sobre fondo rojo|Une croix blanche sur fond rouge|赤地に白い十字",
      "A yellow cross on a blue field|Una cruz amarilla sobre fondo azul|Une croix jaune sur fond bleu|青地に黄色い十字",
    ],
    0,
    "The design combines the colours of Denmark's flag (red and white), which ruled Norway until 1814, with the blue of France, then seen as a symbol of liberty.|El diseño combina los colores de la bandera de Dinamarca (rojo y blanco), que gobernó Noruega hasta 1814, con el azul de Francia, entonces visto como símbolo de libertad.|Le dessin combine les couleurs du drapeau du Danemark (rouge et blanc), qui gouverna la Norvège jusqu'en 1814, avec le bleu de la France, alors vu comme un symbole de liberté.|この図案は、1814年までノルウェーを支配していたデンマークの旗の色(赤と白)に、当時自由の象徴とされていたフランスの青を組み合わせたものである。",
  ),
  q(
    1,
    "What is the colourful natural light display often seen in Norway's winter sky called?|¿Cómo se llama el colorido fenómeno luminoso natural que suele verse en el cielo invernal de Noruega?|Comment appelle-t-on le spectacle lumineux naturel et coloré souvent visible dans le ciel hivernal norvégien ?|ノルウェーの冬の空でよく見られる、色とりどりの自然の光の現象を何というか?",
    [
      "The Northern Lights (Aurora Borealis)|La aurora boreal|Les aurores boréales|オーロラ(北極光)",
      "The Midnight Sun|El sol de medianoche|Le soleil de minuit|白夜",
      "St. Elmo's Fire|El fuego de San Telmo|Le feu de Saint-Elme|セントエルモの火",
    ],
    0,
    "The lights are caused by charged particles from the sun colliding with gases in the upper atmosphere, and are best seen away from city lights on clear winter nights north of the Arctic Circle.|Las luces se deben a partículas cargadas del sol que chocan con los gases de la atmósfera superior, y se ven mejor lejos de las luces de la ciudad en noches de invierno despejadas al norte del círculo polar ártico.|Ces lumières sont dues à des particules chargées venues du soleil entrant en collision avec les gaz de la haute atmosphère, et se voient mieux loin des lumières urbaines par nuits d'hiver claires au nord du cercle polaire arctique.|オーロラは、太陽から来た荷電粒子が上層大気のガスとぶつかることで生じる。北極圏より北の、街の灯りの届かない晴れた冬の夜が最も見やすい。",
  ),
  q(
    2,
    "What is the name for the phenomenon, in parts of northern Norway, where the sun never sets for weeks in summer?|¿Cómo se llama el fenómeno, en zonas del norte de Noruega, en el que el sol no se pone durante semanas en verano?|Comment appelle-t-on le phénomène, dans certaines régions du nord de la Norvège, où le soleil ne se couche pas pendant des semaines en été ?|ノルウェー北部の一部で、夏に何週間も太陽が沈まない現象を何というか?",
    [
      "The Midnight Sun|El sol de medianoche|Le soleil de minuit|白夜",
      "The Polar Night|La noche polar|La nuit polaire|極夜",
      "The Green Flash|El rayo verde|Le rayon vert|グリーンフラッシュ",
    ],
    0,
    "North of the Arctic Circle, the sun stays above the horizon continuously for a stretch of weeks each summer, and the same places see an opposite stretch of continuous darkness, the polar night, each winter.|Al norte del círculo polar ártico, el sol permanece sobre el horizonte de forma continua durante varias semanas cada verano, y esos mismos lugares viven un tramo opuesto de oscuridad continua, la noche polar, cada invierno.|Au nord du cercle polaire arctique, le soleil reste continuellement au-dessus de l'horizon pendant plusieurs semaines chaque été, et ces mêmes lieux connaissent, à l'inverse, une période de nuit continue, la nuit polaire, chaque hiver.|北極圏より北では、毎年夏の数週間、太陽が沈まず地平線の上にとどまり続ける。同じ場所では冬になると逆に、太陽が昇らない極夜と呼ばれる期間が続く。",
  ),
  q(
    3,
    "The English word 'ski' comes from which language?|¿De qué idioma procede la palabra inglesa 'ski' (esquí)?|De quelle langue vient le mot anglais 'ski' ?|英語の「ski(スキー)」という語は何語に由来するか?",
    [
      "Old Norse / Norwegian|Nórdico antiguo / noruego|Vieux norrois / norvégien|古ノルド語・ノルウェー語",
      "Finnish|Finlandés|Finnois|フィンランド語",
      "German|Alemán|Allemand|ドイツ語",
    ],
    0,
    "It comes from the Old Norse word skíð, meaning a split piece of wood or a snowshoe, and entered English only in the nineteenth century as skiing spread as a sport from Norway.|Proviene de la palabra nórdica antigua skíð, que significa un trozo de madera hendido o una raqueta de nieve, y no entró en inglés hasta el siglo XIX, cuando el esquí se difundió como deporte desde Noruega.|Il vient du mot vieux norrois skíð, désignant une pièce de bois fendue ou une raquette à neige, et n'entra en anglais qu'au XIXe siècle, à mesure que le ski se répandait comme sport depuis la Norvège.|この語は「割った木片」や「かんじき」を意味する古ノルド語 skíð に由来し、スキーがノルウェーからスポーツとして広まった19世紀になってようやく英語に取り入れられた。",
  ),
  q(
    1,
    "What is the deep, narrow inlet of sea carved by glaciers, found all along Norway's coast, called?|¿Cómo se llama la entrada de mar estrecha y profunda, excavada por glaciares, que se encuentra a lo largo de toda la costa de Noruega?|Comment appelle-t-on l'entrée de mer étroite et profonde, creusée par les glaciers, que l'on trouve tout le long de la côte norvégienne ?|氷河が削った、ノルウェーの海岸沿いいたるところに見られる細長く深い入り江を何というか?",
    [
      "A fjord|Un fiordo|Un fjord|フィヨルド",
      "A delta|Un delta|Un delta|デルタ",
      "An atoll|Un atolón|Un atoll|環礁",
    ],
    0,
    "The English word 'fjord' is itself borrowed directly from Norwegian, and Norway's coastline, once every fjord and island is counted, stretches to a length commonly cited as well over 100,000 kilometres.|La propia palabra inglesa 'fjord' está tomada directamente del noruego, y la costa de Noruega, contando cada fiordo e isla, se cifra a menudo en bastante más de 100.000 kilómetros.|Le mot anglais 'fjord' est lui-même emprunté directement au norvégien, et le littoral de la Norvège, une fois compté chaque fjord et chaque île, atteint une longueur souvent citée comme dépassant largement les 100 000 kilomètres.|英語の fjord という語自体、ノルウェー語からそのまま借用されたものである。ノルウェーの海岸線は、すべてのフィヨルドと島を数えると、しばしば10万kmを優に超えると言われる長さになる。",
  ),
  q(
    2,
    "Which Norwegian painter created the famous work The Scream?|¿Qué pintor noruego creó la famosa obra El grito?|Quel peintre norvégien créa la célèbre œuvre Le Cri ?|『叫び』で知られるノルウェーの画家は誰か?",
    [
      "Edvard Munch|Edvard Munch|Edvard Munch|エドヴァルド・ムンク",
      "Edvard Grieg|Edvard Grieg|Edvard Grieg|エドヴァルド・グリーグ",
      "Henrik Ibsen|Henrik Ibsen|Henrik Ibsen|ヘンリク・イプセン",
    ],
    0,
    "Munch painted several versions of The Scream in the 1890s, and said the idea came to him while walking at sunset when he felt what he described as an infinite scream passing through nature.|Munch pintó varias versiones de El grito en la década de 1890, y dijo que la idea le llegó mientras caminaba al atardecer, cuando sintió lo que describió como un grito infinito atravesando la naturaleza.|Munch peignit plusieurs versions du Cri dans les années 1890, et disait que l'idée lui était venue lors d'une promenade au coucher du soleil, quand il ressentit ce qu'il décrivit comme un cri infini traversant la nature.|ムンクは1890年代に『叫び』の異なるバージョンをいくつも描いた。本人によれば、夕暮れに散歩していたとき、自然を貫く「無限の叫び」を感じたことが着想の元になったという。",
  ),
  q(
    3,
    "Which Norwegian explorer led the first expedition to reach the South Pole, in 1911?|¿Qué explorador noruego dirigió la primera expedición en alcanzar el Polo Sur, en 1911?|Quel explorateur norvégien mena la première expédition à atteindre le pôle Sud, en 1911 ?|1911年、南極点に初めて到達した探検隊を率いたノルウェー人は誰か?",
    [
      "Roald Amundsen|Roald Amundsen|Roald Amundsen|ロアール・アムンセン",
      "Fridtjof Nansen|Fridtjof Nansen|Fridtjof Nansen|フリチョフ・ナンセン",
      "Thor Heyerdahl|Thor Heyerdahl|Thor Heyerdahl|トール・ヘイエルダール",
    ],
    0,
    "Amundsen's team reached the pole on 14 December 1911, about five weeks ahead of a British expedition led by Robert Falcon Scott, whose entire party died on the return journey.|El equipo de Amundsen llegó al polo el 14 de diciembre de 1911, unas cinco semanas antes que una expedición británica liderada por Robert Falcon Scott, cuyo grupo entero murió en el viaje de regreso.|L'équipe d'Amundsen atteignit le pôle le 14 décembre 1911, environ cinq semaines avant une expédition britannique menée par Robert Falcon Scott, dont tout le groupe périt lors du voyage de retour.|アムンセンの隊は1911年12月14日に極点へ到達した。ロバート・ファルコン・スコット率いる英国隊より約5週間早く、そのスコット隊は帰路で全員が命を落とした。",
  ),
  q(
    3,
    "As of the most recent Winter Olympics, which nation has won the most medals in Winter Olympic history?|Hasta los Juegos de Invierno más recientes, ¿qué nación ha ganado más medallas en la historia olímpica de invierno?|D'après les Jeux d'hiver les plus récents, quelle nation a remporté le plus de médailles de toute l'histoire olympique d'hiver ?|直近の冬季オリンピックまでの通算で、冬季五輪史上最多のメダルを獲得している国はどこか?",
    [
      "Norway|Noruega|Norvège|ノルウェー",
      "The United States|Estados Unidos|États-Unis|アメリカ合衆国",
      "Germany|Alemania|Allemagne|ドイツ",
    ],
    0,
    "Norway, a country of only around 5.5 million people, has topped the all-time Winter Olympics medal table since pulling ahead at the 2018 Pyeongchang Games and extending its lead further at Beijing 2022.|Noruega, un país de solo unos 5,5 millones de habitantes, encabeza el medallero histórico de los Juegos Olímpicos de Invierno desde que se puso en cabeza en los Juegos de Pyeongchang 2018 y amplió su ventaja en Pekín 2022.|La Norvège, un pays de seulement environ 5,5 millions d'habitants, domine le tableau historique des médailles des Jeux olympiques d'hiver depuis qu'elle a pris la tête aux Jeux de Pyeongchang 2018 et creusé son avance à Pékin 2022.|人口わずか550万人ほどのノルウェーは、2018年平昌大会で首位に立って以来、冬季オリンピックの歴代メダル数で世界一を保ち、2022年北京大会でさらに差を広げた。",
  ),
  q(
    3,
    "How many official written standards does the Norwegian language have?|¿Cuántos estándares escritos oficiales tiene la lengua noruega?|Combien de normes écrites officielles compte la langue norvégienne ?|ノルウェー語には公式な書き言葉の規範がいくつあるか?",
    [
      "Two|Dos|Deux|2つ",
      "One|Uno|Un seul|1つ",
      "Four|Cuatro|Quatre|4つ",
    ],
    0,
    "Bokmål, closer to Danish, and Nynorsk, built from rural dialects in the nineteenth century, are both official, and Norwegian schoolchildren are required to learn to write in both.|El bokmål, más cercano al danés, y el nynorsk, construido a partir de dialectos rurales en el siglo XIX, son ambos oficiales, y los escolares noruegos están obligados a aprender a escribir en los dos.|Le bokmål, plus proche du danois, et le nynorsk, bâti à partir de dialectes ruraux au XIXe siècle, sont tous deux officiels, et les écoliers norvégiens doivent apprendre à écrire dans les deux.|デンマーク語に近いブークモールと、19世紀に地方の方言をもとに作られたニーノシュクは、どちらも公用の書き言葉であり、ノルウェーの子どもたちは両方で書く力を学校で身につけることを義務づけられている。",
  ),
  q(
    4,
    "What is the name of the strait separating southern Norway from Denmark?|¿Cómo se llama el estrecho que separa el sur de Noruega de Dinamarca?|Comment s'appelle le détroit séparant le sud de la Norvège du Danemark ?|ノルウェー南部とデンマークを隔てる海峡の名は?",
    [
      "Skagerrak|Skagerrak|Skagerrak|スカゲラク海峡",
      "The Kattegat|El Kattegat|Le Cattégat|カテガット海峡",
      "The Øresund|El Öresund|L'Øresund|エーレスンド海峡",
    ],
    0,
    "The Skagerrak also carries the ferry routes linking Kristiansand and other south-coast Norwegian towns to Denmark, a crossing that takes only a few hours.|El Skagerrak también acoge las rutas de ferry que enlazan Kristiansand y otras localidades de la costa sur de Noruega con Dinamarca, una travesía de solo unas horas.|Le Skagerrak porte aussi les lignes de ferry reliant Kristiansand et d'autres villes de la côte sud norvégienne au Danemark, une traversée de seulement quelques heures.|スカゲラク海峡には、クリスチャンサンをはじめとするノルウェー南岸の町々とデンマークを結ぶフェリー航路も通っており、その所要時間はわずか数時間である。",
  ),
  q(
    2,
    "What large wild animal, common in Norway's forests and a popular game species, is called 'elg' in Norwegian?|¿Qué gran animal salvaje, común en los bosques de Noruega y muy cazado, se llama 'elg' en noruego?|Quel grand animal sauvage, courant dans les forêts norvégiennes et très chassé, se nomme 'elg' en norvégien ?|ノルウェーの森に多く、狩猟の対象としても人気のある大型動物を、ノルウェー語で「elg」と呼ぶ。これは何か?",
    [
      "Moose (elk)|Alce|Élan|ヘラジカ",
      "Reindeer|Reno|Renne|トナカイ",
      "Wild boar|Jabalí|Sanglier|イノシシ",
    ],
    0,
    "Norway has one of the highest moose densities in the world, and tens of thousands are legally hunted every autumn under a licensed quota system.|Noruega tiene una de las densidades de alces más altas del mundo, y decenas de miles se cazan legalmente cada otoño bajo un sistema de cupos con licencia.|La Norvège compte l'une des plus fortes densités d'élans au monde, et des dizaines de milliers sont chassés légalement chaque automne dans le cadre d'un système de quotas sous licence.|ノルウェーは世界でも屈指のヘラジカの生息密度を誇り、毎秋、許可制の頭数割り当てのもとで数万頭が合法的に狩猟されている。",
  ),
  q(
    3,
    "On what date is Norway's Constitution Day, its national day, celebrated?|¿En qué fecha se celebra el Día de la Constitución de Noruega, su fiesta nacional?|À quelle date est célébrée la fête nationale de la Norvège, le jour de la Constitution ?|ノルウェーの憲法記念日(建国記念日にあたる祝日)はいつか?",
    [
      "17 May|17 de mayo|17 mai|5月17日",
      "14 July|14 de julio|14 juillet|7月14日",
      "4 July|4 de julio|4 juillet|7月4日",
    ],
    0,
    "Unlike most countries, Norway marks its national day not with a military parade but with a children's parade, thousands of schoolchildren marching through the streets waving flags.|A diferencia de la mayoría de los países, Noruega celebra su día nacional no con un desfile militar, sino con un desfile infantil, en el que miles de escolares marchan por las calles agitando banderas.|Contrairement à la plupart des pays, la Norvège marque sa fête nationale non par un défilé militaire mais par un défilé d'enfants, des milliers d'écoliers défilant dans les rues en agitant des drapeaux.|多くの国と違い、ノルウェーは国の記念日を軍事パレードではなく子どもの行進で祝う。何千人もの児童が旗を振りながら通りを行進する。",
  ),
  q(
    3,
    "Is Norway a member of the European Union?|¿Es Noruega miembro de la Unión Europea?|La Norvège est-elle membre de l'Union européenne ?|ノルウェーはEU(欧州連合)の加盟国か?",
    [
      "No, Norwegian voters have twice rejected joining|No, los votantes noruegos han rechazado dos veces la adhesión|Non, les électeurs norvégiens ont deux fois rejeté l'adhésion|いいえ、国民投票で二度加盟を否決している",
      "Yes, since 1994|Sí, desde 1994|Oui, depuis 1994|はい、1994年から",
      "Yes, but it does not use the euro|Sí, pero no usa el euro|Oui, mais elle n'utilise pas l'euro|はい、ただしユーロは使っていない",
    ],
    0,
    "Referendums in 1972 and 1994 both narrowly rejected EU membership, though Norway participates in the EU's single market through a separate agreement, the European Economic Area.|Los referéndums de 1972 y 1994 rechazaron por escaso margen la adhesión a la UE, aunque Noruega participa en el mercado único europeo mediante un acuerdo aparte, el Espacio Económico Europeo.|Les référendums de 1972 et 1994 rejetèrent tous deux de justesse l'adhésion à l'UE, bien que la Norvège participe au marché unique européen via un accord distinct, l'Espace économique européen.|1972年と1994年の国民投票はいずれも僅差でEU加盟を否決した。もっともノルウェーは、欧州経済領域(EEA)という別の協定を通じてEUの単一市場には参加している。",
  ),
  // ---------------------------------------------------------------------
  // 地理・自然・現代の暮らし(難易度4〜6)
  // ---------------------------------------------------------------------
  q(
    4,
    "Despite stretching almost as far east as Istanbul, how many time zones does mainland Norway use?|A pesar de extenderse casi tan al este como Estambul, ¿cuántas zonas horarias usa la Noruega continental?|Bien qu'elle s'étende presque aussi loin à l'est qu'Istanbul, combien de fuseaux horaires utilise la Norvège continentale ?|イスタンブールに匹敵するほど東まで国土が伸びているのに、ノルウェー本土が使う標準時は何種類か?",
    [
      "Just one (CET)|Solo uno (CET)|Un seul (CET)|1つだけ(中央ヨーロッパ時間)",
      "Two|Dos|Deux|2つ",
      "Three|Tres|Trois|3つ",
    ],
    0,
    "Kirkenes, in Norway's far northeast, lies further east in longitude than Istanbul or even Cairo, yet the whole country keeps a single official time, Central European Time, for administrative simplicity.|Kirkenes, en el extremo noreste de Noruega, está más al este en longitud que Estambul o incluso El Cairo, y sin embargo todo el país mantiene una única hora oficial, la hora centroeuropea, por sencillez administrativa.|Kirkenes, à l'extrême nord-est de la Norvège, se trouve plus à l'est en longitude qu'Istanbul, voire que Le Caire, et pourtant tout le pays garde une heure officielle unique, l'heure d'Europe centrale, par souci de simplicité administrative.|ノルウェー北東の果てにあるシルケネスは、経度で言えばイスタンブールやカイロよりも東に位置する。それでもこの国全体は、行政上の簡便さのために中央ヨーロッパ時間という単一の公式時刻を保っている。",
  ),
  q(
    4,
    "What does the name 'Norway' originally mean?|¿Qué significa originalmente el nombre 'Noruega'?|Que signifie à l'origine le nom 'Norvège' ?|「ノルウェー」という国名は、もともとどのような意味か?",
    [
      "The way (or road) north|El camino (o vía) hacia el norte|La voie (ou route) du nord|北への道",
      "The land of fjords|La tierra de los fiordos|Le pays des fjords|フィヨルドの国",
      "The cold country|El país frío|Le pays froid|寒い国",
    ],
    0,
    "It comes from Old Norse Norðrvegr, 'the way north', likely referring to the coastal sailing route hugging the shore that Viking-age sailors used to travel northward along the coast.|Proviene del nórdico antiguo Norðrvegr, «el camino hacia el norte», probablemente en referencia a la ruta de navegación costera que los marinos de la era vikinga usaban para viajar hacia el norte pegados a la orilla.|Il vient du vieux norrois Norðrvegr, « la voie du nord », désignant probablement la route de navigation côtière que les marins de l'époque viking empruntaient pour remonter la côte vers le nord.|これは古ノルド語の Norðrvegr(「北への道」)に由来し、おそらくヴァイキング時代の船乗りが海岸沿いに北へ進んだ航路を指していたと考えられている。",
  ),
  q(
    4,
    "Approximately how many people live in Norway?|¿Cuántos habitantes tiene Noruega aproximadamente?|Combien d'habitants compte approximativement la Norvège ?|ノルウェーの人口はおよそ何人か?",
    [
      "About 5.5 million|Unos 5,5 millones|Environ 5,5 millions|およそ550万人",
      "About 15 million|Unos 15 millones|Environ 15 millions|およそ1500万人",
      "About 2 million|Unos 2 millones|Environ 2 millions|およそ200万人",
    ],
    0,
    "Norway is one of Europe's most sparsely populated countries for its size, with roughly 15 people per square kilometre on average, though the population is heavily concentrated around Oslo and the southern coast.|Noruega es uno de los países europeos con menor densidad de población en relación con su tamaño, con una media de unos 15 habitantes por kilómetro cuadrado, aunque la población se concentra mucho en torno a Oslo y la costa sur.|La Norvège est l'un des pays les moins densément peuplés d'Europe pour sa taille, avec en moyenne environ 15 habitants au kilomètre carré, bien que la population soit fortement concentrée autour d'Oslo et de la côte sud.|ノルウェーは国土の広さの割に、ヨーロッパでも屈指の人口密度の低い国で、平均するとおよそ1平方kmあたり15人ほどしかいない。もっとも人口はオスロ周辺と南岸に大きく偏っている。",
  ),
  q(
    5,
    "Roughly what share of Norway's electricity is generated by hydropower?|¿Qué proporción, aproximadamente, de la electricidad de Noruega se genera con energía hidroeléctrica?|Quelle proportion, environ, de l'électricité norvégienne est produite par l'hydroélectricité ?|ノルウェーの電力のうち、水力発電が占める割合はおよそどれくらいか?",
    [
      "Over 90 percent|Más del 90 por ciento|Plus de 90 pour cent|9割以上",
      "About 40 percent|Un 40 por ciento|Environ 40 pour cent|4割ほど",
      "About 10 percent|Un 10 por ciento|Environ 10 pour cent|1割ほど",
    ],
    0,
    "Norway's steep terrain and heavy rainfall make it ideally suited to hydroelectric dams, and the country has relied on falling water for the great majority of its power since well before the oil era began.|El terreno escarpado y las abundantes lluvias de Noruega la hacen idónea para las presas hidroeléctricas, y el país ha dependido del agua que cae para la gran mayoría de su energía desde mucho antes de que comenzara la era del petróleo.|Le relief accidenté et les fortes précipitations de la Norvège en font un terrain idéal pour les barrages hydroélectriques, et le pays dépend de l'eau qui tombe pour l'immense majorité de son énergie depuis bien avant le début de l'ère pétrolière.|急峻な地形と多い降水量のおかげで、ノルウェーは水力ダムに最適な国土を持つ。石油の時代が始まるずっと前から、この国は電力の大半を落下する水に頼ってきた。",
  ),
  q(
    6,
    "Because of its cheap hydroelectric power, what is unusual about most of Norway's railway network compared with many other countries?|Debido a su energía hidroeléctrica barata, ¿qué tiene de inusual la mayor parte de la red ferroviaria de Noruega en comparación con muchos otros países?|En raison de son électricité hydraulique bon marché, qu'a d'inhabituel la majeure partie du réseau ferroviaire norvégien par rapport à beaucoup d'autres pays ?|安価な水力発電のおかげで、ノルウェーの鉄道網の大部分には他の多くの国と比べてどんな珍しい点があるか?",
    [
      "Almost all of it is electrified|Casi toda está electrificada|Elle est presque entièrement électrifiée|ほぼ全線が電化されている",
      "It uses a wider track gauge than any other country|Usa el ancho de vía más grande del mundo|Elle utilise le plus large écartement du monde|世界最大の軌間を使っている",
      "Trains run without any fixed timetable|Los trenes circulan sin horario fijo|Les trains circulent sans horaire fixe|列車が固定時刻表なしで走る",
    ],
    0,
    "Cheap, abundant hydropower made electrifying the network an easy economic choice for Norway decades before it became standard practice in many other countries, and diesel trains are now the exception rather than the rule.|La energía hidroeléctrica barata y abundante hizo de la electrificación de la red una decisión económica fácil para Noruega décadas antes de que se convirtiera en práctica habitual en muchos otros países, y hoy los trenes diésel son la excepción y no la norma.|L'hydroélectricité bon marché et abondante a fait de l'électrification du réseau un choix économique facile pour la Norvège des décennies avant que cela ne devienne courant dans bien d'autres pays, et les trains diesel y sont désormais l'exception plutôt que la règle.|安価で豊富な水力発電のおかげで、ノルウェーにとって鉄道網の電化は、他の多くの国で標準になるよりも何十年も早く、経済的に容易な選択だった。いまではディーゼル列車のほうが例外である。",
  ),
  q(
    5,
    "Although Norway is not in the EU, which European travel arrangement does it still belong to, meaning there are normally no passport checks at its land border with Sweden?|Aunque Noruega no pertenece a la UE, ¿a qué acuerdo europeo de viaje sigue perteneciendo, por el que normalmente no hay controles de pasaporte en su frontera terrestre con Suecia?|Bien que la Norvège ne soit pas dans l'UE, à quel accord de circulation européen appartient-elle encore, ce qui signifie qu'il n'y a normalement aucun contrôle de passeport à sa frontière terrestre avec la Suède ?|ノルウェーはEUに加盟していないが、それでも属している欧州の移動に関する枠組みは何か。これによりスウェーデンとの陸の国境で通常パスポート審査が無い。",
    [
      "The Schengen Area|El espacio Schengen|L'espace Schengen|シェンゲン圏",
      "The Eurozone|La eurozona|La zone euro|ユーロ圏",
      "The Commonwealth|La Mancomunidad de Naciones|Le Commonwealth|英連邦",
    ],
    0,
    "Norway has been part of the passport-free Schengen Area since 2001, so a train crossing from Sweden into Norway near Kongsvinger normally makes no border stop at all.|Noruega forma parte del espacio Schengen, sin controles de pasaporte, desde 2001, así que un tren que cruza de Suecia a Noruega cerca de Kongsvinger normalmente no hace ninguna parada fronteriza.|La Norvège fait partie de l'espace Schengen, sans contrôle de passeport, depuis 2001, si bien qu'un train traversant de la Suède vers la Norvège près de Kongsvinger ne marque en général aucun arrêt frontalier.|ノルウェーは2001年からパスポート審査の無いシェンゲン圏に加わっている。そのため、コングスヴィンゲル付近でスウェーデンからノルウェーへ入る列車は、通常国境での停車すら無い。",
  ),
  q(
    4,
    "What seabird, with a colourful beak, nests in large cliffside colonies on Norway's coast, notably on the island of Runde?|¿Qué ave marina, de pico colorido, anida en grandes colonias en los acantilados de la costa de Noruega, en particular en la isla de Runde?|Quel oiseau marin au bec coloré niche en grandes colonies sur les falaises de la côte norvégienne, notamment sur l'île de Runde ?|くちばしが色鮮やかで、ノルウェー沿岸の断崖に大きな営巣地を作る海鳥は何か。とくにルンデ島で知られる。",
    [
      "The puffin|El frailecillo|Le macareux|パフィン(ニシツノメドリ)",
      "The penguin|El pingüino|Le manchot|ペンギン",
      "The flamingo|El flamenco|Le flamant|フラミンゴ",
    ],
    0,
    "Puffins spend most of the year at sea and only come ashore to breed, and Norway's cliffside colonies, though still large, have shrunk considerably in recent decades as fish stocks the chicks depend on have shifted.|Los frailecillos pasan la mayor parte del año en el mar y solo llegan a tierra para criar, y las colonias en los acantilados de Noruega, aunque todavía numerosas, se han reducido bastante en las últimas décadas a medida que cambiaban las poblaciones de peces de las que dependen los polluelos.|Les macareux passent la majeure partie de l'année en mer et ne viennent à terre que pour nicher, et les colonies des falaises norvégiennes, bien qu'encore importantes, ont nettement diminué ces dernières décennies à mesure que les stocks de poissons dont dépendent les poussins se sont déplacés.|パフィンは一年の大半を海上で過ごし、繁殖のときだけ陸に上がる。ノルウェーの断崖の営巣地はいまも大規模だが、雛が頼る魚の資源が移り変わるにつれ、近年はかなり縮小している。",
  ),
  q(
    5,
    "What is 'brunost', a distinctively Norwegian food invented in the nineteenth century?|¿Qué es el 'brunost', un alimento típicamente noruego inventado en el siglo XIX?|Qu'est-ce que le 'brunost', un aliment typiquement norvégien inventé au XIXe siècle ?|19世紀に生まれたノルウェー独特の食品「ブルーノスト」とは何か?",
    [
      "A caramel-brown whey cheese|Un queso de suero de color caramelo|Un fromage de lactosérum brun caramel|カラメル色をしたホエー(乳清)チーズ",
      "A type of dried fish|Un tipo de pescado seco|Un type de poisson séché|干し魚の一種",
      "A spiced Christmas bread|Un pan de Navidad especiado|Un pain de Noël épicé|香辛料入りのクリスマスパン",
    ],
    0,
    "Brunost is made by boiling down whey, a byproduct of cheesemaking, until its milk sugars caramelise, and it is traditionally sliced thin with a special cheese plane rather than cut with a knife.|El brunost se hace hirviendo el suero, un subproducto de la fabricación de queso, hasta que sus azúcares de la leche se caramelizan, y tradicionalmente se corta fino con una cuchilla especial en lugar de con un cuchillo.|Le brunost se fabrique en faisant réduire le lactosérum, un sous-produit de la fabrication du fromage, jusqu'à ce que ses sucres de lait caramélisent, et se tranche traditionnellement fin à l'aide d'un rabot à fromage plutôt qu'au couteau.|ブルーノストは、チーズ作りの副産物であるホエーを煮詰めて乳糖をカラメル化させて作る。伝統的にはナイフではなく専用のチーズ削り器で薄く削って食べる。",
  ),
  q(
    5,
    "What is 'lutefisk', a traditional Norwegian dish especially eaten around Christmas?|¿Qué es el 'lutefisk', un plato tradicional noruego que se come sobre todo en Navidad?|Qu'est-ce que le 'lutefisk', un plat traditionnel norvégien surtout consommé autour de Noël ?|クリスマスの頃によく食べられる、ノルウェーの伝統料理「ルーテフィスク」とは何か?",
    [
      "Dried whitefish reconstituted in a lye solution|Pescado blanco seco rehidratado en una solución de lejía|Du poisson blanc séché réhydraté dans une solution de lessive|干した白身魚を灰汁(苛性ソーダ液)で戻したもの",
      "A sweet almond pudding|Un pudín dulce de almendras|Un pudding sucré aux amandes|甘いアーモンドプディング",
      "A smoked reindeer sausage|Un embutido ahumado de reno|Une saucisse fumée de renne|燻製のトナカイソーセージ",
    ],
    0,
    "The dried fish, usually cod, is soaked first in cold water and then in a lye solution that turns it gelatinous, before days of rinsing remove the causticity — a preservation method that predates refrigeration by centuries.|El pescado seco, normalmente bacalao, se remoja primero en agua fría y luego en una solución de lejía que lo vuelve gelatinoso, tras lo cual días de aclarado eliminan la causticidad: un método de conservación anterior en siglos a la refrigeración.|Le poisson séché, généralement de la morue, est d'abord trempé dans l'eau froide puis dans une solution de lessive qui le rend gélatineux, avant que des jours de rinçage n'en retirent la causticité — une méthode de conservation antérieure de plusieurs siècles à la réfrigération.|干した魚(たいてい鱈)は、まず冷水に浸したのち灰汁の液に浸してゼラチン状にし、その後何日もかけて洗い流して苛性を抜く。冷蔵技術より何世紀も前からある保存法である。",
  ),
  q(
    6,
    "Until a formal separation in 2012, what was the Church of Norway?|Hasta una separación formal en 2012, ¿qué era la Iglesia de Noruega?|Jusqu'à une séparation formelle en 2012, qu'était l'Église de Norvège ?|2012年に正式な政教分離が行われるまで、ノルウェー教会はどのような存在だったか?",
    [
      "The official state church|La iglesia oficial del Estado|L'Église officielle de l'État|国教会",
      "A banned religion|Una religión prohibida|Une religion interdite|禁じられた宗教",
      "A private club open only to the royal family|Un club privado abierto solo a la familia real|Un club privé réservé à la famille royale|王族限定の私的なクラブ",
    ],
    0,
    "The Evangelical Lutheran Church of Norway was constitutionally established as the state religion until reforms in 2012 and 2017 gave it formal independence, though a large majority of Norwegians remain nominally registered members.|La Iglesia Evangélica Luterana de Noruega fue la religión de Estado establecida constitucionalmente hasta que las reformas de 2012 y 2017 le dieron independencia formal, aunque una gran mayoría de noruegos sigue registrada nominalmente como miembro.|L'Église évangélique luthérienne de Norvège fut constitutionnellement établie comme religion d'État jusqu'à ce que des réformes en 2012 et 2017 lui donnent une indépendance formelle, bien qu'une grande majorité de Norvégiens restent nominalement inscrits comme membres.|ノルウェー福音ルーテル教会は、2012年と2017年の改革で正式に独立するまで、憲法上の国教として定められていた。もっとも今もノルウェー人の大多数が名目上の教会員として登録されたままである。",
  ),
  q(
    5,
    "What is stored in the Svalbard Global Seed Vault, built into a mountainside in the Norwegian Arctic?|¿Qué se guarda en la Bóveda Global de Semillas de Svalbard, construida en la ladera de una montaña del Ártico noruego?|Que conserve-t-on dans la réserve mondiale de semences du Svalbard, aménagée dans le flanc d'une montagne de l'Arctique norvégien ?|ノルウェー領北極圏の山腹に築かれたスヴァールバル世界種子貯蔵庫には何が保管されているか?",
    [
      "Backup samples of the world's crop seeds|Muestras de respaldo de las semillas de cultivo del mundo|Des échantillons de secours des semences agricoles du monde|世界の作物の種子のバックアップ標本",
      "Gold reserves from several countries|Reservas de oro de varios países|Des réserves d'or de plusieurs pays|複数の国の金準備",
      "Historical Viking artefacts|Objetos históricos vikingos|Des objets historiques vikings|歴史的なヴァイキングの遺物",
    ],
    0,
    "Opened in 2008 deep inside a mountain on Svalbard, the vault holds duplicate seed samples from gene banks around the world as insurance against war, disaster or simple mismanagement wiping out crop diversity elsewhere.|Inaugurada en 2008 en las profundidades de una montaña de Svalbard, la bóveda guarda muestras duplicadas de semillas de bancos genéticos de todo el mundo como seguro ante guerras, desastres o una simple mala gestión que borre la diversidad de cultivos en otros lugares.|Ouverte en 2008 au cœur d'une montagne du Svalbard, la chambre forte conserve des échantillons de semences en double provenant de banques génétiques du monde entier, en assurance contre la guerre, la catastrophe ou une simple mauvaise gestion qui effacerait la diversité des cultures ailleurs.|2008年、スヴァールバル諸島の山の奥深くに開設されたこの貯蔵庫には、世界各地の遺伝子バンクから集めた種子の複製標本が保管されている。戦争や災害、単なる管理の失敗によって他の場所で作物の多様性が失われた際の保険である。",
  ),
  q(
    6,
    "In Norway, the right to herd reindeer for a living is, with few exceptions, legally reserved for which group?|En Noruega, el derecho a criar renos como forma de vida está reservado por ley, salvo pocas excepciones, ¿a qué grupo?|En Norvège, le droit d'élever des rennes pour en vivre est, à de rares exceptions près, légalement réservé à quel groupe ?|ノルウェーで、生業としてトナカイを放牧する権利は、わずかな例外を除き法律上どの集団に限られているか?",
    [
      "The Sámi people|El pueblo sami|Le peuple sami|サーミの人々",
      "Licensed farmers of any background|Agricultores con licencia de cualquier origen|Les agriculteurs autorisés, quelle que soit leur origine|出身を問わず免許を持つ農家",
      "The Norwegian army|El ejército noruego|L'armée norvégienne|ノルウェー軍",
    ],
    0,
    "Reindeer husbandry as a livelihood is legally protected as a Sámi cultural right in Norway, tied to membership in officially recognised herding districts rather than open to the general population.|La cría de renos como forma de vida está legalmente protegida como derecho cultural sami en Noruega, ligada a la pertenencia a distritos de pastoreo reconocidos oficialmente y no abierta a la población en general.|L'élevage du renne comme moyen de subsistance est légalement protégé en Norvège comme un droit culturel sami, lié à l'appartenance à des districts d'élevage officiellement reconnus plutôt qu'ouvert à la population générale.|生業としてのトナカイ放牧は、ノルウェーではサーミの文化的権利として法律で保護されており、一般に開かれたものではなく、公式に認められた放牧区への所属と結びついている。",
  ),
  q(
    4,
    "What is a 'bunad', commonly worn by Norwegians on Constitution Day and other special occasions?|¿Qué es un 'bunad', que los noruegos suelen llevar el Día de la Constitución y otras ocasiones especiales?|Qu'est-ce qu'un 'bunad', que les Norvégiens portent souvent le jour de la Constitution et lors d'autres occasions spéciales ?|憲法記念日などの特別な機会にノルウェー人がよく着る「ブーナッド」とは何か?",
    [
      "A regional folk costume|Un traje folclórico regional|Un costume folklorique régional|地方ごとの民族衣装",
      "A ceremonial sword|Una espada ceremonial|Une épée cérémonielle|儀式用の剣",
      "A type of wooden clog|Un tipo de zueco de madera|Un type de sabot en bois|木製の靴の一種",
    ],
    0,
    "Each region of Norway has its own bunad pattern, embroidered and accessorised differently, and a full handmade set can take hundreds of hours to produce and cost as much as a car.|Cada región de Noruega tiene su propio patrón de bunad, con bordados y complementos distintos, y un conjunto completo hecho a mano puede llevar cientos de horas de trabajo y costar tanto como un coche.|Chaque région de Norvège a son propre motif de bunad, brodé et accessoirisé différemment, et un ensemble complet fait main peut demander des centaines d'heures de travail et coûter aussi cher qu'une voiture.|ノルウェーの地方ごとに独自のブーナッドの柄があり、刺繍や装飾品もそれぞれ異なる。手作りの一式を仕上げるには何百時間もかかることがあり、値段は車一台分にもなりうる。",
  ),
  q(
    5,
    "Roughly how long is Norway from its southern tip to its northernmost point?|¿Cuánto mide Noruega, aproximadamente, desde su extremo sur hasta su punto más septentrional?|Quelle est, environ, la longueur de la Norvège entre sa pointe sud et son point le plus septentrional ?|ノルウェーは南端から最北端までおよそどれくらいの長さか?",
    [
      "About 1,750 km|Unos 1.750 km|Environ 1 750 km|およそ1750km",
      "About 600 km|Unos 600 km|Environ 600 km|およそ600km",
      "About 3,500 km|Unos 3.500 km|Environ 3 500 km|およそ3500km",
    ],
    0,
    "That distance is roughly the same as the straight-line distance from Oslo to Rome, all contained within a single country whose width is, in places, barely a few kilometres.|Esa distancia es más o menos la misma que hay en línea recta de Oslo a Roma, toda ella contenida en un único país que, en algunos puntos, apenas mide unos kilómetros de ancho.|Cette distance équivaut à peu près à la distance à vol d'oiseau entre Oslo et Rome, le tout contenu dans un seul pays dont la largeur, par endroits, atteint à peine quelques kilomètres.|この距離は、オスロからローマまでの直線距離とほぼ同じである。それがすべて、場所によってはわずか数kmしかない幅の一つの国に収まっている。",
  ),
  q(
    5,
    "Norway is the world's largest producer of which farmed fish?|¿De qué pez de crianza es Noruega el mayor productor del mundo?|La Norvège est le plus grand producteur mondial de quel poisson d'élevage ?|ノルウェーが養殖生産量で世界最大を誇る魚は何か?",
    [
      "Atlantic salmon|Salmón atlántico|Saumon atlantique|大西洋サーモン",
      "Tuna|Atún|Thon|マグロ",
      "Tilapia|Tilapia|Tilapia|ティラピア",
    ],
    0,
    "Salmon farming in sheltered fjord waters grew from small experimental pens in the 1970s into one of Norway's largest export industries, now rivalling oil and gas in some coastal counties' economies.|La cría de salmón en las aguas resguardadas de los fiordos pasó de pequeños corrales experimentales en los años setenta a convertirse en una de las mayores industrias de exportación de Noruega, hoy rival del petróleo y el gas en la economía de algunos condados costeros.|L'élevage du saumon dans les eaux abritées des fjords, parti de petits enclos expérimentaux dans les années 1970, est devenu l'une des plus grandes industries d'exportation de la Norvège, rivalisant aujourd'hui avec le pétrole et le gaz dans l'économie de certains comtés côtiers.|フィヨルドの穏やかな水域でのサケ養殖は、1970年代の小さな試験用の生け簀から、ノルウェー最大級の輸出産業へと成長した。いまや一部の沿岸県の経済では石油・ガスに匹敵する。",
  ),
  q(
    5,
    "What is unusual about the roof of the Oslo Opera House, opened in 2008?|¿Qué tiene de inusual el tejado de la Ópera de Oslo, inaugurada en 2008?|Qu'a d'inhabituel le toit de l'Opéra d'Oslo, inauguré en 2008 ?|2008年に開館したオスロ・オペラハウスの屋根には、どんな珍しい点があるか?",
    [
      "Visitors can walk up it to the top|Los visitantes pueden subir caminando hasta arriba|Les visiteurs peuvent y marcher jusqu'au sommet|来場者が歩いて頂上まで登れる",
      "It is made entirely of glass|Está hecho enteramente de cristal|Il est entièrement en verre|全面ガラス張りになっている",
      "It doubles as a working ski jump|Sirve también de trampolín de salto de esquí en funcionamiento|Il sert aussi de tremplin de saut à ski en service|現役のスキージャンプ台を兼ねている",
    ],
    0,
    "The white marble and granite roof slopes gently from the water's edge up to its peak, and has become one of Oslo's most popular public spaces simply for standing on, especially for watching the sunset over the fjord.|El tejado de mármol blanco y granito desciende suavemente desde el borde del agua hasta su cima, y se ha convertido en uno de los espacios públicos más populares de Oslo, sencillamente para pasear por él, sobre todo para ver la puesta de sol sobre el fiordo.|Le toit de marbre blanc et de granit descend en pente douce depuis le bord de l'eau jusqu'à son sommet, et est devenu l'un des espaces publics les plus prisés d'Oslo, simplement pour s'y tenir, notamment pour regarder le coucher de soleil sur le fjord.|白い大理石と花崗岩でできた屋根は水際からなだらかに頂上まで傾斜しており、そこに立つだけでオスロでも屈指の人気の公共空間になっている。特にフィヨルドに沈む夕日を眺めるのに人気がある。",
  ),
  q(
    5,
    "On the United Nations' Human Development Index, how does Norway typically rank among the world's countries?|En el Índice de Desarrollo Humano de la ONU, ¿cómo suele situarse Noruega entre los países del mundo?|Dans l'Indice de développement humain de l'ONU, où se classe généralement la Norvège parmi les pays du monde ?|国連の人間開発指数で、ノルウェーは世界の国々の中でどのあたりに位置することが多いか?",
    [
      "At or near the very top|En el primer puesto o muy cerca|Au premier rang ou tout près|世界のトップ、またはそれに近い順位",
      "In the middle of the pack|En la mitad de la tabla|Au milieu du classement|中位あたり",
      "In the bottom third|En el tercio inferior|Dans le dernier tiers|下位3分の1",
    ],
    0,
    "Norway has ranked first or very close to first on the index, which combines income, education and life expectancy, in most years since the ranking's modern form began, largely on the strength of its oil-funded welfare spending.|Noruega ha ocupado el primer puesto o muy cerca de él en este índice, que combina renta, educación y esperanza de vida, en la mayoría de los años desde que el ranking adoptó su forma moderna, en gran medida gracias al gasto social financiado con el petróleo.|La Norvège s'est classée première ou tout près de la première place de cet indice, qui combine revenu, éducation et espérance de vie, la plupart des années depuis que le classement a pris sa forme moderne, en grande partie grâce à ses dépenses sociales financées par le pétrole.|所得・教育・平均寿命を組み合わせるこの指数で、ノルウェーは現行の形の指標になって以来、ほとんどの年で1位かそれに極めて近い順位にある。その多くは石油収入に支えられた社会保障支出のおかげである。",
  ),
  q(
    6,
    "Although historically neutral, what military alliance did Norway join as a founding member in 1949, shortly after its wartime experience of occupation?|Aunque históricamente neutral, ¿a qué alianza militar se unió Noruega como miembro fundador en 1949, poco después de su experiencia bélica de ocupación?|Bien qu'historiquement neutre, quelle alliance militaire la Norvège rejoignit-elle comme membre fondateur en 1949, peu après son expérience de l'occupation ?|歴史的には中立だったにもかかわらず、占領を経験した直後の1949年にノルウェーが原加盟国として加わった軍事同盟は何か?",
    [
      "NATO|La OTAN|L'OTAN|NATO(北大西洋条約機構)",
      "The Warsaw Pact|El Pacto de Varsovia|Le Pacte de Varsovie|ワルシャワ条約機構",
      "The European Union|La Unión Europea|L'Union européenne|欧州連合",
    ],
    0,
    "Norway had stayed neutral through the First World War, but the shock of the German invasion and occupation in 1940 convinced it to abandon neutrality for good and become one of NATO's twelve founding members.|Noruega se había mantenido neutral durante la Primera Guerra Mundial, pero el impacto de la invasión y ocupación alemanas de 1940 la convenció de abandonar la neutralidad para siempre y convertirse en uno de los doce miembros fundadores de la OTAN.|La Norvège était restée neutre pendant la Première Guerre mondiale, mais le choc de l'invasion et de l'occupation allemandes de 1940 la convainquit d'abandonner la neutralité pour de bon et de devenir l'un des douze membres fondateurs de l'OTAN.|ノルウェーは第一次大戦を通じて中立を保っていたが、1940年のドイツによる侵攻と占領の衝撃が、中立を完全に捨てさせ、NATOの原加盟12か国の一つになる決断につながった。",
  ),
  q(
    5,
    "What is Sognefjord, Norway's longest fjord at 205 kilometres?|¿Qué es el Sognefjord, el fiordo más largo de Noruega, con 205 kilómetros?|Qu'est-ce que le Sognefjord, le plus long fjord de Norvège avec 205 kilomètres ?|全長205kmでノルウェー最長のフィヨルドであるソグネフィヨルドとは何か?",
    [
      "The world's second-longest fjord|El segundo fiordo más largo del mundo|Le deuxième plus long fjord du monde|世界で2番目に長いフィヨルド",
      "The world's deepest lake|El lago más profundo del mundo|Le lac le plus profond du monde|世界で最も深い湖",
      "The world's widest river delta|El delta fluvial más ancho del mundo|Le plus large delta fluvial du monde|世界で最も幅の広い河口デルタ",
    ],
    0,
    "Sognefjord reaches depths of over 1,300 metres, and several of the branch fjords and towns explored earlier on this board — including Flåm and the Myrdal to Voss stretch of railway — sit along or above it.|El Sognefjord alcanza profundidades de más de 1.300 metros, y varios de los brazos y pueblos ya vistos en este tablero —incluidos Flåm y el tramo de ferrocarril entre Myrdal y Voss— se encuentran junto a él o por encima.|Le Sognefjord atteint des profondeurs de plus de 1 300 mètres, et plusieurs des bras et des villes déjà vus sur ce plateau — dont Flåm et le tronçon de chemin de fer entre Myrdal et Voss — se trouvent le long de lui ou au-dessus.|ソグネフィヨルドは深さ1300mを超える。この盤面に既に登場したフロムや、ミルダル—ヴォス間の鉄道といった枝分かれしたフィヨルドや町々の多くは、この本流の脇や上に位置している。",
  ),
  q(
    6,
    "What is Galdhøpiggen, at 2,469 metres above sea level?|¿Qué es el Galdhøpiggen, a 2.469 metros sobre el nivel del mar?|Qu'est-ce que le Galdhøpiggen, culminant à 2 469 mètres d'altitude ?|標高2,469mのガルフーピゲンとは何か?",
    [
      "The tallest mountain in Norway and all of Northern Europe|La montaña más alta de Noruega y de toda el norte de Europa|La montagne la plus haute de Norvège et de toute l'Europe du Nord|ノルウェーおよび北ヨーロッパ全体で最も高い山",
      "The tallest building in Norway|El edificio más alto de Noruega|Le plus haut bâtiment de Norvège|ノルウェーで最も高い建物",
      "An extinct volcano|Un volcán extinto|Un volcan éteint|死火山",
    ],
    0,
    "Galdhøpiggen sits in the Jotunheimen range, whose Old Norse-derived name means roughly 'home of the giants', and it is popular enough with hikers that a marked summer route crosses a glacier on the way to the top.|Galdhøpiggen se alza en la cordillera de Jotunheimen, cuyo nombre, de origen nórdico antiguo, significa aproximadamente «hogar de los gigantes», y es tan popular entre los senderistas que una ruta señalizada de verano cruza un glaciar de camino a la cima.|Galdhøpiggen se dresse dans le massif du Jotunheimen, dont le nom d'origine vieux norrois signifie à peu près « demeure des géants », et il est assez prisé des randonneurs pour qu'un itinéraire d'été balisé traverse un glacier en route vers le sommet.|ガルフーピゲンはヨトゥンヘイメン山群にある。古ノルド語に由来するその名はおおよそ「巨人の住処」を意味する。登山者に人気があり、夏の間は氷河を横切る標識付きのルートが頂上まで通じている。",
  ),
  q(
    6,
    "What is Hardangervidda, crossed by the Bergensbanen railway at its highest stretch?|¿Qué es el Hardangervidda, que la línea Bergensbanen cruza en su tramo más alto?|Qu'est-ce que le Hardangervidda, traversé par la Bergensbanen sur son tronçon le plus élevé ?|ベルゲン線が最高地点で横切るハルダンゲルヴィッダとは何か?",
    [
      "The largest mountain plateau in Europe|La meseta de montaña más grande de Europa|Le plus grand plateau de montagne d'Europe|ヨーロッパ最大の山岳高原",
      "Norway's largest lake|El lago más grande de Noruega|Le plus grand lac de Norvège|ノルウェー最大の湖",
      "A protected coral reef|Un arrecife de coral protegido|Un récif corallien protégé|保護されたサンゴ礁",
    ],
    0,
    "The plateau covers roughly 8,000 square kilometres of open, largely treeless high ground, home to Europe's largest remaining herd of wild reindeer.|La meseta cubre unos 8.000 kilómetros cuadrados de terreno alto, abierto y en gran parte sin árboles, hogar de la mayor manada de renos salvajes que queda en Europa.|Le plateau couvre environ 8 000 kilomètres carrés de hautes terres ouvertes et largement dépourvues d'arbres, abritant le plus grand troupeau de rennes sauvages subsistant en Europe.|この高原はおよそ8,000平方kmに及ぶ、木のほとんど生えない開けた高地で、ヨーロッパに残る野生トナカイの群れとしては最大のものが暮らしている。",
  ),
  // ---------------------------------------------------------------------
  // 踏み込んだ知識(難易度7〜8)
  // ---------------------------------------------------------------------
  q(
    7,
    "In what year was the University of Oslo, Norway's oldest university, founded?|¿En qué año se fundó la Universidad de Oslo, la más antigua de Noruega?|En quelle année l'université d'Oslo, la plus ancienne de Norvège, fut-elle fondée ?|ノルウェー最古の大学であるオスロ大学が創設されたのは何年か?",
    [
      "1811|1811|1811|1811年",
      "1650|1650|1650|1650年",
      "1905|1905|1905|1905年",
    ],
    0,
    "It was founded as the Royal Frederick University while Norway was still under Danish rule, named for the reigning king, and only took its current name after Norway's monarchy changed following 1905.|Se fundó como Universidad Real Federico mientras Noruega seguía bajo dominio danés, en honor al rey reinante, y solo tomó su nombre actual tras el cambio de monarquía de Noruega después de 1905.|Elle fut fondée sous le nom d'Université royale Frédéric, alors que la Norvège était encore sous domination danoise, en l'honneur du roi régnant, et ne prit son nom actuel qu'après le changement de monarchie norvégienne consécutif à 1905.|この大学は、ノルウェーがまだデンマークの支配下にあった時代に、当時の王にちなんで「王立フレゼリク大学」として創設された。現在の名称になったのは、1905年以降にノルウェーの君主制が変わってからのことである。",
  ),
  q(
    8,
    "Norway's 1814 constitution is often cited as which of the following?|La constitución noruega de 1814 suele citarse como, ¿cuál de las siguientes?|La constitution norvégienne de 1814 est souvent citée comme laquelle des propositions suivantes ?|ノルウェーの1814年憲法は、しばしば次のどれとして挙げられるか?",
    [
      "The world's second-oldest single-document national constitution still in force|La segunda constitución nacional escrita más antigua del mundo aún vigente|La deuxième plus ancienne constitution nationale écrite encore en vigueur au monde|今も効力を持つ単一文書の成文憲法として世界で2番目に古いもの",
      "The first constitution to grant women the vote|La primera constitución en conceder el voto a las mujeres|La première constitution à accorder le droit de vote aux femmes|女性参政権を認めた最初の憲法",
      "The only constitution in Europe written entirely in Latin|La única constitución de Europa escrita íntegramente en latín|La seule constitution d'Europe rédigée entièrement en latin|全文がラテン語で書かれた欧州で唯一の憲法",
    ],
    0,
    "Only the United States constitution of 1789 is generally reckoned older among still-active single-document national constitutions, though comparisons like this depend on exactly how 'constitution' and 'still in force' are defined.|Solo la constitución de Estados Unidos de 1789 se suele considerar más antigua entre las constituciones nacionales de documento único todavía vigentes, aunque comparaciones así dependen de cómo se definan exactamente «constitución» y «vigente».|Seule la constitution des États-Unis de 1789 est généralement considérée comme plus ancienne parmi les constitutions nationales à document unique encore en vigueur, bien que ce genre de comparaison dépende de la façon exacte dont on définit « constitution » et « en vigueur ».|今も効力を持つ単一文書の成文憲法の中で、これより古いとされるのは一般に1789年の米国憲法だけである。もっともこうした比較は「憲法」や「現行」をどう定義するかによって変わる。",
  ),
  q(
    7,
    "Besides being first to the South Pole, what other polar first is Roald Amundsen credited with?|Además de ser el primero en llegar al Polo Sur, ¿qué otro hito polar se le atribuye a Roald Amundsen?|Outre avoir été le premier au pôle Sud, quelle autre première polaire est attribuée à Roald Amundsen ?|南極点への到達以外に、ロアール・アムンセンが成し遂げたとされるもう一つの極地における「初」は何か?",
    [
      "First to sail through the Northwest Passage|Primero en navegar el Paso del Noroeste|Premier à naviguer le passage du Nord-Ouest|北西航路を初めて航海した",
      "First to fly over the North Pole|Primero en sobrevolar el Polo Norte|Premier à survoler le pôle Nord|北極点上空を初めて飛行した",
      "First to climb Mount Everest|Primero en escalar el Everest|Premier à gravir l'Everest|エベレストに初めて登頂した",
    ],
    0,
    "Amundsen's ship Gjøa completed the long-sought sea route through the Canadian Arctic between 1903 and 1906, a passage explorers had tried and failed to find for nearly four centuries.|El barco de Amundsen, el Gjøa, completó entre 1903 y 1906 la largamente buscada ruta marítima por el Ártico canadiense, un paso que los exploradores habían intentado encontrar sin éxito durante casi cuatro siglos.|Le navire d'Amundsen, le Gjøa, acheva entre 1903 et 1906 la route maritime longtemps recherchée à travers l'Arctique canadien, un passage que les explorateurs avaient tenté de trouver en vain pendant près de quatre siècles.|アムンセンの船ヨーア号は1903年から1906年にかけて、カナダ北極海を通る、長らく探し求められていた航路を初めて踏破した。探検家たちが四百年近く探しては見つけられずにいた航路である。",
  ),
  q(
    7,
    "Which Norwegian explorer and diplomat won the Nobel Peace Prize in 1922 for his work helping refugees after the First World War?|¿Qué explorador y diplomático noruego ganó el Premio Nobel de la Paz en 1922 por su labor de ayuda a los refugiados tras la Primera Guerra Mundial?|Quel explorateur et diplomate norvégien remporta le prix Nobel de la paix en 1922 pour son travail d'aide aux réfugiés après la Première Guerre mondiale ?|第一次大戦後の難民支援によって1922年にノーベル平和賞を受けたノルウェーの探検家・外交官は誰か?",
    [
      "Fridtjof Nansen|Fridtjof Nansen|Fridtjof Nansen|フリチョフ・ナンセン",
      "Roald Amundsen|Roald Amundsen|Roald Amundsen|ロアール・アムンセン",
      "Trygve Lie|Trygve Lie|Trygve Lie|トリグブ・リー",
    ],
    0,
    "Nansen created the 'Nansen passport', an internationally recognised travel document for stateless refugees, which by the 1930s had been issued to hundreds of thousands of people with no state willing to claim them.|Nansen creó el «pasaporte Nansen», un documento de viaje reconocido internacionalmente para refugiados apátridas, que en los años treinta se había expedido a cientos de miles de personas a las que ningún Estado quería reclamar.|Nansen créa le « passeport Nansen », un document de voyage reconnu internationalement pour les réfugiés apatrides, qui, dans les années 1930, avait été délivré à des centaines de milliers de personnes qu'aucun État ne voulait reconnaître comme siennes.|ナンセンは「ナンセン旅券」を創設した。無国籍の難民のための国際的に認められた渡航文書で、1930年代までにはどの国も引き取ろうとしない数十万人に発行されていた。",
  ),
  q(
    7,
    "In 1947, Norwegian adventurer Thor Heyerdahl sailed a balsa-wood raft across the Pacific to test a theory about the settlement of which islands?|En 1947, el aventurero noruego Thor Heyerdahl navegó una balsa de madera de balsa por el Pacífico para poner a prueba una teoría sobre el poblamiento de qué islas?|En 1947, l'aventurier norvégien Thor Heyerdahl traversa le Pacifique sur un radeau de balsa pour tester une théorie sur le peuplement de quelles îles ?|1947年、ノルウェーの冒険家トール・ヘイエルダールがバルサ材の筏で太平洋を渡り、どの島々の入植について検証しようとしたか?",
    [
      "Polynesia|La Polinesia|La Polynésie|ポリネシア",
      "The Caribbean|El Caribe|Les Caraïbes|カリブ海諸島",
      "The Galápagos Islands|Las islas Galápagos|Les îles Galápagos|ガラパゴス諸島",
    ],
    0,
    "The raft, named Kon-Tiki after an Inca sun god, sailed roughly 8,000 kilometres from Peru to prove that South Americans could theoretically have settled Polynesia — a theory most geneticists and linguists today consider disproven.|La balsa, llamada Kon-Tiki en honor a un dios sol inca, navegó unos 8.000 kilómetros desde Perú para demostrar que los sudamericanos podrían, en teoría, haber poblado la Polinesia, una teoría que hoy la mayoría de genetistas y lingüistas consideran refutada.|Le radeau, nommé Kon-Tiki d'après un dieu solaire inca, parcourut environ 8 000 kilomètres depuis le Pérou pour prouver que des Sud-Américains auraient théoriquement pu peupler la Polynésie — une théorie que la plupart des généticiens et linguistes actuels jugent aujourd'hui réfutée.|インカの太陽神にちなんでコンティキ号と名付けられたこの筏は、ペルーからおよそ8,000kmを航海し、南米の人々が理論上ポリネシアに住み着くことができたと示そうとした。もっとも今日、大半の遺伝学者や言語学者はこの説を否定的に見ている。",
  ),
  q(
    7,
    "At the 1998 World Cup, Norway's national football team pulled off a famous upset by beating which footballing giant 2–1?|En el Mundial de 1998, la selección de fútbol de Noruega dio una sorpresa mayúscula al ganar 2-1 a qué gigante del fútbol?|Lors de la Coupe du monde 1998, l'équipe de Norvège créa la surprise en battant 2 à 1 quel géant du football ?|1998年のワールドカップで、ノルウェー代表がサッカーの強豪をまさかの2-1で破った相手はどこか?",
    [
      "Brazil|Brasil|Le Brésil|ブラジル",
      "Germany|Alemania|L'Allemagne|ドイツ",
      "Argentina|Argentina|L'Argentine|アルゼンチン",
    ],
    0,
    "The win sent Norway through to the knockout stage at Brazil's expense, one of the biggest shocks of that tournament and still one of the country's most celebrated results in football.|La victoria clasificó a Noruega para la fase eliminatoria a costa de Brasil, una de las mayores sorpresas de aquel torneo y aún uno de los resultados futbolísticos más celebrados del país.|La victoire qualifia la Norvège pour les phases finales aux dépens du Brésil, l'une des plus grandes surprises de ce tournoi et toujours l'un des résultats footballistiques les plus célébrés du pays.|この勝利により、ブラジルを押しのけてノルウェーが決勝トーナメントに進んだ。同大会屈指の番狂わせであり、いまもこの国のサッカー史で指折りの快挙として語り継がれている。",
  ),
  q(
    8,
    "The 'Telemark turn', a distinctive kneeling ski turn used in backcountry and ski-jumping landings, is named after which Norwegian region?|El «giro Telemark», un característico giro de esquí de rodillas usado fuera de pista y en aterrizajes de salto de esquí, ¿de qué región noruega toma su nombre?|Le « virage télémark », un virage de ski caractéristique effectué à genoux, utilisé hors-piste et pour les réceptions de saut à ski, doit son nom à quelle région norvégienne ?|バックカントリーやスキージャンプの着地で使われる、ひざを曲げた独特のターン「テレマークターン」は、ノルウェーのどの地方の名にちなむか?",
    [
      "Telemark|Telemark|Telemark|テレマルク地方",
      "Finnmark|Finnmark|Finnmark|フィンマルク地方",
      "Rogaland|Rogaland|Rogaland|ルーガラン地方",
    ],
    0,
    "Skiers from Telemark developed the technique and its distinctive free-heel binding in the nineteenth century, and it remains the only turn traditionally used to land a ski jump, giving the whole discipline its name.|Los esquiadores de Telemark desarrollaron la técnica y su característica fijación de talón libre en el siglo XIX, y sigue siendo el único giro usado tradicionalmente para aterrizar en el salto de esquí, lo que dio nombre a toda la disciplina.|Les skieurs du Telemark développèrent la technique et sa fixation à talon libre caractéristique au XIXe siècle, et elle reste le seul virage traditionnellement utilisé pour amortir un saut à ski, donnant son nom à toute la discipline appelée télémark.|テレマルク地方のスキーヤーたちが19世紀にこの技術と、かかとが固定されない独特のビンディングを生み出した。いまもスキージャンプの着地に伝統的に使われる唯一のターンであり、この競技全体の名の由来にもなっている。",
  ),
  q(
    7,
    "Edvard Grieg composed the well-known orchestral piece 'In the Hall of the Mountain King' as incidental music for which play?|Edvard Grieg compuso la conocida pieza orquestal «En la gruta del rey de la montaña» como música incidental para qué obra?|Edvard Grieg composa la célèbre pièce orchestrale « Dans l'antre du roi de la montagne » comme musique de scène pour quelle pièce ?|エドヴァルド・グリーグが劇音楽として作曲した有名な管弦楽曲『山の魔王の宮殿にて』は、どの戯曲のために書かれたか?",
    [
      "Peer Gynt, by Henrik Ibsen|Peer Gynt, de Henrik Ibsen|Peer Gynt, de Henrik Ibsen|イプセンの戯曲『ペール・ギュント』",
      "A Doll's House, by Henrik Ibsen|Casa de muñecas, de Henrik Ibsen|Une maison de poupée, de Henrik Ibsen|イプセンの戯曲『人形の家』",
      "Hamlet, by William Shakespeare|Hamlet, de William Shakespeare|Hamlet, de William Shakespeare|シェイクスピアの戯曲『ハムレット』",
    ],
    0,
    "Grieg privately found the piece he wrote for the troll king's court almost embarrassingly crude and repetitive, and was reportedly surprised at how enduringly popular it became on its own outside the play.|Grieg consideraba en privado que la pieza que escribió para la corte del rey trol era casi vergonzosamente burda y repetitiva, y al parecer le sorprendió lo popular y duradera que llegó a ser por sí sola, fuera de la obra.|Grieg trouvait en privé la pièce qu'il avait écrite pour la cour du roi troll presque gênamment fruste et répétitive, et fut, semble-t-il, surpris de la popularité durable qu'elle connut par elle-même, en dehors de la pièce.|グリーグは自分がトロルの王の宮廷のために書いたこの曲を、私的にはほとんど恥ずかしくなるほど粗野で単調だと感じていたという。戯曲を離れて単独でこれほど根強い人気を得たことに、本人も驚いたと伝えられる。",
  ),
  q(
    7,
    "Troldhaugen, the villa where composer Edvard Grieg lived and worked for over twenty years, is located near which city?|Troldhaugen, la villa donde el compositor Edvard Grieg vivió y trabajó durante más de veinte años, ¿cerca de qué ciudad se encuentra?|Troldhaugen, la villa où le compositeur Edvard Grieg vécut et travailla pendant plus de vingt ans, se trouve près de quelle ville ?|作曲家エドヴァルド・グリーグが二十年以上暮らし、仕事をした邸宅トロルハウゲンは、どの街の近くにあるか?",
    [
      "Bergen|Bergen|Bergen|ベルゲン",
      "Oslo|Oslo|Oslo|オスロ",
      "Trondheim|Trondheim|Trondheim|トロンハイム",
    ],
    0,
    "Grieg had a small composing hut built right at the water's edge below the main house, reportedly so he could work undisturbed by visitors and, he joked, by his own piano-playing wife.|Grieg mandó construir una pequeña cabaña de composición justo a la orilla del agua, bajo la casa principal, según se dice para poder trabajar sin que lo molestaran las visitas ni, bromeaba, su propia esposa al piano.|Grieg fit construire une petite cabane de composition juste au bord de l'eau, en contrebas de la maison principale, dit-on pour pouvoir travailler sans être dérangé par les visiteurs ni, plaisantait-il, par sa propre femme au piano.|グリーグは母屋の下、水際にすぐの場所に小さな作曲小屋を建てさせた。訪問客に邪魔されずに済むように、そして冗談めかして言うには、ピアノを弾く自分の妻にも邪魔されないようにするためだったという。",
  ),
  q(
    7,
    "Norway's sovereign wealth fund, built from oil revenue, is widely considered which of the following?|El fondo soberano de Noruega, construido con ingresos del petróleo, se considera ampliamente, ¿cuál de las siguientes?|Le fonds souverain de la Norvège, bâti à partir des revenus pétroliers, est largement considéré comme quoi ?|石油収入から築かれたノルウェーの政府系ファンドは、広く次のどれとみなされているか?",
    [
      "The largest sovereign wealth fund in the world|El fondo soberano más grande del mundo|Le plus grand fonds souverain du monde|世界最大の政府系ファンド",
      "The only sovereign wealth fund that invests solely inside Norway|El único fondo soberano que invierte solo dentro de Noruega|Le seul fonds souverain qui investit uniquement en Norvège|ノルウェー国内にしか投資しない唯一の政府系ファンド",
      "A fund reserved exclusively for the royal family|Un fondo reservado exclusivamente para la familia real|Un fonds réservé exclusivement à la famille royale|王室専用に留保された基金",
    ],
    0,
    "Widely known simply as the Oil Fund, it invests almost entirely outside Norway and owns, on average, roughly 1.5 percent of every publicly listed company on Earth.|Conocido simplemente como el Fondo del Petróleo, invierte casi por completo fuera de Noruega y posee, de media, en torno al 1,5 % de cada empresa cotizada en bolsa del planeta.|Connu simplement sous le nom de Fonds pétrolier, il investit presque entièrement hors de Norvège et détient, en moyenne, environ 1,5 % de chaque société cotée en bourse sur Terre.|通称「石油基金」として知られるこのファンドは、投資先のほぼすべてがノルウェー国外にあり、地球上のあらゆる上場企業の平均およそ1.5%を保有している。",
  ),
  q(
    7,
    "What was Ampere, launched in Norway in 2015?|¿Qué fue el Ampere, botado en Noruega en 2015?|Qu'était l'Ampere, mis en service en Norvège en 2015 ?|2015年にノルウェーで就航したアンペーア号とは何か?",
    [
      "The world's first all-electric car ferry|El primer ferry de coches totalmente eléctrico del mundo|Le premier ferry pour voitures entièrement électrique au monde|世界初の完全電動カーフェリー",
      "The first nuclear-powered icebreaker|El primer rompehielos de propulsión nuclear|Le premier brise-glace à propulsion nucléaire|世界初の原子力砕氷船",
      "The first solar-powered cruise ship|El primer crucero de energía solar|Le premier paquebot de croisière à énergie solaire|世界初の太陽光発電クルーズ船",
    ],
    0,
    "Ampere began crossing the Sognefjord in 2015 running purely on batteries charged from the grid, and the success of the trial pushed Norway to convert dozens more of its fjord-crossing ferries to electric or hybrid power in the years that followed.|El Ampere empezó a cruzar el Sognefjord en 2015 funcionando enteramente con baterías cargadas desde la red, y el éxito de la prueba impulsó a Noruega a convertir a energía eléctrica o híbrida decenas de sus ferris de fiordo en los años siguientes.|L'Ampere commença à traverser le Sognefjord en 2015, fonctionnant entièrement sur batteries rechargées depuis le réseau, et le succès de cet essai poussa la Norvège à convertir des dizaines d'autres de ses ferries de fjord à l'électrique ou à l'hybride dans les années qui suivirent.|アンペーア号は2015年、送電網から充電したバッテリーだけでソグネフィヨルドを渡り始めた。この試みの成功を受け、ノルウェーはその後数年でフィヨルドを渡る数十隻のフェリーを電動やハイブリッドに切り替えていった。",
  ),
  q(
    7,
    "In recent years, Norway has led the world in what automotive statistic?|En los últimos años, ¿en qué estadística automovilística ha liderado el mundo Noruega?|Ces dernières années, la Norvège a dominé le monde dans quelle statistique automobile ?|近年、ノルウェーが自動車に関するどんな統計で世界一を保っているか?",
    [
      "The highest share of new cars sold that are fully electric|El mayor porcentaje de coches nuevos vendidos que son totalmente eléctricos|La plus forte part de voitures neuves vendues entièrement électriques|新車販売に占める完全電気自動車の割合の高さ",
      "The highest number of cars manufactured per year|El mayor número de coches fabricados al año|Le plus grand nombre de voitures fabriquées par an|年間自動車生産台数の多さ",
      "The longest average car ownership before scrapping|La mayor duración media de posesión de un coche antes de desguazarlo|La plus longue durée moyenne de possession d'une voiture avant sa mise à la casse|廃車までの平均保有期間の長さ",
    ],
    0,
    "Generous tax breaks on electric vehicles, paired with high taxes on petrol and diesel cars, pushed the electric share of new car sales in Norway above 80 percent in recent years, far ahead of any other country.|Las generosas ventajas fiscales para los vehículos eléctricos, junto con altos impuestos a los coches de gasolina y diésel, elevaron la cuota eléctrica de las ventas de coches nuevos en Noruega por encima del 80 % en los últimos años, muy por delante de cualquier otro país.|De généreux avantages fiscaux sur les véhicules électriques, associés à de lourdes taxes sur les voitures à essence et diesel, ont porté la part de l'électrique dans les ventes de voitures neuves en Norvège au-dessus de 80 % ces dernières années, loin devant tout autre pays.|電気自動車への手厚い税優遇と、ガソリン・ディーゼル車への高い税負担が組み合わさり、近年のノルウェーでは新車販売に占める電気自動車の割合が8割を超えるまでになった。他のどの国よりも突出して高い。",
  ),
  q(
    8,
    "Vinnufossen, with a total drop of 860 metres, is Norway's — and Europe's — tallest what?|El Vinnufossen, con un desnivel total de 860 metros, es la/el más alta/o de Noruega y de Europa, ¿de qué?|La Vinnufossen, avec une chute totale de 860 mètres, est la plus haute de Norvège et d'Europe en quoi ?|落差合計860mのヴィンヌフォッセンは、ノルウェーおよびヨーロッパで最も高い何か?",
    [
      "Waterfall|Cascada|Chute d'eau|滝",
      "Sea cliff|Acantilado costero|Falaise maritime|海食崖",
      "Ski jump|Trampolín de salto de esquí|Tremplin de saut à ski|スキージャンプ台",
    ],
    0,
    "Fed by meltwater from the Innerdalen glacier, Vinnufossen falls in several unequal stages rather than a single sheer drop, which is why it is easy to underestimate on a casual glance.|Alimentado por el deshielo del glaciar de Innerdalen, el Vinnufossen cae en varios tramos desiguales en lugar de una única caída vertical, por lo que es fácil subestimarlo a simple vista.|Alimentée par la fonte du glacier d'Innerdalen, la Vinnufossen tombe en plusieurs paliers inégaux plutôt qu'en une seule chute verticale, ce qui explique qu'on la sous-estime facilement au premier coup d'œil.|インネルダーレン氷河の融け水を水源とするヴィンヌフォッセンは、一気に垂直落下するのではなく、いくつもの不揃いな段になって落ちる。そのため一見しただけではその規模を見誤りやすい。",
  ),
  q(
    7,
    "The classic Hurtigruten coastal route between Bergen and Kirkenes calls at how many ports along the way?|La ruta costera clásica del Hurtigruten entre Bergen y Kirkenes hace escala en cuántos puertos por el camino?|La ligne côtière classique du Hurtigruten entre Bergen et Kirkenes fait escale dans combien de ports en chemin ?|ベルゲンとシルケネスを結ぶ古典的なフッティルーテン航路は、途中いくつの港に寄港するか?",
    [
      "34|34|34|34",
      "12|12|12|12",
      "60|60|60|60",
    ],
    0,
    "The route has run without a break since 1893, and for many small communities along the way it was, for decades, the only reliable link at all to the rest of the country in winter.|La ruta funciona sin interrupción desde 1893, y para muchas pequeñas comunidades del trayecto fue, durante décadas, el único vínculo fiable con el resto del país en invierno.|La ligne fonctionne sans interruption depuis 1893, et pour de nombreuses petites communautés du trajet, elle fut, pendant des décennies, le seul lien fiable avec le reste du pays en hiver.|この航路は1893年から途切れることなく運航されており、沿岸の多くの小さな集落にとって、何十年ものあいだ冬の間ここだけが国の他の場所への確実なつながりだった。",
  ),
  q(
    8,
    "Gro Harlem Brundtland, Norway's first female Prime Minister, later chaired a UN commission whose 1987 report popularised which now-common term?|Gro Harlem Brundtland, primera mujer primera ministra de Noruega, presidió después una comisión de la ONU cuyo informe de 1987 popularizó qué término hoy habitual?|Gro Harlem Brundtland, première femme Première ministre de Norvège, présida ensuite une commission de l'ONU dont le rapport de 1987 popularisa quel terme aujourd'hui courant ?|ノルウェー初の女性首相グロ・ハーレム・ブルントラントが後に議長を務めた国連委員会の1987年の報告書は、今では定着した何という語を広めたか?",
    [
      "Sustainable development|Desarrollo sostenible|Développement durable|持続可能な開発",
      "Globalisation|Globalización|Mondialisation|グローバリゼーション",
      "Universal basic income|Renta básica universal|Revenu de base universel|ベーシックインカム",
    ],
    0,
    "The Brundtland Report, formally titled Our Common Future, defined sustainable development as meeting the needs of the present without compromising the ability of future generations to meet their own — a phrase now quoted constantly.|El Informe Brundtland, titulado formalmente Nuestro futuro común, definió el desarrollo sostenible como satisfacer las necesidades del presente sin comprometer la capacidad de las generaciones futuras de satisfacer las suyas, una frase hoy citada constantemente.|Le rapport Brundtland, intitulé officiellement Notre avenir à tous, définit le développement durable comme répondant aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs — une formule aujourd'hui citée sans cesse.|正式名称『われら共有の未来』と題されたブラントラント報告書は、持続可能な開発を「将来の世代が自らのニーズを満たす能力を損なうことなく、現在のニーズを満たす」ことと定義した。いまも絶えず引用される一節である。",
  ),
  q(
    8,
    "What is 'joik', a traditional form of Sámi vocal music?|¿Qué es el 'joik', una forma tradicional de música vocal sami?|Qu'est-ce que le 'joik', une forme traditionnelle de musique vocale sami ?|サーミの伝統的な声楽の一形式「ヨイク」とは何か?",
    [
      "A style of singing, often without fixed lyrics, said to evoke a person, animal or place directly|Un estilo de canto, a menudo sin letra fija, que se dice evoca directamente a una persona, animal o lugar|Un style de chant, souvent sans paroles fixes, censé évoquer directement une personne, un animal ou un lieu|しばしば決まった歌詞を持たず、人や動物、土地そのものを表すとされる歌唱様式",
      "A type of drum used only in Christian church services|Un tipo de tambor usado solo en oficios religiosos cristianos|Un type de tambour utilisé uniquement lors des offices religieux chrétiens|キリスト教の礼拝でのみ使われる太鼓の一種",
      "A formal written epic poem|Un poema épico formal y escrito|Un poème épique formel et écrit|正式な書き言葉による叙事詩",
    ],
    0,
    "A joik is traditionally said not to be a song about someone but the person themselves rendered in sound, and the form survived centuries of suppression, including periods when Norwegian authorities actively discouraged it, to be recognised today as a living art form.|Se dice tradicionalmente que un joik no es una canción sobre alguien, sino la persona misma convertida en sonido, y la forma sobrevivió siglos de represión, incluidos periodos en que las autoridades noruegas la desalentaron activamente, para ser hoy reconocida como una forma de arte viva.|Un joik n'est traditionnellement pas dit être une chanson sur quelqu'un, mais la personne elle-même rendue en son, et cette forme a survécu à des siècles de répression, y compris des périodes où les autorités norvégiennes la décourageaient activement, pour être aujourd'hui reconnue comme une forme d'art vivante.|ヨイクは伝統的に、誰かについて歌う歌ではなく、その人自身を音にしたものだとされる。ノルウェー当局がこれを積極的に抑圧した時期を含め、何世紀もの弾圧を生き延び、今日では生きた芸術形式として認められている。",
  ),
  // ---------------------------------------------------------------------
  // 現地の人か強い関心のある人向け(難易度9〜10)
  // ---------------------------------------------------------------------
  q(
    10,
    "In the August 1905 referendum on dissolving the union with Sweden, roughly what was the result?|En el referéndum de agosto de 1905 sobre la disolución de la unión con Suecia, ¿cuál fue aproximadamente el resultado?|Lors du référendum d'août 1905 sur la dissolution de l'union avec la Suède, quel fut, à peu près, le résultat ?|1905年8月、スウェーデンとの連合解消をめぐる国民投票の結果はおおよそどうだったか?",
    [
      "An overwhelming majority in favour, with almost no votes against|Una mayoría abrumadora a favor, con casi ningún voto en contra|Une majorité écrasante en faveur, avec presque aucun vote contre|反対がほぼ皆無の、圧倒的多数の賛成",
      "A narrow majority, with about 55% in favour|Una mayoría ajustada, con alrededor del 55 % a favor|Une majorité étroite, avec environ 55 % en faveur|賛成55%程度の僅差",
      "The referendum was actually defeated, and independence came later by other means|El referéndum fue en realidad derrotado, y la independencia llegó después por otros medios|Le référendum fut en réalité rejeté, et l'indépendance vint plus tard par d'autres moyens|実は否決され、独立は後に別の手段で実現した",
    ],
    0,
    "The count was 368,208 in favour of dissolution against just 184 opposed, a margin so lopsided that some historians note the vote functioned more as a show of unity than a genuine test of opinion.|El recuento fue de 368.208 votos a favor de la disolución frente a solo 184 en contra, un margen tan desigual que algunos historiadores señalan que la votación funcionó más como una muestra de unidad que como una auténtica consulta de opinión.|Le décompte fut de 368 208 voix pour la dissolution contre seulement 184 opposées, une marge si écrasante que certains historiens notent que le vote fonctionna davantage comme une démonstration d'unité que comme un véritable sondage d'opinion.|開票の結果は、連合解消賛成368,208票に対し反対はわずか184票だった。あまりに一方的な差だったため、この投票は本当の意味での意見調査というより、国民の結束を示す儀式に近かったと指摘する歴史家もいる。",
  ),
  q(
    9,
    "Under the 1920 Svalbard Treaty, citizens of any signatory nation are granted what unusual right on the archipelago, unique within Norwegian territory?|Según el Tratado de Svalbard de 1920, ¿qué derecho inusual se concede en el archipiélago a los ciudadanos de cualquier nación firmante, único dentro del territorio noruego?|En vertu du traité du Svalbard de 1920, quel droit inhabituel, unique sur le territoire norvégien, est accordé aux citoyens de toute nation signataire sur l'archipel ?|1920年のスヴァールバル条約により、署名国の国民には、ノルウェー領内で唯一となるどんな異例の権利がこの諸島で認められているか?",
    [
      "The right to live and work there without a visa|El derecho a vivir y trabajar allí sin visado|Le droit d'y vivre et d'y travailler sans visa|ビザ無しで居住・就労できる権利",
      "The right to vote in Norwegian national elections|El derecho a votar en las elecciones nacionales noruegas|Le droit de voter aux élections nationales norvégiennes|ノルウェーの国政選挙での投票権",
      "Exemption from all Norwegian criminal law|Exención de toda la legislación penal noruega|L'exemption de tout le droit pénal norvégien|ノルウェーの刑法の全面的な適用除外",
    ],
    0,
    "The treaty, which recognised Norwegian sovereignty over Svalbard while demilitarising it, has left the archipelago with a genuinely international population, including a long-established Russian mining settlement at Barentsburg.|El tratado, que reconoció la soberanía noruega sobre Svalbard a la vez que la desmilitarizaba, ha dejado al archipiélago con una población verdaderamente internacional, incluido un asentamiento minero ruso de larga data en Barentsburg.|Le traité, qui reconnut la souveraineté norvégienne sur le Svalbard tout en le démilitarisant, a laissé à l'archipel une population véritablement internationale, dont une colonie minière russe de longue date à Barentsburg.|この条約はノルウェーのスヴァールバル主権を認めると同時に非武装化を定め、その結果この諸島には真に国際色豊かな住民が暮らすことになった。バレンツブルクには古くからのロシアの炭鉱集落もある。",
  ),
  q(
    9,
    "The 1814 Treaty of Kiel, which ceded Norway from the Danish to the Swedish crown, was signed by which Danish king?|El Tratado de Kiel de 1814, que cedió Noruega de la corona danesa a la sueca, fue firmado por qué rey danés?|Le traité de Kiel de 1814, qui céda la Norvège de la couronne danoise à la couronne suédoise, fut signé par quel roi du Danemark ?|1814年のキール条約は、ノルウェーをデンマーク王室からスウェーデン王室へ譲渡したが、これに署名したデンマーク王は誰か?",
    [
      "Frederick VI|Federico VI|Frédéric VI|フレゼリク6世",
      "Christian IV|Cristián IV|Christian IV|クリスチャン4世",
      "Haakon VII|Haakon VII|Haakon VII|ホーコン7世",
    ],
    0,
    "Frederick VI had backed Napoleon and ended up on the losing side of the wars, and Denmark's punishment was to lose Norway, its possession since the fourteenth century, to Sweden.|Federico VI había respaldado a Napoleón y acabó en el bando perdedor de las guerras, y el castigo para Dinamarca fue perder Noruega, en su poder desde el siglo XIV, en favor de Suecia.|Frédéric VI avait soutenu Napoléon et se retrouva dans le camp perdant des guerres, et la punition du Danemark fut de perdre la Norvège, sa possession depuis le XIVe siècle, au profit de la Suède.|フレゼリク6世はナポレオン側についていたため、戦争の敗者側に回ることになった。デンマークへの罰は、14世紀から保持してきたノルウェーをスウェーデンに譲り渡すことだった。",
  ),
  q(
    9,
    "Who designed Norway's current flag, adopted in 1821?|¿Quién diseñó la actual bandera de Noruega, adoptada en 1821?|Qui dessina l'actuel drapeau de la Norvège, adopté en 1821 ?|1821年に採用されたノルウェーの現在の国旗を考案したのは誰か?",
    [
      "Fredrik Meltzer, a member of parliament|Fredrik Meltzer, un parlamentario|Fredrik Meltzer, un parlementaire|国会議員フレドリク・メルツェル",
      "King Haakon VII himself|El propio rey Haakon VII|Le roi Haakon VII lui-même|ホーコン7世本人",
      "The painter Edvard Munch|El pintor Edvard Munch|Le peintre Edvard Munch|画家エドヴァルド・ムンク",
    ],
    0,
    "Meltzer proposed the design to the Storting in 1821, combining Denmark's colours with a French-style blue cross, and it took decades of political argument before the flag could be flown from Norwegian ships without a Swedish symbol added to it.|Meltzer propuso el diseño al Storting en 1821, combinando los colores de Dinamarca con una cruz azul de estilo francés, y hicieron falta décadas de disputas políticas antes de que la bandera pudiera izarse en barcos noruegos sin un símbolo sueco añadido.|Meltzer proposa le dessin au Storting en 1821, combinant les couleurs du Danemark avec une croix bleue de style français, et il fallut des décennies de querelles politiques avant que le drapeau puisse flotter sur les navires norvégiens sans qu'un symbole suédois n'y soit ajouté.|メルツェルは1821年、デンマークの色にフランス風の青い十字を組み合わせたこの図案を国会(ストーティング)に提案した。スウェーデンの記章を付け足さずにこの旗をノルウェー船に掲げられるようになるまでには、何十年もの政治的な議論を要した。",
  ),
  q(
    10,
    "How many delegates, later nicknamed 'the Eidsvoll Men', signed Norway's constitution in 1814?|¿Cuántos delegados, apodados después «los Hombres de Eidsvoll», firmaron la constitución noruega en 1814?|Combien de délégués, surnommés plus tard « les Hommes d'Eidsvoll », signèrent la constitution norvégienne en 1814 ?|のちに「エイツヴォルの男たち」と呼ばれることになる、1814年にノルウェー憲法に署名した代議員は何人か?",
    [
      "112|112|112|112人",
      "27|27|27|27人",
      "250|250|250|250人",
    ],
    0,
    "The delegates met for five weeks at Eidsvoll, the same town later served by Norway's first railway, drafting the entire document in that time under the shadow of an impending Swedish invasion.|Los delegados se reunieron durante cinco semanas en Eidsvoll, la misma localidad que más tarde serviría el primer ferrocarril de Noruega, redactando todo el documento en ese tiempo bajo la sombra de una inminente invasión sueca.|Les délégués se réunirent cinq semaines à Eidsvoll, la même ville que desservira plus tard le premier chemin de fer de Norvège, rédigeant tout le document dans ce délai sous la menace d'une invasion suédoise imminente.|代議員たちはエイツヴォルに五週間集まった。のちにノルウェー最初の鉄道が通うことになるのと同じ町である。差し迫るスウェーデンの侵攻の影の下、その期間内に全文を書き上げた。",
  ),
  q(
    9,
    "Who was the first Norwegian to win a Nobel Prize, taking the Literature prize in 1903?|¿Quién fue el primer noruego en ganar un Premio Nobel, al recibir el de Literatura en 1903?|Qui fut le premier Norvégien à remporter un prix Nobel, en recevant celui de littérature en 1903 ?|1903年に文学賞を受け、ノルウェー人で初めてノーベル賞を受賞したのは誰か?",
    [
      "Bjørnstjerne Bjørnson|Bjørnstjerne Bjørnson|Bjørnstjerne Bjørnson|ビョルンスティエルネ・ビョルンソン",
      "Henrik Ibsen|Henrik Ibsen|Henrik Ibsen|ヘンリク・イプセン",
      "Knut Hamsun|Knut Hamsun|Knut Hamsun|クヌート・ハムスン",
    ],
    0,
    "Bjørnson also wrote the lyrics to Norway's national anthem, and unlike Ibsen — who was nominated repeatedly but never won — he lived to see his country gain full independence from Sweden in 1905.|Bjørnson escribió también la letra del himno nacional de Noruega, y, a diferencia de Ibsen —nominado repetidamente pero que nunca ganó—, vivió para ver a su país alcanzar la plena independencia de Suecia en 1905.|Bjørnson écrivit aussi les paroles de l'hymne national norvégien et, contrairement à Ibsen — nommé à plusieurs reprises mais jamais lauréat —, il vécut assez longtemps pour voir son pays obtenir sa pleine indépendance de la Suède en 1905.|ビョルンソンはノルウェー国歌の歌詞も書いた人物である。何度も候補になりながら一度も受賞しなかったイプセンとは異なり、彼は1905年に自国がスウェーデンから完全に独立するのを生きて見届けた。",
  ),
  q(
    9,
    "Who composed the music for Norway's national anthem, 'Ja, vi elsker dette landet'?|¿Quién compuso la música del himno nacional de Noruega, «Ja, vi elsker dette landet»?|Qui composa la musique de l'hymne national norvégien, « Ja, vi elsker dette landet » ?|ノルウェー国歌『Ja, vi elsker dette landet』の作曲者は誰か?",
    [
      "Rikard Nordraak|Rikard Nordraak|Rikard Nordraak|リカード・ヌールロック",
      "Edvard Grieg|Edvard Grieg|Edvard Grieg|エドヴァルド・グリーグ",
      "Bjørnstjerne Bjørnson|Bjørnstjerne Bjørnson|Bjørnstjerne Bjørnson|ビョルンスティエルネ・ビョルンソン",
    ],
    0,
    "Nordraak, a cousin of the anthem's lyricist Bjørnson, died of tuberculosis at just 23, not long after composing the melody, and never lived to hear the song become his country's anthem.|Nordraak, primo del autor de la letra, Bjørnson, murió de tuberculosis con solo 23 años, poco después de componer la melodía, y nunca llegó a oír la canción convertida en el himno de su país.|Nordraak, cousin du parolier Bjørnson, mourut de la tuberculose à seulement 23 ans, peu après avoir composé la mélodie, et n'entendit jamais la chanson devenir l'hymne de son pays.|作詞者ビョルンソンのいとこにあたるヌールロックは、この旋律を作曲してほどなく、わずか23歳で結核により世を去った。この歌が祖国の国歌になるのを、彼が耳にすることは無かった。",
  ),
  q(
    9,
    "Who single-handedly constructed Nynorsk, one of Norway's two official written language forms, based on rural dialects in the nineteenth century?|¿Quién construyó en solitario el nynorsk, una de las dos formas escritas oficiales de Noruega, a partir de dialectos rurales en el siglo XIX?|Qui construisit à lui seul le nynorsk, l'une des deux formes écrites officielles de la Norvège, à partir de dialectes ruraux au XIXe siècle ?|19世紀に地方の方言をもとに、ノルウェーの2つの公式書き言葉の一つであるニーノシュクをただ一人で作り上げたのは誰か?",
    [
      "Ivar Aasen|Ivar Aasen|Ivar Aasen|イーヴァル・オーセン",
      "Henrik Ibsen|Henrik Ibsen|Henrik Ibsen|ヘンリク・イプセン",
      "Ivar Aasen's own son|El propio hijo de Ivar Aasen|Le propre fils d'Ivar Aasen|イーヴァル・オーセンの息子",
    ],
    0,
    "Aasen travelled the Norwegian countryside for years cataloguing local dialects by hand before assembling them into a written standard, intended as a genuinely Norwegian alternative to Bokmål's strong Danish roots.|Aasen recorrió durante años el campo noruego catalogando a mano los dialectos locales antes de reunirlos en un estándar escrito, pensado como una alternativa genuinamente noruega frente a las fuertes raíces danesas del bokmål.|Aasen parcourut pendant des années les campagnes norvégiennes, cataloguant à la main les dialectes locaux, avant de les assembler en une norme écrite, pensée comme une alternative authentiquement norvégienne aux fortes racines danoises du bokmål.|オーセンは何年もかけてノルウェーの農村を歩き、各地の方言を手作業で記録して回り、それらをまとめて一つの書き言葉の規範を作り上げた。デンマーク語に強く根ざしたブークモールに対する、真にノルウェー的な代案として構想されたものである。",
  ),
  q(
    9,
    "On what exact date did the Norwegian Storting unilaterally declare the union with Sweden dissolved, months before the confirming referendum?|¿En qué fecha exacta declaró el Storting noruego, de forma unilateral, disuelta la unión con Suecia, meses antes del referéndum confirmatorio?|À quelle date exacte le Storting norvégien déclara-t-il unilatéralement dissoute l'union avec la Suède, des mois avant le référendum de confirmation ?|確認のための国民投票の何か月も前に、ノルウェー国会(ストーティング)がスウェーデンとの連合解消を一方的に宣言した、その正確な日付はいつか?",
    [
      "7 June 1905|7 de junio de 1905|7 juin 1905|1905年6月7日",
      "17 May 1905|17 de mayo de 1905|17 mai 1905|1905年5月17日",
      "9 April 1905|9 de abril de 1905|9 avril 1905|1905年4月9日",
    ],
    0,
    "The date is still marked in Norway, distinct from Constitution Day on 17 May, and was chosen deliberately for a parliamentary vote rather than a street celebration, to present Sweden with a fait accompli.|La fecha aún se conmemora en Noruega, distinta del Día de la Constitución del 17 de mayo, y se eligió deliberadamente para una votación parlamentaria en vez de una celebración callejera, para presentar a Suecia un hecho consumado.|La date est encore marquée en Norvège, distincte de la fête de la Constitution du 17 mai, et fut délibérément choisie pour un vote parlementaire plutôt qu'une célébration de rue, afin de présenter à la Suède un fait accompli.|この日はいまもノルウェーで記憶されており、5月17日の憲法記念日とは別の日である。街頭での祝賀ではなく、あえて議会での採決という形を選び、スウェーデンに既成事実を突きつけた。",
  ),
  q(
    9,
    "At 24.5 kilometres, the Lærdal Tunnel in Norway holds what world record?|Con 24,5 kilómetros, ¿qué récord mundial ostenta el túnel de Lærdal en Noruega?|Avec 24,5 kilomètres, quel record mondial détient le tunnel de Lærdal en Norvège ?|全長24.5kmのレールダールトンネルは、どんな世界記録を持つか?",
    [
      "The world's longest road tunnel|El túnel de carretera más largo del mundo|Le plus long tunnel routier du monde|世界最長の道路トンネル",
      "The world's longest rail tunnel|El túnel ferroviario más largo del mundo|Le plus long tunnel ferroviaire du monde|世界最長の鉄道トンネル",
      "The world's deepest underwater tunnel|El túnel submarino más profundo del mundo|Le plus profond tunnel sous-marin du monde|世界で最も深い海底トンネル",
    ],
    0,
    "To help drivers stay alert through the roughly twenty-minute drive, the tunnel is broken into sections by three large caverns lit in shifting blue and yellow light, designed to feel like a sunrise.|Para ayudar a los conductores a mantenerse alerta durante el trayecto de unos veinte minutos, el túnel se divide en tramos mediante tres grandes cavernas iluminadas con luz azul y amarilla cambiante, pensadas para simular un amanecer.|Pour aider les conducteurs à rester vigilants pendant le trajet d'environ vingt minutes, le tunnel est divisé en tronçons par trois grandes cavernes éclairées d'une lumière bleue et jaune changeante, conçue pour évoquer un lever de soleil.|およそ20分かかる走行のあいだ運転手の集中を保つため、このトンネルは青と黄色の光が移り変わる3つの大きな洞窟状の空間で区切られており、日の出を思わせる演出になっている。",
  ),
  q(
    10,
    "During the German occupation, many Norwegians secretly wore or scratched onto walls a simple monogram as a symbol of loyalty to their exiled king. What was it?|Durante la ocupación alemana, muchos noruegos llevaban o grababan en secreto en las paredes un sencillo monograma como símbolo de lealtad a su rey en el exilio. ¿Cuál era?|Pendant l'occupation allemande, de nombreux Norvégiens portaient ou gravaient secrètement sur les murs un simple monogramme, symbole de loyauté envers leur roi en exil. Lequel ?|ドイツ占領下、多くのノルウェー人が亡命した国王への忠誠の印として密かに身につけたり壁に刻んだりした、簡素な記章とは何だったか?",
    [
      "H7, for King Haakon VII|H7, por el rey Haakon VII|H7, pour le roi Haakon VII|H7(国王ホーコン7世を表す)",
      "N, for Norge (Norway)|N, por Norge (Noruega)|N, pour Norge (Norvège)|N(ノルウェーを表す)",
      "A red rose|Una rosa roja|Une rose rouge|赤いバラ",
    ],
    0,
    "The monogram, worn on lapel pins or paper clips, was simple enough to disguise and widespread enough that occupying authorities eventually banned it outright, though enforcement never came close to stamping it out.|El monograma, llevado en pines de solapa o clips, era lo bastante simple para disimularlo y lo bastante extendido como para que las autoridades ocupantes acabaran prohibiéndolo por completo, aunque nunca lograron erradicarlo del todo.|Le monogramme, porté en épinglette de revers ou en trombone, était assez simple pour être dissimulé et assez répandu pour que les autorités d'occupation finissent par l'interdire purement et simplement, sans jamais parvenir à l'éradiquer.|この記章は襟のピンやクリップに付けて身につけられ、簡素で人目を欺きやすく、あまりに広まったため占領当局はついに全面禁止に踏み切った。それでも取り締まりが根絶やしにすることはなかった。",
  ),
  // ---------------------------------------------------------------------
  // 一般常識・現代の暮らし(追加分、難易度2〜7)
  // ---------------------------------------------------------------------
  q(
    3,
    "Before its full independence in 1905, Norway spent most of the 19th century in what kind of relationship with Sweden?|Antes de su plena independencia en 1905, ¿en qué tipo de relación pasó Noruega la mayor parte del siglo XIX con Suecia?|Avant son indépendance totale en 1905, dans quel type de relation la Norvège passa-t-elle la majeure partie du XIXe siècle avec la Suède ?|1905年の完全独立以前、ノルウェーは19世紀の大半をスウェーデンとどのような関係で過ごしたか?",
    [
      "A union sharing the same king|Una unión que compartía el mismo rey|Une union partageant le même roi|同じ王を戴く連合",
      "At continuous war|En guerra continua|En guerre continue|絶え間ない戦争状態",
      "As a colony with no local government at all|Como colonia sin gobierno local alguno|Comme colonie sans aucun gouvernement local|地方政府すら無い植民地",
    ],
    0,
    "The 1814 union left Norway with its own constitution, parliament and laws, but the same king and a shared foreign policy — an arrangement that satisfied fewer and fewer Norwegians as the century wore on.|La unión de 1814 dejó a Noruega con su propia constitución, parlamento y leyes, pero con el mismo rey y una política exterior compartida, un arreglo que satisfizo a cada vez menos noruegos conforme avanzaba el siglo.|L'union de 1814 laissa à la Norvège sa propre constitution, son parlement et ses lois, mais le même roi et une politique étrangère commune — un arrangement qui satisfaisait de moins en moins de Norvégiens à mesure que le siècle avançait.|1814年の連合により、ノルウェーは独自の憲法・議会・法律を保ったが、王と外交政策はスウェーデンと共有していた。世紀が進むにつれ、この取り決めに満足するノルウェー人は次第に少なくなっていった。",
  ),
  q(
    3,
    "Which skiing discipline is Norway historically the most dominant nation in at the Winter Olympics?|¿En qué disciplina de esquí ha sido Noruega, históricamente, la nación más dominante en los Juegos Olímpicos de Invierno?|Dans quelle discipline de ski la Norvège est-elle historiquement la nation la plus dominante aux Jeux olympiques d'hiver ?|冬季オリンピックで、ノルウェーが歴史的に最も強さを誇ってきたスキー種目は何か?",
    [
      "Cross-country skiing|Esquí de fondo|Ski de fond|クロスカントリースキー",
      "Alpine downhill skiing|Esquí alpino de descenso|Ski alpin de descente|アルペンスキー滑降",
      "Freestyle skiing|Esquí acrobático|Ski freestyle|フリースタイルスキー",
    ],
    0,
    "Norwegian cross-country skiers have won so many Olympic medals that some other nations' entire skiing federations are smaller than a single Norwegian training group.|Los esquiadores de fondo noruegos han ganado tantas medallas olímpicas que las federaciones de esquí enteras de otros países son a veces más pequeñas que un solo grupo de entrenamiento noruego.|Les fondeurs norvégiens ont remporté tant de médailles olympiques que les fédérations de ski entières de certains autres pays sont parfois plus petites qu'un seul groupe d'entraînement norvégien.|ノルウェーのクロスカントリースキー選手はあまりに多くの五輪メダルを獲得しており、他国のスキー連盟全体が、ノルウェーの一つの練習グループより小規模なこともある。",
  ),
  q(
    3,
    "What is the name of Norway's national parliament?|¿Cómo se llama el parlamento nacional de Noruega?|Comment s'appelle le parlement national de la Norvège ?|ノルウェーの国会は何と呼ばれるか?",
    [
      "The Storting|El Storting|Le Storting|ストーティング",
      "The Folketing|El Folketing|Le Folketing|フォルケティング",
      "The Riksdag|El Riksdag|Le Riksdag|リクスダーグ",
    ],
    0,
    "The Folketing and Riksdag are the parliaments of Denmark and Sweden respectively — all three Scandinavian countries have their own distinct name for what is, in each case, essentially the same kind of institution.|El Folketing y el Riksdag son los parlamentos de Dinamarca y Suecia respectivamente: los tres países escandinavos tienen su propio nombre distinto para lo que es, en cada caso, esencialmente el mismo tipo de institución.|Le Folketing et le Riksdag sont respectivement les parlements du Danemark et de la Suède — les trois pays scandinaves ont chacun leur propre nom distinct pour ce qui est, dans chaque cas, essentiellement le même type d'institution.|フォルケティングとリクスダーグは、それぞれデンマークとスウェーデンの議会の名である。スカンディナヴィアの3か国はいずれも、実質的には同じ種類の機関に、それぞれ異なる独自の名前を付けている。",
  ),
  q(
    2,
    "Norway shares the Scandinavian Peninsula with which other country?|Noruega comparte la península escandinava con qué otro país?|La Norvège partage la péninsule scandinave avec quel autre pays ?|ノルウェーはスカンディナヴィア半島をどの国と分け合っているか?",
    [
      "Sweden|Suecia|Suède|スウェーデン",
      "Denmark|Dinamarca|Danemark|デンマーク",
      "Finland|Finlandia|Finlande|フィンランド",
    ],
    0,
    "Denmark, despite being a Scandinavian country, sits on its own peninsula and islands, not on the Scandinavian Peninsula itself, which Norway shares only with Sweden (and a small part of Finland's northwest).|Dinamarca, pese a ser un país escandinavo, se asienta en su propia península e islas, no en la península escandinava propiamente dicha, que Noruega comparte solo con Suecia (y una pequeña parte del noroeste de Finlandia).|Le Danemark, bien que pays scandinave, se trouve sur sa propre péninsule et ses îles, et non sur la péninsule scandinave elle-même, que la Norvège partage uniquement avec la Suède (et une petite partie du nord-ouest de la Finlande).|デンマークはスカンディナヴィアの国でありながら、スカンディナヴィア半島そのものではなく自国の半島と島々に位置する。この半島をノルウェーが分け合っているのはスウェーデンだけである(フィンランド北西部のごく一部を除く)。",
  ),
  q(
    3,
    "What is the name of the sea north of Norway and Russia's Arctic coast, rich in fishing grounds and, more recently, offshore oil and gas?|¿Cómo se llama el mar al norte de Noruega y de la costa ártica rusa, rico en caladeros y, más recientemente, en petróleo y gas marinos?|Comment s'appelle la mer au nord de la Norvège et de la côte arctique russe, riche en zones de pêche et, plus récemment, en pétrole et gaz offshore ?|ノルウェーとロシアの北極海沿岸の北に広がる、漁場と近年では海底油田・ガス田に恵まれた海の名は?",
    [
      "The Barents Sea|El mar de Barents|La mer de Barents|バレンツ海",
      "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海",
      "The Caspian Sea|El mar Caspio|La mer Caspienne|カスピ海",
    ],
    0,
    "Named for the Dutch explorer Willem Barentsz, who searched the area for a northeast passage to Asia in the 1590s, the sea is shared by Norwegian and Russian fishing fleets and gas platforms alike.|Bautizado en honor al explorador neerlandés Willem Barentsz, que buscó por la zona un paso al noreste hacia Asia en la década de 1590, el mar es compartido por flotas pesqueras y plataformas de gas tanto noruegas como rusas.|Nommée d'après l'explorateur néerlandais Willem Barentsz, qui chercha dans cette zone un passage du nord-est vers l'Asie dans les années 1590, cette mer est partagée par les flottes de pêche et les plateformes gazières norvégiennes et russes.|1590年代にアジアへの北東航路をこの海域で探し求めたオランダの探検家ウィレム・バレンツにちなんで名付けられた。この海はノルウェーとロシア双方の漁船団やガス採掘施設が共に利用している。",
  ),
  q(
    2,
    "In Norwegian folklore, what is said to happen to a troll caught outdoors when the sun rises?|Según el folclore noruego, ¿qué se dice que le ocurre a un troll sorprendido al aire libre cuando sale el sol?|Selon le folklore norvégien, que dit-on qu'il arrive à un troll surpris dehors quand le soleil se lève ?|ノルウェーの民話では、日の出のときに外にいたトロルはどうなるとされるか?",
    [
      "It turns to stone|Se convierte en piedra|Il se change en pierre|石になる",
      "It shrinks to the size of a mouse|Se encoge hasta el tamaño de un ratón|Il rapetisse à la taille d'une souris|ネズミほどの大きさに縮む",
      "It becomes invisible|Se vuelve invisible|Il devient invisible|姿が見えなくなる",
    ],
    0,
    "The folk belief is often pointed to as an explanation, only half-seriously, for Norway's many oddly shaped boulders and rock formations, several of which carry names referencing trolls.|La creencia popular se señala a menudo, solo medio en serio, como explicación de las numerosas rocas y formaciones de extrañas formas de Noruega, varias de las cuales llevan nombres que hacen referencia a trolls.|La croyance populaire est souvent citée, à moitié sérieusement, pour expliquer les nombreux rochers et formations rocheuses aux formes étranges de Norvège, dont plusieurs portent des noms faisant référence aux trolls.|この言い伝えは、なかば冗談交じりに、ノルウェー各地にある奇妙な形の岩や地形の由来として引き合いに出されることが多く、その名にトロルへの言及を含むものも少なくない。",
  ),
  q(
    3,
    "How many times has Norway hosted the Winter Olympics?|¿Cuántas veces ha albergado Noruega los Juegos Olímpicos de Invierno?|Combien de fois la Norvège a-t-elle accueilli les Jeux olympiques d'hiver ?|ノルウェーはこれまで冬季オリンピックを何回開催したか?",
    [
      "Twice (Oslo 1952 and Lillehammer 1994)|Dos veces (Oslo 1952 y Lillehammer 1994)|Deux fois (Oslo 1952 et Lillehammer 1994)|2回(1952年オスロ、1994年リレハンメル)",
      "Once|Una vez|Une fois|1回",
      "Four times|Cuatro veces|Quatre fois|4回",
    ],
    0,
    "Oslo's 1952 Games were the first Winter Olympics held in a capital city, and its opening ceremony torch was, fittingly for a skiing nation, lit at the hearth of a ski pioneer's old cabin.|Los Juegos de Oslo de 1952 fueron los primeros Juegos de Invierno celebrados en una capital, y la antorcha de su ceremonia de apertura se encendió, adecuadamente para una nación esquiadora, en el hogar de la vieja cabaña de un pionero del esquí.|Les Jeux d'Oslo de 1952 furent les premiers Jeux d'hiver organisés dans une capitale, et la flamme de leur cérémonie d'ouverture fut allumée, comme il se doit pour une nation de skieurs, dans l'âtre de la vieille cabane d'un pionnier du ski.|1952年のオスロ大会は、首都で開催された最初の冬季オリンピックだった。開会式の聖火は、スキーの国にふさわしく、あるスキーの先駆者の古い山小屋の暖炉で灯された。",
  ),
  q(
    2,
    "What do Norwegians call their own country, in Norwegian?|¿Cómo llaman los noruegos a su propio país, en noruego?|Comment les Norvégiens appellent-ils leur propre pays, en norvégien ?|ノルウェー人は自分の国をノルウェー語で何と呼ぶか?",
    [
      "Norge|Norge|Norge|ノルゲ(Norge)",
      "Nordland|Nordland|Nordland|ノールラン(Nordland)",
      "Norvegia|Norvegia|Norvegia|ノルヴェージア",
    ],
    0,
    "'Nordland' is instead the name of one of Norway's own counties, the long stretch of coast where the country's railway finally runs out at Bodø.|«Nordland» es en cambio el nombre de uno de los propios condados de Noruega, el largo tramo de costa donde el ferrocarril del país finalmente se agota en Bodø.|« Nordland » est en réalité le nom de l'un des comtés norvégiens eux-mêmes, la longue étendue de côte où le chemin de fer du pays s'arrête finalement à Bodø.|「ノールラン」はむしろノルウェー自身の県の一つの名前であり、この国の鉄道がついにボードーで尽きる、あの長く続く沿岸地帯を指す。",
  ),
  q(
    6,
    "Who selects the five members of the Norwegian Nobel Committee, which awards the Nobel Peace Prize each year?|¿Quién elige a los cinco miembros del Comité Nobel Noruego, que concede el Premio Nobel de la Paz cada año?|Qui désigne les cinq membres du Comité Nobel norvégien, qui décerne chaque année le prix Nobel de la paix ?|毎年ノーベル平和賞を選ぶノルウェー・ノーベル委員会の5人の委員は、誰が選出するか?",
    [
      "The Norwegian Parliament (the Storting)|El Parlamento noruego (el Storting)|Le Parlement norvégien (le Storting)|ノルウェー議会(ストーティング)",
      "The King of Norway|El rey de Noruega|Le roi de Norvège|ノルウェー国王",
      "The Swedish Academy|La Academia Sueca|L'Académie suédoise|スウェーデン・アカデミー",
    ],
    0,
    "Unlike the other Nobel Prizes, which are decided in Sweden, Alfred Nobel's will specifically assigned the Peace Prize to a Norwegian committee, for reasons historians still debate.|A diferencia de los demás Premios Nobel, que se deciden en Suecia, el testamento de Alfred Nobel asignó específicamente el Premio de la Paz a un comité noruego, por razones que los historiadores aún debaten.|Contrairement aux autres prix Nobel, décidés en Suède, le testament d'Alfred Nobel confia spécifiquement le prix de la paix à un comité norvégien, pour des raisons que les historiens débattent encore.|他のノーベル賞がスウェーデンで決定されるのに対し、アルフレッド・ノーベルの遺言は平和賞だけをノルウェーの委員会に特別に委ねた。その理由は今も歴史家のあいだで議論が続いている。",
  ),
  q(
    5,
    "Holmenkollen, in the hills above Oslo, is one of the world's oldest and most famous examples of what kind of sporting venue?|Holmenkollen, en las colinas sobre Oslo, es uno de los ejemplos más antiguos y famosos del mundo de, ¿qué tipo de instalación deportiva?|Holmenkollen, dans les collines au-dessus d'Oslo, est l'un des plus anciens et des plus célèbres exemples au monde de quel type d'installation sportive ?|オスロを見下ろす丘にあるホルメンコーレンは、世界でも最古かつ最も有名な部類に入る、どんな種類のスポーツ施設か?",
    [
      "A ski jump|Un trampolín de salto de esquí|Un tremplin de saut à ski|スキージャンプ台",
      "A horse-racing track|Un hipódromo|Un hippodrome|競馬場",
      "A velodrome for cycling|Un velódromo para ciclismo|Un vélodrome pour le cyclisme|自転車競技用の競輪場",
    ],
    0,
    "Ski jumping has taken place on the site since 1892, and the current jump, rebuilt many times, still draws hundreds of thousands of spectators to an annual competition each March.|El salto de esquí se practica en este lugar desde 1892, y el trampolín actual, reconstruido muchas veces, sigue atrayendo a cientos de miles de espectadores a una competición anual cada marzo.|Le saut à ski se pratique sur ce site depuis 1892, et le tremplin actuel, reconstruit de nombreuses fois, attire encore des centaines de milliers de spectateurs à une compétition annuelle chaque mois de mars.|この地でスキージャンプが行われるようになったのは1892年からで、何度も建て替えられてきた現在のジャンプ台は、毎年3月の大会に今も数十万人の観客を集めている。",
  ),
  q(
    5,
    "Oslo's Viking Ship Museum displays several remarkably well-preserved ships, including the Oseberg and Gokstad ships. Why are they so well preserved?|El Museo de los Barcos Vikingos de Oslo exhibe varios barcos notablemente bien conservados, entre ellos el Oseberg y el Gokstad. ¿Por qué están tan bien conservados?|Le musée des navires vikings d'Oslo expose plusieurs bateaux remarquablement bien conservés, dont les navires d'Oseberg et de Gokstad. Pourquoi sont-ils si bien conservés ?|オスロのヴァイキング船博物館には、オーセベルグ船やゴクスタ船をはじめ、驚くほど保存状態の良い船が展示されている。なぜこれほど良く保存されているのか?",
    [
      "They were buried in clay as part of ship burials|Fueron enterrados en arcilla como parte de entierros en barco|Ils furent enfouis dans l'argile lors de sépultures navales|粘土に埋められた「船葬」の一部だったから",
      "They were kept in freshwater lakes for centuries|Se conservaron en lagos de agua dulce durante siglos|Ils furent conservés dans des lacs d'eau douce pendant des siècles|何世紀も淡水湖に保管されていたから",
      "They were coated in tar and sealed in caves|Se recubrieron de brea y se sellaron en cuevas|Ils furent enduits de goudron et scellés dans des grottes|タールで覆われ洞窟に封印されていたから",
    ],
    0,
    "Both ships were used as burial chambers for high-status individuals and then covered in blue clay, an airtight environment that kept the wood remarkably intact for over a thousand years before archaeologists excavated them.|Ambos barcos se usaron como cámaras funerarias para personas de alto estatus y luego se cubrieron con arcilla azul, un entorno hermético que mantuvo la madera notablemente intacta durante más de mil años, hasta que los arqueólogos los excavaron.|Les deux navires servirent de chambres funéraires à des personnages de haut rang, puis furent recouverts d'argile bleue, un environnement étanche qui garda le bois remarquablement intact pendant plus de mille ans, avant que des archéologues ne les exhument.|どちらの船も高い身分の人物の墓室として使われたのち、青粘土で覆われた。この密閉された環境のおかげで、考古学者が発掘するまでの千年以上、木材は驚くほど良好な状態で保たれた。",
  ),
  q(
    6,
    "In a brazen daylight robbery in 2004, armed thieves stole a version of which famous Norwegian painting from an Oslo museum (it was recovered in 2006)?|En un audaz robo a plena luz del día en 2004, ladrones armados sustrajeron una versión de qué famoso cuadro noruego de un museo de Oslo (se recuperó en 2006)?|Lors d'un audacieux vol en plein jour en 2004, des voleurs armés dérobèrent une version de quel célèbre tableau norvégien dans un musée d'Oslo (il fut retrouvé en 2006) ?|2004年、白昼堂々の武装強盗によってオスロの美術館から盗まれ、2006年に発見された、ノルウェーの有名な絵画のバージョンとは何か?",
    [
      "The Scream, by Edvard Munch|El grito, de Edvard Munch|Le Cri, d'Edvard Munch|ムンクの『叫び』",
      "The Sick Child, by Edvard Munch|La niña enferma, de Edvard Munch|L'Enfant malade, d'Edvard Munch|ムンクの『病める子』",
      "Bridal Procession in Hardanger, by Adolph Tidemand|Cortejo nupcial en Hardanger, de Adolph Tidemand|Cortège nuptial en Hardanger, d'Adolph Tidemand|アドルフ・ティーデマンの『ハルダンゲルの婚礼行列』",
    ],
    0,
    "The thieves pulled the painting, along with Munch's Madonna, straight off the wall in front of stunned museum visitors and escaped by car, and both works turned up damaged but restorable two years later.|Los ladrones arrancaron el cuadro de la pared, junto con la Madonna de Munch, delante de atónitos visitantes del museo y escaparon en coche, y ambas obras aparecieron dañadas pero restaurables dos años después.|Les voleurs arrachèrent le tableau du mur, avec la Madone de Munch, devant des visiteurs médusés du musée, puis s'enfuirent en voiture ; les deux œuvres réapparurent endommagées mais restaurables deux ans plus tard.|強盗たちはムンクの『マドンナ』とともにこの絵を、呆然とする来館者の目の前で壁からもぎ取り、車で逃走した。両作品とも2年後、損傷はあったが修復可能な状態で発見された。",
  ),
  q(
    2,
    "Traditional Norwegian waffles are typically served in what distinctive shape?|Los gofres tradicionales noruegos suelen servirse con qué forma característica?|Les gaufres traditionnelles norvégiennes sont généralement servies sous quelle forme caractéristique ?|伝統的なノルウェーのワッフルは、たいていどんな特徴的な形で出されるか?",
    [
      "Heart-shaped|Con forma de corazón|En forme de cœur|ハート形",
      "Square, like a grid|Cuadradas, como una cuadrícula|Carrées, en grille|格子状の四角形",
      "Long and thin, like a stick|Largas y finas, como un palo|Longues et fines, comme un bâtonnet|棒状の細長い形",
    ],
    0,
    "Norwegian waffles are also softer and less crisp than the Belgian style more familiar abroad, and are usually eaten plain or with sour cream and jam rather than piled with toppings.|Los gofres noruegos son también más blandos y menos crujientes que el estilo belga más conocido fuera del país, y suelen comerse solos o con nata agria y mermelada, en lugar de cubiertos de ingredientes.|Les gaufres norvégiennes sont aussi plus moelleuses et moins croustillantes que le style belge plus connu à l'étranger, et se mangent généralement nature ou avec de la crème aigre et de la confiture, plutôt que couvertes de garnitures.|ノルウェーのワッフルは、海外でよく知られるベルギー風よりも柔らかくカリカリしておらず、たいていトッピングを山盛りにせず、そのままか、サワークリームとジャムを添えて食べる。",
  ),
  q(
    2,
    "In Norway, on which side of the road do cars drive?|En Noruega, ¿por qué lado de la carretera circulan los coches?|En Norvège, de quel côté de la route circulent les voitures ?|ノルウェーでは車はどちら側通行か?",
    [
      "The right|La derecha|La droite|右側",
      "The left|La izquierda|La gauche|左側",
      "It varies by region|Varía según la región|Cela varie selon la région|地方によって異なる",
    ],
    0,
    "Like almost all of mainland Europe, Norway drives on the right, a rule formalised nationwide only in the early twentieth century as motor traffic began to replace horse-drawn transport.|Como casi toda la Europa continental, Noruega conduce por la derecha, una norma formalizada en todo el país solo a principios del siglo XX, cuando el tráfico motorizado empezó a sustituir al transporte de tiro animal.|Comme presque toute l'Europe continentale, la Norvège roule à droite, une règle formalisée à l'échelle nationale seulement au début du XXe siècle, quand la circulation automobile commença à remplacer les transports hippomobiles.|ヨーロッパ大陸のほぼ全域と同じく、ノルウェーは車が右側通行である。この規則が全国で正式に定められたのは20世紀初頭、自動車交通が馬車に取って代わり始めた頃のことである。",
  ),
  q(
    6,
    "Kvikk Lunsj, a Norwegian chocolate-wafer bar similar to KitKat, is traditionally eaten in huge quantities during which annual activity?|El Kvikk Lunsj, una chocolatina de barquillo noruega similar al KitKat, se come tradicionalmente en grandes cantidades durante, ¿qué actividad anual?|Le Kvikk Lunsj, une barre chocolatée gaufrée norvégienne semblable au KitKat, est traditionnellement consommé en grandes quantités lors de quelle activité annuelle ?|KitKatに似たノルウェーのチョコレートウエハース菓子「クヴィック・ルンシ」は、毎年恒例のどんな活動の際に大量に食べられる伝統があるか?",
    [
      "Easter mountain skiing trips|Las excursiones de esquí de montaña en Semana Santa|Les excursions de ski en montagne à Pâques|イースターの山でのスキー旅行",
      "The Constitution Day parade|El desfile del Día de la Constitución|Le défilé de la fête de la Constitution|憲法記念日のパレード",
      "Midsummer bonfire night|La noche de las hogueras de San Juan|La nuit des feux de la Saint-Jean|夏至祭のかがり火の夜",
    ],
    0,
    "Many Norwegian families spend Easter at mountain cabins skiing, and Kvikk Lunsj, designed from the start as a compact, wrapped snack easy to eat with gloves on, became so tied to the tradition that its packaging now often includes weather forecasts and crossword puzzles.|Muchas familias noruegas pasan la Semana Santa esquiando en cabañas de montaña, y el Kvikk Lunsj, pensado desde el principio como un tentempié compacto y envuelto, fácil de comer con guantes puestos, se asoció tanto a la tradición que su envoltorio suele incluir ahora previsiones meteorológicas y crucigramas.|De nombreuses familles norvégiennes passent Pâques à skier depuis des chalets de montagne, et le Kvikk Lunsj, conçu dès le départ comme un en-cas compact et emballé, facile à manger avec des gants, s'est si bien lié à cette tradition que son emballage inclut désormais souvent des prévisions météo et des mots croisés.|多くのノルウェーの家族はイースターを山小屋でスキーをしながら過ごす。最初から手袋をしたままでも食べやすい、コンパクトに包装された軽食として作られたクヴィック・ルンシは、この習慣とあまりに結びついたため、いまでは包装に天気予報やクロスワードパズルが載ることも多い。",
  ),
  q(
    7,
    "'Påskekrim', a distinctively Norwegian Easter tradition, refers to what?|El 'påskekrim', una tradición pascual típicamente noruega, ¿a qué se refiere?|Le 'påskekrim', une tradition pascale typiquement norvégienne, désigne quoi ?|ノルウェー独特のイースターの習わし「ポースケクリム」とは何を指すか?",
    [
      "A surge in crime novels and TV crime dramas consumed over the holiday|Un aumento del consumo de novelas y series policiacas durante las fiestas|Une vague de romans policiers et de séries télévisées policières consommés pendant les fêtes|休暇中に推理小説や刑事ドラマを盛んに楽しむこと",
      "A traditional Easter egg hunt for adults|Una tradicional búsqueda de huevos de Pascua para adultos|Une chasse aux œufs de Pâques traditionnelle pour adultes|大人向けの伝統的なイースターエッグ探し",
      "A ban on selling alcohol during Holy Week|Una prohibición de vender alcohol durante la Semana Santa|Une interdiction de vendre de l'alcool pendant la Semaine sainte|受難週間中の酒類販売禁止",
    ],
    0,
    "The custom reportedly traces back to a 1923 newspaper advertisement for a crime novel disguised as a news headline, and milk cartons in Norway now sometimes print short mystery stories during the Easter season.|La costumbre se remonta, según se dice, a un anuncio de periódico de 1923 para una novela policiaca disfrazado de titular de noticias, y los cartones de leche en Noruega a veces imprimen ahora relatos de misterio breves durante la Semana Santa.|La coutume remonterait à une publicité de 1923 pour un roman policier déguisée en titre d'actualité dans un journal, et les briques de lait en Norvège impriment parfois aujourd'hui de courtes histoires policières pendant la période de Pâques.|この習慣は1923年、ニュースの見出しを装った推理小説の新聞広告に端を発すると言われている。ノルウェーでは今でも、イースターの時期に牛乳パックに短い推理小説が印刷されることがある。",
  ),
  q(
    6,
    "The 'lusekofte', a traditional Norwegian knitted sweater, is named for a pattern that resembles what (though it isn't literal)?|El 'lusekofte', un jersey de punto tradicional noruego, ¿de qué toma su nombre el patrón que evoca (aunque no sea literal)?|Le 'lusekofte', un pull tricoté traditionnel norvégien, tire son nom d'un motif évoquant quoi (sans que ce soit littéral) ?|ノルウェーの伝統的な編み込みセーター「ルーセコフテ」の名は、その模様が何を思わせることに由来するか(文字通りではない)?",
    [
      "Lice (small dark flecks scattered across the pattern)|Piojos (pequeñas motas oscuras repartidas por el patrón)|Des poux (petites taches sombres parsemées sur le motif)|シラミ(模様に散らばる小さな黒い点)",
      "Snowflakes|Copos de nieve|Flocons de neige|雪の結晶",
      "Fish scales|Escamas de pez|Écailles de poisson|魚の鱗",
    ],
    0,
    "Despite the unappealing name, the sweater is a prized piece of traditional knitwear, and the pattern's small scattered stitches are meant to evoke lice only in a loose, affectionate sense rather than literally.|A pesar del nombre poco atractivo, el jersey es una prenda de punto tradicional muy apreciada, y los pequeños puntos repartidos del patrón solo pretenden evocar piojos en un sentido vago y afectuoso, no literal.|Malgré ce nom peu engageant, ce pull est une pièce de tricot traditionnel très prisée, et les petits points dispersés du motif ne sont censés évoquer des poux que dans un sens vague et affectueux, non littéral.|あまり心惹かれない名前にもかかわらず、この編み込みセーターは伝統工芸として高く評価されている。模様に散らばる小さな編み目は、文字通りではなく、ゆるやかで親しみを込めた意味でシラミを思わせるとされる。",
  ),
  q(
    4,
    "Sankthansaften, celebrated on 23 June with large bonfires along the coast, marks what?|El sankthansaften, celebrado el 23 de junio con grandes hogueras a lo largo de la costa, marca, ¿qué?|Le sankthansaften, célébré le 23 juin avec de grands feux le long de la côte, marque quoi ?|6月23日、沿岸各地で大きなかがり火を焚いて祝われる「サンクトハンスアフテン」は何を祝う日か?",
    [
      "Midsummer, the summer solstice period|El solsticio de verano, la época de San Juan|Le solstice d'été, la Saint-Jean|夏至の頃、夏至祭",
      "The start of the fishing season|El inicio de la temporada de pesca|Le début de la saison de pêche|漁の解禁",
      "The anniversary of independence|El aniversario de la independencia|L'anniversaire de l'indépendance|独立記念日",
    ],
    0,
    "Coastal towns compete informally to build the tallest bonfire, some stacked for weeks in advance from old pallets and driftwood, and the tradition is shared, under different names, across much of Scandinavia.|Los pueblos costeros compiten de forma informal por construir la hoguera más alta, algunas apiladas durante semanas de antemano con palés viejos y madera de deriva, y la tradición se comparte, con distintos nombres, en buena parte de Escandinavia.|Les villes côtières rivalisent de façon informelle pour bâtir le plus haut bûcher, certains empilés des semaines à l'avance avec de vieilles palettes et du bois flotté, et la tradition est partagée, sous des noms différents, dans une grande partie de la Scandinavie.|沿岸の町々は非公式に、いちばん高いかがり火の山を競い合う。古いパレットや流木を何週間も前から積み上げて備える町もある。この習わしは呼び名を変えながらスカンディナヴィアの多くの地域で共有されている。",
  ),
  q(
    5,
    "In Norwegian Christmas tradition, who is said to deliver presents, distinct from the international Santa Claus figure?|En la tradición navideña noruega, ¿quién se dice que entrega los regalos, distinto de la figura internacional de Papá Noel?|Dans la tradition de Noël norvégienne, qui est censé livrer les cadeaux, distinct de la figure internationale du Père Noël ?|ノルウェーのクリスマスの伝統では、国際的なサンタクロース像とは別に、誰がプレゼントを届けるとされているか?",
    [
      "The julenisse, a small barn gnome who is given a bowl of porridge in return|El julenisse, un pequeño gnomo del granero al que se le da un plato de gachas a cambio|Le julenisse, un petit lutin de grange à qui l'on donne un bol de bouillie en échange|納屋に住む小さな妖精ユーレニッセ。お礼にお粥の椀を供える",
      "A talking reindeer named Rudolf, of Norwegian origin|Un reno parlante llamado Rudolf, de origen noruego|Un renne parlant nommé Rudolf, d'origine norvégienne|ノルウェー生まれの、話すトナカイ「ルドルフ」",
      "St. Nicholas, arriving by boat rather than sleigh|San Nicolás, que llega en barco en vez de trineo|Saint Nicolas, arrivant en bateau plutôt qu'en traîneau|そりではなく船でやってくる聖ニコラウス",
    ],
    0,
    "The julenisse grew out of an older folk belief in a nisse, a farm spirit who protected the household's animals and barn in exchange for a nightly bowl of porridge, a tradition merged with the modern Santa figure over the twentieth century.|El julenisse surgió de una antigua creencia popular en un nisse, un espíritu de la granja que protegía a los animales y el granero a cambio de un plato de gachas cada noche, tradición que se fusionó con la figura moderna de Santa Claus a lo largo del siglo XX.|Le julenisse est issu d'une ancienne croyance populaire en un nisse, un esprit de ferme protégeant les animaux et la grange en échange d'un bol de bouillie chaque soir, tradition qui fusionna avec la figure moderne du Père Noël au cours du XXe siècle.|ユーレニッセは、家畜と納屋を守る代わりに毎晩お粥の椀をもらう農場の精霊「ニッセ」という古い民間信仰から生まれた。20世紀を通じて、この伝統は現代のサンタクロース像と混ざり合っていった。",
  ),
  q(
    6,
    "Norway's official count of islands along its coast is remarkably high. Roughly how many islands does the country have?|El recuento oficial de islas de Noruega a lo largo de su costa es extraordinariamente alto. ¿Cuántas islas tiene aproximadamente el país?|Le décompte officiel des îles le long de la côte norvégienne est remarquablement élevé. Combien d'îles compte le pays, environ ?|ノルウェーの沿岸にある島の公式な数は、驚くほど多い。この国にはおよそ何個の島があるか?",
    [
      "Over 200,000|Más de 200.000|Plus de 200 000|20万を超える",
      "About 2,000|Unas 2.000|Environ 2 000|およそ2000",
      "About 20,000|Unas 20.000|Environ 20 000|およそ2万",
    ],
    0,
    "A 2010s government mapping project using new technology to count even the smallest skerries put the total above 239,000 islands, most of them uninhabited outcrops of bare rock.|Un proyecto cartográfico gubernamental de la década de 2010, que usó nueva tecnología para contar hasta los escollos más pequeños, situó el total en más de 239.000 islas, la mayoría afloramientos de roca desnuda y deshabitados.|Un projet cartographique gouvernemental des années 2010, utilisant une nouvelle technologie pour recenser jusqu'aux plus petits écueils, a établi le total à plus de 239 000 îles, la plupart des affleurements de roche nue inhabités.|2010年代の政府による地図作成事業は、新しい技術でごく小さな岩礁まで数え上げ、島の総数は23万9千を超えるとした。その大半は人の住まない、むき出しの岩の小島である。",
  ),
  // ---------------------------------------------------------------------
  // 仕上げ(言語・王室・サーミ・現代文化、難易度1〜8)
  // ---------------------------------------------------------------------
  q(
    2,
    "What is the official name of the Norwegian state?|¿Cuál es el nombre oficial del Estado noruego?|Quel est le nom officiel de l'État norvégien ?|ノルウェーの国家としての正式名称は何か?",
    [
      "The Kingdom of Norway|El Reino de Noruega|Le Royaume de Norvège|ノルウェー王国",
      "The Republic of Norway|La República de Noruega|La République de Norvège|ノルウェー共和国",
      "The Federation of Norway|La Federación de Noruega|La Fédération de Norvège|ノルウェー連邦",
    ],
    0,
    "Norway has been a constitutional monarchy since 1814, with the king today holding a largely ceremonial role while elected governments hold actual executive power.|Noruega es una monarquía constitucional desde 1814, y hoy el rey desempeña un papel en gran medida ceremonial, mientras que los gobiernos electos ejercen el poder ejecutivo real.|La Norvège est une monarchie constitutionnelle depuis 1814, le roi y jouant aujourd'hui un rôle largement cérémoniel, tandis que les gouvernements élus détiennent le pouvoir exécutif réel.|ノルウェーは1814年以来、立憲君主国である。今日、国王の役割はおおむね儀礼的なもので、実際の行政権は選挙で選ばれた政府が握っている。",
  ),
  q(
    6,
    "Oslo's metro system, the T-bane, holds what geographic distinction?|El sistema de metro de Oslo, el T-bane, ¿qué distinción geográfica posee?|Le système de métro d'Oslo, le T-bane, détient quelle particularité géographique ?|オスロの地下鉄「Tバーネ」は、地理的にどんな特徴を持つか?",
    [
      "It is the world's northernmost metro system|Es el metro más septentrional del mundo|C'est le métro le plus septentrional du monde|世界最北の地下鉄",
      "It is the only metro system built entirely underwater|Es el único sistema de metro construido enteramente bajo el agua|C'est le seul métro entièrement construit sous l'eau|世界で唯一、全区間が海中に建設された地下鉄",
      "It is the only metro system in the world without any tunnels|Es el único sistema de metro del mundo sin ningún túnel|C'est le seul métro au monde sans aucun tunnel|世界で唯一トンネルの無い地下鉄",
    ],
    0,
    "Much of the T-bane actually runs above ground once it leaves the city centre, climbing into the forested hills that ring Oslo, so a large share of its network is not underground at all despite the name 'metro'.|Buena parte del T-bane circula en realidad al aire libre una vez que sale del centro de la ciudad, subiendo hacia las colinas boscosas que rodean Oslo, así que una gran parte de su red no es subterránea, pese al nombre de «metro».|Une grande partie du T-bane circule en fait à l'air libre une fois sorti du centre-ville, grimpant vers les collines boisées qui entourent Oslo, si bien qu'une large part de son réseau n'est pas du tout souterraine malgré le nom de « métro ».|T-baneの多くは実際には市街地を出ると地上を走り、オスロを取り囲む森の丘へと登っていく。「メトロ」という名前にもかかわらず、路線網のかなりの部分は地下ではない。",
  ),
  q(
    6,
    "In parts of northern Norway, the Sámi language has what official status alongside Norwegian?|En zonas del norte de Noruega, ¿qué estatus oficial tiene la lengua sami junto al noruego?|Dans certaines régions du nord de la Norvège, quel statut officiel a la langue samie aux côtés du norvégien ?|ノルウェー北部の一部地域で、サーミ語はノルウェー語と並んでどのような公式な地位を持つか?",
    [
      "It is an official administrative language in designated municipalities|Es lengua administrativa oficial en municipios designados|C'est une langue administrative officielle dans des communes désignées|指定された自治体で公式な行政言語になっている",
      "It has no official recognition anywhere|No tiene ningún reconocimiento oficial en ningún sitio|Elle n'a aucune reconnaissance officielle nulle part|どこでも公式な認知を得ていない",
      "It is the sole official language of all of Norway|Es la única lengua oficial de toda Noruega|C'est la seule langue officielle de toute la Norvège|ノルウェー全土で唯一の公用語である",
    ],
    0,
    "In these municipalities, residents have the right to deal with local government and courts in Sámi, and road signs and place names are given in both Sámi and Norwegian.|En estos municipios, los residentes tienen derecho a tratar con el gobierno local y los tribunales en sami, y las señales de tráfico y los topónimos figuran tanto en sami como en noruego.|Dans ces communes, les habitants ont le droit de traiter avec l'administration locale et les tribunaux en same, et la signalisation routière et les noms de lieux sont donnés à la fois en same et en norvégien.|これらの自治体では、住民は地方自治体や裁判所とサーミ語でやり取りする権利を持ち、道路標識や地名もサーミ語とノルウェー語の両方で表記される。",
  ),
  q(
    4,
    "The Royal Palace in Oslo, the King of Norway's official residence, was completed in what century?|El Palacio Real de Oslo, residencia oficial del rey de Noruega, ¿en qué siglo se terminó de construir?|Le Palais royal d'Oslo, résidence officielle du roi de Norvège, fut achevé en quel siècle ?|ノルウェー国王の公式な住まいであるオスロの王宮は、何世紀に完成したか?",
    [
      "The 19th century|El siglo XIX|Le XIXe siècle|19世紀",
      "The 12th century|El siglo XII|Le XIIe siècle|12世紀",
      "The 21st century|El siglo XXI|Le XXIe siècle|21世紀",
    ],
    0,
    "It was built between 1824 and 1848 while Norway was still in union with Sweden, for a Swedish-Norwegian king who, in the event, only ever slept there a handful of nights.|Se construyó entre 1824 y 1848, mientras Noruega seguía en unión con Suecia, para un rey sueco-noruego que, en la práctica, solo llegó a dormir allí un puñado de noches.|Il fut construit entre 1824 et 1848, alors que la Norvège était encore unie à la Suède, pour un roi suédo-norvégien qui, en réalité, n'y dormit jamais que quelques nuits.|この宮殿は1824年から1848年にかけて、ノルウェーがまだスウェーデンと連合していた時代に、スウェーデン=ノルウェー王のために建てられた。しかし結局その王がここで眠った夜は数えるほどしかなかった。",
  ),
  q(
    5,
    "Trollstigen, a mountain road in western Norway, is famous for what engineering feature?|Trollstigen, una carretera de montaña en el oeste de Noruega, ¿por qué característica de ingeniería es famosa?|Trollstigen, une route de montagne dans l'ouest de la Norvège, est célèbre pour quelle particularité technique ?|ノルウェー西部の山岳道路トロルスティーゲンは、どんな土木的特徴で知られるか?",
    [
      "Eleven sharp hairpin bends climbing a steep mountainside|Once curvas cerradas en horquilla que suben por una ladera empinada|Onze virages en épingle serrés grimpant à flanc de montagne escarpé|急峻な山腹を登る11か所の急なヘアピンカーブ",
      "A spiral bridge that loops completely around itself|Un puente en espiral que da una vuelta completa sobre sí mismo|Un pont en spirale qui boucle complètement sur lui-même|完全に一周するらせん状の橋",
      "The steepest railway incline in Europe|La pendiente ferroviaria más pronunciada de Europa|La pente ferroviaire la plus raide d'Europe|ヨーロッパで最も急な鉄道の勾配",
    ],
    0,
    "The road is closed by snow for roughly half the year, typically opening only from late May to early October, and its narrow bends require larger vehicles to reverse and manoeuvre at several points.|La carretera permanece cerrada por la nieve durante aproximadamente medio año, y suele abrir solo de finales de mayo a principios de octubre, y sus curvas estrechas obligan a los vehículos grandes a dar marcha atrás y maniobrar en varios puntos.|La route est fermée par la neige pendant environ la moitié de l'année, n'ouvrant généralement que de fin mai à début octobre, et ses virages étroits obligent les grands véhicules à faire marche arrière et à manœuvrer à plusieurs endroits.|この道路は一年のおよそ半分、雪のため閉鎖されており、通常は5月末から10月初めにかけてしか開通しない。狭いカーブでは大型車両が何か所かでバックして切り返す必要がある。",
  ),
  q(
    5,
    "What is a 'lavvu', a traditional portable dwelling used by Sámi reindeer herders?|¿Qué es un 'lavvu', una vivienda portátil tradicional usada por los pastores de renos samis?|Qu'est-ce qu'un 'lavvu', une habitation portable traditionnelle utilisée par les éleveurs de rennes samis ?|サーミのトナカイ放牧民が使う伝統的な移動式住居「ラーヴ」とは何か?",
    [
      "A cone-shaped tent, similar in structure to a tipi|Una tienda cónica, de estructura similar a un tipi|Une tente conique, de structure similaire à un tipi|ティピーに似た円錐形のテント",
      "An underground turf-roofed house|Una casa subterránea con techo de césped|Une maison souterraine au toit de tourbe|地下に掘った芝葺き屋根の家",
      "A houseboat moored along fjords|Una casa flotante amarrada en los fiordos|Une péniche amarrée le long des fjords|フィヨルド沿いに係留される居住用の船",
    ],
    0,
    "The lavvu's design, wider and lower than a tipi, is built to withstand strong wind and to be raised or struck quickly by herders following reindeer between seasonal grazing grounds.|El diseño del lavvu, más ancho y bajo que un tipi, está pensado para resistir vientos fuertes y para que los pastores lo monten o desmonten con rapidez al seguir a los renos entre pastos estacionales.|Le lavvu, plus large et plus bas qu'un tipi, est conçu pour résister aux vents forts et pour être monté ou démonté rapidement par les éleveurs suivant les rennes entre les pâturages saisonniers.|ラーヴは、ティピーより幅広く低く作られ、強風に耐えられるよう設計されている。放牧民が季節ごとの牧草地のあいだをトナカイとともに移動する際、素早く組み立てたり畳んだりできる。",
  ),
  q(
    3,
    "What does the common Norwegian place-name element 'fjell' mean?|¿Qué significa el elemento toponímico noruego habitual 'fjell'?|Que signifie l'élément toponymique norvégien courant 'fjell' ?|ノルウェーの地名によく見られる「fjell」という要素は何を意味するか?",
    [
      "Mountain|Montaña|Montagne|山",
      "River|Río|Rivière|川",
      "Church|Iglesia|Église|教会",
    ],
    0,
    "It appears constantly across the map of Norway, in names ranging from mountains like Galdhøpiggen's home range to entire regions, and shares a root with the English word 'fell', as in the fells of northern England.|Aparece constantemente en el mapa de Noruega, en nombres que van desde montañas, como la cordillera del Galdhøpiggen, hasta regiones enteras, y comparte raíz con la palabra inglesa 'fell', como en los fells del norte de Inglaterra.|Il apparaît constamment sur la carte de la Norvège, dans des noms allant de montagnes, comme le massif du Galdhøpiggen, à des régions entières, et partage une racine avec le mot anglais 'fell', comme dans les fells du nord de l'Angleterre.|この語はノルウェーの地図のいたるところに現れ、ガルフーピゲンを擁する山群から地方全体の名前まで幅広く使われる。英語の fell(北イングランドの高地を指す語)と語源を同じくする。",
  ),
  q(
    7,
    "In the early 1990s, Norway became internationally notorious as the birthplace of an extreme music scene later linked to a wave of arson attacks on historic wooden churches. What genre was it?|A principios de los años noventa, Noruega se hizo internacionalmente conocida como cuna de una escena musical extrema, vinculada después a una ola de incendios provocados en iglesias de madera históricas. ¿Qué género era?|Au début des années 1990, la Norvège devint tristement célèbre à l'international comme berceau d'une scène musicale extrême, plus tard liée à une vague d'incendies criminels visant des églises en bois historiques. De quel genre s'agissait-il ?|1990年代初め、ノルウェーは、歴史ある木造教会への放火事件と後に結びつけられる過激な音楽シーンの発祥地として、国際的に悪名を広めた。それは何というジャンルか?",
    [
      "Black metal|Black metal|Black metal|ブラックメタル",
      "Death metal|Death metal|Death metal|デスメタル",
      "Punk rock|Punk rock|Punk rock|パンクロック",
    ],
    0,
    "Several stave churches, some centuries old, were burned by figures associated with the early scene between 1992 and 1996, a genuinely destructive chapter that the genre's global fanbase still argues over how to reckon with today.|Varias iglesias de madera, algunas centenarias, fueron incendiadas por figuras vinculadas a la escena temprana entre 1992 y 1996, un capítulo realmente destructivo sobre el que la afición mundial del género sigue debatiendo cómo posicionarse hoy.|Plusieurs églises en bois debout, certaines centenaires, furent incendiées par des figures liées à la scène naissante entre 1992 et 1996, un chapitre réellement destructeur dont le public mondial du genre débat encore aujourd'hui.|1992年から1996年にかけて、初期シーンに関わった人物たちによって、数世紀の歴史を持つ木造教会(スターヴ教会)がいくつも焼かれた。実害を伴うこの一章について、このジャンルの世界的なファンの間でも、いまだにどう受け止めるべきか議論が続いている。",
  ),
  q(
    6,
    "Sápmi, the traditional homeland of the Sámi people, spans parts of Norway and which other three countries?|Sápmi, la patria tradicional del pueblo sami, se extiende por partes de Noruega y qué otros tres países?|Le Sápmi, la patrie traditionnelle du peuple sami, s'étend sur des parties de la Norvège et de quels trois autres pays ?|サーミの人々の伝統的な故郷サプミは、ノルウェーの一部とあと3か国のどこにまたがっているか?",
    [
      "Sweden, Finland and Russia|Suecia, Finlandia y Rusia|Suède, Finlande et Russie|スウェーデン・フィンランド・ロシア",
      "Sweden, Denmark and Iceland|Suecia, Dinamarca e Islandia|Suède, Danemark et Islande|スウェーデン・デンマーク・アイスランド",
      "Finland, Estonia and Latvia|Finlandia, Estonia y Letonia|Finlande, Estonie et Lettonie|フィンランド・エストニア・ラトビア",
    ],
    0,
    "Sápmi has no fixed political border of its own and is not a sovereign state, but each of the four countries recognises some form of Sámi political representation, such as Norway's Sámi Parliament in Karasjok.|Sápmi no tiene una frontera política fija propia y no es un Estado soberano, pero cada uno de los cuatro países reconoce alguna forma de representación política sami, como el Parlamento Sami de Noruega en Karasjok.|Le Sápmi n'a pas de frontière politique fixe qui lui soit propre et n'est pas un État souverain, mais chacun des quatre pays reconnaît une forme de représentation politique samie, comme le Parlement sami de Norvège à Karasjok.|サプミには独自の固定した政治的国境が無く、主権国家でもないが、4か国それぞれが、ノルウェーのカラショークにあるサーミ議会のような、何らかの形でのサーミの政治的代表を認めている。",
  ),
  q(
    6,
    "Oslo was officially known by a different name, Kristiania (or Christiania), for over 250 years, until it reverted to 'Oslo' in what year?|Oslo se conoció oficialmente por otro nombre, Kristiania (o Christiania), durante más de 250 años, hasta que recuperó el de 'Oslo' en qué año?|Oslo fut officiellement connue sous un autre nom, Kristiania (ou Christiania), pendant plus de 250 ans, avant de reprendre le nom d'« Oslo » en quelle année ?|オスロは250年以上にわたり公式にはクリスチャニア(またはクリスティアニア)という別名で呼ばれていたが、「オスロ」の名に戻ったのは何年か?",
    [
      "1925|1925|1925|1925年",
      "1814|1814|1814|1814年",
      "1972|1972|1972|1972年",
    ],
    0,
    "The city had been renamed Christiania in the 1620s after King Christian IV rebuilt it following a fire, and only took back its older name, Oslo, on the eve of the city's supposed 900th anniversary.|La ciudad había sido rebautizada como Christiania en la década de 1620, tras la reconstrucción llevada a cabo por el rey Christian IV después de un incendio, y solo recuperó su nombre más antiguo, Oslo, en vísperas de su supuesto 900 aniversario.|La ville avait été rebaptisée Christiania dans les années 1620, après que le roi Christian IV l'eut reconstruite à la suite d'un incendie, et ne reprit son ancien nom, Oslo, qu'à la veille de son supposé neuf centième anniversaire.|この町は1620年代、火災後にクリスチャン4世が再建した際にクリスチャニアと改称されていた。もとの名オスロに戻ったのは、この町の(とされる)900周年を目前にしてのことだった。",
  ),
  q(
    6,
    "The Sámi flag, adopted in 1986, features a circle in red and blue on a field of the Sámi colours (red, green, yellow and blue). What does the circle represent?|La bandera sami, adoptada en 1986, muestra un círculo rojo y azul sobre un campo de los colores samis (rojo, verde, amarillo y azul). ¿Qué representa el círculo?|Le drapeau sami, adopté en 1986, présente un cercle rouge et bleu sur un champ aux couleurs samies (rouge, vert, jaune et bleu). Que représente ce cercle ?|1986年に制定されたサーミの旗には、サーミの色(赤・緑・黄・青)を背景に、赤と青の円が描かれている。この円は何を表すか?",
    [
      "The sun and the moon|El sol y la luna|Le soleil et la lune|太陽と月",
      "The wheel of a reindeer sled|La rueda de un trineo de renos|La roue d'un traîneau à rennes|トナカイぞりの車輪",
      "A drum used in shamanic ritual|Un tambor usado en rituales chamánicos|Un tambour utilisé dans les rituels chamaniques|シャーマンの儀式に使う太鼓",
    ],
    0,
    "The design was chosen at the 13th Sámi Conference and is deliberately shared, with only colour variations, across Sámi communities in all four countries of Sápmi rather than belonging to any single nation.|El diseño se eligió en la 13ª Conferencia Sami y se comparte deliberadamente, con solo variaciones de color, entre las comunidades samis de los cuatro países de Sápmi, sin pertenecer a ninguna nación en particular.|Le dessin fut choisi lors de la 13e conférence sami et est délibérément partagé, à quelques variations de couleur près, par les communautés samies des quatre pays du Sápmi, plutôt que d'appartenir à une seule nation.|この図案は第13回サーミ会議で選ばれ、色の違いだけで、サプミの4か国すべてのサーミ共同体で意図的に共有されている。特定の一国だけに属する旗ではない。",
  ),
  q(
    8,
    "'Buekorps', a tradition unique to Bergen, involves what?|El 'buekorps', una tradición exclusiva de Bergen, ¿qué implica?|Le 'buekorps', une tradition propre à Bergen, consiste en quoi ?|ベルゲンだけに見られる伝統「ブーエコルプス」とはどのようなものか?",
    [
      "Boys' and girls' marching corps that parade with wooden weapons and drums|Cuerpos de desfile infantiles que marchan con armas de madera y tambores|Des corps de défilé pour enfants qui paradent avec des armes en bois et des tambours|木製の武器や太鼓を持って行進する少年少女の隊列",
      "A rowing race between rival fishing crews|Una regata entre tripulaciones rivales de pesca|Une course d'aviron entre équipages de pêche rivaux|漁師の乗組員どうしが競うボートレース",
      "An annual chess tournament held on the harbourfront|Un torneo anual de ajedrez celebrado en el muelle|Un tournoi d'échecs annuel organisé sur le front de mer|港沿いで開かれる毎年恒例のチェス大会",
    ],
    0,
    "The corps date back to the nineteenth century and still recruit children as young as six, who march in formation carrying wooden rifles and spears in a tradition found almost nowhere else in Norway.|Los cuerpos se remontan al siglo XIX y todavía reclutan a niños de apenas seis años, que marchan en formación portando fusiles y lanzas de madera, una tradición que no se encuentra prácticamente en ningún otro lugar de Noruega.|Ces corps remontent au XIXe siècle et recrutent encore des enfants dès l'âge de six ans, qui défilent en formation portant fusils et lances de bois, une tradition que l'on ne retrouve presque nulle part ailleurs en Norvège.|この隊列は19世紀にさかのぼり、いまも6歳ほどの子どもたちを迎え入れ、木製の銃や槍を手に隊列を組んで行進する。ノルウェーの他の場所にはほとんど見られない伝統である。",
  ),
  q(
    1,
    "What does the Norwegian word 'takk' mean?|¿Qué significa la palabra noruega 'takk'?|Que signifie le mot norvégien 'takk' ?|ノルウェー語の「takk」はどういう意味か?",
    [
      "Thank you|Gracias|Merci|ありがとう",
      "Goodbye|Adiós|Au revoir|さようなら",
      "Please|Por favor|S'il vous plaît|お願いします",
    ],
    0,
    "Norwegians use 'takk' constantly and in combination with other words — 'takk for maten' (thanks for the food) is said routinely after meals, even in one's own home among family.|Los noruegos usan 'takk' constantemente y en combinación con otras palabras: 'takk for maten' (gracias por la comida) se dice habitualmente después de las comidas, incluso en casa, en familia.|Les Norvégiens emploient 'takk' sans cesse et en combinaison avec d'autres mots — 'takk for maten' (merci pour le repas) se dit couramment après les repas, même chez soi, en famille.|ノルウェー人は「takk」を頻繁に、また他の語と組み合わせて使う。「takk for maten(食事をありがとう)」は、家族だけの自宅の食卓でも、食後に習慣として言われる。",
  ),
  q(
    8,
    "Norway's current royal family belongs to which European royal house, the same one used by Denmark's monarchy?|La actual familia real de Noruega, ¿a qué casa real europea pertenece, la misma que usa la monarquía danesa?|La famille royale actuelle de Norvège appartient à quelle maison royale européenne, la même que celle de la monarchie danoise ?|ノルウェーの現在の王室は、デンマーク王室と同じどのヨーロッパの王家に属しているか?",
    [
      "The House of Glücksburg|La Casa de Glücksburg|La maison de Glücksbourg|グリュックスブルク家",
      "The House of Windsor|La Casa de Windsor|La maison de Windsor|ウィンザー家",
      "The House of Bernadotte|La Casa de Bernadotte|La maison de Bernadotte|ベルナドッテ家",
    ],
    0,
    "Norway's first modern king, Haakon VII, was born Prince Carl of Denmark, of the Glücksburg line, and was elected by referendum in 1905 after independence rather than inheriting the throne through Norwegian descent.|El primer rey moderno de Noruega, Haakon VII, nació como príncipe Carl de Dinamarca, de la línea Glücksburg, y fue elegido por referéndum en 1905 tras la independencia, en vez de heredar el trono por descendencia noruega.|Le premier roi moderne de la Norvège, Haakon VII, naquit prince Carl de Danemark, de la lignée Glücksbourg, et fut élu par référendum en 1905 après l'indépendance, plutôt que d'hériter du trône par filiation norvégienne.|ノルウェー最初の近代の王ホーコン7世は、グリュックスブルク家に連なるデンマークの王子カールとして生まれ、独立後の1905年、ノルウェーの血統による世襲ではなく国民投票によって選ばれて王位に就いた。",
  ),
];
