# 90-04. デプロイ手順(Phase 9)

## 現在の状態(2026-08-05)

**デプロイ完了。本番URL: https://grand-express.vercel.app**

- Vercelプロジェクト: `t29matos-projects/grand-express`
- GitHubリポジトリ https://github.com/t29mato/grand-express(非公開)と連携済み。
  **以後、main への push で自動的に本番デプロイされる**
- 受け入れ確認済み(Phase 9.2): 本番URLに対してE2E12件がグリーン。
  ブラウザでの目視確認も実施(`assets/prod-setup.png` / `assets/prod-intro.png`)

### 実施した手順

1. オーナーが `vercel login` を実行しブラウザで認証(この一度きりの操作だけは
   エージェントからは代行できない。トークンはブラウザでの同意操作を経てのみ発行されるため)
2. `vercel link --yes` — プロジェクトを作成し、GitHubリポジトリと連携
3. `vercel --prod --yes` — 本番デプロイ

### 再デプロイ・運用

- 通常は main への push で自動デプロイされる(Vercelのgit連携)。
- 手元から明示的にデプロイしたい場合は `vercel --prod`。
- `.github/workflows/deploy.yml`(GitHub Actions経由のデプロイ)も用意してあるが、
  上記のgit連携で自動化されているため**通常は不要**。CI側からデプロイを制御したい
  場合にのみ、下記「GitHub Actions から自動デプロイ」の設定を行うこと。

### デプロイ後の動作確認(スモークテスト)

`playwright.config.ts` は `PLAYWRIGHT_BASE_URL` に対応している。指定するとローカル
サーバーを起動せず、そのURLに対してE2Eを実行する。

```bash
PLAYWRIGHT_BASE_URL=https://grand-express.vercel.app npx playwright test
```

## GitHub Actions から自動デプロイ(任意)

`.github/workflows/deploy.yml` を用意済み。Vercelのgit連携ではなくCIからデプロイを
制御したい場合に使う。動かすには以下の設定が必要:

1. https://vercel.com/account/tokens でトークンを発行
2. リポジトリの Settings → Secrets and variables → Actions に登録:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`
     (ローカルで `vercel link` 済みなら `.vercel/project.json` に書かれている)
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

- [x] 本番URLで一通り(セットアップ→プレイ→保存/読込)を確認する
      → E2E12件を本番URLに対して実行しグリーン。加えてブラウザで目視確認済み
- [x] 旧 `grand-express.html` を配信していた場所があれば、新URLへのリダイレクトに切り替える
      → 旧版はどこにも配信しておらず、`legacy/grand-express.html` としてアーカイブ済み
- [x] `docs/90-migration/03-as-built-status.md` のPhase 9行と、本ドキュメントの
      「現在の状態」を更新する
