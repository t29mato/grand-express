# ADR-0002: 状態管理は Zustand を Application 層への薄いアダプタとして使う

- ステータス: 承認
- 日付: 2026-08-05

## コンテキスト

現行コードはモジュールスコープのグローバル変数(`players`, `turnIdx`, `month`, `dest` など)で
状態を持ち、DOM操作と密結合している。Next.js化にあたりReactの再レンダリングと連動する状態管理が必要だが、
**ゲームルールの判断ロジックを状態管理ライブラリの中に書いてしまうと、Clean Architectureの層分離が崩れる**
リスクがある。

## 決定

- 状態管理ライブラリは **Zustand** を採用する。
- Zustandストア(`presentation/state/game-store.ts`)は「Application層のユースケースを呼び出し、
  戻り値/発行されたドメインイベントで自身のスナップショットを更新するだけ」の薄いアダプタとする。
  ストア自身は分岐ロジック(if文によるゲームルール判断)を持たない。
- ゲーム状態の実体(現金・位置・所有物件など)は Application 層のユースケースが `GameSession` 集約を
  操作した結果を `GameSessionView`(表示用に整形したプレーンオブジェクト)としてストアに反映する。

```text
UIイベント(ボタン押下)
  → Zustandストアのアクション
    → Application層のユースケースを呼ぶ(例: rollDiceUseCase.execute(...))
      → Domain層でルール判定
    ← ユースケースの戻り値(更新後のGameSessionView + 発行イベント一覧)
  ← ストアが state を更新 → Reactが再レンダリング
  ← 発行イベントを購読しているPresentation側の副作用(演出・音声)が発火
```

## 代替案

- **Redux Toolkit**: 機能的には十分だが、ボイラープレートが多く、今回の規模(単一セッション・単一端末)には
  過剰。RTK Queryのようなサーバー通信機能も現時点では不要。
- **React Context + useReducer のみ**: 追加ライブラリ不要という利点はあるが、頻繁な更新(ダイスアニメーション、
  トークン移動アニメーションなど)を伴う本アプリでは再レンダリング範囲の制御がしにくく、Zustandの
  セレクタベースの購読の方が適する。

## 影響

- ゲームルールの単体テストはApplication/Domain層だけで完結し、Zustand・Reactに一切依存しない。
- UIフレームワークを将来変更する場合も、Application層以下はそのまま流用できる。
