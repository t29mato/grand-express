import { CurrencyFormat } from "../../domain/country/country-content-pack";

/**
 * 金額を国ごとの通貨表記に整形する(legacyの `fmt()` の移植)。
 * legacyと同じく、内部の値に `multiplier` を掛けて四捨五入し、3桁区切りにして
 * 接頭辞・接尾辞を付ける(例: ボリビアなら `Bs 120,000`、日本なら `¥120,000`)。
 *
 * 桁区切りはlegacyが `toLocaleString("en-US")` 固定なのに合わせ、表示言語によらず
 * カンマ区切りにしている(言語ごとに区切り文字が変わると金額の見た目が揺れるため)。
 */
export function formatMoney(amount: number, currency: CurrencyFormat): string {
  const value = Math.round(amount * currency.multiplier);
  return currency.prefix + value.toLocaleString("en-US") + currency.suffix;
}
