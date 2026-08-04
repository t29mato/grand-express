import { SoundPort } from "../../application/ports/sound-port";
import { REGION_MUSIC } from "./region-music-table";

/**
 * Web Audio APIを使った簡易的なSFX/BGMエンジン。
 * 現行コードの `Snd` は拍単位でメロディ・コード・ドラムを鳴らし分ける本格的な
 * プロシージャル音楽エンジンだが、ここでは地方ごとの和音(`REGION_MUSIC`。
 * legacyのコード進行データをそのまま使用)を通過時に1回鳴らすアンビエント表現に
 * 留めている(拍スケジューリングそのものは移植していない)。
 * 詳細は docs/90-migration/03-as-built-status.md のPhase8欄を参照。
 */
export class WebAudioSoundAdapter implements SoundPort {
  private ctx: AudioContext | null = null;
  private muted = false;
  private lastRegion: string | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (this.muted) return null;
    if (!this.ctx) {
      const AudioContextCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return null;
      this.ctx = new AudioContextCtor();
    }
    return this.ctx;
  }

  private tone(freq: number, durationSec: number, type: OscillatorType = "sine"): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationSec);
  }

  /** 地方ごとの和音(トライアド)をやわらかく1回鳴らす。 */
  private playChordPad(freqs: readonly [number, number, number], lead: "flute" | "pluck"): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const duration = lead === "flute" ? 1.4 : 0.9;
    const waveform: OscillatorType = lead === "flute" ? "sine" : "triangle";
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveform;
      osc.frequency.value = freq;
      const peak = 0.09 - i * 0.015;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.05);
    });
  }

  setRegion(regionId: string): void {
    if (regionId === this.lastRegion) return;
    this.lastRegion = regionId;
    const profile = REGION_MUSIC[regionId];
    if (!profile) return;
    this.playChordPad(profile.chord, profile.lead);
  }

  playDiceRoll(): void {
    this.tone(220, 0.08, "square");
  }

  playStep(): void {
    this.tone(440, 0.03, "square");
  }

  playCoin(): void {
    this.tone(880, 0.12, "triangle");
  }

  playWrong(): void {
    this.tone(120, 0.25, "sawtooth");
  }

  playChime(): void {
    this.tone(660, 0.2, "sine");
  }

  playFanfare(): void {
    this.tone(523, 0.15, "triangle");
    setTimeout(() => this.tone(784, 0.25, "triangle"), 120);
  }

  playDoom(isKing: boolean): void {
    this.tone(isKing ? 90 : 150, 0.35, "sawtooth");
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
  }
}
