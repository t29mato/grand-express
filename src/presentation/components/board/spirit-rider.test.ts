import { describe, expect, it } from "vitest";
import { PlayerId } from "../../../domain/shared-kernel/ids";
import { MisfortuneSpiritState } from "../../../domain/misfortune/misfortune-spirit";

import { hauntedPlayerId } from "./spirit-rider";

/**
 * 盤面に厄災の神を出す条件。
 *
 * 2026-08-11、**盤面のどこにも神が出ていなかった。**旅人一覧に 👹 が付くだけで、
 * 地図を見ているあいだは誰が背負っているのか分からない
 * (この種の遊びでは、災いを運ぶ者が乗り物にくっついて追いかけてくる)。
 */
describe("盤面で神を背負う駒", () => {
  const base: MisfortuneSpiritState = {
    holderId: null,
    level: 0,
    turnsOnCurrentHolder: 0,
    resting: false,
    stuckTurnsRemaining: 0,
  };

  it("憑いている駒を返す", () => {
    expect(hauntedPlayerId({ ...base, holderId: PlayerId("p1"), level: 1 })).toBe("p1");
  });

  it("大厄災(level 2)でも返す", () => {
    expect(hauntedPlayerId({ ...base, holderId: PlayerId("p0"), level: 2 })).toBe("p0");
  });

  it("誰にも憑いていなければ null", () => {
    expect(hauntedPlayerId(base)).toBeNull();
  });

  it("まだ現れていない(level 0)なら、holderId が残っていても出さない", () => {
    // 現行の遷移ではこの組み合わせは作られないが、古いセーブや今後の変更で
    // 起こりうる。level を見ずに holderId だけで描くと、ここで神が居座る。
    expect(hauntedPlayerId({ ...base, holderId: PlayerId("p1"), level: 0 })).toBeNull();
  });
});
