import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const err=[]; p.on("pageerror", e=>err.push(String(e)));
await p.goto("http://localhost:3100/");
await p.getByRole("button", { name: "Start the journey" }).click();
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Depart!" }).click();
const states = [];
const deadline = Date.now() + 45000;
while (Date.now() < deadline) {
  const st = await p.evaluate(() => ({
    eyebrow: document.querySelector(".modal-box .eyebrow")?.textContent ?? null,
    h3: document.querySelector(".modal-box h3")?.textContent ?? null,
    dieEnabled: !(document.querySelector("#die")?.hasAttribute("disabled")),
    hint: document.querySelector(".turn-hint")?.textContent ?? null,
    year: document.querySelector(".date-chip")?.textContent ?? null,
  }));
  states.push(JSON.stringify(st));
  if (st.eyebrow?.includes("Seasonal")) { console.log("SEASON FOUND"); break; }
  // 人間の手番なら進める
  if (st.dieEnabled && !st.eyebrow) {
    await p.locator("#die").click();
    await p.waitForTimeout(2600);
    const sq = p.locator("svg.board-svg g[style*='cursor: pointer']").first();
    if (await sq.isVisible().catch(()=>false)) await sq.click({timeout:4000}).catch(()=>{});
    await p.waitForTimeout(400);
    continue;
  }
  const opt = p.locator(".btn.opt").first();
  if (await opt.isVisible().catch(()=>false)) { await opt.click(); await p.waitForTimeout(300); continue; }
  for (const [n,e] of [["Back to the rails",false],["Full steam ahead",false],["Continue",true]]) {
    const btn = p.getByRole("button",{name:n,exact:e});
    if (await btn.isVisible().catch(()=>false)) { await btn.click(); break; }
  }
  await p.waitForTimeout(300);
}
console.log("distinct states:");
[...new Set(states)].slice(0,20).forEach(s=>console.log("  "+s));
console.log("errors:", err.length?err:"none");
await b.close();
