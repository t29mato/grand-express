/**
 * エジプトのクイズ(試作3問。うち1問は難易度9)。
 *
 * 難易度は他の盤面と同じ基準(「その国の外にいる一般的な人がどれくらい
 * 答えられそうか」)。都市カードに書いた事実はそのまま答えにしない。
 *
 * 難易度9の問い(Q3)は年号と金額を含むため、報告に確度を書いた。
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

export const EGYPT_QUIZ = [
  q(
    2,
    "What is the capital of Egypt?|¿Cuál es la capital de Egipto?|Quelle est la capitale de l'Égypte ?|エジプトの首都はどこか?",
    [
      "Cairo|El Cairo|Le Caire|カイロ",
      "Alexandria|Alejandría|Alexandrie|アレクサンドリア",
      "Luxor|Luxor|Louxor|ルクソール",
    ],
    0,
    "Cairo has served as Egypt's capital continuously since it was founded in 969 CE, its name al-Qahira meaning \"the victorious\".|El Cairo ha sido la capital de Egipto de forma continua desde su fundación en el año 969, y su nombre, al-Qahira, significa «la victoriosa».|Le Caire est la capitale continue de l'Égypte depuis sa fondation en 969, son nom, al-Qahira, signifiant « la victorieuse ».|カイロは969年に建設されて以来、途切れることなくエジプトの首都であり続けている。その名アル・カーヒラは「勝利の都」を意味する。",
  ),
  q(
    5,
    "What crop, historically prized for its unusually long, fine fibre, made the Nile Delta world-famous for over a century?|¿Qué cultivo, apreciado históricamente por su fibra inusualmente larga y fina, hizo mundialmente famoso al delta del Nilo durante más de un siglo?|Quelle culture, historiquement prisée pour sa fibre inhabituellement longue et fine, a rendu le delta du Nil mondialement célèbre pendant plus d'un siècle?|異例に長く上質な繊維で知られ、1世紀以上にわたりナイルデルタを世界的に有名にした作物は?",
    [
      "Cotton|Algodón|Coton|綿花",
      "Sugarcane|Caña de azúcar|Canne à sucre|サトウキビ",
      "Tobacco|Tabaco|Tabac|タバコ",
    ],
    0,
    "Egyptian long-staple cotton boomed especially after the American Civil War cut off competing US supply in the 1860s, and the crop still shapes the Delta's rail lines, canals and market towns even though it now competes with cheaper synthetic and imported fibres.|El algodón egipcio de fibra larga vivió un auge sobre todo tras la Guerra Civil estadounidense, que cortó el suministro rival de EE. UU. en la década de 1860, y el cultivo aún moldea las líneas férreas, los canales y las ciudades mercado del delta, aunque hoy compite con fibras sintéticas e importadas más baratas.|Le coton égyptien à fibre longue connut un essor surtout après que la guerre de Sécession eut coupé l'offre concurrente des États-Unis dans les années 1860, et cette culture façonne encore les lignes ferroviaires, les canaux et les villes marchandes du delta, même si elle rivalise désormais avec des fibres synthétiques et importées moins chères.|エジプト産長繊維綿は、1860年代にアメリカ南北戦争でアメリカ産の競合品が途絶えたのを機に特に栄えた。今では安価な合成繊維や輸入繊維と競合しているものの、この作物はいまもデルタの鉄道網・運河・市場町の形を決めている。",
  ),
  q(
    9,
    "On 3 November 2016, Egypt's central bank let the pound float freely for the first time, as a condition of a loan from the IMF. Roughly what did the official rate move from and to against the US dollar that day?|El 3 de noviembre de 2016, el banco central de Egipto dejó flotar libremente la libra por primera vez, como condición de un préstamo del FMI. ¿Entre qué cifras se movió aproximadamente ese día el tipo de cambio oficial frente al dólar estadounidense?|Le 3 novembre 2016, la banque centrale d'Égypte a laissé flotter librement la livre pour la première fois, condition d'un prêt du FMI. Entre quels chiffres environ le taux officiel face au dollar américain a-t-il évolué ce jour-là?|2016年11月3日、エジプト中央銀行はIMF融資の条件として、ポンドを初めて完全変動相場に移行させた。この日、対米ドルの公定レートはおよそいくらからいくらへ動いたか?",
    [
      "From about 8.8 to about 13 pounds per dollar|De unas 8,8 a unas 13 libras por dólar|D'environ 8,8 à environ 13 livres pour un dollar|1ドル=約8.8ポンドから約13ポンドへ",
      "From about 3.5 to about 6 pounds per dollar|De unas 3,5 a unas 6 libras por dólar|D'environ 3,5 à environ 6 livres pour un dollar|1ドル=約3.5ポンドから約6ポンドへ",
      "From about 13 to about 30 pounds per dollar|De unas 13 a unas 30 libras por dólar|D'environ 13 à environ 30 livres pour un dollar|1ドル=約13ポンドから約30ポンドへ",
    ],
    0,
    "The move was a roughly 32% devaluation in a single day; the pound weakened further in the following weeks, and on 11 November the IMF board approved a three-year, about $12 billion loan tied to the float and to cuts in long-standing fuel and food subsidies.|El movimiento supuso una devaluación de cerca del 32% en un solo día; la libra se debilitó aún más en las semanas siguientes, y el 11 de noviembre el directorio del FMI aprobó un préstamo a tres años de unos 12.000 millones de dólares, ligado a la flotación y a recortes de subsidios de combustible y alimentos de larga data.|Ce mouvement représenta une dévaluation d'environ 32% en une seule journée; la livre s'affaiblit encore dans les semaines suivantes, et le 11 novembre le conseil du FMI approuva un prêt de trois ans d'environ 12 milliards de dollars, lié à cette flottaison et à des coupes dans des subventions de longue date sur le carburant et l'alimentation.|この変更は1日でおよそ32%の切り下げに相当した。ポンドはその後の数週間でさらに弱含み、11月11日にはIMF理事会が、この変動相場移行と長年続いた燃料・食料補助金の削減を条件とする、3年・およそ120億ドルの融資を承認した。",
  ),
];
