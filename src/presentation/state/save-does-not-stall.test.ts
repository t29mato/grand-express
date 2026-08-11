import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * ユーザーからの報告:「**CPUのダイスを人間が振らないといけなくなっています。**
 * これは完全に意味が分かりません。CPUのターンは自動で進むようにしてください」。
 *
 * ## 原因
 *
 * ヘッダの「保存」は**いつでも押せる**のに、`save()` が `ui` を無条件に
 * `{ kind: "saved" }` へ差し替えていた。
 *
 * モーダルの多くは**閉じたときに手番の続きを走らせる**作りで、とくに
 * **月替わりのモーダルは、閉じたときに `dismissSeasonModal` が
 * CPUの自動進行を再開する唯一の場所**だった。保存を挟むとその続きが失われ、
 * **CPUの手番が始まらないまま盤面が固まる。**
 *
 * 遊ぶ人には「CPUのサイコロを自分が振らされている」ように見える。
 *
 * ## ここで守ること
 *
 * 1. 開いているモーダルを、保存で潰さない
 * 2. 保存のあとに、自動進行を呼び直す
 */
describe("保存しても手番が止まらない", () => {
  const src = readFileSync("src/presentation/state/game-store.ts", "utf8");
  const save = src.slice(src.indexOf("    save() {"));
  const body = save.slice(0, save.indexOf("\n    },"));

  it("開いているモーダルを潰さない(idle のときだけ知らせを出す)", () => {
    expect(body, "ui を無条件に差し替えると、閉じたときに走る続きが失われる").toContain(
      'if (ui.kind === "idle")',
    );
  });

  it("「保存しました」を閉じたら、自動進行を呼び直す", () => {
    // `save()` ではなく `dismissSavedModal()` にある。**そちらが正しい。**
    // 他のモーダルと同じく「閉じたときに続きを走らせる」形に揃っている。
    const dismiss = src.slice(src.indexOf("    dismissSavedModal() {"));
    expect(
      dismiss.slice(0, dismiss.indexOf("\n    },")),
      "保存を挟んでいるあいだにCPUの手番になっていることがある",
    ).toContain("runCpuLoopIfNeeded()");
  });

  it("保存そのものは、モーダルの有無にかかわらず行う", () => {
    expect(body).toContain("saveGame(gameRepository, session)");
  });
});
