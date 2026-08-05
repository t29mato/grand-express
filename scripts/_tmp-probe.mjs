import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://localhost:3100/");
await p.getByRole("button", { name: "Start the journey" }).click();
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Depart!" }).click();
await p.waitForTimeout(500);
console.log("die enabled:", await p.locator("#die").isEnabled());
await p.locator("#die").click();
await p.waitForTimeout(2600);
const n = await p.locator("svg.board-svg g[style*='cursor: pointer']").count();
console.log("choosable count:", n);
const first = p.locator("svg.board-svg g[style*='cursor: pointer']").first();
console.log("first visible:", await first.isVisible());
const bb = await first.boundingBox();
console.log("bbox:", JSON.stringify(bb));
try {
  await first.click({ timeout: 5000 });
  console.log("click OK");
} catch (e) {
  console.log("click FAILED:", String(e).split("\n").slice(0,6).join(" | "));
}
await p.waitForTimeout(600);
console.log("after: die enabled:", await p.locator("#die").isEnabled());
await b.close();
