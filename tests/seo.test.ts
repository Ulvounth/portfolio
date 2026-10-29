import { describe, expect, it } from "vitest";
import { generateSEO, openGraphDefaults, shareImage } from "@/lib/seo";

describe("generateSEO", () => {
  it("lets the layout template wrap page titles by default", () => {
    expect(generateSEO({ title: "Projects", description: "d" }).title).toBe(
      "Projects",
    );
  });
  it("bypasses the template for titles that already include the site name", () => {
    expect(
      generateSEO({
        title: "Andreas – Dev",
        description: "d",
        absoluteTitle: true,
      }).title,
    ).toEqual({ absolute: "Andreas – Dev" });
  });
  it("does not claim dimensions for images of unknown size", () => {
    const metadata = generateSEO({
      title: "Holidaze",
      description: "d",
      image: "/images/holidaze.png",
    });
    const [image] = metadata.openGraph?.images as { url: string }[];
    expect(image.url).toBe("https://andreasulvund.no/images/holidaze.png");
    expect(image).not.toHaveProperty("width");
    expect(image).not.toHaveProperty("height");
  });
  it("falls back to the generated opengraph-image with its dimensions", () => {
    const metadata = generateSEO({ title: "About", description: "d" });
    const [image] = metadata.openGraph?.images as object[];
    expect(image).toEqual({
      url: `https://andreasulvund.no${shareImage.path}`,
      width: shareImage.width,
      height: shareImage.height,
      alt: "About",
    });
    expect(metadata.twitter?.images).toEqual([image]);
  });
  it("repeats the site-wide Open Graph defaults, which a page replaces", () => {
    const { openGraph } = generateSEO({ title: "About", description: "d" });
    expect(openGraph).toMatchObject(openGraphDefaults);
  });
  it("sets the canonical URL from the page path", () => {
    expect(
      generateSEO({ title: "About", description: "d", path: "/about" })
        .alternates?.canonical,
    ).toBe("https://andreasulvund.no/about");
  });
});
