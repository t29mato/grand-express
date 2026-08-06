import { Random } from "../shared-kernel/random";
import { RegionId } from "../shared-kernel/ids";
import { MoneyEvent, eventsFor } from "./money-event";

/**
 * 青マス・赤マスの出来事を引く。
 *
 * クイズと同じく**使い切るまで同じ話を出さない**(山札方式)。同じ旅のうちに
 * 「またスリに遭った」が何度も続くと、土地の話としての説得力がなくなるため。
 * 山は種別(増える/減る)ごとに分けて持つ。
 */
export class MoneyEventSelector {
  private readonly remaining = new Map<MoneyEvent["kind"], MoneyEvent[]>();

  constructor(
    private readonly allEvents: readonly MoneyEvent[],
    private readonly random: Random,
  ) {}

  /** その地方で起こりうる出来事を1つ引く。 */
  draw(kind: MoneyEvent["kind"], regionId: RegionId, monthIndex?: number): MoneyEvent {
    const pool = eventsFor(this.allEvents, kind, regionId, monthIndex);
    if (pool.length === 0) {
      throw new Error(`No money events of kind "${kind}"`);
    }

    let bag = this.remaining.get(kind) ?? [];
    // その地方で使える話が山に残っていなければ、山を作り直す。
    let usable = bag.filter((event) => pool.includes(event));
    if (usable.length === 0) {
      bag = [...this.allEvents.filter((event) => event.kind === kind)];
      usable = bag.filter((event) => pool.includes(event));
    }

    const chosen = usable[this.random.nextInt(usable.length)];
    this.remaining.set(
      kind,
      bag.filter((event) => event !== chosen),
    );
    return chosen;
  }
}
