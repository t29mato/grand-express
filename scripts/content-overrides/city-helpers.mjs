/**
 * 都市定義を短く書くための共通ヘルパー。
 *
 * 都市が増えるほど、1件ごとにオブジェクトリテラルを組み立てるのは
 * 見通しが悪く、書き間違いにも気づきにくい。位置引数で1件1ブロックに
 * 収まる形にして、抜けがあればその場で分かるようにする。
 */

/** `_t("en|es|fr|ja")` 相当。4言語に分けられなければエラーにする。 */
export function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 物件 [名前, 価格, 四半期収入]。 */
export function prop(name, cost, income) {
  return { n: t(name), cost, inc: income };
}

/**
 * 都市1件。
 *
 * @param n    "英|西|仏|日" の都市名
 * @param lo   経度
 * @param la   緯度
 * @param reg  地方コード
 * @param mark 盤面・都市カードのシンボル(既存の `marks` のキー)
 * @param bg   都市イラストの背景(既存の `bg` のキー)
 * @param lp   盤面のラベル位置 "l" | "r" | "b"
 * @param tag  ひとこと紹介
 * @param fact 豆知識(2文程度)
 * @param props 物件2件
 */
export function city(n, lo, la, reg, mark, bg, lp, tag, fact, props) {
  if (!Array.isArray(props) || props.length !== 2) {
    throw new Error(`${n}: 物件はちょうど2件にしてください`);
  }
  return { n: t(n), lo, la, reg, mark, bg, lp, tag: t(tag), fact: t(fact), props };
}
