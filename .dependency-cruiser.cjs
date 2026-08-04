/**
 * Clean Architecture のレイヤー依存ルールを機械的に強制する設定。
 * docs/10-architecture/01-clean-architecture-overview.md の依存ルールに対応する。
 *
 *   presentation  -> application, domain
 *   infrastructure -> application(のport), domain
 *   application    -> domain
 *   domain         -> (何にも依存しない)
 */
module.exports = {
  forbidden: [
    {
      name: "domain-must-not-depend-on-anything",
      comment:
        "domain層はフレームワーク・他レイヤーに依存してはいけない(依存ゼロが原則)。",
      severity: "error",
      from: { path: "^src/domain" },
      to: {
        path: "^src/(application|infrastructure|presentation)",
      },
    },
    {
      name: "application-must-not-depend-on-infrastructure-or-presentation",
      comment:
        "application層の本体コードはポート(interface)経由でのみ外部に依存し、" +
        "infrastructure/presentationを直接importしてはいけない。" +
        "テストファイル(*.test.ts)は実装を差し替えた統合テストのため例外的に許可する " +
        "(docs/20-testing/01-testing-strategy-tdd.md)。",
      severity: "error",
      from: { path: "^src/application", pathNot: "\\.test\\.ts$" },
      to: { path: "^src/(infrastructure|presentation)" },
    },
    {
      name: "infrastructure-must-not-depend-on-presentation",
      comment: "infrastructure層はpresentation層を知らない。",
      severity: "error",
      from: { path: "^src/infrastructure" },
      to: { path: "^src/presentation" },
    },
    {
      name: "no-circular",
      comment: "循環参照を禁止する。",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
  },
};
