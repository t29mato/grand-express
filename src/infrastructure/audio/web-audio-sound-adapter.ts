import { SoundPort } from "../../application/ports/sound-port";

/**
 * Web Audio APIを使った簡易的なSFXエンジン(Phase5時点の最小実装)。
 * 現行コードの `Snd` は地方ごとのBGMを含む本格的なプロシージャル音楽エンジンだが、
 * ここでは短いトーン/ノイズによる効果音のみを実装し、疎通を確保する。
 * 音楽表現の作り込みはPhase8(仕上げ)で行う。
 */
export class WebAudioSoundAdapter implements SoundPort {
  private ctx: AudioContext | null = null;
  private muted = false;

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

  setRegion(): void {
    // Phase8で地方別BGMへ差し替える。現時点では何もしない。
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
