# 90-04. デプロイ手順(Phase 9)

## 現在の状態(2026-08-05)

- GitHubリポジトリを作成しpush済み: https://github.com/t29mato/grand-express (非公開)
- Vercelへのデプロイ先としてこのリポジトリを使う方針で決定
- **Vercel CLIの認証はブラウザでの対話操作が必要なため、このセッションでは完了できていない**
  (`vercel login` はブラウザ確認/メール確認を要求し、非対話環境ではタイムアウトする)。
  以下のどちらかで完了させてください。

## 次の一歩(どちらか一方でよい)

**方法A: Vercelダッシュボードから(推奨・最短)**
1. https://vercel.com/new を開く
2. 「Import Git Repository」で `t29mato/grand-express` を選択(GitHub連携が
   済んでいなければその場で連携できます)
3. Framework Presetは自動でNext.jsが検出されるはずなので、そのまま「Deploy」
4. 数分でデプロイ完了、URLが発行されます

**方法B: Vercel CLIから(トークンを用意できる場合)**
1. https://vercel.com/account/tokens でトークンを発行
2. このセッション(またはターミナル)で以下を実行:
   ```bash
   vercel --token=<発行したトークン> link   # プロジェクトを作成・紐付け
   vercel --token=<発行したトークン> --prod # 本番デプロイ
   ```

以下は元々の一般的な手順メモ。

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
