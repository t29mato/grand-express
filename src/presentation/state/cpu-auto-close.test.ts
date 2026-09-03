import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * ユーザーからの報告:「CPUの手番で、決めることが無いのに『続ける』を押させる回数が多い」。
 *
 * ## 何が起きていたか
 *
 * CPUの町・クイズは前から `waitForModal` で自動的に閉じていた。ところが
 * **青マス・赤マスの出来事は `waitForModal` を呼んでいるのに、待つ対象の
 * 一覧に入っていなかった**ので、すぐ抜けて押すまで残っていた。
 * **月替わり**も、CPUの手番中に `return` してループごと止めていた。
 *
 * ## なぜここで見るか
 *
 * E2Eでも書いたが、**測りかたを2度間違えた。**
 * 1度目は「自分の手番のあと押さずに待つ」——自分がクイズマスに止まって進まなかった
 * (それは決めることがある場面なので正しい挙動)。
 * 2度目はCPUのモーダルが出るまで待つ形にしたが、**出るかどうかが運任せ**で、
 * 待ち時間が試験全体の制限を超えた。
 *
 * 運に左右されない形として、**待つ対象に入っていること**だけを固定する。
 */
describe("CPUの手番で自動的に閉じるもの", () => {
  const src = readFileSync("src/presentation/state/game-store-turn-flow.ts", "utf8");
  const autoCloseList = () => {
    const list = src.slice(src.indexOf("const CPU_AUTO_CLOSE"));
    return list.slice(0, list.indexOf("]"));
  };

  it("出来事(青・赤マス)が、待つ対象に入っている", () => {
    expect(autoCloseList(), "money-event が抜けると、押すまで閉じなくなる").toContain('"money-event"');
  });

  /**
   * **2026-09-02 に方針が変わった。**
   *
   * それまでは「CPUの手番では厄災のモーダルを出さず音だけ」だったので、
   * `doom` を待つ対象に入れる必要が無かった。いまは出す——厄災の神が
   * 誰に憑いていて何をしたのかは盤面の読みに直に効くのに、CPUに落ちた
   * 災難は旅の記録を読まないと分からなかった(実プレイの記録)。
   * 本人以外の手番なので、短い自動送りのカードにする。
   */
  it("厄災も、CPUの手番では短い自動送りのカードで出す", () => {
    expect(autoCloseList(), "doom を外すと、CPUの災難が押すまで残る").toContain('"doom"');
  });

  it("盤面全体の見せ場(新目的地・独占・決算)も、押さなくても送られる", () => {
    const list = autoCloseList();
    for (const kind of ['"next-leg"', '"monopoly"', '"settlement"']) {
      expect(list, `${kind} が抜けると、CPUの手番で盤面が止まる`).toContain(kind);
    }
  });

  it("月替わりは、CPUの手番中は待って自動で進む", () => {
    expect(src, "CPUループが月替わりで止まると、毎月押させることになる").toContain(
      "await waitForSeason(generation)",
    );
  });

  it("人間の手番では自動で閉じない(自分に起きたことは読んでから進める)", () => {
    // `dismissMoneyEvent` は人間なら `finishHumanLandingAndAdvance` を呼ぶ。
    const fn = src.slice(src.indexOf("function dismissMoneyEvent"));
    expect(fn.slice(0, fn.indexOf("\n  }"))).toContain("finishHumanLandingAndAdvance()");
  });

  it("見せ場と流すカードで、置いておく時間を分けている", () => {
    // 止めて見せる場面が増えたぶん、流す場面は短くする。
    expect(src).toContain("auto: 2000");
    expect(src).toContain("headline: 5200");
  });
});
