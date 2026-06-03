import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Sectors } from "@/components/sections/Sectors";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

export function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Saltar para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Sectors />
        <Process />
        <Gallery />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
