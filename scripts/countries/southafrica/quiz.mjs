/**
 * 南アフリカのクイズ(101問。難易度1〜10のすべての帯で目安件数を満たす)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける(26問)
 *   4〜6 … 旅行したり少し調べたことがあれば分かる(45問)
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る(20問)
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい(10問)
 * (2026-08-20実測)
 *
 * 41都市カードが扱う具体的な事実(ソウェトの通勤鉄道・カールトンビルの
 * 出稼ぎ労働・プレトリアのジャカランダ・キンバリーの手掘りの穴・
 * アウツホールンの羽根成金など)は、答えとしては問わない。地理・自然・
 * スポーツ・音楽・食・現代政治のように、都市カードが触れていない主題を選んだ。
 *
 * **`scripts/countries/africa/quiz.mjs`(103問)の南アフリカ関連の問いとも
 * 重ならないことを確認済み。**通貨(Q13・ランド)・国歌の言語数(Q78・
 * 5言語)・3つの首都(Q46・行政/立法/司法を分ける国)の3問と一字一句
 * 重複していたため、国花/クリケットの愛称・ディストリクト・シックスの
 * 強制移住・(3つの首都の代案は不採用にして)別の題材に差し替えた。
 * このほか、27年間の投獄・ロベン島・ウブントゥ・デズモンド・ツツの
 * ノーベル賞・アパルトヘイトの語源・クリック音・ンデベレ/ズールー語族・
 * アフリカペンギン・ルイボス・ピリピリもアフリカ盤に既出のため避けている。
 *
 * 難易度9〜10の10問は、それぞれ別の題材(ディストリクト・シックス/
 * ソフィアタウン/リヴォニア裁判/国歌の作曲者/コンスティテューション・
 * ヒル/SSメンディ号/ファナカロ/スティーブ・ビコ/マリカナ/SSワラター号)
 * で重なりを避けている。確度の低いものは無く、いずれも広く記録された事実。
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

export const SOUTHAFRICA_QUIZ = [
  q(
    4,
    "Which flower is South Africa's national flower, and also gives the national cricket team its nickname?|¿Qué flor es la flor nacional de Sudáfrica, y también da su apodo al equipo nacional de críquet?|Quelle fleur est la fleur nationale de l'Afrique du Sud, et donne aussi son surnom à l'équipe nationale de cricket ?|南アフリカの国花で、ナショナルクリケットチームの愛称の由来にもなっている花は?",
    [
      "The protea|La protea|Le protéa|プロテア",
      "The lotus|El loto|Le lotus|ハス",
      "The hibiscus|El hibisco|L'hibiscus|ハイビスカス",
    ],
    0,
    "The king protea was declared South Africa's national flower in 1976, and the national cricket team has been nicknamed the Proteas since the country was readmitted to international cricket in 1991 after decades of a sporting boycott over apartheid.|La protea real fue declarada flor nacional de Sudáfrica en 1976, y la selección nacional de críquet se apoda los Proteas desde que el país fue readmitido en el críquet internacional en 1991 tras décadas de boicot deportivo por el apartheid.|Le protéa royal fut déclaré fleur nationale de l'Afrique du Sud en 1976, et l'équipe nationale de cricket est surnommée les Proteas depuis la réadmission du pays au cricket international en 1991, après des décennies de boycott sportif lié à l'apartheid.|キングプロテアは1976年に南アフリカの国花に定められ、ナショナルクリケットチームは1991年、アパルトヘイトを理由にした数十年の競技ボイコットを経て国際クリケット界に復帰して以来「プロテアス」の愛称で呼ばれている。",
  ),
  q(
    5,
    "Which sport was South Africa's national team playing when Nelson Mandela famously wore their jersey to present the trophy at the 1995 World Cup final?|¿Qué deporte jugaba la selección sudafricana cuando Nelson Mandela lució su camiseta, en un gesto célebre, al entregar el trofeo de la final del Mundial de 1995?|Quel sport l'équipe nationale sud-africaine jouait-elle quand Nelson Mandela porta célèbrement son maillot pour remettre le trophée de la finale de la Coupe du monde 1995 ?|1995年ワールドカップ決勝で、ネルソン・マンデラが代表チームのジャージを着てトロフィーを渡したことで知られる競技は?",
    [
      "Rugby|Rugby|Rugby|ラグビー",
      "Cricket|Críquet|Cricket|クリケット",
      "Football|Fútbol|Football|サッカー",
    ],
    0,
    "South Africa hosted and won the 1995 Rugby World Cup a year after its first fully democratic election, and Mandela's decision to wear the number 6 jersey of captain Francois Pienaar, in a sport long associated with the white Afrikaner establishment, is still cited as a deliberate act of reconciliation.|Sudáfrica organizó y ganó la Copa Mundial de Rugby de 1995, un año después de sus primeras elecciones plenamente democráticas, y la decisión de Mandela de lucir la camiseta número 6 del capitán Francois Pienaar, en un deporte largamente asociado a la élite afrikáner blanca, sigue citándose como un gesto deliberado de reconciliación.|L'Afrique du Sud accueillit et remporta la Coupe du monde de rugby 1995, un an après ses premières élections pleinement démocratiques, et la décision de Mandela de porter le maillot numéro 6 du capitaine Francois Pienaar, dans un sport longtemps associé à l'élite afrikaner blanche, est encore citée comme un geste délibéré de réconciliation.|南アフリカは、初めての完全な民主的選挙の翌年にあたる1995年、ラグビーワールドカップを開催して優勝した。長らく白人アフリカーナー層と結びついてきたこの競技で、マンデラが主将フランソワ・ピナールの背番号6のジャージを着た決断は、いまも意図的な和解の身振りとして語り継がれている。",
  ),
  q(
    9,
    "In which year was Cape Town's District Six declared a 'whites-only' area under the Group Areas Act, leading to the bulldozing of the neighbourhood and the forced removal of tens of thousands of residents?|¿En qué año se declaró el Distrito Seis de Ciudad del Cabo zona 'solo para blancos' bajo la Ley de Áreas de Grupo, lo que llevó a arrasar el barrio y desplazar a la fuerza a decenas de miles de residentes?|En quelle année le District Six du Cap fut-il déclaré zone « réservée aux Blancs » en vertu du Group Areas Act, entraînant le rasage du quartier et le déplacement forcé de dizaines de milliers d'habitants ?|ケープタウンのディストリクト・シックスが集団地域法により「白人専用」地区に指定され、地区の取り壊しと数万人の強制退去につながったのは何年か?",
    [
      "1966|1966|1966|1966",
      "1948|1948|1948|1948",
      "1976|1976|1976|1976",
    ],
    0,
    "District Six had been one of Cape Town's few racially mixed inner-city neighbourhoods before its 1966 declaration; by the early 1980s the government had bulldozed nearly every building and relocated an estimated 60,000 people to townships on the Cape Flats, while the cleared land itself sat largely undeveloped for decades afterward, too politically charged to build on.|El Distrito Seis había sido uno de los pocos barrios céntricos racialmente mixtos de Ciudad del Cabo antes de su declaración en 1966; a comienzos de los ochenta el gobierno ya había arrasado casi todos los edificios y reubicado a unas 60.000 personas en municipios del Cape Flats, mientras el terreno despejado quedó en gran parte sin construir durante décadas, por lo políticamente delicado que resultaba edificar allí.|Le District Six avait été l'un des rares quartiers du centre du Cap racialement mixtes avant sa déclaration en 1966 ; au début des années 1980, le gouvernement avait rasé presque tous les bâtiments et relogé environ 60 000 personnes dans des townships du Cape Flats, tandis que le terrain déblayé resta largement à l'abandon pendant des décennies, trop chargé politiquement pour qu'on y construise.|ディストリクト・シックスは1966年の指定以前、ケープタウン中心部では数少ない人種混在の地区だった。1980年代初めまでに政府はほぼすべての建物を取り壊し、およそ6万人をケープフラッツのタウンシップへ強制的に移した。更地になった土地はその後何十年も、政治的にあまりに重い場所として、ほとんど開発されないまま残された。",
  ),

  // ---- 難易度1〜3(常識・推測で解ける) ----
  q(
    2,
    "Which two oceans meet along South Africa's coastline?|¿Qué dos océanos se encuentran en la costa de Sudáfrica?|Quels deux océans se rejoignent le long des côtes de l'Afrique du Sud ?|南アフリカの海岸線で出会う二つの大洋は?",
    [
      "The Atlantic and the Indian|El Atlántico y el Índico|L'Atlantique et l'Indien|大西洋とインド洋",
      "The Pacific and the Indian|El Pacífico y el Índico|Le Pacifique et l'Indien|太平洋とインド洋",
      "The Atlantic and the Pacific|El Atlántico y el Pacífico|L'Atlantique et le Pacifique|大西洋と太平洋",
    ],
    0,
    "The cold Benguela current runs up the Atlantic side and the warmer Agulhas current runs down the Indian Ocean side, meeting roughly around the country's southern tip.|La fría corriente de Benguela sube por el lado atlántico y la más cálida corriente de Agulhas baja por el lado del Índico, encontrándose más o menos en la punta sur del país.|Le courant froid de Benguela remonte côté Atlantique et le courant plus chaud des Aiguilles descend côté océan Indien, se rejoignant à peu près à la pointe sud du pays.|冷たいベンゲラ海流が大西洋側を北上し、より暖かいアガラス海流がインド洋側を南下して、国の南端付近で出会う。",
  ),
  q(
    2,
    "Which is South Africa's most populous city?|¿Cuál es la ciudad más poblada de Sudáfrica?|Quelle est la ville la plus peuplée d'Afrique du Sud ?|南アフリカで最も人口の多い都市は?",
    [
      "Johannesburg|Johannesburgo|Johannesbourg|ヨハネスブルグ",
      "Cape Town|Ciudad del Cabo|Le Cap|ケープタウン",
      "Durban|Durban|Durban|ダーバン",
    ],
    0,
    "Johannesburg's population exploded after gold was found there in 1886, and it remains the country's biggest city today even though the seat of national government lies elsewhere.|La población de Johannesburgo se disparó tras hallarse oro allí en 1886, y sigue siendo hoy la ciudad más grande del país aunque la sede del gobierno nacional esté en otro lugar.|La population de Johannesburg a explosé après la découverte d'or en 1886, et elle reste aujourd'hui la plus grande ville du pays, bien que le siège du gouvernement national se trouve ailleurs.|ヨハネスブルグの人口は1886年の金の発見以来急増し、国の政府の所在地が別にあるにもかかわらず、いまも国内最大の都市であり続けている。",
  ),
  q(
    3,
    "How many colours appear on the South African national flag?|¿Cuántos colores aparecen en la bandera nacional de Sudáfrica?|Combien de couleurs apparaissent sur le drapeau national sud-africain ?|南アフリカの国旗に使われている色の数は?",
    ["6|6|6|6", "4|4|4|4", "8|8|8|8"],
    0,
    "Adopted in 1994 and deliberately designed to look unlike any flag already in use, it remains one of the very few national flags with six colours, arranged in a horizontal Y.|Adoptada en 1994 y diseñada a propósito para no parecerse a ninguna bandera ya en uso, sigue siendo una de las pocas banderas nacionales con seis colores, dispuestos en una Y horizontal.|Adopté en 1994 et délibérément conçu pour ne ressembler à aucun drapeau déjà en usage, il reste l'un des très rares drapeaux nationaux à six couleurs, disposées en Y horizontal.|1994年に採用されたこの旗は、既存のどの国旗にも似ないようわざと設計され、水平のY字に六色を配した数少ない国旗の一つであり続けている。",
  ),
  q(
    1,
    "Which of these is one of the 'Big Five' safari animals?|¿Cuál de estos es uno de los 'Big Five' del safari?|Lequel de ceux-ci fait partie des « Big Five » du safari ?|『ビッグファイブ』のサファリ動物はどれか?",
    ["Lion|León|Lion|ライオン", "Zebra|Cebra|Zèbre|シマウマ", "Giraffe|Jirafa|Girafe|キリン"],
    0,
    "The term was coined by old hunters for the five animals considered most dangerous to hunt on foot, not for being the biggest or the rarest.|El término lo acuñaron antiguos cazadores para los cinco animales considerados más peligrosos de cazar a pie, no por ser los más grandes ni los más raros.|Le terme fut forgé par d'anciens chasseurs pour les cinq animaux jugés les plus dangereux à chasser à pied, non pour leur taille ni leur rareté.|この呼び名は、大きさや希少さではなく、徒歩で狩るのに最も危険とされた五種の動物を指して昔の猟師たちが作った言葉である。",
  ),
  q(
    2,
    "Table Mountain, with its famous flat top, overlooks which city?|La Montaña de la Mesa, con su célebre cima plana, domina ¿qué ciudad?|La montagne de la Table, avec son célèbre sommet plat, surplombe quelle ville ?|平らな頂で知られるテーブルマウンテンが見下ろす都市は?",
    ["Cape Town|Ciudad del Cabo|Le Cap|ケープタウン", "Durban|Durban|Durban|ダーバン", "Johannesburg|Johannesburgo|Johannesbourg|ヨハネスブルグ"],
    0,
    "The sandstone that caps the mountain is estimated at around half a billion years old, making the mountain itself far older than the Alps or the Rockies.|Se calcula que la arenisca que corona la montaña tiene unos quinientos millones de años, lo que hace que la propia montaña sea mucho más antigua que los Alpes o las Rocosas.|Le grès qui coiffe la montagne est estimé à environ cinq cents millions d'années, ce qui rend la montagne elle-même bien plus ancienne que les Alpes ou les Rocheuses.|山頂を覆う砂岩はおよそ5億年前のものと推定され、山そのものはアルプスやロッキー山脈よりはるかに古い。",
  ),
  q(
    1,
    "What is a 'braai'?|¿Qué es un 'braai'?|Qu'est-ce qu'un « braai » ?|『ブライ』とは何か?",
    [
      "A barbecue cooked over an open fire|Una barbacoa cocinada al fuego abierto|Un barbecue cuit à feu ouvert|直火で焼くバーベキュー",
      "A traditional dance|Un baile tradicional|Une danse traditionnelle|伝統舞踊",
      "A stringed musical instrument|Un instrumento musical de cuerda|Un instrument de musique à cordes|弦楽器",
    ],
    0,
    "Braaiing over wood or charcoal is such a common weekend social occasion that South Africans of every background will tell you it counts as a national pastime.|Hacer braai a leña o carbón es una ocasión social de fin de semana tan común que los sudafricanos de todos los orígenes dirán que cuenta como pasatiempo nacional.|Faire un braai au bois ou au charbon est une occasion sociale de week-end si courante que les Sud-Africains de tous horizons vous diront que cela compte comme un passe-temps national.|薪や炭で焼くブライは週末の社交の場としてあまりに一般的で、どんな背景の南アフリカ人も国民的娯楽だと口をそろえる。",
  ),
  q(
    5,
    "What is the true southernmost point of the African continent?|¿Cuál es el verdadero punto más meridional del continente africano?|Quel est le véritable point le plus méridional du continent africain ?|アフリカ大陸の本当の最南端は?",
    ["Cape Agulhas|Cabo Agulhas|Le cap des Aiguilles|アガラス岬", "Cape of Good Hope|Cabo de Buena Esperanza|Le cap de Bonne-Espérance|喜望峰", "Cape Point|Cabo Point|Cape Point|ケープポイント"],
    0,
    "Many visitors assume the more famous Cape of Good Hope, some way to the north, is the continent's southern tip, but the actual dividing line between the Atlantic and Indian Oceans is at Cape Agulhas.|Muchos visitantes suponen que el más famoso Cabo de Buena Esperanza, algo más al norte, es la punta sur del continente, pero la verdadera línea divisoria entre el Atlántico y el Índico está en el Cabo Agulhas.|Beaucoup de visiteurs pensent que le plus célèbre cap de Bonne-Espérance, un peu plus au nord, est la pointe sud du continent, mais la véritable ligne de partage entre l'Atlantique et l'Indien se trouve au cap des Aiguilles.|多くの旅行者は、少し北にあるより有名な喜望峰こそが大陸の南端だと思い込むが、大西洋とインド洋を実際に分ける境界はアガラス岬にある。",
  ),
  q(
    3,
    "Which of these countries does NOT share a border with South Africa?|¿Cuál de estos países NO comparte frontera con Sudáfrica?|Lequel de ces pays ne partage PAS de frontière avec l'Afrique du Sud ?|次のうち南アフリカと国境を接していない国は?",
    ["Kenya|Kenia|Le Kenya|ケニア", "Namibia|Namibia|La Namibie|ナミビア", "Zimbabwe|Zimbabue|Le Zimbabwe|ジンバブエ"],
    0,
    "South Africa borders Namibia, Botswana, Zimbabwe, Mozambique and Eswatini, and completely encloses Lesotho — Kenya lies far to the north, on the other side of the continent.|Sudáfrica limita con Namibia, Botsuana, Zimbabue, Mozambique y Esuatini, y rodea por completo a Lesoto; Kenia queda muy al norte, al otro lado del continente.|L'Afrique du Sud est frontalière de la Namibie, du Botswana, du Zimbabwe, du Mozambique et de l'Eswatini, et enclave entièrement le Lesotho ; le Kenya se trouve loin au nord, de l'autre côté du continent.|南アフリカはナミビア・ボツワナ・ジンバブエ・モザンビーク・エスワティニと国境を接し、レソトを完全に囲んでいる。ケニアは大陸の反対側、はるか北にある。",
  ),
  q(
    3,
    "What is the nickname of South Africa's national rugby team?|¿Cuál es el apodo de la selección nacional de rugby de Sudáfrica?|Quel est le surnom de l'équipe nationale de rugby d'Afrique du Sud ?|南アフリカのラグビー代表チームの愛称は?",
    ["The Springboks|Los Springboks|Les Springboks|スプリングボクス", "The Lions|Los Lions|Les Lions|ライオンズ", "The Eagles|Los Eagles|Les Eagles|イーグルス"],
    0,
    "Named after the springbok antelope, the team has won the Rugby World Cup four times, more than any other nation, most recently in 2023.|Llamado así por el antílope springbok, el equipo ha ganado la Copa Mundial de Rugby cuatro veces, más que cualquier otra nación, la última en 2023.|Nommée d'après l'antilope springbok, l'équipe a remporté la Coupe du monde de rugby quatre fois, plus qu'aucune autre nation, la plus récente en 2023.|羚羊の一種スプリングボックにちなんで名付けられたこのチームは、ラグビーワールドカップを四度制しており、これはどの国よりも多い。直近の優勝は2023年である。",
  ),
  q(
    4,
    "Kruger National Park, one of Africa's largest game reserves, is named after whom?|El Parque Nacional Kruger, una de las mayores reservas de caza de África, ¿en honor a quién lleva su nombre?|Le parc national Kruger, l'une des plus grandes réserves de chasse d'Afrique, porte le nom de qui ?|アフリカ最大級の自然保護区、クルーガー国立公園の名の由来は?",
    [
      "A former president who set aside the original reserve|Un expresidente que reservó la reserva original|Un ancien président qui créa la réserve d'origine|最初の保護区を定めた元大統領",
      "A mountain range|Una cordillera|Une chaîne de montagnes|山脈",
      "A river that runs through it|Un río que la atraviesa|Une rivière qui la traverse|園内を流れる川",
    ],
    0,
    "Paul Kruger, president of the old South African Republic (Transvaal), set aside the original game reserve in 1898, decades before it was expanded and renamed in his honour in 1926.|Paul Kruger, presidente de la antigua República Sudafricana (Transvaal), reservó la reserva de caza original en 1898, décadas antes de que se ampliara y rebautizara en su honor en 1926.|Paul Kruger, président de l'ancienne République sud-africaine (Transvaal), créa la réserve de chasse d'origine en 1898, des décennies avant qu'elle ne soit agrandie et rebaptisée en son honneur en 1926.|旧南アフリカ共和国(トランスヴァール)の大統領ポール・クリューガーが1898年に最初の保護区を定め、その数十年後の1926年、拡張とともに彼の名にちなんで改称された。",
  ),
  q(
    4,
    "Rhinoceros poaching in South Africa is driven mainly by demand for which part of the animal?|La caza furtiva de rinocerontes en Sudáfrica está impulsada sobre todo por la demanda de ¿qué parte del animal?|Le braconnage des rhinocéros en Afrique du Sud est surtout motivé par la demande de quelle partie de l'animal ?|南アフリカでのサイの密猟を主に駆り立てているのは、その体のどの部分への需要か?",
    ["Its horn|Su cuerno|Sa corne|角", "Its hide|Su piel|Sa peau|皮", "Its teeth|Sus dientes|Ses dents|歯"],
    0,
    "South Africa holds most of the world's remaining rhino population, and demand for horn, prized in parts of Asia despite having no proven medicinal effect, has driven poaching that conservationists have fought for decades.|Sudáfrica alberga la mayor parte de la población mundial restante de rinocerontes, y la demanda de cuerno, apreciado en partes de Asia pese a no tener ningún efecto medicinal probado, ha impulsado una caza furtiva que los conservacionistas llevan décadas combatiendo.|L'Afrique du Sud abrite l'essentiel de la population mondiale restante de rhinocéros, et la demande de corne, prisée dans certaines régions d'Asie malgré l'absence d'effet médicinal prouvé, alimente un braconnage que les défenseurs de la nature combattent depuis des décennies.|南アフリカは世界に残るサイの個体数の大半を抱えており、効能が科学的に証明されていないにもかかわらずアジアの一部で珍重される角への需要が、保護活動家が何十年も闘ってきた密猟を煽ってきた。",
  ),
  q(
    4,
    "What is South Africa's longest river?|¿Cuál es el río más largo de Sudáfrica?|Quel est le plus long fleuve d'Afrique du Sud ?|南アフリカで最も長い川は?",
    ["The Orange River|El río Orange|Le fleuve Orange|オレンジ川", "The Vaal River|El río Vaal|La rivière Vaal|フォール川", "The Limpopo River|El río Limpopo|Le fleuve Limpopo|リンポポ川"],
    0,
    "Rising in the Lesotho highlands and flowing over 2,200 km to the Atlantic, the Orange forms much of the border with Namibia along its lower reaches.|Naciendo en las tierras altas de Lesoto y recorriendo más de 2.200 km hasta el Atlántico, el Orange forma buena parte de la frontera con Namibia en su curso bajo.|Prenant sa source dans les hauts plateaux du Lesotho et parcourant plus de 2 200 km jusqu'à l'Atlantique, l'Orange forme une grande partie de la frontière avec la Namibie sur son cours inférieur.|レソトの高地に源を発し、大西洋まで2200kmを超えて流れるオレンジ川は、下流でナミビアとの国境の多くを形作っている。",
  ),
  q(
    2,
    "What is biltong?|¿Qué es el biltong?|Qu'est-ce que le biltong ?|ビルトングとは何か?",
    [
      "Dried, cured meat|Carne curada y seca|Viande séchée et macérée|干した塩漬け肉",
      "A kind of flatbread|Un tipo de pan plano|Une sorte de pain plat|平たいパンの一種",
      "A traditional dance|Un baile tradicional|Une danse traditionnelle|伝統舞踊",
    ],
    0,
    "Cured with vinegar and spice and air-dried rather than smoked, biltong keeps for weeks without refrigeration and is sold everywhere from petrol stations to farm stalls.|Curado con vinagre y especias y secado al aire en vez de ahumado, el biltong se conserva semanas sin refrigeración y se vende en todas partes, de gasolineras a puestos de granja.|Macéré au vinaigre et aux épices puis séché à l'air plutôt que fumé, le biltong se conserve des semaines sans réfrigération et se vend partout, des stations-service aux étals de ferme.|酢と香辛料に漬けて燻製ではなく風乾させたビルトングは、冷蔵なしで何週間も保ち、ガソリンスタンドから農家の露店までいたるところで売られている。",
  ),
  q(
    3,
    "What are South Africa's ubiquitous minibus taxis mainly used for?|¿Para qué se usan sobre todo los omnipresentes taxis minibús de Sudáfrica?|À quoi servent surtout les omniprésents taxis minibus d'Afrique du Sud ?|南アフリカでいたるところにあるミニバスタクシーの主な用途は?",
    [
      "Informal public transport|Transporte público informal|Transport public informel|非公式の公共交通",
      "School trips only|Solo excursiones escolares|Uniquement les sorties scolaires|学校の遠足専用",
      "Long-distance freight|Carga de larga distancia|Le fret longue distance|長距離貨物輸送",
    ],
    0,
    "With no fixed timetable and routes signalled to waiting passengers by hand gestures, minibus taxis carry the large majority of South Africans who have no train or bus line nearby.|Sin horario fijo y con rutas indicadas a los pasajeros que esperan mediante gestos con la mano, los taxis minibús transportan a la gran mayoría de los sudafricanos que no tienen tren ni autobús cerca.|Sans horaire fixe, les itinéraires étant signalés aux passagers en attente par des gestes de la main, les taxis minibus transportent la grande majorité des Sud-Africains qui n'ont ni train ni bus à proximité.|決まった時刻表はなく、行き先は待つ客に手信号で伝えられる。ミニバスタクシーは、近くに鉄道もバスも無い南アフリカ人の大多数を運んでいる。",
  ),
  q(
    2,
    "Which small, mongoose-like mammal, famous for standing upright on sentry duty, is common across the Kalahari?|¿Qué pequeño mamífero, parecido a una mangosta y famoso por hacer guardia erguido, es común en el Kalahari?|Quel petit mammifère semblable à une mangouste, célèbre pour monter la garde debout, est commun dans le Kalahari ?|見張り役として直立する姿で知られる、カラハリに広く生息するマングースに似た小型哺乳類は?",
    ["The meerkat|El suricato|Le suricate|ミーアキャット", "The mongoose lemur|El lémur mangosta|Le lémur mangouste|マングースキツネザル", "The honey badger|El tejón melero|Le ratel|ラーテル(ミツアナグマ)"],
    0,
    "Meerkats live in tight social groups called mobs, with members taking turns standing guard on their hind legs to watch for eagles and jackals while the rest of the group forages or digs.|Los suricatos viven en grupos sociales muy unidos llamados mobs, y sus miembros se turnan para vigilar erguidos sobre las patas traseras mientras el resto del grupo forrajea o excava.|Les suricates vivent en groupes sociaux soudés appelés clans, dont les membres se relaient pour monter la garde debout sur leurs pattes arrière pendant que le reste du groupe fourrage ou creuse.|ミーアキャットは『モブ』と呼ばれる結束の強い群れで暮らし、群れの他の個体が採食したり穴を掘ったりするあいだ、メンバーが交代で後ろ脚立ちになって見張りに立つ。",
  ),
  q(
    3,
    "Which fruit crop is South Africa one of the world's largest exporters of?|¿De qué fruta es Sudáfrica uno de los mayores exportadores del mundo?|De quel fruit l'Afrique du Sud est-elle l'un des plus grands exportateurs mondiaux ?|南アフリカが世界有数の輸出国であるのはどの果物か?",
    ["Citrus fruit, such as oranges|Cítricos, como las naranjas|Les agrumes, comme les oranges|オレンジなどの柑橘類", "Coconuts|Cocos|Les noix de coco|ココナッツ", "Durian|Durián|Le durian|ドリアン"],
    0,
    "The Western and Eastern Cape's citrus belt ships oranges, lemons and grapefruit to Europe and Asia through the Southern Hemisphere's counter-season, when northern groves are out of fruit.|El cinturón citrícola del Cabo Occidental y Oriental envía naranjas, limones y pomelos a Europa y Asia durante la temporada contraria del hemisferio sur, cuando los huertos del norte no tienen fruta.|La ceinture d'agrumes du Cap-Occidental et du Cap-Oriental expédie oranges, citrons et pamplemousses vers l'Europe et l'Asie durant la contre-saison de l'hémisphère sud, quand les vergers du nord sont sans fruits.|西ケープと東ケープの柑橘地帯は、北半球の果樹園が実を付けない南半球の裏作の時期に、オレンジ・レモン・グレープフルーツをヨーロッパやアジアへ出荷している。",
  ),
  q(
    2,
    "What does 'veld', a word used throughout South African English, refer to?|¿A qué se refiere 'veld', palabra usada en todo el inglés sudafricano?|Que désigne « veld », mot employé dans tout l'anglais sud-africain ?|南アフリカ英語で広く使われる『フェルト』が指すものは?",
    ["Open grassland or countryside|Pastizal o campo abierto|Une prairie ou une campagne ouverte|開けた草原・田舎", "A mountain pass|Un puerto de montaña|Un col de montagne|山道", "A type of fence|Un tipo de valla|Un type de clôture|柵の一種"],
    0,
    "Borrowed from Dutch/Afrikaans, 'veld' covers everything from the high, grassy Highveld around Johannesburg to the thorny Bushveld further north, and turns up in dozens of compound place names.|Tomada del neerlandés/afrikáans, 'veld' abarca desde el alto y herboso Highveld en torno a Johannesburgo hasta el espinoso Bushveld más al norte, y aparece en decenas de topónimos compuestos.|Emprunté au néerlandais/afrikaans, « veld » couvre aussi bien le Highveld herbeux et élevé autour de Johannesburg que le Bushveld épineux plus au nord, et apparaît dans des dizaines de toponymes composés.|オランダ語・アフリカーンス語由来の『フェルト』は、ヨハネスブルグ周辺の草深いハイフェルトから、より北のとげの多いブッシュフェルトまでを指し、何十もの合成地名に登場する。",
  ),
  q(
    2,
    "Which big cat, found in several South African reserves, is the fastest land animal on Earth?|¿Qué felino, presente en varias reservas sudafricanas, es el animal terrestre más rápido del planeta?|Quel grand félin, présent dans plusieurs réserves sud-africaines, est l'animal terrestre le plus rapide au monde ?|複数の南アフリカの保護区にいる、地上最速の動物であるネコ科の動物は?",
    ["The cheetah|El guepardo|Le guépard|チーター", "The leopard|El leopardo|Le léopard|ヒョウ", "The caracal|El caracal|Le caracal|カラカル"],
    0,
    "A cheetah can accelerate from a standstill to over 100 km/h in a few seconds, a burst of speed it can only sustain for a few hundred metres before overheating.|Un guepardo puede acelerar desde parado a más de 100 km/h en pocos segundos, un estallido de velocidad que solo puede mantener unos cientos de metros antes de sobrecalentarse.|Un guépard peut accélérer à l'arrêt jusqu'à plus de 100 km/h en quelques secondes, une pointe de vitesse qu'il ne peut tenir que quelques centaines de mètres avant de surchauffer.|チーターは静止状態から数秒で時速100kmを超えるまで加速できるが、体が熱を持ちすぎるため、その速さを保てるのは数百メートルほどにすぎない。",
  ),
  q(
    3,
    "What is a 'rondavel', a common sight across rural Southern Africa?|¿Qué es un 'rondavel', algo común en el África austral rural?|Qu'est-ce qu'un « rondavel », courant dans l'Afrique australe rurale ?|南部アフリカの農村部でよく見られる『ロンダベル』とは?",
    [
      "A round hut with a conical thatched roof|Una choza redonda con techo cónico de paja|Une case ronde à toit conique de chaume|円錐形の茅葺き屋根を持つ丸い小屋",
      "A woven grain basket|Una cesta tejida para grano|Un panier tressé pour le grain|編んだ穀物かご",
      "A type of ox-cart|Un tipo de carreta de bueyes|Un type de char à bœufs|牛車の一種",
    ],
    0,
    "Built from mud brick, stone or more recently concrete blocks, the round shape shares no corners for wind to catch and traditionally kept a single family unit's fire, sleeping area and stores together.|Construidos con adobe, piedra o, más recientemente, bloques de cemento, su forma redonda no ofrece esquinas al viento y tradicionalmente reunía el fuego, la zona de dormir y las provisiones de una familia.|Bâtis en briques de terre, en pierre ou plus récemment en parpaings, leur forme ronde n'offre aucun angle prise au vent et réunissait traditionnellement le foyer, l'espace de sommeil et les réserves d'une même famille.|日干しレンガや石、近年ではコンクリートブロックで作られる丸い形は風を受け止める角が無く、伝統的に一家族の炉・寝床・蓄えを一つにまとめていた。",
  ),
  q(
    4,
    "'Madiba', an affectionate name widely used for Nelson Mandela in South Africa, refers to what?|'Madiba', apodo cariñoso muy usado para Nelson Mandela en Sudáfrica, ¿a qué se refiere?|« Madiba », surnom affectueux largement utilisé pour Nelson Mandela en Afrique du Sud, désigne quoi ?|南アフリカでネルソン・マンデラに親しみを込めて使われる『マディバ』とは何を指すか?",
    [
      "His Xhosa clan name|Su nombre de clan xhosa|Son nom de clan xhosa|彼のコーサ族の氏族名",
      "His childhood nickname from school|Su apodo de la infancia en el colegio|Son surnom d'enfance à l'école|学校時代の少年時代のあだ名",
      "The prison number he was given|El número de prisionero que le dieron|Le numéro de prisonnier qui lui fut attribué|彼に与えられた囚人番号",
    ],
    0,
    "Referring to someone by their clan name rather than their given name is a mark of respect in Xhosa custom, and 'Madiba' is used across South Africa, by strangers and heads of state alike, in exactly that spirit.|Llamar a alguien por su nombre de clan en vez de su nombre de pila es una muestra de respeto en la costumbre xhosa, y 'Madiba' se usa en toda Sudáfrica, por desconocidos y jefes de Estado por igual, con ese mismo espíritu.|Appeler quelqu'un par son nom de clan plutôt que par son prénom est une marque de respect dans la coutume xhosa, et « Madiba » est employé dans toute l'Afrique du Sud, par de parfaits inconnus comme par des chefs d'État, dans cet esprit.|氏族名で人を呼ぶのは、コーサの習わしでは敬意の表れであり、『マディバ』は見知らぬ人から各国元首まで、南アフリカじゅうでまさにその心で使われている。",
  ),
  q(
    4,
    "What is a 'shebeen'?|¿Qué es un 'shebeen'?|Qu'est-ce qu'un « shebeen » ?|『シェビーン』とは何か?",
    [
      "An informal, once-unlicensed drinking establishment|Un establecimiento de bebidas informal, antes sin licencia|Un débit de boissons informel, autrefois sans licence|かつて無認可だった非公式の飲み屋",
      "A style of woven blanket|Un tipo de manta tejida|Un type de couverture tissée|織物の毛布の一種",
      "A traditional wedding ceremony|Una ceremonia de boda tradicional|Une cérémonie de mariage traditionnelle|伝統的な結婚式",
    ],
    0,
    "Shebeens grew out of the fact that Black South Africans were long barred from licensed bars under segregation and apartheid law, so township households brewed and sold beer informally instead, and many shebeens are still run as such today.|Los shebeens surgieron porque a los sudafricanos negros se les prohibió durante mucho tiempo entrar en bares con licencia bajo la segregación y el apartheid, así que los hogares de los townships elaboraban y vendían cerveza de manera informal, y muchos siguen funcionando así hoy.|Les shebeens sont nés du fait que les Sud-Africains noirs furent longtemps interdits de bars sous licence sous la ségrégation puis l'apartheid, si bien que les foyers des townships brassaient et vendaient de la bière de façon informelle, et beaucoup fonctionnent encore ainsi aujourd'hui.|シェビーンは、隔離政策とアパルトヘイト法の下で黒人の南アフリカ人が長らく認可を受けた酒場に入れなかったことから生まれた。タウンシップの家庭は代わりにビールを自家醸造して非公式に売り、いまも多くのシェビーンがその形で営まれている。",
  ),
  q(
    5,
    "'Cape Flats' refers to which kind of area around Cape Town?|'Cape Flats' se refiere a ¿qué tipo de zona en torno a Ciudad del Cabo?|« Cape Flats » désigne quel genre de zone autour du Cap ?|『ケープフラッツ』はケープタウン周辺のどのような地域を指すか?",
    [
      "A low, sandy plain of townships and suburbs|Una llanura baja y arenosa de townships y suburbios|Une plaine basse et sablonneuse de townships et de banlieues|タウンシップと郊外が広がる低く砂質の平地",
      "A row of Cape Dutch wine estates|Una hilera de fincas vinícolas de estilo holandés del Cabo|Une rangée de domaines viticoles de style hollandais du Cap|ケープダッチ様式のワイン農園の並び",
      "A chain of small offshore islands|Una cadena de pequeñas islas costa afuera|Une chaîne de petites îles au large|沖合の小さな島々の連なり",
    ],
    0,
    "Much of Cape Town's coloured and Black population was moved onto this windswept, low-lying sandy plain under apartheid-era removals, and it remains home to a large share of the city's population today.|Buena parte de la población mestiza y negra de Ciudad del Cabo fue trasladada a esta llanura arenosa, baja y azotada por el viento durante los desplazamientos de la era del apartheid, y hoy sigue albergando a buena parte de la población de la ciudad.|Une grande partie de la population métisse et noire du Cap fut déplacée vers cette plaine sablonneuse, basse et balayée par le vent lors des déplacements de l'ère de l'apartheid, et elle abrite encore aujourd'hui une large part de la population de la ville.|ケープタウンの混血・黒人住民の多くは、アパルトヘイト時代の強制移住によって、この風の吹きさらす低い砂地の平野へ移された。いまもこの街の人口の大きな部分がここに暮らしている。",
  ),
  q(
    6,
    "How many South African writers have won the Nobel Prize in Literature?|¿Cuántos escritores sudafricanos han ganado el Premio Nobel de Literatura?|Combien d'écrivains sud-africains ont reçu le prix Nobel de littérature ?|ノーベル文学賞を受賞した南アフリカの作家は何人か?",
    ["Two|Dos|Deux|2人", "None|Ninguno|Aucun|0人", "Four|Cuatro|Quatre|4人"],
    0,
    "Nadine Gordimer won in 1991 and J.M. Coetzee in 2003, making South Africa one of relatively few countries to have produced more than one literature laureate.|Nadine Gordimer ganó en 1991 y J.M. Coetzee en 2003, lo que convierte a Sudáfrica en uno de los pocos países que han dado más de un premio Nobel de literatura.|Nadine Gordimer l'a remporté en 1991 et J.M. Coetzee en 2003, faisant de l'Afrique du Sud l'un des rares pays à avoir produit plus d'un lauréat en littérature.|1991年にナディン・ゴーディマが、2003年にJ・M・クッツェーが受賞しており、南アフリカは複数のノーベル文学賞受賞者を出した数少ない国の一つになっている。",
  ),
  q(
    7,
    "Which South African trumpeter's 1968 song 'Grazing in the Grass' topped the US singles chart?|¿La canción de 1968 'Grazing in the Grass', de qué trompetista sudafricano, encabezó las listas de éxitos de EE. UU.?|La chanson de 1968 « Grazing in the Grass », de quel trompettiste sud-africain, se hissa en tête des ventes de singles aux États-Unis ?|1968年の曲「グレイジング・イン・ザ・グラス」で全米シングルチャート1位を獲得した南アフリカのトランペット奏者は?",
    [
      "Hugh Masekela|Hugh Masekela|Hugh Masekela|ヒュー・マセケラ",
      "Abdullah Ibrahim|Abdullah Ibrahim|Abdullah Ibrahim|アブドラ・イブラヒム",
      "Jonas Gwangwa|Jonas Gwangwa|Jonas Gwangwa|ジョナス・グワングワ",
    ],
    0,
    "Masekela left South Africa in 1960 with help from friends including Trevor Huddleston and Yehudi Menuhin, and spent decades in exile, becoming one of the most internationally recognised faces of South African jazz before returning home in the 1990s.|Masekela salió de Sudáfrica en 1960 con ayuda de amigos como Trevor Huddleston y Yehudi Menuhin, y pasó décadas exiliado, convirtiéndose en uno de los rostros más reconocidos internacionalmente del jazz sudafricano antes de volver a casa en los noventa.|Masekela quitta l'Afrique du Sud en 1960 avec l'aide d'amis dont Trevor Huddleston et Yehudi Menuhin, et passa des décennies en exil, devenant l'un des visages les plus reconnus à l'international du jazz sud-africain avant de rentrer chez lui dans les années 1990.|マセケラはトレヴァー・ハドルストンやユーディ・メニューインら友人の助けを借りて1960年に南アフリカを離れ、何十年も亡命生活を送りながら南アフリカ・ジャズの国際的な顔の一人となり、1990年代に帰国した。",
  ),
  q(
    6,
    "Which South African language has the largest number of first-language speakers?|¿Qué lengua sudafricana tiene el mayor número de hablantes nativos?|Quelle langue sud-africaine compte le plus de locuteurs natifs ?|南アフリカで母語話者の数が最も多い言語は?",
    ["isiZulu|El isizulú|L'isiZulu|ズールー語", "Afrikaans|El afrikáans|L'afrikaans|アフリカーンス語", "English|El inglés|L'anglais|英語"],
    0,
    "Census figures consistently put isiZulu ahead of every other home language, spoken by close to a quarter of the population, even though English dominates business, media and government.|Los censos sitúan de forma constante al isizulú por delante de cualquier otra lengua materna, hablado por cerca de una cuarta parte de la población, aunque el inglés domine los negocios, los medios y el gobierno.|Les recensements placent systématiquement l'isiZulu devant toute autre langue maternelle, parlé par près d'un quart de la population, même si l'anglais domine les affaires, les médias et le gouvernement.|国勢調査では一貫してズールー語が家庭言語として他のどれよりも多く、人口のほぼ4分の1近くが話す。ビジネス・メディア・行政では英語が主流であるにもかかわらずである。",
  ),
  q(
    6,
    "The 'Sardine Run', sometimes called the greatest shoal on Earth, happens each year along which coast?|La 'Sardine Run', a veces llamada el mayor banco de peces del planeta, ocurre cada año en ¿qué costa?|La « Sardine Run », parfois appelée le plus grand banc de poissons du monde, se produit chaque année sur quelle côte ?|地球上最大の魚群とも呼ばれる『サーディン・ラン』が毎年起こる海岸は?",
    [
      "The KwaZulu-Natal coast|La costa de KwaZulu-Natal|La côte du KwaZulu-Natal|クワズール・ナタールの海岸",
      "The Northern Cape coast|La costa del Cabo Septentrional|La côte du Cap-Nord|北ケープの海岸",
      "The Limpopo border|La frontera de Limpopo|La frontière du Limpopo|リンポポの国境",
    ],
    0,
    "Billions of sardines migrate north along the coast each austral winter in a shoal sometimes stretching for kilometres, drawing dolphins, sharks, seabirds and whales that feed on it in a frenzy visible from the air.|Miles de millones de sardinas migran hacia el norte por la costa cada invierno austral en un banco que a veces se extiende kilómetros, atrayendo a delfines, tiburones, aves marinas y ballenas que se alimentan de él en un frenesí visible desde el aire.|Des milliards de sardines migrent vers le nord le long de la côte chaque hiver austral en un banc s'étirant parfois sur des kilomètres, attirant dauphins, requins, oiseaux marins et baleines qui s'en nourrissent dans une frénésie visible depuis les airs.|南半球の冬になるたびに、何十億匹ものイワシが海岸沿いを北上し、時には数キロにも及ぶ群れを作る。それを目当てにイルカ・サメ・海鳥・クジラが群がる様子は上空からも見えるほどである。",
  ),
  q(
    5,
    "The Comrades Marathon, one of the world's oldest and largest ultramarathons, runs roughly 90 km between which two cities?|La Maratón Comrades, una de las ultramaratones más antiguas y grandes del mundo, recorre unos 90 km entre ¿qué dos ciudades?|Le marathon Comrades, l'un des plus anciens et plus grands ultramarathons au monde, parcourt environ 90 km entre quelles deux villes ?|世界最古かつ最大級のウルトラマラソン、コムラッズ・マラソンがおよそ90kmを走るのはどの二都市の間か?",
    [
      "Durban and Pietermaritzburg|Durban y Pietermaritzburg|Durban et Pietermaritzburg|ダーバンとピーターマリッツバーグ",
      "Cape Town and Stellenbosch|Ciudad del Cabo y Stellenbosch|Le Cap et Stellenbosch|ケープタウンとステレンボッシュ",
      "Johannesburg and Pretoria|Johannesburgo y Pretoria|Johannesburg et Pretoria|ヨハネスブルグとプレトリア",
    ],
    0,
    "First run in 1921 to honour soldiers of the First World War, the race alternates direction each year between an 'up run' finishing in Pietermaritzburg and a 'down run' finishing in Durban.|Corrida por primera vez en 1921 en honor a los soldados de la Primera Guerra Mundial, la carrera alterna cada año entre una 'subida' que termina en Pietermaritzburg y una 'bajada' que termina en Durban.|Couru pour la première fois en 1921 en hommage aux soldats de la Première Guerre mondiale, la course alterne chaque année entre une montée se terminant à Pietermaritzburg et une descente se terminant à Durban.|1921年、第一次世界大戦の兵士を称えて初めて開催されたこのレースは、毎年「上り」でピーターマリッツバーグに至るコースと「下り」でダーバンに至るコースを交互に走る。",
  ),
  q(
    6,
    "European settlement at the Cape began in 1652 when the Dutch East India Company built a station mainly to do what?|El asentamiento europeo en el Cabo comenzó en 1652 cuando la Compañía Holandesa de las Indias Orientales construyó un puesto sobre todo para ¿qué?|La colonisation européenne au Cap commença en 1652 quand la Compagnie néerlandaise des Indes orientales bâtit un poste principalement pour quoi faire ?|1652年に始まったケープでのヨーロッパ人入植で、オランダ東インド会社が拠点を築いた主な目的は?",
    [
      "Resupply ships sailing to Asia with fresh food|Reabastecer con alimentos frescos a los barcos rumbo a Asia|Ravitailler en vivres frais les navires en route vers l'Asie|アジアへ向かう船に新鮮な食料を補給するため",
      "Mine gold for the Dutch crown|Extraer oro para la corona holandesa|Extraire de l'or pour la couronne néerlandaise|オランダ王室のために金を採掘するため",
      "Establish a whaling fleet|Establecer una flota ballenera|Établir une flotte baleinière|捕鯨船団を設立するため",
    ],
    0,
    "Jan van Riebeeck's station was meant only as a halfway garden and refreshment stop for scurvy-plagued crews sailing the long route to the East Indies, not as the start of permanent settlement, though it became exactly that.|El puesto de Jan van Riebeeck se pensó solo como un huerto y punto de descanso a mitad de camino para tripulaciones afectadas de escorbuto en la larga ruta a las Indias Orientales, no como el inicio de un asentamiento permanente, aunque acabó siéndolo.|Le poste de Jan van Riebeeck ne devait être qu'un jardin et une escale de ravitaillement à mi-chemin pour des équipages minés par le scorbut sur la longue route des Indes orientales, non le début d'une colonie permanente, ce qu'il devint pourtant.|ヤン・ファン・リーベックの拠点は、東インドへの長い航路で壊血病に苦しむ乗組員のための中継の菜園と休憩地にすぎないはずだったが、それが恒久的な入植の始まりとなった。",
  ),

  // ---- 難易度7〜10(現地の人か、強い関心のある人でないと難しい) ----
  q(
    7,
    "During the Great Trek of the 1830s, Boer settlers left British-ruled Cape Colony for the interior mainly using which mode of transport?|Durante el Gran Trek de la década de 1830, los colonos bóeres abandonaron la Colonia del Cabo bajo dominio británico hacia el interior usando sobre todo ¿qué medio de transporte?|Pendant le Grand Trek des années 1830, les colons boers quittèrent la colonie du Cap sous domination britannique vers l'intérieur en utilisant surtout quel moyen de transport ?|1830年代のグレートトレックで、ボーア人入植者が英領ケープ植民地を離れ内陸へ向かった際、主に使った移動手段は?",
    [
      "Ox-drawn wagons|Carretas tiradas por bueyes|Des chariots tirés par des bœufs|牛に引かせた幌馬車",
      "Riverboats|Botes fluviales|Des bateaux fluviaux|川船",
      "Horse-drawn railway trucks|Vagones de ferrocarril tirados por caballos|Des wagons de chemin de fer tirés par des chevaux|馬に引かせた鉄道貨車",
    ],
    0,
    "Tens of thousands of Voortrekkers moved north and east over the following decade in ox-wagon convoys, crossing mountain passes still named for the routes they scouted, to found republics beyond British authority.|Decenas de miles de voortrekkers se desplazaron al norte y al este durante la década siguiente en convoyes de carretas de bueyes, cruzando puertos de montaña aún nombrados por las rutas que exploraron, para fundar repúblicas fuera de la autoridad británica.|Des dizaines de milliers de Voortrekkers se déplacèrent vers le nord et l'est au cours de la décennie suivante en convois de chariots à bœufs, franchissant des cols de montagne encore nommés d'après les routes qu'ils explorèrent, pour fonder des républiques hors de l'autorité britannique.|その後の10年で数万人のボーア人開拓者(フォートレッカー)が牛車の隊列を組んで北や東へ移動し、いまも彼らが切り開いた道にちなんで名付けられた山道を越え、イギリスの支配の及ばない共和国を築いた。",
  ),
  q(
    8,
    "At the Battle of Blood River in 1838, heavily outnumbered Voortrekkers defended themselves against a large Zulu force using which defensive tactic?|En la batalla del río Blood, en 1838, los voortrekkers, muy inferiores en número, se defendieron de una gran fuerza zulú con ¿qué táctica defensiva?|Lors de la bataille de la rivière Blood en 1838, des Voortrekkers très inférieurs en nombre se défendirent contre une importante force zouloue grâce à quelle tactique défensive ?|1838年のブラッド川の戦いで、数で大きく劣勢だったボーア人開拓者が大軍のズールー軍から身を守るために用いた防御戦術は?",
    [
      "Arranging their ox-wagons into a circular fort, or 'laager'|Disponer sus carretas de bueyes en un fuerte circular, o 'laager'|Disposer leurs chariots à bœufs en fort circulaire, ou « laager »|牛車を円形の砦『ラーガー』に組む",
      "Digging a network of underground tunnels|Excavar una red de túneles subterráneos|Creuser un réseau de tunnels souterrains|地下トンネルの網を掘る",
      "Building a stone tower on the riverbank|Construir una torre de piedra en la orilla del río|Construire une tour de pierre sur la berge|川岸に石造りの塔を築く",
    ],
    0,
    "The laager tactic, wagons chained wheel to wheel in a circle with gaps plugged by thornbush, let a few hundred defenders with firearms hold off several thousand attackers, and the river is said to have run red afterward, giving the battle its name.|La táctica del laager, con carretas encadenadas rueda con rueda en círculo y los huecos taponados con matorral espinoso, permitió a unos pocos cientos de defensores con armas de fuego resistir a varios miles de atacantes, y se dice que el río corrió rojo después, dando nombre a la batalla.|La tactique du laager, chariots enchaînés roue contre roue en cercle et les brèches bouchées par des broussailles épineuses, permit à quelques centaines de défenseurs armés de fusils de résister à plusieurs milliers d'assaillants, et la rivière aurait coulé rouge ensuite, donnant son nom à la bataille.|車輪同士を鎖でつなぎ、隙間をとげのある茂みで塞いだ円形の陣『ラーガー』のおかげで、銃を持つわずか数百人の守り手が数千人の攻撃側を退けたとされる。戦いのあと川が赤く染まったと伝えられ、それがこの戦いの名の由来になった。",
  ),
  q(
    8,
    "What is 'lobola', still widely practised in many South African communities today?|¿Qué es el 'lobola', aún muy practicado hoy en muchas comunidades sudafricanas?|Qu'est-ce que le « lobola », encore largement pratiqué aujourd'hui dans de nombreuses communautés sud-africaines ?|いまも南アフリカの多くの共同体で広く行われている『ロボラ』とは?",
    [
      "A payment, traditionally in cattle, from a groom's family to a bride's family|Un pago, tradicionalmente en ganado, de la familia del novio a la de la novia|Un versement, traditionnellement en bétail, de la famille du marié à celle de la mariée|花婿側の家族から花嫁側の家族へ、伝統的に牛で贈られる贈り物",
      "A blessing performed by a sangoma at a child's naming|Una bendición realizada por un sangoma al nombrar a un niño|Une bénédiction accomplie par un sangoma lors du nom donné à un enfant|サンゴマが子の命名の際に行う祝福",
      "A ceremonial dance performed at harvest time|Una danza ceremonial realizada en la cosecha|Une danse cérémonielle exécutée à la moisson|収穫の時期に行われる儀礼的な踊り",
    ],
    0,
    "Once paid strictly in cattle and now often negotiated partly in cash, lobola is treated less as a purchase than as a formal bond between two families, and negotiations can take months of back-and-forth between the two sides' representatives.|Antes pagado estrictamente en ganado y hoy a menudo negociado en parte en efectivo, el lobola se trata menos como una compra que como un vínculo formal entre dos familias, y las negociaciones pueden llevar meses de idas y vueltas entre los representantes de ambas partes.|Autrefois payé strictement en bétail et aujourd'hui souvent négocié en partie en espèces, le lobola est perçu moins comme un achat que comme un lien formel entre deux familles, et les négociations peuvent prendre des mois d'allers-retours entre les représentants des deux parties.|かつては厳密に牛で支払われ、いまではしばしば一部が現金で交渉されるロボラは、売買というより二つの家族を結ぶ正式な絆として扱われ、双方の代表者の間で何か月もかけてやり取りされることがある。",
  ),
  q(
    7,
    "Pinotage, a red wine grape variety strongly associated with South Africa, was created in 1925 by crossing Pinot noir with which other grape?|El pinotage, variedad de uva tinta muy asociada con Sudáfrica, se creó en 1925 cruzando pinot noir con ¿qué otra uva?|Le pinotage, cépage rouge fortement associé à l'Afrique du Sud, fut créé en 1925 en croisant le pinot noir avec quel autre cépage ?|南アフリカと強く結びつく赤ワイン用品種ピノタージュが1925年、ピノ・ノワールと掛け合わされて生まれた際の相手の品種は?",
    [
      "Cinsaut|Cinsaut|Cinsaut|サンソー",
      "Sauvignon blanc|Sauvignon blanc|Sauvignon blanc|ソーヴィニヨン・ブラン",
      "Chardonnay|Chardonnay|Chardonnay|シャルドネ",
    ],
    0,
    "Stellenbosch University researcher Abraham Perold crossed the two varieties in his garden, and the resulting grape, then known locally as hermitage, gave pinotage its name; it remains a variety found almost nowhere else at scale.|El investigador de la Universidad de Stellenbosch Abraham Perold cruzó las dos variedades en su jardín, y la uva resultante, entonces conocida localmente como hermitage, dio nombre al pinotage; sigue siendo una variedad que apenas se cultiva a gran escala en otro lugar.|Le chercheur de l'université de Stellenbosch Abraham Perold croisa les deux cépages dans son jardin, et le raisin obtenu, alors connu localement sous le nom d'hermitage, donna son nom au pinotage ; ce cépage reste presque introuvable ailleurs à grande échelle.|ステレンボッシュ大学の研究者アブラハム・ペロルドが自宅の庭でこの二品種を交配させ、当時「エルミタージュ」と地元で呼ばれていたその葡萄からピノタージュの名が生まれた。いまも大規模に栽培されているのはほぼここだけの品種である。",
  ),
  q(
    7,
    "'Karoo', the name of South Africa's vast semi-arid interior plateau, is said to derive from a Khoikhoi word meaning roughly what?|'Karoo', nombre de la vasta meseta semiárida del interior de Sudáfrica, se dice que deriva de una palabra khoikhoi que significa aproximadamente ¿qué?|« Karoo », nom du vaste plateau semi-aride de l'intérieur de l'Afrique du Sud, viendrait d'un mot khoikhoi signifiant à peu près quoi ?|南アフリカ内陸の広大な半乾燥高原『カルー』の名は、コイコイ語のある言葉に由来するとされるが、その意味は?",
    [
      "Land of thirst|Tierra de sed|Terre de soif|渇きの地",
      "Land of stone|Tierra de piedra|Terre de pierre|石の地",
      "Land of wind|Tierra de viento|Terre de vent|風の地",
    ],
    0,
    "The name is thought to describe the region's scant, unpredictable rainfall, and its huge, sparsely populated expanse still supports sheep farming on farms measured in thousands rather than hundreds of hectares.|Se cree que el nombre describe la escasa e impredecible lluvia de la región, y su enorme extensión, escasamente poblada, aún sostiene la cría de ovejas en granjas que se miden en miles y no en cientos de hectáreas.|Le nom est censé décrire les pluies rares et imprévisibles de la région, et son immense étendue, peu peuplée, fait encore vivre l'élevage ovin sur des exploitations mesurées en milliers plutôt qu'en centaines d'hectares.|この名は、この地域のわずかで予測しにくい降雨を表しているとされる。人口の少ないこの広大な土地は、いまも数百ではなく数千ヘクタール単位の牧場で羊が飼われている。",
  ),
  q(
    7,
    "What is 'toyi-toyi', closely associated with anti-apartheid protests?|¿Qué es el 'toyi-toyi', muy asociado a las protestas contra el apartheid?|Qu'est-ce que le « toyi-toyi », étroitement associé aux manifestations anti-apartheid ?|反アパルトヘイト抗議運動と強く結びついた『トイトイ』とは?",
    [
      "A high-stepping protest dance, often chanted to|Una danza de protesta con pasos altos, a menudo cantada|Une danse de protestation à pas hauts, souvent scandée|高く足を上げる抗議のダンスで、しばしば掛け声を伴う",
      "A style of political cartoon|Un estilo de caricatura política|Un style de dessin de presse politique|政治風刺画の一様式",
      "An underground newsletter|Un boletín clandestino|Un bulletin clandestin|地下出版のニュースレター",
    ],
    0,
    "Performed in tight rows with high, stamping steps and call-and-response chanting, the toyi-toyi became a signature sound and sight of mass demonstrations from the 1980s on, and is still performed today at protests and political rallies of every stripe.|Ejecutado en filas apretadas con pasos altos y marcados y cánticos de llamada y respuesta, el toyi-toyi se convirtió en un sonido y una imagen distintivos de las manifestaciones masivas desde los años ochenta, y aún hoy se ejecuta en protestas y mítines políticos de todo signo.|Exécuté en rangs serrés à coups de pas hauts et martelés et de chants à répons, le toyi-toyi devint un son et une image caractéristiques des manifestations de masse dès les années 1980, et se pratique encore aujourd'hui lors de protestations et de meetings politiques de tous bords.|列を組んで高く足を踏み鳴らし、掛け合いの歌を伴って踊るトイトイは、1980年代以降の大規模なデモを象徴する光景と音になった。いまもあらゆる立場の抗議行動や政治集会で踊られている。",
  ),
  q(
    7,
    "The 1953 Bantu Education Act did what?|¿Qué hizo la Ley de Educación Bantú de 1953?|Qu'a fait le Bantu Education Act de 1953 ?|1953年のバントゥー教育法は何をしたか?",
    [
      "Placed Black schooling under separate, deliberately inferior state control|Puso la escolarización de los negros bajo un control estatal separado y deliberadamente inferior|Plaça la scolarité des Noirs sous un contrôle étatique séparé et délibérément inférieur|黒人の学校教育を、意図的に劣った別枠の国家管理下に置いた",
      "Made primary school free for all races for the first time|Hizo gratuita la escuela primaria para todas las razas por primera vez|Rendit l'école primaire gratuite pour toutes les races pour la première fois|初めて全人種に初等教育を無償化した",
      "Introduced English as the only language of instruction nationwide|Introdujo el inglés como única lengua de instrucción en todo el país|Introduisit l'anglais comme seule langue d'enseignement dans tout le pays|全国で英語を唯一の教授言語として導入した",
    ],
    0,
    "The act's own architect, Hendrik Verwoerd, said openly that Black pupils should be taught only what suited the roles apartheid planned for them, and the underfunded system it created was a direct grievance behind the 1976 Soweto protests.|El propio arquitecto de la ley, Hendrik Verwoerd, dijo abiertamente que a los alumnos negros solo debía enseñárseles lo que conviniera a los papeles que el apartheid les tenía reservados, y el sistema infrafinanciado que creó fue un motivo directo de queja tras las protestas de Soweto de 1976.|L'architecte même de la loi, Hendrik Verwoerd, déclara ouvertement que les élèves noirs ne devaient recevoir qu'un enseignement adapté aux rôles que l'apartheid leur réservait, et le système sous-financé ainsi créé fut un grief direct derrière les manifestations de Soweto de 1976.|この法の設計者自身であるヘンドリック・フェルヴールトは、黒人の生徒にはアパルトヘイトが用意した役割にふさわしいことだけを教えればよいと公然と述べた。この法が生んだ予算不足の教育制度は、1976年のソウェト蜂起の直接の不満の一つだった。",
  ),
  q(
    8,
    "What was the pass document, required of Black South Africans to control their movement under apartheid, commonly called?|¿Cómo se llamaba comúnmente el documento de pase que se exigía a los sudafricanos negros para controlar sus desplazamientos bajo el apartheid?|Comment appelait-on couramment le document de laissez-passer exigé des Sud-Africains noirs pour contrôler leurs déplacements sous l'apartheid ?|アパルトヘイト下で黒人の南アフリカ人の移動を管理するために求められた通行証書は、一般に何と呼ばれたか?",
    [
      "The dompas|El dompas|Le dompas|ドンパス",
      "The visumkaart|La visumkaart|La visumkaart|ヴィズムカールト",
      "The reispapier|El reispapier|Le reispapier|レイスパピール",
    ],
    0,
    "Literally a mocking 'dumb pass' in Afrikaans slang, the document had to be produced on demand and recorded where its holder was permitted to live and work; failure to produce one was itself a criminal offence.|Literalmente un 'pase tonto' burlón en jerga afrikáans, el documento debía mostrarse cuando se exigiera y registraba dónde se permitía vivir y trabajar a su titular; no llevarlo era en sí un delito.|Littéralement un « pass stupide » moqueur en argot afrikaans, le document devait être présenté sur demande et consignait où son détenteur était autorisé à vivre et travailler ; ne pas pouvoir le présenter constituait en soi une infraction pénale.|アフリカーンス語の俗語で文字どおり「間抜けな通行証」を意味するドンパスは、求められれば提示せねばならず、所持者がどこに住み働くことを許されているかを記録していた。提示できないこと自体が犯罪とされた。",
  ),
  q(
    8,
    "The 1950 Population Registration Act required every South African to be officially classified into what?|La Ley de Registro de Población de 1950 exigía clasificar oficialmente a todo sudafricano en ¿qué?|Le Population Registration Act de 1950 exigeait que chaque Sud-Africain soit officiellement classé selon quoi ?|1950年の人口登録法は、すべての南アフリカ人を公式に何によって分類することを義務づけたか?",
    [
      "A racial category|Una categoría racial|Une catégorie raciale|人種区分",
      "A trade guild|Un gremio profesional|Une corporation de métier|職業組合",
      "A religious denomination|Una confesión religiosa|Une confession religieuse|宗教宗派",
    ],
    0,
    "The classification, into categories such as White, Coloured, Bantu (Black African) and later Indian, determined where a person could live, whom they could marry and what work they could legally hold, and officials sometimes used tests as crude as a pencil pushed through the hair to decide borderline cases.|La clasificación, en categorías como blanco, mestizo, bantú (africano negro) y más tarde indio, determinaba dónde podía vivir una persona, con quién podía casarse y qué trabajo podía ejercer legalmente, y los funcionarios a veces usaban pruebas tan burdas como pasar un lápiz por el pelo para decidir casos dudosos.|La classification, en catégories telles que Blanc, Métis, Bantou (Africain noir) puis plus tard Indien, déterminait où une personne pouvait vivre, qui elle pouvait épouser et quel travail elle pouvait légalement exercer, et les fonctionnaires recouraient parfois à des tests aussi grossiers qu'un crayon passé dans les cheveux pour trancher les cas limites.|白人・カラード・バントゥー(黒人アフリカ人)、のちにインド系という区分への分類は、どこに住めるか・誰と結婚できるか・法的にどんな仕事に就けるかを決めた。判断の分かれる場合には、鉛筆を髪に通すといった粗雑な検査で決めることさえあった。",
  ),
  q(
    9,
    "Which Johannesburg neighbourhood, a vibrant multiracial hub of jazz and literature in the 1940s and 1950s, was forcibly demolished under the Group Areas Act and renamed 'Triomf'?|¿Qué barrio de Johannesburgo, vibrante centro multirracial de jazz y literatura en los años cuarenta y cincuenta, fue demolido a la fuerza bajo la Ley de Áreas de Grupo y rebautizado 'Triomf'?|Quel quartier de Johannesburg, foyer multiracial vibrant de jazz et de littérature dans les années 1940 et 1950, fut démoli de force en vertu du Group Areas Act et rebaptisé « Triomf » ?|1940〜50年代、ジャズと文学が息づく多人種混住の活気ある地区だったが、集団地域法のもと強制的に取り壊され『トリオンフ(勝利)』と改称されたヨハネスブルグの地区は?",
    [
      "Sophiatown|Sophiatown|Sophiatown|ソフィアタウン",
      "Hillbrow|Hillbrow|Hillbrow|ヒルブロウ",
      "Newtown|Newtown|Newtown|ニュータウン",
    ],
    0,
    "Around 60,000 residents were removed to Meadowlands, part of what became Soweto, beginning in 1955, and the demolished suburb was resettled as a whites-only area under a name meaning 'triumph' in Afrikaans — reversed back to Sophiatown only after 1994.|Unos 60.000 residentes fueron trasladados a Meadowlands, parte de lo que se convertiría en Soweto, desde 1955, y el suburbio demolido se repobló como zona solo para blancos bajo un nombre que significa 'triunfo' en afrikáans, revertido a Sophiatown solo después de 1994.|Environ 60 000 habitants furent déplacés vers Meadowlands, qui deviendrait une partie de Soweto, à partir de 1955, et le quartier rasé fut repeuplé en zone réservée aux Blancs sous un nom signifiant « triomphe » en afrikaans, rendu à Sophiatown seulement après 1994.|1955年から約6万人の住民が、のちのソウェトの一部となるメドウランズへ移された。取り壊された地区はアフリカーンス語で「勝利」を意味する名のもと白人専用地区として再入植され、1994年以降になってようやくソフィアタウンの名に戻された。",
  ),
  q(
    9,
    "Nelson Mandela and other ANC leaders were sentenced to life imprisonment in 1964 after which trial, named for the Johannesburg suburb where police raided their hideout?|Nelson Mandela y otros líderes del CNA fueron condenados a cadena perpetua en 1964 tras ¿qué juicio, llamado por el suburbio de Johannesburgo donde la policía asaltó su escondite?|Nelson Mandela et d'autres dirigeants de l'ANC furent condamnés à la perpétuité en 1964 à l'issue de quel procès, nommé d'après le quartier de Johannesburg où la police fit une descente dans leur cachette ?|ネルソン・マンデラら他のANC指導者たちが1964年に終身刑を宣告されたのは、警察が隠れ家を急襲したヨハネスブルグ郊外の地名にちなむ何裁判の後か?",
    [
      "The Rivonia Trial|El juicio de Rivonia|Le procès de Rivonia|リヴォニア裁判",
      "The Treason Trial|El juicio por traición|Le procès pour trahison|反逆罪裁判",
      "The Delmas Trial|El juicio de Delmas|Le procès de Delmas|デルマス裁判",
    ],
    0,
    "Facing a possible death sentence for sabotage, Mandela used his statement from the dock to declare the ideal of a free, democratic society one he was 'prepared to die for' rather than to plead for leniency.|Ante una posible condena a muerte por sabotaje, Mandela usó su declaración desde el banquillo para proclamar el ideal de una sociedad libre y democrática por el que estaba 'dispuesto a morir', en vez de pedir clemencia.|Face à une possible condamnation à mort pour sabotage, Mandela profita de sa déclaration du box des accusés pour proclamer l'idéal d'une société libre et démocratique pour lequel il était « prêt à mourir », plutôt que de plaider la clémence.|破壊工作の罪で死刑もありえた法廷で、マンデラは減刑を求める代わりに被告席からの陳述で、自由で民主的な社会という理想のために「死ぬ覚悟がある」と宣言した。",
  ),
  q(
    9,
    "'Nkosi Sikelel' iAfrika,' the hymn that forms part of South Africa's national anthem, was composed in 1897 by whom?|'Nkosi Sikelel' iAfrika', el himno que forma parte del himno nacional de Sudáfrica, fue compuesto en 1897 por ¿quién?|« Nkosi Sikelel' iAfrika », le cantique qui forme une partie de l'hymne national sud-africain, fut composé en 1897 par qui ?|南アフリカ国歌の一部をなす賛歌『ンコシ・シケレリ・アフリカ』を1897年に作曲したのは誰か?",
    [
      "Enoch Sontonga, a Methodist school teacher|Enoch Sontonga, un maestro de escuela metodista|Enoch Sontonga, un instituteur méthodiste|メソジスト派の学校教師エノック・ソントンガ",
      "Solomon Linda, a migrant mineworker|Solomon Linda, un minero migrante|Solomon Linda, un mineur migrant|出稼ぎ鉱夫ソロモン・リンダ",
      "Enoch Mankayi, a Methodist bishop|Enoch Mankayi, un obispo metodista|Enoch Mankayi, un évêque méthodiste|エノック・マンカイ(メソジスト派の主教)",
    ],
    0,
    "Sontonga wrote both words and music for a school choir in a Johannesburg township, and died in 1905 without knowing the hymn would later be adopted, in Xhosa and Zulu, as an anthem of the liberation movement and eventually part of the national anthem itself.|Sontonga escribió letra y música para un coro escolar en un township de Johannesburgo, y murió en 1905 sin saber que el himno sería adoptado más tarde, en xhosa y zulú, como himno del movimiento de liberación y, con el tiempo, parte del propio himno nacional.|Sontonga écrivit paroles et musique pour une chorale scolaire dans un township de Johannesburg, et mourut en 1905 sans savoir que le cantique serait plus tard adopté, en xhosa et en zoulou, comme hymne du mouvement de libération puis, finalement, incorporé à l'hymne national lui-même.|ソントンガはヨハネスブルグのタウンシップの学校合唱団のために歌詞と曲の両方を書き、1905年に世を去った。この賛歌がのちにコーサ語とズールー語で解放運動の歌として採用され、やがて国歌そのものの一部になるとは知らないままだった。",
  ),
  q(
    9,
    "Constitution Hill, home to South Africa's Constitutional Court since 1994, incorporates a former prison that once held both Nelson Mandela and which other famous political prisoner decades earlier?|Constitution Hill, sede del Tribunal Constitucional sudafricano desde 1994, incorpora una antigua prisión que décadas antes también retuvo a Nelson Mandela y a ¿qué otro célebre preso político?|Constitution Hill, siège de la Cour constitutionnelle sud-africaine depuis 1994, intègre une ancienne prison qui retint aussi, des décennies plus tôt, Nelson Mandela et quel autre célèbre prisonnier politique ?|1994年以来南アフリカ憲法裁判所が置かれるコンスティテューション・ヒルは、何十年も前にネルソン・マンデラともう一人の有名な政治囚を収容した旧刑務所を含んでいるが、そのもう一人とは?",
    [
      "Mahatma Gandhi|Mahatma Gandhi|Mahatma Gandhi|マハトマ・ガンディー",
      "Emmeline Pankhurst|Emmeline Pankhurst|Emmeline Pankhurst|エメリン・パンクハースト",
      "Kwame Nkrumah|Kwame Nkrumah|Kwame Nkrumah|クワメ・エンクルマ",
    ],
    0,
    "Gandhi was jailed at the Old Fort in 1908 during his campaign against discriminatory laws in South Africa, more than half a century before Mandela himself passed through the same complex, which now sits deliberately alongside the country's highest court as a reminder of what it replaced.|Gandhi fue encarcelado en el Old Fort en 1908 durante su campaña contra leyes discriminatorias en Sudáfrica, más de medio siglo antes de que el propio Mandela pasara por el mismo complejo, que hoy se alza deliberadamente junto al tribunal más alto del país como recordatorio de lo que sustituyó.|Gandhi fut emprisonné à l'Old Fort en 1908 pendant sa campagne contre les lois discriminatoires en Afrique du Sud, plus d'un demi-siècle avant que Mandela lui-même ne passe par le même complexe, qui se dresse aujourd'hui délibérément aux côtés de la plus haute juridiction du pays en rappel de ce qu'il a remplacé.|ガンディーは南アフリカの差別法に対する運動のさなか、1908年にオールド・フォート監獄に収監された。マンデラ自身が同じ施設を通ることになるより半世紀以上前のことである。いまこの場所は、それが置き換えたものを思い起こさせるためにあえて国の最高裁判所と並んで建っている。",
  ),
  q(
    9,
    "Over 600 Black South African troops of the Native Labour Corps drowned in 1917 when their transport ship, the SS Mendi, was struck by another vessel off which coast, an event now marked by South Africa's Armed Forces Day?|Más de 600 soldados negros sudafricanos del Cuerpo de Trabajo Nativo se ahogaron en 1917 cuando su buque de transporte, el SS Mendi, fue embestido por otro navío frente a ¿qué costa, suceso hoy conmemorado en el Día de las Fuerzas Armadas de Sudáfrica?|Plus de 600 soldats noirs sud-africains du Native Labour Corps se noyèrent en 1917 quand leur navire de transport, le SS Mendi, fut heurté par un autre bâtiment au large de quelle côte, événement aujourd'hui commémoré par la journée des Forces armées sud-africaines ?|南アフリカ先住民労務隊の兵士600人以上が、1917年に輸送船SSメンディが他の船と衝突して沈み溺死した。それはどの沖合で起きたか。この出来事はいまも南アフリカの国軍記念日として記念されている。",
    [
      "The southern English coast|La costa sur de Inglaterra|La côte sud de l'Angleterre|イングランド南岸",
      "The West African coast|La costa de África Occidental|La côte d'Afrique de l'Ouest|西アフリカ沿岸",
      "The Egyptian coast|La costa egipcia|La côte égyptienne|エジプト沿岸",
    ],
    0,
    "The men were unarmed labourers being carried to France to dig trenches and build roads for the Allied war effort, since Black South Africans were barred from combat roles, and the disaster remained comparatively little marked for decades before being formally commemorated.|Los hombres eran obreros desarmados transportados a Francia para cavar trincheras y construir carreteras para el esfuerzo bélico aliado, ya que a los sudafricanos negros se les prohibía el combate, y el desastre quedó relativamente poco recordado durante décadas antes de conmemorarse formalmente.|Ces hommes étaient des travailleurs non armés transportés vers la France pour creuser des tranchées et construire des routes pour l'effort de guerre allié, les Sud-Africains noirs étant exclus des rôles de combat, et le désastre resta relativement peu commémoré pendant des décennies avant de l'être officiellement.|彼らは非武装の労働者で、黒人の南アフリカ人が戦闘任務を禁じられていたため、連合国の戦争遂行のため塹壕を掘り道路を作る目的でフランスへ運ばれる途中だった。この惨事は何十年も比較的顧みられないままだったのち、正式に追悼されるようになった。",
  ),
  q(
    10,
    "'Fanakalo', a simplified pidgin blending Zulu, English and Afrikaans, developed mainly as a working lingua franca in which industry?|El 'fanakalo', un pidgin simplificado que mezcla zulú, inglés y afrikáans, se desarrolló sobre todo como lengua franca de trabajo en ¿qué industria?|Le « fanakalo », pidgin simplifié mêlant zoulou, anglais et afrikaans, s'est développé surtout comme langue de travail commune dans quelle industrie ?|ズールー語・英語・アフリカーンス語を混ぜた簡易ピジン言語『ファナカロ』が、主に作業用の共通語として発達したのはどの産業か?",
    [
      "Mining|La minería|Les mines|鉱業",
      "Fishing|La pesca|La pêche|漁業",
      "Winemaking|La vinicultura|La viticulture|ワイン醸造",
    ],
    0,
    "With migrant labourers arriving at the mines speaking dozens of mutually unintelligible languages, a stripped-down working vocabulary of a few hundred words let supervisors give instructions underground, and the language is still used, and still criticised as a colonial-era relic, in some mines today.|Con obreros migrantes que llegaban a las minas hablando decenas de lenguas mutuamente ininteligibles, un vocabulario de trabajo reducido a unos pocos cientos de palabras permitía a los capataces dar instrucciones bajo tierra, y la lengua aún se usa, y aún se critica como reliquia colonial, en algunas minas hoy.|Avec des travailleurs migrants arrivant aux mines en parlant des dizaines de langues mutuellement incompréhensibles, un vocabulaire de travail réduit à quelques centaines de mots permettait aux contremaîtres de donner des instructions sous terre, et la langue est encore utilisée, et encore critiquée comme relique de l'ère coloniale, dans certaines mines aujourd'hui.|互いに通じない何十もの言語を話す出稼ぎ労働者が鉱山に集まる中、数百語ほどに切り詰めた作業用語彙があれば、監督は坑内で指示を出せた。この言語はいまも一部の鉱山で使われ続けており、いまも植民地時代の遺物だと批判され続けている。",
  ),

  // ---- 追加分:難易度1〜3 ----
  q(
    2,
    "Which of these is NOT a current South African province?|¿Cuál de estos NO es una provincia sudafricana actual?|Lequel de ceux-ci n'est PAS une province sud-africaine actuelle ?|次のうち、現在の南アフリカの州でないものは?",
    ["Transvaal|Transvaal|Le Transvaal|トランスヴァール", "Mpumalanga|Mpumalanga|Mpumalanga|ムプマランガ", "Gauteng|Gauteng|Gauteng|ハウテン"],
    0,
    "The old province of Transvaal was split into four new provinces, including Gauteng and Mpumalanga, when South Africa's provincial map was redrawn from four provinces to nine in 1994.|La antigua provincia del Transvaal se dividió en cuatro provincias nuevas, incluidas Gauteng y Mpumalanga, cuando el mapa provincial de Sudáfrica se rediseñó de cuatro a nueve provincias en 1994.|L'ancienne province du Transvaal fut divisée en quatre nouvelles provinces, dont le Gauteng et le Mpumalanga, quand la carte provinciale sud-africaine passa de quatre à neuf provinces en 1994.|旧トランスヴァール州は、1994年に南アフリカの州区分が4州から9州に描き直された際、ハウテンやムプマランガを含む4つの新しい州に分割された。",
  ),
  q(
    3,
    "What is a 'koeksister', a popular South African treat?|¿Qué es un 'koeksister', un dulce popular sudafricano?|Qu'est-ce qu'un « koeksister », une friandise populaire sud-africaine ?|人気の南アフリカの甘味『クックシスター』とは?",
    [
      "A plaited pastry soaked in syrup|Una masa trenzada empapada en almíbar|Une pâte tressée trempée dans du sirop|シロップに浸した編み込みの揚げ菓子",
      "A savoury meat pie|Una empanada salada de carne|Une tourte salée à la viande|肉入りの塩気のあるパイ",
      "A type of dried sausage|Un tipo de salchicha seca|Un type de saucisse séchée|乾燥ソーセージの一種",
    ],
    0,
    "The dough is plaited, deep-fried and plunged straight into cold sugar syrup while still hot, so the outside stays sticky-sweet while the inside stays light; Cape Malay and Afrikaner kitchens both claim versions of it.|La masa se trenza, se fríe y se sumerge directamente en almíbar frío mientras aún está caliente, para que el exterior quede pegajoso y dulce mientras el interior se mantiene ligero; tanto la cocina malaya del Cabo como la afrikáner reclaman versiones propias.|La pâte est tressée, frite puis plongée directement dans un sirop de sucre froid encore chaude, si bien que l'extérieur reste collant et sucré tandis que l'intérieur reste léger ; la cuisine malaise du Cap comme la cuisine afrikaner en revendiquent chacune une version.|生地を編んで揚げ、熱いうちにそのまま冷たい砂糖シロップに浸すため、外はねっとり甘く中は軽い食感になる。ケープマレー料理とアフリカーナー料理の両方が、それぞれ自分たちのものだと主張している。",
  ),
  q(
    1,
    "Which side of the road do South African drivers drive on?|¿Por qué lado de la carretera conducen los sudafricanos?|Les Sud-Africains conduisent-ils du côté de la route... lequel ?|南アフリカのドライバーは道のどちら側を走るか?",
    ["The left|La izquierda|La gauche|左側", "The right|La derecha|La droite|右側", "It varies by province|Varía según la provincia|Cela varie selon la province|州によって異なる"],
    0,
    "Like most former British territories, South Africa drives on the left, a rule that has stayed constant nationwide since colonial times.|Como la mayoría de los antiguos territorios británicos, Sudáfrica conduce por la izquierda, una norma que se ha mantenido constante en todo el país desde la época colonial.|Comme la plupart des anciens territoires britanniques, l'Afrique du Sud roule à gauche, une règle restée constante dans tout le pays depuis l'époque coloniale.|かつての英国領の多くと同じく、南アフリカは左側通行である。この規則は植民地時代から全国で変わらず続いている。",
  ),
  q(
    3,
    "Which desert lies along South Africa's border with Botswana and Namibia?|¿Qué desierto se extiende en la frontera de Sudáfrica con Botsuana y Namibia?|Quel désert s'étend à la frontière de l'Afrique du Sud avec le Botswana et la Namibie ?|南アフリカとボツワナ・ナミビアの国境に広がる砂漠は?",
    ["The Kalahari|El Kalahari|Le Kalahari|カラハリ砂漠", "The Sahara|El Sáhara|Le Sahara|サハラ砂漠", "The Namib|El Namib|Le Namib|ナミブ砂漠"],
    0,
    "The Kalahari is technically a semi-desert, since it gets slightly more rainfall than a true desert, but its deep red sand and sparse vegetation stretch across parts of the Northern Cape, Botswana and Namibia alike.|El Kalahari es técnicamente un semidesierto, ya que recibe algo más de lluvia que un desierto verdadero, pero su arena roja profunda y su escasa vegetación se extienden por partes del Cabo Septentrional, Botsuana y Namibia por igual.|Le Kalahari est techniquement un semi-désert, recevant un peu plus de pluie qu'un désert véritable, mais son sable rouge profond et sa végétation clairsemée s'étendent aussi bien sur des parties du Cap-Nord, du Botswana que de la Namibie.|カラハリは真の砂漠よりわずかに雨が多いため厳密には半砂漠だが、その深紅の砂とまばらな植生は北ケープ・ボツワナ・ナミビアにまたがって広がっている。",
  ),
  q(
    3,
    "Which big cat is famously NOT one of the 'Big Five'?|¿Qué felino grande, famosamente, NO es uno de los 'Big Five'?|Quel grand félin, notoirement, ne fait PAS partie des « Big Five » ?|『ビッグファイブ』に含まれないことで知られる大型ネコ科動物は?",
    ["The cheetah|El guepardo|Le guépard|チーター", "The lion|El león|Le lion|ライオン", "The leopard|El leopardo|Le léopard|ヒョウ"],
    0,
    "The Big Five — lion, leopard, elephant, buffalo and rhinoceros — was defined by how dangerous an animal was to hunt on foot, and the cheetah, which relies on fleeing rather than fighting, never made the list.|Los Big Five (león, leopardo, elefante, búfalo y rinoceronte) se definieron según lo peligroso que era cazar cada animal a pie, y el guepardo, que confía en huir antes que en pelear, nunca entró en la lista.|Les Big Five (lion, léopard, éléphant, buffle et rhinocéros) furent définis selon le danger que représentait la chasse à pied de chaque animal, et le guépard, qui compte sur la fuite plutôt que le combat, n'a jamais figuré sur la liste.|ビッグファイブ(ライオン・ヒョウ・ゾウ・バッファロー・サイ)は、徒歩で狩るのにどれだけ危険かで定められた分類であり、戦うより逃げることに頼るチーターは一度もその中に入ったことがない。",
  ),

  // ---- 追加分:難易度7〜10 ----
  q(
    8,
    "The Freedom Charter, a foundational document for the anti-apartheid movement, was adopted in 1955 at the Congress of the People in which Johannesburg-area location?|La Carta de la Libertad, documento fundacional del movimiento contra el apartheid, se adoptó en 1955 en el Congreso del Pueblo, en ¿qué lugar del área de Johannesburgo?|La Charte de la liberté, document fondateur du mouvement anti-apartheid, fut adoptée en 1955 au Congrès du peuple, dans quel lieu de la région de Johannesburg ?|反アパルトヘイト運動の礎となった文書『自由憲章』が1955年、人民会議で採択されたヨハネスブルグ近郊の場所は?",
    [
      "Kliptown|Kliptown|Kliptown|クリップタウン",
      "Sandton|Sandton|Sandton|サントン",
      "Hillbrow|Hillbrow|Hillbrow|ヒルブロウ",
    ],
    0,
    "Around 3,000 delegates gathered in an open field in Kliptown, part of what is now Soweto, to adopt a charter opening with the words 'The People Shall Govern!' — a document police raided on the second day, arresting many present on treason charges.|Cerca de 3.000 delegados se reunieron en un campo abierto de Kliptown, parte de lo que hoy es Soweto, para adoptar una carta que empieza con las palabras '¡El pueblo gobernará!', documento que la policía allanó al segundo día, arrestando a muchos presentes por traición.|Environ 3 000 délégués se réunirent dans un champ ouvert de Kliptown, aujourd'hui partie de Soweto, pour adopter une charte s'ouvrant sur les mots « Le peuple gouvernera ! » — un document que la police vint saisir le deuxième jour, arrêtant nombre des personnes présentes pour trahison.|およそ3000人の代表が、いまのソウェトの一部であるクリップタウンの野原に集まり、『人民が統治する!』の言葉で始まる憲章を採択した。二日目には警官隊がこれを急襲し、居合わせた多くの者が反逆罪で逮捕された。",
  ),
  q(
    8,
    "Umkhonto we Sizwe, the armed wing of the ANC co-founded by Nelson Mandela in 1961, takes a name meaning what?|Umkhonto we Sizwe, brazo armado del CNA cofundado por Nelson Mandela en 1961, tiene un nombre que significa ¿qué?|Umkhonto we Sizwe, branche armée de l'ANC cofondée par Nelson Mandela en 1961, porte un nom signifiant quoi ?|1961年にネルソン・マンデラが共同創設したANCの軍事部門ウムコント・ウェ・シズウェの名の意味は?",
    [
      "Spear of the Nation|Lanza de la Nación|Lance de la Nation|民族の槍",
      "Voice of the People|Voz del Pueblo|Voix du Peuple|人民の声",
      "Shield of Freedom|Escudo de la Libertad|Bouclier de la Liberté|自由の盾",
    ],
    0,
    "Formed after decades of strictly non-violent resistance had failed to move the apartheid government, the organisation, often shortened to MK, initially targeted infrastructure such as power stations rather than people, a distinction its founders considered important.|Formada tras décadas de resistencia estrictamente no violenta que no lograron mover al gobierno del apartheid, la organización, a menudo abreviada MK, apuntó al principio a infraestructuras como centrales eléctricas y no a personas, una distinción que sus fundadores consideraban importante.|Formée après des décennies de résistance strictement non violente qui n'avaient pas fait fléchir le gouvernement de l'apartheid, l'organisation, souvent abrégée MK, visa d'abord des infrastructures comme des centrales électriques plutôt que des personnes, une distinction que ses fondateurs jugeaient importante.|何十年にもわたる非暴力抵抗ではアパルトヘイト政権を動かせなかったのち結成されたこの組織は、略称MKとも呼ばれ、当初は人ではなく発電所などの施設を標的にした。創設者たちはこの区別を重要だと考えていた。",
  ),
  q(
    8,
    "The South African Border War (1966–1989) was fought largely over South Africa's control of which neighbouring territory?|La Guerra de Fronteras de Sudáfrica (1966-1989) se libró en gran medida por el control sudafricano de ¿qué territorio vecino?|La guerre frontalière sud-africaine (1966-1989) se joua en grande partie autour du contrôle sud-africain de quel territoire voisin ?|南アフリカ国境戦争(1966〜1989年)は、南アフリカによるどの隣接領土の支配をめぐって主に戦われたか?",
    [
      "South West Africa (now Namibia)|El África Sudoccidental (hoy Namibia)|Le Sud-Ouest africain (aujourd'hui la Namibie)|南西アフリカ(現ナミビア)",
      "Southern Rhodesia (now Zimbabwe)|Rodesia del Sur (hoy Zimbabue)|La Rhodésie du Sud (aujourd'hui le Zimbabwe)|南ローデシア(現ジンバブエ)",
      "Portuguese East Africa (now Mozambique)|El África Oriental Portuguesa (hoy Mozambique)|L'Afrique orientale portugaise (aujourd'hui le Mozambique)|ポルトガル領東アフリカ(現モザンビーク)",
    ],
    0,
    "South Africa administered South West Africa under an old League of Nations mandate and fought a long guerrilla war against independence movements there before the territory finally became independent Namibia in 1990.|Sudáfrica administraba el África Sudoccidental bajo un antiguo mandato de la Sociedad de Naciones y libró allí una larga guerra de guerrillas contra movimientos independentistas antes de que el territorio se convirtiera por fin en la Namibia independiente en 1990.|L'Afrique du Sud administrait le Sud-Ouest africain sous un ancien mandat de la Société des Nations et y mena une longue guerre de guérilla contre les mouvements indépendantistes avant que le territoire ne devienne enfin la Namibie indépendante en 1990.|南アフリカは旧国際連盟の委任統治のもと南西アフリカを統治しており、その地の独立運動を相手に長いゲリラ戦を続けたのち、1990年にようやく独立ナミビアとなった。",
  ),
  q(
    9,
    "Steve Biko, founder of the Black Consciousness Movement, died in 1977 under what circumstances that made him an international symbol of apartheid's brutality?|Steve Biko, fundador del Movimiento de Conciencia Negra, murió en 1977 en ¿qué circunstancias que lo convirtieron en símbolo internacional de la brutalidad del apartheid?|Steve Biko, fondateur du Mouvement de la conscience noire, mourut en 1977 dans quelles circonstances qui firent de lui un symbole international de la brutalité de l'apartheid ?|ブラック・コンシャスネス運動の創始者スティーブ・ビコが1977年、アパルトヘイトの残虐さの国際的な象徴となる形で死んだ状況とは?",
    [
      "He died of head injuries while in police custody|Murió de lesiones en la cabeza bajo custodia policial|Il mourut de blessures à la tête en garde à vue|警察の拘留中に頭部の負傷で死亡した",
      "He died in a car accident staged by police|Murió en un accidente de coche organizado por la policía|Il mourut dans un accident de voiture organisé par la police|警察が偽装した自動車事故で死亡した",
      "He died on hunger strike in prison|Murió en huelga de hambre en prisión|Il mourut d'une grève de la faim en prison|獄中のハンガーストライキで死亡した",
    ],
    0,
    "Beaten and left with severe brain injury, Biko was then driven naked and shackled some 1,100 km to a Pretoria prison hospital, where he died; the security police involved were denied amnesty decades later after South Africa's Truth and Reconciliation Commission found their account of his death did not hold up.|Golpeado y con graves lesiones cerebrales, Biko fue trasladado desnudo y encadenado unos 1.100 km hasta un hospital penitenciario de Pretoria, donde murió; a la policía de seguridad implicada se le negó la amnistía décadas después, cuando la Comisión de la Verdad y la Reconciliación de Sudáfrica concluyó que su versión de la muerte no se sostenía.|Battu et laissé avec de graves lésions cérébrales, Biko fut ensuite transporté nu et enchaîné sur quelque 1 100 km jusqu'à un hôpital pénitentiaire de Pretoria, où il mourut ; la police de sécurité impliquée se vit refuser l'amnistie des décennies plus tard, la Commission Vérité et Réconciliation sud-africaine ayant jugé leur version des faits intenable.|殴打され重い脳損傷を負ったビコは、裸のまま鎖につながれて約1100kmをプレトリアの刑務所病院まで運ばれ、そこで死亡した。関与した保安警察は何十年ものち、南アフリカ真実和解委員会が彼らの死因説明を認めなかったことで恩赦を拒まれた。",
  ),

  // ---- 追加分:難易度4〜6 ----
  q(
    4,
    "Which of these is a South African English word for a small rural town?|¿Cuál de estas es una palabra del inglés sudafricano para un pequeño pueblo rural?|Lequel de ces mots de l'anglais sud-africain désigne une petite ville rurale ?|小さな田舎町を指す南アフリカ英語の単語はどれか?",
    ["A 'dorp'|Un 'dorp'|Un « dorp »|『ドルプ』", "A 'kraal'|Un 'kraal'|Un « kraal »|『クラール』", "A 'stoep'|Un 'stoep'|Un « stoep »|『ストゥープ』"],
    0,
    "Borrowed straight from Afrikaans/Dutch, 'dorp' is used affectionately as often as literally, and 'a real dorp' can mean anything from a tiny farming town to just somewhere considered sleepy.|Tomada directamente del afrikáans/neerlandés, 'dorp' se usa tanto con cariño como literalmente, y 'un verdadero dorp' puede significar desde un pueblito agrícola hasta simplemente un lugar considerado tranquilo.|Emprunté directement à l'afrikaans/néerlandais, « dorp » s'emploie autant avec affection qu'au sens littéral, et « un vrai dorp » peut désigner aussi bien une minuscule ville agricole qu'un endroit jugé simplement endormi.|オランダ語・アフリカーンス語からそのまま借りた『ドルプ』は、文字どおりの意味と同じくらい親しみを込めて使われ、『本当のドルプ』は小さな農業の町からただ静かな場所まで幅広く指す。",
  ),
  q(
    3,
    "In South African slang, what does 'lekker' mean?|En jerga sudafricana, ¿qué significa 'lekker'?|En argot sud-africain, que signifie « lekker » ?|南アフリカの俗語で『レッカー』とはどういう意味か?",
    ["Nice, great or tasty|Agradable, genial o sabroso|Sympa, super ou savoureux|よい・すてき・おいしい", "Terrible or broken|Terrible o roto|Terrible ou cassé|ひどい・壊れている", "Expensive|Caro|Cher|高価な"],
    0,
    "Borrowed from Afrikaans/Dutch, 'lekker' is used across every South African language community, from describing good food to a good day out, and turns up constantly in everyday conversation.|Tomada del afrikáans/neerlandés, 'lekker' se usa en todas las comunidades lingüísticas sudafricanas, para describir desde buena comida hasta un buen día, y aparece constantemente en la conversación cotidiana.|Empruntée à l'afrikaans/néerlandais, « lekker » s'emploie dans toutes les communautés linguistiques sud-africaines, pour qualifier aussi bien une bonne nourriture qu'une bonne sortie, et revient sans cesse dans la conversation quotidienne.|オランダ語・アフリカーンス語由来の『レッカー』は南アフリカのあらゆる言語共同体で使われ、おいしい食べ物から楽しい一日まで表し、日常会話に絶えず登場する。",
  ),
  q(
    4,
    "In South African English, what does the word 'robot' commonly mean?|En el inglés sudafricano, ¿qué suele significar la palabra 'robot'?|En anglais sud-africain, que signifie couramment le mot « robot » ?|南アフリカ英語で『ロボット』という語が日常的に意味するものは?",
    ["A traffic light|Un semáforo|Un feu de circulation|信号機", "A vending machine|Una máquina expendedora|Un distributeur automatique|自動販売機", "A parking meter|Un parquímetro|Un parcmètre|パーキングメーター"],
    0,
    "Visitors are often baffled by directions like 'turn left at the second robot,' a usage that traces back to early twentieth-century British engineering terminology for automatic signalling devices.|A los visitantes suele desconcertarles indicaciones como 'gira a la izquierda en el segundo robot', un uso que se remonta a la terminología británica de ingeniería de principios del siglo XX para dispositivos de señalización automática.|Les visiteurs sont souvent déconcertés par des indications comme « tourne à gauche au deuxième robot », un usage qui remonte à la terminologie d'ingénierie britannique du début du XXe siècle pour les dispositifs de signalisation automatique.|『二つ目のロボットを左に曲がって』のような道案内に、訪問者はしばしば戸惑う。この用法は20世紀初頭の英国の工学用語で自動信号装置を指した言葉に由来する。",
  ),
  q(
    4,
    "What is a 'bakkie' in South African English?|¿Qué es una 'bakkie' en el inglés sudafricano?|Qu'est-ce qu'une « bakkie » en anglais sud-africain ?|南アフリカ英語での『バッキー』とは?",
    ["A pickup truck|Una camioneta pickup|Une camionnette pick-up|ピックアップトラック", "A small sailing boat|Un pequeño velero|Un petit voilier|小型の帆船", "A woven picnic basket|Una cesta de pícnic tejida|Un panier de pique-nique tressé|編んだピクニックバスケット"],
    0,
    "Bakkies are so central to farm and trade work across the country that entire vehicle model lines are marketed on toughness for exactly this market, and the word is used regardless of brand.|Las bakkies son tan centrales en el trabajo agrícola y comercial de todo el país que líneas enteras de modelos de vehículos se venden por su resistencia justamente para este mercado, y la palabra se usa sin importar la marca.|Les bakkies sont si centrales dans le travail agricole et commercial à travers le pays que des gammes entières de véhicules sont vendues sur leur robustesse justement pour ce marché, et le mot s'emploie quelle que soit la marque.|バッキーは全国の農作業や商売にあまりに欠かせないため、まさにこの市場向けに頑丈さを売りにする車種のラインナップが丸ごと存在し、ブランドを問わずこの語が使われる。",
  ),
  q(
    5,
    "Which 19th-century king united numerous small chiefdoms into the powerful Zulu Kingdom through sweeping military reform?|¿Qué rey del siglo XIX unió numerosos pequeños cacicazgos en el poderoso Reino Zulú mediante una amplia reforma militar?|Quel roi du XIXe siècle unifia de nombreuses petites chefferies au sein du puissant royaume zoulou grâce à une vaste réforme militaire ?|19世紀、広範な軍制改革によって数多くの小さな首長国を強大なズールー王国へと統一した王は?",
    ["Shaka|Shaka|Shaka|シャカ", "Moshoeshoe|Moshoeshoe|Moshoeshoe|モショエショエ", "Cetshwayo|Cetshwayo|Cetshwayo|セチュワヨ"],
    0,
    "Shaka reorganised Zulu regiments around age-based units and a short stabbing spear designed for close combat, building a kingdom whose expansion reshaped the political map of southern Africa in the early 1800s.|Shaka reorganizó los regimientos zulúes en unidades por edades y una lanza corta de estocada diseñada para el combate cuerpo a cuerpo, construyendo un reino cuya expansión rehízo el mapa político del sur de África a comienzos del siglo XIX.|Shaka réorganisa les régiments zoulous en unités fondées sur l'âge et une courte lance d'estoc conçue pour le corps à corps, bâtissant un royaume dont l'expansion redessina la carte politique de l'Afrique australe au début du XIXe siècle.|シャカはズールーの連隊を年齢に基づく部隊に再編し、近接戦闘用の短い刺突槍を導入して、その拡大が19世紀初頭の南部アフリカの政治地図を塗り替えるほどの王国を築いた。",
  ),
  q(
    6,
    "South Africa, Lesotho, Eswatini and Namibia share a monetary arrangement in which their currencies are pegged one-to-one to which currency?|Sudáfrica, Lesoto, Esuatini y Namibia comparten un acuerdo monetario en el que sus monedas están fijadas uno a uno con ¿qué moneda?|L'Afrique du Sud, le Lesotho, l'Eswatini et la Namibie partagent un arrangement monétaire où leurs monnaies sont arrimées une pour une à quelle monnaie ?|南アフリカ・レソト・エスワティニ・ナミビアが通貨をある通貨と1対1で連動させる取り決めを結んでいる、その通貨とは?",
    [
      "The South African rand|El rand sudafricano|Le rand sud-africain|南アフリカ・ランド",
      "The US dollar|El dólar estadounidense|Le dollar américain|米ドル",
      "The euro|El euro|L'euro|ユーロ",
    ],
    0,
    "Under the Common Monetary Area arrangement, the rand also circulates as legal tender in Lesotho, Eswatini and Namibia alongside each country's own currency, tying their economies closely to decisions made by South Africa's central bank.|Bajo el acuerdo del Área Monetaria Común, el rand también circula como moneda de curso legal en Lesoto, Esuatini y Namibia junto a la moneda propia de cada país, ligando estrechamente sus economías a las decisiones del banco central sudafricano.|Dans le cadre de la zone monétaire commune, le rand circule aussi comme monnaie légale au Lesotho, en Eswatini et en Namibie aux côtés de la monnaie propre de chaque pays, liant étroitement leurs économies aux décisions de la banque centrale sud-africaine.|共通通貨圏の取り決めのもと、ランドはレソト・エスワティニ・ナミビアでもそれぞれの国の通貨と並んで法定通貨として流通しており、これらの国の経済を南アフリカ中央銀行の決定に密接に結びつけている。",
  ),
  q(
    2,
    "Alongside gold and platinum, which precious gem is South Africa one of the world's leading producers of?|Junto con el oro y el platino, ¿de qué gema preciosa es Sudáfrica uno de los principales productores del mundo?|Aux côtés de l'or et du platine, de quelle pierre précieuse l'Afrique du Sud est-elle l'un des principaux producteurs mondiaux ?|金・白金と並んで、南アフリカが世界有数の産出国であるのはどの宝石か?",
    ["Diamonds|Diamantes|Les diamants|ダイヤモンド", "Emeralds|Esmeraldas|Les émeraudes|エメラルド", "Sapphires|Zafiros|Les saphirs|サファイア"],
    0,
    "Diamond mining has run continuously in South Africa since the 1870s, and the country remains among the world's top producers by value even as output has shifted toward other African nations in recent decades.|La minería de diamantes ha funcionado sin interrupción en Sudáfrica desde la década de 1870, y el país sigue entre los principales productores mundiales por valor, aunque la producción se ha desplazado hacia otras naciones africanas en las últimas décadas.|L'extraction de diamants tourne sans interruption en Afrique du Sud depuis les années 1870, et le pays reste parmi les principaux producteurs mondiaux en valeur, même si la production s'est déplacée vers d'autres nations africaines ces dernières décennies.|ダイヤモンド採掘は1870年代から南アフリカで途切れず続いており、近年になって産出の中心が他のアフリカ諸国へ移りつつあるとはいえ、いまも金額ベースで世界有数の産出国であり続けている。",
  ),
  q(
    5,
    "In South African township slang, what does 'ekasi' or 'kasi' refer to?|En la jerga de los townships sudafricanos, ¿a qué se refiere 'ekasi' o 'kasi'?|Dans l'argot des townships sud-africains, à quoi renvoie « ekasi » ou « kasi » ?|南アフリカのタウンシップの俗語で『エカシ』『カシ』が指すものは?",
    ["The township itself, used affectionately|El propio township, usado con cariño|Le township lui-même, employé avec affection|タウンシップそのもの(親しみを込めて)", "A minibus taxi rank|Una parada de taxis minibús|Une station de taxis minibus|ミニバスタクシー乗り場", "A style of music|Un estilo musical|Un style de musique|音楽の一様式"],
    0,
    "Short for 'lokasie', Afrikaans for 'location', the word has been reclaimed as a term of pride and belonging rather than the bureaucratic label it started as under segregation-era planning.|Abreviatura de 'lokasie', afrikáans para 'location' (asentamiento), la palabra se ha reivindicado como término de orgullo y pertenencia en vez de la etiqueta burocrática que fue en la planificación de la era de la segregación.|Abréviation de « lokasie », afrikaans pour « location » (implantation), le mot a été réapproprié comme terme de fierté et d'appartenance plutôt que l'étiquette bureaucratique qu'il était à l'origine sous la planification de l'ère ségrégationniste.|アフリカーンス語で『居住地』を意味する『ロカシー』を縮めたこの言葉は、隔離時代の都市計画が付けた官僚的な呼び名から、誇りと帰属を表す言葉へと市民自身の手で取り戻された。",
  ),
  q(
    6,
    "The Vaal Dam, one of South Africa's largest reservoirs, primarily supplies water to which economic hub?|La represa del Vaal, uno de los mayores embalses de Sudáfrica, abastece de agua sobre todo a ¿qué polo económico?|Le barrage du Vaal, l'un des plus grands réservoirs d'Afrique du Sud, alimente en eau principalement quel pôle économique ?|南アフリカ最大級の貯水池フォールダムが主に水を供給する経済の中心地は?",
    ["The Gauteng city region|La región urbana de Gauteng|La région urbaine du Gauteng|ハウテンの都市圏", "The Cape Town metro|El área metropolitana de Ciudad del Cabo|La métropole du Cap|ケープタウン都市圏", "The Durban metro|El área metropolitana de Durban|La métropole de Durban|ダーバン都市圏"],
    0,
    "Completed in 1938 on the Vaal River, the dam underpins water supply for the densely populated, landlocked Gauteng province, home to Johannesburg and Pretoria but with no major river of its own.|Terminada en 1938 sobre el río Vaal, la represa sostiene el suministro de agua de la densamente poblada provincia interior de Gauteng, hogar de Johannesburgo y Pretoria pero sin río propio importante.|Achevé en 1938 sur le fleuve Vaal, le barrage soutient l'approvisionnement en eau de la province enclavée et densément peuplée du Gauteng, qui abrite Johannesburg et Pretoria mais ne possède pas de cours d'eau majeur.|1938年にフォール川に完成したこのダムは、ヨハネスブルグとプレトリアを抱えながら自前の大きな川を持たない、内陸で人口密度の高いハウテン州の水供給を支えている。",
  ),
  q(
    6,
    "In 2003, South Africa co-hosted the final of which major international cricket tournament, held at Johannesburg's Wanderers Stadium?|En 2003, Sudáfrica coorganizó la final de ¿qué gran torneo internacional de críquet, celebrada en el estadio Wanderers de Johannesburgo?|En 2003, l'Afrique du Sud coorganisa la finale de quel grand tournoi international de cricket, disputée au stade Wanderers de Johannesburg ?|2003年、南アフリカがヨハネスブルグのワンダラーズ・スタジアムでの決勝を含めて開催した大きな国際クリケット大会は?",
    ["The Cricket World Cup|La Copa Mundial de Críquet|La Coupe du monde de cricket|クリケット・ワールドカップ", "The Ashes|Las Ashes|Les Ashes|アッシズ", "The Ranji Trophy|El Trofeo Ranji|Le trophée Ranji|ランジー・トロフィー"],
    0,
    "Australia beat India in the final to win the tournament, and South Africa's own team was eliminated in the first round after a rain-rule miscalculation left them mistakenly believing a tied match was enough to advance.|Australia venció a India en la final para ganar el torneo, y el propio equipo sudafricano quedó eliminado en la primera ronda tras un error de cálculo con la regla de lluvia que les hizo creer erróneamente que un empate bastaba para avanzar.|L'Australie battit l'Inde en finale pour remporter le tournoi, et l'équipe sud-africaine elle-même fut éliminée au premier tour après une erreur de calcul sur la règle de pluie qui leur fit croire à tort qu'un match nul suffisait à se qualifier.|決勝ではオーストラリアがインドを破って優勝し、開催国の南アフリカ自身は初戦敗退に終わった。降雨ルールの計算違いにより、引き分けで十分に勝ち上がれると誤解してしまったためだった。",
  ),
  q(
    6,
    "For most of the twentieth century, South Africa was the world's largest producer of which metal?|Durante la mayor parte del siglo XX, Sudáfrica fue el mayor productor mundial de ¿qué metal?|Pendant la majeure partie du XXe siècle, l'Afrique du Sud fut le premier producteur mondial de quel métal ?|20世紀の大半、南アフリカが世界最大の産出国だった金属は?",
    ["Gold|Oro|L'or|金", "Copper|Cobre|Le cuivre|銅", "Tin|Estaño|L'étain|スズ"],
    0,
    "South Africa held the title for most of the twentieth century before China, Australia and Russia each overtook it in gold output in the 2000s, even though many South African mines remain among the deepest and richest by ore grade.|Sudáfrica ostentó el título durante la mayor parte del siglo XX antes de que China, Australia y Rusia la superaran en producción de oro en la década de 2000, aunque muchas minas sudafricanas siguen entre las más profundas y ricas por ley del mineral.|L'Afrique du Sud détint ce titre durant la majeure partie du XXe siècle avant que la Chine, l'Australie et la Russie ne la dépassent en production d'or dans les années 2000, même si de nombreuses mines sud-africaines restent parmi les plus profondes et les plus riches en teneur.|南アフリカは20世紀の大半この座を占めていたが、2000年代に中国・オーストラリア・ロシアがそれぞれ金の産出量で追い越した。それでも南アフリカの多くの鉱山は、いまも品位の高さと深さの点で屈指である。",
  ),
  q(
    5,
    "South Africa's highest point, Mafadi peak at just over 3,450 metres, lies within which mountain range?|El punto más alto de Sudáfrica, el pico Mafadi, a poco más de 3.450 metros, se encuentra en ¿qué cordillera?|Le point culminant de l'Afrique du Sud, le pic Mafadi, à un peu plus de 3 450 mètres, se trouve dans quelle chaîne de montagnes ?|標高3450メートル余りの南アフリカ最高峰マファディ峰があるのはどの山脈か?",
    ["The Drakensberg|El Drakensberg|Le Drakensberg|ドラケンスバーグ山脈", "The Cape Fold Mountains|Las montañas del Plegamiento del Cabo|Les montagnes du plissement du Cap|ケープ褶曲山脈", "The Waterberg|El Waterberg|Le Waterberg|ウォーターバーグ山脈"],
    0,
    "Mafadi sits on the KwaZulu-Natal side of the Drakensberg escarpment, close to but just short of Lesotho's even higher peaks across the border, which claim the title for the region as a whole.|Mafadi se sitúa en el lado de KwaZulu-Natal de la escarpa del Drakensberg, cerca pero por debajo de los picos aún más altos de Lesoto al otro lado de la frontera, que se llevan el título para la región en su conjunto.|Le Mafadi se trouve du côté KwaZulu-Natal de l'escarpement du Drakensberg, proche mais légèrement en dessous des sommets encore plus hauts du Lesotho de l'autre côté de la frontière, qui détiennent le titre pour la région dans son ensemble.|マファディ峰はドラケンスバーグ山系のクワズール・ナタール側にあり、国境の向こうレソトにあるさらに高い峰々にわずかに及ばない。地域全体としての最高峰の座はレソト側が持つ。",
  ),
  q(
    6,
    "Tugela Falls, in the Drakensberg, is often ranked among the world's tallest waterfalls, dropping in stages over a total height of roughly how much?|Las cataratas Tugela, en el Drakensberg, suelen figurar entre las más altas del mundo, cayendo en etapas a lo largo de una altura total de aproximadamente ¿cuánto?|Les chutes Tugela, dans le Drakensberg, comptent souvent parmi les plus hautes du monde, chutant par paliers sur une hauteur totale d'environ combien ?|ドラケンスバーグにあるトゥーゲラ滝は世界屈指の高さの滝としてしばしば数えられるが、段状に落ちる総落差はおよそどれくらいか?",
    ["About 950 metres|Unos 950 metros|Environ 950 mètres|約950メートル", "About 300 metres|Unos 300 metros|Environ 300 mètres|約300メートル", "About 1,800 metres|Unos 1.800 metros|Environ 1 800 mètres|約1800メートル"],
    0,
    "Rankings of the world's tallest waterfalls are notoriously inconsistent depending on how a multi-tiered drop is measured, but Tugela Falls is regularly cited among the very tallest, fed by summer rain rather than year-round snowmelt.|Las clasificaciones de las cataratas más altas del mundo son notoriamente inconsistentes según cómo se mida una caída escalonada, pero las cataratas Tugela se citan a menudo entre las más altas, alimentadas por lluvias de verano y no por deshielo constante.|Les classements des plus hautes chutes du monde sont notoirement incohérents selon la façon de mesurer une chute à paliers, mais les chutes Tugela figurent régulièrement parmi les plus hautes, alimentées par les pluies d'été plutôt que par une fonte des neiges permanente.|世界最高峰の滝の順位は、段状の落差をどう測るかによって食い違うことで知られるが、トゥーゲラ滝はしばしばその中でも屈指として挙げられる。一年を通じた雪解け水ではなく夏の雨で水量が保たれている。",
  ),
  q(
    7,
    "South Africa co-hosts the Square Kilometre Array, a major next-generation astronomy project, mainly in which sparsely populated region?|Sudáfrica coorganiza el Square Kilometre Array, un gran proyecto astronómico de nueva generación, sobre todo en ¿qué región escasamente poblada?|L'Afrique du Sud coaccueille le Square Kilometre Array, un grand projet astronomique de nouvelle génération, surtout dans quelle région peu peuplée ?|南アフリカが次世代の大型天文プロジェクト、スクエア・キロメートル・アレイを主に受け入れている、人口の少ない地域は?",
    ["The Karoo|El Karroo|Le Karoo|カルー", "The Kruger lowveld|El lowveld de Kruger|Le lowveld du Kruger|クルーガーのローフェルド", "The Cape Peninsula|La península del Cabo|La péninsule du Cap|ケープ半島"],
    0,
    "Thousands of radio dishes and antennas are being built across the remote, radio-quiet Karoo alongside a matching array in Australia, together forming what astronomers expect to be the most sensitive radio telescope network ever built.|Miles de antenas parabólicas y antenas de radio se están construyendo por el remoto y silencioso Karoo junto con un conjunto equivalente en Australia, formando juntos lo que los astrónomos esperan sea la red de radiotelescopios más sensible jamás construida.|Des milliers d'antennes paraboliques et radio sont construites à travers le Karoo reculé et silencieux sur le plan radio, aux côtés d'un ensemble équivalent en Australie, formant ensemble ce que les astronomes espèrent être le réseau de radiotélescopes le plus sensible jamais construit.|人里離れ電波の静かなカルー地方には、オーストラリアの対になる観測網とあわせて何千ものパラボラアンテナが建設されつつあり、天文学者たちはこれをこれまでで最も感度の高い電波望遠鏡網になると見込んでいる。",
  ),
  q(
    5,
    "The University of Cape Town, South Africa's oldest, traces its roots to a college founded in which century?|La Universidad de Ciudad del Cabo, la más antigua de Sudáfrica, remonta sus orígenes a un colegio fundado en ¿qué siglo?|L'université du Cap, la plus ancienne d'Afrique du Sud, remonte à un collège fondé au cours de quel siècle ?|南アフリカ最古の大学、ケープタウン大学の起源となる学校が創設されたのは何世紀か?",
    ["The 19th century|El siglo XIX|Le XIXe siècle|19世紀", "The 17th century|El siglo XVII|Le XVIIe siècle|17世紀", "The 20th century|El siglo XX|Le XXe siècle|20世紀"],
    0,
    "The South African College, founded in 1829, grew over nearly a century into a full university, and its campus below Table Mountain's slopes is now one of the most photographed university settings in the world.|El South African College, fundado en 1829, creció a lo largo de casi un siglo hasta convertirse en una universidad completa, y su campus bajo las laderas de la Montaña de la Mesa es hoy uno de los entornos universitarios más fotografiados del mundo.|Le South African College, fondé en 1829, se développa sur près d'un siècle jusqu'à devenir une université à part entière, et son campus au pied des pentes de la montagne de la Table est aujourd'hui l'un des cadres universitaires les plus photographiés au monde.|1829年に創設された南アフリカ・カレッジは一世紀近くかけて総合大学へと発展した。テーブルマウンテンの斜面のふもとに広がるそのキャンパスは、いまや世界でも屈指の写真映えする大学の一つである。",
  ),
  q(
    6,
    "The African wild dog, one of Africa's most endangered large carnivores, has an unusual pack structure typically led by which of these?|El licaón, uno de los grandes carnívoros más amenazados de África, tiene una estructura de manada inusual, normalmente liderada por ¿cuál de estos?|Le lycaon, l'un des grands carnivores les plus menacés d'Afrique, a une structure de meute inhabituelle, généralement dirigée par lequel de ceux-ci ?|アフリカで最も絶滅が危惧される大型肉食獣の一つリカオンの群れは、通常誰が率いる珍しい構造を持つか?",
    ["A dominant female|Una hembra dominante|Une femelle dominante|優位な雌", "The oldest male and female jointly|El macho y la hembra más viejos juntos|Le mâle et la femelle les plus âgés ensemble|最年長の雌雄が共同で", "Whichever dog makes the most kills|El perro que más presas cobra|Le chien qui tue le plus de proies|最も多く獲物を仕留めた個体"],
    0,
    "Packs hunt cooperatively with a success rate far higher than lions or leopards manage alone, but habitat loss and conflict with farmers have left only a few thousand wild dogs remaining across the whole continent.|Las manadas cazan de forma cooperativa con una tasa de éxito mucho mayor de la que logran solos leones o leopardos, pero la pérdida de hábitat y los conflictos con granjeros han dejado solo unos pocos miles de licaones en todo el continente.|Les meutes chassent en coopération avec un taux de réussite bien supérieur à celui des lions ou des léopards seuls, mais la perte d'habitat et les conflits avec les fermiers n'ont laissé que quelques milliers de lycaons sur tout le continent.|群れは協力して狩りをし、ライオンやヒョウが単独で狩る場合よりはるかに高い成功率を誇るが、生息地の喪失と農家との軋轢により、大陸全体でもわずか数千頭しか残っていない。",
  ),
  q(
    7,
    "South Africa operates a permanent research base in Antarctica itself, as well as one on a sub-Antarctic island group it administers called what?|Sudáfrica opera una base de investigación permanente en la propia Antártida, además de una en un grupo de islas subantárticas que administra llamado ¿qué?|L'Afrique du Sud exploite une base de recherche permanente en Antarctique même, ainsi qu'une autre sur un archipel subantarctique qu'elle administre appelé comment ?|南アフリカは南極大陸そのものに常設の観測基地を運営しているほか、自国が統治する亜南極の島嶼群にも基地を持つが、その島の名は?",
    ["The Prince Edward Islands|Las islas Príncipe Eduardo|Les îles du Prince-Édouard|プリンスエドワード諸島", "The Falkland Islands|Las islas Malvinas|Les îles Malouines|フォークランド諸島", "The Kerguelen Islands|Las islas Kerguelen|Les îles Kerguelen|ケルゲレン諸島"],
    0,
    "Annexed in 1947 and now a strictly protected nature reserve, the Prince Edward Islands lie roughly 1,900 km southeast of Cape Town and are reachable only by a research supply ship that visits once a year.|Anexionadas en 1947 y hoy reserva natural estrictamente protegida, las islas Príncipe Eduardo están a unos 1.900 km al sureste de Ciudad del Cabo y solo se puede llegar a ellas en un buque de abastecimiento científico que las visita una vez al año.|Annexées en 1947 et aujourd'hui réserve naturelle strictement protégée, les îles du Prince-Édouard se trouvent à environ 1 900 km au sud-est du Cap et ne sont accessibles que par un navire de ravitaillement scientifique qui les visite une fois par an.|1947年に併合され、いまは厳格に保護された自然保護区であるプリンスエドワード諸島は、ケープタウンの南東およそ1900kmに位置し、年に一度訪れる観測補給船でしか行けない。",
  ),
  q(
    8,
    "CODESA, the multi-party negotiating forum held from 1991, was convened mainly to do what?|El CODESA, foro de negociación multipartidista celebrado desde 1991, se convocó sobre todo para ¿qué?|La CODESA, forum de négociation multipartite tenu à partir de 1991, fut convoquée principalement pour quoi faire ?|1991年から開かれた多党間交渉フォーラム、コデサが招集された主な目的は?",
    [
      "Negotiate South Africa's transition to democratic rule|Negociar la transición de Sudáfrica a un gobierno democrático|Négocier la transition de l'Afrique du Sud vers un régime démocratique|南アフリカの民主的統治への移行を交渉するため",
      "Settle a border dispute with Namibia|Resolver una disputa fronteriza con Namibia|Régler un différend frontalier avec la Namibie|ナミビアとの国境紛争を解決するため",
      "Reorganise the national rail network|Reorganizar la red ferroviaria nacional|Réorganiser le réseau ferroviaire national|国鉄網を再編するため",
    ],
    0,
    "The Convention for a Democratic South Africa brought the government, the ANC and other parties to the table over several rounds of talks, and though it broke down more than once amid violence, it laid the groundwork for the 1994 settlement.|La Convención para una Sudáfrica Democrática reunió al gobierno, el CNA y otros partidos en varias rondas de conversaciones, y aunque se rompió más de una vez en medio de la violencia, sentó las bases del acuerdo de 1994.|La Convention pour une Afrique du Sud démocratique réunit le gouvernement, l'ANC et d'autres partis autour de plusieurs rounds de discussions, et bien qu'elle échoua plus d'une fois au milieu de violences, elle posa les bases de l'accord de 1994.|民主的南アフリカのための会議は、政府・ANC・他の政党を何度もの交渉の場に集めた。暴力の中で何度か決裂しながらも、1994年の合意への土台を築いた。",
  ),

  // ---- 追加分(最終):難易度8〜9を補い、残りを幅広い主題で埋める ----
  q(
    9,
    "In August 2012, police shot dead 34 striking mineworkers at a platinum mine near Rustenburg, in an event now known as what?|En agosto de 2012, la policía mató a tiros a 34 mineros en huelga en una mina de platino cerca de Rustenburg, en un suceso hoy conocido como ¿qué?|En août 2012, la police abattit 34 mineurs en grève dans une mine de platine près de Rustenburg, lors d'un événement aujourd'hui connu sous quel nom ?|2012年8月、警察がラステンバーグ近郊の白金鉱山でストライキ中の鉱夫34人を射殺した事件は、いま何と呼ばれているか?",
    [
      "The Marikana massacre|La masacre de Marikana|Le massacre de Marikana|マリカナの虐殺",
      "The Rustenburg uprising|El levantamiento de Rustenburg|Le soulèvement de Rustenburg|ラステンバーグ蜂起",
      "The Platinum Strike disaster|El desastre de la Huelga del Platino|Le désastre de la grève du Platine|プラチナ・ストライキ災害",
    ],
    0,
    "The killings, the deadliest use of force by South African police against civilians since the end of apartheid, occurred during a wage dispute at a Lonmin-owned mine and prompted a long-running commission of inquiry into the police response.|Los asesinatos, el uso de fuerza más letal de la policía sudafricana contra civiles desde el fin del apartheid, ocurrieron durante una disputa salarial en una mina propiedad de Lonmin y motivaron una larga comisión de investigación sobre la actuación policial.|Ces tueries, l'usage le plus meurtrier de la force par la police sud-africaine contre des civils depuis la fin de l'apartheid, survinrent lors d'un conflit salarial dans une mine appartenant à Lonmin et déclenchèrent une longue commission d'enquête sur l'intervention policière.|この虐殺は、アパルトヘイト終結後に南アフリカ警察が民間人に対して行った最も死者の多い実力行使であり、ロンミン社が所有する鉱山での賃金紛争のさなかに起きた。警察の対応をめぐる長期にわたる調査委員会につながった。",
  ),
  q(
    8,
    "Enslaved people brought to the Cape by the Dutch East India Company from Madagascar and South and Southeast Asia were finally emancipated under British rule in which decade?|Las personas esclavizadas traídas al Cabo por la Compañía Holandesa de las Indias Orientales desde Madagascar y el sur y sureste de Asia fueron finalmente emancipadas bajo dominio británico en ¿qué década?|Les personnes réduites en esclavage amenées au Cap par la Compagnie néerlandaise des Indes orientales depuis Madagascar et l'Asie du Sud et du Sud-Est furent finalement émancipées sous domination britannique au cours de quelle décennie ?|オランダ東インド会社がマダガスカルや南・東南アジアからケープへ連行した奴隷たちが、英国統治下でついに解放されたのは何年代か?",
    ["The 1830s|La década de 1830|Les années 1830|1830年代", "The 1780s|La década de 1780|Les années 1780|1780年代", "The 1880s|La década de 1880|Les années 1880|1880年代"],
    0,
    "Slavery at the Cape ran for over 150 years before Britain's 1833 abolition act took effect there in 1834, followed by a mandatory four-year 'apprenticeship' period that delayed full freedom until 1838.|La esclavitud en el Cabo duró más de 150 años antes de que la ley de abolición británica de 1833 entrara en vigor allí en 1834, seguida de un periodo obligatorio de 'aprendizaje' de cuatro años que retrasó la libertad plena hasta 1838.|L'esclavage au Cap dura plus de 150 ans avant que la loi d'abolition britannique de 1833 n'y entre en vigueur en 1834, suivie d'une période obligatoire d'« apprentissage » de quatre ans qui retarda la pleine liberté jusqu'en 1838.|ケープでの奴隷制は150年以上続いたのち、1833年の英国の奴隷制廃止法が1834年に現地で発効した。その後も4年間の強制的な『見習い』期間があり、完全な自由が得られたのは1838年になってからだった。",
  ),
  q(
    4,
    "What is 'potjiekos'?|¿Qué es el 'potjiekos'?|Qu'est-ce que le « potjiekos » ?|『ポチエコス』とは何か?",
    [
      "A stew slow-cooked over a fire in a three-legged iron pot|Un guiso cocinado lentamente al fuego en una olla de hierro de tres patas|Un ragoût mijoté au feu dans une marmite de fer à trois pieds|三本脚の鉄鍋で直火にかけてゆっくり煮込むシチュー",
      "A dried fruit snack|Un aperitivo de fruta seca|Un en-cas de fruits secs|ドライフルーツの軽食",
      "A type of bread roll|Un tipo de bollo de pan|Un type de petit pain|パンの一種",
    ],
    0,
    "Named for the three-legged cast-iron pot ('potjie') it is cooked in, the stew is traditionally left to simmer for hours without stirring, layered so that meat, vegetables and gravy each cook through in place.|Llamado así por la olla de hierro fundido de tres patas ('potjie') en que se cocina, el guiso tradicionalmente se deja cocer a fuego lento durante horas sin remover, dispuesto en capas para que carne, verduras y salsa se hagan cada una en su sitio.|Nommé d'après la marmite en fonte à trois pieds (« potjie ») dans laquelle il mijote, ce ragoût est traditionnellement laissé à cuire des heures sans être remué, disposé en couches pour que viande, légumes et sauce cuisent chacun sur place.|三本脚の鋳鉄鍋『ポチエ』にちなんで名付けられたこのシチューは、伝統的にかき混ぜずに何時間も弱火にかけられ、肉・野菜・煮汁がそれぞれ層になったまま火を通される。",
  ),
  q(
    5,
    "'Bobotie', a signature Cape Malay dish, is best described as what?|El 'bobotie', plato emblemático de la cocina malaya del Cabo, ¿cómo se describe mejor?|Le « bobotie », plat emblématique de la cuisine malaise du Cap, se décrit le mieux comment ?|ケープマレー料理を代表する『ボボティ』を最もよく表す説明は?",
    [
      "Spiced minced meat baked with an egg custard topping|Carne picada especiada horneada con una cobertura de flan de huevo|Une viande hachée épicée cuite au four sous une couche de flan aux œufs|香辛料入りひき肉に卵カスタードを載せて焼いたもの",
      "A grilled whole fish stuffed with herbs|Un pescado entero a la parrilla relleno de hierbas|Un poisson entier grillé farci d'herbes|ハーブを詰めて丸ごと焼いた魚",
      "A cold rice and seafood salad|Una ensalada fría de arroz y marisco|Une salade froide de riz et de fruits de mer|米と魚介の冷製サラダ",
    ],
    0,
    "Descended from recipes brought by enslaved and politically exiled people from what is now Indonesia and Malaysia, bobotie's mix of dried fruit, curry spice and a savoury custard reflects that Cape Malay cooking developed at a crossroads of Southeast Asian and Dutch influence.|Descendiente de recetas traídas por personas esclavizadas y exiliadas políticas de lo que hoy es Indonesia y Malasia, la mezcla de fruta seca, especias de curry y flan salado del bobotie refleja que la cocina malaya del Cabo se formó en un cruce de influencias del sureste asiático y neerlandesas.|Héritier de recettes apportées par des personnes réduites en esclavage et des exilés politiques venus de ce qui est aujourd'hui l'Indonésie et la Malaisie, le mélange de fruits secs, d'épices à curry et de flan salé du bobotie reflète une cuisine malaise du Cap née à un carrefour d'influences sud-est asiatiques et néerlandaises.|いまのインドネシアやマレーシアから連れてこられた奴隷や政治亡命者のレシピに由来するボボティは、ドライフルーツとカレー香辛料、塩気のある卵カスタードを組み合わせており、ケープマレー料理が東南アジアとオランダの影響の交差点で育まれたことを物語っている。",
  ),
  q(
    3,
    "Which of these was NOT one of apartheid's 'homelands' or 'Bantustans'?|¿Cuál de estos NO fue uno de los 'homelands' o 'bantustanes' del apartheid?|Lequel de ceux-ci n'était PAS un « homeland » ou « bantoustan » de l'apartheid ?|次のうち、アパルトヘイトの『ホームランド』(バントゥースタン)でなかったものは?",
    ["Zambia|Zambia|La Zambie|ザンビア", "Transkei|Transkei|Le Transkei|トランスカイ", "Ciskei|Ciskei|Le Ciskei|シスカイ"],
    0,
    "Zambia has been a fully independent, internationally recognised country since 1964; the ten homelands, by contrast, were carved out of South African territory itself and never recognised as independent by any country other than South Africa.|Zambia es un país plenamente independiente y reconocido internacionalmente desde 1964; los diez homelands, en cambio, se tallaron del propio territorio sudafricano y ningún país los reconoció como independientes salvo la propia Sudáfrica.|La Zambie est un pays pleinement indépendant et reconnu internationalement depuis 1964 ; les dix homelands, en revanche, furent taillés dans le territoire sud-africain lui-même et ne furent jamais reconnus comme indépendants par aucun pays hormis l'Afrique du Sud.|ザンビアは1964年以来、完全に独立し国際的に承認された国である。一方、10のホームランドは南アフリカ自身の領土から切り出されたもので、南アフリカ以外のどの国からも独立国として承認されたことはなかった。",
  ),
  q(
    6,
    "'Gqom' and 'amapiano', two electronic music genres that gained global followings in the 2010s, both originated in which country?|'Gqom' y 'amapiano', dos géneros de música electrónica que ganaron seguidores globales en la década de 2010, ¿en qué país se originaron ambos?|« Gqom » et « amapiano », deux genres de musique électronique ayant gagné un public mondial dans les années 2010, sont tous deux nés dans quel pays ?|2010年代に世界的な支持を集めた電子音楽ジャンル『グコム』と『アマピアノ』は、どちらもどの国で生まれたか?",
    ["South Africa|Sudáfrica|L'Afrique du Sud|南アフリカ", "Nigeria|Nigeria|Le Nigeria|ナイジェリア", "Jamaica|Jamaica|La Jamaïque|ジャマイカ"],
    0,
    "Gqom emerged from Durban with a raw, minimal, bass-heavy sound, while amapiano grew out of townships around Johannesburg and Pretoria blending deep house, jazz and lounge piano; both spread internationally largely through social media before major labels caught on.|El gqom surgió en Durban con un sonido crudo, minimalista y de graves intensos, mientras el amapiano nació en los townships de Johannesburgo y Pretoria mezclando deep house, jazz y piano lounge; ambos se difundieron internacionalmente sobre todo por redes sociales antes de que los grandes sellos se fijaran en ellos.|Le gqom est né à Durban avec un son brut, minimaliste et chargé en basses, tandis que l'amapiano est né dans les townships de Johannesburg et Pretoria en mêlant deep house, jazz et piano lounge ; les deux se sont répandus internationalement surtout via les réseaux sociaux avant que les grands labels ne s'y intéressent.|グコムは荒々しく最小限の、低音の効いたダーバン発の音楽で、アマピアノはヨハネスブルグとプレトリア周辺のタウンシップで、ディープハウス・ジャズ・ラウンジピアノを混ぜて生まれた。どちらも大手レーベルが目を付けるより前に、主にSNSを通じて世界に広まった。",
  ),
  q(
    5,
    "The N1 highway, South Africa's longest national route, links Cape Town to a border crossing into which country?|La autopista N1, la ruta nacional más larga de Sudáfrica, une Ciudad del Cabo con un cruce fronterizo hacia ¿qué país?|L'autoroute N1, la plus longue route nationale d'Afrique du Sud, relie Le Cap à un poste-frontière vers quel pays ?|南アフリカ最長の国道であるN1号線が、ケープタウンから国境を越えてつながる国は?",
    ["Zimbabwe|Zimbabue|Le Zimbabwe|ジンバブエ", "Mozambique|Mozambique|Le Mozambique|モザンビーク", "Eswatini|Esuatini|L'Eswatini|エスワティニ"],
    0,
    "Running roughly 2,000 km from Cape Town through Johannesburg and Pretoria, the N1 finally crosses into Zimbabwe at Beitbridge, one of the busiest border posts on the continent and notorious for its long queues of freight trucks.|Con un recorrido de unos 2.000 km desde Ciudad del Cabo pasando por Johannesburgo y Pretoria, la N1 cruza finalmente a Zimbabue por Beitbridge, uno de los pasos fronterizos más activos del continente y famoso por sus largas colas de camiones de carga.|Longue d'environ 2 000 km depuis Le Cap en passant par Johannesburg et Pretoria, la N1 franchit finalement la frontière du Zimbabwe à Beitbridge, l'un des postes-frontières les plus fréquentés du continent, réputé pour ses longues files de camions de fret.|ケープタウンからヨハネスブルグ・プレトリアを経ておよそ2000kmを走るN1号線は、最終的にビートブリッジでジンバブエへと越境する。大陸でも屈指の交通量を誇り、貨物トラックの長い列で知られる国境検問所である。",
  ),
  q(
    6,
    "'Witblits', a strong traditional home-distilled spirit whose name means 'white lightning' in Afrikaans, is typically made from what?|El 'witblits', fuerte licor tradicional destilado en casa cuyo nombre significa 'relámpago blanco' en afrikáans, se hace normalmente con ¿qué?|Le « witblits », alcool traditionnel fort distillé maison dont le nom signifie « éclair blanc » en afrikaans, est généralement fait à partir de quoi ?|アフリカーンス語で『白い稲妻』を意味する伝統的な自家蒸留の強い酒『ヴィトブリッツ』は、通常何から作られるか?",
    ["Fermented fruit, especially peaches or grapes|Fruta fermentada, sobre todo melocotones o uvas|Des fruits fermentés, surtout des pêches ou des raisins|発酵させた果物、特に桃やぶどう", "Fermented maize|Maíz fermentado|Du maïs fermenté|発酵させたトウモロコシ", "Fermented milk|Leche fermentada|Du lait fermenté|発酵させた乳"],
    0,
    "Distilled in small pot stills on farms, often from surplus peaches or grapes, witblits was long made and sold unofficially, and only in recent decades have some producers begun distilling and bottling it commercially and legally.|Destilado en pequeños alambiques en granjas, a menudo con melocotones o uvas sobrantes, el witblits se elaboró y vendió mucho tiempo de manera extraoficial, y solo en las últimas décadas algunos productores han empezado a destilarlo y embotellarlo de forma comercial y legal.|Distillé dans de petits alambics à la ferme, souvent à partir de pêches ou de raisins excédentaires, le witblits fut longtemps produit et vendu de façon officieuse, et ce n'est que ces dernières décennies que certains producteurs ont commencé à le distiller et l'embouteiller commercialement et légalement.|農場の小さな単式蒸留器で、余った桃やぶどうから造られることが多いヴィトブリッツは、長らく非公式に作られ売られてきたが、ここ数十年でようやく一部の生産者が商業的かつ合法的に蒸留・瓶詰めを始めている。",
  ),
  q(
    4,
    "Eskom, the state utility behind South Africa's rolling blackouts, is mainly responsible for supplying which of these?|Eskom, la empresa estatal detrás de los cortes programados de Sudáfrica, se encarga sobre todo de suministrar ¿qué?|Eskom, l'entreprise publique à l'origine des coupures programmées en Afrique du Sud, est principalement chargée de fournir quoi ?|南アフリカの計画停電の背景にある国営公社エスコムが主に供給を担っているものは?",
    ["Electricity|Electricidad|L'électricité|電力", "Piped water|Agua corriente|L'eau courante|上水道", "Mobile phone service|Servicio de telefonía móvil|Le service de téléphonie mobile|携帯電話サービス"],
    0,
    "Eskom generates and transmits the large majority of South Africa's electricity, mostly from an ageing fleet of coal-fired power stations, and years of underinvestment and breakdowns are what have driven the rolling blackouts known as load shedding.|Eskom genera y transmite la gran mayoría de la electricidad de Sudáfrica, sobre todo desde una flota envejecida de centrales de carbón, y años de infrainversión y averías son lo que ha provocado los cortes programados conocidos como load shedding.|Eskom produit et transporte la grande majorité de l'électricité sud-africaine, surtout à partir d'un parc vieillissant de centrales à charbon, et des années de sous-investissement et de pannes sont à l'origine des coupures programmées appelées load shedding.|エスコムは南アフリカの電力の大半を、主に老朽化した石炭火力発電所群から発電・送電している。長年の投資不足と故障の積み重ねが、ロードシェディングと呼ばれる計画停電を引き起こしてきた。",
  ),
  q(
    5,
    "South Africa is a member of SADC, a regional bloc whose name stands for the Southern African Development what?|Sudáfrica es miembro de la SADC, un bloque regional cuyo nombre significa la Comunidad para el Desarrollo de África Austral, ¿qué palabra completa la sigla?|L'Afrique du Sud est membre de la SADC, un bloc régional dont le nom signifie Communauté de développement de l'Afrique australe, quel mot complète le sigle ?|南アフリカが加盟する地域機構SADCの名は『南部アフリカ開発□□』の略だが、□□にあたる語は?",
    ["Community|Comunidad|Communauté|共同体(コミュニティ)", "Union|Unión|Union|連合(ユニオン)", "Federation|Federación|Fédération|連邦(フェデレーション)"],
    0,
    "Made up of 16 member states across the region, the Southern African Development Community coordinates on trade, infrastructure and security, and its secretariat is based in Gaborone, Botswana rather than in South Africa itself.|Formada por 16 estados miembros de la región, la Comunidad para el Desarrollo de África Austral coordina comercio, infraestructura y seguridad, y su secretaría tiene sede en Gaborone, Botsuana, y no en la propia Sudáfrica.|Composée de 16 États membres de la région, la Communauté de développement de l'Afrique australe coordonne commerce, infrastructures et sécurité, et son secrétariat est basé à Gaborone, au Botswana, plutôt qu'en Afrique du Sud même.|地域16か国からなる南部アフリカ開発共同体は、貿易・インフラ・安全保障で協調を図る機構であり、その事務局は南アフリカ自身ではなくボツワナのハボローネに置かれている。",
  ),
  q(
    7,
    "The Karoo Supergroup, a thick sequence of rock beneath much of South Africa's interior, is especially prized by scientists for fossils of what?|El Supergrupo Karoo, una gruesa secuencia de roca bajo buena parte del interior de Sudáfrica, es especialmente valorado por los científicos por fósiles de ¿qué?|Le Supergroupe du Karoo, une épaisse séquence rocheuse sous une grande partie de l'intérieur de l'Afrique du Sud, est particulièrement prisé des scientifiques pour des fossiles de quoi ?|南アフリカ内陸の広い範囲の地下に広がる厚い地層、カルー・スーパーグループが科学者にとって特に貴重なのは、何の化石が見つかるからか?",
    [
      "Early mammal-like reptiles (therapsids) that lived before the dinosaurs|Reptiles primitivos parecidos a mamíferos (terápsidos) que vivieron antes que los dinosaurios|Des reptiles primitifs ressemblant à des mammifères (thérapsides) ayant vécu avant les dinosaures|恐竜以前に生きた哺乳類型爬虫類(獣弓類)",
      "Marine trilobites from a shallow tropical sea|Trilobites marinos de un mar tropical poco profundo|Des trilobites marins d'une mer tropicale peu profonde|浅い熱帯の海に生息した三葉虫",
      "Giant flightless birds from the last Ice Age|Aves gigantes no voladoras de la última Edad de Hielo|De grands oiseaux incapables de voler de la dernière glaciation|最終氷期の巨大な飛べない鳥",
    ],
    0,
    "These rock layers, deposited over roughly 120 million years, preserve one of the world's best fossil records of the reptile lineage that eventually gave rise to mammals, making the Karoo a key site for understanding life before the dinosaurs.|Estos estratos rocosos, depositados a lo largo de unos 120 millones de años, conservan uno de los mejores registros fósiles del mundo del linaje de reptiles que acabaría dando lugar a los mamíferos, lo que convierte al Karoo en un lugar clave para entender la vida antes de los dinosaurios.|Ces couches rocheuses, déposées sur environ 120 millions d'années, conservent l'un des meilleurs registres fossiles au monde de la lignée de reptiles qui donna finalement naissance aux mammifères, faisant du Karoo un site clé pour comprendre la vie avant les dinosaures.|およそ1億2000万年かけて堆積したこの地層は、のちに哺乳類を生み出すことになる爬虫類系統の、世界でも屈指の充実した化石記録を残しており、カルーは恐竜以前の生命を理解するうえで鍵となる場所になっている。",
  ),
  q(
    3,
    "South Africa's population is closest to which of these figures?|La población de Sudáfrica se acerca más a ¿cuál de estas cifras?|La population de l'Afrique du Sud se rapproche le plus de laquelle de ces valeurs ?|南アフリカの人口に最も近いのはどれか?",
    ["About 60 million|Unos 60 millones|Environ 60 millions|約6000万人", "About 15 million|Unos 15 millones|Environ 15 millions|約1500万人", "About 150 million|Unos 150 millones|Environ 150 millions|約1億5000万人"],
    0,
    "That makes South Africa the continent's most industrialised economy but only its fifth or sixth most populous country, well behind Nigeria, Ethiopia, Egypt and the DR Congo.|Eso convierte a Sudáfrica en la economía más industrializada del continente, pero solo el quinto o sexto país más poblado, muy por detrás de Nigeria, Etiopía, Egipto y la RD Congo.|Cela fait de l'Afrique du Sud l'économie la plus industrialisée du continent, mais seulement son cinquième ou sixième pays le plus peuplé, loin derrière le Nigeria, l'Éthiopie, l'Égypte et la RD Congo.|これにより南アフリカは大陸で最も工業化された経済を持つ国でありながら、人口では5〜6番目にとどまり、ナイジェリア・エチオピア・エジプト・コンゴ民主共和国に大きく後れを取る。",
  ),
  q(
    7,
    "Traditional 'matjieshuis' dwellings, woven from reed mats over a bent-sapling frame, are associated with which of South Africa's indigenous peoples?|Las viviendas tradicionales 'matjieshuis', tejidas con esteras de junco sobre un armazón de varas dobladas, se asocian con ¿cuál de los pueblos indígenas de Sudáfrica?|Les habitations traditionnelles « matjieshuis », tissées de nattes de roseaux sur une armature de jeunes branches courbées, sont associées à quel peuple autochtone d'Afrique du Sud ?|曲げた若木の骨組みに葦のむしろを編みかけて作る伝統的な住居『マチースハウス』と結びつく南アフリカの先住民族は?",
    ["The Nama, a Khoikhoi people|Los nama, un pueblo khoikhoi|Les Nama, un peuple khoikhoi|コイコイ系のナマ人", "The Zulu|Los zulúes|Les Zoulous|ズールー人", "The Sotho|Los sotho|Les Sotho|ソト人"],
    0,
    "Lightweight and quick to dismantle, matjieshuis suited the semi-nomadic, herding lifestyle historically practised by Nama communities across the arid Northern Cape and into what is now Namibia.|Ligeras y rápidas de desmontar, las matjieshuis se adaptaban al estilo de vida seminómada y pastoril practicado históricamente por las comunidades nama en el árido Cabo Septentrional y hasta la actual Namibia.|Légères et rapides à démonter, les matjieshuis convenaient au mode de vie semi-nomade et pastoral historiquement pratiqué par les communautés nama à travers l'aride Cap-Nord et jusque dans l'actuelle Namibie.|軽く、すぐに解体できるマチースハウスは、乾燥した北ケープから現在のナミビアにかけて、ナマ人の共同体が歴史的に営んできた半遊牧の牧畜生活に適していた。",
  ),

  // ---- 最後の仕上げ ----
  q(
    9,
    "The SS Waratah, sometimes called 'Australia's Titanic', vanished without a trace in 1909 while sailing along which stretch of South African coast?|El SS Waratah, a veces llamado el 'Titanic de Australia', desapareció sin dejar rastro en 1909 mientras navegaba por ¿qué tramo de la costa sudafricana?|Le SS Waratah, parfois surnommé « le Titanic de l'Australie », disparut sans laisser de trace en 1909 alors qu'il naviguait le long de quel tronçon de la côte sud-africaine ?|『オーストラリアのタイタニック』とも呼ばれるSSワラター号が1909年、痕跡を残さず消えたのは南アフリカ沿岸のどの区間を航行中だったか?",
    ["The Wild Coast|La Wild Coast|La Wild Coast|ワイルドコースト", "The Garden Route|La Garden Route|La Garden Route|ガーデンルート", "The Cape Peninsula|La península del Cabo|La péninsule du Cap|ケープ半島"],
    0,
    "Carrying more than 200 people from Durban toward Cape Town, the steamship was last sighted by another vessel off the Wild Coast and never heard from again; no confirmed wreck has ever been found despite numerous search expeditions over more than a century.|Con más de 200 personas a bordo rumbo de Durban a Ciudad del Cabo, el vapor fue visto por última vez por otro buque frente a la Wild Coast y nunca más se supo de él; no se ha hallado ningún naufragio confirmado pese a numerosas expediciones de búsqueda durante más de un siglo.|Transportant plus de 200 personnes de Durban vers Le Cap, le vapeur fut aperçu pour la dernière fois par un autre navire au large de la Wild Coast et ne donna plus jamais signe de vie ; aucune épave confirmée n'a jamais été retrouvée malgré de nombreuses expéditions de recherche menées sur plus d'un siècle.|200人以上を乗せてダーバンからケープタウンへ向かっていたこの汽船は、ワイルドコースト沖で他の船に最後に目撃されたのを最後に消息を絶った。一世紀を超える数々の捜索にもかかわらず、確認された残骸はいまも見つかっていない。",
  ),
  q(
    6,
    "'Kimberlite', the volcanic rock in which diamonds are most often found, takes its name from which South African town?|El 'kimberlita', la roca volcánica en la que más a menudo se hallan diamantes, toma su nombre de ¿qué pueblo sudafricano?|La « kimberlite », la roche volcanique où l'on trouve le plus souvent des diamants, tire son nom de quelle ville sud-africaine ?|ダイヤモンドが最も多く見つかる火山岩『キンバーライト』の名の由来となった南アフリカの町は?",
    ["Kimberley|Kimberley|Kimberley|キンバリー", "Cullinan|Cullinan|Cullinan|カリナン", "Barberton|Barberton|Barberton|バーバートン"],
    0,
    "Geologists named the rock type after the diamond fields where it was first formally studied, and kimberlite pipes — narrow, carrot-shaped volcanic vents reaching deep into the Earth's mantle — remain the main target for diamond prospectors worldwide.|Los geólogos llamaron así al tipo de roca por los yacimientos de diamantes donde se estudió formalmente por primera vez, y las chimeneas de kimberlita, angostos conductos volcánicos en forma de zanahoria que llegan hasta el manto terrestre, siguen siendo el objetivo principal de los prospectores de diamantes en todo el mundo.|Les géologues nommèrent ce type de roche d'après les gisements de diamants où elle fut étudiée pour la première fois de façon formelle, et les cheminées de kimberlite, étroits conduits volcaniques en forme de carotte plongeant jusque dans le manteau terrestre, restent la cible principale des prospecteurs de diamants dans le monde entier.|地質学者たちは、この岩石が初めて正式に研究された鉱山地帯にちなんでこの名を付けた。地球のマントル深くまで達する細いニンジン形の火山の通り道『キンバーライト・パイプ』は、いまも世界中のダイヤモンド探鉱者の主な標的であり続けている。",
  ),
  q(
    6,
    "The Bloukrans Bridge on the Garden Route was, for many years, cited as the site of the world's highest commercial what?|El puente Bloukrans, en la Garden Route, fue citado durante muchos años como el lugar del ¿qué comercial más alto del mundo?|Le pont de Bloukrans, sur la Garden Route, fut pendant de nombreuses années cité comme le site du plus haut quoi commercial au monde ?|ガーデンルートにあるブロウクランス橋は、長年『世界最高』とされてきた何の商業施設の所在地だったか?",
    ["Bungee jump|Salto en puenting|Saut à l'élastique|バンジージャンプ", "Zip line|Tirolina|Tyrolienne|ジップライン", "Ferris wheel|Noria|Grande roue|観覧車"],
    0,
    "The jump drops 216 metres from the bridge deck toward the Bloukrans River gorge below, and although taller bungee sites have since opened elsewhere, it remains one of the most recognisable extreme-sport landmarks on the Garden Route.|El salto cae 216 metros desde el tablero del puente hacia el cañón del río Bloukrans, y aunque desde entonces han abierto sitios de puenting más altos en otros lugares, sigue siendo uno de los hitos de deporte extremo más reconocibles de la Garden Route.|Le saut plonge sur 216 mètres depuis le tablier du pont vers les gorges de la rivière Bloukrans en contrebas, et bien que des sites de saut à l'élastique plus hauts aient depuis ouvert ailleurs, il demeure l'un des repères de sports extrêmes les plus connus de la Garden Route.|この飛び込みは橋の路面からブロウクランス川の峡谷へ向けて216メートル落下する。その後よそにさらに高いバンジー施設ができたものの、ガーデンルートを代表する極限スポーツの名所であり続けている。",
  ),
  q(
    4,
    "Which of these is a traditional Southern African board or strategy game still played today, related to games like mancala?|¿Cuál de estos es un juego de tablero o estrategia tradicional del sur de África que aún se juega hoy, emparentado con juegos como el mancala?|Lequel de ceux-ci est un jeu de plateau ou de stratégie traditionnel d'Afrique australe encore joué aujourd'hui, apparenté à des jeux comme le mancala ?|マンカラ系の遊びに連なる、いまも遊ばれている南部アフリカの伝統的な盤上戦略遊びはどれか?",
    ["Morabaraba|Morabaraba|Morabaraba|モラバラバ", "Toyi-toyi|Toyi-toyi|Toyi-toyi|トイトイ", "Lobola|Lobola|Lobola|ロボラ"],
    0,
    "Played on a board of 24 points with each side trying to form rows of three to remove an opponent's pieces, morabaraba is popular enough that South Africa has held national tournaments and school leagues for it.|Se juega en un tablero de 24 puntos, con cada bando intentando formar filas de tres para eliminar piezas del rival; el morabaraba es lo bastante popular como para que Sudáfrica haya celebrado torneos nacionales y ligas escolares.|Joué sur un plateau de 24 points, chaque camp cherchant à former des alignements de trois pour retirer les pièces adverses, le morabaraba est assez populaire pour que l'Afrique du Sud organise des tournois nationaux et des ligues scolaires.|24点からなる盤の上で、三つ並べて相手の駒を取り除くことを狙うモラバラバは、南アフリカで全国大会や学校リーグが開かれるほど親しまれている。",
  ),
  q(
    5,
    "Which of South Africa's nine provinces has the smallest land area?|¿Cuál de las nueve provincias de Sudáfrica tiene la menor superficie?|Laquelle des neuf provinces sud-africaines a la plus petite superficie ?|南アフリカの9州のうち、面積が最も小さいのは?",
    ["Gauteng|Gauteng|Gauteng|ハウテン", "Free State|Estado Libre|État libre|自由州", "KwaZulu-Natal|KwaZulu-Natal|KwaZulu-Natal|クワズール・ナタール"],
    0,
    "Despite being the smallest province by far, Gauteng, whose name means 'place of gold' in Sesotho, is by some distance the country's most populous and produces the largest share of its economic output.|Pese a ser con diferencia la provincia más pequeña, Gauteng, cuyo nombre significa 'lugar del oro' en sesoto, es con diferencia la más poblada del país y produce la mayor parte de su producción económica.|Bien qu'elle soit de loin la plus petite province, le Gauteng, dont le nom signifie « lieu de l'or » en sesotho, est de loin la plus peuplée du pays et produit la plus grande part de sa production économique.|群を抜いて最も面積の小さい州でありながら、セソト語で『金の場所』を意味するハウテン州は、人口でも国内断トツで最も多く、経済生産の最大の割合を担っている。",
  ),
  q(
    3,
    "What is South Africa's national bird?|¿Cuál es el ave nacional de Sudáfrica?|Quel est l'oiseau national de l'Afrique du Sud ?|南アフリカの国鳥は?",
    ["The blue crane|La grulla azul|La grue bleue|オグロヅル(ブルークレーン)", "The bald eagle|El águila calva|Le pygargue à tête blanche|ハクトウワシ", "The peacock|El pavo real|Le paon|クジャク"],
    0,
    "Mostly confined to South Africa, with small populations spilling into neighbouring countries, the blue crane is classed as vulnerable, threatened chiefly by collisions with power lines and poisoning on farmland.|Casi confinada a Sudáfrica, con pequeñas poblaciones que se extienden a países vecinos, la grulla azul está clasificada como vulnerable, amenazada sobre todo por colisiones con líneas eléctricas y envenenamiento en tierras de cultivo.|Presque confinée à l'Afrique du Sud, avec de petites populations débordant sur les pays voisins, la grue bleue est classée vulnérable, menacée surtout par les collisions avec les lignes électriques et l'empoisonnement dans les terres agricoles.|ほぼ南アフリカに限られ、隣国にわずかな個体群が広がるのみのオグロヅルは、絶滅危惧種に分類されており、主に電線への衝突と農地での中毒によって脅かされている。",
  ),
  q(
    4,
    "What is 'spanspek', a word used across South Africa?|¿Qué es el 'spanspek', palabra usada en toda Sudáfrica?|Qu'est-ce que le « spanspek », mot employé dans toute l'Afrique du Sud ?|南アフリカ全土で使われる『スパンスペック』とは?",
    ["A cantaloupe (rockmelon)|Un melón cantalupo|Un melon cantaloup|マスクメロン(カンタループ)", "A type of small antelope|Un tipo de antílope pequeño|Un type de petite antilope|小型の羚羊の一種", "A woven sleeping mat|Una estera tejida para dormir|Une natte tissée pour dormir|編んだ寝ござ"],
    0,
    "Borrowed from Afrikaans, the word is used by English speakers too, and the fruit is grown widely enough in the country's warmer regions that it turns up on breakfast buffets nationwide.|Tomada del afrikáans, la palabra también la usan los hablantes de inglés, y la fruta se cultiva tan ampliamente en las regiones más cálidas del país que aparece en los bufés de desayuno de todo el territorio.|Empruntée à l'afrikaans, le mot est aussi utilisé par les anglophones, et le fruit est cultivé si largement dans les régions plus chaudes du pays qu'il apparaît sur les buffets de petit-déjeuner à travers tout le territoire.|アフリカーンス語から借りたこの語は英語話者も使い、国内の温暖な地域で広く栽培されているため、全国どこの朝食ビュッフェにも顔を出す。",
  ),
  q(
    6,
    "Which South African city is nicknamed 'The Windy City' for its near-constant coastal breeze?|¿Qué ciudad sudafricana se apoda 'la ciudad del viento' por su brisa costera casi constante?|Quelle ville sud-africaine est surnommée « la ville du vent » pour sa brise côtière quasi constante ?|ほぼ絶え間ない海風から『ウィンディ・シティ』と呼ばれる南アフリカの都市は?",
    ["Gqeberha (Port Elizabeth)|Gqeberha (Port Elizabeth)|Gqeberha (Port Elizabeth)|グケベルハ(ポートエリザベス)", "Bloemfontein|Bloemfontein|Bloemfontein|ブルームフォンテーン", "Polokwane|Polokwane|Polokwane|ポロクワネ"],
    0,
    "Exposed on a stretch of coast with little shelter, the city's wind is strong and steady enough that it has become a hub for kitesurfing and windsurfing rather than purely a nuisance for residents.|Expuesta en un tramo de costa con poco resguardo, el viento de la ciudad es lo bastante fuerte y constante como para convertirla en un centro de kitesurf y windsurf, más que una simple molestia para los residentes.|Exposée sur un tronçon de côte peu abrité, le vent de la ville est assez fort et constant pour en avoir fait un haut lieu du kitesurf et de la planche à voile plutôt qu'une simple nuisance pour les habitants.|遮るもののない海岸沿いに位置するこの街の風は、住民にとって単なる迷惑どころか、カイトサーフィンやウィンドサーフィンの拠点にするほど強く安定している。",
  ),
  q(
    6,
    "The Cape Argus (now Cape Town) Cycle Tour bills itself as the world's largest what?|El Cape Argus (hoy Cape Town) Cycle Tour se anuncia como el mayor ¿qué del mundo?|Le Cape Argus (aujourd'hui Cape Town) Cycle Tour se présente comme le plus grand quoi au monde ?|ケープアーガス(現ケープタウン)・サイクルツアーが自称する『世界最大の何』か?",
    [
      "Individually timed cycle race|Carrera ciclista con cronometraje individual|Course cycliste chronométrée individuellement|個人計時式の自転車レース",
      "Underground rail network|Red ferroviaria subterránea|Réseau ferroviaire souterrain|地下鉄道網",
      "Outdoor food market|Mercado de alimentos al aire libre|Marché alimentaire en plein air|屋外食品市場",
    ],
    0,
    "Tens of thousands of riders take on a roughly 100 km loop around the Cape Peninsula each year, past vineyards, mountains and coastline, all timed individually rather than raced as a single pack from a single gun.|Decenas de miles de ciclistas afrontan cada año una vuelta de unos 100 km a la península del Cabo, entre viñedos, montañas y costa, todos cronometrados individualmente y no como un único pelotón que sale con un solo disparo.|Des dizaines de milliers de cyclistes affrontent chaque année une boucle d'environ 100 km autour de la péninsule du Cap, entre vignobles, montagnes et littoral, tous chronométrés individuellement plutôt que courus en un seul peloton parti d'un coup de feu unique.|毎年何万人もの自転車乗りが、ぶどう畑・山・海岸線を抜けるケープ半島一周およそ100kmに挑む。一斉スタートの一団としてではなく、一人ひとりの記録が個別に計られる。",
  ),
  q(
    7,
    "iSimangaliso Wetland Park, a UNESCO World Heritage Site in KwaZulu-Natal centred on Lake St Lucia, was notable for being the first project of its kind championed by which figure after his release from prison?|El Parque Húmedo iSimangaliso, Patrimonio de la Humanidad de la UNESCO en KwaZulu-Natal centrado en el lago Santa Lucía, destacó por ser el primer proyecto de este tipo impulsado por ¿qué figura tras su liberación de prisión?|Le parc des zones humides iSimangaliso, site du patrimoine mondial de l'UNESCO au KwaZulu-Natal centré sur le lac Sainte-Lucie, fut notable pour avoir été le premier projet de ce genre défendu par quelle figure après sa sortie de prison ?|セントルシア湖を中心とするクワズール・ナタール州のユネスコ世界遺産、イシマンガリソ湿地公園は、ある人物が出獄後に後押しした最初のこの種の事業として知られるが、その人物とは?",
    ["Nelson Mandela|Nelson Mandela|Nelson Mandela|ネルソン・マンデラ", "Desmond Tutu|Desmond Tutu|Desmond Tutu|デズモンド・ツツ", "Thabo Mbeki|Thabo Mbeki|Thabo Mbeki|タボ・ムベキ"],
    0,
    "Mandela personally intervened to block planned dune mining along the coast here in the 1990s, backing conservationists instead, and the wetland became South Africa's first UNESCO World Heritage Site under the new democratic government in 1999.|Mandela intervino personalmente para bloquear la minería de dunas planeada en esta costa en los años noventa, respaldando en cambio a los conservacionistas, y el humedal se convirtió en el primer Patrimonio de la Humanidad de la UNESCO de Sudáfrica bajo el nuevo gobierno democrático en 1999.|Mandela intervint personnellement pour bloquer l'exploitation minière des dunes prévue sur cette côte dans les années 1990, soutenant plutôt les défenseurs de l'environnement, et la zone humide devint le premier site du patrimoine mondial de l'UNESCO d'Afrique du Sud sous le nouveau gouvernement démocratique en 1999.|マンデラは1990年代、この海岸で計画されていた砂丘の採掘を自ら介入して阻止し、自然保護派を支持した。この湿地は1999年、新しい民主政権のもとで南アフリカ初のユネスコ世界遺産となった。",
  ),
  q(
    6,
    "For decades after its 1973 completion, the Carlton Centre in Johannesburg held which title?|Durante décadas tras su finalización en 1973, el Carlton Centre de Johannesburgo ostentó ¿qué título?|Pendant des décennies après son achèvement en 1973, le Carlton Centre de Johannesburg détint quel titre ?|1973年の完成後、何十年にもわたってヨハネスブルグのカールトン・センターが保持していた称号は?",
    ["Tallest building in Africa|Edificio más alto de África|Le plus haut bâtiment d'Afrique|アフリカで最も高い建物", "Largest shopping mall in the world|Centro comercial más grande del mundo|Le plus grand centre commercial du monde|世界最大のショッピングモール", "Longest railway station platform on Earth|Andén de estación ferroviaria más largo del planeta|Le plus long quai de gare ferroviaire au monde|地球上最長の鉄道駅ホーム"],
    0,
    "Standing around 223 metres tall, the office tower kept its title as Africa's tallest building for decades, and its top-floor viewing deck still offers one of the widest panoramas over the city's sprawling skyline.|Con unos 223 metros de altura, la torre de oficinas mantuvo su título de edificio más alto de África durante décadas, y el mirador de su última planta aún ofrece uno de los panoramas más amplios sobre el extenso perfil urbano de la ciudad.|Culminant à environ 223 mètres, la tour de bureaux garda son titre de plus haut bâtiment d'Afrique pendant des décennies, et son belvédère au dernier étage offre encore l'un des panoramas les plus larges sur la skyline tentaculaire de la ville.|高さ約223メートルのこのオフィスタワーは何十年もアフリカ最高の建物の座を保った。最上階の展望台は、いまも広がる街のスカイラインを見渡す屈指の眺めを提供している。",
  ),
  q(
    5,
    "Gansbaai, a small town near Hermanus, is well known internationally for cage-diving tourism centred on which predator?|Gansbaai, un pequeño pueblo cerca de Hermanus, es conocido internacionalmente por el turismo de buceo en jaula centrado en ¿qué depredador?|Gansbaai, une petite ville près de Hermanus, est connue internationalement pour le tourisme de plongée en cage centré sur quel prédateur ?|ハーマナス近くの小さな町ガンズベイが、国際的にケージダイビングの観光地として知られるきっかけとなった捕食者は?",
    ["The great white shark|El gran tiburón blanco|Le grand requin blanc|ホホジロザメ", "The killer whale|La orca|L'orque|シャチ", "The Nile crocodile|El cocodrilo del Nilo|Le crocodile du Nil|ナイルワニ"],
    0,
    "Cold, nutrient-rich water near a seal colony on nearby Dyer Island once made this stretch of coast one of the most reliable places on Earth to see great whites, though sightings here have dropped sharply in recent years as orcas have moved into the area and preyed on the sharks themselves.|Las aguas frías y ricas en nutrientes cerca de una colonia de focas en la vecina isla Dyer hicieron de este tramo de costa uno de los lugares más fiables del planeta para ver grandes blancos, aunque los avistamientos aquí han caído fuertemente en los últimos años al llegar orcas que depredan a los propios tiburones.|Les eaux froides et riches en nutriments près d'une colonie de phoques sur l'île Dyer voisine ont fait de ce tronçon de côte l'un des endroits les plus fiables au monde pour voir des grands blancs, bien que les observations y aient nettement chuté ces dernières années, des orques s'étant installées dans la zone pour s'attaquer aux requins eux-mêmes.|近くのダイアー島のアザラシのコロニーそばの冷たく栄養豊かな海が、かつてこの海岸を地球上でも屈指のホホジロザメの目撃地にしていた。しかし近年はシャチがこの海域に現れ、サメ自体を捕食するようになったため、目撃数は急減している。",
  ),
  q(
    6,
    "OR Tambo International Airport, South Africa's busiest, is named after which ANC leader who led the movement in exile for decades?|El aeropuerto internacional OR Tambo, el más transitado de Sudáfrica, lleva el nombre de ¿qué líder del CNA que dirigió el movimiento en el exilio durante décadas?|L'aéroport international OR Tambo, le plus fréquenté d'Afrique du Sud, porte le nom de quel dirigeant de l'ANC qui dirigea le mouvement en exil pendant des décennies ?|南アフリカで最も利用者数の多いORタンボ国際空港の名の由来となった、亡命先で何十年も組織を率いたANC指導者は?",
    ["Oliver Tambo|Oliver Tambo|Oliver Tambo|オリバー・タンボ", "Walter Sisulu|Walter Sisulu|Walter Sisulu|ウォルター・シスル", "Govan Mbeki|Govan Mbeki|Govan Mbeki|ゴヴァン・ムベキ"],
    0,
    "Renamed from Johannesburg International in 2006, the airport honours the ANC president who led the organisation from exile for over 30 years while Mandela and others were in prison, keeping the movement internationally organised until its unbanning in 1990.|Rebautizado en 2006 desde Johannesburgo Internacional, el aeropuerto honra al presidente del CNA que dirigió la organización en el exilio durante más de 30 años mientras Mandela y otros estaban presos, manteniéndola organizada internacionalmente hasta su legalización en 1990.|Rebaptisé en 2006 depuis Johannesburg International, l'aéroport honore le président de l'ANC qui dirigea l'organisation en exil pendant plus de 30 ans pendant que Mandela et d'autres étaient emprisonnés, la maintenant organisée à l'international jusqu'à sa légalisation en 1990.|2006年にヨハネスブルグ国際空港から改称されたこの空港は、マンデラらが投獄されているあいだ30年以上も亡命先から組織を率い、1990年の合法化まで国際的な連携を保ち続けたANC議長の名を冠している。",
  ),
  q(
    2,
    "Which of these is a traditional South African stringed folk instrument, made from a single string and a resonating gourd or tin?|¿Cuál de estos es un instrumento folclórico sudafricano de cuerda tradicional, hecho con una sola cuerda y una calabaza o lata como caja de resonancia?|Lequel de ceux-ci est un instrument traditionnel sud-africain à corde, fait d'une seule corde et d'une calebasse ou d'une boîte de conserve en résonateur ?|一本の弦とひょうたんや缶を共鳴胴に使う、南アフリカの伝統的な弦楽器はどれか?",
    ["The ramkie|El ramkie|Le ramkie|ラムキー", "The djembe|El djembe|Le djembé|ジャンベ", "The kora|La kora|La kora|コラ"],
    0,
    "Versions of the one-stringed 'gopichand'-like bow and later multi-stringed ramkie were played by farm labourers and street musicians, and its simple, homemade construction made it one of the most accessible instruments in the country's folk tradition.|Versiones del arco de una cuerda al estilo 'gopichand' y del posterior ramkie de varias cuerdas las tocaban jornaleros y músicos callejeros, y su construcción sencilla y casera lo convirtió en uno de los instrumentos más accesibles de la tradición folclórica del país.|Des versions de l'arc à une corde façon « gopichand » puis du ramkie à plusieurs cordes furent jouées par des ouvriers agricoles et des musiciens de rue, et sa fabrication simple et artisanale en fit l'un des instruments les plus accessibles de la tradition populaire du pays.|一本弦の弓型楽器や、のちの複数弦のラムキーは農場労働者や大道芸人によって弾かれた。作りが簡素で自作しやすいことから、この国の民俗音楽の中でも最も手に入りやすい楽器の一つになった。",
  ),
  q(
    5,
    "South Africa's Kruger National Park shares an unfenced border, allowing wildlife to roam freely between the two, with a park in which neighbouring country?|El Parque Nacional Kruger de Sudáfrica comparte una frontera sin vallas, que permite a la fauna moverse libremente entre ambos, con un parque de ¿qué país vecino?|Le parc national Kruger d'Afrique du Sud partage une frontière non clôturée, permettant à la faune de circuler librement entre les deux, avec un parc de quel pays voisin ?|南アフリカのクルーガー国立公園が、柵の無い国境を接し野生動物が自由に行き来できるようにしている隣国の公園は?",
    ["Mozambique's Limpopo National Park|El Parque Nacional Limpopo de Mozambique|Le parc national du Limpopo, au Mozambique|モザンビークのリンポポ国立公園", "Zimbabwe's Hwange National Park|El Parque Nacional Hwange de Zimbabue|Le parc national de Hwange, au Zimbabwe|ジンバブエのワンゲ国立公園", "Botswana's Chobe National Park|El Parque Nacional Chobe de Botsuana|Le parc national de Chobe, au Botswana|ボツワナのチョベ国立公園"],
    0,
    "Fences between the two parks were removed from the early 2000s to form the Great Limpopo Transfrontier Park, part of a wider push to let elephant and other wildlife migrate along routes they used long before national borders existed.|Las vallas entre ambos parques se retiraron desde principios de la década de 2000 para formar el Gran Parque Transfronterizo del Limpopo, parte de un impulso más amplio para dejar que elefantes y otra fauna migren por rutas que usaban mucho antes de que existieran las fronteras nacionales.|Les clôtures entre les deux parcs furent retirées à partir du début des années 2000 pour former le Grand Parc transfrontalier du Limpopo, dans le cadre d'un effort plus large pour laisser éléphants et autre faune migrer sur des routes empruntées bien avant l'existence des frontières nationales.|両公園の間の柵は2000年代初めから撤去され、グレート・リンポポ越境公園が形作られた。ゾウなどの野生動物が、国境線が引かれるよりずっと前から使ってきた移動路をたどれるようにする、より広い取り組みの一環である。",
  ),
];
