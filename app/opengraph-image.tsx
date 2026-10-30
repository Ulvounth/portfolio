import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { shareImage } from "@/lib/seo";
import { themeColors } from "@/lib/theme";

export const alt = `${site.name} – ${site.title}`;
export const size = { width: shareImage.width, height: shareImage.height };
export const contentType = "image/png";

// Default share image for every page that does not set its own.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: site.themeColor,
        color: themeColors.foreground,
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.1 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 56, marginTop: 24, color: themeColors.muted }}>
        {site.title}
      </div>
      <div style={{ fontSize: 36, marginTop: 64, color: themeColors.accent }}>
        {new URL(site.url).host}
      </div>
    </div>,
    size,
  );
}
