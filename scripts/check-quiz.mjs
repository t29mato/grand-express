#!/usr/bin/env node
/**
 * クイズを機械的に点検する。
 *
 *   node scripts/check-quiz.mjs            全部見る
 *   node scripts/check-quiz.mjs ibaraki    1国だけ
 *
 * ## なぜこれが要るか
 *
 * 茨城のクイズ40問には、冒頭に
 * **「都市カードと題材が重ならないようにしてある」**という約束が書いてあった。
 * ところが2026-08-09 に総当たりで確かめたところ、**4問で破られていた。**
 *
 * | | 問い | 都市カードの記述 |
 * |---|---|---|
 * | Q6 | 全国一の産出量をもつのは? → **れんこん** | 土浦「**れんこんの産出が日本一**である」 |
 * | Q18 | 茨城空港が滑走路を共用する相手は? → **航空自衛隊の基地** | 小美玉「**航空自衛隊の基地**の端に開いた」 |
 * | Q19 | 大洗のフェリーが渡る島は? → **北海道** | 大洗「**北海道へ夜行のフェリー**が出て」 |
 * | Q21 | 牛久のワイン醸造場が開かれたのは? → **1900年代** | 牛久「**1903年に**……日本初の国産ワイン」 |
 *
 * **1問ずつ読んでも出ない。**気づけたのは1件だけで、残り3件は総当たりで出た。
 * 約束が「書いてある」ことと「守られている」ことは別なので、機械で確かめる。
 *
 * ### **直したのは問いのほうで、カードは触っていない**
 *
 * 上の4件は**問いを差し替えて**直した。**カードの文言はそのまま残っている。**
 * だから「れんこん」は今も土浦のカードに載っているし、「北海道へ夜行のフェリー」も
 * 大洗のカードに載っている。**この表を読んで「もう重ならない題材だ」と思わないこと。**
 *
 * 2026-08-09、まさにここで踏みかけた。水戸の問いを減らす差し替え先に
 * れんこんを選びかけ、**この表を自分で書いたことを根拠に**「カードは直っただろう」と
 * 当てにした。数えたら載っていた。**一度直したという記憶が、直していない側まで
 * 直った気にさせる。**入れる前に必ず数えること。
 *
 * ## 見ているもの
 *
 * 1. **答えの漏れ** — 正解の文字列が、その国の都市カード(tag / fact)に載っていないか
 * 2. **言語の混入** — 日本語に英字、英・西・仏に日本語が混ざっていないか
 * 3. **欠け** — 4言語のどれかが空、選択肢が3つでない、正解の添字が範囲外
 * 4. **正解の位置の偏り** — 0/1/2 が散っているか
 * 5. **題材の偏り** — 同じ語を含む問いが何問あるか
 *
 * 1 は**短い答えだと誤検知する**(「湖」「城」など一般名詞)。
 * 出たものは人が見て判断すること。**これは判定ではなく手がかり。**
 *
 * ## 判断済みのものは `ACCEPTED` に理由を書いて外す
 *
 * 「TGVとは?」「denim(デニム)という語の由来は?」のように、
 * **原語を出さないと問いが成立しない**ものがある。これを毎回13件挙げていると、
 * 本物の混入が埋もれる。外したものは `例外` として印字はするので、
 * 消えるわけではない。**文面を変えれば例外は外れて、また出る。**
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");
/**
 * 盤面の一覧は**焼き上がった目録から引く。**同じ配列を検査ごとに書いていたので、
 * 盤面を1枚足すたびに何箇所も直す必要があり、直し忘れても検査は緑のまま通った
 * (増えた盤面を見に行かないだけなので)。
 */
const ALL = JSON.parse(
  readFileSync(new URL("../src/infrastructure/content/country-index.json", import.meta.url), "utf8"),
).map((entry) => entry.id);

const only = process.argv[2];
const countries = only ? [only] : ALL;
for (const c of countries) {
  if (!existsSync(join(contentDir, `${c}.content.json`))) {
    console.error(`知らない国です: ${c}(${ALL.join(" / ")})`);
    process.exit(2);
  }
}

const LANGS = ["en", "es", "fr", "ja"];
const CJK = /[぀-ヿ一-鿿]/;
const LATIN = /[A-Za-z]{3,}/g;
/** 日本語に出てもよい英字(単位・固有の略号)。 */
const ALLOWED = new Set(["km", "kg", "jr", "gps"]);
/**
 * **全部大文字の略号は数えない**(FIFA・BMW・NATO・EEC・TGV・ICE・KTX など)。
 *
 * この検査が探しているのは「訳し忘れた英文が日本語の欄に残っている」ことで、
 * 略号は日本語の文章でもそのまま英字で書く。ドイツ盤面で19件挙がったうち
 * 過半がこれで、**本物の訳し忘れが埋もれる。**
 * 訳し忘れの英文が全部大文字になることはまず無いので、切ってよい。
 */
const isAcronym = (word) => /^[A-Z]{2,5}$/.test(word);
/** 答えが短すぎると一般名詞に当たるので、この長さ未満は漏れ判定から外す。 */
const MIN_ANSWER = 3;
/** どのカードにも出るので、突き合わせの手がかりにならない語。 */
const GENERIC = new Set([
  "世界", "日本", "国内", "地方", "都市", "有名", "最大", "最長", "最初", "理由", "特徴",
  "以来", "現在", "以上", "以下", "場所", "名前", "呼ば", "知ら", "使わ", "作ら", "建て",
]);

/**
 * 見たうえで「これは問題ではない」と判断したもの。
 *
 * `has` はその文に含まれる目印。**問い側の文面を書き換えると目印が消え、
 * また挙がってくる**——別の文で同じ言い訳が使い回されるのを防ぐため、
 * わざと文面に結び付けている。
 */
const ACCEPTED = [
  { c: "hokkaido", has: "YOSAKOI", why: "祭りの公式表記そのもの。訳すと祭りが特定できない" },
  { c: "hokkaido", has: "HOKKAIDO", why: "球場の公式名称(エスコンフィールドHOKKAIDO)。施設名の一部" },
  { c: "kyushu", has: "PayPay", why: "実在の施設名(PayPayドーム)。訳すと施設が特定できない" },
  { c: "norway", has: "英語の fell", why: "fjell と英語 fell が語源を同じくする、という説明。原語が話題そのもの" },
  { c: "norway", has: "ski", why: "英語 ski の語源を訊く問題。綴りが問いの中身" },
  { c: "norway", has: "fjord", why: "英語 fjord がノルウェー語からの借用であることの説明" },
  { c: "norway", has: "elg", why: "ノルウェー語でヘラジカを指す語そのものを訊く問題" },
  { c: "norway", has: "rvegr", why: "古ノルド語 Norðrvegr の語源説明。正規表現が複合語を分割している" },
  { c: "norway", has: "elsker", why: "国歌の原題『Ja, vi elsker dette landet』の引用" },
  { c: "norway", has: "Norge", why: "自国を何と呼ぶかを訊く問題。選択肢自体がノルウェー語" },
  { c: "norway", has: "Nordland", why: "同上" },
  { c: "norway", has: "KitKat", why: "比較のための商品名" },
  { c: "norway", has: "bane", why: "交通機関の正式名称 T-bane の一部" },
  { c: "norway", has: "fjell", why: "地名要素 fjell の意味を訊く問題。綴りが問いの中身" },
  { c: "norway", has: "takk", why: "takk の意味を訊く問題と、用例句 takk for maten の引用" },
  { c: "norway", has: "maten", why: "同上" },
  { c: "newzealand", has: "bach", why: "bach(海辺の小屋)という語そのものが問いの中身。訳すと問いが成立しない" },
  { c: "newzealand", has: "Japanese", why: "jandal が Japanese + sandals の合成であるという語源の説明" },
  { c: "newzealand", has: "sandals", why: "同上" },
  { c: "africa", has: "M-Pesa", why: "M-Pesa というサービス名そのものが問いの中身。TGV と同種" },
  { c: "africa", has: "FESPACO", why: "映画祭の名前そのものが問いの中身。TGV と同種" },
  { c: "asia", has: "typhoon", why: "typhoon という語がどの中国語から入ったかを訊く問題。綴りが問いの中身" },
  // 語そのものが問いの中身になっているもの(訳すと問いが成立しない)。
  { c: "northamerica", has: "loon", why: "ルーニーの名がアビ(loon)に由来する、という語源の問題" },
  { c: "northamerica", has: "canoe", why: "canoe という語がどの先住民の言語から入ったかを訊く問題" },
  { c: "europe", has: "krona", why: "アイスランドの króna をスウェーデンの krona・デンマークの krone と綴りで見分ける問題" },
  { c: "europe", has: "krone", why: "同上" },
  // オーストラリア。大文字の Country という語そのものが問いの中身。
  // アボリジナル英語では土地・水・人・法をまとめて指す語で、訳すと問いが消える。
  { c: "australia", has: "「Country」", why: "大文字のCountryという語そのものを訊く問題" },
  // カナダ。国の標語そのものを選択肢に並べる設問なので、ラテン語・フランス語が
  // 日本語文に残るのは意図どおり。訳してしまうと「どれがカナダの標語か」が問えない。
  { c: "canada", has: "E Pluribus Unum", why: "アメリカの標語。原語を出さないと見分ける問いにならない" },
  { c: "canada", has: "A Mari Usque Ad Mare", why: "カナダの標語そのもの。ラテン語が問いの中身" },
  { c: "canada", has: "Dieu et Mon Droit", why: "イギリス王室の標語。原語を出さないと見分ける問いにならない" },
  // ベネズエラ。組織名の頭字語そのものが問いの中身。
  { c: "venezuela", has: "OPEC", why: "1960年に創設に加わった組織の名がOPECそのもの" },
  { c: "venezuela", has: "NATO", why: "OPECと見分けさせる設問。略号を訳すと問いが成立しない" },
  { c: "venezuela", has: "PDVSA", why: "国営石油会社の略称そのものを答えさせる設問" },
  { c: "japan", has: "弾丸列車(bullet train)", why: "英語の通称そのものを訊く問題。原語が無いと問いが成立しない" },
  { c: "japan", has: "1871", why: "「円」という字の意味を説明している。字そのものが話題" },
  { c: "india", has: "UTC+5:30", why: "時刻帯の正式な書きかた。カタカナに直すと通じない" },
  { c: "france", has: "TGVとは", why: "略号そのものを訊く問題" },
  { c: "france", has: "AOCとは", why: "略号そのものを訊く問題" },
  { c: "france", has: "denim(デニム)", why: "語の由来を訊く問題。綴りが問いの中身" },
  { c: "france", has: "serge de Nîmes", why: "語源になった原語。訳すと答えにならない" },
  { c: "turkey", has: "turquoise", why: "英語turquoiseの語源を訊く問題。綴りが問いの中身" },
  { c: "china", has: "「tea」からロシア語", why: "茶を意味する語の広がりを訊く問題。原語の形が問いの中身" },
  { c: "china", has: "英語の国名「China」", why: "英語国名の語源を訊く問題。綴りが問いの中身" },
  { c: "uk", has: "プレイツ・オブ・ミート", why: "コックニーの押韻俗語の説明。元の英語句が話題そのもの" },
  { c: "germany", has: "Rücken", why: "リュックサックの語源を訊く問題。原語が問いの中身" },
  { c: "germany", has: "wandern", why: "Wanderlustの語源を訊く問題。原語が問いの中身" },
  { c: "germany", has: "Doppelg", why: "Doppelgängerの意味を訊く問題。原語が問いの中身" },
  { c: "germany", has: "Gänger(歩く者)", why: "Doppelgängerの成り立ちの説明。原語を分解して見せている" },
  { c: "germany", has: "Geist", why: "ツァイトガイストの説明。原語が話題そのもの" },
  { c: "turkey", has: "kiosk", why: "英語kioskの語源を訊く問題。綴りが問いの中身" },
];
/** 答えの漏れのうち、見たうえで漏れではないと判断したもの。 */
const ACCEPTED_LEAKS = [
  { c: "southafrica", ans: "カラハリ砂漠", city: "アピントン", why: "難易度3。アピントンのカードは「カラハリの縁」と場所を述べているだけで、3か国にまたがることには触れていない" },
  { c: "southafrica", ans: "南アフリカ", city: "サンシティ", why: "グコムとアマピアノを訊く問題。カードはボプタツワナの賭博場の話。国名はこの盤面のどのカードにも出る枠の語" },
  { c: "southafrica", ans: "ジンバブエ", city: "ムシナ", why: "N1号線の行き先を訊く問題。カードはリンポポ川がジンバブエ**とボツワナ**の国境に接すると書いており、答えを一つに絞らない" },
  { c: "norway", ans: "スウェーデン", city: "フレドリクスタ", why: "半島を分け合う相手を訊く問題。カードの「スウェーデンとの戦争で焼かれた」と「スカンディナヴィアで数少ない旧市街」は別の文脈" },
  { c: "norway", ans: "19世紀", city: "ドランメン", why: "オスロ王宮の完成した世紀を訊く問題。ドランメンの「19世紀」は木材港の最盛期を指し、王宮とは無関係。「19世紀」は範囲が広すぎる枠の語" },
  { c: "vietnam", ans: "ハノイ", city: "ニンビン", why: "難易度2の首都の問い。易しい問いはカードを読んだ人が答えられてよい" },
  { c: "vietnam", ans: "フランス", city: "ホイアン", why: "盤面全体の通奏低音の語。「世紀」「ヨーロッパ」という一般語との偶然の一致" },
  { c: "peru", ans: "リャマ", city: "プーノ", why: "難易度1の易しい問い。アンデスのどのカードにも出うる語で、読んだ人が答えられるのは狙いどおり" },
  { c: "peru", ans: "アンデス山脈", city: "プーノ", why: "難易度2。同上" },
  { c: "peru", ans: "アレキパ", city: "フリアカ", why: "コルカ渓谷の場所を訊く問題。フリアカのカードは鉄道の行き先として名を挙げているだけで、渓谷には触れていない" },
  { c: "peru", ans: "ボリビア", city: "ワンカベリカ", why: "太平洋戦争の同盟国を訊く問題。カードにあるのは「アンデス」という枠の語だけ" },
  { c: "peru", ans: "モチェ", city: "ランバイェケ", why: "ラルコ博物館の壺を訊く問題。カードはシパンの王墓の話で、博物館にも壺にも触れていない" },
  { c: "peru", ans: "クスコ", city: "フリアカ", why: "カミセア天然ガス田の場所を訊く問題。フリアカのカードは鉄道の行き先として名を挙げているだけ" },
  { c: "africa", ans: "ジンバブエ", city: "ヴィクトリアフォールズ", why: "遺跡の名が国名の由来かを訊く問題。町が「ジンバブエの」であることはカードに書いてあって当然で、グレート・ジンバブエ遺跡そのものはどのカードにも無い" },
  { c: "africa", ans: "アンゴラ", city: "ロビト", why: "カビンダの飛び地を訊く問題。ロビトのカードはベンゲラ鉄道の話で、カビンダには触れていない" },
  { c: "africa", ans: "ウガンダ", city: "ヴォイ", why: "イディ・アミンを訊く問題。ヴォイのカードにアミンの名は無い(検出は「推定」という枠の語による誤検知)" },
  { c: "africa", ans: "ヨハネスブルグ", city: "ダーバン", why: "「人類のゆりかご」を訊く問題。ダーバンのカードに「ゆりかご」は無い(検出は「屈指」という枠の語による誤検知)" },
  { c: "africa", ans: "チャド", city: "ンジャメナ", why: "アウズー地帯の裁定を訊く問題。ンジャメナのカードに「アウズー」は無く、チャドの町なので国名が出るのは当然" },
  { c: "africa", ans: "ナミビア", city: "ワルビスベイ", why: "ケープペンギンを訊く問題。ワルビスベイのカードにペンギンは無い(検出は「海岸」という枠の語による誤検知)" },
  { c: "africa", ans: "マダガスカル", city: "トゥアマシナ", why: "バニラを訊く問題。トゥアマシナのカードにバニラは無い(検出は「天然」という枠の語による誤検知)" },
  { c: "africa", ans: "モザンビーク", city: "マプト", why: "ピリピリソースを訊く問題。マプトのカードにピリピリは無い(旧ポルトガル植民地であることは町のカードに出て当然)" },
  { c: "africa", ans: "コンゴ民主共和国", city: "ロビト", why: "隣国の数を訊く問題。ロビトのカードは9か国に触れていない(検出は数字「9」による誤検知)" },
  { c: "spain", ans: "マドリード", city: "マドリード", why: "首都そのものを訊く易しい問題。町のカードに書いてあるのは当然で、読んだ人が答えられるのはむしろ狙いどおり" },
  { c: "newzealand", ans: "ウェリントン", city: "ウェリントン", why: "同上" },
  { c: "newzealand", ans: "ダニーデン", city: "ダニーデン", why: "町そのものを訊く問題。カードに名が出るのは当然" },
  { c: "newzealand", ans: "南半球", city: "オアマル", why: "半球の名。この盤面のどのカードにも出うる枠の語" },
  { c: "mexico", ans: "カトリック", city: "サン・クリストバル・デ・ラス・カサス", why: "国でいちばん広い信仰を訊く易しい問題(難易度1)。どの町のカードにも出うる語で、カードは別の話をしている" },
  { c: "mexico", ans: "ユカタン半島", city: "バカラール", why: "チクシュルーブ・クレーターの場所を訊く問題。カードは半島の別の話しかしていない" },
  { c: "mexico", ans: "ラサロ・カルデナス", city: "タンピコ", why: "農地改革を訊く問題。カードが書いているのは石油国有化で、別の事実" },
  { c: "mexico", ans: "メキシコ", city: "トレオン", why: "国名そのもの。この盤面のどのカードにも出る枠の語" },
  { c: "world", ans: "アフリカ", city: "ダカール", why: "大陸名は世界一周盤面のどのカードにも出る。カードを読んでも答えは分からない" },
  { c: "world", ans: "エチオピア", city: "アディスアベバ", why: "首都と国名の対応は常識の範囲。カードは首都の話しかしていない" },
  {
    c: "turkey",
    ans: "アンカラ",
    city: "アンカラ",
    why: "首都そのものを訊く易しい問題。町のカードに書いてあるのは当然で、読んだ人が答えられるのはむしろ狙いどおり",
  },
  {
    c: "usa",
    ans: "合衆国憲法",
    city: "フィラデルフィア",
    why: "フィラデルフィアのカードは憲法制定会議の町として書いてある。読んだ人が答えられるのは狙いどおり",
  },
  {
    c: "usa",
    ans: "南北戦争",
    city: "チャールストン",
    why: "サムター要塞の町なので、カードに戦争の始まりが出るのは当然",
  },
  {
    c: "usa",
    ans: "ルイジアナ購入",
    city: "ニューオーリンズ",
    why: "三つの帝国に所有された町の話。1803年に触れないほうが不自然",
  },
  {
    c: "usa",
    ans: "ミズーリ川",
    city: "ビスマーク",
    why: "ミズーリ川沿いの町なので、カードに川の名が出るのは当然",
  },
  {
    c: "italy",
    ans: "ローマ",
    city: "ラヴェンナ",
    why: "ラヴェンナのカードは西ローマ帝国の遷都の話。いまの首都がどこかは書いていない",
  },
  {
    c: "italy",
    ans: "ミラノ",
    city: "ミラノ",
    why: "ミラノを訊く問題がミラノのカードと重なるのは当然。読んだ人が答えられるのは狙いどおり",
  },
  {
    c: "italy",
    ans: "ラヴェンナ",
    city: "ラヴェンナ",
    why: "ダンテの墓を訊く問題。町のカードに書いてあるのは当然で、読んだ人が答えられるのが狙い",
  },
  {
    c: "italy",
    ans: "バチカン市国",
    city: "ミラノ",
    why: "ミラノのカードに大聖堂の語が出るだけ。バチカンの話は書いていない",
  },
  {
    c: "china",
    ans: "アジア",
    city: "厦門",
    why: "大陸名はどのカードにも出る。厦門のカードは港と華僑の話で、問いの答えは与えていない",
  },
  {
    c: "uk",
    ans: "ロンドン",
    city: "ロンドン",
    why: "首都そのものを訊く易しい問題。カードを読んだ人が答えられるのは狙いどおり",
  },
  {
    c: "uk",
    ans: "アイリッシュ海",
    city: "ホーリーヘッド",
    why: "ホーリーヘッドはアイリッシュ海に面した港なので、カードに海の名が出るのは自然。読んだ人が答えられるのは狙いどおり",
  },
  {
    c: "germany",
    ans: "ベルリン",
    city: "カールスルーエ",
    why: "カールスルーエのカードは町の扇形の造りの話で、首都がどこかは書いていない",
  },
  {
    c: "germany",
    ans: "ヨーロッパ",
    city: "デュッセルドルフ",
    why: "「大陸ヨーロッパ最大の日本人コミュニティ」と出るだけ。問いの答えは与えていない",
  },
  {
    c: "turkey",
    ans: "イスタンブール",
    city: "ブルサ",
    why: "ブルサのカードはイスタンブールの名を出すが、人口の多寡もノーベル賞の話も書いていない。答えは分からない",
  },
];
const accepted = (country, text) =>
  ACCEPTED.find((a) => a.c === country && String(text).includes(a.has));

let problems = 0;
let excused = 0;
for (const country of countries) {
  const content = JSON.parse(readFileSync(join(contentDir, `${country}.content.json`), "utf8"));
  const quiz = content.quiz ?? [];
  const cities = Object.values(content.cities ?? {});
  const cards = cities.map((c) => [c.n.ja, `${c.tag?.ja ?? ""}${c.fact?.ja ?? ""}`]);

  console.log(`\n===== ${country}(${quiz.length}問 / 都市${cities.length}）`);

  // 1. 答えの漏れ。
  //
  // **正解がカードに載っているだけでは足りない。**「アフリカ」「インド」のような語は
  // 都市カードに出て当たり前で、それを全部挙げると雑音になる(初版は6件が誤検知だった)。
  // そこで**問いの側の語も同じカードに載っているか**を見る。
  // 「1961年まで属していた国は? → ポルトガル」がゴアのカードに当たるのは、
  // カードに「ポルトガル」と「1961年」の両方があるからで、これは本物の漏れである。
  let leaks = 0;
  for (const [i, x] of quiz.entries()) {
    const ans = x.o?.[x.a]?.ja ?? "";
    if (ans.length < MIN_ANSWER) continue;
    // 問いから、特徴のある語(漢字・カタカナの連なり、年号)を取る
    // その盤面のカードに広く出る語は手がかりにならない(世界一周の「アフリカ」、
    // フランスの「フランス」など)。**カードの2割を超えて出る語は捨てる。**
    // 固定の除外表だと盤面ごとに書き足すことになるので、数えて決める。
    const spread = Math.max(2, Math.floor(cards.length * 0.2));
    const qWords = [
      ...new Set([
        ...(x.q.ja.match(/[一-鿿]{2,}|[ァ-ヴー]{3,}|[0-9]{3,4}年/g) ?? []),
      ]),
    ].filter((w) => !GENERIC.has(w) && cards.filter(([, t]) => t.includes(w)).length <= spread);
    const hit = cards
      .filter(([, text]) => text.includes(ans) && qWords.some((w) => text.includes(w)))
      .map(([name]) => name);
    if (hit.length) {
      const ok = ACCEPTED_LEAKS.find(
        (a) => a.c === country && a.ans === ans && hit.includes(a.city),
      );
      if (ok) {
        excused++;
        console.log(`  例外 Q${i + 1} 「${ans}」/ ${ok.city}: ${ok.why}`);
        continue;
      }
      leaks++;
      problems++;
      const shared = qWords.filter((w) => cards.some(([n, t]) => hit.includes(n) && t.includes(w)));
      console.log(`  漏れ? Q${i + 1} 正解「${ans}」が ${hit.join("/")} のカードに(問いとも「${shared.join("・")}」で一致)`);
    }
  }
  if (!leaks) console.log("  答えの漏れ: なし");

  // 2〜3. 言語の混入と欠け
  let lang = 0;
  for (const [i, x] of quiz.entries()) {
    const fields = [["q", x.q], ["f", x.f], ...x.o.map((o, j) => [`o${j}`, o])];
    for (const [tag, tr] of fields) {
      const okJa = accepted(country, tr.ja);
      for (const m of String(tr.ja ?? "").match(LATIN) ?? []) {
        if (ALLOWED.has(m.toLowerCase()) || isAcronym(m)) continue;
        if (okJa) {
          excused++;
          console.log(`  例外 Q${i + 1} ${tag} 英字「${m}」: ${okJa.why}`);
          continue;
        }
        lang++;
        problems++;
        console.log(`  混入 Q${i + 1} ${tag} 日本語に英字「${m}」: ${tr.ja}`);
      }
      for (const l of ["en", "es", "fr"]) {
        if (!CJK.test(String(tr[l] ?? ""))) continue;
        const ok = accepted(country, tr[l]);
        if (ok) {
          excused++;
          console.log(`  例外 Q${i + 1} ${tag} ${l}: ${ok.why}`);
          continue;
        }
        lang++;
        problems++;
        console.log(`  混入 Q${i + 1} ${tag} ${l} に日本語: ${tr[l]}`);
      }
      for (const l of LANGS) {
        if (!String(tr[l] ?? "").trim()) {
          lang++;
          problems++;
          console.log(`  欠け Q${i + 1} ${tag} ${l} が空`);
        }
      }
    }
    if (x.o.length !== 3) {
      lang++;
      problems++;
      console.log(`  欠け Q${i + 1} 選択肢が${x.o.length}個`);
    }
    if (!(x.a >= 0 && x.a < x.o.length)) {
      lang++;
      problems++;
      console.log(`  欠け Q${i + 1} 正解の添字が範囲外`);
    }
  }
  if (!lang) console.log("  言語の混入・欠け: なし");

  // 4. 正解の位置。
  //
  // **偏っていても不具合ではない。**出題時に `visibleOptionOrder()` が選択肢を混ぜ直す
  // (`game-store-formatters.ts`「正解が先頭に固定されないよう、最後にもう一度並びを混ぜる」)。
  // ボリビアと日本は全問が添字0だが、遊ぶ人には毎回ちがう順で出る。
  // 数字は参考として出すだけで、問題としては数えない。
  const pos = [0, 0, 0];
  for (const x of quiz) pos[x.a]++;
  console.log(`  正解の位置(参考。出題時に混ぜられる): 0=${pos[0]} 1=${pos[1]} 2=${pos[2]}`);

  // 5. 題材の偏り。問いと選択肢に出る語を数える。
  //
  // 初版は漢字しか見ていなかったので、**茨城以外の5盤面で何も出なかった。**
  // 「インド」「ボリビア」「アルプス」はカタカナで、数えられていなかっただけである
  // (「偏りが無い」ではなく「測れていない」だった)。カタカナも数える。
  //
  // その盤面の名前(インド×22 など)は題材の偏りではなく**枠**なので落とす。
  // 除外表を書くと盤面ごとに足すことになるので、**問いの4分の1を超える語**を枠と見なす。
  //
  // **ひらがなだけの語は数えていない。**「さつまいも」は拾えない。
  // 「でいちばん」「とされる」のような言い回しが上位を埋めて使いものにならなかった。
  // ひらがなの題材は目で見るしかない。
  //
  // 見るのは**問いと正解だけ**で、外れの選択肢は数えない。
  // 選択肢まで数えると、フランスで「アルプス×3」「チーズ×3」が挙がった。
  // 中身を見たら3件とも**別の問いのダミー**(ピレネーを訊く問いの外れがアルプス)で、
  // チーズを訊いている問いは1問しかなかった。**囮を偏りとして数えていた。**
  const counts = new Map();
  for (const x of quiz) {
    const text = x.q.ja + (x.o[x.a]?.ja ?? "");
    for (const w of new Set(text.match(/[一-鿿]{2,}|[ァ-ヴ][ァ-ヴー]{2,}/g) ?? [])) {
      if (GENERIC.has(w)) continue;
      counts.set(w, (counts.get(w) ?? 0) + 1);
    }
  }
  const frame = Math.max(3, Math.ceil(quiz.length / 4));
  const top = [...counts]
    .filter(([, n]) => n >= 3 && n < frame)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
  const frames = [...counts].filter(([, n]) => n >= frame).map(([w, n]) => `${w}×${n}`);
  console.log(`  3問以上に出る語: ${top.length ? top.map(([w, n]) => `${w}×${n}`).join(" ") : "なし"}`);
  if (frames.length) console.log(`  (枠として除外: ${frames.join(" ")})`);
}

const tail = excused ? `(ほかに判断済みの例外が${excused}件)` : "";
console.log(
  problems === 0
    ? `\n見つかった問題はありません。${tail}`
    : `\n${problems}件、見てください(短い答えは誤検知します)。${tail}`,
);
process.exit(problems === 0 ? 0 : 1);
