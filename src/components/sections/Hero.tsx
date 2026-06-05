import { hero } from "@/data/site";
import { images } from "@/data/assets";
import { Reveal } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";

/**
 * Hero - imagem de fundo full-bleed que cobre exatamente a viewport (object-cover,
 * sem corte). Texto claro sobre overlay escuro para contraste. Sem badges nem
 * elementos decorativos: só a paisagem e a mensagem da marca.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      {/* Imagem de fundo - preenche a viewport */}
      <img
        src={images.heroGarden.src}
        alt={images.heroGarden.alt}
        className="absolute inset-0 -z-20 size-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      {/* Overlay - escurece da esquerda para legibilidade do texto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/85 via-foreground/55 to-foreground/25"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8 lg:px-12">
        <div className="flex max-w-3xl flex-col gap-8">
          <Reveal>
            <h1 className="font-heading text-[clamp(2.4rem,7vw,6rem)] leading-[1.02] font-medium text-balance text-paper">
              {hero.titleTop}
              <br />
              <span className="text-sage italic">{hero.titleBottom}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-paper/85">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={200} className="flex flex-wrap items-center gap-3">
            <Cta href={hero.ctaPrimary.href} variant="solid" withArrow>
              {hero.ctaPrimary.label}
            </Cta>
            <Cta
              href={hero.ctaSecondary.href}
              variant="outline"
              className="border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
            >
              {hero.ctaSecondary.label}
            </Cta>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
