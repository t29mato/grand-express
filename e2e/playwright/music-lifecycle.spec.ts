import { test, expect, Page } from "@playwright/test";
import { boardChoice } from "./pick-board";

/**
 * BGMの入り・切り替わり・止まりを実ブラウザで確かめる。
 *
 * 音が出ているかは耳では確かめられないので、`AudioContext` を包んで
 * **いつ・どの高さの音が予約されたか**を記録する。BGMは拍のスケジューラが
 * 先読みして音を予約し続ける仕組みなので、予約が増えていれば鳴っており、
 * 増えなくなれば止まっている。
 *
 * 曲の見分けはテンポで行う。ベース音(triangle・130Hz未満)の最短間隔は
 * 4ステップ=`60/bpm`秒なので、そこからbpmを逆算できる
 * (トップ画面のテーマ=96bpm / ボリビアの各地方=88・100・112・124bpm)。
 */

interface OscRecord {
  type: string;
  freq: number | null;
  t: number;
}

interface AudioProbe {
  ctxCount: number;
  osc: OscRecord[];
  state: string | null;
  now: number;
}

/** AudioContextを包んで、予約された音を記録する。ページ読み込み前に仕込む。 */
function installAudioProbe(): void {
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
    __audioProbe?: { ctxCount: number; osc: OscRecord[] };
    __audioCtx?: AudioContext;
  };
  const record = { ctxCount: 0, osc: [] as OscRecord[] };
  w.__audioProbe = record;
  const Original = w.AudioContext ?? w.webkitAudioContext;
  if (!Original) return;
  class Probed extends Original {
    constructor(...args: ConstructorParameters<typeof AudioContext>) {
      super(...args);
      record.ctxCount++;
      w.__audioCtx = this;
    }
    createOscillator(): OscillatorNode {
      const osc = super.createOscillator();
      let firstFreq: number | null = null;
      const setValueAtTime = osc.frequency.setValueAtTime.bind(osc.frequency);
      osc.frequency.setValueAtTime = (value: number, when: number) => {
        if (firstFreq === null) firstFreq = value;
        return setValueAtTime(value, when);
      };
      const start = osc.start.bind(osc);
      osc.start = (when?: number) => {
        record.osc.push({ type: osc.type, freq: firstFreq, t: when ?? this.currentTime });
        return start(when);
      };
      return osc;
    }
  }
  w.AudioContext = Probed;
  w.webkitAudioContext = Probed;
}

function readProbe(page: Page): Promise<AudioProbe> {
  return page.evaluate(() => {
    const w = window as unknown as { __audioProbe: { ctxCount: number; osc: OscRecord[] }; __audioCtx?: AudioContext };
    return {
      ctxCount: w.__audioProbe.ctxCount,
      osc: w.__audioProbe.osc.slice(),
      state: w.__audioCtx ? w.__audioCtx.state : null,
      now: w.__audioCtx ? w.__audioCtx.currentTime : 0,
    };
  });
}

/** ベース音の最短間隔からテンポを逆算する。`fromT` 以降に予約されたものだけを見る。 */
function estimateBpm(osc: readonly OscRecord[], fromT = -Infinity): number | null {
  const times = osc
    .filter((o) => o.type === "triangle" && o.freq !== null && o.freq < 130 && o.t >= fromT)
    .map((o) => o.t)
    .sort((a, b) => a - b);
  const deltas: number[] = [];
  for (let i = 1; i < times.length; i++) {
    const delta = times[i] - times[i - 1];
    // 同時に鳴る音を1つに数えるため、ごく短い間隔は無視する。
    if (delta > 0.05) deltas.push(delta);
  }
  if (deltas.length < 2) return null;
  return Math.round(60 / Math.min(...deltas));
}

const TITLE_BPM = 96;
/** ボリビアの4地方のテンポ。どれになるかは出発地で決まる。 */
const BOLIVIA_BPM = [88, 100, 112, 124];

test("トップ画面の音楽が最初の操作で鳴り、ゲーム開始で国のBGMに変わり、New gameで止まる", async ({ page }) => {
  await page.addInitScript(installAudioProbe);
  await page.goto("/");
  await expect(page.getByText("Choose your journey")).toBeVisible();

  // 自動再生ポリシー: 何も触っていないうちは音を出そうとしない。
  await page.waitForTimeout(1500);
  const silent = await readProbe(page);
  expect(silent.osc).toHaveLength(0);
  expect(silent.ctxCount).toBe(0);

  // 最初のクリック(国を選ぶ)でテーマ曲が入る。
  // どの国を選んだかで次に鳴る曲のテンポが決まるので、順番ではなく名前で選ぶ。
  // 押せたことを `aria-pressed` で確かめてから測る(空振りしたまま
  // 「鳴っていない」と読み違えないため)。
  const bolivia = boardChoice(page, "Bolivia");
  await bolivia.click();
  await expect(bolivia).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(3000);
  const titlePlaying = await readProbe(page);
  expect(titlePlaying.state).toBe("running");
  expect(titlePlaying.osc.length).toBeGreaterThan(10);
  expect(estimateBpm(titlePlaying.osc)).toBe(TITLE_BPM);

  // ゲームを始めると、その国のBGMへ入れ替わる(音は途切れない)。
  await page.getByRole("button", { name: "Start the journey" }).click();
  await expect(page.locator("#die")).toBeVisible();
  await page.waitForTimeout(4000);
  const countryPlaying = await readProbe(page);
  expect(countryPlaying.osc.length).toBeGreaterThan(titlePlaying.osc.length + 10);
  // 切り替え前の予約が混ざらないよう、開始の少しあとから数える。
  expect(BOLIVIA_BPM).toContain(estimateBpm(countryPlaying.osc, titlePlaying.now + 2));

  // New game を押すとBGMが止まる(効果音とミュート設定はそのまま)。
  // モーダルが開いているあいだはオーバーレイがヘッダーを覆っていて押せないので、
  // 先に出発モーダルを閉じる(modal.tsx の作りによる)。
  await page.getByRole("button", { name: "Depart!" }).click();
  await page.getByRole("button", { name: "New game" }).click();
  await expect(page.getByText("Choose your journey")).toBeVisible();
  await page.waitForTimeout(500);
  const justStopped = await readProbe(page);
  await page.waitForTimeout(2500);
  const stillStopped = await readProbe(page);
  expect(stillStopped.osc).toHaveLength(justStopped.osc.length);
  await expect(page.getByText("Choose your journey")).toBeVisible();

  // 戻ってきた画面で何か触れば、またテーマ曲が鳴り出す。
  await bolivia.click();
  await expect(bolivia).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(3000);
  const titleAgain = await readProbe(page);
  expect(titleAgain.osc.length).toBeGreaterThan(stillStopped.osc.length + 10);
  expect(estimateBpm(titleAgain.osc, stillStopped.now + 0.5)).toBe(TITLE_BPM);

  // トップ画面を離れて別のページへ移ったら、テーマ曲は付いてこない。
  await page.getByRole("link", { name: "What's new" }).click();
  await expect(page.getByText("What has changed for players, newest first.")).toBeVisible();
  await page.waitForTimeout(500);
  const leftTitle = await readProbe(page);
  await page.waitForTimeout(2000);
  expect(await readProbe(page).then((p) => p.osc.length)).toBe(leftTitle.osc.length);
});
