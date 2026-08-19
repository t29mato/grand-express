# スイス盤面の絵の鍵

`cities.mjs` の44都市が使う `mark`(盤面上のシンボル)と `bg`(都市カード背景)の
一覧。**組み合わせ(`mark`+`bg`)の重複は0組**(2026-08-20 計測、下記コマンド)。

```
node --input-type=module -e '
import { SWITZERLAND_CITIES } from "./scripts/countries/switzerland/cities.mjs";
const cs = Object.values(SWITZERLAND_CITIES);
const combo = new Set(cs.map((c) => c.mark + "|" + c.bg));
console.log("都市", cs.length, "/ 組み合わせ", combo.size,
            "→ 同じ絵になる都市", cs.length - combo.size, "組");
'
# 都市 44 / 組み合わせ 44 → 同じ絵になる都市 0 組
```

`mark` 35種・`bg` 30種(都市数のわりに多い。理由は cities.mjs 冒頭コメント参照)。
`mark` は直径19px程度にしかならないので、描き分けられる絵柄に絞ること
(手本は既存盤面の `art.mjs`)。

## `mark`(盤面上のシンボル、35種)

| キー | 想定する絵 | 受け持つ町 |
|---|---|---|
| `federal` | 議事堂のドーム | ベルン |
| `bank` | 金庫の扉・積まれた硬貨 | チューリヒ・ツーク・ルガーノ |
| `chemical` | フラスコ・工場 | バーゼル |
| `lion` | 岩壁に彫られた瀕死の獅子 | ルツェルン |
| `cannon` | 火砲 | トゥーン |
| `textile` | 糸巻き | ザンクトガレン |
| `ruin` | 破損した盾・崩れた壁 | シャフハウゼン・シュタンス |
| `gear` | 機関車の歯車 | ヴィンタートゥール |
| `rail` | 初期の蒸気機関車の車輪 | バーデン |
| `charter` | 封蝋のついた羊皮紙の巻物 | アーラウ・シュヴィーツ |
| `diplomacy` | 円卓と旗 | ゾロトゥルン・ジュネーブ・ロカルノ |
| `ballot` | 挙手する手・投票箱 | アッペンツェル |
| `assembly` | 広場に挙がる手の群れ | グラールス |
| `crossbow` | 弩と林檎(伝説のモチーフを装飾として使う。カード本文は伝説と明記) | アルトドルフ |
| `tunnelportal` | アーチ形のトンネル坑口 | ブリーク・ビアスカ |
| `peak` | 二つ並んだ山の稜線 | ツェルマット・サンモリッツ |
| `bunker` | 岩肌に隠れた銃眼 | アンデルマット |
| `sportbody` | トロフィー・審判の笛 | ローザンヌ・ニヨン |
| `briefcase` | 書類鞄 | ヴヴェイ |
| `flame` | 炎とギターのシルエット | モントルー |
| `book` | 開いた本 | イヴェルドン |
| `speech` | 二つに割れた吹き出し | フリブール |
| `crown` | 小さな王冠 | ヌーシャテル |
| `dam` | ダムの堤とせき止められた水 | シオン |
| `fist` | 掲げた拳と旗 | ドゥレモン |
| `grid` | 街路の格子模様 | ラ・ショー=ド=フォン |
| `border` | 遮断機と検問所 | キアッソ |
| `castle` | 城の塔 | ベリンツォーナ |
| `pickaxe` | 交差したつるはし | アイローロ |
| `mitre` | 司教冠 | クール |
| `lungs` | 医療の十字と山 | ダヴォス |
| `monastery` | 鐘楼のある修道院 | ディセンティス |
| `leaf` | 守られた葉・木 | ツェルネッツ |
| `viaduct` | 弧を描く高架橋 | ベルギューン |
| `suitcase` | 旅行鞄と菓子 | ポスキアーヴォ |

## `bg`(都市カードの背景、30種)

| キー | 想定する背景 | 受け持つ町 |
|---|---|---|
| `capital` | 連邦議事堂前広場 | ベルン |
| `financial` | 高層のオフィス街 | チューリヒ |
| `taxhaven` | 控えめな低層オフィスの湖畔の町 | ツーク |
| `riverindustry` | ライン川沿いの工場と橋 | バーゼル |
| `lakeside` | 湖畔の町並み | ルツェルン・ローザンヌ・ヴヴェイ・モントルー・イヴェルドン・ヌーシャテル・ルガーノ・ロカルノ |
| `military` | 兵舎と演習場 | トゥーン |
| `textiletown` | 刺繍工房のある町並み | ザンクトガレン |
| `waterfall` | 滝のある川辺 | シャフハウゼン |
| `engineering` | 工場の建屋 | ヴィンタートゥール |
| `spa` | 温泉浴場のある町並み | バーデン |
| `smalltown` | 素朴な旧市街 | アーラウ・ゾロトゥルン・フリブール・ドゥレモン |
| `village` | 山あいの村 | アッペンツェル・グラールス・アルトドルフ・シュタンス |
| `mountainpass` | 峠の入口 | ブリーク |
| `alpine` | 岩肌のアルプスの村 | ツェルマット |
| `founding` | 文書館のある旧市街 | シュヴィーツ |
| `fortress` | 岩肌に紛れた要塞 | アンデルマット |
| `international` | 国際機関の建物群 | ジュネーブ |
| `harbor` | 小さな湖の港 | ニヨン |
| `valley` | 川沿いの谷 | シオン・ビアスカ |
| `industrialtown` | 格子状の工場町 | ラ・ショー=ド=フォン |
| `border` | 国境の駅 | キアッソ |
| `citadel` | 城塞のある丘 | ベリンツォーナ |
| `tunnellabor` | トンネル工事の飯場 | アイローロ |
| `cathedral` | 大聖堂のある旧市街 | クール |
| `sanatorium` | バルコニーの並ぶ療養所 | ダヴォス |
| `resort` | 湖畔のリゾート | サンモリッツ |
| `monasteryvalley` | 修道院のある谷 | ディセンティス |
| `nationalpark` | 手つかずの山林 | ツェルネッツ |
| `gorge` | 高架橋のかかる峡谷 | ベルギューン |
| `southvalley` | 南向きの谷の斜面 | ポスキアーヴォ |

## 厄災の神(参考)

`SWITZERLAND_SPIRIT`(`flavour.mjs`)= バルベガジ(絵文字🦶)。アルプス民話の
雪山の小さな精霊、大きな足が特徴。厄災の絵(`src/presentation/components/events/dooms/switzerland-*.tsx`)
は別途7枚必要(このボードの担当外)。
