# 厄災アニメーションの作り方

厄災の神に取り憑かれたプレイヤーに降りかかる災難の絵。
仕様は [出来事アニメーション](./02-animation-guide.md) とまったく同じ。違うのは置き場所と雰囲気。

## 置き場所と名前

`src/presentation/components/events/dooms/<国>-<厄災id>.tsx`
export する関数名はファイル名のPascalCase(例: `japan-typhoon.tsx` → `JapanTyphoon`)。

## 絵の方針

**災難だと一目で分かること。** ただし**怖がらせない**。子どもも遊ぶので、
痛みや破壊そのものを描くのではなく、**慌てている/困っている様子**で伝える。

- 地震なら建物が揺れて物が落ちる。倒壊した瓦礫は描かない
- 火事なら煙と逃げる人。焼ける人は描かない
- スリなら手が伸びて財布が飛ぶ。暴力にはしない
- 全体に暗めの地色を使い、赤(#e05252)を差し色にすると災難らしくなる

## 確認

```
npm run preview -- src/presentation/components/events/dooms/japan-typhoon.tsx /tmp/a.png
```
