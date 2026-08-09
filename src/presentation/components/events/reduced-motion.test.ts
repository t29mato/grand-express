import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * **動きを止めたときに、出来事そのものが消えていないか**を見る。
 *
 * ## なぜ要るか
 *
 * 2026-08-09、`france-tire-laine`(スリの絵)にこう書いてあった。
 *
 * ```
 * .ftl-wallet { ...; opacity: 0; animation: ftl-lift 5s ...; }
 * @media (prefers-reduced-motion: reduce) { .ftl-wallet { animation: none; } }
 * ```
 *
 * 札入れは**規則そのものが `opacity: 0`** で、動きの途中で現れるようにしてあった。
 * 動きを止めると `animation: none` になるだけなので、**札入れは消えたままになる。**
 * つまり**動きを減らす設定にしている人にだけ、盗まれた物が見えない。**
 *
 * 同じものが7枚にあった。伝票に足された一行、押された印、差し出した硬貨、
 * 掻き出された貝——**どれもその絵の出来事そのもの**である。
 *
 * 気づきにくい。`prefers-reduced-motion` を入れて遊ぶ人でないと出ないし、
 * 絵を撮って目で見ても、**動く絵しか撮っていなければ出ない**
 * (`node scripts/contact-sheet.mjs --reduced ...` で止めた絵を撮れる)。
 *
 * ## 何を見ているか
 *
 * **規則そのものに `opacity: 0` か `scale(0)` を書いていて、
 * `prefers-reduced-motion` でそれを戻していない**もの。
 *
 * 機械では「湯気」と「札入れ」の区別が付かないので、**判定はしない。**
 * 挙がったものは人が見て、
 *
 * - 出来事そのもの → `@media` の中で `opacity: 1` に戻す
 * - 湯気・砂埃・こぼれた小銭 → 下の `HIDDEN_ON_PURPOSE` に**理由を書いて**足す
 *
 * のどちらかにする。**黙って消えている状態を残さない**のが目的である。
 */
const DIR = join(process.cwd(), "src/presentation/components/events");
const GROUPS = ["dooms", "animations"];

/**
 * 止めたときに消えたままでよいもの。**なぜよいのかを書くこと。**
 *
 * 目安: **その絵の出来事が、これ無しでも伝わるか。**
 * 湯気や砂埃は雰囲気なので消えてよい。盗まれた物や足された請求は消えてはいけない。
 */
const HIDDEN_ON_PURPOSE: Readonly<Record<string, string>> = {
  "france-tire-laine .ftl-coin": "こぼれた硬貨。抜かれた札入れのほうは戻してあるので、出来事は伝わる",
  "india-bandh .ibn-sigh-a": "ため息。雰囲気",
  "india-bandh .ibn-sigh-b": "ため息。雰囲気",
  "india-chori .ich-coin-b": "二枚目の硬貨。札入れと一枚目は止めても見えている",
  "india-drought .idr-dust-a": "井戸の底から立つ土埃。雰囲気",
  "india-drought .idr-dust-b": "井戸の底から立つ土埃。雰囲気",
  "india-drought .idr-dust-c": "井戸の底から立つ土埃。雰囲気",
  "india-wrongtrain .iwt-drop": "汗。雰囲気",
  "cidre-au-pressoir .cidre-drip-a": "搾り汁の滴。搾り機と樽は止めても見えている",
  "cidre-au-pressoir .cidre-drip-b": "搾り汁の滴。搾り機と樽は止めても見えている",
  "taxe-de-sejour .tds-coin-a": "支払いの硬貨。**足された一行**のほうを戻してあるので、出来事は伝わる",
  "taxe-de-sejour .tds-coin-b": "支払いの硬貨。**足された一行**のほうを戻してあるので、出来事は伝わる",
};

/** `@keyframes ...{...}` のように入れ子の波括弧を持つ塊を、数えながら取り除く。 */
function stripBlocks(css: string, head: RegExp): string {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const rest = css.slice(i);
    const m = rest.match(head);
    if (!m || m.index === undefined) {
      out += rest;
      break;
    }
    out += rest.slice(0, m.index);
    let j = i + m.index + m[0].length;
    let depth = 0;
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    i = j;
  }
  return out;
}

type Scene = { id: string; rules: Map<string, string>; reduce: string };

function scenes(): Scene[] {
  const out: Scene[] = [];
  for (const group of GROUPS) {
    for (const file of readdirSync(join(DIR, group)).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(join(DIR, group, file), "utf8");
      const css = source.match(/<style>\{`([\s\S]*?)`\}<\/style>/)?.[1] ?? "";
      // reduced-motion の塊だけ先に取り出し、残りから通常の規則を読む。
      const reduce =
        css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/)?.[1] ?? "";
      let body = css.replace(/@media\s*\(prefers-reduced-motion[\s\S]*$/, "");
      body = stripBlocks(body, /@keyframes[^{]*\{/);
      const rules = new Map<string, string>();
      for (const [, sel, decl] of body.matchAll(/([.\-a-z0-9,\s]+)\{([^{}]*)\}/g)) {
        for (const one of sel.split(",").map((s) => s.trim())) {
          if (one.startsWith(".")) rules.set(one, (rules.get(one) ?? "") + decl);
        }
      }
      out.push({ id: file.replace(".tsx", ""), rules, reduce });
    }
  }
  return out;
}

describe("動きを止めたときの絵", () => {
  const all = scenes();

  it("絵が1枚以上読めている", () => {
    // 取り出しに失敗して0件になったのを「問題なし」と誤認しないための番人。
    expect(all.length).toBeGreaterThan(100);
    expect(all.filter((s) => s.rules.size > 0).length).toBeGreaterThan(100);
  });

  it("止めると消える要素は、戻してあるか、理由が書いてある", () => {
    const unexplained: string[] = [];
    for (const scene of all) {
      for (const [sel, decl] of scene.rules) {
        if (!/animation:/.test(decl)) continue;
        // **`opacity: 0.4` は消えていない。**完全に0のものだけを見る。
        if (!/opacity:\s*0\s*;/.test(decl) && !/transform:\s*scale\(0\)/.test(decl)) continue;
        const restored = new RegExp(`\\${sel}[^{]*\\{[^}]*opacity`).test(scene.reduce);
        if (restored) continue;
        const key = `${scene.id} ${sel}`;
        if (HIDDEN_ON_PURPOSE[key]) continue;
        unexplained.push(key);
      }
    }
    expect(
      unexplained,
      "止めると消えたままになる。出来事そのものなら @media の中で opacity: 1 に戻す。" +
        "雰囲気なら HIDDEN_ON_PURPOSE に理由を書く",
    ).toEqual([]);
  });

  it("理由の表に、もう存在しない指定が残っていない", () => {
    // 絵を直したのに理由だけ残ると、次の人が「まだ消えている」と誤解する。
    const live = new Set<string>();
    for (const scene of all) {
      for (const [sel, decl] of scene.rules) {
        if (/opacity:\s*0\s*;/.test(decl) || /transform:\s*scale\(0\)/.test(decl)) {
          live.add(`${scene.id} ${sel}`);
        }
      }
    }
    const stale = Object.keys(HIDDEN_ON_PURPOSE).filter((k) => !live.has(k));
    expect(stale, "もう消えていないのに理由が残っている").toEqual([]);
  });
});
