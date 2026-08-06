import { ComponentType } from "react";
import { BearAttack } from "./bear-attack";

/**
 * 出来事ID → 動く絵。
 *
 * 1件1ファイルにしてここで束ねる。絵は自己完結したSVG(外部の画像もライブラリも
 * 使わない)で、`prefers-reduced-motion` が有効なときは動きを止めること。
 * 登録が無い出来事は汎用の絵にフォールバックするので、少しずつ足していける。
 */
export const EVENT_ANIMATIONS: Readonly<Record<string, ComponentType>> = {
  "shiretoko-bear": BearAttack,
};
