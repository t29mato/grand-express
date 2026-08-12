/**
 * ロシアの都市と路線。
 *
 * 地方区分は6つ(`tsn` 中央 / `szp` 北西 / `yug` 南部・カフカス /
 * `vlg` ヴォルガ・ウラル / `sib` シベリア / `dv` 極東)。
 *
 * 48都市。中央8 / 北西7 / 南部・カフカス7 / ヴォルガ・ウラル8 /
 * シベリア10 / 極東8。シベリアと極東を合わせて18都市とし、
 * 広大な東側が薄くならないようにしてある。
 *
 * シベリア鉄道の実在の停車順(モスクワ→ニジニノヴゴロド→カザン→
 * エカテリンブルク→オムスク→ノヴォシビルスク→クラスノヤルスク→
 * イルクーツク→ウランウデ→ハバロフスク→ウラジオストク)を路線の骨格にし、
 * バイカル・アムール鉄道(BAM)を副筋、サハリンへは航路で結ぶ。
 *
 * **カリーニングラード(飛び地)とクリミアは含めていない。** クリミアは
 * 領有権の主張に立ち入らないための判断(韓国の独島・中国の台湾と同じ)。
 * 進行中の戦争には一切触れない。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の RUSSIA_PROJ を参照。
 *
 * ## `mark`(21種)
 *
 * kremlin(モスクワ)/ palace(サンクトペテルブルク)/ church(古都の白い聖堂) /
 * fortress(国境の要塞都市)/ river(ヴォルガ・アムール・極東の川港)/
 * coast(黒海の保養地)/ memorial(戦没者記念)/ steppe(南部の草原)/
 * domes(カザンの二つの信仰)/ caucasus(カフカスの山あい)/ urals(ウラル・欧亜の境)/
 * industry(工業都市)/ rocket(サマラの宇宙開発)/ taiga(シベリアの針葉樹林)/
 * science(ノヴォシビルスク)/ lake(バイカル湖畔)/ buddha(ウランウデの仏教)/
 * permafrost(永久凍土)/ port(北極海・太平洋・オホーツク海の港)/
 * volcano(カムチャツカ)/ craft(職人の町。トゥーラ・チュメニ・トムスク)
 *
 * ## `bg`(17種)
 *
 * capital / goldenring / fortress / steppe / coast / caspian / domes /
 * urals / industrial / rocket / river / taiga / baikal / oil / permafrost /
 * port / volcano
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const RUSSIA_CITIES = {
  // ---- tsn 中央 ----
  moscow: city(
    "Moscow|Moscú|Moscou|モスクワ",
    37.62, 55.75, "tsn", "kremlin", "capital", "r",
    "The eight-century-old capital around Red Square|La capital de ocho siglos en torno a la Plaza Roja|La capitale de huit siècles autour de la place Rouge|赤の広場を抱く八百年の都",
    "Moscow grew over nearly eight centuries from a small fort first recorded in a chronicle in 1147 into the country's centre. Inside the Kremlin walls stand five palaces and four cathedrals, and Saint Basil's Cathedral with its cluster of colourful onion domes is said by legend to have had its architect blinded so he could never build anything as beautiful again, though the story has never been confirmed as historical fact.|Moscú creció a lo largo de casi ocho siglos desde una pequeña fortaleza mencionada por primera vez en una crónica de 1147 hasta convertirse en el centro del país. Dentro de las murallas del Kremlin se alzan cinco palacios y cuatro catedrales.|Moscou a grandi en près de huit siècles depuis une petite forteresse mentionnée pour la première fois dans une chronique de 1147 jusqu'à devenir le centre du pays. Cinq palais et quatre cathédrales se dressent à l'intérieur des murs du Kremlin.|1147年に年代記へ初めて名が記される小さな砦から、モスクワは八百年近くをかけて国の中心に育った。クレムリンの城壁の中には五つの宮殿と四つの聖堂がひしめき、その色とりどりの玉ねぎ屋根で知られる聖ワシリイ大聖堂は、伝説では建築家の目を潰して二度と同じ美しさの建物を建てさせないようにしたと語られるが、史実としては確かめられていない。",
    [
      prop(
        "A souvenir stall on Red Square|Un puesto de recuerdos en la Plaza Roja|Un stand de souvenirs sur la place Rouge|赤の広場のみやげ物店",
        2200, 620,
      ),
      prop(
        "A gallery on Arbat Street|Una galería en la calle Arbat|Une galerie de la rue Arbat|アルバート通りの画廊",
        2600, 720,
      ),
    ],
  ),
  yaroslavl: city(
    "Yaroslavl|Yaroslavl|Iaroslavl|ヤロスラヴリ",
    39.87, 57.63, "tsn", "church", "goldenring", "l",
    "The Golden Ring town founded on a bear|La ciudad del Anillo de Oro fundada sobre un oso|La ville de l'Anneau d'or fondée sur un ours|熊を退けた公が築いた黄金の環の町",
    "Prince Yaroslav the Wise is said to have founded the town in 1010 on the spot where he fought off a bear with an axe, and the city's coat of arms still shows a bear shouldering one. The old town along the Volga was added to the World Heritage list in 2005, its riverbank still lined with the brightly patterned churches that rival merchant families competed to build in the 17th century.|Se dice que el príncipe Yaroslav el Sabio fundó la ciudad en 1010 en el lugar donde ahuyentó a un oso con un hacha, y el escudo de la ciudad aún muestra un oso con un hacha al hombro.|On dit que le prince Iaroslav le Sage fonda la ville en 1010 à l'endroit où il repoussa un ours à la hache, et les armoiries de la ville montrent encore un ours portant une hache sur l'épaule.|1010年、賢公ヤロスラフが自分を襲った熊を斧で退けた場所にこの町を築いたと伝わり、いまも市の紋章には斧を担いだ熊が描かれている。ヴォルガ川沿いの旧市街は2005年に世界遺産に登録され、17世紀の商人たちが競うように建てた色鮮やかな聖堂の数々がいまも川岸に立ち並ぶ。",
    [
      prop(
        "A river-cruise dock on the Volga|Un embarcadero de cruceros en el Volga|Un embarcadère de croisière sur la Volga|ヴォルガ川岸の遊覧船乗り場",
        900, 260,
      ),
      prop(
        "An inn in a converted merchant's house|Una posada en una antigua casa de mercader|Une auberge dans une ancienne maison de marchand|商人の家を改装した宿",
        1200, 340,
      ),
    ],
  ),
  vladimir: city(
    "Vladimir|Vladímir|Vladimir|ヴラジーミル",
    40.4, 56.13, "tsn", "church", "goldenring", "r",
    "The white-stone gate of a lost principality|La puerta de piedra blanca de un antiguo principado|La porte de pierre blanche d'une ancienne principauté|白い石の門が残るかつての公国の都",
    "In the 12th century this town took over from Kyiv as the political centre of Rus, and its white limestone Cathedral of the Dormition and its Golden Gate still speak to that prosperity. The gate was originally paired with a matching second gate, but only this one survives, and it still appears on the town's coat of arms today.|En el siglo XII esta ciudad sustituyó a Kiev como centro político de la Rus, y su catedral de la Dormición de piedra caliza blanca y su Puerta Dorada aún hablan de aquella prosperidad.|Au XIIe siècle, cette ville prit la place de Kiev comme centre politique de la Rus', et sa cathédrale de la Dormition en calcaire blanc ainsi que sa Porte dorée témoignent encore de cette prospérité.|12世紀、この町はキエフに代わってルーシの政治の中心を担い、白い石灰岩を積んだウスペンスキー大聖堂とゴールデンゲート(金門)がその繁栄を伝える。金門は本来ならもう一つ対の門があったはずだが、現存するのはこの一つだけで、いまも町の紋章に描かれ続けている。",
    [
      prop(
        "A souvenir stand by the Golden Gate|Un puesto de recuerdos junto a la Puerta Dorada|Un étal de souvenirs près de la Porte dorée|金門前の土産物屋台",
        800, 230,
      ),
      prop(
        "A café overlooking the cathedral|Un café con vistas a la catedral|Un café avec vue sur la cathédrale|大聖堂を望む展望カフェ",
        1050, 300,
      ),
    ],
  ),
  suzdal: city(
    "Suzdal|Súzdal|Souzdal|スーズダリ",
    40.45, 56.42, "tsn", "church", "goldenring", "b",
    "A town of churches with no tall buildings|Un pueblo de iglesias sin edificios altos|Une ville d'églises sans immeubles hauts|高い建物を持たない、教会だけの町",
    "This town of only around ten thousand people holds more than fifty churches and monasteries, and a local rule still keeps any new building lower than the bell towers. Missing out on industrialisation turned out to leave the whole town standing as a roofless museum rather than holding it back.|Este pueblo de apenas unos diez mil habitantes alberga más de cincuenta iglesias y monasterios, y una norma local aún mantiene cualquier edificio nuevo más bajo que los campanarios.|Ce bourg de dix mille habitants à peine compte plus de cinquante églises et monastères, et un règlement local maintient encore tout nouveau bâtiment plus bas que les clochers.|人口一万人ほどのこの小さな町には五十を超える聖堂と修道院が立ち、いまも新しい建物の高さを教会の鐘楼より低く抑える条例が守られている。産業化の波から外れたまま近代を過ごしたことが、逆にこの町を丸ごと屋根のない博物館として残す結果になった。",
    [
      prop(
        "A mead brewery by the monastery|Una fábrica de aguamiel junto al monasterio|Une brasserie d'hydromel près du monastère|修道院そばの蜂蜜酒醸造所",
        230, 66,
      ),
      prop(
        "A gift shop at the wooden architecture museum|Una tienda del museo de arquitectura de madera|Une boutique du musée d'architecture en bois|木造家屋の民俗博物館みやげ店",
        850, 240,
      ),
    ],
  ),
  tula: city(
    "Tula|Tula|Toula|トゥーラ",
    37.6, 54.2, "tsn", "craft", "industrial", "l",
    "A town of samovars and gunsmiths|Una ciudad de samovares y armeros|Une ville de samovars et d'armuriers|サモワールと鉄砲鍛冶の町",
    "Since Peter the Great opened a state arms works here in 1712, Tula has grown into one of the country's leading metalworking towns, and the same craft skill went into tea urns called samovars and a thick, honey-layered gingerbread known as Tula pryanik. \"Taking a samovar to Tula\" is still a common saying for the pointless act of bringing something to a place that already has plenty of it.|Desde que Pedro el Grande abrió aquí una fábrica estatal de armas en 1712, Tula ha crecido como una de las principales ciudades metalúrgicas del país, y la misma destreza artesanal se aplicó a los samovares y a un pan de jengibre.|Depuis que Pierre le Grand y ouvrit une manufacture d'armes d'État en 1712, Toula est devenue l'une des principales villes métallurgiques du pays, et le même savoir-faire artisanal s'est appliqué aux samovars et à un pain d'épice.|ピョートル大帝が1712年に国営の兵器工場を開いて以来、トゥーラは国内屈指の金属加工の町として育ち、同じ職人技は湯沸かし器サモワールと、はちみつを重ねた層の厚いジンジャーブレッド、トゥーラ・プリャーニクにも向けられてきた。「サモワールを持ってトゥーラへ行く」という言い回しは、すでにあるものをわざわざ持ち込む無駄な行為を指す慣用句として今も使われる。",
    [
      prop(
        "A pryanik gingerbread workshop|Un taller de galletas pryanik|Un atelier de pain d'épice pryanik|プリャーニク焼き菓子の工房",
        650, 190,
      ),
      prop(
        "A gift shop at the samovar museum|Una tienda del museo del samovar|Une boutique du musée du samovar|サモワール博物館の売店",
        780, 220,
      ),
    ],
  ),
  ryazan: city(
    "Ryazan|Riazán|Riazan|リャザン",
    39.7, 54.6, "tsn", "fortress", "fortress", "r",
    "The old fortress of a legendary defender|La antigua fortaleza de un defensor legendario|L'ancienne forteresse d'un défenseur légendaire|英雄エヴパーチイの伝説が残る古い砦",
    "After the Mongol invasion destroyed the original Principality of Ryazan in the 13th century, an epic poem tells of a warrior named Yevpaty Kolovrat who chased down the retreating army with a small band of survivors, though the tale was composed well after the chronicles and has never been confirmed as history. The present town was rebuilt some distance from that original capital, and the old citadel walls still stand on a bluff above the river.|Tras la invasión mongola que destruyó el principado original de Riazán en el siglo XIII, un poema épico narra a un guerrero llamado Yevpati Kolovrat que persiguió al ejército en retirada con un pequeño grupo de supervivientes.|Après l'invasion mongole qui détruisit au XIIIe siècle la principauté originelle de Riazan, un poème épique raconte un guerrier nommé Evpati Kolovrat poursuivant l'armée en retraite avec une poignée de survivants.|13世紀のモンゴル侵攻でリャザン公国が滅んだのち、生き残った武人エヴパーチイ・コロヴラトが小勢を率いて追撃したという武勲詩が語り継がれるが、これは年代記より後に成立した叙事詩に基づくもので、史実としての確証はない。現在の町は元のリャザン公国の都から少し離れた場所に再建されたもので、旧クレムリンの城壁は今も川を見下ろす丘の上に残る。",
    [
      prop(
        "A gift shop at the Kremlin's local museum|Una tienda del museo local del Kremlin|Une boutique du musée local du kremlin|クレムリン内の郷土博物館売店",
        620, 180,
      ),
      prop(
        "A kiosk at the viewpoint over the Oka|Un puesto en el mirador sobre el río Oká|Un kiosque au belvédère sur l'Oka|オカ川を望む展望台の売店",
        700, 200,
      ),
    ],
  ),
  tver: city(
    "Tver|Tver|Tver|トヴェリ",
    35.9, 56.86, "tsn", "river", "river", "l",
    "The river town that once rivalled Moscow|La ciudad fluvial que rivalizó con Moscú|La ville fluviale qui rivalisa avec Moscou|かつてモスクワと覇を競った川の都",
    "In the 14th century, the Principality of Tver was as powerful as the Principality of Moscow, and for a long time it was not at all clear which of the two would become the centre of a unified state. The town sits at the first major point where the Volga widens out in earnest, and from here the river still runs more than three thousand kilometres down to the Caspian Sea.|En el siglo XIV, el principado de Tver era tan poderoso como el de Moscú, y durante mucho tiempo no estuvo nada claro cuál de los dos se convertiría en el centro de un estado unificado.|Au XIVe siècle, la principauté de Tver était aussi puissante que celle de Moscou, et l'on ignora longtemps laquelle des deux deviendrait le centre d'un État unifié.|14世紀、トヴェリ公国はモスクワ公国と並ぶルーシ随一の勢力で、どちらが後の統一国家の中心になるかは長く定まっていなかった。町はヴォルガ川が本格的に川幅を広げ始める最初の大きな都市で、川はここから河口のカスピ海まで三千キロメートル以上を流れ下る。",
    [
      prop(
        "A café on the Volga embankment|Un café en el muelle del Volga|Un café sur le quai de la Volga|ヴォルガ河畔の桟橋カフェ",
        720, 210,
      ),
      prop(
        "A gift shop on the old merchants' street|Una tienda en la calle de los mercaderes viajeros|Une boutique dans la rue des marchands ambulants|旅行商人街の土産物屋",
        680, 195,
      ),
    ],
  ),
  smolensk: city(
    "Smolensk|Smolensk|Smolensk|スモレンスク",
    32.05, 54.78, "tsn", "fortress", "fortress", "r",
    "The wall that has blocked the road from the west|La muralla que ha bloqueado el camino desde el oeste|Le mur qui a bloqué la route venue de l'ouest|西からの道を幾度も阻んできた城壁",
    "The 6.5-kilometre wall built in the late 16th century was considered the strongest fortress in the country at the time; Napoleon's Grand Army fought its way past it on the road to Moscow in 1812, only to be held up at the same wall again on the retreat. The wall sits astride the main road watching for anything coming from the west, and that position is exactly why the town has been fought over so many times, though today locals simply walk along it as parkland.|La muralla de 6,5 kilómetros construida a finales del siglo XVI se consideraba la fortaleza más fuerte del país en su época; el Gran Ejército de Napoleón la superó en 1812 camino a Moscú.|Le mur de 6,5 kilomètres bâti à la fin du XVIe siècle passait pour la forteresse la plus solide du pays à l'époque ; la Grande Armée de Napoléon le franchit en 1812 sur la route de Moscou.|16世紀末に築かれた全長6.5kmの城壁は当時の国内最強の要塞とされ、ナポレオンの大陸軍が1812年にモスクワへ向かう途上でここを攻め落としたものの、退却の道でも再び同じ城壁の前で足止めされた。城壁は西からの街道を見張る土地に建てられており、その位置ゆえに幾度も戦乱の舞台になってきたが、いまは公園として市民が城壁沿いを散歩する。",
    [
      prop(
        "A café on the wall-side promenade|Un café en el paseo junto a la muralla|Un café sur la promenade des remparts|城壁沿いの散策路カフェ",
        750, 215,
      ),
      prop(
        "A gift shop at the glassworks museum|Una tienda del museo del vidrio|Une boutique du musée du verre|ガラス博物館の売店",
        680, 195,
      ),
    ],
  ),

  // ---- szp 北西 ----
  spb: city(
    "Saint Petersburg|San Petersburgo|Saint-Pétersbourg|サンクトペテルブルク",
    30.3, 59.94, "szp", "palace", "capital", "l",
    "The window to Europe built on a marsh|La ventana a Europa construida sobre un pantano|La fenêtre sur l'Europe bâtie sur un marais|沼地に開かれたヨーロッパへの窓",
    "Peter the Great began the city on the Neva delta's marshland in 1703, driving piles into the mud to carry the weight of a European-style capital he intended as a deliberate break from old Moscow. The result is a city built across more than forty islands, threaded together by over eight hundred bridges, more than Venice or Amsterdam can claim.|Pedro el Grande fundó la ciudad sobre el pantanoso delta del Nevá en 1703, clavando pilotes en el barro para sostener el peso de una capital de estilo europeo.|Pierre le Grand fonda la ville sur le delta marécageux de la Neva en 1703, enfonçant des pieux dans la boue pour porter le poids d'une capitale de style européen.|ピョートル大帝は1703年、ネヴァ川デルタの沼地にこの町を興し、古いモスクワから意図的に袂を分かつヨーロッパ風の都を支えるため、泥の中に杭を打ち込んでいった。結果として四十を超える島にまたがる町ができあがり、八百を超える橋がそれらを結んでいる。ヴェネツィアやアムステルダムよりも多い数である。",
    [
      prop(
        "A canal-side café near the Hermitage|Un café junto al canal cerca del Hermitage|Un café au bord du canal près de l'Ermitage|エルミタージュ近くの運河沿いカフェ",
        2300, 640,
      ),
      prop(
        "A boutique on Nevsky Prospekt|Una boutique en la Perspectiva Nevski|Une boutique sur la perspective Nevski|ネフスキー大通りの洋品店",
        2500, 700,
      ),
    ],
  ),
  murmansk: city(
    "Murmansk|Múrmansk|Mourmansk|ムルマンスク",
    33.08, 68.97, "szp", "port", "port", "b",
    "The Arctic Circle's largest ice-free port|El mayor puerto libre de hielo del Círculo Polar Ártico|Le plus grand port sans glace du cercle polaire|北極圏最大の不凍港",
    "Founded only in 1916, making it one of the last major cities established under the empire, Murmansk stays ice-free through the winter thanks to a branch of the same warm Atlantic current that moderates Norway's coast, even though the city sits well above the Arctic Circle. Winter brings roughly six weeks of continuous polar night, and summer answers with a matching stretch of sun that never fully sets.|Fundada apenas en 1916, lo que la convierte en una de las últimas grandes ciudades establecidas bajo el imperio, Múrmansk permanece libre de hielo durante el invierno gracias a una rama de la misma corriente cálida del Atlántico que suaviza la costa de Noruega.|Fondée seulement en 1916, ce qui en fait l'une des dernières grandes villes créées sous l'empire, Mourmansk reste libre de glace en hiver grâce à une branche du même courant atlantique chaud qui adoucit la côte norvégienne.|1916年という帝政末期に建てられた、数少ない大都市の一つであるムルマンスクは、北極圏の内側に位置しながら、ノルウェー沿岸を温める同じ暖流の枝分かれのおかげで冬でも凍らない。冬にはおよそ六週間、太陽の昇らない極夜が続き、夏には同じだけの長さ、日の沈まない白夜が答える。",
    [
      prop(
        "A fisherman's supply shop by the harbour|Una tienda de suministros de pesca en el puerto|Une boutique d'articles de pêche au port|港の漁具店",
        820, 235,
      ),
      prop(
        "A café inside the icebreaker museum ship|Un café en el buque museo rompehielos|Un café dans le brise-glace musée|砕氷船博物館内のカフェ",
        900, 255,
      ),
    ],
  ),
  arkhangelsk: city(
    "Arkhangelsk|Arcángel|Arkhangelsk|アルハンゲリスク",
    40.5, 64.55, "szp", "port", "port", "r",
    "Russia's first great gateway to the sea|La primera gran puerta de Rusia al mar|La première grande porte de la Russie sur la mer|ロシア最初の大きな海の玄関口",
    "Ivan the Terrible ordered this port founded in 1584 at the mouth of the Northern Dvina River on the White Sea, and for well over a century it was the country's only real seaport, trading with English merchants long before Saint Petersburg existed to take over that role. The White Sea freezes over for much of the winter, so the port still leans on icebreaker escorts to keep shipping lanes open.|Iván el Terrible ordenó fundar este puerto en 1584 en la desembocadura del río Dviná Septentrional, en el mar Blanco, y durante más de un siglo fue el único puerto marítimo real del país.|Ivan le Terrible ordonna la fondation de ce port en 1584 à l'embouchure de la Dvina septentrionale, sur la mer Blanche, et pendant plus d'un siècle il fut le seul véritable port maritime du pays.|イヴァン雷帝は1584年、白海に注ぐ北ドヴィナ川の河口にこの港を築かせ、サンクトペテルブルクがその役目を引き継ぐよりずっと前、一世紀以上にわたって国内で唯一の本格的な海港であり続け、イギリスの商人たちと取引を交わしていた。白海は冬のあいだ長く凍りつくため、この港はいまも砕氷船の護衛に頼って航路を保っている。",
    [
      prop(
        "A shipyard-district tea house|Una casa de té en el barrio de los astilleros|Un salon de thé dans le quartier des chantiers navals|造船地区の茶館",
        700, 200,
      ),
      prop(
        "A wooden-architecture museum shop|Una tienda del museo de arquitectura de madera|Une boutique du musée d'architecture en bois|木造建築博物館の売店",
        650, 190,
      ),
    ],
  ),
  vologda: city(
    "Vologda|Vólogda|Vologda|ヴォログダ",
    39.9, 59.22, "szp", "church", "goldenring", "l",
    "The town of lace and nutty-tasting butter|La ciudad del encaje y la mantequilla de sabor a nuez|La ville de la dentelle et du beurre au goût de noisette|レースと木の実の香るバターの町",
    "Vologda lacemakers still work bobbin lace by hand in patterns passed down through generations, a craft recognised as part of the country's cultural heritage. The distinct, faintly nutty butter that carries the town's name was developed here in the 1870s by a dairy pioneer who heated the cream to a specific temperature before churning, a technique still followed at the local dairy today.|Las encajeras de Vólogda aún trabajan a mano el encaje de bolillos con patrones transmitidos de generación en generación, un oficio reconocido como parte del patrimonio cultural del país.|Les dentellières de Vologda travaillent encore à la main la dentelle aux fuseaux selon des motifs transmis de génération en génération, un artisanat reconnu comme faisant partie du patrimoine culturel du pays.|ヴォログダのレース職人は、いまも世代を超えて受け継がれた文様をボビンレースで手編みしており、この技はロシアの文化遺産の一部として認められている。町の名を冠したほのかに木の実の香るバターは、1870年代にこの地の乳業の先駆者がクリームを特定の温度まで温めてから撹拌する製法を編み出したことに始まり、いまも地元の乳業所で同じ手順が受け継がれている。",
    [
      prop(
        "A lacemaker's workshop shop|Una tienda del taller de encaje|Une boutique de l'atelier de dentelle|レース工房の売店",
        780, 225,
      ),
      prop(
        "A dairy shop by the old market|Una tienda de lácteos junto al mercado viejo|Une crémerie près du vieux marché|旧市場そばの乳製品店",
        700, 200,
      ),
    ],
  ),
  pskov: city(
    "Pskov|Pskov|Pskov|プスコフ",
    28.33, 57.82, "szp", "fortress", "fortress", "l",
    "The merchant republic that guarded the border|La república mercantil que guardaba la frontera|La république marchande qui gardait la frontière|国境を守った商人共和国",
    "Like its rival Novgorod, medieval Pskov governed itself as an independent republic for centuries, its citizens gathering at a bell-summoned assembly to make decisions rather than answering to a prince. Sitting close to the western border, the town's kremlin, known locally as the Krom, was rebuilt and reinforced so many times over the centuries that its walls now show several distinct eras of stonework side by side.|Como su rival Nóvgorod, la Pskov medieval se gobernó como una república independiente durante siglos, con sus ciudadanos reuniéndose en una asamblea convocada por campana para tomar decisiones.|Comme sa rivale Novgorod, la Pskov médiévale se gouverna en république indépendante pendant des siècles, ses citoyens se réunissant en une assemblée convoquée par une cloche pour prendre leurs décisions.|ライバルのノヴゴロドと同じく、中世のプスコフは何世紀ものあいだ独立した共和国として自治を行い、市民は鐘の合図で集まる議会で物事を決めていた。西の国境に近いこの町のクレムリン(地元ではクロムと呼ばれる)は何度も建て替えと補強を重ね、いまも城壁には時代の異なる石積みがいくつも並んで見える。",
    [
      prop(
        "A gift shop inside the Krom fortress|Una tienda dentro de la fortaleza del Krom|Une boutique à l'intérieur de la forteresse du Krom|クロム要塞内の売店",
        650, 190,
      ),
      prop(
        "A riverside café on the Velikaya|Un café junto al río Velikaya|Un café au bord de la Velikaïa|ヴェリカヤ川岸のカフェ",
        200, 58,
      ),
    ],
  ),
  novgorod: city(
    "Veliky Novgorod|Vélikiv Nóvgorod|Veliki Novgorod|ヴェリキーノヴゴロド",
    31.27, 58.52, "szp", "church", "goldenring", "r",
    "Letters on birch bark from ordinary medieval life|Cartas en corteza de abedul de la vida medieval cotidiana|Des lettres sur écorce de bouleau de la vie médiévale ordinaire|白樺の樹皮に残る中世庶民の手紙",
    "First mentioned in a chronicle in the year 859, this is one of the country's oldest cities and for centuries was governed as a merchant republic through a citizens' assembly rather than by a prince's word alone. The town's damp clay soil has preserved over a thousand birch-bark letters written by ordinary medieval residents about debts, shopping lists and children's scribbles, offering a far more everyday picture of the period than official chronicles ever could.|Mencionada por primera vez en una crónica del año 859, es una de las ciudades más antiguas del país y durante siglos se gobernó como una república mercantil mediante una asamblea de ciudadanos.|Mentionnée pour la première fois dans une chronique de l'an 859, c'est l'une des plus anciennes villes du pays, et elle fut gouvernée pendant des siècles en république marchande par une assemblée de citoyens.|859年の年代記に初めて名が現れる、この国でも指折り古いこの町は、何世紀ものあいだ公の一存ではなく市民の議会によって治められる商人共和国だった。町の湿った粘土質の土壌は、借金の記録や買い物のメモ、子どものいたずら書きまで、中世の一般住民が書いた白樺の樹皮の手紙を千通以上も残しており、公式の年代記よりもずっと生々しい当時の暮らしを伝えている。",
    [
      prop(
        "A gift shop by the birch-bark museum|Una tienda junto al museo de la corteza de abedul|Une boutique près du musée de l'écorce de bouleau|白樺文書博物館そばの売店",
        700, 200,
      ),
      prop(
        "A kremlin-wall bell-tower kiosk|Un quiosco junto al campanario de la muralla del kremlin|Un kiosque près du clocher des remparts du kremlin|クレムリン鐘楼の売店",
        650, 185,
      ),
    ],
  ),
  petrozavodsk: city(
    "Petrozavodsk|Petrozavodsk|Petrozavodsk|ペトロザヴォーツク",
    34.35, 61.79, "szp", "church", "goldenring", "l",
    "An ironworks town on Europe's second-largest lake|Una ciudad de fundiciones en el segundo lago más grande de Europa|Une ville de forges sur le deuxième plus grand lac d'Europe|欧州第二の湖畔に築かれた鋳造の町",
    "Peter the Great founded this town in 1703 as an ironworks to arm his new navy, and its name still means simply \"Peter's factory.\" It sits on Lake Onega, Europe's second-largest lake after Ladoga, and serves as the mainland gateway to Kizhi Island's wooden churches, built by local carpenters using little metal hardware beyond nails for the roof shingles, according to a tradition often summarised, not quite literally, as \"without a single nail.\"|Pedro el Grande fundó esta ciudad en 1703 como fundición de hierro para armar su nueva flota, y su nombre aún significa simplemente «fábrica de Pedro».|Pierre le Grand fonda cette ville en 1703 comme forge pour armer sa nouvelle flotte, et son nom signifie encore simplement « l'usine de Pierre ».|ピョートル大帝は1703年、新しい艦隊を武装させるための鋳造所としてこの町を興した。町の名はいまも単に「ピョートルの工場」を意味する。町はラドガ湖に次ぐヨーロッパ第二の湖、オネガ湖に面しており、地元の大工たちが屋根板の釘以外ほとんど金物を使わずに建てたとされるキジ島の木造聖堂群への本土側の玄関口になっている。「釘を一本も使わない」という言い方をされることが多いが、これは厳密な意味ではない。",
    [
      prop(
        "A boat-tour ticket kiosk to Kizhi Island|Un quiosco de boletos de barco a la isla de Kizhi|Un kiosque de billets de bateau pour l'île de Kiji|キジ島行き船便の切符売り場",
        750, 215,
      ),
      prop(
        "A Karelian craft shop on the lakefront|Una tienda de artesanía carelia en el lago|Une boutique d'artisanat carélien au bord du lac|湖畔のカレリア工芸品店",
        700, 200,
      ),
    ],
  ),

  // ---- yug 南部・カフカス ----
  sochi: city(
    "Sochi|Sochi|Sotchi|ソチ",
    39.73, 43.6, "yug", "coast", "coast", "b",
    "A subtropical resort that hosted a Winter Olympics|Un balneario subtropical que albergó unos Juegos Olímpicos de invierno|Une station balnéaire subtropicale qui accueillit des Jeux olympiques d'hiver|冬季五輪を開いた亜熱帯の保養地",
    "Palm-lined beaches and snow-capped Caucasus peaks sit within sight of each other along this stretch of Black Sea coast, a combination striking enough that Sochi has served as a sanatorium retreat for the elite since Soviet times. That same odd pairing let the subtropical resort town host the Winter Olympics in 2014, with the skiing events held in the mountains barely an hour's drive from the palm trees.|Playas bordeadas de palmeras y picos nevados del Cáucaso se ven mutuamente a lo largo de este tramo de costa del mar Negro, una combinación tan llamativa que Sochi ha servido de retiro sanatorial para la élite desde la época soviética.|Des plages bordées de palmiers et des sommets enneigés du Caucase se font face le long de ce littoral de la mer Noire, une combinaison si frappante que Sotchi sert de lieu de cure pour l'élite depuis l'époque soviétique.|黒海沿いのこの一帯では、椰子の並ぶ浜辺と雪をかぶったカフカスの峰々が互いに見える距離にあり、その取り合わせの際立った特異さゆえに、ソチはソ連時代から要人向けの療養地として使われてきた。同じ奇妙な組み合わせのおかげで、この亜熱帯の保養地は2014年に冬季五輪まで開くことになり、スキー競技の会場は椰子の木からわずか一時間ほどの山中に置かれた。",
    [
      prop(
        "A beachfront kiosk|Un quiosco frente a la playa|Un kiosque en bord de plage|海辺の売店",
        1300, 370,
      ),
      prop(
        "A hotel by the Olympic Park|Un hotel junto al Parque Olímpico|Un hôtel près du parc olympique|オリンピックパークそばのホテル",
        1900, 540,
      ),
    ],
  ),
  volgograd: city(
    "Volgograd|Volgogrado|Volgograd|ヴォルゴグラード",
    44.5, 48.7, "yug", "memorial", "steppe", "r",
    "A river city that has carried three names|Una ciudad fluvial que ha llevado tres nombres|Une ville fluviale qui a porté trois noms|三つの名を経てきた川の町",
    "Founded as a fortress called Tsaritsyn, renamed Stalingrad in 1925 and Volgograd in 1961, this city on a great bend of the Volga has changed its name with the country's own history. On the hill at its centre stands The Motherland Calls, a sword-raising statue built in 1967 that briefly ranked as the tallest statue in the world, commemorating the defenders of the city during the Second World War.|Fundada como una fortaleza llamada Tsaritsyn, renombrada Stalingrado en 1925 y Volgogrado en 1961, esta ciudad en un gran meandro del Volga ha cambiado de nombre junto con la propia historia del país.|Fondée comme forteresse sous le nom de Tsaritsyne, rebaptisée Stalingrad en 1925 puis Volgograd en 1961, cette ville sur un grand méandre de la Volga a changé de nom au fil de l'histoire même du pays.|要塞ツァリーツィンとして興り、1925年にスターリングラード、1961年にヴォルゴグラードと改称されてきたこの町は、ヴォルガ川の大きな湾曲部に位置し、国そのものの歴史とともに名を変えてきた。町の中心の丘には、剣を掲げる「祖国は呼ぶ」像が1967年に建てられ、一時は世界最高の像として、第二次世界大戦の防衛にあたった人々を悼んでいる。",
    [
      prop(
        "A riverside café by the Volga|Un café junto al Volga|Un café au bord de la Volga|ヴォルガ河畔のカフェ",
        900, 260,
      ),
      prop(
        "A gift shop at the memorial complex|Una tienda del complejo conmemorativo|Une boutique du complexe commémoratif|記念複合施設の売店",
        950, 270,
      ),
    ],
  ),
  rostov: city(
    "Rostov-on-Don|Rostov del Don|Rostov-sur-le-Don|ロストフ・ナ・ドヌ",
    39.7, 47.23, "yug", "steppe", "steppe", "l",
    "The Cossack gateway to the Caucasus|La puerta cosaca al Cáucaso|La porte cosaque du Caucase|カフカスへのコサックの玄関口",
    "Sitting on the Don River not far above where it opens into the Sea of Azov, Rostov has long been called the gateway to the Caucasus for travellers heading south. The surrounding steppe was home to the Don Cossacks, semi-independent horsemen and river-farmers who governed their own communities and produced some of the country's most distinctive folk songs and dances.|Situada en el río Don no muy lejos de donde este desemboca en el mar de Azov, Rostov ha sido durante mucho tiempo llamada la puerta al Cáucaso para los viajeros que se dirigen al sur.|Située sur le Don non loin de son embouchure dans la mer d'Azov, Rostov est depuis longtemps appelée la porte du Caucase pour les voyageurs se dirigeant vers le sud.|アゾフ海へ注ぐ河口からそう遠くないドン川沿いに位置するロストフは、南へ向かう旅人にとって長らく「カフカスの玄関口」と呼ばれてきた。周囲の草原はドン・コサックの土地で、半ば独立した騎馬の民・川辺の農民として自分たちの共同体を治め、国内でも指折り個性的な民謡と踊りを生み出した。",
    [
      prop(
        "A Cossack craft market stall|Un puesto del mercado de artesanía cosaca|Un stand du marché d'artisanat cosaque|コサック工芸品市場の露店",
        800, 230,
      ),
      prop(
        "A fish restaurant on the Don embankment|Un restaurante de pescado en el malecón del Don|Un restaurant de poisson sur les quais du Don|ドン河畔の魚料理店",
        950, 270,
      ),
    ],
  ),
  krasnodar: city(
    "Krasnodar|Krasnodar|Krasnodar|クラスノダール",
    38.98, 45.03, "yug", "steppe", "steppe", "r",
    "The breadbasket built on black soil|El granero construido sobre tierra negra|Le grenier bâti sur une terre noire|黒い土に築かれた穀倉地帯",
    "Founded by Black Sea Cossacks in 1793 as Yekaterinodar, this city sits at the heart of the Kuban region's chernozem, a black soil so naturally fertile that the surrounding farmland produces a large share of the country's wheat, sunflowers and fruit without needing much fertiliser. The mild climate, unusually warm for a Russian region, also supports vineyards that would struggle almost anywhere else in the country.|Fundada por cosacos del mar Negro en 1793 como Ekaterinodar, esta ciudad se asienta en el corazón del chernozem de la región del Kubán, una tierra negra tan fértil de forma natural que las tierras de labranza producen una gran parte del trigo del país.|Fondée par les cosaques de la mer Noire en 1793 sous le nom d'Iekaterinodar, cette ville se trouve au cœur du tchernoziom de la région du Kouban, une terre noire si naturellement fertile que les terres agricoles alentour produisent une bonne part du blé du pays.|1793年に黒海コサックがエカテリノダールとして興したこの町は、クバン地方の黒土(チェルノーゼム)地帯の中心に位置する。あまり肥料を必要としないほど自然に肥沃なこの黒い土のおかげで、周辺の農地は国内の小麦・ひまわり・果物の大きな割合を産する。ロシアの土地としては珍しく温暖な気候は、国内の他の地域ではまず育たないぶどう畑も支えている。",
    [
      prop(
        "A farmers' market fruit stall|Un puesto de frutas en el mercado de agricultores|Un stand de fruits au marché fermier|農産物市場の果物店",
        850, 240,
      ),
      prop(
        "A winery tasting-room shop|Una tienda de cata de una bodega|Une boutique de dégustation viticole|ワイナリー試飲室の売店",
        1000, 285,
      ),
    ],
  ),
  astrakhan: city(
    "Astrakhan|Astracán|Astrakhan|アストラハン",
    48.04, 46.35, "yug", "port", "caspian", "r",
    "A delta crossroads of caviar and cultures|Un cruce del delta de caviar y culturas|Un carrefour du delta, caviar et cultures|キャビアと多文化が交わる三角州の交差点",
    "Sitting where the Volga fans out into the Caspian Sea, Astrakhan grew rich on the sturgeon fishery that once made it one of the world's main sources of caviar, though wild-caught stocks have shrunk sharply since Soviet times. Long before that, the town stood at a crossroads of Russian, Tatar, Kalmyk, Persian and Armenian traders, a mix still visible in its markets and its skyline of both churches and mosques.|Situada donde el Volga se abre en abanico hacia el mar Caspio, Astracán se enriqueció con la pesquería de esturión que la convirtió en una de las principales fuentes mundiales de caviar.|Située là où la Volga s'ouvre en éventail vers la mer Caspienne, Astrakhan s'est enrichie grâce à la pêche à l'esturgeon qui en fit l'une des principales sources mondiales de caviar.|ヴォルガ川がカスピ海へ扇状に開く場所に位置するアストラハンは、かつて世界有数のキャビアの産地であったチョウザメ漁で富を築いたが、天然の漁獲量はソ連時代以降大きく減っている。それよりずっと前から、この町はロシア人・タタール人・カルムイク人・ペルシア人・アルメニア人の商人が行き交う交差点であり、その混じり合いはいまも市場や、聖堂とモスクが並び立つ町並みに見て取れる。",
    [
      prop(
        "A caviar and fish market stall|Un puesto de caviar y pescado en el mercado|Un stand de caviar et poisson au marché|キャビア・魚市場の露店",
        1100, 315,
      ),
      prop(
        "A watermelon stand by the delta road|Un puesto de sandías junto a la carretera del delta|Un étal de pastèques sur la route du delta|三角州街道沿いのスイカ売り場",
        700, 200,
      ),
    ],
  ),
  stavropol: city(
    "Stavropol|Stávropol|Stavropol|スタヴロポリ",
    41.97, 45.04, "yug", "caucasus", "steppe", "l",
    "A fortress-line town at the spa region's door|Una ciudad de la línea de fortalezas a la puerta de la región de balnearios|Une ville de la ligne de forteresses à la porte de la région thermale|保養地への入口となった要塞線の町",
    "Built in 1777 as one link in a chain of fortresses guarding the empire's southern frontier, Stavropol's name means roughly \"city of the cross.\" It now serves as the gateway to the Caucasian Mineral Waters spa towns nearby, a cluster of resorts where 19th-century poets and officers went to take the waters, including Mikhail Lermontov, who spent his final months in the area before his death in a duel.|Construida en 1777 como un eslabón en la cadena de fortalezas que custodiaba la frontera sur del imperio, el nombre de Stávropol significa aproximadamente «ciudad de la cruz».|Bâtie en 1777 comme maillon d'une chaîne de forteresses gardant la frontière méridionale de l'empire, le nom de Stavropol signifie à peu près « ville de la croix ».|1777年、帝国南方の国境を守る要塞線の一環として築かれたスタヴロポリの名は、おおよそ「十字架の町」を意味する。いまはこの町は近郊のカフカス鉱泉保養地群への玄関口を担っている。19世紀の詩人や将校が湯治に訪れた保養地の一つで、決闘で命を落とす直前の数か月をこの地で過ごした詩人ミハイル・レールモントフもその一人だった。",
    [
      prop(
        "A mineral-water bottling shop|Una tienda embotelladora de agua mineral|Une boutique d'embouteillage d'eau minérale|鉱泉水の瓶詰め店",
        800, 230,
      ),
      prop(
        "A boulevard café near the botanical garden|Un café de bulevar cerca del jardín botánico|Un café de boulevard près du jardin botanique|植物園そばの並木道カフェ",
        850, 240,
      ),
    ],
  ),
  vladikavkaz: city(
    "Vladikavkaz|Vladikavkaz|Vladikavkaz|ヴラジカフカス",
    44.68, 43.02, "yug", "caucasus", "steppe", "r",
    "The mountain gateway whose name means \"ruler of the Caucasus\"|La puerta de montaña cuyo nombre significa «señor del Cáucaso»|La porte montagneuse dont le nom signifie « maître du Caucase »|「カフカスを制する者」を名に持つ山あいの玄関口",
    "Founded as a fortress in 1784, the city's name was chosen to declare imperial control over the mountains, and it sits at the northern end of the Georgian Military Road, a route carved through the high Caucasus that has carried travellers, traders and armies toward Tbilisi for centuries. As the capital of North Ossetia, it remains one of the most ethnically mixed cities in the whole Caucasus region.|Fundada como fortaleza en 1784, el nombre de la ciudad fue elegido para proclamar el control imperial sobre las montañas, y se encuentra en el extremo norte de la Carretera Militar de Georgia.|Fondée comme forteresse en 1784, le nom de la ville fut choisi pour proclamer le contrôle impérial sur les montagnes, et elle se trouve à l'extrémité nord de la route militaire de Géorgie.|1784年に要塞として築かれたこの町の名は、山岳地帯への帝国の支配を宣言するために選ばれたもので、高いカフカス山脈を切り開いて何世紀も旅人・商人・軍隊をトビリシへと運んできたグルジア軍用道路の北の起点に位置する。北オセチアの首都として、いまもカフカス地域全体でも指折り民族の入り混じった町であり続けている。",
    [
      prop(
        "A mountain-pass souvenir stall|Un puesto de recuerdos del paso de montaña|Un étal de souvenirs du col de montagne|山道の峠の土産物店",
        750, 215,
      ),
      prop(
        "An Ossetian pie bakery|Una panadería de empanadas osetias|Une boulangerie de tourtes ossètes|オセチアパイの店",
        240, 68,
      ),
    ],
  ),

  // ---- vlg ヴォルガ・ウラル ----
  kazan: city(
    "Kazan|Kazán|Kazan|カザン",
    49.13, 55.79, "vlg", "domes", "domes", "l",
    "One kremlin, a cathedral and a mosque together|Un kremlin con catedral y mezquita a la vez|Un kremlin avec cathédrale et mosquée ensemble|一つの城壁に聖堂とモスクが並ぶ都",
    "Once the capital of the Kazan Khanate until Ivan the Terrible conquered it in 1552, Kazan is now the capital of Tatarstan, and its kremlin holds both an Orthodox cathedral and the Qol Sharif Mosque, rebuilt in 2005 to echo a mosque destroyed in that same 16th-century conquest. The pairing is a deliberate statement about the city's dual Tatar-Muslim and Russian-Orthodox heritage, not a coincidence of geography.|Antaño capital del kanato de Kazán hasta que Iván el Terrible lo conquistó en 1552, Kazán es hoy la capital de Tartaristán, y su kremlin alberga tanto una catedral ortodoxa como la mezquita Qol Sharif.|Autrefois capitale du khanat de Kazan jusqu'à sa conquête par Ivan le Terrible en 1552, Kazan est aujourd'hui la capitale du Tatarstan, et son kremlin abrite à la fois une cathédrale orthodoxe et la mosquée Qol Sharif.|1552年にイヴァン雷帝に征服されるまでカザン・ハン国の都だったこの町は、いまはタタールスタン共和国の首都で、そのクレムリンにはロシア正教の大聖堂と、同じ16世紀の征服で破壊されたモスクを模して2005年に再建されたクル・シャリフ・モスクが並んで立つ。この組み合わせは地理の偶然ではなく、タタール・イスラームとロシア正教という二つの伝統を併せ持つこの町のありかたを意図して示したものである。",
    [
      prop(
        "A gift shop inside the kremlin walls|Una tienda dentro de las murallas del kremlin|Une boutique à l'intérieur des murs du kremlin|クレムリン城壁内の売店",
        1400, 400,
      ),
      prop(
        "A tea house serving chak-chak pastry|Una casa de té que sirve pastel chak-chak|Un salon de thé servant du tchak-tchak|チャクチャクを出す茶館",
        1200, 340,
      ),
    ],
  ),
  yekaterinburg: city(
    "Yekaterinburg|Ekaterimburgo|Iekaterinbourg|エカテリンブルク",
    60.6, 56.84, "vlg", "urals", "urals", "r",
    "The city standing astride two continents|La ciudad a caballo entre dos continentes|La ville à cheval sur deux continents|二つの大陸にまたがる町",
    "Founded in 1723 and named for Peter the Great's wife Catherine, this Ural mountains city sits so close to the conventional line between Europe and Asia that an obelisk marking the boundary stands just outside town, letting visitors step across two continents in a single stride. The city was also the site of the Romanov family's execution in 1918, a pivotal and still solemnly marked event in the fall of the empire.|Fundada en 1723 y nombrada en honor a Catalina, esposa de Pedro el Grande, esta ciudad de los montes Urales está tan cerca de la línea convencional entre Europa y Asia que un obelisco que marca el límite se alza justo a las afueras.|Fondée en 1723 et nommée en l'honneur de Catherine, épouse de Pierre le Grand, cette ville des monts Oural est si proche de la ligne conventionnelle entre l'Europe et l'Asie qu'un obélisque marquant la frontière se dresse juste à l'extérieur de la ville.|1723年に興り、ピョートル大帝の妻エカテリーナにちなんで名づけられたこのウラル山中の町は、ヨーロッパとアジアを分ける慣例上の境界線のすぐそばに位置し、町のすぐ外に立つ境界を示す標柱では、一またぎで二つの大陸を渡ることができる。この町はまた、1918年にロマノフ家が処刑された場所でもあり、帝政の終焉における重要な出来事として、いまも厳粛に記憶されている。",
    [
      prop(
        "A souvenir shop at the Europe–Asia obelisk|Una tienda de recuerdos en el obelisco Europa-Asia|Une boutique de souvenirs à l'obélisque Europe-Asie|欧亜境界標柱の土産物店",
        1150, 330,
      ),
      prop(
        "A mineral and gemstone shop|Una tienda de minerales y piedras preciosas|Une boutique de minéraux et pierres précieuses|鉱石・宝石店",
        1300, 370,
      ),
    ],
  ),
  perm: city(
    "Perm|Perm|Perm|ペルミ",
    56.23, 58.01, "vlg", "industry", "industrial", "l",
    "The old gateway to Siberia, now a stage for ballet|La antigua puerta a Siberia, hoy escenario de ballet|L'ancienne porte de la Sibérie, aujourd'hui scène de ballet|かつてシベリアへの門、いまはバレエの舞台",
    "For centuries this Kama River city was the last major stop for travellers and exiled convicts heading east into Siberia, a role its position on the western edge of the Urals made almost unavoidable. During the Second World War the Mariinsky Ballet company was evacuated here from Leningrad, and the teaching it left behind helped grow a ballet school still considered one of the country's finest.|Durante siglos, esta ciudad del río Kama fue la última parada importante para viajeros y presidiarios desterrados que se dirigían hacia el este, a Siberia, un papel casi inevitable dada su posición en el borde occidental de los Urales.|Pendant des siècles, cette ville de la rivière Kama fut le dernier grand arrêt pour les voyageurs et les condamnés exilés en route vers la Sibérie, un rôle presque inévitable vu sa position à la lisière occidentale de l'Oural.|何世紀ものあいだ、このカマ川沿いの町はシベリアへ東へ向かう旅人や流刑囚にとって最後の大きな宿場町だった。ウラル山脈の西の縁というその位置ゆえ、ほとんど避けられない役割だった。第二次世界大戦中、マリインスキー・バレエ団がレニングラードからこの地へ疎開し、そこで受け継がれた指導が、いまも国内屈指と評されるバレエ学校を育てた。",
    [
      prop(
        "A ballet-theatre programme shop|Una tienda de programas del teatro de ballet|Une boutique de programmes du théâtre de ballet|バレエ劇場のプログラム売店",
        1050, 300,
      ),
      prop(
        "A riverside café on the Kama|Un café junto al río Kama|Un café au bord de la Kama|カマ河畔のカフェ",
        900, 255,
      ),
    ],
  ),
  nizhny: city(
    "Nizhny Novgorod|Nizhni Nóvgorod|Nijni Novgorod|ニジニノヴゴロド",
    44.0, 56.33, "vlg", "river", "river", "r",
    "The fair that once set half the country's prices|La feria que una vez fijó los precios de medio país|La foire qui fixait autrefois les prix de la moitié du pays|かつて国の半分の物価を決めた大市",
    "Standing where the Volga and Oka rivers meet, the city hosted an annual trade fair so large after it moved here in 1817 that 19th-century merchants half-joked prices set at Nizhny Novgorod effectively set prices for the whole country. During the Soviet era the city was renamed Gorky after the writer Maxim Gorky and closed to foreigners entirely because of its defence industry, a restriction lifted only in 1991.|Situada donde confluyen los ríos Volga y Oká, la ciudad acogió una feria comercial anual tan grande tras trasladarse aquí en 1817 que los comerciantes del siglo XIX bromeaban a medias con que los precios fijados en Nizhni Nóvgorod fijaban los precios de todo el país.|Située au confluent de la Volga et de l'Oka, la ville accueillit une foire commerciale annuelle si vaste après son transfert ici en 1817 que les marchands du XIXe siècle plaisantaient à moitié en disant que les prix fixés à Nijni Novgorod fixaient ceux de tout le pays.|ヴォルガ川とオカ川が合流する地に立つこの町は、1817年に大市がここへ移されて以来、あまりの規模の大きさに、19世紀の商人たちはニジニノヴゴロドで決まる値段が国じゅうの相場を決めているのだと半ば冗談まじりに語ったという。ソ連時代にはこの町は作家マクシム・ゴーリキーにちなんでゴーリキーと改称され、軍需産業のため外国人には完全に閉ざされた町となり、その制限が解かれたのは1991年になってからだった。",
    [
      prop(
        "A stall at the old fairground|Un puesto en el antiguo recinto ferial|Un stand sur l'ancien champ de foire|旧大市会場の露店",
        1000, 285,
      ),
      prop(
        "A café at the Volga-Oka confluence|Un café en la confluencia del Volga y el Oká|Un café au confluent de la Volga et de l'Oka|ヴォルガ・オカ合流点のカフェ",
        950, 270,
      ),
    ],
  ),
  ufa: city(
    "Ufa|Ufá|Oufa|ウファ",
    55.97, 54.73, "vlg", "industry", "industrial", "l",
    "The forest-honey capital of Bashkortostan|La capital de la miel silvestre de Baskortostán|La capitale du miel sauvage du Bachkortostan|バシコルトスタンの森の蜂蜜の都",
    "As the capital of Bashkortostan, Ufa sits at the centre of a region that still practises bortnichestvo, an ancient method of keeping wild bees in hollowed-out tree trunks high in the forest rather than in hive boxes on the ground. Bashkir wild honey harvested this way is prized across the country for a flavour beekeepers say no farmed hive can quite match, and the tradition is recognised as part of the region's cultural heritage.|Como capital de Baskortostán, Ufá se encuentra en el centro de una región que aún practica el bortnichestvo, un antiguo método de criar abejas silvestres en troncos huecos en lo alto del bosque.|Capitale du Bachkortostan, Oufa se trouve au centre d'une région qui pratique encore le bortnitchestvo, une méthode ancienne consistant à élever des abeilles sauvages dans des troncs d'arbres évidés en pleine forêt.|バシコルトスタン共和国の首都であるウファは、地上の巣箱ではなく森の高い木の幹をくり抜いた中で野生の蜜蜂を飼う古来の養蜂法、ボルトニチェストヴォがいまも行われる地方の中心にある。この方法で集められるバシキール野生蜂蜜は、養蜂箱では出せない味わいがあると全国で珍重されており、この伝統は地方の文化遺産の一部として認められている。",
    [
      prop(
        "A wild-honey shop by the market|Una tienda de miel silvestre junto al mercado|Une boutique de miel sauvage près du marché|市場そばの野生蜂蜜店",
        900, 260,
      ),
      prop(
        "A leatherwork stall in the old quarter|Un puesto de cuero en el barrio antiguo|Un stand de maroquinerie dans le vieux quartier|旧市街の革製品店",
        290, 83,
      ),
    ],
  ),
  samara: city(
    "Samara|Samara|Samara|サマラ",
    50.15, 53.2, "vlg", "rocket", "rocket", "r",
    "Where Soyuz rockets and a secret bunker were built|Donde se construyeron los cohetes Soyuz y un búnker secreto|Où furent construites les fusées Soyouz et un bunker secret|ソユーズロケットと秘密の防空壕が築かれた町",
    "The Progress factory here has assembled the great majority of the Soyuz rockets ever launched, including the one that carried Yuri Gagarin on the first human spaceflight in 1961. During the Second World War the city, briefly renamed Kuibyshev and designated a backup capital, had one of the deepest bunkers in the country built in secret for Stalin far beneath its streets, a shelter he in fact never once used.|La fábrica Progress de aquí ha ensamblado la gran mayoría de los cohetes Soyuz jamás lanzados, incluido el que llevó a Yuri Gagarin en el primer vuelo espacial tripulado en 1961.|L'usine Progress d'ici a assemblé la grande majorité des fusées Soyouz jamais lancées, y compris celle qui emporta Iouri Gagarine lors du premier vol spatial habité en 1961.|ここプログレス工場は、1961年の人類初の有人宇宙飛行でユーリイ・ガガーリンを運んだ機体を含め、これまで打ち上げられたソユーズロケットの大多数を組み立ててきた。第二次世界大戦中、一時期クイビシェフと改称され予備の首都に指定されたこの町では、街路のはるか地下にスターリンのための国内でも指折り深い防空壕が秘密裏に建設されたが、彼自身は一度もそこを使うことがなかった。",
    [
      prop(
        "A gift shop at the rocket-factory museum|Una tienda del museo de la fábrica de cohetes|Une boutique du musée de l'usine de fusées|ロケット工場博物館の売店",
        1250, 355,
      ),
      prop(
        "A beer garden on the Volga embankment|Un jardín de cerveza en el malecón del Volga|Une brasserie en plein air sur les quais de la Volga|ヴォルガ河畔のビアガーデン",
        1000, 285,
      ),
    ],
  ),
  saratov: city(
    "Saratov|Sarátov|Saratov|サラトフ",
    46.03, 51.53, "vlg", "river", "river", "l",
    "The watermelon fields where Gagarin landed|Los melonares donde aterrizó Gagarin|Les champs de pastèques où Gagarine atterrit|ガガーリンが降り立ったスイカ畑",
    "The sandy soil along this stretch of the Volga has long grown some of the country's sweetest watermelons, celebrated every autumn with a festival built entirely around the fruit. On 12 April 1961, Yuri Gagarin's descent capsule parachuted down into a field near here after his first orbit of the Earth, and the farmer and her granddaughter who found him are said to have backed away warily until he explained, in Russian, that he was one of their own.|El suelo arenoso de este tramo del Volga ha cultivado durante mucho tiempo algunas de las sandías más dulces del país, celebradas cada otoño con un festival dedicado por completo a la fruta.|Le sol sablonneux de ce tronçon de la Volga cultive depuis longtemps certaines des pastèques les plus sucrées du pays, célébrées chaque automne par un festival entièrement consacré au fruit.|ヴォルガ川沿いのこの一帯の砂質の土は、昔から国内でも指折り甘いスイカを育て、毎秋この果物だけを祝う祭りが開かれる。1961年4月12日、ユーリイ・ガガーリンの帰還カプセルは地球を一周したのちこの近くの畑にパラシュートで降り立ち、彼を見つけた農婦とその孫娘は、彼がロシア語で仲間だと説明するまで警戒して後ずさりしたと伝わる。",
    [
      prop(
        "A watermelon-festival fruit stand|Un puesto de frutas del festival de la sandía|Un étal de fruits du festival de la pastèque|スイカ祭りの果物売り場",
        750, 215,
      ),
      prop(
        "A landing-site memorial gift shop|Una tienda de recuerdos del sitio de aterrizaje|Une boutique de souvenirs du site d'atterrissage|着陸地点記念碑の売店",
        800, 230,
      ),
    ],
  ),
  chelyabinsk: city(
    "Chelyabinsk|Cheliábinsk|Tcheliabinsk|チェリャビンスク",
    61.4, 55.16, "vlg", "industry", "industrial", "r",
    "The city a meteor lit up in broad daylight|La ciudad que un meteorito iluminó a plena luz del día|La ville qu'un météore illumina en plein jour|流星が真昼に照らした町",
    "On the morning of 15 February 2013, a meteor roughly eighteen metres across entered the atmosphere and exploded above the city with a flash brighter than the sun, an event caught on camera from countless angles thanks to the dashboard cameras so many Russian drivers carry for insurance disputes. The shockwave shattered windows across the city and injured over a thousand people, almost entirely from flying glass rather than the meteor itself.|En la mañana del 15 de febrero de 2013, un meteorito de unos dieciocho metros de diámetro entró en la atmósfera y explotó sobre la ciudad con un destello más brillante que el sol.|Le matin du 15 février 2013, un météore d'environ dix-huit mètres de diamètre entra dans l'atmosphère et explosa au-dessus de la ville dans un éclair plus vif que le soleil.|2013年2月15日の朝、直径およそ18メートルの隕石が大気圏に突入し、太陽よりも明るい閃光とともに町の上空で爆発した。この出来事は、多くのロシアの運転手が保険をめぐる争いに備えて取り付けているドライブレコーダーのおかげで、無数の角度から撮影されることになった。衝撃波は町じゅうの窓を割り、千人を超える負傷者を出したが、そのほとんどは隕石そのものではなく飛び散ったガラス片によるものだった。",
    [
      prop(
        "A meteorite-fragment souvenir shop|Una tienda de recuerdos con fragmentos de meteorito|Une boutique de souvenirs en fragments de météorite|隕石の破片を売る土産物店",
        900, 260,
      ),
      prop(
        "A tank-factory museum gift shop|Una tienda del museo de la fábrica de tanques|Une boutique du musée de l'usine de chars|戦車工場博物館の売店",
        950, 270,
      ),
    ],
  ),

  // ---- sib シベリア ----
  tyumen: city(
    "Tyumen|Tiumén|Tioumen|チュメニ",
    65.53, 57.15, "sib", "craft", "oil", "l",
    "Siberia's oldest Russian town, now built on oil|El pueblo ruso más antiguo de Siberia, hoy edificado sobre petróleo|La plus ancienne ville russe de Sibérie, aujourd'hui bâtie sur le pétrole|石油の上に築かれたシベリア最古のロシア人の町",
    "Founded in 1586, Tyumen is the oldest Russian settlement in Siberia, built not long after Cossack forces first pushed east across the Urals. The vast oil and gas fields discovered further north from the 1960s onward turned this old trading post into the administrative and logistics hub for a resource province that now supplies a large share of the country's energy exports.|Fundada en 1586, Tiumén es el asentamiento ruso más antiguo de Siberia, construido poco después de que las fuerzas cosacas cruzaran por primera vez los Urales hacia el este.|Fondée en 1586, Tioumen est la plus ancienne implantation russe de Sibérie, bâtie peu après que les cosaques eurent pour la première fois franchi l'Oural vers l'est.|1586年に興ったチュメニは、コサックの軍勢が初めてウラル山脈を越えて東へ進んだ直後に築かれた、シベリアで最も古いロシア人の入植地である。1960年代以降にさらに北方で発見された広大な油田・ガス田は、この古い交易拠点を、いまや国のエネルギー輸出の大きな割合を支える資源地帯の管理・物流の中心地に変えた。",
    [
      prop(
        "A wooden-lace craft shop|Una tienda de artesanía de encaje de madera|Une boutique d'artisanat en dentelle de bois|木彫りレース細工の工芸品店",
        850, 245,
      ),
      prop(
        "An oil-museum gift shop|Una tienda del museo del petróleo|Une boutique du musée du pétrole|石油博物館の売店",
        1100, 315,
      ),
    ],
  ),
  omsk: city(
    "Omsk|Omsk|Omsk|オムスク",
    73.37, 54.99, "sib", "taiga", "taiga", "r",
    "The prison town Dostoevsky wrote into a novel|El pueblo-prisión que Dostoyevski convirtió en novela|La ville-bagne que Dostoïevski transforma en roman|ドストエフスキーが小説に描いた流刑の町",
    "Fyodor Dostoevsky spent four years in a labour-camp prison here in the 1850s after being convicted for his part in a radical discussion circle, an experience he turned into the semi-autobiographical novel \"The House of the Dead.\" The city sits where the Om River meets the Irtysh, and today the wooden guard tower from that old prison compound is preserved as a small museum.|Fiódor Dostoyevski pasó cuatro años en una prisión de trabajos forzados aquí en la década de 1850, tras ser condenado por su participación en un círculo de debate radical.|Fiodor Dostoïevski passa quatre ans dans un bagne ici dans les années 1850, après avoir été condamné pour sa participation à un cercle de discussion radical.|フョードル・ドストエフスキーは1850年代、急進的な討論サークルに関わった罪で有罪となり、この地の徒刑監獄で四年を過ごした。その経験は半ば自伝的な小説『死の家の記録』に描かれている。町はオム川がイルティシ川に合流する地点にあり、当時の監獄の木造の見張り台はいまも小さな博物館として保存されている。",
    [
      prop(
        "A gift shop at the old prison museum|Una tienda del museo de la antigua prisión|Une boutique du musée de l'ancien bagne|旧監獄博物館の売店",
        800, 230,
      ),
      prop(
        "A riverside café at the Om–Irtysh meeting|Un café junto a la confluencia del Om y el Irtish|Un café au confluent de l'Om et de l'Irtych|オム・イルティシ合流点のカフェ",
        750, 215,
      ),
    ],
  ),
  novosibirsk: city(
    "Novosibirsk|Novosibirsk|Novossibirsk|ノヴォシビルスク",
    82.93, 55.03, "sib", "science", "taiga", "l",
    "A railway bridge town that outgrew every older city near it|Un pueblo del puente ferroviario que superó a toda ciudad vecina más antigua|Une ville de pont ferroviaire qui dépassa toute ville voisine plus ancienne|近隣のどの古い町よりも大きく育った鉄橋の町",
    "Founded only in 1893 as a construction camp for the Trans-Siberian Railway's bridge over the Ob River, Novosibirsk grew faster than any other city in Siberia and is now the largest, having overtaken towns many centuries older. In the 1950s the state built Akademgorodok, a purpose-planned \"science town\" in the forest just outside the city, clustering dozens of research institutes together to concentrate the country's scientific talent in one place.|Fundada apenas en 1893 como campamento de construcción para el puente del Ferrocarril Transiberiano sobre el río Obi, Novosibirsk creció más rápido que cualquier otra ciudad de Siberia.|Fondée seulement en 1893 comme camp de construction pour le pont du Transsibérien sur l'Ob, Novossibirsk a grandi plus vite que toute autre ville de Sibérie.|1893年、シベリア鉄道のオビ川橋梁の建設拠点としてようやく興ったノヴォシビルスクは、シベリアのどの町よりも速く育ち、何世紀も古い町々を追い越していまや最大の都市になっている。1950年代、国は町のすぐ外の森に「科学の町」アカデムゴロドクを計画的に建設し、何十もの研究機関を一か所に集めて国の科学の才を集中させた。",
    [
      prop(
        "A bookshop near the opera house|Una librería cerca del teatro de la ópera|Une librairie près de l'opéra|オペラ劇場そばの書店",
        1200, 340,
      ),
      prop(
        "A café in the Akademgorodok forest campus|Un café en el campus forestal de Akademgorodok|Un café sur le campus forestier d'Akademgorodok|アカデムゴロドクの森のキャンパスカフェ",
        1000, 285,
      ),
    ],
  ),
  tomsk: city(
    "Tomsk|Tomsk|Tomsk|トムスク",
    84.97, 56.5, "sib", "craft", "taiga", "r",
    "The university town the railway builders bypassed|El pueblo universitario que los constructores del ferrocarril evitaron|La ville universitaire que les bâtisseurs du chemin de fer évitèrent|鉄道の建設者が迂回した大学町",
    "Home to the first university founded in Siberia, in 1878, Tomsk was long the region's leading centre of learning and trade. When Trans-Siberian Railway planners chose a more direct route through what would become Novosibirsk instead, sparing Tomsk an expensive detour, the decision arguably cost the older city its lead, while leaving it with some of the finest ornately carved wooden houses anywhere in the country.|Sede de la primera universidad fundada en Siberia, en 1878, Tomsk fue durante mucho tiempo el principal centro de enseñanza y comercio de la región.|Abritant la première université fondée en Sibérie, en 1878, Tomsk fut longtemps le principal centre d'enseignement et de commerce de la région.|1878年にシベリアで最初の大学が置かれたトムスクは、長らくこの地方随一の学問と交易の中心地だった。シベリア鉄道の計画者が、のちのノヴォシビルスクとなる場所を通るより直線的な経路を選び、トムスクを高くつく迂回から外したとき、その決定はある意味でこの古い町から主導権を奪う結果になったが、そのぶん国内でも指折り精緻な透かし彫りの木造家屋の町並みが残ることになった。",
    [
      prop(
        "A carved-woodwork craft shop|Una tienda de artesanía de madera tallada|Une boutique d'artisanat en bois sculpté|透かし彫り木工の工芸品店",
        900, 260,
      ),
      prop(
        "A student café near the university|Un café de estudiantes cerca de la universidad|Un café étudiant près de l'université|大学そばの学生カフェ",
        750, 215,
      ),
    ],
  ),
  barnaul: city(
    "Barnaul|Barnaúl|Barnaoul|バルナウル",
    83.75, 53.35, "sib", "taiga", "taiga", "l",
    "A silver-mining town at the gate to the Altai|Un pueblo minero de plata a la puerta del Altái|Une ville minière d'argent à la porte de l'Altaï|アルタイへの門となった銀鉱の町",
    "Founded in 1730 around silver-smelting works built by the industrialist Demidov family, Barnaul grew rich enough on the metal trade to be nicknamed \"the little Saint Petersburg\" for its planned, orderly streets. Today the city serves mainly as the gateway south to the Altai Mountains, a region of turquoise rivers and remote peaks that draws hikers from across the country.|Fundada en 1730 en torno a fundiciones de plata construidas por la familia de industriales Demídov, Barnaúl se enriqueció tanto con el comercio del metal que fue apodada «la pequeña San Petersburgo» por sus calles planificadas y ordenadas.|Fondée en 1730 autour de fonderies d'argent bâties par la famille d'industriels Demidov, Barnaoul s'enrichit tant grâce au commerce du métal qu'on la surnomma « le petit Saint-Pétersbourg » pour ses rues planifiées et ordonnées.|1730年、実業家デミドフ一族が築いた銀の精錬所を中心に興ったバルナウルは、金属交易で豊かになり、計画的で整然とした街並みから「小さなサンクトペテルブルク」と呼ばれた。いまはこの町は主に南方のアルタイ山脈への玄関口を担い、トルコ石色の川と人里離れた峰々が国じゅうから登山客を集めている。",
    [
      prop(
        "A silverwork jewellery stall|Un puesto de joyería de plata|Un stand de bijouterie en argent|銀細工の宝飾品店",
        850, 245,
      ),
      prop(
        "A trekking-gear shop for the Altai|Una tienda de equipo de senderismo para el Altái|Une boutique d'équipement de randonnée pour l'Altaï|アルタイ登山用品店",
        800, 230,
      ),
    ],
  ),
  kemerovo: city(
    "Kemerovo|Kémerovo|Kemerovo|ケメロヴォ",
    86.09, 55.35, "sib", "industry", "industrial", "r",
    "The coal basin that fuelled an industrial region|La cuenca carbonífera que alimentó una región industrial|Le bassin houiller qui alimenta une région industrielle|工業地帯を支えた石炭盆地",
    "Kemerovo sits at the heart of the Kuznetsk Basin, known locally simply as the Kuzbass, one of the largest coal basins in the world by both reserves and output. Mining began here in earnest in the 1920s and 1930s, and the coal dug from Kuzbass seams still supplies power stations and steel mills across a wide stretch of Siberia.|Kémerovo se encuentra en el corazón de la cuenca de Kuznetsk, conocida localmente simplemente como Kuzbás, una de las mayores cuencas carboníferas del mundo tanto en reservas como en producción.|Kemerovo se trouve au cœur du bassin de Kouznetsk, connu localement simplement sous le nom de Kouzbass, l'un des plus grands bassins houillers au monde tant par ses réserves que par sa production.|ケメロヴォは、地元でクズバスと簡潔に呼ばれるクズネツク炭田の中心にあり、埋蔵量・産出量ともに世界屈指の炭田の一つである。本格的な採掘は1920年代から30年代に始まり、クズバスの炭層から掘り出される石炭はいまもシベリアの広い範囲の発電所と製鉄所を支えている。",
    [
      prop(
        "A miners' supply shop|Una tienda de suministros para mineros|Une boutique de fournitures pour mineurs|炭鉱夫用品店",
        700, 200,
      ),
      prop(
        "A café at the regional history museum|Un café en el museo de historia regional|Un café au musée d'histoire régionale|郷土博物館のカフェ",
        210, 60,
      ),
    ],
  ),
  krasnoyarsk: city(
    "Krasnoyarsk|Krasnoyarsk|Krasnoïarsk|クラスノヤルスク",
    92.87, 56.02, "sib", "taiga", "taiga", "b",
    "Granite pillars that soloists climb without ropes|Pilares de granito que los escaladores suben sin cuerdas|Des piliers de granit que des grimpeurs gravissent sans cordes|命綱なしで登られてきた花崗岩の柱",
    "The Stolby Nature Reserve just outside the city holds dozens of granite pillars rising straight out of the taiga, some over a hundred metres tall, and generations of local free climbers known as \"stolbisty\" have made a point of scaling them without ropes, a tradition that predates modern free-solo climbing as a recognised sport by decades. The city itself sits on the Yenisei River, wide and powerful enough here to remain partly unfrozen even through the coldest winters.|La reserva natural de Stolbi, justo a las afueras de la ciudad, alberga docenas de pilares de granito que se alzan directamente de la taiga, algunos de más de cien metros de altura.|La réserve naturelle des Stolby, juste à la périphérie de la ville, abrite des dizaines de piliers de granit surgissant directement de la taïga, certains dépassant cent mètres de haut.|町のすぐ外にあるストルブイ自然保護区には、タイガから直接そびえ立つ花崗岩の柱が何十本もあり、高さ百メートルを超えるものもある。「ストルビスティ」と呼ばれる地元のフリークライマーたちは何世代にもわたって命綱なしでこれらを登ることにこだわってきた。この伝統は、フリーソロ・クライミングが競技として認められるより何十年も前から続いている。町自体はエニセイ川沿いにあり、この川はここで最も厳しい冬でも一部が凍らずに残るほど広く力強い。",
    [
      prop(
        "A climbing-gear shop by the reserve|Una tienda de equipo de escalada junto a la reserva|Une boutique de matériel d'escalade près de la réserve|保護区そばの登山用具店",
        900, 260,
      ),
      prop(
        "A riverside café on the Yenisei|Un café junto al río Yeniséi|Un café au bord de l'Ienisseï|エニセイ河畔のカフェ",
        850, 245,
      ),
    ],
  ),
  irkutsk: city(
    "Irkutsk|Irkutsk|Irkoutsk|イルクーツク",
    104.3, 52.3, "sib", "lake", "baikal", "l",
    "The \"Paris of Siberia\" beside Lake Baikal|El «París de Siberia» junto al lago Baikal|Le « Paris de la Sibérie » au bord du lac Baïkal|バイカル湖畔の「シベリアのパリ」",
    "Fur-trading wealth in the 18th and 19th centuries filled Irkutsk with grand stone merchant houses, and the exiled aristocrats of the failed Decembrist uprising of 1825 brought a taste for European culture that earned the city the nickname \"Paris of Siberia.\" Today it serves as the main gateway to Lake Baikal, which holds roughly a fifth of all the fresh liquid water on the planet's surface.|La riqueza del comercio de pieles en los siglos XVIII y XIX llenó Irkutsk de grandes casas de mercaderes de piedra, y los aristócratas desterrados del fallido levantamiento decembrista de 1825 trajeron un gusto por la cultura europea.|La richesse du commerce des fourrures aux XVIIIe et XIXe siècles couvrit Irkoutsk de grandes maisons de marchands en pierre, et les aristocrates exilés du soulèvement décembriste manqué de 1825 y apportèrent un goût pour la culture européenne.|18〜19世紀の毛皮交易の富はイルクーツクを商人の壮麗な石造家屋で埋め尽くし、1825年の失敗に終わったデカブリストの乱で流刑となった貴族たちがヨーロッパ文化への嗜好を持ち込んだことから、この町は「シベリアのパリ」と呼ばれるようになった。いまはバイカル湖への主要な玄関口を担っており、この湖は地球の地表にある液体の淡水のおよそ五分の一を蓄えている。",
    [
      prop(
        "A fur-trade heritage gift shop|Una tienda de recuerdos del comercio de pieles|Une boutique de souvenirs du commerce des fourrures|毛皮交易史の土産物店",
        1050, 300,
      ),
      prop(
        "A ferry-ticket kiosk for Lake Baikal|Un quiosco de boletos de ferri al lago Baikal|Un kiosque de billets de ferry pour le lac Baïkal|バイカル湖行きフェリー切符売り場",
        900, 260,
      ),
    ],
  ),
  ulanude: city(
    "Ulan-Ude|Ulán-Udé|Oulan-Oude|ウランウデ",
    107.6, 51.83, "sib", "buddha", "baikal", "r",
    "The world's largest bronze head, and Russia's Buddhist heart|La mayor cabeza de bronce del mundo, y el corazón budista de Rusia|La plus grande tête de bronze du monde, et le cœur bouddhiste de la Russie|世界最大の青銅の頭部と、ロシアの仏教の中心",
    "The main square of this Buryatia capital holds the largest sculpture of Lenin's head in the world, a disembodied bronze bust roughly seven metres tall that has stood since 1970. Not far outside the city, the Ivolginsky Datsan monastery serves as the historic centre of Buddhism in Russia, a faith long practised by the Buryat people who make up a large share of the region's population.|La plaza principal de esta capital de Buriatia alberga la mayor escultura de la cabeza de Lenin del mundo, un busto de bronce sin cuerpo de unos siete metros de altura que se alza desde 1970.|La place principale de cette capitale de la Bouriatie abrite la plus grande sculpture de la tête de Lénine au monde, un buste de bronze sans corps d'environ sept mètres de haut, dressé depuis 1970.|ブリヤート共和国の首都であるこの町の中央広場には、世界最大のレーニンの頭部像が立つ。1970年から立ち続ける、胴体のない高さおよそ七メートルの青銅の胸像である。町から少し離れたイヴォルギンスキー・ダツァンは、この地方の人口の大きな割合を占めるブリヤート人が古くから信仰してきた、ロシアにおける仏教の歴史的中心地である。",
    [
      prop(
        "A gift shop by the Lenin head monument|Una tienda de recuerdos junto al monumento a la cabeza de Lenin|Une boutique de souvenirs près du monument de la tête de Lénine|レーニン頭部像の土産物店",
        800, 230,
      ),
      prop(
        "A Buryat craft shop near the monastery|Una tienda de artesanía buriata cerca del monasterio|Une boutique d'artisanat bouriate près du monastère|寺院そばのブリヤート工芸品店",
        260, 74,
      ),
    ],
  ),
  norilsk: city(
    "Norilsk|Norilsk|Norilsk|ノリリスク",
    88.2, 69.35, "sib", "permafrost", "permafrost", "l",
    "A metal city with no road out to the rest of the country|Una ciudad metalúrgica sin carretera hacia el resto del país|Une ville métallurgique sans route vers le reste du pays|国内のどこにも道でつながらない金属の町",
    "Built from 1935 onward largely by Norillag prison-camp labour to work one of the world's richest nickel and palladium deposits, Norilsk still has no permanent road link to the rest of the country's road network; supplies travel instead by icebreaker-escorted river barge down the Yenisei or by air. Its winter polar night runs for roughly 45 unbroken days, and the whole city stands on stilted foundations driven into the permafrost so that the buildings' own heat does not thaw the ground underneath them.|Construida desde 1935 en gran parte con mano de obra del campo de prisioneros Norillag para explotar uno de los mayores yacimientos de níquel y paladio del mundo, Norilsk sigue sin tener enlace permanente por carretera con el resto de la red vial del país; los suministros viajan en barcaza fluvial escoltada por rompehielos por el Yeniséi o en avión.|Construite à partir de 1935 en grande partie par les détenus du camp de Norillag pour exploiter l'un des plus riches gisements de nickel et de palladium au monde, Norilsk n'a toujours aucune liaison routière permanente avec le reste du réseau du pays ; les approvisionnements voyagent par barge fluviale escortée par des brise-glace sur l'Ienisseï ou par avion.|1935年以降、世界有数のニッケル・パラジウム鉱床を採掘するため主に強制収容所ノリラグの囚人労働によって築かれたノリリスクは、いまも国内の道路網とつながる恒久的な道を持たず、物資は砕氷船に護られたエニセイ川のはしけか航空便で運ばれる。冬の極夜はおよそ45日途切れずに続き、町全体は建物自身の熱で地面が融けて傾かないよう、永久凍土に打ち込んだ杭の上に建てられている。",
    [
      prop(
        "A fur-hat shop by the mining institute|Una tienda de gorros de piel junto al instituto minero|Une boutique de chapkas près de l'institut minier|鉱業大学そばの毛皮帽子店",
        700, 200,
      ),
      prop(
        "A café inside the enclosed shopping arcade|Un café dentro de la galería comercial cubierta|Un café dans la galerie marchande couverte|屋根付き商店街のカフェ",
        650, 185,
      ),
    ],
  ),

  // ---- dv 極東(シベリア鉄道の終点からサハリンへ) ----
  khabarovsk: city(
    "Khabarovsk|Jabárovsk|Khabarovsk|ハバロフスク",
    135.08, 48.48, "dv", "river", "river", "l",
    "The Far East's capital at the Amur and Ussuri's meeting point|La capital del Lejano Oriente en la confluencia del Amur y el Ussuri|La capitale de l'Extrême-Orient au confluent de l'Amour et de l'Oussouri|アムール川とウスリー川が出会う極東の首都",
    "Founded in 1858 as a military post named for the 17th-century explorer Yerofei Khabarov, the city's road-and-rail bridge across the Amur, completed in 1916, was once considered such an engineering triumph that its image appeared on the 5,000-ruble banknote. The original bridge trusses, replaced during a later widening, now stand on permanent display as an open-air exhibit in a riverside park.|Fundada en 1858 como puesto militar en honor al explorador del siglo XVII Yerofei Jabárov, el puente ferroviario y de carretera de la ciudad sobre el Amur, terminado en 1916, se consideró en su día un triunfo de ingeniería tan grande que su imagen apareció en el billete de 5000 rublos.|Fondée en 1858 comme poste militaire nommé d'après l'explorateur du XVIIe siècle Erofeï Khabarov, le pont routier et ferroviaire de la ville sur l'Amour, achevé en 1916, fut en son temps considéré comme un tel exploit d'ingénierie que son image figura sur le billet de 5 000 roubles.|1858年、17世紀の探検家イェロフェイ・ハバロフにちなむ軍事拠点として興ったこの町のアムール川に架かる道路・鉄道併用橋は、1916年の完成当時あまりに大きな工学の偉業とされ、その姿は5000ルーブル紙幣にも描かれた。のちの拡幅で撤去された元のトラス橋桁は、いまも川沿いの公園に野外展示として恒久的に置かれている。",
    [
      prop(
        "A fish market stall by the Amur embankment|Un puesto de pescado en el malecón del Amur|Un stand de poissonnier sur les quais de l'Amour|アムール河畔市場の魚売り場",
        1050, 300,
      ),
      prop(
        "A café at the top of Muravyov-Amursky Hill|Un café en lo alto de la colina Muravyov-Amursky|Un café au sommet de la colline Mouravev-Amoursky|ムラヴィヨフ=アムールスキー丘の上のカフェ",
        1150, 330,
      ),
    ],
  ),
  vladivostok: city(
    "Vladivostok|Vladivostok|Vladivostok|ウラジオストク",
    131.9, 43.12, "dv", "port", "port", "b",
    "The Pacific fleet's home, 9,288 kilometres from Moscow|La base de la flota del Pacífico, a 9288 kilómetros de Moscú|La base de la flotte du Pacifique, à 9 288 kilomètres de Moscou|モスクワから9288キロ、太平洋艦隊の母港",
    "Founded as a military post in 1860 with a name meaning roughly \"ruler of the East,\" Vladivostok later became the eastern terminus of the Trans-Siberian Railway, marked by a station-square obelisk reading \"9,288,\" the line's full distance back to Moscow. As the closed home base of the Soviet Pacific Fleet, the city was shut to foreigners and to most Soviet citizens without a special permit until 1992.|Fundada como puesto militar en 1860 con un nombre que significa aproximadamente «señora del Oriente», Vladivostok se convirtió después en la terminal oriental del Ferrocarril Transiberiano, señalada por un obelisco en la plaza de la estación con la cifra «9288», la distancia total de la línea hasta Moscú.|Fondée comme poste militaire en 1860 sous un nom signifiant à peu près « maîtresse de l'Orient », Vladivostok devint plus tard le terminus oriental du Transsibérien, marqué par un obélisque de la place de la gare portant le chiffre « 9 288 », la distance totale de la ligne jusqu'à Moscou.|1860年、おおよそ「東方を制する町」を意味する名で軍事拠点として興ったウラジオストクは、のちにシベリア鉄道の東の終着点となり、駅前広場の標柱には路線の全長を示す「9288」の数字が刻まれている。ソ連太平洋艦隊の本拠地として閉ざされた町だったため、外国人はもとより特別な許可のないソ連市民でさえ1992年まで立ち入ることができなかった。",
    [
      prop(
        "A ship-chandler's shop near the naval harbour|Una tienda de pertrechos navales junto al puerto militar|Une boutique d'accastillage près du port militaire|軍港そばの船具店",
        1400, 400,
      ),
      prop(
        "A café at the Trans-Siberian terminus platform|Un café en el andén terminal del Transiberiano|Un café sur le quai du terminus transsibérien|シベリア鉄道終着ホームのカフェ",
        1500, 425,
      ),
    ],
  ),
  blagoveshchensk: city(
    "Blagoveshchensk|Blagovéshchensk|Blagovechtchensk|ブラゴヴェシチェンスク",
    127.5, 50.27, "dv", "river", "river", "l",
    "A riverside city that watches a Chinese city across the water|Una ciudad fluvial que mira a una ciudad china al otro lado del agua|Une ville fluviale qui regarde une ville chinoise de l'autre côté de l'eau|川向こうの中国の町を見つめる川辺の町",
    "Named after a church of the Annunciation built here when the outpost was founded in 1856, Blagoveshchensk sits directly across the Amur from the Chinese city of Heihe, close enough that each embankment's skyline is clearly visible, lit up, from the other's promenade after dark. The two cities have run various visa-supported ferry and cable-car crossings over the years for day trips back and forth.|Llamada así por una iglesia de la Anunciación construida cuando el puesto se fundó en 1856, Blagovéshchensk se halla justo enfrente del Amur de la ciudad china de Heihe, tan cerca que el perfil urbano de cada malecón se ve con claridad, iluminado, desde el paseo del otro tras la puesta de sol.|Nommée d'après une église de l'Annonciation bâtie ici lors de la fondation du poste en 1856, Blagovechtchensk se trouve juste en face, de l'autre côté de l'Amour, de la ville chinoise de Heihe, assez près pour que la silhouette illuminée de chaque quai soit clairement visible depuis la promenade de l'autre après la tombée du jour.|1856年にこの拠点が築かれた際に建てられた聖母就報教会にちなんで名づけられたブラゴヴェシチェンスクは、アムール川を挟んで中国の黒河市と向かい合い、日が暮れれば互いの河岸の明かりがはっきり見えるほど近い。両市は年によって、行き来する日帰り旅行者向けにビザ付きのフェリーやロープウェイの渡航路を運航してきた。",
    [
      prop(
        "A riverside café facing the Chinese skyline|Un café junto al río frente al perfil urbano chino|Un café au bord du fleuve face à la skyline chinoise|対岸の中国の町並みを望む河畔カフェ",
        850, 245,
      ),
      prop(
        "A border-market souvenir stall|Un puesto de recuerdos del mercado fronterizo|Un étal de souvenirs du marché frontalier|国境市場の土産物店",
        800, 230,
      ),
    ],
  ),
  yakutsk: city(
    "Yakutsk|Yakutsk|Iakoutsk|ヤクーツク",
    129.7, 62.03, "dv", "permafrost", "permafrost", "r",
    "The coldest city on Earth, built on solid ice year-round|La ciudad más fría de la Tierra, construida sobre hielo firme todo el año|La ville la plus froide de la Terre, bâtie sur de la glace solide toute l'année|一年じゅう凍った大地の上に建つ、地球でいちばん寒い都市",
    "January temperatures here regularly fall below minus 40 degrees Celsius, which usually earns Yakutsk the title of coldest city of its size anywhere in the world, while summer can still climb past plus 30, one of the largest annual temperature swings recorded in any inhabited place. The permafrost beneath preserves woolly mammoth remains so well that whole tusks, and occasionally soft tissue, are still recovered from the thawing riverbanks each year.|Las temperaturas de enero aquí bajan regularmente de los -40 °C, lo que suele valerle a Yakutsk el título de ciudad fría de su tamaño más extrema del mundo, mientras que el verano aún puede superar los +30 °C.|Les températures de janvier y descendent régulièrement sous les -40 °C, ce qui vaut habituellement à Iakoutsk le titre de ville la plus froide de sa taille au monde, tandis que l'été peut encore dépasser les +30 °C.|1月の気温はここで日常的に氷点下40度を下回り、そのためヤクーツクは世界でも同規模の都市としてはもっとも寒いとされることが多い。一方で夏には氷点下ではなく摂氏30度を超えることもあり、居住地としては指折りの年較差の大きさである。地下の永久凍土はケナガマンモスの遺骸をよく保存しており、融けかけた川岸から丸ごとの牙や、ときには軟組織までいまも毎年見つかっている。",
    [
      prop(
        "A mammoth-tusk carving shop|Una tienda de tallas en colmillo de mamut|Une boutique de sculptures en ivoire de mammouth|マンモスの牙彫刻の店",
        1000, 285,
      ),
      prop(
        "A fur-market stall in the covered arcade|Un puesto de pieles en la galería cubierta|Un stand de fourrures dans la galerie couverte|屋根付き市場の毛皮売り場",
        280, 80,
      ),
    ],
  ),
  magadan: city(
    "Magadan|Magadán|Magadan|マガダン",
    150.8, 59.57, "dv", "port", "port", "r",
    "The sea gate to the Kolyma goldfields|La puerta marítima a los yacimientos de oro de Kolimá|La porte maritime des gisements d'or de la Kolyma|コルィマ金鉱地帯への海の玄関口",
    "Magadan was founded in 1929 as the administrative base for the Dalstroy trust that ran the Kolyma region's gold mines, and its port became the entry point through which hundreds of thousands of Gulag prisoners passed on their way inland to the camps. A monument called The Mask of Sorrow, overlooking the bay since 1996, now commemorates them.|Magadán se fundó en 1929 como base administrativa del consorcio Dalstroi, que dirigía las minas de oro de la región de Kolimá, y su puerto se convirtió en el punto de entrada por el que pasaron cientos de miles de presos del Gulag camino de los campos tierra adentro.|Magadan fut fondée en 1929 comme base administrative du trust Dalstroï, qui dirigeait les mines d'or de la région de la Kolyma, et son port devint le point d'entrée par lequel des centaines de milliers de prisonniers du Goulag transitèrent vers les camps de l'intérieur.|マガダンは1929年、コルィマ地方の金鉱を管理する国営トラスト、ダリストロイの拠点として興り、その港は何十万人ものグラーグ(強制収容所)の囚人たちが内陸の収容所へ向かう際の入口となった。1996年から湾を見下ろす「悲しみの仮面」像が、いまも彼らを追悼している。",
    [
      prop(
        "A gold-nugget jewellery shop|Una joyería de pepitas de oro|Une bijouterie en pépites d'or|砂金の宝飾品店",
        800, 230,
      ),
      prop(
        "A café by the harbour ferry terminal|Un café junto a la terminal de ferris del puerto|Un café près du terminal de ferries du port|港のフェリーターミナルそばのカフェ",
        750, 215,
      ),
    ],
  ),
  petropavlovsk: city(
    "Petropavlovsk-Kamchatsky|Petropávlovsk-Kamchatski|Petropavlovsk-Kamtchatski|ペトロパブロフスク・カムチャツキー",
    158.65, 53.03, "dv", "volcano", "volcano", "b",
    "A city ringed by volcanoes, reachable only by sea or air|Una ciudad rodeada de volcanes, solo accesible por mar o aire|Une ville cernée de volcans, accessible seulement par mer ou par air|海か空からしか行けない、火山に囲まれた町",
    "Named after Vitus Bering's two ships, Sv. Pyotr and Sv. Pavel, the city sits below the active volcanoes Koryaksky and Avachinsky, whose plumes of steam are visible from ordinary city streets on a clear day. The whole Kamchatka Peninsula still has no road or rail connection to the rest of the country's network, so virtually every visitor and most freight arrive by ship or by plane.|Bautizada en honor a los dos barcos de Vitus Bering, el San Pedro y el San Pablo, la ciudad se asienta bajo los volcanes activos Koryaksky y Avachinsky, cuyas columnas de vapor se ven desde las calles corrientes en un día despejado.|Baptisée d'après les deux navires de Vitus Béring, le Saint-Pierre et le Saint-Paul, la ville se trouve au pied des volcans actifs Koriaksky et Avatchinsky, dont les panaches de vapeur sont visibles depuis les rues ordinaires par temps clair.|ヴィトゥス・ベーリングの二隻の船、聖ピョートル号と聖パーヴェル号にちなんで名づけられたこの町は、活火山コリャークスキーとアヴァチンスキーの麓に位置し、晴れた日にはふつうの通りからその噴煙が見える。カムチャツカ半島全体はいまも国内の道路網・鉄道網とつながっておらず、訪れる者も貨物のほとんども船か飛行機で到着する。",
    [
      prop(
        "A volcano-tour outfitter's shop|Una tienda de equipo para excursiones a volcanes|Une boutique d'équipement pour excursions volcaniques|火山ツアー用品店",
        950, 270,
      ),
      prop(
        "A crab and salmon market stall|Un puesto de cangrejo y salmón|Un étal de crabe et de saumon|カニと鮭の市場露店",
        900, 260,
      ),
    ],
  ),
  yuzhnosakhalinsk: city(
    "Yuzhno-Sakhalinsk|Yuzhno-Sajalinsk|Ioujno-Sakhalinsk|ユジノサハリンスク",
    142.75, 46.96, "dv", "port", "port", "l",
    "A Japanese-built street grid under a Russian name|Una cuadrícula de calles de origen japonés bajo un nombre ruso|Un plan de rues bâti par le Japon sous un nom russe|日本人が敷いた街路の上にロシアの名を持つ町",
    "Founded as Toyohara during Japanese rule of southern Sakhalin, held as the colony of Karafuto from 1905 to 1945, the city still follows its original Japanese-planned grid of streets, and one of the ski jumps built for a Japanese national championship survives on the edge of town. It passed to Soviet control at the end of the Second World War and was renamed Yuzhno-Sakhalinsk in 1946.|Fundada como Toyohara durante el dominio japonés del sur de Sajalín, colonia de Karafuto entre 1905 y 1945, la ciudad aún sigue su cuadrícula de calles trazada originalmente por Japón, y uno de los trampolines de esquí construidos para un campeonato nacional japonés sobrevive en las afueras.|Fondée sous le nom de Toyohara durant la domination japonaise du sud de Sakhaline, colonie de Karafuto de 1905 à 1945, la ville suit encore son plan de rues en damier tracé à l'origine par le Japon, et l'un des tremplins de ski bâtis pour un championnat national japonais subsiste en périphérie.|1905年から1945年まで樺太(からふと)という名の日本領として南サハリンが統治されていた当時、豊原(とよはら)として興ったこの町は、いまも日本が敷いた碁盤目状の街路をそのまま受け継いでおり、日本の全国大会のために建てられたスキージャンプ台の一つが町外れに残っている。第二次世界大戦終結でソ連の支配下に入り、1946年にユジノサハリンスクと改称された。",
    [
      prop(
        "A ski-lodge café at the edge of town|Un café de refugio de esquí en las afueras|Un café de station de ski en périphérie|町外れのスキー宿カフェ",
        850, 245,
      ),
      prop(
        "A seafood stall at the central market|Un puesto de marisco en el mercado central|Un étal de fruits de mer au marché central|中央市場の海産物店",
        800, 230,
      ),
    ],
  ),
  birobidzhan: city(
    "Birobidzhan|Birobidzhán|Birobidjan|ビロビジャン",
    132.92, 48.79, "dv", "river", "river", "r",
    "A Soviet-planned Jewish homeland's bilingual street signs|Las señales bilingües de una patria judía planeada por la URSS|Les panneaux bilingues d'une patrie juive planifiée par l'URSS|ソ連が計画したユダヤ人の祖国に残る二言語の標識",
    "Birobidzhan was designated in 1934 as the centre of the Jewish Autonomous Oblast, a Soviet-era project meant to give Soviet Jews a territorial homeland as an alternative to Zionism, and the train station and main square still carry bilingual Russian-Yiddish signage even though only a small share of today's residents are Jewish. The city's name comes simply from the Bira and Bidzhan rivers that meet just outside it.|Birobidzhán fue designada en 1934 como centro del óblast autónomo judío, un proyecto de la era soviética pensado para dar a los judíos soviéticos una patria territorial como alternativa al sionismo, y la estación de tren y la plaza principal aún llevan señalización bilingüe en ruso y yidis, aunque solo una pequeña parte de los residentes actuales son judíos.|Birobidjan fut désignée en 1934 comme centre de l'oblast autonome juif, un projet de l'ère soviétique destiné à offrir aux Juifs soviétiques une patrie territoriale comme alternative au sionisme, et la gare ainsi que la place principale portent encore une signalétique bilingue russe-yiddish, bien que seule une faible part des habitants actuels soit juive.|ビロビジャンは1934年、シオニズムに代わる領土的な祖国をソ連のユダヤ人に与えるという構想のもとに設けられたユダヤ自治州の中心に指定された。今日の住民のうちユダヤ系はごくわずかだが、駅と中央広場にはいまもロシア語とイディッシュ語の二言語表記の標識が残る。町の名は、その郊外で合流するビラ川とビジャン川にそのまま由来する。",
    [
      prop(
        "A bakery selling traditional Jewish pastries|Una panadería de repostería judía tradicional|Une boulangerie de pâtisseries juives traditionnelles|伝統的なユダヤ菓子のパン屋",
        650, 185,
      ),
      prop(
        "A gift shop at the regional history museum|Una tienda del museo de historia regional|Une boutique du musée d'histoire régionale|郷土博物館の売店",
        180, 52,
      ),
    ],
  ),
};

/**
 * 路線50本。シベリア鉄道の骨格(モスクワ→ニジニノヴゴロド→カザン→
 * エカテリンブルク→オムスク→ノヴォシビルスク→クラスノヤルスク→
 * イルクーツク→ウランウデ→ハバロフスク→ウラジオストク)を軸に、
 * 各地方内の実在の路線を足し、6地方すべてを1つの連結成分にしてある。
 *
 * サハリン(ユジノサハリンスク)へは `"sea"` で結ぶ(ヴァニノ⇔ホルムスクの
 * 鉄道連絡船が実在するが、その港町自体は盤面に無いため、代わりに
 * 沿海地方の中心であるウラジオストクを発着地にした)。カムチャツカ半島は
 * 実際に道路・鉄道が無いため、マガダンとの間も `"sea"` にしてある。
 * ヤクーツクとノリリスクは、いずれも鉄道が本土網まで届いていないため、
 * バイカル・アムール鉄道沿いの都市(イルクーツク)およびエニセイ川の
 * 川港(クラスノヤルスク)からの陸路・水路として通常の路線にした
 * (ロシア国内の他の路線と区別せず描く、盤面の単純化)。
 */
export const RUSSIA_EDGES = [
  // --- tsn 中央 ---
  ["moscow", "yaroslavl"],
  ["moscow", "vladimir"],
  ["vladimir", "suzdal"],
  ["moscow", "tver"],
  ["moscow", "tula"],
  ["moscow", "ryazan"],
  ["moscow", "smolensk"],
  // --- tsn-szp・szp 北西 ---
  ["tver", "spb"],
  ["spb", "novgorod"],
  ["spb", "pskov"],
  ["novgorod", "pskov"],
  ["spb", "petrozavodsk"],
  ["petrozavodsk", "murmansk"],
  ["yaroslavl", "vologda"],
  ["vologda", "arkhangelsk"],
  // --- yug 南部・カフカス ---
  ["rostov", "volgograd"],
  ["rostov", "krasnodar"],
  ["krasnodar", "sochi"],
  ["krasnodar", "stavropol"],
  ["stavropol", "vladikavkaz"],
  ["volgograd", "astrakhan"],
  ["volgograd", "saratov"], // yug-vlg の橋渡し(ヴォルガ川沿い)
  // --- tsn-vlg・vlg ヴォルガ・ウラル(シベリア鉄道の骨格その1) ---
  ["moscow", "nizhny"],
  ["nizhny", "kazan"],
  ["kazan", "yekaterinburg"],
  ["yekaterinburg", "perm"],
  ["yekaterinburg", "chelyabinsk"],
  ["yekaterinburg", "tyumen"], // vlg-sib の橋渡し
  ["kazan", "samara"],
  ["samara", "saratov"],
  ["kazan", "ufa"],
  ["ufa", "chelyabinsk"],
  // --- sib シベリア(シベリア鉄道の骨格その2) ---
  ["tyumen", "omsk"],
  ["omsk", "novosibirsk"],
  ["novosibirsk", "krasnoyarsk"],
  ["krasnoyarsk", "irkutsk"],
  ["irkutsk", "ulanude"],
  ["novosibirsk", "tomsk"],
  ["novosibirsk", "barnaul"],
  ["novosibirsk", "kemerovo"],
  ["barnaul", "kemerovo"],
  ["krasnoyarsk", "norilsk"], // エニセイ川の水路(要約。上の注記を参照)
  // --- sib-dv・dv 極東(シベリア鉄道の骨格その3・BAM・サハリン航路) ---
  ["ulanude", "khabarovsk"],
  ["vladivostok", "khabarovsk"], // 端の入れ替え済み(海128px/49% → 0px)
  ["khabarovsk", "birobidzhan"],
  ["khabarovsk", "blagoveshchensk"],
  ["irkutsk", "yakutsk"], // バイカル・アムール鉄道沿いの陸路(要約)
  ["yakutsk", "magadan"], // コルィマ街道(通称「骨の道」)
  ["magadan", "petropavlovsk", "sea"], // オホーツク海の航路(カムチャツカは陸路・鉄道が無い)
  ["yuzhnosakhalinsk", "vladivostok", "sea"], // サハリンへの航路。端の入れ替え済み(陸287px/88% → 63px)
];
