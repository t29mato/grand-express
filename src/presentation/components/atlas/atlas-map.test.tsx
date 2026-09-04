import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { AtlasMap } from "./atlas-map";
import { LocaleProvider } from "../../i18n/locale-context";
import { TEST_BOARD_LAND, TEST_BOARDS, TEST_CITIES, testAtlasSource } from "./atlas-test-source";
import { AtlasView, showsSeaLabels } from "./atlas-projection";
import { AtlasCamera } from "./use-atlas-camera";
import { CountryId } from "../../../domain/shared-kernel/ids";

/**
 * **引き具合で何を出すか。**この画面のいちばんの決めごとなので、
 * 段ごとに「出ているもの・出ていないもの」を数で押さえる。
 * 全部いっぺんに出すと読めない、というのがここで守りたいこと。
 *
 * 見た目そのもの(重なり・読みやすさ)はjsdomでは分からない。撮って見る。
 */
function fakeCamera(view: AtlasView, widthPx = 1200): AtlasCamera {
  return {
    view,
    aspect: 1.6,
    sizePx: { width: widthPx, height: widthPx / 1.6 },
    setSize: vi.fn(),
    setMinSpan: vi.fn(),
    panByPixels: vi.fn(),
    zoomAt: vi.fn(),
    flyTo: vi.fn(),
    reset: vi.fn(),
    stop: vi.fn(),
  };
}

const JAPAN_BOUNDS = TEST_BOARDS.find((board) => board.id === "japan")!.bounds;

/** 既定は「日本を開いていて、その海岸線も読めている」状態。 */
function drawMap(
  view: AtlasView,
  overrides: Partial<React.ComponentProps<typeof AtlasMap>> = {},
  widthPx = 1200,
) {
  return render(
    <LocaleProvider>
      <AtlasMap
        source={testAtlasSource()}
        camera={fakeCamera(view, widthPx)}
        cities={TEST_CITIES.japan}
        citiesLoading={false}
        boardLand={TEST_BOARD_LAND}
        boardLandBounds={JAPAN_BOUNDS}
        selectedBoardId={CountryId("japan")}
        selectedCityId={null}
        onPickBoard={vi.fn()}
        onPickCity={vi.fn()}
        {...overrides}
      />
    </LocaleProvider>,
  ).container;
}

function renderMap(view: AtlasView, cities = TEST_CITIES.japan) {
  const container = drawMap(view, { cities });
  const count = (selector: string) => container.querySelectorAll(selector).length;
  return {
    gaps: count(".atlas-gaps"),
    covered: count(".atlas-covered"),
    boardRects: count(".atlas-board-rect"),
    boardLabels: count(".atlas-board-labels text"),
    boardLand: count(".atlas-board-land"),
    cityMarks: count(".atlas-city"),
    cityNames: count(".atlas-city-name"),
  };
}

const WORLD: AtlasView = { lon: 0, lat: 12, span: 360 };
const REGION: AtlasView = { lon: 138, lat: 38, span: 40 };
const COUNTRY: AtlasView = { lon: 138, lat: 38, span: 20 };
// 印だけが出る段(9〜14度)。名前が付くのは9度から。
const TOWN: AtlasView = { lon: 138, lat: 36, span: 12 };
// 名前まで出る段。2つの町が両方とも枠に入るように取ってある。
const CLOSE: AtlasView = { lon: 137.75, lat: 35.4, span: 6 };

describe("引き具合で出すものを入れ替える", () => {
  it("世界の眺め: まだ盤面が無い陸を出し、盤面の枠も名前も町も出さない", () => {
    const seen = renderMap(WORLD);
    expect(seen.gaps).toBe(1);
    expect(seen.covered).toBe(1);
    expect(seen.boardRects).toBe(0);
    expect(seen.boardLabels).toBe(0);
    expect(seen.cityMarks).toBe(0);
    // 引いた眺めでは粗い輪郭のまま(盤面の海岸線は読めていても出さない)。
    expect(seen.boardLand).toBe(0);
  });

  it("地域まで寄る: 盤面の枠が出て、大きく映っているものだけ名前が付く", () => {
    const seen = renderMap(REGION);
    expect(seen.boardRects).toBeGreaterThan(0);
    expect(seen.boardLabels).toBeGreaterThan(0);
    expect(seen.cityMarks).toBe(0);
  });

  it("盤面まで寄る: まだ町は出さない(まだ団子になる)", () => {
    expect(renderMap(COUNTRY).cityMarks).toBe(0);
  });

  /**
   * **これが「寄ると緑一色の野原になる」の直し。**
   * 国の段から、その盤面自身の海岸線・地形帯・湖・川を下敷きにする。
   * 塗り分け(金と斜線)はここで引っ込める——海岸線の上に膜がかかるため。
   */
  it("盤面まで寄る: 盤面自身の海岸線が下敷きになり、塗り分けは引っ込む", () => {
    const seen = renderMap(COUNTRY);
    expect(seen.boardLand).toBe(1);
    expect(seen.covered).toBe(0);
    expect(seen.gaps).toBe(0);
    expect(renderMap(TOWN).boardLand).toBe(1);
  });

  it("寄っても、海岸線・地形帯・湖・川がそろって出る", () => {
    const map = drawMap(TOWN);
    const layer = map.querySelector(".atlas-board-land")!;
    // 陸(2枚)+ 切り抜き用の写し。地形帯・湖・川は1件ずつ。
    expect(layer.querySelectorAll("clipPath path")).toHaveLength(TEST_BOARD_LAND.land.length);
    expect(layer.querySelectorAll("ellipse")).toHaveLength(TEST_BOARD_LAND.lakes.length);
    const drawn = [...layer.querySelectorAll("path")].map((node) => node.getAttribute("d") ?? "");
    expect(drawn.filter((d) => d.endsWith("Z")).length).toBeGreaterThanOrEqual(
      TEST_BOARD_LAND.land.length + TEST_BOARD_LAND.terrain.length,
    );
    // 川は閉じない(閉じると河口と源流が結ばれて輪になる)。
    expect(drawn.some((d) => d !== "" && !d.endsWith("Z"))).toBe(true);
    expect(drawn.every((d) => !/NaN|Infinity/.test(d))).toBe(true);
  });

  /**
   * 盤面の四隅には隣の国も入っている(日本の枠の中の朝鮮半島・中国沿岸)。
   * **置き換えるのは、枠に丸ごと収まっている粗いかたまりだけ。**
   */
  it("盤面が描き直すかたまりだけを下げ、枠にまたがる大陸は残す", () => {
    const coarse = (container: HTMLElement) =>
      [...container.querySelectorAll("svg > g > path")].map((n) => n.getAttribute("d") ?? "");
    const withLand = coarse(drawMap(TOWN));
    const without = coarse(drawMap(TOWN, { boardLand: null, boardLandBounds: null }));
    // 検査用の世界は3枚——大陸(枠をまたぐ)・枠に丸ごと収まる島・変更線の向こう。
    expect(without).toHaveLength(3);
    // 収まっている1枚だけが下がる。大陸は残る。
    expect(withLand).toHaveLength(2);
  });

  it("海岸線がまだ読めていなくても、粗い輪郭のまま描ける", () => {
    const seen = render(
      <LocaleProvider>
        <AtlasMap
          source={testAtlasSource()}
          camera={fakeCamera(TOWN)}
          cities={TEST_CITIES.japan}
          citiesLoading={false}
          boardLand={null}
          boardLandBounds={null}
          selectedBoardId={CountryId("japan")}
          selectedCityId={null}
          onPickBoard={vi.fn()}
          onPickCity={vi.fn()}
        />
      </LocaleProvider>,
    ).container;
    expect(seen.querySelectorAll(".atlas-board-land")).toHaveLength(0);
    expect(seen.querySelector("svg")!.getAttribute("viewBox")).not.toMatch(/NaN/);
  });

  it("町まで寄る: 印が出る。名前が付くのはもう一段寄ってから", () => {
    expect(renderMap(TOWN).cityMarks).toBe(TEST_CITIES.japan.length);
    expect(renderMap(TOWN).cityNames).toBe(0);
    expect(renderMap(CLOSE).cityNames).toBe(TEST_CITIES.japan.length);
  });

  // `world` の四隅は地球の陸を丸ごと覆う。枠は画面の縁と重なり、名前は
  // 「地球のどこか」にしか置けない。
  it("世界一周の盤面は、どの段でも地図に枠を出さない", () => {
    for (const view of [REGION, COUNTRY, TOWN]) {
      const svg = render(
        <LocaleProvider>
          <AtlasMap
            source={testAtlasSource()}
            camera={fakeCamera(view)}
            cities={[]}
            citiesLoading={false}
            boardLand={null}
            boardLandBounds={null}
            selectedBoardId={null}
            selectedCityId={null}
            onPickBoard={vi.fn()}
            onPickCity={vi.fn()}
          />
        </LocaleProvider>,
      ).container;
      const labels = [...svg.querySelectorAll(".atlas-board-labels text")].map((n) => n.textContent);
      expect(labels).not.toContain("Around the World");
    }
  });
});

describe("地図そのもの", () => {
  it("枠が測れていなくても viewBox に数でない値が入らない", () => {
    const { container } = render(
      <LocaleProvider>
        <AtlasMap
          source={testAtlasSource()}
          camera={fakeCamera(WORLD, 0)}
          cities={[]}
          citiesLoading={false}
          boardLand={null}
          boardLandBounds={null}
          selectedBoardId={null}
          selectedCityId={null}
          onPickBoard={vi.fn()}
          onPickCity={vi.fn()}
        />
      </LocaleProvider>,
    );
    expect(container.querySelector("svg")!.getAttribute("viewBox")).not.toMatch(/NaN|Infinity/);
  });

  it("読み込み中は「町を読んでいます」と出す", () => {
    const { getByRole } = render(
      <LocaleProvider>
        <AtlasMap
          source={testAtlasSource()}
          camera={fakeCamera(TOWN)}
          cities={[]}
          citiesLoading
          boardLand={null}
          boardLandBounds={null}
          selectedBoardId={CountryId("japan")}
          selectedCityId={null}
          onPickBoard={vi.fn()}
          onPickCity={vi.fn()}
        />
      </LocaleProvider>,
    );
    expect(getByRole("status")).toHaveTextContent("Reading the towns…");
  });

  // 印のSVGを持たない町も、点だけは打つ。地図の上で存在が消えないように。
  it("印の絵が無い町も、印の場所には何か描く", () => {
    const { container } = render(
      <LocaleProvider>
        <AtlasMap
          source={testAtlasSource()}
          camera={fakeCamera(CLOSE)}
          cities={TEST_CITIES.japan}
          citiesLoading={false}
          boardLand={TEST_BOARD_LAND}
          boardLandBounds={JAPAN_BOUNDS}
          selectedBoardId={CountryId("japan")}
          selectedCityId={null}
          onPickBoard={vi.fn()}
          onPickCity={vi.fn()}
        />
      </LocaleProvider>,
    );
    for (const mark of container.querySelectorAll(".atlas-city")) {
      expect(mark.querySelectorAll("circle, rect, path").length).toBeGreaterThan(1);
    }
  });
});

describe("海と地形帯の名前", () => {
  it("地図が小さいうちは出さない(札どうしが重なる)", () => {
    expect(showsSeaLabels(360, 375)).toBe(false);
    expect(showsSeaLabels(360, 1150)).toBe(true);
    expect(showsSeaLabels(360, 0)).toBe(false);
    expect(showsSeaLabels(360, NaN)).toBe(false);
  });
});
