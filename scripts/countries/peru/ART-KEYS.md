# ペルー盤面の絵の鍵(mark / bg)

46都市、`mark` 46種・`bg` 45種。**同じ `mark`+`bg` の組み合わせを持つ都市は0組**
(全都市が異なる組み合わせ)。`bg` は `desertport`(イロ・ピスコ)だけ2都市で
共有しているが、`mark` が別なので画面上は別の絵になる。

測定(2026-08-19時点):

```
node --input-type=module -e '
import { PERU_CITIES } from "./scripts/countries/peru/cities.mjs";
const cs = Object.values(PERU_CITIES);
const combo = new Set(cs.map((c) => c.mark + "|" + c.bg));
console.log("都市", cs.length, "/ 組み合わせ", combo.size, "→ 同じ絵になる都市", cs.length - combo.size, "組");
'
# 都市 46 / 組み合わせ 46 → 同じ絵になる都市 0 組
```

## `mark`(盤面・都市カードのシンボル。46種、都市ごとに1種)

背景シンボルの密度の目安は `docs/50-authoring/13-new-board.md` の追記
(「同じ絵になる都市は少ないほうがよい」)を参照。この盤面は都市数=mark種数
なので、絞る必要が生じたら `bg` 側から先に統合を検討すること。

| 地方 | 都市 | `mark` | 描くものの案 |
|---|---|---|---|
| si | ラ・オロヤ | `smelter` | 製錬所の煙突と、分かれる線路 |
| si | セロ・デ・パスコ | `openpit` | 町のすぐそばまで迫る露天掘りの段差 |
| si | カハマルカ | `ransomroom` | 石壁の一室、壁に残る高さの線 |
| al | プーノ | `ironship` | 湖畔に係留された小さな鉄の蒸気船 |
| se | イキトス | `rivermansion` | タイル張りの邸宅とヤシ |
| si | アレキパ | `sillarwall` | 白い石(シジャール)の壁、背景に火山 |
| si | クスコ | `inkawall` | モルタルなしの石組みの壁 |
| si | オリャンタイタンボ | `livingtown` | 台形の戸口、水路 |
| si | マラス | `saltterraces` | 塩田の階段状の池 |
| si | ワンカヨ | `trenmacho` | 小さな気動車と市場の屋台 |
| si | ワンカベリカ | `mercurymine` | 坑口と山肌 |
| si | アヤクーチョ | `retablo` | 彩色木箱の祭壇(レタブロ) |
| si | ワヌコ | `crossedhands` | 交差する両腕の浮彫(コトシュ) |
| si | ワラス | `glaciallake` | 山上の氷河湖と警報施設 |
| si | ユンガイ | `buriedtown` | 埋もれた旧市街と慰霊の十字架 |
| si | チャビン・デ・ワンタル | `oracle` | 石の回廊の入口 |
| si | ハウハ | `firstcapital` | 植民地広場のバルコニー |
| si | アバンカイ | `canyonview` | 深い峡谷の縁 |
| si | チャチャポヤス | `cloudfortress` | クエラップの丸い石壁、雲霧林 |
| si | マチュピチュ・プエブロ | `railonly` | 渓谷沿いの線路、道路の無い町 |
| si | モケグア | `coppervalley` | 銅山と灌漑された果樹園 |
| al | フリアカ | `railjunction` | 3方向に分かれる線路 |
| al | シクアニ | `chuno` | 凍らせたじゃがいもを並べた畑 |
| al | デサグアデロ | `bordermarket` | 国境の橋と露店 |
| al | アヤビリ | `cheeseland` | チーズと羊・アルパカ |
| se | プカルパ | `roadsend` | 道路が尽きて川に接する地点 |
| se | ユリマグアス | `riverdock` | 二階建ての木造船の桟橋 |
| se | プエルト・マルドナード | `goldpit` | 水を張った採掘の穴と熱帯林 |
| se | タラポト | `coffeecacao` | コーヒーとカカオの乾燥棚 |
| se | サティポ | `coffeefrontier` | 開拓されたコーヒー畑と森の境界 |
| co | トゥンベス | `mangrove` | マングローブとエビ養殖池 |
| co | タララ | `oilderrick` | 海沿いの油井の櫓 |
| co | ピウラ | `desertdunes` | 砂丘と灌漑された緑の帯 |
| co | ランバイェケ | `royaltomb` | 黄金の副葬品、ピラミッド状の墓 |
| co | プエルト・チカマ | `surfwave` | 長く割れる左ブレイクの波 |
| co | トルヒージョ | `adobecity` | 波・魚・鳥の浮彫のある日干し煉瓦の壁 |
| co | ワンチャコ | `reedboat` | 葦舟(カバジート・デ・トトラ) |
| co | チンボテ | `fishmeal` | 漁船団とフィッシュミール工場 |
| co | カラル | `pyramidmound` | 段状の土の塚 |
| co | リマ | `greycity` | 霧に覆われた植民地広場 |
| co | カヤオ | `fortress` | 稜堡のある海沿いの要塞 |
| co | ピスコ | `brandybarrel` | 蒸留酒の樽と再建中の建物 |
| co | パラカス | `mummybundle` | 織物に包まれたミイラの包み、砂丘の燭台 |
| co | ナスカ | `aqueduct` | 螺旋状の縦穴(プキオ)への入口 |
| co | イロ | `coppersmelter` | 埠頭と製錬所の煙突 |
| co | タクナ | `reunionflag` | 国境のオベリスクと広場 |

## `bg`(都市イラストの背景。45種)

`desertport`(イロ・ピスコ)以外はすべて1都市専用。地方ごとの色調の目安:
**co(海岸)は乾いた砂色と海の青**、**si(山地)は岩肌と段々畑の緑**、
**se(熱帯林)は濃い緑と川面**、**al(高原南部)は乾いた黄土色と高原の空**。

| `bg` | 都市 | 舞台の説明 |
|---|---|---|
| `smeltertown` | ラ・オロヤ | 山あいの製錬所の町、煙 |
| `minepit` | セロ・デ・パスコ | 町を削る露天掘りの縁 |
| `andeanplaza` | カハマルカ | 植民地様式の広場 |
| `titicaca` | プーノ | 高原の湖畔 |
| `amazonport` | イキトス | 川港とタイル張りの邸宅群 |
| `whitecity` | アレキパ | 白い石造りの町並みと火山 |
| `andeancapital` | クスコ | 石組みの旧市街 |
| `incastreets` | オリャンタイタンボ | インカの町割りの通り |
| `sacredvalley` | マラス | 谷間の段々畑と塩田 |
| `mantarovalley` | ワンカヨ | マンタロ渓谷の畑と市場 |
| `minetown` | ワンカベリカ | 鉱山町の坑口 |
| `andeancity` | アヤクーチョ | 高地の町並み |
| `andeanvalley` | ワヌコ | 谷間の遺跡と果樹園 |
| `cordillera` | ワラス | 雪山を背にした町 |
| `valleymemorial` | ユンガイ | 慰霊の谷 |
| `ancienttemple` | チャビン・デ・ワンタル | 古い石造神殿 |
| `colonialplaza` | ハウハ | 植民地広場 |
| `canyonvalley` | アバンカイ | 深い峡谷の谷間 |
| `cloudforest` | チャチャポヤス | 雲霧林の尾根 |
| `gorgetown` | マチュピチュ・プエブロ | 渓谷に挟まれた町 |
| `desertvalley` | モケグア | 乾いた谷の果樹園 |
| `altiplanotown` | フリアカ | 高原の分岐駅の町 |
| `altiplanofield` | シクアニ | 高原の畑 |
| `borderlake` | デサグアデロ | 湖に近い国境の町 |
| `altiplanoranch` | アヤビリ | 高原の牧場 |
| `ucayaliport` | プカルパ | 川港と製材所 |
| `junglegateway` | ユリマグアス | 川沿いの船着き場 |
| `goldjungle` | プエルト・マルドナード | 採掘で削られた熱帯林 |
| `junglehighland` | タラポト | 低地の丘陵とコーヒー畑 |
| `colonizationfrontier` | サティポ | 開拓前線の農地 |
| `mangrovecoast` | トゥンベス | マングローブの海岸 |
| `oilcoast` | タララ | 油井の並ぶ海岸 |
| `sechuratown` | ピウラ | 砂漠の町とオアシス的な緑地 |
| `moxecoast` | ランバイェケ | 海に近い遺跡の平地 |
| `desertbeach` | プエルト・チカマ | 砂漠の海岸と波 |
| `desertcapital` | トルヒージョ | 砂漠の中の都市 |
| `fishingbeach` | ワンチャコ | 漁村の浜 |
| `fishingport` | チンボテ | 漁港と工場群 |
| `aridvalley` | カラル | 乾いた谷の遺跡 |
| `capitalcity` | リマ | 霧に覆われた首都 |
| `historicport` | カヤオ | 要塞のある港 |
| `desertport` | ピスコ・イロ(共有) | 砂漠の港町(ピスコは蒸留酒の樽、イロは製錬所の煙突で描き分ける) |
| `desertbay` | パラカス | 砂漠の湾と半島 |
| `desertplain` | ナスカ | 何も無い乾いた平原 |
| `borderplaza` | タクナ | 国境の記念広場 |

## 絵担当への申し送り

- `mark`/`bg` は書きながら自由に決めたので、**この一覧が最終版**(この後
  cities.mjs を変更しない)。描き始める前に一度この表と `cities.mjs` の
  実際の値を突き合わせて、ずれが無いことを確認してください。
- 新しい絵が必要な場合の追加提案はない(46種そのままで進めてよい判断)。
- 背景の密度目安(1枚あたりの要素数)や、都市シンボルが隠す帯(横151〜249・
  縦54〜152は見えない)については `docs/50-authoring/01-content-guide.md` と
  過去の教訓メモを参照。
