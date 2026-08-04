import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTLのDOMを各テストの後に確実に片付ける(コンポーネントテスト間の汚染を防ぐ)。
afterEach(() => {
  cleanup();
});

/**
 * Node 22+ が実験的なグローバル `localStorage` を提供するようになったことで、
 * vitestのjsdom環境がjsdom本来の `window.localStorage` をpopulateGlobalの
 * 段階でスキップしてしまい、`window.localStorage` が `undefined` になる問題への対処。
 * (`k in global` が真になるキーは明示的なallowlistに無い限り上書きされないため)
 * テスト環境用に簡易的なインメモリStorage実装を明示的に割り当てる。
 */
if (typeof window !== "undefined" && !window.localStorage) {
  class MemoryStorage implements Storage {
    private store = new Map<string, string>();
    get length(): number {
      return this.store.size;
    }
    clear(): void {
      this.store.clear();
    }
    getItem(key: string): string | null {
      return this.store.has(key) ? this.store.get(key)! : null;
    }
    key(index: number): string | null {
      return [...this.store.keys()][index] ?? null;
    }
    removeItem(key: string): void {
      this.store.delete(key);
    }
    setItem(key: string, value: string): void {
      this.store.set(key, String(value));
    }
  }

  Object.defineProperty(window, "localStorage", {
    value: new MemoryStorage(),
    writable: true,
    configurable: true,
  });
}
