/**
 * Mapa de assets da marca Grão de Solo.
 * Os ficheiros vivem em /public e são servidos a partir da raiz.
 * Cada imagem traz um `alt` descritivo (acessibilidade + SEO).
 */

export const logo = "/logoctransparencia.png";

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  /** Jardim contemporâneo ao entardecer — deck de madeira, bambu, luz quente. */
  heroGarden: {
    src: "/FEATURED.jpg",
    alt: "Jardim contemporâneo ao entardecer com deck de madeira, bambu e iluminação ambiente",
  },
  /** Jardim seco zen de Kyoto (Daitokuji) — pedras, musgo, gravilha rastelada. */
  zenKyoto: {
    src: "/J10-Kyoto_0325-Daitokuji-Korin_1.webp",
    alt: "Jardim zen japonês com pedras, musgo e gravilha rastelada",
  },
  /** Planta de projeto de arquitetura paisagista em aguarela. */
  watercolorPlan: {
    src: "/0_traSjs5gkZh_WClL.webp",
    alt: "Planta de projeto de arquitetura paisagista desenhada em aguarela",
  },
  /** Espelho de água em aço corten com nenúfares e gramíneas. */
  cortenPond: {
    src: "/zqvt27TjxfjC36XR9Hr4pL.jpg.webp",
    alt: "Espelho de água em aço corten rodeado de nenúfares e gramíneas",
  },
  /** Muro de xisto com suculentas e hotel de insetos — materiais circulares. */
  stoneWall: {
    src: "/G2XrAyick4YgFfiPUFtXSR-768-80.jpg.webp",
    alt: "Muro de xisto com suculentas e hotel de insetos integrado",
  },
  /** Jardim seco mediterrânico — xeropaisagismo e espécies adaptadas. */
  dryGarden: {
    src: "/gY5aMVngDdCQ2AA5oYaYHf-768-80.jpg.webp",
    alt: "Jardim seco com espécies autóctones adaptadas à eficiência hídrica",
  },
  /** Caminho de lajes com lavanda num jardim residencial. */
  residentialPath: {
    src: "/7003223-13400-6_preview1-bf88f890d3914c2f8105abf1f0c3095d.webp",
    alt: "Caminho de lajes de pedra ladeado por lavanda num jardim residencial",
  },
} satisfies Record<string, SiteImage>;
