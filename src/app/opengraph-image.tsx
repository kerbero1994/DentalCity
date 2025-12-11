import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";
export const alt = "SITIMM - Sindicato de Trabajadores";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const t = await getTranslations({ locale: "es", namespace: "home.opengraph" });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(135deg, #c11820 0%, #8b1016 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            {t("brandName")}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              opacity: 0.95,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {t("subtitle")}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              opacity: 0.85,
              marginTop: 32,
            }}
          >
            {t("tagline")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
