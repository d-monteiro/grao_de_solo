import { Compass, Droplets, Sprout, Leaf, CloudRain, Trees, ShieldCheck } from "lucide-react";

import type { Sector } from "@/data/site";
import { sectors } from "@/data/site";
import { images } from "@/data/assets";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const icons = { Compass, Droplets, Sprout, Leaf, CloudRain, Trees, ShieldCheck } as const;

function SectorBlock({ sector, flip }: { sector: Sector; flip: boolean }) {
  const image = images[sector.imageKey];

  return (
    <div
      className={
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16" +
        (flip ? " lg:[&>*:first-child]:order-2" : "")
      }
    >
      {/* Painel de imagem */}
      <div className="group relative overflow-hidden rounded-3xl ring-1 ring-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-12 -z-10 size-64 rounded-full bg-secondary/20 blur-3xl"
        />
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-5 top-5 rounded-full bg-background/85 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur-md">
          {sector.index} / 0{sectors.length}
        </span>
      </div>

      {/* Coluna de texto */}
      <div className="flex flex-col gap-6">
        <span className="font-heading text-6xl leading-none text-secondary">{sector.index}</span>
        <span className="eyebrow flex items-center gap-3 text-accent">
          <span className="h-px w-8 bg-accent/50" />
          {sector.kicker}
        </span>
        <h3 className="font-heading text-3xl font-medium text-balance text-foreground md:text-4xl">
          {sector.title}
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          {sector.lead}
        </p>

        <ul className="mt-2 flex flex-col gap-5 border-t border-border pt-7">
          {sector.features.map((f) => {
            const Icon = icons[f.icon as keyof typeof icons] ?? Leaf;
            return (
              <li key={f.title} className="group flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">{f.title}</span>
                  <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {f.desc}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Sectors() {
  return (
    <section id="setores" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Dois mundos, a mesma raiz."
          lead="Da casa privada à cidade resiliente — o mesmo rigor ecológico em cada escala."
        />

        <div className="mt-16 space-y-24 md:space-y-32">
          {sectors.map((sector, i) => (
            <Reveal key={sector.id}>
              <SectorBlock sector={sector} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
