# 出来事アニメーションの作り方

青マス・赤マスに止まったときに出る、短い動く絵の仕様。

`src/presentation/components/events/animations/<kebab-case-id>.tsx` に1件1ファイルで作る。
ファイル名は出来事IDそのまま。`export function <PascalCase名>()` を1つだけ default でなく named export する。

## 必須の約束

1. **`viewBox="0 0 400 210"` 固定**。`width`/`height` 属性は付けない(CSS側で伸縮する)。
2. **自己完結**。外部画像・フォント・ライブラリを使わない。SVG図形と `<style>` だけ。
3. **`<style>{`...`}`** にCSSキーフレームを直接書く。クラス名はそのファイル固有の接頭辞を付けて衝突を避ける(例: `.bear-run`)。
4. **無限ループ**。モーダルが開いている数秒間ずっと動き続ける。`animation: ... infinite`。
5. **`prefers-reduced-motion` 対応**。末尾に必ず入れる:
   `@media (prefers-reduced-motion: reduce) { .クラス, ... { animation: none; } }`
   動きを止めた状態でも「何が起きたか」が絵として分かる構図にすること。
6. `role="img" aria-hidden="true"` を `<svg>` に付ける。**文字は描かない**(説明文は別に表示される)。
7. TypeScript。`"use client"` は不要(親が client)。

## 絵作りの方針

- 出来事が**一目で分かる**こと。抽象的な光やパーティクルではなく、具体物を動かす。
  例: 猿が眼鏡をひったくる → 猿の腕が伸びて眼鏡が飛ぶ
- ゲームの絵柄に合わせる: 平たい塗り、輪郭線は暗色、3〜6色程度。
  背景は暗めの地色 + 空/地面の帯。
- 画面の色: 空 `#8fc4e8`〜`#20364a`、地面 `#2f4a33`/`#c9a877`、
  人 `#f6efe2`(顔)、強調 `#f5b31c`(金)/`#e8443f`(赤)/`#5b8fe8`(青)。
- 金額が増える話は明るく、減る話は少し暗い地色にすると伝わりやすい。

## 見本

`src/presentation/components/events/animations/bear-attack.tsx` を読むこと(ヒグマに追われる絵)。
この構造・粒度に揃える。

## やらないこと

- `animations/index.ts`(登録簿)は**編集しない**。複数人で並行して作るため、
  共有ファイルを触ると壊れる。取りまとめ側でまとめて更新する。
- 他のファイルは触らない。

## 登録

作った絵は `src/presentation/components/events/animations/index.ts` の
`EVENT_ANIMATIONS` に「出来事ID → コンポーネント」で登録する。
登録されていない出来事は、増減だけを示す汎用の絵にフォールバックするので、
少しずつ足していける。

## 確認

```
npm run dev                      # 別のターミナルで
npm run shot -- japan event      # 青/赤マスに止まるまで自動で進めて撮る
```
