/** CPUの強さ3段階(現行コードの `cpuLv` 0/1/2、UI表記は Gentle/Normal/Merciless)。 */
export type CpuLevel = "gentle" | "normal" | "merciless";

export interface CpuTuning {
  /** クイズ正答率。 */
  readonly accuracy: number;
  /** 現金をどれだけ手元に残そうとするか。 */
  readonly keepCash: number;
  /** 投資への積極性(0〜1)。 */
  readonly investAggressiveness: number;
  /** マス選択スコアに乗るノイズ幅。 */
  readonly scoreNoise: number;
  /** アイテムを使う確率。 */
  readonly itemUseChance: number;
}

/** 現行コードの `CPU` テーブル(0/1/2)をそのまま移植。 */
export const CPU_TUNING: Readonly<Record<CpuLevel, CpuTuning>> = {
  gentle: { accuracy: 0.45, keepCash: 640, investAggressiveness: 0.1, scoreNoise: 26, itemUseChance: 0.25 },
  normal: { accuracy: 0.65, keepCash: 280, investAggressiveness: 0.35, scoreNoise: 8, itemUseChance: 0.55 },
  merciless: { accuracy: 0.88, keepCash: 120, investAggressiveness: 0.7, scoreNoise: 0, itemUseChance: 0.8 },
};
