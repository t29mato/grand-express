# 90-04. デプロイ手順(Phase 9 準備)

本番デプロイ先の選定はプロジェクトオーナーの判断が必要なため、このセッションでは
実施していない。以下は着手する際の手順メモ。

## 前提

- `next.config.ts` は特別な設定をしておらず、標準的なNext.jsサーバーとしてデプロイできる
  (ADR-0001の通り、`output:"export"` は使っていない。将来サーバー機能を追加する余地を
  残すため)。
- 環境変数は現時点で必須のものはない(すべてクライアント完結、外部APIキー等は不使用)。
- ビルドコマンド: `npm run build`、起動コマンド: `npm run start`。

## Vercelにデプロイする場合(推奨、Next.js公式)

1. GitHubリポジトリをpush(現在ローカルのみ。まだリモートリポジトリと接続していない)。
2. [vercel.com/new](https://vercel.com/new) からリポジトリをインポート。
3. ビルド設定はデフォルトのままで問題ない(Next.jsを自動検出)。
4. デプロイ後、`npm run test:e2e` の `baseURL` を本番URLに向けたスモークテストを
   手動で1回実行することを推奨(このリポジトリのE2Eはlocalhost前提のため、
   本番向けには `playwright.config.ts` の `baseURL`/`webServer` を一時的に
   コメントアウトし、`PLAYWRIGHT_BASE_URL` 等で向き先を変える運用を想定)。

## Vercel以外(セルフホスト)にデプロイする場合

- `npm run build` 後、`.next/` ディレクトリと `package.json` を含めてNode.jsが動く
  環境に配置し `npm run start` で起動する(標準的なNext.jsのセルフホスト手順)。
- リバースプロキシ(nginx等)を使う場合はポート3000をプロキシする。

## デプロイ後にやること(Phase 9.2 最終受け入れ確認、Phase 9.3 旧版の切替)

- [ ] 本番URLで一通り(セットアップ→プレイ→保存/読込→ゲーム終了)を手動確認する
- [ ] 旧 `grand-express.html` を配信していた場所があれば、新URLへのリダイレクトに切り替える
      (本リポジトリ内では既に `legacy/grand-express.html` としてアーカイブ済み)
- [ ] `docs/90-migration/03-as-built-status.md` のPhase 9行を更新する
