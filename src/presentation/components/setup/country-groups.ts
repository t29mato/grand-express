import { LocalizedText } from "../../../domain/shared-kernel/localized-text";

/**
 * 盤面をどう束ねて見せるか。
 *
 * 盤面が6枚のうちは、ただ並べておけばよかった。13枚増やすと**19枚**になり、
 * 1枚あたり160pxの札を並べると4行になって、その下の「誰が遊ぶか」が
 * 画面の外へ押し出される。**選ぶ前に、選び終わったあとの設定が見えなくなる。**
 *
 * そこで地域でまとめる。**縮尺ではなく地域で分けている**のは、遊ぶ人が探すとき
 * 「アジアのどれか」とは思っても「国の大きさのどれか」とは思わないため。
 * 縮尺の違い(世界一周・国・県)は札の肩に付ける印で示す。
 *
 * **束ごとに見出しを立てて並べる形は、試して捨てた。**見出しが行を占有するので、
 * 19枚をブラウザに並べて実測したら選ぶところが815pxになり、
 * 「旅を始める」が画面のはるか下(y=1533)へ行った。いまは束を**絞り込みの帯**
 * として使い、札そのものは1つの並びに流している。
 *
 * ここに書いていない盤面は `fallback` に落ちる。落ちたままにしないよう、
 * `country-groups.test.ts` が**未分類を見つけたら落ちる**ようにしてある。
 */
export interface CountryGroup {
  readonly key: string;
  readonly label: LocalizedText;
  readonly countryIds: readonly string[];
  /**
   * **地図の上に置けない盤面の束。**
   *
   * 「地球をまわる」は1点で指せない。太陽系は地球の上に無い。どちらも
   * 緯度経度で印を打つと嘘になるので、地図ではなく**下のボタン**として出す。
   */
  readonly offMap?: boolean;
  /**
   * その大陸ぜんぶを走る盤面。**大陸そのものと同じ広さなので、
   * 国の名札に混ぜると「ヨーロッパ」が2つ並ぶ。**地図の下のボタンにする
   * (「地球をまわる」を世界地図の下に置いているのと同じ考え方)。
   */
  readonly wholeBoardId?: string;
}

export const COUNTRY_GROUPS: readonly CountryGroup[] = [
  {
    key: "world",
    label: { en: "Around the world", es: "Vuelta al mundo", fr: "Tour du monde", ja: "地球をまわる" },
    countryIds: ["world"],
    offMap: true,
  },
  {
    key: "space",
    label: { en: "Beyond Earth", es: "Más allá de la Tierra", fr: "Au-delà de la Terre", ja: "地球のそと" },
    countryIds: ["solarsystem"],
    offMap: true,
  },
  {
    key: "asia",
    label: { en: "Asia", es: "Asia", fr: "Asie", ja: "アジア" },
    wholeBoardId: "asia",
    countryIds: [
      "asia",
      "vietnam",
      "japan",
      "ibaraki",
      "hokkaido",
      "kyushu",
      "korea",
      "china",
      "india",
      "hyakumeizan",
      "indonesia",
      "bali",
      "malaysia",
      "turkey",
    ],
  },
  {
    key: "europe",
    label: { en: "Europe", es: "Europa", fr: "Europe", ja: "ヨーロッパ" },
    wholeBoardId: "europe",
    countryIds: ["europe", "switzerland", "norway", "france", "germany", "italy", "uk", "ukraine", "russia", "spain"],
  },
  {
    key: "africa",
    label: { en: "Africa", es: "África", fr: "Afrique", ja: "アフリカ" },
    wholeBoardId: "africa",
    countryIds: ["africa", "egypt",
      "southafrica", "morocco", "ghana"],
  },
  {
    // **南北を分けた。**大陸ぜんぶを走る盤面が「北アメリカ」「南アメリカ」の
    // 2枚あり、1つの束には収まらない。地理としてもこちらが素直。
    key: "northamerica",
    label: { en: "North America", es: "América del Norte", fr: "Amérique du Nord", ja: "北アメリカ" },
    wholeBoardId: "northamerica",
    countryIds: ["northamerica", "canada", "usa", "mexico"],
  },
  {
    key: "southamerica",
    label: { en: "South America", es: "América del Sur", fr: "Amérique du Sud", ja: "南アメリカ" },
    wholeBoardId: "southamerica",
    countryIds: ["southamerica", "peru", "venezuela", "bolivia", "brazil"],
  },
  {
    key: "oceania",
    label: { en: "Oceania", es: "Oceanía", fr: "Océanie", ja: "オセアニア" },
    countryIds: ["australia", "newzealand"],
  },
];

/**
 * 中に入っている盤面。**親を選ぶと、もう一段だけ選び直せる。**
 *
 * 茨城は日本の中、バリはインドネシアの中にある。地図の上では親の札に
 * 重なってしまい、大陸の縮尺では点にしかならないので、
 * **親を押したらそこへ寄って、親と子を並べて選ばせる。**
 *
 * **四隅の重なりから機械的に出してはいけない。**投影の四隅どうしで包含を調べると
 * `korea ⊂ china` が出る(韓国の四隅が中国の四隅の内側に収まるため)。
 * 韓国は中国の一部ではない。**地理の事実は式では出ないので、ここに手で書く。**
 */
export const SUB_BOARDS: Record<string, readonly string[]> = {
  japan: ["ibaraki", "hyakumeizan", "hokkaido", "kyushu"],
  indonesia: ["bali"],
};

/** その盤面が親か(押すと選ぶのではなく、もう一段に降りるか)。 */
export function subBoardsOf(countryId: string, available: ReadonlySet<string>): string[] {
  return (SUB_BOARDS[countryId] ?? []).filter((id) => available.has(id));
}

/** 子として親の中に出る盤面(大陸の一覧には出さない)。 */
export function isSubBoard(countryId: string): boolean {
  return Object.values(SUB_BOARDS).some((children) => children.includes(countryId));
}

/** 絞り込みの帯のいちばん左。**既定はここ。**まず全部見せる。 */
export const ALL_REGIONS: CountryGroup = {
  key: "all",
  label: { en: "All", es: "Todos", fr: "Tous", ja: "ぜんぶ" },
  countryIds: [],
};

/** どの束にも入っていない盤面の行き先。ここに出たら分類漏れ。 */
export const FALLBACK_GROUP: CountryGroup = {
  key: "other",
  label: { en: "Elsewhere", es: "En otra parte", fr: "Ailleurs", ja: "そのほか" },
  countryIds: [],
};

/**
 * 盤面の一覧を、束ごとに並べ直す。
 *
 * 並び順は `COUNTRY_GROUPS` の順、束の中は書いた順。**登録順のままにしない**のは、
 * 新しい盤面を足すたびに並びが変わって、いつもの場所にいつものものが無くなるため。
 */
export function groupCountries<T extends { readonly id: string }>(
  entries: readonly T[],
): { readonly group: CountryGroup; readonly entries: T[] }[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const grouped: { group: CountryGroup; entries: T[] }[] = [];

  for (const group of COUNTRY_GROUPS) {
    const found = group.countryIds.map((id) => byId.get(id)).filter((entry): entry is T => !!entry);
    found.forEach((entry) => byId.delete(entry.id));
    if (found.length > 0) grouped.push({ group, entries: found });
  }

  const rest = [...byId.values()];
  if (rest.length > 0) grouped.push({ group: FALLBACK_GROUP, entries: rest });
  return grouped;
}

/**
 * 札の肩に出す縮尺の印。**同じ大きさの札に、地球全体と県が並ぶ**ので、
 * 何の広さを走るのかが分からないと選べない。
 */
export type BoardScale = "space" | "world" | "country" | "region";

const SCALE_BY_ID: Record<string, BoardScale> = {
  world: "world",
  solarsystem: "space",
  ibaraki: "region",
  bali: "region",
  // 北海道と九州は県より広いが、日本の中の地方なので「国」ではない。
  hokkaido: "region",
  kyushu: "region",
};

export function boardScale(countryId: string): BoardScale {
  return SCALE_BY_ID[countryId] ?? "country";
}

export const SCALE_LABEL: Record<BoardScale, LocalizedText> = {
  space: { en: "Solar system", es: "Sistema solar", fr: "Système solaire", ja: "太陽系" },
  world: { en: "World", es: "Mundo", fr: "Monde", ja: "世界" },
  country: { en: "Country", es: "País", fr: "Pays", ja: "国" },
  region: { en: "Close up", es: "De cerca", fr: "De près", ja: "地方" },
};
