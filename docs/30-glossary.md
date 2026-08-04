# 30. 用語集(ユビキタス言語)

コード上の命名・ドキュメント・ゲーム内表示文言の対応表。実装・レビュー・ドキュメントで
同じ言葉を使うことで、LLMへの指示(プロンプト)も一貫させやすくする。

| ドメイン用語(英語/コード) | 日本語 | ゲーム内表示(例) | 説明 |
|---|---|---|---|
| GameSession | ゲームセッション / 旅 | — | セットアップ〜終了までの1プレイ全体を表す集約 |
| Player | プレイヤー / 旅人 | Travelers | 人間またはCPUが操作する参加者 |
| CpuStrategy | CPU戦略 | CPU strength(Gentle/Normal/Merciless) | CPUの自動意思決定ロジック。難易度別に3実装 |
| Calendar | カレンダー | Year / Month | 月インデックスと年、季節の算出元 |
| Destination | 目的地 | Next destination | 現在の目標都市と、到着時に得られる賞金額 |
| City | 都市 / 町 | Town stop | プレイヤーが停車でき、物件購入や屋台がある拠点 |
| Node | マス | — | 盤面上の1マス(都市 or 路線上の中間マス) |
| Edge | 路線 | — | 都市間を結ぶ区間。中間マスが自動生成される |
| Property / PropertyHolding | 物件 / ビジネス | My businesses | 都市に存在する収益物件。レベル1〜5、独占で収入2倍 |
| Monopoly | 独占 | 👑 | ある都市の全物件を1人が所有している状態 |
| Item | アイテム | Items | 移動系(move)・先制系(pre)・パッシブ系(passive)の3種 |
| QuizQuestion | クイズ | — | 路線上のクイズマスで出題される設問(3ティア: low/mid/high) |
| SeasonalEvent | 季節イベント | Seasonal event | 月ごとに発生し、地方の収入補正(`mod[region]`)を変える |
| MisfortuneSpirit | 厄災の神 | A misfortune strikes | 最下位プレイヤーに憑依し、災難を引き起こす存在 |
| DoomEffect | 災難 | — | 厄災の神発動時の4種の効果(物件喪失/送金/瞬間移動/強奪) |
| SpiritTransfer | 憑依の受け渡し | Passed on! | すれ違ったプレイヤー間で厄災の神が移る仕組み |
| PathfindingService | 経路探索サービス | — | 盤面グラフ上のBFS距離計算・到達可能マス列挙 |
| DiceRoll | ダイスロール | — | 出目(通常1個、アイテムで2〜3個になる場合あり) |
| NetWorth | 総資産 | Final net worth | 現金+所有物件の評価額の合計。勝敗判定に使用 |
| Region | 地方 | — | 都市が属する地理区分。季節イベントの補正単位 |
| CountryContentPack | 国コンテンツパック | Where are we riding? | 都市・クイズ・アイテム・季節・厄災テーブルのマスターデータ |
| DomainEvent | ドメインイベント | — | 状態変化の通知(演出・ログ・音声は購読側が担当) |

## 命名規則メモ

- ドメイン層のクラス/型名は上記の英語表記を正とする(例: `MisfortuneSpirit`, `DestinationSelector`)。
- 表示文言(UI text)は `next-intl` のメッセージキーとして日英西仏で分離管理する
  ([ADR-0006](./10-architecture/04-adr/0006-i18n-strategy.md))。
- 現行コードの短縮変数名(`p`, `k`, `lv`, `mod` など)は移行時に上記の用語に沿った名前へリネームする
  (例: `mod[region]` → `regionIncomeModifiers`)。
