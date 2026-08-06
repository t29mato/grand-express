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
  /**
   * 盤面を表示している枠の縦横比(幅÷高さ)。
   * viewBox の高さをこの比から決めることで、**枠いっぱいに盤面が映る**。
   * 盤面自身の比で決めると、枠と比が違うぶん上下または左右に余白が出てしまう。
   * 未測定(0以下)のときは盤面の比にフォールバックする。
   */
  viewportAspect?: number;
}

export interface UseCameraResult {
  camera: CameraState;
  viewBox: string;
  /**
   * 盤面全体が収まる最小のviewBox幅。
   * 枠が盤面より横長なら盤面の幅で足りるが、枠が縦長寄りだと
   * 高さを収めるためにより広いviewBox幅が要る(左右に海が余る)。
   */
  fitWidth: number;
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

export function useCamera({ boardWidth, boardHeight, viewportAspect }: UseCameraOptions): UseCameraResult {
  // viewBox の高さを決める比。枠が未測定なら盤面の比を使う。
  const aspect = viewportAspect && viewportAspect > 0 ? viewportAspect : boardWidth / boardHeight;
  // 盤面全体を映すのに要るviewBox幅。枠が縦長なら盤面幅より広くなる。
  const fitWidth = Math.max(boardWidth, boardHeight * aspect);
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
      const h = w / aspect;
      // 見えている範囲が盤面より広い軸は、端に寄せず中央に置く
      // (寄せると盤面の反対側に海だけの帯ができてしまう)。
      const clampAxis = (value: number, boardSize: number, viewSize: number) =>
        viewSize >= boardSize
          ? (boardSize - viewSize) / 2
          : Math.max(-40, Math.min(boardSize - viewSize + 40, value));
      return [clampAxis(x, boardWidth, w), clampAxis(y, boardHeight, h)];
    },
    [boardWidth, boardHeight, aspect],
  );

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const animateTo = useCallback(
    (cx: number, cy: number, wRequested: number, ms = 560) => {
      const w = Math.max(MIN_WIDTH, Math.min(fitWidth + 80, wRequested));
      const h = w / aspect;
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
    [fitWidth, aspect, clamp, applyCamera, stopAnimation],
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
      const w = Math.max(MIN_WIDTH, Math.min(fitWidth + 80, current.w * factor));
      const h = w / aspect;
      // 表示中心を保ったままズームする。
      const cx = current.x + current.w / 2;
      const cy = current.y + current.w / aspect / 2;
      const [x, y] = clamp(cx - w / 2, cy - h / 2, w);
      applyCamera({ x, y, w });
    },
    [fitWidth, aspect, clamp, applyCamera],
  );

  useEffect(() => stopAnimation, [stopAnimation]);

  const viewBoxHeight = camera.w / aspect;
  const viewBox = `${camera.x.toFixed(1)} ${camera.y.toFixed(1)} ${camera.w.toFixed(1)} ${viewBoxHeight.toFixed(1)}`;

  return { camera, viewBox, fitWidth, animateTo, panByPixels, zoomBy, stopAnimation };
}
