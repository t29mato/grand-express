import { RegionId } from "../../domain/shared-kernel/ids";

/**
 * 効果音・BGMのポート。現行コードの `Snd` エンジンに相当。
 * Phase5では最小限の疎通(効果音の切替)のみ実装し、
 * 音楽表現の作り込みはPhase8(仕上げ)で行う(docs/90-migration/02-wbs.md)。
 */
export interface SoundPort {
  /** 通過中の地方に応じてBGMを切り替える。 */
  setRegion(regionId: RegionId): void;
  playDiceRoll(): void;
  playStep(): void;
  playCoin(): void;
  playWrong(): void;
  playChime(): void;
  playFanfare(): void;
  playDoom(isKing: boolean): void;
  setMuted(muted: boolean): void;
}
