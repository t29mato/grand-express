import { CityId, CountryId, ItemKey, RegionId } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";
import { City, Edge } from "../board/city";
import { CountryProjection } from "../board/board-projection";
import { ItemDefinition } from "../item/item";
import { QuizQuestion } from "../quiz/quiz-question";
import { SeasonDefinition } from "../season/season-effect";
import { DoomFlavor } from "../misfortune/doom-effect";

export interface CurrencyFormat {
  readonly prefix: string;
  readonly suffix: string;
  readonly multiplier: number;
}

/** 「厄災の神」のフレーバー(名前・絵文字・各種メッセージテンプレート)。 */
export interface SpiritFlavor {
  readonly emoji: string;
  readonly name: LocalizedText;
  readonly bigName: LocalizedText;
  /** どのアイテムを持っていると発動を防げるか(現行コードの `spirit.ward`)。 */
  readonly wardItemKey: ItemKey;
  readonly arriveTemplate: LocalizedText;
  readonly movesTemplate: LocalizedText;
  readonly wakeTemplate: LocalizedText;
  readonly wakeFactTemplate: LocalizedText;
  readonly pleasedTemplate: LocalizedText;
  readonly wardBodyTemplate: LocalizedText;
}

/**
 * 国コンテンツパック(ボリビア/日本)。ライフサイクルを持たない参照専用データ。
 * `CountryContentRepository` 経由で読み込む(docs/10-architecture/02-domain-model-ddd.md 2.4節)。
 */
export interface CountryContentPack {
  readonly id: CountryId;
  readonly name: LocalizedText;
  readonly blurb: LocalizedText;
  readonly currency: CurrencyFormat;
  readonly startCityId: CityId;
  readonly cpuNames: readonly string[];
  readonly projection: CountryProjection;
  readonly regions: ReadonlyMap<RegionId, LocalizedText>;
  readonly cities: readonly City[];
  readonly edges: readonly Edge[];
  readonly items: readonly ItemDefinition[];
  readonly quiz: readonly QuizQuestion[];
  /** 12件、インデックス0=4月。 */
  readonly seasons: readonly SeasonDefinition[];
  readonly doomFlavors: readonly DoomFlavor[];
  readonly spirit: SpiritFlavor;
}

export function getCityOrThrow(pack: CountryContentPack, id: CityId): City {
  const city = pack.cities.find((c) => c.id === id);
  if (!city) throw new Error(`Unknown city in ${pack.id}: ${id}`);
  return city;
}
