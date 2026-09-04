"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion } from "../../state/motion-preference";
import {
  AtlasView,
  MAX_SPAN,
  MIN_SPAN,
  WORLD_VIEW,
  clampSpan,
  clampView,
  spanHeight,
} from "./atlas-projection";

/**
 * 地図帳のカメラ。**寄り引きは連続**——段はどこにも無く、`span`(見えている
 * 経度の幅)を細かく変えるだけ。
 *
 * ## `use-camera.ts` をそのまま使わなかった理由
 *
 * 盤面のカメラ(`src/presentation/hooks/use-camera.ts`)は、
 *
 * 1. **`MIN_WIDTH = 300` で寄りが止まる。**盤面の絵の座標(3703×1210など)を
 *    前提にした値で、地図帳の座標(度)では 300度=ほぼ世界ぜんぶ。
 *    地図帳は 360度から 0.25度まで**1400倍**寄る必要がある。
 * 2. **`zoomBy` は画面の中心を保つ。**地図帳は Google マップと同じく
 *    **指やポインタの下の点を保つ**必要がある(中心固定だと、寄るたびに
 *    見たかったものが画面の外へ逃げる)。
 * 3. 盤面の四隅に貼りつく `clamp` を持っていて、経度緯度の丸い世界とは
 *    合わない(日付変更線をまたぐ盤面がある)。
 *
 * イージングと「アニメーション中も最新の値を ref で持つ」やりかたは
 * `use-camera.ts` から引き継いでいる。
 */

function easeInOutQuad(k: number): number {
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

/** ホイール1目盛りぶんの倍率。細かく効かせて、段差を感じさせない。 */
const WHEEL_STEP = 0.0016;
/** ボタン・キーボードの1押しぶん。 */
export const STEP_FACTOR = 1.6;

export interface AtlasCamera {
  readonly view: AtlasView;
  readonly aspect: number;
  /** 枠の実寸(ピクセル)。印の大きさを画面基準に保つのに使う。 */
  readonly sizePx: { readonly width: number; readonly height: number };
  /** 枠の実寸を知らせる(ResizeObserver から)。 */
  setSize: (width: number, height: number) => void;
  /**
   * **これ以上は寄らせない**という `span` を知らせる(`minSpanForBoard`)。
   * いま真下にある盤面の細かさで決まるので、動かすたびに変わりうる。
   */
  setMinSpan: (span: number) => void;
  /** 画面上のピクセル移動ぶんだけ即座に動かす(ドラッグ用)。 */
  panByPixels: (dxPx: number, dyPx: number) => void;
  /**
   * 枠の中の一点(左上からの割合 0〜1)を動かさずに拡大縮小する。
   * `factor` が1より小さいと寄る。
   */
  zoomAt: (factor: number, fx: number, fy: number) => void;
  /** そこへ滑らかに移る。「視差効果を減らす」設定なら瞬間移動。 */
  flyTo: (lon: number, lat: number, span: number, ms?: number) => void;
  /** 世界ぜんぶへ戻る。 */
  reset: () => void;
  /** 進行中の移動を止める(手の操作を優先する)。 */
  stop: () => void;
}

export function useAtlasCamera(initial: AtlasView = WORLD_VIEW): AtlasCamera {
  const [sizePx, setSizePx] = useState({ width: 0, height: 0 });
  const [view, setView] = useState<AtlasView>(initial);
  const viewRef = useRef(view);
  const frameRef = useRef<number | null>(null);
  // ドラッグの最中に関数が作り直されると掴みが途切れるので、
  // 枠の実寸は依存に入れず ref 越しに読む。
  const sizePxRef = useRef(sizePx);
  const minSpanRef = useRef(MIN_SPAN);

  // 枠が測れていないうちは 16:9 とみなす(`atlas-projection.ts` の既定と同じ)。
  const aspect = sizePx.width > 0 && sizePx.height > 0 ? sizePx.width / sizePx.height : 16 / 9;
  const aspectRef = useRef(aspect);

  // **描いている最中に ref を書き換えない。**書き換えは描き終わってから行う
  // (React の `react-hooks/refs` が禁じている。読むのはどれも操作の最中なので、
  //  1フレーム遅れても困らない)。
  useEffect(() => {
    sizePxRef.current = sizePx;
    aspectRef.current = aspect;
  }, [sizePx, aspect]);

  const apply = useCallback((next: AtlasView) => {
    const clamped = clampView(next, aspectRef.current);
    viewRef.current = clamped;
    setView(clamped);
  }, []);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const setSize = useCallback((width: number, height: number) => {
    setSizePx((current) =>
      current.width === width && current.height === height ? current : { width, height },
    );
  }, []);

  /**
   * いま真下にある盤面で決まる寄りの限界。**状態にはしない。**
   * 状態にすると、地図を動かすたびに再描画が1回増えるうえ、
   * 「限界が変わったから眺めも直す」という循環に踏み込む。
   * 効かせるのは寄る操作の中だけなので、ref で足りる。
   */
  const setMinSpan = useCallback((span: number) => {
    minSpanRef.current = Number.isFinite(span) ? Math.max(MIN_SPAN, span) : MIN_SPAN;
  }, []);

  const panByPixels = useCallback(
    (dxPx: number, dyPx: number) => {
      const width = sizePxRef.current.width;
      if (!(width > 0)) return;
      const current = viewRef.current;
      const perPixel = current.span / width;
      apply({
        lon: current.lon - dxPx * perPixel,
        lat: current.lat + dyPx * perPixel,
        span: current.span,
      });
    },
    [apply],
  );

  const zoomAt = useCallback(
    (factor: number, fx: number, fy: number) => {
      const current = viewRef.current;
      /*
        **寄る側だけ、いま真下にある盤面の細かさで止める。**引く側は止めない。
        すでに限界より寄っている眺め(県の盤面から親の国へ流れてきたとき)を
        押し戻すこともしない。押し戻すと、**地図を横へ動かしただけで
        いきなり引かれる**という、頼んでいない動きになる。
      */
      const floor = factor < 1 ? Math.min(minSpanRef.current, current.span) : MIN_SPAN;
      const nextSpan = Math.max(floor, clampSpan(current.span * factor));
      if (nextSpan === current.span) return;

      const a = aspectRef.current;
      const height = spanHeight(current.span, a);
      const nextHeight = spanHeight(nextSpan, a);
      // 枠の中心から見た、掴んでいる点のずれ(割合)。
      const ox = Number.isFinite(fx) ? fx - 0.5 : 0;
      const oy = Number.isFinite(fy) ? fy - 0.5 : 0;
      // その点の経度緯度を変えないように中心をずらす。
      apply({
        lon: current.lon + ox * (current.span - nextSpan),
        lat: current.lat - oy * (height - nextHeight),
        span: nextSpan,
      });
    },
    [apply],
  );

  const flyTo = useCallback(
    (lon: number, lat: number, span: number, ms = 620) => {
      stop();
      const target = clampView({ lon, lat, span }, aspectRef.current);
      // 「視差効果を減らす」設定では、動かさずに着く。待ち時間だけ残すと
      // 固まったように見える(`motion-preference.ts` の但し書きと同じ理由)。
      if (prefersReducedMotion() || ms <= 0) {
        apply(target);
        return;
      }
      const start = viewRef.current;
      // 寄り引きは**対数で**混ぜる。線形にすると、遠くから寄るとき
      // 最初だけ猛烈に速く、着く直前がだらだら遅くなる。
      const logStart = Math.log(clampSpan(start.span));
      const logEnd = Math.log(target.span);
      const t0 = performance.now();

      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        const e = easeInOutQuad(k);
        apply({
          lon: start.lon + (target.lon - start.lon) * e,
          lat: start.lat + (target.lat - start.lat) * e,
          span: Math.exp(logStart + (logEnd - logStart) * e),
        });
        frameRef.current = k < 1 ? requestAnimationFrame(step) : null;
      };
      frameRef.current = requestAnimationFrame(step);
    },
    [apply, stop],
  );

  const reset = useCallback(() => flyTo(WORLD_VIEW.lon, WORLD_VIEW.lat, MAX_SPAN), [flyTo]);

  // 枠の比が変わったら、はみ出した中心を戻す。
  useEffect(() => {
    apply(viewRef.current);
  }, [aspect, apply]);

  useEffect(() => stop, [stop]);

  return useMemo(
    () => ({ view, aspect, sizePx, setSize, setMinSpan, panByPixels, zoomAt, flyTo, reset, stop }),
    [view, aspect, sizePx, setSize, setMinSpan, panByPixels, zoomAt, flyTo, reset, stop],
  );
}

/**
 * 地図の上での指とポインタ。**ホイールは React の `onWheel` では止められない**
 * (React はホイールを passive で拾うので `preventDefault()` が効かず、
 * 地図を寄せるたびにページごとスクロールする)。ここで直に貼る。
 */
export function useAtlasGestures(
  camera: AtlasCamera,
  elementRef: React.RefObject<SVGSVGElement | null>,
): void {
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    /** 枠の中の割合(左上0,0 右下1,1)。枠が測れないときは中心とみなす。 */
    const fractionOf = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      if (!(rect.width > 0) || !(rect.height > 0)) return { fx: 0.5, fy: 0.5 };
      return { fx: (clientX - rect.left) / rect.width, fy: (clientY - rect.top) / rect.height };
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      cameraRef.current.stop();
      // 端末によって単位が違う(ピクセル/行/ページ)。行とページは目安で換算する。
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1;
      const delta = event.deltaY * unit;
      if (!Number.isFinite(delta) || delta === 0) return;
      const { fx, fy } = fractionOf(event.clientX, event.clientY);
      // 1回で飛びすぎないように上限を置く(トラックパッドは値が大きい)。
      const factor = Math.exp(Math.max(-1, Math.min(1, delta * WHEEL_STEP)));
      cameraRef.current.zoomAt(factor, fx, fy);
    };

    /** 触っている指(またはマウス)。2本あればピンチ。 */
    const pointers = new Map<number, { x: number; y: number }>();
    let pinchDistance = 0;
    let lastTapAt = 0;
    let movedSincePress = 0;
    /** 直前の操作が「掴んで動かした」だったか。押しただけなら偽。 */
    let draggedLast = false;

    const distanceOf = () => {
      const [a, b] = [...pointers.values()];
      if (!a || !b) return 0;
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const midpointOf = () => {
      const [a, b] = [...pointers.values()];
      if (!a || !b) return { x: 0, y: 0 };
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };

    const onPointerDown = (event: PointerEvent) => {
      /*
        **押せるものの上からでも地図は掴める。**
        はじめ「町の印や盤面の名前の上では掴まない」としていたが、盤面の名前は
        たいてい画面の真ん中に置かれるので、**日本へ寄って画面の中央から
        ドラッグすると1ミリも動かなかった**(撮って分かった)。
        掴みは常に始めて、指を離すときに「動かしたのか、押しただけなのか」で
        分ける(動かしたなら、そのあとの click を握りつぶす)。
      */
      cameraRef.current.stop();
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      movedSincePress = 0;
      if (pointers.size === 2) pinchDistance = distanceOf();
    };

    const onPointerMove = (event: PointerEvent) => {
      const previous = pointers.get(event.pointerId);
      if (!previous) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (pointers.size >= 2) {
        const next = distanceOf();
        if (pinchDistance > 0 && next > 0) {
          const { x, y } = midpointOf();
          const { fx, fy } = fractionOf(x, y);
          cameraRef.current.zoomAt(pinchDistance / next, fx, fy);
        }
        pinchDistance = next;
        return;
      }

      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      movedSincePress += Math.abs(dx) + Math.abs(dy);
      cameraRef.current.panByPixels(dx, dy);
    };

    const endPointer = (event: PointerEvent) => {
      const wasDragging = pointers.has(event.pointerId);
      pointers.delete(event.pointerId);
      pinchDistance = pointers.size === 2 ? distanceOf() : 0;
      draggedLast = movedSincePress > 8;
      if (!wasDragging || draggedLast) return;

      // ダブルタップで寄る。マウスの dblclick は別に拾うので、指のときだけ。
      if (event.pointerType === "touch") {
        const now = performance.now();
        if (now - lastTapAt < 320) {
          const { fx, fy } = fractionOf(event.clientX, event.clientY);
          cameraRef.current.zoomAt(1 / (STEP_FACTOR * STEP_FACTOR), fx, fy);
          lastTapAt = 0;
        } else {
          lastTapAt = now;
        }
      }
    };

    const onDoubleClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.("[data-atlas-hit]")) return;
      const { fx, fy } = fractionOf(event.clientX, event.clientY);
      cameraRef.current.zoomAt(1 / (STEP_FACTOR * STEP_FACTOR), fx, fy);
    };

    /**
     * 動かしたあとの click は握りつぶす。**地図を掴んで動かした先に町があると、
     * 指を離した拍子にその町の札が開いてしまう。**
     * 捕まえる段(capture)で止めるので、印や名前の `onClick` までは届かない。
     */
    const swallowClickAfterDrag = (event: MouseEvent) => {
      if (!draggedLast) return;
      draggedLast = false;
      event.stopPropagation();
      event.preventDefault();
    };

    /*
      **`setPointerCapture` は使わない。**掴んだ瞬間にSVGへ捕まえさせると、
      そのあとの `click` までSVGに届いてしまい、**町の印を押しても札が開かなく
      なった**(印の `onClick` まで下りてこない)。
      代わりに動きと離しを window で聞く。枠の外まで指が出ても掴みは続く。
    */
    element.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("click", swallowClickAfterDrag, true);
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endPointer);
    window.addEventListener("pointercancel", endPointer);
    return () => {
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("click", swallowClickAfterDrag, true);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
    };
  }, [elementRef]);
}

/** キーボードで地図を動かす。矢印で進み、`+`/`-` で寄り引き、`0` で世界へ。 */
export function atlasKeyAction(key: string): "left" | "right" | "up" | "down" | "in" | "out" | "world" | null {
  switch (key) {
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "+":
    case "=":
      return "in";
    case "-":
    case "_":
      return "out";
    case "0":
      return "world";
    default:
      return null;
  }
}

export { MIN_SPAN, MAX_SPAN };
