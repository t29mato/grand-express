import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://localhost:3100/");
await p.getByRole("button", { name: "Start the journey" }).click();
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Depart!" }).click();
await p.waitForTimeout(500);
await p.locator("#die").click();
await p.waitForTimeout(3000);
for (let i=0;i<6;i++) {
  const info = await p.evaluate(() => {
    const g = document.querySelector("svg.board-svg g[style*='cursor: pointer']");
    const r = g?.getBoundingClientRect();
    return { vb: document.querySelector("svg.board-svg")?.getAttribute("viewBox"), box: r ? [Math.round(r.x), Math.round(r.y), Math.round(r.width)] : null };
  });
  console.log(i, JSON.stringify(info));
  await p.waitForTimeout(350);
}
await b.close();
