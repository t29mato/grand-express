import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../../application/game-engine-context";
import { computeBoardLayout } from "../../hooks/use-board-layout";
import { MESSAGES_BY_LOCALE, formatMessage } from "../../i18n/messages";
import {
  azimuthOf,
  candidateLabel,
  directionFrom,
  nextFocusIndex,
  orderByAzimuth,
  movedToLabel,
  whereYouAreLabel,
} from "./candidate-guide";

const ORIGIN = { x: 100, y: 100 };

describe("azimuthOf / directionFrom", () => {
  // SVGは下向きがy正。素直に atan2(dy, dx) と書くと南北が入れ替わる。
  it("SVGのy軸の向きに合わせて、上が北になる", () => {
    expect(directionFrom(ORIGIN, { x: 100, y: 0 })).toBe("dirN");
    expect(directionFrom(ORIGIN, { x: 100, y: 200 })).toBe("dirS");
    expect(directionFrom(ORIGIN, { x: 200, y: 100 })).toBe("dirE");
    expect(directionFrom(ORIGIN, { x: 0, y: 100 })).toBe("dirW");
  });

  it("斜めの4方位も出せる", () => {
    expect(directionFrom(ORIGIN, { x: 200, y: 0 })).toBe("dirNE");
    expect(directionFrom(ORIGIN, { x: 200, y: 200 })).toBe("dirSE");
    expect(directionFrom(ORIGIN, { x: 0, y: 200 })).toBe("dirSW");
    expect(directionFrom(ORIGIN, { x: 0, y: 0 })).toBe("dirNW");
  });

  it("方位角は北=0で時計回り", () => {
    expect(azimuthOf(ORIGIN, { x: 100, y: 0 })).toBeCloseTo(0);
    expect(azimuthOf(ORIGIN, { x: 200, y: 100 })).toBeCloseTo(Math.PI / 2);
    expect(azimuthOf(ORIGIN, { x: 100, y: 200 })).toBeCloseTo(Math.PI);
    expect(azimuthOf(ORIGIN, { x: 0, y: 100 })).toBeCloseTo(Math.PI * 1.5);
  });
});

describe("orderByAzimuth", () => {
  it("北から時計回りに並べる", () => {
    const positions = new Map([
      [NodeId("here"), ORIGIN],
      [NodeId("w"), { x: 0, y: 100 }],
      [NodeId("n"), { x: 100, y: 0 }],
      [NodeId("s"), { x: 100, y: 200 }],
      [NodeId("e"), { x: 200, y: 100 }],
    ]);
    const ordered = orderByAzimuth(
      [NodeId("w"), NodeId("s"), NodeId("e"), NodeId("n")],
      positions,
      NodeId("here"),
    );
    expect(ordered).toEqual([NodeId("n"), NodeId("e"), NodeId("s"), NodeId("w")]);
  });

  it("現在地の位置が取れないときは元の並びのまま返す", () => {
    const ids = [NodeId("a"), NodeId("b")];
    expect(orderByAzimuth(ids, new Map(), NodeId("missing"))).toEqual(ids);
  });
});

describe("nextFocusIndex", () => {
  it("→ と ← で送る", () => {
    expect(nextFocusIndex("ArrowRight", 0, 4)).toBe(1);
    expect(nextFocusIndex("ArrowLeft", 2, 4)).toBe(1);
    expect(nextFocusIndex("ArrowDown", 0, 4)).toBe(1);
    expect(nextFocusIndex("ArrowUp", 2, 4)).toBe(1);
  });

  // 候補は現在地を囲む輪なので、端で止めずに回り込ませる。
  it("端では回り込む", () => {
    expect(nextFocusIndex("ArrowRight", 3, 4)).toBe(0);
    expect(nextFocusIndex("ArrowLeft", 0, 4)).toBe(3);
  });

  it("Home / End で両端へ飛ぶ", () => {
    expect(nextFocusIndex("Home", 2, 4)).toBe(0);
    expect(nextFocusIndex("End", 0, 4)).toBe(3);
  });

  it("扱わないキーは null", () => {
    expect(nextFocusIndex("Enter", 0, 4)).toBeNull();
    expect(nextFocusIndex("a", 0, 4)).toBeNull();
    expect(nextFocusIndex("ArrowRight", 0, 0)).toBeNull();
  });
});

describe("読み上げ文(実データの盤面)", () => {
  const repo = new JsonCountryContentRepository();
  let context: GameEngineContext;
  let positions: ReadonlyMap<NodeId, { x: number; y: number }>;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
    positions = computeBoardLayout(context);
  });

  function deps(locale: "en" | "ja") {
    const messages = MESSAGES_BY_LOCALE[locale] as unknown as Record<string, string>;
    const session = createGameSession({
      id: GameSessionId("s"),
      countryId: CountryId("bolivia"),
      maxMonths: 12,
      players: [
        createPlayer({
          id: PlayerId("p1"),
          name: "You",
          isCpu: false,
          startingCash: Money.of(1000),
          startingNode: NodeId("lapaz"),
        }),
      ],
      destination: CityId("sucre"),
    });
    return {
      context,
      session,
      t: (key: string, ...args: (string | number)[]) =>
        typeof messages[key] === "string" ? formatMessage(messages[key], ...args) : key,
      tx: (text: { en: string; es: string; fr: string; ja: string } | undefined) => (text ? text[locale] : ""),
    };
  }

  it("目的地そのものは「目的地です」と言い、残りマス数は言わない", () => {
    const label = candidateLabel(deps("ja"), NodeId("sucre"), "dirE");
    expect(label).toContain("スクレ");
    expect(label).toContain("目的地です");
    expect(label).not.toContain("残り");
  });

  it("都市は都市名を、中間マスは種類を言う", () => {
    expect(candidateLabel(deps("ja"), NodeId("oruro"), "dirS")).toContain("オルロ");
    // 実データからクイズマスを1つ拾う。
    const quiz = [...context.graph.nodes].find(([, n]) => n.type === "quiz")![0];
    expect(candidateLabel(deps("ja"), quiz, "dirN")).toContain("クイズのマス");
  });

  it("どの候補にも目的地までの残りが入る(選ぶ判断はここで決まる)", () => {
    const label = candidateLabel(deps("ja"), NodeId("oruro"), "dirS");
    expect(label).toMatch(/スクレまで残り\d+マス/);
  });

  it("英語でも文として成り立つ", () => {
    const label = candidateLabel(deps("en"), NodeId("oruro"), "dirS");
    expect(label).toMatch(/^south, Oruro\. Sucre is \d+ squares away$/);
  });

  it("方位は文言キーとしてそのまま引ける(未訳のキーが漏れない)", () => {
    for (const direction of ["dirN", "dirNE", "dirE", "dirSE", "dirS", "dirSW", "dirW", "dirNW"] as const) {
      const label = candidateLabel(deps("ja"), NodeId("oruro"), direction);
      expect(label, `${direction} が訳されていない`).not.toContain(direction);
    }
  });

  it("現在地の一文は、中間マスにいるときも「どこの間か」で言える", () => {
    const between = [...context.graph.nodes].find(([, n]) => n.type !== "city")![0];
    const label = whereYouAreLabel(deps("ja"), between);
    expect(label).toContain("のあいだ");
    expect(label).toMatch(/スクレまで残り\d+マス/);
  });

  it("現在地が都市なら都市名で言う", () => {
    expect(whereYouAreLabel(deps("ja"), NodeId("lapaz"))).toContain("ラパス");
  });

  // 場所の言い方だけを差し替える作りにすると、前置詞の要る言語で崩れる。
  // フランス語で「Vous êtes Paris」(前置詞なし)になっていたので、文ごと分けた。
  it("英語では都市にも中間マスにも前置詞が付く", () => {
    const between = [...context.graph.nodes].find(([, n]) => n.type !== "city")![0];
    expect(whereYouAreLabel(deps("en"), NodeId("lapaz"))).toMatch(/^You are at La Paz\./);
    expect(whereYouAreLabel(deps("en"), between)).toMatch(/^You are between .+ and .+\./);
  });

  it("移動の通知も都市と中間マスで文を分ける", () => {
    const between = [...context.graph.nodes].find(([, n]) => n.type !== "city")![0];
    expect(movedToLabel(deps("en"), NodeId("lapaz"))).toBe("Moved to La Paz.");
    expect(movedToLabel(deps("en"), between)).toMatch(/^Moved to a square between .+ and .+\.$/);
    expect(movedToLabel(deps("ja"), NodeId("lapaz"))).toBe("ラパスに移動しました。");
  });

  // 盤面の位置から向きを出せることを、実データで一度通しておく。
  it("実データの座標から方位が出せる", () => {
    const here = positions.get(NodeId("lapaz"))!;
    const there = positions.get(NodeId("sucre"))!;
    expect(here).toBeDefined();
    expect(there).toBeDefined();
    // ラパスから見てスクレは南東側(緯度が低く経度が東)。
    expect(directionFrom(here, there)).toMatch(/dirS|dirSE|dirE/);
  });
});
