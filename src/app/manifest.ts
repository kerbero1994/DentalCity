import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SITIMM - Sindicato de Trabajadores de la Industria Metálica y Metalúrgica",
    short_name: "SITIMM",
    description:
      "Sindicato de Trabajadores de la Industria Metálica y Metalúrgica - Protección, representación y beneficios para los trabajadores",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c11820",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-192x192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Eventos",
        short_name: "Eventos",
        description: "Ver próximos eventos y actividades",
        url: "/es/eventos",
        icons: [{ src: "/images/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Programas",
        short_name: "Programas",
        description: "Explorar programas y beneficios",
        url: "/es/programas",
        icons: [{ src: "/images/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Blog",
        short_name: "Blog",
        description: "Leer últimas noticias",
        url: "/es/blog",
        icons: [{ src: "/images/icon-192x192.png", sizes: "192x192" }],
      },
    ],
    categories: ["labor", "union", "workers", "lifestyle", "productivity"],
    lang: "es",
    dir: "ltr",
    prefer_related_applications: false,
  };
}
