import { test, expect, Page } from "@playwright/test";

/**
 * クイズが「学習装置」として機能していることの確認
 * (docs/40-learning-design/01-quiz-as-learning-device.md の検証方針2)。
 *
 * 回答したあとに結果モーダルが出て、**自分の選択・正解・解説**が読めることを見る。
 * 出題は乱数に依存するため、クイズマスに止まるまで実際にプレイして待つ。
 */
// クイズマスに止まるかどうかは乱数任せで、当たるまで何十ターンも回すことがある。
// サイコロ演出(1回2.3秒)を挟むと並列実行時に時間切れになりやすいので、
// 「視差効果を減らす」設定で動かして1ターンを短くする。
// この試験の関心はクイズの結果表示であって、サイコロの見た目ではない。
test.setTimeout(180_000);

async function openModalId(page: Page): Promise<string | null> {
  return page.evaluate(() => document.querySelector(".modal-box")?.getAttribute("data-testid") ?? null);
}

test("クイズに答えると結果モーダルで正解と解説が読める", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  // サイコロ演出を省略させて1ターンを短くする(上のコメント参照)。
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  // CPUの手番は演出のぶん時間がかかるので、全員を人間にして手番を速く回す
  // (この試験の関心はクイズの結果表示であってCPUの挙動ではない)。
  await page.getByRole("button", { name: "Human" }).nth(1).click();
  await page.getByRole("button", { name: "Human" }).nth(2).click();
  // 1人目の知識レベルを「はじめて」にする。誤答が1つ伏せられ2択になるはず
  // (docs/40-learning-design/02-player-knowledge-level.md 4-1)。
  await page.getByRole("button", { name: "New here" }).first().click();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();

  const deadline = Date.now() + 150_000;
  let answered = false;

  while (Date.now() < deadline && !answered) {
    const modal = await openModalId(page);

    if (modal === "quiz-modal") {
      // 1人目(初級)の手番なら2択、それ以外(中級)なら3択になる。
      const optionCount = await page.locator(".btn.opt").count();
      expect([2, 3]).toContain(optionCount);
      await page.locator(".btn.opt").first().click();
      const result = page.getByTestId("quiz-result-modal");
      await expect(result).toBeVisible();

      // 自分の回答・解説は正誤にかかわらず必ず出る。
      await expect(result).toContainText("You answered:");
      await expect(result).toContainText("Did you know?");

      // 不正解なら「正解は〜でした」も出る(何が正解か分からないままにしない)。
      const wrong = await result.locator(".quiz-verdict.wrong").count();
      if (wrong > 0) {
        await expect(result.locator(".quiz-answer")).toBeVisible();
      }

      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await expect(result).not.toBeVisible();
      answered = true;
      break;
    }

    if (modal) {
      // それ以外のモーダルは閉じて進む。
      for (const [name, exact] of [
        ["Back to the rails", false],
        ["Full steam ahead", false],
        ["Continue", true],
      ] as const) {
        const button = page.getByRole("button", { name, exact });
        if (await button.isVisible().catch(() => false)) {
          await button.click();
          break;
        }
      }
      await page.waitForTimeout(120);
      continue;
    }

    // 選べるマスが出ていれば選ぶ。ここを「振った直後だけ」にすると、
    // クリックが一度失敗したときに選択待ちのまま抜け出せなくなる。
    // **クイズマスが選べるならそれを選ぶ**。偶然止まるのを待つと、
    // 何十ターンも空振りして時間切れになることがある(この試験の関心は
    // 「クイズに答えたあと何が読めるか」であって、止まる確率ではない)。
    const choosable = page.locator("svg.board-svg g[data-choosable='true']");
    if ((await choosable.count()) > 0) {
      const quizSquare = page.locator("svg.board-svg g[data-choosable='true'][data-node-kind='quiz']");
      const target = (await quizSquare.count()) > 0 ? quizSquare.first() : choosable.first();
      await target.click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(120);
      continue;
    }

    const rolling = await page.locator(".dice-stage").count();
    const canRoll = await page
      .locator("#die")
      .isEnabled()
      .catch(() => false);
    if (canRoll && rolling === 0) {
      await page.locator("#die").click();
      await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
    }
    await page.waitForTimeout(120);
  }

  // 落ちたときに「なぜ進めなかったのか」が分かるよう、その瞬間の画面の状態を残す
  // (モーダルもマスの選択肢もサイコロも無い、という手詰まりを見分けるため)。
  const stateAtEnd = await page.evaluate(() => ({
    modal: document.querySelector(".modal-box")?.getAttribute("data-testid") ?? null,
    choosable: document.querySelectorAll("svg.board-svg g[data-choosable='true']").length,
    diceStage: document.querySelectorAll(".dice-stage").length,
    dieDisabled: (document.querySelector("#die") as HTMLButtonElement | null)?.disabled ?? null,
    turn: document.querySelector(".turn-name")?.textContent ?? null,
    hint: document.querySelector(".turn-hint")?.textContent ?? null,
  }));
  expect(answered, `クイズマスに止まらなかった: ${JSON.stringify(stateAtEnd)}`).toBe(true);
  expect(errors).toEqual([]);
});
