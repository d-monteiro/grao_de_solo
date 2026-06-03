/**
 * Conteúdo do website Grão de Solo — atelier de arquitetura paisagista.
 * Fonte: public/Texto site.docx. Texto em PT-PT com acentuação correta.
 * Centralizado aqui para que todas as secções partilhem a mesma fonte de verdade.
 */

export const brand = {
  name: "Grão de Solo",
  discipline: "Arquitetura Paisagista",
  tagline: "Serviços e Soluções",
  closing: "Arquitetura que respira. Paisagens que curam.",
} as const;

export const nav = [
  { label: "Atelier", href: "#atelier" },
  { label: "Setores", href: "#setores" },
  { label: "Processo", href: "#processo" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const hero = {
  eyebrow: "Atelier de Arquitetura Paisagista",
  titleTop: "Design que Regenera.",
  titleBottom: "Paisagens para a Vida.",
  subtitle:
    "Unimos o rigor da arquitetura paisagista à urgência da responsabilidade ecológica — jardins sustentáveis que se vivem como uma extensão natural do ecossistema.",
  ctaPrimary: { label: "Cocriar o meu refúgio", href: "#contacto" },
  ctaSecondary: { label: "O nosso processo", href: "#processo" },
} as const;

export const manifesto = {
  id: "atelier",
  eyebrow: "O Atelier",
  title: "Desenhamos para as pessoas, sempre em parceria com a natureza.",
  paragraphs: [
    "Na Grão de Solo unimos o rigor da arquitetura paisagista à urgência da responsabilidade ecológica. Especializamo-nos no desenvolvimento de projetos de jardins sustentáveis, transformando áreas exteriores em ecossistemas vivos, eficientes e de alta qualidade estética.",
    "Acreditamos que a paisagem deve ser desenhada para as pessoas, mas sempre em parceria com a natureza. Por isso, as nossas soluções focam-se na conservação da água, no restauro da biodiversidade local e na criação de espaços que resistem ao teste do tempo.",
  ],
  stats: [
    { value: "100%", label: "Espécies autóctones e adaptadas" },
    { value: "5 fases", label: "Do diagnóstico à gestão" },
    { value: "Zero", label: "Desperdício — materiais circulares" },
  ],
} as const;

export interface SectorFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface Sector {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lead: string;
  imageKey: "residentialPath" | "dryGarden" | "stoneWall" | "cortenPond";
  features: SectorFeature[];
}

export const sectors: Sector[] = [
  {
    id: "residencial",
    index: "01",
    kicker: "Setor Residencial Privado",
    title: "O Seu Refúgio Consciente",
    lead: "Para habitações particulares, projetamos jardins que funcionam como uma extensão natural da casa. Criamos refúgios de bem-estar que evoluem com o tempo, garantindo beleza estética com uma pegada ecológica mínima.",
    imageKey: "residentialPath",
    features: [
      {
        icon: "Compass",
        title: "Projetos conectados",
        desc: "Desenhos personalizados que respeitam a arquitetura da casa e o estilo de vida da família.",
      },
      {
        icon: "Droplets",
        title: "Eficiência hídrica",
        desc: "Substituição de relvados de alto consumo por soluções de xeropaisagismo e espécies autóctones exuberantes.",
      },
      {
        icon: "Sprout",
        title: "Baixa manutenção",
        desc: "Sistemas inteligentes que reduzem o esforço e o custo de conservação a longo prazo.",
      },
    ],
  },
  {
    id: "urbano",
    index: "02",
    kicker: "Espaço Público e Urbano",
    title: "Cidades Mais Verdes e Resilientes",
    lead: "Para municípios, promotores e comunidades, projetamos infraestruturas verdes urbanas preparadas para os desafios climáticos. Focamo-nos na regeneração ambiental e na criação de locais de convívio inclusivos.",
    imageKey: "stoneWall",
    features: [
      {
        icon: "Leaf",
        title: "Design biofílico",
        desc: "Abordagem arquitetónica que integra elementos naturais nos espaços construídos para reconectar os seres humanos com a natureza.",
      },
      {
        icon: "CloudRain",
        title: "Adaptação climática",
        desc: "Jardins de chuva, bacias de retenção integradas e sistemas de drenagem sustentável.",
      },
      {
        icon: "Trees",
        title: "Restauro ecológico",
        desc: "Reintrodução de flora nativa para promover corredores ecológicos e biodiversidade urbana.",
      },
      {
        icon: "ShieldCheck",
        title: "Durabilidade e segurança",
        desc: "Materiais circulares e espécies arbóreas resilientes ao vandalismo e ao tráfego urbano.",
      },
    ],
  },
];

export const process = {
  id: "processo",
  eyebrow: "O Nosso Processo",
  title: "Do Conceito à Execução",
  lead: "Seja para uma habitação privada, um espaço corporativo ou uma intervenção urbana, o nosso objetivo é entregar um refúgio verde dinâmico, que valoriza o património imobiliário e melhora o bem-estar de quem o habita, evoluindo em perfeita harmonia com a passagem do tempo. Garantimos um acompanhamento rigoroso em todas as fases do projeto através de uma metodologia clara e colaborativa.",
  steps: [
    {
      n: "01",
      title: "Diagnóstico e Análise do Local",
      tag: "Briefing",
      desc: "Visitamos o terreno para analisar o tipo de solo, a exposição solar, a topografia e a água disponível. Alinhamos as suas expectativas, orçamento e necessidades com o potencial ecológico do espaço.",
    },
    {
      n: "02",
      title: "Anteprojeto e Conceito",
      tag: "Visão",
      desc: "Desenvolvemos os primeiros esboços da proposta. Aqui define-se a linguagem estética do jardim, a circulação dos caminhos e a distribuição das zonas funcionais (lazer, sombra, água).",
    },
    {
      n: "03",
      title: "Projeto de Execução e Plano de Plantação",
      tag: "Técnico",
      desc: "A fase técnica detalhada. Criamos as plantas de modelação do terreno, pormenores construtivos, o plano técnico de rega eficiente e a paleta botânica definitiva, especificando as espécies nativas e adaptadas mais adequadas.",
    },
    {
      n: "04",
      title: "Coordenação e Escolha de Materiais",
      tag: "Curadoria",
      desc: "Apoiamos na seleção de materiais circulares (madeiras locais, pedra natural, pavimentos drenantes) e na escolha dos exemplares vegetais nos viveiros parceiros, garantindo a máxima qualidade.",
    },
    {
      n: "05",
      title: "Acompanhamento de Obra e Plano de Gestão",
      tag: "Execução",
      desc: "Supervisionamos a execução do projeto para assegurar que a visão do papel se materializa na perfeição. No final, entregamos um manual prático de orientação para a gestão e evolução saudável do seu novo jardim.",
    },
  ],
} as const;

export const gallery = {
  id: "trabalhos",
  eyebrow: "Trabalhos & Inspiração",
  title: "Paisagens que resistem ao teste do tempo",
  lead: "Do jardim seco de inspiração zen ao espelho de água em aço corten — cada projeto é um ecossistema desenhado para evoluir.",
  itemKeys: [
    "zenKyoto",
    "cortenPond",
    "watercolorPlan",
    "dryGarden",
    "stoneWall",
    "residentialPath",
  ] as const,
} as const;

export const philosophy = {
  id: "visao",
  eyebrow: "O Futuro é Verde e Resiliente",
  body: "Na Grão de Solo transformamos a relação entre a arquitetura humana e o ecossistema vivo. Somos um atelier especializado em arquitetura paisagista, focado em projetos de exteriores que unem estética intemporal, funcionalidade e o respeito absoluto pela biodiversidade local.",
  quote: "Um jardim não deve apenas ser contemplado, mas sim vivido como uma extensão natural e equilibrada do ecossistema.",
} as const;

export const contact = {
  id: "contacto",
  eyebrow: "Vamos Cocriar",
  title: "Cocriar o seu refúgio connosco",
  lead: "Conte-nos sobre o seu espaço e a sua visão. Respondemos a cada mensagem com um primeiro olhar sobre o potencial ecológico do lugar.",
  email: "graodesolo@gmail.com",
  phone: "915 771 010",
  phoneHref: "+351915771010",
  address: { line1: "Rua da Estação, 261", line2: "44370-178 Maia" },
  mapsQuery: "Rua da Estação 261, Maia, Portugal",
} as const;
