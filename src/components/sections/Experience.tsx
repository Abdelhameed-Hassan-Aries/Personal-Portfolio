"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { experienceData } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof experienceData)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-6 md:gap-10">
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          className="relative mt-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-space shrink-0 z-10"
        >
          <span className="absolute inset-[3px] rounded-full bg-indigo-500 animate-pulse" />
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            className="w-px flex-1 mt-2 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.1))",
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
        className={`glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/7 hover:border-indigo-500/20 transition-colors duration-300 ${
          isLast ? "mb-0" : "mb-5 sm:mb-8"
        } flex-1 min-w-0`}
      >
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-1 sm:gap-3 mb-3 sm:mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold [font-family:var(--font-space-grotesk)] text-white leading-snug">
              {item.role}
            </h3>
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              {item.company}
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="flex flex-row sm:flex-col sm:items-end gap-2 sm:gap-1 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/40 [font-family:var(--font-jetbrains)]">
              <Calendar size={10} />
              {item.period}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/30 [font-family:var(--font-jetbrains)]">
              <MapPin size={10} />
              {item.location}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/55 leading-relaxed mb-4 sm:mb-5">
          {item.description}
        </p>

        {/* Highlight badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold [font-family:var(--font-jetbrains)] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
            ★ {item.highlight}
          </span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded text-white/35 bg-white/4 border border-white/6 [font-family:var(--font-jetbrains)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 15% 60%, rgba(99,102,241,0.04) 0%, transparent 70%), #030310",
      }}
    >
      <div className="gradient-divider mb-20" />

      <div className="max-content">
        <AnimatedSection className="text-center mb-10 sm:mb-20">
          <p className="text-xs [font-family:var(--font-jetbrains)] tracking-[0.4em] text-indigo-400 uppercase mb-4">
            {"// 04. JOURNEY"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-space-grotesk)] text-white">
            Experience
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-xl mx-auto">
            Companies I&apos;ve had the privilege of building with.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {experienceData.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isLast={i === experienceData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
