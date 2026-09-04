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
C-->6
C-->8
C-->A
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
subgraph 2["atlas"]
3[" "]
end
subgraph 4["feedback"]
5[" "]
end
6["globals.css"]
7["layout.tsx"]
8["manifest.ts"]
9["page.tsx"]
subgraph A["release-notes"]
B[" "]
end
subgraph C["styles"]
D[" "]
end
end
subgraph E["application"]
subgraph F["dto"]
G[" "]
end
H["economy-context.ts"]
I["game-engine-context.ts"]
subgraph J["ports"]
K[" "]
end
subgraph L["use-cases"]
M[" "]
end
end
subgraph N["domain"]
subgraph O["board"]
P[" "]
end
subgraph Q["country"]
R[" "]
end
subgraph S["cpu"]
T[" "]
end
subgraph U["game-session"]
V[" "]
end
subgraph W["item"]
X[" "]
end
subgraph Y["misfortune"]
Z[" "]
end
subgraph 10["player"]
11[" "]
end
subgraph 12["property"]
13[" "]
end
subgraph 14["quiz"]
15[" "]
end
subgraph 16["season"]
17[" "]
end
subgraph 18["shared-kernel"]
19[" "]
end
end
subgraph 1A["i18n"]
subgraph 1B["messages"]
1C[" "]
end
end
subgraph 1D["infrastructure"]
subgraph 1E["audio"]
1F[" "]
end
subgraph 1G["content"]
1H[" "]
end
subgraph 1I["persistence"]
1J[" "]
end
subgraph 1K["random"]
1L[" "]
end
end
subgraph 1M["presentation"]
subgraph 1N["atlas"]
1O[" "]
end
subgraph 1P["components"]
1Q[" "]
end
subgraph 1R["hooks"]
1S[" "]
end
subgraph 1T["i18n"]
1U[" "]
end
subgraph 1V["release-notes"]
1W[" "]
end
subgraph 1X["state"]
1Y[" "]
end
end
end
3-->1Q
3-->D
5-->1Q
7-->1Q
7-->6
9-->1Q
B-->1Q
G-->T
G-->V
G-->Z
G-->11
G-->15
G-->19
H-->V
H-->13
H-->I
I-->P
I-->R
I-->19
K-->R
K-->19
K-->G
M-->V
M-->X
M-->11
M-->15
M-->19
M-->I
M-->Z
M-->13
M-->H
M-->G
M-->K
M-->T
M-->P
M-->17
P-->19
R-->P
R-->X
R-->Z
R-->15
R-->17
R-->19
T-->P
T-->11
T-->13
T-->19
T-->X
V-->Z
V-->11
V-->15
V-->19
X-->19
X-->11
X-->V
Z-->11
Z-->19
Z-->15
11-->T
11-->15
11-->19
13-->P
13-->11
13-->19
15-->19
17-->19
17-->11
1F-->K
1F-->1H
1H-->K
1H-->R
1H-->19
1H-->P
1H-->X
1H-->15
1H-->17
1H-->Z
1J-->G
1J-->K
1L-->19
1O-->P
1O-->R
1O-->19
1O-->1H
1Q-->19
1Q-->1U
1Q-->1O
1Q-->1Y
1Q-->1H
1Q-->1W
1Q-->V
1Q-->I
1Q-->P
1Q-->1S
1Q-->R
1Q-->15
1Q-->Z
1Q-->H
1Q-->X
1Q-->13
1Q-->M
1Q-->11
1Q-->17
1Q-->T
1Q-->1J
1S-->I
1S-->P
1S-->19
1S-->1Q
1S-->1Y
1U-->19
1U-->1C
1U-->R
1W-->19
1Y-->I
1Y-->M
1Y-->P
1Y-->V
1Y-->19
1Y-->1U
1Y-->1F
1Y-->1H
1Y-->1J
1Y-->1L
1Y-->R
1Y-->Z
1Y-->15
1Y-->T
1Y-->17
1Y-->H
1Y-->11
1Y-->13
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
D-->J
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
