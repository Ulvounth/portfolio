import { describe, expect, it } from "vitest";
import { generateSEO } from "@/lib/seo";

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
});
