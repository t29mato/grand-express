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
6["page.tsx"]
subgraph 7["release-notes"]
8[" "]
end
end
subgraph 9["application"]
subgraph A["dto"]
B[" "]
end
C["economy-context.ts"]
D["game-engine-context.ts"]
subgraph E["ports"]
F[" "]
end
subgraph G["use-cases"]
H[" "]
end
end
subgraph I["domain"]
subgraph J["board"]
K[" "]
end
subgraph L["country"]
M[" "]
end
subgraph N["cpu"]
O[" "]
end
subgraph P["game-session"]
Q[" "]
end
subgraph R["item"]
S[" "]
end
subgraph T["misfortune"]
U[" "]
end
subgraph V["player"]
W[" "]
end
subgraph X["property"]
Y[" "]
end
subgraph Z["quiz"]
10[" "]
end
subgraph 11["season"]
12[" "]
end
subgraph 13["shared-kernel"]
14[" "]
end
end
subgraph 15["i18n"]
subgraph 16["messages"]
17[" "]
end
end
subgraph 18["infrastructure"]
subgraph 19["audio"]
1A[" "]
end
subgraph 1B["content"]
1C[" "]
end
subgraph 1D["persistence"]
1E[" "]
end
subgraph 1F["random"]
1G[" "]
end
end
subgraph 1H["presentation"]
subgraph 1I["components"]
1J[" "]
end
subgraph 1K["hooks"]
1L[" "]
end
subgraph 1M["i18n"]
1N[" "]
end
subgraph 1O["release-notes"]
1P[" "]
end
subgraph 1Q["state"]
1R[" "]
end
end
end
3-->1J
5-->1J
5-->4
6-->1J
8-->1J
B-->O
B-->Q
B-->U
B-->W
B-->10
B-->14
C-->Q
C-->Y
C-->D
D-->K
D-->M
D-->14
F-->B
F-->M
F-->14
H-->Q
H-->S
H-->W
H-->10
H-->14
H-->D
H-->U
H-->Y
H-->C
H-->B
H-->F
H-->O
H-->K
H-->12
K-->14
M-->K
M-->S
M-->U
M-->10
M-->12
M-->14
O-->K
O-->W
O-->Y
O-->14
O-->S
Q-->U
Q-->W
Q-->10
Q-->14
S-->14
S-->W
S-->Q
U-->W
U-->14
W-->O
W-->10
W-->14
Y-->K
Y-->W
Y-->14
10-->14
12-->14
12-->W
1A-->F
1A-->1C
1C-->F
1C-->M
1C-->14
1C-->K
1C-->S
1C-->10
1C-->12
1C-->U
1E-->B
1E-->F
1G-->14
1J-->1C
1J-->1N
1J-->14
1J-->1P
1J-->1R
1J-->Q
1J-->D
1J-->K
1J-->1L
1J-->M
1J-->10
1J-->U
1J-->C
1J-->S
1J-->Y
1J-->H
1J-->W
1J-->12
1J-->O
1J-->1E
1L-->D
1L-->K
1L-->14
1L-->1J
1L-->1R
1N-->14
1N-->17
1N-->M
1P-->14
1R-->D
1R-->H
1R-->K
1R-->Q
1R-->14
1R-->1N
1R-->1A
1R-->1C
1R-->1E
1R-->1G
1R-->M
1R-->U
1R-->10
1R-->O
1R-->12
1R-->W
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
