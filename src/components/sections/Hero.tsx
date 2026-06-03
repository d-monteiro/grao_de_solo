import { ArrowDown, Sprout } from "lucide-react";

import { hero } from "@/data/site";
import { images } from "@/data/assets";
import { Reveal } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";

export function Hero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
      {/* Halos de cor muito subtis — profundidade sem ruído */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[42rem] rounded-full bg-secondary/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[34rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-32 pb-10 sm:px-8 lg:px-12 lg:pt-36">
        <div className="flex flex-1 flex-col justify-center gap-10">
          <Reveal as="span" className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {hero.eyebrow}
          </Reveal>

          <Reveal delay={60}>
            <h1 className="font-heading max-w-5xl text-[clamp(2.2rem,7vw,6rem)] leading-[1.02] font-medium text-balance text-foreground">
              {hero.titleTop}
              <br />
              <span className="text-primary italic">{hero.titleBottom}</span>
            </h1>
          </Reveal>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={140} className="max-w-xl">
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{hero.subtitle}</p>
            </Reveal>
            <Reveal delay={220} className="flex flex-wrap items-center gap-3">
              <Cta href={hero.ctaPrimary.href} variant="solid" withArrow>
                {hero.ctaPrimary.label}
              </Cta>
              <Cta href={hero.ctaSecondary.href} variant="outline">
                {hero.ctaSecondary.label}
              </Cta>
            </Reveal>
          </div>
        </div>

        {/* Imagem cinematográfica */}
        <Reveal delay={120} className="mt-12">
          <div className="group relative overflow-hidden rounded-2xl shadow-[0_24px_70px_-30px_rgba(40,55,30,0.5)] ring-1 ring-foreground/10 md:rounded-3xl">
            <img
              src={images.heroGarden.src}
              alt={images.heroGarden.alt}
              className="h-[44svh] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none md:h-[48svh]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/85 px-4 py-2 backdrop-blur-md md:bottom-6 md:left-6">
              <Sprout className="size-4 text-primary" />
              <span className="text-xs font-medium tracking-wide text-foreground">
                Ecossistemas vivos, desenhados para evoluir
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none flex justify-center pb-6">
        <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <ArrowDown className="size-3.5 animate-bounce" />
          Descer
        </span>
      </div>
    </section>
  );
}
