"use client";

import { useEffect } from "react";
import { soundAdapter } from "../state/game-store-dependencies";
import { useGameStore } from "../state/game-store";

/** 「最初の操作」とみなすイベント。マウス・タップ・キーボードのどれでもよい。 */
const GESTURE_EVENTS = ["pointerdown", "keydown"] as const;

/**
 * トップ画面のテーマ曲を、**最初のユーザー操作のあとに**鳴らし始める。
 *
 * ブラウザの自動再生ポリシーにより、画面を開いた瞬間には音を出せない
 * (AudioContextがsuspendedのままになり、何も鳴らないまま「鳴らしたつもり」になる)。
 * そのため画面に来た時点では待ち受けだけを置き、言語切替でも国選びでも、
 * 最初に何か触られた時点で鳴らし始める。
 *
 * ゲームが始まって画面を離れるときは止めない。`startNewGame` が続けて
 * `setCountry()` + `setRegion()` を呼ぶので、そのまま国のBGMへ入れ替わる。
 * ゲーム以外の理由で離れるとき(リリースノートなど別のページへ移るとき)は止める。
 * 「New game」で戻ってきたときも音楽は止まっているが、このフックが張り直されるので、
 * 次に何か触れば再びテーマ曲が鳴る。
 */
export function useTitleMusic(): void {
  useEffect(() => {
    const startOnFirstGesture = () => {
      removeListeners();
      soundAdapter.startTitleMusic();
    };
    const removeListeners = () => {
      for (const type of GESTURE_EVENTS) window.removeEventListener(type, startOnFirstGesture);
    };
    for (const type of GESTURE_EVENTS) window.addEventListener(type, startOnFirstGesture);
    return () => {
      removeListeners();
      // ゲームが始まったのなら、このあと国のBGMが引き継ぐので止めない。
      if (useGameStore.getState().session === null) soundAdapter.stopMusic();
    };
  }, []);
}
