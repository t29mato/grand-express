import { SoundPort } from "../../application/ports/sound-port";
import { CountryStyles, RegionStyle, loadCountryStyles } from "./country-music-styles";
import { TITLE_STYLES, TITLE_STYLE_KEY } from "./title-music-style";

type AudioContextCtor = typeof AudioContext;

/**
 * Web Audio APIによる効果音・BGMエンジン。現行コードの `Snd` IIFEを
 * ほぼそのまま(拍単位のスケジューリングループを含めて)TypeScriptへ移植したもの。
 * シンセ関数(flute/pluck/bombo/bass/noise)・スケジューラのタイミング計算式は
 * legacyの数値をそのまま使用している(docs/90-migration/03-as-built-status.md参照)。
 */
export class WebAudioSoundAdapter implements SoundPort {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private delay: DelayNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private musicOn = true;
  /**
   * プレイヤーが画面から切ったかどうか。falseのあいだは拍のスケジューラを回さない。
   * `musicOn`(ミュート由来)と別に持つのは、音量を絞るのではなく
   * **音を予約すること自体をやめる**ためで、こちらが優先される。
   */
  private musicEnabled = true;
  private running = false;
  private step = 0;
  private nextT = 0;
  private schedulerHandle: ReturnType<typeof setInterval> | null = null;

  private styles: CountryStyles = {};
  private styleKey: string | null = null;
  private pendingStyleKey: string | null = null;
  private muted = false;

  /**
   * いまスケジューラに載っている曲の出どころ。
   * トップ画面のテーマと国のBGMを取り違えて二重に鳴らさないための目印。
   */
  private musicSource: "none" | "title" | "country" = "none";

  // ── 初期化 ──────────────────────────────────────────

  private init(): void {
    if (this.ctx) return;
    if (typeof window === "undefined") return;
    const AC: AudioContextCtor | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);
    this.master = master;

    const musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(master);
    this.musicGain = musicGain;

    const sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.5;
    sfxGain.connect(master);
    this.sfxGain = sfxGain;

    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    delay.connect(feedback);
    feedback.connect(delay);
    const wet = ctx.createGain();
    wet.gain.value = 0.34;
    delay.connect(wet);
    wet.connect(musicGain);
    this.delay = delay;

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = noiseBuffer;
  }

  private get context(): AudioContext | null {
    if (this.muted) return null;
    this.init();
    return this.ctx;
  }

  private now(): number {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  // ── シンセ関数(legacyのnoise/flute/pluck/bombo/bassをそのまま移植) ──

  private noise(t: number, dur: number, freq: number, q: number, vol: number, out?: AudioNode): void {
    const ctx = this.ctx;
    if (!ctx || !this.noiseBuffer) return;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(out ?? this.sfxGain!);
    source.start(t);
    source.stop(t + dur + 0.02);
  }

  private flute(t: number, freq: number, dur: number, vol: number, out?: AudioNode): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const target = out ?? this.musicGain!;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, t);
    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(freq * 2, t);
    const g = ctx.createGain();
    const g2 = ctx.createGain();
    g2.gain.value = 0.11;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 5.1;
    const lg = ctx.createGain();
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(freq * 0.009, t + dur * 0.5);
    lfo.connect(lg);
    lg.connect(o.frequency);
    lg.connect(o2.frequency);
    o.connect(g);
    o2.connect(g2);
    g2.connect(g);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.055);
    g.gain.setValueAtTime(vol, t + dur * 0.62);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
    g.connect(target);
    if (target === this.musicGain && this.delay) g.connect(this.delay);
    this.noise(t, 0.09, freq * 1.6, 1.2, vol * 0.5, target);
    o.start(t);
    o2.start(t);
    lfo.start(t);
    o.stop(t + dur + 0.2);
    o2.stop(t + dur + 0.2);
    lfo.stop(t + dur + 0.2);
  }

  private pluck(t: number, freq: number, vol: number, out?: AudioNode, bright?: boolean): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const target = out ?? this.musicGain!;
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    const o2 = ctx.createOscillator();
    o2.type = "sawtooth";
    o2.frequency.setValueAtTime(freq, t);
    o2.detune.value = 9;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(bright ? 6000 : 4200, t);
    filter.frequency.exponentialRampToValueAtTime(bright ? 1200 : 700, t + 0.3);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    o.connect(filter);
    o2.connect(filter);
    filter.connect(gain);
    gain.connect(target);
    o.start(t);
    o2.start(t);
    o.stop(t + 0.5);
    o2.stop(t + 0.5);
  }

  private bombo(t: number, vol: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain) return;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(155, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.13);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol * 0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.33);
    o.connect(gain);
    gain.connect(this.musicGain);
    o.start(t);
    o.stop(t + 0.36);
    this.noise(t, 0.05, 1800, 0.8, vol * 0.1, this.musicGain);
  }

  private bass(t: number, freq: number, dur: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain) return;
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(gain);
    gain.connect(this.musicGain);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  // ── 拍スケジューラ(legacyの `schedule()`) ──

  private currentStyle(): RegionStyle | null {
    const keys = Object.keys(this.styles);
    if (keys.length === 0) return null;
    if (!this.styleKey || !this.styles[this.styleKey]) this.styleKey = keys[0];
    return this.styles[this.styleKey];
  }

  private schedule(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    let style = this.currentStyle();
    if (!style) return;
    const step = (60 / style.bpm) / 4;

    while (this.nextT < ctx.currentTime + 0.15) {
      const bar = Math.floor(this.step / 16) % 8;
      const s = this.step % 16;

      style = this.currentStyle();
      if (!style) return;
      if (
        s === 0 &&
        bar === 0 &&
        this.pendingStyleKey &&
        this.pendingStyleKey !== this.styleKey &&
        this.styles[this.pendingStyleKey]
      ) {
        this.styleKey = this.pendingStyleKey;
        this.pendingStyleKey = null;
        style = this.styles[this.styleKey];
      }

      const chord = style.ch[bar];
      if (s === 0 || s === 8) this.bass(this.nextT, chord.b / 2, 0.6);
      if (s === 12) this.bass(this.nextT, chord.b * 0.75, 0.3);

      const drumHit = style.drum.find((d) => d[0] === s);
      if (drumHit) this.bombo(this.nextT, drumHit[1]);

      if (style.shake && s % 2 === (style.shake === 2 ? 0 : 1)) {
        this.noise(this.nextT, 0.04, 6500, 1.2, 0.05, this.musicGain!);
      }

      const strumIndex = style.strum.indexOf(s);
      if (strumIndex >= 0) {
        this.pluck(this.nextT, chord.n[strumIndex % 3], 0.075, this.musicGain!, style.lead === "pluck");
        this.pluck(this.nextT + 0.012, chord.n[(strumIndex + 1) % 3] * 2, 0.05, this.musicGain!, style.lead === "pluck");
      }

      for (const [noteStep, freq, dur] of style.mel[bar]) {
        if (noteStep !== s) continue;
        if (style.lead === "pluck") {
          this.pluck(this.nextT, freq, 0.14, this.musicGain!, true);
          this.pluck(this.nextT + 0.03, freq * 2, 0.07, this.musicGain!, true);
        } else {
          this.flute(this.nextT, freq, dur * step * 0.92, 0.15);
        }
      }

      this.nextT += step;
      this.step++;
    }
  }

  // ── 公開API(SoundPort) ──

  /** 国が変わったら音楽データを読み替える(ゲーム開始/セーブ再開時に呼ぶ)。 */
  async setCountry(countryId: string): Promise<void> {
    const styles = await loadCountryStyles(countryId);
    this.styles = styles ?? {};
    this.styleKey = null;
    this.pendingStyleKey = null;
    this.musicSource = "country";
    this.restartFromBarStart();
  }

  /**
   * トップ画面のテーマ曲を鳴らす(国のBGMとは別の1曲)。
   *
   * ブラウザの自動再生ポリシーにより、**最初のユーザー操作より後に**呼ぶ必要がある
   * (画面を開いた瞬間に呼んでもAudioContextがsuspendedのままで音は出ない)。
   * ゲームが始まったら `setCountry()` + `setRegion()` がそのまま曲を差し替える。
   */
  startTitleMusic(): void {
    if (this.musicSource !== "title") {
      this.styles = TITLE_STYLES;
      this.styleKey = TITLE_STYLE_KEY;
      this.pendingStyleKey = null;
      this.musicSource = "title";
      this.restartFromBarStart();
    }
    this.start();
  }

  /**
   * 曲を差し替えたときに、新しい曲の1小節目から鳴らし直す。
   * `nextT`(次に音を置く時刻)はそのままにして、拍の位置だけ戻す
   * (時刻を巻き戻すと、すでに予約した音と重なってしまうため)。
   */
  private restartFromBarStart(): void {
    this.step = 0;
  }

  stopMusic(): void {
    this.silenceMusic();
    this.musicSource = "none";
  }

  /**
   * 拍のスケジューラを止めて音を絞る。**いまどの曲だったか(`musicSource`)は忘れない。**
   * 音楽を切ったあと入れ直したときに、同じ曲へ戻れるようにするため。
   */
  private silenceMusic(): void {
    if (this.schedulerHandle) {
      clearInterval(this.schedulerHandle);
      this.schedulerHandle = null;
    }
    this.running = false;
    // ミュート設定(`muted` / `musicOn`)は触らない。止めるのはBGMだけで、
    // 効果音とミュートの状態はそのまま保つ。
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.musicGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
    }
  }

  setMusicEnabled(enabled: boolean): void {
    if (this.musicEnabled === enabled) return;
    this.musicEnabled = enabled;
    if (!enabled) {
      this.silenceMusic();
      return;
    }
    // 切っているあいだに国や地方が変わっていても、曲の指定は受け取ってある。
    // 一度も曲が指定されていない("none")ときだけ、鳴らすものが無いので何もしない。
    if (this.musicSource !== "none") this.start();
  }

  /** BGMのスケジューラを開始する(未開始なら)。ユーザー操作後に呼ぶ必要がある(自動再生ポリシー対策)。 */
  start(): void {
    const ctx = this.context;
    if (!ctx) return;
    // AudioContextを起こすのは音楽を切っていてもやる。効果音はここで起こしておかないと
    // suspendedのままになり、鳴らしたつもりで無音になる。
    void ctx.resume();
    if (!this.musicEnabled) return;
    if (!this.running) {
      this.running = true;
      this.step = 0;
      this.nextT = ctx.currentTime + 0.1;
      this.schedulerHandle = setInterval(() => this.schedule(), 25);
    }
    this.musicGain?.gain.cancelScheduledValues(ctx.currentTime);
    this.musicGain?.gain.setTargetAtTime(this.musicOn ? 0.4 : 0, ctx.currentTime, 0.8);
  }

  setRegion(regionId: string): void {
    this.start();
    if (!this.styles[regionId] || regionId === this.styleKey || this.pendingStyleKey === regionId) return;
    this.pendingStyleKey = regionId;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.musicOn = !muted;
    if (muted) {
      this.stopMusic();
      return;
    }
    // ミュートを解いても、プレイヤーが音楽を切っているなら音量は上げない。
    if (this.musicEnabled && this.ctx && this.musicGain) {
      this.musicGain.gain.setTargetAtTime(0.4, this.ctx.currentTime, 0.25);
    }
  }

  playRattle(): void {
    const ctx = this.context;
    if (!ctx) return;
    const t = this.now();
    for (let i = 0; i < 9; i++) {
      this.noise(t + i * 0.055 + Math.random() * 0.03, 0.028, 1700 + Math.random() * 1900, 4, 0.14);
    }
  }

  playThud(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(185, t);
    o.frequency.exponentialRampToValueAtTime(68, t + 0.09);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.19);
    o.connect(gain);
    gain.connect(this.sfxGain);
    o.start(t);
    o.stop(t + 0.22);
    this.noise(t, 0.05, 2700, 2, 0.22);
  }

  playStep(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    this.pluck(this.now(), 660, 0.1, this.sfxGain);
  }

  playCoin(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    this.flute(t, 880, 0.11, 0.16, this.sfxGain);
    this.flute(t + 0.09, 1174.66, 0.2, 0.16, this.sfxGain);
  }

  playBuy(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    [523.25, 659.25, 880].forEach((f, i) => this.pluck(t + i * 0.05, f, 0.14, this.sfxGain!));
  }

  playRight(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.flute(t + i * 0.08, f, 0.22, 0.14, this.sfxGain!));
  }

  playWrong(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(196, t);
    o.frequency.exponentialRampToValueAtTime(92, t + 0.34);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
    o.connect(gain);
    gain.connect(this.sfxGain);
    o.start(t);
    o.stop(t + 0.4);
  }

  playTick(): void {
    const ctx = this.context;
    if (!ctx) return;
    this.noise(this.now(), 0.035, 2400, 3, 0.28);
  }

  playDoom(isKing: boolean): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    const freqs = isKing ? [44, 66, 88, 132] : [58, 87, 116];
    freqs.forEach((f) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(f, t);
      o.frequency.linearRampToValueAtTime(f * 0.84, t + 1.1);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(isKing ? 0.1 : 0.07, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      o.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);
      o.start(t);
      o.stop(t + 1.4);
    });
    this.noise(t, 1, 300, 0.6, 0.24);
  }

  playChime(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    [659.25, 880, 1318.5].forEach((f, i) => this.flute(t + i * 0.11, f, 0.5, 0.13, this.sfxGain!));
  }

  playFanfare(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    ([[523.25, 0], [659.25, 0.12], [783.99, 0.24], [1046.5, 0.36]] as const).forEach(([f, d]) =>
      this.flute(t + d, f, 0.42, 0.19, this.sfxGain!),
    );
    this.bombo(t, 0.9);
    this.bombo(t + 0.36, 0.9);
  }

  playArrival(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    // 上りの分散和音のあと、主和音を重ねて響かせる。到着の一区切りを出す。
    (
      [
        [523.25, 0], [659.25, 0.1], [783.99, 0.2], [1046.5, 0.3],
        [987.77, 0.46], [1046.5, 0.56],
        [1318.5, 0.72], [1046.5, 0.72], [783.99, 0.72],
      ] as const
    ).forEach(([f, d]) => this.flute(t + d, f, d >= 0.72 ? 0.9 : 0.4, 0.18, this.sfxGain!));
    [0, 0.2, 0.4, 0.56, 0.72].forEach((d) => this.bombo(t + d, 0.85));
  }

  playWin(): void {
    const ctx = this.context;
    if (!ctx || !this.sfxGain) return;
    const t = this.now();
    ([[440, 0], [523.25, 0.14], [659.25, 0.28], [880, 0.42], [783.99, 0.62], [880, 0.76]] as const).forEach(([f, d]) =>
      this.flute(t + d, f, 0.5, 0.2, this.sfxGain!),
    );
    [0, 0.14, 0.28, 0.42, 0.62, 0.76].forEach((d) => this.bombo(t + d, 0.8));
  }
}
