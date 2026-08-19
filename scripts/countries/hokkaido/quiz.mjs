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
    2,
    "What was Hokkaidō called before the Meiji government renamed it in 1869?|¿Cómo se llamaba Hokkaidō antes de que el gobierno Meiji lo renombrara en 1869?|Comment s'appelait Hokkaidō avant que le gouvernement Meiji ne la renomme en 1869 ?|1869年に明治政府が改称する前、北海道は何と呼ばれていたか?",
    [
      "Ezo|Ezo|Ezo|蝦夷地",
      "Ryūkyū|Ryūkyū|Ryūkyū|琉球",
      "Tsugaru|Tsugaru|Tsugaru|津軽",
    ],
    0,
    "Ezo (or Ezochi) was the name used for the island for centuries while the Matsumae domain held the only licence to trade there; the new name Hokkaidō, \"the road to the northern sea\", was coined in 1869 alongside a new colonisation office.|Ezo (o Ezochi) fue el nombre usado para la isla durante siglos, mientras el dominio de Matsumae poseía la única licencia para comerciar allí; el nuevo nombre Hokkaidō, «el camino hacia el mar del norte», se acuñó en 1869 junto con una nueva oficina de colonización.|Ezo (ou Ezochi) fut le nom utilisé pour l'île pendant des siècles, tandis que le domaine de Matsumae détenait la seule licence d'y commercer ; le nouveau nom Hokkaidō, « la route vers la mer du Nord », fut inventé en 1869 avec la création d'un nouvel office de colonisation.|蝦夷地(えぞち)は、松前藩がここでの交易を独占していた数百年のあいだ使われた呼び名である。「北の海への道」を意味する北海道という新しい名は、1869年に開拓使の設置とともに定められた。",
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
