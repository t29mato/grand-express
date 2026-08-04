# 10-02. ドメインモデル(DDD)

## 1. コンテキストマップ

このアプリは単一プレイヤー端末で完結するローカルゲームであり、マイクロサービス的に境界づけられたコンテキストを
複数立てるほどの規模ではない。そのため **コアドメインを1つ(Journey)** とし、その中を DDD の戦術的パターン
(エンティティ・値オブジェクト・集約・ドメインサービス・ドメインイベント)で整理する。加えて、コアドメインではない
関心事を「補完サブドメイン」として明確に切り離す。

```mermaid
graph TB
  subgraph Core["コアドメイン: Journey(旅・対局)"]
    GS[GameSession 集約]
  end
  subgraph Supporting["支援サブドメイン"]
    CP[CountryContentPack<br/>都市・クイズ・アイテム・季節・厄災テーブル]
  end
  subgraph Generic["汎用サブドメイン(インフラに近い)"]
    PER[Persistence<br/>セーブ/ロード]
    I18N[Localization<br/>多言語文言]
    AUD[Audio<br/>効果音・BGM]
    RND[Rendering<br/>盤面SVG描画・カメラ]
  end
  GS -->|参照(読み取り専用)| CP
  GS -.発行するイベントを購読.-> PER
  GS -.発行するイベントを購読.-> I18N
  GS -.発行するイベントを購読.-> AUD
  GS -.発行するイベントを購読.-> RND
```

- **Journey(コアドメイン)**: ゲームのルールそのもの。ここに最も設計コストをかける。
- **CountryContentPack(支援サブドメイン)**: ボリビア/日本の都市・クイズ・アイテム・季節イベント・厄災テーブルという
  「マスターデータ」。ゲームルール自体は国が変わっても同じロジックで動くため、データとして注入する(Repository経由)。
- **Persistence / Localization / Audio / Rendering(汎用サブドメイン)**: ゲーム固有のドメイン知識ではなく、
  一般的な技術関心事。Infrastructure/Presentation層に閉じ込め、Domain層からは完全に見えないようにする。

## 2. 集約(Aggregate)

### 2.1 GameSession(集約ルート)

1回のプレイ(セットアップ〜決着)のライフサイクル全体を表す、唯一の集約ルート。
現行コードのグローバル変数群(`players`, `turnIdx`, `month`, `dest`, `spiritHolder`, `spiritLevel`, `over` …)を
すべてこの集約に閉じ込める。

```text
GameSession
 ├─ id: GameSessionId
 ├─ countryId: CountryId                      // "bolivia" | "japan"
 ├─ calendar: Calendar (VO)                    // month index, year, season
 ├─ destination: Destination (VO)              // 現在の目的地 CityId + 賞金額
 ├─ turnOrder: PlayerId[]
 ├─ activePlayerIndex: number
 ├─ players: Player[]                          // 集約内の内部エンティティ(下記)
 ├─ misfortuneSpirit: MisfortuneSpirit (VO/Entity)
 ├─ status: "in-progress" | "finished"
 └─ pendingEvents: DomainEvent[]               // 発行済みイベントのバッファ
```

**不変条件(Invariants)**
- `activePlayerIndex` は必ず `players` の範囲内
- プレイヤーの現金は負にならない(足りない支払いは `min(cash, amount)` で丸める。現行 `doomLoseProps` 等の挙動を踏襲)
- 所持アイテムは最大5個(現行 `giveItem` の `p.items.length>=5` 制約を踏襲)
- `status === "finished"` になった集約への操作(サイコロを振る等)は拒否する
- 独占(モノポリー)判定: あるプレイヤーがある都市の全物件を所有している場合のみ、その都市の収入が2倍になる

### 2.2 Player(集約内エンティティ)

```text
Player
 ├─ id: PlayerId
 ├─ name: string
 ├─ isCpu: boolean
 ├─ cpuLevel?: CpuLevel                // Easy | Normal | Merciless (CPU戦略選択に使う)
 ├─ cash: Money
 ├─ location: NodeId                   // 現在地(都市 or 路線上の中間マス)
 ├─ portfolio: PropertyHolding[]       // 所有物件
 ├─ inventory: ItemKey[]               // 所持アイテム(最大5)
 ├─ turnFlags: { skipNext: boolean; extraTurn: boolean }
```

### 2.3 PropertyHolding(値に近いエンティティ、Playerの内部)

```text
PropertyHolding
 ├─ propertyRef: PropertyRef  // { cityId, propertyIndex }
 ├─ level: Level(1..5)
```

収入・投資額・売却額は `PropertyIncomeService`(ドメインサービス)が `CountryContentPack` の原価データと
`level` から計算する(現行の `incAt`, `upCost`, `investedIn`, `sellValue` に相当)。

### 2.4 CountryContentPack(参照専用の集約 / マスターデータ)

ライフサイクルを持たず、`CountryContentRepository` から読み込む不変(immutable)なデータ。
DDDでいう「集約」というよりは値オブジェクトの集合体だが、コード上は1つの型としてまとめる。

```text
CountryContentPack
 ├─ id: CountryId
 ├─ cities: City[]            // 各都市: 位置・物件一覧・地方(region)・案内文
 ├─ edges: Edge[]             // 都市間の路線(中間マスは決定的アルゴリズムで生成)
 ├─ items: ItemDefinition[]
 ├─ quiz: QuizQuestion[]
 ├─ seasons: SeasonalEventDefinition[12]
 ├─ doomTable: DoomEffectDefinition[]
 └─ currency: CurrencyFormat
```

## 3. 値オブジェクト(Value Objects)

| 値オブジェクト | 説明 | 現行コードでの相当箇所 |
|---|---|---|
| `Money` | 金額。加減算・0未満禁止のガードを持つ | `p.cash`(生の number) |
| `CityId` / `NodeId` | 都市ID / 盤面ノードID(都市 or 中間マス) | 文字列キー |
| `PlayerId` | プレイヤー識別子 | 配列インデックスで代用していた箇所 |
| `ItemKey` | アイテム識別子 | `G.items` のキー |
| `PropertyRef` | `{ cityId, propertyIndex }` | `propKey(c,i)` の文字列結合 |
| `Level` | 物件レベル(1〜5) | `MAXLV` 定数と生の number |
| `DiceRoll` | 出目の配列(1〜3個)と合計 | `steps` (生の number) |
| `Calendar` | 月インデックス・年・季節 | `month`, `Math.floor(month/12)` |
| `Destination` | 目的地都市ID + 現在の賞金額 | `dest`, `destBonus()` |
| `CpuLevel` | Easy(0) / Normal(1) / Merciless(2) | `CPU` テーブルの添字 |

## 4. ドメインサービス

ドメインサービスは「特定のエンティティに属さない計算・判断ロジック」を担う。

| ドメインサービス | 責務 | 現行コードでの相当箇所 |
|---|---|---|
| `PathfindingService` | 盤面グラフ上のBFS距離計算・到達可能マス列挙(前後双方向) | `bfsDist`, `reachable` |
| `BoardGraphBuilder` | `edges` から中間マス(クイズ/青/赤/カード)を決定的に生成しグラフを構築 | `buildGraph`, `h32` |
| `PropertyIncomeService` | 収入計算・独占倍率・季節補正の適用 | `playerIncome`, `monopolyCount`, `incAt`, `upCost`, `sellValue` |
| `DestinationSelector` | 全プレイヤーから一定距離以上離れた都市を新しい目的地として抽選 | `pickDest` |
| `QuizGradingService` | 正解/不正解によるティア別の増減額判定 | `quizStop` 内のロジック |
| `MisfortuneStrategyResolver` | 厄災の神の発動判定・4種類の効果(物件喪失/送金/瞬間移動/強奪)から選択・実行 | `spiritStrike`, `doomLoseProps`, `doomPayOthers`, `doomTeleport`, `doomSteal` |
| `SpiritTransferService` | 移動経路上で他プレイヤーとすれ違った際の憑依先の受け渡し判定 | `tryPassSpirit`, `settleSpirit`, `farthestIdx` |
| `CpuStrategy`(インターフェース + Easy/Normal/Merciless の3実装) | サイコロ後のマス選択・アイテム使用・物件購入/投資の意思決定 | `cpuPick`, `cpuItems`, `CPU` テーブル |
| `NetWorthCalculator` | 現金+物件評価額から総資産・勝者判定 | `netWorth`, `endGame` |

CPU戦略を `CpuStrategy` インターフェースの実装として切り出すことで、**新しい難易度やイベント専用AIの追加が
既存コードに触れずに済む**(Open-Closed Principle)。

## 5. ドメインイベント

現行コードの最大の問題(ロジックと演出の密結合)を解くための鍵。ユースケースは状態を変更した後、
ドメインイベントを発行するだけで、ログ表示・効果音・アニメーション・カメラ移動は
Presentation/Infrastructure側の購読者が担当する。

| イベント | 発生元ユースケース | 主な購読者(現行の相当処理) |
|---|---|---|
| `TurnStarted` | AdvanceTurnUseCase | ターンバナー表示・カメラ追尾・BGM切替(`turnBanner`, `camWho`, `Snd.region`) |
| `DiceRolled` | RollDiceUseCase | ダイス3Dアニメーション(`animateRoll`) |
| `PlayerMoved` | MovePlayerUseCase | トークン移動アニメーション・足音SE(`renderTokens`, `Snd.step`) |
| `SpiritTransferred` | MovePlayerUseCase(すれ違い判定) | すれ違い演出(`passOn` モーダル) |
| `PropertyPurchased` / `PropertyInvested` / `PropertySold` | BuyPropertyUseCase 等 | ログ出力・効果音(`boughtLog`, `investLog`, `sellLog`) |
| `MonopolyAchieved` | 上記いずれか(副作用として判定) | 独占演出(`monoLog`) |
| `QuizAnswered` | AnswerQuizUseCase | 正誤演出・効果音(`quizOkLog`, `quizNoLog`) |
| `ItemAcquired` / `ItemUsed` | VisitStallUseCase / UseItemUseCase | アイテム入手/使用ログ |
| `SeasonChanged` | AdvanceTurnUseCase(月替わり時) | 季節カード表示・地方収入補正の再計算通知 |
| `QuarterlyIncomeCollected` | AdvanceTurnUseCase | 四半期収入ログ |
| `SpiritStruck` | ResolveMisfortuneStrikeUseCase | 厄災演出モーダル |
| `DestinationReached` | ArriveAtDestinationUseCase | 到着演出・次の目的地抽選トリガー |
| `GameEnded` | EndGameUseCase | 結果画面表示 |

## 6. 集約境界を1つにした理由

本来DDDでは「Player」を独立集約にすることも検討できるが、以下の理由から
**GameSession 1つを集約境界とする(Playerは内部エンティティ)** を採用する。

- 同時に複数プレイヤーが並行更新されることはない(1端末・ターン制のローカルゲーム)
- 「厄災の神をすれ違いで渡す」「独占判定のために他プレイヤーの所有物件を参照する」など、
  プレイヤーをまたいだ不変条件が頻繁に発生し、集約を分けるとトランザクション境界をまたぐ整合性維持が煩雑になる
- セーブ/ロードの単位としても `GameSession` 全体が1スナップショットである方が自然(現行の `snapshot()` と一致)

将来オンライン対戦やサーバー永続化を導入する場合は、`Player` を独立集約に切り出す再設計を
ADRとして別途起こすこと(現時点ではスコープ外)。

## 7. 用語の対応

ドメイン用語とゲーム内表示文言(UI文字列)の対応は [用語集](../30-glossary.md) を参照。
