# 10-01. Clean Architecture 概要

## 1. レイヤーと依存ルール

依存は必ず「外側 → 内側」の一方向のみ。内側の層は外側の層(フレームワーク、DB、UI、ブラウザAPI)を一切知らない。

```mermaid
graph LR
  subgraph Outer[外側]
    P[Presentation<br/>Next.js / React コンポーネント]
    I[Infrastructure<br/>localStorage・Web Audio・next-intl・JSONコンテンツ]
  end
  subgraph Inner[内側]
    A[Application<br/>ユースケース・ポート(interface)]
    D[Domain<br/>エンティティ・値オブジェクト・ドメインサービス・ドメインイベント]
  end
  P --> A
  I -. implements ports .-> A
  A --> D
```

- **Domain 層**: 依存ゼロ(TypeScript標準ライブラリのみ)。ゲームルールそのもの。フレームワーク非依存なのでNode/ブラウザどちらでも、テスト環境でも同じ挙動になる。
- **Application 層**: ユースケース(例: `RollDiceUseCase`, `BuyPropertyUseCase`)。Domainを呼び出して1つの操作を完結させる。外部依存は **ポート(interface)** として宣言するのみで実装は持たない(例: `GameRepository`, `RandomNumberGenerator`, `Clock`)。
- **Infrastructure 層**: Application層のポートを実装するアダプタ(`LocalStorageGameRepository`, `WebAudioSoundAdapter`, `JsonCountryContentRepository` など)。
- **Presentation 層**: Next.js の `app/` 配下のページ・Reactコンポーネント・状態管理(store)・アニメーション。Application層のユースケースを呼び出すだけで、ゲームルールの判断は一切持たない。

## 2. なぜこの分離が今回効くのか

現行コードの最大の問題は「1つの関数がルール判定・DOM操作・ログ・効果音・演出をすべて担当している」ことです
(例: `cityStop()`, `spiritStrike()`, `quizStop()`)。Clean Architecture ではこれを次のように分解します。

- ルール判定 → **Domain**(例: `MisfortuneSpirit.strike()` が結果を返すだけ)
- 状態遷移の一連の流れ → **Application**(例: `ResolveMisfortuneStrikeUseCase` がDomainを呼び、`DomainEvent` を発行)
- 画面更新・ログ表示・効果音 → **Presentation / Infrastructure**(`SpiritStruck` イベントを購読して行う)

これにより、**ゲームルールの単体テストにDOMやWeb Audioが一切不要**になり、Presentation側の変更(UI刷新など)がドメインロジックに影響しなくなります。

## 3. Next.js へのマッピング

- レンダリング方式: このゲームは完全にクライアント完結(サーバー不要)のため、`app/` 配下のゲーム画面コンポーネントは基本的に `"use client"`。Next.js を採用するのはサーバー機能が必要だからではなく、**ルーティング・コード分割・画像/フォント最適化・将来のサーバー機能追加(例: オンライン対戦やランキング)への拡張余地**のため([ADR-0001](./04-adr/0001-nextjs-frontend.md) 参照)。
- ディレクトリの対応:
  - `app/[locale]/...` … Presentation層のページ(ルーティングのみ、ロジックは持たない)
  - `src/domain/**`, `src/application/**`, `src/infrastructure/**`, `src/presentation/**` … 本ドキュメントで定義するレイヤー実体([フォルダ構成](./03-target-folder-structure.md)参照)

## 4. 依存ルールを機械的に守る仕組み

人間やLLMが誤って `domain/` から `infrastructure/` を import してしまう事故を防ぐため、
`dependency-cruiser`(または `eslint-plugin-boundaries`)でレイヤー間の import ルールを
CIで強制する(詳細は [ADR-0004](./04-adr/0004-testing-stack.md) 側で言及)。

```text
許可される import 方向:
  presentation → application, domain
  infrastructure → application(の port), domain
  application   → domain
  domain        → (何にも依存しない)
```

## 5. ファイルサイズの指針(トークン消費対策)

現状の課題の核心である「1ファイルが肥大化してLLMのトークン消費が大きい」を構造的に防ぐため、以下を目安とする。

- 1ファイルの目安: **200〜300行以内**(コンテンツデータのJSONファイルは対象外)
- 1つのユースケース = 1ファイル(`roll-dice.use-case.ts` のように機能単位で分割)
- 1つの集約/エンティティ = 1ファイル、値オブジェクトは意味のある単位でまとめてよいが1ファイル100行程度まで
- コンテンツデータ(都市・クイズ・アイテム等)はコードから分離し `*.json` として `infrastructure/content/` 配下に配置(国ごとに別ファイル)
- 翻訳文字列はロケールごとのJSON(`messages/en.json` 等)に分離

この指針により、LLMに1タスクを依頼する際に読み込む必要のあるファイル(コンテキスト)を数百行程度に抑えられ、
現状の「1リクエストでファイル全体(385KB)を読む」状態から大幅にトークン消費を削減できる。
