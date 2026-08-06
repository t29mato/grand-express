---
description: コンテンツを再抽出して、各国の件数を確認する
allowed-tools: Bash(node scripts/extract-legacy-content.mjs), Bash(node --input-type=module:*), Bash(npx vitest run:*)
---

コンテンツの再抽出と、結果の確認をしてください。

```
node scripts/extract-legacy-content.mjs
```

そのあと各国の件数(都市・路線・航路・クイズ・出来事)を出し、
`npx vitest run src/infrastructure/content src/presentation/hooks` を通してください。

件数が意図と違っていたら、そこで止めて報告してください。
