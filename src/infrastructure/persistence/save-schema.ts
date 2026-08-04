import { z } from "zod";

/**
 * `GameSessionSnapshot` のzodスキーマ(ADR-0005)。
 * localStorage/共有コードから読み込んだデータは常にこれで検証し、
 * 壊れたデータや古い形式のデータが原因で実行時エラーになることを防ぐ。
 */
const PlayerSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  isCpu: z.boolean(),
  cpuLevel: z.enum(["gentle", "normal", "merciless"]).optional(),
  cash: z.number(),
  location: z.string(),
  portfolio: z.record(z.string(), z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])),
  inventory: z.array(z.string()),
  skipNextTurn: z.boolean(),
  hasExtraTurn: z.boolean(),
});

export const GameSessionSnapshotSchemaV1 = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),
  countryId: z.string(),
  month: z.number(),
  maxMonths: z.number(),
  activePlayerIndex: z.number(),
  players: z.array(PlayerSnapshotSchema),
  destination: z.string(),
  misfortune: z.object({
    holderId: z.string().nullable(),
    level: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    turnsOnCurrentHolder: z.number(),
    resting: z.boolean(),
    stuckTurnsRemaining: z.number(),
  }),
  status: z.enum(["in-progress", "finished"]),
  regionIncomeModifiers: z.record(z.string(), z.number()),
});

/**
 * バージョン別のスキーマ一覧。将来スキーマを変更する場合は
 * `GameSessionSnapshotSchemaV2` を追加し、`migrations/` にv1→v2の
 * 変換関数を用意する(ADR-0005)。
 */
export const SAVE_SCHEMAS_BY_VERSION = {
  1: GameSessionSnapshotSchemaV1,
} as const;

export class InvalidSaveDataError extends Error {
  constructor(cause: unknown) {
    super("Save data failed schema validation");
    this.cause = cause;
  }
}

export function parseSaveData(raw: unknown): z.infer<typeof GameSessionSnapshotSchemaV1> {
  const versionCheck = z.object({ schemaVersion: z.number() }).safeParse(raw);
  const version = versionCheck.success ? versionCheck.data.schemaVersion : 1;
  const schema = SAVE_SCHEMAS_BY_VERSION[version as keyof typeof SAVE_SCHEMAS_BY_VERSION];
  if (!schema) {
    throw new InvalidSaveDataError(`Unsupported save schema version: ${version}`);
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new InvalidSaveDataError(result.error);
  }
  return result.data;
}
