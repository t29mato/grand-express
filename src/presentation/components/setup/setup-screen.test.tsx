import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, fireEvent, within } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { useGameStore } from "../../state/game-store";
import { GameStoreState, SavedGameSummary } from "../../state/game-store-types";
import { SETTLE_MS } from "./discard-confirm";
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

const startButton = () => screen.getByRole("button", { name: "Start the journey" });
/** 地図の名札・番号の印は `role="button"` の `<g>`。読み上げ名で引く。 */
const plate = (name: string) => screen.getByRole("button", { name });

/**
 * 2026-09-02 のプレイで見つかった食い違い:**アジアを開いても「ボリビア」が選ばれたまま**で、
 * 日本の中の盤面を押すまで、旅に出ると始まるのはボリビアだった。
 * 地域を移った時点で、そこに無い盤面は選択から外し、選ぶまで「旅に出る」を押せなくする。
 */
describe("SetupScreen の盤面選び", () => {
  /**
   * **1つの `it` に詰め込まないこと。**
   *
   * もとは下の3件を1つの `it` に書いていた。**単独で17.2秒**かかり、
   * `npm run check` が114ファイルを並べて走らせたとき **120秒の持ち時間を超えて落ちた。**
   * 判定はどれも正しく、落ちたのは時間切れだけ。
   *
   * この画面は1回描くだけで47盤面ぶんのサムネイルを組み立てるので、
   * **押すたびに全部描き直す。**押す回数がそのまま時間になる。
   * 1件あたりの押下を数回に抑えれば、混み合ったときの7倍の伸びでも持ち時間に収まる。
   */
  it(
    "大陸を変えると前の盤面が外れ、盤面を選ぶまで「旅に出る」は押せない",
    () => {
      renderSetup();
      // 既定はボリビア。何も触らずに旅に出られる。
      expect(startButton()).toBeEnabled();
      expect(screen.queryByRole("status")).toBeNull();

      fireEvent.click(plate("Asia"));
      expect(startButton()).toBeDisabled();
      expect(screen.getByRole("status")).toHaveTextContent("Pick a board to set off");
    },
    TIMEOUT,
  );

  it(
    "国の中の盤面は右の一覧から選べ、地図の番号の印と対応する",
    () => {
      renderSetup();
      fireEvent.click(plate("Asia"));
      // 日本は中に盤面を持つので、押しても選ばれずに一段降りる。右に一覧が出る。
      fireEvent.click(plate("Japan"));
      expect(startButton()).toBeDisabled();
      const list = screen.getByRole("group", { name: "Boards inside Japan" });
      expect(within(list).getAllByRole("button")).toHaveLength(5);
      // 地図の印は名前ではなく番号を書く(重なるため)。読み上げ名は盤面の名前のまま。
      // `textContent` には吹き出し用の `<title>` も混ざるので、見える文字だけを見る。
      expect(plate("Kyūshū").querySelector("text")).toHaveTextContent(/^\d$/);

      // 一覧で選ぶと、地図の印も光り、旅に出られる。
      fireEvent.click(within(list).getByRole("button", { name: /Kyūshū/ }));
      expect(plate("Kyūshū")).toHaveAttribute("aria-pressed", "true");
      expect(within(list).getByRole("button", { name: /Kyūshū/ })).toHaveAttribute("aria-pressed", "true");
      expect(startButton()).toBeEnabled();
      expect(screen.queryByRole("status")).toBeNull();
    },
    TIMEOUT,
  );

  it(
    "選んだ盤面は、その盤面を含む範囲へ戻るあいだは外れない",
    () => {
      renderSetup();
      fireEvent.click(plate("Asia"));
      fireEvent.click(plate("Japan"));
      fireEvent.click(plate("Hokkaidō"));
      expect(startButton()).toBeEnabled();

      // アジアへ戻っても、北海道はアジアの中なので選ばれたまま。
      // (世界へ戻る・別の大陸へ移る、は下の件で見ている。押すたびに47盤面を
      //  描き直すので、1件あたりの押下は数回に抑える。)
      fireEvent.click(screen.getByRole("button", { name: "‹ Asia" }));
      expect(startButton()).toBeEnabled();
    },
    TIMEOUT,
  );

  it(
    "選んでいる盤面が入っている大陸を開いても、選択は外れない",
    () => {
      renderSetup();
      fireEvent.click(plate("South America"));
      expect(startButton()).toBeEnabled();
      expect(plate("Bolivia")).toHaveAttribute("aria-pressed", "true");
      // 別の大陸を開いた時点で外れる。
      fireEvent.click(screen.getByRole("button", { name: "‹ All regions" }));
      fireEvent.click(plate("Europe"));
      expect(startButton()).toBeDisabled();
    },
    TIMEOUT,
  );

  it(
    "一覧に指を乗せると、地図の同じ番号の印も光る",
    () => {
      renderSetup();
      fireEvent.click(plate("Asia"));
      fireEvent.click(plate("Indonesia"));
      const list = screen.getByRole("group", { name: "Boards inside Indonesia" });
      expect(within(list).getAllByRole("button")).toHaveLength(2);
      const bali = within(list).getByRole("button", { name: /Bali/ });
      fireEvent.mouseEnter(bali);
      expect(plate("Bali")).toHaveClass("hot");
      fireEvent.mouseLeave(bali);
      expect(plate("Bali")).not.toHaveClass("hot");
    },
    TIMEOUT,
  );
});

const savedJourney: SavedGameSummary = {
  countryId: CountryId("bolivia"),
  month: 1,
  maxMonths: 12,
  players: [
    { name: "タロウ", isCpu: false, cash: 1200 },
    { name: "CPU 1", isCpu: true, cash: 800 },
  ],
};

/**
 * **「旅に出る」で、セーブ中の旅(Year1・May)が確認なしに消えた**(2026-09-02)。
 * 新しい旅は始めた瞬間に保存されるので、途中の旅があるときは一度止める。
 * 「削除」に付けた確認(v0.28.0)と同じ作りで、文言だけ「新しい旅を始めますか」。
 */
describe("SetupScreen の「旅に出る」と途中の旅", () => {
  const original = useGameStore.getState().startNewGame;
  afterEach(() => {
    useGameStore.setState({ startNewGame: original, savedGame: null });
  });

  function renderWithSaved() {
    // 引数の型を書いておかないと `mock.calls[0][0]` が「無い引数」になり型検査で落ちる。
    const startNewGame = vi.fn<GameStoreState["startNewGame"]>(() => Promise.resolve());
    useGameStore.setState({ startNewGame });
    renderSetup();
    // マウント時に localStorage から読み直して null になるので、そのあとに置く。
    act(() => useGameStore.setState({ savedGame: savedJourney }));
    return startNewGame;
  }

  it(
    "途中の旅があれば確認を挟み、「途中の旅を残す」なら始めない",
    () => {
      const startNewGame = renderWithSaved();
      fireEvent.click(startButton());
      expect(startNewGame).not.toHaveBeenCalled();
      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toHaveTextContent("Start a new journey?");
      expect(dialog).toHaveTextContent("Year 1 · May");
      const keep = screen.getByRole("button", { name: "Keep the saved journey" });
      expect(keep).toHaveFocus();
      fireEvent.click(keep);
      expect(screen.queryByRole("alertdialog")).toBeNull();
      expect(startNewGame).not.toHaveBeenCalled();
      expect(startButton()).toHaveFocus();
    },
    TIMEOUT,
  );

  it(
    "確認で「それでも始める」を選ぶと、選んでいる盤面で始まる",
    async () => {
      const startNewGame = renderWithSaved();
      fireEvent.click(startButton());
      // 開いた直後の一打は連打よけで落ちる。少し待ってから押す。
      await act(() => new Promise((resolve) => setTimeout(resolve, SETTLE_MS + 50)));
      fireEvent.click(screen.getByRole("button", { name: "Start anyway" }));
      expect(startNewGame).toHaveBeenCalledTimes(1);
      expect(startNewGame.mock.calls[0][0]).toMatchObject({ countryId: "bolivia" });
    },
    TIMEOUT,
  );

  it(
    "途中の旅が無ければ、確認なしにそのまま始まる",
    () => {
      const startNewGame = vi.fn(() => Promise.resolve());
      useGameStore.setState({ startNewGame });
      renderSetup();
      fireEvent.click(startButton());
      expect(screen.queryByRole("alertdialog")).toBeNull();
      expect(startNewGame).toHaveBeenCalledTimes(1);
    },
    TIMEOUT,
  );
});
