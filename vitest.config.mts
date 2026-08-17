import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**"],
    /**
     * 1件あたりの制限時間。既定の5秒から伸ばしてある。
     *
     * 盤面ごとの検査(`it.each` で全盤面をまわすもの)は、盤面が増えるほど
     * 数が増える。1件は速い(7盤面61件で7.2秒、平均120ms)が、**他の作業と
     * CPUを取り合うと1件が5秒を越えることがある。**実際、盤面を作らせている
     * あいだに `use-board-layout.test.ts` と
     * `json-country-content-repository.test.ts` が一度ずつ落ちた。
     * 中身が壊れたのではなく、間に合わなかっただけだった。
     *
     * **たまに落ちる検査は、落ちても「また例のやつか」で流されるようになる。**
     * 盤面を19枚まで増やすあいだ、ここは落ちないほうが大事。
     * 遅さそのものを測りたいときは、上の実測値と比べること。
     *
     * ## 2026-08-17: 30秒 → 60秒
     *
     * 盤面が30枚になり、**30秒でも足りなくなった。**`npm run check` の中で
     * 3回、別々の検査が時間切れで落ちている(単独ではどれも速い)。
     *
     * ```
     * json-country-content-repository  単独 14.4秒  check の中 31〜48秒
     * setup-screen                     単独 12.3秒  check の中 34秒
     * ```
     *
     * `check` は build と E2E も回すので、その裏で走るぶん1件あたりが伸びる。
     * **中身は壊れていない。**なお `json-country-content-repository` のほうは
     * 上限を上げる前に**中身を速くした**(都市ごとに `expect` を3回呼んで
     * 4,338回になっていたのを1回にまとめ、14.4秒→4.2秒)。
     * **上限を上げるのは、遅さの原因を見てからにすること。**
     */
    testTimeout: 60000,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/domain/**", "src/application/**"],
    },
  },
});
