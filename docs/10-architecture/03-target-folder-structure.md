# 10-03. ターゲットのフォルダ構成

単一の Next.js アプリ(モノレポ化はしない。将来必要になれば別途ADRを起こす)として、
`src/` 配下を Clean Architecture のレイヤーで分割する。

```text
grand-express/
├─ app/                                # Next.js App Router(ルーティングのみ、ロジックなし)
│  └─ [locale]/
│     ├─ page.tsx                      # セットアップ画面へのエントリ
│     └─ play/
│        └─ page.tsx                   # ゲーム画面
│
├─ src/
│  ├─ domain/                          # ★依存ゼロ。フレームワーク非依存の純粋なTypeScript
│  │  ├─ shared-kernel/
│  │  │  ├─ money.ts                   # Money 値オブジェクト
│  │  │  ├─ ids.ts                     # PlayerId, CityId, NodeId, ItemKey など
│  │  │  ├─ domain-event.ts            # DomainEvent 基底型・EventBus interface
│  │  │  └─ result.ts                  # Result<T, E> 型(例外に頼らないエラーハンドリング)
│  │  ├─ board/
│  │  │  ├─ city.ts / edge.ts / node.ts
│  │  │  ├─ board-graph-builder.ts     # buildGraph 相当
│  │  │  └─ pathfinding-service.ts     # bfsDist, reachable 相当
│  │  ├─ player/
│  │  │  ├─ player.ts
│  │  │  └─ inventory.ts
│  │  ├─ property/
│  │  │  ├─ property-holding.ts
│  │  │  └─ property-income-service.ts # incAt, upCost, sellValue, monopolyCount 相当
│  │  ├─ item/
│  │  │  └─ item-definition.ts
│  │  ├─ quiz/
│  │  │  ├─ quiz-question.ts
│  │  │  └─ quiz-grading-service.ts
│  │  ├─ season/
│  │  │  └─ seasonal-event.ts
│  │  ├─ misfortune/
│  │  │  ├─ misfortune-spirit.ts
│  │  │  ├─ doom-strategy.ts           # 4種の災難効果(Strategyパターン)
│  │  │  └─ spirit-transfer-service.ts
│  │  ├─ cpu/
│  │  │  ├─ cpu-strategy.ts            # interface
│  │  │  ├─ easy-cpu-strategy.ts
│  │  │  ├─ normal-cpu-strategy.ts
│  │  │  └─ merciless-cpu-strategy.ts
│  │  └─ game-session/
│  │     ├─ game-session.ts            # 集約ルート
│  │     ├─ calendar.ts
│  │     ├─ destination.ts
│  │     └─ net-worth-calculator.ts
│  │
│  ├─ application/                     # ユースケース + ポート定義
│  │  ├─ ports/
│  │  │  ├─ game-repository.ts
│  │  │  ├─ country-content-repository.ts
│  │  │  ├─ random-number-generator.ts
│  │  │  ├─ clock.ts
│  │  │  └─ event-publisher.ts
│  │  └─ use-cases/
│  │     ├─ start-game/
│  │     ├─ roll-dice/
│  │     ├─ move-player/
│  │     ├─ buy-property/
│  │     ├─ invest-property/
│  │     ├─ sell-property/
│  │     ├─ answer-quiz/
│  │     ├─ visit-stall/
│  │     ├─ use-item/
│  │     ├─ resolve-misfortune-strike/
│  │     ├─ advance-turn/
│  │     ├─ cpu-take-turn/
│  │     ├─ save-game/
│  │     └─ load-game/
│  │        # 各フォルダ: <name>.use-case.ts + <name>.use-case.test.ts
│  │
│  ├─ infrastructure/                  # ポートの実装(アダプタ)
│  │  ├─ persistence/
│  │  │  ├─ local-storage-game-repository.ts
│  │  │  ├─ save-code-codec.ts         # Base64共有コードのエンコード/デコード
│  │  │  └─ save-schema.ts             # zodスキーマ + バージョンマイグレーション
│  │  ├─ content/
│  │  │  ├─ json-country-content-repository.ts
│  │  │  ├─ bolivia.json
│  │  │  └─ japan.json
│  │  ├─ random/
│  │  │  ├─ crypto-random-adapter.ts
│  │  │  └─ seeded-random-adapter.ts   # テスト/再現性用
│  │  └─ audio/
│  │     └─ web-audio-sound-adapter.ts
│  │
│  ├─ presentation/                    # UIコンポーネント・状態管理・アニメーション
│  │  ├─ state/
│  │  │  └─ game-store.ts              # Zustandストア。ユースケース呼び出しの薄いアダプタ
│  │  ├─ hooks/
│  │  │  ├─ use-game-session.ts
│  │  │  ├─ use-camera.ts
│  │  │  └─ use-sound.ts
│  │  └─ components/
│  │     ├─ board/
│  │     │  ├─ board-svg.tsx
│  │     │  ├─ city-node.tsx
│  │     │  ├─ path-node.tsx
│  │     │  └─ token.tsx
│  │     ├─ hud/
│  │     │  ├─ dice-button.tsx
│  │     │  ├─ dice-3d.tsx
│  │     │  ├─ item-bar.tsx
│  │     │  ├─ players-panel.tsx
│  │     │  ├─ destination-card.tsx
│  │     │  ├─ season-card.tsx
│  │     │  └─ travel-log.tsx
│  │     └─ modals/
│  │        ├─ modal.tsx
│  │        ├─ setup-modal.tsx
│  │        ├─ quiz-modal.tsx
│  │        ├─ city-stop-modal.tsx
│  │        ├─ shop-modal.tsx
│  │        ├─ season-modal.tsx
│  │        ├─ doom-modal.tsx
│  │        └─ result-modal.tsx
│  │
│  └─ i18n/
│     └─ messages/
│        ├─ en.json / es.json / fr.json / ja.json
│
├─ tests/
│  ├─ unit/                            # domain, application のユニットテスト(基本は各ソースの隣に .test.ts を置く)
│  └─ fakes/                           # InMemoryGameRepository, FixedRandomNumberGenerator など
│
├─ e2e/
│  └─ playwright/
│     ├─ start-and-play.spec.ts
│     ├─ property-lifecycle.spec.ts
│     ├─ quiz-flow.spec.ts
│     ├─ save-and-load.spec.ts
│     └─ localization-smoke.spec.ts
│
├─ legacy/
│  └─ grand-express.html               # 旧実装。移行完了まで挙動の正として保持
│
└─ docs/                               # 本ドキュメント一式
```

## 補足

- 各ユースケースフォルダは `xxx.use-case.ts` / `xxx.use-case.test.ts` の2ファイル構成を基本とし、
  1ユースケース1ファイル・1テストファイルを徹底する(LLMに1機能だけ読ませれば済むようにするため)。
- `domain/**` は Next.js・React・ブラウザAPIに一切依存しない。Node環境の単体テストだけで完結する。
- コンテンツデータ(`infrastructure/content/*.json`)は都市・クイズ・アイテム・季節・厄災テーブルを
  国ごとに1ファイルにまとめる。現行コードの `BOLIVIA`, `JAPAN` オブジェクトのデータ部分をそのまま抽出する。
- 翻訳文字列は `src/i18n/messages/*.json` にロケールごとに分離し、`next-intl` から参照する
  ([ADR-0006](./04-adr/0006-i18n-strategy.md))。
