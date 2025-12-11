import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SITIMM - Sindicato de Trabajadores";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const title =
    locale === "es"
      ? "Sindicato de Trabajadores de la Industria Metálica, Acero, Hierro, Conexos y Similares"
      : "Metal and Steel Workers Union of Mexico";
  const subtitle =
    locale === "es"
      ? "Más de 70 años defendiendo los derechos de los trabajadores"
      : "Over 70 years defending workers' rights";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #d32027 0%, #8b1419 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            marginBottom: 30,
            letterSpacing: "-0.02em",
          }}
        >
          SITIMM
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: "600",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
            maxWidth: "90%",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.95)",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
