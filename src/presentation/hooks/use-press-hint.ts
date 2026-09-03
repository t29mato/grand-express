"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 絵だけのボタンに名札を出すための、押し方の観察(F-15)。
 *
 * マウスの人は CSS の `:hover`、キーボードの人は `:focus-visible` で名札が出る
 * (`board-feel.css` の `.hint-tip`)。**指で触る人にはそのどちらも無い。**
 * ここでは指のために2つを足す:
 *
 * - **長押し**(`PRESS_HINT_HOLD_MS`)で名札を出し、そのあとの click は飲み込む。
 *   長押しは「これは何?」と訊く操作なので、切り替えてしまわない。
 * - **押したあと**、名札を短く出す(`PRESS_HINT_FLASH_MS`)。切り替えボタンは
 *   押した結果が名札の文(「音楽: OFF」)に出るので、指を離した瞬間に結果が読める。
 *
 * 名札の文そのものは呼び出し側が `data-tip` に置く。ここが返すのは
 * 「いま名札を出しているか」(`data-tip-shown`)と、ボタンに渡す handler だけ。
 */

/** 長押しと見なすまでの時間。OS の文脈メニュー(おおむね 500ms)より先に出す。 */
export const PRESS_HINT_HOLD_MS = 420;
/** 押したあと・長押しを離したあとに名札を残す時間。 */
export const PRESS_HINT_FLASH_MS = 1400;

export interface PressHintProps<E extends Element> {
  onPointerDown: (e: React.PointerEvent<E>) => void;
  onPointerUp: (e: React.PointerEvent<E>) => void;
  onPointerCancel: (e: React.PointerEvent<E>) => void;
  onPointerLeave: (e: React.PointerEvent<E>) => void;
  onContextMenu: (e: React.MouseEvent<E>) => void;
  onClick: (e: React.MouseEvent<E>) => void;
  "data-tip-shown": "true" | undefined;
}

export interface UsePressHintOptions<E extends Element> {
  /** 本来の押したときの処理。長押しのあとの click では呼ばれない。 */
  onClick?: (e: React.MouseEvent<E>) => void;
  /** 押したあとに名札を短く出すか。押しても状態が変わらないものは false にする。 */
  flashOnClick?: boolean;
}

export function usePressHint<E extends Element>({
  onClick,
  flashOnClick = true,
}: UsePressHintOptions<E> = {}): { shown: boolean; flash: () => void; props: PressHintProps<E> } {
  const [shown, setShown] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  /** 直前の押し下げが長押しになったか。次の click を飲み込むための印。 */
  const held = useRef(false);

  const clearHold = () => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  /** 名札を出して、しばらくしたら引っ込める。 */
  const flash = useCallback(() => {
    setShown(true);
    if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      hideTimer.current = null;
      setShown(false);
    }, PRESS_HINT_FLASH_MS);
  }, []);

  useEffect(
    () => () => {
      clearHold();
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    },
    [],
  );

  const onPointerDown = useCallback((e: React.PointerEvent<E>) => {
    // 前の押し下げの印を持ち越さない(pointercancel で click が来ないと、
    // 印が立ったままになり、次の普通のタップまで飲み込んでしまう)。
    held.current = false;
    // マウスには hover があるので、長押しは指とペンだけ。
    if (e.pointerType === "mouse") return;
    clearHold();
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      held.current = true;
      setShown(true);
    }, PRESS_HINT_HOLD_MS);
  }, []);

  const onPointerEnd = useCallback(() => {
    clearHold();
    // 長押しで出した名札は、離してからしばらく残す。
    if (held.current) flash();
  }, [flash]);

  const onContextMenu = useCallback((e: React.MouseEvent<E>) => {
    // 長押しの途中で OS の文脈メニューが出ると、名札が隠れてしまう。
    if (held.current || holdTimer.current !== null) e.preventDefault();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<E>) => {
      if (held.current) {
        // 長押しは「これは何?」なので、切り替えない。
        held.current = false;
        e.preventDefault();
        return;
      }
      onClick?.(e);
      if (flashOnClick) flash();
    },
    [onClick, flashOnClick, flash],
  );

  return {
    shown,
    flash,
    props: {
      onPointerDown,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onPointerLeave: onPointerEnd,
      onContextMenu,
      onClick: handleClick,
      "data-tip-shown": shown ? "true" : undefined,
    },
  };
}
