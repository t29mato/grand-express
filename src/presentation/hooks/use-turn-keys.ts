"use client";

import { useEffect, useRef } from "react";

/**
 * 手番を進めるキー(F-18)。**Space = 振る／次へ。**
 *
 * ## 計測したこと
 *
 * 実プレイで「Space でサイコロが振れた」と観察されたが、これは意図した割り当てではなく、
 * `#die` が本物の `<button>` なので**フォーカスが残っていたときだけ**ブラウザが
 * 押してくれていた。Playwright で確かめると:
 *
 * - フォーカスが body にあるとき Space → 何も起きない(候補 0、サイコロは押せるまま)。
 * - Tab で `#die` に乗ってから Space → 振れる(ブラウザ標準の button 操作)。
 * - マウスでサイコロを押すと、押した瞬間に disabled になってフォーカスが body に落ちる。
 *   行き先を Enter で決めたあとも body に落ちる。**つまり次の手番では毎回 Tab で
 *   サイコロまで戻る必要があった。**
 *
 * ここで Space を正式な割り当てにする。フォーカスがどこにあっても、
 * 振れる場面なら振り、モーダルが開いていれば「次へ」を押す。
 *
 * ## 押さないとき
 *
 * - 別のボタンや入力欄にフォーカスがあるとき(そのボタンを Space で押すのが標準で、
 *   ここが横取りすると「音楽ボタンを押したらサイコロが振れた」になる)。
 * - 修飾キー付き・長押しの自動連打(`repeat`)。
 * - 行き先を選んでいるあいだ(候補側の担当。`board-view.tsx` が Space を候補への
 *   フォーカス移動と決定に使う)。
 */
export interface TurnKeysOptions {
  /** いま Space でサイコロを振ってよいか(自分の手番で、まだ振っていない)。 */
  canRoll: boolean;
  onRoll: () => void;
  /**
   * 「次へ」。省略すると、開いているモーダルの進むボタンを DOM から探して押す
   * (`advanceOpenModal`)。画面側が `ui.kind` から閉じる関数を選べるなら、そちらを渡す。
   * 進めたら true を返す(preventDefault の判断に使う)。
   */
  onAdvance?: () => boolean;
}

/** Space かどうか。古いブラウザは "Spacebar" を返す。 */
export function isSpaceKey(e: KeyboardEvent): boolean {
  return e.key === " " || e.key === "Spacebar";
}

/**
 * そのキー操作をブラウザ(あるいはその要素)に任せるべき相手か。
 * ボタン・リンク・入力欄の上では Space はその要素のものなので、横取りしない。
 * `aside[tabindex="0"]` のような「スクロールのために止まれるだけ」の要素は含めない。
 */
export function isNativeKeyTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return (
    target.closest(
      'button, a[href], input, select, textarea, summary, [contenteditable=""], [contenteditable="true"], [role="button"], [role="option"], [role="menuitem"], [role="tab"]',
    ) !== null
  );
}

/**
 * 開いているモーダルの「次へ」を押す。押せたら true。
 *
 * モーダルには focus の受け渡しが無く、開いた瞬間にフォーカスは body に落ちている。
 * 進むボタンは `.btnrow` の中の `.btn`(選択肢の `.btn.opt` は除く)で、
 * **1つに決まるときだけ**押す。クイズや出目選びのように選ぶものが並ぶ画面では、
 * Space が勝手に答えを選んではいけないので何もしない。
 */
export function advanceOpenModal(root: ParentNode = document): boolean {
  const boxes = root.querySelectorAll(".overlay.show .modal-box");
  const box = boxes[boxes.length - 1];
  if (!box) return false;
  const buttons = [...box.querySelectorAll<HTMLButtonElement>(".btnrow > button.btn:not(.opt)")].filter(
    (button) => !button.disabled,
  );
  if (buttons.length !== 1) return false;
  buttons[0].click();
  return true;
}

export function useTurnKeys({ canRoll, onRoll, onAdvance }: TurnKeysOptions): void {
  // 描画のたびに listener を付け替えないよう、最新の値は ref から読む
  // (描画中に ref を書かない決まりなので、効果で写す)。
  const latest = useRef({ canRoll, onRoll, onAdvance });
  useEffect(() => {
    latest.current = { canRoll, onRoll, onAdvance };
  }, [canRoll, onRoll, onAdvance]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isSpaceKey(e) || e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
      if (isNativeKeyTarget(e.target)) return;
      const { canRoll, onRoll, onAdvance } = latest.current;
      if (canRoll) {
        e.preventDefault();
        onRoll();
        return;
      }
      if (document.querySelector("svg.board-svg g[data-choosable='true']")) return;
      const advanced = onAdvance ? onAdvance() : advanceOpenModal();
      if (advanced) e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
