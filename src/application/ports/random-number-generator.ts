/**
 * Domainの `Random` ポートをApplication層からも参照しやすいよう re-export する
 * (docs/10-architecture/03-target-folder-structure.md の想定に合わせる)。
 */
export type { Random as RandomNumberGenerator } from "../../domain/shared-kernel/random";
