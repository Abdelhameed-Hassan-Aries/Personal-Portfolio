import DynamicBackgroundCanvas from "@/components/three/DynamicBackgroundCanvas";
import Navigation  from "@/components/layout/Navigation";
import Footer      from "@/components/layout/Footer";
import ClientOnly  from "@/components/ui/ClientOnly";
import Hero        from "@/components/sections/Hero";
import About       from "@/components/sections/About";
import Skills      from "@/components/sections/Skills";
import Highlights  from "@/components/sections/Highlights";
import Experience  from "@/components/sections/Experience";
import Contact     from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Cursor + progress — client-only to avoid SSR hydration mismatches */}
      <ClientOnly />

      {/* Full-page Three.js starfield — client-side only */}
      <DynamicBackgroundCanvas />

      {/* Site structure */}
      <div className="relative z-1">
        <Navigation />

        <main>
          <Hero />
          <About />
          <Skills />
          <Highlights />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
