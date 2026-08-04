# ADR-0004: テストスタックは Vitest + React Testing Library + Playwright

- ステータス: 承認
- 日付: 2026-08-05

## コンテキスト

現行実装にはテストが一切ない。TDDでの移行、および移行後の回帰防止のためにテストスタックを固める必要がある。
Next.js(TypeScript, ESM)との親和性、実行速度、TDDのRed-Green-Refactorサイクルの回しやすさを重視する。

## 決定

| 目的 | ツール |
|---|---|
| Domain / Application 層のユニットテスト | **Vitest**(ESM/TS対応が速く、Watchモードが高速でTDDに向く) |
| Presentation コンポーネントテスト | **React Testing Library** + Vitest |
| E2E テスト | **Playwright**(複数ブラウザ・モバイル viewport・タッチ操作のエミュレートに対応) |
| スキーマ検証(セーブデータ/コンテンツデータ) | **zod** |
| レイヤー間依存の静的検査 | **dependency-cruiser**(CIで `domain → infrastructure` のような禁止import を検出) |
| Lint/Format | ESLint + Prettier(既存のスタイルに準拠) |

## 決定の詳細

- Domain/Applicationのユニットテストは **アダプタなしで実行できる**(DOM・localStorage・Web Audio不要)ことを
  必須要件とする。乱数・時刻はポート(`RandomNumberGenerator`, `Clock`)経由にし、テストでは固定値/シード値の
  フェイク実装に差し替える。
- CPU戦略(`CpuStrategy`)のテストは、確率的要素をフェイクRNGで固定してから決定的にアサートする。
- E2Eは本番相当ビルド(`next build && next start`)に対して実行し、CIでは以下をゲートとする。
  1. `lint`
  2. `typecheck`
  3. `test:unit`(カバレッジ計測、[テスト戦略](../../20-testing/01-testing-strategy-tdd.md) の閾値を満たすこと)
  4. `build`
  5. `test:e2e`(Playwright、クリティカルユーザージャーニーのみ)

## 代替案

- **Jest**: Next.js公式サポートもあり有力だが、ESM対応・実行速度の面でVitestを優先。移行コストは小さいため
  将来的な変更は容易。
- **Cypress(E2E)**: 実績は十分だが、マルチタブ・複数ブラウザの並列実行やタッチジェスチャの表現力で
  Playwrightを優先。

## 影響

- 詳細なテスト戦略(ピラミッド構成・カバレッジ目標・E2Eシナリオ一覧)は
  [20-testing/01-testing-strategy-tdd.md](../../20-testing/01-testing-strategy-tdd.md) を参照。
