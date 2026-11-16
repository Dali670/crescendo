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

// ---- Task 2: design system -------------------------------------------------
const css = () => read("site.css");

test("site.css: design tokens exist", () => {
  const c = css();
  for (const t of ["--paper", "--paper-2", "--ink", "--ink-soft", "--signal", "--signal-ink", "--rule", "--display", "--text"])
    assert.ok(new RegExp(String.raw`${t}\s*:`).test(c), `missing token ${t}`);
});

test("site.css: dark theme defined", () => {
  const c = css();
  assert.ok(c.includes("prefers-color-scheme: dark"));
  assert.ok(c.includes(':root[data-theme="dark"]'));
});

test("site.css: reduced motion respected", () => {
  assert.ok(css().includes("prefers-reduced-motion"));
});

test("site.css: focus visible", () => {
  assert.ok(css().includes(":focus-visible"));
});

test("site.css: components exist", () => {
  const c = css();
  const classes = ["wrap", "btn", "btn-ghost", "card", "cards", "tag", "prose", "lead", "note",
    "hero", "block", "steps", "included", "proof", "faq", "final",
    "admin", "toolbar", "editor", "posts-table", "status"];
  for (const k of classes) assert.ok(new RegExp(String.raw`\.${k}\b`).test(c), `missing .${k}`);
});

const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const tokens = (block) => Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));

test("site.css: contrast AA in light and dark themes", () => {
  const c = css();
  const light = tokens(c.match(/:root\s*\{[^}]*\}/)?.[0] ?? "");
  const dark = tokens(c.match(/:root\[data-theme="dark"\]\s*\{[^}]*\}/)?.[0] ?? "");
  for (const [name, t] of [["light", light], ["dark", dark]]) {
    for (const [fg, bg] of [["--ink", "--paper"], ["--ink-soft", "--paper"], ["--signal-ink", "--signal"]]) {
      assert.ok(t[fg] && t[bg], `${name}: missing ${fg} or ${bg}`);
      assert.ok(ratio(t[fg], t[bg]) >= 4.5, `${name}: ${fg} on ${bg} = ${ratio(t[fg], t[bg]).toFixed(2)}`);
    }
  }
});

// ---- Task 3: landing ------------------------------------------------------
const CTA = "Réserver un appel découverte gratuit";
const index = () => read("index.html");

test("index.html: single call-to-action label, used at least twice", () => {
  const html = index();
  const labels = [...html.matchAll(/<a[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1].trim());
  assert.ok(labels.length >= 2, "expected at least 2 buttons");
  for (const l of labels) assert.equal(l, CTA);
});

test("index.html: all buttons target the Cal.com booking page and the #reserver anchor exists", () => {
  const html = index();
  for (const m of html.matchAll(/<a[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>/g)) assert.ok(m[0].includes('href="https://cal.com/dali-ubpfej/cal-ia"'), m[0]);
  assert.ok(html.includes('id="reserver"'));
});

test("index.html: no inline style block", () => {
  assert.ok(!/<style[\s>]/.test(index()));
});

test("index.html: no price on the landing", () => {
  assert.ok(!/\d[\d\s  ]*€/.test(index()));
});

test("index.html: proof is scoped to one client", () => {
  const html = index();
  assert.ok(html.includes("15 h par semaine"));
  assert.ok(html.includes("chez un client"));
  assert.ok(!html.includes("en moyenne"));
});

test("index.html: sections appear in the specified order", () => {
  const found = [...index().matchAll(/<section[^>]*data-section="([a-z]+)"/g)].map((m) => m[1]);
  assert.deepEqual(found, ["hero", "pain", "solution", "steps", "included", "proof", "faq", "final"]);
});

test("index.html: faq has at least 3 details", () => {
  assert.ok((index().match(/<details/g) ?? []).length >= 3);
});

test("index.html: meta description present", () => {
  assert.match(index(), /<meta name="description" content="[^"]{40,}"/);
});

// ---- Task 4: blog ---------------------------------------------------------
const blog = () => read("blog.html");

test("blog.html: uses prose column", () => assert.ok(blog().includes('class="prose"')));
test("blog.html: renders article data as text only", () => {
  assert.ok(!/innerHTML\s*=\s*(?!"<p>Aucun)/.test(blog()), "innerHTML assignment found");
});
test("blog.html: handles unknown slug", () => assert.ok(blog().includes("Article introuvable")));
test("blog.html: handles load failure", () => assert.ok(blog().includes("Impossible de charger les articles.")));
test("blog.html: sets per-article title and meta description", () => {
  const b = blog();
  assert.ok(b.includes("document.title"));
  assert.match(b, /meta\[name=["']?description/);
});
test("blog.html: imports readingTime", () => assert.ok(blog().includes('from "./blog-utils.mjs"')));

// ---- Task 5: admin --------------------------------------------------------
const admin = () => read("admin.html");

test("admin.html: uses admin layout", () => {
  const a = admin();
  for (const k of ["admin", "editor", "posts-table"]) assert.ok(new RegExp(String.raw`class="[^"]*\b${k}\b`).test(a), `missing .${k}`);
});
test("admin.html: status messages are announced", () => {
  const a = admin();
  assert.ok(a.includes('role="alert"'));
  assert.ok(a.includes('role="status"'));
});
test("admin.html: non-admin message kept", () => assert.ok(admin().includes("Ce compte n'a pas les droits admin.")));
test("admin.html: uses is_admin rpc and posts table", () => {
  const a = admin();
  assert.ok(a.includes('rpc("is_admin")'));
  assert.ok(a.includes('from("posts")'));
});
test("admin.html: every field is labelled", () => {
  const a = admin();
  const fields = [...a.matchAll(/<(input|textarea)\b[^>]*>/g)].map((m) => m[0]);
  assert.ok(fields.length >= 6);
  for (const f of fields) {
    const id = f.match(/\bid="([^"]+)"/)?.[1];
    assert.ok(f.includes("aria-label=") || (id && a.includes(`for="${id}"`)), `unlabelled field: ${f}`);
  }
});
test("admin.html: hidden from search engines", () => assert.ok(admin().includes('<meta name="robots" content="noindex">')));
test("admin.html: keeps the delete confirmation", () => assert.ok(admin().includes("confirm(")));
