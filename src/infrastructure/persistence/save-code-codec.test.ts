import { describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId } from "../../domain/shared-kernel/ids";
import { Money } from "../../domain/shared-kernel/money";
import { createGameSession } from "../../domain/game-session/game-session";
import { createPlayer } from "../../domain/player/player";
import { toSnapshot } from "../../application/dto/game-session-snapshot";
import { SaveCodeCodec } from "./save-code-codec";
import { InvalidSaveDataError } from "./save-schema";

function snapshot() {
  const p1 = createPlayer({ id: PlayerId("p1"), name: "太郎", isCpu: false, startingCash: Money.of(1200), startingNode: NodeId("lapaz") });
  const session = createGameSession({ id: GameSessionId("s1"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: CityId("sucre") });
  return toSnapshot(session);
}

describe("SaveCodeCodec", () => {
  it("エンコードしたコードをデコードすると元のスナップショットに戻る(日本語名も含む)", () => {
    const code = SaveCodeCodec.encode(snapshot());
    expect(SaveCodeCodec.decode(code)).toEqual(snapshot());
  });

  it("壊れたコードはInvalidSaveDataErrorになる", () => {
    expect(() => SaveCodeCodec.decode("これは壊れたコードです!!!")).toThrow(InvalidSaveDataError);
  });

  it("スキーマに合わないJSONもInvalidSaveDataErrorになる", () => {
    const badCode = btoa(JSON.stringify({ hello: "world" }));
    expect(() => SaveCodeCodec.decode(badCode)).toThrow(InvalidSaveDataError);
  });
});
