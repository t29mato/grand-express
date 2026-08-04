# 90-02. WBS(移行タスク一覧)

前提: [00-現状分析](../00-current-state-analysis.md)・[アーキテクチャ設計](../10-architecture/)・
[テスト戦略](../20-testing/01-testing-strategy-tdd.md)・[移行方針](./01-migration-strategy.md) を前提とした
作業分解構成(Work Breakdown Structure)。ソロ開発者がLLM(Claude Code等)を活用しながら進めることを
想定し、見積りは「集中して作業した場合の人日(ideal person-days)」で示す。実カレンダー日数は
稼働時間に応じて調整すること。

## フェーズ全体像

```mermaid
graph TD
  P0[Phase 0: 現状把握とベースライン] --> P1[Phase 1: 基盤構築 + 歩く骨格]
  P1 --> P2[Phase 2: Domain層]
  P1 --> P3[Phase 3: コンテンツ/i18nデータ移行]
  P2 --> P4[Phase 4: Application層(ユースケース)]
  P3 --> P4
  P4 --> P5[Phase 5: Infrastructure層]
  P4 --> P6[Phase 6: Presentation層(UI)]
  P5 --> P6
  P6 --> P7[Phase 7: テスト強化(結合/E2E/A11y)]
  P7 --> P8[Phase 8: 演出/音声/パフォーマンス仕上げ]
  P8 --> P9[Phase 9: 移行カットオーバー]
  P9 --> P10[Phase 10: 移行後クリーンアップ]
```

- Phase 2(Domain層)とPhase 3(コンテンツ/i18nデータ移行)は並行実施可能。
- Phase 5(Infrastructure)はPhase 4のユースケースが要求するポートが固まり次第、着手可能(一部前倒し可)。
- それ以外は基本的に直列(ソロ開発のため)。

## 見積りサマリー

| フェーズ | 内容 | 見積り(人日) |
|---|---|---|
| Phase 0 | 現状把握とベースライン | 1〜2 |
| Phase 1 | 基盤構築 + 歩く骨格(Walking Skeleton) | 3〜5 |
| Phase 2 | Domain層(全サブドメイン) | 8〜12 |
| Phase 3 | コンテンツ/i18nデータ移行(2ヶ国・4言語) | 4〜6 |
| Phase 4 | Application層(ユースケース) | 6〜9 |
| Phase 5 | Infrastructure層(アダプタ) | 3〜5 |
| Phase 6 | Presentation層(Next.js UI) | 10〜15 |
| Phase 7 | テスト強化(結合/E2E/アクセシビリティ) | 5〜7 |
| Phase 8 | 演出/音声/パフォーマンス仕上げ | 3〜4 |
| Phase 9 | 移行カットオーバー | 1〜2 |
| Phase 10 | 移行後クリーンアップ | 1 |
| **合計** | | **45〜68人日** |

> 見積りはPhase 1で「歩く骨格」を通した後、実測値を元に更新すること(Phase 1完了時点でWBSの再見積りを推奨)。

---

## Phase 0: 現状把握とベースライン

| ID | タスク | 内容 | 成果物 | 依存 | 見積り |
|---|---|---|---|---|---|
| 0.1 | 現行アプリの機能棚卸し | 全機能を実際に操作し、仕様として書き出す(本ドキュメントの[現状分析](../00-current-state-analysis.md)がベース) | 機能一覧チェックリスト | - | 0.5日 |
| 0.2 | 受け入れ基準(Definition of Done)の合意 | [移行方針](./01-migration-strategy.md)のDoDをレビュー・必要なら調整 | 合意済みDoD | 0.1 | 0.5日 |
| 0.3 | 現行コードのキャラクタライゼーションメモ作成 | 計算式(`incAt`, `upCost`, `sellValue`, `playerIncome`, `monopolyCount`, `netWorth`, `bfsDist` 等)の入出力サンプルを記録 | 計算式の入出力サンプル集(後のユニットテストの元ネタ) | 0.1 | 0.5〜1日 |

**完了の定義**: 現行機能の一覧と、Domain層テストの元ネタになる計算式サンプルが揃っている。

---

## Phase 1: 基盤構築 + 歩く骨格(Walking Skeleton)

| ID | タスク | 内容 | 成果物 | 依存 | 見積り |
|---|---|---|---|---|---|
| 1.1 | Next.jsプロジェクト初期化 | TypeScript strict、ESLint/Prettier、`app/[locale]` 構成の雛形 | 動作するNext.jsアプリの雛形 | 0.* | 0.5日 |
| 1.2 | テスト基盤導入 | Vitest, React Testing Library, Playwright, zod, dependency-cruiser の設定 | `pnpm test` / `pnpm test:e2e` が動く状態 | 1.1 | 0.5〜1日 |
| 1.3 | CIパイプライン構築 | lint→typecheck→test:unit→build→test:e2e のGitHub Actions等 | CI設定ファイル、PRでグリーン/レッドが見える | 1.2 | 0.5日 |
| 1.4 | レイヤー構成の雛形作成 | [フォルダ構成](../10-architecture/03-target-folder-structure.md)通りの空ディレクトリ+`README`配置、dependency-cruiserルール設定 | 空実装のレイヤー構造 | 1.1 | 0.5日 |
| 1.5 | 歩く骨格: Domain(最小) | `Player`, `GameSession`(最小属性), `PathfindingService`, `QuizGradingService` を1問だけでTDD実装 | ユニットテスト付きDomainコード | 1.4, 0.3 | 1日 |
| 1.6 | 歩く骨格: Application(最小) | `StartGameUseCase`, `RollDiceUseCase`, `MovePlayerUseCase`, `AnswerQuizUseCase` の最小実装 | ユニットテスト付きユースケース | 1.5 | 1日 |
| 1.7 | 歩く骨格: Infrastructure(最小) | `InMemoryGameRepository`、固定RNGアダプタ | 契約テスト付きアダプタ | 1.6 | 0.5日 |
| 1.8 | 歩く骨格: Presentation(最小) | セットアップ画面(簡易)→盤面(ボリビアの一部都市のみ)→ダイス→移動→クイズモーダルの最小動線 | 実際に1問クイズまで遊べるNext.jsアプリ | 1.6, 1.7 | 1〜1.5日 |
| 1.9 | 歩く骨格のE2E | Playwrightで1.8の動線を自動化 | `e2e/playwright/walking-skeleton.spec.ts` | 1.8 | 0.5日 |
| 1.10 | Phase 1振り返り・WBS再見積り | 実測工数を元に Phase 2以降の見積りを更新 | 更新されたWBS | 1.1〜1.9 | 0.5日 |

**完了の定義**: 「セットアップ→ダイス→移動→クイズマス着地→正誤判定→プレイヤーパネル更新」までが
Domain→Application→Infrastructure→Presentationの全層を貫通し、ユニットテスト+E2Eで自動検証されている。

---

## Phase 2: Domain層(全サブドメイン)

歩く骨格で検証したパターンを、残りのサブドメインに展開する。各サブドメインは
「Red(現行コードの挙動をテスト化)→Green(実装)→Refactor」で進める。

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 2.1 | `board` サブドメイン | `BoardGraphBuilder`(中間マス生成アルゴリズム`h32`の移植含む)、`PathfindingService`の拡張(前後双方向到達可能マス列挙) | 1.5 | 1.5日 |
| 2.2 | `player` サブドメイン | `Player`エンティティ、`Inventory`(最大5個制約) | 1.5 | 0.5日 |
| 2.3 | `property` サブドメイン | `PropertyHolding`、`PropertyIncomeService`(収入・投資額・売却額・独占倍率・季節補正) | 2.2 | 1.5日 |
| 2.4 | `item` サブドメイン | `ItemDefinition`型、アイテム種別(move/pre/passive)ごとの効果インターフェース | 2.2 | 0.5日 |
| 2.5 | `quiz` サブドメイン | `QuizQuestion`、`QuizGradingService`(3ティア別の増減額) | 1.5 | 0.5日 |
| 2.6 | `season` サブドメイン | `SeasonalEvent`、地方収入補正の適用ロジック | 2.3 | 1日 |
| 2.7 | `misfortune` サブドメイン | `MisfortuneSpirit`、`DoomStrategy`(4種のStrategy実装)、`SpiritTransferService` | 2.2, 2.3, 2.4 | 2日 |
| 2.8 | `cpu` サブドメイン | `CpuStrategy`インターフェース + Easy/Normal/Merciless実装(サイコロ後の移動先選択・アイテム使用・投資判断) | 2.1〜2.7 | 1.5日 |
| 2.9 | `game-session` 集約の本実装 | `GameSession`集約(カレンダー・目的地レース・ターン進行・勝敗判定)、`NetWorthCalculator`、`DestinationSelector` | 2.1〜2.8 | 1.5日 |
| 2.10 | ドメインイベントの整備 | [ドメインイベント一覧](../10-architecture/02-domain-model-ddd.md#5-ドメインイベント)をすべて定義し、`GameSession`から発行されるようにする | 2.9 | 1日 |

**完了の定義**: Domain層単体で、現行コードの主要な計算・分岐ロジックがユニットテストで再現されている
(カバレッジ目標90%以上)。この時点ではUIは歩く骨格のままでよい。

---

## Phase 3: コンテンツ/i18nデータ移行(Phase 2と並行可)

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 3.1 | コンテンツ抽出スクリプト作成 | 現行コードの`BOLIVIA`/`JAPAN`オブジェクト(`C()`, `Q()`, `IT()`呼び出し)をパースし、[ADR-0007](../10-architecture/04-adr/0007-content-data-as-json.md)のスキーマに沿ったJSONへ変換する一括スクリプト | - | 1.5日 |
| 3.2 | ボリビアパックの検証 | 抽出JSONをzodスキーマ検証+参照整合性チェック(edgeが参照する都市IDの実在確認等) | 3.1 | 0.5日 |
| 3.3 | 日本パックの検証 | 同上(日本パック) | 3.1 | 0.5日 |
| 3.4 | 翻訳文言抽出スクリプト作成 | 現行の`_t("en|es|fr|ja")`形式をパースし、`next-intl`用ロケールJSON(`en.json`等)へ変換 | - | 1日 |
| 3.5 | 翻訳キー網羅性チェック | 4言語すべてにキーが揃っているかをビルド時テストで検証 | 3.4 | 0.5日 |
| 3.6 | `CountryContentRepository` 実装 | JSONを読み込み、Domain型にマッピングするアダプタ(Phase 5と一部重複、先行実装可) | 3.2, 3.3 | 0.5〜1日 |

**完了の定義**: 2ヶ国分のコンテンツと4言語分の翻訳がJSON化され、スキーマ検証・参照整合性チェックが
CIで自動実行されている。

---

## Phase 4: Application層(ユースケース、TDD)

各ユースケースは「1フォルダ = 実装+テスト」を徹底し、フェイクポート(`InMemoryGameRepository`、
固定RNG)でテストする。

| ID | ユースケース | 現行コードの相当箇所 | 依存 | 見積り |
|---|---|---|---|---|
| 4.1 | `StartGameUseCase` | `startGame` | 2.9, 3.6 | 0.5日 |
| 4.2 | `RollDiceUseCase`(アイテムによる2〜3個化含む) | `rollDice`, `animateRoll`(演出以外) | 2.1, 2.8 | 0.5日 |
| 4.3 | `MovePlayerUseCase`(経路選択+すれ違い判定) | `humanPick`, `cpuPick`, `tryPassSpirit`, `settleSpirit` | 2.1, 2.7 | 1日 |
| 4.4 | `BuyPropertyUseCase` / `InvestPropertyUseCase` / `SellPropertyUseCase` | `cityStop` 内の売買/増資/売却ロジック | 2.3 | 1日 |
| 4.5 | `AnswerQuizUseCase` | `quizStop` | 2.5 | 0.5日 |
| 4.6 | `VisitStallUseCase` / `UseItemUseCase` | `shopStock`, `cityStop`(屋台部分), `renderItems`のクリックハンドラ相当 | 2.4 | 1日 |
| 4.7 | `ResolveMisfortuneStrikeUseCase` | `spiritStrike` | 2.7 | 1日 |
| 4.8 | `AdvanceTurnUseCase`(月送り・季節適用・四半期収入・目的地到着判定) | `gameLoop`, `playTurn`, `applySeason`, `arriveDest` | 2.6, 2.9, 2.10 | 1.5日 |
| 4.9 | `CpuTakeTurnUseCase` | `cpuItems` + `cpuPick` の呼び出し順序込みのオーケストレーション | 2.8, 4.2〜4.7 | 1日 |
| 4.10 | `SaveGameUseCase` / `LoadGameUseCase` | `snapshot`, `writeSave`, `readSave`, `loadState`, `encode`/`decode` | 2.9 | 1日 |
| 4.11 | `EndGameUseCase` | `endGame` | 2.9 | 0.5日 |

**完了の定義**: 上記すべてのユースケースがユニットテスト付きで実装され、フェイクポートのみで
ゲーム1周分(セットアップ〜終了)を自動テストとして再生できる(実質的な「E2Eの前段」)。

---

## Phase 5: Infrastructure層(アダプタ)

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 5.1 | `LocalStorageGameRepository` | 実localStorageへの保存/読込 + `SaveSchemaV1`によるzod検証 | 4.10 | 1日 |
| 5.2 | `SaveCodeCodec` | Base64共有コードのエンコード/デコード([ADR-0005](../10-architecture/04-adr/0005-persistence-and-save-format.md)) | 5.1 | 0.5日 |
| 5.3 | `CryptoRandomAdapter` | 本番用RNGアダプタ | 4.2 | 0.5日 |
| 5.4 | `JsonCountryContentRepository`(本実装) | Phase 3で作ったJSONを実際に読み込むアダプタの仕上げ | 3.6 | 0.5日 |
| 5.5 | `WebAudioSoundAdapter` | 現行`Snd`エンジンのロジックを移植(効果音/BGM切替のみ先行、音楽表現の細部はPhase 8) | - | 1〜1.5日 |
| 5.6 | `next-intl` 設定 | ロケールルーティング・メッセージ読み込み設定 | 3.5 | 0.5日 |

**完了の定義**: すべてのポートに対して本番用アダプタが揃い、契約テストがグリーン。

---

## Phase 6: Presentation層(Next.js UI)

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 6.1 | `game-store`(Zustand)実装 | ユースケース呼び出しの薄いアダプタ([ADR-0002](../10-architecture/04-adr/0002-state-management.md)) | Phase 4全体 | 1日 |
| 6.2 | セットアップ画面 | 国選択・人数/CPU設定・旅の長さ・CPU強度・セーブ再開 | 6.1 | 1.5日 |
| 6.3 | 盤面(SVG)コンポーネント群 | `board-svg`, `city-node`, `path-node`, `token`、カメラ(`useCamera`)のパン/ズーム/追尾 | 6.1, 2.1 | 2.5日 |
| 6.4 | ダイス周りのUI | `dice-button`, `dice-3d`(3Dアニメーション)、出目確定演出 | 6.1 | 1.5日 |
| 6.5 | HUDコンポーネント | `players-panel`, `destination-card`, `season-card`, `item-bar`, `travel-log` | 6.1 | 1.5日 |
| 6.6 | モーダル群 | `quiz-modal`, `city-stop-modal`, `shop-modal`, `season-modal`, `doom-modal`, `result-modal` | 6.1 | 2.5日 |
| 6.7 | レスポンシブ/タッチ対応 | モバイルでの盤面ドラッグ・レイアウト崩れ確認(現行CSSのブレークポイントを踏襲) | 6.2〜6.6 | 1日 |
| 6.8 | アクセシビリティ基本対応 | フォーカス管理、`prefers-reduced-motion`対応の踏襲、モーダルのキーボード操作 | 6.2〜6.6 | 1日 |

**完了の定義**: 旧HTML版と同等の見た目・操作感でボリビア/日本の両パック、4言語すべてが
一通り最後まで遊べる。

---

## Phase 7: テスト強化(結合/E2E/アクセシビリティ)

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 7.1 | E2Eシナリオ実装 | [テスト戦略のE2Eシナリオ一覧](../20-testing/01-testing-strategy-tdd.md#6-e2e-シナリオ一覧クリティカルユーザージャーニー)8本を実装 | Phase 6 | 2日 |
| 7.2 | コンポーネントテスト追加 | 盤面・ダイス・モーダルの主要コンポーネントにRTLテスト | Phase 6 | 1日 |
| 7.3 | カバレッジ確認・補強 | Domain 90% / Application 85% / 全体70%の目標達成状況を確認し不足箇所を補強 | Phase 2, 4 | 1日 |
| 7.4 | アクセシビリティ自動チェック | axe-core等をPlaywrightに組み込み、主要画面で重大な違反がないことを確認 | 7.1 | 0.5日 |
| 7.5 | クロスブラウザ確認 | Playwrightで主要ブラウザ(Chromium/WebKit/Firefox)+モバイルviewportでの疎通確認 | 7.1 | 0.5日 |
| 7.6 | 現行版との突合QA | `legacy/grand-express.html`と新アプリを同じ操作で比較し、差異を洗い出す(手動) | Phase 6 | 1〜1.5日 |

**完了の定義**: [テスト戦略](../20-testing/01-testing-strategy-tdd.md)のカバレッジ目標・E2Eシナリオが
すべて満たされ、現行版との突合QAで致命的な差異がない。

---

## Phase 8: 演出/音声/パフォーマンス仕上げ

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 8.1 | 音楽/効果音の再現度向上 | `WebAudioSoundAdapter`の細部(地方ごとの曲調、ターン開始SE等)を現行版に近づける | 5.5 | 1〜1.5日 |
| 8.2 | アニメーション/カメラの微調整 | ダイスの弾み方、カメラのイージング等を現行版と比較して調整 | 6.3, 6.4 | 1日 |
| 8.3 | パフォーマンス確認 | Lighthouseでの計測、バンドルサイズ確認、初期表示速度の確認 | Phase 6全体 | 0.5〜1日 |
| 8.4 | 最終ビジュアルQA | 4言語×2ヶ国の組み合わせで見た目崩れがないか確認 | 8.1〜8.3 | 0.5日 |

**完了の定義**: 体験面で現行版から大きく劣化していないことを確認済み。

---

## Phase 9: 移行カットオーバー

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 9.1 | 本番デプロイ | Vercel等へのデプロイ、環境変数・ドメイン設定 | Phase 7, 8 | 0.5日 |
| 9.2 | 最終受け入れ確認 | [移行方針のDoD](./01-migration-strategy.md#4-全体の完了の定義definition-of-done)を満たしているか最終チェック | 9.1 | 0.5日 |
| 9.3 | 旧HTML版の切替/アーカイブ | `grand-express.html`をアーカイブし、新アプリへの導線に切替 | 9.2 | 0.5日 |

---

## Phase 10: 移行後クリーンアップ

| ID | タスク | 内容 | 依存 | 見積り |
|---|---|---|---|---|
| 10.1 | 不要コードの削除 | 歩く骨格時の仮実装・未使用コードの整理 | Phase 9 | 0.5日 |
| 10.2 | ドキュメント更新 | 本ドキュメント一式を「as-built」として更新、`CONTRIBUTING.md`整備 | Phase 9 | 0.5日 |
| 10.3 | 振り返り | 移行前後でのファイルサイズ/LLMトークン消費削減効果を簡易計測し記録(当初課題への対応効果の確認) | Phase 9 | 0.5日 |

---

## 進め方の推奨事項

- **Phase 1(歩く骨格)を飛ばさない**: ここでアーキテクチャの穴(想定外の依存関係、ポート設計ミス等)を
  早期発見できる。歩く骨格を経ずにPhase 2以降へ進むと手戻りリスクが高い。
- **LLM(Claude Code)活用の勘所**: 本設計により1タスクあたりの作業対象ファイルが数百行規模に収まるため、
  「Phase 4のユースケース1つ」「Phase 2のサブドメイン1つ」のように**WBSの1行単位でLLMにセッションを
  依頼する**運用が可能。これが今回の設計変更の直接的な狙い(トークン消費削減)の実践方法にあたる。
- **各フェーズの終わりに現行版との突合を軽く行う**: Phase 6完了を待たず、歩く骨格の時点・Domain層完了時点
  でも都度、現行コードの挙動と一致しているかサンプル確認しておくと、Phase 7での手戻りが減る。
