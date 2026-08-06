#!/usr/bin/env node
/**
 * 絵の登録簿(index.ts)を、置いてあるファイルから作り直す。
 *
 *   node scripts/generate-animation-registries.mjs
 *
 * 絵は複数人で同時に描くので、**登録簿だけは取りまとめ側が1人で書く**
 * ことにしている(同じファイルを同時に編集すると壊れるため)。
 * その1人が62本を手で書き写すと、いつか必ず1本落とす。
 * ここで機械的に作れば落ちない。
 *
 * 登録簿ごとの決まりは下の REGISTRIES にある。ファイル名がそのまま鍵になり、
 * 型と補助関数(`seasonAnimationFor` など)は雛形の側に書いてある。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** `france-vendange-ratee` → `FranceVendangeRatee` */
function toComponentName(fileId) {
  return fileId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const REGISTRIES = [
  {
    dir: "src/presentation/components/events/seasons",
    constName: "SEASON_ANIMATIONS",
    doc: `/**
 * 「国-月」→ 月替わりに出る絵。月は0始まり(0=4月)で2桁。
 *
 * **足し忘れを防ぐため機械的に整えている。** 登録が無い月は絵なしで
 * これまでどおり文章だけが出る。
 */`,
    helper: `/** その国のその月の絵。無ければ undefined。 */
export function seasonAnimationFor(countryId: string, monthIndex: number): ComponentType | undefined {
  return SEASON_ANIMATIONS[\`\${countryId}-\${String(monthIndex).padStart(2, "0")}\`];
}`,
  },
  {
    dir: "src/presentation/components/events/dooms",
    constName: "DOOM_ANIMATIONS",
    doc: `/**
 * 「国-厄災id」→ その災難の動く絵。
 *
 * 厄災の神に取り憑かれた人に降りかかる災難を見せる。子どもも遊ぶので、
 * 破壊や痛みそのものではなく「慌てている様子」で伝える方針
 * (docs/50-authoring/04-doom-animation-guide.md)。
 *
 * **足し忘れを防ぐため機械的に整えている。**
 */`,
    helper: `/** その国のその災難の絵。無ければ undefined。 */
export function doomAnimationFor(countryId: string, doomId: string): ComponentType | undefined {
  return DOOM_ANIMATIONS[\`\${countryId}-\${doomId}\`];
}`,
  },
  {
    dir: "src/presentation/components/city/scenes",
    constName: "CITY_SCENE_OVERLAYS",
    doc: `/**
 * 「国-背景キー」→ 都市イラストに重ねる動きのレイヤー。
 *
 * 背景そのもの(legacy由来の静止SVG)は書き換えず、その上に透明な層を
 * 1枚重ねて、波・湯気・雪・灯りの明滅だけを動かす。
 * 作り方は docs/50-authoring/05-city-scene-guide.md を参照。
 *
 * **足し忘れを防ぐため機械的に整えている。** 登録が無い背景は静止のまま。
 */`,
    helper: `/** その国のその背景に重ねる動き。無ければ undefined(静止のまま)。 */
export function citySceneOverlayFor(countryId: string, sceneKey: string): ComponentType | undefined {
  return CITY_SCENE_OVERLAYS[\`\${countryId}-\${sceneKey}\`];
}`,
  },
];

let changed = 0;
for (const { dir, constName, doc, helper } of REGISTRIES) {
  const ids = readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
    .map((f) => f.replace(".tsx", ""))
    .sort();

  const imports = ids.map((id) => `import { ${toComponentName(id)} } from "./${id}";`).join("\n");
  const entries = ids.map((id) => `  "${id}": ${toComponentName(id)},`).join("\n");

  const source = `import { ComponentType } from "react";
${imports}

${doc}
export const ${constName}: Readonly<Record<string, ComponentType>> = {
${entries}
};

${helper}
`;

  const path = join(dir, "index.ts");
  const before = readFileSync(path, "utf8");
  if (before !== source) {
    writeFileSync(path, source);
    changed++;
    console.log(`${path} (${ids.length}本)`);
  } else {
    console.log(`${path} (${ids.length}本・変更なし)`);
  }
}

console.log(changed === 0 ? "すべて最新でした。" : `${changed}件を書き直しました。`);
