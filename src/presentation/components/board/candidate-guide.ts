import { NodeId } from "../../../domain/shared-kernel/ids";
import { isCityNode } from "../../../domain/board/node";
import { GameSession } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { NodePosition } from "../../hooks/use-board-layout";

/**
 * 行き先の候補を、キーボードと読み上げで扱えるようにするための計算。
 *
 * 描画から切り離してあるのは、**方位の出し方と読み上げ文が正しいかを
 * 盤面を描かずに試験できるようにする**ため(実データの盤面で角度を確かめられる)。
 */

/** 8方位。文言キーとしてそのまま使う。 */
export type DirectionKey = "dirN" | "dirNE" | "dirE" | "dirSE" | "dirS" | "dirSW" | "dirW" | "dirNW";

const DIRECTIONS: readonly DirectionKey[] = ["dirN", "dirNE", "dirE", "dirSE", "dirS", "dirSW", "dirW", "dirNW"];

/**
 * `from` から見た `to` の方位角(北=0、時計回り、ラジアン `[0, 2π)`)。
 *
 * **SVGは下向きがy正**なので、北は `-y` の向きになる。
 * 素直に `atan2(dy, dx)` と書くと南北が入れ替わる。
 */
export function azimuthOf(from: NodePosition, to: NodePosition): number {
  const angle = Math.atan2(to.x - from.x, -(to.y - from.y));
  return angle < 0 ? angle + Math.PI * 2 : angle;
}

/** `from` から見た `to` の8方位。 */
export function directionFrom(from: NodePosition, to: NodePosition): DirectionKey {
  const slice = Math.PI / 4;
  // 北を境目ではなく真ん中にしたいので、半区画ぶん回してから割る。
  const index = Math.round(azimuthOf(from, to) / slice) % 8;
  return DIRECTIONS[index];
}

/**
 * 候補を**現在地から見た方位角で、北から時計回り**に並べる。
 *
 * 盤面のDOM順(都市を後ろに寄せただけの並び)は地図上の位置と関係が無いので、
 * そのまま矢印キーに割り当てると「次」が地図を飛び回る。方位で並べると、
 * 押した向きに進むのと、読み上げの方位が一致する。
 *
 * 位置が取れない候補は末尾に回す(描けていないマスなので、普通は起きない)。
 */
export function orderByAzimuth(
  ids: readonly NodeId[],
  positions: ReadonlyMap<NodeId, NodePosition>,
  origin: NodeId,
): readonly NodeId[] {
  const here = positions.get(origin);
  if (!here) return ids;
  return [...ids].sort((a, b) => {
    const pa = positions.get(a);
    const pb = positions.get(b);
    if (!pa || !pb) return pa ? -1 : pb ? 1 : 0;
    return azimuthOf(here, pa) - azimuthOf(here, pb);
  });
}

/**
 * 矢印キーなどで移る先の番号。扱わないキーなら null。
 *
 * 候補は現在地を囲む輪なので、端で止めずに**回り込ませる**
 * (時計回りに押し続けると一周して戻ってくる)。
 */
export function nextFocusIndex(key: string, index: number, count: number): number | null {
  if (count === 0) return null;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (index + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (index - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

export interface LabelDeps {
  readonly context: GameEngineContext;
  readonly session: GameSession;
  readonly t: (key: string, ...args: (string | number)[]) => string;
  readonly tx: (text: { en: string; es: string; fr: string; ja: string } | undefined) => string;
}

/** そのマスが何のマスか(読み上げ用の短い言葉)。都市なら都市名。 */
function kindLabel({ context, tx, t }: LabelDeps, nodeId: NodeId): string {
  const node = context.getNode(nodeId);
  if (isCityNode(node)) return tx(context.getCity(node.cityId).name);
  return t(node.type === "quiz" ? "sqQuiz" : node.type === "blue" ? "sqBlue" : "sqRed");
}

/**
 * 候補1つぶんの読み上げ文。
 *
 * 入れるのは**方位・マスの種類・目的地までの残り**の3つ。
 * 「何マス先か」は入れない。候補はすべてサイコロの目ちょうどの距離にあるので、
 * どれを読んでも同じ数になり、選ぶ判断の役に立たない。
 * 差が出るのは向きと、目的地に近づくかどうかだけ。
 */
export function candidateLabel(deps: LabelDeps, nodeId: NodeId, direction: DirectionKey): string {
  const { context, session, t, tx } = deps;
  const node = context.getNode(nodeId);
  const where = t(direction);
  const what = kindLabel(deps, nodeId);

  if (isCityNode(node) && node.cityId === session.destination) {
    return t("candidateDest", where, what);
  }
  const remaining = context.distanceToCity(nodeId, session.destination);
  const destName = tx(context.getCity(session.destination).name);
  return t(isCityNode(node) ? "candidateCity" : "candidateSquare", where, what, t("remainingTo", destName, remaining));
}

/**
 * いま自分がどこに居るか(候補が無いときに、盤面を見ずに分かるようにするための一文)。
 *
 * 都市にいる場合と中間マスにいる場合で**文ごと分けている。**
 * 場所の言い方だけを差し替える作りにすると、前置詞の要る言語で崩れる
 * (フランス語で「Vous êtes Paris」= 前置詞なしになっていた)。
 */
export function whereYouAreLabel(deps: LabelDeps, location: NodeId): string {
  const { context, session, t, tx } = deps;
  const node = context.getNode(location);
  const destName = tx(context.getCity(session.destination).name);
  const remaining = t("remainingTo", destName, context.distanceToCity(location, session.destination));
  if (isCityNode(node)) {
    return t("whereYouAreCity", tx(context.getCity(node.cityId).name), remaining);
  }
  return t(
    "whereYouAreBetween",
    tx(context.getCity(node.between[0]).name),
    tx(context.getCity(node.between[1]).name),
    remaining,
  );
}

/** 移動した先を読み上げに伝える一文。こちらも都市と中間マスで文を分ける。 */
export function movedToLabel(deps: LabelDeps, location: NodeId): string {
  const { context, t, tx } = deps;
  const node = context.getNode(location);
  if (isCityNode(node)) return t("arrivedAtCity", tx(context.getCity(node.cityId).name));
  return t(
    "arrivedBetween",
    tx(context.getCity(node.between[0]).name),
    tx(context.getCity(node.between[1]).name),
  );
}
