# itch.io 掲載の下書き

**これは下書きです。itch.io への登録・投稿は行っていません**(オーナー操作)。
2026-08-26 作成 / 対象 v0.58.0

---

## 1. タイトルと1行キャッチ

### タイトル

```
World Express
```

**アプリが名乗っている名前**(画面の左上・`<title>`・`package.json` の `name`)に
合わせた。リポジトリ名は `grand-express` だが、**遊ぶ人が目にする名前は
World Express** なので、そちらを表に出す。

#### 名前の衝突について(2026-08-26 調べ)

**結論: `World Express` のまま出してよい。副題は要らない。**

理由は「空いていそうだから」ではなく、**itch.io では題が衝突しても登録が
止まらないから**である。作品のURLは `<ユーザー名>.itch.io/<スラッグ>` の形で、
**スラッグが一意であればよいのは自分のライブラリの中だけ。**
他人が `world-express` を使っていても `t29mato.itch.io/world-express` は取れる。
つまり題の衝突は**登録の可否ではなく、見つけてもらいやすさの話**である。

そのうえで探した範囲では、`World Express` という作品は見つからなかった。
いちばん近いのが `Witasy Express`(Sparuh)で、別物である。

**ただしこれは「無い」ことの証明にはなっていない。**
itch.io の検索そのものを見られていない:

- WebFetch は `itch.io/search?q=...` でクエリが落ちてトップページが返る
  (`q=celeste` で試しても同じ結果になったので、これは経路の問題であって
  「該当なし」ではない)
- ブラウザからは、このネットワークの McAfee Web Gateway が itch.io を
  「Games」カテゴリとして遮断している

**残っているのは外部検索エンジン越しの間接的な確認だけ**なので、
登録の直前にオーナーが <https://itch.io/search?q=world+express> を
自分の目で見てほしい。見つかっても、上に書いたとおり登録は通る。
それでも避けたい場合の副題案: `World Express — A Rail Fortune Game`。

### 1行キャッチ(itch.io の "Short description or tagline")

```
Roll dice across real railway maps — 47 boards, four languages,
and something worth knowing in every town.
```

日本語併記(説明文の冒頭に置く想定):

```
本物の鉄道地図をサイコロで旅する。47の盤面、4言語、町ごとに1つの発見。
```

---

## 2. 説明文(英語・約300語)

> A rail fortune game. Two to four travellers roll dice along a real railway
> map, buy businesses in real towns, answer questions about the place they are
> standing in, and race for a destination that moves every time somebody
> reaches it.
>
> There are **47 boards**. Six continents, a trip around the whole world, and
> the solar system. Every stop is a real place with a real fact attached:
> Fakaofo has no airport and takes a day by boat; Puerto Colombia's pier was
> once the longest on Earth and fell silent when engineers cut a channel
> through the sandbar; Cuba had a railway eleven years before Spain did,
> because sugar needed one and people did not.
>
> The quiz adapts to you rather than to the board. Before you start you say
> how well you know the country — **four steps, from "New here" to "Very
> well"** — and that changes *which questions you are asked*, not how many
> answers you can see. Everyone sees all three options. Say you are new and
> you get the well-known things, the ones carrying a large hint. Say you know
> the place and the questions get specific. The stakes tilt with it: the less
> you claim, the more a right answer pays and the less a wrong one costs. It
> is the handicap system from Go, applied to knowing where things are.
>
> Play on one screen and pass the device around, or against the computer, or
> both. Games run one to three in-game years. Everything is saved in your own
> browser — no account, no install, no ads.
>
> **English, Spanish, French and Japanese**, all four complete: every town
> card, every question, every explanation. Switch language mid-game and the
> board follows.
>
> Free and open source. Built almost entirely by AI agents under human
> direction, as an experiment in how far that goes.

<sub>303語(数えた)。itch.io の説明欄は Markdown を受け付ける。</sub>

---

## 3. タグ候補10個

itch.io はタグを**最大10個**まで付けられる。既存の語彙にあるものを選んだ
(勝手な造語はつけない。検索に載らないため)。

| タグ | 理由 |
|---|---|
| `board-game` | いちばん近い分類。すごろくである |
| `educational` | 学びが主目的。itch.io の教育カテゴリで拾われる |
| `trivia` | クイズが遊びの半分 |
| `geography` | 題材そのもの。地理で探す人に当たる |
| `local-multiplayer` | 1画面を回して2〜4人。itch.io の絞り込みで強い |
| `singleplayer` | CPU相手にも遊べる。片方だけだと除外される |
| `turn-based` | 手番制。速さを求める人が誤って開かないように |
| `trains` | 鉄道。狭いが濃い層がいる |
| `family-friendly` | 暴力表現なし。子どもと遊べる |
| `open-source` | 公開リポジトリ。この層は説明文まで読んでくれる |

**外した候補と理由**

- `multiplayer` … `local-multiplayer` と重複し、オンライン対戦を期待させる
- `quiz` … `trivia` とほぼ同義で枠を1つ損する
- `html5` … itch.io では埋め込みゲームに自動で付く。外部リンク型では嘘になる
- `pixel-art` … 絵はベクタでピクセルアートではない

---

## 4. 掲載用スクリーンショット(6枚・撮影済み)

**本番URLから撮った**(開発サーバではない)。`docs/screenshots/itchio/` に置いてある。

| ファイル | 何が写っているか | 狙い |
|---|---|---|
| `01-pc-choose.png` | 世界地図から大陸を選ぶ画面。「地球をまわる」「太陽系」も見える | **1枚目に置く。**広がりが一目で伝わる |
| `02-pc-board-oceania.png` | オセアニア盤。太平洋に散る51の島と航路。目的地カードは**ファカオフォ「空港が無く、船で丸一日かけてしか行けない国」** | 盤面の見た目と、町ごとの発見を同時に見せる |
| `03-pc-city.png` | ルレナバケ(ボリビア)の町カード。金剛インコの絵、買える事業(エコロッジ/カヌーツアー)、行商人の露店 | **すごろくとしての面白さ。**買う・稼ぐがあることを示す |
| `04-pc-quiz.png` | 難易度メーター**7/10**、報酬 +Bs 140,000 / −Bs 54,000、3択 | **4段階の難易度と賭けの傾き。**選択肢が3つあることも見える |
| `05-mobile-play.png` | 会津若松(日本)の町カードを電話の画面で | **携帯でも遊べる**ことの証拠。1画面に収まっている |
| `06-mobile-levels.png` | 「How well do you know this country?」の4段階 | 説明文で推している機能の実物 |

### カバー画像(630×500)

`docs/screenshots/itchio/cover-630x500.png`(と同じ内容の `.svg`)

**盤面のスクショを縮めたものは使えない。**縮むと町の名前が潰れて、
ただ細かいだけの絵になる。専用に組んだ。

**絵は手で描いていない。**世界盤(`world.content.json`)の海岸線38片・
航路96本・都市66個をそのまま使い、色も同じ盤面の `sea` / `landBase` /
`coast` / `stripe` から読んでいる。生成器は
[`scripts/make-itchio-cover.mjs`](../scripts/make-itchio-cover.mjs)。
盤面の見た目を変えれば、走らせ直すだけで表紙も追随する。

入れた文字は**題と一言キャッチの2行だけ。**itch.io の一覧では
315×250 まで縮むので、**その大きさで焼いて目で確かめた。**両方読める。

海路が破線・陸路が実線という盤面の見分け方も、そのまま持ち込んである。

---

## 5. 埋め込み方法の推奨

### 結論: **外部リンク型を推奨する**

itch.io のプロジェクト種別を `HTML` ではなく **`Downloadable / External link`** にし、
`https://t29mato.github.io/grand-express/` へ飛ばす。

### 大きさは理由ではない

itch.io の HTML ゲームの制約と、実測した値を並べる。

| itch.io の制約 | 上限 | World Express | 判定 |
|---|---|---|---|
| 展開後のファイル数 | 1,000個 | **95個** | ◯ 余裕 |
| 展開後の合計 | 500MB | **29MB** | ◯ 余裕 |
| 単一ファイル | 200MB | **3MB** | ◯ 余裕 |
| パス長(パス込み) | 240文字 | **67文字** | ◯ 余裕 |
| `index.html` が直下にある | 必須 | あり | ◯ |
| **資産のパスが相対** | **必須** | **絶対パス `/_next/...`** | **✗** |

**引っかかるのは最後の1行だけである。**

### 何が起きるか

itch.io は `https://html-classic.itch.zone/html/<番号>/index.html` のような
**入れ子の場所**からゲームを配信する。いまの生成物は資産を

```html
<script src="/_next/static/chunks/19mx3mg6lkumu.js">
```

と**絶対パス**で参照しているので、ブラウザは `html-classic.itch.zone/_next/...`
を探しに行って**404になる。ゲームは白い画面のまま立ち上がらない。**

### 埋め込みにするなら何が要るか

1. **資産を相対パスにする。**Next.js の App Router + `output: "export"` で
   全資産を相対にする正式な方法は無い(`assetPrefix` はCDN向けの絶対URLを想定)。
2. **画面遷移も相対にする。**`/release-notes/` へ飛ぶ内部リンクが絶対パスなので、
   入れ子の下では外へ出てしまう。
3. **1と2は、GitHub Pages 用・Vercel 用のビルドと両立しない。**
   出し先ごとに3通りのビルドを持つことになる。

**得られるものは「itch.io の中で遊べる」という体験だけ**で、
**失うものはビルドの単純さと、そこから来る壊れにくさ**である。割に合わない。

### 外部リンク型で失うもの(正直に)

- **「Play in browser」の絞り込みに載らない。**itch.io でブラウザゲームを
  探している人の一覧に出てこないのは、率直に痛い
- itch.io 内の分析(プレイ数)が取れない。クリック数は取れる

### それでも外部リンクを推す理由

- **常に最新が出る。**main に push すれば GitHub Pages が自動で追随する。
  アップロードし直す手間も、版がずれる事故も無い
- **セーブがブラウザに残る。**itch.io の埋め込みは `html-classic.itch.zone`
  という別のドメインになるので、**そこで遊んだセーブは github.io 側に見えない。**
  同じゲームを2箇所で遊ぶと、続きが片方にしか無いことになる
- 携帯で遊びやすい。itch.io の埋め込みは画面の一部に押し込まれるが、
  この遊びは**縦の画面いっぱいを使う**(町カードが縦に長い)

### 将来やるなら

**盤面が増え続けるうちは外部リンクでよい。**埋め込みに移すのは、
「itch.io の一覧に載ること」が実際に効くと分かってからでよく、そのときは
上の1〜3をまとめて設計する。

---

## 6. 掲載時に埋める欄(itch.io のフォーム順)

| 欄 | 入れるもの |
|---|---|
| Title | `World Express`(衝突しても登録は通る。上の「名前の衝突について」参照) |
| Cover image | `docs/screenshots/itchio/cover-630x500.png` |
| Short description | 上の1行キャッチ(英語) |
| Classification | Games |
| Kind of project | **Downloadable**(外部リンクを貼る) |
| Release status | Released |
| Pricing | No payments(無料) |
| Uploads | 使わない。代わりに **Links** に github.io のURL |
| Description | 上の英語300語 + 日本語1行 |
| Genre | Educational |
| Tags | 上の10個 |
| App store links | なし |
| Custom noun | `game` のまま |
| Community | Comments(要望はGitHubのissueへ誘導しているので、そちらへのリンクを添えるとよい) |
| Visibility | Public(オーナー判断) |

**ソースへのリンク**も Links に足すとよい: `https://github.com/t29mato/grand-express`
