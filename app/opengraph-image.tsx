import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "MyVisual.Space - Luxury Interior Photography Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = join(process.cwd(), "public", "logo", "myvisualspace_logo.png");
  const logoData = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1c1917 0%, #292524 50%, #1c1917 100%)",
          position: "relative",
        }}
      >
        {/* Subtle grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 60%)",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          alt=""
          width={160}
          height={160}
          style={{
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            marginBottom: 32,
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 300,
              color: "#fafaf9",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              fontFamily: "serif",
            }}
          >
            MyVisual
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 200,
              color: "rgba(250,250,249,0.45)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              fontFamily: "serif",
            }}
          >
            .Space
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 20,
            fontWeight: 300,
            color: "rgba(214,211,209,0.7)",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            marginTop: 16,
          }}
        >
          Luxury Interior Photography
        </p>

        {/* Subtle divider */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "rgba(214,211,209,0.2)",
            marginTop: 24,
          }}
        />

        {/* Location */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(168,162,158,0.5)",
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            marginTop: 16,
          }}
        >
          Dubai, UAE
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
