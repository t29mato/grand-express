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
subgraph 5["release-notes"]
6[" "]
end
end
subgraph 7["application"]
subgraph 8["dto"]
9[" "]
end
A["economy-context.ts"]
B["game-engine-context.ts"]
subgraph C["ports"]
D[" "]
end
subgraph E["use-cases"]
F[" "]
end
end
subgraph G["domain"]
subgraph H["board"]
I[" "]
end
subgraph J["country"]
K[" "]
end
subgraph L["cpu"]
M[" "]
end
subgraph N["game-session"]
O[" "]
end
subgraph P["item"]
Q[" "]
end
subgraph R["misfortune"]
S[" "]
end
subgraph T["player"]
U[" "]
end
subgraph V["property"]
W[" "]
end
subgraph X["quiz"]
Y[" "]
end
subgraph Z["season"]
10[" "]
end
subgraph 11["shared-kernel"]
12[" "]
end
end
subgraph 13["i18n"]
subgraph 14["messages"]
15[" "]
end
end
subgraph 16["infrastructure"]
subgraph 17["audio"]
18[" "]
end
subgraph 19["content"]
1A[" "]
end
subgraph 1B["persistence"]
1C[" "]
end
subgraph 1D["random"]
1E[" "]
end
end
subgraph 1F["presentation"]
subgraph 1G["components"]
1H[" "]
end
subgraph 1I["hooks"]
1J[" "]
end
subgraph 1K["i18n"]
1L[" "]
end
subgraph 1M["release-notes"]
1N[" "]
end
subgraph 1O["state"]
1P[" "]
end
end
end
3-->1H
3-->2
4-->1H
6-->1H
9-->M
9-->O
9-->S
9-->U
9-->Y
9-->12
A-->O
A-->W
A-->B
B-->I
B-->K
B-->12
D-->9
D-->K
D-->12
F-->O
F-->Q
F-->U
F-->Y
F-->12
F-->B
F-->S
F-->W
F-->A
F-->9
F-->D
F-->M
F-->I
F-->10
I-->12
I-->Y
K-->I
K-->Q
K-->S
K-->Y
K-->10
K-->12
M-->I
M-->U
M-->W
M-->12
M-->Q
O-->S
O-->U
O-->Y
O-->12
Q-->12
Q-->U
S-->U
S-->12
U-->M
U-->Y
U-->12
W-->I
W-->U
W-->12
Y-->12
10-->12
10-->U
18-->D
18-->1A
1A-->D
1A-->K
1A-->12
1A-->I
1A-->Q
1A-->Y
1A-->10
1A-->S
1C-->9
1C-->D
1E-->12
1H-->1L
1H-->1N
1H-->1P
1H-->O
1H-->12
1H-->B
1H-->I
1H-->1J
1H-->K
1H-->Y
1H-->A
1H-->W
1H-->F
1H-->U
1H-->10
1H-->M
1H-->1A
1J-->B
1J-->I
1J-->12
1J-->1H
1L-->12
1L-->15
1L-->K
1N-->12
1P-->B
1P-->F
1P-->O
1P-->12
1P-->1L
1P-->18
1P-->1A
1P-->1C
1P-->1E
1P-->K
1P-->Y
1P-->M
1P-->10
1P-->I
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
