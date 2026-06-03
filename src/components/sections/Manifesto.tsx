import { manifesto } from "@/data/site";
import { images } from "@/data/assets";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * Secção Manifesto ("O Atelier") — apresenta a filosofia do estúdio em duas
 * colunas: texto institucional + indicadores à esquerda, planta em aguarela à
 * direita. Vibe wabi-sabi: muito ar, hairlines, halo subtil e hover lento.
 */
export function Manifesto() {
  return (
    <section id={manifesto.id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna texto */}
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={manifesto.eyebrow} title={manifesto.title} />

            {manifesto.paragraphs.map((p, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={120 + manifesto.paragraphs.length * 80}>
              <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {manifesto.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-2">
                    <dt className="text-sm leading-snug text-pretty text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="font-heading text-3xl font-medium text-primary md:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Coluna imagem — planta em aguarela */}
          <Reveal delay={160} className="relative">
            {/* Halo decorativo para profundidade */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -bottom-10 -z-10 size-64 rounded-3xl bg-secondary/20 blur-2xl"
            />
            <div className="group overflow-hidden rounded-3xl shadow-[0_24px_70px_-30px_rgba(40,55,30,0.45)] ring-1 ring-border">
              <img
                src={images.watercolorPlan.src}
                alt={images.watercolorPlan.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
