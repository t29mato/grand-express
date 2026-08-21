import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { SetupScreen } from "./setup-screen";

/**
 * この画面は国選びのために全部の国のコンテンツ(地図のサムネイル込み)を読み込むため、
 * 1回描くだけでも重い。描き直す回数を減らしたうえで、既定の5秒より長い持ち時間を渡している。
 *
 * ## **持ち時間の宣言はここ1箇所だけにする**
 *
 * 2026-08-21 まで、下の `describe` の中に `vi.setConfig({ testTimeout: 60_000 })` も
 * 書いてあった。**効いていたのは30秒のほうである。**`it(名前, 本体, 時間)` の
 * 第3引数は `setConfig` より強い。60秒と書いた本人も、それを読んだ側も、
 * 60秒だと思っていた。落ちたときの文言は `timed out in 30000ms` で、
 * **どちらの数字とも一致しない60秒がコメントに残り続けていた。**
 *
 * `--testTimeout` を外から渡しても同じ理由で無視される。切り分けのときに
 * 400秒を渡して「効かない」で30分溶かした。**二重に宣言しない。**
 *
 * ## 120秒にした理由
 *
 * 単体で走らせると25〜37秒で終わるが、`npm run check` は90ファイルを
 * 並べて走らせるので、同じテストが**58.8秒**かかった回がある
 * (同じコードで35.7秒の回もある。3倍ばらつく)。
 * 30秒では**盤面が重くなったのか機械が混んでいたのかを区別できない。**
 * 目印として役に立つのは前者だけなので、後者では鳴らない位置まで上げる。
 */
const TIMEOUT = 120_000;

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
 * (`setup-screen.tsx` の `CountryThumb`)。
 * **盤面が増えるとまたここが最初に苦しくなる**ので、目印として。
 *
 * 持ち時間は `TIMEOUT` に一本化してある(理由はそちらのコメント)。
 */
describe("SetupScreen の既定のプレイヤー名", () => {
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
