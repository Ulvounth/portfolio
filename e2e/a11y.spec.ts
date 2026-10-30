import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { routes } from "./routes";

// WCAG 2.2 AA, with no rules disabled.
async function scan(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return violations.map((violation) => ({
    rule: violation.id,
    impact: violation.impact,
    targets: violation.nodes.map((node) => node.target.join(" ")),
  }));
}

for (const { path } of routes) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    expect(await scan(page)).toEqual([]);
  });
}

test("the 404 page has no axe violations", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.locator("main")).toBeVisible();
  expect(await scan(page)).toEqual([]);
});

test("the open chat window has no axe violations", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Open chat with AI assistant" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await scan(page)).toEqual([]);
});

test("the mobile menu has no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await scan(page)).toEqual([]);
});
