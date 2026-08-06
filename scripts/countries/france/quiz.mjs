/**
 * フランスのクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他国と同じく「フランスの外にいる一般的な人が
 * どれくらい答えられそうか」(scripts/content-overrides/quiz-difficulty.mjs 参照)。
 *   1〜3 … 知らなくても常識や推測で当たる
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 文化・歴史に踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * 選択肢は3つ。正解の位置(`a`)は偏らないよう散らしてある。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const FRANCE_QUIZ = [
  q(
    1,
    "What is the capital of France?|¿Cuál es la capital de Francia?|Quelle est la capitale de la France ?|フランスの首都は?",
    [
      "Lyon|Lyon|Lyon|リヨン",
      "Paris|París|Paris|パリ",
      "Marseille|Marsella|Marseille|マルセイユ",
    ],
    1,
    "Paris has been the seat of government for most of the past thousand years, and about one French person in five lives in the region around it.|París ha sido sede del gobierno durante casi todo el último milenio, y alrededor de uno de cada cinco franceses vive en su región.|Paris est le siège du gouvernement depuis presque mille ans, et environ un Français sur cinq habite sa région.|パリはこの千年のほとんどの期間、政府の所在地でした。フランス人の約5人に1人がその周辺地域に住んでいます。",
  ),
  q(
    1,
    "Which tower is the symbol of Paris?|¿Qué torre es el símbolo de París?|Quelle tour est le symbole de Paris ?|パリの象徴とされる塔は?",
    [
      "The Leaning Tower|La torre inclinada|La tour penchée|斜塔",
      "Big Ben|El Big Ben|Big Ben|ビッグ・ベン",
      "The Eiffel Tower|La torre Eiffel|La tour Eiffel|エッフェル塔",
    ],
    2,
    "It was built for the world fair of 1889 and was supposed to come down after twenty years; radio aerials on top saved it.|Se levantó para la exposición universal de 1889 y debía derribarse a los veinte años; las antenas de radio de su cima la salvaron.|Elle fut bâtie pour l'exposition de 1889 et devait être démontée au bout de vingt ans ; les antennes de radio l'ont sauvée.|1889年の万国博覧会のために建てられ、20年で取り壊す約束でした。頂上の無線アンテナがそれを救いました。",
  ),
  q(
    2,
    "Which of these breads is French?|¿Cuál de estos panes es francés?|Lequel de ces pains est français ?|次のうちフランスのパンは?",
    [
      "Sushi|El sushi|Le sushi|寿司",
      "Paella|La paella|La paella|パエリア",
      "The baguette|La baguette|La baguette|バゲット",
    ],
    2,
    "A law of 1993 fixes what a traditional loaf may contain: flour, water, salt and yeast, and nothing else.|Una ley de 1993 fija lo que puede llevar el pan tradicional: harina, agua, sal y levadura, nada más.|Une loi de 1993 fixe ce que peut contenir le pain de tradition : farine, eau, sel et levure, rien d'autre.|1993年の法律が「伝統的なパン」の中身を定めています。小麦粉・水・塩・酵母だけで、それ以外は入れられません。",
  ),
  q(
    2,
    "What are the three colours of the French flag?|¿Cuáles son los tres colores de la bandera francesa?|Quelles sont les trois couleurs du drapeau français ?|フランス国旗の三色は?",
    [
      "Blue, white and red|Azul, blanco y rojo|Bleu, blanc et rouge|青・白・赤",
      "Green, white and red|Verde, blanco y rojo|Vert, blanc et rouge|緑・白・赤",
      "Black, red and gold|Negro, rojo y oro|Noir, rouge et or|黒・赤・金",
    ],
    0,
    "The white was the king's colour, placed between the blue and red of the city of Paris.|El blanco era el color del rey, colocado entre el azul y el rojo de la ciudad de París.|Le blanc était la couleur du roi, placée entre le bleu et le rouge de la ville de Paris.|白は王の色で、パリ市の青と赤のあいだに置かれました。",
  ),
  q(
    2,
    "Which sea washes France's southern coast?|¿Qué mar baña la costa sur de Francia?|Quelle mer baigne la côte sud de la France ?|フランス南岸を洗う海は?",
    [
      "The Baltic|El Báltico|La Baltique|バルト海",
      "The Mediterranean|El Mediterráneo|La Méditerranée|地中海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
    ],
    1,
    "France faces both the Mediterranean and the Atlantic, and the two behave quite differently: the Mediterranean has almost no tide.|Francia da al Mediterráneo y al Atlántico, y se comportan muy distinto: el Mediterráneo casi no tiene marea.|La France donne sur la Méditerranée et sur l'Atlantique, très différents : la Méditerranée n'a presque pas de marée.|フランスは地中海と大西洋の両方に面していますが、性質はかなり違います。地中海にはほとんど潮の満ち引きがありません。",
  ),
  q(
    3,
    "What is the Louvre?|¿Qué es el Louvre?|Qu'est-ce que le Louvre ?|ルーヴルとは何?",
    [
      "A royal palace turned museum|Un palacio real convertido en museo|Un palais royal devenu musée|王宮から美術館になった建物",
      "A cathedral|Una catedral|Une cathédrale|大聖堂",
      "A railway station|Una estación de tren|Une gare|鉄道の駅",
    ],
    0,
    "It was a fortress, then a palace, and opened as a public museum in 1793 with the collections the Revolution had seized.|Fue fortaleza, luego palacio, y abrió como museo público en 1793 con las colecciones incautadas por la Revolución.|Forteresse, puis palais, il ouvrit comme musée public en 1793 avec les collections saisies par la Révolution.|要塞から宮殿になり、1793年、革命が接収した収蔵品とともに公共の美術館として開かれました。",
  ),
  q(
    3,
    "What does France's national day, 14 July, mark?|¿Qué conmemora el 14 de julio en Francia?|Que commémore le 14 juillet en France ?|7月14日のフランス国民祭が記念しているのは?",
    [
      "The end of the war in 1945|El fin de la guerra en 1945|La fin de la guerre en 1945|1945年の終戦",
      "The storming of the Bastille in 1789|La toma de la Bastilla en 1789|La prise de la Bastille en 1789|1789年のバスティーユ襲撃",
      "Napoleon's birthday|El cumpleaños de Napoleón|L'anniversaire de Napoléon|ナポレオンの誕生日",
    ],
    1,
    "There were only seven prisoners inside the Bastille that day; what the crowd had really come for was the gunpowder stored there.|Aquel día sólo había siete presos en la Bastilla; lo que buscaba la multitud era la pólvora guardada dentro.|Ce jour-là, la Bastille ne comptait que sept prisonniers ; ce que la foule venait chercher, c'était la poudre entreposée.|その日バスティーユにいた囚人はわずか7人でした。群衆の目当ては、そこに蓄えられていた火薬だったのです。",
  ),
  q(
    3,
    "Which of these drinks takes its name from a French region?|¿Cuál de estas bebidas toma su nombre de una región francesa?|Laquelle de ces boissons tient son nom d'une région française ?|次のうち、フランスの地方名がついた飲み物は?",
    [
      "Whisky|El whisky|Le whisky|ウイスキー",
      "Sake|El sake|Le saké|日本酒",
      "Champagne|El champán|Le champagne|シャンパン",
    ],
    2,
    "The name is protected by law, which is why sparkling wine made elsewhere has to be called cava, prosecco or crémant instead.|El nombre está protegido por ley, y por eso el espumoso de otros lugares tiene que llamarse cava, prosecco o crémant.|Le nom est protégé par la loi, d'où les cava, prosecco et crémant pour les mousseux venus d'ailleurs.|名前は法律で守られています。だから他所で造られた発泡ワインは、カバやプロセッコ、クレマンと名乗らなければなりません。",
  ),
  q(
    4,
    "Which mountain range divides France from Spain?|¿Qué cordillera separa Francia de España?|Quelle chaîne sépare la France de l'Espagne ?|フランスとスペインを隔てる山脈は?",
    [
      "The Alps|Los Alpes|Les Alpes|アルプス山脈",
      "The Carpathians|Los Cárpatos|Les Carpates|カルパティア山脈",
      "The Pyrenees|Los Pirineos|Les Pyrénées|ピレネー山脈",
    ],
    2,
    "The Pyrenees hold Andorra, a country of 468 km² that has been ruled jointly since 1278 by a Spanish bishop and the French head of state.|En los Pirineos está Andorra, un país de 468 km² gobernado desde 1278 conjuntamente por un obispo español y el jefe del Estado francés.|Les Pyrénées abritent l'Andorre, pays de 468 km² gouverné depuis 1278 conjointement par un évêque espagnol et le chef de l'État français.|ピレネーには面積468km²のアンドラがあります。1278年以来、スペインの司教とフランスの国家元首が共同で統治しています。",
  ),
  q(
    4,
    "Why was the Tour de France created?|¿Para qué se creó el Tour de Francia?|Pourquoi le Tour de France a-t-il été créé ?|ツール・ド・フランスは何のために始まった?",
    [
      "To sell more newspapers|Para vender más periódicos|Pour vendre plus de journaux|新聞を多く売るため",
      "To train soldiers|Para entrenar soldados|Pour entraîner les soldats|兵を鍛えるため",
      "To celebrate a royal wedding|Para celebrar una boda real|Pour célébrer un mariage royal|王家の婚礼を祝うため",
    ],
    0,
    "A sports paper launched it in 1903 to beat a rival, and its own pages were yellow — which is why the leader still wears a yellow jersey.|Un diario deportivo lo lanzó en 1903 para ganar a un rival, y sus páginas eran amarillas: por eso el líder viste de amarillo.|Un journal sportif le lança en 1903 pour battre un concurrent, et ses pages étaient jaunes : de là le maillot jaune du leader.|1903年、あるスポーツ紙が競争紙に勝つために始めました。その紙面が黄色かったので、首位の選手は今も黄色いジャージを着ます。",
  ),
  q(
    4,
    "Roughly how many kinds of cheese does France make?|¿Cuántos tipos de queso hace Francia, más o menos?|Combien de fromages différents la France produit-elle à peu près ?|フランスが作るチーズの種類は、およそどれくらい?",
    [
      "About twenty|Unos veinte|Une vingtaine|20種ほど",
      "More than a thousand|Más de mil|Plus de mille|1000種以上",
      "About a hundred|Un centenar|Une centaine|100種ほど",
    ],
    1,
    "De Gaulle joked that no one could govern a country with 246 cheeses; the real count depends on how you group them and passes a thousand.|De Gaulle bromeaba con que nadie puede gobernar un país con 246 quesos; el recuento real depende de cómo se agrupen y supera el millar.|De Gaulle plaisantait : comment gouverner un pays qui compte 246 fromages ? Le compte exact dépend du classement et dépasse le millier.|ド・ゴールは「246種のチーズがある国を治められるはずがない」と冗談を言いました。実際の数は数え方次第で、千を超えます。",
  ),
  q(
    4,
    "Which country was ruled by France until 1954?|¿Qué país estuvo bajo dominio francés hasta 1954?|Quel pays fut sous domination française jusqu'en 1954 ?|1954年までフランスの支配下にあった国は?",
    [
      "Brazil|Brasil|Le Brésil|ブラジル",
      "Vietnam|Vietnam|Le Vietnam|ベトナム",
      "Egypt|Egipto|L'Égypte|エジプト",
    ],
    1,
    "French Indochina covered today's Vietnam, Laos and Cambodia, and ended after the defeat at Dien Bien Phu.|La Indochina francesa abarcaba los actuales Vietnam, Laos y Camboya, y acabó tras la derrota de Dien Bien Phu.|L'Indochine française couvrait les actuels Vietnam, Laos et Cambodge, et prit fin après la défaite de Diên Biên Phu.|フランス領インドシナは現在のベトナム・ラオス・カンボジアにまたがり、ディエンビエンフーの敗戦で終わりました。",
  ),
  q(
    5,
    "Which king built Versailles and called himself the Sun King?|¿Qué rey construyó Versalles y se hacía llamar el Rey Sol?|Quel roi fit bâtir Versailles et se disait Roi-Soleil ?|ヴェルサイユを建て、自らを太陽王と呼んだ王は?",
    [
      "Louis XIV|Luis XIV|Louis XIV|ルイ14世",
      "Charlemagne|Carlomagno|Charlemagne|カール大帝",
      "Napoleon III|Napoleón III|Napoléon III|ナポレオン3世",
    ],
    0,
    "He moved the court out of Paris in 1682, partly so that several thousand nobles would live where he could watch them.|Trasladó la corte fuera de París en 1682, en parte para que varios miles de nobles vivieran donde él pudiera vigilarlos.|Il transféra la cour hors de Paris en 1682, en partie pour que plusieurs milliers de nobles vivent sous son regard.|1682年、彼は宮廷をパリの外へ移しました。数千の貴族を自分の目の届くところに住まわせる狙いもありました。",
  ),
  q(
    5,
    "What is a TGV?|¿Qué es un TGV?|Qu'est-ce qu'un TGV ?|TGVとは?",
    [
      "A high-speed train|Un tren de alta velocidad|Un train à grande vitesse|高速列車",
      "A cheese|Un queso|Un fromage|チーズの一種",
      "A regional parliament|Un parlamento regional|Un parlement régional|地方議会",
    ],
    0,
    "Running since 1981, it holds the record for a wheeled train on rails: 574.8 km/h, set on a test run in 2007.|En servicio desde 1981, tiene el récord de tren sobre ruedas y raíles: 574,8 km/h, en una prueba de 2007.|En service depuis 1981, il détient le record du train sur rails : 574,8 km/h, lors d'un essai en 2007.|1981年に運行を始め、鉄輪・鉄軌道の列車として時速574.8kmの記録を持ちます。2007年の試験走行でのものです。",
  ),
  q(
    5,
    "Which painter made his garden at Giverny and painted its pond for thirty years?|¿Qué pintor hizo su jardín en Giverny y pintó su estanque durante treinta años?|Quel peintre créa son jardin à Giverny et en peignit le bassin trente ans durant ?|ジヴェルニーに庭を造り、その池を三十年描き続けた画家は?",
    [
      "Picasso|Picasso|Picasso|ピカソ",
      "Monet|Monet|Monet|モネ",
      "Rembrandt|Rembrandt|Rembrandt|レンブラント",
    ],
    1,
    "He dug the pond himself and painted it about 250 times; the last canvases are nearly abstract, made as his sight was failing.|Cavó él mismo el estanque y lo pintó unas 250 veces; los últimos lienzos son casi abstractos, hechos ya con la vista fallándole.|Il creusa lui-même le bassin et le peignit environ 250 fois ; les dernières toiles, faites alors que sa vue baissait, sont presque abstraites.|池は自分で掘らせ、約250回描きました。視力を失いかけて描いた最後の作品は、ほとんど抽象画のようです。",
  ),
  q(
    5,
    "What is Mont-Saint-Michel?|¿Qué es el Mont-Saint-Michel?|Qu'est-ce que le Mont-Saint-Michel ?|モンサンミッシェルとは?",
    [
      "A volcano|Un volcán|Un volcan|火山",
      "A ski resort|Una estación de esquí|Une station de ski|スキー場",
      "An abbey on a tidal island|Una abadía en una isla de marea|Une abbaye sur un îlot soumis aux marées|潮で島になる岩の上の修道院",
    ],
    2,
    "The tide there runs out fourteen kilometres and comes back fast enough that people crossing the sand have drowned.|Allí la marea se retira catorce kilómetros y vuelve tan rápido que ha ahogado a quienes cruzaban la arena.|La marée s'y retire de quatorze kilomètres et revient assez vite pour avoir noyé des marcheurs.|そこでは潮が14km引き、砂の上を渡る人が溺れるほどの速さで戻ってきます。",
  ),
  q(
    5,
    "What began in France in 1789?|¿Qué comenzó en Francia en 1789?|Qu'a commencé en France en 1789 ?|1789年のフランスで始まったことは?",
    [
      "The Revolution|La Revolución|La Révolution|革命",
      "Membership of the European Union|La entrada en la Unión Europea|L'entrée dans l'Union européenne|欧州連合への加盟",
      "The founding of Paris|La fundación de París|La fondation de Paris|パリの建設",
    ],
    0,
    "Within two years the country had abolished feudal privilege and written a declaration of rights that was copied all over Europe.|En dos años el país abolió los privilegios feudales y redactó una declaración de derechos que se copió por toda Europa.|En deux ans, le pays abolit les privilèges féodaux et rédigea une déclaration des droits copiée dans toute l'Europe.|わずか2年のうちに封建的特権が廃され、ヨーロッパ中で写し取られることになる人権宣言が書かれました。",
  ),
  q(
    6,
    "What is unusual about Strasbourg's recent history?|¿Qué tiene de particular la historia reciente de Estrasburgo?|Qu'a de particulier l'histoire récente de Strasbourg ?|ストラスブールの近い過去で変わっている点は?",
    [
      "It has no cars|No tiene coches|Elle n'a pas de voitures|自動車が無い",
      "It changed country four times between 1870 and 1945|Cambió de país cuatro veces entre 1870 y 1945|Elle a changé de pays quatre fois entre 1870 et 1945|1870年から1945年に四度も国籍が変わった",
      "It is built on stilts|Está construida sobre pilotes|Elle est bâtie sur pilotis|高床の上に建っている",
    ],
    1,
    "Alsace passed back and forth between France and Germany, and the European Parliament sits in Strasbourg partly as a sign that this is over.|Alsacia pasó de Francia a Alemania y viceversa, y el Parlamento Europeo se reúne allí en parte como señal de que eso terminó.|L'Alsace passa d'un pays à l'autre, et le Parlement européen siège à Strasbourg en partie pour marquer que c'est fini.|アルザスはフランスとドイツのあいだを行き来しました。欧州議会がここに置かれているのは、それが終わったことを示す意味もあります。",
  ),
  q(
    6,
    "What must a shop do in France to call itself a boulangerie?|¿Qué debe hacer una tienda en Francia para llamarse boulangerie?|Que doit faire un commerce français pour s'appeler boulangerie ?|フランスで「ブーランジュリー」を名乗るには何が要る?",
    [
      "Open on Sundays|Abrir los domingos|Ouvrir le dimanche|日曜に開けること",
      "Sell only white bread|Vender sólo pan blanco|Ne vendre que du pain blanc|白パンだけを売ること",
      "Knead and bake its bread on the premises|Amasar y hornear su pan en el local|Pétrir et cuire son pain sur place|店内で捏ねて焼くこと",
    ],
    2,
    "A law of 1998 reserves the word for shops that mix, shape and bake on site; anywhere reheating frozen dough has to be called something else.|Una ley de 1998 reserva la palabra a quien amasa, forma y cuece en el local; quien sólo recalienta masa congelada debe llamarse de otro modo.|Une loi de 1998 réserve le mot à qui pétrit, façonne et cuit sur place ; ceux qui réchauffent du surgelé doivent s'appeler autrement.|1998年の法律により、この語は生地を捏ね、成形し、店で焼く店だけのものです。冷凍生地を温めるだけの店は別の名を使わねばなりません。",
  ),
  q(
    6,
    "What is the Camargue?|¿Qué es la Camarga?|Qu'est-ce que la Camargue ?|カマルグとは?",
    [
      "A mountain pass|Un puerto de montaña|Un col de montagne|山の峠",
      "A wetland of white horses and flamingos|Un humedal de caballos blancos y flamencos|Une zone humide de chevaux blancs et de flamants|白い馬とフラミンゴの湿地",
      "A kind of pastry|Un tipo de pastel|Une pâtisserie|菓子の一種",
    ],
    1,
    "It is the delta of the Rhône, and most of the rice eaten in France is grown on its reclaimed salt marsh.|Es el delta del Ródano, y en sus marismas ganadas al agua se cultiva casi todo el arroz que se come en Francia.|C'est le delta du Rhône, et l'essentiel du riz mangé en France pousse sur ses marais asséchés.|ローヌ川の三角州で、フランスで食べられる米の大半が、その干拓された塩沼で作られています。",
  ),
  q(
    6,
    "What is the Bayeux Tapestry?|¿Qué es el Tapiz de Bayeux?|Qu'est-ce que la tapisserie de Bayeux ?|バイユーのタピスリーとは?",
    [
      "A Persian carpet|Una alfombra persa|Un tapis persan|ペルシャ絨毯",
      "A stained-glass window|Una vidriera|Un vitrail|色硝子の窓",
      "A 70-metre embroidery of the Norman conquest|Un bordado de 70 metros sobre la conquista normanda|Une broderie de 70 mètres sur la conquête normande|ノルマン征服を描いた全長70mの刺繍",
    ],
    2,
    "It is embroidery rather than tapestry — wool stitched on linen — and was probably made in England within twenty years of 1066.|Es bordado, no tapiz: lana cosida sobre lino, hecho probablemente en Inglaterra menos de veinte años después de 1066.|C'est une broderie et non une tapisserie — laine sur lin — sans doute réalisée en Angleterre moins de vingt ans après 1066.|織物ではなく刺繍で、麻布に羊毛を縫いつけたものです。1066年から20年以内に、おそらくイングランドで作られました。",
  ),
  q(
    6,
    "What are the caves of Lascaux known for?|¿Por qué son conocidas las cuevas de Lascaux?|Pourquoi la grotte de Lascaux est-elle connue ?|ラスコーの洞窟は何で知られる?",
    [
      "Cave paintings about 17,000 years old|Pinturas rupestres de unos 17.000 años|Des peintures d'environ 17 000 ans|約1万7千年前の壁画",
      "Roman baths|Unas termas romanas|Des thermes romains|ローマ時代の浴場",
      "A wine cellar|Una bodega de vino|Une cave à vin|ワインの貯蔵庫",
    ],
    0,
    "The original was closed in 1963 because visitors' breath was growing algae over the paintings; what people see today is a full-size copy.|La original se cerró en 1963 porque el aliento de los visitantes hacía crecer algas sobre las pinturas; hoy se visita una copia a tamaño real.|L'original fut fermé en 1963 parce que le souffle des visiteurs faisait pousser des algues sur les peintures ; on visite aujourd'hui un fac-similé.|来訪者の呼気が壁画に藻を生やしたため、本物は1963年に閉じられました。いま見られるのは実物大の複製です。",
  ),
  q(
    7,
    "Where does the word denim come from?|¿De dónde viene la palabra denim?|D'où vient le mot denim ?|denim(デニム)という語の由来は?",
    [
      "A dye brought from Denmark|Un tinte traído de Dinamarca|Une teinture venue du Danemark|デンマークから来た染料",
      "A tailor named Denim|Un sastre llamado Denim|Un tailleur nommé Denim|デニムという名の仕立屋",
      "Serge de Nîmes, a cloth woven at Nîmes|Serge de Nîmes, una tela tejida en Nimes|La serge de Nîmes, une étoffe tissée à Nîmes|ニームで織られた布 serge de Nîmes",
    ],
    2,
    "The indigo that goes with it has its own French story: a blue dye called pastel, grown around Toulouse, paid for that city's brick mansions.|El índigo que lo acompaña tiene su propia historia francesa: el pastel, un tinte azul cultivado cerca de Toulouse, pagó las casonas de ladrillo de esa ciudad.|L'indigo qui l'accompagne a son histoire française : le pastel, teinture bleue cultivée autour de Toulouse, a payé les hôtels de brique de la ville.|合わせて使われる藍にもフランスの話があります。トゥールーズ周辺で作られた青い染料パステルが、あの街の煉瓦の豪邸を建てさせました。",
  ),
  q(
    7,
    "What did the Edict of Nantes do in 1598?|¿Qué hizo el Edicto de Nantes en 1598?|Que fit l'édit de Nantes en 1598 ?|1598年のナントの勅令は何をした?",
    [
      "Founded the French navy|Fundó la marina francesa|Fonda la marine française|フランス海軍を創設した",
      "Gave Protestants the right to worship|Dio a los protestantes derecho de culto|Accorda aux protestants le droit de culte|プロテスタントに礼拝の権利を与えた",
      "Abolished the monarchy|Abolió la monarquía|Abolit la monarchie|王政を廃した",
    ],
    1,
    "Louis XIV revoked it in 1685, and several hundred thousand Protestants left the country, taking their trades to Holland, England and Prussia.|Luis XIV lo revocó en 1685, y varios cientos de miles de protestantes se fueron, llevando sus oficios a Holanda, Inglaterra y Prusia.|Louis XIV le révoqua en 1685, et plusieurs centaines de milliers de protestants partirent, emportant leurs métiers en Hollande, en Angleterre et en Prusse.|1685年、ルイ14世がこれを取り消すと、数十万のプロテスタントが技術ごとオランダ・イングランド・プロイセンへ去りました。",
  ),
  q(
    7,
    "What is a traboule in Lyon?|¿Qué es una traboule en Lyon?|Qu'est-ce qu'une traboule à Lyon ?|リヨンのトラブールとは?",
    [
      "A river barge|Una barcaza fluvial|Une péniche|川を行く艀",
      "A covered passage cut through the buildings|Un pasaje cubierto abierto a través de los edificios|Un passage couvert percé à travers les immeubles|建物を貫く屋根付きの抜け道",
      "A kind of sausage|Un tipo de embutido|Une sorte de saucisse|腸詰の一種",
    ],
    1,
    "Silk workers used them to carry cloth across the hill without wetting it; the Resistance later used the same passages to disappear.|Los sederos las usaban para cruzar la colina sin mojar la tela; la Resistencia usó después esos mismos pasajes para esfumarse.|Les canuts s'en servaient pour traverser la colline sans mouiller la soie ; la Résistance les utilisa ensuite pour disparaître.|絹織工は反物を濡らさず丘を越えるために使い、のちにレジスタンスは同じ通路を姿をくらますのに使いました。",
  ),
  q(
    7,
    "Which French invention lets blind people read with their fingers?|¿Qué invento francés permite leer con los dedos?|Quelle invention française permet de lire du bout des doigts ?|指で読むためのフランス生まれの仕組みは?",
    [
      "Braille|El braille|Le braille|点字(ブライユ)",
      "Morse code|El código morse|Le morse|モールス符号",
      "Shorthand|La taquigrafía|La sténographie|速記",
    ],
    0,
    "Louis Braille, blinded at three, adapted a military code for reading in the dark and had finished his own system by the age of fifteen.|Louis Braille, ciego desde los tres años, adaptó un código militar para leer a oscuras y terminó su sistema a los quince.|Louis Braille, aveugle à trois ans, adapta un code militaire fait pour lire dans le noir et acheva son système à quinze ans.|3歳で失明したルイ・ブライユは、暗闇で読むための軍用符号を作り替え、15歳で自分の方式を完成させました。",
  ),
  q(
    7,
    "What does AOC mean on a French label?|¿Qué significa AOC en una etiqueta francesa?|Que signifie AOC sur une étiquette française ?|フランスの表示にあるAOCとは?",
    [
      "A tax band|Un tramo fiscal|Une tranche d'imposition|税率の区分",
      "An award for exporters|Un premio a la exportación|Un prix à l'exportation|輸出企業への表彰",
      "A rule tying a product to a place and a method|Una norma que liga un producto a un lugar y un método|Une règle liant un produit à un lieu et à une méthode|産地と製法を品物に結びつける規則",
    ],
    2,
    "The system began with wine in 1935, after fraud and vine disease had wrecked trust, and now covers cheese, butter, lentils and much more.|El sistema empezó con el vino en 1935, tras el fraude y la filoxera, y hoy cubre quesos, mantequillas, lentejas y mucho más.|Le système commença avec le vin en 1935, après la fraude et le phylloxéra, et couvre aujourd'hui fromages, beurres, lentilles et bien d'autres produits.|この仕組みは、不正と葡萄の病害で信用が崩れた後の1935年にワインから始まりました。今ではチーズ・バター・レンズ豆にまで及びます。",
  ),
  q(
    8,
    "Why does Carcassonne have pointed slate roofs on its towers?|¿Por qué tiene Carcasona tejados puntiagudos de pizarra?|Pourquoi les tours de Carcassonne ont-elles des toits d'ardoise en pointe ?|カルカソンヌの塔がとがったスレート屋根なのはなぜ?",
    [
      "They are the original medieval roofs|Son los tejados medievales originales|Ce sont les toits médiévaux d'origine|中世からの本来の屋根だから",
      "A 19th-century restorer put them there|Los puso un restaurador del siglo XIX|Un restaurateur du XIXe siècle les a posés|19世紀の修復家がそう葺いたから",
      "They keep the sand out|Para que no entre la arena|Pour empêcher le sable d'entrer|砂の侵入を防ぐため",
    ],
    1,
    "Viollet-le-Duc saved the town from demolition in the 1850s, but roofed it in a northern style that historians still argue does not belong there.|Viollet-le-Duc la salvó del derribo en los años 1850, pero la cubrió a la manera del norte, algo que los historiadores siguen discutiendo.|Viollet-le-Duc la sauva de la démolition dans les années 1850, mais la coiffa à la mode du Nord, ce que les historiens contestent encore.|ヴィオレ・ル・デュクは1850年代にこの町を取り壊しから救いましたが、北国風の屋根をかけました。歴史家は今もそれを議論しています。",
  ),
  q(
    8,
    "What did the architect Auguste Perret do to Le Havre after 1945?|¿Qué hizo el arquitecto Auguste Perret con El Havre tras 1945?|Qu'a fait l'architecte Auguste Perret du Havre après 1945 ?|建築家オーギュスト・ペレは1945年以降のル・アーヴルに何をした?",
    [
      "Rebuilt the whole centre in reinforced concrete|Reconstruyó todo el centro en hormigón armado|Il rebâtit tout le centre en béton armé|中心部を丸ごと鉄筋コンクリートで建て直した",
      "Moved the city inland|Trasladó la ciudad tierra adentro|Il déplaça la ville dans les terres|街を内陸へ移した",
      "Turned it over to farmland|La convirtió en campo de cultivo|Il la rendit aux champs|農地に戻した",
    ],
    0,
    "The bombing had flattened the centre in September 1944; the rebuilt city is one of very few 20th-century centres on the World Heritage list.|Los bombardeos habían arrasado el centro en septiembre de 1944; la ciudad rehecha es uno de los poquísimos centros del siglo XX en el Patrimonio Mundial.|Les bombardements avaient rasé le centre en septembre 1944 ; la ville reconstruite est l'un des très rares centres du XXe siècle au patrimoine mondial.|1944年9月の爆撃で中心部は消えました。建て直された街は、20世紀の市街地としては数少ない世界遺産のひとつです。",
  ),
  q(
    8,
    "Which part of France is an island in the Mediterranean?|¿Qué parte de Francia es una isla del Mediterráneo?|Quelle partie de la France est une île de la Méditerranée ?|フランスのうち、地中海に浮かぶ島は?",
    [
      "Corsica|Córcega|La Corse|コルシカ",
      "Normandy|Normandía|La Normandie|ノルマンディ",
      "Provence|Provenza|La Provence|プロヴァンス",
    ],
    0,
    "Genoa sold it to France in 1768, a year before Napoleon was born there; until then it had governed itself under a constitution of its own.|Génova se la vendió a Francia en 1768, un año antes de que naciera allí Napoleón; hasta entonces se gobernaba con una constitución propia.|Gênes la vendit à la France en 1768, un an avant la naissance de Napoléon ; jusque-là elle se gouvernait sous sa propre constitution.|1768年、ジェノヴァがフランスに売り渡し、その翌年ナポレオンがここで生まれました。それまでは自前の憲法のもとで自治をしていました。",
  ),
  q(
    8,
    "What is the angels' share?|¿Qué es la parte de los ángeles?|Qu'est-ce que la part des anges ?|「天使の取り分」とは?",
    [
      "A church tax|Un impuesto eclesiástico|Un impôt d'Église|教会への税",
      "Spirit lost to evaporation while it ages|El aguardiente que se evapora al envejecer|L'eau-de-vie perdue par évaporation pendant le vieillissement|熟成中に蒸発して失われる酒",
      "The top layer of a cake|La capa superior de un pastel|La couche du dessus d'un gâteau|菓子のいちばん上の層",
    ],
    1,
    "In Cognac about two per cent of each barrel goes each year, and the alcohol in the air feeds a black fungus that stains the walls of the whole town.|En Cognac se va cerca del dos por ciento de cada barrica al año, y el alcohol en el aire alimenta un hongo negro que tizna las paredes del pueblo.|À Cognac, environ deux pour cent de chaque fût s'en va chaque année, et l'alcool dans l'air nourrit un champignon noir qui noircit les murs de la ville.|コニャックでは樽の中身が毎年2%ほど失われます。空気中のアルコールを養分に黒い菌が育ち、町中の壁を黒く染めます。",
  ),
  q(
    8,
    "What is a Vauban citadel?|¿Qué es una ciudadela de Vauban?|Qu'est-ce qu'une citadelle de Vauban ?|ヴォーバンの城塞とは?",
    [
      "A lighthouse|Un faro|Un phare|灯台",
      "A monastery|Un monasterio|Un monastère|修道院",
      "A star-shaped fort laid out against cannon|Un fuerte en estrella pensado contra la artillería|Un fort en étoile conçu contre le canon|大砲に備えた星形の要塞",
    ],
    2,
    "Vauban built or rebuilt about 160 of them along France's borders in the 17th century; twelve of the sites are now on the World Heritage list.|Vauban construyó o rehízo unas 160 en las fronteras francesas del siglo XVII; doce de esos sitios están hoy en el Patrimonio Mundial.|Vauban en bâtit ou en refit environ 160 aux frontières du royaume au XVIIe siècle ; douze de ces sites sont aujourd'hui au patrimoine mondial.|ヴォーバンは17世紀、国境沿いにおよそ160の要塞を築くか造り直しました。うち12か所が今は世界遺産です。",
  ),
  q(
    9,
    "What is unusual about the cathedral at Metz?|¿Qué tiene de excepcional la catedral de Metz?|Qu'a d'exceptionnel la cathédrale de Metz ?|メスの大聖堂の際立った点は?",
    [
      "It has no roof|No tiene tejado|Elle n'a pas de toit|屋根が無い",
      "It is underground|Está bajo tierra|Elle est souterraine|地下にある",
      "It carries more stained glass than any church in the world|Tiene más vidrieras que ninguna iglesia del mundo|Elle porte plus de vitraux qu'aucune église au monde|世界のどの教会より色硝子が多い",
    ],
    2,
    "Its 6,500 square metres of glass include 20th-century windows by Chagall set among the medieval ones; locals call it the Good Lord's lantern.|Sus 6.500 metros cuadrados de vidrio incluyen ventanas de Chagall junto a las medievales; allí la llaman la linterna del Buen Dios.|Ses 6 500 mètres carrés de verre comprennent des verrières de Chagall parmi les médiévales ; on l'appelle la lanterne du Bon Dieu.|6500m²の硝子には、中世の窓に混じって20世紀のシャガールの作もあります。地元では「神さまの提灯」と呼ばれます。",
  ),
  q(
    9,
    "Which French city has taught medicine without a break since about 1220?|¿Qué ciudad francesa enseña medicina sin interrupción desde hacia 1220?|Quelle ville française enseigne la médecine sans interruption depuis 1220 environ ?|1220年頃から途切れず医学を教え続けているフランスの都市は?",
    [
      "Montpellier|Montpellier|Montpellier|モンペリエ",
      "Nice|Niza|Nice|ニース",
      "Le Havre|El Havre|Le Havre|ル・アーヴル",
    ],
    0,
    "Its physic garden, planted in 1593 to grow specimens for those lectures, is the oldest botanical garden in France.|Su jardín de plantas medicinales, sembrado en 1593 para aquellas clases, es el jardín botánico más antiguo de Francia.|Son jardin des plantes, semé en 1593 pour fournir ces cours, est le plus ancien jardin botanique de France.|講義用の標本を育てるため1593年に作られた薬草園は、フランス最古の植物園です。",
  ),
  q(
    9,
    "Which city has held the same festival every 8 May since 1430?|¿Qué ciudad celebra la misma fiesta cada 8 de mayo desde 1430?|Quelle ville fête la même chose chaque 8 mai depuis 1430 ?|1430年から毎年5月8日に同じ祭りを続けている街は?",
    [
      "Dijon|Dijon|Dijon|ディジョン",
      "Orléans|Orleans|Orléans|オルレアン",
      "Toulon|Tolón|Toulon|トゥーロン",
    ],
    1,
    "It marks Joan of Arc breaking the English siege in nine days in 1429, and is among the longest-running festivals in Europe.|Recuerda que Juana de Arco rompió el asedio inglés en nueve días en 1429, y es de las fiestas más antiguas de Europa que siguen vivas.|Elle rappelle que Jeanne d'Arc leva le siège anglais en neuf jours en 1429, et compte parmi les plus anciennes fêtes d'Europe.|1429年、ジャンヌ・ダルクが九日でイングランド軍の包囲を破ったことを記念するもので、ヨーロッパで最も長く続く祭りのひとつです。",
  ),
  q(
    9,
    "What is a bastide in south-west France?|¿Qué es una bastida en el suroeste de Francia?|Qu'est-ce qu'une bastide dans le Sud-Ouest ?|南西フランスのバスティードとは?",
    [
      "A planned new town of the 13th and 14th centuries|Una villa nueva planificada de los siglos XIII y XIV|Une ville neuve planifiée des XIIIe et XIVe siècles|13〜14世紀に計画的に造られた新しい町",
      "A type of bread|Un tipo de pan|Une sorte de pain|パンの一種",
      "A river ferry|Una barca de paso|Un bac|渡し船",
    ],
    0,
    "Several hundred were laid out on a grid around a covered market square, to settle empty land and collect taxes after the wars against the Cathars.|Se trazaron varios centenares en cuadrícula alrededor de una plaza porticada, para poblar tierras vacías y cobrar impuestos tras las guerras cátaras.|Plusieurs centaines furent tracées en damier autour d'une place à couverts, pour peupler des terres vides et lever l'impôt après les guerres cathares.|カタリ派との戦いのあと、空いた土地に人を入れて税を取るため、市場の広場を中心に碁盤目状の町が数百も造られました。",
  ),
  q(
    10,
    "What is a calanque?|¿Qué es una calanque?|Qu'est-ce qu'une calanque ?|カランクとは?",
    [
      "A Provençal dance|Una danza provenzal|Une danse provençale|プロヴァンスの踊り",
      "A steep limestone inlet on the Mediterranean coast|Una cala estrecha entre acantilados de caliza|Une crique encaissée entre falaises calcaires|石灰岩の断崖が切れ込む入り江",
      "A goat cheese|Un queso de cabra|Un fromage de chèvre|山羊乳のチーズ",
    ],
    1,
    "Between Marseille and Cassis they cut twenty kilometres into the cliffs, and one of them hides a painted cave whose entrance now lies 37 metres underwater.|Entre Marsella y Cassis recortan veinte kilómetros de acantilado, y una esconde una cueva pintada cuya entrada está hoy a 37 metros bajo el agua.|Entre Marseille et Cassis, elles entaillent vingt kilomètres de falaises, et l'une abrite une grotte ornée dont l'entrée est aujourd'hui à 37 mètres sous l'eau.|マルセイユとカシスの間で20kmにわたって断崖を刻んでいます。そのひとつには、入口が水深37mに沈んだ壁画の洞窟が隠れています。",
  ),
  q(
    10,
    "What do the Compagnons du Devoir do?|¿Qué hacen los Compagnons du Devoir?|Que font les Compagnons du Devoir ?|コンパニョン・デュ・ドヴォワールは何をする?",
    [
      "They run the state railways|Gestionan los ferrocarriles del Estado|Ils exploitent les chemins de fer|国有鉄道を運営する",
      "They judge wine competitions|Juzgan concursos de vino|Ils jugent les concours de vin|ワインの品評会を審査する",
      "They train craftsmen who move from town to town|Forman artesanos que van de ciudad en ciudad|Ils forment des artisans qui vont de ville en ville|町から町へ渡り歩く職人を育てる",
    ],
    2,
    "An apprentice spends years on a tour of France, living in a different house and working under a different master in each town; the guild dates back to the Middle Ages.|El aprendiz pasa años recorriendo Francia, viviendo en otra casa y con otro maestro en cada ciudad; el gremio viene de la Edad Media.|L'apprenti passe des années sur son Tour de France, logé ailleurs et formé par un autre maître dans chaque ville ; la confrérie remonte au Moyen Âge.|徒弟は数年をかけてフランスを巡り、町ごとに別の宿と別の親方のもとで働きます。この職人組合は中世にさかのぼります。",
  ),
  q(
    10,
    "What is Saint-Pierre-et-Miquelon?|¿Qué es San Pedro y Miquelón?|Qu'est-ce que Saint-Pierre-et-Miquelon ?|サンピエール島・ミクロン島とは?",
    [
      "Islands off Canada that stayed French|Unas islas junto a Canadá que siguieron francesas|Des îles au large du Canada restées françaises|カナダ沖に残ったフランスの島",
      "A district of Paris|Un barrio de París|Un quartier de Paris|パリの一地区",
      "A peak in the Alps|Una cumbre de los Alpes|Un sommet des Alpes|アルプスの峰",
    ],
    0,
    "Eight small islands south of Newfoundland, 25 km from Canada, are all that is left of New France; they used the French franc until the euro arrived.|Ocho islas pequeñas al sur de Terranova, a 25 km de Canadá, son lo único que queda de Nueva Francia; usaron el franco francés hasta la llegada del euro.|Huit petites îles au sud de Terre-Neuve, à 25 km du Canada, sont tout ce qui reste de la Nouvelle-France ; elles ont utilisé le franc jusqu'à l'euro.|ニューファンドランドの南、カナダから25kmに浮かぶ8つの小島で、ヌーヴェル・フランスの唯一の名残です。ユーロが来るまでフランス・フランを使っていました。",
  ),
  q(
    10,
    "What is the Passage du Gois?|¿Qué es el Passage du Gois?|Qu'est-ce que le passage du Gois ?|パサージュ・デュ・ゴワとは?",
    [
      "A tunnel under the Alps|Un túnel bajo los Alpes|Un tunnel sous les Alpes|アルプスを貫くトンネル",
      "A covered arcade in Paris|Una galería cubierta de París|Un passage couvert parisien|パリの屋根付き商店街",
      "A road to an island that the tide covers twice a day|Una carretera a una isla que la marea cubre dos veces al día|Une route vers une île que la marée recouvre deux fois par jour|一日に二度、潮に沈む島への道",
    ],
    2,
    "The 4.2 km causeway to the island of Noirmoutier goes under four metres of water; rescue towers stand along it for drivers who misjudge the timing.|La calzada de 4,2 km hacia la isla de Noirmoutier queda bajo cuatro metros de agua; a lo largo hay torres de rescate para quien calcula mal la hora.|La chaussée de 4,2 km vers Noirmoutier passe sous quatre mètres d'eau ; des balises-refuges y attendent ceux qui se trompent d'heure.|ノワールムーティエ島へ渡る4.2kmの道は、水深4mの下に沈みます。時刻を読み違えた運転者のため、道沿いに避難塔が立っています。",
  ),
];
