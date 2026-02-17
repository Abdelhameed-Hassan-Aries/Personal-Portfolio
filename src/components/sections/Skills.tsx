"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Monitor, Server, Cloud, Wrench, ShoppingBag, type LucideProps } from "lucide-react";
import { skillsData } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

const TechGlobe = dynamic(() => import("@/components/three/TechGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/10 text-sm [font-family:var(--font-jetbrains)]">
      loading…
    </div>
  ),
});

type LucideIcon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  ShoppingBag,
  Cloud,
  Wrench,
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  }),
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 90% 50%, rgba(6,182,212,0.04) 0%, transparent 70%), #030310",
      }}
    >
      <div className="gradient-divider mb-20" />

      <div className="max-content">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-20">
          <p className="text-xs [font-family:var(--font-jetbrains)] tracking-[0.4em] text-cyan-400 uppercase mb-4">
            {"// 02. SKILLS"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-space-grotesk)] text-white">
            Tech Stack
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-xl mx-auto">
            Tools and technologies I reach for every day — and a few I&apos;m
            always exploring.
          </p>
        </AnimatedSection>

        {/* Globe + cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Globe — hidden on small mobile, shown from sm upward */}
          <AnimatedSection delay={0.1} direction="left" className="order-2 lg:order-1 hidden sm:block">
            <div className="relative h-[280px] sm:h-[340px] lg:h-[460px]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
                }}
              />
              <TechGlobe />
            </div>
          </AnimatedSection>

          {/* Skill categories */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4">
            {skillsData.categories.map((cat, i) => {
              const Icon: LucideIcon = iconMap[cat.icon] ?? Monitor;
              return (
                <motion.div
                  key={cat.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="glass-hover rounded-xl sm:rounded-2xl p-3.5 sm:p-5 cursor-default group"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
                    >
                      <Icon size={14} style={{ color: cat.color }} />
                    </div>
                    <h3
                      className="text-xs sm:text-sm font-semibold [font-family:var(--font-space-grotesk)] leading-tight"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/4 text-white/55 border border-white/6 [font-family:var(--font-jetbrains)] group-hover:border-white/10 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
