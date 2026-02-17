"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { highlightsData } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

type Domain = (typeof highlightsData.domains)[0];

function DomainTab({
  domain,
  isActive,
  onClick,
  index,
}: {
  domain: Domain;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      onClick={onClick}
      className={[
        "w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group",
        "flex items-center gap-3 relative overflow-hidden",
        isActive
          ? "bg-white/6 border border-white/12"
          : "border border-transparent hover:bg-white/3 hover:border-white/6",
      ].join(" ")}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
          style={{ background: domain.color }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span className="text-lg shrink-0">{domain.icon}</span>

      <div className="min-w-0">
        <p
          className={[
            "text-sm font-semibold [font-family:var(--font-space-grotesk)] truncate transition-colors duration-200",
            isActive ? "text-white" : "text-white/50 group-hover:text-white/75",
          ].join(" ")}
        >
          {domain.label}
        </p>
        <p className="text-[10px] [font-family:var(--font-jetbrains)] text-white/25 truncate mt-0.5">
          {domain.company}
        </p>
      </div>

      <ChevronRight
        size={14}
        className={[
          "ml-auto shrink-0 transition-all duration-200",
          isActive
            ? "text-white/60 rotate-90 md:rotate-0"
            : "text-white/20 group-hover:text-white/40",
        ].join(" ")}
      />
    </motion.button>
  );
}

function AchievementList({ domain }: { domain: Domain }) {
  return (
    <motion.div
      key={domain.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      }}
      className={`relative rounded-2xl p-7 bg-linear-to-br ${domain.gradient} overflow-hidden h-full`}
      style={{ border: `1px solid ${domain.borderColor}` }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-7">
        <span
          className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${domain.color}18`,
            border: `1px solid ${domain.color}30`,
          }}
        >
          {domain.icon}
        </span>
        <div>
          <h3
            className="text-xl font-bold [font-family:var(--font-space-grotesk)] leading-tight"
            style={{ color: domain.color }}
          >
            {domain.label}
          </h3>
          <p className="text-xs [font-family:var(--font-jetbrains)] text-white/35 mt-0.5">
            {domain.company}
          </p>
        </div>
      </div>

      {/* Achievement list */}
      <ul className="space-y-3.5">
        {domain.achievements.map((achievement, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
              style={{
                background: `${domain.color}20`,
                border: `1px solid ${domain.color}35`,
              }}
            >
              <Check size={10} style={{ color: domain.color }} />
            </span>
            <p className="text-sm text-white/70 leading-relaxed">
              {achievement}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Corner glow */}
      <div
        className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none opacity-15"
        style={{ background: domain.color, filter: "blur(40px)" }}
      />
    </motion.div>
  );
}

export default function Highlights() {
  const firstId = highlightsData.domains[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstId);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  const activeDomain =
    highlightsData.domains.find((d) => d.id === activeId) ??
    highlightsData.domains[0];

  return (
    <section
      id="projects"
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(167,139,250,0.05) 0%, transparent 70%), #02020a",
      }}
    >
      <div className="gradient-divider mb-20" />

      <div className="max-content">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-20">
          <p className="text-xs [font-family:var(--font-jetbrains)] tracking-[0.4em] text-violet-400 uppercase mb-4">
            {"// 03. HIGHLIGHTS"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-space-grotesk)] text-white">
            {highlightsData.headline}
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-xl mx-auto">
            {highlightsData.subtitle}
          </p>
        </AnimatedSection>

        {/* Desktop: sidebar + panel */}
        <div className="hidden md:grid md:grid-cols-[260px_1fr] gap-4 items-stretch min-h-[460px]">
          {/* Tab sidebar */}
          <div className="flex flex-col gap-2 pr-2">
            {highlightsData.domains.map((domain, i) => (
              <DomainTab
                key={domain.id}
                domain={domain}
                isActive={activeId === domain.id}
                onClick={() => setActiveId(domain.id)}
                index={i}
              />
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <AchievementList key={activeDomain.id} domain={activeDomain} />
          </AnimatePresence>
        </div>

        {/* Mobile: stacked accordion cards */}
        <div className="md:hidden space-y-4">
          {highlightsData.domains.map((domain, i) => {
            const isOpen = mobileOpenId === domain.id;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden border border-white/8"
              >
                {/* Toggle header */}
                <button
                  onClick={() => setMobileOpenId(isOpen ? null : domain.id)}
                  className="w-full flex items-center gap-3 p-4 bg-white/3 hover:bg-white/5 transition-colors text-left"
                >
                  <span className="text-xl">{domain.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold [font-family:var(--font-space-grotesk)]"
                      style={{
                        color: isOpen ? domain.color : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {domain.label}
                    </p>
                    <p className="text-[10px] [font-family:var(--font-jetbrains)] text-white/25 mt-0.5">
                      {domain.company}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0 text-white/30 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 bg-linear-to-br ${domain.gradient}`}>
                        <ul className="space-y-3">
                          {domain.achievements.map((a, j) => (
                            <li key={j} className="flex items-start gap-2.5">
                              <span
                                className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                                style={{
                                  background: `${domain.color}20`,
                                  border: `1px solid ${domain.color}35`,
                                }}
                              >
                                <Check size={9} style={{ color: domain.color }} />
                              </span>
                              <p className="text-xs text-white/65 leading-relaxed">
                                {a}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
