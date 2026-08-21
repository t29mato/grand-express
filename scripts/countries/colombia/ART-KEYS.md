# コロンビア盤面の絵の鍵(mark / bg)

46都市、`mark` 46種(都市ごとに1種)・`bg` 24種(土地の性格が同じ町でまとめた)。
**記号46+背景24=70枚**(取りまとめ側の上限70枚ちょうど)。`mark` が46都市すべて
別なので、背景を共有していても**同じ絵になる都市は0組**。

測定(2026-08-21時点):

```
node --input-type=module -e '
import { COLOMBIA_CITIES } from "./scripts/countries/colombia/cities.mjs";
const cs = Object.values(COLOMBIA_CITIES);
const mk = new Set(cs.map(c=>c.mark)).size, bg = new Set(cs.map(c=>c.bg)).size;
const combo = new Set(cs.map(c=>c.mark+"|"+c.bg)).size;
console.log("都市",cs.length,"/ 記号",mk,"/ 背景",bg,"→ 計",mk+bg,"枚 /",
            "同じ絵になる都市",cs.length-combo,"組");
'
# 都市 46 / 記号 46 / 背景 24 → 計 70 枚 / 同じ絵になる都市 0 組
```

背景の統合は「土地の性格が本当に同じ町」だけをまとめてある(例:
アンデス3山系の緑濃いコーヒー地帯にあるマニサレス・ペレイラ・アルメニア・
サレントは同じ `coffeeridge` を共有し、違いは記号(索道/再建の町/竹の
足場/ジープ)で語る)。トゥンハ・ビジャデレイバ・ポパヤンは当初それぞれ
別背景にしていたが、70枚の上限に収めるため`andeancolonial`に統合した
(3都市とも植民地時代の広場を持つアンデス高地の町という点で共通する)。

## `mark`(盤面・都市カードのシンボル。46種、都市ごとに1種)

| 地方 | 都市 | `mark` | 描くものの案 |
|---|---|---|---|
| and | オンダ | `rapidsdock` | 川の急流と、石造りの倉庫・桟橋 |
| and | ボゴタ | `cordillerabasin` | 山に囲まれた高原に浮かぶ水上機 |
| and | メデジン | `metrocable` | 斜面をのぼるケーブルカーのゴンドラ |
| and | カリ | `railtoport` | 線路とサトウキビ畑 |
| and | マニサレス | `aerialcable` | コーヒー袋を運ぶ索道のゴンドラ |
| and | ペレイラ | `refoundedcity` | 古い基礎の上に建つ新しい町並み |
| and | アルメニア | `bamboorebuild` | グアドゥア竹の足場に囲まれた建て直し中の家 |
| and | ブカラマンガ | `deepquakenest` | 崖際の町と地震計の針 |
| and | トゥンハ | `paintedceiling` | 彩色された植民地時代の天井文様 |
| and | ポパヤン | `whitecityquake` | 白壁の建物とひび、聖週間のろうそく |
| and | イバゲ | `mountaintunnel` | 霧の山道とトンネルの坑口 |
| and | ネイバ | `desertbadlands` | 赤茶けた浸食地形と望遠鏡 |
| and | ジラルドット | `riverresort` | 川辺のプールと水上機の影 |
| and | シパキラ | `saltcathedral` | 岩塩の壁に彫られた十字架 |
| and | ビジャ・デ・レイバ | `fossilplaza` | 石畳の広場と首長竜の骨格の輪郭 |
| and | サレント | `willysjeep` | 荷を山積みにしたウィリス・ジープ |
| and | バランカベルメハ | `oilrefinery` | 製油所の塔と川の艀 |
| car | プエルト・コロンビア | `longpier` | 海へ長く延びる桟橋と線路 |
| car | バランキージャ | `goldengate` | 川口を絞る2本の突堤と行き交う船 |
| car | カルタヘナ | `stonefort` | 大砲を備えた石造りの要塞壁 |
| car | サンタ・マルタ | `snowcoast` | 浜のすぐ後ろにそびえる雪山 |
| car | リオアチャ | `pearldive` | 真珠採りの潜水と貝殻、帆船 |
| car | バジェドゥパル | `accordion` | アコーディオンと太鼓(カハ) |
| car | モンテリア | `zenucanals` | 氾濫原に広がる盛り土の運河(俯瞰) |
| car | シンセレホ | `floodstilts` | 増水した水面に立つ高床の家 |
| car | モンポス | `strandedriver` | 川辺の壮麗な邸宅と、痩せて狭くなった水路 |
| car | マガンゲ | `vehicleferry` | 川を渡る平らな車両渡し船(プランチョン) |
| car | シエナガ | `bananarail` | バナナの房を積む小さな鉄道 |
| car | アラカタカ | `macondohouse` | 質素な家と小さな庭 |
| car | カボ・デ・ラ・ベラ | `windturbine` | 砂丘に立つ風力タービン |
| pac | キブド | `rainforestriver` | 熱帯林を貫く川と激しい雨 |
| pac | ブエナベントゥーラ | `containerport` | 雨に濡れるコンテナクレーン |
| pac | トゥマコ | `islandbridge` | 島へ架かる短い橋 |
| pac | ヌキ | `whalewatch` | 沖で跳ねるザトウクジラ |
| pac | イスミナ | `platinumdredge` | 川での金・白金の選鉱皿 |
| lla | ビジャビセンシオ | `unfinishedrail` | 草原で唐突に途切れる鉄道の盛土 |
| lla | ヨパル | `oilboomtown` | 石油やぐらと新しい高層アパート |
| lla | プエルト・カレーニョ | `orinococonfluence` | 2本の川が合流する地点と小さな港 |
| lla | ラ・マカレナ | `rainbowriver` | 五色に染まる川底 |
| lla | アラウカ | `borderoilfield` | 国境の川辺の石油ポンプ |
| ama | サン・ビセンテ・デル・カグアン | `emptyzone` | 誰もいない交渉用の会場とテーブル |
| ama | レティシア | `triborderport` | 3か国の旗が並ぶ川の船着き場 |
| ama | モコア | `mudslidewarning` | 川沿いの峡谷にある警報柱 |
| ama | フロレンシア | `deforestfrontier` | 緑の森と牧草地の境界線 |
| ama | サン・ホセ・デル・グアビアレ | `rockartcliff` | 砂岩の崖に描かれた赤オーカーの動物絵 |
| ama | プエルト・イニリダ | `graniteinselberg` | 熱帯林からそびえる花崗岩のドームと白い花 |

## `bg`(都市イラストの背景。24種、まとめた理由つき)

| `bg` | 都市(mark で描き分ける) | まとめた理由 |
|---|---|---|
| `riverport` | オンダ / バランカベルメハ / マガンゲ | マグダレナ川沿いの川港の町 |
| `capitalcity` | ボゴタ | 山に囲まれた高原の首都(単独) |
| `andeanmetropolis` | メデジン | 急峻な谷の大都市(単独) |
| `caucavalley` | カリ | カウカ渓谷の平坦な農地(単独) |
| `coffeeridge` | マニサレス / ペレイラ / アルメニア / サレント | 緑濃いコーヒー地帯の丘の町 |
| `canyonledge` | ブカラマンガ | 崖際の町(単独) |
| `andeancolonial` | トゥンハ / ビジャ・デ・レイバ / ポパヤン | 植民地時代の広場を持つアンデス高地の町 |
| `cordillerapass` | イバゲ | 霧の山道の麓の町(単独) |
| `dryvalley` | ネイバ | 乾いた浸食地形(単独) |
| `hotlowlandtown` | ジラルドット | 首都より低く暖かい行楽地(単独) |
| `saltmountain` | シパキラ | 岩塩の山(単独) |
| `rivermouthport` | バランキージャ | 川口の港(単独) |
| `walledcity` | カルタヘナ | 石造りの城壁都市(単独) |
| `coastalsierra` | サンタ・マルタ | 雪山を背にした海岸(単独) |
| `desertcoast` | リオアチャ / カボ・デ・ラ・ベラ | 乾いたグアヒラ半島の海岸 |
| `caribbeanplain` | バジェドゥパル / モンテリア / シンセレホ | カリブ海岸に近い平坦な牧畜地帯 |
| `caribbeancoast` | プエルト・コロンビア / シエナガ / アラカタカ | カリブ海岸の低地の町 |
| `rivercolonial` | モンポス | 取り残された川辺の植民地建築(単独) |
| `pacificrainforest` | キブド / ブエナベントゥーラ / ヌキ / イスミナ | 多雨の太平洋岸熱帯林の川・港町 |
| `pacificisland` | トゥマコ | 橋で結ばれた島の町(単独) |
| `llanosgrassland` | ビジャビセンシオ / ヨパル / ラ・マカレナ | 開けたリャノスの草原 |
| `llanosriverbank` | プエルト・カレーニョ / アラウカ | 国境の川沿いの町 |
| `amazonpiedmont` | サン・ビセンテ・デル・カグアン / モコア / フロレンシア / サン・ホセ・デル・グアビアレ | アンデス・アマゾン移行地帯の森 |
| `amazonriver` | レティシア / プエルト・イニリダ | 奥地の熱帯林を流れる川の町 |

## 絵担当への申し送り

- `mark`/`bg` は**凍結済み**(この一覧が最終版。以後 cities.mjs を変更しない)。
  描き始める前に、この表と `cities.mjs` の実際の値を突き合わせて、ずれが
  無いことを確認してください。
- 新しい絵の追加提案はない。**背景を共有する都市どうしも、記号(`mark`)の
  違いで画面上は別の絵になる**設計。
- アラカタカの `macondohouse` は、ガブリエル・ガルシア=マルケスの生家跡の
  博物館を指す。小説『百年の孤独』の具体的な場面(黄色い蝶など)を絵に
  持ち込まないこと(伝説・創作を事実の絵として描かない、の原則に合わせ、
  実在する家屋そのものを描く)。
- 背景の密度目安(1枚あたりの要素数)や、都市シンボルが隠す帯(横151〜249・
  縦54〜152は見えない)については `docs/50-authoring/01-content-guide.md` と
  過去の教訓メモを参照。
