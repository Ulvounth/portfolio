import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { shareImage } from "@/lib/seo";

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
        color: "#FFFFFF",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.1 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 56, marginTop: 24, color: "#D1D5DB" }}>
        {site.title}
      </div>
      <div style={{ fontSize: 36, marginTop: 64, color: "#9CA3AF" }}>
        {new URL(site.url).host}
      </div>
    </div>,
    size,
  );
}
