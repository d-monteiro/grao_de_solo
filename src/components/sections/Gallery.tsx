import { gallery } from "@/data/site";
import { images } from "@/data/assets";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Galeria de trabalhos — grid assimétrico (masonry-like) que respira.
 * Spans variados em lg dão ritmo wabi-sabi: 1º item alto, 4º largo.
 * Legenda (alt) revela-se em hover sobre gradiente subtil.
 */

// Spans por posição — vazios de tamanhos diferentes para um ritmo orgânico.
const spans = [
  "lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "lg:row-span-2",
] as const;

export function Gallery() {
  return (
    <section id={gallery.id} className="relative py-24 md:py-32">
      {/* Halo subtil — profundidade silenciosa, à imagem do Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 -z-10 size-[34rem] rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          lead={gallery.lead}
        />

        <div className="mt-14 grid auto-rows-[14rem] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-3 lg:auto-rows-[15rem]">
          {gallery.itemKeys.map((key, i) => (
            <Reveal
              key={key}
              delay={i * 70}
              className={spans[i] ?? ""}
            >
              <figure className="group relative h-full overflow-hidden rounded-2xl ring-1 ring-border">
                <img
                  src={images[key].src}
                  alt={images[key].alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                />
                {/* Gradiente — assenta a legenda e dá peso wabi-sabi */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 text-sm leading-snug text-pretty text-paper/85 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-paper group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:text-paper [@media(hover:none)]:opacity-100">
                  <span className="block h-px w-7 bg-sage/60" />
                  <span className="mt-3 block">{images[key].alt}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
