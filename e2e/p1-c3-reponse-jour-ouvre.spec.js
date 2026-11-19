const { test, expect } = require("@playwright/test");

test("P1-C3 « Réponse sous un jour ouvré » est affiché près de la réservation", async ({ page }) => {
  await page.goto("/index.html");
  const section = page.locator("section", { hasText: "Réserver un appel" }).filter({ hasText: "Réponse sous un jour ouvré" });
  await expect(section.first()).toBeVisible();
  await expect(page.getByText("Réponse sous un jour ouvré").first()).toBeVisible();
});
