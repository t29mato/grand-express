import { beforeAll, describe, expect, it } from "vitest";
import { CityId, CountryId, GameSessionId, NodeId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { createGameSession } from "../../../domain/game-session/game-session";
import { createPlayer } from "../../../domain/player/player";
import { attachToFarthestPlayer, INITIAL_MISFORTUNE_STATE } from "../../../domain/misfortune/misfortune-spirit";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../game-engine-context";
import { settleSpiritAfterTurn } from "./settle-spirit-after-turn.use-case";

describe("settleSpiritAfterTurn", () => {
  const repo = new JsonCountryContentRepository();
  const dest = CityId("sucre");
  let context: GameEngineContext;

  beforeAll(async () => {
    context = createGameEngineContext(await repo.load(CountryId("bolivia")));
  });

  it("厄災の神が憑いていなければ何もしない", () => {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("lapaz") });
    const session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1], destination: dest });
    const result = settleSpiritAfterTurn(context, session);
    expect(result.misfortune.level).toBe(0);
  });

  it("最も遅れているプレイヤーへ移動する", () => {
    const p1 = createPlayer({ id: PlayerId("p1"), name: "A", isCpu: false, startingCash: Money.of(0), startingNode: cityIdToNodeId(dest) }); // 目的地=距離0
    const p2 = createPlayer({ id: PlayerId("p2"), name: "B", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("lapaz") }); // 遠い
    let session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [p1, p2], destination: dest });
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };

    const result = settleSpiritAfterTurn(context, session);
    expect(result.misfortune.holderId).toBe("p2");
  });

  /**
   * ユーザーからの報告:「misfortuneが起きると、**永遠に発生してしまい**、ゲームが進みません」。
   *
   * 原因は2つあった。1つは災難のモーダルを閉じると手番の頭に戻り、押すたび再発したこと。
   * もう1つが**厄災が誰からも離れなかった**ことで、`settleAfterTurn` はドメインに
   * 書かれていたのに、どこからも呼ばれていなかった。
   *
   * 移り先は**目的地からいちばん遠い人**——最下位に付く。なので
   * **自分が最下位を脱した時点で離れる**。逆に最下位のままなら持ち続けるが、
   * それは仕様であって不具合ではない。ここでは前者を固定する。
   */
  it("人間が最下位を脱すると、厄災は人間から離れる", () => {
    const human = createPlayer({ id: PlayerId("p1"), name: "あなた", isCpu: false, startingCash: Money.of(0), startingNode: NodeId("lapaz") });
    const cpu = createPlayer({ id: PlayerId("p2"), name: "CPU 1", isCpu: true, startingCash: Money.of(0), startingNode: NodeId("lapaz") });
    let session = createGameSession({ id: GameSessionId("s"), countryId: CountryId("bolivia"), maxMonths: 12, players: [human, cpu], destination: dest });
    // 人間が最下位のあいだに憑いた状態を作る。
    session = { ...session, misfortune: attachToFarthestPlayer(INITIAL_MISFORTUNE_STATE, PlayerId("p1")) };
    expect(settleSpiritAfterTurn(context, session).misfortune.holderId).toBe("p1");

    // 人間だけが目的地まで進む(=最下位でなくなる)。
    session = {
      ...session,
      players: session.players.map((p) => (p.id === human.id ? { ...p, location: cityIdToNodeId(dest) } : p)),
    };

    expect(
      settleSpiritAfterTurn(context, session).misfortune.holderId,
      "最下位を脱しても厄災が離れない(永遠に発生し続ける)",
    ).toBe("p2");
  });
});
