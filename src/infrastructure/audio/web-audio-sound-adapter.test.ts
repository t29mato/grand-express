import { describe, expect, it } from "vitest";
import { WebAudioSoundAdapter } from "./web-audio-sound-adapter";
import { TITLE_STYLES, TITLE_STYLE_KEY } from "./title-music-style";

/**
 * jsdom(テスト環境)には Web Audio API が無いため、すべてのメソッドが
 * 例外を投げずに黙って何もしないことだけを確認する(実際の再生確認は
 * e2e/playwright/full-turn-loop.spec.ts が実ブラウザで行っている)。
 */
describe("WebAudioSoundAdapter (AudioContext非対応環境でのフォールバック)", () => {
  it("AudioContextが無い環境でもどのメソッドを呼んでも例外を投げない", async () => {
    const adapter = new WebAudioSoundAdapter();
    await adapter.setCountry("bolivia");
    expect(() => {
      adapter.setRegion("alt");
      adapter.playRattle();
      adapter.playThud();
      adapter.playStep();
      adapter.playCoin();
      adapter.playWrong();
      adapter.playRight();
      adapter.playBuy();
      adapter.playTick();
      adapter.playChime();
      adapter.playFanfare();
      adapter.playDoom(false);
      adapter.playDoom(true);
      adapter.playWin();
      adapter.startTitleMusic();
      adapter.stopMusic();
      adapter.setMusicEnabled(false);
      adapter.setMusicEnabled(true);
      adapter.setMuted(true);
      adapter.setMuted(false);
    }).not.toThrow();
  });

  it("存在しない国を指定してもクラッシュしない", async () => {
    const adapter = new WebAudioSoundAdapter();
    await expect(adapter.setCountry("atlantis")).resolves.toBeUndefined();
  });
});

/**
 * トップ画面のテーマ曲。国のBGMと同じスケジューラに載るため、
 * 8小節そろっていないと再生中に落ちる(`style.ch[bar]` / `style.mel[bar]` を
 * 添字で引いているため)。データの形だけを押さえておく。
 */
describe("トップ画面のテーマ曲", () => {
  const theme = TITLE_STYLES[TITLE_STYLE_KEY];

  it("国のBGMと同じ8小節ループの形をしている", () => {
    expect(theme).toBeDefined();
    expect(theme.ch).toHaveLength(8);
    expect(theme.mel).toHaveLength(8);
    for (const chord of theme.ch) {
      expect(chord.b).toBeGreaterThan(0);
      expect(chord.n).toHaveLength(3);
    }
  });

  it("音符・伴奏・ドラムが1小節(16ステップ)の中に収まっている", () => {
    for (const bar of theme.mel) {
      for (const [step, freq, dur] of bar) {
        expect(step).toBeGreaterThanOrEqual(0);
        expect(step).toBeLessThan(16);
        expect(freq).toBeGreaterThan(0);
        expect(dur).toBeGreaterThan(0);
      }
    }
    for (const step of theme.strum) {
      expect(step).toBeGreaterThanOrEqual(0);
      expect(step).toBeLessThan(16);
    }
    for (const [step, vol] of theme.drum) {
      expect(step).toBeGreaterThanOrEqual(0);
      expect(step).toBeLessThan(16);
      expect(vol).toBeGreaterThan(0);
    }
  });
});
