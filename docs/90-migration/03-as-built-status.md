# 90-03. 移行の完了状況(as-built, 2026-08-05時点)

WBS([02-wbs.md](./02-wbs.md))の各フェーズに対する実際の実施結果。今後このプロジェクトに
着手する際は、まずこのドキュメントで「どこまで終わっていて、何が残っているか」を確認すること。

## フェーズ別ステータス

| フェーズ | ステータス | 補足 |
|---|---|---|
| Phase 0: 現状把握とベースライン | ✅ 完了 | [00-current-state-analysis.md](../00-current-state-analysis.md), [00-characterization-samples.md](./00-characterization-samples.md) |
| Phase 1: 基盤構築 + 歩く骨格 | ✅ 完了 | Next.js/Vitest/Playwright/dependency-cruiser/CI一式。歩く骨格は個別に区切らず、Domain層構築と並行して最初の縦断確認を実施 |
| Phase 2: Domain層 | ✅ 完了 | board/player/property/item/quiz/season/misfortune/cpu/game-session の全サブドメイン、テスト付き |
| Phase 3: コンテンツ/i18nデータ移行 | ✅ 完了(一部簡略化あり) | `scripts/extract-legacy-content.mjs` による自動抽出。ADR-0006/0007に実装時の簡略化を追記済み |
| Phase 4: Application層 | ✅ 完了 | 全14ユースケース実装・テスト済み(start-game, roll-dice, move-player, property-transactions, answer-quiz, visit-stall, use-item, resolve-misfortune-strike, advance-turn, cpu-take-turn, land-on-square(3種), save-load-game, end-game) |
| Phase 5: Infrastructure層 | ✅ 完了(音声は簡易実装) | localStorage永続化・共有コード・本番乱数は完了。音声は疎通レベルの簡易実装(Phase8で作り込み予定) |
| Phase 6: Presentation層 | ✅ 完了(演出は簡略化) | セットアップ〜プレイ〜ゲーム終了まで実際に動作。盤面はSVGだが手描きの国イラストはなく抽象的なノード/エッジ表示、3Dダイスアニメーション等は簡略化 |
| Phase 7: テスト強化 | ✅ 完了 | ユニット/コンポーネントテスト191件、E2E(Playwright)7件(起動〜プレイ、多言語、セーブ/ロード、アクセシビリティ)。カバレッジはDomain/Applicationともに目標達成 |
| Phase 8: 演出/音声/パフォーマンス仕上げ | ⏳ 未着手 | 音楽エンジンの作り込み、盤面アニメーション(カメラパン/ズーム、駒移動の滑らかさ)、3Dダイス演出、現行版とのビジュアル突合QA |
| Phase 9: 移行カットオーバー | ⏳ 未着手(デプロイ判断待ち) | 本番デプロイ先(Vercel等)の選定・実施はプロジェクトオーナーの判断が必要なため未実施。`legacy/grand-express.html` への切替(アーカイブ化)は既にリポジトリ構成上完了(`legacy/`配下に移動済み) |
| Phase 10: 移行後クリーンアップ | 🔶 一部着手 | 本ドキュメント・README更新・ADR追記まで実施。不要コードの整理は今後の通常開発の中で対応 |

## 実装時に行った主な簡略化(意図的なスコープ調整)

いずれも「動くものを最短で届ける」ための実用的な判断。将来必要になった時点で個別に本格対応する。

1. **クイズの出題**: 山札(使い切るまで重複しない)ではなく毎回一様ランダムに選択
   (`cpuTakeTurn`/ゲームストアのコメント参照)。
2. **i18n**: `next-intl` のURLルーティング/ICU構文は使わず、legacy由来の位置引数プレースホルダー
   (`{0}`)方式の軽量な自前フックで実装(ADR-0006追記)。
3. **コンテンツの翻訳文字列**: ロケール別ファイルへの完全分離ではなく、コンテンツJSONに
   `{en,es,fr,ja}` としてインラインで保持(ADR-0007追記)。
4. **盤面の視覚表現**: 都市ごとの手描きSVGイラスト・カメラのパン/ズーム追尾・中間マスの
   湾曲配置(jitter)は実装していない(直線配置の抽象的なノード/エッジ表示)。
5. **音声**: 地方別プロシージャル音楽エンジンは未実装。短いトーンによる効果音のみ。
6. **ゲームログの文言**: 一部ハードコードされた英語文字列のまま(ロケール非対応)。
   完全な多言語対応が必要な場合は `presentation/state/game-store.ts` のログ生成箇所を
   `useLocale()` 経由の `t()`/`tx()` に置き換える。

## 既知のフォローアップ項目

- `src/presentation/state/game-store.ts` が434行とファイルサイズ指針(200〜300行)を超えている。
  アクション群(setup/turn/city/item等)ごとに複数ファイルへ分割するリファクタリングを推奨。
- E2Eは Chromium のみで実行(`playwright.config.ts`、モバイルビューポートのチェックは
  Chromiumのビューポート指定のみで代替。WebKitバイナリは未導入)。真のcrossブラウザ
  (WebKit/Firefox)での確認は未実施(WBS Phase7.5相当)。
- 現行版(`legacy/grand-express.html`)との厳密なビジュアル突合QA(WBS Phase7.6)は未実施。
- **【パフォーマンス上の既知の課題(要Phase8対応)】** `infrastructure/content/*.content.json`
  (ボリビア・日本、各約185KB)が `JsonCountryContentRepository` で静的importされているため、
  セットアップ画面の国選択カード(名前・キャッチコピーを表示するだけ)を描画する時点で
  **両国分のコンテンツデータがまとめてクライアントJSバンドルに含まれてしまっている**
  (`next build` 後の最大チャンクが約620KBあり、中身を確認したところ都市データを含んでいた)。
  対応案: (1) セットアップ画面用に `{id, name, blurb}` だけを含む軽量なインデックスJSONを
  別途用意する、(2) `CountryContentRepository.load()` を非同期化し、実際にその国を選択した
  タイミングで `import()` によるコード分割を行う。後者は現在同期契約になっている
  Application層のポート/多数のユースケースのシグネチャに影響するため、着手する際は
  影響範囲(全ユースケース・191件のテスト)を洗い出してから計画的に行うこと。

## ファイルサイズの変化(当初の課題への効果測定)

| | 移行前 | 移行後 |
|---|---|---|
| 実装ファイル数 | 1ファイル | 81ファイル(+テスト42ファイル) |
| 最大ファイルサイズ | 2,964行 / 385KB(全部入り) | 434行(最大。`game-store.ts`) |
| 典型的なファイルサイズ | — | 数十〜150行程度 |
| コンテンツデータ | コードに埋め込み | `infrastructure/content/*.content.json`(コードから分離、各約185KB) |

**当初の課題「1ファイルへの変更を依頼するたびに385KB全体をLLMに読ませる必要があった」状態は解消され、
1つの変更(例:あるユースケース、あるコンポーネント)につき数十〜数百行程度のファイルだけを
読み書きすれば済むようになった。** これは今回のアーキテクチャ変更の当初の目的に対する
直接的な効果である。
