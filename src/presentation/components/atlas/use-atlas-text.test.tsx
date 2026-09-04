import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ATLAS_MESSAGES } from "../../i18n/atlas-messages";
import { LocaleProvider } from "../../i18n/locale-context";
import { useAtlasText } from "./use-atlas-text";
import { AtlasScreen } from "./atlas-screen";
import { testAtlasSource } from "./atlas-test-source";

const LOCALES = ["en", "es", "fr", "ja"] as const;

describe("4言語ぶんそろっている", () => {
  it("どの言語も同じ鍵を持っている", () => {
    const keys = Object.keys(ATLAS_MESSAGES.en).sort();
    for (const locale of LOCALES) {
      expect(Object.keys(ATLAS_MESSAGES[locale]).sort(), `${locale} の鍵`).toEqual(keys);
    }
  });

  it("空の文言が無い", () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(ATLAS_MESSAGES[locale])) {
        expect(value.trim(), `${locale}.${key}`).not.toBe("");
      }
    }
  });

  it("差し込み口({0})の数が言語ごとに食い違わない", () => {
    const slots = (text: string) => (text.match(/\{\d\}/g) ?? []).sort().join(",");
    for (const [key, english] of Object.entries(ATLAS_MESSAGES.en)) {
      for (const locale of LOCALES) {
        expect(slots(ATLAS_MESSAGES[locale][key]), `${locale}.${key}`).toBe(slots(english));
      }
    }
  });

  /**
   * **フランス語は tu。**盤面の文言と同じ「遊びの中の声」で書く
   * (`feedback-messages.ts` だけ vous なのは、宛先が作り手だから)。
   */
  it("フランス語に vous が混ざっていない", () => {
    for (const [key, text] of Object.entries(ATLAS_MESSAGES.fr)) {
      expect(text, `fr.${key}`).not.toMatch(/\bvous\b/i);
    }
  });
});

/**
 * `messages.ts` への登録は共有ファイルへの追記なので取りまとめ側が行う。
 * **登録の前でも後でも同じように読めること。**
 */
describe("文言の引きかた", () => {
  function Probe() {
    const { at } = useAtlasText();
    return (
      <ul>
        <li>{at("atlasTitle")}</li>
        {/* `messages.ts` にある鍵は、そちらが先に答える。 */}
        <li>{at("backToGame")}</li>
        {/* どこにも無い鍵は、鍵の名前がそのまま返る(黙って消えない)。 */}
        <li>{at("atlasNoSuchKey")}</li>
        <li>{at("atlasViewTown", "Tokyo")}</li>
      </ul>
    );
  }

  it("登録されていなくても atlas-messages から引ける。差し込みも効く", () => {
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );
    expect(screen.getByText("World atlas")).toBeInTheDocument();
    expect(screen.getByText("Back to the game")).toBeInTheDocument();
    expect(screen.getByText("atlasNoSuchKey")).toBeInTheDocument();
    expect(screen.getByText("Zoomed in close. Towns in view: Tokyo")).toBeInTheDocument();
  });

  it("言語を切り替えると地図帳の文言も変わる", () => {
    render(
      <LocaleProvider>
        <AtlasScreen source={testAtlasSource()} />
      </LocaleProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("World atlas");
    fireEvent.click(screen.getByRole("button", { name: /日本語|JA/ }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("世界の地図帳");
  });
});
