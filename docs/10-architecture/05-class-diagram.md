# 10-05. 構造の図(クラス図・シーケンス図)

このプロジェクトの構造を図で示す。**依存の向きは常に外側から内側**で、
Domain 層はどの層にも依存しない([10-01](./01-clean-architecture-overview.md))。

> 図は Mermaid で書いてある。GitHub 上ではそのまま描画される。

## 0. この資料の位置づけ(どれがクラス図で、どれがパッケージ図か)

図の種類が混ざっていると読み違えるので、先に整理しておく。

| 節 | 図の種類 | 何を伝えるか |
|---|---|---|
| 1 | **パッケージ(層)図** | 4層の関係と依存の向き。クラス図ではない |
| 2 | **クラス図** | Domain 層の集約・エンティティ・値オブジェクトの関連 |
| 3 | **クラス図** | ポート(インターフェース)とアダプタの実装関係 |
| 4 | **シーケンス図** | 1手番で層をまたいで何が起きるか |
| 5 | **パッケージ図** | Presentation 層内部のファイル分割 |

**この資料は手書き**であり、意図や関連(所有・実装)を伝えることを目的とする。
一方、**実装から自動生成した依存関係グラフ**は
[10-06](./06-dependency-graph.md) にある。「今の実装が実際どうなっているか」は
そちらが正で、CI で内容の陳腐化を検出している。

## 1. 全体像 — 4層と依存の向き

```mermaid
flowchart TB
    subgraph P["Presentation 層 &nbsp;(Next.js / React)"]
        direction LR
        P1["画面・コンポーネント<br/>game-screen / board-view / modals"]
        P2["状態管理<br/>game-store (Zustand)"]
        P3["フック<br/>use-board-layout / use-camera / use-city-labels"]
    end

    subgraph A["Application 層 &nbsp;(ユースケース)"]
        direction LR
        A1["ユースケース関数<br/>startGame / rollDice / answerQuiz …"]
        A2["ポート (インターフェース)<br/>GameRepository / CountryContentRepository<br/>Random / SoundPort"]
        A3["GameEngineContext<br/>(盤面グラフ＋コンテンツの束ね)"]
    end

    subgraph I["Infrastructure 層 &nbsp;(アダプタ)"]
        direction LR
        I1["JsonCountryContentRepository"]
        I2["LocalStorageGameRepository"]
        I3["CryptoRandomAdapter"]
        I4["WebAudioSoundAdapter"]
    end

    subgraph D["Domain 層 &nbsp;(純粋なTypeScript・外部依存ゼロ)"]
        direction LR
        D1["GameSession 集約"]
        D2["Player / Property / Item"]
        D3["Board / Quiz / Season / Misfortune / CPU"]
        D4["shared-kernel<br/>Money / ids / LocalizedText"]
    end

    P -->|"呼ぶ"| A
    P -.->|"型のみ参照"| D
    A --> D
    I -->|"ポートを実装"| A2
    I --> D
    P -.->|"起動時に注入"| I

    classDef domain fill:#2f6b3f,stroke:#1d4527,color:#fff
    classDef app fill:#3a2d66,stroke:#241a3f,color:#fff
    classDef infra fill:#7a5a2f,stroke:#4a3620,color:#fff
    classDef pres fill:#2b4a7d,stroke:#1a2e4f,color:#fff
    class D,D1,D2,D3,D4 domain
    class A,A1,A2,A3 app
    class I,I1,I2,I3,I4 infra
    class P,P1,P2,P3 pres
```

**依存性逆転**: Application 層は「保存する」「乱数がほしい」「音を鳴らす」を
**ポート(インターフェース)**として宣言するだけで、実装は知らない。
Infrastructure 層がそれを実装し、Presentation 層が起動時に注入する
(`game-store-dependencies.ts`)。これにより Domain / Application はブラウザAPIから
完全に切り離され、Node 上のテストでそのまま動く。

## 2. Domain 層 — 集約とエンティティ

`GameSession` が唯一の集約ルート。`Player` は集約内部のエンティティで、
`GameSession` を通してのみ変更する([ADR-0002](./04-adr/) / [02-domain-model-ddd](./02-domain-model-ddd.md))。

```mermaid
classDiagram
    class GameSession {
        <<集約ルート>>
        +GameSessionId id
        +CountryId countryId
        +number month
        +number maxMonths
        +number activePlayerIndex
        +Player[] players
        +CityId destination
        +MisfortuneSpiritState misfortune
        +GameSessionStatus status
        +Map~RegionId,number~ regionIncomeModifiers
        +LearningRecord learningRecord
        +currentPlayer() Player
        +isOver() boolean
        +destinationPrize() Money
    }

    class Player {
        <<エンティティ>>
        +PlayerId id
        +string name
        +boolean isCpu
        +CpuLevel? cpuLevel
        +KnowledgeLevel knowledgeLevel
        +Money cash
        +NodeId location
        +Map~PropertyRef,PropertyLevel~ portfolio
        +ItemKey[] inventory
        +boolean skipNextTurn
        +boolean hasExtraTurn
    }

    class MisfortuneSpiritState {
        <<値オブジェクト>>
        +PlayerId? holderId
        +0|1|2 level
        +number turnsOnCurrentHolder
        +boolean resting
    }

    class LearningRecord {
        <<値オブジェクト>>
        +QuizQuestionId[] missedQuestionIds
    }

    class Money {
        <<値オブジェクト>>
        +number amount
        +add(Money) Money
        +multiply(number) Money
    }

    GameSession "1" *-- "2..4" Player : 内部エンティティ
    GameSession "1" *-- "1" MisfortuneSpiritState
    GameSession "1" *-- "1" LearningRecord
    Player "1" *-- "1" Money : cash
```

### 参照専用のコンテンツ(ライフサイクルを持たない)

都市・アイテム・クイズなどは**ゲーム中に変化しないマスターデータ**なので、
集約の外に `CountryContentPack` として置き、`GameEngineContext` から参照する。

```mermaid
classDiagram
    class CountryContentPack {
        <<参照専用データ>>
        +CountryId id
        +LocalizedText name
        +CurrencyFormat currency
        +City[] cities
        +Edge[] edges
        +ItemDefinition[] items
        +QuizQuestion[] quiz
        +SeasonDefinition[] seasons
        +DoomFlavor[] doomFlavors
        +SpiritFlavor spirit
        +CountryTerrain terrain
    }
    class City {
        +CityId id
        +LocalizedText name
        +RegionId regionId
        +number longitude
        +number latitude
        +PropertyDefinition[] properties
        +string artSceneKey
    }
    class QuizQuestion {
        +QuizQuestionId id
        +LocalizedText question
        +LocalizedText[] options
        +number correctOptionIndex
        +LocalizedText fact
    }
    class ItemDefinition {
        +ItemKey key
        +number price
        +ItemEffect effect
    }
    CountryContentPack "1" o-- "*" City
    CountryContentPack "1" o-- "*" QuizQuestion
    CountryContentPack "1" o-- "*" ItemDefinition
```

### ドメインサービス(状態を持たない計算)

集約に属さない計算はドメインサービスとして関数で置く。

| サービス | 役割 |
|---|---|
| `board-graph-builder` | 都市と路線から盤面グラフを組み立てる |
| `pathfinding-service` | サイコロの目から到達可能なマスを求める |
| `property-income-service` | 物件の収入・独占・売却額の計算 |
| `quiz-grading-service` | 正誤判定と、知識レベルによる増減額の補正 |
| `season-effect-applier` | 季節イベントの効果適用 |
| `destination-selection-service` | 次の目的地の抽選 |
| `cpu-move-strategy` / `cpu-city-strategy` / `cpu-item-strategy` | CPUの意思決定 |

## 3. Application 層 — ポートと依存性逆転

```mermaid
classDiagram
    class CountryContentRepository {
        <<interface / ポート>>
        +load(CountryId) Promise~CountryContentPack~
    }
    class GameRepository {
        <<interface / ポート>>
        +save(GameSession) void
        +load() GameSession?
    }
    class Random {
        <<interface / ポート>>
        +nextInt(max) number
        +nextFloat() number
    }
    class SoundPort {
        <<interface / ポート>>
        +playRattle() void
        +setRegion(RegionId) void
    }

    class JsonCountryContentRepository {
        国ごとのJSONを動的importで読む
    }
    class LocalStorageGameRepository {
        localStorage + 共有コード
    }
    class CryptoRandomAdapter {
        crypto.getRandomValues
    }
    class WebAudioSoundAdapter {
        Web Audio API(音楽・SFX)
    }

    CountryContentRepository <|.. JsonCountryContentRepository : 実装
    GameRepository <|.. LocalStorageGameRepository : 実装
    Random <|.. CryptoRandomAdapter : 実装
    SoundPort <|.. WebAudioSoundAdapter : 実装
```

矢印が **Infrastructure → Application** を向いている点が要点で、これが依存性逆転である。
Application 層のコードは `JsonCountryContentRepository` の存在を知らない。

## 4. 1手番の流れ(シーケンス)

人間プレイヤーがサイコロを振ってクイズマスに止まった場合。

```mermaid
sequenceDiagram
    actor U as プレイヤー
    participant V as GameScreen (Presentation)
    participant S as game-store (Zustand)
    participant UC as ユースケース (Application)
    participant DM as Domain
    participant SND as WebAudioSoundAdapter

    U->>V: サイコロを押す
    V->>S: rollForHumanTurn()
    S->>UC: rollOneDie(random)
    UC->>DM: 1 + random.nextInt(6)
    S->>UC: reachableNodesFor(...)
    UC->>DM: pathfinding-service
    S-->>V: ui = choosing-square / diceRoll をセット
    V-->>U: 3Dサイコロ演出＋到達可能マスを光らせる

    U->>V: マスを選ぶ
    V->>S: chooseSquare(nodeId)
    S->>UC: movePlayerAlongPath(...)
    UC->>DM: GameSession を更新(不変)
    S->>SND: setRegion(地方)
    S-->>V: ui = quiz(知識レベルに応じて選択肢を絞る)

    U->>V: 選択肢を選ぶ
    V->>S: answerQuizOption(index)
    S->>UC: answerQuiz(...)
    UC->>DM: gradeAnswer(知識レベルの倍率) / recordMiss
    S->>SND: playRight() or playWrong()
    S-->>V: ui = quiz-result
    V-->>U: 正解・自分の選択・解説を表示

    U->>V: 次へ
    V->>S: dismissQuizResult()
    S->>UC: advanceTurn(...)
    UC->>DM: 月替わり・四半期収入の判定
    S-->>V: 次の手番へ(CPUなら自動進行)
```

## 5. Presentation 層の内部

`game-store` は **Application 層のユースケースを呼ぶだけの薄いアダプタ**で、
ゲームのルールを持たない([ADR-0002](./04-adr/))。ファイルが大きくなったため
役割ごとに分割してある。

```mermaid
flowchart LR
    GS["game-store.ts<br/>(14のアクション)"]
    T["game-store-types.ts<br/>UiState / LogEntry"]
    DEP["game-store-dependencies.ts<br/>アダプタの生成・注入"]
    TF["game-store-turn-flow.ts<br/>手番進行・CPUループ"]
    FM["game-store-formatters.ts<br/>ログ文言・選択肢の絞り込み"]
    LOG["game-store-log.ts"]

    GS --> T
    GS --> DEP
    GS --> TF
    GS --> FM
    GS --> LOG
    TF --> FM
    TF --> LOG
```

## 6. 図と実装のずれを防ぐ

この図は手で書いたものなので、実装と乖離しうる。**機械的に検証しているのは
`dependency-cruiser` のルール**(`.dependency-cruiser.cjs`)であり、
以下は CI で常に守られている。

- Domain 層は Application / Infrastructure / Presentation に依存しない
- Application 層は Infrastructure / Presentation に依存しない
- Infrastructure 層は Presentation に依存しない

依存の**向き**が壊れれば CI が落ちる。一方で「どのクラスがどれを持つか」といった
細部は自動検証されていないため、構造を大きく変えたときはこの図も更新すること。
