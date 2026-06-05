import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "inverse" | "ghost";

interface CtaProps extends ComponentProps<"a"> {
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
}

const base =
  "group/cta inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 active:translate-y-px motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  // Verde-floresta cheio - ação principal
  solid:
    "bg-primary text-primary-foreground shadow-sm hover:bg-moss hover:shadow-md hover:-translate-y-0.5",
  // Contorno hairline sobre papel
  outline:
    "border border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]",
  // Claro - para faixas escuras
  inverse:
    "bg-paper text-foreground shadow-sm hover:bg-paper/90 hover:-translate-y-0.5",
  // Só texto + seta
  ghost: "px-0 py-1 text-foreground hover:text-accent",
};

/**
 * Botão/link de chamada à ação, partilhado por todo o site para garantir
 * consistência visual. Renderiza um `<a>` (âncoras internas usam smooth-scroll).
 */
export function Cta({ children, variant = "solid", withArrow = false, className, ...props }: CtaProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
      )}
    </a>
  );
}
