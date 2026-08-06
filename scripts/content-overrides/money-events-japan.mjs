/**
 * 日本の青マス・赤マスで起きる出来事。
 *
 * かつては金額がルーレットで決まるだけで、「なぜ増えたのか」が分からなかった。
 * その地方でありそうな話を用意し、止まるたびに土地のことが少し分かるようにする。
 *
 * `reg` を書かない出来事は全国どこでも起こりうる。地方に強く結びついた話
 * (流氷・なまはげ・屋台など)だけ地方を絞る。
 * 地方コード: nor=北海道東北 / kan=関東中部 / kin=関西瀬戸内 / kyu=九州沖縄
 */
import { t } from "./city-helpers.mjs";

function ev(id, kind, regs, emoji, amount, title, narrative) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative) };
}

export const JAPAN_MONEY_EVENTS = [
  // ---- 全国どこでも ----
  ev(
    "lost-wallet-returned", "gain", [], "👛", 320,
    "Your wallet came back|Tu cartera ha vuelto|Ton portefeuille est revenu|財布が戻ってきた",
    "You left it on the train, and it was waiting at the lost-property office with the cash untouched. Around 80% of wallets handed in to Tokyo police are returned to their owners.|Lo dejaste en el tren y te esperaba en objetos perdidos, con el dinero intacto. Cerca del 80% de las carteras entregadas a la policía de Tokio vuelven a su dueño.|Tu l'avais laissé dans le train ; il t'attendait aux objets trouvés, l'argent intact. Environ 80 % des portefeuilles remis à la police de Tokyo retrouvent leur propriétaire.|列車に置き忘れた財布が、現金もそのまま遺失物窓口で待っていた。東京で警察に届けられた財布のおよそ8割は持ち主の手に戻る。",
  ),
  ev(
    "vending-change", "gain", [], "🥤", 120,
    "The machine gives extra|La máquina da de más|Le distributeur rend trop|自販機が多く返した",
    "A drinks machine returns your coin along with the bottle. Japan has roughly one vending machine for every 30 people, more per head than anywhere else.|Una máquina de bebidas te devuelve la moneda con la botella. Japón tiene una máquina por cada 30 personas, la mayor proporción del mundo.|Un distributeur rend la pièce en plus de la bouteille. Le Japon compte un distributeur pour 30 habitants, le record mondial.|飲み物の自販機が、ボトルと一緒に硬貨も返してきた。日本の自販機は約30人に1台と、人口あたりで世界一多い。",
  ),
  ev(
    "shrine-omikuji", "loss", [], "🎋", 180,
    "A bad fortune slip|Una suerte adversa|Un mauvais oracle|凶を引いた",
    "You drew \"great curse\" at the shrine, so you buy a charm and tie the paper to a branch. Tying it there is said to leave the bad luck behind rather than carry it home.|Sacaste «gran maldición», así que compras un amuleto y atas el papel a una rama. Se dice que atarlo deja allí la mala suerte.|Tu as tiré « grande malédiction » : tu achètes une amulette et noues le papier à une branche, pour y laisser le mauvais sort.|神社で大凶を引いたので、お守りを買い、おみくじを枝に結んで帰る。結んでおけば凶を持ち帰らずに済むとされる。",
  ),
  ev(
    "train-delay-taxi", "loss", [], "🚕", 260,
    "The line stops, you take a taxi|Se para la línea, tomas un taxi|La ligne s'arrête, tu prends un taxi|運転見合わせでタクシー",
    "A signal check halts the line and the platform fills up, so you give in and take a taxi. Japanese railways publish delay certificates you can show at work.|Una revisión de señales detiene la línea y el andén se llena, así que tomas un taxi. Los ferrocarriles emiten certificados de retraso para el trabajo.|Une vérification de signalisation bloque la ligne et le quai se remplit : tu prends un taxi. Les chemins de fer délivrent des attestations de retard.|信号確認で運転見合わせ、ホームは人であふれ、諦めてタクシーに乗る。鉄道各社は職場に出せる遅延証明書を配っている。",
  ),
  ev(
    "matsuri-help", "gain", [], "🏮", 280,
    "Asked to carry the shrine|Te piden llevar el mikoshi|On te demande de porter le mikoshi|神輿の担ぎ手に呼ばれた",
    "The neighbourhood is short of hands for the portable shrine, and they pay you in cash and beer. Many towns now welcome outsiders because there are not enough young residents.|Al barrio le faltan manos para el mikoshi y te pagan en efectivo y cerveza. Muchos pueblos aceptan forasteros por falta de jóvenes.|Le quartier manque de bras pour le mikoshi et te paie en espèces et en bière. Bien des villes accueillent des étrangers faute de jeunes.|町内会が神輿の担ぎ手を欠いており、日当とビールが出た。若い住民が足りず、よそ者を歓迎する町は多い。",
  ),

  // ---- 北海道・東北 ----
  ev(
    "drift-ice-cruise", "loss", ["nor"], "🧊", 240,
    "The drift ice came early|El hielo llegó pronto|La banquise est arrivée tôt|流氷が早く来た",
    "The pack ice arrives ahead of schedule and the ferry is cancelled, so you pay for a night's lodging. The ice drifts down from the Amur river, 1,000 km away.|El hielo llega antes de lo previsto y cancelan el ferry; pagas una noche de hotel. Viene del río Amur, a 1.000 km.|La banquise arrive en avance, le ferry est annulé : tu paies une nuit d'hôtel. Elle descend du fleuve Amour, à 1 000 km.|流氷が予定より早く接岸し、船が欠航して一泊ぶんの宿代がかかった。氷は1000km離れたアムール川から流れてくる。",
  ),
  ev(
    "namahage-visit", "loss", ["nor"], "👹", 200,
    "The demons come for you|Los demonios vienen a por ti|Les démons viennent te chercher|なまはげが来た",
    "Straw-caped visitors burst in looking for idlers, and the household owes them food and drink. Guests are expected to contribute to the feast.|Visitantes con capas de paja irrumpen buscando holgazanes; la casa les debe comida y bebida. Los invitados aportan al banquete.|Des visiteurs en capes de paille font irruption pour débusquer les paresseux ; la maison leur doit à boire et à manger.|藁の蓑をまとった一行が「怠け者はいねが」と押し入り、家は膳と酒を出すことになっている。客人も相応の負担をする。",
  ),
  ev(
    "salmon-catch", "gain", ["nor"], "🐟", 300,
    "A share of the salmon run|Una parte de la pesca|Une part de la remontée des saumons|鮭の水揚げを分けてもらう",
    "You lend a hand hauling nets at dawn and leave with fish and cash. Hokkaidō lands the great majority of Japan's salmon.|Echas una mano con las redes al alba y te vas con pescado y dinero. Hokkaidō pesca la gran mayoría del salmón de Japón.|Tu aides à haler les filets à l'aube et repars avec du poisson et de l'argent. Hokkaidō pêche l'essentiel du saumon japonais.|夜明けの網揚げを手伝い、魚と現金を持たされた。日本の鮭の大半は北海道で獲れる。",
  ),
  ev(
    "apple-orchard", "gain", ["nor"], "🍎", 240,
    "Helping with the apple harvest|Ayudas en la cosecha de manzanas|Tu aides à la récolte des pommes|林檎の収穫を手伝う",
    "An orchard is short-handed and pays by the crate. Aomori alone grows more than half of Japan's apples.|Un huerto anda corto de manos y paga por caja. Solo Aomori produce más de la mitad de las manzanas de Japón.|Un verger manque de bras et paie à la caisse. À elle seule, Aomori produit plus de la moitié des pommes du Japon.|人手の足りない林檎園で、箱いくらで日当が出た。青森県だけで日本の林檎の半分以上を産する。",
  ),

  // ---- 関東・中部 ----
  ev(
    "rush-hour-crush", "loss", ["kan"], "🚇", 220,
    "Your glasses go in the crush|Tus gafas en el apretón|Tes lunettes dans la cohue|満員電車で眼鏡が折れた",
    "The morning train runs at almost double its capacity and something in your bag does not survive. Station staff in white gloves still push passengers aboard.|El tren matinal va al doble de su capacidad y algo de tu bolsa no sobrevive. Empleados con guantes blancos aún empujan a los pasajeros.|Le train du matin roule au double de sa capacité et quelque chose dans ton sac n'y survit pas. Des employés gantés de blanc poussent encore les voyageurs.|朝の電車は定員のほぼ倍で、鞄の中身が無事では済まなかった。白手袋の駅員が今も乗客を押し込む。",
  ),
  ev(
    "cherry-blossom-spot", "gain", ["kan"], "🌸", 200,
    "Paid to hold the picnic spot|Te pagan por guardar el sitio|Payé pour garder la place|花見の場所取りを頼まれた",
    "A company sends its newest recruit to sit under a tree all day; this time they pay you instead. The blossom front is tracked and forecast nationally.|Una empresa manda a su novato a sentarse todo el día bajo un árbol; esta vez te pagan a ti. El frente de floración se pronostica en todo el país.|Une entreprise envoie son nouveau s'asseoir sous un arbre toute la journée ; cette fois, c'est toi qu'on paie. Le front des cerisiers est prévu à l'échelle nationale.|会社は新人に一日中木の下で場所取りをさせるが、今回はあなたが日当をもらった。桜前線は全国規模で予想・追跡されている。",
  ),
  ev(
    "onsen-ryokan", "loss", ["kan"], "♨️", 300,
    "You stay the extra night|Te quedas una noche más|Tu restes une nuit de plus|もう一泊してしまった",
    "The bath before dinner turns into a second night at the inn. Japan has around 3,000 hot-spring resorts sitting on its volcanic belt.|El baño antes de cenar se convierte en una segunda noche. Japón tiene unos 3.000 balnearios sobre su cinturón volcánico.|Le bain d'avant-dîner se transforme en seconde nuit à l'auberge. Le Japon compte quelque 3 000 stations thermales sur sa ceinture volcanique.|夕食前のひと風呂が、そのまま二泊目になった。火山帯の上にある日本には約3000の温泉地がある。",
  ),

  // ---- 関西・瀬戸内 ----
  ev(
    "kuidaore", "loss", ["kin"], "🐙", 260,
    "Eating yourself broke|Comer hasta arruinarse|Manger jusqu'à la ruine|食い倒れた",
    "Takoyaki, then kushikatsu, then okonomiyaki — Osaka has a word for ruining yourself through food. Dipping a skewer twice into the shared sauce is strictly forbidden.|Takoyaki, kushikatsu, okonomiyaki: Osaka tiene una palabra para arruinarse comiendo. Mojar dos veces la brocheta en la salsa común está prohibidísimo.|Takoyaki, kushikatsu, okonomiyaki : Osaka a un mot pour se ruiner en mangeant. Retremper une brochette dans la sauce commune est strictement proscrit.|たこ焼き、串カツ、お好み焼き。大阪には食べて財を失うことを指す言葉がある。串の二度づけは固く禁じられている。",
  ),
  ev(
    "deer-crackers", "loss", ["kin"], "🦌", 140,
    "The deer take the whole packet|Los ciervos se llevan el paquete|Les cerfs emportent tout le paquet|鹿に煎餅を全部取られた",
    "You buy one packet of crackers and are surrounded before you can open it. Nara's deer are protected as messengers of the gods and bow for food.|Compras un paquete de galletas y te rodean antes de abrirlo. Los ciervos de Nara están protegidos como mensajeros de los dioses.|Tu achètes un paquet de gâteaux et te fais encercler avant de l'ouvrir. Les cerfs de Nara sont protégés comme messagers des dieux.|鹿煎餅を一袋買った途端に囲まれた。奈良の鹿は神の使いとして保護されており、餌をねだって頭を下げる。",
  ),
  ev(
    "craft-commission", "gain", ["kin"], "🏺", 320,
    "A workshop pays for a hand|Un taller paga tu ayuda|Un atelier paie ton aide|工房の手伝いに謝礼",
    "A pottery or weaving workshop is behind on an order and pays for a day's help. Kyoto alone supports dozens of crafts that exist to supply the tea ceremony.|Un taller de cerámica o tejido va con retraso y paga un día de ayuda. Solo Kioto sostiene decenas de oficios nacidos para la ceremonia del té.|Un atelier de poterie ou de tissage a du retard et paie une journée d'aide. Kyoto à elle seule fait vivre des dizaines de métiers nés du service du thé.|焼物か織物の工房が納期に追われ、一日の手間賃が出た。京都だけでも、茶の湯を支えるために生まれた工芸が何十種も残る。",
  ),

  // ---- 九州・沖縄 ----
  ev(
    "yatai-treat", "gain", ["kyu"], "🍜", 180,
    "The stall owner won't take your money|El dueño no te cobra|Le patron refuse ton argent|屋台の主人が取ってくれない",
    "You end up talking half the night at a Fukuoka food stall and the owner waves your payment away. The city has more street stalls than the rest of Japan combined.|Acabas charlando media noche en un puesto de Fukuoka y el dueño rechaza el pago. La ciudad tiene más puestos que el resto de Japón junto.|Tu passes la moitié de la nuit à discuter dans une échoppe de Fukuoka et le patron refuse d'être payé. La ville compte plus d'échoppes que tout le reste du Japon.|福岡の屋台で夜半まで話し込み、主人が代金を受け取らなかった。福岡の屋台は日本の他地域を合わせたより多い。",
  ),
  ev(
    "volcanic-ash", "loss", ["kyu"], "🌋", 200,
    "Ash on everything|Ceniza por todas partes|De la cendre partout|灰が降った",
    "Sakurajima sends up another plume and you pay to have the car washed twice. Kagoshima hands out ash bags and sweeps the streets as routine.|Sakurajima lanza otra columna y pagas dos lavados de coche. Kagoshima reparte bolsas para la ceniza como rutina.|Sakurajima crache un nouveau panache et tu paies deux lavages de voiture. Kagoshima distribue des sacs à cendre par habitude.|桜島がまた噴煙を上げ、洗車を二度することになった。鹿児島では降灰袋が配られ、灰の清掃は日常である。",
  ),
  ev(
    "awamori-round", "loss", ["kyu"], "🥃", 220,
    "You buy the round|Pagas la ronda|Tu offres la tournée|泡盛を振る舞った",
    "Someone opens a bottle of aged awamori and the table insists you join in. Okinawan families traditionally keep a cask to be drunk at a child's coming of age.|Alguien abre una botella de awamori añejo y la mesa insiste. Las familias de Okinawa guardan una barrica para la mayoría de edad de un hijo.|Quelqu'un ouvre une bouteille d'awamori vieilli et la tablée insiste. Les familles d'Okinawa gardent un fût pour la majorité d'un enfant.|古酒の泡盛が開けられ、座に加わることになった。沖縄では子の成人に開けるための甕を寝かせる家がある。",
  ),
];
