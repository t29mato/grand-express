/**
 * legacy から抽出したコンテンツに対する、このリポジトリで新たに作成した上書き・追加分。
 *
 * `legacy/grand-express.html` はアーカイブとして凍結しているため書き換えず、
 * 抽出後にこの定義をマージする。移行(legacyの再現)が終わった後の
 * 通常のコンテンツ開発は、すべてここに足していく。
 */
import { JAPAN_TERRAIN } from "./japan-terrain.mjs";
import { BOLIVIA_LAND } from "./bolivia-geography.mjs";
import { QUIZ_DIFFICULTY } from "./quiz-difficulty.mjs";
import { JAPAN_LAND } from "./japan-geography.mjs";
import { JAPAN_ISLAND_CITIES, JAPAN_ISLAND_EDGES } from "./japan-islands.mjs";
import { JAPAN_HOKKAIDO_CITIES, JAPAN_HOKKAIDO_EDGES } from "./japan-hokkaido.mjs";
import { JAPAN_MONEY_EVENTS } from "./money-events-japan.mjs";
import { JAPAN_REMOVED_EDGES } from "./japan-line-pruning.mjs";
import { BOLIVIA_MONEY_EVENTS } from "./money-events-bolivia.mjs";
import { BOLIVIA_MONEY_EVENTS_EXTRA } from "./money-events-bolivia-extra.mjs";
import { BOLIVIA_EXTRA_CITIES, BOLIVIA_EXTRA_EDGES } from "./bolivia-cities.mjs";
import { BOLIVIA_QUIZ_REPLACEMENTS } from "./bolivia-quiz.mjs";
import { JAPAN_QUIZ_REPLACEMENTS } from "./japan-quiz.mjs";
import { BOLIVIA_QUIZ_EXTRA } from "./bolivia-quiz-extra.mjs";
import { JAPAN_QUIZ_EXTRA } from "./japan-quiz-extra.mjs";
import { ITEM_TEXT } from "./item-text.mjs";
import { CITY_BG } from "./city-backgrounds.mjs";
import { CURRENCY_MULTIPLIERS, CITY_PROPS, applyCityProps } from "./property-economy.mjs";
import {
  JAPAN_EXTRA_CITIES,
  JAPAN_EXTRA_EDGES,
  JAPAN_PREFECTURE_CITIES,
  JAPAN_PREFECTURE_EDGES,
} from "./japan-cities.mjs";

/**
 * 盤面の拡大率。都市を増やしたぶんマスが詰まって見えるため、盤面の座標系そのものを
 * 広げて余裕を持たせる。`seg`(中間マス1個あたりの目安距離)も同じ率で広げるので、
 * **中間マスの数は変えずに、マス同士の間隔だけが広がる**。
 * マーカーの寸法は盤面座標で固定なので、相対的に小さく=すっきり見える。
 */
const BOARD_SCALE = { bolivia: 1.35, japan: 1.75 };

/**
 * 投影の経緯度範囲の上書き。
 * 日本は legacy が西端を東経127度(沖縄本島)までしか取っていなかったため、
 * 先島諸島(宮古島・石垣島)が盤面の外に落ちてしまう。西へ広げるとともに、
 * 1度あたりの距離が変わらないよう横幅も同じ比率で広げる
 * (広げないと日本列島全体が横に潰れてしまう)。
 */
/**
 * legacy の都市座標の補正。
 *
 * 抽出元にあった経緯度が実際の位置とずれており、国境の外に描かれていたもの。
 * legacy(アーカイブ)は書き換えず、ここで正しい値に差し替える。
 */
const CITY_COORDS = {
  bolivia: {
    // グアヤラメリンはマモレ川沿いのブラジル国境の町(10°49'S 65°21'W)。
    guayaramerin: { lo: -65.35, la: -10.82 },
    // ビジャソンはアルゼンチン国境の町(22°06'S 65°36'W)。
    // 国境の折れがちょうどこの緯度を通るため、線がアルゼンチン側へ出ないよう
    // わずかに北へ寄せてある。
    villazon: { lo: -65.6, la: -22.02 },
    // ウユニは 20°28'S 66°50'W。legacy の値は0.4度ほど西にずれており、
    // サハマからの線がチリ側へはみ出す原因になっていた。
    uyuni: { lo: -66.83, la: -20.46 },
    // コビハは 11°01'S 68°45'W。legacy の値は西に寄りすぎていて、
    // リベラルタへの線がブラジル側へ出ていた。
    cobija: { lo: -68.85, la: -11.1 },
  },
};

/**
 * legacy のアイテム価格の見直し。
 *
 * お守り系(quiz-save)は「クイズに外したときの損失を肩代わりする」だけで、
 * 損失は最大147。340では**どう転んでも損**なので、割に合う値に下げる。
 *
 * 移動アイテム(エケコ人形・飛行機)は560だった。目的地へ確実に着けた頃の値段で、
 * いまは向きが選べない(遠ざかることもある)ので、思い通りに動ける
 * サイコロ2個振り(360)より安い240に下げる。
 */
const ITEM_PRICES = {
  bolivia: { pacha: 130, ekeko: 240 },
  japan: { daruma: 130, hikouki: 240 },
};

const PROJ_BOUNDS = {
  // 西は石垣・与那国(東経123度台)、南は与那国・竹富(北緯24.3度)まで入れる。
  // legacy は沖縄本島までしか想定しておらず、先島諸島は盤面の外に落ちていた。
  japan: { LON0: 123.4, LAT1: 23.8 },
};

const OVERRIDES = {
  bolivia: {
    land: BOLIVIA_LAND,
    bg: CITY_BG.bolivia,
    cityCoords: CITY_COORDS.bolivia,
    itemPrices: ITEM_PRICES.bolivia,
    itemText: ITEM_TEXT.bolivia,
    moneyEvents: [...BOLIVIA_MONEY_EVENTS, ...BOLIVIA_MONEY_EVENTS_EXTRA],
    boardScale: BOARD_SCALE.bolivia,
    quizDifficulty: QUIZ_DIFFICULTY.bolivia,
    quiz: BOLIVIA_QUIZ_REPLACEMENTS,
    extraQuiz: BOLIVIA_QUIZ_EXTRA,
    extraCities: BOLIVIA_EXTRA_CITIES,
    extraEdges: BOLIVIA_EXTRA_EDGES,
  },
  japan: {
    land: JAPAN_LAND,
    bg: CITY_BG.japan,
    boardScale: BOARD_SCALE.japan,
    projBounds: PROJ_BOUNDS.japan,
    itemPrices: ITEM_PRICES.japan,
    itemText: ITEM_TEXT.japan,
    moneyEvents: JAPAN_MONEY_EVENTS,
    removedEdges: JAPAN_REMOVED_EDGES,
    // 金沢—新潟は途中の富山を素通りする長距離線で、縦・横・45度で引くと
    // 富山湾を丸ごと横切り、204pxにわたって海の上を走っていた。
    // 北陸本線の実際の順路どおり、富山から新潟へつなぎ替える。
    //
    // つなぎ替えるだけでは直らない。経路が「先に斜めへ折れるか」は**並び順の偶奇**で
    // 決まっていて、この位置(奇数番目)だと日本海へ張り出す向きになるためで、
    // 実測でも 214px 残った。そこで、**どちらの折れ方でも陸に収まる**
    // 松本—名古屋と場所を入れ替えている(下2行はその入れ替え)。
    rewiredEdges: [
      { from: ["matsumoto", "nagoya"], to: ["toyama", "niigata"] },
      { from: ["kanazawa", "niigata"], to: ["matsumoto", "nagoya"] },
      // 端の順を入れ替えると、折れ点が「片方の緯度」から「もう片方の緯度」へ移る。
      // 添字が動かないので、他の路線の折れ方には影響しない。
      { from: ["kagoshima", "naha"], to: ["naha", "kagoshima"] }, // 陸158px → 58px
      { from: ["kagoshima", "tanegashima"], to: ["tanegashima", "kagoshima"] }, // 陸65px → 57px
    ],
    // 鹿児島—那覇は legacy では陸路になっているが、あいだは650kmの東シナ海で
    // 鉄道は無い(実際に通っているのは鹿児島—奄美—那覇のフェリー)。
    edgeKinds: [["kagoshima", "naha", "sea"]],
    terrain: JAPAN_TERRAIN,
    extraCities: { ...JAPAN_EXTRA_CITIES, ...JAPAN_PREFECTURE_CITIES, ...JAPAN_ISLAND_CITIES, ...JAPAN_HOKKAIDO_CITIES },
    extraEdges: [...JAPAN_EXTRA_EDGES, ...JAPAN_PREFECTURE_EDGES, ...JAPAN_ISLAND_EDGES, ...JAPAN_HOKKAIDO_EDGES],
    quizDifficulty: QUIZ_DIFFICULTY.japan,
    quiz: JAPAN_QUIZ_REPLACEMENTS,
    extraQuiz: JAPAN_QUIZ_EXTRA,
  },
};

/**
 * お金の尺度は6盤面ぶんまとめて `property-economy.mjs` が持っている。
 * legacy 由来かどうかで書く場所が変わると、盤面をまたいだ釣り合いが
 * 2ファイルに割れて比べられなくなるため、ここで全部の国に配る。
 *
 * インド・フランス・世界一周・茨城は `scripts/countries/<国>/cities.mjs` を
 * 直接書けるが、あえてこちらに置いている。**あのファイルは文章を書く人の持ち物**で、
 * 同時に触ると壊れる(CLAUDE.md「並行作業」)。
 */
for (const countryId of Object.keys(CURRENCY_MULTIPLIERS)) {
  const override = (OVERRIDES[countryId] ??= {});
  override.currencyMultiplier = CURRENCY_MULTIPLIERS[countryId];
  if (CITY_PROPS[countryId]) override.cityProps = CITY_PROPS[countryId];
}

/**
 * 抽出済みの国コンテンツにオーバーライドを適用する(引数を破壊的に変更する)。
 * 追加都市のIDが既存と衝突した場合や、存在しない都市を結ぶ路線を指定した場合は
 * 静かに壊れないようエラーにする。
 */
export function applyContentOverrides(countryId, content) {
  const override = OVERRIDES[countryId];
  if (!override) return content;

  if (override.land) content.land = override.land;

  /**
   * 都市の背景の差し替え。
   *
   * legacy由来の国(ボリビア・日本)は背景も legacy に書かれているが、
   * `legacy/grand-express.html` は凍結しているので直接は直せない。
   * ここでキーごとに上書きする(全部を置き換えるのではなく、書いたものだけ)。
   *
   * **背景の中央25%は都市のシンボルに隠れる**(x=151〜249 / y=54〜152。
   * `city-art.tsx` が s=4.1 / gy=152 で描くため)。細部は左右3分の1と
   * 手前に置くこと。中央に主役を置くと、そのぶん見えない。
   */
  if (override.bg && content.bg) {
    for (const [key, replacement] of Object.entries(override.bg)) {
      // 文字列なら丸ごと差し替え、関数なら**元の絵を受け取って直す**。
      //
      // legacy の背景を少しだけ直したいとき、丸ごと書き写すと20KB近くになり、
      // 次に読む人が「どこを変えたのか」を差分で追えなくなる。
      // 関数なら `(prev) => prev.replace(a, b)` の1行で済み、意図も残る。
      content.bg[key] =
        typeof replacement === "function" ? replacement(content.bg[key]) : replacement;
    }
  }
  if (override.terrain && content.terrain) content.terrain = override.terrain;

  // サムネイル生成時は proj を持たない部分オブジェクトで呼ばれるため、その場合は何もしない
  // (サムネイルは自前のviewBoxで描くので盤面の拡大とは無関係)。
  if (content.proj) {
    let proj = content.proj;

    if (override.projBounds) {
      const {
        LON0 = proj.LON0,
        LON1 = proj.LON1,
        LAT0 = proj.LAT0,
        LAT1 = proj.LAT1,
      } = override.projBounds;
      // 1度あたりのピクセル数を保つ(範囲を広げたぶん盤面も広げる)。
      // 保たないと、広げた方向に地図が潰れてしまう。
      const pxPerLon = proj.BW / (proj.LON1 - proj.LON0);
      const pxPerLat = proj.BH / (proj.LAT1 - proj.LAT0);
      proj = {
        ...proj,
        LON0,
        LON1,
        LAT0,
        LAT1,
        BW: Math.round(pxPerLon * (LON1 - LON0)),
        BH: Math.round(pxPerLat * (LAT1 - LAT0)),
      };
    }

    if (override.boardScale) {
      const scale = override.boardScale;
      proj = {
        ...proj,
        BW: Math.round(proj.BW * scale),
        BH: Math.round(proj.BH * scale),
        seg: Math.round((proj.seg ?? 64) * scale),
      };
    }

    content.proj = proj;
  }

  /**
   * クイズの差し替え。**難易度より先に適用する**(差し替えた問題にも難易度が乗るように)。
   *
   * legacy 由来の盤面(ボリビア・日本)はクイズが `legacy/grand-express.html` に
   * 埋め込まれていて、凍結しているので直接は直せない。ここで添字を指定して差し替える。
   *
   * **元の問題に重ねる形にしてある**(`{ ...元, ...差し替え }`)。
   * 問いだけ、選択肢だけ、を直したいことがあるため。
   *
   * 添字を間違えると**別の問題を黙って壊す**ので、範囲外はエラーにする。
   */
  if (override.quiz && content.quiz) {
    for (const [key, replacement] of Object.entries(override.quiz)) {
      const i = Number(key);
      if (!Number.isInteger(i) || i < 0 || i >= content.quiz.length) {
        throw new Error(
          `${countryId}: 差し替えようとしたクイズの添字 ${key} が範囲外です(0〜${content.quiz.length - 1})`,
        );
      }
      content.quiz[i] = { ...content.quiz[i], ...replacement };
    }
  }

  // サムネイル生成時は quiz を持たない部分オブジェクトで呼ばれるため読み飛ばす。
  if (override.quizDifficulty && content.quiz) {
    const levels = override.quizDifficulty;
    if (levels.length !== content.quiz.length) {
      throw new Error(
        `${countryId}: クイズの難易度が ${levels.length} 件ですが、問題は ${content.quiz.length} 件あります` +
          "(問題を増減したら scripts/content-overrides/quiz-difficulty.mjs も更新してください)",
      );
    }
    content.quiz = content.quiz.map((q, i) => {
      const level = levels[i];
      if (!Number.isInteger(level) || level < 1 || level > 10) {
        throw new Error(`${countryId}: 問題 ${i} の難易度 ${level} が範囲外です(1〜10)`);
      }
      return { ...q, difficulty: level };
    });
  }

  /**
   * クイズを**足す**(日本・ボリビアだけ)。
   *
   * ほかの盤面は `scripts/countries/<国>/quiz.mjs` に直接書き足せるが、この2つは
   * 問題が凍結した legacy の中にあるので、差し替え(添字)しか手が無かった。
   * **足す口が無いと、この2盤面だけクイズを増やせない。**
   *
   * **`quizDifficulty` の件数合わせより後で足すこと。**あれは legacy の問題数と
   * 突き合わせる検査なので、先に足すと必ず件数が食い違って落ちる。
   *
   * 足すほうは難易度を自分で持つ(`quiz-difficulty.mjs` には書かない)。
   */
  if (override.extraQuiz && content.quiz) {
    for (const [i, q] of override.extraQuiz.entries()) {
      const level = q.difficulty;
      if (!Number.isInteger(level) || level < 1 || level > 10) {
        throw new Error(`${countryId}: 足した問題 ${i} の難易度 ${level} が範囲外です(1〜10)`);
      }
      if (q.o.length !== 3 || !Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) {
        throw new Error(`${countryId}: 足した問題 ${i} の選択肢は3つ、正解の添字は0〜2です`);
      }
    }
    content.quiz = [...content.quiz, ...override.extraQuiz];
  }

  // 既存都市の座標補正は、追加より先に行う(追加分と混ざらないように)。
  if (override.cityCoords && content.cities) {
    for (const [id, at] of Object.entries(override.cityCoords)) {
      const city = content.cities[id];
      if (!city) {
        throw new Error(`${countryId}: 座標を補正しようとした都市 "${id}" がありません`);
      }
      content.cities[id] = { ...city, lo: at.lo ?? city.lo, la: at.la ?? city.la };
    }
  }

  /**
   * 表示倍率。**表示専用**で、`formatMoney` が `内部の値 × mul` を出すだけ。
   * 釣り合いには一切効かないので、桁が気に入らなければここだけ戻せばよい。
   * サムネイル生成時は `cur` を持たない部分オブジェクトで呼ばれるため読み飛ばす。
   */
  if (override.currencyMultiplier && content.cur) {
    content.cur = { ...content.cur, mul: override.currencyMultiplier };
  }

  if (override.itemPrices && content.items) {
    for (const [key, price] of Object.entries(override.itemPrices)) {
      if (!content.items[key]) {
        throw new Error(`${countryId}: 値を変えようとしたアイテム "${key}" がありません`);
      }
      content.items[key] = { ...content.items[key], price };
    }
  }

  if (override.itemText && content.items) {
    for (const [key, fields] of Object.entries(override.itemText)) {
      if (!content.items[key]) {
        throw new Error(`${countryId}: 文言を変えようとしたアイテム "${key}" がありません`);
      }
      content.items[key] = { ...content.items[key], ...fields };
    }
  }

  if (override.extraCities) {
    for (const [id, city] of Object.entries(override.extraCities)) {
      if (content.cities[id]) {
        throw new Error(`${countryId}: 追加都市 "${id}" は既に存在します`);
      }
      content.cities[id] = city;
    }
  }

  // 物件の値段。こちらは**釣り合いが動く**(表示倍率と違って戻すだけでは済まない)。
  // 追加都市も対象にできるよう `extraCities` の**後**で適用する。
  if (override.cityProps && content.cities) {
    applyCityProps(countryId, content, override.cityProps);
  }

  if (override.extraEdges) {
    for (const [a, b, kind] of override.extraEdges) {
      for (const id of [a, b]) {
        if (!content.cities[id]) {
          throw new Error(`${countryId}: 路線が存在しない都市 "${id}" を指しています`);
        }
      }
      const duplicated = content.edges.some(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
      if (duplicated) {
        throw new Error(`${countryId}: 路線 ${a}-${b} は既に存在します`);
      }
      // 3要素目に "sea" を指定すると航路になる(省略時は陸路)。
      content.edges.push(kind ? [a, b, kind] : [a, b]);
    }
  }

  // 路線のつなぎ替え。**並び順を変えずに、端の町だけ差し替える。**
  // 消して足し直すと後ろ全部の添字がずれるため(下の edgeKinds と同じ理由)。
  if (override.rewiredEdges) {
    for (const { from, to } of override.rewiredEdges) {
      const [a, b] = from;
      const edge = content.edges.find(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
      if (!edge) {
        throw new Error(`${countryId}: つなぎ替えようとした路線 ${a}-${b} がありません`);
      }
      for (const id of to) {
        if (!content.cities[id]) {
          throw new Error(`${countryId}: 路線が存在しない都市 "${id}" を指しています`);
        }
      }
      edge[0] = to[0];
      edge[1] = to[1];
    }
  }

  // 陸路 ↔ 航路の付け替え。**並び順を変えずに種類だけ差し替える。**
  // いったん消して足し直すと、その路線より後ろの全部の添字がずれる。添字の偶奇は
  // 経路の折れる向きを決めているので、関係のない路線の引き方まで変わってしまう。
  if (override.edgeKinds) {
    for (const [a, b, kind] of override.edgeKinds) {
      const edge = content.edges.find(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
      if (!edge) {
        throw new Error(`${countryId}: 種類を変えようとした路線 ${a}-${b} がありません`);
      }
      edge.length = 2;
      if (kind) edge.push(kind);
    }
  }

  // 路線の削除は**追加のあと**に行う。外したい路線には、この上書き層で
  // 足したもの(例: 名古屋—静岡)も含まれるため。
  //
  // ⚠ **路線を増やす・減らすと、無関係な路線の形まで変わる。**
  //   経路が「先に斜めへ折れるか」(`use-board-layout.ts` の `diagonalFirst`)は
  //   **並び順の偶奇** `edgeIndex % 2` で決まっている。途中の1本を消すと、
  //   それより後ろ全部の添字が1ずれて折れ方が裏返る。
  //   日本で1本消したとき、81本ぶんの添字がずれ、海の上を通る線の長さが
  //   470px → 899px に増えた(実測)。マスの種類も `h32(edgeIndex * 97 + k)` で
  //   決まっているので、同時に並びかたが変わる。
  //
  //   なので「この路線だけ直したい」ときは、消して足し直すのではなく
  //   **並び順を保つ** `rewiredEdges`(つなぎ先)/ `edgeKinds`(陸路↔航路)を使うこと。
  //   増減が必要なときは、直したあとに必ず盤面全体を数え直すこと。
  if (override.removedEdges && content.edges) {
    for (const [a, b] of override.removedEdges) {
      const before = content.edges.length;
      content.edges = content.edges.filter(
        ([x, y]) => !((x === a && y === b) || (x === b && y === a)),
      );
      if (content.edges.length === before) {
        throw new Error(
          `${countryId}: 外そうとした路線 ${a}-${b} が見つかりません` +
            "(既に消えているか、都市IDの綴りが違います)",
        );
      }
    }
  }


  // 青マス・赤マスの出来事は legacy に無いので、この層でのみ与える。
  // サムネイル生成時のような部分オブジェクトでは何もしない。
  // サムネイル生成時は regions を持たない部分オブジェクトで呼ばれるため読み飛ばす。
  if (override.moneyEvents && content.regions) {
    const regions = new Set(Object.keys(content.regions));
    for (const event of override.moneyEvents) {
      for (const reg of event.regs) {
        if (!regions.has(reg)) {
          throw new Error(`${countryId}: 出来事 "${event.id}" が知らない地方 "${reg}" を指しています`);
        }
      }
    }
    content.moneyEvents = override.moneyEvents;
  }

  return content;
}
