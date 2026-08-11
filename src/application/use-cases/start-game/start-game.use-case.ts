import { CountryId, GameSessionId, PlayerId, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { CpuLevel } from "../../../domain/cpu/cpu-level";
import { KnowledgeLevel } from "../../../domain/quiz/knowledge-level";
import { createPlayer } from "../../../domain/player/player";
import { createGameSession, GameSession } from "../../../domain/game-session/game-session";
import { selectNewDestination } from "../../../domain/game-session/destination-selection-service";
import { GameEngineContext } from "../../game-engine-context";

export interface PlayerSetup {
  readonly name: string;
  readonly isCpu: boolean;
  /** 対象国への知識レベル(人間プレイヤーのみ意味を持つ)。 */
  readonly knowledgeLevel?: KnowledgeLevel;
  /**
   * このCPUの強さ。**CPUごとに変えられる**(手加減する相手と、本気の相手を混ぜられる)。
   * 省略したときは `StartGameInput.cpuLevel` を使う。
   */
  readonly cpuLevel?: CpuLevel;
}

export interface StartGameInput {
  readonly countryId: CountryId;
  readonly players: readonly PlayerSetup[];
  readonly maxMonths: number;
  readonly cpuLevel: CpuLevel;
  readonly sessionId: GameSessionId;
}

const STARTING_CASH = 1200;
/** king難易度(merciless)ではCPUに開始資金のボーナスが付く(現行コードの `cfg.cpuLv===2` 分岐)。 */
const MERCILESS_CPU_BONUS = 300;

/** 新しい旅を開始する(現行コードの `startGame`)。 */
export function startGame(
  context: GameEngineContext,
  random: Random,
  input: StartGameInput,
): GameSession {
  const startCityId = context.content.startCityId;
  const startNode = cityIdToNodeId(startCityId);
  const players = input.players.map((setup, index) => {
    // **強さはCPUごと。**指定が無ければゲーム全体の設定を使う(古いセーブとの互換)。
    const level = setup.cpuLevel ?? input.cpuLevel;
    // 開始資金のボーナスも、そのCPU自身の強さで決める。
    const bonus = setup.isCpu && level === "merciless" ? MERCILESS_CPU_BONUS : 0;
    return createPlayer({
      id: PlayerId(`p${index}`),
      name: setup.name,
      isCpu: setup.isCpu,
      cpuLevel: setup.isCpu ? level : undefined,
      knowledgeLevel: setup.knowledgeLevel,
      startingCash: Money.of(STARTING_CASH + bonus),
      startingNode: startNode,
    });
  });

  const allCityIds = context.content.cities.map((c) => c.id);
  const destination = selectNewDestination(
    allCityIds,
    startCityId,
    players.map((p) => p.location),
    (from, to) => context.distanceToCity(from, to),
    random,
  );

  return createGameSession({
    id: input.sessionId,
    countryId: input.countryId,
    maxMonths: input.maxMonths,
    players,
    destination,
  });
}
