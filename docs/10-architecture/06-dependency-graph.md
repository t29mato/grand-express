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
subgraph 2["api"]
3[" "]
end
subgraph 4["feedback"]
5[" "]
end
6["globals.css"]
7["layout.tsx"]
8["page.tsx"]
subgraph 9["release-notes"]
A[" "]
end
end
subgraph B["application"]
subgraph C["dto"]
D[" "]
end
E["economy-context.ts"]
F["game-engine-context.ts"]
subgraph G["ports"]
H[" "]
end
subgraph I["use-cases"]
J[" "]
end
end
subgraph K["domain"]
subgraph L["board"]
M[" "]
end
subgraph N["country"]
O[" "]
end
subgraph P["cpu"]
Q[" "]
end
subgraph R["game-session"]
S[" "]
end
subgraph T["item"]
U[" "]
end
subgraph V["misfortune"]
W[" "]
end
subgraph X["player"]
Y[" "]
end
subgraph Z["property"]
10[" "]
end
subgraph 11["quiz"]
12[" "]
end
subgraph 13["season"]
14[" "]
end
subgraph 15["shared-kernel"]
16[" "]
end
end
subgraph 17["i18n"]
subgraph 18["messages"]
19[" "]
end
end
subgraph 1A["infrastructure"]
subgraph 1B["audio"]
1C[" "]
end
subgraph 1D["content"]
1E[" "]
end
subgraph 1F["persistence"]
1G[" "]
end
subgraph 1H["random"]
1I[" "]
end
end
subgraph 1J["presentation"]
subgraph 1K["components"]
1L[" "]
end
subgraph 1M["hooks"]
1N[" "]
end
subgraph 1O["i18n"]
1P[" "]
end
subgraph 1Q["release-notes"]
1R[" "]
end
subgraph 1S["state"]
1T[" "]
end
end
end
5-->1L
7-->1L
7-->6
8-->1L
A-->1L
D-->Q
D-->S
D-->W
D-->Y
D-->12
D-->16
E-->S
E-->10
E-->F
F-->M
F-->O
F-->16
H-->D
H-->O
H-->16
J-->S
J-->U
J-->Y
J-->12
J-->16
J-->F
J-->W
J-->10
J-->E
J-->D
J-->H
J-->Q
J-->M
J-->14
M-->16
O-->M
O-->U
O-->W
O-->12
O-->14
O-->16
Q-->M
Q-->Y
Q-->10
Q-->16
Q-->U
S-->W
S-->Y
S-->12
S-->16
U-->16
U-->Y
U-->S
W-->Y
W-->16
Y-->Q
Y-->12
Y-->16
10-->M
10-->Y
10-->16
12-->16
14-->16
14-->Y
1C-->H
1C-->1E
1E-->H
1E-->O
1E-->16
1E-->M
1E-->U
1E-->12
1E-->14
1E-->W
1G-->D
1G-->H
1I-->16
1L-->1E
1L-->1P
1L-->16
1L-->1R
1L-->1T
1L-->S
1L-->F
1L-->M
1L-->1N
1L-->O
1L-->12
1L-->W
1L-->E
1L-->U
1L-->10
1L-->J
1L-->Y
1L-->14
1L-->Q
1L-->1G
1N-->F
1N-->M
1N-->16
1N-->1L
1N-->1T
1P-->16
1P-->19
1P-->O
1R-->16
1T-->F
1T-->J
1T-->M
1T-->S
1T-->16
1T-->1P
1T-->1C
1T-->1E
1T-->1G
1T-->1I
1T-->O
1T-->W
1T-->12
1T-->Q
1T-->14
1T-->Y
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
