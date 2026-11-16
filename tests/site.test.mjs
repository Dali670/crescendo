import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const read = (name) => readFileSync(join(root, name), "utf8");

const PAGES = ["index.html", "blog.html", "admin.html"];
const FORBIDDEN = ["[NEED", "2 semaines", "3 000", "3000", "1 nouveau projet", "Garantie par jalon"];

for (const page of PAGES) {
  test(`${page}: no placeholders and no obsolete claims`, () => {
    const html = read(page);
    for (const bad of FORBIDDEN) assert.ok(!html.includes(bad), `${page} contains "${bad}"`);
  });

  test(`${page}: links shared stylesheet`, () => {
    assert.ok(read(page).includes('href="site.css"'));
  });

  test(`${page}: declares language and viewport`, () => {
    const html = read(page);
    assert.ok(html.includes('<html lang="fr">'));
    assert.ok(html.includes('name="viewport"'));
  });

  test(`${page}: has the three nav links`, () => {
    const nav = read(page).match(/<nav[\s\S]*?<\/nav>/)?.[0] ?? "";
    for (const href of PAGES) assert.ok(nav.includes(`href="${href}"`), `${page} nav lacks ${href}`);
  });
}
