# ADR-0003: 盤面描画は React コンポーネントによる SVG を継続採用する

- ステータス: 承認
- 日付: 2026-08-05

## コンテキスト

現行実装は `document.createElementNS` で手動にSVG要素を組み立てている(`drawBoard`, `renderTokens` など)。
描画対象は数十都市+中間マス程度で、要素数は多くない(パフォーマンス上Canvasへ切り替える必然性はない)。

## 決定

- 盤面描画は引き続き **SVG** で行うが、手動DOM操作ではなく **Reactコンポーネント宣言(JSX)** で表現する
  (`board-svg.tsx`, `city-node.tsx`, `path-node.tsx`, `token.tsx`)。
- カメラのパン/ズーム/追尾は `viewBox` 属性の更新を `useCamera` フックにカプセル化し、
  `requestAnimationFrame` ベースのイージングは現行の `camTo` のロジックを移植する。
- 3Dダイスのアニメーション(`die3d`)はCSS Transformベースのままとし、`dice-3d.tsx` コンポーネントに移植する。
- `prefers-reduced-motion` 対応は現行同様に維持する。

## 代替案

- **Canvas / WebGL化**: 描画パフォーマンス上のメリットは現状の要素数では享受できず、
  アクセシビリティ(要素にフォーカス・ARIA付与)がSVGより悪化するため不採用。
- **サードパーティの盤面ゲームライブラリ**: 本ゲーム固有の路線グラフ・中間マス生成ロジックに
  合わせづらく、依存追加のメリットが薄いため不採用。

## 影響

- 盤面コンポーネントはPresentation層に閉じ、Domain層の `PathfindingService` が返す座標なしのグラフ情報
  (ノードID・隣接関係)を元に、Presentation側で座標計算(現行の `PX`, `PY` 相当)を行う。
- アニメーションに関わるロジックは原則ユニットテストの対象外とし、Playwrightの見た目確認や
  手動QAでカバーする(演出面の完全なテスト自動化はコストに見合わないため)。
