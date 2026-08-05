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
C-->4
C-->A
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
2["globals.css"]
3["layout.tsx"]
4["page.tsx"]
end
subgraph 5["application"]
subgraph 6["dto"]
7[" "]
end
8["economy-context.ts"]
9["game-engine-context.ts"]
subgraph A["ports"]
B[" "]
end
subgraph C["use-cases"]
D[" "]
end
end
subgraph E["domain"]
subgraph F["board"]
G[" "]
end
subgraph H["country"]
I[" "]
end
subgraph J["cpu"]
K[" "]
end
subgraph L["game-session"]
M[" "]
end
subgraph N["item"]
O[" "]
end
subgraph P["misfortune"]
Q[" "]
end
subgraph R["player"]
S[" "]
end
subgraph T["property"]
U[" "]
end
subgraph V["quiz"]
W[" "]
end
subgraph X["season"]
Y[" "]
end
subgraph Z["shared-kernel"]
10[" "]
end
end
subgraph 11["i18n"]
subgraph 12["messages"]
13[" "]
end
end
subgraph 14["infrastructure"]
subgraph 15["audio"]
16[" "]
end
subgraph 17["content"]
18[" "]
end
subgraph 19["persistence"]
1A[" "]
end
subgraph 1B["random"]
1C[" "]
end
end
subgraph 1D["presentation"]
subgraph 1E["components"]
1F[" "]
end
subgraph 1G["hooks"]
1H[" "]
end
subgraph 1I["i18n"]
1J[" "]
end
subgraph 1K["state"]
1L[" "]
end
end
end
3-->2
4-->1F
7-->K
7-->M
7-->Q
7-->S
7-->W
7-->10
8-->M
8-->U
8-->9
9-->G
9-->I
9-->10
B-->7
B-->I
B-->10
D-->M
D-->O
D-->S
D-->W
D-->10
D-->9
D-->Q
D-->U
D-->8
D-->7
D-->B
D-->K
D-->G
D-->Y
G-->10
G-->W
I-->G
I-->O
I-->Q
I-->W
I-->Y
I-->10
K-->G
K-->S
K-->U
K-->10
K-->O
M-->Q
M-->S
M-->W
M-->10
O-->10
O-->S
Q-->S
Q-->10
S-->K
S-->W
S-->10
U-->G
U-->S
U-->10
W-->10
Y-->10
Y-->S
16-->B
16-->18
18-->B
18-->I
18-->10
18-->G
18-->O
18-->W
18-->Y
18-->Q
1A-->7
1A-->B
1C-->10
1F-->1J
1F-->1L
1F-->M
1F-->10
1F-->9
1F-->G
1F-->1H
1F-->I
1F-->W
1F-->8
1F-->U
1F-->D
1F-->S
1F-->Y
1F-->K
1F-->18
1H-->9
1H-->G
1H-->10
1H-->1F
1J-->10
1J-->13
1J-->I
1L-->9
1L-->D
1L-->M
1L-->10
1L-->1J
1L-->16
1L-->18
1L-->1A
1L-->1C
1L-->I
1L-->W
1L-->K
1L-->Y
1L-->G
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
3-->J
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
9-->N
9-->F
9-->D
9-->J
B-->N
B-->F
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
