import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 盤面カメラ(viewBoxのパン/ズーム)。現行コードの `CAM`/`camTo`/`clampCam` を
 * Reactのフックとして移植したもの(イージング関数・定数は原作と同じ)。
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
}

const MIN_WIDTH = 300;

export function useCamera({ boardWidth, boardHeight }: UseCameraOptions): UseCameraResult {
  const [camera, setCamera] = useState<CameraState>({ x: 0, y: 0, w: boardWidth });
  const animationRef = useRef<number | null>(null);

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

  const animateTo = useCallback(
    (cx: number, cy: number, wRequested: number, ms = 560) => {
      const w = Math.max(MIN_WIDTH, Math.min(boardWidth + 80, wRequested));
      const h = (w * boardHeight) / boardWidth;
      const [x, y] = clamp(cx - w / 2, cy - h / 2, w);

      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      const start = camera;
      const t0 = performance.now();

      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        const e = easeInOutQuad(k);
        setCamera({
          x: start.x + (x - start.x) * e,
          y: start.y + (y - start.y) * e,
          w: start.w + (w - start.w) * e,
        });
        animationRef.current = k < 1 ? requestAnimationFrame(step) : null;
      };
      animationRef.current = requestAnimationFrame(step);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardWidth, boardHeight, clamp],
  );

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const viewBoxHeight = (camera.w * boardHeight) / boardWidth;
  const viewBox = `${camera.x.toFixed(1)} ${camera.y.toFixed(1)} ${camera.w.toFixed(1)} ${viewBoxHeight.toFixed(1)}`;

  return { camera, viewBox, animateTo };
}
