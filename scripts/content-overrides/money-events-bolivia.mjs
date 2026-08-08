/**
 * ボリビアの青マス・赤マスで起きる出来事。
 *
 * 地方コード: alt=アルティプラーノ / val=渓谷とユンガス / ama=アマゾンとベニ / cha=チャコとチキタニア
 */
import { t } from "./city-helpers.mjs";

function ev(id, kind, regs, emoji, amount, title, narrative) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative) };
}

export const BOLIVIA_MONEY_EVENTS = [
  // ---- 全国どこでも ----
  ev(
    "cholita-market", "gain", [], "🧺", 260,
    "A market seller undercharges|Una vendedora cobra de menos|Une marchande sous-facture|市場で安くしてくれた",
    "A bulk order gets rounded down, and the stallholder adds a yapa — a small gift on top. Asking for the yapa is expected, not cheeky.|Una compra grande se redondea a la baja y la vendedora añade la yapa, un pequeño regalo. Pedir la yapa se espera, no es descaro.|Une grosse commande est arrondie à la baisse et la marchande ajoute la yapa, un petit cadeau. Demander la yapa est attendu.|まとめ買いをすると、売り子が値を切り下げ、さらに「ヤパ」と呼ばれるおまけを付けてくれた。ヤパを求めるのは無礼ではなく作法である。",
  ),
  ev(
    "bloqueo-detour", "loss", [], "🚧", 280,
    "A road blockade|Un bloqueo de carretera|Un blocage de route|道路封鎖",
    "Protesters close the highway with stones, and the only way on is a long detour. Blockades are a standard form of political pressure here and can last days.|Manifestantes cierran la carretera con piedras y el único paso es un largo rodeo. Los bloqueos son una forma habitual de presión política.|Des manifestants ferment la route avec des pierres, et le seul passage est un long détour. Les blocages sont un moyen de pression politique courant.|抗議の人々が石で幹線道路を塞ぎ、大きく迂回する費用がかかった。封鎖はこの国では常套の政治的圧力で、何日も続くことがある。",
  ),
  ev(
    "carnival-water", "loss", [], "🎊", 160,
    "Soaked at carnival|Empapado en carnaval|Trempé au carnaval|カーニバルでずぶ濡れ",
    "Water balloons are fair game for weeks before carnival, and a phone in a pocket does not survive one. Nobody is exempt, least of all visitors.|Los globos de agua valen semanas antes del carnaval, y un móvil en el bolsillo no sobrevive. Nadie se libra, y menos los visitantes.|Les ballons d'eau sont de mise des semaines avant le carnaval, et un téléphone au fond d'une poche n'y survit pas. Personne n'est épargné.|カーニバル前の数週間は水風船が解禁で、ポケットに携帯が入っていた。誰も免れず、旅人はなおさら狙われる。",
  ),
  ev(
    "pachamama-offering", "loss", [], "🌿", 180,
    "An offering to Pachamama|Una ofrenda a la Pachamama|Une offrande à la Pachamama|パチャママへの供物",
    "A journey starts with a mesa — a bundle of sweets, wool and herbs — bought to burn for the earth. August is the month when the earth is said to be hungry.|Todo viaje empieza con una mesa —dulces, lana y hierbas— comprada para quemarla por la tierra. Agosto es el mes en que la tierra tiene hambre.|Un voyage commence par une mesa — sucreries, laine et herbes — achetée pour être brûlée pour la terre. En août, dit-on, la terre a faim.|旅立ちの前に、菓子・羊毛・薬草を束ねた「メサ」を買って大地に焚く。八月は大地が飢える月とされる。",
  ),

  // ---- アルティプラーノ ----
  ev(
    "soroche", "loss", ["alt"], "🫁", 240,
    "Altitude sickness|Mal de altura|Le mal d'altitude|高山病",
    "At 3,600 m the headache wins, and oxygen and coca tea have to be paid for. La Paz airport sits higher than most mountains in Europe.|A 3.600 m el dolor de cabeza gana y hay que pagar oxígeno y mate de coca. El aeropuerto de La Paz está más alto que casi todas las montañas de Europa.|À 3 600 m, le mal de tête l'emporte : il faut payer oxygène et maté de coca. L'aéroport de La Paz est plus haut que presque tous les monts d'Europe.|標高3600mで頭痛に負け、酸素とコカ茶に金を払う。ラパスの空港はヨーロッパのほとんどの山より高い所にある。",
  ),
  ev(
    "salt-flat-guide", "gain", ["alt"], "🧂", 320,
    "A guide to the mirrored flat|Una guía hasta el salar espejo|Un guide vers le salar-miroir|塩湖の鏡張りを見つけた",
    "A tour group pays for the way to the shallow water where the salt flat turns into a mirror. The flat is so level it is used to calibrate satellites.|Un grupo de turistas paga por el camino al agua somera donde el salar se vuelve espejo. El salar es tan plano que sirve para calibrar satélites.|Un groupe de touristes paie pour la route vers l'eau peu profonde qui change le salar en miroir. Le salar est si plat qu'il sert à étalonner les satellites.|塩湖が鏡になる浅い水域を見つけ、ツアー客に案内を頼まれて謝礼をもらった。この塩原は平らすぎて人工衛星の校正に使われる。",
  ),
  ev(
    "zebra-crossing", "gain", ["alt"], "🦓", 200,
    "The zebras bring the bag back|Las cebras devuelven la bolsa|Les zèbres rapportent le sac|シマウマに助けられた",
    "Young people in zebra suits direct traffic in La Paz, and one of them runs down a dropped bag and returns it. The scheme was started in 2001 to teach road manners.|Jóvenes disfrazados de cebra dirigen el tráfico en La Paz, y uno persigue una bolsa caída para devolverla. El programa nació en 2001 para enseñar civismo vial.|Des jeunes déguisés en zèbres règlent la circulation à La Paz ; l'un d'eux rattrape un sac tombé et le rapporte. Le programme date de 2001, pour enseigner le civisme.|ラパスではシマウマの着ぐるみの若者が交通整理をしており、落とした鞄を拾ってくれた。2001年に交通マナーを教えるために始まった取り組みである。",
  ),

  // ---- 渓谷とユンガス ----
  ev(
    "death-road-brakes", "loss", ["val"], "🚵", 260,
    "Brakes replaced after the descent|Frenos nuevos tras la bajada|Freins changés après la descente|下り坂でブレーキを替えた",
    "The old Yungas road drops 3,500 m in 64 km and eats brake pads. It was called the world's most dangerous road until a bypass opened in 2006.|La antigua carretera de los Yungas baja 3.500 m en 64 km y devora pastillas. Se la llamó la más peligrosa del mundo hasta 2006.|L'ancienne route des Yungas descend de 3 500 m en 64 km et dévore les plaquettes. On la disait la plus dangereuse du monde jusqu'en 2006.|旧ユンガス道は64kmで3500m下り、ブレーキパッドを食い潰す。2006年に迂回路ができるまで「世界一危険な道」と呼ばれた。",
  ),
  ev(
    "coffee-harvest", "gain", ["val"], "☕", 280,
    "A share of the coffee picking|Una parte de la cosecha de café|Une part de la cueillette du café|珈琲の収穫を分けてもらう",
    "A smallholding needs pickers and pays by the basket. Yungas coffee grows in shade at 1,600 m and is picked entirely by hand.|Una pequeña finca necesita recolectores y paga por cesta. El café de los Yungas crece a la sombra a 1.600 m y se recoge a mano.|Une petite exploitation cherche des cueilleurs et paie au panier. Le café des Yungas pousse à l'ombre à 1 600 m et se récolte à la main.|小さな農園が摘み手を求めており、籠いくらで日当が出た。ユンガスの珈琲は標高1600mの日陰で育ち、すべて手摘みされる。",
  ),

  // ---- アマゾンとベニ ----
  ev(
    "river-boat-wait", "loss", ["ama"], "🛶", 220,
    "The river boat waits for cargo|La lancha espera carga|La barque attend le fret|川船が荷を待つ",
    "Boats leave when they are full, not when the timetable says, and that is two more nights in a hammock. Roads here vanish in the wet season.|Las lanchas salen cuando se llenan, no cuando dice el horario: dos noches más en hamaca. Aquí los caminos desaparecen en la época de lluvias.|Les bateaux partent quand ils sont pleins, pas à l'heure dite : deux nuits de plus en hamac. Les routes disparaissent à la saison des pluies.|船は時刻表ではなく荷が満ちたときに出る。ハンモックでもう二泊ぶんの費用がかかった。雨季にはこの地方の道は消える。",
  ),
  ev(
    "brazil-nut-find", "gain", ["ama"], "🌰", 300,
    "A good week for Brazil nuts|Buena semana de castaña|Bonne semaine pour la noix|ブラジルナッツの当たり週",
    "The fallen pods are gathered by hand, each holding a dozen nuts and heavy enough to be dangerous. Bolivia supplies most of the world's Brazil nuts, all from wild trees.|Los cocos caídos se recogen a mano, cada uno con una docena de castañas y peligrosamente pesados. Bolivia surte la mayor parte del mundo, todo de árboles silvestres.|Les capsules tombées se ramassent à la main, une douzaine de noix chacune, assez lourdes pour être dangereuses. La Bolivie fournit l'essentiel du marché mondial, d'arbres sauvages.|落ちた実を拾い集める手伝いをした。実ひとつに十数個の種が入り、当たれば危ないほど重い。世界のブラジルナッツの大半はボリビアの野生の木から採れる。",
  ),

  // ---- チャコとチキタニア ----
  ev(
    "mission-concert", "gain", ["cha"], "🎻", 280,
    "Playing at a mission church|Tocar en una iglesia misional|Jouer dans une église missionnaire|伝道所の教会で演奏した",
    "The Chiquitos missions still perform baroque music written there in the 1700s, and the ensemble is a player short. Thousands of scores were found in the village churches.|Las misiones de Chiquitos aún tocan música barroca escrita allí en el siglo XVIII y falta un músico. Se hallaron miles de partituras en las iglesias.|Les missions de Chiquitos jouent encore la musique baroque écrite là au XVIIIe siècle et il manque un musicien. Des milliers de partitions y furent retrouvées.|チキートスの伝道所では18世紀にこの地で書かれたバロック音楽が今も演奏され、楽団に一人欠員が出ていた。村の教会からは数千の楽譜が見つかっている。",
  ),
  ev(
    "chaco-heat", "loss", ["cha"], "🥵", 200,
    "The Chaco heat|El calor del Chaco|La chaleur du Chaco|チャコの暑さ",
    "The thermometer passes 45°C and the radiator gives out. This dry forest is one of the hottest places in South America.|El termómetro pasa de 45 °C y el radiador se rinde. Este bosque seco es de los lugares más calurosos de Sudamérica.|Le thermomètre dépasse 45 °C et le radiateur lâche. Cette forêt sèche est l'un des lieux les plus chauds d'Amérique du Sud.|気温は45℃を超え、ラジエーターが音を上げた。この乾いた森は南米で最も暑い場所のひとつである。",
  ),
];
