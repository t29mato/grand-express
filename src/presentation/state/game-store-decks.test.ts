import { describe, expect, it, vi } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../application/game-engine-context";
import { createTurnFlowActions } from "./game-store-turn-flow";

/**
 * ユーザーからの報告:「The chai wallah won't take payment が、ボリビアで出てきましたが、
 * これはインドです」。
 *
 * 出来事の山札(`MoneyEventSelector`)は `if (!moneyEventSelector)` で
 * **一度きりしか作られなかった。**`context` は国ごとに差し替わるのに、山札は前の国のまま。
 * クイズの山札だけはゲーム開始時に作り直していたので、**片方だけ捨て忘れていた**形。
 *
 * `resetDecks` を呼んでから引いて、**その国の出来事しか出ない**ことを見る。
 */
describe("国を変えたときの出来事の山札", () => {
  it("作り直したあとは、その国の出来事しか引かれない", async () => {
    const repo = new JsonCountryContentRepository();
    const india = createGameEngineContext(await repo.load(CountryId("india")));
    const bolivia = createGameEngineContext(await repo.load(CountryId("bolivia")));

    const boliviaIds = new Set(bolivia.content.moneyEvents.map((e) => e.id));
    const indiaOnly = india.content.moneyEvents.filter((e) => !boliviaIds.has(e.id));
    expect(indiaOnly.length, "前提: インドにしかない出来事があること").toBeGreaterThan(0);

    // 地方は、その盤面に実在するものを使う(全国の出来事は regs が空)。
    const indiaRegion = Object.keys(india.content.regions ?? {})[0] as never;
    const boliviaRegion = Object.keys(bolivia.content.regions ?? {})[0] as never;

    // ストアの代わりに、国だけを差し替える最小の get を渡す。
    let current = india;
    const get = (() => ({ context: current, session: undefined })) as never;
    const flow = createTurnFlowActions((() => {}) as never, get);

    // インドで山札を作り、実際にインドの出来事が引けることを確かめる(空振り防止)。
    flow.resetDecks(india.content);
    const fromIndia = new Set<string>();
    for (let i = 0; i < 60; i++) {
      for (const kind of ["gain", "loss"] as const) {
        const e = flow.drawMoneyEvent(kind, indiaRegion);
        if (e) fromIndia.add(e.id);
      }
    }
    expect(fromIndia.size, "インドの山札から1件も引けていない(テストが空振り)").toBeGreaterThan(0);

    // 国を変えて作り直す。
    current = bolivia;
    flow.resetDecks(bolivia.content);

    const drawn = new Set<string>();
    for (let i = 0; i < 200; i++) {
      for (const kind of ["gain", "loss"] as const) {
        const e = flow.drawMoneyEvent(kind, boliviaRegion);
        if (e) drawn.add(e.id);
      }
    }
    expect(drawn.size, "ボリビアの山札から1件も引けていない(テストが空振り)").toBeGreaterThan(0);

    const leaked = [...drawn].filter((id) => !boliviaIds.has(id));
    expect(leaked, "ボリビアに無い出来事が引かれた(前の国の山札が残っている)").toEqual([]);
  });
});
