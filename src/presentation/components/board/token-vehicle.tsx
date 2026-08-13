/**
 * 駒の乗り物。**盤面によって変わる。**
 *
 * 既定は蒸気機関車。この遊びは鉄道すごろくなので、ほとんどの盤面はこれでよい。
 *
 * **太陽系の盤面だけは機関車では通らない。**宇宙を「海」、天体を「島」として
 * 組んである盤面で、惑星のあいだを蒸気機関車が走るのは絵として成立しない
 * (遊ぶ人からそう言われた)。探査機に差し替える。
 *
 * 盤面の内容(`*.content.json`)ではなく画面側に置いているのは、乗り物が
 * **絵の話**で、盤面を書く人が決めることではないため。増えるなら
 * `VEHICLE_BY_BOARD` に足す。
 */
export type Vehicle = "train" | "spacecraft";

const VEHICLE_BY_BOARD: Record<string, Vehicle> = {
  solarsystem: "spacecraft",
};

export function vehicleFor(countryId: string): Vehicle {
  return VEHICLE_BY_BOARD[countryId] ?? "train";
}

/** 蒸気機関車。駒の既定の姿。 */
export function TrainBody({ color }: { color: string }) {
  return (
    <>
      {/* 車体 */}
      <path
        d="M-10,4.2V-2.2a2,2 0 0 1 2,-2h5.4v-3.2a1.4,1.4 0 0 1 1.4,-1.4h4.4a1.4,1.4 0 0 1 1.4,1.4v3.2h1.6a4,4 0 0 1 4,4v4.4z"
        fill={color}
        stroke="#1b1330"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* 運転席の窓 */}
      <rect x={-8.2} y={-2.6} width={4.4} height={3.6} rx={0.8} fill="#f6efe2" opacity={0.92} />
      {/* 煙突 */}
      <rect x={4.6} y={-6.4} width={2.6} height={2.6} rx={0.6} fill="#1b1330" />
      {/* 車輪 */}
      <g fill="#1b1330">
        <circle cx={-5.6} cy={5} r={2.4} />
        <circle cx={1.4} cy={5} r={2.4} />
        <circle cx={7} cy={5.4} r={1.8} />
      </g>
      <g fill="#f6efe2" opacity={0.75}>
        <circle cx={-5.6} cy={5} r={0.8} />
        <circle cx={1.4} cy={5} r={0.8} />
      </g>
    </>
  );
}

/**
 * 探査機。太陽系の盤面の駒。
 *
 * **機関車と同じ大きさの枠(横およそ20px・縦およそ16px)に収めている。**
 * 駒の置き場所・影・厄災の神の乗せ方は乗り物によらず同じなので、
 * ここだけ差し替えれば残りはそのまま使える。
 *
 * 太陽電池のパドルを上下に張り出させて、遠目でも機関車と輪郭で見分けられるようにした。
 */
export function SpacecraftBody({ color }: { color: string }) {
  return (
    <>
      {/* 太陽電池のパドル(上下)。輪郭でそれと分かる部分。 */}
      <g fill="#2b4a7a" stroke="#1b1330" strokeWidth={1.1} strokeLinejoin="round">
        <rect x={-5.4} y={-9.2} width={10.8} height={3.2} rx={0.6} />
        <rect x={-5.4} y={6} width={10.8} height={3.2} rx={0.6} />
      </g>
      {/* パドルを胴につなぐ支柱 */}
      <g stroke="#1b1330" strokeWidth={1.2}>
        <line x1={0} y1={-6} x2={0} y2={-3} />
        <line x1={0} y1={3} x2={0} y2={6} />
      </g>
      {/* 胴。進行方向(右)へ細くする。 */}
      <path
        d="M-6,-3.4h9.2l3.6,3.4l-3.6,3.4h-9.2a2,2 0 0 1 -2,-2v-2.8a2,2 0 0 1 2,-2z"
        fill={color}
        stroke="#1b1330"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* 通信のパラボラ。後ろ(左)を向く。 */}
      <g stroke="#1b1330" strokeWidth={1.2}>
        <line x1={-6} y1={0} x2={-8.6} y2={0} />
      </g>
      <path
        d="M-8.6,-3.2a3.4,3.4 0 0 0 0,6.4z"
        fill="#f6efe2"
        stroke="#1b1330"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      {/* 太陽電池のパドルの桟。1本入れるだけで板だと分かる。 */}
      <g stroke="#6f8fc0" strokeWidth={0.8} opacity={0.9}>
        <line x1={-5.4} y1={-7.6} x2={5.4} y2={-7.6} />
        <line x1={-5.4} y1={7.6} x2={5.4} y2={7.6} />
      </g>
    </>
  );
}
