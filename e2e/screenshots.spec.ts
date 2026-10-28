import { test } from "@playwright/test";
import { routes, viewports } from "./routes";

// Run with `npm run screenshots`. Set SCREENSHOT_LABEL (for example "before")
// to keep several sets side by side in screenshots/<label>/.
const label = process.env.SCREENSHOT_LABEL || "current";

for (const viewport of viewports) {
  for (const { path } of routes) {
    test(`@screenshots ${viewport.name} ${path}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const slug = path === "/" ? "home" : path.slice(1).replace(/\//g, "-");
      await page.screenshot({
        path: `screenshots/${label}/${viewport.name}-${slug}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
