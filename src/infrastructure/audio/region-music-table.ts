/**
 * 地方ごとの和音(トライアド)とテンポ。現行コードの `Snd` エンジンが使う
 * `BOLIVIA.styles` / `JAPAN.styles` の最初のコード進行(`ch[0]`)とbpm/lead楽器を
 * そのまま書き起こしたもの(本格的な拍単位のスケジューリングエンジンは移植せず、
 * 通過した地方のコードを1回鳴らす簡易的なアンビエント表現に留めている。
 * 詳細は docs/90-migration/03-as-built-status.md のPhase8欄を参照)。
 */
export interface RegionMusicProfile {
  readonly bpm: number;
  readonly lead: "flute" | "pluck";
  /** トライアドの周波数(Hz)。legacyの `ch[0].n` と同じ値。 */
  readonly chord: readonly [number, number, number];
}

export const REGION_MUSIC: Readonly<Record<string, RegionMusicProfile>> = {
  // Bolivia
  alt: { bpm: 100, lead: "flute", chord: [220, 261.63, 329.63] },
  val: { bpm: 112, lead: "flute", chord: [293.66, 369.99, 440] },
  ama: { bpm: 124, lead: "pluck", chord: [261.63, 329.63, 392] },
  cha: { bpm: 88, lead: "flute", chord: [220, 261.63, 329.63] },
  // Japan
  nor: { bpm: 82, lead: "flute", chord: [293.66, 349.23, 440] },
  kan: { bpm: 120, lead: "pluck", chord: [293.66, 329.63, 440] },
  kin: { bpm: 76, lead: "pluck", chord: [293.66, 311.13, 440] },
  kyu: { bpm: 116, lead: "pluck", chord: [261.63, 329.63, 349.23] },
};
