import { expect, test, type Page } from "@playwright/test";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { routes } from "./routes";

const absolute = (path: string) => new URL(path, site.url).href;
const metaSelector = (name: string) =>
  name.startsWith("og:") ? `meta[property="${name}"]` : `meta[name="${name}"]`;

async function jsonLdBlocks(page: Page) {
  const texts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  return texts.map((text) => JSON.parse(text) as Record<string, unknown>);
}

test.describe("project slugs", () => {
  for (const project of projects.filter(({ legacyId }) => legacyId)) {
    test(`/projects/${project.legacyId} permanently redirects to /projects/${project.id}`, async ({
      request,
    }) => {
      const response = await request.get(`/projects/${project.legacyId}`, {
        maxRedirects: 0,
      });
      expect(response.status()).toBe(308);
      expect(response.headers()["location"]).toBe(`/projects/${project.id}`);
    });
  }

  test("the sitemap lists the slugs and none of the old URLs", async ({
    request,
  }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const project of projects) {
      expect(body).toContain(
        `<loc>${absolute(`/projects/${project.id}`)}</loc>`,
      );
      if (project.legacyId) {
        expect(body).not.toContain(`/projects/${project.legacyId}<`);
      }
    }
  });
});

test.describe("head metadata", () => {
  for (const { path } of routes) {
    test(`${path} has its own canonical URL and a share image`, async ({
      page,
      request,
    }) => {
      await page.goto(path);
      // Ignore a trailing slash: Next may or may not keep it on the root URL.
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical?.replace(/\/$/, "")).toBe(
        absolute(path).replace(/\/$/, ""),
      );
      for (const property of ["og:image", "twitter:image"]) {
        // Optional tags (the size) must not make the test wait for a timeout.
        const content = async (name: string) => {
          const tag = page.locator(metaSelector(name));
          return (await tag.count()) ? tag.getAttribute("content") : null;
        };
        const image = await content(property);
        expect(image, property).toBeTruthy();
        const response = await request.get(new URL(image!).pathname);
        expect(response.status(), image!).toBe(200);
        expect(response.headers()["content-type"]).toContain("image/");

        // When the page states the image size, the PNG must really have it.
        const width = await content(`${property}:width`);
        const height = await content(`${property}:height`);
        if (width && height) {
          const png = await response.body();
          expect(String(png.readUInt32BE(16)), image!).toBe(width);
          expect(String(png.readUInt32BE(20)), image!).toBe(height);
        }
      }
    });
  }

  test("the 404 page does not claim a canonical URL", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("the theme colour is set", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      site.themeColor,
    );
  });
});

test.describe("icons", () => {
  test("the page links the PNG icon and the Apple touch icon", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    for (const selector of [
      'link[rel="icon"][type="image/png"]',
      'link[rel="apple-touch-icon"]',
    ]) {
      const href = await page.locator(selector).getAttribute("href");
      expect(href, selector).toBeTruthy();
      const response = await request.get(href!);
      expect(response.status(), href!).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });

  test("every icon in the web manifest is served", async ({ request }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.theme_color).toBe(site.themeColor);
    for (const icon of manifest.icons as { src: string; type: string }[]) {
      const response = await request.get(icon.src);
      expect(response.status(), icon.src).toBe(200);
      expect(response.headers()["content-type"]).toContain(icon.type);
    }
  });
});

test.describe("structured data", () => {
  for (const { path } of routes) {
    test(`${path} has valid JSON-LD`, async ({ page }) => {
      await page.goto(path);
      const blocks = await jsonLdBlocks(page);
      const types = blocks.map((block) => block["@type"]);
      expect(types).toContain("Person");
      expect(
        blocks.every((block) => block["@context"] === "https://schema.org"),
      ).toBe(true);

      if (path === "/") {
        expect(types).toContain("WebSite");
        expect(types).not.toContain("BreadcrumbList");
        return;
      }

      // The list comes from the same items as the visible trail.
      const list = blocks.find((block) => block["@type"] === "BreadcrumbList");
      const elements = list?.itemListElement as { name: string }[];
      const visible = await page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByRole("listitem")
        .allInnerTexts();
      expect(elements.map((element) => element.name)).toEqual(
        visible.map((text) => text.replace(/^\/\s*/, "").trim()),
      );

      if (path.startsWith("/projects/")) {
        expect(types).toContain("SoftwareSourceCode");
      }
    });
  }
});
