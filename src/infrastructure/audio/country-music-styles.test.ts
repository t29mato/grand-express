import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COUNTRY_INDEX } from "../content/country-index";
import { loadCountryStyles, type RegionStyle } from "./country-music-styles";

/**
 * 盤面とBGMの結線を機械的に確かめる。
 *
 * **音が鳴らないことは、画面に何も出ない。** 例外も警告も出ず、
 * その盤面だけ静かなまま出荷される。実際にフランス・インド・茨城で
 * 3回、`STYLE_LOADERS` への追加を忘れたまま気づかずに出ている。
 *
 * 注意して防ぐのは3回失敗しているので、検査にする。
 * ここが赤くなる条件は3つ:
 *
 *  1. 盤面を足して `STYLE_LOADERS` に足し忘れた(= その盤面が無音)
 *  2. 曲の鍵と地方の鍵が食い違った(= `setRegion` が一致せず、曲が変わらない)
 *  3. 8小節そろっていない(= 拍のスケジューラが `ch[bar]` で undefined を引く)
 *
 * どれも**遊べてしまう**ぶん、目視では見つからない。
 */
const CONTENT_DIR = join(process.cwd(), "src/infrastructure/content");
const COUNTRY_IDS = COUNTRY_INDEX.map((entry) => entry.id);

function regionsOf(countryId: string): string[] {
  const raw = readFileSync(join(CONTENT_DIR, `${countryId}.content.json`), "utf8");
  return Object.keys((JSON.parse(raw) as { regions: Record<string, unknown> }).regions);
}

describe("盤面とBGMの結線", () => {
  it("盤面が1つ以上ある(索引そのものが壊れていないことの確認)", () => {
    expect(COUNTRY_IDS.length).toBeGreaterThan(0);
  });

  /**
   * **これが本命。** `country-index.json` に載っている盤面は、遊ぶ人から見て
   * 選べる盤面そのもの。選べるのに曲が無い、という状態を許さない。
   */
  it.each(COUNTRY_IDS)("%s: BGMが読み込める(STYLE_LOADERS に登録されている)", async (countryId) => {
    const styles = await loadCountryStyles(countryId);
    expect(
      styles,
      `${countryId} の音楽が読み込めません。` +
        "src/infrastructure/audio/country-music-styles.ts の STYLE_LOADERS に足してください",
    ).not.toBeNull();
    expect(Object.keys(styles ?? {}).length, `${countryId} の styles が空です`).toBeGreaterThan(0);
  });

  /**
   * `setRegion(regionId)` は `styles[regionId]` が無ければ黙って何もしない。
   * 鍵が1文字違うだけで、その地方に入っても曲が変わらなくなる。
   */
  it.each(COUNTRY_IDS)("%s: 曲の鍵が地方の鍵とそろっている", async (countryId) => {
    const styles = await loadCountryStyles(countryId);
    expect(Object.keys(styles ?? {}).sort(), `${countryId}: 地方と曲の鍵が食い違っています`).toEqual(
      regionsOf(countryId).sort(),
    );
  });

  /**
   * 拍のスケジューラは `style.ch[bar]` / `style.mel[bar]`(bar は 0〜7)を
   * 添字で引く。8小節そろっていないと再生中に undefined を触って落ちる。
   */
  it.each(COUNTRY_IDS)("%s: どの曲も8小節ぶんそろっている", async (countryId) => {
    const styles = (await loadCountryStyles(countryId)) ?? {};
    for (const [regionId, style] of Object.entries(styles) as [string, RegionStyle][]) {
      const where = `${countryId}/${regionId}`;
      expect(style.bpm, `${where}: bpm が正でない`).toBeGreaterThan(0);
      expect(style.ch, `${where}: コードが8小節でない`).toHaveLength(8);
      expect(style.mel, `${where}: メロディが8小節でない`).toHaveLength(8);
      for (const chord of style.ch) {
        expect(chord.b, `${where}: ベース音が正でない`).toBeGreaterThan(0);
        expect(chord.n, `${where}: コードの構成音が3つでない`).toHaveLength(3);
      }
      for (const bar of style.mel) {
        for (const [step, freq, dur] of bar) {
          expect(step, `${where}: 音符の位置が1小節(16)を超えている`).toBeLessThan(16);
          expect(step, `${where}: 音符の位置が負`).toBeGreaterThanOrEqual(0);
          expect(freq, `${where}: 音の高さが正でない`).toBeGreaterThan(0);
          expect(dur, `${where}: 音の長さが正でない`).toBeGreaterThan(0);
        }
      }
      for (const step of style.strum) {
        expect(step, `${where}: ストラムの位置が1小節を超えている`).toBeLessThan(16);
      }
      for (const [step, volume] of style.drum) {
        expect(step, `${where}: ドラムの位置が1小節を超えている`).toBeLessThan(16);
        expect(volume, `${where}: ドラムの音量が正でない`).toBeGreaterThan(0);
      }
    }
  });
});
