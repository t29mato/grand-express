import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { AtlasScreen } from "./atlas-screen";
import { LocaleProvider } from "../../i18n/locale-context";
import { TEST_CITIES, testAtlasSource } from "./atlas-test-source";
import { AtlasSource } from "./atlas-source";
import { CountryId } from "../../../domain/shared-kernel/ids";

/**
 * 地図帳の画面。
 *
 * **地図そのものの見た目は、ここでは確かめられない。**jsdomは何も配置しない
 * ので枠の実寸は0で、SVGは1点も描かれない。見た目は撮って目で見る。
 * ここで見るのは
 *
 * - **数でない値を `viewBox` に流さないこと**(枠が測れない状態がまさにそれ)、
 * - **キーボードと読み上げの道**——盤面の一覧から町の詳細まで辿り着けること、
 * - **町を寄ったときだけ読むこと**と、読んでいるあいだの見せかた。
 */
function renderAtlas(source: AtlasSource = testAtlasSource()) {
  return render(
    <LocaleProvider>
      <AtlasScreen source={source} />
    </LocaleProvider>,
  );
}

const mapSvg = () => document.querySelector("svg.atlas-map")!;
const viewBoxNumbers = () => mapSvg().getAttribute("viewBox")!.split(" ").map(Number);

describe("開いたところ", () => {
  it("枠がまだ測れていなくても、viewBox に数でない値が入らない", () => {
    renderAtlas();
    expect(mapSvg().getAttribute("viewBox")).not.toMatch(/NaN|Infinity/);
    expect(viewBoxNumbers().every(Number.isFinite)).toBe(true);
  });

  it("世界の眺めから始まり、塗り分けの読みかたが出ている", () => {
    renderAtlas();
    expect(viewBoxNumbers()[2]).toBe(360);
    expect(screen.getByText("Boards you can play")).toBeInTheDocument();
    expect(screen.getByText("No board here yet")).toBeInTheDocument();
  });

  it("盤面の一覧が3つに分かれている(盤面・広い盤面・地図の外)", () => {
    renderAtlas();
    expect(screen.getByRole("heading", { name: "Boards" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Boards that span a whole region" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Away from the map" })).toBeInTheDocument();
  });

  /**
   * 地球の上に置けない盤面(太陽系)を地図に描こうとすると、四隅が
   * すべて0の長方形になる。**一覧には出すが、地図には出さない。**
   */
  it("太陽系は「地図の外」に入る", () => {
    renderAtlas();
    const group = screen.getByRole("heading", { name: "Away from the map" }).parentElement!;
    expect(within(group).getByRole("button", { name: /The Solar System/ })).toBeInTheDocument();
  });

  /**
   * **地図の外の盤面の中身は、地図に置かない。**
   *
   * 太陽系は真下に来ようがないので、一覧から選ぶと選ばれたままになる。
   * その状態で惑星を押すと地図がそこへ寄り、**惑星をつなぐ線と印が
   * ギニア湾の沖に現れた**(撮って分かった)。一覧には今までどおり並ぶ
   * ——遊べないのではなく、地図に描きようが無いというだけ。
   */
  it("太陽系の惑星を押しても、地図には印も線も出ない(一覧には出る)", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /The Solar System/ }));
    fireEvent.click(await screen.findByRole("button", { name: /Saturn/ }));

    // 町まで寄った眺めになっている(ここで出るなら出てしまう段)。
    await waitFor(() => expect(viewBoxNumbers()[2]).toBeLessThan(14));
    expect(mapSvg().querySelectorAll(".atlas-city")).toHaveLength(0);
    expect(mapSvg().querySelectorAll(".atlas-routes")).toHaveLength(0);
    // 詳細の札と一覧のほうは、今までどおり開く。
    expect(screen.getAllByRole("button", { name: /Uranus/ }).length).toBeGreaterThan(0);
  });
});

describe("一覧から盤面へ、盤面から町へ", () => {
  it("盤面を押すとその盤面へ寄り、中の町が一覧に並ぶ", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));

    // 寄っている(世界ぜんぶより狭い)。
    await waitFor(() => expect(viewBoxNumbers()[2]).toBeLessThan(360));
    expect(viewBoxNumbers().every(Number.isFinite)).toBe(true);

    // 町は押したあとに読む。
    expect(await screen.findByRole("button", { name: /Tokyo/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kyoto/ })).toBeInTheDocument();
  });

  it("開いた盤面には「この盤面で遊ぶ」への導線がある", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));
    const play = await screen.findAllByRole("link", { name: "Play this board" });
    expect(play[0]).toHaveAttribute("href", "/?board=japan");
  });

  it("町を押すと、名前・一言・解説の出た札が開く", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));
    fireEvent.click(await screen.findByRole("button", { name: /Tokyo/ }));

    const card = await screen.findByRole("heading", { name: "Tokyo" });
    const detail = card.closest(".atlas-detail")!;
    expect(within(detail as HTMLElement).getByText("The capital")).toBeInTheDocument();
    expect(
      within(detail as HTMLElement).getByText(/grew from a fishing village/),
    ).toBeInTheDocument();
  });

  // 押した瞬間にフォーカスが宙に浮くと、読み上げでは何が起きたのか分からない。
  it("札が開いたら、そこへフォーカスが移る", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));
    fireEvent.click(await screen.findByRole("button", { name: /Tokyo/ }));
    await waitFor(() =>
      expect(document.activeElement).toBe(document.querySelector(".atlas-detail")),
    );
  });

  it("Escapeでも閉じるボタンでも札は閉じる", async () => {
    renderAtlas();
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));
    fireEvent.click(await screen.findByRole("button", { name: /Tokyo/ }));
    await screen.findByRole("heading", { name: "Tokyo" });

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Tokyo" })).toBeNull());

    fireEvent.click(screen.getByRole("button", { name: /Tokyo/ }));
    fireEvent.click(await screen.findByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Tokyo" })).toBeNull());
  });
});

describe("町を読むあいだ", () => {
  it("読み終わるまで「町を読んでいます」と言う(黙って空のまま待たない)", async () => {
    let release: (cities: typeof TEST_CITIES.japan) => void = () => {};
    const slow = testAtlasSource({
      loadAtlasCities: () =>
        new Promise((resolve) => {
          release = resolve;
        }),
    });
    renderAtlas(slow);
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));

    expect(await screen.findAllByText("Reading the towns…")).not.toHaveLength(0);
    release(TEST_CITIES.japan);
    expect(await screen.findByRole("button", { name: /Tokyo/ })).toBeInTheDocument();
  });

  /** 読めない盤面があっても地図は使える。同じ盤面を何度も取りに行かない。 */
  it("読み込みに失敗しても壊れず、取りに行くのは1度だけ", async () => {
    const load = vi.fn().mockRejectedValue(new Error("読めない"));
    renderAtlas(testAtlasSource({ loadAtlasCities: load }));
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));

    expect(await screen.findByText("No towns to show on this board.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^France/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Japan/ }));
    await waitFor(() => expect(load).toHaveBeenCalledWith(CountryId("japan")));
    expect(load.mock.calls.filter(([id]) => id === "japan")).toHaveLength(1);
  });

  /**
   * **2,218件を最初に読まない。**開いただけでは1件も読みに行かないこと。
   */
  it("開いただけでは町を1件も読まない", () => {
    const load = vi.fn().mockResolvedValue([]);
    renderAtlas(testAtlasSource({ loadAtlasCities: load }));
    expect(load).not.toHaveBeenCalled();
  });
});

describe("キーボードで地図を動かす", () => {
  it("+ で寄り、- で引き、0 で世界ぜんぶへ戻る", async () => {
    renderAtlas();
    const map = screen.getByRole("group", { name: /arrow keys move/i });

    fireEvent.keyDown(map, { key: "+" });
    await waitFor(() => expect(viewBoxNumbers()[2]).toBeLessThan(360));
    const zoomed = viewBoxNumbers()[2];

    fireEvent.keyDown(map, { key: "-" });
    await waitFor(() => expect(viewBoxNumbers()[2]).toBeGreaterThan(zoomed));

    fireEvent.keyDown(map, { key: "+" });
    fireEvent.keyDown(map, { key: "+" });
    fireEvent.keyDown(map, { key: "0" });
    await waitFor(() => expect(viewBoxNumbers()[2]).toBe(360));
  });

  it("矢印キーで動かしても、viewBox は数のまま", async () => {
    renderAtlas();
    const map = screen.getByRole("group", { name: /arrow keys move/i });
    for (const key of ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) {
      fireEvent.keyDown(map, { key });
    }
    await waitFor(() => expect(viewBoxNumbers().every(Number.isFinite)).toBe(true));
  });
});

describe("言葉での地図(読み上げ)", () => {
  it("いま何が見えているかを、遅れて一文で伝える", async () => {
    vi.useFakeTimers();
    try {
      renderAtlas();
      const live = document.querySelector('[role="status"][aria-live="polite"]')!;
      expect(live.textContent).toBe("");
      vi.advanceTimersByTime(900);
      await vi.waitFor(() => expect(live.textContent).toMatch(/Whole world\. \d+ boards/));
    } finally {
      vi.useRealTimers();
    }
  });
});
