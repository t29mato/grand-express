import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { SetupScreen } from "./setup-screen";

/**
 * この画面は国選びのために全部の国のコンテンツ(地図のサムネイル込み)を読み込むため、
 * 1回描くだけでも重い。描き直す回数を減らしたうえで、既定の5秒より長い持ち時間を渡している。
 */
const TIMEOUT = 30_000;

function renderSetup() {
  return render(
    <LocaleProvider>
      <SetupScreen />
    </LocaleProvider>,
  );
}

/** 名前欄は読み上げ名(「1人目」など)で引く。言語で中身が変わるので番号で引き当てる。 */
function nameField(slot: number): HTMLInputElement {
  return screen.getByRole("textbox", { name: new RegExp(`(Traveller|Viajero|Voyageur)\\s*${slot}$|^${slot}人目$`) });
}

function switchTo(language: "EN" | "ES" | "FR" | "JA") {
  fireEvent.click(screen.getByRole("button", { name: language }));
}

/**
 * **この組は重い。**セットアップ画面は盤面の絵を大量に描く。
 *
 * 一度、盤面が31枚に増えたところで時間切れになった。原因は、
 * **言語を切り替えるたびに30枚ぶんのサムネイル(合計235KB のSVG)を
 * 組み立て直していた**こと。`dangerouslySetInnerHTML` は描画のたびに
 * 文字列を解析し直す。**名前を1文字打つだけでも同じことが起きていた。**
 *
 * 絵の部分を `memo` で切り出して 25.2秒 → 4.2秒 になった
 * (`setup-screen.tsx` の `CountryThumb`)。上限はそのまま残してある。
 * **盤面が増えるとまたここが最初に苦しくなる**ので、目印として。
 */
describe("SetupScreen の既定のプレイヤー名", () => {
  vi.setConfig({ testTimeout: 60_000 });

  it(
    "既定名は表示中の言語で出て、CPUの枠は4言語とも「CPU 1」のまま",
    () => {
      renderSetup();
      expect(nameField(1).value).toBe("You");
      expect(nameField(2).value).toBe("CPU 1");
      expect(nameField(3).value).toBe("CPU 2");

      switchTo("JA");
      expect(nameField(1).value).toBe("あなた");
      // CPUは切替ボタンの表記に合わせて訳さない。
      expect(nameField(2).value).toBe("CPU 1");

      switchTo("FR");
      expect(nameField(1).value).toBe("Toi");

      switchTo("ES");
      expect(nameField(1).value).toBe("Tú");

      switchTo("EN");
      expect(nameField(1).value).toBe("You");
    },
    TIMEOUT,
  );

  it(
    "自分で付けた名前は、言語を切り替えても消えない",
    () => {
      renderSetup();
      fireEvent.change(nameField(1), { target: { value: "ゆうた" } });

      switchTo("FR");
      expect(nameField(1).value).toBe("ゆうた");
      // 触っていない枠は言語に追随する。
      expect(nameField(2).value).toBe("CPU 1");

      switchTo("EN");
      expect(nameField(1).value).toBe("ゆうた");
    },
    TIMEOUT,
  );

  it(
    "名前欄を空にしたら、その空欄は言語を変えても保たれる",
    () => {
      renderSetup();
      switchTo("JA");
      fireEvent.change(nameField(1), { target: { value: "" } });
      expect(nameField(1).value).toBe("");

      switchTo("EN");
      expect(nameField(1).value).toBe("");
    },
    TIMEOUT,
  );
});
