import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { themeColors } from "@/lib/theme";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf-8");

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6});`));
  if (!match) throw new Error(`Missing colour token --color-${name}`);
  return match[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG 2.x contrast ratio.
function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const surfaces = ["background", "surface", "surface-raised"];

// Text needs 4.5:1 (WCAG 1.4.3).
describe("text colours", () => {
  const textPairs: [string, string][] = [
    ...surfaces.flatMap((s): [string, string][] => [
      ["foreground", s],
      ["muted", s],
      ["accent", s],
      ["accent-strong", s],
      ["danger", s],
      ["success", s],
    ]),
    ["on-accent", "accent"],
    ["on-accent", "accent-strong"],
    // Dialog close button: background text on a foreground fill, hover on accent.
    ["background", "foreground"],
    ["background", "accent"],
  ];

  it.each(textPairs)("%s on %s is at least 4.5:1", (fg, bg) => {
    expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });
});

// Boundaries of controls and the focus ring need 3:1 (WCAG 1.4.11).
describe("non-text colours", () => {
  it.each(surfaces)("the control border is at least 3:1 on %s", (bg) => {
    expect(contrast(token("border-control"), token(bg))).toBeGreaterThanOrEqual(
      3,
    );
  });

  it.each(surfaces)("the focus ring is at least 3:1 on %s", (bg) => {
    expect(contrast(token("accent"), token(bg))).toBeGreaterThanOrEqual(3);
  });
});

describe("tokens", () => {
  it.each(Object.entries(themeColors))(
    "lib/theme.ts matches the %s token",
    (name, value) => {
      expect(token(name).toLowerCase()).toBe(value);
    },
  );

  it("keeps the decorative border visible against the background", () => {
    expect(
      contrast(token("border"), token("background")),
    ).toBeGreaterThanOrEqual(1.2);
  });
});
