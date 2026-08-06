/**
 * 識別子はすべて文字列ベースのブランド型にし、
 * `CityId` と `PlayerId` を取り違えるようなバグをコンパイル時に検出できるようにする。
 */
type Brand<Value, Tag extends string> = Value & { readonly __brand: Tag };

export type CountryId = Brand<string, "CountryId">;
export const CountryId = (value: string): CountryId => value as CountryId;

export type CityId = Brand<string, "CityId">;
export const CityId = (value: string): CityId => value as CityId;

/** 盤面上の1マス。都市そのもの、または路線上の中間マス。 */
export type NodeId = Brand<string, "NodeId">;
export const NodeId = (value: string): NodeId => value as NodeId;

/**
 * 都市ノードは `NodeId(city.id)` として盤面グラフに登録される
 * (board-graph-builder.ts)ため、文字列としては同じ値になる。
 * 型を跨いで使う箇所ではこの変換関数を通す。
 */
export const cityIdToNodeId = (id: CityId): NodeId => id as string as NodeId;

export type RegionId = Brand<string, "RegionId">;
export const RegionId = (value: string): RegionId => value as RegionId;

export type PlayerId = Brand<string, "PlayerId">;
export const PlayerId = (value: string): PlayerId => value as PlayerId;

export type ItemKey = Brand<string, "ItemKey">;
export const ItemKey = (value: string): ItemKey => value as ItemKey;

export type GameSessionId = Brand<string, "GameSessionId">;
export const GameSessionId = (value: string): GameSessionId =>
  value as GameSessionId;

/** 都市内での物件のインデックス(0始まり)。 */
export type PropertyIndex = Brand<number, "PropertyIndex">;
export const PropertyIndex = (value: number): PropertyIndex =>
  value as PropertyIndex;

/** `${CityId}#${PropertyIndex}` 形式のキー。現行コードの `propKey(c,i)` に相当。 */
/** クイズ問題の識別子。コンテンツ内での並び順から `q0`, `q1`… として与える。 */
export type MoneyEventId = Brand<string, "MoneyEventId">;
export const MoneyEventId = (value: string): MoneyEventId => value as MoneyEventId;

export type QuizQuestionId = Brand<string, "QuizQuestionId">;
export const QuizQuestionId = (value: string): QuizQuestionId => value as QuizQuestionId;

export type PropertyRef = Brand<string, "PropertyRef">;
export const PropertyRef = {
  of(cityId: CityId, index: PropertyIndex): PropertyRef {
    return `${cityId}#${index}` as PropertyRef;
  },
  parse(ref: PropertyRef): { cityId: CityId; index: PropertyIndex } {
    const [cityId, indexStr] = ref.split("#");
    return { cityId: CityId(cityId), index: PropertyIndex(Number(indexStr)) };
  },
};
