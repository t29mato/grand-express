/**
 * 例外を投げる代わりに成功/失敗を型で表現するための Result 型。
 * ユースケースの「代表的な異常系」(docs/20-testing/01-testing-strategy-tdd.md)を
 * テストしやすくするために使う。
 */
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const Result = {
  ok<T, E = never>(value: T): Result<T, E> {
    return { ok: true, value };
  },
  err<E, T = never>(error: E): Result<T, E> {
    return { ok: false, error };
  },
};
