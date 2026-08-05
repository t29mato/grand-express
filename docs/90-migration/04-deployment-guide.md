# 90-04. デプロイ手順(Phase 9)

## 現在の状態(2026-08-05)

- GitHubリポジトリを作成しpush済み: https://github.com/t29mato/grand-express (**非公開**)
- デプロイ先はVercelを使う方針で決定済み
- アプリ側の準備は完了している(`npm run build` が通り、環境変数も不要)
- **残っているのはVercelアカウントとの接続だけ**。これはブラウザでの対話的な認証
  (OAuth)が必須で、エージェントやCIから代行できない。`vercel login` を非対話環境で
  実行すると、CLIがそれを検出して認証URLを返して終了する

## オーナーの操作が必要な理由

Vercel CLIの認証は、ブラウザでVercelにログインして同意画面を操作することでのみ完了する。
アクセストークンはその結果として発行されるため、**トークンを持たない状態から自動で
認証を完了する方法は存在しない**。以下のいずれかでこの一度きりの壁を越える必要がある。

### 確認済みの事実(2026-08-05)

推測ではなく、実際に以下を確認している。

- `vercel login` を非対話環境で実行すると、CLIがそれを検出して
  `status: "action_required"` と認証URL(`verification_uri`)を返して終了する。
- このマシンには Vercel CLI の設定ディレクトリ
  (`~/Library/Application Support/com.vercel.cli/`)と `auth.json` が既に存在するが、
  **有効な資格情報は入っていない**。`vercel whoami` を実行すると
  `Error: No existing credentials found. Please run 'vercel login' or pass "--token"`
  が返る(過去にCLIを起動したがログインは完了していない状態)。
- 環境変数にも `VERCEL_TOKEN` 等は設定されていない。

つまり「既にログイン済みだったので自動で続行できる」という抜け道はない。

## 方法A: ダッシュボードからインポート(最短・推奨)

1. https://vercel.com/new を開く
2. 「Import Git Repository」で `t29mato/grand-express` を選択
   (GitHubとの連携が未設定ならその場で連携できる。非公開リポジトリなので
   Vercel GitHub App にこのリポジトリへのアクセスを許可する必要がある)
3. Framework Preset は Next.js が自動検出されるので、そのまま「Deploy」
4. 数分でデプロイが完了し、`https://<project>.vercel.app` が発行される

以後は main への push で自動的に再デプロイされる(方法Cのワークフローは不要)。

## 方法B: このセッションからCLIでデプロイ

1. このセッションで `! vercel login` を実行する
   (`!` プレフィックスでコマンドを実行すると、ブラウザが開いて認証できる)
2. 認証が完了したら、その旨を伝える。以降の
   `vercel link` → `vercel --prod` はエージェント側で実行できる

あるいは https://vercel.com/account/tokens でトークンを発行して渡してもらえれば、
`vercel --token=<token> ...` で非対話のままデプロイできる。

## 方法C: GitHub Actions から自動デプロイ

`.github/workflows/deploy.yml` を用意済み。main への push で本番デプロイする。
動かすには以下の設定が必要:

1. https://vercel.com/account/tokens でトークンを発行
2. リポジトリの Settings → Secrets and variables → Actions に登録:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   (後者2つは、方法AでプロジェクトをVercel上に作った後に
   プロジェクトの Settings → General で確認できる。ローカルで `vercel link` した場合は
   `.vercel/project.json` にも書かれる)
3. 同じ画面の Variables タブで `DEPLOY_ENABLED` を `true` にする
   (未設定のうちはワークフローがスキップされ、CIが赤くならないようにしてある)

## 前提(参考)

- `next.config.ts` は特別な設定をしておらず、標準的なNext.jsサーバーとしてデプロイできる
  (ADR-0001の通り `output:"export"` は使っていない。将来サーバー機能を追加する余地を
  残すため)。
- 環境変数は現時点で必須のものはない(すべてクライアント完結、外部APIキー等は不使用)。
- ビルドコマンド: `npm run build`、起動コマンド: `npm run start`。

## Vercel以外(セルフホスト)にデプロイする場合

- `npm run build` 後、`.next/` ディレクトリと `package.json` を含めてNode.jsが動く
  環境に配置し `npm run start` で起動する(標準的なNext.jsのセルフホスト手順)。
- リバースプロキシ(nginx等)を使う場合はポート3000をプロキシする。
- 完全な静的サイトとして配信したい場合、このアプリはサーバー機能を使っていないため
  `next.config.ts` に `output: "export"` を足せば静的書き出しもできる
  (ADR-0001の方針変更になるため、採用する場合はADRに追記すること)。

## デプロイ後にやること(Phase 9.2 最終受け入れ確認、Phase 9.3 旧版の切替)

- [ ] 本番URLで一通り(セットアップ→プレイ→保存/読込→ゲーム終了)を手動確認する
- [ ] 旧 `grand-express.html` を配信していた場所があれば、新URLへのリダイレクトに切り替える
      (本リポジトリ内では既に `legacy/grand-express.html` としてアーカイブ済み)
- [ ] `docs/90-migration/03-as-built-status.md` のPhase 9行と、本ドキュメントの
      「現在の状態」を更新する
