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

/** 経度・緯度の座標。 */
export type GeoPoint = readonly [longitude: number, latitude: number];

/**
 * 盤面に描く地形(現行コードの `drawBoard` が使う `sea`/`land`/`terrain`/`lakes`/
 * `rivers`/`labels`/`decor`)。座標はすべて経度・緯度で、描画時に
 * `CountryProjection` で盤面座標へ投影する。
 */
export interface CountryTerrain {
  readonly seaColor: string;
  readonly seaWaveColor: string;
  readonly landColor: string;
  readonly coastColor: string;
  readonly landPolygons: readonly (readonly GeoPoint[])[];
  readonly terrainPolygons: readonly (readonly [color: string, polygon: readonly GeoPoint[]])[];
  readonly lakes: readonly (readonly [
    longitude: number,
    latitude: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    color: string,
  ])[];
  readonly rivers: readonly (readonly GeoPoint[])[];
  readonly labels: readonly (readonly [
    longitude: number,
    latitude: number,
    text: LocalizedText,
    isWater: boolean,
  ])[];
  /** 山・木などの装飾(抽出時に評価済みのSVG断片)。 */
  readonly decorSvg: string;
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
  /** 都市カードの帯に使う配色(現行コードの `stripe`)。 */
  readonly stripeColors: readonly string[];
  /** 都市イラストの背景シーン(SVG断片)。キーは `City.artSceneKey`。 */
  readonly artScenes: Readonly<Record<string, string>>;
  /** 都市イラストのシンボル(SVG断片)。キーは `City.artGlyphKey`。 */
  readonly artGlyphs: Readonly<Record<string, string>>;
  /** 盤面に描く地形。 */
  readonly terrain: CountryTerrain;
}

export function getCityOrThrow(pack: CountryContentPack, id: CityId): City {
  const city = pack.cities.find((c) => c.id === id);
  if (!city) throw new Error(`Unknown city in ${pack.id}: ${id}`);
  return city;
}
