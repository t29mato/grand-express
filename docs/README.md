# Grand Express — 設計ドキュメント

`legacy/grand-express.html`(単一HTMLファイル・約3,000行/385KB)を、**Clean Architecture + DDD + TDD**
に基づいて **Next.js** アプリへ移行した際の設計資料一式です。

読む順番は番号どおりを推奨します。実装の現状は [90-03(as-built)](./90-migration/03-as-built-status.md) を参照してください。

## 目次

| # | ドキュメント | 内容 |
|---|---|---|
| 00 | [現状分析](./00-current-state-analysis.md) | 現行アプリの機能棚卸しと課題整理 |
| 10-01 | [Clean Architecture 概要](./10-architecture/01-clean-architecture-overview.md) | レイヤー構成と依存ルール |
| 10-02 | [ドメインモデル(DDD)](./10-architecture/02-domain-model-ddd.md) | 境界づけられたコンテキスト・集約・値オブジェクト・ドメインイベント |
| 10-03 | [ターゲットのフォルダ構成](./10-architecture/03-target-folder-structure.md) | 移行後の具体的なディレクトリ構造 |
| 10-04 | [ADR (設計決定記録)](./10-architecture/04-adr/) | 技術選定の理由と代替案(実装時の簡略化点は各ADRに追記済み) |
| 10-05 | [構造の図](./10-architecture/05-class-diagram.md) | 集約・ポート・1手番の流れ(手書き。意図を伝える図) |
| 10-06 | [依存関係グラフ](./10-architecture/06-dependency-graph.md) | 実装から自動生成した依存図(`npm run graph`。CIで陳腐化を検出) |
| 20-01 | [テスト戦略(TDD)](./20-testing/01-testing-strategy-tdd.md) | テストピラミッド・ツール・カバレッジ方針・E2Eシナリオ |
| 30 | [用語集(ユビキタス言語)](./30-glossary.md) | ドメイン用語とコード上の命名の対応表 |
| 40 | [学習設計](./40-learning-design/) | クイズを学習装置として機能させる設計・プレイヤーごとの知識レベル |
| 40-01 | [クイズを学習装置として機能させる](./40-learning-design/01-quiz-as-learning-device.md) | 学習面の現状課題(正解・解説が出ない/出題が重複する/復習がない)と改善案 |
| 40-02 | [プレイヤーごとの知識レベル](./40-learning-design/02-player-knowledge-level.md) | 対象国への知識差をプレイヤー単位の3段階で吸収する設計 |
| 50 | [コンテンツ制作](./50-authoring/) | 都市・クイズ・出来事の書き方と、盤面の絵の作り方 |
| 50-01 | [コンテンツの書き方](./50-authoring/01-content-guide.md) | 4言語の決まり・豆知識の粒度・上書き層の作法 |
| 50-02 | [出来事アニメーションの作り方](./50-authoring/02-animation-guide.md) | 青マス・赤マスの動く絵の仕様と見本 |
| 50-10 | [動く絵の作り方(全体像)](./50-authoring/10-how-animations-are-made.md) | 246本をどう作っているか。4種類の絵・確認のしかた・実際に踏んだSVGの落とし穴 |
| 90-00 | [キャラクタライゼーションサンプル](./90-migration/00-characterization-samples.md) | 現行コードの計算式の入出力仕様 |
| 90-01 | [移行方針](./90-migration/01-migration-strategy.md) | 段階移行の進め方とリスク |
| 90-02 | [WBS(移行タスク一覧)](./90-migration/02-wbs.md) | フェーズ別の作業分解構成・見積り・依存関係 |
| 90-03 | [as-built(完了状況)](./90-migration/03-as-built-status.md) | 各フェーズの実施結果・簡略化点・DoDチェックリスト・ファイルサイズ削減効果 |
| 90-04 | [デプロイ手順](./90-migration/04-deployment-guide.md) | 本番デプロイ時の手順メモ(Phase9準備) |
| 90-05 | [現行版とのビジュアル比較](./90-migration/05-visual-comparison.md) | legacyと新アプリのスクリーンショット突合・視覚差分リスト |

## サマリー

- **元の課題**: 1ファイルにゲームロジック・DOM操作・描画・音声・翻訳文字列・保存処理・コンテンツデータ(都市/クイズ/アイテム)が全部同居しており、保守性が低く、LLMに1タスク依頼するたびにファイル全体(385KB)をコンテキストに読ませる必要があり、トークン消費が非常に大きかった。
- **狙い**: ドメインロジックを純粋なTypeScriptの Domain 層に切り出し、責務ごとに小さなファイル(目安200〜300行)に分割することで、①保守性を上げる ②テストを書けるようにする ③LLMに変更を依頼するときに読み込む範囲を最小化してトークン消費を大きく削減する。
- **現状**: Domain/Application/Infrastructure/Presentationの全層を実装し、実際にプレイできる状態まで完了(ユニット/コンポーネントテスト206件・E2Eテスト12件がグリーン)。バンドルサイズ改善、音楽エンジン・3Dダイス演出・各種モーダル(出発ストーリー/月替わりイベント/次の区間の案内)・都市イラスト/盤面の地形/国地図の移植など仕上げも完了。**本番公開済み: https://t29mato.github.io/grand-express/**(2026-08-25にGitHub Pagesへ移設。vercel.app 側も残しているが、正規のURLはこちら)。詳細は [as-built](./90-migration/03-as-built-status.md) を参照。
