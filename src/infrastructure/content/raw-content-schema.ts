import { z } from "zod";

/** 抽出スクリプト(scripts/extract-legacy-content.mjs)が出力するJSONの形。 */
export const LocalizedTextSchema = z.object({
  en: z.string(),
  es: z.string(),
  fr: z.string(),
  ja: z.string(),
});

const RawPropertySchema = z.object({
  n: LocalizedTextSchema,
  cost: z.number(),
  inc: z.number(),
});

const RawCitySchema = z.object({
  n: LocalizedTextSchema,
  lo: z.number(),
  la: z.number(),
  reg: z.string(),
  tag: LocalizedTextSchema,
  fact: LocalizedTextSchema,
  props: z.array(RawPropertySchema),
  /** 都市イラストの背景シーンのキー(`bg` の要素を指す)。 */
  bg: z.string(),
  /** 都市イラストのシンボル(グリフ)のキー(`marks` の要素を指す)。 */
  mark: z.string(),
  /** 盤面上の都市名ラベルの位置("l"=左 / "r"=右 / それ以外=下)。 */
  lp: z.string().optional(),
});

const RawItemSchema = z.object({
  e: z.string(),
  price: z.number(),
  kind: z.enum(["move", "pre", "passive"]),
  n: LocalizedTextSchema,
  d: LocalizedTextSchema,
  f: LocalizedTextSchema,
});

const RawQuizSchema = z.object({
  /** 問題の難易度(1〜10)。scripts/content-overrides/quiz-difficulty.mjs で付与する。 */
  difficulty: z.number().int().min(1).max(10),
  q: LocalizedTextSchema,
  o: z.array(LocalizedTextSchema),
  a: z.number(),
  f: LocalizedTextSchema,
});

const RawMoneyEventSchema = z.object({
  id: z.string(),
  kind: z.enum(["gain", "loss"]),
  /** 起こりうる地方。空なら国内どこでも。 */
  regs: z.array(z.string()),
  e: z.string(),
  amount: z.number(),
  n: LocalizedTextSchema,
  t: LocalizedTextSchema,
});

const RawSeasonSchema = z.object({
  e: z.string(),
  n: LocalizedTextSchema,
  t: LocalizedTextSchema,
  f: LocalizedTextSchema,
});

const RawDoomSchema = z.object({
  id: z.string(),
  n: LocalizedTextSchema,
  t: LocalizedTextSchema,
});

const RawSpiritSchema = z.object({
  e: z.string(),
  n: LocalizedTextSchema,
  big: LocalizedTextSchema,
  ward: z.string(),
  arrive: LocalizedTextSchema,
  moves: LocalizedTextSchema,
  wake: LocalizedTextSchema,
  wakeFact: LocalizedTextSchema,
  pleased: LocalizedTextSchema,
  wardBody: LocalizedTextSchema,
});

const RawProjSchema = z.object({
  BW: z.number(),
  BH: z.number(),
  LON0: z.number(),
  LON1: z.number(),
  LAT0: z.number(),
  LAT1: z.number(),
  seg: z.number().optional(),
});

const RawCurrencySchema = z.object({
  pre: z.string(),
  post: z.string(),
  mul: z.number(),
});

export const RawCountryContentSchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  blurb: LocalizedTextSchema,
  cur: RawCurrencySchema,
  start: z.string(),
  cpuNames: z.array(z.string()),
  proj: RawProjSchema,
  regions: z.record(z.string(), LocalizedTextSchema),
  cities: z.record(z.string(), RawCitySchema),
  /**
   * 路線。`[都市A, 都市B]` は陸路、`[都市A, 都市B, "sea"]` は航路。
   * legacy には航路の概念が無かったため、3要素目は省略可能にしている。
   */
  edges: z.array(
    z.union([
      z.tuple([z.string(), z.string()]),
      z.tuple([z.string(), z.string(), z.enum(["rail", "sea"])]),
    ]),
  ),
  quiz: z.array(RawQuizSchema),
  items: z.record(z.string(), RawItemSchema),
  spirit: RawSpiritSchema,
  doom: z.array(RawDoomSchema),
  seasons: z.array(RawSeasonSchema),
  /** 青マス・赤マスで起きる出来事。 */
  moneyEvents: z.array(RawMoneyEventSchema),
  /** 都市カードの帯に使う配色。 */
  stripe: z.array(z.string()),
  /** 都市イラストのシンボル(SVG断片)。キーは各都市の `mark`。 */
  marks: z.record(z.string(), z.string()),
  /** 都市イラストの背景シーン(SVG断片)。キーは各都市の `bg`。 */
  bg: z.record(z.string(), z.string()),

  // --- 盤面の地形(legacyの `drawBoard` が描く背景レイヤー) ---
  /** 海の塗り色と波模様の線の色。 */
  sea: z.string(),
  seaWave: z.string(),
  /** 陸地の塗り色と海岸線の色。 */
  landBase: z.string(),
  coast: z.string(),
  /** 陸地の輪郭(経度・緯度の多角形)。 */
  land: z.array(z.array(z.tuple([z.number(), z.number()]))),
  /** 地形(色と多角形の組)。陸地でクリップして描く。 */
  terrain: z.array(z.tuple([z.string(), z.array(z.tuple([z.number(), z.number()]))])),
  /** 湖(経度・緯度・半径x・半径y・回転・色)。 */
  lakes: z.array(z.tuple([z.number(), z.number(), z.number(), z.number(), z.number(), z.string()])),
  /** 河川(経度・緯度の折れ線)。 */
  rivers: z.array(z.array(z.tuple([z.number(), z.number()]))),
  /** 地名ラベル(経度・緯度・文言・水域かどうか)。 */
  labels: z.array(z.tuple([z.number(), z.number(), LocalizedTextSchema, z.number()])),
  /** 盤面の装飾(山・木など)。抽出時に評価済みのSVG断片。 */
  decor: z.string(),
});

export type RawCountryContent = z.infer<typeof RawCountryContentSchema>;
