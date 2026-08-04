/**
 * ドメインイベント基底型。
 *
 * 現行コードは状態変更・ログ表示・効果音再生・DOM更新を1つの関数内で行っていた
 * (例: `cityStop`, `spiritStrike`)。ユースケースは状態を変更した後にイベントを
 * 発行するだけとし、ログ・演出・音声はイベント購読側(Presentation/Infrastructure)
 * の責務とする(docs/10-architecture/02-domain-model-ddd.md 5章 参照)。
 */
export interface DomainEvent<
  Name extends string = string,
  Payload = unknown,
> {
  readonly name: Name;
  readonly payload: Payload;
}

export function createEvent<Name extends string, Payload>(
  name: Name,
  payload: Payload,
): DomainEvent<Name, Payload> {
  return { name, payload };
}

/** イベントを蓄積し、ユースケースの戻り値として返すための小さなバッファ。 */
export class DomainEventRecorder {
  private events: DomainEvent[] = [];

  record(event: DomainEvent): void {
    this.events.push(event);
  }

  drain(): DomainEvent[] {
    const drained = this.events;
    this.events = [];
    return drained;
  }
}
