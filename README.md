# Grand Express — A Rail Fortune Game

「桃太郎電鉄」風のボードゲーム。サイコロを振って路線を進み、町で物件を買い、
クイズに答え、目的地への一番乗りを競う。ボリビア/日本の2ヶ国パック、
英語・スペイン語・フランス語・日本語の4言語対応。

元は単一HTMLファイル(`legacy/grand-express.html`)だったものを、
**Clean Architecture + DDD + TDD** に基づいて Next.js アプリへ移行したもの。
設計の背景・移行経緯は [docs/](./docs/README.md) を参照。

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

## 主なコマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run test` | ユニット/コンポーネントテスト(Vitest) |
| `npm run test:coverage` | カバレッジ計測 |
| `npm run test:e2e` | E2Eテスト(Playwright。初回は `npx playwright install chromium` が必要) |
| `npm run lint` | ESLint |
| `npm run typecheck` | 型チェック |
| `npm run depcruise` | レイヤー依存ルールの検査(Clean Architectureの依存方向を強制) |
| `npm run ci` | 上記を一括実行(CIと同じゲート) |
| `node scripts/extract-legacy-content.mjs` | `legacy/grand-express.html` からコンテンツ/翻訳文言を再抽出 |

## アーキテクチャ概要

```
src/
  domain/           ドメイン層(依存ゼロ、ゲームルール本体)
  application/      アプリケーション層(ユースケース、ポート定義)
  infrastructure/   インフラ層(localStorage・コンテンツJSON読込・音声・乱数)
  presentation/      プレゼンテーション層(状態管理・Reactコンポーネント)
app/                Next.js App Router(ルーティングのみ)
docs/               設計資料・ADR・テスト戦略・移行WBS
legacy/             移行元の単一HTML版(挙動仕様の一次情報として保持)
e2e/                Playwright E2Eテスト
```

詳細は [docs/10-architecture/](./docs/10-architecture/) を参照。

## 現状(as-built)

- Domain / Application / Infrastructure 層はコンテンツデータ(ボリビア・日本
  両国の都市30・アイテム9・クイズ・季節・厄災)を含めて実装・テスト済み
  (191件のユニット/コンポーネントテスト + 7件のE2Eテストがグリーン)。
- Presentation層は実際にプレイ可能(セットアップ→サイコロ→移動→クイズ/
  町での売買/青赤・カードマス→目的地到着→ゲーム終了まで一通り動作)。
- 演出・音楽の作り込み(元のプロシージャル音楽エンジン相当の再現)は
  意図的に簡略化しており、今後の作り込み対象(詳細は
  [docs/90-migration/02-wbs.md](./docs/90-migration/02-wbs.md) のPhase8参照)。
- 本番デプロイは未実施(ホスティング先の選定はプロジェクトオーナーの判断のため)。
