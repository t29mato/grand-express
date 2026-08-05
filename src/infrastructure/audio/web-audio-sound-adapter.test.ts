import { describe, expect, it } from "vitest";
import { WebAudioSoundAdapter } from "./web-audio-sound-adapter";

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
      adapter.setMuted(true);
      adapter.setMuted(false);
    }).not.toThrow();
  });

  it("存在しない国を指定してもクラッシュしない", async () => {
    const adapter = new WebAudioSoundAdapter();
    await expect(adapter.setCountry("atlantis")).resolves.toBeUndefined();
  });
});
