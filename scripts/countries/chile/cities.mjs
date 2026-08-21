/**
 * チリの都市(47都市。team-lead指摘によりプエルト・エデンを追加)。
 *
 * ## この盤面の芯
 *
 * 「なぜ鉄道が敷かれ、なぜ止まったか」。チリは南北4300kmの細長い国で、
 * 北と南でその答えがまったく別物になる。
 *
 * - **北(ノルテ・グランデ)**: 鉄道は硝石と銅を港へ運ぶために敷かれた。
 *   1878年、ボリビア領だったアントファガスタでチリ資本の硝石鉄道会社への
 *   新税をめぐる紛争が太平洋戦争(1879〜83年)の引き金になり、チリは
 *   ボリビアの海岸とペルーの硝石地帯を得た。その硝石産業は、ドイツで
 *   空気中の窒素から人工肥料を作る方法が実用化された瞬間に丸ごと不要になり、
 *   いまも無人の町(オフィシナ)が砂漠に残る。**この「ハーバー・ボッシュ法で
 *   硝石が不要になった」事実そのものは、南アメリカ大陸盤のクイズに既出
 *   (確認済み・2026-08-21)なので、この盤面のクイズでは別の具体的事実
 *   (会社名・税の紛争・フィチャ通貨・世界遺産指定年など)を問う。**
 * - **南(スル〜パタゴニア)**: 鉄道は森林地帯への移民の呼び込みのために
 *   敷かれ、プエルト・モントで文字どおり終わっている。その先(チロエ・
 *   アイセン・マガジャネス)は、フィヨルドと氷河がつながりを断っているため、
 *   いまも海路・空路か、アルゼンチンを経由する陸路でしか行けない。
 *   経済的な理由(北)と地理的な理由(南)、2つの「止まった理由」を対にした。
 *
 * ペルー盤(標高そのものを克服する技術)・ボリビア盤(内陸国になった経緯・
 * 銀鉱山)・南アメリカ大陸盤(硝石産業の終わり・チンチョーロ族のミイラ・
 * 天文台)と重ならないよう、この盤面は「なぜ北で止まり、なぜ南で
 * 止まったか」という具体的な出来事・会社・条約に寄せている。
 *
 * ## 投影(team-lead確認済み。`geography.mjs` のコメント参照)
 *
 * 経度の窓-83.0〜-64.0度(国土そのものは-75.8〜-67.0度で、東西に余白)、
 * 緯度-17.5〜-55.6度。BW=1290 / BH=3220(比0.40、既存でいちばん細い)。
 *
 * ## 地方コード(5区分。チリで一般的な地理区分に合わせた)
 *
 * `ng` ノルテ・グランデ(大いなる北、アタカマ砂漠の核心部) /
 * `nc` ノルテ・チコ(小さな北、遷移地帯) /
 * `ce` セントラル(サンティアゴ・バルパライソ・ワイン産地) /
 * `su` スル(アラウカニア・ロス・リオス・ロス・ラゴス、森林とドイツ系移民) /
 * `au` アウストラル(アイセン・マガジャネス、氷河とフィヨルド)。
 *
 * 47都市の内訳: ng10・nc5・ce12・su10・au10(プエルト・エデン追加分)。
 *
 * `mark` は46種(都市ごとに1種)。`bg` は土地の性格が同じ町どうしでまとめて
 * 24種に絞った。プエルト・エデンだけはプエルト・アイセンとmark/bgを両方
 * 共有しており、combo(mark+bg)は**1組だけ同じ絵になる**
 * (47都市の上限4組の内側)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const CHILE_CITIES = {
  // ---------------------------------------------------------------------
  // ng — ノルテ・グランデ(アタカマ砂漠の核心部。硝石・銅・太平洋戦争)
  // ---------------------------------------------------------------------
  antofagasta: city(
    "Antofagasta|Antofagasta|Antofagasta|アントファガスタ",
    -70.40, -23.65, "ng", "nitraterail", "desertport", "r",
    "The port a tax dispute turned into a new country's coast|El puerto que una disputa de impuestos convirtió en costa de otro país|Le port qu'un différend fiscal a fait entrer dans un autre pays|関税紛争が国境ごと塗り替えた港",
    "In February 1878 Bolivia's government imposed a new tax of ten centavos per quintal on nitrate exported from this port — a retroactive charge that broke an earlier border treaty — aimed squarely at the Chilean- and British-financed Antofagasta Nitrate and Railway Company; when Bolivia seized and auctioned off the company's assets on 14 February 1879, Chilean troops occupied the town that same day, and Chile declared war on Bolivia and Peru seven weeks later. The same railway line still hauls Bolivian minerals down to these docks today, because the 1904 peace treaty granted Bolivia free transit rights through the port it had lost.|En febrero de 1878, el gobierno de Bolivia impuso un nuevo impuesto de diez centavos por quintal a las exportaciones de salitre desde este puerto —un cobro retroactivo que violaba un tratado fronterizo anterior— dirigido de lleno a la Compañía de Salitres y Ferrocarril de Antofagasta, de capital chileno y británico; cuando Bolivia embargó y sacó a remate los bienes de la empresa el 14 de febrero de 1879, tropas chilenas ocuparon el pueblo ese mismo día, y Chile declaró la guerra a Bolivia y Perú siete semanas después. El mismo ferrocarril sigue bajando hoy minerales bolivianos hasta estos muelles, porque el tratado de paz de 1904 le dio a Bolivia libre tránsito por el puerto que había perdido.|En février 1878, le gouvernement bolivien imposa une nouvelle taxe de dix centavos par quintal sur le salpêtre exporté depuis ce port — une charge rétroactive qui violait un traité frontalier antérieur — visant directement la Compañía de Salitres y Ferrocarril de Antofagasta, à capitaux chiliens et britanniques ; lorsque la Bolivie saisit et mit aux enchères les biens de la compagnie le 14 février 1879, des troupes chiliennes occupèrent la ville ce jour même, et le Chili déclara la guerre à la Bolivie et au Pérou sept semaines plus tard. La même voie ferrée transporte encore aujourd'hui des minerais boliviens jusqu'à ces quais, car le traité de paix de 1904 accorda à la Bolivie le libre transit par le port qu'elle avait perdu.|1878年2月、ボリビア政府はこの港から積み出される硝石に対し、1キンタルあたり10センターボの新税を課した。これは以前の国境条約に反する遡及的な課税で、チリ・英資本の「アントファガスタ硝石鉄道会社」を狙い撃ちにしたものだった。1879年2月14日、ボリビアが同社の資産を差し押さえて競売にかけると、その同じ日にチリ軍は町を占領し、7週間後にチリはボリビア・ペルー両国に宣戦した。同じ鉄道はいまもボリビアの鉱物をこの埠頭まで運び続けている。1904年の講和条約が、失った港を無税で通過する権利をボリビアに認めたからである。",
    [prop("Nitrate Railway Wharf|Muelle del ferrocarril salitrero|Quai du chemin de fer du salpêtre|硝石鉄道の埠頭", 950, 195),
     prop("Bolivian Transit Warehouse|Almacén de tránsito boliviano|Entrepôt de transit bolivien|ボリビア通過貨物の倉庫", 260, 54)],
  ),

  humberstone: city(
    "Humberstone|Humberstone|Humberstone|ウンベルストネ",
    -69.78, -20.22, "ng", "ghosttheater", "saltpeterghost", "l",
    "A town built for ten thousand, now for no one|Un pueblo construido para diez mil, ahora para nadie|Un bourg bâti pour dix mille habitants, aujourd'hui pour personne|1万人のために建てた町、いまは誰もいない",
    "Renamed in 1925 after the British engineer James Humberstone, who had refined the Shanks process used to extract nitrate from the desert's caliche ore, this company town paid its workers partly in fichas — tokens that could only be spent at the company's own store — and built them a wooden theatre and a swimming pool welded from a ship's iron hull. The office closed for good in 1960 as cheaper synthetic fertiliser finished off the industry that Chile's Atacama nitrate boom had depended on for a century; UNESCO listed its empty streets as a World Heritage Site in 2005.|Renombrado en 1925 en honor al ingeniero británico James Humberstone, quien perfeccionó el proceso Shanks para extraer salitre del caliche del desierto, este pueblo minero pagaba a sus obreros en parte con fichas —solo canjeables en la pulpería de la propia empresa— y les construyó un teatro de madera y una piscina soldada con el casco de hierro de un barco. La oficina cerró definitivamente en 1960, cuando el fertilizante sintético más barato acabó con la industria de la que había dependido durante un siglo el auge salitrero de Atacama; la UNESCO declaró sus calles vacías Patrimonio de la Humanidad en 2005.|Rebaptisée en 1925 en l'honneur de l'ingénieur britannique James Humberstone, qui perfectionna le procédé Shanks pour extraire le salpêtre du caliche du désert, cette ville-usine payait ses ouvriers en partie avec des fichas — des jetons utilisables seulement à l'épicerie de la compagnie — et leur construisit un théâtre en bois et une piscine soudée dans la coque en fer d'un navire. Le bureau ferma définitivement en 1960, quand l'engrais synthétique moins cher acheva l'industrie dont avait dépendu pendant un siècle l'essor du salpêtre d'Atacama ; l'UNESCO inscrivit ses rues vides au patrimoine mondial en 2005.|1925年、砂漠のカリチェ鉱石から硝石を取り出すシャンクス法を改良した英国人技師ジェームズ・ウンベルストネにちなんで改名されたこの企業城下町では、労働者への賃金の一部が「フィチャ」と呼ばれる社内通貨で払われ、会社直営の売店でしか使えなかった。それでも木造の劇場や、船体の鉄板を溶接して作ったプールまで備えていた。1960年、より安い合成肥料が、1世紀にわたってアタカマの硝石景気を支えた産業にとどめを刺し、事務所は永久に閉鎖された。2005年、ユネスコはこの無人の通りを世界遺産に登録した。",
    [prop("Company Pulpería Store|Pulpería de la compañía|Épicerie de la compagnie|会社直営のプルペリア", 220, 46),
     prop("Wooden Theatre Building|Teatro de madera|Théâtre en bois|木造劇場の建物", 280, 58)],
  ),

  arica: city(
    "Arica|Arica|Arica|アリカ",
    -70.31, -18.48, "ng", "morroguns", "desertport", "l",
    "The cliff a battle decided a border|El acantilado que una batalla decidió como frontera|La falaise qu'une bataille transforma en frontière|崖の戦いが国境を決めた",
    "On 7 June 1880, Chilean troops stormed the fortified clifftop of the Morro above this city in under an hour, ending organised Peruvian resistance in the region; the defending Peruvian commander died rather than surrender, and is remembered today as a national hero across the border. The 1929 treaty that finally settled the war kept Arica for Chile while returning Tacna to Peru, and a separate railway completed in 1913 still carries Bolivian cargo down to Arica's port under its own treaty-guaranteed transit rights.|El 7 de junio de 1880, tropas chilenas asaltaron en menos de una hora la cima fortificada del Morro sobre esta ciudad, acabando con la resistencia peruana organizada en la región; el comandante peruano que la defendía murió antes que rendirse, y hoy se le recuerda como héroe nacional al otro lado de la frontera. El tratado de 1929 que por fin cerró la guerra dejó Arica para Chile mientras devolvía Tacna al Perú, y un ferrocarril distinto, terminado en 1913, todavía baja carga boliviana hasta el puerto de Arica bajo su propio derecho de tránsito garantizado por tratado.|Le 7 juin 1880, des troupes chiliennes prirent d'assaut en moins d'une heure le sommet fortifié du Morro dominant cette ville, mettant fin à la résistance péruvienne organisée dans la région ; le commandant péruvien qui la défendait mourut plutôt que de se rendre, et il est aujourd'hui honoré comme héros national de l'autre côté de la frontière. Le traité de 1929 qui régla enfin la guerre laissa Arica au Chili tout en rendant Tacna au Pérou, et une voie ferrée distincte, achevée en 1913, transporte encore aujourd'hui du fret bolivien jusqu'au port d'Arica en vertu de son propre droit de transit garanti par traité.|1880年6月7日、チリ軍はこの町の上にそびえる要塞化された岩山モロを1時間足らずで攻略し、この地域でのペルー側の組織的抵抗を終わらせた。守備を指揮したペルー軍の司令官は降伏を拒んで戦死し、いまも国境の向こうでは国民的英雄として記憶されている。1929年、この戦争をようやく決着させた条約でアリカはチリ領のまま残り、タクナはペルーへ返還された。1913年に完成した別の鉄道は、いまも独自の条約上の通過権のもとでボリビアの貨物をアリカ港まで運び続けている。",
    [prop("Morro Clifftop Overlook|Mirador de la cima del Morro|Belvédère du sommet du Morro|モロの崖上展望台", 320, 66),
     prop("Arica–La Paz Rail Yard|Patio del ferrocarril Arica–La Paz|Cour du chemin de fer Arica–La Paz|アリカ・ラパス鉄道の操車場", 280, 58)],
  ),

  iquique: city(
    "Iquique|Iquique|Iquique|イキケ",
    -70.15, -20.21, "ng", "santamariaflag", "desertport", "r",
    "The port where a strike ended in massacre|El puerto donde una huelga terminó en masacre|Le port où une grève finit en massacre|ストライキが虐殺に終わった港",
    "On 21 December 1907, army troops opened fire on nitrate workers and their families who had gathered at the Santa María school to demand wages paid in real currency instead of company tokens; estimates of the dead range from several hundred to more than two thousand, and no one was ever prosecuted. Iquique's nitrate-era wealth also built the ornate wooden Palacio Astoreca and one of Chile's oldest working theatres, monuments to a boom that would collapse within two decades of the massacre.|El 21 de diciembre de 1907, tropas del ejército abrieron fuego contra obreros salitreros y sus familias reunidos en la escuela Santa María para exigir el pago de salarios en moneda real en vez de fichas de la empresa; las cifras de muertos van de varios cientos a más de dos mil, y nadie fue procesado jamás. La riqueza salitrera de Iquique también construyó el ornamentado Palacio Astoreca y uno de los teatros en funcionamiento más antiguos de Chile, monumentos a un auge que se derrumbaría a menos de dos décadas de la masacre.|Le 21 décembre 1907, des troupes de l'armée ouvrirent le feu sur des ouvriers du salpêtre et leurs familles réunis à l'école Santa María pour exiger d'être payés en monnaie réelle plutôt qu'en jetons de la compagnie ; les estimations du nombre de morts vont de plusieurs centaines à plus de deux mille, et personne ne fut jamais poursuivi. La richesse d'Iquique à l'époque du salpêtre bâtit aussi l'ornemental Palacio Astoreca et l'un des plus vieux théâtres encore en activité au Chili, monuments d'un essor qui s'effondrerait moins de deux décennies après le massacre.|1907年12月21日、軍隊は賃金を会社通貨ではなく実通貨で払うよう求めてサンタ・マリア学校に集まった硝石労働者とその家族に発砲した。死者数は諸説あり数百人から2000人を超えるとする推計まであるが、誰一人として訴追されなかった。硝石景気で得た富はまた、装飾豊かな木造のアストレカ宮殿や、チリで最古級のいまも使われる劇場を築いた。その好況は、この虐殺から20年も経たずに崩れ去ることになる。",
    [prop("Santa María School Memorial|Memorial de la Escuela Santa María|Mémorial de l'école Santa María|サンタ・マリア学校の慰霊碑", 260, 54),
     prop("Palacio Astoreca Courtyard|Patio del Palacio Astoreca|Cour du Palacio Astoreca|アストレカ宮殿の中庭", 800, 164)],
  ),

  mariaelena: city(
    "María Elena|María Elena|María Elena|マリア・エレナ",
    -69.67, -22.35, "ng", "lastoficina", "livingoficina", "l",
    "The only nitrate works still running|La única oficina salitrera que aún funciona|La seule usine de salpêtre encore en activité|いまも動く唯一の硝石工場",
    "Named after the wife of one of its founders, María Elena is the last nitrate works still operating in Chile, now producing potassium nitrate and iodine rather than the explosives-grade saltpetre that once dominated the trade. Its sister town Pedro de Valdivia, just down the same railway, was abandoned and partly dismantled in the 1990s, while María Elena's workers still live in company-built housing arranged in the same grid used across the nitrate pampa a century ago.|Bautizada en honor a la esposa de uno de sus fundadores, María Elena es la última oficina salitrera que sigue funcionando en Chile, produciendo hoy nitrato de potasio y yodo en vez del salitre para explosivos que antes dominaba el comercio. Su pueblo hermano, Pedro de Valdivia, un poco más adelante en el mismo ferrocarril, fue abandonado y parcialmente desmantelado en los años noventa, mientras que los trabajadores de María Elena aún viven en viviendas construidas por la empresa, dispuestas en la misma cuadrícula usada en toda la pampa salitrera hace un siglo.|Nommée d'après l'épouse de l'un de ses fondateurs, María Elena est la dernière usine de salpêtre encore en activité au Chili, produisant aujourd'hui du nitrate de potassium et de l'iode plutôt que le salpêtre de qualité explosive qui dominait autrefois le commerce. Sa ville sœur, Pedro de Valdivia, un peu plus loin sur la même voie ferrée, fut abandonnée et partiellement démantelée dans les années 1990, tandis que les ouvriers de María Elena vivent encore dans des logements construits par la compagnie, disposés selon la même grille utilisée dans toute la pampa salitrière il y a un siècle.|創設者の一人の妻の名にちなんで名づけられたマリア・エレナは、チリでいまも操業を続ける唯一の硝石工場である。かつて貿易を支配した爆薬用の硝石ではなく、いまは硝酸カリウムとヨウ素を生産する。同じ鉄道の先にある姉妹町ペドロ・デ・バルディビアは1990年代に放棄され、一部は解体された。一方マリア・エレナの労働者はいまも、1世紀前に硝石地帯全域で使われたのと同じ碁盤目状に配置された会社住宅に暮らしている。",
    [prop("Iodine Processing Plant|Planta de procesamiento de yodo|Usine de traitement de l'iode|ヨウ素精製プラント", 300, 62),
     prop("Company Grid Housing Block|Bloque de viviendas en cuadrícula|Pâté de logements en grille|碁盤目状の会社住宅街区", 220, 46)],
  ),

  calama: city(
    "Calama|Calama|Calama|カラマ",
    -68.93, -22.46, "ng", "coppertrain", "openpitcopper", "r",
    "The desert town copper keeps alive|El pueblo del desierto que el cobre mantiene vivo|La ville du désert que le cuivre maintient en vie|銅が生かし続ける砂漠の町",
    "Calama sits beside Chuquicamata, one of the largest open-pit copper mines ever dug, and the railway that once hauled nitrate through this stretch of desert now mostly moves copper concentrate and mine workers instead. The nearby Loa river is the only river that crosses the Atacama Desert all the way from the Andes to the Pacific, and Calama draws almost all of its water from it.|Calama está junto a Chuquicamata, una de las minas de cobre a tajo abierto más grandes jamás excavadas, y el ferrocarril que antes transportaba salitre por este tramo del desierto hoy mueve sobre todo concentrado de cobre y trabajadores mineros. El cercano río Loa es el único que cruza el desierto de Atacama de punta a punta, desde los Andes hasta el Pacífico, y Calama obtiene de él casi toda su agua.|Calama se trouve à côté de Chuquicamata, l'une des plus grandes mines de cuivre à ciel ouvert jamais creusées, et le chemin de fer qui transportait autrefois le salpêtre à travers ce tronçon du désert déplace aujourd'hui surtout du concentré de cuivre et des mineurs. Le fleuve Loa tout proche est le seul cours d'eau qui traverse le désert d'Atacama de bout en bout, des Andes jusqu'au Pacifique, et Calama y puise presque toute son eau.|カラマは、これまでに掘られた中でも最大級の露天掘り銅山チュキカマタのそばにある。かつてこの一帯の砂漠で硝石を運んだ鉄道は、いまでは主に銅精鉱と鉱山労働者を運んでいる。近くを流れるロア川は、アンデスから太平洋までアタカマ砂漠を端から端まで横切る唯一の川で、カラマはその水のほぼすべてをここから得ている。",
    [prop("Copper Concentrate Siding|Apartadero de concentrado de cobre|Voie de garage du concentré de cuivre|銅精鉱の側線", 340, 70),
     prop("Loa River Pumping Station|Estación de bombeo del río Loa|Station de pompage du fleuve Loa|ロア川の揚水場", 260, 54)],
  ),

  chuquicamata: city(
    "Chuquicamata|Chuquicamata|Chuquicamata|チュキカマタ",
    -68.90, -22.32, "ng", "abandonedpit", "openpitcopper", "l",
    "A whole town moved for the hole beneath it|Un pueblo entero trasladado por el hoyo bajo sus pies|Une ville entière déplacée pour le trou sous ses pieds|足元の穴のために丸ごと移された町",
    "Chuquicamata's open pit, worked since 1915, grew so wide and so polluted with mine dust that the state copper company relocated its entire remaining population to new housing in nearby Calama during the 2000s, leaving the old town's houses, church and cinema standing empty. The pit itself, several kilometres long, is one of the largest excavated by machinery anywhere on Earth.|El tajo abierto de Chuquicamata, explotado desde 1915, se ensanchó tanto y se contaminó tanto con polvo minero que la empresa estatal del cobre trasladó a toda su población restante a nuevas viviendas en la cercana Calama durante la década de 2000, dejando en pie, vacías, las casas, la iglesia y el cine del pueblo viejo. El propio tajo, de varios kilómetros de largo, es uno de los más grandes excavados con maquinaria en cualquier parte del planeta.|La fosse à ciel ouvert de Chuquicamata, exploitée depuis 1915, s'élargit tant et se pollua tant de poussière minière que l'entreprise publique du cuivre relogea toute sa population restante dans de nouveaux logements à Calama, toute proche, durant les années 2000, laissant vides les maisons, l'église et le cinéma du vieux bourg. La fosse elle-même, longue de plusieurs kilomètres, est l'une des plus grandes jamais excavées par des machines sur Terre.|1915年から掘られてきたチュキカマタの露天掘り鉱山は、あまりに広がり、鉱山の粉塵で汚染されたため、国営銅会社は2000年代のうちに残っていた住民全員を近くのカラマの新しい住宅へ移した。旧市街の家々や教会、映画館はそのまま空のまま残されている。採掘穴そのものは全長数キロメートルにおよび、機械で掘られたものとしては地球上でも最大級である。",
    [prop("Empty Company Church|Iglesia vacía de la compañía|Église vide de la compagnie|会社が建てた無人の教会", 240, 50),
     prop("Pit-Rim Viewing Platform|Mirador del borde del tajo|Plateforme d'observation du bord de fosse|採掘穴の縁の展望台", 300, 62)],
  ),

  copiapo: city(
    "Copiapó|Copiapó|Copiapó|コピアポ",
    -70.33, -27.37, "ng", "minerescue", "miningcolonial", "r",
    "33 miners, 69 days, one shaft|33 mineros, 69 días, un solo pique|33 mineurs, 69 jours, un seul puits|33人の鉱夫、69日、1本の縦坑",
    "In August 2010 a collapse trapped 33 miners nearly 700 metres underground at the San José mine north of this city; all 33 were brought up alive 69 days later through a narrow rescue shaft, watched live by a television audience estimated in the hundreds of millions worldwide. Copiapó had already made history once before: silver discovered nearby in 1832 financed South America's first railway, which opened in 1851 to carry ore down to the coast.|En agosto de 2010, un derrumbe atrapó a 33 mineros a casi 700 metros bajo tierra en la mina San José, al norte de esta ciudad; los 33 fueron sacados con vida 69 días después por un estrecho pique de rescate, seguido en vivo por una audiencia televisiva estimada en cientos de millones en todo el mundo. Copiapó ya había hecho historia antes: la plata descubierta cerca en 1832 financió el primer ferrocarril de Sudamérica, inaugurado en 1851 para bajar el mineral hasta la costa.|En août 2010, un effondrement piégea 33 mineurs à près de 700 mètres sous terre à la mine San José, au nord de cette ville ; les 33 furent remontés vivants 69 jours plus tard par un étroit puits de secours, suivis en direct par une audience télévisée estimée à des centaines de millions de personnes dans le monde. Copiapó avait déjà fait l'histoire une première fois : l'argent découvert à proximité en 1832 finança le premier chemin de fer d'Amérique du Sud, ouvert en 1851 pour descendre le minerai jusqu'à la côte.|2010年8月、この町の北にあるサン・ホセ鉱山で落盤が起き、33人の鉱夫が地下ほぼ700メートルに閉じ込められた。69日後、全員が細い救出用縦坑を通って生きて地上に戻り、その様子は世界で推定数億人がテレビで生中継を見守った。コピアポはそれ以前にも歴史を作っていた。1832年に近郊で発見された銀が資金源となり、1851年に鉱石を海岸まで下ろすための南アメリカ初の鉄道が開業したのである。",
    [prop("Rescue Shaft Memorial|Memorial del pique de rescate|Mémorial du puits de secours|救出縦坑の記念碑", 280, 58),
     prop("Ore Assay Office|Oficina de ensaye de mineral|Bureau d'essai du minerai|鉱石の分析事務所", 220, 46)],
  ),

  caldera: city(
    "Caldera|Caldera|Caldera|カルデラ",
    -70.82, -27.07, "ng", "firstrail", "miningcolonial", "l",
    "Where South America's first railway began|Donde empezó el primer ferrocarril de Sudamérica|Là où commença le premier chemin de fer d'Amérique du Sud|南アメリカ初の鉄道が始まった場所",
    "The railway from here to Copiapó opened in 1851 to carry silver ore down from the mines discovered at Chañarcillo in 1832, making it South America's first operating railway; the American entrepreneur William Wheelwright organised its financing and later applied the same model to lines and steamship routes elsewhere on the continent. The desert port that grew up around the terminus still keeps its nineteenth-century grid, laid out for a railway rather than for people.|El ferrocarril de aquí a Copiapó se inauguró en 1851 para bajar la plata de las minas descubiertas en Chañarcillo en 1832, lo que lo convirtió en el primer ferrocarril en funcionamiento de Sudamérica; el empresario estadounidense William Wheelwright organizó su financiamiento y luego aplicó el mismo modelo a otras líneas y rutas de vapores en el continente. El puerto desértico que creció en torno a la terminal aún conserva su trazado del siglo XIX, pensado para un ferrocarril y no para la gente.|Le chemin de fer d'ici à Copiapó ouvrit en 1851 pour descendre l'argent des mines découvertes à Chañarcillo en 1832, ce qui en fit le premier chemin de fer en service d'Amérique du Sud ; l'entrepreneur américain William Wheelwright en organisa le financement et appliqua ensuite le même modèle à d'autres lignes et routes de vapeurs sur le continent. Le port désertique qui grandit autour du terminus garde encore son tracé du XIXe siècle, conçu pour un chemin de fer plutôt que pour des habitants.|ここからコピアポまでの鉄道は、1832年にチャニャルシージョで発見された鉱山から銀鉱石を運び下ろすため1851年に開業し、南アメリカで最初に営業した鉄道となった。アメリカ人実業家ウィリアム・ホイールライトがその資金調達を取りまとめ、のちに同じ手法を大陸の他の路線や汽船航路にも応用した。終着駅の周りに育った砂漠の港町は、いまも人のためではなく鉄道のために引かれた19世紀の街路割りを保っている。",
    [prop("1851 Terminus Building|Edificio de la terminal de 1851|Bâtiment du terminus de 1851|1851年開業の終着駅舎", 300, 62),
     prop("Grid-Plan Port Warehouse|Bodega portuaria de trazado reticular|Entrepôt portuaire au plan quadrillé|碁盤目状の港湾倉庫", 220, 46)],
  ),

  chanaral: city(
    "Chañaral|Chañaral|Chañaral|チャニャラル",
    -70.62, -26.35, "ng", "tailingsbay", "coastalpollution", "r",
    "A bay filled in with mine waste|Una bahía rellenada con relaves mineros|Une baie comblée par des résidus miniers|鉱山廃滓で埋まった湾",
    "For decades, copper mines upstream dumped their tailings directly into the Salado river, which carried them down to Chañaral's bay and filled in so much of the shoreline that the beach grew hundreds of metres wider, made of ground copper waste rather than sand. The dumping was banned in 1975 and the mine built a tailings dam inland instead, but the bay's sediment is still monitored for heavy metals today.|Durante décadas, las minas de cobre río arriba vertieron sus relaves directamente al río Salado, que los arrastró hasta la bahía de Chañaral y rellenó tanto la orilla que la playa se ensanchó cientos de metros, hecha de relave de cobre molido en vez de arena. El vertido se prohibió en 1975 y la mina construyó en cambio un tranque de relaves tierra adentro, pero el sedimento de la bahía todavía se monitorea por metales pesados.|Pendant des décennies, les mines de cuivre en amont déversèrent leurs résidus directement dans le fleuve Salado, qui les charria jusqu'à la baie de Chañaral et combla tant le rivage que la plage s'élargit de centaines de mètres, faite de résidus de cuivre broyé plutôt que de sable. Le déversement fut interdit en 1975 et la mine construisit à la place un bassin de résidus à l'intérieur des terres, mais le sédiment de la baie est encore surveillé pour ses métaux lourds aujourd'hui.|数十年にわたり、上流の銅鉱山は鉱滓をサラード川に直接流し込み、それがチャニャラルの湾まで運ばれて海岸線を大きく埋め立て、砂ではなく砕かれた銅の廃滓でできた浜辺が数百メートルも広がった。この投棄は1975年に禁止され、鉱山は代わりに内陸に尾鉱ダムを建設したが、湾の堆積物はいまも重金属について監視され続けている。",
    [prop("Tailings-Sand Beach Overlook|Mirador de la playa de relave|Belvédère de la plage de résidus|鉱滓の浜を望む展望台", 200, 42),
     prop("River Mouth Monitoring Post|Puesto de monitoreo en la desembocadura|Poste de surveillance de l'embouchure|河口の監視所", 180, 38)],
  ),

  // ---------------------------------------------------------------------
  // nc — ノルテ・チコ(小さな北、遷移地帯。エルキ渓谷・天文台・ピスコ)
  // ---------------------------------------------------------------------
  laserena: city(
    "La Serena|La Serena|La Serena|ラ・セレナ",
    -71.25, -29.90, "nc", "colonialdome", "astronomyvalley", "l",
    "Chile's second-oldest city, rebuilt to look older|La segunda ciudad más antigua de Chile, reconstruida para parecer más vieja|La deuxième plus ancienne ville du Chili, reconstruite pour paraître plus ancienne|より古く見えるよう建て替えられた、チリ2番目に古い町",
    "Founded in 1544, La Serena is Chile's second-oldest continuously settled city, but most of its neo-colonial domes and arcades actually date from a 1948 remodelling ordered by a local senator who wanted the city to look the way he imagined its founding era, not the way it had actually grown. Clear, dry night skies nearby have made the region home to some of the world's largest optical observatories, including Cerro Tololo, sited in the semi-arid country here rather than the hyper-arid Atacama further north.|Fundada en 1544, La Serena es la segunda ciudad chilena poblada sin interrupción más antigua, pero la mayoría de sus cúpulas y arcadas neocoloniales datan en realidad de una remodelación de 1948 ordenada por un senador local que quería que la ciudad se viera como él imaginaba su época fundacional, no como realmente había crecido. Los cielos nocturnos, despejados y secos, han hecho de la región sede de algunos de los mayores observatorios ópticos del mundo, entre ellos Cerro Tololo, situado en este territorio semiárido y no en el Atacama hiperárido más al norte.|Fondée en 1544, La Serena est la deuxième plus ancienne ville chilienne peuplée sans interruption, mais la plupart de ses dômes et arcades néocoloniaux datent en réalité d'un remodelage de 1948 ordonné par un sénateur local qui voulait que la ville ressemble à l'image qu'il se faisait de son époque fondatrice, et non à la manière dont elle avait vraiment grandi. Des ciels nocturnes clairs et secs ont fait de la région le siège de certains des plus grands observatoires optiques au monde, dont Cerro Tololo, situé dans cette contrée semi-aride plutôt que dans l'Atacama hyperaride plus au nord.|1544年に建てられたラ・セレナは、チリで途切れず人が住み続けている町としては2番目に古い。しかし、いまあるネオコロニアル様式のドームやアーケードの多くは、実際には1948年、地元出身の上院議員が「町がこうであってほしい」と思い描いた創建期の姿に合わせて命じた改造の産物であり、実際に町がたどってきた歴史そのままではない。澄んで乾いた夜空のおかげで、この地域は世界有数の大型光学望遠鏡の拠点になっており、セロ・トロロもその一つだが、これはさらに北の超乾燥のアタカマではなく、この半乾燥の土地に置かれている。",
    [prop("Neo-Colonial Arcade Shop|Local de la arcada neocolonial|Boutique de l'arcade néocoloniale|ネオコロニアル様式のアーケード店舗", 260, 54),
     prop("Observatory Access Road Inn|Posada del camino al observatorio|Auberge de la route de l'observatoire|天文台へ続く道の宿", 240, 50)],
  ),

  coquimbo: city(
    "Coquimbo|Coquimbo|Coquimbo|コキンボ",
    -71.34, -29.95, "nc", "millenniumcross", "astronomyvalley", "r",
    "A giant cross built for a millennium already past|Una cruz gigante construida para un milenio ya pasado|Une croix géante bâtie pour un millénaire déjà passé|過ぎ去った千年紀のために建てた巨大な十字架",
    "A concrete cross over 80 metres tall overlooking the bay, built to mark the year 2000, is now taller than almost anything else in a port city that has spent much of its history as La Serena's working harbour, moving copper and, once, nitrate. English and Cornish miners settled here in the nineteenth century to work the copper trade, leaving behind a scattering of Anglican graves and English surnames still found in the city today.|Una cruz de hormigón de más de 80 metros que domina la bahía, construida para conmemorar el año 2000, es hoy más alta que casi cualquier otra cosa en una ciudad portuaria que ha pasado buena parte de su historia como el puerto de trabajo de La Serena, moviendo cobre y, en su momento, salitre. Mineros ingleses y de Cornualles se asentaron aquí en el siglo XIX para trabajar en el cobre, dejando un puñado de tumbas anglicanas y apellidos ingleses que aún se encuentran en la ciudad.|Une croix de béton de plus de 80 mètres dominant la baie, construite pour marquer l'an 2000, dépasse aujourd'hui presque tout le reste dans une ville portuaire qui a passé une bonne partie de son histoire comme le port de travail de La Serena, acheminant du cuivre et, autrefois, du salpêtre. Des mineurs anglais et de Cornouailles s'y installèrent au XIXe siècle pour travailler le cuivre, laissant derrière eux quelques tombes anglicanes et des noms de famille anglais que l'on trouve encore dans la ville.|湾を見下ろす高さ80メートルを超えるコンクリート製の十字架は、2000年を記念して建てられ、いまではこの港町のほとんど何よりも高くそびえている。この町は歴史の多くをラ・セレナの実働の港として過ごし、銅を、かつては硝石も運んできた。19世紀にはイギリス人やコーンウォール出身の鉱夫たちが銅の商いのためにここに住みつき、いまも町にはイギリス風の姓や英国国教会の墓がわずかに残っている。",
    [prop("Millennium Cross Viewpoint|Mirador de la Cruz del Milenio|Point de vue de la Croix du Millénaire|ミレニアムクロスの展望台", 240, 50),
     prop("English Miners' Cemetery Plot|Parcela del cementerio de mineros ingleses|Parcelle du cimetière des mineurs anglais|英国人鉱夫墓地の一画", 180, 38)],
  ),

  vicuna: city(
    "Vicuña|Vicuña|Vicuña|ビクーニャ",
    -70.71, -30.03, "nc", "mistralhouse", "elquivalley", "l",
    "The valley that gave Chile its first Nobel|El valle que le dio a Chile su primer Nobel|La vallée qui donna au Chili son premier Nobel|チリに最初のノーベル賞をもたらした谷",
    "Gabriela Mistral, born here in 1889, became the first Latin American writer to win the Nobel Prize in Literature, awarded in 1945, and her childhood home in the Elqui valley is now a museum built around the original adobe walls. The same clear, dry air she wrote about now supports both pisco distilleries, which need steady sun to ripen muscat grapes, and some of the darkest skies left in Chile for stargazing tourism.|Gabriela Mistral, nacida aquí en 1889, fue la primera escritora latinoamericana en ganar el Premio Nobel de Literatura, otorgado en 1945, y su casa de infancia en el valle de Elqui es hoy un museo construido en torno a los muros de adobe originales. El mismo aire seco y despejado sobre el que escribió sostiene hoy tanto las destilerías de pisco, que necesitan sol constante para madurar la uva moscatel, como algunos de los cielos más oscuros que quedan en Chile para el turismo de observación de estrellas.|Gabriela Mistral, née ici en 1889, fut la première écrivaine latino-américaine à remporter le prix Nobel de littérature, décerné en 1945, et sa maison d'enfance dans la vallée de l'Elqui est aujourd'hui un musée bâti autour des murs d'adobe d'origine. Le même air clair et sec dont elle parlait dans ses écrits soutient aujourd'hui à la fois les distilleries de pisco, qui ont besoin d'un soleil constant pour mûrir le raisin muscat, et certains des ciels les plus sombres qu'il reste au Chili pour le tourisme d'observation des étoiles.|1889年にここで生まれたガブリエラ・ミストラルは、1945年にノーベル文学賞を受けたラテンアメリカ初の作家となった。彼女が育ったエルキ渓谷の生家は、いまはもとの日干しレンガの壁を生かした博物館になっている。彼女が詩に書いたのと同じ澄んだ乾いた空気は、いまマスカット種のブドウを熟させる安定した日照を必要とするピスコの蒸留所と、チリに残る星空観光地の中でも指折りに暗い夜空の両方を支えている。",
    [prop("Mistral Birthplace Museum|Museo de la casa natal de Mistral|Musée de la maison natale de Mistral|ミストラル生家の博物館", 280, 58),
     prop("Pisco Distillery Cellar|Bodega de la destilería de pisco|Cave de la distillerie de pisco|ピスコ蒸留所の貯蔵庫", 220, 46)],
  ),

  ovalle: city(
    "Ovalle|Ovalle|Ovalle|オバジェ",
    -71.20, -30.60, "nc", "limarivineyard", "elquivalley", "r",
    "A valley that turned scarce water into fruit|Un valle que convirtió el agua escasa en fruta|Une vallée qui a transformé l'eau rare en fruits|乏しい水を果実に変えた谷",
    "The Limarí valley around Ovalle depends on a chain of reservoirs built through the twentieth century to store the region's irregular rainfall, without which the area's export vineyards and papaya orchards could not exist in what is otherwise a semi-arid landscape. A weekly market held here since colonial times still trades goat cheese and dried fruit brought down from small farms in the surrounding hills.|El valle del Limarí en torno a Ovalle depende de una cadena de embalses construidos a lo largo del siglo XX para almacenar las lluvias irregulares de la región, sin los cuales los viñedos de exportación y los huertos de papayo de la zona no podrían existir en lo que de otro modo sería un paisaje semiárido. Una feria semanal celebrada aquí desde la época colonial todavía comercia queso de cabra y fruta seca bajada de pequeñas granjas en los cerros vecinos.|La vallée du Limarí autour d'Ovalle dépend d'une chaîne de barrages construits tout au long du XXe siècle pour stocker les pluies irrégulières de la région, sans lesquels les vignobles d'exportation et les vergers de papayers du secteur ne pourraient exister dans ce qui serait sinon un paysage semi-aride. Un marché hebdomadaire tenu ici depuis l'époque coloniale échange encore du fromage de chèvre et des fruits secs descendus de petites fermes des collines environnantes.|オバジェを囲むリマリ渓谷は、この地域の不安定な降雨を蓄えるために20世紀を通じて築かれた一連の貯水池に頼っている。それが無ければ、本来なら半乾燥のこの土地で輸出用のブドウ畑やパパイア果樹園は成り立たない。植民地時代から続く週市は、いまも周囲の丘の小さな農家から下りてくるヤギのチーズと乾燥果実を商っている。",
    [prop("Reservoir-Fed Vineyard Plot|Parcela de viñedo regada por embalse|Parcelle de vigne irriguée par barrage|貯水池灌漑のブドウ畑", 240, 50),
     prop("Colonial Market Stall|Puesto del mercado colonial|Étal du marché colonial|植民地時代からの市場の屋台", 180, 38)],
  ),

  illapel: city(
    "Illapel|Illapel|Illapel|イジャペル",
    -71.17, -31.63, "nc", "narrowestpoint", "elquivalley", "b",
    "The country's narrowest waist|La cintura más angosta del país|La taille la plus étroite du pays|国のいちばん細い腰",
    "Near this town Chile narrows to close to its thinnest point between the Pacific coast and the Argentine border, a reminder that the country's famous length was never matched by width. Copper and gold have been mined in the surrounding hills since colonial times, and the town's church and plaza still follow the same grid the Spanish laid out when it was founded in 1754.|Cerca de este pueblo Chile se angosta hasta casi su punto más delgado entre la costa del Pacífico y la frontera argentina, un recordatorio de que la famosa longitud del país nunca vino acompañada de anchura. El cobre y el oro se han extraído en los cerros vecinos desde la época colonial, y la iglesia y la plaza del pueblo aún siguen la misma cuadrícula trazada por los españoles al fundarlo en 1754.|Près de ce bourg, le Chili se rétrécit presque jusqu'à son point le plus étroit entre la côte pacifique et la frontière argentine, un rappel que la longueur célèbre du pays n'a jamais été égalée par sa largeur. Le cuivre et l'or sont extraits des collines environnantes depuis l'époque coloniale, et l'église et la place du bourg suivent encore la même grille tracée par les Espagnols lors de sa fondation en 1754.|この町の近くで、チリは太平洋岸とアルゼンチン国境のあいだでいちばん細い部分に近づく。この国の名高い長さには、決して同じだけの幅が伴っていなかったことを思い出させる場所である。周囲の丘では植民地時代から銅と金が採られてきており、町の教会と広場は、1754年の町の創建時にスペイン人が引いたのと同じ街路割りをいまも保っている。",
    [prop("Colonial Grid Plaza Shop|Local en la plaza de cuadrícula colonial|Boutique de la place au plan colonial|植民地の街路割りの広場の店", 200, 42),
     prop("Hillside Copper Claim|Concesión de cobre en el cerro|Concession de cuivre à flanc de colline|丘の銅採掘権", 180, 38)],
  ),

  // ---------------------------------------------------------------------
  // ce — セントラル(首都圏・谷・ワイン産地。人口の大半が集まる)
  // ---------------------------------------------------------------------
  santiago: city(
    "Santiago|Santiago|Santiago|サンティアゴ",
    -70.67, -33.45, "ce", "centralstation", "andessmog", "l",
    "A capital that can vanish its own backdrop|Una capital que puede hacer desaparecer su propio telón de fondo|Une capitale capable de faire disparaître son propre décor|自分の背景を消してしまう首都",
    "Ringed by the Andes on one side and a coastal range on the other, Santiago sits in a basin that traps vehicle and wood-stove smoke so effectively that on the worst winter days the snow-capped mountains vanish entirely from a city they otherwise loom directly over. Long-distance passenger trains have mostly disappeared from the network that once radiated out from Estación Central; today the station mainly sends commuter trains south, a fraction of the routes that made railways, for decades, the only practical way to travel the length of the country.|Rodeado por los Andes por un lado y la cordillera de la Costa por el otro, Santiago se asienta en una cuenca que atrapa tan bien el humo de los vehículos y las estufas a leña que, en los peores días de invierno, las montañas nevadas desaparecen por completo de una ciudad sobre la que de otro modo se ciernen. Los trenes de pasajeros de larga distancia casi han desaparecido de la red que antes irradiaba desde la Estación Central; hoy la estación envía sobre todo trenes de cercanías al sur, una fracción de las rutas que durante décadas hicieron del ferrocarril la única manera práctica de recorrer el país de punta a punta.|Encerrée par les Andes d'un côté et la cordillère de la Côte de l'autre, Santiago repose dans un bassin qui piège si bien la fumée des véhicules et des poêles à bois que, les pires jours d'hiver, les montagnes enneigées disparaissent entièrement d'une ville qu'elles dominent pourtant directement. Les trains de voyageurs longue distance ont presque disparu du réseau qui rayonnait autrefois depuis l'Estación Central ; aujourd'hui la gare n'envoie surtout que des trains de banlieue vers le sud, une fraction des lignes qui firent du rail, pendant des décennies, le seul moyen pratique de traverser le pays sur toute sa longueur.|片側をアンデス山脈に、もう片側を海岸山脈に囲まれたサンティアゴは盆地に位置し、車と薪ストーブの煙をあまりに効率よく閉じ込めるため、冬のいちばん悪い日には、すぐ真上にそびえているはずの雪山がすっかり見えなくなる。かつてエスタシオン・セントラルから四方へ延びていた長距離旅客列車は、いまではほとんど姿を消した。駅はいまも近郊列車を南へ送り出すが、それはかつて国を端から端まで移動する唯一の実用的な手段だった路線網の、ごく一部でしかない。",
    [prop("Estación Central Platform Shop|Local en el andén de la Estación Central|Boutique de quai de l'Estación Central|エスタシオン・セントラルの構内店", 2400, 492),
     prop("Smog-Season Apartment Block|Edificio de departamentos en temporada de esmog|Immeuble d'appartements en saison de smog|スモッグの季節のアパート", 900, 185)],
  ),

  valparaiso: city(
    "Valparaíso|Valparaíso|Valparaíso|バルパライソ",
    -71.61, -33.05, "ce", "funicular", "hillport", "r",
    "The port the Panama Canal made obsolete overnight|El puerto que el Canal de Panamá volvió obsoleto de la noche a la mañana|Le port que le canal de Panama a rendu obsolète du jour au lendemain|パナマ運河が一夜で不要にした港",
    "Valparaíso's houses climb more than forty steep hills, connected by rickety funicular lifts called ascensores, some running since the 1880s, because the flat land around the bay was too narrow and too valuable to build homes on. Until 1914 nearly every ship crossing between the Atlantic and Pacific had to round Cape Horn and call here to resupply; within a few years of the Panama Canal opening a shorter route, that trade collapsed and the port never fully recovered its old importance.|Las casas de Valparaíso trepan por más de cuarenta cerros empinados, conectados por desvencijados ascensores funiculares, algunos en funcionamiento desde la década de 1880, porque el terreno plano junto a la bahía era demasiado angosto y demasiado valioso para construir viviendas. Hasta 1914, casi todo barco que cruzaba entre el Atlántico y el Pacífico debía doblar el cabo de Hornos y hacer escala aquí para reaprovisionarse; a pocos años de que el Canal de Panamá abriera una ruta más corta, ese comercio se derrumbó y el puerto nunca recuperó del todo su antigua importancia.|Les maisons de Valparaíso escaladent plus de quarante collines abruptes, reliées par de branlants ascenseurs funiculaires appelés ascensores, certains en service depuis les années 1880, car le terrain plat autour de la baie était trop étroit et trop précieux pour y bâtir des maisons. Jusqu'en 1914, presque tout navire traversant entre l'Atlantique et le Pacifique devait contourner le cap Horn et faire escale ici pour se ravitailler ; quelques années après que le canal de Panama eut ouvert une route plus courte, ce commerce s'effondra et le port ne retrouva jamais pleinement son ancienne importance.|バルパライソの家々は40を超える急な丘に這い上がるように建ち、1880年代から動くものもあるがたがたのケーブルカー「アセンソール」でつながっている。湾沿いの平地は狭く、住宅を建てるにはあまりに貴重すぎたからだ。1914年まで、大西洋と太平洋を行き来する船のほとんどはホーン岬を回り、この港で補給しなければならなかった。パナマ運河がより短い航路を開いてから数年のうちにその貿易は崩れ去り、港はかつての重要性を二度と完全には取り戻せなかった。",
    [prop("Ascensor Cable House|Casa de máquinas del ascensor|Cabine de treuil de l'ascensor|アセンソールの巻上げ小屋", 1100, 226),
     prop("Hillside Cerro Bar|Bar de cerro|Bar de colline|丘の上のバー", 500, 103)],
  ),

  vinadelmar: city(
    "Viña del Mar|Viña del Mar|Viña del Mar|ビニャ・デル・マル",
    -71.55, -33.02, "ce", "flowerclock", "hillport", "l",
    "The garden city next to the working port|La ciudad jardín junto al puerto de trabajo|La ville-jardin à côté du port de travail|働く港の隣にある庭園都市",
    "Built up as a resort from the late nineteenth century by wealthy Valparaíso families escaping the port's fires and crowding, Viña del Mar still keeps a floral clock and manicured seafront parks that its neighbour never had the flat land to spare. Its casino, opened in 1930, was for decades among the largest legal gambling houses in South America, mainly because Chile restricted casino licences to only a handful of cities.|Levantada como balneario desde fines del siglo XIX por familias adineradas de Valparaíso que huían de los incendios y el hacinamiento del puerto, Viña del Mar todavía conserva un reloj de flores y parques costeros bien cuidados para los que su vecina nunca tuvo terreno plano de sobra. Su casino, inaugurado en 1930, fue durante décadas una de las casas de juego legales más grandes de Sudamérica, sobre todo porque Chile restringía las licencias de casino a solo un puñado de ciudades.|Bâtie comme station balnéaire dès la fin du XIXe siècle par de riches familles de Valparaíso fuyant les incendies et la surpopulation du port, Viña del Mar conserve encore une horloge fleurie et des parcs côtiers soignés que sa voisine n'a jamais eu le terrain plat pour se permettre. Son casino, ouvert en 1930, fut pendant des décennies l'une des plus grandes maisons de jeu légales d'Amérique du Sud, en grande partie parce que le Chili limitait les licences de casino à une poignée de villes seulement.|19世紀末、バルパライソの火災と過密を逃れた裕福な一族たちがこの地を保養地として築き上げ、ビニャ・デル・マルはいまも花時計と手入れの行き届いた海沿いの公園を保っている。隣町にはそのための平地の余裕が無かった。1930年に開業したカジノは、何十年ものあいだ南アメリカでも指折りの規模の合法賭博場だった。チリがカジノの許可をごく一握りの都市にしか与えていなかったことが大きい。",
    [prop("Flower Clock Garden Plot|Parcela del jardín del reloj de flores|Parcelle du jardin de l'horloge fleurie|花時計庭園の一角", 320, 66),
     prop("Seafront Casino Terrace|Terraza del casino frente al mar|Terrasse du casino en front de mer|海沿いカジノのテラス", 1300, 267)],
  ),

  rancagua: city(
    "Rancagua|Rancagua|Rancagua|ランカグア",
    -70.74, -34.17, "ce", "tenienteshaft", "miningandes", "r",
    "The city fed by the world's largest underground mine|La ciudad alimentada por la mina subterránea más grande del mundo|La ville nourrie par la plus grande mine souterraine du monde|世界最大の地下鉱山が支える町",
    "El Teniente, in the mountains above Rancagua, is the largest underground copper mine in the world, its tunnels carved into a single mountain over more than a century of continuous work and now stretching thousands of kilometres. The mine's company town, Sewell, once housed thousands of workers on the mountainside itself before Chile's government nationalised the mine in 1971 and moved most operations down to Rancagua.|El Teniente, en las montañas sobre Rancagua, es la mina subterránea de cobre más grande del mundo, con túneles excavados en una sola montaña a lo largo de más de un siglo de trabajo continuo y que hoy suman miles de kilómetros. El pueblo minero de la mina, Sewell, alojó en su día a miles de trabajadores en la propia ladera antes de que el gobierno chileno nacionalizara la mina en 1971 y trasladara la mayor parte de las operaciones a Rancagua.|El Teniente, dans les montagnes au-dessus de Rancagua, est la plus grande mine de cuivre souterraine au monde, ses galeries creusées dans une seule montagne au fil de plus d'un siècle de travail continu et s'étendant aujourd'hui sur des milliers de kilomètres. La ville-usine de la mine, Sewell, logeait autrefois des milliers d'ouvriers à même le versant, avant que le gouvernement chilien ne nationalise la mine en 1971 et ne déplace l'essentiel des opérations vers Rancagua.|ランカグアの上にそびえる山中にあるエル・テニエンテは、世界最大の地下銅山である。1世紀以上にわたる連続した採掘でひとつの山に掘られたトンネルは、いまや総延長数千キロメートルに及ぶ。鉱山の企業城下町セウェルは、かつて山の斜面そのものに何千人もの労働者を住まわせていたが、1971年にチリ政府が鉱山を国有化すると、操業の大半はランカグアへ移された。",
    [prop("Tunnel Entrance Portal|Portal de entrada al túnel|Portail d'entrée du tunnel|坑道入口のポータル", 1900, 390),
     prop("Nationalisation Plaza Kiosk|Quiosco de la plaza de la nacionalización|Kiosque de la place de la nationalisation|国有化広場の売店", 240, 50)],
  ),

  sewell: city(
    "Sewell|Sewell|Sewell|セウェル",
    -70.38, -34.08, "ce", "stairtown", "miningandes", "l",
    "A town with no streets for cars|Un pueblo sin calles para autos|Une ville sans rues pour les voitures|車のための道が無い町",
    "Built in stages from 1905 up a steep Andean slope at over 2,000 metres, Sewell was designed with no roads at all: covered stairways and funiculars connected houses painted in bright, distinct colours meant to help residents find their way home during winter whiteouts. UNESCO listed the largely emptied town as a World Heritage Site in 2006, calling it an exceptional example of a company town built entirely around a single mine.|Construido por etapas desde 1905 en una empinada ladera andina a más de 2.000 metros, Sewell se diseñó sin calles en absoluto: escaleras cubiertas y funiculares conectaban casas pintadas de colores vivos y distintos, pensados para ayudar a los residentes a encontrar el camino a casa en las ventiscas de invierno. La UNESCO declaró en 2006 al pueblo, hoy en gran parte vacío, Patrimonio de la Humanidad, calificándolo de ejemplo excepcional de un pueblo minero construido enteramente en torno a una sola mina.|Bâtie par étapes à partir de 1905 sur un versant andin abrupt à plus de 2 000 mètres, Sewell fut conçue sans aucune route : des escaliers couverts et des funiculaires reliaient des maisons peintes de couleurs vives et distinctes, censées aider les habitants à retrouver leur chemin lors des tempêtes de neige hivernales. L'UNESCO inscrivit en 2006 cette ville aujourd'hui en grande partie vidée au patrimoine mondial, la qualifiant d'exemple exceptionnel de ville-usine bâtie entièrement autour d'une seule mine.|1905年から段階的に標高2000メートルを超えるアンデスの急斜面に建てられたセウェルには、道路が一本も無かった。屋根つきの階段とケーブルカーが家々を結び、冬のホワイトアウトの中でも住民が自分の家を見つけられるよう、それぞれ鮮やかで見分けやすい色に塗り分けられていた。2006年、ユネスコはいまはほとんど無人となったこの町を世界遺産に登録し、単一の鉱山だけを中心に築かれた企業城下町の類まれな例だと評した。",
    [prop("Covered Stairway Landing|Rellano de la escalera cubierta|Palier de l'escalier couvert|屋根つき階段の踊り場", 260, 54),
     prop("Colour-Coded Worker House|Casa de obrero de color distintivo|Maison d'ouvrier aux couleurs distinctes|色分けされた労働者の家", 220, 46)],
  ),

  sanantonio: city(
    "San Antonio|San Antonio|San Antonio|サン・アントニオ",
    -71.61, -33.59, "ce", "containercranes", "portindustrial", "r",
    "The container port that outgrew Valparaíso|El puerto de contenedores que superó a Valparaíso|Le port à conteneurs qui a dépassé Valparaíso|バルパライソを追い越したコンテナ港",
    "San Antonio now handles more cargo by weight than any other port in Chile, having overtaken Valparaíso in the late twentieth century as ships grew too large for the older port's cramped bay. Much of central Chile's wine and fruit harvest leaves the country through here, trucked down from vineyards that never had their own rail line to the coast.|San Antonio maneja hoy más carga por peso que cualquier otro puerto de Chile, tras superar a Valparaíso a fines del siglo XX cuando los barcos crecieron demasiado para la bahía estrecha del puerto más antiguo. Buena parte de la cosecha de vino y fruta del centro de Chile sale del país por aquí, transportada en camión desde viñedos que nunca tuvieron su propio ramal ferroviario a la costa.|San Antonio traite aujourd'hui plus de fret en poids que tout autre port du Chili, ayant dépassé Valparaíso à la fin du XXe siècle quand les navires devinrent trop grands pour la baie exiguë du port plus ancien. Une bonne partie de la récolte de vin et de fruits du Chili central quitte le pays par ici, transportée par camion depuis des vignobles qui n'ont jamais eu leur propre embranchement ferroviaire vers la côte.|サン・アントニオはいまやチリのどの港よりも重量ベースで多くの貨物を扱っている。20世紀末、船が大型化してバルパライソの狭い湾に収まりきらなくなると、バルパライソを追い越した。中部チリのワインと果物の収穫の多くは、海岸への専用鉄道線を一度も持たなかったブドウ畑からトラックで運ばれ、ここから国外へ出ていく。",
    [prop("Container Yard Gate|Portón del patio de contenedores|Portail de la cour à conteneurs|コンテナヤードの門", 300, 62),
     prop("Fruit Export Cold Store|Frigorífico de exportación de fruta|Entrepôt frigorifique d'exportation de fruits|果物輸出用の冷蔵倉庫", 260, 54)],
  ),

  santacruz: city(
    "Santa Cruz|Santa Cruz|Santa Cruz|サンタ・クルス",
    -71.37, -34.64, "ce", "wineharvest", "winevalley", "l",
    "A valley that sells its wine by the barrel-load|Un valle que vende su vino por barricadas|Une vallée qui vend son vin à la barrique|樽ごとワインを売る谷",
    "The Colchagua valley around Santa Cruz produces much of Chile's premium red wine for export, grown on land that was largely worked as cattle ranches until vineyards spread rapidly from the 1990s onward. A private museum in town gathers relics from across Chilean history under one roof, from pre-Columbian pottery to horse-drawn carriages, a collection built almost entirely by one wine-growing family.|El valle de Colchagua en torno a Santa Cruz produce buena parte del vino tinto premium de exportación de Chile, en tierras que durante mucho tiempo fueron haciendas ganaderas hasta que los viñedos se extendieron rápidamente desde los años noventa. Un museo privado del pueblo reúne bajo un mismo techo reliquias de toda la historia chilena, desde cerámica precolombina hasta carruajes tirados por caballos, una colección armada casi por completo por una sola familia vitivinícola.|La vallée de Colchagua autour de Santa Cruz produit une bonne part du vin rouge premium d'exportation du Chili, sur des terres longtemps exploitées comme ranchs à bétail avant que les vignobles ne s'y répandent rapidement à partir des années 1990. Un musée privé du bourg réunit sous un même toit des reliques de toute l'histoire chilienne, de la poterie précolombienne aux calèches, une collection bâtie presque entièrement par une seule famille viticole.|サンタ・クルスを囲むコルチャグア渓谷は、チリの高級輸出赤ワインの多くを生み出している。この土地は1990年代以降にブドウ畑が急速に広がるまで、長らく牧場として使われていた。町の私設博物館は、プレコロンビア期の土器から馬車まで、チリの歴史にまつわる品々を一つ屋根の下に集めており、そのほとんどはあるワイン栽培一族の手で築かれたコレクションである。",
    [prop("Colchagua Vineyard Row|Hilera de viñedo de Colchagua|Rangée de vigne de Colchagua|コルチャグアのブドウ畑の畝", 340, 70),
     prop("Family History Museum Wing|Ala del museo de historia familiar|Aile du musée d'histoire familiale|一族の歴史博物館の一翼", 280, 58)],
  ),

  curico: city(
    "Curicó|Curicó|Curicó|クリコ",
    -71.24, -34.98, "ce", "plazapalms", "winevalley", "r",
    "A wine festival older than Chile's export boom|Una fiesta del vino más vieja que el auge exportador de Chile|Une fête du vin plus ancienne que l'essor exportateur du Chili|チリのワイン輸出ブームより古い収穫祭",
    "Curicó has held a grape harvest festival, the Fiesta de la Vendimia, since around 1990, timed to the autumn crush in the vineyards that ring the city, well before Chilean wine became a major export good abroad. The city's central plaza, rebuilt after a major 1928 earthquake damaged much of the town, is shaded by around a hundred different tree species planted from a single nineteenth-century collection.|Curicó celebra una fiesta de la vendimia desde cerca de 1990, coincidiendo con la molienda de otoño en los viñedos que rodean la ciudad, bastante antes de que el vino chileno se convirtiera en un gran producto de exportación. La plaza central de la ciudad, reconstruida tras un fuerte terremoto en 1928 que dañó buena parte del pueblo, está sombreada por un centenar de especies de árboles distintas plantadas a partir de una sola colección del siglo XIX.|Curicó tient une fête des vendanges depuis environ 1990, calée sur le pressurage d'automne dans les vignobles qui entourent la ville, bien avant que le vin chilien ne devienne un grand produit d'exportation. La place centrale de la ville, reconstruite après un fort séisme de 1928 qui endommagea une bonne partie du bourg, est ombragée par une centaine d'espèces d'arbres différentes plantées à partir d'une seule collection du XIXe siècle.|クリコは1990年ごろから、町を囲むブドウ畑の秋の収穫に合わせてブドウ収穫祭「フィエスタ・デ・ラ・ベンディミア」を開いてきた。チリワインが海外向けの主要な輸出品になるよりずっと前のことである。町の多くを損なった1928年の大地震のあとに建て直された中央広場には、19世紀のある一つのコレクションから植えられた、およそ100種もの樹木が影を落としている。",
    [prop("Vendimia Festival Stage|Escenario de la fiesta de la vendimia|Scène de la fête des vendanges|収穫祭のステージ", 240, 50),
     prop("Century Tree Plaza Bench|Banca de la plaza de árboles centenarios|Banc de la place aux arbres centenaires|樹齢を重ねた広場のベンチ", 180, 38)],
  ),

  concepcion: city(
    "Concepción|Concepción|Concepción|コンセプシオン",
    -73.05, -36.83, "ce", "quaketower", "quakerebuilt", "l",
    "Rebuilt again after one of the largest quakes ever measured|Reconstruida otra vez tras uno de los mayores terremotos jamás medidos|Reconstruite encore après l'un des plus grands séismes jamais mesurés|測定史上最大級の地震で、また建て直された町",
    "The magnitude 8.8 earthquake and tsunami of 27 February 2010, centred offshore near here, is among the strongest ever instrumentally recorded worldwide and killed several hundred people along this stretch of coast; the city has been substantially rebuilt several times since its 1550 founding, after earlier quakes, floods and even a relocation of the city itself away from its original site. Concepción's location also once made it the hub of southern Chile's coal industry, shipping fuel mined from beneath the sea at nearby Lota and Coronel.|El terremoto y tsunami de magnitud 8,8 del 27 de febrero de 2010, con epicentro frente a la costa cercana, está entre los más fuertes jamás registrados instrumentalmente en el mundo y mató a varios cientos de personas en este tramo de costa; la ciudad se ha reconstruido a fondo varias veces desde su fundación en 1550, tras terremotos e inundaciones anteriores e incluso un traslado de la propia ciudad fuera de su sitio original. La ubicación de Concepción también la convirtió en su día en el centro de la industria carbonera del sur de Chile, embarcando el combustible extraído bajo el mar en las cercanas Lota y Coronel.|Le séisme et le tsunami de magnitude 8,8 du 27 février 2010, dont l'épicentre se trouvait au large tout près d'ici, compte parmi les plus forts jamais enregistrés instrumentalement au monde et tua plusieurs centaines de personnes le long de ce tronçon de côte ; la ville a été substantiellement reconstruite plusieurs fois depuis sa fondation en 1550, après d'anciens séismes, des inondations et même un déplacement de la ville elle-même hors de son site d'origine. La position de Concepción en fit aussi autrefois le cœur de l'industrie houillère du sud du Chili, expédiant le charbon extrait sous la mer à Lota et Coronel, tout proches.|2010年2月27日、この近くの沖合を震源としたマグニチュード8.8の地震と津波は、世界で観測史上最大級の一つで、この海岸沿いで数百人の命を奪った。町は1550年の建設以来、それ以前の地震や洪水、さらには町そのものの移転を経て、幾度も大々的に建て直されてきた。コンセプシオンの立地はまた、かつてこの町をチリ南部の石炭産業の中心地にもした。近郊のロタとコロネルで海底から掘り出された燃料をここから積み出していたのである。",
    [prop("Earthquake Memorial Plaza|Plaza memorial del terremoto|Place mémorielle du séisme|地震の慰霊広場", 260, 54),
     prop("Coal Export Rail Yard|Patio ferroviario de exportación de carbón|Cour ferroviaire d'exportation du charbon|石炭輸出の鉄道操車場", 650, 134)],
  ),

  lota: city(
    "Lota|Lota|Lota|ロタ",
    -73.16, -37.09, "ce", "underseamine", "coalcoast", "r",
    "Coal mined from beneath the ocean floor|Carbón extraído bajo el fondo del mar|Du charbon extrait sous le fond de l'océan|海底の下から掘られた石炭",
    "Lota's coal mines, worked from the 1850s until the last pit finally closed in 1997, extended several kilometres out under the seabed, following seams that dip beneath the Pacific; miners could hear the waves overhead through the rock as they worked. Retired miners now lead tours through the flooded lower galleries, called the Chiflones del Diablo, one of the few places anyone can walk beneath the ocean floor of Chile.|Las minas de carbón de Lota, explotadas desde la década de 1850 hasta que el último pique cerró en 1997, se internaban varios kilómetros bajo el lecho marino, siguiendo vetas que se hunden bajo el Pacífico; los mineros podían oír las olas sobre sus cabezas a través de la roca mientras trabajaban. Mineros jubilados guían hoy recorridos por las galerías inferiores inundadas, llamadas los Chiflones del Diablo, uno de los pocos lugares donde se puede caminar bajo el fondo del océano en Chile.|Les mines de charbon de Lota, exploitées depuis les années 1850 jusqu'à la fermeture du dernier puits en 1997, s'enfonçaient sur plusieurs kilomètres sous le fond marin, suivant des veines qui plongent sous le Pacifique ; les mineurs entendaient les vagues au-dessus d'eux à travers la roche pendant leur travail. D'anciens mineurs guident aujourd'hui des visites dans les galeries inférieures inondées, appelées les Chiflones del Diablo, l'un des rares endroits où l'on peut marcher sous le fond de l'océan au Chili.|1850年代から、最後の坑口が閉じた1997年まで採掘されたロタの炭鉱は、太平洋の下へ潜り込む炭層をたどって海底の下数キロメートルにまで伸びていた。鉱夫たちは作業をしながら、岩を通して頭上の波の音を聞くことができたという。いまは引退した元鉱夫たちが、水没した下層の坑道「悪魔の吹き溜まり(チフロネス・デル・ディアブロ)」を案内しており、チリで海底の下を歩ける数少ない場所の一つになっている。",
    [prop("Undersea Gallery Tour Entrance|Entrada al tour de la galería submarina|Entrée de la visite de galerie sous-marine|海底坑道ツアーの入口", 220, 46),
     prop("Retired Miner's Cottage|Casa del minero jubilado|Chaumière du mineur retraité|引退した鉱夫の家", 180, 38)],
  ),

  talcahuano: city(
    "Talcahuano|Talcahuano|Talcahuano|タルカワノ",
    -73.12, -36.72, "ce", "navalbase", "quakerebuilt", "b",
    "The naval port a tsunami climbed into the streets|El puerto naval al que un tsunami subió hasta las calles|Le port militaire où un tsunami est monté dans les rues|津波が通りまで上がった軍港",
    "The tsunami that followed the 2010 earthquake swept warships and fishing boats far up into Talcahuano's streets, some coming to rest hundreds of metres from the water; a rusting hull was left where it landed afterward as a memorial rather than being scrapped. The town has hosted Chile's main Pacific naval base since the nineteenth century, chosen for the deep, sheltered bay it shares with neighbouring Concepción.|El tsunami que siguió al terremoto de 2010 arrastró buques de guerra y botes pesqueros muy adentro de las calles de Talcahuano, algunos varados a cientos de metros del agua; un casco oxidado quedó donde encalló, dejado después como memorial en vez de desguazarse. El pueblo alberga la principal base naval chilena en el Pacífico desde el siglo XIX, elegida por la bahía profunda y resguardada que comparte con la vecina Concepción.|Le tsunami qui suivit le séisme de 2010 balaya navires de guerre et bateaux de pêche loin dans les rues de Talcahuano, certains échouant à des centaines de mètres de l'eau ; une coque rouillée fut laissée là où elle avait échoué, conservée ensuite comme mémorial plutôt que démantelée. Le bourg abrite la principale base navale chilienne du Pacifique depuis le XIXe siècle, choisie pour la baie profonde et abritée qu'elle partage avec Concepción, sa voisine.|2010年の地震に続く津波は軍艦や漁船をタルカワノの通りの奥深くまで押し流し、中には水際から数百メートルも離れた場所に打ち上げられたものもあった。錆びついた船体はそのまま、解体されずに慰霊碑として残された。この町は19世紀以来、隣のコンセプシオンと分け合う深く守られた湾を理由に選ばれ、チリの太平洋側の主要な海軍基地を置き続けている。",
    [prop("Tsunami Memorial Ship Site|Sitio del buque memorial del tsunami|Site du navire mémorial du tsunami|津波の記念船が残る場所", 200, 42),
     prop("Naval Base Gatehouse|Garita de la base naval|Poste de garde de la base navale|海軍基地の門衛所", 240, 50)],
  ),

  chillan: city(
    "Chillán|Chillán|Chillán|チジャン",
    -72.10, -36.61, "ce", "ohigginsstatue", "quakerebuilt", "l",
    "The quake that killed more people than any other in Chile|El terremoto que mató a más gente que ningún otro en Chile|Le séisme qui a tué plus de monde qu'aucun autre au Chili|チリでいちばん多くの人が死んだ地震",
    "The magnitude 8.3 earthquake of 24 January 1939 flattened Chillán at night, killing an estimated 28,000 people or more — still the deadliest earthquake in Chile's recorded history, even though later Chilean quakes measured far higher on the scale. Chillán is also the birthplace of Bernardo O'Higgins, who led Chile's fight for independence and became its first head of state in 1818.|El terremoto de magnitud 8,3 del 24 de enero de 1939 arrasó Chillán de noche, matando a un número estimado de 28.000 personas o más, aún el terremoto más mortífero de la historia registrada de Chile, aunque terremotos chilenos posteriores midieron mucho más alto en la escala. Chillán es también la ciudad natal de Bernardo O'Higgins, quien encabezó la lucha de Chile por la independencia y se convirtió en su primer jefe de Estado en 1818.|Le séisme de magnitude 8,3 du 24 janvier 1939 rasa Chillán de nuit, tuant environ 28 000 personnes ou plus — encore le séisme le plus meurtrier de l'histoire enregistrée du Chili, même si des séismes chiliens ultérieurs affichèrent une magnitude bien plus élevée. Chillán est aussi la ville natale de Bernardo O'Higgins, qui mena le combat du Chili pour l'indépendance et en devint le premier chef d'État en 1818.|1939年1月24日夜、マグニチュード8.3の地震はチジャンを壊滅させ、推計2万8000人以上が亡くなった。のちにチリではもっと規模の大きい地震が何度も起きているが、記録に残るチリ史上もっとも多くの死者を出した地震はいまもこれである。チジャンはまた、チリの独立運動を率い、1818年に初代最高執政官となったベルナルド・オイギンスの生まれた町でもある。",
    [prop("O'Higgins Birthplace Plaza|Plaza del natalicio de O'Higgins|Place natale d'O'Higgins|オイギンス生誕の広場", 260, 54),
     prop("Reinforced-Concrete Market Hall|Mercado de hormigón armado|Halle de marché en béton armé|鉄筋コンクリートの市場ホール", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // su — スル(アラウカニア・ロス・リオス・ロス・ラゴス。森とドイツ系移民)
  // ---------------------------------------------------------------------
  puertomontt: city(
    "Puerto Montt|Puerto Montt|Puerto Montt|プエルト・モント",
    -72.94, -41.47, "su", "bufferstop", "lakegateway", "b",
    "Where the railway simply stops|Donde el ferrocarril simplemente se termina|Là où le chemin de fer s'arrête tout simplement|鉄道がただ終わる場所",
    "Founded in 1853 to settle German immigrant families recruited to clear and farm the surrounding forest, Puerto Montt's brick-and-shingle waterfront still looks unlike almost anywhere else in Chile. The country's north–south state railway finally reached the town in the early 1910s and has never gone further south; Chiloé, Aysén and the fjords beyond are reached only by sea, by air, or by a long road through Argentina, because the mountains and the coastline south of here never left room for a continuous line.|Fundada en 1853 para asentar a familias de inmigrantes alemanes reclutadas para desmontar y cultivar el bosque circundante, el borde costero de Puerto Montt, de ladrillo y tejuela, aún no se parece a casi ningún otro lugar de Chile. El ferrocarril estatal norte-sur del país llegó por fin al pueblo a comienzos de la década de 1910 y nunca ha ido más al sur; a Chiloé, Aisén y los fiordos de más allá solo se llega por mar, por aire o por un largo camino a través de Argentina, porque las montañas y la costa al sur de aquí nunca dejaron espacio para una línea continua.|Fondée en 1853 pour installer des familles d'immigrants allemands recrutées afin de défricher et cultiver la forêt environnante, la façade maritime de Puerto Montt, en briques et bardeaux, ne ressemble encore à presque aucun autre endroit du Chili. Le chemin de fer d'État nord-sud du pays atteignit enfin la ville au début des années 1910 et n'est jamais allé plus au sud ; on n'atteint Chiloé, l'Aysén et les fjords au-delà que par mer, par air, ou par une longue route à travers l'Argentine, car les montagnes et le littoral au sud d'ici n'ont jamais laissé place à une ligne continue.|周辺の森を切り開いて耕作させるために募集されたドイツ系移民の家族を入植させるべく1853年に建てられたプエルト・モントの、レンガと木の羽目板でできた海岸沿いの町並みは、いまもチリの他のどことも違って見える。国の南北を結ぶ国営鉄道は1910年代初頭にようやくこの町へたどり着いたが、それより南へ行くことは一度もなかった。チロエ、アイセン、その先のフィヨルドへは海路か空路、あるいはアルゼンチンを経由する長い陸路でしか行けない。この先の山とリアス式の海岸線が、線路をつなげる余地を一度も残さなかったからである。",
    [prop("German Colonist Shingle House|Casa de tejuelas de colonos alemanes|Maison à bardeaux de colons allemands|ドイツ系移民の木羽根の家", 260, 54),
     prop("Rail Terminus Freight Yard|Patio de carga del término ferroviario|Cour de fret du terminus ferroviaire|鉄道終点の貨物ヤード", 300, 62)],
  ),

  temuco: city(
    "Temuco|Temuco|Temuco|テムコ",
    -72.59, -38.74, "su", "railfrontier", "araucaniaplain", "r",
    "The railhead that carried the frontier south|La cabecera ferroviaria que llevó la frontera al sur|La tête de ligne qui a porté la frontière vers le sud|前線を南へ運んだ鉄道の起点",
    "Temuco was founded in 1881 as a military fort at the close of the so-called 'Pacification of Araucanía,' the decades-long Chilean campaign that used railways and forts to break Mapuche control of the land south of the Biobío river and open it to settlement; the surrounding region still holds Chile's largest Mapuche population today. The city is also the childhood home of poet Pablo Neruda, whose father worked on the railway and who later wrote about watching the southern rain from the family's house beside the tracks.|Temuco se fundó en 1881 como fuerte militar al cierre de la llamada 'Pacificación de la Araucanía', la campaña chilena de décadas que usó ferrocarriles y fuertes para romper el control mapuche de las tierras al sur del río Biobío y abrirlas a la colonización; la región circundante aún alberga hoy la mayor población mapuche de Chile. La ciudad es también el hogar de infancia del poeta Pablo Neruda, cuyo padre trabajaba en el ferrocarril y que más tarde escribió sobre ver caer la lluvia sureña desde la casa familiar junto a las vías.|Temuco fut fondée en 1881 comme fort militaire à la fin de la dite « Pacification de l'Araucanie », la campagne chilienne de plusieurs décennies qui utilisa chemins de fer et forts pour briser le contrôle mapuche des terres au sud du fleuve Biobío et les ouvrir à la colonisation ; la région environnante abrite encore aujourd'hui la plus grande population mapuche du Chili. La ville est aussi le lieu d'enfance du poète Pablo Neruda, dont le père travaillait au chemin de fer et qui écrivit plus tard sur la pluie du sud vue depuis la maison familiale au bord des voies.|テムコは1881年、いわゆる「アラウカニア平定」の終盤に軍の砦として建てられた。これはビオビオ川以南の土地に対するマプチェの支配を、鉄道と砦を使って崩し、入植に開くための数十年にわたるチリの作戦だった。周辺地域にはいまもチリで最も多いマプチェの人口が暮らす。この町はまた、詩人パブロ・ネルーダが幼少期を過ごした地でもある。父親は鉄道で働いており、ネルーダはのちに線路脇の家から見た南部の雨について書いている。",
    [prop("Fort Line Rail Depot|Depósito ferroviario de la línea del fuerte|Dépôt ferroviaire de la ligne du fort|砦の鉄道線の車両基地", 280, 58),
     prop("Neruda Childhood House Plot|Solar de la casa de infancia de Neruda|Parcelle de la maison d'enfance de Neruda|ネルーダ幼少期の家の跡地", 320, 66)],
  ),

  villarrica: city(
    "Villarrica|Villarrica|Villarrica|ビジャリカ",
    -72.23, -39.28, "su", "volcanoglow", "volcanolake", "l",
    "A town rebuilt after three centuries away|Un pueblo reconstruido tras tres siglos de ausencia|Un bourg reconstruit après trois siècles d'absence|3世紀の空白のあとに建て直された町",
    "Villarrica volcano, one of Chile's most continuously active, glows visibly at its summit at night during restless periods and has forced repeated evacuations of the lakeside towns around it, most recently for an eruption in 2015. The town of Villarrica itself was founded in 1552, destroyed during Mapuche resistance in the late sixteenth century, and not permanently resettled by non-Mapuche Chileans until 1883, during the same campaign that founded Temuco.|El volcán Villarrica, uno de los más continuamente activos de Chile, brilla visiblemente en su cima de noche en períodos de actividad y ha forzado evacuaciones repetidas de los pueblos lacustres a su alrededor, la más reciente por una erupción en 2015. El propio pueblo de Villarrica se fundó en 1552, fue destruido durante la resistencia mapuche a fines del siglo XVI, y no se resentó de forma permanente por chilenos no mapuches hasta 1883, durante la misma campaña que fundó Temuco.|Le volcan Villarrica, l'un des plus continuellement actifs du Chili, brille visiblement à son sommet la nuit lors de périodes agitées et a forcé des évacuations répétées des bourgs lacustres alentour, la plus récente pour une éruption en 2015. Le bourg de Villarrica lui-même fut fondé en 1552, détruit durant la résistance mapuche à la fin du XVIe siècle, et ne fut réinstallé durablement par des Chiliens non mapuches qu'en 1883, lors de la même campagne qui fonda Temuco.|チリでも屈指の絶えず活動を続ける火山ビジャリカは、活発な時期には夜、山頂が目に見えて赤く輝き、周囲の湖畔の町々にたびたび避難を強いてきた。もっとも最近では2015年の噴火である。ビジャリカの町自体は1552年に建てられたが、16世紀末のマプチェの抵抗で破壊され、テムコを生んだのと同じ作戦の中の1883年になるまで、マプチェ以外のチリ人によって恒久的に再建されることはなかった。",
    [prop("Volcano-View Lakeside Plot|Parcela lacustre con vista al volcán|Parcelle lacustre avec vue sur le volcan|火山を望む湖畔の区画", 340, 70),
     prop("Resettlement-Era Church Block|Manzana de la iglesia de la reincorporación|Pâté de l'église de la réinstallation|再入植期の教会街区", 220, 46)],
  ),

  valdivia: city(
    "Valdivia|Valdivia|Valdivia|バルディビア",
    -73.24, -39.81, "su", "riverfort", "germanlakedistrict", "r",
    "The strongest earthquake ever recorded, centred here|El terremoto más fuerte jamás registrado, con epicentro aquí|Le séisme le plus puissant jamais enregistré, centré ici|観測史上最大の地震の震源地",
    "The magnitude 9.5 earthquake of 22 May 1960, centred near this city, remains the most powerful earthquake ever measured by modern instruments anywhere on Earth; it dropped parts of the coastline by more than two metres and sent a tsunami across the entire Pacific Ocean, killing people as far away as Hawaii and Japan. Valdivia had also drawn thousands of German-speaking immigrants from the 1850s onward, and their brewing and shipbuilding trades still shape the riverside city today.|El terremoto de magnitud 9,5 del 22 de mayo de 1960, con epicentro cerca de esta ciudad, sigue siendo el más potente jamás medido por instrumentos modernos en cualquier parte del planeta; hundió tramos de la costa más de dos metros y envió un tsunami por todo el océano Pacífico, matando a gente tan lejos como Hawái y Japón. Valdivia también había atraído a miles de inmigrantes de habla alemana desde la década de 1850, y sus oficios de cervecería y construcción naval aún dan forma a la ciudad ribereña.|Le séisme de magnitude 9,5 du 22 mai 1960, centré près de cette ville, reste le plus puissant jamais mesuré par des instruments modernes n'importe où sur Terre ; il fit s'affaisser des portions du littoral de plus de deux mètres et envoya un tsunami à travers tout l'océan Pacifique, tuant des gens jusqu'à Hawaï et au Japon. Valdivia avait aussi attiré des milliers d'immigrants germanophones depuis les années 1850, et leurs métiers de la brasserie et de la construction navale façonnent encore la ville riveraine.|1960年5月22日、この町の近くを震源としたマグニチュード9.5の地震は、いまも地球上で近代的な観測機器が測定した中で最大の地震である。海岸線の一部を2メートル以上沈み込ませ、太平洋全域に津波を送り、ハワイや日本など遠く離れた土地でも人命が失われた。バルディビアはまた、1850年代以降ドイツ語圏からの移民を数多く引き寄せており、彼らのビール醸造や造船の技はいまもこの川沿いの町の姿を形づくっている。",
    [prop("Riverside Brewery Warehouse|Bodega cervecera ribereña|Entrepôt de brasserie riverain|川沿いのビール醸造倉庫", 300, 62),
     prop("German Immigration Pier|Muelle de la inmigración alemana|Quai de l'immigration allemande|ドイツ移民の桟橋", 260, 54)],
  ),

  osorno: city(
    "Osorno|Osorno|Osorno|オソルノ",
    -73.13, -40.57, "su", "dairybarn", "germanlakedistrict", "l",
    "A dairy industry planted by settlers who had never farmed|Una industria lechera plantada por colonos que nunca habían cultivado|Une industrie laitière plantée par des colons qui n'avaient jamais cultivé|一度も農業をしたことのない入植者が築いた酪農",
    "Many of the German-speaking families recruited to settle around Osorno from the 1850s had been urban tradespeople in Europe rather than farmers, and the region's now-famous dairy industry grew from techniques they largely had to learn from scratch after arriving. Osorno's brick-and-timber German Quarter escaped the region's earlier conflicts largely intact, leaving one of southern Chile's best-preserved nineteenth-century colonist streetscapes.|Muchas de las familias de habla alemana reclutadas para asentarse en torno a Osorno desde la década de 1850 habían sido artesanos urbanos en Europa y no agricultores, y la ahora famosa industria lechera de la región nació de técnicas que en gran parte tuvieron que aprender desde cero al llegar. El Barrio Alemán de Osorno, de ladrillo y madera, escapó en gran medida intacto de los conflictos anteriores de la región, dejando uno de los trazados de calles de colonos del siglo XIX mejor conservados del sur de Chile.|Beaucoup des familles germanophones recrutées pour s'installer autour d'Osorno à partir des années 1850 avaient été des artisans urbains en Europe plutôt que des agriculteurs, et l'industrie laitière aujourd'hui célèbre de la région naquit de techniques qu'elles durent largement apprendre de zéro après leur arrivée. Le quartier allemand d'Osorno, en brique et en bois, échappa largement intact aux conflits antérieurs de la région, laissant l'un des mieux préservés parmi les tracés urbains de colons du XIXe siècle du sud du Chili.|1850年代からオソルノ周辺への入植のために募集されたドイツ語圏の家族の多くは、ヨーロッパでは農民ではなく都市部の職人だった。いまや有名なこの地域の酪農は、その多くを彼らが到着後にゼロから学んだ技術から育っていった。レンガと木造のオソルノのドイツ人街は、この地域の以前の紛争をほぼ無傷で切り抜け、チリ南部でも指折りに保存状態の良い19世紀の入植者の町並みを残している。",
    [prop("German Quarter Timber Shopfront|Fachada de madera del Barrio Alemán|Devanture en bois du quartier allemand|ドイツ人街の木造店舗", 260, 54),
     prop("Dairy Cooperative Warehouse|Bodega de la cooperativa lechera|Entrepôt de la coopérative laitière|酪農協同組合の倉庫", 280, 58)],
  ),

  puertovaras: city(
    "Puerto Varas|Puerto Varas|Puerto Varas|プエルト・バラス",
    -72.98, -41.32, "su", "roseporch", "germanlakedistrict", "r",
    "A lake town still dressed for the wrong climate|Un pueblo lacustre aún vestido para el clima equivocado|Une ville lacustre encore habillée pour le mauvais climat|見当違いの気候向けの服装をいまも着る湖畔の町",
    "Puerto Varas's steep-roofed timber houses, brought largely by German-speaking settlers from the 1850s, were built for snow loads the mild lake-district climate rarely delivers, a style the immigrants carried with them rather than adapted to the place. Rose bushes planted along its streets gave the town its nickname, the City of Roses, and its lakeside promenade looks directly across Lake Llanquihue at the snow cone of Osorno volcano.|Las casas de techo empinado de Puerto Varas, traídas en gran parte por colonos de habla alemana desde la década de 1850, se construyeron para cargas de nieve que el clima templado de la zona de los lagos rara vez entrega, un estilo que los inmigrantes trajeron consigo en vez de adaptar al lugar. Los rosales plantados a lo largo de sus calles le dieron al pueblo su apodo, la Ciudad de las Rosas, y su costanera mira directamente, a través del lago Llanquihue, al cono nevado del volcán Osorno.|Les maisons au toit pentu de Puerto Varas, apportées en grande partie par des colons germanophones dès les années 1850, furent bâties pour des charges de neige que le climat doux de la région des lacs livre rarement, un style que les immigrants transportèrent avec eux plutôt que de l'adapter au lieu. Des rosiers plantés le long de ses rues valurent au bourg son surnom, la Ville des Roses, et sa promenade au bord du lac regarde directement, par-delà le lac Llanquihue, le cône enneigé du volcan Osorno.|1850年代以降にドイツ語圏の入植者が主に持ち込んだプエルト・バラスの急勾配の屋根の家々は、この穏やかな湖水地方の気候ではめったに必要にならない積雪荷重に耐えるよう建てられている。移民たちが土地に合わせて変えるのではなく、そのまま持ち込んだ様式である。通りに沿って植えられたバラの木立が「バラの町」の愛称を与え、湖畔の遊歩道からはリャンキウエ湖越しにオソルノ火山の雪をかぶった山頂がまっすぐ望める。",
    [prop("Rose-Lined Lakeside Promenade|Costanera bordeada de rosas|Promenade au bord du lac bordée de roses|バラ並木の湖畔遊歩道", 320, 66),
     prop("Steep-Roof Timber Guesthouse|Hospedaje de madera de techo empinado|Pension en bois au toit pentu|急勾配屋根の木造ゲストハウス", 260, 54)],
  ),

  frutillar: city(
    "Frutillar|Frutillar|Frutillar|フルティジャル",
    -73.03, -41.13, "su", "musicshell", "germanlakedistrict", "l",
    "A concert hall built to face the volcano across the lake|Una sala de conciertos construida para mirar al volcán al otro lado del lago|Une salle de concert bâtie face au volcan de l'autre côté du lac|湖の向こうの火山に向けて建てた演奏会場",
    "Frutillar's lakeside Teatro del Lago, opened in 2010, hosts a classical music festival founded in the 1960s by descendants of the town's German settlers, drawn to a site chosen for its unobstructed view across Lake Llanquihue to Osorno volcano. A separate open-air museum of restored nineteenth-century colonist houses preserves tools, furniture and workshops brought over or built by the original German-speaking families.|El Teatro del Lago de Frutillar, junto al agua e inaugurado en 2010, alberga un festival de música clásica fundado en la década de 1960 por descendientes de los colonos alemanes del pueblo, atraídos por un emplazamiento elegido por su vista despejada del lago Llanquihue hacia el volcán Osorno. Un museo al aire libre aparte, de casas de colonos del siglo XIX restauradas, conserva herramientas, muebles y talleres traídos o construidos por las familias de habla alemana originales.|Le Teatro del Lago de Frutillar, au bord de l'eau et ouvert en 2010, accueille un festival de musique classique fondé dans les années 1960 par des descendants des colons allemands du bourg, attirés par un site choisi pour sa vue dégagée sur le lac Llanquihue jusqu'au volcan Osorno. Un musée en plein air distinct, fait de maisons de colons du XIXe siècle restaurées, conserve outils, meubles et ateliers apportés ou bâtis par les familles germanophones d'origine.|2010年に開館したフルティジャルの湖畔劇場テアトロ・デル・ラゴでは、この町のドイツ系入植者の子孫が1960年代に始めたクラシック音楽祭が開かれている。会場は、リャンキウエ湖越しにオソルノ火山を遮るものなく望める場所に選ばれた。別にある19世紀の入植者の家を復元した野外博物館には、元のドイツ語圏の家族たちが持ち込んだり作ったりした道具や家具、工房が保存されている。",
    [prop("Lakeside Concert Hall Seat|Butaca de la sala de conciertos lacustre|Fauteuil de la salle de concert au bord du lac|湖畔演奏会場の座席", 300, 62),
     prop("Colonist Open-Air Museum Plot|Parcela del museo al aire libre de colonos|Parcelle du musée de plein air des colons|入植者野外博物館の一角", 240, 50)],
  ),

  ancud: city(
    "Ancud|Ancud|Ancud|アンクー",
    -73.82, -41.87, "su", "wolfcastle", "chiloebg", "r",
    "Spain's last flag in South America|La última bandera de España en Sudamérica|Le dernier drapeau de l'Espagne en Amérique du Sud|南アメリカに残った最後のスペイン国旗",
    "Spanish forces held Ancud's fort until 1826, five years after the rest of Chile's mainland had already won independence, making Chiloé the last territory in South America still flying the Spanish flag. The island's wooden stilt houses and shingle-clad churches, more than a dozen of them later listed as UNESCO World Heritage sites, reflect a shipbuilding tradition that had almost no roads to compete with until the twentieth century.|Las fuerzas españolas mantuvieron el fuerte de Ancud hasta 1826, cinco años después de que el resto del Chile continental ya hubiera ganado la independencia, lo que hizo de Chiloé el último territorio de Sudamérica que aún enarbolaba la bandera española. Las casas palafíticas de madera y las iglesias revestidas de tejuelas de la isla, más de una docena declaradas después Patrimonio de la Humanidad por la UNESCO, reflejan una tradición de construcción naval que casi no tuvo caminos con los que competir hasta el siglo XX.|Les forces espagnoles tinrent le fort d'Ancud jusqu'en 1826, cinq ans après que le reste du Chili continental eut déjà gagné son indépendance, faisant de Chiloé le dernier territoire d'Amérique du Sud à arborer encore le drapeau espagnol. Les maisons sur pilotis en bois et les églises bardées de bardeaux de l'île, plus d'une douzaine inscrites plus tard au patrimoine mondial de l'UNESCO, reflètent une tradition de construction navale qui n'eut presque aucune route pour lui faire concurrence avant le XXe siècle.|チリ本土の他の地域がすでに独立を勝ち取ってから5年後の1826年まで、スペイン軍はアンクーの砦を保持し続け、チロエは南アメリカでスペイン国旗を掲げ続けた最後の領土となった。島に残る木造の高床式住居や木羽根で覆われた教会は、のちに十数棟がユネスコ世界遺産に登録されており、20世紀まで競合する道路がほとんど無かった造船の伝統を映している。",
    [prop("Fort Ruins Overlook|Mirador de las ruinas del fuerte|Belvédère des ruines du fort|砦跡の展望台", 220, 46),
     prop("Stilt House Waterfront Plot|Parcela ribereña de casa palafítica|Parcelle riveraine de maison sur pilotis|高床式住居の水辺の区画", 240, 50)],
  ),

  castro: city(
    "Castro|Castro|Castro|カストロ",
    -73.76, -42.48, "su", "stilthouses", "chiloebg", "l",
    "Houses built to float if the tide ever wins|Casas hechas para flotar si la marea gana|Des maisons bâties pour flotter si la marée gagne un jour|潮が勝った時に浮くよう建てられた家",
    "Castro's palafito stilt houses line the water's edge on wooden posts sunk into the tidal mud, built this way because the town's steep hills left little flat land and because a boat, not a cart, was for centuries the practical way to reach a house's back door. Castro's cathedral, rebuilt in 1912 from corrugated metal over a wooden frame after fires destroyed its predecessors, is painted bright yellow and violet rather than left bare like most of the island's other wooden churches.|Las casas palafíticas de Castro bordean la orilla sobre postes de madera hundidos en el barro de la marea, construidas así porque los cerros empinados del pueblo dejaban poco terreno plano y porque un bote, no una carreta, fue durante siglos la manera práctica de llegar a la parte trasera de una casa. La catedral de Castro, reconstruida en 1912 en lata sobre una armazón de madera tras incendios que destruyeron sus predecesoras, está pintada de amarillo y violeta vivos, a diferencia de la mayoría de las otras iglesias de madera de la isla, dejadas sin pintar.|Les maisons sur pilotis de Castro bordent le rivage sur des poteaux de bois enfoncés dans la vase de marée, bâties ainsi parce que les collines abruptes du bourg laissaient peu de terrain plat et parce qu'une barque, et non une charrette, fut pendant des siècles le moyen pratique d'atteindre l'arrière d'une maison. La cathédrale de Castro, reconstruite en 1912 en tôle sur une charpente de bois après que des incendies eurent détruit ses devancières, est peinte en jaune et violet vifs, contrairement à la plupart des autres églises en bois de l'île, laissées à nu.|カストロの高床式住居パラフィトは、潮の泥に沈めた木の杭の上、水際に沿って並んでいる。町の急な丘には平地がほとんど無く、何世紀ものあいだ家の裏口に着くには荷車ではなく舟が実用的な手段だったためにこの形になった。カストロの大聖堂は、火災で先代が焼けたあと1912年に木の骨組みの上へトタン板を張って建て直され、島に残る他の木造教会の多くが無塗装のままなのとは対照的に、鮮やかな黄色と紫に塗られている。",
    [prop("Palafito Waterfront Stilt Plot|Parcela palafítica ribereña|Parcelle riveraine sur pilotis|高床式住居の水辺の敷地", 300, 62),
     prop("Corrugated-Metal Cathedral Pew|Banco de la catedral de lata|Banc de la cathédrale en tôle|トタン張り大聖堂の信徒席", 200, 42)],
  ),

  angol: city(
    "Angol|Angol|Angol|アンゴル",
    -72.72, -37.80, "su", "araucariapark", "araucaniaplain", "b",
    "A frontier fort refounded on the same ground three times|Un fuerte fronterizo refundado tres veces en el mismo terreno|Un fort frontière refondé trois fois sur le même terrain|同じ土地に3度建て直された辺境の砦",
    "Angol was refounded here in 1862 as a fort on the line the Chilean army held against Mapuche territory for decades before the final campaigns of the 1880s pushed the frontier further south; the town had actually been founded and destroyed at several different sites over the previous three centuries. A national park in the nearby hills protects one of the last stands of araucaria, the spiny 'monkey-puzzle' conifer that Pehuenche and Mapuche communities still harvest each autumn for its edible seeds.|Angol se refundó aquí en 1862 como fuerte en la línea que el ejército chileno sostuvo contra el territorio mapuche durante décadas antes de que las campañas finales de la década de 1880 empujaran la frontera más al sur; el pueblo había sido fundado y destruido en realidad en varios sitios distintos a lo largo de los tres siglos anteriores. Un parque nacional en los cerros cercanos protege uno de los últimos bosques de araucaria, la conífera espinosa conocida como 'rompecabezas de mono', cuyas semillas comestibles las comunidades pehuenche y mapuche aún cosechan cada otoño.|Angol fut refondée ici en 1862 comme fort sur la ligne que l'armée chilienne tint contre le territoire mapuche pendant des décennies avant que les campagnes finales des années 1880 ne repoussent la frontière plus au sud ; le bourg avait en réalité été fondé et détruit sur plusieurs sites différents au cours des trois siècles précédents. Un parc national dans les collines voisines protège l'un des derniers peuplements d'araucaria, ce conifère épineux dit « casse-tête de singe », dont les communautés pehuenche et mapuche récoltent encore chaque automne les graines comestibles.|アンゴルは1862年、数十年ものあいだチリ軍がマプチェの領土に対して保持していた前線の砦として、この地に建て直された。1880年代の最終的な作戦が国境をさらに南へ押し広げる前のことである。この町は実際にはそれ以前の3世紀のあいだ、いくつもの異なる場所で建てられては壊されてきていた。近くの丘にある国立公園は、マプチェやペウエンチェの人々がいまも毎秋その食用の種を収穫する、棘のある針葉樹アラウカリア(モンキーパズルの木)の最後の群生地の一つを保護している。",
    [prop("Frontier Fort Line Marker|Marcador de la línea del fuerte fronterizo|Borne de la ligne du fort frontière|国境砦の防衛線の標石", 200, 42),
     prop("Araucaria Seed Harvest Stand|Puesto de cosecha de piñones de araucaria|Étal de récolte de graines d'araucaria|アラウカリアの種の収穫小屋", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // au — アウストラル(アイセン・マガジャネス。氷河・フィヨルド・鉄道の空白)
  // ---------------------------------------------------------------------
  coyhaique: city(
    "Coyhaique|Coyhaique|Coyhaique|コジャイケ",
    -72.07, -45.57, "au", "roadsend", "patagoniasteppe", "r",
    "The regional capital no railway ever reached|La capital regional que ningún ferrocarril alcanzó jamás|La capitale régionale qu'aucun chemin de fer n'a jamais atteinte|鉄道が一度も届かなかった州都",
    "Founded only in 1929, Coyhaique is one of the youngest regional capitals in Chile and for decades was reachable only by sea, by crossing into Argentina, or by rough tracks, since no railway or continuous Chilean road linked it to the rest of the country until construction of the Carretera Austral began in 1976. Sheep and cattle ranching, not mining, built the town's early economy, largely under companies granted vast grazing concessions across the region.|Fundada recién en 1929, Coyhaique es una de las capitales regionales más jóvenes de Chile y durante décadas solo se podía alcanzar por mar, cruzando a Argentina, o por huellas precarias, ya que ningún ferrocarril ni camino chileno continuo la unió al resto del país hasta que en 1976 comenzó la construcción de la Carretera Austral. La ganadería ovina y vacuna, no la minería, construyó la economía temprana del pueblo, en gran parte bajo compañías con vastas concesiones de pastoreo en la región.|Fondée seulement en 1929, Coyhaique est l'une des plus jeunes capitales régionales du Chili et, pendant des décennies, on ne pouvait l'atteindre que par mer, en passant par l'Argentine, ou par des pistes sommaires, aucun chemin de fer ni route chilienne continue ne la reliant au reste du pays avant le début de la construction de la Carretera Austral en 1976. L'élevage ovin et bovin, non l'exploitation minière, bâtit l'économie initiale du bourg, en grande partie sous des compagnies dotées de vastes concessions de pâturage dans la région.|1929年になってようやく建てられたコジャイケは、チリでもとりわけ新しい州都の一つで、何十年ものあいだ、海路かアルゼンチンを経由するか、荒れた道を通るしか到達する術がなかった。1976年にカレテラ・アウストラルの建設が始まるまで、鉄道も途切れない国内の道路も国の他の地域とこの町を結んでいなかったのである。町の初期の経済を築いたのは鉱業ではなく牧羊と牧牛で、その多くは地域に広大な放牧権を与えられた企業のもとで営まれた。",
    [prop("Carretera Austral Trailhead|Cabecera de la Carretera Austral|Tête de route de la Carretera Australe|カレテラ・アウストラルの起点", 240, 50),
     prop("Sheep Ranch Shearing Shed|Galpón de esquila de la estancia|Hangar de tonte de l'estancia|牧羊場の毛刈り小屋", 200, 42)],
  ),

  puertoaysen: city(
    "Puerto Aysén|Puerto Aysén|Puerto Aysén|プエルト・アイセン",
    -72.66, -45.40, "au", "riverport", "patagoniasteppe", "l",
    "A port that silted up and had to be replaced|Un puerto que se colmató de sedimento y tuvo que ser reemplazado|Un port comblé de sédiments qu'il fallut remplacer|土砂で埋まり移設された港",
    "Puerto Aysén served as the region's main port until the Aysén river silted up with sediment washed down from deforested and eroded hillsides upstream, forcing ships to move to the deeper Puerto Chacabuco nearby from the 1960s onward. Much of that erosion traces back to fires deliberately set decades earlier to clear land for ranching, which the region's isolation had made almost the only viable industry.|Puerto Aysén sirvió como el principal puerto de la región hasta que el río Aysén se colmató de sedimentos arrastrados desde laderas río arriba deforestadas y erosionadas, obligando a los barcos a trasladarse desde la década de 1960 al cercano y más profundo Puerto Chacabuco. Buena parte de esa erosión se remonta a incendios provocados deliberadamente décadas antes para despejar tierra para la ganadería, que el aislamiento de la región había convertido en casi la única industria viable.|Puerto Aysén servit de principal port de la région jusqu'à ce que le fleuve Aysén se comble de sédiments charriés depuis des versants déboisés et érodés en amont, forçant les navires à se déplacer vers le Puerto Chacabuco voisin, plus profond, à partir des années 1960. Une bonne part de cette érosion remonte à des incendies allumés délibérément des décennies plus tôt pour défricher des terres destinées à l'élevage, que l'isolement de la région avait rendu presque la seule industrie viable.|プエルト・アイセンはかつてこの地域の主要な港だったが、上流の森林伐採と浸食が進んだ斜面から流れ込む土砂でアイセン川が埋まり、1960年代以降、船はより水深のある近くのプエルト・チャカブコへ移らざるを得なくなった。その浸食の多くは、数十年前に牧畜のために意図的に放たれた火に由来する。この地域の孤立が、牧畜をほぼ唯一の成り立つ産業にしていたのである。",
    [prop("Silted River Wharf Ruins|Ruinas del muelle colmatado|Ruines du quai comblé de sédiments|土砂で埋まった旧埠頭の跡", 160, 34),
     prop("Ranching-Era Fire Lookout|Torre de vigía de incendios de la era ganadera|Tour de guet des incendies de l'ère de l'élevage|牧畜期の火災監視小屋", 180, 38)],
  ),

  // team-lead指摘(2026-08-21)により追加。プエルト・アイセン―プエルト・
  // ナタレス間の中継。mark/bgはプエルト・アイセンと共有(47都市になる
  // ぶん、記号+背景を70枚に収めるため。同じ絵になる都市1組は上限
  // 47×10%≒4組の内側)。
  puertoeden: city(
    "Puerto Edén|Puerto Edén|Puerto Edén|プエルト・エデン",
    -73.15, -49.13, "au", "riverport", "patagoniasteppe", "r",
    "A village with no way in except by boat|Un pueblo al que no se llega sino en bote|Un village accessible seulement par bateau|船でしか着けない村",
    "Puerto Edén, home to around 200 people on Wellington Island, has no road connecting it to anywhere else in Chile and is reached only by the ferry that threads the channels between Puerto Montt and Puerto Natales, or by seaplane. It is also one of the last places where a handful of elderly Kawésqar people still live in the settlement the state resettled their community into during the twentieth century, after disease and displacement had already reduced a once-nomadic canoe people of the channels to a small remnant.|Puerto Edén, hogar de unas 200 personas en la isla Wellington, no tiene camino que lo conecte con ningún otro lugar de Chile y solo se llega en el ferry que serpentea por los canales entre Puerto Montt y Puerto Natales, o en hidroavión. Es también uno de los últimos lugares donde todavía vive un puñado de kawésqar de edad avanzada, en el asentamiento al que el Estado trasladó a su comunidad durante el siglo XX, después de que la enfermedad y el desplazamiento ya hubieran reducido a un pequeño remanente a un pueblo antes nómade de canoas en los canales.|Puerto Edén, qui compte environ 200 habitants sur l'île Wellington, n'a aucune route le reliant au reste du Chili et n'est accessible que par le ferry qui serpente entre Puerto Montt et Puerto Natales, ou par hydravion. C'est aussi l'un des derniers endroits où vit encore une poignée de Kawésqar âgés, dans l'établissement où l'État a relogé leur communauté au XXe siècle, après que la maladie et les déplacements eurent déjà réduit à un petit reste un peuple autrefois nomade des canaux, vivant en canoë.|ウェリントン島にあるプエルト・エデンには約200人が暮らすが、チリの他のどこともつながる道は無く、プエルト・モントとプエルト・ナタレスのあいだの水路を縫うフェリーか水上飛行機でしか着けない。ここはまた、かつて水路をカヌーで移動して暮らしていた遊牧の民カウェスカルのわずかな高齢者が、いまも暮らす最後の地の一つでもある。20世紀に国がこの地へ共同体を移住させた頃には、病と立ち退きによってすでにごくわずかな人数にまで減っていた。",
    [prop("Seaplane Landing Dock|Muelle de hidroaviones|Quai d'hydravions|水上飛行機の発着場", 170, 35),
     prop("Kawésqar Settlement House|Casa del asentamiento kawésqar|Maison de l'établissement kawésqar|カウェスカル入植地の家", 190, 39)],
  ),

  chilechico: city(
    "Chile Chico|Chile Chico|Chile Chico|チレ・チコ",
    -71.75, -46.53, "au", "marblecaves", "patagoniasteppe", "r",
    "A warm, dry pocket on the shore of a vast lake|Un bolsón cálido y seco a orillas de un lago vasto|Une poche chaude et sèche sur la rive d'un lac immense|巨大な湖畔にある暖かく乾いた一角",
    "Chile Chico sits in an unusually dry, sunny microclimate on the southern shore of General Carrera Lake, shared with Argentina and one of the largest lakes in South America, letting cherry and grape orchards grow in a region otherwise dominated by cold rainforest and windswept steppe. The lake's turquoise water has carved nearby marble cliffs into smooth caves and tunnels, reachable only by boat.|Chile Chico se asienta en un microclima inusualmente seco y soleado en la orilla sur del lago General Carrera, compartido con Argentina y uno de los más grandes de Sudamérica, lo que permite cultivar cerezos y viñedos en una región por lo demás dominada por selva fría y estepa azotada por el viento. El agua turquesa del lago ha esculpido cerca acantilados de mármol en cuevas y túneles lisos, a los que solo se llega en bote.|Chile Chico se trouve dans un microclimat inhabituellement sec et ensoleillé sur la rive sud du lac General Carrera, partagé avec l'Argentine et l'un des plus grands d'Amérique du Sud, permettant à des vergers de cerisiers et de vignes de pousser dans une région par ailleurs dominée par la forêt froide et la steppe balayée par le vent. L'eau turquoise du lac a sculpté à proximité des falaises de marbre en grottes et tunnels lisses, accessibles seulement en bateau.|チレ・チコは、アルゼンチンと分け合う南アメリカ有数の広さを持つヘネラル・カレラ湖の南岸にある、珍しく乾いた日当たりの良い小気候の一角にある。おかげで、他の地域なら冷涼な雨林と風の吹きすさぶステップに支配されるはずの土地で、サクランボやブドウの果樹園が育つ。湖のトルコ石色の水は、近くの大理石の断崖を滑らかな洞窟とトンネルに削り出しており、船でしか行けない。",
    [prop("Cherry Orchard Microclimate Plot|Parcela de cerezos en el microclima|Parcelle de cerisiers du microclimat|小気候のサクランボ果樹園", 260, 54),
     prop("Marble Cave Boat Landing|Embarcadero de las cuevas de mármol|Débarcadère des grottes de marbre|大理石洞窟への船着き場", 220, 46)],
  ),

  cochrane: city(
    "Cochrane|Cochrane|Cochrane|コクラン",
    -72.57, -47.25, "au", "gauchopost", "patagoniasteppe", "l",
    "The last real supply stop before the road runs out|La última parada de abastecimiento real antes de que se acabe el camino|Le dernier vrai point de ravitaillement avant la fin de la route|道が尽きる前の最後の本当の補給地",
    "Cochrane was for decades one of the most isolated towns on the Carretera Austral, the gravel highway that only reached this far south during the 1980s, and it still serves as the last real supply stop before the road continues on toward the glaciers and fjords further south. Ranches in the surrounding valleys still move cattle on horseback along trails that predate the road by generations.|Cochrane fue durante décadas uno de los pueblos más aislados de la Carretera Austral, la carretera de ripio que solo llegó tan al sur durante la década de 1980, y aún sirve como la última parada real de abastecimiento antes de que el camino siga hacia los glaciares y fiordos más al sur. Las estancias de los valles vecinos todavía mueven ganado a caballo por sendas anteriores al camino por generaciones.|Cochrane fut pendant des décennies l'un des bourgs les plus isolés de la Carretera Austral, la route de gravier qui n'atteignit cette latitude que dans les années 1980, et sert encore de dernier vrai point de ravitaillement avant que la route ne continue vers les glaciers et fjords plus au sud. Les estancias des vallées voisines déplacent encore le bétail à cheval sur des sentiers antérieurs de plusieurs générations à la route.|コクランは何十年ものあいだ、カレテラ・アウストラル沿いでもとりわけ孤立した町の一つだった。この砂利道がこの緯度まで届いたのは1980年代のことである。いまもこの町は、道がさらに南の氷河とフィヨルドへ続く前の、最後の本当の補給地であり続けている。周囲の谷にある牧場は、道よりも何世代も古い小道に沿って、いまも馬で牛を移動させている。",
    [prop("Estancia Cattle Trail Post|Posta del sendero ganadero de la estancia|Poste du sentier à bétail de l'estancia|牧場の牛追い道の中継所", 180, 38),
     prop("Last Fuel Stop Depot|Depósito de la última bencinera|Dépôt de la dernière station-service|最後の給油所", 160, 34)],
  ),

  puertonatales: city(
    "Puerto Natales|Puerto Natales|Puerto Natales|プエルト・ナタレス",
    -72.51, -51.73, "au", "milodonbones", "glacierpark", "r",
    "A giant sloth's skin, found in a cave nearby|La piel de un perezoso gigante, hallada en una cueva cercana|La peau d'un paresseux géant, trouvée dans une grotte voisine|近くの洞窟で見つかった巨大ナマケモノの皮",
    "In 1896, a German settler exploring a cave north of here found remarkably preserved skin, bones and dung from a mylodon, a giant ground sloth extinct for thousands of years, sparking rumours as far as London that a living specimen might still survive in Patagonia's unexplored valleys. The find helped draw early scientific attention to the region; today Puerto Natales serves mainly as the gateway to Torres del Paine National Park, reached along roads that have never connected to Chile's rail network at all.|En 1896, un colono alemán que exploraba una cueva al norte de aquí halló piel, huesos y excrementos notablemente conservados de un milodón, un perezoso gigante extinto hace miles de años, lo que provocó rumores hasta en Londres de que aún pudiera sobrevivir un ejemplar vivo en los valles inexplorados de la Patagonia. El hallazgo ayudó a atraer atención científica temprana a la región; hoy Puerto Natales sirve sobre todo como puerta de entrada al Parque Nacional Torres del Paine, al que se llega por caminos que nunca han estado conectados en absoluto a la red ferroviaria chilena.|En 1896, un colon allemand explorant une grotte au nord d'ici trouva peau, os et excréments remarquablement conservés d'un mylodon, un paresseux géant éteint depuis des milliers d'années, suscitant jusqu'à Londres des rumeurs qu'un spécimen vivant pourrait encore survivre dans les vallées inexplorées de Patagonie. La découverte contribua à attirer une attention scientifique précoce sur la région ; aujourd'hui Puerto Natales sert surtout de porte d'entrée au parc national Torres del Paine, accessible par des routes qui n'ont jamais été reliées au réseau ferroviaire chilien.|1896年、この町の北にある洞窟を探検していたドイツ系の入植者が、数千年前に絶滅した巨大ナマケモノ「ミロドン」の見事に保存された皮、骨、糞を発見した。この発見はロンドンにまで、パタゴニアの未踏の谷にまだ生きた個体がいるのではという噂を巻き起こした。この発見は、この地域への初期の科学的関心を呼び込む助けとなった。いまプエルト・ナタレスは主にトーレス・デル・パイネ国立公園への玄関口として機能しており、そこへ通じる道はチリの鉄道網とは一度もつながったことがない。",
    [prop("Milodón Cave Visitor Post|Puesto de visitantes de la Cueva del Milodón|Poste des visiteurs de la grotte du Mylodon|ミロドン洞窟の来訪者受付", 260, 54),
     prop("Torres del Paine Trailhead Lodge|Refugio de la cabecera de Torres del Paine|Gîte de la tête de sentier de Torres del Paine|トーレス・デル・パイネ登山口の山小屋", 340, 70)],
  ),

  puntaarenas: city(
    "Punta Arenas|Punta Arenas|Punta Arenas|プンタ・アレナス",
    -70.91, -53.16, "au", "woolwarehouse", "magallanesstrait", "l",
    "A free port that grew rich before the shortcut closed it out|Un puerto libre que se enriqueció antes de que el atajo lo dejara fuera|Un port franc enrichi avant que le raccourci ne l'exclue|近道が生まれる前に富を築いた自由港",
    "Punta Arenas grew wealthy in the late nineteenth and early twentieth centuries as a free port serving ships that still had to round Cape Horn, and above all from wool: vast sheep estancias run by a handful of families made it briefly one of the richest cities per capita anywhere in South America. The Panama Canal's 1914 opening cut most of that shipping traffic almost overnight, and the city has depended since on ranching, fishing, and more recently oil and tourism instead.|Punta Arenas se enriqueció a fines del siglo XIX y principios del XX como puerto libre que atendía a barcos que aún debían doblar el cabo de Hornos, y sobre todo gracias a la lana: vastas estancias ovejeras manejadas por un puñado de familias la convirtieron brevemente en una de las ciudades más ricas per cápita de toda Sudamérica. La apertura del Canal de Panamá en 1914 cortó casi de la noche a la mañana la mayor parte de ese tráfico marítimo, y desde entonces la ciudad ha dependido de la ganadería, la pesca y, más recientemente, del petróleo y el turismo.|Punta Arenas s'enrichit à la fin du XIXe et au début du XXe siècle comme port franc desservant des navires devant encore doubler le cap Horn, et surtout grâce à la laine : de vastes estancias ovines tenues par une poignée de familles en firent brièvement l'une des villes les plus riches par habitant de toute l'Amérique du Sud. L'ouverture du canal de Panama en 1914 coupa presque du jour au lendemain l'essentiel de ce trafic maritime, et la ville a depuis dépendu de l'élevage, de la pêche, puis plus récemment du pétrole et du tourisme.|プンタ・アレナスは19世紀末から20世紀初頭にかけて、いまだホーン岬を回らねばならなかった船を相手にする自由港として、とりわけ羊毛によって富を築いた。ひと握りの一族が営む広大な牧羊場は、この町を一時、南アメリカでも指折りの一人当たり所得の高い都市にした。1914年のパナマ運河開通は、その海運の大半をほぼ一夜にして断ち切り、以後この町は牧畜と漁業、そして近年は石油と観光に頼るようになった。",
    [prop("Wool Warehouse Loading Dock|Muelle de carga de la bodega lanera|Quai de chargement de l'entrepôt à laine|羊毛倉庫の積み込み埠頭", 750, 154),
     prop("Belle Époque Mansion Courtyard|Patio de la mansión de la Belle Époque|Cour de la demeure Belle Époque|ベル・エポック様式の邸宅の中庭", 1700, 350)],
  ),

  porvenir: city(
    "Porvenir|Porvenir|Porvenir|ポルベニル",
    -70.37, -53.30, "au", "goldpan", "magallanesstrait", "r",
    "A gold rush that became a genocide|Una fiebre del oro que se convirtió en genocidio|Une ruée vers l'or devenue un génocide|虐殺に至った金の熱狂",
    "Gold discovered in Tierra del Fuego's streams in the 1880s drew prospectors and, soon after, sheep-ranching companies onto land where the Selk'nam people had lived for thousands of years; ranch owners and hired hunters organised campaigns that killed most of the Selk'nam population within a few decades, a history now widely recognised in Chile as genocide. Porvenir itself grew as the region's administrative town, settled heavily by Croatian immigrants whose surnames still fill the local telephone directory.|El oro descubierto en los arroyos de Tierra del Fuego en la década de 1880 atrajo a buscadores y, poco después, a compañías ganaderas ovejeras a tierras donde el pueblo selk'nam había vivido por miles de años; estancieros y cazadores contratados organizaron campañas que mataron a la mayor parte de la población selk'nam en pocas décadas, una historia hoy ampliamente reconocida en Chile como genocidio. Porvenir mismo creció como el pueblo administrativo de la región, poblado en buena parte por inmigrantes croatas cuyos apellidos aún llenan la guía telefónica local.|L'or découvert dans les ruisseaux de Terre de Feu dans les années 1880 attira des chercheurs puis, peu après, des compagnies d'élevage ovin sur des terres où le peuple selk'nam vivait depuis des millénaires ; propriétaires d'estancias et chasseurs engagés organisèrent des campagnes qui tuèrent la majeure partie de la population selk'nam en quelques décennies, une histoire aujourd'hui largement reconnue au Chili comme un génocide. Porvenir lui-même se développa comme bourg administratif de la région, peuplé en grande partie d'immigrants croates dont les noms de famille remplissent encore l'annuaire local.|1880年代にティエラ・デル・フエゴの小川で金が見つかると、探鉱者が、続いて牧羊会社が、何千年もセルクナムの人々が暮らしてきた土地に押し寄せた。牧場主と雇われた狩猟者たちは組織的な虐殺を行い、数十年のうちにセルクナムの人口の大半を殺した。この歴史はいまチリで広くジェノサイドとして認識されている。ポルベニル自体はこの地域の行政の町として育ち、いまも地元の電話帳を埋め尽くすほどの姓を残すクロアチア系移民が数多く入植した。",
    [prop("Croatian Immigrant Rowhouse|Casa en hilera de inmigrantes croatas|Maison mitoyenne d'immigrants croates|クロアチア系移民の連棟住宅", 220, 46),
     prop("Territorial Governor's Office|Oficina del gobernador territorial|Bureau du gouverneur territorial|地方総督府の庁舎", 260, 54)],
  ),

  villaohiggins: city(
    "Villa O'Higgins|Villa O'Higgins|Villa O'Higgins|ビジャ・オイギンス",
    -72.56, -48.47, "au", "roadend", "glacierpark", "b",
    "Where the road, not just the railway, ends|Donde termina el camino, y no solo el ferrocarril|Là où finit la route, pas seulement le rail|鉄道だけでなく道路も終わる場所",
    "Villa O'Higgins marks the literal end of the Carretera Austral, the highway that reached this far only in the year 2000, more than a century after railways elsewhere in Chile had already come and gone; beyond here, reaching the rest of Chile or Argentina means a boat crossing over glacial lakes or a mountain trek, since no road continues south at all. The Northern and Southern Patagonian Ice Fields nearby are, outside the polar regions, among the largest continuous stretches of ice left on Earth.|Villa O'Higgins marca el fin literal de la Carretera Austral, la carretera que llegó hasta aquí recién en el año 2000, más de un siglo después de que los ferrocarriles ya hubieran llegado e ido en otras partes de Chile; más allá de aquí, llegar al resto de Chile o a Argentina significa cruzar en bote lagos glaciares o hacer una travesía de montaña, ya que ningún camino continúa hacia el sur. Los Campos de Hielo Norte y Sur cercanos son, fuera de las regiones polares, de las mayores extensiones continuas de hielo que quedan en la Tierra.|Villa O'Higgins marque la fin littérale de la Carretera Austral, la route qui n'atteignit ce point qu'en l'an 2000, plus d'un siècle après que les chemins de fer étaient déjà venus et repartis ailleurs au Chili ; au-delà, rejoindre le reste du Chili ou l'Argentine signifie traverser en bateau des lacs glaciaires ou entreprendre une marche en montagne, aucune route ne continuant vers le sud. Les champs de glace nord et sud de Patagonie tout proches comptent, hors des régions polaires, parmi les plus grandes étendues de glace continue restant sur Terre.|ビジャ・オイギンスは、文字どおりカレテラ・アウストラルの終点である。この道路がここまで届いたのは2000年になってからのことで、チリの他の地域ではすでに鉄道が来ては去ったあとだった。ここから先、チリの他の地域やアルゼンチンへ行くには氷河湖を船で渡るか山を歩いて越えるしかない。南へ続く道はまったく無いのである。近くの北・南パタゴニア氷原は、極地を除けば地球上に残る最大級の連続した氷の広がりの一つである。",
    [prop("Road's End Marker Post|Poste marcador del fin del camino|Poteau marquant la fin de la route|道の終点を示す標識", 200, 42),
     prop("Ice Field Trekking Outfitter|Proveedor de trekking al campo de hielo|Équipementier de trek vers le champ de glace|氷原トレッキング用品店", 220, 46)],
  ),

  puertowilliams: city(
    "Puerto Williams|Puerto Williams|Puerto Williams|プエルト・ウィリアムズ",
    -67.62, -54.93, "au", "southernmosttown", "southernmost", "l",
    "The world's southernmost town, and its last native speaker|El pueblo más austral del mundo, y su última hablante nativa|La ville la plus australe du monde, et sa dernière locutrice native|世界最南の町と、最後の母語話者",
    "Puerto Williams, a former naval base opened to civilian settlement in the 1950s, is generally recognised as the world's southernmost permanently inhabited town, a claim contested only by the larger Argentine city of Ushuaia across the channel at a similar latitude. Cristina Calderón, widely described as the last fully fluent native speaker of the Yaghan language, lived here until her death in 2022, and local schools now teach some Yaghan words to keep the language from disappearing completely.|Puerto Williams, una antigua base naval abierta al asentamiento civil en la década de 1950, es reconocido en general como el pueblo habitado permanentemente más austral del mundo, un título disputado solo por la mayor ciudad argentina de Ushuaia, al otro lado del canal y a una latitud similar. Cristina Calderón, descrita ampliamente como la última hablante nativa plenamente fluida de la lengua yagán, vivió aquí hasta su muerte en 2022, y las escuelas locales enseñan hoy algunas palabras yaganas para que la lengua no desaparezca del todo.|Puerto Williams, une ancienne base navale ouverte à la colonisation civile dans les années 1950, est généralement reconnue comme la ville habitée en permanence la plus australe du monde, un titre disputé seulement par la plus grande ville argentine d'Ushuaia, de l'autre côté du canal à une latitude similaire. Cristina Calderón, largement décrite comme la dernière locutrice native pleinement fluente de la langue yagane, vécut ici jusqu'à sa mort en 2022, et les écoles locales enseignent aujourd'hui quelques mots yaganes pour empêcher la langue de disparaître complètement.|1950年代に民間人の入植に開放された旧海軍基地プエルト・ウィリアムズは、一般に世界最南の常住の町とされている。この呼び名に異を唱えうるのは、海峡の向こう側、ほぼ同緯度にあるアルゼンチンのより大きな町ウシュアイアだけである。ヤガン語を完全に流暢に話せる最後の母語話者として広く紹介されてきたクリスティーナ・カルデロンは、2022年に亡くなるまでここで暮らしていた。地元の学校ではいま、言語を完全に消滅させないよう、いくつかのヤガン語の単語を教えている。",
    [prop("Yaghan Language School Room|Sala de la escuela de lengua yagán|Salle de l'école de langue yagane|ヤガン語学校の教室", 180, 38),
     prop("Naval Base Civilian Quarter|Barrio civil de la base naval|Quartier civil de la base navale|海軍基地の民間人居住区", 200, 42)],
  ),
};

/**
 * 路線(47都市・50本)。パンアメリカン・ハイウェイ/縦断鉄道の実在の経路に
 * 沿わせてある。プエルト・モントより南(アイセン・マガジャネス)は、
 * 現実に道路・鉄道が本土と続いていない区間を航路("sea")で結んだ
 * (ナビエラ・アウストラル/TABSAの実在のフェリー網と同じ扱い)。
 */
export const CHILE_EDGES = [
  // --- ng(北部の海岸・砂漠幹線) ---
  ["iquique", "arica"], // 端の順を入れ替え。海に出ていた88px→0px(check-sea-routes.mjs)
  ["iquique", "humberstone"],
  ["humberstone", "mariaelena"],
  ["mariaelena", "calama"],
  ["calama", "chuquicamata"],
  ["mariaelena", "antofagasta"],
  ["antofagasta", "calama"],
  ["chanaral", "antofagasta"], // 端の順を入れ替え。海に出ていた178px→0px(check-sea-routes.mjs)
  ["chanaral", "caldera"],
  ["caldera", "copiapo"],
  ["copiapo", "laserena"],
  // --- nc(遷移地帯・エルキ渓谷) ---
  ["laserena", "coquimbo"],
  ["laserena", "vicuna"],
  ["laserena", "ovalle"],
  ["vicuna", "ovalle"],
  ["ovalle", "illapel"],
  ["illapel", "vinadelmar"],
  // --- ce(首都圏・中央谷・ワイン産地) ---
  ["vinadelmar", "valparaiso"],
  ["valparaiso", "sanantonio"],
  ["valparaiso", "santiago"],
  ["santiago", "sanantonio"],
  ["santiago", "rancagua"],
  ["rancagua", "sewell"],
  ["rancagua", "santacruz"],
  ["santacruz", "curico"],
  ["curico", "chillan"],
  ["chillan", "concepcion"],
  ["concepcion", "talcahuano"],
  ["concepcion", "lota"],
  ["chillan", "temuco"],
  // --- su(アラウカニア・ロス・リオス・ロス・ラゴス) ---
  ["temuco", "angol"],
  ["temuco", "villarrica"],
  ["villarrica", "valdivia"],
  ["temuco", "valdivia"],
  ["valdivia", "osorno"],
  ["osorno", "puertovaras"],
  ["puertovaras", "frutillar"],
  ["puertovaras", "puertomontt"],
  ["puertomontt", "ancud", "sea"],
  ["ancud", "castro"],
  // --- au(アイセン・マガジャネス。フィヨルドの先は航路) ---
  ["puertoaysen", "puertomontt"], // カレテラ・アウストラル(フェリー区間を含む道路)。陸路にして端を入れ替え。海に出ていた315px→0px(check-sea-routes.mjs)
  ["puertoaysen", "coyhaique"],
  ["coyhaique", "chilechico"],
  ["coyhaique", "cochrane"],
  ["cochrane", "villaohiggins"],
  // team-lead指摘(2026-08-21)で解決。海岸線をアイセン〜マガジャネスの
  // 実際のフィヨルドの奥まで絞り、プエルト・エデン(ウェリントン島)を
  // 中継に挟んだ。ナビエラ・アウストラルの実在のフェリーがこの島に
  // 寄港する経路と同じ扱い。
  ["puertoaysen", "puertoeden", "sea"],
  ["puertoeden", "puertonatales", "sea"],
  ["puertonatales", "puntaarenas"],
  ["puntaarenas", "porvenir", "sea"],
  // ★未解決(check-sea-routes.mjs: 212px/87%が陸)。プンタ・アレナス起点
  // (232px/81%)より少し良いが閾値超のまま。プエルト・ウィリアムズはナバリノ島
  // にあり陸路が無い(本文参照)ため「陸路にする」は採用しなかった。
  // ティエラ・デル・フエゴの海岸線を作り直すかKEPT登録の判断を仰ぐ。
  ["porvenir", "puertowilliams", "sea"],
];
