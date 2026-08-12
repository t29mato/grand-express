/**
 * バリのクイズ(36問)。
 *
 * 難易度は1〜10、基準は他の盤面と同じ(`docs/50-authoring/01-content-guide.md`)。
 *
 * ## 都市カードとの重なりについて
 *
 * 32枚の都市カードがププタン(1906デンパサール・1908クルンクン)、
 * ウブドの地名由来とピタ・マハ、バトゥール山1926年噴火、シンガラジャの
 * 旧州都とゲドン・キルティヤ、ヌサペニダの追放地伝承、クタの1930年代と
 * 2002年爆弾事件、ジンバラン空港、ウルワトゥの断崖と猿、サヌールの
 * ホテルと高さ規制、テガランの棚田とブランコ、チュルックの銀細工、
 * ゴアガジャの鬼の口、ティルタエンプルの962年とスカルノ、ブドゥグルの
 * 5万ルピア紙幣、ムンドゥックのクローブ、バンリの内陸王国とプラ・クヘン、
 * ジャティルウィのUNESCO 2012、ブサキの80村と1963年噴火、
 * アメッドの塩とジュクン、トゥランベンのリバティ号、チャンディダサの
 * 珊瑚採取、パダンバイの潮汐フェリー、ロビナの地名伝承、
 * クブタンブハンの自転車浮彫、スカサダの植物園、ヌサレンボンガンの
 * 海藻養殖、ヌガラのマクプンとロロアンのブギス人、ギリマヌッの
 * フェリーとカンムリシロムク、クサンバの塩、タナロットの岩と海蛇伝承 ——
 * を扱うので、これらは出さない。かわりに宗教・言語・カースト・暦・
 * 芸能・食・地理といった、どの都市カードも扱っていない題材を選んでいる。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数になるよう散らしてある。
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

export const BALI_QUIZ = [
  q(
    1,
    "Which two larger islands does Bali lie between?|¿Entre qué dos islas mayores se encuentra Bali?|Entre quelles deux grandes îles se trouve Bali ?|バリ島はどの二つの島に挟まれているか?",
    ["Java and Lombok|Java y Lombok|Java et Lombok|ジャワ島とロンボク島", "Sumatra and Borneo|Sumatra y Borneo|Sumatra et Bornéo|スマトラ島とボルネオ島", "Sulawesi and Timor|Célebes y Timor|Célèbes et Timor|スラウェシ島とティモール島"],
    0,
    "Java lies just across a narrow strait to the west, and Lombok lies across a second strait to the east — the two crossings bookend the island.|Java está justo al otro lado de un estrecho al oeste, y Lombok al otro lado de un segundo estrecho al este.|Java se trouve juste de l'autre côté d'un détroit à l'ouest, et Lombok de l'autre côté d'un second détroit à l'est.|西にはジャワ島、東にはロンボク島が、それぞれ狭い海峡を挟んで隣り合う。",
  ),
  q(
    1,
    "What is the main religion of most people on Bali?|¿Cuál es la religión principal de la mayoría en Bali?|Quelle est la religion principale de la plupart des habitants de Bali ?|バリ島の住民の多くが信仰する宗教は?",
    ["Islam|Islam|L'islam|イスラム教", "Hinduism|El hinduismo|L'hindouisme|ヒンドゥー教", "Buddhism|El budismo|Le bouddhisme|仏教"],
    1,
    "Around 83–87% of Balinese are Hindu, making the island a distinct exception in the world's most populous Muslim-majority country.|Entre el 83% y el 87% de los balineses son hindúes, una excepción notable en el país de mayoría musulmana más poblado del mundo.|Environ 83 à 87 % des Balinais sont hindous, une exception notable dans le pays à majorité musulmane le plus peuplé du monde.|バリ島民のおよそ83〜87%はヒンドゥー教徒で、世界最大のイスラム教徒人口を持つ国の中でも際立った例外である。",
  ),
  q(
    2,
    "What is Indonesia's official national language?|¿Cuál es la lengua oficial de Indonesia?|Quelle est la langue officielle de l'Indonésie ?|インドネシアの公用語は?",
    ["Balinese|El balinés|Le balinais|バリ語", "Javanese|El javanés|Le javanais|ジャワ語", "Indonesian|El indonesio|L'indonésien|インドネシア語"],
    2,
    "Indonesian is taught in every school and used in government and media nationwide, while Balinese remains the everyday home language for most Balinese Hindus.|El indonesio se enseña en todas las escuelas y se usa en el gobierno y los medios de todo el país, mientras el balinés sigue siendo la lengua cotidiana del hogar.|L'indonésien est enseigné dans toutes les écoles et utilisé par le gouvernement et les médias dans tout le pays, tandis que le balinais reste la langue quotidienne du foyer.|インドネシア語はどの学校でも教えられ、政府やメディアで国じゅう使われるが、バリ語はいまも多くのバリ・ヒンドゥー教徒にとって家庭の日常語である。",
  ),
  q(
    2,
    "Roughly how many islands make up Indonesia in total?|¿Aproximadamente cuántas islas forman Indonesia en total?|Combien d'îles compte approximativement l'Indonésie ?|インドネシアはおよそ何個の島からなるか?",
    ["Over 17,000|Más de 17.000|Plus de 17 000|1万7000以上", "About 300|Unas 300|Environ 300|約300", "Around 1,000|Unas 1.000|Environ 1 000|約1000"],
    0,
    "The country's official count runs to more than 17,000 islands, though only a few thousand are permanently inhabited.|El recuento oficial del país supera las 17.000 islas, aunque solo unos pocos miles están habitadas de forma permanente.|Le décompte officiel du pays dépasse les 17 000 îles, bien que seuls quelques milliers soient habitées en permanence.|公式の数え方では1万7000を超す島があるとされるが、常時人が住むのはそのうち数千にすぎない。",
  ),
  q(
    2,
    "Rather than four seasons, Bali's climate near the equator has mainly two; what are they called?|En vez de cuatro estaciones, el clima de Bali cerca del ecuador tiene sobre todo dos; ¿cómo se llaman?|Plutôt que quatre saisons, le climat de Bali, près de l'équateur, en connaît surtout deux ; comment les appelle-t-on ?|バリは赤道に近く、四季ではなく主に二つの季節がある。それは何と何か?",
    ["Warm and cool|Cálida y fresca|Chaude et fraîche|暑季と涼季", "Wet and dry|Húmeda y seca|Humide et sèche|雨季と乾季", "Monsoon and cyclone|Monzón y ciclón|Mousson et cyclon|モンスーン期と台風期"],
    1,
    "The wet season runs roughly November to March and the dry season April to October, with temperature changing far less through the year than rainfall does.|La estación húmeda va de noviembre a marzo aproximadamente, y la seca de abril a octubre; la temperatura cambia mucho menos en el año que la lluvia.|La saison humide va de novembre à mars environ, et la saison sèche d'avril à octobre ; la température varie bien moins dans l'année que la pluie.|雨季はおよそ11月から3月、乾季は4月から10月にあたる。一年を通じて、気温より雨量のほうがずっと大きく変わる。",
  ),
  q(
    3,
    "Which fruit, common in Bali, is nicknamed \"snake fruit\" for its scaly brown skin?|¿Qué fruta, común en Bali, se apoda «fruta serpiente» por su piel escamosa marrón?|Quel fruit, courant à Bali, est surnommé « fruit-serpent » pour sa peau brune écailleuse ?|茶色い鱗状の皮から「蛇の実」と呼ばれる、バリでよく見る果物は?",
    ["Mangosteen|El mangostán|Le mangoustan|マンゴスチン", "Rambutan|El rambután|Le ramboutan|ランブータン", "Salak|El salak|Le salak|サラッカ"],
    2,
    "Salak is peeled by pulling the skin off in sections, much like shedding a lizard's hide, and its own Bali variety is smaller and sweeter than the kind grown elsewhere in Indonesia.|El salak se pela quitando la piel a secciones, casi como una muda de lagarto, y la variedad propia de Bali es más pequeña y dulce que la de otras zonas de Indonesia.|Le salak se pèle en détachant la peau par sections, presque comme une mue de lézard, et la variété propre à Bali est plus petite et plus sucrée que celle cultivée ailleurs en Indonésie.|サラッカは蜥蜴の皮を剥ぐように区画ごとに皮をむく。バリ産の品種は、インドネシアのほかの土地のものより小ぶりで甘い。",
  ),
  q(
    3,
    "What is Indonesia's national currency?|¿Cuál es la moneda nacional de Indonesia?|Quelle est la monnaie nationale de l'Indonésie ?|インドネシアの通貨は?",
    ["The rupiah|La rupia|La roupie|ルピア", "The ringgit|El ringgit|Le ringgit|リンギット", "The baht|El baht|Le baht|バーツ"],
    0,
    "The rupiah's low unit value means everyday prices run into the thousands or millions, a running joke among visitors doing the mental arithmetic.|El bajo valor de la rupia hace que los precios cotidianos lleguen a los miles o millones, motivo de broma para los visitantes que hacen cuentas.|La faible valeur de la roupie fait que les prix courants se comptent en milliers, voire en millions, un sujet de plaisanterie récurrent chez les visiteurs qui font le calcul.|ルピアは単位あたりの価値が小さく、日常の値段が千や百万の桁になる。旅行者が暗算に苦労するのは定番の話である。",
  ),
  q(
    3,
    "What is a small family-run food stall serving simple meals commonly called across Bali and Indonesia?|¿Cómo se llama comúnmente el pequeño puesto de comida familiar de Bali e Indonesia?|Comment appelle-t-on communément la petite échoppe familiale servant des repas simples à Bali et en Indonésie ?|バリやインドネシアで、簡単な食事を出す家族経営の小さな食堂を何と呼ぶか?",
    ["A losmen|Un losmen|Un losmen|ロスメン", "A warung|Un warung|Un warung|ワルン", "A padi|Un padi|Un padi|パディ"],
    1,
    "A warung can be anything from a roadside cart to a family's front room turned into a simple dining counter, and most Balinese eat at one daily.|Un warung puede ser desde un carrito junto a la carretera hasta el salón de una casa convertido en mostrador de comidas, y la mayoría de balineses come en uno a diario.|Un warung peut être aussi bien une charrette au bord de la route qu'un salon familial transformé en comptoir de repas, et la plupart des Balinais y mangent quotidiennement.|ワルンは道端の屋台から、家の居間を簡単な食堂に変えたものまで様々である。たいていのバリ人が毎日どこかのワルンで食事をする。",
  ),
  q(
    4,
    "Balinese Hindus traditionally name children after their birth order rather than by family surname; what is the name usually given to a firstborn child?|Los hindúes balineses suelen nombrar a los hijos según el orden de nacimiento; ¿qué nombre se da normalmente al primogénito?|Les hindous balinais nomment traditionnellement leurs enfants selon leur rang de naissance ; quel nom porte généralement l'aîné ?|バリのヒンドゥー教徒は姓ではなく生まれた順で子に名を付ける。長子に付けられる名は?",
    ["Ketut|Ketut|Ketut|クトゥット", "Made|Made|Made|マデ", "Wayan|Wayan|Wayan|ワヤン"],
    2,
    "The sequence runs Wayan, Made, Nyoman, Ketut for the first four children, regardless of gender, and starts over again from the fifth.|La secuencia es Wayan, Made, Nyoman, Ketut para los cuatro primeros hijos, sin importar el sexo, y vuelve a empezar desde el quinto.|La séquence est Wayan, Made, Nyoman, Ketut pour les quatre premiers enfants, quel que soit leur sexe, et recommence à partir du cinquième.|順序はワヤン・マデ・ニョマン・クトゥットで、性別に関わらず最初の四人に付けられ、五人目からまた最初に戻る。",
  ),
  q(
    4,
    "What is the small daily offering of woven palm leaf, flowers and rice placed outside homes and shops across Bali called?|¿Cómo se llama la pequeña ofrenda diaria de hoja de palma tejida, flores y arroz que se pone fuera de casas y tiendas en Bali?|Comment appelle-t-on la petite offrande quotidienne de feuille de palmier tressée, de fleurs et de riz placée devant les maisons et boutiques à Bali ?|バリの家や店の前に毎日供えられる、編んだ椰子の葉に花と米を乗せた小さな供物を何と呼ぶか?",
    ["A canang sari|Un canang sari|Un canang sari|チャナン・サリ", "A lontar|Un lontar|Un lontar|ロンタル", "A penjor|Un penjor|Un penjor|プンジョール"],
    0,
    "Millions are made and set out fresh every single day across the island, and they are not meant to last — being walked over or eaten by animals is considered normal, since the offering's purpose is already served.|Se hacen y colocan millones frescos cada día en toda la isla, y no están pensados para durar: que los pisen o se los coma un animal se considera normal, pues su propósito ya se ha cumplido.|Des millions sont confectionnées et déposées fraîches chaque jour à travers l'île, et elles ne sont pas censées durer : qu'on marche dessus ou qu'un animal les mange est considéré normal, le but de l'offrande étant déjà rempli.|島じゅうで毎日、何百万個ものチャナン・サリが新しく作られ供えられる。長く残るためのものではなく、踏まれたり動物に食べられたりしても構わないとされる。供える目的はすでに果たされているからである。",
  ),
  q(
    4,
    "Kopi luwak, a costly coffee produced in Bali's highlands, is processed after the beans are eaten and excreted by which animal?|El kopi luwak, un café caro producido en las tierras altas de Bali, se procesa después de que un animal se coma y excrete los granos; ¿cuál?|Le kopi luwak, café coûteux produit sur les hauts plateaux de Bali, est traité après que les grains ont été mangés et excrétés par quel animal ?|バリの高地で作られる高級コーヒー、コピ・ルアックは、どの動物に豆を食べさせ排出させてから作るか?",
    ["A monkey|Un mono|Un singe|猿", "A civet|Una civeta|Une civette|ジャコウネコ", "A wild boar|Un jabalí|Un sanglier|イノシシ"],
    1,
    "The civet's digestion is said to remove bitterness from the bean, and the coffee's high price abroad has led to some farms keeping civets caged specifically to produce it.|Se dice que la digestión de la civeta quita amargor al grano, y el alto precio del café en el extranjero ha llevado a algunas granjas a enjaular civetas solo para producirlo.|On dit que la digestion de la civette ôte l'amertume du grain, et le prix élevé de ce café à l'étranger a conduit certaines fermes à garder des civettes en cage rien que pour le produire.|ジャコウネコの消化を通ると豆の苦みが抜けるとされる。海外での高値ゆえ、この豆を作るためだけにジャコウネコを飼育する農場も出てきた。",
  ),
  q(
    5,
    "In Balinese Hindu belief, which goddess is honoured particularly by rice farmers, distinct from the goddess associated with the island's crater lakes?|En la creencia hindú balinesa, ¿qué diosa honran especialmente los arroceros, distinta de la asociada a los lagos de cráter de la isla?|Dans la croyance hindoue balinaise, quelle déesse est particulièrement honorée par les riziculteurs, distincte de celle associée aux lacs de cratère de l'île ?|バリのヒンドゥー信仰で、島の火口湖の女神とは別に、稲作の民が特に敬う女神は?",
    ["Dewi Kwan Im|Dewi Kwan Im|Dewi Kwan Im|クァンイム", "Dewi Danu|Dewi Danu|Dewi Danu|デウィ・ダヌ", "Dewi Sri|Dewi Sri|Dewi Sri|デウィ・スリ"],
    2,
    "Small shrines to Dewi Sri stand at the corner of many rice fields, separate from the lake temples that manage the irrigation water itself.|Pequeños santuarios a Dewi Sri se alzan en la esquina de muchos arrozales, aparte de los templos del lago que gestionan el agua de riego.|De petits sanctuaires à Dewi Sri se dressent au coin de nombreuses rizières, distincts des temples du lac qui gèrent l'eau d'irrigation elle-même.|多くの田の隅にはデウィ・スリを祀る小さな祠が立つ。灌漑の水そのものを司る湖の寺院とは別のものである。",
  ),
  q(
    5,
    "In Balinese temple dances, which protective, lion-like spirit appears opposite the witch-queen Rangda?|En las danzas de templo balinesas, ¿qué espíritu protector con forma de león aparece frente a la bruja reina Rangda?|Dans les danses de temple balinaises, quel esprit protecteur, à l'allure de lion, apparaît face à la reine-sorcière Rangda ?|バリの寺院舞踊で、魔女の女王ランダと対峙する、獅子のような姿の守護霊は?",
    ["Barong|El barong|Le barong|バロン", "Garuda|Garuda|Garuda|ガルーダ", "Naga|Naga|Naga|ナーガ"],
    0,
    "The two are performed as an endless, unresolved struggle between protective and destructive forces, danced out again and again rather than settled once and for all.|Ambos se representan como una lucha interminable e irresuelta entre fuerzas protectoras y destructoras, escenificada una y otra vez en lugar de resolverse para siempre.|Les deux sont représentés comme une lutte sans fin, jamais tranchée, entre forces protectrices et destructrices, rejouée sans cesse plutôt que réglée une fois pour toutes.|バロンとランダの闘いは、守る力と壊す力の終わることのない争いとして演じられる。一度きりで決着がつくのではなく、何度も繰り返し舞われる。",
  ),
  q(
    5,
    "Betutu, a Balinese ceremonial dish of slow-cooked chicken or duck, is traditionally wrapped in which leaf before cooking?|El betutu, plato ceremonial balinés de pollo o pato cocido a fuego lento, se envuelve tradicionalmente en qué hoja antes de cocinarlo?|Le betutu, plat cérémoniel balinais de poulet ou de canard cuit lentement, est traditionnellement enveloppé dans quelle feuille avant cuisson ?|バリの祭祀料理ブトゥトゥ(鶏か鴨をじっくり煮込む)は、調理前に何の葉で包むのが伝統的か?",
    ["Betel leaf|Hoja de betel|Feuille de bétel|キンマの葉", "Banana leaf|Hoja de plátano|Feuille de bananier|バナナの葉", "Teak leaf|Hoja de teca|Feuille de teck|チーク材の葉"],
    1,
    "Wrapped and packed with spices, the bird is then buried in hot coals or embers for hours until the meat falls off the bone.|Envuelta y rellena de especias, el ave se entierra luego en brasas calientes durante horas hasta que la carne se separa del hueso.|Enveloppé et farci d'épices, l'oiseau est ensuite enfoui dans des braises chaudes pendant des heures jusqu'à ce que la viande se détache de l'os.|香辛料を詰めて葉で包んだ鳥は、熱い炭の中に何時間も埋められ、肉が骨からほろほろとほどけるまで火を通す。",
  ),
  q(
    5,
    "The chant-only performance style in which a circle of a hundred or more bare-chested men vocalise \"cak\" instead of using a gamelan orchestra is called...?|El estilo escénico solo de voz en que un círculo de cien hombres o más, con torso desnudo, cantan «cak» en vez de una orquesta de gamelán se llama…?|Le style scénique uniquement vocal où un cercle de cent hommes ou plus, torse nu, scandent « cak » au lieu d'un orchestre de gamelan s'appelle…?|百人を超す上半身裸の男たちが輪になり、ガムラン楽団の代わりに「チャッ」と唱えるだけの上演形式は?",
    ["Joged|Joged|Joged|ジョゲッド", "Legong|Legong|Legong|レゴン", "Kecak|Kecak|Kecak|ケチャ"],
    2,
    "The form was assembled in the 1930s from an older trance ritual, with the German painter Walter Spies helping shape it into a performance for an audience.|La forma se armó en los años 30 a partir de un ritual de trance más antiguo, con ayuda del pintor alemán Walter Spies para convertirla en espectáculo para público.|La forme fut composée dans les années 1930 à partir d'un rituel de transe plus ancien, le peintre allemand Walter Spies ayant contribué à en faire un spectacle pour un public.|1930年代、もっと古いトランスの儀式をもとに、ドイツ人画家ヴァルター・シュピースの助けを得て、観客に見せる演目として組み立てられた。",
  ),
  q(
    6,
    "Bali uses which Indonesian time zone, one hour ahead of the capital Jakarta?|¿Qué huso horario indonesio usa Bali, una hora por delante de la capital, Yakarta?|Quel fuseau horaire indonésien Bali utilise-t-elle, en avance d'une heure sur la capitale, Jakarta ?|バリはジャカルタより1時間進んだ、インドネシアのどの標準時を使うか?",
    ["Central Indonesia Time (WITA)|Hora de Indonesia Central (WITA)|Heure d'Indonésie centrale (WITA)|中部インドネシア時間(WITA)", "Western Indonesia Time (WIB)|Hora de Indonesia Occidental (WIB)|Heure d'Indonésie occidentale (WIB)|西部インドネシア時間(WIB)", "Eastern Indonesia Time (WIT)|Hora de Indonesia Oriental (WIT)|Heure d'Indonésie orientale (WIT)|東部インドネシア時間(WIT)"],
    0,
    "Indonesia spans three time zones across its 5,000-kilometre width, and Bali sits in the middle one, alongside Nusa Tenggara, Kalimantan and Sulawesi.|Indonesia abarca tres husos horarios en sus 5.000 km de ancho, y Bali está en el central, junto a Nusa Tenggara, Kalimantan y Célebes.|L'Indonésie s'étend sur trois fuseaux horaires sur ses 5 000 km de large, et Bali se trouve dans celui du milieu, avec Nusa Tenggara, Kalimantan et Célèbes.|インドネシアは幅5000キロにわたり三つの標準時にまたがる。バリはその中央の帯にあり、ヌサトゥンガラ・カリマンタン・スラウェシと同じ時間帯を使う。",
  ),
  q(
    6,
    "During Nyepi, Bali's Day of Silence, who traditionally patrols the streets to make sure the rules of darkness and stillness are kept?|Durante Nyepi, el Día del Silencio de Bali, ¿quién patrulla tradicionalmente las calles para que se respeten las normas de oscuridad y quietud?|Pendant Nyepi, le Jour du Silence balinais, qui patrouille traditionnellement les rues pour faire respecter les règles d'obscurité et d'immobilité ?|バリの「静寂の日」ニュピの間、暗闇と静けさの決まりが守られているか通りを見回るのは誰か?",
    ["The national army|El ejército nacional|L'armée nationale|国軍", "Pecalang, traditional village security|Los pecalang, seguridad tradicional del pueblo|Les pecalang, la sécurité villageoise traditionnelle|村の伝統的な自警団「プチャラン」", "Airport staff only|Solo el personal del aeropuerto|Seulement le personnel de l'aéroport|空港職員のみ"],
    1,
    "Pecalang are unpaid volunteers drawn from each banjar, or neighbourhood association, and their authority on Nyepi is customary rather than backed by national law.|Los pecalang son voluntarios sin sueldo de cada banjar (asociación vecinal), y su autoridad en Nyepi es consuetudinaria, no respaldada por ley nacional.|Les pecalang sont des volontaires non rémunérés issus de chaque banjar (association de quartier), et leur autorité pendant Nyepi relève de la coutume plutôt que de la loi nationale.|プチャランは各バンジャール(隣組)から出る無給の志願者で、ニュピにおけるその権限は国の法律ではなく慣習によるものである。",
  ),
  q(
    6,
    "An imaginary line marking a sharp change in native animal life runs through the strait just east of Bali; what is it called?|Una línea imaginaria que marca un cambio brusco en la fauna nativa cruza el estrecho justo al este de Bali; ¿cómo se llama?|Une ligne imaginaire marquant un net changement de faune indigène traverse le détroit juste à l'est de Bali ; comment s'appelle-t-elle ?|バリのすぐ東の海峡を通り、在来の動物相ががらりと変わる境界とされる想像上の線は?",
    ["The Date Line|La línea de cambio de fecha|La ligne de changement de date|日付変更線", "The Equator|El ecuador|L'équateur|赤道", "The Wallace Line|La línea de Wallace|La ligne Wallace|ウォレス線"],
    2,
    "Named for the naturalist Alfred Russel Wallace, the line divides Asian-type mammals to the west from more marsupial, Australian-type fauna to the east, despite the narrow crossing.|Llamada así por el naturalista Alfred Russel Wallace, la línea separa mamíferos de tipo asiático al oeste de una fauna más marsupial, de tipo australiano, al este.|Baptisée d'après le naturaliste Alfred Russel Wallace, la ligne sépare les mammifères de type asiatique à l'ouest d'une faune plus marsupiale, de type australien, à l'est.|博物学者アルフレッド・ラッセル・ウォレスにちなむこの線は、狭い海峡を挟みながらも、西のアジア型の哺乳類と東の有袋類寄りのオーストラリア型の動物相を分ける。",
  ),
  q(
    6,
    "Every household on Bali belongs to a customary neighbourhood association that organises shared ceremonies and upkeep; what is it called?|Todo hogar de Bali pertenece a una asociación vecinal consuetudinaria que organiza ceremonias y mantenimiento comunes; ¿cómo se llama?|Chaque foyer de Bali appartient à une association de quartier coutumière qui organise cérémonies et entretien communs ; comment s'appelle-t-elle ?|バリのどの世帯も、共同の儀式や維持管理を仕切る慣習的な隣組に属している。それを何と呼ぶか?",
    ["Banjar|El banjar|Le banjar|バンジャール", "Kampung|El kampung|Le kampung|カンプン", "Dusun|El dusun|Le dusun|ドゥスン"],
    0,
    "A banjar decides on its own local rules, organises temple festivals, and collects contributions for ceremonies like weddings and cremations from every member household.|Un banjar decide sus propias normas locales, organiza las fiestas del templo y recauda aportaciones para bodas y cremaciones de cada hogar miembro.|Un banjar fixe ses propres règles locales, organise les fêtes de temple et collecte les contributions pour les mariages et crémations de chaque foyer membre.|バンジャールは独自の地域の決まりを定め、寺院の祭りを取り仕切り、加盟する各世帯から結婚式や火葬式のための拠出を集める。",
  ),
  q(
    7,
    "Balinese society traditionally recognises hereditary status groups; roughly what share of Balinese Hindus belong to the common Sudra group rather than the three noble or priestly groups?|La sociedad balinesa reconoce tradicionalmente grupos de estatus hereditario; ¿qué proporción aproximada de hindúes balineses pertenece al grupo común sudra en vez de a los tres nobles o sacerdotales?|La société balinaise reconnaît traditionnellement des groupes de statut héréditaire ; quelle proportion environ des hindous balinais appartient au groupe commun sudra plutôt qu'aux trois groupes nobles ou sacerdotaux ?|バリ社会には伝統的に世襲の身分集団があるが、貴族・僧侶の三集団ではなく庶民スードラに属するバリ・ヒンドゥー教徒はおよそどれくらいの割合か?",
    ["About 50%|Cerca del 50%|Environ 50 %|およそ50%", "About 90%|Cerca del 90%|Environ 90 %|およそ90%", "About 10%|Cerca del 10%|Environ 10 %|およそ10%"],
    1,
    "The three higher groups — Brahmana, Satria and Wesia — make up only a small share of the population, though names and titles associated with them are still widely recognised.|Los tres grupos superiores (brahmana, satria y wesia) suman solo una pequeña parte de la población, aunque los nombres y títulos asociados a ellos siguen siendo muy reconocidos.|Les trois groupes supérieurs (Brahmana, Satria et Wesia) ne représentent qu'une faible part de la population, bien que les noms et titres qui leur sont associés restent largement reconnus.|上位三集団(ブラフマナ・サトリア・ウェシア)は人口のごく一部にすぎないが、それに結びつく名や称号はいまも広く知られている。",
  ),
  q(
    7,
    "A Balinese cremation tower built to carry the body to the cremation ground, often shaped like a multi-tiered pagoda, is called...?|La torre de cremación balinesa que lleva el cuerpo hasta el lugar de la cremación, a menudo con forma de pagoda escalonada, se llama…?|La tour de crémation balinaise qui porte le corps jusqu'au lieu de crémation, souvent en forme de pagode à plusieurs niveaux, s'appelle…?|遺体を火葬場まで運ぶための、多層の塔のような形をしたバリの輿を何と呼ぶか?",
    ["A gong|Un gong|Un gong|ゴング", "A jukung|Un jukung|Un jukung|ジュクン", "A bade|Un bade|Un bade|バデ"],
    2,
    "The tower, often built taller than the family can afford alone, is carried on the shoulders of dozens of men and burned along with the body inside a separate animal-shaped sarcophagus.|La torre, a menudo más alta de lo que la familia podría costear sola, la llevan a hombros decenas de hombres y se quema junto al cuerpo dentro de un sarcófago con forma de animal aparte.|La tour, souvent plus haute que ce qu'une seule famille pourrait se permettre, est portée sur les épaules de dizaines d'hommes et brûlée avec le corps dans un sarcophage séparé en forme d'animal.|この塔は一家だけでは賄いきれないほど高く作られることも多く、何十人もの男の肩に担がれて運ばれ、動物の形をした別の棺とともに遺体ごと焼かれる。",
  ),
  q(
    7,
    "Bali's aristocratic and courtly traditions trace much of their origin to refugees from which 14th–16th century Javanese Hindu empire, driven out as Islam spread across Java?|Las tradiciones aristocráticas y cortesanas de Bali remontan buena parte de su origen a refugiados de qué imperio hindú javanés (s. XIV–XVI), expulsados al extenderse el islam por Java?|Les traditions aristocratiques et courtoises de Bali trouvent une grande partie de leur origine chez des réfugiés de quel empire hindou javanais (XIVe–XVIe siècle), chassés par l'expansion de l'islam à Java ?|バリの王侯・宮廷の伝統の多くは、イスラムがジャワに広まるなかで追われた14〜16世紀のどのジャワのヒンドゥー王朝からの避難民に遡るとされるか?",
    ["Majapahit|Majapahit|Majapahit|マジャパヒト", "Srivijaya|Srivijaya|Srivijaya|シュリーヴィジャヤ", "Mataram Sultanate|El sultanato de Mataram|Le sultanat de Mataram|マタラム王国(イスラム)"],
    0,
    "Nobles, priests and artisans are said to have crossed to Bali as the empire collapsed, bringing court arts, literature and the caste framework that still shapes Balinese Hindu society.|Se dice que nobles, sacerdotes y artesanos cruzaron a Bali al caer el imperio, trayendo artes cortesanas, literatura y el marco de castas que aún moldea la sociedad hindú balinesa.|Nobles, prêtres et artisans auraient traversé vers Bali lors de l'effondrement de l'empire, apportant arts de cour, littérature et le cadre des castes qui structure encore la société hindoue balinaise.|王朝が崩れるなか、貴族・僧侶・職人たちがバリへ渡ったとされ、宮廷の芸術や文学、いまもバリのヒンドゥー社会を形づくるカーストの枠組みをもたらした。",
  ),
  q(
    7,
    "What black-and-white checkered cloth, wrapped around sacred trees and statues, represents the balance of good and evil in Balinese belief?|¿Qué tela a cuadros blancos y negros, envuelta en árboles y estatuas sagradas, representa el equilibrio entre el bien y el mal en la creencia balinesa?|Quel tissu à damier noir et blanc, enroulé autour d'arbres et de statues sacrés, représente l'équilibre du bien et du mal dans la croyance balinaise ?|聖なる木や像に巻かれる黒白格子の布で、バリの信仰で善悪の均衡を表すものは?",
    ["Songket|El songket|Le songket|ソンケット", "Poleng|El poleng|Le poleng|ポレン", "Endek|El endek|L'endek|エンデック"],
    1,
    "The concept it stands for, rwa bhineda, holds that good and evil are two halves of one whole rather than opposites to be eliminated, so poleng cloth is never all one colour.|El concepto que representa, rwa bhineda, sostiene que el bien y el mal son dos mitades de un todo, no opuestos a eliminar, así que el poleng nunca es de un solo color.|Le concept qu'il représente, rwa bhineda, veut que le bien et le mal soient les deux moitiés d'un tout, non des opposés à éliminer, si bien que le poleng n'est jamais d'une seule couleur.|この布が表す「ルワ・ビネダ」の考えでは、善と悪は消し去るべき対立ではなく、一つの全体の両半分だとされる。だからポレンの布は決して単色にならない。",
  ),
  q(
    8,
    "In traditional Balinese house compounds, the direction toward the island's sacred central mountains — the most spiritually pure — is called...?|En los recintos tradicionales balineses, la dirección hacia las montañas sagradas centrales de la isla (la más pura espiritualmente) se llama…?|Dans les enceintes traditionnelles balinaises, la direction vers les montagnes sacrées centrales de l'île (la plus pure spirituellement) s'appelle…?|バリの伝統的な屋敷地で、島の中央にある聖なる山々の方角(最も清浄とされる方角)を何と呼ぶか?",
    ["Kangin|Kangin|Kangin|カンギン", "Kelod|Kelod|Kelod|クロッド", "Kaja|Kaja|Kaja|カジャ"],
    2,
    "Because Bali's mountains sit roughly in the centre, kaja points a different compass direction depending where on the island you stand — north on the south coast, south on the north coast.|Como las montañas de Bali están casi en el centro, kaja apunta a un rumbo distinto según dónde se esté en la isla: al norte en la costa sur, al sur en la costa norte.|Les montagnes de Bali se trouvant à peu près au centre, kaja pointe vers une direction différente selon l'endroit où l'on se trouve sur l'île : le nord depuis la côte sud, le sud depuis la côte nord.|バリの山々はほぼ島の中央にあるため、「カジャ」の指す方位は島のどこにいるかで変わる。南岸では北を、北岸では南を指す。",
  ),
  q(
    8,
    "Bali has its own traditional script, related to Javanese and once used to copy palm-leaf manuscripts; what is it called?|Bali tiene su propio sistema de escritura tradicional, emparentado con el javanés y usado antaño para copiar manuscritos de hoja de palma; ¿cómo se llama?|Bali possède sa propre écriture traditionnelle, apparentée au javanais et autrefois utilisée pour copier les manuscrits sur feuille de palmier ; comment s'appelle-t-elle ?|バリには、ジャワ文字と縁の深い、かつて椰子の葉の写本を書き写すのに使われた独自の伝統的な文字がある。それを何と呼ぶか?",
    ["Aksara Bali|Aksara Bali|Aksara Bali|アクサラ・バリ", "Hanacaraka Thai|Hanacaraka tailandés|Hanacaraka thaï|ハナチャラカ・タイ", "Pallava Roman|Pallava romano|Pallava romain|パッラヴァ・ローマ字"],
    0,
    "It is still taught in some Balinese schools alongside the Latin alphabet, mainly so students can read temple inscriptions and older manuscripts.|Todavía se enseña en algunas escuelas balinesas junto al alfabeto latino, sobre todo para que los alumnos puedan leer inscripciones de templos y manuscritos antiguos.|Elle est encore enseignée dans certaines écoles balinaises aux côtés de l'alphabet latin, surtout pour que les élèves puissent lire les inscriptions de temple et les manuscrits anciens.|いまも一部のバリの学校でラテン文字と並んで教えられている。主な目的は、生徒が寺院の碑文や古い写本を読めるようにするためである。",
  ),
  q(
    8,
    "One of Bali's oldest \"Bali Aga\" villages, said to keep customs from before the island's Hindu-Javanese courtly influence, is known for a ritual fight between men using thorned pandanus leaves; what is this contest called?|Uno de los pueblos «bali aga» más antiguos de Bali, que dicen conservar costumbres previas a la influencia cortesana hindú-javanesa, es conocido por un combate ritual entre hombres con hojas espinosas de pandano; ¿cómo se llama?|L'un des plus anciens villages « bali aga » de Bali, réputé conserver des coutumes antérieures à l'influence courtoise hindou-javanaise, est connu pour un combat rituel entre hommes armés de feuilles de pandanus épineuses ; comment s'appelle ce combat ?|ジャワのヒンドゥー宮廷の影響より前の慣習を残すとされる、バリ最古級の「バリ・アガ」の村のひとつは、とげのあるタコノキの葉で男たちが戦う儀式で知られる。この競技を何と呼ぶか?",
    ["Makepung|Makepung|Makepung|マクプン", "Perang pandan|Perang pandan|Perang pandan|プラン・パンダン", "Mekotek|Mekotek|Mekotek|ムコテック"],
    1,
    "Fighters wrap a shield of woven rattan around one arm and strike with bundles of pandanus thorns, and turmeric paste is rubbed on the cuts afterwards rather than any modern medicine.|Los luchadores se envuelven un brazo con un escudo de ratán tejido y golpean con manojos de espinas de pandano; después se frotan las heridas con pasta de cúrcuma en vez de medicina moderna.|Les combattants s'enroulent un bouclier de rotin tressé autour d'un bras et frappent avec des bottes d'épines de pandanus ; après quoi on frotte les coupures de pâte de curcuma plutôt que de médecine moderne.|戦う者たちは籐を編んだ盾を片腕に巻き、束ねたタコノキのとげで打ち合う。傷にはあとで、現代の薬ではなくウコンのすり潰したものを塗る。",
  ),
  q(
    8,
    "Which Bali Aga village on the shore of Lake Batur is known for laying its dead in bamboo cages beneath a fragrant tree instead of burying or cremating them?|¿Qué pueblo bali aga a orillas del lago Batur es conocido por dejar a sus muertos en jaulas de bambú bajo un árbol aromático en vez de enterrarlos o incinerarlos?|Quel village bali aga au bord du lac Batur est connu pour déposer ses morts dans des cages de bambou sous un arbre odorant plutôt que de les enterrer ou de les incinérer ?|バトゥール湖畔にあるバリ・アガの村で、遺体を埋葬も火葬もせず、香りのよい木の下の竹籠に置くことで知られるのは?",
    ["Sidemen|Sidemen|Sidemen|シドゥメン", "Tenganan|Tenganan|Tenganan|トゥガナン", "Trunyan|Trunyan|Trunyan|トゥルニャン"],
    2,
    "The tree, called taru menyan, is said to give off a scent strong enough to mask decay, which is the reason villagers give for why bodies here are left in the open rather than buried.|Se dice que el árbol, llamado taru menyan, desprende un aroma tan fuerte que enmascara la descomposición, razón que dan los vecinos para dejar los cuerpos al aire en vez de enterrarlos.|L'arbre, appelé taru menyan, dégagerait un parfum assez fort pour masquer la décomposition, raison invoquée par les villageois pour laisser les corps à l'air libre plutôt que de les enterrer.|タルー・ムニャンと呼ばれるこの木は、腐敗の臭いを覆い隠すほど強い香りを放つとされる。村人はこれを、遺体を埋めずに野ざらしにする理由として語る。",
  ),
  q(
    9,
    "Balinese Hindus follow two calendar systems side by side: the 210-day Pawukon used for most temple anniversaries, and a separate lunar-solar calendar mainly used to fix the date of Nyepi. What is that second calendar called?|Los hindúes balineses siguen dos calendarios a la vez: el pawukon de 210 días, usado para la mayoría de aniversarios de templo, y otro lunisolar usado sobre todo para fijar la fecha de Nyepi. ¿Cómo se llama este segundo?|Les hindous balinais suivent deux calendriers en parallèle : le pawukon de 210 jours, utilisé pour la plupart des anniversaires de temple, et un calendrier luni-solaire distinct, surtout utilisé pour fixer la date de Nyepi. Comment s'appelle ce second calendrier ?|バリのヒンドゥー教徒は二つの暦を並行して使う。寺院の創建記念日の多くに使う210日のパウコン暦と、ニュピの日取りを決めるのに主に使う別の太陰太陽暦である。この二つ目の暦を何と呼ぶか?",
    ["The Saka calendar|El calendario saka|Le calendrier saka|サカ暦", "The Gregorian calendar|El calendario gregoriano|Le calendrier grégorien|グレゴリオ暦", "The Hijri calendar|El calendario hégira|Le calendrier hégirien|ヒジュラ暦"],
    0,
    "The Saka calendar traces back to an Indian-origin era count and gives Nyepi its date each year, which is why the Day of Silence falls on a different day of the Western calendar annually.|El calendario saka se remonta a un cómputo de era de origen indio y da a Nyepi su fecha cada año, por lo que el Día del Silencio cae en un día distinto del calendario occidental cada vez.|Le calendrier saka remonte à un comput d'ère d'origine indienne et donne chaque année sa date à Nyepi, ce qui explique que le Jour du Silence tombe un jour différent du calendrier occidental chaque année.|サカ暦はインド起源の紀年法にさかのぼり、毎年のニュピの日取りを決める。そのため「静寂の日」は西暦では毎年違う日になる。",
  ),
  q(
    9,
    "Balinese speech has distinct registers chosen according to the relative social status of speaker and listener; the most formal register, used toward priests and high nobility, is called...?|El balinés tiene registros de habla distintos según el estatus social relativo de hablante y oyente; el registro más formal, usado con sacerdotes y alta nobleza, se llama…?|Le balinais possède des registres de langue distincts selon le statut social relatif du locuteur et de l'auditeur ; le registre le plus formel, utilisé envers les prêtres et la haute noblesse, s'appelle…?|バリ語には、話し手と聞き手の社会的な立場に応じて使い分ける言葉の段階がある。僧侶や高位の貴族に対して使う、いちばん改まった段階を何と呼ぶか?",
    ["Basa Kasar|Basa kasar|Basa kasar|バサ・カサル", "Basa Alus Singgih|Basa Alus Singgih|Basa Alus Singgih|バサ・アルス・シンギ", "Basa Pasar|Basa pasar|Basa pasar|バサ・パサール"],
    1,
    "Choosing the wrong register is considered a real social mistake, and many Balinese children now grow up more fluent in Indonesian than in the highest levels of their own local language.|Elegir el registro equivocado se considera un verdadero desliz social, y muchos niños balineses hoy dominan mejor el indonesio que los niveles más altos de su propia lengua local.|Se tromper de registre est considéré comme un véritable impair social, et de nombreux enfants balinais aujourd'hui maîtrisent mieux l'indonésien que les niveaux les plus élevés de leur propre langue locale.|段階を間違えることは実際の社会的な失礼とされる。いまでは多くのバリの子どもが、自分たちの言葉のいちばん高い段階よりインドネシア語のほうに通じている。",
  ),
  q(
    9,
    "Balinese barong masks take several animal forms besides the best-known lion-like Barong Ket; which farm animal does the Barong Bangkal represent?|Las máscaras de barong balinesas tienen varias formas animales además del conocido Barong Ket, con forma de león; ¿qué animal de granja representa el Barong Bangkal?|Les masques de barong balinais prennent plusieurs formes animales en plus du célèbre Barong Ket, à l'allure de lion ; quel animal de ferme représente le Barong Bangkal ?|バロンの面には、いちばん知られる獅子のようなバロン・ケットのほかにも動物の形がいくつかある。バロン・バンカルはどの家畜を表すか?",
    ["A water buffalo|Un búfalo de agua|Un buffle d'eau|水牛", "A goat|Una cabra|Une chèvre|山羊", "A pig|Un cerdo|Un cochon|豚"],
    2,
    "Different villages keep their own barong forms and rarely lend them out, since each is considered to hold its own protective spirit rather than being interchangeable with another village's mask.|Cada pueblo guarda sus propias formas de barong y rara vez las presta, pues se considera que cada una alberga su propio espíritu protector y no es intercambiable con la máscara de otro pueblo.|Chaque village conserve ses propres formes de barong et les prête rarement, chacune étant considérée comme abritant son propre esprit protecteur, non interchangeable avec le masque d'un autre village.|村ごとに独自のバロンの姿を持ち、めったに貸し出さない。それぞれが固有の守護霊を宿すとされ、よその村の面と取り替えがきくものではないからである。",
  ),
  q(
    7,
    "Bali's international airport is named after a military commander who died leading a last stand against returning Dutch colonial forces in 1946; what is that battle usually called?|El aeropuerto internacional de Bali lleva el nombre de un comandante muerto liderando una resistencia final contra las fuerzas coloniales holandesas que regresaban en 1946; ¿cómo se llama esa batalla?|L'aéroport international de Bali porte le nom d'un commandant mort en menant une dernière résistance contre les forces coloniales néerlandaises revenues en 1946 ; comment appelle-t-on habituellement cette bataille ?|バリの国際空港は、1946年に戻ってきたオランダ植民地軍への最後の抵抗を率いて戦死した司令官の名にちなむ。この戦いは通常何と呼ばれるか?",
    ["The Battle of Marga (Puputan Margarana)|La batalla de Marga (Puputan Margarana)|La bataille de Marga (Puputan Margarana)|マルガの戦い(ププタン・マルガラナ)", "The Battle of Surabaya|La batalla de Surabaya|La bataille de Surabaya|スラバヤの戦い", "The Siege of Yogyakarta|El sitio de Yogyakarta|Le siège de Yogyakarta|ジョグジャカルタ包囲戦"],
    0,
    "Lieutenant Colonel I Gusti Ngurah Rai and his small band of independence fighters were wiped out in the battle, and the airport, opened two decades later, carries his name.|El teniente coronel I Gusti Ngurah Rai y su pequeño grupo de combatientes independentistas fueron aniquilados en la batalla, y el aeropuerto, abierto dos décadas después, lleva su nombre.|Le lieutenant-colonel I Gusti Ngurah Rai et sa petite troupe de combattants indépendantistes furent anéantis lors de cette bataille, et l'aéroport, ouvert deux décennies plus tard, porte son nom.|イ・グスティ・ングラ・ライ中佐とその小さな独立戦士の一団はこの戦いで全滅した。二十年後に開かれた空港は、彼の名を冠している。",
  ),
  q(
    4,
    "\"Nusa\", as in the island names Nusa Penida and Nusa Lembongan, simply means...?|«Nusa», como en los nombres de isla Nusa Penida y Nusa Lembongan, significa simplemente…?|« Nusa », comme dans les noms d'îles Nusa Penida et Nusa Lembongan, signifie simplement…?|ヌサペニダやヌサレンボンガンの「ヌサ」は、単に何を意味するか?",
    ["Temple|Templo|Temple|寺院", "Island|Isla|Île|島", "Beach|Playa|Plage|浜"],
    1,
    "The word appears across many Indonesian and wider Austronesian island names, from Nusa Tenggara to the country's old name of Nusantara.|La palabra aparece en muchos nombres de islas indonesias y austronesias en general, desde Nusa Tenggara hasta el antiguo nombre del país, Nusantara.|Le mot apparaît dans de nombreux noms d'îles indonésiennes et austronésiennes plus largement, de Nusa Tenggara à l'ancien nom du pays, Nusantara.|この語はヌサトゥンガラから、かつてこの国を指した「ヌサンタラ」まで、インドネシアや広く南島語族の島の名に数多く現れる。",
  ),
  q(
    6,
    "A Balinese philosophy often cited as the idea behind subak holds that well-being comes from harmony among three relationships: with God, with other people, and with what third thing?|Una filosofía balinesa citada a menudo tras el subak sostiene que el bienestar viene de la armonía entre tres relaciones: con Dios, con las demás personas y ¿con qué tercer elemento?|Une philosophie balinaise souvent citée comme fondement du subak veut que le bien-être vienne de l'harmonie entre trois relations : avec Dieu, avec autrui, et avec quel troisième élément ?|スバックの背景にある考えとしてよく引かれるバリの哲学は、幸福は神との、人との、そしてもう一つ何との調和から来るとするか?",
    ["The environment (nature)|El entorno (la naturaleza)|L'environnement (la nature)|環境(自然)", "Money|El dinero|L'argent|お金", "The ancestors|Los antepasados|Les ancêtres|祖先"],
    2,
    "The idea, tri hita karana, is often used to explain why Balinese irrigation, land use and ritual calendars are treated as one connected system rather than separate matters of farming, religion and community.|La idea, tri hita karana, se usa a menudo para explicar por qué el riego, el uso del suelo y los calendarios rituales balineses se tratan como un solo sistema conectado.|L'idée, tri hita karana, sert souvent à expliquer pourquoi l'irrigation, l'usage des sols et les calendriers rituels balinais sont traités comme un seul système lié, non comme des affaires séparées.|「トリ・ヒタ・カラナ」と呼ばれるこの考えは、バリの灌漑・土地利用・祭祀の暦が、農業・信仰・共同体という別々の事柄ではなく、一つに繋がった仕組みとして扱われる理由としてよく引かれる。",
  ),
  q(
    4,
    "Roughly how many million people live on Bali?|¿Aproximadamente cuántos millones de personas viven en Bali?|Environ combien de millions de personnes vivent à Bali ?|バリ島にはおよそ何百万人が暮らすか?",
    ["About 4 million|Unos 4 millones|Environ 4 millions|約400万人", "About 40 million|Unos 40 millones|Environ 40 millions|約4000万人", "About 400,000|Unos 400.000|Environ 400 000|約40万人"],
    0,
    "That makes Bali one of Indonesia's more densely populated provinces despite its modest size, packed mostly into the flatter south.|Eso convierte a Bali en una de las provincias más densamente pobladas de Indonesia pese a su tamaño modesto, concentrada sobre todo en el sur más llano.|Cela fait de Bali l'une des provinces les plus densément peuplées d'Indonésie malgré sa taille modeste, concentrée surtout dans le sud plus plat.|これにより、面積はさほど大きくないにもかかわらず、バリはインドネシアでも人口密度の高い州のひとつになっている。人はおもに平らな南部に集まっている。",
  ),
  q(
    2,
    "More followers of which religion live in Indonesia than in any other single country on Earth?|¿De qué religión vive en Indonesia más gente seguidora que en cualquier otro país del mundo?|Les adeptes de quelle religion sont plus nombreux en Indonésie que dans tout autre pays du monde ?|地球上のどの国よりも多くの信者がインドネシアに暮らす宗教は?",
    ["Christianity|El cristianismo|Le christianisme|キリスト教", "Islam|El islam|L'islam|イスラム教", "Buddhism|El budismo|Le bouddhisme|仏教"],
    1,
    "Indonesia's Muslim population outnumbers that of any other nation, including those of the Middle East, simply because the country itself has so many people spread across so many islands.|La población musulmana de Indonesia supera a la de cualquier otra nación, incluidas las de Oriente Medio, sencillamente porque el país tiene mucha gente repartida por muchas islas.|La population musulmane d'Indonésie dépasse celle de toute autre nation, y compris celles du Moyen-Orient, simplement parce que le pays compte tant d'habitants répartis sur tant d'îles.|インドネシアのイスラム教徒の数は、中東の国々を含むどの国よりも多い。単に、これほど多くの島に、これほど多くの人が暮らす国だからである。",
  ),
  q(
    10,
    "The Balinese ceremonial dish babi guling is a whole roasted animal stuffed with spices and turned over an open fire; which animal?|El babi guling, plato ceremonial balinés, es un animal entero asado, relleno de especias y girado sobre fuego abierto; ¿cuál?|Le babi guling, plat cérémoniel balinais, est un animal entier rôti, farci d'épices et tourné sur un feu ouvert ; lequel ?|バリの祭祀料理バビ・グリンは、香辛料を詰めて焚き火の上で丸ごと回しながら焼く動物料理である。何の動物か?",
    ["Goat|Cabra|Chèvre|山羊", "Duck|Pato|Canard|鴨", "Pig|Cerdo|Porc|豚"],
    2,
    "The spice paste stuffed inside, base genep, is the same blend used across many Balinese ceremonial dishes, and the crackling skin is considered the best part.|La pasta de especias del relleno, base genep, es la misma mezcla usada en muchos platos ceremoniales balineses, y la piel crujiente se considera lo mejor.|La pâte d'épices farcie à l'intérieur, base genep, est le même mélange utilisé dans de nombreux plats cérémoniels balinais, et la peau croustillante en est considérée comme le meilleur morceau.|詰め物に使う香辛料のペースト「バセ・グネップ」は、バリの多くの祭祀料理に共通して使われる合わせ調味料である。パリパリに焼けた皮がいちばんの部分とされる。",
  ),
];
