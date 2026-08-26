# 10-06. 依存関係グラフ(自動生成)

> **このファイルは自動生成される。** 手で編集しても次の生成で上書きされる。
> 更新するには `npm run graph` を実行すること。
> CI では `npm run graph:check` が生成結果とこのファイルを突き合わせ、
> 構造を変えたのに図を更新していない場合に失敗する。

[10-05 クラス図](./05-class-diagram.md) が**手書きで意図を伝える図**なのに対し、
こちらは **dependency-cruiser が実際の `import` をたどって描いた図**である。
実装と必ず一致するので、「本当は今どうなっているか」を知りたいときはこちらを見る。

生成コマンド(テストと外部パッケージは構造の関心事ではないので除外している):

```bash
npm run graph
```

## 1. 層の依存(パッケージ図)

Clean Architecture の要である**依存の向き**がひと目で分かる粒度。
矢印はすべて外側から内側(Presentation → Application → Domain)を向いており、
内側から外側への矢印が無いことが重要。

```mermaid
flowchart LR

subgraph 0["src"]
subgraph 1["app"]
2[" "]
end
subgraph 3["application"]
4[" "]
end
subgraph 5["domain"]
6[" "]
end
subgraph 7["i18n"]
8[" "]
end
subgraph 9["infrastructure"]
A[" "]
end
subgraph B["presentation"]
C[" "]
end
end
2-->C
4-->6
A-->4
A-->6
C-->A
C-->6
C-->8
C-->4
```

- `infrastructure` から `application` への矢印は、**ポート(インターフェース)を実装
  している**ことを表す。依存性逆転が効いているので、`application` から
  `infrastructure` への矢印は無い。
- `presentation` が `infrastructure` を指しているのは、起動時にアダプタを
  生成して注入しているため(`game-store-dependencies.ts`)。

## 2. パッケージ単位の依存

層の中をもう1段掘り下げた図。どのユースケースがどのサブドメインを使っているか、
といった粒度で読める。辺の数が多いので、全体の傾向を見る用途に使う。

```mermaid
flowchart LR

subgraph 0["src"]
subgraph 1["app"]
subgraph 2["feedback"]
3[" "]
end
4["globals.css"]
5["layout.tsx"]
6["manifest.ts"]
7["page.tsx"]
subgraph 8["release-notes"]
9[" "]
end
end
subgraph A["application"]
subgraph B["dto"]
C[" "]
end
D["economy-context.ts"]
E["game-engine-context.ts"]
subgraph F["ports"]
G[" "]
end
subgraph H["use-cases"]
I[" "]
end
end
subgraph J["domain"]
subgraph K["board"]
L[" "]
end
subgraph M["country"]
N[" "]
end
subgraph O["cpu"]
P[" "]
end
subgraph Q["game-session"]
R[" "]
end
subgraph S["item"]
T[" "]
end
subgraph U["misfortune"]
V[" "]
end
subgraph W["player"]
X[" "]
end
subgraph Y["property"]
Z[" "]
end
subgraph 10["quiz"]
11[" "]
end
subgraph 12["season"]
13[" "]
end
subgraph 14["shared-kernel"]
15[" "]
end
end
subgraph 16["i18n"]
subgraph 17["messages"]
18[" "]
end
end
subgraph 19["infrastructure"]
subgraph 1A["audio"]
1B[" "]
end
subgraph 1C["content"]
1D[" "]
end
subgraph 1E["persistence"]
1F[" "]
end
subgraph 1G["random"]
1H[" "]
end
end
subgraph 1I["presentation"]
subgraph 1J["components"]
1K[" "]
end
subgraph 1L["hooks"]
1M[" "]
end
subgraph 1N["i18n"]
1O[" "]
end
subgraph 1P["release-notes"]
1Q[" "]
end
subgraph 1R["state"]
1S[" "]
end
end
end
3-->1K
5-->1K
5-->4
7-->1K
9-->1K
C-->P
C-->R
C-->V
C-->X
C-->11
C-->15
D-->R
D-->Z
D-->E
E-->L
E-->N
E-->15
G-->C
G-->N
G-->15
I-->R
I-->T
I-->X
I-->11
I-->15
I-->E
I-->V
I-->Z
I-->D
I-->C
I-->G
I-->P
I-->L
I-->13
L-->15
N-->L
N-->T
N-->V
N-->11
N-->13
N-->15
P-->L
P-->X
P-->Z
P-->15
P-->T
R-->V
R-->X
R-->11
R-->15
T-->15
T-->X
T-->R
V-->X
V-->15
X-->P
X-->11
X-->15
Z-->L
Z-->X
Z-->15
11-->15
13-->15
13-->X
1B-->G
1B-->1D
1D-->G
1D-->N
1D-->15
1D-->L
1D-->T
1D-->11
1D-->13
1D-->V
1F-->C
1F-->G
1H-->15
1K-->1D
1K-->1O
1K-->15
1K-->1Q
1K-->1S
1K-->R
1K-->E
1K-->L
1K-->1M
1K-->N
1K-->11
1K-->V
1K-->D
1K-->T
1K-->Z
1K-->I
1K-->X
1K-->13
1K-->P
1K-->1F
1M-->E
1M-->L
1M-->15
1M-->1K
1M-->1S
1O-->15
1O-->18
1O-->N
1Q-->15
1S-->E
1S-->I
1S-->L
1S-->R
1S-->15
1S-->1O
1S-->1B
1S-->1D
1S-->1F
1S-->1H
1S-->N
1S-->V
1S-->11
1S-->P
1S-->13
1S-->X
```

## 3. ドメインのサブドメイン間の依存

DDD 上の関心事。`game-session` が他のサブドメインを束ねる集約であること、
`shared-kernel` が全体から参照されていることが読み取れる。

```mermaid
flowchart LR

subgraph 0["src"]
subgraph 1["domain"]
subgraph 2["board"]
3[" "]
end
subgraph 4["country"]
5[" "]
end
subgraph 6["cpu"]
7[" "]
end
subgraph 8["game-session"]
9[" "]
end
subgraph A["item"]
B[" "]
end
subgraph C["misfortune"]
D[" "]
end
subgraph E["player"]
F[" "]
end
subgraph G["property"]
H[" "]
end
subgraph I["quiz"]
J[" "]
end
subgraph K["season"]
L[" "]
end
subgraph M["shared-kernel"]
N[" "]
end
end
end
3-->N
5-->3
5-->B
5-->D
5-->J
5-->L
5-->N
7-->3
7-->F
7-->H
7-->N
7-->B
9-->F
9-->N
9-->D
9-->J
B-->N
B-->F
B-->9
D-->F
D-->N
F-->7
F-->J
F-->N
H-->3
H-->F
H-->N
J-->N
L-->N
L-->F
```

> フォルダ単位で双方向の矢印が出ることがある(例: `cpu` と `player`)。これは
> 「`cpu` の戦略が `Player` を読み、`Player` が `CpuLevel` 型を参照している」
> というように**別々のファイル同士**が参照し合っている状態で、モジュール単位の
> 循環参照ではない。モジュールの循環は `.dependency-cruiser.cjs` の
> `no-circular` ルールで禁止しており、CI で常に検証している。

## この図で保証されること・されないこと

| | |
|---|---|
| 保証される | ここに描かれた矢印は、実際に存在する `import` である |
| 保証される | 層をまたぐ依存の向き(`no-*-to-*` ルール)は CI で検証されている |
| 保証されない | クラス同士の関連(所有・集約・継承)。それは [10-05](./05-class-diagram.md) の手書き図が担う |
