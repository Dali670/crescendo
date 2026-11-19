const { test, expect } = require("@playwright/test");

const PAGES = ["index", "blog", "admin", "mentions-legales", "politique-confidentialite"];

for (const name of PAGES) {
  test(`P1-C4 ${name} : « 1 nouveau projet par mois » s'écrit de la même façon`, async ({ page }) => {
    await page.goto(`/${name}.html`);
    const texte = await page.locator("body").innerText();
    expect(texte).toMatch(/1 nouveau projet par mois/);
    expect(texte).not.toMatch(/un seul nouveau projet|1 projet par mois|un projet par mois/i);
  });
}
