#!/usr/bin/env node
/**
 * 依存関係の図を **コードから自動生成** して
 * `docs/10-architecture/06-dependency-graph.md` に書き出す。
 *
 * 手書きの図は実装とずれるが、この図は毎回 dependency-cruiser が実際の import を
 * たどって描くのでずれない。CI では `--check` で生成結果とコミット済みの内容を
 * 突き合わせ、構造を変えたのに図を更新していない場合に失敗させる。
 *
 *   node scripts/generate-dependency-graph.mjs          # 生成して書き出す
 *   node scripts/generate-dependency-graph.mjs --check  # 差分があれば異常終了
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outputPath = join(root, "docs", "10-architecture", "06-dependency-graph.md");
const depcruise = join(root, "node_modules", ".bin", "depcruise");

/** テストと外部パッケージは構造の関心事ではないので除外する。 */
const EXCLUDE = "node_modules|[.]test[.]|^tests/";

function runDepcruise(target, collapse) {
  const output = execFileSync(
    depcruise,
    [
      target,
      "--config",
      ".dependency-cruiser.cjs",
      "--output-type",
      "mermaid",
      "--collapse",
      collapse,
      "--do-not-follow",
      "node_modules",
      "--exclude",
      EXCLUDE,
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
  );
  return output.trim();
}

const layers = runDepcruise("src", "2");
const packages = runDepcruise("src", "3");
const subdomains = runDepcruise("src/domain", "^src/domain/[^/]+/");

const content = `# 10-06. 依存関係グラフ(自動生成)

> **このファイルは自動生成される。** 手で編集しても次の生成で上書きされる。
> 更新するには \`npm run graph\` を実行すること。
> CI では \`npm run graph:check\` が生成結果とこのファイルを突き合わせ、
> 構造を変えたのに図を更新していない場合に失敗する。

[10-05 クラス図](./05-class-diagram.md) が**手書きで意図を伝える図**なのに対し、
こちらは **dependency-cruiser が実際の \`import\` をたどって描いた図**である。
実装と必ず一致するので、「本当は今どうなっているか」を知りたいときはこちらを見る。

生成コマンド(テストと外部パッケージは構造の関心事ではないので除外している):

\`\`\`bash
npm run graph
\`\`\`

## 1. 層の依存(パッケージ図)

Clean Architecture の要である**依存の向き**がひと目で分かる粒度。
矢印はすべて外側から内側(Presentation → Application → Domain)を向いており、
内側から外側への矢印が無いことが重要。

\`\`\`mermaid
${layers}
\`\`\`

- \`infrastructure\` から \`application\` への矢印は、**ポート(インターフェース)を実装
  している**ことを表す。依存性逆転が効いているので、\`application\` から
  \`infrastructure\` への矢印は無い。
- \`presentation\` が \`infrastructure\` を指しているのは、起動時にアダプタを
  生成して注入しているため(\`game-store-dependencies.ts\`)。

## 2. パッケージ単位の依存

層の中をもう1段掘り下げた図。どのユースケースがどのサブドメインを使っているか、
といった粒度で読める。辺の数が多いので、全体の傾向を見る用途に使う。

\`\`\`mermaid
${packages}
\`\`\`

## 3. ドメインのサブドメイン間の依存

DDD 上の関心事。\`game-session\` が他のサブドメインを束ねる集約であること、
\`shared-kernel\` が全体から参照されていることが読み取れる。

\`\`\`mermaid
${subdomains}
\`\`\`

> フォルダ単位で双方向の矢印が出ることがある(例: \`cpu\` と \`player\`)。これは
> 「\`cpu\` の戦略が \`Player\` を読み、\`Player\` が \`CpuLevel\` 型を参照している」
> というように**別々のファイル同士**が参照し合っている状態で、モジュール単位の
> 循環参照ではない。モジュールの循環は \`.dependency-cruiser.cjs\` の
> \`no-circular\` ルールで禁止しており、CI で常に検証している。

## この図で保証されること・されないこと

| | |
|---|---|
| 保証される | ここに描かれた矢印は、実際に存在する \`import\` である |
| 保証される | 層をまたぐ依存の向き(\`no-*-to-*\` ルール)は CI で検証されている |
| 保証されない | クラス同士の関連(所有・集約・継承)。それは [10-05](./05-class-diagram.md) の手書き図が担う |
`;

if (process.argv.includes("--check")) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== content) {
    console.error(
      "依存関係グラフが最新ではありません。`npm run graph` を実行して " +
        "docs/10-architecture/06-dependency-graph.md を更新してください。",
    );
    process.exit(1);
  }
  console.log("依存関係グラフは最新です。");
} else {
  writeFileSync(outputPath, content);
  console.log("Generated: docs/10-architecture/06-dependency-graph.md");
}
