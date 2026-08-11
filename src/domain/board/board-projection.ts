import { City } from "./city";

/**
 * 国コンテンツごとの地理投影パラメータ。現行コードの `G.proj` に相当。
 * 中間マス(quiz/blue/red/card)の生成数は、都市間の投影後距離に基づいて決まる
 * ため、盤面トポロジーを決定するドメイン知識として扱う
 * (見た目の座標そのものはPresentation層が別途計算する。ADR-0003参照)。
 */
export interface CountryProjection {
  readonly boardWidth: number;
  readonly boardHeight: number;
  readonly lon0: number;
  readonly lon1: number;
  readonly lat0: number;
  readonly lat1: number;
  /** 中間マス1個あたりの目安距離(px相当)。省略時は64。 */
  readonly segmentLength?: number;
}

/**
 * 経緯度を盤面座標へ落とす。
 * 盤面の描画・配置・テストで同じ式を使うため、ここだけに置く。
 */
export function projectPoint(
  longitude: number,
  latitude: number,
  projection: CountryProjection,
): { readonly x: number; readonly y: number } {
  return { x: projectX(longitude, projection), y: projectY(latitude, projection) };
}

function projectX(longitude: number, projection: CountryProjection): number {
  const { lon0, lon1, boardWidth } = projection;
  return ((longitude - lon0) / (lon1 - lon0)) * boardWidth;
}

function projectY(latitude: number, projection: CountryProjection): number {
  const { lat0, lat1, boardHeight } = projection;
  return ((latitude - lat0) / (lat1 - lat0)) * boardHeight;
}

/** 2都市間の投影後ユークリッド距離。 */
export function projectedDistance(
  a: City,
  b: City,
  projection: CountryProjection,
): number {
  const ax = projectX(a.longitude, projection);
  const ay = projectY(a.latitude, projection);
  const bx = projectX(b.longitude, projection);
  const by = projectY(b.latitude, projection);
  return Math.hypot(bx - ax, by - ay);
}

/**
 * 1つの路線に生成する中間マスの数(1〜9個)。**必ず1つは挟む**(下の本文を参照)。
 *
 * きっかけは「サイコロは1なのに2マス分進めている」という報告で、原因は
 * 同じ「1マス」が路線によって別の長さで描かれていたこと。日本では 8.6px
 * (横浜—鎌倉)から 128.6px まで **14.9倍**の開きがあった。
 *
 * 上限を5から9へ広げたのはそのため(長い路線が少ないマスで間延びしていた)。
 * いっぽう下限を0にする——近すぎる町を直結にする——のは**試して、戻した。**
 * 理由は本文のコメントに書いてある。
 */
export function segmentCount(
  distance: number,
  projection: CountryProjection,
): number {
  const segmentLength = projection.segmentLength ?? 64;
  /**
   * **町どうしを直結にしてはいけない。**
   *
   * 「1マスの見た目の長さが路線ごとに最大22倍違う」という指摘に対して、
   * 一度 `distance < segmentLength * 0.75` なら 0 を返す(=直結)ようにした。
   * 見た目のばらつきは減ったが、**遊びが壊れた。**
   *
   * 直結にすると町から町へ1歩で渡れる。世界一周では96本中36本が直結になり、
   * ヨーロッパの密集地帯を数珠つなぎに移動できてしまう。実測で、
   * ロンドンから出目5でモスクワにもマラケシュにも届き、
   * 「amsterdam → paris → london → amsterdam → paris」のように
   * **同じ町を行き来して歩数を消化する**経路まで現れた。
   *
   * **見た目のばらつきより、歩数の意味のほうが大事。**必ず1つは挟む。
   * 上限だけ上げてある(長い路線がマス1個で済んでいた分を緩和)。
   */
  return Math.max(1, Math.min(9, Math.round(distance / segmentLength)));
}
