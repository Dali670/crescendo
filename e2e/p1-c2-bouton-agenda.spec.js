const { test, expect } = require("@playwright/test");

const PAGES = ["index", "blog", "admin", "mentions-legales", "politique-confidentialite"];
const AGENDA = "https://cal.com/dali-ubpfej/cal-ia";

for (const page of PAGES) {
  test(`P1-C2 ${page} : « Réserver un appel découverte » ouvre l'agenda`, async ({ page: p }) => {
    await p.goto(`/${page}.html`);
    const boutons = p.getByRole("link", { name: "Réserver un appel découverte" });
    expect(await boutons.count()).toBeGreaterThan(0);
    for (const b of await boutons.all()) {
      await expect(b).toHaveAttribute("href", AGENDA);
    }
    const [popup] = await Promise.all([
      p.waitForEvent("popup"),
      boutons.first().click(),
    ]);
    expect(popup.url()).toContain("cal.com");
  });
}
