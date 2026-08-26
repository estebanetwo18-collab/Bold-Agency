import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "72px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "#F2E64D",
            }}
          />
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>
            BOLD Agency
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Dirección de crecimiento integrada.
          </span>
          <span style={{ fontSize: 28, color: "#D6D6D0", maxWidth: 780 }}>
            Estrategia, marca, contenido, medios y ventas como un solo sistema.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
