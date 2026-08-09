/**
 * 絵のファイルを**入口ファイルへ写し取って**組み立てる。撮影・計測の共通部分。
 *
 * ## なぜ import で読まないのか
 *
 * 2026-08-09、**ファイルを直したのに前の絵が撮れた。**ディスク上は新しかった。
 * 撮った絵を目で見て確かめる手順そのものが嘘になるので、これは静かに間違える。
 *
 * **原因は突き止められていない。**最初は「`strictPort: false` で開きながら
 * 設定値のポートへ繋いでいるから、他人のサーバに当たる」と見たが、**これは誤りだった。**
 * Vite は listen のあと `config.server.port` を実際の番号に書き換える(実測)。
 *
 * 原因が分からないので、**経路ごと断った。**入口ファイルの名前は実行ごとに変わるから、
 * そこへ写し込んだ中身は**一度も読まれたことのないモジュール**になる。使い回しようがない。
 *
 * `?v=` を付けて別物にする手も試したが、**JSX の変換が効かなくなる**
 * (拡張子で判断しているので `.tsx?v=1` は tsx として扱われない)。
 *
 * 絵は外部を参照しない約束なので写せる(dooms と animations の133枚すべてに
 * `import` が無いことを確認済み)。持っているものだけ、従来どおり import する。
 */
import { readFileSync } from "node:fs";

/**
 * @param {string[]} paths 絵の tsx の絶対パス
 * @returns {{ prelude: string, names: string[] }}
 *   `prelude` を入口ファイルの先頭に置き、`names[i]` をそのまま部品として書く。
 */
export function sceneSources(paths) {
  const parts = [];
  const names = [];
  paths.forEach((path, i) => {
    const src = readFileSync(path, "utf8");
    const decl = src.match(/export\s+function\s+[A-Za-z0-9_$]+/);
    if (/^\s*import\s/m.test(src) || !decl) {
      parts.push(`import * as __m${i} from ${JSON.stringify(path)};`);
      names.push(`Object.values(__m${i}).find((v) => typeof v === "function")`);
      return;
    }
    // 1つのファイルへまとめて写すので、名前がぶつからないよう付け替える。
    parts.push(src.replace(decl[0], `function __S${i}`));
    names.push(`__S${i}`);
  });
  return { prelude: parts.join("\n"), names };
}
