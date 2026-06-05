import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** Tom do bloco - claro para faixas escuras. */
  tone?: "default" | "inverse";
  className?: string;
}

/**
 * Cabeçalho de secção consistente: eyebrow em small-caps + título serif (Fraunces)
 * + lead opcional. Usado por todas as secções para manter a mesma linguagem.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal
          as="span"
          className={cn(
            "eyebrow flex items-center gap-3",
            inverse ? "text-sage" : "text-accent",
          )}
        >
          <span className={cn("h-px w-8", inverse ? "bg-sage/50" : "bg-accent/50")} />
          {eyebrow}
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={cn(
            "font-heading text-3xl leading-[1.08] font-medium text-balance sm:text-4xl md:text-5xl",
            inverse ? "text-paper" : "text-foreground",
            align === "center" && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
              inverse ? "text-paper/70" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
