/**
 * ボリビアの出来事の追加分(フェーズ2)。
 *
 * 既存の13件は `money-events-bolivia.mjs` にある。**あちらには足さない。**
 * 取りまとめ側が `index.mjs` で2つの配列をつないで使う。
 *
 * 地方コード: alt=アルティプラーノ / val=渓谷とユンガス / ama=アマゾンとベニ / cha=チャコとチキタニア
 *
 * 書くときに確かめたこと: 既存13件の題材と重ならないこと。
 * WBSが挙げていた「ブロケオで足止め」と「高山病で酸素を買う」は、
 * それぞれ `bloqueo-detour` と `soroche` として**もうある**ので使っていない。
 */
import { t } from "./city-helpers.mjs";

function ev(id, kind, regs, emoji, amount, title, narrative) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative) };
}

export const BOLIVIA_MONEY_EVENTS_EXTRA = [
  // ---- 渓谷とユンガス ----
  ev(
    "charango-strings", "gain", ["val"], "🪕", 270,
    "Restringing charangos|Encordar charangos|Recorder des charangos|チャランゴの弦を張る",
    "A workshop in Aiquile is behind before the fair and pays you to fit and tune the strings. The town holds Bolivia's national charango contest, and the instrument's soundbox was once made from the shell of an armadillo.|Un taller de Aiquile va con retraso antes de la feria y te paga por encordar y afinar. El pueblo acoge el concurso nacional de charango, y la caja del instrumento se hacía antes con caparazón de quirquincho.|Un atelier d'Aiquile est en retard avant la foire et te paie pour monter et accorder les cordes. Le bourg accueille le concours national de charango, et la caisse de l'instrument se faisait jadis d'une carapace de tatou.|祭りを前にアイキレの工房が手一杯で、弦を張って調律する手伝いに日当が出た。この町では全国チャランゴ大会が開かれ、この楽器の胴はかつてアルマジロの甲羅で作られていた。",
  ),

  // ---- アルティプラーノ ----
  ev(
    "llama-shearing", "gain", ["alt"], "🦙", 240,
    "Hands needed at the shearing|Faltan manos en la esquila|Des bras pour la tonte|リャマの毛刈りを手伝う",
    "A herding family is short of hands and pays you by the fleece. Llamas are shorn only every second year, and Bolivia keeps more of them than any other country.|Una familia pastora anda escasa de manos y te paga por vellón. A las llamas se las esquila solo cada dos años, y Bolivia tiene más que ningún otro país.|Une famille d'éleveurs manque de bras et te paie à la toison. On ne tond les lamas que tous les deux ans, et la Bolivie en élève plus que tout autre pays.|毛刈りの季節に人手が足りず、一頭いくらで手伝った。リャマの毛を刈るのは2年に一度で、この国は世界のどこよりも多くのリャマを飼っている。",
  ),
  ev(
    "mine-gifts", "loss", ["alt"], "🧨", 220,
    "Gifts for the mining crews|Regalos para las cuadrillas|Cadeaux pour les équipes|坑夫への手みやげ",
    "Before going underground at Cerro Rico you buy the customary gifts at the miners' market — coca leaves, fizzy drinks, even dynamite. The mountain financed the Spanish crown for two centuries and is still worked today by cooperatives.|Antes de bajar al Cerro Rico compras en el mercado minero los regalos de rigor: hoja de coca, gaseosas, hasta dinamita. El cerro sostuvo a la corona española durante dos siglos y hoy lo siguen picando las cooperativas.|Avant de descendre dans le Cerro Rico, tu achètes au marché des mineurs les cadeaux d'usage : feuilles de coca, sodas, jusqu'à la dynamite. La montagne a financé la couronne d'Espagne deux siècles durant et reste creusée par des coopératives.|セロ・リコの坑道に入る前、鉱夫市場で坑夫への手みやげを買う——コカの葉、炭酸飲料、ダイナマイトまでが普通に並ぶ。この山は二世紀にわたりスペイン王室を支え、いまも協同組合が掘り続けている。",
  ),
  // 雨季の崩落。既存の `bloqueo-detour` と話の形が重ならないよう、
  // 「迂回代を払う」ではなく**積み荷が傷む**損にしてある。
  ev(
    "yungas-landslide", "loss", ["val"], "⛰", 260,
    "A landslide on the slope|Un derrumbe en la ladera|Un éboulement sur la pente|斜面が崩れて道が切れる",
    "Rain brings the hillside down across the road, and the citrus and coffee in your load spoil while you wait. This slope feeds La Paz its fruit, and every wet season a derrumbe cuts the only way up.|La lluvia echa la ladera sobre la carretera y los cítricos y el café de tu carga se pierden mientras esperas. Esta ladera abastece de fruta a La Paz, y cada época de lluvias un derrumbe corta el único camino de subida.|La pluie fait descendre le versant sur la route et les agrumes et le café de ton chargement s'abîment pendant l'attente. Ce versant nourrit La Paz en fruits, et chaque saison des pluies un éboulement coupe l'unique montée.|雨で斜面が道の上に崩れ、待っているあいだに積んでいた柑橘と珈琲が傷んだ。この斜面がラパスの果物を賄っており、雨季のたびに崩落が唯一の登り道を断つ。",
  ),

  // ---- アマゾンとベニ ----
  ev(
    "beni-branding", "gain", ["ama"], "🐂", 250,
    "Ribbons for the branding|Cintas para la marcada|Des rubans pour le marquage|牛に飾りを付ける",
    "At the marking festival every animal gets ribbons in the ranch's colours, and an extra pair of hands is worth a day's pay. The plain floods each year, and the herds still shelter on earth mounds raised by people more than a thousand years ago.|En la fiesta de la marcada cada res lleva cintas con los colores de la estancia, y un par de manos más vale un jornal. El llano se inunda cada año y el ganado aún se refugia en lomas levantadas por gente hace más de mil años.|À la fête du marquage, chaque bête reçoit des rubans aux couleurs de l'estancia, et une paire de bras vaut une journée de paie. La plaine s'inonde chaque année et les troupeaux s'abritent encore sur des tertres élevés par des hommes il y a plus de mille ans.|マルカーダの祭りでは一頭ずつに牧場の色のリボンを結び、手が足りず日当が出た。この平原は毎年水に浸かり、牛は千年以上前の人々が築いた土の高台に今も逃げ込む。",
  ),

  // ---- チャコとチキタニア ----
  ev(
    "rail-terminus", "gain", ["cha"], "🛤", 290,
    "Loading at the end of the line|Cargar en el fin de la vía|Charger au terminus|線路の終わりで積み込む",
    "The freight yard at the border needs porters before the train turns back, and the work pays by the wagon. Bolivia's two railway networks have never been joined — this eastern one runs to Argentina and Brazil, and no track connects it to the Andean side.|La playa de carga en la frontera necesita cargadores antes de que el tren regrese, y se paga por vagón. Las dos redes ferroviarias de Bolivia nunca se unieron: esta oriental llega a Argentina y Brasil, y ningún riel la conecta con la andina.|La gare de fret à la frontière cherche des porteurs avant que le train ne reparte, et le travail se paie au wagon. Les deux réseaux ferrés de Bolivie n'ont jamais été reliés : celui de l'est va vers l'Argentine et le Brésil, aucun rail ne le raccorde au versant andin.|国境の貨物ヤードで、列車が折り返す前の積み込みに人手が要り、貨車いくらで働いた。ボリビアの鉄道は東西2つの網が今も繋がっておらず、この東側はアルゼンチンとブラジルへ延びるが、アンデス側へ通じる線路は1本も無い。",
  ),
  ev(
    "chaqueo-smoke", "loss", ["cha"], "🔥", 240,
    "Grounded by the burning|En tierra por el chaqueo|Cloué au sol par les brûlis|焼き畑の煙で足止め",
    "Smoke from the chaqueo — the clearing fires lit every year before the rains — closes the airstrip, and you pay for nights you had not planned. In a bad year the haze shuts airports hundreds of kilometres away.|El humo del chaqueo —las quemas que se encienden cada año antes de las lluvias— cierra la pista, y pagas noches que no habías previsto. En un mal año la calina cierra aeropuertos a cientos de kilómetros.|La fumée du chaqueo — les feux d'essartage allumés chaque année avant les pluies — ferme la piste, et tu paies des nuits imprévues. Une mauvaise année, la brume ferme des aéroports à des centaines de kilomètres.|雨季の前に毎年放たれる焼き畑「チャケオ」の煙で滑走路が閉じ、予定に無い宿代がかさんだ。ひどい年には数百キロ離れた空港まで霞んで閉まる。",
  ),
];
