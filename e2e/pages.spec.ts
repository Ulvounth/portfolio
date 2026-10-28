import { expect, test } from "@playwright/test";
import { navigation, site } from "../data/site";
import { routes } from "./routes";

for (const { path, heading } of routes) {
  test(`${path} renders with a main landmark and a heading`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: heading }).first(),
    ).toBeVisible();
    await expect(page).toHaveTitle(/\S/);
    expect(errors).toEqual([]);
  });
}

test("unknown routes return 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("unknown project ids return 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("main navigation reaches every page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const { href, label } of navigation.filter(({ href }) => href !== "/")) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(href);
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute(
      "aria-current",
      "page",
    );
  }
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile menu opens, lists every page and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open navigation menu" });
  await opener.click();
  const menu = page.getByRole("dialog", { name: "navigation menu" });
  await expect(menu).toBeVisible();
  for (const { label } of navigation) {
    await expect(menu.getByRole("link", { name: label })).toBeVisible();
  }
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(opener).toBeFocused();
});

test("project cards on the projects page link to project pages", async ({
  page,
}) => {
  await page.goto("/projects");
  const firstProject = page.locator('a[href^="/projects/"]').first();
  await firstProject.click();
  await expect(page).toHaveURL(/\/projects\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("footer links to the social profiles from site data", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  for (const url of Object.values(site.social)) {
    await expect(footer.locator(`a[href="${url}"]`)).toHaveCount(1);
  }
});

test.describe("metadata files", () => {
  test("sitemap.xml lists all routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    for (const { path } of routes) {
      expect(body).toContain(`<loc>${new URL(path, site.url).href}</loc>`);
    }
  });

  test("robots.txt points to the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(`${site.url}/sitemap.xml`);
  });

  test("the web manifest is served", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);
    expect(await response.json()).toHaveProperty("name");
  });

  test("the CV is served as a PDF", async ({ request }) => {
    const response = await request.get(site.cv);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });
});
