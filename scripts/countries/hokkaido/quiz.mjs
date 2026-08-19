/**
 * 北海道のクイズ(先行3問・試作)。
 *
 * 難易度は他の盤面と同じ1〜10。都市カード(`cities.mjs`)が扱った具体的な
 * 事実(夕張の財政破綻・岩見沢の幌内鉄道・留萌本線の廃止・根室と東根室・
 * 白老のウポポイ)はここでは問わない。
 *
 * 本番(100〜120問)を書く際に確かめること:
 * `node scripts/check-quiz.mjs hokkaido`
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

export const HOKKAIDO_QUIZ = [
  q(
    2,
    "Which city is Hokkaidō's capital and largest city?|¿Cuál es la capital y ciudad más grande de Hokkaidō?|Quelle est la capitale et la plus grande ville de Hokkaidō ?|北海道の道庁所在地であり最大の都市はどこか?",
    [
      "Sapporo|Sapporo|Sapporo|札幌",
      "Hakodate|Hakodate|Hakodate|函館",
      "Kushiro|Kushiro|Kushiro|釧路",
    ],
    0,
    "The city was laid out from scratch in 1871 on a strict north–south grid, and in 1972 it hosted the first Winter Olympics ever held in Asia.|La ciudad se trazó desde cero en 1871 sobre una estricta cuadrícula norte-sur, y en 1972 acogió los primeros Juegos Olímpicos de Invierno celebrados en Asia.|La ville fut tracée de toutes pièces en 1871 selon un strict quadrillage nord-sud, et accueillit en 1972 les premiers Jeux olympiques d'hiver organisés en Asie.|この町は1871年、南北に厳密な碁盤目を引いてゼロから設計され、1972年にはアジア初の冬季オリンピックを開いた。",
  ),
  q(
    6,
    "A large share of Hokkaidō's city names, Sapporo among them, are generally traced back to words in which language?|¿A qué lengua se remontan generalmente muchos nombres de ciudades de Hokkaidō, entre ellas Sapporo?|D'où proviennent généralement de nombreux noms de villes de Hokkaidō, dont Sapporo ?|札幌をはじめ、北海道の都市名の多くは何語に由来するとされているか?",
    [
      "Ainu|Ainu|Aïnou|アイヌ語",
      "Russian|Ruso|Russe|ロシア語",
      "Mongolian|Mongol|Mongol|モンゴル語",
    ],
    0,
    "Sapporo is generally traced to the Ainu phrase for \"a dry, great river\", describing the Toyohira River's summer bed, and dozens of other Hokkaidō place names carry Japanese characters chosen only for their sound to match an older Ainu word.|Sapporo se suele remontar a la frase ainu para «un río grande y seco», que describe el lecho estival del río Toyohira, y decenas de otros topónimos de Hokkaidō llevan caracteres japoneses elegidos solo por su sonido, para imitar una palabra ainu más antigua.|Sapporo remonterait à l'expression aïnoue signifiant « un grand fleuve à sec », décrivant le lit estival de la rivière Toyohira, et des dizaines d'autres noms de lieux de Hokkaidō portent des caractères japonais choisis pour leur seule sonorité, calquée sur un mot aïnou plus ancien.|札幌はアイヌ語で「乾いた、大きな川」を意味する語に由来するとされ、これは豊平川の夏場の川原を指した言葉だという。北海道の地名の多くは、意味ではなく音だけを頼りに漢字を当てはめた、より古いアイヌ語由来の名である。",
  ),
  q(
    9,
    "In November 2016, JR Hokkaidō publicly listed a group of lines it said it could not keep operating without outside support. Roughly how many kilometres of track did that list cover?|En noviembre de 2016, JR Hokkaidō hizo pública una lista de líneas que, según dijo, no podía seguir operando sin ayuda externa. ¿Cuántos kilómetros de vía cubría, aproximadamente, esa lista?|En novembre 2016, JR Hokkaidō rendit publique une liste de lignes qu'elle disait ne pouvoir continuer d'exploiter sans aide extérieure. Cette liste couvrait environ combien de kilomètres de voie ?|2016年11月、JR北海道は「単独では維持が困難」と発表した路線の一覧を公表した。その総延長はおよそ何kmだったか?",
    [
      "About 400 km|Unos 400 km|Environ 400 km|約400km",
      "About 1,200 km|Unos 1.200 km|Environ 1 200 km|約1200km",
      "About 2,000 km|Unos 2.000 km|Environ 2 000 km|約2000km",
    ],
    1,
    "The list totalled roughly 1,237 km, about half of JR Hokkaidō's entire network at the time. Several of the sections on it have since closed outright, and the network keeps shrinking year by year.|La lista sumaba unos 1.237 km, casi la mitad de toda la red de JR Hokkaidō en aquel momento. Varios de esos tramos han cerrado desde entonces por completo, y la red sigue reduciéndose año tras año.|La liste totalisait environ 1 237 km, soit près de la moitié du réseau de JR Hokkaidō à l'époque. Plusieurs de ces tronçons ont depuis fermé définitivement, et le réseau continue de rétrécir chaque année.|一覧の総延長はおよそ1237kmで、これは当時のJR北海道の路線網のほぼ半分にあたる。この一覧に挙がった区間のうち複数はその後実際に廃止され、路線網はいまも年ごとに縮み続けている。",
  ),
];
