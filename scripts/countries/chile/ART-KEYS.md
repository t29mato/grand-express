# チリ盤面の絵の鍵(mark / bg)

46都市、`mark` 46種(都市ごとに1種)・`bg` 24種(土地の性格が同じ町でまとめた)。
**記号46+背景24=70枚**(取りまとめ側の上限70枚ちょうど)。`mark` が46都市すべて
別なので、背景を共有していても**同じ絵になる都市は0組**。

測定(2026-08-21時点):

```
node --input-type=module -e '
import { CHILE_CITIES } from "./scripts/countries/chile/cities.mjs";
const cs = Object.values(CHILE_CITIES);
const mk = new Set(cs.map(c=>c.mark)).size, bg = new Set(cs.map(c=>c.bg)).size;
const combo = new Set(cs.map(c=>c.mark+"|"+c.bg)).size;
console.log("都市",cs.length,"/ 記号",mk,"/ 背景",bg,"→ 計",mk+bg,"枚 /",
            "同じ絵になる都市",cs.length-combo,"組");
'
# 都市 46 / 記号 46 / 背景 24 → 計 70 枚 / 同じ絵になる都市 0 組
```

**背景の統合は「土地の性格が本当に同じ町」だけをまとめてある。**例えば
ラ・セレナとコキンボは双子都市で同じ湾を挟んで向き合い、テムコとアンゴルは
どちらも「アラウカニア平定」の前線の砦として建てられた町。違いは記号
(具体的な建物・出来事)で語る。

## `mark`(盤面・都市カードのシンボル。46種、都市ごとに1種)

| 地方 | 都市 | `mark` | 描くものの案 |
|---|---|---|---|
| ng | アントファガスタ | `nitraterail` | 硝石鉄道の桟橋とクレーン |
| ng | ウンベルストネ | `ghosttheater` | 砂に埋もれかけた木造劇場の入口 |
| ng | アリカ | `morroguns` | モロの断崖の要塞跡と古い大砲 |
| ng | イキケ | `santamariaflag` | サンタ・マリア学校跡の外観 |
| ng | マリア・エレナ | `lastoficina` | いまも煙を上げる工場の煙突と碁盤目の社宅 |
| ng | カラマ | `coppertrain` | 銅精鉱を積んだ貨車 |
| ng | チュキカマタ | `abandonedpit` | 無人の町と巨大な採掘穴の縁 |
| ng | コピアポ | `minerescue` | 救出用の細い縦坑とやぐら |
| ng | カルデラ | `firstrail` | 1851年開業の終着駅舎 |
| ng | チャニャラル | `tailingsbay` | 灰色の鉱滓で埋まった浜辺 |
| nc | ラ・セレナ | `colonialdome` | ネオコロニアル様式のドームとアーケード |
| nc | コキンボ | `millenniumcross` | 湾を見下ろす巨大な十字架 |
| nc | ビクーニャ | `mistralhouse` | 日干しレンガのミストラル生家 |
| nc | オバジェ | `limarivineyard` | 貯水池とブドウ畑 |
| nc | イジャペル | `narrowestpoint` | 山と海に挟まれた細い道(国の細さの象徴) |
| ce | サンティアゴ | `centralstation` | エスタシオン・セントラルの駅舎 |
| ce | バルパライソ | `funicular` | 丘を登るケーブルカー(アセンソール) |
| ce | ビニャ・デル・マル | `flowerclock` | 花時計 |
| ce | ランカグア | `tenienteshaft` | エル・テニエンテの坑口 |
| ce | セウェル | `stairtown` | 色分けされた家々と屋根つき階段 |
| ce | サン・アントニオ | `containercranes` | コンテナクレーン |
| ce | サンタ・クルス | `wineharvest` | ブドウ収穫の樽と籠 |
| ce | クリコ | `plazapalms` | 広場の巨木とベンチ |
| ce | コンセプシオン | `quaketower` | 崩れかけた建物と復興の足場 |
| ce | ロタ | `underseamine` | 海へ向かう坑口とやぐら |
| ce | タルカワノ | `navalbase` | 陸に打ち上げられた錆びた船と軍艦 |
| ce | チジャン | `ohigginsstatue` | オイギンスの騎馬像 |
| su | プエルト・モント | `bufferstop` | 線路の終端を示す車止め |
| su | テムコ | `railfrontier` | 砦と線路の起点 |
| su | ビジャリカ | `volcanoglow` | 夜に赤く光る火山の山頂 |
| su | バルディビア | `riverfort` | 川沿いの砦とビール醸造所の樽 |
| su | オソルノ | `dairybarn` | ドイツ風木組みの酪農小屋 |
| su | プエルト・バラス | `roseporch` | バラの咲く湖畔の家のベランダ |
| su | フルティジャル | `musicshell` | 湖畔の演奏会場の貝殻状の屋根 |
| su | アンクー | `wolfcastle` | 古いスペインの砦跡 |
| su | カストロ | `stilthouses` | 極彩色の高床式住居(パラフィト) |
| su | アンゴル | `araucariapark` | 棘のあるアラウカリアの木 |
| au | コジャイケ | `roadsend` | カレテラ・アウストラルの起点標識 |
| au | プエルト・アイセン | `riverport` | 土砂で埋まった旧桟橋の跡 |
| au | チレ・チコ | `marblecaves` | 大理石の洞窟の入口 |
| au | コクラン | `gauchopost` | 馬に乗った牧夫と中継小屋 |
| au | プエルト・ナタレス | `milodonbones` | 洞窟とミロドンの骨 |
| au | プンタ・アレナス | `woolwarehouse` | 羊毛を積んだ倉庫 |
| au | ポルベニル | `goldpan` | 砂金採りの皿 |
| au | ビジャ・オイギンス | `roadend` | 道の終わりを示す標識と氷原 |
| au | プエルト・ウィリアムズ | `southernmosttown` | 世界最南端を示す標識と灯台 |

## `bg`(都市イラストの背景。24種)

| `bg` | 都市 | 描くものの案 |
|---|---|---|
| `desertport` | アントファガスタ・アリカ・イキケ | 砂漠の丘を背にした港。クレーンと乾いた低い建物 |
| `saltpeterghost` | ウンベルストネ | 無人の硝石オフィシナ。錆びた製錬設備と崩れかけた社宅 |
| `livingoficina` | マリア・エレナ | いまも人が住む碁盤目の社宅と稼働する煙突 |
| `openpitcopper` | カラマ・チュキカマタ | 露天掘り銅山の縁に沿う町並み |
| `miningcolonial` | コピアポ・カルデラ | 19世紀の鉱業と鉄道でできた砂漠の港町。碁盤目の街路 |
| `coastalpollution` | チャニャラル | 鉱滓の灰色の浜が埋め立てた湾 |
| `astronomyvalley` | ラ・セレナ・コキンボ | 双子の港町。澄んだ夜空とネオコロニアル様式の建物 |
| `elquivalley` | ビクーニャ・オバジェ・イジャペル | 灌漑されたブドウ・果樹の渓谷 |
| `andessmog` | サンティアゴ | 盆地の首都。スモッグ越しに見えるアンデスの稜線 |
| `hillport` | バルパライソ・ビニャ・デル・マル | 丘の港と保養地。色とりどりの家並み |
| `miningandes` | ランカグア・セウェル | アンデス山中の鉱山町 |
| `portindustrial` | サン・アントニオ | 現代のコンテナ港 |
| `winevalley` | サンタ・クルス・クリコ | 中央谷のワイン産地。ブドウ畑と広場 |
| `quakerebuilt` | コンセプシオン・タルカワノ・チジャン | 地震で幾度も建て直された町。新旧が混じる街並み |
| `coalcoast` | ロタ | 海に張り出す石炭の町 |
| `lakegateway` | プエルト・モント | 鉄道が終わる湖と海の玄関口。レンガと木羽根の家並み |
| `araucaniaplain` | テムコ・アンゴル | アラウカニアの平原に建つ砦の町 |
| `volcanolake` | ビジャリカ | 火山を望む湖畔の町 |
| `germanlakedistrict` | バルディビア・オソルノ・プエルト・バラス・フルティジャル | ドイツ系移民の湖水地方。急勾配の屋根の家並み |
| `chiloebg` | アンクー・カストロ | チロエ島の木造家屋と教会 |
| `patagoniasteppe` | コジャイケ・プエルト・アイセン・チレ・チコ・コクラン | パタゴニアのステップ。道が途切れる開拓地 |
| `glacierpark` | プエルト・ナタレス・ビジャ・オイギンス | 氷河と国立公園の玄関口 |
| `magallanesstrait` | プンタ・アレナス・ポルベニル | マガジャネス海峡沿いの町 |
| `southernmost` | プエルト・ウィリアムズ | 世界最南の集落。海峡と灯台 |

## 島の描き方について

`geography.mjs` の `CHILE_LAND` は本土(`MAINLAND`)・チロエ島(`CHILOE`)・
ナバリノ島(`NAVARINO`)の3ポリゴン。ナバリノ島は都市がプエルト・ウィリアムズ
1つだけなので、手で輪郭を引かず**その都市の座標を中心にした楕円**にしてある
(オセアニア盤と同じ手法)。絵を描く際もこの1都市1島の関係を崩さないこと。
