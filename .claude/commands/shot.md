---
description: 開発サーバの画面をスクリーンショットで確認する
argument-hint: "[国] [場面]  例: japan overview / india event / setup"
allowed-tools: Bash(npm run shot:*), Bash(npx next dev:*), Bash(curl:*), Bash(sleep:*), Read
---

`npm run shot -- $ARGUMENTS` で画面を撮り、**撮った画像を必ず Read して目で確認**してください。

開発サーバ(既定 http://localhost:3000)が要ります。繋がらなければ立ててから撮り直してください:

```
(npx next dev -p 3000 >/dev/null 2>&1 &) ; sleep 10
```

場面は `follow`(既定)/ `overview` / `event` / `quiz` / `city` / `setup`。
盤面だけを切り出すなら `--board` を足します。

画像を見て気づいた問題(はみ出し・重なり・読めない文字・不自然な配置)を報告してください。
「撮りました」だけで終わらせないこと。
