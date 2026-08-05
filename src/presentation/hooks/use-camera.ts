import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 盤面カメラ(viewBoxのパン/ズーム)。現行コードの `CAM`/`camTo`/`clampCam` と
 * ドラッグによる手動パン(`pointerdown`/`pointermove`)をReactのフックとして
 * 移植したもの(イージング関数・定数は原作と同じ)。
 */
export interface CameraState {
  readonly x: number;
  readonly y: number;
  readonly w: number;
}

function easeInOutQuad(k: number): number {
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

export interface UseCameraOptions {
  boardWidth: number;
  boardHeight: number;
}

export interface UseCameraResult {
  camera: CameraState;
  viewBox: string;
  /** 指定した中心座標・幅へアニメーションしながら移動する。 */
  animateTo: (cx: number, cy: number, w: number, ms?: number) => void;
  /**
   * 画面上のピクセル移動量ぶんだけ即座にパンする(ドラッグ操作用)。
   * `viewportWidthPx` は盤面SVGの実際の表示幅で、viewBox幅との比から
   * ピクセル→盤面座標の換算を行う(現行コードの `k=CAM.w/boardEl.clientWidth`)。
   */
  panByPixels: (dxPx: number, dyPx: number, viewportWidthPx: number) => void;
  /** 現在の中心を保ったまま拡大縮小する(1未満で拡大、1より大きいと縮小)。 */
  zoomBy: (factor: number) => void;
  /** 進行中のカメラアニメーションを止める(手動操作を優先させるため)。 */
  stopAnimation: () => void;
}

const MIN_WIDTH = 300;

export function useCamera({ boardWidth, boardHeight }: UseCameraOptions): UseCameraResult {
  const [camera, setCamera] = useState<CameraState>({ x: 0, y: 0, w: boardWidth });
  const animationRef = useRef<number | null>(null);
  // アニメーション中でも常に最新のカメラ位置を参照できるようにする
  // (`animateTo` がstate経由の古い値を掴んでしまうのを防ぐ)。
  const cameraRef = useRef(camera);

  const applyCamera = useCallback((next: CameraState) => {
    cameraRef.current = next;
    setCamera(next);
  }, []);

  const clamp = useCallback(
    (x: number, y: number, w: number): [number, number] => {
      const h = (w * boardHeight) / boardWidth;
      return [
        Math.max(-40, Math.min(boardWidth - w + 40, x)),
        Math.max(-40, Math.min(boardHeight - h + 40, y)),
      ];
    },
    [boardWidth, boardHeight],
  );

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const animateTo = useCallback(
    (cx: number, cy: number, wRequested: number, ms = 560) => {
      const w = Math.max(MIN_WIDTH, Math.min(boardWidth + 80, wRequested));
      const h = (w * boardHeight) / boardWidth;
      const [x, y] = clamp(cx - w / 2, cy - h / 2, w);

      stopAnimation();
      const start = cameraRef.current;
      const t0 = performance.now();

      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        const e = easeInOutQuad(k);
        applyCamera({
          x: start.x + (x - start.x) * e,
          y: start.y + (y - start.y) * e,
          w: start.w + (w - start.w) * e,
        });
        animationRef.current = k < 1 ? requestAnimationFrame(step) : null;
      };
      animationRef.current = requestAnimationFrame(step);
    },
    [boardWidth, boardHeight, clamp, applyCamera, stopAnimation],
  );

  const panByPixels = useCallback(
    (dxPx: number, dyPx: number, viewportWidthPx: number) => {
      if (viewportWidthPx <= 0) return;
      const current = cameraRef.current;
      const scale = current.w / viewportWidthPx;
      const [x, y] = clamp(current.x - dxPx * scale, current.y - dyPx * scale, current.w);
      applyCamera({ ...current, x, y });
    },
    [clamp, applyCamera],
  );

  const zoomBy = useCallback(
    (factor: number) => {
      const current = cameraRef.current;
      const w = Math.max(MIN_WIDTH, Math.min(boardWidth + 80, current.w * factor));
      const h = (w * boardHeight) / boardWidth;
      // 表示中心を保ったままズームする。
      const cx = current.x + current.w / 2;
      const cy = current.y + (current.w * boardHeight) / boardWidth / 2;
      const [x, y] = clamp(cx - w / 2, cy - h / 2, w);
      applyCamera({ x, y, w });
    },
    [boardWidth, boardHeight, clamp, applyCamera],
  );

  useEffect(() => stopAnimation, [stopAnimation]);

  const viewBoxHeight = (camera.w * boardHeight) / boardWidth;
  const viewBox = `${camera.x.toFixed(1)} ${camera.y.toFixed(1)} ${camera.w.toFixed(1)} ${viewBoxHeight.toFixed(1)}`;

  return { camera, viewBox, animateTo, panByPixels, zoomBy, stopAnimation };
}
