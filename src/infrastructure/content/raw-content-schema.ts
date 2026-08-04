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
  q: LocalizedTextSchema,
  o: z.array(LocalizedTextSchema),
  a: z.number(),
  f: LocalizedTextSchema,
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
  edges: z.array(z.tuple([z.string(), z.string()])),
  quiz: z.array(RawQuizSchema),
  items: z.record(z.string(), RawItemSchema),
  spirit: RawSpiritSchema,
  doom: z.array(RawDoomSchema),
  seasons: z.array(RawSeasonSchema),
});

export type RawCountryContent = z.infer<typeof RawCountryContentSchema>;
